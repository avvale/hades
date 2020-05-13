import { Module } from '@nestjs/common';
import { SharedModule } from './../shared/shared.module';
import { TypeOrmConfigModule } from './modules/typeorm-config.module';
import { GraphQLConfigModule } from './modules/graphql/graphql-config.module';

@Module({
    imports: [
        SharedModule,
        GraphQLConfigModule,
        TypeOrmConfigModule
    ],
})
export class CoreModule {};