import { useState } from 'react'
import './App.css'
import MobileMenu from "@/components/layout/MobileMenu.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <h1 className="text-5xl">Automagic Food Tracker</h1>
        <MobileMenu />
    </>
  )
}

export default App
