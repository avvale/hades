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
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'y1rpsqo8fg8ydsjyzyr9ubli88hh9yaairncl3brctnkh7rmo7',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'fxr8v4ywvptmnplfoimt',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:36:17',
                executionMonitoringStartAt: '2020-07-29 08:08:31',
                executionMonitoringEndAt: '2020-07-29 12:39:59',
                cancelled: 2048231859,
                completed: 8291458604,
                error: 4578164154,
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
                
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'ex12v5hw2gqc6ewcjk8wdeky5e3jipsfrke61pwg53dnzvpmom',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'ubb7yepdjo6bbluc9arb',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:03:41',
                executionMonitoringStartAt: '2020-07-29 03:18:40',
                executionMonitoringEndAt: '2020-07-29 10:01:23',
                cancelled: 9257058789,
                completed: 8872404457,
                error: 8079450353,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: null,
                tenantCode: 'bxh2m07fbe1rvw86tlpcq0db7uxkd41zemykqvgiehdfvt6yqm',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: '64wrx0adf62p8ov2q7b3',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:01:12',
                executionMonitoringStartAt: '2020-07-29 07:25:28',
                executionMonitoringEndAt: '2020-07-29 13:00:41',
                cancelled: 2585961292,
                completed: 2664017995,
                error: 8584657135,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                
                tenantCode: '77lgc0w9pge9h0qxsxl8gxfucv69cvhqlfd6r7kb44gr9kn9g0',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'zoz8m78jhqnepfulwx8i',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:11:39',
                executionMonitoringStartAt: '2020-07-29 14:26:19',
                executionMonitoringEndAt: '2020-07-29 05:30:57',
                cancelled: 6964517160,
                completed: 8239088702,
                error: 5270336511,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: null,
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'f0ebgv64lkj1yt0o3ot4',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:52:57',
                executionMonitoringStartAt: '2020-07-29 16:44:21',
                executionMonitoringEndAt: '2020-07-29 14:42:59',
                cancelled: 7094990476,
                completed: 4277768763,
                error: 3761426176,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'rwk1wxmkge7ke7st2red',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:25:43',
                executionMonitoringStartAt: '2020-07-29 00:59:48',
                executionMonitoringEndAt: '2020-07-28 19:11:25',
                cancelled: 8147048796,
                completed: 1882944699,
                error: 9158972149,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: '1nt4kc4p281zl9gcvv4mddjolr9jw61bnbh4uzseg7usmbshbq',
                systemId: null,
                systemName: '7ppypp8iqnq9ik1leetx',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:43:40',
                executionMonitoringStartAt: '2020-07-29 15:06:15',
                executionMonitoringEndAt: '2020-07-29 07:47:07',
                cancelled: 2418787936,
                completed: 3552853393,
                error: 8206586725,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: '3iwrzb110ilo93qn8alviiiq6befjisn9e9wt2pipy4ds03ylv',
                
                systemName: 'l47d4w5jmyp3b22jz1ua',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:08:03',
                executionMonitoringStartAt: '2020-07-29 00:32:40',
                executionMonitoringEndAt: '2020-07-29 03:23:34',
                cancelled: 3453189593,
                completed: 2112116325,
                error: 1517919896,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'a35aq8qq7kd92baw96k0q28eq1krlq574lzv5v0kcmavkwd45v',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: null,
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:34:16',
                executionMonitoringStartAt: '2020-07-29 09:11:26',
                executionMonitoringEndAt: '2020-07-28 18:42:18',
                cancelled: 8420263194,
                completed: 2766269230,
                error: 9732930408,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'n8f1gaztim5h5hifdglpq3rqweaqtv5gbxes5fck98r039oknt',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:35:55',
                executionMonitoringStartAt: '2020-07-29 15:16:44',
                executionMonitoringEndAt: '2020-07-29 07:29:19',
                cancelled: 6428539679,
                completed: 1412278377,
                error: 6153387202,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: '5jk4fksrwhncglhk6pr7ot733a4yl5l6q2wc34txc8heud5rnc',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'wfqnwggbrffj1e33p5d8',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:44:01',
                executionMonitoringStartAt: '2020-07-29 01:28:45',
                executionMonitoringEndAt: '2020-07-29 10:20:48',
                cancelled: 9745223411,
                completed: 5582608613,
                error: 7006636300,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'or9wa9ruvgm1yy0069syzn6g6ci19yhgl7jr170tw5tk0g4j5d',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'm6o90epeuz8fvzwmtxog',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:00:21',
                executionMonitoringStartAt: '2020-07-29 08:31:11',
                executionMonitoringEndAt: '2020-07-29 07:04:09',
                cancelled: 2644021366,
                completed: 3596354308,
                error: 4436944036,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: '3rclerm8jiom7dfjo2nsy8cfvgcjm52dynqo7fvlyyf78tt5v3',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 's1tqqfgimoastcqm4o5a',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: null,
                executionExecutedAt: '2020-07-29 01:20:15',
                executionMonitoringStartAt: '2020-07-29 11:18:14',
                executionMonitoringEndAt: '2020-07-29 11:51:27',
                cancelled: 3966608449,
                completed: 6349346888,
                error: 3425560808,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'go6cnmbjmv3w499p9bdioki4c5984oor4boowit8s0z1masjwo',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'cgw2ts0c5vhw2trxzblu',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                
                executionExecutedAt: '2020-07-29 04:59:37',
                executionMonitoringStartAt: '2020-07-29 12:26:47',
                executionMonitoringEndAt: '2020-07-28 20:49:02',
                cancelled: 5387769535,
                completed: 1041071296,
                error: 1276733672,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'i8a02bnbirn1taqi0czl1qjqtqc728w0cq3gt9hw2fs52a94ye',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'pi5ltueamd658rsedqkh',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 08:47:18',
                executionMonitoringEndAt: '2020-07-29 17:59:00',
                cancelled: 6311213296,
                completed: 7577995478,
                error: 9265789031,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'njdwaseakvrqnfszlcaozp2wz5xzmyquwn5qji3fgy9n223pys',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'c4lfl3y43atcdcyr96za',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-29 13:35:20',
                executionMonitoringEndAt: '2020-07-29 10:23:30',
                cancelled: 2328394450,
                completed: 2038182430,
                error: 4277565427,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: '11v3ugmfaviyuvxr0dkdlr8vb41u1kp06moc1mx51q81uro0p9',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: '8ukc66e3vizldkhl4mx4',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:39:25',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 14:29:22',
                cancelled: 5093754171,
                completed: 6031094792,
                error: 8708842650,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'ngn0fqfi08vggd800barrmwypqpoylmzt6wkcakf1f9zazmgia',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'rqi8dkanfizcy9z7abby',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:34:39',
                
                executionMonitoringEndAt: '2020-07-29 08:07:01',
                cancelled: 9711785237,
                completed: 3212613330,
                error: 3364069563,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: '3sjbveskqskt0yj1zpd86rxub23n4ohmzepizl8w0hptzfoytz',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: '03ct9omhrjszq7xpejl1',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:46:36',
                executionMonitoringStartAt: '2020-07-29 09:46:49',
                executionMonitoringEndAt: null,
                cancelled: 7048028288,
                completed: 1924828977,
                error: 3135968073,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: '0tgf6suqhlz0k8wbz9ny52d60vhp8jhsag2c1bhkm3prna20wx',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'a9aih8tr98d82gb5qd9t',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:55:10',
                executionMonitoringStartAt: '2020-07-29 12:21:56',
                
                cancelled: 8002739616,
                completed: 2864186923,
                error: 5778805392,
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
                id: 'o19sftqgimni7i7jusdrtcipgdtt8o66sn63p',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'h5pubh6wwivai0ic7329kprez4ettou6c69d3wrx2caixqs2ms',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'ctx1mlm9s7lo0s6bu3q8',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:47:28',
                executionMonitoringStartAt: '2020-07-29 07:28:05',
                executionMonitoringEndAt: '2020-07-29 09:43:14',
                cancelled: 4130032676,
                completed: 8073111454,
                error: 7641947934,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '4f8pxxcyk8phim30n97hjyri9jukib4chwmrp',
                tenantCode: 'h1r6jwpeb0wjt33p8m9hm6djgjhlnqnsjvznob82fm3tnjbzr6',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'dyrcy6e1uihfyfsv5p48',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:30:40',
                executionMonitoringStartAt: '2020-07-29 15:11:37',
                executionMonitoringEndAt: '2020-07-29 04:40:02',
                cancelled: 7523844864,
                completed: 5064289709,
                error: 4476948253,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'e6d751f1um3hbqxr1q1incdnfkepsjcpcthcwkv8q9xakqzif9',
                systemId: 'fld3p3dk0yfoytah11zfx0vr8c1fdpiquspne',
                systemName: 'zfge0x5xmiem0vplkk0m',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:41:04',
                executionMonitoringStartAt: '2020-07-28 18:57:41',
                executionMonitoringEndAt: '2020-07-29 12:43:31',
                cancelled: 3019280000,
                completed: 3427365602,
                error: 5404952173,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'fkd15s804pildd76dq9xczedaww2w352up86ni2zfyczurmzym',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'bmcpvrkq55ebc18y1oh1',
                executionId: '13931n7ux3omh0qrl6jymtre2or6z1oakqf0m',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:19:17',
                executionMonitoringStartAt: '2020-07-28 23:56:02',
                executionMonitoringEndAt: '2020-07-28 23:12:41',
                cancelled: 7717201388,
                completed: 4383387077,
                error: 2737206623,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'uxa6cnxhma38jrdr06864ypml4r2nva9ulx4irj7b7xyunbrg0m',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'j75d9gq6jkknl0vjvvgj',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:14:14',
                executionMonitoringStartAt: '2020-07-29 04:22:43',
                executionMonitoringEndAt: '2020-07-29 14:32:18',
                cancelled: 5254737916,
                completed: 8835992807,
                error: 4817583579,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'hi2zw0afy46xia2ixxxt5so8e0t008rqdomff2gu85cegyqncd',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: '97ykkcqwv3cl7bmkvp8oe',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:43:12',
                executionMonitoringStartAt: '2020-07-29 07:31:28',
                executionMonitoringEndAt: '2020-07-28 21:56:51',
                cancelled: 3032282775,
                completed: 6724823901,
                error: 7865839613,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'slug74cp11xa4msyzhvkcfqhsl80kx4lqktzyoegss25vkitat',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: '07nwsh8tl5aikylz65dw',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:40:33',
                executionMonitoringStartAt: '2020-07-28 21:30:02',
                executionMonitoringEndAt: '2020-07-29 08:55:15',
                cancelled: 48847292303,
                completed: 6075804226,
                error: 1521642382,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: '0qg6tvlbwvvcyiyvwa1zr09q6a57867q59fsxbsj4ztp42irym',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'v3h7y3ce8jlycn9rhqc9',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:58:30',
                executionMonitoringStartAt: '2020-07-29 14:46:57',
                executionMonitoringEndAt: '2020-07-29 03:12:58',
                cancelled: 6088660168,
                completed: 67457898114,
                error: 3590146458,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: '00mzyucy9gte0cbet5r0slu1oibiwjxdd6puhhxq7rvn1zsczo',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: '0j4n4fx84q6xl8x1mak7',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:53:00',
                executionMonitoringStartAt: '2020-07-29 17:22:09',
                executionMonitoringEndAt: '2020-07-29 04:21:09',
                cancelled: 7988310624,
                completed: 3769182820,
                error: 28360082647,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: '0rjq91e5c5r8glff651q2bsjr0ghheve6v0iwxe3t44sqwhh4i',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'ppuheu44op7kbir96bbq',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:04:02',
                executionMonitoringStartAt: '2020-07-28 22:17:01',
                executionMonitoringEndAt: '2020-07-29 04:45:00',
                cancelled: -9,
                completed: 2392904634,
                error: 8429551467,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'sjmdtgbkdlc62a8h1xvj8evxm1rs5m1rdun180zijcez211z2q',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'e8ccd8pi4tnkteeeyb6r',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:39:12',
                executionMonitoringStartAt: '2020-07-29 15:22:38',
                executionMonitoringEndAt: '2020-07-29 13:57:20',
                cancelled: 7171431376,
                completed: -9,
                error: 4722337975,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'uwgohbmzxxo7fax9lgq7zziyad45xfo38h1lph77o54dli9v1d',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 't1l760viq33vlw254wpb',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:24:37',
                executionMonitoringStartAt: '2020-07-29 02:45:14',
                executionMonitoringEndAt: '2020-07-28 20:31:46',
                cancelled: 9080233753,
                completed: 4143642669,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'q57lqffburloht41uyr3495artebnb1dbwimx0y5i5y8nkv5ps',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'w9fldwakczgx9cm1b7pc',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 07:21:48',
                executionMonitoringStartAt: '2020-07-28 23:12:12',
                executionMonitoringEndAt: '2020-07-29 05:14:29',
                cancelled: 4122555736,
                completed: 5533832853,
                error: 3175731668,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: '54po2jnle2iw91bbrs5tolr1jmafssxx77ylc45zsp7cfip0s6',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'ms2sj3a0ebb6hreujbi8',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 07:38:48',
                executionMonitoringEndAt: '2020-07-29 07:45:10',
                cancelled: 2251848696,
                completed: 5441236175,
                error: 2718505720,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'fvl62f2qhhqo3t3h38e23g80gdatbvwx4sc1emhiajpmt1cvtk',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: '8ninjxh3tpno4vo26v5p',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:04:17',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 07:43:08',
                cancelled: 6043144773,
                completed: 7401086893,
                error: 7647318083,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: '89xguetn1g5ax3ye595vexahpg5u24tmxbvuhfs29qpfrigdop',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'fexh90wpp7cw604jr5cd',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:49:56',
                executionMonitoringStartAt: '2020-07-29 01:17:25',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 5257991097,
                completed: 4991492136,
                error: 4615872487,
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
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'f6j5v2r9nzyzf57o6i4shgehvl2hdo0hum8j4e9xas0twsf5ik',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'l7j82drg0b3j95td24ij',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:36:19',
                executionMonitoringStartAt: '2020-07-29 11:16:41',
                executionMonitoringEndAt: '2020-07-29 00:08:09',
                cancelled: 7737093084,
                completed: 7010620150,
                error: 4081295175,
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
                        value   : '394a3a2e-69af-4767-9d3c-0bbe8f7512e5'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '394a3a2e-69af-4767-9d3c-0bbe8f7512e5'));
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
            .get('/bplus-it-sappi/job-overview/394a3a2e-69af-4767-9d3c-0bbe8f7512e5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '394a3a2e-69af-4767-9d3c-0bbe8f7512e5'));
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
                
                id: '2f4d1375-c894-4af1-927e-89d09da9960d',
                tenantId: '841d663a-540c-4c6d-83ab-bc1c8cc8426b',
                tenantCode: 'vmq70lmm5hrxhp4scgwupx5uol12wj3h4x6nb203yt9vulucl1',
                systemId: '36b24f19-231b-43f9-a8ef-d52b95df2ddc',
                systemName: 'rc2l9iyswspzk5ekzjn0',
                executionId: 'd5a480c0-532e-442b-a3e7-929a9cc82b8d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:21:12',
                executionMonitoringStartAt: '2020-07-29 16:00:03',
                executionMonitoringEndAt: '2020-07-29 17:04:17',
                cancelled: 5216774397,
                completed: 6048869376,
                error: 6246988158,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                tenantCode: 'nenliv33vx96ogek0yzsgx64tyyds7wer0d9ld97ipunuzxgvi',
                systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                systemName: 'h9cm3to2j7r4ge5wd9q2',
                executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:31:10',
                executionMonitoringStartAt: '2020-07-28 22:39:32',
                executionMonitoringEndAt: '2020-07-29 04:40:29',
                cancelled: 7899162000,
                completed: 5413218133,
                error: 1160119015,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '394a3a2e-69af-4767-9d3c-0bbe8f7512e5'));
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
            .delete('/bplus-it-sappi/job-overview/394a3a2e-69af-4767-9d3c-0bbe8f7512e5')
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
                        id: '4e5ac587-6841-46d0-b96a-8c5db4ca91a9',
                        tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                        tenantCode: '8ehv37carbmyzafg8zpufdnuglq6s1xbebbohzweqa6it8fu2u',
                        systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                        systemName: '76hc0j0vgpe1nd4fh87g',
                        executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 16:55:52',
                        executionMonitoringStartAt: '2020-07-29 06:17:36',
                        executionMonitoringEndAt: '2020-07-29 16:47:39',
                        cancelled: 2765507354,
                        completed: 1227302293,
                        error: 3135658540,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '4e5ac587-6841-46d0-b96a-8c5db4ca91a9');
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
                            value   : '394a3a2e-69af-4767-9d3c-0bbe8f7512e5'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('394a3a2e-69af-4767-9d3c-0bbe8f7512e5');
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
                    id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('394a3a2e-69af-4767-9d3c-0bbe8f7512e5');
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
                        
                        id: 'ce42bf3e-1550-4b7d-9ee7-c72c0e6ce435',
                        tenantId: '7935261d-d682-4450-8006-724d70b85378',
                        tenantCode: '57f9fwmg86zyrbrk4aetrldugv8tn03yw51zw57ugw5rgp0rn9',
                        systemId: '60e5ab28-3a78-42b4-82de-f0585af80113',
                        systemName: 'chnp0o4w752gqsud3jis',
                        executionId: 'a1349303-cc38-4cfe-9a1a-dc44d491764c',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 04:29:27',
                        executionMonitoringStartAt: '2020-07-29 03:16:22',
                        executionMonitoringEndAt: '2020-07-29 07:42:52',
                        cancelled: 3823876070,
                        completed: 5921442540,
                        error: 7478027643,
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
                        
                        id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5',
                        tenantId: '53d9c67d-50a6-4201-9d91-1b80a2d4585a',
                        tenantCode: 'oafndnlfdd6869ktmn7jn9djjmqubuc3b77u0c9p9noc5oli25',
                        systemId: '31894aef-9efc-4bf3-bf38-726f8d566dd3',
                        systemName: 'fzjscbzlqis2wucqnzql',
                        executionId: 'd37482d8-dace-4e18-82a2-e6fc762b01b4',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 08:40:54',
                        executionMonitoringStartAt: '2020-07-28 21:15:50',
                        executionMonitoringEndAt: '2020-07-29 08:37:04',
                        cancelled: 3918905286,
                        completed: 9880191290,
                        error: 9068319992,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('394a3a2e-69af-4767-9d3c-0bbe8f7512e5');
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
                    id: '394a3a2e-69af-4767-9d3c-0bbe8f7512e5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('394a3a2e-69af-4767-9d3c-0bbe8f7512e5');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});