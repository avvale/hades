import { Module } from '@nestjs/common';
import { LangPostController } from './controllers/lang/lang-post.controller';
import { LangGetController } from './controllers/lang/lang-get.controller';
import { AdminHandlers, AdminServices, AdminEntities, AdminRepositories, AdminSagas } from '../../@hades/admin';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        SharedModule,
        TypeOrmModule.forFeature([
            ...AdminEntities
        ])
    ],
    controllers: [
        LangPostController,
        LangGetController
    ],
    providers: [
        ...AdminHandlers,
        ...AdminServices,
        ...AdminRepositories,
        ...AdminSagas
    ]
})
export class AdminModule {}
