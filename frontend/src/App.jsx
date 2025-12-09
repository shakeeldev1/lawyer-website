import { useEffect } from 'react';
import './App.css'
import AppRouter from './app/routes/AppRouter'
import { ToastContainer } from 'react-toastify';
import { useMyProfileQuery } from './features/auth/api/authApi';
import { selectUserProfile, setProfile } from './features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const user = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  const { data } = useMyProfileQuery();
  useEffect(() => {
    if (data) {
      dispatch(setProfile(data?.user))
    }
  }, [dispatch, data])

  return (
    <div className='overflow-hidden'>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 99999 }}
      />
      <AppRouter />
    </div>
  )
}

export default App
