// base class Employee
class Employee {
  constructor(name, department) {
    this.name = name;
    this.department = department;
  }

  describe() {
    return this.name + " works in the " + this.department + " department.";
  }
}

// subclass Manager extends Employee and overrides describe()
class Manager extends Employee {
  constructor(name, department, teamSize) {
    // Use super() to pass name and department to Employee
    super(name, department);
    this.teamSize = teamSize;
  }

  // vverride describe()
  describe() {
    return this.name +
      " manages a team of " + this.teamSize +
      " in the " + this.department + " department.";
  }
}

// Company class
class Company {
  constructor() {
    this.employees = [];
  }

  addEmployee(employee) {
    this.employees.push(employee);
  }

  listEmployees() {
    // Log each employee's description to the console
    for (let i = 0; i < this.employees.length; i++) {
      const person = this.employees[i];
      console.log(person.describe());
    }
  }
}

// Testing it by creating sample employees and managers
const e1 = new Employee("Alex Johnson", "Sales");
const e2 = new Employee("Priya Shah", "Engineering");
const m1 = new Manager("Jordan Miller", "Engineering", 5);

// instantiate a Company, add instances, and list employees
const myCompany = new Company();
myCompany.addEmployee(e1);
myCompany.addEmployee(e2);
myCompany.addEmployee(m1);

// show output in console when the page loads
console.log("=== Company Roster ===");
myCompany.listEmployees();
