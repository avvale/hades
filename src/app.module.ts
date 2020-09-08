import { Module } from '@nestjs/common';

import { CoreModule } from './apps/core/core.module';
import { OAuthModule } from './apps/oauth/oauth.module';
import { AdminModule } from './apps/admin/admin.module';

@Module({
    imports: [
        CoreModule,
        OAuthModule,
        AdminModule
    ]
})
export class AppModule {}
