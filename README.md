# CN Recall — Computer Networks 5-Units Flashcard Engine

A high-performance, minimalist active-recall flashcard web application designed specifically to memorize **200+ Computer Networks questions** across 5 academic units at maximum speed.

Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**. Designed following strict minimalist principles without any external icon bloat (zero `lucide-react` dependencies).

---

## ⚡ Key Features for Accelerated Memorization

1. **Structured 5-Unit Organization**:
   - **Unit 1**: Physical Layer & Network Architectures (OSI vs TCP/IP, Topologies, Transmission Media, Switching, Shannon & Nyquist theorems).
   - **Unit 2**: Data Link Layer & MAC Protocols (Framing, CRC, Hamming Code, Stop-and-Wait, Go-Back-N, Selective Repeat, ALOHA, CSMA/CD).
   - **Unit 3**: Network Layer & Routing (IPv4 & IPv6, Subnetting/CIDR, Dijkstra, Bellman-Ford, OSPF, BGP, ARP, ICMP, Traffic Shaping).
   - **Unit 4**: Transport Layer & Congestion Control (TCP vs UDP, 3-Way Handshake, Flow Control, AIMD, Slow Start, Silly Window Syndrome).
   - **Unit 5**: Application Layer & Network Security (DNS, HTTP/1.1 vs HTTP/2/3, RSA, Symmetric vs Asymmetric, SSL/TLS, Firewalls).

2. **Rapid Active Recall & Leitner Spaced Repetition**:
   - **4-Grade Spaced Repetition**: `Again (< 1 min)` | `Hard (1 day)` | `Good (3 days)` | `Easy (Mastered)`.
   - **Active Recall "Blurt Box"**: Type out keywords or what you remember before revealing the answer. The app evaluates your recall against the answer's key terms!
   - **High-Yield Exam Key Points**: Every card highlights the exact bullet points, formulas, and mnemonics required to score full marks in written tests.

3. **Study Modes**:
   - **Flashcard Mode**: 3D interactive flip card with tactile audio feedback, shuffle mode, and full keyboard navigation.
   - **Exam Simulation Test**: Timed rapid-fire 10/20-question test with instant scoring and 1-click drill-down on missed questions.
   - **Cram Sheet (List View)**: Last-minute collapsible overview of all 200 questions grouped by unit with search, copy, and print styling.
   - **Stats & Retention Dashboard**: Real-time progress bars for each of the 5 units, identifying your weakest topics.

4. **Seamless 200+ Questions Importer**:
   - Easily paste your 200 questions in:
     - Plain text `Q: ... \n A: ... \n Unit: 1`
     - Delimited `Question ::: Answer ::: Unit(1-5) ::: Topic`
     - JSON Array `[{ "question": "...", "answer": "...", "unit": 1 }]`
   - Single card editor to add or modify questions on the fly.
   - Export backup to JSON anytime.

5. **Keyboard Shortcuts for Speed**:
   - `Space` or `Enter`: Flip card
   - `←` / `→` or `H` / `L`: Previous / Next card
   - `1`: Again (Repeat)
   - `2`: Hard (1 day)
   - `3`: Good (3 days)
   - `4`: Easy (Mastered)
   - `S`: Star / Bookmark question
   - `B`: Toggle Blurting mode
   - `Z`: Zen Focus mode (Fullscreen distraction-free)

---

## 🚀 Getting Started

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Build for Production
```bash
npm run build
npm run preview
```
