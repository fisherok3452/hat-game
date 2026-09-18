export const LANGS = ["ru","uk","en"];

const dict = {
  ru:{
    app:"Шляпа",tag:"Объясняй. Угадывай. Побеждай.",newGame:"НОВАЯ ИГРА",continueGame:"ПРОДОЛЖИТЬ ИГРУ",
    settings:"Настройки",language:"Язык",back:"Назад",next:"ДАЛЕЕ",playersQ:"Сколько вас?",minPlayers:"Минимум 4 игрока.",
    teamsQ:"Как разделимся?",chooseTeams:"Выберите количество команд.",teams:"команды",playersEach:"игроков",
    uneven:"Потребуется выбрать игрока только для угадывания.",enterNames:"Введите имена игроков",player:"Игрок",
    balanceTitle:"Нужно уравнять команды",balanceText:"Выберите игрока, который будет только угадывать слова и не будет объяснять.",
    guessOnly:"только угадывает",categories:"Выберите категории",catHint:"Какие слова попадут в эту игру?",allCats:"Все категории",
    difficulty:"Выберите сложность",easy:"Легко",normal:"Средне",hard:"Сложно",mixed:"Смешанно",
    gameSettings:"Настройки игры",words:"Количество слов",recommended:"Рекомендуем",turnTime:"Время хода",turns:"Ходов на игрока",
    customTitle:"Добавить свои слова?",customHint:"Добавьте имена друзей, местные шутки или любые другие слова.",add:"ДОБАВИТЬ",skipSetup:"ПРОПУСТИТЬ",
    ready:"Всё готово!",startGame:"НАЧАТЬ ИГРУ",round:"РАУНД",r1:"ОБЪЯСНЯЙ СЛОВА",r2:"ОДНО СЛОВО",r3:"ПОКАЖИ БЕЗ СЛОВ",
    r1rules:"Объясняй слово своей команде любыми словами. Нельзя произносить само слово, его части или однокоренные слова.",
    r2rules:"Для каждой карточки можно произнести только одно слово-подсказку. Команда может делать сколько угодно попыток.",
    r3rules:"Показывай слово только жестами и мимикой. Нельзя говорить, произносить звуки, писать или указывать на реальные предметы как на ответ.",
    eachPoint:"Каждое угаданное слово = 1 очко",startRound:"НАЧАТЬ РАУНД",yourTurn:"теперь ты!",passPhone:"Передай телефон игроку",startTurn:"НАЧАТЬ ХОД",
    turn:"Ход",of:"из",seconds:"секунд",correct:"✓ УГАДАНО",skip:"↻ ПРОПУСТИТЬ",left:"осталось",time:"Время!",
    earned:"Заработано за ход",guessed:"Угадано",skipped:"Пропущено",nextTurn:"СЛЕДУЮЩИЙ ХОД",finishRound:"ЗАВЕРШИТЬ РАУНД",
    roundDone:"Раунд завершён!",unique:"Уникальных слов угадано",moveNext:"слов переходят в следующий раунд.",continue:"ПРОДОЛЖИТЬ",
    emptyHat:"Шляпа пуста! 🎩",emptyText:"Для этой команды больше нет доступных слов.",allDone:"Все слова угаданы!",
    showResults:"ПОКАЗАТЬ РЕЗУЛЬТАТЫ",gameOver:"ИГРА ОКОНЧЕНА!",winner:"Победители",tie:"НИЧЬЯ!",newAgain:"НОВАЯ ИГРА",
    noWords:"Ни одного слова!",retryRound:"ПОВТОРИТЬ РАУНД",endGame:"ЗАВЕРШИТЬ ИГРУ",score:"Общий счёт"
  },
  uk:{},
  en:{}
};
dict.uk = {...dict.ru, app:"Капелюх",tag:"Пояснюй. Відгадуй. Перемагай.",newGame:"НОВА ГРА",continueGame:"ПРОДОВЖИТИ ГРУ",settings:"Налаштування",language:"Мова",back:"Назад",next:"ДАЛІ",playersQ:"Скільки вас?",minPlayers:"Мінімум 4 гравці.",teamsQ:"Як поділимось?",chooseTeams:"Оберіть кількість команд.",enterNames:"Введіть імена гравців",player:"Гравець",categories:"Оберіть категорії",allCats:"Усі категорії",difficulty:"Оберіть складність",easy:"Легко",normal:"Середньо",hard:"Складно",mixed:"Змішано",gameSettings:"Налаштування гри",words:"Кількість слів",recommended:"Рекомендуємо",turnTime:"Час ходу",turns:"Ходів на гравця",customTitle:"Додати свої слова?",add:"ДОДАТИ",skipSetup:"ПРОПУСТИТИ",ready:"Усе готово!",startGame:"ПОЧАТИ ГРУ",r1:"ПОЯСНЮЙ СЛОВА",r2:"ОДНЕ СЛОВО",r3:"ПОКАЖИ БЕЗ СЛІВ",startRound:"ПОЧАТИ РАУНД",yourTurn:"тепер ти!",passPhone:"Передай телефон гравцю",startTurn:"ПОЧАТИ ХІД",correct:"✓ ВІДГАДАНО",skip:"↻ ПРОПУСТИТИ",time:"Час!",nextTurn:"НАСТУПНИЙ ХІД",finishRound:"ЗАВЕРШИТИ РАУНД",roundDone:"Раунд завершено!",continue:"ПРОДОВЖИТИ",gameOver:"ГРУ ЗАВЕРШЕНО!",winner:"Переможці",tie:"НІЧИЯ!",newAgain:"НОВА ГРА",score:"Загальний рахунок"};
dict.en = {...dict.ru, app:"Hat Game",tag:"Describe. Guess. Win.",newGame:"NEW GAME",continueGame:"CONTINUE GAME",settings:"Settings",language:"Language",back:"Back",next:"NEXT",playersQ:"How many players?",minPlayers:"Minimum 4 players.",teamsQ:"How should we split?",chooseTeams:"Choose the number of teams.",teams:"teams",playersEach:"players",uneven:"A Guess-Only player will be required.",enterNames:"Enter player names",player:"Player",balanceTitle:"Balance the teams",balanceText:"Choose a player who will only guess and will not give clues.",guessOnly:"Guess Only",categories:"Choose categories",catHint:"Which words should be in this game?",allCats:"All Categories",difficulty:"Choose difficulty",easy:"Easy",normal:"Normal",hard:"Hard",mixed:"Mixed",gameSettings:"Game Settings",words:"Number of words",recommended:"Recommended",turnTime:"Turn time",turns:"Turns per player",customTitle:"Add custom words?",customHint:"Add friends, inside jokes, or any words you like.",add:"ADD",skipSetup:"SKIP",ready:"Ready to play!",startGame:"START GAME",round:"ROUND",r1:"DESCRIBE IT",r2:"ONE WORD",r3:"CHARADES",eachPoint:"Each guessed word = 1 point",startRound:"START ROUND",yourTurn:"you're up!",passPhone:"Pass the phone to",startTurn:"START TURN",turn:"Turn",of:"of",seconds:"seconds",correct:"✓ CORRECT",skip:"↻ SKIP",left:"left",time:"Time!",earned:"Points this turn",guessed:"Guessed",skipped:"Skipped",nextTurn:"NEXT TURN",finishRound:"FINISH ROUND",roundDone:"Round complete!",unique:"Unique words guessed",moveNext:"words move to the next round.",continue:"CONTINUE",emptyHat:"The hat is empty! 🎩",emptyText:"No scoring cards are available for this team.",allDone:"All words guessed!",showResults:"SHOW RESULTS",gameOver:"GAME OVER!",winner:"Winners",tie:"TIE!",newAgain:"NEW GAME",score:"Total score"};

export function t(key){ const l=localStorage.getItem("hat_lang")||"ru"; return dict[l]?.[key] ?? dict.ru[key] ?? key; }
export function getLang(){return localStorage.getItem("hat_lang")||"ru"}
export function setLang(l){localStorage.setItem("hat_lang",l)}

