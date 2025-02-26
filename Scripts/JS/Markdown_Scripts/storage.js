// storage.js - Manages local storage saving/loading
function saveContent(content) {
    localStorage.setItem("markdownContent", content);
}

function loadContent() {
    const savedContent = localStorage.getItem("markdownContent");
    if (savedContent) {
        document.getElementById("markdown-input").value = savedContent;
        updatePreview(savedContent);
    }
}