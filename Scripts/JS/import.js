document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("import-md").addEventListener("change", function (event) {
        importFile(event, "md");
    });

    document.getElementById("import-html").addEventListener("change", function (event) {
        importFile(event, "html");
    });
});

function importFile(event, type) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const content = e.target.result;
        const markdownInput = document.getElementById("markdown-input");
        const preview = document.getElementById("preview");

        if (type === "md") {
            markdownInput.value = content;
            preview.innerHTML = marked.parse(content);
        } else if (type === "html") {
            // Convert HTML back to Markdown using Turndown.js
            const turndownService = new TurndownService();
            const markdown = turndownService.turndown(content);

            markdownInput.value = markdown; // Restore Markdown syntax
            preview.innerHTML = content; // Show original HTML in the preview
        }
    };
    
    reader.readAsText(file);
}
