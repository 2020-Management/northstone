---
title: "The EU AI Act is novel in subject and conventional in method."
category: Regulation
date: 2025-10-01
read_time: "8 min read"
standfirst: "Its high-risk obligations read like a specification for documentation, controls and audit trails — the discipline the compliance stack already runs."
summary: "Strip away the subject matter and the high-risk obligations resolve into risk files, data lineage, logs and oversight records — work that lands in the tooling cyber and data regimes already populated."
---

Regulation (EU) 2024/1689 — the EU AI Act — is the first comprehensive statute on artificial intelligence, and it has been received as a philosophical document: a settlement on what machines may decide and on whose authority. That reading is not wrong, but it describes the preamble, not the operative text. Read the obligations themselves and the subject matter recedes. What remains is a specification for documentation, for control over data, for records produced on demand and for a named human who can intervene. The Act is novel in what it governs and entirely conventional in how it makes governance provable.

The detail that anchors this reading is the timeline, and it is widely misstated. The Regulation entered into force on 1 August 2024, the twentieth day after its publication in the Official Journal, but in force is not the same as applicable, and its obligations switch on in tranches. The Chapter II prohibitions on unacceptable-risk practices — social scoring, certain biometric uses, manipulative techniques — applied first, from 2 February 2025. The general-purpose AI and governance provisions followed on 2 August 2025. The substantial weight, the high-risk obligations, applies from 2 August 2026, with systems embedded in regulated products under Annex I given a further year, to 2 August 2027. There is no single switch. An organisation that plans for one go-live date will be wrong four times.

## What the high-risk tier actually asks for

The four-tier structure does most of the work the headlines miss. Minimal-risk systems carry essentially no obligations. Limited-risk systems — the transparency tier — owe disclosure and little else: label the chatbot, mark the synthetic media. The prohibited tier is a list of bans, not a compliance programme. The cost concentrates entirely in the high-risk tier, where the Act stops resembling a debate about machine autonomy and starts resembling an audit manual.

The high-risk requirements sit in Chapter III, Section 2, Articles 8 to 15, and they are strikingly procedural. A provider must operate a risk management system across the lifecycle (Article 9), govern its training, validation and test data and document where that data came from (Article 10), keep technical documentation (Article 11) and ensure the system logs its own operation automatically (Article 12). It must give deployers the information to use the system correctly (Article 13), build in human oversight (Article 14), and meet thresholds for accuracy, robustness and cybersecurity (Article 15). Around these sit a quality management system (Article 17) and a conformity assessment before the system reaches the market (Article 43).

> Translate those articles out of the language of AI and they describe a risk register, a data lineage record, a controlled document set, an immutable log and an accountability matrix.

None of that is satisfied by a model card or a policy statement. Each requirement implies an artefact that must exist before the system ships and remain reproducible after — the exact objects a governance, risk and compliance platform was built to hold:

- A lifecycle risk file, versioned and linked to its mitigations.
- Data-governance records that trace provenance and quality.
- Logs and an oversight record naming who can intervene, and on what authority.

## A second regime over the same population

The deeper point is not that the Act creates documentation work, but that the work lands on organisations already carrying it, and largely on the same teams and tooling. A European bank deploying a high-risk credit-scoring model already sits inside DORA's ICT risk framework, inside NIS2 if it meets the size thresholds, and inside the GDPR. The AI Act adds a fourth obligation set whose primitives — risk assessment, data control, logging, board-visible oversight — it has already implemented three times over. The marginal cost of a regime falls when its evidence model rhymes with those already in place, and the AI Act's rhymes closely.

The general-purpose tier sharpens the point. GPAI providers owe technical documentation, downstream information and a public summary of training content under Article 53, with a heavier set — adversarial evaluation, systemic-risk mitigation, serious-incident reporting under Article 55 — once a model is presumed to carry systemic risk. That presumption is triggered, rebuttably, where cumulative training compute exceeds 10^25 floating-point operations: a contestable proxy, and the Commission may designate models on other grounds. But even at the frontier, the Act reaches for the familiar instruments — evaluate, document, report, retain — rather than inventing a new discipline.

That is the investable observation. The companies positioned to absorb the AI Act are not building a standalone product for a novel domain. They are extending platforms that already encode risk, data lineage, logging and oversight for adjacent regimes, where a fourth obligation set arrives as configuration, not reconstruction. The Act's subject is genuinely new. Its method is the one the compliance stack has been refining for a decade, and that is the side of it we underwrite.
