import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import RootLayout from './Components/Roots/Rootlayout';
import Errorpage from './Components/Errorpage/Errorpage';
import Verification from './Components/Verification/Verification';
import Loginpage from './Components/Login-page/Login-page';

const routes =  createBrowserRouter([
  {
    path:"/",
    element:<RootLayout />,
    errorElement:<Errorpage />,
    children:[
      {path:"/login", element: <Loginpage />},
      {path:"/verification", element: <Verification />},
    ]
  }
])

function App() {
  return <RouterProvider router={routes}></RouterProvider>
}

export default App;
