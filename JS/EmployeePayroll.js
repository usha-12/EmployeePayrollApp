class EmployeePayroll {

    get id() {
        return this.id;
    }
    set id(id) {
        this.id = id;
    }

    get name() {
        return this.name;
    }
    set name(name) {
        let nameRegex = /[A-Z][a-z]{2,}/;
        if (nameRegex.test(name))
            this.name = name;
        else
            throw "Invalid name";
    }

    get picture() {
        return this._picture;
    }
    set picture(picture) {
        this.picture = picture;
    }

    get gender() {
        return this._gender;
    }

    set gender(gender) {
        this.gender = gender;
    }

    get department() {
        return this.department;
    }

    set department(department) {
        this.department = department;
    }

    get salary() {
        return this.salary;
    }

    set salary(salary) {
        this.salary = salary;
    }

    get startDate() {
        return this.startDate;
    }

    set startDate(startDate) {
        startDate = startDate.getTime() + (30 * 24 * 60 * 60 * 1000);
        let today = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
        if (today >= startDate) {
            this.startDate = startDate;
        } else {
            ("Invalid date");
        }
    }

    get notes() {
        return this.notes;
    }

    set notes(notes) {
        this.notes = notes;
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-US", options);
        return "id = " + this.id + ", name = " + this.name + ", gender = " + this.gender + ", profile picture = " + this.profilePic + ", department = " + this.department + ", salary = " + this.salary + ", startDate = " + this.startDate + ", note = " + this.note;
    }
}