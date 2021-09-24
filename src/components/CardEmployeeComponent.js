import React, { useState } from "react";
import styles from "../styles/styleComponent/CardEmployeeComponent.module.scss";
import DeleteEmployeePopupComponent from "./DeleteEmployeePopupComponent";
import UpdateEmployeePopupComponent from "./UpdateEmployeePopupComponent";
import { SetTeamColor } from "../utils/SetTeamColor";

export default function CardEmployeeComponent({ Employee }) {
  const [popupDelete, setPopupDelete] = useState("");
  const [popupUpdate, setPopupUpdate] = useState("");

  const { id, name, birthDate, cpf, gender, email, startDate, team } = Employee;

  const cardBackgroundColor = `${SetTeamColor(team)}`;

  function deletePopup() {
    setPopupDelete(true);
  }

  function updatePopup() {
    setPopupUpdate(true);
  }

  return (
    <div>
      <div
        className={styles.container}
        style={{ background: cardBackgroundColor }}
      >
        <div className={styles.card}>
          <div className={styles.data}>
            <label>Name: </label>
            <h1>{name}</h1>
          </div>
          <div className={styles.data}>
            <label>Email: </label>
            <h1>{email}</h1>
          </div>
          <div className={styles.data}>
            <label>Start Date: </label>
            <h1>{startDate}</h1>
          </div>
          <div className={styles.data}>
            <label>Team: </label>
            <h1>{team}</h1>
          </div>
        </div>
        <div className={styles.cardButton}>
          <i className={styles.cardEdit}>
            <button onClick={updatePopup}></button>
          </i>
          <i className={styles.cardExclude}>
            <button onClick={deletePopup}></button>
          </i>
        </div>
      </div>

      {popupDelete && (
        <DeleteEmployeePopupComponent setPopupDelete={setPopupDelete} id={id} />
      )}

      {popupUpdate && (
        <UpdateEmployeePopupComponent
          setPopupUpdate={setPopupUpdate}
          id={id}
          name={name}
          birthDate={birthDate}
          cpf={cpf}
          gender={gender}
          email={email}
          startDate={startDate}
          team={team}
        />
      )}
    </div>
  );
}
