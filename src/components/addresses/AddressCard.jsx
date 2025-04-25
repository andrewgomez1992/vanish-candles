import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff;
`;

const Details = styled.div`
  flex: 1;
  margin-right: 16px;

  p {
    margin: 4px 0;
    line-height: 1.4;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0px;
  min-width: 100px;

  button,
  .default-label {
    font-size: 0.9rem;
    padding: 6px 0px;
    border: none;
    cursor: pointer;
    background: transparent;
  }

  .edit {
    color: #007bff;
    &:hover {
      text-decoration: underline;
    }
  }

  .delete {
    color: #dc3545;
    &:hover {
      text-decoration: underline;
    }
  }

  .set-default {
    color: #28a745;
    &:hover {
      text-decoration: underline;
    }
  }

  .default-label {
    color: #fff;
    background: #28a745;
    cursor: default;
    padding: 6px 12px;
  }
`;

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => (
  <Card>
    <Details>
      <p>
        <strong>
          {address.first_name} {address.last_name}
        </strong>
      </p>
      <p>{address.street}</p>
      <p>
        {address.city}, {address.state} {address.zip}
      </p>
    </Details>

    <Actions>
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
      {address.isDefault ? (
        <span className="default-label">Default</span>
      ) : (
        <button
          type="button"
          className="set-default"
          onClick={() => onSetDefault(address.id)}
        >
          Set as Default
        </button>
      )}
    </Actions>
  </Card>
);

export default AddressCard;
