# 🚀 Piano Rocket

**Impara il pianoforte giocando.** Piano Rocket è un gioco web per bambini (pensato per circa 6–10 anni) che trasforma l'esercizio al pianoforte in un'avventura: il tasto da suonare si illumina, e ogni nota giusta fa partire un razzo o fa saltare il personaggio sulla piattaforma successiva.

Funziona nel browser, senza installazioni, con la tastiera del computer, il mouse o una tastiera MIDI. È ottimizzato per **ROLI Piano M** (anche due collegati, 48 tasti), di cui sfrutta le luci dei tasti.

> Progetto indipendente, non affiliato né approvato da ROLI.

---

## Scopo

L'obiettivo è avvicinare un bambino al pianoforte con un'esperienza che sia prima di tutto **divertente**, ma che costruisca basi musicali vere:

- **Nomi delle note** in solfeggio italiano (Do, Re, Mi…), sui tasti e sullo schermo.
- **Colore fisso per ogni nota** (Do rosso, Re arancio, Mi giallo, Fa verde, Sol azzurro, La blu, Si viola), per associare suono, posizione e colore.
- **Altezza visiva**: nella modalità *Salti* le note acute stanno più in alto, quelle gravi più in basso.
- **Senso del ritmo**: nella modalità *A tempo* la musica non si ferma e il punteggio premia la precisione.
- **Dinamica**: più forte si preme il tasto, più in alto vanno razzi e salti.

## Funzionalità

