import { ConfigProvider } from 'antd'
import { useSelector } from 'react-redux'

function ThemeProvider({ children }) {
    
    return (
        <ConfigProvider
            theme={{
                token: {
                    // fontFamily: 'Protest Strike',
                    colorPrimary: '#00b96b',
                    borderRadius: 2,
                    colorBgContainer: '#f6ffed',
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export default ThemeProvider