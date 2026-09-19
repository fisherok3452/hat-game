export const categories = [
  ["movies","\u{1F3AC}"],["animals","\u{1F43E}"],["food","\u{1F355}"],["places","\u{1F30D}"],["sports","\u26BD"],["music","\u{1F3B5}"],
  ["people","\u{1F464}"],["jobs","\u{1F4BC}"],["objects","\u{1F4E6}"],["nature","\u{1F33F}"],["tech","\u{1F4BB}"],["history","\u{1F4DA}"],["funny","\u{1F602}"]
];

export const categoryNames = {
  ru:{movies:"\u041A\u0438\u043D\u043E \u0438 \u0441\u0435\u0440\u0438\u0430\u043B\u044B",animals:"\u0416\u0438\u0432\u043E\u0442\u043D\u044B\u0435",food:"\u0415\u0434\u0430 \u0438 \u043D\u0430\u043F\u0438\u0442\u043A\u0438",places:"\u041C\u0435\u0441\u0442\u0430",sports:"\u0421\u043F\u043E\u0440\u0442",music:"\u041C\u0443\u0437\u044B\u043A\u0430",people:"\u041B\u044E\u0434\u0438 \u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438",jobs:"\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u0438",objects:"\u041F\u0440\u0435\u0434\u043C\u0435\u0442\u044B",nature:"\u041F\u0440\u0438\u0440\u043E\u0434\u0430",tech:"\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438",history:"\u0418\u0441\u0442\u043E\u0440\u0438\u044F",funny:"\u0421\u043C\u0435\u0448\u043D\u043E\u0435 \u0438 \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0435"},
  uk:{movies:"\u041A\u0456\u043D\u043E \u0456 \u0441\u0435\u0440\u0456\u0430\u043B\u0438",animals:"\u0422\u0432\u0430\u0440\u0438\u043D\u0438",food:"\u0407\u0436\u0430 \u0442\u0430 \u043D\u0430\u043F\u043E\u0457",places:"\u041C\u0456\u0441\u0446\u044F",sports:"\u0421\u043F\u043E\u0440\u0442",music:"\u041C\u0443\u0437\u0438\u043A\u0430",people:"\u041B\u044E\u0434\u0438 \u0442\u0430 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0456",jobs:"\u041F\u0440\u043E\u0444\u0435\u0441\u0456\u0457",objects:"\u041F\u0440\u0435\u0434\u043C\u0435\u0442\u0438",nature:"\u041F\u0440\u0438\u0440\u043E\u0434\u0430",tech:"\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0456\u0457",history:"\u0406\u0441\u0442\u043E\u0440\u0456\u044F",funny:"\u0421\u043C\u0456\u0448\u043D\u0435 \u0442\u0430 \u0432\u0438\u043F\u0430\u0434\u043A\u043E\u0432\u0435"},
  en:{movies:"Movies & TV",animals:"Animals",food:"Food & Drinks",places:"Places",sports:"Sports",music:"Music",people:"People & Characters",jobs:"Professions",objects:"Objects",nature:"Nature",tech:"Technology",history:"History",funny:"Funny & Random"}
};

