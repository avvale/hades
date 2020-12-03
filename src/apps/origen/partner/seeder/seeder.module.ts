import { Module } from '@nestjs/common';
import { SharedModule } from 'src/apps/shared/shared.module';
import { SequelizeConfigModule } from 'src/apps/core/modules/sequelize/sequelize-config.module';
import { OrigenModule } from 'src/apps/origen/origen.module';

@Module({
    imports: [
        SharedModule,
        SequelizeConfigModule,
        OrigenModule
    ]
})
export class SeederModule {}