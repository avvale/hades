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
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'wo35yrzvu9darvzgqq8m69elots2duh0lxfxcc9o3268az6s2l',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'k1y7cvn831b9omykxphx',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:38:39',
                executionMonitoringStartAt: '2020-07-29 06:36:02',
                executionMonitoringEndAt: '2020-07-29 22:56:56',
                cancelled: 4564244609,
                completed: 3351406478,
                error: 2043752914,
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
                
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'vdq9kkxim1pm2l4ctk0moikm6w23r8ftw6d2e3zkjm4vhvo1b7',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'goorgn1mtkf4g1i2tfj3',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:07:22',
                executionMonitoringStartAt: '2020-07-29 11:27:09',
                executionMonitoringEndAt: '2020-07-29 03:11:02',
                cancelled: 9218235551,
                completed: 9873614651,
                error: 3621474545,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: null,
                tenantCode: '4upsswqh0yl2lq2al5di2kwyyp7m51uu8s8n6vs5omx6sbspec',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'm84wrwokwihm1gtlotb2',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:34:05',
                executionMonitoringStartAt: '2020-07-29 14:35:01',
                executionMonitoringEndAt: '2020-07-29 13:20:15',
                cancelled: 9267057265,
                completed: 5623286355,
                error: 8971791847,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                
                tenantCode: '04lca7g8z0c1mukml5yyh1mv1s1zmvh5tikpgbth2i0sfpwjg8',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'ab4yyvw1em70ki0nfyk8',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:04:49',
                executionMonitoringStartAt: '2020-07-29 12:47:03',
                executionMonitoringEndAt: '2020-07-29 10:01:41',
                cancelled: 1759868447,
                completed: 5698602630,
                error: 2022872801,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: null,
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: '6woyxehzvcmdft8o7m1p',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:44:30',
                executionMonitoringStartAt: '2020-07-29 21:25:04',
                executionMonitoringEndAt: '2020-07-29 04:28:15',
                cancelled: 9463016388,
                completed: 6347685498,
                error: 5428761690,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'nmtp7yf3aj18zqgmzyom',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:38:22',
                executionMonitoringStartAt: '2020-07-29 17:07:54',
                executionMonitoringEndAt: '2020-07-29 15:17:46',
                cancelled: 5995755278,
                completed: 1862708238,
                error: 1550160334,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'vdraz10jrgmmscamiksqmme6a6ybrfhhevhf52uhnxhg4ce6rq',
                systemId: null,
                systemName: '0fy84isx6hsvl2mfb8zl',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:07:33',
                executionMonitoringStartAt: '2020-07-29 10:27:34',
                executionMonitoringEndAt: '2020-07-29 03:06:44',
                cancelled: 4203529043,
                completed: 3886729628,
                error: 5707664722,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'dysgbzf6kyl3i33ilqh447q9onrj89cky9uk3xidxhz4jqkxei',
                
                systemName: 'ofabyteolufhv6xg26w5',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:51:53',
                executionMonitoringStartAt: '2020-07-30 00:23:27',
                executionMonitoringEndAt: '2020-07-29 14:18:22',
                cancelled: 1672960675,
                completed: 2732684249,
                error: 2112870236,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'yfsrdkq7zux6ppd223835ykydm57g5wh9zrjgpmcotkn3okono',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: null,
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:43:54',
                executionMonitoringStartAt: '2020-07-29 20:19:39',
                executionMonitoringEndAt: '2020-07-29 11:24:33',
                cancelled: 5289520527,
                completed: 3407785543,
                error: 1205596935,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: '5kcbi29ak2uhx3xwc4gm5b3o72jcfbfj24kpjzjavbgbdjponc',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:50:23',
                executionMonitoringStartAt: '2020-07-29 16:03:39',
                executionMonitoringEndAt: '2020-07-29 18:12:34',
                cancelled: 7087713890,
                completed: 5134994644,
                error: 6935715073,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: '2rd2ejtwlck74huormjl0f6j0o1pz7elrkh79f7lndrb4jp5ds',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: '7iv6wj0t1pnesolm2fi3',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:59:12',
                executionMonitoringStartAt: '2020-07-29 09:46:08',
                executionMonitoringEndAt: '2020-07-29 17:56:16',
                cancelled: 8797226297,
                completed: 7286020264,
                error: 2811080485,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'seutwxq4vtbpky2t94w657r57ks1b4g9jkkujerst9xc8jzyug',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: '1zss0pxw8z1nozd28qnv',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:37:55',
                executionMonitoringStartAt: '2020-07-29 12:36:14',
                executionMonitoringEndAt: '2020-07-29 09:24:50',
                cancelled: 6902725900,
                completed: 5299714884,
                error: 9447244121,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'd5kdfntk7otc10ce1rb2hvv5nwibs71t2x70go6des3ihxd26b',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'djn4n03bt4fdt5avkob6',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: null,
                executionExecutedAt: '2020-07-29 17:30:41',
                executionMonitoringStartAt: '2020-07-29 09:40:22',
                executionMonitoringEndAt: '2020-07-29 16:13:53',
                cancelled: 6535355308,
                completed: 1912025583,
                error: 4629934192,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'zjayc0lkplr09e05llakorglikrsd4ccrjr4y52gzvh5yl7f9r',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: '36tyiu14tc19ws8r6rkj',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                
                executionExecutedAt: '2020-07-29 08:50:05',
                executionMonitoringStartAt: '2020-07-29 19:19:35',
                executionMonitoringEndAt: '2020-07-29 07:17:57',
                cancelled: 9198412814,
                completed: 3342047834,
                error: 8219643428,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'dp535d85e2g82lwbg9ftm2fck3purc0fun9cgaojrk7x453mw1',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'v17o91a8cd1j68t92tz5',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 11:14:41',
                executionMonitoringEndAt: '2020-07-29 11:31:20',
                cancelled: 4901154778,
                completed: 8722113954,
                error: 6878330427,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'rg7mjsxe71y3ecmvr13qbktzo662fy2gg7ffv2ch24byiu92k4',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'grytxfavlya99z7e7k8d',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 08:43:24',
                executionMonitoringEndAt: '2020-07-30 00:14:10',
                cancelled: 6456505340,
                completed: 9183907570,
                error: 6541505978,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'yz9rzac04tjil2leggbaoietdixqemephekze8j993iakbh7t8',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: '3flahokfaajjtwd7zdiz',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:30:23',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 21:26:16',
                cancelled: 8097029113,
                completed: 7968760319,
                error: 9188056602,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: '5b4trwkkadhxjw5bsxsk2jwqct1mv308hb7dnvnfii7yceiejc',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'kw4zjx3nmosfr9fv55fe',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 21:58:54',
                
                executionMonitoringEndAt: '2020-07-29 11:34:54',
                cancelled: 6730816250,
                completed: 9344238071,
                error: 9654860554,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'jsh5xx7bf1kszcaffuyvgor4oddbkayyyqjkmu3174z22xyek3',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'pwd17f43nhl6b6vqanlw',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:50:46',
                executionMonitoringStartAt: '2020-07-29 11:27:32',
                executionMonitoringEndAt: null,
                cancelled: 2951451588,
                completed: 4606916130,
                error: 4776150352,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'u05hu11glfx0h54d6jw5j3r4gnjbjs14apuu18m715g4rklq6r',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'loegaxe7jtgv2mzfmm50',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 00:43:17',
                executionMonitoringStartAt: '2020-07-29 06:58:29',
                
                cancelled: 7523643876,
                completed: 3249600871,
                error: 9768074210,
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
                id: '63jfg5vn1y836q908ollkr3cmhnx4sd9k67m7',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'rm1ih0xl69xkl6gv7nhn8tcvad02ufslr9ishgrypy5htazypi',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'kajpw8usiai24su7e3bk',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:32:18',
                executionMonitoringStartAt: '2020-07-29 23:54:41',
                executionMonitoringEndAt: '2020-07-29 16:03:49',
                cancelled: 2279135973,
                completed: 5313085113,
                error: 6037855668,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'ukzmdicpwrljy2v1sqj193bkypsdex031ed2k',
                tenantCode: '4hcm31ftvcdupzmbicrqwy9qjpmy5e4nfa03qshje1obfv0y6m',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'qg0jrr1svxtzblo398fc',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 23:01:11',
                executionMonitoringStartAt: '2020-07-29 15:22:30',
                executionMonitoringEndAt: '2020-07-30 00:02:15',
                cancelled: 3840754205,
                completed: 9482709601,
                error: 3456187728,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: '3eht97m1i4j6xro585scbd37xr2bn53wg9fd8yzvmbk171l7fw',
                systemId: '0fk03ng3vq6q64e2yuacvfh0y356a7b4uhqt9',
                systemName: '13q8kq5bae3fy6bmu3tf',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:35:05',
                executionMonitoringStartAt: '2020-07-29 03:37:05',
                executionMonitoringEndAt: '2020-07-29 06:06:14',
                cancelled: 3300572717,
                completed: 7426323555,
                error: 6653849133,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: '7o7pf6hzpbyibk817slk78fo8z6n549eu339e70joa99p6s7to',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: '8kotnwi43o5zbj68hdgq',
                executionId: 'my5uox2xdn6enis5bhenyljh36zfd5cnvbffi',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:31:49',
                executionMonitoringStartAt: '2020-07-29 12:59:13',
                executionMonitoringEndAt: '2020-07-30 02:04:10',
                cancelled: 2479717024,
                completed: 4761569037,
                error: 2051019700,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'vkt8h6e69pc1x5txvywgq1ewb33t8b4lbe7vk0ub839g7o2wxnh',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'buhbc8jfrez1i71evetx',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 20:15:16',
                executionMonitoringStartAt: '2020-07-30 00:28:50',
                executionMonitoringEndAt: '2020-07-29 17:49:39',
                cancelled: 1956408702,
                completed: 1082540974,
                error: 8056578442,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'kop0yqcypm2gyv7vgxn6aku1gkiwg1ud1zhnrcuz6jen8y3vga',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: '9eub2qw3ngacgs1imahht',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 00:07:17',
                executionMonitoringStartAt: '2020-07-29 23:19:29',
                executionMonitoringEndAt: '2020-07-29 15:54:37',
                cancelled: 3011840067,
                completed: 6800802978,
                error: 5549631718,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'itk8ck9jlp0kpgke6vkks5a6f9nz37u3ulnea0m2lnps1zuug4',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: '74yndoao7tgv5s08zvjl',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:48:08',
                executionMonitoringStartAt: '2020-07-29 17:25:28',
                executionMonitoringEndAt: '2020-07-29 22:27:15',
                cancelled: 88310042462,
                completed: 7255976914,
                error: 6426848008,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'xjwhp00vbcf56d7smtbh6x6az7opgfcgdfllommke8tb6qj1kk',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'brrwchboqx16aeiir0ex',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:03:22',
                executionMonitoringStartAt: '2020-07-30 00:20:20',
                executionMonitoringEndAt: '2020-07-30 01:23:35',
                cancelled: 5152278082,
                completed: 85474339004,
                error: 3153698629,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'mrqu9gsdryqrkfublt8li0vky6u68d1drdkq1kc95tf2th56s3',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'zs4kjlwh2tz41wizf9hs',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:40:20',
                executionMonitoringStartAt: '2020-07-29 20:59:16',
                executionMonitoringEndAt: '2020-07-29 09:52:49',
                cancelled: 3488295339,
                completed: 2508924657,
                error: 91422183408,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'n8drit0h3kn2ajdqzv5irppuzykf1qfh97z3z9vzjeae1ggst6',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'i3uwltpmqtzk0bfqpisy',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 21:38:22',
                executionMonitoringStartAt: '2020-07-29 06:12:57',
                executionMonitoringEndAt: '2020-07-29 04:45:32',
                cancelled: -9,
                completed: 5535552496,
                error: 7194163153,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'rjnu5r7tuwqc8oqi8se5u4ozi2q71hluqn45rlkny7eub6xoq2',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'fiwp0xvniy4nha0jdpsz',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:02:12',
                executionMonitoringStartAt: '2020-07-29 02:35:18',
                executionMonitoringEndAt: '2020-07-29 03:08:06',
                cancelled: 4956826482,
                completed: -9,
                error: 3312248706,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: '0rxrjrg4wdcgru2a7t60hsjhfjj3bw03jsyl5tpi5dfnwsdj84',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'poy3ly5jg13urewp6sp8',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 01:39:30',
                executionMonitoringStartAt: '2020-07-29 09:03:16',
                executionMonitoringEndAt: '2020-07-29 13:30:19',
                cancelled: 2051822390,
                completed: 2033627599,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'pwaszetpc7yzreoup6abs7wpj5b2rlhokgjwl6yyin5150n1hx',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'r96qluwgna9su95m85s2',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 16:42:25',
                executionMonitoringStartAt: '2020-07-29 16:27:13',
                executionMonitoringEndAt: '2020-07-29 21:47:50',
                cancelled: 9257771520,
                completed: 3310231376,
                error: 9526093740,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'hjkjee9fj1qa13hpe0sk7qx5zab8ljncp31669kewh107rur21',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: '31erd6mvawv214p1or82',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 09:29:48',
                executionMonitoringEndAt: '2020-07-29 09:12:19',
                cancelled: 3563269982,
                completed: 2200660185,
                error: 5055751192,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'lmllmpi3sewyf6jv1ts05l201vjlpee9ch9k19e8x82racj5ct',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: '1rntb937gr3xcnz3bkmq',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:14:01',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 08:08:25',
                cancelled: 1591067188,
                completed: 4762948027,
                error: 4995036645,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'dzgs31gujobuzgqb0riilkv4y4vrg5jec91vmnqq9hqeqatudn',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'spd29bzfz8ni4txxbz8f',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:36:55',
                executionMonitoringStartAt: '2020-07-29 06:12:53',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 5758637544,
                completed: 1014351117,
                error: 6135665386,
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
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'b00ooeqzr0ba7hq8zqm23iwomuh1yqz60mk5lm1h6u578fgy70',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'tczo00n2wg9085l8qxq0',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 00:35:11',
                executionMonitoringStartAt: '2020-07-29 07:44:48',
                executionMonitoringEndAt: '2020-07-29 12:17:14',
                cancelled: 9072900995,
                completed: 8590401562,
                error: 3477083812,
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
                        value   : 'cc405dec-0a53-44c3-853d-2678907cebb5'
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
                        value   : '5b387a12-bcbf-41b1-820e-f695fc90c311'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5b387a12-bcbf-41b1-820e-f695fc90c311'));
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/fa0b10a9-e998-41f6-a6d1-076a84512e69')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/5b387a12-bcbf-41b1-820e-f695fc90c311')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5b387a12-bcbf-41b1-820e-f695fc90c311'));
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
                
                id: 'a5606cbd-96dc-4a20-9e9c-2b4783778ac5',
                tenantId: '202b5674-be3a-44f0-b716-276da3f5b592',
                tenantCode: 'uvolc0p8qipbo0q5l13tn56hbotlf8k3gxict15us8283yqsz4',
                systemId: '9f34ae16-22c8-4416-9b9c-f67b1a8e344b',
                systemName: 'nrnvnm458njnhss35nbo',
                executionId: 'fd8f805d-fe04-4700-bf6a-670b75ccbfbc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:26:45',
                executionMonitoringStartAt: '2020-07-29 14:27:18',
                executionMonitoringEndAt: '2020-07-29 14:41:14',
                cancelled: 9570909023,
                completed: 8218672282,
                error: 5804643917,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                tenantCode: 'ykamtpf5rdbjnen31mp0jhng96hhc4j55mgbyrbbdis5sgrfj1',
                systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                systemName: 'h4mq4lto48904s8klpci',
                executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 22:48:07',
                executionMonitoringStartAt: '2020-07-29 18:13:11',
                executionMonitoringEndAt: '2020-07-29 09:22:36',
                cancelled: 1548325086,
                completed: 5340279416,
                error: 8380510783,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5b387a12-bcbf-41b1-820e-f695fc90c311'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/691f01ce-19de-4b7f-a72d-1cd83a502517')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/5b387a12-bcbf-41b1-820e-f695fc90c311')
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
                        id: '6143b86e-1e78-4011-a79c-698a813f6318',
                        tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                        tenantCode: 'icaqf9onbk3np0obkhtcohsi5ft895ey2dlemu69xcz2zjnxkx',
                        systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                        systemName: 'nvajgckq5skfn7qezaz5',
                        executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 07:54:43',
                        executionMonitoringStartAt: '2020-07-29 23:25:54',
                        executionMonitoringEndAt: '2020-07-29 02:53:10',
                        cancelled: 9913708720,
                        completed: 8386564497,
                        error: 9590056386,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '6143b86e-1e78-4011-a79c-698a813f6318');
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
                            value   : 'c1765c19-0943-4534-9ad0-bd1005641387'
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
                            value   : '5b387a12-bcbf-41b1-820e-f695fc90c311'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('5b387a12-bcbf-41b1-820e-f695fc90c311');
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
                    id: 'cbc58f9c-ef3d-4e21-aad3-57b9d88b3aa5'
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
                    id: '5b387a12-bcbf-41b1-820e-f695fc90c311'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('5b387a12-bcbf-41b1-820e-f695fc90c311');
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
                        
                        id: '36642a2f-6bee-4e4f-aad2-fcb2862aa308',
                        tenantId: 'a10017ec-14db-4008-8d37-eed5f1612e73',
                        tenantCode: 'vgsq62xc9m28ia224qs9kepgjdbsao6a0n75arc54fitl3hdwt',
                        systemId: '547320df-5a46-4c82-8813-b7712198cb82',
                        systemName: 'qhwspef7jq21nx5i1ixn',
                        executionId: '4aa5c382-1ecb-46b1-a016-1cedc854e5c5',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 23:11:43',
                        executionMonitoringStartAt: '2020-07-29 05:46:08',
                        executionMonitoringEndAt: '2020-07-29 05:57:59',
                        cancelled: 7254654749,
                        completed: 8256431977,
                        error: 4240438014,
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
                        
                        id: '5b387a12-bcbf-41b1-820e-f695fc90c311',
                        tenantId: 'c0b62627-7b06-4967-a2ba-2b815b80f5a0',
                        tenantCode: 'fetptb000iguyypp0b727jdnyw5eq3ybzl9fwzs2nw60ii2f5q',
                        systemId: '02c0e467-2d20-42c0-b549-7408478771a4',
                        systemName: 'vifo3ifh7gual9oswke4',
                        executionId: '627e5bf5-343e-4ba6-806a-c9694998e839',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 20:34:22',
                        executionMonitoringStartAt: '2020-07-29 22:25:17',
                        executionMonitoringEndAt: '2020-07-29 17:22:18',
                        cancelled: 4935053569,
                        completed: 8612978101,
                        error: 8784032789,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('5b387a12-bcbf-41b1-820e-f695fc90c311');
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
                    id: '42cf1edf-0955-45cd-8f16-44ec04ebd8ed'
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
                    id: '5b387a12-bcbf-41b1-820e-f695fc90c311'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('5b387a12-bcbf-41b1-820e-f695fc90c311');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});