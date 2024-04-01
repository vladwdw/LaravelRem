import { useState } from "react";
import ErrorNotification from "../ErrorNotification";
import SuccesNotification from "../SuccessNotification";
import { Helmet } from "react-helmet";
import axios from "axios";
const ReasonModal = ({ isOpen, onClose, inventory}) => {
    const [reason,SetReason]=useState();
    const [notification, setNotification] = useState({ message: '', type: '' });
    const closeForm=()=>{
        onClose();
        SetReason('');
     }
     const reasonChange=(event)=>{
        SetReason(event.target.value);
     }
     const showSuccess = (message) => {
        setNotification({ message, type: 'success' });
     };

     const showError = (message) => {
        setNotification({ message, type: 'error' });
     };
     const clearNotification = () =>{
        setNotification({ message: '', type: '' });
    }
     const InventoryUpdate = async (event) => {
   
        try {
            const response = await axios.put(`http://remont.by/api/inventory/spis/${inventory.id}`, {
            reason
            });
            console.log(response.data);
            showSuccess('Инвентарь успешно списан');

        } catch (error) {

            showError("Произошла ошибка");
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
                    <form  className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Причина</label>
                                <input type="text" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Причина"  onChange={reasonChange} />
                            </div>
                           
                        </div>
                        <button onClick={InventoryUpdate} type="button" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Списать
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
 
export default ReasonModal;