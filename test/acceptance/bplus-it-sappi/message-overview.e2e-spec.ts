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
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'z4hailr7d5tzfcuk1ia4c5deu5g3ai3vmm1w8aeujvh82us0g1',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'j79a6oglk94zt965gaks',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:29:15',
                executionMonitoringStartAt: '2020-07-29 14:12:22',
                executionMonitoringEndAt: '2020-07-29 03:30:33',
                numberMax: 5625306535,
                numberDays: 3266962087,
                success: 9014217511,
                cancelled: 8420164341,
                delivering: 8212366691,
                error: 8684308638,
                holding: 5678982276,
                toBeDelivered: 4510509743,
                waiting: 3556939856,
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
                
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'lhuyrlhlxvudgijks70shmx5q2q3jwqsklsy18zpdqj232u3mr',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'u08w8k7n1w2lkwc0lpcc',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:05:48',
                executionMonitoringStartAt: '2020-07-29 15:40:10',
                executionMonitoringEndAt: '2020-07-29 08:00:18',
                numberMax: 3827208890,
                numberDays: 8122414987,
                success: 4755310349,
                cancelled: 5629525096,
                delivering: 5817752050,
                error: 2202710202,
                holding: 1516018011,
                toBeDelivered: 7415784531,
                waiting: 9664307923,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: null,
                tenantCode: 'ycfh2d8m2rqgxi0exvg3gi4hp2y5z0dl4pi4pra52lsk3vegok',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'izqd3cvzpibccbjmpgxh',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:38:19',
                executionMonitoringStartAt: '2020-07-29 09:29:52',
                executionMonitoringEndAt: '2020-07-29 06:37:39',
                numberMax: 9145458166,
                numberDays: 6101094065,
                success: 4802524916,
                cancelled: 7975707064,
                delivering: 2281861543,
                error: 7759957576,
                holding: 4270418026,
                toBeDelivered: 9241982822,
                waiting: 5222642218,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                
                tenantCode: 's62qzvivzqfd2fb1htmqgv864acnvc5j4m0w50hfjjc6o2b1pa',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'k5opkff7z6usnzyo1oi6',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:34:22',
                executionMonitoringStartAt: '2020-07-29 00:11:26',
                executionMonitoringEndAt: '2020-07-28 15:59:27',
                numberMax: 4904283367,
                numberDays: 8920367072,
                success: 3047761123,
                cancelled: 8751829772,
                delivering: 8065401153,
                error: 8966329175,
                holding: 3224299161,
                toBeDelivered: 7087310310,
                waiting: 9398496911,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: null,
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: '4pwyk10j5cdy4qgry39q',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:54:19',
                executionMonitoringStartAt: '2020-07-29 02:21:30',
                executionMonitoringEndAt: '2020-07-29 09:34:27',
                numberMax: 7048438069,
                numberDays: 1922141113,
                success: 8337363434,
                cancelled: 1163476139,
                delivering: 1192005200,
                error: 1563843325,
                holding: 4260944198,
                toBeDelivered: 5371270264,
                waiting: 7946499592,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'wquacik30vvke82weusl',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:34:03',
                executionMonitoringStartAt: '2020-07-28 18:55:45',
                executionMonitoringEndAt: '2020-07-28 21:23:33',
                numberMax: 7838555758,
                numberDays: 8591343860,
                success: 6572884192,
                cancelled: 7384170281,
                delivering: 6280199605,
                error: 4846928568,
                holding: 8498047902,
                toBeDelivered: 9568963963,
                waiting: 2559488937,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'jwgfwmpik5c5bf1a8rqnhtd4l4hawj43qn8etauby4y23d5voj',
                systemId: null,
                systemName: '26osdudp9u4i654gcgm3',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:12:14',
                executionMonitoringStartAt: '2020-07-29 02:11:36',
                executionMonitoringEndAt: '2020-07-28 20:11:09',
                numberMax: 4207865553,
                numberDays: 6246503316,
                success: 2003181386,
                cancelled: 8263525307,
                delivering: 2550603262,
                error: 1117455952,
                holding: 4333125828,
                toBeDelivered: 8107569138,
                waiting: 7894036036,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: '40h7gop5anlsipl18fy4720s4tphjqnzwrftv24rz28z7xb6oh',
                
                systemName: '6ruol6ffft68qtdlzm3k',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:06:37',
                executionMonitoringStartAt: '2020-07-29 11:00:39',
                executionMonitoringEndAt: '2020-07-28 23:30:23',
                numberMax: 9929261628,
                numberDays: 6191450496,
                success: 4323895539,
                cancelled: 4697784157,
                delivering: 1929171038,
                error: 8388188323,
                holding: 6069054616,
                toBeDelivered: 9366146467,
                waiting: 7513454665,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'lj3xj53kow2md714l7xyzi7xkp8flf2jxwdyycqp8po4zk1nw5',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: null,
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:57:17',
                executionMonitoringStartAt: '2020-07-29 06:00:56',
                executionMonitoringEndAt: '2020-07-29 14:36:26',
                numberMax: 1401487374,
                numberDays: 9943603374,
                success: 6051984109,
                cancelled: 8188906749,
                delivering: 6111113326,
                error: 6604493431,
                holding: 2597656875,
                toBeDelivered: 6600218724,
                waiting: 9343675655,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'toewvtxppchuytz824daxo1g5l88dlk1kb78tblk0bzr90n5y1',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:11:54',
                executionMonitoringStartAt: '2020-07-28 21:53:58',
                executionMonitoringEndAt: '2020-07-29 08:05:24',
                numberMax: 9560331139,
                numberDays: 7093708892,
                success: 5690162027,
                cancelled: 1794239902,
                delivering: 3783117862,
                error: 2742947061,
                holding: 4761418427,
                toBeDelivered: 7533970471,
                waiting: 1013034276,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'c6i89xxtqm7i6yf6k8uz9925ed6ubq1siyha45xcj5cuyuf6lf',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: '3c4fiaetlv1jgl6qxh8r',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:27:45',
                executionMonitoringStartAt: '2020-07-29 04:22:29',
                executionMonitoringEndAt: '2020-07-29 04:37:25',
                numberMax: 3644451968,
                numberDays: 8134336811,
                success: 4941368758,
                cancelled: 7839442519,
                delivering: 1184958393,
                error: 9620804523,
                holding: 8662363226,
                toBeDelivered: 9938119103,
                waiting: 9053241115,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: '43oylb3tgiczmvu8giazkgbsfierli1y54k5soyajyz98rsuqq',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'bgallw2db54z7vi9r8le',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:40:37',
                executionMonitoringStartAt: '2020-07-29 03:48:55',
                executionMonitoringEndAt: '2020-07-28 23:31:16',
                numberMax: 4274967300,
                numberDays: 8889399973,
                success: 7040086959,
                cancelled: 6095569337,
                delivering: 3613845346,
                error: 4998599292,
                holding: 1339273901,
                toBeDelivered: 6640548063,
                waiting: 9687732259,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'dxefwhger49nyarm6djr30qynxvj9wx406cj8w72kybnv0sppd',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'hajq7o4dm8yrvqh4w5pr',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: null,
                executionExecutedAt: '2020-07-28 20:50:28',
                executionMonitoringStartAt: '2020-07-29 11:41:37',
                executionMonitoringEndAt: '2020-07-29 00:32:11',
                numberMax: 3777751548,
                numberDays: 9050746234,
                success: 5399995273,
                cancelled: 4986094019,
                delivering: 6927435850,
                error: 8538386052,
                holding: 5134226131,
                toBeDelivered: 9189815477,
                waiting: 2105078169,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: '99bq9ahagai2tn1c1kmd4mwsv7lb8zxwk0huqnnw8rtbfc4otn',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: '9kh6yrvjwnjn03txc3pn',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                
                executionExecutedAt: '2020-07-29 15:23:05',
                executionMonitoringStartAt: '2020-07-28 21:14:35',
                executionMonitoringEndAt: '2020-07-29 11:21:59',
                numberMax: 1263894968,
                numberDays: 7548644032,
                success: 8475131357,
                cancelled: 4077852251,
                delivering: 6697581788,
                error: 8410321400,
                holding: 2130753141,
                toBeDelivered: 7234268353,
                waiting: 4100045451,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'ky8jdtq9jvklwc8z3ydyi91mhx5yelnuousfka5mtp1534e31z',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'p464wsbzztk1pv0dasgn',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 07:47:19',
                executionMonitoringEndAt: '2020-07-29 09:33:06',
                numberMax: 1006887923,
                numberDays: 8425649991,
                success: 6821787735,
                cancelled: 9904696335,
                delivering: 7026179023,
                error: 5477244312,
                holding: 7474940755,
                toBeDelivered: 5308221777,
                waiting: 1230788814,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: '4xiy35knanoklutperfrkzyv0rpp89x8lklqaap1e9uwsqy042',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'b1f5wbx2mgv49ko89fe9',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 12:35:06',
                executionMonitoringEndAt: '2020-07-28 21:08:44',
                numberMax: 5567909317,
                numberDays: 2278485137,
                success: 2553960899,
                cancelled: 1952228270,
                delivering: 7288471783,
                error: 1276901259,
                holding: 2783933492,
                toBeDelivered: 7551019314,
                waiting: 8250427542,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'slemuzwf7p6vsogil04qmuwkakxh30sbhn634yfc3eb4il6hsn',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'm51c9scgwrihj06te8eg',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:13:45',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 16:15:34',
                numberMax: 2802244894,
                numberDays: 1627508672,
                success: 2117713231,
                cancelled: 7311150630,
                delivering: 4351923292,
                error: 7047031912,
                holding: 5202065070,
                toBeDelivered: 9100343367,
                waiting: 4077525612,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'p4s2ihbtoqmuid8ln0d4az79uo77k3shmrr7oufk7a9sg8pzca',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: '042durvfv29fyfl1u1sd',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:00:25',
                
                executionMonitoringEndAt: '2020-07-29 07:45:06',
                numberMax: 3011207053,
                numberDays: 7499856825,
                success: 7496289015,
                cancelled: 9660047133,
                delivering: 3840641864,
                error: 3119091682,
                holding: 1291437452,
                toBeDelivered: 2885912663,
                waiting: 7947327939,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'iy3aw8v3e1pgt6tm16m52ltemry9yhwp84boeedcp656niqxxr',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'poti1tnawl4vyhuaeh2y',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:22:43',
                executionMonitoringStartAt: '2020-07-29 00:42:55',
                executionMonitoringEndAt: null,
                numberMax: 8079064453,
                numberDays: 5453932192,
                success: 1696411582,
                cancelled: 3033797142,
                delivering: 9088309427,
                error: 7861131550,
                holding: 1663825507,
                toBeDelivered: 7980827787,
                waiting: 4857236210,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'zpqb0m8qxi901tj4nvgsvw46tsih1efo4uter2uds2761sabfz',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'ler0kbpwmf68kpg2cxkp',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:19:13',
                executionMonitoringStartAt: '2020-07-29 01:34:04',
                
                numberMax: 2755829203,
                numberDays: 2727585495,
                success: 1802801343,
                cancelled: 5638761015,
                delivering: 3706789691,
                error: 4803078023,
                holding: 2055832530,
                toBeDelivered: 7224583966,
                waiting: 2156345970,
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
                id: 'jna0td86ajb8jjxiasmfnnw8lletyjw73pgif',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: '4uv1x4q1zwj1daacsw1s2yu713vo091bgx49do2y9gtrfixi8g',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: '0v53arw4h2f41aqetsha',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:49:01',
                executionMonitoringStartAt: '2020-07-29 14:22:34',
                executionMonitoringEndAt: '2020-07-29 11:29:48',
                numberMax: 2752794020,
                numberDays: 5421229268,
                success: 1240897015,
                cancelled: 4945169018,
                delivering: 6214816355,
                error: 4213536057,
                holding: 8652091359,
                toBeDelivered: 8251478992,
                waiting: 4588951707,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '8l9r8xh48t06sznrn7q1qs5f3q9phg3kplrmm',
                tenantCode: 'b5rg4caetj62r9btd1i1qndtd0djkwrge6e22snjf62cmiiu89',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'eie742tt1rine2q4l3zw',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:31:42',
                executionMonitoringStartAt: '2020-07-29 08:42:04',
                executionMonitoringEndAt: '2020-07-29 14:52:47',
                numberMax: 7378648922,
                numberDays: 6575434980,
                success: 2481630809,
                cancelled: 2835733356,
                delivering: 3921077216,
                error: 3732165872,
                holding: 3442772892,
                toBeDelivered: 8964407591,
                waiting: 1396783122,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'ehsqwj93kikl2ced45otel27a45kelz4gpa32a5abhyqrvo7lm',
                systemId: '7vldb3eesybnzoj439k87et4vku9zvc6j6y1f',
                systemName: 'nv4557gsvi93ve3n8wjo',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:09:55',
                executionMonitoringStartAt: '2020-07-29 03:07:22',
                executionMonitoringEndAt: '2020-07-29 01:37:15',
                numberMax: 1988893040,
                numberDays: 1790437176,
                success: 7056184034,
                cancelled: 1452287725,
                delivering: 8319376583,
                error: 9008199837,
                holding: 6812226330,
                toBeDelivered: 2561213464,
                waiting: 3104386840,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'e15wz74vmrockl2ugifelf0z2o43t5tt96v2v77z6988e4zo56',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'dbornubbu5xh313y2ppf',
                executionId: 'uxaz53espt1wscqmqguevfqxscfp8r10njgsb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:56:52',
                executionMonitoringStartAt: '2020-07-29 10:34:56',
                executionMonitoringEndAt: '2020-07-29 09:41:27',
                numberMax: 1388672663,
                numberDays: 7856522914,
                success: 8557051073,
                cancelled: 3527582154,
                delivering: 2220470227,
                error: 5895152614,
                holding: 5426718648,
                toBeDelivered: 8411884578,
                waiting: 9093051024,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'fr6wqtweqflxpmq5n322h73saoa9xr4lqb7lodybeljmpsffsra',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: '3yei3rkom69c0ic26wts',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:16:44',
                executionMonitoringStartAt: '2020-07-29 08:39:47',
                executionMonitoringEndAt: '2020-07-28 16:48:19',
                numberMax: 3875966416,
                numberDays: 4123476040,
                success: 2538289931,
                cancelled: 6358438763,
                delivering: 3947560893,
                error: 4858276824,
                holding: 8546362779,
                toBeDelivered: 3029566954,
                waiting: 3753199180,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: '7zj42xx0g0puy7a4dbqad66rvnw23o1qb9yvblq5xckjp4duy0',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: '1yiofbj6baezuc77jm0ke',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:21:33',
                executionMonitoringStartAt: '2020-07-28 16:57:23',
                executionMonitoringEndAt: '2020-07-28 21:44:01',
                numberMax: 3722814906,
                numberDays: 3582751947,
                success: 1169592860,
                cancelled: 1609273823,
                delivering: 1801862492,
                error: 7758336069,
                holding: 8554031849,
                toBeDelivered: 6495071157,
                waiting: 7590502918,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: '8b5a7gu1rabreibs57upco9rp3dr7x29cnlc00qabgw9p1uh6t',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: '7solgm4ahrucog9x51lg',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:37:22',
                executionMonitoringStartAt: '2020-07-29 04:40:58',
                executionMonitoringEndAt: '2020-07-28 18:50:48',
                numberMax: 96108065634,
                numberDays: 5469208460,
                success: 3844717683,
                cancelled: 9751193931,
                delivering: 3233002940,
                error: 7112302035,
                holding: 2278111982,
                toBeDelivered: 5574945260,
                waiting: 9112908992,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'owcewm5lpvltmzhv1r4ckxlkz6t0ic9y1gxpbu8m16qr3nso91',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'ew5jg4wq1ymtvcsaoq3u',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:48:11',
                executionMonitoringStartAt: '2020-07-29 12:42:59',
                executionMonitoringEndAt: '2020-07-29 14:20:30',
                numberMax: 6105537678,
                numberDays: 64771722660,
                success: 4022860686,
                cancelled: 3355000489,
                delivering: 3699528959,
                error: 8062726019,
                holding: 2305723626,
                toBeDelivered: 2313261872,
                waiting: 3307361997,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: '3eri5cmx10na7p3udxngn6aqngo0xgyi7mlpfyaiugdk06e9im',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'grpz04nj8dqp6ym25kmh',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:33:25',
                executionMonitoringStartAt: '2020-07-29 02:03:26',
                executionMonitoringEndAt: '2020-07-29 14:27:55',
                numberMax: 5497338975,
                numberDays: 3553796681,
                success: 28025517633,
                cancelled: 9831779900,
                delivering: 4417121046,
                error: 2541511327,
                holding: 2102648975,
                toBeDelivered: 3328213712,
                waiting: 5283887063,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'diz8wvq7xupxpsvf5qtkwedo5skyhxq0mcwiwh2z475m8wkkz5',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: '3ulcag90dvpfnklszc1w',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:34:55',
                executionMonitoringStartAt: '2020-07-29 05:42:04',
                executionMonitoringEndAt: '2020-07-29 06:14:27',
                numberMax: 5469146138,
                numberDays: 6892919104,
                success: 1606288444,
                cancelled: 29251560584,
                delivering: 4437228616,
                error: 2875658447,
                holding: 5614591311,
                toBeDelivered: 1537047686,
                waiting: 7184424193,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: '02m7qr8k0f680wbhnpu0r3dnp4ut6rlzifg3oo23psbm6sg1vo',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'iom2ujhcfcx9r48dx85h',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:07:16',
                executionMonitoringStartAt: '2020-07-29 02:54:42',
                executionMonitoringEndAt: '2020-07-28 20:59:33',
                numberMax: 2745770590,
                numberDays: 7381764650,
                success: 5017688353,
                cancelled: 7652259745,
                delivering: 48046455073,
                error: 3484852711,
                holding: 4396963310,
                toBeDelivered: 2760849917,
                waiting: 4054496426,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'orzkr5nq4pwzwjvmqzo1yf4fark9x1txlvtjkgkv8r7rknuxjt',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: '48apleomy87z1zn4in3y',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:04:31',
                executionMonitoringStartAt: '2020-07-29 09:10:31',
                executionMonitoringEndAt: '2020-07-28 23:08:50',
                numberMax: 8115848419,
                numberDays: 8458323210,
                success: 4646034513,
                cancelled: 7449181696,
                delivering: 1170559341,
                error: 57304824433,
                holding: 3442868829,
                toBeDelivered: 3115747928,
                waiting: 8047378328,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'hggg6weuy1vwnorfbpa9t1br5t4grq860m7nsm9vyyelqo4tp9',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'mlkoxaxqtfdz0cud8yo5',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:28:47',
                executionMonitoringStartAt: '2020-07-28 19:58:34',
                executionMonitoringEndAt: '2020-07-29 06:04:27',
                numberMax: 6487446990,
                numberDays: 1329166630,
                success: 7264053629,
                cancelled: 3179867230,
                delivering: 2735876042,
                error: 7496938640,
                holding: 21847592485,
                toBeDelivered: 2287634930,
                waiting: 3365500506,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: '5c3xkg2l66dtqev6np590u05i7sxjt7prp7ezhtw6fh2q72f8s',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'ozwr0wq140w7oqb0h8o1',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:15:12',
                executionMonitoringStartAt: '2020-07-29 03:11:24',
                executionMonitoringEndAt: '2020-07-29 13:25:26',
                numberMax: 9090783543,
                numberDays: 3396348510,
                success: 5269857730,
                cancelled: 6009809294,
                delivering: 8265749337,
                error: 6982506182,
                holding: 7523067804,
                toBeDelivered: 92522226282,
                waiting: 5140698953,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'y333ptww6xw0g8523lwq4fzr6mdq0ku5g3qg66lskngmtgn41y',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'dqkqf938mhbxph4250nl',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:38:16',
                executionMonitoringStartAt: '2020-07-29 12:44:23',
                executionMonitoringEndAt: '2020-07-28 18:07:45',
                numberMax: 7618586163,
                numberDays: 1998438225,
                success: 1638010294,
                cancelled: 4388044580,
                delivering: 8805939204,
                error: 5344028228,
                holding: 1579936193,
                toBeDelivered: 8176253068,
                waiting: 72778748155,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'afjwyuvljv8dwwl4gp6u8w5r7ndgkq70nbza3lx1rlvqo9r92q',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: '5alr32ah6an8r4lafqtd',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:00:18',
                executionMonitoringStartAt: '2020-07-28 16:33:59',
                executionMonitoringEndAt: '2020-07-28 18:01:12',
                numberMax: -9,
                numberDays: 3609640759,
                success: 3009734649,
                cancelled: 5573606189,
                delivering: 2260023042,
                error: 5369943832,
                holding: 7105677546,
                toBeDelivered: 5332010746,
                waiting: 9227742925,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'k80ninqcnd6we5d6h24p31ziwsvns1opqau4g4o5p8xgxf9qgh',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'rqnvcptd2e7y3fixr4u6',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:19:09',
                executionMonitoringStartAt: '2020-07-29 13:38:38',
                executionMonitoringEndAt: '2020-07-29 06:32:36',
                numberMax: 4622164255,
                numberDays: -9,
                success: 2012290243,
                cancelled: 5498133200,
                delivering: 2557315563,
                error: 5256733477,
                holding: 8789202071,
                toBeDelivered: 1912040908,
                waiting: 3734924655,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'v9a4tyiwyyw8etv8i6usa39sscl199cbci0elmt9o00nnl7inc',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'l8ybxv199csagnqn64io',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:54:49',
                executionMonitoringStartAt: '2020-07-29 02:04:51',
                executionMonitoringEndAt: '2020-07-28 16:54:02',
                numberMax: 1182278943,
                numberDays: 1842844047,
                success: -9,
                cancelled: 5306000552,
                delivering: 4782075669,
                error: 4159665052,
                holding: 4940336982,
                toBeDelivered: 7665409113,
                waiting: 8085142033,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'b396r37d73qozftkztk6v8xn9d8866iww4xk90crh1l0t65yiv',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'e8rmz68mu6feck9jzpgz',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:19:43',
                executionMonitoringStartAt: '2020-07-28 20:32:08',
                executionMonitoringEndAt: '2020-07-29 11:21:08',
                numberMax: 3514321369,
                numberDays: 1214319714,
                success: 3203414810,
                cancelled: -9,
                delivering: 9600828072,
                error: 6911297255,
                holding: 7524430400,
                toBeDelivered: 9450111620,
                waiting: 3608419315,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'qd12tqebt59ehalaxzvxav1bwy4rp1kku4pd7vla2qw30avybx',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'euskzok6tplp3p9k817x',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:26:26',
                executionMonitoringStartAt: '2020-07-28 20:28:28',
                executionMonitoringEndAt: '2020-07-29 12:00:07',
                numberMax: 5178952484,
                numberDays: 4193134911,
                success: 6086073116,
                cancelled: 8886427460,
                delivering: -9,
                error: 2243569009,
                holding: 1122435065,
                toBeDelivered: 3076170439,
                waiting: 2697382365,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: '1wiljw58kbazlu13d75c15hp4a44829j6nofqhkhsznsb3kgcz',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: '3ecb2r5ifvslpqpsdnxc',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:27:35',
                executionMonitoringStartAt: '2020-07-29 04:45:06',
                executionMonitoringEndAt: '2020-07-29 03:50:43',
                numberMax: 7107002128,
                numberDays: 2427236269,
                success: 6930891108,
                cancelled: 1654429573,
                delivering: 9336813457,
                error: -9,
                holding: 3485774458,
                toBeDelivered: 2176507578,
                waiting: 5230136646,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'wx5uvov1yhckjepgus19n68iyyd0vkeafem4zc5fxvds16ek3c',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'ja70bjoybxxyewu6ouc6',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:54:12',
                executionMonitoringStartAt: '2020-07-28 22:33:50',
                executionMonitoringEndAt: '2020-07-29 01:28:06',
                numberMax: 5568946238,
                numberDays: 4757454427,
                success: 6469686622,
                cancelled: 9917313987,
                delivering: 1961983371,
                error: 8675677792,
                holding: -9,
                toBeDelivered: 8812381279,
                waiting: 4826256356,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: '2hwj79ecq5w1niznuhqsfx083lx60dm5cjjeh65uc2uvurvwwb',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: '0s3ytd1rzh0x2u2wmlyo',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:56:44',
                executionMonitoringStartAt: '2020-07-29 14:54:28',
                executionMonitoringEndAt: '2020-07-29 08:14:50',
                numberMax: 4757659426,
                numberDays: 1767151703,
                success: 9133042020,
                cancelled: 7862702339,
                delivering: 2749901147,
                error: 1594604843,
                holding: 7207409039,
                toBeDelivered: -9,
                waiting: 8934249200,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'n1m6yvvue5gcip00pfc0x5i37rfu5o3awm3b7cilqfj9dcn79o',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'p6io9b6c1dxk2haz57aw',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:13:16',
                executionMonitoringStartAt: '2020-07-28 18:17:38',
                executionMonitoringEndAt: '2020-07-29 11:25:36',
                numberMax: 7111837973,
                numberDays: 4889764918,
                success: 6232061038,
                cancelled: 5166584844,
                delivering: 8275209971,
                error: 8250160593,
                holding: 3728604044,
                toBeDelivered: 1016544417,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'kctfh9u13mrfxl6hb3835v01k5ye6uk7te7tl04y6aen8pw9me',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'q1jyqfl3cm7dgtlhomrq',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 08:22:20',
                executionMonitoringStartAt: '2020-07-28 17:48:16',
                executionMonitoringEndAt: '2020-07-29 01:45:36',
                numberMax: 9834116866,
                numberDays: 9631149115,
                success: 3026368373,
                cancelled: 6165643135,
                delivering: 4961773840,
                error: 8232656202,
                holding: 1990030844,
                toBeDelivered: 8935316825,
                waiting: 9390838360,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'sgonyge3hd26ofv7619xkzf5t048r7jslzjm5extqbvrz29cxw',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'kd6doikavki6mffb5uj1',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 04:12:28',
                executionMonitoringEndAt: '2020-07-29 06:43:31',
                numberMax: 7735490589,
                numberDays: 1854014845,
                success: 8807615909,
                cancelled: 1250445102,
                delivering: 9386498564,
                error: 1542140855,
                holding: 3319801405,
                toBeDelivered: 5332122908,
                waiting: 8095893328,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'cugsiir14csy34jpxoc9lv76pjwpde315abvsxhftpnbvr9c8c',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'qaw3gqi8zbz1snetosvk',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:29:13',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 06:03:30',
                numberMax: 8922933022,
                numberDays: 7499526543,
                success: 2898918620,
                cancelled: 2487961505,
                delivering: 9760138519,
                error: 6044178752,
                holding: 6468093915,
                toBeDelivered: 1522596349,
                waiting: 3754628503,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: '55dzap44stf3pfpx5gv3zsv21s9gdy0u7fxysn3ot89qjftl2i',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: '3mt52jon746nlma8xso6',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:05:02',
                executionMonitoringStartAt: '2020-07-28 17:23:39',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 5279440619,
                numberDays: 1526824100,
                success: 8523711761,
                cancelled: 1083257757,
                delivering: 5338614363,
                error: 6237774772,
                holding: 9180264384,
                toBeDelivered: 7916796624,
                waiting: 5652719249,
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
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'l1d2u33x50wdk46a4irb6rr4hw1j28qf67osaly4raln9bn84d',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'mo28ukk8g1nmtgf5gzs5',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:22:05',
                executionMonitoringStartAt: '2020-07-29 07:49:08',
                executionMonitoringEndAt: '2020-07-29 11:24:36',
                numberMax: 4842348586,
                numberDays: 1307447814,
                success: 3983206716,
                cancelled: 8605311947,
                delivering: 9889067524,
                error: 7988530868,
                holding: 5545134852,
                toBeDelivered: 7110313443,
                waiting: 8771314321,
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
                        value   : '2fa74207-ad80-4aad-8b45-6dd35139377c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2fa74207-ad80-4aad-8b45-6dd35139377c'));
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
            .get('/bplus-it-sappi/message-overview/2fa74207-ad80-4aad-8b45-6dd35139377c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2fa74207-ad80-4aad-8b45-6dd35139377c'));
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
                
                id: '4a80f16f-9479-42a5-9bd5-d090536bb57d',
                tenantId: '4527fb72-ba14-4c0a-a043-72db4918f5e3',
                tenantCode: '0ifrb35we8admne134sxi5my5ls9ft9qk6bup5wv6b2swfsc0h',
                systemId: '82507aed-2e09-46fd-b884-eb18d9cac270',
                systemName: 'x0d3e1a1y8m7eilhdtot',
                executionId: '6ea78be7-a3b1-4751-8ad9-f944e1697bc7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:47:00',
                executionMonitoringStartAt: '2020-07-29 02:03:33',
                executionMonitoringEndAt: '2020-07-29 05:01:55',
                numberMax: 8931423733,
                numberDays: 1861296478,
                success: 7901413103,
                cancelled: 1400682159,
                delivering: 4610692854,
                error: 2760883494,
                holding: 7309114474,
                toBeDelivered: 6996735041,
                waiting: 2852290820,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                tenantCode: 'wy2orksoww8358r4tqsn15z35svaq50iw4buj49njwbsowoe1x',
                systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                systemName: 'zy27b32r0kxkhnn48cy5',
                executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:17:11',
                executionMonitoringStartAt: '2020-07-29 12:32:06',
                executionMonitoringEndAt: '2020-07-28 19:54:52',
                numberMax: 9091203683,
                numberDays: 1474680619,
                success: 4134502086,
                cancelled: 3026804188,
                delivering: 3685763666,
                error: 9959791362,
                holding: 7759431850,
                toBeDelivered: 7309887646,
                waiting: 1578090487,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2fa74207-ad80-4aad-8b45-6dd35139377c'));
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
            .delete('/bplus-it-sappi/message-overview/2fa74207-ad80-4aad-8b45-6dd35139377c')
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
                        id: '17870ea4-e0cd-4a2a-9a1e-48b2a7b9eb2a',
                        tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                        tenantCode: 'k7yj8bj5uyu5g0udf3q990qop4gz8wf33xat1ubdu40knqlu0s',
                        systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                        systemName: 'kmxrt6mu4uewlaqz2n4x',
                        executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 12:56:25',
                        executionMonitoringStartAt: '2020-07-28 18:18:42',
                        executionMonitoringEndAt: '2020-07-28 21:21:15',
                        numberMax: 1493872580,
                        numberDays: 6178882919,
                        success: 3196697680,
                        cancelled: 9238200367,
                        delivering: 7150595464,
                        error: 9716132915,
                        holding: 7961750339,
                        toBeDelivered: 7952528188,
                        waiting: 6432603643,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', '17870ea4-e0cd-4a2a-9a1e-48b2a7b9eb2a');
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
                            value   : '2fa74207-ad80-4aad-8b45-6dd35139377c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('2fa74207-ad80-4aad-8b45-6dd35139377c');
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
                    id: '2fa74207-ad80-4aad-8b45-6dd35139377c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('2fa74207-ad80-4aad-8b45-6dd35139377c');
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
                        
                        id: '48422850-f694-428a-9198-121acaa00328',
                        tenantId: '508c5df6-ffb3-46fd-b8fb-ec280f4d0e11',
                        tenantCode: 'qjjzt0bfyffvdyh4ep9pd7pescfjzliyu98hyp87rgu9g7cqxx',
                        systemId: '6e63545d-8fb0-4e35-bb9e-e303e0a05bfc',
                        systemName: 'uzg9y3mgarpbagusybrp',
                        executionId: '7b7bd07c-c4a2-462e-a2b0-0ae8cc99b1a1',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-28 17:41:45',
                        executionMonitoringStartAt: '2020-07-29 07:50:55',
                        executionMonitoringEndAt: '2020-07-29 09:45:22',
                        numberMax: 7875002381,
                        numberDays: 6250347492,
                        success: 9138109355,
                        cancelled: 6324783451,
                        delivering: 1695047677,
                        error: 6434084780,
                        holding: 1202913992,
                        toBeDelivered: 2515456359,
                        waiting: 1647302047,
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
                        
                        id: '2fa74207-ad80-4aad-8b45-6dd35139377c',
                        tenantId: '9619efb9-5eb6-47cd-9513-83e570c0ca12',
                        tenantCode: '1606vq8bxolvlhuyv0707j6x5jnc242dd3owsafyhc4r45wk5i',
                        systemId: '2eaacdf1-212d-45a1-910b-aef71b4a7b93',
                        systemName: '86bja2kwjunbnh7ivgx8',
                        executionId: 'd6d32e2b-0ffe-4cd8-bc90-b40ed36e55e2',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 11:55:15',
                        executionMonitoringStartAt: '2020-07-29 04:42:52',
                        executionMonitoringEndAt: '2020-07-29 05:39:14',
                        numberMax: 8053394544,
                        numberDays: 5297900138,
                        success: 8359048545,
                        cancelled: 9030290579,
                        delivering: 4434980985,
                        error: 2316396671,
                        holding: 3716796676,
                        toBeDelivered: 3390778607,
                        waiting: 9584557999,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('2fa74207-ad80-4aad-8b45-6dd35139377c');
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
                    id: '2fa74207-ad80-4aad-8b45-6dd35139377c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('2fa74207-ad80-4aad-8b45-6dd35139377c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});