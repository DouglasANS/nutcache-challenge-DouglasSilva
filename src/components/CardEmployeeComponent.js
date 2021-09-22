import React, { useState } from "react";
import styles from "../styles/styleComponent/CardEmployeeComponent.module.scss";
import DeleteEmployeePopupComponent from "./DeleteEmployeePopupComponent";
import UpdateEmployeePopupComponent from "./UpdateEmployeePopupComponent";

export default function CardEmployeeComponent({ Employee }) {

  const [popupDelete, setPopupDelete] = useState("");
  const [popupUpdate, setPopupUpdate] = useState("");

  const { id, name, birthDate, cpf, gender, email, startDate, team } = Employee;

  function deletePopup() {
    setPopupDelete(true);
  }

  function updatePopup() {

    setPopupUpdate(true);
  }

  return (
    <div className={styles.container}>
      <h1>Name: {name}</h1>
      <h1>Email: {email}</h1>
      <h1>Start Date: {startDate}</h1>
      <h1>Team: {team}</h1>
      <button onClick={deletePopup}>Delete</button>
      <button onClick={updatePopup}>Update</button>

      {popupDelete && (
        <DeleteEmployeePopupComponent 
        setPopupDelete={setPopupDelete} 
        id={id} />
      )}

      {popupUpdate && (
        <UpdateEmployeePopupComponent setPopupUpdate={setPopupUpdate} id={id} name={name} 
        birthDate={birthDate} cpf={cpf} gender={gender} email={email} startDate={startDate} team={team} />
      )}
    </div>
  );
}
