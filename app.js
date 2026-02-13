/**
 * 振袖占いアプリ - メインスクリプト
 * Yes/No占いで振袖を診断し、スペシャルチャンスでクーポンを獲得
 */

// 質問データ
// 質問プール（全25問）
const questionsPool = [
    { text: "ハタチの集いは、誰よりも華やかに目立ちたい？", yes: { red: 2, gold: 1 }, no: { navy: 1, white: 1 } },
    { text: "落ち着いた、品格のある雰囲気に憧れる？", yes: { navy: 2, white: 1 }, no: { red: 1, pink: 1 } },
    { text: "自然体で、自分らしいスタイルを大切にしたい？", yes: { green: 2, white: 1 }, no: { red: 1, gold: 1 } },
    { text: "「可愛い！」と褒められるのが一番嬉しい？", yes: { pink: 2, white: 1 }, no: { navy: 1, black: 1 } },
    { text: "他の誰とも被らない、個性的なコーデが好き？", yes: { green: 2, black: 1 }, no: { red: 1, white: 1 } },
    { text: "伝統的な「古典柄」の美しさに惹かれる？", yes: { red: 2, navy: 1 }, no: { green: 1, black: 1 } },
    { text: "都会的で洗練された「モダン柄」に興味がある？", yes: { black: 2, white: 1 }, no: { red: 1, green: 1 } },
    { text: "みんなの和の中心にいることが多い？", yes: { red: 2, pink: 1 }, no: { navy: 1, white: 1 } },
    { text: "清楚で知的、凛とした印象を与えたい？", yes: { white: 2, navy: 1 }, no: { red: 1, pink: 1 } },
    { text: "パステルカラーの服を選ぶことが多い？", yes: { pink: 2, white: 1 }, no: { black: 1, navy: 1 } },
    { text: "ゴールドやシルバーの輝きにワクワクする？", yes: { gold: 2, red: 1 }, no: { white: 1, green: 1 } },
    { text: "クールでミステリアスな雰囲気があると言われる？", yes: { black: 2, navy: 1 }, no: { pink: 1, red: 1 } },
    { text: "流行のスタイルはこまめにチェックしている？", yes: { white: 2, green: 1 }, no: { red: 1, navy: 1 } },
    { text: "成人式は、家族への感謝を伝える場にしたい？", yes: { red: 1, navy: 1, green: 1 }, no: { gold: 1 } },
    { text: "「かっこいい大人」という言葉に憧れがある？", yes: { navy: 2, black: 1 }, no: { pink: 1, white: 1 } },
    { text: "お菓子作りや可愛いカフェ巡りが好き？", yes: { pink: 2 }, no: { black: 1, navy: 1 } },
    { text: "歴史のある建物や神社仏閣の雰囲気が好き？", yes: { red: 1, green: 1, navy: 1 }, no: { black: 1 } },
    { text: "夜の都会のネオンや、ドラマチックな光景が好き？", yes: { black: 2, purple: 1 }, no: { green: 1, white: 1 } },
    { text: "仕事や勉強は、コツコツ計画的に進めるタイプ？", yes: { navy: 2, white: 1 }, no: { red: 1, green: 1 } },
    { text: "直感で行動することが多い、自由人タイプ？", yes: { green: 2, red: 1 }, no: { navy: 1, white: 1 } },
    { text: "週末は家で読書、よりは外へピクニックに行きたい？", yes: { green: 2, pink: 1 }, no: { black: 1, navy: 1 } },
    { text: "占いやスピリチュアルなことに興味がある？", yes: { purple: 1, gold: 1 }, no: { navy: 1 } },
    { text: "どちらかと言えば、目立つより見守る方が好き？", yes: { blue: 1, green: 1, white: 1 }, no: { red: 2, gold: 1 } },
    { text: "リーダーシップを発揮する場面が多い？", yes: { red: 2, navy: 1 }, no: { pink: 1, white: 1 } },
    { text: "ビビッドな色を身につけると、パワーが湧く？", yes: { red: 2, gold: 1 }, no: { navy: 1, green: 1 } }
];

