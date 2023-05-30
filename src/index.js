import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './reset.css';
import './index.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import App from './App';
import ProtectedRoutes from './Components/Util/ProtectedRoutes';
import CompanyDetails from './Components/Portal/Companydetails/Companydetails';
import Auth from './Components/Auth-Register/Auth';
import Loginpage from './Components/Auth-Register/Login-page/LoginPage';
import Welcomeregister from './Components/Auth-Register/Welcome-register/Welcome-register';
import Registration from './Components/Auth-Register/Registration/Registration';
import Verification from './Components/Auth-Register/Verification/Verification';
import RegenerateOtp from './Components/Auth-Register/Regenerate-otp/RegenerateOtp';
import ForgotPass from './Components/Auth-Register/Forgot-password/ForgotPassword';
import ChangeEmail from './Components/Auth-Register/Change-email/ChangeEmail';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter basename={'/'}>
      <Routes>
          <Route path='/auth' element={<Auth />}>
              <Route path='Welcomeregister' element={<Welcomeregister />} />
              <Route path='login' element={<Loginpage />} />
              <Route path='registration/:registeruser' element={<Registration />} />
              <Route path='verification' element={<Verification />} />
              <Route path='regenerateotp' element={<RegenerateOtp />} />
              <Route path='forgot-password' element={<ForgotPass />} />
              <Route path='change-email' element={<ChangeEmail />} />
          </Route>
          <Route path="/" element={<App />}>
              <Route path='' element={<ProtectedRoutes />}>
                <Route path='companydetails' element={<CompanyDetails />} />
              </Route>
          </Route>
      </Routes>
  </BrowserRouter>
);
