import axios from "axios";
import { useState } from "react";
import { useNavigate} from "react-router-dom"; 
const ActionsDropdown = ({isVisible,order}) => {
    const navigate = useNavigate();
    const[stateModal,setModal]=useState(false);
    const handleClick=()=>{
        navigate(`/order/${order.id}`);
    }

    return (
        <>
            {isVisible ? (
                <div id="dropdownDivider" className="absolute z-50 overflow-hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
              
                    
                        <li><a href="#" onClick={handleClick} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Посмотреть</a></li>


                    </ul>
                </div>
             
            ): null}
           
        </>
    );
}
 
export default ActionsDropdown;