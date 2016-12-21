import Ember from 'ember';
import RSVP from 'rsvp';

let issueData = [];
let customerData = [];

let customerDataCounter = 0;
let issueDataCounter = 0;

// function to retrieve the relevant issue data from a json file
let getIssueData = function () {
    return new RSVP.Promise(function (resolve, reject) {
        // retrieve relevant json file
        issueData = [];
        issueDataCounter = issueDataCounter + 1;
        fetch('data/IssueData' + ((issueDataCounter % 3) + 1) + '.json')
            .then(function (result) {
                return result.json();
            })
            .then(function (jsonResponse) {
                // create issue list
                for (var i = 0; i < jsonResponse.rows.length; i++) {
                    issueData.push(jsonResponse.rows[i]);
                }

                // return issue list
                resolve(issueData);
            })
            .catch(function (error) {
            	// log error to console
            	console.log(error);
            });        
    });
};

// function to retrieve the relevant issue data from a json file
let getKeyMetricsData = function () {
    return new RSVP.Promise(function (resolve, reject) {
        // retrieve relevant json file
        customerData = [];
        customerDataCounter = customerDataCounter + 1;
        fetch('data/CustomerData' + ((customerDataCounter % 3) + 1) + '.json')
            .then(function (result) {
                return result.json();
            })
            .then(function (jsonResponse) {
                // create issue list
                for (var i = 0; i < jsonResponse.length; i++) {
                    customerData.push(jsonResponse[i]);
                }

                // return issue list
                resolve(customerData);
            })
            .catch(function (error) {
            	// log error to console
            	console.log(error);
            });        
    });
};

// set interval
export const pollInterval = 10000;

export default Ember.Route.extend({    
    model(data) {
        return Ember.RSVP.hash({
            issueData: getIssueData(),
            keyMetrics: getKeyMetricsData()
        });
    },
    onPoll() {
        // handle poll event
        return RSVP.Promise.resolve(this.refresh());
    },
    afterModel() {
        // set poller
        let keyMetricsPoller = this.get('keyMetricsPoller');

        if (!keyMetricsPoller) {
            keyMetricsPoller = this.get('pollboy').add(this, this.onPoll, pollInterval);
            this.set('keyMetricsPoller', keyMetricsPoller);
        }
    },
    deactivate() {
        // remove poller
        const keyMetricsPoller = this.get('keyMetricsPoller');
        this.get('pollboy').remove(keyMetricsPoller);
    }
});