import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useState } from "react";
import './App.css'

function CourseList({ courses }) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-gradient-to-br from-white/80 via-blue-100 to-purple-100 rounded-2xl shadow-lg p-6 flex flex-col border border-blue-200 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-2 text-blue-700">{course.title}</h3>
            <p className="mb-4 text-gray-700">{course.description}</p>
            <Link to={`/course/${course.id}`} className="mt-auto inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-pink-500 hover:to-yellow-500 transition-all">View Course</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function Progress({ progress }) {
  return (
    <div className="my-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-blue-700">Progress</span>
        <span className="text-sm font-medium text-blue-700">{progress}%</span>
      </div>
      <div className="w-full bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-full h-3">
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

function CoursePage({ course, progress, onProgress }) {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">{course.title}</h2>
      <p className="mb-4 text-gray-700">{course.description}</p>
      <Progress progress={progress} />
      <div className="aspect-video mb-4 rounded-xl overflow-hidden shadow-lg border-4 border-blue-200">
        <iframe
          className="w-full h-full"
          src={course.video}
          title={course.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <button
        className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-2 rounded-lg font-bold shadow hover:from-pink-500 hover:to-yellow-500 transition-all"
        onClick={onProgress}
      >
        Mark as Watched
      </button>
      <div className="mt-4">
        <Link to="/" className="text-blue-600 hover:underline">Back to Courses</Link>
      </div>
    </div>
  );
}

const demoCourses = [
  {
    id: 1,
    title: "React Basics",
    description: "Learn the basics of React including components, state, and props.",
    video: "https://www.youtube.com/embed/bMknfKXIFA8"
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into advanced JavaScript concepts.",
    video: "https://www.youtube.com/embed/Oe421EPjeBE"
  }
];

function App() {
  const [progressMap, setProgressMap] = useState({ 1: 0, 2: 0 });

  return (
    <Router>
      <nav className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 text-white p-5 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="font-extrabold text-2xl tracking-tight text-white drop-shadow-lg">E-Learning Platform</Link>
        </div>
      </nav>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 pb-10">
        <Routes>
          <Route path="/" element={<CourseList courses={demoCourses} />} />
          <Route
            path="/course/:id"
            element={
              <CourseRoute
                courses={demoCourses}
                progressMap={progressMap}
                setProgressMap={setProgressMap}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function CourseRoute({ courses, progressMap, setProgressMap }) {
  const { id } = window.location.pathname.match(/course\/(\d+)/) || {};
  const courseId = id || window.location.pathname.split("/").pop();
  const course = courses.find((c) => String(c.id) === String(courseId));
  if (!course) return <div className="p-6">Course not found.</div>;
  const progress = progressMap[course.id] || 0;
  const handleProgress = () => {
    setProgressMap((prev) => ({ ...prev, [course.id]: 100 }));
  };
  return <CoursePage course={course} progress={progress} onProgress={handleProgress} />;
}

export default App
