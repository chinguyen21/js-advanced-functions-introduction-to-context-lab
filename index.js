// Your code here

function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

// let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])

// console.log(testEmployee.familyName)

const createEmployeeRecords = (arr) => arr.map((employee) => createEmployeeRecord(employee));

function createTimeInEvent(employee, date_stamp) {
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(date_stamp.split(" ")[1]),
    date: date_stamp.split(" ")[0]
  })
  return employee;
}
function createTimeOutEvent(employee, date_stamp) {
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(date_stamp.split(" ")[1]),
    date: date_stamp.split(" ")[0]
  })
  return employee;
}

function hoursWorkedOnDate(employee, date_stamp) {
  let time_in = employee.timeInEvents.find((obj) => obj.date === date_stamp.split(" ")[0])
  let time_out = employee.timeOutEvents.find((obj) => obj.date === date_stamp.split(" ")[0])
  return (time_out.hour - time_in.hour)/100
}


const wagesEarnedOnDate = (employee, date_stamp) => employee.payPerHour * hoursWorkedOnDate(employee, date_stamp);

function allWagesFor(employee) {
  let add_dates = employee.timeInEvents.map((ele) => ele.date)
  return add_dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0)
}

const findEmployeeByFirstName = (srcArray, firstName) => srcArray.find(employee => employee.firstName === firstName)

const calculatePayroll = (employees) => employees.reduce((total, employee) => total + allWagesFor(employee), 0);

