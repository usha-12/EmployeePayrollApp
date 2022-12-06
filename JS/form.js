const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function() {
    output.textContent = salary.value;
});

const text = document.querySelector('#name');
const textError = document.querySelector('.text-error');
text.addEventListener('input', function() {
    const regName = /^[A-Z][a-z]{2,}$/;
    if (regName.test(text.value))
        textError.textContent = "";
    else textError.textContent = "Invalid first name ";
});

document.getElementById("submit").onclick = function() {
    let employee = new EmployeePayroll();
    employee.name = document.getElementById("name").value;
    employee.picture = document.querySelector('input[name = profile]:checked').value;
    employee.gender = document.querySelector('input[name = gender]:checked').value;
    employee.department = document.querySelector('input[name = department]:checked').value;
    employee.salary = document.getElementById("salary").value;
    employee.notes = document.getElementById("notes").value;
    employee.startDate = new Date(parseInt(document.getElementById("year").value), parseInt(document.getElementById("month").value), parseInt(document.getElementById("day").value));
};