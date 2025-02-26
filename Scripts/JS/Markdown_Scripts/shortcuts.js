document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("markdown-input");

    textarea.addEventListener("keydown", function (event) {
        if (event.ctrlKey || event.metaKey) { // Support for Mac (Cmd)
            let selectionStart = textarea.selectionStart;
            let selectionEnd = textarea.selectionEnd;
            let selectedText = textarea.value.substring(selectionStart, selectionEnd);
            let beforeText = textarea.value.substring(0, selectionStart);
            let afterText = textarea.value.substring(selectionEnd);
            
            event.preventDefault(); // Prevent default browser behavior

            switch (event.key.toLowerCase()) {
                case "b": // Bold: **text**
                    textarea.value = beforeText + `**${selectedText || "bold"}**` + afterText;
                    textarea.setSelectionRange(selectionStart + 2, selectionEnd + 2);
                    break;

                case "i": // Italic: *text*
                    textarea.value = beforeText + `*${selectedText || "italic"}*` + afterText;
                    textarea.setSelectionRange(selectionStart + 1, selectionEnd + 1);
                    break;

                case "k": // Inline Code: `code`
                    textarea.value = beforeText + `\`${selectedText || "code"}\`` + afterText;
                    textarea.setSelectionRange(selectionStart + 1, selectionEnd + 1);
                    break;

                case "l": // Link: [text](url)
                    textarea.value = beforeText + `[${selectedText || "link"}](https://)` + afterText;
                    textarea.setSelectionRange(selectionStart + 1, selectionEnd + 1);
                    break;

                case "1": // Heading 1: # Heading
                    textarea.value = beforeText + `# ${selectedText || "Heading"}` + afterText;
                    textarea.setSelectionRange(selectionStart + 2, selectionEnd + 2);
                    break;

                case "2": // Heading 2: ## Heading
                    textarea.value = beforeText + `## ${selectedText || "Heading"}` + afterText;
                    textarea.setSelectionRange(selectionStart + 3, selectionEnd + 3);
                    break;

                case "3": // Heading 3: ### Heading
                    textarea.value = beforeText + `### ${selectedText || "Heading"}` + afterText;
                    textarea.setSelectionRange(selectionStart + 4, selectionEnd + 4);
                    break;

                case "u": // Unordered List: - item
                    textarea.value = beforeText + `\n- ${selectedText || "list item"}` + afterText;
                    textarea.setSelectionRange(selectionStart + 3, selectionEnd + 3);
                    break;

                case "o": // Ordered List: 1. item
                    textarea.value = beforeText + `\n1. ${selectedText || "list item"}` + afterText;
                    textarea.setSelectionRange(selectionStart + 4, selectionEnd + 4);
                    break;

                case "q": // Blockquote: > quote
                    textarea.value = beforeText + `\n> ${selectedText || "quote"}` + afterText;
                    textarea.setSelectionRange(selectionStart + 3, selectionEnd + 3);
                    break;
            }
        }
    });
});
