export interface Appointment {
    id: string;
    date: string;
    time: string;
    doctorId: string;
    patientName: string;
    patientContact: string;
}

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    availability: string[];
}

export interface CsvData {
    date: string;
    time: string;
    doctorId: string;
    patientName: string;
    patientContact: string;
}