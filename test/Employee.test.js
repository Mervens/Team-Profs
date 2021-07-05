const Employee = require('../lib/Employee');

test('Initiate Emp', () => {
	const e = new Employee();
	expect(typeof e).toBe('object');
});

test('Name val', () => {
	const name = 'Merv';
	const e = new Employee(name);
	expect(e.name).toBe(name);
});

test('ID', () => {
	const testValue = 100;
	const e = new Employee('Vic', testValue);
	expect(e.id).toBe(testValue);
});

test('Email', () => {
	const testValue = 'test@test.com';
	const e = new Employee('Vic', 1, testValue);
	expect(e.email).toBe(testValue);
});

test('getName()', () => {
	const testValue = 'Merv';
	const e = new Employee(testValue);
	expect(e.getName()).toBe(testValue);
});

test('getId()', () => {
	const testValue = 100;
	const e = new Employee('Vic', testValue);
	expect(e.getId()).toBe(testValue);
});

test('getEmail()', () => {
	const testValue = 'test@test.com';
	const e = new Employee('Vic', 1, testValue);
	expect(e.getEmail()).toBe(testValue);
});

test('getRole()', () => {
	const testValue = 'Employee';
	const e = new Employee('Merv', 1, 'test@test.com');
	expect(e.getRole()).toBe(testValue);
});
