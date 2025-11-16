export class AppointmentsController {
    constructor(private appointmentModel: any) {}

    async getAppointments(req: any, res: any) {
        try {
            const appointments = await this.appointmentModel.find();
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving appointments' });
        }
    }

    async filterAppointmentsBySpecialty(req: any, res: any) {
        const { specialty } = req.params;
        try {
            const appointments = await this.appointmentModel.find({ specialty });
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ message: 'Error filtering appointments' });
        }
    }

    async createAppointment(req: any, res: any) {
        const newAppointment = new this.appointmentModel(req.body);
        try {
            const savedAppointment = await newAppointment.save();
            res.status(201).json(savedAppointment);
        } catch (error) {
            res.status(400).json({ message: 'Error creating appointment' });
        }
    }

    async deleteAppointment(req: any, res: any) {
        const { id } = req.params;
        try {
            await this.appointmentModel.findByIdAndDelete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting appointment' });
        }
    }
}