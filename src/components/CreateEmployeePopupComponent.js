import React, { useState } from "react";
import styles from "../styles/styleComponent/CreateEmployeePopupComponent.module.scss";
import Axios from 'axios'

export default function CreateEmployeePopupComponent(props) {

  let crudCrudEndPoint = process.env.REACT_APP_CRUDCRUD_ENDPOINT;

  const [nameCreate, setNameCreate] = useState("");
  const [birthDateCreate, setBirthDateCreate] = useState("");
  const [genderCreate, setGenderCreate] = useState("Masculino");
  const [emailCreate, setEmailCreate] = useState("");
  const [cpfCreate, setCpfCreate] = useState("");
  const [startDateCreate, setStartDateCreate] = useState("");
  const [teamCreate, setTeamCreate] = useState(null);

  async function AddEmployee() {
    console.log(cpfCreate.length);
    if (emailCreate === "" || cpfCreate.length !== 11) {
      return alert("preencha os campos");
    }
    try {
      await Axios.post(`https://crudcrud.com/api/${crudCrudEndPoint}/user`, {
        Name: nameCreate,
        BirthDate: birthDateCreate.replace("-", "").replace("-", ""),
        Gender: genderCreate,
        Email: emailCreate,
        Cpf: cpfCreate,
        StartDate: startDateCreate.replace("-", "").replace("-", ""),
        Team: teamCreate,
      }).then((e) => {
        console.log(e);
        props.setPopupCreate(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

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
              setNameCreate(e.target.value);
            }}
          ></input>
          <label>Birth Date: </label>
          <input
            type="date"
            name="BirthDate"
            onChange={(e) => {
              setBirthDateCreate(e.target.value);
            }}
          />
          <label>Gender: </label>
          <select
            onChange={(e) => {
              setGenderCreate(e.target.value);
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
              setEmailCreate(e.target.value);
            }}
          ></input>
          <label>CPF: </label>
          <input
          autoComplete="off"
            type="number"
            id="cpf"
            placeholder="Your CPF"
            onChange={(e) => {
              setCpfCreate(e.target.value);
            }}
          ></input>
          <label>Start Date: </label>
          <input
            type="date"
            name="StartDate"
            onChange={(e) => {
              setStartDateCreate(e.target.value);
            }}
          />
          <label>Team: </label>
          <select
            onChange={(e) => {
              setTeamCreate(e.target.value);
            }}
          >
            <option value={null}>---</option>
            <option value="Mobile">Mobile</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
          <button onClick={AddEmployee}>Create Employer</button>
        </div>
      </div>
    </>
  );
}
