# 📱 NAMESTITEV TODO APLIKACIJE NA iPHONE

## 🎯 KRATKA VERZIJA (HITRI KORAKI)

### 1️⃣ PRIPRAVI IKONE
1. Odpri `icon-generator.html` v brskalniku
2. Klikni "Uporabi privzeto ikono" ali naloži svojo sliko
3. Prenesi vse generirane ikone v isti folder kot aplikacija

### 2️⃣ POSTAVI ONLINE
Možnost A: **GitHub Pages** (PRIPOROČENO)
Možnost B: Netlify, Vercel, Firebase Hosting
Možnost C: Lastni hosting

### 3️⃣ NAMESTI NA iPHONE
1. Odpri Safari na iPhonu
2. Pojdi na URL aplikacije
3. Klikni **Share** gumb (kvadrat s puščico)
4. Izberi **"Add to Home Screen"**
5. Klikni **"Add"**

DONE! 🎉

---

## 📚 PODROBNA NAVODILA

### KORAK 1: PRIPRAVA IKON

Ikone so **NUJNE** za PWA na iOS. Brez njih aplikacija ne bo delovala pravilno.

#### Možnost A: Uporabi privzeto ikono (najhitrejše)

1. Odpri `icon-generator.html` v kateremkoli brskalniku
2. Klikni gumb **"Uporabi privzeto ikono"**
3. Klikni **"Generiraj vse ikone"**
4. Klikni na vsako ikono za prenos:
   - icon-16.png
   - icon-32.png
   - icon-72.png
   - icon-96.png
   - icon-120.png
   - icon-128.png
   - icon-144.png
   - icon-152.png
   - icon-167.png
   - icon-180.png
   - icon-192.png
   - icon-256.png
   - icon-512.png

#### Možnost B: Naloži svojo ikono

1. Pripravi sliko 1024x1024 px (PNG ali JPG)
2. Slika naj bo enostavna, prepoznavna, z močnimi barvami
3. Odpri `icon-generator.html`
4. Povleci sliko na upload območje
5. Klikni **"Generiraj vse ikone"**
6. Prenesi vse ikone

**POMEMBNO:** Vse ikone morajo biti v istem folderju kot `index.html`!

---

### KORAK 2: POSTAVITEV ONLINE

Tvoja struktura folderjev naj bo:

```
todo-app/
├── index.html
├── todo-app.jsx
├── manifest.json
├── service-worker.js
├── icon-16.png
├── icon-32.png
├── icon-72.png
├── icon-96.png
├── icon-120.png
├── icon-128.png
├── icon-144.png
├── icon-152.png
├── icon-167.png
├── icon-180.png
├── icon-192.png
├── icon-256.png
└── icon-512.png
```

#### Možnost A: GitHub Pages (PRIPOROČENO - ZASTONJ)

##### Brez GitHub Desktop:
1. Pojdi na https://github.com
2. Ustvari nov repository (npr. "todo-app")
3. Naloži vse datoteke (drag & drop)
4. Pojdi na Settings → Pages
5. Source: "Deploy from a branch"
6. Branch: "main" → folder: "/(root)"
7. Klikni Save
8. Počakaj 2-3 minute
9. Tvoj URL: `https://tvoje-ime.github.io/todo-app`

##### Z GitHub Desktop:
1. Ustvari nov repository v GitHub Desktop
2. Kopiraj vse datoteke v folder
3. Commit changes
4. Publish repository
5. Vključi GitHub Pages (kot zgoraj, koraki 4-8)

#### Možnost B: Netlify (ENOSTAVNO)

1. Pojdi na https://www.netlify.com
2. Registriraj se (zastonj)
3. Drag & drop folder z vsemi datotekami
4. Počakaj 30 sekund
5. Dobiš URL: `https://random-name.netlify.app`
6. Lahko spremeniš ime v Settings

#### Možnost C: Vercel

1. Pojdi na https://vercel.com
2. Registriraj se
3. Import project → Upload files
4. Deploy
5. Dobiš URL

