export function recommendedWords(activePlayers, turns=1){
  return Math.max(4, activePlayers * 12);
}
export function buildTurnOrder(teams, turns, startTeam=0){
  const order=[]; const max=Math.max(...teams.map(t=>t.players.filter(p=>!p.guessOnly).length));
  for(let cycle=0;cycle<turns;cycle++){
    for(let r=0;r<max;r++){
      for(let offset=0;offset<teams.length;offset++){
        const ti=(startTeam+offset)%teams.length;
        const active=teams[ti].players.filter(p=>!p.guessOnly);
        if(active[r]) order.push({teamIndex:ti, playerId:active[r].id, playerName:active[r].name, personalTurn:cycle+1});
      }
    }
  }
  return order;
}
export function eligibleCards(state,teamIndex,blockedAuthorIds=[]){
  const round=state.round;
  return state.roundPool.filter(card=>(state.guesses[round]?.[card.id]||[]).length===0 && !blockedAuthorIds.includes(card.authorId));
}
export function pickCard(state,teamIndex,excluded=[],blockedAuthorIds=[]){
  const strict=eligibleCards(state,teamIndex,blockedAuthorIds).filter(c=>!excluded.includes(c.id));
  if(strict.length) return strict[Math.floor(Math.random()*strict.length)];
  const round=state.round;
  const fallback=state.roundPool.filter(card=>(state.guesses[round]?.[card.id]||[]).length===0 && !excluded.includes(card.id));
  if(!fallback.length) return null;
  return fallback[Math.floor(Math.random()*fallback.length)];
}
export function markGuess(state,cardId,teamIndex){
  const r=state.round;state.guesses[r]??={};state.guesses[r][cardId]??=[];
  if(state.guesses[r][cardId].length===0){
    state.guesses[r][cardId].push(teamIndex);
    state.teams[teamIndex].score++;
    state.teams[teamIndex].roundScore++;
    return true;
  }
  return false;
}
export function unmarkGuess(state,cardId,teamIndex){
  const r=state.round, arr=state.guesses[r]?.[cardId];
  if(!arr||!arr.includes(teamIndex)) return false;
  state.guesses[r][cardId]=arr.filter(x=>x!==teamIndex);
  if(state.guesses[r][cardId].length===0) delete state.guesses[r][cardId];
  state.teams[teamIndex].score=Math.max(0,state.teams[teamIndex].score-1);
  state.teams[teamIndex].roundScore=Math.max(0,state.teams[teamIndex].roundScore-1);
  return true;
}
export function uniqueGuessed(state){
  const g=state.guesses[state.round]||{};
  return state.roundPool.filter(c=>(g[c.id]||[]).length>0);
}
export function allCardsExhausted(state){
  return state.roundPool.every(c=>(state.guesses[state.round]?.[c.id]||[]).length>0);
}
