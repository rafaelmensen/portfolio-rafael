import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Award,
  Briefcase,
  Brush,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  GraduationCap,
  Layers3,
  Mail,
  MonitorSmartphone,
  MoveRight,
  PenTool,
  Sparkles,
  User,
  Wand2,
} from "lucide-react";

type IconType = React.ComponentType<{ className?: string }>;

type ExperienceItem = {
  company: string;
  role: string;
  contract: string;
  period: string;
  duration: string;
  location: string;
  skills: string;
  logo: string;
  logoClass: string;
};

type EducationItem = {
  institution: string;
  course: string;
  period: string;
  skills?: string;
  logo: string;
  logoClass: string;
};

type CertificateItem = {
  title: string;
  issuer: string;
  issued: string;
  code: string;
  skills: string;
  logo: string;
  logoClass: string;
};

type SkillItem = {
  icon: IconType;
  title: string;
  text: string;
};

type ToolItem = {
  name: string;
  href: string;
  type: "design" | "code";
};

type ProjectItem = {
  title: string;
  category: string;
  description: string;
  gradient: string;
  shape: string;
};

const sectionIds = ["home", "about", "skills", "projects", "experience", "education", "certificates", "contact"];

const mainSkills: SkillItem[] = [
  { icon: MonitorSmartphone, title: "UI Design", text: "Interfaces modernas, responsivas e com foco em experiência visual premium." },
  { icon: Wand2, title: "Motion Design", text: "Microinterações, animações suaves e ritmo visual para produtos digitais." },
  { icon: Brush, title: "Visual Design", text: "Composição, identidade, hierarquia visual, cores e acabamento profissional." },
  { icon: Code2, title: "Design Front-end", text: "Transformação de layouts em interfaces com TypeScript, CSS e React." },
];

const tools: ToolItem[] = [
  { name: "Figma", href: "https://www.figma.com", type: "design" },
  { name: "Adobe Illustrator", href: "https://www.adobe.com/products/illustrator.html", type: "design" },
  { name: "Photoshop", href: "https://www.adobe.com/products/photoshop.html", type: "design" },
  { name: "Blender", href: "https://www.blender.org", type: "design" },
  { name: "Krita", href: "https://krita.org", type: "design" },
  { name: "TypeScript", href: "https://www.typescriptlang.org", type: "code" },
  { name: "CSS", href: "https://developer.mozilla.org/docs/Web/CSS", type: "code" },
  { name: "React", href: "https://react.dev", type: "code" },
];

const projects: ProjectItem[] = [
  { title: "Dashboard BI", category: "UI / Dados", description: "Dashboard executivo com foco em leitura rápida e clareza visual.", gradient: "from-zinc-950 via-zinc-900 to-zinc-800", shape: "rounded-[35%_65%_50%_50%]" },
  { title: "Finance App", category: "UI Design", description: "Interface mobile com cards, hierarquia e experiência limpa.", gradient: "from-black via-zinc-900 to-neutral-700", shape: "rounded-[55%_45%_60%_40%]" },
  { title: "Motion Poster", category: "Motion", description: "Peça visual com ritmo, textura e direção criativa para redes.", gradient: "from-neutral-950 via-zinc-800 to-stone-700", shape: "rounded-[45%_55%_40%_60%]" },
  { title: "Landing Page", category: "Front-end", description: "Página responsiva com componentes, animação e visual premium.", gradient: "from-zinc-950 via-slate-900 to-zinc-700", shape: "rounded-[65%_35%_45%_55%]" },
  { title: "Brand System", category: "Identidade", description: "Sistema visual com tipografia, cores e componentes de marca.", gradient: "from-black via-neutral-900 to-zinc-700", shape: "rounded-[40%_60%_35%_65%]" },
  { title: "3D Product", category: "Blender", description: "Render 3D com iluminação escura, reflexos e composição de produto.", gradient: "from-zinc-950 via-neutral-800 to-stone-600", shape: "rounded-[60%_40%_50%_50%]" },
];

