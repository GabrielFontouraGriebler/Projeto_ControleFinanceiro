import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Home, Login, CriarCategoria, Bancos, CreateBanco, NotFound, Register, Categorias, CriarSubategoria} from './pages';
import {Navbar, MainLayout, ProtectedRout} from "./components";


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRout>
                <Home />
              </ProtectedRout>
            }
          />
          <Route 
            path="/bancos" 
            element={
              <ProtectedRout>
                <Bancos />
              </ProtectedRout>
            } 
          />
          <Route 
            path="/banco/cadastro" 
            element={
              <ProtectedRout>
                <CreateBanco />
              </ProtectedRout>
            } 
          />
          <Route 
            path="/categorias" 
            element={
              <ProtectedRout>
                <Categorias />
              </ProtectedRout>
            } 
          />
          <Route 
            path="/categoria/cadastro" 
            element={
              <ProtectedRout>
                <CriarCategoria />
              </ProtectedRout>
            } 
          />
          <Route 
            path="/subcategoria/cadastro" 
            element={
              <ProtectedRout>
                <CriarSubategoria />
              </ProtectedRout>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
