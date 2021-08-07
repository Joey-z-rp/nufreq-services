import { IsNumber } from 'class-validator';

export class SetNumberDto {
  @IsNumber()
  public number: number;
}
