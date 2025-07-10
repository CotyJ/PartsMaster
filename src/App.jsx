import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import PartsTable from './PartsTable';
import Home from './Home';
import Orders from './Orders';
import KanBanCheckIn from './KanBanCheckIn';
import PartsReceiving from './PartsReceiving';

import './App.css';

function App() {
  // TODO: App is just a middle-man for main.jsx, all of this content can just be moved there

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="parts-table" element={<PartsTable />}/>
          <Route path="orders" element={<Orders />}/>
          <Route path="kb-checkin" element={<KanBanCheckIn />}/>
          <Route path="parts-receiving" element={<PartsReceiving />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
