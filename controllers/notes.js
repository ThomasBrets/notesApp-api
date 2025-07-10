const NotesService = require("../services/notes");

class NotesController {
  static async getAllNotes(req, res) {
    const { error, data } = await NotesService.getAllNotes();

    return error
      ? res.status(data.status || 500).json({ message: data })
      : res.status(200).json(data);
  }
  static async getNote(req, res) {
    const { error, data } = await NotesService.getNote(req.params.noteId);

    return error
      ? res.status(data.status || 500).json({ message: data })
      : res.status(200).json(data);
  }
  static async addNote(req, res) {
    const user = req.user;
    console.log("USERID", user.id);

    const { error, data } = await NotesService.addNote(req.body, user.id);

    return error
      ? res.status(data.status || 500).json({ message: data })
      : res.status(201).json(data);
  }
  static async editNote(req, res) {
    const { error, data } = await NotesService.editNote(
      req.params.noteId,
      req.body
    );

    return error
      ? res.status(data.status || 500).json({ message: data })
      : res.status(201).json(data);
  }
  static async editNotePinned(req, res) {
    const { error, data } = await NotesService.editNotePinned(
      req.params.noteId,
      req.body
    );

    return error
      ? res.status(data.status || 500).json({ message: data })
      : res.status(204).json(data);
  }
  static async deleteNote(req, res) {
    const { error, data } = await NotesService.deleteNote(req.params.noteId);

    return error
      ? res.status(data.status || 500).json({ message: data })
      : res.status(204).json(data);
  }

  static async SearchNote(req, res) {
    const { query } = req.query;
    const userId = req.user.id;

    if (!query) {
      return res
        .status(400)
        .json({ error: true, message: "Search query is required" });
    }

    const { error, data } = await NotesService.SearchNote(query, userId);

    return error
      ? res.status(data.status || 500).json({ message: data })
      : res.status(200).json(data);
  }
}

module.exports = NotesController;
