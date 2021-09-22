import React, { useEffect, useState } from "react";
import Axios from "axios";
import CreateEmployeePopupComponent from "../components/CreateEmployeePopupComponent";
import CardEmployeeComponent from "../components/CardEmployeeComponent";

export default function Home() {
  let crudCrudEndPoint = process.env.REACT_APP_CRUDCRUD_ENDPOINT;

  const [popupCreate, setPopupCreate] = useState("");

  const [nameCreate, setNameCreate] = useState("");
  const [birthDateCreate, setBirthDateCreate] = useState("");
  const [genderCreate, setGenderCreate] = useState("Masculino");
  const [emailCreate, setEmailCreate] = useState("");
  const [cpfCreate, setCpfCreate] = useState("");
  const [startDateCreate, setStartDateCreate] = useState("");
  const [teamCreate, setTeamCreate] = useState(null);

  const [allEmployee, setAllEmployee] = useState([]);

  //let regexEmail = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

  useEffect(() => {
    findAllEmployee();
  }, []);

  async function findAllEmployee() {
    const {data} = await Axios.get(`https://crudcrud.com/api/${crudCrudEndPoint}/user`)
    setAllEmployee(data)
    console.log(data)
  }

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
        setPopupCreate(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function createEmployee() {
    setPopupCreate(true);
  }

  function consolea() {
    console.log(emailCreate);
    console.log(teamCreate);
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={consolea}>Console</button>

      <button onClick={createEmployee}>Create Employee</button>

      <button onClick={findAllEmployee}>GET</button>

      {allEmployee.map((val) => {
        return (
          <div key={val.Name}>
              <CardEmployeeComponent
                Employee={{
                  id: val._id,
                  name: val.Name,
                  birthDate: val.BirthDate,
                  gender: val.Gender,
                  email: val.Email,
                  cpf: val.Cpf,
                  startDate: val.StartDate,
                  team: val.Team,
                }}
              />
            </div>
        );
      })}

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
