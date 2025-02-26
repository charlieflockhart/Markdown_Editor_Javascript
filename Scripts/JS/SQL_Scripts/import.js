function importCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = function(e) {
        const text = e.target.result;

        // Use parseCSV to handle the text correctly
        const rows = parseCSV(text);

        // Display CSV table and update SQL input
        displayCSVTable(rows);  // Display CSV data in a table
        updateSQLInput(rows);   // Optionally update SQL input based on CSV data
    };

    reader.readAsText(file); // Read the file content as text
}



function parseCSV(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let insideQuotes = false;

    // Loop through each character in the text
    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        // Handle the case of encountering a quote character
        if (char === '"' && (i === 0 || text[i - 1] !== "\\")) {
            // If we're inside quotes, toggle the `insideQuotes` flag
            insideQuotes = !insideQuotes;
        } else if (char === "," && !insideQuotes) {
            // If we're not inside quotes and we hit a comma, push the current cell to the row
            row.push(cell);
            cell = "";
        } else if (char === "\n" && !insideQuotes) {
            // If we're not inside quotes and we hit a new line, push the row to the rows array
            row.push(cell);
            rows.push(row);
            row = [];
            cell = "";
        } else {
            // Add the character to the current cell
            cell += char;
        }
    }

    // Add the last cell and row to the data if necessary
    if (cell) row.push(cell);
    if (row.length > 0) rows.push(row);

    return rows;
}