document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("markdown-input");
    const saveStatus = document.getElementById("save-status");

    function markUnsaved() {
        saveStatus.textContent = "⚠️ Unsaved Changes";
        saveStatus.style.color = "red";
    }

    function markSaved() {
        saveStatus.textContent = "💾 Saved";
        saveStatus.style.color = "green";
    }

    // Save to local storage
    function saveToLocalStorage() {
        localStorage.setItem("markdownContent", textarea.value);
        markSaved(); // Change status to saved
    }

    // Load from local storage
    function loadFromLocalStorage() {
        const savedContent = localStorage.getItem("markdownContent");
        if (savedContent) {
            textarea.value = savedContent;
        }
        markSaved();
    }

    // Detect typing
    textarea.addEventListener("input", markUnsaved);

    // Auto-save every 2 seconds
    setInterval(saveToLocalStorage, 2000);

    // Load content when page loads
    loadFromLocalStorage();
});
