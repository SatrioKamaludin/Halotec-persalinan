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
        Schema::create('catatan_ibu', function (Blueprint $table) {
            $table->id();
            $table->string('nama_ibu');
            $table->integer('usia_ibu');
            $table->integer('usia_kehamilan');
            $table->string('nama_ayah')->nullable();
            $table->string('alamat_rumah')->nullable();
            $table->string('nomor_telepon_darurat')->nullable();
            $table->integer('kelahiran_anak_ke')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_ibu');
    }
};
