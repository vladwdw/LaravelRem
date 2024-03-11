import axios from 'axios';
import UserPagination from '../UserTable/UserPagination';
import TableItem from './TableItem';
import ActionsDropdown from './ActionsDropdown';
import React, { useState, useEffect } from 'react';
const  CabinetTable = () => {

    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [cabinets, setCabinets] = useState(data);
    const handleDelete = (id) => {
        const updatedCabinets = cabinets.filter(cabinets => cabinets.id !== id);
        setCabinets(updatedCabinets);
     };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://remont.by/api/cabinets');
                setCabinets(response.data.data); // Обновляем данные
                setPagination(response.data); // Сохраняем метаданные пагинации
            } catch (error) {
                console.error('Произошла ошибка при получении данных:', error);
            }
        };
    
        fetchData();
    }, []);

    const changePage = async (page) => {
        try {
            const response = await axios.get(`http://remont.by/api/cabinets?page=${page}`);
            setCabinets(response.data.data); // Обновляем данные
            setPagination(response.data); // Сохраняем метаданные пагинации
        } catch (error) {
            console.error('Произошла ошибка при получении данных:', error);
        }
    };
   

    return ( 
        <>
<div className="flex  overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">

                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Номер кабинета
                </th>
                <th scope="col" class="px-6 py-3">
                    Наименование
                </th>
                <th scope="col" class="px-6 py-3">
                    Действия
                </th>
            </tr>
        </thead>
        <tbody>
        {cabinets.map((cabinet, index) => (
            <TableItem key={cabinet.id} cabinet={cabinet} onDelete={handleDelete}></TableItem>
        ))}


        </tbody>
    </table>

</div>
<UserPagination 
    currentPage={pagination.current_page}
    lastPage={pagination.last_page}
    onChangePage={changePage}
    
/>
</> );
}
 
export default CabinetTable;