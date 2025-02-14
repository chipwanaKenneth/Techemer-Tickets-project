import { useState } from "react";
import "./Component3.css";
import html2canvas from "html2canvas";
import { Details } from "./types";

function ContentIII({
  details,
  setDetails,
  back,
  uploadedFile,
  setUploadedFile,
}: {
  details: Details;
  setDetails: Function;
  back: Function;
  uploadedFile: string | null;
  setUploadedFile: Function;
}) {
  const downloadTicket = () => {
    const ticket = document.getElementById("ticket");
    if (!ticket) {
      return;
    }
    html2canvas(ticket, {
      backgroundColor: "#041e23",
    }).then((canvas) => {
      let image = canvas.toDataURL("image/jpeg");
      const a = document.createElement("a");
      a.href = image;
      a.download = "Ticket.jpeg";
      a.click();
    });
  };

  return (
    <div className="body">
      <div className="Component3">
        <div className="C3-header">
          <h1>Ready</h1>
          <span> Step 3/3</span>
        </div>

        <div className="C3-Body">
          <div>
            <div className="bheader">
              <h2>Your Ticket Is Booked!</h2>
              <span>check your email for a copy or you can download</span>
            </div>
            <div className="rTicket">
              <div className="ticket-background" id="ticket">
                <span className="time">
                  📍[1 Pennefather Ave] <br /> March 15, 2025 |7:00 PM
                </span>
                <img src={details.dataUrl} />
                <div className="AttendeeInfo">
                  <div className="container">
                    <div className="name">
                      <span>Your Name</span>
                      <span>{details.name}</span>
                    </div>
                    <div className="email">
                      <span>Your Email</span>
                      <span>{details.email}</span>
                    </div>
                  </div>
                  <div className="container">
                    <div className="ticketType">
                      <span>Ticket Type</span>
                      <span>{details.ticket?.ticketType}</span>
                    </div>
                    <div className="noTicket">
                      <span> Ticket For</span>
                      <span> {details.numerOfTickets}</span>
                    </div>
                  </div>
                  <div className="specialRequest">
                    <span>Special Request</span>
                    <span>{details.request}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="backSubmit">
              <button className="backBtn" onClick={() => back()}>
                Book Another Ticket
              </button>
              <button className="submitBtn" onClick={downloadTicket}>
                Download My Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentIII;
