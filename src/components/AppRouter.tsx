import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import PokimonItemPage from "../pages/PokemonItemPage"



const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/:name" element={<PokimonItemPage />} />
        </Routes>
    )
}

export default AppRouter
