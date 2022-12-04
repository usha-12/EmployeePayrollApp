let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;
    });

    const name = document.querySelector("#name");
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            setTextValue(".text-error", "");
            return;
        }
        try {
            (new EmployeePayroll()).name = name.value;
            setTextValue(".text-error", "");
        } catch (e) {
            setTextValue(".text-error", e);
        }
    });

    const startDate = document.querySelector("#startDate");
    const day = document.querySelector("#day");
    const month = document.querySelector("#month");
    const year = document.querySelector("#year");
    startDate.addEventListener("input", function() {
        try {
            new EmployeePayroll().startDate = new Date(Date.UTC(year.value, month.value - 1, day.value));
            setTextValue(".date-error", "");
        } catch (e) {
            setTextValue(".date-error", e);
        }
    });
    checkForUpdate();
});

const saveForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        return;
    }
};

function createAndUpdateStorage() {
    let employeeList = JSON.parse(localStorage.getItem("EmployeeList"));
    if (employeeList) {
        let employee = employeeList.find(emp => emp._id == employeePayrollObj._id);
        if (!employee) employeeList.push(saveData());
        else {
            const index = employeeList.map(emp => emp._id).indexOf(employee._id);
            employeeList.splice(index, 1, createEmpData(employee._id));
        }
    } else {
        employeeList = [saveData()];
    }

    localStorage.setItem("EmployeeList", JSON.stringify(employeeList));
};

const getSelectedValues = (property) => {
    let allItems = document.querySelectorAll(property);
    let setItems = [];
    allItems.forEach(item => {
        if (item.checked) setItems.push(item.value);
    });
    return setItems;
};

const setEmployeePayrollObject = () => {
    employeePayrollObj._name = document.getElementById("name").value;
    employeePayrollObj._picture = document.querySelector('input[name = profile]:checked').value;
    employeePayrollObj._gender = document.querySelector('input[name = gender]:checked').value;
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = document.getElementById("salary").value;
    var day = document.getElementById("day").value;
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;
    employeePayrollObj._note = document.getElementById("notes").value;
    employeePayrollObj._startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

function saveData() {
    let employee = new EmployeePayroll();
    employee.id = createNewId();
    employee.name = document.getElementById("name").value;
    employee.picture = document.querySelector('input[name = profile]:checked').value;
    employee.gender = document.querySelector('input[name = gender]:checked').value;
    employee.department = getSelectedValues('[name=department]');
    employee.salary = document.getElementById("salary").value;
    var day = document.getElementById("day").value;
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;
    employee.note = document.getElementById("notes").value;
    employee.startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return employee;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
};

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) item.checked = true;
        } else if (item.value == value) item.checked = true;
    });
};

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
};

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
};

const setForm = () => {
    setValue("#name", employeePayrollObj._name);
    setSelectedValues("[name=profile]", employeePayrollObj._picture);
    setSelectedValues("[name=gender]", employeePayrollObj._gender);
    setSelectedValues("[name=department]", employeePayrollObj._department);
    setValue("#salary", employeePayrollObj._salary);
    setTextValue(".salary-output", employeePayrollObj._salary);
    setValue("#notes", employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    let month = new Date(date).getMonth() + 1;
    setValue("#day", date[0]);
    setValue("#month", month);
    setValue("#year", date[2]);
};

const resetForm = () => {
    setValue("#name", "");
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    setValue("#salary", "");
    setValue("#notes", "");
    setSelectedIndex("#day", 0);
    setSelectedIndex("#month", 0);
    setSelectedIndex("#year", 0);
};

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
};

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem("editEmp");
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
};

const createEmpData = (id) => {
    let employee = new EmployeePayroll();
    if (!id) employee.id = createNewId();
    else employee.id = id;
    setEmpPayrollData(employee);
    return employee;
};

const setEmpPayrollData = (employee) => {
    try {
        employee.name = employeePayrollObj._name;
    } catch (e) {
        setTextValue(".text-error", e);
        throw e;
    }
    employee.picture = employeePayrollObj._picture;
    employee.gender = employeePayrollObj._gender;
    employee.department = employeePayrollObj._department;
    employee.salary = employeePayrollObj._salary;
    employee.note = employeePayrollObj._note;
    try {
        employee.startDate = new Date(Date.parse(employeePayrollObj._startDate));
    } catch (e) {
        setTextValue(".date-error", e);
        throw e;
    }
};

const createNewId = () => {
    let empId = localStorage.getItem("EmployeeID");
    empId = !empId ? 1 : (parseInt(empId) + 1).toString();
    localStorage.setItem("EmployeeID", empId);
    return empId;
};