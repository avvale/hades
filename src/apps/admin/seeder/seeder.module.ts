import { Module } from '@nestjs/common';
import { SharedModule } from 'src/apps/shared/shared.module';
import { SequelizeConfigModule } from 'src/apps/core/modules/sequelize/sequelize-config.module';
import { IamModule } from 'src/apps/iam/iam.module';
import { AdminModule } from 'src/apps/admin/admin.module';

@Module({
    imports: [
        SharedModule,
        SequelizeConfigModule,
        IamModule,
        AdminModule
    ]
})
export class SeederModule {}