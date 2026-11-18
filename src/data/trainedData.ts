export interface TrainedPerson {
  name: string;
  category: string;
  previousRole: string;
  newRole: string;
  training: string;
  currentRole: string;
  photo: string;
}

/**
 * People trained by Invade Tech Solutions.
 * Uses the same three people and photos as testimonialsData.ts so the
 * Career Flip Wall on the Courses page stays consistent with the Home
 * page success stories. No counters or numeric metrics are included.
 */
export const trainedPeople: TrainedPerson[] = [
  {
    name: "King Okonkwo",
    category: "Career Transition",
    previousRole: "Microbiologist",
    newRole: "QA Engineer",
    training: "Invade Tech Solutions QA Program",
    currentRole: "QA Personnel, IT Company",
    photo: "/testimonials/kingOkonkwo.png",
  },
  {
    name: "Olumide Adeoye",
    category: "Career Transition",
    previousRole: "Engineer",
    newRole: "Project Manager",
    training: "Invade Tech Solutions Project Management Program",
    currentRole: "Project Manager, Chevron",
    photo: "/testimonials/olumideAdeoye.png",
  },
  {
    name: "Wisdom Jacob",
    category: "Career Transition",
    previousRole: "Sales Person",
    newRole: "QA Engineer",
    training: "Invade Tech Solutions QA Program",
    currentRole: "QA Personnel, Zenith Bank",
    photo: "/testimonials/wisdomJacob.png",
  },
];
