<?php

namespace App\Http\Controllers;
use App\Models\Cabinet;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class CabinetController extends Controller
{
    public function index()
    {
        $cabinets = Cabinet::paginate(); // Используйте Eloquent ORM для получения всех записей
        return response()->json($cabinets); // Возвращаем данные в формате JSON
    }
    function getCabinetsWithInventoryCount() {
        $cabinets = DB::table('cabinets')
            ->leftJoin('inventories', 'cabinets.id', '=', 'inventories.cabinet_id')
            ->select('cabinets.id', 'cabinets.name', DB::raw('COUNT(inventories.id) as inventory_count'), DB::raw('GROUP_CONCAT(inventories.name) as inventory_names'))
            ->where('inventories.status','Доступен')
            ->groupBy('cabinets.id', 'cabinets.name')
            ->get();
    
        return $cabinets->toJson();
    }
    public function delete($id){
        $cabinet=Cabinet::find($id);
        $cabinet->delete();
        return response()->json('Кабинет был удален');
    }
    public function create(Request $request){
        try{
            $validatedData = $request->toArray();
        }
        catch(\Exception $e){
                return response()->json(['message' => 'Не прошла валидация'], 422);
        }
try
{
            $cabinet = new Cabinet;
            $cabinet->name = $validatedData['name'];
            $cabinet->save();

            return response()->json(['message' => 'Cabinet created successfully', 'cabinet' => $validatedData]);
}
        catch(\Exception $e){
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function update(Request $request,$id){
        
        $cabinet=Cabinet::find($id);
        $validatedData=$request->toArray();
        $cabinet->name=$validatedData['name'];
        $cabinet->save();
        return response()->json(['message' => 'Cabinet updated successfully', 'employee' => $request->toArray()]);
   
    }
}
