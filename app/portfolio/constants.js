import {
  FaChartLine,
  FaCode,
  FaDatabase,
  FaHotel,
  FaJs,
  FaLeaf,
  FaMapMarkedAlt,
  FaReact,
  FaSolarPanel,
} from "react-icons/fa";
import { MdAnimation } from "react-icons/md";
import {
  SiLeaflet,
  SiNextdotjs,
  SiReactquery,
  SiSupabase,
} from "react-icons/si";

export const projects = [
  {
    id: 1,
    title: "The Wild Oasis - Customer App",
    description:
      "A comprehensive hotel reservation system where customers can browse cabins, make reservations, and manage their bookings with authentication.",
    github: "https://github.com/talhaceliktas/the-wild-oasis-website",
    live: "#",
    tags: ["Next.js", "NextAuth", "React", "Responsive"],
    features: [
      "Browse Cabins",
      "Make Reservations",
      "User Authentication",
      "Profile Management",
    ],
    icon: <FaHotel className="text-3xl" />,
    gradient: "from-blue-500 to-purple-600",
    techIcons: [
      <SiNextdotjs key="next" />,
      <FaReact key="react" />,
      <SiSupabase key="supabase" />,
    ],
  },
  {
    id: 2,
    title: "The Wild Oasis - Admin Panel",
    description:
      "Full-featured admin dashboard for hotel staff to manage cabins, reservations, guests with comprehensive analytics and reporting.",
    github: "https://github.com/talhaceliktas/the-wild-oasis",
    live: "#",
    tags: ["React", "Supabase", "React Query", "Dashboard"],
    features: [
      "Dashboard Analytics",
      "Cabin Management",
      "Reservation Control",
      "Guest Management",
    ],
    icon: <FaChartLine className="text-3xl" />,
    gradient: "from-green-500 to-teal-600",
    techIcons: [
      <FaReact key="react" />,
      <SiSupabase key="supabase" />,
      <SiReactquery key="query" />,
    ],
  },
  {
    id: 3,
    title: "WorldWise - Travel Tracker",
    description:
      "Interactive React application for marking visited cities on a map with personal notes and travel tracking capabilities.",
    github: "https://github.com/talhaceliktas/world-wise",
    live: "#",
    tags: ["React", "Leaflet.js", "Context API", "Interactive Maps"],
    features: [
      "Interactive Mapping",
      "City Tracking",
      "Personal Notes",
      "Travel Visualization",
    ],
    icon: <FaMapMarkedAlt className="text-3xl" />,
    gradient: "from-orange-500 to-red-600",
    techIcons: [
      <FaReact key="react" />,
      <SiLeaflet key="leaflet" />,
      <FaDatabase key="context" />,
    ],
  },
  {
    id: 4,
    title: "Green Energy Inventory",
    description:
      "Solar energy potential analysis tool for buildings in Turkey, calculating ROI and promoting sustainable energy transition.",
    github: "https://github.com/talhaceliktas/yesil-enerji-envanteri-web",
    live: "#",
    tags: ["Web Analytics", "Solar Energy", "Sustainability", "ROI Calculator"],
    features: [
      "Roof Analysis",
      "ROI Calculation",
      "Energy Visualization",
      "Sustainability Metrics",
    ],
    icon: <FaSolarPanel className="text-3xl" />,
    gradient: "from-yellow-500 to-green-600",
    techIcons: [
      <FaReact key="react" />,
      <FaChartLine key="analytics" />,
      <FaLeaf key="green" />,
    ],
  },
];

export const certificates = [
  {
    id: 1,
    title: "The Ultimate React Course",
    issuer: "Udemy",
    date: "2025",
    icon: <FaReact className="text-2xl" />,
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: 2,
    title: "Coding & Programming Course",
    issuer: "Samsung Inovation Campus",
    date: "2025",
    icon: <FaCode className="text-2xl" />,
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 3,
    title: "Modern JavaScript ES6+",
    issuer: "JavaScript Academy",
    date: "2024",
    icon: <FaJs className="text-2xl" />,
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: 4,
    title: "GSAP 3 Express",
    issuer: "Creative Coding Club",
    date: "2025",
    icon: <MdAnimation className="text-2xl" />,
    color: "from-green-400 to-teal-500",
  },
];
