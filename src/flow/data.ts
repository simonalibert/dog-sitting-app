// Seed data ported from proto.jsx
export type Sitter = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  dist: string;
  verified: boolean;
  x: number;
  y: number;
  big?: boolean;
  avatar: string;
};

// Stable, CDN-hosted demo imagery (works on web export too). Replace with brand assets in production.
export const HERO_DOG = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80&fit=crop';
export const DEFAULT_DOG_PHOTO = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&q=80&fit=crop';
export const WALK_PHOTO = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&q=80&fit=crop';

export type Review = { who: string; stars: number; ago: string; text: string };
export type Details = {
  years: number;
  repeat: string;
  tagline: string;
  attrs: string[];
  bio: string;
  reviews: Review[];
};

export const SITTERS: Sitter[] = [
  { id: 'maya', name: 'Maya R.', rating: 4.9, reviews: 128, price: 18, dist: '0.4 mi', verified: true, x: 118, y: 214, big: true, avatar: 'https://i.pravatar.cc/200?img=5' },
  { id: 'tom', name: 'Tom B.', rating: 4.8, reviews: 96, price: 16, dist: '0.6 mi', verified: true, x: 64, y: 98, avatar: 'https://i.pravatar.cc/200?img=12' },
  { id: 'priya', name: 'Priya K.', rating: 5.0, reviews: 74, price: 20, dist: '0.8 mi', verified: true, x: 198, y: 150, avatar: 'https://i.pravatar.cc/200?img=9' },
  { id: 'leo', name: 'Leo M.', rating: 4.7, reviews: 51, price: 15, dist: '1.1 mi', verified: false, x: 248, y: 252, avatar: 'https://i.pravatar.cc/200?img=15' },
  { id: 'sam', name: 'Sam T.', rating: 4.9, reviews: 60, price: 17, dist: '0.5 mi', verified: true, x: 42, y: 266, avatar: 'https://i.pravatar.cc/200?img=33' },
];

const DETAILS: Record<string, Details> = {
  maya: {
    years: 6,
    repeat: '40+',
    tagline: 'Lifelong dog lover · fenced backyard',
    attrs: ['Fenced yard', 'Non-smoking home', 'Accepts large dogs', 'Pet first-aid trained'],
    bio: "Hi! I'm Maya — I grew up with a houseful of rescue pups and now I get to care for yours. Big backyard, endless belly rubs, and a photo update on every single walk.",
    reviews: [
      { who: 'Jordan P.', stars: 5, ago: '2 weeks ago', text: 'Maya was so patient with our anxious rescue. Tons of photos and a sweet recap afterwards.' },
      { who: 'Aisha L.', stars: 5, ago: '1 month ago', text: 'Reliable, warm, and clearly adored by our dog. Already booked her again!' },
    ],
  },
  priya: {
    years: 4,
    repeat: '25+',
    tagline: 'Vet tech by day · weekend walker',
    attrs: ['Vet tech', 'Handles meds', 'Calm with seniors', 'Sends photo updates'],
    bio: "I'm a veterinary technician who can't get enough dog time on my days off. Comfortable with medication schedules, senior dogs, and the shy ones who need a little extra patience.",
    reviews: [
      { who: 'Marcus T.', stars: 5, ago: '1 week ago', text: 'Knowing a vet tech had our old boy gave us total peace of mind. Wonderful.' },
      { who: 'Bea N.', stars: 5, ago: '3 weeks ago', text: 'Gentle, professional, and so kind. Highly recommend.' },
    ],
  },
};

export function detailsFor(s: Sitter): Details {
  if (DETAILS[s.id]) return DETAILS[s.id];
  const first = s.name.split(' ')[0];
  return {
    years: 3,
    repeat: '15+',
    tagline: 'Verified Simon\'s sitter near you',
    attrs: ['Non-smoking home', 'Accepts all sizes', 'Sends photo updates', 'Flexible hours'],
    bio: `${first} is a verified Simon's sitter who loves spending time with dogs of every size — expect plenty of play, gentle care, and photo updates along the way.`,
    reviews: [
      { who: 'Sam D.', stars: 5, ago: '3 weeks ago', text: `${first} was wonderful — punctual, gentle, and great with our pup.` },
    ],
  };
}

export const DATES = [
  { dow: 'THU', d: 12 }, { dow: 'FRI', d: 13 }, { dow: 'SAT', d: 14 },
  { dow: 'SUN', d: 15 }, { dow: 'MON', d: 16 }, { dow: 'TUE', d: 17 }, { dow: 'WED', d: 18 },
];

export const TIMES = ['8:30 AM', '10:00 AM', '11:30 AM', '1:00 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'];

export const TAGS = ['Playful', 'Calm', 'Anxious with strangers', 'Good with other dogs'];

export type FlowForm = { name: string; breed: string; size: 'Small' | 'Medium' | 'Large'; tags: string[]; photoUri: string | null };
export type Booking = { dow: string; day: number; time: string; duration: 30 | 60; basePrice: number };
