import {
  BadgeCheck,
  Blocks,
  Building2,
  Cable,
  Camera,
  Clock3,
  Cpu,
  DoorOpen,
  Factory,
  Headphones,
  KeyRound,
  Laptop,
  MapPin,
  Network,
  PanelsTopLeft,
  PlugZap,
  ShieldCheck,
  Sofa,
  Sparkles,
  Users,
  Wrench
} from "lucide-react";

import { LucideIcon } from "lucide-react";

export interface Service {
  eyebrow: string;
  title: string;
  slug: string;
  href: string;
  description: string;
  icon: LucideIcon;
  image: string;
  video?: string;
  items: string[];
  metrics: string[];
}

export const siteConfig = {
  name: "Aaden's Business Solutions",
  shortName: "Aaden's",
  url: "https://aadensbusiness.com",
  phone: "+91 8077915694",
  whatsapp: "918077915694",
  email: "hello@aadensbusiness.com",
  address: "Dehradun, Uttarakhand, India",
  hours: "Mon-Sat, 9:30 AM-7:30 PM",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Aadens+Business+Solutions+Dehradun"
};

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Showcase", href: "#showcase" },
  { label: "Projects", href: "#projects" },
  { label: "Quotation", href: "#quotation" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" }
];

export const stats = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Business Clients" },
  { value: 24, suffix: "/7", label: "Technical Support" },
  { value: 12, suffix: "+", label: "Infrastructure Categories" }
];

export const trustPoints = [
  { label: "24/7 Support", icon: Headphones },
  { label: "Enterprise Solutions", icon: Building2 },
  { label: "Smart Security", icon: ShieldCheck },
  { label: "PAN India Service", icon: MapPin }
];

export const services: Service[] = [
  {
    eyebrow: "Service 01",
    title: "Civil Solutions",
    slug: "civil-solutions",
    href: "#services",
    description:
      "Turnkey civil work for offices, retail floors, studios, coaching centres, and commercial buildings across Dehradun.",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    items: ["Office Construction", "Renovation", "Industrial Fabrication", "Interior Execution"],
    metrics: ["Site-ready planning", "Vendor coordination", "Quality checks"]
  },
  {
    eyebrow: "Service 02",
    title: "IT & Electrical",
    slug: "it-electrical-solutions",
    href: "/services/cctv-installation-dehradun",
    description:
      "Secure, scalable technology infrastructure: CCTV, access control, server rooms, fiber, networking, and electrical backbone.",
    icon: Network,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    items: [
      "CCTV Surveillance",
      "Fiber Networking",
      "Server Infrastructure",
      "Access Control",
      "Electrical Infrastructure",
      "Laptop/Desktop Sales"
    ],
    metrics: ["Structured cabling", "Fast deployment", "AMC support"]
  },
  {
    eyebrow: "Service 03",
    title: "Co-working Space",
    slug: "coworking-space",
    href: "/services/coworking-space-dehradun",
    description:
      "Professional workspace solutions for freelancers, agencies, remote teams, and startups looking for a sharp Dehradun base.",
    icon: DoorOpen,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    items: ["Dedicated Desks", "Meeting Rooms", "Fast Internet", "Startup Friendly", "Flexible Plans"],
    metrics: ["Prime work setting", "Meeting-ready", "Scalable seats"]
  }
];

export const expandedServices = [
  { label: "CCTV Installation", icon: Camera },
  { label: "Server Setup", icon: Cpu },
  { label: "Fiber Networking", icon: Cable },
  { label: "Access Control", icon: KeyRound },
  { label: "Networking Infrastructure", icon: Network },
  { label: "Electrical Solutions", icon: PlugZap },
  { label: "Laptop/Desktop Sales", icon: Laptop },
  { label: "Office Interiors", icon: Sofa },
  { label: "Civil Construction", icon: Factory },
  { label: "Renovation", icon: Wrench },
  { label: "Workspace Solutions", icon: PanelsTopLeft },
  { label: "Co-working Space", icon: Users }
];

