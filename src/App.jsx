import { useState, useEffect } from 'react';
import './styles/NotesApp.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState('');
  const [color, setColor] = useState('#f9c74f');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (text.trim() === '') return;

    const newNote = {
      id: Date.now(),
      text,
      color,
    };
    setNotes([...notes, newNote]);
    setText('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="app">
      <h1>📝 Notes App</h1>
      <div className="note-input">
        <textarea
          placeholder="Write your note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="controls">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button onClick={addNote}>Add Note</button>
        </div>
      </div>

      <div className="notes-grid">
        {notes.map(note => (
          <div
            key={note.id}
            className="note"
            style={{ backgroundColor: note.color }}
          >
            <p>{note.text}</p>
            <button onClick={() => deleteNote(note.id)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
