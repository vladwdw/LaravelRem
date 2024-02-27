<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepairRequest extends Model
{
    use HasFactory;
    public function cabinet(){
        return $this->hasOne(Cabinet::class);
    }
    public function employe(){
        return $this->hasOne(Employe::class);
    }
    public function employeRecieved(){
        return $this->hasOne(Employe::class);
    }
    public function inventoryRepairs(){
        return $this->hasOne(repairInventory::class);
    }
}