export const whyChoose = [
  {
    title: "End-to-End Solutions",
    detail: "Civil, IT, electrical, security, and workspace support under one accountable team.",
    icon: Blocks
  },
  {
    title: "Single Vendor Convenience",
    detail: "One site visit, one scope, one project owner, fewer coordination delays.",
    icon: BadgeCheck
  },
  {
    title: "Fast Deployment",
    detail: "Lean execution planning for Dehradun offices that need to open, move, or scale quickly.",
    icon: Clock3
  },
  {
    title: "Technical Expertise",
    detail: "Network diagrams, device planning, server racks, access control, and electrical load awareness.",
    icon: Cpu
  },
  {
    title: "Dedicated Support",
    detail: "Responsive post-installation help for businesses that cannot afford downtime.",
    icon: Headphones
  },
  {
    title: "Scalable Infrastructure",
    detail: "Deployments designed so your team can add seats, cameras, systems, and branches later.",
    icon: Sparkles
  }
];

export interface Project {
  title: string;
  location: string;
  duration: string;
  category: string;
  result: string;
  before: string;
  after: string;
  video?: string;
}

export const projects: Project[] = [
  {
    title: "CCTV Setup for Rajpur Road Office",
    location: "Rajpur Road, Dehradun",
    duration: "3 days",
    category: "Smart Security",
    result: "18-camera IP surveillance with remote viewing and clean concealed routing.",
    before:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=80",
    video: "/videos/cctv-showcase.mp4"
  },
  {
    title: "Fiber Backbone for Commercial Building",
    location: "Saharanpur Road, Dehradun",
    duration: "5 days",
    category: "Fiber Networking",
    result: "Floor-wise fiber distribution, managed switches, and labeled rack termination.",
    before:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    video: "/videos/hero-bg.mp4"
  },
  {
    title: "Co-working Interior Setup",
    location: "Jakhan, Dehradun",
    duration: "21 days",
    category: "Workspace",
    result: "35-seat flexible workspace with meeting room, power planning, and acoustic zones.",
    before:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    video: "/videos/coworking-showcase.mp4"
  },
  {
    title: "Civil Construction & Office Renovation",
    location: "Ballupur, Dehradun",
    duration: "14 days",
    category: "Civil & Interior",
    result: "Turnkey office renovation including industrial fabrication and premium partitions.",
    before:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    video: "/videos/civil-showcase.mp4"
  }
];

export const serviceSlideshowImages = [
  {
    url: "/videos/slideshow/ss1.webp",
    title: "Security Infrastructure",
    description: "Advanced surveillance and monitoring systems.",
    accent: "orange",
    sectionId: "service-security"
  },
  {
    url: "/videos/slideshow/ss2.webp",
    title: "IT Networking",
    description: "Scalable fiber and server deployments.",
    accent: "blue",
    sectionId: "service-it"
  },
  {
    url: "/videos/slideshow/ss3.webp",
    title: "Modern Workspaces",
    description: "Premium office and co-working environments.",
    accent: "blue",
    sectionId: "service-workspace"
  },
  {
    url: "/videos/slideshow/ss4.webp",
    title: "Civil Solutions",
    description: "Expert construction and turnkey interiors.",
    accent: "orange",
    sectionId: "service-civil"
  },
  {
    url: "/videos/slideshow/ss5.webp",
    title: "Project Execution",
    description: "On-site management and delivery.",
    accent: "blue",
    sectionId: "projects"
  },
  {
    url: "/videos/slideshow/ss6.webp",
    title: "Technical Support",
    description: "24/7 infrastructure maintenance.",
    accent: "orange",
    sectionId: "contact"
  },
  {
    url: "/videos/slideshow/ss7.webp",
    title: "Smart Solutions",
    description: "Future-ready business tech.",
    accent: "blue",
    sectionId: "service-it"
  },
  {
    url: "/videos/slideshow/ss8.webp",
    title: "Site Inspection",
    description: "Detailed planning and audit.",
    accent: "orange",
    sectionId: "quotation"
  },
  {
    url: "/videos/slideshow/ss9.webp",
    title: "Final Delivery",
    description: "Quality assured infrastructure.",
    accent: "blue",
    sectionId: "projects"
  }
];

