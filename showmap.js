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
    // ...他のピンの情報...
    {
        id: 'id01',
        point: new L.Point(w / 2, h / 2),
        url: 'https://example.com',
        linkText: '中央公園',
        image: 'http://kou-ryaku.net/test/id01.jpg',
        html: '<h2>中央公園</h2>あれこれなんだかんだ起こります<br /><a href="">リンク</a>',
        color: 'red' // ピンの色
    },
    {
        id: 'id02',
        point: new L.Point(w * 0.651, h * 0.66),
        url: 'https://www.miskatonic-university.org/',
        linkText: 'ミスカトニック大学',
        image: 'https://www.miskatonic-university.org/wp-content/uploads/2020/10/cropped-2011-header-Main-1.png',
        html: '<h2>ミスカトニック大学</h2>この場所で云々<br /><a href="">リンク</a>',
        color: 'blue' // ピンの色
    },
    {
        id: 'id03',
        point: new L.Point(w * 0.951, h * 0.96),
        url: 'https://www.miskatonic-university.org/',
        linkText: 'すみっ公園',
        image: 'http://kou-ryaku.net/test/id01.jpg',
        html: '<h2>すみっ公園</h2>この場所で云々<br /><a href="">リンク</a>',
        color: 'blue' // ピンの色
    },
    {
        id: 'id04',
        point: new L.Point(w * 0.1, h * 0.1),
        url: 'https://www.miskatonic-university.org/',
        linkText: 'はじっ公園',
        image: 'http://kou-ryaku.net/test/id01.jpg',
        html: '<h2>はじっ公園</h2>この場所で云々<br /><a href="">リンク</a>',
        color: 'blue' // ピンの色
    }
];

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
