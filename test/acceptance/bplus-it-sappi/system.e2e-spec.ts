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
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: '1ud5rxv6df7gyzyt6pyjbhl9uq3wz7zzzmidpy43tr2ejxxthy',
                version: 'u',
                name: '3',
                environment: 'c',
                isActive: false,
                cancelledAt: '2020-07-28 19:32:10',
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
                
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: '53hcazb85mgjrkw5ohvng8mn9eu5jrq7tebyk13bkxp93g0a42',
                version: 'e',
                name: '6',
                environment: 'y',
                isActive: true,
                cancelledAt: '2020-07-29 12:00:50',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: null,
                tenantCode: 'oj1pa0qiruut8657gz9vf9zdse7lvjfnl8u7vub0qw7gdmjtdl',
                version: 'q',
                name: 'y',
                environment: 'f',
                isActive: true,
                cancelledAt: '2020-07-29 03:37:13',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                
                tenantCode: 'bfph1d26cbig7n2jawdhyhbdhfmxwajrg6bz4g0djuhj31oq2h',
                version: '1',
                name: '9',
                environment: 'd',
                isActive: true,
                cancelledAt: '2020-07-29 04:48:34',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: null,
                version: '6',
                name: 'e',
                environment: 'l',
                isActive: false,
                cancelledAt: '2020-07-28 22:57:27',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                
                version: 'm',
                name: '2',
                environment: '1',
                isActive: true,
                cancelledAt: '2020-07-29 11:18:37',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: 'dv9xhho4iicjqvosognt2n37m2i0gmw99bzms1rz3n3eawdcm6',
                version: null,
                name: 'u',
                environment: 'c',
                isActive: false,
                cancelledAt: '2020-07-29 09:39:37',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: 'de0f6m8y9onkb1ugg51pq8gtlhfocbzkse6qppn48o27flygkr',
                
                name: 'n',
                environment: '9',
                isActive: false,
                cancelledAt: '2020-07-29 00:35:35',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: 'r43ld8t247jef3vn4guhsvavgn9waeqhuhqulv1saqzqdce61n',
                version: '4',
                name: null,
                environment: 'd',
                isActive: false,
                cancelledAt: '2020-07-29 03:06:45',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: 'kxct634rxxk8dp81zui9lc47ylp6q380ebsq1gr1zvtmlw172u',
                version: 'y',
                
                environment: 'r',
                isActive: true,
                cancelledAt: '2020-07-28 20:14:25',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: '0bhe1lrf68lm2bmh0foocbqynm3hezixu6ml33y5pi67lofl0f',
                version: 'q',
                name: '3',
                environment: null,
                isActive: false,
                cancelledAt: '2020-07-28 21:05:36',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: 'dzuy3dzpco1x87g84zmjgmhi25ci09zt8ub00vlsn45uan2lq1',
                version: 'n',
                name: '0',
                
                isActive: true,
                cancelledAt: '2020-07-28 23:15:48',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: 'i8rshlj0w4kb2n6bkpt3uxuslzh2gr5hcyp8lhbi83233pqnni',
                version: 'r',
                name: 'm',
                environment: '6',
                isActive: null,
                cancelledAt: '2020-07-29 07:11:06',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: 'rzyw1qhevvyefdiq1yewzmxv3xby8dsvbpfonk3hig8sudt2iw',
                version: 'h',
                name: 'r',
                environment: 't',
                
                cancelledAt: '2020-07-28 19:31:29',
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
                id: 'tjvy4t4uvnaa4igwhoy6il1xenwc093mpvif8',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: '9lri15u8bkfm6ctjefumu2xb92ft0bo302e3h0x67zb6rnh7wz',
                version: 'k',
                name: '8',
                environment: 'j',
                isActive: false,
                cancelledAt: '2020-07-29 05:23:26',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: 'etnbdvz1lbv6ojoltg0ap82k4p04i8w1rywtg',
                tenantCode: '0cn48zurphk5rrfknfqav5p5oe8jlhn5ii2i9ew6b7hl4lj0vv',
                version: 'w',
                name: '1',
                environment: '6',
                isActive: false,
                cancelledAt: '2020-07-29 15:39:30',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: 'w1qjggp8v9nmep18dmfll21a8nzf4ylodhjnvmw5pjfk6lti81z',
                version: 'l',
                name: 'k',
                environment: 'p',
                isActive: true,
                cancelledAt: '2020-07-29 00:40:41',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: 'wmnp0ma2he4qxu8kxfgleciya6g02xvhmjqcl84ghqea577saz',
                version: 'f',
                name: 'r',
                environment: '9',
                isActive: 'true',
                cancelledAt: '2020-07-29 07:48:05',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: '80sktrlxzn7kb51mvqh34ypd4x4jckwu4a8xttv912eb0v6l43',
                version: 'd',
                name: '9',
                environment: 'i',
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
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: 'kplvvczscutrfgni5f5xvrtswibz3h9gbw0g894fvlx37ulj3i',
                version: 'b',
                name: 'm',
                environment: 'b',
                isActive: true,
                cancelledAt: '2020-07-29 03:33:12',
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
                        value   : '5b27155f-2eef-495e-aaad-e1dec35563e4'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5b27155f-2eef-495e-aaad-e1dec35563e4'));
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
            .get('/bplus-it-sappi/system/5b27155f-2eef-495e-aaad-e1dec35563e4')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5b27155f-2eef-495e-aaad-e1dec35563e4'));
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
                
                id: 'ee246216-9ead-4b70-9335-a878da933c44',
                tenantId: 'e4f6d696-2609-49ae-beff-5feec37d4231',
                tenantCode: 'ffb0cj7ktkqq2msnypb4fsb2qqiwf4rrcts5axfaxoja2wnz95',
                version: 'v',
                name: 'q',
                environment: 'k',
                isActive: false,
                cancelledAt: '2020-07-29 09:17:05',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                tenantCode: 'xtrpvivklneg3xbqfppp7ooq6cmjok7q9wo8af5vkpd5eg1x56',
                version: '8',
                name: 'g',
                environment: 'x',
                isActive: false,
                cancelledAt: '2020-07-29 00:19:07',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5b27155f-2eef-495e-aaad-e1dec35563e4'));
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
            .delete('/bplus-it-sappi/system/5b27155f-2eef-495e-aaad-e1dec35563e4')
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
                        id: 'f4fc8371-572d-49e1-98cd-b350db83a737',
                        tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                        tenantCode: '0tmzubadypdevuydb2pkvwtxhqoyax0h4ubf7p6qgfq9g26baw',
                        version: 'v',
                        name: '9',
                        environment: 'x',
                        isActive: false,
                        cancelledAt: '2020-07-28 16:18:21',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', 'f4fc8371-572d-49e1-98cd-b350db83a737');
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
                            value   : '5b27155f-2eef-495e-aaad-e1dec35563e4'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('5b27155f-2eef-495e-aaad-e1dec35563e4');
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
                    id: '5b27155f-2eef-495e-aaad-e1dec35563e4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('5b27155f-2eef-495e-aaad-e1dec35563e4');
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
                        
                        id: 'a9938baf-26cc-4d2c-95a8-b837b2e2366f',
                        tenantId: '76875d26-8289-44ec-90ab-0d091784b7e1',
                        tenantCode: 'yld8d52wgc3xcsvq3q1peeff5xbvwga2n42p0hum9w754lzr7v',
                        version: 'x',
                        name: '2',
                        environment: 't',
                        isActive: false,
                        cancelledAt: '2020-07-28 22:02:19',
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
                        
                        id: '5b27155f-2eef-495e-aaad-e1dec35563e4',
                        tenantId: '664a71c0-0489-4399-8f23-86a193c0bb52',
                        tenantCode: 'k8nybei8cnzyhzigt9cbrnq2u4v107e7xqyaps55x07mdh7nku',
                        version: '4',
                        name: 'p',
                        environment: '9',
                        isActive: false,
                        cancelledAt: '2020-07-29 06:30:31',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('5b27155f-2eef-495e-aaad-e1dec35563e4');
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
                    id: '5b27155f-2eef-495e-aaad-e1dec35563e4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('5b27155f-2eef-495e-aaad-e1dec35563e4');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});