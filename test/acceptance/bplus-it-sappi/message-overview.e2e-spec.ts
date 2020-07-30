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
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: '2jojj46lxdzyyr51eu6b4dxy0x1oq0txggeynyb7tym635k6o6',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'tes1eaw6trvj5k8vok6q',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 01:36:00',
                executionMonitoringStartAt: '2020-07-29 09:34:10',
                executionMonitoringEndAt: '2020-07-29 20:15:19',
                numberMax: 5929646938,
                numberDays: 5573303625,
                success: 3179268219,
                cancelled: 8926476279,
                delivering: 8613920228,
                error: 1529264441,
                holding: 7164685636,
                toBeDelivered: 1766992376,
                waiting: 8941577102,
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
                
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: '82bjyqtxiagm4kpdoqd7qizjvcmgxv358d2u9mldyuqnltihfa',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'i084e9uzkhvy2z7mirat',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:54:48',
                executionMonitoringStartAt: '2020-07-30 00:34:32',
                executionMonitoringEndAt: '2020-07-29 20:07:58',
                numberMax: 1134729230,
                numberDays: 3825652531,
                success: 7424994475,
                cancelled: 9356487678,
                delivering: 2985479889,
                error: 5919446386,
                holding: 1810106132,
                toBeDelivered: 1017541230,
                waiting: 2973320682,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: null,
                tenantCode: 'oimkyqp62njs0asguie9aq5nhmpkghqg5p0uu90p2skzyx4swf',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'rzx64diwhzyryri1diap',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 23:00:02',
                executionMonitoringStartAt: '2020-07-29 08:24:53',
                executionMonitoringEndAt: '2020-07-29 12:48:20',
                numberMax: 8048007285,
                numberDays: 7319934651,
                success: 3339706183,
                cancelled: 8961267432,
                delivering: 1633521353,
                error: 9377500183,
                holding: 2309957013,
                toBeDelivered: 2835718577,
                waiting: 4775126015,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                
                tenantCode: '6935h162mbmwyt4ok4pyb7icmlzhpq7mh54donhtyii0hordh2',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'xhy1u4tgfh6o8adbsolx',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:39:57',
                executionMonitoringStartAt: '2020-07-29 12:48:37',
                executionMonitoringEndAt: '2020-07-29 10:25:21',
                numberMax: 9689744799,
                numberDays: 2877661016,
                success: 9183284699,
                cancelled: 8739521629,
                delivering: 5114435948,
                error: 7700578788,
                holding: 4057191077,
                toBeDelivered: 1569321361,
                waiting: 9994376719,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: null,
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'lm82pj13gi485z7499um',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 21:54:10',
                executionMonitoringStartAt: '2020-07-30 01:03:36',
                executionMonitoringEndAt: '2020-07-29 04:34:01',
                numberMax: 1792374201,
                numberDays: 5652785729,
                success: 6298807997,
                cancelled: 5296937905,
                delivering: 9186860460,
                error: 3133181944,
                holding: 7056144145,
                toBeDelivered: 2781361902,
                waiting: 3931620982,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'yb70xwrwuiuundazsos8',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 00:35:34',
                executionMonitoringStartAt: '2020-07-29 09:52:05',
                executionMonitoringEndAt: '2020-07-30 01:42:33',
                numberMax: 1742508700,
                numberDays: 1146717588,
                success: 1291217195,
                cancelled: 9594149556,
                delivering: 2347714385,
                error: 7639250981,
                holding: 7723734894,
                toBeDelivered: 1993582620,
                waiting: 3270599246,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: '3mtm9u07oct4kahp9ttr8mxjh7bt92y5ayk8dl2vyx6qjhd24a',
                systemId: null,
                systemName: 'kucrs6wf4en96xq43re0',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 23:27:44',
                executionMonitoringStartAt: '2020-07-29 13:26:07',
                executionMonitoringEndAt: '2020-07-29 08:23:57',
                numberMax: 5504100528,
                numberDays: 3282834647,
                success: 4857404600,
                cancelled: 2991563888,
                delivering: 2467565820,
                error: 1578476315,
                holding: 6937671077,
                toBeDelivered: 2381045415,
                waiting: 9707322146,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'ncm2swrqw4k6zfs6uzcv4vtut1jzimhu2oix9hme1aaiq3m8fz',
                
                systemName: '6d3hjm8ugtrdsj44wgcf',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:09:32',
                executionMonitoringStartAt: '2020-07-29 16:25:57',
                executionMonitoringEndAt: '2020-07-29 12:54:31',
                numberMax: 8838043563,
                numberDays: 8039040127,
                success: 5724574456,
                cancelled: 8849447739,
                delivering: 6693800776,
                error: 8805316883,
                holding: 6724916431,
                toBeDelivered: 4669446555,
                waiting: 3903548759,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'qyklybo77v47cahh1ucxfwo6e8qh5qgafbmra8vk5u5bd9uf70',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: null,
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:04:42',
                executionMonitoringStartAt: '2020-07-29 23:12:51',
                executionMonitoringEndAt: '2020-07-29 17:36:28',
                numberMax: 3688410707,
                numberDays: 7414367969,
                success: 3334515033,
                cancelled: 3648470845,
                delivering: 6459576953,
                error: 4600121739,
                holding: 4836683877,
                toBeDelivered: 6312177836,
                waiting: 4416817361,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'pbtb750jgubbg7fqixom29h7hbesz9ki86ksqtct2kdrfba89i',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 23:28:38',
                executionMonitoringStartAt: '2020-07-29 15:16:51',
                executionMonitoringEndAt: '2020-07-29 06:43:43',
                numberMax: 9654867947,
                numberDays: 4363600233,
                success: 7729431844,
                cancelled: 5459729976,
                delivering: 6220737814,
                error: 8682561363,
                holding: 9608595677,
                toBeDelivered: 6144047452,
                waiting: 3046135337,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'rkowv0l77vxhv3opz1tz42jmuniv142k163hzwvhd93457sevg',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'yl8h1cq50wfj0vthl25i',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 21:50:45',
                executionMonitoringStartAt: '2020-07-29 11:15:34',
                executionMonitoringEndAt: '2020-07-29 04:23:15',
                numberMax: 4304880054,
                numberDays: 8055891342,
                success: 1651466208,
                cancelled: 3091716280,
                delivering: 1205703085,
                error: 8776320338,
                holding: 9699186166,
                toBeDelivered: 3113486383,
                waiting: 9221957828,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'ft6lzqshe6fj3at0qajkvjnrgtzplk01o6fi3s7n5bt89y00oi',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'nr7w3s9r80mgdqzm8cxy',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:20:19',
                executionMonitoringStartAt: '2020-07-29 07:45:25',
                executionMonitoringEndAt: '2020-07-29 22:25:29',
                numberMax: 2839373542,
                numberDays: 7935251004,
                success: 7142867370,
                cancelled: 8518519125,
                delivering: 4452549206,
                error: 8006525869,
                holding: 3554880185,
                toBeDelivered: 5433311642,
                waiting: 5094226044,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'xw9tmlkdmu55ikphkr3i91rwmj176mrbslpx1c2dmmqn2foitv',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'n2ohhynght7ofvpjr593',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: null,
                executionExecutedAt: '2020-07-29 07:48:55',
                executionMonitoringStartAt: '2020-07-29 07:27:14',
                executionMonitoringEndAt: '2020-07-29 10:28:10',
                numberMax: 3148647063,
                numberDays: 1025748443,
                success: 5199970558,
                cancelled: 1253762122,
                delivering: 4329686957,
                error: 2479358919,
                holding: 6867707537,
                toBeDelivered: 9311048197,
                waiting: 6111237732,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'xgg5iex9sp3x0mqphuokcnq7ybock3lkg9a1hyox09nwhs1t9o',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: '91lnuldsj9fgq5jceuiq',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                
                executionExecutedAt: '2020-07-30 01:04:39',
                executionMonitoringStartAt: '2020-07-29 02:19:44',
                executionMonitoringEndAt: '2020-07-30 01:43:25',
                numberMax: 9855202048,
                numberDays: 3565461184,
                success: 5468576094,
                cancelled: 8458398104,
                delivering: 8352543746,
                error: 5034130836,
                holding: 1222607949,
                toBeDelivered: 7903947735,
                waiting: 3509796105,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'odpb8pxdevze0sabsunxqzcr3bvtvnqt4rk3w4wcnfevhkdgai',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'xatkcdp8gmrckfroqjhj',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 19:05:56',
                executionMonitoringEndAt: '2020-07-29 13:19:23',
                numberMax: 6034624319,
                numberDays: 6644621349,
                success: 8716570449,
                cancelled: 5217896035,
                delivering: 8891542042,
                error: 7023885505,
                holding: 3583127170,
                toBeDelivered: 1377758964,
                waiting: 6581837745,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'kp12efpnye4c26a25cncq1qm382joav1vyryr8e8qq049e67ti',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: '40gfcod4xzt1rm21busa',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-29 03:11:47',
                executionMonitoringEndAt: '2020-07-30 01:15:18',
                numberMax: 2198674077,
                numberDays: 3570298960,
                success: 5328312941,
                cancelled: 3123964131,
                delivering: 3229710128,
                error: 8497044388,
                holding: 9581239707,
                toBeDelivered: 2647063083,
                waiting: 9954168711,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'efijfeu28j9y1hi7bicdpyu1p0lsgm3f2eebge329nje4az1sg',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'rs6af3u8m8dy3h3dgtyl',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 01:05:57',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 10:51:50',
                numberMax: 5700948028,
                numberDays: 6921605701,
                success: 1702850602,
                cancelled: 9225735652,
                delivering: 4965954527,
                error: 5795418573,
                holding: 3577948004,
                toBeDelivered: 4262727684,
                waiting: 2673149352,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'wyev8hcb6wzdgxx5shy9vj4ayd2kh4v67gf3svjozb4ncef6o2',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'himmm2rzmc2viztg45wq',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:27:47',
                
                executionMonitoringEndAt: '2020-07-29 17:50:45',
                numberMax: 6473863029,
                numberDays: 7926423876,
                success: 5752923565,
                cancelled: 9101170990,
                delivering: 6618678563,
                error: 3587349139,
                holding: 2558626269,
                toBeDelivered: 3290497219,
                waiting: 1735337767,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'xiz89jsknrfp6eo5zypxk602qy7pvnu3gtwa7fsofypgqf3cl9',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'odd6acu5lwto2wcepopr',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:21:16',
                executionMonitoringStartAt: '2020-07-29 16:38:09',
                executionMonitoringEndAt: null,
                numberMax: 5794443193,
                numberDays: 8441334020,
                success: 6762629475,
                cancelled: 8900815260,
                delivering: 9560120605,
                error: 2520398617,
                holding: 7275342790,
                toBeDelivered: 8288274648,
                waiting: 4282625930,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: '88n25bcig6e383a9vfsxdy43rxhfnpq9zcc733rkm8mmxnvpxn',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'qsyuw4b4djsz9srkw11p',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:29:15',
                executionMonitoringStartAt: '2020-07-29 11:02:29',
                
                numberMax: 9823995518,
                numberDays: 1485948001,
                success: 6083567577,
                cancelled: 2907174709,
                delivering: 1717314634,
                error: 8679606404,
                holding: 3576303095,
                toBeDelivered: 2028501154,
                waiting: 2027174779,
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
                id: 'xe1obsm0tnnpsph5c69f2gprvk4z7mpcy62l2',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: '1npi2cbr8p4nihbac69sg4hop76z3vzp4l3wvgnjkph07bcq8f',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'dolvdakpo0iod370x5pj',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 23:46:20',
                executionMonitoringStartAt: '2020-07-30 01:42:57',
                executionMonitoringEndAt: '2020-07-29 03:26:06',
                numberMax: 1553413150,
                numberDays: 2268239773,
                success: 3485282759,
                cancelled: 4036759716,
                delivering: 2104624575,
                error: 6528071508,
                holding: 6221028304,
                toBeDelivered: 3591005593,
                waiting: 2589031748,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: 'd1jse96k6vc1m1jhda5f6d29so5p6hu6prbtf',
                tenantCode: 'xc7t7c3xqc5l7wm1vj29tu6lnyp5ycr0qlfe3jx8gbandse6ic',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'r5w988hqenzhnijem00k',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 19:52:12',
                executionMonitoringStartAt: '2020-07-29 12:15:29',
                executionMonitoringEndAt: '2020-07-29 20:51:26',
                numberMax: 6587257649,
                numberDays: 4660082569,
                success: 4654028666,
                cancelled: 3320593922,
                delivering: 2561294595,
                error: 7948171977,
                holding: 4222774657,
                toBeDelivered: 3576733656,
                waiting: 8049511394,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'cupbtisc9juu3tvqdvxhjsodcngwa1r67u6npue64mia6p9hbf',
                systemId: 'u0nt53uqlwv9rwrvk4zjk55k4nxby2n19z0b2',
                systemName: '275l8vt4w461uo7meogt',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:01:44',
                executionMonitoringStartAt: '2020-07-29 17:45:36',
                executionMonitoringEndAt: '2020-07-29 04:46:06',
                numberMax: 2638623823,
                numberDays: 3152558460,
                success: 9098221975,
                cancelled: 9071215655,
                delivering: 8714087678,
                error: 9612683427,
                holding: 6429031061,
                toBeDelivered: 8868535546,
                waiting: 8502441774,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: '1iin1pke5wuc7iqjfgqrnti5ty3u2oeec1npspbr9q57tid60y',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'oxurswekqfmj08fig0va',
                executionId: 'sv4u41ui0lcux9eiz95y0mega5qu0qkh8ti0w',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:59:05',
                executionMonitoringStartAt: '2020-07-29 02:55:03',
                executionMonitoringEndAt: '2020-07-29 16:42:24',
                numberMax: 8405171366,
                numberDays: 7478523050,
                success: 7876864905,
                cancelled: 7213228601,
                delivering: 2554294388,
                error: 6762827185,
                holding: 7500858419,
                toBeDelivered: 9383347228,
                waiting: 2475241241,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'ddg7ccbni23go7bedam9lrfexvtm5xpj1v6bqbbrv9a6c192u8o',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: '5n0kqnl5e913wozjwokf',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 02:16:05',
                executionMonitoringStartAt: '2020-07-29 04:16:20',
                executionMonitoringEndAt: '2020-07-30 00:37:02',
                numberMax: 7549871222,
                numberDays: 7777984886,
                success: 5591687527,
                cancelled: 3019964615,
                delivering: 9321999081,
                error: 1062107974,
                holding: 4386218662,
                toBeDelivered: 6069219409,
                waiting: 5281935911,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'm0os4qpo0bg1jobdg6ttbm7v1zibh4gfs2z19i07h2ahcumie7',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'svlwyyy8yzwdpw9t62hw9',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:13:12',
                executionMonitoringStartAt: '2020-07-29 07:09:28',
                executionMonitoringEndAt: '2020-07-29 13:58:09',
                numberMax: 9584918822,
                numberDays: 2638045470,
                success: 2677237822,
                cancelled: 8860625365,
                delivering: 7267613569,
                error: 8147247655,
                holding: 5798950373,
                toBeDelivered: 6396049700,
                waiting: 9230726344,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'msxn9wb52vl9egqog2fux9avod8quhinp7voqlqt7427q10mwr',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'm2a4qu69nqrn42icug5g',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:18:07',
                executionMonitoringStartAt: '2020-07-29 18:13:21',
                executionMonitoringEndAt: '2020-07-29 13:41:10',
                numberMax: 84413243373,
                numberDays: 6493157710,
                success: 2325317624,
                cancelled: 2546450623,
                delivering: 3757779986,
                error: 3512806204,
                holding: 4312199123,
                toBeDelivered: 4693552487,
                waiting: 9749398864,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'hl926fjlyv3gwb1lyeft1eaf368dx76dg2ftqvjpd7yl0oq11a',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'fd9t6qlippn23zw9nhie',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:12:27',
                executionMonitoringStartAt: '2020-07-29 16:48:34',
                executionMonitoringEndAt: '2020-07-29 16:38:00',
                numberMax: 1192083367,
                numberDays: 59910630195,
                success: 8888401828,
                cancelled: 8378879025,
                delivering: 9703329201,
                error: 3293035940,
                holding: 5267929709,
                toBeDelivered: 2067624489,
                waiting: 4295353657,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'gcsf121hgwi86s2r9cnppac6m4nmhf3lwd5zehejqd3a1lupm2',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'uun8paurpis7pubg35hz',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:58:00',
                executionMonitoringStartAt: '2020-07-30 00:26:29',
                executionMonitoringEndAt: '2020-07-29 21:10:17',
                numberMax: 3131453681,
                numberDays: 3865578559,
                success: 19135608802,
                cancelled: 6286153174,
                delivering: 9562325163,
                error: 8292276859,
                holding: 5866761734,
                toBeDelivered: 5562737693,
                waiting: 8055759770,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'qy2ztnugjrf9pre74lnq7zbfavbjpxt7a9w8ekqbirrjljkdcz',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'okdzm8kgpvc1ttuxtsc4',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 00:34:35',
                executionMonitoringStartAt: '2020-07-29 16:58:51',
                executionMonitoringEndAt: '2020-07-29 10:24:27',
                numberMax: 5316221684,
                numberDays: 4742726638,
                success: 2906284732,
                cancelled: 95899799954,
                delivering: 6864489500,
                error: 7906041897,
                holding: 8688352283,
                toBeDelivered: 2002793202,
                waiting: 5098957929,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'plrtzo58lz480ymd9o9ez4027yk5942qwuha3dn1uu9nqe5q02',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'e816s5wz0rbm83qpgakd',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 01:55:35',
                executionMonitoringStartAt: '2020-07-30 00:51:40',
                executionMonitoringEndAt: '2020-07-29 11:49:27',
                numberMax: 5895021732,
                numberDays: 7058787484,
                success: 9486378255,
                cancelled: 1701273533,
                delivering: 13613631946,
                error: 6815839962,
                holding: 4950193149,
                toBeDelivered: 5493931413,
                waiting: 8765651516,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: '90mbyk5xnplenxngtdkhkdsv2d65yi4p1oj7tqsjciv9mdv4of',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: '0gou7uvu4d2oamoj9923',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:08:29',
                executionMonitoringStartAt: '2020-07-29 18:12:39',
                executionMonitoringEndAt: '2020-07-29 07:01:11',
                numberMax: 2532944025,
                numberDays: 3322942766,
                success: 9715511628,
                cancelled: 2081030728,
                delivering: 7542558303,
                error: 45991583880,
                holding: 9709942881,
                toBeDelivered: 4111513504,
                waiting: 5453464551,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'nwh0onmotd2kw4jfqfawacy8rdpg9umjzykenuk4fjd7o5f3tq',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'vh7auip8vlja6jdr4p1u',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 20:24:28',
                executionMonitoringStartAt: '2020-07-29 09:17:47',
                executionMonitoringEndAt: '2020-07-29 20:35:39',
                numberMax: 6398523825,
                numberDays: 4058612067,
                success: 1541310288,
                cancelled: 8543702724,
                delivering: 2672074039,
                error: 5406396824,
                holding: 49961439664,
                toBeDelivered: 8788525386,
                waiting: 4531265263,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'b2zm4dc2r0cq3osskvlg7l0flbnyt7wj4pzmay0jtn5j917mkp',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'fc74jck0p681x4duvmy0',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 00:12:11',
                executionMonitoringStartAt: '2020-07-29 03:32:25',
                executionMonitoringEndAt: '2020-07-29 14:50:21',
                numberMax: 2928445913,
                numberDays: 1486582235,
                success: 4141906792,
                cancelled: 7033821221,
                delivering: 9499659671,
                error: 8290257602,
                holding: 1501194562,
                toBeDelivered: 34922705627,
                waiting: 6268855069,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'kcrypg8tosvydjiylz6ypxk2277nad4oqnw07ktvw5g3oyshnz',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'sc941ji2w518w6euymo7',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 01:36:02',
                executionMonitoringStartAt: '2020-07-29 17:31:11',
                executionMonitoringEndAt: '2020-07-29 03:14:26',
                numberMax: 1540882980,
                numberDays: 1660611626,
                success: 7072858837,
                cancelled: 6714223267,
                delivering: 8634378857,
                error: 4463522658,
                holding: 4109584571,
                toBeDelivered: 3253174104,
                waiting: 69696613843,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: '32mdbz2bb7c7m6wwqq22jtbvzi43hjhaaw83a17juvi7yrdltc',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'eipwhmcp3yr5syk8luql',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 19:00:13',
                executionMonitoringStartAt: '2020-07-29 18:42:09',
                executionMonitoringEndAt: '2020-07-29 18:26:51',
                numberMax: -9,
                numberDays: 8084407025,
                success: 3039267703,
                cancelled: 5024162717,
                delivering: 5984475368,
                error: 5867780702,
                holding: 3743331502,
                toBeDelivered: 8978661102,
                waiting: 9796791917,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'bya5h0vzj40yoen19f53q4pn1s3vax1birqzolrethdfl23k4n',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'vkweo03fqczktbif9589',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:58:32',
                executionMonitoringStartAt: '2020-07-29 09:15:02',
                executionMonitoringEndAt: '2020-07-30 00:19:18',
                numberMax: 7257722278,
                numberDays: -9,
                success: 7954241225,
                cancelled: 8764267318,
                delivering: 1389993266,
                error: 7124980364,
                holding: 3643154903,
                toBeDelivered: 8188410455,
                waiting: 9714998598,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'jv1tmgl1kga3blm246jtc4n337vl271zppvcaangz47bkmu4kj',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'dhxzmi3ygizziqgir3i1',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:24:18',
                executionMonitoringStartAt: '2020-07-29 06:31:43',
                executionMonitoringEndAt: '2020-07-29 08:33:03',
                numberMax: 3235842308,
                numberDays: 5747579080,
                success: -9,
                cancelled: 5207433019,
                delivering: 9182859761,
                error: 5665603992,
                holding: 3160040122,
                toBeDelivered: 2822162491,
                waiting: 8828539647,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'z9gsix77m8pz3pzfcv0sx9m6qaxo4zn59je4vhn8abbskdb5yc',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'e206r7qkwvbfh8my1u2g',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:03:58',
                executionMonitoringStartAt: '2020-07-29 10:49:33',
                executionMonitoringEndAt: '2020-07-29 04:36:31',
                numberMax: 5413361797,
                numberDays: 6394877043,
                success: 9363509653,
                cancelled: -9,
                delivering: 4133088541,
                error: 2430431305,
                holding: 4653371546,
                toBeDelivered: 1014547560,
                waiting: 6149869161,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'tnhflm5bgcsinche28qdldez2q6tpp7symt1b4wjjpw50c018r',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'joxexy9wh40hfhfk8jz0',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 19:50:55',
                executionMonitoringStartAt: '2020-07-29 19:11:37',
                executionMonitoringEndAt: '2020-07-29 03:38:51',
                numberMax: 1019930079,
                numberDays: 1507044304,
                success: 4191432113,
                cancelled: 7798214944,
                delivering: -9,
                error: 1359313621,
                holding: 9607012658,
                toBeDelivered: 6369587611,
                waiting: 6881229059,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'tvkbyxahvtt9ftttfxjpwt1mh4kytmfx0m5s5afpaijyjzkbkz',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: '29v0h40r6hiwxxjdktfb',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:51:55',
                executionMonitoringStartAt: '2020-07-29 21:52:21',
                executionMonitoringEndAt: '2020-07-29 13:12:43',
                numberMax: 1544368278,
                numberDays: 2878149651,
                success: 9826472614,
                cancelled: 6703182555,
                delivering: 9859250155,
                error: -9,
                holding: 7460596009,
                toBeDelivered: 8142984956,
                waiting: 2960675793,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: '8oly1phpwbjhgwllwfw1f56vug6nu7fio1evv7f5mlacyk11sz',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'tvnbifyi5rqtt8md1un4',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 21:25:37',
                executionMonitoringStartAt: '2020-07-29 14:59:00',
                executionMonitoringEndAt: '2020-07-29 11:00:44',
                numberMax: 4168165469,
                numberDays: 3755042629,
                success: 6986493907,
                cancelled: 4651982622,
                delivering: 3237485827,
                error: 4313050654,
                holding: -9,
                toBeDelivered: 3140705738,
                waiting: 8286866319,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: '3lrxwm67c7i3f11ktci35joufk9bvuv5s8o5p895qwly3mroju',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'zkr6c3ivx4gdlqs2w2xq',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:24:58',
                executionMonitoringStartAt: '2020-07-29 23:03:37',
                executionMonitoringEndAt: '2020-07-29 14:02:08',
                numberMax: 1857078708,
                numberDays: 1182499725,
                success: 1497174344,
                cancelled: 7398290242,
                delivering: 2426533481,
                error: 5663606274,
                holding: 7854064809,
                toBeDelivered: -9,
                waiting: 7646048287,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'p0ojnk5ya25k9662z5oe13b0py5r8h21rp6g7qjgc1ash76eet',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: '7da5v79cbhyl06gtta1e',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:48:24',
                executionMonitoringStartAt: '2020-07-29 09:09:20',
                executionMonitoringEndAt: '2020-07-29 22:48:15',
                numberMax: 2063415624,
                numberDays: 9722716377,
                success: 5441528482,
                cancelled: 2245869613,
                delivering: 8250987909,
                error: 6093011191,
                holding: 9511788256,
                toBeDelivered: 2268097220,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'ysknwnwqhj28xqz55ed33f11u74bl1agebc91a4tyfso632zfk',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 's5xpod1l9d4wstoo2k6e',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 06:31:26',
                executionMonitoringStartAt: '2020-07-29 20:50:05',
                executionMonitoringEndAt: '2020-07-30 01:46:19',
                numberMax: 2157567343,
                numberDays: 5881408571,
                success: 6795040312,
                cancelled: 1819490195,
                delivering: 8973644478,
                error: 6705403338,
                holding: 8742036045,
                toBeDelivered: 3836465180,
                waiting: 7490308549,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: '25pk62fw0wadxdduz23iebxmoki40ifnzn3cgdj3mfuzr0ull1',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'k7354r1z4d3bq741syha',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 11:21:04',
                executionMonitoringEndAt: '2020-07-29 06:46:34',
                numberMax: 1233495960,
                numberDays: 8757020650,
                success: 2192781550,
                cancelled: 6354212111,
                delivering: 5373921984,
                error: 7745051173,
                holding: 3425300092,
                toBeDelivered: 5408225026,
                waiting: 1467786056,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'dlh9xnszbeweyn553xljwplxnu37keeuh88os13hyb7n8vwy88',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 's0khwapje6ilch6jemdv',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:49:34',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 18:06:51',
                numberMax: 2463464228,
                numberDays: 4760461289,
                success: 9949003419,
                cancelled: 9705677331,
                delivering: 6972174007,
                error: 2479220520,
                holding: 4354501337,
                toBeDelivered: 6768428249,
                waiting: 8222356546,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: '4gihm4m18lphb6677ei33cbltn1ios1ti3drutgcj3gyofjvva',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'i7wazw70cjatdyi8ql67',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:38:18',
                executionMonitoringStartAt: '2020-07-29 17:04:25',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 5193679202,
                numberDays: 4190141699,
                success: 4963328990,
                cancelled: 5867946105,
                delivering: 8479816391,
                error: 4104630141,
                holding: 3799966318,
                toBeDelivered: 8484827382,
                waiting: 5069075130,
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
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: '2q5v2iz96lnsa3lvwaaewjqiauydutye2p1g9xxyprki3a0k0g',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'cqvxfn1wz6596vic3k18',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:51:56',
                executionMonitoringStartAt: '2020-07-29 15:45:34',
                executionMonitoringEndAt: '2020-07-29 19:06:33',
                numberMax: 6501404926,
                numberDays: 5189997304,
                success: 2289412774,
                cancelled: 3374875135,
                delivering: 7580261079,
                error: 2946271814,
                holding: 4232392141,
                toBeDelivered: 3895910526,
                waiting: 5443993831,
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
                        value   : '72b5f48d-34d9-44a4-9d2e-3bb35e7d9e00'
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
                        value   : '9057bb97-b420-451f-884e-ca8b42c2c880'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9057bb97-b420-451f-884e-ca8b42c2c880'));
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/65faec0b-d89b-458f-90fe-6418e6a0aaf2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/9057bb97-b420-451f-884e-ca8b42c2c880')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9057bb97-b420-451f-884e-ca8b42c2c880'));
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
                
                id: '59d5e7c8-eef6-4067-96c2-f2d8f78ba0f9',
                tenantId: '4849a6e8-cfc6-4c16-b728-8bd9673b038e',
                tenantCode: 'w3z0ugukeqty4gwkmz4q9n8jadmoco0h6u9xx4901s3n1i5vpw',
                systemId: '01e88784-ccc6-480e-9db4-70d083187059',
                systemName: 'tzei93wgghs4ky99bws4',
                executionId: '6572f33a-73a9-43a4-8748-3173fca5df01',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:12:22',
                executionMonitoringStartAt: '2020-07-29 08:15:11',
                executionMonitoringEndAt: '2020-07-29 18:00:09',
                numberMax: 5961323216,
                numberDays: 9309554407,
                success: 6660719246,
                cancelled: 8004155977,
                delivering: 3858644956,
                error: 4717040657,
                holding: 6943407789,
                toBeDelivered: 6370195878,
                waiting: 6091505010,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                tenantCode: 'z1eircpx4474gg0h5o3xaqht72dakfuzwrlz5muov6g80agawt',
                systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                systemName: 'a3zk4hlbzyig76x87kq8',
                executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:56:40',
                executionMonitoringStartAt: '2020-07-29 17:55:22',
                executionMonitoringEndAt: '2020-07-29 09:39:23',
                numberMax: 6532448592,
                numberDays: 3134569234,
                success: 1851926151,
                cancelled: 8087317745,
                delivering: 5893751881,
                error: 6346762691,
                holding: 4479587133,
                toBeDelivered: 6065441222,
                waiting: 2385798514,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9057bb97-b420-451f-884e-ca8b42c2c880'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/2d885edb-5898-4fe7-aa6e-3d88d18d39ab')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/9057bb97-b420-451f-884e-ca8b42c2c880')
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
                        id: '8899124b-8aec-4de7-b647-dcd72b4027a2',
                        tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                        tenantCode: 'px0edg03m3o6c6qtn6y1woj6rk9i6vr2s15a0ssp1krt6i0hyp',
                        systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                        systemName: 'k6k4bp09tsttnzwlq77y',
                        executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 22:27:38',
                        executionMonitoringStartAt: '2020-07-29 16:44:03',
                        executionMonitoringEndAt: '2020-07-29 20:14:49',
                        numberMax: 5398072842,
                        numberDays: 2764698394,
                        success: 7509810286,
                        cancelled: 3794384110,
                        delivering: 3892217012,
                        error: 5050605996,
                        holding: 1761882765,
                        toBeDelivered: 4607206344,
                        waiting: 8013137261,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', '8899124b-8aec-4de7-b647-dcd72b4027a2');
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
                            value   : '2fd74493-38ba-4444-b994-186d4206cb44'
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
                            value   : '9057bb97-b420-451f-884e-ca8b42c2c880'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('9057bb97-b420-451f-884e-ca8b42c2c880');
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
                    id: 'fc2f6d4b-d4bb-4149-b4ee-a48d34855239'
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
                    id: '9057bb97-b420-451f-884e-ca8b42c2c880'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('9057bb97-b420-451f-884e-ca8b42c2c880');
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
                        
                        id: 'fb0756dd-0455-4709-92ec-e95e0ec24331',
                        tenantId: '2173804e-33b0-45ef-80cd-a859b4d8bb9a',
                        tenantCode: 'eos3texy8tajppjhgyvx8xztah6xy49q9gc1yu2jcso59b3n6f',
                        systemId: '9c7d5483-1d6c-4faa-aa75-466199723f9b',
                        systemName: 'p11q9me25z6k5atzr9xc',
                        executionId: '2fca7018-5e09-4f5e-a418-c48be0612319',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 07:17:42',
                        executionMonitoringStartAt: '2020-07-29 15:09:56',
                        executionMonitoringEndAt: '2020-07-29 22:29:31',
                        numberMax: 5143590185,
                        numberDays: 5196591400,
                        success: 7745776850,
                        cancelled: 8420998689,
                        delivering: 7787987245,
                        error: 4132568316,
                        holding: 1279801204,
                        toBeDelivered: 9387448573,
                        waiting: 3498598591,
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
                        
                        id: '9057bb97-b420-451f-884e-ca8b42c2c880',
                        tenantId: '5ba23ab6-e5a0-4337-82ef-a98e7cb9436f',
                        tenantCode: 'qep78307a5gcxdnhps85k7ty32syea7jhg3yuwfjdwd3669nxq',
                        systemId: 'ea63ba98-a9a0-43fc-8863-aafbb00741ca',
                        systemName: 'as2q1vucp28wo5snbsyt',
                        executionId: '616dfee3-d357-48f4-beb4-edb0bb672c7e',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 17:21:25',
                        executionMonitoringStartAt: '2020-07-29 12:06:14',
                        executionMonitoringEndAt: '2020-07-29 15:04:35',
                        numberMax: 7998393809,
                        numberDays: 7442112231,
                        success: 6189650536,
                        cancelled: 1152949352,
                        delivering: 2979573985,
                        error: 4567931669,
                        holding: 3081057737,
                        toBeDelivered: 9377649925,
                        waiting: 4027553632,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('9057bb97-b420-451f-884e-ca8b42c2c880');
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
                    id: '1c47d78f-28bb-40ca-9e08-8f30a02664fd'
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
                    id: '9057bb97-b420-451f-884e-ca8b42c2c880'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('9057bb97-b420-451f-884e-ca8b42c2c880');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});