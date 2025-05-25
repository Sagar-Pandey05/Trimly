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

exports.getAllAppointments = async (req, res) => {
    try{
        const appointments = await Appointment.find().populate('userId barberId', 'name email');
        res.json(appointments);
    }catch (error) {
        return res.status(500).json({ msg: "Unable to fetch appointments", error: error.message  });
    }
}

exports.getUserAppointments = async (req, res) => {
    try {
      const appointments = await Appointment.find({ userId: req.user._id }).populate("barberId", "name email");
      res.json(appointments);
    } catch (err) {
      res.status(500).json({ msg: "Failed to fetch user appointments", error: err.message });
    }
}; 

exports.cancelAppointment = async (req, res) => {
    try {
      const { id } = req.params;
  
      const appointment = await Appointment.findById(id);
  
      if (!appointment) return res.status(404).json({ msg: "Appointment not found" });
  
      if (appointment.userId.toString() !== req.user._id.toString()){
        return res.status(403).json({ msg: "Not authorized to cancel this appointment" });
      }
      await appointment.deleteOne();
      res.json({ msg: "Appointment cancelled successfully" });
    } catch (err) {
      res.status(500).json({ msg: "Failed to cancel appointment", error: err.message });
    }
};


  