function importCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        const rows = parseCSV(text);
        displayCSVTable(rows);
        updateSQLInput(rows);
    };
    reader.readAsText(file);
}