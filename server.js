const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://aadi16092001:uIRx9uEkoI5ZgJyh@cluster0.f6mkc.mongodb.net/NotesApp?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("Failed to connect to MongoDB Atlas", err));


// Define Schema and Model
const noteSchema = new mongoose.Schema({
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);

// Routes
// Get all notes
app.get("/api/notes", async (req, res) => {
    try {
        const notes = await Note.find().sort({ created_at: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch notes" });
    }
});

// Add a new note
app.post("/api/notes", async (req, res) => {
    const { content } = req.body;
    try {
        const newNote = new Note({ content });
        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (err) {
        res.status(500).json({ error: "Failed to add note" });
    }
});

// Delete a note
app.delete("/api/notes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Note.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete note" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
