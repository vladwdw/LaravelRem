<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use Illuminate\Http\Request;
use App\Models\RepairRequest;
use App\Models\Inventory;
class RequestsController extends Controller
{
    public function delete($id){
        try{
        $request=RepairRequest::find($id);
        $request->delete();
        return response()->json('Заявка была удалена');
        }
        catch(\Exception $ex){
            return response()->json(['message'=>'Internal server error'],500);
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
    public function update(Request $request,$id){
    
      
        try{
            $repair=RepairRequest::find($id);
            $validatedData=$request->toArray();

            if($repair->status=="На обработке" && $validatedData['recieve_id']==$repair->recieve_id)
            {
             if($validatedData['status']=="Выполнен"){
             $repair->status="Подтверждение";
             $repair->save();
             return response()->json('Статус был изменен');
             }
             elseif ($validatedData['status']=="В ожидании"){
                $repair->status="В ожидании";
                $repair->recieve_id=null;
                $repair->save();
                return response()->json('Статус был изменен');
             }
             else{
                $repair->status=$validatedData['status'];
                $repair->save();
                return response()->json('Статус был изменен');
             }
            }
        }
        catch(\Exception $ex){
            return response()->json(['message'=>'Internal server error',$ex->getMessage()],500);
        }
    }
    public function get($id){
        $request = RepairRequest::with('cabinet', 'employe', 'inventory')->find($id);
        $allData=[];
        $inv_id=$request->inv_id;
        $inventory=Inventory::find($inv_id);
        
        $allData[]=[
            'id'=>$request->id,
            'cabinet_id'=>$request->cabinet->id,
            'cabinet_name'=>$request->cabinet->name,
            'employe_id'=>$request->employe->id,
            'employe_name'=>$request->employe->full_name,
            'employe_received'=>$request->employe->full_name,
            'problemDescription'=>$request->problemDescription,
            'inv_id'=>$request->inv_id,
            'inv_name'=>$inventory ? $inventory->name : null,
            'inventoryName'=>$request->inventoryName,
            'status'=>$request->status
        ];
        return response()->json($allData);
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
    public function create(Request  $request){
        $validatedData = $request->toArray();
        if($validatedData['type']=='inv_id' && $validatedData['inv_id']!=null){
        $req=new RepairRequest();
      
        $req->inv_id=$validatedData['inv_id'];
        $req->employe_id=$validatedData['employe_id'];
        $req->cabinet_id=$validatedData['cabinet_id'];
        $req->recieve_id=null;
        $req->problemDescription=$validatedData['problemDescription'];
        $req->save();
        }
        if($validatedData['type']=='inventory' && $validatedData['inventory']!=null){
            $req=new RepairRequest();
          
            $req->inventoryName=$validatedData['inventory'];
            $req->employe_id=$validatedData['employe_id'];
            $req->cabinet_id=$validatedData['cabinet_id'];
            $req->recieve_id=null;
            $req->problemDescription=$validatedData['problemDescription'];
            $req->save();
            }
        
    }
}
