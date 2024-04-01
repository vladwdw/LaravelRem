<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ZaprosController extends Controller
{
    public function zapros1(Request $request){
        try{
        $validatedData= $request->toArray();
    
        $startDate = $validatedData['startDate'];
$endDate = $validatedData['endDate'];

$orders = DB::table('repair_requests')
    ->select(
        DB::raw("DATE(created) as date"),
        DB::raw("SUM(CASE WHEN status = 'Выполнен' THEN 1 ELSE 0 END) as completed_orders"),
        DB::raw("SUM(CASE WHEN status = 'Отклонен' THEN 1 ELSE 0 END) as rejected_orders")
    )
    ->whereBetween('created', [$startDate, $endDate])
    ->groupBy(DB::raw("DATE(created)"))
    ->orderBy('date')
    ->get();
    return response()->json($orders);
    }
    catch(\Exception $ex){
        return response()->json("Internal Server Error",500);
    }
    }
}
