<?php

namespace App\Http\Controllers;
use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoriesController extends Controller
{
    public function index(){
        // Загрузка инвентаря с данными кабинета
        $inventories = Inventory::with('cabinet')->paginate();
        
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
            'pagination' => [
                'current_page' => $inventories->currentPage(),
                'last_page' => $inventories->lastPage(),
                'per_page' => $inventories->perPage(),
                'total' => $inventories->total(),
            ],
        ]);
    }
    public function update(Request $request, $id){
        try {
            $inventory = Inventory::find($id);
    
            if (!$inventory) {
                return response()->json(['message' => 'Inventory not found'], 404);
            }
    
            $validatedData = $request->toArray();
            $inventory->name= $validatedData['name'];
            $inventory->cabinet_id=$validatedData['cabinet_id'];
            $inventory->buyDate=$validatedData['buyDate'];
            $inventory->spisDate=$validatedData['spisDate'];
    
            // Сохранение изменений
            $inventory->save();
    
    
    
            return response()->json(['message' => 'Inventory updated successfully', 'inventory' => $request->toArray()]);
        } catch (\Exception $e) {
           
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function create(Request $request){
        try {
            $inventory = new Inventory();
 
    
            $validatedData = $request->toArray();
            $inventory->name= $validatedData['name'];
            $inventory->cabinet_id=$validatedData['cabinet_id'];
            $inventory->buyDate=$validatedData['buyDate'];
            $inventory->spisDate=$validatedData['spisDate'];
    
            // Сохранение изменений
            $inventory->save();
    
    
    
            return response()->json(['message' => 'Inventory created successfully', 'inventory' => $request->toArray()]);
        } catch (\Exception $e) {
           
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
}