import { Module } from '@nestjs/common';
import { CoreModule } from './apps/core/core.module';
import { AdminModule } from './apps/admin/admin.module';

@Module({
    imports: [
        CoreModule,
        AdminModule,
    ]
})
export class AppModule {}
