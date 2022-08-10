const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments', () => {
  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
    await testDepOne.save();

    const testDepTwo = new Department({ _id: '5d9f1159f81ce8d1ef2bee48', name: 'Department #2' });
    await testDepTwo.save();
  });
  
  after(async () => {
    await Department.deleteMany();
  });

  it('/:id should delete chosen document', async () => {
    const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
    const departments = await Department.find();
    expect(res.status).to.be.equal(200);
    expect(departments).to.be.an('array');
    expect(departments.length).to.be.equal(1);
  });
});