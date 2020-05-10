import { Module } from '@nestjs/common';
import { SharedModule } from './../shared/shared.module';
import { TypeOrmConfigModule } from './modules/typeorm-config.module';

@Module({
    imports: [
        SharedModule,
        TypeOrmConfigModule
    ],
})
export class CoreModule {};