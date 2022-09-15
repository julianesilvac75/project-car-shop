import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

class CarService implements IService<ICar> {
  private _carModel: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._carModel = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsedObj = CarZodSchema.safeParse(obj);

    if (!parsedObj.success) throw parsedObj.error;

    return this._carModel.create(parsedObj.data);
  }

  public async read(): Promise<ICar[]> {
    return this._carModel.read();
  }

  public async readOne(_id: string): Promise<ICar> {
    const car = await this._carModel.readOne(_id);

    if (!car) throw new Error('ObjectNotFound');

    return car;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    const parsedObj = CarZodSchema.safeParse(obj);

    if (!parsedObj.success) throw parsedObj.error;

    const updated = await this._carModel.update(_id, parsedObj.data);

    if (!updated) throw new Error('Erro desconhecido');

    return updated;
  }

  public async delete(_id: string): Promise<ICar> {
    const deleted = await this._carModel.delete(_id);

    if (!deleted) throw new Error('elemento nao encontrado');

    return deleted;
  }
}

export default CarService;
