import { Module } from '@nestjs/common';
import { CoreModule } from './apps/core/core.module';
import { OAuthModule } from './apps/o-auth/o-auth.module';
import { AdminModule } from './apps/admin/admin.module';
import { BplusItSappiModule } from './apps/bplus-it-sappi/bplus-it-sappi.module';

@Module({
    imports: [
        CoreModule,
        OAuthModule,
        AdminModule,
        BplusItSappiModule
    ]
})
export class AppModule {}
