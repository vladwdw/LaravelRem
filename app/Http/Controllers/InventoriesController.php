<?php

namespace App\Http\Controllers;
use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoriesController extends Controller
{
    public function index(){
        // Загрузка инвентаря с данными кабинета
        $inventories = Inventory::with('cabinet')->paginate(10);
        
        // Создаем пустой массив для хранения преобразованных данных
        $inventoriesWithCabinetNames = [];

        // Используем foreach для итерации по каждому элементу коллекции
        foreach ($inventories as $inventory) {
            $inventoriesWithCabinetNames[] = [
                'id' => $inventory->id,
                'cabinet_id'=>$inventory->cabinet->id,
                'name' => $inventory->name, // Предполагая, что у вас есть поле 'name' в модели Inventory
                'cabinet_name' => $inventory->cabinet ? $inventory->cabinet->name : null,
                'buyDate'=> $inventory->buyDate,
                'spisDate'=>$inventory->spisDate // Исправил опечатку 'spisDate' на 'buyDate'
            ];
        }

        return response()->json([
            'data' => $inventoriesWithCabinetNames,
            'meta' => [
                'current_page' => $inventories->currentPage(),
                'last_page' => $inventories->lastPage(),
                'total' => $inventories->total(),
                'per_page' => $inventories->perPage(),
            ]
        ]);
    }
}