<?php

namespace App\Models;

use App\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
class Employe extends Authenticatable
{
    use HasApiTokens, Notifiable;
    protected $fillable = [
        'username',
        'password',
        'position',
    ];
    protected $hidden = [
        'password',
    ];
}
