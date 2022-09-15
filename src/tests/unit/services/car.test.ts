import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId } from '../../mocks/carMock';
import { ZodError } from 'zod';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
  });

  after(() => {
    sinon.restore();
  })

  describe('When trying to create a car,', () => {
    it('with valid data, should return a new car', async () => {
      const result = await carService.create(carMock);

      expect(result).to.be.deep.equal(carMockWithId);
    });

    it('with invalid data, should throw an error', async () => {
      let error;

      try {
        await carService.create({ message: 'Invalid data' });
      } catch (e) {
        error = e;
      }

      expect(error).to.be.instanceOf(Error);
    });
  });

  describe('When trying to get all cars,', () => {
    it('should return all cars', async () => {
      const result = await carService.read();

      expect(result).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('When trying to get one car by the id,', () => {
    it('if it is an existent id, should return the car', async () => {
      const result = await carService.readOne(carMockWithId._id);

      expect(result).to.be.deep.equal(carMockWithId);
    });

    it('if it is an inexistent id, should throw an error', async () => {
      let error;

      try {
        await carService.readOne('6323928df0b7e4c75ee3ccd1');
      } catch (e: any) {
        error = e;
      }

      expect(error.message).to.be.equal('ObjectNotFound');
    })
  });
});