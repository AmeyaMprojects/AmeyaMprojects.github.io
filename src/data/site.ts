// All visible content lives here. Source: the existing site in ../portfolio-website.
// Assumptions (owner, please confirm):
//  - IEEE CIS chair term runs Aug 2025 to Aug 2026 (the old site said "Aug 2025 — Aug").
//  - B.Tech started Aug 2024 (old site only gives "expected May 2028").
//  - Production URL is https://ameyamprojects.github.io (GitHub Pages).
//  - Project years are inferred from the data in each screenshot (2025-26 NBA season, Aug 2026 IPO listings).
import ipo from '../assets/ipo-analyzer.jpg';
import nba from '../assets/nba-contract-analyzer.jpg';
import swing from '../assets/swing-screener.jpg';

export const site = {
  name: 'Ameya Mhatre',
  first: 'Ameya',
  role: 'Software engineer',
  url: 'https://ameyamprojects.github.io',
  description:
    'Ameya Mhatre builds software that measures things: multi-agent LLM pipelines, quantitative models and security audits against NIST CSF and ISO 27001.',
  email: 'ameyam.projects@gmail.com',
  location: 'Mumbai and Bengaluru',
  resume: '/AmeyaMhatre_resume.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/AmeyaMprojects' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ameya-mhatre-553003307/' },
    { label: 'Substack', href: 'https://ameyamhatre.substack.com' },
  ],
};

export const hero = {
  lead:
    'I build software that measures things. Agent pipelines that value IPOs, a model that prices NBA contracts against the cap, a screener that sizes risk before a trade, and audits that hold web apps to NIST CSF and ISO 27001.',
};

export type Project = {
  slug: string;
  title: string;
  short: string;
  measures: string;
  reading: string;
  readingLabel: string;
  year: string;
  stack: string[];
  summary: string;
  cover: { src: ImageMetadata; alt: string; caption: string };
  live: string;
  code: string;
  context: string;
  idea: string;
  craft: string[];
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: 'ipo-analyzer',
    title: 'Indian IPO Analyzer',
    short: 'IPO Analyzer',
    measures: 'An IPO against its price band',
    reading: '5 agents',
    readingLabel: 'specialists per report',
    year: '2026',
    stack: ['Python', 'LangGraph', 'Gemini', 'Streamlit', 'Web scraping'],
    summary:
      'A multi-agent pipeline that reads live Indian IPO listings and writes a report where every number can be traced back to its source.',
    cover: {
      src: ipo,
      alt: 'The Indian IPO Analyzer listing upcoming mainboard and SME IPOs, each card showing price band, dates and an Analyze button.',
      caption: 'Live listings, filtered by status and board. Analyze hands one company to the agent graph.',
    },
    live: 'https://ipoanalyzer.streamlit.app/',
    code: 'https://github.com/AmeyaMprojects/ipo_analyzer',
    context:
      'IPO write-ups are either marketing or a wall of ratios with no explanation. A language model can explain ratios well, but left alone it will also invent them, and a wrong P/E in a buy note is worse than no note.',
    idea:
      'Split the work so the model never produces a figure. Five specialist agents (fundamentals, valuation, sentiment, risk profiling, synthesis) run as a LangGraph graph over scraped data. Ratios are computed in plain Python first; the agents only get to interpret them.',
    craft: [
      'P/E, P/B, ROE, ROCE, debt to equity and CAGR are deterministic functions with unit tests, not prompts.',
      'Each agent writes into one shared state, so the synthesis step can only cite what an earlier node produced.',
      'Listings are scraped live and filterable by board (mainboard or SME) and status (open or upcoming).',
      'The report keeps the source of every number next to it, so a reader can check it without trusting the model.',
    ],
    outcome:
      'Shipped as a public Streamlit app. Pick any open or upcoming IPO and it returns a full report in one run.',
  },
  {
    slug: 'nba-contract-analyzer',
    title: 'NBA Contract Analyzer',
    short: 'NBA Contracts',
    measures: 'Pay against play',
    reading: '101 players',
    readingLabel: 'across 30 teams',
    year: '2025',
    stack: ['Python', 'Pandas', 'Ridge regression', 'Web scraping'],
    summary:
      'A model that values NBA contracts against on-court performance, read through the real mechanics of the 2023 collective bargaining agreement.',
    cover: {
      src: nba,
      alt: 'NBA Contract Analyzer showing the 2025-26 cap sheet: salary cap, tax line and two aprons, and a table of players with surplus and grade.',
      caption: 'The 2025-26 cap sheet. Cap, tax and both aprons drawn as lines a payroll crosses.',
    },
    live: 'https://ameyamprojects.github.io/Nba-Contract-Analyzer/',
    code: 'https://github.com/AmeyaMprojects/Nba-Contract-Analyzer',
    context:
      'Raw salary says little about whether a contract is good. A rookie-scale deal and a supermax follow different rules, and since 2023 the two aprons change what a front office is even allowed to do.',
    idea:
      'Model the rules first, then the market. The pipeline encodes rookie scale, max tiers, supermax, Bird rights and the apron system, and a ridge regression over player-season stats estimates what each player would earn on the open market.',
    craft: [
      'Surplus and deficit are expressed as a share of the salary cap, so a number means the same thing across seasons.',
      'Ridge regression keeps correlated box-score stats from swinging the estimate.',
      'Every player gets a plain grade (fair value, slight overpay and so on) next to the number behind it.',
      'Small samples are flagged in the table instead of silently trusted.',
    ],
    outcome:
      'Published as a static site on GitHub Pages: 101 players across 30 teams, searchable by player, team and grade.',
  },
  {
    slug: 'swing-screener',
    title: 'Multi-market swing screener',
    short: 'Swing Screener',
    measures: 'Risk against reward, before entry',
    reading: '500 → 59',
    readingLabel: 'scanned to candidates',
    year: '2026',
    stack: ['Python', 'FastAPI', 'AWS', 'Quantitative modelling'],
    summary:
      'A screening engine that scans an equity universe and only lets a setup through once its stop, targets and risk to reward are defined.',
    cover: {
      src: swing,
      alt: 'Swing screener results for the Nifty 500: 500 scanned, 59 candidates, each row with score, entry, stop loss, target and risk to reward.',
      caption: 'One Nifty 500 scan: 500 in, 427 filtered out, 59 candidates with entry, stop and target.',
    },
    live: 'https://s501e59h91.execute-api.ap-south-1.amazonaws.com',
    code: 'https://github.com/AmeyaMprojects/swing-screener',
    context:
      'Most screeners stop at "this looks interesting". The hard part of a swing trade is the exit: where it is wrong, where it is right, and whether the distance between them is worth it.',
    idea:
      'Make risk part of the screen, not an afterthought. Candidates are scored by a multi-factor model, then sized with ATR-anchored stops and tiered targets, and anything below a minimum risk to reward never reaches the list.',
    craft: [
      'Volatility-adjusted pricing and momentum indicators feed a probabilistic scoring matrix.',
      'It looks for two kinds of setup: mean reversion and trend continuation.',
      'Stops come from ATR, not fixed percentages, so a volatile stock gets a wider stop and a smaller position.',
      'A journal tab keeps the trades taken next to the scans that produced them.',
    ],
    outcome:
      'Runs as a FastAPI service on AWS (ap-south-1). A full Nifty 500 scan takes about five minutes.',
  },
];

