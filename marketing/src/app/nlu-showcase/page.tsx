'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  GraduationCap, 
  MapPin, 
  Users, 
  Trophy,
  Calendar,
  TrendingUp,
  Building,
  Star,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Comprehensive NLU data with rankings and details
const nluData = [
  {
    id: 1,
    name: "NLSIU Bengaluru",
    fullName: "National Law School of India University",
    location: "Bengaluru, Karnataka",
    rank: 1,
    established: 1987,
    intake: 242,
    cutoff: "Top 250",
    avgPackage: "₹18-20 LPA",
    topRecruiters: ["Trilegal", "AZB & Partners", "Khaitan & Co"],
    specialization: "Constitutional Law, Corporate Law",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    color: "from-purple-600 to-pink-600",
    glowColor: "purple",
    description: "India's premier law school, pioneering legal education since 1987"
  },
  {
    id: 2,
    name: "NALSAR Hyderabad",
    fullName: "National Academy of Legal Studies and Research",
    location: "Hyderabad, Telangana",
    rank: 2,
    established: 1998,
    intake: 132,
    cutoff: "Top 400",
    avgPackage: "₹16-18 LPA",
    topRecruiters: ["Luthra & Luthra", "SAM & Co", "JSA"],
    specialization: "International Law, IPR",
    imageUrl: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&q=80",
    color: "from-blue-600 to-cyan-600",
    glowColor: "blue",
    description: "Excellence in legal education with focus on research and innovation"
  },
  {
    id: 3,
    name: "NLIU Bhopal",
    fullName: "National Law Institute University",
    location: "Bhopal, Madhya Pradesh",
    rank: 3,
    established: 1997,
    intake: 128,
    cutoff: "Top 600",
    avgPackage: "₹12-14 LPA",
    topRecruiters: ["Cyril Amarchand", "L&L Partners", "IndusLaw"],
    specialization: "Criminal Law, Human Rights",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    color: "from-green-600 to-teal-600",
    glowColor: "green",
    description: "Pioneering legal education in Central India"
  },
  {
    id: 4,
    name: "WBNUJS Kolkata",
    fullName: "West Bengal National University of Juridical Sciences",
    location: "Kolkata, West Bengal",
    rank: 4,
    established: 1999,
    intake: 127,
    cutoff: "Top 700",
    avgPackage: "₹14-16 LPA",
    topRecruiters: ["Shardul Amarchand", "ARA Law", "Desai & Diwanji"],
    specialization: "Business Law, Taxation",
    imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80",
    color: "from-orange-600 to-red-600",
    glowColor: "orange",
    description: "Eastern India's flagship law university"
  },
  {
    id: 5,
    name: "NLU Jodhpur",
    fullName: "National Law University",
    location: "Jodhpur, Rajasthan",
    rank: 5,
    established: 1999,
    intake: 120,
    cutoff: "Top 900",
    avgPackage: "₹10-12 LPA",
    topRecruiters: ["DSK Legal", "Pioneer Legal", "PSL Advocates"],
    specialization: "Environmental Law, Energy Law",
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80",
    color: "from-yellow-600 to-amber-600",
    glowColor: "yellow",
    description: "Desert's jewel of legal education"
  },
  {
    id: 6,
    name: "HNLU Raipur",
    fullName: "Hidayatullah National Law University",
    location: "Raipur, Chhattisgarh",
    rank: 6,
    established: 2003,
    intake: 180,
    cutoff: "Top 1200",
    avgPackage: "₹8-10 LPA",
    topRecruiters: ["Tatva Legal", "Singhania & Partners", "Juris Corp"],
    specialization: "Tribal Law, Mining Law",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    color: "from-indigo-600 to-purple-600",
    glowColor: "indigo",
    description: "Named after India's longest-serving Chief Justice"
  },
  {
    id: 7,
    name: "GNLU Gandhinagar",
    fullName: "Gujarat National Law University",
    location: "Gandhinagar, Gujarat",
    rank: 7,
    established: 2003,
    intake: 187,
    cutoff: "Top 1500",
    avgPackage: "₹9-11 LPA",
    topRecruiters: ["Nishith Desai", "Economic Laws Practice", "MZM Legal"],
    specialization: "Securities Law, Maritime Law",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    color: "from-pink-600 to-rose-600",
    glowColor: "pink",
    description: "Western India's legal education hub"
  },
  {
    id: 8,
    name: "RMLNLU Lucknow",
    fullName: "Ram Manohar Lohiya National Law University",
    location: "Lucknow, Uttar Pradesh",
    rank: 8,
    established: 2005,
    intake: 180,
    cutoff: "Top 1800",
    avgPackage: "₹7-9 LPA",
    topRecruiters: ["Legasis Partners", "Touchstone Partners", "Samvad Partners"],
    specialization: "Family Law, Alternative Dispute Resolution",
    imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80",
    color: "from-cyan-600 to-blue-600",
    glowColor: "cyan",
    description: "Named after the socialist leader and freedom fighter"
  },
  {
    id: 9,
    name: "RGNUL Punjab",
    fullName: "Rajiv Gandhi National University of Law",
    location: "Patiala, Punjab",
    rank: 9,
    established: 2006,
    intake: 180,
    cutoff: "Top 2000",
    avgPackage: "₹7-8 LPA",
    topRecruiters: ["Remfry & Sagar", "Saikrishna & Associates", "BTG Legal"],
    specialization: "Intellectual Property Law, Sports Law",
    imageUrl: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=80",
    color: "from-teal-600 to-green-600",
    glowColor: "teal",
    description: "Punjab's premier law university"
  },
  {
    id: 10,
    name: "CNLU Patna",
    fullName: "Chanakya National Law University",
    location: "Patna, Bihar",
    rank: 10,
    established: 2006,
    intake: 140,
    cutoff: "Top 2500",
    avgPackage: "₹6-8 LPA",
    topRecruiters: ["Fox Mandal", "Dua Associates", "ALMT Legal"],
    specialization: "Constitutional Law, Public Policy",
    imageUrl: "https://images.unsplash.com/photo-1569878698889-7bffa1896872?w=800&q=80",
    color: "from-red-600 to-pink-600",
    glowColor: "red",
    description: "Named after the ancient Indian strategist Chanakya"
  },
  // Additional NLUs
  {
    id: 11,
    name: "NUALS Kochi",
    fullName: "National University of Advanced Legal Studies",
    location: "Kochi, Kerala",
    rank: 11,
    established: 2005,
    intake: 60,
    cutoff: "Top 3000",
    avgPackage: "₹6-7 LPA",
    topRecruiters: ["Lakshmikumaran & Sridharan", "Vaish Associates", "BMR Legal"],
    specialization: "Maritime Law, International Trade Law",
    imageUrl: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80",
    color: "from-amber-600 to-orange-600",
    glowColor: "amber",
    description: "Kerala's center for advanced legal studies"
  },
  {
    id: 12,
    name: "NLUO Cuttack",
    fullName: "National Law University Odisha",
    location: "Cuttack, Odisha",
    rank: 12,
    established: 2008,
    intake: 180,
    cutoff: "Top 3500",
    avgPackage: "₹5-7 LPA",
    topRecruiters: ["Argus Partners", "Solomon & Co", "Link Legal"],
    specialization: "Tribal Rights, Environmental Law",
    imageUrl: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=800&q=80",
    color: "from-purple-600 to-indigo-600",
    glowColor: "purple",
    description: "Eastern India's emerging legal education center"
  },
  {
    id: 13,
    name: "NUSRL Ranchi",
    fullName: "National University of Study and Research in Law",
    location: "Ranchi, Jharkhand",
    rank: 13,
    established: 2010,
    intake: 120,
    cutoff: "Top 4000",
    avgPackage: "₹5-6 LPA",
    topRecruiters: ["Kochhar & Co", "Clasis Law", "Hammurabi & Solomon"],
    specialization: "Mining Law, Tribal Rights",
    imageUrl: "https://images.unsplash.com/photo-1587483166702-bf9aa66bd791?w=800&q=80",
    color: "from-rose-600 to-orange-600",
    glowColor: "rose",
    description: "Jharkhand's premier law university focusing on regional legal issues"
  },
  {
    id: 14,
    name: "NLUJA Guwahati",
    fullName: "National Law University and Judicial Academy",
    location: "Guwahati, Assam",
    rank: 14,
    established: 2009,
    intake: 120,
    cutoff: "Top 4500",
    avgPackage: "₹5-6 LPA",
    topRecruiters: ["Juris India", "Law Partners", "Eastern Legal"],
    specialization: "North-East India Laws, Customary Laws",
    imageUrl: "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?w=800&q=80",
    color: "from-emerald-600 to-teal-600",
    glowColor: "emerald",
    description: "North-East India's gateway to legal education"
  },
  {
    id: 15,
    name: "DSNLU Visakhapatnam",
    fullName: "Damodaram Sanjivayya National Law University",
    location: "Visakhapatnam, Andhra Pradesh",
    rank: 15,
    established: 2008,
    intake: 120,
    cutoff: "Top 5000",
    avgPackage: "₹4-6 LPA",
    topRecruiters: ["Coastal Legal", "AP Law Chambers", "Southern Associates"],
    specialization: "Maritime Law, Port Laws",
    imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",
    color: "from-sky-600 to-blue-600",
    glowColor: "sky",
    description: "Coastal Andhra Pradesh's legal education hub"
  },
  {
    id: 16,
    name: "TNNLU Tiruchirappalli",
    fullName: "Tamil Nadu National Law University",
    location: "Tiruchirappalli, Tamil Nadu",
    rank: 16,
    established: 2012,
    intake: 120,
    cutoff: "Top 5500",
    avgPackage: "₹4-5 LPA",
    topRecruiters: ["Chennai Legal", "Tamil Law Associates", "Madras Partners"],
    specialization: "Tamil Customary Law, Temple Laws",
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80",
    color: "from-violet-600 to-purple-600",
    glowColor: "violet",
    description: "Tamil Nadu's premier national law university"
  },
  {
    id: 17,
    name: "MNLU Mumbai",
    fullName: "Maharashtra National Law University",
    location: "Mumbai, Maharashtra",
    rank: 17,
    established: 2014,
    intake: 100,
    cutoff: "Top 6000",
    avgPackage: "₹6-8 LPA",
    topRecruiters: ["Mumbai Legal", "Bombay Chambers", "Western Law Associates"],
    specialization: "Corporate Law, Entertainment Law",
    imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80",
    color: "from-orange-600 to-amber-600",
    glowColor: "orange",
    description: "Financial capital's legal education institution"
  },
  {
    id: 18,
    name: "MNLU Nagpur",
    fullName: "Maharashtra National Law University",
    location: "Nagpur, Maharashtra",
    rank: 18,
    established: 2016,
    intake: 120,
    cutoff: "Top 6500",
    avgPackage: "₹4-5 LPA",
    topRecruiters: ["Central India Legal", "Nagpur Law Offices", "Vidarbha Associates"],
    specialization: "Criminal Law, Constitutional Law",
    imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    color: "from-lime-600 to-green-600",
    glowColor: "lime",
    description: "Central India's emerging law university"
  },
  {
    id: 19,
    name: "MNLU Aurangabad",
    fullName: "Maharashtra National Law University",
    location: "Aurangabad, Maharashtra",
    rank: 19,
    established: 2017,
    intake: 60,
    cutoff: "Top 7000",
    avgPackage: "₹3-5 LPA",
    topRecruiters: ["Marathwada Legal", "Aurangabad Associates", "Regional Law Partners"],
    specialization: "Agricultural Law, Rural Legal Studies",
    imageUrl: "https://images.unsplash.com/photo-1565618500154-b5d3b98c0cac?w=800&q=80",
    color: "from-indigo-600 to-blue-600",
    glowColor: "indigo",
    description: "Serving the legal education needs of Marathwada region"
  },
  {
    id: 20,
    name: "HPNLU Shimla",
    fullName: "Himachal Pradesh National Law University",
    location: "Shimla, Himachal Pradesh",
    rank: 20,
    established: 2016,
    intake: 120,
    cutoff: "Top 7500",
    avgPackage: "₹4-5 LPA",
    topRecruiters: ["Hill Legal Services", "Shimla Law Associates", "HP Legal"],
    specialization: "Environmental Law, Tourism Law",
    imageUrl: "https://images.unsplash.com/photo-1584200186925-87fa8f93be9b?w=800&q=80",
    color: "from-cyan-600 to-teal-600",
    glowColor: "cyan",
    description: "The Queen of Hills' legal education center"
  },
  {
    id: 21,
    name: "DNLU Jabalpur",
    fullName: "Dharmashastra National Law University",
    location: "Jabalpur, Madhya Pradesh",
    rank: 21,
    established: 2018,
    intake: 120,
    cutoff: "Top 8000",
    avgPackage: "₹3-4 LPA",
    topRecruiters: ["MP Legal Services", "Central Legal", "Jabalpur Associates"],
    specialization: "Ancient Indian Law, Religious Laws",
    imageUrl: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=800&q=80",
    color: "from-pink-600 to-purple-600",
    glowColor: "pink",
    description: "Focused on traditional Indian legal systems"
  },
  {
    id: 22,
    name: "DBRAMBEDKARNLU Sonipat",
    fullName: "Dr. B.R. Ambedkar National Law University",
    location: "Sonipat, Haryana",
    rank: 22,
    established: 2012,
    intake: 120,
    cutoff: "Top 8500",
    avgPackage: "₹3-4 LPA",
    topRecruiters: ["Haryana Legal", "NCR Law Associates", "Sonipat Partners"],
    specialization: "Social Justice Law, Constitutional Studies",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
    color: "from-red-600 to-orange-600",
    glowColor: "red",
    description: "Dedicated to social justice and constitutional values"
  },
  {
    id: 23,
    name: "NLUT Tripura",
    fullName: "National Law University Tripura",
    location: "Agartala, Tripura",
    rank: 23,
    established: 2020,
    intake: 60,
    cutoff: "Top 9000",
    avgPackage: "₹3-4 LPA",
    topRecruiters: ["North East Legal", "Tripura Associates", "Regional Law Offices"],
    specialization: "North-East Customary Laws, Border Laws",
    imageUrl: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=80",
    color: "from-purple-600 to-violet-600",
    glowColor: "purple",
    description: "Tripura's window to national legal education"
  },
  {
    id: 24,
    name: "RPNLU Prayagraj",
    fullName: "Rajiv Gandhi National Law University",
    location: "Prayagraj, Uttar Pradesh",
    rank: 24,
    established: 2020,
    intake: 180,
    cutoff: "Top 9500",
    avgPackage: "₹3-4 LPA",
    topRecruiters: ["Allahabad Legal", "UP Law Services", "Prayagraj Associates"],
    specialization: "Hindu Law, Religious Studies",
    imageUrl: "https://images.unsplash.com/photo-1569163139394-de4798907485?w=800&q=80",
    color: "from-amber-600 to-yellow-600",
    glowColor: "amber",
    description: "Located in the historic city of Prayagraj"
  },
  {
    id: 25,
    name: "GNLU Silvassa",
    fullName: "Gujarat National Law University",
    location: "Silvassa, Dadra & Nagar Haveli",
    rank: 25,
    established: 2018,
    intake: 60,
    cutoff: "Top 10000",
    avgPackage: "₹3-4 LPA",
    topRecruiters: ["Gujarat Legal", "Western Associates", "Silvassa Partners"],
    specialization: "Union Territory Laws, Industrial Law",
    imageUrl: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&q=80",
    color: "from-teal-600 to-cyan-600",
    glowColor: "teal",
    description: "GNLU's extended campus in Union Territory"
  },
  {
    id: 26,
    name: "IIULER Goa",
    fullName: "Indian Institute of Legal Studies & Research",
    location: "Goa",
    rank: 26,
    established: 2021,
    intake: 60,
    cutoff: "Top 10500",
    avgPackage: "₹3-4 LPA",
    topRecruiters: ["Goa Legal Services", "Coastal Law Associates", "Western Legal"],
    specialization: "Tourism Law, Casino Gaming Law",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    color: "from-blue-600 to-indigo-600",
    glowColor: "blue",
    description: "Goa's premier law institute by the coast"
  }
];

