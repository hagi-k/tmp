document.addEventListener('DOMContentLoaded', function() {

    const param = {
        rule6th: [
            { id: 1, name: 'STR', dice: 6, num: 3, addValue: 0 },
            { id: 2, name: 'CON', dice: 6, num: 3, addValue: 0 },
            { id: 7, name: 'SIZ', dice: 6, num: 2, addValue: 6 },
            { id: 3, name: 'DEX', dice: 6, num: 3, addValue: 0 },
            { id: 4, name: 'APP', dice: 6, num: 3, addValue: 0 },
            { id: 5, name: 'INT', dice: 6, num: 2, addValue: 6 },
            { id: 6, name: 'POW', dice: 6, num: 3, addValue: 0 },
            { id: 8, name: 'EDU', dice: 6, num: 3, addValue: 3 },
            { id: 9, name: '年収', dice: 10, num: 1, addValue: 0 }
        ],
        rule7th: [
            { id: 1, param: 'STR', dice: 6, num: 3, addValue: 0 },
            { id: 2, param: 'CON', dice: 6, num: 3, addValue: 0 },
            { id: 3, param: 'SIZ', dice: 6, num: 2, addValue: 6 },
            { id: 4, param: 'DEX', dice: 6, num: 3, addValue: 0 },
            { id: 5, param: 'APP', dice: 6, num: 3, addValue: 0 },
            { id: 6, param: 'EDU', dice: 6, num: 2, addValue: 6 },
            { id: 7, param: 'INT', dice: 6, num: 2, addValue: 6 },
            { id: 8, param: 'POW', dice: 6, num: 3, addValue: 0 },
            { id: 9, param: '幸運', dice: 6, num: 3, addValue: 0 },
            { id: 16, param: '幸運2', dice: 6, num: 3, addValue: 0 }
        ]
    };

/*
// 探索者以外に、神話生物を作れるようにしても良さそう。
//その場合、移動、耐久力、DB、武器、装甲、呪文、正気度消失など固定値は、description内で伝えるで良いかも。
    const param = {
        rule6th: [
            {
                name: "探索者（人間）",
                description: "人間なので弱い。",
                attributes: [
                    { id: 1, name: 'STR', dice: 6, num: 3, addValue: 0 },
                    { id: 2, name: 'CON', dice: 6, num: 3, addValue: 0 },
                    { id: 7, name: 'SIZ', dice: 6, num: 2, addValue: 6 },
                    { id: 3, name: 'DEX', dice: 6, num: 3, addValue: 0 },
                    { id: 4, name: 'APP', dice: 6, num: 3, addValue: 0 },
                    { id: 5, name: 'INT', dice: 6, num: 2, addValue: 6 },
                    { id: 6, name: 'POW', dice: 6, num: 3, addValue: 0 },
                    { id: 8, name: 'EDU', dice: 6, num: 3, addValue: 3 },
                    { id: 9, name: '年収', dice: 10, num: 1, addValue: 0 }
                ]
            },
            {
                name: "古きもの（外なる神）",
                description: "人間なので弱い。",
                attributes: [
                    { id: 1, name: 'STR', dice: 0, num: 0, addValue: 0 },
                    { id: 2, name: 'CON', dice: 100, num: 1, addValue: 100 },
                    { id: 7, name: 'SIZ', dice: 6, num: 3, addValue: 9 },
                    { id: 3, name: 'DEX', dice: 10, num: 2, addValue: 17 },
                    { id: 4, name: 'APP', dice: 0, num: 0, addValue: 0 },
                    { id: 5, name: 'INT', dice: 10, num: 2, addValue: 17 },
                    { id: 6, name: 'POW', dice: 10, num: 5, addValue: 20 },
                    { id: 8, name: 'EDU', dice: 0, num: 0, addValue: 0 },
                    { id: 9, name: '年収', dice: 0, num: 0, addValue: 0 }
                ]
            },
        ],
        rule7th: [
            { id: 1, param: 'STR', dice: 6, num: 3, addValue: 0 },
            { id: 2, param: 'CON', dice: 6, num: 3, addValue: 0 },
            { id: 3, param: 'SIZ', dice: 6, num: 2, addValue: 6 },
            { id: 4, param: 'DEX', dice: 6, num: 3, addValue: 0 },
            { id: 5, param: 'APP', dice: 6, num: 3, addValue: 0 },
            { id: 6, param: 'EDU', dice: 6, num: 2, addValue: 6 },
            { id: 7, param: 'INT', dice: 6, num: 2, addValue: 6 },
            { id: 8, param: 'POW', dice: 6, num: 3, addValue: 0 },
            { id: 9, param: '幸運', dice: 6, num: 3, addValue: 0 }
        ]
    };
*/    

    function rollDice(diceParams, totalId, rule) {
        let count = Math.floor(Math.random() * 11) + 10;
        let history = Array(diceParams.num).fill([]);
    
        let intervalId = setInterval(function() {
            let total = diceParams.addValue;
    
            for (let i = 0; i < diceParams.num; i++) {
                let newValue, attempts = 0;
                do {
                    newValue = Math.floor(Math.random() * diceParams.dice);
                    if (diceParams.dice === 6) {
                        newValue += 1;
                    }
                    attempts++;
                    if (attempts > 50) break;
                } while (history[i].includes(newValue));
    
                if (history[i].length >= 1) {
                    history[i].shift();
                }
                history[i].push(newValue);
    
                total += newValue;


                let diceImageId = `dice${rule}_${diceParams.id}_${i + 1}`;
                let diceImage = document.getElementById(diceImageId);
                if (diceImage) {
                    let imageName = (diceParams.dice === 10) ? `10_${newValue}` : newValue;
                    diceImage.src = imageName + '.png';
                }
            }
    
            if (rule === '7th_rule') {
                total *= 5;
            }
    
            document.getElementById(totalId).textContent = total;

            if(diceParams.id===6 && rule==='7th_rule') {
                if(count===1) { improvementEdu(); } // EDU数値決定したので上達チェックする
            }

            if (--count <= 0) {
                clearInterval(intervalId);
            }

            calculateAdditionalParams();

        }, 60);
    }



    // ダイスロール後に追加のパラメータを計算する関数
    function calculateAdditionalParams() {
        const rule = document.querySelector('input[name="mode"]:checked').id;

        if (rule === '6th_rule') {
            const str = parseInt(document.getElementById('param6th_1_total').textContent) || 0;
            const con = parseInt(document.getElementById('param6th_2_total').textContent) || 0;
            const siz = parseInt(document.getElementById('param6th_7_total').textContent) || 0;
            const pow = parseInt(document.getElementById('param6th_6_total').textContent) || 0;
            const int = parseInt(document.getElementById('param6th_5_total').textContent) || 0;
            const edu = parseInt(document.getElementById('param6th_8_total').textContent) || 0;
            const app = parseInt(document.getElementById('param6th_4_total').textContent) || 0;
            const dex = parseInt(document.getElementById('param6th_3_total').textContent) || 0;
    
            radarChart.data.datasets[0].data = [
                str,con,siz,dex,app,int,pow,edu
            ];
            radarChart.update();
    
            // 耐久力
            if (con && siz) {
                document.getElementById('param6th_15_total').textContent = Math.ceil((con + siz) / 2); // Math.ceil 切り上げ
            }
    
            // マジック・ポイント・SAN・幸運
            if (pow) {
                document.getElementById('param6th_16_total').textContent = pow; // MP
                document.getElementById('param6th_10_total').textContent = pow * 5; // SAN
                document.getElementById('param6th_12_total').textContent = pow * 5; // 幸運
            }
    
            // アイデア
            if (int) {
                document.getElementById('param6th_11_total').textContent = int * 5;
            }
    
            // 知識
            if (edu) {
                document.getElementById('param6th_13_total').textContent = edu * 5;
            }
    
            // ダメージ・ボーナス
            if (str && siz) {
                const sumStrSiz = str + siz;
                let damageBonus = '0';
                if (sumStrSiz <= 12) { damageBonus = '-1D6';
                } else if (sumStrSiz <= 16) { damageBonus = '-1D4';
                } else if (sumStrSiz <= 24) { damageBonus = '0';
                } else if (sumStrSiz <= 32) { damageBonus = '+1D4';
                } else if (sumStrSiz <= 40) { damageBonus = '+1D6';
                } else {
                    const bonusGroups = Math.floor((sumStrSiz - 41) / 16) + 2;
                    damageBonus = `+${bonusGroups}D6`;
                }
    //            document.getElementById('param6th_14_total').textContent = damageBonus + '(STR+SIZ=' + sumStrSiz + ')';
                document.getElementById('param6th_14_total').textContent = damageBonus;
            }
        } else if (rule === '7th_rule') {
            // 7thルールの追加パラメータ計算
            const con = parseInt(document.getElementById('param7th_2_total').textContent) || 0;
            const siz = parseInt(document.getElementById('param7th_3_total').textContent) || 0;
            const pow = parseInt(document.getElementById('param7th_8_total').textContent) || 0;
            const dex = parseInt(document.getElementById('param7th_4_total').textContent) || 0;
            const str = parseInt(document.getElementById('param7th_1_total').textContent) || 0;
            const app = parseInt(document.getElementById('param7th_5_total').textContent) || 0;
            const int = parseInt(document.getElementById('param7th_7_total').textContent) || 0;
            const edu = parseInt(document.getElementById('param7th_6_total').textContent) || 0;
            const mov = parseInt(document.getElementById('param7th_11_total').textContent) || 0;
    
            radarChart.data.datasets[0].data = [
                str,con,siz,dex,app,int,pow,edu
            ];
            radarChart.update();

            // 耐久力
            if (con && siz) {
                document.getElementById('param7th_14_total').textContent = Math.floor((con + siz) / 10);
            }
    
            // マジック・ポイント・SAN
            if (pow) {
                document.getElementById('param7th_15_total').textContent = Math.floor(pow / 5);
                document.getElementById('param7th_10_total').textContent = pow;
            }
    
            // 移動率
            let moveRate = 0;
            if (str && dex && siz) {
                if (dex < siz && str < siz) {
                    moveRate = 7;
                } else if (dex >= siz || str >= siz) {
                    moveRate = 8;
                } else if (dex > siz && str > siz) {
                    moveRate = 9;
                }
                document.getElementById('param7th_11_total').textContent = moveRate;
            }
    
            // ダメージ・ボーナス・ビルド
            const sumStrSiz = str + siz;
            let damageBonus = '0';
            let build = 0;
            if (str && siz) {
                if (sumStrSiz <= 64) { damageBonus = '-2'; build = -2;
                } else if (sumStrSiz <= 84) { damageBonus = '-1'; build = -1;
                } else if (sumStrSiz <= 124) { damageBonus = '0'; build = 0;
                } else if (sumStrSiz <= 164) { damageBonus = '+1D4'; build = 1;
                } else if (sumStrSiz <= 204) { damageBonus = '+1D6'; build = 2;
                } else {
                    const bonusGroups = Math.floor((sumStrSiz - 205) / 80) + 2;
                    damageBonus = `+${bonusGroups}D6`;
                    build = bonusGroups + 1;
                }
                document.getElementById('param7th_12_total').textContent = damageBonus;
                document.getElementById('param7th_13_total').textContent = build;
            }
            
            // 年齢による調整
            if (app || mov) {
                const age = parseInt(document.getElementById('age').value);
                let appAdjust = 0;
                let movAdjust = 0;
                if (age >= 40 && age < 50) {
                    appAdjust = -5;
                    movAdjust = -1;
                } else if (age >= 50 && age < 60) {
                    appAdjust = -10;
                    movAdjust = -2;
                } else if (age >= 60 && age < 70) {
                    appAdjust = -15;
                    movAdjust = -3;
                } else if (age >= 70 && age < 80) {
                    appAdjust = -20;
                    movAdjust = -4;
                } else if (age >= 80) {
                    appAdjust = -25;
                    movAdjust = -5;
                }
                if (app) {
                    let adjustedApp = app + appAdjust;
                    if (adjustedApp < 0) { adjustedApp = 0 ;}
                    document.getElementById('param7th_5_adjust').textContent = adjustedApp;
                }
                if (mov) {
                    let adjustedMov = mov + movAdjust;
                    if (adjustedMov < 0) { adjustedMov = 0 ;}
                    document.getElementById('param7th_11_adjust').textContent = adjustedMov;
                }
            }
        }
    }


    // EDUの上達チェック
    function improvementEdu() {
        let eduAdjust = 0;
        const age = parseInt(document.getElementById('age').value);
        const eduTotal = parseInt(document.getElementById('param7th_6_total').textContent) || 0;
        let numberOfChecks = 0;
        let output = '';
        document.getElementById('improvement_edu').innerHTML = output;

        if(eduTotal) {
            if (age === 20) {
                numberOfChecks = 1;
            } else if (age === 40) {
                numberOfChecks = 2;
            } else if (age === 50) {
                numberOfChecks = 3;
            } else if (age >= 60) {
                numberOfChecks = 4;
            }

            for (let i = 0; i < numberOfChecks; i++) {
                let checkEdu = Math.floor(Math.random() * 100) + 1;
                if (checkEdu > eduTotal + eduAdjust) {
                    // EDU上達チェック成功
                    let addEdu = Math.floor(Math.random() * 10) + 1;
                    output += `1D100:${checkEdu} > ${eduTotal + eduAdjust}: <font color="blue">EDU上達チェック成功</font>、1D10:${addEdu}を加算<br>`;
                    eduAdjust += addEdu;
                } else {
                    output += `1D100:${checkEdu} <= ${eduTotal + eduAdjust}: <font color="red">EDU上達チェック失敗</font><br>`;
                }
            }
            if (age >= 20) {
                if ( eduTotal + eduAdjust >= 99 ) {
                    eduAdjust = 99 - eduTotal;
                }
                output += `最終的なEDU調整値: +${eduAdjust}`;
                document.getElementById('improvement_edu').innerHTML = output;
                document.getElementById('param7th_6_adjust').textContent = eduTotal + eduAdjust;
            } else {
                document.getElementById('improvement_edu').innerHTML = `年齢によりEDU-5の調整が入ります。`;
                document.getElementById('param7th_6_adjust').textContent = eduTotal - 5;
            }
        }
    }




    // 個別ダイスボタンのイベントリスナー
    document.querySelectorAll('.roll').forEach(button => {
        button.addEventListener('click', function() {
            const diceParamId = this.getAttribute('data-param-id');
            const totalId = this.getAttribute('data-total');
            const rule = document.querySelector('input[name="mode"]:checked').id;

            // 適切なdiceParamsを取得
            const diceParams = (rule === '6th_rule') 
            ? param.rule6th.find(p => p.id.toString() === diceParamId) 
            : param.rule7th.find(p => p.id.toString() === diceParamId);

            if (diceParams) {
                rollDice(diceParams, totalId, rule);
            } else {
                console.error('Invalid dice parameters');
            }
        });
    });

    // 全ダイスロールボタンのイベントリスナー
    document.querySelectorAll('.roll_all').forEach(button => {
        button.addEventListener('click', function() {
            const rule = this.getAttribute('data-rule');
            document.querySelectorAll(`div[id="${rule}"] .roll`).forEach(btn => btn.click());
        });
    });

    // レーダーチャートのオプション
    var chartOptions = {
        6: { min: 1, max: 21, stepSize: 3 }, // 6thルール用のオプション
        7: { min: 1, max: 90, stepSize: 15 } // 7thルール用のオプション
    };

    var currentRule = 6; // 現在選択されているルール（初期値は6th）

    // レーダーチャートの初期化
    var ctx = document.getElementById('radarChart').getContext('2d');
    var radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['STR', 'CON', 'SIZ', 'DEX', 'APP', 'INT', 'POW', 'EDU'],
            datasets: [{
                label: false,
                data: [0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
            responsive: false,
            scale: {
                r: { 
                    beginAtZero: true,
                    ticks: {
                        stepSize: 3,
                    },
                    min: chartOptions[currentRule].min,
                    max: chartOptions[currentRule].max
                }
            }
        }
    });

    // チャートオプションを変更
    function updateChartOptions() {
        currentRule = document.getElementById('6th_rule').checked ? 6 : 7;
        var options = chartOptions[currentRule];
        radarChart.options.scale.r.min = options.min;
        radarChart.options.scale.r.max = options.max;
        radarChart.options.scale.r.ticks.stepSize = options.stepSize;
        radarChart.update();
        calculateAdditionalParams();
//        console.log(radarChart.options.scale.ticks.max);
    }
    updateChartOptions();


    // 年齢に基づいた調整divの表示切替関数
    function displayAgeAdjustments() {
        const age = parseInt(document.getElementById('age').value);

        // すべての年齢調整divを非表示にする
        const ageAdjustDivs = document.querySelectorAll('[id^="age_adjust"]');
        ageAdjustDivs.forEach(div => div.style.display = 'none');
        document.getElementById('u19_luck').style.display = 'none';

        // 対応する年齢調整divのみを表示する
        if (age >= 7 && age <= 19) {
            document.getElementById('age_adjust15').style.display = 'block';
            document.getElementById('u19_luck').style.display = '';
        } else if (age === 20) {
            document.getElementById('age_adjust20').style.display = 'block';
        } else if (age === 40) {
            document.getElementById('age_adjust40').style.display = 'block';
        } else if (age === 50) {
            document.getElementById('age_adjust50').style.display = 'block';
        } else if (age === 60) {
            document.getElementById('age_adjust60').style.display = 'block';
        } else if (age === 70) {
            document.getElementById('age_adjust70').style.display = 'block';
        } else if (age >= 80) {
            document.getElementById('age_adjust80').style.display = 'block';
        }
    }

    // 年齢変更select要素にイベントリスナーを追加
    document.getElementById('age').addEventListener('change', handleAgeChange);
    function handleAgeChange() {
        displayAgeAdjustments();
        calculateAdditionalParams();
        improvementEdu();
    }

    // ページ読み込み時にも実行
    displayAgeAdjustments();
    
    // タブの表示設定を更新する関数
    function updateVisibility() {
        // 各タブの表示状態をチェックボックスの状態に基づいて設定
        document.getElementById('6th').style.display = document.getElementById('6th_rule').checked ? 'block' : 'none';
        document.getElementById('7th').style.display = document.getElementById('7th_rule').checked ? 'block' : 'none';
//        document.getElementById('preset_npc').style.display = document.getElementById('preset').checked ? 'block' : 'none';
    }

    // ラジオボタンのイベントリスナーを設定
    document.getElementById('6th_rule').addEventListener('change', updateVisibility);
    document.getElementById('7th_rule').addEventListener('change', updateVisibility);
//    document.getElementById('preset_npc').addEventListener('change', updateVisibility);

    // タブの状態を管理する関数
    function updateTabState() {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.style.backgroundColor = ''; // すべてのタブの背景色をリセット
        });
        const activeTabId = document.querySelector('input[name="mode"]:checked').id;
        const activeTab = document.querySelector(`label[for="${activeTabId}"]`);
        if (activeTab) {
            activeTab.style.backgroundColor = '#60C0F0'; // アクティブなタブの背景色を設定
        }
        updateChartOptions();
    }

    // ラジオボタンの状態変更時にタブの状態を更新
    document.querySelectorAll('input[name="mode"]').forEach(radio => {
        radio.addEventListener('change', updateTabState);
    });
    updateVisibility(); // 初期状態のタブの表示を設定
    updateTabState(); // 初期状態のタブを設定
});
