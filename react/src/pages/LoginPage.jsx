import { Navbar } from "flowbite-react";
import NavMenu from "../components/NavMenu";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../components/ErrorNotification";
import SuccesNotification from "../components/SuccessNotification";

const LoginPage = () => {
    const navigate = useNavigate(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [errorMessage, setErrorMessage] = useState('');
 
    const showSuccess = (message) => {
        setNotification({ message, type: 'success' });
      };
      const clearNotification = () =>{
        setNotification({ message: '', type: '' });
      }
      const showError = (message) => {
        setNotification({ message, type: 'error' });
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://remont.by/api/loginEmploye', {username, password});
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('position', response.data.position);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            console.log(localStorage.getItem('position'));
            console.log(localStorage.getItem('token'));
            localStorage.setItem('auth',true);
            localStorage.setItem('full_name',response.data.full_name)
            localStorage.setItem('id',response.data.id)
            showSuccess("Авторизация произошла успешно");
            // Вызываем метод login из AuthContext с полученным токеном
            navigate('/cabinet');

            // Перенаправление пользователя на главную страницу или другой маршрут
        } catch (error) {
            setErrorMessage('Неверные учетные данные');
            showError("Неверные учетные данные");
        }
    };

    
    return ( 
    <html lang="en" class="dark">
<NavMenu></NavMenu>
    <body class="dark:bg-slate-950">
        
        <section class=" dark:bg-slate-950">
            
            <div class="flex flex-col items-center justify-center px-6 py-5 mx-auto h-screen md:lg:py-0">
                
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-8 h-8 mr-2" src="/img/remont.png" alt="logo"/>
                Remont
                </a>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                           Авторизируйтесь в ваш аккаунт
                        </h1>
                        <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Логин</label>
                                <input type="text" value={username} name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username"  onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                                <input type="password" value={password} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                    </div>
                                    <div class="ml-3 text-sm">
                                      <label for="remember" class="text-gray-500 dark:text-gray-300">Запомнить меня</label>
                                    </div>
                                </div>
                                <a href="#" class="dark:text-white text-sm font-medium text-primary-600 ">Забыли пароль?</a>
                            </div>
                            
                            <button type="submit" class="text-white bg-gradient-to-r w-full from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Войти</button>
                        </form>
    
                    </div>
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
            </div>
          </section>
    </body>
    </html> 
    );
}
 
export default LoginPage;