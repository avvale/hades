import { Module } from '@nestjs/common';

import { CoreModule } from './apps/core/core.module';
import { OAuthModule } from './apps/oauth/oauth.module';

@Module({
    imports: [
        CoreModule,
        OAuthModule
    ]
})
export class AppModule {}
