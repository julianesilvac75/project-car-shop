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
})