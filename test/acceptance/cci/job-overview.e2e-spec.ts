import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IJobOverviewRepository } from '@hades/cci/job-overview/domain/job-overview.repository';
import { MockJobOverviewSeeder } from '@hades/cci/job-overview/infrastructure/mock/mock-job-overview.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('job-overview', () =>
{
    let app: INestApplication;
    let repository: IJobOverviewRepository;
    let seeder: MockJobOverviewSeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    MockJobOverviewSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IJobOverviewRepository>(IJobOverviewRepository);
        seeder      = module.get<MockJobOverviewSeeder>(MockJobOverviewSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                tenantId: 'd4d9821d-6044-461c-a0f4-f005f90d63f7',
                tenantCode: 's4hj7f2guc5lf7rk2ik6umwho9l4ky4uwsy1kx59pyftl383c9',
                systemId: '7a4da424-f9d0-4abb-9698-80f2037d0e32',
                systemName: 'a4gajkw3rylhts3hxmfy',
                executionId: '9bd3f29c-cf34-44e6-a61e-1dbb79ccb46f',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 19:33:44',
                executionMonitoringStartAt: '2021-05-23 19:56:33',
                executionMonitoringEndAt: '2021-05-23 23:28:40',
                cancelled: 8185335848,
                completed: 8823245264,
                error: 3305260292,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a58f7ada-bd06-403d-9e4b-3766820f2822',
                tenantId: null,
                tenantCode: 'rwvlwz04pygt6igvvo2my0c4n1zwrwh2eneue9jq6gstqcx8l6',
                systemId: '221acf80-5a82-4416-904d-f11dda750a02',
                systemName: '5cxgskkg6m6hmwk6ohq6',
                executionId: '90c4b648-f8d8-4d7b-a080-6b4db3a7817c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 17:57:01',
                executionMonitoringStartAt: '2021-05-23 05:32:11',
                executionMonitoringEndAt: '2021-05-23 11:43:44',
                cancelled: 3422843439,
                completed: 4017125530,
                error: 7103065923,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '15d06117-fb49-485e-8cc3-55f1164d5d79',
                tenantId: '75086b1a-d7a1-46bb-a1e4-c55e2b610b53',
                tenantCode: null,
                systemId: '9544fae0-9ecb-4526-8de2-1a33027e511a',
                systemName: 'l5mtu8m9jwat8lfuwlb6',
                executionId: 'ee4bf451-2c73-4e7f-80c9-c25ded05bf0e',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 11:16:24',
                executionMonitoringStartAt: '2021-05-23 17:06:39',
                executionMonitoringEndAt: '2021-05-23 03:43:06',
                cancelled: 6811879691,
                completed: 7178681192,
                error: 1831112626,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5a8e1e59-feaa-4a25-9cbf-b3947d6aecb2',
                tenantId: '4efcb114-dc28-41b5-a2ac-51791fbf2b46',
                tenantCode: '19o1otzmimb3btlya6gc09vcid2j160jv54jflhl58chzwrnaj',
                systemId: null,
                systemName: 'r2kknhkgu6qc7siekjbq',
                executionId: '22b0b098-c9ed-483c-802b-87617776756c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 13:10:03',
                executionMonitoringStartAt: '2021-05-23 03:10:47',
                executionMonitoringEndAt: '2021-05-23 22:20:42',
                cancelled: 2714767213,
                completed: 9951482344,
                error: 3368231291,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afcf8fa-be5b-4956-ab40-83b78214247c',
                tenantId: '88392256-2550-4bfb-857e-20c1d92ce8ad',
                tenantCode: 'f5cqvo81qxknx74amgcgb8ajykare84m0fl0webvgvimto4pka',
                systemId: '0faf61ee-6bbc-4481-aa86-720ffd359fba',
                systemName: null,
                executionId: '10c52a87-2ee0-4012-84a4-8196a2bdaf11',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 10:32:25',
                executionMonitoringStartAt: '2021-05-23 20:42:39',
                executionMonitoringEndAt: '2021-05-23 04:15:21',
                cancelled: 1498603512,
                completed: 6534707200,
                error: 5406739517,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '92a62678-b658-4375-bcc5-b0b7e892ba0b',
                tenantId: 'ae28bf89-1355-4d0b-a88e-68767a2c231f',
                tenantCode: 'mbhtu1a1dabufaxcgviirusekkzaaxp9p4q9b8f5eh6zj51gud',
                systemId: 'eeec6080-c851-4990-910e-761c9edb6432',
                systemName: 'ht90eddgpwcnc9fgldf4',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-24 00:08:01',
                executionMonitoringStartAt: '2021-05-23 00:35:11',
                executionMonitoringEndAt: '2021-05-23 16:48:56',
                cancelled: 2381942009,
                completed: 7377668312,
                error: 6543939417,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a5ebd9a-fccd-4b76-8b90-04fe2c82f00f',
                tenantId: '685e12c4-d2ad-4c87-9ae8-9e6abc52ac2f',
                tenantCode: 'ayel6hkodjf19c5am9anld5m9somq3ytzeuo3gwey2x35oomdt',
                systemId: 'ab028e70-6bb6-48ff-9ac5-ab905a64e7c7',
                systemName: '2fqya36o4w7mh90r255e',
                executionId: 'a8ce96b7-8409-48a5-b09a-24ebab80a4d1',
                executionType: null,
                executionExecutedAt: '2021-05-23 21:15:26',
                executionMonitoringStartAt: '2021-05-23 17:00:39',
                executionMonitoringEndAt: '2021-05-23 04:04:38',
                cancelled: 2713203174,
                completed: 4542681824,
                error: 5384506396,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '897c7f79-2ea5-4cc1-a0b2-321d475a998f',
                tenantId: '4ddf8a57-4cce-4d94-bcc6-395014ff1fcb',
                tenantCode: 'fop87lfon2fyilr3a4jan00ddl7yafy0wlc9zertkgtp6jxod7',
                systemId: 'a41126c5-5b34-4e81-bc5f-15caa7ca819b',
                systemName: 'cgz6hhgfrwilyiuh7zmq',
                executionId: 'f01ddca3-98da-48f1-9426-4201668c452a',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2021-05-23 09:19:28',
                executionMonitoringEndAt: '2021-05-23 17:40:50',
                cancelled: 8767424972,
                completed: 2239856443,
                error: 7769298222,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8ded5492-4857-4f55-a0c2-28ea58598753',
                tenantId: 'f3301f85-56bb-4f72-933e-4ddd3ffc9c27',
                tenantCode: 'w9xrz2otu5y8zmmcyxol9oic9c8o5i6qai5zaw3vmof33ubsyu',
                systemId: '43554b70-20ea-4a5a-91f3-fac25b4be9f9',
                systemName: 'is3pttikiibkwjspmu5b',
                executionId: 'e50d9565-abd1-4802-9cfc-3a08d98b0f66',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 20:46:32',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2021-05-23 13:52:00',
                cancelled: 5109795587,
                completed: 1996341580,
                error: 9028519505,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '83374e6f-36ac-481d-9298-1a50cdc293f5',
                tenantId: '66605804-8df9-4626-b81f-eb3a4f0df686',
                tenantCode: 'nx568svrr8mlw17yobn16uow57be270ekrxvljgxrptj8y6e6s',
                systemId: 'cdf8cb81-2244-4dab-989f-33be37ca5e88',
                systemName: '0pgobk3kdc1j36bpneph',
                executionId: '2d130e4b-7580-4d3f-9ec1-37339cc7bdb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 09:55:32',
                executionMonitoringStartAt: '2021-05-23 13:45:28',
                executionMonitoringEndAt: null,
                cancelled: 7224155923,
                completed: 4511896343,
                error: 6077182690,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                tenantId: 'dba89130-6c5f-4320-9735-23f523120e20',
                tenantCode: 'wf33uvt5rz3p9f5lxdy4anzcis6fiwzvlpq68sur60t8vxe6x2',
                systemId: 'c8258369-85e6-4484-a67f-131e673a3302',
                systemName: '9pw80eqjds0arwcz4ty3',
                executionId: '42216c17-0599-44c9-bc70-e7a84cafc345',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 05:41:53',
                executionMonitoringStartAt: '2021-05-23 21:03:48',
                executionMonitoringEndAt: '2021-05-23 05:23:04',
                cancelled: 5366575371,
                completed: 8278386568,
                error: 4087622648,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'da79d3a7-0d94-440c-819e-0746a16a4135',
                tenantCode: 'dgu2lbvemcjazcfdraoqgd130gtcgcpn27wbs3lbcdhm1u0z5h',
                systemId: '5b0cdc41-d0b4-4913-ac2a-e03d929fa60f',
                systemName: '2hblkhsyfz11br74nk4n',
                executionId: '88097eff-8224-4d70-9978-510e7575c008',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 14:46:41',
                executionMonitoringStartAt: '2021-05-23 17:59:11',
                executionMonitoringEndAt: '2021-05-23 15:24:48',
                cancelled: 6678646625,
                completed: 5224596675,
                error: 4468795487,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '86eabafd-047b-4fa1-a4d6-191b93b24593',
                tenantId: 'a8b0dca2-0a9e-4c32-b24a-04603302ba42',
                systemId: 'cd31623a-d67b-4d11-8026-d52b23c35751',
                systemName: 'hj2ng3900xxcltesdysi',
                executionId: 'e66b9782-3f11-44dc-bfb4-f35909edce00',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 05:01:57',
                executionMonitoringStartAt: '2021-05-23 13:04:06',
                executionMonitoringEndAt: '2021-05-23 07:18:46',
                cancelled: 6046804869,
                completed: 8250575279,
                error: 2921748541,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7618d18b-5726-41ac-9fb4-8b57ab60aa62',
                tenantId: 'f4477132-7ca3-4bbe-86a4-b5aa3d21830f',
                tenantCode: '0jqjc6dg4qhn6bctaoozh2xrl82c2oetzb7lq6lfs004zlw0in',
                systemName: 'sdn6xahf4v79tm9e3t3n',
                executionId: '5b6af222-3ed8-4218-9f6f-e2c7be484a11',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 14:34:51',
                executionMonitoringStartAt: '2021-05-23 23:46:07',
                executionMonitoringEndAt: '2021-05-23 12:44:25',
                cancelled: 3083991639,
                completed: 8136524359,
                error: 6373981083,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '235cf9ed-6cd9-459b-be17-21f5b0d27706',
                tenantId: 'b34266ed-7acf-4c0f-86b7-bd6549c7a5c3',
                tenantCode: 'f7mxnvx5kd7vyajc7u6zbyyv9somw145x18asc1ujnas0b64w3',
                systemId: '2262a5fe-a05e-470a-9b66-86641555747e',
                executionId: 'de572942-32db-4f1b-9326-b0a050e6ca28',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 09:05:53',
                executionMonitoringStartAt: '2021-05-23 20:34:06',
                executionMonitoringEndAt: '2021-05-23 02:23:00',
                cancelled: 5795109245,
                completed: 6308473486,
                error: 8665543903,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '52f0596e-320b-41a4-9de0-b7ea5bc91f72',
                tenantId: 'a3f37d36-46df-43c7-b33c-df6ec621677d',
                tenantCode: 'pmkmmg2zzr44068z990zhmxtvealiemptw30r9c4sj7fcxtbhh',
                systemId: '3828e033-57fb-4b54-a343-f2ab0aa359a7',
                systemName: 'suyk34449oeynhstly3f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 12:34:10',
                executionMonitoringStartAt: '2021-05-23 00:32:50',
                executionMonitoringEndAt: '2021-05-23 06:28:16',
                cancelled: 4999204648,
                completed: 9342731588,
                error: 3538881239,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4c9c98bf-8b03-4604-9562-c0cb0452e8b1',
                tenantId: 'b2a0c533-46b6-4cef-b379-46ed74aaa77c',
                tenantCode: '395vw27ymwo3nrwxzbf62cf1b8g62ad3o9tu8qbi668cwgkkad',
                systemId: '49f1e877-839b-48cf-b2a0-cda3b8e39112',
                systemName: 'xsezca90uhj51ba60i7y',
                executionId: '5087e07e-1ead-4aad-91eb-5564bf81c37f',
                executionExecutedAt: '2021-05-23 02:15:49',
                executionMonitoringStartAt: '2021-05-23 02:31:24',
                executionMonitoringEndAt: '2021-05-23 13:15:44',
                cancelled: 5328039147,
                completed: 7584961139,
                error: 8654815684,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a4fec81d-e342-44e6-bb9a-407e3ccce6bf',
                tenantId: '81e0e67c-4f8a-47d6-8a78-3b20cc6f4e51',
                tenantCode: '6auc1be9c0l8a6pxzuz9bsu050u8o6tx0ttgb9xn4xie4fhje3',
                systemId: '9507f747-f27c-4e6e-9909-428eaf2c68a7',
                systemName: 'mbjo46t49tg34tslhlcq',
                executionId: '27027e77-d65e-46bf-a256-cb811b4593c1',
                executionType: 'SUMMARY',
                executionMonitoringStartAt: '2021-05-23 08:20:12',
                executionMonitoringEndAt: '2021-05-23 14:50:20',
                cancelled: 5926233235,
                completed: 8413723957,
                error: 4422991423,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '543e3fd3-615c-4e07-b40b-7df77ed15f14',
                tenantId: '4cb43c21-b91b-499f-bc74-970b421dc701',
                tenantCode: 'e5gwefjdpv22cgdhsxone31y9xhvvwqlprw2wa93edc7b3kgdj',
                systemId: '7932aec9-d664-4315-9bc6-9597c7176908',
                systemName: '44kzfz6c81r651ydx2kf',
                executionId: 'a8a65691-a8c6-4db0-978b-6e7324407b0f',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 07:04:47',
                executionMonitoringEndAt: '2021-05-23 05:34:39',
                cancelled: 6332753636,
                completed: 1427599225,
                error: 6370649351,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4d8e36f8-daf5-407a-8664-dfe02c0f489b',
                tenantId: 'b06f7173-81bb-4c1b-9143-fd494cb79e87',
                tenantCode: 'rl8dtek084sk2hlxxchj0ipsospfnwcqqkiqvdg8x7x9p728uf',
                systemId: '101088f9-e7e4-45fd-9e81-add0e5dfcbe5',
                systemName: 'wc129gcsqlezpe14ny1j',
                executionId: 'daa6e9e9-dbe7-4ad1-acde-83a1ce7f5541',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 13:18:06',
                executionMonitoringStartAt: '2021-05-23 04:58:02',
                cancelled: 5919542414,
                completed: 7526542596,
                error: 7342901315,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8olrxbafy2g5c8u3vmhtljqavqucnlc0tmugh',
                tenantId: '120d26c6-40c0-4ef9-bde5-690a9b66b868',
                tenantCode: 'h8n2v8d8f0y0l7oc2wpmi3qxumbx6cwisj9trtityuos93vk35',
                systemId: 'a249f431-36dc-49f4-b9e1-95941ab8a7f3',
                systemName: 'mru3f8u3lpn6r8xhckkm',
                executionId: 'ddc9ce65-ccad-4822-a07c-76a438495aa1',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 20:48:24',
                executionMonitoringStartAt: '2021-05-23 22:05:24',
                executionMonitoringEndAt: '2021-05-23 03:40:45',
                cancelled: 2735906782,
                completed: 2722285939,
                error: 4943619131,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c7af961e-40d1-41b5-93d5-b6fbffca3b93',
                tenantId: 'kvtzyq4qrrnh2tmzfdc4jsiu2r4ph8iuo9bp9',
                tenantCode: 'ulnup5j4r5rkvhpkrf98u2rqh2rwoh0hyxsm3b5noy1969y73r',
                systemId: '6305ac28-980d-4a47-a549-b426e46b7832',
                systemName: '13fqkvuhkn6453f2i84w',
                executionId: 'ad481157-14a2-4060-b614-ac0f40e6689a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 15:56:27',
                executionMonitoringStartAt: '2021-05-23 12:22:11',
                executionMonitoringEndAt: '2021-05-23 23:16:15',
                cancelled: 7592968416,
                completed: 4362072480,
                error: 9769864443,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '98c21ad9-4cc5-4d60-97ca-a292151d30ad',
                tenantId: '08e6c009-6284-4b86-9197-5c7a901a1745',
                tenantCode: 'ra6igmemrxmzu2eth28n1i0v1kbrs5rfp9tl3kp4uo2r8u0d19',
                systemId: 'ghwfib27b5l88s0wfzs9f32jpb7qfociz6uf1',
                systemName: '9trvsuuomzl0iawbx2lm',
                executionId: 'f012bf1a-856e-4d68-96d0-039840d96fad',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 22:29:23',
                executionMonitoringStartAt: '2021-05-23 00:35:35',
                executionMonitoringEndAt: '2021-05-23 19:10:32',
                cancelled: 5514576750,
                completed: 4280930894,
                error: 3446811481,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '76918e81-9efa-4da2-b9a3-5befbb4b8da5',
                tenantId: '151a6e04-7d2a-439b-bdce-5fab2f8fd714',
                tenantCode: 'l3c3ym89npctyherq0lxvdpwwdjlysy5avmktwkofaa1r0cjyx',
                systemId: '2bbb085b-3c49-46e3-b0da-8edf9d1c0039',
                systemName: 'c1im18vz0avclmuj7scc',
                executionId: '6ax8c9kkkehdks6wysxhxruffhwvka3tbhia5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 09:41:07',
                executionMonitoringStartAt: '2021-05-23 17:23:15',
                executionMonitoringEndAt: '2021-05-23 02:30:50',
                cancelled: 7279057569,
                completed: 1225954281,
                error: 7945905803,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8cfabcfd-916d-4921-94e8-f55ade1b51db',
                tenantId: '8d610af9-a235-4b56-b203-5db812ba29f3',
                tenantCode: 'gfprooiukkri3oll2ndssppot3tna60cb2u57u1ef3o1mebha6k',
                systemId: '8a5792c7-60f8-42c9-9fd8-625ab51a219f',
                systemName: 'g6hapy2tdk1ezqh8sdez',
                executionId: '79d7e31b-b0a0-4d7f-95fb-d89466d5e691',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 11:35:51',
                executionMonitoringStartAt: '2021-05-23 17:10:21',
                executionMonitoringEndAt: '2021-05-23 00:53:40',
                cancelled: 1107026424,
                completed: 7329162865,
                error: 1726116508,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemName is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b085afa-3e5e-48ef-a7c5-8b8d5ef5ba2e',
                tenantId: 'e7bfd2a8-22d1-49f7-8b58-0634f4f580d8',
                tenantCode: 'tawdtfjy5rncsftnjhfx6svr492dfrq0xo7b4phqqtqn8fdr22',
                systemId: '9475ea57-2713-4b80-9dc4-f63cfd85ff45',
                systemName: 'zhi12wfgbzdleep731q0p',
                executionId: '9fc539e1-3258-4ee2-a8e3-79b180c5bf5e',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 10:52:09',
                executionMonitoringStartAt: '2021-05-23 23:37:38',
                executionMonitoringEndAt: '2021-05-23 14:15:22',
                cancelled: 8357124757,
                completed: 1834729940,
                error: 8377862311,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewCancelled is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0fd7a019-c088-4b7f-b9fd-77dac88355ec',
                tenantId: 'd3ab3965-4df0-4418-900d-dda9766121cf',
                tenantCode: '0l9z62u7pvnu33xtnzgouid6qq83huwofbavxse19uzyhsil20',
                systemId: '4b3da58b-7adb-4a61-b900-e58c13d52d5d',
                systemName: 'cdpa7co64klptmib8oea',
                executionId: '93687eb3-8b34-48cc-a15d-3e19c4c3b8e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 23:42:16',
                executionMonitoringStartAt: '2021-05-23 15:29:08',
                executionMonitoringEndAt: '2021-05-23 22:32:38',
                cancelled: 31076009972,
                completed: 3412173531,
                error: 1377060072,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCancelled is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewCompleted is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f024b782-ef7b-4e87-9788-a9b07e101386',
                tenantId: 'f69111ed-a761-4daf-9a50-a0b7a7a2b5e5',
                tenantCode: 'i3j1pdpvwm3f6r90t1chn8xoor41rarfwbri7rcv418pbb7qt2',
                systemId: '9e80839c-6250-4f61-b040-2118d1a77e85',
                systemName: 'sztg719mle51qqefvmzv',
                executionId: '52bbe017-db63-420b-91c2-2399f42e9b06',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 20:07:48',
                executionMonitoringStartAt: '2021-05-23 08:08:16',
                executionMonitoringEndAt: '2021-05-23 12:52:52',
                cancelled: 7840683244,
                completed: 20247002681,
                error: 5634667664,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCompleted is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewError is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '60c54fad-0c2d-4c10-9365-85cd1b3eeb40',
                tenantId: '6ca57f59-0076-42b0-b0a1-0b2fc316f925',
                tenantCode: 'bhyk23ome08wo8f327b2u1urssqoos12csbi6u2rgk7qsgqkg5',
                systemId: '7070c901-1209-4f43-aced-ccbbd1f660d8',
                systemName: 'jyuqa75yjz2bo075jgrf',
                executionId: '01891f43-dd8e-4df0-ac8f-624e16a518ca',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 01:24:11',
                executionMonitoringStartAt: '2021-05-23 09:12:55',
                executionMonitoringEndAt: '2021-05-23 07:14:20',
                cancelled: 7585649125,
                completed: 6532436920,
                error: 40416641183,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewError is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewCancelled must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4449dd85-1a15-408b-b7da-41b592705d21',
                tenantId: '7ab9a49d-7ef1-4be3-b8e9-83c9440356cc',
                tenantCode: '97krw6qxw6zxolwllectr8hyozy8d8xurfq78hcldr9smo3pj2',
                systemId: '022a1e6e-5c16-42c1-82d1-e554fc368188',
                systemName: 'x8ros75bbm9adf2gul4s',
                executionId: 'f358584a-457d-4667-955e-bb1849d5d3a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-24 00:27:59',
                executionMonitoringStartAt: '2021-05-23 02:11:55',
                executionMonitoringEndAt: '2021-05-23 17:59:16',
                cancelled: -9,
                completed: 9807561039,
                error: 3802140674,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewCompleted must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a177f697-5b5f-4768-b13a-1c755476d2b9',
                tenantId: '58c024bb-f2d9-4a7b-839c-98a269cf622a',
                tenantCode: 'tufepcp63mmt2myqt1bvbrrpc4nu6xw4o81i877edd8befs0lm',
                systemId: 'd4f019c3-b1b5-40f9-bdc5-8b9d08c6427d',
                systemName: 'f6alrrb6mdtsouwe7sk7',
                executionId: '5a27bdcf-1c5e-40a3-9ba3-c2a6af3278b8',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 02:35:21',
                executionMonitoringStartAt: '2021-05-23 15:40:23',
                executionMonitoringEndAt: '2021-05-23 01:10:29',
                cancelled: 1247174705,
                completed: -9,
                error: 8550331319,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCompleted must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewError must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'caeb7fb2-eb0c-4286-b2ab-8327fc3634d1',
                tenantId: 'f6617ffe-c85c-4672-baec-bf625bad1b31',
                tenantCode: 'jy2p863yxrqdk4vgjyuu300vfkv0uull6y413t4913181zrqt5',
                systemId: 'c4ae9977-761c-4c19-bfb8-f4f484af5a84',
                systemName: 'dqpigb870rcc7ohu334s',
                executionId: '5c43396b-7cac-4f33-b9b4-bc789ba385b0',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 16:37:04',
                executionMonitoringStartAt: '2021-05-24 00:27:13',
                executionMonitoringEndAt: '2021-05-23 03:00:27',
                cancelled: 3237620051,
                completed: 4088707999,
                error: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'daffc36d-8721-4406-8b5f-f67da4aa689d',
                tenantId: 'b855f8ca-b83f-476d-837b-322f3fda1134',
                tenantCode: 'ijpusg72rgqdx9pt0niu0a71dnoofymh6cfsbjeotrqw51mbkb',
                systemId: '8c7fde3e-b18b-46a3-99e3-dfa659deb905',
                systemName: 'g2hf2zdz0ujx6bti2bzv',
                executionId: 'a8c15b0e-4ef2-4cea-bac3-deca62366d9a',
                executionType: 'XXXX',
                executionExecutedAt: '2021-05-23 21:56:13',
                executionMonitoringStartAt: '2021-05-23 12:13:22',
                executionMonitoringEndAt: '2021-05-23 21:57:05',
                cancelled: 7519368451,
                completed: 6356442711,
                error: 2735073873,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a1ea434a-301c-4bba-8bb6-7ea2658686c1',
                tenantId: '9d8f14a3-8c30-40af-bfa4-c50c47083ca5',
                tenantCode: 'xdau83d4ob5a6ig1371c64jrx8cnl2avbajtypjnja52el7bg1',
                systemId: 'b25e2272-cd34-4f2a-841d-80f0203ecdc3',
                systemName: 'rx6uihgidzo1woavtogy',
                executionId: 'cd0fd4f8-b27e-4c40-b40e-cdad4c723177',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2021-05-23 22:38:30',
                executionMonitoringEndAt: '2021-05-23 10:03:18',
                cancelled: 9179790050,
                completed: 6017637471,
                error: 2239293508,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e5be0c2e-27e7-407b-a848-e63d02e73e55',
                tenantId: '2587519b-94fd-45c3-ba86-4c646ff023e2',
                tenantCode: 'ccrgz10tbczl6y688eghi3xodxasl8hky2ky7i6obfo9iujmrm',
                systemId: 'abd7d943-53d9-400e-bd20-284a5e993f61',
                systemName: 'f105pc5kqlf2hyjyxzx9',
                executionId: '88159bf9-472c-482c-8e4d-a93e2e622ab2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 05:06:35',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2021-05-23 14:28:02',
                cancelled: 9077569547,
                completed: 3473960034,
                error: 4446877575,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '47742e17-d22f-4c6d-86f1-dad7c682e54c',
                tenantId: '88a90a7c-a39f-4691-8dec-49ec0d046970',
                tenantCode: 'tq2ubd4sgd67muzuleiqibw04h9kdhwxlkxcr0kmgz0d2xdm33',
                systemId: '7863984b-d69b-40ec-9a3b-53d7c9217f3c',
                systemName: 'u7zegz86swkxvp1aj7y2',
                executionId: '11f9e555-2532-43ef-848d-dfcb7897ae2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 22:28:51',
                executionMonitoringStartAt: '2021-05-23 22:13:19',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 8366031345,
                completed: 8245180388,
                error: 7430428380,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });

    test(`/REST:POST cci/job-overview - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET cci/jobs-overview/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/jobs-overview/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/jobs-overview`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/jobs-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET cci/job-overview - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '4760593b-4833-47d2-9071-978955b1042c'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST cci/job-overview`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 21:26:49',
                executionMonitoringStartAt: '2021-05-23 21:26:49',
                executionMonitoringEndAt: '2021-05-23 21:26:49',
                cancelled: 1165920423,
                completed: 2682016420,
                error: 9397970431,
            })
            .expect(201);
    });

    test(`/REST:GET cci/job-overview`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET cci/job-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview/08ae5c9e-c259-45e7-950c-a737679b5b54')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET cci/job-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT cci/job-overview - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                systemId: '9189c277-fd22-4a5a-a692-63a1c56085f6',
                systemName: 'zwdlk281zptz1leq1e77',
                executionId: 'afa030f9-065c-4353-b1eb-3e148b092012',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-24 00:04:46',
                executionMonitoringStartAt: '2021-05-23 02:34:30',
                executionMonitoringEndAt: '2021-05-23 17:47:31',
                cancelled: 1032454546,
                completed: 6892774007,
                error: 5155587000,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/job-overview`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/job-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 21:26:49',
                executionMonitoringStartAt: '2021-05-23 21:26:49',
                executionMonitoringEndAt: '2021-05-23 21:26:49',
                cancelled: 1969517621,
                completed: 4041044504,
                error: 9191902609,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE cci/job-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-overview/728cb09c-ac3b-41ba-87e7-52f603f3c333')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE cci/job-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-overview/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL cciCreateJobOverview - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateJobOverviewInput!)
                    {
                        cciCreateJobOverview (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            cancelled
                            completed
                            error
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL cciPaginateJobsOverview`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateJobsOverview (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciPaginateJobsOverview.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateJobsOverview.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateJobsOverview.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciGetJobsOverview`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetJobsOverview (query:$query)
                        {
                            id
                            tenantCode
                            systemName
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetJobsOverview.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciCreateJobOverview`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateJobOverviewInput!)
                    {
                        cciCreateJobOverview (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            cancelled
                            completed
                            error
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2021-05-23 21:26:49',
                        executionMonitoringStartAt: '2021-05-23 21:26:49',
                        executionMonitoringEndAt: '2021-05-23 21:26:49',
                        cancelled: 8975083769,
                        completed: 6877526853,
                        error: 6106593189,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateJobOverview).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindJobOverview - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindJobOverview (query:$query)
                        {
                            id
                            tenantCode
                            systemName
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
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: 'e8738503-3254-4b9f-aaa7-20f4d4b0f126'
                        }
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

    test(`/GraphQL cciFindJobOverview`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindJobOverview (query:$query)
                        {
                            id
                            tenantCode
                            systemName
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
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobOverview.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindJobOverviewById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindJobOverviewById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
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
                    id: '604d2e02-1280-4fc9-b0c2-41d24b15f983'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindJobOverviewById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindJobOverviewById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobOverviewById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciUpdateJobOverview - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateJobOverviewInput!)
                    {
                        cciUpdateJobOverview (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
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
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                        systemId: '9189c277-fd22-4a5a-a692-63a1c56085f6',
                        systemName: 'zwdlk281zptz1leq1e77',
                        executionId: 'afa030f9-065c-4353-b1eb-3e148b092012',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2021-05-24 00:04:46',
                        executionMonitoringStartAt: '2021-05-23 02:34:30',
                        executionMonitoringEndAt: '2021-05-23 17:47:31',
                        cancelled: 2302947212,
                        completed: 2428462259,
                        error: 1097884600,
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

    test(`/GraphQL cciUpdateJobOverview`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateJobOverviewInput!)
                    {
                        cciUpdateJobOverview (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2021-05-23 21:26:49',
                        executionMonitoringStartAt: '2021-05-23 21:26:49',
                        executionMonitoringEndAt: '2021-05-23 21:26:49',
                        cancelled: 9628376715,
                        completed: 9341596997,
                        error: 7657931186,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateJobOverview.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciDeleteJobOverviewById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteJobOverviewById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
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
                    id: '8ce638c9-c9ba-40a8-a866-7e2e6cc98c86'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteJobOverviewById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteJobOverviewById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteJobOverviewById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});