window.onload = function() {

    const imageCount = 5;
    const images = [];
    const imageLoadDiv = document.getElementById('imageLoad');
    const imageSelect = document.getElementById('imageSelect');



    for (let i = 0; i < imageCount; i++) {
        const imageLoader = document.createElement('input');
        imageLoader.type = 'file';
        imageLoader.id = `imageLoader${i + 1}`;
        imageLoader.name = `imageLoader${i + 1}`;
        imageLoadDiv.appendChild(imageLoader);
        imageLoadDiv.appendChild(document.createElement('br'));

        const option = document.createElement('option');
        option.value = i;
        option.textContent = `画像 ${i + 1}`;
        imageSelect.appendChild(option);


        images[i] = {
            img: new Image(),
            processedImg: null, // 加工後の画像データを保持するプロパティ
            filteredImg: null, // フィルタ適用後の画像データ
            loaded: false,
            x: 0,
            y: 0,
            scale: 1
        };

        imageLoader.addEventListener('change', function(e) {
            handleImage(e, i);
        });
    }
    function handleImage(e, index) {
        const start = performance.now(); // 開始時間
        const reader = new FileReader();
        reader.onload = function(event) {
            images[index].img.onload = function() {
                images[index].loaded = true;
                images[index].originalWidth = images[index].img.width;
                images[index].originalHeight = images[index].img.height;
                images[index].displayWidth = images[index].img.width;
                images[index].displayHeight = images[index].img.height;
                updateCanvas(); 
            }
            images[index].img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        const end = performance.now(); // 終了時間
        console.log(`handleImage: ${end - start} ms`);
    }

    var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');

    var sliderLow = document.getElementById('thresholdSliderLow');
    var sliderHigh = document.getElementById('thresholdSliderHigh');
    var lowThresholdValue = document.getElementById('lowThresholdValue');
    var highThresholdValue = document.getElementById('highThresholdValue');


    var colorBlack = document.getElementById('colorBlack');
    var colorGray = document.getElementById('colorGray');
    var colorWhite = document.getElementById('colorWhite');

    function handleColorChange() {
        if (selectedImageIndex !== null && images[selectedImageIndex].loaded) {
            applyTernaryFilterToSelectedImage(selectedImageIndex);
        }
    }
    
    colorBlack.addEventListener('input', handleColorChange);
    colorGray.addEventListener('input', handleColorChange);
    colorWhite.addEventListener('input', handleColorChange);
    

    // スライダーのイベントハンドラ
    sliderLow.addEventListener('input', function() {
        lowThresholdValue.innerHTML = sliderLow.value;
        if (selectedImageIndex !== null && images[selectedImageIndex].loaded) {
            applyTernaryFilterToSelectedImage(selectedImageIndex);
        }
    });

    sliderHigh.addEventListener('input', function() {
        highThresholdValue.innerHTML = sliderHigh.value;
        if (selectedImageIndex !== null && images[selectedImageIndex].loaded) {
            applyTernaryFilterToSelectedImage(selectedImageIndex);
        }
    });


    // リセットボタンのイベントハンドラ
    document.getElementById('resetButton').addEventListener('click', function() {
        if (selectedImageIndex !== null && images[selectedImageIndex].loaded) {
            // フィルター適用後の画像をクリア
            images[selectedImageIndex].filteredImg = null;
            updateCanvas();
        }
    });

    imageSelect.addEventListener('change', function() {
        selectedImageIndex = parseInt(imageSelect.value);
        // 必要に応じて画像の更新処理を行う
        updateCanvas();
    });
    


function applyTernaryFilterToSelectedImage(selectedImageIndex) {
    if (!images[selectedImageIndex].loaded) return;

    var tempCanvas = document.createElement('canvas');
    var tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = images[selectedImageIndex].originalWidth;
    tempCanvas.height = images[selectedImageIndex].originalHeight;
    tempCtx.drawImage(images[selectedImageIndex].img, 0, 0, tempCanvas.width, tempCanvas.height);
    
    var imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    applyTernaryFilter(imageData, parseInt(sliderLow.value), parseInt(sliderHigh.value));
    tempCtx.putImageData(imageData, 0, 0);

    images[selectedImageIndex].filteredImg = new Image();
    images[selectedImageIndex].filteredImg.src = tempCanvas.toDataURL();
    images[selectedImageIndex].filteredImg.onload = function() {
        updateCanvas();
    };
}



    function applyTernaryFilter(imageData, lowThreshold, highThreshold) {
        const start = performance.now(); // 開始時間
        var black = hexToRgb(colorBlack.value);
        var gray = hexToRgb(colorGray.value);
        var white = hexToRgb(colorWhite.value);
    
        var data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
            if (data[i + 3] === 0) continue;
    
            var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
            if (brightness < lowThreshold) {
                data[i] = black.r;
                data[i + 1] = black.g;
                data[i + 2] = black.b;
            } else if (brightness >= lowThreshold && brightness < highThreshold) {
                data[i] = gray.r;
                data[i + 1] = gray.g;
                data[i + 2] = gray.b;
            } else {
                data[i] = white.r;
                data[i + 1] = white.g;
                data[i + 2] = white.b;
            }
        }
        const end = performance.now(); // 終了時間
        console.log(`applyTernaryFilterToSelectedImage: ${end - start} ms`);
    }    

    function hexToRgb(hex) {
        var bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }





    var selectedImage = null;

    function selectImageAt(x, y) {
        for (let i = images.length - 1; i >= 0; i--) {
            if (images[i].loaded) {
                const img = images[i].img;
                const rect = img.getBoundingClientRect();
                if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    selectedImage = img;
                    return;
                }
            }
        }
        selectedImage = null;
    }





    var selectedImageIndex = null;

    function selectImageAt(x, y) {
        selectedImageIndex = null; // 選択された画像のインデックスをリセット
    
        // IDが大きい画像（後から読み込まれた画像）からチェック
        for (let i = images.length - 1; i >= 0; i--) {
            if (images[i].loaded) {
                const imgX = images[i].x;
                const imgY = images[i].y;
                const imgWidth = images[i].displayWidth;
                const imgHeight = images[i].displayHeight;
    
                // マウスの位置が画像の範囲内にあるか確認
                if (x >= imgX && x <= imgX + imgWidth && y >= imgY && y <= imgY + imgHeight) {
                    selectedImageIndex = i; // 画像が見つかったらインデックスを設定
                    imageSelect.value = selectedImageIndex; // プルダウンメニューを更新
                    break; // 最初に見つかった画像を選択してループを終了
                }
            }
        }
    }
    




    function updateCanvas() {
//        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Canvasのサイズ初期化（必要に応じて変更）
        var maxWidth = 0;
        var maxHeight = 0;
    
        images.forEach((imageObj) => {
            if (imageObj.loaded) {
                maxWidth = Math.max(maxWidth, imageObj.img.width);
                maxHeight = Math.max(maxHeight, imageObj.img.height);
            }
        });
    
        // Canvasのサイズを最大の画像サイズに合わせる
//        canvas.width = maxWidth;
//        canvas.height = maxHeight;
        canvas.width = 1422;
        canvas.height = 800;
        ctx.clearRect(0, 0, maxWidth, maxHeight);
/*
        // 選択された画像に閾値フィルターを適用
        var selectedImageIndex = parseInt(imageSelect.value);
        if (images[selectedImageIndex] && images[selectedImageIndex].loaded) {
            applyTernaryFilterToSelectedImage(selectedImageIndex);
        }
*/
        images.forEach((imageObj) => {
            if (imageObj.loaded) {
                ctx.save();
                ctx.translate(imageObj.x, imageObj.y);
                const imgToDraw = imageObj.filteredImg || imageObj.img;
                ctx.drawImage(imgToDraw, 0, 0, imageObj.displayWidth, imageObj.displayHeight);
                ctx.restore();
            }
        });
    }

    




    let dragStartPos = null;
    let imageStartPos = null;
    
    canvas.addEventListener('mousedown', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        selectImageAt(x, y);
    
        if (selectedImageIndex !== null) {
            dragStartPos = { x, y };
            imageStartPos = { x: images[selectedImageIndex].x, y: images[selectedImageIndex].y };
        }
    });
    
    canvas.addEventListener('mousemove', function(event) {
        if (selectedImageIndex !== null && event.buttons === 1 && dragStartPos && imageStartPos) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const dx = x - dragStartPos.x;
            const dy = y - dragStartPos.y;
    
            images[selectedImageIndex].x = imageStartPos.x + dx;
            images[selectedImageIndex].y = imageStartPos.y + dy;
    
            updateCanvas();
        }
    });
    
    canvas.addEventListener('mouseup', function(event) {
        dragStartPos = null;
        imageStartPos = null;
    });
    

    let lastWheelTime = null;
    let lastDeltaY = 0;
    
    canvas.addEventListener('wheel', function(event) {
        if (selectedImageIndex !== null) {
            event.preventDefault();
            const currentTime = Date.now();
    
            // 経過時間を計算
            const elapsedTime = lastWheelTime ? currentTime - lastWheelTime : 0;
            const deltaY = event.deltaY;
            const deltaYSign = Math.sign(deltaY);
            lastWheelTime = currentTime;
    
            let scaleMultiplier;
            if (elapsedTime <= 70 && deltaYSign === Math.sign(lastDeltaY)) {
                // 0.07秒以内に同じ方向のホイールイベントが発生した場合
                // deltaYの絶対値を二乗し、符号を反転させる
                scaleMultiplier = -deltaYSign * Math.min(20, Math.pow(Math.abs(deltaY) / 90, 2));
            } else {
                // それ以外の場合は単純なスケールで符号を反転
                scaleMultiplier = -deltaYSign;
            }
            console.log(scaleMultiplier);
            lastDeltaY = deltaY;
    
            // 新しい表示幅を計算
            const newDisplayWidth = Math.max(1, images[selectedImageIndex].displayWidth + scaleMultiplier * 10);
            // スケールを計算
            const scale = newDisplayWidth / images[selectedImageIndex].originalWidth;
    
            // スケールに基づいて表示サイズを更新
            images[selectedImageIndex].displayWidth = images[selectedImageIndex].originalWidth * scale;
            images[selectedImageIndex].displayHeight = images[selectedImageIndex].originalHeight * scale;
    
            updateCanvas();
        }
    });
    
    

}
