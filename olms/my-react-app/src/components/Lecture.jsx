import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const CourseSection = ({ title, lectures, onFileUpload, onFileDelete, courseId }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('courseId', courseId);
    
    try {
      await onFileUpload(formData);
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-50 p-8 rounded-lg mb-8">
      <div
        className="flex flex-col items-center gap-2 mb-8 cursor-pointer w-full"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <svg
          className={`w-8 h-8 text-gray-600 transform transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <h2 className="text-3xl font-medium text-gray-900">{title}</h2>
      </div>

      {isExpanded && (
        <div className="w-full max-w-lg space-y-6">
          {/* File Upload Section */}
          <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-lg">
            <input
              type="file"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-100"
            />
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload File'}
            </button>
          </div>

          {/* Lectures List */}
          {lectures.map((lecture) => (
            <div key={lecture.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8 2v4h8V2H8zM4 2h2v4H4V2zM2 6h20v16H2V6z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
                <a
                  href={lecture.link}
                  className="text-purple-700 hover:text-purple-900 hover:underline text-lg"
                >
                  {lecture.title}
                </a>
              </div>
              <button
                onClick={() => onFileDelete(lecture.id)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Lectures = () => {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLectures();
  }, [courseId]);

  const fetchLectures = async () => {
    try {
      const response = await fetch(`${API_URL}/olms/courses/${courseId}/lectures`, {
        method: 'GET',
      });
      const data = await response.json();
      setLectures(data);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/olms/courses/${courseId}/lectures/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      await fetchLectures(); // Refresh the lectures list
    } catch (error) {
      throw error;
    }
  };

  const handleFileDelete = async (lectureId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(`${API_URL}/olms/courses/${courseId}/lectures/${lectureId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Delete failed');
      await fetchLectures(); // Refresh the lectures list
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <CourseSection
        title={lectures.title || 'Course Lectures'}
        lectures={lectures.items || []}
        onFileUpload={handleFileUpload}
        onFileDelete={handleFileDelete}
        courseId={courseId} 
      />
    </div>
  );
};

export default Lectures;