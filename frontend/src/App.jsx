import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Home, Login, CriarCategoria, Bancos, CreateBanco, NotFound, Register, Categorias, CriarSubategoria, Cartoes, ListagemFatura, ListagemTransacao, CriarTransacao, CriarCartaoCredito} from './pages';
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
            path="/subcategoria/cadastro/:categoriaId" 
            element={
              <ProtectedRout>
                <CriarSubategoria />
              </ProtectedRout>
            } 
          />
          <Route 
            path="/transacoes" 
            element={
              <ProtectedRout>
                <ListagemTransacao />
              </ProtectedRout>
            } 
          />
          <Route 
            path="/transacao/cadastro" 
            element={
              <ProtectedRout>
                <CriarTransacao />
              </ProtectedRout>
            } 
          />
          <Route 
            path="/cartoes/:id/faturas" 
            element={
              <ProtectedRout>
                <ListagemFatura />
              </ProtectedRout>
            } 
          />
          <Route 
            path="/cartoes" 
            element={
              <ProtectedRout>
                <Cartoes />
              </ProtectedRout>
            } 
          />
          <Route 
            path="/cartao/cadastro" 
            element={
              <ProtectedRout>
                <CriarCartaoCredito />
              </ProtectedRout>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
