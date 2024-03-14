import axios from "axios";
import { useState } from "react";
import InventoryModal from "./InventoryModal";

const ActionsDropdown = ({isVisible,inventory,onDelete}) => {
    const[stateModal,setModal]=useState(false);
    const deleteInventory = async (id) => {
      
        const url = `http://remont.by/api/inventory/${id}`;
        const requestOptions = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                // Добавьте здесь заголовки для аутентификации, если это необходимо
            }
        };
    
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Ошибка при удалении');
            }
            onDelete(id);
            console.log('Удаление успешно');
        } catch (error) {
            console.error('Ошибка:', error);
            window.location.reload();
        }
    };  
    const openModal=()=>{
        setModal(!stateModal)
    }
       const handleClick=()=>{

        deleteInventory(inventory.id); 
       }

    return (
        <>
            {isVisible ? (
                <div id="dropdownDivider" className="absolute z-50 overflow-hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                        <li><a href="#" onClick={handleClick} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Удалить</a></li>
                        <li><a href="#" onClick={openModal} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Редактировать</a></li>
                    </ul>
                    <InventoryModal isOpen={stateModal} onClose={openModal} inventory={inventory}></InventoryModal>
                </div>
             
            ): null}
           
        </>
    );
}
 
export default ActionsDropdown