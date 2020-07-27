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
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'urqs835hgnauklc3huppl680cxlbrzho7j53h0qyf5m56de6m7',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'fu4owawnwy16xbb0j1s7',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:37:18',
                executionMonitoringStartAt: '2020-07-26 23:12:41',
                executionMonitoringEndAt: '2020-07-27 10:50:58',
                numberMax: 8129396612,
                numberDays: 9255833876,
                success: 8557683906,
                cancelled: 6965114385,
                delivering: 9896319220,
                error: 6311133012,
                holding: 6164312333,
                toBeDelivered: 4054852953,
                waiting: 2912929954,
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
                
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'rac7up09c9nivylkebhg860md9lwwktmy4s65es6g1eiehxus4',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'he8u4ij6q95n2o08mu9u',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:04:39',
                executionMonitoringStartAt: '2020-07-26 21:48:36',
                executionMonitoringEndAt: '2020-07-27 07:49:36',
                numberMax: 9093994824,
                numberDays: 3089348788,
                success: 9036375883,
                cancelled: 8375032007,
                delivering: 9988325731,
                error: 9505671961,
                holding: 4228185892,
                toBeDelivered: 4660943605,
                waiting: 2132955514,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: null,
                tenantCode: '1tmv3ufpi8rcy6dtf63vhtp6nkqpkp95s9ooeb7loemxot77np',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: '5geg5vumg920ammxpb9k',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:39:45',
                executionMonitoringStartAt: '2020-07-27 00:34:26',
                executionMonitoringEndAt: '2020-07-27 00:40:36',
                numberMax: 5946828173,
                numberDays: 4600964741,
                success: 8679544414,
                cancelled: 7459605861,
                delivering: 6262052027,
                error: 5689367876,
                holding: 1785833996,
                toBeDelivered: 6472109331,
                waiting: 4813636532,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                
                tenantCode: 'e4zbhldwlyogz68w1eolgwom8qg1lx474jd1fcv2jngbfervl5',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'o826ia1l4imge0r5lf3w',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 02:36:41',
                executionMonitoringStartAt: '2020-07-27 04:46:40',
                executionMonitoringEndAt: '2020-07-27 06:22:16',
                numberMax: 1442501778,
                numberDays: 8379928874,
                success: 9077596067,
                cancelled: 1786564375,
                delivering: 4306636584,
                error: 7977296352,
                holding: 3561266939,
                toBeDelivered: 6362191889,
                waiting: 1083209441,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: null,
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'eo1vioxqadva8kfw8rzz',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:32:04',
                executionMonitoringStartAt: '2020-07-27 05:57:00',
                executionMonitoringEndAt: '2020-07-27 16:31:28',
                numberMax: 7622195415,
                numberDays: 8904236817,
                success: 3581603738,
                cancelled: 6183760770,
                delivering: 1339772396,
                error: 6216722788,
                holding: 2630971588,
                toBeDelivered: 4837380476,
                waiting: 3344659455,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'xgtvfrcgtlfrvut5ohco',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 18:48:57',
                executionMonitoringStartAt: '2020-07-27 10:56:34',
                executionMonitoringEndAt: '2020-07-27 00:54:55',
                numberMax: 8334241108,
                numberDays: 8150862426,
                success: 2778560096,
                cancelled: 3959053410,
                delivering: 6657025333,
                error: 5669002168,
                holding: 7375571741,
                toBeDelivered: 8694566639,
                waiting: 5328846183,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'bbaa9e732vl4gnwa5bz2t1xwpythjh3d7n0zmtb8wpfhv1mzuk',
                systemId: null,
                systemName: 'jd299ap126osi8lq5l49',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:24:58',
                executionMonitoringStartAt: '2020-07-27 07:05:14',
                executionMonitoringEndAt: '2020-07-27 16:11:13',
                numberMax: 2969419711,
                numberDays: 2921264429,
                success: 7631383807,
                cancelled: 4551816511,
                delivering: 6016100294,
                error: 8367916828,
                holding: 4896606177,
                toBeDelivered: 7825106669,
                waiting: 1684632508,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: '1bv525dicekk5d38e12mju3k1ae1cwdkegdmad22946cetv1yc',
                
                systemName: '6hz9bwcan8o5m16hj8ax',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 23:55:30',
                executionMonitoringStartAt: '2020-07-27 16:21:31',
                executionMonitoringEndAt: '2020-07-27 00:35:00',
                numberMax: 9676787592,
                numberDays: 2853354761,
                success: 7179901225,
                cancelled: 7240647615,
                delivering: 4027484720,
                error: 8121842334,
                holding: 7901127829,
                toBeDelivered: 5160448937,
                waiting: 7942214035,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: '4mohe4uz6ljstow27tl1oi8xjz583jlb9lhnnrze43iflmrodm',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: null,
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:04:45',
                executionMonitoringStartAt: '2020-07-27 13:46:04',
                executionMonitoringEndAt: '2020-07-27 12:00:00',
                numberMax: 7527522774,
                numberDays: 7899900829,
                success: 7725211840,
                cancelled: 1567195387,
                delivering: 4932110955,
                error: 5405833344,
                holding: 4890741034,
                toBeDelivered: 8367703894,
                waiting: 3317577714,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'w6mckht6vsw4zmykuufrtmrgo272xyl1jetlpohbd1q3fmhxyc',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 22:55:58',
                executionMonitoringStartAt: '2020-07-26 22:35:13',
                executionMonitoringEndAt: '2020-07-27 10:19:35',
                numberMax: 4938568451,
                numberDays: 4411928824,
                success: 9533220410,
                cancelled: 7574326208,
                delivering: 7275443176,
                error: 6315472671,
                holding: 7853082553,
                toBeDelivered: 8823361623,
                waiting: 7841977100,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: '84ip8oi7fw3iahowvds39p95ru3e6wj9zbloj9t1kfr5oc4jb0',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: '5c9rdumbfibmk4elyf0g',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 21:28:17',
                executionMonitoringStartAt: '2020-07-27 13:03:34',
                executionMonitoringEndAt: '2020-07-27 06:15:42',
                numberMax: 6531658701,
                numberDays: 4324389374,
                success: 1946440891,
                cancelled: 2308598687,
                delivering: 6865557239,
                error: 7695802469,
                holding: 1158253668,
                toBeDelivered: 5204108145,
                waiting: 1947738614,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'qjy85f430elj9px013p078kg8qkxwel13c9up941t0crlpjoq5',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'a0tswkzkupxo2yshh0px',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:17:30',
                executionMonitoringStartAt: '2020-07-26 22:18:59',
                executionMonitoringEndAt: '2020-07-27 04:37:34',
                numberMax: 3428346658,
                numberDays: 7414322985,
                success: 1731217282,
                cancelled: 2923801088,
                delivering: 1592812392,
                error: 5976604586,
                holding: 4481983654,
                toBeDelivered: 9659732922,
                waiting: 5359041260,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'w8y11wf9j4nhxtg0zahtkf51rxw40zzoarv4bqj0qf9lwyzg17',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: '1zcbbrr3h70jocqkyq6j',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: null,
                executionExecutedAt: '2020-07-27 09:04:57',
                executionMonitoringStartAt: '2020-07-27 00:58:59',
                executionMonitoringEndAt: '2020-07-27 09:02:24',
                numberMax: 1847839386,
                numberDays: 8508032728,
                success: 9287400524,
                cancelled: 4084983912,
                delivering: 6857606642,
                error: 4504725118,
                holding: 2859813630,
                toBeDelivered: 5786600334,
                waiting: 4077954920,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'kay5pox7o08hyuwuujifo2a6qxklt5b1vi7epb29933ni78mr8',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: '63txmor95o7lakg7ypvy',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                
                executionExecutedAt: '2020-07-27 06:05:48',
                executionMonitoringStartAt: '2020-07-27 08:05:25',
                executionMonitoringEndAt: '2020-07-27 07:53:20',
                numberMax: 2417405810,
                numberDays: 4098330307,
                success: 3123647889,
                cancelled: 7878895867,
                delivering: 9192875123,
                error: 7816021951,
                holding: 8708362885,
                toBeDelivered: 9210648363,
                waiting: 7286747634,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'fs1m6188q71q79h7khldfuny9l6gs4zjncrcyiktog48n9db1j',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'araf4s8dscgupmym2kqw',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 16:12:23',
                executionMonitoringEndAt: '2020-07-26 23:56:00',
                numberMax: 8753878908,
                numberDays: 5398057371,
                success: 3454851987,
                cancelled: 4142724327,
                delivering: 4022636363,
                error: 2005712576,
                holding: 4153754677,
                toBeDelivered: 4934340891,
                waiting: 7000082912,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'y1g0j94kfml03kw3qb7g4116ly40texlbtulsrr3cnac86vubd',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'f0v5i8weotxqj7nc892g',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-26 21:57:13',
                executionMonitoringEndAt: '2020-07-27 14:11:43',
                numberMax: 1142273766,
                numberDays: 4178118388,
                success: 2009393853,
                cancelled: 2199968165,
                delivering: 7298566577,
                error: 8451004189,
                holding: 4091438167,
                toBeDelivered: 3357843875,
                waiting: 9447127943,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'ce2wxevamcn6m32ey7mar4ikbf6iezmbkmuhgcusztbyjqbtea',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: '0597j5rcxmvpevmw5w5q',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:13:30',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 12:42:36',
                numberMax: 1574090262,
                numberDays: 3258288882,
                success: 3807970418,
                cancelled: 7773485217,
                delivering: 1913772379,
                error: 4286190467,
                holding: 6014140618,
                toBeDelivered: 2254778081,
                waiting: 2294120293,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'net3zknd9v5yjvmwqztvvi7sztnj83iycso8rf3slsok0yf4en',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'o39ltd2rilfxy5dsyjz6',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 18:16:11',
                
                executionMonitoringEndAt: '2020-07-27 00:03:07',
                numberMax: 7864140553,
                numberDays: 7488741438,
                success: 6294916550,
                cancelled: 2446881205,
                delivering: 9477675529,
                error: 9824331549,
                holding: 1709919697,
                toBeDelivered: 8574011323,
                waiting: 5418269599,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'oygjz04v4qn35ge7zgk277oq9j749nf3p4gqxmwhnue1t5riuh',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'wkr8gzyxnqgxg7gccvcj',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:29:55',
                executionMonitoringStartAt: '2020-07-27 04:56:33',
                executionMonitoringEndAt: null,
                numberMax: 7326402544,
                numberDays: 1056608289,
                success: 1972418423,
                cancelled: 6257358795,
                delivering: 5558198636,
                error: 4233470893,
                holding: 9405505761,
                toBeDelivered: 6036331546,
                waiting: 4545957584,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 's694fhyellr2fohontfdbfx570f6rptvyf8g1rkjfk8a1t99qp',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'qy8je9es5ryhy4dlzqtq',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 23:30:26',
                executionMonitoringStartAt: '2020-07-26 17:53:27',
                
                numberMax: 4457645973,
                numberDays: 4249591282,
                success: 3287407692,
                cancelled: 5571133924,
                delivering: 9528857319,
                error: 8259875855,
                holding: 4107146445,
                toBeDelivered: 6773022745,
                waiting: 2506642763,
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
                id: '3u4oigdtmphgwjm4xfwvmnn0bkgeaerhax9qo',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: '1a6idjeb7sdjmk5cw7gitsh1r3584vf8fszppty6funstf5erp',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: '9imsef8b4xpoitcc8ci9',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 02:20:21',
                executionMonitoringStartAt: '2020-07-26 20:26:30',
                executionMonitoringEndAt: '2020-07-27 01:35:43',
                numberMax: 9263103469,
                numberDays: 2976725427,
                success: 2194917623,
                cancelled: 3325770643,
                delivering: 2401194651,
                error: 7891142574,
                holding: 8401376811,
                toBeDelivered: 7556979304,
                waiting: 6953231310,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '88axl0sbjko9fbdxu6f2cqe5qmuf9u2cuo0vc',
                tenantCode: '8ujbdjyxwpiari50y639g1600ixmjtrx23g65pu3uur6iudh4z',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: '2dug3c4gludgmvbrk4sr',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 20:08:23',
                executionMonitoringStartAt: '2020-07-27 14:26:57',
                executionMonitoringEndAt: '2020-07-26 22:08:20',
                numberMax: 2393003794,
                numberDays: 9488046950,
                success: 3702891637,
                cancelled: 4567986920,
                delivering: 5088294184,
                error: 9552407856,
                holding: 6262338597,
                toBeDelivered: 7026277568,
                waiting: 4156775906,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: '3adxrnywbyfipmkksyer2gcvw96nleqdo5r98jkjjh3q0gtz35',
                systemId: 'inu1x7awyy8wnqj0xfxyfgdal1wtrz2jz10tp',
                systemName: 'lwxqezur33to5vlpmde0',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 20:39:46',
                executionMonitoringStartAt: '2020-07-26 20:54:39',
                executionMonitoringEndAt: '2020-07-26 23:12:47',
                numberMax: 1510609520,
                numberDays: 2428908908,
                success: 8587954223,
                cancelled: 6102078065,
                delivering: 8416457677,
                error: 7422490433,
                holding: 3613141252,
                toBeDelivered: 5704486758,
                waiting: 4658270942,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'dzsbfp7v102c5ghsetuh5tk5vl1ymh9xx978m3kyb324t1kbeu',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'b6tjhq8x8g0fr2z7cm8p',
                executionId: 'gjvsp1ofxza7ans0a5qrih586kllwwmuhou03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:28:29',
                executionMonitoringStartAt: '2020-07-27 08:55:53',
                executionMonitoringEndAt: '2020-07-27 11:49:42',
                numberMax: 4415581996,
                numberDays: 2211939742,
                success: 8968624793,
                cancelled: 3544974899,
                delivering: 7999235613,
                error: 8755848044,
                holding: 4105847046,
                toBeDelivered: 7672436118,
                waiting: 2712962567,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'q6ib30xmxgxpr42xaab2y4lwzffhz5koupdbssilbo4qkivecmp',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'iapdr4v6gdrzrscimf1f',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:19:48',
                executionMonitoringStartAt: '2020-07-27 11:40:46',
                executionMonitoringEndAt: '2020-07-27 00:22:38',
                numberMax: 2842682409,
                numberDays: 9224764713,
                success: 6960296998,
                cancelled: 5179687609,
                delivering: 2391395897,
                error: 3644641032,
                holding: 2010053865,
                toBeDelivered: 4691174773,
                waiting: 9516042080,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: '1au1h2879ri559t3f01isn9v1cpogd7g7f4jwiogludxqgwr32',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'hi3pq8mdf06ukbn11hamd',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 18:27:55',
                executionMonitoringStartAt: '2020-07-26 16:57:29',
                executionMonitoringEndAt: '2020-07-26 18:11:31',
                numberMax: 4696967026,
                numberDays: 7169113032,
                success: 5028544587,
                cancelled: 4526334229,
                delivering: 6234047124,
                error: 6562703476,
                holding: 6449084170,
                toBeDelivered: 1617682784,
                waiting: 7631995911,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: '7gef0khc6ff6kgikmb1rcscxgt8cttzmg3q1ri71rv03wyex9g',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'ybiap86nk54dcnfr2p97',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 21:56:48',
                executionMonitoringStartAt: '2020-07-27 08:41:08',
                executionMonitoringEndAt: '2020-07-27 04:34:38',
                numberMax: 52623387603,
                numberDays: 3574246891,
                success: 6624555700,
                cancelled: 4668959955,
                delivering: 9627607476,
                error: 7185978863,
                holding: 8283603580,
                toBeDelivered: 5167871807,
                waiting: 8822062212,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'iu756x1ll8pr1iw8r4qkvnlisankujuc4cp1fu68akc1ehi7lw',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'qcxw3naly9ymt3phowc0',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 17:33:53',
                executionMonitoringStartAt: '2020-07-27 04:22:02',
                executionMonitoringEndAt: '2020-07-27 09:34:23',
                numberMax: 9885723992,
                numberDays: 14186789286,
                success: 8356655757,
                cancelled: 4609052492,
                delivering: 2900449701,
                error: 4184683365,
                holding: 1712084084,
                toBeDelivered: 9221930488,
                waiting: 9796846302,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'ijii51fy2v0lf0piuozggtsm3hvbf02rtaqf6ylem6epgm5tj8',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 's9dtvp0l3188omw5t9fy',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:54:54',
                executionMonitoringStartAt: '2020-07-27 08:21:11',
                executionMonitoringEndAt: '2020-07-27 09:44:37',
                numberMax: 1392597772,
                numberDays: 3488308917,
                success: 97182132651,
                cancelled: 5845669388,
                delivering: 8736945236,
                error: 6328560928,
                holding: 6074854103,
                toBeDelivered: 7416048554,
                waiting: 7416576275,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 't3ucfe19ux9on9ynmnmc6weo84s1346qivkj362n4fjr5y4hwx',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: '8oug6ee5nfef2x80dqqr',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 22:40:55',
                executionMonitoringStartAt: '2020-07-27 14:30:18',
                executionMonitoringEndAt: '2020-07-27 04:54:09',
                numberMax: 7919521610,
                numberDays: 6117615924,
                success: 8697974807,
                cancelled: 78405862867,
                delivering: 3298536554,
                error: 1359716992,
                holding: 4888246217,
                toBeDelivered: 7219459946,
                waiting: 7645580947,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'j8z6dm0c9uwl1924ep7ykk5dgk3jxxi04dgrq9iejr2gwkqcn5',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'snt2zpxgblgweb2648er',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:54:45',
                executionMonitoringStartAt: '2020-07-26 23:07:06',
                executionMonitoringEndAt: '2020-07-27 08:13:16',
                numberMax: 8109580262,
                numberDays: 3530131345,
                success: 8349028856,
                cancelled: 2176552826,
                delivering: 16208293365,
                error: 4394253232,
                holding: 6735948846,
                toBeDelivered: 9089450278,
                waiting: 8988674859,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'wmmc7d7ij903oha89xu8s6m1zh24o00fvl8bz7ne5mi8d0ivgf',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'vj8llm33scbb6zipnlhs',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 05:23:32',
                executionMonitoringStartAt: '2020-07-26 18:28:37',
                executionMonitoringEndAt: '2020-07-27 09:49:57',
                numberMax: 6619126959,
                numberDays: 9505705693,
                success: 6599981366,
                cancelled: 7798371694,
                delivering: 5146534388,
                error: 55321706348,
                holding: 5822186394,
                toBeDelivered: 7687040742,
                waiting: 8075150243,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: '98blb6m3i5rh5ks6kx57rw9x4kpquksfg75c7518onlwfil07n',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: '2xsl3lu4ydvy2x1lhvco',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 03:43:17',
                executionMonitoringStartAt: '2020-07-26 17:36:59',
                executionMonitoringEndAt: '2020-07-27 05:26:04',
                numberMax: 6115304233,
                numberDays: 4939036146,
                success: 4651860323,
                cancelled: 4931162980,
                delivering: 3860110657,
                error: 7257258420,
                holding: 78597389765,
                toBeDelivered: 3820412662,
                waiting: 9044942047,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'rj221yojvl69dqrexg884a1ads4enq9r9x9jqinsz1w8l531fu',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'f2f02dqdo7vv9phjbvuv',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 18:46:26',
                executionMonitoringStartAt: '2020-07-27 10:54:56',
                executionMonitoringEndAt: '2020-07-26 19:04:00',
                numberMax: 6824899148,
                numberDays: 9433266641,
                success: 5432009439,
                cancelled: 1110239405,
                delivering: 2829913803,
                error: 6858677877,
                holding: 2950589994,
                toBeDelivered: 91743318160,
                waiting: 4074661827,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: '330wxrsrm9nk343f410fhuperrjw1w348uj61eymj2bpc7kun0',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'y3c2jxc7owd4vsxwcb5a',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 20:19:09',
                executionMonitoringStartAt: '2020-07-27 03:25:35',
                executionMonitoringEndAt: '2020-07-27 08:46:55',
                numberMax: 4159929676,
                numberDays: 4478948527,
                success: 3677673362,
                cancelled: 8177972075,
                delivering: 4178499064,
                error: 1848370433,
                holding: 9143802026,
                toBeDelivered: 3469360414,
                waiting: 24779835828,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'uxyodwn6yw1hsuwlk8dfidulumus3rjcbou0ocgrihphnjl27l',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: '4z447wxlxikkdq6r3gjw',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 04:26:04',
                executionMonitoringStartAt: '2020-07-26 23:26:41',
                executionMonitoringEndAt: '2020-07-27 12:00:09',
                numberMax: -9,
                numberDays: 5625341922,
                success: 3502577842,
                cancelled: 8464795898,
                delivering: 4348707697,
                error: 6671724258,
                holding: 2432370251,
                toBeDelivered: 5010246856,
                waiting: 7004284674,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'p3m5txybf8yvoxvz0xnbkri71httj5mugw7jib6dmo6icxnad5',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'n26pblu0bo8r4f5gdsbw',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 23:17:35',
                executionMonitoringStartAt: '2020-07-27 04:16:53',
                executionMonitoringEndAt: '2020-07-26 18:04:58',
                numberMax: 1959020749,
                numberDays: -9,
                success: 7532287802,
                cancelled: 7271133493,
                delivering: 5138661913,
                error: 7806754496,
                holding: 5367938522,
                toBeDelivered: 8835379898,
                waiting: 1747510964,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'hau1u2we9e5870njp7a1xfercu94ilm48xzd0j94jnwyys9rve',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'pod6ccg62xolcm2wp53q',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:00:05',
                executionMonitoringStartAt: '2020-07-27 07:09:38',
                executionMonitoringEndAt: '2020-07-26 22:42:32',
                numberMax: 1709230352,
                numberDays: 9804964671,
                success: -9,
                cancelled: 7373737955,
                delivering: 2283907388,
                error: 9014740349,
                holding: 5294656235,
                toBeDelivered: 8530304289,
                waiting: 4574413429,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: '6w0urqdxd924pag8bmyksoup67ii3uw2ms90gnlpeh24bq6xzf',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: '5qkvnyzzqs3c09tk6fhc',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 19:53:17',
                executionMonitoringStartAt: '2020-07-26 20:55:01',
                executionMonitoringEndAt: '2020-07-27 13:29:35',
                numberMax: 5456742916,
                numberDays: 1323641692,
                success: 1822698865,
                cancelled: -9,
                delivering: 9064958313,
                error: 8200971866,
                holding: 1668218977,
                toBeDelivered: 6322269029,
                waiting: 6576813690,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'w5cli4s0xaomhdk7s4djiy4k8j1hpwcvi65hlb57cwhnejedt3',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: '5tph35or6i09udwr08hf',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 07:03:08',
                executionMonitoringStartAt: '2020-07-27 07:41:19',
                executionMonitoringEndAt: '2020-07-26 21:33:43',
                numberMax: 9640429245,
                numberDays: 6169195145,
                success: 3468183894,
                cancelled: 8687728231,
                delivering: -9,
                error: 4406070694,
                holding: 6796825656,
                toBeDelivered: 1333688047,
                waiting: 5374506757,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'kc5fey23kf2ztsr1o709wdd41x1bppj0pn0szcwmlry1xd00p3',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'uzt1itnh6sqiwv7rmlw6',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:13:07',
                executionMonitoringStartAt: '2020-07-27 12:32:56',
                executionMonitoringEndAt: '2020-07-26 19:56:20',
                numberMax: 6889896726,
                numberDays: 2535632202,
                success: 1672690104,
                cancelled: 9414576600,
                delivering: 2603614256,
                error: -9,
                holding: 3540595396,
                toBeDelivered: 2984640871,
                waiting: 9676270812,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: '48zf2556c39ljkdv0alsjf17zsphmho375g4lxd2z8idy69zav',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'hureqekxq1s8xj36uqj7',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 19:50:27',
                executionMonitoringStartAt: '2020-07-27 07:46:17',
                executionMonitoringEndAt: '2020-07-27 04:03:42',
                numberMax: 4248364816,
                numberDays: 4752504548,
                success: 5814456544,
                cancelled: 8419136253,
                delivering: 6615344870,
                error: 2570366189,
                holding: -9,
                toBeDelivered: 4457464856,
                waiting: 9724050811,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'hhnh5r4llpf8wwjqhlvujz22gp2r7bldn0xrr2agpvm162bf8l',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'it2k6lx4fqjvcbp0ivbm',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 19:26:49',
                executionMonitoringStartAt: '2020-07-27 11:22:04',
                executionMonitoringEndAt: '2020-07-27 16:23:49',
                numberMax: 9382980952,
                numberDays: 7249792717,
                success: 2831258271,
                cancelled: 6296647272,
                delivering: 2828218972,
                error: 4777938377,
                holding: 2701106775,
                toBeDelivered: -9,
                waiting: 1582220990,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'mobpyuhc3cgopz2rgffev3x0j4zd1gdptlw82mvb6ct99zovjo',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: '7a2omlkdx7mjfebezns9',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:44:06',
                executionMonitoringStartAt: '2020-07-27 09:32:21',
                executionMonitoringEndAt: '2020-07-27 01:22:07',
                numberMax: 7711341753,
                numberDays: 6811530967,
                success: 2184101109,
                cancelled: 5076847158,
                delivering: 6506481561,
                error: 4664667339,
                holding: 3148252854,
                toBeDelivered: 2477900918,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: '0frzz7cuv7tra2jhke8m2mckku6pi59towwy3n3ijeji98320b',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'nq8m6vvh22azqri6u6td',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-26 20:05:59',
                executionMonitoringStartAt: '2020-07-27 05:38:36',
                executionMonitoringEndAt: '2020-07-27 13:12:58',
                numberMax: 5884207791,
                numberDays: 2485363945,
                success: 1906335296,
                cancelled: 8433031905,
                delivering: 2769641012,
                error: 6842885791,
                holding: 2520893778,
                toBeDelivered: 7403351949,
                waiting: 8423530480,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: '5aerqryadd29rkprfwe0gtvydqghup896fsxxxydbmfm6htecc',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'juxoi0tasr3ymypyuhec',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 06:11:38',
                executionMonitoringEndAt: '2020-07-27 12:16:30',
                numberMax: 8351684101,
                numberDays: 2027773303,
                success: 2408780815,
                cancelled: 3704357061,
                delivering: 3847133973,
                error: 9403410142,
                holding: 5958038901,
                toBeDelivered: 9249895072,
                waiting: 7617462243,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'oh3brk8xzm8dh28hkpt2odw9a036lf0dkn4n2ofbe5y435d95a',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: '3mh6s0ch4vxk4i2veswa',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 22:58:06',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 16:34:03',
                numberMax: 2979004614,
                numberDays: 6560712539,
                success: 8436502235,
                cancelled: 5678405291,
                delivering: 1348596377,
                error: 3491231215,
                holding: 4310439300,
                toBeDelivered: 6510662275,
                waiting: 6891033715,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'ko6qpk97te8ayti2mlus587ua5j9fxh9u4cisuoksv6g38ngpn',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: '9s4mz87ozn7cq3lyqv5n',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 21:33:50',
                executionMonitoringStartAt: '2020-07-27 08:01:05',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 3927257984,
                numberDays: 3730344950,
                success: 5014327505,
                cancelled: 9464879785,
                delivering: 3224618514,
                error: 8108503007,
                holding: 5791540551,
                toBeDelivered: 7136250416,
                waiting: 4977639089,
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
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'x6s9vc43uinsovu2yp3dgpvqj5fcnvrkz6x3wh988202xr7jm8',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'kgf3cbzp7sesxfvbcqzc',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 03:54:37',
                executionMonitoringStartAt: '2020-07-27 11:32:59',
                executionMonitoringEndAt: '2020-07-27 06:09:05',
                numberMax: 5420545219,
                numberDays: 9246939766,
                success: 6618333138,
                cancelled: 3761086595,
                delivering: 8980884166,
                error: 7738412933,
                holding: 1698469018,
                toBeDelivered: 7944897261,
                waiting: 9549628295,
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
                        value   : 'f596e550-2e4a-4f97-a1a9-935790f57bef'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f596e550-2e4a-4f97-a1a9-935790f57bef'));
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
            .get('/bplus-it-sappi/message-overview/f596e550-2e4a-4f97-a1a9-935790f57bef')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f596e550-2e4a-4f97-a1a9-935790f57bef'));
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
                
                id: '223649a1-388c-4381-81f0-812eaa6da704',
                tenantId: 'ed5a8817-5f28-4e31-a32f-96081050e7d0',
                tenantCode: 'z4ynoki7886x19hhy3sc2bam4kfxgt8e8oc32snbcmtxe96uz3',
                systemId: '7935cc36-7eaf-4de3-b9b1-ea389d3af468',
                systemName: '19chysdke31yb2kikv66',
                executionId: '97c38702-c149-4c10-9172-2afbe3a89995',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:36:21',
                executionMonitoringStartAt: '2020-07-26 23:02:30',
                executionMonitoringEndAt: '2020-07-27 14:19:38',
                numberMax: 7847142063,
                numberDays: 3049567425,
                success: 5468760343,
                cancelled: 5291182783,
                delivering: 6439959360,
                error: 4367929426,
                holding: 1144837951,
                toBeDelivered: 1957714114,
                waiting: 4934015746,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                tenantCode: 'p39rrskplehrlivp36yvqylsa70facx71vcwry3blnjj34pw7r',
                systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                systemName: 'sn782wvkdmn6m8kag438',
                executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:22:58',
                executionMonitoringStartAt: '2020-07-26 21:14:49',
                executionMonitoringEndAt: '2020-07-27 08:10:11',
                numberMax: 2984463422,
                numberDays: 5444504856,
                success: 6764014492,
                cancelled: 1813302412,
                delivering: 9647714649,
                error: 5387164630,
                holding: 9830097955,
                toBeDelivered: 9950872095,
                waiting: 1968665964,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f596e550-2e4a-4f97-a1a9-935790f57bef'));
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
            .delete('/bplus-it-sappi/message-overview/f596e550-2e4a-4f97-a1a9-935790f57bef')
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
                        id: '0a32918f-e9c4-4b9e-8174-20db7249a13b',
                        tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                        tenantCode: 'wlrixymdf924758h77o84l0yx3dnldzmz6ngdorm41b7fmuxzu',
                        systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                        systemName: 'emqxxtn62a74tmd73o7a',
                        executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 10:37:47',
                        executionMonitoringStartAt: '2020-07-27 00:16:17',
                        executionMonitoringEndAt: '2020-07-27 13:14:30',
                        numberMax: 4458554286,
                        numberDays: 5325637557,
                        success: 8341445099,
                        cancelled: 8070431050,
                        delivering: 7668729756,
                        error: 1115976001,
                        holding: 2398284481,
                        toBeDelivered: 5271398938,
                        waiting: 1105532442,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', '0a32918f-e9c4-4b9e-8174-20db7249a13b');
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
                            value   : 'f596e550-2e4a-4f97-a1a9-935790f57bef'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('f596e550-2e4a-4f97-a1a9-935790f57bef');
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
                    id: 'f596e550-2e4a-4f97-a1a9-935790f57bef'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('f596e550-2e4a-4f97-a1a9-935790f57bef');
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
                        
                        id: 'b0634f78-41e4-4729-95b6-3022fcf9cfdd',
                        tenantId: '2944b235-18a9-4364-84f5-a39d9780b225',
                        tenantCode: '0c2k68f4hlw7qpy1lktdl7l2cye23hzuugih031vmuiinth6w1',
                        systemId: '84347cbb-b913-4cab-a566-e531da4c0e7b',
                        systemName: '8rywvcix05khjmzuo0m0',
                        executionId: 'e7bd1e97-05a3-4a4e-b155-eecb481b8dcb',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-26 22:52:07',
                        executionMonitoringStartAt: '2020-07-27 03:20:59',
                        executionMonitoringEndAt: '2020-07-27 05:37:52',
                        numberMax: 4677512567,
                        numberDays: 4610892346,
                        success: 2521024026,
                        cancelled: 5680442698,
                        delivering: 6711712649,
                        error: 8262415554,
                        holding: 8315087514,
                        toBeDelivered: 7969107344,
                        waiting: 8208901131,
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
                        
                        id: 'f596e550-2e4a-4f97-a1a9-935790f57bef',
                        tenantId: '85d25ec9-f7d2-4ba4-b94a-0feb2757524a',
                        tenantCode: '615ohqu2gw3uqc59ci8f8uwyimfx9hq2xjtz1l2rdsdvhu4rwc',
                        systemId: '7b3a5e15-36df-4c45-bc82-e008d64f3f87',
                        systemName: 'o6943hwk5xnqge7hb3om',
                        executionId: '63042007-3a93-4f4e-b58f-ad73ce6a0e62',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 16:19:14',
                        executionMonitoringStartAt: '2020-07-26 16:56:43',
                        executionMonitoringEndAt: '2020-07-26 18:09:47',
                        numberMax: 5019079830,
                        numberDays: 5409440479,
                        success: 1669079302,
                        cancelled: 8997171993,
                        delivering: 1095294539,
                        error: 3887510338,
                        holding: 1569528731,
                        toBeDelivered: 1522633039,
                        waiting: 1679905710,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('f596e550-2e4a-4f97-a1a9-935790f57bef');
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
                    id: 'f596e550-2e4a-4f97-a1a9-935790f57bef'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('f596e550-2e4a-4f97-a1a9-935790f57bef');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});