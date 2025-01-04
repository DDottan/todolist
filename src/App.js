import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import TodoDetailPage from './pages/TodoDetailPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/todo/:id',
        element: <TodoDetailPage />
    }
]);

function App() {
  return (
    <div className="App">   
        <main>
            <RouterProvider router={router} />
        </main>
    </div>
  );
}

export default App;