| | |
|---|---|
| 🌍 **Mondi** | 🚀 *Spazio* (il razzo sale, fuochi d'artificio per ogni nota) · 🏃 *Salti* (platform con piattaforme già disposte secondo la melodia) |
| ⏯ **Stili di gioco** | ⏸ *Con calma*: il gioco aspetta la nota giusta · ⏱ *A tempo*: la musica va avanti, con valutazione Perfetto / Ottimo / Bene / Mancato, conto alla rovescia e metronomo |
| ⭐ **Livelli** | Livello 1 *Fra Martino*, Livello 2 *Jingle Bells*, più melodie libere e melodie personalizzate |
| 👥 **Giocatori** | 1 o 2 giocatori a turno, ognuno con nome e personaggio; schermata finale con vincitore |
| 🐸 **Personaggi** | Rana, Gatto, Robot, Toilet canterino, Minatore cubico, Riccio sprint, Pallina rosa, Esploratore |
| 🎹 **Suono** | Pianoforte a coda campionato (con fallback sintetico offline) o suono giocattolo; slider del volume |
| 💡 **Luci** | Accende sul Piano M il tasto da premere; anticipo regolabile (dal momento esatto a 1 s prima) |
| 🎹🎹 **Tastiera** | 24 tasti (1 Piano M) o 48 tasti (2 Piano M collegati), ottava regolabile |
| 🖥 **Schermo intero** | Layout adattivo a qualsiasi risoluzione |

## Come si gioca

1. Apri la pagina in **Chrome** o **Edge** (desktop).
2. *(Facoltativo)* Collega il Piano M via USB e premi il pallino 🔴 in alto: diventa 🟢 quando lo strumento è collegato. Consenti l'accesso MIDI quando il browser lo chiede.
3. Scegli livello, mondo e stile di gioco, poi premi **▶ Gioca** (o la barra spaziatrice).
4. Suona il tasto illuminato.

### Tastiera del computer

Due ottave, come una tastiera di pianoforte:

| Ottava bassa | Z | S | X | D | C | V | G | B | H | N | J | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nota | Do | Do# | Re | Re# | Mi | Fa | Fa# | Sol | Sol# | La | La# | Si |

| Ottava alta | Q | 2 | W | 3 | E | R | 5 | T | 6 | Y | 7 | U |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nota | Do | Do# | Re | Re# | Mi | Fa | Fa# | Sol | Sol# | La | La# | Si |

Le lettere sono scritte anche sotto i tasti a schermo. Su layout non QWERTY alcune lettere possono non coincidere.

### Impostazioni (⚙️)

- **Accensione tasto (A tempo)** — quanto prima si accende il tasto rispetto al momento in cui va premuto.
- **Tastiera** — 24 o 48 tasti.
- **Ottava Piano M** — deve corrispondere all'ottava impostata sullo strumento.
- **Uscita luci** — porta MIDI verso cui mandare le luci (con due Piano M: *Tutti i Piano M*).
- **Suono**, **Metronomo**, **Nomi sui tasti**, **Test luci**.
- **Nuova melodia** — vedi sotto.

## Aggiungere melodie

### Dall'interfaccia
In ⚙️ → *Nuova melodia*, scrivi un nome e le note separate da spazi. Le melodie vengono salvate nel browser (`localStorage`).

### Nel codice
Modifica [`js/songs.js`](js/songs.js):

```js
const SONGS = {
  'Fra Martino': 'C4 D4 E4 C4 …',
  'La mia canzone': 'C4 E4 G4:2 E4:0.5 D4:0.5 C4:2',
};
const LEVELS = ['Fra Martino', 'Jingle Bells', 'La mia canzone']; // ordine dei livelli
```

**Formato:** `NOTA` + `OTTAVA` + `:durata` facoltativa in tempi.

| Esempio | Significato |
|---|---|
| `C4` | Do centrale, 1 tempo |
| `F#4` | Fa diesis, 1 tempo |
| `G4:2` | Sol, 2 tempi |
| `A4:0.5` | La, mezzo tempo |

## Compatibilità

| Piattaforma | Gioco | Piano M (Web MIDI) |
|---|---|---|
| Chrome / Edge su Windows, macOS, Linux | ✅ | ✅ |
| Firefox desktop | ✅ | ⚠️ supporto Web MIDI variabile a seconda della versione |
| Safari (macOS, iOS, iPadOS) | ✅ con tocco/mouse | ❌ Web MIDI non supportato |
| iPhone / iPad | ✅ con tocco | ⚠️ solo tramite browser con Web MIDI di terze parti (es. *MIDIWeb Browser*) |

**Note sulle luci del Piano M.** Il gioco accende i tasti inviando normali messaggi *Note On / Note Off* all'uscita MIDI dello strumento (luce bianca). Non serve caricare script sul dispositivo. Chiudi ROLI Learn / ROLI Connect, Ableton e Synthesia mentre giochi, perché potrebbero inviare a loro volta comandi alle luci.

## Struttura del progetto

```
piano-rocket/
├── index.html          # pagina e struttura dell'interfaccia
├── css/
│   └── style.css       # stili (tema scuro, tastiera, pannelli)
├── js/                 # script caricati in ordine da index.html
│   ├── songs.js        # melodie e livelli  ← da modificare per aggiungere canzoni
│   ├── core.js         # costanti, utilità, canvas, stato condiviso
│   ├── ui.js           # barra, impostazioni, gestione livelli
│   ├── audio.js        # pianoforte campionato/sintetico, effetti, volume
│   ├── keyboard.js     # tastiera a schermo e del PC, range 24/48 tasti
│   ├── midi.js         # Web MIDI e luci del Piano M
│   ├── characters.js   # disegno dei personaggi
│   ├── players.js      # 1–2 giocatori e scelta personaggio
│   ├── game.js         # logica di gioco, punteggio, tempismo
│   ├── render.js       # scenari, HUD, schermate, loop di animazione
│   └── main.js         # avvio
├── assets/
│   └── favicon.svg
├── .nojekyll           # dice a GitHub Pages di servire i file così come sono
├── LICENSE
└── README.md
```

Il progetto è HTML, CSS e JavaScript puri: niente framework, niente build, nessuna dipendenza da installare. Gli script sono classici (non moduli ES) e condividono lo scope globale, quindi la pagina funziona anche aprendo `index.html` direttamente dal disco.

## Pubblicare su GitHub Pages

1. Crea un nuovo repository su GitHub (ad esempio `piano-rocket`), **pubblico**.
2. Carica tutti i file di questa cartella nella radice del repository:
   - dal sito: *Add file → Upload files*, trascina il contenuto della cartella (incluso `.nojekyll`), poi *Commit changes*;
   - oppure da terminale:
     ```bash
     cd piano-rocket
     git init
     git add .
     git commit -m "Prima versione di Piano Rocket"
     git branch -M main
     git remote add origin https://github.com/<tuo-utente>/piano-rocket.git
     git push -u origin main
     ```
3. Nel repository vai su **Settings → Pages**.
4. In *Build and deployment* scegli **Source: Deploy from a branch**, **Branch: `main`**, cartella **`/ (root)`**, poi *Save*.
5. Dopo 1–2 minuti il gioco è online su `https://<tuo-utente>.github.io/piano-rocket/`.

GitHub Pages serve il sito in **HTTPS**, requisito necessario per Web MIDI.

### Provarlo in locale

Basta aprire `index.html` con Chrome o Edge. In alternativa, con un piccolo server locale:

```bash
python -m http.server 8000
# poi apri http://localhost:8000
```

## Privacy

Tutto avviene nel browser. Nomi dei giocatori, impostazioni e melodie personalizzate restano nel `localStorage` del dispositivo; nulla viene inviato a server. L'unica risorsa esterna sono i campioni audio del pianoforte, scaricati da `tonejs.github.io` al primo tasto premuto (senza connessione il gioco usa un pianoforte sintetico).

## Crediti

- Campioni di pianoforte: **Salamander Grand Piano** di Alexander Holm, licenza [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/), distribuiti dal progetto [Tone.js](https://github.com/Tonejs/Tone.js).
- Melodie tradizionali di pubblico dominio (*Fra Martino*, *Jingle Bells*, *Twinkle Twinkle*, *Inno alla Gioia*).
- Personaggi disegnati in codice; quelli "ispirati a" sono creazioni originali e non riproducono personaggi protetti.

## Licenza

Codice rilasciato con licenza [MIT](LICENSE).
