import { Module } from '@nestjs/common';
import { CoreModule } from './apps/core/core.module';
import { OAuthModule } from './apps/o-auth/o-auth.module';
import { AdminModule } from './apps/admin/admin.module';

@Module({
    imports: [
        CoreModule,
        OAuthModule,
        AdminModule
    ]
})
export class AppModule {}
