import { BadRequestException, Injectable } from '@nestjs/common';
import { Cultive, CultiveSamples } from '@prisma/client';
import { PrismaService } from '@src/providers/prisma/prisma.service';

@Injectable()
export class ProductivityService {
  constructor(private readonly prisma: PrismaService) {}

  async setProductivity(cultiveId: string) {
    // const cultive = await this.prisma.cultive.findUnique({ where: { id: cultiveId }, include: { samples: true } });

    // if (!cultive || cultive.samples.length !== 3) throw new BadRequestException(`Cultive not found or don't have all samples`);

    // const seedsTotal = this.countTotalSeeds(cultive.samples);

    // const seedsAverage = seedsTotal / 6; // 6 = number of plaints;

    // const numberOfPlaintsPerHectares = this.plaintPerHectares(cultive);

    // const weightPerGrain = 150; // will be used fixed value for grains = 150g

    // const bagsPerHectares = this.calculateProductivity(numberOfPlaintsPerHectares, weightPerGrain, seedsAverage);

    // const tonPerHectares = (bagsPerHectares * 60) / 1000;

    await this.prisma.cultive.update({
      where: { id: cultiveId },
      // data: { expectedProduction: tonPerHectares, expectedBagsPerHectares: bagsPerHectares },
      data: {expectedProduction: 0},
    });
  }

  /*
    A quantidade de sacos por hectare é definida pela fórmula:

    Plantas/hectare (mil/ha) multiplicado por vagens/planta multiplicado grãos/vagem multiplicado por peso de mil grãos, tudo isso dividido por 60000.

    Exemplo com valores arredondados:

    (134 *18 * 3,4 * 150)/60000

    Resultado: 20,5 sacos/hectare
  */
  private calculateProductivity(numberOfPlaintsPerHectares: number, weightPerGrain: number, seedsAverage: number) {
    const bagsPerHecatares = (numberOfPlaintsPerHectares * seedsAverage * weightPerGrain) / 60000;

    return bagsPerHecatares;
  }

  /*
    Para descobrir o número de plantas por área você vai contar a quantidade de plantas por metro linear, dividir pelo espaçamento utilizado entre as fileiras e multiplicar por 10, assim o resultado será contado em milhares.

    Ex: Você tem 8 plantas por metro linear, o espaçamento entre as fileiras é 60cm. Logo, você vai dividir 8/0,6 (convertendo centímetro para metro) e multiplicar o resultado dessa divisão por 10. Totalizando 133,33 (aí então adicione as casas decimais corretas, totalizando milhares). ???

    Resultado: 133,33 mil plantas por hectare.   
  */
  private plaintPerHectares(cultive: Cultive) {
    const numberOfPlaintsPerMillis = (cultive.plantsPerMeter / cultive.metersBetweenPlants) * 10;

    return numberOfPlaintsPerMillis;
  }

  private countTotalSeeds(samples: CultiveSamples[]) {
    let total = 0;

    samples.forEach((sample) => {
      total = total + sample.podsPlantA;
      total = total + sample.podsPlantB;
    });

    return total;
  }

  async getAllProcutionAvarege(cultiveId: string) {
    const cultive = await this.prisma.cultive.findUnique({ where: { id: cultiveId }, select: { property: { select: { state: true } } } });

    if (!cultive) throw new BadRequestException(`Cultive not found`);

    const allCultives = await this.prisma.cultive
      .findMany({
        where: { property: { state: cultive.property.state } },
        select: { expectedProduction: true },
      })
      .then((res) => res.map((cultive) => cultive.expectedProduction));

    const productionAvarege = allCultives.reduce((prev, curr) => prev + curr) / allCultives.length;

    return productionAvarege;
  }
}
