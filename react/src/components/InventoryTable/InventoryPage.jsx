import { useState, useEffect} from "react";
import axios from "axios";
import NavMenu from "../NavMenu";
import "../RequestTable/loader.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Footer from "../UserTable/Footer";
const InventoryPage = () => {
    const navigate = useNavigate();
    const [inventory, setInventory] = useState([]);
    const [invName, setInvName]=useState();
    const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки
    let { InvId } = useParams();
   
  
  
    useEffect(() => {
       const fetchData = async () => {
         try {
           const response = await axios.get(`http://remont.by/api/inventory/${InvId}`);
           setInventory(response.data.data);
           setInvName(response.data.inv_name)
           setIsLoading(false); // Устанавливаем состояние загрузки в false после получения данных
         } catch (error) {
           console.error('Произошла ошибка при получении данных:', error);
           setIsLoading(false); // Устанавливаем состояние загрузки в false в случае ошибки
         }
       };
   
       fetchData();
    }, [InvId]); // Добавляем requestId в массив зависимостей, чтобы повторно загружать данные при изменении requestId
   

  
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
            
          <div class="max-w-[1020px] p-3 bg-white border border-gray-200 mx-auto rounded-lg shadow   dark:bg-gray-800 dark:border-gray-700">
    
    <div class="px-6 py-4 ">
      <div class="text-gray-50 font-bold text-xl mb-2">Инвентарный номер: {InvId} Наименвоание:{invName}</div>
        <p class="text-gray-50 py-2">
        История ремонта: 
      </p>
      <div class="relative overflow-x-auto overflow-y-auto max-h-md max-w-[1020px] shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" class="px-6 py-3 no-select">
                    Заявка отправлена
                  </th>
                  <th scope="col" class="px-6 py-3 no-select">
                    Заявка выполнена
                  </th>
                  <th scope="col" class="px-6 py-3 no-select">
                     Отправил заявку
                  </th>
                  <th scope="col" class="px-6 py-3 no-select">
                     Починил инвентарь
                  </th>
  
  
              </tr>
          </thead>
          <tbody>{
        inventory.map((inventory, index) => (
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="px-6 py-4 whitespace-nowrap ">
              {inventory.created_date}
          </td>
          <td class="px-6 py-4">
          {inventory.doned_date}
          </td>
          <td class="px-6 py-4">
          {inventory.sender}
          </td>
          <td class="px-6 py-4">
          {inventory.receiver}
          </td>
      </tr>        
      ))
           
  
  }
  
          </tbody>
      </table>
  
  </div>

  
    </div>

  </div>
  
      </div>
      <Footer></Footer>
          </body>
  
      </html>
       );
}
 
export default InventoryPage;