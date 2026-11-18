/* Piano Rocket – avvio */
'use strict';
fillSongs(SONGS[LS('pr_song','')]?LS('pr_song',''):LEVELS[0]);buildPlayers();syncBar();setRange();loop();
const kick=()=>{if($('soundSel').value==='piano')loadSamples();removeEventListener('pointerdown',kick);removeEventListener('keydown',kick);};
addEventListener('pointerdown',kick);addEventListener('keydown',kick);
