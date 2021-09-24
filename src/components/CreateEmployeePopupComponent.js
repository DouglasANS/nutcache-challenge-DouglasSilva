import React, { useContext, useState } from "react";
import styles from "../styles/styleComponent/CreateEmployeePopupComponent.module.scss";
import Axios from "axios";
import { DataContext } from "../context/DataContext";

export default function CreateEmployeePopupComponent(props) {
  let crudCrudEndPoint = process.env.REACT_APP_CRUDCRUD_ENDPOINT;

  const [nameCreate, setNameCreate] = useState("");
  const [birthDateCreate, setBirthDateCreate] = useState("");
  const [genderCreate, setGenderCreate] = useState("Masculino");
  const [emailCreate, setEmailCreate] = useState("");
  const [cpfCreate, setCpfCreate] = useState("");
  const [startDateCreate, setStartDateCreate] = useState("");
  const [teamCreate, setTeamCreate] = useState(null);

  const { findAllEmployee } = useContext(DataContext);

  function Validation() {
    let name = nameCreate.replace(/\s+/g, " ").toLowerCase();
    let email = emailCreate.trim().toLowerCase();
    let cpf = cpfCreate.trim();

    let startDate = startDateCreate.split("-");
    let startDateFinal = startDate[1] + "/" + startDate[0];

    let ValidNumber = /^\d+$/;
    let validName = /^[a-záàâãéèêíïóôõöúçñ ]+$/;
    let validEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    let messageAlert = "";

    if (name === "" || !validName.test(name)) {
      messageAlert = messageAlert + " 'Name '";
    }

    if ( !validEmail.test(email)) {
      messageAlert = messageAlert + " 'Email '";
    }

    if (cpf === "" || cpf.length !== 11) {
      messageAlert = messageAlert + " 'Cpf '";
    }

    let dataAtual = new Date();
    let data = new Date(birthDateCreate);

    if (birthDateCreate === "" || data > dataAtual) {
      messageAlert = messageAlert + " 'Birth date '";
    }
    if (startDateCreate === "") {
      messageAlert = messageAlert + " 'Start date '";
    }

    if (messageAlert === "") {
      AddEmployee(startDateFinal);
    } else {
      document.getElementById("messageError").innerHTML =
        "Enter a valid " + messageAlert + ".";
    }
  }

  async function AddEmployee(startDateFinal) {
    try {
      await Axios.post(`https://crudcrud.com/api/${crudCrudEndPoint}/user`, {
        Name: nameCreate,
        BirthDate: birthDateCreate.replace("-", "").replace("-", ""),
        Gender: genderCreate,
        Email: emailCreate,
        Cpf: cpfCreate,
        StartDate: startDateFinal,
        Team: teamCreate,
      }).then((e) => {
        console.log(e);
        props.setPopupCreate(false);
        findAllEmployee();
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={styles.containerModal}>
        <div className={styles.contentModal}>
          <div className={styles.cancelButton}>
            <button
              onClick={() => {
                props.setPopupCreate(false);
              }}
            >
              x
            </button>
          </div>

          <div className={styles.dataModal}>
            <label>Name: </label>
            <input
              type="text"
              placeholder="Your Name"
              pattern="[a-z]{1,15}"
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
              type="month"
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
          </div>
          <div id="messageError" className={styles.messageError}></div>
          <div className={styles.addButton}>
            <button onClick={Validation}>Create Employer</button>
          </div>
        </div>
      </div>
    </>
  );
}
