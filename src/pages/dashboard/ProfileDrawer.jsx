import { useEffect } from "react";
import { Drawer, Form, Input, Switch, Button } from "antd";
import { MailOutlined, UserOutlined, PhoneOutlined,} from "@ant-design/icons";

const ProfileDrawer = ({ isOpen, onClose, initialData, onSave }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.setFieldsValue(initialData);
        }
    }, [isOpen, initialData, form]);


    const handleFinish = (values) => {
        onSave?.(values);
        onClose();
    };

    return (
        <Drawer
            title="Edit Profile"
            placement="right"
            width={Math.min(400, window.innerWidth)}
            open={isOpen}
            onClose={onClose}
            destroyOnClose
            footer={
                <div style={{ textAlign: "right" }}>
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button type="primary" onClick={() => form.submit()}>
                        Save Changes
                    </Button>
                </div>
            }
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={initialData}
            >
                <Form.Item name="name" label="User Name" colon={false}>
                    <Input prefix={<UserOutlined />} disabled />
                </Form.Item>

                <Form.Item name="emailNotification" label="Email" colon={false}>
                    <Input prefix={<MailOutlined />} disabled />
                </Form.Item>

                <Form.Item name="phoneNumber" label="Phone Number">
                    <Input prefix={<PhoneOutlined />} placeholder="Enter phone number" />
                </Form.Item>

                <Form.Item
                    name="emialNotifications"
                    label="Email Notifications"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default ProfileDrawer;
