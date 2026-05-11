import React, { useState, useEffect, useRef } from "react";
import { Avatar, Dropdown, message, Spin } from "antd";
import { EditOutlined, LogoutOutlined } from "@ant-design/icons";
import ProfileDrawer from "./ProfileDrawer";
import { DarkThemeProvider } from "../../infra";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4433/api';

const DashboardHeader = () => {
  const { user, setUser, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profile, setProfile] = useState(user);
  const [, setLoading] = useState(false);
  const setUserRef = useRef(setUser);

  // Keep ref updated with the latest setUser
  useEffect(() => {
    setUserRef.current = setUser;
  }, [setUser]);

  // Update profile when user changes
  useEffect(() => {
    setProfile(user);
  }, [user]);

  const [messageApi, contextHolder] = message.useMessage();

  const items = [
    {
      key: "edit",
      label: (
        <span className="flex items-center gap-2">
          <EditOutlined /> Edit&nbsp;Profile
        </span>
      ),
      onClick: () => setDrawerOpen(true),
    },
    {
      key: "logout",
      label: (
        <span className="flex items-center gap-2 text-red-500">
          <LogoutOutlined /> Logout
        </span>
      ),
      onClick: logout,
    },
  ];

  const handleSaveProfile = async (values) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/auth/profile`, values, {
        withCredentials: true
      });

      if (response.data.success) {
        const updatedUser = response.data.user;
        setUserRef.current(updatedUser);
        setProfile(updatedUser);
        messageApi.success("Profile updated successfully!");
      } else {
        messageApi.error("Failed to update profile.");
      }
    } catch (err) {
      console.error("Failed to save profile", err);
      messageApi.error("An error occurred while saving the profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {contextHolder}

      <header className="px-4 py-4 lg:px-6 border-b border-gray-800 shadow">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-lg lg:text-xl font-semibold">MindSpace</h1>
          <p className="text-sm text-gray-300">AI mental support companion</p>

          <div className="flex items-center gap-2 ml-auto">
            <span className="font-medium text-sm lg:text-base">{user?.name}</span>

            <Dropdown trigger={["click"]} placement="bottomRight" menu={{ items }}>
              <Avatar
                size="large"
                src={profile?.picture || profile?.name}
                className="bg-orange-500 rounded-full cursor-pointer"
              />
            </Dropdown>
          </div>
        </div>
      </header>

      <DarkThemeProvider>
        <ProfileDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          initialData={{
            name: profile?.name || "",
            email: profile?.email || "",
            phone: profile?.phoneNumber || "",
            notifications: profile?.emailNotifications ?? false
          }}
          onSave={handleSaveProfile}
        />
      </DarkThemeProvider>
    </>
  );
};

export default DashboardHeader;