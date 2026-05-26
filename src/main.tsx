import { useEffect, useLayoutEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelAvatar } from "./components/PixelAvatar";
import { links } from "./data/links";
import { members } from "./data/members";
import type { Member } from "./data/members";
import {
  ctftimeGeneratedAt,
  rankings,
  ratingSnapshot,
  teamProfile,
  upcomingEvents,
} from "./data/ctftime.generated";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  ["home", "home"],
  ["rankings", "rankings"],
  ["certs", "certifications"],
  ["members", "members"],
  ["about", "about"],
] as const;

type TeamCertification = {
  name: string;
  issuer: string;
  domain: string;
  image?: string;
  transparentBg?: boolean;
};

const teamCertifications: TeamCertification[] = [
  { name: "OSCP", issuer: "OffSec", domain: "Pentest", image: "./assets/certs/oscp.png" },
  { name: "OSEP", issuer: "OffSec", domain: "Evasion", image: "./assets/certs/osep.png" },
  { name: "OSED", issuer: "OffSec", domain: "Exploit Dev", image: "./assets/certs/osed.png" },
  { name: "CRTE", issuer: "Altered Sec", domain: "Enterprise AD", image: "./assets/certs/crte.png", transparentBg: true },
  { name: "CEH Master", issuer: "EC-Council", domain: "Red Team", image: "./assets/certs/ceh-master.png", transparentBg: true },
  { name: "CISSP", issuer: "ISC2", domain: "Security", image: "./assets/certs/cissp.png" },
  { name: "eCPTX", issuer: "INE", domain: "Advanced Pentest", image: "./assets/certs/ecptx.png", transparentBg: true },
  { name: "GPEN", issuer: "GIAC", domain: "Pentest", image: "./assets/certs/gpen.png" },
  { name: "CPTS", issuer: "HTB", domain: "Practical Pentest", image: "./assets/certs/cpts.png" },
  { name: "PT1", issuer: "TCM", domain: "Pentest", image: "./assets/certs/pt1.png", transparentBg: true },
  { name: "eMAPT", issuer: "INE", domain: "Mobile Apps", image: "./assets/certs/emapt.png" },
  { name: "eWAPTX", issuer: "INE", domain: "Web Apps", image: "./assets/certs/ewaptx.png" },
];

const memberGroups: Member["group"][] = ["Leader", "Players"];

function ConsoleSignal() {
  useEffect(() => {
    const ascii = String.raw`
                 .       *          .        )
       *              .        .          (      *
             .          .                ) )
                    .        .          ( (       .
             ___---___              .    ) )
          .-'         '-.              .( (
        .'   /\   /\     '.             ) )
       /   _/  \_/  \_     \        .-'~~~'-.
      |   /  /\   /\  \     |      /  .   .  \
      |  |__/  \_/  \__|    |     |  /|   |\  |
       \     \  |  /       /       \   \_/   /
        '.    \ | /     .'          '-.___.-'
          '-.__\|/___.-'        ____  _||_  ____
              \|||/            /____\/____\/____\
             __|||__             //  G4mra  \\
            /_/ | \_\           //___________\\
              / | \
             /__|__\
`;

    console.log(`%c${ascii}`, "color:#ff6b00;font-weight:900;");
    console.log(
      `%cApply: ${links.apply}`,
      "color:#00ff88;font-weight:900;",
    );
  }, []);

  return null;
}

