import { Col, Image } from "react-bootstrap";
import Icons from "./Icons";

export default function SideBar({ handleLogout, handleAddBooking, home }) {
    const nekoma = "/pictures/black-cat.png"
    //const cat = "/pictures/cat.gif"


    return (
        <Col sm={2} className="d-flex flex-column justify-content-start align-items-start bg-light vh-100" style={{ position: "sticky", top: 0 }}>
            <Image src={nekoma} style={{ width: "100px", marginTop: "5vh", marginBottom: "5vh" }} istop="true" />
            <i style={{ fontSize: 30, fontWeight: "Bold" }}>NEKOMA</i>


            <Icons className="bi bi-house" text="Home" onClick={home} />
            <Icons className="bi bi-bookmarks" text="Bookings" onClick={handleAddBooking} />
            <Icons className="bi bi-envelope" text="Messages" />
            <Icons text="Logout" onClick={handleLogout} />
        </Col>
    )
}