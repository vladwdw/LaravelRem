const Indicator = ({type}) => {
    return (
        type === "Отклонен" ? (
            <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                Отклонен
            </span>
        ) : type==="В ожидании"?(
            <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-700 dark:text-yellow-300">
                <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                В ожидании
            </span>
        ):type==="На обработке"?(
            <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-orange-700 dark:text-orange-300">
            <span className="w-2 h-2 me-1 bg-orange-500 rounded-full"></span>
            На обработке
        </span>
        ):type==="Выполнен"?(
            <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-700 dark:text-green-300">
            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
            Выполнен
        </span>
        ):type==="Подтверждение"?(
            <span className="inline-flex items-center bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-800 dark:text-pink-400">
            <span className="w-2 h-2 me-1 bg-pink-500 rounded-full"></span>
            Подтверждение
        </span>
        ):null
    );
}

export default Indicator;