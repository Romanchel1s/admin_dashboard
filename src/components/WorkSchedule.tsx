/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Brush } from 'recharts';

// Тип для одной записи расписания
interface ScheduleItem {
    date: string;       // Дата смены в формате "YYYY-MM-DD"
    shiftStart: string; // Время начала смены в формате "HH:mm"
    shiftEnd: string;   // Время окончания смены в формате "HH:mm"
}

// Тип для всего расписания (массив записей)
type Schedule = ScheduleItem[];


interface WorkScheduleProps {
    schedule: Schedule; // Массив записей
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const { date, shiftStart, shiftEnd, workHours } = payload[0].payload;
        return (
            <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                <p><strong>Дата:</strong> {date}</p>
                <p><strong>Начало:</strong> {shiftStart}</p>
                <p><strong>Конец:</strong> {shiftEnd}</p>
                <p><strong>Часы работы:</strong> {workHours} ч.</p>
            </div>
        );
    }
    return null;
};




const WorkSchedule = ({ schedule }: WorkScheduleProps) => {


    const sortedSchedule = [...schedule].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB; // Сортировка в порядке возрастания (по возрастанию дат)
    });

    const data = sortedSchedule.map(item => {
        const shiftStart = new Date(`1970-01-01T${item.shiftStart}:00`);
        const shiftEnd = new Date(`1970-01-01T${item.shiftEnd}:00`);
        const workHours = (shiftEnd.getTime() - shiftStart.getTime()) / (1000 * 60 * 60); // Часы работы

        return {
            date: item.date,
            workHours,
            shiftStart: item.shiftStart,
            shiftEnd: item.shiftEnd
        };
    });

    return (
        <Stack sx={{alignItems: 'center', gap: "20px"}}>
            <Typography variant='h5'>Рабочий график</Typography>
            <BarChart
                width={800}
                height={500}
                data={data}
                margin={{ bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />}/>
                <Bar dataKey="workHours" fill="#8884d8" />
                <Brush dataKey="date" height={30} stroke="#8884d8" startIndex={0} endIndex={5}  />
            </BarChart>
        </Stack>
    );
};

export default WorkSchedule;