const experience: ExperienceItem[] = [
  { company: "Sicredi Campos Gerais e Grande Curitiba PR/SP", role: "Assistente de BI", contract: "Tempo integral", period: "fev de 2025 — o momento", duration: "1 ano 4 meses", location: "Ponta Grossa, Paraná, Brasil", skills: "Power BI, Design de Dashboards, UI para dados e análise visual", logo: "✳", logoClass: "bg-zinc-200 text-emerald-700" },
  { company: "Sicredi Campos Gerais e Grande Curitiba PR/SP", role: "Jovem aprendiz Setor de BI", contract: "Meio período", period: "set de 2024 — fev de 2025", duration: "6 meses", location: "Ponta Grossa, Paraná, Brasil · Presencial", skills: "Dashboards, organização de dados e suporte ao time de BI", logo: "✳", logoClass: "bg-zinc-200 text-emerald-700" },
  { company: "Odonto Excellence Franchising", role: "Gerente Administrativo Sênior", contract: "Tempo integral", period: "dez de 2022 — jan de 2024", duration: "1 ano 2 meses", location: "Ponta Grossa, Paraná, Brasil", skills: "Administração, gestão de equipes e análise de negócios", logo: "O", logoClass: "bg-red-950 text-red-200" },
  { company: "GH Imóveis", role: "Assistente administrativo", contract: "Tempo integral", period: "abr de 2022 — dez de 2022", duration: "9 meses", location: "Ponta Grossa, Paraná, Brasil", skills: "Administração, atendimento e processos internos", logo: "GH", logoClass: "bg-slate-200 text-slate-600" },
  { company: "Clínica Sabedotti", role: "Estágiário", contract: "Meio período", period: "jun de 2021 — ago de 2021", duration: "3 meses", location: "Ponta Grossa, Paraná, Brasil", skills: "Rotinas administrativas e suporte operacional", logo: "CS", logoClass: "bg-slate-200 text-slate-600" },
];

const education: EducationItem[] = [
  { institution: "UniCesumar", course: "Análise e desenvolvimento de sistemas", period: "fev de 2023 — dez de 2025", logo: "UC", logoClass: "bg-blue-900 text-blue-100" },
  { institution: "UniSecal", course: "Contabilidade", period: "fev de 2021 — nov de 2024", skills: "Administração", logo: "US", logoClass: "bg-zinc-200 text-yellow-700" },
  { institution: "Ceeppg", course: "Ensino Técnico, Informática", period: "fev de 2017 — nov de 2020", logo: "CE", logoClass: "bg-zinc-200 text-slate-500" },
];

const certificates: CertificateItem[] = [
  { title: "Figma: Além do UI com Figma Buzz e Figma Slides", issuer: "Alura", issued: "abr de 2026", code: "7bc53da1-d5a0-43a4-9f8c-e2034617fcdb", skills: "Figma", logo: "a", logoClass: "bg-gradient-to-br from-zinc-950 to-cyan-950 text-zinc-200" },
  { title: "Figma Design de interfaces do zero ao profissional 2025", issuer: "Udemy", issued: "jan de 2026", code: "UC-8ad0b616-cebd-4100-8fe6-cf6fd91888e8", skills: "UIX · UI · Figma · Design de interface do usuário", logo: "U", logoClass: "bg-zinc-200 text-purple-700" },
  { title: "Figma: criando e evoluindo componentes de uma interface", issuer: "Alura", issued: "jan de 2026", code: "aa669d9f-4759-439a-abc9-32357a4e1c5e", skills: "Design de interface do usuário", logo: "a", logoClass: "bg-gradient-to-br from-zinc-950 to-cyan-950 text-zinc-200" },
  { title: "UX Design: how to build a persona", issuer: "Alura", issued: "set de 2025", code: "3de7038c-982d-411d-9a76-6bd01989ab18", skills: "UX · Experiência do usuário", logo: "a", logoClass: "bg-gradient-to-br from-zinc-950 to-cyan-950 text-zinc-200" },
  { title: "Adobe Illustrator: criação de ícones e fundos para interfaces digitais", issuer: "Alura", issued: "jun de 2025", code: "debdb1ad-a912-4897-8b11-9fb7f4d75dec", skills: "Illustrator · UI Design", logo: "a", logoClass: "bg-gradient-to-br from-zinc-950 to-cyan-950 text-zinc-200" },
  { title: "Git e GitHub: compartilhando e colaborando em projetos", issuer: "Alura", issued: "jan de 2025", code: "8984ae2a-4367-42ac-86ac-afc17ee54ccc", skills: "Git · GitHub", logo: "a", logoClass: "bg-gradient-to-br from-zinc-950 to-cyan-950 text-zinc-200" },
  { title: "Python e APIs: conhecendo a biblioteca Requests", issuer: "Alura", issued: "jan de 2025", code: "7874459f-c6d8-424d-a8f8-68fed735708c", skills: "Python", logo: "a", logoClass: "bg-gradient-to-br from-zinc-950 to-cyan-950 text-zinc-200" },
  { title: "Formação Front-end - HTML, CSS, JavaScript, React e +", issuer: "Udemy", issued: "abr de 2024", code: "UC-c26160c3-26af-4004-b5fd-c49b9124deeb", skills: "TypeScript · JavaScript · React.js · Node.js · CSS · HTML", logo: "U", logoClass: "bg-zinc-200 text-purple-700" },
  { title: "Master Power BI - De A a Z", issuer: "Udemy", issued: "ago de 2023", code: "UC-6264b2ab-0351-4fea-bc28-9433482ab849", skills: "Power BI · Visualização de dados", logo: "U", logoClass: "bg-zinc-200 text-purple-700" },
  { title: "Power Apps Expert na Prática", issuer: "Viscari Inc.", issued: "mai de 2023", code: "768ac008-995e-4267-95c6-e979b0d1328f", skills: "Power Apps", logo: "V", logoClass: "bg-orange-700 text-white" },
];

