import styled from "styled-components";

const Summary = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  .metric {
    flex: 1;
    padding: 20px;
    background-color: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;

    h3 {
      margin-bottom: 10px;
      font-size: 1.2rem;
      color: #333;
    }

    p {
      font-size: 1rem;
      color: #000000;
    }
  }
`;

const Metrics = ({ orders, products }) => {
  // Make sure orders is an array
  const totalSales =
    Array.isArray(orders) &&
    orders.reduce(
      (total, order) => total + parseFloat(order.total.slice(1)),
      0
    );

  return (
    <Summary>
      <div className="metric">
        <h3>Total Sales</h3>
        <p>${totalSales || 0}</p>
      </div>
      <div className="metric">
        <h3>Total Orders</h3>
        <p>{Array.isArray(orders) ? orders.length : 0}</p>
      </div>
      <div className="metric">
        <h3>Active Products</h3>
        <p>{Array.isArray(products) ? products.length : 0}</p>
      </div>
    </Summary>
  );
};

export default Metrics;
