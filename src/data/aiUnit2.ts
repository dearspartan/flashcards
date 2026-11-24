import type { Flashcard } from '../types';

export const AI_UNIT_2_CARDS: Flashcard[] = [
  {
    id: 'ai-u2-q1',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'State Space Representation',
    question: 'What is a state space?',
    answer: 'A state space is the set of all possible configurations, states, or situations that an agent or problem can potentially reach, starting from the initial state through all valid sequences of actions.',
    keyPoints: [
      'Formally represented as a directed graph where nodes represent states and directed edges represent valid transitions/actions',
      'Defines the complete universe of discourse for search algorithms',
      'Can be finite (e.g., Tic-Tac-Toe) or infinite (e.g., continuous robotic navigation)'
    ],
    diagram: `[Initial State S0] ---> (Action a1) ---> [State S1] ---> [Goal State G]
          |                                   ^
          +-----------> (Action a2) ---> [State S2] ---+`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q2',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Problem Formulation',
    question: 'List the components of a problem definition.',
    answer: 'A well-defined problem in AI consists of 5 fundamental components:\n1. Initial State: Starting configuration of the agent\n2. Actions / Transition Model: Set of valid actions and Result(s, a)\n3. Goal Test: Condition determining if a state is a goal\n4. Path Cost Function: Cost assigned to each action path (g)\n5. State Space: All states reachable from initial state.',
    keyPoints: [
      'Together, initial state, actions, and transition model define the state space implicitly',
      'Goal test can be explicit (specific state ID) or implicit (abstract condition, e.g., checkmate)',
      'Path cost function g(n) typically sums step costs c(s, a, s\')'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q3',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Problem Formulation Components',
    question: 'What are the initial state, goal state and operators?',
    answer: '• Initial State: The environment configuration in which the agent begins the search process.\n• Goal State: The desired destination state or set of states satisfying the goal condition.\n• Operators (Actions): Legal transition functions that transform one state into another when applied.',
    keyPoints: [
      'Operator = Precondition + Effect (e.g., Move(Disk, Peg_A, Peg_B))',
      'The agent applies operators sequentially to navigate from initial state to goal state',
      'Branching factor (b) equals the number of applicable operators at a state'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q4',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Path Cost',
    question: 'What is a path cost?',
    answer: 'Path cost, denoted as g(p) or g(n), is a numerical evaluation metric assigned to a path through the state space. It is usually the sum of the individual step costs c(s, a, s\') of each action along that path from the initial state to state n.',
    keyPoints: [
      'Formula: g(n) = Σ c(s_i, a_i, s_{i+1}) for i = 0 to k-1',
      'An optimal path has the lowest path cost among all viable solution paths',
      'Step costs are assumed non-negative (c >= 0) to avoid infinite negative loops'
    ],
    formula: 'g(n) = \\sum_{i=0}^{k-1} c(s_i, a_i, s_{i+1})',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q5',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Solution Definition',
    question: 'Define a solution to a search problem.',
    answer: 'A solution is a sequence of actions (or operators) that leads from the initial state to a state that satisfies the goal test. An optimal solution is a solution that achieves the lowest path cost among all possible solutions.',
    keyPoints: [
      'Search algorithms return the action sequence (path), not just the goal node',
      'Quality of solution is measured by path cost',
      'Search cost = Time/Space expended to find the solution; Total cost = Search cost + Path cost'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q6',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Tower of Hanoi State Space',
    question: 'Represent the Tower of Hanoi as a state space problem.',
    answer: 'In the Tower of Hanoi with n disks and 3 pegs (A, B, C):\n• State: An n-tuple (p_1, p_2, ..., p_n) where p_i ∈ {A, B, C} indicates the peg where disk i currently resides (ordered smallest disk 1 to largest disk n).\n• Initial State: (A, A, ..., A) — all disks on peg A.\n• Goal State: (C, C, ..., C) — all disks on peg C.\n• Operators: Move top disk from peg X to peg Y, provided peg Y has no smaller disk.',
    keyPoints: [
      'Each disk can be on any of the 3 pegs, yielding 3^n total valid configurations',
      'For n=3: Initial = (A, A, A), Goal = (C, C, C)',
      'Precondition: Disk i is uppermost on Peg X, and topmost disk on Peg Y is > disk i'
    ],
    diagram: `Peg A        Peg B        Peg C
  [1]          |            |
 [ 2 ]         |            |
[  3  ]        |            |
=======      =======      =======
Initial: (A,A,A) ---> Goal: (C,C,C)`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q7',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Tower of Hanoi Moves',
    question: 'How many moves are needed for n disks in the Tower of Hanoi?',
    answer: 'The minimum number of moves required to solve the Tower of Hanoi with n disks is exactly 2^n - 1 moves.',
    keyPoints: [
      'Recurrence relation: M(n) = 2 · M(n - 1) + 1, with base case M(1) = 1',
      'For n = 1: 2^1 - 1 = 1 move',
      'For n = 3: 2^3 - 1 = 7 moves',
      'For n = 64: 2^64 - 1 ≈ 1.84 × 10^19 moves (legendary Brahmin monks problem)'
    ],
    formula: 'M(n) = 2^n - 1',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q8',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Tower of Hanoi States',
    question: 'How many states exist in the 3-disk Tower of Hanoi?',
    answer: 'There are exactly 3^3 = 27 distinct valid states in the 3-disk Tower of Hanoi problem.',
    keyPoints: [
      'Each of the 3 disks can reside on any one of the 3 pegs (A, B, or C)',
      'Since smaller disks must always sit atop larger disks on a peg, disk positions on a peg are uniquely ordered (no invalid permutations on a peg)',
      'Formula for n disks: 3^n states. For n = 3: 3^3 = 27 states'
    ],
    formula: '\\text{Total States} = 3^n = 3^3 = 27',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q9',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Tower of Hanoi Rules',
    question: 'What are the rules of the Tower of Hanoi?',
    answer: 'The three fundamental rules of the Tower of Hanoi are:\n1. Only one disk can be moved at a time.\n2. Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty peg.\n3. No larger disk may ever be placed on top of a smaller disk.',
    keyPoints: [
      'Only the topmost disk of any peg is accessible for movement',
      'Rule 3 enforces strict monotonic ordering of disk sizes on every peg at all times',
      'The objective is to transfer all n disks from the source peg to the destination peg'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q10',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Uninformed vs Informed Search',
    question: 'Differentiate uninformed and informed search.',
    answer: '• Uninformed (Blind) Search: Has no domain-specific knowledge beyond the problem definition (can only generate successors and test for goal). Examples: BFS, DFS, UCS, DLS, IDS.\n• Informed (Heuristic) Search: Uses problem-specific knowledge via a heuristic function h(n) to estimate distance to the goal and guide search efficiently. Examples: Greedy Best-First Search, A*, IDA*.',
    keyPoints: [
      'Uninformed search explores blindly; informed search explores promising nodes first',
      'Informed search dramatically reduces time and space search complexity',
      'Heuristic function h(n) is the differentiating factor'
    ],
    diagram: `Uninformed (Blind):   Explores uniformly in all directions
Informed (Heuristic): Focused beam directly towards goal using h(n)`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q11',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Search Evaluation Criteria',
    question: 'List four criteria for evaluating a search strategy.',
    answer: 'The four criteria for evaluating search algorithms are:\n1. Completeness: Is the algorithm guaranteed to find a solution if one exists?\n2. Optimality: Does the strategy find the lowest path cost solution?\n3. Time Complexity: How long (how many nodes generated) does it take to find a solution?\n4. Space Complexity: How much memory is needed to perform the search?',
    keyPoints: [
      'Parameters used: b (branching factor), d (depth of shallowest goal), m (maximum depth of state space)',
      'Space complexity is often the critical bottleneck in practical AI applications',
      'Time and space are expressed using asymptotic Big-O notation'
    ],
    mnemonic: 'COTS: Completeness, Optimality, Time, Space',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q12',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Completeness and Optimality',
    question: 'Define completeness and optimality of a search.',
    answer: '• Completeness: A search algorithm is complete if it is mathematically guaranteed to terminate and find a solution whenever a valid solution exists in the state space.\n• Optimality: A search algorithm is optimal if, among all possible solutions, it is guaranteed to return the one with the minimum path cost.',
    keyPoints: [
      'If no solution exists, a complete algorithm terminates with failure (in finite spaces)',
      'Completeness does not imply optimality (e.g., standard BFS is optimal only when step costs are identical)',
      'Incomplete algorithms may get trapped in infinite loops or dead ends'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q13',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Breadth-First Search (BFS)',
    question: 'Explain BFS in two lines.',
    answer: 'Breadth-First Search (BFS) is an uninformed search strategy that systematically expands the root node first, followed by all of its successors, exploring the search tree level by level using a First-In, First-Out (FIFO) queue.',
    keyPoints: [
      'Explores all nodes at depth d before moving to any node at depth d+1',
      'Uses a FIFO queue for open frontier nodes',
      'Guarantees finding the shallowest goal state'
    ],
    diagram: `       (1) Level 0
      /   \\
    (2)   (3) Level 1
   /  \\   /  \\
 (4)  (5)(6)  (7) Level 2  [Level-by-level traversal]`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q14',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'BFS Complexity',
    question: 'Time and space complexity of BFS?',
    answer: 'For a search tree with branching factor b and shallowest goal depth d:\n• Time Complexity: O(b^d) [or O(b^{d+1}) depending on when goal test is applied]\n• Space Complexity: O(b^d) [stores all frontier nodes in memory].',
    keyPoints: [
      'Memory consumption is the fatal limitation of BFS in large state spaces',
      'At depth 10 with b=10: requires 10^10 nodes in memory (~Terabytes/Petabytes)',
      'Both time and space grow exponentially with goal depth d'
    ],
    formula: '\\text{Time} = O(b^d), \\quad \\text{Space} = O(b^d)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q15',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'BFS Completeness and Optimality',
    question: 'Is BFS complete and optimal?',
    answer: '• Completeness: Yes, BFS is complete if the branching factor b is finite.\n• Optimality: Yes, BFS is optimal if all step costs are equal (uniform step cost c = 1). However, if action costs differ, BFS is NOT optimal (Uniform Cost Search is required).',
    keyPoints: [
      'BFS always finds the goal at the shallowest depth d',
      'If step costs are non-uniform, a shallow goal may have higher total path cost than a deeper goal',
      'Guaranteed to terminate with failure if state space is finite and no goal exists'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q16',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Depth-First Search (DFS)',
    question: 'Explain DFS in two lines.',
    answer: 'Depth-First Search (DFS) expands the deepest unexpanded node first, proceeding down a single branch until a goal is found or a dead end is reached, utilizing a Last-In, First-Out (LIFO) stack (or recursion) to backtrack.',
    keyPoints: [
      'Follows one path from root all the way to maximum depth m before backtracking',
      'Implemented using a LIFO stack or recursive function calls',
      'Extremely memory efficient compared to BFS'
    ],
    diagram: `       (1)
      /   \\
    (2)   (6)
   /  \\
 (3)  (4)
       |
      (5)  [Explores deep branch to the bottom first]`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q17',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'DFS Complexity',
    question: 'Time and space complexity of DFS?',
    answer: 'For branching factor b and maximum tree depth m:\n• Time Complexity: O(b^m) — can traverse the entire tree if the goal is at the far right or deepest level.\n• Space Complexity: O(b · m) — linear space, only needs to store current path nodes and unexpanded siblings.',
    keyPoints: [
      'Linear space O(bm) is the supreme advantage of DFS over BFS',
      'Time complexity can be far worse than BFS if m >> d (maximum depth >> goal depth)',
      'For infinite trees (m = ∞), time complexity is unbounded'
    ],
    formula: '\\text{Time} = O(b^m), \\quad \\text{Space} = O(b \\cdot m)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q18',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'DFS Incompleteness',
    question: 'Why is DFS not complete in general?',
    answer: 'DFS is not complete because in infinite state spaces or spaces with cycles/loops, it can get trapped descending an infinite non-goal path or repeating a cycle forever, never backtracking to explore alternative branches containing the solution.',
    keyPoints: [
      'In infinite depth trees (m = ∞), DFS will never terminate if it chooses the wrong branch',
      'In graphs with cycles, DFS gets stuck in infinite loops without cycle detection (closed set)',
      'DFS is complete only in finite state spaces with graph search (visited states tracking)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q19',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Iterative Deepening Search (IDS)',
    question: 'Define Iterative Deepening Search.',
    answer: 'Iterative Deepening Search (IDS or IDDFS) is a search strategy that repeatedly applies Depth-Limited Search (DLS) with progressively increasing depth limits (limit = 0, 1, 2, 3, ...) until a goal state is discovered at depth d.',
    keyPoints: [
      'Combines the linear memory advantages of DFS with the completeness and optimality of BFS',
      'Discards previous search trees and regenerates from scratch each iteration',
      'Preferred uninformed search method for large state spaces with unknown goal depth'
    ],
    diagram: `Iteration 0: Limit = 0  --> [Root]
Iteration 1: Limit = 1  --> [Root] -> [Level 1]
Iteration 2: Limit = 2  --> [Root] -> [Level 1] -> [Level 2]
... repeats until goal found at depth d`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q20',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Benefits of IDS',
    question: 'Why does IDS combine the benefits of BFS and DFS?',
    answer: 'IDS captures the best properties of both algorithms:\n1. From BFS: It is complete (finds goal) and optimal (finds shallowest goal when step costs are equal).\n2. From DFS: It requires only O(b · d) linear space memory, avoiding the exponential memory catastrophe of BFS.',
    keyPoints: [
      'Memory footprint: O(bd) instead of BFS\'s O(b^d)',
      'Completeness: guaranteed for finite branching factor b',
      'Optimality: guaranteed for unit step costs'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q21',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Repeated Expansion in IDS',
    question: 'Why is repeated expansion in IDS not a big problem?',
    answer: 'Because in an exponential tree (b > 1), the vast majority of nodes reside in the bottom-most level. Upper-level nodes are generated multiple times, but their total number is negligibly small compared to the bottom layer. The overhead is typically only ~11% to 33% extra work.',
    keyPoints: [
      'Total nodes generated: (d)·b + (d-1)·b^2 + ... + 1·b^d',
      'For b=10, d=5: IDS generates ~111,110 nodes, while BFS generates ~100,000 nodes',
      'Asymptotically, IDS time complexity remains O(b^d), identical in order of magnitude to BFS'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q22',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'IDS Complexity',
    question: 'Time and space complexity of IDS?',
    answer: 'For branching factor b and shallowest goal depth d:\n• Time Complexity: O(b^d) — proportional to the number of nodes at the goal depth.\n• Space Complexity: O(b · d) — linear memory, proportional to the maximum search depth d.',
    keyPoints: [
      'Space is linear: O(bd), solving the primary drawback of BFS',
      'Time is exponential: O(b^d), matching BFS in asymptotic efficiency',
      'Optimal uninformed search when state space is large and depth is unknown'
    ],
    formula: '\\text{Time} = O(b^d), \\quad \\text{Space} = O(b \\cdot d)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q23',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Comparison Table: BFS vs DFS vs IDS',
    question: 'Compare BFS, DFS and IDS in a table.',
    answer: 'Comparative Summary of Uninformed Search Strategies:\n\nCriterion      | BFS          | DFS          | IDS\n---------------|--------------|--------------|--------------\nCompleteness   | Yes (if b<∞) | No (loops/∞) | Yes (if b<∞)\nOptimality     | Yes (cost=1) | No           | Yes (cost=1)\nTime           | O(b^d)       | O(b^m)       | O(b^d)\nSpace          | O(b^d) (exp) | O(bm) (lin)  | O(bd) (lin)\nData Structure | FIFO Queue   | LIFO Stack   | Stack (Iter)',
    keyPoints: [
      'b = branching factor, d = goal depth, m = maximum depth',
      'BFS has catastrophic space complexity O(b^d)',
      'DFS can get lost in infinite paths O(b^m)',
      'IDS achieves O(bd) space and O(b^d) time with completeness & optimality'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q24',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Heuristic Definition',
    question: 'What is a heuristic?',
    answer: 'A heuristic is a "rule of thumb", practical shortcut, or educated estimate used to solve complex problems faster when classic exhaustive methods are too slow. In AI, it provides domain-specific knowledge to estimate how close a given state is to the goal.',
    keyPoints: [
      'Derived from Greek "heuriskein" meaning "to discover" or "to find"',
      'Sacrifices guaranteed optimality or completeness in exchange for dramatic speedups',
      'Acts as a ranking function to prioritize the most promising paths in search'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q25',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Heuristic Function h(n)',
    question: 'What is a heuristic function h(n)?',
    answer: 'A heuristic function h(n) is a mathematical function that takes a state or node n as input and returns an estimated non-negative cost of the cheapest path from node n to a goal state.',
    keyPoints: [
      'Property: If n is a goal state, then h(n) = 0',
      'h(n) depends purely on the state description, not the path taken to reach n',
      'The closer h(n) is to true remaining cost h*(n), the fewer unnecessary nodes searched'
    ],
    formula: 'h(n) \\approx h^*(n), \\quad h(\\text{Goal}) = 0',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q26',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Admissible Heuristic',
    question: 'What makes a heuristic admissible?',
    answer: 'A heuristic h(n) is admissible if it NEVER overestimates the true cost to reach the goal from node n. That is, for every node n, h(n) ≤ h*(n), where h*(n) is the true optimal cost from n to the nearest goal.',
    keyPoints: [
      'An admissible heuristic is optimistic ("thinking the goal is closer than it really is")',
      'Required for tree-search A* to guarantee optimality',
      'Trivial admissible heuristic: h(n) = 0 (degenerates A* to Uniform-Cost Search)'
    ],
    formula: '0 \\le h(n) \\le h^*(n) \\quad \\forall n',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q27',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Consistent (Monotonic) Heuristic',
    question: 'What makes a heuristic consistent?',
    answer: 'A heuristic h(n) is consistent (or monotonic) if, for every node n and every successor n\' generated by action a with step cost c(n, a, n\'), the estimated cost satisfies the triangle inequality: h(n) ≤ c(n, a, n\') + h(n\').',
    keyPoints: [
      'Consistency is a stronger condition than admissibility: every consistent heuristic is admissible',
      'Required for graph-search A* (with a closed set) to guarantee finding optimal paths without reopening nodes',
      'Ensures f(n) values are monotonically non-decreasing along any path'
    ],
    formula: 'h(n) \\le c(n, a, n\') + h(n\')',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q28',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: '8-Puzzle Heuristics',
    question: 'Give two heuristics for the 8-puzzle.',
    answer: 'The two standard admissible heuristics for the 8-puzzle are:\n1. h_1(n) = Misplaced Tiles: The count of tiles that are not in their target goal positions (excluding the blank tile).\n2. h_2(n) = Manhattan Distance (City Block): The sum of the horizontal and vertical grid distances of each tile from its target goal position.',
    keyPoints: [
      'Both h_1 and h_2 are admissible and consistent',
      'Manhattan distance dominates misplaced tiles: h_2(n) ≥ h_1(n) for all n',
      'Dominance implies A* using h_2 will expand fewer or equal nodes than with h_1'
    ],
    diagram: `Current State       Goal State
 [ 7 | 2 | 4 ]       [ 1 | 2 | 3 ]
 [ 5 | _ | 6 ]  -->  [ 4 | 5 | 6 ]
 [ 8 | 3 | 1 ]       [ 7 | 8 | _ ]
h1 = Count of misplaced tiles
h2 = Sum of |x1 - x2| + |y1 - y2| for each tile`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q29',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Route-Finding Heuristic',
    question: 'What is the heuristic in a route-finding problem?',
    answer: 'In route-finding (e.g., finding the shortest driving route between cities on a map), the standard heuristic is the Straight-Line Distance (Euclidean distance) to the goal city: h_{SLD}(n).',
    keyPoints: [
      'Formula: h_{SLD}(n) = sqrt((x_n - x_{goal})^2 + (y_n - y_{goal})^2)',
      'Admissible because a straight line is the shortest possible physical distance between two points (roads can only curve or equal it, never be shorter)',
      'Consistent because straight-line distances satisfy the geometric triangle inequality'
    ],
    formula: 'h_{SLD}(n) = \\sqrt{(x_n - x_g)^2 + (y_n - y_g)^2}',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q30',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Greedy Best-First Search',
    question: 'Explain Greedy Best-First Search.',
    answer: 'Greedy Best-First Search is an informed search algorithm that always expands the node that appears closest to the goal according to the heuristic function h(n), ignoring the path cost incurred so far (g(n)).',
    keyPoints: [
      'Uses evaluation function f(n) = h(n)',
      'Selects the node with minimum h(n) from the priority queue',
      'Like DFS, it greedily chases the goal down what looks like the fastest route, which can lead to disastrous dead ends'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q31',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Greedy BFS Node Selection',
    question: 'Which function does Greedy BFS use to select nodes?',
    answer: 'Greedy Best-First Search selects nodes solely using the heuristic evaluation function:\nf(n) = h(n)\nwhere h(n) is the estimated cost from node n to the goal.',
    keyPoints: [
      'Frontier is ordered as a priority queue with minimum h(n) at the head',
      'Path cost from root g(n) is completely ignored',
      'Susceptible to false leads when local estimates are deceptively low'
    ],
    formula: 'f(n) = h(n)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q32',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Greedy BFS Completeness and Optimality',
    question: 'Is Greedy BFS complete and optimal?',
    answer: '• Completeness: No, Greedy BFS is NOT complete in general (it can get stuck in infinite loops or repeated states without cycle checks).\n• Optimality: No, Greedy BFS is NOT optimal. It selects locally promising steps that often result in much longer overall paths.',
    keyPoints: [
      'In a graph search with a finite state space and closed set, it is complete, but still non-optimal',
      'Worst-case time and space complexity: O(b^m)',
      'Sacrifices optimality for search speed in simple domains'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q33',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'A* Algorithm',
    question: 'Explain the A* algorithm.',
    answer: 'A* is the most widely known best-first search algorithm that evaluates nodes by combining the actual cost to reach the node g(n) and the estimated cost to reach the goal h(n): f(n) = g(n) + h(n). It expands the frontier node with the lowest f(n) value.',
    keyPoints: [
      'Combines UCS (which minimizes g(n)) with Greedy BFS (which minimizes h(n))',
      'Guaranteed to find the optimal path if heuristic h(n) is admissible (tree) or consistent (graph)',
      'Optimally efficient: no other optimal algorithm expanding the same heuristic expands fewer nodes'
    ],
    diagram: `Start [S] ===== g(n) (known cost) =====> Node [n] ..... h(n) (estimated) .....> Goal [G]
                Total estimated path cost: f(n) = g(n) + h(n)`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q34',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'A* Evaluation Function',
    question: 'Write the A* evaluation function.',
    answer: 'The evaluation function for A* is:\nf(n) = g(n) + h(n)\nwhere:\n• f(n) = estimated total cost of the cheapest solution path through node n\n• g(n) = cost to reach node n from the start node\n• h(n) = estimated cost from node n to the nearest goal state.',
    keyPoints: [
      'Priority queue pops the node with argmin f(n)',
      'If h(n) = 0, f(n) = g(n) -> Uniform Cost Search',
      'If g(n) = 0, f(n) = h(n) -> Greedy Best-First Search'
    ],
    formula: 'f(n) = g(n) + h(n)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q35',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Components g(n), h(n) and f(n)',
    question: 'What are g(n), h(n) and f(n)?',
    answer: '• g(n): The exact path cost incurred so far from the start node to the current node n.\n• h(n): The heuristic estimate of the remaining cost from current node n to the goal state.\n• f(n): The estimated total path cost of the cheapest complete path going through node n from start to goal.',
    keyPoints: [
      'g(n) is known fact (backward cost)',
      'h(n) is educated guess (forward cost)',
      'f(n) balances past commitment with future promise'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q36',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'A* Optimality Condition',
    question: 'When is A* optimal?',
    answer: 'A* is optimal under two conditions depending on the search type:\n1. In Tree Search: When the heuristic function h(n) is admissible (never overestimates).\n2. In Graph Search: When the heuristic function h(n) is consistent (satisfies the triangle inequality: h(n) ≤ c(n, a, n\') + h(n\')).',
    keyPoints: [
      'Consistency prevents the algorithm from having to reopen previously closed nodes',
      'Step costs must be strictly positive (c > 0) to avoid Zeno\'s paradox or infinite cycles',
      'Ensures the first time a goal node is selected for expansion, its path is guaranteed minimal'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q37',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Admissible Heuristic Non-Overestimation',
    question: 'Why does A* with an admissible heuristic never overestimate?',
    answer: 'By definition, an admissible heuristic satisfies h(n) ≤ h*(n) for all nodes n. Because it never overestimates the true remaining cost, A* never rejects a true optimal path in favor of a suboptimal one, as the estimated cost f(n) of nodes on the optimal path will always remain lower than or equal to the actual cost of any suboptimal goal.',
    keyPoints: [
      'Suppose a suboptimal goal G_2 is on the frontier. Its f(G_2) = g(G_2) > C*',
      'Any node n on the optimal path satisfies f(n) = g(n) + h(n) ≤ C*',
      'Therefore, f(n) < f(G_2), ensuring n is expanded before G_2 is ever selected'
    ],
    formula: 'f(n) \\le C^* < f(G_2)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q38',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Difference: A* vs Greedy BFS',
    question: 'Difference between A* and Greedy BFS?',
    answer: '• Evaluation Function: A* uses f(n) = g(n) + h(n); Greedy BFS uses f(n) = h(n).\n• Path Cost Awareness: A* accounts for past accumulated cost g(n); Greedy BFS completely ignores past cost.\n• Optimality & Completeness: A* is complete and optimal (with admissible/consistent heuristic); Greedy BFS is neither optimal nor complete.\n• Search Behavior: A* expands in contour ellipses of equal f-value; Greedy BFS rushes aggressively towards local heuristic minima.',
    keyPoints: [
      'A* will not be fooled by short dead-end paths because g(n) keeps accumulating',
      'Greedy BFS behaves like an erratic depth-first search guided by intuition',
      'A* balances exploration (g) and exploitation (h)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q39',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Open and Closed Lists in A*',
    question: 'What are the open and closed lists in A*?',
    answer: '• Open List (Frontier): A priority queue containing all nodes that have been generated but not yet expanded, ordered by increasing f(n).\n• Closed List (Explored Set): A hash table or set storing all nodes that have already been expanded, preventing the algorithm from re-expanding the same state and falling into cycles.',
    keyPoints: [
      'Algorithm pops the node with lowest f(n) from Open and moves it to Closed',
      'When generating children: skip if already in Closed (assuming consistency)',
      'If a child is in Open with higher g, update it with the cheaper path'
    ],
    diagram: `[Initial Node] --> [ OPEN LIST (Priority Queue) ]
                           |  (Pop lowest f(n))
                           v
                     [ Expanded Node ]
                           |
                           v
                  [ CLOSED LIST (Hash Set) ]`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q40',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Blind Search vs Heuristic Search',
    question: 'Differentiate blind search and heuristic search (three points).',
    answer: 'Three key differences:\n1. Knowledge Used: Blind search uses only problem definition information (no knowledge of goal distance); Heuristic search uses domain-specific knowledge to estimate distance to goal.\n2. Efficiency: Blind search explores systematically in all directions (exponential node expansions); Heuristic search directs search towards the goal, drastically reducing expansions.\n3. Practicality: Blind search is impractical for large/infinite state spaces; Heuristic search can solve complex real-world problems (e.g., GPS routing, automated planning).',
    keyPoints: [
      'Blind examples: BFS, DFS, UCS, IDS',
      'Heuristic examples: Greedy Best-First, A*, IDA*',
      'Heuristic functions provide directional guidance'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q41',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Local Search Algorithms',
    question: 'What are local search algorithms and when are they used?',
    answer: 'Local search algorithms operate using a single current state (rather than multiple paths) and generally move only to neighboring states. They are used in optimization problems where the path to the goal is irrelevant and only the final configuration (goal state) matters (e.g., 8-Queens, TSP, VLSI layout design).',
    keyPoints: [
      'Requires very little memory (constant space O(1))',
      'Can find reasonable solutions in massive or infinite state spaces',
      'Examples: Hill Climbing, Simulated Annealing, Genetic Algorithms, Local Beam Search'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q42',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Optimization Problem',
    question: 'What is an optimization problem?',
    answer: 'An optimization problem is a computational task where the objective is to find the best state or configuration from all feasible alternatives according to an objective function, either maximizing a reward/fitness function or minimizing a cost/loss function.',
    keyPoints: [
      'Maximization: Find argmax f(x) (e.g., profit, fitness)',
      'Minimization: Find argmin c(x) (e.g., travel distance in TSP, error in neural nets)',
      'Focus is strictly on the final state x*, not the path taken to reach it'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q43',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'State Space Landscape',
    question: 'Explain the state space landscape (global maximum, local maximum, plateau, ridge).',
    answer: 'The state space landscape plots state configurations against an objective function elevation:\n• Global Maximum: The absolute highest peak in the entire state space (optimal solution).\n• Local Maximum: A peak that is higher than all its neighboring states, but lower than the global maximum.\n• Plateau (Shoulder/Flat): A flat area where all neighboring states have identical elevation.\n• Ridge: A sequence of local maxima leading uphill whose slope cannot be climbed directly along cardinal coordinate directions.',
    keyPoints: [
      'Local maxima and plateaus cause greedy algorithms like hill climbing to terminate prematurely',
      'Shoulder: a plateau that continues to rise on one side',
      'Flat local maximum: a plateau from which no uphill exit exists'
    ],
    diagram: `Objective
Function  ^         _-- Global Max
          |        / \\
          |       /   \\        _-- Local Max
          |  __--/     \\      / \\
          | / Plateau   \\_---/   \\_   Ridge: \\ /\\ /
          +---------------------------------------> State Space`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q44',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Hill Climbing Search',
    question: 'Explain hill climbing in two lines.',
    answer: 'Hill climbing is a greedy local search algorithm that continually moves in the direction of increasing elevation (steepest ascent) to find the peak of an objective function, terminating when no neighbor has a higher value.',
    keyPoints: [
      'Analogy: "Climbing Mount Everest in a thick fog with amnesia"',
      'Maintains only one current state in memory (O(1) space)',
      'Greedy: never makes downhill moves to escape suboptimal traps'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q45',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Hill Climbing Algorithm',
    question: 'Write the hill climbing algorithm.',
    answer: 'function HILL-CLIMBING(problem) returns a state that is a local maximum\n  current = problem.INITIAL-STATE\n  loop do\n    neighbor = highest-valued successor of current\n    if neighbor.VALUE <= current.VALUE then return current.STATE\n    current = neighbor\n  end',
    keyPoints: [
      'Evaluates all immediate neighbors and picks the best one (Steepest-Ascent)',
      'If the best neighbor is not strictly better than current, algorithm stops',
      'Time complexity is low, but success depends heavily on initial starting state'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q46',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Hill Climbing Problems',
    question: 'List the three problems of hill climbing (local maxima, plateau, ridge).',
    answer: 'The three classical failure modes of hill climbing are:\n1. Local Maxima: A peak that is higher than its neighbors but lower than the global optimum; the algorithm halts here thinking it found the top.\n2. Plateaus: Flat regions (flat maxima or shoulders) where all neighboring moves have the same value, causing random wandering or premature stagnation.\n3. Ridges: Narrow steep slopes where steps along individual action dimensions oscillate back and forth down the slope rather than moving diagonally along the spine.',
    keyPoints: [
      'Caused by the strictly greedy, myopic nature of the algorithm',
      'Overcome using random restarts, sideways moves limit, or simulated annealing',
      'In convex landscapes, hill climbing is guaranteed to find global optimum'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q47',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Random Restart Hill Climbing',
    question: 'How can random restarts help hill climbing?',
    answer: 'Random-restart hill climbing runs a series of independent hill-climbing searches, each starting from a randomly generated initial state, and keeps track of the best overall state found across all runs. It provides completeness with probability approaching 1.',
    keyPoints: [
      'If probability of hitting global optimum is p, expected restarts needed = 1/p',
      'Tackles the local maximum problem by scattering starting seeds across the entire landscape',
      'Surpasses a single long search by trading time for guaranteed coverage'
    ],
    formula: 'E(\\text{Restarts}) = \\frac{1}{p}',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q48',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Simulated Annealing Concept',
    question: 'What is simulated annealing and where does the name come from?',
    answer: 'Simulated Annealing is a stochastic local search algorithm that escapes local maxima by allowing occasional downhill moves with a probability that decreases over time. The name comes from annealing in metallurgy: heating a metal to a high temperature and cooling it slowly to allow atoms to settle into a minimum-energy crystalline lattice.',
    keyPoints: [
      'Combines hill climbing with random walk for efficiency and completeness',
      'High temperature T: accepts worse moves frequently (exploratory)',
      'Low temperature T: behaves almost like pure hill climbing (exploitative)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q49',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Temperature in Simulated Annealing',
    question: 'What is the role of temperature in simulated annealing, and what are its advantages and disadvantages?',
    answer: '• Role of Temperature (T): Controls the probability of accepting downhill (suboptimal) moves. The acceptance probability is P = e^{ΔE / T} (where ΔE is change in fitness). As T cools towards 0, downhill moves become impossible.\n• Advantages: Can escape local maxima; guaranteed to converge to the global optimum if the cooling schedule is sufficiently slow.\n• Disadvantages: Slow convergence in large spaces; highly sensitive to the cooling schedule parameters.',
    keyPoints: [
      'If ΔE > 0 (improvement), move is always accepted',
      'If ΔE < 0 (worse move), move accepted with probability e^{ΔE / T}',
      'Boltzmann acceptance distribution from statistical mechanics'
    ],
    formula: 'P = e^{\\frac{\\Delta E}{T}}',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u2-q50',
    subject: 'ai',
    unit: 2,
    unitTitle: 'Unit II: Problem Solving, State Approach and Search Strategies',
    topic: 'Local Beam Search & Online Search',
    question: 'Explain local beam search, and what is an online search agent?',
    answer: '• Local Beam Search: Keeps track of k states (rather than 1). At each step, it generates all successors of all k states and retains only the k best successors overall, facilitating information sharing among parallel searches.\n• Online Search Agent: An agent that interleaves computation and action in an unknown real-time environment — it executes an action, perceives the real outcome, and computes the next step on the fly rather than planning offline.',
    keyPoints: [
      'Beam search with k=1 is standard hill climbing; k=∞ approaches breadth-first search',
      'Different from k random restarts because the k threads share information at each generation',
      'Online agents are essential in dynamic or partially observable worlds'
    ],
    diagram: `Level t:   [State 1]   [State 2]   [State 3]  (k = 3)
              \\   |   /   \\   |   /   \\   |   /
All Successors: [s1, s2, s3, s4, s5, s6, s7, s8, s9]
                     | (Select top 3)
Level t+1: [Best 1]    [Best 2]    [Best 3]`,
    difficulty: 'new',
    repetitions: 0,
  },
];
