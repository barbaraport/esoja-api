import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/providers/prisma/prisma.service';
import { QuerybuilderService } from '@src/providers/prisma/querybuilder/querybuilder.service';
import axios from 'axios';
import { ProductivityService } from '../cultive/productivity/productivity.service';
import { CreateSampleDto } from './dto/create-sample.dto';

@Injectable()
export class SampleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly qb: QuerybuilderService,
    private readonly productivityService: ProductivityService,
  ) {}

  private async getPodsFoundForImage(base64Image: string) {
    const response = await axios.post("http://localhost:5000/countPods", JSON.stringify({base64Image: base64Image}));

    const responseData = response.data as {podsFound: number};

    const podsFound = responseData['podsFound'];

    return podsFound;
  }

  async create(createDto: CreateSampleDto) {
    console.log('oi 1');
    const cultive = await this.prisma.cultive.findUnique({ where: { id: createDto.cultiveId }, include: { samples: true } });

    console.log('oi 2');
    if (!cultive) throw new BadRequestException('Cultive not found');


    // console.log('oi 3');
    // if (!cultive.metersBetweenPlants || !cultive.plantsPerMeter)
    //   throw new BadRequestException(`Sample information don't exists yet, please do this first`);

    console.log('oi 4');
    if (cultive.samples.length) throw new BadRequestException('This cultive already has 3 samples');
    const samplesData = createDto['samples'];

    for (let i = 0; i < samplesData.length; i++) {
      const sampleData = samplesData[i];

      const podsFoundA = await this.getPodsFoundForImage(sampleData['photoPlantA']);
      const podsFoundB = await this.getPodsFoundForImage(sampleData['photoPlantB']);

      sampleData['podsPlantA'] = podsFoundA;
      sampleData['podsPlantB'] = podsFoundB;
    }

    const samples = await this.prisma.cultiveSamples.createMany({data: [...createDto['samples'] as any]});

    await this.productivityService.setProductivity(cultive.id);

    return samples;
  }

  async findAll() {
    const query = await this.qb.query('cultiveSamples');

    return this.prisma.cultiveSamples.findMany(query).catch(() => {
      throw new BadRequestException('Error on proccess your query, please check your parameters');
    });
  }

  async findOne(id: string) {
    const sample = await this.prisma.cultiveSamples.findUnique({ where: { id: id } });

    if (!sample) throw new BadRequestException('Sample not found');

    return sample;
  }

  // async update(id: string, updateDto: UpdateSampleDto) {
  //   const sample = await this.prisma.cultiveSamples.findUnique({ where: { id: id } });

  //   if (!sample) throw new BadRequestException('Sample not found');

  //   await this.prisma.cultiveSamples.update({ where: { id: id }, data: updateDto });
  // }
}
