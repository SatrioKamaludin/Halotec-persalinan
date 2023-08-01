<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('catatan_bayi', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_ibu');
            $table->foreign('id_ibu')->references('id')->on('catatan_ibu')->onDelete('cascade');
            $table->string('gender_bayi');
            $table->decimal('panjang_bayi', 5, 2);
            $table->decimal('berat_badan_bayi', 5, 2);
            $table->dateTime('tgl_jam_persalinan');
            $table->string('proses_partus');
            $table->string('kondisi_kelahiran');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_bayi');
    }
};
