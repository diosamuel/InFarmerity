import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Auth from './Auth';
import TestSTX from './TestSTX';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/test" element={<TestSTX />} />
    </Routes>
  );
}

export default App;
