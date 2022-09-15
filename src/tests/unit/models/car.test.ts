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
  });
  
  afterEach(() => {

  });

  describe('When trying to create a car,', () => {

    it('should return a new car', async () => {
      const result = await carModel.create(carMock);

      chai.expect(result).to.be.deep.equal(carMockWithId);
    });
  });
});