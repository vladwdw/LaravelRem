
import NavMenu from "../NavMenu";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./loader.css"
import Footer from "../UserTable/Footer";
import Indicator from "./Indicator";
const RequestPage = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки
  let { requestId } = useParams();
 
  useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get(`http://remont.by/api/request/${requestId}`);
         setRequest(response.data);
         setIsLoading(false); // Устанавливаем состояние загрузки в false после получения данных
       } catch (error) {
         console.error('Произошла ошибка при получении данных:', error);
         setIsLoading(false); // Устанавливаем состояние загрузки в false в случае ошибки
       }
     };
 
     fetchData();
  }, [requestId]); // Добавляем requestId в массив зависимостей, чтобы повторно загружать данные при изменении requestId
 
  if (isLoading) {
    return(
    
    <body class="container max-w-[1920px] height-[100%] mx-auto bg-slate-950">
          <div class="items-center justify-center mx-auto h-screen md:lg:py-0">
            <div class="px-[45rem] pt-[20rem]">
     <span class="loader"></span>;
     </div> 
     </div>
  </body>);
  }
 
    return ( 
        <html class="dark">
      <header class= "bg-slate-200 border-black dark:bg-gray-900 ">
               <Helmet>
                <script src="../../public\js\flowbite.min.js"></script>
               </Helmet>
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" onClick={() => navigate('/')} class="flex items-center space-x-3 rtl:space-x-reverse">
    <img src="/img/remont.png" class="h-11" alt="Remont logo" />
    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Remont</span>
</a>
                <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div class="buttons space-x-3">
    
                    </div>
                    <button data-collapse-toggle="navbar-cta" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                      <span class="sr-only">Open main menu</span>
                      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                      </svg>
                  </button>
                </div>
                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                  <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-slate-200 rounded-lg bg-slate-200 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-slate-200 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                    <a href="#" class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 "onClick={() => navigate('/inventories')}>Инвентарь</a>
                    </li>
                    <li>
                      <a href="#" class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" onClick={() => navigate('/users')}>Сотрудники</a>
                    </li>
                    <li>
                      <a href="#" class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"onClick={() => navigate('/cabinets')}>Кабинеты</a>
                    </li>
                    <li>
                      <a href="#" class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" onClick={() => navigate('/requests')}>Заявки</a>
                    </li>
                  </ul>
                </div>
                </div>
        </header>
        <body class="container max-w-[1920px] mx-auto dark:bg-slate-950  ">
        <div class="items-center justify-center mx-auto h-screen py-[10rem] ">
          
        <div class="max-w-sm p-3 bg-white border border-gray-200 mx-auto rounded-lg shadow   dark:bg-gray-800 dark:border-gray-700">
  
  <div class="px-6 py-4 ">
    <div class="text-gray-50 font-bold text-xl mb-2">Номер заявки: {requestId}</div>
    <p class="text-gray-50 py-2">
      Описание проблемы: {request[0].problemDescription}
    </p>
    <p class="text-gray-50 py-2">
      Автор: {request[0].employe_name}
    </p>
    <p class="text-gray-50 py-2">
      Принял заявку: {request[0].employe_received}
    </p>
    <p class="text-gray-50 py-2">
      №_Кабинет: {request[0].cabinet_id}_{request[0].cabinet_name}
    </p>
    <p class="text-gray-50 py-2">
    Статус:  <Indicator type={request[0].status}></Indicator>
    </p>
    {request[0].inv_id!=null?(
    <p class="text-gray-50 py-2">
      №_Инвентарь: {request[0].inv_id}_{request[0].inv_name}
    </p>
    ): (
      <p class="text-gray-50 py-2">
      Инвентарь: {request[0].inventoryName}
    </p>
    )
}
  </div>
  <div class="px-6 py-4">
  <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
  </div>
  
</div>

    </div>
    <Footer></Footer>
        </body>

    </html>
     );

}
 
export default RequestPage;