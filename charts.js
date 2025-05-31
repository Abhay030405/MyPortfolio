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
    const sentimentCtx = document.getElementById('sentimentChart');
    if (sentimentCtx) {
        new Chart(sentimentCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Positive', 'Neutral', 'Negative'],
                datasets: [{
                    data: [45, 35, 20],
                    backgroundColor: [
                        'rgba(46, 204, 113, 0.8)',
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(231, 76, 60, 0.8)'
                    ],
                    borderColor: [
                        'rgba(46, 204, 113, 1)',
                        'rgba(52, 152, 219, 1)',
                        'rgba(231, 76, 60, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    }
                }
            }
        });
    }
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