import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISystemRepository } from '@hades/bplus-it-sappi/system/domain/system.repository';
import { MockSystemRepository } from '@hades/bplus-it-sappi/system/infrastructure/mock/mock-system.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('system', () => 
{
    let app: INestApplication;
    let repository: MockSystemRepository;
    
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
            .overrideProvider(ISystemRepository)
            .useClass(MockSystemRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockSystemRepository>module.get<ISystemRepository>(ISystemRepository);

        await app.init();
    });

    it(`/REST:POST bplus-it-sappi/system - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: '7',
                tenantCode: '7',
                environment: 'b',
                version: 'v',
                isActive: false,
                cancelledAt: '2020-07-17 06:47:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: 'b',
                tenantCode: '2',
                environment: 'z',
                version: 'z',
                isActive: true,
                cancelledAt: '2020-07-17 05:20:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: null,
                name: 'j',
                tenantCode: 'q',
                environment: '7',
                version: 'a',
                isActive: false,
                cancelledAt: '2020-07-16 22:45:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                
                name: 'p',
                tenantCode: 'g',
                environment: 'd',
                version: 'f',
                isActive: false,
                cancelledAt: '2020-07-17 00:45:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: null,
                tenantCode: 'u',
                environment: 'r',
                version: 'g',
                isActive: false,
                cancelledAt: '2020-07-16 20:43:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                
                tenantCode: '3',
                environment: '4',
                version: 'k',
                isActive: true,
                cancelledAt: '2020-07-17 07:11:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: 'p',
                tenantCode: null,
                environment: 's',
                version: '7',
                isActive: false,
                cancelledAt: '2020-07-17 12:41:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: '3',
                
                environment: '2',
                version: 'l',
                isActive: false,
                cancelledAt: '2020-07-16 22:09:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: 'k',
                tenantCode: 'h',
                environment: null,
                version: 'y',
                isActive: false,
                cancelledAt: '2020-07-17 06:16:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: '5',
                tenantCode: 'f',
                
                version: 'p',
                isActive: true,
                cancelledAt: '2020-07-17 11:31:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: '7',
                tenantCode: '8',
                environment: 'n',
                version: null,
                isActive: true,
                cancelledAt: '2020-07-16 17:29:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: '7',
                tenantCode: '2',
                environment: 'a',
                
                isActive: true,
                cancelledAt: '2020-07-17 11:53:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: 'j',
                tenantCode: '1',
                environment: '1',
                version: 'j',
                isActive: null,
                cancelledAt: '2020-07-17 10:17:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: 'k',
                tenantCode: '5',
                environment: '0',
                version: 'x',
                
                cancelledAt: '2020-07-17 01:27:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '44bx1jup4por67wzuhe7fodabe95yvwme819w',
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: 'j',
                tenantCode: 'o',
                environment: 'b',
                version: 'p',
                isActive: false,
                cancelledAt: '2020-07-16 18:14:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: 'qx9z5h92rxsuy4fxs6xav3k57fwrkh54oc6n7',
                name: 's',
                tenantCode: 'e',
                environment: 'm',
                version: 'y',
                isActive: false,
                cancelledAt: '2020-07-17 01:11:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId is not allowed, must be a length of 36');
            });
    });
    

    

    

    
    
    

    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: 'm',
                tenantCode: 'x',
                environment: 'i',
                version: 'u',
                isActive: 'true',
                cancelledAt: '2020-07-16 19:51:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive has to be a boolean value');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemCancelledAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: 'f',
                tenantCode: '1',
                environment: 'c',
                version: 'y',
                isActive: true,
                cancelledAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemCancelledAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: 'm',
                tenantCode: '4',
                environment: 'm',
                version: 'c',
                isActive: true,
                cancelledAt: '2020-07-17 06:44:34',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/systems/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/systems/paginate')
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

    it(`/REST:GET bplus-it-sappi/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system')
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

    it(`/REST:GET bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '03f356e6-952c-40df-86ab-5b42cfedd85c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '03f356e6-952c-40df-86ab-5b42cfedd85c'));
    });

    it(`/REST:GET bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/03f356e6-952c-40df-86ab-5b42cfedd85c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '03f356e6-952c-40df-86ab-5b42cfedd85c'));
    });

    it(`/REST:GET bplus-it-sappi/systems`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/systems')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '2f1a05d4-ba77-4258-bc48-8ae1447750fd',
                tenantId: 'b95616ab-8980-4f6a-a4ae-0db80822a5d1',
                name: '1',
                tenantCode: 'n',
                environment: 'k',
                version: 'g',
                isActive: true,
                cancelledAt: '2020-07-17 15:36:55',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                name: 'k',
                tenantCode: 'y',
                environment: '8',
                version: '7',
                isActive: false,
                cancelledAt: '2020-07-17 10:40:24',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '03f356e6-952c-40df-86ab-5b42cfedd85c'));
    });

    it(`/REST:DELETE bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/03f356e6-952c-40df-86ab-5b42cfedd85c')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateSystem - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateSystemInput!)
                    {
                        bplusItSappiCreateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
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

    it(`/GraphQL bplusItSappiCreateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateSystemInput!)
                    {
                        bplusItSappiCreateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '37d7d897-5140-465a-a720-1f99a4d3124f',
                        tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                        name: '3',
                        tenantCode: '7',
                        environment: 'f',
                        version: '1',
                        isActive: true,
                        cancelledAt: '2020-07-16 22:52:40',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', '37d7d897-5140-465a-a720-1f99a4d3124f');
            });
    });

    it(`/GraphQL bplusItSappiPaginateSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateSystems (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateSystems.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateSystems.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateSystems.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL bplusItSappiFindSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindSystem (query:$query)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
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

    it(`/GraphQL bplusItSappiFindSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindSystem (query:$query)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
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
                            value   : '03f356e6-952c-40df-86ab-5b42cfedd85c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('03f356e6-952c-40df-86ab-5b42cfedd85c');
            });
    });

    it(`/GraphQL bplusItSappiFindSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindSystemById (id:$id)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
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

    it(`/GraphQL bplusItSappiFindSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindSystemById (id:$id)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '03f356e6-952c-40df-86ab-5b42cfedd85c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('03f356e6-952c-40df-86ab-5b42cfedd85c');
            });
    });

    it(`/GraphQL bplusItSappiGetSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetSystems (query:$query)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetSystems.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL bplusItSappiUpdateSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateSystemInput!)
                    {
                        bplusItSappiUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c82e2fe9-dd96-47d1-91c3-1d184a24e908',
                        tenantId: 'e00ffd2c-a75e-4fd2-9100-e1f6a309f363',
                        name: 'd',
                        tenantCode: 'k',
                        environment: '9',
                        version: 'p',
                        isActive: true,
                        cancelledAt: '2020-07-17 11:26:39',
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

    it(`/GraphQL bplusItSappiUpdateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateSystemInput!)
                    {
                        bplusItSappiUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '03f356e6-952c-40df-86ab-5b42cfedd85c',
                        tenantId: 'b33dc6c1-903e-480f-9e30-46e53cb9041e',
                        name: 'g',
                        tenantCode: 'd',
                        environment: 'q',
                        version: '4',
                        isActive: false,
                        cancelledAt: '2020-07-17 15:38:51',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('03f356e6-952c-40df-86ab-5b42cfedd85c');
            });
    });

    it(`/GraphQL bplusItSappiDeleteSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteSystemById (id:$id)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
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

    it(`/GraphQL bplusItSappiDeleteSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteSystemById (id:$id)
                        {   
                            id
                            tenantId
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '03f356e6-952c-40df-86ab-5b42cfedd85c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('03f356e6-952c-40df-86ab-5b42cfedd85c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});