document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("markdown-input");
    const counter = document.getElementById("counter");

    function updateCounter() {
        const text = textarea.value.trim();
        const words = text.length > 0 ? text.split(/\s+/).length : 0;
        const characters = text.length;
        counter.textContent = `Words: ${words} | Characters: ${characters}`;
    }

    textarea.addEventListener("input", updateCounter);
});
