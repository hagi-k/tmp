document.addEventListener('DOMContentLoaded', function() {
    const textDisplay = document.getElementById('textDisplay');
    textDisplay.style.position = 'relative'; // Ensure textDisplay is above background
    textDisplay.style.zIndex = '10'; // Higher zIndex to keep text in front
    textDisplay.style.textAlign = 'left'; // Set text alignment to left

    let jsonData = [
	{
		"text": "さざ波一つない、平坦な水面。ところどころで白い水煙がゆらめいていた。",
		"linefeed": 1,
		"color": "#000;",
		"speed": 10,
		"wait": 1,
		"background-image": "p1.webp",
		"bgm": "",
		"se": ""
	},
	{
		"text": "その中心が、ゆっくりと、盛り上がってきた。水中から何かが出てきているのではなく、液体そのものが上昇しているのだ。それは見上げるほどの高さになると、ぷるぷると震え始めた。飛沫しぶきが迸ほとばしった。",
		"linefeed": 1,
		"color": "#000;",
		"speed": 10,
		"wait": 1,
		"background-image": "p2.webp",
		"bgm": "",
		"se": ""
	},
	{
		"text": "僕は既に知っていた。",
		"linefeed": 1,
		"color": "#000;",
		"speed": 200,
		"wait": 1,
		"background-image": "",
		"bgm": "",
		"se": ""
	},
	{
		"text": "そこに現れる",
		"linefeed": 0,
		"color": "#000;",
		"speed": 30,
		"wait": 0,
		"background-image": "",
		"bgm": "",
		"se": ""
	},
	{
		"text": "美少女",
		"linefeed": 0,
		"color": "#f00;",
		"speed": 400,
		"wait": 0,
		"background-image": "",
		"bgm": "",
		"se": ""
	},
	{
		"text": "の姿を。",
		"linefeed": 0,
		"color": "#000;",
		"speed": 400,
		"wait": 0,
		"background-image": "",
		"bgm": "",
		"se": ""
	},
	{
		"text": "　",
		"linefeed": 1,
		"color": "#000;",
		"speed": 400,
		"wait": 0,
		"background-image": "",
		"bgm": "",
		"se": ""
	}
];

    let currentIndex = 0;
    let backgroundIndex = 0;

    function createColoredSpan(text, color) {
        let span = document.createElement('span');
        if (color && color.startsWith('#')) {
            span.style.color = color;
        }
        span.innerHTML = text;
        return span;
    }

    function updateBackground(imageFileName) {
        let backgroundLayerId = 'background-' + backgroundIndex;
        let newBackgroundLayer = document.createElement('div');
        newBackgroundLayer.id = backgroundLayerId;
        newBackgroundLayer.style.backgroundImage = `url('${imageFileName}')`;
        newBackgroundLayer.style.position = 'fixed';
        newBackgroundLayer.style.top = '0';
        newBackgroundLayer.style.left = '0';
        newBackgroundLayer.style.width = '100%';
        newBackgroundLayer.style.height = '100%';
        newBackgroundLayer.style.backgroundSize = 'auto 100%';
        newBackgroundLayer.style.backgroundRepeat = 'no-repeat';
        newBackgroundLayer.style.backgroundPosition = 'center';
        newBackgroundLayer.style.opacity = '0';
        newBackgroundLayer.style.zIndex = '1'; // Keep background behind text
        newBackgroundLayer.style.transition = 'opacity 1s';
        document.body.appendChild(newBackgroundLayer);

        // Fade in new background
        setTimeout(() => {
            newBackgroundLayer.style.opacity = '0.5';
        }, 100);

        // Fade out and remove old backgrounds
        if (backgroundIndex > 0) {
            let oldBackgroundLayerId = 'background-' + (backgroundIndex - 1);
            let oldBackgroundLayer = document.getElementById(oldBackgroundLayerId);
            if (oldBackgroundLayer) {
                oldBackgroundLayer.style.opacity = '0';
                setTimeout(() => {
                    oldBackgroundLayer.remove();
                }, 1000);
            }
        }

        backgroundIndex++;
    }


    function waitForUserInput(callback) {
        function onInput() {
            document.removeEventListener('click', onInput);
            document.removeEventListener('keydown', onInput);
            callback();
        }
        document.addEventListener('click', onInput);
        document.addEventListener('keydown', onInput);
    }


    let currentParagraph = null;

function displayTextWithDelay(text, color, speed, linefeed, backgroundImage, callback) {
    if (backgroundImage) {
        updateBackground(backgroundImage);
    }

    if (linefeed === 1 || !currentParagraph) {
        currentParagraph = document.createElement('p');
        currentParagraph.style.color = color;
        currentParagraph.style.textAlign = 'left';
        textDisplay.appendChild(currentParagraph);
    }

    let i = 0;
    let interval = setInterval(() => {
        if (i < text.length) {
            currentParagraph.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            if (linefeed === 1) {
                currentParagraph = null; // 次のテキストブロックのために現在の段落をリセット
            }
            if (typeof callback === 'function') {
                callback(); // コールバックが関数である場合のみ呼び出す
            }
        }
    }, speed);
}

async function processJSON() {
    for (; currentIndex < jsonData.length; currentIndex++) {
        const item = jsonData[currentIndex];
        await new Promise(resolve => displayTextWithDelay(item.text, item.color, item.speed, item.linefeed, item['background-image'], resolve));

        if (item.linefeed === 1) {
            await new Promise(resolve => waitForUserInput(resolve));
        }
    }
}

processJSON();



});
