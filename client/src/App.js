import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from './signup/Signup';
import { Login } from './login/Login';
import { Dashboard } from './dashboard/Dashboard';
import {AppContextProvider} from "./context/AppContext"

function App() {
    return (
        <div>
            <AppContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Signup/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                </Routes>
            </BrowserRouter>
            </AppContextProvider>
        </div>  
    );
}
// https://acrobat.adobe.com/link/review?uri=urn%3Aaaid%3Ascds%3AUS%3A1daf9632-df0e-4e90-bb1a-3073ed6868a6
export default App;