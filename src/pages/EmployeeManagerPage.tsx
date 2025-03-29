/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, CircularProgress, Stack, TextField } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import api from "../api/apiClient";
import WorkSchedule from "../components/WorkSchedule";

const EmployeeManagerPage: React.FC = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedStore, setSelectedStore] = useState(null);
    const [employes, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/upload/bot/map.json');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            const stores = jsonData.map((store: { id: unknown; name: unknown; }, index: unknown) => ({
                id: store.id || index,
                name: store.name || 'unknown',
            }));
            setData(stores);
          } catch (err: unknown) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
    }, []);


    const getEmployees = async () => {
      if (selectedStore === null) return;
      const data = await api.getStoreEmployees(selectedStore.id);
      setEmployees(data);
    }

    const getEmployeeSchedule = async () => {
      if (selectedEmployee === null) return;
      const data = await api.getEmployeeSchedule(selectedEmployee.id);
      setSchedule(data.schedule);
    }

    useEffect(() => {
      getEmployees();
    }, [selectedStore]);

    useEffect(() => {
      getEmployeeSchedule();
    }, [selectedEmployee]);

    const handleStoreChange = (_event: unknown, value: SetStateAction<null>) => {
        setSelectedStore(value);
    };

    const handleEmployeeChange = (_event: unknown, value: SetStateAction<null>) => {
        setSelectedEmployee(value);
    }

    if (loading) return <CircularProgress />;
    if (error) return <div>Error: {error}</div>;
    return (
      <>
        <Stack style={{ marginTop: '100px', width: '300px', margin: '20px auto', fontFamily: 'Arial, sans-serif', gap: '30px' }}>
          <Autocomplete
            options={data}
            getOptionLabel={(option) => option.name}
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