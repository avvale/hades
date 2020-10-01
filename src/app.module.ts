import { Module } from '@nestjs/common';
import { CoreModule } from './apps/core/core.module';
import { CciModule } from './apps/cci/cci.module';
@Module({
        CoreModule,
        AdminModule,
        CciModule
    ]
})
export class AppModule {}
