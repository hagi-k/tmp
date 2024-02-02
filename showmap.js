document.addEventListener('DOMContentLoaded', function() {

//    var w = 1402*2;
//    var h = 1602*2;
    var w = 1314*2;
    var h = 846*2;

    var map = L.map('map', {
        minZoom: 2,
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
    { id:'id001', point: new L.Point(w*0.5,h*0.5), url: '""', linkText: '中央公園', image: 'https://kou-ryaku.net/test/pic/id01.jpg', html: '<h2>中央公園</h2>あれこれなんだかんだ起こります<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302304003335/"">リンク</a></b>', color: 'red' },
    { id:'id002', point: new L.Point(w*0.651,h*0.66), url: '""', linkText: 'ミスカトニック大学', image: 'https://kou-ryaku.net/test/pic/id02.jpg', html: '<h2>ミスカトニック大学</h2>この場所で云々この場所で云々<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g322302000281/"">リンク</a></b>', color: 'red' },
    { id:'id003', point: new L.Point(w*0.1,h*0.1), url: '""', linkText: 'すみっ公園', image: 'https://kou-ryaku.net/test/pic/id03.jpg', html: '<h2>すみっ公園</h2>すみっこかわいい<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g301411001415/"">リンク</a></b>', color: 'red' },
    { id:'id004', point: new L.Point(w*0.951,h*0.96), url: '""', linkText: 'はじっ公園', image: 'https://kou-ryaku.net/test/pic/id04.png', html: '<h2>はじっ公園</h2>下側だとモーダルに隠れちゃうので、モーダル上に表示するとか考えた方がいいかも<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302109001482"">リンク</a></b>', color: 'red' },
    { id:'id005', point: new L.Point(w*0.643640059048937,h*0.1695275983148), url: '""', linkText: 'id005', image: 'https://kou-ryaku.net/test/pic/idxx.jpg', html: '<h2>id005</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: 'blue' },
    { id:'id006', point: new L.Point(w*0.112812274596265,h*0.788945893060671), url: '""', linkText: 'id006', image: 'https://kou-ryaku.net/test/pic/idxx.jpg', html: '<h2>id006</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: 'blue' },
    { id:'id007', point: new L.Point(w*0.995891767961554,h*0.244633061754637), url: '""', linkText: 'id007', image: 'https://kou-ryaku.net/test/pic/idxx.jpg', html: '<h2>id007</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: 'blue' },
    { id:'id008', point: new L.Point(w*0.567450616087713,h*0.12612710330829), url: '""', linkText: 'id008', image: 'https://kou-ryaku.net/test/pic/idxx.jpg', html: '<h2>id008</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: 'blue' },
    { id:'id009', point: new L.Point(w*0.388204352833428,h*0.156130145419404), url: '""', linkText: 'id009', image: 'https://kou-ryaku.net/test/pic/idxx.jpg', html: '<h2>id009</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: 'blue' },
    { id:'id010', point: new L.Point(w*0.368255247657614,h*0.637626272536938), url: '""', linkText: 'id010', image: 'https://kou-ryaku.net/test/pic/idxx.jpg', html: '<h2>id010</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: 'blue' },
    { id:'id011', point: new L.Point(w*0.402034789859934,h*0.550873181758939), url: '""', linkText: 'id011', image: 'https://kou-ryaku.net/test/pic/idxx.jpg', html: '<h2>id011</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: 'blue' },
    { id:'id012', point: new L.Point(w*0.966344613364596,h*0.545892523947111), url: '""', linkText: 'id012', image: 'https://kou-ryaku.net/test/pic/idxx.jpg', html: '<h2>id012</h2>ああああ<br /><b>➡<a href=""https://store.kadokawa.co.jp/shop/g/g302307002478/"">リンク</a></b>', color: 'blue' }
];

// 各ピンをマップに配置
pins.forEach(function(pin) {
    var latLng = map.unproject(pin.point, map.getMaxZoom()-1);

    // カスタムアイコンの設定
    var customIcon = L.icon({
        iconUrl: `https://kou-ryaku.net/test/pin/${pin.color}.png`, // 色に基づいたアイコンのURL
        iconSize: [56, 56], // アイコンのサイズ
        iconAnchor: [17.5, 56], // アイコンのアンカーポイント
        popupAnchor: [12, -38] // ポップアップのアンカーポイント
    });

    var marker = L.marker(latLng, {icon: customIcon}).addTo(map);
    marker.bindPopup(`${pin.linkText}`);
    marker.on('click', function() {
        openPinModal(pin.image, pin.html); // ピンクリック時にモーダルを開く
    });
    markers[pin.id] = marker;
    pinData[pin.id] = { image: pin.image, html: pin.html, color: pin.color };
});


// ラジオボタンのイベントハンドラを設定
document.querySelectorAll('input[type=radio][name="filter"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        filterPins(this.value);
    });
});

// ピンをフィルタリングする関数
function filterPins(color) {
    for (var id in markers) {
        var marker = markers[id];
        if (color === 'all' || pinData[id].color === color) {
            marker.addTo(map);
        } else {
            marker.remove();
        }
    }
}




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

            // 'Blue' が選択されている場合、'All' を選択
            if (document.getElementById('btn-blue').checked) {
                document.getElementById('btn-all').checked = true;
                filterPins('all');
            }

            // 一時的にマップを縮小
            map.setView(markerLatLng, map.getZoom());

            // 0.2秒後に指定された箇所を拡大
            setTimeout(function() {
                map.setView(markerLatLng, 5); // 目的のズームレベル
                openPinModal(pinData[id].image, pinData[id].html); // モーダルを開く
                markers[id].openPopup();
            }, 200); // 0.2秒後に実行
        }
    });
});




});
