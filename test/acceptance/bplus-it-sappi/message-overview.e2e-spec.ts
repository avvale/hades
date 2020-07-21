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
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'qi2s8gqhtu1xyo2athdz',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 21:36:50',
                executionMonitoringStartAt: '2020-07-21 16:53:03',
                executionMonitoringEndAt: '2020-07-21 22:32:51',
                numberMax: 4686216601,
                numberDays: 8459198156,
                success: 2956793296,
                cancelled: 4138314076,
                delivering: 1548639825,
                error: 8766682250,
                holding: 8795378150,
                toBeDelivered: 8144873513,
                waiting: 3994094417,
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
                
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: '06hzmgbyn1kaek9o2lm8',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 02:28:56',
                executionMonitoringStartAt: '2020-07-21 18:19:30',
                executionMonitoringEndAt: '2020-07-21 01:50:51',
                numberMax: 5404636223,
                numberDays: 5644598025,
                success: 3921028254,
                cancelled: 1540128064,
                delivering: 8856525494,
                error: 1668191654,
                holding: 1741441803,
                toBeDelivered: 9865921711,
                waiting: 5492776907,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: null,
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'hidqoael9tmmxez6bf36',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 14:28:40',
                executionMonitoringStartAt: '2020-07-21 21:29:48',
                executionMonitoringEndAt: '2020-07-21 19:47:16',
                numberMax: 8458622538,
                numberDays: 6008530676,
                success: 2390290310,
                cancelled: 6259888305,
                delivering: 5391734037,
                error: 7041868131,
                holding: 6584069800,
                toBeDelivered: 1953721836,
                waiting: 2554627295,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'evpp5fxjvvdjyt3s9gwi',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:56:49',
                executionMonitoringStartAt: '2020-07-21 14:22:39',
                executionMonitoringEndAt: '2020-07-21 09:18:32',
                numberMax: 9319560785,
                numberDays: 7584265785,
                success: 7989165675,
                cancelled: 2473300214,
                delivering: 2201611186,
                error: 3975109857,
                holding: 2711295779,
                toBeDelivered: 4243302700,
                waiting: 8977260350,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: null,
                systemName: 'xx3ziuruv7zqwbfdt167',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 10:28:47',
                executionMonitoringStartAt: '2020-07-21 11:12:02',
                executionMonitoringEndAt: '2020-07-21 03:57:59',
                numberMax: 5950738957,
                numberDays: 8280203616,
                success: 6122767972,
                cancelled: 5552236422,
                delivering: 6943731967,
                error: 1134697501,
                holding: 9757437461,
                toBeDelivered: 5206034776,
                waiting: 9445244604,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                
                systemName: 'b4ijsv0lsmm3yycie209',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 11:31:55',
                executionMonitoringStartAt: '2020-07-21 07:11:19',
                executionMonitoringEndAt: '2020-07-21 11:07:22',
                numberMax: 8114805477,
                numberDays: 8191114303,
                success: 6607417154,
                cancelled: 6292356484,
                delivering: 3192848796,
                error: 8305389359,
                holding: 6368413888,
                toBeDelivered: 3538072598,
                waiting: 1367930257,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: null,
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 05:37:14',
                executionMonitoringStartAt: '2020-07-21 18:48:15',
                executionMonitoringEndAt: '2020-07-21 02:51:47',
                numberMax: 8625746868,
                numberDays: 7725164232,
                success: 4259076246,
                cancelled: 8895055427,
                delivering: 1177658499,
                error: 9481879917,
                holding: 7319485368,
                toBeDelivered: 5883436566,
                waiting: 5569155633,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 14:06:59',
                executionMonitoringStartAt: '2020-07-21 02:47:52',
                executionMonitoringEndAt: '2020-07-21 04:56:32',
                numberMax: 4477079245,
                numberDays: 5840585063,
                success: 2078941064,
                cancelled: 6795498588,
                delivering: 7660047322,
                error: 8870842334,
                holding: 9723290018,
                toBeDelivered: 9755541185,
                waiting: 6426991398,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: '9a49qvtvmcufcospmi3y',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 17:01:45',
                executionMonitoringStartAt: '2020-07-21 10:53:24',
                executionMonitoringEndAt: '2020-07-21 19:14:21',
                numberMax: 1133479579,
                numberDays: 2122576715,
                success: 2688633150,
                cancelled: 9967304747,
                delivering: 8708062614,
                error: 1089501186,
                holding: 9400305502,
                toBeDelivered: 3373281501,
                waiting: 8829176553,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'tq6va6q1e7cbon283zcj',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 11:39:07',
                executionMonitoringStartAt: '2020-07-21 17:08:22',
                executionMonitoringEndAt: '2020-07-21 07:41:52',
                numberMax: 8105984283,
                numberDays: 7466173111,
                success: 8348794230,
                cancelled: 4469886917,
                delivering: 8954112634,
                error: 8545906190,
                holding: 5706954624,
                toBeDelivered: 8699021916,
                waiting: 7047437136,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: '65xianur9g0fhdfatocl',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: null,
                executionExecutedAt: '2020-07-21 07:35:21',
                executionMonitoringStartAt: '2020-07-21 23:01:08',
                executionMonitoringEndAt: '2020-07-21 02:16:52',
                numberMax: 1101088652,
                numberDays: 2065634871,
                success: 5826487692,
                cancelled: 5208058583,
                delivering: 3871988911,
                error: 2477859666,
                holding: 7445866251,
                toBeDelivered: 1462471375,
                waiting: 6384166746,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: '4gvlead8ffs6gb11ja29',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                
                executionExecutedAt: '2020-07-21 17:02:30',
                executionMonitoringStartAt: '2020-07-21 01:36:14',
                executionMonitoringEndAt: '2020-07-21 19:54:14',
                numberMax: 2996344217,
                numberDays: 2779531340,
                success: 2901018368,
                cancelled: 8288711806,
                delivering: 7915019414,
                error: 6588627724,
                holding: 2754454825,
                toBeDelivered: 7225498444,
                waiting: 3601277955,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'w6e6lro99iknl7rn8jlx',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-21 17:28:08',
                executionMonitoringEndAt: '2020-07-21 12:16:00',
                numberMax: 7850163311,
                numberDays: 9073296196,
                success: 9419982798,
                cancelled: 3776016881,
                delivering: 8932856593,
                error: 4410521895,
                holding: 9819615519,
                toBeDelivered: 7128656850,
                waiting: 5570122421,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'kh3urxxe9fyp6loscqbf',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-21 04:36:28',
                executionMonitoringEndAt: '2020-07-21 08:23:23',
                numberMax: 6188315140,
                numberDays: 3432793330,
                success: 7573168851,
                cancelled: 6854647891,
                delivering: 6312774288,
                error: 1521029022,
                holding: 5918417172,
                toBeDelivered: 8500889042,
                waiting: 4307228091,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'mxumfr5ghpqgv239vi4i',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 15:12:44',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-21 14:02:35',
                numberMax: 2640961968,
                numberDays: 3055277891,
                success: 2727627078,
                cancelled: 3765413577,
                delivering: 6230349334,
                error: 8654406563,
                holding: 7353683207,
                toBeDelivered: 1813911473,
                waiting: 3500352982,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: '27kttrfxz3j3j89f8m6c',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:25:45',
                
                executionMonitoringEndAt: '2020-07-21 20:43:45',
                numberMax: 3327282730,
                numberDays: 6677524830,
                success: 9081099895,
                cancelled: 2679384085,
                delivering: 9411043918,
                error: 5467473119,
                holding: 8044980061,
                toBeDelivered: 5805882601,
                waiting: 6076074998,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'vnkzc2ehqhqhhohof74c',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 22:37:22',
                executionMonitoringStartAt: '2020-07-21 18:19:57',
                executionMonitoringEndAt: null,
                numberMax: 5018026462,
                numberDays: 2176833925,
                success: 9250505748,
                cancelled: 2490577451,
                delivering: 5057098307,
                error: 7463158058,
                holding: 1432320364,
                toBeDelivered: 5775066151,
                waiting: 6815514284,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: '79altvoik5rxlkhgakyp',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 17:50:13',
                executionMonitoringStartAt: '2020-07-21 05:13:53',
                
                numberMax: 2152465828,
                numberDays: 8320409692,
                success: 6172538579,
                cancelled: 2653208947,
                delivering: 1682187338,
                error: 1312823038,
                holding: 2931569409,
                toBeDelivered: 7550124484,
                waiting: 1161124085,
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
                id: '6cczjewjkuiq29zmglyh15f5uogloau82auxs',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 's0hkleg8bjyaes37lp98',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 05:32:23',
                executionMonitoringStartAt: '2020-07-22 00:19:02',
                executionMonitoringEndAt: '2020-07-21 15:54:08',
                numberMax: 7540267805,
                numberDays: 7852289377,
                success: 1474794402,
                cancelled: 9530614754,
                delivering: 6647378606,
                error: 9845028038,
                holding: 6361631498,
                toBeDelivered: 2525366133,
                waiting: 4517832826,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: '7ix14jnc6p58rm8wvyy2sou9h2om3rhjw05ud',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'tu537k0yof747h94n0a9',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 04:41:07',
                executionMonitoringStartAt: '2020-07-21 09:50:24',
                executionMonitoringEndAt: '2020-07-21 21:29:02',
                numberMax: 8362660366,
                numberDays: 9731265968,
                success: 6665581319,
                cancelled: 3771434406,
                delivering: 5226906697,
                error: 8962777790,
                holding: 1779792778,
                toBeDelivered: 9685322179,
                waiting: 1312438633,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: 'evfij88qpke8m2k7txx8mcd9ryqmnt24h33m6',
                systemName: 'qhgobi32p0kmzvn5ozh0',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 05:47:26',
                executionMonitoringStartAt: '2020-07-21 09:37:09',
                executionMonitoringEndAt: '2020-07-21 19:26:31',
                numberMax: 4934042685,
                numberDays: 8129328151,
                success: 6440581232,
                cancelled: 1353035946,
                delivering: 4844944466,
                error: 1325019822,
                holding: 4627791776,
                toBeDelivered: 9136799196,
                waiting: 6931147508,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'qvayieukmkdj3r5le1qg',
                executionId: 'mlkjpzkdrrmp262dr05xcfznea0d4mu7ty6wr',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 15:10:21',
                executionMonitoringStartAt: '2020-07-21 10:49:30',
                executionMonitoringEndAt: '2020-07-22 01:06:03',
                numberMax: 3123186629,
                numberDays: 2332009827,
                success: 4653427773,
                cancelled: 2728365546,
                delivering: 9523884986,
                error: 3557300200,
                holding: 7037510945,
                toBeDelivered: 2373009668,
                waiting: 3507519742,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: '9vs0lys6sdyxz05yzo699',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 05:30:05',
                executionMonitoringStartAt: '2020-07-21 08:56:11',
                executionMonitoringEndAt: '2020-07-21 14:49:27',
                numberMax: 3880126754,
                numberDays: 5628442330,
                success: 9588863651,
                cancelled: 2640293495,
                delivering: 4234557955,
                error: 9609566416,
                holding: 8314926296,
                toBeDelivered: 6055267336,
                waiting: 4686465295,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'qonsks8yuaktw9cu9p23',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 17:47:59',
                executionMonitoringStartAt: '2020-07-21 20:32:55',
                executionMonitoringEndAt: '2020-07-22 00:26:41',
                numberMax: 24137992940,
                numberDays: 9961697909,
                success: 3650813882,
                cancelled: 8811897729,
                delivering: 7064099313,
                error: 9804164980,
                holding: 6977522714,
                toBeDelivered: 6098601198,
                waiting: 5151306713,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'meauejw5g68iohoc4x7x',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 01:08:42',
                executionMonitoringStartAt: '2020-07-21 14:16:26',
                executionMonitoringEndAt: '2020-07-21 18:40:03',
                numberMax: 9878743985,
                numberDays: 99656320070,
                success: 2042620904,
                cancelled: 9895091427,
                delivering: 6666533744,
                error: 4204493075,
                holding: 5319701377,
                toBeDelivered: 8650694338,
                waiting: 8317389614,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'fmw0rcctys9vw1orr35z',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 21:52:40',
                executionMonitoringStartAt: '2020-07-21 17:06:01',
                executionMonitoringEndAt: '2020-07-21 08:27:16',
                numberMax: 4053024698,
                numberDays: 3220096051,
                success: 26255723862,
                cancelled: 6026301577,
                delivering: 1252737749,
                error: 8473434005,
                holding: 5842590352,
                toBeDelivered: 6765755863,
                waiting: 2852213487,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'um7thshx6nsztw2dybg6',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 05:06:05',
                executionMonitoringStartAt: '2020-07-21 10:54:54',
                executionMonitoringEndAt: '2020-07-21 17:01:26',
                numberMax: 6001592797,
                numberDays: 8797748550,
                success: 5932349427,
                cancelled: 91955805409,
                delivering: 8174905532,
                error: 1749981248,
                holding: 1616588122,
                toBeDelivered: 4899214593,
                waiting: 1159133834,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'i2yq5715cbhql8h8vv9t',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:11:39',
                executionMonitoringStartAt: '2020-07-21 16:50:01',
                executionMonitoringEndAt: '2020-07-22 00:30:25',
                numberMax: 6407586373,
                numberDays: 4858772026,
                success: 1327644694,
                cancelled: 2233414115,
                delivering: 50995347899,
                error: 1372917565,
                holding: 5952535812,
                toBeDelivered: 6140585627,
                waiting: 9939731705,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'bug5uz80lvpcgsmzc3eh',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 23:02:24',
                executionMonitoringStartAt: '2020-07-21 09:48:18',
                executionMonitoringEndAt: '2020-07-21 22:58:13',
                numberMax: 4127328660,
                numberDays: 9480156284,
                success: 8436590230,
                cancelled: 6340553566,
                delivering: 4577976844,
                error: 60567874227,
                holding: 8684459274,
                toBeDelivered: 6120779207,
                waiting: 6645894322,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'lkfdntg3hx08c3fm8odk',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 08:09:41',
                executionMonitoringStartAt: '2020-07-21 14:45:35',
                executionMonitoringEndAt: '2020-07-21 03:47:52',
                numberMax: 5690697959,
                numberDays: 3937467799,
                success: 6280453357,
                cancelled: 8536313259,
                delivering: 2002013595,
                error: 6021633075,
                holding: 31786453934,
                toBeDelivered: 4892355059,
                waiting: 1194783455,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: '79vq5a6lxepj19vp200g',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 04:00:33',
                executionMonitoringStartAt: '2020-07-21 04:18:48',
                executionMonitoringEndAt: '2020-07-21 03:46:14',
                numberMax: 8883018824,
                numberDays: 8389778916,
                success: 2032505829,
                cancelled: 6204094197,
                delivering: 4404198433,
                error: 5365586497,
                holding: 1061914089,
                toBeDelivered: 87956341071,
                waiting: 2668586080,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: '64xkbd7vqta26cvmzq73',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 02:54:57',
                executionMonitoringStartAt: '2020-07-21 11:21:06',
                executionMonitoringEndAt: '2020-07-21 01:13:44',
                numberMax: 4546550893,
                numberDays: 4039176907,
                success: 9369769782,
                cancelled: 5181179554,
                delivering: 6349094036,
                error: 9959896751,
                holding: 3188927545,
                toBeDelivered: 8916048667,
                waiting: 61579247400,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'okw17o0009mywbm0m7s5',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 15:32:28',
                executionMonitoringStartAt: '2020-07-21 06:36:29',
                executionMonitoringEndAt: '2020-07-21 07:26:10',
                numberMax: -9,
                numberDays: 5196888315,
                success: 9802177713,
                cancelled: 4561307212,
                delivering: 1389810348,
                error: 2734492700,
                holding: 4859813937,
                toBeDelivered: 6651132209,
                waiting: 8208799364,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'jlefegn0pn67v9v3qywk',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 15:25:40',
                executionMonitoringStartAt: '2020-07-21 08:12:13',
                executionMonitoringEndAt: '2020-07-21 14:54:55',
                numberMax: 4544713942,
                numberDays: -9,
                success: 3804744238,
                cancelled: 3541494309,
                delivering: 5397400654,
                error: 7863533575,
                holding: 6849874359,
                toBeDelivered: 9866953419,
                waiting: 2083762932,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: '6xd05n69fv9rbnuzupu2',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 07:50:39',
                executionMonitoringStartAt: '2020-07-21 15:06:12',
                executionMonitoringEndAt: '2020-07-21 16:03:10',
                numberMax: 5991013508,
                numberDays: 9920300348,
                success: -9,
                cancelled: 5723948317,
                delivering: 1029597083,
                error: 4492922673,
                holding: 7530000766,
                toBeDelivered: 2977065046,
                waiting: 4621361813,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: '3i3nry69qnqn108hj6cs',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 18:59:35',
                executionMonitoringStartAt: '2020-07-21 07:25:54',
                executionMonitoringEndAt: '2020-07-21 06:51:42',
                numberMax: 5160546005,
                numberDays: 3518117654,
                success: 7430183619,
                cancelled: -9,
                delivering: 7247930441,
                error: 7106184722,
                holding: 5905069986,
                toBeDelivered: 9537606297,
                waiting: 8245733075,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'kq7jmbgm80xaqr8e79ah',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 11:23:14',
                executionMonitoringStartAt: '2020-07-21 17:45:16',
                executionMonitoringEndAt: '2020-07-21 07:37:16',
                numberMax: 9049685222,
                numberDays: 4917137889,
                success: 2123040463,
                cancelled: 9182986897,
                delivering: -9,
                error: 5494747735,
                holding: 4412984329,
                toBeDelivered: 7731730542,
                waiting: 8138674706,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'gamv84q7aw2c3ap8yg7q',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 23:06:42',
                executionMonitoringStartAt: '2020-07-21 19:36:46',
                executionMonitoringEndAt: '2020-07-21 20:27:45',
                numberMax: 1808156710,
                numberDays: 6411827238,
                success: 5880675220,
                cancelled: 6034751592,
                delivering: 7717576095,
                error: -9,
                holding: 8935834451,
                toBeDelivered: 8852426000,
                waiting: 5432078156,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'zlb79mkjojpuwhvhh004',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 23:49:40',
                executionMonitoringStartAt: '2020-07-22 00:12:02',
                executionMonitoringEndAt: '2020-07-21 07:02:49',
                numberMax: 2603584689,
                numberDays: 9522768437,
                success: 5843171838,
                cancelled: 4067056842,
                delivering: 5523823775,
                error: 6787710791,
                holding: -9,
                toBeDelivered: 9535285657,
                waiting: 8339648811,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'gvcpw0bgq06ypfhndy66',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 20:27:19',
                executionMonitoringStartAt: '2020-07-21 06:40:19',
                executionMonitoringEndAt: '2020-07-21 19:57:48',
                numberMax: 9780697617,
                numberDays: 2316281795,
                success: 6765773563,
                cancelled: 1132171224,
                delivering: 7156766213,
                error: 7481520620,
                holding: 5845362970,
                toBeDelivered: -9,
                waiting: 7004704887,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'qz6bdk442c6c1adf6p68',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 13:17:53',
                executionMonitoringStartAt: '2020-07-21 05:02:43',
                executionMonitoringEndAt: '2020-07-21 04:16:21',
                numberMax: 1659059515,
                numberDays: 5388857038,
                success: 9403010553,
                cancelled: 4860075346,
                delivering: 4191544245,
                error: 8737910063,
                holding: 8921506719,
                toBeDelivered: 9525731599,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: '0oy987urtai1bl02ldgz',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-22 00:50:52',
                executionMonitoringStartAt: '2020-07-22 00:34:14',
                executionMonitoringEndAt: '2020-07-22 00:21:01',
                numberMax: 6239758102,
                numberDays: 4500470536,
                success: 5371553998,
                cancelled: 6121530924,
                delivering: 9972126562,
                error: 9328739116,
                holding: 4941698611,
                toBeDelivered: 2018649876,
                waiting: 8075017908,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: '5i1zo6lnfvuqnb9m1hdc',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-21 12:58:46',
                executionMonitoringEndAt: '2020-07-21 20:11:17',
                numberMax: 2536679907,
                numberDays: 9128002256,
                success: 4680748912,
                cancelled: 2249514227,
                delivering: 8927781224,
                error: 6428982389,
                holding: 2508535843,
                toBeDelivered: 4985532738,
                waiting: 4133650552,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'hnmlpao5hn46s5mbzlem',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 10:59:08',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-21 15:08:03',
                numberMax: 3062639121,
                numberDays: 3773222818,
                success: 2127489443,
                cancelled: 2720606363,
                delivering: 8329144450,
                error: 6455719869,
                holding: 1102221440,
                toBeDelivered: 5472976102,
                waiting: 4097587863,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'odq4t1qmqikbyur2k8sr',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 02:11:12',
                executionMonitoringStartAt: '2020-07-21 01:50:59',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 3444429707,
                numberDays: 5001918854,
                success: 3004263576,
                cancelled: 4443539195,
                delivering: 7729286806,
                error: 7207240446,
                holding: 9173648851,
                toBeDelivered: 3743825889,
                waiting: 4619264217,
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
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'btlfkb0tt51wl8a5cq9k',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 21:46:42',
                executionMonitoringStartAt: '2020-07-21 15:37:21',
                executionMonitoringEndAt: '2020-07-21 05:57:14',
                numberMax: 9905625314,
                numberDays: 2608906405,
                success: 8854221530,
                cancelled: 1947391530,
                delivering: 8352684942,
                error: 4232336052,
                holding: 5001164892,
                toBeDelivered: 4037258907,
                waiting: 5821168438,
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
                        value   : '4748233b-58ad-403c-af15-a50883004ad7'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4748233b-58ad-403c-af15-a50883004ad7'));
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
            .get('/bplus-it-sappi/message-overview/4748233b-58ad-403c-af15-a50883004ad7')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4748233b-58ad-403c-af15-a50883004ad7'));
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
                
                id: '573c043c-9164-4213-8ad1-d2f0e128998d',
                tenantId: 'f30b2bc5-391f-4d14-b609-41825a24ae33',
                systemId: 'f4ad7d8d-b8f3-4d23-9c37-6f94be486618',
                systemName: 'ezcqk2tg7l93j51sb4kz',
                executionId: '52e19921-d34f-4d22-8663-2fb0e65839b6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 16:24:36',
                executionMonitoringStartAt: '2020-07-21 10:41:56',
                executionMonitoringEndAt: '2020-07-21 21:47:57',
                numberMax: 2599523696,
                numberDays: 6724204563,
                success: 3602715605,
                cancelled: 5690110070,
                delivering: 4399776838,
                error: 7320025089,
                holding: 5195135446,
                toBeDelivered: 9555297489,
                waiting: 7111122664,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '4748233b-58ad-403c-af15-a50883004ad7',
                tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                systemName: 'nxh9l1tmzkbtynqp55k5',
                executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 09:12:06',
                executionMonitoringStartAt: '2020-07-21 19:25:06',
                executionMonitoringEndAt: '2020-07-21 22:56:07',
                numberMax: 2863981216,
                numberDays: 6337481660,
                success: 7698597192,
                cancelled: 5866800276,
                delivering: 2287305900,
                error: 4617874864,
                holding: 8240579848,
                toBeDelivered: 7981586676,
                waiting: 3287113501,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4748233b-58ad-403c-af15-a50883004ad7'));
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
            .delete('/bplus-it-sappi/message-overview/4748233b-58ad-403c-af15-a50883004ad7')
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
                        id: 'd1165f6c-2499-42af-a068-c57a5a9aca2f',
                        tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                        systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                        systemName: 'owfahtqz1yrys9273sy2',
                        executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-21 19:05:33',
                        executionMonitoringStartAt: '2020-07-21 16:57:59',
                        executionMonitoringEndAt: '2020-07-21 01:45:04',
                        numberMax: 3229318889,
                        numberDays: 6689929578,
                        success: 6923904526,
                        cancelled: 4129830339,
                        delivering: 1207304667,
                        error: 5029146985,
                        holding: 4914569359,
                        toBeDelivered: 4235232509,
                        waiting: 2590290435,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', 'd1165f6c-2499-42af-a068-c57a5a9aca2f');
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
                            value   : '4748233b-58ad-403c-af15-a50883004ad7'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('4748233b-58ad-403c-af15-a50883004ad7');
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
                    id: '4748233b-58ad-403c-af15-a50883004ad7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('4748233b-58ad-403c-af15-a50883004ad7');
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
                        
                        id: 'b75a66c4-0420-40b1-a66f-2e9e8ef6678e',
                        tenantId: 'd4bdec11-8a69-48fa-a7e5-97b00294153d',
                        systemId: '02ac35dc-7eef-4584-9823-b65e6ded678a',
                        systemName: 'pbdkzah26wr7i65fvhyg',
                        executionId: 'bf353d11-b4db-4494-9ab7-8d26ab1eb32e',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-21 16:37:48',
                        executionMonitoringStartAt: '2020-07-21 07:57:30',
                        executionMonitoringEndAt: '2020-07-21 05:00:07',
                        numberMax: 8400797702,
                        numberDays: 7799888250,
                        success: 4769569545,
                        cancelled: 8718339085,
                        delivering: 9886480651,
                        error: 4811426835,
                        holding: 4751131509,
                        toBeDelivered: 7488944612,
                        waiting: 5251971483,
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
                        
                        id: '4748233b-58ad-403c-af15-a50883004ad7',
                        tenantId: 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35',
                        systemId: '6c312827-8454-4b70-a629-29d8ee54e684',
                        systemName: '45nijy035foja4zhs6pz',
                        executionId: '0b59269a-5fbf-4f9c-ae41-985a5712b85b',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 11:13:20',
                        executionMonitoringStartAt: '2020-07-21 22:25:30',
                        executionMonitoringEndAt: '2020-07-21 14:04:44',
                        numberMax: 3329622732,
                        numberDays: 2976749022,
                        success: 6572067024,
                        cancelled: 5638273396,
                        delivering: 2236391330,
                        error: 4523505082,
                        holding: 6424485419,
                        toBeDelivered: 6724732429,
                        waiting: 7257758358,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('4748233b-58ad-403c-af15-a50883004ad7');
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
                    id: '4748233b-58ad-403c-af15-a50883004ad7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('4748233b-58ad-403c-af15-a50883004ad7');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});