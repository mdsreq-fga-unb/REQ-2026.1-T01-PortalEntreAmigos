import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { AppRoutes } from './routes/AppRoutes';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  );
}

export default App;
