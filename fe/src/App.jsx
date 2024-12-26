import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Auth from './Auth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
