import React from "react";
import axios from "axios";
import { Footer, Navbar } from "../components";
import {
  RocketOutlined,
  UserOutlined,
  BulbOutlined,
  HeartOutlined,
  GlobalOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Card, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { GoogleOutlined } from '@ant-design/icons';

const features = [
  {
    id: "ananya",
    title: "ANANYA",
    subtitle: "Your Emotional Wellness AI Companion",
    image: "/features/ananya.jpg",
    active: true,
  },
  {
    id: "suraksha",
    title: "SURAKSHA",
    subtitle: "Women’s Safety Voice AI\n(Emergency + Support)",
    image: "/features/suraksha.jpg",
  },
  {
    id: "kaavya",
    title: "KAAVYA",
    subtitle: "AI Storyteller / Mythology Companion",
    image: "/features/kaavya.jpg",
  },
  {
    id: "prerna",
    title: "PRERNA",
    subtitle: "Voice-Guided Microentrepreneur Support",
    image: "/features/prerna.jpg",
  },
  {
    id: "vidya",
    title: "VIDYA",
    subtitle: "Voice-AI for Learning",
    image: "/features/vidya.jpg",
  },
  {
    id: "jyoti",
    title: "JYOTI",
    subtitle: "Natal chart, daily predictions, Vedic wisdom",
    image: "/features/jyoti.jpg",
  },
];

const about = [
  {
    id: "mission",
    icon: RocketOutlined,
    title: "Our Mission",
    text: "We aim to revolutionize human–AI relationships",
  },
  {
    id: "vision",
    icon: UserOutlined,
    title: "Radical Personalization",
    text: "No two humans are alike — So We craft using deep personalization",
  },
  {
    id: "innovation",
    icon: BulbOutlined,
    title: "Driven by Innovation",
    text: "From neural voice synthesis to context-rich memory",
  },
  {
    id: "empathy",
    icon: HeartOutlined,
    title: "Emotion at the Core",
    text: "Sense emotional tone and adapt responses with empathy",
  },
  {
    id: "global",
    icon: GlobalOutlined,
    title: "Culturally Rooted Intelligence",
    text: "AI that understands regional expressions, traditions, and norms",
  },
  {
    id: "impact",
    icon: StarOutlined,
    title: "Real Impact",
    text: "From mental wellness support to educational guidance",
  },
];

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4433/api';

const HomePage = () => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/feedback`, values);
      messageApi.success(response.data.message);
    } catch (err) {
      console.error(err);
      messageApi.error("Something went wrong, please try again later");
    } finally {
      form.resetFields();
    }

  };

  return (
    <div>
      <Navbar />
      {contextHolder}
      <section
        id="home"
        className="relative pt-20 min-h-screen flex flex-col justify-center items-center text-center text-white bg-cover bg-center"
        style={{ backgroundImage: 'url("/hero.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 px-4">
          <h1 className="text-5xl font-extrabold mb-4">Meet MindSpace</h1>
          <p className="text-xl mb-8 max-w-xl mx-auto">
            Your Personal Virtual Friend for Every Dimension
          </p>
          <button
            onClick={() => (window.location.href = `${API_BASE_URL}/auth/google`)}
            className="mt-0 px-8 py-5 bg-gray-900 text-gray-100 font-bold rounded-full shadow-xl hover:bg-gray-800 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <GoogleOutlined className="text-xl" />
            et Started
          </button>
        </div>
      </section>

      <section id="features" className="bg-gray-950 py-20 text-white mt-10">
        <h2 className="text-4xl font-extrabold mb-6 tracking-tight text-center">Features</h2>
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="relative h-64 rounded-md overflow-hidden shadow-lg group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${feature.image})`,
                  filter: "brightness(0.5)",
                }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300" />
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6 text-white">
                <h3 className="text-xl font-extrabold mb-2">{feature.title}</h3>
                <p className="text-sm whitespace-pre-line">{feature.subtitle}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-950 text-white pt-30">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-10 tracking-tight">About MindSpace</h2>
          <p className="text-lg mb-10 max-w-4xl mx-auto leading-relaxed">
            At <strong>MindSpace</strong>, we bridge the gap in human connection with AI companions
            that don’t just assist — they connect. <br />
            Built with empathy at their core, they’re here to truly understand you.
          </p>

          <div className="grid sm:grid-cols-3 gap-10 mt-20 mb-10 text-left">
            {about.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center sm:text-left sm:items-start"
              >
                {React.createElement(item.icon, {
                  className: "text-3xl mb-4 text-blue-600 dark:text-blue-400",
                })}
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-950 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <img src="/contact.png" alt="" className="rounded-xl w-full h-auto" />
            </div>

            <div className="w-full lg:w-1/2">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={false}
              >
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                  <Input placeholder="Your name" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Email is required' },
                    {
                      type: 'email',
                    },
                    {
                      pattern: /^[\w.!#$%&’*+/=?^`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*$/,
                    },
                  ]}
                >
                  <Input placeholder="Your email" />
                </Form.Item>


                <Form.Item label="Message" name="message" rules={[{ required: true }]}>
                  <Input.TextArea rows={3} placeholder="Your message" />
                </Form.Item>

                <button type="submit" className="w-full rounded bg-teal-700 px-6 py-2.5 text-white cursor-pointer">
                  Send
                </button>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
