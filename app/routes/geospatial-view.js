import Ember from 'ember';
import RSVP from 'rsvp';

// declare variables
let employeeData = [];
let employeeDataCounter = 0;

// function to retrieve the relevant employee data from a csv file
let getEmployeeData = function () {
    return new RSVP.Promise(function (resolve, reject) {
        // retrieve relevant csv file
        employeeDataCounter = employeeDataCounter + 1;
        $.get('data/EmployeeData' + ((employeeDataCounter % 3) + 1) + '.csv', function (data) {
            // split the csv file
            let lines = data.split('\n');
            employeeData = [];

            // loop through each line of the csv file
            for (let i = 1; i < lines.length; i++) {
                // set variables
                let lineValues = lines[i].split(',');
                let countryCode = lineValues[5];
                let arrayIndex = 0;
                let employeeDataEntry = null;

                // check whether the employee data entry exists in the array
                $.each(employeeData, function (key, value) {
                    if (value.countryCode === countryCode) {
                        employeeDataEntry = value;
                        arrayIndex = key;
                    }
                });

                // validate if country code exists in the country employee array - add if it doesn't exist
                if (employeeDataEntry === null) {
                    employeeData.push({
                        countryCode: countryCode,
                        countryName: lineValues[6],
                        totalEmployees: 1
                    });
                } else {
                    let totalEmployees = parseInt(employeeData[arrayIndex].totalEmployees);
                    employeeData[arrayIndex].totalEmployees = totalEmployees + 1;
                }
            }

            // sort data array
            employeeData.sort(function(a,b){			
		    	return b.totalEmployees - a.totalEmployees;
		    });
        })
        .done(function () {
            // return employee data
            resolve(employeeData);
        })
        .fail(function () {
            // refject promise
            reject('Failed to retrieve employee data.');
        });
    });
};

// set interval
export const pollInterval = 10000;

export default Ember.Route.extend({
    model() {
        return getEmployeeData()
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
        let usersPoller = this.get('usersPoller');
         
        if (!usersPoller) {
            usersPoller = this.get('pollboy').add(this, this.onPoll, pollInterval);
            this.set('usersPoller', usersPoller);
        }
    },
    deactivate() {
        // remove poller
        const usersPoller = this.get('usersPoller');
        this.get('pollboy').remove(usersPoller);
    }
});