import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IDataLakeRepository } from '@hades/bplus-it-sappi/data-lake/domain/data-lake.repository';
import { MockDataLakeRepository } from '@hades/bplus-it-sappi/data-lake/infrastructure/mock/mock-data-lake.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('data-lake', () => 
{
    let app: INestApplication;
    let repository: MockDataLakeRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    BplusItSappiModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IDataLakeRepository)
            .useClass(MockDataLakeRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockDataLakeRepository>module.get<IDataLakeRepository>(IDataLakeRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/data-lake - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '4c064f13-40b4-48d4-8e06-a7a2dad70cb1',
                tenantCode: 'k6hv6u2iy04dy00qst5vi27cmsb7r47963ttvmqzvihu0kx205',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '4c064f13-40b4-48d4-8e06-a7a2dad70cb1',
                tenantCode: 'rgvc5uzygmthglygguydutmlecu7g5pbtazb5bx60m4umanrm5',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194',
                tenantId: null,
                tenantCode: 'yhv6jxauahkgda87v50wckqzk9wmh29ois0o50efrs6teeqnvs',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194',
                
                tenantCode: 'ny608mus3dl6pi3d0548ff49qn3arjoysteilub46m35o9snhi',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194',
                tenantId: '4c064f13-40b4-48d4-8e06-a7a2dad70cb1',
                tenantCode: null,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194',
                tenantId: '4c064f13-40b4-48d4-8e06-a7a2dad70cb1',
                
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeData property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194',
                tenantId: '4c064f13-40b4-48d4-8e06-a7a2dad70cb1',
                tenantCode: 'xmhhn03kcn4dnse6dfocaqwdygexrsmmuvu5m32sjcyuzyp4z4',
                data: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeData must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeData property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194',
                tenantId: '4c064f13-40b4-48d4-8e06-a7a2dad70cb1',
                tenantCode: 'mzie149254gmiiiocvmz0f3hersnutcna9vsu0npx6naf6m0g3',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeData must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'm8wwx5sorz8d5gmeoug96kvncqrc1m4241j4f',
                tenantId: '4c064f13-40b4-48d4-8e06-a7a2dad70cb1',
                tenantCode: '3nig5rm157kmkfz3w89gdv0bo6w7spttlf4j2tmqxxbcfgcnhk',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194',
                tenantId: 'vnkyyxyxk2ko4w3pl7izoxduwxeu0sfur83a8',
                tenantCode: 'jt5onodond8p9bt65iu8yfy52e5rc0hbqkrzsjbyw6z0kcxox7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194',
                tenantId: '4c064f13-40b4-48d4-8e06-a7a2dad70cb1',
                tenantCode: 'vfmijmesszyddjtmztjjsmkvxgfnaji6rkyu4qidmvmxzydrahu',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantCode is too large, has a maximum length of 50');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/data-lake`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194',
                tenantId: '4c064f13-40b4-48d4-8e06-a7a2dad70cb1',
                tenantCode: 'ls2w0b1mpogj4ed053io8rxp6ajou90vxmeqb483n32eha2pg4',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/data-lakes/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lakes/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    test(`/REST:GET bplus-it-sappi/data-lake - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/data-lake`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194'));
    });

    test(`/REST:GET bplus-it-sappi/data-lake/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lake/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/data-lake/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lake/9f06ed7e-4a33-44c9-b8e4-9e48f1f62194')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194'));
    });

    test(`/REST:GET bplus-it-sappi/data-lakes`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lakes')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/data-lake - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                
                id: '90f1edae-98ca-4260-88ec-cec301045322',
                tenantId: '611872a0-8bd7-476b-a1cf-7d1f0b81d4db',
                tenantCode: 'tjvbqjkjk8ua7k7lfw99lderdpkfnt5ge1seyi2x4y4w63isg3',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/data-lake`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                
                id: '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194',
                tenantId: '4c064f13-40b4-48d4-8e06-a7a2dad70cb1',
                tenantCode: 'rvrjly7ns0q982xjf71en46c7rvji4rw0nguv0s75mprb9qkcd',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194'));
    });

    test(`/REST:DELETE bplus-it-sappi/data-lake/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/data-lake/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/data-lake/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/data-lake/9f06ed7e-4a33-44c9-b8e4-9e48f1f62194')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateDataLake - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateDataLakeInput!)
                    {
                        bplusItSappiCreateDataLake (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL bplusItSappiCreateDataLake`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateDataLakeInput!)
                    {
                        bplusItSappiCreateDataLake (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '3dd2e6f5-459a-474c-bc6d-e31ef8768c9b',
                        tenantId: '4c064f13-40b4-48d4-8e06-a7a2dad70cb1',
                        tenantCode: 'fvl82l4o6bcp4x45h56s7kfpy6vszvyg5swbmxjwpi8wax8wje',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateDataLake).toHaveProperty('id', '3dd2e6f5-459a-474c-bc6d-e31ef8768c9b');
            });
    });

    test(`/GraphQL bplusItSappiPaginateDataLakes`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateDataLakes (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiPaginateDataLakes.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateDataLakes.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateDataLakes.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindDataLake - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindDataLake (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '00000000-0000-0000-0000-000000000000'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindDataLake`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindDataLake (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindDataLake.id).toStrictEqual('9f06ed7e-4a33-44c9-b8e4-9e48f1f62194');
            });
    });

    test(`/GraphQL bplusItSappiFindDataLakeById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindDataLakeById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindDataLakeById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindDataLakeById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindDataLakeById.id).toStrictEqual('9f06ed7e-4a33-44c9-b8e4-9e48f1f62194');
            });
    });

    test(`/GraphQL bplusItSappiGetDataLakes`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetDataLakes (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetDataLakes.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateDataLake - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateDataLakeInput!)
                    {
                        bplusItSappiUpdateDataLake (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6faa2354-2638-45f5-b425-39362a351c2f',
                        tenantId: 'a97fb37a-2bf1-4076-a802-3b789add47a8',
                        tenantCode: 'jsvh8eqko7rz3r4bc2esxnqor7wxq969trq4r5qrl41m7mg1kx',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiUpdateDataLake`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateDataLakeInput!)
                    {
                        bplusItSappiUpdateDataLake (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194',
                        tenantId: '4c064f13-40b4-48d4-8e06-a7a2dad70cb1',
                        tenantCode: '7updwao1jph0v2uej8suju9g6h39ldw1gjhlgw4u8mcc8bbqcm',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateDataLake.id).toStrictEqual('9f06ed7e-4a33-44c9-b8e4-9e48f1f62194');
            });
    });

    test(`/GraphQL bplusItSappiDeleteDataLakeById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteDataLakeById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteDataLakeById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteDataLakeById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9f06ed7e-4a33-44c9-b8e4-9e48f1f62194'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteDataLakeById.id).toStrictEqual('9f06ed7e-4a33-44c9-b8e4-9e48f1f62194');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});