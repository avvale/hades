import { Module } from '@nestjs/common';
import { CoreModule } from './apps/core/core.module';
import { AdminModule } from './apps/admin/admin.module';
import { IamModule } from './apps/iam/iam.module';

@Module({
    imports: [
        CoreModule,
        AdminModule,
        IamModule,
    ]
})
export class AppModule {}
