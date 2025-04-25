import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .address-details {
    flex: 1;
    margin-right: 10px;

    p {
      margin: 2px 0;
    }

    .default {
      font-weight: bold;
      margin-bottom: 5px;
    }
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 5px;

    button {
      border: none;
      background-color: transparent;
      cursor: pointer;
      font-size: 0.9rem;

      &:hover {
        text-decoration: underline;
      }

      &.delete {
        color: red;
      }

      &.edit {
        color: blue;
      }
    }
  }
`;

const AddressCard = ({ address, onEdit, onDelete }) => (
  <Card>
    <div className="address-details">
      {address.isDefault && <p className="default">Default Address</p>}
      <p>{`${address.first_name} ${address.last_name}`}</p>
      <p>{address.street}</p>
      <p>{`${address.city}, ${address.state} ${address.zip}`}</p>
    </div>
    <div className="actions">
      <button type="button" className="edit" onClick={() => onEdit(address)}>
        Edit
      </button>
      <button
        type="button"
        className="delete"
        onClick={() => onDelete(address.id)}
      >
        Delete
      </button>
    </div>
  </Card>
);

export default AddressCard;
