import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageOverviewRepository } from '@hades/cci/message-overview/domain/message-overview.repository';
import { MockMessageOverviewRepository } from '@hades/cci/message-overview/infrastructure/mock/mock-message-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
            .overrideProvider(IMessageOverviewRepository)
            .useClass(MockMessageOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageOverviewRepository>module.get<IMessageOverviewRepository>(IMessageOverviewRepository);

        await app.init();
    });

    test(`/REST:POST cci/message-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'mub5vwihumr7zek5unllr6i3vdbp3b7vqc5n51ca0j1n72mrq4',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'zllydsz6xe2r4tvxpwlt',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 22:04:11',
                executionMonitoringStartAt: '2020-10-21 23:45:47',
                executionMonitoringEndAt: '2020-10-22 08:49:12',
                numberMax: 4646057748,
                numberDays: 7276758834,
                success: 4555167936,
                cancelled: 1091234623,
                delivering: 1872934040,
                error: 9165966979,
                holding: 4325288489,
                toBeDelivered: 9937494106,
                waiting: 5132673441,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'knki1gxw5952lyqp23hnevwtwhnuclznvtosm1lhzve04spw83',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'n40iud1bniabhpk4nk94',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 18:05:48',
                executionMonitoringStartAt: '2020-10-22 05:41:54',
                executionMonitoringEndAt: '2020-10-21 21:37:35',
                numberMax: 8621985019,
                numberDays: 6613738986,
                success: 7322845292,
                cancelled: 6140739761,
                delivering: 2856495349,
                error: 3830941756,
                holding: 1535874697,
                toBeDelivered: 1349608067,
                waiting: 5870329967,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: null,
                tenantCode: 'tfooxy7hto0q8ek2r7cfoj7qfcrlmizk1gj1ggq4czckjt384h',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'sfytrlauo1qv30r5ollc',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 03:18:46',
                executionMonitoringStartAt: '2020-10-21 21:35:29',
                executionMonitoringEndAt: '2020-10-21 23:33:54',
                numberMax: 3778743871,
                numberDays: 5554046404,
                success: 8733639091,
                cancelled: 8461711883,
                delivering: 6451409129,
                error: 8115412913,
                holding: 6203012089,
                toBeDelivered: 7217130804,
                waiting: 4241452272,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                
                tenantCode: '13n0ownroec7wrbzd2p51ttre9ucgp7qryinepdqyid9lq300o',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'fqwxngxg2qrhqi32bgpd',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 23:38:29',
                executionMonitoringStartAt: '2020-10-22 13:18:22',
                executionMonitoringEndAt: '2020-10-22 12:50:13',
                numberMax: 7519581070,
                numberDays: 2882582873,
                success: 7669335452,
                cancelled: 5025451757,
                delivering: 8840265461,
                error: 8546355882,
                holding: 8969092877,
                toBeDelivered: 6551422354,
                waiting: 7530872938,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: null,
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '835t7tph8eswpewhebh6',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 04:42:37',
                executionMonitoringStartAt: '2020-10-21 15:07:57',
                executionMonitoringEndAt: '2020-10-21 22:48:02',
                numberMax: 7243936212,
                numberDays: 8136456603,
                success: 3467362183,
                cancelled: 8070921237,
                delivering: 3302123696,
                error: 2035706668,
                holding: 2203996948,
                toBeDelivered: 6090775510,
                waiting: 9323325194,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'kxq9x9c5l7kd00d3wkzn',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-21 18:19:38',
                executionMonitoringStartAt: '2020-10-22 02:56:09',
                executionMonitoringEndAt: '2020-10-22 02:02:15',
                numberMax: 4594960586,
                numberDays: 4105334111,
                success: 1403099760,
                cancelled: 3155275569,
                delivering: 6615970249,
                error: 9748854418,
                holding: 1525585736,
                toBeDelivered: 1636989119,
                waiting: 1891315245,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'quxx4au42hmv68npimg9belir9g8eiqr6c4kp6kw9p8v3e4d8a',
                systemId: null,
                systemName: 'qc11xbh24guje18sy1t2',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 06:12:33',
                executionMonitoringStartAt: '2020-10-22 00:33:55',
                executionMonitoringEndAt: '2020-10-22 12:16:10',
                numberMax: 8628755915,
                numberDays: 7088971404,
                success: 3745410693,
                cancelled: 7386819615,
                delivering: 6225539467,
                error: 1949895982,
                holding: 1917357952,
                toBeDelivered: 4461288153,
                waiting: 3645134664,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'mqpiaph4j266vs8m5he6g29ukat0yxtd3gznmrsbfr3jw7azja',
                
                systemName: '5mrvknp6jx030x45el0b',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-21 20:35:38',
                executionMonitoringStartAt: '2020-10-21 19:39:26',
                executionMonitoringEndAt: '2020-10-21 20:03:28',
                numberMax: 1542755522,
                numberDays: 7020613232,
                success: 5110476534,
                cancelled: 3149424548,
                delivering: 2171539983,
                error: 8978025788,
                holding: 9141972216,
                toBeDelivered: 7972261531,
                waiting: 7510785147,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'po51cc6wsuqj4sesj6yf7fc2sgg3josht9wuyxtfnus44xxv0h',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: null,
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 15:31:14',
                executionMonitoringStartAt: '2020-10-22 07:49:25',
                executionMonitoringEndAt: '2020-10-22 07:58:34',
                numberMax: 5020518704,
                numberDays: 1127468126,
                success: 3228796930,
                cancelled: 1945566813,
                delivering: 2991443756,
                error: 2318356186,
                holding: 4896763091,
                toBeDelivered: 3960580600,
                waiting: 3453185375,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: '73j3ms51atl7ojemyclsnmrt4uvra0ty0y5u0fholjuwpa6i6p',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 22:19:02',
                executionMonitoringStartAt: '2020-10-22 13:07:56',
                executionMonitoringEndAt: '2020-10-21 22:50:34',
                numberMax: 4541258266,
                numberDays: 1694959316,
                success: 7114528737,
                cancelled: 7715805058,
                delivering: 4561623240,
                error: 3781272202,
                holding: 5229159460,
                toBeDelivered: 8513283607,
                waiting: 2010474709,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'qojwqtmc4p85clxxa9xu0ukkch9v33ryctmhj6ebd3ft8vottq',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '4z3212rr6pkfmuq3qrkp',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-21 21:40:31',
                executionMonitoringStartAt: '2020-10-22 03:42:53',
                executionMonitoringEndAt: '2020-10-22 05:55:40',
                numberMax: 5509792500,
                numberDays: 1207701001,
                success: 2598443858,
                cancelled: 1864911757,
                delivering: 3404522537,
                error: 7849294967,
                holding: 6019349729,
                toBeDelivered: 4178430651,
                waiting: 7119177140,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 't52yh0rgr9ird6x9z51fpb0kzvivmz28tmil12rx7rfyb2tw5z',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '416goqjl60swljgjmbn8',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 23:15:47',
                executionMonitoringStartAt: '2020-10-21 14:39:24',
                executionMonitoringEndAt: '2020-10-22 03:22:48',
                numberMax: 2640497365,
                numberDays: 4430111456,
                success: 2224644525,
                cancelled: 3158723882,
                delivering: 4762399447,
                error: 6125020983,
                holding: 4977030982,
                toBeDelivered: 9971982851,
                waiting: 6019701603,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'xi17gwh9elzm904z45hfxsydcwe5ahcace3u723vsps86ggvsj',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '12ry10ec55p1wnp6bv5m',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: null,
                executionExecutedAt: '2020-10-22 01:52:22',
                executionMonitoringStartAt: '2020-10-21 19:04:17',
                executionMonitoringEndAt: '2020-10-21 23:52:47',
                numberMax: 7964029248,
                numberDays: 3128158460,
                success: 2873885429,
                cancelled: 5103243483,
                delivering: 7537254791,
                error: 9679016005,
                holding: 9543528510,
                toBeDelivered: 2773324484,
                waiting: 9482470118,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'ngd5iwzf3g4lw90kgv5de8v8hgmvrm7rn52v9oenxraqekhh3l',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'n0vcel2vb423281l24g9',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                
                executionExecutedAt: '2020-10-21 21:34:59',
                executionMonitoringStartAt: '2020-10-22 13:24:35',
                executionMonitoringEndAt: '2020-10-22 01:32:12',
                numberMax: 4203352135,
                numberDays: 9332259000,
                success: 1533844055,
                cancelled: 3423267109,
                delivering: 4432612954,
                error: 3657493459,
                holding: 8049168106,
                toBeDelivered: 8625416544,
                waiting: 2756016633,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: '30q0xqetfpwdlr8k8egr0qrg1k58t9y63tbp092sr9yjmlqawv',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '81zwwq95454tfkb5g4oq',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-10-22 07:55:15',
                executionMonitoringEndAt: '2020-10-21 18:22:24',
                numberMax: 9805152825,
                numberDays: 4513459877,
                success: 1447516470,
                cancelled: 7539159953,
                delivering: 3925740607,
                error: 7375365525,
                holding: 2611639399,
                toBeDelivered: 9920372075,
                waiting: 1496518590,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'kxrtmc6mxi752omjjyyvldjbj1ffpjg26lf3vr161jdsfj86us',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '2bmcb4mi4jnmhwj5gs8a',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-10-22 07:26:23',
                executionMonitoringEndAt: '2020-10-21 17:35:32',
                numberMax: 7904985126,
                numberDays: 6324824381,
                success: 4920495048,
                cancelled: 2984892340,
                delivering: 5913009613,
                error: 6058537020,
                holding: 2087300054,
                toBeDelivered: 8724127128,
                waiting: 4149712266,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'xvikvxqgslx469l8i6ja8va3mi1zjoz5nlas45khwxva0tchk3',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'ejj69nipb8agu6qx97sx',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 05:54:49',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-10-22 00:53:35',
                numberMax: 8887432567,
                numberDays: 1809831836,
                success: 3209587464,
                cancelled: 9196153495,
                delivering: 2030636444,
                error: 7977386088,
                holding: 9886697221,
                toBeDelivered: 5377339657,
                waiting: 8287126633,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'flyd80cblttlabt1vm8mjdswiat63zx771g04f6q9z1i9hubds',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '8hjet9jycu5l1cynzjor',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 08:15:28',
                
                executionMonitoringEndAt: '2020-10-22 13:19:56',
                numberMax: 5821194723,
                numberDays: 5376612437,
                success: 2112850577,
                cancelled: 3298234845,
                delivering: 8662159770,
                error: 6213409716,
                holding: 3686500556,
                toBeDelivered: 6257511941,
                waiting: 2019746651,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: '9e6ya1avdnz7tjfexjhsrrd3p61cpqpvjysoswb9knkuvu2jtg',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'i8l5p78yv9l3jdpt4x2c',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 16:47:37',
                executionMonitoringStartAt: '2020-10-22 08:54:16',
                executionMonitoringEndAt: null,
                numberMax: 9621025188,
                numberDays: 1011676342,
                success: 9339601618,
                cancelled: 8512588016,
                delivering: 3221757208,
                error: 2227260595,
                holding: 9112570742,
                toBeDelivered: 7923469189,
                waiting: 5378371873,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: '5icfcgw5uw3mcrmc0ohtzg89lwgiuupauykkt6qqm59tv6suqk',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '2qcccd5ir02a5hwrehza',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 15:15:09',
                executionMonitoringStartAt: '2020-10-22 13:43:44',
                
                numberMax: 3850661141,
                numberDays: 7818196255,
                success: 3858906246,
                cancelled: 7881040206,
                delivering: 5111752282,
                error: 9317177561,
                holding: 8284801729,
                toBeDelivered: 9236769688,
                waiting: 2357905881,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '5enfubvtfx6n1m69phvqynkra03zz237ks5z8',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'ubc5bj1dbuul099865xv7vdfnmylmpjt5mpilwqg0n4sju5ekq',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'tkolmwblw1uyq4l76k39',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 20:06:06',
                executionMonitoringStartAt: '2020-10-22 05:46:38',
                executionMonitoringEndAt: '2020-10-22 05:39:19',
                numberMax: 5976527105,
                numberDays: 1728754940,
                success: 3361120542,
                cancelled: 2036359743,
                delivering: 5635790442,
                error: 8746141595,
                holding: 8244713678,
                toBeDelivered: 4055218745,
                waiting: 9704069127,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: 'x8j67jglybh487lrgok7sgtrxr4rtni69rqo0',
                tenantCode: 'ke45u3tdc2ggh3568n6j5ledyc9kjdx4u1wum7r0jr7pcpo95e',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '3fsfj79icu2iaqwvoxy6',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 09:54:29',
                executionMonitoringStartAt: '2020-10-22 12:59:54',
                executionMonitoringEndAt: '2020-10-22 00:43:09',
                numberMax: 3983200931,
                numberDays: 6307182790,
                success: 8186669051,
                cancelled: 9693717135,
                delivering: 1102159146,
                error: 2618015613,
                holding: 1709580778,
                toBeDelivered: 4256976795,
                waiting: 4076705228,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'h3qsffc9ejw6bsu7sn1mzqcjqfq956u4eigtrpy5kku6jpv812',
                systemId: 'nao66pd0gcrm7apslj5tk7tfdmx4rx7h7ko1x',
                systemName: 'v2a7p4qs2t0yqrnj9tme',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 07:52:43',
                executionMonitoringStartAt: '2020-10-22 07:39:53',
                executionMonitoringEndAt: '2020-10-22 04:54:21',
                numberMax: 1487373430,
                numberDays: 5091151815,
                success: 9798445419,
                cancelled: 6764983607,
                delivering: 5545278743,
                error: 7371713677,
                holding: 9231102802,
                toBeDelivered: 6063014779,
                waiting: 2837189049,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: '98dkd4rsbnnqr3lcmykjqrz0xe1a2x508l2zaeg7p385ntvfmt',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'jvt820tg2hfhy554eajo',
                executionId: 'vqcfu8fcvvd9q8x0hugpn43vb6hptib8nmbyh',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-21 19:15:12',
                executionMonitoringStartAt: '2020-10-22 03:53:33',
                executionMonitoringEndAt: '2020-10-21 16:04:03',
                numberMax: 7304178680,
                numberDays: 4625895233,
                success: 2810292497,
                cancelled: 8875928800,
                delivering: 9619218748,
                error: 4157741392,
                holding: 5854547425,
                toBeDelivered: 9754590928,
                waiting: 4801090489,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'hvixae8icornrw6r7wvu0hkh8d0u8wl2wcpoc8wwmyk4za813eq',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 's53rh2lfat6x5cuyzu5t',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 12:50:32',
                executionMonitoringStartAt: '2020-10-21 20:30:54',
                executionMonitoringEndAt: '2020-10-22 05:00:38',
                numberMax: 8689671664,
                numberDays: 2638128904,
                success: 1223880982,
                cancelled: 8618720227,
                delivering: 7282619096,
                error: 9656325994,
                holding: 5123007148,
                toBeDelivered: 6457638842,
                waiting: 8498767862,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'coqd0pjaxjrmfd36m04ct7oppgzp221bnwvkcx9066fyw6mnd4',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'x4gdt9qgacc32293wzi95',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 03:43:45',
                executionMonitoringStartAt: '2020-10-21 17:35:11',
                executionMonitoringEndAt: '2020-10-21 14:00:42',
                numberMax: 8283480117,
                numberDays: 3061639232,
                success: 7380134377,
                cancelled: 8861740567,
                delivering: 2520563877,
                error: 5592319985,
                holding: 7553780399,
                toBeDelivered: 7561552832,
                waiting: 3581606100,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewNumberMax is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: '35v3xeffo4lnjsp8ti1ofn770mwewxu1oemztx3i1ud9a1ijg1',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '6dozk8n42152vjicxdq7',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-21 21:58:28',
                executionMonitoringStartAt: '2020-10-21 14:18:09',
                executionMonitoringEndAt: '2020-10-22 03:47:43',
                numberMax: 72079686031,
                numberDays: 8041210295,
                success: 1608182753,
                cancelled: 3093838449,
                delivering: 4628326385,
                error: 2446229354,
                holding: 7550932835,
                toBeDelivered: 4561585146,
                waiting: 4602445664,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberMax is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewNumberDays is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'h3v3k0gzroc5akjksrmo28exvqwbzhv7x3e5dy2vpzgsnm52cn',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'jr1jaww315e0pkndjnny',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 03:28:16',
                executionMonitoringStartAt: '2020-10-22 11:20:14',
                executionMonitoringEndAt: '2020-10-21 19:44:25',
                numberMax: 2816188282,
                numberDays: 28136427036,
                success: 4959551448,
                cancelled: 5267086869,
                delivering: 8069187972,
                error: 9783464501,
                holding: 7481437421,
                toBeDelivered: 4634818240,
                waiting: 3935854309,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberDays is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSuccess is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'h82w6jhzgbxj7ld27jvmpzmdk2w0npbdf1nsfhhym9a3v406u8',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '6gf1yyupok0efg7zycyc',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 08:41:17',
                executionMonitoringStartAt: '2020-10-21 23:33:35',
                executionMonitoringEndAt: '2020-10-21 23:49:08',
                numberMax: 6001126845,
                numberDays: 3003644671,
                success: 29733661429,
                cancelled: 1221713570,
                delivering: 9437332435,
                error: 8195049441,
                holding: 5235867167,
                toBeDelivered: 4068336486,
                waiting: 7595658806,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSuccess is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: '4linhzyx1hu25xescjhv4ngockwrx9gt64fn5d1fngu43p6b9m',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'ljr3v4ioyxvz5jlsj8b3',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 21:24:15',
                executionMonitoringStartAt: '2020-10-21 17:06:24',
                executionMonitoringEndAt: '2020-10-21 22:17:18',
                numberMax: 4587710393,
                numberDays: 9825712409,
                success: 1211036855,
                cancelled: 51771119733,
                delivering: 9341896002,
                error: 5492951038,
                holding: 5257193479,
                toBeDelivered: 9633472866,
                waiting: 5390483194,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewDelivering is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'vjz8wmra44drs4wyee61q90dtwsabdqf5jhlq1ah2kkta21i49',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'ax3yqo96l6xi9m3udaqi',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 08:10:20',
                executionMonitoringStartAt: '2020-10-22 00:27:19',
                executionMonitoringEndAt: '2020-10-22 11:06:31',
                numberMax: 3317069937,
                numberDays: 7094117461,
                success: 5645295700,
                cancelled: 6323430381,
                delivering: 18004570239,
                error: 2521696210,
                holding: 7092900167,
                toBeDelivered: 7910091679,
                waiting: 9648322283,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewDelivering is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'v2cpiao2jgroy1celx5k8tk3jh32ncjo5en3uj5p2vsiyltk1v',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '2s9511nyf9rheshipq9p',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 22:37:24',
                executionMonitoringStartAt: '2020-10-21 19:49:03',
                executionMonitoringEndAt: '2020-10-21 14:14:13',
                numberMax: 2928251400,
                numberDays: 9286509485,
                success: 4613923382,
                cancelled: 3074090773,
                delivering: 9391490134,
                error: 25955999803,
                holding: 3400666685,
                toBeDelivered: 4221860024,
                waiting: 8145376739,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewError is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewHolding is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'w6apvutxjr2a33slz5ajzdikhelvhlhobu4ip8d58zqyrlz9kz',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'zrksigd6ulzxmon3g9tp',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-21 22:15:38',
                executionMonitoringStartAt: '2020-10-21 18:08:19',
                executionMonitoringEndAt: '2020-10-22 08:38:59',
                numberMax: 2363715370,
                numberDays: 3471944780,
                success: 7983422618,
                cancelled: 6363973958,
                delivering: 7032229022,
                error: 1592730791,
                holding: 87436869886,
                toBeDelivered: 1476498459,
                waiting: 8081730349,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewHolding is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: '1mp3xaekjjn4w7x032237ruafnjfh5eqnpgo113zvitt41tuup',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '8in67qapp1h51cf1t9y7',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 09:55:56',
                executionMonitoringStartAt: '2020-10-21 23:47:47',
                executionMonitoringEndAt: '2020-10-22 00:06:35',
                numberMax: 6884282219,
                numberDays: 5633988304,
                success: 4379514981,
                cancelled: 8416813460,
                delivering: 9736163213,
                error: 6983667674,
                holding: 1859933687,
                toBeDelivered: 22513219268,
                waiting: 5712869486,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewToBeDelivered is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewWaiting is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: '5mc83k1ekmi5h34p5i4a7btcqywrcncaxmcterrmdevakxopsh',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'vkxceckn6woo4jkcktg1',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-21 14:55:25',
                executionMonitoringStartAt: '2020-10-22 06:55:34',
                executionMonitoringEndAt: '2020-10-22 01:31:05',
                numberMax: 1099288282,
                numberDays: 7885596109,
                success: 6429839636,
                cancelled: 4761214709,
                delivering: 2759632925,
                error: 3965038352,
                holding: 9093038381,
                toBeDelivered: 7147657514,
                waiting: 64829500224,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewWaiting is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewNumberMax must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'zpyw0yoa3jvhpmtuhwgkvlz66cgdfzgw41cp47jowwl1ol7n9g',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 't3syb8juwwjnvazy5800',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 17:42:41',
                executionMonitoringStartAt: '2020-10-21 21:55:47',
                executionMonitoringEndAt: '2020-10-22 13:18:00',
                numberMax: -9,
                numberDays: 1228896960,
                success: 5884099272,
                cancelled: 3054976272,
                delivering: 2023888957,
                error: 5056150550,
                holding: 9097253773,
                toBeDelivered: 9743228299,
                waiting: 1968002818,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberMax must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewNumberDays must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'qepnl3iazxti3nffq0v9gi4vub3pmhmj51dy54citr36q96z1u',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'n7a9l5lkiybttyusux7o',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-21 19:00:55',
                executionMonitoringStartAt: '2020-10-22 06:24:37',
                executionMonitoringEndAt: '2020-10-21 23:26:48',
                numberMax: 7411508496,
                numberDays: -9,
                success: 7517675581,
                cancelled: 3934825210,
                delivering: 2244667063,
                error: 7904940169,
                holding: 8221662341,
                toBeDelivered: 1047686492,
                waiting: 8621220199,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberDays must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSuccess must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: '0shtxrm3s3kn9r66y3pwqaw0bc3nivccbems9uge21gn03r4jk',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '24blafx7gficx2p8aza8',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-21 22:02:47',
                executionMonitoringStartAt: '2020-10-22 08:39:00',
                executionMonitoringEndAt: '2020-10-21 13:53:40',
                numberMax: 1982287750,
                numberDays: 4634290201,
                success: -9,
                cancelled: 4827107855,
                delivering: 5361258412,
                error: 1691417708,
                holding: 1374262994,
                toBeDelivered: 4624105862,
                waiting: 7149970277,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewSuccess must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewCancelled must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'anicwe9x4e39b73lq5b1myafxt3ydxe8upax6du7cpsffnw3fr',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '9cxxqqia0vt9xkvu844y',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 11:33:55',
                executionMonitoringStartAt: '2020-10-22 05:38:20',
                executionMonitoringEndAt: '2020-10-21 20:48:22',
                numberMax: 8764803853,
                numberDays: 4139626461,
                success: 9597819325,
                cancelled: -9,
                delivering: 6691431930,
                error: 7606995270,
                holding: 3776613472,
                toBeDelivered: 7565387106,
                waiting: 2659058775,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewDelivering must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'onqxoygqxt08m9ucxrf6mfxfs6xsqc5libunqvg7pazc4fffrp',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'zjxuk0t08vcyt4bnd13a',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 20:32:39',
                executionMonitoringStartAt: '2020-10-22 06:48:30',
                executionMonitoringEndAt: '2020-10-21 22:12:00',
                numberMax: 1254937387,
                numberDays: 2963859884,
                success: 7492789600,
                cancelled: 4219228921,
                delivering: -9,
                error: 7926637571,
                holding: 8142044903,
                toBeDelivered: 5152952697,
                waiting: 9232196577,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewDelivering must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: '1mj0kvwyouirjavx4itct8zlssqd3j6p9c715fcsbjvllkq3su',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'od0kx4giay8yp8ju2mh3',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-21 15:17:28',
                executionMonitoringStartAt: '2020-10-22 02:09:48',
                executionMonitoringEndAt: '2020-10-22 13:11:24',
                numberMax: 7097989798,
                numberDays: 4914243601,
                success: 5065740375,
                cancelled: 9706654223,
                delivering: 5460084416,
                error: -9,
                holding: 2550247766,
                toBeDelivered: 7971724894,
                waiting: 2739987457,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewHolding must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: '0wlogv1ieqgvnovs2s1igwl1mp3cfm6jxju7whljqzdpriqp53',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 't1zoxuamc69iops77cgr',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 06:49:38',
                executionMonitoringStartAt: '2020-10-22 06:34:09',
                executionMonitoringEndAt: '2020-10-22 09:08:20',
                numberMax: 9637663169,
                numberDays: 6604934097,
                success: 2303680515,
                cancelled: 7662645850,
                delivering: 3544014971,
                error: 4374851582,
                holding: -9,
                toBeDelivered: 9662653081,
                waiting: 1164322506,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewHolding must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: '91cp8vj2dmgelgzyz4x2e8uf81pqsoq3g2wgdhkldcvq0l4cue',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '5uj5v786y7gteq82bb24',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 05:41:09',
                executionMonitoringStartAt: '2020-10-22 04:04:39',
                executionMonitoringEndAt: '2020-10-21 21:16:41',
                numberMax: 7878612013,
                numberDays: 2735083013,
                success: 5114082427,
                cancelled: 9403873573,
                delivering: 6961590625,
                error: 4114434249,
                holding: 4643423234,
                toBeDelivered: -9,
                waiting: 3094138999,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewToBeDelivered must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewWaiting must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'iwp5trpb4zg9igeef6gniplo4lv04rg0c4b31avimzx1g9w52c',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '4nfn3nomgrjpqn530ku1',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 20:12:44',
                executionMonitoringStartAt: '2020-10-21 19:20:32',
                executionMonitoringEndAt: '2020-10-22 09:17:16',
                numberMax: 7111704606,
                numberDays: 5132512793,
                success: 6760660212,
                cancelled: 2646189658,
                delivering: 5275268387,
                error: 2778958389,
                holding: 8521588514,
                toBeDelivered: 9075107824,
                waiting: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewWaiting must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: '1kiws15pk32gluj0126er30rn5anz4c6i30qwztp3a0oq2n5xu',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '614qrvax24jw3k1tdoyq',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'XXXX',
                executionExecutedAt: '2020-10-22 08:22:14',
                executionMonitoringStartAt: '2020-10-21 14:33:11',
                executionMonitoringEndAt: '2020-10-21 14:06:31',
                numberMax: 1456674234,
                numberDays: 3631892532,
                success: 1400239553,
                cancelled: 1672332513,
                delivering: 3623245825,
                error: 6509998432,
                holding: 2051846285,
                toBeDelivered: 1005639618,
                waiting: 6647273857,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: '4a0p33u39hx87kfbyzlfrorwf4n7eyl9rh6cmm1za8sgikeb4r',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '9vhqoen2ha63xcvv6x6l',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-10-22 02:40:33',
                executionMonitoringEndAt: '2020-10-22 12:47:08',
                numberMax: 2355534908,
                numberDays: 5237393722,
                success: 7827669917,
                cancelled: 1129492462,
                delivering: 1381402390,
                error: 2444175498,
                holding: 3644051276,
                toBeDelivered: 9613337673,
                waiting: 4400016286,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'smtc9spghvyh0tmtz8md0fab5pgyxdt4m13m3d091dwecixxyg',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '6i4sy1gfzzzga6el5bls',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 01:25:22',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-10-21 16:08:00',
                numberMax: 2833719005,
                numberDays: 8196844182,
                success: 9003046626,
                cancelled: 9684808087,
                delivering: 8915248111,
                error: 8207640493,
                holding: 4236674659,
                toBeDelivered: 8705677820,
                waiting: 6790193110,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'e4uv19iwpv2km99g79ru9iooyvbvmnqqii2hfe32sl78gyrmp5',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: '95ey7vaswx1vu23r5bqj',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 07:25:06',
                executionMonitoringStartAt: '2020-10-22 13:26:13',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 8565782995,
                numberDays: 4775449253,
                success: 9361407144,
                cancelled: 4512998469,
                delivering: 4765278465,
                error: 5775105122,
                holding: 8142071533,
                toBeDelivered: 5725024237,
                waiting: 6353141842,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 'y0x3y9xo6n7kb1u4rmmiycw657yrmlpfopb8e5vxqlj5efrqs9',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'viufp3ydhbnil7gogphb',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 05:08:21',
                executionMonitoringStartAt: '2020-10-22 01:29:13',
                executionMonitoringEndAt: '2020-10-21 21:14:27',
                numberMax: 2332897911,
                numberDays: 4282127092,
                success: 4150249262,
                cancelled: 1691607692,
                delivering: 9893131196,
                error: 5896145440,
                holding: 2534374146,
                toBeDelivered: 8215798242,
                waiting: 1299937411,
            })
            .expect(201);
    });

    test(`/REST:GET cci/messages-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-overview/paginate')
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

    test(`/REST:GET cci/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'ab24eb4e-5b5c-403b-b6f9-d00d61f82fa3'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ab5ade27-b55f-432c-a0f7-e667ecea39ba'));
    });

    test(`/REST:GET cci/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview/a6d08e87-b0fa-448d-b213-002e2a58d790')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview/ab5ade27-b55f-432c-a0f7-e667ecea39ba')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ab5ade27-b55f-432c-a0f7-e667ecea39ba'));
    });

    test(`/REST:GET cci/messages-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '070a0492-7b55-4015-aa84-40930935d1c0',
                tenantId: '4f8a0396-6889-4e7e-9518-53ba22e008db',
                tenantCode: 'qbr6l6i880ny8mqn4dosuw5j8cb0rws19nin8hvp5cxeg0rqpk',
                systemId: '33723abe-7940-4a20-bfad-081445d51503',
                systemName: 'z48xh11lui6az18hg9wi',
                executionId: '43ba5109-9fbc-48c6-b127-75456de906a4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 16:27:51',
                executionMonitoringStartAt: '2020-10-22 10:14:11',
                executionMonitoringEndAt: '2020-10-21 17:10:43',
                numberMax: 6638110190,
                numberDays: 7083217599,
                success: 6111014305,
                cancelled: 6224414937,
                delivering: 4808155741,
                error: 2358733990,
                holding: 1762212318,
                toBeDelivered: 5031098640,
                waiting: 7562745188,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                tenantCode: 's9nyeyw6b3jix20k0974yv4qspja5b1ic2l7ob7p7erjlq16n2',
                systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                systemName: 'lsxdi1vn5smx21send1j',
                executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 04:40:27',
                executionMonitoringStartAt: '2020-10-21 20:54:29',
                executionMonitoringEndAt: '2020-10-22 04:35:01',
                numberMax: 2641435388,
                numberDays: 1264630321,
                success: 3647054250,
                cancelled: 5716036693,
                delivering: 8488737327,
                error: 2204767225,
                holding: 4391497292,
                toBeDelivered: 2966997401,
                waiting: 1708947822,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ab5ade27-b55f-432c-a0f7-e667ecea39ba'));
    });

    test(`/REST:DELETE cci/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/message-overview/2501657e-4fa2-466e-a642-1e4d65959ea3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/message-overview/ab5ade27-b55f-432c-a0f7-e667ecea39ba')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateMessageOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateMessageOverviewInput!)
                    {
                        cciCreateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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

    test(`/GraphQL cciCreateMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateMessageOverviewInput!)
                    {
                        cciCreateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        id: '7b53635b-c415-4853-9819-cc046361b4a2',
                        tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                        tenantCode: 'a6anhlazcy6inmdeqjwakeaxy2xbloyuc8r5a6e02f602ovtff',
                        systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                        systemName: '0gkw0edvajcmagjtnuep',
                        executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-10-22 10:07:50',
                        executionMonitoringStartAt: '2020-10-22 07:33:21',
                        executionMonitoringEndAt: '2020-10-21 22:36:06',
                        numberMax: 9775721835,
                        numberDays: 5562058181,
                        success: 2642691380,
                        cancelled: 1143171671,
                        delivering: 8588828672,
                        error: 7758015597,
                        holding: 3052814912,
                        toBeDelivered: 2741552730,
                        waiting: 1451263458,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateMessageOverview).toHaveProperty('id', '7b53635b-c415-4853-9819-cc046361b4a2');
            });
    });

    test(`/GraphQL cciPaginateMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateMessagesOverview (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateMessagesOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageOverview (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'cfb9691f-e646-4a93-bb7b-8ef1d4f1e6f2'
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

    test(`/GraphQL cciFindMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageOverview (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageOverview.id).toStrictEqual('ab5ade27-b55f-432c-a0f7-e667ecea39ba');
            });
    });

    test(`/GraphQL cciFindMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'fefb82f5-6695-400e-88e0-eef83f2cd729'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindMessageOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageOverviewById.id).toStrictEqual('ab5ade27-b55f-432c-a0f7-e667ecea39ba');
            });
    });

    test(`/GraphQL cciGetMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetMessagesOverview (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetMessagesOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateMessageOverviewInput!)
                    {
                        cciUpdateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: 'e5aa2b8b-3e17-47fc-a5f8-5a5e303f4887',
                        tenantId: 'f23a98dd-3c9f-4248-b411-eb650a6393f9',
                        tenantCode: 'nqe030f7a94tzwtvbuxd4j4yooxqdym1wfl2pus3wu7ckandiz',
                        systemId: '040562a4-e0cd-41cc-90c2-f8fb58b31ce5',
                        systemName: '1xrhts3dw8bx28ha8yv0',
                        executionId: '39273277-21dd-49c8-95f2-59abc3719237',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-10-22 09:46:19',
                        executionMonitoringStartAt: '2020-10-22 06:47:29',
                        executionMonitoringEndAt: '2020-10-22 01:13:31',
                        numberMax: 3838003040,
                        numberDays: 9507165568,
                        success: 4831288603,
                        cancelled: 4018355019,
                        delivering: 1678043304,
                        error: 9157391207,
                        holding: 6981560332,
                        toBeDelivered: 9645683105,
                        waiting: 4945010386,
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

    test(`/GraphQL cciUpdateMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateMessageOverviewInput!)
                    {
                        cciUpdateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba',
                        tenantId: '6f89651d-8a8b-4ce9-8e93-bd628cc03f18',
                        tenantCode: '86ra5md1ngf1tuzmrhltvw4cyloh5c537yoqrip4jhhvnnyuz4',
                        systemId: 'c36da6a2-be82-470e-9eb9-2a2ee10e1bf1',
                        systemName: 'sra6x847nw85vxxnar0w',
                        executionId: 'd1b252a7-d420-4f16-8050-dd4bf8b8d6b1',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-10-21 18:17:58',
                        executionMonitoringStartAt: '2020-10-22 06:01:47',
                        executionMonitoringEndAt: '2020-10-22 06:28:02',
                        numberMax: 3256034475,
                        numberDays: 4143656377,
                        success: 6430115534,
                        cancelled: 1352610477,
                        delivering: 9800382939,
                        error: 3714482147,
                        holding: 4958019736,
                        toBeDelivered: 4312377274,
                        waiting: 7570946003,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateMessageOverview.id).toStrictEqual('ab5ade27-b55f-432c-a0f7-e667ecea39ba');
            });
    });

    test(`/GraphQL cciDeleteMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '02ae807c-e0f1-4fcd-89dd-2f53f59e23a4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteMessageOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'ab5ade27-b55f-432c-a0f7-e667ecea39ba'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteMessageOverviewById.id).toStrictEqual('ab5ade27-b55f-432c-a0f7-e667ecea39ba');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});