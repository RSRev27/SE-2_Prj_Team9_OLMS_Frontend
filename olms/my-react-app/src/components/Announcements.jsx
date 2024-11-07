import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Announcements.css';

const Announcements = () => {
  const { courseId } = useParams();
  const [showTextarea, setShowTextarea] = useState(false); // State to toggle textarea visibility
  const [newAnnouncement, setNewAnnouncement] = useState(''); // State to store the new announcement text
  const [announcementsData, setAnnouncementsData] = useState({
    ai: [
      {
        title: 'Programming Assignment 2',
        sections: 'All Sections',
        message: 'Hello Everyone, Your programming assignment 2 has been posted on Platform.',
        date: 'Oct 29, 2024, 1:55 PM',
        author: 'Instructor AI',
        avatar: '/path-to-avatar.jpg', // Placeholder for profile image
      },
      {
        title: 'Quiz 4 Review',
        sections: 'All Sections',
        message: 'Hello Everyone, For the review the office hours of mine are Thursday and Friday.',
        date: 'Oct 23, 2024, 1:42 PM',
        author: 'Instructor AI',
        avatar: 'RV', // Initials if no image is provided
      },
    ],
    se2: [
      {
        title: 'Quiz 4 grades & Review',
        sections: 'All Sections',
        message: 'Hello Everyone, I have released quiz 4 grades for everyone.',
        date: 'Oct 21, 2024, 5:33 PM',
        author: 'Instructor SE',
        avatar: 'RV', // Initials if no image is provided
      },
      {
        title: 'Office hours changed for this week',
        sections: 'All Sections',
        message: 'Hello Everyone, Office hours have been updated for this week.',
        date: 'Oct 18, 2024, 3:00 PM',
        author: 'Instructor SE',
        avatar: '/path-to-avatar-se.jpg', // Placeholder for profile image
      },
    ],
  });

  const announcements = announcementsData[courseId] || [];

  const handleAddAnnouncementClick = () => {
    setShowTextarea(!showTextarea); // Toggle textarea visibility
  };

  const handleAnnouncementChange = (e) => {
    setNewAnnouncement(e.target.value); // Update new announcement text
  };

  const handleSubmitAnnouncement = () => {
    if (newAnnouncement.trim() === '') {
      alert('Announcement cannot be empty.');
      return;
    }

    // Add the new announcement to the list
    const newAnnouncementObj = {
      title: 'New Announcement',
      sections: 'All Sections',
      message: newAnnouncement,
      date: new Date().toLocaleString(),
      author: 'Instructor', // You can replace with dynamic author if needed
      avatar: 'RV', // Replace with actual avatar if needed
    };

    // Update the state with the new announcement
    setAnnouncementsData((prevData) => ({
      ...prevData,
      [courseId]: [...prevData[courseId], newAnnouncementObj],
    }));

    setNewAnnouncement(''); // Clear the textarea
    setShowTextarea(false); // Hide the textarea after submission
  };

  return (
    <div className="announcements-container">
      <div className="announcements-header">
        <input type="text" placeholder="Search..." className="search-bar" />
        <button className="add-announcement" onClick={handleAddAnnouncementClick}>
          + Add Announcement
        </button>
        <button className="mark-all-read">Mark All as Read</button>
      </div>

      {showTextarea && (
        <div className="announcement-textarea-container">
          <textarea
            value={newAnnouncement}
            onChange={handleAnnouncementChange}
            placeholder="Enter your announcement..."
            className="announcement-textarea"
          ></textarea>
          <button className="submit-announcement" onClick={handleSubmitAnnouncement}>
            Submit Announcement
          </button>
        </div>
      )}

      <div className="announcements-list">
        {announcements.map((announcement, index) => (
          <div key={index} className="announcement-item">
            <div className="announcement-avatar">
              {typeof announcement.avatar === 'string' && announcement.avatar.length === 2 ? (
                <div className="initials-avatar">{announcement.avatar}</div>
              ) : (
                <img src={announcement.avatar} alt={announcement.author} className="profile-avatar" />
              )}
            </div>
            <div className="announcement-content">
              <h3 className="announcement-title">{announcement.title}</h3>
              <p className="announcement-sections">{announcement.sections}</p>
              <p className="announcement-message">{announcement.message}</p>
              <p className="announcement-date">Posted on: {announcement.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;

