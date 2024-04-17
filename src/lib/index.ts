// place files you want to import through the `$lib` alias in this folder.

export const chartOptions = (forecastArray: any[]) => {
	const hoursToDisplay = [6, 11, 14, 17, 20, 23];

	const filteredForecast = forecastArray.filter((entry: any) => {
		const hour = new Date(entry.time).getHours();
		return hoursToDisplay.includes(hour);
	});
	let options = {
		chart: {
			height: '400px',
			maxWidth: '100%',
			type: 'area',
			fontFamily: 'Inter, sans-serif',
			dropShadow: {
				enabled: false
			},
			toolbar: {
				show: false
			}
		},
		tooltip: {
			enabled: true,
			x: {
				show: false
			}
		},
		fill: {
			type: 'gradient',
			gradient: {
				opacityFrom: 0.55,
				opacityTo: 0,
				shade: '#1C64F2',
				gradientToColors: ['#1C64F2']
			}
		},
		dataLabels: {
			enabled: true
		},
		stroke: {
			width: 4
		},
		grid: {
			show: false,
			strokeDashArray: 4,
			padding: {
				left: 0,
				right: 0,
				top: 0
			}
		},
		series: [
			{
				name: 'Temprature',
				data: filteredForecast.map((entry: any) => entry.temp_c),
				color: '#1A56DB'
			}
		],
		xaxis: {
			categories: filteredForecast.map((entry: any) => new Date(entry.time).getHours()),
			labels: {
				show: true
			},
			axisBorder: {
				show: true
			},
			axisTicks: {
				show: true
			}
		},
		yaxis: {
			show: true
		}
	};

	return options;
};
