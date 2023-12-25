document.addEventListener('DOMContentLoaded', function() {
    const textDisplay = document.getElementById('textDisplay');
    let jsonData = [
	{
		"text": "さざ波一つない、平坦な水面。ところどころで白い水煙がゆらめいていた。",
		"linefeed": 1,
		"color": "#000;",
		"speed": 100,
		"wait": 1,
		"background-image": "",
		"bgm": "",
		"se": ""
	},
	{
		"text": "その中心が、ゆっくりと、盛り上がってきた。水中から何かが出てきているのではなく、液体そのものが上昇しているのだ。それは見上げるほどの高さになると、ぷるぷると震え始めた。飛沫しぶきが迸ほとばしった。",
		"linefeed": 1,
		"color": "#000;",
		"speed": 100,
		"wait": 1,
		"background-image": "",
		"bgm": "",
		"se": ""
	},
	{
		"text": "その中心が、ゆっくりと、盛り上がってきた。水中から何かが出てきているのではなく、液体そのものが上昇しているのだ。それは見上げるほどの高さになると、ぷるぷると震え始めた。飛沫しぶきが迸ほとばしった。",
		"linefeed": 1,
		"color": "#000;",
		"speed": 100,
		"wait": 1,
		"background-image": "",
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
		"speed": 300,
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

    function displayTextWithDelay(text, color, speed, callback) {
        textDisplay.innerHTML = '';
        textDisplay.style.color = color;
        let i = 0;
        let interval = setInterval(() => {
            if (i < text.length) {
                textDisplay.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                callback();
            }
        }, speed);
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

    function processJSON() {
        if (currentIndex < jsonData.length) {
            const item = jsonData[currentIndex];
            displayTextWithDelay(item.text, item.color, item.speed, () => {
                if (item.linefeed === 1) {
                    waitForUserInput(() => {
                        currentIndex++;
                        processJSON();
                    });
                } else {
                    currentIndex++;
                    processJSON();
                }
            });
        }
    }

    processJSON();
});
