export interface Client {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  industry?: string;
}

export const clients: Client[] = [
  {
    id: "livespot360",
    name: "Livespot360",
    logo: "/images/livespot-Img.jpg",
    website: "https://livespot360.com",
    description: "Leading experiential marketing and event management company",
    industry: "Marketing & Events",
  },
  {
    id: "standpoint-ng",
    name: "Standpoint ng",
    logo: "/images/standpoint-Img.png",
    website: "https://standpointng.com",
    description:
      "Digital agency specializing in web development and digital solutions",
    industry: "Digital Agency",
  },
  {
    id: "intervene-k12",
    name: "Intervene K-12",
    logo: "/images/Intervene-Img.jpg",
    description: "Educational technology solutions provider",
    industry: "Education Technology",
  },
];

// Stats about clients (can be used in Stats component or About page)
export const clientStats = {
  totalClients: 3,
  industries: ["Marketing", "Technology", "Education"],
  satisfactionRate: "100%",
};

// Testimonials from clients (placeholder - update with real testimonials)
export const testimonials = [
  {
    id: 1,
    clientId: "livespot360",
    clientName: "Livespot360",
    testimonial:
      "Invade Tech Solutions has been instrumental in maintaining our IT infrastructure and ensuring seamless operations during our major events.",
    author: "Operations Manager",
    rating: 5,
  },
  {
    id: 2,
    clientId: "standpoint-ng",
    clientName: "Standpoint ng",
    testimonial:
      "Their hardware procurement services saved us significant costs while ensuring we got quality equipment for our expanding team.",
    author: "Technical Lead",
    rating: 5,
  },
  {
    id: 3,
    clientId: "intervene-k12",
    clientName: "Intervene K-12",
    testimonial:
      "The IT training programs have upskilled our entire technical team. Highly professional and knowledgeable instructors.",
    author: "Head of Technology",
    rating: 5,
  },
];
