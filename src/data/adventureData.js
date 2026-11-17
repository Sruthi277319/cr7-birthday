// Data for Cristiano Ronaldo Career Timeline & Challenges

export const CAREER_TIMELINE = [
  {
    id: 'sporting',
    club: 'Sporting CP',
    period: '1997 - 2003',
    role: 'The Boy from Madeira',
    badgeColor: 'from-emerald-700 to-green-900',
    accentColor: '#008744',
    badgeText: 'SCP',
    description: 'Where the impossible dream began. A lightning-fast 17-year-old winger stunned Manchester United in a 2003 friendly, demanding Alex Ferguson sign him immediately.',
    stats: { matches: 31, goals: 5, honors: 'Portuguese Super Cup' },
    quote: '"Talent without working hard is nothing."'
  },
  {
    id: 'mufc1',
    club: 'Manchester United',
    period: '2003 - 2009',
    role: 'The Theatre of Dreams Magician',
    badgeColor: 'from-red-800 to-amber-900',
    accentColor: '#DA291C',
    badgeText: 'MUFC',
    description: 'Inherited the legendary No. 7 shirt. Perfected the knuckleball free-kick, won 3 Premier League titles, his first UEFA Champions League, and his first Ballon d\'Or.',
    stats: { matches: 292, goals: 118, honors: '1x UCL, 3x Premier League, 1x Ballon d\'Or' },
    quote: '"Your love makes me strong, your hate makes me unstoppable."'
  },
  {
    id: 'realmadrid',
    club: 'Real Madrid',
    period: '2009 - 2018',
    role: 'The All-Time Galáctico GOAT',
    badgeColor: 'from-neutral-900 via-amber-950 to-neutral-900',
    accentColor: '#FEBE10',
    badgeText: 'RMCF',
    description: 'Pure football perfection. An inhuman 450 goals in just 438 matches. Clinched La Décima and led the legendary 3-peat Champions League era, claiming 4 more Ballon d\'Or trophies.',
    stats: { matches: 438, goals: 450, honors: '4x UCL, 2x La Liga, 4x Ballon d\'Or' },
    quote: '"I am living a dream I never want to wake up from."'
  },
  {
    id: 'juventus',
    club: 'Juventus',
    period: '2018 - 2021',
    role: 'The Bianconeri Conqueror',
    badgeColor: 'from-neutral-900 to-neutral-700',
    accentColor: '#FFFFFF',
    badgeText: 'JUVE',
    description: 'Conquered Serie A, becoming the fastest player to reach 100 goals in Juventus history and the only player to win every domestic trophy in England, Spain, and Italy.',
    stats: { matches: 134, goals: 101, honors: '2x Serie A, 1x Coppa Italia, Capocannoniere' },
    quote: '"Dreams are not what you see in sleep, they are things that do not let you sleep."'
  },
  {
    id: 'mufc2',
    club: 'Manchester United Return',
    period: '2021 - 2022',
    role: 'The Emotional Homecoming',
    badgeColor: 'from-red-900 via-zinc-950 to-neutral-950',
    accentColor: '#C8102E',
    badgeText: 'CR7 RED',
    description: 'Returned to Old Trafford with an explosive brace on his second debut, scoring 24 goals across all competitions and demonstrating champion longevity.',
    stats: { matches: 54, goals: 27, honors: 'Sir Matt Busby Player of the Year' },
    quote: '"I\'m back where I belong. Never stop believing."'
  },
  {
    id: 'alnassr',
    club: 'Al Nassr',
    period: '2023 - Present',
    role: 'The Global Trailblazer',
    badgeColor: 'from-yellow-700 via-blue-900 to-amber-600',
    accentColor: '#FFD700',
    badgeText: 'NASSR',
    description: 'Igniting a new football era in the Middle East. Broke the all-time single-season scoring record in Saudi Pro League with 35 goals, relentlessly hunting 1,000 career goals.',
    stats: { matches: '75+', goals: '70+', honors: 'Arab Club Champions Cup, Golden Boot' },
    quote: '"I don\'t follow the records, the records follow me."'
  },
  {
    id: 'portugal',
    club: 'Portugal National Team',
    period: '2003 - Present',
    role: 'The Eternal Captain & All-Time Top Scorer',
    badgeColor: 'from-red-700 via-emerald-800 to-yellow-800',
    accentColor: '#E60000',
    badgeText: 'POR',
    description: 'Over 210 caps and 130+ international goals — the highest in football history. Led Portugal to Euro 2016 glory and UEFA Nations League triumph.',
    stats: { matches: '215+', goals: '133+', honors: 'Euro 2016 Champion, Nations League 2019' },
    quote: '"For my country, I will give everything on the pitch until my very last day."'
  }
];

