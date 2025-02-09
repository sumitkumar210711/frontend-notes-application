import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GroupSidebar({ onSelectGroup, onOpenPopup }) {
  const [groups, setGroups] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [highlightedGroup, setHighlightedGroup] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get('https://notes-application-rc9p.onrender.com/api/groups');
        setGroups(res.data);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      }
    };
    fetchGroups();
  }, []);

  const getInitials = (name) => {
    const words = name.split(' ');
    if (words.length > 1) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    // Reset the highlighted group if search text is cleared
    if (e.target.value === '') {
      setHighlightedGroup(null);
    }
  };

  const handleGroupClick = (group) => {
    onSelectGroup(group._id, group.name, group.color);
    setHighlightedGroup(group._id); // Highlight the selected group
  };


  return (
    <div className="w-1/4 h-screen p-4 bg-white flex flex-col items-center">
      <h2 className="text-4xl mb-6 mt-6">Pocket Notes</h2>

      <div className="flex-grow overflow-y-auto w-full mb-2">
        <ul>
          {groups
            .filter(group => group.name.toLowerCase().includes(searchText.toLowerCase()))
            .map(group => (
              <li 
                className={`mt-6 text-xl cursor-pointer flex items-center px-4 ${highlightedGroup === group._id ? 'bg-gray-200' : ''}`} 
                key={group._id} 
                onClick={() => handleGroupClick(group)}
              >
                <div 
                  className="w-14 h-14 rounded-full mr-6 flex items-center justify-center text-white font-bold" 
                  style={{ backgroundColor: group.color }}
                >
                  {getInitials(group.name)}
                </div>
                <span className="text-lg">{group.name}</span>
              </li>
            ))}
        </ul>
      </div>
      <div>
      <span className="mb-12 mr-1">
        <input
          type="text"
          placeholder="Search Groups/Notes"
          value={searchText}
          onChange={handleSearchChange}
          className="w-3/4 p-2 mb-4 border rounded"
        />
      </span>
    
      <button onClick={onOpenPopup} className="p-2 w-14 h-14 font-bold rounded-full bg-blue-500 text-white self-end mt-1">
        +
      </button>
      </div>
       
    </div>
  );
}

export default GroupSidebar;
