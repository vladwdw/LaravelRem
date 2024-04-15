
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
import ActionsDropdown from "./ActionsDropdown";
const RequestPage = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState();
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleButtonClick = () => {
     setIsDropdownVisible(!isDropdownVisible);
  };

  let { requestId } = useParams();
  const getDocument = async () => {
    try {
       // Получаем ID сотрудника из localStorage
       const response = await axios.get(`http://remont.by/api/document/repair/${requestId}`, {
         responseType: 'blob', // Указываем, что ожидаемый ответ - Blob
       });

       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', `АктРемонта_${requestId}.docx`);
   
       // Добавление ссылки на страницу
       document.body.appendChild(link);
   
       // Начало скачивания
       link.click();
   
       // Очистка и удаление ссылки
       link.parentNode.removeChild(link);
    } catch (error) {
       console.error("Ошибка при обновлении данных", error);
    }
   }
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://remont.by/api/request/${requestId}`);
            setRequest(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Произошла ошибка при получении данных:', error);
            setIsLoading(false);
        }
    };

    fetchData();
}, [requestId]);



  if (isLoading) {
    return(
    
    <body class="container max-w-[1920px] height-[100%] mx-auto bg-slate-950">
          <div class="items-center justify-center mx-auto  h-screen md:lg:py-0 ">
            <div class="px-[45rem] pt-[20rem]">
     <span class="loader"></span>;
     </div> 
     </div>
  </body>);
  }
 
    return ( 
        <html class="dark">
<NavMenu></NavMenu>
        <body class="container max-w-[1920px] mx-auto dark:bg-slate-950  ">
        <div class="items-center justify-center mx-auto h-screen py-[10rem] pb-[50rem] ">
          
        <div class="max-w-[600px] p-3 bg-white border border-gray-200 mx-auto rounded-lg shadow   dark:bg-gray-800 dark:border-gray-700 ">
  
  <div class="px-6 py-4 text-wrap">
    <div class="text-gray-50 font-bold text-xl mb-2">Номер заявки: {requestId}</div>
    <p class="text-gray-50 py-2">
      Описание проблемы: {request.problemDescription}
    </p>
    <p class="text-gray-50 py-2">
      Автор: {request.employe_name}
    </p>
    <p class="text-gray-50 py-2">
      Принял заявку: {request.employe_received}
    </p>
    <p class="text-gray-50 py-2">
      №_Кабинет: {request.cabinet_id}_{request.cabinet_name}
    </p>
    <p class="text-gray-50 py-2">
    Статус:  <Indicator type={request.status}></Indicator>
    </p>
    <p class="text-gray-50 py-2">
 Изображение:
 <a href={"http://remont.by/uploads/repair_requests/"+request.image} target="_blank" rel="noopener noreferrer">
 <img class="w-[30px] h-50" src={"http://remont.by/uploads/repair_requests/"+request.image} alt="Изображения нету" />
</a>
</p>
    {request.inv_id!=null?(
    <p class="text-gray-50 py-2">
      №_Инвентарь: {request.inv_id}_{request.inv_name}
    </p>
    ): (
      <p class="text-gray-50 py-2">
      Инвентарь: {request.inventoryName}
    </p>
    )
}
<p class="text-gray-50 py-2">
  Используемые комплектующие:
</p>
<div class="relative overflow-x-auto overflow-y-auto max-h-md max-w-md shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                  Наименвоание
                </th>
                <th scope="col" class="px-6 py-3">
                    Количество
                </th>


            </tr>
        </thead>
        <tbody>
    {request.parts?.map((part, index) => (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {part.part_name}
            </th>
            <td class="px-6 py-4">
                {part.count}
            </td>
        </tr>
    ))}
</tbody>
    </table>

</div>

  </div>
  <div class="px-6 py-4 ">
  <button onClick={handleButtonClick} type="button" class="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 me-2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
    </svg>
    Действия
    </button>
    
<ActionsDropdown isVisible={isDropdownVisible} type="page" request={request}></ActionsDropdown>
{
request.status=="Выполнен"?(
<div class=" py-4">
          <button
      type="button"
      class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      onClick={getDocument}
    >
   Акт ремонта
    </button>
      </div>
):null
}
  </div>

</div>

    </div>
    <Footer></Footer>
        </body>

    </html>
     );

}
 
export default RequestPage;