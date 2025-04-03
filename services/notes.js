const Notes = require("../models/notes");


class NotesService {
  static async getAllNotes() {
    try {
      const notes = await Notes.find({})
        .populate("author")
        .sort({ isPinned: -1 }); // Usar populate para obtener los datos del autor

      return { error: false, data: notes };
    } catch (error) {
      return { error: true, data: error.message };
    }
  }
  static async getNote(id) {
    try {
      const note = await Notes.findOne({ _id: id })
        .populate("author")
        .sort({ isPinned: -1 }); // Usar populate para obtener los datos del autor

      return { error: false, data: note };
    } catch (error) {
      return { error: true, data: error.message };
    }
  }
  static async addNote(body, userId) {
    const { title, content, tags } = body; 

    try {
      const note = await Notes.create({
        title,
        content,
        tags: tags || [],   // Si no hay tags, inicialízalo como un array vacío
        author: userId      // Asegúrate de que el userId se pase correctamente
      });

      return { error: false, data: note };
    } catch (error) {
      return { error: true, data: error.message };
    }
  }
  static async editNote(id, body) {
    const { title, content, tags, isPinned } = body;

    try {
      const note = await Notes.findByIdAndUpdate(
        id,
        {
          $set: {
            title,
            content,
            tags,
            isPinned,
          },
        },
        { new: true }
      );

      return { error: false, data: note };
    } catch (error) {
      return { error: true, data: error.message };
    }
  }
  static async editNotePinned(id, body) {
    const { isPinned } = body;

    try {
      const note = await Notes.findByIdAndUpdate(
        id,
        {
          $set: {
            isPinned,
          },
        },
        { new: true }
      );

      return { error: false, data: note };
    } catch (error) {
      return { error: true, data: error.message };
    }
  }
  static async deleteNote(id) {
    try {
      const note = await Notes.findByIdAndDelete(id);

      

      return { error: false, data: note };
    } catch (error) {
      return { error: true, data: error.message };
    }
  }

  static async SearchNote(query, userId) {
    try {
      const notes = await Notes.find({
        author: userId,
        $or: [
          {title: {$regex: new RegExp(query, "i")}},
          {content: {$regex: new RegExp(query, "i")}},
        ]
      })

      return { error: false, data: notes};
    } catch (error) {
      return { error: true, data: error.message };
    }
  }
}

module.exports = NotesService;
