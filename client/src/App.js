import Dashboard from './components/main/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import CardDetail from './components/main/CardDetail';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import MainLayout from './components/MainLayout';
import AuthLayout from './components/AuthLayout';
import UserAct from './components/auth/User_Activation';
import { AuthRoute, NonAuthRoute, AuthActiveRoute } from "./components/ProtectedRoute/RoutesProtect";



function App() {
  return (
    <div className="App " >
      <BrowserRouter>
        <Routes>
          <Route path="/useractivation" element={<UserAct />} />
        <Route element={<AuthRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/card/:id" element={<CardDetail />} />
          </Route>
          </Route>
        <Route element={<AuthActiveRoute />}>
          <Route element={<AuthLayout />}>
          </Route>
          </Route>
          <Route element={<NonAuthRoute/>}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
