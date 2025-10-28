import {useState} from 'react'
import './App.css'
import {StoragePage} from '@/features/storage';
import { BrowserRouter } from "react-router-dom";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <StoragePage/>
        </>
    )
}

export default App
