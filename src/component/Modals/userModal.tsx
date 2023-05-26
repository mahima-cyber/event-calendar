import React, { useState, FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./UserModal.css"; // Import custom CSS file for styling

export default function UserModal(props: any) {
  const { isOpen, toggle, onCancel } = props;
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = { name, lastName, email };
    const existingData = localStorage.getItem("userData");
    const userData = existingData ? JSON.parse(existingData) : [];
    userData.push(formData);
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("Form submitted!", { name, lastName, email });
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} style={{ marginTop: "5%" }}>
        <ModalHeader toggle={toggle}>
          <div className="modal-title">Create Client</div>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="button-div">
              <Button color="secondary" type="submit" style={{ marginRight: "6px" }}>
                Submit
              </Button>
              {/* <input type="submit" value="Submit" className="submit-button" /> */}
              <Button color="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>

        </ModalBody>

      </Modal>
    </>
  );
}
