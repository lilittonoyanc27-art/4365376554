import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Search,
  BookOpen,
  Layers,
  Bookmark,
  Check,
  Copy,
  ChevronDown,
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Compass,
  Languages,
  CheckCircle2,
  SlidersHorizontal,
  X,
  ArrowRight,
  BookMarked
} from 'lucide-react';
import { APP_HEADER, SECTIONS } from './data.ts';
import { SectionData, ExampleItem, TableRowItem } from './types.ts';

export default function App() {
  // Navigation & View mode
  const [activeTab, setActiveTab] = useState<'guide' | 'dialogue' | 'reading' | 'flashcards' | 'saved'>('guide');
  const [selectedSectionId, setSelectedSectionId] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Translation Reveal State
  // Global mode: 'click_to_reveal' | 'show_all'
  const [revealMode, setRevealMode] = useState<'click_to_reveal' | 'show_all'>('click_to_reveal');
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  // Bookmarked / Saved IDs
  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('bien_saved_items');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Audio Speech Synthesis state
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.9); // learner friendly speed
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Persist saved items
  useEffect(() => {
    try {
      localStorage.setItem('bien_saved_items', JSON.stringify(Array.from(savedIds)));
    } catch {
      // storage error fallback
    }
  }, [savedIds]);

  // Clean speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Audio playback function using Web Speech API
  const speakText = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    
    // Clean string for speech (remove numbers at start, dashes)
    const cleanText = text.replace(/^[0-9]+\.\s*/, '').replace(/^[—–-]\s*/, '').replace(/—/g, ', ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = speechRate;

    // Try finding a Spanish voice
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => v.lang.startsWith('es') || v.lang === 'es_ES');
    if (esVoice) {
      utterance.voice = esVoice;
    }

    utterance.onstart = () => setSpeakingId(id);
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (text: string, id: string) => {
    const cleanText = text.replace(/^[0-9]+\.\s*/, '');
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleReveal = (id: string) => {
    setRevealedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSave = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isRevealed = (id: string) => {
    if (revealMode === 'show_all') return true;
    return revealedIds.has(id);
  };

  const revealAllInSection = (secId: number) => {
    const sec = SECTIONS.find(s => s.id === secId);
    if (!sec) return;
    const idsToAdd: string[] = [];
    sec.examples?.forEach(e => idsToAdd.push(e.id));
    sec.table?.rows?.forEach(r => idsToAdd.push(r.id));
    sec.comparisons?.forEach(c => c.items.forEach(i => idsToAdd.push(i.id)));
    sec.subsections?.forEach(sub => {
      sub.examples?.forEach(e => idsToAdd.push(e.id));
      sub.table?.rows.forEach(r => idsToAdd.push(r.id));
    });
    setRevealedIds(prev => new Set([...prev, ...idsToAdd]));
  };

  const hideAllInSection = (secId: number) => {
    const sec = SECTIONS.find(s => s.id === secId);
    if (!sec) return;
    const idsToRemove = new Set<string>();
    sec.examples?.forEach(e => idsToRemove.add(e.id));
    sec.table?.rows?.forEach(r => idsToRemove.add(r.id));
    sec.comparisons?.forEach(c => c.items.forEach(i => idsToRemove.add(i.id)));
    sec.subsections?.forEach(sub => {
      sub.examples?.forEach(e => idsToRemove.add(e.id));
      sub.table?.rows.forEach(r => idsToRemove.add(r.id));
    });
    setRevealedIds(prev => {
      const next = new Set(prev);
      idsToRemove.forEach(id => next.delete(id));
      return next;
    });
  };

  // Compile all flashcard-eligible items (idioms & core constructions & examples)
  const allFlashcards = useMemo(() => {
    const cards: { id: string; spanish: string; armenian: string; tag: string }[] = [];
    
    // Idioms from Section 16
    const sec16 = SECTIONS.find(s => s.id === 16);
    if (sec16?.table) {
      sec16.table.rows.forEach(r => {
        cards.push({ id: r.id, spanish: r.spanish, armenian: r.armenian, tag: 'Խոսակցական արտահայտություն' });
      });
    }

    // Summary from Section 19
    const sec19 = SECTIONS.find(s => s.id === 19);
    if (sec19?.table) {
      sec19.table.rows.forEach(r => {
        cards.push({ id: r.id, spanish: r.spanish, armenian: r.armenian, tag: 'Հիմնական կառույց' });
      });
    }

    // Other key examples
    SECTIONS.forEach(s => {
      if (s.id !== 16 && s.id !== 19 && s.examples) {
        s.examples.slice(0, 2).forEach(e => {
          cards.push({ id: e.id, spanish: e.spanish, armenian: e.armenian, tag: `Բաժին ${s.numberStr}: ${s.titleEs}` });
        });
      }
    });

    return cards;
  }, []);

  // Filtered sections based on query and active section
  const filteredSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SECTIONS.filter(sec => {
      if (selectedSectionId !== 'all' && sec.id !== selectedSectionId) {
        return false;
      }
      if (!q) return true;

      // search match in titles, description, tables, examples, notes
      const matchTitle = sec.titleEs.toLowerCase().includes(q) || sec.titleHy.toLowerCase().includes(q);
      const matchFormula = sec.formula?.toLowerCase().includes(q) || false;
      const matchDesc = sec.descriptionHy?.some(d => d.toLowerCase().includes(q)) || false;
      const matchExamples = sec.examples?.some(e => e.spanish.toLowerCase().includes(q) || e.armenian.toLowerCase().includes(q)) || false;
      const matchTable = sec.table?.rows?.some(r => r.spanish.toLowerCase().includes(q) || r.armenian.toLowerCase().includes(q)) || false;
      const matchDialogue = sec.dialogue?.lines.some(l => l.spanish.toLowerCase().includes(q) || l.armenian.toLowerCase().includes(q)) || false;
      const matchReading = sec.reading?.paragraphs.some(p => p.spanish.toLowerCase().includes(q) || p.armenian.toLowerCase().includes(q)) || false;

      return matchTitle || matchFormula || matchDesc || matchExamples || matchTable || matchDialogue || matchReading;
    });
  }, [searchQuery, selectedSectionId]);

  // Saved items list
  const savedItemsList = useMemo(() => {
    const items: { id: string; spanish: string; armenian: string; context: string }[] = [];
    SECTIONS.forEach(sec => {
      sec.examples?.forEach(e => {
        if (savedIds.has(e.id)) {
          items.push({ id: e.id, spanish: e.spanish, armenian: e.armenian, context: `${sec.numberStr}. ${sec.titleEs}` });
        }
      });
      sec.table?.rows?.forEach(r => {
        if (savedIds.has(r.id)) {
          items.push({ id: r.id, spanish: r.spanish, armenian: r.armenian, context: `${sec.numberStr}. ${sec.titleEs}` });
        }
      });
      sec.comparisons?.forEach(c => {
        c.items.forEach(ci => {
          if (savedIds.has(ci.id)) {
            items.push({ id: ci.id, spanish: ci.spanish, armenian: ci.armenian, context: `${sec.numberStr}. ${c.title}` });
          }
        });
      });
      sec.subsections?.forEach(sub => {
        sub.examples?.forEach(e => {
          if (savedIds.has(e.id)) {
            items.push({ id: e.id, spanish: e.spanish, armenian: e.armenian, context: `${sec.numberStr}. ${sub.title}` });
          }
        });
        sub.table?.rows?.forEach(r => {
          if (savedIds.has(r.id)) {
            items.push({ id: r.id, spanish: r.spanish, armenian: r.armenian, context: `${sec.numberStr}. ${sub.title}` });
          }
        });
      });
      sec.dialogue?.lines.forEach(l => {
        if (savedIds.has(l.id)) {
          items.push({ id: l.id, spanish: `${l.speaker}: ${l.spanish}`, armenian: l.armenian, context: '17. Diálogo' });
        }
      });
    });
    return items;
  }, [savedIds]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Logo / Title */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab('guide'); setSelectedSectionId('all'); }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-amber-500/20">
                B
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                    Usos de <span className="text-amber-600 underline decoration-amber-400 decoration-2 underline-offset-2">BIEN</span>
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                    B1–C1
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium hidden sm:block">
                  Իսպաներեն — Հայերեն Ինտերակտիվ Ուղեցույց
                </div>
              </div>
            </div>

            {/* Quick Navigation Tabs */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'guide'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline">Դասեր</span>
                <span className="md:hidden">1–19</span>
              </button>

              <button
                onClick={() => setActiveTab('dialogue')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'dialogue'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Երկխոսություն</span>
              </button>

              <button
                onClick={() => setActiveTab('reading')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'reading'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Ընթերցանություն</span>
              </button>

              <button
                onClick={() => setActiveTab('flashcards')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'flashcards'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Քարտեր</span>
              </button>

              <button
                onClick={() => setActiveTab('saved')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 relative ${
                  activeTab === 'saved'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">Պահպանված</span>
                {savedIds.size > 0 && (
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center -ml-0.5">
                    {savedIds.size}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Interactive Controls Bar */}
      <div className="bg-white border-b border-slate-200/80 px-4 py-2.5 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Translation Reveal Mode Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setRevealMode('click_to_reveal')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                revealMode === 'click_to_reveal'
                  ? 'bg-white text-amber-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <EyeOff className="w-3.5 h-3.5 text-amber-600" />
              <span>Սեղմել՝ թարգմանությունը բացելու համար</span>
            </button>
            <button
              onClick={() => setRevealMode('show_all')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                revealMode === 'show_all'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-indigo-600" />
              <span>Բոլորը ցույց տալ</span>
            </button>
          </div>

          {/* Audio speed & clear controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              <span>Ձայնի արագություն:</span>
              <button
                onClick={() => setSpeechRate(speechRate === 0.9 ? 0.75 : 0.9)}
                className="font-bold text-slate-700 hover:text-amber-600 underline cursor-pointer"
              >
                {speechRate === 0.9 ? '1.0x (նորմալ)' : '0.75x (դանդաղ)'}
              </button>
            </div>

            {revealMode === 'click_to_reveal' && revealedIds.size > 0 && (
              <button
                onClick={() => setRevealedIds(new Set())}
                className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 transition"
                title="Փակել բացված թարգմանությունները"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Թաքցնել ({revealedIds.size})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: FULL GUIDE (SECTIONS 1–19) */}
        {activeTab === 'guide' && (
          <div className="space-y-8">
            {/* Hero Introduction Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-rose-600 to-indigo-900 text-white p-6 sm:p-8 shadow-xl">
              <div className="relative z-10 max-w-4xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-amber-100 border border-white/20">
                  <span>🇪🇸 Իսպաներեն</span>
                  <span>↔</span>
                  <span>🇦🇲 Հայերեն</span>
                  <span>•</span>
                  <span>{APP_HEADER.levelSubtitle}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {APP_HEADER.titleEs}
                </h1>
                <p className="text-lg sm:text-xl font-medium text-amber-100">
                  {APP_HEADER.titleHy}
                </p>

                <div className="space-y-2 text-sm sm:text-base text-slate-100 leading-relaxed pt-2 border-t border-white/20">
                  {APP_HEADER.introParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Intro interactive clickable examples */}
                <div className="pt-4">
                  <div className="text-xs uppercase tracking-wider font-bold text-amber-200 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Օրինակներ (սեղմիր իսպաներեն նախադասության վրա թարգմանությունը տեսնելու համար):</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {APP_HEADER.introExamples.map(item => {
                      const revealed = isRevealed(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleReveal(item.id)}
                          className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/20 transition-all cursor-pointer flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-base text-white group-hover:text-amber-200 transition">
                              {item.spanish}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speakText(item.spanish, item.id);
                                }}
                                className="p-1 rounded-lg bg-white/10 hover:bg-white/30 text-white transition"
                                title="Լսել արտասանությունը"
                              >
                                <Volume2 className={`w-3.5 h-3.5 ${speakingId === item.id ? 'text-amber-300 animate-pulse' : ''}`} />
                              </button>
                            </div>
                          </div>

                          <div className="mt-2 text-sm">
                            {revealed ? (
                              <div className="text-amber-200 font-medium flex items-center gap-1.5 animate-fadeIn">
                                <span className="text-xs opacity-70">🇦🇲</span>
                                <span>{item.armenian}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-white/60 group-hover:text-amber-200 flex items-center gap-1">
                                👆 Սեղմիր թարգմանության համար
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs italic text-amber-100/80 mt-3">
                    {APP_HEADER.introConclusion}
                  </p>
                </div>
              </div>

              {/* Decorative background shape */}
              <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            </div>

            {/* Sticky/Scrollable Section Quick Selector Bar & Search */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Որոնել բառեր (օրինակ՝ quedar bien, subjuntivo, հարմար, տպավորություն)..."
                    className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Section Filter Dropdown / Count */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap hidden sm:inline">
                    Բաժին:
                  </span>
                  <select
                    value={selectedSectionId}
                    onChange={e => setSelectedSectionId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-amber-500 focus:outline-hidden cursor-pointer"
                  >
                    <option value="all">Բոլոր 19 բաժինները</option>
                    {SECTIONS.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.numberStr}. {s.titleEs} — {s.titleHy}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Horizontal Pill Scroller for Fast Jump */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                <button
                  onClick={() => setSelectedSectionId('all')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
                    selectedSectionId === 'all'
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Բոլորը (19)
                </button>
                {SECTIONS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedSectionId(s.id);
                      const el = document.getElementById(`section-${s.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap font-medium transition flex items-center gap-1 ${
                      selectedSectionId === s.id
                        ? 'bg-amber-500 text-white font-semibold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span className="opacity-70 font-bold">{s.numberStr}.</span>
                    <span>{s.titleEs}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sections Listing */}
            {filteredSections.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-slate-500 font-medium">Որոնման արդյունքներ չգտնվեցին «{searchQuery}» հարցման համար։</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedSectionId('all'); }}
                  className="mt-3 text-amber-600 font-bold hover:underline text-sm"
                >
                  Վերականգնել ֆիլտրերը
                </button>
              </div>
            ) : (
              filteredSections.map(sec => (
                <SectionBlock
                  key={sec.id}
                  section={sec}
                  isRevealed={isRevealed}
                  toggleReveal={toggleReveal}
                  revealAllInSection={() => revealAllInSection(sec.id)}
                  hideAllInSection={() => hideAllInSection(sec.id)}
                  speakText={speakText}
                  speakingId={speakingId}
                  copyToClipboard={copyToClipboard}
                  copiedId={copiedId}
                  savedIds={savedIds}
                  toggleSave={toggleSave}
                />
              ))
            )}
          </div>
        )}

        {/* TAB 2: DIALOGUE (SECTION 17) */}
        {activeTab === 'dialogue' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Բաժին 17</span>
                  <h2 className="text-2xl font-bold text-slate-900">Diálogo — Quedar con una amiga</h2>
                  <p className="text-sm text-slate-500">Երկխոսություն — Հանդիպում ընկերուհու հետ</p>
                </div>
                <div className="bg-amber-50 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-xl border border-amber-200">
                  Խոսակցական իսպաներեն
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl text-slate-600 text-sm font-medium border border-slate-200">
                💡 {SECTIONS.find(s => s.id === 17)?.dialogue?.context}
              </div>

              {/* Dialogue Lines */}
              <div className="space-y-4 pt-2">
                {SECTIONS.find(s => s.id === 17)?.dialogue?.lines.map((line, idx) => {
                  const isLaura = line.speaker === 'Laura';
                  const revealed = isRevealed(line.id);
                  const isSaved = savedIds.has(line.id);

                  return (
                    <div
                      key={line.id}
                      className={`flex gap-3 ${isLaura ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-lg w-full rounded-2xl p-4 transition-all border ${
                        isLaura
                          ? 'bg-amber-50/70 border-amber-200 text-slate-800'
                          : 'bg-indigo-50/70 border-indigo-200 text-slate-800'
                      }`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md ${
                            isLaura ? 'bg-amber-200 text-amber-900' : 'bg-indigo-200 text-indigo-900'
                          }`}>
                            {line.speaker}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => speakText(line.spanish, line.id)}
                              className="p-1 rounded-md text-slate-500 hover:text-amber-600 hover:bg-white/80 transition"
                              title="Լսել"
                            >
                              <Volume2 className={`w-3.5 h-3.5 ${speakingId === line.id ? 'text-amber-600 animate-pulse' : ''}`} />
                            </button>
                            <button
                              onClick={() => toggleSave(line.id)}
                              className={`p-1 rounded-md transition ${isSaved ? 'text-amber-600' : 'text-slate-400 hover:text-amber-600'}`}
                              title={isSaved ? "Հեռացնել պահպանվածներից" : "Պահպանել"}
                            >
                              <Bookmark className="w-3.5 h-3.5 fill-current" />
                            </button>
                          </div>
                        </div>

                        {/* Clickable Spanish Speech Bubble */}
                        <div
                          onClick={() => toggleReveal(line.id)}
                          className="cursor-pointer group"
                        >
                          <div className="font-semibold text-base text-slate-900 group-hover:text-amber-700 transition">
                            {line.spanish}
                          </div>

                          <div className="mt-2 text-sm pt-2 border-t border-slate-200/60">
                            {revealed ? (
                              <div className="text-slate-700 font-medium flex items-start gap-1.5">
                                <span className="text-xs font-bold text-amber-600 mt-0.5">🇦🇲</span>
                                <span>{line.armenian}</span>
                              </div>
                            ) : (
                              <div className="text-xs text-slate-400 group-hover:text-amber-600 flex items-center gap-1">
                                👆 Սեղմիր հայերեն թարգմանությունը տեսնելու համար
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: READING (SECTION 18) */}
        {activeTab === 'reading' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Բաժին 18</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                      Nivel B2
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    Lectura — Una decisión bien tomada
                  </h2>
                  <p className="text-sm text-slate-500 font-medium">
                    Ընթերցանություն — Լավ կայացված որոշում
                  </p>
                </div>

                <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
                  Սեղմեք յուրաքանչյուր հատվածի վրա՝ հայերեն թարգմանությունը բացելու համար
                </div>
              </div>

              {/* Story Paragraphs */}
              <div className="space-y-4">
                {SECTIONS.find(s => s.id === 18)?.reading?.paragraphs.map((p, idx) => {
                  const revealed = isRevealed(p.id);
                  const isSaved = savedIds.has(p.id);

                  return (
                    <div
                      key={p.id}
                      className="group p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-xs transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div
                          onClick={() => toggleReveal(p.id)}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1">
                            <span>#{idx + 1}</span>
                            <span>🇪🇸 Իսպաներեն</span>
                          </div>
                          <p className="text-base sm:text-lg text-slate-900 font-serif leading-relaxed group-hover:text-amber-900 transition">
                            {p.spanish}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 pt-1">
                          <button
                            onClick={() => speakText(p.spanish, p.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition"
                            title="Լսել իսպաներեն"
                          >
                            <Volume2 className={`w-4 h-4 ${speakingId === p.id ? 'text-amber-600 animate-pulse' : ''}`} />
                          </button>
                          <button
                            onClick={() => toggleSave(p.id)}
                            className={`p-1.5 rounded-lg transition ${isSaved ? 'text-amber-600' : 'text-slate-300 hover:text-amber-600'}`}
                            title={isSaved ? "Հեռացնել" : "Պահպանել"}
                          >
                            <Bookmark className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                      </div>

                      {/* Revealed Armenian Translation */}
                      <div
                        onClick={() => toggleReveal(p.id)}
                        className="mt-3 pt-3 border-t border-slate-100 cursor-pointer"
                      >
                        {revealed ? (
                          <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80 animate-fadeIn">
                            <div className="text-xs font-bold text-amber-800 mb-1 flex items-center gap-1">
                              <span>🇦🇲 Հայերեն թարգմանություն</span>
                            </div>
                            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                              {p.armenian}
                            </p>
                          </div>
                        ) : (
                          <div className="text-xs text-slate-400 group-hover:text-amber-600 flex items-center gap-1 font-medium">
                            <span>👆 Սեղմիր հայերեն թարգմանությունը բացելու համար</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FLASHCARDS TEST MODE */}
        {activeTab === 'flashcards' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ինքնաստուգում և Քարտեր ({flashcardIndex + 1} / {allFlashcards.length})</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Ստուգիր BIEN կառույցների իմացությունդ
                </h2>
                <p className="text-sm text-slate-500">
                  Սեղմիր քարտի վրա թարգմանությունը տեսնելու համար
                </p>
              </div>

              {/* The Flip Card */}
              {allFlashcards.length > 0 && (
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full min-h-[220px] rounded-3xl p-8 cursor-pointer transition-all duration-300 transform active:scale-98 flex flex-col justify-between items-center text-center relative border-2 shadow-md bg-gradient-to-br from-white to-amber-50/50 border-amber-200 hover:border-amber-400"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800">
                      {allFlashcards[flashcardIndex].tag}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(allFlashcards[flashcardIndex].spanish, `fc-${flashcardIndex}`);
                      }}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-700 transition"
                      title="Լսել իսպաներեն"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="py-6 my-auto">
                    {!isFlipped ? (
                      <div className="space-y-2">
                        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                          {allFlashcards[flashcardIndex].spanish}
                        </div>
                        <div className="text-xs text-amber-600 font-semibold flex items-center justify-center gap-1">
                          <span>👆 Սեղմիր հայերեն իմաստը տեսնելու համար</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 animate-fadeIn">
                        <div className="text-xl sm:text-2xl font-bold text-amber-700">
                          {allFlashcards[flashcardIndex].armenian}
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                          {allFlashcards[flashcardIndex].spanish}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-slate-400 font-medium">
                    Քարտ {flashcardIndex + 1} / {allFlashcards.length}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setFlashcardIndex(prev => (prev > 0 ? prev - 1 : allFlashcards.length - 1));
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition text-sm"
                >
                  ← Նախորդը
                </button>
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-5 py-2.5 rounded-xl bg-amber-100 text-amber-900 font-semibold hover:bg-amber-200 transition text-sm"
                >
                  {isFlipped ? 'Թաքցնել' : 'Շրջել քարտը'}
                </button>
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setFlashcardIndex(prev => (prev < allFlashcards.length - 1 ? prev + 1 : 0));
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 transition text-sm shadow-xs"
                >
                  Հաջորդը →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SAVED / BOOKMARKS */}
        {activeTab === 'saved' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Bookmark className="w-6 h-6 text-amber-500 fill-amber-500" />
                    <span>Իմ պահպանած արտահայտությունները</span>
                  </h2>
                  <p className="text-sm text-slate-500">
                    Այստեղ հավաքված են ձեր ընտրած բոլոր կառույցներն ու նախադասությունները ({savedItemsList.length})
                  </p>
                </div>
                {savedItemsList.length > 0 && (
                  <button
                    onClick={() => setSavedIds(new Set())}
                    className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 transition"
                  >
                    Մաքրել բոլորը
                  </button>
                )}
              </div>

              {savedItemsList.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <BookMarked className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-slate-600 font-medium">Դուք դեռ չունեք պահպանված արտահայտություններ։</p>
                  <p className="text-xs text-slate-400">
                    Դասերի ընթացքում սեղմեք ցանկացած նախադասության կողքի էջանիշի (Bookmark) կոճակը։
                  </p>
                  <button
                    onClick={() => setActiveTab('guide')}
                    className="mt-2 px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-semibold shadow-xs hover:bg-amber-600 transition"
                  >
                    Վերադառնալ դասերին
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {savedItemsList.map(item => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-300 transition-all shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                          <span className="font-semibold text-amber-700">{item.context}</span>
                          <button
                            onClick={() => toggleSave(item.id)}
                            className="text-slate-400 hover:text-rose-500 p-1"
                            title="Հեռացնել"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="font-bold text-slate-900 text-base mb-1">
                          {item.spanish}
                        </div>
                        <div className="text-sm font-medium text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-100">
                          {item.armenian}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => speakText(item.spanish, `saved-${item.id}`)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-slate-100 transition"
                          title="Լսել"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(item.spanish, `saved-copy-${item.id}`)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-slate-100 transition"
                          title="Պատճենել"
                        >
                          {copiedId === `saved-copy-${item.id}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            🇪🇸🇦🇲 Usos y construcciones con BIEN — Իսպաներենի քերականական և խոսակցական ուղեցույց (Nivel B1–C1)
          </p>
          <p>
            Հայերեն բացատրությամբ և ինտերակտիվ թարգմանություններով։ Սեղմեք իսպաներեն ցանկացած տեքստի վրա՝ հայերեն թարգմանությունը տեսնելու համար։
          </p>
        </div>
      </footer>
    </div>
  );
}

// Subcomponent for each section card
interface SectionBlockProps {
  section: SectionData;
  isRevealed: (id: string) => boolean;
  toggleReveal: (id: string) => void;
  revealAllInSection: () => void;
  hideAllInSection: () => void;
  speakText: (text: string, id: string) => void;
  speakingId: string | null;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
  savedIds: Set<string>;
  toggleSave: (id: string) => void;
}

function SectionBlock({
  section,
  isRevealed,
  toggleReveal,
  revealAllInSection,
  hideAllInSection,
  speakText,
  speakingId,
  copyToClipboard,
  copiedId,
  savedIds,
  toggleSave
}: SectionBlockProps) {
  return (
    <article
      id={`section-${section.id}`}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all hover:border-slate-300"
    >
      {/* Section Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-black text-sm">
              {section.numberStr}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {section.titleEs}
                </h2>
                {section.levelBadge && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30">
                    {section.levelBadge}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-slate-300 mt-0.5">
                {section.titleHy}
              </p>
            </div>
          </div>

          {/* Quick Section Controls */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={revealAllInSection}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition flex items-center gap-1 font-medium"
              title="Բացել այս բաժնի բոլոր թարգմանությունները"
            >
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Բացել բոլորը</span>
            </button>
            <button
              onClick={hideAllInSection}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition flex items-center gap-1 font-medium"
              title="Թաքցնել այս բաժնի թարգմանությունները"
            >
              <EyeOff className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden sm:inline">Թաքցնել</span>
            </button>
          </div>
        </div>

        {/* Formula Badge if present */}
        {section.formula && (
          <div className="mt-3 inline-block px-3 py-1 rounded-lg bg-white/10 text-amber-200 text-xs sm:text-sm font-mono border border-white/15">
            Կառույց՝ <span className="font-bold text-white">{section.formula}</span>
          </div>
        )}
      </div>

      {/* Section Body */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* Armenian Description Paragraphs */}
        {section.descriptionHy && section.descriptionHy.length > 0 && (
          <div className="space-y-2 text-sm sm:text-base text-slate-700 leading-relaxed font-normal bg-slate-50/70 p-4 rounded-xl border border-slate-100">
            {section.descriptionHy.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {/* Main Table if present (e.g. Section 1, 13, 16, 19) */}
        {section.table && (
          <div className="rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-100/90 text-xs font-bold uppercase tracking-wider text-slate-600 px-4 py-2.5 border-b border-slate-200">
              <div className="flex items-center gap-1.5">
                <span>🇪🇸 {section.table.headers[0]}</span>
                <span className="text-[10px] text-slate-400 font-normal lowercase">(սեղմիր)</span>
              </div>
              <div className="hidden sm:block">
                <span>🇦🇲 {section.table.headers[1]}</span>
              </div>
            </div>

            <div className="divide-y divide-slate-100 bg-white">
              {section.table.rows.map((row) => {
                const revealed = isRevealed(row.id);
                const isSaved = savedIds.has(row.id);

                return (
                  <div
                    key={row.id}
                    className="grid grid-cols-1 sm:grid-cols-2 p-3 sm:px-4 sm:py-3.5 gap-2 sm:gap-4 hover:bg-amber-50/40 transition-colors items-center"
                  >
                    {/* Spanish column (Clickable to reveal) */}
                    <div
                      onClick={() => toggleReveal(row.id)}
                      className="cursor-pointer group flex items-center justify-between gap-2"
                    >
                      <span className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-700 transition">
                        {row.spanish}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakText(row.spanish, row.id);
                          }}
                          className="p-1 rounded-md text-slate-400 hover:text-amber-600 hover:bg-slate-100 transition"
                          title="Լսել արտասանությունը"
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${speakingId === row.id ? 'text-amber-600 animate-pulse' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSave(row.id);
                          }}
                          className={`p-1 rounded-md transition ${isSaved ? 'text-amber-600' : 'text-slate-300 hover:text-amber-600'}`}
                          title={isSaved ? "Հեռացնել" : "Պահպանել"}
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>

                    {/* Armenian translation column */}
                    <div
                      onClick={() => toggleReveal(row.id)}
                      className="cursor-pointer sm:pl-2"
                    >
                      {revealed ? (
                        <div className="text-sm font-medium text-amber-900 bg-amber-100/60 sm:bg-transparent p-2 sm:p-0 rounded-lg animate-fadeIn flex items-center gap-1.5">
                          <span className="sm:hidden text-xs text-amber-700 font-bold">🇦🇲</span>
                          <span>{row.armenian}</span>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400 hover:text-amber-600 flex items-center gap-1 py-1">
                          <span>👆 Սեղմիր թարգմանության համար</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Examples List if present */}
        {section.examples && section.examples.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{section.examplesTitle || "Ejemplos — Օրինակներ"}</span>
              </h3>
              <span className="text-[11px] text-slate-400">
                (Սեղմիր իսպաներենի վրա)
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {section.examples.map((item) => {
                const revealed = isRevealed(item.id);
                const isSaved = savedIds.has(item.id);

                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-amber-300 hover:shadow-2xs transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div
                        onClick={() => toggleReveal(item.id)}
                        className="cursor-pointer group flex-1"
                      >
                        <div className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-700 transition">
                          {item.spanish}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => speakText(item.spanish, item.id)}
                          className="p-1 rounded-md text-slate-400 hover:text-amber-600 hover:bg-slate-100 transition"
                          title="Լսել"
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${speakingId === item.id ? 'text-amber-600 animate-pulse' : ''}`} />
                        </button>
                        <button
                          onClick={() => copyToClipboard(item.spanish, item.id)}
                          className="p-1 rounded-md text-slate-400 hover:text-amber-600 hover:bg-slate-100 transition"
                          title="Պատճենել"
                        >
                          {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => toggleSave(item.id)}
                          className={`p-1 rounded-md transition ${isSaved ? 'text-amber-600' : 'text-slate-300 hover:text-amber-600'}`}
                          title={isSaved ? "Հեռացնել" : "Պահպանել"}
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>

                    {/* Armenian Translation */}
                    <div
                      onClick={() => toggleReveal(item.id)}
                      className="mt-2 pt-2 border-t border-slate-100 cursor-pointer"
                    >
                      {revealed ? (
                        <div className="text-sm font-medium text-amber-900 flex items-center gap-1.5 animate-fadeIn">
                          <span className="text-xs font-bold text-amber-700">🇦🇲</span>
                          <span>{item.armenian}</span>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400 hover:text-amber-600 flex items-center gap-1">
                          👆 Սեղմիր հայերեն թարգմանության համար
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Subsections if present (e.g. Bien / Muy bien / Bastante bien, IR/SALIR/QUEDAR) */}
        {section.subsections && (
          <div className="space-y-4 pt-2">
            {section.subsections.map((sub, sidx) => (
              <div key={sidx} className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/80 space-y-3">
                <h4 className="font-extrabold text-sm sm:text-base text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>{sub.title}</span>
                </h4>

                {sub.table && (
                  <div className="rounded-lg border border-slate-200 overflow-hidden bg-white shadow-2xs">
                    <div className="grid grid-cols-2 bg-slate-100 text-xs font-bold uppercase text-slate-600 px-3 py-2 border-b border-slate-200">
                      <span>🇪🇸 {sub.table.headers[0]}</span>
                      <span>🇦🇲 {sub.table.headers[1]}</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {sub.table.rows.map(r => {
                        const revealed = isRevealed(r.id);
                        return (
                          <div
                            key={r.id}
                            onClick={() => toggleReveal(r.id)}
                            className="grid grid-cols-2 p-2.5 sm:px-3 text-sm hover:bg-amber-50/30 cursor-pointer items-center"
                          >
                            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                              <span>{r.spanish}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speakText(r.spanish, r.id);
                                }}
                                className="p-0.5 text-slate-400 hover:text-amber-600"
                              >
                                <Volume2 className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-slate-700">
                              {revealed ? (
                                <span className="text-amber-900 font-medium">{r.armenian}</span>
                              ) : (
                                <span className="text-xs text-slate-400">👆 Սեղմիր</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {sub.examples && (
                  <div className="space-y-2">
                    {sub.examples.map(ex => {
                      const revealed = isRevealed(ex.id);
                      return (
                        <div
                          key={ex.id}
                          onClick={() => toggleReveal(ex.id)}
                          className="p-3 bg-white rounded-lg border border-slate-200 hover:border-amber-300 cursor-pointer transition"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-slate-900">{ex.spanish}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakText(ex.spanish, ex.id);
                              }}
                              className="p-1 text-slate-400 hover:text-amber-600"
                            >
                              <Volume2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="mt-1 text-xs">
                            {revealed ? (
                              <span className="text-amber-900 font-semibold">{ex.armenian}</span>
                            ) : (
                              <span className="text-slate-400">👆 Սեղմիր թարգմանության համար</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Comparisons / Differences if present */}
        {section.comparisons && (
          <div className="space-y-4 pt-2">
            {section.comparisons.map((comp, cidx) => (
              <div key={cidx} className="bg-amber-50/50 rounded-xl p-4 border border-amber-200 space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-900">
                  {comp.title}
                </h4>

                <div className="grid grid-cols-1 gap-2">
                  {comp.items.map(ci => {
                    const revealed = isRevealed(ci.id);
                    return (
                      <div
                        key={ci.id}
                        onClick={() => toggleReveal(ci.id)}
                        className="bg-white p-3 rounded-lg border border-amber-200/80 hover:border-amber-400 transition cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{ci.spanish}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speakText(ci.spanish, ci.id);
                            }}
                            className="p-1 text-slate-400 hover:text-amber-600"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div>
                          {revealed ? (
                            <span className="text-xs sm:text-sm font-bold text-amber-800">
                              {ci.armenian}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">
                              👆 Սեղմիր թարգմանության համար
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {comp.notes && (
                  <div className="text-xs text-amber-950 font-medium space-y-1 pt-1">
                    {comp.notes.map((n, ni) => (
                      <p key={ni}>💡 {n}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Attention Notes / Ուշադրություն */}
        {section.attentionNotes && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs sm:text-sm space-y-1.5">
            <div className="font-extrabold text-rose-800 uppercase tracking-wider text-xs mb-1">
              ⚠️ Ուշադրություն.
            </div>
            {section.attentionNotes.map((note, idx) => (
              <p key={idx} className="text-rose-950 font-medium">
                • {note}
              </p>
            ))}
          </div>
        )}

        {/* Grammar Notes / Քերականություն */}
        {section.grammarNotes && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-xs sm:text-sm space-y-1.5">
            <div className="font-extrabold text-indigo-800 uppercase tracking-wider text-xs mb-1">
              📘 Քերականական կանոն
            </div>
            {section.grammarNotes.map((note, idx) => (
              <p key={idx} className="text-indigo-950 font-medium leading-relaxed">
                {note}
              </p>
            ))}
          </div>
        )}

        {/* Additional Notes */}
        {section.notes && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm space-y-1.5">
            {section.notes.map((note, idx) => (
              <p key={idx} className="text-slate-700 font-medium leading-relaxed">
                📌 {note}
              </p>
            ))}
          </div>
        )}

        {/* Dialogue preview if Section 17 */}
        {section.dialogue && (
          <div className="space-y-3 pt-2">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-900 text-xs font-semibold">
              {section.dialogue.context}
            </div>
            <div className="space-y-2">
              {section.dialogue.lines.map(line => {
                const revealed = isRevealed(line.id);
                return (
                  <div
                    key={line.id}
                    onClick={() => toggleReveal(line.id)}
                    className="p-3 rounded-xl border border-slate-200 hover:border-amber-400 bg-white transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {line.speaker}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">
                          {line.spanish}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(line.spanish, line.id);
                        }}
                        className="p-1 text-slate-400 hover:text-amber-600"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-1.5 text-xs">
                      {revealed ? (
                        <span className="text-amber-800 font-medium">🇦🇲 {line.armenian}</span>
                      ) : (
                        <span className="text-slate-400">👆 Սեղմիր թարգմանության համար</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Reading preview if Section 18 */}
        {section.reading && (
          <div className="space-y-3 pt-2">
            <div className="space-y-2">
              {section.reading.paragraphs.map((p, pidx) => {
                const revealed = isRevealed(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => toggleReveal(p.id)}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 bg-white transition cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-serif text-slate-900 text-sm sm:text-base leading-relaxed">
                        {p.spanish}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(p.spanish, p.id);
                        }}
                        className="p-1 text-slate-400 hover:text-amber-600 shrink-0"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-2 text-xs sm:text-sm">
                      {revealed ? (
                        <div className="text-amber-900 font-medium bg-amber-50 p-2.5 rounded-lg border border-amber-200 animate-fadeIn">
                          🇦🇲 {p.armenian}
                        </div>
                      ) : (
                        <span className="text-slate-400">👆 Սեղմիր հայերեն թարգմանության համար</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
