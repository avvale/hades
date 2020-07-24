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
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'fesdbnqhkh840omg5mu1xmky8a8c5wmcmi8qjobi4yu8sls553',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'rqm5jm6gxvqb4g0wuizx',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 01:43:52',
                executionMonitoringStartAt: '2020-07-24 04:45:18',
                executionMonitoringEndAt: '2020-07-23 23:13:14',
                numberMax: 1357678791,
                numberDays: 2269659054,
                success: 9699402527,
                cancelled: 3286461490,
                delivering: 1250101713,
                error: 3479926469,
                holding: 1332308836,
                toBeDelivered: 8180870608,
                waiting: 5371216120,
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
                
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'c0tnedkie589y0laicco4t5najocfbo7fccpqcmzosu9pgbb7r',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'og7645kxxfmku98omiop',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 12:12:33',
                executionMonitoringStartAt: '2020-07-23 21:33:19',
                executionMonitoringEndAt: '2020-07-24 17:35:24',
                numberMax: 2806531002,
                numberDays: 4854130160,
                success: 7871437137,
                cancelled: 6337725997,
                delivering: 7615468880,
                error: 2978941403,
                holding: 2744878577,
                toBeDelivered: 1577546226,
                waiting: 3072641725,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: null,
                tenantCode: '3g968os0n36of1lq6xr7n7jpe6fralpf49x7pyh2y50r4zzobu',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'pkef83u7nipcgrbz7bym',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 00:46:17',
                executionMonitoringStartAt: '2020-07-23 23:30:31',
                executionMonitoringEndAt: '2020-07-24 11:17:34',
                numberMax: 7550659015,
                numberDays: 9405643354,
                success: 3022506216,
                cancelled: 6758187189,
                delivering: 8672263892,
                error: 1423534172,
                holding: 6854174847,
                toBeDelivered: 8550526186,
                waiting: 9363218491,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                
                tenantCode: 'f2ullw1s4oenjypyibejyv181qrmapm7r8sc9bp0rk8lpvlbpz',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: '4mqrpenhpqd4r5cqhlvp',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 04:14:29',
                executionMonitoringStartAt: '2020-07-23 20:48:38',
                executionMonitoringEndAt: '2020-07-24 16:57:56',
                numberMax: 7082665715,
                numberDays: 6067799825,
                success: 1379656323,
                cancelled: 9870899273,
                delivering: 8438679850,
                error: 3692621766,
                holding: 7223860218,
                toBeDelivered: 8124921553,
                waiting: 5917609148,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: null,
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'do5a5vp1erncoptnwwae',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 17:03:34',
                executionMonitoringStartAt: '2020-07-24 01:20:53',
                executionMonitoringEndAt: '2020-07-24 09:56:26',
                numberMax: 5330803396,
                numberDays: 8932254110,
                success: 9476402137,
                cancelled: 3958027292,
                delivering: 6070688469,
                error: 2873223600,
                holding: 2432723996,
                toBeDelivered: 1159093723,
                waiting: 1916277159,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'z32e88w613mvaclmh9hd',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 08:59:02',
                executionMonitoringStartAt: '2020-07-24 10:57:25',
                executionMonitoringEndAt: '2020-07-23 21:11:04',
                numberMax: 6514778857,
                numberDays: 1446331637,
                success: 3582425312,
                cancelled: 9384298567,
                delivering: 5281508187,
                error: 3733176191,
                holding: 2906418690,
                toBeDelivered: 2117897930,
                waiting: 9410869716,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'w26pxppibrawy0x36dhjt3jnqxvx9e9temlkp8u6itjqow73ci',
                systemId: null,
                systemName: 'ev8cvzarl2wxtuscf580',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 06:29:17',
                executionMonitoringStartAt: '2020-07-24 04:00:02',
                executionMonitoringEndAt: '2020-07-24 07:36:52',
                numberMax: 5822918275,
                numberDays: 3688658909,
                success: 6247615673,
                cancelled: 1788643275,
                delivering: 6260168170,
                error: 3441722986,
                holding: 3677541555,
                toBeDelivered: 6234493558,
                waiting: 5561694399,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'yc3ynko5mqltxsog0kkhbni5k0hzrejbjjweb6gdkt80qtj26t',
                
                systemName: 'uxtsprdei2q607hzr2tf',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 00:12:30',
                executionMonitoringStartAt: '2020-07-24 04:26:36',
                executionMonitoringEndAt: '2020-07-23 18:26:01',
                numberMax: 8929349373,
                numberDays: 6207840492,
                success: 5746712748,
                cancelled: 3510544772,
                delivering: 3168966165,
                error: 6831685524,
                holding: 2783980847,
                toBeDelivered: 7371492172,
                waiting: 5823874654,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'jcha917thzmhhxse4ijv1q1svda9j2qhpz2a3gx258xgwupg03',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: null,
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 15:39:14',
                executionMonitoringStartAt: '2020-07-23 23:35:08',
                executionMonitoringEndAt: '2020-07-24 11:45:59',
                numberMax: 6312571029,
                numberDays: 3331765692,
                success: 1000198304,
                cancelled: 3769599728,
                delivering: 4058271986,
                error: 6870963657,
                holding: 9130871035,
                toBeDelivered: 4660961206,
                waiting: 5030537238,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'ae8kc2l7cu3847ez1aiublpg795so5v9mysguy7avla6iw6rza',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 02:15:58',
                executionMonitoringStartAt: '2020-07-23 23:40:19',
                executionMonitoringEndAt: '2020-07-23 19:22:44',
                numberMax: 3957305552,
                numberDays: 6545394773,
                success: 3185369456,
                cancelled: 4590683692,
                delivering: 3811809163,
                error: 1861771432,
                holding: 3726762765,
                toBeDelivered: 9102952040,
                waiting: 6231703665,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: '28fko7mij2zql3o7ofq3qll6ho5mcc0ym4vhlvekioy0vk8r6q',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'x3i2y0ytynqt2e5umtsm',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 21:16:03',
                executionMonitoringStartAt: '2020-07-23 21:37:04',
                executionMonitoringEndAt: '2020-07-24 05:21:13',
                numberMax: 8501055858,
                numberDays: 8159434167,
                success: 7235700032,
                cancelled: 2500455954,
                delivering: 4160696604,
                error: 8102124394,
                holding: 9870389691,
                toBeDelivered: 3188498054,
                waiting: 1929828358,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'z8q6tr5ajn6vj937qhjt0otyvjqcksz46divp39ghb02vul568',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'vaz3kd5bcv1kfzx0lloe',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 00:30:31',
                executionMonitoringStartAt: '2020-07-24 03:24:52',
                executionMonitoringEndAt: '2020-07-24 03:19:48',
                numberMax: 5321922393,
                numberDays: 8594361365,
                success: 8776668607,
                cancelled: 1182307601,
                delivering: 5905711285,
                error: 6611936640,
                holding: 4903805533,
                toBeDelivered: 5296461686,
                waiting: 1872685729,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: '7e2erbmhslnjpv6ppdpc2olsnyg1scsxp00f3yc3t2aucwuc1t',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'fk3tre1vkc9ne670a4y0',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: null,
                executionExecutedAt: '2020-07-24 13:05:24',
                executionMonitoringStartAt: '2020-07-24 15:06:28',
                executionMonitoringEndAt: '2020-07-24 08:09:29',
                numberMax: 1338865372,
                numberDays: 6406071162,
                success: 3227524895,
                cancelled: 2319235397,
                delivering: 3853016694,
                error: 4480690935,
                holding: 3463194261,
                toBeDelivered: 5466571470,
                waiting: 4967206310,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'y5wcqhtuqx9ri2o0wsja1ra1nir7czgcznjqlfv54qcc84avu3',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'g071pram9k51kkxau1u4',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                
                executionExecutedAt: '2020-07-23 21:53:42',
                executionMonitoringStartAt: '2020-07-23 23:16:27',
                executionMonitoringEndAt: '2020-07-23 22:10:15',
                numberMax: 5802019447,
                numberDays: 7187787835,
                success: 7407768967,
                cancelled: 5899793501,
                delivering: 9015249351,
                error: 7406453946,
                holding: 2380539897,
                toBeDelivered: 6245232480,
                waiting: 2948132953,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'kw0u47v06yrr32izvb3s34cvluv4p67krqqcybaomzchbqq2am',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: '7jcfgjdwj7xs9kiua9nd',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-24 17:15:45',
                executionMonitoringEndAt: '2020-07-24 03:15:13',
                numberMax: 6630503027,
                numberDays: 2145828441,
                success: 8681984325,
                cancelled: 4321082923,
                delivering: 4619672053,
                error: 3431297471,
                holding: 8146863839,
                toBeDelivered: 9677681594,
                waiting: 5028184745,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'ls7n5rut4tdmc2gndxo1od9kl88mdgkugd7molfx40spczi9w0',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: '93c0wgvzx30auq0abwoq',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-24 07:53:56',
                executionMonitoringEndAt: '2020-07-24 09:28:33',
                numberMax: 8226825687,
                numberDays: 5749231176,
                success: 7162499091,
                cancelled: 6121201460,
                delivering: 4521671079,
                error: 2931721314,
                holding: 9384409145,
                toBeDelivered: 3411274372,
                waiting: 2083691517,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'fqr8jxjf17h3xfzw9fs0xc0jjjpzymb2v8hnox3snze6q4wbed',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'n1oal1iza0r83rc12occ',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 09:16:59',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-23 21:37:42',
                numberMax: 4733323129,
                numberDays: 8369543122,
                success: 4092343367,
                cancelled: 7364818907,
                delivering: 2819993419,
                error: 4200738882,
                holding: 5051409242,
                toBeDelivered: 4103232616,
                waiting: 4565400689,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'tbtozj5botn1g1iy0r40wbunveft3cet1dmfu0j36utdhcvev5',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'auhirang3xd2dlwbpphb',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 04:07:50',
                
                executionMonitoringEndAt: '2020-07-24 03:37:09',
                numberMax: 1006926279,
                numberDays: 8917840436,
                success: 1149044878,
                cancelled: 1057275776,
                delivering: 9253196765,
                error: 5454677732,
                holding: 7170063746,
                toBeDelivered: 1765561213,
                waiting: 9991333537,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'numcksd6bpubrzoaav2ixavym1el5ze432loitmgjshaz52ntd',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'yxxb6idn0skz5a5e20g4',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 08:05:27',
                executionMonitoringStartAt: '2020-07-23 22:06:06',
                executionMonitoringEndAt: null,
                numberMax: 4577476412,
                numberDays: 2941713201,
                success: 6760245499,
                cancelled: 4131287841,
                delivering: 5965515043,
                error: 3216730864,
                holding: 1518129542,
                toBeDelivered: 1796028301,
                waiting: 8908570498,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'bd9v89lgyelounhdwjsf6wwkrgocfaxxk6zfpy3zvcl9hxmyon',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'qhltwaumxqu6yr4ihsmj',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 13:12:22',
                executionMonitoringStartAt: '2020-07-24 05:04:21',
                
                numberMax: 2479035764,
                numberDays: 8444465729,
                success: 6197612968,
                cancelled: 4445873760,
                delivering: 9407510887,
                error: 2704525310,
                holding: 3637703205,
                toBeDelivered: 8417437310,
                waiting: 2715719693,
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
                id: '6g41s1d6clg4lxu952va2mzbfjly58n28lz9c',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'yp5wj0cnrja4ckjh1ah47mc3vnwv9d3ervolon9ncjocj7jc4t',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: '1p3al1xcmfpcj57ac34u',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 02:08:24',
                executionMonitoringStartAt: '2020-07-24 11:18:32',
                executionMonitoringEndAt: '2020-07-24 05:51:13',
                numberMax: 7671448300,
                numberDays: 8871238469,
                success: 9639601866,
                cancelled: 3443291176,
                delivering: 5846483708,
                error: 2009081162,
                holding: 2862112484,
                toBeDelivered: 7473832854,
                waiting: 8556023499,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: 'po5wmrowdt92k9hn3vbggu9vteiu5olkwf74k',
                tenantCode: 'fhzdc0ttcn5yn58z8myxaov6nu0u8uebsnz8bchudz14lsnd39',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'vr29h6ihtkx8wjq53fze',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 11:25:22',
                executionMonitoringStartAt: '2020-07-24 04:16:50',
                executionMonitoringEndAt: '2020-07-24 00:49:22',
                numberMax: 9156668420,
                numberDays: 3056047036,
                success: 1910508889,
                cancelled: 2001333266,
                delivering: 7918542241,
                error: 9740912691,
                holding: 4970867001,
                toBeDelivered: 7110052981,
                waiting: 1814892423,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'ozfccot4dgq0atd1paux71ouy8ccwewtlc7hrbuitil71nhyrh',
                systemId: 'pv70frw8nmq61m4v0o74blddyxe9sw39hf8hl',
                systemName: 'zluz8v6o4zmehxuafzff',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 06:01:55',
                executionMonitoringStartAt: '2020-07-24 00:34:52',
                executionMonitoringEndAt: '2020-07-24 11:26:54',
                numberMax: 2671302507,
                numberDays: 7234588560,
                success: 3727120808,
                cancelled: 1357936463,
                delivering: 3900149317,
                error: 4471028694,
                holding: 6267910695,
                toBeDelivered: 4173876892,
                waiting: 7767426915,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: '4tho2xrz3vo8gtawaa272xask94vc0e7hq4t6h6lcg4p8t00tz',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'yubxtkagsutymlrjlt6s',
                executionId: '85mu88dq2nocj2vcspmwkf7x1irj4wc4y4p73',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 06:26:23',
                executionMonitoringStartAt: '2020-07-24 12:19:21',
                executionMonitoringEndAt: '2020-07-23 20:22:52',
                numberMax: 8997973260,
                numberDays: 4294153713,
                success: 3195807042,
                cancelled: 5385632885,
                delivering: 6702307571,
                error: 2394985766,
                holding: 7114818742,
                toBeDelivered: 2853371824,
                waiting: 1062242909,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'hnqvp3xdrzr5467r20x03qiwp9rkeittsd80h73nftoe0xxvhyt',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'f2sb6n1zurbehr4fxuqb',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 12:37:03',
                executionMonitoringStartAt: '2020-07-24 05:03:45',
                executionMonitoringEndAt: '2020-07-23 22:28:57',
                numberMax: 5354082481,
                numberDays: 9848680948,
                success: 3587052595,
                cancelled: 8252737685,
                delivering: 7323668459,
                error: 1100865539,
                holding: 8909772501,
                toBeDelivered: 6238867543,
                waiting: 4815177428,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'v5oacmwszhzxqgd06kpur1h9t6aww5zq4r79wh4r9s6fog82p8',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: '0f86vcm7wnjwzvtp9wrgi',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 08:54:00',
                executionMonitoringStartAt: '2020-07-24 00:17:00',
                executionMonitoringEndAt: '2020-07-23 21:02:10',
                numberMax: 6110938626,
                numberDays: 9570010795,
                success: 1688447353,
                cancelled: 4681332446,
                delivering: 2313767829,
                error: 4855670229,
                holding: 1131708579,
                toBeDelivered: 8144498921,
                waiting: 6394498810,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'zqmwjixlwno80wlsrcs4py7veki4kucosxdh3j6h1wl9ukw3xo',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: '7ak5yovchyk810ojtf51',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 06:31:46',
                executionMonitoringStartAt: '2020-07-24 01:34:45',
                executionMonitoringEndAt: '2020-07-24 16:20:06',
                numberMax: 64260602920,
                numberDays: 7357932223,
                success: 1639757530,
                cancelled: 2709737215,
                delivering: 7098289258,
                error: 4540737958,
                holding: 6153628970,
                toBeDelivered: 4324368110,
                waiting: 8688426947,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'uil9miv7uz8qa1ph4ascnfc09syi5aerdh065akvzoz6rq82g2',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'l68nmq2chd5yki72wvci',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 10:00:23',
                executionMonitoringStartAt: '2020-07-24 02:35:05',
                executionMonitoringEndAt: '2020-07-24 01:23:07',
                numberMax: 8550882882,
                numberDays: 21335594110,
                success: 5458914493,
                cancelled: 2638333434,
                delivering: 2683139263,
                error: 5545148552,
                holding: 9783007511,
                toBeDelivered: 5190850800,
                waiting: 9190834830,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'xvoxmel7l2bhdczr09hcks26a9o7i4b35yyu72chqnt7qa924p',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'bpkdejhmwhwhqyutczmb',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 07:50:03',
                executionMonitoringStartAt: '2020-07-24 13:43:44',
                executionMonitoringEndAt: '2020-07-24 12:47:46',
                numberMax: 8463265950,
                numberDays: 5549723117,
                success: 15919402193,
                cancelled: 7008108745,
                delivering: 9883477626,
                error: 3516256526,
                holding: 5079135451,
                toBeDelivered: 3256451734,
                waiting: 5756157077,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: '30gis2vdofan13k95jmwvgunsutozvaqkhk1cb1fauklqs7hkp',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: '28r3g1y0829n9ka7a0ni',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 22:46:59',
                executionMonitoringStartAt: '2020-07-24 01:32:19',
                executionMonitoringEndAt: '2020-07-23 23:39:11',
                numberMax: 3926499329,
                numberDays: 8481822783,
                success: 2036605767,
                cancelled: 25756936154,
                delivering: 5762405565,
                error: 2271120911,
                holding: 1263429018,
                toBeDelivered: 7211421633,
                waiting: 2312631863,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'd7ywgx0vjssoj4mya7q3x2qcs5ep76i64ht10o44x2otzbmdwq',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'dxlnjrany6eq47n8uz3o',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 19:45:04',
                executionMonitoringStartAt: '2020-07-24 10:58:05',
                executionMonitoringEndAt: '2020-07-24 12:11:47',
                numberMax: 3974256699,
                numberDays: 9015936470,
                success: 3862825625,
                cancelled: 7094620567,
                delivering: 79824190214,
                error: 7452142684,
                holding: 6700713208,
                toBeDelivered: 9028968393,
                waiting: 4701274830,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'rqgqj5me3x2tazu8qq5nv83nnpu99u2tmutl01qrsh612v4k7r',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: '40z4oqwvvunmy4worun2',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 08:09:57',
                executionMonitoringStartAt: '2020-07-24 06:50:42',
                executionMonitoringEndAt: '2020-07-24 01:39:58',
                numberMax: 1878177019,
                numberDays: 1444682375,
                success: 5284406644,
                cancelled: 5649662909,
                delivering: 9098010775,
                error: 44818302440,
                holding: 7165992079,
                toBeDelivered: 8089862728,
                waiting: 4501173280,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'vzxwenhtpe7ryk9xbiax8w32i8bwhc2ap2izmbbkdd6llkbllg',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'sxczm8b8ozur57vx39u0',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 18:45:51',
                executionMonitoringStartAt: '2020-07-24 17:52:35',
                executionMonitoringEndAt: '2020-07-23 21:31:09',
                numberMax: 2189310209,
                numberDays: 1136091270,
                success: 7701441944,
                cancelled: 7301159204,
                delivering: 4438364960,
                error: 5265672210,
                holding: 47149366721,
                toBeDelivered: 6505107944,
                waiting: 4438184885,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'jndavp19tzh2yootp60tib04c0zqgdx7zfhexoumx8ypp2dmhv',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'oqtxe9w9e5n8hedb3wvx',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 10:20:57',
                executionMonitoringStartAt: '2020-07-23 19:50:25',
                executionMonitoringEndAt: '2020-07-24 04:32:29',
                numberMax: 7342487733,
                numberDays: 6049205489,
                success: 8325360570,
                cancelled: 9598684313,
                delivering: 6712626187,
                error: 9179433666,
                holding: 1455825622,
                toBeDelivered: 94137807355,
                waiting: 6401287113,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'hh5rpdbm5lctn1u0hejfwnjpq9lf0ggn7kd512t8wk1hnoxdte',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: '4c1mrr1j5xbyowt6008v',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 12:46:29',
                executionMonitoringStartAt: '2020-07-23 22:02:14',
                executionMonitoringEndAt: '2020-07-23 18:14:33',
                numberMax: 7188664378,
                numberDays: 3760063480,
                success: 2652616067,
                cancelled: 5172780253,
                delivering: 3932332561,
                error: 2485285110,
                holding: 7819966732,
                toBeDelivered: 5088440371,
                waiting: 12200963886,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'lvng93jm4p2aihej3vji6duq7pr4mmy83ivr0yat8zxcjbell9',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'p184w07zq6kfgcany29n',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 02:39:38',
                executionMonitoringStartAt: '2020-07-24 08:59:40',
                executionMonitoringEndAt: '2020-07-24 05:47:22',
                numberMax: -9,
                numberDays: 7780204661,
                success: 8284062478,
                cancelled: 9645083640,
                delivering: 5616301360,
                error: 8146110496,
                holding: 4894282265,
                toBeDelivered: 3373175512,
                waiting: 1747360225,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'swc3axftb426xpfk4jnri5hovlacugurkdgebuvhtckbluegb7',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'gehvc0kqq0ayt9yq8ves',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 22:00:50',
                executionMonitoringStartAt: '2020-07-24 01:05:16',
                executionMonitoringEndAt: '2020-07-24 12:41:25',
                numberMax: 5479352352,
                numberDays: -9,
                success: 9619395885,
                cancelled: 9659649653,
                delivering: 9663992120,
                error: 2079047450,
                holding: 5989020771,
                toBeDelivered: 1114117869,
                waiting: 7885779107,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'mefpt3943ea0jbot9afvzhobb7pgx5lcbmjwrs2edgghgk7li1',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'l2o2kh2vjehjntqtukof',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 18:14:10',
                executionMonitoringStartAt: '2020-07-24 13:54:49',
                executionMonitoringEndAt: '2020-07-24 10:07:25',
                numberMax: 4014465426,
                numberDays: 6039699038,
                success: -9,
                cancelled: 1354291718,
                delivering: 6357970121,
                error: 4795297833,
                holding: 3846574395,
                toBeDelivered: 7668320862,
                waiting: 3647064189,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'e8qvp86osvodx0a91jgs1s983olf0nkd5csxm0d4scvdetn695',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'c2fhtveg5zm4ol4ugabh',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 13:22:40',
                executionMonitoringStartAt: '2020-07-24 17:03:53',
                executionMonitoringEndAt: '2020-07-24 12:08:27',
                numberMax: 3809686444,
                numberDays: 2334192204,
                success: 9894755043,
                cancelled: -9,
                delivering: 8140040481,
                error: 9511028753,
                holding: 6993209980,
                toBeDelivered: 3225853041,
                waiting: 9545533476,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: '1xndw9l6i7n0ia54190i8hspnebk6qnc29ynbjyjsvavsdq8tj',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'uxa1ab2fvh7hwxthdk2s',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 15:39:56',
                executionMonitoringStartAt: '2020-07-24 06:34:10',
                executionMonitoringEndAt: '2020-07-24 16:07:27',
                numberMax: 4034607956,
                numberDays: 1785796294,
                success: 7111102028,
                cancelled: 6241600947,
                delivering: -9,
                error: 6445672476,
                holding: 9345713611,
                toBeDelivered: 1284447727,
                waiting: 6638978889,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: '2g9s2nnzg27w5ut3n8o6t6lhdf8xb1litk8a105ezs78j8mcfl',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'c890p76wmv4f9aiwveov',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 22:37:01',
                executionMonitoringStartAt: '2020-07-24 17:55:34',
                executionMonitoringEndAt: '2020-07-23 22:31:59',
                numberMax: 6408241659,
                numberDays: 4221621856,
                success: 6211730961,
                cancelled: 5816443023,
                delivering: 2975796854,
                error: -9,
                holding: 2954661456,
                toBeDelivered: 9008570708,
                waiting: 3819364864,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'b0ckv6zl04bjifczyaow7kjav15ycf9zfdvns4tel6bb1scjn7',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'yhvwqaaui3u7g303uldx',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 07:12:23',
                executionMonitoringStartAt: '2020-07-24 07:48:14',
                executionMonitoringEndAt: '2020-07-24 13:39:50',
                numberMax: 4021886934,
                numberDays: 6919967384,
                success: 4939459678,
                cancelled: 5583196064,
                delivering: 6319378799,
                error: 8030362536,
                holding: -9,
                toBeDelivered: 5127172032,
                waiting: 3182250135,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'rqo1hcq1fmno9h1hrwt4pmn0akop3eb6u6f1ig4psvlmy1aj7d',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'i6evpt6fnk6t2amcqt3t',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 18:22:51',
                executionMonitoringStartAt: '2020-07-24 12:36:54',
                executionMonitoringEndAt: '2020-07-23 19:09:55',
                numberMax: 5967676415,
                numberDays: 4953540090,
                success: 4532024668,
                cancelled: 4929796141,
                delivering: 5752189391,
                error: 3525853056,
                holding: 5534231692,
                toBeDelivered: -9,
                waiting: 3716172798,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: '4993fftmw0zdoyyvtbrkxf491xi4l5x6y98bobtmi2q1t32nd5',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'ryfdocgu432t7a1i499i',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 17:02:43',
                executionMonitoringStartAt: '2020-07-23 21:19:33',
                executionMonitoringEndAt: '2020-07-23 20:19:10',
                numberMax: 6218114329,
                numberDays: 1707154572,
                success: 3790393028,
                cancelled: 4213723064,
                delivering: 6349459400,
                error: 9494437073,
                holding: 5136281846,
                toBeDelivered: 3307426923,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'drxrosyu2vuauvlp4hkrs6t8coo5ksiy1cjd5n9bbj5lv84ehy',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'vfvs4aesdhcdodg2jl1t',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-23 19:08:23',
                executionMonitoringStartAt: '2020-07-24 04:17:22',
                executionMonitoringEndAt: '2020-07-24 06:33:30',
                numberMax: 4296987857,
                numberDays: 7527461031,
                success: 8783592701,
                cancelled: 5027754281,
                delivering: 5358287984,
                error: 7443599186,
                holding: 2735938539,
                toBeDelivered: 3521601296,
                waiting: 2751947343,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'b777k028zo0cbx9vfe1hriikm3o0aat1wnkdttqwux7noqrf2h',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'kc37v9hpynlv2voi2utg',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-24 12:41:29',
                executionMonitoringEndAt: '2020-07-23 20:34:35',
                numberMax: 9325576633,
                numberDays: 5081105755,
                success: 1361864486,
                cancelled: 1870067463,
                delivering: 7322989781,
                error: 1666661682,
                holding: 8643628862,
                toBeDelivered: 5947658837,
                waiting: 9034115819,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'iw5hpaywbd7w99ori3im5ics27h9cjca190brvs0og0ibrdmk0',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'hupjmcsj3qnahm7jbin3',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 18:43:48',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-24 01:54:46',
                numberMax: 7714431093,
                numberDays: 3868830773,
                success: 2392512567,
                cancelled: 1890990604,
                delivering: 5425214929,
                error: 6380548824,
                holding: 6973672475,
                toBeDelivered: 7643193951,
                waiting: 1820057521,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: '6l1sxhbghl7d5jofitse2iu675npsnn9b4zuk95xabl8eejqp9',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'gbgi9do7xfn02vnajthk',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 21:19:31',
                executionMonitoringStartAt: '2020-07-23 21:34:36',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 9223226666,
                numberDays: 5237618979,
                success: 2351918868,
                cancelled: 3689211803,
                delivering: 3128519897,
                error: 5256708663,
                holding: 2073612475,
                toBeDelivered: 7255047504,
                waiting: 8100323749,
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
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: 'tita4sci8jhkzub07z4mzxtvt1jwryaemlpyi5qpysthk9hhwz',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'grju21ojpcenb0jv1dnc',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 23:51:23',
                executionMonitoringStartAt: '2020-07-24 00:05:12',
                executionMonitoringEndAt: '2020-07-23 18:11:41',
                numberMax: 2475624040,
                numberDays: 4130233986,
                success: 7485625153,
                cancelled: 2743571918,
                delivering: 4725840315,
                error: 6653699605,
                holding: 9052727645,
                toBeDelivered: 4749843200,
                waiting: 1284899446,
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
                        value   : '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4'));
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
            .get('/bplus-it-sappi/message-overview/87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4'));
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
                
                id: 'fe66eb13-98e4-4625-ba5e-1265cd262e27',
                tenantId: 'fdf52826-f8e3-4c3e-8fde-c6ec108c38cb',
                tenantCode: 'bccthdfytbq32rzp5iq6i3qbmbhe3jry65ziggaoxgeec2xgqr',
                systemId: '5a840d88-830e-46e6-be98-a3f422b3b7c5',
                systemName: 'tnxo3hepx1uc035b9wxl',
                executionId: '08e85288-95f5-4eee-94bf-2416278b9b33',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 20:44:41',
                executionMonitoringStartAt: '2020-07-24 00:15:34',
                executionMonitoringEndAt: '2020-07-24 03:58:02',
                numberMax: 9452492078,
                numberDays: 7444086492,
                success: 7177707693,
                cancelled: 5509053631,
                delivering: 2706048143,
                error: 2967610091,
                holding: 4555481965,
                toBeDelivered: 6563685559,
                waiting: 1296768134,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                tenantCode: '9hwk97rlrlkyeukwhhuyv4aqxbf0235b1czj24i111rwn9nbqi',
                systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                systemName: 'moixfx0b9pd7m25oy2xk',
                executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 11:08:07',
                executionMonitoringStartAt: '2020-07-24 03:05:59',
                executionMonitoringEndAt: '2020-07-23 23:20:37',
                numberMax: 6354508826,
                numberDays: 9226030848,
                success: 1646925629,
                cancelled: 6272377953,
                delivering: 8471338620,
                error: 2712270140,
                holding: 7522193943,
                toBeDelivered: 9215283679,
                waiting: 5435005977,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4'));
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
            .delete('/bplus-it-sappi/message-overview/87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4')
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
                        id: 'a574280f-654d-4d47-8d55-b5af311a54e9',
                        tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                        tenantCode: 'ygq2ezdprh605jt3lnyfag8vj2n18aod7a95ueibgnokhxxaz9',
                        systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                        systemName: 'abvi87hwethkditzhw47',
                        executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-24 00:34:59',
                        executionMonitoringStartAt: '2020-07-24 02:04:17',
                        executionMonitoringEndAt: '2020-07-24 06:17:26',
                        numberMax: 8634163352,
                        numberDays: 2697585119,
                        success: 2059712850,
                        cancelled: 4278935557,
                        delivering: 1409750647,
                        error: 2324179178,
                        holding: 4401392194,
                        toBeDelivered: 1204202207,
                        waiting: 9014375656,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', 'a574280f-654d-4d47-8d55-b5af311a54e9');
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
                            value   : '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4');
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
                    id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4');
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
                        
                        id: 'ebc94f90-381f-43b2-a85a-a0ce0af90e1a',
                        tenantId: '81e53df1-1df2-4f55-8cf1-87d84ce04b6f',
                        tenantCode: 'qv3mf2f4l5kga5gp3vq65h9k756skq5j2cf3h2picpq8zralrt',
                        systemId: '40cd4d75-1df7-47d5-849a-3d2b38f3385a',
                        systemName: '952bfi6bdof2ih7twarh',
                        executionId: '929941f3-a1f9-46ff-bea8-2dff886809bc',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-24 10:12:28',
                        executionMonitoringStartAt: '2020-07-23 21:00:50',
                        executionMonitoringEndAt: '2020-07-23 21:52:54',
                        numberMax: 8417665872,
                        numberDays: 8296151740,
                        success: 1386164167,
                        cancelled: 1782346537,
                        delivering: 4159659676,
                        error: 9568702651,
                        holding: 1322917192,
                        toBeDelivered: 1969099153,
                        waiting: 9513490068,
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
                        
                        id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4',
                        tenantId: '4a3cae83-770f-417d-9796-c37f8c1d7995',
                        tenantCode: 'j85pd7ljyl18fophwoeryasa3tjmbxz6upeppxvk3dg80ae39s',
                        systemId: '22482307-f84c-48a2-bb64-ad927fef86e3',
                        systemName: '2comuebct3p72tq7otbs',
                        executionId: '5457a0aa-9e19-4d9b-894f-435cb55a1fd8',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-24 07:52:16',
                        executionMonitoringStartAt: '2020-07-24 12:02:22',
                        executionMonitoringEndAt: '2020-07-24 13:03:33',
                        numberMax: 9532346273,
                        numberDays: 7975309043,
                        success: 8526540157,
                        cancelled: 3192895963,
                        delivering: 4064770069,
                        error: 6061570776,
                        holding: 1017352654,
                        toBeDelivered: 6298181520,
                        waiting: 1259890570,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4');
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
                    id: '87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('87e8b2a8-c8a7-45a1-9f81-885c2dcd65e4');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});