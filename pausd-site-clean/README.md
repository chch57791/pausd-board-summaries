# PAUSD Board Meeting Summaries

Plain-English summaries of Palo Alto Unified School District Board of Education meetings.

**Live site:** _(add your URL after deploying)_

## What is this?

After each Board meeting, this site publishes a factual summary: what was discussed, what was decided, and who took which positions. Quotes are attributed to named speakers. Sources include meeting video recordings, BoardDocs agendas, and local news coverage.

This is an independent community project. It is not published by or affiliated with PAUSD.

---

## 🚀 Deploy in 5 minutes (no coding experience needed)

### Option A: Vercel (Recommended — free, easiest)

1. **Create a GitHub account** (if you don't have one): https://github.com/signup
2. **Create a new repository:**
   - Go to https://github.com/new
   - Name it `pausd-board-summaries`
   - Make it Public
   - Click "Create repository"
3. **Upload these files:**
   - On the repo page, click "uploading an existing file"
   - Drag and drop ALL the files/folders from this project
   - Click "Commit changes"
4. **Deploy on Vercel:**
   - Go to https://vercel.com and sign up with your GitHub account
   - Click "Add New → Project"
   - Import your `pausd-board-summaries` repo
   - Vercel auto-detects it's a Vite project — just click "Deploy"
   - In ~60 seconds you'll have a live URL like `pausd-board-summaries.vercel.app`
5. **Optional: Add a custom domain**
   - In Vercel dashboard → Settings → Domains
   - Add something like `pausdmeetings.org` (buy one on Namecheap/Google Domains for ~$12/year)

### Option B: Netlify (also free)

1. Go to https://app.netlify.com/drop
2. Drag and drop the entire project folder
3. Done — you get a live URL instantly

---

## 🔄 Adding New Meetings

To add a new meeting summary, edit `src/App.jsx`:

1. Find the `MEETINGS` array at the top of the file
2. Add a new object at the BEGINNING of the array (newest first)
3. Follow the same structure as existing meetings
4. Commit and push to GitHub — Vercel auto-deploys

Each meeting object looks like:
```js
{
  id: "mar-10-2026",           // unique slug
  date: "Mar 10, 2026",       // short date for tab
  dateFull: "March 10, 2026", // full date for header
  type: "Regular Board Meeting",
  duration: "~3 hrs",
  mood: "Contentious",
  moodColor: "#e67e22",       // hex color for mood badge
  tldr: "One paragraph summary...",
  sections: [
    {
      title: "Agenda Item Title",
      emoji: "📋",
      urgency: "high",        // critical | high | medium | info
      what: "Background...",
      whatHappened: "What happened at the meeting...",
      positions: [
        {
          who: "Person Name (Role)",
          stance: "supported",  // supported | opposed | mixed
          stanceLabel: "Short label",
          said: "What they said or did..."
        }
      ],
      outcome: "What was decided...",
      bottomLine: "Why it matters..."
    }
  ]
}
```

---

## 📁 Project Structure

```
pausd-site/
├── index.html          ← HTML shell with SEO meta tags
├── package.json        ← Dependencies (React + Vite)
├── vite.config.js      ← Build config
├── README.md           ← This file
└── src/
    ├── main.jsx        ← React entry point
    └── App.jsx         ← All the meeting data + UI components
```

## Local Development (optional)

If you want to run it locally to preview changes:

```bash
npm install
npm run dev
```

Then open http://localhost:5173

---

## Sources

- [PAUSD BoardDocs](https://go.boarddocs.com/ca/pausd/Board.nsf/Public) — official agendas
- [Midpen Media Center](https://midpenmedia.org/pausd-board-meetings/) — meeting recordings
- [Palo Alto Online](https://www.paloaltoonline.com/) — local news coverage
- [Palo Alto Daily Post](https://padailypost.com/) — local news coverage
- [The Paly Voice](https://palyvoice.com/) — student journalism
- [Midpeninsula Post](https://midpenpost.org/) — local news coverage
- [PAUSD Superintendent's Updates](https://www.pausd.org/about-us/news/superintendents-update) — weekly updates
