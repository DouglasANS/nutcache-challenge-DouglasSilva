import React, { useContext, useState } from "react";
import styles from "../styles/styleComponent/CreateEmployeePopupComponent.module.scss";
import Axios from 'axios'
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

  const { findAllEmployee } = useContext(DataContext)

  function Validation(){
    

    AddEmployee()
  }

  async function AddEmployee() {
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
        findAllEmployee()
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={styles.containerModal}>
        <div className={styles.contentModal} >


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
          
          <div className={styles.addButton}>
            <button onClick={Validation}>Create Employer</button>
          </div>
          
        </div>
      </div>
    </>
  );
}
