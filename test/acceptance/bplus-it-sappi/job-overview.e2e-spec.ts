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
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'l5dlqzxhjj9mvkudk0bh',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 12:37:37',
                executionMonitoringStartAt: '2020-07-21 06:35:34',
                executionMonitoringEndAt: '2020-07-21 03:05:01',
                cancelled: 8224720840,
                completed: 5012582680,
                error: 3736352029,
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
                
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: '3ma5lq2462n3cvp2yzfx',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 18:00:07',
                executionMonitoringStartAt: '2020-07-21 19:10:49',
                executionMonitoringEndAt: '2020-07-21 22:56:00',
                cancelled: 9988177700,
                completed: 9518369969,
                error: 4358137316,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: null,
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'bli1memiu61zka3rf8kn',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 22:50:05',
                executionMonitoringStartAt: '2020-07-21 03:56:50',
                executionMonitoringEndAt: '2020-07-21 08:16:00',
                cancelled: 2443982960,
                completed: 3316365414,
                error: 4662856820,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'tm93wh9xr0sw4ac7fsvq',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 12:22:25',
                executionMonitoringStartAt: '2020-07-21 16:32:56',
                executionMonitoringEndAt: '2020-07-21 08:59:50',
                cancelled: 1974646740,
                completed: 4670550193,
                error: 8774769801,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: null,
                systemName: '0kduxitpdt4p714401lh',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 12:46:20',
                executionMonitoringStartAt: '2020-07-21 06:15:55',
                executionMonitoringEndAt: '2020-07-21 01:14:32',
                cancelled: 3531352500,
                completed: 4993021021,
                error: 8055071172,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                
                systemName: 'srii5n199geydtrs3yq8',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 00:19:10',
                executionMonitoringStartAt: '2020-07-21 06:37:05',
                executionMonitoringEndAt: '2020-07-21 19:43:24',
                cancelled: 2571843287,
                completed: 2193692854,
                error: 6819599262,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: null,
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:49:35',
                executionMonitoringStartAt: '2020-07-21 04:45:30',
                executionMonitoringEndAt: '2020-07-21 22:45:21',
                cancelled: 6435647085,
                completed: 3903819175,
                error: 1638933142,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 06:28:50',
                executionMonitoringStartAt: '2020-07-21 13:43:40',
                executionMonitoringEndAt: '2020-07-21 19:58:47',
                cancelled: 4536712572,
                completed: 3746476919,
                error: 9786417655,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'na3akqzip8up8jpy7ep7',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 17:13:24',
                executionMonitoringStartAt: '2020-07-21 03:40:57',
                executionMonitoringEndAt: '2020-07-21 08:51:23',
                cancelled: 3552725955,
                completed: 9106821256,
                error: 7596674294,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'stm5bk2oklm13auf0xor',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 09:17:26',
                executionMonitoringStartAt: '2020-07-21 20:10:10',
                executionMonitoringEndAt: '2020-07-21 20:21:45',
                cancelled: 9256102787,
                completed: 8571957112,
                error: 1218249451,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: '7xi5lfz2ca7t6r3fmztw',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: null,
                executionExecutedAt: '2020-07-21 05:27:55',
                executionMonitoringStartAt: '2020-07-21 03:32:36',
                executionMonitoringEndAt: '2020-07-21 14:54:03',
                cancelled: 1749099957,
                completed: 8548029894,
                error: 8005033036,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'smr79714t3xotjw75u04',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                
                executionExecutedAt: '2020-07-21 15:00:38',
                executionMonitoringStartAt: '2020-07-21 09:23:57',
                executionMonitoringEndAt: '2020-07-21 23:09:11',
                cancelled: 5131956283,
                completed: 5133434058,
                error: 7505106509,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: '6frsme5ay392b65ec5ti',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-21 13:00:38',
                executionMonitoringEndAt: '2020-07-21 11:11:23',
                cancelled: 7675787229,
                completed: 1170960828,
                error: 8283838409,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'axd2lbykiwi1ucnmw3q3',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-21 12:22:00',
                executionMonitoringEndAt: '2020-07-21 06:58:10',
                cancelled: 7936863107,
                completed: 4419155480,
                error: 6301907752,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'd8uplobcf3lxgfv5w59l',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:12:14',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-21 02:25:18',
                cancelled: 7770918489,
                completed: 7906551935,
                error: 8479985513,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: '8wz15ke33eiftmmenzlf',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 19:00:45',
                
                executionMonitoringEndAt: '2020-07-21 08:21:22',
                cancelled: 7945071540,
                completed: 5619866800,
                error: 1523644749,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'ltipm5gaxsz8dcn2w3qb',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 18:43:29',
                executionMonitoringStartAt: '2020-07-21 18:11:00',
                executionMonitoringEndAt: null,
                cancelled: 9989282098,
                completed: 4461404020,
                error: 5869554855,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'csszurlrc60lcp4n56g8',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 18:54:49',
                executionMonitoringStartAt: '2020-07-21 06:34:40',
                
                cancelled: 7885465987,
                completed: 1611353057,
                error: 6701953048,
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
                id: 'lv1cjmfqq38s8yh0tcaih0bcmgm32cwx0j8ut',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: '02vdcitmjpnkvs6jya8j',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 01:48:57',
                executionMonitoringStartAt: '2020-07-21 20:13:17',
                executionMonitoringEndAt: '2020-07-21 05:27:57',
                cancelled: 3248841922,
                completed: 3236448349,
                error: 2618768051,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: '9t5pa2axmz2r5ww6hja8mk06yi7hg5t18yqv1',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'l2lua37pkhcqaskbmlv4',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 06:15:27',
                executionMonitoringStartAt: '2020-07-21 08:48:44',
                executionMonitoringEndAt: '2020-07-21 10:48:05',
                cancelled: 8327687456,
                completed: 6639936451,
                error: 1431327625,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'cp1gr8pa8whs5z6uaplp2nyawnvocidgtqxp8',
                systemName: 'qto2l7ijrb36dnivovwg',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 06:05:27',
                executionMonitoringStartAt: '2020-07-21 18:58:54',
                executionMonitoringEndAt: '2020-07-21 15:54:09',
                cancelled: 9995353404,
                completed: 5823315646,
                error: 8602775828,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'b1wsbqtb5le7r8u5fbpj',
                executionId: '2tknqu12s7c3fkr4fo511vua5z9aj1fhe69wt',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 11:49:07',
                executionMonitoringStartAt: '2020-07-21 07:38:49',
                executionMonitoringEndAt: '2020-07-21 12:04:38',
                cancelled: 4747902847,
                completed: 8680941820,
                error: 8864942182,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: '2u6kyjojenadlif72sfzz',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 17:01:20',
                executionMonitoringStartAt: '2020-07-21 10:01:12',
                executionMonitoringEndAt: '2020-07-21 21:28:25',
                cancelled: 9204156786,
                completed: 8246303304,
                error: 3056318882,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: '0rloapzbjdvi9pt72p07',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 06:20:10',
                executionMonitoringStartAt: '2020-07-21 04:41:28',
                executionMonitoringEndAt: '2020-07-21 18:29:39',
                cancelled: 25360277753,
                completed: 1461305954,
                error: 1140690591,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'dzbzvcpzzoan01q1dedp',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:23:36',
                executionMonitoringStartAt: '2020-07-21 06:05:59',
                executionMonitoringEndAt: '2020-07-21 07:51:05',
                cancelled: 5186797195,
                completed: 27279385615,
                error: 9998812023,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'rbk9pjf4xmzmjnqvi914',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 12:33:28',
                executionMonitoringStartAt: '2020-07-21 23:24:02',
                executionMonitoringEndAt: '2020-07-21 12:27:38',
                cancelled: 8255514137,
                completed: 3163361512,
                error: 64022258204,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'bcxx7l7n4jzv03qxv5nb',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 17:21:11',
                executionMonitoringStartAt: '2020-07-21 23:47:35',
                executionMonitoringEndAt: '2020-07-21 16:23:43',
                cancelled: -9,
                completed: 4356623929,
                error: 1420280401,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'el7kjc1rlrzw1xcpn7ed',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 21:53:39',
                executionMonitoringStartAt: '2020-07-21 12:11:35',
                executionMonitoringEndAt: '2020-07-21 10:27:01',
                cancelled: 8585386852,
                completed: -9,
                error: 4193455736,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'sqpcbvxydn1ekd5pe3ez',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 00:59:26',
                executionMonitoringStartAt: '2020-07-21 07:42:57',
                executionMonitoringEndAt: '2020-07-21 22:58:37',
                cancelled: 2341350681,
                completed: 8539749741,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'affayjzl8bxhs5npccqj',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-21 23:33:23',
                executionMonitoringStartAt: '2020-07-21 10:47:09',
                executionMonitoringEndAt: '2020-07-21 23:39:52',
                cancelled: 6189013916,
                completed: 2501663078,
                error: 6545002733,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'hhnmszmugw0xjpskq1z0',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-21 19:00:16',
                executionMonitoringEndAt: '2020-07-21 19:51:35',
                cancelled: 4193733380,
                completed: 5030319749,
                error: 7818349028,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'xe0q3uw7ay9paqf0d7ig',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 13:03:36',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-21 12:31:50',
                cancelled: 5213473625,
                completed: 3762513544,
                error: 5205133291,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: 'piq5bkbfmkljl6g6twkz',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 17:36:09',
                executionMonitoringStartAt: '2020-07-21 05:10:54',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 1011375730,
                completed: 8775094287,
                error: 5045876995,
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
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: '601z92f85fmufm5amihd',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 17:53:06',
                executionMonitoringStartAt: '2020-07-21 12:29:18',
                executionMonitoringEndAt: '2020-07-22 00:25:33',
                cancelled: 3116514732,
                completed: 6645483067,
                error: 1199584887,
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
                        value   : '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72'));
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
            .get('/bplus-it-sappi/job-overview/72b6e611-4d0f-4f33-bcf4-b24f4c0dde72')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72'));
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
                
                id: '1733eb22-a12b-4084-9e97-49b08b552c78',
                tenantId: '28cb1745-9047-4f65-9c6c-320e9b889a6f',
                systemId: '2a50b423-f6d2-40e3-b2d5-aacc7c43f4f4',
                systemName: '761jpo27akdfy0ubhy7j',
                executionId: '71699aa4-bf14-4b8a-ad35-7449b616de05',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 13:43:19',
                executionMonitoringStartAt: '2020-07-21 19:26:09',
                executionMonitoringEndAt: '2020-07-21 20:08:25',
                cancelled: 6815665523,
                completed: 2700216072,
                error: 2875135140,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                systemName: '285sc7yufgvtwbu9bhzt',
                executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 10:52:33',
                executionMonitoringStartAt: '2020-07-21 14:57:31',
                executionMonitoringEndAt: '2020-07-21 06:56:00',
                cancelled: 3511335348,
                completed: 8969466775,
                error: 1325449235,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72'));
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
            .delete('/bplus-it-sappi/job-overview/72b6e611-4d0f-4f33-bcf4-b24f4c0dde72')
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
                        id: '5ddac0c1-8ed3-4d0e-a5a7-cde7b2354de8',
                        tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                        systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                        systemName: '4q0xdo1j7x27o1qex3q8',
                        executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-21 08:33:14',
                        executionMonitoringStartAt: '2020-07-21 10:57:29',
                        executionMonitoringEndAt: '2020-07-21 23:53:10',
                        cancelled: 3308218377,
                        completed: 5596183059,
                        error: 3058770272,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '5ddac0c1-8ed3-4d0e-a5a7-cde7b2354de8');
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
                            value   : '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('72b6e611-4d0f-4f33-bcf4-b24f4c0dde72');
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
                    id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('72b6e611-4d0f-4f33-bcf4-b24f4c0dde72');
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
                        
                        id: 'a4a6d07e-c472-4a90-9a26-61c0720af714',
                        tenantId: '3477f5a9-c06a-4442-9188-885b50cd9761',
                        systemId: '9c9d0dcd-5ef9-430c-980b-f7d5f716f19b',
                        systemName: '0hect6u8bg4du8w3v58k',
                        executionId: 'dd9cd511-080e-4dd4-a0a8-9f7763644e49',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 23:15:56',
                        executionMonitoringStartAt: '2020-07-21 01:19:59',
                        executionMonitoringEndAt: '2020-07-21 11:33:45',
                        cancelled: 3829480351,
                        completed: 7480802906,
                        error: 7358876379,
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
                        
                        id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72',
                        tenantId: 'c640fc09-a678-427c-94b7-34536b9fcc5c',
                        systemId: 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d',
                        systemName: 'gy6a702vyzo20pwjvynt',
                        executionId: 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 12:56:29',
                        executionMonitoringStartAt: '2020-07-21 05:23:50',
                        executionMonitoringEndAt: '2020-07-22 00:20:23',
                        cancelled: 2243837568,
                        completed: 2498475906,
                        error: 3873391879,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('72b6e611-4d0f-4f33-bcf4-b24f4c0dde72');
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
                    id: '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('72b6e611-4d0f-4f33-bcf4-b24f4c0dde72');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});