import { Module } from '@nestjs/common';
import { SharedModule } from 'src/apps/shared/shared.module';
import { SequelizeConfigModule } from 'src/apps/core/modules/sequelize/sequelize-config.module';
import { AdminModule } from 'src/apps/admin/admin.module';
import { IamModule } from 'src/apps/iam/iam.module';
import { OrigenModule } from 'src/apps/origen/origen.module';

@Module({
    imports: [
        SharedModule,
        SequelizeConfigModule,
        AdminModule,
        IamModule,
        OrigenModule
    ]
})
export class SeederModule {}