const animals = {
  ru:[
    {name:"\u0422\u0438\u0433\u0440\u044B",emoji:"\u{1F42F}"},{name:"\u0417\u0430\u0439\u0446\u044B",emoji:"\u{1F430}"},{name:"\u041F\u0430\u043D\u0434\u044B",emoji:"\u{1F43C}"},
    {name:"\u0415\u043D\u043E\u0442\u044B",emoji:"\u{1F99D}"},{name:"\u041B\u0438\u0441\u044B",emoji:"\u{1F98A}"},{name:"\u0412\u044B\u0434\u0440\u044B",emoji:"\u{1F9A6}"},
    {name:"\u041F\u0438\u043D\u0433\u0432\u0438\u043D\u044B",emoji:"\u{1F427}"},{name:"\u041A\u0430\u043F\u0438\u0431\u0430\u0440\u044B",emoji:"\u{1F9AB}"},{name:"\u041B\u0430\u043C\u044B",emoji:"\u{1F999}"},
    {name:"\u0415\u0436\u0438",emoji:"\u{1F994}"},{name:"\u041A\u043E\u0442\u044B",emoji:"\u{1F431}"},{name:"\u0411\u043E\u0431\u0440\u044B",emoji:"\u{1F9AB}"},
    {name:"\u0423\u0442\u043A\u0438",emoji:"\u{1F986}"},{name:"\u041B\u0435\u043D\u0438\u0432\u0446\u044B",emoji:"\u{1F9A5}"},{name:"\u0411\u0435\u043B\u043A\u0438",emoji:"\u{1F43F}\uFE0F"}
  ],
  uk:[
    {name:"\u0422\u0438\u0433\u0440\u0438",emoji:"\u{1F42F}"},{name:"\u0417\u0430\u0439\u0446\u0456",emoji:"\u{1F430}"},{name:"\u041F\u0430\u043D\u0434\u0438",emoji:"\u{1F43C}"},
    {name:"\u0404\u043D\u043E\u0442\u0438",emoji:"\u{1F99D}"},{name:"\u041B\u0438\u0441\u0438\u0446\u0456",emoji:"\u{1F98A}"},{name:"\u0412\u0438\u0434\u0440\u0438",emoji:"\u{1F9A6}"},
    {name:"\u041F\u0456\u043D\u0433\u0432\u0456\u043D\u0438",emoji:"\u{1F427}"},{name:"\u041A\u0430\u043F\u0456\u0431\u0430\u0440\u0438",emoji:"\u{1F9AB}"},{name:"\u041B\u0430\u043C\u0438",emoji:"\u{1F999}"},
    {name:"\u0407\u0436\u0430\u043A\u0438",emoji:"\u{1F994}"},{name:"\u041A\u043E\u0442\u0438",emoji:"\u{1F431}"},{name:"\u0411\u043E\u0431\u0440\u0438",emoji:"\u{1F9AB}"},
    {name:"\u041A\u0430\u0447\u043A\u0438",emoji:"\u{1F986}"},{name:"\u041B\u0456\u043D\u0438\u0432\u0446\u0456",emoji:"\u{1F9A5}"},{name:"\u0411\u0456\u043B\u043A\u0438",emoji:"\u{1F43F}\uFE0F"}
  ],
  en:[
    {name:"Tigers",emoji:"\u{1F42F}"},{name:"Bunnies",emoji:"\u{1F430}"},{name:"Pandas",emoji:"\u{1F43C}"},
    {name:"Raccoons",emoji:"\u{1F99D}"},{name:"Foxes",emoji:"\u{1F98A}"},{name:"Otters",emoji:"\u{1F9A6}"},
    {name:"Penguins",emoji:"\u{1F427}"},{name:"Capybaras",emoji:"\u{1F9AB}"},{name:"Llamas",emoji:"\u{1F999}"},
    {name:"Hedgehogs",emoji:"\u{1F994}"},{name:"Cats",emoji:"\u{1F431}"},{name:"Beavers",emoji:"\u{1F9AB}"},
    {name:"Ducks",emoji:"\u{1F986}"},{name:"Sloths",emoji:"\u{1F9A5}"},{name:"Squirrels",emoji:"\u{1F43F}\uFE0F"}
  ]
};

const adjectives = {
  ru:["\u0422\u0430\u043D\u0446\u0443\u044E\u0449\u0438\u0435","\u0411\u0435\u0441\u0441\u0442\u0440\u0430\u0448\u043D\u044B\u0435","\u0411\u0435\u0437\u0443\u043C\u043D\u044B\u0435","\u0422\u0443\u0440\u0431\u043E","\u0425\u0438\u0442\u0440\u044B\u0435","\u0412\u0435\u0441\u0451\u043B\u044B\u0435","\u041B\u0435\u0442\u0430\u044E\u0449\u0438\u0435","\u0413\u0440\u043E\u043C\u043A\u0438\u0435","\u0414\u0438\u043A\u0438\u0435","\u0428\u0443\u0441\u0442\u0440\u044B\u0435","\u0421\u043E\u043D\u043D\u044B\u0435","\u041D\u0435\u0443\u043B\u043E\u0432\u0438\u043C\u044B\u0435","\u0421\u0435\u043A\u0440\u0435\u0442\u043D\u044B\u0435","\u041A\u043E\u0441\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u0435","\u041B\u0435\u0433\u0435\u043D\u0434\u0430\u0440\u043D\u044B\u0435"],
  uk:["\u0422\u0430\u043D\u0446\u044E\u044E\u0447\u0456","\u0411\u0435\u0437\u0441\u0442\u0440\u0430\u0448\u043D\u0456","\u0428\u0430\u043B\u0435\u043D\u0456","\u0422\u0443\u0440\u0431\u043E","\u0425\u0438\u0442\u0440\u0456","\u0412\u0435\u0441\u0435\u043B\u0456","\u041B\u0456\u0442\u0430\u044E\u0447\u0456","\u0413\u0443\u0447\u043D\u0456","\u0414\u0438\u043A\u0456","\u0421\u043F\u0440\u0438\u0442\u043D\u0456","\u0421\u043E\u043D\u043D\u0456","\u041D\u0435\u0432\u043B\u043E\u0432\u0438\u043C\u0456","\u0421\u0435\u043A\u0440\u0435\u0442\u043D\u0456","\u041A\u043E\u0441\u043C\u0456\u0447\u043D\u0456","\u041B\u0435\u0433\u0435\u043D\u0434\u0430\u0440\u043D\u0456"],
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
