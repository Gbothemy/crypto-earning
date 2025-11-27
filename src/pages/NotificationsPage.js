import React, { useState, useEffect } from 'react';
import { db } from '../db/supabase';
import './NotificationsPage.css';

function NotificationsPage({ user, addNotification }) {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // all, unread, read

  useEffect(() => {
    loadNotifications();
  }, [user.userId]);

  const loadNotifications = () => {
    // Mock notifications - In production, fetch from database
    const mockNotifications = [
      {
        id: 1,
        type: 'success',
        icon: '✅',
        title: 'Withdrawal Approved',
        message: 'Your withdrawal of 100 CATI has been approved and processed.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false
      },
      {
        id: 2,
        type: 'achievement',
        icon: '🏆',
        title: 'Achievement Unlocked!',
        message: 'You unlocked "Week Warrior" - 7 day login streak!',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        read: false
      },
      {
        id: 3,
        type: 'level',
        icon: '⭐',
        title: 'Level Up!',
        message: 'Congratulations! You reached VIP Level 5.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true
      },
      {
        id: 4,
        type: 'referral',
        icon: '👥',
        title: 'Referral Earnings',
        message: 'You earned 500 points from your referral Alice!',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        read: true
      },
      {
        id: 5,
        type: 'event',
        icon: '🎉',
        title: 'Special Event',
        message: 'Weekend Bonus Event: Earn 2x points on all games!',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        read: true
      },
      {
        id: 6,
        type: 'info',
        icon: 'ℹ️',
        title: 'New Feature',
        message: 'Check out the new VIP Tiers system with exclusive benefits!',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        read: true
      }
    ];

    setNotifications(mockNotifications);
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    addNotification('Marked as read', 'success');
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    addNotification('All notifications marked as read', 'success');
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    addNotification('Notification deleted', 'info');
  };

  const clearAll = () => {
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
      addNotification('All notifications cleared', 'info');
    }
  };

  const getFilteredNotifications = () => {
    if (filter === 'unread') return notifications.filter(n => !n.read);
    if (filter === 'read') return notifications.filter(n => n.read);
    return notifications;
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-page">
      <div className="page-header">
        <h1 className="page-title">🔔 Notifications</h1>
        <p className="page-subtitle">Stay updated with your activities</p>
      </div>

      {/* Stats */}
      <div className="notification-stats">
        <div className="stat-card">
          <div className="stat-icon">📬</div>
          <div className="stat-info">
            <div className="stat-value">{notifications.length}</div>
            <div className="stat-label">Total</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔴</div>
          <div className="stat-info">
            <div className="stat-value">{unreadCount}</div>
            <div className="stat-label">Unread</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-value">{notifications.length - unreadCount}</div>
            <div className="stat-label">Read</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="notification-filters">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({notifications.length})
          </button>
          <button
            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button
            className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Read ({notifications.length - unreadCount})
          </button>
        </div>
        <div className="action-buttons">
          {unreadCount > 0 && (
            <button className="action-btn" onClick={markAllAsRead}>
              ✓ Mark All Read
            </button>
          )}
          {notifications.length > 0 && (
            <button className="action-btn danger" onClick={clearAll}>
              🗑️ Clear All
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No notifications</h3>
            <p>You're all caught up!</p>
          </div>
        ) : (
          filteredNotifications.map(notif => (
            <div
              key={notif.id}
              className={`notification-item ${notif.read ? 'read' : 'unread'} ${notif.type}`}
            >
              <div className="notification-icon">{notif.icon}</div>
              <div className="notification-content">
                <div className="notification-header">
                  <h4>{notif.title}</h4>
                  <span className="notification-time">{getTimeAgo(notif.timestamp)}</span>
                </div>
                <p className="notification-message">{notif.message}</p>
              </div>
              <div className="notification-actions">
                {!notif.read && (
                  <button
                    className="action-icon-btn"
                    onClick={() => markAsRead(notif.id)}
                    title="Mark as read"
                  >
                    ✓
                  </button>
                )}
                <button
                  className="action-icon-btn delete"
                  onClick={() => deleteNotification(notif.id)}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notification Preferences */}
      <div className="notification-preferences">
        <h3>📋 Notification Preferences</h3>
        <div className="preferences-grid">
          <label className="preference-item">
            <input type="checkbox" defaultChecked />
            <span>Withdrawal updates</span>
          </label>
          <label className="preference-item">
            <input type="checkbox" defaultChecked />
            <span>Achievement unlocks</span>
          </label>
          <label className="preference-item">
            <input type="checkbox" defaultChecked />
            <span>Level up notifications</span>
          </label>
          <label className="preference-item">
            <input type="checkbox" defaultChecked />
            <span>Referral earnings</span>
          </label>
          <label className="preference-item">
            <input type="checkbox" defaultChecked />
            <span>Special events</span>
          </label>
          <label className="preference-item">
            <input type="checkbox" />
            <span>Email notifications</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
