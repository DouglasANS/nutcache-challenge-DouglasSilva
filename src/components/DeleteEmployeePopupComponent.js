import React from "react";
import styles from "../styles/styleComponent/CreateEmployeePopupComponent.module.scss";
import Axios from 'axios'

export default function DeleteEmployeePopupComponent(props) {
    let crudCrudEndPoint = process.env.REACT_APP_CRUDCRUD_ENDPOINT;

    async function DeleteEmployee() {
        await Axios.delete(`https://crudcrud.com/api/${crudCrudEndPoint}/user/${props.id}`)
        props.setPopupDelete(false)
      }

      function cancel(){
        props.setPopupDelete(false)
      }
  return (
    <>
      <div className={styles.containerModal}>
        <div className={styles.contentModal}>
            <h1>Are you sure you want to delete the employee?</h1>
            <button onClick={DeleteEmployee}>yes</button>
            <button onClick={cancel}>no</button>
          
        </div>
      </div>
    </>
  );
}
