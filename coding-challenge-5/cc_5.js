
"use strict";

// Step 1
const employees = [
  { name: "Ava",   hourlyRate: 20, hoursWorked: 38 },
  { name: "Liam",  hourlyRate: 22, hoursWorked: 44 },
  { name: "Maya",  hourlyRate: 18.5, hoursWorked: 40 },
  { name: "Noah",  hourlyRate: 25, hoursWorked: 52 },
  { name: "Sofia", hourlyRate: 19, hoursWorked: 41 }
];

// Step 2
function calculateBasePay(rate, hours) {
  const regularHours = Math.min(hours, 40);
  return regularHours * rate;
}

// Step 3
function calculateOvertimePay(rate, hours) {
  const overtimeHours = Math.max(hours - 40, 0);
  return overtimeHours * rate * 1.5;
}

// Step 4
function calculateTaxes(grossPay) {
  return grossPay * 0.15;
}

// Helper
function round2(num) {
  return Math.round(num * 100) / 100;
}

// Step 5
function processPayroll(employee) {
  const basePay = calculateBasePay(employee.hourlyRate, employee.hoursWorked);
  const overtimePay = calculateOvertimePay(employee.hourlyRate, employee.hoursWorked);
  const grossPay = basePay + overtimePay;
  const taxes = calculateTaxes(grossPay);
  const netPay = grossPay - taxes;

  return {
    name: employee.name,
    basePay: round2(basePay),
    overtimePay: round2(overtimePay),
    grossPay: round2(grossPay),
    netPay: round2(netPay)
  };
}

// Step 6
const payrollReport = employees.map(processPayroll);

// Individual logs
console.log("=== Individual Payroll Records ===");
payrollReport.forEach(record => console.log(record));



