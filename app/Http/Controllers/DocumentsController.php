<?php

namespace App\Http\Controllers;

use App\Models\BuyOrder;
use App\Models\Employe;
use Illuminate\Http\Request;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\TemplateProcessor;

class DocumentsController extends Controller
{
    public function ReceiptInvoice($id){
        $phpWord = new PhpWord();
        $order = BuyOrder::with("parts")->find($id);
        $user=Employe::find($order->sender_id);
        $templateProcessor= new TemplateProcessor('templates\nakladnaya.docx');
        $templateProcessor->setValue('number',$id);
        $newFileName = 'Накладная_'.$id;
        $section=$phpWord->addSection();
        $section->addTextBreak(1);
        $styleCell =
        array(
        'borderColor' =>'000000',
        'borderSize' => 3,
        'valign' => 'center',
        );
        $styleText = array(
            'name' => 'Times New Roman',
            'valign'=>'center',
            'size' => 10,
        );
    
        $table = $section->addTable($styleCell);
        $i=0;
        $total=0;
        foreach ($order->parts as $part) {
            $table->addRow(200);
            $table->addCell(1200, $styleCell)->addText($i+1,$styleText);
            $table->addCell(3300, $styleCell)->addText($part->part,$styleText);
            $table->addCell(2000, $styleCell)->addText("шт.",$styleText);
            $table->addCell(1280, $styleCell)->addText($part->Buy_count,$styleText);
            $table->addCell(1560, $styleCell)->addText($part->price,$styleText);
            $table->addCell(1200, $styleCell)->addText(($part->price*$part->Buy_count),$styleText);
            $total+=($part->price*$part->Buy_count);
            $i++;
        }
        $templateProcessor->setComplexBlock('table',$table);
        $templateProcessor->setValue('total',$total);
        $templateProcessor->setValue('sender',$user->full_name);
        $templateProcessor->setValue('day', date('d', strtotime($order->accepted)) );
        $templateProcessor->setValue('year', date('y', strtotime($order->accepted)) );
        $templateProcessor->setValue('month', date('m', strtotime($order->accepted)) );
        $templateProcessor->saveAs($newFileName.'.docx');
        $headers = ['Content-Type' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        return response()->download(public_path($newFileName.'.docx'), $newFileName.'.docx', $headers)->deleteFileAfterSend(true);
    }
}
