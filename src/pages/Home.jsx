import { Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import SideBar from "../components/SideBar";
import MidBody from "../components/MidBody";


export default function Home() {

    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate("/login")
        }
    }, [authToken, navigate])

    const handleLogout = () => {
        setAuthToken("") //clearing the token
    };

    const handleAddBooking = () => {
        navigate("/reserve")
    };

    const home = () => {
        navigate("/home")
    };


    return (
        <>
            <Container>
                <Row>
                    <SideBar handleLogout={handleLogout} handleAddBooking={handleAddBooking} home={home} />
                    <MidBody />
                </Row>
            </Container>
        </>
    );
}


