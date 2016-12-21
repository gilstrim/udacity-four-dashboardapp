import Ember from 'ember';

var thisLineChart = {};

export default Ember.Component.extend({
    didInsertElement() {
		// initialise variables
        var ctx = document.getElementById("myLineChart");
		var data = this.get('data');
		var dateArray = [];
		var customerArray = [];

		// sort data
		data.sort(function (a, b) {
			return moment(a.date_joined, "MM/DD/YYYY") - moment(b.date_joined, "MM/DD/YYYY");
		});

		// form a unique array of customer data
		$.each(data, function (key, value) {
			var dateJoined = moment(value.date_joined).format('MMM YYYY');
			var arrayFoundIndex = $.inArray(dateJoined, dateArray);

			if (dateArray.length > 0 && arrayFoundIndex >= 0) {
				customerArray[arrayFoundIndex] = customerArray[arrayFoundIndex] + 1;
			}
			else {
				dateArray.push(dateJoined);
				customerArray.push(1);
			}
		});

		// create chart
		thisLineChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: dateArray,
				datasets: [{
					label: "Paying customers per month",
					data: customerArray,
					fill: false
				}]
			},
			options: {
				scales: {
					xAxes: [{
						type: 'time',
						time: {
							unit: 'month',
							displayFormats: {
								'month': 'MMM YYYY'
							}
						}
					}]
				},
				responsive: true,
				maintainAspectRatio: false
			}
		});
    },
    didRender() {
		// initialise variables
        var ctx = document.getElementById("myLineChart");
		var data = this.get('data');
		var dateArray = [];
		var customerArray = [];

		// sort data
		data.sort(function (a, b) {
			return moment(a.date_joined, "MM/DD/YYYY") - moment(b.date_joined, "MM/DD/YYYY");
		});

		// form a unique array of customer data
		$.each(data, function (key, value) {
			var dateJoined = moment(value.date_joined).format('MMM YYYY');
			var arrayFoundIndex = $.inArray(dateJoined, dateArray);

			if (dateArray.length > 0 && arrayFoundIndex >= 0) {
				customerArray[arrayFoundIndex] = customerArray[arrayFoundIndex] + 1;
			}
			else {
				dateArray.push(dateJoined);
				customerArray.push(1);
			}
		});

		// create chart
		thisLineChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: dateArray,
				datasets: [{
					label: "Paying customers per month",
					data: customerArray,
					fill: false
				}]
			},
			options: {
				scales: {
					xAxes: [{
						type: 'time',
						time: {
							unit: 'month',
							displayFormats: {
								'month': 'MMM YYYY'
							}
						}
					}]
				},
				responsive: true,
				maintainAspectRatio: false
			}
		});

		var i = 0;
    }
});