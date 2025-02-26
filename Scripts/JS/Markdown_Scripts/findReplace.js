document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key.toLowerCase() === "f") {
        event.preventDefault(); // Prevent default browser search
        openFindReplaceModal();
    }
});

function openFindReplaceModal() {
    const modal = document.getElementById("findReplaceModal");
    modal.style.display = "block";

    document.getElementById("findText").focus();
}

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("findReplaceModal").style.display = "none";
});

document.getElementById("replaceBtn").addEventListener("click", function () {
    findAndReplace(false);
});

document.getElementById("replaceAllBtn").addEventListener("click", function () {
    findAndReplace(true);
});

function findAndReplace(replaceAll) {
    const findText = document.getElementById("findText").value;
    const replaceText = document.getElementById("replaceText").value;
    const textarea = document.getElementById("markdown-input");

    if (!findText) return; // Don't proceed if no text is entered

    if (replaceAll) {
        textarea.value = textarea.value.split(findText).join(replaceText);
    } else {
        textarea.value = textarea.value.replace(findText, replaceText);
    }
}
