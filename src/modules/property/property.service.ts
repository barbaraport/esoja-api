import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/providers/prisma/prisma.service';
import { QuerybuilderService } from '@src/providers/prisma/querybuilder/querybuilder.service';
import { CepPromise } from '@src/utils/functions/cep.promise.fn';
import { getIbgeCode } from '@src/utils/functions/ibge.fn';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(private readonly prisma: PrismaService, private readonly qb: QuerybuilderService) {}

  async create(createDto: CreatePropertyDto) {
    const user = await this.prisma.user.findUnique({ where: { id: createDto.userId } });

    if (!user) throw new BadRequestException('User not found');

    const zipcodeData = await CepPromise(createDto.zipcode);

    createDto.city = zipcodeData.city;
    createDto.state = zipcodeData.state;
    createDto.ibgeCode = (await getIbgeCode(zipcodeData.state, zipcodeData.city)) + '';

    const property = await this.prisma.property.create({ data: createDto }).catch(() => {
      throw new BadRequestException('Error on create property');
    });

    return property;
  }

  async findAll() {
    const query = await this.qb.query('property');

    return this.prisma.property.findMany(query).catch(() => {
      throw new BadRequestException('Error on proccess your query, please check your parameters');
    });
  }

  async findOne(id: string) {
    const property = await this.prisma.property.findFirst({ where: { id: id } });

    if (!property) throw new BadRequestException('Property not found');

    return property;
  }

  async update(id: string, updateDto: UpdatePropertyDto) {
    const property = await this.prisma.property.findFirst({ where: { id: id } });

    if (!property) throw new BadRequestException('Property not found');

    if (property.zipcode !== updateDto.zipcode) {
      const zipcodeData = await CepPromise(updateDto.zipcode);

      updateDto.city = zipcodeData.city;
      updateDto.state = zipcodeData.state;
      updateDto.ibgeCode = await getIbgeCode(zipcodeData.state, zipcodeData.city);
    }

    await this.prisma.property.update({ where: { id: id }, data: updateDto }).catch(() => {
      throw new BadRequestException('Error on update property');
    });
  }

  async delete(id: string) {
    await this.prisma.property.delete({ where: { id: id } }).catch(() => {
      throw new BadRequestException('Error on delete property');
    });
  }
}
