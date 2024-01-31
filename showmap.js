document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map', {
        minZoom: 1,
        maxZoom: 4,
        center: [0, 0],
        zoom: 1,
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

    // ピンの位置を管理するオブジェクトの配列
    var pins = [
        { id: 'center', point: new L.Point(w / 2, h / 2), url: 'https://example.com' },
        { id: 'specific', point: new L.Point(w * 0.2, h * 0.2), url: 'https://example.com' }
        // 他のピンの情報を追加できます
    ];

    // 各ピンをマップに配置
    pins.forEach(function(pin) {
        var latLng = map.unproject(pin.point, map.getMaxZoom()-1);
        var marker = L.marker(latLng).addTo(map);
        marker.bindPopup(`<a href="${pin.url}" target="_blank">リンク</a>`);
    });
});
