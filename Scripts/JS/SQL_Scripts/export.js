
// Export the SQL query to a file
// This function is called when the user clicks the "Export SQL" button
function exportSQL() {
    const sqlContent = document.getElementById("sqlInput").value;
    const blob = new Blob([sqlContent], { type: "text/sql" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "exported_query.sql";
    a.click();
}

// Export the CSV table to a file
// This function is called when the user clicks the "Export CSV" button
function exportTableToCSV() {
    const table = document.querySelector("#csvTable table");
    if (!table) {
        console.error("No table found to export!");
        return;
    }

    let csvContent = "";
    for (let row of table.rows) {
        let rowData = [];
        for (let cell of row.cells) {
            let cellText = cell.textContent.replace(/"/g, '""'); // Escape double quotes
            rowData.push(`"${cellText}"`);
        }
        csvContent += rowData.join(",") + "\n";
    }

    // Create and trigger the download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "exported_table.csv";
    a.click();
}