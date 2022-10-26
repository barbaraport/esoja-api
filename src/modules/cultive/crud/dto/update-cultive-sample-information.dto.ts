import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class UpdateCultiveSampleInformationDto {
  @IsInt()
  @IsNotEmpty()
  plantsPerMeter: number;

  @IsNumber()
  @IsNotEmpty()
  metersBetweenPlants: number;

  @IsUrl()
  @IsOptional()
  photo?: string;
}
