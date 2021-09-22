import React, { useState } from "react";
import Axios from "axios";
import CreateEmployeePopupComponent from "../components/CreateEmployeePopupComponent";

export default function Home() {
  const [popupCreate, setPopupCreate] = useState("");
  
  const [nameCreate, setNameCreate] = useState("");
  const [birthDateCreate, setBirthDateCreate] = useState("");
  const [genderCreate, setGenderCreate] = useState("Masculino");
  const [emailCreate, setEmailCreate] = useState("");
  const [cpfCreate, setCpfCreate] = useState("");
  const [startDateCreate, setStartDateCreate] = useState("");
  const [teamCreate, setTeamCreate] = useState(null);

  //let regexEmail = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"


  function buscarData() {
    Axios.get(
      `shttps://crudcrud.com/api/5a95f90f6496427dbde7149237d3fef9/user`
    ).then((e) => {
      console.log(e);
    });
  }

  async function AddEmployee() {
      console.log(cpfCreate.length)
      if(emailCreate === "" || cpfCreate.length !== 11 ){
          return alert("preencha os campos")
      }
    try {
      await Axios.post(
        "shttps://crudcrud.com/api/5a95f90f6496427dbde7149237d3fef9/user",
        {
          Name: nameCreate,
          BirthDate: birthDateCreate.replace('-', '').replace('-', ''),
          Gender: genderCreate,
          Email: emailCreate,
          CPF: cpfCreate,
          StartDate: startDateCreate.replace('-', '').replace('-', ''),
          Team: teamCreate,
        }
      ).then((e) => {
        console.log(e);
        setPopupCreate(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function createEmployee() {
    setPopupCreate(true);
  }

  function consolea(){
      console.log(emailCreate)
      console.log(teamCreate)
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={consolea}>Console</button>

      <button onClick={createEmployee}>Create Employee</button>

      

      <button onClick={buscarData}>GET</button>


      {popupCreate && (
        <CreateEmployeePopupComponent
          setPopupCreate={setPopupCreate}
          
          setNameCreate={setNameCreate}
          setBirthDateCreate={setBirthDateCreate}
          setGenderCreate={setGenderCreate}
          setEmailCreate={setEmailCreate}
          setCpfCreate={setCpfCreate}
          setStartDateCreate={setStartDateCreate}
          setTeamCreate={setTeamCreate}
          
          AddEmployee={AddEmployee}
        />
      )}
    </div>
  );
}
