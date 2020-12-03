import { Module } from '@nestjs/common';
import { CoreModule } from './apps/core/core.module';
import { OrigenModule } from './apps/origen/origen.module';

@Module({
    imports: [
        CoreModule,
        OrigenModule
    ]
})
export class AppModule {}