function Stats() {
  const stats = [
    ["global", ratingSnapshot.globalRank],
    ["local", ratingSnapshot.localRank],
    ["rating", ratingSnapshot.ratingPoints],
    ["events", String(rankings.length)],
  ];

  return (
    <div className="stats-grid" aria-label="CTFtime stats">
      {stats.map(([label, value]) => (
        <div className="stat-card pixel-box js-decrypt-card" key={label}>
          <span className="stat-num js-decrypt" data-value={value}>
            {"█".repeat(Math.max(value.length, 3))}
          </span>
          <span className="stat-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

function UpcomingEvents() {
  if (!upcomingEvents.length) return null;

  return (
    <div className="upcoming-panel pixel-box-fire js-decrypt-card" aria-label="Planned CTFtime events">
      <div className="upcoming-head">
        <span>planned events</span>
        <span>{upcomingEvents.length} queued</span>
      </div>
      <div className="upcoming-list">
        {upcomingEvents.map((event) => (
          <a className="upcoming-event" href={event.href} target="_blank" rel="noreferrer" key={event.href}>
            <strong>{event.name}</strong>
            <span>{event.date}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function RankBadge({ place }: { place: number }) {
  const className =
    place <= 3 ? "rank-badge rank-gold" : place <= 20 ? "rank-badge rank-fire" : "rank-badge";

  return <span className={className}>#{place}</span>;
}

type IconType = "discord" | Member["links"][number]["type"];

function SocialIcon({ type }: { type: IconType }) {
  if (type === "discord") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M8.2 8.6c1.1-.5 2.2-.7 3.8-.7s2.8.2 3.8.7l.3-.7c1.6.3 2.8.9 3.8 1.8.2 3 .1 5.7-1.3 8.1-1.3 1-2.6 1.5-4.1 1.8l-.9-1.5c.5-.2 1-.4 1.5-.7-1 .4-2 .6-3.1.6s-2.1-.2-3.1-.6c.5.3 1 .5 1.5.7l-.9 1.5c-1.5-.3-2.8-.9-4.1-1.8-1.4-2.4-1.5-5.1-1.3-8.1 1-.9 2.2-1.5 3.8-1.8l.4.7Zm1.7 6.3c.7 0 1.3-.7 1.3-1.5s-.6-1.5-1.3-1.5-1.3.7-1.3 1.5.6 1.5 1.3 1.5Zm4.2 0c.7 0 1.3-.7 1.3-1.5s-.6-1.5-1.3-1.5-1.3.7-1.3 1.5.6 1.5 1.3 1.5Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5.2 8.8h3.3v10H5.2v-10Zm1.7-4.7c1 0 1.8.8 1.8 1.7s-.8 1.7-1.8 1.7-1.8-.8-1.8-1.7.8-1.7 1.8-1.7Zm3.8 4.7h3.1v1.4h.1c.4-.8 1.5-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.8v5.5h-3.3v-4.9c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6v5h-3.3v-10Z" />
    </svg>
  );
}

function MemberLinkIcon({ type }: { type: Member["links"][number]["type"] }) {
  if (type === "github") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 .9C5.9.9 1 5.8 1 11.9c0 4.8 3.1 8.9 7.4 10.4.6.1.8-.2.8-.5v-2c-3 .7-3.6-1.3-3.6-1.3-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.8 2.1 3 1.5.1-.7.4-1.2.7-1.5-2.4-.3-5-1.2-5-5.4 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3 0 0 .9-.3 3 1.1.9-.2 1.8-.4 2.8-.4s1.9.1 2.8.4c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.7.1 3 .7.8 1.1 1.8 1.1 3 0 4.2-2.6 5.1-5 5.4.4.4.8 1.1.8 2.2v3.2c0 .3.2.6.8.5 4.3-1.5 7.4-5.6 7.4-10.4C23 5.8 18.1.9 12 .9Z" />
      </svg>
    );
  }

  if (type === "medium") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4.5 7.2c0-.4-.1-.7-.4-1L2.8 4.6v-.2h5.1l3.9 8.5 3.4-8.5H20v.2l-1.1 1.1c-.1.1-.2.3-.2.5v11.6c0 .2.1.4.2.5l1.1 1.1v.2h-6.2v-.2l1.1-1.1c.1-.1.1-.2.1-.5V8.5l-4.6 11.1h-.5L4.6 8.5v7.9c0 .3.1.7.4.9l1.5 1.9v.2H2.3v-.2l1.5-1.9c.3-.3.4-.6.4-.9V7.2Z" />
      </svg>
    );
  }

  if (type === "hackthebox") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 1.5 3.1 6.6v10.8l8.9 5.1 8.9-5.1V6.6L12 1.5Zm0 2.8 6.5 3.8v7.8L12 19.7l-6.5-3.8V8.1L12 4.3Zm-3.3 4.2h2.2v2.4h2.2V8.5h2.2v7h-2.2v-2.6h-2.2v2.6H8.7v-7Z" />
      </svg>
    );
  }

  if (type === "flagyard") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M5 3h2v18H5V3Zm4 1h9l-1.5 4L18 12H9V4Z" />
      </svg>
    );
  }

  if (type === "blog") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4 4h13l3 3v13H4V4Zm3 4h8V6H7v2Zm0 4h10v-2H7v2Zm0 4h7v-2H7v2Z" />
      </svg>
    );
  }

  if (type === "website") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.5 9h-3.1a16.7 16.7 0 0 0-1.2-5 8.1 8.1 0 0 1 4.3 5ZM12 4.1c.6.8 1.3 2.4 1.6 4.9h-3.2c.3-2.5 1-4.1 1.6-4.9ZM4.3 13h3.1c.1 1.8.5 3.5 1.2 5a8.1 8.1 0 0 1-4.3-5Zm3.1-2H4.3a8.1 8.1 0 0 1 4.3-5 16.7 16.7 0 0 0-1.2 5Zm4.6 8.9c-.6-.8-1.3-2.4-1.6-4.9h3.2c-.3 2.5-1 4.1-1.6 4.9Zm1.9-6.9h-3.8a15.9 15.9 0 0 1 0-2h3.8a15.9 15.9 0 0 1 0 2Zm1.5 5c.7-1.5 1.1-3.2 1.2-5h3.1a8.1 8.1 0 0 1-4.3 5Z" />
      </svg>
    );
  }

  return <SocialIcon type="linkedin" />;
}

