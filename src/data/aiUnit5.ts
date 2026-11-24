import type { Flashcard } from '../types';

export const AI_UNIT_5_CARDS: Flashcard[] = [
  {
    id: 'ai-u5-q1',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Planning in AI',
    question: 'What is planning in AI?',
    answer: 'Planning in AI is the deliberate computational process of synthesizing a structured sequence or network of actions that an agent can execute to transform the current environment from an initial state into a desired goal state.',
    keyPoints: [
      'Focuses on action synthesis before execution',
      'Uses explicit, factored, or symbolic representations of states and actions (e.g., STRIPS, PDDL)',
      'Addresses sub-goal interactions and dependencies efficiently'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q2',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Planning vs Search',
    question: 'How does planning differ from search?',
    answer: '• State Representation: Classical search uses atomic "black-box" states; Planning uses factored representations (sets of logical predicates/literals).\n• Action Representation: Classical search uses opaque transition functions Result(s, a); Planning uses transparent operators with explicit Preconditions and Effects (Add and Delete lists).\n• Directionality & Decomposition: Search navigates strictly forward (or backward); Planning can reason forward, backward, or flexibly decompose problems into independent sub-goals and combine them (divide-and-conquer).',
    keyPoints: [
      'Planning exploits structural connections between actions and sub-goals',
      'Heuristics can be derived automatically from operator structures without hand-crafting',
      'Supports partial-order commitment rather than fixed linear sequences'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q3',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Plan Definition',
    question: 'What is a plan?',
    answer: 'A plan is an organized specification of actions (either a strict linear sequence or a partially ordered directed acyclic graph) that, when executed starting from a defined initial state, is guaranteed to satisfy all goal conditions.',
    keyPoints: [
      'Total-order plan: a linear sequence [a_1, a_2, ..., a_n]',
      'Partial-order plan: specifies ordering constraints a_i < a_j only when strictly necessary',
      'Conditional plan: includes branches and sensor checks to handle non-determinism'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q4',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Planning Problem Formulation',
    question: 'What are the initial state, goal and actions in a planning problem?',
    answer: 'In standard planning formalisms (like STRIPS / PDDL):\n• Initial State: A complete conjunction of positive ground literals describing all true facts in the world at the start (Closed-World Assumption: unmentioned literals are assumed False).\n• Goal: A conjunction of positive (and sometimes negative) ground literals that must be true at the end of plan execution.\n• Actions (Operators): Schemas defined by action name, parameter list, Preconditions, and Effects.',
    keyPoints: [
      'STRIPS: Stanford Research Institute Problem Solver representation',
      'Closed World Assumption: anything not explicitly listed as True is False',
      'The goal can be partially specified (does not need to fix every state variable)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q5',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Preconditions and Effects',
    question: 'What are preconditions and effects of an operator?',
    answer: '• Preconditions: The set of logical conditions and facts that must hold true in the current state for an action to be legally executable.\n• Effects: The specific modifications made to the state when the action executes, divided into:\n  - Add List: New facts/literals that become True after execution.\n  - Delete List: Existing facts/literals that cease to be True after execution.',
    keyPoints: [
      'Applicability test: State satisfies Preconditions',
      'State transition formula: State_{new} = (State_{old} \\ Delete_List) ∪ Add_List',
      'Eliminates the classical "Frame Problem" by assuming all unmentioned predicates persist unchanged'
    ],
    formula: '\\text{State}_{\\text{new}} = (\\text{State}_{\\text{old}} \\setminus \\text{Delete}) \\cup \\text{Add}',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q6',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Approaches to Planning',
    question: 'Name the main approaches to planning.',
    answer: 'The primary approaches to planning in AI are:\n1. State-Space Planning (Forward Progression / Backward Regression)\n2. Plan-Space / Partial-Order Planning (POP / Nonlinear Planning)\n3. Goal Stack Planning (STRIPS)\n4. GraphPlan (Planning Graph analysis)\n5. Hierarchical Task Network (HTN) Planning\n6. SAT-based Planning (Planning as Boolean Satisfiability)\n7. Probabilistic / Contingency Planning (MDPs / POMDPs).',
    keyPoints: [
      'Progressive: forward search from initial state',
      'Regressive: backward search from goal conditions',
      'Plan-space: search in the space of plans rather than states'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q7',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Blocks World Domain',
    question: 'Describe the blocks world domain.',
    answer: 'The Blocks World is a classical AI planning micro-world consisting of square, flat-surfaced blocks of uniform size resting on a flat table surface or stacked on top of one another, manipulated by a single robotic gripper arm that can hold at most one block at a time.',
    keyPoints: [
      'Standard testbed for planning algorithms since SHRDLU (1971)',
      'Blocks can be picked up, put down, stacked, or unstacked',
      'A block can only support one other block directly on top of it'
    ],
    diagram: `        [ A ]
        [ B ]      [ C ]
      ==================== Table
State: ON(A, B), ONTABLE(B), ONTABLE(C), CLEAR(A), CLEAR(C), ARMEMPTY`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q8',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Blocks World Operators',
    question: 'List the operators in the blocks world (STACK, UNSTACK, PICKUP, PUTDOWN).',
    answer: 'The four classical STRIPS blocks-world operators are:\n1. PICKUP(x): Pick up block x from the table using the arm.\n2. PUTDOWN(x): Place block x held in the arm down onto the table.\n3. STACK(x, y): Place block x held in the arm on top of block y.\n4. UNSTACK(x, y): Lift block x from atop block y into the arm.',
    keyPoints: [
      'PICKUP(x): Pre = {CLEAR(x), ONTABLE(x), ARMEMPTY}; Add = {HOLDING(x)}; Del = {ONTABLE(x), CLEAR(x), ARMEMPTY}',
      'PUTDOWN(x): Pre = {HOLDING(x)}; Add = {ONTABLE(x), CLEAR(x), ARMEMPTY}; Del = {HOLDING(x)}',
      'STACK(x, y): Pre = {HOLDING(x), CLEAR(y)}; Add = {ON(x, y), CLEAR(x), ARMEMPTY}; Del = {HOLDING(x), CLEAR(y)}',
      'UNSTACK(x, y): Pre = {ON(x, y), CLEAR(x), ARMEMPTY}; Add = {HOLDING(x), CLEAR(y)}; Del = {ON(x, y), CLEAR(x), ARMEMPTY}'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q9',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Blocks World Predicates',
    question: 'Give the predicates used in the blocks world (ON, ONTABLE, CLEAR, HOLDING, ARMEMPTY).',
    answer: '• ON(x, y): Block x is sitting directly on top of block y.\n• ONTABLE(x): Block x is sitting directly on the surface of the table.\n• CLEAR(x): The top surface of block x is free (no block is resting on x).\n• HOLDING(x): The robotic arm is currently grasping block x.\n• ARMEMPTY: The robotic arm is currently empty (not holding any block).',
    keyPoints: [
      'A table is never considered CLEAR (it can hold infinite blocks)',
      'If ON(x, y) holds, y is NOT CLEAR',
      'ARMEMPTY and HOLDING(x) are mutually exclusive'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q10',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: '3-Block Problem States',
    question: 'Write the initial and goal state of a simple 3-block problem.',
    answer: 'For a 3-block world with blocks {A, B, C}:\n• Initial State:\n  ONTABLE(A) ∧ ONTABLE(B) ∧ ONTABLE(C) ∧ CLEAR(A) ∧ CLEAR(B) ∧ CLEAR(C) ∧ ARMEMPTY\n  (All 3 blocks resting flat on the table).\n• Goal State:\n  ON(A, B) ∧ ON(B, C) ∧ ONTABLE(C)\n  (Stack with A on B, and B on C).',
    keyPoints: [
      'Plan required: PICKUP(B) -> STACK(B, C) -> PICKUP(A) -> STACK(A, B)',
      'Cleanly demonstrates progressive action sequencing',
      'Requires achieving sub-goal ON(B, C) before ON(A, B)'
    ],
    diagram: `Initial State:               Goal State:
 [ A ]  [ B ]  [ C ]            [ A ]
=====================           [ B ]
        Table                   [ C ]
                             ===========`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q11',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Components of a Planning System',
    question: 'List the components of a planning system.',
    answer: 'The fundamental components of a classical planning system are:\n1. State Description: Formal representation of the current world\n2. Goal Representation: Desired set of world conditions\n3. Action / Operator Library: Definitions with Preconditions, Add list, Delete list\n4. Search Strategy / Planner Algorithm: Engine that explores state/plan space\n5. Conflict Detector / Resolver: Handles sub-goal interactions and threats.',
    keyPoints: [
      'Decoupled architecture: separates domain knowledge (operators) from planning engine',
      'Supports automated domain-independent heuristics (e.g., delete-relaxation, causal links)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q12',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Role of Choosing Rules to Apply',
    question: 'What is the role of choosing rules to apply?',
    answer: 'In planning, choosing which operator or rule to apply determines search efficiency, branch pruning, and goal convergence. Selecting an operator that directly achieves an outstanding sub-goal while minimizing clobbered preconditions of other goals prevents infinite cycles, backtracking, and redundant actions.',
    keyPoints: [
      'Guided by heuristics like Fast-Forward (FF), LM-Cut, or causal link protection',
      'Prevents exploring dead-end branches that undo previously satisfied goals',
      'Balances forward progress against future flexibility'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q13',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Detecting a Solution',
    question: 'How does a planner detect a solution?',
    answer: 'A planner detects that a solution has been reached when the current state satisfies all conditions of the goal description (i.e., every predicate in the goal conjunction is a member of the current state), or in partial-order planning, when there are no open flaws (no unachieved preconditions and no causal threats).',
    keyPoints: [
      'In state-space planning: Goal ⊆ Current_State',
      'In plan-space planning: Flaws = ∅ (all open preconditions satisfied, all threats resolved)',
      'Terminates search and extracts the action plan'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q14',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Detecting Dead Ends in Planning',
    question: 'How does a planner detect dead ends?',
    answer: 'A planner detects a dead end when:\n1. A state is reached from which no legal operator can be applied.\n2. In regression planning, when a required sub-goal cannot be achieved by any known operator.\n3. When mutual exclusion (mutex) relationships or reachability analysis in a planning graph demonstrate that two required goal predicates can never simultaneously become true.',
    keyPoints: [
      'Early detection avoids exploring exponential fruitless subtrees',
      'Triggers immediate backtracking to previous choice points',
      'Planning Graphs (GraphPlan) excel at detecting dead-end level-offs'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q15',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Goal Stack Planning',
    question: 'What is goal stack planning?',
    answer: 'Goal Stack Planning (used in early STRIPS) is a linear planning algorithm that uses a LIFO stack to decompose a compound goal into individual sub-goals, pushing operators and preconditions onto the stack and solving them sequentially one by one.',
    keyPoints: [
      'Maintains a stack of goals, sub-goals, and operators',
      'Solves one sub-goal completely before moving to the next (linear assumption)',
      'Susceptible to the Sussman Anomaly (undoing previously achieved goals)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q16',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Data Structures in Goal Stack Planner',
    question: 'What data structures does the goal stack planner use?',
    answer: 'A Goal Stack Planner primarily uses three data structures:\n1. The Goal Stack: A LIFO stack holding compound goals, individual sub-goals, and STRIPS operators.\n2. The World Model (Current State): A dynamic set/database of positive ground predicates representing the current state of the world.\n3. The Plan Array / List: An ordered queue storing the final sequence of generated operators.',
    keyPoints: [
      'Stack drives the entire execution loop',
      'World model updates dynamically whenever an operator executes (applying Add/Delete lists)',
      'Plan array accumulates operators that pop off the stack'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q17',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Steps of Goal Stack Planning',
    question: 'Write the steps of goal stack planning.',
    answer: 'The execution loop of Goal Stack Planning:\n1. Push the complete compound goal G on the stack, followed by individual sub-goals g_1, g_2, ...\n2. While stack is not empty, pop top item T:\n   - If T is a predicate that is already True in the current world state: do nothing.\n   - If T is a predicate False in world state: select an operator Op whose Add list contains T; push Op onto stack, followed by Op\'s preconditions.\n   - If T is an operator Op: apply Op to current world state (remove Delete list, append Add list), and append Op to the output plan.\n   - If T is a compound goal: verify all parts are still True; if any were clobbered, push compound goal back on stack.',
    keyPoints: [
      'Recursive depth-first decomposition',
      'Final verification check detects clobbered goals'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q18',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Compound Goal Popping',
    question: 'What happens when a compound goal is popped?',
    answer: 'When a compound goal (e.g., G_1 ∧ G_2) is popped from the goal stack, the planner checks whether all individual conjuncts of that goal are simultaneously satisfied in the current world state:\n• If ALL conjuncts are currently True: the compound goal is achieved and discarded.\n• If ANY conjunct is False (because solving a subsequent sub-goal destroyed or clobbered an earlier sub-goal): the compound goal is pushed BACK onto the stack along with its sub-goals to re-solve them.',
    keyPoints: [
      'Prevents premature termination with an invalid partial solution',
      'Can lead to redundant steps or infinite looping if not guarded against cycling'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q19',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Non-Optimality in Goal Stack Planning',
    question: 'Why does goal stack planning sometimes give non-optimal plans?',
    answer: 'Goal stack planning produces non-optimal plans because of the Linear Independence Assumption: it assumes sub-goals can be solved sequentially in isolation. When sub-goals interact or conflict, solving one sub-goal often requires undoing or unstacking previously assembled work, resulting in redundant cycles of "do, undo, and redo".',
    keyPoints: [
      'Creates suboptimal detours (e.g., placing a block on the table only to pick it right back up)',
      'Sub-goal ordering on the stack drastically alters total plan length',
      'Demonstrated classically by the Sussman Anomaly'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q20',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Sussman Anomaly',
    question: 'What is the Sussman anomaly?',
    answer: 'The Sussman Anomaly (identified by Gerald Sussman in 1975) is a classic problem in the Blocks World illustrating that linear planners cannot interleave sub-plans. If an algorithm attempts to solve one sub-goal completely before starting the second, it is forced to undo the first sub-goal to achieve the second, resulting in a suboptimal plan.',
    keyPoints: [
      'Initial: C on A, B on table. Goal: ON(A, B) ∧ ON(B, C)',
      'If you achieve ON(A, B) first: you must unstack C from A, then stack A on B. But now B is covered, so you cannot stack B on C without taking A back off!',
      'If you achieve ON(B, C) first: B is on C, but C was under nothing, yet A is trapped under C initially!',
      'Proof that sub-goals cannot always be ordered linearly; requires interleaving actions'
    ],
    diagram: `Initial:       Goal:
 [ C ]          [ A ]
 [ A ]   [ B ]  [ B ]
==============  [ C ]
    Table      =======`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q21',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Linear vs Nonlinear Planning',
    question: 'What is linear versus nonlinear planning?',
    answer: '• Linear Planning (Goal Stack / STRIPS): Solves one sub-goal completely to finality before starting the next sub-goal, producing a strict totally-ordered sequence of actions. Cannot interleave actions across different sub-goals.\n• Nonlinear Planning (Partial-Order Planning / POP): Treats sub-goals concurrently, interleaving actions from different sub-goals and only committing to ordering constraints when necessary to prevent destructive interference.',
    keyPoints: [
      'Linear planning suffers from the Sussman Anomaly and generates suboptimal plans',
      'Nonlinear planning handles sub-goal interactions cleanly through causal link analysis',
      'Nonlinear planning embraces the Principle of Least Commitment'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q22',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Nonlinear Planning using Constraint Posting',
    question: 'What is nonlinear planning using constraint posting?',
    answer: 'Nonlinear planning using constraint posting is an approach where a plan is constructed as a flexible, partially ordered graph of actions, and constraints (ordering constraints, causal links, and variable bindings) are incrementally "posted" to resolve flaws and protect preconditions without prematurely ordering unrelated actions.',
    keyPoints: [
      'Starts with an empty plan containing only Start and Finish dummy steps',
      'Flaws (open preconditions or threatened causal links) are resolved by posting constraints',
      'Avoids premature search tree branching'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q23',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Constraints in Constraint Posting',
    question: 'What are constraints in constraint posting?',
    answer: 'In constraint posting planners (like UCPOP), the three primary types of constraints are:\n1. Ordering Constraints: Temporal relations specifying action order (e.g., A < B meaning action A must occur before action B).\n2. Causal Links: Protected dependency relations A --p--> B, stating action A produces condition p which is required as a precondition by action B.\n3. Variable Binding / Inequality Constraints: Variable assignments (x = BlockA) or non-codesignation constraints (x ≠ y).',
    keyPoints: [
      'Threat (Clobbering): Occurs when an action C could delete condition p between A and B',
      'Resolved by Demotion (C < A) or Promotion (B < C)'
    ],
    formula: 'A \\xrightarrow{p} B \\quad (\\text{Causal Link})',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q24',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Principle of Least Commitment',
    question: 'What is the principle of least commitment?',
    answer: 'The Principle of Least Commitment dictates that a planner should never make an arbitrary or premature decision (such as fixing action order or binding a variable) until it is strictly forced to do so to resolve a conflict or advance the plan.',
    keyPoints: [
      '"Never make a choice until you have to"',
      'Minimizes costly backtracking by keeping alternative execution options open',
      'The foundational design philosophy behind Partial-Order Planning (POP)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q25',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Partial-Order Plan',
    question: 'What is a partial-order plan?',
    answer: 'A partial-order plan is a plan represented as a directed acyclic graph (DAG) specifying actions and ordering constraints only between actions that strictly depend on each other, leaving independent or non-conflicting actions unordered.',
    keyPoints: [
      'Can be linearized into multiple valid total-order execution sequences',
      'Ideal for multi-agent or parallel execution architectures',
      'Example: Putting on left sock and right sock are unordered with respect to each other, but both must precede putting on shoes'
    ],
    diagram: `[ Put on Left Sock ]  ---> [ Put on Left Shoe ]
                                                   \\
                                                    ---> [ Tie Shoelaces ]
                                                   /
[ Put on Right Sock ] ---> [ Put on Right Shoe ]`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q26',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Hierarchical Planning',
    question: 'What is hierarchical planning?',
    answer: 'Hierarchical planning is an approach that decomposes complex high-level abstract goals or tasks into progressively more detailed sub-tasks across multiple layers of abstraction until only primitive, directly executable actions remain.',
    keyPoints: [
      'Mirrors human problem-solving (e.g., "Build a house" -> "Lay foundation", "Erect walls", "Install roof")',
      'Enables planning across massive real-world scales with millions of primitive actions',
      'Restricts search to relevant sub-problems at each level of abstraction'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q27',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Hierarchical Task Network (HTN)',
    question: 'What is a Hierarchical Task Network (HTN)?',
    answer: 'A Hierarchical Task Network (HTN) is a widely used planning formalism where the planner is supplied with a set of tasks to accomplish (rather than just state conditions) and refines high-level non-primitive compound tasks into networks of simpler tasks using predefined decomposition methods.',
    keyPoints: [
      'Encodes rich expert domain procedural knowledge',
      'Employed in mission-critical applications: military logistics, spacecraft planning, game AI',
      'Examples: SHOP, SHOP2 (Simple Hierarchical Ordered Planner)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q28',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Primitive vs Compound Tasks in HTN',
    question: 'What are primitive and compound tasks in HTN?',
    answer: '• Primitive Tasks: Basic, atomic actions that correspond directly to physical executable operators (defined with Preconditions and Effects, e.g., MoveArm, TightenScrew).\n• Compound (Non-Primitive) Tasks: High-level abstract tasks that cannot be executed directly and must be decomposed into a network of sub-tasks via domain methods (e.g., Travel(NY, London), AssembleEngine).',
    keyPoints: [
      'Primitive tasks are leaves in the hierarchical decomposition tree',
      'Compound tasks represent hierarchical intentions or sub-goals'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q29',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Methods in HTN Planning',
    question: 'What are methods in HTN planning?',
    answer: 'In HTN planning, a method is a predefined decomposition rule that specifies how to expand a specific compound task into a partially ordered sub-network of simpler tasks, subject to certain preconditions holding true in the world.',
    keyPoints: [
      'Method schema: Task Name, Precondition, Subtask Network',
      'Multiple methods can exist for the same compound task (e.g., TravelByPlane vs TravelByTrain)',
      'Captures expert recipes and standard operating procedures'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q30',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'HTN Search Reduction',
    question: 'How does HTN reduce search effort?',
    answer: 'HTN drastically reduces search effort by pruning the vast space of arbitrary action combinations using human-engineered procedural methods. Instead of blindly searching all possible combinations of primitive actions from scratch, the planner only considers pre-structured, domain-proven decompositions.',
    keyPoints: [
      'Turns exponential blind state exploration into directed top-down task substitution',
      'Cuts branching factor by discarding nonsensical operator combinations',
      'Can plan thousands of steps in seconds'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q31',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Compare Nonlinear and Hierarchical Planning',
    question: 'Compare nonlinear and hierarchical planning.',
    answer: '• Planning Space: Nonlinear planning searches the space of plans at a single, flat level of primitive abstraction; Hierarchical planning searches across multiple layered levels of task abstraction.\n• Guidance: Nonlinear planning uses domain-independent search heuristics; Hierarchical planning uses expert domain methods that prescribe how tasks decompose.\n• Scalability: Nonlinear planning struggles on long-horizon plans (>50 steps); Hierarchical planning scales effortlessly to thousands of actions.\n• Knowledge Requirement: Nonlinear requires only basic STRIPS operators; HTN requires authoring comprehensive decomposition methods.',
    keyPoints: [
      'POP focuses on least commitment and causal threat protection',
      'HTN focuses on task decomposition and procedural expertise'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q32',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Planning in Non-Deterministic Domains',
    question: 'What is planning in a non-deterministic domain?',
    answer: 'Planning in a non-deterministic domain addresses environments where actions can have multiple possible stochastic or unpredictable outcomes (e.g., SlipperyGripper action might result in HOLDING(x) or DROPPED(x)), requiring tree-structured contingent plans or policy mapping states to actions.',
    keyPoints: [
      'Single linear plan is insufficient because real-world outcomes cannot be predicted with 100% certainty',
      'Requires sensing actions during execution to identify actual current branch',
      'Modeled using Markov Decision Processes (MDPs) or Contingent Planning'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q33',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Conditional Planning',
    question: 'What is conditional planning?',
    answer: 'Conditional planning (also known as contingency planning) constructs a branched tree plan before execution begins, incorporating sensory checks and "if-then-else" conditional branches to handle all anticipated alternative outcomes of non-deterministic actions.',
    keyPoints: [
      'Structure: If SensorTest(p) Then [Plan_A] Else [Plan_B]',
      'Anticipates all contingencies offline prior to runtime execution',
      'Can produce exponential plan sizes if there are many contingent variables'
    ],
    diagram: `              [ Action 1 ]
                   |
            < Check Sensor >
             /            \\
      (Outcome A)      (Outcome B)
          |                 |
     [ Plan Branch A ] [ Plan Branch B ]`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q34',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Contingency Planning',
    question: 'What is contingency planning?',
    answer: 'Contingency planning is the process of generating plans that account for incomplete information or action failures by embedding perception/sensing actions at critical junction points, allowing the agent to determine the true state of the world at runtime and execute the corresponding branch.',
    keyPoints: [
      'Used in partially observable and non-deterministic task environments',
      'Contingent branch is activated dynamically by sensory feedback',
      'Provides robustness in hazardous or uncertain environments (e.g., planetary rovers)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q35',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Replanning vs Conditional Planning',
    question: 'How is replanning different from conditional planning?',
    answer: '• Conditional Planning: Exhaustively pre-computes branches for every possible contingency offline before execution, ensuring the agent has an immediate response to every known eventuality (large, complex plan).\n• Replanning (Monitoring & Execution): Generates a simple, optimistic plan for the most likely outcome; during execution, it actively monitors sensors, and if an unexpected failure occurs, it halts and re-invokes the planner online to synthesize a new path from the current state.',
    keyPoints: [
      'Replanning saves massive offline computation time by only addressing failures that actually occur',
      'Conditional planning is necessary when runtime computation is impossible or execution must be instantaneous'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q36',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'AI Applications in Healthcare',
    question: 'Give three applications of AI in healthcare.',
    answer: 'Three transformative applications of AI in healthcare are:\n1. Medical Imaging & Diagnostics: Deep learning CNNs analyzing X-rays, CT scans, and MRIs to detect tumors, pneumonia, and diabetic retinopathy with radiologist-level accuracy.\n2. AI-Assisted Drug Discovery: Machine learning models predicting protein structures (AlphaFold) and screening chemical compounds to accelerate vaccine and therapeutic development.\n3. Virtual Health Assistants & Clinical Decision Support: AI systems triage patient symptoms, flag adverse drug interactions, and assist doctors in diagnosis and treatment planning.',
    keyPoints: [
      'Significantly lowers diagnostic turnaround times',
      'Reduces drug discovery cycles from years to months',
      'Enables personalized genomic medicine'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q37',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'AI in Medical Imaging and Diagnosis',
    question: 'How does AI help in medical imaging and diagnosis?',
    answer: 'AI assists in medical imaging by applying Convolutional Neural Networks (CNNs) and vision transformers to segment, highlight, and classify pathological anomalies in radiology, pathology, and dermatology scans. It detects micro-calcifications, tumor margins, and fractures faster and with higher sensitivity than the human eye, serving as a second reader that minimizes diagnostic fatigue.',
    keyPoints: [
      'Automates tedious organ segmentation in radiation therapy',
      'Achieves AUC > 0.95 in melanoma, diabetic retinopathy, and chest pathology detection',
      'Provides quantitative measurement of tumor growth or shrinkage over time'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q38',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'AI-Assisted Drug Discovery',
    question: 'What is AI-assisted drug discovery?',
    answer: 'AI-assisted drug discovery uses generative chemistry, molecular docking simulations, and deep learning (e.g., AlphaFold) to predict 3D protein structures, identify biological drug targets, virtually screen billions of small molecules for binding affinity, and optimize candidate lead molecules for metabolic stability and low toxicity.',
    keyPoints: [
      'Reduces traditional 10-15 year drug development timelines to a fraction',
      'Cuts R&D costs by eliminating unpromising wet-lab synthesis candidates early',
      'Predicts ADMET (Absorption, Distribution, Metabolism, Excretion, Toxicity) profiles computationally'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q39',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'AI Applications in Finance',
    question: 'Give three applications of AI in finance.',
    answer: 'Three key applications of AI in the financial industry are:\n1. Fraud Detection & Anti-Money Laundering (AML): Real-time analysis of transaction streams using anomaly detection to flag suspicious credit card charges and illicit transfers.\n2. Algorithmic High-Frequency Trading: Quantitative ML models executing ultra-fast trades based on market patterns, sentiment analysis, and predictive indicators.\n3. Automated Credit Scoring & Underwriting: Machine learning evaluation of applicant creditworthiness using alternative data sources to assess loan default risk.',
    keyPoints: [
      'Monitors millions of transactions per second in real time',
      'Reduces false positives in compliance screening',
      'Powers robo-advisors for automated wealth management'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q40',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Fraud Detection in Banking',
    question: 'How does AI detect fraud in banking?',
    answer: 'AI detects banking fraud by analyzing real-time transaction data streams using supervised classifiers (Gradient Boosted Trees, Random Forests) and unsupervised anomaly detection (Isolation Forests, Autoencoders). It evaluates behavioral features (geographic velocity, spending spikes, unusual merchant types, device fingerprints) and blocks fraudulent transactions in milliseconds.',
    keyPoints: [
      'Sub-100ms decision latency at point-of-sale',
      'Detects zero-day fraud patterns without hardcoded static rules',
      'Graph Neural Networks (GNNs) uncover organized fraud rings and synthetic identities'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q41',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Algorithmic Trading & Credit Scoring',
    question: 'What is algorithmic trading and credit scoring?',
    answer: '• Algorithmic Trading: Automated execution of financial orders via pre-programmed algorithms that analyze market data, technical indicators, order books, and news sentiment at microsecond speeds to execute arbitrage or quantitative strategies.\n• Credit Scoring: The predictive assessment of a borrower\'s probability of loan default using machine learning models trained on historical repayment records, banking transactions, and socioeconomic variables.',
    keyPoints: [
      'Algorithmic trading accounts for >70% of public stock market trading volume',
      'AI credit scoring expands credit access to unbanked individuals via alternative data',
      'Requires strict model governance to prevent discriminatory lending bias'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q42',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'AI Applications in Retail',
    question: 'Give three applications of AI in retail.',
    answer: 'Three major applications of AI in retail are:\n1. Personalized Recommendation Engines: Collaborative filtering and deep learning models recommending products based on customer browsing and purchase history (e.g., Amazon, Netflix).\n2. Demand Forecasting & Dynamic Inventory Optimization: Time-series predictive models forecasting product demand to prevent stockouts and minimize warehouse holding costs.\n3. Automated Checkout & Cashierless Stores: Computer vision and sensor fusion tracking items removed from shelves for automatic billing (e.g., Amazon Go).',
    keyPoints: [
      'Increases customer conversion rates and average order value',
      'Optimizes supply chains and perishable inventory management',
      'Powers dynamic pricing algorithms reacting to real-time market competition'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q43',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Recommendation Engines & Demand Forecasting',
    question: 'How do recommendation engines and demand forecasting help retail?',
    answer: '• Recommendation Engines: Analyze user preferences, past purchases, and similarity between customer profiles to suggest relevant items, significantly increasing basket size, conversion rates, and customer retention.\n• Demand Forecasting: Leverages historical sales data, weather forecasts, seasonality, and promotional trends to predict future sales quantities accurately, allowing retailers to optimize replenishment schedules, reduce overstock markdowns, and prevent lost sales from stockouts.',
    keyPoints: [
      'Recommendation engines drive >35% of Amazon\'s purchases',
      'Demand forecasting reduces supply chain buffer waste by up to 30%'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q44',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'AI Applications in Agriculture',
    question: 'Give three applications of AI in agriculture.',
    answer: 'Three key applications of AI in modern agriculture are:\n1. Crop Disease & Pest Detection: Computer vision models on smartphones or drones identifying leaf diseases, fungus, and pest infestations from aerial/field imagery.\n2. Precision Irrigation & Nutrient Management: IoT sensor models analyzing soil moisture, weather data, and evapotranspiration to automate optimal drip irrigation and fertilizer dosing.\n3. Autonomous Harvesters & Robotic Weeding: Computer vision-guided agricultural robots mechanically removing weeds and picking ripe fruit without human labor.',
    keyPoints: [
      'Reduces chemical pesticide runoff through targeted micro-spraying',
      'Conserves critical water resources',
      'Increases crop yields per hectare'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q45',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Precision Farming and Smart Farming',
    question: 'What is precision farming and smart farming?',
    answer: 'Precision (Smart) Farming is a farm management strategy that uses IoT sensors, GPS, satellite multispectral imagery, and AI algorithms to observe, measure, and respond to temporal and spatial crop variability, delivering exact inputs (water, fertilizer, pesticides) on a plant-by-plant or meter-by-meter basis rather than uniform field-wide broadcasting.',
    keyPoints: [
      'Maximizes agricultural yield while minimizing resource consumption and environmental impact',
      'Integrates satellite NDVI vegetation indexing with automated farm machinery',
      'Predicts harvest yield and optimal harvesting windows'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q46',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'AI Applications in Education',
    question: 'Give three applications of AI in education.',
    answer: 'Three significant applications of AI in education are:\n1. Intelligent Tutoring Systems (ITS): Adaptive platforms that provide customized step-by-step guidance and feedback in subjects like mathematics and programming.\n2. Automated Grading & Plagiarism Detection: AI algorithms assessing written essays, coding assignments, and standard exams while checking for academic integrity.\n3. Personalized Curriculum & Learning Path Generation: Dynamic engines adjusting pacing, difficulty, and content formats based on individual student learning speed and mastery.',
    keyPoints: [
      'Delivers scalable one-on-one personalized tutoring',
      'Frees educators from administrative grading burdens',
      'Identifies learning gaps and learning disabilities early'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q47',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'Personalized / Adaptive Learning',
    question: 'What is personalized or adaptive learning?',
    answer: 'Personalized (Adaptive) Learning is an educational methodology that uses AI algorithms to analyze a learner\'s performance, engagement, and errors in real time, dynamically tailoring the curriculum difficulty, instructional style, and practice problems to match each student\'s unique mastery level and learning pace.',
    keyPoints: [
      'Implements Bloom\'s 2-Sigma effect via computational automation',
      'Uses Knowledge Tracing models (e.g., Bayesian Knowledge Tracing, Deep Knowledge Tracing)',
      'Prevents student boredom from too-easy material and frustration from too-difficult material'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q48',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'AI in Transportation',
    question: 'Give three applications of AI in transportation (autonomous vehicles, traffic management, route optimization).',
    answer: 'Three key transportation applications are:\n1. Autonomous Vehicles (Self-Driving Cars): Sensor fusion (LiDAR, camera, radar) combined with deep vision and motion planning enabling cars (e.g., Waymo, Tesla) to steer, navigate, and avoid hazards without human intervention.\n2. Smart Traffic Management: AI analyzing real-time camera feeds and road sensors to dynamically synchronize traffic signal light timing, smoothing congestion and prioritizing emergency vehicles.\n3. Route Optimization & Fleet Logistics: Graph search and operations research algorithms (e.g., Google Maps, delivery fleets) computing dynamic optimal delivery paths based on live traffic, road closures, and delivery time windows.',
    keyPoints: [
      'Reduces traffic accidents caused by human driver error',
      'Lowers carbon emissions and fuel consumption through minimized idling',
      'Optimizes last-mile urban logistics'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q49',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'AI in Scientific Experimentation',
    question: 'How is AI used in scientific experimentation?',
    answer: 'AI accelerates scientific experimentation by acting as an active discovery partner: it formulates scientific hypotheses, designs optimal high-throughput laboratory experiments (Bayesian Optimization), controls automated robotic chemistry/biology workstations ("self-driving laboratories"), and mines petabytes of raw experimental data (e.g., particle collisions in CERN, gravitational waves in LIGO) for statistical anomalies.',
    keyPoints: [
      'Automates tedious experimental design loops',
      'Filters signal from overwhelming background noise in particle physics and astronomy',
      'Enables continuous closed-loop experimentation 24/7'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u5-q50',
    subject: 'ai',
    unit: 5,
    unitTitle: 'Unit V: Planning and Industrial Applications of AI',
    topic: 'AI in Multi-Disciplinary Research',
    question: 'How does AI support multi-disciplinary research (for example, biology plus computing)?',
    answer: 'AI bridges disparate scientific domains by translating high-dimensional empirical biological data into computable mathematical structures: in bioinformatics and structural biology (AlphaFold, ESMFold), deep learning decodes biological sequence-to-structure relationships; in materials science, neural networks discover novel battery alloys; in neurocomputing, biological brain mechanics inspire neuromorphic AI architectures.',
    keyPoints: [
      'Translates massive biological genomic/proteomic data into predictable models',
      'Cross-pollinates computational algorithms with domain-specific physical principles',
      'Unlocks breakthroughs at the intersection of chemistry, physics, biology, and computer science'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
];
