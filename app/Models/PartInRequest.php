<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PartInRequest extends Model
{
    use HasFactory;
    protected $fillable = ['request_id', 'part_id', 'count'];
    public function repairRequest()
{
    return $this->belongsTo(RepairRequest::class, 'request_id'); // Specify the foreign key column
}
public function part()
{
    return $this->belongsTo(Part::class, 'part_id');
}
}
