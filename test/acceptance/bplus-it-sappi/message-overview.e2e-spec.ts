import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageOverviewRepository } from '@hades/bplus-it-sappi/message-overview/domain/message-overview.repository';
import { MockMessageOverviewRepository } from '@hades/bplus-it-sappi/message-overview/infrastructure/mock/mock-message-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('message-overview', () => 
{
    let app: INestApplication;
    let repository: MockMessageOverviewRepository;
    
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
            .overrideProvider(IMessageOverviewRepository)
            .useClass(MockMessageOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageOverviewRepository>module.get<IMessageOverviewRepository>(IMessageOverviewRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'tl5tdqsf4dntxzpjku2qltqjc6j0ajv3jl23ebzgi64o11rk15',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'ejrxs6sdr470wuxa16om',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:27:19',
                executionMonitoringStartAt: '2020-07-29 16:50:00',
                executionMonitoringEndAt: '2020-07-29 07:13:24',
                numberMax: 3958807666,
                numberDays: 4513770839,
                success: 1607285542,
                cancelled: 5237357063,
                delivering: 8847834281,
                error: 6923518127,
                holding: 3194710322,
                toBeDelivered: 2459317771,
                waiting: 6205078200,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'ctzqf11gfeyr4pib5z6cej695n1higwsgonkidy72e1orh6l60',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'x0g3hmmp7u117drcj3om',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:48:45',
                executionMonitoringStartAt: '2020-07-29 11:36:08',
                executionMonitoringEndAt: '2020-07-28 23:21:24',
                numberMax: 8000002046,
                numberDays: 9550954046,
                success: 1633854429,
                cancelled: 5502671887,
                delivering: 5141300577,
                error: 5498032910,
                holding: 2642097864,
                toBeDelivered: 7819573889,
                waiting: 3077663596,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: null,
                tenantCode: '9uacpe1cbs6as5qojkejazf748z7vgkdpgvw1wadm2r1dup98l',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'zlpy8gggp6481rmlr34a',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:18:23',
                executionMonitoringStartAt: '2020-07-29 15:03:07',
                executionMonitoringEndAt: '2020-07-29 03:25:10',
                numberMax: 9937875485,
                numberDays: 7026740385,
                success: 3219185082,
                cancelled: 7126423125,
                delivering: 5543195435,
                error: 1442553909,
                holding: 2702869875,
                toBeDelivered: 4458270895,
                waiting: 2212971563,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                
                tenantCode: '6rrkadmbpritg9c4q72us1bwcvpldup9f110klyds9wpj0ay7q',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'zs9pqhxn875iqhtqm689',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:38:09',
                executionMonitoringStartAt: '2020-07-29 12:21:43',
                executionMonitoringEndAt: '2020-07-29 16:02:56',
                numberMax: 2764019898,
                numberDays: 9705096264,
                success: 3038008912,
                cancelled: 1222678904,
                delivering: 5098893123,
                error: 3894599335,
                holding: 4823387336,
                toBeDelivered: 1998295811,
                waiting: 2834859777,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: null,
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'jbs2hslhtdlameokryd7',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:31:25',
                executionMonitoringStartAt: '2020-07-29 01:22:27',
                executionMonitoringEndAt: '2020-07-28 23:47:03',
                numberMax: 7088882426,
                numberDays: 2986399561,
                success: 5738422713,
                cancelled: 5844836825,
                delivering: 5573135848,
                error: 8920920401,
                holding: 4189675692,
                toBeDelivered: 8620295701,
                waiting: 5795758647,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'hicylhckp2w170dplhmd',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:50:11',
                executionMonitoringStartAt: '2020-07-29 05:55:30',
                executionMonitoringEndAt: '2020-07-29 11:57:26',
                numberMax: 9484717055,
                numberDays: 3800522620,
                success: 9335544222,
                cancelled: 8674834758,
                delivering: 7365915725,
                error: 8183855501,
                holding: 3557338447,
                toBeDelivered: 2778263499,
                waiting: 4932734343,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'dcfy6gvz41eqets7x00dhredft313mme37jgl9imi11mkdd9l2',
                systemId: null,
                systemName: 'qmn3mzkwflxnxnkooqht',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:48:03',
                executionMonitoringStartAt: '2020-07-29 17:55:09',
                executionMonitoringEndAt: '2020-07-29 01:21:32',
                numberMax: 5481764932,
                numberDays: 1214534640,
                success: 7976222600,
                cancelled: 1919436416,
                delivering: 6527062094,
                error: 1300081854,
                holding: 8461987295,
                toBeDelivered: 2946814809,
                waiting: 1683857017,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'ixa01v2odztpy17x90ai7np7twmcykygtjhs5emahtkxvfjou6',
                
                systemName: 'd3rax1fdyoi2zeidz119',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:56:45',
                executionMonitoringStartAt: '2020-07-29 01:06:12',
                executionMonitoringEndAt: '2020-07-29 09:35:37',
                numberMax: 2502454530,
                numberDays: 6776379981,
                success: 4217967212,
                cancelled: 4987258793,
                delivering: 1267705035,
                error: 1321582376,
                holding: 2724678902,
                toBeDelivered: 3823240002,
                waiting: 7541989172,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'em0y20jol8bwyvz3y5ejiavhgsaqezm3c3jedjoqkwoothkqjv',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: null,
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:41:54',
                executionMonitoringStartAt: '2020-07-28 19:32:08',
                executionMonitoringEndAt: '2020-07-29 11:49:33',
                numberMax: 9552759937,
                numberDays: 4284318991,
                success: 9631660130,
                cancelled: 8303159908,
                delivering: 9129816381,
                error: 7532671182,
                holding: 7818716715,
                toBeDelivered: 7947631319,
                waiting: 7363319544,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 's3fk84176pcjgsx1xbh7yzayq42lqfcg03tpfjg9eh0euujh99',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:40:41',
                executionMonitoringStartAt: '2020-07-28 22:54:21',
                executionMonitoringEndAt: '2020-07-29 17:39:43',
                numberMax: 1748556185,
                numberDays: 7981577663,
                success: 4128675090,
                cancelled: 6246222781,
                delivering: 3182509132,
                error: 2359068390,
                holding: 5342862664,
                toBeDelivered: 8874399733,
                waiting: 1290244705,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'cdavmhcwoubqqan4qz6r3r96zibjb3rc4f630reuc5ddzmu2fj',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'jgok7ge52y1ntdyxxlbu',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:55:38',
                executionMonitoringStartAt: '2020-07-29 04:53:00',
                executionMonitoringEndAt: '2020-07-29 04:14:45',
                numberMax: 9574466357,
                numberDays: 9873867278,
                success: 6715879331,
                cancelled: 5308767233,
                delivering: 2464162051,
                error: 5363860923,
                holding: 1952867956,
                toBeDelivered: 2834529390,
                waiting: 3922200723,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'vxkv0j0l9tfsp210y2ote9a7h72oja9nosxxm2gyyizwrkelht',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: '0qp1wznfoic88y4agabk',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:31:46',
                executionMonitoringStartAt: '2020-07-29 17:21:14',
                executionMonitoringEndAt: '2020-07-29 07:12:42',
                numberMax: 5501539232,
                numberDays: 8610024525,
                success: 1349720700,
                cancelled: 2875442271,
                delivering: 1455814802,
                error: 9627442026,
                holding: 9690930189,
                toBeDelivered: 5109466573,
                waiting: 5896736300,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'ij8s1dxev8a9lvxo1h88gvasebt7dfjx5y4q8ubp31v63vy6pv',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'x8nmanz0h1bxj8dnwe4l',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: null,
                executionExecutedAt: '2020-07-29 17:25:26',
                executionMonitoringStartAt: '2020-07-28 18:25:04',
                executionMonitoringEndAt: '2020-07-29 12:36:41',
                numberMax: 9608134675,
                numberDays: 6477021339,
                success: 8898326164,
                cancelled: 1411725993,
                delivering: 3570009672,
                error: 6579714505,
                holding: 1317932823,
                toBeDelivered: 4569107117,
                waiting: 8652368827,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'fcn71a3u1jj4vzmsigg1s0dsizx8jo59s1v0ticijvsr06d5jj',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'c5g1heaewemxxaq5s3jw',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                
                executionExecutedAt: '2020-07-29 12:56:35',
                executionMonitoringStartAt: '2020-07-29 17:19:02',
                executionMonitoringEndAt: '2020-07-29 07:19:59',
                numberMax: 2130269585,
                numberDays: 7628496220,
                success: 1142045064,
                cancelled: 1970161048,
                delivering: 1194383015,
                error: 4532953656,
                holding: 7401235412,
                toBeDelivered: 9795497824,
                waiting: 3069889089,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'azs8t4z2tkaptgssfngxsfdj28fl92um2bk9r4je2vfjk4byvx',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'jbr5vf6xeqv836s2vjap',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 10:43:14',
                executionMonitoringEndAt: '2020-07-29 09:12:16',
                numberMax: 1404405642,
                numberDays: 3927576532,
                success: 5299404169,
                cancelled: 7540094157,
                delivering: 7499781518,
                error: 3654552528,
                holding: 9232438183,
                toBeDelivered: 2313222179,
                waiting: 2318456919,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: '0xnbu5tlgddwm63nyyni91hqz8w2fsltan6fllkjeq20prwd8s',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'uz2a5yplaa5yt13jc6yi',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 11:53:04',
                executionMonitoringEndAt: '2020-07-29 00:10:56',
                numberMax: 2456204401,
                numberDays: 8500356519,
                success: 4996422288,
                cancelled: 5274050567,
                delivering: 7296554038,
                error: 4012362789,
                holding: 6004227839,
                toBeDelivered: 6719786556,
                waiting: 8398352140,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'c2i1146jh1bks824oqh04tx7xvvaaee0fqz324arwjnuk5ml7o',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'lsnc3ql1qbycuj0h68zb',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:47:20',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 19:16:42',
                numberMax: 1074720862,
                numberDays: 4029273877,
                success: 4468769183,
                cancelled: 1937179043,
                delivering: 1766243202,
                error: 6280675815,
                holding: 8861843615,
                toBeDelivered: 4720636026,
                waiting: 1081228773,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'qez9z6eucuhtpl110hre94jbya4pimcxcygo3m0yprsjxhdgrs',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: '0slv2c7muuvbc5fdlezw',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:48:33',
                
                executionMonitoringEndAt: '2020-07-29 06:30:16',
                numberMax: 2308800743,
                numberDays: 4746066881,
                success: 4105099062,
                cancelled: 6061599570,
                delivering: 7249102187,
                error: 8456923989,
                holding: 5644361726,
                toBeDelivered: 4817743912,
                waiting: 6659511750,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: '6e5j8vipxb7fbzg5o7vd21ylc943vfa55s473lu7tt6uggsclo',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'v18c9x8u1fme9qfebmjo',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:51:21',
                executionMonitoringStartAt: '2020-07-28 19:12:54',
                executionMonitoringEndAt: null,
                numberMax: 2937430778,
                numberDays: 5875926500,
                success: 4596796003,
                cancelled: 1698493357,
                delivering: 3002924885,
                error: 3239880648,
                holding: 5671547130,
                toBeDelivered: 6821081409,
                waiting: 8231879153,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'far028gbz7xrykmqgdmgrbjv3cmprpu1jvbmevgohc6xiyisfk',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'o3pp8oqvcoxrg7flwmod',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:01:53',
                executionMonitoringStartAt: '2020-07-29 04:29:17',
                
                numberMax: 5865392705,
                numberDays: 7143053242,
                success: 1218005803,
                cancelled: 6360687818,
                delivering: 2932138554,
                error: 2752311420,
                holding: 2496924949,
                toBeDelivered: 7605463939,
                waiting: 9570806201,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8wabez8wsptmrr77ekebtmjx5o00rbzgtcbta',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: '96orw3gat1dkhx5kpsz7v9ixp5kw6bl98yltt8vmevu4isvftc',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'bp95kydhss1po6e70jvo',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:41:13',
                executionMonitoringStartAt: '2020-07-28 23:33:44',
                executionMonitoringEndAt: '2020-07-28 21:56:07',
                numberMax: 4059848416,
                numberDays: 8261876626,
                success: 4972328926,
                cancelled: 5598831073,
                delivering: 4210315694,
                error: 3270863179,
                holding: 9274886185,
                toBeDelivered: 8396899971,
                waiting: 6272317060,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'uqo3npdqiwjrujm67ukcht3mvqe7oettrgdqx',
                tenantCode: 'zje4mtbnv28d8dps4ke7e8bc7lwio6r5b8dwde57u9dz3b401w',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: '52stmdjx49qou6gfn5pc',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:54:14',
                executionMonitoringStartAt: '2020-07-28 23:33:48',
                executionMonitoringEndAt: '2020-07-28 20:24:45',
                numberMax: 6235044654,
                numberDays: 6795551888,
                success: 7105498020,
                cancelled: 9513860325,
                delivering: 9761623127,
                error: 6469823012,
                holding: 9073619216,
                toBeDelivered: 9978027885,
                waiting: 6779724562,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'fllxvw3z49p7q2wzpaq8enqg5dztrgrdxs6b4p7icgcue1und9',
                systemId: '3mo5q52hm5bgcnawx2ymceb9q5qhvvyl3g529',
                systemName: 'tkf3t13fs37v6jx3rl9c',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:54:14',
                executionMonitoringStartAt: '2020-07-29 05:14:10',
                executionMonitoringEndAt: '2020-07-29 05:22:52',
                numberMax: 7660017645,
                numberDays: 7340563242,
                success: 5838627281,
                cancelled: 2410297008,
                delivering: 5018979960,
                error: 3998657170,
                holding: 6164437579,
                toBeDelivered: 1568922111,
                waiting: 8067209084,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: '9avzldbjqxc7ziziow7pw1nb2094rkp2xbp3heykkm9xyhkk0h',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'ly1lrquwm6w61wor2y3t',
                executionId: '6z5g2k4wwmkyvlz2qtg0o61kvxbbfxgga3l4r',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:13:01',
                executionMonitoringStartAt: '2020-07-29 04:36:30',
                executionMonitoringEndAt: '2020-07-29 08:58:39',
                numberMax: 6594647983,
                numberDays: 9899346741,
                success: 9424561617,
                cancelled: 1822454358,
                delivering: 6808192050,
                error: 7435070060,
                holding: 5843311605,
                toBeDelivered: 3361444166,
                waiting: 7378072557,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'vuoxxby5pr1j584c39p2la041xc378jlg6z03xbhvuhvyxzhhci',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'aa7ul61jsh0penfovcme',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:57:56',
                executionMonitoringStartAt: '2020-07-28 21:27:42',
                executionMonitoringEndAt: '2020-07-29 07:37:48',
                numberMax: 3021531671,
                numberDays: 1030619515,
                success: 2929934209,
                cancelled: 5191021595,
                delivering: 7339384869,
                error: 9319118223,
                holding: 3437149648,
                toBeDelivered: 4232597173,
                waiting: 9637934954,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'pebbb7ny7g7uiib7y7m0htduqy4uvx1u6vgejmevdcwwmm1a5s',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'imk4ml0vbicaqwedl6gea',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:45:06',
                executionMonitoringStartAt: '2020-07-29 17:32:11',
                executionMonitoringEndAt: '2020-07-29 12:09:53',
                numberMax: 2372008369,
                numberDays: 1591346619,
                success: 5350045524,
                cancelled: 1196320998,
                delivering: 9779560538,
                error: 7275501461,
                holding: 4042789226,
                toBeDelivered: 1748241839,
                waiting: 4073740807,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberMax is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'zb7q62o3ckx5ocitcw6xerq3vaoueyjvswlbwy4kofzgxc872d',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'kg8x35qbm4roud96jnyr',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:50:06',
                executionMonitoringStartAt: '2020-07-29 06:37:36',
                executionMonitoringEndAt: '2020-07-28 19:05:39',
                numberMax: 45383198880,
                numberDays: 1214079729,
                success: 4207511237,
                cancelled: 5785622379,
                delivering: 4059604960,
                error: 7745381641,
                holding: 8233692563,
                toBeDelivered: 6716257134,
                waiting: 3941353576,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberMax is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberDays is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'a3igs1kmhoy4wp5pgbhlc1xz6st4awzqgt908k1jpioyas51pk',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: '3h541zfkwbn0v1m87gqx',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:25:10',
                executionMonitoringStartAt: '2020-07-29 01:15:25',
                executionMonitoringEndAt: '2020-07-28 21:24:11',
                numberMax: 6163257961,
                numberDays: 93398371496,
                success: 6615686164,
                cancelled: 4096399128,
                delivering: 5964313223,
                error: 2839361182,
                holding: 9771620903,
                toBeDelivered: 3204708165,
                waiting: 3889212875,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberDays is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSuccess is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: '28mhdu6eal45p8ep5up8oe9f0enutgdk1z6daffj4t1ah9swt4',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'c5ztl3zxvl7y340x6zru',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:18:04',
                executionMonitoringStartAt: '2020-07-28 19:00:44',
                executionMonitoringEndAt: '2020-07-29 08:18:48',
                numberMax: 5890815096,
                numberDays: 6624628026,
                success: 98151967978,
                cancelled: 7858564716,
                delivering: 9463172801,
                error: 6538056388,
                holding: 2280601689,
                toBeDelivered: 8087409490,
                waiting: 5285639548,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSuccess is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'd0m69hj3muwkgcz1qtkdioyxutdq0apg9m01sbr4w5k89itwbs',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'jjb8k9v2w4hk8l4ss0vi',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:08:45',
                executionMonitoringStartAt: '2020-07-29 00:57:24',
                executionMonitoringEndAt: '2020-07-29 07:36:23',
                numberMax: 3631366993,
                numberDays: 4427527135,
                success: 6114276000,
                cancelled: 44860537260,
                delivering: 2186023289,
                error: 9142386889,
                holding: 2143705619,
                toBeDelivered: 5529938044,
                waiting: 7380917402,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewDelivering is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'i96ijew6fgw6ws4wt521gfu3lhmd4eq46pe9d7wgy0jcfhuuwa',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'vg2y64daxud9z4v2ls1r',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:11:32',
                executionMonitoringStartAt: '2020-07-28 19:20:29',
                executionMonitoringEndAt: '2020-07-28 20:39:35',
                numberMax: 4793028173,
                numberDays: 2731236446,
                success: 9979578355,
                cancelled: 2823669304,
                delivering: 10951795866,
                error: 1131042216,
                holding: 1206335922,
                toBeDelivered: 3376475031,
                waiting: 6445133061,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewDelivering is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'i6vl5ktxxeb7rt82bq4qb8sb83y1feawtwvieef1as3h1lled0',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'fyrtjgxrzvfrg3ts001n',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:04:10',
                executionMonitoringStartAt: '2020-07-29 02:17:42',
                executionMonitoringEndAt: '2020-07-29 18:18:39',
                numberMax: 3178283426,
                numberDays: 3061055837,
                success: 3569979280,
                cancelled: 5092539224,
                delivering: 8372850695,
                error: 84571123122,
                holding: 2132334390,
                toBeDelivered: 5575610894,
                waiting: 1024310078,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewError is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewHolding is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'u3ecansn00a2ngyez6bc4p068pvtu3j34oj2nnpaq3wcwj8p3g',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'alyg529l3i5mbc5akjj0',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:54:00',
                executionMonitoringStartAt: '2020-07-28 20:54:26',
                executionMonitoringEndAt: '2020-07-29 07:16:15',
                numberMax: 5617938027,
                numberDays: 5461123386,
                success: 5469891141,
                cancelled: 9091504592,
                delivering: 4371388434,
                error: 1341354752,
                holding: 98847537050,
                toBeDelivered: 4042846649,
                waiting: 4888417472,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewHolding is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'qaw8s2tqjez3j7za7fu7gfa1rf5av9nw7pb4326stqa21idh6i',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'm707ubm6ong0qb8sszf2',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:32:17',
                executionMonitoringStartAt: '2020-07-29 11:52:58',
                executionMonitoringEndAt: '2020-07-29 11:29:32',
                numberMax: 9504163476,
                numberDays: 3363018484,
                success: 7196703206,
                cancelled: 9706809898,
                delivering: 4639527099,
                error: 2259575763,
                holding: 1230477136,
                toBeDelivered: 98812959975,
                waiting: 5742461489,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewToBeDelivered is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewWaiting is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: '8n8aapeegqux86ztyl6re4dzj7hkai8ro319uzk6cuv61pskui',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'kccpcfup7riv5p3fvgvk',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:37:10',
                executionMonitoringStartAt: '2020-07-29 15:04:30',
                executionMonitoringEndAt: '2020-07-28 18:46:56',
                numberMax: 7495871422,
                numberDays: 1706421631,
                success: 2061174904,
                cancelled: 2385353635,
                delivering: 6643891978,
                error: 8883867817,
                holding: 8727358990,
                toBeDelivered: 9207150628,
                waiting: 88298132774,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewWaiting is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberMax must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: '4azxon1qsex60f1suwkgg5uu9q2ouc7xtrqj2np2nycfvqhg1d',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'mbl28hcur0s51yui3ep4',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:28:29',
                executionMonitoringStartAt: '2020-07-29 15:15:09',
                executionMonitoringEndAt: '2020-07-29 13:52:24',
                numberMax: -9,
                numberDays: 9405668137,
                success: 3182329745,
                cancelled: 6568856333,
                delivering: 7026426957,
                error: 8252256492,
                holding: 9853695820,
                toBeDelivered: 8941856559,
                waiting: 8003431054,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberMax must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberDays must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'pi5fzat7mb51nn6sb01reontbb5koqx01ru7dekneonb88nu0f',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'nrznhg4jyxs5shxmxuep',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:14:14',
                executionMonitoringStartAt: '2020-07-29 03:17:18',
                executionMonitoringEndAt: '2020-07-29 02:00:53',
                numberMax: 6907488653,
                numberDays: -9,
                success: 2991477364,
                cancelled: 1867028925,
                delivering: 6307244829,
                error: 1467640472,
                holding: 5687117467,
                toBeDelivered: 6101583108,
                waiting: 4000908289,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberDays must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSuccess must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'p1ed4txn5sfedwm9gd3z8cnrujcsnvcrargbrv440fpskfto36',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'vc11hk5m0o3sfzky7fmw',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:28:04',
                executionMonitoringStartAt: '2020-07-28 22:51:28',
                executionMonitoringEndAt: '2020-07-29 07:19:36',
                numberMax: 2827816678,
                numberDays: 9985148893,
                success: -9,
                cancelled: 5815798212,
                delivering: 7002816891,
                error: 2345887439,
                holding: 6291515699,
                toBeDelivered: 7639897516,
                waiting: 9586297013,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewSuccess must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewCancelled must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'ehaalfqjpur6jo3fbfvsnfyyrn0bogsy61qkijd7pjbde2t69f',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'm2xgjfgdrzr4l00e515v',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:08:35',
                executionMonitoringStartAt: '2020-07-29 08:42:37',
                executionMonitoringEndAt: '2020-07-29 14:56:14',
                numberMax: 5825953626,
                numberDays: 9322068832,
                success: 1717823305,
                cancelled: -9,
                delivering: 1509047826,
                error: 6337240336,
                holding: 6984955884,
                toBeDelivered: 1294576511,
                waiting: 3254901881,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewDelivering must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'zsfxvufwcf6wezynx3vssayut1bsucv8burms6iampnmlw2h8f',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'ozh4x4xhazpxg76rtqwy',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:49:03',
                executionMonitoringStartAt: '2020-07-29 00:30:33',
                executionMonitoringEndAt: '2020-07-28 21:50:10',
                numberMax: 2917610990,
                numberDays: 5760995711,
                success: 7305405628,
                cancelled: 9132854513,
                delivering: -9,
                error: 3268293824,
                holding: 7694823849,
                toBeDelivered: 2569770144,
                waiting: 8360542938,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewDelivering must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'ikl0ba4gwil77hn7lsu88we5vhjnykgvipor3o3skmn0j8enl4',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'x4qyyib0vqkqa6qdlldd',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:03:33',
                executionMonitoringStartAt: '2020-07-29 01:22:23',
                executionMonitoringEndAt: '2020-07-28 21:31:06',
                numberMax: 9215907756,
                numberDays: 4016275175,
                success: 6555486942,
                cancelled: 9439971101,
                delivering: 4458947829,
                error: -9,
                holding: 1551551883,
                toBeDelivered: 4864360452,
                waiting: 7567881061,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewHolding must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: '8b2b1shejeh346r96ih2e69ywn8ce6ybwtp6uwl3ljgqxg04zj',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: '3sy580h4n2kyl23xm0x4',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:18:27',
                executionMonitoringStartAt: '2020-07-28 19:22:28',
                executionMonitoringEndAt: '2020-07-28 23:40:10',
                numberMax: 6749354959,
                numberDays: 3464162987,
                success: 2823718492,
                cancelled: 6586590679,
                delivering: 2478901952,
                error: 3312493279,
                holding: -9,
                toBeDelivered: 7458518832,
                waiting: 6253341732,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewHolding must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'i07mq7muty83p9e21l1k6wik2s2hyv17s9cofqsld008ocxbss',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'm6j6d0kkoq32853aet9h',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:58:55',
                executionMonitoringStartAt: '2020-07-29 01:19:21',
                executionMonitoringEndAt: '2020-07-29 16:00:19',
                numberMax: 3668184372,
                numberDays: 1367605199,
                success: 7985738843,
                cancelled: 3878369274,
                delivering: 5365781101,
                error: 8938047788,
                holding: 2156644421,
                toBeDelivered: -9,
                waiting: 5724682510,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewToBeDelivered must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewWaiting must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 't70hla3gha18osks7r2eej0zc1ym2cbrwxwu0d99kr6d7zs71s',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'jk3nn561fzetxg4msjoo',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:01:35',
                executionMonitoringStartAt: '2020-07-29 01:09:01',
                executionMonitoringEndAt: '2020-07-29 08:46:46',
                numberMax: 6924646040,
                numberDays: 6399886768,
                success: 2780036226,
                cancelled: 8745854282,
                delivering: 1799222079,
                error: 8090157760,
                holding: 4242462946,
                toBeDelivered: 2327153468,
                waiting: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewWaiting must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: '6xnny46sys63e7ku8bgqehajay0yyc8gjq4mys3htcg0xbai7n',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'ekalyusnpjq64ra1e6o5',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 21:23:33',
                executionMonitoringStartAt: '2020-07-28 20:06:05',
                executionMonitoringEndAt: '2020-07-29 01:53:06',
                numberMax: 1056146649,
                numberDays: 6333303013,
                success: 6871512380,
                cancelled: 7908835004,
                delivering: 9600507058,
                error: 1747945942,
                holding: 6748016040,
                toBeDelivered: 4922210534,
                waiting: 6917716539,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'osq29te4ht7lp3xi1aqjd17wrrowyj7zjqcw18x36nvd7pkv60',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'yfg1bduanym0pkets7jq',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 04:54:37',
                executionMonitoringEndAt: '2020-07-29 11:04:24',
                numberMax: 3221423696,
                numberDays: 1789982429,
                success: 3722205462,
                cancelled: 2679521454,
                delivering: 4035074217,
                error: 6326583787,
                holding: 7157930720,
                toBeDelivered: 6624941692,
                waiting: 8011742795,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'tn297h47rox5v96xho3rxjj53sle55kcckvsq9vktw8axijq14',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 's7nd2s3hx1ln6fok7j3s',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 18:11:41',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 03:35:07',
                numberMax: 7862047720,
                numberDays: 1455035594,
                success: 6424080372,
                cancelled: 2059409833,
                delivering: 6846731925,
                error: 5543052913,
                holding: 2462210598,
                toBeDelivered: 4354930604,
                waiting: 6931384303,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: '5zictemwotfmd2vksmn9fsg7pg70x7v9ymp7kpxkj1zb27bt1h',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'irx18zhtpcuhfpnn6v7h',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:48:32',
                executionMonitoringStartAt: '2020-07-29 14:17:25',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 7890003714,
                numberDays: 1620558477,
                success: 3536142996,
                cancelled: 6637273762,
                delivering: 8419027935,
                error: 9573290052,
                holding: 1348280721,
                toBeDelivered: 2369111986,
                waiting: 6171333028,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: '4izof8fcv41wn64kd2wx0576morqlng8uprx6qlmoqa7u090yt',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: 'e4p58s69a5t5n8fabyrj',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:51:09',
                executionMonitoringStartAt: '2020-07-29 17:39:22',
                executionMonitoringEndAt: '2020-07-29 14:37:44',
                numberMax: 2201224461,
                numberDays: 7393233909,
                success: 4788959248,
                cancelled: 9299729080,
                delivering: 9392933929,
                error: 9764536363,
                holding: 3590505756,
                toBeDelivered: 8324460911,
                waiting: 2649094752,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/messages-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-overview/paginate')
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

    test(`/REST:GET bplus-it-sappi/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview')
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

    test(`/REST:GET bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '4b9751eb-76c3-400d-b329-d5d666b686c1'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4b9751eb-76c3-400d-b329-d5d666b686c1'));
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/4b9751eb-76c3-400d-b329-d5d666b686c1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4b9751eb-76c3-400d-b329-d5d666b686c1'));
    });

    test(`/REST:GET bplus-it-sappi/messages-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a38aa881-b702-4fc7-be99-121b654224c2',
                tenantId: '8e225e65-ba0d-480c-a140-d026cca2462a',
                tenantCode: 'vb3tga3095dp7c73iem02irycnivihpg8xsv4x9ywpsy2mkp21',
                systemId: '21254a35-f0c6-4eda-972f-3633a0d12a1b',
                systemName: '2p2c690eag7aw3u5kl0e',
                executionId: '3704440c-cf8e-4272-b440-08c7368ee174',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:38:29',
                executionMonitoringStartAt: '2020-07-29 01:08:45',
                executionMonitoringEndAt: '2020-07-29 14:41:27',
                numberMax: 7613590696,
                numberDays: 3577113194,
                success: 7879262320,
                cancelled: 8966604313,
                delivering: 6306015308,
                error: 8435493930,
                holding: 7439940873,
                toBeDelivered: 4790841167,
                waiting: 4506744471,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                tenantCode: 'gtlocnch0iu6osxsnp2j0cfnbjr0iuq2ixinicxxxpttmfxzsn',
                systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                systemName: '5kcz024mxpvqey6hd7f5',
                executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:22:47',
                executionMonitoringStartAt: '2020-07-29 11:11:45',
                executionMonitoringEndAt: '2020-07-29 12:02:48',
                numberMax: 6032130285,
                numberDays: 9632532953,
                success: 7918319069,
                cancelled: 6588442227,
                delivering: 2437632326,
                error: 9936791943,
                holding: 5598792415,
                toBeDelivered: 8627919884,
                waiting: 3890239033,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4b9751eb-76c3-400d-b329-d5d666b686c1'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/4b9751eb-76c3-400d-b329-d5d666b686c1')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateMessageOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageOverviewInput!)
                    {
                        bplusItSappiCreateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
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

    test(`/GraphQL bplusItSappiCreateMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageOverviewInput!)
                    {
                        bplusItSappiCreateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '109afe38-6b67-4884-bbf6-b209ae6690bf',
                        tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                        tenantCode: 'b6q3k7sm2cm66tiy5kj6pi9oeqggm8marbzbf8dd9uhl2vdbfh',
                        systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                        systemName: 'jreb60tfeyiat3e1kc36',
                        executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 16:46:20',
                        executionMonitoringStartAt: '2020-07-29 15:24:43',
                        executionMonitoringEndAt: '2020-07-28 18:28:49',
                        numberMax: 3689110718,
                        numberDays: 7452083458,
                        success: 3504448012,
                        cancelled: 3433310435,
                        delivering: 8225199257,
                        error: 5098228676,
                        holding: 2461829195,
                        toBeDelivered: 4080774590,
                        waiting: 5956181470,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', '109afe38-6b67-4884-bbf6-b209ae6690bf');
            });
    });

    test(`/GraphQL bplusItSappiPaginateMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateMessagesOverview (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateMessagesOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageOverview (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
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

    test(`/GraphQL bplusItSappiFindMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageOverview (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
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
                            value   : '4b9751eb-76c3-400d-b329-d5d666b686c1'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('4b9751eb-76c3-400d-b329-d5d666b686c1');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
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

    test(`/GraphQL bplusItSappiFindMessageOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4b9751eb-76c3-400d-b329-d5d666b686c1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('4b9751eb-76c3-400d-b329-d5d666b686c1');
            });
    });

    test(`/GraphQL bplusItSappiGetMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetMessagesOverview (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetMessagesOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageOverviewInput!)
                    {
                        bplusItSappiUpdateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd03bf81b-b90e-4bf6-8475-271221654298',
                        tenantId: '3d6c36c1-4dcd-4897-bb5e-49b0278199d0',
                        tenantCode: 'z18nvbcch2eku5g9mrolvbh7rmmzx8boc29yj5lu3dic6k1tbs',
                        systemId: '8e9d9b5a-522c-44f8-9e30-fbc23498f48d',
                        systemName: 'dbshqoaenktuqwjsec58',
                        executionId: '0b2adc0f-fdb6-4d50-886f-99203b462366',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 10:36:04',
                        executionMonitoringStartAt: '2020-07-28 18:52:25',
                        executionMonitoringEndAt: '2020-07-29 16:40:32',
                        numberMax: 7093494519,
                        numberDays: 2123624282,
                        success: 9754514891,
                        cancelled: 7981627123,
                        delivering: 4640558373,
                        error: 5087807595,
                        holding: 1599679720,
                        toBeDelivered: 4128231664,
                        waiting: 9300150135,
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

    test(`/GraphQL bplusItSappiUpdateMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageOverviewInput!)
                    {
                        bplusItSappiUpdateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4b9751eb-76c3-400d-b329-d5d666b686c1',
                        tenantId: 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312',
                        tenantCode: 'bw96mn7cxzmv4l66qug44j9ar9mxqwrhxgn5spzslz7hkrv2qz',
                        systemId: '9dae9920-e24c-4409-ae76-758f18f2a232',
                        systemName: 'c18rapmg1ax4f8efo4bn',
                        executionId: '75ea7065-f3a1-49f5-b4be-6ab9903268a9',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 22:14:31',
                        executionMonitoringStartAt: '2020-07-29 00:23:49',
                        executionMonitoringEndAt: '2020-07-28 18:22:43',
                        numberMax: 1514437684,
                        numberDays: 1815820484,
                        success: 3409899744,
                        cancelled: 8642402634,
                        delivering: 2197393625,
                        error: 2055934079,
                        holding: 4800393321,
                        toBeDelivered: 6279361846,
                        waiting: 6925898064,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('4b9751eb-76c3-400d-b329-d5d666b686c1');
            });
    });

    test(`/GraphQL bplusItSappiDeleteMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
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

    test(`/GraphQL bplusItSappiDeleteMessageOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4b9751eb-76c3-400d-b329-d5d666b686c1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('4b9751eb-76c3-400d-b329-d5d666b686c1');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});