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
      background: "#080c0a",
      mainBkg: "#0d1210",
      primaryColor: "#0d1210",
      primaryTextColor: "#ecfdf5",
      primaryBorderColor: "#42f5b0",
      lineColor: "#a2b8ad",
      secondaryColor: "#151b18",
      secondaryTextColor: "#ecfdf5",
      tertiaryColor: "#151b18",
      tertiaryTextColor: "#ecfdf5",
      nodeBorder: "#42f5b0",
      clusterBkg: "#0a0f0d",
      clusterBorder: "#24342e",
      edgeLabelBackground: "#0d1210",
      actorBkg: "#0d1210",
      actorBorder: "#42f5b0",
      actorTextColor: "#ecfdf5",
      signalColor: "#ecfdf5",
      signalTextColor: "#ecfdf5",
      noteBkgColor: "#151b18",
      noteTextColor: "#ecfdf5",
      noteBorderColor: "#f0b84e",
    },
  });

  await mermaid.run({ querySelector: ".mermaid" });
}
