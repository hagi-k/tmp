document.addEventListener('DOMContentLoaded', function() {
    const textDisplay = document.getElementById('textDisplay');
    let jsonData = [ /* ここにJSONデータをコピー */ ];
    let currentIndex = 0;
    let currentParagraph = null;

    function displayTextWithDelay(text, color, speed, callback) {
        if (!currentParagraph) {
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
                    currentParagraph = null; // Reset for new paragraph
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
