// Import GK Questions Database
import { gkQuestionsDatabase } from './GKQuestionsDatabase';

// Export GK Questions Database
export { gkQuestionsDatabase };

// Comprehensive vocabulary database with spaced repetition
export const vocabularyDatabase = [
  {
    id: 1,
    word: "paradigm",
    definition: "A typical example or pattern of something; a model or framework",
    context: "The new law created a paradigm shift in privacy rights",
    etymology: "From Greek 'paradeigma' meaning 'pattern, example'",
    difficulty: "advanced",
    category: "legal",
    mastery: "learning",
    synonyms: ["model", "framework", "pattern", "archetype"],
    antonyms: ["anomaly", "exception"],
    usage: "The court's decision established a new paradigm for digital rights.",
    mnemonics: "PARA-DIGM: Pattern And Reference As Design In General Model",
    frequency: "high",
    clatRelevance: 9,
    lastReviewed: null,
    nextReview: null,
    easeFactor: 2.5,
    reviewCount: 0,
    examples: [
      "The paradigm of constitutional interpretation has evolved.",
      "This case represents a paradigm shift in legal thinking."
    ]
  },
  {
    id: 2,
    word: "jurisprudence",
    definition: "The theory or philosophy of law; legal science",
    context: "Constitutional jurisprudence has evolved significantly",
    etymology: "From Latin 'juris prudentia' meaning 'knowledge of law'",
    difficulty: "advanced",
    category: "legal",
    mastery: "mastered",
    synonyms: ["legal theory", "law", "legal philosophy"],
    antonyms: ["lawlessness", "anarchy"],
    usage: "The judge's decision was based on established jurisprudence.",
    mnemonics: "JURIS-PRUDENCE: Justice Under Rules Is Science, Principles Ruling Under Decisions Establishing Norms, Customs, Ethics",
    frequency: "high",
    clatRelevance: 10,
    lastReviewed: Date.now() - (2 * 24 * 60 * 60 * 1000),
    nextReview: Date.now() + (5 * 24 * 60 * 60 * 1000),
    easeFactor: 2.8,
    reviewCount: 5,
    examples: [
      "Indian jurisprudence draws from various legal traditions.",
      "The development of constitutional jurisprudence requires careful study."
    ]
  },
  {
    id: 3,
    word: "precedent",
    definition: "An earlier event or action regarded as an example or guide",
    context: "The Supreme Court set an important precedent",
    etymology: "From Latin 'praecedere' meaning 'to go before'",
    difficulty: "intermediate",
    category: "legal",
    mastery: "learning",
    synonyms: ["example", "standard", "benchmark", "guideline"],
    antonyms: ["innovation", "departure"],
    usage: "The court followed the precedent set in the landmark case.",
    mnemonics: "PRECEDENT: Previous Rulings Establish Court's Expectations, Decisions Establishing Norms Today",
    frequency: "very high",
    clatRelevance: 10,
    lastReviewed: Date.now() - (1 * 24 * 60 * 60 * 1000),
    nextReview: Date.now() + (3 * 24 * 60 * 60 * 1000),
    easeFactor: 2.6,
    reviewCount: 3,
    examples: [
      "The precedent established in this case will guide future decisions.",
      "Breaking with precedent requires strong justification."
    ]
  },
  {
    id: 4,
    word: "cognizable",
    definition: "Capable of being perceived, known, or legally recognized",
    context: "The court found cognizable harm to future generations",
    etymology: "From Latin 'cognoscere' meaning 'to get to know'",
    difficulty: "intermediate",
    category: "legal",
    mastery: "new",
    synonyms: ["recognizable", "perceivable", "identifiable"],
    antonyms: ["imperceptible", "unrecognizable"],
    usage: "The environmental damage was cognizable by the court.",
    mnemonics: "COG-NIZABLE: Court Of Government Notes It, Zones And Brings Legal Examination",
    frequency: "medium",
    clatRelevance: 8,
    lastReviewed: null,
    nextReview: Date.now() + (1 * 24 * 60 * 60 * 1000),
    easeFactor: 2.5,
    reviewCount: 0,
    examples: [
      "The harm was cognizable under environmental law.",
      "Economic losses are cognizable damages in contract law."
    ]
  },
  {
    id: 5,
    word: "ubiquitous",
    definition: "Present, appearing, or found everywhere",
    context: "Digital surveillance has become ubiquitous",
    etymology: "From Latin 'ubique' meaning 'everywhere'",
    difficulty: "intermediate",
    category: "general",
    mastery: "learning",
    synonyms: ["omnipresent", "pervasive", "universal", "widespread"],
    antonyms: ["rare", "scarce", "limited"],
    usage: "Smartphones have become ubiquitous in modern society.",
    mnemonics: "U-BI-QUI-TOUS: You Be In Quite Unique Iterations - Totally Omnipresent, Universal, Spread",
    frequency: "high",
    clatRelevance: 7,
    lastReviewed: Date.now() - (3 * 24 * 60 * 60 * 1000),
    nextReview: Date.now() + (2 * 24 * 60 * 60 * 1000),
    easeFactor: 2.7,
    reviewCount: 4,
    examples: [
      "Technology has become ubiquitous in education.",
      "The ubiquitous nature of social media affects privacy rights."
    ]
  },
  {
    id: 6,
    word: "ephemeral",
    definition: "Lasting for a very short time; transitory",
    context: "The ephemeral nature of social media trends affects public opinion",
    etymology: "From Greek 'ephēmeros' meaning 'lasting only a day'",
    difficulty: "advanced",
    category: "general",
    mastery: "new",
    synonyms: ["transient", "fleeting", "temporary", "short-lived"],
    antonyms: ["permanent", "enduring", "lasting"],
    usage: "The court noted the ephemeral nature of digital evidence.",
    mnemonics: "E-PHE-MERAL: Everything Passes, Here Endlessly - Momentarily Existing, Really A Little",
    frequency: "medium",
    clatRelevance: 6,
    lastReviewed: null,
    nextReview: Date.now() + (1 * 24 * 60 * 60 * 1000),
    easeFactor: 2.5,
    reviewCount: 0,
    examples: [
      "The ephemeral nature of online content poses legal challenges.",
      "Social media posts may seem ephemeral but can have lasting consequences."
    ]
  },
  {
    id: 7,
    word: "indigenous",
    definition: "Originating or occurring naturally in a particular place; native",
    context: "Indigenous rights are protected under international law",
    etymology: "From Latin 'indigenus' meaning 'native, born in a country'",
    difficulty: "intermediate",
    category: "legal",
    mastery: "learning",
    synonyms: ["native", "aboriginal", "original", "local"],
    antonyms: ["foreign", "imported", "alien"],
    usage: "The constitution protects indigenous communities' land rights.",
    mnemonics: "IN-DIG-EN-OUS: In Different Indigenous Groups, Everyone Natively Owns Unique Societies",
    frequency: "high",
    clatRelevance: 8,
    lastReviewed: Date.now() - (2 * 24 * 60 * 60 * 1000),
    nextReview: Date.now() + (4 * 24 * 60 * 60 * 1000),
    easeFactor: 2.6,
    reviewCount: 2,
    examples: [
      "Indigenous knowledge systems deserve legal protection.",
      "The court recognized indigenous customary laws."
    ]
  },
  {
    id: 8,
    word: "contentious",
    definition: "Causing or likely to cause an argument; controversial",
    context: "The contentious bill sparked nationwide debates",
    etymology: "From Latin 'contentiosus' meaning 'quarrelsome'",
    difficulty: "intermediate",
    category: "general",
    mastery: "new",
    synonyms: ["controversial", "disputed", "debatable", "argumentative"],
    antonyms: ["uncontroversial", "agreed", "harmonious"],
    usage: "The contentious provisions were removed from the final draft.",
    mnemonics: "CON-TEN-TIOUS: Constantly Opposing, Never Totally Ending, Never-ending Trouble, Issues, Ongoing, Unwanted Strife",
    frequency: "medium",
    clatRelevance: 7,
    lastReviewed: null,
    nextReview: Date.now() + (1 * 24 * 60 * 60 * 1000),
    easeFactor: 2.5,
    reviewCount: 0,
    examples: [
      "The contentious clause was debated extensively in parliament.",
      "Contentious issues often require judicial intervention."
    ]
  },
  {
    id: 9,
    word: "statutory",
    definition: "Required, permitted, or enacted by statute",
    context: "The statutory provisions clearly define the legal framework",
    etymology: "From Latin 'statutum' meaning 'something set up'",
    difficulty: "intermediate",
    category: "legal",
    mastery: "learning",
    synonyms: ["legal", "lawful", "prescribed", "mandated"],
    antonyms: ["voluntary", "optional", "discretionary"],
    usage: "Statutory interpretation requires careful analysis of legislative intent.",
    mnemonics: "STAT-U-TORY: State's Terms And Text, Usually Through Official Rules, Yes",
    frequency: "very high",
    clatRelevance: 10,
    lastReviewed: Date.now() - (1 * 24 * 60 * 60 * 1000),
    nextReview: Date.now() + (3 * 24 * 60 * 60 * 1000),
    easeFactor: 2.7,
    reviewCount: 3,
    examples: [
      "Statutory duties cannot be delegated without authorization.",
      "The court applied principles of statutory interpretation."
    ]
  },
  {
    id: 10,
    word: "fiduciary",
    definition: "Involving trust, especially in regard to the relationship between a trustee and beneficiary",
    context: "Directors have fiduciary duties to shareholders",
    etymology: "From Latin 'fiduciarius' meaning 'held in trust'",
    difficulty: "advanced",
    category: "legal",
    mastery: "new",
    synonyms: ["trustee", "custodial", "responsible"],
    antonyms: ["irresponsible", "negligent"],
    usage: "The fiduciary relationship requires the highest standard of care.",
    mnemonics: "FI-DU-CI-ARY: Faith In Duties, Understanding Care Is Always Required, Yes",
    frequency: "medium",
    clatRelevance: 8,
    lastReviewed: null,
    nextReview: Date.now() + (1 * 24 * 60 * 60 * 1000),
    easeFactor: 2.5,
    reviewCount: 0,
    examples: [
      "Lawyers owe fiduciary duties to their clients.",
      "Breach of fiduciary duty can result in severe penalties."
    ]
  }
];

