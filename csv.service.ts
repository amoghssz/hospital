import fs from 'fs';
import csvParser from 'csv-parser';
import { Appointment } from '../models/appointment.model';
import { Doctor } from '../models/doctor.model';

export class CsvService {
    async uploadCsv(filePath: string): Promise<void> {
        const appointments: any[] = [];
        const doctors: any[] = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (row) => {
                    if (row.type === 'appointment') {
                        appointments.push(row);
                    } else if (row.type === 'doctor') {
                        doctors.push(row);
                    }
                })
                .on('end', async () => {
                    try {
                        await Appointment.insertMany(appointments);
                        await Doctor.insertMany(doctors);
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }

    async deleteData(collection: 'appointments' | 'doctors', ids: string[]): Promise<void> {
        const model = collection === 'appointments' ? Appointment : Doctor;
        await model.deleteMany({ _id: { $in: ids } });
    }
}