import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { Request, Response } from 'express';
import { carMock, carMockWithId } from '../../mocks/carMock';
import StatusCodes from '../../../helpers/StatusCodes';
const { expect } = chai;

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;
  before(() => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
    sinon.stub(carService, 'read').resolves([carMockWithId]);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });
  
  describe('When trying to create a car,', () => {

    it('should return status 201', async () => {
      req.body = carMock;

      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(StatusCodes.CREATED)).to.be.true;
    });

    it('should return a body with the new car', async () => {
      req.body = carMock;

      await carController.create(req, res);

      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('When trying to get all cars,', () => {
    it ('should return status 200', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(StatusCodes.OK)).to.be.true;
    });

    it('should return a body with a list of all cars', async () => {
      await carController.read(req, res);

      expect((res.json as sinon.SinonStub).calledWith([carMockWithId])).to.be.true;
    });
  });
});