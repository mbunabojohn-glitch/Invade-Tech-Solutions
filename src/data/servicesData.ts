import { Wrench, ShoppingCart, GraduationCap, Cloud, Users } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: typeof Wrench;
  image?: string;
  features?: string[];
}

export const services: Service[] = [
  {
    id: "it-hardware-support",
    title: "IT and Hardware Support",
    shortTitle: "IT & Hardware Support",
    description:
      "Comprehensive IT infrastructure management and hardware maintenance services to keep your business running smoothly 24/7.",
    icon: Wrench,
    image: "/images/it-support.jpg",
    features: [
      "Network setup and maintenance",
      "Server management and monitoring",
      "Hardware installation and repairs",
      "System troubleshooting and diagnostics",
      "Remote and on-site technical support",
      "24/7 helpdesk services",
    ],
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    shortTitle: "Cloud Infrastructure",
    description:
      "Scalable cloud solutions and infrastructure services to modernize your business operations and enhance data accessibility.",
    icon: Cloud,
    image: "/images/cloud-solutions.jpg",
    features: [
      "Cloud migration and deployment",
      "Infrastructure as a Service (IaaS)",
      "Cloud storage solutions",
      "Disaster recovery and backup",
      "Cloud security management",
      "Multi-cloud strategy consulting",
    ],
  },
  {
    id: "hardware-procurement",
    title: "Procurement of Hardware",
    shortTitle: "Hardware Procurement",
    description:
      "Strategic sourcing and procurement of quality IT hardware and equipment tailored to your business needs and budget.",
    icon: ShoppingCart,
    image: "/images/procurement.jpg",
    features: [
      "Vendor sourcing and negotiation",
      "Quality hardware selection",
      "Cost-effective procurement solutions",
      "Bulk purchasing discounts",
      "Equipment delivery and setup",
      "Warranty and support coordination",
    ],
  },
  {
    id: "it-training-career",
    title: "IT Training & Career Development",
    shortTitle: "IT Training",
    description:
      "Professional IT training programs and career development services to upskill your team and advance their technical capabilities.",
    icon: GraduationCap,
    image: "/images/training.jpg",
    features: [
      "Corporate IT training programs",
      "Certification preparation courses",
      "Technical skills development",
      "Career mentorship and guidance",
      "Custom training curriculum",
      "Hands-on practical workshops",
    ],
  },
  {
    id: "it-project-outsourcing",
    title: "IT/Project Outsourcing",
    shortTitle: "IT/Project Outsourcing",
    description:
      "Expert IT staff augmentation and project outsourcing services to scale your team and deliver projects efficiently.",
    icon: Users,
    image: "/images/project-outsourcing.jpg",
    features: [
      "Dedicated development teams",
      "Project-based outsourcing",
      "Technical staff augmentation",
      "Offshore/nearshore resources",
      "Full project lifecycle management",
      "Quality assurance and delivery",
    ],
  },
];

export const serviceCategories = services.map((service) => ({
  value: service.id,
  label: service.shortTitle,
}));

// For backwards compatibility with existing code
export const getServiceByTitle = (title: string): Service | undefined => {
  return services.find(
    (s) =>
      s.title.toLowerCase().includes(title.toLowerCase()) ||
      s.shortTitle.toLowerCase().includes(title.toLowerCase()),
  );
};
