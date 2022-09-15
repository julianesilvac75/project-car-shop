import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMock';
import CarModel from '../../../models/CarModel';
import { ZodError } from 'zod';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
  });
  
  after(() => {
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

  describe('When trying to get one car by id', () => {
    it('if it is a valid id, should return the car', async () => {
      const result = await carModel.readOne(carMockWithId._id);

      expect(result).to.be.deep.equal(carMockWithId);
    });

    it('if it is an invalid id, should return an error', async () => {
      let error;

      try {

        await carModel.readOne('invalid id');
      } catch (e: any) {

        error = e;
      }

      // expect(error).to.be.instanceOf(ZodError);
      expect(error.message).to.be.equal('InvalidMongoId');
    });

    it('if it is an inexistent id, should return null', async () => {
      const result = await carModel.readOne('6323928df0b7e4c75ee3ccd1');

      expect(result).to.be.null;
    });
  });
});