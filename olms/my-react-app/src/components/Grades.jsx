import React, { useState, useEffect } from 'react'; 

const API_URL = import.meta.env.VITE_API_URL;

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGrade, setNewGrade] = useState({
    courseId: '',
    studentName: '',
    quizId: '',
    quizResults: '',
    assignmentId: '',
    assignmentResults: '',
    description: '',
    userType: ''  // Assuming userType is needed for both get and set
  });

  useEffect(() => {
    fetchGrades();
  }, []);

  // Fetch grades: Only courseId, userType, and studentName are required
  const fetchGrades = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL+'/olms/grades/getgrades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: newGrade.courseId,
          studentName: newGrade.studentName,
          userType: newGrade.userType // Assuming userType is part of the request body for getgrades
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch grades');
      }
      const data = await response.json();
      setGrades(data);
    } catch (err) {
      setError('Error fetching grades: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change: Updating newGrade state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGrade(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission for adding grades
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL+'/olms/grades/savegrades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGrade),  // Send all fields (including quiz and assignment details)
      });

      if (!response.ok) {
        throw new Error('Failed to add grade');
      }

      const addedGrade = await response.json();
      setGrades(prev => [...prev, addedGrade]);
      setShowAddForm(false);
      setNewGrade({
        courseId: '',
        studentName: '',
        quizId: '',
        quizResults: '',
        assignmentId: '',
        assignmentResults: '',
        description: '',
        userType: ''  // Reset userType as well
      });
    } catch (err) {
      setError('Error adding grade: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Course Grades</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Grade
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Grade</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course ID
                </label>
                <input
                  type="text"
                  name="courseId"
                  value={newGrade.courseId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={newGrade.studentName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quiz ID
                </label>
                <input
                  type="text"
                  name="quizId"
                  value={newGrade.quizId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quiz Results (%)
                </label>
                <input
                  type="number"
                  name="quizResults"
                  value={newGrade.quizResults}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignment ID
                </label>
                <input
                  type="text"
                  name="assignmentId"
                  value={newGrade.assignmentId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignment Results (%)
                </label>
                <input
                  type="number"
                  name="assignmentResults"
                  value={newGrade.assignmentResults}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Type
                </label>
                <input
                  type="text"
                  name="userType"
                  value={newGrade.userType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={newGrade.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                rows="3"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Grade
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {grades.length === 0 ? (
          <div className="p-4 bg-gray-50 text-gray-600 rounded-lg text-center">
            No grades found.
          </div>
        ) : (
          grades.map((grade) => (
            <div
              key={grade._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-lg text-gray-700">
                  Course {grade.courseId}
                </span>
                <span className="text-sm text-gray-500">
                  Student: {grade.studentName}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600 mb-1">Quiz {grade.quizId}</div>
                  <div className="text-lg font-bold text-blue-600">
                    {grade.quizResults}%
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600 mb-1">Assignment {grade.assignmentId}</div>
                  <div className="text-lg font-bold text-green-600">
                    {grade.assignmentResults}%
                  </div>
                </div>
              </div>

              {grade.description && (
                <div className="mt-2 text-sm text-gray-600">
                  <p className="font-medium">Description:</p>
                  <p>{grade.description}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Grades;
