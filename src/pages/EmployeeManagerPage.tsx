/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, CircularProgress, Stack, TextField } from "@mui/material";
import {  useEffect, useState } from "react";
import api from "../api/apiClient";
import WorkSchedule from "../components/WorkSchedule";
import Store from "../api/models/store";
import Employee from "../api/models/employee";

const EmployeeManagerPage: React.FC = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const [employes, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const stores = await api.getAllStores();
              setData(stores);
          } catch (err: unknown) {
              if (err instanceof Error) {
                  setError(err.message);
              } else {
                  setError("An unknown error occurred");
              }
          } finally {
              setLoading(false);
          }
      };
      fetchData();
    }, []);
  


    const getEmployees = async () => {
      if (selectedStore === null) return;
      const data = await api.getStoreEmployees(selectedStore.id.toString());
      setEmployees(data);
    }

    const getEmployeeSchedule = async () => {
      if (selectedEmployee === null) return;
      const data = await api.getEmployeeSchedule(selectedEmployee.user_id.toString());
      setSchedule(data.schedule);
    }

    useEffect(() => {
      getEmployees();
    }, [selectedStore]);

    useEffect(() => {
      getEmployeeSchedule();
    }, [selectedEmployee]);

    const handleStoreChange = (_event: unknown, value: Store | null) => {
        setSelectedStore(value);
    };

    const handleEmployeeChange = (_event: unknown, value: Employee | null) => {
        setSelectedEmployee(value);
    }

    if (loading) return <CircularProgress />;
    if (error) return <div>Error: {error}</div>;
    return (
      <>
        <Stack style={{ marginTop: '100px', width: '300px', margin: '20px auto', fontFamily: 'Arial, sans-serif', gap: '30px' }}>
          <Autocomplete
            options={data}
            getOptionLabel={(option: Store) => option.name}
            renderInput={(params) => <TextField {...params} label="Выберите магазин" />}
            onChange={handleStoreChange}
            value={selectedStore}
          />
        {employes.length > 0? <Autocomplete
            options={employes}
            getOptionLabel={(option) => option.username}
            renderInput={(params) => <TextField {...params} label="Выберите сотрудника" />}
            onChange={handleEmployeeChange}
            value={selectedEmployee}
          />: null }
        {selectedEmployee ? <WorkSchedule schedule={schedule} /> : null}
        </Stack>
      </>
    );
};

export default EmployeeManagerPage;