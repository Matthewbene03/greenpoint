import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react"
import { Layout } from 'antd'

import AppRoutes from "./routes/index"
import GlobalStyles from './styles/GlobalStyles'
import store, { persistor } from './store/index'
import NavMenu from "./components/NavMenu/index"
import Footer from "./components/Footer/index"

// COMPONENTES PWA
import OfflineNotice from "./components/OfflineNotice"
import { PushNotificationManager } from "./components/PushNotificationManager"

const { Header, Content, Footer: AntFooter } = Layout

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>

          {/* Aviso offline */}
          <OfflineNotice />

          <Layout
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Header style={{ height: "80px", padding: 0 }}>
              <NavMenu />
            </Header>

            <Content
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                backgroundColor: "white"
              }}
            >
              <AppRoutes />

              {/* Push Notifications */}
              <div
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  width: "90%",
                  maxWidth: "800px"
                }}
              >
                <PushNotificationManager />
              </div>
            </Content>

            <AntFooter style={{ padding: 0 }}>
              <Footer />
            </AntFooter>
          </Layout>

          <GlobalStyles />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App