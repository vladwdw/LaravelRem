<?php

use App\Http\Controllers\RequestsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CabinetController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeController;
use App\Http\Controllers\InventoriesController;
use App\Models\RepairRequest;
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
Route::get('/requests',[RequestsController::class, 'index']);
Route::get('/request/{id}',[RequestsController::class, 'get']);
Route::get('/cabinets',[CabinetController::class, 'index']);
Route::get('/employes/get/{id}',[EmployeController::class,'get']);
Route::get('/inventories',[InventoriesController::class, 'index']);

Route::put('/cabinet/{id}',[CabinetController::class, 'update']);
Route::put('/inventory/{id}',[InventoriesController::class, 'update']);
Route::put('/employee/{id}', [EmployeController::class,'update']);
Route::put('/request/respond/{id}',[RequestsController::class, 'respond']);
Route::put('/request/{id}',[RequestsController::class, 'update']);

Route::delete('/inventory/{id}',[InventoriesController::class, 'delete']);
Route::delete('/employes/delete/{id}',[EmployeController::class,'delete']);
Route::delete('/cabinet/{id}',[CabinetController::class,'delete']);
Route::delete('/request/{id}',[RequestsController::class, 'delete']);

Route::post('/employee/create', [EmployeController::class,'create']);
Route::post('/loginEmploye', [AuthController::class, 'login']);
Route::post('/cabinet', [CabinetController::class,'create']);
Route::post('/inventory',[InventoriesController::class, 'create']);
Route::post('/request',[RequestsController::class, 'create']);


Auth::routes();