function MemberPortrait({ member, large = false }: { member: Member; large?: boolean }) {
  if (!member.image) return <PixelAvatar member={member} />;

  return (
    <div className={`member-photo${large ? " member-photo-large" : ""}`}>
      <img src={member.image} alt={`${member.username} profile`} loading="lazy" />
    </div>
  );
}

function MemberLinks({ member, profile = false }: { member: Member; profile?: boolean }) {
  if (!member.links.length) return null;

  return (
    <div className={profile ? "profile-links" : "member-links"} aria-label={`${member.username} links`}>
      {member.links.map((link) => (
        <a className="member-link" href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} title={link.label} key={`${member.username}-${link.href}`}>
          <MemberLinkIcon type={link.type} />
        </a>
      ))}
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="social-links" aria-label="Social links">
      <a className="icon-link" href={links.discord} target="_blank" rel="noreferrer" aria-label="Discord">
        <SocialIcon type="discord" />
      </a>
      <a className="icon-link" href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <SocialIcon type="linkedin" />
      </a>
    </div>
  );
}

function CertificationMarquee() {
  return (
    <div className="cert-panel pixel-box-fire js-decrypt-card" aria-label="Team certifications">
      <div className="cert-panel-head">
        <span>team certifications</span>
        <span>credential stack</span>
      </div>
      <div className="cert-marquee">
        <div className="cert-track">
          {[0, 1].map((group) => (
            <div className="cert-group" aria-hidden={group === 1} key={group}>
              {teamCertifications.map((cert) => (
                <article
                  className={`cert-badge${cert.name.length > 5 ? " cert-badge-long" : ""}${cert.image ? " cert-badge-image" : ""}${cert.transparentBg ? " cert-badge-clean" : ""}`}
                  key={`${group}-${cert.name}`}
                  aria-label={`${cert.name} certification badge`}
                >
                  {cert.image ? (
                    <>
                      <img src={cert.image} alt={`${cert.name} certification badge`} />
                      <span className="cert-image-label">{cert.name}</span>
                    </>
                  ) : (
                    <>
                      <span className="cert-badge-rank">certified</span>
                      <strong className="cert-badge-mark">{cert.name}</strong>
                      <span className="cert-badge-issuer">{cert.issuer}</span>
                      <span className="cert-badge-domain">{cert.domain}</span>
                    </>
                  )}
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MemberProfileModal({ member, onClose }: { member: Member; onClose: () => void }) {
  return (
    <div className="profile-overlay" role="dialog" aria-modal="true" aria-labelledby="member-profile-title">
      <button className="profile-backdrop" type="button" aria-label="Close member profile" onClick={onClose} />
      <article className="profile-card pixel-box-fire">
        <button className="profile-close" type="button" onClick={onClose} aria-label="Close member profile">
          x
        </button>
        <div className="profile-grid">
          <div className="profile-visual">
            <div className="profile-image">
              <MemberPortrait member={member} large />
              <span>{member.group}</span>
            </div>
          </div>
          <div className="profile-copy">
            <p className="terminal-kicker">./profile --open</p>
            <h3 id="member-profile-title">{member.username}</h3>
            <p className="profile-role">{member.role}</p>
            <p>{member.bio}</p>
            <div className="profile-specialties" aria-label="Member specialties">
              {member.specialties.map((specialty) => (
                <span className="tag" key={`${member.username}-${specialty}`}>
                  {specialty}
                </span>
              ))}
            </div>
            <MemberLinks member={member} profile />
          </div>
        </div>
      </article>
    </div>
  );
}

function App() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const bestPlacement = rankings.length ? Math.min(...rankings.map((ranking) => ranking.place)) : 0;
  const generatedDate = ctftimeGeneratedAt.slice(0, 10);

  useEffect(() => {
    if (!selectedMember) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedMember(null);
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedMember]);

  useLayoutEffect(() => {
    const encrypted = "01#$%&*ABCDEFGHJKLMNPQRSTUVWXYZ";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const decryptNode = (node: Element) => {
      const value = node.getAttribute("data-value") ?? "";
      if (!value) return;

      if (reduceMotion) {
        node.textContent = value;
        return;
      }

      let frame = 0;
      const totalFrames = 18;
      const interval = window.setInterval(() => {
        node.textContent = value
          .split("")
          .map((char, index) => {
            if (char === "." || char === "#") return char;
            return index < Math.floor((frame / totalFrames) * value.length)
              ? char
              : encrypted[Math.floor(Math.random() * encrypted.length)];
          })
          .join("");

        frame += 1;
        if (frame > totalFrames) {
          window.clearInterval(interval);
          node.textContent = value;
        }
      }, 42);
    };

    const context = gsap.context(() => {
      gsap.from(".site-header", {
        y: -34,
        opacity: 0,
        duration: 0.45,
        ease: "steps(6)",
      });

      gsap.from(".logo-stage", {
        x: -48,
        opacity: 0.2,
        duration: 0.65,
        ease: "steps(8)",
      });

      gsap.from(".hero-copy > *", {
        x: 34,
        opacity: 0.35,
        duration: 0.5,
        stagger: 0.07,
        ease: "steps(8)",
      });

      gsap.utils.toArray<HTMLElement>(".js-decrypt-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 34, opacity: 0, filter: "brightness(0.55)" },
          {
            y: 0,
            opacity: 1,
            filter: "brightness(1)",
            duration: 0.45,
            ease: "steps(8)",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              once: true,
              onEnter: () => {
                const number = card.querySelector(".js-decrypt");
                if (number) decryptNode(number);
              },
            },
          },
        );
      });

      gsap.from(".rank-row:not(.rank-head)", {
        y: 18,
        opacity: 0,
        duration: 0.42,
        stagger: 0.025,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".rank-table",
          start: "top 88%",
          once: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".upcoming-event, .member-card, .about-card, .join-cta").forEach((item) => {
        gsap.from(item, {
          x: -18,
          opacity: 0,
          duration: 0.38,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 92%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".section-title").forEach((title) => {
        gsap.from(title, {
          clipPath: "inset(0 100% 0 0)",
          duration: 0.55,
          ease: "steps(10)",
          scrollTrigger: {
            trigger: title,
            start: "top 86%",
            once: true,
          },
        });
      });
    });

    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    const scrollToHash = () => {
      const target = window.location.hash.slice(1);
      if (!target) return;
      document.getElementById(target)?.scrollIntoView({ block: "start" });
    };

    scrollToHash();
    const timers = [
      window.setTimeout(scrollToHash, 80),
      window.setTimeout(scrollToHash, 320),
      window.setTimeout(scrollToHash, 900),
    ];
    window.addEventListener("load", scrollToHash);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("load", scrollToHash);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <>
      <ConsoleSignal />
      <div className="stars" aria-hidden="true" />
      <div className="site-shell">
        <header className="site-header">
          <a className="nav-logo" href="#home" aria-label="G4mra home">
            <img src="./assets/g4mra-logo.png" alt="" />
            <span>G4mra</span>
          </a>
          <nav className="site-nav" aria-label="Main navigation">
            {navItems.map(([label, target]) => (
              <a href={`#${target}`} key={target}>
                {label}
              </a>
            ))}
            <a href={links.apply} target="_blank" rel="noreferrer">
              apply
            </a>
            <SocialLinks />
          </nav>
        </header>

        <main>
          <section className="section hero-section" id="home">
            <div className="section-inner">
              <div className="hero-grid">
                <div className="logo-stage pixel-box-fire">
                  <img src="./assets/g4mra-logo.png" alt="G4mra pixel campfire logo" />
                  <span className="pixel-particle p1" />
                  <span className="pixel-particle p2" />
                  <span className="pixel-particle p3" />
                  <span className="pixel-particle p4" />
                </div>

                <div className="hero-copy">
                  <p className="terminal-kicker">./g4mra --status active</p>
                  <h1>{teamProfile.name.toUpperCase()}</h1>
                  <p className="hero-sub">late nights / clean solves / quiet pressure</p>
                  <div className="tag-row">
                    <span className="ctf-badge">CTFTIME #{ratingSnapshot.globalRank}</span>
                    <span className="ctf-badge">LOCAL #{ratingSnapshot.localRank}</span>
                    <span className="ctf-badge">RATING {ratingSnapshot.ratingPoints}</span>
                  </div>
                  <div className="hero-actions">
                    <a className="pixel-button" href="#rankings">
                      rankings
                    </a>
                    <a className="pixel-button pixel-button-ghost" href={links.apply} target="_blank" rel="noreferrer">
                      apply
                    </a>
                  </div>
                </div>
              </div>
              <Stats />
            </div>
          </section>

          <div className="px-divider" />

          <section className="section" id="rankings">
            <div className="section-inner">
              <h2 className="section-title">Rankings</h2>
              <div className="rank-summary">
                <div className="ranking-stat pixel-box js-decrypt-card">
                  <span className="big-num js-decrypt" data-value={`#${bestPlacement}`}>
                    ###
                  </span>
                  <span>best placement</span>
                </div>
                <div className="ranking-stat pixel-box-fire js-decrypt-card">
                  <span className="big-num js-decrypt" data-value={rankings.length}>
                    ███
                  </span>
                  <span>tracked events</span>
                </div>
                <div className="ranking-stat pixel-box js-decrypt-card">
                  <span className="big-num js-decrypt" data-value={ratingSnapshot.ratingPoints}>
                    ███.███
                  </span>
                  <span>rating pts</span>
                </div>
              </div>

              <UpcomingEvents />

              <div className="rank-table pixel-box">
                <div className="rank-row rank-head">
                  <span>place</span>
                  <span>event</span>
                  <span>ctf pts</span>
                  <span>rating</span>
                  <span>year</span>
                </div>
                {rankings.map((ranking) => (
                  <a className="rank-row" href={ranking.href} target="_blank" rel="noreferrer" key={ranking.event}>
                    <span>
                      <RankBadge place={ranking.place} />
                    </span>
                    <strong>{ranking.event}</strong>
                    <span>{ranking.points}</span>
                    <span>{ranking.rating}</span>
                    <span>{ranking.year}</span>
                  </a>
                ))}
              </div>

              <p className="source-line">
                DATA PULLED FROM CTFTIME ON {generatedDate}. SOURCE LINK:{" "}
                <a href={links.ctftime} target="_blank" rel="noreferrer">
                  ctftime.org/team/424985
                </a>
              </p>
            </div>
          </section>

          <div className="px-divider" />

          <section className="section cert-section" id="certifications">
            <div className="section-inner">
              <h2 className="section-title">Certifications</h2>
              <p className="section-note">
                Team credential coverage across offensive security, exploit development, red team operations, and governance.
              </p>
              <CertificationMarquee />
            </div>
          </section>

          <div className="px-divider" />

          <section className="section" id="members">
            <div className="section-inner">
              <h2 className="section-title">Members</h2>
              <p className="section-note">
                Select a profile to view role notes, specialties, and links.
              </p>
              <div className="member-roster">
                {memberGroups.map((group) => (
                  <div className="member-group" key={group}>
                    <div className="member-group-head">
                      <h3>{group}</h3>
                      <span>{members.filter((member) => member.group === group).length}</span>
                    </div>
                    <div className="member-grid">
                      {members
                        .filter((member) => member.group === group)
                        .map((member) => (
                          <article className="member-card pixel-box" key={member.username}>
                            <button className="member-open" type="button" onClick={() => setSelectedMember(member)}>
                              <MemberPortrait member={member} />
                              <h4>{member.username}</h4>
                              <p className="member-role">{member.role}</p>
                              <div className="tag-row">
                                {member.specialties.slice(0, 3).map((specialty) => (
                                  <span className="tag" key={`${member.username}-${specialty}`}>
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            </button>
                            <MemberLinks member={member} />
                          </article>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="px-divider" />

          <section className="section about-section" id="about">
            <div className="section-inner">
              <h2 className="section-title">About</h2>
              <div className="about-grid">
                <article className="about-card pixel-box">
                  <h3>Mission</h3>
                  <p>
                    Practice hard, write things down, keep the team signal clean, and turn every hard challenge into reusable technique.
                  </p>
                </article>
                <article className="about-card pixel-box-fire">
                  <h3>Stack</h3>
                  <ul>
                    <li>web exploitation and source review</li>
                    <li>binary, reversing, crypto, and forensics</li>
                    <li>notes, tooling, infra, and post-CTF cleanup</li>
                  </ul>
                </article>
              </div>
              <div className="join-cta pixel-box">
                <h3>Join the calls</h3>
                <p>Send a clean signal if you want to play, learn, and keep notes with the team.</p>
                <div className="about-actions">
                  <a className="pixel-button" href={links.apply} target="_blank" rel="noreferrer">
                    apply
                  </a>
                  <SocialLinks />
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <img src="./assets/g4mra-logo.png" alt="" />
          <span>G4mra</span>
          <a href={links.ctftime} target="_blank" rel="noreferrer">
            ctftime
          </a>
          <a href={links.apply} target="_blank" rel="noreferrer">
            apply
          </a>
          <SocialLinks />
        </footer>
      </div>
      {selectedMember ? <MemberProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} /> : null}
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
