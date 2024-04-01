<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Response;
use App\Models\Employe;
use App\Models\Part;
use Illuminate\Http\Request;
use App\Models\RepairRequest;
use App\Models\Inventory;
use App\Models\PartInRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
class RequestsController extends Controller
{
    public function delete($id){
        try{
        $request=RepairRequest::find($id);
        $imagePath = public_path()."/uploads/repair_requests/".$request->image; // Предполагается, что поле image содержит путь к изображению
        
        // Проверяем, существует ли файл
        if(File::exists($imagePath)) {
            // Удаляем файл
            File::delete($imagePath);
        }
        $request->delete();
        return response()->json('Заявка была удалена');
        }
        catch(\Exception $ex){
            return response()->json(['message'=>'Internal server error'],500);
        }
        

    }
    public function accept($id){
        try{
        $request=RepairRequest::find($id);
        if($request->status=="Подтверждение"){
        $request->status="Выполнен";
        $request->doned=now();
        $request->save();

        return response()->json("Заявка подтверждена");
        }
        }
        catch(\Exception $ex){
            return response()->json(['message'=>'Internal server error',$ex->getMessage()],500);
        }
    }
    public function aprove($id){
        try{
            $request=RepairRequest::find($id);
            if($request->status=="Подтверждение"){
            $request->status="В ожидании";
            $request->recieve_id=null;
            $request->save();
            }
            return response()->json("Заявка отклонена");
            }
            catch(\Exception $ex){
                return response()->json(['message'=>'Internal server error',$ex->getMessage()],500);
            }
    }
    public function respond(Request $req,$id){
        $validatedData=$req->toArray();
        try{

            $request=RepairRequest::find($id);
            if($request->status=="В ожидании" && $request->recieve_id==null)
            {
            $request->status="На обработке";
            $request->recieve_id=$validatedData['id'];
            $request->save();
            return response()->json('Статус был изменен');
            }


            }
            catch(\Exception $ex){
                return response()->json(['message'=>'Internal server error',$ex->getMessage()],500);
            }
    }
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();
        
            $repair = RepairRequest::find($id);
            $validatedData = $request->toArray();
        
