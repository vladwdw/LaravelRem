import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import ErrorNotification from "../ErrorNotification";
import SuccesNotification from "../SuccessNotification";
import "./toggle.css";
const AddRequestModal = ({ isOpen, onClose}) => {
    const [name, setName] = useState();
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [inventoryId, setInventoryId] = useState();
    const [inventory, setInventory] = useState(Array());
    const [inv, setInv]=useState();
    const [description, setDescription]=useState();
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [cabinet, setCabinets]=useState(Array());
    const [cabinet_id, setCabinetId] = useState();
    const [visible,setVisible]=useState(false);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Сохраняем файл напрямую в состоянии
            setSelectedFile(file);
            // Создаем URL для предварительного просмотра изображения
            const dataUrl = URL.createObjectURL(file);
            setImagePreviewUrl(dataUrl);
        } else {
            setSelectedFile(null);
            setImagePreviewUrl(null);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://remont.by/api/cabinets');
               // Сохраняем все данные
                setCabinets(response.data.data);
                if (response.data.data && response.data.data.length > 0) {
                    setCabinetId(response.data.data[0].id);
                }
        
            } catch (error) {
                console.error('Произошла ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://remont.by/api/inventories');
               // Сохраняем все данные
                setInventory(response.data.data);
                if (response.data.data && response.data.data.length > 0) {
                    setInventoryId(response.data.data[0].id);
                }
        
            } catch (error) {
                console.error('Произошла ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);

    const ChangeInv = (event)=>{
        setInv(event.target.value);
    }

    const showSuccess = (message) => {
        setNotification({ message, type: 'success' });
     };

     const showError = (message) => {
        setNotification({ message, type: 'error' });
     };
    
     // Очистка уведомления после некоторого времени
     const closeForm = () => {

        setSelectedFile(null);
        setImagePreviewUrl(null);
        setVisible(false);
        onClose();

     
     };
    const clearNotification = () =>{
        setNotification({ message: '', type: '' });
        setCabinetId()
    }

    const nameChange = (event) => {
        setName(event.target.value);
    };

    const InventoryChange = (event) => {
        const selectedValue = event.target.value;
        const [id, name] = selectedValue.split('_');
        setInventoryId(id);
    };
    const descriptionChange = (event) => {
        setDescription(event.target.value);
        console.log(description);
    }
    const CabinetChange = (event) => {
        const selectedValue = event.target.value;
        const [id, name] = selectedValue.split('_');
        setCabinetId(id);
    };

    const RequestUpdate = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('type', visible ? 'inv_id' : 'inventory');
            formData.append('inv_id', inventoryId);
            formData.append('inventory', inv);
            formData.append('cabinet_id', cabinet_id);
            formData.append('employe_id', localStorage.getItem('id'));
            formData.append('problemDescription', description);
            // Добавляем файл напрямую в FormData
            if (selectedFile) {
                formData.append('image', selectedFile);
            }

            const response = await axios.post('http://remont.by/api/request', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(response.data);
            showSuccess('Заяка успешно добавлена');
            window.location.reload();
        } catch (error) {
            showError('Произошла ошибка при добавлении заявки');
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
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Добавление заявки</h3>

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
    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Изображение</label>
    <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
</div>
{imagePreviewUrl!=null && (
    <div className="col-span-2">
        <img src={imagePreviewUrl} alt="Image Preview" className="w-full h-auto" />
    </div>
)}
      
                      <div className="col-span-2">
                            <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">По инвентарному номеру</label>
                            <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-400 ease-in">
                            <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-gray-600 border-4 appearance-none cursor-pointer" onChange={() => setVisible(!visible)}/>
    <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-900 cursor-pointer"></label>
</div>
          
                            </div>
                            {visible?(
                            <div className="col-span-2">
                    
                                <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">№_Инвентарь</label>
                                <select id="position" name="position" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={InventoryChange}>
                                {   
                                    inventory.map((inventory, index) => (
                                        
                                        <option value={`${inventory.id}_${inventory.name}`}>{inventory.id}_{inventory.name}</option>
                                      ))
                                }
                                </select>
                            </div>
                            ):(
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Инвентарь</label>
                                <input type="text" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Инвентарь"  onChange={ChangeInv} />
                            </div>
                            )
                            }
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание проблемы</label>
                                <textarea type="text" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Описание проблемы"  onChange={descriptionChange} />
                            </div>

                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Добавить
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
export default AddRequestModal;