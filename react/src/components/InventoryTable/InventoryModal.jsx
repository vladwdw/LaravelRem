import { useState,useEffect } from "react";
import { useAsyncError } from "react-router-dom";
import axios from "axios";
const InventoryModal = ({ isOpen, onClose, inventory}) => {
    const [id, setId] = useState(inventory.id);
    const [name, setName] = useState(inventory.name);
    const [buyDate, setBuyDate] = useState(inventory.buyDate);
    const [spisDate, setSpisDate] = useState(inventory.spisDate);
    const [cabinet_id,setCabinetId]=useState(inventory.cabinet_id)
    const [cabinet_name,setCabinetName]=useState(inventory.cabinet_name)
    const [cabinet, setCabinets]=useState(Array());
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://remont.by/api/cabinets');
               // Сохраняем все данные
                setCabinets(response.data.data); // Инициализируем текущую страницу данными
        
            } catch (error) {
                console.error('Произошла ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const BuyDateChange = (event) => {
        setBuyDate(event.target.value);
    };
    const SpisDateChange = (event) => {
        setSpisDate(event.target.value);
    };
    const handleCabinetChange = (event) => {
        const selectedValue = event.target.value;
        const [id, name] = selectedValue.split('_');
        setCabinetId(id);
        setCabinetName(name);
       };

 const inventoryUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://remont.by/api/inventory/${inventory.id}`, {
                name,
                buyDate,
                spisDate,
                cabinet_id,
            });
            
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error updating Inventory', error);
        }
    };
    if (!isOpen) return null;

    return (
        <div id="crud-modal" tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full left-[35%] top-[25%]">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-2 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Редактирование инвентаря</h3>
                        <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={inventoryUpdate} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Наименование</label>
                                <input type="text" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Наименование" value={name} onChange={handleNameChange} />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">№_Кабинет</label>
                                <select id="position" name="position" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={cabinet_id} onChange={handleCabinetChange}>
                                <option value={`${cabinet_id}_${cabinet_name}`}>{cabinet_id}_{cabinet_name}</option>
                                {   
                                    cabinet.filter((cabinet, index) => cabinet.id !== cabinet_id && cabinet.name!==cabinet_name).map((cabinet, index) => (
                                        
                                        <option value={`${cabinet.id}_${cabinet.name}`}>{cabinet.id}_{cabinet.name}</option>
                                      ))
                                }
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Дата покупки</label>
                                <input type="date" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="name" value={buyDate} onChange={BuyDateChange}/>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Дата списания</label>
                                <input type="date" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="name" value={spisDate} onChange={SpisDateChange}/>
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
 
export default InventoryModal;