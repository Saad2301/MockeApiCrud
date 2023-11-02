// App.js
import './App.css';
import {PrivateRoute} from './PrivateRoute/PrivateRoute';
import Dashboard from './components/features/Dashboard';
import LogIn from './components/features/LogIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './PrivateRoute/ProtectedRoute';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* <Route  element={<ProtectedRoute />}>   </Route> */}
          <Route path="/login" element={<LogIn />} />
         
          {/* <Route path="/login" element={<LogIn />} /> */}
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute component={Dashboard}/>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
