# Anthony Kamau — Portfolio

Personal portfolio: full-stack web platforms (PHP/MySQL) and Android apps (Kotlin).
Plain HTML, CSS and JavaScript — no build step.

| File | What it holds |
|---|---|
| `index.html` | All page content (project write-ups, about, skills) |
| `style.css` | All styling — colours live in the `:root` block at the top |
| `script.js` | **Your links** (top of file) + site behaviour |
| `favicon.svg` / `favicon.ico` | Browser tab icon |

---

## 1. Add your links (2 minutes)

Open `script.js`. At the very top there are two blocks, `LINKS` and `CONTACT`.
Paste each link between the quotes:

```js
foodchap: {
  video: 'https://youtube.com/shorts/AbC123xYz00',
  portrait: true,
  apk: '',
  code: 'https://github.com/USERNAME/foodchap',
},
```

- **Demo videos:** YouTube, Google Drive or Loom share links all work.
  Upload to YouTube as **Unlisted** for the best result — the card then shows the video's thumbnail automatically.
- `portrait: true` is for phone screen recordings (tall video). Use `false` for laptop recordings.
- Leave anything as `''` and its button is hidden, so you never publish a dead link.

## 2. Host it free on GitHub Pages

1. Sign in at github.com → **New repository**.
2. Name it exactly **`USERNAME.github.io`** (your GitHub username) → Public → **Create repository**.
3. On the new repo page click **uploading an existing file**.
4. Drag in **the files inside this folder** (`index.html`, `style.css`, `script.js`, `favicon.svg`, `favicon.ico`, `README.md`) — not the folder itself.
5. Click **Commit changes**.
6. Go to **Settings → Pages**. Under *Build and deployment* set Source = **Deploy from a branch**, Branch = **main**, folder **/ (root)** → **Save**.
7. Wait 1–2 minutes, then open **https://USERNAME.github.io** — that's your live portfolio.

**Updating later:** open the file on GitHub → pencil icon (Edit) → change → **Commit changes**. The site updates in about a minute.

## 3. Optional upgrades

- **Live PHP demos:** GitHub Pages can't run PHP/MySQL. To make CertsVerify or TrailHire clickable,
  host them free on InfinityFree (PHP + MySQL) and paste the URL into `live:`.
- **APK downloads:** in each app's GitHub repo → *Releases* → *Draft a new release* → attach the `.apk` →
  publish, then paste the release link into `apk:`.
- **CV:** put `cv.pdf` in this folder and set `cv: 'cv.pdf'`.
- Put the portfolio link in your GitHub profile, LinkedIn "Featured" section and CV header.
