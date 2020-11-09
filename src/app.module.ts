import { Module } from '@nestjs/common';
import { CoreModule } from './apps/core/core.module';
import { IamModule } from './apps/iam/iam.module';

@Module({
    imports: [
        CoreModule,
        IamModule,
    ]
})
export class AppModule {}
