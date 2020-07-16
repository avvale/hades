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

describe('job-overview', () => 
{
    let app: INestApplication;
    let repository: MockJobOverviewRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
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
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'uqo1z01ofx13qgrb4666',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 01:26:51',
                executionMonitoringStartAt: '2020-07-16 18:39:18',
                executionMonitoringEndAt: '2020-07-15 23:14:09',
                cancelled: 9441655760,
                completed: 8319165092,
                error: 9453939595,
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
                
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'laefeaca33kt7ojnq8hn',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 22:59:37',
                executionMonitoringStartAt: '2020-07-16 15:02:18',
                executionMonitoringEndAt: '2020-07-16 16:45:13',
                cancelled: 1806761504,
                completed: 6551827668,
                error: 9999438853,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: null,
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'oi3md47wp0x9qg4p8qk3',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 18:04:05',
                executionMonitoringStartAt: '2020-07-16 04:51:40',
                executionMonitoringEndAt: '2020-07-16 14:34:09',
                cancelled: 3389544835,
                completed: 7599342309,
                error: 1977465510,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'm0qibikdre0m7wcpur3u',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 19:49:05',
                executionMonitoringStartAt: '2020-07-16 04:29:32',
                executionMonitoringEndAt: '2020-07-16 05:33:48',
                cancelled: 3484818653,
                completed: 8988604715,
                error: 2807396448,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: null,
                systemName: 'qht1ltq1dmm9a2u0fyta',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 17:56:12',
                executionMonitoringStartAt: '2020-07-15 23:37:59',
                executionMonitoringEndAt: '2020-07-16 11:00:00',
                cancelled: 1941433406,
                completed: 5933916286,
                error: 1295414875,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                
                systemName: 'lv7uzdciykkwhbek1jfw',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 11:03:30',
                executionMonitoringStartAt: '2020-07-15 23:11:40',
                executionMonitoringEndAt: '2020-07-15 20:37:17',
                cancelled: 8664821324,
                completed: 6382522668,
                error: 6304263415,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: null,
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 07:31:40',
                executionMonitoringStartAt: '2020-07-16 17:34:28',
                executionMonitoringEndAt: '2020-07-16 08:55:08',
                cancelled: 4927215811,
                completed: 9407247698,
                error: 9734586268,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 15:57:25',
                executionMonitoringStartAt: '2020-07-16 12:36:27',
                executionMonitoringEndAt: '2020-07-16 03:06:27',
                cancelled: 2126959240,
                completed: 5150451096,
                error: 7943888924,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'phcfvw8uqqr6dfwzc0ws',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 14:04:16',
                executionMonitoringStartAt: '2020-07-16 15:17:57',
                executionMonitoringEndAt: '2020-07-16 07:52:15',
                cancelled: 5982444325,
                completed: 3564298191,
                error: 6651221702,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'xcgt2o1vdzbxrpvdw2rl',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 15:04:15',
                executionMonitoringStartAt: '2020-07-16 05:28:45',
                executionMonitoringEndAt: '2020-07-16 13:34:56',
                cancelled: 5848746421,
                completed: 4794030264,
                error: 3009820902,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'q9cyr7d02awufp6il8la',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: null,
                executionExecutedAt: '2020-07-16 15:14:32',
                executionMonitoringStartAt: '2020-07-16 02:14:00',
                executionMonitoringEndAt: '2020-07-15 21:29:11',
                cancelled: 1561902794,
                completed: 7799645508,
                error: 3225865423,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'd90ww3tkinkd3q88bibd',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                
                executionExecutedAt: '2020-07-16 05:51:31',
                executionMonitoringStartAt: '2020-07-16 04:03:55',
                executionMonitoringEndAt: '2020-07-16 00:59:23',
                cancelled: 7320415585,
                completed: 1138499145,
                error: 2335325511,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: '6et9qll5mbh4ttq8xhtz',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-16 07:49:02',
                executionMonitoringEndAt: '2020-07-15 23:48:16',
                cancelled: 4466129827,
                completed: 4183945294,
                error: 5489355149,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: '6p046b1o19mu2zvl1s35',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-15 19:21:40',
                executionMonitoringEndAt: '2020-07-16 08:21:17',
                cancelled: 5348858582,
                completed: 6636471358,
                error: 7755611297,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'dl5av6n63tg4snk3yiq1',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 21:28:25',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-15 21:52:52',
                cancelled: 9220610827,
                completed: 1645055490,
                error: 9404628005,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'twx9s4swsbqi1ej0acz9',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 23:18:57',
                
                executionMonitoringEndAt: '2020-07-16 06:53:00',
                cancelled: 7753576025,
                completed: 4294070498,
                error: 9198939454,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'yspv9znab6qxqh6yzldn',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 05:54:31',
                executionMonitoringStartAt: '2020-07-15 21:43:36',
                executionMonitoringEndAt: null,
                cancelled: 2563359939,
                completed: 9067801638,
                error: 7052381462,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: '7ia3v31fo5ov6j9miha2',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 20:01:05',
                executionMonitoringStartAt: '2020-07-16 10:24:57',
                
                cancelled: 1535620323,
                completed: 6850272907,
                error: 5623339951,
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
                id: 'iraiqj98svmh885r6as0m88em507iujqsm1ns',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: '54d62j1tomcwc0u582iw',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 10:25:22',
                executionMonitoringStartAt: '2020-07-16 18:40:17',
                executionMonitoringEndAt: '2020-07-15 19:16:01',
                cancelled: 4827652291,
                completed: 8754971693,
                error: 8457620802,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a3yc0m4ecddjkv7hqnqc5eap73munfcv2mjyl',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'zhx7g3aylxcleeyo0lbb',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 00:09:09',
                executionMonitoringStartAt: '2020-07-16 03:01:18',
                executionMonitoringEndAt: '2020-07-16 14:58:54',
                cancelled: 1476090044,
                completed: 8994624532,
                error: 6687767241,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'tzpdxpdsur7g421r89lxzkvejer9inxse4t7f',
                systemName: '0ax0j28usp2ne2c5g2cf',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 20:26:11',
                executionMonitoringStartAt: '2020-07-16 10:44:10',
                executionMonitoringEndAt: '2020-07-16 13:17:16',
                cancelled: 6060702057,
                completed: 8769450013,
                error: 2969944567,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'vgucz2fm7er84n3upuep',
                executionId: 'rymzf7zfpiuhj0fx1v73is4k7dtfaoutz0ln2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 21:26:06',
                executionMonitoringStartAt: '2020-07-16 07:13:18',
                executionMonitoringEndAt: '2020-07-16 06:17:32',
                cancelled: 9559923651,
                completed: 7060677226,
                error: 1643871035,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'nh72fg41w5dnyeocf467c',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 19:22:49',
                executionMonitoringStartAt: '2020-07-16 18:42:18',
                executionMonitoringEndAt: '2020-07-16 17:55:54',
                cancelled: 7499487963,
                completed: 6276169103,
                error: 3164525590,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'sb1n4sis2oe58ugqigz4',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 01:01:49',
                executionMonitoringStartAt: '2020-07-16 00:51:29',
                executionMonitoringEndAt: '2020-07-16 16:24:06',
                cancelled: 54699572275,
                completed: 4788726372,
                error: 9959039358,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: '9grf4tbivijjn82pmkke',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 14:15:23',
                executionMonitoringStartAt: '2020-07-16 06:45:21',
                executionMonitoringEndAt: '2020-07-15 22:31:07',
                cancelled: 6702962964,
                completed: 65611240124,
                error: 9530546697,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: '7roqtl0qhtyky8hcfvfi',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 18:05:47',
                executionMonitoringStartAt: '2020-07-16 03:40:06',
                executionMonitoringEndAt: '2020-07-15 20:18:49',
                cancelled: 5289631013,
                completed: 5989008708,
                error: 29442482915,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewError is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCancelled must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: '98ucwddx41n5hmbatn4t',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 09:16:09',
                executionMonitoringStartAt: '2020-07-16 10:49:15',
                executionMonitoringEndAt: '2020-07-16 10:21:35',
                cancelled: -9,
                completed: 9444519698,
                error: 2017116801,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCompleted must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: '1hrwdyhuzfbq2bwg1649',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 03:42:29',
                executionMonitoringStartAt: '2020-07-15 22:16:32',
                executionMonitoringEndAt: '2020-07-15 21:21:25',
                cancelled: 2674964855,
                completed: -9,
                error: 3563609656,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCompleted must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'naxd1y1chqs8qqzfw2y5',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 13:46:54',
                executionMonitoringStartAt: '2020-07-16 17:38:24',
                executionMonitoringEndAt: '2020-07-16 01:14:24',
                cancelled: 3608767126,
                completed: 6156677463,
                error: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'bwvs1sdoglbd0l369a6b',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-16 04:52:03',
                executionMonitoringStartAt: '2020-07-16 07:23:20',
                executionMonitoringEndAt: '2020-07-16 00:49:39',
                cancelled: 5007389734,
                completed: 9505511243,
                error: 5575490245,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'hohazlciz4wzjnx0zi7q',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-16 06:41:27',
                executionMonitoringEndAt: '2020-07-16 14:42:13',
                cancelled: 5810779921,
                completed: 4969900851,
                error: 6528769203,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'xwjco6sjqd0cm07g3liv',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 02:35:51',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-16 05:23:00',
                cancelled: 4601487077,
                completed: 8110898073,
                error: 2764997190,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'w6v9x56lkdxbic7scfqe',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 21:02:49',
                executionMonitoringStartAt: '2020-07-16 15:03:57',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 9010104331,
                completed: 1446497265,
                error: 1431035159,
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
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: 'qmkcxy1w2yganhwrdgan',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 23:46:48',
                executionMonitoringStartAt: '2020-07-16 00:21:54',
                executionMonitoringEndAt: '2020-07-16 08:30:43',
                cancelled: 3766114862,
                completed: 3923713995,
                error: 2050722123,
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
                        value   : '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0'));
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
            .get('/bplus-it-sappi/job-overview/6b4e8e54-58c2-4c14-96b8-15fd76ba02e0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0'));
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
                
                id: 'd12aee38-69b9-495a-a8ba-1e49dea29668',
                tenantId: '1453c12a-25c6-4fea-b52e-611c0048b45a',
                systemId: '59c549ef-ce88-4a33-9d25-de5c00d68cfc',
                systemName: 'wg6yc7ojphn0s106bfy3',
                executionId: '53ffa4c1-006e-4a13-a21b-f8186637e8b4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 09:25:16',
                executionMonitoringStartAt: '2020-07-16 03:48:41',
                executionMonitoringEndAt: '2020-07-15 22:11:54',
                cancelled: 1228375403,
                completed: 8990515229,
                error: 7449936257,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                systemName: '93u5735cvyj14289wubm',
                executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 16:51:30',
                executionMonitoringStartAt: '2020-07-16 04:48:53',
                executionMonitoringEndAt: '2020-07-16 14:31:10',
                cancelled: 4337195175,
                completed: 4047044867,
                error: 1130677273,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0'));
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
            .delete('/bplus-it-sappi/job-overview/6b4e8e54-58c2-4c14-96b8-15fd76ba02e0')
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
                        id: '665e9c82-504a-42ba-9535-c4532f08b806',
                        tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                        systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                        systemName: 'po6jzvejxbqr1c2nm2b4',
                        executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-16 03:03:11',
                        executionMonitoringStartAt: '2020-07-16 15:48:07',
                        executionMonitoringEndAt: '2020-07-16 12:31:55',
                        cancelled: 9111668639,
                        completed: 5738510859,
                        error: 1152295174,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '665e9c82-504a-42ba-9535-c4532f08b806');
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
                            value   : '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('6b4e8e54-58c2-4c14-96b8-15fd76ba02e0');
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
                    id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('6b4e8e54-58c2-4c14-96b8-15fd76ba02e0');
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
                        
                        id: 'bdeaa24c-5bfc-4d5a-8570-d5742cca2167',
                        tenantId: '43dd549d-0e99-43f3-be54-3ef674dbd2bc',
                        systemId: 'c2da366e-4b5f-4ba8-b750-85dffd37373c',
                        systemName: '30v0hnn3vvm8kb09ls32',
                        executionId: 'a5452e75-ea32-4c25-88db-20a9e9071948',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-16 08:00:07',
                        executionMonitoringStartAt: '2020-07-16 06:56:29',
                        executionMonitoringEndAt: '2020-07-16 15:22:33',
                        cancelled: 5194977830,
                        completed: 1339954444,
                        error: 2148662843,
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
                        
                        id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0',
                        tenantId: 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f',
                        systemId: 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3',
                        systemName: 'frhr431lj9buwglohd1m',
                        executionId: '7ff72752-fd8e-4519-ab23-05fbe04160da',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-16 13:13:59',
                        executionMonitoringStartAt: '2020-07-16 09:58:00',
                        executionMonitoringEndAt: '2020-07-16 15:04:03',
                        cancelled: 8510823173,
                        completed: 8498332802,
                        error: 3189290070,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('6b4e8e54-58c2-4c14-96b8-15fd76ba02e0');
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
                    id: '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('6b4e8e54-58c2-4c14-96b8-15fd76ba02e0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});