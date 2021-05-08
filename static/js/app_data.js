d3.csv('static/data/Capstone_Data.csv', function(data) {
    tableData = data;
    console.log(data)
    // get table references
    var tbody = d3.select("tbody");
    function buildTable(data) {
      // First, clear out any existing data
      tbody.html("");
      // Next, loop through each object in the data
      // and append a row and cells for each value in the row
    //   Array.from(data).forEach((dataRow) => {
        data.forEach((dataRow) => {
        // Append a row to the table body
        var row = tbody.append("tr");
        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
          var cell = row.append("td");
          cell.text(val);
        });
      });
    }
    // Keep Track of all filters
    var filters = {};
    function updateFilters() {
        // Save the element, value, and id of the filter that was changed
        var changedElement = d3.select(this).select("input");
        var elementValue = changedElement.property("value");
        var filterId = changedElement.attr("id");
        // If a filter value was entered then add that filterId and value
        // to the filters list. Otherwise, clear that filter from the filters object
        if (elementValue) {
            filters[filterId] = elementValue;
        }
        else {
            delete filters[filterId];
        }
        // Call function to apply all filters and rebuild the table
        filterTable();
    };
    function filterTable() {
        // Set the filteredData to the tableData
        let filteredData = tableData;
        // Loop through all of the filters and keep any data that
        // matches the filter values
        Object.entries(filters).forEach(([key, value]) => {
            filteredData = filteredData.filter(row => row[key] === value);
        });
        // Finally, rebuild the table using the filtered Data
        buildTable(filteredData);
        };
    // Attach an event to listen for changes to each filter
    d3.selectAll(".filter").on("change", updateFilters);
        // Build the table when the page loads
        buildTable(tableData);
            // //redraw
            // $("#oil-table").DataTable({
            //     dom: 'Bfrtip', //lbfrtip if you want the length changing thing
            //     buttons: [
            //         { extend: 'copyHtml5' },
            //         { extend: 'excelHtml5' },
            //         { extend: 'csvHtml5' },
            //         {
            //             extend: 'pdfHtml5',
            //             title: function() { return "OIL Data"; },
            //             orientation: 'portrait',
            //             pageSize: 'LETTER',
            //             text: 'PDF',
            //             titleAttr: 'PDF'
            //         }
            //     ]
            // });
        // }  
  });