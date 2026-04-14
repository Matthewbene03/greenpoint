import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'

import App from './App.tsx'
import * as colors from "./config/colors.tsx"

createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    direction="ltr"
    theme={{
      token: {
        colorPrimary: colors.PrimeiraCorClara,
        colorBgContainer: '#f6ffed',
      }
    }}
  >
    <App />
  </ConfigProvider>
)