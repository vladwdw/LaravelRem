import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserPagination from '../UserTable/UserPagination';
import TableItem from './TableItem';
import '../../App.css';

const InventoryTable = ({ searchValue }) => {
    const itemsPerPage = 10;
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [filteredInventory, setFilteredInventory] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://remont.by/api/inventories');
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
        const sortedData = sortData(filteredInventory, sortConfig); // Sort the filtered inventory
        setFilteredInventory(sortedData);
    }, [filteredInventory, sortConfig]);
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
            item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.id.toString().includes(searchValue.toLowerCase()) ||
            item.cabinet_name.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.cabinet_id.toString().includes(searchValue.toLowerCase()) ||
            item.buyDate.includes(searchValue.toLowerCase()) ||
            item.spisDate.includes(searchValue.toLowerCase())
        );
        setFilteredInventory(filtered);
    }

    const handleDelete = (id) => {
        const updateInventories = filteredInventory.filter(inventory => inventory.id !== id);
        setFilteredInventory(updateInventories); // Update the filtered inventory state
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);


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
                                Инвентарный номер
                            </th>
                            <th scope="col" class="px-6 py-3 no-select" onClick={() => requestSort('name')}>
                                Наименование
                            </th>
                            <th scope="col" class="px-6 py-3 no-select" onClick={() => requestSort('buyDate')}>
                                Дата покупки
                            </th>
                            <th scope="col" class="px-6 py-3 no-select" onClick={() => requestSort('spisDate')}>
                                Дата списания
                            </th>
                            <th scope="col" class="px-6 py-3 no-select" onClick={() => requestSort('cabinet_id')}>
                                №_Кабинет
                            </th>
                            <th scope="col" class="px-6 py-3 no-select">
                                Действия
                            </th>
                        </tr>
                    </thead>
                    <tbody class="table-content">
                      {
                            currentItems.map((inventory, index) => (
                                <TableItem inventory={inventory} onDelete={handleDelete} />
                            ))
                            }
                    </tbody>
                </table>
            </div>
            <UserPagination
                currentPage={currentPage}
                lastPage={Math.ceil(filteredInventory.length / itemsPerPage)}
                onChangePage={changePage}
            />
        </>
    );
};

export default InventoryTable;
