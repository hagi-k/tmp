document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map', {
        minZoom: 2,
        maxZoom: 5,
        center: [0, 0],
        zoom: 3,
        crs: L.CRS.Simple
    });

    // 画像の寸法
    var w = 2000;  // 画像の幅
    var h = 1500;  // 画像の高さ

    // 南西（左下）と北東（右上）の座標を設定
    var southWest = map.unproject([0, h], map.getMaxZoom()-1);
    var northEast = map.unproject([w, 0], map.getMaxZoom()-1);
    var bounds = new L.LatLngBounds(southWest, northEast);

    // 画像を地図のレイヤーとして追加
    L.imageOverlay('http://kou-ryaku.net/test/arkham.jpg', bounds).addTo(map);

    // マップのビューを画像の範囲に合わせる
    map.setMaxBounds(bounds);

// ピンの位置と色を管理するオブジェクトの配列
var pins = [
    // ...他のピンの情報...
    {
        id: 'id01',
        point: new L.Point(w / 2, h / 2),
        url: 'https://example.com',
        linkText: 'センターリンク',
        color: 'red' // ピンの色
    },
    {
        id: 'id02',
        point: new L.Point(w * 0.651, h * 0.66),
        url: 'https://www.miskatonic-university.org/',
        linkText: 'ミスカトニック大学',
        color: 'blue' // ピンの色
    }
    // ...他のピンの情報...
];


 // 各ピンをマップに配置
    pins.forEach(function(pin) {
        var latLng = map.unproject(pin.point, map.getMaxZoom()-1);
        var marker = L.marker(latLng).addTo(map);
        marker.bindPopup(`<a href="${pin.url}" target="_blank">${pin.linkText}</a>`);
    });


/*
// 各ピンをマップに配置（色ピン）
pins.forEach(function(pin) {
    var latLng = map.unproject(pin.point, map.getMaxZoom()-1);
    var customIcon = L.icon({
        iconUrl: 'path/to/icon-' + pin.color + '.png', // 色に応じたアイコンのパス
        iconSize: [25, 41], // アイコンのサイズ
        iconAnchor: [12, 41], // アイコンのアンカーポイント
        popupAnchor: [1, -34] // ポップアップのアンカーポイント
    });
    var marker = L.marker(latLng, {icon: customIcon}).addTo(map);
    marker.bindPopup(`<a href="${pin.url}" target="_blank">${pin.linkText}</a>`);
});
*/

    var images = [
        {
            url: 'http://kou-ryaku.net/test/character_cthulhu_hastur.png',
            point: new L.Point(w * 0.2, h * 0.3),
            size: [60, 60],
            popupContent: 'こんなところにハスター！<br />',
            link: 'https://example.com',
            linkText: '詳細を見る'  // ポップアップのリンクテキスト
        }
        // 他の画像情報を追加できます
    ];

    // 各画像をマップに配置
images.forEach(function(img) {
    // 画像の位置とサイズから境界を計算
    var latLng = map.unproject(img.point, map.getMaxZoom()-1);
    var imageBounds = [latLng, map.unproject([img.point.x + img.size[0], img.point.y + img.size[1]], map.getMaxZoom()-1)];

    // 画像レイヤーを作成し、マップに追加
    var imageLayer = L.imageOverlay(img.url, imageBounds).addTo(map);

    // 透明なdiv要素を使用したカスタムアイコンを作成
    var invisibleIcon = L.divIcon({
        className: 'invisible-div',
        iconSize: L.point(img.size[0], img.size[1]),
        html: '<div style="width: 100%; height: 100%;"></div>'
    });

    // 画像の中央に透明なマーカーを配置
    var imageCenter = map.unproject([img.point.x + img.size[0] / 2, img.point.y + img.size[1] / 2], map.getMaxZoom()-1);
    var invisibleMarker = L.marker(imageCenter, {
        icon: invisibleIcon,
        popupAnchor: [0, -(img.size[1] / 2 + img.size[1] * 0.1)] // ポップアップのアンカーポイントを画像の上部から10％の位置に調整
    }).addTo(map);

    // ポップアップの内容を作成
    var popupContent = `${img.popupContent}<a href="${img.link}" target="_blank">${img.linkText}</a>`;

    // 透明なマーカーにポップアップをバインド
    invisibleMarker.bindPopup(popupContent);
});




});


