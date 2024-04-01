import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserPagination from '../UserTable/UserPagination';
import TableItem from './TableItem';
import '../../App.css';

const OrdersTable = ({ searchValue="" }) => {
    const itemsPerPage = 10;
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://remont.by/api/orders');
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
        const sortedData = sortData(filteredOrders,sortConfig); // Sort the filtered inventory
        setFilteredOrders(sortedData);
    }, [filteredOrders, sortConfig]);
    useEffect(() => {
        filterData(data);
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
    const filterData=(data)=>{
        const filtered = data.filter(item => 
            item.id.toString().includes(searchValue.toLowerCase()) || 
            item.sender_name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredOrders(filtered);
    }

    const handleDelete = (id) => {
        const updateOrders= filteredOrders.filter(order => order.id !== id);
        setFilteredOrders(updateOrders); // Update the filtered inventory state
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <>
            <div className="flex overflow-x-auto shadow-md mb-5 sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    {/* Add an onClick handler for sorting */}
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3 no-select" onClick={() => requestSort('id')}>
                                №Закупки
                            </th>
                            <th scope="col" class="px-6 py-3 no-select" onClick={() => requestSort('sernder_name')}>
                                Отправитель
                            </th>
                            <th scope="col" class="px-6 py-3 no-select" onClick={() => requestSort('status')}>
                                Статус
                            </th>
                            <th scope="col" class="px-6 py-3 no-select">
                                Действия
                            </th>
                        </tr>
                    </thead>
                    <tbody class="table-content">
                      {
                            currentItems.map((order, index) => (
                                <TableItem order={order} onDelete={handleDelete} />
                            ))
                            }
                    </tbody>
                </table>
            </div>
            <UserPagination
                currentPage={currentPage}
                lastPage={Math.ceil(filteredOrders.length / itemsPerPage)}
                onChangePage={changePage}
            />
        </>
    );
};

export default OrdersTable;
