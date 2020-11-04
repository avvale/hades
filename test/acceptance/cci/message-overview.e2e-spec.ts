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
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'i0yv1uc6vtsnpw5cjkc3zowufpzcbhg7oeaz7leld8iu40fhlg',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '9as6kv9gxy6pcswqgs8i',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:41:29',
                executionMonitoringStartAt: '2020-11-04 03:58:29',
                executionMonitoringEndAt: '2020-11-04 14:52:58',
                numberMax: 4730315360,
                numberDays: 2356653901,
                success: 3938349377,
                cancelled: 1523914260,
                delivering: 5853170582,
                error: 2886008886,
                holding: 8440321659,
                toBeDelivered: 5962788792,
                waiting: 9887607539,
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
                
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'qvsw86wi4xtfg2npi0ohbmkdt8vgrk67f4lgvc2os9qjhmit0o',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '1zqu08en3jlpvfwl3p7h',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 09:12:01',
                executionMonitoringStartAt: '2020-11-04 03:41:16',
                executionMonitoringEndAt: '2020-11-04 13:18:38',
                numberMax: 5446844746,
                numberDays: 1630788968,
                success: 6317334502,
                cancelled: 3803852327,
                delivering: 4521831350,
                error: 9407953610,
                holding: 4828650492,
                toBeDelivered: 1798198134,
                waiting: 4579836142,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: null,
                tenantCode: 'yrb0mzvr3rgpdurfxj4p3vxp1hne0nx6sql7q3pam9kvopzl7p',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'lgb5mwt8zooknj8k12hq',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:11:50',
                executionMonitoringStartAt: '2020-11-04 07:47:03',
                executionMonitoringEndAt: '2020-11-04 09:43:23',
                numberMax: 1524791234,
                numberDays: 3159742112,
                success: 1019199466,
                cancelled: 5955657628,
                delivering: 3169610649,
                error: 7301176319,
                holding: 1149784789,
                toBeDelivered: 6232857972,
                waiting: 5881314745,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                
                tenantCode: 'bdf1mjfffa357d7sfg22ymglbdubvfzl2o77kqwmbbgvpu0hfa',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'h5gefpsgww90r9t6f1k2',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 17:53:39',
                executionMonitoringStartAt: '2020-11-03 18:13:42',
                executionMonitoringEndAt: '2020-11-04 12:13:12',
                numberMax: 6358475699,
                numberDays: 8160993381,
                success: 8814651963,
                cancelled: 3864277649,
                delivering: 3734870178,
                error: 8539643544,
                holding: 7389422131,
                toBeDelivered: 8620785305,
                waiting: 5560055652,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: null,
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'b2stt19hofigf4q6yrvo',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:43:56',
                executionMonitoringStartAt: '2020-11-03 18:23:23',
                executionMonitoringEndAt: '2020-11-04 08:31:18',
                numberMax: 7722565886,
                numberDays: 4713396948,
                success: 9883816538,
                cancelled: 6991700080,
                delivering: 9885342715,
                error: 1451047082,
                holding: 3483243516,
                toBeDelivered: 7481359543,
                waiting: 7633075276,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'qrxbu985fpolchlmt9v1',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:42:59',
                executionMonitoringStartAt: '2020-11-03 21:23:51',
                executionMonitoringEndAt: '2020-11-04 11:42:36',
                numberMax: 5348247157,
                numberDays: 8069714679,
                success: 6097910673,
                cancelled: 6550277704,
                delivering: 1960726598,
                error: 2789173643,
                holding: 2791308040,
                toBeDelivered: 2035359625,
                waiting: 8981909417,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'hmoc9a31hiukz6b3uvixw7gu0cfdi81j7a6gt3ggdlb6txcuds',
                systemId: null,
                systemName: '88obnoibvozpt0wy9re7',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 13:47:13',
                executionMonitoringStartAt: '2020-11-04 06:15:36',
                executionMonitoringEndAt: '2020-11-03 17:37:34',
                numberMax: 3671849501,
                numberDays: 9794313035,
                success: 5683979375,
                cancelled: 9025623853,
                delivering: 6369102213,
                error: 4319579269,
                holding: 7188972494,
                toBeDelivered: 3113314437,
                waiting: 4617209823,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'fsyrw2g220dp2n7eo609xtdjb6lf90jxza0j3n91g9xnq8hx21',
                
                systemName: 'u1f9wutbhjcvnbyjsdv6',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:19:03',
                executionMonitoringStartAt: '2020-11-04 11:51:56',
                executionMonitoringEndAt: '2020-11-03 16:39:29',
                numberMax: 7539639581,
                numberDays: 3560277568,
                success: 6086081321,
                cancelled: 2654147231,
                delivering: 2412476578,
                error: 5003616949,
                holding: 7878566435,
                toBeDelivered: 7715745028,
                waiting: 4394695042,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: '5spdelr9pagpbzht6h70a7u1xuq1ff5ysea2v3lkugys43giyk',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: null,
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:42:36',
                executionMonitoringStartAt: '2020-11-04 02:06:50',
                executionMonitoringEndAt: '2020-11-04 14:01:20',
                numberMax: 1973602989,
                numberDays: 5190854139,
                success: 9143716083,
                cancelled: 6423708841,
                delivering: 2582446794,
                error: 8308643489,
                holding: 9435689027,
                toBeDelivered: 3227822554,
                waiting: 6206155111,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'n6sdnsqmfp7yw5h6wnrdnf5njm8z522ooemluqcpkwgbrww132',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:44:09',
                executionMonitoringStartAt: '2020-11-04 05:22:10',
                executionMonitoringEndAt: '2020-11-03 20:03:24',
                numberMax: 4472651765,
                numberDays: 7488976346,
                success: 6492781338,
                cancelled: 1345032080,
                delivering: 6710000939,
                error: 5280473875,
                holding: 4306347811,
                toBeDelivered: 5778190807,
                waiting: 2160449117,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: '7w97acjbropau742hlx7rn3kfds19dejseuziwriadskro3yg1',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'ch27nd1pr7rsi1n6n5al',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 08:46:54',
                executionMonitoringStartAt: '2020-11-04 15:18:36',
                executionMonitoringEndAt: '2020-11-04 08:06:19',
                numberMax: 2295207492,
                numberDays: 1956994585,
                success: 8866941437,
                cancelled: 6586035390,
                delivering: 9046677092,
                error: 3105919517,
                holding: 4920499826,
                toBeDelivered: 4345902371,
                waiting: 7740967992,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: '9kqavaz032m04xp5yrs5v0r9wq7jdygcb46y2hqwvtdpej53p5',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'j8qf5v99y14kblxnyaty',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 09:29:39',
                executionMonitoringStartAt: '2020-11-04 14:26:38',
                executionMonitoringEndAt: '2020-11-04 11:58:58',
                numberMax: 1421196863,
                numberDays: 6606807798,
                success: 8846324284,
                cancelled: 1347219776,
                delivering: 8297794090,
                error: 7688781765,
                holding: 3236462682,
                toBeDelivered: 5427291734,
                waiting: 1214730430,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'qdxa0et51p9rfqbx4xsee3p4y3vfu0b8zrnu5hpup5qbodrgau',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'jdfocwr22yixxhcwxl5i',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: null,
                executionExecutedAt: '2020-11-03 17:55:22',
                executionMonitoringStartAt: '2020-11-04 06:59:48',
                executionMonitoringEndAt: '2020-11-04 11:39:15',
                numberMax: 5422198798,
                numberDays: 2758173298,
                success: 6420325818,
                cancelled: 2199432952,
                delivering: 3509848115,
                error: 4267719390,
                holding: 4127714558,
                toBeDelivered: 1348283826,
                waiting: 4085382609,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 's9qlrjl8oakuag2r07hgavgrku7a3skywmu0tgukd11yzi0qtk',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '64kqhw33lclqgbgwtjee',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                
                executionExecutedAt: '2020-11-03 23:16:33',
                executionMonitoringStartAt: '2020-11-03 17:47:18',
                executionMonitoringEndAt: '2020-11-04 11:25:20',
                numberMax: 3445048209,
                numberDays: 3773260743,
                success: 8133018112,
                cancelled: 3038819751,
                delivering: 9514287357,
                error: 8187246235,
                holding: 4971395941,
                toBeDelivered: 2945109595,
                waiting: 3252776655,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'qxmll7wcn8kffpyffamiwycrpnqm4w9n6wzt6gol9frr3tmyho',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '3ivcc4845un03po078m2',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-03 21:32:31',
                executionMonitoringEndAt: '2020-11-04 10:18:03',
                numberMax: 6639797603,
                numberDays: 3471800571,
                success: 1635763953,
                cancelled: 1000291104,
                delivering: 2583814647,
                error: 2255218090,
                holding: 8453375898,
                toBeDelivered: 5087346987,
                waiting: 7104795752,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'u662z5n155n8uheeteyos7o4abirm8qwj7v8mtd5m3f4j4zlt0',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'jla4dl6j012zy8rdr5uh',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-11-03 19:32:35',
                executionMonitoringEndAt: '2020-11-03 23:58:09',
                numberMax: 9897398449,
                numberDays: 2783774470,
                success: 6844507063,
                cancelled: 5642705390,
                delivering: 5029500107,
                error: 8062854686,
                holding: 3428371852,
                toBeDelivered: 5358070331,
                waiting: 8924599273,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 't4a0yf79nzkb0pc33awlq3i1i9gv6461wdaz46iage0s9f7ozt',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '3glfeo9obl8xiqqpu5iy',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 15:09:57',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-03 21:52:16',
                numberMax: 1403351553,
                numberDays: 2077368768,
                success: 4329770761,
                cancelled: 6401565391,
                delivering: 4641495304,
                error: 5579894945,
                holding: 4927699788,
                toBeDelivered: 7920230322,
                waiting: 1598445600,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'b7ngynd8n3k8x87zmhl4ji8157fwnd6dh2m146y5b3in1hortp',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'hv19ofr0ndjaj8prn13h',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 12:14:46',
                
                executionMonitoringEndAt: '2020-11-04 08:55:23',
                numberMax: 6399090464,
                numberDays: 8190677341,
                success: 2363896259,
                cancelled: 1145971105,
                delivering: 4793603011,
                error: 9890375515,
                holding: 1822173775,
                toBeDelivered: 3232145963,
                waiting: 2483317384,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'agz0d31fnbpinx7bx67vetlzhexbjixj8uykrt2s9l0hbz5k68',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'nxe6d28mgbtj8wwyehlz',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:40:46',
                executionMonitoringStartAt: '2020-11-03 21:43:23',
                executionMonitoringEndAt: null,
                numberMax: 3638675860,
                numberDays: 9469768144,
                success: 1015879463,
                cancelled: 3240200076,
                delivering: 7781971927,
                error: 7793552898,
                holding: 3891325110,
                toBeDelivered: 3061771865,
                waiting: 4100311960,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: '3yxe6lyeya43lo42wm5utg1ahq1ifsogf09p2lzesdpsa19z8n',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '6ouhcqf1ju16winfrtbq',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 17:54:42',
                executionMonitoringStartAt: '2020-11-03 17:14:00',
                
                numberMax: 9535326474,
                numberDays: 4772847322,
                success: 3804377023,
                cancelled: 4141395142,
                delivering: 1344940793,
                error: 2370005269,
                holding: 5962897384,
                toBeDelivered: 5718356682,
                waiting: 2570266174,
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
                id: 'yv1jrirf7jjztqv5xi5tdeln7okyti2p5092l',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'pbrpt00sb4qzuewtpvmo1kpco46f7fms19odflgh7rswlbhimu',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'h3df7q4kh2rqm37dp4c1',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:56:43',
                executionMonitoringStartAt: '2020-11-03 15:50:38',
                executionMonitoringEndAt: '2020-11-03 17:24:23',
                numberMax: 3964429337,
                numberDays: 2344082136,
                success: 9135440974,
                cancelled: 1197234382,
                delivering: 1595314086,
                error: 2125279173,
                holding: 1913799815,
                toBeDelivered: 6891969510,
                waiting: 2023771971,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'kyz8t7qax6b0iki0p9p8gz25hn8ukdf8z7ejp',
                tenantCode: '79kpfxkbt3pog4zxi7x95gs1jb750m0j8svilbx9nonxfmxzgq',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'lafnra3m08tapra3nsrl',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:14:10',
                executionMonitoringStartAt: '2020-11-03 20:56:32',
                executionMonitoringEndAt: '2020-11-04 00:16:48',
                numberMax: 1831089448,
                numberDays: 1333351479,
                success: 2881682458,
                cancelled: 3254607591,
                delivering: 9729401001,
                error: 7243730944,
                holding: 9406576974,
                toBeDelivered: 8924472540,
                waiting: 4138052948,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'uakd0ezc3qd2er7d0fc5u7044hng08m7uy1gsyow3xztxpvrma',
                systemId: 'l3qp4cmlf6rz6vrdwiuwuado3k1iozgtj1wvk',
                systemName: 'gdnwikd67g3pv1kk7nec',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 12:24:11',
                executionMonitoringStartAt: '2020-11-04 08:36:15',
                executionMonitoringEndAt: '2020-11-04 14:59:26',
                numberMax: 5624866564,
                numberDays: 8183700412,
                success: 3095770250,
                cancelled: 7700415918,
                delivering: 7288588400,
                error: 1346366548,
                holding: 7207012583,
                toBeDelivered: 4086468266,
                waiting: 7067542274,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'fr1lo3f3ufjyjrvt51mz774g4bpj69sd4ixbxim0y1krpw0e4z',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'xphsrdgdw8x9e44r708c',
                executionId: 'f2sit1w49bh4hnyamn5kcrum4pmntz5z4l3xm',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:08:05',
                executionMonitoringStartAt: '2020-11-04 12:09:18',
                executionMonitoringEndAt: '2020-11-03 20:32:59',
                numberMax: 3595427960,
                numberDays: 5698583174,
                success: 6734545101,
                cancelled: 4325688627,
                delivering: 7897741678,
                error: 7582221529,
                holding: 1376229660,
                toBeDelivered: 7951037417,
                waiting: 4927250343,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'rvgo5er8vpw887zl36qt62edhhciossb6yzudo83bsepzbsvsy0',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'o181ewfduv9wx7odhlle',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:31:34',
                executionMonitoringStartAt: '2020-11-04 06:02:17',
                executionMonitoringEndAt: '2020-11-04 11:21:41',
                numberMax: 5133222175,
                numberDays: 8785417418,
                success: 2255232560,
                cancelled: 1568635749,
                delivering: 3172271788,
                error: 7665164479,
                holding: 8243571848,
                toBeDelivered: 9876600749,
                waiting: 1271186577,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'xmyz089o7imogs2gd23fvymjw58h1wio2goo56e24xurwgphb5',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'uy5otrzejd74dnk4n1u9b',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:23:42',
                executionMonitoringStartAt: '2020-11-03 18:25:38',
                executionMonitoringEndAt: '2020-11-04 07:25:04',
                numberMax: 4439887013,
                numberDays: 5165890639,
                success: 7698648208,
                cancelled: 6408089024,
                delivering: 7631294664,
                error: 4416579890,
                holding: 6252445764,
                toBeDelivered: 6191539365,
                waiting: 6654610137,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'mkh8oldkw2yffp6lne0o7txtttd3ifo1yzrutiib68i4n4k16e',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '6ja7h4p26lvbcek2rb0f',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:09:01',
                executionMonitoringStartAt: '2020-11-03 21:58:59',
                executionMonitoringEndAt: '2020-11-03 22:18:09',
                numberMax: 52019730838,
                numberDays: 4396079696,
                success: 8637960106,
                cancelled: 6512057698,
                delivering: 4937218009,
                error: 5334615564,
                holding: 1494620911,
                toBeDelivered: 5915179127,
                waiting: 7999062698,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'noxefz6fu39fwq5h15hp9nyqu9pclyozkeygvmjqz18uthxxx3',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'fclue4kx6fhe1ku3f9h0',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:23:58',
                executionMonitoringStartAt: '2020-11-03 18:18:43',
                executionMonitoringEndAt: '2020-11-03 22:04:41',
                numberMax: 1570586550,
                numberDays: 41619552879,
                success: 4233956624,
                cancelled: 9484888142,
                delivering: 1766027895,
                error: 7771271141,
                holding: 2584094373,
                toBeDelivered: 3666848164,
                waiting: 5291257740,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: '3oy96ci2aluq2qw195s4arfdl2xz7z9o384t187zu849earznl',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '3ys0ardgtl47gbm0misy',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:48:01',
                executionMonitoringStartAt: '2020-11-04 02:21:28',
                executionMonitoringEndAt: '2020-11-04 02:49:20',
                numberMax: 6450526198,
                numberDays: 9046471134,
                success: 50008291598,
                cancelled: 3614516360,
                delivering: 8336892994,
                error: 5164804258,
                holding: 4321512430,
                toBeDelivered: 1688316237,
                waiting: 5858105781,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'o3t3nh19nyawlg6yscjpr2ogz3xsb4t45bpuzgr4ile96cst0d',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'b75v1dkyxdjjydtx6kl3',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:33:33',
                executionMonitoringStartAt: '2020-11-03 15:56:39',
                executionMonitoringEndAt: '2020-11-03 17:59:12',
                numberMax: 3331123520,
                numberDays: 7836581407,
                success: 6371996984,
                cancelled: 81561331874,
                delivering: 4456611242,
                error: 1238419074,
                holding: 2042417438,
                toBeDelivered: 3358899129,
                waiting: 3581364493,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'lst22p6a2vonrplfbn0tharmcr5ewc701fbyhqj37g9t85w6a8',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '9wbw0uo0hzulz1ir1s0v',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 19:45:02',
                executionMonitoringStartAt: '2020-11-03 18:05:12',
                executionMonitoringEndAt: '2020-11-04 05:55:35',
                numberMax: 2923017134,
                numberDays: 3389347824,
                success: 8371612286,
                cancelled: 6517123760,
                delivering: 48459896004,
                error: 9848427338,
                holding: 1772687031,
                toBeDelivered: 4882178366,
                waiting: 3888097699,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'inraqpf9czswnsb227isids1eqjiegd7gebr15tqnxu3b6mno5',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '3bpbdg9ru266kr17xtuf',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 18:09:26',
                executionMonitoringStartAt: '2020-11-04 00:43:59',
                executionMonitoringEndAt: '2020-11-04 05:02:53',
                numberMax: 7853775425,
                numberDays: 4887956951,
                success: 6003948593,
                cancelled: 3863789945,
                delivering: 4680111700,
                error: 82835943319,
                holding: 4738086132,
                toBeDelivered: 8425992269,
                waiting: 1260962567,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'jz52rzkaq4tyazei7n2z10h95xs204qfrt0r788fg6dydoqa6c',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'ktc0xmlu21ctgt26upn8',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:04:00',
                executionMonitoringStartAt: '2020-11-04 00:44:56',
                executionMonitoringEndAt: '2020-11-03 23:35:40',
                numberMax: 9176314557,
                numberDays: 5582803329,
                success: 7176338546,
                cancelled: 7300781081,
                delivering: 5521169720,
                error: 6923201141,
                holding: 80159237882,
                toBeDelivered: 6823055161,
                waiting: 1914788273,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'rr2de37nqz6wkq5e9w8bv6woaw1kx4a6owueaz7tjut2ls8mn7',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '1moxycv9sgkx743k7o87',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:05:18',
                executionMonitoringStartAt: '2020-11-04 09:19:07',
                executionMonitoringEndAt: '2020-11-04 13:08:34',
                numberMax: 2012552161,
                numberDays: 2802676868,
                success: 5677295803,
                cancelled: 7823392163,
                delivering: 9340448734,
                error: 7702226175,
                holding: 8375426242,
                toBeDelivered: 56797068407,
                waiting: 5386083532,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'iks6hvg4x2z2szkdc571gx1e813ixz6d6cay4tyjvwvzeerxnf',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'xcfn28oxvi0rw2e00nkn',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:48:26',
                executionMonitoringStartAt: '2020-11-04 08:43:26',
                executionMonitoringEndAt: '2020-11-03 19:16:58',
                numberMax: 3838360518,
                numberDays: 9527581989,
                success: 3126782127,
                cancelled: 7037656135,
                delivering: 3851763009,
                error: 2003948580,
                holding: 6803599616,
                toBeDelivered: 9706210464,
                waiting: 77507108637,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'bcnud641x3gu4zz2m73676ukx6cax2h9h38v1gr32uhljq7iji',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'z2hz201agraj3m9padk7',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:27:57',
                executionMonitoringStartAt: '2020-11-03 16:14:29',
                executionMonitoringEndAt: '2020-11-04 07:55:33',
                numberMax: -9,
                numberDays: 5275452569,
                success: 5821596252,
                cancelled: 4251975304,
                delivering: 6569652398,
                error: 5168148200,
                holding: 2441557266,
                toBeDelivered: 4542781005,
                waiting: 3596537130,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'nb9mjzwu9dr0lr2bl9oxmgvl11decpsaak2vqq5swwrhv5aszx',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'hscrm7n1gsahj667pd6c',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 08:31:45',
                executionMonitoringStartAt: '2020-11-04 04:08:46',
                executionMonitoringEndAt: '2020-11-04 02:56:57',
                numberMax: 6890774590,
                numberDays: -9,
                success: 2454538843,
                cancelled: 7617108558,
                delivering: 3565731262,
                error: 2596434551,
                holding: 6411604508,
                toBeDelivered: 5306801348,
                waiting: 3343351207,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'jfk23qly71qro6d96dxfgc7xb9gp2bhtpdck0d25wyehhgqqko',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '00d912lrq7rnwfxfeg84',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 08:28:38',
                executionMonitoringStartAt: '2020-11-04 00:13:18',
                executionMonitoringEndAt: '2020-11-04 05:09:38',
                numberMax: 8895557434,
                numberDays: 8833821930,
                success: -9,
                cancelled: 1823838525,
                delivering: 9429058713,
                error: 1922298904,
                holding: 3919127091,
                toBeDelivered: 7816066600,
                waiting: 8252463967,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'zs3pd67fsdf6m2lc618e21hue1orewjrr84ccda2mq277w1qu2',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '6w6azfs01bmb0icim185',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 20:05:19',
                executionMonitoringStartAt: '2020-11-04 03:57:54',
                executionMonitoringEndAt: '2020-11-04 08:48:25',
                numberMax: 3439495581,
                numberDays: 1468969534,
                success: 8611333022,
                cancelled: -9,
                delivering: 6228603041,
                error: 2575668383,
                holding: 9475069473,
                toBeDelivered: 5513547693,
                waiting: 2501542833,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: '1546p460ezd38vqwwu7f16t6n5ioqe3yswvwh4g78cwd8uaqeb',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'knkbasvz0cr5x2naxpru',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 20:30:45',
                executionMonitoringStartAt: '2020-11-03 18:43:37',
                executionMonitoringEndAt: '2020-11-04 06:47:15',
                numberMax: 1339893168,
                numberDays: 9870599756,
                success: 2968535854,
                cancelled: 7397959523,
                delivering: -9,
                error: 7978092123,
                holding: 6627623014,
                toBeDelivered: 3022479340,
                waiting: 4331472874,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'qo12gcsaa07o9itr7r9a2glpkil73ic7f7cb791qvtjfir1i4o',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '2ri0dnayzjp0yudwoi89',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:27:46',
                executionMonitoringStartAt: '2020-11-04 15:15:07',
                executionMonitoringEndAt: '2020-11-04 09:27:53',
                numberMax: 7650477132,
                numberDays: 8809797922,
                success: 9360574843,
                cancelled: 2321163987,
                delivering: 8943504865,
                error: -9,
                holding: 6145104888,
                toBeDelivered: 8341237872,
                waiting: 2485743604,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'ibrha692yjxzotqgv70d698prb6wqiwzefbw40xlpp24yos5z9',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'raggwv1cbgvvhw2tj58l',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:41:12',
                executionMonitoringStartAt: '2020-11-03 19:06:08',
                executionMonitoringEndAt: '2020-11-03 22:26:59',
                numberMax: 1763380732,
                numberDays: 2195194433,
                success: 7019266081,
                cancelled: 6918604399,
                delivering: 2378737125,
                error: 1068741323,
                holding: -9,
                toBeDelivered: 3286163049,
                waiting: 6464604820,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: '8e5ys9ixnw6wnlw762xre1swvmsvrsge5v7566irthcs7nbyk6',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'oj2p642280es0ppiqte7',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:19:31',
                executionMonitoringStartAt: '2020-11-04 13:29:32',
                executionMonitoringEndAt: '2020-11-03 22:55:20',
                numberMax: 1115275496,
                numberDays: 6840546187,
                success: 9747110997,
                cancelled: 6826714972,
                delivering: 9088213871,
                error: 9632087517,
                holding: 8863184115,
                toBeDelivered: -9,
                waiting: 8136934270,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'hkfx0x0scdovuznhhgwgok3cfln64g8ofzjd1pphb6fcw4rkjh',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'krtll7sy9wc2bsih7xz3',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:45:18',
                executionMonitoringStartAt: '2020-11-04 14:34:06',
                executionMonitoringEndAt: '2020-11-03 23:09:57',
                numberMax: 2971935369,
                numberDays: 1762621033,
                success: 5042650503,
                cancelled: 5536027323,
                delivering: 5722903864,
                error: 7424554378,
                holding: 9950063497,
                toBeDelivered: 7127278935,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'w3vzk9fb7ea2so3l1mmkh5b6p81qd0y2jmwo7atj5p8ag0dinb',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'ecief015x1k81b9jnbzn',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-03 20:00:00',
                executionMonitoringStartAt: '2020-11-04 08:29:00',
                executionMonitoringEndAt: '2020-11-04 03:20:34',
                numberMax: 9210668506,
                numberDays: 2602618186,
                success: 7858781843,
                cancelled: 6681070301,
                delivering: 5135451413,
                error: 8080454711,
                holding: 3879249374,
                toBeDelivered: 5682760482,
                waiting: 4797212660,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'qa7pegigdu79jq383p8ub08ry6iwihvwrfpralqkbtydtougbq',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'dxrp6kk7gxtwq8rxajdm',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-04 04:54:40',
                executionMonitoringEndAt: '2020-11-04 13:24:35',
                numberMax: 7659986620,
                numberDays: 9127944451,
                success: 1305420269,
                cancelled: 3317581669,
                delivering: 4574937412,
                error: 6938083046,
                holding: 3563322725,
                toBeDelivered: 5535269630,
                waiting: 4349384462,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'qm78lpcsf11faft2fu554drbp4i3d70s4gjmamll5iwy88ii57',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '1iubah7ncjn280r2yx9g',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 11:59:24',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-03 22:14:27',
                numberMax: 5413657619,
                numberDays: 5783856858,
                success: 1973371431,
                cancelled: 6034902334,
                delivering: 3094116110,
                error: 9264462514,
                holding: 4309269310,
                toBeDelivered: 9182956612,
                waiting: 4608306923,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'pl5rz8p6yhxfomxru3iaquypqjb7zn4sd05qvi2a3ysrqkduov',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'i01r1ny94r9lwtdp43xj',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 17:46:02',
                executionMonitoringStartAt: '2020-11-04 09:25:59',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 6495737339,
                numberDays: 2137750967,
                success: 7192194989,
                cancelled: 7368859328,
                delivering: 6529344481,
                error: 6472142734,
                holding: 6274508845,
                toBeDelivered: 9768596125,
                waiting: 1994368320,
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
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 'r72i1dlt3zeilaf2pa65ya1emz6hcf2jki9af6mvp6harbvxsj',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: '4bv7ip5p58i6zwxfvmbq',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:00:07',
                executionMonitoringStartAt: '2020-11-04 07:48:57',
                executionMonitoringEndAt: '2020-11-04 09:39:14',
                numberMax: 5896478236,
                numberDays: 7537841682,
                success: 5400338029,
                cancelled: 5091542150,
                delivering: 9790230816,
                error: 4530730036,
                holding: 6166009717,
                toBeDelivered: 2972785980,
                waiting: 5409199545,
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
                        id: 'a53d8ebb-c70a-4efb-907b-77d3de7a5b22'
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
                        id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e32e316a-1d21-4cdb-b2b3-21753a94a319'));
    });

    test(`/REST:GET cci/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview/ef64b61d-2af4-43a2-9b04-45550bca7949')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview/e32e316a-1d21-4cdb-b2b3-21753a94a319')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e32e316a-1d21-4cdb-b2b3-21753a94a319'));
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
                
                id: 'dbab82be-cc37-4a16-b4ec-c3a98dbe426e',
                tenantId: '49de447f-7b0d-43b3-9115-7023a37b326d',
                tenantCode: 'p6t16gsp1xsb565c5f0lk17jfwvvh95h2mokkebrpmegh7iqpz',
                systemId: '3ac06039-f0cc-4b78-9d8c-92cbda289dbf',
                systemName: 'a6xtc7ejtm3l3xfjxyz6',
                executionId: 'bacbfcaa-bf79-4350-9d32-98da190f3e7c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 20:23:21',
                executionMonitoringStartAt: '2020-11-04 01:38:38',
                executionMonitoringEndAt: '2020-11-04 12:46:51',
                numberMax: 6567856858,
                numberDays: 1339986758,
                success: 2945886450,
                cancelled: 5445850761,
                delivering: 3254112401,
                error: 5341616920,
                holding: 5394331993,
                toBeDelivered: 2339287183,
                waiting: 1311177359,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                tenantCode: 's67gflyppkkwysvn6lg0vvvmgglgui12zp7ou8bjtgnsh6f69o',
                systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                systemName: 'tiz2znbxonsggbfz2vyu',
                executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:24:49',
                executionMonitoringStartAt: '2020-11-04 13:52:46',
                executionMonitoringEndAt: '2020-11-04 15:15:47',
                numberMax: 2517777166,
                numberDays: 4447195871,
                success: 1021900009,
                cancelled: 4271821049,
                delivering: 1897070454,
                error: 8540981908,
                holding: 8297010781,
                toBeDelivered: 6883999193,
                waiting: 7538597745,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e32e316a-1d21-4cdb-b2b3-21753a94a319'));
    });

    test(`/REST:DELETE cci/message-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-overview/c43bc0f8-c0c9-41ef-8cea-db608d886ba1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/message-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-overview/e32e316a-1d21-4cdb-b2b3-21753a94a319')
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
                        id: '339488b3-9177-4b33-aacb-f966d13bf596',
                        tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                        tenantCode: 't4sf2u7lgwpmj2dnyondnea4uu3nomavbfblrv2hem2ke40z06',
                        systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                        systemName: 'xklbnbdi65skfimdakac',
                        executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-03 16:47:58',
                        executionMonitoringStartAt: '2020-11-04 01:09:30',
                        executionMonitoringEndAt: '2020-11-04 13:14:42',
                        numberMax: 3638211484,
                        numberDays: 2155018608,
                        success: 4785682680,
                        cancelled: 7070805567,
                        delivering: 9496900191,
                        error: 7127819607,
                        holding: 9754547461,
                        toBeDelivered: 8466422869,
                        waiting: 8451044672,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateMessageOverview).toHaveProperty('id', '339488b3-9177-4b33-aacb-f966d13bf596');
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
                            id: '63df216e-b60e-48ec-89cd-b9c9f616e850'
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
                            id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageOverview.id).toStrictEqual('e32e316a-1d21-4cdb-b2b3-21753a94a319');
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
                    id: '308cff68-5594-4977-a448-7c377f0ceb77'
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
                    id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageOverviewById.id).toStrictEqual('e32e316a-1d21-4cdb-b2b3-21753a94a319');
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
                        
                        id: 'a1f113a0-291e-47ad-9ca9-c276f75465a6',
                        tenantId: '7ed52bc9-5cbf-4bab-bbf6-07db9fba365d',
                        tenantCode: 'x628ad9vl9nqiwjxgozoh0nodytf4avehbx053b62xtxscxqdk',
                        systemId: '176a6396-c8bf-4d9b-8d3e-486399e213e4',
                        systemName: 'mf1jw683grvts493dan9',
                        executionId: 'd7327612-5771-4100-954c-ece42fc4ba4e',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 13:20:10',
                        executionMonitoringStartAt: '2020-11-04 11:44:51',
                        executionMonitoringEndAt: '2020-11-04 03:35:42',
                        numberMax: 2402810779,
                        numberDays: 5150198439,
                        success: 3269164992,
                        cancelled: 4688478746,
                        delivering: 9129834328,
                        error: 7078115372,
                        holding: 9901220373,
                        toBeDelivered: 7577575713,
                        waiting: 4697079855,
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
                        
                        id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319',
                        tenantId: 'f5b28cf1-c21c-4bc7-ad09-541cb2a4bd29',
                        tenantCode: 'cw9qnwdlqyxuxtk9ghfmpy1t7aqet16lvm18jkd79cdc7tol8t',
                        systemId: '4096288e-5ae1-41bd-8650-64a57186a666',
                        systemName: 'okcuky0oqf9lr4k65e50',
                        executionId: '44f3b011-593c-4e83-bf52-1beef4743823',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 00:03:12',
                        executionMonitoringStartAt: '2020-11-04 03:10:14',
                        executionMonitoringEndAt: '2020-11-04 00:37:45',
                        numberMax: 4368847153,
                        numberDays: 3399527938,
                        success: 9532940411,
                        cancelled: 9457863625,
                        delivering: 9054391399,
                        error: 2983535601,
                        holding: 6940398231,
                        toBeDelivered: 1296450183,
                        waiting: 9586900469,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateMessageOverview.id).toStrictEqual('e32e316a-1d21-4cdb-b2b3-21753a94a319');
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
                    id: 'c8d375df-2af1-447a-9702-0b840dad996f'
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
                    id: 'e32e316a-1d21-4cdb-b2b3-21753a94a319'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteMessageOverviewById.id).toStrictEqual('e32e316a-1d21-4cdb-b2b3-21753a94a319');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});