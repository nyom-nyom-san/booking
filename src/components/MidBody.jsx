import { Col, Image } from "react-bootstrap";
import { useState, useEffect } from "react";


export default function MidBody() {
    const image = "https://cdn.sanity.io/images/zzw4zduo/production/e75d4305b51bddef5636af4134c41c282c8facca-750x500.jpg?w=750&h=500&auto=format"

    const [booking, setBooking] = useState([])

    useEffect(() => {
        const storedBooking = JSON.parse(localStorage.getItem("booking")) || []
        setBooking(storedBooking)
    }, [])


    return (
        <Col sm={7} className="bg-light" style={{ border: "2px solid lightgrey" }}>
            <p style={{ fontWeight: "bold", textAlign: "center", fontSize: 50, position: "absolute", marginLeft: "140px" }}>BOOKING STATUS</p>
            <Image src={image} style={{ width: "90%", marginLeft: "5%", marginBottom: 0 }} />
            <br />

            <div className="d-flex align-items-center">
                <p className="mt-1" style={{ fontWeight: "bold", fontSize: "30px" }}>
                    Nekoma-Doctor
                </p>
                <p style={{ marginBottom: "2px", fontWeight: "bold", marginLeft: 10, fontSize: "20px" }}>: Veterinarian</p>
            </div>


            <p style={{ marginBottom: "2px" }}>Nekoma@gmail.com</p>
            <p style={{ marginBottom: "2px" }}>Phone Number : +123456789</p>
            <p style={{ marginBottom: "2px" }}>Location : GeorgeTown, Penang</p>
            <p style={{ marginBottom: "2px" }}> I help pets make a better, pawsitive influence</p>

            <div style={{ backgroundColor: "lightgrey", padding: "10px", borderRadius: "5px", marginTop: "20px" }}>
                <h2>Bookings</h2>
                {booking.length > 0 ? (
                    <ul>
                        {booking.map((booking) => (
                            <li key={booking.id}>
                                <p>Title: {booking.title}</p>
                                <p>Description: {booking.description}</p>
                                <p>Date: {booking.date}</p>
                                <p>Time: {booking.time}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
        </Col>


    )
}