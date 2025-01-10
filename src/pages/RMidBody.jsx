import { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Container, Row, Col } from "react-bootstrap";

export default function RMidBody() {
    const [bookings, setBookings] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);

    // Fetch bookings from localStorage
    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem("booking")) || [];
        setBookings(storedBookings);
    }, []);

    // Open Edit Modal
    const handleEdit = (booking) => {
        setCurrentBooking(booking);
        setShowEditModal(true);
    };

    // Save Edited Booking
    const handleSaveEdit = () => {
        const updatedBookings = bookings.map((booking) =>
            booking.id === currentBooking.id ? currentBooking : booking
        );
        setBookings(updatedBookings);
        localStorage.setItem("bookingToken", JSON.stringify(updatedBookings));
        setShowEditModal(false);
    };

    // Delete Booking
    const handleDelete = (id) => {
        const updatedBookings = bookings.filter((booking) => booking.id !== id);
        setBookings(updatedBookings);
        localStorage.setItem("booking", JSON.stringify(updatedBookings));
    };

    return (
        <Container>
            <Row>
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <Col sm={6} md={4} key={booking.id} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{booking.title}</Card.Title>
                                    <Card.Text>{booking.description}</Card.Text>
                                    <Card.Text>Date: {booking.date}</Card.Text>
                                    <Card.Text>Time: {booking.time}</Card.Text>
                                    <Button
                                        style={{ backgroundColor: "#29ccc1" }}
                                        className="me-2"
                                        onClick={() => handleEdit(booking)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        style={{ backgroundColor: "#3d6663" }}
                                        onClick={() => handleDelete(booking.id)}
                                    >
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No bookings available.</p>
                )}
            </Row>

            {/* Edit Modal */}
            {currentBooking && (
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Booking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentBooking.title}
                                    onChange={(e) =>
                                        setCurrentBooking({ ...currentBooking, title: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={currentBooking.description}
                                    onChange={(e) =>
                                        setCurrentBooking({
                                            ...currentBooking,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentBooking.date}
                                    onChange={(e) =>
                                        setCurrentBooking({ ...currentBooking, date: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentBooking.time}
                                    onChange={(e) =>
                                        setCurrentBooking({ ...currentBooking, time: e.target.value })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{ backgroundColor: "#3d6663 ", borderColor: "#3d6663" }} onClick={() => setShowEditModal(false)}>
                            Cancel
                        </Button>
                        <Button style={{ backgroundColor: "#00AAA0 ", borderColor: "#00AAA0" }} onClick={handleSaveEdit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
}
