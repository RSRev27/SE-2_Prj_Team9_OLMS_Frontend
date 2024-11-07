import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Assignments.css';

const Assignments = () => {
  const { courseId } = useParams();
  const [assignmentsData, setAssignmentsData] = useState({
    ai: [
      {
        title: 'Programming Assignment 1',
        sections: 'All Sections',
        description: 'Submit your code for Programming Assignment 1 by next Friday.',
        date: 'Oct 29, 2024, 1:55 PM',
        author: 'Instructor AI',
        file: '/path-to-assignment-file.pdf',
        submitted: false,
      },
      {
        title: 'Quiz 3 Assignment',
        sections: 'All Sections',
        description: 'Complete Quiz 3 and submit your answers online.',
        date: 'Oct 23, 2024, 1:42 PM',
        author: 'Instructor AI',
        file: '/path-to-assignment-file.pdf',
        submitted: false,
      },
    ],
    se2: [
      {
        title: 'Midterm Assignment',
        sections: 'All Sections',
        description: 'The midterm assignment is due this week. Make sure to submit.',
        date: 'Oct 21, 2024, 5:33 PM',
        author: 'Instructor SE',
        file: '/path-to-assignment-file.pdf',
        submitted: false,
      },
      {
        title: 'Project Assignment 2',
        sections: 'All Sections',
        description: 'Submit the second part of the project assignment.',
        date: 'Oct 18, 2024, 3:00 PM',
        author: 'Instructor SE',
        file: '/path-to-assignment-file.pdf',
        submitted: false,
      },
    ],
  });

  const assignments = assignmentsData[courseId] || [];
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [selectedAssignmentIndex, setSelectedAssignmentIndex] = useState(null);
  const [submissionDescription, setSubmissionDescription] = useState('');
  const [submissionFile, setSubmissionFile] = useState(null);

  const handleAddAssignmentClick = () => {
    setShowAddForm(true);
  };

  const handleCreateAssignment = () => {
    if (!newAssignmentTitle.trim()) {
      alert('Please enter an assignment title');
      return;
    }

    const newAssignment = {
      title: newAssignmentTitle,
      sections: 'All Sections',
      description: 'New assignment created',
      date: new Date().toLocaleString(),
      author: 'Instructor',
      file: null,
      submitted: false,
    };

    setAssignmentsData((prevData) => ({
      ...prevData,
      [courseId]: [...(prevData[courseId] || []), newAssignment],
    }));

    setNewAssignmentTitle('');
    setShowAddForm(false);
  };

  const handleAssignmentClick = (index) => {
    if (!assignments[index].submitted) {
      setSelectedAssignmentIndex(index);
      setSubmissionDescription('');
      setSubmissionFile(null);
    }
  };

  const handleSubmitAssignment = () => {
    if (selectedAssignmentIndex === null) {
      alert('Please select an assignment to submit');
      return;
    }

    if (!submissionDescription.trim()) {
      alert('Please enter a submission description');
      return;
    }

    if (!submissionFile) {
      alert('Please upload a file');
      return;
    }

    // Update the assignment's submitted status
    const updatedAssignments = [...assignments];
    updatedAssignments[selectedAssignmentIndex] = {
      ...updatedAssignments[selectedAssignmentIndex],
      submitted: true,
    };

    setAssignmentsData((prevData) => ({
      ...prevData,
      [courseId]: updatedAssignments,
    }));

    // Reset submission form
    setSelectedAssignmentIndex(null);
    setSubmissionDescription('');
    setSubmissionFile(null);
  };

  return (
    <div className="assignments-container">
      <div className="assignments-header">
        <input type="text" placeholder="Search..." className="search-bar" />
        <button className="add-assignment" onClick={handleAddAssignmentClick}>
          + Add Assignment
        </button>
        <button className="mark-all-read">Mark All as Read</button>
      </div>

      {showAddForm && (
        <div className="add-assignment-form">
          <input
            type="text"
            value={newAssignmentTitle}
            onChange={(e) => setNewAssignmentTitle(e.target.value)}
            placeholder="Enter assignment title"
            className="assignment-title-input"
          />
          <button onClick={handleCreateAssignment}>Create Assignment</button>
          <button onClick={() => setShowAddForm(false)}>Cancel</button>
        </div>
      )}

      {selectedAssignmentIndex !== null && (
        <div className="submission-form">
          <h4>Submit Assignment: {assignments[selectedAssignmentIndex].title}</h4>
          <textarea
            value={submissionDescription}
            onChange={(e) => setSubmissionDescription(e.target.value)}
            placeholder="Enter your submission description..."
            className="submission-description-textarea"
          />
          <input
            type="file"
            onChange={(e) => setSubmissionFile(e.target.files[0])}
            className="submission-file-input"
          />
          <button onClick={handleSubmitAssignment}>Submit</button>
          <button onClick={() => setSelectedAssignmentIndex(null)}>Cancel</button>
        </div>
      )}

      <div className="assignments-list">
        {assignments.map((assignment, index) => (
          <div
            key={index}
            className={`assignment-item ${assignment.submitted ? 'submitted' : ''}`}
            onClick={() => handleAssignmentClick(index)}
          >
            <h3 className="assignment-title">{assignment.title}</h3>
            <p className="assignment-sections">{assignment.sections}</p>
            <p className="assignment-description">{assignment.description}</p>
            <p className="assignment-date">Posted on: {assignment.date}</p>
            {assignment.file && (
              <a
                href={assignment.file}
                download
                className="assignment-file-link"
                onClick={(e) => e.stopPropagation()}
              >
                Download Assignment File
              </a>
            )}
            {assignment.submitted && (
              <span className="submission-status">Submitted</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;