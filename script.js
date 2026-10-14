/* ==========================================================================
   YOUR LINKS  —  the only part of the site you need to edit for links
   ==========================================================================
   Paste links between the quotes. Anything left as '' is hidden on the
   site automatically, so you can publish now and fill these in later.

   DEMO VIDEOS — paste the normal share link. These all work:
     YouTube:       https://www.youtube.com/watch?v=XXXXXXXXXXX
                    https://youtu.be/XXXXXXXXXXX
                    https://youtube.com/shorts/XXXXXXXXXXX   (phone recordings)
     Google Drive:  https://drive.google.com/file/d/XXXX/view
                    (set sharing to "Anyone with the link")
     Loom:          https://www.loom.com/share/XXXX
   TIP: upload to YouTube as "Unlisted" — it gives you a free thumbnail on
   the card, plays fastest, and nobody finds it unless they have the link.

   portrait: true  -> use for phone screen recordings (tall video).
   ========================================================================== */
const LINKS = {
  certsverify: {
    video: '',          // demo video link
    portrait: false,
    live: '',           // live site (only if you host the PHP somewhere)
    code: '',           // GitHub repo link
  },
  foodchap: {
    video: 'https://www.youtube.com/watch?v=Yzu__34wLhI',
    portrait: false,
    apk: '',            // optional: link to the .apk (e.g. a GitHub Release)
    code: 'https://github.com/anthonykamau17/FoodChap',
  },
  budget: {
    video: 'https://youtube.com/shorts/VyPFuCwRetw',
    portrait: true,     // phone recording (YouTube Short)
    apk: '',
    code: 'https://github.com/anthonykamau17/BudgetApp',
  },
  trailhire: {
    video: '',
    portrait: false,
    live: '',
    code: '',
  },
};

const CONTACT = {
  email:    'kamauanthony206@gmail.com',
  github:   'https://github.com/anthonykamau17',
  linkedin: 'https://www.linkedin.com/in/anthony-kamau-7956a9293/',
  cv:       '',   // optional: e.g. 'cv.pdf' (put the PDF in this folder)
};


/* ==========================================================================
   Everything below is site behaviour — no need to edit.
   1. Links + demo videos   4. Cursor-follow glow
   2. Ticker loop           5. Project filter
   3. Mobile menu           6. Scroll reveal
   ========================================================================== */


/* --------------------------------------------------------------------------
   1. LINKS + DEMO VIDEOS
   Turns a normal share link into an embeddable player URL, fills every
   [data-link] in each project card, and hides anything without a link.
   -------------------------------------------------------------------------- */
function parseVideo(url) {
  if (!url) return null;
  let m;
  // YouTube: watch?v=, youtu.be/, shorts/, embed/
  if ((m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/))) {
    return {
      embed: `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0`,
      thumb: `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`,
    };
  }
  // Google Drive
  if ((m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/))) {
    return { embed: `https://drive.google.com/file/d/${m[1]}/preview`, thumb: null };
  }
  // Loom
  if ((m = url.match(/loom\.com\/(?:share|embed)\/([\w-]+)/))) {
    return { embed: `https://www.loom.com/embed/${m[1]}?autoplay=1`, thumb: null };
  }
  // Direct video file (.mp4 / .webm) in this folder or elsewhere
  if (/\.(mp4|webm)(\?|$)/i.test(url)) {
    return { file: url, thumb: null };
  }
  // Unknown site: fall back to opening it in a new tab
  return { external: url, thumb: null };
}

const modal = document.getElementById('videoModal');
const frame = document.getElementById('videoFrame');
const modalTitle = document.getElementById('videoModalTitle');

function openVideo(video, title, portrait) {
  if (video.external) { window.open(video.external, '_blank', 'noopener'); return; }
  frame.innerHTML = '';
  frame.classList.toggle('portrait', !!portrait);
  modal.classList.toggle('is-portrait', !!portrait);
  if (video.file) {
    const v = document.createElement('video');
    v.src = video.file; v.controls = true; v.autoplay = true; v.playsInline = true;
    frame.appendChild(v);
  } else {
    const f = document.createElement('iframe');
    f.src = video.embed;
    f.title = title + ' demo video';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    frame.appendChild(f);
  }
  modalTitle.textContent = title + ' — demo';
  if (typeof modal.showModal === 'function') modal.showModal();
  else modal.setAttribute('open', '');
}

function closeVideo() {
  frame.innerHTML = '';            // stops playback
  if (modal.open) modal.close ? modal.close() : modal.removeAttribute('open');
}

document.getElementById('videoClose').addEventListener('click', closeVideo);
modal.addEventListener('click', (e) => { if (e.target === modal) closeVideo(); }); // backdrop click
modal.addEventListener('close', () => { frame.innerHTML = ''; });                 // Esc key

document.querySelectorAll('.fixture[data-project]').forEach(card => {
  const cfg = LINKS[card.dataset.project] || {};
  const title = card.querySelector('.fixture-name').textContent.trim();
  const video = parseVideo(cfg.video);

  card.querySelectorAll('[data-link]').forEach(el => {
    const type = el.dataset.link;

    if (type === 'video' || type === 'thumb') {
      if (!video) { el.hidden = true; return; }
      el.addEventListener('click', () => openVideo(video, title, cfg.portrait));
      if (type === 'thumb' && video.thumb) {
        el.style.backgroundImage = `linear-gradient(180deg, rgba(13,13,13,0.15), rgba(13,13,13,0.75)), url("${video.thumb}")`;
        el.classList.add('has-image');
      }
      return;
    }

    // live / code / apk links
    if (cfg[type]) el.href = cfg[type];
    else el.hidden = true;
  });

  // If a card has no links at all yet, hide the empty row
  const row = card.querySelector('.fixture-links');
  if (row && ![...row.children].some(c => !c.hidden)) row.hidden = true;
});

document.querySelectorAll('[data-contact]').forEach(el => {
  const value = CONTACT[el.dataset.contact];
  if (!value) { el.hidden = true; return; }
  el.href = el.dataset.contact === 'email' ? 'mailto:' + value : value;
});


/* --------------------------------------------------------------------------
   2. TICKER LOOP — duplicate the items so the CSS translateX(-50%) loop
   has no visible seam.
   -------------------------------------------------------------------------- */
const track = document.getElementById('tickerTrack');
track.innerHTML += track.innerHTML;


/* --------------------------------------------------------------------------
   3. MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? 'CLOSE' : 'MENU';
}
menuToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));


/* --------------------------------------------------------------------------
   4. CURSOR-FOLLOW GLOW ON PROJECT CARDS (see .fixture::before in style.css)
   -------------------------------------------------------------------------- */
document.querySelectorAll('.fixture').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width) * 100 + '%');
    card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height) * 100 + '%');
  });
});


/* --------------------------------------------------------------------------
   5. PROJECT FILTER — All / Web / Android
   -------------------------------------------------------------------------- */
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filterBtns.forEach(b => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    document.querySelectorAll('.fixture').forEach(card => {
      card.hidden = !(f === 'all' || card.dataset.kind === f);
    });
  });
});


/* --------------------------------------------------------------------------
   6. SCROLL REVEAL — fade sections in once as they enter the viewport.
   (If JavaScript fails, style.css keeps everything visible.)
   -------------------------------------------------------------------------- */
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('in'));
}
