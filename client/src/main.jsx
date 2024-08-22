import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/Error.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Course from './pages/Course.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import Lesson from './pages/Lesson.jsx';
import Home from './pages/Home.jsx';
import Enrollment from './pages/Enrollment.jsx';
import { AuthProvider } from './context/Authcontext.jsx';
import AllCourse from './pages/AllCourse.jsx';
import PrivateRoute from './utils/userAuthirization.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"register",
        element:<Register/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"course",
        element:<PrivateRoute requiredRole="instructor">
                  <Course/>
                </PrivateRoute>
        
      },
      {
        path:"course/:courseId",
        element:<PrivateRoute>
                <CourseDetail/>
                </PrivateRoute>
      },
      {
        path:"allcourse",
        element:<AllCourse/>
      },
      {
        path:"lesson",
        element:<PrivateRoute requiredRole="instructor"><Lesson/></PrivateRoute>
      },
      {
        path:"enrollment",
        element:<Enrollment/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}>
    <App />
    <ToastContainer/>
    </RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