const socialLinks = ["Instagram", "LinkedIn", "GitHub", "Behance"];

function ToolIcon({ tool }: { tool: ToolItem }) {
  if (tool.type === "code") return <Code2 className="h-5 w-5" />;
  if (tool.name === "Figma") return <PenTool className="h-5 w-5" />;
  return <Brush className="h-5 w-5" />;
}

export default function PortfolioRafaelMensen() {
  const [active, setActive] = useState("home");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [projectIndex, setProjectIndex] = useState(0);
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [idleNav, setIdleNav] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);
  const [isNavScrolling, setIsNavScrolling] = useState(false);
  const displayActive = active === "education" || active === "certificates" ? "experience" : active;

  const triggerPulse = () => {
    setPulse(true);
    setRippleKey((current) => current + 1);
    window.setTimeout(() => setPulse(false), 460);
  };
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scrollBlur = useTransform(scrollY, [0, 600], [0, 18]);
  const scrollGlow = useTransform(scrollY, [0, 650], [0.38, 0.58]);

  const cardShift = typeof window !== "undefined" && window.innerWidth < 640 ? 0 : 350;
  const visibleExperience = showAllExperience ? experience : experience.slice(0, 1);
  const visibleCertificates = showAllCertificates ? certificates : certificates.slice(0, 3);

  const smoothScrollTo = (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();

    const target = document.getElementById(targetId);
    if (!target) return;

    triggerPulse();
    setActive(targetId);
    setIsNavScrolling(true);
    document.body.classList.add("is-navigating");

    const headerOffset = window.innerWidth < 768 ? 88 : 112;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });

    window.setTimeout(() => {
      setActive(targetId);
      setIsNavScrolling(false);
      document.body.classList.remove("is-navigating");
    }, 680);
  };

  const scrollProjects = (direction: "left" | "right") => {
    const maxIndex = Math.max(0, projects.length - (window.innerWidth < 640 ? 1 : 3));
    setProjectIndex((current) => {
      const next = direction === "right" ? current + 1 : current - 1;
      return Math.max(0, Math.min(next, maxIndex));
    });
  };

  const goToEdge = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    triggerPulse();

    const isNearTop = window.scrollY < 180;

    if (isNearTop) {
      const contact = document.getElementById("contact");
      contact?.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive("contact");
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setActive("home");
  };

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mouseX, mouseY]);
  useEffect(() => {
    let timer = window.setTimeout(() => setIdleNav(true), 3000);

    const wake = () => {
      setIdleNav(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdleNav(true), 3000);
    };

    window.addEventListener("pointermove", wake);
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("keydown", wake);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("keydown", wake);
    };
  }, []);


  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      if (isNavScrolling) {
        ticking = false;
        return;
      }

      const marker = window.innerWidth < 768 ? 96 : 130;
      let current = "home";

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= marker && rect.bottom > marker) {
          current = id;
          break;
        }

        if (rect.top <= marker) {
          current = id;
        }
      }

      setActive(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [isNavScrolling]);

  const nav = useMemo(
    () => [
      { id: "home", label: "Início", icon: Brush },
      { id: "about", label: "Sobre", icon: User },
      { id: "skills", label: "Skills", icon: Layers3 },
      { id: "projects", label: "Projetos", icon: MonitorSmartphone },
      { id: "experience", label: "Trajetória", icon: Briefcase },
    ],
    []
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020202] text-zinc-100 selection:bg-white/20">
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-purple-300/24 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-blue-300/22 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-300/26 to-transparent" />
        <div className="absolute -top-8 left-1/2 h-20 w-[70vw] -translate-x-1/2 animate-[borderGlow_5s_ease-in-out_infinite] rounded-full bg-blue-500/12" />
        <div className="absolute -bottom-10 left-1/2 h-24 w-[80vw] -translate-x-1/2 animate-[borderGlow_6s_ease-in-out_infinite] rounded-full bg-purple-500/12" />
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-blue-500/[0.035] to-transparent" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-purple-500/[0.035] to-transparent" />
      </div>
      <style>{`
        html { scroll-behavior: auto; }
        section { scroll-margin-top: 115px; }
        @media (max-width: 767px) {
          section { scroll-margin-top: 92px; }
        }
        @keyframes lineDrift {
          0%,100% { transform: translate3d(0,0,0) rotate(-12deg); opacity:.22; }
          50% { transform: translate3d(42px,-26px,0) rotate(-7deg); opacity:.72; }
        }
        @keyframes lineDriftTwo {
          0%,100% { transform: translate3d(0,0,0) rotate(18deg); opacity:.18; }
          50% { transform: translate3d(-36px,26px,0) rotate(23deg); opacity:.62; }
        }
        @keyframes meshPulse {
          0%,100% { opacity:.18; filter: blur(68px) saturate(.9); transform: scale(.96) rotate(0deg); }
          50% { opacity:.62; filter: blur(78px) saturate(1.35); transform: scale(1.08) rotate(4deg); }
        }
        @keyframes orbFlow {
          0%,100% { transform: translate3d(0,0,0) scale(1); opacity:.55; }
          33% { transform: translate3d(42px,-28px,0) scale(1.12); opacity:.86; }
          66% { transform: translate3d(-28px,34px,0) scale(.96); opacity:.68; }
        }
        @keyframes streakFlow {
          0% { transform: translateX(-12%) rotate(-10deg); opacity:.20; }
          50% { opacity:.68; }
          100% { transform: translateX(12%) rotate(-8deg); opacity:.26; }
        }
        @keyframes borderGlow {
          0%,100% { opacity:.32; filter: blur(18px); }
          50% { opacity:.75; filter: blur(26px); }
        }
        @keyframes borderMove {
          0% { transform: translateX(-25%); }
          50% { transform: translateX(25%); }
          100% { transform: translateX(-25%); }
        }
        @keyframes buttonBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#010101]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(100,58,220,0.30),transparent_38%),radial-gradient(circle_at_12%_55%,rgba(35,145,255,0.32),transparent_34%),radial-gradient(circle_at_88%_45%,rgba(155,82,255,0.28),transparent_36%)]" />
        <div className="absolute left-[-8%] top-[18%] h-[18rem] w-[72vw] animate-[meshPulse_18s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,transparent,rgba(75,110,255,0.22),rgba(155,90,255,0.18),transparent)] blur-[54px]" />
        <div className="absolute right-[-10%] bottom-[16%] h-[16rem] w-[64vw] animate-[meshPulse_20s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,transparent,rgba(160,80,255,0.18),rgba(65,145,255,0.16),transparent)] blur-[58px]" />
        <motion.div
          className="absolute h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.72),rgba(0,0,0,0.42)_38%,rgba(0,0,0,0.12)_62%,transparent_76%)] blur-[34px]"
          style={{ left: mouseX, top: mouseY, x: "-50%", y: "-50%", opacity: scrollGlow }}
        />
        <motion.div
          className="absolute h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.55),rgba(0,0,0,0.22)_48%,transparent_72%)] blur-[22px]"
          style={{ left: mouseX, top: mouseY, x: "-50%", y: "-50%", opacity: scrollGlow }}
        />
        <div className="absolute -left-[18%] top-[4%] h-[420px] w-[1100px] animate-[lineDrift_18s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,transparent,rgba(62,145,255,0.86),rgba(185,82,255,0.72),transparent)] blur-3xl" />
        <div className="absolute left-[4%] top-[34%] h-[280px] w-[980px] animate-[lineDriftTwo_20s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,transparent,rgba(45,165,255,0.72),rgba(175,72,255,0.68),transparent)] blur-3xl" />
        <div className="absolute right-[-20%] top-[12%] h-[380px] w-[1020px] animate-[lineDrift_22s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,transparent,rgba(166,92,255,0.44),rgba(80,120,255,0.34),transparent)] blur-3xl" />
        <div className="absolute left-[18%] bottom-[4%] h-[320px] w-[760px] animate-[orbFlow_24s_ease-in-out_infinite] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(60,120,255,0.32),rgba(140,80,255,0.22)_44%,transparent_72%)] blur-[70px]" />
        <div className="absolute right-[8%] bottom-[18%] h-[260px] w-[640px] animate-[orbFlow_21s_ease-in-out_infinite] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(170,80,255,0.30),rgba(50,110,255,0.20)_42%,transparent_70%)] blur-[68px]" />
        <div className="absolute left-[8%] top-[11%] h-px w-[60vw] animate-[streakFlow_6s_ease-in-out_infinite_alternate] bg-gradient-to-r from-transparent via-blue-300/50 to-transparent blur-[1px]" />
        <div className="absolute right-[4%] top-[27%] h-px w-[50vw] animate-[streakFlow_7s_ease-in-out_infinite_alternate] bg-gradient-to-r from-transparent via-purple-300/48 to-transparent blur-[1px]" />
        <div className="absolute bottom-[22%] left-[18%] h-px w-[52vw] animate-[streakFlow_8s_ease-in-out_infinite_alternate] bg-gradient-to-r from-transparent via-blue-200/44 to-transparent blur-[1px]" />
        <div className={`absolute inset-0 transition-opacity duration-500 ${pulse ? "opacity-100" : "opacity-0"}`}>
          <div className="absolute left-[12%] top-[18%] h-[28rem] w-[28rem] rounded-full bg-blue-500/22 blur-[90px]" />
          <div className="absolute right-[18%] top-[30%] h-[24rem] w-[24rem] rounded-full bg-purple-500/20 blur-[95px]" />
          <div className="absolute bottom-[16%] left-[34%] h-px w-[58vw] rotate-[-8deg] bg-gradient-to-r from-transparent via-blue-200/55 to-transparent blur-[2px]" />
        </div>
        <div className="absolute left-[-12%] top-[52%] h-[180px] w-[92vw] rotate-[7deg] animate-[lineDrift_15s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,transparent,rgba(65,165,255,0.34),rgba(170,80,255,0.28),transparent)] blur-[64px]" />
        <div className="absolute right-[-14%] top-[62%] h-[160px] w-[84vw] rotate-[-9deg] animate-[lineDriftTwo_16s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,transparent,rgba(155,70,255,0.28),rgba(55,150,255,0.30),transparent)] blur-[70px]" />
        <div className="absolute inset-0 bg-black/6 backdrop-blur-[5px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_30%,transparent_0%,rgba(0,0,0,0.20)_46%,rgba(0,0,0,0.84)_92%)]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/82 via-black/28 to-transparent" />
      </div>

      <header className={`fixed inset-x-0 top-4 z-50 flex justify-center px-3 transition-opacity duration-700 ${idleNav ? "opacity-35 hover:opacity-100" : "opacity-100"}`}>
        <nav className={`relative max-w-[calc(100vw-24px)] rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0.24),rgba(142,92,255,0.30),rgba(70,150,255,0.26),rgba(255,255,255,0.13))] bg-[length:260%_260%] p-[1px] shadow-[0_18px_55px_rgba(0,0,0,0.7),0_0_44px_rgba(90,105,255,0.16)] backdrop-blur-[30px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] animate-[navOpen_850ms_cubic-bezier(0.22,1,0.36,1)_both] ${pulse ? "scale-[1.012] blur-[0.12px]" : "scale-100 blur-0"}`}>
          <div className="relative flex items-center gap-1 overflow-hidden rounded-full bg-black/70 p-1.5 backdrop-blur-[32px] md:p-2">
            <div className={`pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(95,150,255,0.30),transparent_55%)] transition-opacity duration-500 ${pulse ? "opacity-100" : "opacity-0"}`} />

            {nav.map((item) => {
              const Icon = item.icon;
              const isActive = displayActive === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => smoothScrollTo(event, item.id)}
                  aria-label={item.label}
                  title={item.label}
                  className={`group relative flex h-11 shrink-0 items-center overflow-hidden rounded-full border transition-[width,background-color,border-color,box-shadow,transform,filter] duration-260 ease-[cubic-bezier(0.2,0.8,0.2,1)] md:h-12 ${
                    isActive
                      ? "w-auto min-w-0 border-transparent bg-white/[0.105] px-2 pr-4 text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.10),0_0_24px_rgba(90,115,255,0.16)] md:px-2 md:pr-5"
                      : "w-11 justify-center border-white/5 bg-white/[0.025] text-white/62 hover:border-white/14 hover:bg-white/[0.055] hover:text-white md:w-12"
                  } ${pulse && isActive ? "motion-blur-nav" : ""}`}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center md:h-12 md:w-12">
                    <Icon className="h-5 w-5" />
                  </span>
                  {isActive && (
                    <span className="whitespace-nowrap pr-1 text-sm font-semibold opacity-100 transition-opacity duration-150 ease-out">
                      {item.label}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </nav>
      </header>

      <main className="relative z-10 pb-24 md:pb-0">
        <section id="home" className="mx-auto flex min-h-screen max-w-6xl items-center px-6 pb-20 pt-32 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="w-full">
            <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">
              <div className="max-w-3xl">
                <p className="text-lg font-medium text-white/55">Olá, eu sou</p>
                <div className="mt-2 flex items-center gap-4">
                  <h1 className="text-4xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl">
                    Rafael <span className="bg-gradient-to-r from-white via-zinc-400 to-zinc-700 bg-clip-text text-transparent">Mensen</span>
                  </h1>

                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-3xl border border-white/15 bg-white/[0.05] p-1 shadow-[inset_1px_1px_0_rgba(255,255,255,0.16),0_18px_55px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:h-24 sm:w-24 lg:hidden">
                    <div className="h-full w-full overflow-hidden rounded-[1.25rem] bg-black/40">
                      <img src="/rafael.jpg" alt="Rafael Mensen" className="h-full w-full object-cover" />
                    </div>
                  </div>
                </div>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                  Designer focado em UI, motion design e experiências digitais com aparência premium. Crio interfaces limpas, visuais fortes e soluções que unem design, dados e tecnologia.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#projects" onClick={(event) => smoothScrollTo(event, "projects")} className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white backdrop-blur-2xl transition hover:bg-white/[0.10]">
                    Ver projetos
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </a>
                  <a href="#contact" onClick={(event) => smoothScrollTo(event, "contact")} className="inline-flex items-center rounded-full border border-white/10 bg-black/35 px-5 py-3 text-sm font-semibold text-zinc-300 backdrop-blur-xl transition hover:bg-white/[0.06]">
                    Contato
                  </a>
                </div>
              </div>

              <div className="relative hidden lg:block lg:self-start lg:pt-0">
                <div className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle,rgba(110,92,255,0.22),transparent_65%)] blur-2xl" />
                <div className="relative mx-auto max-w-[220px] overflow-hidden rounded-[2.2rem] sm:max-w-[240px] lg:max-w-[260px] border border-white/12 bg-white/[0.045] p-3 shadow-[inset_1px_1px_0_rgba(255,255,255,0.16),0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
                  <div className="grid aspect-[4/5] place-items-center overflow-hidden rounded-[1.6rem] border border-white/10 bg-[radial-gradient(circle_at_35%_22%,rgba(255,255,255,0.12),transparent_28%),linear-gradient(145deg,rgba(18,22,35,0.92),rgba(7,7,10,0.96))]">
                    <img
                      src="/rafael.jpg"
                      alt="Rafael Mensen"
                      className="h-full w-full object-cover scale-[1.02]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {mainSkills.map((skill) => {
                const Icon = skill.icon;

                return (
                  <div key={skill.title} className="rounded-[1.6rem] border border-white/10 bg-black/42 p-3 sm:p-5 shadow-[inset_1px_1px_0_rgba(255,255,255,0.10),inset_-1px_-1px_0_rgba(255,255,255,0.02),0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-white/20">
                    <div className="mb-5 inline-grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">{skill.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-zinc-500 sm:mt-3 sm:text-sm sm:leading-6">{skill.text}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75 }} className="reveal-premium px-1">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-zinc-600">Sobre mim</div>
                <h2 className="mt-4 text-3xl font-black sm:text-4xl">Design visual com foco em produto, dados e movimento.</h2>
              </div>
              <div>
                <p className="text-base leading-8 text-zinc-400">
                  Trabalho criando soluções visuais para tornar informações e experiências mais claras, bonitas e profissionais. Minha base mistura design de interface, dashboards, composição visual, motion e desenvolvimento front-end para transformar ideias em experiências digitais modernas.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-[inset_1px_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
                    <div className="text-sm font-bold text-zinc-200">Design orientado a dados</div>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">Crio telas e dashboards pensando em leitura rápida, hierarquia e tomada de decisão.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-[inset_1px_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
                    <div className="text-sm font-bold text-zinc-200">Experiência premium</div>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">Uso motion, glass e detalhes visuais para entregar interfaces com mais impacto.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="skills" className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75 }} className="reveal-premium">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-zinc-600">Principais skills</div>
                <h2 className="mt-2 text-3xl font-black sm:text-4xl">Design, motion e interface</h2>
              </div>
              <PenTool className="hidden h-8 w-8 text-white/35 md:block" />
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4">
              {tools.map((tool) => (
                <a key={tool.name} href={tool.href} target="_blank" rel="noreferrer" className="group rounded-[1.6rem] border border-white/10 bg-black/45 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.045]">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <ToolIcon tool={tool} />
                  </div>
                  <div className="flex items-center justify-between gap-2 font-semibold">
                    {tool.name}
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-500 opacity-0 transition group-hover:opacity-100" />
                  </div>
                  <div className="mt-2 h-px w-full bg-gradient-to-r from-white/15 to-transparent" />
                </a>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75 }} className="reveal-premium">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-zinc-600">Projetos</div>
                <h2 className="mt-2 text-3xl font-black sm:text-4xl">Vitrine de trabalhos</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">Cards horizontais com exemplos visuais. Arraste no celular ou use os botões para ver os 6 projetos.</p>
              </div>
              <div className="hidden gap-2 md:flex">
                <button onClick={() => { triggerPulse(); scrollProjects("left"); }} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/50 text-white/70 backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-white/[0.07] active:scale-95" aria-label="Voltar projetos">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => { triggerPulse(); scrollProjects("right"); }} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/50 text-white/70 backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-white/[0.07] active:scale-95" aria-label="Avançar projetos">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-transparent pb-4 sm:rounded-[2.4rem]">
              
              <div className="pointer-events-none absolute bottom-4 right-0 top-0 z-20 w-16 bg-gradient-to-l from-[#020202]/90 to-transparent sm:w-28" />
              <div className="story-carousel relative z-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-5 md:overflow-visible md:pb-0 md:transition-transform md:duration-[900ms] md:ease-[cubic-bezier(0.22,1,0.36,1)] md:will-change-transform" style={{ transform: `translateX(-${projectIndex * cardShift}px)` }}>
                {projects.map((project, index) => (
                  <article key={project.title} className="group relative h-[390px] w-[78vw] max-w-[330px] snap-center shrink-0 overflow-hidden sm:h-[390px] sm:w-[330px] rounded-[2.2rem] border border-white/10 bg-black/50 shadow-[inset_1px_1px_0_rgba(255,255,255,0.10),0_26px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-white/20">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.14),transparent_26%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_30%)]" />
                    <div className={`absolute left-1/2 top-10 h-56 w-56 sm:top-12 sm:h-60 sm:w-60 -translate-x-1/2 overflow-hidden ${project.shape} border border-white/10 bg-white/[0.075] shadow-[inset_10px_10px_28px_rgba(255,255,255,0.10),inset_-18px_-18px_40px_rgba(0,0,0,0.55),0_0_50px_rgba(255,255,255,0.06)] backdrop-blur-xl transition duration-500 group-hover:scale-110`}>
                    <img src="/rafael.jpg" alt="Rafael Mensen" className="h-full w-full object-cover opacity-75 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/55" />
                  </div>
                    <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs text-zinc-300 backdrop-blur-xl">{String(index + 1).padStart(2, "0")}</div>
                    <div className="absolute bottom-0 left-0 right-0 translate-y-16 bg-gradient-to-t from-black via-black/85 to-transparent p-6 pt-24 transition duration-500 group-hover:translate-y-0">
                      <div className="text-xs uppercase tracking-[0.28em] text-zinc-500">{project.category}</div>
                      <h3 className="mt-2 text-2xl font-black">{project.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-zinc-400 opacity-0 transition duration-500 group-hover:opacity-100">{project.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="experience" className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75 }} className="reveal-premium">
            <div className="mb-10">
              <div className="text-xs uppercase tracking-[0.35em] text-zinc-600">Trajetória profissional</div>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">Experiências</h2>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111313]/80 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.48)] backdrop-blur-xl">
              {visibleExperience.map((item, index) => (
                <div key={`${item.company}-${item.role}`} className={`grid gap-4 py-5 md:grid-cols-[56px_1fr] ${index !== visibleExperience.length - 1 ? "border-b border-white/8" : ""}`}>
                  <div className="relative">
                    <div className={`grid h-12 w-12 place-items-center rounded-sm text-lg font-black ${item.logoClass}`}>{item.logo}</div>
                    {index !== visibleExperience.length - 1 && <div className="absolute left-6 top-14 h-[calc(100%-10px)] w-px bg-white/10" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-200">{item.company}</h3>
                    <div className="mt-3">
                      <div className="font-bold text-zinc-200">{item.role}</div>
                      <div className="mt-1 text-sm text-zinc-400">{item.contract}</div>
                      <div className="mt-1 text-sm text-zinc-500">{item.period} · {item.duration}</div>
                      <div className="mt-1 text-sm text-zinc-500">{item.location}</div>
                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-300">
                        <MoveRight className="h-4 w-4 text-zinc-500" />
                        {item.skills}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {!showAllExperience && (
                <div className="mt-2 overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/30 backdrop-blur-xl">
                  <div className="relative h-28 px-8 py-6">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.035] to-transparent" />
                    <div className="blur-[5px] opacity-45">
                      <div className="flex items-start gap-5">
                        <div className="h-12 w-12 rounded-sm bg-white/20" />
                        <div className="flex-1">
                          <div className="h-4 w-2/3 rounded-full bg-white/25" />
                          <div className="mt-4 h-3 w-1/2 rounded-full bg-white/12" />
                          <div className="mt-3 h-3 w-3/4 rounded-full bg-white/12" />
                        </div>
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                  </div>
                  <div className="px-6 pb-6">
                    <button onClick={() => { triggerPulse(); setShowAllExperience(true); }} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-white/[0.10]">
                      Mostrar trajetória completa
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div id="education" className="mt-12 scroll-mt-28">
              <div className="mb-6 flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-zinc-500" />
                <h3 className="text-2xl font-black">Formação acadêmica</h3>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-[#151818]/85 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                {education.map((item, index) => (
                  <div key={item.institution} className={`grid gap-4 py-5 md:grid-cols-[56px_1fr_auto] ${index !== education.length - 1 ? "border-b border-white/8" : ""}`}>
                    <div className={`grid h-12 w-12 place-items-center rounded-sm text-sm font-black ${item.logoClass}`}>{item.logo}</div>
                    <div>
                      <h4 className="font-bold text-zinc-200">{item.institution}</h4>
                      <div className="mt-1 text-sm text-zinc-300">{item.course}</div>
                      <div className="mt-1 text-sm text-zinc-500">{item.period}</div>
                      {item.skills && (
                        <div className="mt-5 text-sm text-zinc-300">
                          <span className="font-bold">Competências:</span> {item.skills}
                        </div>
                      )}
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>

            <div id="certificates" className="mt-12 scroll-mt-28">
              <div className="mb-6 flex items-center gap-3">
                <Award className="h-5 w-5 text-zinc-500" />
                <h3 className="text-2xl font-black">Licenças e certificados</h3>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#151818]/85 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                {visibleCertificates.map((item, index) => (
                  <div key={item.code} className={`grid gap-4 py-5 md:grid-cols-[56px_1fr_auto] ${index !== visibleCertificates.length - 1 ? "border-b border-white/8" : ""}`}>
                    <div className={`grid h-12 w-12 place-items-center rounded-sm text-2xl font-black ${item.logoClass}`}>{item.logo}</div>
                    <div>
                      <h4 className="font-bold text-zinc-200">{item.title}</h4>
                      <div className="mt-1 text-sm text-zinc-300">{item.issuer}</div>
                      <div className="mt-1 text-sm text-zinc-500">Verificação emitida em {item.issued}</div>
                      <div className="mt-1 text-sm text-zinc-500">Código da credencial {item.code}</div>
                      <button className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.06]">
                        Exibir credencial
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                      <div className="mt-5 text-sm text-zinc-300">
                        <span className="font-bold">Competências:</span> {item.skills}
                      </div>
                    </div>
                    
                  </div>
                ))}

                {!showAllCertificates && (
                  <div className="mt-2 overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/30 backdrop-blur-xl">
                    <div className="relative h-28 px-8 py-6">
                      <div className="blur-[5px] opacity-45">
                        <div className="flex items-start gap-5">
                          <div className="h-12 w-12 rounded-sm bg-white/20" />
                          <div className="flex-1">
                            <div className="h-4 w-3/4 rounded-full bg-white/25" />
                            <div className="mt-4 h-3 w-1/2 rounded-full bg-white/12" />
                            <div className="mt-3 h-3 w-4/5 rounded-full bg-white/12" />
                          </div>
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                    </div>
                    <div className="px-6 pb-6">
                      <button onClick={() => { triggerPulse(); setShowAllCertificates(true); }} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-white/[0.10]">
                        Mostrar todos os certificados
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-6 py-20 pb-28 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75 }} className="reveal-premium rounded-[2.2rem] border border-white/10 bg-black/60 p-8 backdrop-blur-2xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-zinc-600">Contato</div>
                <h2 className="mt-3 text-3xl font-black sm:text-4xl">Vamos conversar?</h2>
                <p className="mt-4 text-zinc-500">Aqui ficam seus links profissionais para a pessoa acessar rápido.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {socialLinks.map((item) => (
                  <a key={item} href="#" onClick={triggerPulse} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-sm text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06]">
                    {item}
                    <ArrowDown className="h-4 w-4 -rotate-90 transition group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <a href={active === "home" ? "#contact" : "#home"} onClick={goToEdge} className="fixed bottom-20 left-4 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-3 text-sm text-white/80 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 md:bottom-6">
        <ArrowDown className={`h-4 w-4 transition ${active === "home" ? "" : "rotate-180"}`} />
        {active === "home" ? "Fim" : "Topo"}
      </a>

      <a href="#contact" onClick={(event) => smoothScrollTo(event, "contact")} className="fixed bottom-20 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-3 text-sm text-white/80 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 md:bottom-6">
        <Mail className="h-4 w-4" />
        Contato
      </a>
    </div>
  );
}
