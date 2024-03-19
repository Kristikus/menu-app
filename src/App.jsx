// import react-router-dom
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';

// import pages
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Create from './pages/Create';
import MenuDetails from './pages/MenuDetails';
import Page404 from './pages/Page404';

const Root = () => {
  return (
    <div className='App'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Home />} />
      <Route path='menus/:id' element={<MenuDetails />} />
      <Route path='create' element={<Create />} />
      <Route path='*' element={<Page404 />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
