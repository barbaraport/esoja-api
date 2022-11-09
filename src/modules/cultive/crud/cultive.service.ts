import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/providers/prisma/prisma.service';
import { QuerybuilderService } from '@src/providers/prisma/querybuilder/querybuilder.service';
import { CreateCultiveDto } from './dto/create-cultive.dto';
import { UpdateCultiveSampleInformationDto } from './dto/update-cultive-sample-information.dto';
import { UpdateCultiveDto } from './dto/update-cultive.dto';

@Injectable()
export class CultiveService {
  constructor(private readonly prisma: PrismaService, private readonly qb: QuerybuilderService) {}

  async create(createDto: CreateCultiveDto) {
    const property = await this.prisma.property.findUnique({ where: { id: createDto.propertyId } });

    if (!property) throw new BadRequestException('Property not found');

    const cultiveCoordinates = createDto.cultiveCoordinates;

    delete createDto.cultiveCoordinates;

    const cultive = await this.prisma.cultive.create({ data: { ...createDto } });

    const cultiveCoordinatesData = cultiveCoordinates.map((v) => ({ latitude: v.latitude, longitude: v.longitude, cultiveId: cultive.id }));

    await this.prisma.cultiveCoordinates.createMany({
      data: [...cultiveCoordinatesData],
      skipDuplicates: true,
    });

    return cultive;
  }

  async findAll() {
    const query = await this.qb.query('cultive');

    return this.prisma.cultive.findMany(query).catch(() => {
      throw new BadRequestException('Error on proccess your query, please check your parameters');
    });
  }

  async findOne(id: string) {
    const cultive = await this.prisma.cultive.findUnique({ where: { id: id }, include: { coordinates: true, samples: true } });

    if (!cultive) throw new BadRequestException('Cultive not found');

    return cultive;
  }

  async updateSampleInformation(id: string, updateDto: UpdateCultiveSampleInformationDto) {
    const cultive = await this.prisma.cultive.findUnique({ where: { id: id } });

    if (!cultive) throw new BadRequestException('Cultive not found');

    // if (cultive.plantsPerMeter || cultive.metersBetweenPlants) throw new BadRequestException('Sample information already exists in this cultive');

    const updateData = {
      plantsPerMeter: updateDto['plantsPerMeter'],
      metersBetweenPlants: updateDto['metersBetweenPlants'],
    };

    await this.prisma.cultive.update({ where: { id: id }, data: updateData });
  }

  async update(id: string, updateDto: UpdateCultiveDto) {
    const cultive = await this.prisma.cultive.findUnique({ where: { id: id } });

    if (!cultive) throw new BadRequestException('Cultive not found');

    await this.prisma.cultive.update({ where: { id: id }, data: updateDto });
  }

  async delete(id: string) {
    await this.prisma.cultive.delete({ where: { id: id } }).catch(() => {
      throw new BadRequestException('Error on delete property');
    });
  }
}
