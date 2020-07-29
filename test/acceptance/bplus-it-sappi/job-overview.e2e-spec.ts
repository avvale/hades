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
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: '01uionkgarn1o5l13rdgt5zvopmo7mnr3a13gz3vwukwqiaf56',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'otk5c87h1rpq02o4blmv',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 17:46:19',
                executionMonitoringStartAt: '2020-07-29 06:27:53',
                executionMonitoringEndAt: '2020-07-29 13:59:32',
                cancelled: 7849620779,
                completed: 5977417178,
                error: 7029505973,
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
                
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'kasm21f0dysg6q2kyg44dajhc8iun2kafotk9a5vu5clxg10k0',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'eowdyskvch5o3pgkpvh8',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:35:11',
                executionMonitoringStartAt: '2020-07-29 04:12:43',
                executionMonitoringEndAt: '2020-07-29 06:13:03',
                cancelled: 6434691908,
                completed: 3371638413,
                error: 3305206937,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: null,
                tenantCode: 'k289ptm3v1m5hon233h8y04mxn4orbmxqpesihv7w84gbifyck',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'c5lmr7pqpbhr1uv6b86k',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:17:52',
                executionMonitoringStartAt: '2020-07-29 18:14:40',
                executionMonitoringEndAt: '2020-07-29 23:10:15',
                cancelled: 2476310062,
                completed: 1394996856,
                error: 9586882777,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                
                tenantCode: '3notuao9z31pwtku9zarh6kmfzcsuoz5wmg7qokfox722j2ikk',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'bke96gl6uk71rfvy7qql',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 23:17:20',
                executionMonitoringStartAt: '2020-07-29 06:31:50',
                executionMonitoringEndAt: '2020-07-29 07:20:20',
                cancelled: 1283704087,
                completed: 3808720305,
                error: 4441258232,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: null,
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'sptu5gf507dmzwqdwam9',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 21:30:25',
                executionMonitoringStartAt: '2020-07-29 03:29:21',
                executionMonitoringEndAt: '2020-07-29 15:30:53',
                cancelled: 3983627874,
                completed: 8963184333,
                error: 5137136565,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'jw4jgfro9uo0ey1hdvdp',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:57:23',
                executionMonitoringStartAt: '2020-07-29 11:56:30',
                executionMonitoringEndAt: '2020-07-29 22:18:53',
                cancelled: 3770520876,
                completed: 3372568930,
                error: 2449975524,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'sjo5jlduy0h3fi1fiwz03a7i01gkfjnpyni20h80e850vairsh',
                systemId: null,
                systemName: 'q3a7eqftd5m58iq4wshw',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:52:35',
                executionMonitoringStartAt: '2020-07-29 13:09:12',
                executionMonitoringEndAt: '2020-07-29 13:43:56',
                cancelled: 8612764774,
                completed: 8724365645,
                error: 8974074237,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'z8n0zpsr8lg9796sar20m1yyov26xpe3hjal3zxs68z932bgob',
                
                systemName: 'z5jf5at4zfrcjeoko61t',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:49:22',
                executionMonitoringStartAt: '2020-07-29 18:54:32',
                executionMonitoringEndAt: '2020-07-29 13:24:48',
                cancelled: 7658113093,
                completed: 3039272541,
                error: 7873152306,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'um7ryi09g1i76381xwu7r2ha3fga93pxi9b71ubgzmiww2dt01',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: null,
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:56:54',
                executionMonitoringStartAt: '2020-07-30 00:40:47',
                executionMonitoringEndAt: '2020-07-29 13:17:32',
                cancelled: 7047687366,
                completed: 4855447328,
                error: 7408481265,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: '6jsvc5f6lu2d6pjp66eqn7hpmsbnkmzxo6pa1n4h8xv0h9jy1m',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:22:45',
                executionMonitoringStartAt: '2020-07-29 15:19:27',
                executionMonitoringEndAt: '2020-07-29 13:37:32',
                cancelled: 3038419094,
                completed: 3376249852,
                error: 5271024120,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'l4r9d8vuklc7w64kqpo179zj8mquffxre4nd3w82usudwpjdc9',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'xal2ahbfolbbavzclhpr',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:20:57',
                executionMonitoringStartAt: '2020-07-29 18:08:36',
                executionMonitoringEndAt: '2020-07-29 07:52:40',
                cancelled: 2972142302,
                completed: 2398675929,
                error: 8267166180,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: '3r7mncj72k4js53opolf6dedfw6l7nruzriof2ykieb4i2f5nj',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'afo42zpuq87c4brzt7yv',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:00:35',
                executionMonitoringStartAt: '2020-07-29 08:00:51',
                executionMonitoringEndAt: '2020-07-29 13:05:05',
                cancelled: 8204635650,
                completed: 9306637470,
                error: 9690208981,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'f4lk0nzx5evrgnf57efsorbgfvpo8misagr6z6w3j35a251t91',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'od8o7s2vzmjbz9idaqi3',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: null,
                executionExecutedAt: '2020-07-29 15:29:26',
                executionMonitoringStartAt: '2020-07-29 10:16:52',
                executionMonitoringEndAt: '2020-07-29 20:44:18',
                cancelled: 1847329154,
                completed: 5467900999,
                error: 2784270169,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'jdubw00xwfgu6af7o7tpi9p97aw0vzwzmk7a2812hkh4639wk5',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: '6hcdx9449z0htr9zlz4b',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                
                executionExecutedAt: '2020-07-29 12:36:57',
                executionMonitoringStartAt: '2020-07-29 09:25:34',
                executionMonitoringEndAt: '2020-07-29 02:15:25',
                cancelled: 4960745353,
                completed: 3718821231,
                error: 6137039325,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'a4l8m0hc0sb6x9n01zlymk73bvguu3nl5mqp95fro53tht9i6t',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'srwu3u7ozk681cs8ytrs',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 18:09:18',
                executionMonitoringEndAt: '2020-07-29 04:29:58',
                cancelled: 3509738408,
                completed: 4411787155,
                error: 1278352281,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: '7ibklwc3e1l55kiktaho1k4dnla3ykam5ootmmfnuuw8rzvn8n',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: '5prpj51tngw150yuqz4e',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-29 04:28:32',
                executionMonitoringEndAt: '2020-07-29 04:33:13',
                cancelled: 5057178449,
                completed: 3735500716,
                error: 4868171672,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'b4rnx7evfelcl9jjvb7mj3mqxxcz3kxjpcy15eb99bafyn9jg5',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'yobkh5kqzbthwpbyrs16',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:47:09',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 10:26:40',
                cancelled: 4864671990,
                completed: 8695624237,
                error: 6083816217,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'exil2erdyjcxqhd6sndo89b9txt5xw7z4c0939s4ujmud5a06p',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 's3490g2u3613j90kp97z',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:28:44',
                
                executionMonitoringEndAt: '2020-07-29 04:05:37',
                cancelled: 9271135348,
                completed: 7972253520,
                error: 8540249566,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'tngaugg9xrxfk6zis8vyyxirwn2e65m5kj3e24zw797jz1z9p5',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'gmy51990thgk9fgrh4eb',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:44:28',
                executionMonitoringStartAt: '2020-07-29 14:56:39',
                executionMonitoringEndAt: null,
                cancelled: 2295841349,
                completed: 9324707844,
                error: 2164126895,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'xslkyyiwi2zd05tvpdyg47ef987fyqmtoaktq4ci3i8wxl459f',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'goznurdug4195uxlb544',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:20:11',
                executionMonitoringStartAt: '2020-07-29 04:48:22',
                
                cancelled: 2327685007,
                completed: 1692397444,
                error: 3431971199,
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
                id: '8245j61r9p2lxk8ffo2l8teyy0wn7zqa036nw',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'd5hc08pgysd18dsivf992ny4ouqt6n0e0yjwgutn95zp0g3i1n',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: '9zx3oyy7foyd5x3og34p',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 22:21:53',
                executionMonitoringStartAt: '2020-07-30 00:03:41',
                executionMonitoringEndAt: '2020-07-29 17:50:25',
                cancelled: 7979194624,
                completed: 4308630582,
                error: 7480981010,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: '2hfed1lxltz7eknknshhrrgd8evgp0kxttifk',
                tenantCode: '1w3k3djftxbyx9bj40o5smpj9mfdda4kbige83as3b9ty25qer',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: '3np376j4ks1dk00xhjrz',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:07:20',
                executionMonitoringStartAt: '2020-07-29 09:30:06',
                executionMonitoringEndAt: '2020-07-29 08:53:30',
                cancelled: 9450802364,
                completed: 2134535313,
                error: 2398331012,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: '74xso5siz1v2qjg4sra9rws7o3ol6mnbxnep5k28d8htk8uvlm',
                systemId: 'sqtigcnrl982cdwcym353t30kpiv6oeysw1bc',
                systemName: '3h87cioq78tcywr7oait',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:35:53',
                executionMonitoringStartAt: '2020-07-29 06:32:15',
                executionMonitoringEndAt: '2020-07-29 08:27:01',
                cancelled: 6951883263,
                completed: 6371052673,
                error: 8259775276,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'ptlc1cz3iojrxxzacuei9gkw9w8s1ufa21gl9vxdz3osqfap6s',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'ka1xpgwk6a456o0m1axp',
                executionId: 'ftd7w9hc56r9qahyieo67u0u27v46a9wtcw32',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 19:57:12',
                executionMonitoringStartAt: '2020-07-29 18:19:35',
                executionMonitoringEndAt: '2020-07-29 22:25:15',
                cancelled: 4863948974,
                completed: 4274914176,
                error: 3486848135,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'l69de01pvwx5zocye99tv63gr1jeulqs2ctxay1nanq7e6kg8ng',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'tsy7n6541xh51so4u8xd',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:46:54',
                executionMonitoringStartAt: '2020-07-29 20:31:26',
                executionMonitoringEndAt: '2020-07-29 11:29:10',
                cancelled: 1370106715,
                completed: 9231160149,
                error: 8376892535,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'bfbzrm22u8cjcoys4ot62x2i3hlfaobeb3qjaez8h52ji5gbe1',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'owfkk2ny519z8v9ax2tew',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 21:30:32',
                executionMonitoringStartAt: '2020-07-29 13:35:06',
                executionMonitoringEndAt: '2020-07-29 10:42:20',
                cancelled: 2719632546,
                completed: 5791667677,
                error: 2834032886,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'r4zj2vp0ecui1s9nu24j3nnrn4ndb84iotorz65x64t8z1nm5z',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: '489d01bfh0ug1iv500im',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:23:14',
                executionMonitoringStartAt: '2020-07-29 15:41:58',
                executionMonitoringEndAt: '2020-07-29 11:48:01',
                cancelled: 10821907036,
                completed: 4751391011,
                error: 7539074112,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'vmf0ovb38gfyepcz8qad7mw3k9ez3fmyqbpipkzkawkk2r54rh',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'l0p4yulqzjc75tekek3o',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:16:46',
                executionMonitoringStartAt: '2020-07-29 22:22:42',
                executionMonitoringEndAt: '2020-07-29 08:15:32',
                cancelled: 6100830112,
                completed: 85951943227,
                error: 2649777848,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'n7z3o3rig4achzmu40s2v9dt5kda6nrstpee8vxcl0ytkf0pwq',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'trtw517n9hmqnhlrfplb',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:12:36',
                executionMonitoringStartAt: '2020-07-29 11:40:43',
                executionMonitoringEndAt: '2020-07-29 10:47:06',
                cancelled: 4033021713,
                completed: 3074147658,
                error: 78253772424,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: '5pspmnpvfsi73zgbpi30cr5xfepqr7lkdow4nxfji4xp9je5rd',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'eupxq9ljccjzilbfr2rs',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:30:53',
                executionMonitoringStartAt: '2020-07-29 17:01:44',
                executionMonitoringEndAt: '2020-07-29 14:31:03',
                cancelled: -9,
                completed: 5587308294,
                error: 2298349755,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: '8syyk20m36p5frz39wkuwepeomro7ofotes5sy84tebxleenvw',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'z37vj6lpgo0qsjf16rtf',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:19:33',
                executionMonitoringStartAt: '2020-07-29 10:35:40',
                executionMonitoringEndAt: '2020-07-29 15:48:34',
                cancelled: 9582471369,
                completed: -9,
                error: 6563773268,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'bl1stzz3xs3h06viu9xpfb5xey70crjs3f7851rnjy3t3ej67k',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: '61d2e9znjhby9bcpd3rw',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:58:46',
                executionMonitoringStartAt: '2020-07-29 06:05:25',
                executionMonitoringEndAt: '2020-07-29 20:15:07',
                cancelled: 1679012813,
                completed: 6999598841,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'jya4dbqb1embi17hlom17uwsx0pwqianwttmghnjjbv7cljhk6',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'bbmh3k2lceswm4t4bn9q',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 13:23:29',
                executionMonitoringStartAt: '2020-07-29 16:02:56',
                executionMonitoringEndAt: '2020-07-30 00:28:19',
                cancelled: 9874435358,
                completed: 2142778177,
                error: 7970748059,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'o9u8pp6me71dzg22l2ttc03imqfje0k7tkkkd2zul17b2hw0yv',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'llq6te6rr027vn2g8ow1',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 08:13:49',
                executionMonitoringEndAt: '2020-07-29 03:05:12',
                cancelled: 8757773694,
                completed: 2859517266,
                error: 6737855869,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'sghgg4tyeadixn70i4vk8563xpv7x3tt91nf89jlmfqgq78vkj',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'k799kdb834aocc8n12l4',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:23:36',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 18:54:08',
                cancelled: 4217936862,
                completed: 8048617816,
                error: 5039893736,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: '2c0kkdkqfgaorwz0dwxl1m0k4zfiloupettfq6b86bc8cxv48h',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: '5etj691kuayqm5gv9lt5',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 21:20:18',
                executionMonitoringStartAt: '2020-07-29 09:13:42',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 7030736987,
                completed: 3874730895,
                error: 4772837651,
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
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: 'fg9alvjdxe36n6ff0t5865laxikb0wnnimty15c28lpyvgg3b4',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'r3piw4vi20nxf1hedeio',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 22:13:29',
                executionMonitoringStartAt: '2020-07-29 03:14:50',
                executionMonitoringEndAt: '2020-07-29 16:15:48',
                cancelled: 2518400874,
                completed: 4226352785,
                error: 2088391526,
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
                        value   : '00970c68-67cb-4b8c-84c3-acf3b43c310e'
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
                        value   : '27deac6c-fe97-4ff1-97b8-723353d79dae'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '27deac6c-fe97-4ff1-97b8-723353d79dae'));
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/bbbff68b-777b-4752-ad9f-38262d10e087')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/27deac6c-fe97-4ff1-97b8-723353d79dae')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '27deac6c-fe97-4ff1-97b8-723353d79dae'));
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
                
                id: 'abdb91b0-f9fc-4499-ad2a-b43aaf773e68',
                tenantId: '6e488b0e-7459-4623-8e94-06bcfda0cfda',
                tenantCode: 'h2bfgb2k19q3hr2x9djijowxochco4ey1nbfc2y1p7yrqjxw04',
                systemId: '4305557c-d4d5-44d8-90d6-4fbb9d92ec0e',
                systemName: '60vnsvuor0vievg0uog3',
                executionId: 'b07ff7a6-f8c2-439f-a785-82eac13f10ca',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:13:31',
                executionMonitoringStartAt: '2020-07-30 00:05:24',
                executionMonitoringEndAt: '2020-07-29 17:06:01',
                cancelled: 1833006741,
                completed: 3604438950,
                error: 5232601085,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                tenantCode: '2fyqnwfjbjbzl7wsuwslvt5fvf24sduby313nssjhxfcof3nb0',
                systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                systemName: 'x6xcpe62szcwebkx4ixe',
                executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:10:30',
                executionMonitoringStartAt: '2020-07-29 01:38:42',
                executionMonitoringEndAt: '2020-07-30 00:13:01',
                cancelled: 7822495455,
                completed: 4751639535,
                error: 9249578276,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '27deac6c-fe97-4ff1-97b8-723353d79dae'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/116991b9-d499-4ad7-bafd-f67a6498fbe9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/27deac6c-fe97-4ff1-97b8-723353d79dae')
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
                        id: '9d9606ee-9441-4132-81c2-ef3d7d8df990',
                        tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                        tenantCode: '1p76fsz6pc62g22qzgjseln5avkjq00eer0w79vv3sd455ac25',
                        systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                        systemName: '0i7jx10giv262425bup9',
                        executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 23:29:44',
                        executionMonitoringStartAt: '2020-07-29 18:13:42',
                        executionMonitoringEndAt: '2020-07-29 22:36:31',
                        cancelled: 1160051097,
                        completed: 3479221608,
                        error: 4994375921,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '9d9606ee-9441-4132-81c2-ef3d7d8df990');
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
                            value   : 'fad68164-131c-410c-93cf-2c46e9d0c507'
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
                            value   : '27deac6c-fe97-4ff1-97b8-723353d79dae'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('27deac6c-fe97-4ff1-97b8-723353d79dae');
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
                    id: '361fc0ed-f6a7-4867-9730-9ff9b378749e'
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
                    id: '27deac6c-fe97-4ff1-97b8-723353d79dae'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('27deac6c-fe97-4ff1-97b8-723353d79dae');
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
                        
                        id: '82c15297-924c-4cd5-9204-8c3fdf369217',
                        tenantId: '373dbf4f-7f50-4510-baba-9c890ff9c890',
                        tenantCode: 'l9zox9yrxazdmw8h4nmfyntg5b8cxk0p5pegsyco55w9iljll2',
                        systemId: '46b91e91-0ad5-480a-8921-ac3f8c3a8ef4',
                        systemName: '97e5l7ljrds4imupeg4s',
                        executionId: '2e05e3f1-55f1-468b-a138-fbf5be5599f9',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 12:22:42',
                        executionMonitoringStartAt: '2020-07-29 21:29:43',
                        executionMonitoringEndAt: '2020-07-29 07:21:52',
                        cancelled: 8698222147,
                        completed: 1863932064,
                        error: 9148102679,
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
                        
                        id: '27deac6c-fe97-4ff1-97b8-723353d79dae',
                        tenantId: 'b4fb420a-9664-45e9-ba6a-52af049a144b',
                        tenantCode: 'grr5r8soswvd0kw8hpr884d8o6oeeou8yaqmvaaiq38ah0lr49',
                        systemId: '844f97e9-e531-44c9-bbfd-26a375c564f2',
                        systemName: '3sq0fiotsf95zeith23i',
                        executionId: 'fc07584f-8a66-462a-93f6-9514424fd218',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 05:32:03',
                        executionMonitoringStartAt: '2020-07-29 06:00:11',
                        executionMonitoringEndAt: '2020-07-29 22:41:57',
                        cancelled: 8486761913,
                        completed: 8264334984,
                        error: 7448575149,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('27deac6c-fe97-4ff1-97b8-723353d79dae');
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
                    id: 'cfe69169-ecfb-478c-8010-0219fae55f70'
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
                    id: '27deac6c-fe97-4ff1-97b8-723353d79dae'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('27deac6c-fe97-4ff1-97b8-723353d79dae');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});