// Comprehensive passages database
export const passages = [
  {
    id: 1,
    title: "Digital Rights and Privacy in Modern India",
    type: "Current Affairs",
    source: "Editorial Analysis - The Hindu, 2024",
    difficulty: "Advanced",
    estimatedTime: "6-8 minutes",
    wordCount: 520,
    tags: ["Technology", "Privacy", "Constitutional Law", "Digital Rights"],
    aiComplexity: 8.5,
    text: `The landmark judgment in Justice K.S. Puttaswamy (Retd.) v. Union of India fundamentally transformed India's approach to digital privacy rights. The Supreme Court's recognition of privacy as a fundamental right under Article 21 has created new paradigms for how technology companies, government agencies, and citizens interact in the digital ecosystem.

This constitutional recognition emerged from growing concerns about surveillance capitalism and the unchecked collection of personal data by both state and non-state actors. The court's nine-judge bench unanimously held that privacy is intrinsic to life and liberty, encompassing informational privacy, bodily privacy, and privacy of choice.

The implications extend far beyond individual rights. Digital platforms now face enhanced scrutiny regarding data collection practices, algorithmic transparency, and user consent mechanisms. The Personal Data Protection Bill, currently under parliamentary consideration, seeks to operationalize these constitutional principles through comprehensive regulatory frameworks.

However, implementation challenges persist. Balancing national security imperatives with individual privacy rights requires nuanced approaches that neither compromise legitimate governance needs nor undermine constitutional protections. The European Union's General Data Protection Regulation (GDPR) serves as both inspiration and cautionary tale, demonstrating the complexities of comprehensive data protection legislation.

Furthermore, the digital divide in India complicates the privacy discourse. While urban, educated populations advocate for stringent privacy protections, rural communities often prioritize access over privacy. This dichotomy reflects broader socio-economic disparities that any privacy framework must address.

The role of judiciary in interpreting and enforcing digital rights remains crucial. Courts must navigate between technological innovation and constitutional values, ensuring that privacy rights evolve with changing digital landscapes while maintaining core constitutional principles.`,
    vocabulary: [
      {
        word: "paradigms",
        definition: "A typical example or pattern of something; a model or framework of concepts",
        context: "created new paradigms for how technology companies interact",
        etymology: "From Greek 'paradeigma' meaning 'pattern, example'",
        difficulty: "advanced"
      },
      {
        word: "intrinsic",
        definition: "Belonging naturally; essential; inherent to the basic nature of something",
        context: "privacy is intrinsic to life and liberty",
        etymology: "From Latin 'intrinsecus' meaning 'inwardly, on the inside'",
        difficulty: "intermediate"
      },
      {
        word: "operationalize",
        definition: "To put into operation; to make functional or practical",
        context: "seeks to operationalize these constitutional principles",
        etymology: "From Latin 'operari' meaning 'to work'",
        difficulty: "advanced"
      },
      {
        word: "nuanced",
        definition: "Characterized by subtle shades of meaning or expression",
        context: "requires nuanced approaches",
        etymology: "From French 'nuance' meaning 'shade, subtle difference'",
        difficulty: "intermediate"
      }
    ],
    aiQuestions: [
      {
        id: 1,
        question: "What fundamental change did the Puttaswamy judgment bring to Indian constitutional law?",
        type: "comprehension",
        difficulty: "medium",
        options: [
          "It restricted government surveillance powers",
          "It recognized privacy as a fundamental right under Article 21",
          "It banned data collection by private companies",
          "It created new courts for digital rights cases"
        ],
        correct: 1,
        explanation: "The Puttaswamy judgment was landmark because it established privacy as a fundamental right under Article 21 of the Constitution, fundamentally transforming India's approach to digital privacy rights.",
        aiReasoning: "This question tests comprehension of the main constitutional development discussed in the passage.",
        points: 5
      },
      {
        id: 2,
        question: "According to the passage, what does 'surveillance capitalism' primarily refer to?",
        type: "inference",
        difficulty: "hard",
        options: [
          "Government monitoring of financial transactions",
          "The use of surveillance technology in businesses",
          "The unchecked collection of personal data for commercial purposes",
          "Capitalist systems that rely on government surveillance"
        ],
        correct: 2,
        explanation: "The passage mentions 'surveillance capitalism and the unchecked collection of personal data by both state and non-state actors,' indicating it refers to the systematic collection of personal data, particularly by commercial entities.",
        aiReasoning: "This requires inferring the meaning of a complex term from context clues in the passage.",
        points: 7
      },
      {
        id: 3,
        question: "What does the passage suggest about the relationship between the digital divide and privacy discourse in India?",
        type: "analysis",
        difficulty: "hard",
        options: [
          "Rural communities are more concerned about privacy than urban populations",
          "The digital divide has no impact on privacy discussions",
          "Urban populations prioritize privacy while rural communities prioritize access",
          "Both urban and rural populations equally value privacy protections"
        ],
        correct: 2,
        explanation: "The passage explicitly states that 'while urban, educated populations advocate for stringent privacy protections, rural communities often prioritize access over privacy,' highlighting this dichotomy.",
        aiReasoning: "This question tests the ability to analyze the relationship between different concepts discussed in the passage.",
        points: 8
      },
      {
        id: 4,
        question: "The passage mentions GDPR as both 'inspiration and cautionary tale.' What does this suggest?",
        type: "interpretation",
        difficulty: "medium",
        options: [
          "GDPR has been completely successful in protecting privacy",
          "GDPR provides a model but also demonstrates implementation challenges",
          "GDPR should be exactly replicated in India",
          "GDPR has failed to protect any privacy rights"
        ],
        correct: 1,
        explanation: "By calling GDPR both 'inspiration and cautionary tale,' the passage suggests it provides lessons on what works (inspiration) and what challenges exist (cautionary tale) in comprehensive data protection legislation.",
        aiReasoning: "This tests the ability to interpret metaphorical language and understand nuanced positions.",
        points: 6
      },
      {
        id: 5,
        question: "Based on the passage, what role should the judiciary play in digital rights?",
        type: "synthesis",
        difficulty: "hard",
        options: [
          "Completely defer to technological innovation",
          "Focus only on constitutional values, ignoring technology",
          "Balance technological innovation with constitutional values",
          "Create new constitutional principles for digital age"
        ],
        correct: 2,
        explanation: "The passage states that courts must 'navigate between technological innovation and constitutional values,' indicating the need for balance rather than prioritizing one over the other.",
        aiReasoning: "This requires synthesizing information about the judiciary's role from different parts of the passage.",
        points: 9
      }
    ],
    readingTips: [
      "Pay attention to legal terminology and constitutional concepts",
      "Note the balance between different stakeholder interests",
      "Identify cause-and-effect relationships in policy implementation"
    ],
    difficultyFactors: [
      "Complex legal concepts",
      "Multiple stakeholder perspectives",
      "Abstract constitutional principles"
    ]
  },
  {
    id: 2,
    title: "Climate Change and Intergenerational Justice",
    type: "Current Affairs",
    source: "Environmental Law Review - 2024",
    difficulty: "Intermediate",
    estimatedTime: "5-7 minutes",
    wordCount: 445,
    tags: ["Environment", "Climate Change", "Justice", "Future Generations"],
    aiComplexity: 7.2,
    text: `Climate change litigation has emerged as a powerful tool for enforcing environmental obligations and protecting intergenerational equity. Courts worldwide increasingly recognize that present-day carbon emissions create legally cognizable harms for future generations, challenging traditional notions of standing and remedy in environmental law.

The landmark Urgenda decision by the Dutch Supreme Court exemplifies this trend. The court held that the Netherlands government had a legal duty to reduce greenhouse gas emissions by at least 25% by 2020, based on human rights obligations to protect citizens from climate change impacts. This decision broke new ground by establishing that governments have enforceable legal duties to protect citizens from climate change.

Similar litigation strategies have gained traction globally. In Germany, the Federal Constitutional Court ruled that insufficient climate action violates the rights of younger generations. The court emphasized that current emissions consume the limited carbon budget available for future decades, thereby restricting the freedom of future generations to make their own choices about energy use and lifestyle.

The theoretical foundation of such cases rests on the concept of intergenerational equity, which suggests that each generation holds the Earth in trust for future ones. This principle challenges traditional legal frameworks that typically require plaintiffs to demonstrate immediate, concrete harm. Climate litigation pushes courts to recognize that future, probabilistic harms can justify present legal action.

India faces unique challenges in climate litigation. While the country contributes relatively little to historical emissions, it experiences severe climate impacts affecting millions of vulnerable citizens. Indian courts have begun to grapple with these issues, though the legal framework remains evolving. The tension between development needs and environmental protection creates complex judicial considerations that require balancing immediate economic needs against long-term environmental sustainability.`,
    vocabulary: [
      {
        word: "cognizable",
        definition: "Capable of being perceived, known, or legally recognized",
        context: "create legally cognizable harms for future generations",
        etymology: "From Latin 'cognoscere' meaning 'to get to know'",
        difficulty: "intermediate"
      },
      {
        word: "intergenerational",
        definition: "Existing or occurring between different generations",
        context: "protecting intergenerational equity",
        etymology: "From Latin 'inter' (between) + 'generatio' (generation)",
        difficulty: "intermediate"
      },
      {
        word: "probabilistic",
        definition: "Based on or adapted to a theory of probability; subject to chance",
        context: "future, probabilistic harms can justify present legal action",
        etymology: "From Latin 'probabilis' meaning 'probable'",
        difficulty: "advanced"
      }
    ],
    aiQuestions: [
      {
        id: 1,
        question: "What legal innovation do climate change cases represent according to the passage?",
        type: "comprehension",
        difficulty: "medium",
        options: [
          "Recognition of future, probabilistic harms as grounds for legal action",
          "Creation of new environmental courts",
          "Mandatory carbon pricing mechanisms",
          "International climate treaties with legal force"
        ],
        correct: 0,
        explanation: "The passage states that climate litigation 'pushes courts to recognize that future, probabilistic harms can justify present legal action,' which challenges traditional requirements for immediate, concrete harm.",
        aiReasoning: "This tests understanding of how climate litigation changes traditional legal concepts.",
        points: 6
      },
      {
        id: 2,
        question: "How does the concept of intergenerational equity challenge traditional legal frameworks?",
        type: "analysis",
        difficulty: "hard",
        options: [
          "It requires international cooperation on all legal matters",
          "It challenges the requirement for plaintiffs to show immediate, concrete harm",
          "It eliminates the need for evidence in environmental cases",
          "It gives future generations voting rights in current elections"
        ],
        correct: 1,
        explanation: "The passage explains that intergenerational equity 'challenges traditional legal frameworks that typically require plaintiffs to demonstrate immediate, concrete harm.'",
        aiReasoning: "This requires analyzing how new legal concepts challenge existing frameworks.",
        points: 8
      },
      {
        id: 3,
        question: "What makes India's position in climate litigation unique according to the passage?",
        type: "comprehension",
        difficulty: "medium",
        options: [
          "India has the most advanced climate laws globally",
          "India contributes little to historical emissions but faces severe impacts",
          "India refuses to participate in international climate agreements",
          "India has banned all climate litigation in its courts"
        ],
        correct: 1,
        explanation: "The passage explicitly states that 'India contributes relatively little to historical emissions, it experiences severe climate impacts affecting millions of vulnerable citizens.'",
        aiReasoning: "This tests comprehension of India's specific circumstances in climate issues.",
        points: 5
      }
    ],
    readingTips: [
      "Focus on the evolution of legal concepts",
      "Understand the relationship between present actions and future consequences",
      "Note how different countries approach similar legal challenges"
    ],
    difficultyFactors: [
      "Abstract legal concepts",
      "Temporal relationships between causes and effects",
      "International comparative law"
    ]
  },
  {
    id: 3,
    title: "The Evolution of Artificial Intelligence in Legal Practice",
    type: "Current Affairs",
    source: "Legal Technology Quarterly - 2024",
    difficulty: "Advanced",
    estimatedTime: "7-9 minutes",
    wordCount: 598,
    tags: ["Technology", "Legal Practice", "AI", "Ethics"],
    aiComplexity: 8.8,
    text: `The integration of artificial intelligence into legal practice represents one of the most significant transformations in the profession's history. From contract analysis to predictive litigation outcomes, AI technologies are reshaping how lawyers work, how justice is administered, and how legal services are delivered to society.

Machine learning algorithms now excel at document review, a task traditionally requiring thousands of hours of junior lawyer time. These systems can process vast quantities of legal documents, identifying relevant precedents, extracting key clauses, and flagging potential issues with accuracy rates that often exceed human performance. The economic implications are profound: what once required teams of lawyers can now be accomplished by sophisticated software in a fraction of the time.

However, the rise of AI in law raises fundamental questions about the nature of legal reasoning itself. Can algorithms truly understand the nuanced interpretation of legal texts that forms the cornerstone of jurisprudence? Legal reasoning often requires contextual understanding, ethical judgment, and the ability to analogize between different factual scenarios—capabilities that remain challenging for artificial intelligence systems.

The regulatory response has been cautious but increasingly structured. Legal professional bodies worldwide are developing guidelines for AI use, focusing on issues of accountability, transparency, and professional responsibility. The fundamental question is not whether lawyers should use AI, but how they can do so while maintaining their professional obligations to clients and the justice system.

Predictive analytics represents another frontier where AI is making significant inroads. By analyzing patterns in judicial decisions, these systems can estimate the likelihood of success in various types of litigation. While this capability offers valuable strategic insights, it also raises concerns about creating self-fulfilling prophecies that could systematize bias present in historical judicial data.

The democratization of legal services through AI presents both opportunities and challenges. On one hand, AI-powered legal tools could make basic legal services more accessible to underserved populations, potentially addressing the justice gap that leaves many without adequate legal representation. On the other hand, the replacement of human judgment with algorithmic decision-making in legal contexts raises profound questions about fairness, accountability, and the role of human agency in justice systems.

Furthermore, the international dimension of AI regulation in legal practice adds complexity to an already challenging landscape. Different jurisdictions are taking varying approaches to AI governance, creating potential conflicts for law firms operating across borders and raising questions about the harmonization of professional standards in an increasingly interconnected world.`,
    vocabulary: [
      {
        word: "jurisprudence",
        definition: "The theory or philosophy of law; legal science",
        context: "forms the cornerstone of jurisprudence",
        etymology: "From Latin 'juris prudentia' meaning 'knowledge of law'",
        difficulty: "advanced"
      },
      {
        word: "analogize",
        definition: "To draw parallels or make comparisons between different things",
        context: "the ability to analogize between different factual scenarios",
        etymology: "From Greek 'analogia' meaning 'proportion, analogy'",
        difficulty: "intermediate"
      },
      {
        word: "democratization",
        definition: "The process of making something accessible to everyone",
        context: "The democratization of legal services through AI",
        etymology: "From Greek 'demokratia' meaning 'rule by the people'",
        difficulty: "intermediate"
      },
      {
        word: "systematize",
        definition: "To arrange according to a system; to make systematic",
        context: "could systematize bias present in historical judicial data",
        etymology: "From Greek 'systema' meaning 'organized whole'",
        difficulty: "advanced"
      }
    ],
    aiQuestions: [
      {
        id: 1,
        question: "According to the passage, what is the main advantage of AI in document review?",
        type: "comprehension",
        difficulty: "easy",
        options: [
          "It eliminates the need for lawyers entirely",
          "It processes documents faster and often more accurately than humans",
          "It makes legal documents easier to understand for clients",
          "It reduces the cost of legal education"
        ],
        correct: 1,
        explanation: "The passage states that AI systems 'can process vast quantities of legal documents...with accuracy rates that often exceed human performance' and do so 'in a fraction of the time.'",
        aiReasoning: "This is a straightforward comprehension question about explicitly stated benefits.",
        points: 4
      },
      {
        id: 2,
        question: "What fundamental challenge does AI pose to legal reasoning according to the passage?",
        type: "analysis",
        difficulty: "hard",
        options: [
          "AI is too expensive for most law firms",
          "AI cannot understand contextual and ethical aspects of legal interpretation",
          "AI processes information too slowly for legal deadlines",
          "AI cannot read legal documents accurately"
        ],
        correct: 1,
        explanation: "The passage questions whether 'algorithms truly understand the nuanced interpretation of legal texts' and notes that legal reasoning requires 'contextual understanding, ethical judgment, and the ability to analogize'—capabilities that 'remain challenging for artificial intelligence systems.'",
        aiReasoning: "This requires analyzing the deeper philosophical challenges AI poses to legal practice.",
        points: 8
      },
      {
        id: 3,
        question: "How might predictive analytics create 'self-fulfilling prophecies' in the legal system?",
        type: "inference",
        difficulty: "hard",
        options: [
          "By making litigation outcomes completely predictable",
          "By reinforcing historical biases present in judicial data",
          "By replacing judges with AI systems",
          "By making legal education unnecessary"
        ],
        correct: 1,
        explanation: "The passage suggests that predictive systems analyzing 'patterns in judicial decisions' could 'systematize bias present in historical judicial data,' meaning they might perpetuate and reinforce existing biases rather than eliminate them.",
        aiReasoning: "This requires inferring the mechanism by which predictive systems might create problematic feedback loops.",
        points: 9
      }
    ],
    readingTips: [
      "Consider both benefits and risks of technological advancement",
      "Pay attention to philosophical questions about the nature of legal reasoning",
      "Note the global/international dimensions of technological regulation"
    ],
    difficultyFactors: [
      "Complex technological concepts",
      "Philosophical questions about artificial intelligence",
      "Multiple stakeholder perspectives",
      "International regulatory considerations"
    ]
  }
];

