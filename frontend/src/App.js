import logo from './logo.svg';
import './App.css';
import FormularioRegistro from './componentes/FormularioRegistro';
import ListaAlumnos from './componentes/ListaAlumnos';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        
          <Route 
            path="/registro" 
            element={<FormularioRegistro />}
          />
          <Route 
            path="/lista-alumnos" 
            element={<ListaAlumnos />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
