import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { EnvironmentService } from './../../../@hades/shared/domain/environment/environment.service'
import { EnvironmentModule } from './../../shared/modules/environment.module';

@Module({
    imports: [        
        TypeOrmModule.forRootAsync({
            imports: [EnvironmentModule],
            useFactory: async (environmentService: EnvironmentService) => ({
                'type': 'mysql' as 'mysql',
                'host': environmentService.get<string>('DATABASE_HOST'),
                'extra': {
                    'socketPath': environmentService.get<string>('DATABASE_SOCKET')
                },
                'port': environmentService.get<number>('DATABASE_PORT'),
                'username': environmentService.get<string>('DATABASE_USER'),
                'password': environmentService.get<string>('DATABASE_PASSWORD'),
                'database': environmentService.get<string>('DATABASE_SCHEMA'),
                'entities': [__dirname + '../../../../**/*.schema{.ts,.js}'],
                'namingStrategy': new CustomNamingStrategy(),
                'migrationsTableName': 'admin_migration',

                // Synchronize database 
                'synchronize': environmentService.get<boolean>('DATABASE_SYNCHRONIZE'),

                // Allow both start:prod and start:dev to use migrations
                // __dirname is either dist or src folder, meaning either
                // the compiled js in prod or the ts in dev.
            //    'migrations': [__dirname + '/migrations/**/*{.ts,.js}'],
            //    'cli': {
                    // Location of migration should be inside src folder
                    // to be compiled into dist/ folder.
            //        'migrationsDir': 'src/migrations'
            //    }
            }),
            inject: [EnvironmentService]
        })
    ],
    exports: [
        TypeOrmModule
    ]
})
export class TypeOrmConfigModule {}

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface 
{
    tableName(targetName: string, userSpecifiedName: string): string 
    {
        return userSpecifiedName;
    }

    columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string 
    {
        // to create database set rules for column naming
        return customName ? customName : propertyName;
    }

    columnNameCustomized(customName: string): string 
    {
        return customName;
    }

    relationName(propertyName: string): string 
    {
        return propertyName;
    }
}

