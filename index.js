// Argument: One 4-element array
// Returns: One object with keys firstName, familyName, title, payPerHour, timeInEvents, and timeOutEvents
// This function takes in initial information on an individual employee and produces an employee time card.
function createEmployeeRecord(initialInfo) {
    return {
        firstName: initialInfo[0],
        familyName: initialInfo[1],
        title: initialInfo[2],
        payPerHour: initialInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
 // Argument: One array of arrays
 // Returns: One array of objects
 // This function takes in an array of initial information on multiple employees to produce an array of employee time cards.
function createEmployeeRecords(initialInfoArray) {
    return initialInfoArray.map(initialInfo => {
        return createEmployeeRecord(initialInfo)
    })
}

// Argument: one object and one string
// Returns: one updated object
// The following two functions take the employee time card object and a date stamp in the form of 'YYYY-MM-DD HHMM' (ex. '2022-01-01 800') to produce an updated employee time card with the date/time information included. The first function is for the time-in events and the second for the time-out events.
function createTimeInEvent(employeeRecord, dateStamp) {    
    const dateTime = dateStamp.split(' ')
    const newEvent = {
        type: 'TimeIn',
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    }
    employeeRecord.timeInEvents.push(newEvent)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const dateTime = dateStamp.split(' ')
    const newEvent = {
        type: 'TimeOut',
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    }
    employeeRecord.timeOutEvents.push(newEvent)
    return employeeRecord
}

// Arguments: one object and one string
// Returns: one integer
// This function takes the employee time card containing time-in/out events and calculates the total hours worked on a specific date, given in the form 'YYYY-MM-DD'. To do this, I extract the time for each time-in and time-out event and find the difference divided by 100.
function hoursWorkedOnDate(employeeRecord, date) {    
    let timeOutHour
    employeeRecord.timeOutEvents.find(event => {
        if(event.date === date) {
            timeOutHour = event.hour
        }
    })
    let timeInHour
    employeeRecord.timeInEvents.find(event => {
        if(event.date === date) {
            timeInHour = event.hour
        }
    })
    return (timeOutHour - timeInHour) / 100
}

// Arguments: one object and one string
// Returns: One number
// This function uses hoursWorkedOnDate and calculates the pay owed for a specific date.
function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

// Arugment: One object
// Returns: One number
// This function uses wagesEarnedOnDate to calculate the total pay owed for all the dates available for one employee time card.
function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => {
        return event.date
    })
    const wages = dates.map(date => {
        return wagesEarnedOnDate(employeeRecord, date)
    })
    return wages.reduce((total, wage) => {
        return total + wage
    }, 0)
}

// Argument: One array of objects
// Returns: One number
// This function takes an array of employee time cards to calculate the total sum of all the payments owed to all the available employees.
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
        return total + allWagesFor(employee)
    }, 0)
}

const a = {
    firstName: 'Teddy',
    familyName: 'Park',
    title: 'Dog',
    payPerHour: 10,
    timeInEvents: [{
        type: 'TimeIn',
        hour: 800,
        date: '2000-01-01'
    }, {
        type: 'TimeIn',
        hour: 800,
        date: '2000-01-02'
    }, {
        type: 'TimeIn',
        hour: 900,
        date: '2000-01-03'
    }],
    timeOutEvents: [{
        type: 'TimeOut',
        hour: 2100,
        date: '2000-01-01'
    }, {
        type: 'TimeOut',
        hour: 1800,
        date: '2000-01-02'
    }, {
        type: 'TimeOut',
        hour: 1900,
        date: '2000-01-03'
    },]
}
const b = {
    firstName: 'Jason',
    familyName: 'Park',
    title: 'Engineer',
    payPerHour: 30,
    timeInEvents: [{
        type: 'TimeIn',
        hour: 800,
        date: '2000-02-01'
    }, {
        type: 'TimeIn',
        hour: 800,
        date: '2000-02-02'
    }, {
        type: 'TimeIn',
        hour: 900,
        date: '2000-02-03'
    }],
    timeOutEvents: [{
        type: 'TimeOut',
        hour: 2100,
        date: '2000-02-01'
    }, {
        type: 'TimeOut',
        hour: 1800,
        date: '2000-02-02'
    }, {
        type: 'TimeOut',
        hour: 1900,
        date: '2000-02-03'
    },]
}
const c = {
    firstName: 'Jenny',
    familyName: 'Park',
    title: 'Docotr',
    payPerHour: 80,
    timeInEvents: [{
        type: 'TimeIn',
        hour: 800,
        date: '2000-03-01'
    }, {
        type: 'TimeIn',
        hour: 800,
        date: '2000-03-02'
    }, {
        type: 'TimeIn',
        hour: 900,
        date: '2000-03-03'
    }],
    timeOutEvents: [{
        type: 'TimeOut',
        hour: 2100,
        date: '2000-03-01'
    }, {
        type: 'TimeOut',
        hour: 1800,
        date: '2000-03-02'
    }, {
        type: 'TimeOut',
        hour: 1900,
        date: '2000-03-03'
    },]
}

// expecting sum of a = 330, b = 990, c = 2640 which is 3960
// console.log(calculatePayroll([a, b, c]))
// LOG: 3960