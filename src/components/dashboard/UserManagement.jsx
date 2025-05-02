import { useState } from "react";
import styled from "styled-components";

const UserManagementWrapper = styled.div`
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f5f5f5;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }

  &.deactivate {
    background-color: #f0ad4e;
  }

  &.delete {
    background-color: #d9534f;
  }
`;

// Mock user data ,replace with actual data next
const mockUsers = [
  { id: "1", name: "Alice", email: "alice@example.com", role: "User" },
  { id: "2", name: "Bob", email: "bob@example.com", role: "Admin" },
  { id: "3", name: "Charlie", email: "charlie@example.com", role: "User" },
  { id: "4", name: "David", email: "david@example.com", role: "User" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);

  // Function to handle changing user roles (Admin/User)
  const handleRoleChange = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    // API call can be made to update role in the backend here.
  };

  // Function to handle deactivating a user
  const handleDeactivateUser = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: "Deactivated" } : user
      )
    );
    // API call can be made to deactivate the user in the backend here.
  };

  // Function to handle deleting a user
  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    // API call can be made to delete the user in the backend here.
  };

  return (
    <UserManagementWrapper>
      <h2>User Management</h2>
      <UserTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <ActionButton
                  onClick={() =>
                    handleRoleChange(
                      user.id,
                      user.role === "User" ? "Admin" : "User"
                    )
                  }
                >
                  {user.role === "User" ? "Make Admin" : "Revoke Admin"}
                </ActionButton>
                <ActionButton
                  className="deactivate"
                  onClick={() => handleDeactivateUser(user.id)}
                >
                  Deactivate
                </ActionButton>
                <ActionButton
                  className="delete"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </UserTable>
    </UserManagementWrapper>
  );
};

export default UserManagement;
