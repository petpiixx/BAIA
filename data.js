const ACRONYMS = [
  {a:"AI",f:"Artificial Intelligence",d:"The broad field of building computer systems that perform tasks normally requiring human intelligence — reasoning, learning, problem-solving, and perception."},
  {a:"ANI",f:"Artificial Narrow Intelligence",d:"AI that performs one specific task well (e.g. ChatGPT, Siri, AlphaFold). Every AI system commercially deployed in 2026 is ANI. Cannot transfer knowledge across domains."},
  {a:"AGI",f:"Artificial General Intelligence",d:"A hypothetical AI that can learn any intellectual task a human can, transfer knowledge across domains, and improve itself continuously. Not yet achieved as of 2026."},
  {a:"ASI",f:"Artificial Super Intelligence",d:"A theoretical AI that surpasses human intelligence across ALL domains simultaneously. Requires AGI as a prerequisite. Primarily a safety and governance concern today."},
  {a:"LLM",f:"Large Language Model",d:"A transformer-based model trained on massive text corpora to predict the next token. Examples: GPT-4, Claude, Gemini. Passive — generates content but cannot act in external systems without an agent layer."},
  {a:"LRM",f:"Large Reasoning Model",d:"An LLM enhanced with an explicit deliberative 'thinking layer' at inference time. Uses chain-of-thought and RL training to reason step-by-step before answering. Example: OpenAI o3."},
  {a:"RAG",f:"Retrieval-Augmented Generation",d:"An architecture that retrieves relevant document chunks from a vector index at inference time and includes them in the LLM prompt — grounding generation in verifiable, up-to-date knowledge without retraining the model."},
  {a:"MCP",f:"Model Context Protocol",d:"A standardised protocol (analogous to USB for hardware) that lets any AI model connect to and invoke any external tool — CRMs, calendars, databases, code execution — without bespoke integrations."},
  {a:"A2A",f:"Agent-to-Agent Protocol",d:"A protocol enabling specialised AI agents to discover each other (via Agent Cards), delegate sub-tasks, and coordinate complex workflows without human routing. Standardised ~2025. Complementary to MCP."},
  {a:"LoRA",f:"Low-Rank Adaptation",d:"A fine-tuning technique that injects small trainable matrices (rank r ≪ d) into a frozen model's layers. Reduces trainable parameters by ~10,000× vs full fine-tuning while preserving most capability."},
  {a:"BPE",f:"Byte Pair Encoding",d:"A sub-word tokenisation algorithm used by most modern LLMs. Merges frequent character pairs iteratively to create a vocabulary of sub-word tokens. The main alternative is SentencePiece."},
  {a:"CoT",f:"Chain-of-Thought",d:"A prompting technique that instructs the model to produce intermediate reasoning steps before a final answer. Dramatically improves multi-step arithmetic, logic, and planning tasks."},
  {a:"HITL",f:"Human-in-the-Loop",d:"A governance model where a human must approve EVERY action before the AI agent executes it. Used for high-risk or irreversible operations. Contrast with AITL."},
  {a:"AITL",f:"AI-in-the-Loop",d:"A governance model where the AI agent executes autonomously and a human reviews a summary or exceptions afterwards. Used for high-volume, lower-risk processes like 3-way match in S2P."},
  {a:"S2P",f:"Source-to-Pay",d:"End-to-end procurement process: Purchase Requisition → Sourcing (RFQ/RFP) → Supplier Selection → PO Generation → Goods Receipt → 3-Way Match (PO/GR/Invoice) → Payment → Supplier Performance Review."},
  {a:"ERP",f:"Enterprise Resource Planning",d:"Integrated software systems (e.g. SAP S/4HANA) that manage core business processes — Finance, Supply Chain, Procurement, HR. The 'Digital Core' that agents integrate with via MCP."},
  {a:"GAN",f:"Generative Adversarial Network",d:"A pre-transformer architecture with two competing networks (generator vs discriminator). A key precursor to generative modelling. Largely superseded by diffusion models and LLMs for most generative tasks."},
  {a:"BM25",f:"Best Match 25",d:"A classic keyword-based (sparse) retrieval algorithm used in search engines. Scores documents by term frequency and inverse document frequency. Combined with dense vector search in Hybrid Retrieval RAG."},
  {a:"SFT",f:"Supervised Fine-Tuning",d:"The second stage of LRM training. Adapts the pre-trained model to a specific domain using labelled examples. Precedes Reinforcement Learning in the 4-stage pipeline: Pre-training → SFT → RL → Distillation."},
  {a:"PII",f:"Personally Identifiable Information",d:"Any data that can identify an individual (names, emails, ID numbers). Must be redacted before embedding documents into a RAG vector index to prevent sensitive data from being permanently retrievable by semantic similarity."},
  {a:"ROI",f:"Return on Investment",d:"Key AI deployment metric. Course benchmarks: 12–18 month payback period, 250–350% 3-year ROI, 307% for SAP Commerce Cloud B2B. Measured in business terms (cycle time, cost/transaction) not technical metrics (F1, accuracy)."},
  {a:"RFQ",f:"Request for Quotation",d:"A formal document sent to suppliers asking for pricing on a specific product or service. Part of the Sourcing step in Source-to-Pay. AI agents automate RFQ generation and response analysis."},
];

