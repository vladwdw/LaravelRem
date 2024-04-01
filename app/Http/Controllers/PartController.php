<?php

namespace App\Http\Controllers;

use App\Models\Part;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class PartController extends Controller
{
    public function index(){
        try{
        $parts = DB::table('parts')
        ->selectRaw('LOWER(part) as part, SUM(count) as count')
        ->where('status', '=', 'Доступен') // Corrected the operator and added quotes around the string
        ->groupBy('part')
        ->get();
    return response()->json($parts);
    }
    catch(\Exception $ex){

    }
    }
}
