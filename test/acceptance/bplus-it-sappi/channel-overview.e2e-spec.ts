import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/domain/channel-overview.repository';
import { MockChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/infrastructure/mock/mock-channel-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
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
            .overrideProvider(IChannelOverviewRepository)
            .useClass(MockChannelOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelOverviewRepository>module.get<IChannelOverviewRepository>(IChannelOverviewRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'mbmtzw6c7uwwteoeq1wcmc793nxuv0bg5ppnpkk6ov73x8yap5',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '8kvlu6sv2mw53hlbekw0',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 08:41:49',
                executionMonitoringStartAt: '2020-07-27 19:05:21',
                executionMonitoringEndAt: '2020-07-27 14:03:25',
                error: 5424361158,
                inactive: 6801171246,
                successful: 8007696045,
                stopped: 6095526520,
                unknown: 2702568012,
                unregistered: 1311057557,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'x15as4421oy925dgnfvw5s0zc5a0o5ym3hr9x77hfvbeylo5b3',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'x3gqlpzqfomxah9bejt9',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 02:50:21',
                executionMonitoringStartAt: '2020-07-28 07:49:37',
                executionMonitoringEndAt: '2020-07-27 15:52:15',
                error: 2629053268,
                inactive: 1555123061,
                successful: 1934377798,
                stopped: 2086971689,
                unknown: 6246369255,
                unregistered: 3357864267,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: null,
                tenantCode: 'tff6rbtcrqca0i5whsyijiuci5o5ov0kc41880box3047kf9wr',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'dgl5v1vut1vyrrlhgfxp',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 22:53:41',
                executionMonitoringStartAt: '2020-07-28 07:25:48',
                executionMonitoringEndAt: '2020-07-27 14:48:54',
                error: 6733968942,
                inactive: 8858972653,
                successful: 4654626841,
                stopped: 4965366847,
                unknown: 7063963601,
                unregistered: 6318301519,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                
                tenantCode: '9h7ixx7f9154g7hgh2i4zf301obo0lacdajv094mzjx8ofqdku',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '9wxzdwa0zqvw6r2y71cm',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 07:14:18',
                executionMonitoringStartAt: '2020-07-27 16:52:28',
                executionMonitoringEndAt: '2020-07-28 02:30:44',
                error: 9065467825,
                inactive: 7895269145,
                successful: 9019826166,
                stopped: 7139807702,
                unknown: 8732442272,
                unregistered: 1914232482,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: null,
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'hrdguwpjt2cxflt6ck70',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:07:21',
                executionMonitoringStartAt: '2020-07-28 06:00:11',
                executionMonitoringEndAt: '2020-07-28 00:25:47',
                error: 3678342366,
                inactive: 1582003530,
                successful: 7792940681,
                stopped: 6485585538,
                unknown: 2133516001,
                unregistered: 2230786990,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'sjv2ckrts8hw7bclxj6x',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 07:27:35',
                executionMonitoringStartAt: '2020-07-27 13:00:36',
                executionMonitoringEndAt: '2020-07-28 05:01:03',
                error: 7924029232,
                inactive: 4385827937,
                successful: 7765719240,
                stopped: 7380466788,
                unknown: 1452846442,
                unregistered: 3064296199,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: '4gicg4wapy7ksd4ku860mkktc96bihm2zw919jezwak8php5y6',
                systemId: null,
                systemName: 'iycyyr7wc9nze3pl3mk4',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 06:04:09',
                executionMonitoringStartAt: '2020-07-28 00:19:47',
                executionMonitoringEndAt: '2020-07-27 22:25:38',
                error: 1861673436,
                inactive: 3632749242,
                successful: 1822667069,
                stopped: 5535759061,
                unknown: 7832049126,
                unregistered: 8616780100,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'czgxayh7gfhj9whlk2pwss9o7t7fp948u0y1y77hwpggj3ye9c',
                
                systemName: 'qux2uw1zorw1050jtgjj',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:24:47',
                executionMonitoringStartAt: '2020-07-28 01:18:43',
                executionMonitoringEndAt: '2020-07-27 17:15:14',
                error: 2325531886,
                inactive: 9560441192,
                successful: 8214396713,
                stopped: 2068770305,
                unknown: 5929137748,
                unregistered: 7137842909,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 's6jwwf969cm4atjvdcni3v325289spz1wp0ivdqlslsyqdywnv',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: null,
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:24:25',
                executionMonitoringStartAt: '2020-07-28 09:21:46',
                executionMonitoringEndAt: '2020-07-27 23:19:58',
                error: 8353859185,
                inactive: 5701754368,
                successful: 4905231129,
                stopped: 2899765581,
                unknown: 2941486343,
                unregistered: 4168114090,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'h46q3mvz7r3p5iscry9ttcsvz6i0xwg5al0gv1f9kgpduahdqn',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 09:58:07',
                executionMonitoringStartAt: '2020-07-27 18:39:19',
                executionMonitoringEndAt: '2020-07-28 05:09:42',
                error: 5960685482,
                inactive: 9118405906,
                successful: 7918095846,
                stopped: 4034455429,
                unknown: 3999372485,
                unregistered: 3735858889,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'aw7c61n9esqkun88pmf38alkh63139yjfsi9brid38bcqvbw4s',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'ptz5upvjs8zc03oookhk',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:13:48',
                executionMonitoringStartAt: '2020-07-27 13:55:38',
                executionMonitoringEndAt: '2020-07-27 20:00:05',
                error: 5318355052,
                inactive: 1928573341,
                successful: 8099647039,
                stopped: 4418364558,
                unknown: 5037771542,
                unregistered: 4259274815,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: '1t5rhks73b51veuj52eipsjtzgr6kcsbpi68yt3b5i413q9q1e',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'aa0wlw1cz7jg047i0c65',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 03:31:55',
                executionMonitoringStartAt: '2020-07-27 20:03:15',
                executionMonitoringEndAt: '2020-07-28 07:34:42',
                error: 7462744447,
                inactive: 1412914470,
                successful: 3522234541,
                stopped: 3962241393,
                unknown: 7836712404,
                unregistered: 3521708651,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'epvueq8drgb2wsjhdcu4oumb66z7d7rhwlar4w94kysizilczy',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '8yvgoss3ljpdk2n6mhmv',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: null,
                executionExecutedAt: '2020-07-28 00:01:12',
                executionMonitoringStartAt: '2020-07-27 13:14:28',
                executionMonitoringEndAt: '2020-07-27 22:58:31',
                error: 1302346702,
                inactive: 1631946007,
                successful: 8040167612,
                stopped: 4649531328,
                unknown: 1813832341,
                unregistered: 9775532940,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'orquiqyk5g662ba4uou0vajjf0qdmche4ejbz1hhxo6ft081nq',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'u7iw7t51wnasjgkwmi6t',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                
                executionExecutedAt: '2020-07-28 08:59:55',
                executionMonitoringStartAt: '2020-07-28 01:21:09',
                executionMonitoringEndAt: '2020-07-27 12:40:32',
                error: 4140509184,
                inactive: 1285127036,
                successful: 2970530355,
                stopped: 7628068440,
                unknown: 1730223425,
                unregistered: 8725383648,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: '9l88azu496b68g327nqm0n3ewmqbmkjk9fkami2uk9u18rkv1d',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '6mi520n8bj5h0wvlrv92',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 14:27:22',
                executionMonitoringEndAt: '2020-07-28 10:55:28',
                error: 8559995490,
                inactive: 6390045119,
                successful: 6054605460,
                stopped: 6228405902,
                unknown: 5025984373,
                unregistered: 6392006746,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: '5e4bc7bnyupxociuy8ik9a3wg9hzuisub3pjza7om3wvgflswu',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'qi0nv4ucd7j5044liqha',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-28 08:51:38',
                executionMonitoringEndAt: '2020-07-27 18:45:14',
                error: 1380510228,
                inactive: 7132904976,
                successful: 8422548318,
                stopped: 3406453491,
                unknown: 9835971569,
                unregistered: 8164343847,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: '3b1fmtf7bcpqtvrnxqzhhp2ikrk7fg61vl6m4zlajc3h9ppqb3',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'mxjwebmd7kzp5aiu79jf',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 02:14:26',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 04:53:46',
                error: 5897773841,
                inactive: 8924575579,
                successful: 2049829985,
                stopped: 8268125743,
                unknown: 7904235697,
                unregistered: 9355675356,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: '6loizond1e8xyw8t0mc8xtmbofhawqngattkmumk5n83qk7y6r',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '7nphnoz7ygloqdzzh0br',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 20:36:11',
                
                executionMonitoringEndAt: '2020-07-27 22:27:25',
                error: 9317309900,
                inactive: 9286305122,
                successful: 3681320983,
                stopped: 6625474247,
                unknown: 2640418392,
                unregistered: 9622867984,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'f0f47npds6ml8cjv7tizgsyhw4m8u7pqf2ous6xzf0f60ynhe7',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '8875wqszlb91bogzkuzk',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:56:27',
                executionMonitoringStartAt: '2020-07-28 05:32:28',
                executionMonitoringEndAt: null,
                error: 7362385095,
                inactive: 9944887677,
                successful: 6237025835,
                stopped: 5713351406,
                unknown: 1603014246,
                unregistered: 3565923317,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: '8np4uqa5z5rtr7mcx5a6xgzyjmrccpin9r9n9yt31oq42qvu6j',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '2thbdeai2zuyuh2vwj4m',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 05:25:26',
                executionMonitoringStartAt: '2020-07-27 12:38:31',
                
                error: 1240714856,
                inactive: 9502277118,
                successful: 5740069985,
                stopped: 2774484329,
                unknown: 4610423730,
                unregistered: 9533013087,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'p4eib9izci50evob6hfs7ekkxvinnyuh2bpbq',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'prcnr89ca2pmhjeqft1xxcloup0nqnpvesszrb1s5k2kflpt4p',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'ovxtwww2moq7t52l6o23',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 01:32:20',
                executionMonitoringStartAt: '2020-07-27 15:29:30',
                executionMonitoringEndAt: '2020-07-28 06:05:47',
                error: 1179576701,
                inactive: 8093145385,
                successful: 6843311877,
                stopped: 8074961049,
                unknown: 8211248361,
                unregistered: 2546068392,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: 'a0erh1rksr82p9fqnt0r7olokfglc20ytclet',
                tenantCode: 'j05wf4bwcorpnp94xh1pwnus0b8pjwdq938jpuf7fidty7pnwy',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '737j7ubawksv0yp6jyr8',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:53:42',
                executionMonitoringStartAt: '2020-07-28 05:45:15',
                executionMonitoringEndAt: '2020-07-27 22:36:34',
                error: 4782015828,
                inactive: 6746182888,
                successful: 9222104807,
                stopped: 6794664667,
                unknown: 9736844942,
                unregistered: 9886448817,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'k08lvq8gzz1mg6r1zdx3qmf7otham5z6cbw67nwts6n6cq1h9h',
                systemId: '5cgtvb6n80yimsgik3rztmsyk84obz9s1dbj5',
                systemName: 'jbhjz2zraxr0fy58ghgl',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 10:18:23',
                executionMonitoringStartAt: '2020-07-27 23:49:23',
                executionMonitoringEndAt: '2020-07-28 03:52:29',
                error: 3037255156,
                inactive: 7232030600,
                successful: 5420268608,
                stopped: 5257651376,
                unknown: 1752085044,
                unregistered: 4718437105,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'jkhfl8ku5unavhsu5v7w2l1hgvzmlkigmb3eswc7nvqs4pp9al',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'xmfmnzn812q5d8xexddk',
                executionId: '9s8u3ckbcaus8vwnewkiirahe8r9nah6qi937',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 17:14:54',
                executionMonitoringStartAt: '2020-07-28 00:47:48',
                executionMonitoringEndAt: '2020-07-27 13:20:02',
                error: 6998077927,
                inactive: 4688789260,
                successful: 8482398724,
                stopped: 9950282853,
                unknown: 6102184604,
                unregistered: 7660552431,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'pu4jym0y6t8oxq0mjztasj8ty7cd8e6od6tufziuc35plfdt7yd',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '3ctfzbos998l5sfjq9r8',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 19:38:57',
                executionMonitoringStartAt: '2020-07-27 17:50:32',
                executionMonitoringEndAt: '2020-07-27 18:51:10',
                error: 6262285059,
                inactive: 7326726167,
                successful: 6881010954,
                stopped: 6813508540,
                unknown: 1437925398,
                unregistered: 8151896173,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'bwcdofogbh9vl92kiydai2aoh06padpsqgw74rrbcdrqw7zvu0',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'wcwqmmixrlfswhpaqz3ge',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:34:02',
                executionMonitoringStartAt: '2020-07-28 01:48:50',
                executionMonitoringEndAt: '2020-07-27 21:41:04',
                error: 8829459355,
                inactive: 6668798698,
                successful: 1132340713,
                stopped: 9237667149,
                unknown: 3175933297,
                unregistered: 9205870057,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'pcszt1coffpp2rjodsdp86p6633tsdin07m7g9izyu28ll769f',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'db91t2k9v9bxk6cpkt1e',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 20:46:47',
                executionMonitoringStartAt: '2020-07-27 11:35:40',
                executionMonitoringEndAt: '2020-07-28 09:37:36',
                error: 76127925191,
                inactive: 8290754100,
                successful: 7680480149,
                stopped: 8315623840,
                unknown: 7076915484,
                unregistered: 7847656808,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewError is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewInactive is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'ophnq99qc5k4kf37oaif54z9264k9cqv42mxoouu3d0hfyfv8d',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '4b4xefymuhcxuvgixn01',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 07:39:01',
                executionMonitoringStartAt: '2020-07-28 10:15:29',
                executionMonitoringEndAt: '2020-07-27 13:43:32',
                error: 4122058028,
                inactive: 49135049547,
                successful: 1160045480,
                stopped: 7381480433,
                unknown: 1417644330,
                unregistered: 6579395074,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewInactive is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'ld2vhs7x6wax1uwfln1kshqdwn01xtqzaqmcxlnswdye193vjx',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'w5ntni1mr2pjohdnq6b0',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 01:08:42',
                executionMonitoringStartAt: '2020-07-28 02:22:25',
                executionMonitoringEndAt: '2020-07-27 20:16:40',
                error: 6941110486,
                inactive: 5022494134,
                successful: 20286752015,
                stopped: 4568761751,
                unknown: 2241703297,
                unregistered: 7774980512,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSuccessful is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewStopped is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'icbiciajf7njakwajpi2rjtaaic9gg0jh8cacy33sv4vd1mqip',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '96bqpp0ji8h96gdmaxui',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 02:50:41',
                executionMonitoringStartAt: '2020-07-27 21:09:09',
                executionMonitoringEndAt: '2020-07-27 11:48:22',
                error: 9775480056,
                inactive: 1336644492,
                successful: 3170643953,
                stopped: 21558894790,
                unknown: 9053739157,
                unregistered: 3301215727,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewStopped is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnknown is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'f0pfiopt5udr3x2omsgir2v87fsysxe4xuiictsquqs0x6wj09',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'pkd8fxbjwl7ggl7l89bk',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 21:13:14',
                executionMonitoringStartAt: '2020-07-27 11:41:27',
                executionMonitoringEndAt: '2020-07-28 03:58:49',
                error: 7392262544,
                inactive: 3309631202,
                successful: 8017721155,
                stopped: 7441374507,
                unknown: 67118947998,
                unregistered: 9185208643,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnknown is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'bcsyzon4j1sshjxqs11ok9oq1o7pe3dldnzuchq90laearesuo',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'vik9uk6gg7twzjkmbof3',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 08:16:24',
                executionMonitoringStartAt: '2020-07-27 20:57:42',
                executionMonitoringEndAt: '2020-07-27 12:18:03',
                error: 1330118355,
                inactive: 7812625314,
                successful: 8390995494,
                stopped: 6900532285,
                unknown: 8489544708,
                unregistered: 76730504369,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnregistered is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'nd8hs0beq4hk00q9kj0gh6x3zphbz1kd96o5jzbd4ig8abmd2x',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'bjh52x7yztsnn1pwcuvq',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 05:25:07',
                executionMonitoringStartAt: '2020-07-27 17:28:48',
                executionMonitoringEndAt: '2020-07-27 18:55:28',
                error: -9,
                inactive: 6667892542,
                successful: 6385070839,
                stopped: 7550358364,
                unknown: 4693010523,
                unregistered: 8822031791,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewInactive must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'yodduan8tgf5b6ujn23bxl2toiexmthz4jcfwsmt8g1hss0yav',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '56oq0n8d3ugu5rhhqn6i',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 00:21:20',
                executionMonitoringStartAt: '2020-07-27 13:09:22',
                executionMonitoringEndAt: '2020-07-27 15:02:26',
                error: 3483059041,
                inactive: -9,
                successful: 5698675537,
                stopped: 7930113579,
                unknown: 4428496261,
                unregistered: 1525007723,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewInactive must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: '08fk64a7zujiioaz9rgd91iinecf99vr1ohidhejdwgeg8k7yl',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '7gu7q7c13m72tgelvfgr',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:54:08',
                executionMonitoringStartAt: '2020-07-28 06:13:51',
                executionMonitoringEndAt: '2020-07-27 18:58:14',
                error: 2788363452,
                inactive: 8045268354,
                successful: -9,
                stopped: 8407586623,
                unknown: 5090054855,
                unregistered: 4933080562,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewSuccessful must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewStopped must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'g6gs36ch1u3bgec3wjkjtzj89kvijzjhja29yslrfxvbxe3ex8',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '1w1c8et5zmyulk06wskz',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:19:48',
                executionMonitoringStartAt: '2020-07-27 20:17:04',
                executionMonitoringEndAt: '2020-07-28 05:15:32',
                error: 5171580431,
                inactive: 8706448423,
                successful: 7491430848,
                stopped: -9,
                unknown: 4697426244,
                unregistered: 7852567754,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewStopped must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnknown must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'xmt4kaxrvmtc6kq24zu1eqm523fsb94y5ofjg7hi2t86hz8pbq',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'z4genk9udy5zg9xnqe6g',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:32:21',
                executionMonitoringStartAt: '2020-07-27 20:35:57',
                executionMonitoringEndAt: '2020-07-28 03:09:47',
                error: 6321484805,
                inactive: 3534560076,
                successful: 7191780199,
                stopped: 6443023261,
                unknown: -9,
                unregistered: 3089938714,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnknown must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: '67rxi1v2iqmftd42jcoaahjeeihdnq31fv3efozokke05cg8x2',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '0wlj8fq2ewh05i79zmr3',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 01:03:48',
                executionMonitoringStartAt: '2020-07-27 20:00:22',
                executionMonitoringEndAt: '2020-07-28 03:23:02',
                error: 4290753703,
                inactive: 2871636151,
                successful: 1220072495,
                stopped: 3978677230,
                unknown: 8337676832,
                unregistered: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnregistered must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'cligbcqfgfzhe055i7h6m8881zftlmy09b24nev1lg2mk7u3dr',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'e2p0zcd04anki0j5mkbn',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 22:50:16',
                executionMonitoringStartAt: '2020-07-28 09:38:37',
                executionMonitoringEndAt: '2020-07-27 22:51:21',
                error: 6738279506,
                inactive: 5435141024,
                successful: 9974303508,
                stopped: 9085781280,
                unknown: 3922226260,
                unregistered: 4349913741,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'nuzootj507buke93n2u44ka25zmusbojvr8h7xmxp716mb05pn',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'l2mdz1hwahjow0c0w2ir',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-28 05:22:49',
                executionMonitoringEndAt: '2020-07-27 16:04:01',
                error: 9643236526,
                inactive: 5795441063,
                successful: 1334011684,
                stopped: 4584784033,
                unknown: 6388267114,
                unregistered: 2286462270,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: 'nwvttys9mz38rlkmvpdw449bkataz97k89zdoyj7zwx5ynp97q',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'xtdql7ps5vg857ne1oex',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:07:49',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 12:34:48',
                error: 6565530485,
                inactive: 1690850240,
                successful: 3682888962,
                stopped: 7280456703,
                unknown: 6821937825,
                unregistered: 7782075832,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: '2lgosra1zzv4d2hycoj6655795hvhcage3u4flyznednvt80zr',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'hus2zsu235wlcvn5f8hq',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 08:28:11',
                executionMonitoringStartAt: '2020-07-27 22:13:09',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 5374020985,
                inactive: 2270382074,
                successful: 4963191442,
                stopped: 3884351042,
                unknown: 8495323622,
                unregistered: 2161060314,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: '9uvn889ivq7aa050looz37hfa1mai1aotro1ai9k2tcbzdx1bp',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: 'yiywyynr8jaw8tj4q1lz',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:39:10',
                executionMonitoringStartAt: '2020-07-27 12:25:58',
                executionMonitoringEndAt: '2020-07-27 11:48:17',
                error: 7451149999,
                inactive: 2844566478,
                successful: 5068104203,
                stopped: 2416378488,
                unknown: 6469383330,
                unregistered: 4575269644,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/channels-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-overview/paginate')
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

    test(`/REST:GET bplus-it-sappi/channel-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview')
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

    test(`/REST:GET bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '44a630fe-165b-4e3e-82b7-04092f547953'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '44a630fe-165b-4e3e-82b7-04092f547953'));
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/44a630fe-165b-4e3e-82b7-04092f547953')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '44a630fe-165b-4e3e-82b7-04092f547953'));
    });

    test(`/REST:GET bplus-it-sappi/channels-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '986a3fdd-b5db-4568-95a3-08f6df81db56',
                tenantId: '3b317de3-520d-4d03-b40a-52278aa41f06',
                tenantCode: '4ubyu1am53bsug1wn4sn15nljvkjr2kydd4jql5xtyu20tffwg',
                systemId: 'd34dfa81-d429-43ae-a9ae-78f478cdbb98',
                systemName: '5062oh1tjxof3ljoxfmp',
                executionId: 'e15ab8cb-4da2-43c0-a363-a9c1edd2c14e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 09:37:44',
                executionMonitoringStartAt: '2020-07-28 06:41:08',
                executionMonitoringEndAt: '2020-07-27 14:20:12',
                error: 1145072047,
                inactive: 9100589839,
                successful: 6450683744,
                stopped: 4808913899,
                unknown: 4726263830,
                unregistered: 2287264128,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '44a630fe-165b-4e3e-82b7-04092f547953',
                tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                tenantCode: '6wquuunu1288p397j5ld49y1g32283pq96yv5rop0ls76x37gu',
                systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                systemName: '8xbfnj7po5dnmu8zpthk',
                executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 23:53:58',
                executionMonitoringStartAt: '2020-07-28 09:35:36',
                executionMonitoringEndAt: '2020-07-28 03:52:17',
                error: 4483181202,
                inactive: 5764624729,
                successful: 4151995498,
                stopped: 6080234022,
                unknown: 5156905498,
                unregistered: 3592116493,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '44a630fe-165b-4e3e-82b7-04092f547953'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/44a630fe-165b-4e3e-82b7-04092f547953')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateChannelOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelOverviewInput!)
                    {
                        bplusItSappiCreateChannelOverview (payload:$payload)
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

    test(`/GraphQL bplusItSappiCreateChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelOverviewInput!)
                    {
                        bplusItSappiCreateChannelOverview (payload:$payload)
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
                        id: 'b66955ce-6db7-4eff-a1ad-836a578bd215',
                        tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                        tenantCode: 'rxwcksyn7dwwe81gl8zvtcr3oepvk28snj42dr2oi3llxseeln',
                        systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                        systemName: 'ndy69as5d5wrkgh6bd9u',
                        executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 04:45:12',
                        executionMonitoringStartAt: '2020-07-27 18:10:55',
                        executionMonitoringEndAt: '2020-07-28 01:31:19',
                        error: 3160915931,
                        inactive: 4375529707,
                        successful: 3826064522,
                        stopped: 7170527651,
                        unknown: 7838055033,
                        unregistered: 2444183158,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', 'b66955ce-6db7-4eff-a1ad-836a578bd215');
            });
    });

    test(`/GraphQL bplusItSappiPaginateChannelsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateChannelsOverview (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateChannelsOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindChannelOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelOverview (query:$query)
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

    test(`/GraphQL bplusItSappiFindChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelOverview (query:$query)
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '44a630fe-165b-4e3e-82b7-04092f547953'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('44a630fe-165b-4e3e-82b7-04092f547953');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelOverviewById (id:$id)
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

    test(`/GraphQL bplusItSappiFindChannelOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelOverviewById (id:$id)
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
                    id: '44a630fe-165b-4e3e-82b7-04092f547953'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('44a630fe-165b-4e3e-82b7-04092f547953');
            });
    });

    test(`/GraphQL bplusItSappiGetChannelsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetChannelsOverview (query:$query)
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
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetChannelsOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateChannelOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelOverviewInput!)
                    {
                        bplusItSappiUpdateChannelOverview (payload:$payload)
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
                        
                        id: '6f4e7579-01d8-497d-bfdf-c161da7e1237',
                        tenantId: 'b50997c6-6aac-410b-93ba-4085ece34ff1',
                        tenantCode: 'xe9czdvdugxspbd2e823xcv6ddxs7k5860d51pjebu10qqs4t6',
                        systemId: 'bc562db7-fcd3-4f2c-8f1f-16b885594a57',
                        systemName: 'yt7atbrc7h9obp8fx2x4',
                        executionId: '75e693f4-c46d-4de2-948f-24ccd5ed9595',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 18:01:44',
                        executionMonitoringStartAt: '2020-07-28 04:58:53',
                        executionMonitoringEndAt: '2020-07-28 03:27:20',
                        error: 4933028676,
                        inactive: 1928083154,
                        successful: 4942721748,
                        stopped: 6125996451,
                        unknown: 3393101910,
                        unregistered: 5474831938,
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

    test(`/GraphQL bplusItSappiUpdateChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelOverviewInput!)
                    {
                        bplusItSappiUpdateChannelOverview (payload:$payload)
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
                        
                        id: '44a630fe-165b-4e3e-82b7-04092f547953',
                        tenantId: '31824088-62a2-4e81-9c5b-b73cb3b9875c',
                        tenantCode: 'iy1yktaxm9r9ap1gmszk7rvr8xvo2t8u6cu1sydgw1c56he373',
                        systemId: '877f28ad-2133-4cf8-8153-d2e755958c90',
                        systemName: 'hy3taiv5wbreiwm5vzta',
                        executionId: 'a051a225-acd5-4d95-9a8a-63825384d7ad',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 09:02:05',
                        executionMonitoringStartAt: '2020-07-27 14:48:00',
                        executionMonitoringEndAt: '2020-07-27 23:14:33',
                        error: 7862914566,
                        inactive: 6658190502,
                        successful: 7187197229,
                        stopped: 4438919651,
                        unknown: 8888714865,
                        unregistered: 4043769444,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('44a630fe-165b-4e3e-82b7-04092f547953');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelOverviewById (id:$id)
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

    test(`/GraphQL bplusItSappiDeleteChannelOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelOverviewById (id:$id)
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
                    id: '44a630fe-165b-4e3e-82b7-04092f547953'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('44a630fe-165b-4e3e-82b7-04092f547953');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});