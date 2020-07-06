import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IJobOverviewRepository } from '@hades/bplus-it-sappi/job-overview/domain/job-overview.repository';
import { MockJobOverviewRepository } from '@hades/bplus-it-sappi/job-overview/infrastructure/mock/mock-job-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('job-overview', () => 
{
    let app: INestApplication;
    let repository: MockJobOverviewRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    AdminModule,
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

    it(`/REST:POST bplus-it-sappi/job-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'f896bjkd8l2ip6blxjq2',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 12:51:28',
                executionMonitoringStartAt: '2020-07-01 09:31:26',
                executionMonitoringEndAt: '2020-07-01 03:40:46',
                cancelled: 5901048813,
                completed: 6007772325,
                error: 4476054500,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'sl6jbitydrlayrh2fbl7',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 15:57:50',
                executionMonitoringStartAt: '2020-07-01 12:23:40',
                executionMonitoringEndAt: '2020-07-01 14:10:44',
                cancelled: 9985155317,
                completed: 4071617794,
                error: 7464939497,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: null,
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'evii0y37ibnk3d77kv5y',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 16:54:06',
                executionMonitoringStartAt: '2020-07-01 08:22:25',
                executionMonitoringEndAt: '2020-07-01 14:38:41',
                cancelled: 2306294923,
                completed: 6630485061,
                error: 6484260344,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'rk1wmunvxnbzedkxoglf',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 05:30:47',
                executionMonitoringStartAt: '2020-07-01 03:10:45',
                executionMonitoringEndAt: '2020-07-01 14:42:51',
                cancelled: 8073797577,
                completed: 3716295473,
                error: 8500449167,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: null,
                systemName: 'j41yzq2jnz68hli1locw',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 13:45:03',
                executionMonitoringStartAt: '2020-07-01 06:19:29',
                executionMonitoringEndAt: '2020-07-01 03:30:55',
                cancelled: 5876545153,
                completed: 5105570601,
                error: 6509025816,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                
                systemName: '9z75ecrgm31nggx77mru',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 07:13:26',
                executionMonitoringStartAt: '2020-07-01 13:37:58',
                executionMonitoringEndAt: '2020-07-01 16:24:40',
                cancelled: 6425043623,
                completed: 9402493309,
                error: 5177603990,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: null,
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 13:56:34',
                executionMonitoringStartAt: '2020-07-01 01:13:18',
                executionMonitoringEndAt: '2020-07-01 08:27:56',
                cancelled: 9314551866,
                completed: 6792978614,
                error: 6879630484,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 14:09:16',
                executionMonitoringStartAt: '2020-07-01 00:34:00',
                executionMonitoringEndAt: '2020-07-01 05:26:02',
                cancelled: 1830152899,
                completed: 5430260917,
                error: 2956243611,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'y2vro1uv3a92l2wbof9i',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 03:57:11',
                executionMonitoringStartAt: '2020-07-01 01:28:45',
                executionMonitoringEndAt: '2020-06-30 17:13:33',
                cancelled: 6125512675,
                completed: 6083713090,
                error: 3921502629,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'paf1e13b1nwt4pbphdro',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 07:09:12',
                executionMonitoringStartAt: '2020-06-30 20:45:07',
                executionMonitoringEndAt: '2020-07-01 15:25:05',
                cancelled: 6786149176,
                completed: 4095647872,
                error: 1319941789,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'zzl31rdd6j4nm3420bhb',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: null,
                executionExecutedAt: '2020-07-01 09:23:27',
                executionMonitoringStartAt: '2020-07-01 00:59:40',
                executionMonitoringEndAt: '2020-07-01 15:08:30',
                cancelled: 9729464648,
                completed: 1959470324,
                error: 4256414156,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'my9s74r370ml9enu1nwl',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                
                executionExecutedAt: '2020-07-01 11:28:28',
                executionMonitoringStartAt: '2020-06-30 21:29:25',
                executionMonitoringEndAt: '2020-06-30 20:09:10',
                cancelled: 3432577978,
                completed: 3322571102,
                error: 4370768148,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: '5fkd08du4czggbr3wjdd',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-01 05:54:32',
                executionMonitoringEndAt: '2020-07-01 09:43:19',
                cancelled: 7814304868,
                completed: 1368632008,
                error: 6266891603,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'bxxsxnmkpd4un2frwrbn',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-01 13:59:17',
                executionMonitoringEndAt: '2020-06-30 21:49:21',
                cancelled: 3471446566,
                completed: 7544759239,
                error: 7276095265,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'i6eolv1vj0z1e1khb1j0',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 09:06:24',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-06-30 19:49:57',
                cancelled: 6548433745,
                completed: 4408055397,
                error: 5404775931,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: '2lkjxxz6ce2hfh37ccot',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 12:35:33',
                
                executionMonitoringEndAt: '2020-07-01 11:44:51',
                cancelled: 3958260954,
                completed: 7105331512,
                error: 4030583962,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'tnwi5q8disdpieqxfu77',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 09:08:26',
                executionMonitoringStartAt: '2020-06-30 20:10:31',
                executionMonitoringEndAt: null,
                cancelled: 2692571218,
                completed: 1503868457,
                error: 3322470439,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: '6xxouwkruu6ng65gxl9c',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 01:28:40',
                executionMonitoringStartAt: '2020-06-30 21:37:25',
                
                cancelled: 7227993003,
                completed: 9399547648,
                error: 1711985774,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '2zqhtj68dqpaag3a3umobro14d4nzw6825dnr',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'bf4r5shh2e5ck290plm8',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 10:02:17',
                executionMonitoringStartAt: '2020-06-30 22:17:35',
                executionMonitoringEndAt: '2020-07-01 07:59:24',
                cancelled: 7940341246,
                completed: 6459340104,
                error: 9378082593,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '1pqaf6hxkrgegecrxpv52kwh4iv8xvyqfnp0q',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'acf2eni44etknpd84nts',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 06:11:46',
                executionMonitoringStartAt: '2020-07-01 09:03:10',
                executionMonitoringEndAt: '2020-06-30 16:40:51',
                cancelled: 9598474907,
                completed: 5144928654,
                error: 1335634914,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: 'wd2a8rojxeo6cn5hcv4hptzp1v8byde03azth',
                systemName: 'w3pfnafvxbjtwexmblvi',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 10:29:05',
                executionMonitoringStartAt: '2020-07-01 14:02:31',
                executionMonitoringEndAt: '2020-06-30 23:42:50',
                cancelled: 7191764293,
                completed: 1914588509,
                error: 5276339122,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'qfs1lmpxguhsrmthjaoz',
                executionId: 'vzoqsvf5sj4vz5lrfbe2i9jiugv6j5yhyjv5u',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 08:54:00',
                executionMonitoringStartAt: '2020-06-30 21:51:26',
                executionMonitoringEndAt: '2020-07-01 16:35:49',
                cancelled: 3772749871,
                completed: 2185113184,
                error: 9802929561,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'r98zm7bsj4dbxmxk8hnwm',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 16:39:45',
                executionMonitoringStartAt: '2020-07-01 06:43:08',
                executionMonitoringEndAt: '2020-07-01 14:10:45',
                cancelled: 7111967219,
                completed: 3799560123,
                error: 8716865688,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: '1ad04s6hpngqbdkdmst5',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 19:49:21',
                executionMonitoringStartAt: '2020-07-01 09:47:59',
                executionMonitoringEndAt: '2020-06-30 23:33:05',
                cancelled: 62263695967,
                completed: 9656023208,
                error: 9555358742,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCompleted is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'kr5qxzobce0b6hwswtde',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 23:34:56',
                executionMonitoringStartAt: '2020-07-01 04:09:18',
                executionMonitoringEndAt: '2020-07-01 10:42:06',
                cancelled: 4060670326,
                completed: 63912161740,
                error: 7101570155,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCompleted is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'n5udph3yo0x64tvis7ww',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 00:36:42',
                executionMonitoringStartAt: '2020-06-30 22:58:35',
                executionMonitoringEndAt: '2020-07-01 02:38:10',
                cancelled: 4644918461,
                completed: 7902413889,
                error: 88180754847,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewError is too large, has a maximum length of 10');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCancelled has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'tpv82utoely0liu6zb0r',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 13:15:53',
                executionMonitoringStartAt: '2020-07-01 08:15:34',
                executionMonitoringEndAt: '2020-07-01 15:06:41',
                cancelled: 100.10,
                completed: 7104972918,
                error: 9547289115,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCancelled has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCompleted has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: '3zrfqhxnmui9nklwi4ni',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 12:51:13',
                executionMonitoringStartAt: '2020-07-01 08:25:35',
                executionMonitoringEndAt: '2020-07-01 02:34:59',
                cancelled: 7110150030,
                completed: 100.10,
                error: 7989275446,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCompleted has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewError has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'q4ekxbdgudlciab5csep',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 12:11:05',
                executionMonitoringStartAt: '2020-06-30 23:31:25',
                executionMonitoringEndAt: '2020-06-30 23:05:25',
                cancelled: 2072134055,
                completed: 7340278209,
                error: 100.10,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewError has to be a integer value');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: '4iw8xlabbi7cviru1k3f',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-01 03:50:01',
                executionMonitoringStartAt: '2020-07-01 06:55:18',
                executionMonitoringEndAt: '2020-07-01 00:53:26',
                cancelled: 7825321586,
                completed: 5648992923,
                error: 4209717294,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'd8neltm4t4urlbnooktg',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-01 12:35:59',
                executionMonitoringEndAt: '2020-07-01 14:14:38',
                cancelled: 7398988946,
                completed: 1634615141,
                error: 6652083566,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'nkux85jcesev0bfv93ba',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 02:20:54',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-01 08:00:46',
                cancelled: 4128000208,
                completed: 3894507243,
                error: 6054820714,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'bjrzwp1znkr8ygnbiriy',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 20:21:33',
                executionMonitoringStartAt: '2020-07-01 11:18:44',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 8907136416,
                completed: 3891076819,
                error: 5045736832,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: 'on833c4isc1q2cq3mqup',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 06:54:25',
                executionMonitoringStartAt: '2020-06-30 22:44:38',
                executionMonitoringEndAt: '2020-07-01 13:09:49',
                cancelled: 2473493297,
                completed: 1449364386,
                error: 8736409151,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/jobs-overview/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/job-overview - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/job-overview`, () => 
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
                        value   : '12cfb3d8-1744-48a4-8c20-41531951c859'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '12cfb3d8-1744-48a4-8c20-41531951c859'));
    });

    it(`/REST:GET bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/12cfb3d8-1744-48a4-8c20-41531951c859')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '12cfb3d8-1744-48a4-8c20-41531951c859'));
    });

    it(`/REST:GET bplus-it-sappi/jobs-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/job-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '99f12747-504e-4649-82c7-78eab9cad5c3',
                tenantId: '5c75b8c9-1ef3-448c-9b89-1abe9aadbe63',
                systemId: '479b8981-6d41-4cd4-8113-be9a858730bf',
                systemName: 'qnbnczqpqd6reb2jmpul',
                executionId: '3dd191c2-d784-4136-b467-00b1ab26c848',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 13:59:11',
                executionMonitoringStartAt: '2020-07-01 11:20:45',
                executionMonitoringEndAt: '2020-06-30 22:23:03',
                cancelled: 7521724502,
                completed: 6447698802,
                error: 8750298268,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                systemName: '5xoloh7p0qng8q337thn',
                executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 12:14:52',
                executionMonitoringStartAt: '2020-07-01 07:04:35',
                executionMonitoringEndAt: '2020-07-01 10:26:54',
                cancelled: 1813860188,
                completed: 9352237201,
                error: 9935761221,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '12cfb3d8-1744-48a4-8c20-41531951c859'));
    });

    it(`/REST:DELETE bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/12cfb3d8-1744-48a4-8c20-41531951c859')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateJobOverview - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateJobOverview`, () => 
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
                        id: 'aac9995b-f221-478f-8d9d-96cd50834dcf',
                        tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                        systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                        systemName: 'w85h2m89msh79lxvibuk',
                        executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-01 00:36:48',
                        executionMonitoringStartAt: '2020-06-30 23:48:46',
                        executionMonitoringEndAt: '2020-07-01 15:53:53',
                        cancelled: 4246195197,
                        completed: 8298733751,
                        error: 7234882044,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', 'aac9995b-f221-478f-8d9d-96cd50834dcf');
            });
    });

    it(`/GraphQL bplusItSappiPaginateJobsOverview`, () => 
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

    it(`/GraphQL bplusItSappiFindJobOverview - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindJobOverview`, () => 
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
                            value   : '12cfb3d8-1744-48a4-8c20-41531951c859'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('12cfb3d8-1744-48a4-8c20-41531951c859');
            });
    });

    it(`/GraphQL bplusItSappiFindJobOverviewById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindJobOverviewById`, () => 
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
                    id: '12cfb3d8-1744-48a4-8c20-41531951c859'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('12cfb3d8-1744-48a4-8c20-41531951c859');
            });
    });

    it(`/GraphQL bplusItSappiGetJobsOverview`, () => 
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

    it(`/GraphQL bplusItSappiUpdateJobOverview - Got 404 Not Found`, () => 
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
                        
                        id: 'b70f9acb-781d-4a28-b77c-adf8dda7b089',
                        tenantId: '964c5d78-599d-46cd-8c61-e0159d8b7982',
                        systemId: '97b3655f-7f18-4745-afe5-27135ad6d541',
                        systemName: 'ehifouybuo8d2atymqim',
                        executionId: 'a80a7ee5-fe74-4c37-bb07-6f1cec8a8c12',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-01 11:02:28',
                        executionMonitoringStartAt: '2020-07-01 10:07:55',
                        executionMonitoringEndAt: '2020-06-30 16:55:03',
                        cancelled: 7695422749,
                        completed: 3680008339,
                        error: 2086114326,
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

    it(`/GraphQL bplusItSappiUpdateJobOverview`, () => 
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
                        
                        id: '12cfb3d8-1744-48a4-8c20-41531951c859',
                        tenantId: '597160ba-c687-459d-a15f-3d6dd301ef7d',
                        systemId: '80071d86-7b68-4abd-8b02-64d34fbb85ba',
                        systemName: '87b3hxdt101ub7rfsqz9',
                        executionId: 'baffc5c2-b238-45f5-bc93-c6bf86643bb0',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-01 12:16:47',
                        executionMonitoringStartAt: '2020-07-01 12:09:21',
                        executionMonitoringEndAt: '2020-07-01 01:22:55',
                        cancelled: 7356349375,
                        completed: 9985037642,
                        error: 6803997331,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('12cfb3d8-1744-48a4-8c20-41531951c859');
            });
    });

    it(`/GraphQL bplusItSappiDeleteJobOverviewById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteJobOverviewById`, () => 
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
                    id: '12cfb3d8-1744-48a4-8c20-41531951c859'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('12cfb3d8-1744-48a4-8c20-41531951c859');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});