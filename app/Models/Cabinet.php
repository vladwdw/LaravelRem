<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cabinet extends Model
{
    use HasFactory;
    public function inventories(){
        return $this->hasMany(Inventory::class);
    }

    public function repairInventories(){
        return $this->hasMany(repairInventory::class);
    }
    public function repairRequests(){
        return $this->hasMany(RepairRequest::class);
    }
    
}