// 振袖診断タイプ（全6種類）
const furisodeTypes = {
    red: {
        name: "王道レッド",
        catchphrase: "ハタチの特権！主役級の輝きを放つ伝統美",
        image: "images/furisode_red.jpg",
        analysis: "魔除けや喜びを意味する「赤」は、エネルギッシュで周りを明るく照らすオーラを持つあなたにぴったり。伝統を大切にしながらも自分らしさを忘れない情熱的なタイプです。",
        coordination: "金色の帯を合わせて豪華絢爛に仕上げるのがおすすめ。髪飾りにはつまみ細工や大ぶりの花を添えて、格式高い王道スタイルを極めましょう。"
    },
    pink: {
        name: "可憐ピンク",
        catchphrase: "愛され度100%！ふんわり広がるスウィートな魔法",
        image: "images/furisode_pink.jpg",
        analysis: "誰からも愛される優しさと、柔らかな雰囲気を持つあなた。女性らしい優美さと可憐さを演出するピンクは、あなたの内面にある愛らしさを最大限に引き出します。",
        coordination: "レースの重ね襟やパールの髪飾りを足して、とことんガーリーに。白や淡い金の帯を合わせれば、まるでお姫様のようなスウィートコーデの完成です。"
    },
    white: {
        name: "清楚ホワイト",
        catchphrase: "トレンドの頂点！圧倒的な透明感と上品な輝き",
        image: "images/furisode_white.jpg",
        analysis: "洗練されたセンスと、一点の曇りもない透明感を持つあなた。何色にも染まらない白は、これからの未来を切り拓くあなたの純真な心を象徴しています。",
        coordination: "あえて色数を抑えた「ワントーンコーデ」が今のトレンド。シルバーや白の小物を合わせ、差し色に淡いパステルカラーを選ぶと、圧倒的に洗練された印象に。"
    },
    green: {
        name: "個性的グリーン",
        catchphrase: "周りと差がつく！レトロモダンな洒落っ気",
        image: "images/furisode_green.jpg",
        analysis: "自分らしさを大切にし、独自のセンスを持つあなた。深みのある緑やウグイス色は、知的でありながら遊び心を感じさせる、あなただけの個性を輝かせます。",
        coordination: "幾何学模様の帯や、ベレー帽・ブーツなどを合わせるレトロモダンなスタイルがおすすめ。アンティーク調の小物を散りばめて、唯一無二のデザインを楽しんで。"
    },
    navy: {
        name: "知的ネイビー",
        catchphrase: "美しき知性。凛とした気品漂う大人の華やぎ",
        image: "images/furisode_navy.jpg",
        analysis: "落ち着きと品格を兼ね備えた、しっかり者のあなた。洗練された紺色は、あなたの凛とした美しさと知的さを引き立て、ハタチの大人の一歩を品良く飾ります。",
        coordination: "銀色の帯やパールを合わせて、寒色系の美しさを際立たせるのがコツ。差し色に深紅や山吹色を少し入れると、高級感のある華やかなスタイルに仕上がります。"
    },
    black: {
        name: "極上ブラック",
        catchphrase: "モダンに極める。強さと品格を纏うシックの極致",
        image: "images/furisode_black.jpg",
        analysis: "芯が強く、自立した魅力を持つあなた。圧倒的な存在感を放つ黒は、あなたの凛とした強さと、秘めた情熱をモダンに表現してくれます。",
        coordination: "紅白のコントラストや、金・銀を大胆に使った帯合わせがおすすめ。赤のリップやクールなヘアスタイルで、シックかつゴージャスに攻めましょう。"
    }
};

// アプリ状態
let questions = []; // 全25問から選ばれた5問
let currentQuestion = 0;
let scores = {
    red: 0,
    pink: 0,
    white: 0,
    green: 0,
    navy: 0,
    black: 0,
    gold: 0 // goldなどは内部ポイントとして保持
};

