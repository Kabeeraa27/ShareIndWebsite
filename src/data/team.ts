export type TeamDepartment = "Research" | "Sales";

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  email: string;
  department: TeamDepartment;
  /** Optional — members without a photo yet fall back to an initials avatar. */
  image?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "rajvansh-bhatia",
    name: "Rajvansh Singh Bhatia",
    title: "Institutional Sales",
    email: "rajvansh.bhatia@shareindia.com",
    department: "Sales",
    image: "/people/rajvansh-bhatia.jpeg",
  },
  {
    id: "harsh-patel",
    name: "Harsh Patel",
    title: "Sr. Research Analyst",
    email: "harsh.patel@shareindia.com",
    department: "Research",
    image: "/people/harsh-patel.jpg",
  },
  {
    id: "mithil-doshi",
    name: "Mithil Doshi",
    title: "Sr. Research Analyst — Technical & Derivatives",
    email: "mithil.doshi@shareindia.com",
    department: "Research",
    image: "/people/mithil-doshi.jpeg",
  },
  {
    id: "nilesh-patil",
    name: "Nilesh Patil",
    title: "Sr. Research Analyst",
    email: "nilesh.patil@shareindia.com",
    department: "Research",
    image: "/people/nilesh-patil.png",
  },
  {
    id: "jahnvi-shah",
    name: "Jahnvi Shah",
    title: "Research Analyst",
    email: "jahnvi.shah@shareindia.com",
    department: "Research",
    image: "/people/jahnvi-shah.png",
  },
  {
    id: "varun-dubey",
    name: "Varun Dubey",
    title: "Research Analyst",
    email: "varun.dubey@shareindia.co.in",
    department: "Research",
    image: "/people/varun-dubey.png",
  },
  {
    id: "viral-jain",
    name: "Viral Jain",
    title: "Research Analyst",
    email: "viral.jain@shareindia.co.in",
    department: "Research",
    image: "/people/viral-jain.png",
  },
  {
    id: "bhavin-dedhia",
    name: "Bhavin Dedhia",
    title: "Research Analyst",
    email: "bhavin.dedhia@shareindia.co.in",
    department: "Research",
    image: "/people/bhavin-dedhia.png",
  },
  {
    id: "khushi-jain",
    name: "Khushi Jain",
    title: "Research Analyst",
    email: "khushi.jain@shareindia.com",
    department: "Research",
    image: "/people/khushi-jain.png",
  },
  {
    id: "krisha-purohit",
    name: "Krisha Purohit",
    title: "Research Associate",
    email: "krisha.purohit@shareindia.co.in",
    department: "Research",
    image: "/people/krisha-purohit.png",
  },
  {
    id: "laksh-hingorani",
    name: "Laksh Hingorani",
    title: "Research Associate",
    email: "laksh.hingorani@shareindia.co.in",
    department: "Research",
    image: "/people/laksh-hingorani.png",
  },
];
