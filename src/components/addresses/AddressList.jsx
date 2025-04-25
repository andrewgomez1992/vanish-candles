import { useState } from "react";
import styled from "styled-components";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  align-self: flex-start;

  &:hover {
    background-color: #333;
  }
`;

const AddressList = ({ addresses, onAdd, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(null);

  return (
    <ListContainer>
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          onEdit={() => setEditing(address)}
          onDelete={onDelete}
        />
      ))}

      <AddButton type="button" onClick={() => setEditing({})}>
        Add New Address
      </AddButton>

      {editing !== null && (
        <AddressForm
          initialValues={editing.id ? editing : null}
          onSave={(data) => {
            if (editing.id) {
              onUpdate(editing.id, data);
            } else {
              onAdd(data);
            }
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
        />
      )}
    </ListContainer>
  );
};

export default AddressList;
