// HomePage.jsx
import React, {useState, useEffect} from 'react';
import Sidebar from './SideNav';
import Dashboard from './Dashboard';
import ToDoList from './ToDoList';
import './Homepage.css';
import ai from './Ai.jpg';
import s from './se.jpg';
import ScrollProgress from './ScrollProg';

const HomePage = () => {

  const userID = localStorage.getItem('userID');

  const [assistants, setTAs] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    courseName: '',
    ta: ''
  });

  const [courses, setCourses] = useState([
    { id: 'ai', image: ai, title: 'Artificial Intelligence', description: 'Works on different parts of AI', rating: 4.5 },
    { id: 'se2', image: s, title: 'Software Engineering', description: 'Different processes SDLC models', rating: 4.8 },
  ]);

  useEffect(() => {
    const fetchTAs = async () => {
      try {
        const response = await fetch('https://glorious-space-sniffle-qgvj679v5w43xggx-8080.app.github.dev/olms/gettalist');

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setTAs(data); // Assuming `data` is an array of TAs
        console.log(data);
        console.log(assistants);
      } catch (error) {
        console.error('Error fetching TAs:', error);
      }
    };
    fetchTAs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    const newCourse = {
      id: formData.courseId, // courseId from the form
      image: s, // static image (you can modify as needed)
      title: formData.courseName, // courseName from the form
      description: 'New course', // Static description (you can change it based on your needs)
      rating: 4, // Static rating (you can modify this as well)
    };
    
    // Append the new course to the existing courses array
    setCourses([...courses, newCourse]);

    // Reset form data
    setFormData({
      courseId: '',
      courseName: '',
      ta: ''
    });
    console.log('New Course Added:', newCourse);

    // Add API call to submit form data if necessary
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toDoItems = [
    { title: 'Assignment P1', dueDate: 'Oct 9, 11:59 PM' },
    { title: 'Coming Up Quiz-4', dueDate: 'Oct 21, 11:59 PM' },
  ];

  return (
    <div className="home-page">
      <Sidebar />
      <div className="main-content">
        <Dashboard courses={courses} />
        <ToDoList items={toDoItems} />
        
        {/* Form for adding course */}
        <form onSubmit={handleSubmit} className="course-form">
          <h2>Add Course</h2>
          <label>
            Course ID:
            <input
              type="number"
              name="courseId"
              value={formData.courseId}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Course Name:
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            TA:
            <select
              name="ta"
              value={formData.ta}
              onChange={handleInputChange}
              required
            >
              <option value="">Select TA</option>
              {assistants.map((ta) => (
                <option key={ta.id} value={ta.id}>{ta.fullName}</option>
              ))}
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>

        <ScrollProgress />
      </div>
    </div>
  );
};

export default HomePage;

