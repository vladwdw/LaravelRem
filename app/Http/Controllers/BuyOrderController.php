<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\BuyOrder;
use App\Models\Employe;
use App\Models\Part;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
class BuyOrderController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->all();
        $employe_id = $data['employe_id']; // Extract employe_id from the request
    
        $buyOrder = new BuyOrder();
        $buyOrder->sender_id = $employe_id; // Assuming sender_id is meant to be employe_id
        $buyOrder->created_at = now(); // Corrected field name for Laravel's timestamp
        $buyOrder->save();
    
        foreach ($data['fields'] as $item) {
            $part = new Part();
            $part->Buy_count = $item['count'];
            $part->count=$item['count'];
            $part->price = $item['price'];
            $part->part = $item['part'];
            $part->order_id = $buyOrder->id;
            $part->save();
        }
    
        return response()->json(['message' => 'Заявка создана успешно'], 200);
    }
    public function get(int $id): JsonResponse
    {
        $buyOrder = BuyOrder::with(['parts', 'sender:id,full_name'])->find($id);
    
        if (!$buyOrder) {
            return response()->json(['message' => 'BuyOrder not found'], 404);
        }
    
        return response()->json($buyOrder);
    }
    public function index(){
        $orders = BuyOrder::paginate();
        $allData=[];
        
        foreach($orders as $order){
    
            $sender=Employe::find($order->sender_id);
            
            $allData[]=[
                'id'=>$order->id,
                'status'=>$order->status,
                'sender_id'=>$order->sender_id,
                'sender_name'=>$sender->full_name
            ];
        }
        return response()->json([
            'data' => $allData,
            'pagination' => [
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
            ],
        ]);
    }
    public function accept(Request $request, int $id){
     
        $partsData = $request->input('parts');
    
        // Update the order status
        $order = BuyOrder::find($id);
        if($order->status!="Выполнен"){
            foreach ($partsData as $partData) {
                $part = Part::find($partData['id']);
                $part->status="Доступен";
                $part->count=$partData['count'];
                $part->save();
            }
        }
        if ($order) {
            $order->status = "Выполнен";
            $order->save();
        }
    

        return response()->json(['message' => 'Order and parts status and quantity updated successfully']);
    }
    
    public function aprove(Request $request, int $id){
     
        $partsData = $request->input('parts');
    
        // Update the order status
        $order = BuyOrder::find($id);
        if($order->status!="Выполнен"){
            foreach ($partsData as $partData) {
                $part = Part::find($partData['id']);
                $part->delete();
            }
        }
        if ($order) {
            $order->delete();
        }
    

        return response()->json(['message' => 'Order and parts status and quantity updated successfully']);
    }
}
