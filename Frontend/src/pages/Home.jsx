import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState({ title: "", description: "" });
  const [notes, setNotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddNote = () => {
    if (!note.title.trim() || !note.description.trim()) return;

    if (editingIndex !== null) {
      setNotes((prev) =>
        prev.map((n, idx) => (idx === editingIndex ? note : n))
      );
    } else {
      setNotes((prev) => [...prev, note]);
    }

    setNote({ title: "", description: "" });
    setEditingIndex(null);
    setShowModal(false);
  };

  const handleDelete = (index) => {
    setNotes((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleEdit = (index) => {
    setNote(notes[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleCancel = () => {
    setNote({ title: "", description: "" });
    setEditingIndex(null);
    setShowModal(false);
  };

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Home relative min-h-screen bg-gray-100 pb-20">
      <Navbar onSearch={setSearchTerm} />

      {/* Notes List */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((n, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 relative"
            >
              <h3 className="text-lg font-semibold text-yellow-600 mb-2">
                {n.title}
              </h3>
              <p className="text-gray-700 mb-4">{n.description}</p>
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No notes found.</p>
        )}
      </div>

      {/* Floating + Button */}
      <button
        onClick={() => {
          setNote({ title: "", description: "" });
          setEditingIndex(null);
          setShowModal(true);
        }}
        className="fixed bottom-6 left-6 bg-yellow-500 text-white text-3xl w-14 h-14 rounded-full shadow-lg hover:bg-yellow-600 flex items-center justify-center"
      >
        +
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingIndex !== null ? "Update Note" : "Add New Note"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={note.description}
              onChange={(e) => setNote({ ...note, description: e.target.value })}
              className="w-full mb-4 px-4 py-2 border rounded h-32 resize-none"
            ></textarea>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                {editingIndex !== null ? "Update Note" : "Add Note"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
