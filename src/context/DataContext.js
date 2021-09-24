import React, { createContext, useEffect, useState } from "react";
import Axios from "axios";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  let crudCrudEndPoint = process.env.REACT_APP_CRUDCRUD_ENDPOINT;

  const [attPage, setAttPage] = useState(0);

  const [allEmployee, setAllEmployee] = useState([]);

  const [dataPreviouslyEmployee, setDataPreviouslyEmployeey] = useState("");

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
  }

  return (
    <DataContext.Provider
      value={{
        attPage,
        setAttPage,
        allEmployee,
        dataPreviouslyEmployee,
        findAllEmployee,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