#### Možnost D: Firebase Hosting

1. Namesti Firebase CLI: `npm install -g firebase-tools`
2. `firebase login`
3. `firebase init hosting`
4. Izberi/ustvari projekt
5. Public directory: `.` (current folder)
6. Single-page app: No
7. `firebase deploy`

---

### KORAK 3: NAMESTITEV NA iPHONE

#### iOS SAFARI (EDINI NAČIN)

**POMEMBNO:** Moraš uporabiti Safari! Chrome/Firefox na iOS NE PODPIRATA "Add to Home Screen" za PWA aplikacije.

1. **Odpri Safari** na iPhonu
2. **Pojdi na URL** aplikacije (npr. https://tvoje-ime.github.io/todo-app)
3. Počakaj, da se aplikacija naloži (vidiš "Nalagam aplikacijo...")
4. **Klikni Share gumb** (kvadratek s puščico navzgor) - spodaj na sredini
5. **Scrollaj navzdol** do možnosti "Add to Home Screen"
6. **Klikni "Add to Home Screen"**
7. **Lahko spremeniš ime** (prikazalo se bo na home screen-u)
8. **Klikni "Add"** (zgoraj desno)

**DONE!** 🎉 Aplikacija je sedaj na tvojem home screen-u.

---

### KORAK 4: TESTIRANJE

#### Prvič ko odpreš aplikacijo:

1. **Dovoljenje za obvestila**
   - iOS bo vprašal: "Allow notifications?"
   - Klikni **"Allow"** (za reminders)

2. **Preveri funkcionalnosti**
   - Dodaj testno nalogo
   - Nastavi reminder
   - Zapri aplikacijo
   - Počakaj do reminder časa
   - Slišal bi moral zvok + vibracijo + pasico

3. **Preveri offline**
   - Vklopi Airplane Mode
   - Odpri aplikacijo
   - Še vedno mora delati!
   - Vse naloge morajo biti tam

---

## 🔧 TROUBLESHOOTING

### Problem: Ne vidim "Add to Home Screen"

**Rešitev:**
- Zagotovi, da uporabljaš **Safari** (ne Chrome/Firefox)
- Preveri, da si na **pravem URL-ju** (ne localhost)
- Scroll navzdol v share meniju - je lahko skrito
- iOS verzija mora biti **11.3+**

### Problem: Ikona je bela ali napačna

**Rešitev:**
- Preveri, da so **VSE ikone** naložene na server
- Imena ikon morajo biti **točno**: icon-120.png (ne Icon-120.PNG)
- Počisti cache: Settings → Safari → Clear History and Website Data
- Odstrani app iz home screen in dodaj ponovno

### Problem: Aplikacija ne dela offline

**Rešitev:**
- Preveri, da je `service-worker.js` na serverju
- Odpri Safari → Develop → Show Web Inspector → Console
- Išči napake v service worker registraciji
- Lahko traja 1-2 minuti po prvi namestitvi
- Ponovno osvezi stran (hold refresh button → "Reload Without Content Blockers")

### Problem: Reminders ne delajo

**Rešitev:**
1. **Preveri dovoljenja:**
   - Settings → Safari → Notifications → Allow
   - Settings → (tvoj app) → Notifications → Allow
2. **Preveri, da si nastavil:**
   - Datum in čas naloge
   - Reminder time (15min/1h/1dan)
3. **Aplikacija mora biti:**
   - Nameščena prek "Add to Home Screen"
   - Ne smeš je odpreti prek Safari-ja običajno

### Problem: Dark mode ne dela

**Rešitev:**
- To je funkcija v aplikaciji, ne iOS
- Klikni sončce/luna ikono v header-ju
- Preference se shrani avtomatsko

---

## 🎨 PRILAGAJANJE IKONE

Če želiš svojo ikono:

### Dobre prakse za ikono:

1. **Velikost:** 1024x1024 px minimum
2. **Format:** PNG (podpira transparentnost)
3. **Stil:**
   - Enostavna, ne preveč detajlov
   - Močne barve (dobre na malih velikostih)
   - Brez besedila (premajhno bo)
   - Zaobljeni robovi niso potrebni (iOS to naredi sam)
4. **Background:**
   - Lahko je transparenten
   - Lahko je gradient
   - Ne sme biti bel (slabo viden na svetlih fonih)

### Tools za kreiranje ikon:

- **Figma** (zastonj, online) - https://figma.com
- **Canva** (zastonj, enostavno) - https://canva.com
- **Sketch** (Mac only, plačljivo)
- **Adobe Illustrator** (profesionalno)

---

## 📊 PREVERJANJE, ČE JE PWA PRAVILNO NAMEŠČENA

### V Safari-ju (preden namestiš):

1. Klikni **aA** (levo od URL bar-a)
2. Izberi **"Website Settings"**
3. Poglej, ali je:
   - Location: Ask / Allow
   - Camera: Ask
   - Microphone: Ask
   - Notifications: Allow

### Po namestitvi:

1. **Na Home Screen:**
   - Vidiš svojo ikono (ne Safari ikono)
   - Ime aplikacije pod ikono

2. **Ko odpreš:**
   - Ni Safari URL bara (full screen)
   - Ni navigacijskih gumbov spodaj
   - Ima svoj splash screen ob zagonu

3. **V Settings:**
   - Settings → (scroll down) → vidiš svojo aplikacijo
   - Lahko upravljaš notifications, location, etc.

---

## 🚀 DODATNE OPTIMIZACIJE (OPTIONAL)

### 1. Custom Domain
Če želiš svojo domeno (npr. moje-naloge.com):

**GitHub Pages:**
1. Kupi domeno (Namecheap, GoDaddy, ~10€/leto)
2. V GitHub repository: Settings → Pages → Custom domain
3. Dodaj CNAME record pri domain provider-ju
4. Počakaj 24 ur za DNS propagacijo

**Netlify:**
1. Settings → Domain management → Add custom domain
2. Sledij navodilom za DNS

### 2. HTTPS
- GitHub Pages: Avtomatsko ✅
- Netlify: Avtomatsko ✅
- Firebase: Avtomatsko ✅
- Lasten server: Uporabi Let's Encrypt (zastonj)

HTTPS je **NUJEN** za PWA funkcionalnost!

### 3. Analytics (sledenje uporabe)
Dodaj Google Analytics:
```html
<!-- V index.html, pred </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🆘 ŠE VEDNO NE DELA?

### Kontakt opcije:
1. Preveri vse korake še enkrat
2. Poskusi z drugim iPhnom (če imaš dostop)
3. Preveri iOS verzijo: Settings → General → About → Software Version (mora biti 11.3+)

### Debug mode:
Na Mac računalniku z Safari:
1. Poveži iPhone (cable)
2. Safari na Mac → Develop → [Tvoj iPhone] → [Tvoja aplikacija]
3. Web Inspector bo pokazal vse napake

---

## ✅ CHECKLIST PRED NAMESTITVIJO

- [ ] Vse datoteke so v istem folderju
- [ ] Vse ikone so generirane in na voljo
- [ ] Aplikacija je online (GitHub Pages/Netlify/...)
- [ ] URL začne z https:// (ne http://)
- [ ] Testiral v Safari na računalniku
- [ ] Uporabljaš Safari na iPhonu (ne Chrome)
- [ ] iOS verzija je 11.3 ali višja
- [ ] Internetna povezava deluje

---

## 🎉 KO VSE DELA

Tvoja TODO aplikacija je sedaj:

✅ Nameščena kot native app
✅ Dela offline
✅ Ima notifikacije
✅ Shranjuje podatke lokalno
✅ Hitro se zažene
✅ Izgleda profesionalno
✅ Nima ads ali trackerjev
✅ Je popolnoma tvoja!

**Užij v organizaciji svojih nalog!** 🚀
