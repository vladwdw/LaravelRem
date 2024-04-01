import axios from "axios";
import { useState } from "react";
import { useNavigate} from "react-router-dom"; 
import RequestModal from "./RequestModal";
const ActionsDropdown = ({isVisible,request,onDelete=null, type=null}) => {
    const navigate = useNavigate();
    const[stateModal,setModal]=useState(false);
    const respondRequest= async (id) => {
        
        try {
            const response = await axios.put(`http://remont.by/api/request/respond/${id}`, {
                id:localStorage.getItem('id')
            });
            
            console.log(response.data);

            window.location.reload(); 
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };
    const AcceptRequest= async (id) => {
        
        try {
            const response = await axios.put(`http://remont.by/api/request/accept/${id}`);
            
            console.log(response.data);

            window.location.reload(); 
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };
    const AproveRequest= async (id) => {
        
        try {
            const response = await axios.put(`http://remont.by/api/request/aprove/${id}`);
            
            console.log(response.data);

            window.location.reload(); 
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };
    const deleteRequest= async (id) => {
      
        const url = `http://remont.by/api/request/${id}`;
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
            if(type!="page"){
            onDelete(id);
            }
            else{
                navigate('/requests');
            }
            console.log('Удаление успешно', response);
        } catch (error) {
            console.error('Ошибка:', error);
            window.location.reload();
        }
    };  
    const openModal=()=>{
        setModal(!stateModal)
    }
       const handleClick=()=>{

        deleteRequest(request.id); 
       }
       const handleViewClick=()=>{

        navigate(`/request/${request.id}`); 
       }
       const handleRespondClick=()=>{
        respondRequest(request.id);
       }
       const handleAccept=()=>{
        AcceptRequest(request.id);
       }
       const handleApprove=()=>{
        AproveRequest(request.id);
       }

    return (
        <>
            {isVisible ? (
                <div id="dropdownDivider" className="absolute z-50 overflow-hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                        {localStorage.getItem('position')=="мастер-ремонтник"? (
                        <>
                        <li><a href="#" onClick={handleClick} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Удалить</a></li>
                        <li><a href="#" onClick={openModal} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Редактировать</a></li>
                        <li><a href="#" onClick={handleRespondClick} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Откликнуться</a></li>
                        </>
                        ):
                        localStorage.getItem('position')=="сотрудник"? (
                            <>
                            <li><a href="#" onClick={handleAccept} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Подтвердить</a></li>
                            <li><a href="#" onClick={handleApprove} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Отклонить</a></li>
                            </>
                            ):
                        null
                        }
                        <li><a href="#" onClick={handleViewClick} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Посмотреть</a></li>
                    </ul>
                  <RequestModal isOpen={stateModal} onClose={openModal} request={request}></RequestModal>
                </div>
             
            ): null}
           
        </>
    );
}
 
export default ActionsDropdown;