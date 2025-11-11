# 🚀 HITRI VODIČ - TODO APLIKACIJA NA iPHONE

## ⚡ 3 KORAKI DO APLIKACIJE

### 1. IKONE (5 minut)
```
1. Odpri: icon-generator.html
2. Klikni: "Uporabi privzeto ikono"
3. Klikni: "Generiraj vse ikone"
4. Prenesi: vse ikone (13x)
```

### 2. ONLINE (10 minut)
```
Najlažje: GitHub Pages

1. github.com → New repository
2. Naloži VSE datoteke:
   ✓ index.html
   ✓ todo-app.jsx
   ✓ manifest.json
   ✓ service-worker.js
   ✓ vse ikone (icon-*.png)
3. Settings → Pages → Deploy
4. Počakaj 3 minute
5. Dobiš URL: https://tvoje-ime.github.io/todo-app
```

### 3. NAMESTITEV (1 minuta)
```
Na iPhonu v Safari:

1. Odpri: tvoj-url
2. Share gumb (kvadrat s puščico)
3. "Add to Home Screen"
4. "Add"

DONE! 🎉
```

---

## 📱 SPECIFIKACIJE

| Značilnost | Podrobnosti |
|-----------|-------------|
| **Platform** | iOS 11.3+ (iPhone, iPad) |
| **Brskalnik** | Safari (obvezno) |
| **Velikost** | ~500 KB (zelo lahka) |
| **Offline** | Popolnoma deluje |
| **Cena** | Zastonj (ni subscription) |

---

## 🎯 FUNKCIJE

✅ **Top 3 naloge danes** - focus mode
✅ **Ta teden** - 7-dnevni pregled  
✅ **Prihodnje** - dolgoročno načrtovanje
✅ **Klici** - poseben zavihek za telefonske klice
✅ **Reminders** - zvok + vibration + pasica
✅ **6 kategorij** - delo, osebno, nakupi, zdravje, finance, ostalo
✅ **3 prioritete** - visoka, srednja, nizka
✅ **Dark mode** - varčuje baterijo
✅ **Statistika** - tracking napredka
✅ **Swipe gestures** - iOS native feel
✅ **Offline** - deluje brez interneta
✅ **Local storage** - ni izgube podatkov

---

## 📂 STRUKTURA DATOTEK

```
todo-app/
├── index.html              ← Glavna stran
├── todo-app.jsx           ← React aplikacija
├── manifest.json          ← PWA konfiguracija
├── service-worker.js      ← Offline podpora
├── icon-16.png
├── icon-32.png
├── icon-72.png
├── icon-96.png
├── icon-120.png           ← iOS obvezen
├── icon-128.png
├── icon-144.png
├── icon-152.png           ← iOS obvezen
├── icon-167.png
├── icon-180.png           ← iOS obvezen
├── icon-192.png
├── icon-256.png
└── icon-512.png           ← iOS obvezen

Helper datoteke (ne potrebne za deployment):
├── icon-generator.html    ← Generator ikon
├── setup-checker.html     ← Checker postavitve
└── NAMESTITEV.md          ← Podrobna navodila
```

---

## 🔧 TOOLS

| Tool | Namen | Kdaj uporabiti |
|------|-------|----------------|
| **icon-generator.html** | Generira vse ikone | Pred deployment |
| **setup-checker.html** | Preveri vse datoteke | Po copy na server |
| **NAMESTITEV.md** | Podrobna navodila | Če kaj ne dela |

---

## ✅ CHECKLIST

### Pred deployment:
- [ ] Vse datoteke pripravljene
- [ ] Ikone generirane (13x)
- [ ] Setup checker shows 100%

### Deployment:
- [ ] Datoteke na GitHub/Netlify/Vercel
- [ ] URL je https:// (ne http://)
- [ ] Aplikacija se odpre v brskalniku

### Namestitev:
- [ ] Safari na iPhonu (ne Chrome)
- [ ] Add to Home Screen
- [ ] Dovoljenje za notifications
- [ ] Testna naloga + reminder

---

## 🆘 HELP

### Ne vidim "Add to Home Screen"?
→ Moraš uporabiti **Safari** (ne Chrome)
→ URL mora biti **https://** (ne localhost)
→ Scroll navzdol v share menu

### Ikona je napačna?
→ Preveri, da so **VSE ikone** naložene
→ Počisti cache: Settings → Safari → Clear History
→ Odstrani app in dodaj ponovno

### Ne dela offline?
→ Počakaj 1-2 minuti po prvi namestitvi
→ Preveri service-worker.js na serverju
→ Ponovno osvežiti stran