// DOM要素
const screens = {
    start: document.getElementById('start-screen'),
    question: document.getElementById('question-screen'),
    result: document.getElementById('result-screen'),
    special: document.getElementById('special-screen'),
    reservation: document.getElementById('reservation-screen'),
    thanks: document.getElementById('thanks-screen')
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
    resultCatchphrase: document.getElementById('result-catchphrase'),
    typeName: document.getElementById('type-name'),
    typeAnalysis: document.getElementById('type-analysis'),
    typeCoordination: document.getElementById('type-coordination'),
    nextBtn: document.getElementById('next-btn'),
    luckyCard: document.getElementById('lucky-card'),
    couponRevealed: document.getElementById('coupon-revealed'),
    reserveBtn: document.getElementById('reserve-btn'),
    reservationForm: document.getElementById('reservation-form'),
    resultBadge: document.getElementById('result-badge'),
    backToSpecialBtn: document.getElementById('back-to-special'),
    homeBtn: document.getElementById('home-btn')
};

// シャッフル＆抽出ロジック (Fisher-Yates)
function shuffleAndSelect(pool, count) {
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

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
    elements.progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
}

// 回答処理
function handleAnswer(answer) {
    const question = questions[currentQuestion];
    const scoreChanges = answer === 'yes' ? question.yes : (question.no || {});

    // スコア加算
    Object.entries(scoreChanges).forEach(([color, points]) => {
        if (scores.hasOwnProperty(color)) {
            scores[color] += points;
        }
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
    let maxScore = -1;
    let resultColor = 'red';

    // 定義された6色のみを対象に最大値を検索
    const targetColors = ['red', 'pink', 'white', 'green', 'navy', 'black'];

    targetColors.forEach(color => {
        if (scores[color] > maxScore) {
            maxScore = scores[color];
            resultColor = color;
        }
    });

    return furisodeTypes[resultColor];
}

// 結果表示
function showResult() {
    const result = getResult();

    elements.furisodeImage.src = result.image;
    elements.resultCatchphrase.textContent = result.catchphrase;
    elements.typeName.textContent = result.name;
    elements.typeAnalysis.textContent = result.analysis;
    elements.typeCoordination.textContent = result.coordination;

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

// 予約画面表示
function showReservationScreen() {
    const result = getResult();
    elements.resultBadge.textContent = `おすすめ：${result.name}`;
    showScreen('reservation');
}

// 予約送信処理（Formspree連携）
function handleReservationSubmit(e) {
    e.preventDefault();

    const formData = new FormData(elements.reservationForm);

    // 診断結果とクーポン情報を追加
    const result = getResult();
    formData.append('診断結果', result.name);
    formData.append('クーポン', '1万円OFF');

    const submitBtn = elements.reservationForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>送信中...</span>';

    fetch('https://formspree.io/f/mojnepkb', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                showScreen('thanks');
                elements.reservationForm.reset();
            } else {
                alert('送信に失敗しました。もう一度お試しください。');
            }
        })
        .catch(() => {
            alert('通信エラーが発生しました。もう一度お試しください。');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
}

// リセット
function resetApp() {
    currentQuestion = 0;
    scores = {
        red: 0,
        pink: 0,
        white: 0,
        green: 0,
        navy: 0,
        black: 0,
        gold: 0
    };
    // 毎回ランダムに5問抽出
    questions = shuffleAndSelect(questionsPool, 5);
    elements.totalQ.textContent = questions.length;

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

    // 予約ボタンクリック
    elements.reserveBtn.addEventListener('click', () => {
        showReservationScreen();
    });

    // 予約フォーム送信
    elements.reservationForm.addEventListener('submit', (e) => {
        handleReservationSubmit(e);
    });

    // クーポン画面へ戻る
    elements.backToSpecialBtn.addEventListener('click', () => {
        showScreen('special');
    });

    // トップに戻る
    elements.homeBtn.addEventListener('click', () => {
        showScreen('start');
    });
}

// 初期化
initEventListeners();
