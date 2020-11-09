import { Module } from '@nestjs/common';
import { SharedModule } from './../shared/shared.module';
import { SsrControllers } from './ssr';

@Module({
    imports: [
        SharedModule,
    ],
    controllers: [
        ...SsrControllers,
    ],
})
export class OrigenModule {}