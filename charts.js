// Initialize charts
function initializeCharts() {
    // Model Comparison Chart
    const modelCtx = document.getElementById('modelComparisonChart');
    if (modelCtx) {
        const modelChart = new Chart(modelCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Random Forest', 'XGBoost', 'LGBM', 'Neural Network'],
                datasets: [{
                    label: 'Accuracy',
                    data: [0.89, 0.92, 0.94, 0.91],
                    backgroundColor: 'rgba(52, 152, 219, 0.5)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    }
                }
            }
        });

        // Chart Control Buttons
        document.querySelectorAll('.chart-control-btn').forEach(button => {
            button.addEventListener('click', function() {
                const metric = this.dataset.metric;
                const buttons = document.querySelectorAll('.chart-control-btn');
                buttons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Update chart data based on metric
                if (metric === 'accuracy') {
                    modelChart.data.datasets[0].data = [0.89, 0.92, 0.94, 0.91];
                    modelChart.data.datasets[0].label = 'Accuracy';
                } else {
                    modelChart.data.datasets[0].data = [0.87, 0.90, 0.92, 0.89];
                    modelChart.data.datasets[0].label = 'F1 Score';
                }
                modelChart.update();
            });
        });
    }

    // Sentiment Distribution Chart
    const sentimentCtx = document.getElementById('sentimentChart').getContext('2d');
    const sentimentChart = new Chart(sentimentCtx, {
        type: 'doughnut',
        data: {
            labels: ['Positive', 'Negative', 'Neutral'],
            datasets: [{
                data: [45, 25, 30],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(241, 196, 15, 0.8)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(241, 196, 15, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Recommendation System Chart
    const recommendationCtx = document.getElementById('recommendationChart').getContext('2d');
    const recommendationChart = new Chart(recommendationCtx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20'],
            datasets: [{
                label: 'Precision@K',
                data: [0.65, 0.75, 0.82, 0.87, 0.91],
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Object Detection Performance Chart
    const detectionCtx = document.getElementById('detectionChart').getContext('2d');
    const detectionChart = new Chart(detectionCtx, {
        type: 'bar',
        data: {
            labels: ['CPU', 'GPU', 'TensorRT'],
            datasets: [{
                label: 'FPS',
                data: [8, 45, 85],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(155, 89, 182, 0.8)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(155, 89, 182, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frames Per Second'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Initialize charts when DOM is loaded and after any transitions
document.addEventListener('DOMContentLoaded', function() {
    // Wait for content to be revealed
    const content = document.querySelector('.content-wrapper');
    if (content) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.classList.contains('revealed')) {
                    setTimeout(initializeCharts, 1000); // Delay initialization by 1 second after reveal
                    observer.disconnect(); // Stop observing once initialized
                }
            });
        });

        observer.observe(content, {
            attributes: true,
            attributeFilter: ['class']
        });
    } else {
        // Fallback: initialize directly if content wrapper is not found
        setTimeout(initializeCharts, 1000);
    }
}); 