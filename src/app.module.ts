import { Module } from '@nestjs/common';
import { CoreModule } from './apps/core/core.module';
import { CciModule } from './apps/cci/cci.module';

@Module({
    imports: [
        CoreModule,
        CciModule,
    ]
})
export class AppModule {}
