import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ActionsDropdown from './ActionsDropdown';
import { TabItem } from 'flowbite-react';
import UserPagination from '../UserTable/UserPagination';
import TableItem from './TableItem';
import '../../App.css';

const InventoryTable = ({ searchValue }) => {
    const itemsPerPage = 2;
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
    });
    const [cabinets, setCabinets] = useState([]);
    const [data, setData] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [filteredInventory, setFilteredInventory] = useState([]); // New state for filtered inventory
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        loadInventories(); // Load all data when the component mounts
    }, []);

    useEffect(() => {
        // Filter inventory based on searchValue
        const filtered = data.filter(item => 
            item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.id.toString().includes(searchValue.toLowerCase()) ||
            item.cabinet_name.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.cabinet_id.toString().includes(searchValue.toLowerCase()) ||
            item.buyDate.includes(searchValue.toLowerCase()) ||
            item.spisDate.includes(searchValue.toLowerCase())
        );
        setFilteredInventory(filtered);
    }, [searchValue, data]);

    const handleDelete = (id) => {
        const updateInventories = filteredInventory.filter(inventory => inventory.id !== id);
        setFilteredInventory(updateInventories); // Update the filtered inventory state
    };

    const loadInventories = async () => {
        try {
            const response = await axios.get(`http://remont.by/api/inventories`);
            setData(response.data.data);
            setInventory(response.data.data);
            setFilteredInventory(response.data.data); // Initialize filteredInventory with the loaded data
            setPagination({
                current_page: 1,
                last_page: Math.ceil(response.data.data.length / itemsPerPage),
            });
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };

    useEffect(() => {
        const sortedData = sortData(filteredInventory, sortConfig); // Sort the filtered inventory
        setInventory(sortedData);
    }, [filteredInventory, sortConfig]);

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
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = inventory.slice(startIndex, endIndex);
        setInventory(paginatedData);
        setPagination(prevState => ({
            ...prevState,
            current_page: page,
        }));
    };

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
                    <tbody>
                        {Array.isArray(data) ? (
                            inventory.map((inventory, index) => (
                                <TableItem inventory={inventory} onDelete={handleDelete} cabinet={cabinets} />
                            ))
                        ) : (
                             <h1>Loading...</h1> // Placeholder UI while data is loading
                        )}
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
export default InventoryTable;
            