import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NotesList({ groupId, groupName, groupColor }) {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await axios.get(`https://notes-application-rc9p.onrender.com/api/notes/${groupId}`);
      setNotes(res.data);
      setFilteredNotes(res.data);
    };
    if (groupId) {
      fetchNotes();
    }
  }, [groupId]);

  useEffect(() => {
    setFilteredNotes(
      notes.filter(note =>
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, notes]);

  const getInitials = (name) => {
    const words = name.split(' ');
    if (words.length > 1) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);
    return `${formattedDate}, ${formattedTime}`;
  };


  return (
    <>
      <h2 className="text-xl bg-blue-800 h-20 w-full mb-5 flex items-center p-4">
        <div
          className="w-14 h-14 rounded-full mr-6 flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: groupColor }}
        >
          {getInitials(groupName)}
        </div>
        <span className="text-white mr-auto">{groupName}</span>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded w-1/3"
        />
      </h2>
      <div className="flex-grow p-2 w-full overflow-y-auto">
        {filteredNotes.map((note) => (
          <div key={note._id} className="mb-2 p-6 bg-white border rounded relative">
            <p>{note.content}</p>
            <p className="text-sm text-gray-500 absolute bottom-2 right-2">{formatDate(note.createdAt)}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default NotesList;
