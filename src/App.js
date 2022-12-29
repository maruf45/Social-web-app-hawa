import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Router/router';

function App() {
  return (
   <>
   <RouterProvider router={Router}/>
   </>
  );
}

export default App;
