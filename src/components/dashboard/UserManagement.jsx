import { useState } from "react";
import styled from "styled-components";
import { FaUserShield, FaBan, FaTrashAlt } from "react-icons/fa";
import Tooltip from "../common/Tooltip";

const UserManagementWrapper = styled.div`
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto; // Added for mobile responsiveness
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;

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

  @media (max-width: 768px) {
    th,
    td {
      padding: 8px;
      font-size: 0.9rem;
    }
  }
`;

const ActionButtonWrapper = styled.div`
  display: inline-flex;
  gap: 10px;
  align-items: center;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 30px;
  height: 30px;
  min-width: auto;

  &:hover {
    background-color: #f0f0f0;
  }

  &.role {
    border-color: #ff9800;
  }

  &.deactivate {
    border-color: #f0ad4e;
  }

  &.delete {
    border-color: #f44336;
  }

  svg {
    font-size: 18px;
  }
`;

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
                <ActionButtonWrapper>
                  <Tooltip tooltipText="Change User Role">
                    <ActionButton
                      className="role"
                      onClick={() =>
                        handleRoleChange(
                          user.id,
                          user.role === "User" ? "Admin" : "User"
                        )
                      }
                    >
                      <FaUserShield />
                    </ActionButton>
                  </Tooltip>

                  <Tooltip tooltipText="Deactivate User">
                    <ActionButton
                      className="deactivate"
                      onClick={() => handleDeactivateUser(user.id)}
                    >
                      <FaBan />
                    </ActionButton>
                  </Tooltip>

                  <Tooltip tooltipText="Delete User">
                    <ActionButton
                      className="delete"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <FaTrashAlt />
                    </ActionButton>
                  </Tooltip>
                </ActionButtonWrapper>
              </td>
            </tr>
          ))}
        </tbody>
      </UserTable>
    </UserManagementWrapper>
  );
};

export default UserManagement;
