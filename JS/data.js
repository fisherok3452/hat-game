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
  ru:["Тигры","Зайцы","Панды","Еноты","Лисы","Выдры","Пингвины","Капибары","Ламы","Ежи","Коты","Бобры","Утки","Ленивцы","Белки"],
  uk:["Тигри","Зайці","Панди","Єноти","Лисиці","Видри","Пінгвіни","Капібари","Лами","Їжаки","Коти","Бобри","Качки","Лінивці","Білки"],
  en:["Tigers","Bunnies","Pandas","Raccoons","Foxes","Otters","Penguins","Capybaras","Llamas","Hedgehogs","Cats","Beavers","Ducks","Sloths","Squirrels"]
};
const adjectives = {
  ru:["Танцующие","Бесстрашные","Безумные","Турбо","Хитрые","Весёлые","Летающие","Громкие","Дикие","Шустрые","Сонные","Неуловимые","Секретные","Космические","Легендарные"],
  uk:["Танцюючі","Безстрашні","Шалені","Турбо","Хитрі","Веселі","Літаючі","Гучні","Дикі","Спритні","Сонні","Невловимі","Секретні","Космічні","Легендарні"],
  en:["Dancing","Fearless","Crazy","Turbo","Sneaky","Happy","Flying","Loud","Wild","Speedy","Sleepy","Uncatchable","Secret","Cosmic","Legendary"]
};
export function teamNames(lang,count){
  const a=[...adjectives[lang]], n=[...animals[lang]], out=[];
  const shuffle=x=>x.sort(()=>Math.random()-.5); shuffle(a);shuffle(n);
  for(let i=0;i<count;i++) out.push({name:`${a[i%a.length]} ${n[i%n.length]}`,emoji:["🐯","🐰","🐼","🦝","🦊","🦦","🐧","🐹","🦙","🦔","🐱","🦫","🦆","🦥","🐿️"][i%15]});
  return out;
}
