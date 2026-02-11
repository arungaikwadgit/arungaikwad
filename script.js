const STORAGE_KEY = "portfolioContentV1";

const defaultContent = {
  caseStudies: [
    {
      title: "[PLACEHOLDER] Governed RAG rollout for enterprise knowledge",
      domain: "Enterprise AI",
      impact: "[PLACEHOLDER] Faster knowledge retrieval and support resolution",
      context: "[PLACEHOLDER] Large distributed teams needed trusted answers.",
      businessProblem: "[PLACEHOLDER] Inconsistent support responses and slow discovery.",
      myOwnership:
        "[PLACEHOLDER] Directed cross-functional delivery across engineering, legal, and security.",
      technicalApproach: [
        "[PLACEHOLDER] Retrieval architecture with policy-aware context injection.",
        "[PLACEHOLDER] Evaluation suite for quality and hallucination rates."
      ],
      leadershipDecisions: [
        "Phased rollout with gated domains before broad launch.",
        "Aligned platform and product roadmaps with shared governance checkpoints."
      ],
      measurableImpact: [
        "[PLACEHOLDER] Improvement in issue resolution cycle time.",
        "[PLACEHOLDER] Increase in self-service adoption."
      ],
      governanceRisk: [
        "Documented risk register and release gates.",
        "Human escalation path for low-confidence responses.",
        "Role-based access controls and audit logs."
      ]
    },
    {
      title: "[PLACEHOLDER] Platform modernization program",
      domain: "Platform Engineering",
      impact: "[PLACEHOLDER] Improved delivery speed and reliability",
      context: "[PLACEHOLDER] Legacy architecture constrained release velocity.",
      businessProblem: "[PLACEHOLDER] High incident burden and slow onboarding.",
      myOwnership: "[PLACEHOLDER] Owned strategy, sequencing, and execution governance.",
      technicalApproach: [
        "Incremental migration strategy with service-by-service guardrails.",
        "Standardized observability and deployment pipelines."
      ],
      leadershipDecisions: [
        "Prioritized business-critical services first.",
        "Established engineering enablement forums across teams."
      ],
      measurableImpact: [
        "[PLACEHOLDER] Faster deployment lead times.",
        "[PLACEHOLDER] Reduction in high-severity incidents."
      ],
      governanceRisk: [
        "Change management controls and approval thresholds.",
        "Disaster recovery drills and security posture reviews."
      ]
    }
  ],
  articles: [
    {
      title: "[PLACEHOLDER] Building a practical AI governance operating model",
      excerpt: "A delivery-focused way to embed governance into architecture and execution.",
      category: "Governance",
      date: "2026-01-01",
      tags: ["AI RMF", "risk", "delivery"],
      href: "#"
    },
    {
      title: "[PLACEHOLDER] How leadership clarity speeds engineering execution",
      excerpt: "Operating cadences, ownership boundaries, and decision records that scale.",
      category: "Leadership",
      date: "2026-01-10",
      tags: ["teams", "execution"],
      href: "#"
    },
    {
      title: "[PLACEHOLDER] Choosing AI initiatives with enterprise impact",
      excerpt: "A prioritization framework balancing feasibility, risk, and ROI.",
      category: "AI Strategy",
      date: "2026-01-20",
      tags: ["portfolio", "roadmap"],
      href: "#"
    }
  ]
};

function getContent() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultContent;
    }

    const parsed = JSON.parse(stored);
    return {
      caseStudies: Array.isArray(parsed.caseStudies) ? parsed.caseStudies : defaultContent.caseStudies,
      articles: Array.isArray(parsed.articles) ? parsed.articles : defaultContent.articles
    };
  } catch (_error) {
    return defaultContent;
  }
}

function renderCaseStudies(caseStudies) {
  const container = document.getElementById("case-study-list");
  container.innerHTML = "";

  caseStudies.forEach((study) => {
    const card = document.createElement("details");
    card.className = "case-card";

    card.innerHTML = `
      <summary>${study.title}</summary>
      <p class="case-meta">${study.domain} · ${study.impact}</p>
      <h3>Context</h3><p>${study.context}</p>
      <h3>Business Problem</h3><p>${study.businessProblem}</p>
      <h3>My Ownership</h3><p>${study.myOwnership}</p>
      <h3>Technical Approach</h3><ul>${(study.technicalApproach || []).map((item) => `<li>${item}</li>`).join("")}</ul>
      <h3>Leadership Decisions</h3><ul>${(study.leadershipDecisions || []).map((item) => `<li>${item}</li>`).join("")}</ul>
      <h3>Measurable Impact</h3><ul>${(study.measurableImpact || []).map((item) => `<li>${item}</li>`).join("")}</ul>
      <h3>Governance / Risk Considerations</h3><ul>${(study.governanceRisk || []).map((item) => `<li>${item}</li>`).join("")}</ul>
    `;

    container.appendChild(card);
  });
}

function renderArticles(articles, selectedCategory = "All") {
  const container = document.getElementById("article-grid");
  container.innerHTML = "";

  const filtered =
    selectedCategory === "All"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  filtered.forEach((article) => {
    const card = document.createElement("article");
    card.className = "article-card";
    card.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.excerpt}</p>
      <p class="article-meta">${article.date} · ${article.category}</p>
      <p class="article-meta">${(article.tags || []).join(" • ")}</p>
      <a class="text-link" href="${article.href}" target="_blank" rel="noopener noreferrer">Read</a>
    `;
    container.appendChild(card);
  });
}

function setupFilters(articles) {
  const chips = Array.from(document.querySelectorAll(".chip"));
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      renderArticles(articles, chip.dataset.category);
    });
  });
}

const content = getContent();

document.getElementById("year").textContent = new Date().getFullYear();
renderCaseStudies(content.caseStudies);
renderArticles(content.articles);
setupFilters(content.articles);
