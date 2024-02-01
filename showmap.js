document.addEventListener('DOMContentLoaded', function() {

//    var w = 1402*2;
//    var h = 1602*2;
    var w = 1314*2;
    var h = 846*2;

    var map = L.map('map', {
        minZoom: 3,
        maxZoom: 6,
        center: [w/2, h/2],
        zoom: 3,
        crs: L.CRS.Simple
    });

    // 画像の寸法

    var southWest = map.unproject([0, h], map.getMaxZoom()-1);
    var northEast = map.unproject([w, 0], map.getMaxZoom()-1);
    var bounds = new L.LatLngBounds(southWest, northEast);

//    L.imageOverlay('http://kou-ryaku.net/test/nanafuse.png', bounds).addTo(map);
    L.imageOverlay('http://kou-ryaku.net/test/arkham.jpg', bounds).addTo(map);
    map.setMaxBounds(bounds);

    var markers = {}; // マーカーを保存するオブジェクト
	var pinData = {}; // ピンを保存するオブジェクト

var pins = [
{ id:'id001', point: new L.Point(w/2,h/2), url: '""', linkText: '中央公園', image: 'http://kou-ryaku.net/test/id01.jpg', html: '<h2>中央公園</h2>あれこれなんだかんだ起こります<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302304003335/"">リンク</a></b>', color: '' },
{ id:'id002', point: new L.Point(w * 0.651,h * 0.66), url: '""', linkText: 'ミスカトニック大学', image: 'https://www.miskatonic-university.org/wp-content/uploads/2020/10/cropped-2011-header-Main-1.png', html: '<h2>ミスカトニック大学</h2>この場所で云々この場所で云々<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g322302000281/"">リンク</a></b>', color: '' },
{ id:'id003', point: new L.Point(w * 0.1,h * 0.1), url: '""', linkText: 'すみっ公園', image: 'http://kou-ryaku.net/test/id03.jpg', html: '<h2>すみっ公園</h2>すみっこかわいい<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g301411001415/"">リンク</a></b>', color: '' },
{ id:'id004', point: new L.Point(w * 0.951,h * 0.96), url: '""', linkText: 'はじっ公園', image: 'http://kou-ryaku.net/test/id04.png', html: '<h2>はじっ公園</h2>下側だとモーダルに隠れちゃうので、モーダル上に表示するとか考えた方がいいかも<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302109001482"">リンク</a></b>', color: '' },
{ id:'id005', point: new L.Point(w * 0.636284063624053,h * 0.166692925240965), url: '""', linkText: 'id005', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id005</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id006', point: new L.Point(w * 0.417459065722876,h * 0.779632444068823), url: '""', linkText: 'id006', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id006</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id007', point: new L.Point(w * 0.110899410274768,h * 0.620054083213054), url: '""', linkText: 'id007', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id007</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id008', point: new L.Point(w * 0.850457135224766,h * 0.729148513368662), url: '""', linkText: 'id008', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id008</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id009', point: new L.Point(w * 0.810319706787996,h * 0.901209518661383), url: '""', linkText: 'id009', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id009</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id010', point: new L.Point(w * 0.242049226456661,h * 0.379424812021766), url: '""', linkText: 'id010', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id010</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id011', point: new L.Point(w * 0.59763085596256,h * 0.0168041131516765), url: '""', linkText: 'id011', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id011</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id012', point: new L.Point(w * 0.814905427598565,h * 0.621472819114346), url: '""', linkText: 'id012', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id012</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id013', point: new L.Point(w * 0.724781385302471,h * 0.678809104781304), url: '""', linkText: 'id013', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id013</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id014', point: new L.Point(w * 0.252854068802846,h * 0.571277957558206), url: '""', linkText: 'id014', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id014</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id015', point: new L.Point(w * 0.0757978852148636,h * 0.00833210335905776), url: '""', linkText: 'id015', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id015</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id016', point: new L.Point(w * 0.680791713568308,h * 0.986932553193514), url: '""', linkText: 'id016', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id016</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id017', point: new L.Point(w * 0.734312761743599,h * 0.38027309257022), url: '""', linkText: 'id017', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id017</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id018', point: new L.Point(w * 0.405581563545668,h * 0.759662338165944), url: '""', linkText: 'id018', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id018</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id019', point: new L.Point(w * 0.804005951924583,h * 0.663232201489559), url: '""', linkText: 'id019', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id019</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id020', point: new L.Point(w * 0.640946731885256,h * 0.968764644570518), url: '""', linkText: 'id020', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id020</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id021', point: new L.Point(w * 0.294247835069423,h * 0.252983335875809), url: '""', linkText: 'id021', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id021</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id022', point: new L.Point(w * 0.46273011847002,h * 0.509172404955224), url: '""', linkText: 'id022', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id022</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id023', point: new L.Point(w * 0.151011310748921,h * 0.622219384995802), url: '""', linkText: 'id023', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id023</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id024', point: new L.Point(w * 0.87540197688704,h * 0.800804095270528), url: '""', linkText: 'id024', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id024</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id025', point: new L.Point(w * 0.482378600281524,h * 0.798715379537247), url: '""', linkText: 'id025', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id025</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id026', point: new L.Point(w * 0.941547684236886,h * 0.450939565676404), url: '""', linkText: 'id026', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id026</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id027', point: new L.Point(w * 0.844209657131879,h * 0.126244861134368), url: '""', linkText: 'id027', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id027</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id028', point: new L.Point(w * 0.21157803487144,h * 0.672582382744657), url: '""', linkText: 'id028', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id028</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id029', point: new L.Point(w * 0.338400023082186,h * 0.698339764690874), url: '""', linkText: 'id029', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id029</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id030', point: new L.Point(w * 0.17252257646784,h * 0.549264100463382), url: '""', linkText: 'id030', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id030</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id031', point: new L.Point(w * 0.78539056361863,h * 0.0282511494026088), url: '""', linkText: 'id031', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id031</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id032', point: new L.Point(w * 0.547058603850468,h * 0.994271868721407), url: '""', linkText: 'id032', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id032</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id033', point: new L.Point(w * 0.494085575103583,h * 0.326318553585136), url: '""', linkText: 'id033', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id033</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id034', point: new L.Point(w * 0.154594064082759,h * 0.172222353294491), url: '""', linkText: 'id034', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id034</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id035', point: new L.Point(w * 0.124095450204285,h * 0.398582882829177), url: '""', linkText: 'id035', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id035</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id036', point: new L.Point(w * 0.786079248093697,h * 0.753767661604601), url: '""', linkText: 'id036', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id036</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id037', point: new L.Point(w * 0.853378921207377,h * 0.811204151273406), url: '""', linkText: 'id037', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id037</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id038', point: new L.Point(w * 0.437215308445871,h * 0.258637828037622), url: '""', linkText: 'id038', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id038</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id039', point: new L.Point(w * 0.893175077859925,h * 0.940514238984602), url: '""', linkText: 'id039', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id039</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id040', point: new L.Point(w * 0.0379304328758202,h * 0.834955771267494), url: '""', linkText: 'id040', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id040</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id041', point: new L.Point(w * 0.273970676492111,h * 0.657918201381645), url: '""', linkText: 'id041', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id041</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id042', point: new L.Point(w * 0.959597411979627,h * 0.628687969927998), url: '""', linkText: 'id042', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id042</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id043', point: new L.Point(w * 0.531650541749092,h * 0.195049784865377), url: '""', linkText: 'id043', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id043</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id044', point: new L.Point(w * 0.478794633445989,h * 0.749224670241842), url: '""', linkText: 'id044', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id044</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id045', point: new L.Point(w * 0.300561236728684,h * 0.66340826603202), url: '""', linkText: 'id045', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id045</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id046', point: new L.Point(w * 0.633908198173663,h * 0.146551442839702), url: '""', linkText: 'id046', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id046</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id047', point: new L.Point(w * 0.0467390616570592,h * 0.433100186563808), url: '""', linkText: 'id047', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id047</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id048', point: new L.Point(w * 0.588107404842452,h * 0.221534700966368), url: '""', linkText: 'id048', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id048</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id049', point: new L.Point(w * 0.00489427378481089,h * 0.229350596455151), url: '""', linkText: 'id049', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id049</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id050', point: new L.Point(w * 0.471894491771733,h * 0.0108828746978111), url: '""', linkText: 'id050', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id050</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id051', point: new L.Point(w * 0.39991413112829,h * 0.208330287668253), url: '""', linkText: 'id051', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id051</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id052', point: new L.Point(w * 0.436353174558679,h * 0.467868216202772), url: '""', linkText: 'id052', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id052</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id053', point: new L.Point(w * 0.898777716174667,h * 0.203887607168159), url: '""', linkText: 'id053', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id053</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id054', point: new L.Point(w * 0.223342441089398,h * 0.922535483603966), url: '""', linkText: 'id054', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id054</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id055', point: new L.Point(w * 0.941127214221762,h * 0.775421742929673), url: '""', linkText: 'id055', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id055</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id056', point: new L.Point(w * 0.323276092063834,h * 0.80264022674019), url: '""', linkText: 'id056', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id056</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id057', point: new L.Point(w * 0.703692139354089,h * 0.0689587573390933), url: '""', linkText: 'id057', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id057</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id058', point: new L.Point(w * 0.819985408289429,h * 0.258834435836711), url: '""', linkText: 'id058', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id058</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id059', point: new L.Point(w * 0.360825870003565,h * 0.966187970856942), url: '""', linkText: 'id059', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id059</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id060', point: new L.Point(w * 0.343807309407177,h * 0.422658292974104), url: '""', linkText: 'id060', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id060</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id061', point: new L.Point(w * 0.484219278681869,h * 0.630603939641115), url: '""', linkText: 'id061', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id061</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id062', point: new L.Point(w * 0.399914369915262,h * 0.669836877867983), url: '""', linkText: 'id062', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id062</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id063', point: new L.Point(w * 0.681161282628304,h * 0.659924647286364), url: '""', linkText: 'id063', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id063</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id064', point: new L.Point(w * 0.393579595360532,h * 0.828477158229885), url: '""', linkText: 'id064', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id064</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id065', point: new L.Point(w * 0.282406043798949,h * 0.36668916462096), url: '""', linkText: 'id065', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id065</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id066', point: new L.Point(w * 0.325241067712673,h * 0.704397091112178), url: '""', linkText: 'id066', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id066</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id067', point: new L.Point(w * 0.265785725440897,h * 0.684573794970646), url: '""', linkText: 'id067', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id067</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id068', point: new L.Point(w * 0.716721509833036,h * 0.364502130612195), url: '""', linkText: 'id068', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id068</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id069', point: new L.Point(w * 0.926312433376752,h * 0.239823772546039), url: '""', linkText: 'id069', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id069</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id070', point: new L.Point(w * 0.399709447965307,h * 0.172488257881504), url: '""', linkText: 'id070', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id070</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id071', point: new L.Point(w * 0.691898504237392,h * 0.841725534889835), url: '""', linkText: 'id071', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id071</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id072', point: new L.Point(w * 0.345692507018087,h * 0.785952630577456), url: '""', linkText: 'id072', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id072</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id073', point: new L.Point(w * 0.128374363794469,h * 0.0928098533062124), url: '""', linkText: 'id073', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id073</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id074', point: new L.Point(w * 0.443146330538946,h * 0.955115035693414), url: '""', linkText: 'id074', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id074</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id075', point: new L.Point(w * 0.598706528488897,h * 0.761176264807441), url: '""', linkText: 'id075', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id075</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id076', point: new L.Point(w * 0.686241720548438,h * 0.593805406585878), url: '""', linkText: 'id076', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id076</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id077', point: new L.Point(w * 0.337845319775983,h * 0.7097838955093), url: '""', linkText: 'id077', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id077</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id078', point: new L.Point(w * 0.486087428746905,h * 0.884284036203445), url: '""', linkText: 'id078', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id078</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id079', point: new L.Point(w * 0.303223595014669,h * 0.459707431235896), url: '""', linkText: 'id079', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id079</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id080', point: new L.Point(w * 0.0601426395168123,h * 0.118094548603681), url: '""', linkText: 'id080', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id080</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id081', point: new L.Point(w * 0.0664636709319648,h * 0.248281360592015), url: '""', linkText: 'id081', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id081</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id082', point: new L.Point(w * 0.110610155642558,h * 0.132881992288489), url: '""', linkText: 'id082', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id082</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id083', point: new L.Point(w * 0.0573404680679699,h * 0.803944983622792), url: '""', linkText: 'id083', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id083</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id084', point: new L.Point(w * 0.2341769868447,h * 0.975453418459205), url: '""', linkText: 'id084', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id084</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id085', point: new L.Point(w * 0.56762519238922,h * 0.0257756199715039), url: '""', linkText: 'id085', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id085</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id086', point: new L.Point(w * 0.882350175920523,h * 0.277944334117254), url: '""', linkText: 'id086', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id086</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id087', point: new L.Point(w * 0.309355098408752,h * 0.558603913356794), url: '""', linkText: 'id087', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id087</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id088', point: new L.Point(w * 0.835910508390078,h * 0.57854099853291), url: '""', linkText: 'id088', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id088</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id089', point: new L.Point(w * 0.816722780247761,h * 0.578811878760504), url: '""', linkText: 'id089', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id089</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id090', point: new L.Point(w * 0.393873709812074,h * 0.830679635381773), url: '""', linkText: 'id090', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id090</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id091', point: new L.Point(w * 0.228660808633856,h * 0.339118471991661), url: '""', linkText: 'id091', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id091</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id092', point: new L.Point(w * 0.0851246635553776,h * 0.833003858230789), url: '""', linkText: 'id092', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id092</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id093', point: new L.Point(w * 0.713949202613982,h * 0.50367857029105), url: '""', linkText: 'id093', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id093</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id094', point: new L.Point(w * 0.171023060262546,h * 0.562748232249329), url: '""', linkText: 'id094', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id094</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id095', point: new L.Point(w * 0.0540476433358754,h * 0.58160346954391), url: '""', linkText: 'id095', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id095</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id096', point: new L.Point(w * 0.454337844414986,h * 0.0218815387874214), url: '""', linkText: 'id096', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id096</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id097', point: new L.Point(w * 0.310740234224262,h * 0.834627489789439), url: '""', linkText: 'id097', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id097</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id098', point: new L.Point(w * 0.581548076528966,h * 0.400676036510833), url: '""', linkText: 'id098', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id098</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id099', point: new L.Point(w * 0.53407992008929,h * 0.59328760570054), url: '""', linkText: 'id099', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id099</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id100', point: new L.Point(w * 0.712670199218433,h * 0.147872146418336), url: '""', linkText: 'id100', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id100</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id101', point: new L.Point(w * 0.647169291656174,h * 0.618975394867059), url: '""', linkText: 'id101', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id101</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id102', point: new L.Point(w * 0.929281584158051,h * 0.00891759298304118), url: '""', linkText: 'id102', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id102</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id103', point: new L.Point(w * 0.842271156904059,h * 0.853004936888426), url: '""', linkText: 'id103', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id103</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id104', point: new L.Point(w * 0.304376652483235,h * 0.680631896046698), url: '""', linkText: 'id104', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id104</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id105', point: new L.Point(w * 0.479987006435039,h * 0.907989330578874), url: '""', linkText: 'id105', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id105</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id106', point: new L.Point(w * 0.117312396813187,h * 0.436965024410133), url: '""', linkText: 'id106', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id106</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' },
{ id:'id107', point: new L.Point(w * 0.870284980363705,h * 0.9940260456622), url: '""', linkText: 'id107', image: 'https://d1hc4zdhstp3wq.cloudfront.net/img/goods/L/302307002478.jpg', html: '<h2>id107</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: '' }];

// 各ピンをマップに配置
pins.forEach(function(pin) {
    var latLng = map.unproject(pin.point, map.getMaxZoom()-1);
    var marker = L.marker(latLng).addTo(map);
//    marker.bindPopup(`<a href="${pin.url}" target="_blank">${pin.linkText}</a>`);
    marker.bindPopup(`${pin.linkText}`);
    marker.on('click', function() {
        openPinModal(pin.image, pin.html); // ピンクリック時にモーダルを開く
    });
    markers[pin.id] = marker;
    pinData[pin.id] = { image: pin.image, html: pin.html }; // ピンのデータを保存
});



// モーダルを開く
function openPinModal(imageSrc, htmlContent) {
    document.getElementById('pin-modal-image').src = imageSrc;
    document.getElementById('pin-modal-html').innerHTML = htmlContent;
    document.getElementById('pin-modal').style.display = 'block';
}


// モーダルを閉じる
document.querySelector('.pin-modal .close').onclick = function() {
    document.getElementById('pin-modal').style.display = 'none';
};

    var images = [
        {
        	id: 'image01',
            url: 'http://kou-ryaku.net/test/character_cthulhu_hastur.png',
            point: new L.Point(w * 0.25, h * 0.35),
            size: [60, 60],
            popupContent: 'こんなところにハスター！<br />',
            link: 'https://example.com',
            linkText: '詳細を見る'  // ポップアップのリンクテキスト
        },
        {
        	id: 'image02',
            url: 'http://kou-ryaku.net/test/pin_anime_07.png',
            point: new L.Point(w * 0.4, h * 0.3),
            size: [70, 70],
            popupContent: 'きになる場所<br />',
            link: 'https://example.com',
            linkText: '詳細を見る'  // ポップアップのリンクテキスト
        }
        // 他の画像情報を追加できます
    ];

    // 各画像をマップに配置
    images.forEach(function(img) {
        var latLng = map.unproject(img.point, map.getMaxZoom()-1);
        var imageBounds = [latLng, map.unproject([img.point.x + img.size[0], img.point.y + img.size[1]], map.getMaxZoom()-1)];
        var imageLayer = L.imageOverlay(img.url, imageBounds).addTo(map);
    });


// リンククリック時の挙動
document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(e) {
        var id = this.getAttribute('id');
        if (markers[id]) {
            e.preventDefault();
            var markerLatLng = markers[id].getLatLng();

            // 一時的にマップを縮小
            map.setView(markerLatLng, map.getZoom() );

            // 0.2秒後に指定された箇所を拡大
            setTimeout(function() {
                map.setView(markerLatLng, 5); // 6 は目的のズームレベル
                openPinModal(pinData[id].image, pinData[id].html); // モーダルを開く
                markers[id].openPopup();
            }, 200); // 0.2秒後に実行
        }
    });
});



});
