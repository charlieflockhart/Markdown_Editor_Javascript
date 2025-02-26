document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("markdown-input");
    let history = [];
    let redoStack = [];
    let isTyping = false;

    function saveState() {
        if (!isTyping) {
            history.push(textarea.value);
            if (history.length > 300) history.shift(); // Limit history size
            redoStack = []; // Clear redo stack when a new edit occurs
        }
    }

    textarea.addEventListener("input", function () {
        isTyping = true;
        setTimeout(() => { 
            saveState(); 
            isTyping = false; 
        }, 300); // Save after slight delay
    });

    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();

            if (event.key.toLowerCase() === "z") { // Undo (Ctrl+Z)
                if (history.length > 0) {
                    redoStack.push(textarea.value);
                    textarea.value = history.pop();
                }
            } else if (event.key.toLowerCase() === "y") { // Redo (Ctrl+Y)
                if (redoStack.length > 0) {
                    history.push(textarea.value);
                    textarea.value = redoStack.pop();
                }
            }
        }
    });
});
