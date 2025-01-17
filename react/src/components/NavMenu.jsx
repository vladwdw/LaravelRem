import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const NavMenu = (props) => {
  const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
 };
    return (    

        <header class= "bg-slate-200 border-black dark:bg-gray-900">
               <Helmet>
                <script src="js/flowbite.min.js"></script>
                
               </Helmet>
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" onClick={() => navigate('/')} class="flex items-center space-x-3 rtl:space-x-reverse">
    <img src="/img/remont.png" class="h-11" alt="Remont logo" />
    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Remont</span>
</a>

                <div class="flex justify-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div class="buttons flex flex-row justify-center items-center">
                    {localStorage.getItem("auth")?(
       <button class="flex justify-center items-center w-10 h-10 mr-4 text-gray-800 dark:text-gray-400" onClick={()=>{navigate('/cabinet')}}>
       <svg xmlns="http://www.w3.org/2000/svg" class="" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd"/>
       </svg>
      </button>):null
}
                    <button
      type="button"
      class="dark:text-white hover:text-white border border-blue-700 hover:bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
      onClick={handleLogout}
    >
      {(localStorage.getItem('auth') ? 'Выйти' : 'Войти')}
    </button>

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
                      <a href="#" class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"onClick={() => navigate('/requests')}>Заявки</a>
                    </li>
                  </ul>
                </div>
                </div>
        </header>);
}
 
export default NavMenu;