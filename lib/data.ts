// Dummy business data for TrustMBR verification hub

export interface Business {
  id: string;
  name: string;
  description: string;
  industry: string;
  location: string;
  address: string;
  monthlyIncome: number;
  incomeHistory: number[]; // Last 6 months
  verificationStatus: "verified" | "pending" | "unverified";
  verifiedAt: string | null;
  yearsActive: number;
  trustScore: number;
  employeeCount: number;
  registrationNumber: string;
  email: string;
  phone: string;
  website: string;
  logo: string;
}

export const businesses: Business[] = [
  {
    id: "1",
    name: "TechFlow Solutions",
    description:
      "Leading software development company specializing in enterprise solutions and digital transformation.",
    industry: "Technology",
    location: "Lagos, Nigeria",
    address: "42 Victoria Island, Lagos",
    monthlyIncome: 2500000,
    incomeHistory: [2100000, 2250000, 2400000, 2350000, 2600000, 2500000],
    verificationStatus: "verified",
    verifiedAt: "2025-01-15",
    yearsActive: 5,
    trustScore: 92,
    employeeCount: 35,
    registrationNumber: "RC-2019-TF-8842",
    email: "info@techflow.ng",
    phone: "+234 801 234 5678",
    website: "https://techflow.ng",
    logo: "/logos/techflow.png",
  },
  {
    id: "2",
    name: "GreenLeaf Organics",
    description:
      "Premium organic food and produce supplier serving restaurants and households.",
    industry: "Agriculture",
    location: "Abuja, Nigeria",
    address: "15 Garki District, Abuja",
    monthlyIncome: 850000,
    incomeHistory: [720000, 780000, 810000, 830000, 890000, 850000],
    verificationStatus: "verified",
    verifiedAt: "2025-02-01",
    yearsActive: 3,
    trustScore: 88,
    employeeCount: 12,
    registrationNumber: "RC-2021-GL-3356",
    email: "hello@greenleaf.ng",
    phone: "+234 802 345 6789",
    website: "https://greenleaf.ng",
    logo: "/logos/greenleaf.png",
  },
  {
    id: "3",
    name: "Urban Style Fashion",
    description:
      "Contemporary African fashion brand with a modern twist on traditional designs.",
    industry: "Fashion & Retail",
    location: "Lagos, Nigeria",
    address: "7 Lekki Phase 1, Lagos",
    monthlyIncome: 1200000,
    incomeHistory: [950000, 1050000, 1100000, 1150000, 1180000, 1200000],
    verificationStatus: "pending",
    verifiedAt: null,
    yearsActive: 2,
    trustScore: 65,
    employeeCount: 8,
    registrationNumber: "RC-2022-US-9921",
    email: "contact@urbanstyle.ng",
    phone: "+234 803 456 7890",
    website: "https://urbanstyle.ng",
    logo: "/logos/urbanstyle.png",
  },
  {
    id: "4",
    name: "SwiftLogix",
    description:
      "Next-generation logistics and delivery solutions for e-commerce businesses.",
    industry: "Logistics",
    location: "Port Harcourt, Nigeria",
    address: "88 Trans Amadi, Port Harcourt",
    monthlyIncome: 3800000,
    incomeHistory: [3200000, 3400000, 3550000, 3700000, 3650000, 3800000],
    verificationStatus: "verified",
    verifiedAt: "2024-11-20",
    yearsActive: 4,
    trustScore: 95,
    employeeCount: 52,
    registrationNumber: "RC-2020-SL-4478",
    email: "info@swiftlogix.ng",
    phone: "+234 804 567 8901",
    website: "https://swiftlogix.ng",
    logo: "/logos/swiftlogix.png",
  },
  {
    id: "5",
    name: "HealthFirst Pharmacy",
    description:
      "Chain of pharmacies providing quality healthcare products and consultations.",
    industry: "Healthcare",
    location: "Ibadan, Nigeria",
    address: "23 Ring Road, Ibadan",
    monthlyIncome: 1450000,
    incomeHistory: [1280000, 1320000, 1380000, 1420000, 1400000, 1450000],
    verificationStatus: "verified",
    verifiedAt: "2025-01-28",
    yearsActive: 7,
    trustScore: 91,
    employeeCount: 28,
    registrationNumber: "RC-2017-HF-2234",
    email: "care@healthfirst.ng",
    phone: "+234 805 678 9012",
    website: "https://healthfirst.ng",
    logo: "/logos/healthfirst.png",
  },
  {
    id: "6",
    name: "QuickByte Eatery",
    description:
      "Fast casual restaurant known for fusion cuisine and quick service.",
    industry: "Food & Beverage",
    location: "Lagos, Nigeria",
    address: "12 Allen Avenue, Ikeja, Lagos",
    monthlyIncome: 680000,
    incomeHistory: [520000, 580000, 620000, 650000, 700000, 680000],
    verificationStatus: "unverified",
    verifiedAt: null,
    yearsActive: 1,
    trustScore: 42,
    employeeCount: 15,
    registrationNumber: "RC-2024-QB-1122",
    email: "order@quickbyte.ng",
    phone: "+234 806 789 0123",
    website: "https://quickbyte.ng",
    logo: "/logos/quickbyte.png",
  },
  {
    id: "7",
    name: "BuildRight Construction",
    description:
      "Professional construction and real estate development company.",
    industry: "Construction",
    location: "Abuja, Nigeria",
    address: "Plot 45, Wuse Zone 5, Abuja",
    monthlyIncome: 8500000,
    incomeHistory: [7800000, 8100000, 8300000, 8450000, 8200000, 8500000],
    verificationStatus: "verified",
    verifiedAt: "2024-09-15",
    yearsActive: 10,
    trustScore: 97,
    employeeCount: 120,
    registrationNumber: "RC-2014-BR-5567",
    email: "projects@buildright.ng",
    phone: "+234 807 890 1234",
    website: "https://buildright.ng",
    logo: "/logos/buildright.png",
  },
  {
    id: "8",
    name: "EduSmart Academy",
    description:
      "Modern learning center offering tutoring and professional certification courses.",
    industry: "Education",
    location: "Lagos, Nigeria",
    address: "5 Admiralty Way, Lekki, Lagos",
    monthlyIncome: 920000,
    incomeHistory: [750000, 800000, 850000, 880000, 900000, 920000],
    verificationStatus: "pending",
    verifiedAt: null,
    yearsActive: 2,
    trustScore: 71,
    employeeCount: 18,
    registrationNumber: "RC-2022-EA-7789",
    email: "enroll@edusmart.ng",
    phone: "+234 808 901 2345",
    website: "https://edusmart.ng",
    logo: "/logos/edusmart.png",
  },
];

// Helper function to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Helper function to get business by ID
export function getBusinessById(id: string): Business | undefined {
  return businesses.find((b) => b.id === id);
}

// Helper function to filter businesses by status
export function filterBusinessesByStatus(
  status: Business["verificationStatus"] | "all",
): Business[] {
  if (status === "all") return businesses;
  return businesses.filter((b) => b.verificationStatus === status);
}
