<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CabinetController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\EmployeController;
use App\Http\Controllers\InventoriesController;
use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/employes',[EmployeController::class, 'index']);
Route::get('/cabinets',[CabinetController::class, 'index']);
Route::get('/inventories',[InventoriesController::class, 'index']);
Route::delete('/employes/delete/{id}',[EmployeController::class,'delete']);
Route::get('/employes/get/{id}',[EmployeController::class,'get']);
Route::put('/employee/{id}', [EmployeController::class,'update']);
Route::post('/employee/create', [EmployeController::class,'create']);
Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    
    return response()->json([
        'data' => 'hh',
    ]);
});
Route::delete('/cabinet/{id}',[CabinetController::class,'delete']);

Auth::routes();