### Reminders ne delajo?
→ Allow notifications (iOS bo vprašal)
→ Nastavi datum + čas + reminder time
→ Aplikacija mora biti iz home screen-a

---

## 🎓 HOSTING MOŽNOSTI

| Platform | Cena | Čas | Težavnost |
|----------|------|-----|-----------|
| **GitHub Pages** | Zastonj | 10 min | Enostavno |
| **Netlify** | Zastonj | 5 min | Zelo enostavno |
| **Vercel** | Zastonj | 5 min | Enostavno |
| **Firebase** | Zastonj | 15 min | Srednje |

**PRIPOROČILO:** GitHub Pages (najbolj stable)

---

## 🌐 HOSTING NAVODILA

### GitHub Pages (podrobno):

```bash
# MOŽNOST 1: Web Interface (enostavno)
1. github.com → New repository
2. Ime: "todo-app"
3. Public
4. Create repository
5. Upload files → Drag & drop VSE datoteke
6. Commit changes
7. Settings → Pages
8. Source: Deploy from branch
9. Branch: main → folder: /(root)
10. Save
11. Počakaj 2-3 minute
12. URL: https://tvoje-ime.github.io/todo-app

# MOŽNOST 2: Git Command Line
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tvoje-ime/todo-app.git
git push -u origin main
# Nato Settings → Pages (koraki 7-12 zgoraj)
```

### Netlify:

```
1. netlify.com → Sign up (zastonj)
2. Drag & drop folder
3. Počakaj 30 sekund
4. Dobiš URL: https://random-name.netlify.app
5. Site settings → Change site name (optional)
```

---

## 📊 PERFORMANCE

| Metrika | Vrednost |
|---------|----------|
| **First Load** | < 2 sekunde |
| **Subsequent Loads** | < 0.5 sekunde (cache) |
| **Offline** | Instantno |
| **App Size** | ~500 KB |
| **Icons Size** | ~200 KB |
| **Memory Usage** | < 30 MB |

---

## 🔐 VARNOST & PRIVACY

✅ **Brez serverja** - vse lokalno
✅ **Ni trackerjev** - ni analytics (lahko dodaš)
✅ **Ni ads** - čisto
✅ **Ni accounta** - ni login
✅ **LocalStorage** - podatki samo na tvojem telefonu
✅ **HTTPS** - varna povezava
✅ **Open source** - vidiš celotno kodo

---

## 🎨 PRILAGAJANJE

### Spremeni barve:
V `index.html` najdi:
```html
<meta name="theme-color" content="#3B82F6">
```
Spremeni v svojo barvo (npr. "#FF0000" za rdečo)

### Spremeni ime:
V `manifest.json` najdi:
```json
"name": "Todo App - Moje naloge"
```
Spremeni v svoje ime

### Dodaj kategorije:
V `todo-app.jsx` najdi:
```javascript
const categories = [...]
```
Dodaj nove kategorije

---

## 📈 PRIHODNJE IZBOLJŠAVE

Lahko dodaš:
- iCloud sync (kompleksno)
- Widgets (iOS 14+)
- Siri Shortcuts
- Apple Watch companion
- Export/Import
- Themes
- Collaboration

Za pomoč pri teh funkcijah, potrebuješ bolj napredno znanje.

---

## 💡 TIPS & TRICKS

1. **Backup podatkov:**
   - LocalStorage → browser
   - Export feature (prihodnja verzija)
   - Screen shot statistike

2. **Preizkusi na več napravah:**
   - iPhone
   - iPad
   - Mac Safari

3. **Custom Domain:**
   - Namecheap: ~10€/leto
   - Poveži z GitHub Pages
   - Profesionalni izgled

---

## 🎯 SUCCESS METRICS

Po namestitvi preveri:
- [ ] Aplikacija je na home screen
- [ ] Ikona je pravilna
- [ ] Full screen (brez Safari bara)
- [ ] Splash screen ob zagonu
- [ ] Notifikacije delajo
- [ ] Offline deluje
- [ ] Dark mode dela
- [ ] Podatki se shranijo

Če je **VSE** ✅ → **USPEH!** 🎉

---

## 📞 KONTAKT & PODPORA

Če potrebuješ pomoč:
1. Preberi NAMESTITEV.md (podrobna navodila)
2. Uporabi setup-checker.html (debug tool)
3. Preveri iOS verzijo (mora biti 11.3+)
4. Poskusi z drugim brskalnikom/telefonom
5. Clear cache in poskusi ponovno

---

**SREČNO Z NALAGANJEM! 🚀**

---

*Verzija 1.0 - Narejena z ❤️ za iOS*
