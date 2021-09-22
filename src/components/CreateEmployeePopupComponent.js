import React from "react";
import styles from "../styles/styleComponent/CreateEmployeePopupComponent.module.scss";

export default function CreateEmployeePopupComponent(props) {
  return (
    <>
      <div className={styles.containerModal}>
        <div className={styles.contentModal}>
          <button
            onClick={() => {
              props.setPopupCreate(false);
            }}
          >
            x
          </button>
          <label>Name: </label>
          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => {
              props.setNameCreate(e.target.value);
            }}
          ></input>
          <label>Birth Date: </label>
          <input
            type="date"
            name="BirthDate"
            onChange={(e) => {
              props.setBirthDateCreate(e.target.value);
            }}
          />
          <label>Gender: </label>
          <select
            onChange={(e) => {
              props.setGenderCreate(e.target.value);
            }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label>Email: </label>
          <input
            type="email"
            placeholder="Your e-mail"
            onChange={(e) => {
              props.setEmailCreate(e.target.value);
            }}
          ></input>
          <label>CPF: </label>
          <input
          autoComplete="off"
            type="number"
            id="cpf"
            placeholder="Your CPF"
            onChange={(e) => {
              props.setCpfCreate(e.target.value);
            }}
          ></input>
          <label>Start Date: </label>
          <input
            type="date"
            name="StartDate"
            onChange={(e) => {
              props.setStartDateCreate(e.target.value);
            }}
          />
          <label>Team: </label>
          <select
            onChange={(e) => {
              props.setTeamCreate(e.target.value);
            }}
          >
            <option value={null}>---</option>
            <option value="Mobile">Mobile</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
          <button onClick={props.AddEmployee}>Create Employer</button>
        </div>
      </div>
    </>
  );
}
