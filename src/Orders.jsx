import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Orders() {
  const [ordersLineItemData, setOrdersLineItemData] = useState([]);
  const [orderNumbers, setOrderNumbers] = useState([]);
  const [orderFilter, setOrderFilter] = useState('all');
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const get_orders_line_item = () => {
    const purchase_order_numbers = new Set();
    axios
      .get(`${BASE_URL}/orders`)
      .then((response) => {
        const { data } = response;
        setOrdersLineItemData(data);
        data.forEach((item) => {
          purchase_order_numbers.add(item.po_number);
        });
        const updatedPOs = [...purchase_order_numbers];
        setOrderNumbers(updatedPOs);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    get_orders_line_item();
  }, []);

  return (
    <>
      <form className="mb-2">
        <fieldset>
          <legend className="fw-bold page-legend mb-4">
            Orders by line item
          </legend>

          <div className="d-flex align-items-center gap-3 flex-wrap">
            <label className="form-label fw-bold fs-5 pe-2">
              Filter by Purchase Order:
            </label>

            <select
              id="po-filter"
              className="form-control"
              onChange={(e) => setOrderFilter(e.target.value)}
              style={{ maxWidth: '200px' }}
            >
              <option value="all">All</option>
              {orderNumbers.map((number, index) => (
                <option value={number} key={index}>
                  {number}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      </form>

      <table className="table table-dark table-striped table-hover text-start mw-100">
        <thead>
          <tr>
            <th className="text-center col-auto" scope="col">
              <div className="column-name">PO Number</div>
            </th>

            <th className="text-center col-auto" scope="col">
              <div className="column-name">Part Number</div>
            </th>

            <th className="text-center col-auto" scope="col">
              <div className="column-name">Item Cost</div>
            </th>

            <th className="text-center col-auto" scope="col">
              <div className="column-name">Order Qty</div>
            </th>

            <th className="text-center col-auto" scope="col">
              <div className="column-name">Total</div>
            </th>

            {/* due date can be styled on overdue */}
            <th className="text-center col-auto" scope="col">
              <div className="column-name">Due Date</div>
            </th>

            <th className="text-center col-auto" scope="col">
              <div className="column-name">Received Qty</div>
            </th>

            <th className="text-center col-auto" scope="col">
              <div className="column-name">Received Date</div>
            </th>
          </tr>
        </thead>

        <tbody>
          {ordersLineItemData
            .filter((item) => orderFilter == 'all' || item.po_number == orderFilter)
            .map((item) => (
              <tr key={item.id}>
                <td className="text-center">{item.po_number}</td>
                <td className="text-center">{item.part_number}</td>
                <td className="text-center">{`$${item.li_cost}`}</td>
                <td className="text-center">{item.order_qty}</td>
                <td className="text-center">{`$${(
                  item.li_cost * item.order_qty
                ).toFixed(2)}`}</td>
                <td className="text-center">{item.due_date.split('T')[0]}</td>
                <td className="text-center">{item.received_qty}</td>
                <td className="text-center">
                  {item.received_date !== null
                    ? item.received_date.split('T')[0]
                    : ''}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
