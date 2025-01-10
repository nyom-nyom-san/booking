import SideBar from "../components/SideBar"
import { Container, Row, Button, Modal, Form, Col } from "react-bootstrap"
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import useLocalStorage from "use-local-storage";
import { Context } from "../Context";
import RMidBody from "./RMidBody";



export default function Reserve() {

    const [show, setShow] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    const booking = useContext(Context).booking
    const setBooking = useContext(Context).setBooking

    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const navigate = useNavigate();


    //Open close Modal
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBooking = {
            id: Date.now(), // Unique identifier
            title,
            description,
            date,
            time,
        };

        setBooking([...booking, newBooking]); // Update the booking list
        console.log("New Booking Added:", newBooking);

        handleClose(); // Close the modal
        navigate("/home"); // Redirect to the home page
    };

    //Navigation
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
                    <Col sm={9}>
                        <Button onClick={handleShow} style={{ marginTop: "10vh", alignItems: "center", textAlign: "center", backgroundColor: "#00AAA0 ", borderColor: "#00AAA0", marginBottom: "10px", marginLeft: "10px" }}>
                            Add Booking
                        </Button>
                        <RMidBody />

                    </Col>
                </Row>
            </Container>


            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter date (e.g., 10-01-2025)"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter time (e.g., 10:00)"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button style={{ backgroundColor: "#00AAA0 ", borderColor: "#00AAA0" }} type="submit">
                            Save Booking
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}