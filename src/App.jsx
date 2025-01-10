import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Loading from "./pages/loading";
import Home from "./pages/home";
import Reserve from "./pages/Reserve";
import useLocalStorage from "use-local-storage";
import { Context } from "./Context";

export default function App() {

    const [booking, setBooking] = useLocalStorage("booking", []);
    return (
        <Context.Provider value={{ booking, setBooking }}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<AuthPage />} />
                    <Route path="/loading" element={<Loading />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/reserve" element={<Reserve />} />
                    <Route path="*" element={<AuthPage />} />
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    );
}