const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  it('should throw an error if firstName is missing', () => {
    const employee = new Employee({lastName: 'Doe', department: 'department'});
    employee.validate(err => {
      expect(err.errors.firstName).to.exist;
      after(() => {
        mongoose.models = {};
      });
    });
  });
  it('should throw an error if lastName is missing', () => {
    const employee = new Employee({firstName: 'John', department: 'dep'});
    employee.validate(err => {
      expect(err.errors.lastName).to.exist;
      after(() => {
        mongoose.models = {};
      });
    });
  });
  it('should throw an error if department is missing', () => {
    const employee = new Employee({firstName: 'John', lastName: 'Doe'});
    employee.validate(err => {
      expect(err.errors.department).to.exist;
      after(() => {
        mongoose.models = {};
      });
    });
  });
  it('should throw an error if firstName is not a string', () => {

    const cases = [{}, []];
    for(let firstName of cases) {
      const employee = new Employee({ firstName: firstName, lastName: 'Doe', department: 'dep' });
  
      employee.validate(err => {
        expect(err.errors.firstName).to.exist;
        after(() => {
          mongoose.models = {};
        });
      });  
    }  
  });
  it('should throw an error if lastName is not a string', () => {

    const cases = [{}, []];
    for(let lastName of cases) {
      const employee = new Employee({ firstName: 'John', lastName: lastName, department: 'dep' });
  
      employee.validate(err => {
        expect(err.errors.lastName).to.exist;
        after(() => {
          mongoose.models = {};
        });
      });  
    }  
  });
  it('should throw an error if department is not a string', () => {

    const cases = [{}, []];
    for(let dep of cases) {
      const employee = new Employee({ firstName: 'John', lastName: 'Doe', department: dep });
  
      employee.validate(err => {
        expect(err.errors.department).to.exist;
        after(() => {
          mongoose.models = {};
        });
      });  
    }  
  });
  it('should throw an error if firstName is empty', () => {

      const employee = new Employee({ firstName: '', lastName: 'Doe', department: 'dep' });
      employee.validate(err => {
        expect(err.errors.firstName).to.exist;
        after(() => {
          mongoose.models = {};
        });
      });  
  });
  it('should throw an error if lastName is empty', () => {

    const employee = new Employee({ firstName: 'John', lastName: '', department: 'dep' });
    employee.validate(err => {
      expect(err.errors.lastName).to.exist;
      after(() => {
        mongoose.models = {};
      });
    });  
  });
  it('should throw an error if department is empty', () => {

    const employee = new Employee({ firstName: 'John', lastName: 'Doe', department: '' });
    employee.validate(err => {
      expect(err.errors.department).to.exist;
      after(() => {
        mongoose.models = {};
      });
    });  
  });
  it('should not throw an error if data is correct', () => {

    const employee = new Employee({ firstName: 'John', lastName: 'Doe', department: 'dep' });
    employee.validate(err => {
      expect(err).not.to.exist;
      after(() => {
        mongoose.models = {};
      });
    });  
  });
});