const CHAPTER_SUMMARIES = [
  {
    id:"A", label:"Session 1 · Intro + Chapter 1", title:"Foundations & Enterprise AI Architecture",
    keyPoints:[
      {t:"The enterprise AI stack", b:"Data (passengers) → AI models (aircraft) → tools/protocols (gates/vehicles) → orchestration (air traffic control). Each layer enables the next."},
      {t:"AI ⊃ ML ⊃ Deep Learning", b:"AI is the broadest field. ML ⊂ AI builds predictive models (Y = f(X)). Deep Learning ⊂ ML uses 3+ layer neural nets for unstructured data."},
      {t:"ANI → AGI → ASI maturity arc", b:"ANI = task-specific (all 2026 systems). AGI = human-level continuous learning, cross-domain transfer (not yet achieved). ASI = superhuman across all domains (requires AGI first)."},
      {t:"6 modules + 9 cross-functional flows", b:"Modules: Financial, Supply Chain, Procurement, Customer Relationship, HR, Sustainability. Flows include: Lead-to-Cash, Source-to-Pay, Hire-to-Retire, Record-to-Report, Design-to-Build, Forecast-to-Fulfill, Request-to-Service, Invoice-to-Pay, Issue-to-Resolution."},
      {t:"SAP Joule as real-world example", b:"An AI co-pilot embedded across SAP's enterprise suite — illustrates how foundation models plug into the Digital Core as ANI, not AGI."},
    ]
  },
  {
    id:"B", label:"Session 1 · Chapter 3", title:"Transformer Architecture & LLM Foundations",
    keyPoints:[
      {t:"Pre-transformer arc: N-grams → Word2vec → Attention", b:"Word2vec proved words could be vectors where king − man + woman ≈ queen. Bahdanau Attention (2014) added selective weighting inside RNNs. GANs introduced generative modelling."},
      {t:"'Attention Is All You Need' (2017)", b:"Vaswani et al. replaced recurrence with full self-attention, enabling parallelisation. All modern LLMs descend from this architecture."},
      {t:"Encoder-only vs decoder-only", b:"Encoder-only (BERT) = understanding, classification. Decoder-only (GPT) = auto-regressive text generation. Encoder+Decoder = translation, summarisation."},
      {t:"Tokenisation & token cost", b:"Sub-word tokenisation (BPE, SentencePiece) — not character-level. Token count = API cost + context window competition. A core enterprise design constraint."},
      {t:"LoRA fine-tuning", b:"Injects small low-rank matrices (rank r ≪ d) into frozen model layers. Reduces trainable parameters by ~10,000× vs full fine-tuning. Makes domain adaptation economically viable."},
      {t:"8-component deployment pipeline", b:"Data ingestion → Pre-processing → Embedding → Indexing → Query processing → Retrieval → Re-ranking → Generation. Each stage can fail independently."},
    ]
  },
  {
    id:"C", label:"Session 2 · Chapter 6", title:"Retrieval-Augmented Generation (RAG)",
    keyPoints:[
      {t:"Why RAG exists", b:"LLMs hallucinate facts not in training data. RAG retrieves relevant chunks at inference time — grounding generation in verifiable, citable, current knowledge without retraining."},
      {t:"Chunking is the most important variable", b:"Chunk size, overlap, and boundary choice determine retrieval quality more than model size. Too large = noise; too small = missing context."},
      {t:"9 RAG variants (must know all)", b:"Naive · Query Optimisation · Re-Ranking · Contextual Compression · Multi-Hop · Graph RAG · Agentic RAG · Hybrid Retrieval · Memory-Augmented. Each solves a different precision/recall/relational problem."},
      {t:"Re-ranking adds 10–30% accuracy", b:"Initial vector retrieval returns top-50; a cross-encoder (e.g. Cohere Rerank, NV RerankQA) re-ranks to top-5. Two-stage is significantly more accurate than single-stage."},
      {t:"4 security mechanisms", b:"Access-controlled retrieval (user permission gates) · Chunk-level audit trails · PII redaction before embedding · Output guardrails."},
    ]
  },
  {
    id:"D", label:"Session 2 · Chapters 7–8", title:"MCP & AI Agents",
    keyPoints:[
      {t:"Foundation model vs AI Agent", b:"FM: passive, single-turn, responds to prompts, no memory, no tool access. Agent: pursues goals, multi-step workflows, memory, tool access via MCP. The difference is between generating content and completing tasks."},
      {t:"MCP = USB for AI tools", b:"Model Context Protocol provides a standardised discovery + invocation layer. Models find what tools are available (via manifests) and call them with structured inputs. Every call is logged and permission-gated."},
      {t:"5-phase agent loop", b:"Perceive → Reason → Goal-set → Decide → Execute → repeat. Chapter 10 adds Orchestrate (coordinating sub-agents) as a 6th phase."},
      {t:"4 memory types", b:"In-context (active window) · Episodic (past interaction logs) · Semantic (facts, knowledge graph) · Procedural (learned action sequences). Graph databases — not relational — support Semantic memory efficiently."},
      {t:"HITL vs AITL", b:"Human-in-the-loop = human approves every action (high-risk, irreversible). AI-in-the-loop = AI executes, human reviews exceptions (e.g. 3-way match discrepancies in S2P)."},
    ]
  },
  {
    id:"E", label:"Session 3 · Chapters 9–10", title:"A2A Protocol & Agentic AI Frameworks",
    keyPoints:[
      {t:"MCP vs A2A (complementary)", b:"MCP = model-to-tool (one agent using one system). A2A = agent-to-agent (one agent delegating a sub-task to another specialised agent). They work together in enterprise multi-agent deployments."},
      {t:"Agent Cards = agent discovery", b:"JSON-LD descriptors that advertise an agent's capabilities, input/output schemas, and trust requirements. The machine-readable 'business card' that makes A2A discovery work without manual configuration."},
      {t:"A2A 3-layer spec + 6 goals", b:"Layers: Data model → Operations (create/update/cancel/status) → Protocol bindings (HTTP/REST, gRPC, WebSocket). Goals: Discoverability · Delegation · Trust · Observability · Interoperability · Fault tolerance."},
      {t:"7 agentic frameworks", b:"AutoGen (Microsoft, conversation-based) · CrewAI (Crew→Agents→Tasks hierarchy) · LangChain / LangGraph (stateful cycles) · LlamaIndex (data-centric, RAG-heavy) · Semantic Kernel (Microsoft enterprise .NET/Python) · LangChain4j (JVM/Java)."},
      {t:"A2A risks: emergent behaviour & governance", b:"Multi-agent systems can produce unintended outcomes. Each agent-to-agent call is an attack vector. Mutual authentication + scoped permissions + rate limiting are mandatory in production. Audit trails are critical for attribution."},
    ]
  },
  {
    id:"F", label:"Session 3–4 · Chapters 11–12", title:"Research AI & Reasoning AI (LRMs)",
    keyPoints:[
      {t:"Research-grade AI: 7 building blocks + 6 criteria", b:"Building blocks: Foundation model · Planning · RAG · Tool use · Memory · Multi-agent · Evaluation & verification. Criteria: Multi-step reasoning · Source attribution · Self-evaluation · Dynamic retrieval · Tool orchestration · Uncertainty quantification."},
      {t:"Two research architecture paradigms", b:"ChatGPT-style (agentic loop): model drives retrieval — flexible but slower. Perplexity-style (retrieval-first): retrieve then generate — faster and more predictable. 2026 trend: hybrid combining both."},
      {t:"LRM vs LLM", b:"LLM = reflex/pattern-match, single-pass generation. LRM = deliberative thinking layer added at inference time. LRMs spend more compute generating internal reasoning chains (thinking tokens) before answering."},
      {t:"LRM 4-stage training pipeline", b:"Pre-training (general knowledge) → Supervised Fine-Tuning (domain) → Reinforcement Learning (rewards correct answers AND coherent reasoning chains) → Knowledge Distillation (compress into smaller deployable model)."},
      {t:"Enterprise cascade pattern", b:"Route by complexity: GPT-4o mini (simple, fast, cheap) → GPT-4o (complex) → o3-mini (edge cases needing deep reasoning). Saves cost while preserving quality. Apple research caveat: LRM accuracy collapses beyond a complexity threshold."},
    ]
  },
  {
    id:"G", label:"Session 4–5 · Chapters 13–14", title:"End-to-End Business AI & The Road to AGI",
    keyPoints:[
      {t:"AI Assistant vs AI Agent", b:"Assistant: responds to queries, surfaces information, drafts content — human remains the actor. Agent: executes process steps autonomously — logs actions, triggers approvals, escalates exceptions. The distinction determines governance model."},
      {t:"Source-to-Pay as the capstone", b:"S2P = high volume + rule-bounded + cross-module (Finance + Supply + Procurement) + structured documents (PO, GRN, invoice) + clear compliance. 3-way match automation: 60–80% cycle time reduction."},
      {t:"Process selection criteria (5)", b:"High volume · Rule-bounded decisions · Structured data availability · Clear success metrics · Reversible or low-risk actions. S2P scores on all five."},
      {t:"Measure business outcomes, not model metrics", b:"Business metrics: cycle time reduction, cost per transaction, error rate. NOT F1 score or test accuracy — those are internal proxies. Communicate in the language of business stakeholders."},
      {t:"AGI trajectory & governance", b:"MCP, A2A, agentic frameworks are waypoints on the AGI trajectory — not endpoints. 'Cognitive work as commodity': if intelligence is commoditised like compute, the economics of knowledge-intensive industries shift. Governance must develop at the same pace as capability."},
    ]
  },
];