// Comprehensive challenges database
export const challengesDatabase = [
  {
    id: 1,
    title: "Speed Reading Sprint",
    description: "Read 5 passages in under 30 minutes with 80%+ accuracy",
    difficulty: "Intermediate",
    reward: 100,
    progress: 3,
    total: 5,
    type: "speed",
    timeLimit: 30,
    requirements: {
      minAccuracy: 80,
      timeLimit: 30 * 60,
      passageCount: 5
    },
    completionCriteria: "Complete 5 passages within time limit while maintaining accuracy",
    icon: "⚡",
    category: "Reading Speed",
    startDate: "2024-01-20",
    endDate: "2024-01-27",
    participants: 1247,
    leaderboard: [
      { rank: 1, name: "Legal Eagle", time: "24:15", accuracy: 92 },
      { rank: 2, name: "Speed Reader", time: "25:33", accuracy: 89 },
      { rank: 3, name: "CLAT Master", time: "26:12", accuracy: 87 }
    ],
    completed: false,
    claimed: false
  },
  {
    id: 2,
    title: "Vocabulary Master",
    description: "Learn and master 25 new legal terms this week",
    difficulty: "Beginner",
    reward: 150,
    progress: 18,
    total: 25,
    type: "vocabulary",
    requirements: {
      newWords: 25,
      masteryLevel: 'learning',
      timeframe: 7 * 24 * 60 * 60 * 1000
    },
    completionCriteria: "Learn 25 new words with at least 'learning' mastery level",
    icon: "📚",
    category: "Vocabulary Building",
    deadline: "3 days left",
    bonusReward: 50,
    relatedSkills: ["Legal terminology", "Etymology", "Context usage"],
    completed: false,
    claimed: false
  },
  {
    id: 3,
    title: "Comprehension Champion",
    description: "Score 90%+ accuracy on 10 different reading passages",
    difficulty: "Advanced",
    reward: 200,
    progress: 7,
    total: 10,
    type: "comprehension",
    requirements: {
      minAccuracy: 90,
      passageCount: 10,
      uniquePassages: true
    },
    completionCriteria: "Achieve 90%+ accuracy on 10 unique passages",
    icon: "🎯",
    category: "Reading Comprehension",
    streakBonus: true,
    difficultyMultiplier: {
      'Beginner': 1.0,
      'Intermediate': 1.2,
      'Advanced': 1.5
    },
    completed: false,
    claimed: false
  },
  {
    id: 4,
    title: "GK Guru",
    description: "Answer 100 General Knowledge questions correctly",
    difficulty: "Intermediate",
    reward: 120,
    progress: 67,
    total: 100,
    type: "gk",
    requirements: {
      correctAnswers: 100,
      minAccuracy: 75,
      categoryDiversity: 5
    },
    completionCriteria: "Answer 100 GK questions correctly with 75%+ overall accuracy",
    icon: "🌍",
    category: "General Knowledge",
    categoryProgress: {
      'Current Affairs': 15,
      'History': 12,
      'Polity': 18,
      'Economics': 10,
      'Legal Awareness': 12
    },
    completed: false,
    claimed: false
  },
  {
    id: 5,
    title: "Daily Streak Warrior",
    description: "Maintain a 21-day study streak",
    difficulty: "Intermediate",
    reward: 300,
    progress: 12,
    total: 21,
    type: "streak",
    requirements: {
      consecutiveDays: 21,
      minDailyActivity: 30 * 60,
      allowedMisses: 1
    },
    completionCriteria: "Study for at least 30 minutes daily for 21 consecutive days",
    icon: "🔥",
    category: "Consistency",
    currentStreak: 12,
    longestStreak: 15,
    streakMultiplier: 1.1,
    completed: false,
    claimed: false
  },
  {
    id: 6,
    title: "Legal Eagle",
    description: "Master all legal terminology in the advanced vocabulary set",
    difficulty: "Expert",
    reward: 500,
    progress: 45,
    total: 75,
    type: "mastery",
    requirements: {
      legalTerms: 75,
      masteryLevel: 'mastered',
      includeEtymology: true,
      practicalApplication: true
    },
    completionCriteria: "Master 75 legal terms with etymology and practical usage",
    icon: "⚖️",
    category: "Legal Mastery",
    prerequisites: ["Vocabulary Master"],
    unlockLevel: 4,
    expertBonus: 200,
    completed: false,
    claimed: false
  },
  {
    id: 7,
    title: "Analysis Ace",
    description: "Excel in analytical reasoning across 15 complex passages",
    difficulty: "Advanced",
    reward: 250,
    progress: 8,
    total: 15,
    type: "analysis",
    requirements: {
      analyticalQuestions: 45,
      minAccuracy: 85,
      complexityLevel: 'advanced',
      reasoningTypes: ['inference', 'analysis', 'synthesis']
    },
    completionCriteria: "Answer analytical questions with 85%+ accuracy on advanced passages",
    icon: "🧠",
    category: "Critical Thinking",
    skillAreas: ["Logical reasoning", "Critical analysis", "Inference making"],
    progressBreakdown: {
      inference: 3,
      analysis: 2,
      synthesis: 3
    },
    completed: false,
    claimed: false
  }
];