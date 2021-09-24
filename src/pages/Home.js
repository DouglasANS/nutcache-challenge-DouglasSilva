import React, { useContext, useState } from "react";
import CreateEmployeePopupComponent from "../components/CreateEmployeePopupComponent";
import CardEmployeeComponent from "../components/CardEmployeeComponent";
import UpdateEmployeePopupComponent from "../components/UpdateEmployeePopupComponent";
import DeleteEmployeePopupComponent from "../components/DeleteEmployeePopupComponent";
import { DataContext } from "../context/DataContext";
import styles from "../styles/stylePage/Home.module.scss";

export default function Home() {
  const [popupCreate, setPopupCreate] = useState("");

  const [popupUpdatePreviously, setPopupUpdatePreviously] = useState("");
  const [popupDeletePreviously, setPopupDeletePreviously] = useState("");

  const { allEmployee, dataPreviouslyEmployee } = useContext(DataContext);

  async function deletePreviouslyRegisteredEmployee() {
    setPopupDeletePreviously(true);
  }

  function updatePreviouslyRegisteredEmployee() {
    setPopupUpdatePreviously(true);
  }

  function createEmployee() {
    setPopupCreate(true);
  }

  return (
    <div className={styles.container}>
      <div className={styles.menuButton}>
        <button className={styles.menuButtonDelete} onClick={deletePreviouslyRegisteredEmployee}>
          Delete Previously Registered Employee
        </button>
        <button className={styles.menuButtonCreate} onClick={createEmployee}>Create Employee</button> 
        <button className={styles.menuButtonUpdate} onClick={updatePreviouslyRegisteredEmployee}>
          Update Previously Registered Employee
        </button>
       
      </div>

      <div className={styles.cardPosition}>
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
      </div>

      {popupCreate && (
        <CreateEmployeePopupComponent setPopupCreate={setPopupCreate} />
      )}

      {popupDeletePreviously && (
        <DeleteEmployeePopupComponent
          id={dataPreviouslyEmployee._id}
          setPopupDelete={setPopupDeletePreviously}
        />
      )}

      {popupUpdatePreviously && (
        <UpdateEmployeePopupComponent
          setPopupUpdate={setPopupUpdatePreviously}
          id={dataPreviouslyEmployee._id}
          name={dataPreviouslyEmployee.Name}
          birthDate={dataPreviouslyEmployee.BirthDate}
          cpf={dataPreviouslyEmployee.Cpf}
          gender={dataPreviouslyEmployee.Gender}
          email={dataPreviouslyEmployee.Email}
          startDate={dataPreviouslyEmployee.StartDate}
          team={dataPreviouslyEmployee.Team}
        />
      )}
    </div>
  );
}
