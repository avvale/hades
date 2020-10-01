import { Module } from '@nestjs/common';
import { CoreModule } from './apps/core/core.module';
import { CciModule } from './apps/cci/cci.module';
import { IamModule } from './apps/iam/iam.module';
import { OAuthModule } from './apps/o-auth/o-auth.module';

@Module({
        CoreModule,
        AdminModule,
        CciModule,
        IamModule,
        OAuthModule,
    ]
})
export class AppModule {}
