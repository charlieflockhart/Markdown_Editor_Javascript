function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.opacity = "1";

    setTimeout(() => {
        notification.style.opacity = "0";
    }, 3000); // Hide after 3 seconds
}
