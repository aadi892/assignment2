document.addEventListener("DOMContentLoaded", () => {
    const noteForm = document.getElementById("noteForm");
    const notesList = document.getElementById("notesList");

    // Fetch notes from the server
    const fetchNotes = async () => {
        const response = await fetch("http://localhost:3000/api/notes");
        const notes = await response.json();
        renderNotes(notes);
    };

    // Render notes
    const renderNotes = (notes) => {
        notesList.innerHTML = "";
        notes.forEach(note => {
            const noteDiv = document.createElement("div");
            noteDiv.className = "note";

            const noteText = document.createElement("div");
            noteText.className = "note-content";
            noteText.textContent = note.content;

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", async () => {
                await fetch(`http://localhost:3000/api/notes/${note._id}`, {
                    method: "DELETE",
                });
                fetchNotes();
            });

            noteDiv.appendChild(noteText);
            noteDiv.appendChild(deleteButton);
            notesList.appendChild(noteDiv);
        });
    };

    // Handle form submission
    noteForm.addEventListener("submit", async (e) => {
        //prvent from default submission
        e.preventDefault();
        const noteContent = document.getElementById("noteContent").value;
        await fetch("w45", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: noteContent }),
        });
        document.getElementById("noteContent").value = "";
        fetchNotes();
    });

    // Load notes on page load
    fetchNotes();
});
