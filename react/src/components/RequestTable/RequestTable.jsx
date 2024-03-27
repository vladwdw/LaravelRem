import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserPagination from '../UserTable/UserPagination';
import TableItem from './TableItem';
import '../../App.css';
const RequestTable = ({searchValue=null, masterName=null}) => {
    const itemsPerPage = 10;
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://remont.by/api/requests');
                setData(response.data.data);
                setPagination(response.data);
                filterData(response.data.data);
            } catch (error) {
                console.error('Произошла ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const sortedData = sortData(filteredRequests, sortConfig); // Sort the filtered inventory
        setFilteredRequests(sortedData);
    }, [filteredRequests, sortConfig]);

    useEffect(() => {
        if (masterName != null) {
            const lowerCaseSearchValue = masterName.toLowerCase();
            const filtered = data.filter(item => {
                // Check if employe_received is not an empty string before comparing
                return item.employe_received && item.employe_received.toLowerCase().includes(lowerCaseSearchValue);
            });
            setFilteredRequests(filtered);
        }
    }, [masterName, data]);

    useEffect(() => {
        if(searchValue!=null){
        filterData(data);
        }
    }, [searchValue, data]);
    const sortData = (data, config) => {
        if (!config.key) {
            return data;
        }

        const sortedData = [...data].sort((a, b) => {
            if (a[config.key] < b[config.key]) {
                return config.direction === 'ascending' ? -1 : 1;
            }
            if (a[config.key] > b[config.key]) {
                return config.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        return sortedData;
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const changePage = (page) => {
        setCurrentPage(page);
    };
    const filterData = (data) => {
        const lowerCaseSearchValue = searchValue.toLowerCase();
        const filtered = data.filter(item => {
            const employeReceived = item.employe_received ? item.employe_received.toLowerCase() : '';
            const invId = item.inv_id ? item.inv_id.toString() : '';
            const invName = item.inv_name ? item.inv_name.toLowerCase() : '';
            const inventory = item.inventory ? item.inventory.toLowerCase() : '';
    
            return item.id.toString().includes(lowerCaseSearchValue) ||
                item.cabinet_name.toLowerCase().includes(lowerCaseSearchValue) ||
                item.cabinet_id.toString().includes(lowerCaseSearchValue) ||
                item.employe_name.toLowerCase().includes(lowerCaseSearchValue) ||
                employeReceived.includes(lowerCaseSearchValue) ||
                item.status.toLowerCase().includes(lowerCaseSearchValue) ||
                (item.inv_id != null ? (
                    invId.includes(lowerCaseSearchValue) ||
                    invName.includes(lowerCaseSearchValue)
                ) : inventory.includes(lowerCaseSearchValue));
        });
        setFilteredRequests(filtered);
    }
    const handleDelete = (id) => {
        const updateRequests = filteredRequests.filter(request => request.id !== id);
        setFilteredRequests(updateRequests); // Update the filtered inventory state
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <>
            <div className="flex overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    {/* Add an onClick handler for sorting */}
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3 no-select" onClick={() => requestSort('id')}>
                                №Заявки
                            </th>
                            <th scope="col" class="px-6 py-3 no-select" onClick={() => requestSort('inv_id')}>
                                №_Инвентарь
                            </th>
                            <th scope="col" class="px-6 py-3 no-select" onClick={() => requestSort('cabinet_id')}>
                                №_Кабинет
                            </th>
                            <th scope="col" class="px-6 py-3 no-select" onClick={() => requestSort('employe_name')}>
                                Отправитель
                            </th>
                            <th scope="col" class="px-6 py-3 no-select" onClick={() => requestSort('employe_received')}>
                                Принял
                            </th>
                            <th scope="col" class="px-6 py-3 no-select" onClick={() => requestSort('status')}>
                               Статус
                            </th>
                            <th scope="col" class="px-6 py-3 no-select">
                                Действия
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                            currentItems.map((request, index) => (
                                <TableItem request={request} onDelete={handleDelete} />
                            ))
                            }
                    </tbody>
                </table>
            </div>
            <UserPagination
                currentPage={currentPage}
                lastPage={Math.ceil(filteredRequests.length / itemsPerPage)}
                onChangePage={changePage}
            />
        </>
    );
}
 
export default RequestTable;