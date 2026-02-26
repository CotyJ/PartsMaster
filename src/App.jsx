import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import PartsTable from './components/PartsTable';
import KanBanCheckIn from './pages/KanBanCheckIn';
import PartsReceiving from './components/PartsReceiving';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import PurchaseOrders from './pages/PurchaseOrders';

import './styles/App.css';

function App() {
  // TODO: App is just a middle-man for main.jsx, all of this content can just be moved there

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="parts-table" element={<PartsTable />}/>
          <Route path="orders" element={<Orders />}/>
          <Route path="kb-checkin" element={<KanBanCheckIn />}/>
          <Route path="parts-receiving" element={<PartsReceiving />}/>
          <Route path="purchase-orders" element={<PurchaseOrders />}/>
          <Route path="inventory" element={<Inventory />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
