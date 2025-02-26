
// CSV Table
// This script is used to display a CSV file as a table and generate SQL INSERT statements from the data.
// The CSV file is expected to be pasted into a textarea element with the ID 'csvInput'.
// The resulting table will be displayed in an element with the ID 'csvTable'.
// The generated SQL INSERT statements will be displayed in an input element with the ID 'sqlInput'.

function displayCSVTable(data) {
    const tableContainer = document.getElementById("csvTable");
    if (!tableContainer) {
        console.error("Element with ID 'csvTable' not found!");
        return;
    }

    tableContainer.innerHTML = ""; // Clear any existing table

    const table = document.createElement("table");
    table.border = "1";
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    const colCount = Math.max(...data.map(row => row.length));

    data.forEach((row, rowIndex) => {
        let tr = document.createElement("tr");

        for (let i = 0; i < colCount; i++) {
            let cell = row[i] !== undefined ? row[i] : ""; // Ensure no undefined values
            let td = document.createElement(rowIndex === 0 ? "th" : "td");

            td.textContent = cell;
            td.style.padding = "10px";
            td.style.border = "1px solid #ccc";
            td.style.textAlign = "left";
            td.style.minWidth = `${100 / colCount}%`;

            if (rowIndex !== 0) {
                td.contentEditable = "true";
                td.style.backgroundColor = "#fff3cd";
                td.addEventListener("input", updateSQLFromTable);
            }

            tr.appendChild(td);
        }
        table.appendChild(tr);
    });

    tableContainer.appendChild(table);
}



// Main function
// Parse the CSV input and display the table and SQL input

function parseCSV(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char === '"' && (i === 0 || text[i - 1] !== "\\")) {
            insideQuotes = !insideQuotes;
        } else if (char === "," && !insideQuotes) {
            row.push(cell);
            cell = "";
        } else if (char === "\n" && !insideQuotes) {
            row.push(cell);
            rows.push(row);
            row = [];
            cell = "";
        } else {
            cell += char;
        }
    }
    
    if (cell) row.push(cell);
    if (row.length > 0) rows.push(row);

    return rows;
}



// Event listeners
// Listen for changes in the CSV input textarea
// Listen for changes in the table cells to update the SQL input

function updateSQLInput(data) {
    if (data.length < 2) return;
    let columns = data[0].map(col => `\`${col}\``).join(", ");
    let sqlText = `INSERT INTO users (${columns}) VALUES\n`;
    data.slice(1).forEach((row, index) => {
        let values = row.map(value => `'${value.replace(/'/g, "''")}'`).join(", ");
        sqlText += `(${values})`;
        sqlText += index < data.length - 2 ? ",\n" : ";";
    });
    document.getElementById("sqlInput").value = sqlText;
}

function updateSQLFromTable() {
    const tableRows = document.querySelectorAll("#csvTable table tr");
    if (!tableRows.length) return;

    const data = Array.from(tableRows).map(row => 
        Array.from(row.children).map(cell => cell.textContent.trim())
    );

    updateSQLInput(data);
}

