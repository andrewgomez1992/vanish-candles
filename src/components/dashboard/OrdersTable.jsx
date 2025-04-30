import styled from "styled-components";

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 10px;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      text-align: left;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f5f5f5;
      font-weight: bold;
    }

    tr:hover {
      background-color: #f9f9f9;
    }
  }
`;

const OrdersTable = ({ orders }) => {
  return (
    <div>
      <h2>Orders</h2>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) &&
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.total}</td>
                  <td>{order.date}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </TableContainer>
    </div>
  );
};

export default OrdersTable;
