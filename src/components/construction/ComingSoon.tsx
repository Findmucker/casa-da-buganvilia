import Image from "next/image";
import { MapPin, Sparkles } from "lucide-react";

const copy = {
  pt: {
    eyebrow: "Uma nova experiência está a florescer",
    title: "Estamos a preparar algo",
    accent: "muito especial.",
    body: "A Casa da Buganvília está quase pronta para abrir as suas portas online. Em breve poderá descobrir uma seleção única de arte, sabores e objetos cheios de história — diretamente do coração de Óbidos.",
    status: "Site em construção",
    note: "Até breve",
  },
  en: {
    eyebrow: "A new experience is blooming",
    title: "We are creating something",
    accent: "truly special.",
    body: "Casa da Buganvília is almost ready to open its online doors. Soon, you will discover a unique collection of art, flavours and objects with a story — straight from the heart of Óbidos.",
    status: "Website under construction",
    note: "See you soon",
  },
  fr: {
    eyebrow: "Une nouvelle expérience est en train d’éclore",
    title: "Nous préparons quelque chose",
    accent: "de très spécial.",
    body: "Casa da Buganvília ouvrira bientôt ses portes en ligne. Vous y découvrirez une sélection unique d’art, de saveurs et d’objets chargés d’histoire — au cœur d’Óbidos.",
    status: "Site en construction",
    note: "À très bientôt",
  },
  es: {
    eyebrow: "Una nueva experiencia está floreciendo",
    title: "Estamos preparando algo",
    accent: "muy especial.",
    body: "Casa da Buganvília está casi lista para abrir sus puertas online. Muy pronto descubrirás una selección única de arte, sabores y objetos llenos de historia — desde el corazón de Óbidos.",
    status: "Sitio en construcción",
    note: "Hasta muy pronto",
  },
  de: {
    eyebrow: "Ein neues Erlebnis erblüht",
    title: "Wir bereiten etwas",
    accent: "ganz Besonderes vor.",
    body: "Casa da Buganvília öffnet bald ihre digitalen Türen. Entdecken Sie dann eine einzigartige Auswahl an Kunst, Genuss und Dingen voller Geschichte — direkt aus dem Herzen von Óbidos.",
    status: "Website im Aufbau",
    note: "Bis bald",
  },
  zh: {
    eyebrow: "全新体验，静待花开",
    title: "我们正在精心准备",
    accent: "一份特别的惊喜。",
    body: "Casa da Buganvília 即将在线启幕。来自奥比杜什中心的艺术、美食与承载故事的独特物件，很快将与您见面。",
    status: "网站建设中",
    note: "敬请期待",
  },
  ja: {
    eyebrow: "新しい体験が、もうすぐ花開きます",
    title: "心を込めて、特別な場所を",
    accent: "準備しています。",
    body: "Casa da Buganvília のオンラインストアはまもなくオープンします。オビドスの中心から、アートや味わい、物語のある品々をお届けします。",
    status: "サイト準備中",
    note: "もうしばらくお待ちください",
  },
} as const;

type SupportedLocale = keyof typeof copy;

export default function ComingSoon({ locale }: { locale: string }) {
  const text = copy[locale as SupportedLocale] ?? copy.en;

  return (
    <main className="coming-soon">
      <div className="coming-soon__wash" aria-hidden="true" />
      <div className="coming-soon__grain" aria-hidden="true" />

      {["left", "right"].map((side) => (
        <svg
          key={side}
          className={`coming-soon__vine coming-soon__vine--${side}`}
          viewBox="0 0 260 760"
          aria-hidden="true"
        >
          <path d="M18 760C35 622 174 615 99 477S26 243 205 0" />
          <path d="M91 486c67-37 105-30 145-5M77 354C22 328 7 282 3 239M113 171c53 2 89-20 125-65" />
          <g>
            <ellipse cx="87" cy="558" rx="34" ry="13" transform="rotate(-30 87 558)" />
            <ellipse cx="138" cy="444" rx="31" ry="12" transform="rotate(27 138 444)" />
            <ellipse cx="46" cy="329" rx="30" ry="12" transform="rotate(36 46 329)" />
            <ellipse cx="140" cy="146" rx="34" ry="13" transform="rotate(-18 140 146)" />
          </g>
          <g className="coming-soon__flowers">
            <circle cx="112" cy="476" r="22" />
            <circle cx="91" cy="466" r="18" />
            <circle cx="102" cy="446" r="17" />
            <circle cx="129" cy="449" r="19" />
            <circle cx="134" cy="218" r="20" />
            <circle cx="113" cy="207" r="17" />
            <circle cx="125" cy="187" r="18" />
            <circle cx="151" cy="195" r="16" />
          </g>
        </svg>
      ))}

      <section className="coming-soon__card">
        <div className="coming-soon__logo">
          <Image
            src="/logo-original.jpg"
            alt="Casa da Buganvília"
            width={250}
            height={250}
            priority
          />
        </div>

        <div className="coming-soon__status">
          <span aria-hidden="true" />
          {text.status}
        </div>

        <p className="coming-soon__eyebrow">
          <Sparkles size={14} strokeWidth={1.5} aria-hidden="true" />
          {text.eyebrow}
        </p>

        <h1>
          {text.title}
          <em>{text.accent}</em>
        </h1>

        <div className="coming-soon__divider" aria-hidden="true">
          <span />
          <i>✦</i>
          <span />
        </div>

        <p className="coming-soon__body">{text.body}</p>

        <div className="coming-soon__location">
          <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
          <span>Óbidos, Portugal</span>
        </div>

        <p className="coming-soon__signoff">{text.note}</p>
      </section>
    </main>
  );
}
