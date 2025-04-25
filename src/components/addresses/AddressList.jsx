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
  align-self: flex-start;

  &:hover:not(:disabled) {
    background-color: #333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const AddressList = ({
  addresses,
  onAdd,
  onUpdate,
  onDelete,
  onSetDefault,
}) => {
  const [editing, setEditing] = useState(null);
  const [formError, setFormError] = useState("");

  const openForm = (addr) => {
    setFormError("");
    setEditing(addr);
  };

  const handleSave = async (data) => {
    try {
      if (editing?.id) await onUpdate(editing.id, data);
      else await onAdd(data);
      setEditing(null);
    } catch (err) {
      setFormError(err.message || JSON.stringify(err));
    }
  };

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
    } catch (err) {
      setFormError(err.message || JSON.stringify(err));
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await onSetDefault(id);
    } catch (err) {
      setFormError(err.message || JSON.stringify(err));
    }
  };

  return (
    <ListContainer>
      {formError && (
        <div style={{ color: "#a00", marginBottom: 12 }}>{formError}</div>
      )}
      {addresses.length === 0 && <p>No saved addresses. Add one below!</p>}

      {addresses.map((address) => {
        const effectiveDefault = addresses.length === 1 || address.isDefault;
        return (
          <AddressCard
            key={address.id}
            address={{ ...address, isDefault: effectiveDefault }}
            onEdit={() => openForm(address)}
            onDelete={() => handleDelete(address.id)}
            onSetDefault={() => handleSetDefault(address.id)}
          />
        );
      })}

      <AddButton
        type="button"
        onClick={() => openForm({})}
        disabled={addresses.length >= 3}
      >
        {addresses.length >= 3
          ? "Please delete an address to add more"
          : "Add New Address"}
      </AddButton>

      {editing !== null && (
        <AddressForm
          initialValues={editing.id ? editing : null}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
          errorMessage={formError}
        />
      )}
    </ListContainer>
  );
};

export default AddressList;
