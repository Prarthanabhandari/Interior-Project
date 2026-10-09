import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import './styles/global.css'

/* ── PUBLIC PAGES ── */
import HomePage from './pages/Home/HomePage'
const Portfolio     = lazy(() => import('./pages/Portfolio/Portfolio'))
const Contact       = lazy(() => import('./pages/Contact/Contact'))
const Blog          = lazy(() => import('./pages/Blog/Blog'))
const GetQuote      = lazy(() => import('./pages/GetQuote/GetQuote'))
const Team          = lazy(() => import('./pages/Team/Team'))
const About         = lazy(() => import('./pages/About/About'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail/ProjectDetail'))

/* ── ADMIN PAGES ── */
const AdminLogin    = lazy(() => import('./pages/Admin/Login/AdminLogin'))
const AdminLayout   = lazy(() => import('./pages/Admin/AdminLayout'))
const Dashboard     = lazy(() => import('./pages/Admin/Dashboard/Dashboard'))
const Leads         = lazy(() => import('./pages/Admin/Leads/Leads'))
const ProjectsAdmin = lazy(() => import('./pages/Admin/Projects/Projects'))
const TeamAdmin     = lazy(() => import('./pages/Admin/Team/Team'))
const Testimonials  = lazy(() => import('./pages/Admin/Testimonials/Testimonials'))
const Settings      = lazy(() => import('./pages/Admin/Settings/Settings'))

/* ── LOADER ── */
const Loader = () => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#F8F9F9' }}>
    <div style={{ textAlign:'center' }}>
      <svg width="48" height="42" viewBox="0 0 60 55" fill="none">
        <path d="M6 50 L22 8" stroke="#1CB4A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M54 50 L38 8" stroke="#1CB4A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 8 L30 24 L38 8" stroke="#1CB4A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 36 L30 46 L46 36" stroke="#1CB4A6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <p style={{ marginTop:'0.8rem', fontSize:'0.75rem', color:'#888', letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'Montserrat,sans-serif' }}>Loading…</p>
    </div>
  </div>
)

/* ── PROTECTED ROUTE ── */
const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth()
  if (loading) return <Loader />
  return admin ? children : <Navigate to="/admin/login" replace />
}

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* PUBLIC */}
        <Route path="/"            element={<HomePage />}      />
        <Route path="/portfolio"   element={<Portfolio />}     />
        <Route path="/contact"     element={<Contact />}       />
        <Route path="/blog"        element={<Blog />}          />
        <Route path="/get-quote"   element={<GetQuote />}      />
        <Route path="/team"        element={<Team />}          />
        <Route path="/about"       element={<About />}         />
        <Route path="/project/:id" element={<ProjectDetail />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
        >
          <Route index                  element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard"       element={<Dashboard />}     />
          <Route path="leads"           element={<Leads />}         />
          <Route path="projects"        element={<ProjectsAdmin />} />
          <Route path="team"            element={<TeamAdmin />}     />
          <Route path="testimonials"    element={<Testimonials />}  />
          <Route path="settings"        element={<Settings />}      />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}