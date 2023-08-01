<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

use App\Http\Controllers\CatatanIbuController;
use App\Http\Controllers\CatatanBayiController;

$router->get('/', function () use ($router) {
    return $router->app->version();
});

//birthrecords
$router->get('/posts', 'BirthRecordsController@index'); //ambil seluruh data
$router->post('/posts', 'BirthRecordsController@store'); //post data
$router->get('/posts/{id}', 'BirthRecordsController@show'); //ambil satu data berdasarkan ID
$router->put('/posts/{id}', 'BirthRecordsController@update'); //edit satu data berdasarkan ID
$router->delete('/posts/{id}', 'BirthRecordsController@destroy'); //menghapus satu data berdasarkan ID 

// Endpoint untuk catatan ibu
$router->group(['prefix' => 'catatan-ibu'], function () use ($router) {
    $router->get('/', 'CatatanIbuController@index');
    $router->get('/{id}', 'CatatanIbuController@show');
    $router->post('/', 'CatatanIbuController@store');
    $router->put('/{id}', 'CatatanIbuController@update');
    $router->delete('/{id}', 'CatatanIbuController@destroy');
});

// Endpoint untuk catatan bayi
$router->group(['prefix' => 'catatan-bayi'], function () use ($router) {
    $router->get('/', 'CatatanBayiController@index');
    $router->get('/{id}', 'CatatanBayiController@show');
    $router->post('/', 'CatatanBayiController@store');
    $router->put('/{id}', 'CatatanBayiController@update');
    $router->delete('/{id}', 'CatatanBayiController@destroy');
});
