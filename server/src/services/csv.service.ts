import csvParser from 'csv-parser';
import { Readable } from 'stream';
import { Appointment } from '../models/appointment.model';
import { Doctor } from '../models/doctor.model';

export class CsvService {
  async processCsv(buffer: Buffer): Promise<{ doctors: number; appointments: number }> {
    return new Promise((resolve, reject) => {
      const appointments: any[] = [];
      const doctors: any[] = [];

      const stream = Readable.from([buffer]);

      stream
        .pipe(csvParser())
        .on('data', (row: any) => {
          // Normalize keys to lowercase
          const normalizedRow = Object.keys(row).reduce((acc, key) => {
            acc[key.toLowerCase().trim()] = row[key];
            return acc;
          }, {} as any);

          // Check if it's a doctor entry
          if (normalizedRow.type === 'doctor' || (normalizedRow.name && normalizedRow.specialty && !normalizedRow.patientname)) {
            doctors.push({
              name: normalizedRow.name,
              specialty: normalizedRow.specialty,
              email: normalizedRow.email,
              phone: normalizedRow.phone,
              availability: normalizedRow.availability !== 'false',
            });
          }
          // Check if it's an appointment entry
          else if (normalizedRow.type === 'appointment' || normalizedRow.patientname) {
            appointments.push({
              date: new Date(normalizedRow.date),
              time: normalizedRow.time,
              doctor: normalizedRow.doctorid,
              patientName: normalizedRow.patientname,
              patientPhone: normalizedRow.patientphone,
              patientEmail: normalizedRow.patientemail,
              specialty: normalizedRow.specialty,
              status: normalizedRow.status || 'booked',
            });
          }
        })
        .on('end', async () => {
          try {
            let doctorCount = 0;
            let appointmentCount = 0;

            // Save doctors
            if (doctors.length > 0) {
              const savedDoctors = await Doctor.insertMany(doctors);
              doctorCount = savedDoctors.length;
            }

            // Save appointments
            if (appointments.length > 0) {
              const savedAppointments = await Appointment.insertMany(appointments);
              appointmentCount = savedAppointments.length;
            }

            resolve({ doctors: doctorCount, appointments: appointmentCount });
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error: any) => {
          reject(error);
        });
    });
  }

  async deleteData(collection: 'appointments' | 'doctors', ids: string[]): Promise<void> {
    const model = collection === 'appointments' ? Appointment : Doctor;
    await model.deleteMany({ _id: { $in: ids } } as any);
  }
}
