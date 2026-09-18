export const categories = [
  ["movies","🎬"],["animals","🐾"],["food","🍕"],["places","🌍"],["sports","⚽"],["music","🎵"],
  ["people","👤"],["jobs","💼"],["objects","📦"],["nature","🌿"],["tech","💻"],["history","📚"],["funny","😂"]
];

export const categoryNames = {
  ru:{movies:"Кино и сериалы",animals:"Животные",food:"Еда и напитки",places:"Места",sports:"Спорт",music:"Музыка",people:"Люди и персонажи",jobs:"Профессии",objects:"Предметы",nature:"Природа",tech:"Технологии",history:"История",funny:"Смешное и случайное"},
  uk:{movies:"Кіно і серіали",animals:"Тварини",food:"Їжа та напої",places:"Місця",sports:"Спорт",music:"Музика",people:"Люди та персонажі",jobs:"Професії",objects:"Предмети",nature:"Природа",tech:"Технології",history:"Історія",funny:"Смішне та випадкове"},
  en:{movies:"Movies & TV",animals:"Animals",food:"Food & Drinks",places:"Places",sports:"Sports",music:"Music",people:"People & Characters",jobs:"Professions",objects:"Objects",nature:"Nature",tech:"Technology",history:"History",funny:"Funny & Random"}
};

const animals = {
  ru:[
    {name:"Тигры",emoji:"🐯"},{name:"Зайцы",emoji:"🐰"},{name:"Панды",emoji:"🐼"},
    {name:"Еноты",emoji:"🦝"},{name:"Лисы",emoji:"🦊"},{name:"Выдры",emoji:"🦦"},
    {name:"Пингвины",emoji:"🐧"},{name:"Капибары",emoji:"🦫"},{name:"Ламы",emoji:"🦙"},
    {name:"Ежи",emoji:"🦔"},{name:"Коты",emoji:"🐱"},{name:"Бобры",emoji:"🦫"},
    {name:"Утки",emoji:"🦆"},{name:"Ленивцы",emoji:"🦥"},{name:"Белки",emoji:"🐿️"}
  ],
  uk:[
    {name:"Тигри",emoji:"🐯"},{name:"Зайці",emoji:"🐰"},{name:"Панди",emoji:"🐼"},
    {name:"Єноти",emoji:"🦝"},{name:"Лисиці",emoji:"🦊"},{name:"Видри",emoji:"🦦"},
    {name:"Пінгвіни",emoji:"🐧"},{name:"Капібари",emoji:"🦫"},{name:"Лами",emoji:"🦙"},
    {name:"Їжаки",emoji:"🦔"},{name:"Коти",emoji:"🐱"},{name:"Бобри",emoji:"🦫"},
    {name:"Качки",emoji:"🦆"},{name:"Лінивці",emoji:"🦥"},{name:"Білки",emoji:"🐿️"}
  ],
  en:[
    {name:"Tigers",emoji:"🐯"},{name:"Bunnies",emoji:"🐰"},{name:"Pandas",emoji:"🐼"},
    {name:"Raccoons",emoji:"🦝"},{name:"Foxes",emoji:"🦊"},{name:"Otters",emoji:"🦦"},
    {name:"Penguins",emoji:"🐧"},{name:"Capybaras",emoji:"🦫"},{name:"Llamas",emoji:"🦙"},
    {name:"Hedgehogs",emoji:"🦔"},{name:"Cats",emoji:"🐱"},{name:"Beavers",emoji:"🦫"},
    {name:"Ducks",emoji:"🦆"},{name:"Sloths",emoji:"🦥"},{name:"Squirrels",emoji:"🐿️"}
  ]
};

const adjectives = {
  ru:["Танцующие","Бесстрашные","Безумные","Турбо","Хитрые","Весёлые","Летающие","Громкие","Дикие","Шустрые","Сонные","Неуловимые","Секретные","Космические","Легендарные"],
  uk:["Танцюючі","Безстрашні","Шалені","Турбо","Хитрі","Веселі","Літаючі","Гучні","Дикі","Спритні","Сонні","Невловимі","Секретні","Космічні","Легендарні"],
  en:["Dancing","Fearless","Crazy","Turbo","Sneaky","Happy","Flying","Loud","Wild","Speedy","Sleepy","Uncatchable","Secret","Cosmic","Legendary"]
};

function shuffled(arr){
  const copy=[...arr];
  for(let i=copy.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return copy;
}

export function teamNames(lang,count){
  const adj=shuffled(adjectives[lang]);
  const ani=shuffled(animals[lang]);
  const out=[];
  for(let i=0;i<count;i++){
    const animal=ani[i%ani.length];
    out.push({
      name:`${adj[i%adj.length]} ${animal.name}`,
      emoji:animal.emoji
    });
  }
  return out;
}
