
const TableItem = ({inventory}) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    {/* Ваш контент */}
                </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {inventory.id}
            </th>
            <td className="px-6 py-4">
                {inventory.name}
            </td>
            <td className="px-6 py-4">
                {inventory.buyDate}
            </td>
            <td className="px-6 py-4">
                {inventory.spisDate}
            </td>
            <td className="px-6 py-4">
                {inventory.cabinet_id}_{inventory.cabinet_name}
            </td>
            <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
        </tr>
    );
}

export default TableItem;