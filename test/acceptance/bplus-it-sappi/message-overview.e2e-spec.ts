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
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'iyz2ru807tzf4261zel0czy6zrytcpp2syy8c1bdp5uyd4uc2x',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'mnsftnh60rjy6ai4h3rv',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 23:23:21',
                executionMonitoringStartAt: '2020-07-27 08:32:49',
                executionMonitoringEndAt: '2020-07-27 07:15:52',
                numberMax: 2855196777,
                numberDays: 1352829461,
                success: 1678064775,
                cancelled: 2506012298,
                delivering: 2324587582,
                error: 9149390957,
                holding: 3208542690,
                toBeDelivered: 9560390411,
                waiting: 7634115097,
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
                
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'lgvu9o0hdabvd54im77z93q5epi9pzm2sfr831sdvz5phy5y64',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'pouvzofr5zkutmbm9ifd',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:44:19',
                executionMonitoringStartAt: '2020-07-27 02:45:38',
                executionMonitoringEndAt: '2020-07-27 00:25:17',
                numberMax: 3720555298,
                numberDays: 7988463603,
                success: 6627563302,
                cancelled: 9812195599,
                delivering: 5244365238,
                error: 6659069565,
                holding: 6409863508,
                toBeDelivered: 2087081242,
                waiting: 6596739274,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: null,
                tenantCode: 'ry1wgv10iz2kzyzyebhlq78nnstq8zmcn23bt1a9whbxbs2jm9',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'nq62ag0wn4zqi84vpmcw',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 18:27:26',
                executionMonitoringStartAt: '2020-07-27 09:12:23',
                executionMonitoringEndAt: '2020-07-27 04:24:19',
                numberMax: 7720632821,
                numberDays: 7346583957,
                success: 2145781936,
                cancelled: 8570523424,
                delivering: 4063106972,
                error: 2158907013,
                holding: 4377810097,
                toBeDelivered: 7097118413,
                waiting: 6391192192,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                
                tenantCode: 'ciu5bztti2sgfsnrwf9ud6ma6o3b5pghdugz4ezz18qh3jka5a',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: '3im64bbyiriop24b9tht',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 22:49:52',
                executionMonitoringStartAt: '2020-07-27 16:24:56',
                executionMonitoringEndAt: '2020-07-26 23:50:51',
                numberMax: 8916070704,
                numberDays: 4275787361,
                success: 7124806122,
                cancelled: 3514144700,
                delivering: 2535128810,
                error: 4678972620,
                holding: 3390936165,
                toBeDelivered: 6023137653,
                waiting: 7152625272,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: null,
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'fzlqmgytf0khbiqmnkzo',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:09:08',
                executionMonitoringStartAt: '2020-07-27 08:20:39',
                executionMonitoringEndAt: '2020-07-27 06:54:56',
                numberMax: 6332318702,
                numberDays: 6392843881,
                success: 9668747154,
                cancelled: 3082828996,
                delivering: 4286869656,
                error: 1177640973,
                holding: 5741749504,
                toBeDelivered: 6416331757,
                waiting: 9416984267,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'me9hylnjr3d441fkg5lv',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:43:55',
                executionMonitoringStartAt: '2020-07-26 22:35:33',
                executionMonitoringEndAt: '2020-07-26 22:59:32',
                numberMax: 4271922937,
                numberDays: 6565864660,
                success: 2197832575,
                cancelled: 3260534627,
                delivering: 1929226067,
                error: 2269418172,
                holding: 3021422177,
                toBeDelivered: 8502798203,
                waiting: 2002862865,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: '7hmaosbvr3zu2km9r7bxunaeotsloncznb1qyqis94cjsutfr9',
                systemId: null,
                systemName: '6arz7jf6lb9xyl398lrv',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 04:44:56',
                executionMonitoringStartAt: '2020-07-27 05:31:26',
                executionMonitoringEndAt: '2020-07-27 13:52:24',
                numberMax: 3070533797,
                numberDays: 8770215960,
                success: 9553474512,
                cancelled: 3492494664,
                delivering: 7998035076,
                error: 5272001473,
                holding: 9416976079,
                toBeDelivered: 2588011217,
                waiting: 3185535773,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'x2a3g4lhxudmsc1xejxh37cox5923q3y5fompw82uys9h8j056',
                
                systemName: 'm6ms6p0udi70dq0k2ctv',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:20:39',
                executionMonitoringStartAt: '2020-07-27 12:25:42',
                executionMonitoringEndAt: '2020-07-27 01:17:21',
                numberMax: 1944289862,
                numberDays: 5398593707,
                success: 7991278250,
                cancelled: 8530282958,
                delivering: 6703878079,
                error: 4936064598,
                holding: 8696299530,
                toBeDelivered: 1100652272,
                waiting: 8059502315,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: '9qyh9mk6b68kz7p2trsfx9dc6wak55kf31huxkil5youpr1nin',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: null,
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:00:26',
                executionMonitoringStartAt: '2020-07-27 17:14:39',
                executionMonitoringEndAt: '2020-07-27 09:32:51',
                numberMax: 1477126048,
                numberDays: 6599626007,
                success: 5153381234,
                cancelled: 3039714626,
                delivering: 5652199320,
                error: 8935778223,
                holding: 7600822903,
                toBeDelivered: 1918722303,
                waiting: 3348869322,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: '0ve0zmkl50w8ohcatw2g38xyr6d8rs3c59ure4vqd7pm607o5h',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 08:57:06',
                executionMonitoringStartAt: '2020-07-27 00:52:09',
                executionMonitoringEndAt: '2020-07-26 22:38:10',
                numberMax: 5492409765,
                numberDays: 3809918275,
                success: 5846279327,
                cancelled: 3939144881,
                delivering: 5549296165,
                error: 3750157536,
                holding: 1766725383,
                toBeDelivered: 3789689508,
                waiting: 7069982726,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: '2a4bi9b42jpco6b5fymuswz4q35orlnlxs0bxqhfcol0of75ji',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'gzys4ixucaya5pn0ypsh',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 23:01:04',
                executionMonitoringStartAt: '2020-07-27 08:16:44',
                executionMonitoringEndAt: '2020-07-27 16:29:13',
                numberMax: 5193681548,
                numberDays: 8183429408,
                success: 5358832929,
                cancelled: 1391727760,
                delivering: 4914967430,
                error: 9050909465,
                holding: 2452045647,
                toBeDelivered: 9043426802,
                waiting: 1053578516,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'x8vvdsdn8se04o11lgkoqfphd7hrowli9gynrfs9mvuardx5tc',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'bq2jftgxwlyrz8kkb6n6',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 01:38:48',
                executionMonitoringStartAt: '2020-07-26 23:50:32',
                executionMonitoringEndAt: '2020-07-27 13:01:43',
                numberMax: 2532472393,
                numberDays: 2022289717,
                success: 4539655791,
                cancelled: 7905554970,
                delivering: 4234530554,
                error: 1420749090,
                holding: 1382166895,
                toBeDelivered: 3562426161,
                waiting: 3081476241,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'l4rlvh1qecc4r6niitcqjto55hrf6k00bmxl098xdbp5j4er36',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'hvp9q7bm0hty4fotrh4e',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: null,
                executionExecutedAt: '2020-07-27 16:43:46',
                executionMonitoringStartAt: '2020-07-26 21:08:55',
                executionMonitoringEndAt: '2020-07-26 23:51:33',
                numberMax: 6008553256,
                numberDays: 5230530048,
                success: 8085952310,
                cancelled: 7365977426,
                delivering: 9244425568,
                error: 9849707933,
                holding: 5404709078,
                toBeDelivered: 2691467217,
                waiting: 5298844210,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'cd42hxkalslfq88epyp32rr7zryvybfg7v31vhgo900pf9z6x7',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'q8bsjqglvd4iwuc16ped',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                
                executionExecutedAt: '2020-07-27 10:25:04',
                executionMonitoringStartAt: '2020-07-26 22:12:24',
                executionMonitoringEndAt: '2020-07-27 00:32:49',
                numberMax: 6253569703,
                numberDays: 7707308158,
                success: 8395951007,
                cancelled: 3927367477,
                delivering: 5652169249,
                error: 6454227290,
                holding: 7630087704,
                toBeDelivered: 7588079990,
                waiting: 7522331678,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: '0yaebkt2wvxdhyft8nu131vtwlpf4stapxcbafykl2s96rqbuq',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: '85qagf0pm5khdn4k33ql',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 12:57:23',
                executionMonitoringEndAt: '2020-07-27 16:35:50',
                numberMax: 9934884475,
                numberDays: 1715591273,
                success: 6659506394,
                cancelled: 2668817457,
                delivering: 8850674848,
                error: 5923026724,
                holding: 7428680643,
                toBeDelivered: 6112676519,
                waiting: 9052677851,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'qkwt9rmmzj8m30cfuxikqrhd3el1k5p4dm9576xzh9lhebdbzh',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'elm8zpp4zc7l9dhdh20w',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-27 17:26:46',
                executionMonitoringEndAt: '2020-07-27 13:50:26',
                numberMax: 4573021724,
                numberDays: 8184361355,
                success: 2377359988,
                cancelled: 6565806283,
                delivering: 9241554250,
                error: 1441473870,
                holding: 1061249748,
                toBeDelivered: 1221909928,
                waiting: 9982684699,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: '2lur7t08evxq9y60scqa2tlbeeqywjxjdh8gtx864n7h5gfnnj',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 's7ah2epg2kiqqj38hdyf',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 02:55:27',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 10:16:56',
                numberMax: 2673280949,
                numberDays: 1886258630,
                success: 7044237438,
                cancelled: 1144783189,
                delivering: 7666336613,
                error: 5674809475,
                holding: 2758873629,
                toBeDelivered: 9920143442,
                waiting: 9390684862,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'ri28apdwg250c59lrhwx8tw58tn3x7riyvxmlfi3116mn6wbf1',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: '0vmdjmlojzishs7bm0lv',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:13:59',
                
                executionMonitoringEndAt: '2020-07-26 19:16:03',
                numberMax: 3586275362,
                numberDays: 4172708506,
                success: 5773235108,
                cancelled: 2265932892,
                delivering: 9497882234,
                error: 4023921922,
                holding: 9714604714,
                toBeDelivered: 3417191631,
                waiting: 7493802953,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: '6xk4msl6mjr02ra55ofcv2df3j1vp2e9w8mf4winb6f0firwm0',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'pc8wwjmiqgefkmyjzw8y',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:18:05',
                executionMonitoringStartAt: '2020-07-27 17:30:02',
                executionMonitoringEndAt: null,
                numberMax: 1055481157,
                numberDays: 1724063338,
                success: 1450414884,
                cancelled: 3267240536,
                delivering: 9953437597,
                error: 9577742303,
                holding: 3441488568,
                toBeDelivered: 5248570591,
                waiting: 9609508762,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'p8st2fahu48lufm2ggiso2bgz86jxmozzy1u94twi9nnkp23km',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'tmj3ra9xahtqll9z0b8o',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:08:50',
                executionMonitoringStartAt: '2020-07-26 23:02:38',
                
                numberMax: 8699391454,
                numberDays: 9480904712,
                success: 1750126150,
                cancelled: 2267132134,
                delivering: 6510565890,
                error: 6760904427,
                holding: 5625195579,
                toBeDelivered: 5727167706,
                waiting: 4367361446,
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
                id: 'd64o0x40hbzt2kp05zu02ncxumrffdyxx0dtn',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'yppfaurz55ztb34t7pt1egsfmvgg1lbhf07g7y7r6q69jojg72',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'nw14e1uqyn3f69qmpoj7',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 02:57:20',
                executionMonitoringStartAt: '2020-07-27 07:59:40',
                executionMonitoringEndAt: '2020-07-27 05:53:43',
                numberMax: 8691184642,
                numberDays: 3781056584,
                success: 5668957781,
                cancelled: 1456627607,
                delivering: 8401917054,
                error: 5846388462,
                holding: 7180414628,
                toBeDelivered: 3508058955,
                waiting: 2463521336,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: 'sa28u3vb1nf22z380ko6nti5nzqqjskdlysxp',
                tenantCode: 'y2nlzpby54rxrqyqfop7vx79uobqnlkwhgplbq4zhk9k1hlvjm',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'y7vc60itphdq8v9dmn49',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:34:07',
                executionMonitoringStartAt: '2020-07-27 14:40:34',
                executionMonitoringEndAt: '2020-07-27 12:44:06',
                numberMax: 8549066510,
                numberDays: 2292007265,
                success: 9866841256,
                cancelled: 7232121672,
                delivering: 8610294489,
                error: 5662094396,
                holding: 8993854848,
                toBeDelivered: 6945547374,
                waiting: 7740079002,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: '0eavqfo8cp6lqinix46nea3ot5vakggz7qqdqedog4x2xtbac8',
                systemId: '1ogjlr1hdqv7poxud1ogo95kksxnpmcg1zt7h',
                systemName: '05e72tb5noscigqgcv1o',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:47:39',
                executionMonitoringStartAt: '2020-07-27 05:00:52',
                executionMonitoringEndAt: '2020-07-27 18:06:09',
                numberMax: 9137743816,
                numberDays: 4911952250,
                success: 9102703914,
                cancelled: 3308779841,
                delivering: 1997535776,
                error: 8208125125,
                holding: 5785418526,
                toBeDelivered: 4567201869,
                waiting: 6620995405,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'wva6en7y3xmag5621r20w21y2q41oujyeo3jbn81s97z2n0944',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: '368tcdigs0p8tam8t88s',
                executionId: 'p6v2y0b5iz0qfhittkobt3rw2ux2dx41z3v0s',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:47:54',
                executionMonitoringStartAt: '2020-07-27 10:01:20',
                executionMonitoringEndAt: '2020-07-27 09:19:54',
                numberMax: 4427479206,
                numberDays: 5225469288,
                success: 6729397725,
                cancelled: 4589971260,
                delivering: 8494653180,
                error: 2276588359,
                holding: 2328179296,
                toBeDelivered: 5547452036,
                waiting: 1510837075,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: '8ev2q64i9ofzckphpfsly7mxta3yia82sx7ji9aqwxj4t2mnmx7',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'ulx3xxgqs7ccn6e6ktdl',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 21:40:39',
                executionMonitoringStartAt: '2020-07-26 23:13:27',
                executionMonitoringEndAt: '2020-07-27 02:06:19',
                numberMax: 9036260946,
                numberDays: 7798221917,
                success: 6731092660,
                cancelled: 5665929927,
                delivering: 4994899633,
                error: 6323148901,
                holding: 8109405467,
                toBeDelivered: 3421417940,
                waiting: 9057989334,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'z99r1r463xwd4bgkggeczcobco6pvw5upi4n8s96p8yv6azjgm',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'g47idg1r7cymygtb3kxrg',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 17:15:16',
                executionMonitoringStartAt: '2020-07-27 00:01:27',
                executionMonitoringEndAt: '2020-07-26 19:00:35',
                numberMax: 1548090900,
                numberDays: 8773436616,
                success: 9112749080,
                cancelled: 5417527732,
                delivering: 9906501840,
                error: 6523162013,
                holding: 1431570029,
                toBeDelivered: 8977857836,
                waiting: 6163294717,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'fyi4ozoi1ipj3t0h9t66jrmcgzvjvru4dxovi5stdhdbe22mxv',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: '7sg726o3exdg39v0y79e',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 23:32:37',
                executionMonitoringStartAt: '2020-07-26 21:08:15',
                executionMonitoringEndAt: '2020-07-27 08:22:42',
                numberMax: 83671409963,
                numberDays: 7759694720,
                success: 6245410773,
                cancelled: 2719956789,
                delivering: 2037553248,
                error: 6713997371,
                holding: 5210816867,
                toBeDelivered: 3628436757,
                waiting: 3348578154,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: '5y05l8048b9tnhqvmub6kuw6krpbor2viukufq6qpuwp5lvkkq',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: '81hl11wszunj77zvpvra',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 03:30:18',
                executionMonitoringStartAt: '2020-07-27 05:48:42',
                executionMonitoringEndAt: '2020-07-27 13:36:45',
                numberMax: 7899656313,
                numberDays: 77574777432,
                success: 4017437204,
                cancelled: 5038944258,
                delivering: 3391171513,
                error: 5780068424,
                holding: 7790468108,
                toBeDelivered: 9137757382,
                waiting: 8974423874,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'e7bl8f96c7jhg3sdaseo0hpmq5jxsxpafu5gy28wzq98rm4xo5',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'l1gqe5yg8uad342k4qk8',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:12:24',
                executionMonitoringStartAt: '2020-07-27 02:44:07',
                executionMonitoringEndAt: '2020-07-27 16:23:43',
                numberMax: 9808456341,
                numberDays: 2007120447,
                success: 88653517989,
                cancelled: 1727053354,
                delivering: 7446178122,
                error: 9770744464,
                holding: 1622790021,
                toBeDelivered: 5168672748,
                waiting: 2917242273,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'grtfx6gxutd1es27mk1k1v1l1wffi3evq1gy7sdybwu4yncdb7',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'nwdhja30gcq0acyb6j1h',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:47:41',
                executionMonitoringStartAt: '2020-07-27 08:41:01',
                executionMonitoringEndAt: '2020-07-27 01:03:37',
                numberMax: 8644531122,
                numberDays: 1348684018,
                success: 8446076168,
                cancelled: 51842542990,
                delivering: 1668714101,
                error: 5769462109,
                holding: 4853228182,
                toBeDelivered: 3536252462,
                waiting: 1282113862,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'ehyxappw9jl7lrs38t552v2wemg3sq632i5xy2rn4kth1b84mt',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'kzstocehivrsuca4iatn',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 18:13:12',
                executionMonitoringStartAt: '2020-07-27 05:08:51',
                executionMonitoringEndAt: '2020-07-26 20:23:15',
                numberMax: 5991161595,
                numberDays: 6577459013,
                success: 5354889711,
                cancelled: 2626680153,
                delivering: 77734506422,
                error: 4831794687,
                holding: 1953622633,
                toBeDelivered: 1040392420,
                waiting: 3908093161,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'yc3xw4a01mnle6ixprus6iyifcuvc5xvrj3lem1la9bg6qqkb3',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'vfwk52v8r09dm27loi9z',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:28:59',
                executionMonitoringStartAt: '2020-07-26 21:09:58',
                executionMonitoringEndAt: '2020-07-26 22:38:57',
                numberMax: 1397819790,
                numberDays: 2339215687,
                success: 5768593908,
                cancelled: 5133543546,
                delivering: 7656609033,
                error: 92129627671,
                holding: 8301160271,
                toBeDelivered: 5157889941,
                waiting: 1054691014,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'd246gnnjxazhs9qt7j6m2m2pp6h579v6lr9yd8ca6qtcbcy93v',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'pkijmx9h02wq7i2man69',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 19:20:17',
                executionMonitoringStartAt: '2020-07-27 15:46:29',
                executionMonitoringEndAt: '2020-07-27 00:52:41',
                numberMax: 2917269703,
                numberDays: 2339485509,
                success: 1699206843,
                cancelled: 2779695065,
                delivering: 1819115746,
                error: 7523289620,
                holding: 13251359350,
                toBeDelivered: 3694067580,
                waiting: 8451208387,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'ntluyyvyrst38jofdbxdu1j511a1277t6zu3sda2rqm8ynufai',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'ahtx7ulh7gua7axxualz',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 21:36:40',
                executionMonitoringStartAt: '2020-07-26 23:14:18',
                executionMonitoringEndAt: '2020-07-27 15:01:49',
                numberMax: 5145802940,
                numberDays: 3302444518,
                success: 1223451827,
                cancelled: 1064927994,
                delivering: 8196985619,
                error: 4268580212,
                holding: 4032548184,
                toBeDelivered: 76049125476,
                waiting: 9024966638,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'uo9amo9s0i9ii4u2j7j5fr4gmihpu2ig0jelsxclls2w66ww9l',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'a1lg9vg02dv7kfcly6dr',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:21:09',
                executionMonitoringStartAt: '2020-07-27 18:13:26',
                executionMonitoringEndAt: '2020-07-27 10:36:56',
                numberMax: 6985727767,
                numberDays: 6097724582,
                success: 1032339107,
                cancelled: 7567893209,
                delivering: 4238385330,
                error: 5175039179,
                holding: 8044968840,
                toBeDelivered: 2349825545,
                waiting: 72783006733,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'anyjbjw4961rdzwtry0kxpu3iskgqc7mx6zk47oy0wjnyfwyng',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'q8ciko9m24wn3414ba8t',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:54:00',
                executionMonitoringStartAt: '2020-07-26 22:12:27',
                executionMonitoringEndAt: '2020-07-26 21:19:00',
                numberMax: -9,
                numberDays: 6158896494,
                success: 1847729452,
                cancelled: 4801251186,
                delivering: 8317608686,
                error: 4226101893,
                holding: 5672867361,
                toBeDelivered: 9411875450,
                waiting: 7889928331,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 's4gojic6feucs08r1l5xa9le36dq1mdogprizyb8fqrb9vt329',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'z3dfi0kx8q8hczn5amcz',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:24:54',
                executionMonitoringStartAt: '2020-07-27 09:38:48',
                executionMonitoringEndAt: '2020-07-27 04:10:03',
                numberMax: 7144603652,
                numberDays: -9,
                success: 5599170838,
                cancelled: 1221238433,
                delivering: 2786310125,
                error: 4015576889,
                holding: 2249195147,
                toBeDelivered: 1396606969,
                waiting: 5669674044,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'm6uw9pt4j6a2j5v5b28bt7yvw1q21jukozk1ms5k5r2lx8wwaq',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'il9qfxowdr4imenj1mtn',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 20:47:25',
                executionMonitoringStartAt: '2020-07-27 14:50:47',
                executionMonitoringEndAt: '2020-07-26 21:25:51',
                numberMax: 6865485115,
                numberDays: 7752073845,
                success: -9,
                cancelled: 8874771178,
                delivering: 3229235547,
                error: 3944742239,
                holding: 7898570409,
                toBeDelivered: 6978026172,
                waiting: 1074714994,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: '86nr402odn5n2now27abwhvs9q2rvxca8l2ai3u11hd4f5whx4',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'pofaklryay6fxgyujl81',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:21:28',
                executionMonitoringStartAt: '2020-07-27 09:24:08',
                executionMonitoringEndAt: '2020-07-27 11:46:43',
                numberMax: 3759398564,
                numberDays: 7401406811,
                success: 2372000135,
                cancelled: -9,
                delivering: 3180962819,
                error: 7870613417,
                holding: 8012503748,
                toBeDelivered: 3476557890,
                waiting: 7173134283,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'u7x41usllen4869v1a7secquvv1o28r3zvq6b8gcyxy71j0v5s',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'tg5m59k92ahci9p9rji4',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 23:13:39',
                executionMonitoringStartAt: '2020-07-26 19:17:53',
                executionMonitoringEndAt: '2020-07-26 20:43:59',
                numberMax: 4036526781,
                numberDays: 3963983033,
                success: 5010125033,
                cancelled: 6682565066,
                delivering: -9,
                error: 3802766381,
                holding: 3098299445,
                toBeDelivered: 6717475956,
                waiting: 1886212051,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: '28qfxk5xkw3hxugxpipiqy2mq4v9cjledz2aby1kg6idryjfy2',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'njr7yrvfx9bmci2928xd',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:43:08',
                executionMonitoringStartAt: '2020-07-27 13:25:45',
                executionMonitoringEndAt: '2020-07-27 03:59:57',
                numberMax: 8754745394,
                numberDays: 1161173710,
                success: 6181637603,
                cancelled: 5065016392,
                delivering: 2828375873,
                error: -9,
                holding: 9897333331,
                toBeDelivered: 5606839132,
                waiting: 3340444341,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'ubptw5bb1kuno4y5hx484d9sf6tlypbnv58lk59kt8a1lvzqff',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'wcse200xwwdtw5u188m3',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:21:53',
                executionMonitoringStartAt: '2020-07-27 13:26:47',
                executionMonitoringEndAt: '2020-07-27 13:52:28',
                numberMax: 3843837888,
                numberDays: 4625149365,
                success: 6940955232,
                cancelled: 9545366900,
                delivering: 9055704439,
                error: 7289679979,
                holding: -9,
                toBeDelivered: 6579628596,
                waiting: 4153528350,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'xe2ysr5lqqjdt5nijbycm3yiikqiieifndo0dcm6lazzetu1zu',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'j2uw4nlagmx7oknradyq',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:49:27',
                executionMonitoringStartAt: '2020-07-27 17:15:58',
                executionMonitoringEndAt: '2020-07-27 12:37:30',
                numberMax: 3410994116,
                numberDays: 2124862457,
                success: 9767455303,
                cancelled: 8714060208,
                delivering: 9622648426,
                error: 7466707874,
                holding: 8704766202,
                toBeDelivered: -9,
                waiting: 7982280014,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'fl9qnjvc0oktqz2vnbl60ebdmfumzkdx33br5136lenahhanns',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'rh7f54ywj4o7cu8ihma0',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 19:11:03',
                executionMonitoringStartAt: '2020-07-27 09:18:04',
                executionMonitoringEndAt: '2020-07-27 08:43:25',
                numberMax: 3952565492,
                numberDays: 4965699837,
                success: 1177377861,
                cancelled: 1123377818,
                delivering: 6629644138,
                error: 8210492836,
                holding: 3543641962,
                toBeDelivered: 2542235510,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'yd6c3bbk7h9uxsxdy6d8mo2540rbvkvcxhroqpicxp4gvg7j2x',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: '88gywh2cvjowr6g2y5tt',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 12:13:54',
                executionMonitoringStartAt: '2020-07-27 13:37:56',
                executionMonitoringEndAt: '2020-07-27 08:24:44',
                numberMax: 6523768061,
                numberDays: 1750542849,
                success: 1146841876,
                cancelled: 3156474775,
                delivering: 6454187954,
                error: 2994595358,
                holding: 9314880464,
                toBeDelivered: 1789463575,
                waiting: 8443376651,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'wiucak3pw80ga7v7m78akptfuruqwgcwmt592fd2fngww0ubgx',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'nyf21gcqvkyad0rt8lkc',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 17:41:53',
                executionMonitoringEndAt: '2020-07-27 16:09:09',
                numberMax: 6793804249,
                numberDays: 9595434361,
                success: 2590846589,
                cancelled: 6951132411,
                delivering: 1532056437,
                error: 6505780348,
                holding: 9922428832,
                toBeDelivered: 5821014186,
                waiting: 7241857402,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: '2z2gfdpxs5aufwjnlf782ofccd6whlmhchwaeqrshobj2449ph',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'w8trw28is18j1qj87s9v',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 03:19:08',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-26 19:46:19',
                numberMax: 3399624786,
                numberDays: 7540023873,
                success: 8421588849,
                cancelled: 4761180178,
                delivering: 5881112074,
                error: 8356958357,
                holding: 3397246970,
                toBeDelivered: 3057501815,
                waiting: 6703729123,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'gfptbsxoh8uzkeon5cv6vochtfr6qxs97a4s5w8d2n5dig86ny',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: '51qgfi0il2oua2lxm5vt',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:40:45',
                executionMonitoringStartAt: '2020-07-27 14:17:58',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 1096029558,
                numberDays: 9134924082,
                success: 8487033692,
                cancelled: 5094544712,
                delivering: 2472620228,
                error: 5212087570,
                holding: 4149203094,
                toBeDelivered: 5677890184,
                waiting: 1762927302,
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
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: 'qf7c30ckc4llh1z1bnogrh9pwjjt8usix14fnxgdb4o4wcw6no',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: 'x5gajdaxd1mkw2wyazrl',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 17:58:28',
                executionMonitoringStartAt: '2020-07-27 08:19:13',
                executionMonitoringEndAt: '2020-07-27 12:02:47',
                numberMax: 4317533957,
                numberDays: 2708375024,
                success: 9972542301,
                cancelled: 7254818611,
                delivering: 6272006118,
                error: 7751688601,
                holding: 2138204471,
                toBeDelivered: 8628006337,
                waiting: 2247740951,
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
                        value   : '9f529621-327b-48ca-8d25-ba21cf802e2d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9f529621-327b-48ca-8d25-ba21cf802e2d'));
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
            .get('/bplus-it-sappi/message-overview/9f529621-327b-48ca-8d25-ba21cf802e2d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9f529621-327b-48ca-8d25-ba21cf802e2d'));
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
                
                id: '1069bed4-f20c-4d20-8c6f-f5250fbfb34e',
                tenantId: 'd52b94ec-3001-4976-a951-b6efb3f2a101',
                tenantCode: '0ur798l3bpqtndi20umnm8b22prrnuxc79290jsiycbxqjzlg7',
                systemId: '4efbee98-887a-4d27-a650-7e86b7cc59a5',
                systemName: '4gnmblth2u2i9jrg5nzb',
                executionId: 'c263e4f8-8afc-4b20-9054-03deddd96497',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:08:04',
                executionMonitoringStartAt: '2020-07-27 14:36:58',
                executionMonitoringEndAt: '2020-07-27 14:45:23',
                numberMax: 1578248707,
                numberDays: 8917418655,
                success: 7057846697,
                cancelled: 3228954793,
                delivering: 5492991844,
                error: 1030271681,
                holding: 2212545548,
                toBeDelivered: 8420590817,
                waiting: 4141717185,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                tenantCode: '4nfks9puhgt4mid3dvd92g0yc60z8b5p4guwjyoqk4wfgp5h7v',
                systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                systemName: '3d21zl62ku8lnpdoolo0',
                executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:18:15',
                executionMonitoringStartAt: '2020-07-27 02:49:41',
                executionMonitoringEndAt: '2020-07-27 15:40:25',
                numberMax: 4395061640,
                numberDays: 5368169566,
                success: 6926963846,
                cancelled: 4881798811,
                delivering: 3289390418,
                error: 7451618947,
                holding: 2230709899,
                toBeDelivered: 6882556655,
                waiting: 7765930461,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9f529621-327b-48ca-8d25-ba21cf802e2d'));
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
            .delete('/bplus-it-sappi/message-overview/9f529621-327b-48ca-8d25-ba21cf802e2d')
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
                        id: '28996684-6b11-4505-b4a9-321932fe9297',
                        tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                        tenantCode: 'm98k4ybelc7e5ndlk4fdnhkxgzwxd6mfgv4h0z9gdrtzd3bvgs',
                        systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                        systemName: 'opsw54g3wyv4zmbyvu8s',
                        executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-26 20:24:12',
                        executionMonitoringStartAt: '2020-07-26 19:17:47',
                        executionMonitoringEndAt: '2020-07-27 02:03:52',
                        numberMax: 9696350967,
                        numberDays: 2514571739,
                        success: 1062094067,
                        cancelled: 8024395267,
                        delivering: 4039649376,
                        error: 6899675597,
                        holding: 9141152474,
                        toBeDelivered: 5734241365,
                        waiting: 4766630453,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', '28996684-6b11-4505-b4a9-321932fe9297');
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
                            value   : '9f529621-327b-48ca-8d25-ba21cf802e2d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('9f529621-327b-48ca-8d25-ba21cf802e2d');
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
                    id: '9f529621-327b-48ca-8d25-ba21cf802e2d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('9f529621-327b-48ca-8d25-ba21cf802e2d');
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
                        
                        id: '1ad2d036-e5a3-423f-ac94-85ca6f17e79d',
                        tenantId: '1eafcfcb-d442-4430-9c6f-54226af170fe',
                        tenantCode: 'h0otchr4lxjixz7xgdw6v018ll4jakaf0c04u9ekvmxgo037dc',
                        systemId: '617fc4af-2c07-4708-ad93-55ea6ae16604',
                        systemName: '3xwxbccfihny6fa5f91f',
                        executionId: '00a85cde-f124-45e5-a76f-e4927b5ca220',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 01:42:15',
                        executionMonitoringStartAt: '2020-07-26 18:45:07',
                        executionMonitoringEndAt: '2020-07-27 07:23:28',
                        numberMax: 1116465196,
                        numberDays: 3823994447,
                        success: 9393983563,
                        cancelled: 7598724505,
                        delivering: 4909230834,
                        error: 3874308310,
                        holding: 1765421094,
                        toBeDelivered: 1679927476,
                        waiting: 9091357576,
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
                        
                        id: '9f529621-327b-48ca-8d25-ba21cf802e2d',
                        tenantId: '0e670c2d-e3e8-4010-ab6c-f00964007c97',
                        tenantCode: 'i5uxw8ppfqy9014lqgrrhe3u8r2818wtzfkkq1u3gmecwo7qkr',
                        systemId: '576848f2-ddbb-4647-8666-436c06122e29',
                        systemName: '2lmj4cf4cz6i2udlxe4n',
                        executionId: '91af5550-828e-4c37-9930-501cae84a1ae',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 01:47:36',
                        executionMonitoringStartAt: '2020-07-27 05:47:15',
                        executionMonitoringEndAt: '2020-07-27 16:32:36',
                        numberMax: 5940907387,
                        numberDays: 1593434585,
                        success: 5249955777,
                        cancelled: 2348797411,
                        delivering: 4209009910,
                        error: 6475574029,
                        holding: 9445068325,
                        toBeDelivered: 1518941350,
                        waiting: 9119971614,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('9f529621-327b-48ca-8d25-ba21cf802e2d');
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
                    id: '9f529621-327b-48ca-8d25-ba21cf802e2d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('9f529621-327b-48ca-8d25-ba21cf802e2d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});