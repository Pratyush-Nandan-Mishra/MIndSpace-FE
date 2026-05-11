import { useState, useEffect } from "react";
import { Table, Tabs, Button, Input, message, Popconfirm, Spin } from "antd";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4433/api';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/auth/users`, {
          credentials: 'include',
        });
        const data = await response.json();
        if (data.success) {
          setUsers(data.users.map(u => ({
            id: u._id,
            name: u.name,
            email: u.email,
            phone: u.phoneNumber || '',
            role: u.role,
          })));
        }
        else {
          message.error('Failed to fetch users');
        }
      }
      catch {
        message.error('Error fetching users');
      }
      finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  
  return (
    <Spin spinning={loading} tip="Loading users...">
      <Table
        dataSource={users}
        rowKey="id"
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Email", dataIndex: "email" },
          { title: "Phone", dataIndex: "phone" },
          { title: "Role", dataIndex: "role" },
          {
            title: "Actions",
            render: () => (
              <div style={{ display: "flex", gap: 8 }}>
                <Button type="primary" size="small">Allow</Button>
                <Button danger size="small" disabled>Block</Button>
              </div>
            ),
          },
        ]}
        pagination={false}
      />
    </Spin>
  );
};


const FeedbackTable = () => {
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/feedback/all`, {
          credentials: 'include',
        });
        const data = await response.json();
        if (data.success) {
          setFeedbacks(data.feedbacks.map(u => ({
            id: u._id,
            name: u.name,
            email: u.email,
            message: u.message,
            createdAt: u.createdAt
          })));
        }
        else {
          message.error('Failed to fetch feedbacks');
        }
      }
      catch {
        message.error('Error fetching feedbacks');
      }
      finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);


  const handleReply = (id) => {
    if (!replyText.trim()) {
      message.warning("Reply text cannot be empty");
      return;
    }

    setFeedbacks((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, reply: replyText }
          : item
      )
    );

    setReplyingId(null);
    setReplyText("");
    message.success("Reply sent!");
  };

  const handleDelete = (id) => {
    setFeedbacks((prev) => prev.filter((item) => item.id !== id));
    message.success("Feedback deleted!");
  };

  return (
    <Table
      dataSource={feedbacks}
      rowKey="id"
      columns={[
        { title: "Name", dataIndex: "name" },
        { title: "Email", dataIndex: "email" },
        { title: "Message", dataIndex: "message" },
        {
          title: "Actions",
          render: (_, record) => (
            <div style={{ display: "flex", gap: 8 }}>
              <Button size="small" onClick={() => setReplyingId(record.id)}>
                Reply
              </Button>
              <Popconfirm
                title="Are you sure to delete this feedback?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger size="small">Delete</Button>
              </Popconfirm>
            </div>
          ),
        },
        {
          title: "Reply",
          render: (_, record) =>
            replyingId === record.id ? (
              <div style={{ display: "flex", gap: 8 }}>
                <Input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  size="small"
                />
                <Button
                  type="primary"
                  size="small"
                  onClick={() => handleReply(record.id)}
                  disabled={!replyText.trim()}
                >
                  Send
                </Button>
                <Button size="small" onClick={() => setReplyingId(null)}>
                  Cancel
                </Button>
              </div>
            ) : record.reply ? (
              <span>{record.reply}</span>
            ) : null,
        },
      ]}
      pagination={false}
    />
  );
};


const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs
        defaultActiveKey="users"
        items={[
          {
            key: "users",
            label: "USERS",
            children: <UsersTable />,
          },
          {
            key: "feedback",
            label: "FEEDBACK (REPLY)",
            children: <FeedbackTable />,
          },
        ]}
      />
    </div>
  );
};

export default AdminDashboard;