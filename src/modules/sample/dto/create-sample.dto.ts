import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

export class CreateSampleDto {
  @IsUUID()
  @IsNotEmpty()
  cultiveId: string;

  @ArrayMaxSize(3)
  @ArrayMinSize(3)
  @IsArray()
  @Type(() => SampleDto)
  @ValidateNested({ each: true })
  samples: SampleDto[];
}

class SampleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  heightPlantA: number;

  @IsNumber()
  @IsNotEmpty()
  heightPlantB: number;

  @IsString()
  @IsNotEmpty()
  photoPlantA: string;

  @IsString()
  @IsNotEmpty()
  photoPlantB: string;

  @IsNumber()
  @IsNotEmpty()
  stagePlantA: number;

  @IsNumber()
  @IsNotEmpty()
  stagePlantB: number;

  @IsNumber()
  @IsOptional()
  podsPlantA?: number;

  @IsNumber()
  @IsOptional()
  podsPlantB?: number;

  @IsNumber()
  @IsOptional()
  grainsPlantA?: number;

  @IsNumber()
  @IsOptional()
  grainsPlantB?: number;
}
