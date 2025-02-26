// editor.js - Handles text input and preview updates
function initEditor() {
    const textarea = document.getElementById("markdown-input");
    const preview = document.getElementById("preview");
    
    textarea.addEventListener("input", () => {
        updatePreview(textarea.value);
        saveContent(textarea.value);
    });
}

function updatePreview(markdown) {
    document.getElementById("preview").innerHTML = marked.parse(markdown);
}

marked.setOptions({
    breaks: true, // Preserve line breaks
    gfm: true     // Enable GitHub-flavored markdown
});