import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { TabItem } from 'flowbite-react';
import UserPagination from '../UserTable/UserPagination';
import TableItem from './TableItem';
const InventoryTable = () => {
 
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
    });
    const [data, setData] = useState([]);

    useEffect(() => {
        loadInventories(1); // Загрузка данных при монтировании компонента
    }, []);

    const loadInventories = async (page) => {
        try {
            const response = await axios.get(`http://remont.by/api/inventories?page=${page}`);
            setData(response.data.data); // Предполагая, что данные находятся в response.data.data
            setPagination({
                current_page: response.data.meta.current_page || 1,
                last_page: response.data.meta.last_page || 1,
            });
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            // Здесь можно добавить дополнительную логику обработки ошибок, например, отображение сообщения об ошибке пользователю
        }
    };

    const changePage = (page) => {
        loadInventories(page); // Перезагрузка данных при смене страницы
    };

   

    return ( 
        <>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">

                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Инвентарный номер
                </th>
                <th scope="col" class="px-6 py-3">
                    Наименование
                </th>
                <th scope="col" class="px-6 py-3">
                    Дата покупки
                </th>
                <th scope="col" class="px-6 py-3">
                    Дата списания
                </th>
                <th scope="col" class="px-6 py-3">
                    №_Кабинет
                </th>
                <th scope="col" class="px-6 py-3">
                    Действия
                </th>
            </tr>
        </thead>
        <tbody>
        {Array.isArray(data) ? (
 data.map((inventory, index) => (
    <TableItem key={index} inventory={inventory} />
  ))
) : (
 <h1>Loading...</h1> // Запасной UI, пока данные загружаются
)}

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
 
export default InventoryTable;