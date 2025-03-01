import React, { useState } from 'react';
import axios from 'axios';

function GroupPopup({ onClose, onGroupAdded }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name) {
      try {
        // verifies that the group already exists or not
        const res = await axios.get(`https://notes-application-rc9p.onrender.com/api/groups?name=${name}`);
        if (res.data.exists) {
          setError('Group name already exists');
        } else {
          // Create the new group
          const newGroup = await axios.post('https://notes-application-rc9p.onrender.com/api/groups', { name, color });
          onGroupAdded(newGroup.data);
          onClose();
        }
      } catch (err) {
        console.error('Error checking or creating group:', err);
        setError('Group Name already exists... Give other name');
      }
    } else {
      setError('Group name is required');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white p-4 rounded" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4">Create Group</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Group Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Color</label>
            <input
              type="color"
              className="w-full p-2 border rounded"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button type="button" className="mr-2 p-2 bg-gray-300 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GroupPopup;
