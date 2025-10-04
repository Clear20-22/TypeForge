// Lesson data structure for TypeForge

export const lessons = [
  {
    id: 1,
    title: "Home Row Basics",
    level: "Beginner",
    keys: "ASDF JKL;",
    description: "Master the foundation of touch typing with home row keys",
    exercises: [
      "asdf jkl; asdf jkl;",
      "fff jjj fff jjj ddd kkk",
      "aaa ;;; sss lll",
      "fad jak fad jak",
      "sad lad fad jal",
      "flask desk fall jazz",
      "a sad lad; a flask; a fall",
    ],
    instructions: "Keep your fingers on the home row. Index fingers on F and J.",
    estimatedTime: "5-10 minutes",
  },
  {
    id: 2,
    title: "Top Row Practice",
    level: "Beginner",
    keys: "QWER TYUIOP",
    description: "Extend your reach to the top row keys",
    exercises: [
      "qwer tyuiop qwer tyuiop",
      "qqq www eee rrr",
      "ttt yyy uuu iii",
      "quit wet riot poet",
      "quite write trout pout",
      "we were quiet; you were there",
      "power tower wiper water",
    ],
    instructions: "Stretch your fingers up to reach the top row. Return to home row after each key.",
    estimatedTime: "8-12 minutes",
  },
  {
    id: 3,
    title: "Bottom Row Mastery",
    level: "Intermediate",
    keys: "ZXCV BNM",
    description: "Complete your letter knowledge with bottom row keys",
    exercises: [
      "zxcv bnm, zxcv bnm,",
      "zzz xxx ccc vvv",
      "bbb nnn mmm",
      "zinc can van ban",
      "cave buzz mix moon",
      "a black van; a cozy cabin",
      "maximize cave zone cabin",
    ],
    instructions: "Reach down for bottom row keys. Keep other fingers anchored.",
    estimatedTime: "10-15 minutes",
  },
  {
    id: 4,
    title: "Number Row",
    level: "Intermediate",
    keys: "1234567890",
    description: "Add numbers to your typing arsenal",
    exercises: [
      "1234567890 1234567890",
      "111 222 333 444 555",
      "666 777 888 999 000",
      "12 34 56 78 90",
      "the 1st and 2nd place",
      "call 555-1234 today",
      "in 2025 we have 365 days",
    ],
    instructions: "Use the same fingers that rest below each number on the home row.",
    estimatedTime: "10-15 minutes",
  },
  {
    id: 5,
    title: "Special Characters",
    level: "Advanced",
    keys: "!@#$%^&*()",
    description: "Master special characters and symbols",
    exercises: [
      "!@#$ %^&*() !@#$ %^&*()",
      "hello! how are you?",
      "email@example.com",
      "cost: $99.99 (sale!)",
      "100% success rate!",
      "use #hashtags @mentions",
      "calculate: 5 + 3 = 8",
    ],
    instructions: "Hold shift for special characters. Practice smooth transitions.",
    estimatedTime: "12-18 minutes",
  },
  {
    id: 6,
    title: "Full Sentences",
    level: "Advanced",
    keys: "All Keys",
    description: "Practice realistic typing with full sentences",
    exercises: [
      "The quick brown fox jumps over the lazy dog.",
      "Practice makes perfect when learning to type.",
      "Touch typing improves speed and accuracy.",
      "Keep your eyes on the screen, not the keyboard.",
      "Consistency is the key to mastering any skill.",
      "Every expert was once a beginner.",
      "Type with confidence and precision.",
    ],
    instructions: "Focus on accuracy first, speed will come naturally with practice.",
    estimatedTime: "15-20 minutes",
  },
];

// Get lesson by ID
export const getLessonById = (id) => {
  return lessons.find(lesson => lesson.id === parseInt(id));
};

// Get lessons by level
export const getLessonsByLevel = (level) => {
  return lessons.filter(lesson => lesson.level === level);
};
