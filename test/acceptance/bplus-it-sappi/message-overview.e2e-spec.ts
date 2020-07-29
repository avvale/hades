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
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'zxotxbd5ewcdcoixm7gp454dt208fn18cb81h65kl71bwtqumw',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: '3yj0kh90thq11ijth28c',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:05:37',
                executionMonitoringStartAt: '2020-07-29 01:47:32',
                executionMonitoringEndAt: '2020-07-29 03:15:51',
                numberMax: 7385784921,
                numberDays: 2992493785,
                success: 3741400812,
                cancelled: 5004132528,
                delivering: 2833202992,
                error: 6107401069,
                holding: 5583086416,
                toBeDelivered: 2626188177,
                waiting: 6502338493,
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
                
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'kxfmji08wd96b10cz2tn9xv7znjxld1jmxzzb6v3gvfd2erzxf',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: '6cwrtc4vpuqc4zvilmvb',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:53:13',
                executionMonitoringStartAt: '2020-07-28 19:54:02',
                executionMonitoringEndAt: '2020-07-29 00:31:01',
                numberMax: 2870135066,
                numberDays: 6532998939,
                success: 6550240621,
                cancelled: 5944370737,
                delivering: 4240610923,
                error: 1946321739,
                holding: 9561089440,
                toBeDelivered: 5678933836,
                waiting: 7396875127,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: null,
                tenantCode: 'fpjz8c34yj0kyunjrr6nvd1a8yhvclr2v2440pwg71r04g169a',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'imw4azgibjwezpkpo2b1',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 14:27:45',
                executionMonitoringStartAt: '2020-07-29 03:47:10',
                executionMonitoringEndAt: '2020-07-28 15:52:03',
                numberMax: 4871279227,
                numberDays: 7477723072,
                success: 7257635908,
                cancelled: 5705967418,
                delivering: 1532017478,
                error: 9079898704,
                holding: 7853395343,
                toBeDelivered: 5396430149,
                waiting: 5967057559,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                
                tenantCode: 'vjqpcgjred898ttsqapn16meh4o8lpe199gjiaau7v4n339vqz',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'elo4gwizxqivfknirk14',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:57:48',
                executionMonitoringStartAt: '2020-07-29 12:59:45',
                executionMonitoringEndAt: '2020-07-29 10:34:10',
                numberMax: 9469489046,
                numberDays: 3420513056,
                success: 6877685626,
                cancelled: 5261936359,
                delivering: 8533791934,
                error: 3365574157,
                holding: 9983718364,
                toBeDelivered: 3171287362,
                waiting: 7284217710,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: null,
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'wckxmfve7h1t4n2im2ze',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:11:32',
                executionMonitoringStartAt: '2020-07-29 09:05:42',
                executionMonitoringEndAt: '2020-07-28 22:43:32',
                numberMax: 8507824227,
                numberDays: 5718357426,
                success: 3892538198,
                cancelled: 7387826017,
                delivering: 8104273869,
                error: 4453956847,
                holding: 4526672266,
                toBeDelivered: 7212878755,
                waiting: 9921447926,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: '0i60we4i52lk5zug8wqk',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:35:50',
                executionMonitoringStartAt: '2020-07-29 12:05:43',
                executionMonitoringEndAt: '2020-07-29 09:14:07',
                numberMax: 4116005516,
                numberDays: 4206912636,
                success: 2834119434,
                cancelled: 7179243895,
                delivering: 9712554550,
                error: 2549204716,
                holding: 6881033465,
                toBeDelivered: 5812351838,
                waiting: 5249022850,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'yegtt0pzhtlnp7owvpcufa9hwtizp1k22ujqgvs3hzt2frjhn5',
                systemId: null,
                systemName: 'snq5f9zjajqfni3whfjt',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:52:10',
                executionMonitoringStartAt: '2020-07-29 00:19:36',
                executionMonitoringEndAt: '2020-07-29 02:43:03',
                numberMax: 7375313728,
                numberDays: 9956833926,
                success: 2108050937,
                cancelled: 8766902943,
                delivering: 2397418981,
                error: 5768125938,
                holding: 2870990543,
                toBeDelivered: 9836393069,
                waiting: 1400900951,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'clb7tqop90fd3mw3zfvpxlm3dhefa6ryhpwfo0rb76ckvxsltn',
                
                systemName: 'inzhgzpnwsxf911exyva',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:45:16',
                executionMonitoringStartAt: '2020-07-28 16:58:45',
                executionMonitoringEndAt: '2020-07-28 19:37:44',
                numberMax: 4314649955,
                numberDays: 5742529697,
                success: 7473067688,
                cancelled: 6499245848,
                delivering: 7594537689,
                error: 9331387297,
                holding: 6870415627,
                toBeDelivered: 9510755118,
                waiting: 6016532144,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: '93cl2xcma6oqfhzu0v7xq9rntsw0bbi835gz2wvs17alfsu82k',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: null,
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:30:54',
                executionMonitoringStartAt: '2020-07-28 15:58:46',
                executionMonitoringEndAt: '2020-07-29 06:02:56',
                numberMax: 9888368883,
                numberDays: 4339968630,
                success: 6777858050,
                cancelled: 4081077823,
                delivering: 6861449484,
                error: 4254609238,
                holding: 4106590951,
                toBeDelivered: 2464955162,
                waiting: 7410569431,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'wfn7xkdk6lvims8mzq5fxrwka3awbyovqqenupn3728cvsga1m',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:17:10',
                executionMonitoringStartAt: '2020-07-28 19:21:22',
                executionMonitoringEndAt: '2020-07-29 12:29:46',
                numberMax: 5747534794,
                numberDays: 3469391401,
                success: 2532421022,
                cancelled: 9336360874,
                delivering: 6337148887,
                error: 3069638878,
                holding: 7257316949,
                toBeDelivered: 7050549790,
                waiting: 5291554171,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'f8twc6zp2833bvusf00do4h885qbmzsg2y05bouoldxlgqchxw',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: '2vtqd199pzm01yaui583',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:00:25',
                executionMonitoringStartAt: '2020-07-28 20:09:44',
                executionMonitoringEndAt: '2020-07-28 22:41:05',
                numberMax: 6170770434,
                numberDays: 8322541264,
                success: 8319506547,
                cancelled: 9453922562,
                delivering: 4489716214,
                error: 5057011590,
                holding: 1370252244,
                toBeDelivered: 4223239684,
                waiting: 1856686065,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'bnljcabef64w4x2o619m3xo7d5cb0boa6s6wmaug2hebsxusje',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'xqagbdi0wbake0satztw',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:42:52',
                executionMonitoringStartAt: '2020-07-29 06:45:51',
                executionMonitoringEndAt: '2020-07-28 20:37:12',
                numberMax: 3615061756,
                numberDays: 4321528599,
                success: 4338168219,
                cancelled: 7792436577,
                delivering: 7067794299,
                error: 3961719038,
                holding: 1395213790,
                toBeDelivered: 4683791156,
                waiting: 5047143411,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: '2stuxvw27y6hhjvnhfudul93jwdydhobtrdygl0bru11umw6qg',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: '6rmub65o4sqbwg6hh6xg',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: null,
                executionExecutedAt: '2020-07-28 20:35:32',
                executionMonitoringStartAt: '2020-07-29 03:02:44',
                executionMonitoringEndAt: '2020-07-29 08:30:51',
                numberMax: 5606177493,
                numberDays: 2975317959,
                success: 4345470907,
                cancelled: 7435662068,
                delivering: 7353152543,
                error: 8215120584,
                holding: 1232107099,
                toBeDelivered: 5909803182,
                waiting: 3967436032,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'um33qmsnjusjg4t9yu0mafziy5cp6kpza0j9mpyesxo40ntz2v',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'rpea99bww2dvwa3drcza',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                
                executionExecutedAt: '2020-07-29 05:58:14',
                executionMonitoringStartAt: '2020-07-29 06:57:01',
                executionMonitoringEndAt: '2020-07-29 01:34:36',
                numberMax: 7406817165,
                numberDays: 8942558423,
                success: 3132183882,
                cancelled: 4169271917,
                delivering: 4709702197,
                error: 4078923168,
                holding: 5081993055,
                toBeDelivered: 3356818842,
                waiting: 5079573674,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'pmyy0bx8efq2l0koocisd6td0r7wgkjwanove20sznmm1zbmz6',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'ryp1642i3oer8aqhwszr',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 08:45:20',
                executionMonitoringEndAt: '2020-07-29 01:11:41',
                numberMax: 6272295184,
                numberDays: 7131181663,
                success: 1772922710,
                cancelled: 6748653155,
                delivering: 9294561182,
                error: 4125770280,
                holding: 5147778232,
                toBeDelivered: 5218108083,
                waiting: 9732525801,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'jct72g8jl01trhovh4481g7mn2eoi64rp8vyz9gtyusrhspycp',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'dsjzimnhy21uoxc81iwq',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 08:38:58',
                executionMonitoringEndAt: '2020-07-28 23:12:14',
                numberMax: 5528395927,
                numberDays: 3875759649,
                success: 6819590460,
                cancelled: 2482294776,
                delivering: 6295128093,
                error: 9543651437,
                holding: 5623274217,
                toBeDelivered: 8142234158,
                waiting: 9592446641,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'wbqf7yeuyo6c7qnhuszxxcqcydmc4wv7xzpj6bq33szglm8aof',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: '64y3156hk9h02bw5bys0',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:40:15',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 12:57:14',
                numberMax: 9974699649,
                numberDays: 2689811539,
                success: 9622727160,
                cancelled: 5369618595,
                delivering: 5980887909,
                error: 3893387526,
                holding: 5439803324,
                toBeDelivered: 1530830768,
                waiting: 9007637995,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: '9uvbapxjl05cmk5u7v8xhptfmu6yf3zzro04ez2iiyi6pjaebo',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'pjbk2i2ti0cyt03gbwco',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 15:02:48',
                
                executionMonitoringEndAt: '2020-07-29 09:15:40',
                numberMax: 7628358401,
                numberDays: 7291897730,
                success: 5343472140,
                cancelled: 3281237582,
                delivering: 1425865286,
                error: 2006207445,
                holding: 2448402765,
                toBeDelivered: 3422814128,
                waiting: 6001465678,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'b8hj65lrzqxnxwh8701su3gtld88afv7n3icvpe5zne9060xl5',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: '3z686wal3yn6ldalc2mi',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:38:19',
                executionMonitoringStartAt: '2020-07-28 15:31:08',
                executionMonitoringEndAt: null,
                numberMax: 3058706500,
                numberDays: 1218781814,
                success: 2659697376,
                cancelled: 1398866082,
                delivering: 5315329233,
                error: 8616268390,
                holding: 4534744618,
                toBeDelivered: 1935473663,
                waiting: 7626096705,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'tnbaqs5kdd430by9u3wulvet0xnha5v931lfk9k366j35kn3fh',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'ehrom6p1i3nz41et0zvf',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:42:11',
                executionMonitoringStartAt: '2020-07-28 22:42:49',
                
                numberMax: 6702951885,
                numberDays: 8963033065,
                success: 3100744168,
                cancelled: 8416708160,
                delivering: 2748950316,
                error: 4229894338,
                holding: 9673527540,
                toBeDelivered: 1572075206,
                waiting: 6310780764,
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
                id: 'l01kyx8095x6fgg8muumqcvs149xgav7ue8v9',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'h7ixslzqe0esjenjzhsk7t5oujigz78f9txbkf86goj1qeztjx',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'irrme4aebnxm1hsczaqz',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:32:16',
                executionMonitoringStartAt: '2020-07-28 17:52:41',
                executionMonitoringEndAt: '2020-07-29 04:45:12',
                numberMax: 6215775917,
                numberDays: 9354533059,
                success: 1747988083,
                cancelled: 4069237491,
                delivering: 1453869689,
                error: 7733568072,
                holding: 8627997968,
                toBeDelivered: 3450883653,
                waiting: 7302536918,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '1xy6wr0rz265h2ync53sgss8una8z3rco5rez',
                tenantCode: 'mie6riefccvbx7un5c6fr095h2wumuha8oz93fw27wl1qln84z',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'gc98jju0vpc3ryu9u128',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 14:40:46',
                executionMonitoringStartAt: '2020-07-29 12:11:45',
                executionMonitoringEndAt: '2020-07-29 01:05:39',
                numberMax: 9309356600,
                numberDays: 6864831318,
                success: 1974662524,
                cancelled: 6771816717,
                delivering: 4331363549,
                error: 9907051833,
                holding: 7084280074,
                toBeDelivered: 6078115553,
                waiting: 1475199665,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'ilokql1yvhzifk2vbksnwsbid799hxdhiehdqd2fnc056fj8jx',
                systemId: '3j5zkbl3xcivni2awd6ftf8pp1pdku9p4kecr',
                systemName: 'u0hbk7j0znnvtilz4tdq',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:17:34',
                executionMonitoringStartAt: '2020-07-28 21:43:06',
                executionMonitoringEndAt: '2020-07-29 07:27:48',
                numberMax: 5127330897,
                numberDays: 5063871635,
                success: 2866988280,
                cancelled: 5731110662,
                delivering: 3554779389,
                error: 4967296923,
                holding: 8224367930,
                toBeDelivered: 1038265184,
                waiting: 4564059965,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: '5i2ds5rcs2nvkb9wrcnnc1vco5sa2rwnyzrjb1pf4ap85kc1wc',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: '3ibltm1o4llbq10rar09',
                executionId: 'n37crfxzn9w2laxasqam9r6cyfv3kqpoa1f6f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:14:46',
                executionMonitoringStartAt: '2020-07-28 14:15:12',
                executionMonitoringEndAt: '2020-07-29 02:55:19',
                numberMax: 4693678114,
                numberDays: 9375884600,
                success: 5934207845,
                cancelled: 3513190305,
                delivering: 8275512362,
                error: 8700971114,
                holding: 1179840039,
                toBeDelivered: 5052693020,
                waiting: 7150688125,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'lb71tzwaozmcolr8lre0nc06v8tblf18j4emjzaah1jr7zx7kwr',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'bjpgo8lwvvglzuw9gb2d',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:22:51',
                executionMonitoringStartAt: '2020-07-29 08:26:35',
                executionMonitoringEndAt: '2020-07-29 01:59:14',
                numberMax: 8394510406,
                numberDays: 6766239333,
                success: 2148473984,
                cancelled: 3986448565,
                delivering: 4349882902,
                error: 6750080694,
                holding: 1279121378,
                toBeDelivered: 9355261635,
                waiting: 3427500744,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'du9rqlvgijzfjb6a5m6yhia4nwwvxqii8i5mc4ot8rzxp3153i',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'vdhxkduttkgk98ml1a146',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:26:38',
                executionMonitoringStartAt: '2020-07-28 17:26:20',
                executionMonitoringEndAt: '2020-07-29 13:02:35',
                numberMax: 7774584488,
                numberDays: 3127439298,
                success: 1225953555,
                cancelled: 3324312716,
                delivering: 8198618269,
                error: 5814574863,
                holding: 8385139140,
                toBeDelivered: 6197394499,
                waiting: 9179487223,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'z2q9mqpjb4etq3d2rplxj4326xsn7y9zajv1525atqpplgljh0',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'cw7kxxmwiiawgqq754a7',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:14:51',
                executionMonitoringStartAt: '2020-07-28 21:30:02',
                executionMonitoringEndAt: '2020-07-28 21:38:25',
                numberMax: 33847980653,
                numberDays: 7283821413,
                success: 4086201513,
                cancelled: 3317334553,
                delivering: 4708467778,
                error: 6596271092,
                holding: 8459192301,
                toBeDelivered: 8166719261,
                waiting: 3014780087,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: '3blpfyz552ir2o0xw8uyq8qlu2dcp4ydkuw53bl16zfnrp2anx',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'bcr4wniiahx8kjo1u48m',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:44:10',
                executionMonitoringStartAt: '2020-07-28 16:00:47',
                executionMonitoringEndAt: '2020-07-29 09:54:04',
                numberMax: 6579152803,
                numberDays: 88800501181,
                success: 4860895118,
                cancelled: 6201064116,
                delivering: 9181875919,
                error: 2412711254,
                holding: 1958800521,
                toBeDelivered: 3572400963,
                waiting: 3912390831,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'wfabhbhs50e4uaksxgwpw8bixv84op16aj4bpdzvqsy47fe706',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'ewvzh10z5ioj4utcrnap',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:11:55',
                executionMonitoringStartAt: '2020-07-28 13:47:08',
                executionMonitoringEndAt: '2020-07-28 17:45:22',
                numberMax: 2743359008,
                numberDays: 1826581724,
                success: 17530958426,
                cancelled: 1152308730,
                delivering: 9498837696,
                error: 5637028116,
                holding: 9284652282,
                toBeDelivered: 6259088745,
                waiting: 6616231196,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: '44biplemv5oggne0sv7uft5idoj5miti8solvgtbd9mwf0j0op',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'wpstb7270metgrkumk03',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:10:05',
                executionMonitoringStartAt: '2020-07-29 12:12:21',
                executionMonitoringEndAt: '2020-07-28 15:56:33',
                numberMax: 4796922081,
                numberDays: 7709804522,
                success: 8838901809,
                cancelled: 98201950121,
                delivering: 5692488869,
                error: 9073468020,
                holding: 1355338424,
                toBeDelivered: 7614469401,
                waiting: 9980495283,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'vruhdz0pb55pjf5cnkxvlnhurry1r7y3z8zr4dt6jfie8p9ci6',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'r684d27lmkpu10209hy9',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 13:44:32',
                executionMonitoringStartAt: '2020-07-28 23:01:45',
                executionMonitoringEndAt: '2020-07-29 04:22:32',
                numberMax: 7012936766,
                numberDays: 3045761322,
                success: 2039763205,
                cancelled: 1014947581,
                delivering: 70629647066,
                error: 2805115532,
                holding: 8084063058,
                toBeDelivered: 6888834271,
                waiting: 3727057844,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'mmxz0bzke451v5zcrpwwrnisr42sn1eq1xvwl52ao526zx50d7',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'u9tibyqmiwfyo7s3khs9',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:09:17',
                executionMonitoringStartAt: '2020-07-29 04:18:54',
                executionMonitoringEndAt: '2020-07-28 20:56:33',
                numberMax: 6620227331,
                numberDays: 8943563031,
                success: 8836031395,
                cancelled: 3317050393,
                delivering: 6390390422,
                error: 73096321569,
                holding: 8639717645,
                toBeDelivered: 3560288813,
                waiting: 7555576508,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'xspokc75av0k896p94unkdnt8o2qaamg7ylnxfffrzzix140sq',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'cojktk8qi5lvqap3qezi',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:31:46',
                executionMonitoringStartAt: '2020-07-28 23:14:32',
                executionMonitoringEndAt: '2020-07-29 01:36:41',
                numberMax: 5307158373,
                numberDays: 2558823025,
                success: 2546563315,
                cancelled: 2897430273,
                delivering: 7140761639,
                error: 2921062125,
                holding: 96173018019,
                toBeDelivered: 1471316489,
                waiting: 4282904363,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'v3xbaav357vq93a250o0y6d5zh0as2ksc3umftgfly5xn888sy',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'i6xfhsvmq3g4ipoyya8m',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:10:23',
                executionMonitoringStartAt: '2020-07-29 12:38:28',
                executionMonitoringEndAt: '2020-07-28 23:58:22',
                numberMax: 1182012444,
                numberDays: 4021044960,
                success: 1912209936,
                cancelled: 2185300809,
                delivering: 3260671403,
                error: 1916263503,
                holding: 1074361932,
                toBeDelivered: 13427992613,
                waiting: 7223028250,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'o28qd0ydults0rpmpv7xxg8asgz39vxxevbh1egeks90k2mgbe',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'cjy9d42db5v24r2oxu7x',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:48:06',
                executionMonitoringStartAt: '2020-07-29 03:22:29',
                executionMonitoringEndAt: '2020-07-29 12:01:30',
                numberMax: 2750798748,
                numberDays: 5428445097,
                success: 1917942408,
                cancelled: 8497176203,
                delivering: 1312777521,
                error: 6787452252,
                holding: 6987621810,
                toBeDelivered: 9442096228,
                waiting: 46492057049,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'ki5vygpdwzqfeq11stqb91ex71luj4600iopdc094bsocuxouv',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'wglkxd7p40g00q1omdof',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:11:38',
                executionMonitoringStartAt: '2020-07-29 11:09:54',
                executionMonitoringEndAt: '2020-07-29 01:46:05',
                numberMax: -9,
                numberDays: 9345684632,
                success: 7431266532,
                cancelled: 2456183557,
                delivering: 7321128911,
                error: 1972469751,
                holding: 1845487737,
                toBeDelivered: 1516866023,
                waiting: 3760216605,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'gdtimdi6t4qn4x060ot1ia9r8u7fb5wviet14jm924sih0y502',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'edhq94bwd9foluhchckc',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:52:15',
                executionMonitoringStartAt: '2020-07-29 00:16:52',
                executionMonitoringEndAt: '2020-07-29 01:20:02',
                numberMax: 9399525041,
                numberDays: -9,
                success: 3969537589,
                cancelled: 3369759534,
                delivering: 8514896017,
                error: 4241940751,
                holding: 1248269084,
                toBeDelivered: 7713507900,
                waiting: 8826062993,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: '4tqeln884zoliydtn0xj92e3d0e8sp4u34ayvp5562n42z31tu',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'a34j5758q77sd1b4lwmk',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:58:22',
                executionMonitoringStartAt: '2020-07-28 14:15:45',
                executionMonitoringEndAt: '2020-07-29 12:33:09',
                numberMax: 1819412710,
                numberDays: 5234306271,
                success: -9,
                cancelled: 3880189562,
                delivering: 7003307893,
                error: 5154218787,
                holding: 6458573522,
                toBeDelivered: 5625841129,
                waiting: 3395538123,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'rba3bg5r4069vtv70y90o6saiqma7ji1uiv1tvqwilj4vfnaip',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'lgyf4g7vaf7a9indfanl',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:35:10',
                executionMonitoringStartAt: '2020-07-29 02:09:29',
                executionMonitoringEndAt: '2020-07-29 00:37:41',
                numberMax: 3681014902,
                numberDays: 3962012154,
                success: 3947483196,
                cancelled: -9,
                delivering: 6753823968,
                error: 8712572040,
                holding: 1962379157,
                toBeDelivered: 9298579997,
                waiting: 8201287280,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'bqemno2st335kydfue89rmo1ednzbqwgdj7yuct5m9xtqgzqr4',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: '05s0uuuldf2k2fvsjwzu',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:14:22',
                executionMonitoringStartAt: '2020-07-29 07:05:18',
                executionMonitoringEndAt: '2020-07-29 12:07:46',
                numberMax: 1120077029,
                numberDays: 9594436280,
                success: 1883669778,
                cancelled: 6422982953,
                delivering: -9,
                error: 3027430005,
                holding: 2697956942,
                toBeDelivered: 9221429691,
                waiting: 9948844000,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'pbn81st3g2tw436p4ga7vogibxx8h2ujvfb8svymgs3y97w22c',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 's3u8jtlv1cuhmuh579gr',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 14:20:52',
                executionMonitoringStartAt: '2020-07-29 03:40:06',
                executionMonitoringEndAt: '2020-07-29 03:04:58',
                numberMax: 9664904157,
                numberDays: 4589485694,
                success: 5452522682,
                cancelled: 4301743797,
                delivering: 9148019660,
                error: -9,
                holding: 1165455544,
                toBeDelivered: 1228327757,
                waiting: 4798670398,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 't9b6abq6y1ec4mwm3n87k6l15tlc58pvy5jrc6n2po5h9smf4e',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: '4ighp8jyxbnka4tasilv',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 14:37:40',
                executionMonitoringStartAt: '2020-07-28 16:44:04',
                executionMonitoringEndAt: '2020-07-29 08:12:47',
                numberMax: 3535937586,
                numberDays: 8285929875,
                success: 1444194783,
                cancelled: 8603223678,
                delivering: 1911579633,
                error: 9828982598,
                holding: -9,
                toBeDelivered: 6057030896,
                waiting: 3286408531,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'qe1uwpeyh5kp3whzh7bsm7lc3wqompf1ag75qsp1vgz3sbjht5',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'qkymk7u8hnw5gj0ntfeq',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:00:02',
                executionMonitoringStartAt: '2020-07-29 10:58:19',
                executionMonitoringEndAt: '2020-07-28 18:35:24',
                numberMax: 8319049102,
                numberDays: 5072627362,
                success: 7389208648,
                cancelled: 4908567184,
                delivering: 6562688280,
                error: 2533900462,
                holding: 3379887539,
                toBeDelivered: -9,
                waiting: 8928821782,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'qrgcw0971ki01znpgfejqa0nb6oc9nmre07xipnag8yh6tsd6t',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'tb7u3sgn60z607uknf5o',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:48:36',
                executionMonitoringStartAt: '2020-07-29 01:46:10',
                executionMonitoringEndAt: '2020-07-29 03:41:14',
                numberMax: 9025544211,
                numberDays: 1701287855,
                success: 3115747708,
                cancelled: 7104578445,
                delivering: 1813968388,
                error: 3144499627,
                holding: 3747133920,
                toBeDelivered: 9735566958,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: '8epywmu9fjs202l2v3rs68d9iu5kp47brc5vo76n09hcbsy9nl',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'dzrjs0vd409pccx1010i',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 18:04:58',
                executionMonitoringStartAt: '2020-07-29 08:18:13',
                executionMonitoringEndAt: '2020-07-29 01:58:03',
                numberMax: 2842191049,
                numberDays: 4517099846,
                success: 6359159593,
                cancelled: 9516331255,
                delivering: 8351895998,
                error: 8942638617,
                holding: 1310832854,
                toBeDelivered: 5107434892,
                waiting: 2073031022,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: '21p69iye8s94ae03r9yh7r4szulxl8zv8rc1lqtz03ubr7u0p1',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'vi0ol458oaj3mlpjuhz2',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-28 19:26:43',
                executionMonitoringEndAt: '2020-07-29 03:31:10',
                numberMax: 4297600788,
                numberDays: 1937355577,
                success: 8020755592,
                cancelled: 3588658479,
                delivering: 4752787952,
                error: 9593771764,
                holding: 3684136796,
                toBeDelivered: 6291023330,
                waiting: 2487573439,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'vai3s8ah9mb68971518qd61r2hqmclh9yxj1el6gonx16ee4xb',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 't82xi8foagxedt7gbi0y',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:12:11',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-28 19:21:22',
                numberMax: 9669143428,
                numberDays: 9972817947,
                success: 1111375018,
                cancelled: 2133075444,
                delivering: 6882799464,
                error: 2383263067,
                holding: 2480742094,
                toBeDelivered: 7148425192,
                waiting: 4656993428,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'we4la6todmeqc96dllx00o6p1u7ef9h64ps0lwolzbdmiqab9c',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'ymv328fiuwjyfzt72eto',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:02:41',
                executionMonitoringStartAt: '2020-07-29 11:56:38',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 4586132007,
                numberDays: 7417032312,
                success: 5982162866,
                cancelled: 5894371293,
                delivering: 7840777503,
                error: 1972533927,
                holding: 2958602593,
                toBeDelivered: 2654779208,
                waiting: 9439491174,
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
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: '64haldt5s8yv6k0r9jfy4z2175aw59f88qz5dy26w5lrnz6sgy',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'ua9v4t8ivf8sqbbuitx5',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:47:13',
                executionMonitoringStartAt: '2020-07-29 12:57:09',
                executionMonitoringEndAt: '2020-07-29 01:34:09',
                numberMax: 1336591982,
                numberDays: 5758586292,
                success: 9302288112,
                cancelled: 1938482880,
                delivering: 5310382357,
                error: 4806522421,
                holding: 3716919329,
                toBeDelivered: 8449996416,
                waiting: 6691021230,
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
                        value   : '0df4a745-e8a6-48af-9f67-1ea5c0b6f050'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '0df4a745-e8a6-48af-9f67-1ea5c0b6f050'));
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
            .get('/bplus-it-sappi/message-overview/0df4a745-e8a6-48af-9f67-1ea5c0b6f050')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0df4a745-e8a6-48af-9f67-1ea5c0b6f050'));
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
                
                id: 'e5157450-a8be-47c4-9906-f3aa0d57403e',
                tenantId: 'f9bc7a76-fb18-4514-af26-7d13525eda22',
                tenantCode: 'islvgocb6vb3cqd2hfxky893tlv93nt9oy1v090qoqc5djuh8y',
                systemId: '1916413b-c529-4d51-877a-817317cac95e',
                systemName: 'f8vv5zlwfvyegr8ddli1',
                executionId: '9ba5a98b-4b66-4f0f-863a-abe3d9771342',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:17:40',
                executionMonitoringStartAt: '2020-07-29 02:46:35',
                executionMonitoringEndAt: '2020-07-28 16:17:58',
                numberMax: 2388989725,
                numberDays: 9116778325,
                success: 8425592737,
                cancelled: 8992297117,
                delivering: 4420774919,
                error: 5160263846,
                holding: 6154399477,
                toBeDelivered: 9124429361,
                waiting: 4866683347,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                tenantCode: 'o507hu8xh1nw6261tyjo1sc2w5ctaha04yfibkftzg4jmewa8c',
                systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                systemName: 'd5ah42fkwwakhw2nyx5c',
                executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 14:58:59',
                executionMonitoringStartAt: '2020-07-28 22:42:42',
                executionMonitoringEndAt: '2020-07-28 17:56:54',
                numberMax: 6581424521,
                numberDays: 4768534552,
                success: 7286854684,
                cancelled: 3642905612,
                delivering: 5037347423,
                error: 3393204816,
                holding: 4554537604,
                toBeDelivered: 4318975624,
                waiting: 1772170619,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0df4a745-e8a6-48af-9f67-1ea5c0b6f050'));
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
            .delete('/bplus-it-sappi/message-overview/0df4a745-e8a6-48af-9f67-1ea5c0b6f050')
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
                        id: '3d19aef0-4fc6-4b60-8eeb-64570ff8d319',
                        tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                        tenantCode: 'mzhz17ftpflus9k6rawr28l0ns8429vzpw02o0npm21er323n4',
                        systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                        systemName: '1o565pl0checy5tzl54o',
                        executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 04:20:06',
                        executionMonitoringStartAt: '2020-07-28 22:52:56',
                        executionMonitoringEndAt: '2020-07-29 12:57:36',
                        numberMax: 3143232336,
                        numberDays: 2310072370,
                        success: 6517696104,
                        cancelled: 8946739819,
                        delivering: 5193715374,
                        error: 9951056574,
                        holding: 5193525427,
                        toBeDelivered: 3078446660,
                        waiting: 5795801269,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', '3d19aef0-4fc6-4b60-8eeb-64570ff8d319');
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
                            value   : '0df4a745-e8a6-48af-9f67-1ea5c0b6f050'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('0df4a745-e8a6-48af-9f67-1ea5c0b6f050');
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
                    id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('0df4a745-e8a6-48af-9f67-1ea5c0b6f050');
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
                        
                        id: 'eb4a22b8-e859-47fa-baa0-ba172c501075',
                        tenantId: '45102432-b298-4f98-b3d2-c5d3bef1ae60',
                        tenantCode: '0j5yii5qa4fjes54vq18b0pml2g69vxjkummik4h7t7pg5o8zb',
                        systemId: '3767384e-6d53-4f51-be14-c1d6fbb6e36d',
                        systemName: 'ewolxl7b6ui69bqz86lk',
                        executionId: 'd899bed0-2408-43e7-929c-13991044cf93',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 13:38:49',
                        executionMonitoringStartAt: '2020-07-28 17:26:32',
                        executionMonitoringEndAt: '2020-07-29 08:50:02',
                        numberMax: 3112142532,
                        numberDays: 6076621335,
                        success: 4933269366,
                        cancelled: 7829453727,
                        delivering: 7951597411,
                        error: 3562565658,
                        holding: 1941924849,
                        toBeDelivered: 3056881389,
                        waiting: 7501870556,
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
                        
                        id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050',
                        tenantId: '4b98e383-b2c8-4063-8f02-333c86e718eb',
                        tenantCode: '3p1y4vnmtnl8r86prkw23k3xs9mtg70nwya1lplpigje77lk76',
                        systemId: '409d2681-58fb-43af-b906-cfdacbef7363',
                        systemName: 'd6nqjsg3pcp87wkeguet',
                        executionId: 'f33749a6-b414-460a-8b73-0d3e3cd197ef',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 06:17:12',
                        executionMonitoringStartAt: '2020-07-29 05:09:53',
                        executionMonitoringEndAt: '2020-07-28 17:22:50',
                        numberMax: 4312669173,
                        numberDays: 7960262760,
                        success: 6595731755,
                        cancelled: 2884981860,
                        delivering: 5366882865,
                        error: 9687398994,
                        holding: 5086858268,
                        toBeDelivered: 8488916758,
                        waiting: 6304887171,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('0df4a745-e8a6-48af-9f67-1ea5c0b6f050');
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
                    id: '0df4a745-e8a6-48af-9f67-1ea5c0b6f050'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('0df4a745-e8a6-48af-9f67-1ea5c0b6f050');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});