export const CR7_CHALLENGES = [
  {
    id: 1,
    title: 'Challenge 1: The Iconic Shirt',
    question: "What is Cristiano Ronaldo's iconic trademark jersey number that defined his global brand?",
    options: [
      { text: '#10 (The Playmaker)', isCorrect: false, hint: 'Classic number, but not CR\'s trademark!' },
      { text: '#7 (CR7 – The Legend)', isCorrect: true, hint: 'PERFECT! CR7 is the most iconic shirt in sports history! 🐐' },
      { text: '#9 (The Striker)', isCorrect: false, hint: 'He only wore 9 briefly at Real Madrid behind Raúl.' },
      { text: '#11 (The Winger)', isCorrect: false, hint: 'A great winger number, but not his signature!' }
    ],
    funFact: "Did you know? When Ronaldo first signed with Manchester United, he requested number 28, but Sir Alex Ferguson insisted he wear the historic number 7 jersey worn by Best, Cantona, and Beckham!"
  },
  {
    id: 2,
    title: 'Challenge 2: The Iconic Celebration',
    question: "Which world-famous celebration does Cristiano Ronaldo perform after scoring legendary goals?",
    options: [
      { text: 'The Knee Slide & Prayer', isCorrect: false, hint: 'A classic football celebration, but not his trademark.' },
      { text: 'The Mid-Air Pirouette & Roaring "SIUUUU!" 🌪️', isCorrect: true, hint: 'SIUUUUUU! The entire stadium screams it together!' },
      { text: 'The Robot Dance', isCorrect: false, hint: 'That was Peter Crouch!' },
      { text: 'The Corner Flag Kick', isCorrect: false, hint: 'Too destructive for the GOAT!' }
    ],
    funFact: "Ronaldo debuted the 'SIUU' celebration during a pre-season match against Chelsea in the USA in 2013, shouting 'SÍ' (Spanish for Yes!) as an instinctive roar of victory!"
  },
  {
    id: 3,
    title: 'Challenge 3: The Golden Era Club',
    question: "At which club did Cristiano Ronaldo achieve an unbelievable 450 goals in 438 matches and 4 UEFA Champions League trophies?",
    options: [
      { text: 'Sporting CP (Green & White)', isCorrect: false, hint: 'That was his magnificent starting point!' },
      { text: 'Juventus (Black & White Stripes)', isCorrect: false, hint: 'He won 2 Serie A titles there, but the 4 UCLs were elsewhere!' },
      { text: 'Real Madrid (The Royal Whites) 👑', isCorrect: true, hint: 'HALA MADRID! An untouchable ratio of >1 goal per game!' },
      { text: 'Al Nassr (Yellow & Blue)', isCorrect: false, hint: 'That is his current high-flying adventure!' }
    ],
    funFact: "During his 9 seasons at Real Madrid, Ronaldo scored at least 30 goals every single season and averaged an impossible 50 goals per season over 6 consecutive years!"
  }
];

export const MOTIVATIONAL_WORDS = [
  { word: 'BELIEVE.', subtitle: 'Everything starts with unshakable faith in yourself.' },
  { word: 'WORK HARD.', subtitle: 'Talent without relentless dedication is nothing.' },
  { word: 'STAY HUMBLE.', subtitle: 'True champions respect the journey and their people.' },
  { word: 'NEVER GIVE UP.', subtitle: 'Obstacles exist only to prove how far you can rise.' },
  { word: 'BE THE GOAT.', subtitle: 'Stand tall, make your mark, and inspire the world.' }
];
