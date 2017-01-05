import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        // initialise variables
        var ctx2 = document.getElementById("myBarChart");
		var data = this.get('data');
		var dateArray = ['Jan 2016','Feb 2016','Mar 2016','Apr 2016','May 2016','Jun 2016','Jul 2016','Aug 2016','Sep 2016','Oct 2016','Nov 2016','Dec 2016'];
		var issueArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		// sort data
		data.sort(function (a, b) {
			//return moment(b.submission_timestamp, "MM/DD/YYYY HH:mm:ss").isAfter(moment(a.submission_timestamp, "MM/DD/YYYY HH:mm:ss")); // true
			//return moment(a.submission_timestamp, "MM/DD/YYYY") - moment(b.submission_timestamp, "MM/DD/YYYY");
			return moment(a.submission_timestamp) - moment(b.submission_timestamp);
		});

		// form a unique array of issue data
		$.each(data, function (key, value) {
			var dateJoined = moment(value.submission_timestamp).format('MMM YYYY');
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
		var dateArray = ['Jan 2016','Feb 2016','Mar 2016','Apr 2016','May 2016','Jun 2016','Jul 2016','Aug 2016','Sep 2016','Oct 2016','Nov 2016','Dec 2016'];
		var issueArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		// sort data
		data.sort(function (a, b) {
			//return moment(b.submission_timestamp, "MM/DD/YYYY HH:mm:ss").isAfter(moment(a.submission_timestamp, "MM/DD/YYYY HH:mm:ss")); // true
			//return moment(a.submission_timestamp, "MM/DD/YYYY") - moment(b.submission_timestamp, "MM/DD/YYYY");
			return moment(a.submission_timestamp) - moment(b.submission_timestamp);
		});

		// form a unique array of issue data
		$.each(data, function (key, value) {
			var dateJoined = moment(value.submission_timestamp).format('MMM YYYY');
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