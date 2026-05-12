import { PlusOutlined, SearchOutlined, MenuOutlined, BellOutlined, UserOutlined, MessageOutlined, EditOutlined, CreditCardOutlined, ThunderboltOutlined, LogoutOutlined, CloseOutlined, CrownOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Divider, message, Tooltip } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4433/api';
import { DarkThemeProvider } from '../infra';
import ProfileDrawer from '../pages/dashboard/ProfileDrawer';

const Sidebar = ({ isOpen, onToggle, chats, currentChatId, onNewChat, onSelectChat, onDeleteChat, searchQuery, onSearchChange, onClearHistory }) => {
  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { user, setUser, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profile, setProfile] = useState(user);
  const [, setLoading] = useState(false);
  const setUserRef = useRef(setUser);

  useEffect(() => {
    setUserRef.current = setUser;
  }, [setUser]);

  useEffect(() => {
    setProfile(user);
  }, [user]);

  const [messageApi, contextHolder] = message.useMessage();

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

  const handleClearHistory = async () => {
    try {
      if (onClearHistory) {
        const success = await onClearHistory();
        if (success) {
          messageApi.success("Chat history cleared successfully!");
        } else {
          messageApi.error("Failed to clear chat history.");
        }
      }
    } catch (error) {
      console.error("Failed to clear history:", error);
      messageApi.error("Failed to clear chat history.");
    }
  };

  // Updated menu items array for new Dropdown API
  const menuItems = [
    {
      key: 'upgrade',
      label: (
        <span className="text-blue-400 font-semibold">
          <CrownOutlined /> &nbsp; Upgrade to Pro
        </span>
      ),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'account',
      label: (
        <span>
          <UserOutlined /> &nbsp; Account
        </span>
      ),
    },
    {
      key: 'edit-profile',
      label: (
        <span>
          <EditOutlined /> &nbsp; Edit Profile
        </span>
      ),
      onClick: () => setDrawerOpen(true),
    },
    {
      key: 'billing',
      label: (
        <span>
          <CreditCardOutlined /> &nbsp; Billings
        </span>
      ),
    },
    {
      key: 'notifications',
      label: (
        <span>
          <BellOutlined /> &nbsp; Notifications
        </span>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'clear-history',
      label: (
        <span className="text-red-400">
          <CloseOutlined /> &nbsp; Clear History
        </span>
      ),
      onClick: handleClearHistory,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <span className="text-red-400">
          <LogoutOutlined /> &nbsp; Log out
        </span>
      ),
      onClick: logout,
    },
  ];

  return (
    <>
      {contextHolder}
      {/* Overlay for mobile when expanded */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-[#0a0a1a] border-r border-white/5 z-50 transition-all duration-300 ease-in-out
          ${isOpen ? 'w-72 translate-x-0' : 'w-16 -translate-x-full md:translate-x-0'}
          md:relative`}
      >
        <div className="flex flex-col h-full bg-[#0a0a1a] overflow-hidden">
          {/* Header */}
          <div className="flex flex-col border-b border-white/5 transition-all duration-300">
            <div className="flex items-center justify-between p-4">
              <div className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                {isOpen && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl flex items-center justify-center text-base flex-shrink-0 shadow shadow-violet-500/30">
                      🧠
                    </div>
                    <div>
                      <h1 className="text-sm font-black whitespace-nowrap text-white leading-none">MindSpace</h1>
                      <p className="text-xs text-violet-400 mt-0.5 whitespace-nowrap">AI mental support companion</p>
                    </div>
                  </div>
                )}
              </div>
              <Tooltip title={isOpen ? "Close sidebar" : "Open sidebar"} placement="right">
                <button onClick={onToggle}
                  className={`p-2 hover:bg-white/10 rounded-xl text-slate-500 hover:text-white transition-all duration-200 ${!isOpen ? 'mx-auto' : ''}`}>
                  <MenuOutlined style={{ fontSize: 14 }} />
                </button>
              </Tooltip>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="p-3 border-b border-white/5">
            <Tooltip title="New Chat" placement="right" open={!isOpen ? undefined : false}>
              <button onClick={onNewChat}
                className={`w-full flex items-center gap-2.5 bg-gradient-to-r from-violet-600/20 to-pink-500/20 hover:from-violet-600/30 hover:to-pink-500/30 border border-violet-500/20 hover:border-violet-500/40 rounded-xl text-white transition-all duration-200 font-semibold text-sm
                  ${isOpen ? 'justify-center px-4 py-2.5' : 'justify-center px-3 py-2.5'}`}>
                <PlusOutlined style={{ fontSize: 13 }} />
                <span className={`transition-all duration-300 whitespace-nowrap ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
                  New Chat
                </span>
              </button>
            </Tooltip>
          </div>

          {/* Search */}
          <div className={`border-b border-white/5 transition-all duration-300 ${isOpen ? 'px-3 py-3' : 'px-2 py-3'}`}>
            {isOpen ? (
              <div className="relative">
                <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" style={{ fontSize: 13 }} />
                <input type="text" placeholder="Search chats…" value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:border-violet-500/50 transition-all" />
              </div>
            ) : (
              <Tooltip title="Search" placement="right">
                <button onClick={onToggle}
                  className="w-full p-2 hover:bg-white/10 rounded-xl text-slate-500 hover:text-white transition-colors flex items-center justify-center">
                  <SearchOutlined style={{ fontSize: 14 }} />
                </button>
              </Tooltip>
            )}
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            <div className="py-2">
              {isOpen ? (
                <div className="px-2">
                  {filteredChats.map((chat) => (
                    <div key={chat.id} onClick={() => onSelectChat(chat.id)}
                      className={`group relative p-3 mx-1 my-0.5 cursor-pointer rounded-xl transition-all duration-200 ${
                        currentChatId === chat.id
                          ? 'bg-violet-500/10 border border-violet-500/20'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}>
                      <div className={`text-sm font-medium truncate leading-5 pr-6 ${currentChatId === chat.id ? 'text-violet-200' : 'text-slate-300'}`}>
                        {chat.title}
                      </div>
                      <div className="text-slate-600 text-xs mt-1">
                        {new Date(chat.lastMessage).toLocaleDateString()}
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); onDeleteChat?.(chat.id); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        title="Delete chat">
                        <CloseOutlined style={{ fontSize: 11 }} />
                      </button>
                    </div>
                  ))}
                  {filteredChats.length === 0 && (
                    <div className="p-6 text-slate-600 text-sm text-center">
                      {searchQuery ? 'No chats found' : 'No conversations yet'}
                    </div>
                  )}
                </div>
              ) : (
                <div className="px-1">
                  {filteredChats.slice(0, 8).map((chat) => (
                    <Tooltip key={chat.id} title={chat.title} placement="right">
                      <div onClick={() => onSelectChat(chat.id)}
                        className={`p-2.5 mx-1 my-0.5 cursor-pointer rounded-xl transition-all duration-200 flex items-center justify-center ${
                          currentChatId === chat.id ? 'bg-violet-500/20' : 'hover:bg-white/5'
                        }`}>
                        <MessageOutlined style={{ fontSize: 14 }}
                          className={currentChatId === chat.id ? 'text-violet-400' : 'text-slate-500'} />
                      </div>
                    </Tooltip>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer with Profile */}
          <footer className="border-t border-white/5 p-3">
            <Dropdown
              menu={{ 
                items: menuItems,
                className: "bg-gray-900 border-gray-700"
              }}
              trigger={['click']}
              placement="topRight"
              arrow={isOpen}
              disabled={!isOpen}
            >
              <Tooltip title="Profile" placement="right" open={!isOpen ? undefined : false}>
                <div className={`flex items-center cursor-pointer hover:bg-white/5 rounded-xl transition-all duration-200 ${isOpen ? 'gap-3 p-2.5' : 'justify-center p-2'}`}>
                  <Avatar
                    size={isOpen ? "default" : "small"}
                    src={profile?.picture || profile?.name}
                    className="bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl cursor-pointer flex-shrink-0"
                  />
                  <div className={`flex flex-col transition-all duration-300 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
                    <span className="text-white font-semibold text-sm whitespace-nowrap leading-none">
                      {profile?.name}
                    </span>
                    <div className="text-xs mt-1 text-violet-400 truncate flex items-center gap-1">
                      <ThunderboltOutlined className="text-xs" />
                      {user?.userType || 'Free Plan'}
                    </div>
                  </div>
                </div>
              </Tooltip>
            </Dropdown>
          </footer>
        </div>
      </div>

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

export default Sidebar;