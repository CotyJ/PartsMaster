import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import PartsTable from './PartsTable';
import Home from './Home';
import Orders from './Orders';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="parts-table" element={<PartsTable />}/>
          <Route path="orders" element={<Orders />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

