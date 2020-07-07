import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Any } from './scalars/any.scalar';
import { Json } from './scalars/json.scalar';
import { Upload } from './scalars/upload.scalar';
import { join } from 'path';

@Module({
    imports: [        
        GraphQLModule.forRoot({
            context: ({ req }) => ({ req }),
            debug: true,
            playground: true,
            typePaths: ['./**/*.graphql'],
            resolvers: { 
                JSON: GraphQLJSON // define JSON Scalar type
            },
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts')
            },
            uploads: {
                maxFileSize: 100000000, // 100 MB
                maxFiles: 5,
            }
        })
    ],
    providers: [
        Any,
        Upload,
        Json
    ],
    exports: [
        GraphQLModule
    ]
})
export class GraphQLConfigModule {}
