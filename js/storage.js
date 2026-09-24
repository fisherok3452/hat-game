const KEY="hat_game_state_combined_v1";
export const save=s=>localStorage.setItem(KEY,JSON.stringify(s));
export const load=()=>{try{return JSON.parse(localStorage.getItem(KEY))}catch{return null}};
export const clear=()=>localStorage.removeItem(KEY);
