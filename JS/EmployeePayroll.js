class EmployeePayroll {

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = /[A-Z][a-z]{2,}/;
        if (nameRegex.test(name))
            this._name = name;
        else
            throw "Invalid Name";
    }

    get picture() {
        return this._picture;
    }
    set picture(picture) {
        this._picture = picture;
    }

    get gender() {
        return this._gender;
    }

    set gender(gender) {
        this._gender = gender;
    }

    get department() {
        return this._department;
    }

    set department(department) {
        this._department = department;
    }

    get salary() {
        return this._salary;
    }

    set salary(salary) {
        this._salary = salary;
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(startDate) {
        this._startDate = startDate;
    }

    get notes() {
        return this._notes;
    }

    set notes(notes) {
        this._notes = notes;
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-US", options);
        return "id = " + this.id + ", name = " + this.name + ", gender = " + this.gender + ", profile picture = " + this.picture + ", department = " + this.department + ", salary = " + this.salary + ", startDate = " + empDate + ", note = " + this.notes;
    }
}