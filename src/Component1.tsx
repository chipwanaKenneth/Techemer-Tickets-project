import { useEffect, useState } from "react";
import "./Component1.css";
import { Details } from "./types";

function Stage1({
  details,
  setDetails,
  proceed,
  back,
}: {
  details: Details;
  setDetails: Function;
  proceed: Function;
  back: Function;
}) {
  const setTicket = (ticketId: "free" | "vip-access" | "vvip-access") => {
    switch (ticketId) {
      case "free":
        setDetails({
          ...details,
          ticket: {
            id: "free",
            ticketType: "REGULAR",
          },
        });
        break;

      case "vip-access":
        setDetails({
          ...details,
          ticket: {
            id: "vip_access",
            ticketType: "VIP",
          },
        });
        break;

      case "vvip-access":
        setDetails({
          ...details,
          ticket: {
            id: "vvip_access",
            ticketType: "VVIP",
          },
        });
        break;
    }
  };
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSubmit = () => {
    if (!details?.ticket?.id) {
      alert("Select a ticket Type");
      return;
    } else if (!details?.numerOfTickets) {
      alert("Select number of tickets");
      return;
    }
    proceed();
  };

  return (
    <div className="body">
      <div className="Component1">
        <div className="C1-header">
          <h1>Ticket Selection</h1>
          <span> Step 1/3</span>
        </div>

        <div className="C1-Body">
          <div>
            <div className="event-info">
              <h1>Techember Fest "25</h1>
              <span>Join us for an unforgetable experience at</span>
              <span>[HICC]! Secure your spot now.</span>
              <span>📍[1 Pennefather Ave] || March 15, 2025 |7:00 PM</span>
            </div>
            <hr />
            <form>
              <div className="ticketContainer">
                <span className="t-header">Select Type of Ticket:</span>
                <div className="tickets">
                  <div
                    className={`ticket ${
                      details.ticket?.id === "free" ? "highlight" : ""
                    }`}
                    id="free"
                    onClick={() => setTicket("free")}
                  >
                    <span className="t-price">FREE</span>
                    <span className="t-type">REGULAR ACCESS</span>
                    <span className="t-left">20/52</span>
                  </div>
                  <div
                    className={`ticket ${
                      details.ticket?.id === "vip_access" ? "highlight" : ""
                    }`}
                    id="vip-access"
                    onClick={() => setTicket("vip-access")}
                  >
                    <span className="t-price">$50</span>
                    <span className="t-type">VIP ACCESS</span>
                    <span className="t-left">20/52</span>
                  </div>
                  <div
                    className={`ticket p3 ${
                      details.ticket?.id === "vvip_access" ? "highlight" : ""
                    }`}
                    id="vvip-access"
                    onClick={() => setTicket("vvip-access")}
                  >
                    <span className="t-price">$150</span>
                    <span className="t-type">VVIP ACCESS</span>
                    <span className="t-left">20/52</span>
                  </div>
                </div>
              </div>
              <div className="No-Tickets">
                <span>Number of Tickets</span>
                <select
                  name="numerOfTickets"
                  onChange={(e) =>
                    setDetails({
                      ...details,
                      numerOfTickets: Number(e.target.value),
                    })
                  }
                  required
                >
                  <option value="0" selected>
                    0
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </form>
            <div className="btns">
              <button className="cancelBtn" onClick={() => back()}>
                Cancel
              </button>
              <button className="nextBtn" onClick={() => handleSubmit()}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stage1;
