import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InfoForm from './components/InfoForm.js';
import Resume from './components/Resume.js';
import Qualifications from './components/qualificationsByRole.js';
import WorkExperience from './components/WorkExperience.js';
import Home from './components/Home.js';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/student/createresume" element={<InfoForm/>} />
          <Route path="/student/getresume/:role" element={<Resume/>} />
          <Route path="/student/getQualification/:role" element={<Qualifications/>} />
          <Route path="/student/getWorkExperience/:role" element={<WorkExperience/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
