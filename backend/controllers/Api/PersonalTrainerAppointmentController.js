import PersonalTrainerAppointment from '../../models/PersonalTrainerAppointment.js';

export const createAppointment = async (req, res) => {
    try {
        const { user_id , first_name, last_name, email, appointment_date, appointment_time } = req.body;

        const appointment = await PersonalTrainerAppointment.create({
            user_id,
            first_name,
            last_name,
            email,
            appointment_date,
            appointment_time
        });
        res.status(201).json({ message: 'Appointment created successfully', appointment });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: 'Failed to create appointment' });
    }
};

export const getAllAppointments = async (req, res) => {
    try {
      const appointments = await PersonalTrainerAppointment.findAll();
      res.json(appointments);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  };
  
  export const getAllUserAppointments = async (req, res) => {
    const { userId } = req.params; 

    try {
        let appointments;

        if (userId) {
            appointments = await PersonalTrainerAppointment.findAll({
                where: { user_id: userId }
            });
        } else {
            appointments = await PersonalTrainerAppointment.findAll();
        }

        res.json(appointments);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Failed to fetch appointments" });
    }
};

export const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await PersonalTrainerAppointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json({ appointment });
    } catch (error) {
        console.error('Error fetching appointment by ID:', error);
        res.status(500).json({ error: 'Failed to fetch appointment' });
    }
};

export const updateAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id,first_name, last_name, email, appointment_date, appointment_time } = req.body;
        const appointment = await PersonalTrainerAppointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        await appointment.update({
            user_id,
            first_name,
            last_name,
            email,
            appointment_date,
            appointment_time
        });

        res.status(200).json({ message: 'Appointment updated successfully', appointment });
    } catch (error) {
        console.error('Error updating appointment by ID:', error);
        res.status(500).json({ error: 'Failed to update appointment' });
    }
};

export const deleteAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const numDeletedRows = await PersonalTrainerAppointment.destroy({
            where: { id }
        });
        if (numDeletedRows === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment by ID:', error);
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
};
