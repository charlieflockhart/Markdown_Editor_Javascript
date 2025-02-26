// export.js - Handles exporting as HTML/Markdown
function exportFile(type) {
    const content = document.getElementById("markdown-input").value;
    let blob;
    if (type === "md") {
        blob = new Blob([content], { type: "text/markdown" });
    } else {
        blob = new Blob([marked.parse(content)], { type: "text/html" });

    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `document.${type}`;
    a.click();
}
