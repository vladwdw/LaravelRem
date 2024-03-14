import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Notification from "../Notification";
const AddInventoryModal = ({ isOpen, onClose}) => {
    const [name, setName] = useState();
  
    const [buyDate, setBuyDate] = useState();
    const [spisDate, setSpisDate] = useState();
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [cabinet, setCabinets]=useState(Array());
    const [cabinet_idd, setCabinetIdd]=useState();
    const [cabinet_id, setCabinetId] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://remont.by/api/cabinets');
               // Сохраняем все данные
                setCabinets(response.data.data);
                if (response.data.data && response.data.data.length > 0) {
                    setCabinetId(response.data.data[0].id);
                    setCabinetIdd(response.data.data[0].id);
                }
        
            } catch (error) {
                console.error('Произошла ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);

    const showSuccess = (message) => {
        setNotification({ message, type: 'success' });
     };

     const showError = (message) => {
        setNotification({ message, type: 'error' });
     };
    
     // Очистка уведомления после некоторого времени
     const closeForm = () => {

        onClose();
        setCabinetId(cabinet_idd);
     };
    const clearNotification = () =>{
        setNotification({ message: '', type: '' });
        setCabinetId()
    }

    const nameChange = (event) => {
        setName(event.target.value);
    };
    const CabinetChange = (event) => {
        const selectedValue = event.target.value;
        const [id, name] = selectedValue.split('_');
        setCabinetId(id);
    };
    const buyDateChange = (event) => {
        setBuyDate(event.target.value);
    };
    const spisDateChange = (event) => {
        setSpisDate(event.target.value);
    };
    const InventoryUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://remont.by/api/inventory`, {
                name,
                cabinet_id,
                buyDate,
                spisDate,
            });
            
            console.log(response.data);
            showSuccess('Инвентарь успешно добавлен');
            window.location.reload(); 
        } catch (error) {

            showError('Произошла ошибка при добавлении инвентаря');
        }
    };
    if (!isOpen) return null;

    return (
        <div id="crud-modal" tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                 <Helmet>
     <script src="js/flowbite.min.js"></script>
    </Helmet>

            <div className="relative p-4 w-full max-w-md max-h-full left-[35%]">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-2 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Добавление инвентаря</h3>
                        <button type="button" onClick={closeForm} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={InventoryUpdate} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Наименование</label>
                                <input type="text" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Наименование"  onChange={nameChange} />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">№_Кабинет</label>
                                <select id="position" name="position" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={CabinetChange}>
                                {   
                                    cabinet.map((cabinet, index) => (
                                        
                                        <option value={`${cabinet.id}_${cabinet.name}`}>{cabinet.id}_{cabinet.name}</option>
                                      ))
                                }
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Дата покупки</label>
                                <input type="date" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="name"  onChange={buyDateChange}/>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Дата списания</label>
                                <input type="date" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="name"  onChange={spisDateChange}/>
                            </div>
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Добавить
                        </button>
                        {notification.message && (
<Notification message={notification.message} clearNotification={clearNotification}></Notification>
      )}
                    </form>
                </div>
                
            </div>

        </div>
    );
}
export default AddInventoryModal;