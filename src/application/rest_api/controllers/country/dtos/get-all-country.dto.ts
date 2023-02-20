import { Expose, Type } from 'class-transformer';
import { CountryDto } from './country.dto';
export class AllCountryDto {
  @Expose()
  @Type(() => CountryDto)
  _items: CountryDto[];
}
