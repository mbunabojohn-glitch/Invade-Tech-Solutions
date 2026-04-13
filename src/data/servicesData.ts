import { Wrench, ShoppingCart, GraduationCap } from 'lucide-react';

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
    id: 'it-hardware-support',
    title: 'IT and Hardware Support',
    shortTitle: 'IT & Hardware Support',
    description: 'Comprehensive IT infrastructure management and hardware maintenance services to keep your business running smoothly 24/7.',
    icon: Wrench,
    image: '/images/it-support.jpg',
    features: [
      'Network setup and maintenance',
      'Server management and monitoring',
      'Hardware installation and repairs',
      'System troubleshooting and diagnostics',
      'Remote and on-site technical support',
      '24/7 helpdesk services',
    ],
  },
  {
    id: 'hardware-procurement',
    title: 'Procurement of Hardware',
    shortTitle: 'Hardware Procurement',
    description: 'Strategic sourcing and procurement of quality IT hardware and equipment tailored to your business needs and budget.',
    icon: ShoppingCart,
    image: '/images/procurement.jpg',
    features: [
      'Vendor sourcing and negotiation',
      'Quality hardware selection',
      'Cost-effective procurement solutions',
      'Bulk purchasing discounts',
      'Equipment delivery and setup',
      'Warranty and support coordination',
    ],
  },
  {
    id: 'it-training-career',
    title: 'IT Training & Career Development',
    shortTitle: 'IT Training',
    description: 'Professional IT training programs and career development services to upskill your team and advance their technical capabilities.',
    icon: GraduationCap,
    image: '/images/training.jpg',
    features: [
      'Corporate IT training programs',
      'Certification preparation courses',
      'Technical skills development',
      'Career mentorship and guidance',
      'Custom training curriculum',
      'Hands-on practical workshops',
    ],
  },
  {
    id: 'network-infrastructure',
    title: 'Network Infrastructure',
    shortTitle: 'Network Infrastructure',
    description: 'Design, implementation, and optimization of robust network solutions for seamless connectivity and performance.',
    icon: Wrench,
    image: '/images/network-infrastructure.avif',
    features: [
      'Network design and planning',
      'Infrastructure implementation',
      'System optimization and monitoring',
      'Security configuration',
      'Scalability solutions',
      'Disaster recovery planning',
    ],
  },
];

export const serviceCategories = services.map(service => ({
  value: service.id,
  label: service.shortTitle,
}));

// For backwards compatibility with existing code
export const getServiceByTitle = (title: string): Service | undefined => {
  return services.find(s => 
    s.title.toLowerCase().includes(title.toLowerCase()) ||
    s.shortTitle.toLowerCase().includes(title.toLowerCase())
  );
};
