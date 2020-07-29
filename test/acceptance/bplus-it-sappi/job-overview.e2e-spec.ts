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
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'yzfv6v51i0ij8wkb0xzpc469w1naxp9ivekil9pytn2i7kda6n',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'a6w3utq45vcy8a2dbvny',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:35:25',
                executionMonitoringStartAt: '2020-07-28 13:40:20',
                executionMonitoringEndAt: '2020-07-28 15:32:59',
                cancelled: 7093051863,
                completed: 4945212182,
                error: 2876028080,
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
                
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: '73v0v7699y4oz109mp1omgvvbme34pkuzoot25yas68z84pou1',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'xzkzftp6wy6gmi9kj5fw',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 13:51:02',
                executionMonitoringStartAt: '2020-07-28 17:02:28',
                executionMonitoringEndAt: '2020-07-28 23:04:32',
                cancelled: 4255646848,
                completed: 6099976781,
                error: 6180537978,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: null,
                tenantCode: '0d942vue1upjnd7jwg0xvhib67x5720li3lbr74ha8ylwv442m',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'm8zb9e82a54u9fn6y3ej',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:33:24',
                executionMonitoringStartAt: '2020-07-28 15:55:30',
                executionMonitoringEndAt: '2020-07-28 22:43:19',
                cancelled: 1508848835,
                completed: 5787247397,
                error: 3123308246,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                
                tenantCode: '72sbjf6204yz1785g9174eripoykvcdc5l4tkh4epz9jtjhldb',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'zsd5cod8r6xnzae5682f',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:04:33',
                executionMonitoringStartAt: '2020-07-29 07:37:58',
                executionMonitoringEndAt: '2020-07-29 00:44:42',
                cancelled: 8332018190,
                completed: 9421571230,
                error: 3987743115,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: null,
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'rbg5tr1jwvst294lo5k7',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:22:37',
                executionMonitoringStartAt: '2020-07-28 15:05:28',
                executionMonitoringEndAt: '2020-07-29 05:20:12',
                cancelled: 1373918032,
                completed: 2982471812,
                error: 7303982443,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'hakgvtx8s2g9h2ifag65',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:13:07',
                executionMonitoringStartAt: '2020-07-28 22:48:32',
                executionMonitoringEndAt: '2020-07-28 17:25:41',
                cancelled: 3253864153,
                completed: 6628616563,
                error: 1353810099,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'fri1ux8wfbrq9elywbfeuindv840j3nnt0jufqs4owpjhuf3w2',
                systemId: null,
                systemName: '2i27s7ska05t75aufmil',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:23:45',
                executionMonitoringStartAt: '2020-07-29 05:16:32',
                executionMonitoringEndAt: '2020-07-28 22:11:11',
                cancelled: 7321784602,
                completed: 5589767080,
                error: 7198835556,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'r7q8r1xy98h6wlpxnfkwsanlanvqk7d5zafgu67uvgmizhfazs',
                
                systemName: 'dsbz557yfiosmv9onfcr',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:31:08',
                executionMonitoringStartAt: '2020-07-29 01:26:09',
                executionMonitoringEndAt: '2020-07-29 06:32:41',
                cancelled: 3815991145,
                completed: 5400881065,
                error: 3626972036,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'flzgcdmdo5u7de5xa2bm2wqlvevxifgi1wy86kzqz43mwhubql',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: null,
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:13:20',
                executionMonitoringStartAt: '2020-07-29 04:02:46',
                executionMonitoringEndAt: '2020-07-28 23:12:32',
                cancelled: 1842035964,
                completed: 4728268467,
                error: 4328824310,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'be0tfhnwl2jvl7bbc2z7d8v4p847lwwv0dzu0ieebr2zcqbgiy',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:40:59',
                executionMonitoringStartAt: '2020-07-29 05:30:45',
                executionMonitoringEndAt: '2020-07-28 17:01:21',
                cancelled: 6347016498,
                completed: 2177565172,
                error: 3001310414,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: '6mvu0wticr1tfvoo340xurwydeowfuw6l6somcmkucs7c7p9lw',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: '0ipdrpsvipia2o44ugwz',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:31:39',
                executionMonitoringStartAt: '2020-07-29 03:39:36',
                executionMonitoringEndAt: '2020-07-28 21:07:36',
                cancelled: 3908986674,
                completed: 6391181075,
                error: 1539374818,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'o0n28lg0v9893528kc2t6xhj7zqyqc9fjbbgay2kaugcahwuvl',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: '884zb0r827c1oqxmhjpk',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:36:18',
                executionMonitoringStartAt: '2020-07-28 21:38:58',
                executionMonitoringEndAt: '2020-07-28 23:11:12',
                cancelled: 7554098739,
                completed: 7783039623,
                error: 7738367549,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'ib6hg61jml5kvha9y27lbqlvxxj11vbh0xcwdaybw1veteypb8',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'rfp3u0absx0x4grprbxd',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: null,
                executionExecutedAt: '2020-07-28 20:25:57',
                executionMonitoringStartAt: '2020-07-29 07:21:38',
                executionMonitoringEndAt: '2020-07-29 02:35:07',
                cancelled: 8113585992,
                completed: 2400270091,
                error: 2965612730,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'rjm8fauptm3ohfv0ga97ku5ryoiv4wjii19qdpd5gntcv3chz6',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: '1jabbp9xyamvdpi4822l',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                
                executionExecutedAt: '2020-07-29 01:33:32',
                executionMonitoringStartAt: '2020-07-29 03:20:33',
                executionMonitoringEndAt: '2020-07-28 17:19:28',
                cancelled: 5986745423,
                completed: 3596232363,
                error: 7334928625,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'u3y8db6bjhg3u99afq5qiepeb19f2iamqzau5us9x8nae922lf',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'ah2zr6iabfscof8fuobi',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 02:10:59',
                executionMonitoringEndAt: '2020-07-29 01:42:40',
                cancelled: 9406606115,
                completed: 1242491616,
                error: 4343930057,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'peb90yhma2eub33ddl357ofyly3q9hl1bn5arodcbmzatk5gg7',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'r0ydfg8am7k7beio99bn',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-28 20:12:30',
                executionMonitoringEndAt: '2020-07-28 18:32:27',
                cancelled: 4087615367,
                completed: 4937837211,
                error: 6092536143,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: '50o2nqm1w49tbdu2bwud219kuj3gl2tk48shgtqc49hp7r2unw',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'yyxs4xhztd5p33cs38ig',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:29:30',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 16:50:21',
                cancelled: 9601109499,
                completed: 3883126430,
                error: 8134293414,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'otf6xfc9dm25gid1qh6mo0jd3p5fcmaaxoncpkxseiiibyvtav',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'l1m4lifx7lgn8y23xl2a',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:01:35',
                
                executionMonitoringEndAt: '2020-07-28 14:22:29',
                cancelled: 6207242703,
                completed: 5057996656,
                error: 5498101635,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'l3lzdsiprkos7nan9tsyp57215epqw3hpk5km37l4bzlpt04z3',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'za1iragb1d1t7d47zgql',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:20:24',
                executionMonitoringStartAt: '2020-07-28 14:58:07',
                executionMonitoringEndAt: null,
                cancelled: 1735852264,
                completed: 7475599005,
                error: 5705539994,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'sj02857v77ns4o10gey54xlrxgdqhr4ds8heibeu8rbkca1v48',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'eyzfra6q58njgf3nl89x',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 13:56:15',
                executionMonitoringStartAt: '2020-07-28 15:33:53',
                
                cancelled: 6187184784,
                completed: 8419064480,
                error: 2076786078,
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
                id: 'rilvedxmkujuke15axeyrl18954atg34yy1c0',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'of25ihvxhgip6d0gf6ky0g67c0d3o193t6y18whzi8laerrmbe',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: '76y52afaa0xbhv52lz15',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 15:35:13',
                executionMonitoringStartAt: '2020-07-28 14:18:50',
                executionMonitoringEndAt: '2020-07-28 20:12:13',
                cancelled: 7524893574,
                completed: 3818275185,
                error: 7863415777,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'm1vlmqyyn6v5ghvxsprtyfu55k4r1aqfzc8me',
                tenantCode: 'emv3y50yvjdxtg8zod28ba28i250evu50kjgp2tqd3mjon9wd5',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'yautlmbzk9e8s0tkdesb',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 14:49:28',
                executionMonitoringStartAt: '2020-07-28 22:13:17',
                executionMonitoringEndAt: '2020-07-29 04:05:59',
                cancelled: 1866369737,
                completed: 8635763537,
                error: 5682477404,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'iatowtlubuowmwl9zxbhglmyxoahaca65uubporie99hgpnlpu',
                systemId: '0znuhsguud6fbogx6jyv94f9wbezpvrozfxu3',
                systemName: 'ptuhet1qur7x1ap8g79i',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:36:16',
                executionMonitoringStartAt: '2020-07-29 01:24:12',
                executionMonitoringEndAt: '2020-07-29 09:11:54',
                cancelled: 4836925256,
                completed: 9896658255,
                error: 3932445986,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'sjd4kg365gjet49c1bsry4nyag8kl7yxrmy289inw82c0u1myp',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: '3g968d4f3wrihhvx3l7j',
                executionId: '1f8vyluq254tpb3wkryghu3fs0w96xmbk8k8j',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 14:39:18',
                executionMonitoringStartAt: '2020-07-28 16:13:44',
                executionMonitoringEndAt: '2020-07-28 22:48:34',
                cancelled: 1063406830,
                completed: 1566923977,
                error: 9023393707,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'ruoce04ovgpzk6i1ot2t7j10mwrhibkpooz8gysfg0qo7cnbf7r',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: '4wqu4ikrotwig83zwa61',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:25:55',
                executionMonitoringStartAt: '2020-07-29 07:22:37',
                executionMonitoringEndAt: '2020-07-28 21:07:23',
                cancelled: 3731776577,
                completed: 5051319177,
                error: 4649621026,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: '4pzn0wrfklr7hcs3aai5afi3c4zokmn7xsttgeqcl1hww0sxx7',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: '3kq3hiu504yn7xd3h2lke',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:26:56',
                executionMonitoringStartAt: '2020-07-29 03:31:09',
                executionMonitoringEndAt: '2020-07-29 01:46:01',
                cancelled: 8519901333,
                completed: 3010898603,
                error: 7673222642,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'yoydugg9x5c07yl1o5crovj9psb5zb00a6rbyc9u083d7mb8c1',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 's6ar48vs6qg2ffghx9e7',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:19:23',
                executionMonitoringStartAt: '2020-07-29 11:14:04',
                executionMonitoringEndAt: '2020-07-29 08:14:38',
                cancelled: 93469640782,
                completed: 2509833844,
                error: 6187301392,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: '5g7ol5k7c9rybnwvsnaxqob9recfsw1mclng25xtep3lmnt0b8',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: '5ayoqjyn3i3ick4cg41v',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:30:40',
                executionMonitoringStartAt: '2020-07-29 13:07:48',
                executionMonitoringEndAt: '2020-07-28 21:54:19',
                cancelled: 9556552833,
                completed: 43737754902,
                error: 1129849691,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: '8feseyrbtqfm4qv0vb4cczt7hgiwbk4uuzp3lkf043gw01navq',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'p0q272jdar10vzhqpaov',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:02:26',
                executionMonitoringStartAt: '2020-07-29 06:24:33',
                executionMonitoringEndAt: '2020-07-29 08:16:59',
                cancelled: 5958147906,
                completed: 6701265129,
                error: 29089969270,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'cqkam596niqqd30vcn5e7h5zejl08ihefu858gxy9o5fkkmiqo',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'wtig2ad2vrml50gra54y',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:08:13',
                executionMonitoringStartAt: '2020-07-29 07:58:15',
                executionMonitoringEndAt: '2020-07-29 04:25:22',
                cancelled: -9,
                completed: 4714620862,
                error: 6288868901,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'tye441aft9d4vmyr6huk8j3foavn8gelk1cj9eat99qhmwwidj',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: '437gqg76ldr5x7purqg1',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:16:24',
                executionMonitoringStartAt: '2020-07-29 00:43:40',
                executionMonitoringEndAt: '2020-07-28 18:46:34',
                cancelled: 6622080991,
                completed: -9,
                error: 3326129861,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'bne3rfj2fvoz1flap9dy0sjeduzwgi9vfrmc7zbdyui28kkxrl',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'uu5zahxas8d1t8fia6nv',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:18:05',
                executionMonitoringStartAt: '2020-07-28 13:54:17',
                executionMonitoringEndAt: '2020-07-29 03:41:14',
                cancelled: 4379183150,
                completed: 1749384214,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'axzdhzx159lfhl5ogubzuif1r4suol6kctfhh5w8lpb8wi544d',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'f4i2dw5xd6g81zzymz8x',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 12:39:25',
                executionMonitoringStartAt: '2020-07-29 13:11:47',
                executionMonitoringEndAt: '2020-07-29 04:10:18',
                cancelled: 1515180987,
                completed: 4333952835,
                error: 6711579502,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: '6sohhk1hew2uyda7119wimjdvtu3n8ild8t10rie52uvmsye0o',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: '6q2a5i1z9wmv8enyintq',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 10:09:41',
                executionMonitoringEndAt: '2020-07-28 19:46:03',
                cancelled: 9910141524,
                completed: 8649038911,
                error: 4352749985,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'i1v3kb59bic1ylnrkqaxl0qtg99vxd1zjmgepsfnttlzfwuva0',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'on77n4ceny7picjvy6tk',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:35:27',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 05:01:03',
                cancelled: 4676512834,
                completed: 3856733516,
                error: 4255753703,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: '7ewkypxa4zr3qz1mhj93oiu6ons5b7cjayheeewjbdsg6fsej8',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'kzhll2nzw1d5ror6pr0m',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:02:00',
                executionMonitoringStartAt: '2020-07-29 01:37:04',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 9021115752,
                completed: 9926192365,
                error: 6523751458,
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
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: '1ln1n2i4n8vhrl1gr9g5ieucwhdpxojrtwhdu1xf9bv31d2ij5',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: '3uv8l2rf58egvtswuz20',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:38:46',
                executionMonitoringStartAt: '2020-07-28 18:09:51',
                executionMonitoringEndAt: '2020-07-29 05:04:11',
                cancelled: 1388062528,
                completed: 1531725327,
                error: 9893241614,
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
                        value   : 'f10da394-5dc6-4033-b7aa-f7f7c905f730'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f10da394-5dc6-4033-b7aa-f7f7c905f730'));
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
            .get('/bplus-it-sappi/job-overview/f10da394-5dc6-4033-b7aa-f7f7c905f730')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f10da394-5dc6-4033-b7aa-f7f7c905f730'));
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
                
                id: 'c866e942-30b1-4ac6-b24f-d644518b270c',
                tenantId: 'ad1920ce-faba-4dad-8ed7-73e27ddc8cc2',
                tenantCode: 'fxastos856opjjdcjwtcjh1ttn9rg1io4j2weeix42vxsjooky',
                systemId: 'cb0cbf0d-c2c7-4269-9877-f42d1da33db9',
                systemName: 'q8vn89bdxkj0msdr6y2i',
                executionId: 'd70fd803-1b7c-4f7f-9bfb-ed45f83ad346',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:17:46',
                executionMonitoringStartAt: '2020-07-28 18:35:47',
                executionMonitoringEndAt: '2020-07-29 04:01:00',
                cancelled: 2316182812,
                completed: 7265061811,
                error: 4009735447,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                tenantCode: 'h4trgut5adv8vni9cvb3d8gfi3osmfsb5lcech9lnpccvaa43t',
                systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                systemName: 'xa8pasdtnsa67e6qknlh',
                executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:37:27',
                executionMonitoringStartAt: '2020-07-29 10:12:27',
                executionMonitoringEndAt: '2020-07-29 11:20:08',
                cancelled: 6577243080,
                completed: 3634214706,
                error: 9138015484,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f10da394-5dc6-4033-b7aa-f7f7c905f730'));
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
            .delete('/bplus-it-sappi/job-overview/f10da394-5dc6-4033-b7aa-f7f7c905f730')
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
                        id: 'd69d6a61-04e9-4747-b31c-b6dcb93d6a08',
                        tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                        tenantCode: 'vsv1bnzlsjdzlwfu8v27twndn9pd8ff9tye68qrwwzgtnniv9m',
                        systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                        systemName: '5sgvw0zxn5qwl329z6b7',
                        executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 03:35:36',
                        executionMonitoringStartAt: '2020-07-28 22:29:51',
                        executionMonitoringEndAt: '2020-07-28 19:25:10',
                        cancelled: 9982770120,
                        completed: 7752113188,
                        error: 1539484705,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', 'd69d6a61-04e9-4747-b31c-b6dcb93d6a08');
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
                            value   : 'f10da394-5dc6-4033-b7aa-f7f7c905f730'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('f10da394-5dc6-4033-b7aa-f7f7c905f730');
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
                    id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('f10da394-5dc6-4033-b7aa-f7f7c905f730');
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
                        
                        id: 'a69f6107-3ac3-4256-9420-6b314387e57b',
                        tenantId: 'c0a753ba-9f64-4f09-9d0a-25b509660ca1',
                        tenantCode: 'lvxuwn6bhq6nbqlmml806s4xtj2f1k95efmqb65pdwkjrjmfe4',
                        systemId: '20c0f015-9267-4b8a-a43c-dd50630a40b1',
                        systemName: '8deo2lf9o8o40cetcd9f',
                        executionId: '98a16263-4a6b-49fa-959a-727200f24f26',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 01:49:46',
                        executionMonitoringStartAt: '2020-07-29 00:48:50',
                        executionMonitoringEndAt: '2020-07-29 04:43:04',
                        cancelled: 6557470348,
                        completed: 1626785790,
                        error: 7091843988,
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
                        
                        id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730',
                        tenantId: 'bfb77c60-9906-405a-b017-84840c73d5de',
                        tenantCode: 'aalozyd0vleq3g7dbxj6ken0qhw7xvumotaly8b7xb848dy364',
                        systemId: '8858329c-3bb8-4f96-b217-ff723991efa4',
                        systemName: '4mc9q23wj00f0e2zmy2j',
                        executionId: '67785f87-cc14-42c3-8ab2-ed2d6f676f1e',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 10:25:31',
                        executionMonitoringStartAt: '2020-07-28 19:10:10',
                        executionMonitoringEndAt: '2020-07-29 06:45:58',
                        cancelled: 5029724948,
                        completed: 3456030055,
                        error: 1693053996,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('f10da394-5dc6-4033-b7aa-f7f7c905f730');
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
                    id: 'f10da394-5dc6-4033-b7aa-f7f7c905f730'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('f10da394-5dc6-4033-b7aa-f7f7c905f730');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});