const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect, authorize } = require('../middleware/auth');
const Barber = require('../models/Barber');

router.post("/profile", protect, upload.single("image"), (req, res) => {
    res.json({
      msg: "Upload successful",
      imageUrl: `/uploads/${req.file.filename}`,
    });
});

// Upload up to 5 images
router.post(
  "/portfolio",
  protect,
  upload.array("images", 5), // max 5 files
  async (req, res) => {
    try {
      const barberId = req.user._id; // assumes JWT protects route
      const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

      // Update barber's profile with new images
      const barber = await Barber.findById(barberId);
      if (!barber) return res.status(404).json({ msg: "Barber not found" });

      // You can push or replace
      barber.portfolioImages.push(...imagePaths);
      await barber.save();

      res.status(200).json({
        msg: "Portfolio uploaded successfully",
        portfolioImages: barber.portfolioImages,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Upload failed", error });
    }
  }
);


module.exports = router;