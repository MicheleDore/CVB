import {  BrowserRouter,  Routes,  Route } from "react-router-dom"
import Nav from "./components/NavBar";
import VideoList from './components/VideoList.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Logout from './components/Logout.jsx'
import Workshop from './components/Workshop'
import Contents from './components/workshop/Contents.jsx'
import Calendar from './components/workshop/Calendar.jsx'
import Signup from './components/workshop/Signup.jsx'
import MetaBox from './components/production/MetaBox.jsx'
import Production from './components/Production'
import Service from './components/Service'
import Error404 from './components/Error404.jsx'
import Middleware from './components/Middleware.jsx'
import Admin from './components/administration/Admin.jsx'

function App({children}) {
  return (
    <BrowserRouter>
    <Nav /> {/* Barre de navigation, elle contient aussi le useEffect responsable pour la persistance des sections */}
    <VideoList /> {/* Recupère tous les vidéos présents en base de donnée */}
    <Routes >
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Home />} />
        <Route path='/workshop' element={<Workshop />}/> {/* Vue principale */}
        <Route path='/contents' element={<Contents />}/> {/* Vue secondaire */}
        <Route path='/calendar' element={<Calendar />}/> {/* Vue secondaire */}
        <Route path='/signup' element={<Signup />}/> {/* Vue secondaire */}
        <Route path="/production" element={<Production />} /> {/* Vue principale */}
        <Route path='/metabox/:id' element={<MetaBox />}/> {/* Vue secondaire */}
        <Route path="/service" element={<Service />} /> {/* Vue principale */}
        <Route path="/login" element={<Login />} />
        <Route path='/admin/:name' element={<Middleware>{<Admin />}</Middleware>}/>
        <Route path='/admin' element={<Middleware>{<Admin />}</Middleware>}/>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
