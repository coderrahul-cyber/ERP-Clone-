import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './utils/router.tsx'
import UserContextprovider from './context/user.tsx'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')!).render(
  <UserContextprovider>
    <RouterProvider router={router} />
    <ToastContainer />
  </UserContextprovider>
)
