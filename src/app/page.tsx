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
  Star,
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
  { zh: "声母", mm: "ဗျည်း", icon: Mic, href: "/pinyin/initials", bg: "bg-blue-100", iconColor: "text-blue-600" },
  { zh: "韵母", mm: "သရ", icon: Music2, href: "/pinyin/finals", bg: "bg-emerald-100", iconColor: "text-emerald-600" },
  { zh: "整体", mm: "အသံတွဲ", icon: Layers3, href: "/pinyin/syllables", bg: "bg-purple-100", iconColor: "text-purple-600" },
  { zh: "声调", mm: "အသံ", icon: FileText, href: "/pinyin/tones", bg: "bg-orange-100", iconColor: "text-orange-600" },
];

const coreTools: NavItem[] = [
  { zh: "AI 翻译", mm: "AI ဘာသာပြန်", icon: Globe, href: "/ai-translate", bg: "bg-indigo-100", iconColor: "text-indigo-600" },
  { zh: "免费书籍", mm: "စာကြည့်တိုက်", icon: Library, href: "/library", bg: "bg-cyan-100", iconColor: "text-cyan-600" },
  { zh: "单词收藏", mm: "မှတ်ထားသော စာလုံး", icon: Star, href: "/words", bg: "bg-slate-200", iconColor: "text-slate-700" },
  { zh: "口语收藏", mm: "မှတ်ထားသော စကားပြော", icon: Volume2, href: "/oral", bg: "bg-slate-200", iconColor: "text-slate-700" },
];

const systemCourses = [
  {
    badge: "Words",
    sub: "词汇 (VOCABULARY)",
    title: "日常高频词汇",
    mmDesc: "အခြေခံ စကားလုံးများကို လေ့လာပါ。",
    zhDesc: "掌握生活与考试中最核心的词汇",
    bgImg:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200",
    href: "/course/words",
  },
  {
    badge: "Spoken",
    sub: "口语 (ORAL)",
    title: "地道汉语口语",
    mmDesc: "နေ့စဉ်သုံး စကားပြောဆိုမှုများကို လေ့ကျင့်ပါ。",
    zhDesc: "跟读与练习最纯正的日常交流口语",
    bgImg:
      "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&q=80&w=1200",
    href: "/course/oral",
  },
  {
    badge: "HSK 1",
    sub: "入门 (INTRO)",
    title: "HSK 1",
    mmDesc: "အသုံးအများဆုံး စကားလုံးများနှင့် သဒ္ဒါ",
    zhDesc: "掌握最常用词语和基本语法",
    bgImg:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    href: "/course/hsk1",
  },
];

function TopPanel() {
  return (
    <header className="sticky top-0 z-30 mb-3">
      <div className="rounded-2xl border border-white/60 bg-white/75 px-3 py-2 shadow-sm backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Chinese Learning Hub</p>
            <h1 className="text-[18px] font-black text-slate-800">中缅文学习中心</h1>
          </div>
          <button type="button" className="rounded-xl bg-slate-100 p-2 text-slate-600 hover:bg-slate-200">
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-slate-900">
      {/* 大背景图：请放在 public/images/home-bg.jpg */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/home-bg.jpg')" }}
      />
      <div className="fixed inset-0 -z-10 bg-slate-100/55 backdrop-blur-[8px]" />

      <div className="relative z-10 mx-auto w-full max-w-lg px-4 pb-28 pt-3">
        <TopPanel />

        <section className="grid grid-cols-4 gap-3">
          {pinyinNav.map((item) => (
            <Link key={item.zh} href={item.href} className="rounded-2xl border border-white/60 bg-white/80 px-1 py-4 shadow-sm backdrop-blur-xl">
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
          <Link href="/tips" className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-1.5">
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
            <Link key={tool.zh} href={tool.href} className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/80 p-3.5 shadow-sm backdrop-blur-xl">
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
              <Link key={course.title} href={course.href} className="group relative block overflow-hidden rounded-2xl border border-white/40 shadow-lg">
                <div className="absolute inset-0 bg-slate-800" />
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-85 transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${course.bgImg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative flex min-h-[160px] flex-col justify-between p-4">
                  <span className="w-fit rounded-full bg-white/95 px-3 py-1 text-[11px] font-black text-slate-800">
                    {course.badge}
                  </span>
                  <div className="mt-8">
                    <p className="mb-1 text-[11px] font-bold tracking-widest text-cyan-400">{course.sub}</p>
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

      <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto flex h-14 w-full max-w-lg items-center justify-between border-t border-black/5 bg-white/95 px-1 backdrop-blur-xl sm:hidden">
        <a href="https://bbs.886.best/user/mei/chats" className="flex flex-1 flex-col items-center text-slate-500">
          <MessageCircle className="h-5 w-5" />
          <span className="mt-0.5 text-[10px] font-semibold">消息</span>
        </a>
        <a href="https://bbs.886.best" className="flex flex-1 flex-col items-center text-slate-500">
          <BookOpen className="h-5 w-5" />
          <span className="mt-0.5 text-[10px] font-semibold">社区</span>
        </a>
        <a href="https://bbs.886.best/partners" className="flex flex-1 flex-col items-center text-slate-500">
          <Users className="h-5 w-5" />
          <span className="mt-0.5 text-[10px] font-semibold">语伴</span>
        </a>
        <a href="https://bbs.886.best/category/5/%E5%8A%A8%E6%80%81" className="flex flex-1 flex-col items-center text-slate-500">
          <Compass className="h-5 w-5" />
          <span className="mt-0.5 text-[10px] font-semibold">动态</span>
        </a>
        <Link href="/" className="flex flex-1 flex-col items-center text-indigo-600">
          <BookText className="h-5 w-5" />
          <span className="mt-0.5 text-[10px] font-semibold">学习</span>
        </Link>
      </nav>
    </main>
  );
}
