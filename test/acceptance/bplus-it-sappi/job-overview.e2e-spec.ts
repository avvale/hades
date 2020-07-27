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
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: '0so5b09r383xnmwyo24cakor5y3i2a7m1814kjw2gj8qr8s6jt',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: '7vjb8dz5377z2o1x6ui0',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:42:54',
                executionMonitoringStartAt: '2020-07-27 11:23:43',
                executionMonitoringEndAt: '2020-07-27 05:30:46',
                cancelled: 4206167735,
                completed: 1287501383,
                error: 5443099808,
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
                
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'r37taue48nfzmnzb4kuxg2iwd9q43y7042c800jkxd6cjyjf2m',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'c8fdk8a57ahm1bjmo0z6',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 18:39:29',
                executionMonitoringStartAt: '2020-07-27 10:19:21',
                executionMonitoringEndAt: '2020-07-27 03:45:30',
                cancelled: 5861649072,
                completed: 2913680405,
                error: 7491450090,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: null,
                tenantCode: 'wosl6mbysnzhju0emdk54lu4cjr0hzpsle6ypzudike3qc8cgr',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'jyf3gwtk73wb04c3wh11',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 18:45:29',
                executionMonitoringStartAt: '2020-07-27 04:40:03',
                executionMonitoringEndAt: '2020-07-27 08:46:55',
                cancelled: 1709183128,
                completed: 4641306903,
                error: 3864262488,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                
                tenantCode: 'q7bpgjcsjeaplbg54ewxrmql3uhs517yxy53vlkv0pj7ntk143',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'w6zdofddf1yrjce7frkf',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 23:10:13',
                executionMonitoringStartAt: '2020-07-27 15:33:59',
                executionMonitoringEndAt: '2020-07-26 19:05:50',
                cancelled: 5263723380,
                completed: 9216636369,
                error: 6897930018,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: null,
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: '4jzyx4burpt409r344tp',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:57:52',
                executionMonitoringStartAt: '2020-07-27 04:54:12',
                executionMonitoringEndAt: '2020-07-27 14:41:12',
                cancelled: 5059929221,
                completed: 6318849662,
                error: 5455850414,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'jhu3qr5xeouj8lyvn4r4',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 00:15:20',
                executionMonitoringStartAt: '2020-07-27 04:51:29',
                executionMonitoringEndAt: '2020-07-27 00:57:03',
                cancelled: 1267794299,
                completed: 7547397050,
                error: 3688169896,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'x84lm0mbljof9kh0oshysk6qu8c6k095lceqhmt3yxcgm4j4c9',
                systemId: null,
                systemName: '7z6ex3g499irgvlgw5f1',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 23:41:52',
                executionMonitoringStartAt: '2020-07-27 08:05:35',
                executionMonitoringEndAt: '2020-07-26 23:09:45',
                cancelled: 2831732527,
                completed: 9351528290,
                error: 8740993642,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: '9inzokhrh8nqlvwfgozw1ey3q6n5f8xr7xv6lzoldyqp9gw3w7',
                
                systemName: '8a2vzbwggd1l8zy5q1mm',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 06:46:09',
                executionMonitoringStartAt: '2020-07-27 11:38:27',
                executionMonitoringEndAt: '2020-07-27 07:16:23',
                cancelled: 3937296510,
                completed: 5375402892,
                error: 5089361694,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'ql54urqdwu1kn8021lrb1rycnqhzs978ffxsqxep5oqva3fx8y',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: null,
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:28:30',
                executionMonitoringStartAt: '2020-07-27 09:27:44',
                executionMonitoringEndAt: '2020-07-27 07:59:29',
                cancelled: 3270863479,
                completed: 9775637867,
                error: 6950720020,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'rxasa67ye672ez3mxcg21ihptycb6uqpm6ltm72ud77y78f244',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:53:59',
                executionMonitoringStartAt: '2020-07-26 23:16:22',
                executionMonitoringEndAt: '2020-07-27 07:08:34',
                cancelled: 5050651010,
                completed: 7589035750,
                error: 1481442327,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'skaybcq07f5vinix6w4fkd7nkskg33aga3z7e3oidvzxp7gced',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'gevtudfbq8eiwe0a7lam',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:19:17',
                executionMonitoringStartAt: '2020-07-26 22:38:18',
                executionMonitoringEndAt: '2020-07-27 08:02:18',
                cancelled: 8067228467,
                completed: 5705587494,
                error: 3922144546,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'c4ytmgx91adl59etkpqd2ppepv1yydutgi6uc6schq5lr07rme',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'iwo4p4wi2m7juvia2r6a',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:23:32',
                executionMonitoringStartAt: '2020-07-27 00:53:28',
                executionMonitoringEndAt: '2020-07-27 01:47:03',
                cancelled: 1740487596,
                completed: 9709919935,
                error: 4781016209,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'scbbwho4x0y2908yjn5op9bae6vbl32vjxl6givky0jdb3u7bi',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'b5vtqui1u61j2dsnnkw2',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: null,
                executionExecutedAt: '2020-07-27 00:04:56',
                executionMonitoringStartAt: '2020-07-27 09:56:02',
                executionMonitoringEndAt: '2020-07-26 21:27:28',
                cancelled: 3802697949,
                completed: 1236963655,
                error: 5079050081,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'fz54xvtai6d8hx4ty0b59y1fyqn9fo1y89c33jy9d3e9rxv3wd',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'wpekn18xsiafuts8ofz3',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                
                executionExecutedAt: '2020-07-27 12:46:55',
                executionMonitoringStartAt: '2020-07-26 22:29:53',
                executionMonitoringEndAt: '2020-07-27 16:08:28',
                cancelled: 1324855726,
                completed: 1354028485,
                error: 5977403762,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'c2wu4nkdlfx4ri1t2rv7p5hjy6apt4wg2z60uragc7f8sk63f1',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'elfehb7uz5hlkaobt06r',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 14:19:29',
                executionMonitoringEndAt: '2020-07-26 20:15:38',
                cancelled: 4674928863,
                completed: 4176669770,
                error: 1685528777,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: '9aupbtr2rgj4l6arxjkd0a8q4fhb9bpr90vssdrfll69hxgic1',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: '1r641nu3x95383vvn7qj',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-27 03:33:34',
                executionMonitoringEndAt: '2020-07-27 16:49:16',
                cancelled: 3164297278,
                completed: 9973255191,
                error: 6967729897,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'e2r5syemmcce03pay8ajceqlds1g7c951rgvxqgnqsiq2x8fum',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'y9p03qfsv6k11mplkfyi',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:18:53',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-26 23:04:29',
                cancelled: 2875316550,
                completed: 8066226850,
                error: 5339654891,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: '2oup00cdclcl4lfl358olm0lzaat85j27egll4ziszpgnbuf0c',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'izy4mamehzht9mcbebia',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 03:41:06',
                
                executionMonitoringEndAt: '2020-07-27 07:21:41',
                cancelled: 3308567273,
                completed: 7267097329,
                error: 2668575257,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'fb07el94ikvm4253wrg59k5b4prbibmeopfxbya467nzqxt1wv',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: '7xd257sjruy79wmy1i82',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:32:57',
                executionMonitoringStartAt: '2020-07-27 15:04:51',
                executionMonitoringEndAt: null,
                cancelled: 3136450385,
                completed: 7358685492,
                error: 5169674151,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'fyasxed0j8estv7zr46kbjqa3tg5qna008pi29omn7l8epceoj',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'pv72xmrk9i7rk1oy10me',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 22:52:17',
                executionMonitoringStartAt: '2020-07-27 00:09:16',
                
                cancelled: 8973494908,
                completed: 2022047963,
                error: 6869794861,
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
                id: '2217h8xsuc0d8ed4nnxfcgbns9x95kgdu74pt',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'rh2cu5qrq1kd7df5xd698bzp5yn67m3attpu9tmrf0l1nbx3ot',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'gt69qtmq62f3kcv8y4m5',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:47:59',
                executionMonitoringStartAt: '2020-07-27 10:16:33',
                executionMonitoringEndAt: '2020-07-27 05:58:32',
                cancelled: 1173313318,
                completed: 5687598637,
                error: 3654107824,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'tw1rtjb4iwws5dw3ywakklkqwlaqnri3gr68a',
                tenantCode: 'yu28vnhy2uf6us8a3yd7ebkx9xppazbx1hwdab0f0991h7r8od',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'ak9vkmheo92s9aouzzlz',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:21:28',
                executionMonitoringStartAt: '2020-07-26 21:02:41',
                executionMonitoringEndAt: '2020-07-27 11:19:20',
                cancelled: 1329177070,
                completed: 9308409381,
                error: 3259692050,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'y0g900r8ujkf5lsfsj04806pok401yboprqox6rbpekoxxpn09',
                systemId: 'i9fd7yhsxaoddnr2ilrdhpapsbyd7jjw9ayv0',
                systemName: 'jl8h4hwh6hvj60uw5njt',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:18:27',
                executionMonitoringStartAt: '2020-07-27 10:23:27',
                executionMonitoringEndAt: '2020-07-27 05:31:22',
                cancelled: 7137965675,
                completed: 1502169266,
                error: 7952427811,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: '037xlz1qsxvc9zid924o96qttudbgu25bn0khzgdd2motmvieq',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: '0sq81wp73e24gtxxorxf',
                executionId: '71fr9uvcjep9btv64wv3ndicq8bdnhbyqmnpg',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:48:35',
                executionMonitoringStartAt: '2020-07-27 15:40:17',
                executionMonitoringEndAt: '2020-07-26 20:00:09',
                cancelled: 8889634157,
                completed: 1704352590,
                error: 6363937834,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: '1zcxqwu97eqz00d2mc7upzxy6ma2699xkqsfxqfyzqr5g5ig9sd',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'm8r5x69lug1uaqzh9c8o',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:58:06',
                executionMonitoringStartAt: '2020-07-26 21:58:09',
                executionMonitoringEndAt: '2020-07-27 00:47:56',
                cancelled: 7958155435,
                completed: 4234883898,
                error: 3206405148,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: '26h0w2frrilv1j110xwqiwhfze0den6cbwq10ioqeg6xanmkp4',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 's97kej1j4glny1tyjq9xg',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:42:34',
                executionMonitoringStartAt: '2020-07-27 08:08:56',
                executionMonitoringEndAt: '2020-07-27 14:07:32',
                cancelled: 3095107946,
                completed: 2949368040,
                error: 3073611724,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'orpxm6qmq46hsus3yzw164jusmj69rs7xnixshk25cr6s70xof',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: '6hzh444441hzofvj83dx',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:07:19',
                executionMonitoringStartAt: '2020-07-27 13:49:23',
                executionMonitoringEndAt: '2020-07-26 21:52:50',
                cancelled: 12953533961,
                completed: 2313083938,
                error: 5075386325,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'nzr11ciw72h36d4yneeu571ilu42awc2dc7nzse5rr975rruaq',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'cop2rbkojid3im4okzvg',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:42:53',
                executionMonitoringStartAt: '2020-07-27 01:16:58',
                executionMonitoringEndAt: '2020-07-27 02:22:40',
                cancelled: 8543496760,
                completed: 11073789187,
                error: 5830635222,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'rpbg0zumse62r33559nbm1u9yk7m4cyu74hvva11v0q91vhbgi',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'to4uqygg4psriecyh7wx',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 19:15:33',
                executionMonitoringStartAt: '2020-07-27 06:31:34',
                executionMonitoringEndAt: '2020-07-27 16:45:42',
                cancelled: 4858953051,
                completed: 3566520259,
                error: 88952697399,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'ryr3zq6imifhia2h6mxe610c7wvyw8j6eee0u6tn7drprx4rr8',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'zklbisdomx69csmjo79c',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 23:52:16',
                executionMonitoringStartAt: '2020-07-27 13:31:53',
                executionMonitoringEndAt: '2020-07-27 16:16:31',
                cancelled: -9,
                completed: 3388712319,
                error: 8989002366,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'g0nduuzf01ik4bz6gttl68wlcxfpo09yeb7n1onyoqn17qjc5b',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'kir3z5kznyymiwwd0aok',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 08:19:06',
                executionMonitoringStartAt: '2020-07-27 16:54:09',
                executionMonitoringEndAt: '2020-07-27 10:17:58',
                cancelled: 9465310804,
                completed: -9,
                error: 9251569920,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'k3v8fwp0csn0g604ib4wbftzacxii0tp8jvmrej2od307lxd2x',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: '9mzgb47c54pf5mi4rb1o',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 20:43:15',
                executionMonitoringStartAt: '2020-07-27 08:29:06',
                executionMonitoringEndAt: '2020-07-27 01:38:23',
                cancelled: 5786373163,
                completed: 4144233538,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'mmg4w90c8btyj05itx7xc1dxgyx397hq9d5hwa381ytg6tuyq7',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: '6wwjijwlktii1u1q7lnn',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 07:25:16',
                executionMonitoringStartAt: '2020-07-27 09:42:54',
                executionMonitoringEndAt: '2020-07-27 08:16:31',
                cancelled: 5699744461,
                completed: 6893252532,
                error: 3067566975,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'apwdg41vqirhkwnzngp94guw750tcrru9566w45ykdq3kbni55',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'vs6vte61frdywbcb3acn',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-26 23:57:53',
                executionMonitoringEndAt: '2020-07-27 05:08:01',
                cancelled: 9766937940,
                completed: 2707253479,
                error: 1231226597,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'x9glgokz95bvjz83aorzjpmpmwdxj2f7wxpcu0prnsfkxv4lli',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'fhw1ywzasd1pm9m363r1',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:35:45',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 04:01:17',
                cancelled: 9869858422,
                completed: 3487271676,
                error: 8603073772,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'ey1a381gs80mlpdlndtg93tootz67id5gr8rvn17pg6lvsanf5',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: '8d4b8l3ahf6oguj63aom',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:18:01',
                executionMonitoringStartAt: '2020-07-27 07:40:59',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 1552335405,
                completed: 6979288808,
                error: 1998667661,
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
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: 'bv47nb5d4xfqlck2lrxqyc0tcu19ltkhed30nsrfsw415ybben',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'lahfvdid6ao8qadakf8y',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 18:31:14',
                executionMonitoringStartAt: '2020-07-27 18:21:37',
                executionMonitoringEndAt: '2020-07-27 16:03:29',
                cancelled: 7774762150,
                completed: 7628736978,
                error: 4994574246,
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
                        value   : '47466a0f-9462-4b41-8259-c95ed5cfe873'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '47466a0f-9462-4b41-8259-c95ed5cfe873'));
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
            .get('/bplus-it-sappi/job-overview/47466a0f-9462-4b41-8259-c95ed5cfe873')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '47466a0f-9462-4b41-8259-c95ed5cfe873'));
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
                
                id: '54d2ab9c-a737-4e6c-bc8a-0b1f4e791ad2',
                tenantId: '44e3e0e0-8ff1-4cf2-8be8-b4f888d11d50',
                tenantCode: 'h6ma0p8yh9lo4glvkxow3c48q0mpdxzqnm85ar4ru96yocsm08',
                systemId: 'db3965fa-274f-479a-bdb7-bd95c3cb96b3',
                systemName: 'emwxkilb0c3bojpgwaof',
                executionId: '81968481-f612-4bf5-adc9-190c274a9647',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:56:41',
                executionMonitoringStartAt: '2020-07-26 20:17:39',
                executionMonitoringEndAt: '2020-07-27 05:06:45',
                cancelled: 4884729545,
                completed: 6701235507,
                error: 4132987052,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                tenantCode: '8wacq0ycl8dvhjk56dwo863mbt2r4foe1adqalh9rlbu6rth46',
                systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                systemName: 'bkfmwjy59tpfq8fgnyez',
                executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:34:19',
                executionMonitoringStartAt: '2020-07-27 18:12:26',
                executionMonitoringEndAt: '2020-07-27 02:47:40',
                cancelled: 4638609884,
                completed: 8921261668,
                error: 5776438125,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '47466a0f-9462-4b41-8259-c95ed5cfe873'));
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
            .delete('/bplus-it-sappi/job-overview/47466a0f-9462-4b41-8259-c95ed5cfe873')
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
                        id: '0e179c42-564c-456f-9b6f-17748ef0d14d',
                        tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                        tenantCode: '8yife912l09a9v5dzus3tn4wg8ztydeqwq182m4hxahn6wimkj',
                        systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                        systemName: 'sm9g3zg1dhn1lyg8i469',
                        executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 03:43:18',
                        executionMonitoringStartAt: '2020-07-26 22:04:26',
                        executionMonitoringEndAt: '2020-07-27 07:34:39',
                        cancelled: 7202738814,
                        completed: 6946140668,
                        error: 1981415998,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '0e179c42-564c-456f-9b6f-17748ef0d14d');
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
                            value   : '47466a0f-9462-4b41-8259-c95ed5cfe873'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('47466a0f-9462-4b41-8259-c95ed5cfe873');
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
                    id: '47466a0f-9462-4b41-8259-c95ed5cfe873'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('47466a0f-9462-4b41-8259-c95ed5cfe873');
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
                        
                        id: '3564bef5-e0b1-48ea-9937-4dd64c79521e',
                        tenantId: '1ad498c8-fef0-4b75-8b36-e1bd527d3c11',
                        tenantCode: 's2sbnnea2la2e1t0g8mxu4rme16b168tdczwyr8czkjuk84dww',
                        systemId: '56f3ff1e-e049-4b68-9b3b-c0f1f5685064',
                        systemName: '1sookqu6rxhwv95g97g0',
                        executionId: 'ec832087-c6d4-4169-9c0c-60d9f27e6d59',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-26 20:12:55',
                        executionMonitoringStartAt: '2020-07-27 10:03:51',
                        executionMonitoringEndAt: '2020-07-26 20:12:18',
                        cancelled: 3052133781,
                        completed: 3069413983,
                        error: 9954756490,
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
                        
                        id: '47466a0f-9462-4b41-8259-c95ed5cfe873',
                        tenantId: 'afe972a9-a94f-4cd8-a8df-26c6e2771f5d',
                        tenantCode: 'tdrkqck8imljbodlanhb8i8jubzws4ij7apdyjamfknupbvy9l',
                        systemId: 'ffce8974-2ecb-4c86-9387-732b0472e631',
                        systemName: 'q3x726s4nczkqkjo5jca',
                        executionId: '2cbaa6c3-91ab-4963-9612-0c11cc8a8920',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-26 19:16:03',
                        executionMonitoringStartAt: '2020-07-27 00:12:51',
                        executionMonitoringEndAt: '2020-07-27 18:34:39',
                        cancelled: 7963073288,
                        completed: 6102818824,
                        error: 6274061654,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('47466a0f-9462-4b41-8259-c95ed5cfe873');
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
                    id: '47466a0f-9462-4b41-8259-c95ed5cfe873'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('47466a0f-9462-4b41-8259-c95ed5cfe873');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});