import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMock';
import CarModel from '../../../models/CarModel';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();

  beforeEach(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
  });
  
  afterEach(() => {
    sinon.restore();
  });

  describe('When trying to create a car,', () => {

    it('should return a new car', async () => {
      const result = await carModel.create(carMock);

      expect(result).to.be.deep.equal(carMockWithId);
    });
  });

  describe('When trying to get all cars,', () => {
    it('should return a list of cars', async () => {
      const result = await carModel.read();

      expect(result).to.be.deep.equal([carMockWithId]);
    });
  });
});