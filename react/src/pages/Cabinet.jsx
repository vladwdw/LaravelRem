import NavMenu from "../components/NavMenu";
import Footer from "../components/UserTable/Footer"
const Cabinet = () => {
    return ( 

        <html class="dark">
            <NavMenu></NavMenu>
        <body class="container max-w-[1920px] height-[100%] dark:bg-slate-950">
        <div class="lg:mx-auto flex flex-wrap gap-6 justify-center">
            <div class="items-center justify-center mt-5 w-full flex mr-[26rem] max-h-[300px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
     
                <div class="flex flex-col items-center pb-10 pt-4 px-4 mr-0 justify-center ">
                    <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src='public\img\remont.png' alt="Bonnie image"/>
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{localStorage.getItem('full_name')}</h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{localStorage.getItem('position')}</span>
                    <div class="flex mt-4">
                        { localStorage.getItem('position') === 'сотрудник' ? (
                        <button href="#" class="text-white inline-flex bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                              </svg>
                              
                            Заявка
                        </button>
                        ):
                        localStorage.getItem('position')==='мастер-ремонтник'?
                        (
                        <button type="button" class="dark:text-white inline-flex hover:text-white border border-blue-700 hover:bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                              </svg>Заявки на ремонт
                              
                        </button>):
                        (
                            <button type="button" class="dark:text-white inline-flex hover:text-white border border-blue-700 hover:bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
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
    
    
        <div class="mt-5 mx-auto lg:justify-center sm:w-[40rem] md:w-[50rem] lg:w-[50rem] relative overflow-x-auto shadow-md sm:rounded-lg">
          <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            
              <label for="table-search" class="sr-only">Поиск</label>
              <div class="relative">
                  <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                      <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Поиск "/>
              </div>
          </div>
          <table class="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
   
                      <th scope="col" class="px-6 py-3">
                          Кабинет
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Дата создания
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Создатель
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Статус
                      </th>
    
                  </tr>
              </thead>
              <tbody>
      
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
   
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Столярская
                      </th>
                      <td class="px-6 py-4">
                          18.09.2003
                      </td>
                      <td class="px-6 py-4">
                          Accessories
                      </td>
                      <td class="px-6 py-4">
                        <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                          <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                        Отклонен
                      </span>
                      </td>
    
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                         Кабинет начальника
                      </th>
                      <td class="px-6 py-4">
                          18.05.2005
                      </td>
                      <td class="px-6 py-4">
                          Вася Пупкин
                      </td>
                      <td class="px-6 py-4">
                        <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                          <span class="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                        Ремонт
                      </span>
                      </td>
    
                  </tr>
                  <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
          
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Парадная
                      </th>
                      <td class="px-6 py-4">
                          18.03.2005
                      </td>
                      <td class="px-6 py-4">
                          Варя Варежка
                      </td>
                      <td class="px-6 py-4">
                        <span class="inline-flex items-center bg-green-100text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                          <span class="w-2 h-2 me-1 dark:bg-green-500 rounded-full"></span>
                        Выполнен
                      </span>
                      </td>
    
                  </tr>
              </tbody>
          </table>
      </div>
      
    
        
      <Footer></Footer>    
    </body>

    </html>
     );
}
 
export default Cabinet;