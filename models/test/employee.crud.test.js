const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  before(async () => {

    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });
  after(async () => {
    await Employee.deleteMany();
  });

  describe('Reading data', () => {

    before( async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'depOne' });
      await testEmpOne.save();
  
      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Smith', department: 'depTwo' });
      await testEmpTwo.save();
    });
    after(async () => {
      await Employee.deleteMany();
    });

    it('should return all the data with find method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with findOne method', async () => {
      const employee = await Employee.findOne({ $or: [ { firstName: 'test'}, { lastName: ''}, { department: 'depTwo'}]});
      const expectedPerson = { firstName: 'Amanda', lastName: 'Smith', department: 'depTwo'};
      expect(employee.firstName).to.be.equal(expectedPerson.firstName) &&
      expect(employee.lastName).to.be.equal(expectedPerson.lastName) &&
      expect(employee.department).to.be.equal(expectedPerson.department);
    });
  });

  describe('Creating data', () => {
    it('should insert new document with insertOne method', async () => {
      const employee = new Employee({ firstName: 'Thomas', lastName: 'Jefferson', department: 'newDep'});
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'depOne' });
      await testEmpOne.save();
  
      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Smith', department: 'depTwo' });
      await testEmpTwo.save();
    });
    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'John' }, { $set: { firstName: '=Johnny=' }});
      const updatedEmp = await Employee.findOne({ firstName: '=Johnny=' });
      expect(updatedEmp).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      employee.firstName = '=Johnny=';
      await employee.save();
    
      const updatedEmp = await Employee.findOne({ firstName: '=Johnny=' });
      expect(updatedEmp).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, {$set: { department: 'updatedDep' }});
      const employees = await Employee.find({ department: 'updatedDep'});
      expect(employees.length).to.be.equal(2);
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'depOne' });
      await testEmpOne.save();
  
      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Smith', department: 'depTwo' });
      await testEmpTwo.save();
    });
    afterEach(async () => {
      await Employee.deleteMany();
    });
    

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ lastName: 'Doe'});
      const removedEmp = await Employee.findOne({ lastName: 'Doe' });
      expect(removedEmp).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ lastName: 'Doe' });
      await employee.remove();
      const removedEmp = await Employee.findOne({ lastName: 'Doe' });
      expect(removedEmp).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });
  });

});