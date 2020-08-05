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
                tenantId: '8b7b887a-467e-40dc-88f5-9324cb9b1137',
                executionId: '03628647-8dc4-4ea4-b41a-4b9a672413f3',
                tenantCode: 'fwp871oijd33mgz7nydjbtmrs512ud282ifz4kmwj948min5z5',
                payload: { "foo" : "bar" },
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
                
                tenantId: '8b7b887a-467e-40dc-88f5-9324cb9b1137',
                executionId: '03628647-8dc4-4ea4-b41a-4b9a672413f3',
                tenantCode: 'xnyfvsipxmtfq9qgfgzq4qa3lzvr5uvh85wq8fcayqamsn705z',
                payload: { "foo" : "bar" },
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
                id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d',
                tenantId: null,
                executionId: '03628647-8dc4-4ea4-b41a-4b9a672413f3',
                tenantCode: '4bz4s8h6fgmcf3kow8cj9hl1fuhsp0bwbfuyfccxosxt9srn9g',
                payload: { "foo" : "bar" },
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
                id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d',
                
                executionId: '03628647-8dc4-4ea4-b41a-4b9a672413f3',
                tenantCode: 'iibne56eslztj1jpuhzp4yylcq5yzye9jlyd9bi7dedftqv9ms',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d',
                tenantId: '8b7b887a-467e-40dc-88f5-9324cb9b1137',
                executionId: null,
                tenantCode: 'dsda3exwxddkkgdfhnzpefkzu8bxfso7vk6k6jsi38dvpkkhag',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d',
                tenantId: '8b7b887a-467e-40dc-88f5-9324cb9b1137',
                
                tenantCode: 'oz21ivponiil65khv1dbmrm7uonyx2ba717nhb4rrlrm0bjap4',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d',
                tenantId: '8b7b887a-467e-40dc-88f5-9324cb9b1137',
                executionId: '03628647-8dc4-4ea4-b41a-4b9a672413f3',
                tenantCode: null,
                payload: { "foo" : "bar" },
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
                id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d',
                tenantId: '8b7b887a-467e-40dc-88f5-9324cb9b1137',
                executionId: '03628647-8dc4-4ea4-b41a-4b9a672413f3',
                
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakePayload property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d',
                tenantId: '8b7b887a-467e-40dc-88f5-9324cb9b1137',
                executionId: '03628647-8dc4-4ea4-b41a-4b9a672413f3',
                tenantCode: 'x7g0izsye6d2jxbtcemaae0isfq2isg3cx6u3ewlqupifdnjrz',
                payload: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakePayload must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakePayload property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d',
                tenantId: '8b7b887a-467e-40dc-88f5-9324cb9b1137',
                executionId: '03628647-8dc4-4ea4-b41a-4b9a672413f3',
                tenantCode: 'ecefx0zkpu5vc4ojpw523fcg8utbngak2a0qf67j2d3rewgi60',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakePayload must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: '1ti9of6zgyzy1e09ywlv6vnmhko4yxyw4ycb2',
                tenantId: '8b7b887a-467e-40dc-88f5-9324cb9b1137',
                executionId: '03628647-8dc4-4ea4-b41a-4b9a672413f3',
                tenantCode: 'yng1t4x9hfozs5qjwbw4tg6l12mnbgnv1aj30svfhx5q96dta7',
                payload: { "foo" : "bar" },
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
                id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d',
                tenantId: '242fdhrcys4zme9c8ftn0mlqm9luzxvwm4qvr',
                executionId: '03628647-8dc4-4ea4-b41a-4b9a672413f3',
                tenantCode: '6ncmya4q3yz407gv2u8z22knot6k0jjezuvvv4cuw3zkcyo62z',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d',
                tenantId: '8b7b887a-467e-40dc-88f5-9324cb9b1137',
                executionId: '9reraocunzg3huxbz8r2s0tzdarn640nhw5k1',
                tenantCode: 'z4eh64ki3eqqswc4iwif31kx8d89uecsdv2rkdvas1gg22dqyo',
                payload: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/data-lake - Got 400 Conflict, DataLakeTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d',
                tenantId: '8b7b887a-467e-40dc-88f5-9324cb9b1137',
                executionId: '03628647-8dc4-4ea4-b41a-4b9a672413f3',
                tenantCode: 'o922gk0o652pwq48kdc002dlqohp4gw0wwtg9lgfavohllhru0o',
                payload: { "foo" : "bar" },
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
                id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d',
                tenantId: '8b7b887a-467e-40dc-88f5-9324cb9b1137',
                executionId: '03628647-8dc4-4ea4-b41a-4b9a672413f3',
                tenantCode: 'r8l1546y05zzw7np8ocybb974cgytxuteg0ysq0ebf11inz4ru',
                payload: { "foo" : "bar" },
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
                        value   : 'bb7acb00-4ae0-470d-a338-8661bab6a283'
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
                        value   : 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d'));
    });

    test(`/REST:GET bplus-it-sappi/data-lake/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lake/550cecba-b286-4391-8cd5-80b456bc635b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/data-lake/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/data-lake/b0007a8c-9ed4-43a3-8d69-5d14734ddf7d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d'));
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
                
                id: '0f6dad7a-681a-4d94-9b37-e40cda1d9625',
                tenantId: 'ee71c677-2bc7-4f4f-b192-157da1821902',
                executionId: '2552332e-fc45-4927-802c-78d2b7f3fc68',
                tenantCode: '8h1kabsxmggjhw5gbd3pjl8392b0zuoftcey8m5plpb5sh2p1m',
                payload: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/data-lake`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/data-lake')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d',
                tenantId: '8b7b887a-467e-40dc-88f5-9324cb9b1137',
                executionId: '03628647-8dc4-4ea4-b41a-4b9a672413f3',
                tenantCode: 'dj0n004cccoi0gni0wyaaidbp8qnyzspbq4h17dast9ve75u20',
                payload: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d'));
    });

    test(`/REST:DELETE bplus-it-sappi/data-lake/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/data-lake/d8351e35-0f70-469e-8dc4-a74f17d5671d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/data-lake/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/data-lake/b0007a8c-9ed4-43a3-8d69-5d14734ddf7d')
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
                            executionId
                            tenantCode
                            payload
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
                            executionId
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '1e9e355b-c819-4870-bf3c-3ee3412ee663',
                        tenantId: '8b7b887a-467e-40dc-88f5-9324cb9b1137',
                        executionId: '03628647-8dc4-4ea4-b41a-4b9a672413f3',
                        tenantCode: 'gja3fzgaxyrruip8pdphzxxiqs2afr4gigpbw1385zk5iw815p',
                        payload: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateDataLake).toHaveProperty('id', '1e9e355b-c819-4870-bf3c-3ee3412ee663');
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
                            executionId
                            tenantCode
                            payload
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
                            value   : '6db86460-2bcb-4f6c-a3e2-6e7fd080ed3e'
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
                            executionId
                            tenantCode
                            payload
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
                            value   : 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindDataLake.id).toStrictEqual('b0007a8c-9ed4-43a3-8d69-5d14734ddf7d');
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
                            executionId
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c5c22db4-baa9-4f69-b708-69d005d7ee9c'
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
                            executionId
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindDataLakeById.id).toStrictEqual('b0007a8c-9ed4-43a3-8d69-5d14734ddf7d');
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
                            executionId
                            tenantCode
                            payload
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
                            executionId
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '131a9a45-b0e8-4cea-833b-04c3119efe73',
                        tenantId: '7b4ca910-b42d-4624-baf3-c87440ca68aa',
                        executionId: '6ca2f684-67ab-4847-83fa-0a830b7b6b34',
                        tenantCode: 'pn19i36oduq0vgxj3m3d239j3h9clpuutfpnxfnr7txtqyx3ko',
                        payload: { "foo" : "bar" },
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
                            executionId
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d',
                        tenantId: '8b7b887a-467e-40dc-88f5-9324cb9b1137',
                        executionId: '03628647-8dc4-4ea4-b41a-4b9a672413f3',
                        tenantCode: 'i88v5wz6e5how2ikh39r2e02z8yyh8djofz3c4qc0jlfrgeqdv',
                        payload: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateDataLake.id).toStrictEqual('b0007a8c-9ed4-43a3-8d69-5d14734ddf7d');
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
                            executionId
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '64eec954-e322-43a9-a00f-db9e6785930f'
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
                            executionId
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteDataLakeById.id).toStrictEqual('b0007a8c-9ed4-43a3-8d69-5d14734ddf7d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});