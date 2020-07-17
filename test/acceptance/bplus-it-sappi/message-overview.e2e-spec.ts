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

    it(`/REST:POST bplus-it-sappi/message-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: '0gugj44lhn1b1b037oau',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 06:03:19',
                executionMonitoringStartAt: '2020-07-17 07:00:02',
                executionMonitoringEndAt: '2020-07-17 07:54:02',
                numberMax: 9513534923,
                numberDays: 1038228793,
                success: 2168229506,
                cancelled: 5665389989,
                delivering: 3873037408,
                error: 9014863482,
                holding: 9032868746,
                toBeDelivered: 8047513641,
                waiting: 7293518733,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'r8ofot9zb0gyh5brk3na',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 16:45:58',
                executionMonitoringStartAt: '2020-07-17 12:55:31',
                executionMonitoringEndAt: '2020-07-17 04:37:40',
                numberMax: 3704683643,
                numberDays: 3917163762,
                success: 5446248935,
                cancelled: 9148261087,
                delivering: 9180177924,
                error: 3719333210,
                holding: 8944272088,
                toBeDelivered: 9468820004,
                waiting: 4530249968,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: null,
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'xnk4g1ybxaw49wmwe8y1',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:18:30',
                executionMonitoringStartAt: '2020-07-17 00:40:17',
                executionMonitoringEndAt: '2020-07-17 14:57:28',
                numberMax: 4311270381,
                numberDays: 4991855949,
                success: 6040283400,
                cancelled: 7626984516,
                delivering: 5718027877,
                error: 1978692075,
                holding: 8920107767,
                toBeDelivered: 1937987671,
                waiting: 9016266718,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'mwg8mhqudx8saikoxqn6',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 08:48:59',
                executionMonitoringStartAt: '2020-07-17 15:15:37',
                executionMonitoringEndAt: '2020-07-17 12:23:00',
                numberMax: 3370306362,
                numberDays: 4903219989,
                success: 8487034528,
                cancelled: 1308715498,
                delivering: 3159410944,
                error: 8909145414,
                holding: 7003218793,
                toBeDelivered: 5060556772,
                waiting: 8490537575,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: null,
                systemName: 'z95tz9nu2mo4l96bvcp5',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 19:04:49',
                executionMonitoringStartAt: '2020-07-17 04:08:01',
                executionMonitoringEndAt: '2020-07-17 12:40:46',
                numberMax: 2175232787,
                numberDays: 8682200148,
                success: 4756719720,
                cancelled: 7374621650,
                delivering: 4796596806,
                error: 5184990282,
                holding: 4239660296,
                toBeDelivered: 4466126750,
                waiting: 7806395050,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                
                systemName: 'qu45xmbjfg4jzuxmua20',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 08:52:08',
                executionMonitoringStartAt: '2020-07-16 19:18:32',
                executionMonitoringEndAt: '2020-07-17 13:37:27',
                numberMax: 9178758357,
                numberDays: 9436296425,
                success: 6462030707,
                cancelled: 1755628042,
                delivering: 7867400613,
                error: 2714790835,
                holding: 2368698895,
                toBeDelivered: 7950431637,
                waiting: 4894673225,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: null,
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 02:03:51',
                executionMonitoringStartAt: '2020-07-17 08:23:17',
                executionMonitoringEndAt: '2020-07-16 20:02:42',
                numberMax: 4672753113,
                numberDays: 3805137148,
                success: 9287704846,
                cancelled: 4121232972,
                delivering: 1371130530,
                error: 1457852405,
                holding: 1072549485,
                toBeDelivered: 3499569121,
                waiting: 7320981702,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 22:05:38',
                executionMonitoringStartAt: '2020-07-16 17:09:46',
                executionMonitoringEndAt: '2020-07-17 06:23:35',
                numberMax: 7962734479,
                numberDays: 5894789642,
                success: 8087139208,
                cancelled: 3252957951,
                delivering: 5254649693,
                error: 8927772833,
                holding: 8543422430,
                toBeDelivered: 2269342621,
                waiting: 8945568988,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'i16v2kgxbn93hmglbw9l',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 09:26:29',
                executionMonitoringStartAt: '2020-07-16 21:58:38',
                executionMonitoringEndAt: '2020-07-16 21:53:54',
                numberMax: 3796295360,
                numberDays: 7228073004,
                success: 1854025974,
                cancelled: 8858732364,
                delivering: 4393757925,
                error: 4990345747,
                holding: 7526563040,
                toBeDelivered: 4109176525,
                waiting: 2134558058,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: '62dog5g2iy5g0im10g5i',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:20:41',
                executionMonitoringStartAt: '2020-07-17 05:10:23',
                executionMonitoringEndAt: '2020-07-17 00:04:53',
                numberMax: 7770118990,
                numberDays: 4633960703,
                success: 7003498370,
                cancelled: 2998313262,
                delivering: 4695293286,
                error: 3279355240,
                holding: 4404206343,
                toBeDelivered: 1741965754,
                waiting: 8141870464,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'ih4ao6xuunqfiouzt8oo',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: null,
                executionExecutedAt: '2020-07-16 19:30:54',
                executionMonitoringStartAt: '2020-07-16 17:44:16',
                executionMonitoringEndAt: '2020-07-16 23:04:02',
                numberMax: 4957025067,
                numberDays: 7434361987,
                success: 8646441589,
                cancelled: 7406840157,
                delivering: 6779269712,
                error: 6712563060,
                holding: 9313673048,
                toBeDelivered: 3074316872,
                waiting: 9117858140,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: '3end4w67p2t3roz9vm7n',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                
                executionExecutedAt: '2020-07-16 16:49:43',
                executionMonitoringStartAt: '2020-07-16 17:29:04',
                executionMonitoringEndAt: '2020-07-16 17:31:14',
                numberMax: 6803025156,
                numberDays: 1716150302,
                success: 5393324164,
                cancelled: 3565088884,
                delivering: 4698484453,
                error: 7800811636,
                holding: 8555746847,
                toBeDelivered: 5891869248,
                waiting: 8093159223,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'torel4oizfepahsw3mi6',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-16 22:29:55',
                executionMonitoringEndAt: '2020-07-17 06:57:58',
                numberMax: 4791165391,
                numberDays: 5374494981,
                success: 1762609967,
                cancelled: 5937679538,
                delivering: 8774521520,
                error: 6183779576,
                holding: 9091547241,
                toBeDelivered: 4366182149,
                waiting: 5362946384,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: '54teuu5k7xcb4f4orfmz',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-16 19:44:33',
                executionMonitoringEndAt: '2020-07-17 11:37:21',
                numberMax: 7178440717,
                numberDays: 7739519983,
                success: 6688574463,
                cancelled: 3213291423,
                delivering: 5340503934,
                error: 2839553833,
                holding: 4394944033,
                toBeDelivered: 5626061507,
                waiting: 4367649392,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'juj4ks5f6c0hojvmxmws',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:54:32',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-17 05:25:12',
                numberMax: 2516501444,
                numberDays: 6296891435,
                success: 8924503238,
                cancelled: 8196173380,
                delivering: 7461231877,
                error: 3263824353,
                holding: 3652046756,
                toBeDelivered: 6737105240,
                waiting: 1446195012,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'zcogzryelgm966moaejh',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 02:08:04',
                
                executionMonitoringEndAt: '2020-07-17 09:50:10',
                numberMax: 7444461965,
                numberDays: 2964593609,
                success: 2018660723,
                cancelled: 4681178734,
                delivering: 9073263064,
                error: 2768064704,
                holding: 7733000596,
                toBeDelivered: 1016731140,
                waiting: 8818595699,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'dat5dfhtodojn1k5feoa',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 05:05:51',
                executionMonitoringStartAt: '2020-07-16 18:38:41',
                executionMonitoringEndAt: null,
                numberMax: 7602003712,
                numberDays: 8722445732,
                success: 7240047496,
                cancelled: 7343031505,
                delivering: 5623223391,
                error: 7369352173,
                holding: 4311787209,
                toBeDelivered: 6405435924,
                waiting: 2408504060,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'bmil8s2nnin9sb2yjk04',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 23:27:46',
                executionMonitoringStartAt: '2020-07-16 23:53:53',
                
                numberMax: 6941363733,
                numberDays: 3226353489,
                success: 4792178973,
                cancelled: 1660657342,
                delivering: 2097743820,
                error: 3131280271,
                holding: 1996192007,
                toBeDelivered: 9321333311,
                waiting: 1366786695,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4f3kuix0o54rrmffawhbqi03p7x566k9f2dfi',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'tukh982mwzzwri3xpiid',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 10:02:48',
                executionMonitoringStartAt: '2020-07-16 21:58:30',
                executionMonitoringEndAt: '2020-07-17 06:44:08',
                numberMax: 7085846620,
                numberDays: 4064646264,
                success: 9528524554,
                cancelled: 4790852696,
                delivering: 5858042798,
                error: 6166616325,
                holding: 4552903941,
                toBeDelivered: 7200694622,
                waiting: 5794451149,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: 'acvc2brvl60tj3zfmg889njj43yimpkor6050',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: '8nt1evpbzz8xwi5t0b4l',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 16:23:03',
                executionMonitoringStartAt: '2020-07-17 07:01:10',
                executionMonitoringEndAt: '2020-07-17 05:39:50',
                numberMax: 1443063493,
                numberDays: 7600311202,
                success: 6423592042,
                cancelled: 3573957644,
                delivering: 3944796743,
                error: 9834511868,
                holding: 4403976207,
                toBeDelivered: 4953656470,
                waiting: 9394003146,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'njiojjpnie4pcz7yx0sxi7ee6j41m0rcolixl',
                systemName: 'j7ltcjvtzm72knz2vekb',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 05:19:29',
                executionMonitoringStartAt: '2020-07-17 07:41:55',
                executionMonitoringEndAt: '2020-07-16 20:54:38',
                numberMax: 7867274325,
                numberDays: 8559582845,
                success: 1502650370,
                cancelled: 3783498440,
                delivering: 7400526368,
                error: 3315803945,
                holding: 7260094815,
                toBeDelivered: 3849490490,
                waiting: 6713082946,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: '7l8ujxw2ohqsm3hrgyj5',
                executionId: 'u4w209euvn83t3pnvxt88e9r0pbgbtkshnkr6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 18:36:27',
                executionMonitoringStartAt: '2020-07-17 04:59:27',
                executionMonitoringEndAt: '2020-07-17 12:31:26',
                numberMax: 3913027119,
                numberDays: 2216549608,
                success: 9703092905,
                cancelled: 3863939959,
                delivering: 2465945844,
                error: 6460717797,
                holding: 8516973808,
                toBeDelivered: 3842733987,
                waiting: 6757315679,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: '8e61vacimqvv6kkqmrvic',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 08:17:16',
                executionMonitoringStartAt: '2020-07-17 15:00:44',
                executionMonitoringEndAt: '2020-07-16 23:11:36',
                numberMax: 7187199454,
                numberDays: 8655430099,
                success: 1952989320,
                cancelled: 2646146690,
                delivering: 5868194072,
                error: 1242491687,
                holding: 8899618840,
                toBeDelivered: 5596468752,
                waiting: 1845139025,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberMax is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'wv988oa4gkwl1hukl921',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 06:45:13',
                executionMonitoringStartAt: '2020-07-17 03:39:27',
                executionMonitoringEndAt: '2020-07-17 13:24:36',
                numberMax: 91406726521,
                numberDays: 4796526854,
                success: 9370413000,
                cancelled: 2810447862,
                delivering: 2044857475,
                error: 2371387761,
                holding: 3432994781,
                toBeDelivered: 9927585317,
                waiting: 7141621445,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberMax is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberDays is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'uhbzsru7d22yd6zx7su0',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 06:34:26',
                executionMonitoringStartAt: '2020-07-17 01:06:09',
                executionMonitoringEndAt: '2020-07-17 03:39:54',
                numberMax: 9888349646,
                numberDays: 43138053095,
                success: 5326680856,
                cancelled: 4930173590,
                delivering: 2855020180,
                error: 8054301523,
                holding: 6872577931,
                toBeDelivered: 7641215852,
                waiting: 9654220266,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberDays is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSuccess is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: '1opfeihnimd1g6or42ht',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 15:37:08',
                executionMonitoringStartAt: '2020-07-17 15:51:12',
                executionMonitoringEndAt: '2020-07-17 10:38:21',
                numberMax: 6532347053,
                numberDays: 5246984593,
                success: 17790346823,
                cancelled: 4368261424,
                delivering: 9619250492,
                error: 5573510937,
                holding: 3551703719,
                toBeDelivered: 6979299830,
                waiting: 6892603210,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSuccess is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'iblkk0vr19ob2jh1hmxo',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 15:20:56',
                executionMonitoringStartAt: '2020-07-17 09:00:55',
                executionMonitoringEndAt: '2020-07-16 17:24:19',
                numberMax: 1871288717,
                numberDays: 9074432542,
                success: 4867655895,
                cancelled: 42876402770,
                delivering: 5086141886,
                error: 4335737251,
                holding: 1553859150,
                toBeDelivered: 9862329374,
                waiting: 2095535317,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewDelivering is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'b3bwer0ykdk2ipqjf7jf',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 01:22:34',
                executionMonitoringStartAt: '2020-07-16 22:45:20',
                executionMonitoringEndAt: '2020-07-17 14:16:11',
                numberMax: 9198744458,
                numberDays: 1411019259,
                success: 6558766052,
                cancelled: 4392443971,
                delivering: 41380339712,
                error: 1255274676,
                holding: 1827046583,
                toBeDelivered: 8297298175,
                waiting: 9923240700,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewDelivering is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'y6sfuwsi3ja81iz9tdfs',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 22:18:12',
                executionMonitoringStartAt: '2020-07-17 15:30:12',
                executionMonitoringEndAt: '2020-07-17 16:29:48',
                numberMax: 7657827850,
                numberDays: 7499700767,
                success: 4654664690,
                cancelled: 8559238586,
                delivering: 1814243185,
                error: 75616461405,
                holding: 4811390628,
                toBeDelivered: 8998758961,
                waiting: 1246380783,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewError is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewHolding is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'hwbvoqs76ns90gb6o2ui',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 22:14:37',
                executionMonitoringStartAt: '2020-07-17 14:55:01',
                executionMonitoringEndAt: '2020-07-17 04:54:36',
                numberMax: 5132904129,
                numberDays: 7706374681,
                success: 7036590744,
                cancelled: 1791479127,
                delivering: 8401174298,
                error: 3011296260,
                holding: 82298816846,
                toBeDelivered: 1928068924,
                waiting: 7273789236,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewHolding is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'b6i6doksnudz6m9fk6xl',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 14:02:28',
                executionMonitoringStartAt: '2020-07-17 09:59:59',
                executionMonitoringEndAt: '2020-07-17 12:01:24',
                numberMax: 4336025704,
                numberDays: 1782426199,
                success: 3319587269,
                cancelled: 8149094046,
                delivering: 3453771506,
                error: 2955603660,
                holding: 9562529035,
                toBeDelivered: 52561204019,
                waiting: 1556445203,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewToBeDelivered is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewWaiting is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'wf5fzlgqtmuuy98m2q3z',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 08:53:42',
                executionMonitoringStartAt: '2020-07-17 13:50:27',
                executionMonitoringEndAt: '2020-07-17 12:45:58',
                numberMax: 5533846374,
                numberDays: 8204650953,
                success: 8661120208,
                cancelled: 3606084030,
                delivering: 2657633857,
                error: 1057328884,
                holding: 2862238518,
                toBeDelivered: 7520796171,
                waiting: 14893770831,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewWaiting is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberMax must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'ki9pldas5tdywo28yqye',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 18:29:50',
                executionMonitoringStartAt: '2020-07-17 00:19:36',
                executionMonitoringEndAt: '2020-07-17 08:31:16',
                numberMax: -9,
                numberDays: 4907132340,
                success: 9117221767,
                cancelled: 1735257449,
                delivering: 5079406584,
                error: 4309436345,
                holding: 7097142309,
                toBeDelivered: 5131896345,
                waiting: 2513774344,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberMax must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberDays must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'qbd1s7pmlvixy638oxvw',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 06:14:55',
                executionMonitoringStartAt: '2020-07-17 05:42:37',
                executionMonitoringEndAt: '2020-07-17 05:39:21',
                numberMax: 3031046946,
                numberDays: -9,
                success: 8650375071,
                cancelled: 1833653058,
                delivering: 8587494124,
                error: 1907517749,
                holding: 3008153758,
                toBeDelivered: 9323985478,
                waiting: 4511852432,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberDays must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSuccess must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'sv579genw0zj9j5m5xqu',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 18:41:24',
                executionMonitoringStartAt: '2020-07-17 00:50:54',
                executionMonitoringEndAt: '2020-07-16 22:04:47',
                numberMax: 6448995630,
                numberDays: 9480913194,
                success: -9,
                cancelled: 7643827267,
                delivering: 8333098951,
                error: 2372398692,
                holding: 6249009427,
                toBeDelivered: 6696404147,
                waiting: 3179131212,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewSuccess must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewCancelled must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: '3d8xdallikm7sgtsysml',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 04:58:43',
                executionMonitoringStartAt: '2020-07-17 01:46:15',
                executionMonitoringEndAt: '2020-07-17 14:47:39',
                numberMax: 6167321504,
                numberDays: 6434765529,
                success: 6561662946,
                cancelled: -9,
                delivering: 6511556071,
                error: 5281085053,
                holding: 7025034636,
                toBeDelivered: 3940509502,
                waiting: 8642812035,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewDelivering must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'kybt8v6b8v9cw075ggg0',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 06:15:08',
                executionMonitoringStartAt: '2020-07-17 07:01:23',
                executionMonitoringEndAt: '2020-07-17 15:26:36',
                numberMax: 5300457854,
                numberDays: 4970177637,
                success: 4486392582,
                cancelled: 2029023112,
                delivering: -9,
                error: 7771247114,
                holding: 6060927497,
                toBeDelivered: 7975203134,
                waiting: 1653832817,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewDelivering must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'cric4qh8h2jmyaszssby',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 01:13:28',
                executionMonitoringStartAt: '2020-07-17 07:21:59',
                executionMonitoringEndAt: '2020-07-17 10:34:37',
                numberMax: 7793814278,
                numberDays: 5268733741,
                success: 2590967922,
                cancelled: 5732508708,
                delivering: 2733681849,
                error: -9,
                holding: 5739274707,
                toBeDelivered: 9254085574,
                waiting: 1903389947,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewHolding must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'o6pg2vw2lmjk0emno58g',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 08:32:48',
                executionMonitoringStartAt: '2020-07-17 08:26:08',
                executionMonitoringEndAt: '2020-07-17 13:42:42',
                numberMax: 5215770067,
                numberDays: 6345349418,
                success: 8637219182,
                cancelled: 3911238634,
                delivering: 4689673421,
                error: 5023188298,
                holding: -9,
                toBeDelivered: 9634740996,
                waiting: 4929012318,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewHolding must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'ikgnjtznl8olkechm9o9',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 13:28:26',
                executionMonitoringStartAt: '2020-07-16 22:25:45',
                executionMonitoringEndAt: '2020-07-17 12:46:01',
                numberMax: 1892083159,
                numberDays: 1417245261,
                success: 5626996767,
                cancelled: 9391670062,
                delivering: 8020514368,
                error: 7159360971,
                holding: 5692008538,
                toBeDelivered: -9,
                waiting: 2807848678,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewToBeDelivered must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewWaiting must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'wctdr2ped1ju3lwhrtdf',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 14:23:20',
                executionMonitoringStartAt: '2020-07-16 17:28:23',
                executionMonitoringEndAt: '2020-07-16 17:50:05',
                numberMax: 9979141412,
                numberDays: 6853651533,
                success: 6503089063,
                cancelled: 1777472800,
                delivering: 9228643226,
                error: 4899214764,
                holding: 3935186216,
                toBeDelivered: 7748150895,
                waiting: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewWaiting must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'r5856pvilcffrhu1pww7',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-17 13:40:01',
                executionMonitoringStartAt: '2020-07-17 14:56:18',
                executionMonitoringEndAt: '2020-07-17 02:30:43',
                numberMax: 8806225153,
                numberDays: 3023052228,
                success: 6944792767,
                cancelled: 1717066132,
                delivering: 9743763500,
                error: 7765014120,
                holding: 9937267183,
                toBeDelivered: 4063152874,
                waiting: 8534675416,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: '9ubgzm0rp8qrk0daw33n',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-16 20:32:02',
                executionMonitoringEndAt: '2020-07-16 22:08:07',
                numberMax: 7303703869,
                numberDays: 9165330950,
                success: 7645732770,
                cancelled: 3506572679,
                delivering: 4014417432,
                error: 5610995784,
                holding: 1224423449,
                toBeDelivered: 7238843063,
                waiting: 8621173373,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'c4qtn36vblbttz77ofmn',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 06:02:09',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-17 09:47:52',
                numberMax: 4453645493,
                numberDays: 7334967257,
                success: 2441845055,
                cancelled: 8836571739,
                delivering: 4391810575,
                error: 2599012398,
                holding: 2714184215,
                toBeDelivered: 2895685722,
                waiting: 7592792237,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'lbo4wm1xsioddfa5cyr7',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 05:37:51',
                executionMonitoringStartAt: '2020-07-17 13:14:41',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 4610287270,
                numberDays: 4058164824,
                success: 7264910171,
                cancelled: 2557058578,
                delivering: 2252600988,
                error: 8753204993,
                holding: 4390147638,
                toBeDelivered: 1722201576,
                waiting: 3100880239,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'dvwbct21mrnywq4d7ndm',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 17:57:19',
                executionMonitoringStartAt: '2020-07-17 00:07:13',
                executionMonitoringEndAt: '2020-07-17 03:20:36',
                numberMax: 3640935480,
                numberDays: 5858490691,
                success: 4004149820,
                cancelled: 1589686667,
                delivering: 1749808650,
                error: 5853558665,
                holding: 4124932053,
                toBeDelivered: 4763370696,
                waiting: 4858915962,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/messages-overview/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/message-overview - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/message-overview`, () => 
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
                        value   : 'bb588cca-e74a-4f2b-931f-2ef29ba22388'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bb588cca-e74a-4f2b-931f-2ef29ba22388'));
    });

    it(`/REST:GET bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/bb588cca-e74a-4f2b-931f-2ef29ba22388')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bb588cca-e74a-4f2b-931f-2ef29ba22388'));
    });

    it(`/REST:GET bplus-it-sappi/messages-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd1725b46-9c93-4ee2-b48b-6251b328cd73',
                tenantId: '420a36c0-6f35-457c-8c14-121f85c3a318',
                systemId: '8c445a4c-5ba6-4f06-8c65-31d68a734e45',
                systemName: 'z28vq3b984ysh0ry0eup',
                executionId: '3aef2ea3-4c59-4224-979c-be249cd80848',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 10:50:01',
                executionMonitoringStartAt: '2020-07-16 19:25:12',
                executionMonitoringEndAt: '2020-07-17 12:49:56',
                numberMax: 4144278755,
                numberDays: 8264261118,
                success: 1012048045,
                cancelled: 1104722878,
                delivering: 4612929526,
                error: 6852175334,
                holding: 9366352986,
                toBeDelivered: 1749017993,
                waiting: 5502327590,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                systemName: 'fy540wy9y7mbiljq0vtu',
                executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 05:38:00',
                executionMonitoringStartAt: '2020-07-16 16:49:41',
                executionMonitoringEndAt: '2020-07-17 16:02:19',
                numberMax: 1646941343,
                numberDays: 7137045763,
                success: 8517161571,
                cancelled: 5837322060,
                delivering: 1639150351,
                error: 7898300809,
                holding: 1366648167,
                toBeDelivered: 1767477478,
                waiting: 2967013170,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bb588cca-e74a-4f2b-931f-2ef29ba22388'));
    });

    it(`/REST:DELETE bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/bb588cca-e74a-4f2b-931f-2ef29ba22388')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateMessageOverview - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateMessageOverview`, () => 
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
                        id: 'b7a8f3c4-b268-4a48-b1fd-bea75b9d125d',
                        tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                        systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                        systemName: 'cwm2rltn53g9ydfasybg',
                        executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-16 23:45:04',
                        executionMonitoringStartAt: '2020-07-17 09:07:07',
                        executionMonitoringEndAt: '2020-07-17 00:42:51',
                        numberMax: 3917417400,
                        numberDays: 3061097270,
                        success: 8683998499,
                        cancelled: 2023551333,
                        delivering: 1268933028,
                        error: 4872977268,
                        holding: 2653935131,
                        toBeDelivered: 8071861360,
                        waiting: 4811624510,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', 'b7a8f3c4-b268-4a48-b1fd-bea75b9d125d');
            });
    });

    it(`/GraphQL bplusItSappiPaginateMessagesOverview`, () => 
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

    it(`/GraphQL bplusItSappiFindMessageOverview - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindMessageOverview`, () => 
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
                            value   : 'bb588cca-e74a-4f2b-931f-2ef29ba22388'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('bb588cca-e74a-4f2b-931f-2ef29ba22388');
            });
    });

    it(`/GraphQL bplusItSappiFindMessageOverviewById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindMessageOverviewById`, () => 
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
                    id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('bb588cca-e74a-4f2b-931f-2ef29ba22388');
            });
    });

    it(`/GraphQL bplusItSappiGetMessagesOverview`, () => 
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

    it(`/GraphQL bplusItSappiUpdateMessageOverview - Got 404 Not Found`, () => 
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
                        
                        id: '7918a40f-25c1-4118-8f24-593e7d524fcc',
                        tenantId: 'bf37bf46-888d-4800-841e-fde0499dfd82',
                        systemId: 'ed86cd73-4ca2-47ae-ab0d-9a1a134545de',
                        systemName: 'cjpepztpzzkmmn8lgau1',
                        executionId: 'b0b17dde-e2c1-4bbc-9e38-f19d4981a51b',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-17 13:39:22',
                        executionMonitoringStartAt: '2020-07-17 11:28:36',
                        executionMonitoringEndAt: '2020-07-17 06:33:28',
                        numberMax: 7165057377,
                        numberDays: 5465229019,
                        success: 9215518479,
                        cancelled: 4541363419,
                        delivering: 6029514202,
                        error: 8459323315,
                        holding: 8232243572,
                        toBeDelivered: 5014441226,
                        waiting: 5583242079,
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

    it(`/GraphQL bplusItSappiUpdateMessageOverview`, () => 
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
                        
                        id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388',
                        tenantId: '89d17be9-5aa4-4294-9c4a-90bdfd97fb79',
                        systemId: 'e66ba1b2-2152-4b5d-a44e-a6d81a519524',
                        systemName: '91pqkmyewpd18d0xh62w',
                        executionId: '9f6a4a47-76c5-45d7-804d-93df9fb23010',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-17 11:20:41',
                        executionMonitoringStartAt: '2020-07-17 05:04:50',
                        executionMonitoringEndAt: '2020-07-17 07:32:12',
                        numberMax: 8571950459,
                        numberDays: 5546338837,
                        success: 1021804576,
                        cancelled: 9750491769,
                        delivering: 5901155954,
                        error: 4341432877,
                        holding: 1143250146,
                        toBeDelivered: 4515788342,
                        waiting: 7843675222,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('bb588cca-e74a-4f2b-931f-2ef29ba22388');
            });
    });

    it(`/GraphQL bplusItSappiDeleteMessageOverviewById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteMessageOverviewById`, () => 
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
                    id: 'bb588cca-e74a-4f2b-931f-2ef29ba22388'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('bb588cca-e74a-4f2b-931f-2ef29ba22388');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});