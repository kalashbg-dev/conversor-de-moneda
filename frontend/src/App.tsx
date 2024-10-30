import { NextUIProvider } from '@nextui-org/react'
import { useNavigate, useHref, Route, Routes } from 'react-router-dom'

function App() {
  return (
    // NextUIProvider is a wrapper for all the components
    <NextUIProvider navigate={useNavigate} useHref={useHref}>
      {/* Routes for the app */}
      <Routes>
        <Route path="/" element={<h1>Currency Converter</h1>} />
      </Routes>
    </NextUIProvider>
  )
}

export default App
