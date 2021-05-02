$(document).ready(function(){
    $('#filter-btn').click(function(){
    $.ajax({
    url:"../static/data/Capstone_Data.csv",
    dataType:"text",
    success:function(data)
    {
    var oil_data = data.split(/\r?\n|\r/);
    var table_data = '<table class="table table-bordered table-striped">';
    for(var count = 0; count<oil_data.length; count++)
    {
        var cell_data = oil_data[count].split(",");
        table_data += '<tr>';
        for(var cell_count=0; cell_count<cell_data.length; cell_count++)
        {
        if(count === 0)
        {
        table_data += '<th>'+cell_data[cell_count]+'</th>';
        }
        else
        {
        table_data += '<td>'+cell_data[cell_count]+'</td>';
        }
        }
        table_data += '</tr>';
    }
    table_data += '</table>';
    $('#oil_data_table').html(table_data);
    }
    });
    });
});