            if ($repair->status == "На обработке" && $validatedData['recieve_id'] == $repair->recieve_id) {
                if ($validatedData['status'] == "Выполнен") {
                    $fields = $request->input('fields');
            
    
                    if (!empty($fields)) {
                        foreach ($fields as $field) {
            
                            if (isset($field['part']) && !empty($field['part'])) {
                                $partName = strtolower($field['part']);
                                $count = (int)$field['count'];
                                $countToSave = $count;
                                $parts = Part::whereRaw('LOWER(part) = ? AND status != ?', [$partName, 'Закончился'])->get();
            
                                foreach ($parts as $part) {
                                    if ($part->count >= $count) {
                                        $part->count -= $count;
                                        $count = 0;
                                    } else {
                                        $count -= $part->count;
                                        $part->count = 0;
                                    }
            
                                    if ($part->count == 0) {
                                        $part->status = 'Закончился';
                                    }
            
                                    $part->save();
                                    
                                    $partNameFromParts = $part->part;
                                    
                                    if (!PartInRequest::where('request_id', $id)->whereHas('part', function ($query) use ($partNameFromParts) {
                                        $query->where('part', $partNameFromParts);
                                    })->exists()) {
                                        // Если записи нет, создаем новую
                                        $pInR = new PartInRequest();
                                        $pInR->request_id = $id;
                                        $pInR->part_id = $part->id;
                                        $pInR->count = $countToSave;
                                        $pInR->save();
                                    }
                            
                                    if ($count == 0) {
                                        break;
                                    }
                                }
            
                  
                                if ($count > 0) {
                                    throw new \Exception('Недостаточное количество товара');
                                }
                            } else {
                                continue;
                            }
                        }
                    }
                    $repair->doned=now();
   
                    $repair->status = "Подтверждение";
                    $repair->save();
            
                    DB::commit();
                    return response()->json('Статус был изменен');
                } elseif ($validatedData['status'] == "В ожидании") {
                    $repair->status = "В ожидании";
                    $repair->recieve_id = null;
                    $repair->save();
            
                    DB::commit();
                    return response()->json('Статус был изменен');
                } 
                elseif ($validatedData['status']=="Отклонен"){
                    $repair->status="Отклонен";
                    $repair->save();
                    DB::commit();
                    return response()->json('Статус был изменен');
                }
                else {
                    DB::rollBack();
                    throw new \Exception("Произошла ошибка");
                }
            } else {
                DB::rollBack();
                throw new \Exception("Произошла ошибка");
            }
        } catch (\Exception $ex) {
            DB::rollBack();
            return response()->json(['message' => 'Ошибка: ' . $ex->getMessage()], 500);
        }
    }
    
    public function get($id)
    {
        // Получаем данные заявки на ремонт
        $request = DB::table('repair_requests')->where('id', $id)->first();
    
        // Проверяем, найдена ли заявка
        if (!$request) {
            return response()->json(['error' => 'Заявка не найдена'], 404);
        }
    
        // Получаем данные кабинета, сотрудника и инвентаря
        $cabinet = DB::table('cabinets')->where('id', $request->cabinet_id)->first();
        $employe = DB::table('employes')->where('id', $request->employe_id)->first();
        $inventory = DB::table('inventories')->where('id', $request->inv_id)->first();
        $image=$request->image;
        // Получаем данные о компонентах заявки
        $parts = DB::table('part_in_requests')
            ->join('parts', 'part_in_requests.part_id', '=', 'parts.id')
            ->where('part_in_requests.request_id', $id)
            ->select('parts.id as part_id', 'parts.part as part_name', 'part_in_requests.count')
            ->get();
    
        // Собираем все данные в массив
        $allData = [
            'id' => $request->id,
            'cabinet_id' => $cabinet ? $cabinet->id : null,
            'cabinet_name' => $cabinet ? $cabinet->name : null,
            'employe_id' => $employe ? $employe->id : null,
            'employe_name' => $employe ? $employe->full_name : null,
            'employe_received' => $employe ? $employe->full_name : null,
            'problemDescription' => $request->problemDescription,
            'inv_id' => $inventory ? $inventory->id : null,
            'image'=> $request->image,
            'inv_name' => $inventory ? $inventory->name : null,
            'inventoryName' => $request->inventoryName,
            'status' => $request->status,
            'parts' => $parts,
        ];
    
        return response()->json($allData);
    }
    public function image($id){
     
            $request = DB::table('repair_requests')->where('id', $id)->first();
            if (!$request) {
                abort(404);
            }
        
            $image = $request->image;
        return response($image)->header('Content-Type', 'image/png');

        
    }
    public function index(){
        $requests = RepairRequest::with('cabinet','employe','inventory')->paginate();
        $allData=[];
        
        foreach($requests as $request){
            $inv_id = $request->inv_id;
            $inventory = null;
            $id = $request->recieve_id;
            $receive = optional(Employe::find($id));
            if($inv_id != null) {
                $inventory = Inventory::find($inv_id);
            }
            
            $allData[]=[
                'id'=>$request->id,
                'cabinet_id'=>$request->cabinet->id,
                'cabinet_name'=>$request->cabinet->name,
                'employe_id'=>$request->employe->id,
                'employe_name'=>$request->employe->full_name,
                'employe_received'=> optional($receive)->full_name,
                'problemDescription'=>$request->problemDescription,
                'inv_id' => $inv_id,
                'inv_name'=>$inventory ? $inventory->name : null,
                'inventory'=>$request->inventoryName,
                'status'=>$request->status
            ];
        }
        return response()->json([
            'data' => $allData,
            'pagination' => [
                'current_page' => $requests->currentPage(),
                'last_page' => $requests->lastPage(),
                'per_page' => $requests->perPage(),
                'total' => $requests->total(),
            ],
        ]);
    }
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'type' => 'required|string',
            'inventory' => 'nullable|string',
            'employe_id' => 'required|integer',
            'cabinet_id' => 'required|integer',
            'problemDescription' => 'required|string',
            'image' => 'nullable|image',
        ]);
    
        if ($validatedData['type'] == 'inv_id' && $validatedData['inv_id'] != null) {
            $req = new RepairRequest();
    
            $req->inv_id = $validatedData['inv_id'];
            $req->employe_id = $validatedData['employe_id'];
            $req->cabinet_id = $validatedData['cabinet_id'];
            $req->created=now();
            $req->recieve_id = null;
            $req->problemDescription = $validatedData['problemDescription'];
    
            // Обработка изображения
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('uploads/repair_requests'), $filename);
                $req->image = $filename;
            }
    
            $req->save();
        }
    
        if ($validatedData['type'] == 'inventory' && $validatedData['inventory'] != null) {
            $req = new RepairRequest();
    
            $req->inventoryName = $validatedData['inventory'];
            $req->employe_id = $validatedData['employe_id'];
            $req->cabinet_id = $validatedData['cabinet_id'];
            $req->recieve_id = null;
            $req->created=now();
            $req->problemDescription = $validatedData['problemDescription'];
    
            // Обработка изображения
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('uploads/repair_requests'), $filename);
                $req->image = $filename;
            }
    
            $req->save();
        }
    }
}
