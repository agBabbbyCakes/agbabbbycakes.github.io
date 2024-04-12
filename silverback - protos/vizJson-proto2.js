const data = [
    {"task_name":"app_startup","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:34.594024+00:00","block_number":null,"metrics":{"block_number":{"type":"scalar","data":0}}},
    {"task_name":"exec_event1","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:37.648587+00:00","block_number":19594412,"metrics":{"amount":{"type":"scalar","data":410694555}}},
    {"task_name":"exec_block","execution_time":0.36,"error":null,"completed":"2024-04-06T04:50:37.720697+00:00","block_number":19594412,"metrics":{"result":{"type":"scalar","data":149}}},
    {"task_name":"exec_event1","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:37.852210+00:00","block_number":19594412,"metrics":{"amount":{"type":"scalar","data":5387740000}}},
    {"task_name":"exec_event1","execution_time":0.0,"error":"Oopsie!","completed":"2024-04-06T04:50:38.054161+00:00","block_number":19594412,"metrics":{}},
    {"task_name":"exec_event1","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:38.256236+00:00","block_number":19594412,"metrics":{"amount":{"type":"scalar","data":664730599}}},
    {"task_name":"exec_event1","execution_time":0.0,"error":"Oopsie!","completed":"2024-04-06T04:50:38.458381+00:00","block_number":19594412,"metrics":{}},
    {"task_name":"exec_event1","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:38.659659+00:00","block_number":19594412,"metrics":{"amount":{"type":"scalar","data":57769685}}},
    {"task_name":"exec_event1","execution_time":0.0,"error":"Oopsie!","completed":"2024-04-06T04:50:38.861104+00:00","block_number":19594412,"metrics":{}},
    {"task_name":"exec_event1","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:39.062285+00:00","block_number":19594412,"metrics":{"amount":{"type":"scalar","data":4000000000}}},
    {"task_name":"exec_event1","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:39.263646+00:00","block_number":19594412,"metrics":{"amount":{"type":"scalar","data":220364068}}},
    {"task_name":"exec_event1","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:39.464978+00:00","block_number":19594412,"metrics":{"amount":{"type":"scalar","data":1928185}}},
    {"task_name":"exec_event1","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:39.666152+00:00","block_number":19594412,"metrics":{"amount":{"type":"scalar","data":218435883}}},
    {"task_name":"exec_event1","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:39.867372+00:00","block_number":19594412,"metrics":{"amount":{"type":"scalar","data":400000}}},
    {"task_name":"exec_event1","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:40.069192+00:00","block_number":19594412,"metrics":{"amount":{"type":"scalar","data":218035883}}},
    {"task_name":"exec_event1","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:40.271152+00:00","block_number":19594412,"metrics":{"amount":{"type":"scalar","data":218035883}}},
    {"task_name":"exec_event1","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:49.452025+00:00","block_number":19594413,"metrics":{"amount":{"type":"scalar","data":314585413}}},
    {"task_name":"exec_block","execution_time":0.39,"error":null,"completed":"2024-04-06T04:50:49.652353+00:00","block_number":19594413,"metrics":{"result":{"type":"scalar","data":137}}},
    {"task_name":"exec_event1","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:49.653579+00:00","block_number":19594413,"metrics":{"amount":{"type":"scalar","data":191866464}}},
    {"task_name":"exec_event1","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:49.855016+00:00","block_number":19594413,"metrics":{"amount":{"type":"scalar","data":9000000000}}},
    {"task_name":"exec_event1","execution_time":0.0,"error":"Oopsie!","completed":"2024-04-06T04:50:50.056979+00:00","block_number":19594413,"metrics":{}}
];

let intervalId = null;

function startVisualization() {
    if (!intervalId) {
        intervalId = setInterval(() => updateTable(), 1000);  // Update every second
    }
}

function pauseVisualization() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function updateTable() {
    if (data.length === 0) {
        pauseVisualization();
        return;
    }
    const record = data.shift(); // Remove the first element from array and return it
    const row = document.createElement('tr');

    // Highlight rows with errors
    if (record.error) {
        row.style.backgroundColor = '#ffcccc'; // Light red background for errors
        row.style.cursor = 'pointer'; // Change cursor to indicate clickable
        row.addEventListener('click', () => {
            // Implement the logic to zoom into the chart or display more details
            // For example, you could log the error or display it in a modal
            console.log(`Investigating error: ${record.error} for task ${record.task_name} at ${record.completed}`);
            // Placeholder for further actions, like zooming into a chart
        });
    }

    row.innerHTML = `
        <td>${record.task_name}</td>
        <td>${record.execution_time}</td>
        <td>${record.error || 'No Error'}</td>
        <td>${record.completed}</td>
        <td>${record.block_number || 'N/A'}</td>
        <td>${record.metrics.amount ? record.metrics.amount.data : 'N/A'}</td>
    `;
    document.querySelector('#sessionData tbody').appendChild(row);
}

$(document).ready(function() {
    // Initialize the Balance Chart
    var ctx = document.getElementById('balanceChart').getContext('2d');
    var balanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April'], // Replace with your data
            datasets: [{
                label: 'Balance Overtime',
                data: [0, 10, 5, 2], // Replace with your data
                backgroundColor: 'rgba(255, 255, 255, 0.055)',
                borderColor: 'rgba(255, 255, 255, 0.8)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // Initialize the Bot List DataTable
    $('#botList').DataTable({
        // DataTables configuration goes here
        // Example data - replace with your actual data
        data: [
            ['Bryant Bot A', 'Deploying', 'Running', 'Emergency Off', '500ETH'],
            // ... more bot data
        ],
        columns: [
            { title: "Name" },
            { title: "Deploying" },
            { title: "Running" },
            { title: "Emergency Off" },
            { title: "Balance" }
        ]
    });

    // Initialize the Project Calendar with FullCalendar
    $('#projectCalendar').fullCalendar({
        // FullCalendar configuration goes here
        // Example event -
    });
});