<?php

namespace App\Http\Controllers;
use App\Models\Employe;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function createDirector()
{
    $employe = new Employe;
    $employe->username = 'vladwdw';
    $employe->password = Hash::make('password');
    $employe->position = 'директор';
    $employe->full_name = 'Гений гений';
    $employe->save();

    return response()->json(['message' => 'Сотрудник создан']);
}
}
