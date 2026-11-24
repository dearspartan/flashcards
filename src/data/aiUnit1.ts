import type { Flashcard } from '../types';

export const AI_UNIT_1_CARDS: Flashcard[] = [
  {
    id: 'ai-u1-q1',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Definition of AI',
    question: 'Define Artificial Intelligence.',
    answer: 'Artificial Intelligence (AI) is the branch of computer science concerned with building systems capable of performing tasks that typically require human intelligence, such as visual perception, speech recognition, reasoning, problem-solving, and decision-making.',
    keyPoints: [
      'Study of agents that receive percepts from the environment and perform actions',
      'Aims to emulate human cognitive functions or achieve rational behavior',
      'Defined along two dimensions: human vs. rational, thinking vs. acting'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q2',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Four AI Approaches',
    question: 'Name the four approaches to defining AI (thinking/acting, humanly/rationally).',
    answer: 'The four classical approaches defined by Russell & Norvig are:\n1. Thinking Humanly (Cognitive Modeling Approach)\n2. Acting Humanly (Turing Test Approach)\n3. Thinking Rationally (Laws of Thought / Logic Approach)\n4. Acting Rationally (Rational Agent Approach - modern standard).',
    keyPoints: [
      'Thinking Humanly: cognitive science, psychological models',
      'Acting Humanly: behavioral test against human judges (Turing test)',
      'Thinking Rationally: deductive logic, syllogisms, guaranteed correct inferences',
      'Acting Rationally: maximizing expected utility given available percepts'
    ],
    diagram: `+-----------------------+-----------------------+
|   THINKING HUMANLY    |  THINKING RATIONALLY  |
|  (Cognitive Science)  |   (Laws of Thought)   |
+-----------------------+-----------------------+
|    ACTING HUMANLY     |   ACTING RATIONALLY   |
|     (Turing Test)     |    (Rational Agent)   |
+-----------------------+-----------------------+`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q3',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Turing Test',
    question: 'What is the Turing Test and what does it test?',
    answer: 'Proposed by Alan Turing in 1950 (The Imitation Game), the Turing Test measures whether a computer can exhibit intelligent behavior indistinguishable from that of a human through natural language conversation across a text-only tele-type interface.',
    keyPoints: [
      'Tests operational indistinguishability rather than physical appearance',
      'Human interrogator questions an unseen human and machine',
      'Machine passes if interrogator cannot reliably tell which is human'
    ],
    diagram: `[ Human Interrogator (C) ]
          |  (Text Only Interface)
      +---+---+
      |       |
    [ A ]   [ B ]  -> One is AI, one is Human`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q4',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Turing Test Capabilities',
    question: 'List the capabilities a machine needs to pass the Turing Test.',
    answer: 'To pass the standard and Total Turing Test, a machine requires:\n1. Natural Language Processing (NLP) - communicate in English/human language\n2. Knowledge Representation - store what it knows or hears\n3. Automated Reasoning - use stored information to answer questions\n4. Machine Learning - adapt to new circumstances and extrapolate patterns\n5. Computer Vision & Robotics (Total Turing Test) - perceive objects and manipulate them.',
    keyPoints: [
      'Standard Test: NLP, Knowledge Representation, Reasoning, Machine Learning',
      'Total Turing Test adds Computer Vision and Robotics for physical interaction'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q5',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Foundations of AI',
    question: 'Which fields form the foundations of AI?',
    answer: 'The foundational disciplines of AI are:\n1. Philosophy (logic, mind-body, knowledge theory)\n2. Mathematics (logic, probability, computability, algorithms)\n3. Economics (utility theory, game theory, decision making)\n4. Neuroscience (biological neural architectures)\n5. Psychology (cognitive psychology, perception)\n6. Computer Engineering (hardware, fast processing)\n7. Control Theory & Cybernetics (feedback, stable systems)\n8. Linguistics (computational linguistics, grammar syntax).',
    keyPoints: [
      'Interdisciplinary genesis spanning over two millennia of thought',
      'Computer Science provides the computational medium to realize theories'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q6',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Philosophy Contribution',
    question: 'How did philosophy contribute to AI?',
    answer: 'Philosophy established foundational questions: Can a physical system think? How does the mind arise from matter (dualism vs materialism)? It also invented formal logic (Aristotle\'s syllogisms), epistemology (nature of knowledge), and the connection between knowledge and intentional action.',
    keyPoints: [
      'Aristotle: formulated laws of deductive syllogisms',
      'Descartes: mind-body dualism problem',
      'Empiricism (Locke, Hume): knowledge originates from sensory experience'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q7',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Mathematics Contribution',
    question: 'How did mathematics contribute to AI?',
    answer: 'Mathematics provided three critical pillars:\n1. Formal Logic: Boolean logic, propositional and first-order predicate calculus\n2. Computability & Complexity: Turing machines, undecidability (Halting problem), P vs NP classes\n3. Probability & Statistics: Bayes\' rule, handling uncertainty, decision theory.',
    keyPoints: [
      'George Boole & Frege: formal symbolic logic',
      'Alan Turing & Gödel: limits of what can be computed (Incompleteness Theorem)',
      'Thomas Bayes: probabilistic inference under uncertain percepts'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q8',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Neuroscience Contribution',
    question: 'How did neuroscience contribute to AI?',
    answer: 'Neuroscience provided the biological inspiration for artificial neural networks. It demonstrated that human thought, memory, and perception emerge from vast interconnected networks of electrochemical biological neurons transmitting action potentials.',
    keyPoints: [
      'McCulloch & Pitts (1943): first mathematical model of an artificial neuron',
      'Hebb (1949): Hebbian learning ("neurons that fire together, wire together")',
      'Inspired deep learning, perceptrons, and backpropagation architectures'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q9',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Psychology Contribution',
    question: 'How did psychology contribute to AI?',
    answer: 'Psychology shifted AI from pure behaviorism (stimulus-response) to cognitive psychology, establishing that humans internally process information like a computer using representations, memory stages, mental models, and heuristics.',
    keyPoints: [
      'Cognitive Psychology (Craik, Miller): minds process internal information',
      'Helped design human-like reasoning and expert rule-based reasoning engines'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q10',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Computer Engineering Contribution',
    question: 'How did computer engineering contribute to AI?',
    answer: 'Computer engineering supplied the essential programmable physical hardware, high-speed microprocessors, GPUs/TPUs, large memory storage, and modern operating systems necessary to execute complex AI search algorithms and train massive neural models.',
    keyPoints: [
      'Moore\'s Law drove exponential compute expansion',
      'Parallel processing and specialized hardware accelerators enabled modern Deep Learning'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q11',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Coined Term AI',
    question: 'Who coined the term "Artificial Intelligence" and in which year?',
    answer: 'John McCarthy coined the term "Artificial Intelligence" in 1955 in his funding proposal for the seminal 1956 Dartmouth Summer Research Project on Artificial Intelligence.',
    keyPoints: [
      'John McCarthy (father of AI, also invented LISP language)',
      'Year: 1956 (Dartmouth Conference)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q12',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Dartmouth Conference 1956',
    question: 'What was the Dartmouth Conference of 1956?',
    answer: 'The Dartmouth Summer Research Project on Artificial Intelligence (1956) was a 2-month workshop organized by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon. It is universally celebrated as the official birthplace of AI as an independent scientific discipline.',
    keyPoints: [
      'First introduced the Logic Theorist program (Newell & Simon) which proved mathematical theorems',
      'Affirmed the assertion that every aspect of learning can be so precisely described that a machine can simulate it'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q13',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'AI Winter',
    question: 'What was the "AI winter"?',
    answer: 'An "AI Winter" refers to historical periods of severe disillusionment, reduced funding, and halted research resulting from inflated, unmet promises. Two major winters occurred:\n1. 1974–1980 (following Lighthill report and failure of early machine translation)\n2. 1987–1993 (collapse of the specialized LISP machine and commercial expert systems market).',
    keyPoints: [
      'Triggered by overhyped claims, combinatorial explosion, and brittle rule-based models',
      'Replaced in the 1990s by statistical and probabilistic approaches'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q14',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Expert Systems Era',
    question: 'Name two milestones from the expert systems era.',
    answer: 'Two prominent expert systems milestones are:\n1. DENDRAL (1965): Inferred molecular chemical structures from mass spectrometer data using heuristic rules.\n2. MYCIN (1976): Diagnosed blood-borne infectious diseases and prescribed antibiotic dosages using ~450 IF-THEN certainty factor rules.\n(Bonus: R1 / XCON at DEC configured VAX computer orders, saving millions annually).',
    keyPoints: [
      'Transitioned AI from domain-independent general solvers to domain-specific knowledge bases',
      'Proved commercial viability of knowledge engineering'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q15',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Narrow AI vs AGI',
    question: 'What is the difference between narrow AI and general AI?',
    answer: '1. Narrow AI (Weak AI): Systems designed and trained to perform a single specific dedicated task (e.g., chess engine, spam filter, face recognition, autonomous driving). All existing AI systems today are Narrow AI.\n2. Artificial General Intelligence (AGI / Strong AI): Theoretical AI possessing human-level cognitive breadth, capable of understanding, learning, abstracting, and transferring knowledge across any intellectual task.',
    keyPoints: [
      'Narrow AI lacks general common sense and cannot transfer knowledge across unrelated domains',
      'AGI exhibits consciousness, self-directed learning, and universal adaptability'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q16',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Limits of AI Today',
    question: 'List five limits of AI today.',
    answer: 'Five major limitations of current AI systems are:\n1. Lack of Common Sense Reasoning: Struggles with everyday physical and intuitive knowledge\n2. Hallucinations & Brittleness: Confident generation of false or nonsensical facts\n3. High Data & Energy Hunger: Requires enormous labeled datasets and immense compute power\n4. Black-Box Opacity: Lack of transparent, human-interpretable reasoning paths\n5. Vulnerability to Adversarial Attacks: Slight imperceptible input perturbations can fool deep networks.',
    keyPoints: [
      'Cannot perform causal reasoning (correlational rather than causal)',
      'Lacks emotional empathy and genuine moral awareness'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q17',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Ethical Issues in AI',
    question: 'Name three ethical issues in AI.',
    answer: 'Three key ethical issues are:\n1. Algorithmic Bias & Discrimination: Encoding and amplifying societal prejudices in hiring, lending, or justice systems\n2. Privacy & Surveillance: Mass harvesting of personal data and facial surveillance without consent\n3. Accountability & Liability: Ambiguity over who is responsible when autonomous agents cause harm (e.g., self-driving car crashes, medical misdiagnosis).',
    keyPoints: [
      'Job displacement and economic inequality',
      'Deepfakes, misinformation, and weaponization of autonomous drones'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q18',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Algorithmic Bias',
    question: 'What is algorithmic bias? Give an example.',
    answer: 'Algorithmic bias occurs when an AI system produces systematically unfair, skewed, or discriminatory outcomes due to unrepresentative training data, flawed feature selection, or developer prejudices.\nExample: Facial recognition systems exhibiting significantly higher error rates on dark-skinned females compared to light-skinned males due to unrepresentative training datasets (e.g., Joy Buolamwini\'s Gender Shades study).',
    keyPoints: [
      'Training data reflects historical societal disparities (Garbage In, Bias Out)',
      'Example 2: COMPAS recidivism prediction tool showing racial disparities'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q19',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Explainability in AI',
    question: 'Why is explainability important in AI?',
    answer: 'Explainability (XAI) is critical because it transforms opaque "black-box" models into transparent, interpretable systems. It enables:\n1. Human Trust & Verification in high-stakes fields (medicine, criminal justice, aviation)\n2. Debugging & Bias Detection to ensure decisions rely on sound causal features\n3. Regulatory Compliance with laws like GDPR ("Right to an Explanation").',
    keyPoints: [
      'Allows domain experts to audit why an agent chose action A over action B',
      'Distinguishes correlation from genuine causative rationale'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q20',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Risks and Benefits of AI',
    question: 'State two potential risks and two benefits of AI.',
    answer: 'Benefits:\n1. Healthcare Breakthroughs: Rapid disease diagnosis and AI-assisted drug discovery (e.g. AlphaFold).\n2. Automation & Productivity: Eliminates hazardous, repetitive tasks and boosts industrial efficiency.\n\nRisks:\n1. Mass Job Displacement: Structural workforce disruption across cognitive and physical sectors.\n2. Autonomous Weapons & Misuse: Deployment of lethal autonomous weapons and AI-generated disinformation at scale.',
    keyPoints: [
      'Benefits: 24/7 reliability, superhuman processing of massive unstructured datasets',
      'Risks: existential alignment risk, algorithmic opacity, erosion of human agency'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q21',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Advantages and Disadvantages of AI',
    question: 'List three advantages and three disadvantages of AI.',
    answer: 'Advantages:\n1. High Accuracy & Speed: Processes complex data with minimal mathematical error\n2. 24/7 Availability: Operates continuously without fatigue, boredom, or emotional stress\n3. Hazard Reduction: Performs dangerous tasks like space exploration, bomb disposal, and deep-sea mining.\n\nDisadvantages:\n1. High Capital Cost: Massive infrastructure, compute, and maintenance expenditures\n2. Lack of Human Empathy/Creativity: Incapable of genuine moral judgment or intuitive emotion\n3. Dependency & Unemployment: Over-reliance reduces human cognitive skills and causes job displacement.',
    keyPoints: [
      'Advantages: superhuman pattern recognition, operational scalability',
      'Disadvantages: black-box fragility, high compute energy carbon footprint'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q22',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Future Directions of AI',
    question: 'Name three future directions of AI.',
    answer: 'Three key future frontiers of AI research are:\n1. Neuro-Symbolic AI: Combining statistical deep learning with symbolic logic to achieve robust reasoning and common sense\n2. Explainable & Safe AI (AI Alignment): Designing verifiable agents provably aligned with human ethical values and transparent reasoning\n3. Quantum AI & Neuromorphic Computing: Utilizing quantum superposition and brain-inspired spike chips to process data at ultra-low energy.',
    keyPoints: [
      'Embodied AI & Humanoid Robotics: Seamless physical world navigation',
      'Self-Supervised & Continual Learning without catastrophic forgetting'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q23',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Components of AI System',
    question: 'List the main components of an AI system.',
    answer: 'The primary components of an intelligent AI system are:\n1. Perception Subsystem: Sensors/data ingestion (computer vision, speech, text parsing)\n2. Knowledge Base & Memory: Structured storage of facts, rules, and experiential state\n3. Inference / Reasoning Engine: Algorithms that deduce conclusions and plan action sequences\n4. Learning Component: Updates parameters based on feedback to improve future performance\n5. Actuation Subsystem: Actuators/output generators (robotic limbs, screens, APIs).',
    keyPoints: [
      'Perception -> Cognition/Reasoning -> Learning -> Action loop',
      'Surrounded by a task environment interacting via sensors and actuators'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q24',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'AI Architecture',
    question: 'What is an AI architecture? Name two types.',
    answer: 'An AI architecture is the structural blueprint describing how software algorithms, knowledge representations, sensory processing, and actuation mechanisms are organized to produce intelligent behavior.\nTwo prominent types are:\n1. Deliberative (Symbolic / Classical) Architecture: Maintains an internal symbolic world model and searches/plans before acting (e.g., SOAR, BDI).\n2. Reactive (Subsumption) Architecture: Direct tight coupling between sensors and actuators with no central world model (e.g., Rodney Brooks\' Subsumption architecture).',
    keyPoints: [
      'Hybrid architectures combine reactive low-level reflexes with deliberative high-level planning'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q25',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Definition of Agent',
    question: 'Define an agent.',
    answer: 'An agent is anything that can be viewed as perceiving its environment through sensors and acting upon that environment through actuators.\nMathematically, an agent behavior is described by an agent function: f: P* -> A, which maps any given percept sequence P* to an action A.',
    keyPoints: [
      'Human agent: eyes/ears (sensors), hands/legs/vocal cords (actuators)',
      'Software agent: file contents, network packets, keystrokes (sensors), write files, send packets (actuators)'
    ],
    diagram: `        +---------------+
        |  ENVIRONMENT  |
        +---------------+
            |       ^
    Sensors |       | Actuators
            v       |
        +---------------+
        |     AGENT     |
        +---------------+`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q26',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Intelligent Agent',
    question: 'Define an intelligent agent.',
    answer: 'An intelligent agent (rational agent) is an autonomous entity that perceives its environment, reasons about goals, acts rationally to maximize its expected performance measure, and possesses the ability to learn and adapt to environmental changes over time.',
    keyPoints: [
      'Autonomy: behavior determined by own experience rather than solely built-in prior knowledge',
      'Goal-directed and capable of adapting to uncertain dynamics'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q27',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Sensors and Actuators',
    question: 'What are sensors and actuators? Give examples for a robot.',
    answer: '1. Sensors: Hardware devices or software inputs that detect physical stimuli and gather percepts from the environment.\nExamples for a robot: LiDAR, sonar, stereo cameras, infrared bumpers, gyroscopes, wheel encoders.\n\n2. Actuators: Mechanical or digital components that take action and induce changes in the environment.\nExamples for a robot: Electric servo motors, robotic gripper arms, wheels, steering mechanisms, audio speakers.',
    keyPoints: [
      'Sensors convert environmental state into digital percepts',
      'Actuators convert computational decisions into physical or environmental change'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q28',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Percept and Percept Sequence',
    question: 'What is a percept and a percept sequence?',
    answer: '1. Percept: The agent\'s perceptual sensory input at any single specific point in time (e.g., [Camera: Red Light, Speed: 40km/h]).\n2. Percept Sequence: The complete chronological history of everything the agent has ever perceived from initial startup up to the current moment. An agent\'s choice of action at any moment can depend on its entire percept sequence.',
    keyPoints: [
      'Percept = snapshot at time t',
      'Percept Sequence = [p_0, p_1, ..., p_t] (denoted P*)',
      'Agent function maps P* -> Action'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q29',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Agent Function vs Agent Program',
    question: 'What is an agent function versus an agent program?',
    answer: '1. Agent Function: An abstract mathematical formalization that maps any given percept sequence to an action: f: P* -> A. It is a conceptual specification of ideal behavior.\n2. Agent Program: The concrete software implementation of the agent function that runs on physical architecture/hardware: Agent = Architecture + Program.',
    keyPoints: [
      'Agent function is theoretical (can be an infinite lookup table)',
      'Agent program is real-world executable code operating under time and memory constraints'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q30',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'PEAS Framework',
    question: 'What does PEAS stand for?',
    answer: 'PEAS is the standard framework used to specify a task environment for an intelligent agent:\n• P: Performance Measure (criteria for success)\n• E: Environment (external world agent interacts with)\n• A: Actuators (output mechanisms to effect actions)\n• S: Sensors (input devices to capture percepts).',
    keyPoints: [
      'First step in designing any rational agent is specifying its PEAS environment',
      'Defines the problem before designing the agent architecture'
    ],
    diagram: `+-----------------------------------------------+
| P - Performance Measure (Safety, speed, cost) |
| E - Environment         (Roads, pedestrians)  |
| A - Actuators           (Steering, brake)     |
| S - Sensors             (Cameras, LiDAR)      |
+-----------------------------------------------+`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q31',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'PEAS for Self-Driving Taxi',
    question: 'Write the PEAS description for a self-driving taxi.',
    answer: '• Performance Measure: Safety, passenger comfort, fast trip time, legal compliance, maximized profit\n• Environment: Urban roads, highways, traffic, pedestrians, bad weather, traffic lights\n• Actuators: Steering wheel, accelerator, brake pedal, horn, turn signals, display screen\n• Sensors: Video cameras, LiDAR, radar, GPS, sonar bumpers, speedometer, odometer, engine sensors.',
    keyPoints: [
      'Complex multi-agent, stochastic, dynamic, continuous task environment'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q32',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'PEAS for Vacuum Cleaner',
    question: 'Write the PEAS description for a vacuum cleaner agent.',
    answer: '• Performance Measure: Cleanliness of floor, amount of dirt cleaned up, battery life conserved, minimal noise/time\n• Environment: Room floors, carpets, furniture, obstacles, stairs, charging dock\n• Actuators: Drive wheels, vacuum suction motor, rotating brushes, dirt release hatch\n• Sensors: Dirt detection sensor, infrared cliff sensor, bumper collision sensor, battery level monitor.',
    keyPoints: [
      'Classic 2-location vacuum world: Location [A, B] and Status [Clean, Dirty]'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q33',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'PEAS for Medical Diagnosis System',
    question: 'Write the PEAS description for a medical diagnosis system.',
    answer: '• Performance Measure: Healthy patient recovery, diagnosis accuracy, minimized costs and false positives/negatives\n• Environment: Hospital patients, lab staff, medical database, pharmacy\n• Actuators: Screen display with diagnosis report, recommended drug prescriptions, test orders\n• Sensors: Keyboard/touchscreen for entering symptoms, vital sign monitors, lab test results, imaging scans.',
    keyPoints: [
      'Partially observable, stochastic, sequential decision environment'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q34',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Performance Measure',
    question: 'What is a performance measure?',
    answer: 'A performance measure is an objective external standard used to evaluate how successfully an agent achieves its intended goals in the environment.\nRule of thumb: It should be designed according to what one actually wants in the environment, rather than how the agent believes it should behave.',
    keyPoints: [
      'Objective criterion external to agent\'s internal state',
      'Example: Cleanliness of floor over time, NOT number of times vacuum sucked dirt'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q35',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Definition of Rationality',
    question: 'Define rationality.',
    answer: 'Rationality means doing the "right thing"—specifically, selecting actions that are expected to maximize the agent\'s performance measure, given the evidence provided by its percept sequence and whatever built-in knowledge the agent possesses.',
    keyPoints: [
      'Rationality is relative to percept history and knowledge, not magical foresight',
      'Maximizes EXPECTED success, not actual guaranteed perfection'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q36',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'When is Agent Rational',
    question: 'When is an agent called rational?',
    answer: 'An agent is called rational if for each possible percept sequence, it selects an action that is expected to maximize its performance measure, based on four factors:\n1. The performance measure defining success criteria\n2. The agent\'s prior knowledge of the environment\n3. The actions that the agent can perform\n4. The agent\'s complete percept sequence to date.',
    keyPoints: [
      'Dependent on information gathering, exploration, and learning'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q37',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Rationality vs Omniscience',
    question: 'Difference between rationality and omniscience?',
    answer: '1. Omniscient Agent: Knows the actual future outcome of its actions and possesses all knowledge in the universe; impossible in reality.\n2. Rational Agent: Maximizes EXPECTED performance based on percepts received so far and available knowledge. An action may fail due to unpredictable chance, but the agent was still rational if it made the mathematically best choice under available data.',
    keyPoints: [
      'Omniscience = knowing everything (impossible)',
      'Rationality = making the optimal decision given what is known'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q38',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Rational vs Successful',
    question: 'Rational versus successful: are they the same?',
    answer: 'No, rationality and success are not the same. Rationality focuses on the decision-making process (expected outcome), while success is judged by the actual final outcome. An agent can act 100% rationally and still be unsuccessful due to unexpected bad luck or stochastic environmental events (e.g. crossing on green light and getting hit by a meteorite).',
    keyPoints: [
      'Rationality is ex-ante (before outcome is revealed)',
      'Success is ex-post (after the event occurs)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q39',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Five Types of Agents',
    question: 'List the five types of agents.',
    answer: 'The five fundamental agent architectures in increasing order of complexity and capability are:\n1. Simple Reflex Agents\n2. Model-Based Reflex Agents\n3. Goal-Based Agents\n4. Utility-Based Agents\n5. Learning Agents.',
    keyPoints: [
      'Form the hierarchy of agent designs in Russell & Norvig'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q40',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Simple Reflex Agent',
    question: 'Explain the simple reflex agent in two lines.',
    answer: 'A simple reflex agent selects actions based solely on the current percept, ignoring all historical percepts. It operates using condition-action rules: IF condition THEN action (e.g., IF car-ahead-brakes THEN apply-brakes).',
    keyPoints: [
      'No memory of past states',
      'Only succeeds in fully observable environments'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q41',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Pseudocode of Simple Reflex Agent',
    question: 'Write the pseudocode of a simple reflex agent.',
    answer: '```\nfunction SIMPLE-REFLEX-AGENT(percept) returns an action\n  persistent: rules, a set of condition-action rules\n\n  state <- INTERPRET-INPUT(percept)\n  rule <- RULE-MATCH(state, rules)\n  action <- rule.ACTION\n  return action\n```',
    keyPoints: [
      'INTERPRET-INPUT abstracts the raw sensory percept into a state description',
      'RULE-MATCH finds matching condition-action rule'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q42',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Why Simple Reflex Fails',
    question: 'Why do simple reflex agents fail in partially observable environments?',
    answer: 'In partially observable environments, the current percept does not contain complete information about the world state. Because simple reflex agents have no memory, identical percepts from different world states lead to the exact same action, inevitably trapping the agent in infinite loops.',
    keyPoints: [
      'Cannot distinguish between identical percepts having different histories',
      'Randomization of actions can sometimes break infinite loops'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q43',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Model-Based Reflex Agent',
    question: 'Explain the model-based reflex agent.',
    answer: 'A model-based reflex agent handles partial observability by maintaining an internal state that tracks unobserved parts of the world. It uses two models:\n1. Transition Model: How the world evolves independently and how agent actions affect it.\n2. Sensor Model: How the world state is reflected in sensory percepts.',
    keyPoints: [
      'Internal state represents current best estimate of actual world state',
      'Updates internal state before applying condition-action rules'
    ],
    diagram: `Sensors -> Percept -> Update State (using Transition/Sensor Model)
                          |
                          v
               Condition-Action Rules -> Actuators`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q44',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Internal State',
    question: 'What is "internal state" in a model-based agent?',
    answer: 'Internal state is a stored data representation of the world maintained inside the agent. It reflects the agent\'s current understanding of the environment, combining past percept history with background models to remember unperceived aspects of the world (e.g. keeping track of a car behind you in a blind spot).',
    keyPoints: [
      'Overcomes partial observability',
      'Requires transition model (how world changes) and sensor model (how state generates percepts)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q45',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Goal-Based Agent',
    question: 'Explain the goal-based agent and how it differs from a reflex agent.',
    answer: 'A goal-based agent combines current internal state with explicit goal information describing desirable target situations. It evaluates possible actions by asking: "What will happen if I do action X, and will it bring me closer to my goal?"\nDifference: Reflex agents rigidly execute hardcoded condition-action rules. Goal-based agents dynamically plan and search alternative paths, making them far more flexible when goals change.',
    keyPoints: [
      'Uses search and planning algorithms',
      'Easily adaptable by simply changing the target goal specification'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q46',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Utility-Based Agent',
    question: 'Explain the utility-based agent. Why use utility over goals?',
    answer: 'A utility-based agent maps states to real numbers using a utility function U(s), measuring "how happy" the agent will be in that state.\nWhy utility over goals?\n1. Trade-offs between conflicting goals (e.g., speed vs. fuel efficiency vs. safety)\n2. Handling uncertainty when no path guarantees 100% goal success (choosing action with highest expected utility).',
    keyPoints: [
      'Goal is binary (pass/fail), while utility is continuous (scalar quality measure)',
      'Acts under the Principle of Maximum Expected Utility (MEU)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q47',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Learning Agent',
    question: 'Explain the learning agent and name its four components.',
    answer: 'A learning agent operates in unfamiliar environments and improves its performance over time. Its four components are:\n1. Learning Element: Responsible for making improvements\n2. Performance Element: Responsible for selecting external actions (the standard agent)\n3. Critic: Evaluates agent behavior against an external performance standard\n4. Problem Generator: Suggests exploratory actions leading to new experiences.',
    keyPoints: [
      'Separation of learning mechanism from action-selection mechanism',
      'Problem generator prevents sticking to sub-optimal familiar routines'
    ],
    diagram: `[ Critic ] <--- Performance Standard
     ^
     | feedback
[ Learning Element ] <---> [ Problem Generator ]
     | (learning goals)           | (experiments)
     v                            v
[ Performance Element ] --------> Action`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q48',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Properties of Task Environments',
    question: 'Name the properties of task environments.',
    answer: 'Task environments are categorized along seven dimensions:\n1. Fully Observable vs. Partially Observable\n2. Deterministic vs. Stochastic\n3. Episodic vs. Sequential\n4. Static vs. Dynamic\n5. Discrete vs. Continuous\n6. Single-Agent vs. Multi-Agent\n7. Known vs. Unknown.',
    keyPoints: [
      'The hardest environment is: Partially observable, stochastic, sequential, dynamic, continuous, multi-agent (e.g., driving a taxi)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q49',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Fully vs Partially Observable',
    question: 'Differentiate fully versus partially observable environments with examples.',
    answer: '1. Fully Observable: Agent\'s sensors detect complete, accurate world state at any time point; no internal state needed to remember unperceived info.\nExample: Chess, Crossword puzzle.\n\n2. Partially Observable: Sensors are noisy, incomplete, or occluded, leaving unobserved aspects of the world.\nExample: Poker (hidden opponent cards), Self-driving car (blind spots, foggy weather).',
    keyPoints: [
      'Fully observable eliminates need for internal state transition models',
      'Partially observable requires memory or probabilistic belief states'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u1-q50',
    subject: 'ai',
    unit: 1,
    unitTitle: 'Unit I: Introduction to AI and Intelligent Agents',
    topic: 'Environment Dimensions & Examples',
    question: 'Differentiate deterministic, stochastic, episodic, sequential, static, dynamic, discrete, continuous, single-agent and multi-agent environments with one example each.',
    answer: '• Deterministic vs Stochastic: In deterministic, next state is completely determined by current state and action (Chess); in stochastic, uncertainty/randomness exists (Ludo / Backgammon).\n• Episodic vs Sequential: In episodic, current action doesn\'t affect future episodes (Defect inspection); in sequential, current choice affects all future states (Chess, Driving).\n• Static vs Dynamic: Static doesn\'t change while agent deliberates (Crossword); dynamic continuously changes while thinking (Taxi driving).\n• Discrete vs Continuous: Discrete has finite distinct states/percepts/time (Chess); continuous has infinite values across continuum (Self-driving car).\n• Single-Agent vs Multi-Agent: Single-agent acts alone (Crossword); multi-agent interacts with competitive or cooperative agents (Chess, Football).',
    keyPoints: [
      'Understanding these dimensions dictates algorithm choice (search, planning, MDPs, game theory)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
];
