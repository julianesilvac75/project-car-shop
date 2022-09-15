import { ICar } from '../../interfaces/ICar';

const carMock: ICar = {
    model: 'Ferrari Maranello',
    year: 1963,
    color: 'red',
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2,
};

const carMockWithId: ICar & { _id: String } = {
  _id: '6323928df0b7e4c75ee3ccd0',
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  doorsQty: 2,
  seatsQty: 2,
}

export {
  carMock,
  carMockWithId,
};
