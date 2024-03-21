import axios from 'axios';
import UserPagination from '../UserTable/UserPagination';
import TableItem from './TableItem';
import React, { useState, useEffect } from 'react';

const CabinetTable = ({ searchValue }) => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Adjust this value based on your requirements

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://remont.by/api/cabinets');
                setData(response.data.data);
                setPagination(response.data);
                filterData(response.data.data);
            } catch (error) {
                console.error('Произошла ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);

    const filterData = (data) => {
        const filtered = data.filter((cabinet) =>
            searchValue.toLowerCase() === '' ||
            cabinet.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            cabinet.id.toString().includes(searchValue.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to the first page after filtering
    };

    useEffect(() => {
        filterData(data);
    }, [searchValue, data]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handleDelete = (id) => {
        const updatedCabinets = filteredData.filter(cabinet => cabinet.id !== id);
        setFilteredData(updatedCabinets);
    };

    return (
        <>
            <div className="flex overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center"></div>
                            </th>
                            <th scope="col" class="px-6 py-3">Номер кабинета</th>
                            <th scope="col" class="px-6 py-3">Наименование</th>
                            <th scope="col" class="px-6 py-3">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((cabinet, index) => (
                            <TableItem key={cabinet.id} cabinet={cabinet} onDelete={handleDelete} />
                        ))}
                    </tbody>
                </table>
            </div>

            <UserPagination
                currentPage={currentPage}
                lastPage={Math.ceil(filteredData.length / itemsPerPage)}
                onChangePage={changePage}
            />
        </>
    );
};

export default CabinetTable;
