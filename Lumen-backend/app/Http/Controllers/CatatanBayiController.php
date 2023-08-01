<?php

// CatatanBayiController.php
namespace App\Http\Controllers;

use App\Models\CatatanBayi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CatatanBayiController extends Controller
{
    public function index()
    {
        try {
            $catatanBayis = CatatanBayi::all();
            return response()->json([
                'success' => true,
                'message' => 'List Semua Data Bayi',
                'data' => $catatanBayis
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error, tidak bisa mengambil semua data bayi.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $catatanBayi = CatatanBayi::find($id);

        if ($catatanBayi) {
            return response()->json([
                'success'   => true,
                'message'   => 'Detail',
                'data'      => $catatanBayi
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data Bayi Tidak Ditemukan!',
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_ibu.*' => 'required|exists:catatan_ibu,id',
            'gender_bayi.*' => 'required|string',
            'panjang_bayi.*' => 'required|numeric',
            'berat_badan_bayi.*' => 'required|numeric',
            'tgl_jam_persalinan.*' => 'required|date',
            'proses_partus.*' => 'required|string',
            'kondisi_kelahiran.*' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'data'   => $validator->errors()
            ], 401);
        } else {
            $data = $request->all();
            $result = CatatanBayi::insert($data);

            if ($result) {
                return response()->json([
                    'success' => true,
                    'message' => 'Data Bayi Berhasil Disimpan!',
                ], 201);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data Bayi Gagal Disimpan!',
                ], 400);
            }
        }
    }

    public function update(Request $request, $id)
    {
        $catatanBayi = CatatanBayi::find($id);

        if (!$catatanBayi) {
            return response()->json([
                'success' => false,
                'message' => 'Data Bayi Tidak Ditemukan.',
            ], 404);
        }

        $catatanBayi->update($request->all());
        return response()->json([
            'success' => true,
            'message' => "Data Bayi Berhasil Diupdate!",
        ], 200);
    }

    public function destroy($id)
    {
        $catatanBayi = CatatanBayi::find($id);

        if (!$catatanBayi) {
            return response()->json([
                'success' => false,
                'message' => 'Data Bayi Tidak Ditemukan.',
            ], 404);
        }

        // Delete the bayi record
        CatatanBayi::destroy($id);

        return response()->json([
            'success' => true,
            'message' => "Data Bayi Berhasil Dihapus!",
        ], 200);
    }
}
