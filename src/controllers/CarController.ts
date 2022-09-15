import { Request, Response } from 'express';
import StatusCodes from '../helpers/StatusCodes';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

class CarController {
  private _service: IService<ICar>;

  constructor(service: IService<ICar>) {
    this._service = service;
  }

  public async create(req: Request, res: Response<ICar>) {
    const {
      model, year, color, status, buyValue, doorsQty, seatsQty,
    } = req.body;

    const carObj = {
      model, year, color, status, buyValue, doorsQty, seatsQty,
    };

    const newCar = await this._service.create(carObj);
    return res.status(StatusCodes.CREATED).json(newCar);
  }
}

export default CarController;
