import type { Flashcard } from '../types';

export const AI_UNIT_4_CARDS: Flashcard[] = [
  {
    id: 'ai-u4-q1',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Knowledge Representation Concept',
    question: 'What is knowledge representation?',
    answer: 'Knowledge Representation (KR) is the field of AI dedicated to translating real-world information, facts, and rules into formal computational symbolic languages that an inference engine can manipulate to make deductions, solve complex problems, and act rationally.',
    keyPoints: [
      'Bridge between real-world domain knowledge and computational reasoning systems',
      'Balances expressive power with computational tractability',
      'Key approaches: Logic (Propositional, First-Order), Semantic Networks, Frames, Ontologies'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q2',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Why Logic in AI',
    question: 'Why is logic used in AI?',
    answer: 'Logic is used in AI because it provides a precise, unambiguous mathematical framework with formal syntax, unambiguous semantics, and guaranteed truth-preserving inference mechanisms that allow an agent to derive new, provably correct facts from existing knowledge.',
    keyPoints: [
      'Eliminates ambiguity inherent in human natural languages',
      'Provides formal guarantees of soundness (truth preservation) and completeness',
      'Enables general-purpose domain-independent reasoning engines'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q3',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Knowledge-Based Agent',
    question: 'What is a knowledge-based agent?',
    answer: 'A knowledge-based agent is an intelligent agent that maintains an explicit internal Knowledge Base (KB) of facts and sentences about the world, reasons over that KB using an inference engine when it receives percepts, and deduces rational actions to execute.',
    keyPoints: [
      'Operates at the knowledge level: can be queried (ASK) and updated (TELL)',
      'Can adapt to novel environments simply by having new knowledge asserted into it',
      'Decouples what it knows (KB) from how it reasons (Inference Engine)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q4',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Architecture of Knowledge-Based Agent',
    question: 'Draw the architecture of a knowledge-based agent.',
    answer: 'The architecture of a knowledge-based agent consists of:\n1. Sensors: Perceive external environment and convert percepts into sentences\n2. Knowledge Base (KB): Domain sentences and background axioms\n3. Inference Engine: Derives new sentences using inference rules\n4. Actuators: Executes the chosen action in the physical environment.',
    keyPoints: [
      'Step 1: TELL(KB, Make-Percept-Sentence(percept, t))',
      'Step 2: action = ASK(KB, Make-Action-Query(t))',
      'Step 3: TELL(KB, Make-Action-Sentence(action, t))',
      'Step 4: Execute action via actuators'
    ],
    diagram: `+-----------------------------------------------+
|             KNOWLEDGE-BASED AGENT             |
|                                               |
|  [ Sensors ] ---> Percept ---> TELL           |
|                                 |             |
|                                 v             |
|                     +-----------------------+ |
|                     |  Knowledge Base (KB)  | |
|                     +-----------------------+ |
|                                 ^             |
|                                 |             |
|                     +-----------------------+ |
|                     |   Inference Engine    | |
|                     +-----------------------+ |
|                                 |             |
|                                ASK            |
|                                 |             |
|  [ Actuators ] <--- Action <----+             |
+-----------------------------------------------+`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q5',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Knowledge Base (KB)',
    question: 'What is a knowledge base (KB)?',
    answer: 'A Knowledge Base (KB) is a centralized repository of sentences expressed in a formal knowledge representation language, representing assertions, facts, laws, and background beliefs about the domain of interest.',
    keyPoints: [
      'Each sentence represents an assertion about the state of the world',
      'Distinct from a standard database: supports deductive inference of implicit facts',
      'Can be initialized with prior domain axioms and expanded dynamically with runtime percepts'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q6',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'TELL and ASK Operations',
    question: 'What do TELL and ASK do?',
    answer: '• TELL: An interface operation used to assert and insert a new sentence/fact into the Knowledge Base (updates KB with new world information).\n• ASK: An interface query operation used to question the Knowledge Base whether a given sentence logically follows (is entailed) from the facts currently stored in the KB.',
    keyPoints: [
      'TELL modifies the state of the KB: KB ← KB ∧ Sentence',
      'ASK invokes the inference engine to test entailment: KB ⊨ Query',
      'Both operations form the fundamental functional interface to any knowledge system'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q7',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Role of Inference Engine',
    question: 'What is the role of the inference engine?',
    answer: 'The inference engine is the processing component of a knowledge-based system that applies logical deduction rules to sentences stored in the Knowledge Base to answer queries (ASK) and deduce new facts that were not explicitly stated.',
    keyPoints: [
      'Domain-independent reasoning component',
      'Ensures derived sentences are semantically sound and entailed by KB',
      'Uses algorithms such as Forward Chaining, Backward Chaining, and Resolution'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q8',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Logic: Syntax and Semantics',
    question: 'What is a logic? Define syntax and semantics.',
    answer: 'A formal logic is a mathematical language system defined by two components:\n• Syntax: The formal grammar rules specifying how legal sentences and well-formed formulas (WFF) are structured.\n• Semantics: The rules that define the truth value or meaning of a sentence with respect to each possible world or model.',
    keyPoints: [
      'Syntax answers: "Is this string of symbols a valid sentence?" (e.g., P ∧ Q is valid, P ∧ ∧ Q is invalid)',
      'Semantics answers: "Is this sentence true or false in a given world?"',
      'Together they guarantee rigorous truth preservation during inference'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q9',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Model in Logic',
    question: 'What is a model in logic?',
    answer: 'A model is a mathematical abstraction of a "possible world" that fixes the truth value (True or False) of every sentence in the language. If a sentence α evaluates to True in a model m, we say that m satisfies α (or m is a model of α), written m ⊨ α.',
    keyPoints: [
      'In propositional logic with n variables, there are exactly 2^n possible models',
      'M(α) denotes the set of all models satisfying sentence α',
      'Formally, KB ⊨ α if and only if M(KB) ⊆ M(α)'
    ],
    formula: 'm \\models \\alpha \\iff \\alpha \\text{ is True in model } m',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q10',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Entailment',
    question: 'What is entailment?',
    answer: 'Entailment is the relationship between two sentences (or a KB and a sentence) where one logically follows from the other: KB ⊨ α means that in every possible model in which KB is true, the sentence α must also be true.',
    keyPoints: [
      'Notation: KB ⊨ α ("KB entails alpha")',
      'Set definition: M(KB) ⊆ M(α)',
      'Truth preservation: You cannot have a world where KB is true and α is false'
    ],
    diagram: `+-----------------------------------------+
| All Possible Models                     |
|                                         |
|      +-----------------------+          |
|      | Models of α  M(α)     |          |
|      |    +---------------+  |          |
|      |    | Models of KB  |  |          |
|      |    | M(KB) ⊆ M(α)  |  |          |
|      |    +---------------+  |          |
|      +-----------------------+          |
+-----------------------------------------+`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q11',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Soundness of Inference',
    question: 'What is soundness of an inference procedure?',
    answer: 'An inference procedure is sound (or truth-preserving) if it derives only sentences that are genuinely entailed by the Knowledge Base. Formally, if KB ⊢_i α, then KB ⊨ α.',
    keyPoints: [
      '"Soundness = Nothing but the truth"',
      'A sound inference engine never deduces a falsehood from true premises',
      'Inference rules like Modus Ponens and Resolution are proven to be sound'
    ],
    formula: 'KB \\vdash_i \\alpha \\implies KB \\models \\alpha',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q12',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Completeness of Inference',
    question: 'What is completeness of an inference procedure?',
    answer: 'An inference procedure is complete if it is capable of deriving any sentence that is logically entailed by the Knowledge Base. Formally, if KB ⊨ α, then KB ⊢_i α.',
    keyPoints: [
      '"Completeness = The whole truth"',
      'Guarantees that if a conclusion is true in all models of the KB, the algorithm can find a proof',
      'Resolution refutation is refutation-complete for propositional and first-order logic'
    ],
    formula: 'KB \\models \\alpha \\implies KB \\vdash_i \\alpha',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q13',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Propositional Logic',
    question: 'What is propositional logic?',
    answer: 'Propositional logic (Boolean logic) is the simplest branch of formal logic where propositions (declarative statements that can be either True or False, but not both) are treated as atomic units and connected using Boolean logical operators (¬, ∧, ∨, ⇒, ⇔).',
    keyPoints: [
      'Ontological commitment: the world consists of facts that hold or do not hold',
      'Epistemological commitment: an agent believes a proposition to be True, False, or Unknown',
      'Decidable and complete, but lacks the expressiveness to represent objects, relations, and quantifiers'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q14',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Propositional Symbols',
    question: 'What are propositional symbols?',
    answer: 'Propositional symbols (or propositional variables) are atomic symbolic names—usually written as uppercase letters such as P, Q, R, S, or descriptive identifiers like Rain, Sunny, Pit_1_2—that represent primitive propositions in the domain.',
    keyPoints: [
      'Each symbol has an atomic truth value: True or False',
      'Serve as the basic building blocks of compound logical formulas',
      'Have no internal structure (cannot refer to sub-parts, arguments, or properties)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q15',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Well-Formed Formula (WFF)',
    question: 'What is a well-formed formula (WFF)?',
    answer: 'A Well-Formed Formula (WFF) is a syntactic string of symbols generated in strict accordance with the grammatical rules of the logic:\n1. Any propositional symbol (e.g., P, Q) is a WFF.\n2. If α is a WFF, ¬α is a WFF.\n3. If α and β are WFFs, (α ∧ β), (α ∨ β), (α ⇒ β), and (α ⇔ β) are WFFs.',
    keyPoints: [
      'Defined inductively via context-free grammar',
      'Examples of valid WFF: (P ∧ Q) ⇒ ¬R',
      'Examples of invalid strings: P ∧ ∨ Q, ¬⇒ R'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q16',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Logical Connectives',
    question: 'List the logical connectives.',
    answer: 'The five standard logical connectives in propositional and first-order logic are:\n1. Negation (NOT): ¬ or ~\n2. Conjunction (AND): ∧\n3. Disjunction (OR): ∨\n4. Implication / Conditional (IF-THEN): ⇒ or →\n5. Biconditional (IF AND ONLY IF): ⇔ or ↔.',
    keyPoints: [
      'Operator precedence: ¬ (highest), ∧, ∨, ⇒, ⇔ (lowest)',
      'Parentheses override default precedence',
      'A set of connectives {¬, ∧} or {¬, ∨} is functionally complete (can express any Boolean function)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q17',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Truth Table of Implication',
    question: 'What is the truth table of implication?',
    answer: 'The implication P ⇒ Q is False ONLY when premise P is True and conclusion Q is False; otherwise it is always True:\n\nP     | Q     | P ⇒ Q\n------|-------|-------\nTrue  | True  | True\nTrue  | False | False\nFalse | True  | True  (vacuously true)\nFalse | False | True  (vacuously true)',
    keyPoints: [
      'Logical equivalence: P ⇒ Q ≡ ¬P ∨ Q',
      'If premise P is false, the implication is automatically (vacuously) true',
      'P is the antecedent / premise; Q is the consequent / conclusion'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q18',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Truth Table of Biconditional',
    question: 'What is the truth table of biconditional?',
    answer: 'The biconditional P ⇔ Q is True when both P and Q share the exact same truth value, and False when they differ:\n\nP     | Q     | P ⇔ Q\n------|-------|-------\nTrue  | True  | True\nTrue  | False | False\nFalse | True  | False\nFalse | False | True',
    keyPoints: [
      'Logical equivalence: P ⇔ Q ≡ (P ⇒ Q) ∧ (Q ⇒ P) ≡ (P ∧ Q) ∨ (¬P ∧ ¬Q)',
      'Tests whether P and Q are mutually equivalent under a model',
      'Corresponds to the XNOR gate in digital electronics'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q19',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Tautology, Contradiction, and Contingency',
    question: 'What are a tautology, contradiction and contingency?',
    answer: '• Tautology (Valid sentence): A sentence that evaluates to True in ALL possible models (e.g., P ∨ ¬P).\n• Contradiction (Unsatisfiable sentence): A sentence that evaluates to False in ALL possible models (e.g., P ∧ ¬P).\n• Contingency (Satisfiable): A sentence that is True in some models and False in other models (e.g., P ∧ Q).',
    keyPoints: [
      'A sentence α is valid (tautology) iff ¬α is unsatisfiable (contradiction)',
      'Validity is foundational to proving theorems: KB ⊨ α iff (KB ⇒ α) is a tautology',
      'Resolution refutation proves KB ⊨ α by showing (KB ∧ ¬α) is a contradiction'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q20',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Logical Equivalence',
    question: 'What is logical equivalence? Give two examples.',
    answer: 'Two sentences α and β are logically equivalent (written α ≡ β) if and only if they have the exact same truth value in every possible model (i.e., α ⊨ β and β ⊨ α).\nExamples:\n1. Implication Elimination: (P ⇒ Q) ≡ (¬P ∨ Q)\n2. Contraposition: (P ⇒ Q) ≡ (¬Q ⇒ ¬P).',
    keyPoints: [
      'Equivalent sentences can be substituted for one another without altering truth value',
      'Double Negation: ¬(¬P) ≡ P',
      'Distributivity: P ∧ (Q ∨ R) ≡ (P ∧ Q) ∨ (P ∧ R)'
    ],
    formula: '\\alpha \\equiv \\beta \\iff M(\\alpha) = M(\\beta)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q21',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: "De Morgan's Laws",
    question: "State De Morgan's laws.",
    answer: "De Morgan's Laws state that the negation of a conjunction is equivalent to the disjunction of the negations, and the negation of a disjunction is equivalent to the conjunction of the negations:\n1. ¬(P ∧ Q) ≡ (¬P ∨ ¬Q)\n2. ¬(P ∨ Q) ≡ (¬P ∧ ¬Q).",
    keyPoints: [
      'Allows distributing negation over conjunction and disjunction by flipping the connective',
      'Essential step in transforming formulas into Conjunctive Normal Form (CNF)',
      'Generalizes to First-Order Logic quantifiers: ¬(∀x P(x)) ≡ ∃x ¬P(x) and ¬(∃x P(x)) ≡ ∀x ¬P(x)'
    ],
    formula: '\\neg(P \\land Q) \\equiv \\neg P \\lor \\neg Q, \\quad \\neg(P \\lor Q) \\equiv \\neg P \\land \\neg Q',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q22',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Modus Ponens',
    question: 'State Modus Ponens with an example.',
    answer: 'Modus Ponens (Affirming the Antecedent) is an inference rule stating that if an implication (P ⇒ Q) is true and its premise P is true, then conclusion Q must also be true.\nRule: Premise 1: P ⇒ Q; Premise 2: P; Conclusion: ∴ Q.\nExample:\n• Premise 1: If it rains, the ground gets wet (Rain ⇒ Wet)\n• Premise 2: It is raining (Rain)\n• Conclusion: Therefore, the ground is wet (Wet).',
    keyPoints: [
      'Guaranteed to be sound (truth-preserving)',
      'Primary inference rule in forward chaining algorithms and production expert systems'
    ],
    formula: '\\frac{P \\implies Q, \\quad P}{Q}',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q23',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Modus Tollens',
    question: 'State Modus Tollens with an example.',
    answer: 'Modus Tollens (Denying the Consequent) is an inference rule stating that if an implication (P ⇒ Q) is true and the consequent Q is false (¬Q), then the premise P must also be false (¬P).\nRule: Premise 1: P ⇒ Q; Premise 2: ¬Q; Conclusion: ∴ ¬P.\nExample:\n• Premise 1: If it rains, the ground is wet (Rain ⇒ Wet)\n• Premise 2: The ground is NOT wet (¬Wet)\n• Conclusion: Therefore, it did NOT rain (¬Rain).',
    keyPoints: [
      'Relies on the contrapositive equivalence: (P ⇒ Q) ≡ (¬Q ⇒ ¬P)',
      'Crucial for proving hypotheses false in diagnostic and scientific reasoning'
    ],
    formula: '\\frac{P \\implies Q, \\quad \\neg Q}{\\neg P}',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q24',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'And-Elimination and And-Introduction',
    question: 'State And-Elimination and And-Introduction.',
    answer: '• And-Elimination: From a given conjunction (α ∧ β), any individual conjunct can be inferred as true:\n  Rule: (α ∧ β) ⊢ α, and (α ∧ β) ⊢ β.\n• And-Introduction: From a set of independently true sentences α and β, their conjunction can be inferred as true:\n  Rule: α, β ⊢ (α ∧ β).',
    keyPoints: [
      'And-Elimination extracts facts from compound conjunctions',
      'And-Introduction synthesizes combined statements from verified facts',
      'Both rules are sound and elementary in natural deduction systems'
    ],
    formula: '\\text{Elim: } \\frac{\\alpha \\land \\beta}{\\alpha}, \\quad \\text{Intro: } \\frac{\\alpha, \\; \\beta}{\\alpha \\land \\beta}',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q25',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Resolution Rule',
    question: 'What is the Resolution rule?',
    answer: 'The Resolution rule is a sound inference rule for clauses stating that if two clauses contain complementary literals (e.g., P and ¬P), they can be resolved to produce a new resolvent clause containing all remaining literals from both clauses.\nRule: (A ∨ P) and (B ∨ ¬P) resolves to (A ∨ B).',
    keyPoints: [
      'Complementary literals cancel each other out: P and ¬P',
      'Resolving P with ¬P yields the empty clause (□), representing Contradiction (False)',
      'Formulates the universal core of automated theorem proving and Prolog'
    ],
    diagram: `(A ∨ P)   and   (B ∨ ¬P)
      \\             /
       \\           /   (P and ¬P cancel out)
        v         v
         (A ∨ B)       [Resolvent Clause]`,
    formula: '\\frac{A \\lor P, \\quad B \\lor \\neg P}{A \\lor B}',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q26',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Conjunctive Normal Form (CNF)',
    question: 'What is CNF (Conjunctive Normal Form)?',
    answer: 'Conjunctive Normal Form (CNF) is a standardized canonical format for logical sentences where a sentence is represented as a conjunction (AND) of one or more clauses, where each clause is a disjunction (OR) of literals.',
    keyPoints: [
      'Structure: (L_1 ∨ L_2 ∨ ...) ∧ (L_3 ∨ L_4 ∨ ...) ∧ ...',
      'A literal is an atomic proposition (P) or its negation (¬P)',
      'Every propositional logic sentence can be converted into an equivalent CNF formula'
    ],
    formula: '\\text{CNF} = \\bigwedge_{i} \\left( \\bigvee_{j} L_{i,j} \\right)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q27',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Steps to Convert to CNF',
    question: 'Steps to convert a sentence to CNF?',
    answer: 'The standard 5-step conversion pipeline to CNF is:\n1. Eliminate Biconditionals: Replace (α ⇔ β) with (α ⇒ β) ∧ (β ⇒ α).\n2. Eliminate Implications: Replace (α ⇒ β) with (¬α ∨ β).\n3. Move Negations Inward: Apply De Morgan\'s laws and double-negation elimination so ¬ appears only immediately before symbols.\n4. Distribute ∨ over ∧: Apply distributive law (α ∨ (β ∧ γ)) ≡ ((α ∨ β) ∧ (α ∨ γ)).\n5. Flatten / Group into Clauses: Collect clauses connected by ∧.',
    keyPoints: [
      'In First-Order Logic, additional steps include Skolemization and dropping universal quantifiers',
      'Guarantees output is a flat set of clauses ready for Resolution'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q28',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Resolution Refutation Procedure',
    question: 'Explain the resolution refutation procedure.',
    answer: 'Resolution Refutation (Proof by Contradiction) proves that KB ⊨ α by showing that (KB ∧ ¬α) is unsatisfiable:\n1. Negate the goal query α (derive ¬α)\n2. Convert KB and ¬α into CNF clause form\n3. Repeatedly apply the Resolution rule to pairs of clauses with complementary literals\n4. If the empty clause (□ / Contradiction) is derived, the refutation succeeds and KB ⊨ α is proven.',
    keyPoints: [
      'Refutation-complete: if KB ⊨ α, resolution is guaranteed to derive the empty clause in finite steps',
      'If no new clauses can be added and empty clause was not reached, KB does NOT entail α',
      'The foundational theorem proving engine in AI'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q29',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Truth-Table Entailment Method',
    question: 'How does the truth-table method decide entailment?',
    answer: 'The truth-table method (Model Checking) decides whether KB ⊨ α by constructing a complete truth table containing all possible combinations of truth values for all propositional symbols, and checking that in every row where the Knowledge Base (KB) evaluates to True, the query sentence α is also True.',
    keyPoints: [
      'If α is True in every model where KB is True, then KB ⊨ α holds',
      'If there is even one row where KB is True but α is False, then KB ⊭ α',
      'Direct, brute-force implementation of the mathematical definition of entailment'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q30',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Complexity of Truth-Table Method',
    question: 'What is the complexity of the truth-table method?',
    answer: 'For a propositional language with n distinct propositional symbols:\n• Time Complexity: O(2^n) — requires checking all 2^n rows of the truth table.\n• Space Complexity: O(n) — requires storing only the truth assignment of the current row.',
    keyPoints: [
      'Exponential time complexity makes it intractable for problems with more than a few dozen variables',
      'Related to the Boolean Satisfiability Problem (SAT), the canonical NP-complete problem',
      'Overcome by modern DPLL, WalkSAT, and Resolution algorithms'
    ],
    formula: '\\text{Time} = O(2^n), \\quad \\text{Space} = O(n)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q31',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Propositional Limitation: "All birds fly"',
    question: 'Write "All birds fly" in propositional logic and explain the limitation.',
    answer: '• Representation: In propositional logic, we can only create a distinct proposition for each individual bird: (Bird_Sparrow ⇒ Flies_Sparrow) ∧ (Bird_Crow ⇒ Flies_Crow) ∧ (Bird_Robin ⇒ Flies_Robin) ∧ ...\n• Limitation: Propositional logic has no mechanism to quantify over objects (no variables like x or quantifiers like ∀). If there are n birds, we must write n separate propositions, and we cannot generalize to an unknown or infinite collection of birds.',
    keyPoints: [
      'Combinatorial explosion of atomic propositions',
      'Cannot express general rules or laws of nature succinctly',
      'Motivates the necessity of First-Order Logic'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q32',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Propositional Limitation: "Every man respects his parents"',
    question: 'Write "Every man respects his parents" in propositional logic.',
    answer: 'In propositional logic, this cannot be expressed as a single general rule. It can only be represented by enumerating every known man explicitly:\n(John_Is_Man ⇒ John_Respects_Parents) ∧ (Mark_Is_Man ⇒ Mark_Respects_Parents) ∧ (Alex_Is_Man ⇒ Alex_Respects_Parents) ∧ ...',
    keyPoints: [
      'Cannot express the relationship between an individual and "his parents" generically',
      'Requires infinite sentences for an open-ended population',
      'Shows why FOL with predicates Man(x), Parents(y, x), and Respects(x, y) is necessary'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q33',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Limitations of Propositional Logic',
    question: 'State two limitations of propositional logic.',
    answer: 'Two major limitations of propositional logic are:\n1. Lack of Quantifiers and Generalization: Cannot state properties of categories or all objects succinctly (e.g., cannot naturally write "All X are Y" without enumerating every instance).\n2. No Internal Structure for Atomic Sentences: Treats every statement as an indivisible black box (P, Q), making it incapable of expressing relationships between objects (e.g., Parent(John, Mary)).',
    keyPoints: [
      'Poor expressive conciseness',
      'Explosive scale when representing dynamic, multi-object worlds'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q34',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'First-Order Logic (FOL)',
    question: 'What is First-Order Logic (FOL)?',
    answer: 'First-Order Logic (FOL or Predicate Calculus) is a formal logic system that represents the world in terms of objects, relations (predicates) between objects, functions on objects, and logical quantifiers (Universal ∀ and Existential ∃).',
    keyPoints: [
      'Ontological commitment: the world consists of distinct objects and relations holding among them',
      'Dramatically more expressive and concise than propositional logic',
      'Semi-decidable: valid sentences are provable, but non-entailed sentences may run forever'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q35',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Need for FOL over Propositional Logic',
    question: 'Why do we need FOL over propositional logic?',
    answer: 'We need FOL because propositional logic can only represent static, unparameterized facts. FOL enables concise and general representation of real-world knowledge by introducing:\n1. Quantifiers (∀, ∃) to express universal rules and existential claims\n2. Predicates to define relationships across variables\n3. Functions to refer to objects indirectly without explicit naming.',
    keyPoints: [
      'Allows a single sentence to state a rule governing infinitely many instances',
      'Models natural language structure (nouns as objects, adjectives/verbs as predicates)',
      'Avoids combinatorial explosion of propositional symbols'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q36',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'FOL Elements: Constants, Variables, Predicates, Functions',
    question: 'What are constants, variables, predicates and functions in FOL?',
    answer: '• Constant Symbols: Refer to specific, unique objects in the domain (e.g., John, Paris, 3).\n• Variables: Stand in place of unspecified objects, allowing quantification (e.g., x, y, z).\n• Predicates: Express properties of objects or relationships between objects, evaluating to True/False (e.g., Brother(x, y), IsRed(Apple)).\n• Functions: Map objects to another object without asserting a truth value (e.g., MotherOf(John), Sqrt(16)).',
    keyPoints: [
      'Constants and Functions refer to objects in the domain',
      'Predicates return Boolean truth values',
      'Variables can be universally or existentially quantified'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q37',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Terms and Atomic Sentences in FOL',
    question: 'What are terms and atomic sentences?',
    answer: '• Term: A logical expression that refers to an object. It can be a constant, a variable, or a function applied to terms (e.g., John, x, FatherOf(Mary)).\n• Atomic Sentence: Formed by applying a predicate symbol to a tuple of terms, asserting a basic proposition that evaluates to True or False (e.g., Likes(John, MotherOf(Mary))).',
    keyPoints: [
      'A ground term is a term containing no variables (e.g., FatherOf(Mary))',
      'An atomic sentence is the fundamental building block of FOL formulas',
      'Complex sentences are formed by combining atomic sentences with connectives'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q38',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Universal Quantifier (∀)',
    question: 'What is the universal quantifier and which connective goes with it?',
    answer: 'The Universal Quantifier (∀, read "for all" or "for every") asserts that a statement is true for every possible object in the domain. The logical connective that naturally pairs with the universal quantifier is Implication (⇒).',
    keyPoints: [
      'Syntax: ∀x P(x) ⇒ Q(x)',
      'Example: "All birds fly" → ∀x (Bird(x) ⇒ Fly(x))',
      'Asserts: If an object satisfies the premise, it must satisfy the conclusion'
    ],
    formula: '\\forall x \\; (P(x) \\implies Q(x))',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q39',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Existential Quantifier (∃)',
    question: 'What is the existential quantifier and which connective goes with it?',
    answer: 'The Existential Quantifier (∃, read "there exists" or "for some") asserts that a statement is true for at least one object in the domain. The logical connective that naturally pairs with the existential quantifier is Conjunction (∧).',
    keyPoints: [
      'Syntax: ∃x P(x) ∧ Q(x)',
      'Example: "Some boys play cricket" → ∃x (Boy(x) ∧ PlaysCricket(x))',
      'Asserts: There exists an object that simultaneously possesses both properties'
    ],
    formula: '\\exists x \\; (P(x) \\land Q(x))',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q40',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Why ∀ with ⇒ and ∃ with ∧',
    question: 'Why is the pairing "for all with implication" correct, but "for all with AND" wrong?',
    answer: '• ∀x (Bird(x) ⇒ Fly(x)) is correct because it only asserts flying for objects that are birds. For non-birds (e.g., a rock), Bird(rock) is False, making the implication vacuously True.\n• ∀x (Bird(x) ∧ Fly(x)) is catastrophically wrong because it claims that EVERY object in the entire universe is simultaneously a bird AND flies (e.g., asserting that tables, cars, and humans are flying birds).',
    keyPoints: [
      'Universal quantifier with AND makes an overly broad, almost always false claim',
      'Existential quantifier with implication ∃x (P(x) ⇒ Q(x)) is vacuously true if any object exists for which P(x) is false',
      'Golden Rule: Use ⇒ with ∀, and use ∧ with ∃'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q41',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Quantifier Duality through Negation',
    question: 'How are the two quantifiers related through negation?',
    answer: 'The universal and existential quantifiers are duals of each other and satisfy De Morgan\'s duality laws under negation:\n1. ¬(∀x P(x)) ≡ ∃x ¬P(x) ("Not all birds fly" is equivalent to "There exists a bird that does not fly")\n2. ¬(∃x P(x)) ≡ ∀x ¬P(x) ("There does not exist a flying pig" is equivalent to "For all pigs, they do not fly").',
    keyPoints: [
      'Also: ∀x P(x) ≡ ¬(∃x ¬P(x))',
      'Also: ∃x P(x) ≡ ¬(∀x ¬P(x))',
      'Crucial for pushing negations inward during FOL CNF conversion'
    ],
    formula: '\\neg(\\forall x \\; P(x)) \\equiv \\exists x \\; \\neg P(x), \\quad \\neg(\\exists x \\; P(x)) \\equiv \\forall x \\; \\neg P(x)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q42',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Translate: "All birds fly"',
    question: 'Translate "All birds fly" into FOL.',
    answer: '∀x (Bird(x) ⇒ Fly(x))\n\nWhere:\n• Bird(x): predicate asserting that x is a bird\n• Fly(x): predicate asserting that x can fly.',
    keyPoints: [
      'Universal quantifier ∀ applies to all entities in the domain',
      'Connective is implication (⇒)',
      'States: If any entity x is a bird, then x flies'
    ],
    formula: '\\forall x \\; (\\text{Bird}(x) \\implies \\text{Fly}(x))',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q43',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Translate: "Some boys play cricket"',
    question: 'Translate "Some boys play cricket" into FOL.',
    answer: '∃x (Boy(x) ∧ PlaysCricket(x))\n\nWhere:\n• Boy(x): predicate asserting that x is a boy\n• PlaysCricket(x): predicate asserting that x plays cricket.',
    keyPoints: [
      'Existential quantifier ∃ asserts the existence of at least one individual',
      'Connective is conjunction (∧)',
      'States: There exists some entity x who is a boy AND plays cricket'
    ],
    formula: '\\exists x \\; (\\text{Boy}(x) \\land \\text{PlaysCricket}(x))',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q44',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: "Translate: First Cousin Definition",
    question: 'Translate "A first cousin is a child of a parent\'s sibling" into FOL.',
    answer: '∀x, y (FirstCousin(x, y) ⇔ ∃p, s (Parent(p, x) ∧ Sibling(s, p) ∧ Parent(s, y) ∧ x ≠ y))\n\nAlternatively, with explicit Mother/Father:\n∀x, y (FirstCousin(x, y) ⇔ ∃p, s (Child(x, p) ∧ Sibling(p, s) ∧ Child(y, s) ∧ x ≠ y)).',
    keyPoints: [
      'Uses biconditional ⇔ to provide a complete formal definition',
      'Variables p and s represent parent and sibling intermediate relations',
      'Explicit constraint x ≠ y prevents someone from being their own cousin'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q45',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Translate Lincoln Proverb',
    question: 'Translate "You can fool all the people some of the time, and some of the people all the time, but not all the people all the time" into FOL.',
    answer: 'Let Person(p), Time(t), and Fool(p, t) be the predicates:\n\n(∀p ∃t Fool(p, t)) ∧ (∃p ∀t Fool(p, t)) ∧ ¬(∀p ∀t Fool(p, t))\n\nWhere:\n1. "Fool all the people some of the time": ∀p ∃t Fool(p, t)\n2. "Fool some of the people all the time": ∃p ∀t Fool(p, t)\n3. "Not all the people all the time": ¬(∀p ∀t Fool(p, t)) [or ∃p ∃t ¬Fool(p, t)].',
    keyPoints: [
      'Classic benchmark testing quantifier alternation and scoping',
      'The order of quantifiers matters: ∀p ∃t ≠ ∃t ∀p',
      'Joined cleanly with conjunctions ∧'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q46',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Translate: "Every teacher teaches at least one subject"',
    question: 'Translate "Every teacher teaches at least one subject" into FOL.',
    answer: '∀x (Teacher(x) ⇒ ∃y (Subject(y) ∧ Teaches(x, y)))\n\nWhere:\n• Teacher(x): x is a teacher\n• Subject(y): y is an academic subject\n• Teaches(x, y): person x teaches subject y.',
    keyPoints: [
      'Outer universal quantifier over teachers with implication (⇒)',
      'Inner existential quantifier over subjects with conjunction (∧)',
      'Guarantees each teacher has at least one associated subject'
    ],
    formula: '\\forall x \\; (\\text{Teacher}(x) \\implies \\exists y \\; (\\text{Subject}(y) \\land \\text{Teaches}(x, y)))',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q47',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Universal Instantiation and Generalization',
    question: 'State Universal Instantiation and Universal Generalization.',
    answer: '• Universal Instantiation (UI): From ∀v α, we can infer SUBST({v/g}, α) for any ground term g.\n  Example: From ∀x (King(x) ⇒ Greedy(x)), infer (King(John) ⇒ Greedy(John)).\n• Universal Generalization (UG): From sentence α holding for an arbitrary constant c (with no prior assumptions made about c), we can infer ∀v SUBST({c/v}, α).',
    keyPoints: [
      'UI eliminates universal quantifiers by replacing variable v with a specific term',
      'UG introduces universal quantifiers if the proven statement applies generically without specific preconditions'
    ],
    formula: '\\text{UI: } \\frac{\\forall v \\; \\alpha}{\\text{SUBST}(\\{v/g\\}, \\alpha)}',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q48',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Existential Instantiation and Generalization',
    question: 'State Existential Instantiation and Existential Generalization.',
    answer: '• Existential Instantiation (EI / Skolemization): From ∃v α, we can infer SUBST({v/k}, α), where k is a brand-new constant symbol (Skolem constant) that does not appear anywhere else in the KB.\n  Example: From ∃x (Crown(x) ∧ OnHead(x)), infer (Crown(C_1) ∧ OnHead(C_1)).\n• Existential Generalization (EG): From α containing a term g, we can infer ∃v SUBST({g/v}, α).\n  Example: From Likes(John, Pizza), infer ∃x Likes(John, x).',
    keyPoints: [
      'Skolem constant k must be freshly generated to avoid unintentional identity assertions',
      'If inside universal scope, requires a Skolem function of the universal variables: f(x)'
    ],
    formula: '\\text{EI: } \\frac{\\exists v \\; \\alpha}{\\text{SUBST}(\\{v/k\\}, \\alpha)} \\quad (k \\text{ is fresh})',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q49',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Unification and Unify P(x, B) with P(A, y)',
    question: 'What is unification? Unify P(x, B) with P(A, y).',
    answer: '• Unification: An algorithmic process that finds a substitution θ (variable binding mapping) that makes two different logical expressions identical: UNIFY(p, q) = θ such that SUBST(θ, p) = SUBST(θ, q).\n• Unifying P(x, B) and P(A, y):\n  - Compare first arguments: x and A -> substitution {x / A}\n  - Compare second arguments: B and y -> substitution {y / B}\n  - Most General Unifier (MGU): θ = {x / A, y / B}\n  - Unified Result: P(A, B).',
    keyPoints: [
      'Foundational step for generalized Modus Ponens and First-Order Resolution',
      'Requires occurs check to prevent circular infinite terms like x = f(x)',
      'Finds the Most General Unifier (MGU) that makes fewest variable commitments'
    ],
    formula: '\\text{UNIFY}(P(x, B), P(A, y)) = \\{x/A, \\; y/B\\} \\implies P(A, B)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u4-q50',
    subject: 'ai',
    unit: 4,
    unitTitle: 'Unit IV: Knowledge Representation using Logical Formalisms',
    topic: 'Reasoning with Default Information',
    question: 'What is reasoning with default information? Give an example.',
    answer: 'Reasoning with default information (Non-monotonic reasoning) is a reasoning framework where conclusions are drawn based on general rules or typical assumptions in the absence of contradictory evidence, but can be retracted if new contradictory information is learned.\nExample:\n• Default Rule: Typically, birds can fly: Bird(x) ∧ ¬Abnormal(x) ⇒ Fly(x)\n• Fact: Tweety is a bird (Bird(Tweety))\n• Default Conclusion: Tweety flies (Fly(Tweety))\n• New Information: Tweety is a penguin (Abnormal(Tweety))\n• Revision: Retract conclusion that Tweety flies.',
    keyPoints: [
      'Standard classical logic is monotonic (adding new axioms never invalidates old theorems)',
      'Real-world common-sense reasoning is non-monotonic',
      'Formalized by systems like Reiter\'s Default Logic, McCarthy\'s Circumscription, and Truth Maintenance Systems (TMS)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
];
