const review = require('../models/Review');

exports.addReview = async (req, res) => {
    const { barberId, rating, comment } = req.body;
    const userId = req.user._id;
    try{
        const existing = await review.findOne({ userId, barberId });
        if(existing){
            return res.status(400).json({ message: 'You have already reviewed this barber' });
        }
        const review = await Review.create({
            userId,
            barberId,
            rating,
            comment
        });
        res.status(201).json({ message: 'Review added successfully', review });
    }catch (error) {
        return res.status(500).json({ msg: "Unable to add review", error: error.message  });    
    }
}

exports.getBarberReviews = async (req, res) => {
    const { barberId } = req.params;
  
    try {
      const reviews = await Review.find({ barberId }).populate("userId", "name profilePic");
      res.status(200).json({ reviews });
    } catch (error) {
      res.status(500).json({ msg: "Server Error", error });
    }
};

exports.getAverageRating = async (req, res) => {
    const { barberId } = req.params;
  
    try {
      const result = await Review.aggregate([
        { $match: { barberId: require("mongoose").Types.ObjectId(barberId) } },
        { $group: { _id: "$barberId", avgRating: { $avg: "$rating" }, total: { $sum: 1 } } }
      ]);
  
      if (result.length === 0) {
        return res.status(200).json({ avgRating: 0, total: 0 });
      }
  
      res.status(200).json({ avgRating: result[0].avgRating, total: result[0].total });
    } catch (error) {
      res.status(500).json({ msg: "Server Error", error });
    }
};


