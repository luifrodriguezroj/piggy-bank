import React from 'react';
import './App.scss';
import axios from 'axios';

function Contact() {
  const sendEmail = async () => {
    axios.post('http://localhost:5000/contact', {
      email: document.getElementById("email-1").value,
      subject: document.getElementById("subject").value,
      content: document.getElementById("content").value
    }).then(res => {
      console.log("Email sent!");
    }).catch(err => console.log(err));
  }

  return (
    <div>
      <div className="boxes">
        <div className="box">
          <h1>Contact</h1>
          <input id="email-1" type="text" placeholder="Email"></input>
          <input id="subject" type="text" placeholder="Subject"></input>
          <input id="content" type="text" placeholder="Content"></input>
          <button onClick={sendEmail}>Deposit</button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
