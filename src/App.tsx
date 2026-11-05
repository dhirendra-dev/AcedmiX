import { useEffect, useMemo, useState, type ChangeEvent, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Compass,
  Flame,
  FlaskConical,
  GraduationCap,
  Laptop,
  Library,
  LogOut,
  Menu,
  MoreHorizontal,
  Play,
  Search,
  Settings2,
  Sparkles,
  Trophy,
  UserRound,
  X,
  ChartNoAxesColumnIncreasing,
  CalendarDays, Timer, Plus, Pause, RotateCcw, Target, Sun, Moon, Bookmark, BookmarkCheck,
  NotebookPen, StickyNote, Layers3, RotateCw, Trash2, BrainCircuit, CalendarClock, CheckCircle2,
} from 'lucide-react';

type Page = 'welcome' | 'home' | 'library' | 'course' | 'progress' | 'profile' | 'planner' | 'focus' | 'practice' | 'notes' | 'revision';
type Category = 'All' | 'Mathematics' | 'Science' | 'Technology' | 'Languages' | 'Study skills';

type Lesson = {
  id: string;
  title: string;
  duration: string;
  type: 'Video' | 'Reading' | 'Practice';
};

type Course = {
  id: string;
  title: string;
  category: Exclude<Category, 'All'>;
  description: string;
  duration: string;
  level: string;
  lessons: Lesson[];
  accent: 'green' | 'cream' | 'orange' | 'blue';
};

const courses: Course[] = [
  {
    id: 'study-habits',
    title: 'Build Better Study Habits',
    category: 'Study skills',
    description: 'Learn how to study smarter, stay consistent, and get the most out of your learning time.',
    duration: '4h 30m',
    level: 'Beginner',
    accent: 'green',
    lessons: [
      { id: 'study-1', title: 'Make learning a daily ritual', duration: '18 min', type: 'Video' },
      { id: 'study-2', title: 'The art of focused attention', duration: '24 min', type: 'Video' },
      { id: 'study-3', title: 'Build a study plan that lasts', duration: '16 min', type: 'Reading' },
      { id: 'study-4', title: 'Remember more, revise less', duration: '21 min', type: 'Video' },
      { id: 'study-5', title: 'Your weekly reset', duration: '12 min', type: 'Practice' },
    ],
  },
  {
    id: 'math-foundations',
    title: 'Mathematics, Reimagined',
    category: 'Mathematics',
    description: 'Build a confident foundation in numbers, patterns, equations, and the ideas behind them.',
    duration: '6h 10m',
    level: 'Beginner',
    accent: 'orange',
    lessons: [
      { id: 'math-1', title: 'Patterns in everyday life', duration: '20 min', type: 'Video' },
      { id: 'math-2', title: 'Numbers and relationships', duration: '28 min', type: 'Reading' },
      { id: 'math-3', title: 'Equations made visual', duration: '32 min', type: 'Video' },
      { id: 'math-4', title: 'Practice: think in patterns', duration: '18 min', type: 'Practice' },
    ],
  },
  {
    id: 'science-motion',
    title: 'The Science of Motion',
    category: 'Science',
    description: 'Explore forces, movement, and the elegant rules that shape the world around us.',
    duration: '5h 20m',
    level: 'Intermediate',
    accent: 'blue',
    lessons: [
      { id: 'science-1', title: 'A world in motion', duration: '22 min', type: 'Video' },
      { id: 'science-2', title: 'Forces you cannot see', duration: '26 min', type: 'Video' },
      { id: 'science-3', title: 'Newton’s ideas, simply explained', duration: '30 min', type: 'Reading' },
      { id: 'science-4', title: 'Experiment: motion around you', duration: '25 min', type: 'Practice' },
    ],
  },
  {
    id: 'data-stories',
    title: 'Data Stories for Everyone',
    category: 'Technology',
    description: 'Turn information into insight with clear thinking, simple tools, and visual storytelling.',
    duration: '3h 45m',
    level: 'Beginner',
    accent: 'cream',
    lessons: [
      { id: 'data-1', title: 'What a dataset can tell you', duration: '19 min', type: 'Video' },
      { id: 'data-2', title: 'Ask better questions', duration: '17 min', type: 'Reading' },
      { id: 'data-3', title: 'Make your first visual', duration: '29 min', type: 'Practice' },
    ],
  },
  {
    id: 'language-confidence',
    title: 'Speak with Confidence',
    category: 'Languages',
    description: 'Practice the small, repeatable skills that make everyday communication feel natural.',
    duration: '2h 55m',
    level: 'All levels',
    accent: 'orange',
    lessons: [
      { id: 'lang-1', title: 'Find your natural rhythm', duration: '14 min', type: 'Video' },
      { id: 'lang-2', title: 'Everyday expressions', duration: '20 min', type: 'Reading' },
      { id: 'lang-3', title: 'A little practice, every day', duration: '15 min', type: 'Practice' },
    ],
  },
];

const categories: { name: Exclude<Category, 'All'>; icon: typeof GraduationCap; tint: string; note: string }[] = [
  { name: 'Mathematics', icon: GraduationCap, tint: 'sand', note: 'Think in patterns' },
  { name: 'Science', icon: FlaskConical, tint: 'lilac', note: 'Explore the why' },
  { name: 'Technology', icon: Laptop, tint: 'sage', note: 'Make things happen' },
  { name: 'Languages', icon: BookOpen, tint: 'peach', note: 'Find your words' },
];

const navItems: { page: Exclude<Page, 'welcome' | 'course'>; label: string; icon: typeof Compass }[] = [
  { page: 'home', label: 'Home', icon: Compass },
  { page: 'library', label: 'Library', icon: Library },
  { page: 'practice', label: 'Practice', icon: Trophy },
  { page: 'notes', label: 'Notes', icon: NotebookPen },
  { page: 'revision', label: 'Revision', icon: BrainCircuit },
  { page: 'planner', label: 'Planner', icon: CalendarDays },
  { page: 'focus', label: 'Focus', icon: Timer },
  { page: 'progress', label: 'Progress', icon: ChartNoAxesColumnIncreasing },
  { page: 'profile', label: 'Profile', icon: UserRound },
];

