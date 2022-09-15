import { Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }
  
  // read(): Promise<T[]>,
  // readOne(_id: string): Promise<T | null>,
  // update(_id: string, obj: T): Promise<T | null>,
  // delete(_id: string): Promise<T | null>
}

export default MongoModel;
