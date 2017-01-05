import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {                      
        // initialise variables
        var data = this.get('data');
        var issueData = data.issueData;
        var keyMetricsData = data.keyMetrics;
        var totalPayingCustomers = 0;
        var totalIssues = 0;
        var totalOpenIssues = 0;
        var totalClosedIssues = 0;

        // determine total open and closed issues
        $.each(issueData, function(key, value) {
            totalIssues = totalIssues + 1;

            if (value.open_closed_status === 'OPEN') {
                totalOpenIssues = totalOpenIssues + 1;
            }
            else if (value.open_closed_status === 'CLOSED') {
                totalClosedIssues = totalClosedIssues + 1;
            }
        });

        // determine total paying customers
        $.each(keyMetricsData, function(key, value) {
            totalPayingCustomers = totalPayingCustomers + 1;
        });
        
        // set values
        $('.totalPayingCustomers').text(totalPayingCustomers);
        $('.totalNumberIssues').text(totalIssues);
        $('.totalOpenIssues').text(totalOpenIssues);
        $('.totalClosedIssues').text(totalClosedIssues);
    },
    didRender() {        
        // initialise variables
        var data = this.get('data');
        var issueData = data.issueData;
        var keyMetricsData = data.keyMetrics;
        var totalPayingCustomers = 0;
        var totalIssues = 0;
        var totalOpenIssues = 0;
        var totalClosedIssues = 0;

        // determine total open and closed issues
        $.each(issueData, function(key, value) {
            totalIssues = totalIssues + 1;

            if (value.open_closed_status === 'OPEN') {
                totalOpenIssues = totalOpenIssues + 1;
            }
            else if (value.open_closed_status === 'CLOSED') {
                totalClosedIssues = totalClosedIssues + 1;
            }
        });

        // determine total paying customers
        $.each(keyMetricsData, function(key, value) {
            totalPayingCustomers = totalPayingCustomers + 1;
        });
        
        // set values
        $('.totalPayingCustomers').text(totalPayingCustomers);
        $('.totalNumberIssues').text(totalIssues);
        $('.totalOpenIssues').text(totalOpenIssues);
        $('.totalClosedIssues').text(totalClosedIssues);
    }
});