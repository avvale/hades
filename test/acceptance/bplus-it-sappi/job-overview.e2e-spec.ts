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
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'v0gzrqsfcetasq8vz0iarvqnnuvksoocc6neptenvhttub8ujs',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: '0vmto6r6txr2a5cgxtf8',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 00:24:11',
                executionMonitoringStartAt: '2020-07-27 06:51:36',
                executionMonitoringEndAt: '2020-07-27 02:19:16',
                cancelled: 5421405586,
                completed: 1212646012,
                error: 2659842489,
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
                
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: '0ar7m65yyvgld8wea7xh5iqaecjbkj7cpd6f2d6au66ml89uid',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'igrno50v7nhs4fo7qyyd',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:18:05',
                executionMonitoringStartAt: '2020-07-26 21:59:36',
                executionMonitoringEndAt: '2020-07-27 03:08:30',
                cancelled: 6100801364,
                completed: 3531178344,
                error: 6021885287,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: null,
                tenantCode: '2fmle04zk2zi576yfyn8kr7qlu18xz43p2k0ur9geyzbc394hi',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: '3wdti14h4xkgao0wlwv1',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 22:25:06',
                executionMonitoringStartAt: '2020-07-26 22:46:10',
                executionMonitoringEndAt: '2020-07-26 20:58:27',
                cancelled: 5132735130,
                completed: 7416481079,
                error: 1839488325,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                
                tenantCode: 'jesgm0n0sa84ewgqx2wtlwag7unajqjlqwd5gaqe00jur3kw07',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: '3mgzykq42nllpf7k2p7n',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 20:23:54',
                executionMonitoringStartAt: '2020-07-26 21:42:49',
                executionMonitoringEndAt: '2020-07-26 19:59:09',
                cancelled: 7912846291,
                completed: 8886391236,
                error: 1685158723,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: null,
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'jlksoldea97l4jpx1xhy',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:26:29',
                executionMonitoringStartAt: '2020-07-27 00:34:06',
                executionMonitoringEndAt: '2020-07-27 06:48:02',
                cancelled: 6021736659,
                completed: 8766353924,
                error: 9572544538,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: '0wkqnsmupxo7kcdqa79v',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:13:08',
                executionMonitoringStartAt: '2020-07-26 19:15:37',
                executionMonitoringEndAt: '2020-07-27 04:29:51',
                cancelled: 2840464025,
                completed: 3417131265,
                error: 2759431760,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'ft410k2ed2uztnvkfc883rtmwfn1bbg1ymt0cl6cm5dbzdmeco',
                systemId: null,
                systemName: 'er2st1ak4l2da86k1axk',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:07:24',
                executionMonitoringStartAt: '2020-07-27 12:10:19',
                executionMonitoringEndAt: '2020-07-27 12:01:20',
                cancelled: 4675208811,
                completed: 6758590127,
                error: 1450440289,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: '8qxzxp3u9cnn0e5b2fh8rpchj5lzlqvv4xuantnouuiltnpta3',
                
                systemName: 'qhxddmiybal409wydk13',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:09:42',
                executionMonitoringStartAt: '2020-07-27 02:18:19',
                executionMonitoringEndAt: '2020-07-26 19:52:25',
                cancelled: 4981313712,
                completed: 1320247070,
                error: 4291181126,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: '993wy7modhldgnvp0kku2w1tvv9cv1m12m134nganb46fho910',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: null,
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 23:11:51',
                executionMonitoringStartAt: '2020-07-27 01:22:54',
                executionMonitoringEndAt: '2020-07-26 19:38:41',
                cancelled: 5869838445,
                completed: 3084970261,
                error: 2916589111,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'logwzfhlnt3o2nied92c3je339l9pr3m0gydmburcpw6l6l6xn',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 17:34:34',
                executionMonitoringStartAt: '2020-07-27 01:48:59',
                executionMonitoringEndAt: '2020-07-27 01:52:27',
                cancelled: 7606344963,
                completed: 8473248380,
                error: 5430901004,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: '9vrb8fg2zgdo619pkpi25yygapvng6hrzt5pb7ewoiatbnow3l',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'icgwy8dumo8i1s550p7k',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 23:38:53',
                executionMonitoringStartAt: '2020-07-26 23:49:46',
                executionMonitoringEndAt: '2020-07-27 14:11:49',
                cancelled: 4640367771,
                completed: 2804912091,
                error: 5482137743,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'nvkchczig8fexcn8l1hbpcdxwswia4lfu58klc7jwgmzzvxnts',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'tsimtmbqb7cwdmnv4ss9',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:11:50',
                executionMonitoringStartAt: '2020-07-27 02:00:12',
                executionMonitoringEndAt: '2020-07-27 01:43:35',
                cancelled: 2888232242,
                completed: 6027250148,
                error: 4532753449,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'kflnetwm45ab6dqajlmzax56ipqs3ptdirzbun4k26u0r9w1rb',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'b59mraoxp5gyi2jy7cwd',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: null,
                executionExecutedAt: '2020-07-27 11:16:51',
                executionMonitoringStartAt: '2020-07-27 02:05:28',
                executionMonitoringEndAt: '2020-07-27 13:31:42',
                cancelled: 9758092724,
                completed: 4399361958,
                error: 9831387098,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: '51s3ycbr0c7fjb9lc1diu68300ja9qq4czy68flbivo17a80sk',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'fcpuvvij3hdjuurmjfvr',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                
                executionExecutedAt: '2020-07-27 04:35:39',
                executionMonitoringStartAt: '2020-07-27 15:15:25',
                executionMonitoringEndAt: '2020-07-27 06:03:47',
                cancelled: 1614979611,
                completed: 9668145419,
                error: 1912861934,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'upzpi50vty00ah6dwhh1kc746usyz8cbo5rtqen0ldn8r04nbl',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'lttqw7i10nh3rzwnypd5',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 16:33:05',
                executionMonitoringEndAt: '2020-07-27 05:06:45',
                cancelled: 6756926135,
                completed: 9362612899,
                error: 9167307835,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'ooe2f6fccm8rrii9lt53j7whluxfnk9834mf4ea5ym8ldvblwm',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: '89y85j22pydsqirx0pt4',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-27 04:30:08',
                executionMonitoringEndAt: '2020-07-27 14:30:07',
                cancelled: 4594978523,
                completed: 5992034293,
                error: 9279640198,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'x46knael8ftxmv15soz2tp96d38gtg8cvytd1srf6bd2dwmenc',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'otphtya33ythnie5s6j8',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:13:47',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-26 18:09:18',
                cancelled: 3573306540,
                completed: 8037893142,
                error: 5193515736,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'gwq1befa6343rimtil3istpmh1os3suctm8v7xyp3r9amgveun',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'k4cikwwjigxgtullnba6',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:55:44',
                
                executionMonitoringEndAt: '2020-07-27 04:59:41',
                cancelled: 8919200796,
                completed: 2711399047,
                error: 7983765342,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'a0wrih3gw6j8hvpk09kjfa25zfwt161giqtuyiv5j7qk4weud0',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'hl03zcjjurba4vwu8vnh',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:28:18',
                executionMonitoringStartAt: '2020-07-27 12:01:03',
                executionMonitoringEndAt: null,
                cancelled: 9043555840,
                completed: 8260018641,
                error: 5353272780,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: '296codd8adwkof7awvk5kdl5opzyobhapl888xnt4gtwpr7xrd',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'gft29634u41tfpulda7g',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:19:23',
                executionMonitoringStartAt: '2020-07-27 06:44:07',
                
                cancelled: 6395309675,
                completed: 2512923169,
                error: 3918423524,
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
                id: 'aswlfaeedu4pkcr73ei8svl2jnv4ziz3v8lah',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'w3pmq0owufrjl5w9rmiz57zxs10ofz17ts85f39bhat1rvtbwh',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'jeekt31oq5pn32dowtk0',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:37:58',
                executionMonitoringStartAt: '2020-07-26 18:25:30',
                executionMonitoringEndAt: '2020-07-27 10:56:50',
                cancelled: 9782083129,
                completed: 1611631672,
                error: 8132980967,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: '2rfk911b0bzvs9geh4ieosfen4f40wazvue5g',
                tenantCode: '18ai0zz8w0v72fymajog8a9bl4ma55pq8r9kg7eomtn3yov9d1',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'es70nx73qfvukctv8wk0',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:22:09',
                executionMonitoringStartAt: '2020-07-27 13:10:05',
                executionMonitoringEndAt: '2020-07-27 02:12:36',
                cancelled: 1769364579,
                completed: 3462409486,
                error: 9404428081,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: '291kac0h16ekne3a8etfo2hwr14xlwglqv87v1bzfnbyjrwu7j',
                systemId: '55ditrflrz304pj0sagm7w681gcmz2nkqawlv',
                systemName: '92oxxpr26huiw216swg6',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 22:28:28',
                executionMonitoringStartAt: '2020-07-27 00:13:19',
                executionMonitoringEndAt: '2020-07-27 15:55:44',
                cancelled: 4928294655,
                completed: 4079418440,
                error: 5859012277,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'ak5604iej2l6ealy4q2vc1sm995z6ahmmuugpzth6ipb0ecm4z',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'iwkdebw42tyv8ma11bue',
                executionId: 'ipto4mb5a2s7bchryhab9s5synjxbstxpag4o',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 09:27:52',
                executionMonitoringStartAt: '2020-07-27 11:46:55',
                executionMonitoringEndAt: '2020-07-26 22:45:20',
                cancelled: 4467835480,
                completed: 3495443307,
                error: 9006013873,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'fh4lzxzy92lokzvxxggacfmba5yppornhpnw9hhwcd7oroefm6k',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: '4rwhd36pmsv2is89233f',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:25:08',
                executionMonitoringStartAt: '2020-07-27 14:20:21',
                executionMonitoringEndAt: '2020-07-27 05:54:39',
                cancelled: 8131644623,
                completed: 2440442354,
                error: 2311746956,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'me939979sjhmffj89fmszujnqjv851r1s9uzjxl435yqjalzqo',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'gbe3zdfipracemi4nkx63',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 17:11:39',
                executionMonitoringStartAt: '2020-07-27 03:58:38',
                executionMonitoringEndAt: '2020-07-26 18:32:57',
                cancelled: 3732011072,
                completed: 4547671492,
                error: 5044815561,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'c3xvy9wogzmnrh3vqdwbfkpfbt9h1w184wqahhir5qunw65q52',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'xq85jqstpbl4hlkvgk6e',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:28:07',
                executionMonitoringStartAt: '2020-07-27 03:26:17',
                executionMonitoringEndAt: '2020-07-26 18:11:56',
                cancelled: 92064738179,
                completed: 7104826047,
                error: 6600373949,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: '2bx0fl9jcof5vcchegk56mi2qtpxp1zsfo2vqmlst5undq89h6',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'y0410mpnjxss1cwgj3eu',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:11:02',
                executionMonitoringStartAt: '2020-07-27 05:34:44',
                executionMonitoringEndAt: '2020-07-27 15:11:08',
                cancelled: 1315200111,
                completed: 63816537899,
                error: 2189297580,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: '9ndea6brepcfy2sva8gc1lb5asusd5v8w2y1hi55kwd09pq4h0',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: '32793dgf8o366pym00d4',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:12:05',
                executionMonitoringStartAt: '2020-07-27 10:05:42',
                executionMonitoringEndAt: '2020-07-27 10:43:51',
                cancelled: 4414816912,
                completed: 9064174892,
                error: 40310086487,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: '2fgyupmied0cckpdft151kfmkbjdi0qgx3kzmmrjqdsbvw3w2b',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'cinjfet7plk5ei9yzxyv',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 08:04:57',
                executionMonitoringStartAt: '2020-07-27 11:41:46',
                executionMonitoringEndAt: '2020-07-27 12:06:16',
                cancelled: -9,
                completed: 2425340001,
                error: 1241859925,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'meqzvr1omtr1vckob2e7u1muoxu1dli8pw6y0m2q9ex8tzzzxg',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: '0tfspqvfy19zsvj0c78f',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 09:05:55',
                executionMonitoringStartAt: '2020-07-27 01:45:49',
                executionMonitoringEndAt: '2020-07-27 02:54:28',
                cancelled: 5254115756,
                completed: -9,
                error: 5794626358,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: '8ixrrvrzm0hxyawtouskpo6mfdxk5ea2ntr7llp6fzk2dv79ja',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'nz65rpcqv3ctioe1zz5t',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 22:43:08',
                executionMonitoringStartAt: '2020-07-27 09:12:02',
                executionMonitoringEndAt: '2020-07-26 17:48:30',
                cancelled: 3915955854,
                completed: 4449769952,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'fh3c54wab44scrnpzimcvqoizg2l07p89758be0xvu6wrlff2s',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'kxxig2htv1outbytnyv4',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-26 18:35:30',
                executionMonitoringStartAt: '2020-07-26 17:18:54',
                executionMonitoringEndAt: '2020-07-27 01:51:27',
                cancelled: 4021027154,
                completed: 3293428681,
                error: 3398828607,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'wisgdkp5j5ggr0u9zunvpqaqgo72suowe4uvg7vljhssk518a1',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'ctv2mrkr36a2t2n82n15',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 16:00:09',
                executionMonitoringEndAt: '2020-07-27 03:52:21',
                cancelled: 5637500949,
                completed: 1987043797,
                error: 4359246583,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'hn9yuuw7flch9kls4avdbmvphb2xgdpfgxiv84dgpfdps6ektv',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: '0zg6sajgsf7pprbznnes',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:01:07',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 13:37:17',
                cancelled: 3156848104,
                completed: 2246218996,
                error: 6589517060,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: 'uy90px09u1l7gtx8e1m4dii1x7sf7gno3kpak4xdodcx3zuadn',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'lylddn1yqs6vqplnhnqz',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 19:03:54',
                executionMonitoringStartAt: '2020-07-27 08:46:47',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 4073669620,
                completed: 7810959286,
                error: 9363324562,
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
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: '55kiunang5tjb9bakkr0lf8nnl95y7ouycsvurvadu4ndn3jpy',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'mbgbbqwym9y59qb4rgej',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 17:17:13',
                executionMonitoringStartAt: '2020-07-26 21:25:24',
                executionMonitoringEndAt: '2020-07-26 23:34:37',
                cancelled: 8696316299,
                completed: 1324461258,
                error: 1615999082,
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
                        value   : 'd31b379d-ea92-4702-a62c-e34ac3a5938c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd31b379d-ea92-4702-a62c-e34ac3a5938c'));
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
            .get('/bplus-it-sappi/job-overview/d31b379d-ea92-4702-a62c-e34ac3a5938c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd31b379d-ea92-4702-a62c-e34ac3a5938c'));
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
                
                id: 'ed370715-1371-47fc-ac82-13aa2e3a5992',
                tenantId: '16ade966-628e-46bf-b340-09bfcf87e2ba',
                tenantCode: '57p7sucim1n1c9oq5tm4oel6btsk4ao4idg86w7d2ph9ukyluy',
                systemId: '70e58844-5a13-4774-863d-1d4ddf050716',
                systemName: '79bivtfmo4bvy61z7v5p',
                executionId: '68886fe9-0354-4535-b681-47dab3940ef2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:05:24',
                executionMonitoringStartAt: '2020-07-27 06:37:24',
                executionMonitoringEndAt: '2020-07-27 12:31:08',
                cancelled: 6949527261,
                completed: 8024554890,
                error: 6410889945,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                tenantCode: '6giv7cngdiwvphma2xp51vhy7l2cebamxb6xzol02jwb4gm71m',
                systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                systemName: 'h1bro6139ew31pc8hdt9',
                executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:01:59',
                executionMonitoringStartAt: '2020-07-27 05:33:22',
                executionMonitoringEndAt: '2020-07-26 19:45:55',
                cancelled: 5006760776,
                completed: 7559962228,
                error: 9424893771,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd31b379d-ea92-4702-a62c-e34ac3a5938c'));
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
            .delete('/bplus-it-sappi/job-overview/d31b379d-ea92-4702-a62c-e34ac3a5938c')
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
                        id: 'd0c74fb5-4cac-4620-b0a7-46495edd59cd',
                        tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                        tenantCode: 'sqfpsj7jjc7d7dzrckzdg2685gt8pvoqrfpzt66z3a62dvjkgy',
                        systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                        systemName: '58p26p058ihe51idqyc3',
                        executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-26 18:40:06',
                        executionMonitoringStartAt: '2020-07-27 09:49:12',
                        executionMonitoringEndAt: '2020-07-27 13:57:58',
                        cancelled: 2351941689,
                        completed: 7459490229,
                        error: 2657710041,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', 'd0c74fb5-4cac-4620-b0a7-46495edd59cd');
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
                            value   : 'd31b379d-ea92-4702-a62c-e34ac3a5938c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('d31b379d-ea92-4702-a62c-e34ac3a5938c');
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
                    id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('d31b379d-ea92-4702-a62c-e34ac3a5938c');
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
                        
                        id: '60d28de5-b3a6-4e45-8b5a-9ffc570eecaf',
                        tenantId: 'c4784daf-b9df-4f3a-b135-189f1c756cc9',
                        tenantCode: 'v8h2bvbw9q1p1ihkkhp33ryy8zymo2u10myujt5kn6q2ge2rs0',
                        systemId: 'e36c7ae4-7c8d-4ca6-b945-f1fd2f35e131',
                        systemName: '99tsnrr8r9tulunefigv',
                        executionId: 'c40617f1-1db3-44e7-8f58-8ea3f2b14449',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-26 21:37:13',
                        executionMonitoringStartAt: '2020-07-27 13:58:57',
                        executionMonitoringEndAt: '2020-07-27 12:18:35',
                        cancelled: 6157689250,
                        completed: 3023885463,
                        error: 8734423779,
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
                        
                        id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c',
                        tenantId: 'b7096712-d02b-497d-893a-d61425363b2d',
                        tenantCode: '550nrbkhwby9nmrg8mxeypiasmfws0yud0mii7gjn1uqx0ui5b',
                        systemId: '741282e1-214b-4ec8-8f86-c5cfadc433f8',
                        systemName: 'h6yr0tzjwxcsv6tblsrn',
                        executionId: '9f00fdeb-5ff6-4a16-ad24-e4bafb2bb27b',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 10:30:17',
                        executionMonitoringStartAt: '2020-07-27 13:30:03',
                        executionMonitoringEndAt: '2020-07-27 06:08:23',
                        cancelled: 1775865778,
                        completed: 5724654246,
                        error: 1553323223,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('d31b379d-ea92-4702-a62c-e34ac3a5938c');
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
                    id: 'd31b379d-ea92-4702-a62c-e34ac3a5938c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('d31b379d-ea92-4702-a62c-e34ac3a5938c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});