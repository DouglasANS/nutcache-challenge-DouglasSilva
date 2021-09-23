import React, { useEffect, useState } from "react";
import Axios from "axios";
import CreateEmployeePopupComponent from "../components/CreateEmployeePopupComponent";
import CardEmployeeComponent from "../components/CardEmployeeComponent";
import UpdateEmployeePopupComponent from "../components/UpdateEmployeePopupComponent";
import DeleteEmployeePopupComponent from "../components/DeleteEmployeePopupComponent";

export default function Home() {
  let crudCrudEndPoint = process.env.REACT_APP_CRUDCRUD_ENDPOINT;

  const [popupCreate, setPopupCreate] = useState("");

  

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
    setPopupUpdatePreviously(true)
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
        <CreateEmployeePopupComponent setPopupCreate={setPopupCreate}
        />
      )}

{popupDeletePreviously && (
  <DeleteEmployeePopupComponent id={dataPreviouslyEmployee._id} setPopupDelete={setPopupDeletePreviously} />
      )}

{popupUpdatePreviously && (
        <UpdateEmployeePopupComponent setPopupUpdate={setPopupUpdatePreviously} id={dataPreviouslyEmployee._id} name={dataPreviouslyEmployee.Name} 
        birthDate={dataPreviouslyEmployee.BirthDate} cpf={dataPreviouslyEmployee.Cpf} gender={dataPreviouslyEmployee.Gender} email={dataPreviouslyEmployee.Email} startDate={dataPreviouslyEmployee.StartDate} team={dataPreviouslyEmployee.Team} />
      )}

    </div>
  );
}
