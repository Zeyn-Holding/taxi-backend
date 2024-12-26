const Music = require('../../models/Music');
const { validateMusicUpload } = require('../../utils/musicValidation');

exports.uploadMusic = async (req, res) => {
  try {
    const { title, artist, fileUrl, imageUrl, duration } = req.body;
    
    const validationError = validateMusicUpload(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const music = await Music.create({
      title,
      artist,
      fileUrl,
      imageUrl,
      duration,
      uploadedBy: req.user.id
    });

    res.status(201).json({ music });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading music' });
  }
};

exports.getAllMusic = async (req, res) => {
  try {
    const music = await Music.find().sort('-createdAt');
    res.json({ music });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching music' });
  }
};

exports.deleteMusic = async (req, res) => {
  try {
    const music = await Music.findOneAndDelete({
      _id: req.params.id,
      uploadedBy: req.user.id
    });

    if (!music) {
      return res.status(404).json({ message: 'Music not found or unauthorized' });
    }

    res.json({ message: 'Music deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting music' });
  }
};