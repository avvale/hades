import { Module } from '@nestjs/common';

import { CoreModule } from './apps/core/core.module';
import { AdminModule } from './apps/admin/admin.module';
import { BplusItSappiModule } from './apps/bplus-it-sappi/bplus-it-sappi.module';

@Module({
    imports: [
        CoreModule,
        AdminModule,
        BplusItSappiModule
    ]
})
export class AppModule {}
