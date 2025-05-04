const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
    try{
        const { barberId, service, date, time, note } = req.body;
        const appointment = new Appointment({
            userId: req.user._id,
            barberId,
            service,
            date,
            time,
            note
        })
        await appointment.save();
        res.status(201).json({ message: 'Appointment booked successfully', appointment });
    }catch (error) {
        return res.status(500).json({ msg: "Error booking appointment", error: error.message  });
    }
}

exports.updateAppointment = async (req, res) => {
    try{
        const { id } = req.params;
        const { status } = req.body;

        if(!['accepted', 'rejected', 'rescheduled'].includes(status)){
            return res.status(400).json({ message: 'Invalid status' });
        }
        const appointment = await Appointment.findById(id);
        if(!appointment){
            return res.status(404).json({ message: 'Appointment not found' });
        }
        appointment.status = status;
        await appointment.save();
        res.status(200).json({ message: `Appointment ${status} successfully`, appointment });
    }catch (error) {
        return res.status(500).json({ msg: "Unable to update status", error: error.message  });
    }
}

exports.rescheduleAppointment = async (req, res) => {
    try{
        const {id} = req.params;
        const { date, time, note } = req.body;

        const appointment = await Appointment.findById(id);
        if(!appointment){
            return res.status(404).json({ message: 'Appointment not found' });
        }
        appointment.date = date;
        appointment.time = time;
        appointment.note = note || appointment.note;
        await appointment.save();

        res.status(200).json({ message: 'Appointment rescheduled successfully', appointment });
    }catch (error) {
        return res.status(500).json({ message: error.message });
    }
}