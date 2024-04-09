import { useState } from "react";
import axios from "axios";

const Excel = () => {
    const [date, setDate] = useState(""); // Инициализируем состояние даты пустой строкой

    const getDocument = async () => {
        try {
            // Передаем дату как параметр запроса
            const response = await axios.get('http://remont.by/api/document/excel', {
                responseType: 'blob', // Указываем, что ожидаемый ответ - Blob
                params: {
                    date: encodeURIComponent(date) // Кодируем дату для безопасной передачи в URL
                }
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `repair_requests_${date}.xlsx`);
        
            // Добавление ссылки на страницу
            document.body.appendChild(link);
        
            // Начало скачивания
            link.click();
        
            // Очистка и удаление ссылки
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Ошибка при обновлении данных", error);
        }
    };

    return (
        <div className="max-w-[540px] w-full bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0">
                <div className="flex justify-between items-center pt-5">
                    <div className="row">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Дата</label>
                        <input type="date" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="date" onChange={(event) => {setDate(event.target.value)}} />
                    </div>
                    <button
                        onClick={getDocument}
                        className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border border-gray-500 px-3 mt-4 py-2">
                        Заявки по датам "Excel"
                        <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Excel;
