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
        Schema::create('birthrecords', function (Blueprint $table) {
            $table->id();
            $table->string('nama_ibu');
            $table->integer('usia_ibu');
            $table->integer('usia_kehamilan');
            $table->string('gender_bayi');
            $table->decimal('panjang_bayi', 5, 2);
            $table->decimal('berat_badan_bayi', 5, 2);
            $table->dateTime('tgl_jam_persalinan');
            $table->string('proses_partus');
            $table->string('kondisi_kelahiran');
            $table->integer('kelahiran_anak_ke')->nullable();
            $table->string('nama_ayah')->nullable();
            $table->string('alamat_rumah')->nullable();
            $table->string('nomor_telepon_darurat')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('birthrecords');
    }
};
