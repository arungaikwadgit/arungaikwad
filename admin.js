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
    }
  ]
};

function getStoredContent() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultContent;
  } catch (_error) {
    return defaultContent;
  }
}

function setStatus(message, isError = false) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.style.color = isError ? "#fca5a5" : "#a6b2c3";
}

function downloadContent(payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "portfolio-content.json";
  link.click();
  URL.revokeObjectURL(url);
}

const textarea = document.getElementById("content-json");
textarea.value = JSON.stringify(getStoredContent(), null, 2);

document.getElementById("save-content").addEventListener("click", () => {
  try {
    const parsed = JSON.parse(textarea.value);
    if (!Array.isArray(parsed.caseStudies) || !Array.isArray(parsed.articles)) {
      throw new Error("JSON must include array fields: caseStudies and articles");
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    setStatus("Saved. Refresh the main page to see updates.");
  } catch (error) {
    setStatus(`Save failed: ${error.message}`, true);
  }
});

document.getElementById("reset-content").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  textarea.value = JSON.stringify(defaultContent, null, 2);
  setStatus("Reset to default content.");
});

document.getElementById("download-content").addEventListener("click", () => {
  try {
    const parsed = JSON.parse(textarea.value);
    downloadContent(parsed);
    setStatus("Downloaded portfolio-content.json");
  } catch (error) {
    setStatus(`Download failed: ${error.message}`, true);
  }
});
