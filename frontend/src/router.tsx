import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import History from './pages/History'
import GeneratePage from './pages/GeneratePage'
import Header from "./components/Header";
const AppRouter = () => (
    <Router>
        <Header />
        <Routes>
            <Route path = '/' element = {<Home/>} />
            <Route path = '/history' element = {<History/>} />
            <Route path = '/generate' element = {<GeneratePage/>} />
        </Routes>
    </Router>
)

export default AppRouter