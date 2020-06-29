import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IJobRepository } from '@hades/bplus-it-sappi/job/domain/job.repository';
import { MockJobRepository } from '@hades/bplus-it-sappi/job/infrastructure/mock/mock-job.repository';
import { AppModule } from './../../../src/app.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { config } from 'process';

describe('job', () => 
{
    let app: INestApplication;
    let repository: MockJobRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [AppModule]
            })
            .overrideProvider(IJobRepository)
            .useClass(MockJobRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockJobRepository>module.get<IJobRepository>(IJobRepository);

        await app.init();
    });

    it(`/REST:POST bplus-it-sappi/job - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'kjcc84rg6ux2o2msx3dc',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-29 05:19:51',
                executionMonitoringStartAt: '2020-06-28 23:37:52',
                executionMonitoringEndAt: '2020-06-29 12:36:24',
                cancelled: 2502844315,
                completed: 6429324419,
                error: 7072228578,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'kehe6w1y03r2pqy9zad9',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-28 19:16:40',
                executionMonitoringStartAt: '2020-06-29 14:56:17',
                executionMonitoringEndAt: '2020-06-28 20:50:04',
                cancelled: 3760363573,
                completed: 2761649932,
                error: 8305440340,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: null,
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: '4bvjrr3znwagb75dgssj',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-28 20:44:21',
                executionMonitoringStartAt: '2020-06-29 03:59:27',
                executionMonitoringEndAt: '2020-06-29 02:28:47',
                cancelled: 4037267983,
                completed: 4385257562,
                error: 9073436103,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 's2b5k3m3amtx5mdtrmeu',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-29 16:20:41',
                executionMonitoringStartAt: '2020-06-29 09:31:47',
                executionMonitoringEndAt: '2020-06-29 02:26:17',
                cancelled: 9482283528,
                completed: 4377019820,
                error: 6668437650,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: null,
                systemName: 's8ow0pg5qmsymq2qvjbm',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-28 20:22:46',
                executionMonitoringStartAt: '2020-06-29 13:25:34',
                executionMonitoringEndAt: '2020-06-29 08:38:42',
                cancelled: 8500742131,
                completed: 8003710201,
                error: 3227820446,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                
                systemName: '9y6zn1ynvw6is9imsnj0',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-29 00:57:33',
                executionMonitoringStartAt: '2020-06-29 04:49:11',
                executionMonitoringEndAt: '2020-06-29 03:16:00',
                cancelled: 4315116627,
                completed: 1779271506,
                error: 9418288701,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: null,
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-29 10:20:49',
                executionMonitoringStartAt: '2020-06-28 23:53:46',
                executionMonitoringEndAt: '2020-06-29 02:52:30',
                cancelled: 9043833153,
                completed: 9777848726,
                error: 5574341890,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-29 11:33:06',
                executionMonitoringStartAt: '2020-06-28 20:12:36',
                executionMonitoringEndAt: '2020-06-29 01:59:09',
                cancelled: 7891253458,
                completed: 7443457110,
                error: 7592813657,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: '54sl3o3uwe0mn09mlv4m',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-29 05:06:24',
                executionMonitoringStartAt: '2020-06-28 20:17:44',
                executionMonitoringEndAt: '2020-06-29 17:25:10',
                cancelled: 8656966230,
                completed: 8641023850,
                error: 1208138235,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: '4wf9gh2av52unoqdc89d',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-29 00:23:07',
                executionMonitoringStartAt: '2020-06-29 10:14:01',
                executionMonitoringEndAt: '2020-06-28 21:34:00',
                cancelled: 5239958067,
                completed: 7394368731,
                error: 6734601716,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'qaoyttbr96b0dfq0djsm',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: null,
                executionExecutedAt: '2020-06-29 04:44:43',
                executionMonitoringStartAt: '2020-06-28 23:54:20',
                executionMonitoringEndAt: '2020-06-29 02:24:56',
                cancelled: 9009594389,
                completed: 7088193201,
                error: 1576664906,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'frf05qb53963vlgdgwtd',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                
                executionExecutedAt: '2020-06-29 07:54:53',
                executionMonitoringStartAt: '2020-06-29 18:10:08',
                executionMonitoringEndAt: '2020-06-29 11:13:53',
                cancelled: 7905182560,
                completed: 4806664500,
                error: 9679242469,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: '8d4nurvapzbh0qlwfikt',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-06-29 01:03:42',
                executionMonitoringEndAt: '2020-06-29 04:56:53',
                cancelled: 1724938835,
                completed: 2323702114,
                error: 4847908152,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'yrlmwkptzr1qqyq2swwr',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-06-29 08:25:40',
                executionMonitoringEndAt: '2020-06-29 14:20:09',
                cancelled: 5606052659,
                completed: 4115140924,
                error: 2743349369,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: '5qmkhlxcpx6wh8qz75lw',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-28 20:45:55',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-06-29 05:46:55',
                cancelled: 9103667221,
                completed: 3271611752,
                error: 5301078649,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'u10wd2v65ollc5txkxcg',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-28 20:15:06',
                
                executionMonitoringEndAt: '2020-06-29 10:20:05',
                cancelled: 5481585323,
                completed: 8099617040,
                error: 2449945718,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'uxpfho0olovlh6iu4z4i',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-29 13:35:19',
                executionMonitoringStartAt: '2020-06-29 10:32:59',
                executionMonitoringEndAt: null,
                cancelled: 6114371271,
                completed: 4620285309,
                error: 2284455913,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: '9vw932f9xazfgs2sz0mg',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-29 10:22:56',
                executionMonitoringStartAt: '2020-06-28 19:41:50',
                
                cancelled: 9302978863,
                completed: 7353769064,
                error: 2870229751,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'umwxntedu9bs3u797uvvqf74py5dfbxph936n',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'yt8vm9o84varqjed3oql',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-29 13:08:38',
                executionMonitoringStartAt: '2020-06-29 05:53:34',
                executionMonitoringEndAt: '2020-06-29 06:24:25',
                cancelled: 2087236392,
                completed: 8254501991,
                error: 6057088486,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '9mjm74jl78dog8qwyfpcsvlvuxyijsjiv3mnl',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'dnge0571heumqqsr7nwo',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-29 18:31:09',
                executionMonitoringStartAt: '2020-06-29 06:15:31',
                executionMonitoringEndAt: '2020-06-29 15:34:22',
                cancelled: 7781164844,
                completed: 2297292594,
                error: 5842204149,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'wazkwq9obezyhqd7d9go8woy8haohby3ecjdn',
                systemName: 'iirfrgbdf3wkjjv9mtv2',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-28 21:55:02',
                executionMonitoringStartAt: '2020-06-28 20:49:11',
                executionMonitoringEndAt: '2020-06-29 07:56:41',
                cancelled: 3248472250,
                completed: 5691335119,
                error: 4331765827,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: '8g36trphl19cki9ecitv',
                executionId: '1wcxzukw8ktszujn1zkoaybaf89pvkyj6xyms',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-29 09:36:07',
                executionMonitoringStartAt: '2020-06-29 16:17:42',
                executionMonitoringEndAt: '2020-06-29 16:18:20',
                cancelled: 4738550515,
                completed: 4447953190,
                error: 9254373615,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'h2ng1ng72hb876je4ffrf',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-29 12:33:25',
                executionMonitoringStartAt: '2020-06-29 17:55:30',
                executionMonitoringEndAt: '2020-06-28 20:50:54',
                cancelled: 4401105162,
                completed: 7811018006,
                error: 2440143167,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'ofrfzgm3ii3pdbpcaope',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-29 06:23:45',
                executionMonitoringStartAt: '2020-06-29 02:23:19',
                executionMonitoringEndAt: '2020-06-28 20:25:32',
                cancelled: 92071874354,
                completed: 8315474799,
                error: 6645463284,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobCancelled is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobCompleted is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'g6duhax5e76735pw3dn4',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-29 16:29:01',
                executionMonitoringStartAt: '2020-06-29 01:05:12',
                executionMonitoringEndAt: '2020-06-29 14:03:19',
                cancelled: 5875744329,
                completed: 13060765628,
                error: 1987414882,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobCompleted is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'ujdqgf419rku1092ftcz',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-29 04:49:11',
                executionMonitoringStartAt: '2020-06-28 22:04:50',
                executionMonitoringEndAt: '2020-06-28 23:49:36',
                cancelled: 3410964218,
                completed: 6803091142,
                error: 31300694345,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobError is too large, has a maximum length of 10');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobCancelled has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'ulgh7h7d0nds9r40u7ba',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-29 06:48:06',
                executionMonitoringStartAt: '2020-06-29 17:15:43',
                executionMonitoringEndAt: '2020-06-29 16:05:56',
                cancelled: 100.10,
                completed: 5275054769,
                error: 7835663228,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobCancelled has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobCompleted has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'c2yb7v3l5jzsyb293p1r',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-28 21:32:47',
                executionMonitoringStartAt: '2020-06-29 16:10:10',
                executionMonitoringEndAt: '2020-06-29 08:35:03',
                cancelled: 4080503087,
                completed: 100.10,
                error: 7599796327,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobCompleted has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobError has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'au9x2ztisophl2dho3e9',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-29 09:06:39',
                executionMonitoringStartAt: '2020-06-28 19:11:10',
                executionMonitoringEndAt: '2020-06-28 23:56:15',
                cancelled: 7777253059,
                completed: 9346544414,
                error: 100.10,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobError has to be a integer value');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'bi70bapln0hymxdrbe3y',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'XXXX',
                executionExecutedAt: '2020-06-28 22:44:09',
                executionMonitoringStartAt: '2020-06-29 16:49:41',
                executionMonitoringEndAt: '2020-06-29 07:00:59',
                cancelled: 8125940169,
                completed: 5558253275,
                error: 6426015673,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'lucj0xp5z861l58at9uc',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-06-29 14:59:32',
                executionMonitoringEndAt: '2020-06-28 20:02:45',
                cancelled: 1907633531,
                completed: 4708809383,
                error: 8472760358,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'mg4u474rp1ns8xcyvfj5',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-28 19:47:04',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-06-29 02:08:44',
                cancelled: 9233238386,
                completed: 8898567624,
                error: 4599116352,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job - Got 400 Conflict, JobExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: '5sgs95hpq6un73psii5b',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-29 08:48:54',
                executionMonitoringStartAt: '2020-06-28 19:34:12',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 3485275664,
                completed: 8631518432,
                error: 2409122714,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/job`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: '53f03gu7qchzeatkcjqy',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-29 06:28:28',
                executionMonitoringStartAt: '2020-06-29 13:51:08',
                executionMonitoringEndAt: '2020-06-29 06:48:18',
                cancelled: 1288198832,
                completed: 2636862629,
                error: 1966226200,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/jobs/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs/paginate')
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

    it(`/REST:GET bplus-it-sappi/job - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job')
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

    it(`/REST:GET bplus-it-sappi/job`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'dbb951b9-9072-436f-b063-45bfdd755b4c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'dbb951b9-9072-436f-b063-45bfdd755b4c'));
    });

    it(`/REST:GET bplus-it-sappi/job/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/job/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job/dbb951b9-9072-436f-b063-45bfdd755b4c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dbb951b9-9072-436f-b063-45bfdd755b4c'));
    });

    it(`/REST:GET bplus-it-sappi/jobs`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/job - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ae9d82bf-d0a5-4561-9079-9abae0ea7bba',
                tenantId: 'a4f11539-130b-4bc6-af44-1d128fad4d64',
                systemId: '403f82a8-870f-4366-ba9b-9e55180a2ae9',
                systemName: 'igtvr8c2jaq1bekjf64s',
                executionId: 'dc5b8d7f-5474-4da7-ac6c-d234cfa4c20f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-29 09:08:44',
                executionMonitoringStartAt: '2020-06-29 06:27:56',
                executionMonitoringEndAt: '2020-06-29 05:34:21',
                cancelled: 9567604522,
                completed: 8189603256,
                error: 2855559911,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/job`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job')
            .set('Accept', 'application/json')
            .send({
                
                id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                systemName: 'hkcwavx8wy5ehswo0ihh',
                executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-29 16:18:33',
                executionMonitoringStartAt: '2020-06-29 10:56:11',
                executionMonitoringEndAt: '2020-06-29 01:34:44',
                cancelled: 3019326329,
                completed: 2966337431,
                error: 5492120210,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dbb951b9-9072-436f-b063-45bfdd755b4c'));
    });

    it(`/REST:DELETE bplus-it-sappi/job/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/job/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job/dbb951b9-9072-436f-b063-45bfdd755b4c')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateJob - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobInput!)
                    {
                        bplusItSappiCreateJob (payload:$payload)
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

    it(`/GraphQL bplusItSappiCreateJob`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobInput!)
                    {
                        bplusItSappiCreateJob (payload:$payload)
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
                        id: '75fedb59-19b7-4bdf-979f-c0aa874acda2',
                        tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                        systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                        systemName: 'iivktsr7vnjav8ma129m',
                        executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-06-28 19:07:29',
                        executionMonitoringStartAt: '2020-06-29 12:56:22',
                        executionMonitoringEndAt: '2020-06-29 04:53:49',
                        cancelled: 5370652282,
                        completed: 1256680131,
                        error: 2570717036,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJob).toHaveProperty('id', '75fedb59-19b7-4bdf-979f-c0aa874acda2');
            });
    });

    it(`/GraphQL bplusItSappiPaginateJobs`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateJobs (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateJobs.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobs.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobs.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL bplusItSappiFindJob - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJob (query:$query)
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

    it(`/GraphQL bplusItSappiFindJob`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJob (query:$query)
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
                            value   : 'dbb951b9-9072-436f-b063-45bfdd755b4c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJob.id).toStrictEqual('dbb951b9-9072-436f-b063-45bfdd755b4c');
            });
    });

    it(`/GraphQL bplusItSappiFindJobById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobById (id:$id)
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

    it(`/GraphQL bplusItSappiFindJobById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobById (id:$id)
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
                    id: 'dbb951b9-9072-436f-b063-45bfdd755b4c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobById.id).toStrictEqual('dbb951b9-9072-436f-b063-45bfdd755b4c');
            });
    });

    it(`/GraphQL bplusItSappiGetJobs`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetJobs (query:$query)
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
                for (const [index, value] of res.body.data.bplusItSappiGetJobs.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL bplusItSappiUpdateJob - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobInput!)
                    {
                        bplusItSappiUpdateJob (payload:$payload)
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
                        
                        id: 'd6023435-fa63-428f-9d17-6863414924c3',
                        tenantId: '8ee73f5e-7480-45dd-8e0f-2fe73e1b6845',
                        systemId: '00367a8f-85a1-4897-a9a3-ffe50dc98373',
                        systemName: 'rkdjlyq5jy44bolsyq40',
                        executionId: 'ddc5fa98-bea9-4229-a79d-d45270f78dba',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-06-29 17:15:52',
                        executionMonitoringStartAt: '2020-06-29 06:41:26',
                        executionMonitoringEndAt: '2020-06-28 19:00:39',
                        cancelled: 4197000259,
                        completed: 9901233705,
                        error: 5816561920,
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

    it(`/GraphQL bplusItSappiUpdateJob`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobInput!)
                    {
                        bplusItSappiUpdateJob (payload:$payload)
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
                        
                        id: 'dbb951b9-9072-436f-b063-45bfdd755b4c',
                        tenantId: '5eaf59f9-6df4-4943-8f92-4633e61ffba5',
                        systemId: 'ea88254f-8f00-4b57-a456-3512f126938c',
                        systemName: 'r191xvqv1l8eb6x3uwj0',
                        executionId: '4f0252ed-9a78-4a45-a646-56a298102f0f',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-06-29 06:53:14',
                        executionMonitoringStartAt: '2020-06-29 07:08:32',
                        executionMonitoringEndAt: '2020-06-29 00:51:59',
                        cancelled: 6863029821,
                        completed: 8135897588,
                        error: 8613622705,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJob.id).toStrictEqual('dbb951b9-9072-436f-b063-45bfdd755b4c');
            });
    });

    it(`/GraphQL bplusItSappiDeleteJobById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobById (id:$id)
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

    it(`/GraphQL bplusItSappiDeleteJobById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobById (id:$id)
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
                    id: 'dbb951b9-9072-436f-b063-45bfdd755b4c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobById.id).toStrictEqual('dbb951b9-9072-436f-b063-45bfdd755b4c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});