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