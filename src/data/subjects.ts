import type { SubjectConfig, SubjectId } from '../types';

export const SUBJECTS: Record<SubjectId, SubjectConfig> = {
  cn: {
    id: 'cn',
    name: 'Computer Networks',
    shortName: 'CN',
    code: 'PCC-CS502',
    subtitle: '5 Units Complete Computer Networks Viva Engine',
    badge: '204 Qs',
    totalCards: 204,
    unitNames: {
      1: 'Physical Layer & Topologies',
      2: 'Data Link Layer & MAC',
      3: 'Network Layer & Routing',
      4: 'Transport Layer & Congestion',
      5: 'Application & Security',
    },
    unitDetails: {
      1: {
        title: 'Unit 1: Physical Layer & Network Architectures',
        desc: 'OSI vs TCP/IP models, topologies, transmission media, switching, cabling, and network classifications.',
      },
      2: {
        title: 'Unit 2: Data Link Layer & MAC Protocols',
        desc: 'Framing, MAC addressing, Ethernet, Wireshark, Error Detection (CRC), Error Correction (Hamming), Sliding Window.',
      },
      3: {
        title: 'Unit 3: Network Layer & Routing',
        desc: 'IPv4 & IPv6 addressing, subnetting & CIDR, Dijkstra, Bellman-Ford, OSPF, RIP, BGP, ARP, ICMP.',
      },
      4: {
        title: 'Unit 4: Transport Layer & Congestion Control',
        desc: 'TCP vs UDP, 3-way handshake, socket programming, port numbers, flags, and congestion avoidance.',
      },
      5: {
        title: 'Unit 5: Application Layer & Network Security',
        desc: 'DNS, HTTP/HTTPS, FTP, SMTP/POP3/IMAP, DHCP (DORA), Cryptography (RSA, AES), TLS/SSL, IPsec.',
      },
    },
  },
  ai: {
    id: 'ai',
    name: 'Artificial Intelligence',
    shortName: 'AI',
    code: 'PCC301COM',
    subtitle: 'PCC301COM AI Quick Revision | 50 Questions per Unit',
    badge: '250 Qs',
    totalCards: 250,
    unitNames: {
      1: 'Intro to AI & Intelligent Agents',
      2: 'Problem Solving & Search Strategies',
      3: 'Adversarial Search & Game Theory',
      4: 'Knowledge Representation & Logic',
      5: 'Planning & Industrial Applications',
    },
    unitDetails: {
      1: {
        title: 'Unit I: Introduction to AI and Intelligent Agents',
        desc: 'Definitions, Turing Test, foundations, history, agent architectures, PEAS, rationality, and environment properties.',
      },
      2: {
        title: 'Unit II: Problem Solving, State Approach and Search Strategies',
        desc: 'State space representation, uninformed search (BFS, DFS, IDS), informed search (Greedy, A*), heuristics, and local search.',
      },
      3: {
        title: 'Unit III: Adversarial Search and Game Theory',
        desc: 'Minimax, Alpha-Beta pruning, MCTS, stochastic games, expectiminimax, and Constraint Satisfaction Problems (CSP/AC-3).',
      },
      4: {
        title: 'Unit IV: Knowledge Representation using Logical Formalisms',
        desc: 'Knowledge-based agents, propositional logic, inference rules, CNF, resolution refutation, and First-Order Logic (FOL).',
      },
      5: {
        title: 'Unit V: Planning and Industrial Applications of AI',
        desc: 'State/goal planning, blocks world, goal stack planning, Sussman anomaly, partial-order & HTN planning, and real-world AI applications.',
      },
    },
  },
};
