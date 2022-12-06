let employeePayrollList;

window.addEventListener("DOMContentLoaded", (event) => {
    if (site_properties.use_local_storage.match("true")) {
        getEmployeeFromStorage();
    } else getEmployeePayrollDataFromServer();
});

const getEmployeeFromStorage = () => {

    
    // document.querySelector(".emp-count").textContent = employeePayrollList.length;
    employeePayrollList = localStorage.getItem("EmployeeList") ? JSON.parse(localStorage.getItem("EmployeeList")) : [];
    processEmployeePayrollDataResponse();
};

const processEmployeePayrollDataResponse = () => {
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

const getEmployeePayrollDataFromServer = () => {
    makePromiseCall("GET", site_properties.server_url, true)
        .then(responseText => {
            employeePayrollList = JSON.parse(responseText);
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status :" + JSON.stringify(error));
            employeePayrollList = [];
            processEmployeePayrollDataResponse();
        });
}

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    if (employeePayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`
    for (const employee of employeePayrollList) {
        let displayDate = stringifyDate(employee._startDate);
        innerHtml = `${innerHtml}
   <tr>
   <td>
       <img class="profile" alt="" src="${employee._picture}">
   </td>
   <td>${employee._name}</td>
   <td>${employee._gender}</td>
   <td>${getDeptHtml(employee._department)}</td>
   <td>${employee._salary}</td>
   <td>${displayDate}</td>
   <td>
       <img id="${employee._name}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
       <img id="${employee._name}" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
   </td>
</tr>
   `;
    }
    document.querySelector("#display").innerHTML = innerHtml;
};

const getDeptHtml = (deptList) => {
    let deptHtml = "";
    for (const dept of deptList) {
        deptHtml = ` ${deptHtml} <div class="dept-label">${dept}</div>`
    }
    return deptHtml;
};

const remove = (node) => {
    let employeeData = employeePayrollList.find(empData => empData._name == node.id);
    if (!employeeData) return;
    const index = employeePayrollList.map(empData => empData._name).indexOf(employeeData._name);
    employeePayrollList.splice(index, 1);
    localStorage.setItem("EmployeeList", JSON.stringify(employeePayrollList));
    createInnerHtml();
}

const update = (node) => {
    let employee = employeePayrollList.find((emp) => emp._name == node.id);
    if (!employee) return;
    localStorage.setItem("editEmp", JSON.stringify(employee));
    window.location.replace(site_properties.add_emp_payroll_page);
};