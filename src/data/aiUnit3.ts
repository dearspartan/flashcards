import type { Flashcard } from '../types';

export const AI_UNIT_3_CARDS: Flashcard[] = [
  {
    id: 'ai-u3-q1',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Adversarial Search Concept',
    question: 'What is adversarial search?',
    answer: 'Adversarial search is a search problem in multi-agent competitive environments where two or more opponents have conflicting, mutually opposing goals, and the actions of one agent directly impact and attempt to diminish the utility of the other agent (e.g., Chess, Checkers, Go).',
    keyPoints: [
      'Unpredictable opponent: the agent cannot just plan a fixed action sequence',
      'Requires planning contingent responses for every potential counter-move',
      'Analyzed through game-theoretic frameworks (Minimax, Alpha-Beta)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q2',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Game Theory Definition',
    question: 'What is game theory?',
    answer: 'Game theory is the mathematical study of strategic interactions among rational decision-makers, where each player chooses actions to maximize their payoff while anticipating the rational choices and counter-strategies of other players.',
    keyPoints: [
      'Pioneered by John von Neumann and Oskar Morgenstern',
      'Provides normative models of optimal play (e.g., Nash equilibrium, Minimax theorem)',
      'Classifies environments by zero-sum vs. general-sum, cooperative vs. non-cooperative, and perfect vs. imperfect information'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q3',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Elements of a Game',
    question: 'Name the elements of a game (players, states, actions, terminal test, utility).',
    answer: 'A formal game in AI is defined by 6 core elements:\n1. Players: The set of participants (e.g., MAX and MIN)\n2. States: Initial state S_0 and set of legal board configurations\n3. Actions(s): Set of legal moves available to Player(s)\n4. Result(s, a): Transition model defining state after action a\n5. Terminal-Test(s): Boolean test determining if the game is over\n6. Utility(s, p): Payoff function assigning a numerical value to player p at terminal state s (e.g., +1 for win, -1 for loss, 0 for draw).',
    keyPoints: [
      'Player(s) identifies whose turn it is to move in state s',
      'Zero-sum property means Utility_MAX + Utility_MIN = Constant (usually 0)',
      'Game tree nodes represent states; edges represent moves'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q4',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Zero-Sum Game',
    question: 'What is a zero-sum game?',
    answer: 'A zero-sum game is a mathematical game in which the total gains of the winners are exactly equal to the total losses of the losers, so the net sum of payoffs to all participants equals zero for any terminal outcome.',
    keyPoints: [
      'Strictly competitive: one player\'s benefit is invariably the opponent\'s detriment',
      'Payoff equation: Utility(MAX) + Utility(MIN) = 0 (or constant sum)',
      'Examples: Chess, Checkers, Go, Poker (heads-up); Non-examples: Prisoner\'s dilemma, trade'
    ],
    formula: '\\text{Utility}(\\text{MAX}) + \\text{Utility}(\\text{MIN}) = 0',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q5',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Game Tree',
    question: 'What is a game tree?',
    answer: 'A game tree is a directed graph tree where the root node represents the initial game configuration, edges represent legal moves, internal nodes represent intermediate game states labeled with the player whose turn it is, and leaf nodes represent terminal states evaluated by the utility function.',
    keyPoints: [
      'Alternating layers: MAX nodes alternate with MIN nodes (ply by ply)',
      'A ply represents a half-move (one turn by one player); a move consists of two plies',
      'Combinatorial explosion: Chess game tree has ~10^{123} nodes (Shannon number)'
    ],
    diagram: `MAX:                [ Root Node ]
                     /         \\
MIN:            [ Node A ]   [ Node B ]
               /     \\       /     \\
MAX:         (3)     (5)   (2)     (9)  [Terminal utilities]`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q6',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'MAX and MIN Players',
    question: 'What are MAX and MIN?',
    answer: '• MAX: The player who aims to select moves that maximize the final game utility (typically represented by our AI agent, targeting positive scores or +1/win).\n• MIN: The adversary who aims to select moves that minimize the final game utility (targeting lowest scores or -1/loss for MAX).',
    keyPoints: [
      'Both players are assumed to be optimal rational actors',
      'MAX chooses max_{a} Value(Result(s, a))',
      'MIN chooses min_{a} Value(Result(s, a))'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q7',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Utility Function in Games',
    question: 'What is a utility function in games?',
    answer: 'A utility (or payoff) function assigns an objective numerical score to terminal states of a game, defining the exact outcome value for each player (e.g., in Chess: Win = +1, Loss = -1, Draw = 0).',
    keyPoints: [
      'Defined strictly on terminal leaf states (unlike heuristic evaluation functions)',
      'Guides backward induction in the Minimax algorithm',
      'Reflects the formal winning and losing conditions of the game rules'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q8',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Minimax Algorithm Summary',
    question: 'Explain the Minimax algorithm in two lines.',
    answer: 'Minimax is a recursive decision-making algorithm for two-player zero-sum games that computes the optimal strategy for MAX by backing up values from terminal states, assuming MIN will always play the move that minimizes MAX\'s outcome.',
    keyPoints: [
      'Evaluates all branches down to terminal leaves by depth-first recursion',
      'MAX selects the maximum child value; MIN selects the minimum child value',
      'Provides a perfect game-theoretic play strategy under full information'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q9',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Minimax Algorithm Formulation',
    question: 'Write the Minimax algorithm.',
    answer: 'function MINIMAX-DECISION(state) returns an action:\n  return argmax_{a ∈ Actions(s)} MIN-VALUE(Result(s, a))\n\nfunction MAX-VALUE(state):\n  if Terminal-Test(state) return Utility(state)\n  v = -∞\n  for each a in Actions(state):\n    v = max(v, MIN-VALUE(Result(state, a)))\n  return v\n\nfunction MIN-VALUE(state):\n  if Terminal-Test(state) return Utility(state)\n  v = +∞\n  for each a in Actions(state):\n    v = min(v, MAX-VALUE(Result(state, a)))\n  return v',
    keyPoints: [
      'Mutual recursion between MAX-VALUE and MIN-VALUE',
      'Base condition checks Terminal-Test and returns terminal utility',
      'Propagates values bottom-up from leaves to root'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q10',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Minimax Complexity',
    question: 'Time and space complexity of Minimax?',
    answer: 'For a game with legal moves (branching factor) b and maximum game depth (plies) m:\n• Time Complexity: O(b^m) — performs a full depth-first search of the entire game tree.\n• Space Complexity: O(b · m) — requires storing only the current path and siblings using DFS recursion.',
    keyPoints: [
      'Space is linear O(bm), making memory negligible',
      'Time is exponential O(b^m), rendering exhaustive Minimax impractical for games like Chess (b≈35, m≈80)',
      'Necessitates depth-limited search and Alpha-Beta pruning'
    ],
    formula: '\\text{Time} = O(b^m), \\quad \\text{Space} = O(b \\cdot m)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q11',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Minimax Completeness and Optimality',
    question: 'Is Minimax complete and optimal?',
    answer: '• Completeness: Yes, Minimax is complete if the game tree is finite.\n• Optimality: Yes, Minimax is optimal against an optimal opponent (guarantees the best achievable outcome). If the opponent plays suboptimally, Minimax still achieves at least its guaranteed value, though specialized strategies might exploit the opponent faster.',
    keyPoints: [
      'Based on the Von Neumann Minimax Theorem',
      'Guarantees the minimax value against any adversarial counter-play',
      'For infinite games, depth limits are mandatory'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q12',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Minimax Drawback',
    question: 'What is the main drawback of Minimax?',
    answer: 'The primary drawback is its exponential time complexity O(b^m). In realistic games with large branching factors and deep search trees, the number of states is so astronomically vast that searching to the terminal depth within reasonable time limits is completely impossible.',
    keyPoints: [
      'Combinatorial explosion: Chess has ~10^{123} states, Go has ~10^{360} states',
      'Cannot make real-time moves within practical tournament limits (e.g., 3 minutes per move)',
      'Forces the use of heuristic evaluation functions with fixed depth cutoffs'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q13',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Alpha-Beta Pruning',
    question: 'What is Alpha-Beta pruning?',
    answer: 'Alpha-Beta pruning is an adversarial search optimization technique that prunes away branches of the game tree that are proven to have no influence on the final Minimax decision, drastically reducing the number of nodes evaluated without altering the final chosen move.',
    keyPoints: [
      'Maintains two bound values during DFS: α (alpha) and β (beta)',
      'Pruning occurs whenever α ≥ β',
      'Allows search to go twice as deep as pure Minimax in the same amount of time'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q14',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Alpha and Beta Parameters',
    question: 'What do alpha and beta represent?',
    answer: '• α (Alpha): The best (highest-value) choice found so far along the path for MAX. Initialized to -∞.\n• β (Beta): The best (lowest-value) choice found so far along the path for MIN. Initialized to +∞.',
    keyPoints: [
      'Alpha is monotonically non-decreasing (MAX only increases α)',
      'Beta is monotonically non-increasing (MIN only decreases β)',
      'Represent the current window of acceptable game values [α, β]'
    ],
    formula: '\\alpha = \\max(\\text{MAX\'s best}), \\quad \\beta = \\min(\\text{MIN\'s best})',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q15',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Pruning Condition',
    question: 'When does pruning occur?',
    answer: 'Pruning occurs when α ≥ β:\n• At a MIN node: If a child\'s value v ≤ α, MIN can force a score worse than or equal to what MAX has already secured elsewhere. MAX will never pick this branch, so remaining children are pruned (Alpha-cut).\n• At a MAX node: If a child\'s value v ≥ β, MAX can achieve a score better than or equal to MIN\'s secured alternative. MIN will never let this node be reached, so remaining children are pruned (Beta-cut).',
    keyPoints: [
      'General pruning condition: whenever child value causes α ≥ β',
      'Alpha cut: pruned at MIN node',
      'Beta cut: pruned at MAX node'
    ],
    diagram: `MAX (α=3) --------> MIN (β=3)
                     /       \\
                   (3)       [Remaining branches pruned: v <= α]`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q16',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Soundness of Alpha-Beta Pruning',
    question: 'Does alpha-beta pruning change the final result?',
    answer: 'No. Alpha-Beta pruning is mathematically guaranteed to return the exact same optimal decision and root minimax value as exhaustive Minimax search. It only prunes subtrees whose values cannot possibly change the root minimax decision.',
    keyPoints: [
      'Lossless optimization: zero information loss on optimal path',
      'Only discards provably irrelevant branches',
      'Preserves complete optimality and minimax equivalence'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q17',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Alpha-Beta Best-Case Complexity',
    question: 'What is the best-case time complexity of alpha-beta pruning?',
    answer: 'With perfect move ordering (best moves evaluated first), the best-case time complexity of Alpha-Beta pruning is O(b^{m/2}) [or O(b^{d/2})].',
    keyPoints: [
      'Effectively halves the search depth exponent: O(b^{m/2}) = O((sqrt{b})^m)',
      'Doubles the solvable search depth compared to standard Minimax in the same compute time',
      'Effective branching factor drops from b to sqrt(b) (e.g., from 36 to 6 in chess)'
    ],
    formula: '\\text{Best Time} = O(b^{m/2}) = O((\\sqrt{b})^m)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q18',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Move Ordering in Alpha-Beta',
    question: 'What is the role of move ordering in alpha-beta pruning?',
    answer: 'Move ordering dictates the pruning efficiency of Alpha-Beta:\n• Perfect Move Ordering (best moves first): Yields maximal pruning with best-case O(b^{m/2}) time complexity.\n• Random Move Ordering: Averages around O(b^{3m/4}) complexity.\n• Worst Move Ordering (worst moves first): Zero pruning occurs, degrading performance to standard Minimax O(b^m).',
    keyPoints: [
      'Heuristics used for move ordering: Killer move heuristic, history heuristic, transposition tables, iterative deepening',
      'Checking capture moves first (tactical priority) dramatically accelerates pruning',
      'Good move ordering is the single most important factor in game engine performance'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q19',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Heuristic Evaluation Function in Games',
    question: 'What is a heuristic evaluation function in games?',
    answer: 'A heuristic evaluation function, Eval(s), is a domain-specific mathematical formula that estimates the expected utility of a non-terminal board position s when search is halted at a cutoff depth, returning a numerical score indicating how favorable the position is for MAX.',
    keyPoints: [
      'Replaces terminal utility when exhaustive search is computationally impossible',
      'Commonly expressed as a weighted linear sum of features: Eval(s) = w_1 f_1(s) + w_2 f_2(s) + ... + w_n f_n(s)',
      'In Chess: Material count (Pawn=1, Knight=3, Queen=9), king safety, piece mobility, pawn structure'
    ],
    formula: '\\text{Eval}(s) = \\sum_{i=1}^{n} w_i \\cdot f_i(s)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q20',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Cutoff Test',
    question: 'What is a cutoff test?',
    answer: 'A cutoff test is a termination condition function, Cutoff-Test(state, depth), that decides when the search algorithm must stop expanding deeper nodes and instead apply the heuristic evaluation function Eval(state).',
    keyPoints: [
      'Standard rule: Cutoff when depth reaches predefined limit d (e.g., depth == 0 or depth >= MAX_DEPTH)',
      'Quiescence search: avoids cutting off during non-quiet states (e.g., active piece captures or checks) to prevent catastrophic blunders',
      'Transfers search from exhaustive Minimax to real-time heuristic search'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q21',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Horizon Effect',
    question: 'What is the horizon effect?',
    answer: 'The horizon effect occurs when a game search algorithm is confronted with an unavoidable serious detriment (e.g., losing a queen) and delays it by making delaying/spurious moves that push the damaging event beyond the fixed search depth horizon, resulting in an even worse position.',
    keyPoints: [
      'Caused by rigid depth cutoff limits ("blind beyond the horizon")',
      'The AI sacrifices pawns or position just to push the catastrophe one ply past the cutoff',
      'Mitigated by Quiescence Search and singular extensions'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q22',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Monte Carlo Tree Search (MCTS)',
    question: 'What is Monte Carlo Tree Search?',
    answer: 'Monte Carlo Tree Search (MCTS) is a heuristic search algorithm for game playing that builds an asymmetric search tree incrementally by executing random simulations (rollouts) to evaluate positions, without requiring a handcrafted domain evaluation function.',
    keyPoints: [
      'Key engine behind AlphaGo, AlphaZero, and modern game AI',
      'Focuses computational effort on the most promising game trajectories',
      'Combines tree search with Monte Carlo random sampling'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q23',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'MCTS Phases',
    question: 'Name the four phases of MCTS.',
    answer: 'The four sequential phases of each MCTS iteration are:\n1. Selection: Traverse existing tree from root to leaf using a selection policy (UCB1)\n2. Expansion: Add one or more new child nodes to the leaf\n3. Simulation (Rollout): Play out the game to termination using a default rollout policy\n4. Backpropagation: Propagate the simulation outcome back up to update node visit counts and win scores.',
    keyPoints: [
      'Repeated thousands of times per move within the allocated time budget',
      'Asymmetric tree growth: promising paths are explored much more deeply',
      'Final move chosen is usually the child of the root with the highest visit count N'
    ],
    mnemonic: 'SE-SB: Selection, Expansion, Simulation, Backpropagation',
    diagram: `[Selection] ---> [Expansion] ---> [Simulation] ---> [Backpropagation]
(Root to Leaf)   (Add Child)     (Rollout to End)   (Update Stats)`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q24',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'MCTS Selection Phase',
    question: 'Explain the selection phase.',
    answer: 'Starting at the root node, the selection phase traverses down through the tree by repeatedly choosing the child node that maximizes a selection policy (most commonly UCB1 / UCT) until it reaches a node that is not fully expanded (has unexplored children) or is a leaf node.',
    keyPoints: [
      'Balances exploiting high win-rate nodes with exploring rarely visited nodes',
      'Relies on stored statistics: visit count N and total reward Q',
      'Guided by the UCB1 formula'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q25',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'MCTS Expansion Phase',
    question: 'Explain the expansion phase.',
    answer: 'When selection reaches a leaf node that is not a terminal game state, the algorithm expands the tree by creating and adding one (or all) previously unexplored child nodes corresponding to legal actions from that state.',
    keyPoints: [
      'Grows the tree incrementally one node per iteration (or all valid actions)',
      'Initializes statistics for the new node: visits n = 0, score q = 0',
      'Prepares the newly created node for the simulation phase'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q26',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'MCTS Simulation Phase',
    question: 'Explain the simulation (rollout) phase.',
    answer: 'From the newly expanded node, a simulation (rollout) is played out to the end of the game using a fast, default rollout policy (such as uniform random moves or light heuristic rules) to obtain a simulated game result/reward (+1, -1, 0).',
    keyPoints: [
      'Does not add any simulated moves to the tree structure (purely temporary)',
      'Fast rollouts allow hundreds or thousands of simulations per second',
      'Outcome serves as a statistical sample of the state\'s winning probability'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q27',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'MCTS Backpropagation Phase',
    question: 'Explain the backpropagation phase.',
    answer: 'The outcome of the simulation is propagated backward along the path of nodes traversed during the selection and expansion phases up to the root, incrementing each node\'s visit count (N) and updating its aggregate reward/win total (Q).',
    keyPoints: [
      'Updates node stats: N(s) = N(s) + 1, Q(s) = Q(s) + outcome',
      'Accounts for alternating perspective: a win for black is a loss for white',
      'Refines node quality estimates for future iterations'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q28',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'UCB1 / UCT Formula',
    question: 'What is the UCB1/UCT formula used for?',
    answer: 'The Upper Confidence Bound for Trees (UCB1/UCT) formula is used in the selection phase of MCTS to select the optimal child node by mathematically balancing exploitation (picking nodes with high win rates) and exploration (visiting rarely checked nodes).',
    keyPoints: [
      'Formula: UCB1 = (Q_i / N_i) + C · sqrt(ln(N) / N_i)',
      'Q_i / N_i is the exploitation term (average payout of child i)',
      'sqrt(ln(N) / N_i) is the exploration term (inversely related to child visit count N_i)',
      'C is an exploration parameter (theoretically C = sqrt(2) ≈ 1.414)'
    ],
    formula: '\\text{UCB1} = \\frac{Q_i}{N_i} + C \\sqrt{\\frac{\\ln N}{N_i}}',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q29',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Exploration vs Exploitation Trade-off',
    question: 'What is the exploration versus exploitation trade-off?',
    answer: 'The trade-off between:\n• Exploitation: Selecting actions known to produce good outcomes to maximize immediate score.\n• Exploration: Trying less-visited or unknown actions to gather more information and discover potentially superior long-term strategies.',
    keyPoints: [
      'Pure exploitation gets trapped in local suboptimal strategies',
      'Pure exploration wastes compute on obviously terrible moves',
      'MCTS solves this using the UCB1 multi-armed bandit formulation'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q30',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Limitations of MCTS',
    question: 'Give two limitations of MCTS.',
    answer: 'Two major limitations of MCTS are:\n1. Trap States / Tactical Blindness: In games with sharp tactical traps (e.g., immediate forced checkmate), random rollouts may miss the single fatal refutation with high probability unless simulations are enormous.\n2. High Computational Cost: Requires thousands of game playouts per move, which can be prohibitively slow without significant compute or neural network policy guidance.',
    keyPoints: [
      'Rollout policy bias can distort state value estimates',
      'Struggles in games where one single precise counter-move is required among many bad ones'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q31',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Stochastic Games',
    question: 'What are stochastic games? Give an example.',
    answer: 'Stochastic games are games that introduce an element of chance, randomness, or non-deterministic events (such as rolling dice or card shuffling) alongside player strategic actions. Example: Backgammon, Monopoly, Yahtzee, Ludo.',
    keyPoints: [
      'Players cannot predict the future state with absolute certainty',
      'Transitions are governed by probability distributions P(s\' | s, a)',
      'Requires Expectiminimax search rather than standard Minimax'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q32',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Chance Nodes',
    question: 'What are chance nodes?',
    answer: 'Chance nodes are specialized nodes in a game tree that represent random, probabilistic events (e.g., a roll of dice or draw of a card) where the outcome is not chosen by any player, but occurs according to a probability distribution.',
    keyPoints: [
      'Represented diagrammatically as circles (while MAX is a triangle/square and MIN is an upside-down triangle)',
      'The value of a chance node is the expected value (weighted average) of its children\'s values',
      'Formula: Value(n) = Σ P(s) · Value(s)'
    ],
    formula: '\\text{Value}(n) = \\sum_{s} P(s) \\cdot \\text{Value}(s)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q33',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Expectiminimax Algorithm',
    question: 'What is expectiminimax?',
    answer: 'Expectiminimax is an extension of the Minimax algorithm designed for stochastic games that includes chance nodes alongside MAX and MIN nodes, computing the expected utility by weighting successor values by their event probabilities.',
    keyPoints: [
      'MAX nodes take the maximum of children values',
      'MIN nodes take the minimum of children values',
      'Chance nodes compute the mathematical expectation: Σ P(outcome) · Value(outcome)',
      'Time complexity grows to O(b^m · n^m) where n is the number of distinct chance outcomes'
    ],
    diagram: `         [ MAX Node ]
              |
         ( Chance Node )  -- Dice roll (P=1/6 each)
        /      |      \\
   [MIN 1]  [MIN 2]  [MIN 3]`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q34',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Partially Observable Games',
    question: 'What are partially observable games? Give an example.',
    answer: 'Partially observable games (imperfect information games) are games where players cannot see the complete state of the game world and must reason under hidden information or private cards. Examples: Poker, Battleship, Bridge, Kriegspiel.',
    keyPoints: [
      'Players maintain a "belief state" (set of all possible actual states)',
      'Opponent actions can be used to infer their private knowledge',
      'Involves concepts of deception, bluffing, and risk management'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q35',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Stochastic vs Partially Observable Games',
    question: 'Differentiate stochastic and partially observable games.',
    answer: '• Stochastic Games: The current state is completely visible to all players (perfect information), but the future transitions depend on random chance (e.g., Backgammon dice rolls).\n• Partially Observable Games: Elements of the current state are concealed from players (imperfect information), even if the game mechanics involve no dice (e.g., Battleship, Poker, Kriegspiel).',
    keyPoints: [
      'Backgammon is stochastic with perfect information',
      'Chess is deterministic with perfect information',
      'Poker is stochastic with imperfect information'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q36',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Limitations of Game Search Algorithms',
    question: 'List the limitations of game search algorithms.',
    answer: 'Major limitations of game search algorithms include:\n1. Combinatorial Explosion: Search spaces expand exponentially with depth and branching factor.\n2. Horizon Effect: Unavoidable negative consequences pushed past the search depth limit.\n3. Imperfect Heuristics: Static evaluation functions introduce systematic evaluation errors.\n4. Real-Time Latency: Strict tournament time limits restrict search depth.\n5. Assumption of Opponent Rationality: Minimax assumes optimal adversary; may miss exploiting human blunders.',
    keyPoints: [
      'Cannot guarantee perfection without exhaustive resolution',
      'Prone to severe degradation under imperfect information or deceptive play'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q37',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Constraint Satisfaction Problem (CSP)',
    question: 'What is a Constraint Satisfaction Problem?',
    answer: 'A Constraint Satisfaction Problem (CSP) is a problem formulation where the state is defined by a set of variables, each with a domain of allowable values, and a goal is reached when every variable is assigned a value that simultaneously satisfies all given constraints.',
    keyPoints: [
      'Factored state representation (unlike atomic black-box states in classical search)',
      'Allows general-purpose domain-independent heuristics and pruning',
      'Examples: Map coloring, Sudoku, N-Queens, scheduling, VLSI routing'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q38',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Variables, Domains, and Constraints in CSP',
    question: 'What are variables, domains and constraints in a CSP?',
    answer: 'A CSP is formally defined by the triad {X, D, C}:\n• Variables (X): Set of variables X = {X_1, X_2, ..., X_n} that need values.\n• Domains (D): Set of potential allowable values D = {D_1, D_2, ..., D_n} for each variable.\n• Constraints (C): Set of rules C = {C_1, C_2, ..., C_m} specifying allowable combinations of values across subsets of variables.',
    keyPoints: [
      'Assignment: {X_i = v_i, ...}',
      'Consistent (Legal) Assignment: does not violate any constraints in C',
      'Complete Assignment: every variable in X is assigned a value'
    ],
    formula: '\\text{CSP} = \\{X, D, C\\}',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q39',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'CSP Map Colouring Formulation',
    question: 'Give a CSP formulation of map colouring.',
    answer: 'For Australia Map Coloring:\n• Variables (X): {WA, NT, SA, Q, NSW, V, T} (the Australian regions)\n• Domains (D): D_i = {Red, Green, Blue} for each variable\n• Constraints (C): Adjacent regions must have different colors:\n  WA ≠ NT, WA ≠ SA, NT ≠ SA, NT ≠ Q, SA ≠ Q, SA ≠ NSW, SA ≠ V, Q ≠ NSW, NSW ≠ V.',
    keyPoints: [
      'Tasmania (T) has no neighbors and is independent',
      'Can be visualized as a Constraint Graph where regions are nodes and adjacency constraints are edges',
      'Fundamental benchmark for CSP algorithms'
    ],
    diagram: `  [WA] --- [NT] --- [Q]
    |   \\   |      / |
    |    \\  |     /  |
    +---- [SA] --+  [NSW]
            |         |
           [V] -------+     [T] (Independent)`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q40',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Unary, Binary, and Global Constraints',
    question: 'What are unary, binary and global constraints?',
    answer: '• Unary Constraint: Restricts the value of a single variable (e.g., SA ≠ Green).\n• Binary Constraint: Relates two variables (e.g., WA ≠ NT; represented as an edge in a constraint graph).\n• Global (Higher-Order) Constraint: Involves an arbitrary number of variables (e.g., Alldiff(A, B, C, D) which requires all variables to have pairwise distinct values).',
    keyPoints: [
      'Unary constraints can be pre-processed by filtering domains directly',
      'Any non-binary constraint can be transformed into equivalent binary constraints with dual variables',
      'Alldiff is the most prevalent global constraint in scheduling and puzzles'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q41',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Types of Consistency',
    question: 'What are the types of consistency (node, arc, path, k-consistency)?',
    answer: '• Node Consistency: Every unary constraint on variable X is satisfied by all values in its domain D_X.\n• Arc Consistency: For every value in D_X, there exists some satisfying value in D_Y for binary constraint (X, Y).\n• Path Consistency: For every pair {X, Y} satisfying binary constraints, there exists a consistent assignment for any third variable Z.\n• k-Consistency: For any set of k-1 consistent variables, any k-th variable can always be assigned a consistent value.',
    keyPoints: [
      '1-consistency = Node consistency; 2-consistency = Arc consistency; 3-consistency = Path consistency',
      'Strong k-consistency implies i-consistency for all i ≤ k',
      'Higher consistency reduces search backtracking at the expense of pre-computation time'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q42',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Constraint Propagation',
    question: 'What is constraint propagation?',
    answer: 'Constraint propagation is the process of using constraints to iteratively reduce the domains of variables by pruning values that cannot participate in any valid solution, thereby propagating the implications of a constraint onto other connected variables.',
    keyPoints: [
      'Can solve simple CSPs entirely without search, or heavily prune search trees beforehand',
      'Enforces consistency (e.g., Arc Consistency AC-3)',
      'Detects dead ends early before deep backtracking'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q43',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'AC-3 Algorithm',
    question: 'Explain the AC-3 algorithm in two lines.',
    answer: 'AC-3 (Arc Consistency Algorithm #3) maintains a queue of directed arcs (X_i, X_j) and iteratively removes values from D_i that have no consistent counterpart in D_j, re-adding neighbor arcs to the queue whenever D_i is modified until the queue is empty.',
    keyPoints: [
      'Worst-case time complexity: O(c · d^3) for c binary constraints and max domain size d',
      'If any domain becomes empty, AC-3 immediately detects that the CSP is unsolvable',
      'Fundamental inference algorithm in modern CSP solvers'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q44',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Inference in CSPs',
    question: 'What is inference in CSPs?',
    answer: 'Inference in CSPs is the use of logical deduction and constraint propagation at each node of the search tree to shrink variable domains and eliminate incompatible values before making subsequent variable assignments.',
    keyPoints: [
      'Interleaves inference with search (e.g., Forward Checking, MAC - Maintaining Arc Consistency)',
      'Discovers impossible branches before search expands them',
      'Significantly speeds up backtracking search'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q45',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Backtracking Search',
    question: 'What is backtracking search?',
    answer: 'Backtracking search is a basic depth-first search algorithm tailored for CSPs that assigns values to one variable at a time, checks for constraint violations at each step, and backtracks immediately whenever a variable has no legal values left to assign.',
    keyPoints: [
      'Commutative property of CSPs: order of variable assignment does not affect final solution',
      'Generates states by single-variable extensions rather than full-state operators',
      'Uninformed backtracking is slow, but dramatically boosted with heuristics (MRV, Degree, LCV)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q46',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'N-Queens using Backtracking',
    question: 'Explain the N-Queens problem using backtracking.',
    answer: 'The N-Queens problem requires placing N non-attacking chess queens on an N×N board (no two queens share a row, column, or diagonal). Backtracking places a queen row by row (Queen i placed in Row i at column c), tests if column c conflicts with previous queens; if valid, it proceeds to Row i+1; if all columns in Row i fail, it backtracks to Row i-1 and tries the next column.',
    keyPoints: [
      'Variables: X = {Q_1, Q_2, ..., Q_N} where Q_i is the column position of queen in row i',
      'Domain: D_i = {1, 2, ..., N}',
      'Constraints: Q_i ≠ Q_j (columns) and |Q_i - Q_j| ≠ |i - j| (diagonals)',
      '4-Queens has 2 solutions; 8-Queens has 92 solutions'
    ],
    diagram: `4-Queens Solution Example:
. Q . .  (Row 1: Col 2)
. . . Q  (Row 2: Col 4)
Q . . .  (Row 3: Col 1)
. . Q .  (Row 4: Col 3)`,
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q47',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'CSP Heuristics: MRV, Degree, LCV',
    question: 'Which heuristics improve backtracking (MRV, degree, least constraining value)?',
    answer: 'Three key heuristics optimize CSP backtracking:\n1. Minimum Remaining Values (MRV): Variable heuristic that chooses the variable with the fewest legal values left ("Fail-First").\n2. Degree Heuristic: Tie-breaker for MRV that chooses the variable involved in the largest number of constraints with unassigned variables.\n3. Least Constraining Value (LCV): Value heuristic that selects the value that rules out the fewest choices for neighboring unassigned variables ("Fail-Last").',
    keyPoints: [
      'Variable selection: Fail-first principle (detect failure as early as possible)',
      'Value selection: Fail-last principle (maximize future freedom for neighbors)',
      'Combined together, they solve large CSPs with near-zero backtracks'
    ],
    mnemonic: 'MDL: MRV (fewest values), Degree (most constraints), LCV (least restrictive value)',
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q48',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Forward Checking',
    question: 'What is forward checking?',
    answer: 'Forward checking is a simple constraint propagation technique where, whenever a variable X is assigned a value v, the algorithm examines each unassigned variable Y connected to X by a constraint and removes any value from Y\'s domain that conflicts with v. If any domain becomes empty, it backtracks immediately.',
    keyPoints: [
      'Prevents assignments that lead to immediate dead ends in future steps',
      'More powerful than simple backtracking, but weaker than full arc consistency (MAC)',
      'Does not detect all future inconsistencies (only looks 1 step ahead)'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q49',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Cryptarithmetic Puzzle Rules',
    question: 'What is a cryptarithmetic puzzle? State the rules.',
    answer: 'A cryptarithmetic puzzle is a mathematical constraint puzzle where digits in an arithmetic equation are replaced by letters. The rules are:\n1. Each distinct letter represents a unique digit from 0 to 9.\n2. No two different letters may represent the same digit (Alldiff).\n3. The leading digit of any multi-digit number cannot be zero (no leading zeroes).\n4. The arithmetic equation must hold true arithmetically.',
    keyPoints: [
      'Formulated as CSP with letters as variables and digits {0..9} as domains',
      'Includes carry digits (X_1, X_2, ...) in domain {0, 1}',
      'Enforces Alldiff global constraint across all letter variables'
    ],
    difficulty: 'new',
    repetitions: 0,
  },
  {
    id: 'ai-u3-q50',
    subject: 'ai',
    unit: 3,
    unitTitle: 'Unit III: Adversarial Search and Game Theory',
    topic: 'Solve TWO + TWO = FOUR',
    question: 'Solve TWO + TWO = FOUR and state the steps you used.',
    answer: 'Solution: T=7, W=3, O=4, F=1, O=4, U=6, R=8 (734 + 734 = 1468):\nSteps:\n1. F must be 1 because T + T + carry_3 can produce at most carry_3 = 1 into the thousands column (F ≠ 0).\n2. O + O = R + 10·X_1. Since O ≠ 0 (if O=0, R=0 violation), O must be even or produce carry.\n3. In thousands column: T + T + X_3 = O + 10·F = O + 10. Since T ≤ 9, 2T + X_3 ≥ 10 -> T ≥ 5. If T=7: 2·7 + 0 = 14 -> O=4 (with X_3=0).\n4. Since O=4: O + O = 4 + 4 = 8 -> R = 8 (carry X_1 = 0).\n5. In tens column: W + W + X_1 = U + 10·X_2 -> 2W + 0 = U + 0 (since X_3 = 0, X_2 = 0). Since {1,4,7,8} used, choose W=3 -> U = 6.\nAll digits distinct: {T:7, W:3, O:4, F:1, U:6, R:8}. Check: 734 + 734 = 1468. Valid!',
    keyPoints: [
      'F = 1 (most significant carry)',
      'O = 4, R = 8, W = 3, U = 6, T = 7',
      'Arithmetic check: 734 + 734 = 1468'
    ],
    diagram: `    T W O       7 3 4
  + T W O     + 7 3 4
  -------     -------
  F O U R     1 4 6 8`,
    difficulty: 'new',
    repetitions: 0,
  },
];
