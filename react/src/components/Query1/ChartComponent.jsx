import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import SuccesNotification from "../SuccessNotification";
import ErrorNotification from "../ErrorNotification";
const ChartComponent = () => {
  const [startDate,setStartDate]=useState();
  const [endDate,setEndDate]=useState();
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [data,setData]=useState();
  const [series, setSeries] = useState([
    {
      name: "Выполнено",
      data: [],
    },
    {
      name: "Отклонено",
      data: [],
    },
 ]);
 const [options, setOptions] = useState({
  colors: ["#00FF7F", "#DC143C"],
  chart: {
    type: "bar",
    height: "320px",
    fontFamily: "Inter, sans-serif",
    toolbar: {
      show: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "70%",
      borderRadiusApplication: "end",
      borderRadius: 8,
    },
  },
  tooltip: {
    enabled: true,
    shared: true, // Показывать общую подсказку для всех серий
    intersect: false, // Подсказка будет отображаться при наведении на любую часть сектора, а не только при пересечении с ним
    followCursor: true, // Подсказка будет следовать за курсором мыши
    x: {
       show: true,
       format: 'dd MMM', // Формат даты для отображения в подсказке
    },
    y: {
       formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
         // Форматирование значений подсказки
         return value;
       }
    }
   },
  states: {
    hover: {
      filter: {
        type: "darken",
        value: 1,
      },
    },
  },
  stroke: {
    show: true,
    width: 0,
    colors: ["transparent"],
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 4,
      right: 6,
      top: -14
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: true,
  },
  xaxis: {
    type: 'datetime', // Используйте тип 'datetime' для оси X
    labels: {
      format: 'dd MMM', 
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-300'
      }  
    },
  
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    labels:{
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-300'
      }  
    }
  },
  fill: {
    opacity: 1,
  },

 });
 const showSuccess = (message) => {
  setNotification({ message, type: 'success' });
};
const clearNotification = () =>{
  setNotification({ message: '', type: '' });
}
const showError = (message) => {
  setNotification({ message, type: 'error' });
};
 const chartRef = useRef(null); // Ссылка на компонент Chart
 const dataGet = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.get(`http://remont.by/api/zapros1`, {
      params: {
        startDate,
        endDate,
      },
    });
    const data = response.data;
    const completedOrdersData = data.map(item => ({
      x: new Date(item.date), // Преобразуем дату в объект Date
      y: parseInt(item.completed_orders),
    }));
    const rejectedOrdersData = data.map(item => ({
      x: new Date(item.date), // Преобразуем дату в объект Date
      y: parseInt(item.rejected_orders),
    }));
    setSeries([
      {
        name: "Выполнено",
        data: completedOrdersData,
      },
      {
        name: "Отклонено",
        data: rejectedOrdersData,
      },
    ]);
    showSuccess("График был построен успешно");
  } catch (error) {
    showError("Ошибка, проверьте введенные даты!");
    console.error("Ошибка при обновлении данных", error);
  }
};

 
 return (
    <div className="max-w-[540px] w-full mx-auto bg-white rounded-lg shadow dark:bg-gray-800">

      <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">Диаграма</h5>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Построить диаграмму: количество выполненных и не выполненных
заказов по датам за выбранный промежуток времени</p>
          <div class="mt-4 flex flex-row gap-5">
          <div className="row">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Начальная дата</label>
              <input type="date" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="date" onChange={(event)=>{setStartDate(event.target.value)}} />
          </div>
          <div className="row">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Конечная дата</label>
              <input type="date" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="date" onChange={(event)=>{setEndDate(event.target.value)}} />
          </div>
          </div>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">

        </div>
      </div>
      <div id="labels-chart" className="px-2.5">
        <Chart options={options} series={series}  ref={chartRef} type="bar" height="300px" width="500px" />
      </div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0">
        <div className="flex justify-between items-center pt-5">

          <button
            href="#"
            onClick={dataGet}
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700  dark:focus:ring-gray-700 dark:border border-gray-500 px-3 py-2">
            Построить
            <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
          </button>
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
 );
};

export default ChartComponent;