export const practice = {
  statement:
    'Most of what I build ends in a number someone has to trust. So the numbers come from code that can be tested, and the language model is only allowed to explain them.',
  tolerances: [
    {
      title: 'Deterministic first',
      text: 'Ratios, cap math and stop distances are plain functions with tests. Models interpret; they never produce the figure.',
    },
    {
      title: 'Evaluate retrieval',
      text: 'At Mastek I benchmarked embedding strategies and Azure AI Search hybrid retrieval on real support tickets, so incident matching improved on evidence.',
    },
    {
      title: 'Audit what ships',
      text: 'I assessed a production web app against NIST CSF and ISO 27001. The checklists I wrote for it were reused on later engagements.',
    },
  ],
  skills: [
    { group: 'Languages', items: ['Python', 'JavaScript', 'SQL', 'C++'] },
    { group: 'Models and data', items: ['scikit-learn', 'pandas', 'NumPy', 'XGBoost', 'Regression', 'Statistics'] },
    { group: 'Systems', items: ['LangChain', 'LangGraph', 'FastAPI', 'React', 'Node.js', 'AWS', 'Git'] },
    { group: 'Security', items: ['NIST CSF', 'ISO 27001', 'Threat modelling', 'Security audits'] },
  ],
};

// Time ruler. Months are counted from Jan 2024 (index 0).
export const record = {
  from: 2024,
  to: 2028,
  entries: [
    {
      title: 'B.Tech, Computer Science (Data Science)',
      org: 'Manipal Institute of Technology, Bengaluru',
      spans: [{ start: '2024-08', end: '2028-05', label: 'Aug 2024 to May 2028 (expected)' }],
      notes: ['CGPA 8.4 / 10', 'Data structures and algorithms, probability and statistics, OOP, discrete maths'],
    },
    {
      title: 'Intern',
      org: 'Mastek Ltd., Mumbai',
      spans: [
        { start: '2025-06', end: '2025-08', label: 'Jun to Aug 2025' },
        { start: '2026-06', end: '2026-07', label: 'Jun to Jul 2026' },
      ],
      notes: [
        'Evaluation pipeline for an AI incident-resolution system: embeddings and Azure AI Search hybrid retrieval on real support data.',
        'Multi-node LLM agents in LangChain and LangGraph, including a production blog-writing agent (research, draft, edit).',
        'Security assessment of a production web app against NIST CSF and ISO 27001.',
      ],
    },
    {
      title: 'Chair, IEEE Computational Intelligence Society',
      org: 'MIT Bengaluru student chapter',
      spans: [{ start: '2025-08', end: '2026-08', label: 'Aug 2025 to Aug 2026' }],
      notes: ['Led a chapter of 15+ members; workshops on AI and security for 200+ attendees.', 'Budget, cross-team coordination and stakeholder communication.'],
    },
  ],
  facts: [
    { value: '8.4', unit: '/ 10', label: 'CGPA' },
    { value: '15+', unit: '', label: 'chapter members led' },
    { value: '200+', unit: '', label: 'workshop attendees' },
  ],
};

export const writing = [
  {
    title: 'I ran an SEO audit on my own portfolio, and the score shocked me',
    series: 'Technical Tuesday',
    date: '2026-08-25',
    url: 'https://ameyamhatre.substack.com/p/technical-tuesday-i-ran-an-seo-audit',
  },
  {
    title: 'India’s sovereign AI moment meets a funding gold rush',
    series: 'Machine Learning Monday',
    date: '2026-08-24',
    url: 'https://ameyamhatre.substack.com/p/machine-learning-monday-indias-sovereign',
  },
  {
    title: 'Sensex roars, Shiprocket soars, and the Fed sits still',
    series: 'Finance Friday',
    date: '2026-08-21',
    url: 'https://ameyamhatre.substack.com/p/finance-friday-sensex-roars-shiprocket',
  },
];
