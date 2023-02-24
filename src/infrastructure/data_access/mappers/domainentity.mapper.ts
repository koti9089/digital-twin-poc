import { Injectable } from '@nestjs/common';
import { DomainEntity } from 'src/domain/entities/domainEntity';

@Injectable()
export class DomainEntityMapper {
  constructor() {}
  toDomain(entityResponse) {
    const entity = entityResponse._items.map((entity) => {
      return DomainEntity.create({
        id: entity.id,
        name: entity.properties.name[0].value,
        type:entity.label,
      });
    });
    return entity;
  }
}
