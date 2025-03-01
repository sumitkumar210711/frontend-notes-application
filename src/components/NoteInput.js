import React, { useState } from 'react';
import axios from 'axios';

function NoteInput({ groupId, onNoteAdded }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content) {
      const res = await axios.post('https://notes-application-rc9p.onrender.com/api/notes', { groupId, content });
      onNoteAdded(res.data);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 border-t">
      <input
        type="text"
        className="flex-grow p-2 border rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded" disabled={!content}>
        Send
      </button>
    </form>
  );
}

export default NoteInput;
