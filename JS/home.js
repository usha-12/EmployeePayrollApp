window.addEventListener("DOMContentLoaded", (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    let innerHtml = `${headerHtml}`
    let employeePayrollList = createEmployeePayrollJSON();
    for (const employee of employeePayrollList) {
        innerHtml = `${innerHtml}
    <tr>
    <td>
        <img class="profile" alt="" src="${employee._picture}">
    </td>
    <td>${employee._name}</td>
    <td>${employee._gender}</td>
    <td>${getDeptHtml(employee._department)}</td>
    <td>${employee._salary}</td>
    <td>${employee._startDate}</td>
    <td>
        <img id="${employee._id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
        <img id="${employee._id}" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
    </td>
 </tr>
    `;
    }
    document.querySelector("#display").innerHTML = innerHtml;
};

const createEmployeePayrollJSON = () => {
    let employeeListLocal = [{
            _name: "Alex",
            _gender: "Male",
            _department: ["Finance", "Sales"],
            _salary: "700000",
            _startDate: "26 jan 2018",
            _note: "",
            _id: new Date().getTime(),
            _picture: "../assets/profile-images/Ellipse -5.png"
        },
        {
            _name: "Liya",
            _gender: "Female",
            _department: ["Finance", "Engineering"],
            _salary: "750000",
            _startDate: "17 Dec 2018",
            _note: "",
            _id: new Date().getTime() + 1,
            _picture: "../assets/profile-images/Ellipse -7.png"
        }
    ];
    return employeeListLocal;
};

const getDeptHtml = (departmentList) => {
    let deptHtml = "";
    for (const dept of departmentList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
};