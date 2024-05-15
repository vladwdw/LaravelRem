<?php

namespace App\Http\Controllers;
use App\Models\Inventory;
use App\Models\SpisInv;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class InventoriesController extends Controller
{
    public function sort() {
        // Подзапрос для подсчета количества ремонтов для каждого элемента инвентаря
        $subQuery = DB::table('repair_requests')
            ->select('inv_id', DB::raw('COUNT(*) as repairs_count'))
            ->where('status', 'Выполнен')
            ->groupBy('inv_id');
    
        // Основной запрос, который соединяет инвентарь с подзапросом по количеству ремонтов
        $inventories = DB::table('inventories')
        ->leftJoinSub($subQuery, 'repairs', function ($join) {
            $join->on('inventories.id', '=', 'repairs.inv_id');
        })
        ->leftJoin('cabinets', 'inventories.cabinet_id', '=', 'cabinets.id') // Добавляем соединение с таблицей cabinets
        ->select('inventories.*', 'repairs.repairs_count', 'cabinets.name as cabinet_name') // Указываем, что хотим получить имя кабинета
        ->orderBy('repairs.repairs_count', 'desc')
        ->where('status','Доступен')
        ->paginate();
    
        // Преобразование данных для пагинации
        $pagination = [
            'current_page' => $inventories->currentPage(),
            'last_page' => $inventories->lastPage(),
            'per_page' => $inventories->perPage(),
            'total' => $inventories->total(),
        ];
    
        // Преобразование данных инвентаря для вывода с использованием foreach
        $inventoriesData = [];
        foreach ($inventories as $inventory) {
            $inventoriesData[] = [
                'id' => $inventory->id,
                'cabinet_id' => $inventory->cabinet_id,
                'name' => $inventory->name,
                'cabinet_name' =>  $inventory->cabinet_name,
                'buyDate' => $inventory->buyDate,
                'spisDate' => $inventory->spisDate,
                'repairs_count' => $inventory->repairs_count,
            ];
        }
    
        return response()->json([
            'data' => $inventoriesData,
            'pagination' => $pagination,
        ]);
    }
    function getHistory($inventoryId) {
        $inv=Inventory::find($inventoryId);
        $inv_name=$inv->name;
        $repairHistory = DB::table('repair_requests as rr')
        ->join('inventories as i', 'rr.inv_id', '=', 'i.id')
        ->join('employes as e1', 'rr.employe_id', '=', 'e1.id')
        ->join('employes as e2', 'rr.recieve_id', '=', 'e2.id')
        ->select(
            'rr.created as created_date',
            'rr.doned as doned_date',
            'rr.problemDescription as problemDescription',
            'i.name as inventory_name',
            'e1.full_name as sender',
            'e2.full_name as receiver'
        )
        ->where('rr.inv_id', $inventoryId)
        ->where('rr.status','Выполнен')
        ->orderBy('rr.created', 'desc')
        ->get();
    
        return response()->json([
            'data'=>$repairHistory,
            'inv_name'=>$inv_name,
        ]);
    }
    

public function index(){
    $inventories = Inventory::with('cabinet')->where('status','Доступен')->paginate();
    $inventoriesWithCabinetNames = [];

    foreach ($inventories as $inventory) {
        $inventoriesWithCabinetNames[] = [
            'id' => $inventory->id,
            'cabinet_id'=>$inventory->cabinet->id,
            'name' => $inventory->name,
            'cabinet_name' => $inventory->cabinet ? $inventory->cabinet->name : null,
            'buyDate'=> $inventory->buyDate,
            'spisDate'=>$inventory->spisDate // Исправлено на правильное название поля
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
    public function spis(Request $request,$id){
        try {
            $validatedData=$request->toArray();
            $inventory = Inventory::find($id);
    
            if (!$inventory) {
                return response()->json(['message' => 'Inventory not found'], 404);
            }
    
            $inventory->spisDate=now();
            $inventory->status="Списан";
            $inventory->save();
            $spis_inv=new SpisInv();
            $spis_inv->inv_id=$inventory->id;
            $spis_inv->reason=$validatedData['reason'];
            $spis_inv->save();
    
    
            return response()->json(['message' => 'Inventory updated successfully', 'inventory' => $request->toArray()]);
        } catch (\Exception $e) {
           
            return response()->json(['message' => 'Internal server error'], 500);
        }
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
            if($validatedData['spisDate']>$validatedData['buyDate'] && $validatedData['spisDate']>=now()){
            $inventory->buyDate=$validatedData['buyDate'];
            $inventory->spisDate=$validatedData['spisDate'];
    
            // Сохранение изменений
            $inventory->save();
            }
            else{
                return response()->json(['message' => 'Internal server error'], 500);
            }
    
    
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
    public function delete($id){
        try{
        $inventory=Inventory::find($id);
        $inventory->delete();
        return response()->json('Инвентарь был удален');
        }
        catch(\Exception $e){
        return response()->json(['message'=>'Internal server error'],500);
        }
    }
    
}