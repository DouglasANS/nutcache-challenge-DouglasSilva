import React, { useContext } from "react";
import styles from "../styles/styleComponent/DeleteEmployeePopupComponent.module.scss";
import Axios from "axios";
import { DataContext } from "../context/DataContext";

export default function DeleteEmployeePopupComponent(props) {
  let crudCrudEndPoint = process.env.REACT_APP_CRUDCRUD_ENDPOINT;

  const { findAllEmployee } = useContext(DataContext);

  async function DeleteEmployee() {
    await Axios.delete(
      `https://crudcrud.com/api/${crudCrudEndPoint}/user/${props.id}`
    );
    props.setPopupDelete(false);
    findAllEmployee();
  }

  function cancel() {
    props.setPopupDelete(false);
  }
  return (
    <>
      <div className={styles.containerModal}>
        <div className={styles.contentModal}>
          <div className={styles.cancelButton}>
            <button
              onClick={() => {
                props.setPopupDelete(false);
              }}
            >
              x
            </button>
          </div>

          <h1>Are you sure you want to delete the employee?</h1>
          <div className={styles.deleteButton}>
            <button onClick={DeleteEmployee}>yes</button>
            <button onClick={cancel}>no</button>
          </div>
        </div>
      </div>
    </>
  );
}
