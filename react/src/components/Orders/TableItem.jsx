import { useState } from "react";
import Indicator from "../RequestTable/Indicator";
import ActionsDropdown from "./ActionsDropdown";

const TableItem = ({order,onDelete}) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleButtonClick = () => {
       setIsDropdownVisible(!isDropdownVisible);
    };
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    {/* Ваш контент */}
                </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                {order.id}
            </th>
            <td className="px-6 py-4">
                {order.sender_name}
            </td>
            <td className="px-6 py-4">
               <Indicator type={order.status}></Indicator>
            </td>
            <td className="py-4">
            <button onClick={handleButtonClick} type="button" class="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 me-2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
    </svg>
    Действия
    </button>
    
<ActionsDropdown order={order} isVisible={isDropdownVisible}></ActionsDropdown>

            </td>
        </tr>
    );
}

export default TableItem;