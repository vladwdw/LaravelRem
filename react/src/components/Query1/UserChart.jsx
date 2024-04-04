import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
const UserChart = () => {
  const [startDate,setStartDate]=useState();
  const [endDate,setEndDate]=useState();
  const [data,setData]=useState();
 const [series, setSeries] = useState([
    {
      name: "Заявки",
      data: [],
    },
 ]);
 const [inputValue, setInputValue] = useState("");

 useEffect(() => {
    const timer = setTimeout(() => {
      setStartDate(inputValue); // Обновляем состояние startDate после задержки
    }, 600); // Задержка в 2 секунды

    // Очищаем таймер при размонтировании компонента или при изменении inputValue
    return () => clearTimeout(timer);
 }, [inputValue]);

 const options = {
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
            borderRadius: 8, // Убираем скругление
            dataLabels: {
                enabled: false, // Убираем значения на столбиках
            },
        },
    },
    colors: ["#00FF7F"], // Зеленый цвет для столбиков
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      followCursor: true,
    },
    xaxis: {
      categories: [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
      ],
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-300'
        }
      },
    },
    yaxis: {
      show: true,
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-300'
        }
      }
    },
    fill: {
      opacity: 1,
    },
 };

 const chartRef = useRef(null); // Ссылка на компонент Chart

 const dataGet = async () => {
    try {
      const employeId = localStorage.getItem('id'); // Получаем ID сотрудника из localStorage
      const response = await axios.get(`http://remont.by/api/employe/history/${employeId}`, {
        params: {
          year: startDate,
        },
      });
      const data = response.data;
      const totalOrdersData = data.map(item => ({
        x: `${startDate}-${item.month}`, // Вычитаем 1 из месяца, чтобы корректно отобразить месяц
        y: item.count,
    }));
      setSeries([
        {
          name: "Заявки",
          data: totalOrdersData,
        },
      ]);
    } catch (error) {
      console.error("Ошибка при обновлении данных", error);
    }
 };

 useEffect(() => {
    if (startDate) {
      dataGet();
    }
 }, [startDate]);

 
 return (
    <div className="max-w-[1200px] w-full   bg-white rounded-lg shadow dark:bg-gray-800">

      <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">Диаграма</h5>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Количество заявок по каждому месяцу
выбранного года</p>
          <div class="mt-4 flex flex-row gap-5">
          <div className="row">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Введите год</label>
              <input
 type="number"
 name="username"
 id="name"
 max="10000"
 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
 placeholder="Введите год"
 onChange={(event) => {
    setInputValue(event.target.value); // Обновляем состояние inputValue при каждом изменении
  }}
/>
          </div>

          </div>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">

        </div>
      </div>
      <div id="labels-chart" className="px-2.5">
        <Chart options={options} series={series}  ref={chartRef} type="bar" height="320px" width="1000px" />
      </div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0">
        <div className="flex justify-between items-center pt-5">


        </div>
      </div>
    </div>
 );
};

export default UserChart;
