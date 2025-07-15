const Notes = require("../models/notes");
const User = require("../models/user");

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
        tags: tags || [], // Si no hay tags, inicialízalo como un array vacío
        author: userId, // Asegúrate de que el userId se pase correctamente
      });

      // Aseguramos que _id se convierta correctamente
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { notes: note._id } },
        { new: true }
      );

      console.log("✅ Nota agregada al usuario:", updatedUser.notes);

      // 3. Verificamos si la nota se agregó al array del usuario
      const user = await User.findById(userId).populate("notes");
      console.log("📌 Notas del usuario después del push:", user.notes);

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
          { title: { $regex: new RegExp(query, "i") } },
          { content: { $regex: new RegExp(query, "i") } },
        ],
      });

      return { error: false, data: notes };
    } catch (error) {
      return { error: true, data: error.message };
    }
  }
}

module.exports = NotesService;
