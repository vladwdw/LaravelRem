import { useState, useEffect } from "react";
import axios from "axios";
const CabinetModal = ({ isOpen, onClose, cabinet }) => {
    const[name,setName]=useState(cabinet.name);
    const nameChange = (event) => {
        setName(event.target.value);
    };
    const cabinetUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://remont.by/api/cabinet/${cabinet.id}`, {
                name,
            });
            
            console.log(response.data);
   
        } catch (error) {
            console.error('Error updating cabinet:', error);
        }
    };
    console.log(name);
    if (!isOpen) return null;
    return ( 
        <div id="crud-modal" tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full left-[35%] top-[25%]">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-2 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Редактирование кабинета</h3>
                    <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form onSubmit={cabinetUpdate} className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Наименование кабинета</label>
                            <input type="text" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="name" value={name} onChange={nameChange} />
                        </div>
                    </div>
                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Редактировать
                    </button>
                </form>
            </div>
        </div>
    </div>

     );
}
 
export default CabinetModal;