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
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: '8kadx5arv1poegn6lcj4s82jvlld8ezkq4fiyfreeeu2tmf5ss',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'q6660cuyyl5t9nrn5di0',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 02:59:29',
                executionMonitoringStartAt: '2020-07-30 21:52:12',
                executionMonitoringEndAt: '2020-07-31 00:42:33',
                numberMax: 6191737172,
                numberDays: 3050308813,
                success: 9644661335,
                cancelled: 1750499093,
                delivering: 4958251246,
                error: 2847873909,
                holding: 3360568196,
                toBeDelivered: 4668118372,
                waiting: 1401359454,
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
                
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'mf8ocji63b49yoyqmf0lrtwfolaz7ezfzwnfszariq12lyl38n',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'we10627ndxvepu69tkb7',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 04:22:29',
                executionMonitoringStartAt: '2020-07-30 19:02:23',
                executionMonitoringEndAt: '2020-07-31 13:26:16',
                numberMax: 8784050048,
                numberDays: 8264288048,
                success: 5883632705,
                cancelled: 5706170416,
                delivering: 9590653042,
                error: 7824638046,
                holding: 8916519352,
                toBeDelivered: 1421370915,
                waiting: 9943040696,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: null,
                tenantCode: 'kpwi7d9gzo1q35rxahjbhs0djuoz5eoscz7dekocfkagrdyp73',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'yuvo18j087tn4ghefw9l',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 07:53:09',
                executionMonitoringStartAt: '2020-07-30 22:43:06',
                executionMonitoringEndAt: '2020-07-30 16:28:36',
                numberMax: 8517911028,
                numberDays: 5527450769,
                success: 9939905288,
                cancelled: 1594783530,
                delivering: 4603044129,
                error: 6916782359,
                holding: 9553671737,
                toBeDelivered: 9851637495,
                waiting: 4916833478,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                
                tenantCode: '0w1vqswxx69oqtkp6yl6mpqdezc3yoeg4rk7tj8gdt7i6707kw',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'a9vmx8vehhvtqyapivbf',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 07:38:20',
                executionMonitoringStartAt: '2020-07-31 02:50:45',
                executionMonitoringEndAt: '2020-07-30 23:13:58',
                numberMax: 7130072067,
                numberDays: 7055288126,
                success: 9162466196,
                cancelled: 2893849253,
                delivering: 5900931601,
                error: 5116459984,
                holding: 6916970614,
                toBeDelivered: 7219575387,
                waiting: 9138983007,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: null,
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'qvzbqgg1gdsaco46jrtr',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 16:55:59',
                executionMonitoringStartAt: '2020-07-30 18:58:12',
                executionMonitoringEndAt: '2020-07-31 11:38:58',
                numberMax: 9936397967,
                numberDays: 7553235776,
                success: 2885788679,
                cancelled: 8682560443,
                delivering: 6733184537,
                error: 5069270534,
                holding: 8383430492,
                toBeDelivered: 8718461429,
                waiting: 9537369351,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'g55u602ftpg69izi8b8h',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 12:59:48',
                executionMonitoringStartAt: '2020-07-31 11:36:43',
                executionMonitoringEndAt: '2020-07-31 05:38:33',
                numberMax: 2183259904,
                numberDays: 4979575977,
                success: 6665958344,
                cancelled: 9036114078,
                delivering: 4677825878,
                error: 2047300234,
                holding: 5171378986,
                toBeDelivered: 3671812909,
                waiting: 1201983451,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'kdlogaqix9qqtww6p5ytozpr5m7aax38140236et2r7ke5cld9',
                systemId: null,
                systemName: 'wefrkk7f6h9k175o1vms',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 22:49:40',
                executionMonitoringStartAt: '2020-07-31 10:40:42',
                executionMonitoringEndAt: '2020-07-30 14:57:59',
                numberMax: 6787236230,
                numberDays: 1747437445,
                success: 3641882517,
                cancelled: 3463866574,
                delivering: 7024704557,
                error: 7902887158,
                holding: 8259604296,
                toBeDelivered: 1613558645,
                waiting: 3410506185,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'fgoc9377zza2fzrv6c95oiqm6b029eu9edr89gmypem6w7q6uz',
                
                systemName: 'q06e9sdij72xrilby9eg',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 05:33:42',
                executionMonitoringStartAt: '2020-07-30 15:01:30',
                executionMonitoringEndAt: '2020-07-31 01:33:32',
                numberMax: 3810743306,
                numberDays: 8508031160,
                success: 3137241704,
                cancelled: 1703455436,
                delivering: 4490087468,
                error: 2878091612,
                holding: 3806129326,
                toBeDelivered: 8762784582,
                waiting: 2956271981,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'ef9jfztv2gnpl5a30yip1e4r900m4be0ljjrkb0ks8dkg9a2r2',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: null,
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 20:34:11',
                executionMonitoringStartAt: '2020-07-30 17:40:36',
                executionMonitoringEndAt: '2020-07-30 17:07:45',
                numberMax: 2022084315,
                numberDays: 2355537663,
                success: 2552434782,
                cancelled: 8919063245,
                delivering: 1939676403,
                error: 3841810659,
                holding: 4453401138,
                toBeDelivered: 1341914306,
                waiting: 3100501515,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'rfezzc8lkj391dc20w029ra5xnfjg0sldk9niwvyjjmeub0rqr',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 12:37:35',
                executionMonitoringStartAt: '2020-07-31 11:46:50',
                executionMonitoringEndAt: '2020-07-30 17:26:41',
                numberMax: 4621608022,
                numberDays: 1988369685,
                success: 4855480289,
                cancelled: 3034819548,
                delivering: 7915116321,
                error: 6156210414,
                holding: 7917173047,
                toBeDelivered: 9100641034,
                waiting: 7425490882,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'g5j333kt6iswua3td6fgmzfgrpadxpxhpxwdoy5s2okbdkec04',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: '6nmqto8fls20i6ei9xvm',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 00:40:12',
                executionMonitoringStartAt: '2020-07-30 19:58:36',
                executionMonitoringEndAt: '2020-07-31 07:25:04',
                numberMax: 6187219262,
                numberDays: 5643835496,
                success: 2747243683,
                cancelled: 4354254633,
                delivering: 2471603929,
                error: 8028661875,
                holding: 7579471944,
                toBeDelivered: 3671335570,
                waiting: 3236812983,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: '9nge3fh7f28g3akucdll5havaygb8xdx7ru9qk1hq71bhb5qd5',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'mwhmkyzl6kz9vqgc0sxn',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 10:10:45',
                executionMonitoringStartAt: '2020-07-30 22:04:38',
                executionMonitoringEndAt: '2020-07-31 10:29:17',
                numberMax: 8972259126,
                numberDays: 2708357464,
                success: 7537865613,
                cancelled: 6280880224,
                delivering: 8330666062,
                error: 1292648646,
                holding: 5360124563,
                toBeDelivered: 8918233544,
                waiting: 2749264488,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: '3okdr8sl535c2dq1ti1bwzr4beqptzjg2s9x0d2xymezja6bdj',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'h8hvxskp3ut14uvn7fl5',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: null,
                executionExecutedAt: '2020-07-31 09:06:26',
                executionMonitoringStartAt: '2020-07-31 08:59:17',
                executionMonitoringEndAt: '2020-07-31 05:06:32',
                numberMax: 2788946384,
                numberDays: 9271987220,
                success: 2876434723,
                cancelled: 1236204816,
                delivering: 3620025190,
                error: 2773771099,
                holding: 1888096980,
                toBeDelivered: 9265282601,
                waiting: 2272375409,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'ql2idp6v1u10d2v6e3qwht9v5kufaubxghlottlmx736itaf2t',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: '63ce9f5qeb1tyt4czpk3',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                
                executionExecutedAt: '2020-07-31 13:24:30',
                executionMonitoringStartAt: '2020-07-30 17:44:59',
                executionMonitoringEndAt: '2020-07-31 10:36:02',
                numberMax: 7606322062,
                numberDays: 3165372694,
                success: 1930406389,
                cancelled: 7091056927,
                delivering: 8733841159,
                error: 6355819868,
                holding: 9303517958,
                toBeDelivered: 9218916719,
                waiting: 2406451894,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'gqoiaytatj3rvmsyw1nbmkypqlg0rp29a1x3ownmebynrk12s4',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: '3exl3umwesm16p0y15xs',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-30 18:46:18',
                executionMonitoringEndAt: '2020-07-31 10:04:07',
                numberMax: 9537517722,
                numberDays: 9689249284,
                success: 2523631172,
                cancelled: 3914967419,
                delivering: 1424487964,
                error: 1811849188,
                holding: 7922727717,
                toBeDelivered: 8407690778,
                waiting: 1571713950,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: '6ck0ujc1kbjzl6hoffundvw4qtd7i6topm167i0r2fhfxq190h',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: '2nc4yh9tp6q0sdgidlwg',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-31 06:12:28',
                executionMonitoringEndAt: '2020-07-31 10:50:30',
                numberMax: 1243066243,
                numberDays: 7190867143,
                success: 5000641108,
                cancelled: 3407528841,
                delivering: 6245578604,
                error: 4344765664,
                holding: 4295122305,
                toBeDelivered: 9875870580,
                waiting: 6220573531,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'mnht4vo3c0ro853xb4yf4ob5i2kei6u5p4ite2zitk1d3mgs1n',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'i25bmfx5ly645c38xlyk',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 08:57:14',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-31 04:07:45',
                numberMax: 9778427024,
                numberDays: 4234958052,
                success: 6006276791,
                cancelled: 1755138158,
                delivering: 3018550719,
                error: 4979259165,
                holding: 6670244478,
                toBeDelivered: 6081039701,
                waiting: 1854224736,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: '3mukzpyrnygb6s7k5t79bk9eo3xqrhsxzwswesljqw8uq9z8wb',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'mnawb442dgaso6sbxkz0',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 11:43:28',
                
                executionMonitoringEndAt: '2020-07-31 13:30:51',
                numberMax: 5460273050,
                numberDays: 9163263053,
                success: 8123330622,
                cancelled: 5767089701,
                delivering: 6815133115,
                error: 1294668733,
                holding: 7050833945,
                toBeDelivered: 8600279017,
                waiting: 8117998801,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'k842pc21k0mfib80fux3i8lruw0mf1uyl31o6of6pj919hd9qh',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: '7492flulepajf5eyx98c',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 08:06:29',
                executionMonitoringStartAt: '2020-07-30 17:06:09',
                executionMonitoringEndAt: null,
                numberMax: 1830894231,
                numberDays: 9084415203,
                success: 9833310403,
                cancelled: 6782758661,
                delivering: 2909682834,
                error: 5041297066,
                holding: 7274600944,
                toBeDelivered: 4992507484,
                waiting: 7678549699,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'ig02uzk3peiroilp53fbb076e5s9ke8innspvv7s5azxpphduc',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'v32uyk2rpbd81uxzn90t',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 03:39:56',
                executionMonitoringStartAt: '2020-07-31 03:11:12',
                
                numberMax: 6260384584,
                numberDays: 2954009239,
                success: 7490969530,
                cancelled: 6629142601,
                delivering: 6110517483,
                error: 3837094121,
                holding: 4165565190,
                toBeDelivered: 1355879786,
                waiting: 3546868068,
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
                id: 'qkq6i576faqp16j9dmfoc10uwm3pt3ybdf5og',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'qpwr6n91jj4uk1rhj1w0kx07rilmzo213j08p9w6v4iidwih44',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: '8xjlx0doa9ynsavlagh7',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 10:44:52',
                executionMonitoringStartAt: '2020-07-31 12:37:47',
                executionMonitoringEndAt: '2020-07-31 06:40:39',
                numberMax: 6940031125,
                numberDays: 8099677097,
                success: 2690967899,
                cancelled: 8095566355,
                delivering: 6312143341,
                error: 8885429649,
                holding: 8862925403,
                toBeDelivered: 2153610717,
                waiting: 8023480414,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: '37p7jb1ajqq1r8qq7cgm29vbx5pnuqynsr9x4',
                tenantCode: 'ifpsz317v9qdysara3etx4x3kvwuk3dxdp4si9gn8m0485qlqg',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: '41ikd2u55ggrrrj0npfp',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 08:36:44',
                executionMonitoringStartAt: '2020-07-30 18:44:48',
                executionMonitoringEndAt: '2020-07-30 21:09:01',
                numberMax: 1201025629,
                numberDays: 5743973330,
                success: 9044810013,
                cancelled: 3884712778,
                delivering: 7990353219,
                error: 6927952542,
                holding: 3177552812,
                toBeDelivered: 8521960410,
                waiting: 8590409308,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'co21dj7oij6mabtl2kyqn0bb5g8yav9lqwnfuvhs2h08rarimg',
                systemId: 'f5b6w63afkusblyyqvdhy66rzrcnfj7d2sfkm',
                systemName: 'imw9rtmw4nk7ahxyo9lo',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 21:53:38',
                executionMonitoringStartAt: '2020-07-31 02:21:34',
                executionMonitoringEndAt: '2020-07-31 09:28:53',
                numberMax: 7897099132,
                numberDays: 4158294832,
                success: 7582365317,
                cancelled: 7039992758,
                delivering: 5212140396,
                error: 8150742509,
                holding: 8861519633,
                toBeDelivered: 4743224912,
                waiting: 9427728554,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'xqkxvq2x4on8pgibpwn9oua7r5ea87swzjho7sps3sk8hxw6ri',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: '39lkcs5lq1cpvdidsnbt',
                executionId: 'a6j4irw2phx8w43xu4w5ymso6843kiaq3mlwt',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 16:56:09',
                executionMonitoringStartAt: '2020-07-30 22:24:48',
                executionMonitoringEndAt: '2020-07-30 22:49:18',
                numberMax: 7289630338,
                numberDays: 4802754407,
                success: 5768763082,
                cancelled: 2744988163,
                delivering: 7720672765,
                error: 1223962880,
                holding: 1726619733,
                toBeDelivered: 9754898583,
                waiting: 7920868689,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'zbtez9sybqj32aa7nk1ntin30sc7vjra2at1g9ioa10agggyko3',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'w0rv2awm3v5ekjut5wvv',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 20:59:37',
                executionMonitoringStartAt: '2020-07-31 11:47:17',
                executionMonitoringEndAt: '2020-07-31 12:51:23',
                numberMax: 7439408489,
                numberDays: 6975343146,
                success: 5920427232,
                cancelled: 6969898332,
                delivering: 4456985743,
                error: 5849563996,
                holding: 1599119640,
                toBeDelivered: 1019123716,
                waiting: 7256747799,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'djw9tzx06v3rudki8jbaiby40e0teiqdal6g3qrprlroxl2z98',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'sgkl5q3vwojun1o7syzqi',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 07:29:32',
                executionMonitoringStartAt: '2020-07-30 18:04:51',
                executionMonitoringEndAt: '2020-07-31 11:01:46',
                numberMax: 4374734547,
                numberDays: 8401032681,
                success: 4578860662,
                cancelled: 5338304421,
                delivering: 1815102974,
                error: 6266035648,
                holding: 2071960509,
                toBeDelivered: 3964699133,
                waiting: 5773547558,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: '6rlxa0o6bgweqaceyiq2k9itjoqlqdc6yn24pi7ypzdbvucv17',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'mud7zxllh51iffnd7ytq',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 19:34:13',
                executionMonitoringStartAt: '2020-07-30 21:39:54',
                executionMonitoringEndAt: '2020-07-31 04:50:03',
                numberMax: 12823102582,
                numberDays: 2481937005,
                success: 7890694669,
                cancelled: 1704203572,
                delivering: 3436695247,
                error: 8943435694,
                holding: 3477131482,
                toBeDelivered: 7442111443,
                waiting: 9101824857,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'j3h6jx2j9lhh68ia04tcs31ja7slffil9cht3rywc332hmwnoh',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'go7abgbow0drrf5i9yh3',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 12:03:32',
                executionMonitoringStartAt: '2020-07-30 14:55:22',
                executionMonitoringEndAt: '2020-07-30 19:27:57',
                numberMax: 1802133649,
                numberDays: 83323065531,
                success: 4458730670,
                cancelled: 8015134707,
                delivering: 2461201541,
                error: 2797308417,
                holding: 8354926963,
                toBeDelivered: 5025138029,
                waiting: 4374931321,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: '80kxryoj744h7e61nvooqs5z8evvm65to8548vchohay2q6pr5',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'a8ww31hg48edr41oppze',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 18:10:13',
                executionMonitoringStartAt: '2020-07-31 11:51:36',
                executionMonitoringEndAt: '2020-07-31 09:36:08',
                numberMax: 3004712674,
                numberDays: 8756490433,
                success: 12848108241,
                cancelled: 1483814554,
                delivering: 9315642857,
                error: 5024257204,
                holding: 1989753913,
                toBeDelivered: 4904964809,
                waiting: 3263252473,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: '8832b75fccozpxt0kijlv76nhtawf73oo3ax7g3vip3w9z94jz',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'x0ewlgjj4b2l9unz13jo',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 20:19:40',
                executionMonitoringStartAt: '2020-07-31 09:31:12',
                executionMonitoringEndAt: '2020-07-30 21:48:12',
                numberMax: 2115759143,
                numberDays: 3365001457,
                success: 2877263511,
                cancelled: 37971622977,
                delivering: 8381811143,
                error: 7828061252,
                holding: 1477233775,
                toBeDelivered: 7459846642,
                waiting: 8458036049,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'dhevw3wjek9nsa2gmtu19hsosuv3ujn27w7g5p0iin9hnlkxn3',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'g0xmbqwisz7oh8n47yp1',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 17:55:45',
                executionMonitoringStartAt: '2020-07-31 11:03:11',
                executionMonitoringEndAt: '2020-07-31 00:46:22',
                numberMax: 2650032335,
                numberDays: 7602372466,
                success: 7724579273,
                cancelled: 3625194161,
                delivering: 97444241604,
                error: 2972254616,
                holding: 4035380400,
                toBeDelivered: 5941274758,
                waiting: 7489276821,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'kbeb64wxlxvd0bait0v2dpzgmhasildxtcw2locwiarvgtqqod',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: '42eg9xt7fcwb4aoa9361',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 18:24:56',
                executionMonitoringStartAt: '2020-07-31 08:32:43',
                executionMonitoringEndAt: '2020-07-31 01:45:44',
                numberMax: 6467235636,
                numberDays: 7963135469,
                success: 1245088841,
                cancelled: 9037681493,
                delivering: 2560544401,
                error: 60836093552,
                holding: 4775902102,
                toBeDelivered: 3954083822,
                waiting: 3136046901,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: '1oz7mhsseemvtmsvcml5lna79ud0xi3oql9rcwnv0yxbp7t9gw',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'p1qtd3f66zmsiczrfa69',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 02:25:01',
                executionMonitoringStartAt: '2020-07-31 04:10:10',
                executionMonitoringEndAt: '2020-07-30 20:24:44',
                numberMax: 2394203590,
                numberDays: 8495244043,
                success: 8802359541,
                cancelled: 4991447241,
                delivering: 8632731572,
                error: 3529569794,
                holding: 43059875703,
                toBeDelivered: 7329843415,
                waiting: 5781107767,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: '6ih0gzmlwz1oecd77pfeqpkiby73b1u2ikgurq3tzujvr9igc1',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: '5lrl3l8ke5ux3mcqsp8v',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 21:18:04',
                executionMonitoringStartAt: '2020-07-31 12:36:30',
                executionMonitoringEndAt: '2020-07-31 03:45:05',
                numberMax: 9395852700,
                numberDays: 6652484393,
                success: 3219598171,
                cancelled: 9169905090,
                delivering: 9857751914,
                error: 4393464809,
                holding: 6754170060,
                toBeDelivered: 16674750300,
                waiting: 4106023692,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: '545frato7q9jq66lnzndb1fq9a206m8v2fanns3upzb2ernqfc',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'ezb4vfvugagnd6bzucgj',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 18:06:07',
                executionMonitoringStartAt: '2020-07-31 05:47:00',
                executionMonitoringEndAt: '2020-07-31 09:42:23',
                numberMax: 1728463794,
                numberDays: 6697505804,
                success: 9537857819,
                cancelled: 4447692368,
                delivering: 3766975262,
                error: 6295540754,
                holding: 6381705675,
                toBeDelivered: 2361113958,
                waiting: 45114373855,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: '5b97od19y84w471oe6i8ns1o2sz1umrpuee740026ibbui44z3',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'xzr0x0f1z2epuu0kho9r',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 10:20:30',
                executionMonitoringStartAt: '2020-07-30 22:10:20',
                executionMonitoringEndAt: '2020-07-30 20:27:59',
                numberMax: -9,
                numberDays: 9950961242,
                success: 8665975369,
                cancelled: 2908179362,
                delivering: 1335507759,
                error: 3756265282,
                holding: 7994524662,
                toBeDelivered: 8629592164,
                waiting: 3994311169,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'm6wcs37tvppmo32dqjievpcvwf9l8fbswzb2i8kpjp51f8s7kp',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: '69iiuetaf8aiyrcgps0a',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 19:56:15',
                executionMonitoringStartAt: '2020-07-31 05:01:07',
                executionMonitoringEndAt: '2020-07-30 19:19:44',
                numberMax: 3964766893,
                numberDays: -9,
                success: 8371716360,
                cancelled: 4670508546,
                delivering: 9495798652,
                error: 3786263530,
                holding: 5783507577,
                toBeDelivered: 7288100496,
                waiting: 8757922542,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'prkq6am7hbctklass8xcok3p8kbxpt4vlmq2d3p9ovk3x2bbeu',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'ye8u3eyw6hkh4ozqk446',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 06:07:08',
                executionMonitoringStartAt: '2020-07-31 00:55:01',
                executionMonitoringEndAt: '2020-07-30 22:06:44',
                numberMax: 3764779732,
                numberDays: 8390118411,
                success: -9,
                cancelled: 1733256434,
                delivering: 5197170763,
                error: 5084476569,
                holding: 3257145687,
                toBeDelivered: 6037600229,
                waiting: 3663209875,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'enw0k41ofw23nxt4bnv7ve70csqs2nbyoel7hl8amfmb5paph1',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: '3h6f1ktdc8ywbabiq0ia',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 04:26:14',
                executionMonitoringStartAt: '2020-07-30 16:03:11',
                executionMonitoringEndAt: '2020-07-31 05:19:52',
                numberMax: 6533889513,
                numberDays: 3360261225,
                success: 5828666253,
                cancelled: -9,
                delivering: 6960569442,
                error: 3530362084,
                holding: 9866252260,
                toBeDelivered: 9149380711,
                waiting: 1354695395,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'uo6mzszgxblk4zmqmkeep7opz0iapl3szxhfdb1wpgpfc993lk',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'hx75mc0344zc2far98j5',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 12:21:05',
                executionMonitoringStartAt: '2020-07-31 06:30:56',
                executionMonitoringEndAt: '2020-07-31 05:11:47',
                numberMax: 7325769816,
                numberDays: 3155638553,
                success: 6165326356,
                cancelled: 4681722163,
                delivering: -9,
                error: 6094665497,
                holding: 8113492102,
                toBeDelivered: 3894070305,
                waiting: 2445439961,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'viktje9xmkofviixpygjqje8tcpz2pt3xua9eiaq0hy1yx8pvd',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'jw62xo5u8tsy439kgll2',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 05:20:54',
                executionMonitoringStartAt: '2020-07-30 21:35:03',
                executionMonitoringEndAt: '2020-07-31 04:36:43',
                numberMax: 2153651215,
                numberDays: 9424854230,
                success: 9918906305,
                cancelled: 6919349616,
                delivering: 2989283305,
                error: -9,
                holding: 3712028599,
                toBeDelivered: 5464708614,
                waiting: 3966839032,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: '7fmfqz6g3rgvkev4mbhrqueoptb03sup4wnrctu3uslxle722d',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 's80qdhnf2a4mz6ftvvc7',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 00:36:54',
                executionMonitoringStartAt: '2020-07-30 14:50:33',
                executionMonitoringEndAt: '2020-07-30 16:20:40',
                numberMax: 5859645763,
                numberDays: 1207647784,
                success: 7945733977,
                cancelled: 9090566080,
                delivering: 2825872013,
                error: 8171354778,
                holding: -9,
                toBeDelivered: 6654059424,
                waiting: 1431744889,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'awunnmj7p8l175li3m51xdsk988yrpum3rwafn22up1bvf46sx',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'upffonos4wipo31xtwto',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 22:53:45',
                executionMonitoringStartAt: '2020-07-30 19:55:52',
                executionMonitoringEndAt: '2020-07-31 05:43:06',
                numberMax: 4153645850,
                numberDays: 5601631444,
                success: 4133702586,
                cancelled: 3609635488,
                delivering: 2998373572,
                error: 8263018325,
                holding: 8224220166,
                toBeDelivered: -9,
                waiting: 3734730213,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'yqx5zova5ilwksvkgr7nbcqaq6caurnr5yg0wue18n7lcutamz',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'm9z6hjgurs23poj62tnx',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 06:35:55',
                executionMonitoringStartAt: '2020-07-31 03:24:45',
                executionMonitoringEndAt: '2020-07-31 11:36:58',
                numberMax: 9262220651,
                numberDays: 7239046612,
                success: 7804340062,
                cancelled: 2882209353,
                delivering: 4798101943,
                error: 4426381707,
                holding: 5843556125,
                toBeDelivered: 7928164315,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: '1qw4vebsqhgaicrkmpue8pqrt7hx2ikf3xtrdfgi8jwbwud1bk',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'lwrj440td624q7ekiwpm',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-31 11:47:37',
                executionMonitoringStartAt: '2020-07-30 22:30:28',
                executionMonitoringEndAt: '2020-07-31 02:20:19',
                numberMax: 6206232979,
                numberDays: 6408776171,
                success: 4834993887,
                cancelled: 6609682890,
                delivering: 6056958008,
                error: 9467199432,
                holding: 3030625640,
                toBeDelivered: 9912753120,
                waiting: 9619171957,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'xua75gfonycb7akp0cffbx9v9ej3xvppr133vypj55hsx5qisg',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: '1usez4rvmwnflv24mve6',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-30 19:14:24',
                executionMonitoringEndAt: '2020-07-31 10:07:32',
                numberMax: 9067824644,
                numberDays: 3743417611,
                success: 1920673278,
                cancelled: 2630977785,
                delivering: 5895712461,
                error: 6527992245,
                holding: 9978325509,
                toBeDelivered: 5620570530,
                waiting: 7162146500,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'cdwx7b8tnz8tqhsnwoofswseeagn0yhvf8kl6kwpnn1rwkhb9g',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'ptrr6hxmldfmffi5wugz',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 00:00:44',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-31 02:12:32',
                numberMax: 2564367036,
                numberDays: 7190662145,
                success: 2858638516,
                cancelled: 6674093165,
                delivering: 5648038699,
                error: 7650388760,
                holding: 9896549092,
                toBeDelivered: 4055129504,
                waiting: 2527123751,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'y7ujpkwm3y5e0rlgaqhv1h6d0c62frdh8dlsf084gd1sdrykrc',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 't8clmmwghs3m20y4t3d0',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 08:03:25',
                executionMonitoringStartAt: '2020-07-30 19:46:30',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 2625595474,
                numberDays: 3002071559,
                success: 7643863556,
                cancelled: 9144200861,
                delivering: 1710295413,
                error: 4394409080,
                holding: 3252393824,
                toBeDelivered: 9510377574,
                waiting: 6655865867,
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
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'tfpmqo46v66ilgwffwa41kvgrjrjeya24a1c61c2vtfc5h37uq',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'j59lxdnjrrgu1rpe3ts8',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 14:08:29',
                executionMonitoringStartAt: '2020-07-31 13:21:18',
                executionMonitoringEndAt: '2020-07-31 08:30:46',
                numberMax: 1005202949,
                numberDays: 4489714807,
                success: 9561760913,
                cancelled: 1135707518,
                delivering: 7458514991,
                error: 5241518521,
                holding: 4950814214,
                toBeDelivered: 6899827379,
                waiting: 7031262918,
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
                        value   : '2b0c382a-e5ae-45ee-ab5c-ce0cfda081ea'
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
                        value   : '15225072-4e52-48a1-9ce6-0b83a791f2ac'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '15225072-4e52-48a1-9ce6-0b83a791f2ac'));
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/906c4b23-296c-4642-bd15-b1648b18b105')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/15225072-4e52-48a1-9ce6-0b83a791f2ac')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '15225072-4e52-48a1-9ce6-0b83a791f2ac'));
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
                
                id: 'c29149ad-527f-4117-bfd3-26f4c543ec61',
                tenantId: '1b289c13-1949-495f-b7b5-f7cd7fbf8a10',
                tenantCode: 'bjno05ppvtvrpmtydcqz2ax76061fsp4rc17e7gh75wfi72zw4',
                systemId: 'f5c098d9-e2ed-4b75-a857-5ac664795799',
                systemName: 'ynlzj24mglrxrtb7gaoy',
                executionId: 'b1a308b7-5fe1-4074-99ff-80ebbf625c22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 20:56:34',
                executionMonitoringStartAt: '2020-07-31 10:50:19',
                executionMonitoringEndAt: '2020-07-31 01:01:04',
                numberMax: 6297466316,
                numberDays: 2192508644,
                success: 1872191807,
                cancelled: 8297393759,
                delivering: 5162305196,
                error: 6340289070,
                holding: 7342373254,
                toBeDelivered: 3594447581,
                waiting: 9995852241,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                tenantCode: 'u490127s66xun5k217gu3b6yfgljy1901n50ihl8dn24cfyjy6',
                systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                systemName: 'kjthzonlhptmd621bwgc',
                executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 21:03:46',
                executionMonitoringStartAt: '2020-07-31 04:14:32',
                executionMonitoringEndAt: '2020-07-31 01:42:25',
                numberMax: 6933418645,
                numberDays: 4963440602,
                success: 2479728522,
                cancelled: 3489948392,
                delivering: 9323576390,
                error: 8967363022,
                holding: 7298133099,
                toBeDelivered: 9185064138,
                waiting: 8921588607,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '15225072-4e52-48a1-9ce6-0b83a791f2ac'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/f68b7e80-457b-47c3-ae85-c4b3cb133a59')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/15225072-4e52-48a1-9ce6-0b83a791f2ac')
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
                        id: 'df69d7d1-1775-4adb-815d-e8b55616b1bf',
                        tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                        tenantCode: 'nb88zia1gjslh4exxqsrzuxlpg2r8sb0w24gteeq5bvzrigjso',
                        systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                        systemName: 'gi9ls6d6sq7ne83e4d0p',
                        executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-31 11:38:50',
                        executionMonitoringStartAt: '2020-07-30 23:09:17',
                        executionMonitoringEndAt: '2020-07-30 15:03:44',
                        numberMax: 8338730362,
                        numberDays: 7390220460,
                        success: 3692023929,
                        cancelled: 1580088760,
                        delivering: 5568489527,
                        error: 9544758732,
                        holding: 4588675586,
                        toBeDelivered: 7929764129,
                        waiting: 6938833524,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', 'df69d7d1-1775-4adb-815d-e8b55616b1bf');
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
                            value   : 'c3feb467-ae02-41c7-849b-d43d33952cb2'
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
                            value   : '15225072-4e52-48a1-9ce6-0b83a791f2ac'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('15225072-4e52-48a1-9ce6-0b83a791f2ac');
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
                    id: 'a08ee294-0e32-4a8a-a843-ec535c881ff6'
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
                    id: '15225072-4e52-48a1-9ce6-0b83a791f2ac'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('15225072-4e52-48a1-9ce6-0b83a791f2ac');
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
                        
                        id: '5ebafce6-9d31-4ed6-8472-1bb7c0634172',
                        tenantId: '07c93dc4-4f0e-4131-b1d9-fb0e23414f00',
                        tenantCode: 'rtthzaotop6es8hv0gglpdmcc9dt4657ebns196htnisepnt5v',
                        systemId: 'ad14effb-28db-4182-a169-33ee985eeffa',
                        systemName: '9o637pwjz0qw7haulqjo',
                        executionId: '47febbc4-b61a-4933-9b1f-bf13021cc1ee',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-31 07:31:21',
                        executionMonitoringStartAt: '2020-07-31 13:20:42',
                        executionMonitoringEndAt: '2020-07-30 22:00:08',
                        numberMax: 6400291631,
                        numberDays: 6166146270,
                        success: 1003106046,
                        cancelled: 8060824414,
                        delivering: 6682794535,
                        error: 8542817801,
                        holding: 8825259681,
                        toBeDelivered: 3956894425,
                        waiting: 2308325431,
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
                        
                        id: '15225072-4e52-48a1-9ce6-0b83a791f2ac',
                        tenantId: 'eaa8d916-2def-4953-aae4-a1607af92731',
                        tenantCode: 'hntrks0hr4d7o38xz7fgtub6fpik2zl18hzprl6snng2fu3fqh',
                        systemId: 'bc0dd0c1-f72c-49aa-8953-b03318252802',
                        systemName: '2iludsc041q9tt5k7g82',
                        executionId: 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-31 13:32:46',
                        executionMonitoringStartAt: '2020-07-30 16:44:01',
                        executionMonitoringEndAt: '2020-07-31 06:30:53',
                        numberMax: 6314946643,
                        numberDays: 8358883990,
                        success: 7381297061,
                        cancelled: 9131302789,
                        delivering: 3149741641,
                        error: 3788487344,
                        holding: 6420440693,
                        toBeDelivered: 8922015051,
                        waiting: 8560848601,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('15225072-4e52-48a1-9ce6-0b83a791f2ac');
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
                    id: 'a9ee426c-6798-49a3-b166-cff8e7aefb57'
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
                    id: '15225072-4e52-48a1-9ce6-0b83a791f2ac'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('15225072-4e52-48a1-9ce6-0b83a791f2ac');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});