import './App.css'
import AppRouter from './app/routes/AppRouter'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div>
      <ToastContainer />
      <AppRouter />
    </div>
  )
}

export default App
