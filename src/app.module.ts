import { Module } from '@nestjs/common';
import { CoreModule } from './apps/core/core.module';
import { CciModule } from './apps/cci/cci.module';
import { IamModule } from './apps/iam/iam.module';

@Module({
        CoreModule,
        AdminModule,
        CciModule,
        IamModule
    ]
})
export class AppModule {}
