import axios from 'axios';
import { TabItem } from 'flowbite-react';
import TableItem from './TableItem';
import React, { useState, useEffect } from 'react';
import UserPagination from './UserPagination';
const UserTable = ({searchValue}) => {

    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [users, setUsers] = useState(data);


    const handleDelete = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
     };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://remont.by/api/employes');
                setData(response.data.data); // Обновляем данные
                setPagination(response.data); // Сохраняем метаданные пагинации
                setUsers(response.data.data);
            } catch (error) {
                console.error('Произошла ошибка при получении данных:', error);
            }
        };
    
        fetchData();
    }, []);

    const changePage = async (page) => {
        try {
            const response = await axios.get(`http://remont.by/api/employes?page=${page}`);
            setUsers(response.data.data); // Обновляем данные
            setPagination(response.data); // Сохраняем метаданные пагинации
        } catch (error) {
            console.error('Произошла ошибка при получении данных:', error);
        }
    };
   


    return ( 
        <>
<div className="flex overflow-x-auto shadow-md mb-5 sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">

                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Имя пользователя
                </th>
                <th scope="col" class="px-4 py-3">
                    ФИО
                </th>
                <th scope="col" class="px-6 py-3">
                    Должность
                </th>
                <th scope="col" class="px-6 py-3">
                    Действия
                </th>
            </tr>
        </thead>
        <tbody>
        {users.filter((user)=>{

            return searchValue.toLowerCase()===''?user:
            user.username.toLowerCase().includes(searchValue.toLowerCase()) || 
            user.full_name.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.position.toLowerCase().includes(searchValue.toLowerCase()) 
            
        
        }).map(user => (
          <TableItem key={user.id} user={user} onDelete={handleDelete} />
        ))}


        </tbody>
    </table>

</div>

<UserPagination 
    currentPage={pagination.current_page}
    lastPage={pagination.last_page}
    onChangePage={changePage}
    
/>

</>

     );

}
 
export default UserTable;