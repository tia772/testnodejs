const NoteModel = require("../models/note.model.js");

exports.create = async (req, res) => {
  if (!req.body.title && !req.body.content && !req.body.tag) {
    res.status(400).send({ message: "title can not be empty!" });
  }

  const note = new NoteModel({
    title: req.body.title,
    content: req.body.content,
    tag: req.body.tag,
  });

  await note
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating note",
      });
    });
};

exports.findAll = async (req, res) => {
  try {
    const note = await NoteModel.find();
    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await NoteModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({ message: "Note updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.destroy = async (req, res) => {
  await NoteModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Note not found.`,
        });
      } else {
        res.send({
          message: "Note deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.find = async (req, res) => {
  try {
    const regex = new RegExp(req.params.tag, "i");
    NoteModel.find({ tag: regex }).then((result) => {
      res.status(404).json(result);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const note = await NoteModel.findById(req.params.category);
    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
