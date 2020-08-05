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
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'rdpqoxz2ai9aft8jqf7i4mvxka41bu6b3h5nmzmgi0w64pbib5',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: '2ni8gs9v7k7axrv4r078',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 11:02:41',
                executionMonitoringStartAt: '2020-08-04 10:53:41',
                executionMonitoringEndAt: '2020-08-04 12:32:57',
                numberMax: 8490361759,
                numberDays: 8711600394,
                success: 7494984916,
                cancelled: 4339935200,
                delivering: 8612843301,
                error: 7973279155,
                holding: 4668805380,
                toBeDelivered: 5488549992,
                waiting: 3132179322,
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
                
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: '2nozleun2s8mjq3jn9vupz2axukxs6le720hckc7dj12kce7j9',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: '96imh4uthpbbts66yiif',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 02:27:27',
                executionMonitoringStartAt: '2020-08-05 08:58:18',
                executionMonitoringEndAt: '2020-08-04 18:33:44',
                numberMax: 5181678841,
                numberDays: 8259283490,
                success: 9816699186,
                cancelled: 7118114046,
                delivering: 3848954463,
                error: 8051956886,
                holding: 3611894743,
                toBeDelivered: 9298251641,
                waiting: 7383438670,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: null,
                tenantCode: 'ogxi794dj6m2mq98x9sihnxwu8aytitadwo7x8sy1fnjvox0bh',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: '37lx5m7pol2s672hulvd',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 02:23:38',
                executionMonitoringStartAt: '2020-08-04 13:31:45',
                executionMonitoringEndAt: '2020-08-05 01:02:00',
                numberMax: 8110755980,
                numberDays: 8340805147,
                success: 3988177509,
                cancelled: 1729361901,
                delivering: 6453016604,
                error: 6849992450,
                holding: 7942256417,
                toBeDelivered: 5783313067,
                waiting: 8983124867,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                
                tenantCode: 'wag5v17q9zqgpakoej9jfhpeg8ept0q8vijdq6v3uv0t9wjebf',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'xnbnok03p3nvbwore743',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 14:33:21',
                executionMonitoringStartAt: '2020-08-04 13:44:31',
                executionMonitoringEndAt: '2020-08-04 10:33:37',
                numberMax: 7651612709,
                numberDays: 2362016449,
                success: 2967379577,
                cancelled: 3248506741,
                delivering: 1554424437,
                error: 1829831647,
                holding: 6297766807,
                toBeDelivered: 1047352256,
                waiting: 4895099611,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: null,
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'dmh22js7beq0g9edod90',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:22:50',
                executionMonitoringStartAt: '2020-08-04 09:25:58',
                executionMonitoringEndAt: '2020-08-04 15:56:41',
                numberMax: 9005679628,
                numberDays: 1019119184,
                success: 6439871224,
                cancelled: 3595005923,
                delivering: 4584166934,
                error: 1970826859,
                holding: 1363588939,
                toBeDelivered: 2513445266,
                waiting: 2497600723,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'e947unokzrer5vscpo0p',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 18:26:13',
                executionMonitoringStartAt: '2020-08-05 07:10:23',
                executionMonitoringEndAt: '2020-08-05 08:28:06',
                numberMax: 6431775172,
                numberDays: 1843694603,
                success: 1398423399,
                cancelled: 8069542111,
                delivering: 1986245967,
                error: 9410152440,
                holding: 3291623265,
                toBeDelivered: 3852865096,
                waiting: 6426585777,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'empot8j81e9mjmzujmc4ef0xcyukgn3th2xbqlkhc29gbdtwin',
                systemId: null,
                systemName: 'mnb4dqhuiuacms28uru7',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 03:51:59',
                executionMonitoringStartAt: '2020-08-04 13:43:05',
                executionMonitoringEndAt: '2020-08-04 09:36:50',
                numberMax: 6284511490,
                numberDays: 8617131735,
                success: 3793964869,
                cancelled: 7733011057,
                delivering: 8104544290,
                error: 2491600438,
                holding: 1423628009,
                toBeDelivered: 1164502170,
                waiting: 1379866252,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'll1kj4s9taodalwizff1q6npylmunmyphbgwuq8l1tynln8d13',
                
                systemName: 'qc7n89brpx7w6bp8k087',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 02:49:23',
                executionMonitoringStartAt: '2020-08-04 23:52:15',
                executionMonitoringEndAt: '2020-08-05 03:53:17',
                numberMax: 7297769008,
                numberDays: 7503551308,
                success: 1302737726,
                cancelled: 8601184447,
                delivering: 6806764577,
                error: 2043882810,
                holding: 2708936784,
                toBeDelivered: 7535537628,
                waiting: 9566438593,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'xmw8gc6x4inr3de6r2bxlpg95n9z7ln5dln4wy270k6k1tcnqa',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: null,
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 23:19:40',
                executionMonitoringStartAt: '2020-08-05 03:23:53',
                executionMonitoringEndAt: '2020-08-04 16:19:30',
                numberMax: 5167774018,
                numberDays: 5229347069,
                success: 4923893025,
                cancelled: 5942229325,
                delivering: 9899719841,
                error: 7207668875,
                holding: 1190683908,
                toBeDelivered: 4544810456,
                waiting: 8417100465,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'l3mnic6hqy7hl71gy3t2fd0mubb0efmsot5bibbtqptur8rfyd',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 14:01:23',
                executionMonitoringStartAt: '2020-08-04 21:37:21',
                executionMonitoringEndAt: '2020-08-04 22:20:49',
                numberMax: 7376008218,
                numberDays: 3974068858,
                success: 8492214662,
                cancelled: 3070735882,
                delivering: 9368440636,
                error: 9651917008,
                holding: 9800788993,
                toBeDelivered: 6775975812,
                waiting: 6581381652,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: '53mpan4x2hs6ga4o0x4ndv2qf5hcf2v55by88ax6kf4crdt9n1',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: '31vpsnpj9dt20s5pvdw0',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 10:24:21',
                executionMonitoringStartAt: '2020-08-05 04:57:39',
                executionMonitoringEndAt: '2020-08-04 16:41:56',
                numberMax: 3945544879,
                numberDays: 7533611971,
                success: 9643296374,
                cancelled: 4860216044,
                delivering: 5749079715,
                error: 2192990558,
                holding: 4619352191,
                toBeDelivered: 4240711564,
                waiting: 6138883583,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'ib9wvdnyzqb52c9aypmyqu85bv77hjjawuicm8x95ln45x907o',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'pg90nlkduwkogmqdmugi',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 16:51:03',
                executionMonitoringStartAt: '2020-08-04 14:05:33',
                executionMonitoringEndAt: '2020-08-05 08:39:26',
                numberMax: 5952909824,
                numberDays: 1154966645,
                success: 5398907498,
                cancelled: 8725675668,
                delivering: 6146529537,
                error: 1554848489,
                holding: 2004666989,
                toBeDelivered: 5894647998,
                waiting: 1867599729,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'tdkbm4qv3j0q7jgkeaf1fguxuetfdp469ectipvyy3vbo3qdhg',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'no4jqu7uyq8gto1gkktc',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: null,
                executionExecutedAt: '2020-08-04 14:41:16',
                executionMonitoringStartAt: '2020-08-04 15:57:05',
                executionMonitoringEndAt: '2020-08-04 23:12:44',
                numberMax: 4835938685,
                numberDays: 2591004148,
                success: 9890573100,
                cancelled: 1013752028,
                delivering: 9245004388,
                error: 7406118662,
                holding: 7717628837,
                toBeDelivered: 2346843560,
                waiting: 3549382612,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: '6w9uw6hoxxi4tqzrw0e95mkote2mpl839fhjg8vwllof6s6nln',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'ed1efbqm3ngiirfr3bp6',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                
                executionExecutedAt: '2020-08-04 17:35:32',
                executionMonitoringStartAt: '2020-08-04 22:20:55',
                executionMonitoringEndAt: '2020-08-04 15:40:31',
                numberMax: 4800080788,
                numberDays: 7834724440,
                success: 4917887423,
                cancelled: 6384978990,
                delivering: 6985172778,
                error: 7507266027,
                holding: 1801930949,
                toBeDelivered: 3660468814,
                waiting: 8968496172,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'pujrb5vjr21ldt5ygmwcovbkvje1twnejkcoj6eppebzar4vaw',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'xl6legy2g27i0spx5wxh',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-04 18:18:49',
                executionMonitoringEndAt: '2020-08-05 06:17:17',
                numberMax: 3056331374,
                numberDays: 1469070210,
                success: 9114459917,
                cancelled: 4298778821,
                delivering: 5110495842,
                error: 7271445210,
                holding: 5588365124,
                toBeDelivered: 3652618330,
                waiting: 5109677153,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'l969jxxsg2yq00rgz70392c1iisxlbs691zpalppis5eqt7sgj',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'zbsdna8d5vuz0byjxf49',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-08-05 08:45:22',
                executionMonitoringEndAt: '2020-08-04 23:26:52',
                numberMax: 4733278549,
                numberDays: 8210668439,
                success: 3636624260,
                cancelled: 7089383900,
                delivering: 6879115972,
                error: 4244906787,
                holding: 8815824187,
                toBeDelivered: 3901913921,
                waiting: 7534263713,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'g446pcf9e2rxn2s9ltyew4c6gcx5przw8f12ukzidd0a10d88l',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: '4bk2dcisdz93apvzvw6a',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:09:42',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-04 13:17:53',
                numberMax: 3628445043,
                numberDays: 6187539148,
                success: 1064935042,
                cancelled: 8605361056,
                delivering: 6347557938,
                error: 5114102229,
                holding: 6599966886,
                toBeDelivered: 8199924630,
                waiting: 4228911911,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: '9yeoubqmcj3cnzqb68iqv1hv8vqqjhf1l6ebo25knkc4gg7ilx',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'alonnkioykieygo2fe3g',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 06:29:51',
                
                executionMonitoringEndAt: '2020-08-04 22:04:22',
                numberMax: 2381194895,
                numberDays: 6717819220,
                success: 9408951015,
                cancelled: 6010103327,
                delivering: 9221052741,
                error: 5225212109,
                holding: 8604961942,
                toBeDelivered: 1602950600,
                waiting: 2872411473,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'hnbj05d7o9ueqkyuxjb219yuxxxmu3cpx6i60y77wdcrvn5xhq',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'hnrkyx85c9pvwtxjpoa2',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 10:06:03',
                executionMonitoringStartAt: '2020-08-05 04:25:35',
                executionMonitoringEndAt: null,
                numberMax: 8245056987,
                numberDays: 2126370475,
                success: 9891728957,
                cancelled: 5998197068,
                delivering: 7505600114,
                error: 9614189723,
                holding: 3950902118,
                toBeDelivered: 2987184950,
                waiting: 2369984713,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'uue211ksvmqq7m7qilz27q7ffkx5co4a712jt0grl6usnsy6oh',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: '2tkw2ej6n0xbjhvzqlnw',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 12:45:37',
                executionMonitoringStartAt: '2020-08-05 04:17:58',
                
                numberMax: 8188281670,
                numberDays: 4986376256,
                success: 5922724929,
                cancelled: 9589507260,
                delivering: 7958289068,
                error: 1470569777,
                holding: 4025221296,
                toBeDelivered: 8642308184,
                waiting: 1687242688,
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
                id: 'v4r1b7y27tn3mllymmxqj9jva029kdojhdt78',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'd89zy8tmadlj99sfb3upgeg24k5q8xy62b5acimx536rcbjn9d',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'd1ith1zoag3hz8x6xmqh',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 17:10:31',
                executionMonitoringStartAt: '2020-08-04 12:49:27',
                executionMonitoringEndAt: '2020-08-05 08:03:56',
                numberMax: 8017676386,
                numberDays: 2507434792,
                success: 4815281935,
                cancelled: 4876025010,
                delivering: 3732499694,
                error: 7540505100,
                holding: 8368573348,
                toBeDelivered: 5245141944,
                waiting: 4540488867,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: '0tj98dg5zhy44y9apsxley5508aodgpj4k469',
                tenantCode: 'r1ru9pckvue1hlgxc97j6gx0evezvm41v38z701kl5q6fyw08a',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: '3hjofpqu8nk1y4fxdgno',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 07:26:14',
                executionMonitoringStartAt: '2020-08-04 11:22:23',
                executionMonitoringEndAt: '2020-08-04 22:46:36',
                numberMax: 8878447396,
                numberDays: 8117660980,
                success: 2818371523,
                cancelled: 4958979705,
                delivering: 2194153126,
                error: 3968479058,
                holding: 8112306087,
                toBeDelivered: 9848822542,
                waiting: 4438772537,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: '2w36hd4uo3isiy5mnmnm0mk1708safzvtgi5e8oyjk4ntevrhy',
                systemId: 'yz19pei4y9ela7rjp22x712f3d5sp0brzv1u5',
                systemName: 'dw1fbz3fc54w4f0kdu5f',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 02:49:07',
                executionMonitoringStartAt: '2020-08-04 20:30:48',
                executionMonitoringEndAt: '2020-08-04 14:32:38',
                numberMax: 6020073070,
                numberDays: 6171858403,
                success: 7260640284,
                cancelled: 9043741816,
                delivering: 6738551812,
                error: 2856209284,
                holding: 1375509921,
                toBeDelivered: 9508703849,
                waiting: 3467898094,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'jtouju97031yyyrsbphw36bhez94o24rkb11hpvyajxd60fpt6',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: '7xsvqmjz68imso0b0db7',
                executionId: '4q5a3w8kckti4icl3yinkrla9vhzb8biz8eia',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 03:29:23',
                executionMonitoringStartAt: '2020-08-05 07:19:49',
                executionMonitoringEndAt: '2020-08-04 18:31:19',
                numberMax: 3024151822,
                numberDays: 5197298600,
                success: 3462537207,
                cancelled: 5386689869,
                delivering: 4249211264,
                error: 5260530608,
                holding: 5532927492,
                toBeDelivered: 3912690879,
                waiting: 9020498263,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'd4h8wz23ob117g7i3lcfek2xruev56zymbtp8ahtwpdsla12vd0',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: '169lxzobxlwf6z56pn9d',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 19:37:06',
                executionMonitoringStartAt: '2020-08-05 05:39:06',
                executionMonitoringEndAt: '2020-08-04 18:49:51',
                numberMax: 4588929471,
                numberDays: 3999837158,
                success: 7962304308,
                cancelled: 5625974844,
                delivering: 9861252251,
                error: 3260092883,
                holding: 4179750096,
                toBeDelivered: 9515937346,
                waiting: 5017006953,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'xdehah5h6dcb3plbnen7obk4nsuq1tm81pwsr44helg3osk4k6',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'a3gtp8ju96f7xhtir0pum',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 03:31:31',
                executionMonitoringStartAt: '2020-08-04 14:10:08',
                executionMonitoringEndAt: '2020-08-05 02:39:38',
                numberMax: 2697917738,
                numberDays: 9695727537,
                success: 8348486118,
                cancelled: 8021229085,
                delivering: 8769949455,
                error: 9381452513,
                holding: 4144746748,
                toBeDelivered: 6100448052,
                waiting: 8591773880,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'nmujm93jme92tlw8cf37kz7p6m0drcod53ysbmciaadc028wr1',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'qu1myhcj9x1s8lfiybzt',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 09:22:27',
                executionMonitoringStartAt: '2020-08-04 13:32:00',
                executionMonitoringEndAt: '2020-08-05 03:18:51',
                numberMax: 96568343901,
                numberDays: 1009439017,
                success: 3316719109,
                cancelled: 6024750386,
                delivering: 3147653283,
                error: 3485046222,
                holding: 4232750789,
                toBeDelivered: 5572575879,
                waiting: 9739235779,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'dwvnvqlicx0qddkhjm4ezxhshcb9x5zl22h6hyzeawek2eqv72',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'vfpz4ppm6du3l3f9n6wh',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 06:21:26',
                executionMonitoringStartAt: '2020-08-04 09:19:07',
                executionMonitoringEndAt: '2020-08-04 09:26:31',
                numberMax: 8514847337,
                numberDays: 75871497908,
                success: 6413017475,
                cancelled: 5369969050,
                delivering: 5524962133,
                error: 9605780755,
                holding: 6961634254,
                toBeDelivered: 3509765615,
                waiting: 5717583380,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: '4owyfv4nk7raub3m3s3bzpjb2xg62jagur2quaiex2c7fuqar1',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'pb5nd5kfe5vd5xnvhskl',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 01:07:47',
                executionMonitoringStartAt: '2020-08-04 17:46:11',
                executionMonitoringEndAt: '2020-08-04 16:38:36',
                numberMax: 4446870078,
                numberDays: 1827234336,
                success: 42067473700,
                cancelled: 8044000705,
                delivering: 2113017552,
                error: 3525866874,
                holding: 1040236728,
                toBeDelivered: 5292987363,
                waiting: 7581009835,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'pf4qzgw6fffo59xsrj5d3d8c643azdacj1fjhfkreibp4sfzsh',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'c5khcfvdw7e0gtmsky9x',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 17:44:25',
                executionMonitoringStartAt: '2020-08-05 07:59:20',
                executionMonitoringEndAt: '2020-08-04 10:23:42',
                numberMax: 5582683070,
                numberDays: 3090524713,
                success: 8520345905,
                cancelled: 28501200285,
                delivering: 1554573462,
                error: 8669891347,
                holding: 3360175049,
                toBeDelivered: 5394182453,
                waiting: 1650845717,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'n0jsmapvpo7dyzbienqurdxtd3thzm7lciwsncftjoyfgky0z9',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'rny62i9fyi6mdo81o6zi',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 12:38:05',
                executionMonitoringStartAt: '2020-08-05 00:11:33',
                executionMonitoringEndAt: '2020-08-04 10:43:40',
                numberMax: 8496933086,
                numberDays: 5311407973,
                success: 7101807722,
                cancelled: 1728529557,
                delivering: 36845746790,
                error: 3769428107,
                holding: 8931051609,
                toBeDelivered: 9609676745,
                waiting: 5323192467,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'zu7l9n38zuhitl9uo8aaj2yuyslia7ini3f3n2s9i5jo4e45pu',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'jwhussxvlegn47n35ah9',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 14:52:42',
                executionMonitoringStartAt: '2020-08-04 13:29:09',
                executionMonitoringEndAt: '2020-08-04 21:54:45',
                numberMax: 3104369883,
                numberDays: 4162673350,
                success: 5567939163,
                cancelled: 6402469195,
                delivering: 7775136426,
                error: 48707883279,
                holding: 7299926524,
                toBeDelivered: 2050133917,
                waiting: 2399403431,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: '1qnbumltckbd2cyccqlxyw4yhuc0szy4t5w5je742r5zohvznh',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'qxdrrxdydahuo0pucqdf',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 18:53:17',
                executionMonitoringStartAt: '2020-08-04 12:04:00',
                executionMonitoringEndAt: '2020-08-04 17:47:39',
                numberMax: 6597488528,
                numberDays: 6716033557,
                success: 9159839691,
                cancelled: 3358221809,
                delivering: 2783448625,
                error: 6926444725,
                holding: 81881660266,
                toBeDelivered: 5993907244,
                waiting: 2045294805,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'qg9kiec7vou4zqs4s81gk8jkgxolws18nih9ghf88jr39691hu',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'cc3do1osuqhtldoxo3lu',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 03:39:23',
                executionMonitoringStartAt: '2020-08-05 08:22:06',
                executionMonitoringEndAt: '2020-08-04 10:20:40',
                numberMax: 3026119194,
                numberDays: 8709204838,
                success: 2783453145,
                cancelled: 5387631088,
                delivering: 9846017288,
                error: 9173418749,
                holding: 3771316680,
                toBeDelivered: 54558957334,
                waiting: 8891234674,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'wnbiife8p1ywbhc18vnbvss9ox66s5ry0eeioxsiltk8w5qbxk',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'qods5zv0rk921ylos3h9',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 15:49:10',
                executionMonitoringStartAt: '2020-08-05 08:44:29',
                executionMonitoringEndAt: '2020-08-05 07:48:39',
                numberMax: 6153933021,
                numberDays: 6729170170,
                success: 9317663045,
                cancelled: 7937239157,
                delivering: 7655146982,
                error: 6425292248,
                holding: 2839557728,
                toBeDelivered: 3561806692,
                waiting: 44556166031,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: '3oohj7gkfhk26mth3n80rac0xxgdxthdopf4n5czuw00tvfk7u',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'b9onknou8cowydhztyrk',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 16:22:01',
                executionMonitoringStartAt: '2020-08-05 08:27:46',
                executionMonitoringEndAt: '2020-08-04 18:42:13',
                numberMax: -9,
                numberDays: 6901342911,
                success: 3987427177,
                cancelled: 9138558234,
                delivering: 4083488824,
                error: 6386268553,
                holding: 8681800568,
                toBeDelivered: 3369981650,
                waiting: 2055803868,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'bnaya8p70bejtose8jnkye0cer7dsacq2ci0zw9l1cplk1ptfo',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'j520sz66e1fve7f7drfc',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 14:36:10',
                executionMonitoringStartAt: '2020-08-04 15:09:58',
                executionMonitoringEndAt: '2020-08-04 12:58:05',
                numberMax: 5558963518,
                numberDays: -9,
                success: 8929338893,
                cancelled: 8599242862,
                delivering: 3122787142,
                error: 5721526199,
                holding: 4646111105,
                toBeDelivered: 1642370768,
                waiting: 5747852151,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'a6xfrs2na8n4v9386kk8opetwle42hm41r74rqcsjjqc3jo58f',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'wmj6262bjdxb4nikq3sy',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 21:09:59',
                executionMonitoringStartAt: '2020-08-04 12:04:35',
                executionMonitoringEndAt: '2020-08-04 20:41:16',
                numberMax: 7646182237,
                numberDays: 4432854210,
                success: -9,
                cancelled: 4993550311,
                delivering: 2225602363,
                error: 5090463325,
                holding: 1874093622,
                toBeDelivered: 2754818473,
                waiting: 6341694081,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'd8qibdfaxvrp9ua4ibzi34kniispnrw12xk44iulxvr0okqcav',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'j163qeujczhz0a9d5fd3',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 21:47:59',
                executionMonitoringStartAt: '2020-08-04 18:38:51',
                executionMonitoringEndAt: '2020-08-04 14:36:58',
                numberMax: 9309736219,
                numberDays: 4680322673,
                success: 8819943211,
                cancelled: -9,
                delivering: 5614794478,
                error: 8529154406,
                holding: 2553358943,
                toBeDelivered: 3402445756,
                waiting: 7436902386,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'lwjslhkp16th51chvbm8fms12qbn8zsxs1ci9oh1nc03y5wi0c',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'l57zklsdiccam5ebd7ve',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 05:22:53',
                executionMonitoringStartAt: '2020-08-05 05:48:24',
                executionMonitoringEndAt: '2020-08-05 00:05:31',
                numberMax: 7766827793,
                numberDays: 4422108423,
                success: 4346312156,
                cancelled: 2433885431,
                delivering: -9,
                error: 8230622595,
                holding: 1465947885,
                toBeDelivered: 6447854419,
                waiting: 8520989457,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: '4aio2veyeovs06z7w592zpgaswaa46npydj459o8c2ss1ary99',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'svtuvqd8eqew1rl9cn5j',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 15:02:48',
                executionMonitoringStartAt: '2020-08-05 03:45:27',
                executionMonitoringEndAt: '2020-08-05 00:20:25',
                numberMax: 9479234969,
                numberDays: 3163348235,
                success: 8085375926,
                cancelled: 9625547533,
                delivering: 3617077967,
                error: -9,
                holding: 4417216754,
                toBeDelivered: 9199660758,
                waiting: 3737548107,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'hzljnldske9de61a1ybvq6ryed9gck2luogbeighy6uwnqvj8y',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'wjpv2a7arn7oas4rbefc',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 20:40:39',
                executionMonitoringStartAt: '2020-08-05 05:17:34',
                executionMonitoringEndAt: '2020-08-04 13:52:00',
                numberMax: 2932880760,
                numberDays: 1202178808,
                success: 8742624330,
                cancelled: 7592654521,
                delivering: 4636425260,
                error: 1716708546,
                holding: -9,
                toBeDelivered: 4674656506,
                waiting: 4369307427,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'lnhr74gwsgckd2vas7dxw4s0bhlwldmdiu7fzjwubf5j6d1dnc',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'k5qymb4x2dnzfh5x9cz0',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 21:41:23',
                executionMonitoringStartAt: '2020-08-04 14:53:05',
                executionMonitoringEndAt: '2020-08-05 07:51:45',
                numberMax: 5866558930,
                numberDays: 4635689073,
                success: 3450199715,
                cancelled: 9977009032,
                delivering: 6316556884,
                error: 1355154927,
                holding: 9478090858,
                toBeDelivered: -9,
                waiting: 2744306817,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'ytxtjcvv8prsnznbeicdwsqrb06xsf5oi4rlfo27ip49yvntiv',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'p3o5qh3yd03968dff8al',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 22:43:08',
                executionMonitoringStartAt: '2020-08-04 09:50:07',
                executionMonitoringEndAt: '2020-08-04 19:25:49',
                numberMax: 9524375359,
                numberDays: 5292464642,
                success: 5691337044,
                cancelled: 4171192504,
                delivering: 2668751715,
                error: 8607036091,
                holding: 6513384078,
                toBeDelivered: 5856725008,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'c6r443iahh9hcjj34rblxttgozjsit6x3lbgmabgn7ozmxezn6',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'giqywzrdjyd8kboez4kc',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-04 22:09:16',
                executionMonitoringStartAt: '2020-08-05 05:13:00',
                executionMonitoringEndAt: '2020-08-04 13:45:05',
                numberMax: 5045733998,
                numberDays: 1964606994,
                success: 3126516813,
                cancelled: 1174563677,
                delivering: 7188189363,
                error: 6155726235,
                holding: 9715154587,
                toBeDelivered: 9309220173,
                waiting: 6877317265,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: '0oagr2pkujiun4wp75bytpw9amfr3udryu6edrjd46rcichpsc',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'feddkh66abtkxk54e66d',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-05 06:04:39',
                executionMonitoringEndAt: '2020-08-05 07:39:07',
                numberMax: 3920370401,
                numberDays: 2695881518,
                success: 9788347535,
                cancelled: 5929198796,
                delivering: 7351083373,
                error: 1922628548,
                holding: 7377730963,
                toBeDelivered: 6191410439,
                waiting: 5240011729,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'kerc8b85sbefbj6b5u8ptge5ie8u2quc8tim8v88mwpd8w3hld',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: '1hfily583s7mtguziglx',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 04:18:41',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-04 18:05:52',
                numberMax: 6644032765,
                numberDays: 1955832916,
                success: 4565997819,
                cancelled: 7021962462,
                delivering: 7604846852,
                error: 9844959647,
                holding: 8515393645,
                toBeDelivered: 4153657104,
                waiting: 1585798324,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: 'k1cq7p14k0vsh140i10pywyfsd1xvr8nc0upi4vsixvgi91u8p',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'bi3pjj5tvref00fbu48l',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 20:54:35',
                executionMonitoringStartAt: '2020-08-04 13:54:01',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 2329583692,
                numberDays: 7483939354,
                success: 5233032116,
                cancelled: 1751123487,
                delivering: 5104948271,
                error: 4300502434,
                holding: 5149362724,
                toBeDelivered: 7752048050,
                waiting: 9448657211,
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
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: '7uykue88sahsns2tynas8fk5zrt6hfey2qxh5wde31y6lq4fd8',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'ipdedpme7rfpsbxnmlvo',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 23:43:50',
                executionMonitoringStartAt: '2020-08-04 10:23:02',
                executionMonitoringEndAt: '2020-08-04 14:56:59',
                numberMax: 5625017025,
                numberDays: 2793034309,
                success: 5169282312,
                cancelled: 2735126865,
                delivering: 4693424540,
                error: 1951646967,
                holding: 3816214465,
                toBeDelivered: 6208363753,
                waiting: 9909837247,
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
                        value   : '1cc80a10-8fb3-458a-924c-4f8bdf837231'
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
                        value   : '095d06c8-a1f8-41b4-bfd4-e746de896e6c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '095d06c8-a1f8-41b4-bfd4-e746de896e6c'));
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/43042a84-e018-448d-89f1-47f35d04e1d6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/095d06c8-a1f8-41b4-bfd4-e746de896e6c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '095d06c8-a1f8-41b4-bfd4-e746de896e6c'));
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
                
                id: '60c366ee-0453-4145-8036-81e2714dc3d9',
                tenantId: 'cc2224a9-0975-472f-bb39-49496ba1d60e',
                tenantCode: 'gf5vld8nvl0ew6hbhex5erzu8d9wd07nq5gxrzlxgdv1n701om',
                systemId: '4ddff02d-f13d-4be1-80d2-a0ad1e03136a',
                systemName: '6fdlzebwjuyksrp626fv',
                executionId: '96e190dc-d7a6-47ea-a4d1-350b5d933802',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 05:15:09',
                executionMonitoringStartAt: '2020-08-04 18:58:56',
                executionMonitoringEndAt: '2020-08-04 09:26:34',
                numberMax: 7648083508,
                numberDays: 6200289008,
                success: 3539336754,
                cancelled: 7640906408,
                delivering: 8484210864,
                error: 1021143363,
                holding: 3394706409,
                toBeDelivered: 2535783995,
                waiting: 3429171740,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                tenantCode: '490hzg3a1zlfpi647teuqd5olvdr56n8541xkamk0wn5iae72y',
                systemId: '1dc7077f-f142-4793-880a-d864235084df',
                systemName: 'h0640lpzx0u6gx2eirg5',
                executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 08:56:42',
                executionMonitoringStartAt: '2020-08-04 11:23:23',
                executionMonitoringEndAt: '2020-08-04 22:37:48',
                numberMax: 3706406351,
                numberDays: 1573316564,
                success: 2019764341,
                cancelled: 5024064001,
                delivering: 2588778892,
                error: 8615393850,
                holding: 4325953843,
                toBeDelivered: 4167094318,
                waiting: 8379507840,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '095d06c8-a1f8-41b4-bfd4-e746de896e6c'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/9c08f6e3-7656-4c3c-ad29-4766e601973c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/095d06c8-a1f8-41b4-bfd4-e746de896e6c')
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
                        id: 'f6b55fd5-1045-4055-8477-c2d85481948e',
                        tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                        tenantCode: 'dyr83kcmdiexf9zsrpt0f6t7x7djzkvzmc84szkv4f3nc3z2wm',
                        systemId: '1dc7077f-f142-4793-880a-d864235084df',
                        systemName: '32sduh9i3ljaaqnedhl6',
                        executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 23:56:42',
                        executionMonitoringStartAt: '2020-08-04 11:33:10',
                        executionMonitoringEndAt: '2020-08-05 06:59:39',
                        numberMax: 4435413470,
                        numberDays: 4475632899,
                        success: 4645005529,
                        cancelled: 5617004956,
                        delivering: 3922828610,
                        error: 2928126229,
                        holding: 4087091894,
                        toBeDelivered: 5723740116,
                        waiting: 8166516056,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', 'f6b55fd5-1045-4055-8477-c2d85481948e');
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
                            value   : '994d2f42-7adb-4b93-9b99-06794870f5c9'
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
                            value   : '095d06c8-a1f8-41b4-bfd4-e746de896e6c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('095d06c8-a1f8-41b4-bfd4-e746de896e6c');
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
                    id: '140b15fc-348a-47e4-a76a-1c3aed0840c6'
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
                    id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('095d06c8-a1f8-41b4-bfd4-e746de896e6c');
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
                        
                        id: '92ad489c-17b1-45cb-9320-94066949e94b',
                        tenantId: '521ba034-e02e-4cf6-bc75-658590f3de95',
                        tenantCode: 'wpfhgj0oeg0gbv8nvf5xkg3bq1k6nlnopt60akk62sd4n5oejk',
                        systemId: 'ce67e0db-23de-4141-b09b-8402d1109649',
                        systemName: '2hqbxn6g1mrfl6mw2xk9',
                        executionId: '4da1faff-c631-48cb-bd15-4eaef03939df',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-05 06:40:39',
                        executionMonitoringStartAt: '2020-08-04 23:32:23',
                        executionMonitoringEndAt: '2020-08-04 16:16:55',
                        numberMax: 1102685302,
                        numberDays: 4980174208,
                        success: 8158711491,
                        cancelled: 6593778171,
                        delivering: 2047454426,
                        error: 3692393690,
                        holding: 6824773026,
                        toBeDelivered: 7379720359,
                        waiting: 8525738595,
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
                        
                        id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c',
                        tenantId: 'e27260b5-ad33-4c3d-8f06-a77551d95628',
                        tenantCode: 'rm6m8l5owv5nxdbhjwk31mrg9uk0t1nobaxpyyd0qc36cehv34',
                        systemId: '1dc7077f-f142-4793-880a-d864235084df',
                        systemName: 'c7jdoxc3jp9oeunqcyod',
                        executionId: '13ef8125-de0d-4d20-8129-d5182b05a79c',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-04 15:04:27',
                        executionMonitoringStartAt: '2020-08-04 19:08:42',
                        executionMonitoringEndAt: '2020-08-05 05:44:17',
                        numberMax: 2881919089,
                        numberDays: 9662503517,
                        success: 3394460055,
                        cancelled: 7165561798,
                        delivering: 1691962688,
                        error: 8184974307,
                        holding: 9774198931,
                        toBeDelivered: 2094124735,
                        waiting: 8081172547,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('095d06c8-a1f8-41b4-bfd4-e746de896e6c');
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
                    id: '29b35ffd-45a8-4b7e-82a6-967e81b6fef2'
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
                    id: '095d06c8-a1f8-41b4-bfd4-e746de896e6c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('095d06c8-a1f8-41b4-bfd4-e746de896e6c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});