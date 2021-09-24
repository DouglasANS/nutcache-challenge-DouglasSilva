import React, { useContext, useState } from "react";
import styles from "../styles/styleComponent/UpdateEmployeePopupComponent.module.scss";
import Axios from 'axios'
import { DataContext } from "../context/DataContext";

export default function UpdateEmployeePopupComponent(props) {
    let crudCrudEndPoint = process.env.REACT_APP_CRUDCRUD_ENDPOINT;

    
  const [nameUpdate, setNameUpdate] = useState(props.name);
  const [birthDateUpdate, setBirthDateUpdate] = useState(props.birthDate);
  const [genderUpdate, setGenderUpdate] = useState(props.gender);
  const [emailUpdate, setEmailUpdate] = useState(props.email);
  const [cpfUpdate, setCpfUpdate] = useState(props.cpf);
  const [startDateUpdate, setStartDateUpdate] = useState(props.startDate);
  const [teamUpdate, setTeamUpdate] = useState(props.team);

  const {findAllEmployee} = useContext(DataContext)
  

      async function updateEmployee(){
        await Axios.put(`https://crudcrud.com/api/${crudCrudEndPoint}/user/${props.id}`, {         
          Name: nameUpdate,
          BirthDate: birthDateUpdate,
          Gender: genderUpdate,
          Email: emailUpdate,
          Cpf: cpfUpdate,
          StartDate: startDateUpdate,
          Team: teamUpdate,
          })

          props.setPopupUpdate(false)
          findAllEmployee()
      }

      function cancel(){
        props.setPopupUpdate(false)
      }

  return (
    <>
      <div className={styles.containerModal}>
        <div className={styles.contentModal}>
        <div className={styles.cancelButton}>
            <button
              onClick={() => {
                props.setPopupUpdate(false);
              }}
            >
              x
            </button>
          </div>
            <h1>Update employee data</h1>

            <div className={styles.dataModal}>

            <label>Name: {props.name}</label>
          <input type="text" placeholder="Your Name" onChange={(e) => {setNameUpdate(e.target.value);}}></input>
          <label>Birth Date: {props.birthDate} </label>
          <input type="date" name="BirthDate" onChange={(e) => {setBirthDateUpdate(e.target.value);}}/>
          <label>Gender:{props.gender} </label>
          <select onChange={(e) => {setGenderUpdate(e.target.value)}}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label>Email: {props.email}</label>
          <input type="email" placeholder="Your e-mail"
            onChange={(e) => {
              setEmailUpdate(e.target.value);
            }}
          ></input>
          <label>CPF:{props.cpf} </label>
          <input
          autoComplete="off" type="number" id="cpf" placeholder="Your CPF"
            onChange={(e) => {
              setCpfUpdate(e.target.value);
            }}
          ></input>
          <label>Start Date:{props.startDate} </label>
          <input type="date" name="StartDate"
            onChange={(e) => {
              setStartDateUpdate(e.target.value);
            }}
          />
          <label>Team: {props.team}</label>
          <select
            onChange={(e) => {
              setTeamUpdate(e.target.value);
            }}
          >
            <option value={null}>---</option>
            <option value="Mobile">Mobile</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>

          </div>
          <div className={styles.updateButton}>
            <button onClick={updateEmployee}>Update Data</button>
            </div>
        </div>
      </div>
    </>
  );
}
