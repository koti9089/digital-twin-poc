import { Entity } from '../entity';
import {IDomainEntityProps } from './domainEntity.props';

export class DomainEntity extends Entity<IDomainEntityProps>{
  private _name: string;
  private _type: string;

  private constructor(props: IDomainEntityProps) {
    const { id } = props;
    super(id);
    this._name = props.name;
    this._type = props.type;
  } 
  
  public static create(props: IDomainEntityProps): DomainEntity {
    const instance = new DomainEntity(props);
    return instance;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get type(): string {
    return this._type;
  }

  set type(type: string) {
    this._type = type;
  }
}