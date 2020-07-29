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
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: 'c1fo3aljeaqgaaeopcwdqhhtam7fvai0yoko8pzuv6gy8dqv6f',
                version: '7',
                name: '7',
                environment: '6',
                isActive: false,
                cancelledAt: '2020-07-28 21:33:06',
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
                
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: 'a5nsm5doalwec4d9o0ppxg5yhomy2jrpzwnxhhg3c3caeiihce',
                version: 'c',
                name: 'w',
                environment: 'i',
                isActive: true,
                cancelledAt: '2020-07-29 02:36:38',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: null,
                tenantCode: '7o2uli4lrikcdgfbq7kyizgl00hemmoybslrcobla5qzn88fth',
                version: '2',
                name: 'x',
                environment: 'm',
                isActive: false,
                cancelledAt: '2020-07-28 19:24:01',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                
                tenantCode: '11dbjp22lb0m0p23g0w0x6108q3td0aj109ykmc94yz0tc3vzw',
                version: 'i',
                name: 'y',
                environment: 'r',
                isActive: false,
                cancelledAt: '2020-07-29 02:32:39',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: null,
                version: '4',
                name: 'o',
                environment: 'c',
                isActive: true,
                cancelledAt: '2020-07-28 20:12:21',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                
                version: 'a',
                name: '8',
                environment: '3',
                isActive: true,
                cancelledAt: '2020-07-29 06:41:40',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: 'y3e4xibjuare7zpu7oo6wwlnygbjeb7eqh2gxtx94edwd67xcg',
                version: null,
                name: 'h',
                environment: 'c',
                isActive: true,
                cancelledAt: '2020-07-28 23:54:22',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: 'znw31cv34ke0b0xo6qc4vcotno1co7d9sijurm772bdcv6qe3y',
                
                name: 'o',
                environment: '3',
                isActive: false,
                cancelledAt: '2020-07-29 06:30:08',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: 'zhlk1aho1f20q72wnwzipqsmdvxer66abjbqsol5vxvouid62j',
                version: '3',
                name: null,
                environment: 'p',
                isActive: false,
                cancelledAt: '2020-07-28 16:03:36',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: 'bxdfguzt177rwqv2oxao7exrbqz7t3j98yh07dnwkfbwdpfout',
                version: '5',
                
                environment: 'r',
                isActive: false,
                cancelledAt: '2020-07-28 16:41:49',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: '6xv3ov50vfhy5aqkz3rgjat0slxtk5wdacl4x65tdbpzbejp49',
                version: 'e',
                name: 'f',
                environment: null,
                isActive: false,
                cancelledAt: '2020-07-29 02:24:13',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: '0qdbk0l062plzfxoaxri9up1m3epjy3e909qbp0oyk1el8y2xv',
                version: 'q',
                name: 'z',
                
                isActive: false,
                cancelledAt: '2020-07-28 22:20:30',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: '4y7abkel881c6foai5txe0b7mmicu87lm2mervicctgprxwhlc',
                version: 'i',
                name: '6',
                environment: 'g',
                isActive: null,
                cancelledAt: '2020-07-28 16:02:06',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: 'vcjoi7n8iui3pw5eabi7v6y4brbt2c93oxb4gasfi5l6asqp51',
                version: 'c',
                name: 't',
                environment: 'l',
                
                cancelledAt: '2020-07-29 15:15:59',
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
                id: 'asbzt0herr4m6r3ioo9wnksf1m98ne2lw2w1k',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: '3wz7191cyv97kae925i5x9wmvywsg2nb4xlbvuaa269s3sjifo',
                version: '0',
                name: 'y',
                environment: 'y',
                isActive: false,
                cancelledAt: '2020-07-28 16:58:45',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'do9hnr3x08bvduro8wjwoslgtuvig81iklfrm',
                tenantCode: 'dyydcxu5yjcqadmzf955lbl9gc9a44fbcz2nrwu932xqy803qs',
                version: 'b',
                name: 'c',
                environment: '5',
                isActive: true,
                cancelledAt: '2020-07-29 06:07:19',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: '3uo4c3qgut6tv7uwxj0v77re9dgnqq3mxell3qje2uo7ah78juv',
                version: 'd',
                name: '0',
                environment: '7',
                isActive: true,
                cancelledAt: '2020-07-29 10:59:01',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: 'bl37gtmxu4qimscjj66rzq9cq43tzphe6gfpvklj4dre3d2id3',
                version: '7',
                name: '9',
                environment: '1',
                isActive: 'true',
                cancelledAt: '2020-07-29 13:30:01',
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: 'gzjmjsf6aqi8wx4tu2u6yrjwxtbmklh7zxclk89hxo0ec01niz',
                version: 'd',
                name: 'f',
                environment: 'f',
                isActive: true,
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
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: '0r52tgjjv715wp6vpwf7bqbcv7uliumsg8e0srxohc1uij3pe4',
                version: 'q',
                name: '6',
                environment: 'd',
                isActive: false,
                cancelledAt: '2020-07-29 00:54:41',
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
                        value   : '96ae451f-4a7d-4f06-b621-0e2cfbebf73c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '96ae451f-4a7d-4f06-b621-0e2cfbebf73c'));
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
            .get('/bplus-it-sappi/system/96ae451f-4a7d-4f06-b621-0e2cfbebf73c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '96ae451f-4a7d-4f06-b621-0e2cfbebf73c'));
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
                
                id: 'd1f62a10-dae3-4362-8ad7-2d61d411a1bb',
                tenantId: '93025d68-482e-430f-bb23-5dea246479b7',
                tenantCode: '6o6uc3ybuoimd16hdixqa084rswxq2mrqman4mu3dxo45xzzqv',
                version: '3',
                name: 'u',
                environment: 'g',
                isActive: true,
                cancelledAt: '2020-07-29 10:40:25',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                tenantCode: 'tu0v7dtg2hfam6ma78u1lddp73667r6w3kv1kuml3eugp4izd8',
                version: 'o',
                name: 'y',
                environment: '3',
                isActive: false,
                cancelledAt: '2020-07-29 14:16:30',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '96ae451f-4a7d-4f06-b621-0e2cfbebf73c'));
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
            .delete('/bplus-it-sappi/system/96ae451f-4a7d-4f06-b621-0e2cfbebf73c')
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
                        id: 'aa4fbd65-35fe-4a02-b410-dcaf26908159',
                        tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                        tenantCode: '7ejmhi5f5spsidky8o4z1mev9ul21g3ir9y3eb3zvvxs5ctwl8',
                        version: 'l',
                        name: '5',
                        environment: 'q',
                        isActive: true,
                        cancelledAt: '2020-07-28 22:57:47',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', 'aa4fbd65-35fe-4a02-b410-dcaf26908159');
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
                            value   : '96ae451f-4a7d-4f06-b621-0e2cfbebf73c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('96ae451f-4a7d-4f06-b621-0e2cfbebf73c');
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
                    id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('96ae451f-4a7d-4f06-b621-0e2cfbebf73c');
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
                        
                        id: '2aaff1ff-d4d6-4ecf-bcb5-0c243c748dd1',
                        tenantId: 'bc6cc7e3-3f19-44c1-a945-752f87e26665',
                        tenantCode: 'n4rket3l40cgpkx7h75nc3d6y0yqk5kljqjs4z2f9pjuyfg972',
                        version: 'v',
                        name: 'k',
                        environment: 'g',
                        isActive: false,
                        cancelledAt: '2020-07-29 12:49:31',
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
                        
                        id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c',
                        tenantId: 'cc586174-97d1-46c3-b6ec-8c0e9780b825',
                        tenantCode: '6u2dots7b001rzripd15up6vq04qzewymlyudgzkm4bmf19uxo',
                        version: 'y',
                        name: 'p',
                        environment: '9',
                        isActive: false,
                        cancelledAt: '2020-07-29 10:26:24',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('96ae451f-4a7d-4f06-b621-0e2cfbebf73c');
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
                    id: '96ae451f-4a7d-4f06-b621-0e2cfbebf73c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('96ae451f-4a7d-4f06-b621-0e2cfbebf73c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});