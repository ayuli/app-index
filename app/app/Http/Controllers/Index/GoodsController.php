<?php
namespace App\Http\Controllers\Index;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\GoodsModel;
class GoodsController extends Controller {
    /**
     * 展示商品列表 接口
     */
    public function goodsList(Request $request)
    {
        $goods_id     = $request->input('goods_id');
        $goods_sn     = $request->input('goods_sn');
        $goods_name   = $request->input('goods_name');
        $goods_number = $request->input('goods_number');
        $goods_price  = $request->input('goods_price');
        $goods_img    = $request->input('goods_img');
        $goods_score  = $request->input('goods_score');
        print_r($_GET);
        $list = GoodsModel::where(['goods_id' => $goods_id])->first();
        print_r($list);
        $data = [
            'goods_sn'     => $goods_sn,
            'goods_name'   => $goods_name,
            'goods_number' => $goods_number,
            'goods_price'  => $goods_price,
            'goods_img'    => $goods_img,
            'goods_score'  => $goods_score,
            'list'  => $list
        ];
        print_r($data);die;
        return $data;
    }

    /**
     * 商品详情 接口
     * @param $goods_id
     */
    public function detail($goods_id)
    {
        $goods = GoodsModel::where(['goods_id'=>$goods_id])->first();
        print_r($goods);
        //商品不存在
        if(!$goods){
            header('Refresh:2;url=/index');
            echo '商品不存在,正在跳转至首页';
            exit;
        }
        $data = [
            'goods' => $goods
        ];
        print_r($data);
        return $data;
    }
}
