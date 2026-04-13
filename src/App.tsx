import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react"
import { Layout } from 'antd'

import AppRoutes from "./routes/index"
import GlobalStyles from './styles/GlobalStyles'
import store, { persistor } from './store/index'
import NavMenu from "./components/NavMenu/index"
import Footer from "./components/Footer/index"

// NOVOS COMPONENTES PWA
import OfflineNotice from "./components/OfflineNotice"
import PwaActions from "./components/PwaActions"

const { Header, Content, Footer: AntFooter } = Layout;

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>

          {/* Aviso Offline */}
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

              {/* Botões PWA */}
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <PwaActions />
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

//Uso da geolocalização

// const [local, setLocal] = useState<{
//   lat: number;
//   lng: number;
// }>({
//   lat: 0,
//   lng: 0
// });

// const localizar = (e: any) => {
//   e.preventDefault();
//   navigator.geolocation.getCurrentPosition((position) => {
//     setLocal({
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     });
//   });
// }

// useEffect(() => {
//   endereco();
// }, [local])

// const endereco = async () => {

//   const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${local.lat}&lon=${local.lng}&format=json`);
//   const data = await response.json();
//   console.log(data)
// }