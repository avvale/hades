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
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: '6tyodxvana0xhktjdry5j98vd71lxfjvq7d3bv8lv845yfdow6',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'w24494kvc3kepl8u57ty',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 12:33:31',
                executionMonitoringStartAt: '2020-08-03 00:41:17',
                executionMonitoringEndAt: '2020-08-03 07:27:00',
                numberMax: 2584294323,
                numberDays: 7123171052,
                success: 5185868213,
                cancelled: 8724126826,
                delivering: 5810398254,
                error: 1734589757,
                holding: 1926857200,
                toBeDelivered: 7555411858,
                waiting: 7433321333,
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
                
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'gbolcrhquoo1vssdmb720br7vlkhwka9tzw909ocjl3togrhii',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: '8fsjuesy7sa89uglwk3s',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 04:30:58',
                executionMonitoringStartAt: '2020-08-03 03:29:57',
                executionMonitoringEndAt: '2020-08-03 10:44:14',
                numberMax: 9740216713,
                numberDays: 5031535595,
                success: 1451443164,
                cancelled: 8881910033,
                delivering: 3829532817,
                error: 6978366127,
                holding: 6835444373,
                toBeDelivered: 2715623763,
                waiting: 4333949109,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: null,
                tenantCode: 'z6notx3t4oej563gbkxhiky8d8h9hrd4p6erimv92kht5mruxj',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'w6m9wzx7zj1xqkfaonyk',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 19:11:53',
                executionMonitoringStartAt: '2020-08-02 23:06:55',
                executionMonitoringEndAt: '2020-08-03 06:32:31',
                numberMax: 3656367386,
                numberDays: 8464332393,
                success: 6878798365,
                cancelled: 7310356706,
                delivering: 7917486587,
                error: 8257848087,
                holding: 1284661781,
                toBeDelivered: 7814964017,
                waiting: 4946512600,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                
                tenantCode: 'icil1hboyqbr752kp6g6v6ukr32lj6dft0guio6ii5ovr83tym',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: '24oa9x17budlsl7eqpfe',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:50:47',
                executionMonitoringStartAt: '2020-08-03 06:01:14',
                executionMonitoringEndAt: '2020-08-02 21:43:34',
                numberMax: 5830343786,
                numberDays: 1808644567,
                success: 4774852945,
                cancelled: 9123832399,
                delivering: 3017660304,
                error: 8063577150,
                holding: 4560096649,
                toBeDelivered: 7897164667,
                waiting: 5512067934,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: null,
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'ekthogl1gb1iit3wjs63',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 08:06:14',
                executionMonitoringStartAt: '2020-08-03 11:27:42',
                executionMonitoringEndAt: '2020-08-02 19:54:15',
                numberMax: 8136760096,
                numberDays: 1472748160,
                success: 8655384077,
                cancelled: 2615724058,
                delivering: 2813592555,
                error: 7335291503,
                holding: 3041376432,
                toBeDelivered: 7985161370,
                waiting: 9967813507,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: '5mbyuiei8lcg1x217z4r',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 04:12:06',
                executionMonitoringStartAt: '2020-08-02 22:12:22',
                executionMonitoringEndAt: '2020-08-03 15:57:41',
                numberMax: 4334389544,
                numberDays: 4697783841,
                success: 1723789959,
                cancelled: 3704647509,
                delivering: 6502217879,
                error: 4922280877,
                holding: 6749226311,
                toBeDelivered: 6737585652,
                waiting: 1879505026,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'u6g99g9joyziwa6gry9xthzyfoumlnd2grav46xhyfu46txz6m',
                systemId: null,
                systemName: '6vh4q579b68397we0dlp',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 00:47:02',
                executionMonitoringStartAt: '2020-08-03 07:33:49',
                executionMonitoringEndAt: '2020-08-03 14:26:45',
                numberMax: 6028467941,
                numberDays: 6171265043,
                success: 9498864573,
                cancelled: 9850856947,
                delivering: 6405448936,
                error: 1132295541,
                holding: 4347154132,
                toBeDelivered: 6383659953,
                waiting: 9077167899,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'ecdeekldq6f2aa5gcls8z2182ea58q3tl9tkd5s89unq79twdh',
                
                systemName: '89ep98bo5nadb5eyc8js',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:50:47',
                executionMonitoringStartAt: '2020-08-02 18:39:10',
                executionMonitoringEndAt: '2020-08-03 14:49:56',
                numberMax: 3107101393,
                numberDays: 2560643762,
                success: 8777578726,
                cancelled: 2068096329,
                delivering: 7441794287,
                error: 3853694407,
                holding: 7280106303,
                toBeDelivered: 6511105355,
                waiting: 6869815445,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: '6w4aq0f349jvd7yb8wa8y1owrhqjsrqp8uykyj3k1cns15oisv',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: null,
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 19:52:11',
                executionMonitoringStartAt: '2020-08-03 11:47:16',
                executionMonitoringEndAt: '2020-08-03 16:11:38',
                numberMax: 9383466571,
                numberDays: 2066993364,
                success: 6262239166,
                cancelled: 5528654622,
                delivering: 2505339650,
                error: 4245307607,
                holding: 6361819396,
                toBeDelivered: 4183671184,
                waiting: 2885339702,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'hoy1g7v18iih20vio65wo4cueld92djvqf40orpeyjwzmxjzgu',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 19:46:26',
                executionMonitoringStartAt: '2020-08-03 17:26:25',
                executionMonitoringEndAt: '2020-08-03 18:04:06',
                numberMax: 8268120053,
                numberDays: 5168631472,
                success: 1286958478,
                cancelled: 7186995548,
                delivering: 9627528417,
                error: 4146546615,
                holding: 7593165972,
                toBeDelivered: 9572504237,
                waiting: 4368803122,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'dh9ie90567hwieq7wt9ciivt4uhqfbnajnl8sqps7hdbl559dm',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'p0b6pwelenle962xwr01',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 10:43:54',
                executionMonitoringStartAt: '2020-08-03 08:07:19',
                executionMonitoringEndAt: '2020-08-03 05:22:14',
                numberMax: 9895655103,
                numberDays: 8204735644,
                success: 6295209156,
                cancelled: 1156968630,
                delivering: 2543456495,
                error: 8640284141,
                holding: 9928186599,
                toBeDelivered: 3191516154,
                waiting: 6145340905,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'q5ckuohqhqf9sfmffegiwntp06ecmx0wd1clekewsrufdggf58',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'ieldmo3l63webgqapew3',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:16:18',
                executionMonitoringStartAt: '2020-08-03 08:23:57',
                executionMonitoringEndAt: '2020-08-03 00:19:18',
                numberMax: 2332015836,
                numberDays: 5942099476,
                success: 3228119167,
                cancelled: 3766073096,
                delivering: 3104136419,
                error: 2203414210,
                holding: 1237244737,
                toBeDelivered: 9318977241,
                waiting: 2512316082,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'y6ybgzycyr4ki6dvaszvs0eq2i1qet3xblrs4xt728uju50quv',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: '0cob3ruwo66880j03gtn',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: null,
                executionExecutedAt: '2020-08-03 11:26:14',
                executionMonitoringStartAt: '2020-08-02 19:05:02',
                executionMonitoringEndAt: '2020-08-02 22:05:26',
                numberMax: 8181926896,
                numberDays: 7007261243,
                success: 3076507602,
                cancelled: 6180806886,
                delivering: 5392810163,
                error: 7782810051,
                holding: 3758847179,
                toBeDelivered: 3766482681,
                waiting: 3600150892,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'bghj3jkbzgzb2wowx7ht4tocv2fy5welv0c3y2j9hidfpjridu',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: '2eicf42rsbcq2bvdtay1',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                
                executionExecutedAt: '2020-08-03 17:15:04',
                executionMonitoringStartAt: '2020-08-02 20:17:56',
                executionMonitoringEndAt: '2020-08-03 00:04:13',
                numberMax: 5030588167,
                numberDays: 6167643304,
                success: 3354030694,
                cancelled: 7883988224,
                delivering: 2640087863,
                error: 7313427965,
                holding: 5917817449,
                toBeDelivered: 1120934614,
                waiting: 8898477275,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'xbwtyguuyz10ccy619ct02165vy825pg0r9cmu5be1u6b1ohbl',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'fqkyejj4igd3si7vo0tf',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-03 14:55:31',
                executionMonitoringEndAt: '2020-08-02 23:27:27',
                numberMax: 9776828318,
                numberDays: 7558358524,
                success: 5230092774,
                cancelled: 6861397448,
                delivering: 7883832696,
                error: 9448120027,
                holding: 9291935277,
                toBeDelivered: 4705981839,
                waiting: 2801366425,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: '1gganmlum423yugos5ifn0pnbel7hle6leumrajx3w2hs6n6ln',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'dkcd2pya2d7ifgmc0cq8',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-08-03 06:19:18',
                executionMonitoringEndAt: '2020-08-03 16:24:31',
                numberMax: 9307567910,
                numberDays: 2556477089,
                success: 3056892729,
                cancelled: 4054303557,
                delivering: 6070616349,
                error: 9700326650,
                holding: 5129082756,
                toBeDelivered: 9457446459,
                waiting: 2469986445,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'q5fp8dbcx0j4s4yvqzjv6ad1eh6npgwxnj40j8251o7tapt9vv',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'a8zn927u7bpy2hs779fh',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 09:05:07',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-02 20:10:56',
                numberMax: 4385350340,
                numberDays: 9611690983,
                success: 5879064926,
                cancelled: 1703756300,
                delivering: 4334497303,
                error: 8292355024,
                holding: 6265853304,
                toBeDelivered: 2165625255,
                waiting: 7091671216,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'eu2o1uybf76hnr6cxgk9n0bx1v2ntm9zzgmy8q0ya2an9edbem',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'vdxadkkszsbgk1l7j875',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 09:40:01',
                
                executionMonitoringEndAt: '2020-08-03 01:14:50',
                numberMax: 6441191905,
                numberDays: 2411713634,
                success: 5934813166,
                cancelled: 1067986109,
                delivering: 3097280073,
                error: 5186126079,
                holding: 2379610750,
                toBeDelivered: 1171314118,
                waiting: 3754716021,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'y1nydkukcnihhhpefdyhce14r2tg5ansui20hm2vo1j7037gex',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'geyy2rh62ywsja29qywk',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:40:10',
                executionMonitoringStartAt: '2020-08-02 22:29:56',
                executionMonitoringEndAt: null,
                numberMax: 6981931471,
                numberDays: 1118521429,
                success: 2287038205,
                cancelled: 7078106152,
                delivering: 4964707224,
                error: 7539286087,
                holding: 1634164169,
                toBeDelivered: 2947799397,
                waiting: 4001745335,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'lk4d566exqe88c6i507d4b4vtnkruqttdh7537aa1vlmpl2pm0',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: '329zwfe2loxyz28irfyj',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 11:25:12',
                executionMonitoringStartAt: '2020-08-03 07:18:30',
                
                numberMax: 8217729586,
                numberDays: 4814012416,
                success: 3307100880,
                cancelled: 5526493440,
                delivering: 8930662411,
                error: 5594508053,
                holding: 1072467257,
                toBeDelivered: 2261456458,
                waiting: 8850886935,
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
                id: 'y5m9nx656ilyqowgio2nnuh1ihz9fvi9649ra',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'rz0dyxq3thtgsse0n0x51c41uq8o7qtplz5sjquxtbdmk983av',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: '8jubelm674v0xdju21gu',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 20:41:02',
                executionMonitoringStartAt: '2020-08-02 21:20:06',
                executionMonitoringEndAt: '2020-08-02 23:26:42',
                numberMax: 5192278346,
                numberDays: 9070402788,
                success: 2402596518,
                cancelled: 6179599148,
                delivering: 2222753201,
                error: 4314618564,
                holding: 5391460786,
                toBeDelivered: 4305929348,
                waiting: 3267787749,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: 'uiwp70l73o0evjofumimrcuciam03vrvwerot',
                tenantCode: 'yoo09fkeohfnt9cceo6dbhd4hsu72puzzxt2b1qnbi4kwlzc08',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'da7semhsf2xqf6z2jguh',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 20:55:21',
                executionMonitoringStartAt: '2020-08-03 08:56:04',
                executionMonitoringEndAt: '2020-08-02 22:20:30',
                numberMax: 8625988171,
                numberDays: 5191849264,
                success: 4561253443,
                cancelled: 2695290351,
                delivering: 8466237251,
                error: 1476056602,
                holding: 2398569218,
                toBeDelivered: 9699384305,
                waiting: 1989205979,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: '7752nanm2z3vtndud40msqeqg4q1ocobarxlbl4vtsf1ujcfge',
                systemId: 'qc0ffh18u9zkqjxynlyp3dopt5xo6f21czaat',
                systemName: 'eskwmme6r4l3wt8f07rq',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 01:41:28',
                executionMonitoringStartAt: '2020-08-03 05:06:02',
                executionMonitoringEndAt: '2020-08-03 01:23:12',
                numberMax: 9430551009,
                numberDays: 5292802088,
                success: 6402458243,
                cancelled: 3780924686,
                delivering: 6051165358,
                error: 5982244337,
                holding: 1710685703,
                toBeDelivered: 2833461177,
                waiting: 5017341124,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'zmjtbnxd39w5eqppigp8pg62sujndv0hpp79u3iheq78l9kmi4',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'iybs1g2cdmiqebyg9bri',
                executionId: 'ognp1vbtc1qggsf5f3bb9e5p5njkzcrxvtl0h',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 08:37:49',
                executionMonitoringStartAt: '2020-08-03 02:04:05',
                executionMonitoringEndAt: '2020-08-02 19:00:27',
                numberMax: 7584305254,
                numberDays: 1818573142,
                success: 5785645755,
                cancelled: 5606496691,
                delivering: 8215607638,
                error: 9950606251,
                holding: 4613712668,
                toBeDelivered: 2375786272,
                waiting: 8284867408,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'cw4xqy7k4540qjddb9hjri4hkns7zmuwrjwuyw4jwsappei6slu',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'd3m1j5pouqbal744miwt',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 01:53:24',
                executionMonitoringStartAt: '2020-08-02 20:26:02',
                executionMonitoringEndAt: '2020-08-03 17:36:01',
                numberMax: 5116058842,
                numberDays: 1675368039,
                success: 7516394478,
                cancelled: 5888793846,
                delivering: 8189723486,
                error: 2588244765,
                holding: 5602314888,
                toBeDelivered: 2873093418,
                waiting: 3322565512,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: '14ne4kuzb0c46wmwmwd4apfuqj73b7a4sx0cgpcpfnmdu0c7ax',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'pzphoklq4rcty68jyxuz8',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 12:39:16',
                executionMonitoringStartAt: '2020-08-03 13:41:44',
                executionMonitoringEndAt: '2020-08-03 07:37:00',
                numberMax: 4775467423,
                numberDays: 8946258608,
                success: 8381377353,
                cancelled: 1186068287,
                delivering: 4647990621,
                error: 5931166099,
                holding: 1105209017,
                toBeDelivered: 3200953864,
                waiting: 5477969689,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: '12ggmfq5nyy1lkvw95sotee02tcrtii3fanqulkhfyfvu2jb9t',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'x47azo5761o64zpnpcub',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 02:22:26',
                executionMonitoringStartAt: '2020-08-03 03:48:11',
                executionMonitoringEndAt: '2020-08-02 20:21:11',
                numberMax: 24158365088,
                numberDays: 4918819865,
                success: 4699251367,
                cancelled: 9036303656,
                delivering: 2429868101,
                error: 9559469965,
                holding: 8421129501,
                toBeDelivered: 8453002639,
                waiting: 1996088863,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'diyucorodzi91e2kwoiia3fti2209sj6ubgniwr7b7utwf39ce',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'yw6bqmk5lmbe0u8rwkzr',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 03:00:00',
                executionMonitoringStartAt: '2020-08-03 17:52:11',
                executionMonitoringEndAt: '2020-08-03 13:36:45',
                numberMax: 4809741040,
                numberDays: 65672703807,
                success: 2685253238,
                cancelled: 8029876131,
                delivering: 3673335882,
                error: 3960395797,
                holding: 2320056935,
                toBeDelivered: 7646617793,
                waiting: 8710721419,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'ep2gub5gbp0fb818xpbeq281q966fhupmzv4pd0fjywtpocbno',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'zm21ovlfmme07chizvvk',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 20:22:24',
                executionMonitoringStartAt: '2020-08-03 06:51:26',
                executionMonitoringEndAt: '2020-08-03 03:33:29',
                numberMax: 3226937817,
                numberDays: 2486574738,
                success: 61151759214,
                cancelled: 9411744710,
                delivering: 1037596520,
                error: 7604044199,
                holding: 9582811686,
                toBeDelivered: 4287546116,
                waiting: 5562956979,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'fsc9lttuaiknquu6pn6i4b5zaf3saqb1fku04q88ls4r153eqw',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'eln6egqwterr8murbxxa',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 14:57:53',
                executionMonitoringStartAt: '2020-08-03 13:09:36',
                executionMonitoringEndAt: '2020-08-03 04:33:51',
                numberMax: 9718135543,
                numberDays: 7591883734,
                success: 7263800256,
                cancelled: 43919959926,
                delivering: 3393429074,
                error: 7860742942,
                holding: 7291022764,
                toBeDelivered: 3829004309,
                waiting: 7552923455,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: '5ca69b72p86msjyfqk93a2kni7kcnqlfw8psgao5ckq9nuhcbp',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'op7j3q6n36wmzdglju26',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 23:20:26',
                executionMonitoringStartAt: '2020-08-02 19:55:58',
                executionMonitoringEndAt: '2020-08-03 08:24:55',
                numberMax: 7269872322,
                numberDays: 6660111078,
                success: 6529680259,
                cancelled: 7136582633,
                delivering: 73879162940,
                error: 1175789959,
                holding: 6748742184,
                toBeDelivered: 4464411722,
                waiting: 5719240844,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 's1dxeyc1pbdyhkb64pgoil90p7wieycty2anicazw1xpefps5x',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'kk4en63wcvewx0mzj6ij',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 07:24:46',
                executionMonitoringStartAt: '2020-08-03 04:15:51',
                executionMonitoringEndAt: '2020-08-03 13:40:27',
                numberMax: 5833517359,
                numberDays: 6095836887,
                success: 2837348772,
                cancelled: 3127800268,
                delivering: 5670174947,
                error: 91618186031,
                holding: 7366409618,
                toBeDelivered: 7595034731,
                waiting: 7291631653,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'ot4tu0wl2c98jhsui3d2zn364k039frd19m4kini78rrxzcwsk',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: '5dzrkkgrlqkzne72tdpn',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 07:06:37',
                executionMonitoringStartAt: '2020-08-03 01:16:15',
                executionMonitoringEndAt: '2020-08-03 12:56:42',
                numberMax: 3118864819,
                numberDays: 2742446125,
                success: 8892344361,
                cancelled: 9566031599,
                delivering: 3318983541,
                error: 2131411093,
                holding: 33791849865,
                toBeDelivered: 8174963494,
                waiting: 9711654452,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'rt827nrm48xc08l327tgibzhnufmoiibtb4xv5quyhwro9zs52',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: '76cb7r921dgx1gj4nsqj',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 07:30:03',
                executionMonitoringStartAt: '2020-08-02 19:08:47',
                executionMonitoringEndAt: '2020-08-03 16:18:54',
                numberMax: 7766873809,
                numberDays: 1065578791,
                success: 3100650287,
                cancelled: 2958564100,
                delivering: 8531728586,
                error: 9981342683,
                holding: 9591246220,
                toBeDelivered: 43796578362,
                waiting: 8330816558,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'jle5knyfzbdh531wc3rvdzmg1p78ksvb1o0zzyz14984buq10y',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'tz3pii6nq8if2wcj58in',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 14:42:36',
                executionMonitoringStartAt: '2020-08-02 22:15:00',
                executionMonitoringEndAt: '2020-08-03 06:39:14',
                numberMax: 8620452851,
                numberDays: 9568850069,
                success: 4088928983,
                cancelled: 6666257761,
                delivering: 7213770922,
                error: 3284439904,
                holding: 1654955622,
                toBeDelivered: 9392702536,
                waiting: 12079881175,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'l3bpjvdtpdo2lea9cwh8pxxto4fr3a6uhowxhp5yh660cajvga',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: '2tnf0a05lbb2gjn87bos',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 20:24:09',
                executionMonitoringStartAt: '2020-08-03 00:52:07',
                executionMonitoringEndAt: '2020-08-03 01:27:53',
                numberMax: -9,
                numberDays: 1806859736,
                success: 2443996975,
                cancelled: 8593546052,
                delivering: 7862257143,
                error: 2794292855,
                holding: 2319803299,
                toBeDelivered: 9148339567,
                waiting: 6501664914,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'p381cl5hak7penw2diq190728uxp8velzcin3u4g7oxinupwau',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'r0j5jv5n4l4fbyzqs4zn',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 22:09:38',
                executionMonitoringStartAt: '2020-08-03 02:39:53',
                executionMonitoringEndAt: '2020-08-03 11:48:56',
                numberMax: 5770163826,
                numberDays: -9,
                success: 2527382119,
                cancelled: 8026116700,
                delivering: 1899034574,
                error: 1566277415,
                holding: 7635656043,
                toBeDelivered: 3411385198,
                waiting: 7610702442,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'dmywtgjesxfed6uwwof7a8sqalhmvwafb3a6uq5bvyrqd6lfj7',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'tahdt6ysd14iq8i79by3',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 16:23:22',
                executionMonitoringStartAt: '2020-08-03 14:14:20',
                executionMonitoringEndAt: '2020-08-03 18:21:21',
                numberMax: 9692867994,
                numberDays: 4850835840,
                success: -9,
                cancelled: 1730494856,
                delivering: 7230395799,
                error: 8292344182,
                holding: 2032039342,
                toBeDelivered: 9722364721,
                waiting: 7669578090,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'z3uza8e9u3qzln9p4m5o2wizktrjyp56h7ed5yc794xn1ri9cs',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: '9yf4ezb7unucspdzqqxu',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 23:03:01',
                executionMonitoringStartAt: '2020-08-03 06:27:51',
                executionMonitoringEndAt: '2020-08-03 16:51:11',
                numberMax: 4568085711,
                numberDays: 4595730255,
                success: 3034863963,
                cancelled: -9,
                delivering: 4520420562,
                error: 7700262068,
                holding: 3236310965,
                toBeDelivered: 7066867304,
                waiting: 3378971139,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: '4dfycrayo10sg5i77mzninrzl0zgmgbjcrv7ebl1niur7jhmob',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'gv1kh3wj6ombpnahtayu',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 06:45:20',
                executionMonitoringStartAt: '2020-08-03 03:34:33',
                executionMonitoringEndAt: '2020-08-03 18:19:41',
                numberMax: 7837390461,
                numberDays: 5209556558,
                success: 5190223914,
                cancelled: 3647311647,
                delivering: -9,
                error: 5610474553,
                holding: 3204325160,
                toBeDelivered: 2163302600,
                waiting: 5011648518,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: '78vlix0lsgomgyfikgz8xeti2cg3pqhwcbvc5bpx5khubpbmbo',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: '5ua001wwu60fbuefk901',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 13:54:52',
                executionMonitoringStartAt: '2020-08-03 11:19:58',
                executionMonitoringEndAt: '2020-08-03 14:12:10',
                numberMax: 6510491304,
                numberDays: 3626096872,
                success: 5693323246,
                cancelled: 5679228738,
                delivering: 6367365881,
                error: -9,
                holding: 4842809912,
                toBeDelivered: 8141833449,
                waiting: 6217304439,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'uhpn38zqhwgdvg4k70bvqajpx5nhpcf1epezn56wycredlaz0q',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'bzxwenhwan85b4qyh80d',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 18:20:30',
                executionMonitoringStartAt: '2020-08-03 18:04:02',
                executionMonitoringEndAt: '2020-08-03 01:16:45',
                numberMax: 1120571872,
                numberDays: 2771065213,
                success: 5132099915,
                cancelled: 2516006449,
                delivering: 5590571610,
                error: 2825748136,
                holding: -9,
                toBeDelivered: 4387767118,
                waiting: 8918691787,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'rtq5vreqge87sy2j95ricsplmgqlcbb7qz201fzk05kuhqfc0q',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'p84au1lpkb1cqkl7qws3',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 22:22:21',
                executionMonitoringStartAt: '2020-08-03 17:28:54',
                executionMonitoringEndAt: '2020-08-03 08:59:39',
                numberMax: 8004878511,
                numberDays: 3077612323,
                success: 5759716669,
                cancelled: 8149913571,
                delivering: 8942606343,
                error: 3119153356,
                holding: 1851531379,
                toBeDelivered: -9,
                waiting: 9880143717,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'm3nup9gsdimvoirortgvd9pn3kl6ttf1gl1ves4bqk45xighph',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'iqkmtmxs70r6hmmsuqcb',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 18:55:15',
                executionMonitoringStartAt: '2020-08-02 18:41:09',
                executionMonitoringEndAt: '2020-08-03 00:25:10',
                numberMax: 2958559846,
                numberDays: 2491620465,
                success: 4821576474,
                cancelled: 9500703267,
                delivering: 2626382863,
                error: 7539946981,
                holding: 8129186430,
                toBeDelivered: 4478405671,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: '001oa7quyqu47tq5c82ak4vn8gukjvocddoyvcy23l23j2slv4',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'k367h7uponiyl9hdji6h',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-03 04:35:17',
                executionMonitoringStartAt: '2020-08-03 11:24:21',
                executionMonitoringEndAt: '2020-08-03 14:34:55',
                numberMax: 4746619801,
                numberDays: 7907688996,
                success: 9456478633,
                cancelled: 2409329296,
                delivering: 1275741678,
                error: 9719253013,
                holding: 5417199681,
                toBeDelivered: 8175525259,
                waiting: 8123070951,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: 'f40vm42obtmyutaevgugzj9cgqizd17yworo91cnff5u5pmvxj',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'bhgqtubl2o1ufx9whkss',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-03 11:09:51',
                executionMonitoringEndAt: '2020-08-03 10:18:01',
                numberMax: 5631973183,
                numberDays: 2966527681,
                success: 1480269613,
                cancelled: 4229272774,
                delivering: 4420331709,
                error: 5309094578,
                holding: 2031637695,
                toBeDelivered: 7216027803,
                waiting: 7963408801,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: '4sxa0teyojsilyp5e5ngr0youinn0wogkf9zgt1epp7yf9ipff',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 'hgtnf1q028bhq1fzb3sb',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 23:06:50',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-02 18:57:12',
                numberMax: 4360543140,
                numberDays: 1022505799,
                success: 6340924866,
                cancelled: 2542950109,
                delivering: 2853595829,
                error: 8139095004,
                holding: 6762194305,
                toBeDelivered: 3002748943,
                waiting: 6834932471,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: '74dzod3m26wqw8tsjnvrsxy7trp28pr94236bsdej2vwmi34wz',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: '3hwauwdycibsf93eez1l',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 06:02:06',
                executionMonitoringStartAt: '2020-08-03 13:27:29',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 4188667327,
                numberDays: 2497168669,
                success: 3999136843,
                cancelled: 5015325962,
                delivering: 2887738783,
                error: 5236574079,
                holding: 2189860561,
                toBeDelivered: 3244796944,
                waiting: 5324332898,
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
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: '2cw6nl02484h0ncmw91o49l7xlzbpnclnh1bv0u6jv7083pcwq',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: 't42727v6bjydgn5oka83',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 07:04:15',
                executionMonitoringStartAt: '2020-08-03 06:13:40',
                executionMonitoringEndAt: '2020-08-03 02:10:42',
                numberMax: 5981195782,
                numberDays: 8103685853,
                success: 9186833282,
                cancelled: 3749720672,
                delivering: 6685804636,
                error: 1700043663,
                holding: 3954265367,
                toBeDelivered: 6948636340,
                waiting: 8765952252,
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
                        value   : 'd05fdd82-62cf-4ae9-8a8d-6bf55d19227a'
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
                        value   : '4312fb45-d68b-41c2-8c32-6bddda08e454'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4312fb45-d68b-41c2-8c32-6bddda08e454'));
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/46f68dd2-a111-4039-8c74-cde402cf5bdc')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/4312fb45-d68b-41c2-8c32-6bddda08e454')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4312fb45-d68b-41c2-8c32-6bddda08e454'));
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
                
                id: '9870b3bb-2097-4dab-87b3-d397b3770248',
                tenantId: '39ae3a80-5261-4da3-b58f-b6ce551e148b',
                tenantCode: '4059zlzl3ppxl76xfdht1zq1pd7205m31fojlc32f2qbxztpsb',
                systemId: '6fa9af95-f5a9-47a1-9860-021e5ee32949',
                systemName: 'pqa3moagxg5gdin1qxwo',
                executionId: '3de17646-5721-4c93-b14b-22a2420a7f10',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 00:35:06',
                executionMonitoringStartAt: '2020-08-02 19:06:56',
                executionMonitoringEndAt: '2020-08-03 18:12:00',
                numberMax: 9870952897,
                numberDays: 5785265264,
                success: 8971273697,
                cancelled: 8926449646,
                delivering: 1193620112,
                error: 2668958205,
                holding: 9474226800,
                toBeDelivered: 8096130589,
                waiting: 7598878457,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                tenantCode: '13ml7a5mzmxri241ia936hrri66ty49xpezkx1f8ap77w0mdk6',
                systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                systemName: '5jo48x4ojhhcob1hor5y',
                executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 09:11:44',
                executionMonitoringStartAt: '2020-08-02 23:17:04',
                executionMonitoringEndAt: '2020-08-03 00:30:03',
                numberMax: 1830929686,
                numberDays: 7491657057,
                success: 8306240129,
                cancelled: 3071149555,
                delivering: 1132745705,
                error: 6205784331,
                holding: 1949664197,
                toBeDelivered: 9545208898,
                waiting: 3290915125,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4312fb45-d68b-41c2-8c32-6bddda08e454'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/c844ba26-98d1-49f3-9c14-5f8b029d970e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/4312fb45-d68b-41c2-8c32-6bddda08e454')
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
                        id: 'fd5626df-0d1b-422d-8849-df10eb93e326',
                        tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                        tenantCode: '1b728py6mv7a0veo37rt3ekjal00epwarl78l5zktw9fyreir7',
                        systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                        systemName: 'kl2v6arlzcjszqa08ii8',
                        executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-03 11:55:10',
                        executionMonitoringStartAt: '2020-08-03 12:00:04',
                        executionMonitoringEndAt: '2020-08-03 16:36:37',
                        numberMax: 4747289430,
                        numberDays: 9776258683,
                        success: 5838503472,
                        cancelled: 7034083929,
                        delivering: 1068709762,
                        error: 6963117138,
                        holding: 9873790616,
                        toBeDelivered: 5586404511,
                        waiting: 1173207917,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', 'fd5626df-0d1b-422d-8849-df10eb93e326');
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
                            value   : '6d6c7f90-92df-4998-b8eb-349d05224aa9'
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
                            value   : '4312fb45-d68b-41c2-8c32-6bddda08e454'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('4312fb45-d68b-41c2-8c32-6bddda08e454');
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
                    id: '1a32445b-afca-4029-ba4c-b615f53d0494'
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
                    id: '4312fb45-d68b-41c2-8c32-6bddda08e454'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('4312fb45-d68b-41c2-8c32-6bddda08e454');
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
                        
                        id: 'd9e7572d-77ef-437e-93a4-269caacb2c99',
                        tenantId: '279f3e12-f169-455c-b1d0-9b031b08fa7a',
                        tenantCode: 'zx0z6oi29dykvn8ijmomuvsl5hix81x6oius61kzv8z7u8vhrs',
                        systemId: '739a7020-09d6-4204-8140-1313d7e00641',
                        systemName: 's78kq08n9h8lz5ul0244',
                        executionId: 'bd3c5b2c-f735-4491-b833-273ad5220a4d',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-03 10:37:53',
                        executionMonitoringStartAt: '2020-08-03 13:41:30',
                        executionMonitoringEndAt: '2020-08-02 19:19:59',
                        numberMax: 6419446972,
                        numberDays: 9416137316,
                        success: 8639353638,
                        cancelled: 9898709910,
                        delivering: 2946115454,
                        error: 5532196477,
                        holding: 3233355854,
                        toBeDelivered: 8201525696,
                        waiting: 6450347860,
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
                        
                        id: '4312fb45-d68b-41c2-8c32-6bddda08e454',
                        tenantId: '1cedbb66-4551-4626-88f9-422cb2c5127b',
                        tenantCode: 'win709aouw2l1qehdb7z1ztyg4mkr94sxtfa8ok4830k1te56w',
                        systemId: '46164022-8d2a-4fde-b868-02b0def0216b',
                        systemName: 'y85dcrwcbia0whcl6727',
                        executionId: '7be8eb62-87c4-4a16-b208-0e0efa23e8e2',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-03 01:34:09',
                        executionMonitoringStartAt: '2020-08-03 17:39:12',
                        executionMonitoringEndAt: '2020-08-03 09:46:26',
                        numberMax: 7220250935,
                        numberDays: 4583016814,
                        success: 6480342361,
                        cancelled: 1012869231,
                        delivering: 5204690850,
                        error: 2583989643,
                        holding: 8283474834,
                        toBeDelivered: 4047562044,
                        waiting: 7797513022,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('4312fb45-d68b-41c2-8c32-6bddda08e454');
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
                    id: 'e0138260-ddb8-4f90-8e03-8961c59a8983'
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
                    id: '4312fb45-d68b-41c2-8c32-6bddda08e454'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('4312fb45-d68b-41c2-8c32-6bddda08e454');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});