import { NextUIProvider } from '@nextui-org/react'
import { useNavigate, useHref, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import HomePage from './pages/homePage'

function App() {
  return (
    // NextUIProvider is a wrapper for all the components
    <NextUIProvider navigate={useNavigate} useHref={useHref}>
      {/* Routes for the app */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </NextUIProvider>
  )
}

export default App
