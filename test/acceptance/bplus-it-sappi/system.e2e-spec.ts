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

    test(`/REST:POST bplus-it-sappi/system - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: 'q2i0uzs902luecpi2d9u17ddgi68jt6yfzzoaknapa6hxqoh6q',
                version: 'l',
                name: '1',
                environment: '8',
                isActive: false,
                cancelledAt: '2020-07-27 14:21:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: '2squs43e5tppv35etbq4hujct5y4ne5n7nibdmkzmqeyv11lw7',
                version: 'r',
                name: 'u',
                environment: 'j',
                isActive: true,
                cancelledAt: '2020-07-27 12:41:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: null,
                tenantCode: '0u5fz98axz13efqikqtco7649pxhr6nwgc1kzwy9ahkwjly2jy',
                version: '7',
                name: 't',
                environment: 'h',
                isActive: true,
                cancelledAt: '2020-07-27 13:41:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                
                tenantCode: '8fl3lurufp6g7ywwnkn86ue90gaq1xhcok9o8dx1mb09p9mvv2',
                version: 'w',
                name: 'h',
                environment: '4',
                isActive: true,
                cancelledAt: '2020-07-27 03:17:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: null,
                version: 'g',
                name: 'k',
                environment: '3',
                isActive: true,
                cancelledAt: '2020-07-27 16:51:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                
                version: 'z',
                name: 'b',
                environment: '3',
                isActive: false,
                cancelledAt: '2020-07-27 19:39:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: '5zd7c9qf3mirqm2x15vwtrwyb63136dygqjxy61q91e8bvo7dd',
                version: null,
                name: 'm',
                environment: 'b',
                isActive: false,
                cancelledAt: '2020-07-27 18:52:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: '9ugtg7y8pfsmhge19r5fxjinlfctzn3l17ipv537s8jwizvxou',
                
                name: 'd',
                environment: 'k',
                isActive: true,
                cancelledAt: '2020-07-27 18:38:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: 'siyi5k4e4vkbtwkudly0dq0vpfwthfkgdt0qn3ar205s1yql46',
                version: 'y',
                name: null,
                environment: 'e',
                isActive: false,
                cancelledAt: '2020-07-27 13:19:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: 'xumayu3juxwtatpt50zww3xr6boxll1kbkg5r381y79aygtgcd',
                version: '5',
                
                environment: '3',
                isActive: true,
                cancelledAt: '2020-07-27 01:23:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: 'x0m2of8pq1dvvl4l6zbmvvamj69udfvh2kpzroriixdnqivxqq',
                version: 'j',
                name: 'i',
                environment: null,
                isActive: false,
                cancelledAt: '2020-07-27 04:30:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: '9xyclu6ijv731of78xf6uhbrpbrct3j0r41l2u0oeouxhtyl4c',
                version: '8',
                name: '8',
                
                isActive: false,
                cancelledAt: '2020-07-28 00:31:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: '0l207miy7ziunrifn5i3b8bd3jd0zokbtqyftlanrvqjfaxbts',
                version: 'q',
                name: 'v',
                environment: 'r',
                isActive: null,
                cancelledAt: '2020-07-27 05:10:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: '1w9l9eumluj9gealjutd9ol3ubyncgypxvpl94g4y6fvakex4j',
                version: 't',
                name: 'a',
                environment: 'y',
                
                cancelledAt: '2020-07-27 04:51:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'uxu8djzja0m166q48cyfqgrugxl49jg9t2de9',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: '9fyh4y2qn80sow8sojaotwwcx3ex6javosajszf4far7br4dvd',
                version: '5',
                name: '5',
                environment: 'z',
                isActive: true,
                cancelledAt: '2020-07-27 16:40:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '18r0ffmdrd2ct2716dqk7a3cbu0e3uq5r7h8n',
                tenantCode: '55blndifqbqp7usndzku0fbzbf8zg9kr07ju55cr5gtm5tia5l',
                version: 'w',
                name: 't',
                environment: 'x',
                isActive: true,
                cancelledAt: '2020-07-27 23:59:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: 'ef7vbc7t541siigxll82ie8x3gv81lvqpigmmiorub9jljq1kq6',
                version: '1',
                name: 'q',
                environment: 'd',
                isActive: false,
                cancelledAt: '2020-07-27 04:10:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode is too large, has a maximum length of 50');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: 'eghd8ume60if7y1li2yo3ni955mggtj3j6wnpzvspb62dkkkv5',
                version: 'n',
                name: 'd',
                environment: '4',
                isActive: 'true',
                cancelledAt: '2020-07-27 16:18:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemCancelledAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: 'l1gjoatgoa2g0ph3r2kayuxk8k1vq20y03iezysr2ck9ttesud',
                version: 'i',
                name: 'z',
                environment: 'h',
                isActive: false,
                cancelledAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemCancelledAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: 'qwabsjy47ucmgtchy7k73gk9ng0y3ebduyx36lmj2yfiabq1wi',
                version: '5',
                name: 'g',
                environment: 'p',
                isActive: false,
                cancelledAt: '2020-07-27 09:18:58',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/systems/paginate`, () => 
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

    test(`/REST:GET bplus-it-sappi/system - Got 404 Not Found`, () => 
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

    test(`/REST:GET bplus-it-sappi/system`, () => 
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
                        value   : 'e07689d2-ca55-4464-8263-0b001b76c7a7'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e07689d2-ca55-4464-8263-0b001b76c7a7'));
    });

    test(`/REST:GET bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/e07689d2-ca55-4464-8263-0b001b76c7a7')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e07689d2-ca55-4464-8263-0b001b76c7a7'));
    });

    test(`/REST:GET bplus-it-sappi/systems`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/systems')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '11d351c8-8fe7-4ff2-94aa-c992a5e5067e',
                tenantId: '425d6798-a215-40fe-a2f9-3634a726de84',
                tenantCode: 'mvdfts8xkipa05f7xxia4jy0xh1l0gw0skizd3ptjjmjiamj04',
                version: 'f',
                name: '7',
                environment: 'h',
                isActive: false,
                cancelledAt: '2020-07-27 11:22:23',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                tenantCode: 'n6xaai47k3mgvk2g1har7mx7tf0v2z9q5gw048s9l3152cvrc8',
                version: 'b',
                name: 'u',
                environment: 'm',
                isActive: false,
                cancelledAt: '2020-07-27 16:40:08',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e07689d2-ca55-4464-8263-0b001b76c7a7'));
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/e07689d2-ca55-4464-8263-0b001b76c7a7')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateSystem - Got 409 Conflict, item already exist in database`, () => 
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
                            tenantCode
                            version
                            name
                            environment
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

    test(`/GraphQL bplusItSappiCreateSystem`, () => 
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
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'a97f347c-6bb5-4fd0-9a06-df6c500e566c',
                        tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                        tenantCode: 'u3gvkdbz1q30ka76t1nzgsoh2qrk1jatftw59jnogojgd314t4',
                        version: '4',
                        name: 'k',
                        environment: 'u',
                        isActive: true,
                        cancelledAt: '2020-07-27 02:56:06',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', 'a97f347c-6bb5-4fd0-9a06-df6c500e566c');
            });
    });

    test(`/GraphQL bplusItSappiPaginateSystems`, () => 
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

    test(`/GraphQL bplusItSappiFindSystem - Got 404 Not Found`, () => 
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
                            tenantCode
                            version
                            name
                            environment
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

    test(`/GraphQL bplusItSappiFindSystem`, () => 
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
                            tenantCode
                            version
                            name
                            environment
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
                            value   : 'e07689d2-ca55-4464-8263-0b001b76c7a7'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('e07689d2-ca55-4464-8263-0b001b76c7a7');
            });
    });

    test(`/GraphQL bplusItSappiFindSystemById - Got 404 Not Found`, () => 
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
                            tenantCode
                            version
                            name
                            environment
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

    test(`/GraphQL bplusItSappiFindSystemById`, () => 
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
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e07689d2-ca55-4464-8263-0b001b76c7a7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('e07689d2-ca55-4464-8263-0b001b76c7a7');
            });
    });

    test(`/GraphQL bplusItSappiGetSystems`, () => 
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
                            tenantCode
                            version
                            name
                            environment
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

    test(`/GraphQL bplusItSappiUpdateSystem - Got 404 Not Found`, () => 
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
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6a1547d2-ea8b-4ef8-88ab-d043ae0920b1',
                        tenantId: 'a5dd1822-326e-4ed2-81f0-0d5406136e82',
                        tenantCode: 'nucwbxv3d9em96fjrfwrqem68brwfcs93b08nzxcuc1m9x3o8d',
                        version: '1',
                        name: 'm',
                        environment: 'a',
                        isActive: true,
                        cancelledAt: '2020-07-27 08:13:41',
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

    test(`/GraphQL bplusItSappiUpdateSystem`, () => 
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
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e07689d2-ca55-4464-8263-0b001b76c7a7',
                        tenantId: '4880ce55-d8d1-454a-885a-0fa45def548a',
                        tenantCode: 'j5ocgo2aaswgea5ey0lu0iaejk5bsiktq2qwkg3ejyb4aw5e7e',
                        version: 'c',
                        name: 'i',
                        environment: 'm',
                        isActive: true,
                        cancelledAt: '2020-07-27 18:11:44',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('e07689d2-ca55-4464-8263-0b001b76c7a7');
            });
    });

    test(`/GraphQL bplusItSappiDeleteSystemById - Got 404 Not Found`, () => 
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
                            tenantCode
                            version
                            name
                            environment
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

    test(`/GraphQL bplusItSappiDeleteSystemById`, () => 
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
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e07689d2-ca55-4464-8263-0b001b76c7a7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('e07689d2-ca55-4464-8263-0b001b76c7a7');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});