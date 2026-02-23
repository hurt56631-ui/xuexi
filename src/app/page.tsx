import type { ComponentType } from "react";
import Link from "next/link";
import {
  Bell,
  BookOpen,
  BookText,
  ChevronRight,
  Compass,
  FileText,
  Globe,
  Layers3,
  Library,
  Lightbulb,
  MessageCircle,
  Mic,
  Music2,
  Sparkles,
  Star,
  Target,
  Users,
  Volume2,
} from "lucide-react";

type NavItem = {
  zh: string;
  mm: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  iconColor: string;
  bg: string;
};

const pinyinNav: NavItem[] = [
  { zh: "声母", mm: "ဗျည်း", icon: Mic, href: "/pinyin/initials", bg: "bg-blue-100/80", iconColor: "text-blue-600" },
  { zh: "韵母", mm: "သရ", icon: Music2, href: "/pinyin/finals", bg: "bg-emerald-100/80", iconColor: "text-emerald-600" },
  { zh: "整体", mm: "အသံတွဲ", icon: Layers3, href: "/pinyin/syllables", bg: "bg-purple-100/80", iconColor: "text-purple-600" },
  { zh: "声调", mm: "အသံ", icon: FileText, href: "/pinyin/tones", bg: "bg-orange-100/80", iconColor: "text-orange-600" },
];

const coreTools: NavItem[] = [
  { zh: "AI 翻译", mm: "AI ဘာသာပြန်", icon: Globe, href: "/ai-translate", bg: "bg-indigo-100/80", iconColor: "text-indigo-600" },
  { zh: "免费书籍", mm: "စာကြည့်တိုက်", icon: Library, href: "/library", bg: "bg-cyan-100/80", iconColor: "text-cyan-600" },
  { zh: "单词收藏", mm: "မှတ်ထားသော စာလုံး", icon: Star, href: "/words", bg: "bg-slate-200/90", iconColor: "text-slate-700" },
  { zh: "口语收藏", mm: "မှတ်ထားသော စကားပြော", icon: Volume2, href: "/oral", bg: "bg-slate-200/90", iconColor: "text-slate-700" },
];

const systemCourses = [
  {
    badge: "Words",
    sub: "词汇 (VOCABULARY)",
    title: "日常高频词汇",
    mmDesc: "အခြေခံ စကားလုံးများကို လေ့လာပါ。",
    zhDesc: "掌握生活与考试中最核心的词汇",
    bgImg: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200",
    href: "/course/words",
  },
  {
    badge: "Spoken",
    sub: "口语 (ORAL)",
    title: "地道汉语口语",
    mmDesc: "နေ့စဉ်သုံး စကားပြောဆိုမှုများကို လေ့ကျင့်ပါ。",
    zhDesc: "跟读与练习最纯正的日常交流口语",
    bgImg: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&q=80&w=1200",
    href: "/course/oral",
  },
  {
    badge: "HSK 1",
    sub: "入门 (INTRO)",
    title: "HSK 1",
    mmDesc: "အသုံးအများဆုံး စကားလုံးများနှင့် သဒ္ဒါ",
    zhDesc: "掌握最常用词语和基本语法",
    bgImg: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    href: "/course/hsk1",
  },
];

const glassCard =
  "rounded-2xl border border-white/45 bg-white/35 shadow-[0_10px_30px_rgba(2,6,23,0.12)] backdrop-blur-xl";
const glassCardHover = `${glassCard} transition-all duration-300 hover:bg-white/45 hover:shadow-[0_14px_34px_rgba(2,6,23,0.16)]`;

