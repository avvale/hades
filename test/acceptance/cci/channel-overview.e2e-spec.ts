import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelOverviewRepository } from '@hades/cci/channel-overview/domain/channel-overview.repository';
import { MockChannelOverviewRepository } from '@hades/cci/channel-overview/infrastructure/mock/mock-channel-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('channel-overview', () =>
{
    let app: INestApplication;
    let repository: MockChannelOverviewRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IChannelOverviewRepository)
            .useClass(MockChannelOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelOverviewRepository>module.get<IChannelOverviewRepository>(IChannelOverviewRepository);

        await app.init();
    });

    test(`/REST:POST cci/channel-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'm7eu9kkeedkf42wjr71bsuenwpc70zlpi76o7d8p61xgon35f2',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: '4sz2zf2hcka8v541jzyk',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:02:58',
                executionMonitoringStartAt: '2020-11-04 05:24:38',
                executionMonitoringEndAt: '2020-11-03 22:22:35',
                error: 1475300134,
                inactive: 2759372937,
                successful: 1504089206,
                stopped: 6382947422,
                unknown: 7856241579,
                unregistered: 1266424213,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: '8qhpc15ufjyf6wl5tfef4s98af2ffji1eyntylkrlwt17geenp',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: '9wmbpnov0nmupvcbc1o9',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:02:19',
                executionMonitoringStartAt: '2020-11-04 07:45:12',
                executionMonitoringEndAt: '2020-11-04 17:23:22',
                error: 8328496975,
                inactive: 7877275781,
                successful: 6754302525,
                stopped: 7731158953,
                unknown: 4417980244,
                unregistered: 8213085613,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: null,
                tenantCode: 's3bhz026l5ku4lvhv1xw8fyps975d3nctfo3liuf717s12v26i',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'xhktrbrxb2upysrbknh5',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:15:41',
                executionMonitoringStartAt: '2020-11-04 10:30:34',
                executionMonitoringEndAt: '2020-11-04 15:36:20',
                error: 2519861676,
                inactive: 9576176715,
                successful: 6854836873,
                stopped: 2752248947,
                unknown: 5951959844,
                unregistered: 3712202482,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                
                tenantCode: 'aqu95btxh1qathut9q6gzt80u2i5lefzovsdgy3a10j0do10xv',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'suvshzmkvvexyb76sjjo',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:21:26',
                executionMonitoringStartAt: '2020-11-03 19:53:12',
                executionMonitoringEndAt: '2020-11-04 07:08:59',
                error: 7688839160,
                inactive: 4957887772,
                successful: 1841168479,
                stopped: 7078991550,
                unknown: 5269081930,
                unregistered: 4443054836,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: null,
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'd51tkstq9sdlqxpkav1w',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 20:45:21',
                executionMonitoringStartAt: '2020-11-04 08:31:35',
                executionMonitoringEndAt: '2020-11-03 21:20:45',
                error: 7229614697,
                inactive: 9688285159,
                successful: 2663119161,
                stopped: 8673818239,
                unknown: 7759827837,
                unregistered: 6856793001,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: '2816s9b8jqk8ogyoh9vj',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 12:18:47',
                executionMonitoringStartAt: '2020-11-03 18:37:48',
                executionMonitoringEndAt: '2020-11-04 13:22:04',
                error: 3631680288,
                inactive: 6555287810,
                successful: 3678790375,
                stopped: 8266672969,
                unknown: 5313851443,
                unregistered: 6199007439,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: '0w2n1l82iyfpua1pvjo4p2tyasbf6i2d4n6tg2rr9v8133o1oj',
                systemId: null,
                systemName: 'qp3r6rxswq680im0zunv',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 13:49:28',
                executionMonitoringStartAt: '2020-11-04 14:33:07',
                executionMonitoringEndAt: '2020-11-04 08:21:02',
                error: 7513927434,
                inactive: 7652337977,
                successful: 2077488722,
                stopped: 6662171136,
                unknown: 8154002321,
                unregistered: 7839923374,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'jm4s77jot559m7ucmpo561wdwgg5ui8g9ifyu56jah7lauy0fe',
                
                systemName: 'uwl0k95mzq0fffwr142c',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 16:04:38',
                executionMonitoringStartAt: '2020-11-04 14:06:23',
                executionMonitoringEndAt: '2020-11-04 14:23:02',
                error: 3923983556,
                inactive: 3743963816,
                successful: 2048855308,
                stopped: 6946529248,
                unknown: 1013523381,
                unregistered: 1107325552,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: '4v4ohpirz0c5uxf9ej208062mnyswt3p2cn5ors5b5ck9fpb9z',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: null,
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:00:34',
                executionMonitoringStartAt: '2020-11-04 02:29:05',
                executionMonitoringEndAt: '2020-11-04 16:29:42',
                error: 2742519927,
                inactive: 4983389545,
                successful: 9797895259,
                stopped: 9217274960,
                unknown: 5961021969,
                unregistered: 7214148100,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'b4cadqn9rt10tbev5iolfn70ceeccdoicobd5otuq13zql6vou',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 20:10:22',
                executionMonitoringStartAt: '2020-11-04 07:59:41',
                executionMonitoringEndAt: '2020-11-04 02:56:45',
                error: 2051161530,
                inactive: 8584458389,
                successful: 8194766073,
                stopped: 4517771299,
                unknown: 6227091325,
                unregistered: 9170494779,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: '4afcqe1ob1dl4tj7549re0qnv3rumiyjaka80z7sp353ddn02o',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'jmu1kfsj9imrryp12nif',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 16:37:08',
                executionMonitoringStartAt: '2020-11-04 06:53:22',
                executionMonitoringEndAt: '2020-11-04 05:07:25',
                error: 5613719797,
                inactive: 6718497645,
                successful: 9739643172,
                stopped: 3799632997,
                unknown: 8621437303,
                unregistered: 2195763871,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: '5adxdyfif14r3aen7d551y4hv30l0tuakxv99a1lrszlb1gwxw',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'w1rqutcvwgihjfztj4rv',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:43:47',
                executionMonitoringStartAt: '2020-11-04 12:51:13',
                executionMonitoringEndAt: '2020-11-03 23:31:16',
                error: 6760251689,
                inactive: 3699197642,
                successful: 1799725267,
                stopped: 4905215010,
                unknown: 5129431420,
                unregistered: 7716992356,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'lurzsjup9yxmvtps54ogcll3h6c392izl7y377vbq5zc1h070b',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'h8m08h9zgn8t16flj1af',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: null,
                executionExecutedAt: '2020-11-04 07:20:12',
                executionMonitoringStartAt: '2020-11-04 00:56:03',
                executionMonitoringEndAt: '2020-11-03 23:42:26',
                error: 2222367308,
                inactive: 7375034860,
                successful: 7347016481,
                stopped: 9157959010,
                unknown: 5911576219,
                unregistered: 4771911181,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 't13lkb6f8qks1qara97zh5ktx8wfgre39vy4ykiv0rr993qt01',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'olybvlm98ls62c1eu4i3',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                
                executionExecutedAt: '2020-11-03 20:51:51',
                executionMonitoringStartAt: '2020-11-04 11:47:57',
                executionMonitoringEndAt: '2020-11-03 21:01:21',
                error: 3039963567,
                inactive: 3588543161,
                successful: 4767911537,
                stopped: 2416651651,
                unknown: 3644622718,
                unregistered: 9174218168,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'vvfooets9wbb8vfcgrsmj8j53ciz1i3bu19lrjab5vafsbplj1',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'ydo0qzgis7tppkan5bg4',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-04 09:32:19',
                executionMonitoringEndAt: '2020-11-04 15:39:27',
                error: 6687290260,
                inactive: 6002005535,
                successful: 7084086369,
                stopped: 3894182321,
                unknown: 2700180205,
                unregistered: 8598778470,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 's48vi3s2bab2vripc9nh1uz2xodrpvpcur6caeqg1ysp2eru1m',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'payt64gw9lfeydasgwso',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-11-03 23:04:59',
                executionMonitoringEndAt: '2020-11-04 08:21:17',
                error: 1575268757,
                inactive: 1302368160,
                successful: 5843971383,
                stopped: 3304905626,
                unknown: 6494738334,
                unregistered: 4355648946,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'am6l3u4afx76ivh4unladvhkj3czjne5d6ogwudhmtb98qw0gn',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'p3zf0tfq3w9n1zti6aza',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:18:19',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-04 14:26:46',
                error: 6216998471,
                inactive: 2449924106,
                successful: 9890634812,
                stopped: 1616736162,
                unknown: 3819138724,
                unregistered: 9800229860,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'f1908885frnjy9aulcw73iacaj59muwuqxgd9wypbe3r7joj74',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'd7s1yfcqa18eiy2xs9b5',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:38:01',
                
                executionMonitoringEndAt: '2020-11-04 04:09:33',
                error: 9149753609,
                inactive: 9244318284,
                successful: 2729678526,
                stopped: 2840193800,
                unknown: 3084244035,
                unregistered: 3377395592,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'npc8854276695s2279ln4g3pfmgfdjtun5lr67zo7tujgkdqjs',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'hginv8xtdzwhjmb5ztds',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:22:42',
                executionMonitoringStartAt: '2020-11-04 07:01:05',
                executionMonitoringEndAt: null,
                error: 4613408296,
                inactive: 9202832348,
                successful: 2352946635,
                stopped: 7437059667,
                unknown: 8093023790,
                unregistered: 1026832274,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'bivc94psi5h9vkmq2mqw3lhtxnafv6tsx6usrdunhd8dxg93dp',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: '80ufm37arqtcjkiczo5m',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 23:58:53',
                executionMonitoringStartAt: '2020-11-03 18:37:37',
                
                error: 7376963332,
                inactive: 4408973881,
                successful: 8967832558,
                stopped: 9891615683,
                unknown: 7655450669,
                unregistered: 3847574783,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6r5159v4igkbtm0tvogixhwzh4slw3cwvavho',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'm6llvczzn38c2l07phi54haiwzp3t1zxbem67c30fbcy22n8ib',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: '3fd4ohlerzbhau7eezho',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 11:16:29',
                executionMonitoringStartAt: '2020-11-04 01:18:45',
                executionMonitoringEndAt: '2020-11-04 04:47:41',
                error: 7613580817,
                inactive: 6129353511,
                successful: 3393602695,
                stopped: 2661531902,
                unknown: 5083958400,
                unregistered: 8545211194,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: 'gaw1mcq2ph2lojb5o3t4pwuxf7vxch10yajpd',
                tenantCode: 'wxwpbrxgkch7hl4ipsw614lq0yxkalk6h85059iz7s5coi318i',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: '2ibmlevr5lyx002aaeal',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 15:39:52',
                executionMonitoringStartAt: '2020-11-04 01:11:19',
                executionMonitoringEndAt: '2020-11-03 19:10:29',
                error: 8718119922,
                inactive: 2467658540,
                successful: 2807232474,
                stopped: 1017433397,
                unknown: 4702565690,
                unregistered: 1346421648,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'viehzgxyzzbvv050mgl3pqhbr0z51znbuqxek1tatjqsshiw3b',
                systemId: 'po6qbw5qay9xibbrd8k9aqh20nymemhai06e5',
                systemName: 'cyslsoeew2gt73udi5ww',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 11:15:18',
                executionMonitoringStartAt: '2020-11-04 04:54:33',
                executionMonitoringEndAt: '2020-11-04 06:14:33',
                error: 1016211071,
                inactive: 4744505076,
                successful: 7080878729,
                stopped: 3123901819,
                unknown: 9046554576,
                unregistered: 3702080987,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: '0vxdnr2k3omsyxzshxgrwefrdqx4l9h2z9b49jjtrrp73set76',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'at9w63kjcijqdlwd1m6x',
                executionId: '96n02wgnboy9meybmrzpv8jwsdz9jye1veccn',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:56:00',
                executionMonitoringStartAt: '2020-11-04 13:42:56',
                executionMonitoringEndAt: '2020-11-03 18:42:58',
                error: 2573000139,
                inactive: 6665746937,
                successful: 7719461653,
                stopped: 6267863382,
                unknown: 3188016382,
                unregistered: 9383318596,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'offvfm2cug6nr671z0iew8cu0szkcvozp86fctcxoh6lf7g3rm9',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'cey6ncxss31kcuoo7rgd',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:19:19',
                executionMonitoringStartAt: '2020-11-04 06:37:49',
                executionMonitoringEndAt: '2020-11-04 11:00:58',
                error: 9574970180,
                inactive: 4287250313,
                successful: 5214665370,
                stopped: 6564240137,
                unknown: 2374498876,
                unregistered: 1879863934,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'vfi7wgs1foa2ykucrtsjyoqv36q5zn78xcmv56ya49xcf1deii',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'z2xchg8zbj5xkrf1g6ex3',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:03:59',
                executionMonitoringStartAt: '2020-11-03 20:07:54',
                executionMonitoringEndAt: '2020-11-04 01:56:56',
                error: 4506219141,
                inactive: 3471070748,
                successful: 1743065442,
                stopped: 6278327457,
                unknown: 6934478824,
                unregistered: 4453958185,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: '0jxeupgaau38teyhmljdun5slu6n91zuvj6k0440xxx7yoom55',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'jg6diauww7njsvjapych',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 19:24:58',
                executionMonitoringStartAt: '2020-11-04 07:01:50',
                executionMonitoringEndAt: '2020-11-04 07:37:20',
                error: 49464881999,
                inactive: 2017898526,
                successful: 9773574977,
                stopped: 6732719954,
                unknown: 9865434272,
                unregistered: 9313673889,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewError is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewInactive is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'fchb5wu1m93hg71sn0xcqo6ghu90diduip46ev53ezvkedosdp',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'fyryvsjj04it6pt21z5g',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 05:27:12',
                executionMonitoringStartAt: '2020-11-04 15:59:11',
                executionMonitoringEndAt: '2020-11-03 23:32:40',
                error: 7410015429,
                inactive: 99929045598,
                successful: 1336430818,
                stopped: 7909761165,
                unknown: 9375681666,
                unregistered: 2791860562,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewInactive is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: '4rjb817hwl2lpthn0st7n0f079bv1src3ba5re9d1q594yuryf',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'w88o0e6pzholboynpncm',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:17:02',
                executionMonitoringStartAt: '2020-11-04 00:29:37',
                executionMonitoringEndAt: '2020-11-04 07:57:57',
                error: 4928838335,
                inactive: 2572815176,
                successful: 81413799278,
                stopped: 5111773393,
                unknown: 2296456033,
                unregistered: 3303518726,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSuccessful is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewStopped is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: '26y9b57at1sg4lqu5kuf4v249ykge70yv5ptdetj8043dleelx',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'c95j1mqhibgvlif7pw5y',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:59:15',
                executionMonitoringStartAt: '2020-11-04 00:15:53',
                executionMonitoringEndAt: '2020-11-04 08:55:04',
                error: 4625839274,
                inactive: 9371473143,
                successful: 4903742682,
                stopped: 82508438567,
                unknown: 8018535686,
                unregistered: 6611429723,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewStopped is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewUnknown is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'dztgu0wn4hz607hw52xsmd3l0pjsw0eo1qd8xdns0a9nwa7cif',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'rodiuuv3wxtzfo94y9h9',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:16:03',
                executionMonitoringStartAt: '2020-11-03 23:04:44',
                executionMonitoringEndAt: '2020-11-04 01:23:08',
                error: 3676721401,
                inactive: 8415131896,
                successful: 7539488588,
                stopped: 7638234312,
                unknown: 75817404599,
                unregistered: 9267347997,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnknown is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'u2urzzolv7rfysqt34llilolperuhrgcq64zmvxvbq7upendbr',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: '4w2wthmi579hgqqpelm5',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 02:29:28',
                executionMonitoringStartAt: '2020-11-03 22:03:48',
                executionMonitoringEndAt: '2020-11-04 04:36:43',
                error: 8822607622,
                inactive: 4798352049,
                successful: 3745502695,
                stopped: 2061796678,
                unknown: 4458617540,
                unregistered: 96913641573,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnregistered is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: '4it4g5t8tqiyvxzcw4ejjlq4q36edd1yt313s4flc91127eh72',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: '0gysqom0r9tlfdy30xnh',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 17:46:03',
                executionMonitoringStartAt: '2020-11-04 13:37:37',
                executionMonitoringEndAt: '2020-11-04 01:49:39',
                error: -9,
                inactive: 6040701770,
                successful: 1979229088,
                stopped: 7395238300,
                unknown: 2306398378,
                unregistered: 4750934100,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewInactive must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: '0v7xfzd3mfqcf4kuqut2eni7gm4dzu2an0qbt2jw6u1eeizvbk',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'ufb1mj060ytkhzk70fg4',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:11:01',
                executionMonitoringStartAt: '2020-11-04 15:19:50',
                executionMonitoringEndAt: '2020-11-04 00:17:16',
                error: 7016849061,
                inactive: -9,
                successful: 8938306495,
                stopped: 3133569021,
                unknown: 8339038906,
                unregistered: 7803985549,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewInactive must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'cs5r8n6942uluq8q02j8idw5lcsbso1675ch74wbuv7xlhjz13',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'fp7eej9iv67vp66gqiaq',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:31:21',
                executionMonitoringStartAt: '2020-11-04 03:55:58',
                executionMonitoringEndAt: '2020-11-04 09:18:35',
                error: 4728845009,
                inactive: 5791362198,
                successful: -9,
                stopped: 8229941807,
                unknown: 1193413289,
                unregistered: 6255757842,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewSuccessful must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewStopped must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'eo4kdgkml6lrii7x6t57sg9x987usqgs5rjjkbss8xq7lbpzgg',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'wfrnc002testjh2w3aya',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 15:02:24',
                executionMonitoringStartAt: '2020-11-03 21:04:37',
                executionMonitoringEndAt: '2020-11-04 02:33:20',
                error: 7573723339,
                inactive: 3245543158,
                successful: 6710801885,
                stopped: -9,
                unknown: 2246820295,
                unregistered: 9796091476,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewStopped must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewUnknown must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'd4cgq7ed503nsmtmlf637gfabbo57ynzhc232vl2m9dzhgx71q',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'vdof5km57qszqh59ppmn',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 21:42:42',
                executionMonitoringStartAt: '2020-11-03 20:19:44',
                executionMonitoringEndAt: '2020-11-04 00:17:58',
                error: 5700116746,
                inactive: 2098964013,
                successful: 6779391431,
                stopped: 5749554052,
                unknown: -9,
                unregistered: 5755609842,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnknown must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'zfjsxjrf7xf2ywazem31ifr7umf6hjdcc36f7c0zalu438uu4a',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: '1psaf06170uir9wj0ss4',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:30:06',
                executionMonitoringStartAt: '2020-11-03 17:52:17',
                executionMonitoringEndAt: '2020-11-04 10:53:33',
                error: 8800127774,
                inactive: 6679476155,
                successful: 4403654694,
                stopped: 6939213718,
                unknown: 1854244748,
                unregistered: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnregistered must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'qe33f41pe8ayr1eemdowb8cy5z8ou9gn43cdslj9x9i1ttlngx',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'mmluh6b2g1j0gx9din79',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-04 01:21:00',
                executionMonitoringStartAt: '2020-11-04 00:26:33',
                executionMonitoringEndAt: '2020-11-03 19:01:35',
                error: 1426439837,
                inactive: 7056578931,
                successful: 9269258218,
                stopped: 1573313959,
                unknown: 9315364103,
                unregistered: 8377604911,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'e3ilvxru3srq5g2xkeqnd51i1n6jouf3yx1o3zh0bqtc0wp8nd',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'g1dzye4e0p6gq4cx1zn9',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-03 22:51:30',
                executionMonitoringEndAt: '2020-11-03 21:00:04',
                error: 8498564139,
                inactive: 4181458665,
                successful: 8788305986,
                stopped: 4005545902,
                unknown: 2017743373,
                unregistered: 6311180636,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'j4jd8jzdn2xuyf8hdfhj2f2ge4yn0d2gl2fftxp9w7naoc815i',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: '92izd72zdaqrhvsqgszn',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 19:10:37',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-04 07:18:20',
                error: 6641124503,
                inactive: 6061704358,
                successful: 5253112682,
                stopped: 8032725479,
                unknown: 4742814383,
                unregistered: 1487214347,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: '7jrb6i0vikscczqfwodob3vhwbp4obqoi7ne5dutbzwg3ae9fl',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'x7wd1opfa9mynx81kbrj',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:23:28',
                executionMonitoringStartAt: '2020-11-03 20:04:53',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 8015209049,
                inactive: 3636033531,
                successful: 5647298374,
                stopped: 6009447249,
                unknown: 5639988284,
                unregistered: 6949542616,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'fg2g3tp6mw5pe59nm3oxt9awes7rd5k24ekej1vv26kgm8v3kb',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'f98whf01zhg7og9sx3f0',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:44:11',
                executionMonitoringStartAt: '2020-11-03 21:10:12',
                executionMonitoringEndAt: '2020-11-04 08:55:29',
                error: 2149701304,
                inactive: 4903787999,
                successful: 5737278707,
                stopped: 5983094157,
                unknown: 3499012312,
                unregistered: 3092169103,
            })
            .expect(201);
    });

    test(`/REST:GET cci/channels-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels-overview/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/channel-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '907fe629-ec3b-4a27-b389-c5f621ec06ba'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4fa532ec-b214-43d5-be6f-b66f3bcdf59e'));
    });

    test(`/REST:GET cci/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview/25f803d1-9919-4c60-b264-fa4dc3eecac0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview/4fa532ec-b214-43d5-be6f-b66f3bcdf59e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4fa532ec-b214-43d5-be6f-b66f3bcdf59e'));
    });

    test(`/REST:GET cci/channels-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/channel-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '502c8cc2-2255-4a00-a65a-387ac46183eb',
                tenantId: 'd1fe1eea-d65d-4271-8da6-14f5a5d3f29a',
                tenantCode: 'faj6wb8gd2f0y5p1gzphrgjf56ciqsjlkcq686155sn3ygevuc',
                systemId: '9ca75816-66b9-42e8-849b-27a3ec6969f3',
                systemName: '5m09ph06ich2gzvj4fak',
                executionId: 'abb64ec7-3299-4964-85c6-fd852249259c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 20:05:43',
                executionMonitoringStartAt: '2020-11-04 13:32:14',
                executionMonitoringEndAt: '2020-11-04 02:36:25',
                error: 5540084743,
                inactive: 4579819702,
                successful: 2752335249,
                stopped: 4686892883,
                unknown: 2541277174,
                unregistered: 7130142491,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                tenantCode: 'ibu0d4d7cl1g66gwiacpr3en02eqpxv4f984ssy8r7ck0kjnf1',
                systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                systemName: 'tzmq9hlwhrxc0xc62ntq',
                executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:09:25',
                executionMonitoringStartAt: '2020-11-04 13:41:54',
                executionMonitoringEndAt: '2020-11-04 06:00:13',
                error: 6889391512,
                inactive: 2052501364,
                successful: 5678510931,
                stopped: 2050717315,
                unknown: 8988657516,
                unregistered: 7234794115,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4fa532ec-b214-43d5-be6f-b66f3bcdf59e'));
    });

    test(`/REST:DELETE cci/channel-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-overview/c04c82d0-7c89-450e-a8f7-df22c920d391')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/channel-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-overview/4fa532ec-b214-43d5-be6f-b66f3bcdf59e')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateChannelOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelOverviewInput!)
                    {
                        cciCreateChannelOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
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

    test(`/GraphQL cciCreateChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelOverviewInput!)
                    {
                        cciCreateChannelOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'e0834539-eed7-4636-96ef-a410a6fa4894',
                        tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                        tenantCode: 'rmbyvfys3orllgebrgabbp22imx72l0dgqbxu2jlfiygksyz3d',
                        systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                        systemName: '9w9sp0td1b46u2t5nibw',
                        executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 14:27:51',
                        executionMonitoringStartAt: '2020-11-04 04:50:28',
                        executionMonitoringEndAt: '2020-11-04 14:04:13',
                        error: 2937385833,
                        inactive: 6806173956,
                        successful: 6364856883,
                        stopped: 6278521541,
                        unknown: 3407456711,
                        unregistered: 9722473083,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannelOverview).toHaveProperty('id', 'e0834539-eed7-4636-96ef-a410a6fa4894');
            });
    });

    test(`/GraphQL cciPaginateChannelsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateChannelsOverview (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciPaginateChannelsOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannelsOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannelsOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindChannelOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannelOverview (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '7ce07916-b1a2-46a1-b457-ae3e69f872f2'
                        }
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

    test(`/GraphQL cciFindChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannelOverview (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelOverview.id).toStrictEqual('4fa532ec-b214-43d5-be6f-b66f3bcdf59e');
            });
    });

    test(`/GraphQL cciFindChannelOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0caec31e-fd1b-4e39-96fc-e7e2902527d5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindChannelOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelOverviewById.id).toStrictEqual('4fa532ec-b214-43d5-be6f-b66f3bcdf59e');
            });
    });

    test(`/GraphQL cciGetChannelsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetChannelsOverview (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetChannelsOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateChannelOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelOverviewInput!)
                    {
                        cciUpdateChannelOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'b0cc781c-ec17-4b69-bd59-2ea0e73c2501',
                        tenantId: '0b22dbb1-443e-40a9-a770-9ebd0b1d7eff',
                        tenantCode: 'i7qhnd5soagr4lwvfd8pb3p9f6mfykraa76td6mw2ye1w9ys78',
                        systemId: '944728d2-429e-4af4-bf25-60afe2387cb9',
                        systemName: 'qyyov9k3tbi5cum1rhry',
                        executionId: 'ca81ee10-28f6-4b64-9700-22ed93d1e2f1',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 03:37:26',
                        executionMonitoringStartAt: '2020-11-03 18:39:12',
                        executionMonitoringEndAt: '2020-11-04 14:37:48',
                        error: 5902781395,
                        inactive: 2295445521,
                        successful: 2834669168,
                        stopped: 1544619454,
                        unknown: 3418126760,
                        unregistered: 7377333874,
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

    test(`/GraphQL cciUpdateChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelOverviewInput!)
                    {
                        cciUpdateChannelOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e',
                        tenantId: '0b3628f0-5314-43a1-8f64-26487b7c28ee',
                        tenantCode: '4zbq9ro4uz7pwx6dr6ulccp656wwm4qwg4z154848t5jd54pt2',
                        systemId: '31355d37-689b-49ef-a2ab-c04eb8eda0e7',
                        systemName: 'm1ihqw2h13g7ie4095eq',
                        executionId: '1b183c10-81c2-43d6-bf76-5504d5975052',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 12:17:32',
                        executionMonitoringStartAt: '2020-11-04 05:47:50',
                        executionMonitoringEndAt: '2020-11-03 19:45:43',
                        error: 9856154579,
                        inactive: 6176675948,
                        successful: 3138232702,
                        stopped: 2054414660,
                        unknown: 2139459257,
                        unregistered: 8324883363,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannelOverview.id).toStrictEqual('4fa532ec-b214-43d5-be6f-b66f3bcdf59e');
            });
    });

    test(`/GraphQL cciDeleteChannelOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b6ddf6f9-1fee-4d9e-93f0-8dd60b456044'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteChannelOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4fa532ec-b214-43d5-be6f-b66f3bcdf59e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelOverviewById.id).toStrictEqual('4fa532ec-b214-43d5-be6f-b66f3bcdf59e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});