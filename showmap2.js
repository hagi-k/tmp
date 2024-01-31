document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map', {
        minZoom: 1,
        maxZoom: 4,
        center: [0, 0],
        zoom: 1,
        crs: L.CRS.Simple
    });

    var w = 2000;
    var h = 1500;
    var southWest = map.unproject([0, h], map.getMaxZoom()-1);
    var northEast = map.unproject([w, 0], map.getMaxZoom()-1);
    var bounds = new L.LatLngBounds(southWest, northEast);

    L.imageOverlay('http://kou-ryaku.net/test/arkham.jpg', bounds).addTo(map);
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


    pins.forEach(function(pin) {
        var latLng = map.unproject(pin.point, map.getMaxZoom()-1);
        var marker = L.marker(latLng).addTo(map);
        marker.bindPopup(`<a href="${pin.url}" class="modal-link">${pin.linkText}</a>`);
    });

    var images = [
        {
            url: 'http://kou-ryaku.net/test/character_cthulhu_hastur.png',
            point: new L.Point(w * 0.25, h * 0.35),
            size: [60, 60],
            popupContent: 'こんなところにハスター！<br />',
            link: 'https://example.com',
            linkText: '詳細を見る'  // ポップアップのリンクテキスト
        },
        {
            url: 'http://kou-ryaku.net/test/pin_anime_07.png',
            point: new L.Point(w * 0.4, h * 0.3),
            size: [70, 70],
            popupContent: 'きになる場所<br />',
            link: 'https://example.com',
            linkText: '詳細を見る'  // ポップアップのリンクテキスト
        }
        // 他の画像情報を追加できます
    ];

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

    // モーダル関連のコード
    var modal = document.getElementById('modal');
    var modalIframe = document.getElementById('modal-iframe');
    var span = document.getElementsByClassName('close')[0];

    document.querySelectorAll('.modal-link').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            modalIframe.src = this.getAttribute('href');
        });
    });

    span.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});
