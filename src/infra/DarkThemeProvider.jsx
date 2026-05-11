import { ConfigProvider, theme } from "antd";

export const DarkThemeProvider = ({ children }) => (
    <ConfigProvider
        theme={{
            algorithm: theme.darkAlgorithm,
            token: {
                colorTextLabel: 'rgba(255,255,255,0.88)',
            },
        }}
    >
        {children}
    </ConfigProvider>

);