function TopPanel() {
  return (
    <header className="sticky top-0 z-30 mb-3">
      <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/40 px-3 py-3 shadow-[0_10px_28px_rgba(2,6,23,0.12)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/35 via-transparent to-white/20" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-wide text-slate-500">Chinese Learning Hub</p>
            <h1 className="text-[18px] font-black text-slate-800">中缅文学习中心</h1>
          </div>
          <button
            type="button"
            aria-label="通知"
            className="rounded-xl border border-white/50 bg-white/50 p-2 text-slate-600 transition-colors hover:bg-white/70"
          >
            <Bell className="h-4 w-4" />
          </button>
        </div>
        <div className="relative mt-2 flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 px-2.5 py-1 text-[10px] font-bold text-indigo-700">
            <Sparkles className="h-3.5 w-3.5" />
            今日任务
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
            <Target className="h-3.5 w-3.5" />
            30 分钟
          </span>
        </div>
      </div>
    </header>
  );
}

function HeroStrip() {
  return (
    <section className={`${glassCard} mb-4 p-4`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold tracking-wider text-slate-500">WELCOME BACK</p>
          <h2 className="mt-1 text-[20px] font-black leading-tight text-slate-800">今天继续进步一点点</h2>
          <p className="mt-1 text-[12px] text-slate-600">每天稳步学习，拼音、词汇、口语一起提升。</p>
        </div>
        <div className="rounded-xl bg-white/60 p-2 text-indigo-600">
          <Sparkles className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-white/50 p-2 text-center">
          <p className="text-[10px] font-semibold text-slate-500">已学单词</p>
          <p className="text-[15px] font-black text-slate-800">1,240</p>
        </div>
        <div className="rounded-xl bg-white/50 p-2 text-center">
          <p className="text-[10px] font-semibold text-slate-500">连续学习</p>
          <p className="text-[15px] font-black text-slate-800">18 天</p>
        </div>
        <div className="rounded-xl bg-white/50 p-2 text-center">
          <p className="text-[10px] font-semibold text-slate-500">今日进度</p>
          <p className="text-[15px] font-black text-slate-800">72%</p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-slate-900">
      {/* 背景图：放在 public/images/home-bg.jpg */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center saturate-110"
        style={{ backgroundImage: "url('/images/home-bg.jpg')" }}
      />
      {/* 暗部，保留清晰度 */}
      <div className="fixed inset-0 -z-10 bg-black/10" />
      {/* 氛围光 */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.36), transparent 38%), radial-gradient(circle at 85% 0%, rgba(59,130,246,0.24), transparent 35%), radial-gradient(circle at 50% 100%, rgba(56,189,248,0.18), transparent 40%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-lg px-4 pb-28 pt-3">
        <TopPanel />
        <HeroStrip />

        <section className="grid grid-cols-4 gap-3">
          {pinyinNav.map((item) => (
            <Link key={item.zh} href={item.href} className={`${glassCardHover} px-1 py-4`}>
              <div className="flex flex-col items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${item.bg}`}>
                  <item.icon className={`h-4 w-4 ${item.iconColor}`} />
                </div>
                <div className="text-center">
                  <p className="text-[13px] font-bold leading-none text-slate-800">{item.zh}</p>
                  <p className="mt-1 text-[10px] font-medium leading-none text-slate-500">{item.mm}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-4">
          <Link href="/tips" className={`${glassCardHover} flex items-center justify-between px-4 py-3`}>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100/85 p-1.5">
                <Lightbulb className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-slate-800">发音技巧 (Tips)</p>
                <p className="text-[11px] text-slate-500">အသံထွက်နည်းလမ်းများ</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </Link>
        </section>

        <section className="mt-4 grid grid-cols-2 gap-3">
          {coreTools.map((tool) => (
            <Link key={tool.zh} href={tool.href} className={`${glassCardHover} flex items-center gap-3 p-3.5`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${tool.bg}`}>
                <tool.icon className={`h-4 w-4 ${tool.iconColor}`} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-bold text-slate-800">{tool.zh}</p>
                <p className="mt-0.5 truncate text-[10px] text-slate-500">{tool.mm}</p>
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-8">
          <div className="mb-3 flex items-center gap-2 px-1">
            <BookText className="h-4 w-4 text-slate-700" />
            <h2 className="text-[13px] font-bold tracking-wider text-slate-700">SYSTEM COURSES (သင်ရိုး)</h2>
          </div>

          <div className="flex flex-col gap-4">
            {systemCourses.map((course) => (
              <Link
                key={course.title}
                href={course.href}
                className="group relative block overflow-hidden rounded-3xl border border-white/40 shadow-[0_18px_40px_rgba(2,6,23,0.25)]"
              >
                <div className="absolute inset-0 bg-slate-800" />
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-85 transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${course.bgImg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/15 to-transparent" />
                <div className="relative flex min-h-[170px] flex-col justify-between p-4">
                  <span className="w-fit rounded-full bg-white/95 px-3 py-1 text-[11px] font-black text-slate-800">
                    {course.badge}
                  </span>
                  <div className="mt-8">
                    <p className="mb-1 text-[11px] font-bold tracking-widest text-cyan-300">{course.sub}</p>
                    <h3 className="mb-1.5 text-2xl font-black text-white">{course.title}</h3>
                    <p className="truncate text-[13px] text-slate-200">{course.mmDesc}</p>
                    <p className="truncate text-[12px] font-medium text-slate-300">{course.zhDesc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto flex h-14 w-full max-w-lg items-center justify-between border-t border-white/40 bg-white/70 px-1 backdrop-blur-xl sm:hidden">
        <a href="https://bbs.886.best/user/mei/chats" className="flex flex-1 flex-col items-center justify-center text-slate-600 transition-colors hover:text-slate-800">
          <MessageCircle className="h-5 w-5" />
          <span className="mt-0.5 text-[10px] font-semibold">消息</span>
        </a>
        <a href="https://bbs.886.best" className="flex flex-1 flex-col items-center justify-center text-slate-600 transition-colors hover:text-slate-800">
          <BookOpen className="h-5 w-5" />
          <span className="mt-0.5 text-[10px] font-semibold">社区</span>
        </a>
        <a href="https://bbs.886.best/partners" className="flex flex-1 flex-col items-center justify-center text-slate-600 transition-colors hover:text-slate-800">
          <Users className="h-5 w-5" />
          <span className="mt-0.5 text-[10px] font-semibold">语伴</span>
        </a>
        <a href="https://bbs.886.best/category/5/%E5%8A%A8%E6%80%81" className="flex flex-1 flex-col items-center justify-center text-slate-600 transition-colors hover:text-slate-800">
          <Compass className="h-5 w-5" />
          <span className="mt-0.5 text-[10px] font-semibold">动态</span>
        </a>
        <Link href="/" className="relative flex flex-1 flex-col items-center justify-center text-indigo-600">
          <span className="absolute top-0 h-0.5 w-8 rounded-full bg-indigo-500" />
          <BookText className="h-5 w-5" />
          <span className="mt-0.5 text-[10px] font-semibold">学习</span>
        </Link>
      </nav>
    </main>
  );
}