type StudyTask = { id: string; title: string; subject: string; done: boolean; dueDate: string; priority: 'Low' | 'Normal' | 'High'; recurrence: 'None' | 'Daily' | 'Weekly'; completedDates: string[] };
type QuizQuestion = { id: string; subject: string; prompt: string; options: string[]; answer: number; explanation: string };
type StudyNote = { id: string; title: string; body: string; subject: string; updatedAt: number };
type Flashcard = { id: string; front: string; back: string; subject: string; dueAt: number; intervalDays: number; repetitions: number };
const quizQuestions: QuizQuestion[] = [
  { id: 'q1', subject: 'Mathematics', prompt: 'What is the value of 3² + 4²?', options: ['12', '25', '49', '7'], answer: 1, explanation: '3² = 9 and 4² = 16. Adding them gives 25.' },
  { id: 'q2', subject: 'Science', prompt: 'Which unit is used to measure force?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], answer: 2, explanation: 'Force is measured in newtons (N), named after Isaac Newton.' },
  { id: 'q3', subject: 'Technology', prompt: 'What does HTML describe?', options: ['Page structure', 'A database', 'A network cable', 'Image compression'], answer: 0, explanation: 'HTML provides the semantic structure and content of a web page.' },
  { id: 'q4', subject: 'Mathematics', prompt: 'If x + 7 = 12, what is x?', options: ['19', '7', '5', '4'], answer: 2, explanation: 'Subtract 7 from both sides: x = 12 − 7 = 5.' },
  { id: 'q5', subject: 'Science', prompt: 'Which gas do plants absorb during photosynthesis?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], answer: 1, explanation: 'Plants use carbon dioxide and water, with light energy, to make glucose.' },
];

function localDateKey(date: Date): string { const y = date.getFullYear(); const m = String(date.getMonth() + 1).padStart(2, '0'); const d = String(date.getDate()).padStart(2, '0'); return `${y}-${m}-${d}`; }
function shiftDate(dateKey: string, amount: number): string { const [y, m, d] = dateKey.split('-').map(Number); const date = new Date(y, m - 1, d); date.setDate(date.getDate() + amount); return localDateKey(date); }
function weekStart(dateKey: string): string { const [y, m, d] = dateKey.split('-').map(Number); const date = new Date(y, m - 1, d); date.setDate(date.getDate() - ((date.getDay() + 6) % 7)); return localDateKey(date); }
function taskOccursOn(task: StudyTask, dateKey: string): boolean { if (dateKey < task.dueDate) return false; if (task.recurrence === 'Daily') return true; if (task.recurrence === 'Weekly') { const [y, m, d] = task.dueDate.split('-').map(Number); const [yy, mm, dd] = dateKey.split('-').map(Number); return new Date(y, m - 1, d).getDay() === new Date(yy, mm - 1, dd).getDay(); } return dateKey === task.dueDate; }
function taskIsDone(task: StudyTask, dateKey: string): boolean { return task.recurrence === 'None' ? task.done : task.completedDates.includes(dateKey); }

function readTasks(): StudyTask[] {
  try {
    const value = window.localStorage.getItem('acedmix-study-tasks');
    const parsed: unknown = value ? JSON.parse(value) : [
      { id: 'task-1', title: 'Review yesterday’s notes', subject: 'Revision', done: false },
      { id: 'task-2', title: 'Complete one practice set', subject: 'Mathematics', done: false },
      { id: 'task-3', title: 'Read a new lesson', subject: 'Science', done: true },
    ];
    return Array.isArray(parsed) ? parsed.filter((item) => item && typeof item.id === 'string' && typeof item.title === 'string' && typeof item.subject === 'string' && typeof item.done === 'boolean').map((item) => ({ id: item.id, title: item.title, subject: item.subject, done: item.done, dueDate: typeof item.dueDate === 'string' ? item.dueDate : localDateKey(new Date()), priority: item.priority === 'Low' || item.priority === 'High' ? item.priority : 'Normal', recurrence: item.recurrence === 'Daily' || item.recurrence === 'Weekly' ? item.recurrence : 'None', completedDates: Array.isArray(item.completedDates) ? item.completedDates.filter((date) => typeof date === 'string') : [] })) : [];
  } catch { return []; }
}

const defaultCourseId = 'study-habits';
function readNotes(): StudyNote[] { try { const v: unknown = JSON.parse(window.localStorage.getItem('acedmix-notes') || '[]'); return Array.isArray(v) ? v.filter((x): x is StudyNote => x && typeof x.id === 'string' && typeof x.title === 'string' && typeof x.body === 'string' && typeof x.subject === 'string' && typeof x.updatedAt === 'number') : []; } catch { return []; } }
function readFlashcards(): Flashcard[] { try { const v: unknown = JSON.parse(window.localStorage.getItem('acedmix-flashcards') || '[]'); return Array.isArray(v) ? v.filter((x) => x && typeof x.id === 'string' && typeof x.front === 'string' && typeof x.back === 'string' && typeof x.subject === 'string').map((x) => ({ id: x.id, front: x.front, back: x.back, subject: x.subject, dueAt: typeof x.dueAt === 'number' ? x.dueAt : Date.now(), intervalDays: typeof x.intervalDays === 'number' ? x.intervalDays : 0, repetitions: typeof x.repetitions === 'number' ? x.repetitions : 0 })) : []; } catch { return []; } }

function readCompleted(): string[] {
  try {
    const saved = window.localStorage.getItem('acedmix-completed-lessons');
    const parsed: unknown = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) && parsed.every((value) => typeof value === 'string') ? parsed : [];
  } catch {
    return [];
  }
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? 'brand-compact' : ''}`} aria-label="AcedmiX">
      Acedmi<span className="brand-x">X</span>
    </span>
  );
}

function IconButton({ label, children, onClick }: { label: string; children: ReactNode; onClick: () => void }) {
  return (
    <button className="icon-button" type="button" aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [page, setPage] = useState<Page>('welcome');
  const [selectedCourseId, setSelectedCourseId] = useState(defaultCourseId);
  const [completedLessons, setCompletedLessons] = useState<string[]>(readCompleted);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [toast, setToast] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [tasks, setTasks] = useState<StudyTask[]>(readTasks);
  const [newTask, setNewTask] = useState('');
  const [newSubject, setNewSubject] = useState('General');
  const [newTaskDate, setNewTaskDate] = useState(() => localDateKey(new Date()));
  const [newTaskPriority, setNewTaskPriority] = useState<'Low' | 'Normal' | 'High'>('Normal');
  const [newTaskRecurrence, setNewTaskRecurrence] = useState<'None' | 'Daily' | 'Weekly'>('None');
  const [plannerDate, setPlannerDate] = useState(() => localDateKey(new Date()));
  const [focusMode, setFocusMode] = useState<'focus' | 'short' | 'long'>('focus');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [focusSessions, setFocusSessions] = useState(() => Number(window.localStorage.getItem('acedmix-focus-sessions') || 0));
  const [darkMode, setDarkMode] = useState(() => window.localStorage.getItem('acedmix-theme') === 'dark');
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>(() => { try { const v = JSON.parse(window.localStorage.getItem('acedmix-saved-courses') || '[]'); return Array.isArray(v) ? v.filter((id): id is string => typeof id === 'string') : []; } catch { return []; } });
  const [savedOnly, setSavedOnly] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizBestScore, setQuizBestScore] = useState(() => Number(window.localStorage.getItem('acedmix-quiz-best') || 0));
  const [notes, setNotes] = useState<StudyNote[]>(readNotes);
  const [noteTitle, setNoteTitle] = useState(''); const [noteBody, setNoteBody] = useState(''); const [noteSubject, setNoteSubject] = useState('General'); const [noteSearch, setNoteSearch] = useState('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>(readFlashcards); const [cardFront, setCardFront] = useState(''); const [cardBack, setCardBack] = useState(''); const [cardSubject, setCardSubject] = useState('General'); const [activeCard, setActiveCard] = useState(0); const [cardFlipped, setCardFlipped] = useState(false); const [notesTab, setNotesTab] = useState<'notes' | 'flashcards'>('notes'); const [revisionIndex, setRevisionIndex] = useState(0); const [revisionFlipped, setRevisionFlipped] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('acedmix-completed-lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);
  useEffect(() => { window.localStorage.setItem('acedmix-study-tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { window.localStorage.setItem('acedmix-saved-courses', JSON.stringify(savedCourseIds)); }, [savedCourseIds]);
  useEffect(() => { window.localStorage.setItem('acedmix-focus-sessions', String(focusSessions)); }, [focusSessions]);
  useEffect(() => { window.localStorage.setItem('acedmix-quiz-best', String(quizBestScore)); }, [quizBestScore]);
  useEffect(() => { window.localStorage.setItem('acedmix-notes', JSON.stringify(notes)); }, [notes]);
  useEffect(() => { window.localStorage.setItem('acedmix-flashcards', JSON.stringify(flashcards)); }, [flashcards]);
  useEffect(() => {
    if (!timerRunning) return;
    const timer = window.setInterval(() => setSecondsLeft((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [timerRunning]);
  useEffect(() => {
    if (!timerRunning || secondsLeft !== 0) return;
    setTimerRunning(false);
    if (focusMode === 'focus') setFocusSessions((count) => count + 1);
    setToast(focusMode === 'focus' ? 'Focus session complete. Take a well-earned break.' : 'Break complete. Ready for another round?');
  }, [secondsLeft, timerRunning, focusMode]);
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    window.localStorage.setItem('acedmix-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); navigate('library'); window.setTimeout(() => document.querySelector<HTMLInputElement>('.library-search input')?.focus(), 0); }
      if (event.key === 'Escape') setShowMobileMenu(false);
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const selectedCourse = courses.find((course) => course.id === selectedCourseId) ?? courses[0];
  const allLessons = courses.flatMap((course) => course.lessons);
  const totalLessons = allLessons.length;
  const completedCount = completedLessons.filter((id) => allLessons.some((lesson) => lesson.id === id)).length;
  const completedMinutes = allLessons.filter((lesson) => completedLessons.includes(lesson.id)).reduce((total, lesson) => total + Number.parseInt(lesson.duration, 10), 0);
  const progressPercent = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0;
  const filteredCourses = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesCategory = category === 'All' || course.category === category;
      const matchesSearch = !normalized || `${course.title} ${course.description} ${course.category}`.toLowerCase().includes(normalized);
      const matchesSaved = !savedOnly || savedCourseIds.includes(course.id);
      return matchesCategory && matchesSearch && matchesSaved;
    });
  }, [category, search, savedOnly, savedCourseIds]);

  const startApp = () => setPage('home');
  const openCourse = (id: string) => {
    setSelectedCourseId(id);
    setPage('course');
  };
  const navigate = (nextPage: Exclude<Page, 'welcome' | 'course'>) => {
    setPage(nextPage);
    setShowMobileMenu(false);
    if (nextPage !== 'library') {
      setSearch('');
      setCategory('All');
    }
  };
  const toggleLesson = (id: string) => {
    setCompletedLessons((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    setToast(completedLessons.includes(id) ? 'Lesson marked as not completed' : 'Lesson completed — nice work');
  };
  const toggleSavedCourse = (id: string) => {
    const exists = savedCourseIds.includes(id);
    setSavedCourseIds((current) => exists ? current.filter((item) => item !== id) : [...current, id]);
    setToast(exists ? 'Removed from your saved courses' : 'Course saved to your library');
  };
  const addTask = () => {
    const title = newTask.trim();
    if (!title) return;
    setTasks((current) => [...current, { id: `task-${Date.now()}`, title, subject: newSubject, done: false, dueDate: newTaskDate, priority: newTaskPriority, recurrence: newTaskRecurrence, completedDates: [] }]);
    setNewTask('');
    setToast('Added to your study plan');
  };
  const plannerWeekStart = weekStart(plannerDate);
  const plannerWeekDays = Array.from({ length: 7 }, (_, index) => shiftDate(plannerWeekStart, index));
  const plannerDayTasks = tasks.filter((task) => taskOccursOn(task, plannerDate));
  const plannerDoneCount = plannerDayTasks.filter((task) => taskIsDone(task, plannerDate)).length;
  const plannerBacklog = tasks.filter((task) => task.recurrence === 'None' && task.dueDate < plannerDate && !task.done);
  const togglePlannerTask = (task: StudyTask) => {
    if (task.recurrence === 'None') setTasks((current) => current.map((item) => item.id === task.id ? { ...item, done: !item.done } : item));
    else setTasks((current) => current.map((item) => item.id === task.id ? { ...item, completedDates: item.completedDates.includes(plannerDate) ? item.completedDates.filter((date) => date !== plannerDate) : [...item.completedDates, plannerDate] } : item));
  };
  const setTimerPreset = (mode: 'focus' | 'short' | 'long') => {
    setTimerRunning(false);
    setFocusMode(mode);
    setSecondsLeft(mode === 'focus' ? 25 * 60 : mode === 'short' ? 5 * 60 : 15 * 60);
  };
  const quizScore = quizQuestions.filter((question) => quizAnswers[question.id] === question.answer).length;
  const submitQuiz = () => {
    if (Object.keys(quizAnswers).length !== quizQuestions.length) {
      setToast('Answer every question before checking your work');
      return;
    }
    setQuizSubmitted(true);
    setQuizBestScore((best) => Math.max(best, Math.round((quizScore / quizQuestions.length) * 100)));
  };
  const resetQuiz = () => { setQuizAnswers({}); setQuizSubmitted(false); };
  const addNote = () => { const title = noteTitle.trim(), body = noteBody.trim(); if (!title || !body) { setToast('Add a title and a few note details first'); return; } setNotes((items) => [{ id: 'note-' + Date.now(), title, body, subject: noteSubject, updatedAt: Date.now() }, ...items]); setNoteTitle(''); setNoteBody(''); setToast('Note saved on this device'); };
  const addFlashcard = () => { const front = cardFront.trim(), back = cardBack.trim(); if (!front || !back) { setToast('Add both sides of your flashcard'); return; } setFlashcards((items) => [...items, { id: 'card-' + Date.now(), front, back, subject: cardSubject, dueAt: Date.now(), intervalDays: 0, repetitions: 0 }]); setCardFront(''); setCardBack(''); setToast('Flashcard added to your deck'); };
  const dueFlashcards = flashcards.filter((card) => card.dueAt <= Date.now());
  const reviewCard = dueFlashcards[revisionIndex % Math.max(dueFlashcards.length, 1)];
  const gradeReview = (rating: 'again' | 'hard' | 'good' | 'easy') => { if (!reviewCard) return; const nextInterval = rating === 'again' ? 0 : rating === 'hard' ? Math.max(1, reviewCard.intervalDays || 1) : rating === 'good' ? Math.max(1, Math.round((reviewCard.intervalDays || 1) * 2)) : Math.max(3, Math.round((reviewCard.intervalDays || 1) * 3)); const dueAt = rating === 'again' ? Date.now() + 10 * 60 * 1000 : Date.now() + nextInterval * 86400000; setFlashcards((items) => items.map((card) => card.id === reviewCard.id ? { ...card, dueAt, intervalDays: nextInterval, repetitions: rating === 'again' ? 0 : card.repetitions + 1 } : card)); setRevisionFlipped(false); setRevisionIndex(0); setToast(rating === 'again' ? 'We will revisit this card in 10 minutes' : 'Review scheduled. Keep going!'); };
  const resetProgress = () => {
    setCompletedLessons([]);
    setToast('Demo progress has been reset');
  };

  if (page === 'welcome') {
    return (
      <div className="welcome-page">
        <div className="welcome-grain" />
        <header className="welcome-header"><Brand /><span className="welcome-kicker">A PLACE TO GROW</span></header>
        <main className="welcome-content">
          <div className="welcome-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> THE ART OF LEARNING</p>
            <h1>Learn<br />Smarter.<br /><em>Go Further.</em></h1>
            <p className="welcome-description">Personalized learning, real-world skills, and more — all in one place.</p>
            <div className="welcome-actions">
              <button className="button button-dark welcome-cta" onClick={startApp} type="button">Get Started <ArrowRight size={18} /></button>
              <button className="text-button" onClick={startApp} type="button">Explore as a guest</button>
            </div>
          </div>
          <div className="welcome-art" aria-hidden="true">
            <div className="art-sun" />
            <div className="art-arc art-arc-one" />
            <div className="art-arc art-arc-two" />
            <div className="art-caption"><span>01 / 04</span><span>Curiosity looks good on you.</span></div>
          </div>
        </main>
        <footer className="welcome-footer"><span>LEARN AT YOUR OWN PACE</span><span>EST. FOR THE CURIOUS <ArrowUpRight size={13} /></span></footer>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand"><Brand /></div>
        <p className="sidebar-label">YOUR SPACE</p>
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map(({ page: navPage, label, icon: Icon }) => (
            <button key={navPage} type="button" className={`side-link ${page === navPage ? 'active' : ''}`} onClick={() => navigate(navPage)}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>{page === navPage && <span className="nav-active-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-spacer" />
        <div className="sidebar-note">
          <div className="sidebar-note-icon"><Sparkles size={17} /></div>
          <p className="sidebar-note-title">A little progress<br />goes a long way.</p>
          <span>Keep showing up.</span>
        </div>
        <button className="profile-mini" onClick={() => navigate('profile')} type="button">
          <span className="avatar">L</span><span className="profile-mini-copy"><strong>Learner</strong><small>My account</small></span><MoreHorizontal size={18} />
        </button>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="mobile-brand"><Brand compact /></div>
          <div className="breadcrumb"><span>YOUR SPACE</span><ChevronRight size={13} /> <strong>{page === 'course' ? 'COURSE' : page.toUpperCase()}</strong></div>
          <div className="topbar-actions">
            <button className="topbar-search" type="button" onClick={() => navigate('library')}><Search size={16} /><span>Find something to learn</span><kbd>⌘ K</kbd></button>
            <IconButton label="Notifications" onClick={() => setToast('You’re all caught up')}><Bell size={18} /></IconButton>
            <button className="avatar avatar-top" type="button" aria-label="Open profile" onClick={() => navigate('profile')}>L</button>
            <IconButton label="Open menu" onClick={() => setShowMobileMenu((value) => !value)}><Menu size={19} /></IconButton>
          </div>
        </header>

        {showMobileMenu && <div className="mobile-menu">{navItems.map(({ page: navPage, label, icon: Icon }) => <button key={navPage} onClick={() => navigate(navPage)} type="button"><Icon size={17} />{label}</button>)}</div>}

        <main className="page-content">
          {page === 'home' && (
            <>
              <section className="home-intro">
                <div><p className="eyebrow">A NEW DAY, A NEW CHAPTER</p><h1>Good morning,<br /><em>curious mind.</em></h1><p className="intro-subtitle">Ready to learn something new?</p></div>
                <div className="intro-illustration" aria-hidden="true"><div className="intro-mountain intro-mountain-back" /><div className="intro-mountain intro-mountain-front" /><div className="intro-flag">✳</div></div>
              </section>

              <section className="featured-course">
                <div className="featured-art" aria-hidden="true"><div className="book book-one" /><div className="book book-two" /><div className="book book-three" /><span className="featured-spark">✳</span></div>
                <div className="featured-copy"><span className="section-overline">THE EDITOR’S PICK <span className="orange-dot" /></span><h2>Build Better<br />Study Habits</h2><p>A few thoughtful changes can transform the way you learn.</p><button className="button button-paper" onClick={() => openCourse('study-habits')} type="button">Explore course <ArrowRight size={16} /></button></div>
                <div className="featured-index">01 <span> / 05</span></div>
              </section>

              <section className="section-block category-block">
                <div className="section-heading"><div><p className="eyebrow">FIND YOUR CURIOSITY</p><h2>Explore categories</h2></div><button className="link-button" type="button" onClick={() => navigate('library')}>View all <ArrowRight size={15} /></button></div>
                <div className="category-grid">
                  {categories.map(({ name, icon: Icon, tint, note }) => (
                    <button className="category-tile" key={name} type="button" onClick={() => { setCategory(name); setPage('library'); }}>
                      <span className={`category-icon ${tint}`}><Icon size={23} strokeWidth={1.7} /></span><span className="category-name">{name}</span><span className="category-note">{note}</span><ArrowUpRight className="category-arrow" size={15} />
                    </button>
                  ))}
                </div>
              </section>

              <section className="section-block journey-block">
                <div className="section-heading"><div><p className="eyebrow">A GOOD THING IN MOTION</p><h2>Your learning journey</h2></div><button className="link-button" type="button" onClick={() => navigate('progress')}>Your progress <ArrowRight size={15} /></button></div>
                <div className="journey-list">
                  {courses.slice(0, 2).map((course, index) => { const done = course.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length; const pct = Math.round((done / course.lessons.length) * 100); return (
                    <button className="journey-row" type="button" key={course.id} onClick={() => openCourse(course.id)}>
                      <span className={`journey-thumb thumb-${index}`}><BookOpen size={21} /></span><span className="journey-info"><strong>{course.title}</strong><small>{course.category} <span>·</span> {course.lessons.length} lessons</small></span><span className="journey-progress"><span className="progress-track"><span style={{ width: `${pct}%` }} /></span><small>{pct}%</small></span><ChevronRight size={17} className="journey-chevron" />
                    </button>
                  ); })}
                  <button className="journey-row journey-row-muted" type="button" onClick={() => navigate('library')}><span className="journey-thumb thumb-add"><Sparkles size={20} /></span><span className="journey-info"><strong>There’s more to discover</strong><small>Find a new idea to explore today</small></span><span className="journey-open">Explore <ArrowUpRight size={14} /></span></button>
                </div>
              </section>
            </>
          )}

          {page === 'library' && (
            <>
              <section className="page-heading-row"><div><p className="eyebrow">A WORLD OF IDEAS</p><h1>Learning <em>library.</em></h1><p className="intro-subtitle">Follow a question. Find a new direction.</p></div><div className="library-stamp"><Library size={24} /><span>CURATED<br />FOR YOU</span></div></section>
              <div className="library-search"><Search size={18} /><input value={search} onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} placeholder="Search courses, topics, or skills..." aria-label="Search courses" />{search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search"><X size={16} /></button>}<span className="search-shortcut">SEARCH</span></div>
              <div className="filter-row" role="group" aria-label="Filter by category"><button type="button" className={`filter-chip ${!savedOnly ? 'selected' : ''}`} onClick={() => setSavedOnly(false)}>All courses</button><button type="button" className={`filter-chip ${savedOnly ? 'selected' : ''}`} onClick={() => setSavedOnly(true)}><Bookmark size={12} /> Saved ({savedCourseIds.length})</button>{(['All', ...categories.map((item) => item.name), 'Study skills'] as Category[]).map((item) => <button key={item} type="button" className={`filter-chip ${category === item ? 'selected' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}</div>
              <div className="library-results-head"><span>{filteredCourses.length} COURSES</span><button type="button" className="sort-button" onClick={() => setToast('Showing our editor’s selection')}><Settings2 size={15} /> Curated for you <ChevronDown size={14} /></button></div>
              <div className="course-grid">
                {filteredCourses.map((course, index) => <CourseCard key={course.id} course={course} index={index} onOpen={() => openCourse(course.id)} />)}
              </div>
              {filteredCourses.length === 0 && <div className="empty-state"><Search size={28} /><h3>No courses found</h3><p>Try another search or choose a different category.</p><button className="button button-dark" onClick={() => { setSearch(''); setCategory('All'); }} type="button">Clear filters</button></div>}
            </>
          )}

          {page === 'course' && (
            <>
              <button className="back-link" type="button" onClick={() => setPage('library')}><ArrowLeft size={16} /> Back to library</button>
              <section className="course-hero">
                <div className={`course-hero-art art-${selectedCourse.accent}`} aria-hidden="true"><div className="hero-shape hero-shape-one" /><div className="hero-shape hero-shape-two" /><div className="hero-orb" /><span className="hero-mark">✳</span></div>
                <div className="course-hero-copy"><div className="course-hero-topline"><p className="eyebrow">{selectedCourse.category.toUpperCase()} <span className="orange-dot" /> FEATURED COURSE</p><button className="save-course-button" type="button" onClick={() => toggleSavedCourse(selectedCourse.id)}>{savedCourseIds.includes(selectedCourse.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}{savedCourseIds.includes(selectedCourse.id) ? 'Saved' : 'Save course'}</button></div><h1>{selectedCourse.title.split(', ').length > 1 ? <>{selectedCourse.title.split(', ')[0]},<br /><em>{selectedCourse.title.split(', ').slice(1).join(', ')}</em></> : <>{selectedCourse.title.split(' ').slice(0, 2).join(' ')}<br /><em>{selectedCourse.title.split(' ').slice(2).join(' ')}</em></>}</h1><p>{selectedCourse.description}</p><div className="course-meta"><span><Clock3 size={15} /> {selectedCourse.duration}</span><span><ChartNoAxesColumnIncreasing size={15} /> {selectedCourse.level}</span><span><Play size={14} /> {selectedCourse.lessons.length} lessons</span></div><button className="button button-orange" type="button" onClick={() => { const next = selectedCourse.lessons.find((lesson) => !completedLessons.includes(lesson.id)); if (next) { setToast(`Ready when you are: ${next.title}`); } else { setToast('You have completed every lesson in this course'); } }}><Play size={15} fill="currentColor" /> Continue learning</button></div>
              </section>
              <div className="course-content-grid">
                <section className="course-outcomes"><p className="eyebrow">THE BIG PICTURE</p><h2>What you’ll <em>learn.</em></h2><ul><li><Check size={16} /> Create a learning routine that works for you</li><li><Check size={16} /> Make room for focus and curiosity</li><li><Check size={16} /> Build momentum, one day at a time</li></ul><div className="outcome-note"><Sparkles size={17} /><span>Small steps are still steps forward.</span></div></section>
                <section className="curriculum"><div className="section-heading"><div><p className="eyebrow">YOUR COURSE PLAN</p><h2>Inside the course</h2></div><span className="lesson-count">{selectedCourse.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length}/{selectedCourse.lessons.length} done</span></div><div className="lesson-list">{selectedCourse.lessons.map((lesson, index) => { const done = completedLessons.includes(lesson.id); return <div className={`lesson-row ${done ? 'lesson-done' : ''}`} key={lesson.id}><span className="lesson-number">{done ? <Check size={15} /> : String(index + 1).padStart(2, '0')}</span><span className="lesson-copy"><strong>{lesson.title}</strong><small>{lesson.type} <span>·</span> {lesson.duration}</small></span><button type="button" className={`lesson-action ${done ? 'done' : ''}`} onClick={() => toggleLesson(lesson.id)} aria-label={done ? `Mark ${lesson.title} incomplete` : `Mark ${lesson.title} complete`}>{done ? <Check size={16} /> : <Play size={14} />}</button></div>; })}</div></section>
              </div>
            </>
          )}

          {page === 'progress' && (
            <>
              <section className="page-heading-row progress-heading"><div><p className="eyebrow">EVERY STEP COUNTS</p><h1>Your <em>progress.</em></h1><p className="intro-subtitle">Keep going. You’re building something good.</p></div><span className="progress-date">YOUR LEARNING<br />AT A GLANCE</span></section>
              <section className="progress-overview">
                <div className="progress-ring-wrap"><div className="progress-ring" style={{ '--progress': `${progressPercent}%` } as CSSProperties}><div className="progress-ring-inner"><strong>{progressPercent}%</strong><span>Overall progress</span></div></div><span className="ring-label ring-label-left">A LITTLE<br />EVERY DAY</span><span className="ring-label ring-label-right">KEEP<br />GROWING</span></div>
                <div className="progress-summary"><p className="eyebrow">YOUR LEARNING STORY</p><h2>Look how far<br /><em>you’ve come.</em></h2><p>Every lesson completed is a new idea understood. Keep making space for curiosity.</p><button className="link-button" type="button" onClick={() => navigate('library')}>Find your next lesson <ArrowRight size={15} /></button></div>
              </section>
              <section className="stats-grid"><StatCard icon={<Clock3 size={18} />} label="Study time" value={`${completedMinutes} min`} note="Time well spent" /><StatCard icon={<BookOpen size={18} />} label="Lessons completed" value={String(completedCount)} note={`Out of ${totalLessons} lessons`} /><StatCard icon={<Flame size={18} />} label="Focus sessions" value={String(focusSessions)} note="Completed focus rounds" /></section>
              <section className="section-block achievement-block"><div className="section-heading"><div><p className="eyebrow">MILESTONES, BIG AND SMALL</p><h2>Achievements</h2></div><span className="quiet-label">EARNED THROUGH LEARNING</span></div><div className="achievement-grid"><Achievement icon={<Sparkles size={22} />} title="First steps" detail="Start your learning journey" active={true} /><Achievement icon={<BookOpen size={22} />} title="Page turner" detail="Complete 3 lessons" active={completedCount >= 3} /><Achievement icon={<Trophy size={22} />} title="Curious mind" detail="Complete 10 lessons" active={completedCount >= 10} /></div></section>
              <section className="section-block recent-block"><div className="section-heading"><div><p className="eyebrow">PICK UP WHERE YOU LEFT OFF</p><h2>Keep the rhythm</h2></div><button className="link-button" type="button" onClick={() => navigate('library')}>Browse courses <ArrowRight size={15} /></button></div><div className="recent-course-list">{courses.slice(0, 3).map((course) => { const done = course.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length; const pct = Math.round((done / course.lessons.length) * 100); return <button className="recent-course" type="button" key={course.id} onClick={() => openCourse(course.id)}><span className={`recent-course-icon recent-${course.accent}`}><BookOpen size={18} /></span><span className="recent-course-copy"><strong>{course.title}</strong><small>{done} of {course.lessons.length} lessons completed</small></span><span className="recent-course-bar"><span style={{ width: `${pct}%` }} /></span><ChevronRight size={16} /></button>; })}</div></section>
            </>
          )}

          {page === 'practice' && (
            <>
              <section className="page-heading-row"><div><p className="eyebrow">A LITTLE CHALLENGE GOES A LONG WAY</p><h1>Practice <em>makes progress.</em></h1><p className="intro-subtitle">A short mixed quiz to strengthen what you know.</p></div><div className="library-stamp"><Trophy size={24} /><span>QUICK<br />QUIZ</span></div></section>
              <section className="quiz-overview"><div><span className="section-overline">YOUR PERSONAL BEST</span><strong>{quizBestScore}<small>%</small></strong><p>Best score saved on this device</p></div><div className="quiz-overview-meta"><span>{quizQuestions.length} questions</span><span>About 5 minutes</span><span>Instant explanations</span></div></section>
              <section className="quiz-list">{quizQuestions.map((question, index) => <article className={`quiz-question ${quizSubmitted ? (quizAnswers[question.id] === question.answer ? 'is-correct' : 'is-incorrect') : ''}`} key={question.id}><div className="quiz-question-meta"><span>QUESTION {String(index + 1).padStart(2, '0')}</span><span>{question.subject}</span></div><h2>{question.prompt}</h2><div className="quiz-options">{question.options.map((option, optionIndex) => <button key={option} type="button" disabled={quizSubmitted} className={`quiz-option ${quizAnswers[question.id] === optionIndex ? 'chosen' : ''} ${quizSubmitted && optionIndex === question.answer ? 'correct-option' : ''} ${quizSubmitted && quizAnswers[question.id] === optionIndex && optionIndex !== question.answer ? 'wrong-option' : ''}`} onClick={() => setQuizAnswers((current) => ({ ...current, [question.id]: optionIndex }))}><span className="quiz-option-letter">{String.fromCharCode(65 + optionIndex)}</span>{option}{quizSubmitted && optionIndex === question.answer && <Check size={16} />}</button>)}</div>{quizSubmitted && <div className="quiz-explanation"><strong>{quizAnswers[question.id] === question.answer ? 'That’s right.' : 'Here’s the idea.'}</strong><p>{question.explanation}</p></div>}</article>)}</section>
              <div className="quiz-submit-row">{quizSubmitted ? <div className="quiz-result"><strong>{quizScore} / {quizQuestions.length} correct</strong><span>{Math.round(quizScore / quizQuestions.length * 100)}% · {quizScore === quizQuestions.length ? 'Perfect round!' : 'Every attempt teaches you something.'}</span></div> : <span className="quiet-label">{Object.keys(quizAnswers).length} OF {quizQuestions.length} ANSWERED</span>}<button className="button button-dark" type="button" onClick={quizSubmitted ? resetQuiz : submitQuiz}>{quizSubmitted ? 'Try again' : 'Check answers'} <ArrowRight size={16} /></button></div>
            </>
          )}

          {page === 'revision' && (
            <>
              <section className="page-heading-row"><div><p className="eyebrow">SMALL REVIEWS. STRONGER MEMORY.</p><h1>Revision <em>studio.</em></h1><p className="intro-subtitle">Bring each idea back just before it fades. Your deck sets the pace.</p></div><div className="library-stamp"><BrainCircuit size={24} /><span>ACTIVE<br />RECALL</span></div></section>
              <section className="revision-overview"><div><span className="section-overline">READY TO REVIEW</span><strong>{dueFlashcards.length}</strong><p>cards due now</p></div><div><span className="section-overline">IN YOUR DECK</span><strong>{flashcards.length}</strong><p>total flashcards</p></div><div><span className="section-overline">UP NEXT</span><strong>{flashcards.filter((card) => card.dueAt > Date.now()).length}</strong><p>scheduled for later</p></div></section>
              {reviewCard ? <section className="revision-session"><div className="section-heading"><div><p className="eyebrow">CARD {revisionIndex + 1} · {reviewCard.subject.toUpperCase()}</p><h2>What can you recall?</h2></div><span className="quiet-label">{dueFlashcards.length} DUE</span></div><button type="button" className={'study-flashcard revision-card ' + (revisionFlipped ? 'flipped' : '')} onClick={() => setRevisionFlipped((value) => !value)}><span className="study-card-label">{revisionFlipped ? 'ANSWER' : 'QUESTION'}</span><strong>{revisionFlipped ? reviewCard.back : reviewCard.front}</strong><span className="study-card-hint"><RotateCw size={15} /> Tap to {revisionFlipped ? 'hide answer' : 'reveal answer'}</span></button>{revisionFlipped ? <div className="revision-grades"><p>How well did you remember?</p><div><button type="button" onClick={() => gradeReview('again')}><strong>Again</strong><small>10 min</small></button><button type="button" onClick={() => gradeReview('hard')}><strong>Hard</strong><small>1 day</small></button><button type="button" onClick={() => gradeReview('good')}><strong>Good</strong><small>2 days+</small></button><button type="button" onClick={() => gradeReview('easy')}><strong>Easy</strong><small>3 days+</small></button></div></div> : <p className="revision-prompt">Try to answer from memory before revealing the back of the card.</p>}</section> : <div className="revision-empty"><CheckCircle2 size={32} /><h2>{flashcards.length ? 'You are all caught up.' : 'Your revision deck is waiting.'}</h2><p>{flashcards.length ? 'No cards are due right now. Your next reviews are scheduled automatically.' : 'Create flashcards in your Notes workspace, then come here to review them.'}</p><button type="button" className="button button-dark" onClick={() => navigate('notes')}>{flashcards.length ? 'Back to your learning desk' : 'Create your first flashcard'} <ArrowRight size={16} /></button></div>}
              <section className="revision-schedule"><div className="section-heading"><div><p className="eyebrow">YOUR MEMORY QUEUE</p><h2>Coming up</h2></div><span className="quiet-label">AUTOMATIC SCHEDULE</span></div>{flashcards.slice().sort((a,b) => a.dueAt-b.dueAt).slice(0,6).map((card) => <div className="revision-queue-row" key={card.id}><span className="revision-queue-icon"><CalendarClock size={16} /></span><div><strong>{card.front}</strong><small>{card.subject}</small></div><time>{card.dueAt <= Date.now() ? 'Due now' : new Date(card.dueAt).toLocaleDateString()}</time></div>)}{flashcards.length === 0 && <p className="revision-prompt">Your saved flashcards will appear here.</p>}</section>
              <p className="notes-privacy"><Sparkles size={15} /> Reviews are stored locally in this browser. This is a simple spaced-repetition schedule, not a cloud-synced study record.</p>
            </>
          )}

          {page === 'notes' && (
            <>
              <section className="page-heading-row"><div><p className="eyebrow">CAPTURE IT. CONNECT IT. REMEMBER IT.</p><h1>Your learning <em>desk.</em></h1><p className="intro-subtitle">Keep useful ideas close and turn key facts into active recall.</p></div><div className="library-stamp"><NotebookPen size={24} /><span>THINK<br />ON PAPER</span></div></section>
              <div className="notes-tabs"><button type="button" className={notesTab === 'notes' ? 'active' : ''} onClick={() => setNotesTab('notes')}><StickyNote size={16} /> Notes <span>{notes.length}</span></button><button type="button" className={notesTab === 'flashcards' ? 'active' : ''} onClick={() => setNotesTab('flashcards')}><Layers3 size={16} /> Flashcards <span>{flashcards.length}</span></button></div>
              {notesTab === 'notes' ? <>
                <section className="note-composer"><div className="section-heading"><div><p className="eyebrow">QUICK CAPTURE</p><h2>Save an idea</h2></div><span className="quiet-label">PRIVATE TO THIS DEVICE</span></div><form className="note-form" onSubmit={(e) => { e.preventDefault(); addNote(); }}><input value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder="Give this note a clear title" aria-label="Note title" maxLength={90} /><select value={noteSubject} onChange={(e) => setNoteSubject(e.target.value)} aria-label="Note subject"><option>General</option><option>Mathematics</option><option>Science</option><option>Technology</option><option>Revision</option></select><textarea value={noteBody} onChange={(e) => setNoteBody(e.target.value)} placeholder="Write a definition, question, worked idea, or something to remember..." aria-label="Note content" rows={4} /><div className="note-form-footer"><span>{noteBody.length} characters</span><button className="button button-dark" type="submit"><Plus size={16} /> Save note</button></div></form></section>
                <section className="section-block"><div className="section-heading"><div><p className="eyebrow">YOUR KNOWLEDGE SHELF</p><h2>Saved notes</h2></div><label className="notes-search"><Search size={15} /><input value={noteSearch} onChange={(e) => setNoteSearch(e.target.value)} placeholder="Search your notes" aria-label="Search notes" /></label></div><div className="notes-grid">{notes.filter((n) => (n.title + ' ' + n.body + ' ' + n.subject).toLowerCase().includes(noteSearch.toLowerCase())).map((n) => <article className="note-card" key={n.id}><div className="note-card-meta"><span>{n.subject}</span><button type="button" aria-label={'Delete ' + n.title} onClick={() => setNotes((items) => items.filter((x) => x.id !== n.id))}><Trash2 size={15} /></button></div><h3>{n.title}</h3><p>{n.body}</p><small>Updated {new Date(n.updatedAt).toLocaleDateString()}</small></article>)}{notes.length === 0 && <div className="empty-state"><NotebookPen size={28} /><h3>Your ideas have a home.</h3><p>Save your first note above.</p></div>}</div></section>
              </> : <>
                <section className="note-composer"><div className="section-heading"><div><p className="eyebrow">BUILD ACTIVE RECALL</p><h2>Create a flashcard</h2></div><span className="quiet-label">QUESTION → ANSWER</span></div><form className="flashcard-form" onSubmit={(e) => { e.preventDefault(); addFlashcard(); }}><input value={cardFront} onChange={(e) => setCardFront(e.target.value)} placeholder="Front · Ask a question" aria-label="Flashcard question" maxLength={180} /><textarea value={cardBack} onChange={(e) => setCardBack(e.target.value)} placeholder="Back · Write the answer or explanation" aria-label="Flashcard answer" rows={3} /><div className="note-form-footer"><select value={cardSubject} onChange={(e) => setCardSubject(e.target.value)} aria-label="Flashcard subject"><option>General</option><option>Mathematics</option><option>Science</option><option>Technology</option><option>Revision</option></select><button className="button button-dark" type="submit"><Plus size={16} /> Add card</button></div></form></section>
                <section className="flashcard-study"><div className="section-heading"><div><p className="eyebrow">RETRIEVAL PRACTICE</p><h2>Review your deck</h2></div><span className="quiet-label">{flashcards.length ? (activeCard + 1) + ' OF ' + flashcards.length : 'YOUR DECK IS EMPTY'}</span></div>{flashcards.length ? <><button type="button" className={'study-flashcard ' + (cardFlipped ? 'flipped' : '')} onClick={() => setCardFlipped((v) => !v)}><span className="study-card-label">{cardFlipped ? 'ANSWER' : 'QUESTION'} · {flashcards[activeCard]?.subject}</span><strong>{cardFlipped ? flashcards[activeCard]?.back : flashcards[activeCard]?.front}</strong><span className="study-card-hint"><RotateCw size={15} /> Tap to {cardFlipped ? 'see question' : 'reveal answer'}</span></button><div className="flashcard-controls"><button type="button" className="focus-reset" onClick={() => { setActiveCard((v) => (v - 1 + flashcards.length) % flashcards.length); setCardFlipped(false); }}><ArrowLeft size={16} /> Previous</button><button type="button" className="button button-dark" onClick={() => { setActiveCard((v) => (v + 1) % flashcards.length); setCardFlipped(false); }}>Next card <ArrowRight size={16} /></button></div><div className="flashcard-deck-list">{flashcards.map((card, i) => <div key={card.id}><span>{String(i + 1).padStart(2, '0')}</span><p>{card.front}</p><button type="button" aria-label={`Delete flashcard: ${card.front}`} onClick={() => { setFlashcards((items) => items.filter((x) => x.id !== card.id)); setActiveCard(0); setCardFlipped(false); }}><Trash2 size={14} /></button></div>)}</div></> : <div className="empty-state"><Layers3 size={28} /><h3>Build your first deck.</h3><p>Turn important definitions and concepts into quick recall cards.</p></div>}</section>
              </>}
              <p className="notes-privacy"><Sparkles size={15} /> Notes and flashcards are saved locally in this browser. They are not synced to an account or cloud.</p>
            </>
          )}

          {page === 'planner' && (
            <>
              <section className="page-heading-row"><div><p className="eyebrow">MAKE SPACE FOR WHAT MATTERS</p><h1>Your study <em>plan.</em></h1><p className="intro-subtitle">Plan the week, make progress visible, and give every task a place.</p></div><div className="library-stamp"><CalendarDays size={24} /><span>ONE DAY<br />AT A TIME</span></div></section>
              <section className="planner-summary"><div><span className="section-overline">SELECTED DAY</span><strong>{plannerDoneCount}<small> / {plannerDayTasks.length}</small></strong><p>tasks completed</p></div><div className="planner-summary-track"><span style={{ width: `${plannerDayTasks.length ? plannerDoneCount / plannerDayTasks.length * 100 : 0}%` }} /></div><span className="planner-quote">{plannerDayTasks.length ? `${plannerDayTasks.length - plannerDoneCount} tasks left in your plan` : 'A little structure creates room to grow.'}</span></section>
              <section className="planner-calendar">
                <div className="planner-calendar-head"><div><p className="eyebrow">YOUR WEEK AT A GLANCE</p><h2>{new Date(Number(plannerWeekStart.slice(0,4)), Number(plannerWeekStart.slice(5,7))-1, Number(plannerWeekStart.slice(8,10))).toLocaleDateString(undefined,{month:'long',year:'numeric'})}</h2></div><div className="planner-week-actions"><button type="button" onClick={() => setPlannerDate((date) => { const next = shiftDate(date,-7); setNewTaskDate(next); return next; })} aria-label="Previous week"><ArrowLeft size={16}/></button><button type="button" onClick={() => { const today = localDateKey(new Date()); setPlannerDate(today); setNewTaskDate(today); }}>Today</button><button type="button" onClick={() => setPlannerDate((date) => { const next = shiftDate(date,7); setNewTaskDate(next); return next; })} aria-label="Next week"><ArrowRight size={16}/></button></div></div>
                <div className="planner-week-grid">{plannerWeekDays.map((date) => { const [y,m,d] = date.split('-').map(Number); const day = new Date(y,m-1,d); const dayTasks = tasks.filter((task) => taskOccursOn(task,date)); const done = dayTasks.filter((task) => taskIsDone(task,date)).length; return <button type="button" key={date} className={`planner-day ${plannerDate === date ? 'selected' : ''} ${date === localDateKey(new Date()) ? 'is-today' : ''}`} onClick={() => { setPlannerDate(date); setNewTaskDate(date); }}><span>{day.toLocaleDateString(undefined,{weekday:'short'})}</span><strong>{d}</strong><small>{dayTasks.length ? `${done}/${dayTasks.length} done` : 'No tasks'}</small><i style={{ opacity: dayTasks.length ? 1 : 0 }} /></button>; })}</div>
                <div className="planner-selected-date"><CalendarDays size={16}/><strong>{new Date(Number(plannerDate.slice(0,4)),Number(plannerDate.slice(5,7))-1,Number(plannerDate.slice(8,10))).toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}</strong><span>{plannerDayTasks.length} planned</span></div>
              </section>
              <section className="section-block planner-block"><div className="section-heading"><div><p className="eyebrow">BUILD YOUR PLAN</p><h2>Add a task</h2></div><span className="quiet-label">SMALL STEPS COUNT</span></div>
                <form className="task-form planner-task-form" onSubmit={(event) => { event.preventDefault(); addTask(); }}><input aria-label="New task" value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="Add a small, achievable task..." /><select aria-label="Task subject" value={newSubject} onChange={(event) => setNewSubject(event.target.value)}><option>General</option><option>Mathematics</option><option>Science</option><option>Revision</option><option>Practice</option><option>Technology</option></select><input aria-label="Task due date" type="date" value={newTaskDate} onChange={(event) => setNewTaskDate(event.target.value)} /><select aria-label="Task priority" value={newTaskPriority} onChange={(event) => setNewTaskPriority(event.target.value as 'Low'|'Normal'|'High')}><option>Low</option><option>Normal</option><option>High</option></select><select aria-label="Task recurrence" value={newTaskRecurrence} onChange={(event) => setNewTaskRecurrence(event.target.value as 'None'|'Daily'|'Weekly')}><option value="None">No repeat</option><option value="Daily">Every day</option><option value="Weekly">Every week</option></select><button className="button button-dark" type="submit"><Plus size={16} /> Add task</button></form>
                <div className="section-heading planner-list-heading"><div><p className="eyebrow">YOUR PRIORITIES</p><h2>{plannerDate === localDateKey(new Date()) ? 'Today’s checklist' : 'Daily checklist'}</h2></div><span className="quiet-label">{plannerDayTasks.length - plannerDoneCount} LEFT TO DO</span></div>
                <div className="task-list">{plannerDayTasks.slice().sort((a,b) => ({High:0,Normal:1,Low:2}[a.priority] - {High:0,Normal:1,Low:2}[b.priority])).map((task) => { const done = taskIsDone(task,plannerDate); return <div className={`task-row planner-task-row ${done ? 'task-done' : ''}`} key={task.id}><button type="button" className="task-check" aria-label={done ? `Reopen ${task.title}` : `Complete ${task.title}`} onClick={() => togglePlannerTask(task)}>{done && <Check size={14}/>}</button><span className="task-copy"><strong>{task.title}</strong><small>{task.subject} · {task.priority} priority{task.recurrence !== 'None' ? ` · ${task.recurrence.toLowerCase()}` : ''}</small></span><span className={`task-priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span><button type="button" className="task-remove" aria-label={`Delete ${task.title}`} onClick={() => setTasks((current) => current.filter((item) => item.id !== task.id))}><X size={16}/></button></div>; })}{plannerDayTasks.length === 0 && <div className="empty-state"><Target size={28}/><h3>A fresh page.</h3><p>No tasks are planned for this day. Add one small step above.</p></div>}</div>
              </section>
              <section className="planner-backlog"><div className="section-heading"><div><p className="eyebrow">CATCH UP WITHOUT THE CHAOS</p><h2>Backlog</h2></div><span className="quiet-label">{plannerBacklog.length} OVERDUE</span></div>{plannerBacklog.map((task) => <div className="planner-backlog-row" key={task.id}><span className="backlog-dot"/><div><strong>{task.title}</strong><small>{task.subject} · Due {new Date(Number(task.dueDate.slice(0,4)),Number(task.dueDate.slice(5,7))-1,Number(task.dueDate.slice(8,10))).toLocaleDateString()}</small></div><button type="button" onClick={() => setTasks((current) => current.map((item) => item.id === task.id ? {...item,dueDate:plannerDate} : item))}>Move to selected day</button></div>)}{plannerBacklog.length === 0 && <p className="planner-backlog-empty"><CheckCircle2 size={16}/> No overdue tasks. Your backlog is clear.</p>}</section>
            </>
          )}

          {page === 'focus' && (
            <>
              <section className="page-heading-row"><div><p className="eyebrow">ONE THING AT A TIME</p><h1>Find your <em>focus.</em></h1><p className="intro-subtitle">Give your attention a place to land.</p></div><div className="library-stamp"><Timer size={24} /><span>FOCUS<br />RITUAL</span></div></section>
              <section className="focus-panel"><div className="focus-panel-top"><span className="section-overline">YOUR FOCUS SESSION</span><span className="focus-session-count"><Flame size={15} /> {focusSessions} sessions completed</span></div><div className="focus-presets" role="group" aria-label="Timer duration"><button type="button" className={focusMode === 'focus' ? 'active' : ''} onClick={() => setTimerPreset('focus')}>Focus · 25 min</button><button type="button" className={focusMode === 'short' ? 'active' : ''} onClick={() => setTimerPreset('short')}>Short break · 5 min</button><button type="button" className={focusMode === 'long' ? 'active' : ''} onClick={() => setTimerPreset('long')}>Long break · 15 min</button></div><div className="focus-clock" aria-live="off">{String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:{String(secondsLeft % 60).padStart(2, '0')}</div><p className="focus-message">{timerRunning ? 'Stay with this moment. You’re doing just fine.' : secondsLeft === 0 ? 'Session complete. Take a breath.' : 'Quiet the noise. Begin where you are.'}</p><div className="focus-actions"><button className="button button-orange" type="button" onClick={() => { if (secondsLeft === 0) { setTimerPreset(focusMode); setTimerRunning(true); } else setTimerRunning((value) => !value); }}>{timerRunning ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}{timerRunning ? 'Pause session' : secondsLeft === 0 ? 'Start again' : 'Start focusing'}</button><button className="focus-reset" type="button" onClick={() => { setTimerRunning(false); setTimerPreset(focusMode); }} aria-label="Reset timer"><RotateCcw size={17} /> Reset</button></div><div className="focus-footnote"><Sparkles size={15} /> Progress is built in small, focused moments.</div></section>
              <section className="focus-tips"><div><span className="category-icon sand"><Target size={20} /></span><strong>Choose one task</strong><small>Keep your next step clear and manageable.</small></div><div><span className="category-icon lilac"><Moon size={20} /></span><strong>Protect your attention</strong><small>Put distractions aside for this session.</small></div><div><span className="category-icon peach"><Sun size={20} /></span><strong>Take real breaks</strong><small>Rest is part of learning, not a reward.</small></div></section>
            </>
          )}

          {page === 'profile' && (
            <>
              <section className="page-heading-row"><div><p className="eyebrow">THE PERSON BEHIND THE PROGRESS</p><h1>Your <em>space.</em></h1><p className="intro-subtitle">Make this learning journey your own.</p></div><div className="profile-large-avatar">L</div></section>
              <section className="profile-card"><div className="profile-card-main"><span className="profile-avatar-big">L</span><div><span className="eyebrow">YOUR LEARNER PROFILE</span><h2>Learner</h2><p>Curious by nature. Growing every day.</p></div><span className="profile-plan">GUEST PROFILE</span></div><div className="profile-card-stats"><div><strong>{completedCount}</strong><span>Lessons completed</span></div><div><strong>{courses.length}</strong><span>Courses to explore</span></div><div><strong>{progressPercent}%</strong><span>Overall progress</span></div></div></section>
              <section className="profile-settings"><p className="eyebrow">PREFERENCES</p><button className="setting-row" type="button" onClick={() => setDarkMode((value) => !value)}><span className="setting-icon">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</span><span><strong>{darkMode ? 'Light appearance' : 'Dark appearance'}</strong><small>Switch the look of your learning space</small></span><ChevronRight size={17} /></button><button className="setting-row" type="button" onClick={() => setToast('Notification preferences are coming soon')}><span className="setting-icon"><Bell size={18} /></span><span><strong>Notifications</strong><small>Choose what you hear about</small></span><ChevronRight size={17} /></button><button className="setting-row" type="button" onClick={() => setToast('Help centre is coming soon')}><span className="setting-icon"><CircleHelp size={18} /></span><span><strong>Help & support</strong><small>Find answers and guidance</small></span><ChevronRight size={17} /></button><button className="setting-row" type="button" onClick={resetProgress}><span className="setting-icon"><LogOut size={18} /></span><span><strong>Reset demo progress</strong><small>Clear locally saved lesson completion</small></span><ChevronRight size={17} /></button></section>
              <div className="profile-footnote"><Sparkles size={16} /> This is a local demo profile. Account sign-in will be added with a real backend.</div>
            </>
          )}
        </main>

        <footer className="app-footer"><span>ACEDMIX © 2026</span><span>MADE FOR THE CURIOUS <span className="footer-star">✳</span></span></footer>
      </div>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {navItems.map(({ page: navPage, label, icon: Icon }) => <button key={navPage} type="button" className={page === navPage ? 'selected' : ''} onClick={() => navigate(navPage)}><Icon size={19} strokeWidth={1.8} /><span>{label}</span></button>)}
      </nav>
      {toast && <div className="toast" role="status"><span className="toast-check"><Check size={14} /></span>{toast}<button type="button" aria-label="Dismiss message" onClick={() => setToast('')}><X size={15} /></button></div>}
    </div>
  );
}

function CourseCard({ course, index, onOpen }: { course: Course; index: number; onOpen: () => void }) {
  const Icon = course.category === 'Mathematics' ? GraduationCap : course.category === 'Science' ? FlaskConical : course.category === 'Technology' ? Laptop : course.category === 'Languages' ? BookOpen : Sparkles;
  return (
    <button className="course-card" type="button" onClick={onOpen}>
      <div className={`course-card-art card-art-${course.accent}`}><span className="course-card-index">0{index + 1}</span><span className="course-card-art-icon"><Icon size={25} strokeWidth={1.4} /></span><span className="course-card-art-mark">✳</span></div>
      <div className="course-card-body"><span className="course-card-category">{course.category.toUpperCase()}</span><h3>{course.title}</h3><p>{course.description}</p><div className="course-card-meta"><span><Clock3 size={14} /> {course.duration}</span><span>{course.level}</span><ArrowUpRight size={16} className="course-card-arrow" /></div></div>
    </button>
  );
}

function StatCard({ icon, label, value, note }: { icon: ReactNode; label: string; value: string; note: string }) {
  return <div className="stat-card"><span className="stat-icon">{icon}</span><span className="stat-label">{label}</span><strong>{value}</strong><small>{note}</small></div>;
}

function Achievement({ icon, title, detail, active }: { icon: ReactNode; title: string; detail: string; active: boolean }) {
  return <div className={`achievement-card ${active ? 'unlocked' : ''}`}><span className="achievement-icon">{icon}</span><div><strong>{title}</strong><small>{detail}</small></div><span className="achievement-status">{active ? <Check size={14} /> : 'LOCKED'}</span></div>;
}

export default App;
