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
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'bym8osle91lerdh99f9ij1l4oda58f8526auhfzqtqdq15irx4',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: '5cy7prmw5x0bl7om1k2a',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 14:48:16',
                executionMonitoringStartAt: '2020-08-04 19:02:14',
                executionMonitoringEndAt: '2020-08-04 19:04:16',
                cancelled: 9706019530,
                completed: 5280769455,
                error: 8692529675,
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
                
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 's59z7oemtesv83sqeubzp13ea108d9s5gi3268yzsckyqqk6rj',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'u7wvs3w99y51bygmz4ph',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 21:56:11',
                executionMonitoringStartAt: '2020-08-04 15:02:02',
                executionMonitoringEndAt: '2020-08-04 23:27:26',
                cancelled: 1932635411,
                completed: 4855510495,
                error: 7375834803,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: null,
                tenantCode: 'fzwiikot7uhhwq58k4xaezk4bibyd1wckbtvesqgm7c7of02ao',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: '9uf3yo5fcz1vsfs8w7ml',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 06:09:03',
                executionMonitoringStartAt: '2020-08-04 12:52:33',
                executionMonitoringEndAt: '2020-08-05 03:01:03',
                cancelled: 2926693337,
                completed: 1600991233,
                error: 8361780723,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                
                tenantCode: 'qn1lsps8tedn36n79zchik0fni6bsdj1s43q9z45yhbl8valu5',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'cfq6aovc4mcqxfjj9tjc',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 11:21:29',
                executionMonitoringStartAt: '2020-08-04 16:50:31',
                executionMonitoringEndAt: '2020-08-04 20:35:09',
                cancelled: 2856419875,
                completed: 7628750812,
                error: 8512522375,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: null,
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'g53h5nsd4n8m61p7gvev',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 16:11:27',
                executionMonitoringStartAt: '2020-08-05 08:36:50',
                executionMonitoringEndAt: '2020-08-04 20:57:39',
                cancelled: 8822763455,
                completed: 1007954984,
                error: 3288366986,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'oadpsoflp3jsh8iyc2cc',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 14:21:21',
                executionMonitoringStartAt: '2020-08-05 05:04:40',
                executionMonitoringEndAt: '2020-08-05 03:43:22',
                cancelled: 2935681302,
                completed: 5325104925,
                error: 8939771784,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'rvyvp5tudsu1cne4jdmyylirevyriuhduxy7tilxgorllgpuia',
                systemId: null,
                systemName: '8swl6zac2l0xmo6i1k1a',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 17:29:33',
                executionMonitoringStartAt: '2020-08-05 05:58:45',
                executionMonitoringEndAt: '2020-08-04 18:05:22',
                cancelled: 6824870880,
                completed: 2028652821,
                error: 3651762671,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'lz5j4a9zisdg5hdu5bwfemjjih5z6lq3n3zk7mbwb37rw0zfjr',
                
                systemName: 'pwk5hn2o68i3yxxb8ync',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 10:32:52',
                executionMonitoringStartAt: '2020-08-04 23:00:21',
                executionMonitoringEndAt: '2020-08-04 10:11:45',
                cancelled: 8083200941,
                completed: 6637271366,
                error: 7255709483,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'w9vl1fsypw9vch3odsahntslhqfog5d9xtzxvkghmkazb5iyce',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: null,
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 01:28:23',
                executionMonitoringStartAt: '2020-08-05 08:26:20',
                executionMonitoringEndAt: '2020-08-04 14:13:49',
                cancelled: 3938212172,
                completed: 8625618867,
                error: 2381582981,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'i2if0u6vqng7gnf421b52g72kifs8els4rc33y75acqmp85wi4',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 15:46:43',
                executionMonitoringStartAt: '2020-08-05 05:58:23',
                executionMonitoringEndAt: '2020-08-05 04:05:52',
                cancelled: 8835845571,
                completed: 8341033437,
                error: 1081875018,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: '9cvwshltg24lif8pvlewictlyzgl8t2gs7q2q3dbhas52wnvq4',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'zh2lz3wnl1lsv49uto6w',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 11:00:10',
                executionMonitoringStartAt: '2020-08-05 03:11:23',
                executionMonitoringEndAt: '2020-08-04 16:40:03',
                cancelled: 7185464474,
                completed: 6383184386,
                error: 7455949967,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'thmwyvzulcpcqz17t9lslvbnahdbaqbo0o9s2be6chro9enwxj',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: '2s9ew3aylyl8uiwwezx2',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 14:01:42',
                executionMonitoringStartAt: '2020-08-05 06:42:07',
                executionMonitoringEndAt: '2020-08-05 04:29:54',
                cancelled: 4199820207,
                completed: 1049939103,
                error: 8057602782,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'loxmowfdtvtfnn3fmnmbiculnjn3ss3cy8wg3a8f6578u819u5',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'feu5y7puwcl2uay5rq4t',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: null,
                executionExecutedAt: '2020-08-04 12:42:26',
                executionMonitoringStartAt: '2020-08-04 19:17:32',
                executionMonitoringEndAt: '2020-08-05 00:59:16',
                cancelled: 7666803728,
                completed: 7065299469,
                error: 4363104195,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'lzrd8n129qqkxye6uo1fgzw9qhvfbg8bsw1yflqniz7bqduqnk',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'uook8zasvn07oj6on7jf',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                
                executionExecutedAt: '2020-08-04 16:59:51',
                executionMonitoringStartAt: '2020-08-05 00:55:26',
                executionMonitoringEndAt: '2020-08-05 02:57:20',
                cancelled: 7406574538,
                completed: 3527009622,
                error: 1569360964,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: '8ds669zstjh79jkfjni4en35veehoe3i6koc10u0k5bn3iarf5',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: '2066cl9r74n6w6wyxwy7',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-04 14:15:09',
                executionMonitoringEndAt: '2020-08-04 17:29:29',
                cancelled: 1859712425,
                completed: 7455368743,
                error: 5460158271,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'tp6e8okavlvc7i2pewuyr8remb7qfap117cltecmbxsc2iwztt',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: '1yb1muxvtsow4ji3zstx',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-08-04 18:32:02',
                executionMonitoringEndAt: '2020-08-05 01:12:12',
                cancelled: 7153409864,
                completed: 1273993540,
                error: 4889893767,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'mnyo42w87km53kih5kr1ip10szj8mm3xpbse66k681dj1vh7ic',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'y7kw1krydos3oeklueh9',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 21:56:54',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-04 13:43:10',
                cancelled: 3125904609,
                completed: 2215679118,
                error: 4970670803,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'yqswx9fx4pjs5xlelxlka30nn3qeuw6sbmdktnr24pwtpye7en',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'pdly6gwtkz4er26fy0y8',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 08:42:43',
                
                executionMonitoringEndAt: '2020-08-04 09:52:20',
                cancelled: 3988490351,
                completed: 3016195072,
                error: 5585902496,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'v8rfxmszalm4lah76tgzc7rm7qy3m8bhizcrulg0ona58gcua5',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'td2set5w1ury7vdtr7tj',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 07:56:32',
                executionMonitoringStartAt: '2020-08-04 16:38:16',
                executionMonitoringEndAt: null,
                cancelled: 6978570593,
                completed: 5586183190,
                error: 4277877702,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: '1xjwj868wek6vlxal6s6gjf8a2m08ijmns68kwbjhki7aw3lzb',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'th378vwpng59b65jd58i',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 17:15:57',
                executionMonitoringStartAt: '2020-08-05 03:34:27',
                
                cancelled: 5309443645,
                completed: 1102118364,
                error: 1870661544,
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
                id: 'w9ffn0klf7ph3x6icpszo9ga8kfos5t7w94d3',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'akown9cueeqytn7gvmki0fipuiy3tksy44lu8gc09m11gtlkg8',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'm7pwtbxhmofrrrx6rlcj',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 08:27:58',
                executionMonitoringStartAt: '2020-08-04 09:30:10',
                executionMonitoringEndAt: '2020-08-05 01:56:15',
                cancelled: 2803541337,
                completed: 3609477591,
                error: 4688703729,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'd9kpyc319vy6zjutp1pmw1f9vravxl37zywiv',
                tenantCode: '0fc8kqegz5km1pywv7xd5ekhzhpindnkitn6bryj8gnoszbq6g',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'yn17j13zu5tnluvw77f7',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 19:18:49',
                executionMonitoringStartAt: '2020-08-04 17:18:56',
                executionMonitoringEndAt: '2020-08-04 11:03:59',
                cancelled: 1017460267,
                completed: 6538646483,
                error: 3082769258,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'mi2e2q69wlys7cfy0tshgtd3b9dttohxgkm3ptdmxcwyy0tict',
                systemId: 'hs8h1824hmm7qmjf0bdrg6d1dthqcn57a8f5t',
                systemName: '0o4ch9nze4v3yg3m71o9',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 09:15:06',
                executionMonitoringStartAt: '2020-08-04 17:41:37',
                executionMonitoringEndAt: '2020-08-04 13:27:12',
                cancelled: 4075261845,
                completed: 1783153732,
                error: 6322699849,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'y8t5jhgv2xo5trrmyyqt89psl6e0m076c8vd96c7tklm4jmzjm',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'mc457nv5hsmzod3wfy2r',
                executionId: 'qlsqd02yrjh680fvgksiu639kit8y39iw7u5w',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 07:27:19',
                executionMonitoringStartAt: '2020-08-05 05:42:16',
                executionMonitoringEndAt: '2020-08-04 14:42:29',
                cancelled: 7732030022,
                completed: 4281946968,
                error: 4898684733,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'v1svba55vcpcl3t26ypunxywji1o4uc9l2n9st57ld79euy1hkl',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'lrq0phjzxzvehmqalspj',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 03:48:38',
                executionMonitoringStartAt: '2020-08-04 11:27:45',
                executionMonitoringEndAt: '2020-08-04 22:24:54',
                cancelled: 5691904381,
                completed: 6673432001,
                error: 4040112096,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 't9yegaaciqcxfkgsbo94tpgpi1svkc8usmz2jqzchsmm8l5i1q',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: '04mwzp8bdmayco9nqul0a',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 10:28:46',
                executionMonitoringStartAt: '2020-08-05 07:59:09',
                executionMonitoringEndAt: '2020-08-04 09:35:47',
                cancelled: 8813239557,
                completed: 6165857827,
                error: 2425151410,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'h5dy7uyznchernq5yd0vva5c9fueddiczc7bzavf15g624f1wr',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'i4403ewndx33bi37pztw',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 02:21:45',
                executionMonitoringStartAt: '2020-08-05 04:34:19',
                executionMonitoringEndAt: '2020-08-05 08:17:32',
                cancelled: 20903201862,
                completed: 5679097763,
                error: 4736310654,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: '5ykab18t0uhhzqkx98gyg3n7i6ibahyqfuz4gfcmcr0apfto7r',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'hyc9oi4zzyzbjgw0z1cz',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 09:59:57',
                executionMonitoringStartAt: '2020-08-04 22:22:30',
                executionMonitoringEndAt: '2020-08-04 14:54:42',
                cancelled: 3795052486,
                completed: 56180567375,
                error: 3919043376,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'vbcjp5w8vmvxtr6ys8f5dh169862352n8920zmn3xe87lzl1nx',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: '56uisrvrtvsl6v55iaoc',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 22:35:12',
                executionMonitoringStartAt: '2020-08-04 11:08:17',
                executionMonitoringEndAt: '2020-08-04 19:40:04',
                cancelled: 8375491618,
                completed: 8157881719,
                error: 68361528659,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'yt4kx4yededkogxedoq8xuhya75sjjqww74ua65v3fekh2la6f',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'gh08h2p7gfxjhrhdi7jn',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 06:52:21',
                executionMonitoringStartAt: '2020-08-04 15:26:18',
                executionMonitoringEndAt: '2020-08-04 18:28:49',
                cancelled: -9,
                completed: 7920360654,
                error: 3389248105,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'ab7iyfvx3j9grx8mh3nkyu6vgl0v6tkqu4zj8gx3abwj7sopj4',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'tchrp4cpqtq6d457wxu7',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 10:45:47',
                executionMonitoringStartAt: '2020-08-05 04:45:27',
                executionMonitoringEndAt: '2020-08-05 06:23:24',
                cancelled: 3503608625,
                completed: -9,
                error: 5812091744,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'czlpdl6ak6aekmn7ws316bxnafttd2ece7ppgxsxo73pr6fbop',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: '9lk9kdbqlg9wu9yjwz5s',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 16:39:03',
                executionMonitoringStartAt: '2020-08-04 14:23:47',
                executionMonitoringEndAt: '2020-08-05 06:55:53',
                cancelled: 3868650684,
                completed: 1583271154,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'ljeu234n3stfdqqw48t7wdep5dsxczi00hver7k5vk2nzl5vo0',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: '770cxrutsaesnru4wojg',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-04 14:03:29',
                executionMonitoringStartAt: '2020-08-05 04:34:45',
                executionMonitoringEndAt: '2020-08-05 04:29:56',
                cancelled: 9876025874,
                completed: 9546742215,
                error: 6260607533,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: '1nm8e73jskogx9nawjyjwmvqy1v5xk8uielghxgee2sfm0bsuq',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'hqhx8kzip814vkhgdq14',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-04 13:10:24',
                executionMonitoringEndAt: '2020-08-05 00:33:52',
                cancelled: 4916408751,
                completed: 6186837969,
                error: 4436303082,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'qhwrarpue3vwxx42ym97k6i9z2dgphv8h1gg7748tprwfx16ue',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: '3iduy93mx01ndcygfiu5',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 23:28:36',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-04 14:53:18',
                cancelled: 9666050712,
                completed: 8378590382,
                error: 2445189298,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'wkefzfkq791ho4rebsvcfyp3yt2y6st0a2dz0w9muxplzsit9r',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'bsf4eltuooiv9dvogkip',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 11:36:16',
                executionMonitoringStartAt: '2020-08-04 17:50:29',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 4968811361,
                completed: 7043653857,
                error: 1726846253,
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
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: '7ky6cbnarmcreu6gcju3yaja4tnokmrhfwhh03s5ffm76te5x5',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: '5eis28npv2dt3vgjzn3x',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 11:33:16',
                executionMonitoringStartAt: '2020-08-04 11:22:28',
                executionMonitoringEndAt: '2020-08-05 08:25:53',
                cancelled: 2078034343,
                completed: 6432064456,
                error: 5871761741,
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
                        value   : 'b3cb9969-0e56-4e9c-bff4-18177ddb2411'
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
                        value   : '7177e09a-1df1-4b27-a273-5112a3697fef'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7177e09a-1df1-4b27-a273-5112a3697fef'));
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/5535ec27-738d-413b-9e32-3a17db38489a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/7177e09a-1df1-4b27-a273-5112a3697fef')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7177e09a-1df1-4b27-a273-5112a3697fef'));
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
                
                id: '0779f41d-c411-4603-9fd3-89983ff2ca41',
                tenantId: '5b666fee-05b2-4abb-97dc-55c623b2b97f',
                tenantCode: '53gtdhn5kqlrtxo1obltyvnqn385jbmcsdogfefvv16ws2xks7',
                systemId: '4328038b-dfb4-40f0-b3b8-8f776338520f',
                systemName: 'cc4dr17h3qrc430faac5',
                executionId: '3e054e4c-8dc2-4657-bb62-86d4286d6466',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 20:11:02',
                executionMonitoringStartAt: '2020-08-05 06:25:42',
                executionMonitoringEndAt: '2020-08-05 06:15:06',
                cancelled: 9403356063,
                completed: 2781915132,
                error: 5828747986,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                tenantCode: 'kg8kijtn8ai3hktgcki74ht31hff63bwo68nwbt9hsjcgm7k22',
                systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                systemName: 'i87x9f5ojfbguzgm45rn',
                executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 04:11:22',
                executionMonitoringStartAt: '2020-08-04 09:18:24',
                executionMonitoringEndAt: '2020-08-04 23:01:50',
                cancelled: 2826805543,
                completed: 6753654270,
                error: 8324882417,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7177e09a-1df1-4b27-a273-5112a3697fef'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/01e99fe7-cc24-498d-897c-559c6e530d3c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/7177e09a-1df1-4b27-a273-5112a3697fef')
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
                        id: '9b96c114-1d03-4607-8c6a-44d9b29d1cbc',
                        tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                        tenantCode: 'cmayzbwwaic8u24loyjy289jxzpbzz31ffld0cw2o30h1pwg1m',
                        systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                        systemName: 'fjp1kzyfp6gecn4ads56',
                        executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-05 07:06:17',
                        executionMonitoringStartAt: '2020-08-04 21:01:02',
                        executionMonitoringEndAt: '2020-08-04 11:00:11',
                        cancelled: 3966268269,
                        completed: 6941777591,
                        error: 9078033669,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '9b96c114-1d03-4607-8c6a-44d9b29d1cbc');
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
                            value   : 'fa5531b3-10d1-40ab-ae29-85f01bde6356'
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
                            value   : '7177e09a-1df1-4b27-a273-5112a3697fef'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('7177e09a-1df1-4b27-a273-5112a3697fef');
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
                    id: 'e7f5bb85-0f48-4c83-ae5d-ca0ccf3b7c09'
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
                    id: '7177e09a-1df1-4b27-a273-5112a3697fef'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('7177e09a-1df1-4b27-a273-5112a3697fef');
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
                        
                        id: '92df59ce-73c2-4e5e-beca-8b0fb9f46ab1',
                        tenantId: '73e54674-cf9b-41ab-a4f2-059eb19c3ca1',
                        tenantCode: '730ntqb0a55pyjg62q986vmyfqftg1gf3lvf35bjcfsb88kocl',
                        systemId: 'b2f1c21c-7c66-4388-8490-98040880f1ce',
                        systemName: '2nwgseamgc1g5b4qtvpc',
                        executionId: '7343238f-e5f7-48df-a2d2-17586d7a77dc',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 15:14:52',
                        executionMonitoringStartAt: '2020-08-04 13:00:09',
                        executionMonitoringEndAt: '2020-08-04 09:16:18',
                        cancelled: 6326572611,
                        completed: 2486553552,
                        error: 5227724426,
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
                        
                        id: '7177e09a-1df1-4b27-a273-5112a3697fef',
                        tenantId: 'b7d1c6a6-29cf-4b1a-8c97-71c0872b6975',
                        tenantCode: 'tp251wl3unz0y5r6oluycedfcbozt7ap5nut8et7fbss29v9n4',
                        systemId: 'f74efb3b-8457-463a-b01d-653ceb095230',
                        systemName: '1bqpkhrqsuheifqhsm49',
                        executionId: '2d3af225-0f90-4788-b75c-67a0e981e504',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-05 06:29:47',
                        executionMonitoringStartAt: '2020-08-05 04:00:24',
                        executionMonitoringEndAt: '2020-08-05 04:22:12',
                        cancelled: 7054738904,
                        completed: 7945760861,
                        error: 8138894166,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('7177e09a-1df1-4b27-a273-5112a3697fef');
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
                    id: '5edfb187-68b6-40bf-b05e-72a02692902f'
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
                    id: '7177e09a-1df1-4b27-a273-5112a3697fef'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('7177e09a-1df1-4b27-a273-5112a3697fef');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});