<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

/**
 * s商品
 */
//商品展示
Route::get('/goodsList','Index\GoodsController@goodsList');
//商品展示
Route::post('/detail','Index\GoodsController@goodsList');

//收藏
Route::get('/shoucang','Index\GoodsController@shoucang');