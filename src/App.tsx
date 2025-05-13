import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorFind from './components/ErrorFind';
import ActivityOneResults from './components/ActivityOneResults';
import ActivityTwoResults from './components/ActivityTwoResults';
import ActivityOne from './components/ActivityOne';
import ActivityTwo from './components/ActivityTwo';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ErrorFind />} />
        <Route path="/activity-one" element={<ActivityOne />} />
        <Route path="/activity-two" element={<ActivityTwo />} />
        <Route path="/activity-one/results" element={<ActivityOneResults />} />
        <Route path="/activity-two/round/:round" element={<ActivityTwo />} />
        <Route path="/activity-two/results" element={<ActivityTwoResults />} />
      </Routes>
    </Router>
  );
}

export default App;
