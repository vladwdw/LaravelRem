import React, { useState } from 'react';
import NavMenu from "../NavMenu";
import Footer from "../UserTable/Footer";
import ErrorNotification from "../ErrorNotification";
import SuccesNotification from "../SuccessNotification";

const BuyOrderPage = () => {
    const [fields, setFields] = useState([{ id: 1, part: '',count:'', price:''}]);

    const handleAddField = () => {
        setFields([...fields, { id: fields.length + 1, part: '', count: '' , price:''}]);
    };

    const handleRemoveField = () => {
        if (fields.length > 1){
        setFields(fields.filter(field => field.id !== fields.length));
        }
    };

    const handleChange = (id, fieldType, event) => {
        const newFields = fields.map(field =>
            field.id === id ? { ...field, [fieldType]: event.target.value } : field
        );
        setFields(newFields);
    };
    const handleSubmit = () => {
        const employe_id = localStorage.getItem('id'); // Replace this with the actual value or state variable
    
        // Include employe_id in the fields object
        const dataToSend = {
            fields: fields,
            employe_id: employe_id,
        };
    
        fetch('http://remont.by/api/buy-order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle error, e.g., show an error message
        });
    };

    return (
        <html className="dark">
            <NavMenu />
            <body className="container max-w-[1920px] mx-auto dark:bg-slate-950">
                <div className="relative p-4 w-full max-w-md max-h-full left-[35%]">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-2 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Формирование закупки</h3>
                        </div>
                        <form className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                {fields.map(field => (
                                    <div key={field.id} className="col-span-3 flex items-center">
                                        <input
                                            type="text"
                                            placeholder="Часть"
                                            value={field.part}
                                            onChange={(event) => handleChange(field.id, 'part', event)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mr-2"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Количество"
                                            value={field.count}
                                            onChange={(event) => handleChange(field.id, 'count', event)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 me-2"
                                        />
                                                                                <input
                                            type="number"
                                            placeholder="Цена"
                                            value={field.price}
                                            onChange={(event) => handleChange(field.id, 'price', event)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                      
                                    </div>
                                ))}
                                
                            </div>
                            <div class="flex flex-row">
                            <button type="button" onClick={handleAddField} className="text-white me-2 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Добавить
                            </button>
                            <button type="button" onClick={handleRemoveField} className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                Удалить
                            </button>
                            </div>
                            <button type="button" class="mt-[120px] text-white bg-gradient-to-r w-full from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={handleSubmit} >Отправить</button>
                            
                        </form>
                        
                    </div>
                </div>
                <Footer />
            </body>
        </html>
    );
};

export default BuyOrderPage;
