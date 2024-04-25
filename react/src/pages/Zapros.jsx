import Footer from "../components/UserTable/Footer";
import AddInventoryModal from "../components/InventoryTable/AddInventoryModal";
import InventoryTable from "../components/InventoryTable/InventoryTable";
import NavMenu from "../components/NavMenu";
import UserInput from "../components/UserTable/UserInput";
import { useState } from "react";
import RequestTable from "../components/RequestTable/RequestTable";
import AddRequestModal from "../components/RequestTable/AddRequestModal";
import ChartComponent from "../components/Query1/ChartComponent";
import UserTable from "../components/UserTable/UserTable";
import { useThemeMode } from "flowbite-react";
import { useEffect } from "react";
import SuccesNotification from "../components/SuccessNotification";
import ErrorNotification from "../components/ErrorNotification";
import axios from "axios";
const Zapros = () => {
    const [isOpen,setOpen]=useState(false)
    const [searchValue, setSearchValue] = useState('');
    const [start_date,setStartDate]=useState('');
    const [end_date,setEndDate]=useState('');
    const [user,setUser]=useState();
    const [type,setType]=useState("field");
    const [cabinets, setCabinets] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const handleSearch = (event) => {
        setSearchValue(event.target.value);
     };
     console.log(searchValue);
    const openModal=()=>{
        setOpen(!isOpen);
    }
    const showSuccess = (message) => {
        setNotification({ message, type: 'success' });
      };
      const clearNotification = () =>{
        setNotification({ message: '', type: '' });
      }
      const showError = (message) => {
        setNotification({ message, type: 'error' });
      };
    const getData = () => {
  
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://remont.by/api/employes/top`, {
                    params: {
                      start_date,
                      end_date,
                    },
                  });
                setUser(response.data);
                setType("top");
                showSuccess("Данные получены успешно");
            } catch (error) {
                console.error('Произошла ошибка при получении данных:', error);
                showError("Произошла ошибка");
            }
        };
        fetchData();
    

       
    };
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://remont.by/api/cabinets/inventory');
                setCabinets(response.data); // Изменено на setCabinets
            } catch (error) {
                console.error('Произошла ошибка при получении данных:', error);
            }
        };
        fetchData();
    }, []);

    return ( 
        <html class="dark">
        <NavMenu></NavMenu>
        <body class="container max-w-[1920px] height-[100%] mx-auto dark:bg-slate-950">
  
        <div class="items-center justify-center mx-auto  h-screen md:lg:py-0">
<div class="pt-5 px-[5rem]">
<div className="flex flex-row">

    <div class="w-[40rem] ml-[40rem] mb-[1rem] ">

    </div>
    </div>
       <ChartComponent></ChartComponent>

    </div> 
    <div class="pt-5 px-[5rem]">
    <h1 class="text-3xl text-white">Отсортировать инвентарь по количеству произведённых с ним ремонтов</h1>
<div className="flex flex-row">

    <div class="w-[40rem] ml-[40rem] mb-[1rem] ">

    </div>
    </div>
       <InventoryTable searchValue="" type="sortInv"></InventoryTable>

    </div> 
    <div class="pt-5 px-[5rem]">
    <h1 class="text-3xl text-white">Найти сотрудников, которые выполнили наибольшее количество
ремонтов за заданный промежуток времени</h1>
<div className="flex flex-row">
<div class="mt-4 flex flex-row gap-5">
          <div className="row">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Начальная дата</label>
              <input type="date" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="date" onChange={(event)=>{setStartDate(event.target.value)}} />
          </div>
          <div className="row">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Конечная дата</label>
              <input type="date" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="date" onChange={(event)=>{setEndDate(event.target.value)}} />
          </div>
          <div className="row">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Действие</label>
          <button
            href="#"
            onClick={getData}
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700  dark:focus:ring-gray-700 dark:border border-gray-500 px-3 py-2">
          Выполнить
            <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
          </button>
          </div>
          
          </div>
    <div class="w-[40rem] ml-[40rem] mb-[1rem] ">

    </div>
    </div>
    <div class="mt-5">
      <UserTable user={user} searchValue="" type={type}></UserTable>
      </div>
      <div class="mt-5">
      <h1 class="text-3xl mb-10 text-white">Вывести список кабинетов с объектами и количеством
зарегистрированного инвентаря в этих кабинетах</h1>
      <div className="flex overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center"></div>
                            </th>
                            <th scope="col" class="px-6 py-3 no-select" >Номер кабинета_наименование</th>
                            <th scope="col" class="px-6 py-3 no-select" >Количество инвентаря</th>
                            <th scope="col" class="px-6 py-3 no-select">Наименования</th>
                        </tr>
                    </thead>
                    <tbody>
    {cabinets.map((cabinet) => (
        <tr key={cabinet.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="w-4 p-4">
                <div class="flex items-center"></div>
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {cabinet.id}_{cabinet.name}
            </th>
            <td class="px-6 py-4">
                {cabinet.inventory_count}
            </td>
            <td class="py-4 px-6">
                {cabinet.inventory_names}
            </td>
        </tr>
    ))}
</tbody>
                </table>
            </div>
      </div>
    </div> 


    </div>
    <div class="mt-[100rem]">
    <Footer></Footer>
    </div>
    {notification.message && notification.type=="error" &&(
      <div class="fixed z-100 right-2 bottom-0">
      <ErrorNotification message={notification.message} clearNotification={clearNotification}></ErrorNotification>
      </div>
      )}
                              {notification.message && notification.type=="success" &&(
    <div class="fixed z-100 right-5 bottom-0">
    <SuccesNotification message={notification.message} clearNotification={clearNotification} ></SuccesNotification>
    </div>
      )}
        </body>

    </html>
     );

}
 
export default Zapros;