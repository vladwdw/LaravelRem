
import NavMenu from "../NavMenu";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import "../RequestTable/loader.css";
import Footer from "../UserTable/Footer";
import Indicator from "../RequestTable/Indicator";
const OrderPage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки
  let { orderId } = useParams();
 
  const updateOrderStatus = async () => {
    try {
       // Assuming `order` contains the order data and `order.parts` contains the parts data
       const response = await axios.post(`http://remont.by/api/order/accept/${orderId}`, {
         order: {
           status: 'Выполнен',
           // Include other order data if necessary
         },
         parts: order.parts.map(part => ({
           id: part.id,
           name:part.part,
           count:part.count // Assuming each part has an ID
         })),
       });
       console.log(response.data);
       // Optionally, update the local state to reflect the change
       setOrder({ ...order, status: 'Выполнен' });
    } catch (error) {
       console.error('Error updating order and parts status:', error);
    }
   };
   const aproveOrder = async () => {
    try {
       // Assuming `order` contains the order data and `order.parts` contains the parts data
       const response = await axios.post(`http://remont.by/api/order/aprove/${orderId}`, {
         order: {
           status: 'Выполнен',
           // Include other order data if necessary
         },
         parts: order.parts.map(part => ({
           id: part.id,
           name:part.part,
           count:part.count // Assuming each part has an ID
         })),
       });
       console.log(response.data);
       // Optionally, update the local state to reflect the change
      navigate('/cabinet');
    } catch (error) {
       console.error('Error updating order and parts status:', error);
    }
   };


  useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get(`http://remont.by/api/order/${orderId}`);
         setOrder(response.data);
         setIsLoading(false); // Устанавливаем состояние загрузки в false после получения данных
       } catch (error) {
         console.error('Произошла ошибка при получении данных:', error);
         setIsLoading(false); // Устанавливаем состояние загрузки в false в случае ошибки
       }
     };
 
     fetchData();
  }, [orderId]); // Добавляем requestId в массив зависимостей, чтобы повторно загружать данные при изменении requestId
 
  const calculateTotalCost = () => {
    let totalCost = 0;
    if (order.parts && order.parts.length > 0) {
      order.parts.forEach(part => {
        totalCost += part.price * part.count;
      });
    }
    return totalCost;
 };

 const totalCost = calculateTotalCost();

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
<NavMenu></NavMenu>
        <body class="container max-w-[1920px] mx-auto dark:bg-slate-950  ">
        <div class="items-center justify-center mx-auto h-screen py-[10rem] ">
          
        <div class="max-w-[520px] p-3 bg-white border border-gray-200 mx-auto rounded-lg shadow   dark:bg-gray-800 dark:border-gray-700">
  
  <div class="px-6 py-4 ">
    <div class="text-gray-50 font-bold text-xl mb-2">Номер закупки: {orderId}</div>
    <p class="text-gray-50 py-2">
      Отправитель:{order.sender.full_name} 
    </p>
    <p class="text-gray-50 py-2">
      Статус: {<Indicator type={order.status}></Indicator>} 
    </p>

    <p class="text-gray-50 py-4">
      Дата создания: {order.created}
      </p>
      <p class="text-gray-50 py-2">
      Комплектующие: 
    </p>
    <div class="relative overflow-x-auto overflow-y-auto max-h-md max-w-md shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 no-select">
                  Наименвоание
                </th>
                <th scope="col" class="px-6 py-3 no-select">
                    Количество
                </th>
                <th scope="col" class="px-6 py-3 no-select">
                    Цена/шт руб.
                </th>


            </tr>
        </thead>
        <tbody>{
      order.parts.map((part, index) => (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {part.part}
        </th>
        <td class="px-6 py-4">
        {part.Buy_count}
        </td>
        <td class="px-6 py-4">
        {part.price}
        </td>
    </tr>        
    ))
         

}

        </tbody>
    </table>

</div>
<p class="text-gray-50 py-4">
      Общая стоимость:{totalCost} рублей
      </p>

  </div>
  {order.status!="Выполнен"?(
  <div class="px-6 py-4">
  <button
      type="button"
      class="dark:text-white hover:text-white  bg-green-700 hover:bg-gradient-to-r from-green-500 via-green-600 to-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-6"
      onClick={updateOrderStatus}
    >
  
    Одобрить
    </button>
    <button
      type="button"
      class="dark:text-white hover:text-white  bg-red-700 hover:bg-gradient-to-r from-red-500 via-red-600 to-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      onClick={aproveOrder}
    >
    Отклонить
    </button>

  </div>):null
}
</div>

    </div>
    <Footer></Footer>
        </body>

    </html>
     );

}
 
export default OrderPage;