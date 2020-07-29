import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IJobOverviewRepository } from '@hades/bplus-it-sappi/job-overview/domain/job-overview.repository';
import { MockJobOverviewRepository } from '@hades/bplus-it-sappi/job-overview/infrastructure/mock/mock-job-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('job-overview', () => 
{
    let app: INestApplication;
    let repository: MockJobOverviewRepository;
    
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
            .overrideProvider(IJobOverviewRepository)
            .useClass(MockJobOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockJobOverviewRepository>module.get<IJobOverviewRepository>(IJobOverviewRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'rad5laul7nof3ul16mt2ut4sttp8n2xfueryismlt86i7x1vsy',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'wyh23kv466n53gk2qkb7',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:37:33',
                executionMonitoringStartAt: '2020-07-29 03:33:45',
                executionMonitoringEndAt: '2020-07-28 22:50:01',
                cancelled: 7092403099,
                completed: 1306997825,
                error: 9657243006,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'puyqk45mlb0zy5cj3448zmq5ihbhnm9f4eckozo12uy6qvusit',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: '5ajhbvaxrj95fq1sq0f9',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:45:19',
                executionMonitoringStartAt: '2020-07-29 15:08:35',
                executionMonitoringEndAt: '2020-07-29 03:10:01',
                cancelled: 2816180553,
                completed: 2002970913,
                error: 9276009309,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: null,
                tenantCode: '97vso2p5f0bzgvzoprbyypahjy6178o760qumanrsqyb023g6e',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'p4mq45380o0mowzaem2u',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:27:20',
                executionMonitoringStartAt: '2020-07-29 09:02:53',
                executionMonitoringEndAt: '2020-07-29 08:21:44',
                cancelled: 6134098455,
                completed: 4165088075,
                error: 8550404558,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                
                tenantCode: 'dlgxqaco3x0hozndmod791f5ichq6mnfj0ht1l7qbvd164o5yn',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'pyczuipu2xbsslgsf6zn',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:06:56',
                executionMonitoringStartAt: '2020-07-28 22:56:51',
                executionMonitoringEndAt: '2020-07-29 08:59:52',
                cancelled: 4907423843,
                completed: 3824109973,
                error: 5509755459,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: null,
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: '27bypybw8hypgb16w142',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:54:46',
                executionMonitoringStartAt: '2020-07-28 19:17:54',
                executionMonitoringEndAt: '2020-07-29 07:05:58',
                cancelled: 3855675103,
                completed: 3287392180,
                error: 6083924952,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'kz7mhuywvh0q090ukixc',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:25:44',
                executionMonitoringStartAt: '2020-07-28 20:33:45',
                executionMonitoringEndAt: '2020-07-29 10:44:07',
                cancelled: 4360323971,
                completed: 6945184667,
                error: 7427094490,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: '7fiai3vj5r2mbyawtag4sitmacxodeo45undm768eq7kh7f5vo',
                systemId: null,
                systemName: '87xble2qjreiuctgcyku',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:59:52',
                executionMonitoringStartAt: '2020-07-29 12:06:24',
                executionMonitoringEndAt: '2020-07-28 20:32:51',
                cancelled: 1052711187,
                completed: 9762261601,
                error: 3255165634,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'sq3zybhr7j5tu47a3za2egqjg0bi6eckdl4so8a70uvyl7nsj1',
                
                systemName: '5r7z2h21h2bb14fakcbw',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:34:57',
                executionMonitoringStartAt: '2020-07-28 16:58:18',
                executionMonitoringEndAt: '2020-07-29 05:51:45',
                cancelled: 1690340377,
                completed: 7700562183,
                error: 4687079066,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'jvt4cq5chgu8ommcgho8wu7v4l2k2i5hp4iz2uyt1rb4se7viz',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: null,
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:41:22',
                executionMonitoringStartAt: '2020-07-29 07:30:25',
                executionMonitoringEndAt: '2020-07-29 11:03:29',
                cancelled: 2102446752,
                completed: 9087009307,
                error: 1036562768,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'bje76ittapq3l0pz892kljpe3065rr97lony00a1y1t9evuhxi',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:34:27',
                executionMonitoringStartAt: '2020-07-28 22:29:11',
                executionMonitoringEndAt: '2020-07-29 15:08:24',
                cancelled: 1637614423,
                completed: 4980608866,
                error: 2627472486,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'frloqk3d73lc9zz2754z8k0s3le0zdw78eidepe3iulzrqyqbq',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'emzz05kbyqxzqka3pb5s',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:17:11',
                executionMonitoringStartAt: '2020-07-28 17:56:50',
                executionMonitoringEndAt: '2020-07-28 17:17:21',
                cancelled: 7830090849,
                completed: 4217770874,
                error: 9533711287,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'hz71mvcxubk6rv3fr2e8lb8utrw4xj5v8b7crw469959n6melx',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'm83p4reayzeh2annln5y',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:33:30',
                executionMonitoringStartAt: '2020-07-29 05:34:53',
                executionMonitoringEndAt: '2020-07-29 00:39:20',
                cancelled: 4008792622,
                completed: 3852704573,
                error: 2575198224,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'oxsbgbodkixwxye24leujchair4iqpinnbxhi8v4hnshi4vz8n',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'vqc5aprnd9tu5i6zeegq',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: null,
                executionExecutedAt: '2020-07-29 10:33:28',
                executionMonitoringStartAt: '2020-07-28 17:15:40',
                executionMonitoringEndAt: '2020-07-29 06:32:27',
                cancelled: 4809162810,
                completed: 2137444782,
                error: 9005004188,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: '8cj6b2okm02930qao9idi5q58updkb6scvq5mc1di3dpr86wy5',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'qat55rkwhhzgjgkyvktj',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                
                executionExecutedAt: '2020-07-29 07:21:41',
                executionMonitoringStartAt: '2020-07-28 21:15:23',
                executionMonitoringEndAt: '2020-07-28 20:58:37',
                cancelled: 6192416885,
                completed: 3070078805,
                error: 8535356696,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'pyz4y3fe2fdml49wyqao7i0o9o9uil5huwlyb45mo4ovdji9xx',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'yr2n77pke4zzfuzvw3wv',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 14:02:55',
                executionMonitoringEndAt: '2020-07-29 04:39:37',
                cancelled: 3601104914,
                completed: 7042511285,
                error: 1468029309,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'gj6xvw8lz4mvjo6qyypq9nudlhhjgxc4m5vvrkdhjrbfh5vrxg',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'rbhyjdx9yus8ldr78yed',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 13:51:52',
                executionMonitoringEndAt: '2020-07-29 06:45:24',
                cancelled: 8425469706,
                completed: 4435304469,
                error: 3929434530,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'evkku3yo5ohuq2703earp3ekx4yulo39cogxommmp2335y10n6',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'v8nelwx71vfw7sw2unnp',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:43:51',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 05:27:36',
                cancelled: 1300939462,
                completed: 5758749674,
                error: 6578649355,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: '6wv1d65fpqlmlr2fm3wtwmb8x9ltbgnevhu2ff5l4fh2jkyol8',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'bm4nqbp2tl6wxr00hfiw',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:42:47',
                
                executionMonitoringEndAt: '2020-07-29 15:01:18',
                cancelled: 1051362989,
                completed: 1384200002,
                error: 2633859197,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'd3txcw1lm0sj7qrrei73gfwfsgd6rgzm3gyb6cz4221hecpcv6',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: '5ls2kb13k3anaodlkum7',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:53:16',
                executionMonitoringStartAt: '2020-07-29 00:15:26',
                executionMonitoringEndAt: null,
                cancelled: 6632155743,
                completed: 2608849575,
                error: 3850665541,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'f68e7zhk7wz6otxy3g5quidgj9jzz3qo7y01075goei0sjnnvp',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'o48kfm2u17id6tsa668e',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:04:12',
                executionMonitoringStartAt: '2020-07-29 07:38:45',
                
                cancelled: 6648501062,
                completed: 6941272881,
                error: 1307587150,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'qq3xvkk2w9dptr1nol5i83xird3rtop9vqb2f',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'tw7gp1h17gqk5jmh6z1sqhg3fmr2yislhwgf8ykn1eyuszbojy',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'jujjn02az47amr7od7bb',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:29:58',
                executionMonitoringStartAt: '2020-07-29 13:06:38',
                executionMonitoringEndAt: '2020-07-29 11:51:37',
                cancelled: 3168431240,
                completed: 2396733491,
                error: 2827723917,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '69hg2ephxmedia0smij6m00n4tznqrues0qs6',
                tenantCode: 'n8yus5yhhwav3swunwx5iw7y0zljubapru9pd1gembxtoqkib2',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: '0w958jyudg5lzmfkck82',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:16:59',
                executionMonitoringStartAt: '2020-07-28 17:24:14',
                executionMonitoringEndAt: '2020-07-28 23:01:08',
                cancelled: 5570430846,
                completed: 5752102781,
                error: 8181733498,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'y9why7y53gm5mefs7zcwjxl5ps3gzbtjlgeber0gpoyp1jurvu',
                systemId: 'il1cl1obdh7itlaef7dk46513t6x3kvtzadcg',
                systemName: '6nsxrrq9j3vdpg3py0n8',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:58:21',
                executionMonitoringStartAt: '2020-07-29 10:03:10',
                executionMonitoringEndAt: '2020-07-29 07:33:32',
                cancelled: 7671537371,
                completed: 5462205257,
                error: 7684796022,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: '3mjjh1c2pahqtlxjva9v2i0ox85wz63rkfkzffj0ljql3hy8rf',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: '2138p4glcezwi093iuk1',
                executionId: 'tgaegwcnmx3x23jm84dkgdogvjnbzzpyhnek7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:03:31',
                executionMonitoringStartAt: '2020-07-28 18:34:34',
                executionMonitoringEndAt: '2020-07-29 15:03:31',
                cancelled: 8080693146,
                completed: 4192688919,
                error: 7672294453,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'xojas3vuleshx19x6rumnn3ue6h2rpk3f8wx5rlcgdciy7w9kvd',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: '6u9s79ahrrsboz7ivulj',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:02:55',
                executionMonitoringStartAt: '2020-07-29 05:13:32',
                executionMonitoringEndAt: '2020-07-29 10:20:25',
                cancelled: 9192791486,
                completed: 4893834356,
                error: 8532446845,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: '1zlp4k4pkx44110kl2h2pc2l5zbw8e1aoa8oq72gtx4gudpi9b',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'er47fynjyzge8q4rsvpoc',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:47:03',
                executionMonitoringStartAt: '2020-07-29 14:38:55',
                executionMonitoringEndAt: '2020-07-29 07:47:46',
                cancelled: 2664523608,
                completed: 5454419909,
                error: 4823779958,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: '8x0mtzap96qb4jd1cwk253lwcypo4ky62usf2bcwl8n99mqkbo',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: '32n9t6tmje350dy1hxbx',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:08:50',
                executionMonitoringStartAt: '2020-07-29 13:55:22',
                executionMonitoringEndAt: '2020-07-29 05:57:25',
                cancelled: 26112915818,
                completed: 3923091430,
                error: 8297132758,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCompleted is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'ganwu2drerssbjvnn5dvn9dn52x7wx40bk1eo9c4w22otjq0mv',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'w7wdk1s1i4tq3dt6sg6v',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:31:17',
                executionMonitoringStartAt: '2020-07-29 11:06:12',
                executionMonitoringEndAt: '2020-07-29 11:52:39',
                cancelled: 5848854878,
                completed: 26044268632,
                error: 9500767231,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCompleted is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'lv8o1vj1p910eev5xshce6uo6u1db1j8fucl806vkux9ucj0yl',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: '8hrxz1man31who9mwrnl',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:54:05',
                executionMonitoringStartAt: '2020-07-29 10:13:12',
                executionMonitoringEndAt: '2020-07-29 02:39:16',
                cancelled: 8270517647,
                completed: 7729493448,
                error: 90912199409,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewError is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCancelled must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'ts50fw14msb50dh0lko51ea9rgjvnhzdh083sbw1kwkj2252lg',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'h8lh5wjxpjlrl5tuux0r',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:19:12',
                executionMonitoringStartAt: '2020-07-28 19:53:09',
                executionMonitoringEndAt: '2020-07-29 14:18:46',
                cancelled: -9,
                completed: 5311555448,
                error: 5932760043,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCompleted must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: '7plig3qejkpk7az8274c3vkrqsdw6si83jv5cmdihdlsl1uxe9',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'zmrbgqldq0efskyocido',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:26:00',
                executionMonitoringStartAt: '2020-07-29 14:05:36',
                executionMonitoringEndAt: '2020-07-29 08:59:11',
                cancelled: 1737567599,
                completed: -9,
                error: 3958918263,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCompleted must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: '7tnvz06qycd4x7lk2b5iv0mzazyjf9zb2pypjrjtglkgo0wmbt',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'u1rucgzpy2wo09eqtgpk',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:42:05',
                executionMonitoringStartAt: '2020-07-29 05:14:04',
                executionMonitoringEndAt: '2020-07-29 01:41:44',
                cancelled: 2802874649,
                completed: 4008909530,
                error: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: '3fsx1zh8ykkotehe741wew1j2r17ue1psgx5mqme9mxdusig10',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: '08bi2mvl5i34q9hcox34',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 21:02:28',
                executionMonitoringStartAt: '2020-07-29 15:26:08',
                executionMonitoringEndAt: '2020-07-28 21:35:10',
                cancelled: 4279664885,
                completed: 3042058203,
                error: 7519180752,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'gsotzqys8iea2sscrpiglqpfscghpocddyr4v2510snb89jtye',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'jxc1usgvc7vd3ywzwscy',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 04:25:15',
                executionMonitoringEndAt: '2020-07-28 21:15:21',
                cancelled: 7451099591,
                completed: 3732648819,
                error: 9410936566,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'j3mzgrj4o2cb3sf2ea7vn87pmght3fgbsnsh187d81xj0ctf9k',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: '3h85c9kgmncnff69k136',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:08:22',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-28 23:22:48',
                cancelled: 8784858705,
                completed: 4090394226,
                error: 5129468917,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'f3070go5mp4zjc4bg1pdf479mfkt9gtj5liwzkad0jeqn5wx98',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'n7a8m9q3rz7chzglx4j3',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:48:15',
                executionMonitoringStartAt: '2020-07-29 09:32:38',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 1499614213,
                completed: 6739931480,
                error: 6474482169,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'c40u13ilbmo7rjvm5r653z3b2xfabloxnf7kwxng6kxmyn093y',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: 'c5g2n8xgrtgs77gyo65l',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 15:58:06',
                executionMonitoringStartAt: '2020-07-28 21:43:05',
                executionMonitoringEndAt: '2020-07-29 15:20:23',
                cancelled: 1517873283,
                completed: 3950577614,
                error: 3470616096,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/jobs-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-overview/paginate')
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

    test(`/REST:GET bplus-it-sappi/job-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview')
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

    test(`/REST:GET bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '38432ebf-50b7-4533-a927-3992fce45a67'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '38432ebf-50b7-4533-a927-3992fce45a67'));
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/38432ebf-50b7-4533-a927-3992fce45a67')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '38432ebf-50b7-4533-a927-3992fce45a67'));
    });

    test(`/REST:GET bplus-it-sappi/jobs-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ce0b5424-c0ec-4660-8d14-d86ba410f583',
                tenantId: '48a1ba62-c1a6-456e-a251-ff401b05bf08',
                tenantCode: 'qn99awjlg87kkpg9t7qfygs9afwi8e5g0t86yb5hvbezdgcucd',
                systemId: '0e0c3864-7361-4312-a0e5-f7f492d8eb79',
                systemName: '9xd2gqj9qbaymfg5xng3',
                executionId: '891a4443-137c-4a2f-9793-ff8a3d148289',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:24:21',
                executionMonitoringStartAt: '2020-07-29 02:13:11',
                executionMonitoringEndAt: '2020-07-28 18:48:09',
                cancelled: 2091305532,
                completed: 1172632957,
                error: 6704193535,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '38432ebf-50b7-4533-a927-3992fce45a67',
                tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                tenantCode: 'zcvlxmx2sget65vh12my347odubt53ntu35zw91rf5c0jvq14h',
                systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                systemName: '5q1gua243uk5qf39k92m',
                executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:28:55',
                executionMonitoringStartAt: '2020-07-29 15:17:52',
                executionMonitoringEndAt: '2020-07-29 00:18:02',
                cancelled: 2777864857,
                completed: 1614529532,
                error: 5265456222,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '38432ebf-50b7-4533-a927-3992fce45a67'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/38432ebf-50b7-4533-a927-3992fce45a67')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateJobOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobOverviewInput!)
                    {
                        bplusItSappiCreateJobOverview (payload:$payload)
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
                            cancelled
                            completed
                            error
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

    test(`/GraphQL bplusItSappiCreateJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobOverviewInput!)
                    {
                        bplusItSappiCreateJobOverview (payload:$payload)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'b53d3b20-1b46-4133-b51a-8e1c799ecd8f',
                        tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                        tenantCode: '8asiskrc2jsibwiy3q5nhb9wwbgfcxc80ml47745fvgxya0fk0',
                        systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                        systemName: '6g9wywhtpfufrkgfg1xv',
                        executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 00:47:57',
                        executionMonitoringStartAt: '2020-07-29 09:18:07',
                        executionMonitoringEndAt: '2020-07-29 00:35:45',
                        cancelled: 1240255799,
                        completed: 1265324069,
                        error: 3878392557,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', 'b53d3b20-1b46-4133-b51a-8e1c799ecd8f');
            });
    });

    test(`/GraphQL bplusItSappiPaginateJobsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateJobsOverview (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateJobsOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindJobOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobOverview (query:$query)
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
                            cancelled
                            completed
                            error
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

    test(`/GraphQL bplusItSappiFindJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobOverview (query:$query)
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
                            cancelled
                            completed
                            error
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
                            value   : '38432ebf-50b7-4533-a927-3992fce45a67'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('38432ebf-50b7-4533-a927-3992fce45a67');
            });
    });

    test(`/GraphQL bplusItSappiFindJobOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobOverviewById (id:$id)
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
                            cancelled
                            completed
                            error
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

    test(`/GraphQL bplusItSappiFindJobOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobOverviewById (id:$id)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '38432ebf-50b7-4533-a927-3992fce45a67'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('38432ebf-50b7-4533-a927-3992fce45a67');
            });
    });

    test(`/GraphQL bplusItSappiGetJobsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetJobsOverview (query:$query)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetJobsOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateJobOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobOverviewInput!)
                    {
                        bplusItSappiUpdateJobOverview (payload:$payload)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '8d0f113a-bbf4-490d-b0b0-cdad11cefbcf',
                        tenantId: 'a997f6eb-cca3-4192-945b-ea7bd0a7ae96',
                        tenantCode: 'n9na59lvtp8fkwmjnpme9inxf3v94mg5q9rna3tx9hmdo45aoa',
                        systemId: '2207d20e-9279-4b65-8085-cad5251192ee',
                        systemName: 'u3ml8eh91mnocpqv9egy',
                        executionId: '4bd8aeef-f008-4766-8403-75dff7a0b1d7',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 06:30:27',
                        executionMonitoringStartAt: '2020-07-28 17:43:06',
                        executionMonitoringEndAt: '2020-07-29 05:54:56',
                        cancelled: 1262939334,
                        completed: 7622609336,
                        error: 7300403867,
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

    test(`/GraphQL bplusItSappiUpdateJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobOverviewInput!)
                    {
                        bplusItSappiUpdateJobOverview (payload:$payload)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '38432ebf-50b7-4533-a927-3992fce45a67',
                        tenantId: '39fb080e-90da-4125-8d54-c102f9dc1cb6',
                        tenantCode: 'l7dvmhs7zzhl1cstlf0m4dsu0fqqkizx953pf3er4bmzwfjq5a',
                        systemId: 'e5729ecf-54c7-403a-87db-248da3f995da',
                        systemName: 'rlsf5wn94r10vug2ntwr',
                        executionId: 'befb1b20-a2e4-4d4e-b185-9a7ee8baea65',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-28 19:08:29',
                        executionMonitoringStartAt: '2020-07-29 12:23:24',
                        executionMonitoringEndAt: '2020-07-28 22:14:16',
                        cancelled: 8087983583,
                        completed: 9407555761,
                        error: 8955015412,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('38432ebf-50b7-4533-a927-3992fce45a67');
            });
    });

    test(`/GraphQL bplusItSappiDeleteJobOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobOverviewById (id:$id)
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
                            cancelled
                            completed
                            error
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

    test(`/GraphQL bplusItSappiDeleteJobOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobOverviewById (id:$id)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '38432ebf-50b7-4533-a927-3992fce45a67'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('38432ebf-50b7-4533-a927-3992fce45a67');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});