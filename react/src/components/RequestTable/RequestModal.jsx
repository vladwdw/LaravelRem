import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import SuccesNotification from "../SuccessNotification";
import ErrorNotification from "../ErrorNotification";
import { exec } from "apexcharts";

const RequestModal = ({ isOpen, onClose, request}) => {
    const [parts, setParts] = useState([]); 
    const[status,setStatus]=useState('В ожидании');
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [fields, setFields] = useState([{}]);
    const [visible,setVisible]=useState(false);
    const [errorMessage, setErrorMessage]=useState([]);
    const handleAddField = () => {
        setFields([...fields, { id: fields.length + 1, part: parts[0].part, count: parts[0].count , price:''}]);
    };
    useEffect(() => {
        const fetchParts = async () => {
            try {
                const response = await axios.get('http://remont.by/api/parts');
                setParts(response.data);
                setFields([{ id: 1, part: '', count: '', price:''}]);
            } catch (error) {
                console.error('Error fetching parts', error);
            }
        };
        fetchParts();
    }, [status]);
    const handleRemoveField = () => {
        if (fields.length > 1){
        setFields(fields.filter(field => field.id !== fields.length));
        }
    };

    const handleChange = (id, fieldType, event) => {
        const newFields = fields.map(field =>
            field.id === id ? { ...field, [fieldType]: event.target.value } : field
        );
        setFields(newFields);
    
        // If the fieldType is 'part', update the count with the available count of the selected part
        if (fieldType === 'part') {
            const selectedPart = parts.find(part => part.part === event.target.value);
            if (selectedPart) {
                const updatedField = newFields.find(field => field.id === id);
                if (updatedField) {
                    updatedField.count = selectedPart.count; // Assuming 'count' is the property for available count
                    setFields(newFields); // Update the fields state with the new count
                }
            }
        }
    };
    const showSuccess = (message) => {
        setNotification({ message, type: 'success' });
     };

     const showError = (message) => {
        setNotification({ message, type: 'error' });
     };
     const closeForm=()=>{
        onClose();
        setNotification({ message:'', type: '' });
     }
     // Очистка уведомления после некоторого времени

    const clearNotification = () =>{
        setNotification({ message: '', type: '' });
    }


    const handleStatusChange = (event) => {
      
       setStatus(event.target.value);
       
    };
    useEffect(() => {
        console.log(status);
        if(status=="Выполнен"){
            setVisible(true);
        }
        else{
            setVisible(false);

        }
    }, [status]);


    const RequestUpdate = async (event) => {
        event.preventDefault();
    
        // Check for duplicate 'part' fields
        const partCounts = fields.reduce((acc, field) => {
            acc[field.part] = (acc[field.part] || 0) + 1;
            return acc;
        }, {});
    
        const hasDuplicates = Object.values(partCounts).some(count => count > 1);
    
        if (hasDuplicates) {
            showError('Ошибка: В полях не должно быть повторяющихся значений "part"');
            return; // Exit the function early if duplicates are found
        }
    
        try {
            const response = await axios.put(`http://remont.by/api/request/${request.id}`, {
                status: status,
                recieve_id: localStorage.getItem('id'),
                fields
            });

            showSuccess('Данные успешно обновлены');
            window.location.reload();
    
        } catch (error) {
            if (error.response) {
      
                showError(error.response.data.message);
                return ;
            }

        }
    };
    if (!isOpen) return null;

    return (
        <div id="crud-modal" tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full left-[35%]">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-2 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Редактирование заявки</h3>
                        <button type="button" onClick={closeForm} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={RequestUpdate} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">

                            <div className="col-span-2">
                                <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Статус</label>
                                <select id="position" name="position" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={status} onChange={handleStatusChange}>
                                <option value="В ожидании">В ожидании</option>
                                <option value="Отклонен">Отклонен</option>
                                <option value="Выполнен">Выполнен</option>
                                </select>
                            </div>
                          
                        </div>
                {visible==true?(
                        <>
                            <p class="text-gray-50 py-2">
                            Комплектующие
                            </p>
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            
                                {fields.map(field => (
                                    <div key={field.id} className="col-span-3 flex items-center">
                                <select
                                    value={field.part}
                                    onChange={(event) => handleChange(field.id, 'part', event)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mr-2"
                                >
                                    <option value=""></option>
                                    {parts.map((part, index) => (
                                        <option key={index} value={part.part}>{part.part}</option>
                                    ))}
                                         </select>
                                         <input
    type="number"
    placeholder={`Кол-во(доступно: ${field.count})`}
    onChange={(event) => handleChange(field.id, 'count', event)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 me-2"
/>
                                      
                                    </div>
                                ))}
                                
                            </div>
                            <div class="flex flex-row">
                            <button type="button" onClick={handleAddField} className="text-white me-2 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Добавить
                            </button>
                            <button type="button" onClick={handleRemoveField} className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                Удалить
                            </button>
                            </div>
                            </>):null
}
                        <button type="submit" className="text-white inline-flex mt-4 items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Редактировать
                        </button>
                        {notification.message && notification.type=="error" &&(
      <ErrorNotification message={notification.message} clearNotification={clearNotification}></ErrorNotification>
      )}
                              {notification.message && notification.type=="success" &&(
    <SuccesNotification message={notification.message} clearNotification={clearNotification} ></SuccesNotification>
      )}
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default RequestModal;