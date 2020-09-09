import { Module } from '@nestjs/common';
import { SharedModule } from 'src/apps/shared/shared.module';
import { SequelizeConfigModule } from 'src/apps/core/modules/sequelize/sequelize-config.module';
import { OAuthModule } from 'src/apps/o-auth/o-auth.module';

@Module({
    imports: [
        SharedModule,
        SequelizeConfigModule,
        OAuthModule
    ]
})
export class SeederModule {}