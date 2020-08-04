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
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'yotjs8ooh16slczc4q8pobybnhcvk4q4udqbd0d47b2qv118u0',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'ss892r6c5kda4848cuqm',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 03:51:46',
                executionMonitoringStartAt: '2020-08-03 14:57:01',
                executionMonitoringEndAt: '2020-08-04 08:50:38',
                numberMax: 9296534652,
                numberDays: 6322324382,
                success: 5424525862,
                cancelled: 3916587648,
                delivering: 5669868236,
                error: 7712350807,
                holding: 5100739570,
                toBeDelivered: 9398353849,
                waiting: 3569808176,
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
                
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'q1bulibfrznlyc96jdm3xguc7qwdy4jwp8107zikbynocwjbsq',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'lolel1vamu4qk1fm0ts6',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 06:32:42',
                executionMonitoringStartAt: '2020-08-04 07:48:37',
                executionMonitoringEndAt: '2020-08-03 19:48:35',
                numberMax: 8863119774,
                numberDays: 4928353638,
                success: 9743209904,
                cancelled: 8792035296,
                delivering: 7118966924,
                error: 1046912317,
                holding: 9148250196,
                toBeDelivered: 7787101428,
                waiting: 6461653192,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: null,
                tenantCode: 'cxgrzfviaawo9lajbl4j8ssbr103j656g5lpaqmc42zdzk0z8x',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: '5zxydup6dda3fm5i8sk6',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 12:43:21',
                executionMonitoringStartAt: '2020-08-04 13:30:03',
                executionMonitoringEndAt: '2020-08-03 22:12:35',
                numberMax: 6990253358,
                numberDays: 5117868592,
                success: 6768932144,
                cancelled: 4721812546,
                delivering: 9148142394,
                error: 3386486678,
                holding: 5428671319,
                toBeDelivered: 7238811259,
                waiting: 3290856001,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                
                tenantCode: '90pw6uzcfzpjblry8y0ru5e5nhqx52w3i30prk2nxrrz22l3mr',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: '7n3gx2azbkvd0jvoyd5x',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 04:38:08',
                executionMonitoringStartAt: '2020-08-04 05:01:17',
                executionMonitoringEndAt: '2020-08-03 18:49:28',
                numberMax: 8458333017,
                numberDays: 7138612892,
                success: 1153457219,
                cancelled: 8873133673,
                delivering: 1733806048,
                error: 6882751084,
                holding: 6819010707,
                toBeDelivered: 8396587054,
                waiting: 9480303256,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: null,
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'kkkikdehguxs747gti32',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 11:50:46',
                executionMonitoringStartAt: '2020-08-04 05:34:48',
                executionMonitoringEndAt: '2020-08-04 01:29:28',
                numberMax: 1412537653,
                numberDays: 4697146537,
                success: 6921263710,
                cancelled: 7450589794,
                delivering: 8378763231,
                error: 5451625924,
                holding: 6022194049,
                toBeDelivered: 7581026512,
                waiting: 6192451578,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: '9fj602oruxl96zeabwc2',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:06:50',
                executionMonitoringStartAt: '2020-08-04 10:32:49',
                executionMonitoringEndAt: '2020-08-04 03:37:22',
                numberMax: 5091667367,
                numberDays: 8822686204,
                success: 7442818527,
                cancelled: 6078681204,
                delivering: 6104268121,
                error: 4802354674,
                holding: 2555845184,
                toBeDelivered: 8867284490,
                waiting: 1189061365,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'e79x24mnbksildm8h6s5pq8nzbne40ba1iizn0tm151l566ipl',
                systemId: null,
                systemName: '125mjbzlht20txg6m0rv',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 07:16:33',
                executionMonitoringStartAt: '2020-08-04 13:26:33',
                executionMonitoringEndAt: '2020-08-03 19:27:30',
                numberMax: 2028614019,
                numberDays: 1815254772,
                success: 8382474388,
                cancelled: 3358735168,
                delivering: 7187505510,
                error: 6927553560,
                holding: 1819235748,
                toBeDelivered: 4231146576,
                waiting: 2565849349,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 's01baprjajit2tpg9utkh93coikaptgcqws85azdt2db7hnw3l',
                
                systemName: 'vh0vu4lln7e3qibvyc4o',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:26:36',
                executionMonitoringStartAt: '2020-08-03 22:59:13',
                executionMonitoringEndAt: '2020-08-04 08:40:14',
                numberMax: 3738993380,
                numberDays: 5382386792,
                success: 6883328470,
                cancelled: 4096298651,
                delivering: 3765227318,
                error: 2784202752,
                holding: 3342652345,
                toBeDelivered: 6701473879,
                waiting: 3452307917,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: '9y0tfkhxv2sq7sr0e1jn0farqh00egad0t6vy3blem2j6ireeu',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: null,
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 02:15:28',
                executionMonitoringStartAt: '2020-08-03 20:42:14',
                executionMonitoringEndAt: '2020-08-03 15:56:43',
                numberMax: 8048923611,
                numberDays: 3576160416,
                success: 9464145538,
                cancelled: 9509971458,
                delivering: 3522095375,
                error: 1085645850,
                holding: 2683465329,
                toBeDelivered: 6492751747,
                waiting: 5461671020,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'h8qz9k0ftu3irxjdtjh3zdq47ihkh7rvyargh68oksj2571fp1',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 05:07:27',
                executionMonitoringStartAt: '2020-08-04 14:10:09',
                executionMonitoringEndAt: '2020-08-04 04:34:30',
                numberMax: 7161623526,
                numberDays: 8299559657,
                success: 9330230465,
                cancelled: 4267069517,
                delivering: 3850946654,
                error: 6589785357,
                holding: 9614079722,
                toBeDelivered: 5782869936,
                waiting: 6797514159,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'ad2xizw9varzw747k09jlvejzywk8k0fbsvxbmbkhjf5548p5f',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'm0fj1b11tuym9dr5yl2f',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 06:40:55',
                executionMonitoringStartAt: '2020-08-04 10:06:07',
                executionMonitoringEndAt: '2020-08-04 10:02:25',
                numberMax: 5271129496,
                numberDays: 9461656844,
                success: 3947277625,
                cancelled: 1877530526,
                delivering: 8000434151,
                error: 6196377954,
                holding: 4741046691,
                toBeDelivered: 6659362690,
                waiting: 8225499898,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'er1qb7v5tvxdhqbsy9a74bofknrp82670bujxkbawywoak4m16',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'v22nqy9pcm4wpslt9xws',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 03:31:46',
                executionMonitoringStartAt: '2020-08-03 22:50:06',
                executionMonitoringEndAt: '2020-08-03 17:11:28',
                numberMax: 2598196387,
                numberDays: 6127009820,
                success: 6944645376,
                cancelled: 3850098576,
                delivering: 5748375233,
                error: 8538738967,
                holding: 7368846181,
                toBeDelivered: 6562150467,
                waiting: 8227009309,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'ke9t1njmpbmjlsvdxc37fxt71mf297li3zi9ah3a8h5yusdvw0',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'bkkh1wsnnp6q7hd1u0jf',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: null,
                executionExecutedAt: '2020-08-04 10:53:20',
                executionMonitoringStartAt: '2020-08-03 15:40:21',
                executionMonitoringEndAt: '2020-08-04 05:48:02',
                numberMax: 2767174892,
                numberDays: 9916194925,
                success: 2372977636,
                cancelled: 4639890390,
                delivering: 3301029571,
                error: 3516207507,
                holding: 7096652153,
                toBeDelivered: 7558212736,
                waiting: 4134361120,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'rnibqv89ilxaa9vf0294wyzjbu66t9k9tvldsiz1t8ts8lvib9',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'v4871wxb964cdpr9it03',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                
                executionExecutedAt: '2020-08-04 01:09:17',
                executionMonitoringStartAt: '2020-08-04 03:16:52',
                executionMonitoringEndAt: '2020-08-04 11:07:26',
                numberMax: 3818097986,
                numberDays: 7572564044,
                success: 3636014536,
                cancelled: 2677692635,
                delivering: 4820343297,
                error: 2652840948,
                holding: 3993359397,
                toBeDelivered: 4459032181,
                waiting: 5860942440,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'w3uxrpyckqt97ngyp4yo1zyjr8kkqgmpxpy27km1y396ltnx6i',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: '21482oomz7n376wt6gmc',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-03 22:17:18',
                executionMonitoringEndAt: '2020-08-03 17:57:27',
                numberMax: 3712746733,
                numberDays: 8079686246,
                success: 5584411289,
                cancelled: 7242532469,
                delivering: 3755280425,
                error: 2830682536,
                holding: 6557523015,
                toBeDelivered: 3708435550,
                waiting: 3741751502,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'rxu7t18dwzslqon9i4c1aghh7evzczk7ageic6msnon6f7qcsf',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: '7orucv7bs8dxfbncklgk',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-08-03 17:48:13',
                executionMonitoringEndAt: '2020-08-04 10:47:38',
                numberMax: 9605992672,
                numberDays: 6946992930,
                success: 3900034493,
                cancelled: 7131588100,
                delivering: 6130112512,
                error: 9062180482,
                holding: 8123504839,
                toBeDelivered: 4156930464,
                waiting: 7437265309,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'ste0fiwjdaj1x12sydsn5ztapne3u6bt9difkowcgs4czqv0xu',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'hob2c22yd2s4z0rfeh3q',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 19:42:04',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-04 07:21:25',
                numberMax: 4659385282,
                numberDays: 6528029029,
                success: 4198851487,
                cancelled: 2421420505,
                delivering: 5660448628,
                error: 5552671265,
                holding: 1380168859,
                toBeDelivered: 1247570627,
                waiting: 4522142139,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'k6ivnx7lmvuwqjl44dpp9z8d0sr0m5pq4lipckp16obwpbmckd',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'gudkzfzh9ug8p0zyu0ru',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 10:31:38',
                
                executionMonitoringEndAt: '2020-08-03 17:22:07',
                numberMax: 2936504833,
                numberDays: 5352688602,
                success: 2009815552,
                cancelled: 2783702613,
                delivering: 5681257965,
                error: 7045234680,
                holding: 4013232748,
                toBeDelivered: 1221059050,
                waiting: 3928967955,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: '24gs2asqsidxvoopwc7wps4upo25wowv2latphdzwygygb93bq',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'hftyhouoplbz9rqi09gv',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 03:49:33',
                executionMonitoringStartAt: '2020-08-03 14:51:51',
                executionMonitoringEndAt: null,
                numberMax: 6760045700,
                numberDays: 6602212069,
                success: 7852463596,
                cancelled: 8484757402,
                delivering: 4238600326,
                error: 2963156786,
                holding: 7549368425,
                toBeDelivered: 1322969635,
                waiting: 5783049474,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'btbokhc2w5c0hvy43v2t580zkwx7e017se5vil71vuweyjk32u',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: '8kp9c5rj976tgsmhcigw',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 12:07:02',
                executionMonitoringStartAt: '2020-08-03 23:30:28',
                
                numberMax: 6058376948,
                numberDays: 7448712612,
                success: 9146209817,
                cancelled: 1139892568,
                delivering: 8734703294,
                error: 1194387144,
                holding: 3386952093,
                toBeDelivered: 6522916044,
                waiting: 8131345833,
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
                id: '7hyqnfcquwsbxk8bbgkvt8itvcklv6xjq9geh',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'xve1khwfbbxvkva3pww1oomod2ibergc4gno28xt7y7x583zge',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'ry2bjhqxym6v9i6vgs9p',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 16:21:33',
                executionMonitoringStartAt: '2020-08-04 10:51:03',
                executionMonitoringEndAt: '2020-08-03 19:25:31',
                numberMax: 8065308607,
                numberDays: 9821705224,
                success: 1408663752,
                cancelled: 6448640916,
                delivering: 5202005400,
                error: 8643061021,
                holding: 6059503574,
                toBeDelivered: 3502825096,
                waiting: 7829444929,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: 'mh3fnkmb665grklk71ekukg11bw1drut68gpq',
                tenantCode: 'h742mi1gdkzhfr9t2n7f2xyjrx72eolwq5fmp6rjeiu56q48rq',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'keqjolfb01h3h6s8mlsn',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 21:13:17',
                executionMonitoringStartAt: '2020-08-03 23:53:49',
                executionMonitoringEndAt: '2020-08-04 03:41:16',
                numberMax: 5986732800,
                numberDays: 2841354070,
                success: 1436619328,
                cancelled: 8850385800,
                delivering: 1915939816,
                error: 2193636541,
                holding: 1536812168,
                toBeDelivered: 1195522489,
                waiting: 4667404111,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'iho2y71pwi61yzac235dpl5w1b7q9izfwzzj2stj5bz2f5ysl9',
                systemId: '35slzqqfutrwlbu3olu6ad0sp07mlmcdx3smd',
                systemName: 'e2tau1zkhn8o1uoc3h3h',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 20:26:54',
                executionMonitoringStartAt: '2020-08-04 11:05:36',
                executionMonitoringEndAt: '2020-08-04 06:32:32',
                numberMax: 4066299674,
                numberDays: 9278064224,
                success: 8983684581,
                cancelled: 9384146462,
                delivering: 3870072396,
                error: 8992400676,
                holding: 8447612931,
                toBeDelivered: 7989086706,
                waiting: 2561443927,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: '8ly4doqjnr6a24mbxglx7dkocwvgj3lsn53yxz24ouzgk9cbto',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'hiitbmcqlqo06wgqm201',
                executionId: 'wj68npdt0w7gp9k8zjfybtprwe8j2wb4xb2na',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 14:36:44',
                executionMonitoringStartAt: '2020-08-04 06:39:59',
                executionMonitoringEndAt: '2020-08-04 08:38:20',
                numberMax: 2082000163,
                numberDays: 8054030392,
                success: 4183778399,
                cancelled: 2874786482,
                delivering: 8341057743,
                error: 9920369606,
                holding: 7163951823,
                toBeDelivered: 5485978674,
                waiting: 6686329721,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: '8mbs5wn8k5riwosnx4p3spi782pdiiwoel13fvf7520cn1h2fnr',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: '45pzpqkdr5gjcy23t7w0',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 07:12:23',
                executionMonitoringStartAt: '2020-08-03 22:35:15',
                executionMonitoringEndAt: '2020-08-04 14:28:48',
                numberMax: 5179801781,
                numberDays: 8313803044,
                success: 7546272398,
                cancelled: 6313820826,
                delivering: 8891484644,
                error: 4802929397,
                holding: 1881073027,
                toBeDelivered: 1193636651,
                waiting: 9594552897,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'tytukmc9nzh661qf4y1mfalb6e2xcztg8pu7shi1bpnuxqke7l',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: '774pp8urs8o9oxv836jkk',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 03:25:37',
                executionMonitoringStartAt: '2020-08-04 08:25:58',
                executionMonitoringEndAt: '2020-08-04 03:40:34',
                numberMax: 9016812226,
                numberDays: 6492892123,
                success: 8475760709,
                cancelled: 1602474865,
                delivering: 8720193750,
                error: 3688064305,
                holding: 1903134704,
                toBeDelivered: 7845547357,
                waiting: 2229476307,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: '1ebm8koojwum5vmg5jsvl63d39aavvcm0z7jeudywswt4f63gm',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'nb6rrxlg79rfuv77dgt8',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 08:14:06',
                executionMonitoringStartAt: '2020-08-04 02:38:32',
                executionMonitoringEndAt: '2020-08-04 01:26:31',
                numberMax: 62495912197,
                numberDays: 3610256866,
                success: 7187385673,
                cancelled: 6331013205,
                delivering: 6249316583,
                error: 9684462743,
                holding: 3405592959,
                toBeDelivered: 4121957097,
                waiting: 1303510272,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'g65a8l4z3ga1d5kludq60bitzphtv7fknq0rufyn2rgwt2o46h',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'n985iy75patprarjtpnr',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 18:53:44',
                executionMonitoringStartAt: '2020-08-04 12:23:07',
                executionMonitoringEndAt: '2020-08-03 14:47:55',
                numberMax: 6630347741,
                numberDays: 72150846188,
                success: 9375773782,
                cancelled: 4876367296,
                delivering: 3027719680,
                error: 5820195536,
                holding: 7397140405,
                toBeDelivered: 3720288275,
                waiting: 8056440435,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'bqb3x02vc0s8teow4h7dl4nw25a7oga3drrxf4yydznmjamik9',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'qp5bf0zp58vrx56h17lp',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 07:08:01',
                executionMonitoringStartAt: '2020-08-04 09:34:22',
                executionMonitoringEndAt: '2020-08-04 09:43:18',
                numberMax: 1624425187,
                numberDays: 1185690961,
                success: 18418252614,
                cancelled: 8648214715,
                delivering: 2266690283,
                error: 2183568565,
                holding: 6429995491,
                toBeDelivered: 8779633951,
                waiting: 1131713915,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'gkuvuod8wgeciwy7wb1xql6c464ru0v6hdigjjuhzgosvu8ujb',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'u0x540rbu25ds982zdps',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 02:38:10',
                executionMonitoringStartAt: '2020-08-04 03:21:33',
                executionMonitoringEndAt: '2020-08-03 17:26:35',
                numberMax: 3413719602,
                numberDays: 8880836006,
                success: 8526963475,
                cancelled: 13812998702,
                delivering: 9677181300,
                error: 5525141404,
                holding: 4836462373,
                toBeDelivered: 9678737993,
                waiting: 6291143354,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'e4yu9q5v47r5wf7l8efe2zat12qqy0umzx9ma79yche01qel06',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: '9wy4kamm805hwihs06lb',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 02:39:38',
                executionMonitoringStartAt: '2020-08-03 21:36:23',
                executionMonitoringEndAt: '2020-08-03 16:32:48',
                numberMax: 3580793492,
                numberDays: 6964990226,
                success: 2437775377,
                cancelled: 2247171008,
                delivering: 18654899201,
                error: 2054627578,
                holding: 2562924438,
                toBeDelivered: 5619909440,
                waiting: 2854440268,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'szazdpm20m0xnb8rev0twg364w1pv5jxdta4iiqtutzvivbrre',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: '33m9oo747d825vrmwvos',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 09:12:20',
                executionMonitoringStartAt: '2020-08-03 16:11:57',
                executionMonitoringEndAt: '2020-08-04 09:43:48',
                numberMax: 5345353206,
                numberDays: 2329328786,
                success: 7591996321,
                cancelled: 7940549874,
                delivering: 1063372548,
                error: 67551626710,
                holding: 8117867548,
                toBeDelivered: 9565143755,
                waiting: 3743264104,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: '4j5f5ywuoajwkoakf3uddekqqwyul7pbuyqedoglq5pcj1rb1w',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'eluixbpudn83wr5xeick',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 01:53:47',
                executionMonitoringStartAt: '2020-08-03 17:58:44',
                executionMonitoringEndAt: '2020-08-03 14:55:34',
                numberMax: 1550861416,
                numberDays: 6983986418,
                success: 3618880919,
                cancelled: 3306677900,
                delivering: 7174379321,
                error: 2184083497,
                holding: 57925678758,
                toBeDelivered: 9065195762,
                waiting: 2645361708,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'j011kq2cbi1214x8b60et9ihrrpf2gnmm76mxoa4l0gepnphwd',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'c4j9cweujo6wo7d7dtbu',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 16:47:16',
                executionMonitoringStartAt: '2020-08-04 05:43:27',
                executionMonitoringEndAt: '2020-08-04 00:13:09',
                numberMax: 1306926810,
                numberDays: 1600901127,
                success: 9402399500,
                cancelled: 3795906453,
                delivering: 5438502172,
                error: 6146022528,
                holding: 3877664527,
                toBeDelivered: 84001804142,
                waiting: 7497465978,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: '7zcsrlf8mffhsrxsxop9mhu13yrxjk772y59ri1t4jadh5vhjz',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: '0x2iprg6yxdvoya4a0r1',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 14:55:22',
                executionMonitoringStartAt: '2020-08-04 08:17:29',
                executionMonitoringEndAt: '2020-08-03 18:19:19',
                numberMax: 8806536434,
                numberDays: 9017181736,
                success: 3698881050,
                cancelled: 6533475743,
                delivering: 7081943798,
                error: 9611915223,
                holding: 6764829976,
                toBeDelivered: 3010040387,
                waiting: 18494346863,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'n2xn541a47tp0x08cszsa2fjrf2zrrx72hf2bjyr4qtbl0ux1i',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'hmhd0rsuy1rnog2hmif6',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 17:16:36',
                executionMonitoringStartAt: '2020-08-04 06:55:45',
                executionMonitoringEndAt: '2020-08-03 23:31:06',
                numberMax: -9,
                numberDays: 2043342600,
                success: 1845333070,
                cancelled: 5147792094,
                delivering: 3480054322,
                error: 9751831073,
                holding: 3723433440,
                toBeDelivered: 9740339959,
                waiting: 4703671307,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: '7ruszc0l43caxaxjdlz7rwbh4iczxtxgezc9hfxw8go0eu5fio',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'm2a5wg5pnpv6c3359yww',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 21:07:32',
                executionMonitoringStartAt: '2020-08-03 19:46:51',
                executionMonitoringEndAt: '2020-08-03 21:32:51',
                numberMax: 9062619846,
                numberDays: -9,
                success: 2291486344,
                cancelled: 5080049442,
                delivering: 6669310034,
                error: 6390236219,
                holding: 5709416946,
                toBeDelivered: 4823484057,
                waiting: 7416540666,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'wmkkby9r7cxjz6d4mtwi1klc5lq3wpbjnj7ll3e0q1q2hsu8zy',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'q9fuk5fqeayvetc59yr1',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 06:16:04',
                executionMonitoringStartAt: '2020-08-04 10:33:26',
                executionMonitoringEndAt: '2020-08-03 16:36:47',
                numberMax: 5287234063,
                numberDays: 6755589509,
                success: -9,
                cancelled: 6103961903,
                delivering: 2424933304,
                error: 9267719733,
                holding: 6757374928,
                toBeDelivered: 1306854636,
                waiting: 2422146392,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: '97ny5vlb2cy92oit41fx8hf8o93rqh73us0tmj08c0f5lzy2e2',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'lfd2bcfk28d01r4ep7w0',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 10:06:33',
                executionMonitoringStartAt: '2020-08-03 18:03:04',
                executionMonitoringEndAt: '2020-08-04 00:52:10',
                numberMax: 6513650785,
                numberDays: 4127211836,
                success: 2297035682,
                cancelled: -9,
                delivering: 7124192164,
                error: 4591383377,
                holding: 7401952794,
                toBeDelivered: 1340010601,
                waiting: 5385031683,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'lt4t7c77je29c8d91d2dkdag2k1qffuus8crgy9m78sghkui43',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'gyfgm73cxrutfc3ijphh',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 14:16:05',
                executionMonitoringStartAt: '2020-08-04 09:11:38',
                executionMonitoringEndAt: '2020-08-03 21:49:01',
                numberMax: 7962105784,
                numberDays: 8095131331,
                success: 4964851554,
                cancelled: 2008204439,
                delivering: -9,
                error: 9612504048,
                holding: 3523199817,
                toBeDelivered: 6500091870,
                waiting: 4585022054,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: '64usqq2ubsol1fh7lhts91gm3gi2aor9j4zjprp2y2mb4e1cj5',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'kiwfbbgm4o8ymvm41ai6',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 14:21:49',
                executionMonitoringStartAt: '2020-08-03 14:58:06',
                executionMonitoringEndAt: '2020-08-03 17:06:21',
                numberMax: 7104180551,
                numberDays: 5204166588,
                success: 1024312458,
                cancelled: 6294527046,
                delivering: 8327399429,
                error: -9,
                holding: 8818113132,
                toBeDelivered: 6428861405,
                waiting: 4808738043,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'b792mr2cl24d4rznz0ypbqpr5gmcfrvorz6rdr460742negskv',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'e00jwx17rpbj3bpj5ec4',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 20:22:23',
                executionMonitoringStartAt: '2020-08-04 13:12:33',
                executionMonitoringEndAt: '2020-08-04 13:34:31',
                numberMax: 4355087719,
                numberDays: 4789645608,
                success: 7015019609,
                cancelled: 8059358511,
                delivering: 5349612934,
                error: 3229469886,
                holding: -9,
                toBeDelivered: 2012138378,
                waiting: 9238012087,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'xj8hrq9hb9fxvz3oi3msi333ldopb211ki628awebzrpv0ucfj',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'ekg2z1xells1i7ojgs86',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 07:13:50',
                executionMonitoringStartAt: '2020-08-04 07:57:02',
                executionMonitoringEndAt: '2020-08-04 10:07:22',
                numberMax: 8269165512,
                numberDays: 6161789284,
                success: 5821375667,
                cancelled: 8951965425,
                delivering: 7657851998,
                error: 9637253405,
                holding: 9006676796,
                toBeDelivered: -9,
                waiting: 3177271550,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'b8fqz6hb8uw6efcumvizql4h9jp2hgzwz58o21qep0wsb09dit',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'f97ftjwi54nqxh8c4xn3',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 07:11:02',
                executionMonitoringStartAt: '2020-08-04 11:29:29',
                executionMonitoringEndAt: '2020-08-03 23:08:06',
                numberMax: 1013404032,
                numberDays: 7435456279,
                success: 6754348007,
                cancelled: 4584361908,
                delivering: 4705480107,
                error: 5576419488,
                holding: 9102634842,
                toBeDelivered: 3883202184,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'qshv7ifrsswyxs2c6tcr7bglf3kk0byf5m05sxqbq1gap3s6yo',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: '0qevv4r8f3hq28flm9mi',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-04 03:21:57',
                executionMonitoringStartAt: '2020-08-04 14:25:29',
                executionMonitoringEndAt: '2020-08-04 07:34:55',
                numberMax: 2745004976,
                numberDays: 3146599093,
                success: 4071895745,
                cancelled: 5778853100,
                delivering: 5008383955,
                error: 9841313065,
                holding: 5875746385,
                toBeDelivered: 6725046208,
                waiting: 2940239322,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'tihglf48zolhnki3xf58ao8iv3s3fc2de6yg92u15rcv7her2m',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'kc8ksh33j1s3km39b38q',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-04 08:21:40',
                executionMonitoringEndAt: '2020-08-04 03:01:32',
                numberMax: 6339292267,
                numberDays: 4473962039,
                success: 3678564132,
                cancelled: 9638897265,
                delivering: 5362645977,
                error: 2583173488,
                holding: 7730370447,
                toBeDelivered: 4634923174,
                waiting: 7393225891,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'bc6xu551eexlg6atx8eh2k58h4bbg4ym2xc6bp6rr41g68pi0s',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'm477b47pewg3zet05sm0',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 12:20:05',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-03 15:20:25',
                numberMax: 8755377941,
                numberDays: 9297633283,
                success: 3156050859,
                cancelled: 9958180269,
                delivering: 5447541075,
                error: 3737922576,
                holding: 7825714407,
                toBeDelivered: 3351429130,
                waiting: 7876734658,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'q4c83b0tvypxe15pyurirm9g0arofs447or2a0w4xkwlt4rrwy',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'xqaccxxawv9kpz2934ic',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 07:41:00',
                executionMonitoringStartAt: '2020-08-04 02:10:14',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 8432519025,
                numberDays: 6311729779,
                success: 6877953647,
                cancelled: 4388767578,
                delivering: 7088608472,
                error: 9634607195,
                holding: 6255468634,
                toBeDelivered: 6846303461,
                waiting: 4463165625,
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
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'f1r382qjfec6ywpfpk5q2fcxphya4uv4ffhlv8g47e3enzbrpj',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: 'a7629nmte0kq6e3woklz',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 09:13:28',
                executionMonitoringStartAt: '2020-08-04 09:27:24',
                executionMonitoringEndAt: '2020-08-04 14:30:43',
                numberMax: 2727458889,
                numberDays: 5169048311,
                success: 9105252226,
                cancelled: 8380641259,
                delivering: 7315280994,
                error: 7260822811,
                holding: 4862190462,
                toBeDelivered: 1041211466,
                waiting: 6307732199,
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
                        value   : 'cdb1289b-62f2-4b41-9246-7354e990bb14'
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
                        value   : '80b21a44-24ca-46aa-9f53-b7ebfbd59de3'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '80b21a44-24ca-46aa-9f53-b7ebfbd59de3'));
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/f433acc3-1f9a-411f-afc9-5add3882cd6c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/80b21a44-24ca-46aa-9f53-b7ebfbd59de3')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '80b21a44-24ca-46aa-9f53-b7ebfbd59de3'));
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
                
                id: '846747cd-ac40-48b3-8580-e1dd4fcf27fe',
                tenantId: '480d8568-c34d-46e5-bdcc-47a780decd14',
                tenantCode: 'q2nhlrk38o3hsow6kwljz5vtexr55b1ghrvb2dlsevtflb3xwd',
                systemId: '32e754b8-4221-4ed6-b968-f2d20aa09c93',
                systemName: 'w2y7wpw7mge4gze607f4',
                executionId: 'a8ed5282-ef11-4fdf-a06c-a4a800ed2fa4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 04:36:21',
                executionMonitoringStartAt: '2020-08-04 11:16:16',
                executionMonitoringEndAt: '2020-08-03 23:04:36',
                numberMax: 6562978150,
                numberDays: 3636091952,
                success: 1128346749,
                cancelled: 4212485032,
                delivering: 9033928110,
                error: 2682625461,
                holding: 6553775342,
                toBeDelivered: 5540734385,
                waiting: 2283762333,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                tenantCode: 'yiuj0sx8t4i3vqndzbccf23hxtc5veg2mkjonb7nugowfc74g9',
                systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                systemName: '4yai1rj7nf2as8r0eya6',
                executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 17:32:44',
                executionMonitoringStartAt: '2020-08-03 20:52:02',
                executionMonitoringEndAt: '2020-08-03 22:59:36',
                numberMax: 5857189517,
                numberDays: 2382023362,
                success: 2316032860,
                cancelled: 6061938403,
                delivering: 3988050573,
                error: 6043488856,
                holding: 4817417196,
                toBeDelivered: 1904373264,
                waiting: 3126617619,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '80b21a44-24ca-46aa-9f53-b7ebfbd59de3'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/a9e73bd3-b232-4922-a42a-d714db4b4ad5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/80b21a44-24ca-46aa-9f53-b7ebfbd59de3')
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
                        id: 'fd2d6cc3-7a77-42a6-8448-21e046c122dd',
                        tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                        tenantCode: 'j1nub5j99soj2jf8frp6ro94in6jb6x0x41gunow4gbbxww0ak',
                        systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                        systemName: 'g0b7e0bgdz7w1ly4g9ly',
                        executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-03 18:43:51',
                        executionMonitoringStartAt: '2020-08-03 15:59:33',
                        executionMonitoringEndAt: '2020-08-03 20:30:52',
                        numberMax: 2655054366,
                        numberDays: 8652846998,
                        success: 3098358417,
                        cancelled: 3719640513,
                        delivering: 9217582058,
                        error: 8417456406,
                        holding: 6162914033,
                        toBeDelivered: 5321643002,
                        waiting: 5997103880,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', 'fd2d6cc3-7a77-42a6-8448-21e046c122dd');
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
                            value   : '1cfb44f3-626d-4582-a122-89a0832bbf88'
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
                            value   : '80b21a44-24ca-46aa-9f53-b7ebfbd59de3'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('80b21a44-24ca-46aa-9f53-b7ebfbd59de3');
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
                    id: 'bfc2b815-29ca-4ff7-890d-a8df5937464a'
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
                    id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('80b21a44-24ca-46aa-9f53-b7ebfbd59de3');
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
                        
                        id: '1d985b99-d16f-4e47-b6e9-53be188db370',
                        tenantId: '8d6a1e45-9994-4ceb-8bb7-0496c5fe6689',
                        tenantCode: 's08gdy5mw5ngk3z8iftrs9t7g3a0qgbz793a7wd700ekrz3xms',
                        systemId: 'b0ff5504-3db1-4a80-9037-25a67ec2f319',
                        systemName: 'mvznwbnl5iszls7nayoe',
                        executionId: '3e86a9ba-7c15-4fa0-a541-63ffa86a525a',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 10:05:34',
                        executionMonitoringStartAt: '2020-08-04 09:20:40',
                        executionMonitoringEndAt: '2020-08-04 06:04:07',
                        numberMax: 5996077732,
                        numberDays: 3943767609,
                        success: 2076426012,
                        cancelled: 9466257295,
                        delivering: 8168125429,
                        error: 8979614574,
                        holding: 4878300727,
                        toBeDelivered: 8200498731,
                        waiting: 3663952732,
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
                        
                        id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3',
                        tenantId: '346ca728-9a20-4eb0-a061-03298256aab4',
                        tenantCode: '2vqv4snrhco0ke7ic41zhpuq965doqjls16cen58wlpiyoa7ll',
                        systemId: '2591ba4d-ad3a-437a-b543-34e7e4337f36',
                        systemName: 'bg5q0mf7k45go96mfid8',
                        executionId: '86798d05-55d6-42e5-8556-84f5d7edc151',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 04:12:42',
                        executionMonitoringStartAt: '2020-08-03 15:51:39',
                        executionMonitoringEndAt: '2020-08-04 14:05:14',
                        numberMax: 1434608016,
                        numberDays: 2610615968,
                        success: 6008157037,
                        cancelled: 7719681501,
                        delivering: 7507369016,
                        error: 9507772768,
                        holding: 8130072781,
                        toBeDelivered: 2309170252,
                        waiting: 5633545494,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('80b21a44-24ca-46aa-9f53-b7ebfbd59de3');
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
                    id: 'f82d25cf-83ac-4e46-b963-48d5dc223c4f'
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
                    id: '80b21a44-24ca-46aa-9f53-b7ebfbd59de3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('80b21a44-24ca-46aa-9f53-b7ebfbd59de3');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});