import { Module } from '@nestjs/common';
import { CoreModule } from './apps/core/core.module';
import { AdminModule } from './apps/admin/admin.module';
import { OAuthModule } from './apps/o-auth/o-auth.module';
import { IamModule } from './apps/iam/iam.module';
import { OrigenModule } from './apps/origen/origen.module';

@Module({
    imports: [
        CoreModule,
        AdminModule,
        OAuthModule,
        IamModule,
        OrigenModule,
    ]
})
export class AppModule {}
