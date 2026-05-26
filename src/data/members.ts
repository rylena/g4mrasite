export type Member = {
  username: string;
  group: "Leader" | "Players";
  role: string;
  bio: string;
  specialties: string[];
  image?: string;
  links: {
    type: "github" | "linkedin" | "medium" | "blog" | "website" | "flagyard" | "hackthebox";
    label: string;
    href: string;
  }[];
  palette: "ember" | "signal" | "mint" | "violet" | "sand" | "red";
};

export const members: Member[] = [
  {
    username: "Z4 f a r a n",
    group: "Leader",
    role: "leader / strategy",
    bio: "Leads G4mra's event planning, live CTF calls, and practice direction so the team keeps pressure on the right targets.",
    specialties: ["ctf strategy", "web", "team ops"],
    links: [{ type: "github", label: "GitHub", href: "https://github.com/Z4faran" }],
    palette: "ember",
  },
  {
    username: "ʏᴏͫᴜͬꜱᴇꜰ ×͜×",
    group: "Players",
    role: "player / CTF",
    bio: "CTF player focused on practical challenge flow, profile tracking, and turning solves into repeatable technique.",
    specialties: ["ctf", "web", "recon"],
    image: "./assets/members/yousef.png",
    links: [
      { type: "flagyard", label: "Flagyard", href: "https://flagyard.com/profile/SiR_YoUsEf/overview" },
      { type: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/meymt/" },
    ],
    palette: "violet",
  },
  {
    username: "QA210",
    group: "Players",
    role: "player / pwn",
    bio: "A 10th-grade high school student from Vietnam with a passion for offensive security. Specializes in binary exploitation, Active Directory attack chains, and Windows/Linux kernel research.",
    specialties: ["pwn", "AD", "kernel"],
    image: "./assets/members/qa210.png",
    links: [{ type: "blog", label: "Blog", href: "https://yuri08-qa210.github.io/" }],
    palette: "sand",
  },
  {
    username: "khaled1hunter",
    group: "Players",
    role: "player / AD",
    bio: "Offensive security player working across machine exploitation, web attacks, and Active Directory paths.",
    specialties: ["machine", "web", "AD"],
    image: "./assets/members/khaled1hunter.png",
    links: [
      { type: "github", label: "GitHub", href: "https://github.com/khaledahmedmossad" },
      { type: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/khaled-ahmed-mossad-42377533a" },
    ],
    palette: "ember",
  },
  {
    username: "0xIiZa3iiM.",
    group: "Players",
    role: "iiZa3iiM.xyz / web",
    bio: "Cybersecurity researcher and web developer specializing in vulnerability hunting and CTF competitions, driven by complex problem-solving and technical innovation.",
    specialties: ["web", "bug hunting", "ctf"],
    image: "./assets/members/iiza3iim.png",
    links: [{ type: "website", label: "Website", href: "https://iiZa3iiM.xyz" }],
    palette: "signal",
  },
  {
    username: "Ms.jix",
    group: "Players",
    role: "player / web + crypto",
    bio: "Web and crypto CTF player who publishes notes, tests solve ideas carefully, and keeps research moving from rough idea to working exploit.",
    specialties: ["web", "crypto", "writeups"],
    image: "./assets/members/ms-jix.png",
    links: [
      { type: "medium", label: "Medium", href: "https://medium.com/@Ms.jix" },
      { type: "github", label: "GitHub", href: "https://github.com/jihanel-khouly" },
    ],
    palette: "violet",
  },
  {
    username: "RylenAnil",
    group: "Players",
    role: "player / rev + web + pwn",
    bio: "Hi, I'm Rylen. I'm 16, I love movies and computers, and I work across reversing, web exploitation, and pwn.",
    specialties: ["rev", "web", "pwn"],
    image: "./assets/members/rylen-anil.png",
    links: [
      { type: "website", label: "Portfolio", href: "https://rylena.github.io/PortfolioWebsite/" },
      { type: "github", label: "GitHub", href: "https://github.com/rylena" },
    ],
    palette: "mint",
  },
  {
    username: "amrk",
    group: "Players",
    role: "player / web + mobile",
    bio: "Information Security senior specializing in offensive security, web exploitation, and hunting complex business logic vulnerabilities. Bridges CTF attack thinking with secure backend microservice design.",
    specialties: ["web", "mobile", "logic bugs"],
    image: "./assets/members/amrk.png",
    links: [{ type: "github", label: "GitHub", href: "https://github.com/maro826g" }],
    palette: "signal",
  },
  {
    username: "Maryam Mohsen",
    group: "Players",
    role: "player / reverse",
    bio: "Computer science student passionate about cybersecurity and reverse engineering.",
    specialties: ["reverse", "cybersecurity", "cs"],
    image: "./assets/members/maryam-mohsen.png",
    links: [
      { type: "github", label: "GitHub", href: "https://github.com/Maryam-Mohsen" },
      { type: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/maryammohsen-" },
    ],
    palette: "sand",
  },
  {
    username: "0xcraches",
    group: "Players",
    role: "player / AD + C2",
    bio: "Pentest-focused player working through Active Directory, C2 tradecraft, evasion, network pentesting, and web pentest paths.",
    specialties: ["AD", "C2", "evasion"],
    image: "./assets/members/0xcraches.png",
    links: [
      { type: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/mohamed-soliman-ba6468256/" },
      { type: "hackthebox", label: "Hack The Box", href: "https://app.hackthebox.com/users/2230447" },
    ],
    palette: "red",
  },
  {
    username: "B A R A A",
    group: "Players",
    role: "player / mobile + web",
    bio: "Mobile, web, and crypto player who writes about attack paths and keeps a practical blog of security notes.",
    specialties: ["mobile", "web", "crypto"],
    image: "./assets/members/baraa.png",
    links: [{ type: "blog", label: "Blog", href: "https://0xb4raa.hashnode.dev/" }],
    palette: "ember",
  },
];
