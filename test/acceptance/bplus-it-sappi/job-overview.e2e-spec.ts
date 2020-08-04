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
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'xwjjdw1ir9yz31bmurhyylbk6xblrtiap8qmcd5q2tr9veotr9',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: '3du386sx77q3ago82knn',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 15:17:00',
                executionMonitoringStartAt: '2020-08-04 12:36:54',
                executionMonitoringEndAt: '2020-08-03 17:16:47',
                cancelled: 5279300674,
                completed: 7158585345,
                error: 5042501661,
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
                
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'rqo748b2xga5ntl0twm314fejd07ut55bbhl329u53hvuhgh38',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: '2uwgrkhzvjg11obfg6jn',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 01:16:43',
                executionMonitoringStartAt: '2020-08-03 16:29:26',
                executionMonitoringEndAt: '2020-08-04 02:41:36',
                cancelled: 5016062958,
                completed: 9519131472,
                error: 1753213195,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: null,
                tenantCode: 'lrgvjzlv8qbtw3939oktpmk78saeunm6ahun3zq4glaeto84gz',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'bidsp174t85aw6copyiy',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 20:55:02',
                executionMonitoringStartAt: '2020-08-03 20:34:22',
                executionMonitoringEndAt: '2020-08-03 20:50:44',
                cancelled: 2554865757,
                completed: 6601942132,
                error: 1761705143,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                
                tenantCode: 'jpflmh1nyzojzok7hhowimcc0tqgj4lq9yytbvteattvdhyoqr',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'dlszdbm3yimtlo9spp9v',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 02:16:02',
                executionMonitoringStartAt: '2020-08-04 03:28:22',
                executionMonitoringEndAt: '2020-08-04 04:20:06',
                cancelled: 6819237811,
                completed: 6289895572,
                error: 1549884214,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: null,
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: '4whnsgx2757tybpdkeh0',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 04:11:27',
                executionMonitoringStartAt: '2020-08-04 05:40:08',
                executionMonitoringEndAt: '2020-08-04 00:31:01',
                cancelled: 6081658307,
                completed: 2091500604,
                error: 7767844531,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'jlmxlulmtth66e96jw5x',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 23:15:38',
                executionMonitoringStartAt: '2020-08-04 07:46:26',
                executionMonitoringEndAt: '2020-08-04 06:56:38',
                cancelled: 2849023616,
                completed: 3206130678,
                error: 5622405865,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'wr9eit6ugezxtqowk0oxlfv4bl4b4idsb68sogflo1z4q2q1uq',
                systemId: null,
                systemName: 'qh9n85uhaq5zskf5ci6f',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 18:26:59',
                executionMonitoringStartAt: '2020-08-03 20:57:34',
                executionMonitoringEndAt: '2020-08-04 05:29:17',
                cancelled: 3962914259,
                completed: 1112686914,
                error: 9984865538,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'y2okr17plexrals8z4ko3wjnef2lm93l8kgvk585inm4708afv',
                
                systemName: 'zi20irr0ndl2q7at6jfc',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 13:33:40',
                executionMonitoringStartAt: '2020-08-04 05:02:23',
                executionMonitoringEndAt: '2020-08-03 19:04:54',
                cancelled: 2519507918,
                completed: 2253132954,
                error: 1004954613,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'y3wfmmr7yluqixs2suweildst9nrih01mikz9dgrz26zx1p3p2',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: null,
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 09:24:10',
                executionMonitoringStartAt: '2020-08-04 11:56:49',
                executionMonitoringEndAt: '2020-08-03 17:56:18',
                cancelled: 7477318408,
                completed: 4631558663,
                error: 7875198128,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'osaddnde4iwenhjr7r32ye0z1cjsm7f6yk1xv5qjye27vyts62',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 11:27:15',
                executionMonitoringStartAt: '2020-08-04 06:57:48',
                executionMonitoringEndAt: '2020-08-04 11:10:57',
                cancelled: 4201043976,
                completed: 7510447952,
                error: 4999725723,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'fvgjtnrjg2t5708guropb0dzzhxbnvulv0dgh9gnx7jr619ebj',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'u5mn8aqrvbnqjxoq24u9',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 07:32:13',
                executionMonitoringStartAt: '2020-08-03 23:15:12',
                executionMonitoringEndAt: '2020-08-04 11:20:38',
                cancelled: 6938079584,
                completed: 1252327827,
                error: 2224267001,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'od3uri25wpbem2rs72f70zywkgpr9tsposcubvu3hkdq7yl09n',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: '0xrm5aeit4dhgi87qpsb',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 06:56:57',
                executionMonitoringStartAt: '2020-08-04 14:27:39',
                executionMonitoringEndAt: '2020-08-03 22:59:07',
                cancelled: 4677929673,
                completed: 4991105349,
                error: 9235200232,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'epfs7w2wxgkwfn2iw0pwqpcvq5526mk91nhss9pp00q91futc5',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'a93yueeg914e4to9z78c',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: null,
                executionExecutedAt: '2020-08-03 23:22:52',
                executionMonitoringStartAt: '2020-08-03 22:36:17',
                executionMonitoringEndAt: '2020-08-04 01:14:06',
                cancelled: 8387323211,
                completed: 8442506585,
                error: 9868905416,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'q39yhn8zshiv6a5v50y5apb17tmcvfnuhe6buqyibys14xngjr',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'ak97um0fmf13p5djf4d7',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                
                executionExecutedAt: '2020-08-04 01:50:08',
                executionMonitoringStartAt: '2020-08-04 13:54:37',
                executionMonitoringEndAt: '2020-08-03 17:00:10',
                cancelled: 9180191160,
                completed: 1789867650,
                error: 7517136278,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'wbgyfhye0f7r1bj839bgtv7dftd70qhrx7emfcjrk6vf492nxs',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: '3nlezporr41kzghzumoq',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-04 06:42:53',
                executionMonitoringEndAt: '2020-08-04 07:04:20',
                cancelled: 7640591835,
                completed: 9006321294,
                error: 7061174339,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: '6n7jw5iavtqj3o9z9jbkhjfz75y3x35k02xexqlq9w8yg06wpq',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'fen9fvpunrj6dgwxviwa',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-08-04 13:20:52',
                executionMonitoringEndAt: '2020-08-03 15:36:17',
                cancelled: 3663467741,
                completed: 5813798846,
                error: 2126206873,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: '2aw3ifs4zkb71mbk3j2ytmmu3d1yiw8zhr3qt4pvh1f2atac8u',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'dmugryq0ws96pxwlzprw',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 09:32:39',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-04 00:24:09',
                cancelled: 5842551937,
                completed: 6488013038,
                error: 6801733638,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'suwxduer9sz1tqf7fswrbuofk3awigg69d8oxowhza4blrrs68',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: '0hrnansydau5u29h5noz',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 02:34:01',
                
                executionMonitoringEndAt: '2020-08-03 16:19:39',
                cancelled: 1705973338,
                completed: 5169624071,
                error: 3444235011,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'q054ltnc4gbl8mbu0x1ci0ktc94k8rqy1yauccs47dptj961jo',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'kvjovbregvi78z7evsld',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 07:46:37',
                executionMonitoringStartAt: '2020-08-03 20:13:51',
                executionMonitoringEndAt: null,
                cancelled: 6857393286,
                completed: 9220810984,
                error: 6966198339,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'zwoezv858kkrinj1ohdgcsiyvl6zvsfhgyxuml3b9xv4x5mzps',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'sywrwronkkwvfm1ev9a1',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 19:19:00',
                executionMonitoringStartAt: '2020-08-04 12:03:01',
                
                cancelled: 1035510040,
                completed: 4529569320,
                error: 7628680308,
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
                id: 'snrqgnpiyud9ba3hhsjthyzkuczntbrfzeqsk',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: '4rt1pdkfsdcfw09fqrfxmbuh54nzwueewz60ms4t9yv2wocntq',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'jq6obgj5vphih17shbcq',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 03:38:59',
                executionMonitoringStartAt: '2020-08-04 11:25:46',
                executionMonitoringEndAt: '2020-08-04 05:26:08',
                cancelled: 5463367413,
                completed: 1401586844,
                error: 2995403971,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: 'qx34ib5jqjuyhbydpuxjjjb7ov6jisbxtwopv',
                tenantCode: 'fe4ojnpu1aysf3h46vlpvggwarhabt9b5z77otlq439ewikvqa',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: '4jrp85mfh96arfjyk7pt',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 17:34:44',
                executionMonitoringStartAt: '2020-08-03 17:20:55',
                executionMonitoringEndAt: '2020-08-04 09:18:28',
                cancelled: 1968532707,
                completed: 3877703356,
                error: 5950085160,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'gdup2pwvcomphjcefolrk1uc39dmezoqbn1sed01lzfuszu0d8',
                systemId: 'e7f5in656gajybs7vjubfsniyxxbjhyenw3c2',
                systemName: '5a3738a2e1lx1mti9m09',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 08:43:47',
                executionMonitoringStartAt: '2020-08-03 18:35:54',
                executionMonitoringEndAt: '2020-08-04 01:55:54',
                cancelled: 3950129316,
                completed: 4118728646,
                error: 4336735965,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: '3ckjfj9108vy3auam4hx3tbfa0xudhzi4okemrphqth4lmlh8i',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: '04hoszrsobrpakhq32i0',
                executionId: 'ekjxbfq1h0s7ja7rylrludtphwcsbag5xnw11',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 04:53:42',
                executionMonitoringStartAt: '2020-08-03 17:59:11',
                executionMonitoringEndAt: '2020-08-03 17:43:07',
                cancelled: 5776831267,
                completed: 8595700199,
                error: 8120118647,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'ucr0trxjze168t60vskghhe3fgqtgs5smmfzhwbl5a0efwdi268',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'u0txjuefmcgi0d1t30cj',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 22:09:51',
                executionMonitoringStartAt: '2020-08-04 12:54:38',
                executionMonitoringEndAt: '2020-08-04 00:43:02',
                cancelled: 2918872956,
                completed: 9281186075,
                error: 5389295212,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'h0ozgrrt0egd8ij8ipgn2qtgmgqnixs7hlad17qd2jz8pznnj5',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'wzmzhqbols144k3n2fwv8',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 09:58:25',
                executionMonitoringStartAt: '2020-08-04 10:34:34',
                executionMonitoringEndAt: '2020-08-04 02:07:21',
                cancelled: 5260622878,
                completed: 7787261201,
                error: 8190270078,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'd6oxcvl4szkhm7qhrxcvm9vxfc1fgbm1su1i4zm1qnglwwllqz',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'n8yq69uxczvo9du8kwvh',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:56:43',
                executionMonitoringStartAt: '2020-08-03 22:56:04',
                executionMonitoringEndAt: '2020-08-04 14:20:12',
                cancelled: 18089536494,
                completed: 4742807374,
                error: 9633163429,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: '5ignbmi28gym5rm2l59dmjp1fcsd5h0ne4cjaez57mwpwro6rh',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'zf4dcin4gteqs6tl5j6y',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 21:40:49',
                executionMonitoringStartAt: '2020-08-04 11:26:50',
                executionMonitoringEndAt: '2020-08-03 20:31:13',
                cancelled: 4854623337,
                completed: 26452055257,
                error: 9968642547,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'dqt4w1m101wtrhabagzrdoxuoj529uc9y7ps6lq4ekndo7nhwd',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'auiib8jh5bdp4p1rtvhh',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 06:45:10',
                executionMonitoringStartAt: '2020-08-03 22:54:20',
                executionMonitoringEndAt: '2020-08-03 15:49:05',
                cancelled: 5967996268,
                completed: 4530944575,
                error: 42662575710,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'myox7j3kixqokrivbf6cc7ajvstjjrv2to7w0x7ink3vwmvjmz',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 't90r5fthe0cphwydlofl',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 18:38:57',
                executionMonitoringStartAt: '2020-08-04 13:22:50',
                executionMonitoringEndAt: '2020-08-04 09:48:37',
                cancelled: -9,
                completed: 3409132841,
                error: 4495919857,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: '552jzv13foj1m7qvttjdvml15c4zlddafw8jehh3vyvk9lptp2',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'o0kio1un694y99cyfwet',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:38:27',
                executionMonitoringStartAt: '2020-08-03 21:13:14',
                executionMonitoringEndAt: '2020-08-04 05:04:23',
                cancelled: 9311345205,
                completed: -9,
                error: 3605006609,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'ustjixrklxogtf3lkfn0w9twxm1bm94ts2ummtocwd1nzd0f87',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: '74tu7bs3rjpl4jxlbbzi',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 17:24:22',
                executionMonitoringStartAt: '2020-08-03 19:33:04',
                executionMonitoringEndAt: '2020-08-03 19:13:08',
                cancelled: 7763261351,
                completed: 9747736629,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'm9tv3akx07szgc4vjj2us60ddydentxnrmj85h2p3e1nbme0so',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'yudw4yd8ifqhotku7uwi',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-03 19:21:14',
                executionMonitoringStartAt: '2020-08-03 16:57:33',
                executionMonitoringEndAt: '2020-08-04 04:17:29',
                cancelled: 7971936698,
                completed: 8359386018,
                error: 8229008041,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'gqpatxe4kmtons7kloz5nbvxfjvjck7mtcgojdttv2pq3i52wb',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'uwydbl7xm83lpveqguur',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-03 17:08:05',
                executionMonitoringEndAt: '2020-08-04 02:52:52',
                cancelled: 5528740288,
                completed: 1190896242,
                error: 5209941566,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: '5fk9ys57ckhpt24bu5kpgdepqzfeszb8jfijkih69err5agbik',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'jxchjgw53sf28gjgq04b',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 20:03:07',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-04 01:16:36',
                cancelled: 6882128767,
                completed: 1662792741,
                error: 6483376340,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'v6qm3klo3r30jmbhol13k6fh18rdd7ue09yur5yvqc60f06xx2',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'mz8qg7890yuk318ssjic',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 14:04:25',
                executionMonitoringStartAt: '2020-08-04 09:38:41',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 4036908522,
                completed: 4380576278,
                error: 6645012057,
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
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'zm1lc2u9bb6ph2eqaj5038vk1m00fln3nk3r7x7ulzdcwfdf6p',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'flc1l14qtaxgwud2eovu',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 19:25:12',
                executionMonitoringStartAt: '2020-08-04 10:30:13',
                executionMonitoringEndAt: '2020-08-04 02:36:12',
                cancelled: 3201978033,
                completed: 5808940379,
                error: 4909904198,
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
                        value   : '60b5b41a-6aca-4fc5-a19e-022dd541c19f'
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
                        value   : 'b585d1e4-eb5e-4076-b982-70ecc5227411'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b585d1e4-eb5e-4076-b982-70ecc5227411'));
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/f09b7ab2-143b-4094-8162-12ba303e52aa')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/b585d1e4-eb5e-4076-b982-70ecc5227411')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b585d1e4-eb5e-4076-b982-70ecc5227411'));
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
                
                id: 'c0228670-4adc-44a3-990b-404f26998a1d',
                tenantId: '42670f7d-bb40-4d5b-b15f-7115ef87ea74',
                tenantCode: '2eocuurdzg4cwq33xxa2e3v5fokht3a4ljznhrbs505a76tohr',
                systemId: 'bb142838-3b85-404f-b9c2-063f13a3deab',
                systemName: 'jm5be18389pzo3e6wdht',
                executionId: 'a94f55a9-5f27-481c-b6af-2913ad0597eb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:01:18',
                executionMonitoringStartAt: '2020-08-04 08:04:50',
                executionMonitoringEndAt: '2020-08-04 01:22:12',
                cancelled: 3081817900,
                completed: 1970075441,
                error: 2741053057,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                tenantCode: 'em9xzvnpa5jjn6y2dy9tcvip3lksthvlcsl8bbm4brmd1sxio1',
                systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                systemName: 'vikfp07v3x1h03w6sceh',
                executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 12:20:40',
                executionMonitoringStartAt: '2020-08-03 20:30:13',
                executionMonitoringEndAt: '2020-08-04 01:58:09',
                cancelled: 4036889171,
                completed: 6098912826,
                error: 3961947938,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b585d1e4-eb5e-4076-b982-70ecc5227411'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/2964d11a-f7d9-4e4b-bfb6-f51f7db2e825')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/b585d1e4-eb5e-4076-b982-70ecc5227411')
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
                        id: '5d63f123-6720-4ad3-b2fa-302507b62ef4',
                        tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                        tenantCode: '9mlk363wixxz12xdgrh3rgc5p6ks5k68ve5ee31qowz7ko9tkx',
                        systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                        systemName: 'ymbiege9t54d9c9ugddu',
                        executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-03 15:08:08',
                        executionMonitoringStartAt: '2020-08-03 22:13:07',
                        executionMonitoringEndAt: '2020-08-04 08:30:44',
                        cancelled: 5402813065,
                        completed: 9792816238,
                        error: 8944825841,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '5d63f123-6720-4ad3-b2fa-302507b62ef4');
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
                            value   : '3f3536e8-984e-474a-ba04-0440329dd170'
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
                            value   : 'b585d1e4-eb5e-4076-b982-70ecc5227411'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('b585d1e4-eb5e-4076-b982-70ecc5227411');
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
                    id: 'b65fa489-3e2e-4b41-be56-a476238d230b'
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
                    id: 'b585d1e4-eb5e-4076-b982-70ecc5227411'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('b585d1e4-eb5e-4076-b982-70ecc5227411');
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
                        
                        id: '3d2fbbcd-0c6a-4f24-a182-6644e70edf26',
                        tenantId: '5b31f3fc-eeea-4d75-b342-08d84ea730af',
                        tenantCode: 'b1brpv20jvhs9zuzyw66fhz5w0jiij9eyqsg52lrjybrhhigpk',
                        systemId: '49d1da83-ec9d-4e29-8d03-9cd43907531a',
                        systemName: 'ccfmid6m9jb7woa2q5g8',
                        executionId: '70b8298b-a366-4315-9986-035db2dfb56b',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 14:33:52',
                        executionMonitoringStartAt: '2020-08-03 18:28:53',
                        executionMonitoringEndAt: '2020-08-04 10:35:16',
                        cancelled: 6185394167,
                        completed: 7180216731,
                        error: 4026900142,
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
                        
                        id: 'b585d1e4-eb5e-4076-b982-70ecc5227411',
                        tenantId: '002908f2-11ac-4181-b637-d865c26f17f9',
                        tenantCode: 'yahgsagoq2jrs1wiklnnuq0mzfzn1uuu8dvuyhoaia57mahb8s',
                        systemId: 'a895ac45-eec7-40da-98cb-59cb967f94b8',
                        systemName: 'wug47y6ny4sefkohbfyu',
                        executionId: 'e636d3f9-d962-4d03-941c-d00f058313ec',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-03 14:51:51',
                        executionMonitoringStartAt: '2020-08-03 16:23:28',
                        executionMonitoringEndAt: '2020-08-04 09:27:33',
                        cancelled: 8116943905,
                        completed: 8550534374,
                        error: 8254478265,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('b585d1e4-eb5e-4076-b982-70ecc5227411');
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
                    id: '4759fd93-273e-4328-a9eb-7a6ae750dd4e'
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
                    id: 'b585d1e4-eb5e-4076-b982-70ecc5227411'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('b585d1e4-eb5e-4076-b982-70ecc5227411');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});