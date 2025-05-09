import { useState } from "react";
import styled from "styled-components";

// currently not used - possibly also need notification icon in nav

const NotificationPanelWrapper = styled.div`
  background-color: white;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  border-radius: 8px;
`;

const NotificationList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const NotificationItem = styled.li`
  background-color: #f8f9fa;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.new {
    background-color: #d1ecf1;
  }

  .notification-text {
    flex: 1;
    color: #333;
  }

  .actions {
    button {
      padding: 5px 10px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 0.9rem;
      margin-left: 10px;

      &:hover {
        background-color: #0056b3;
      }
    }

    button.dismiss {
      background-color: #d9534f;
      &:hover {
        background-color: #c9302c;
      }
    }
  }
`;

const NotificationPanel = () => {
  // Fake data for notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order placed by Alice", type: "order", read: false },
    {
      id: 2,
      message: "Inventory alert: Lavender Candle low stock",
      type: "inventory",
      read: false,
    },
    {
      id: 3,
      message: "System update scheduled for tomorrow",
      type: "system",
      read: false,
    },
  ]);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const dismissNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.id !== id)
    );
  };

  return (
    <NotificationPanelWrapper>
      <h3>Notifications</h3>
      <NotificationList>
        {notifications.map((notif) => (
          <NotificationItem key={notif.id} className={notif.read ? "" : "new"}>
            <span className="notification-text">{notif.message}</span>
            <div className="actions">
              {!notif.read && (
                <button onClick={() => markAsRead(notif.id)}>
                  Mark as Read
                </button>
              )}
              <button
                className="dismiss"
                onClick={() => dismissNotification(notif.id)}
              >
                Dismiss
              </button>
            </div>
          </NotificationItem>
        ))}
      </NotificationList>
    </NotificationPanelWrapper>
  );
};

export default NotificationPanel;
