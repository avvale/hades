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
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'd57h71m3zhygxz6wby92ajg56tepkh5pcbi3jj1fpyrr492d5a',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'q7ckzwrclk9l7a7qs568',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:58:29',
                executionMonitoringStartAt: '2020-07-29 02:47:44',
                executionMonitoringEndAt: '2020-07-29 18:00:51',
                numberMax: 1985335805,
                numberDays: 4514351174,
                success: 9832924684,
                cancelled: 6355030300,
                delivering: 3077099813,
                error: 1243163326,
                holding: 7285615805,
                toBeDelivered: 8284560480,
                waiting: 9979527782,
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
                
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'tx0b0nuvi1qa9kdaxmhk4samdfz5xf4s0glz5alrvndmme813t',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'iibbl5xijdneuopdllyb',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:51:06',
                executionMonitoringStartAt: '2020-07-29 20:28:11',
                executionMonitoringEndAt: '2020-07-29 02:10:16',
                numberMax: 9492640221,
                numberDays: 9757432425,
                success: 9212840189,
                cancelled: 8972146334,
                delivering: 2199139648,
                error: 9354678940,
                holding: 3247756534,
                toBeDelivered: 7776358683,
                waiting: 2186789372,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: null,
                tenantCode: '9m9fnlqsxutcf2rrtg28xz4k5kmmudl9mq6wkivs9mr8yds7fg',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'ouwubwduxb43tu172qi4',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:52:47',
                executionMonitoringStartAt: '2020-07-29 18:36:08',
                executionMonitoringEndAt: '2020-07-29 11:11:22',
                numberMax: 3224664159,
                numberDays: 7115667437,
                success: 3855111464,
                cancelled: 7664844429,
                delivering: 5217192823,
                error: 9578310870,
                holding: 8350540518,
                toBeDelivered: 7515431387,
                waiting: 9902475506,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                
                tenantCode: 'ge9xr7xhqo34gfrnhoi3ojecagrcqfj6v9xv49bctu3wcpwd8z',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'wi5umjp9c16bce9n2cx7',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:34:30',
                executionMonitoringStartAt: '2020-07-29 10:09:26',
                executionMonitoringEndAt: '2020-07-29 18:13:00',
                numberMax: 9430305672,
                numberDays: 7396875482,
                success: 9336965136,
                cancelled: 9280733144,
                delivering: 3910709973,
                error: 8478031380,
                holding: 8982374616,
                toBeDelivered: 5325238311,
                waiting: 2027143917,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: null,
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'y6ne7b3zpzseh7go0l1y',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:17:18',
                executionMonitoringStartAt: '2020-07-29 20:30:45',
                executionMonitoringEndAt: '2020-07-29 15:25:46',
                numberMax: 8832726056,
                numberDays: 7746614140,
                success: 4008908731,
                cancelled: 2356517339,
                delivering: 3046069809,
                error: 2494924056,
                holding: 1658947953,
                toBeDelivered: 9175872842,
                waiting: 8647687227,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: '5l08ako6mdgyd18fdeiy',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:15:00',
                executionMonitoringStartAt: '2020-07-29 17:38:15',
                executionMonitoringEndAt: '2020-07-29 12:23:24',
                numberMax: 9288807115,
                numberDays: 3392490960,
                success: 2166531923,
                cancelled: 7707050172,
                delivering: 7510908051,
                error: 7540746650,
                holding: 7206411399,
                toBeDelivered: 9714811433,
                waiting: 7799027051,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: '4z1q0foqhyt0pfp7089sheewwqar10c00ps3jnj7ktyfvhki2s',
                systemId: null,
                systemName: '9qep9y4xq21cg36s5c55',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:14:34',
                executionMonitoringStartAt: '2020-07-29 08:06:37',
                executionMonitoringEndAt: '2020-07-29 09:08:15',
                numberMax: 1808101725,
                numberDays: 8732301803,
                success: 9626355645,
                cancelled: 2615066423,
                delivering: 9594377228,
                error: 2927361299,
                holding: 9259508778,
                toBeDelivered: 2930319220,
                waiting: 5142871018,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'o1seuvhoj3js79tqm8dridbdxefaoa83ht68sux753u03x8xtc',
                
                systemName: 'w4kfsz3t9xo4m7g83y2l',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:16:10',
                executionMonitoringStartAt: '2020-07-29 15:11:57',
                executionMonitoringEndAt: '2020-07-29 09:35:54',
                numberMax: 5338825656,
                numberDays: 8245905237,
                success: 4073722356,
                cancelled: 3632291846,
                delivering: 1306105582,
                error: 7013677740,
                holding: 5571189187,
                toBeDelivered: 6647335867,
                waiting: 2069874422,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'o7vf3g4e33w11lfde4blfn1os20h7s3965may8plbkhkyxou56',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: null,
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 18:50:16',
                executionMonitoringStartAt: '2020-07-29 16:29:08',
                executionMonitoringEndAt: '2020-07-29 03:34:51',
                numberMax: 9614791333,
                numberDays: 9700551735,
                success: 7348963311,
                cancelled: 5449833293,
                delivering: 5747128945,
                error: 1621263574,
                holding: 5202081551,
                toBeDelivered: 9936872166,
                waiting: 4893334641,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'l4edjwzgp2rln92qq8eg5d8pgtwvcxiebmoufyz1pomyqm4thv',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:55:34',
                executionMonitoringStartAt: '2020-07-29 06:20:30',
                executionMonitoringEndAt: '2020-07-29 16:39:02',
                numberMax: 3291377331,
                numberDays: 1157371062,
                success: 8225084163,
                cancelled: 4575618154,
                delivering: 6807665998,
                error: 5319131916,
                holding: 3513493342,
                toBeDelivered: 5141335313,
                waiting: 6885827215,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'mtf6vtfoxz4olcsgiypfmp41rhqefcw41iugjc7kn52emzphx7',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'q1pt16fdm9zy9vjtbh94',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:28:56',
                executionMonitoringStartAt: '2020-07-29 23:30:30',
                executionMonitoringEndAt: '2020-07-29 17:40:58',
                numberMax: 1243335501,
                numberDays: 2678234454,
                success: 4252653138,
                cancelled: 9370220127,
                delivering: 8978913405,
                error: 6033706502,
                holding: 8801227116,
                toBeDelivered: 9156875201,
                waiting: 4944985801,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'ok91nonip8n1hlewdu21snl9r0qp3qwvfn97rpmttucqfnw666',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'j64vrjh8xbh678hbhpsb',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:40:34',
                executionMonitoringStartAt: '2020-07-29 18:42:44',
                executionMonitoringEndAt: '2020-07-29 14:57:52',
                numberMax: 5756445391,
                numberDays: 3457378797,
                success: 5981369946,
                cancelled: 9138489682,
                delivering: 3593679098,
                error: 7929829690,
                holding: 8399306336,
                toBeDelivered: 2918961905,
                waiting: 7617195620,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'yecl8549uy7r9yd9l623wws074ra3cfyec5jxl4hhc8ap82ekv',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'fk1u8pwnhlu8rx55tla3',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: null,
                executionExecutedAt: '2020-07-29 10:21:48',
                executionMonitoringStartAt: '2020-07-29 19:13:03',
                executionMonitoringEndAt: '2020-07-29 08:31:02',
                numberMax: 8772629032,
                numberDays: 5892702129,
                success: 6990334018,
                cancelled: 4263459255,
                delivering: 3410625369,
                error: 7088537976,
                holding: 2328275822,
                toBeDelivered: 4350582072,
                waiting: 6528048771,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'fvuk8nu2q3fw5srvq3f9hbvewmjkq3v0be3g0nbk4a1wusguus',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'gjabxn66gk32z5a7osbm',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                
                executionExecutedAt: '2020-07-29 03:07:36',
                executionMonitoringStartAt: '2020-07-29 12:42:25',
                executionMonitoringEndAt: '2020-07-29 16:05:28',
                numberMax: 1423501284,
                numberDays: 8984200717,
                success: 2363703500,
                cancelled: 6065703989,
                delivering: 6760028927,
                error: 1360404374,
                holding: 4945268589,
                toBeDelivered: 1952984979,
                waiting: 5635969661,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: '87qazqqowe0n7u3l4u1i5n07pc2buwnaqg1qwukbw8jtil2nzr',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'c80h6dn8exrgygo4vijr',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 10:28:16',
                executionMonitoringEndAt: '2020-07-29 05:53:28',
                numberMax: 3703276898,
                numberDays: 9277357465,
                success: 5815644701,
                cancelled: 9687755015,
                delivering: 8624395475,
                error: 4254286057,
                holding: 8368669166,
                toBeDelivered: 1763092061,
                waiting: 1098402499,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'saowesci383ouvkv6p4lvus3pvs93869557g0y6gqjbg2cior4',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'bv7zqzmdcamww12ykv69',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 21:40:44',
                executionMonitoringEndAt: '2020-07-29 22:37:12',
                numberMax: 6150722673,
                numberDays: 6550121730,
                success: 7927883876,
                cancelled: 1137029076,
                delivering: 7808331639,
                error: 1273120515,
                holding: 2811659412,
                toBeDelivered: 5300574868,
                waiting: 6324299553,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: '8hoh5ygd4wrnfbb88wd6vmu0qk4mamiiv1egycmlhtayw6ezuj',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: '5qw4z4w6sk5ibfzzibk2',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:06:41',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 14:20:51',
                numberMax: 3249443455,
                numberDays: 8446506994,
                success: 5301318679,
                cancelled: 5798931260,
                delivering: 9845130363,
                error: 9697452742,
                holding: 3329576107,
                toBeDelivered: 3182110654,
                waiting: 6829972105,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'r9ro7roakzyk3yww24ewkffpi2nhx8afkaq0hinqnj4yz45ijz',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'af7byv31jbopx5taa5yv',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:23:36',
                
                executionMonitoringEndAt: '2020-07-29 23:52:36',
                numberMax: 7357876612,
                numberDays: 7958072140,
                success: 3853736416,
                cancelled: 8592124862,
                delivering: 7495005869,
                error: 1625953012,
                holding: 9435178575,
                toBeDelivered: 2486149605,
                waiting: 6773679546,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'y8rsn2f483epi646rnyk51njy9n3v4gwghqwnp5qz3v4v6taub',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'asqiwd6ld0cev0m8vbr0',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:37:27',
                executionMonitoringStartAt: '2020-07-29 01:22:13',
                executionMonitoringEndAt: null,
                numberMax: 8072284198,
                numberDays: 6078922239,
                success: 9482208837,
                cancelled: 3369094515,
                delivering: 3635262816,
                error: 9826995316,
                holding: 3573049515,
                toBeDelivered: 5796976572,
                waiting: 9208440591,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'gylffbi6n5zipgiqfgcdozvjbdxbn1v9iyye7py3s4ib70w8yv',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'uhgyclribzldojhhyea0',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:28:20',
                executionMonitoringStartAt: '2020-07-29 23:11:56',
                
                numberMax: 2077621002,
                numberDays: 3203685784,
                success: 1488269521,
                cancelled: 4617385150,
                delivering: 5229048690,
                error: 5935635347,
                holding: 4472339070,
                toBeDelivered: 9698462952,
                waiting: 3509278227,
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
                id: '34reoqu3dbclqkkpvwsm9dyaqtissyatmqswy',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'dj3oiryls4rw16cima2g6nyjrt8o2j4h6byvrpqirlqis5mapb',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'f0637svz58wjf6q4nkgm',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:42:07',
                executionMonitoringStartAt: '2020-07-29 05:16:18',
                executionMonitoringEndAt: '2020-07-29 04:22:09',
                numberMax: 6316948095,
                numberDays: 8580590840,
                success: 3867739629,
                cancelled: 1338537221,
                delivering: 7719448608,
                error: 2296808423,
                holding: 4173323369,
                toBeDelivered: 4207251587,
                waiting: 4449365197,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'k76dn93h94fe55xmiu0qfh69zpccj0q2nxpdm',
                tenantCode: '59o9i3c8n8cdp1wejy9uo5bz8zm1ehnwyeshn1dzs4jw6ve2wp',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'sqycqugd80roxw6teb02',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:40:22',
                executionMonitoringStartAt: '2020-07-29 17:27:46',
                executionMonitoringEndAt: '2020-07-29 12:50:08',
                numberMax: 7560771890,
                numberDays: 9464089485,
                success: 2584381298,
                cancelled: 1528271605,
                delivering: 8871543160,
                error: 9189597603,
                holding: 9295841666,
                toBeDelivered: 6512247039,
                waiting: 8699920064,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: '9rfquohzcby64nd8eo7dtzfqs2ie606zaxcnrjf91ocr2xfoxq',
                systemId: 'a39yfjf6pbosqob9o3luylnte9ous1qhgza8n',
                systemName: 'i6nlcjfnrmm8as2r7o04',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 19:40:11',
                executionMonitoringStartAt: '2020-07-29 16:31:37',
                executionMonitoringEndAt: '2020-07-29 23:56:11',
                numberMax: 5719971555,
                numberDays: 1267870315,
                success: 1778462450,
                cancelled: 4321287489,
                delivering: 7214595644,
                error: 1000793861,
                holding: 7284004817,
                toBeDelivered: 6217533989,
                waiting: 8704022041,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'v91qxijb6g0cvrlcqmvx0x11gaf2pl1hvs7jois0a34oob3lob',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'jiupq9eja9c9q1p6ogie',
                executionId: '7wwa8kx8quvgdk7noizw128v9oks87l2mkv3v',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 19:55:20',
                executionMonitoringStartAt: '2020-07-29 04:42:54',
                executionMonitoringEndAt: '2020-07-29 10:28:09',
                numberMax: 6756531893,
                numberDays: 9754326922,
                success: 8452045181,
                cancelled: 8728946146,
                delivering: 6868543165,
                error: 2737027845,
                holding: 1117713121,
                toBeDelivered: 1454140092,
                waiting: 3785710366,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'abyz10p7tdxqqemj5l2r7f3v0lc7xcab2lshra161ckza8pbnch',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'g953tmbzbgnrl3zgzxd7',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:11:46',
                executionMonitoringStartAt: '2020-07-29 23:54:19',
                executionMonitoringEndAt: '2020-07-29 12:59:46',
                numberMax: 3449663455,
                numberDays: 5236676040,
                success: 9526680028,
                cancelled: 2052366416,
                delivering: 9833528245,
                error: 5736164615,
                holding: 9706481082,
                toBeDelivered: 6972693518,
                waiting: 9806346270,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'n3f446atqmkrt6851qpsbt566ayvb938kep8texn8i9ey0qwsf',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'hrs9eddbbt8s8xzfq56o3',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:52:08',
                executionMonitoringStartAt: '2020-07-29 13:01:32',
                executionMonitoringEndAt: '2020-07-29 02:16:34',
                numberMax: 1540982819,
                numberDays: 7022552030,
                success: 6691761279,
                cancelled: 9348433393,
                delivering: 4256246872,
                error: 2565876428,
                holding: 6189621567,
                toBeDelivered: 5632615105,
                waiting: 7646021138,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'w1k7w8kpekb5wrc12h175q2aks9w19i084vxn26dxwgksa48uu',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'y0f6iysaxjlvtq3u2rwl',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 00:36:03',
                executionMonitoringStartAt: '2020-07-29 07:31:42',
                executionMonitoringEndAt: '2020-07-29 20:24:42',
                numberMax: 30566539143,
                numberDays: 6557955492,
                success: 6910345247,
                cancelled: 5267653058,
                delivering: 7562080596,
                error: 9107683934,
                holding: 2746730071,
                toBeDelivered: 4252750863,
                waiting: 7893513911,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'vsxo01oog3sa63dfdzhf30leudf8woinxodsx2ij578dva9c56',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'lrwo53pusf7yc9a4kf5k',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:47:15',
                executionMonitoringStartAt: '2020-07-29 01:37:38',
                executionMonitoringEndAt: '2020-07-29 23:59:40',
                numberMax: 2952082907,
                numberDays: 56895734363,
                success: 5031545491,
                cancelled: 1225004016,
                delivering: 8137529580,
                error: 1207040554,
                holding: 2111246510,
                toBeDelivered: 8707393860,
                waiting: 1565018949,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'ii37yg54u9qsa9n1kay2wn2dedjva86lfr6gcxqm67ier0joo6',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'y8vddxnqp4kfnwbucf3x',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 22:42:54',
                executionMonitoringStartAt: '2020-07-29 13:32:22',
                executionMonitoringEndAt: '2020-07-29 20:40:53',
                numberMax: 3239196082,
                numberDays: 1491832041,
                success: 46918218386,
                cancelled: 2769622093,
                delivering: 1951899082,
                error: 2746559128,
                holding: 5684136530,
                toBeDelivered: 6451579293,
                waiting: 9714455153,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'bc17ixwng77mzzu1e53cov6rlw757h2gp8o17ukokg4h4q2szr',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'pdyu4rbt0knrrp0ei8ns',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:10:38',
                executionMonitoringStartAt: '2020-07-29 20:57:40',
                executionMonitoringEndAt: '2020-07-29 08:30:21',
                numberMax: 3861433684,
                numberDays: 1872937900,
                success: 3696738025,
                cancelled: 24848435452,
                delivering: 1938097758,
                error: 9682592508,
                holding: 2084674540,
                toBeDelivered: 2669471026,
                waiting: 8159481023,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'qj8ve9rdc7ndsq9mhjucclyj0vve5yjrqrhzcee6bpzvj1aw82',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'y7zs967ugmcbozcfq0ka',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:15:07',
                executionMonitoringStartAt: '2020-07-29 05:47:46',
                executionMonitoringEndAt: '2020-07-29 02:26:06',
                numberMax: 6236555708,
                numberDays: 4942104894,
                success: 3634299054,
                cancelled: 5041268532,
                delivering: 61456491929,
                error: 3306324919,
                holding: 9162618888,
                toBeDelivered: 3277405644,
                waiting: 3419902837,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: '7ynx6oulx0aztd02iw7k8kkan5p83omxzqykwanp64l6ax7btu',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'nlkdm27u9fm3fqbz8kr0',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 20:40:04',
                executionMonitoringStartAt: '2020-07-29 01:42:18',
                executionMonitoringEndAt: '2020-07-30 00:40:29',
                numberMax: 4931629041,
                numberDays: 8950184991,
                success: 8006141618,
                cancelled: 6171217133,
                delivering: 8401920049,
                error: 95876046887,
                holding: 8171291272,
                toBeDelivered: 4716286781,
                waiting: 6913866444,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'p94tacmsyc14nzdrscxlofrwzzlbafv8ycjl2k7wgckw8dfye5',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'mneewyiveiv3fpgowsgs',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:04:11',
                executionMonitoringStartAt: '2020-07-29 10:06:00',
                executionMonitoringEndAt: '2020-07-30 00:24:04',
                numberMax: 1459211571,
                numberDays: 5746223676,
                success: 5875974896,
                cancelled: 3185148693,
                delivering: 4011188258,
                error: 3227835653,
                holding: 40825268216,
                toBeDelivered: 8744990867,
                waiting: 3287844673,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: '42lq66vpykgeu08wxtszc8nuu7eohpq5wels0grbt1t2qm540v',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'vrf6vq2j6owpyofvqa4t',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 21:36:38',
                executionMonitoringStartAt: '2020-07-29 03:07:32',
                executionMonitoringEndAt: '2020-07-29 11:56:06',
                numberMax: 5993466626,
                numberDays: 4568746561,
                success: 4454474430,
                cancelled: 4573905522,
                delivering: 1753464776,
                error: 2938567939,
                holding: 2537284535,
                toBeDelivered: 23023682861,
                waiting: 8019696959,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'u7ga5b8m4ilwlh1fu8m2378b28r4bwtsjl3qjcregiy9zaqe4m',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: '5ogm089gbevidyvkxsuv',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:16:55',
                executionMonitoringStartAt: '2020-07-30 00:16:47',
                executionMonitoringEndAt: '2020-07-29 09:04:32',
                numberMax: 7137835755,
                numberDays: 6798148891,
                success: 9618990060,
                cancelled: 2127693414,
                delivering: 8776550088,
                error: 8743405601,
                holding: 1906830295,
                toBeDelivered: 6205874069,
                waiting: 59432940536,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: '2mi91pw2zx76lmlo4t6ndf15y2eif88vtu1ww0senh17or6y0b',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'xtxhorbu9rj7sjrtrh6f',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:06:54',
                executionMonitoringStartAt: '2020-07-29 18:25:58',
                executionMonitoringEndAt: '2020-07-29 11:28:29',
                numberMax: -9,
                numberDays: 9985968046,
                success: 8736890820,
                cancelled: 3971804402,
                delivering: 1612709452,
                error: 4643079424,
                holding: 4514363377,
                toBeDelivered: 2195730012,
                waiting: 2212899624,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'zi8ynz2ic9avtau0f0rngvqdvbehhmkbkjoaib44jkwluqg4a6',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'lrltrdp99djspxkaagl4',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:30:20',
                executionMonitoringStartAt: '2020-07-29 22:18:51',
                executionMonitoringEndAt: '2020-07-29 22:24:49',
                numberMax: 1803926265,
                numberDays: -9,
                success: 6824316101,
                cancelled: 5322919259,
                delivering: 8887162472,
                error: 2209802567,
                holding: 8138746538,
                toBeDelivered: 9559234847,
                waiting: 3226496368,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'hfm8zz5l4wuzkjv29q5qscg3j8e6lvxepdj0xdiq2l0wgv9mlp',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'yxmh4fidfylf79supd0w',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:53:05',
                executionMonitoringStartAt: '2020-07-29 16:39:51',
                executionMonitoringEndAt: '2020-07-29 21:52:57',
                numberMax: 5732271156,
                numberDays: 9025613094,
                success: -9,
                cancelled: 4442732228,
                delivering: 9544738432,
                error: 4116564644,
                holding: 2317765596,
                toBeDelivered: 5651729318,
                waiting: 4713993436,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'a14arjfttsv3sn953cz88njwy22z2wtjha9dlq56vm5phmn0he',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: '3mwgw76vxkz3nkyjd3ui',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:50:40',
                executionMonitoringStartAt: '2020-07-29 02:56:50',
                executionMonitoringEndAt: '2020-07-30 00:28:19',
                numberMax: 2305212235,
                numberDays: 5232587371,
                success: 9567254797,
                cancelled: -9,
                delivering: 7298485756,
                error: 9770220224,
                holding: 6916062468,
                toBeDelivered: 7162344091,
                waiting: 4294447206,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'uiuzqecnyc0yg1hkn3vr5tjmafbv461wjq7ej34dhw8w3izjwi',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'i650p601o7b01cw7u6st',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:33:07',
                executionMonitoringStartAt: '2020-07-29 19:56:41',
                executionMonitoringEndAt: '2020-07-29 14:10:00',
                numberMax: 6024546758,
                numberDays: 1981486247,
                success: 7117762812,
                cancelled: 5502888428,
                delivering: -9,
                error: 5664413690,
                holding: 4785617697,
                toBeDelivered: 5195498032,
                waiting: 6303514225,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'fnacjmibf1r1h10v5je8zeqm26bk1yqc4zloa8v2cbicd7x1cn',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: '4yah06wcq4k65v3xyifi',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 21:48:29',
                executionMonitoringStartAt: '2020-07-29 06:51:37',
                executionMonitoringEndAt: '2020-07-29 07:34:16',
                numberMax: 3782899589,
                numberDays: 9964872769,
                success: 7591345238,
                cancelled: 5893203054,
                delivering: 3844964790,
                error: -9,
                holding: 8181033232,
                toBeDelivered: 5387304173,
                waiting: 9628144199,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'a2mz3bohelpq4r2ixt97gjbyhyjiqrit2uygledpqk5dh903v6',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: '7vjxb7o9fxal1e7dxf02',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 23:08:06',
                executionMonitoringStartAt: '2020-07-29 07:22:38',
                executionMonitoringEndAt: '2020-07-29 05:37:11',
                numberMax: 2739413522,
                numberDays: 5063813715,
                success: 6071102191,
                cancelled: 1718259061,
                delivering: 2750111029,
                error: 5867450497,
                holding: -9,
                toBeDelivered: 8278202545,
                waiting: 2982195901,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'r83iul67lqraz95sbg21gb1hbcsq76gqwdyza0uvceb2kajodp',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'yjbhv00nnt7nhk9vd03t',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:22:59',
                executionMonitoringStartAt: '2020-07-29 22:14:40',
                executionMonitoringEndAt: '2020-07-29 05:13:03',
                numberMax: 2495055274,
                numberDays: 2371220000,
                success: 5964652481,
                cancelled: 4445508603,
                delivering: 4170703335,
                error: 3239639194,
                holding: 1136440110,
                toBeDelivered: -9,
                waiting: 8787535183,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: '9v9qlu328exw77t56ltu3j1150r8p5cdc213tfhhmyend2scci',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'lz5005ovv7bwac7mr147',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:14:34',
                executionMonitoringStartAt: '2020-07-29 15:34:22',
                executionMonitoringEndAt: '2020-07-29 10:41:35',
                numberMax: 6148999293,
                numberDays: 9266304834,
                success: 6311912104,
                cancelled: 3005731515,
                delivering: 3960660909,
                error: 4163696867,
                holding: 1517610564,
                toBeDelivered: 1796723642,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: '4a57ad1n41oeddwoe3969v7zkysa1t4n1pa74fy6m6jy7ovzr9',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'wn8a2snytewqr7bugh5a',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 06:37:54',
                executionMonitoringStartAt: '2020-07-29 18:36:07',
                executionMonitoringEndAt: '2020-07-29 20:50:31',
                numberMax: 4367145720,
                numberDays: 8517115653,
                success: 5215162268,
                cancelled: 4647717113,
                delivering: 1726698417,
                error: 7036088064,
                holding: 6193537899,
                toBeDelivered: 8556545600,
                waiting: 5153107584,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'bctem1gqff3jllyi27fuo1i836uy2s9spxitbbhjrowan4auk1',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'cy0aaurcti5lzqvdjzw3',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 01:21:17',
                executionMonitoringEndAt: '2020-07-29 12:47:35',
                numberMax: 6184014995,
                numberDays: 7550908443,
                success: 8377878278,
                cancelled: 7233146749,
                delivering: 1882801326,
                error: 3423945464,
                holding: 1781969388,
                toBeDelivered: 2118664945,
                waiting: 8684281877,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'pi060fycv9suydpfpnxbsr0af5pj9amvtk518sue0in8uq9zlu',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'icqxy5g0npk28owc4x88',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:11:06',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 18:32:02',
                numberMax: 7343471179,
                numberDays: 1032780440,
                success: 8551970178,
                cancelled: 4642735630,
                delivering: 1083172833,
                error: 1683577558,
                holding: 1973929449,
                toBeDelivered: 2954480913,
                waiting: 1794560678,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'xh9tffjov7ug0bkoxqmbd1srs99861rwvqfuxga3xw9bsw9li8',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'ie1kxghsqoqlixb7i427',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 21:12:08',
                executionMonitoringStartAt: '2020-07-29 08:24:06',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 4000007615,
                numberDays: 2130010509,
                success: 5679615670,
                cancelled: 5074473804,
                delivering: 2882300003,
                error: 2605491374,
                holding: 1430635178,
                toBeDelivered: 1477282112,
                waiting: 1618347951,
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
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'gd5zoosgf1fthxq1zwsgmxaik2lfld3inb1eji65w762tapa2p',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: '1or02c4i49cq31si1k3z',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:04:07',
                executionMonitoringStartAt: '2020-07-29 04:37:01',
                executionMonitoringEndAt: '2020-07-29 23:02:07',
                numberMax: 2914435321,
                numberDays: 4378466651,
                success: 3079834680,
                cancelled: 8339038362,
                delivering: 5196200789,
                error: 8719378752,
                holding: 8480095651,
                toBeDelivered: 5094274560,
                waiting: 5410193061,
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
                        value   : 'c71ebbe8-87e4-4441-93fd-37466110b38d'
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
                        value   : 'c4135995-2f23-4d39-9763-aa76a1242de5'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c4135995-2f23-4d39-9763-aa76a1242de5'));
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/d410d04d-4b9d-4829-8ae6-24ebdc1821ee')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/c4135995-2f23-4d39-9763-aa76a1242de5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c4135995-2f23-4d39-9763-aa76a1242de5'));
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
                
                id: '98b5a8a9-917f-4902-ba05-79e4e957d62a',
                tenantId: '3587d54b-bd96-4860-be9b-f335d1055b8b',
                tenantCode: 'l3cseqdlvuprxgd9xwe0mkv83go48gxjbwy4b7ianah4qi89bb',
                systemId: '58d5fa8f-7b3b-40bd-832f-78b1643e1cd2',
                systemName: 'xscrjtr71kmw2qv0s6qr',
                executionId: 'a3a4c551-07d6-43fa-9d72-a458f065ecc8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:39:55',
                executionMonitoringStartAt: '2020-07-29 22:11:44',
                executionMonitoringEndAt: '2020-07-29 19:57:51',
                numberMax: 9458815815,
                numberDays: 2134476626,
                success: 7941846699,
                cancelled: 5749042445,
                delivering: 2777193542,
                error: 1872682105,
                holding: 7187570384,
                toBeDelivered: 8877139635,
                waiting: 1323495165,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                tenantCode: 'xgugdcdc2hk657th3kceq4tbg88wgpjtaz965ao16ljo1rpyie',
                systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                systemName: 'm0tyvlvhnnoxr7v6i2ep',
                executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:46:13',
                executionMonitoringStartAt: '2020-07-29 03:29:19',
                executionMonitoringEndAt: '2020-07-29 04:18:38',
                numberMax: 3528273233,
                numberDays: 8728463188,
                success: 5090233465,
                cancelled: 6147884628,
                delivering: 7449360115,
                error: 7948403578,
                holding: 5838380129,
                toBeDelivered: 2262052766,
                waiting: 1840526779,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c4135995-2f23-4d39-9763-aa76a1242de5'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/713ece46-31b9-4719-8454-dbd6a5f4d396')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/c4135995-2f23-4d39-9763-aa76a1242de5')
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
                        id: '256dd605-273a-4862-bce0-e0e325967f52',
                        tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                        tenantCode: 'fwidwo1acj0fwii0jigs7goxfyspxjf6hmf7htn81yekpeya7j',
                        systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                        systemName: 'f80xbh058koqv4993hq8',
                        executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 08:32:21',
                        executionMonitoringStartAt: '2020-07-29 12:11:32',
                        executionMonitoringEndAt: '2020-07-29 22:35:50',
                        numberMax: 7253323261,
                        numberDays: 1512515879,
                        success: 3677841252,
                        cancelled: 6816616910,
                        delivering: 9330515289,
                        error: 7612796382,
                        holding: 1196387410,
                        toBeDelivered: 7078026265,
                        waiting: 7407297503,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', '256dd605-273a-4862-bce0-e0e325967f52');
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
                            value   : 'f6ef9525-3e10-43ee-af3b-4609af4b96b2'
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
                            value   : 'c4135995-2f23-4d39-9763-aa76a1242de5'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('c4135995-2f23-4d39-9763-aa76a1242de5');
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
                    id: '7e7a92ba-5a55-49c2-ac02-e6237db20c2a'
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
                    id: 'c4135995-2f23-4d39-9763-aa76a1242de5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('c4135995-2f23-4d39-9763-aa76a1242de5');
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
                        
                        id: 'bc0a6fa9-ed6c-45e2-8899-4b844c0e52dc',
                        tenantId: '06a8dc90-e6fc-47c2-8d4d-3dec5f16bd90',
                        tenantCode: 'inogcezlpcm812umaaim60a02eky9c51qzn41o4ebfr0jai3bs',
                        systemId: 'baea08e0-27c9-4f07-90d3-0e849d6c8776',
                        systemName: 'xnqxrxuax1q17aa22fbc',
                        executionId: '1f7e8009-01f8-4fed-ac7c-820f05514d5a',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 08:44:38',
                        executionMonitoringStartAt: '2020-07-29 10:46:35',
                        executionMonitoringEndAt: '2020-07-29 02:12:14',
                        numberMax: 3262596553,
                        numberDays: 8595016151,
                        success: 1740054246,
                        cancelled: 7669304604,
                        delivering: 8420303862,
                        error: 9466977068,
                        holding: 4682657198,
                        toBeDelivered: 9823985275,
                        waiting: 3866236195,
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
                        
                        id: 'c4135995-2f23-4d39-9763-aa76a1242de5',
                        tenantId: 'fb9ef9ae-6448-4d30-b5c6-4e065a2e3745',
                        tenantCode: 'oz4nd3rnq23ky7om319w7l9wvonju59e3s33wnmqei2d2c5xtn',
                        systemId: '617c6b46-54b4-4684-917f-9904b6811d39',
                        systemName: '3gbxoirp8zfgk1cea8e0',
                        executionId: '1f7aeafb-fb5c-44be-887c-29287d80d301',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 07:19:36',
                        executionMonitoringStartAt: '2020-07-29 14:03:12',
                        executionMonitoringEndAt: '2020-07-29 09:49:20',
                        numberMax: 4874232254,
                        numberDays: 3118522394,
                        success: 4584663146,
                        cancelled: 4231475005,
                        delivering: 2035829573,
                        error: 5105177971,
                        holding: 2027698528,
                        toBeDelivered: 8137858835,
                        waiting: 2560104703,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('c4135995-2f23-4d39-9763-aa76a1242de5');
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
                    id: '14f52e01-2b7b-4e4b-bf03-84241ba61a95'
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
                    id: 'c4135995-2f23-4d39-9763-aa76a1242de5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('c4135995-2f23-4d39-9763-aa76a1242de5');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});