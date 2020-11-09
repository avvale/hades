import { Module } from '@nestjs/common';
import { CoreModule } from './apps/core/core.module';
import { AdminModule } from './apps/admin/admin.module';
import { OAuthModule } from './apps/o-auth/o-auth.module';

@Module({
    imports: [
        CoreModule,
        AdminModule,
        OAuthModule,
    ]
})
export class AppModule {}
