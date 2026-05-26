export type Ranking = {
  event: string;
  place: number;
  points: string;
  rating: string;
  year: string;
  type: "finals" | "quals" | "online";
  href: string;
};

export const rankings: Ranking[] = [
  {
    event: "0xV01D CTF 2026",
    place: 3,
    points: "8843.0000",
    rating: "0.000*",
    year: "2026",
    type: "online",
    href: "https://ctftime.org/",
  },
  {
    event: "Kashi CTF 2026",
    place: 16,
    points: "5088.0000",
    rating: "16.060",
    year: "2026",
    type: "online",
    href: "https://ctftime.org/",
  },
  {
    event: "pingCTF 2026",
    place: 21,
    points: "1635.0000",
    rating: "23.994",
    year: "2026",
    type: "online",
    href: "https://ctftime.org/",
  },
  {
    event: "Incognito 7.0",
    place: 31,
    points: "2950.0000",
    rating: "10.113",
    year: "2026",
    type: "online",
    href: "https://ctftime.org/",
  },
  {
    event: "Undutmaning 2026",
    place: 34,
    points: "2236.0000",
    rating: "25.124",
    year: "2026",
    type: "online",
    href: "https://ctftime.org/",
  },
  {
    event: "THCon 2K26 CTF",
    place: 35,
    points: "1849.0000",
    rating: "8.079",
    year: "2026",
    type: "online",
    href: "https://ctftime.org/",
  },
  {
    event: "UMDCTF 2026",
    place: 35,
    points: "1915.0000",
    rating: "42.504",
    year: "2026",
    type: "online",
    href: "https://ctftime.org/",
  },
  {
    event: "BlueHens CTF 2026",
    place: 40,
    points: "2030.0000",
    rating: "21.271",
    year: "2026",
    type: "online",
    href: "https://ctftime.org/",
  },
];

export const ratingSnapshot = {
  globalRank: "82",
  localRank: "3",
  ratingPoints: "306.320",
  source: "ctftime.org/team/424985",
  sourceHref: "https://ctftime.org/team/424985",
};
