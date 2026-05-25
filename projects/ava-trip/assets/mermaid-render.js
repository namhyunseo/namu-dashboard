const diagrams = document.querySelectorAll("pre > code.language-mermaid");

if (diagrams.length > 0) {
  diagrams.forEach((code) => {
    const diagram = document.createElement("div");
    diagram.className = "mermaid";
    diagram.textContent = code.textContent;
    code.parentElement.replaceWith(diagram);
  });

  const { default: mermaid } = await import(
    "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs"
  );

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "base",
    themeVariables: {
      primaryColor: "#d9f0ec",
      primaryTextColor: "#171a1f",
      primaryBorderColor: "#0f766e",
      lineColor: "#66717d",
      secondaryColor: "#eef1f3",
      tertiaryColor: "#ffffff",
    },
  });

  await mermaid.run({ querySelector: ".mermaid" });
}
