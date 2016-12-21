import Ember from 'ember';
import RSVP from 'rsvp';

let issueData = [];
let issueDataCounter = 0;

// function to retrieve the relevant issue data from a json file
let getIssueData = function () {
    return new RSVP.Promise(function (resolve, reject) {
        // retrieve relevant json file
        issueData = [];
        issueDataCounter = issueDataCounter + 1;
        fetch('data/IssueData' + ((issueDataCounter % 3) + 1) + '.json')
            .then(function (result) {
                resolve(result.json());
            })           
            .catch(function (error) {
            	// log error to console
            	reject(error);
            });        
    });
};

// set interval
export const pollInterval = 10000;

export default Ember.Route.extend({
    model() {
        return getIssueData()
            .then(function (result) {
                return result;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    onPoll() {
        // handle poll event
        return RSVP.Promise.resolve(this.refresh());
    },
    afterModel() {
        // set poller
        let dataIssuePoller = this.get('dataIssuePoller');

        if (!dataIssuePoller) {
            dataIssuePoller = this.get('pollboy').add(this, this.onPoll, pollInterval);
            this.set('dataIssuePoller', dataIssuePoller);
        }
    },
    deactivate() {
        // remove poller
        const dataIssuePoller = this.get('dataIssuePoller');
        this.get('pollboy').remove(dataIssuePoller);
    }
});
