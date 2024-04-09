<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepairRequest extends Model
{
    use HasFactory;
    public function employe()
    {
        return $this->belongsTo(Employe::class)->withDefault([
            'full_name' => 'Не указано',
        ]);
    }
    public function partsInRequest()
    {
        return $this->hasMany(PartInRequest::class, 'part_id'); // Specify the foreign key column
    }
    public function employeRecieved()
    {
        return $this->belongsTo(Employe::class)->withDefault([
            'full_name' => 'Не указано',
        ]);
    }
    public function getPartsNames()
    {
        // Получаем все комплектующие, связанные с текущей заявкой на ремонт
        $parts = $this->partsInRequest()->with('part')->get();
    
        // Создаем массив для хранения информации о комплектующих
        $partsInfo = [];
        $total=0;
        // Проходим по каждому комплектующему и добавляем его информацию в массив
        foreach ($parts as $part) {
            // Добавляем в массив всю информацию о комплектующем
            $partsInfo[] = [
          
                'name' => $part->part->part, // Предполагается, что 'part' - это наименование комплектующего
                'count' => $part->count, 
                'price'=>$part->part->price,
                'sum'=>$part->count * $part->part->price
                
            ];

            $total+=$part->part->price*$part->count;
        }
        $data[]=[
            'parts:'=>$partsInfo,
            'total: '=>$total
        ];
    
        return $data;
    }
    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }
    public function cabinet()
{
    return $this->belongsTo(Cabinet::class)->withDefault([
        'name' => 'Не указано',
    ]);
}
}