export const processSteps = [
  "Consultation",
  "Site Inspection",
  "Planning & Quotation",
  "Execution",
  "Support & Maintenance"
];

export const testimonials = [
  {
    name: "Rohit Bhandari",
    role: "Director, EduAxis Coaching",
    area: "Dharampur",
    quote:
      "Aaden's handled our CCTV, network cabling, and classroom electrical work before admissions week. The team was fast, neat, and easy to coordinate with.",
    rating: 5
  },
  {
    name: "Megha Rawat",
    role: "Founder, Cafe Paltan Brew",
    area: "Paltan Bazaar",
    quote:
      "We needed cameras, billing counter networking, and minor renovation without closing the cafe for long. Their planning saved us time and repeat work.",
    rating: 5
  },
  {
    name: "Ankit Saini",
    role: "Operations Head, Doon Retail Hub",
    area: "GMS Road",
    quote:
      "The server rack and access control setup looks professional and has been stable from day one. Their support response is the biggest reason we recommend them.",
    rating: 5
  },
  {
    name: "Naina Thapliyal",
    role: "Co-founder, Himalayan Creatives",
    area: "Jakhan",
    quote:
      "Their co-working setup gave our team a premium client-facing address in Dehradun with reliable internet and a proper meeting room.",
    rating: 5
  }
];

export interface SEOPage {
  title: string;
  badge: string;
  description: string;
  services: string[];
  areas: string[];
  image: string;
  video?: string;
  result: string;
}

export const seoPages: Record<string, SEOPage> = {
  "cctv-installation-dehradun": {
    title: "CCTV Installation in Dehradun",
    badge: "Smart Security for Dehradun Businesses",
    description:
      "Premium CCTV installation in Dehradun for offices, cafes, coaching institutes, warehouses, retail stores, and commercial buildings.",
    services: ["IP CCTV Cameras", "DVR/NVR Setup", "Remote Mobile Viewing", "Camera Placement Planning", "AMC Support"],
    areas: ["Rajpur Road", "Dharampur", "Ballupur", "Jakhan", "Saharanpur Road", "Paltan Bazaar"],
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1400&q=80",
    video: "/videos/hero-bg.mp4",
    result: "Secure your premises with clear coverage, clean wiring, and dependable after-installation support."
  },
  "fiber-networking-dehradun": {
    title: "Fiber Networking in Dehradun",
    badge: "High-Speed Commercial Network Infrastructure",
    description:
      "Structured fiber networking, LAN cabling, managed switches, rack setup, and enterprise-grade connectivity for Dehradun offices.",
    services: ["Fiber Laying", "Rack Termination", "LAN Cabling", "Managed Switches", "Network Testing"],
    areas: ["IT Park", "Rajpur Road", "GMS Road", "Prem Nagar", "Saharanpur Road", "Clock Tower"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
    result: "Build a stable network foundation for teams, security devices, servers, and future expansion."
  },
  "office-interior-services-dehradun": {
    title: "Office Interior Services in Dehradun",
    badge: "Civil + Interior Execution for Workplaces",
    description:
      "Office interiors, renovation, workstation planning, electrical coordination, and commercial execution for Dehradun workspaces.",
    services: ["Office Renovation", "Workstation Setup", "False Ceiling", "Lighting & Electrical", "Meeting Room Execution"],
    areas: ["Rajpur Road", "EC Road", "Jakhan", "Ballupur", "Dalanwala", "Race Course"],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    result: "Create a clean, functional, client-ready office with one team handling civil, electrical, and infrastructure needs."
  },
  "coworking-space-dehradun": {
    title: "Co-working Space in Dehradun",
    badge: "Flexible Workspace for Teams and Founders",
    description:
      "Modern co-working space in Dehradun with dedicated desks, meeting rooms, fast internet, and professional business infrastructure.",
    services: ["Dedicated Desks", "Meeting Room", "High-Speed Internet", "Power Backup", "Flexible Plans"],
    areas: ["Jakhan", "Rajpur Road", "Dalanwala", "IT Park", "Ballupur", "Karanpur"],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    result: "Work from a polished, startup-friendly environment built for focus, meetings, and day-to-day business momentum."
  }
} as const;
