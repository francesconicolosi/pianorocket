/* Piano Rocket – melodie e livelli */
'use strict';
/* Formato: NOTA+OTTAVA[:durata in tempi]  es. C4, F#4, G4:2, A4:0.5
   Per aggiungere un livello: aggiungi la melodia a SONGS e il suo nome a LEVELS. */
const SONGS={
 'Fra Martino':'C4 D4 E4 C4 C4 D4 E4 C4 E4 F4 G4:2 E4 F4 G4:2 G4:0.5 A4:0.5 G4:0.5 F4:0.5 E4 C4 G4:0.5 A4:0.5 G4:0.5 F4:0.5 E4 C4 C4 G3 C4:2 C4 G3 C4:2',
 /* Livello 2 – Jingle Bells (ritornello, J. Pierpont 1857, pubblico dominio) */
 'Jingle Bells':
  'E4 E4 E4:2 E4 E4 E4:2 E4 G4 C4:1.5 D4:0.5 E4:4 '+
  'F4 F4 F4:1.5 F4:0.5 F4 E4 E4 E4:0.5 E4:0.5 E4 D4 D4 E4 D4:2 G4:2 '+
  'E4 E4 E4:2 E4 E4 E4:2 E4 G4 C4:1.5 D4:0.5 E4:4 '+
  'F4 F4 F4:1.5 F4:0.5 F4 E4 E4 E4:0.5 E4:0.5 G4 G4 F4 D4 C4:4',
 'Twinkle Twinkle':'C4 C4 G4 G4 A4 A4 G4:2 F4 F4 E4 E4 D4 D4 C4:2',
 'Inno alla Gioia':'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4:1.5 D4:0.5 D4:2',
 'Tanti Auguri':'C4:0.75 C4:0.25 D4 C4 F4 E4:2 C4:0.75 C4:0.25 D4 C4 G4 F4:2',
 'Scala di Do':'C4 D4 E4 F4 G4 A4 B4 C5:2'
};

/* Ordine dei livelli (nomi presenti in SONGS) */
const LEVELS=['Fra Martino','Jingle Bells'];
