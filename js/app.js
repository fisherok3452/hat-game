import {t,getLang,setLang} from "./i18n.js?v=11.2";
import {categories,categoryNames,teamNames} from "./data.js?v=11.2";
import {recommendedWords,buildTurnOrder,pickCard,markGuess,uniqueGuessed,allCardsExhausted} from "./game.js?v=11.2";
import {save,load,clear} from "./storage.js?v=11.2";

const app=document.querySelector("#app");
const $=(selector)=>document.querySelector(selector);
const $$=(selector)=>[...document.querySelectorAll(selector)];
let S=load()||fresh();
let timer=null;

function fresh(){return {screen:"home",playersCount:4,teamCount:2,teams:[],selectedCats:categories.map(x=>x[0]),difficulty:"mixed",turnSeconds:45,turns:2,wordsCount:48,wordsManual:false,customWords:[],round:1,roundPool:[],guesses:{1:{},2:{},3:{}},turnOrder:[],turnIndex:0,currentCard:null,turnCorrect:0,turnSkipped:0,skippedThisTurn:[],turnGuessedIds:[],gameWords:[],lastChance:false,tiebreak:null}}
function persist(){save(S)}
function shell(body,back=false){
  app.innerHTML=`<main class="shell"><div class="topbar"><button class="brand home-link" id="brandHome" type="button">&#x1F3A9; ${t("app")}</button><div>${back?`<button class="icon-btn" id="back" type="button">â</button>`:""}<button class="icon-btn" id="settings" type="button">&#x2699;&#xFE0F;</button></div></div>${body}</main>`;
  $("#brandHome")?.addEventListener("click", goHome);
  if(back) $("#back")?.addEventListener("click", goBack);
  $("#settings")?.addEventListener("click", openSettings);
}
function goHome(){
  if(S.screen==="home") return;
  if(S.screen==="settings"){
    const resume=S.returnScreen || S.resumeScreen;
    if(resume) S.resumeScreen=resume;
  } else {
    S.resumeScreen=S.screen;
  }
  delete S.returnScreen;
  S.screen="home";
  persist();
  render();
}
function go(screen){S.screen=screen;persist();render()}
function openSettings(){if(S.screen!=="settings")S.returnScreen=S.screen;S.screen="settings";persist();render()}
function goBack(){const map={players:"home",teams:"players",names:"teams",balance:"names",categories:"names",difficulty:"categories",gameSettings:"difficulty",custom:"gameSettings",ready:"custom",roundIntro:"ready"};go(map[S.screen]||"home")}
function render(){
  clearInterval(timer); timer=null;
  ({home,settings,players,teams,names,balance,categories:categoriesScreen,difficulty,gameSettings,custom,ready,roundIntro,preTurn,play,lastChance,turnResult,roundResult,final,tiebreakIntro,tiebreakPreTurn,tiebreakPlay,tiebreakLastChance,tiebreakTurnResult,tiebreakResult}[S.screen]||home)();
}
function home(){
 const has=!!S.resumeScreen;
 shell(`<section class="hero"><div class="hat">&#x1F3A9;</div><h1>${t("app")}</h1><p class="muted">${t("tag")}</p></section>
 <button class="btn primary" id="new">${t("newGame")}</button>${has?`<button class="btn secondary" id="cont">${t("continueGame")}</button>`:""}`);
 $("#new").onclick=()=>{clear();S=fresh();go("players")};
 $("#cont")?.addEventListener("click",()=>{const target=S.resumeScreen;delete S.resumeScreen;S.screen=target;persist();render()});
}
function settings(){
 shell(`<h1>${t("settings")}</h1><div class="card"><h3>${t("language")}</h3><div class="pill-row">${[["ru","Ð ÑÑÑÐºÐ¸Ð¹"],["uk","Ð£ÐºÑÐ°ÑÐ½ÑÑÐºÐ°"],["en","English"]].map(([k,v])=>`<button class="pill ${getLang()==k?"selected":""}" data-l="${k}">${v}</button>`).join("")}</div></div><button class="btn secondary" id="done">${t("back")}</button>`,true);
 $$("[data-l]").forEach(b=>b.onclick=()=>{setLang(b.dataset.l);persist();render()});
 const returnFromSettings=()=>{
   const target=S.returnScreen || S.resumeScreen || "home";
   delete S.returnScreen;
   S.screen=target;
   persist();
   render();
 };
 $("#done").onclick=returnFromSettings;
 $("#back").onclick=returnFromSettings;
}
function players(){
 shell(`<h1>${t("playersQ")}</h1><p class="muted">${t("minPlayers")}</p><div class="number"><button id="minus">â</button><strong>${S.playersCount}</strong><button id="plus">+</button></div><button class="btn primary" id="next">${t("next")}</button>`,true);
 $("#minus").onclick=()=>{S.playersCount=Math.max(4,S.playersCount-1);render()};$("#plus").onclick=()=>{S.playersCount=Math.min(20,S.playersCount+1);render()};$("#next").onclick=()=>go("teams");
}
function teamOptions(n){let out=[];for(let k=2;k<=Math.floor(n/2);k++){const base=Math.floor(n/k),rem=n%k;if(base>=2)out.push({k,sizes:Array.from({length:k},(_,i)=>base+(i<rem?1:0))})}return out}
function teams(){
 const opts=teamOptions(S.playersCount);
 shell(`<h1>${t("teamsQ")}</h1><p class="muted">${t("chooseTeams")}</p><div class="team-options">${opts.map((o,i)=>`<button class="choice team-option" data-i="${i}"><strong>${o.k} ${t("teams")}</strong><span class="split">${o.sizes.join(" + ")}</span>${new Set(o.sizes).size>1?`<span class="small muted">${t("uneven")}</span>`:""}</button>`).join("")}</div>`,true);
 $$("[data-i]").forEach(b=>b.onclick=()=>{const o=opts[+b.dataset.i];S.teamCount=o.k;const names=teamNames(getLang(),o.k);S.teams=o.sizes.map((size,i)=>({id:i,name:names[i].name,emoji:names[i].emoji,score:0,roundScore:0,players:Array.from({length:size},(_,j)=>({id:`${i}-${j}-${Date.now()}`,name:"",guessOnly:false}))}));go("names")});
}
function names(){
 shell(`<h1>${t("enterNames")}</h1>${S.teams.map((team,ti)=>`<div class="card"><div class="team-title">${team.emoji} ${team.name}</div>${team.players.map((p,pi)=>`<div class="field"><label>${t("player")} ${pi+1}</label><input data-ti="${ti}" data-pi="${pi}" value="${p.name||""}" placeholder="${t("player")} ${pi+1}"></div>`).join("")}</div>`).join("")}<button class="btn primary" id="next">${t("next")}</button>`,true);
 $$("input").forEach(i=>i.oninput=()=>{S.teams[+i.dataset.ti].players[+i.dataset.pi].name=i.value;persist()});
 $("#next").onclick=()=>{if(S.teams.some(x=>x.players.some(p=>!p.name.trim()))){alert(t("enterNames"));return} const min=Math.min(...S.teams.map(x=>x.players.length)); if(S.teams.some(x=>x.players.length>min))go("balance");else go("categories")};
}
function balance(){
 const min=Math.min(...S.teams.map(x=>x.players.length));
 shell(`<h1>${t("balanceTitle")}</h1><p>${t("balanceText")}</p>${S.teams.filter(x=>x.players.length>min).map(team=>`<div class="card"><div class="team-title">${team.emoji} ${team.name}</div><p class="muted">${team.players.length-min} \u00D7 ${t("guessOnly")}</p>${team.players.map(p=>`<button class="pill ${p.guessOnly?"selected":""}" data-team="${team.id}" data-p="${p.id}">${p.name}</button>`).join(" ")}</div>`).join("")}<button class="btn primary" id="next">${t("next")}</button>`,true);
 $$("[data-p]").forEach(b=>b.onclick=()=>{const team=S.teams.find(x=>x.id==b.dataset.team),p=team.players.find(x=>x.id==b.dataset.p),need=team.players.length-min,chosen=team.players.filter(x=>x.guessOnly).length;if(p.guessOnly)p.guessOnly=false;else if(chosen<need)p.guessOnly=true;render()});
 $("#next").onclick=()=>{if(S.teams.some(team=>team.players.filter(p=>p.guessOnly).length!==team.players.length-min)){alert(t("balanceText"));return}go("categories")};
}
function categoriesScreen(){
 const lang=getLang();
 shell(`<h1>${t("categories")}</h1><p class="muted">${t("catHint")}</p><button class="choice ${S.selectedCats.length===categories.length?"selected":""}" id="all">\u2713 ${t("allCats")}</button><div class="spacer"></div><div class="grid">${categories.map(([k,e])=>`<button class="choice ${S.selectedCats.includes(k)?"selected":""}" data-c="${k}">${e} ${categoryNames[lang][k]}</button>`).join("")}</div><button class="btn primary" id="next">${t("next")}</button>`,true);
 $("#all").onclick=()=>{S.selectedCats=S.selectedCats.length===categories.length?[]:categories.map(x=>x[0]);render()};$$("[data-c]").forEach(b=>b.onclick=()=>{const k=b.dataset.c;S.selectedCats=S.selectedCats.includes(k)?S.selectedCats.filter(x=>x!==k):[...S.selectedCats,k];render()});$("#next").onclick=()=>{if(!S.selectedCats.length)return alert(t("categories"));go("difficulty")};
}
function difficulty(){
 const opts=[["easy",t("easy")],["normal",t("normal")],["hard",t("hard")],["mixed","\u{1F3B2} "+t("mixed")]];
 shell(`<h1>${t("difficulty")}</h1><div class="difficulty-options">${opts.map(([k,v])=>`<button class="choice difficulty-option ${S.difficulty===k?"selected":""}" data-d="${k}"><strong>${v}</strong></button>`).join("")}</div><button class="btn primary" id="next">${t("next")}</button>`,true);
 $$("[data-d]").forEach(b=>b.onclick=()=>{S.difficulty=b.dataset.d;render()});$("#next").onclick=()=>go("gameSettings");
}
function activeCount(){return S.teams.reduce((n,t)=>n+t.players.filter(p=>!p.guessOnly).length,0)}
function gameSettings(){
 const rec=recommendedWords(activeCount(),S.turns); if(!S.wordsManual)S.wordsCount=rec;
 shell(`<h1>${t("gameSettings")}</h1><div class="card"><h3>${t("words")}</h3><div class="number"><button id="wm">â</button><strong>${S.wordsCount}</strong><button id="wp">+</button></div><p class="muted center">${t("recommended")}: ${rec}</p></div>
 <div class="card"><h3>${t("turnTime")}</h3><div class="grid3">${[30,45,60].map(x=>`<button class="pill ${S.turnSeconds===x?"selected":""}" data-sec="${x}">${x}</button>`).join("")}</div></div>
 <div class="card"><h3>${t("turns")}</h3><div class="grid3">${[1,2,3].map(x=>`<button class="pill ${S.turns===x?"selected":""}" data-turn="${x}">${x}</button>`).join("")}</div></div><button class="btn primary" id="next">${t("next")}</button>`,true);
 $("#wm").onclick=()=>{S.wordsManual=true;S.wordsCount=Math.max(8,S.wordsCount-4);render()};$("#wp").onclick=()=>{S.wordsManual=true;S.wordsCount+=4;render()};$$("[data-sec]").forEach(b=>b.onclick=()=>{S.turnSeconds=+b.dataset.sec;render()});$$("[data-turn]").forEach(b=>b.onclick=()=>{S.turns=+b.dataset.turn;render()});$("#next").onclick=()=>go("custom");
}
function custom(){
 shell(`<h1>${t("customTitle")}</h1><p class="muted">${t("customHint")}</p><div class="field"><input id="cw"><button class="btn secondary" id="add">${t("add")}</button></div><div class="pill-row">${S.customWords.map((w,i)=>`<button class="pill" data-x="${i}">${w} \u00D7</button>`).join("")}</div><button class="btn primary" id="next">${S.customWords.length?t("next"):t("skipSetup")}</button>`,true);
 $("#add").onclick=()=>{const v=$("#cw").value.trim();if(v){S.customWords.push(v);render()}};$$("[data-x]").forEach(b=>b.onclick=()=>{S.customWords.splice(+b.dataset.x,1);render()});$("#next").onclick=()=>go("ready");
}
function ready(){
 shell(`<div class="center"><h1>\u{1F3A9} ${t("ready")}</h1></div>${S.teams.map(x=>`<div class="card center"><div class="team-title">${x.emoji} ${x.name}</div><p>${x.players.map(p=>p.name+(p.guessOnly?` (${t("guessOnly")})`:"")).join(" \u00B7 ")}</p></div>`).join("")}<div class="card"><div class="summary"><span>${t("words")}</span><strong>${S.wordsCount}</strong></div><div class="summary"><span>${t("turnTime")}</span><strong>${S.turnSeconds}s</strong></div><div class="summary"><span>${t("turns")}</span><strong>${S.turns}</strong></div></div><button class="btn primary" id="start">${t("startGame")}</button>`,true);
 $("#start").onclick=startGame;
}
async function startGame(){
 try{
  const res=await fetch(`data/words-${getLang()}.json`);let words=await res.json();
  words=words.filter(w=>S.selectedCats.includes(w.category)&&(S.difficulty==="mixed"||w.difficulty===S.difficulty));
  const custom=S.customWords.map((word,i)=>({id:`custom-${i}`,word,category:"funny",difficulty:"normal"}));
  words=words.sort(()=>Math.random()-.5).slice(0,Math.max(0,S.wordsCount-custom.length));
  S.gameWords=[...custom,...words].slice(0,S.wordsCount);S.roundPool=[...S.gameWords];S.round=1;S.guesses={1:{},2:{},3:{}};S.teams.forEach(x=>{x.score=0;x.roundScore=0});S.screen="roundIntro";persist();render();
 }catch(e){alert("ÐÐµ ÑÐ´Ð°Ð»Ð¾ÑÑ Ð·Ð°Ð³ÑÑÐ·Ð¸ÑÑ ÑÐ»Ð¾Ð²Ð°ÑÑ. ÐÑÐ¾Ð²ÐµÑÑÑÐµ ÑÐ°Ð¹Ð»Ñ data/words-*.json");}
}
function roundIntro(){
 const title=S.round===1?t("r1"):S.round===2?t("r2"):t("r3"), rules=S.round===1?t("r1rules"):S.round===2?t("r2rules"):t("r3rules");
 shell(`<div class="center"><p>${t("round")} ${S.round}</p><h1>${title}</h1><div class="card"><p>${rules}</p><strong>${t("eachPoint")}</strong></div><p class="muted">${S.roundPool.length} ${t("words").toLowerCase()}</p></div><button class="btn primary" id="start">${t("startRound")} ${S.round}</button>`);
 $("#start").onclick=()=>{S.teams.forEach(x=>x.roundScore=0);S.turnOrder=buildTurnOrder(S.teams,S.turns,(S.round-1)%S.teams.length);S.turnIndex=0;go("preTurn")};
}
function currentTurn(){return S.turnOrder[S.turnIndex]}
function preTurn(){
 if(allCardsExhausted(S))return endRound();
 if(S.turnIndex>=S.turnOrder.length)return endRound();
 const x=currentTurn(),team=S.teams[x.teamIndex];
 shell(`<div class="center"><div class="team-title">${team.emoji} ${team.name}</div><h1>${x.playerName}, ${t("yourTurn")}</h1><p>${t("passPhone")} <strong>${x.playerName}</strong>.</p><div class="card"><strong>${t("round")} ${S.round} \u00B7 ${t("turn")} ${x.personalTurn} ${t("of")} ${S.turns}</strong><p>${S.turnSeconds} ${t("seconds")} \u00B7 2 ${t("skips")}</p></div></div><button class="btn primary" id="start">${t("startTurn")}</button>`);
 $("#start").onclick=()=>beginTurn();
}
function beginTurn(){
 const x=currentTurn();S.turnCorrect=0;S.turnSkipped=0;S.skippedThisTurn=[];S.turnGuessedIds=[];S.lastChance=false;S.emptyEnded=false;S.timeLeft=S.turnSeconds;S.currentCard=pickCard(S,x.teamIndex,[]);if(!S.currentCard){return emptyTurn()}S.screen="play";persist();render();
}
function play(){
 const x=currentTurn(),team=S.teams[x.teamIndex],lang=getLang(),c=S.currentCard;
 shell(`<div class="game-top"><strong>${team.emoji} ${team.name} \u00B7 ${x.playerName}</strong><div class="small muted">${t("round")} ${S.round} ${t("of")} 3 \u00B7 ${t("turn")} ${x.personalTurn} ${t("of")} ${S.turns}</div><div class="timer" id="timer">${fmt(S.timeLeft)}</div></div>
 <div class="word-card"><div class="category">${categoryNames[lang][c.category]||""}</div><div class="word">${c.word}</div></div>
 <div class="game-actions"><button class="btn correct" id="correct">${t("correct")}</button><button class="btn skip" id="skip" ${S.turnSkipped>=2?"disabled":""}>${t("skip")}<br><span class="small">${2-S.turnSkipped} ${t("left")}</span></button></div>`);
 $("#correct").onclick=()=>answer(true);$("#skip").onclick=()=>answer(false);
 timer=setInterval(()=>{S.timeLeft--;$("#timer").textContent=fmt(S.timeLeft);if(S.timeLeft<=0){clearInterval(timer);S.timeLeft=0;S.lastChance=true;S.screen="lastChance";persist();render()}},1000);
}
function fmt(n){return `0:${String(Math.max(0,n)).padStart(2,"0")}`}
function answer(ok){
 const x=currentTurn(),id=S.currentCard.id;$("#correct").disabled=true;$("#skip").disabled=true;
 if(ok){if(markGuess(S,id,x.teamIndex)){S.turnCorrect++;S.turnGuessedIds.push(id)}}else{S.turnSkipped++;S.skippedThisTurn.push(id)}
 S.currentCard=pickCard(S,x.teamIndex,S.skippedThisTurn);
 if(!S.currentCard){clearInterval(timer);return emptyTurn()}
 persist();setTimeout(render,180);
}
function lastChance(){
 const x=currentTurn(),team=S.teams[x.teamIndex],lang=getLang(),c=S.currentCard;
 if(!c)return finishTurn();
 shell(`<div class="game-top"><strong>${team.emoji} ${team.name} \u00B7 ${x.playerName}</strong><div class="small muted">${t("round")} ${S.round} ${t("of")} 3 \u00B7 ${t("turn")} ${x.personalTurn} ${t("of")} ${S.turns}</div><div class="timer expired">0:00</div><div class="last-chance-label">${t("lastChance")}</div></div>
 <div class="word-card"><div class="category">${categoryNames[lang][c.category]||""}</div><div class="word">${c.word}</div></div>
 <div class="game-actions final-answer"><button class="btn correct" id="correct">${t("correct")}</button><button class="btn skip" id="miss">${t("notGuessed")}</button></div>`);
 $("#correct").onclick=()=>resolveLastCard(true);$("#miss").onclick=()=>resolveLastCard(false);
}
function resolveLastCard(ok){
 const x=currentTurn(),id=S.currentCard?.id;
 if(ok&&id&&markGuess(S,id,x.teamIndex)){S.turnCorrect++;S.turnGuessedIds.push(id)}
 S.currentCard=null;S.lastChance=false;finishTurn();
}
function emptyTurn(){S.emptyEnded=true;finishTurn()}
function finishTurn(){clearInterval(timer);S.currentCard=null;S.lastChance=false;S.screen="turnResult";persist();render()}
function turnResult(){
 const x=currentTurn(),team=S.teams[x.teamIndex],last=S.turnIndex>=S.turnOrder.length-1||allCardsExhausted(S);
 const guessedCards=(S.turnGuessedIds||[]).map(id=>S.roundPool.find(c=>c.id===id)).filter(Boolean);
 shell(`<div class="center"><h1>${S.emptyEnded?t("emptyHat"):t("time")}</h1>${S.emptyEnded?`<p class="muted">${t("emptyText")}</p>`:""}<div class="team-title">${team.emoji} ${team.name}</div><p>${t("earned")}</p><div class="score-big">+${S.turnCorrect}</div><p>${t("guessed")}: ${S.turnCorrect} \u00B7 ${t("skipped")}: ${S.turnSkipped}</p></div>
 ${guessedCards.length?`<div class="card guessed-list"><h3>${t("guessedWords")}</h3>${guessedCards.map((c,i)=>`<div class="guessed-word"><span>${i+1}.</span><strong>${c.word}</strong></div>`).join("")}</div>`:`<div class="card center muted">${t("noGuessedWords")}</div>`}
 <div class="card">${S.teams.map(q=>`<div class="summary"><span>${q.emoji} ${q.name}</span><strong>${q.score}</strong></div>`).join("")}</div><button class="btn primary" id="next">${last?t("finishRound"):t("nextTurn")}</button>`);
 S.emptyEnded=false;$("#next").onclick=()=>{if(last)endRound();else{S.turnIndex++;go("preTurn")}};
}
function endRound(){
 const unique=uniqueGuessed(S);
 if(unique.length===0){alert(t("noWords"));S.screen="roundIntro";persist();return render()}
 S.lastUnique=unique.length;S.nextPool=[...unique];S.screen="roundResult";persist();render();
}
function roundResult(){
 shell(`<div class="center"><h1>${t("roundDone")}</h1><p>${t("round")} ${S.round}</p></div>${S.teams.map(q=>`<div class="card"><div class="team-title">${q.emoji} ${q.name}</div><div class="summary"><span>${t("round")} ${S.round}</span><strong>+${q.roundScore}</strong></div><div class="summary"><span>${t("score")}</span><strong>${q.score}</strong></div></div>`).join("")}<div class="notice"><strong>${t("unique")}: ${S.lastUnique} ${t("of")} ${S.roundPool.length}</strong>${S.round<3?`<br>${S.roundPool.length} ${t("allReturnNext")}`:""}</div><button class="btn primary" id="next">${S.round===3?t("showResults"):t("continue")}</button>`);
 $("#next").onclick=()=>{if(S.round===3)return go("final");S.round++;S.roundPool=[...S.gameWords];go("roundIntro")};
}
function final(){
 const max=Math.max(...S.teams.map(x=>x.score)),wins=S.teams.map((x,i)=>({x,i})).filter(o=>o.x.score===max);
 if(wins.length>1){startTiebreak(wins.map(o=>o.i));return}
 const w=wins[0].x;
 shell(`<div class="center"><h1>\u{1F389} ${t("gameOver")}</h1><p>${t("winner")}</p><div class="hat">${w.emoji}</div><h2>${w.name}</h2></div><div class="card">${[...S.teams].sort((a,b)=>b.score-a.score).map(q=>`<div class="summary"><span>${q.emoji} ${q.name}</span><strong>${q.score}</strong></div>`).join("")}</div><button class="btn primary" id="new">${t("newAgain")}</button>`);
 $("#new").onclick=()=>{clear();S=fresh();render()};
}
function startTiebreak(teamIndexes){
 S.tiebreak={teamIndexes,cycle:1,teamPos:0,scores:Object.fromEntries(teamIndexes.map(i=>[i,0])),guesses:{},playerCursor:Object.fromEntries(teamIndexes.map(i=>[i,0])),timeLeft:30,turnCorrect:0,turnGuessedIds:[],skipped:[],currentCard:null};
 go("tiebreakIntro");
}
function tbTeamIndex(){return S.tiebreak.teamIndexes[S.tiebreak.teamPos]}
function tbTeam(){return S.teams[tbTeamIndex()]}
function tbPlayer(){const ti=tbTeamIndex(),a=S.teams[ti].players.filter(p=>!p.guessOnly),n=S.tiebreak.playerCursor[ti]||0;return a[n%a.length]}
function tiebreakIntro(){
 const tb=S.tiebreak;
 shell(`<div class="center"><div class="hat">â¡</div><h1>${t("tiebreak")}</h1><p>${t("tiebreakText")}</p><div class="card"><strong>${t("tiebreakCycle")} ${tb.cycle}</strong><p>${t("tiebreakRule")}</p></div></div><div class="card">${tb.teamIndexes.map(i=>`<div class="summary"><span>${S.teams[i].emoji} ${S.teams[i].name}</span><strong>${S.teams[i].score}</strong></div>`).join("")}</div><button class="btn primary" id="start">${t("startTiebreak")}</button>`);
 $("#start").onclick=()=>go("tiebreakPreTurn");
}
function tiebreakPreTurn(){
 const team=tbTeam(),p=tbPlayer(),tb=S.tiebreak;
 shell(`<div class="center"><div class="team-title">${team.emoji} ${team.name}</div><h1>${p.name}, ${t("yourTurn")}</h1><p>${t("passPhone")} <strong>${p.name}</strong>.</p><div class="card"><strong>${t("tiebreak")} \u00B7 ${t("tiebreakCycle")} ${tb.cycle}</strong><p>30 ${t("seconds")} \u00B7 ${t("r3")}</p></div></div><button class="btn primary" id="start">${t("startTurn")}</button>`);
 $("#start").onclick=beginTiebreakTurn;
}
function tbPick(excluded=[]){
 const tb=S.tiebreak,ti=tbTeamIndex(),used=tb.guesses[ti]||[];
 const cards=S.roundPool.filter(c=>!used.includes(c.id)&&!excluded.includes(c.id));
 return cards.length?cards[Math.floor(Math.random()*cards.length)]:null;
}
function beginTiebreakTurn(){
 const tb=S.tiebreak;tb.turnCorrect=0;tb.turnGuessedIds=[];tb.skipped=[];tb.timeLeft=30;tb.currentCard=tbPick([]);
 if(!tb.currentCard)return finishTiebreakTurn();go("tiebreakPlay");
}
function tiebreakPlay(){
 const tb=S.tiebreak,team=tbTeam(),p=tbPlayer(),c=tb.currentCard,lang=getLang();
 shell(`<div class="game-top"><strong>${team.emoji} ${team.name} \u00B7 ${p.name}</strong><div class="small muted">${t("tiebreak")} \u00B7 ${t("tiebreakCycle")} ${tb.cycle}</div><div class="timer" id="timer">${fmt(tb.timeLeft)}</div></div><div class="word-card"><div class="category">${categoryNames[lang][c.category]||""}</div><div class="word">${c.word}</div></div><div class="game-actions"><button class="btn correct" id="correct">${t("correct")}</button><button class="btn skip" id="skip">${t("skip")}</button></div>`);
 $("#correct").onclick=()=>tbAnswer(true);$("#skip").onclick=()=>tbAnswer(false);
 timer=setInterval(()=>{tb.timeLeft--;$("#timer").textContent=fmt(tb.timeLeft);if(tb.timeLeft<=0){clearInterval(timer);tb.timeLeft=0;go("tiebreakLastChance")}},1000);
}
function tbAnswer(ok){
 const tb=S.tiebreak,ti=tbTeamIndex(),id=tb.currentCard.id;
 if(ok){tb.guesses[ti]??=[];if(!tb.guesses[ti].includes(id)){tb.guesses[ti].push(id);tb.turnCorrect++;tb.scores[ti]++;tb.turnGuessedIds.push(id)}}else tb.skipped.push(id);
 tb.currentCard=tbPick(tb.skipped);if(!tb.currentCard){clearInterval(timer);return finishTiebreakTurn()}persist();setTimeout(render,180);
}
function tiebreakLastChance(){
 const tb=S.tiebreak,team=tbTeam(),p=tbPlayer(),c=tb.currentCard,lang=getLang();
 shell(`<div class="game-top"><strong>${team.emoji} ${team.name} \u00B7 ${p.name}</strong><div class="small muted">${t("tiebreak")}</div><div class="timer expired">0:00</div><div class="last-chance-label">${t("lastChance")}</div></div><div class="word-card"><div class="category">${categoryNames[lang][c.category]||""}</div><div class="word">${c.word}</div></div><div class="game-actions final-answer"><button class="btn correct" id="correct">${t("correct")}</button><button class="btn skip" id="miss">${t("notGuessed")}</button></div>`);
 $("#correct").onclick=()=>{const ti=tbTeamIndex(),id=tb.currentCard.id;tb.guesses[ti]??=[];if(!tb.guesses[ti].includes(id)){tb.guesses[ti].push(id);tb.turnCorrect++;tb.scores[ti]++;tb.turnGuessedIds.push(id)}finishTiebreakTurn()};
 $("#miss").onclick=finishTiebreakTurn;
}
function finishTiebreakTurn(){clearInterval(timer);S.tiebreak.currentCard=null;go("tiebreakTurnResult")}
function tiebreakTurnResult(){
 const tb=S.tiebreak,team=tbTeam(),cards=tb.turnGuessedIds.map(id=>S.roundPool.find(c=>c.id===id)).filter(Boolean),last=tb.teamPos===tb.teamIndexes.length-1;
 shell(`<div class="center"><h1>${t("time")}</h1><div class="team-title">${team.emoji} ${team.name}</div><p>${t("earned")}</p><div class="score-big">+${tb.turnCorrect}</div></div>${cards.length?`<div class="card guessed-list"><h3>${t("guessedWords")}</h3>${cards.map((c,i)=>`<div class="guessed-word"><span>${i+1}.</span><strong>${c.word}</strong></div>`).join("")}</div>`:`<div class="card center muted">${t("noGuessedWords")}</div>`}<div class="card">${tb.teamIndexes.map(i=>`<div class="summary"><span>${S.teams[i].emoji} ${S.teams[i].name}</span><strong>${tb.scores[i]}</strong></div>`).join("")}</div><button class="btn primary" id="next">${last?t("showTiebreakResults"):t("nextTurn")}</button>`);
 $("#next").onclick=()=>{const ti=tbTeamIndex();tb.playerCursor[ti]=(tb.playerCursor[ti]||0)+1;if(last)go("tiebreakResult");else{tb.teamPos++;go("tiebreakPreTurn")}};
}
function tiebreakResult(){
 const tb=S.tiebreak,max=Math.max(...tb.teamIndexes.map(i=>tb.scores[i])),wins=tb.teamIndexes.filter(i=>tb.scores[i]===max);
 if(wins.length===1){const w=S.teams[wins[0]];shell(`<div class="center"><h1>\u{1F389} ${t("gameOver")}</h1><p>${t("tiebreakWinner")}</p><div class="hat">${w.emoji}</div><h2>${w.name}</h2><p>${t("mainScore")}: ${w.score} \u00B7 ${t("tiebreak")}: ${tb.scores[wins[0]]}</p></div><div class="card">${S.teams.map(q=>`<div class="summary"><span>${q.emoji} ${q.name}</span><strong>${q.score}</strong></div>`).join("")}</div><button class="btn primary" id="new">${t("newAgain")}</button>`);$("#new").onclick=()=>{clear();S=fresh();render()};return}
 tb.teamIndexes=wins;tb.cycle++;tb.teamPos=0;tb.scores=Object.fromEntries(wins.map(i=>[i,0]));tb.guesses={};go("tiebreakIntro");
}
render();