export default function NLUShowcasePage() {
  const [selectedNLU, setSelectedNLU] = useState(nluData[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterByRank, setFilterByRank] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.2]);

  const filteredNLUs = nluData.filter(nlu => {
    const matchesSearch = nlu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nlu.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterByRank === 'all' || 
                         (filterByRank === 'top5' && nlu.rank <= 5) ||
                         (filterByRank === 'top10' && nlu.rank <= 10);
    return matchesSearch && matchesFilter;
  });

  const scrollToNLU = (direction: 'prev' | 'next') => {
    const currentIndex = filteredNLUs.findIndex(nlu => nlu.id === selectedNLU.id);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredNLUs.length
      : (currentIndex - 1 + filteredNLUs.length) % filteredNLUs.length;
    setSelectedNLU(filteredNLUs[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Hero Section with 3D Title */}
      <motion.section 
        className="relative overflow-hidden py-20"
        style={{ opacity }}
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10" />
          <motion.div 
            className="absolute inset-0"
            style={{ y }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
                style={{ top: `${i * 5}%` }}
                animate={{
                  x: ['-100%', '100%'],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 10,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            ))}
          </motion.div>
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="relative mb-6 text-5xl font-bold md:text-7xl">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Explore India's Top NLUs
              </span>
              <motion.span
                className="absolute -top-4 -right-4 text-2xl"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="text-yellow-400" />
              </motion.span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-300">
              Interactive 3D showcase of all 26 National Law Universities with glassmorphic design
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 flex flex-col gap-4 md:flex-row"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 border-white/20 bg-white/10 pl-10 text-white backdrop-blur-sm placeholder:text-gray-400 focus:border-purple-400"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterByRank === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterByRank('all')}
                className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
              >
                All NLUs
              </Button>
              <Button
                variant={filterByRank === 'top5' ? 'default' : 'outline'}
                onClick={() => setFilterByRank('top5')}
                className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
              >
                Top 5
              </Button>
              <Button
                variant={filterByRank === 'top10' ? 'default' : 'outline'}
                onClick={() => setFilterByRank('top10')}
                className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
              >
                Top 10
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main 3D Showcase Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Panel - NLU List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <h2 className="mb-6 text-2xl font-semibold text-white">All NLUs</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                {filteredNLUs.map((nlu) => (
                  <motion.div
                    key={nlu.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedNLU(nlu)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      selectedNLU.id === nlu.id
                        ? 'border-purple-400 bg-purple-500/20'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{nlu.name}</h3>
                        <p className="text-sm text-gray-400">{nlu.location}</p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-bold text-white">
                        #{nlu.rank}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Panel - 3D Card Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            {/* 3D Glassmorphic Card */}
            <div className="perspective-1000">
              <motion.div
                key={selectedNLU.id}
                initial={{ rotateY: -180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative transform-gpu"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Main 3D Card */}
                <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-1 backdrop-blur-xl">
                  {/* Glow effect */}
                  <div className={`absolute -inset-10 bg-gradient-to-r ${selectedNLU.color} opacity-20 blur-3xl`} />
                  
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-8">
                    {/* Campus Image with 3D effect */}
                    <div className="relative mb-8 overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                      <motion.img
                        src={selectedNLU.imageUrl}
                        alt={selectedNLU.name}
                        className="h-64 w-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <h2 className="text-3xl font-bold text-white">{selectedNLU.fullName}</h2>
                        <p className="flex items-center gap-2 text-white/80">
                          <MapPin className="h-4 w-4" />
                          {selectedNLU.location}
                        </p>
                      </div>
                      {/* Rank Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-2xl font-bold text-white shadow-lg">
                          #{selectedNLU.rank}
                        </div>
                      </div>
                    </div>

                    {/* NLU Details Grid */}
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Stats Cards */}
                      <motion.div
                        whileHover={{ scale: 1.02, rotateY: 5 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <div className="rounded-lg bg-purple-500/20 p-2">
                            <Calendar className="h-5 w-5 text-purple-400" />
                          </div>
                          <h3 className="font-semibold text-white">Established</h3>
                        </div>
                        <p className="text-2xl font-bold text-white">{selectedNLU.established}</p>
                        <p className="text-sm text-gray-400">Years of excellence</p>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02, rotateY: -5 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <div className="rounded-lg bg-blue-500/20 p-2">
                            <Users className="h-5 w-5 text-blue-400" />
                          </div>
                          <h3 className="font-semibold text-white">Total Intake</h3>
                        </div>
                        <p className="text-2xl font-bold text-white">{selectedNLU.intake}</p>
                        <p className="text-sm text-gray-400">Students per year</p>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02, rotateY: 5 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <div className="rounded-lg bg-green-500/20 p-2">
                            <Trophy className="h-5 w-5 text-green-400" />
                          </div>
                          <h3 className="font-semibold text-white">CLAT Cutoff</h3>
                        </div>
                        <p className="text-2xl font-bold text-white">{selectedNLU.cutoff}</p>
                        <p className="text-sm text-gray-400">General category rank</p>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02, rotateY: -5 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <div className="rounded-lg bg-yellow-500/20 p-2">
                            <TrendingUp className="h-5 w-5 text-yellow-400" />
                          </div>
                          <h3 className="font-semibold text-white">Avg Package</h3>
                        </div>
                        <p className="text-2xl font-bold text-white">{selectedNLU.avgPackage}</p>
                        <p className="text-sm text-gray-400">Placement statistics</p>
                      </motion.div>
                    </div>

                    {/* Description and Details */}
                    <div className="mt-6 space-y-4">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <h3 className="mb-3 font-semibold text-white">About</h3>
                        <p className="text-gray-300">{selectedNLU.description}</p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <h3 className="mb-3 font-semibold text-white">Specializations</h3>
                        <p className="text-gray-300">{selectedNLU.specialization}</p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <h3 className="mb-3 font-semibold text-white">Top Recruiters</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedNLU.topRecruiters.map((recruiter, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-300"
                            >
                              {recruiter}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex items-center justify-between">
                      <Button
                        onClick={() => scrollToNLU('prev')}
                        className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                      
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Website
                      </Button>

                      <Button
                        onClick={() => scrollToNLU('next')}
                        className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
                      >
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4"
            >
              {[
                { label: 'Total NLUs', value: '26', icon: Building },
                { label: 'Total Seats', value: '3,500+', icon: Users },
                { label: 'Avg Package', value: '₹12 LPA', icon: TrendingUp },
                { label: 'Success Rate', value: '95%', icon: Trophy }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <stat.icon className="mx-auto mb-2 h-8 w-8 text-purple-400" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating 3D Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-64 w-64 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
}