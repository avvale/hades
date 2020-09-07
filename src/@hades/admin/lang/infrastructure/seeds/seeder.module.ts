import { Module } from '@nestjs/common';

import { AdminModule } from 'src/apps/admin/admin.module';

import { SharedModule } from 'src/apps/shared/shared.module';
import { SequelizeConfigModule } from 'src/apps/core/modules/sequelize/sequelize-config.module';

@Module({
    imports: [
        SharedModule,
        SequelizeConfigModule,
        AdminModule
    ]
})
export class SeederModule {}