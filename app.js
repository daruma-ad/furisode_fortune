/**
 * 振袖占いアプリ - メインスクリプト
 * Yes/No占いで振袖を診断し、スペシャルチャンスでクーポンを獲得
 */

// 質問データ
const questions = [
    {
        text: "華やかな場所で\nみんなの視線を集めたいですか？",
        yes: { red: 2, gold: 2, pink: 1 },
        no: { blue: 2, green: 1, purple: 1 }
    },
    {
        text: "「かわいい」より\n「かっこいい」と言われたいですか？",
        yes: { blue: 2, purple: 2, green: 1 },
        no: { pink: 2, red: 1, gold: 1 }
    },
    {
        text: "伝統的なものより\n個性的なスタイルが好きですか？",
        yes: { purple: 2, gold: 1, blue: 1 },
        no: { red: 2, pink: 1, green: 1 }
    },
    {
        text: "自然の中で過ごす時間が\n好きですか？",
        yes: { green: 2, blue: 1, pink: 1 },
        no: { red: 1, gold: 2, purple: 1 }
    },
    {
        text: "人生の節目には\n特別な運気を呼び込みたいですか？",
        yes: { gold: 2, red: 1, purple: 1 },
        no: { blue: 1, green: 2, pink: 1 }
    }
];

// 振袖タイプデータ
const furisodeTypes = {
    red: {
        name: "華やか情熱タイプ",
        image: "images/furisode_red.png",
        description: "あなたは情熱的で存在感があり、周りを明るく照らすオーラの持ち主。華やかな赤の振袖があなたの魅力を最大限に引き出します。"
    },
    blue: {
        name: "クール知性タイプ",
        image: "images/furisode_blue.png",
        description: "知性と品格を兼ね備えたあなた。深みのある青の振袖が、凛とした美しさを演出。大人の魅力を引き立てます。"
    },
    green: {
        name: "癒し自然タイプ",
        image: "images/furisode_green.png",
        description: "穏やかで優しいあなたは、周りを癒す存在。自然を感じる緑の振袖が、あなたの内面の美しさを表現します。"
    },
    gold: {
        name: "輝き開運タイプ",
        image: "images/furisode_gold.png",
        description: "幸運を引き寄せるパワーを持つあなた。金の振袖があなたの運気をさらに高め、特別な一日を彩ります。"
    },
    pink: {
        name: "可愛いロマンスタイプ",
        image: "images/furisode_pink.png",
        description: "愛らしさと夢見る心を持つあなた。桜色のピンクの振袖が、女性らしい優美さと可憐さを演出します。"
    },
    purple: {
        name: "神秘エレガンスタイプ",
        image: "images/furisode_purple.png",
        description: "神秘的な魅力を持つあなた。深い紫の振袖が、洗練された大人のエレガンスを表現します。"
    }
};

// アプリ状態
let currentQuestion = 0;
let scores = {
    red: 0,
    blue: 0,
    green: 0,
    gold: 0,
    pink: 0,
    purple: 0
};

// DOM要素
const screens = {
    start: document.getElementById('start-screen'),
    question: document.getElementById('question-screen'),
    result: document.getElementById('result-screen'),
    special: document.getElementById('special-screen')
};

const elements = {
    startBtn: document.getElementById('start-btn'),
    progressFill: document.getElementById('progress-fill'),
    currentQ: document.getElementById('current-q'),
    totalQ: document.getElementById('total-q'),
    questionText: document.getElementById('question-text'),
    answerBtns: document.querySelectorAll('.answer-btn'),
    furisodeCard: document.getElementById('furisode-card'),
    furisodeImage: document.getElementById('furisode-image'),
    typeName: document.getElementById('type-name'),
    typeDescription: document.getElementById('type-description'),
    nextBtn: document.getElementById('next-btn'),
    luckyCard: document.getElementById('lucky-card'),
    couponRevealed: document.getElementById('coupon-revealed')
};

// 画面切り替え
function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

// 質問表示
function showQuestion() {
    const question = questions[currentQuestion];
    elements.questionText.textContent = question.text;
    elements.currentQ.textContent = currentQuestion + 1;
    elements.progressFill.style.width = `${((currentQuestion) / questions.length) * 100}%`;
}

// 回答処理
function handleAnswer(answer) {
    const question = questions[currentQuestion];
    const scoreChanges = answer === 'yes' ? question.yes : question.no;
    
    // スコア加算
    Object.entries(scoreChanges).forEach(([color, points]) => {
        scores[color] += points;
    });
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        // 次の質問へ
        elements.progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
        setTimeout(() => {
            showQuestion();
        }, 300);
    } else {
        // 結果画面へ
        elements.progressFill.style.width = '100%';
        setTimeout(() => {
            showResult();
        }, 500);
    }
}

// 結果判定
function getResult() {
    let maxScore = 0;
    let resultColor = 'red';
    
    Object.entries(scores).forEach(([color, score]) => {
        if (score > maxScore) {
            maxScore = score;
            resultColor = color;
        }
    });
    
    return furisodeTypes[resultColor];
}

// 結果表示
function showResult() {
    const result = getResult();
    
    elements.furisodeImage.src = result.image;
    elements.typeName.textContent = result.name;
    elements.typeDescription.textContent = result.description;
    
    showScreen('result');
    
    // カード自動フリップ
    setTimeout(() => {
        elements.furisodeCard.classList.add('flipped');
    }, 800);
}

// スペシャルチャンス画面へ
function showSpecialChance() {
    showScreen('special');
}

// ラッキーカードフリップ
function flipLuckyCard() {
    if (!elements.luckyCard.classList.contains('flipped')) {
        elements.luckyCard.classList.add('flipped');
        
        // クーポン表示
        setTimeout(() => {
            elements.couponRevealed.classList.add('show');
        }, 800);
    }
}

// リセット
function resetApp() {
    currentQuestion = 0;
    scores = {
        red: 0,
        blue: 0,
        green: 0,
        gold: 0,
        pink: 0,
        purple: 0
    };
    elements.furisodeCard.classList.remove('flipped');
    elements.luckyCard.classList.remove('flipped');
    elements.couponRevealed.classList.remove('show');
    elements.progressFill.style.width = '0%';
}

// イベントリスナー設定
function initEventListeners() {
    // スタートボタン
    elements.startBtn.addEventListener('click', () => {
        resetApp();
        showScreen('question');
        showQuestion();
    });
    
    // 回答ボタン
    elements.answerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.dataset.answer;
            handleAnswer(answer);
        });
    });
    
    // 次へボタン（結果画面）
    elements.nextBtn.addEventListener('click', () => {
        showSpecialChance();
    });
    
    // ラッキーカードクリック
    elements.luckyCard.addEventListener('click', () => {
        flipLuckyCard();
    });
}

// 総質問数設定
elements.totalQ.textContent = questions.length;

// 初期化
initEventListeners();
