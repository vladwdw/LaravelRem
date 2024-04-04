import NavMenu from "../components/NavMenu";
import AddRequestModal from "../components/RequestTable/AddRequestModal";
import Footer from "../components/UserTable/Footer"
import { useState } from "react";
import RequestTable from "../components/RequestTable/RequestTable";
import UserInput from "../components/UserTable/UserInput";
import { useNavigate } from "react-router-dom";
import OrdersTable from "../components/Orders/OrdersTable";
import UserChart from "../components/Query1/UserChart";
const Cabinet = () => {
    const navigate=useNavigate();
    const [isOpen,setOpen]=useState(false)
    const [searchValue, setSearchValue] = useState('');
    const handleSearch = (event) => {
        setSearchValue(event.target.value);
     };
    const openModal=()=>{
        setOpen(!isOpen);
    }
    
    return ( 

        <html class="dark">
            <NavMenu></NavMenu>
        <body class="container max-w-[1920px] height-[100%] dark:bg-slate-950">
        <div class="lg:mx-auto flex flex-wrap gap-6 justify-center">
            <div class="items-center justify-center mt-5 w-full flex mr-[37rem] max-h-[300px] max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
     
                <div class="flex flex-col items-center pb-10 pt-4 px-4 mr-0 justify-center ">
                    <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src='public\img\remont.png' alt="Bonnie image"/>
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{localStorage.getItem('full_name')}</h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{localStorage.getItem('position')}</span>
                    <div class="flex mt-4">
                        { localStorage.getItem('position') === 'сотрудник' ? (
                        <button onClick={openModal} href="#" class="text-white inline-flex bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                              </svg>
                            
                            Заявка
                        </button>
                        ):
                        localStorage.getItem('position')==='мастер-ремонтник'?
                        (<>
                        <button type="button" class="dark:text-white inline-flex hover:text-white border border-blue-700 hover:bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => navigate('/requests')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                              </svg>Заявки
                              
                        </button>
                                                <button type="button" class="dark:text-white inline-flex hover:text-white border border-blue-700 hover:bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => navigate('/buyOrder')}>
                                                <svg className="w-6 h-6 me-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z"/>
</svg>
Закупка комплектующих
                                                  
                                            </button>
                                            </>
                        ):
                        (
                            <button type="button" class="dark:text-white inline-flex hover:text-white border border-blue-700 hover:bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => navigate('/users')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                              </svg>Сотрудники
                              
                        </button>
                        )
                        
                        }
                    </div>
                </div>
            </div>

    
    
    
        </div>
    
    {localStorage.getItem('position')=="мастер-ремонтник"?(
        <div class="mt-5 mx-auto lg:justify-center sm:w-[45rem] md:w-[50rem] lg:w-[65rem] h-[60rem] relative overflow-x-hidden overflow-hidden shadow-md">
          <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            

          <UserInput search={handleSearch}></UserInput>
          </div>
<RequestTable searchValue={searchValue} masterName={localStorage.getItem('full_name')}></RequestTable>
      
      </div>):localStorage.getItem('position')=="сотрудник"? (
        <>
   <div class="mt-5 mx-auto lg:justify-center sm:w-[45rem] md:w-[50rem] lg:w-[65rem] h-[70rem] relative overflow-x-hidden overflow-hidden shadow-md">
   <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
     

   <UserInput search={handleSearch}></UserInput>
   </div>
<RequestTable searchValue={searchValue} employeName={localStorage.getItem('full_name')}></RequestTable>
<div class="mt-6">
<UserChart> </UserChart>
</div>

</div>


</>
      ):localStorage.getItem('position')=="директор"? (
        <div class="mt-5 mx-auto lg:justify-center sm:w-[45rem] md:w-[50rem] lg:w-[65rem] h-[60rem] relative overflow-x-hidden overflow-hidden shadow-md">
        <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          
     

        </div>
        <OrdersTable></OrdersTable>
     
     </div>
      ):null
}
      <Footer></Footer>    
      <AddRequestModal isOpen={isOpen} onClose={openModal}></AddRequestModal>
        
    
    </body>

    </html>
     );
}
 
export default Cabinet;