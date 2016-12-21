import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        // initialise variables
        var ctx2 = document.getElementById("myBarChart");
		var data = this.get('data');
		var dateArray = [];
		var issueArray = [];

		// sort data
		data.sort(function (a, b) {
			return moment(a.issue_date, "MM/DD/YYYY") - moment(b.issue_date, "MM/DD/YYYY");
		});

		// form a unique array of issue data
		$.each(data, function (key, value) {
			var dateJoined = moment(value.issue_date).format('MMM YYYY');
			var arrayFoundIndex = $.inArray(dateJoined, dateArray);

			if (dateArray.length > 0 && arrayFoundIndex >= 0) {
				issueArray[arrayFoundIndex] = issueArray[arrayFoundIndex] + 1;
			}
			else {
				dateArray.push(dateJoined);
				issueArray.push(1);
			}
		});

		// form data for chart
		var data2 = {
			labels: dateArray,
			datasets: [
				{
					label: "Reported Issues per Month",
					borderWidth: 1,
					data: issueArray,
				}
			]
		};

		// create chart
		var myBarChart = new Chart(ctx2, {
			type: 'bar',
			data: data2,
			options: {
				scales: {
					xAxes: [{
						display: true
					}]
				},
				responsive: true,
				maintainAspectRatio: true
			}
		});

    },
    didRender() {
		// initialise variables
        var ctx2 = document.getElementById("myBarChart");
		var data = this.get('data');
		var dateArray = [];
		var issueArray = [];

		// sort data
		data.sort(function (a, b) {
			return moment(a.issue_date, "MM/DD/YYYY") - moment(b.issue_date, "MM/DD/YYYY");
		});

		// form a unique array of issue data
		$.each(data, function (key, value) {
			var dateJoined = moment(value.issue_date).format('MMM YYYY');
			var arrayFoundIndex = $.inArray(dateJoined, dateArray);

			if (dateArray.length > 0 && arrayFoundIndex >= 0) {
				issueArray[arrayFoundIndex] = issueArray[arrayFoundIndex] + 1;
			}
			else {
				dateArray.push(dateJoined);
				issueArray.push(1);
			}
		});

		// form data for chart
		var data2 = {
			labels: dateArray,
			datasets: [
				{
					label: "Reported Issues per Month",
					borderWidth: 1,
					data: issueArray,
				}
			]
		};

		// create chart
		var myBarChart = new Chart(ctx2, {
			type: 'bar',
			data: data2,
			options: {
				scales: {
					xAxes: [{
						display: true
					}]
				},
				responsive: true,
				maintainAspectRatio: true
			}
		});
    }
});