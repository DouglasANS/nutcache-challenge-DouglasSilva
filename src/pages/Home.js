import React, { useEffect, useState } from "react";
import Axios from "axios";
import CreateEmployeePopupComponent from "../components/CreateEmployeePopupComponent";
import CardEmployeeComponent from "../components/CardEmployeeComponent";
import UpdateEmployeePopupComponent from "../components/UpdateEmployeePopupComponent";
import DeleteEmployeePopupComponent from "../components/DeleteEmployeePopupComponent";

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

  const [popupUpdatePreviously, setPopupUpdatePreviously] = useState('');
  const [popupDeletePreviously, setPopupDeletePreviously] = useState('');

  const [dataPreviouslyEmployee, setDataPreviouslyEmployeey] = useState('');
  
  const [allEmployee, setAllEmployee] = useState([]);

  //let regexEmail = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

   

  useEffect(() => {
    findAllEmployee();
  }, []);

  async function findAllEmployee() {
    const { data } = await Axios.get(
      `https://crudcrud.com/api/${crudCrudEndPoint}/user`
    );
    setAllEmployee(data);
    let excludeNumber = data.length - 1;
    setDataPreviouslyEmployeey(data[excludeNumber]);
    console.log("data: ", data);
  }

  async function deletePreviouslyRegisteredEmployee() {
    setPopupDeletePreviously(true)
    //await Axios.delete( `https://crudcrud.com/api/${crudCrudEndPoint}/user/${id}`);
  }

  function updatePreviouslyRegisteredEmployee() {
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

  function teste(){
    console.log(dataPreviouslyEmployee)
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={teste}>
        teste
      </button>
      <button onClick={deletePreviouslyRegisteredEmployee}>
        Delete Previously Registered Employee
      </button>
      <button onClick={updatePreviouslyRegisteredEmployee}>
      Update Previously Registered Employee
      </button>
      <button onClick={createEmployee}>Create Employee</button>

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

{popupDeletePreviously && (
  <DeleteEmployeePopupComponent id={dataPreviouslyEmployee._id} setPopupDelete={setPopupDeletePreviously} />
      )}

    </div>
  );
}
