// Everything else: every repo on github.com/AmeyaMprojects plus local-only projects.
// `year` is the year the repo was last updated on GitHub. `note` only where the repo or the owner says what it is.
// `case` points at a case page on this site; `local` marks a project with no public repo.
export type Part = { name: string; year?: number; lang?: string; note?: string; case?: string; local?: boolean };
export type Drawer = { title: string; parts: Part[] };

const gh = 'https://github.com/AmeyaMprojects/';
export const repoUrl = (name: string) => gh + name;

export const archive: Drawer[] = [
  {
    title: 'On the front page',
    parts: [
      { name: 'ipo_analyzer', year: 2026, lang: 'Python', note: 'Multi-agent pipeline that values Indian IPOs against their price band.', case: 'ipo-analyzer' },
      { name: 'Nba-Contract-Analyzer', year: 2026, lang: 'JavaScript', note: 'Prices NBA contracts against on-court value and the cap.', case: 'nba-contract-analyzer' },
      { name: 'swing-screener', year: 2026, lang: 'Python', note: 'Nifty swing screener that sizes risk before a trade.', case: 'swing-screener' },
    ],
  },
  {
    title: 'Recent',
    parts: [
      { name: 'nba-predictor', year: 2026, lang: 'Python', note: 'NBA game predictions with a public, append-only track record.' },
      { name: 'IEEE-conference', year: 2026, lang: 'HTML' },
      { name: 'monoreposih', year: 2026, lang: 'Python' },
      { name: 'Aqua-trace', year: 2026, lang: 'TypeScript' },
      { name: 'prom', year: 2026, lang: 'CSS' },
      { name: 'pilot_brief', year: 2026, lang: 'TypeScript' },
      { name: 'blog', year: 2026, lang: 'TypeScript', note: 'A personal diary, password-gated.' },
      { name: 'blog-writer', year: 2026, lang: 'Python' },
      { name: 'code-review-agent', year: 2026, lang: 'Python' },
      { name: 'ticketing_agent', year: 2026, lang: 'Python' },
      { name: 'gridsense', year: 2026, lang: 'Python' },
      { name: 'fire-risk-hackathon', year: 2026, lang: 'HTML' },
      { name: 'ot-security', year: 2026 },
      { name: 'Mamasrecipes', year: 2026, lang: 'HTML' },
      { name: 'my-history', year: 2026 },
    ],
  },
  {
    title: 'Not published',
    parts: [
      'f1-rl', 'updown', 'kaggle', 'backtest', 'nba_trade', 'wnba', 'career-ops', 'devops-demo', 'fenix',
      'machine', 'mastek2', 'healthcare', 'sat', 'subtittles', 'papers', 'recipe_2', 'ameya-portfolio-canvas', 'senti',
    ].map((name) => ({ name, local: true })),
  },
  {
    title: 'Web apps and hackathons',
    parts: [
      { name: 'cyber-hack-gov', year: 2026, lang: 'TypeScript' },
      { name: 'crypto-dashboard', year: 2026, lang: 'TypeScript' },
      { name: 'plant-analysis-app', year: 2026, lang: 'TypeScript' },
      { name: 'faculty-rater', year: 2026, lang: 'TypeScript' },
      { name: 'recipe-blog', year: 2026, lang: 'TypeScript' },
      { name: 'auditing-app', year: 2025, lang: 'TypeScript' },
      { name: 'elliptic-states-explorer', year: 2026, lang: 'TypeScript' },
      { name: 'race-track', year: 2026, lang: 'TypeScript' },
      { name: 'smurfing_hunter', year: 2026, lang: 'Python' },
      { name: 'orchids-vital-signs-simulation-component', year: 2026, lang: 'TypeScript', note: 'Vital signs simulation for childcare.' },
      { name: 'hackathon', year: 2026, lang: 'TypeScript' },
      { name: 'Hackhazards', year: 2026, lang: 'TypeScript' },
      { name: 'IITKHACk', year: 2026, lang: 'Python' },
      { name: 'IITK_HACK_2', year: 2026, lang: 'JavaScript' },
      { name: 'IITK_-', year: 2026, lang: 'JavaScript' },
      { name: 'banglore_hack', year: 2026, lang: 'JavaScript' },
      { name: 'gasless', year: 2026, lang: 'JavaScript' },
      { name: 'gasless-frontend', year: 2025, lang: 'JavaScript' },
      { name: 'radar', year: 2026, lang: 'JavaScript' },
      { name: 'slcm-dupe', year: 2026, lang: 'JavaScript' },
      { name: 'sikkim', year: 2025, lang: 'JavaScript' },
      { name: 'ACM', year: 2026, lang: 'JavaScript' },
      { name: 'airbnb', year: 2024, lang: 'JavaScript' },
      { name: 'to_Do', year: 2026, lang: 'JavaScript' },
    ],
  },
  {
    title: 'Portfolio sites',
    parts: [
      { name: 'AmeyaMprojects.github.io', year: 2026, lang: 'TypeScript', note: 'This site.' },
      { name: 'portfolio-website', year: 2026, lang: 'TypeScript', note: 'The previous version of this site.' },
      { name: 'portfolio2', year: 2026, lang: 'HTML' },
      { name: 'cybersec_portfolio', year: 2025 },
    ],
  },
  {
    title: 'Robotics, games and learning',
    parts: [
      { name: 'auv', year: 2026, lang: 'JavaScript' },
      { name: 'auv-test', year: 2026, lang: 'Python' },
      { name: 'PID_LINEFOLLWER', year: 2024, lang: 'C++', note: 'PID-controlled line-following robot.' },
      { name: 'OpenCV-Tutorials', year: 2026, lang: 'Python' },
      { name: 'minecraft-clone', year: 2026, lang: 'Java' },
      { name: 'Ninja_Game', year: 2026, lang: 'C#' },
      { name: 'cs50p-final-project', year: 2026, lang: 'Python' },
      { name: 'Calculator-in-python', year: 2026, lang: 'Python', note: 'A calculator built while learning Python GUI modules.' },
      { name: 'washcycle-calculator', year: 2026, lang: 'HTML' },
      { name: 'python_projects', year: 2024, lang: 'Python' },
      { name: 'HackerRank_Python', year: 2026, lang: 'Python' },
      { name: 'projects', year: 2025, lang: 'JavaScript' },
      { name: 'Google-Cybersecurity-Certification-Notes', year: 2026, note: 'Notes for the Google Cybersecurity Professional Certificate.' },
    ],
  },
  {
    title: 'Forks',
    parts: [
      { name: 'agentic-ai-engineering', year: 2026, lang: 'Python', note: 'Tutorials for building AI agents from scratch.' },
      { name: 'Urban-Pulse', year: 2026, lang: 'Jupyter' },
      { name: 'oppia', year: 2026, lang: 'Python', note: 'Open-source learning platform.' },
    ],
  },
];

export const archiveCount = archive.reduce((n, d) => n + d.parts.length, 0);
