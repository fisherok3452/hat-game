export function recommendedWords(activePlayers, turns){
  return Math.max(16, activePlayers * (8 + Math.max(0,turns-1)*4));
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
export function eligibleCards(state, teamIndex){
  const round=state.round;
  return state.roundPool.filter(card => !(state.guesses[round]?.[card.id]||[]).includes(teamIndex));
}
export function pickCard(state, teamIndex, excluded=[]){
  const cards=eligibleCards(state,teamIndex).filter(c=>!excluded.includes(c.id));
  if(!cards.length) return null;
  return cards[Math.floor(Math.random()*cards.length)];
}
export function markGuess(state,cardId,teamIndex){
  const r=state.round; state.guesses[r]??={}; state.guesses[r][cardId]??=[];
  if(!state.guesses[r][cardId].includes(teamIndex)){
    state.guesses[r][cardId].push(teamIndex); state.teams[teamIndex].score++; state.teams[teamIndex].roundScore++;
    return true;
  }
  return false;
}
export function uniqueGuessed(state){
  const g=state.guesses[state.round]||{};
  return state.roundPool.filter(c=>(g[c.id]||[]).length>0);
}
export function allCardsExhausted(state){
  return state.roundPool.every(c => (state.guesses[state.round]?.[c.id]||[]).length >= state.teams.length);
}
