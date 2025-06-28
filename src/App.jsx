import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Estudiantes from './components/accesoRapido/PagesMenu/Estudiantes/Estudiantes'
import RegistrarEstudiantes from './components/accesoRapido/PagesMenu/Estudiantes/ComponentesEstudiantes/RegistrarEstudiantes'
import Cumpleanios from './components/accesoRapido/PagesMenu/Estudiantes/ComponentesEstudiantes/Cumpleanios'
import CandidatosPromocionar from './components/accesoRapido/PagesMenu/Estudiantes/ComponentesEstudiantes/CandidatosPromocionar'
import InfoEstudiante from './components/accesoRapido/PagesMenu/Estudiantes/ComponentesEstudiantes/InfoEstudiantes/InfoEstudiante'
import RegistrarMaestro from './components/accesoRapido/PagesMenu/Maestros/ComponentesMaestros/RegistrarMaestros'
import Maestros from './components/accesoRapido/PagesMenu/Maestros/Maestros'
import InfoMaestro from './components/accesoRapido/PagesMenu/Maestros/ComponentesMaestros/InfoMaestros/InfoMaestros'
import Periodos from './components/accesoRapido/PagesMenu/Periodos/Periodos'
import InfoPeriodos from './components/accesoRapido/PagesMenu/Periodos/ComponentesPeriodos/InfoPeriodos'
import RegistrarPeriodo from './components/accesoRapido/PagesMenu/Periodos/ComponentesPeriodos/RegistrarPeriodo'
import Cursos from './components/accesoRapido/PagesMenu/Cursos/Cursos'
import CursoDetalle from './components/accesoRapido/PagesMenu/Cursos/CursoDetalles'
import AlertaCumpleanios from './components/panelAdministrativo/components-panel/AlertaCumpleanios'
import PrivateRoute from '../src/components/PrivateRoute'
import Celebraciones from './components/accesoRapido/PagesMenu/Celebraciones/Celebraciones'
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}>

          {/* Estudiantes */}
          <Route path='estudiantes' element={<Estudiantes />} />
          <Route path='estudiantes/:id' element={<InfoEstudiante />} />
          <Route path='registrar-estudiantes' element={<RegistrarEstudiantes />} />
          <Route path='candidatos-promocionar' element={<CandidatosPromocionar />} />
          <Route path='cumpleanios' element={<Cumpleanios />} />

          {/* Maestros */}
          <Route path='maestros' element={<Maestros />} />
          <Route path='maestro/:id' element={<InfoMaestro />} />
          <Route path='registrar-maestro' element={<RegistrarMaestro />} />

          {/* Periodos */}
          <Route path='periodos' element={<Periodos />} />
          <Route path='periodos/:id' element={<InfoPeriodos />} />
          <Route path='registrar-periodo' element={<RegistrarPeriodo />} />

          {/* Cursos */}
          <Route path='cursos' element={<Cursos />} />
          <Route path='cursos/:id' element={<CursoDetalle />} />

          {/* Celebraciones */}
          <Route path="celebraciones" element={<Celebraciones />} />


          {/* Panel Administrativo */}
          <Route path='alerta-cumpleanios' element={<AlertaCumpleanios />} />

        </Route>
      </Routes>
    </Router>
  )
}

export default App;
