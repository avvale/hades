import { Module } from '@nestjs/common';

import { CoreModule } from './apps/core/core.module';

@Module({
    imports: [
        CoreModule
    ]
})
export class AppModule {}
