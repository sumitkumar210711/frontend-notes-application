import React, { useState } from 'react';
import GroupSidebar from '../components/GroupSidebar';
import GroupPopup from '../components/GroupPopup';
import NotesList from '../components/NotesList';
import NoteInput from '../components/NoteInput';

function HomePage() {
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedGroupName, setSelectedGroupName] = useState('');
  const [selectedGroupColor, setSelectedGroupColor] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleGroupSelect = (groupId, groupName, groupColor) => {
    setSelectedGroupId(groupId);
    setSelectedGroupName(groupName);
    setSelectedGroupColor(groupColor);

  };

  const handlePopupOpen = () => { 
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleGroupAdded = () => {
    setRefresh(!refresh);
  };

  const handleNoteAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="flex h-screen">
      <GroupSidebar onSelectGroup={handleGroupSelect} onOpenPopup={handlePopupOpen} key={refresh} />
      <div className="flex-grow flex flex-col w-full overflow-y-auto bg-blue-100">

      {selectedGroupId ? (
          <>
            <NotesList
              groupId={selectedGroupId} 
              groupName={selectedGroupName} 
              groupColor={selectedGroupColor} 
              key={refresh} />
            <NoteInput groupId={selectedGroupId} onNoteAdded={handleNoteAdded} />
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center text-center text-gray-600">
            <div>
              <h2 className="text-2xl font-bold mb-4">Welcome to Pocket Notes</h2>
              <p className="mb-4">Select a group from the sidebar to view or add notes. If you haven't created any groups yet, click the '+' button to get started.</p>
              <p>Manage your notes efficiently and keep track of important information in one place.</p>
            </div>
          </div>
        )}
      </div>
      {isPopupOpen && <GroupPopup onClose={handlePopupClose} onGroupAdded={handleGroupAdded} />}
    </div>
  );
}

export default HomePage;
