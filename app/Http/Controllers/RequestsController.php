<?php

namespace App\Http\Controllers;

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
    public function index(){
        $requests = RepairRequest::with('cabinet','employe','inventory')->paginate();
        $allData=[];

        foreach($requests as $request){
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
            'inv_name'=>$inventory->name,
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
}
