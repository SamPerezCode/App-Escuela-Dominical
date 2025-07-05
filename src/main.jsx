import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '../src/context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './index.css';
import App from './App.jsx';
import { AlumnosProvider } from './context/AlumnosContext.jsx';
import { BuscadorProvider } from './context/BuscadorContext.jsx';
import { NotificacionesProvider } from './context/NotificacionesContext.jsx';
import { MaestrosProvider } from './context/MaestrosContext.jsx';
import { CursosProvider } from './context/CursosContext.jsx';
import { CelebracionesProvider } from './context/CelebracionesContext.jsx';
import { PeriodosProvider } from './context/PeriodosContext.jsx';
import { CursoPeriodoProvider } from './context/CursoPeriodoContext.jsx';
import { GruposProvider } from './context/GruposContext.jsx';







createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AlumnosProvider>
          <BuscadorProvider>
            <NotificacionesProvider>
              <MaestrosProvider>
                <CursosProvider>
                  <CelebracionesProvider>
                    <PeriodosProvider>
                      <CursoPeriodoProvider>
                        <GruposProvider>
                          <App />
                        </GruposProvider>
                      </CursoPeriodoProvider>
                    </PeriodosProvider>
                  </CelebracionesProvider>
                </CursosProvider>
              </MaestrosProvider>
            </NotificacionesProvider>
          </BuscadorProvider>
        </AlumnosProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
