import { Module } from '@nestjs/common';
import { CoreModule } from './apps/core/core.module';
import { OAuthModule } from './apps/o-auth/o-auth.module';

@Module({
    imports: [
        CoreModule,
        OAuthModule,
    ]
})
export class AppModule {}
