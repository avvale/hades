import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IExecutionRepository } from '@hades/cci/execution/domain/execution.repository';
import { MockExecutionSeeder } from '@hades/cci/execution/infrastructure/mock/mock-execution.seeder';
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

describe('execution', () =>
{
    let app: INestApplication;
    let repository: IExecutionRepository;
    let seeder: MockExecutionSeeder;
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
                    MockExecutionSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IExecutionRepository>(IExecutionRepository);
        seeder      = module.get<MockExecutionSeeder>(MockExecutionSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                tenantId: '098c1ae6-c7f0-43e4-b1d5-5a69f02c4d36',
                tenantCode: 'fb1uqhzpr08mbccjn1oi1w9twma74lmm2fqu1lkaeoiyi4v6o9',
                systemId: '633559ec-bc95-46b1-8ddb-7c4e7b72f127',
                systemName: 'fkghjuf1ryanfusktki4',
                version: 'xhpcl6jn0n0vmip7vmat',
                type: 'SUMMARY',
                executedAt: '2021-05-23 11:22:00',
                monitoringStartAt: '2021-05-23 09:12:40',
                monitoringEndAt: '2021-05-23 03:50:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f4e63b87-8fd5-4f49-877d-b0c4c64fbff6',
                tenantId: null,
                tenantCode: 'o3kyfbl31cipt9ir2qo9cb1dgqrx8df6r098advikzrwgrff50',
                systemId: '6ca3adb8-0b9a-4d53-8837-774d9d489074',
                systemName: 'hmwais5jr397g5tvdw0d',
                version: 'o8udxg3z6diwyrg1z0gt',
                type: 'SUMMARY',
                executedAt: '2021-05-23 03:52:30',
                monitoringStartAt: '2021-05-23 06:33:56',
                monitoringEndAt: '2021-05-23 12:17:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef95cfc7-85e9-4c7d-b40d-dec7a228e37b',
                tenantId: '1967ddb6-82ed-4444-97aa-2d08db85f96a',
                tenantCode: null,
                systemId: 'dba1bc16-6daf-4655-bdf4-5a4694dd4ca5',
                systemName: 'ch0ly67zigkjvpi9dzmy',
                version: 'd74uji87qmy0rwez8i0n',
                type: 'SUMMARY',
                executedAt: '2021-05-23 06:43:37',
                monitoringStartAt: '2021-05-22 23:34:58',
                monitoringEndAt: '2021-05-23 05:22:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f3cc4c89-f755-48cb-8063-88577e63bccc',
                tenantId: '774cff9f-7a44-41f1-b3bb-8909a564f55f',
                tenantCode: 'riu36c9335kglxospvd70sjyeddgmmtehncpqz7a3t04azb9hn',
                systemId: null,
                systemName: 'r5fbqbdawefthdc65zq7',
                version: 'gj2sjcorr7udimur0y8g',
                type: 'SUMMARY',
                executedAt: '2021-05-23 00:30:47',
                monitoringStartAt: '2021-05-23 06:13:12',
                monitoringEndAt: '2021-05-22 22:49:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6072efbe-aee3-4764-a33d-30cd58371050',
                tenantId: 'b2eb6e28-85ad-4abd-99d3-219608616301',
                tenantCode: 'dlxpfq5tm8xf60mfeetntdey3uokbf0qpjc47ua0kwytwdylww',
                systemId: 'f254e4d1-e377-4eff-816d-ec78b65846c6',
                systemName: null,
                version: 'zq9h5bhbzrs14o5iyzvo',
                type: 'SUMMARY',
                executedAt: '2021-05-22 21:44:03',
                monitoringStartAt: '2021-05-23 13:26:34',
                monitoringEndAt: '2021-05-23 06:24:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionVersion property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '475c6333-c94d-478c-8a1a-df05dbacd65e',
                tenantId: '8481ca00-6b8f-4a31-b6a2-7ddcb0878b82',
                tenantCode: 'nvqf94jdeteqvvjy82tls4cmhy32msm5iadqoi95iawjjry7bh',
                systemId: '0e837e03-96e4-446b-967a-b3e9658ab7d4',
                systemName: 'lf43qgvqo1bu0l1u4iqs',
                version: null,
                type: 'SUMMARY',
                executedAt: '2021-05-23 13:06:24',
                monitoringStartAt: '2021-05-23 06:31:44',
                monitoringEndAt: '2021-05-22 15:23:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionType property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '803992d3-5531-447e-b071-de126d565252',
                tenantId: '845e3180-f9ec-4998-8696-06d8107205dd',
                tenantCode: 'hurfl74cjm9l2tv23mbwqdgoivmxef0y17zjve7j0qw8o1e0m4',
                systemId: '3cae12d7-b51f-4ae7-aed9-925701490280',
                systemName: 'g6tg0a3upftw6537q6c7',
                version: 'tkwc8xrj2h5hhvsxe9pt',
                type: null,
                executedAt: '2021-05-22 18:48:46',
                monitoringStartAt: '2021-05-23 02:03:58',
                monitoringEndAt: '2021-05-23 03:15:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0aa8c88b-dc53-44d0-9f61-c32ab51f644a',
                tenantId: 'd79e0bd3-8d33-4f4a-9a33-3b008eff9027',
                tenantCode: 'zegyrwk81jd8n1cdfj7zujoqd9h648g2o4tjg3oo3492txwg6i',
                systemId: '7391e1a2-29c4-482c-a02e-0a21d11ef8e9',
                systemName: 'svr3dbxeigf6sp8ved2s',
                version: 'yu3xzdcux33fr1po91ik',
                type: 'SUMMARY',
                executedAt: null,
                monitoringStartAt: '2021-05-23 10:05:24',
                monitoringEndAt: '2021-05-23 09:12:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6ad18d39-ad27-49ee-b4a1-9d243f9152e2',
                tenantId: '789d7b66-f2d0-43f4-b033-039c044b6ac3',
                tenantCode: 'yk9ghrny08osn7zkqh0ixm1nxc49hfg1qb0mls4mrgps1yd6lv',
                systemId: '7d0e79b2-254d-466f-8be0-61da65b3fd29',
                systemName: '4lrq9bavqjfm51iifgaw',
                version: 'e170vq4nw98xx0i0qz2f',
                type: 'SUMMARY',
                executedAt: '2021-05-23 04:24:10',
                monitoringStartAt: null,
                monitoringEndAt: '2021-05-22 15:12:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '06f8df55-5375-4430-beff-32bc5054b0bb',
                tenantId: '4a1a31bb-efe0-4b06-be16-1a2593e6cc99',
                tenantCode: 'h7vsn6efm909a112wudqmcfp8ymmmwsbiz4reslo8bgbqn1trl',
                systemId: 'b969eb06-c400-41d3-ac3d-80c8020985d4',
                systemName: 'c6ttg19kzyu2fpkfnxum',
                version: 'zz9wb6ga5t91e3vztjf3',
                type: 'SUMMARY',
                executedAt: '2021-05-23 08:46:37',
                monitoringStartAt: '2021-05-23 13:02:24',
                monitoringEndAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                tenantId: 'cf5dafef-96fc-40e0-9e7f-e93ce1c9d7dd',
                tenantCode: 'rplbsq4alp1zwe6lcv1vod1lbv3kezmb42sfo2cyn8vjy4sw09',
                systemId: '2d2f7141-10e7-4889-9c9a-4e9978844085',
                systemName: '11csihesmnszhu2edlt1',
                version: '0ii8nak87qpb399gddje',
                type: 'DETAIL',
                executedAt: '2021-05-23 07:25:57',
                monitoringStartAt: '2021-05-23 09:57:52',
                monitoringEndAt: '2021-05-23 10:04:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9da5feea-7dff-4115-99c5-d4156abe4727',
                tenantCode: 'l5et1gi5unkh350e0jtf2rcivd3agfbpmwj70y1jjdmc2f2zxa',
                systemId: 'd9261792-f8ba-433f-b171-fd6da4d4e74a',
                systemName: 'wr7m5xfk0ih0lpbwdvwj',
                version: 'xd590gfexnlrpslv3g59',
                type: 'DETAIL',
                executedAt: '2021-05-22 22:28:21',
                monitoringStartAt: '2021-05-23 00:43:40',
                monitoringEndAt: '2021-05-23 08:06:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f39900a0-aeba-4c97-bc1e-d9f00db8effe',
                tenantId: '7893ae97-119b-4bab-9e4d-c0916141f88e',
                systemId: '6bcb5dac-14d9-46b4-806b-5d134a2adf0a',
                systemName: 'k0scggnt63tclcslaw08',
                version: 'cx6hq6ni3ya1rn5m3o5r',
                type: 'SUMMARY',
                executedAt: '2021-05-23 07:36:53',
                monitoringStartAt: '2021-05-22 16:16:16',
                monitoringEndAt: '2021-05-23 01:59:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1c45898b-d12c-42ea-aeae-b571cdd93541',
                tenantId: 'fe9e4042-6dac-437a-b102-1c48469a76fa',
                tenantCode: 'dstuw95okvpgll9gkkfbkf2rklaabb7kri0eg4a43oq2rua6yp',
                systemName: '5r1a93wp574wlqflvh0j',
                version: '8jt51lfm07y4wsx5xnx6',
                type: 'SUMMARY',
                executedAt: '2021-05-23 11:05:40',
                monitoringStartAt: '2021-05-23 02:38:03',
                monitoringEndAt: '2021-05-23 00:58:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd7ab3a90-0bf8-4630-8a07-fa650498145e',
                tenantId: 'cefcbad5-c052-4468-ba0b-dc911a39357d',
                tenantCode: '5wj273f6d8ajozck2bc0igxpxx92c8j7leplsl9aiqrxe593ux',
                systemId: 'f7c1606e-9e7f-4e17-bba2-7b243dad571b',
                version: 'z3pqawd40hoahyubyr1e',
                type: 'SUMMARY',
                executedAt: '2021-05-23 11:38:45',
                monitoringStartAt: '2021-05-23 08:33:20',
                monitoringEndAt: '2021-05-22 22:27:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionVersion property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c62af083-08a4-4c79-a5de-3c1766233446',
                tenantId: '5c9e582f-a6be-4fb1-87ff-9c1ee69492c4',
                tenantCode: 'mawsyt7x8ugg0t9hhebeme3im5qzyod0d9ht9535wnvhy8wcnb',
                systemId: 'a12bfc86-d4e4-4d27-bbca-42abd2e17693',
                systemName: 'cswtg6k1v3bg5kv4jje6',
                type: 'DETAIL',
                executedAt: '2021-05-22 17:01:52',
                monitoringStartAt: '2021-05-23 01:15:19',
                monitoringEndAt: '2021-05-23 11:25:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionType property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c371f012-725e-4058-8d6f-0d90ae773111',
                tenantId: '185c3ccd-e5ec-48d0-85f8-7805ecee6f7e',
                tenantCode: 'auk538a4b1rxmcxic0ar364cpt51c1iye86bkmelqwldk77jdp',
                systemId: 'ed145249-5a99-4764-8002-20da0de8443a',
                systemName: 'kjvnd83subjot6jyh76d',
                version: 'l1kv02g3cn5zy1qc91j2',
                executedAt: '2021-05-23 09:38:53',
                monitoringStartAt: '2021-05-23 10:10:40',
                monitoringEndAt: '2021-05-22 17:43:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd052de4c-7eb7-4dfa-9cce-e77efd911c0d',
                tenantId: '13f66aa1-0806-473f-a204-ad83eb280501',
                tenantCode: '9lr9qe3vbuv5of1yty34amkoyuts04wqm1800kbffii6k2w0kp',
                systemId: '63208d9b-ce26-46e3-86b5-51dc4e997780',
                systemName: 'iqcptf90f9gr3rxgvxmp',
                version: 'n6914icxnfurmkeljgzq',
                type: 'SUMMARY',
                monitoringStartAt: '2021-05-23 04:29:44',
                monitoringEndAt: '2021-05-23 02:19:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5ede8955-8629-46d3-aad7-dc73a56b1584',
                tenantId: 'de387d36-fde7-48e8-8890-35699811cc86',
                tenantCode: '2g10xuin3ts6u1tlct50xp7jx8ikwp08adcbqnnwviywgr3yn1',
                systemId: 'b53f089a-60df-4c39-a576-59f401577b81',
                systemName: '0w4fmlw5aaffo95elbl8',
                version: 'fdyxm8ychyjf7dxp0lp2',
                type: 'SUMMARY',
                executedAt: '2021-05-22 18:17:10',
                monitoringEndAt: '2021-05-22 21:32:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd4d290c6-1ab7-4a28-9399-b3d18aeac11f',
                tenantId: 'a3b402c1-1ff7-4a31-9037-3c73814ecc9b',
                tenantCode: 'ai7h7wh2wzahxthkq63qeoq8ddkfdardb7aymsbmqe1swujbiy',
                systemId: '349e2b3e-bfe8-4a85-83c7-8bb04e1b1596',
                systemName: '4p9z1jmya72072vbefcp',
                version: 'apv162w9kuuy7h31ly49',
                type: 'SUMMARY',
                executedAt: '2021-05-23 06:25:04',
                monitoringStartAt: '2021-05-23 07:21:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4upe0stjacz5nec3g4pngpiv4f30fo7u2mcw2',
                tenantId: '12b5dfbd-f6b7-452e-b08d-c87d9ad9cf61',
                tenantCode: '74plfb7tyleynqcvfvfaddpvznssz2y5v8ihorzt1cjnxjdj2o',
                systemId: 'cf173f2d-2e6d-4308-8f04-d00434fc3059',
                systemName: 'duo9hr8viqy78yrtlrtc',
                version: '1nu0mya363l5z1bzjv45',
                type: 'DETAIL',
                executedAt: '2021-05-23 09:20:15',
                monitoringStartAt: '2021-05-23 02:29:25',
                monitoringEndAt: '2021-05-23 12:14:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6c6dd20b-a48b-46cb-a831-7960792d6c92',
                tenantId: 'fm8o2b09pi8fllput2py0pg8vp89uiomfjpnw',
                tenantCode: 'xafwz9gsvst2yjwd53m5ov62b1uy6apwdrxzb8ayt8aify980u',
                systemId: '6658c52d-014e-4c1e-9647-8160d1f3b225',
                systemName: 'bqngw5jxs4j197o0la1d',
                version: '7ll5enkmra9sp8mdiy39',
                type: 'SUMMARY',
                executedAt: '2021-05-23 04:03:13',
                monitoringStartAt: '2021-05-22 16:14:49',
                monitoringEndAt: '2021-05-22 15:55:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c1e09462-ad73-4f79-a918-13763cd15110',
                tenantId: '02427c0a-12ae-4fba-a25f-1b23db65df84',
                tenantCode: '3nxut9xpmscptf6kglgzbxyfau0tcyrfhba9lnq3ussslrnnl1',
                systemId: 'et2txixhctjt1qbuz0t2g77vsbsnpdti1w8jk',
                systemName: 'uha3kvjdlvxa5lmar79o',
                version: '0l98y58iobde81216rxc',
                type: 'DETAIL',
                executedAt: '2021-05-23 04:52:24',
                monitoringStartAt: '2021-05-23 06:46:50',
                monitoringEndAt: '2021-05-23 14:14:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd2da3aee-e800-4fbc-aa3e-f4666ec8ba11',
                tenantId: 'c782e284-e1dd-4f95-a1fe-d6abeeb0bb9b',
                tenantCode: 'zhi3eqqi9bclcoexb7tyk54j5sp2svgs54shpf8m4q43dr1gqoj',
                systemId: 'eb45c82b-b18d-4d8c-a993-c26aca720b3f',
                systemName: 'p1iia8c2ljzpep5f67fu',
                version: 'nkpv75iqmhppbyd2uxuh',
                type: 'DETAIL',
                executedAt: '2021-05-23 09:46:35',
                monitoringStartAt: '2021-05-23 13:34:31',
                monitoringEndAt: '2021-05-22 17:58:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemName is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '49d52623-6414-4533-9937-b7acd6a113e7',
                tenantId: '03b2d5e6-a127-4bdf-96ef-0e2d1f8aa1dd',
                tenantCode: 'kt1bj8wuhrb79nkm4nbgafwzvntox517j6jyh9gjnixnivjs6s',
                systemId: '933a7810-0234-42be-be87-993b3f980580',
                systemName: '7hgi33gfhdxn9og8szp8m',
                version: 'kbvnhwwr9rlalbhwu4vo',
                type: 'DETAIL',
                executedAt: '2021-05-23 07:11:15',
                monitoringStartAt: '2021-05-22 15:30:22',
                monitoringEndAt: '2021-05-23 04:11:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionVersion is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9954ba7a-d0e7-4527-a617-3d2a74e65820',
                tenantId: '19a83824-7c99-4ffc-937f-c41747e92c58',
                tenantCode: 'rkopxgp2css967cvgp2uzptk1wxhin3tme6w2nvw8p0co25k6x',
                systemId: 'a0c0eeff-8019-41f3-90af-7d1adc4f375d',
                systemName: '80cjrc2pr66v5rojhigq',
                version: 'n2ts9s1n9oenvvuk6fe8j',
                type: 'SUMMARY',
                executedAt: '2021-05-23 11:14:34',
                monitoringStartAt: '2021-05-22 19:43:36',
                monitoringEndAt: '2021-05-23 10:01:41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionType has to be a enum option of SUMMARY, DETAIL`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8c615f43-eadb-49cc-86e4-9165774026d7',
                tenantId: '8e0596f1-c8c7-4c31-9e58-7e305d98e20f',
                tenantCode: 'cka8mt0ru32kkjwcjjb5ylh3psisdhfu6vybu6n614knwhnfat',
                systemId: '86fde4f6-1f15-4d6b-98c1-f94feac6bc63',
                systemName: 'wue5fvfencl4npcekp9y',
                version: 'zxktxoqm3r3xrl75tfhg',
                type: 'XXXX',
                executedAt: '2021-05-22 14:59:12',
                monitoringStartAt: '2021-05-22 14:22:59',
                monitoringEndAt: '2021-05-22 16:33:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionExecutedAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '137b3615-562d-491b-ade4-9276a99bd29d',
                tenantId: 'ab0efd0a-a9de-47cc-9876-0afbb1edbd0a',
                tenantCode: 'm7y0ieodh9bflfls5fjo9eavzn3xr6hqc98t8x19ak3wqedjus',
                systemId: '69a8578f-9250-4ed1-a223-aff61f7e0922',
                systemName: 'sp8ge4n9t1o9qjr2yxvc',
                version: 'pp56f6t9vxf5286p32ud',
                type: 'DETAIL',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2021-05-23 13:42:41',
                monitoringEndAt: '2021-05-22 16:46:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt has to be a timestamp value');
            });
    });
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringStartAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b35efaa1-43fe-4583-9d7b-ae8457260d1f',
                tenantId: '1007c64b-ef35-41ec-b2d2-548ad9d2d9fd',
                tenantCode: 'truch7wqpvutaogo50euh5ny5io9pzv0esnfhi5ulhrwun51am',
                systemId: '590388f8-5e64-440d-ad47-c4cf7825efaf',
                systemName: 'm94j86dplugrlpmx8ql1',
                version: 'q8vde6iggibbas3pcwsp',
                type: 'SUMMARY',
                executedAt: '2021-05-22 16:19:23',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2021-05-23 08:35:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringEndAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f764d3c8-ac5b-443e-bca6-6c62bbf35057',
                tenantId: 'dbb6e73f-7978-4818-a3f0-600de7536b28',
                tenantCode: '7lfyxzuj04s4ux31giiahk2kxjb8k79088imgv4hsgq9cffma1',
                systemId: 'bb0cb764-5b17-4bcd-b9dd-32b455ed268a',
                systemName: 'fm4sa3j7nvx209kob3xt',
                version: '4p3eak4f93u9pyjpqb56',
                type: 'DETAIL',
                executedAt: '2021-05-23 07:12:45',
                monitoringStartAt: '2021-05-22 21:38:12',
                monitoringEndAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt has to be a timestamp value');
            });
    });

    test(`/REST:POST cci/execution - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET cci/executions/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/executions/paginate')
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

    test(`/REST:GET cci/executions`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/executions')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET cci/execution - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '73cf99a9-5aa7-49a3-902a-7071c9a742b3'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST cci/execution`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                version: '4iyw9pwsdxcmgcu744j2',
                type: 'SUMMARY',
                executedAt: '2021-05-23 11:12:31',
                monitoringStartAt: '2021-05-23 11:12:31',
                monitoringEndAt: '2021-05-23 11:12:31',
            })
            .expect(201);
    });

    test(`/REST:GET cci/execution`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/execution')
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

    test(`/REST:GET cci/execution/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/execution/9db7f0d9-a324-497e-84f9-fb724c411a62')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET cci/execution/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/execution/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT cci/execution - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                systemId: '9189c277-fd22-4a5a-a692-63a1c56085f6',
                systemName: 'zwdlk281zptz1leq1e77',
                version: 'myn282zl1ect8c684xo8',
                type: 'SUMMARY',
                executedAt: '2021-05-22 16:59:15',
                monitoringStartAt: '2021-05-23 11:17:27',
                monitoringEndAt: '2021-05-23 07:33:17',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/execution`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                version: '4iyw9pwsdxcmgcu744j2',
                type: 'DETAIL',
                executedAt: '2021-05-23 11:12:31',
                monitoringStartAt: '2021-05-23 11:12:31',
                monitoringEndAt: '2021-05-23 11:12:31',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE cci/execution/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/bc572822-2687-4cf3-b59e-276ab9f32c2f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE cci/execution/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL cciCreateExecution - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateExecutionInput!)
                    {
                        cciCreateExecution (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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

    test(`/GraphQL cciPaginateExecutions`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateExecutions (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateExecutions.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateExecutions.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateExecutions.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciGetExecutions`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetExecutions (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetExecutions.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciCreateExecution`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateExecutionInput!)
                    {
                        cciCreateExecution (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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
                        version: '4iyw9pwsdxcmgcu744j2',
                        type: 'SUMMARY',
                        executedAt: '2021-05-23 11:12:31',
                        monitoringStartAt: '2021-05-23 11:12:31',
                        monitoringEndAt: '2021-05-23 11:12:31',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateExecution).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindExecution - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindExecution (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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
                            id: 'c00b1c36-3bee-451f-80d0-0ef75c64b618'
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

    test(`/GraphQL cciFindExecution`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindExecution (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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
                expect(res.body.data.cciFindExecution.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindExecutionById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindExecutionById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '22432e64-f902-4364-9b12-7538d5df14a3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindExecutionById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindExecutionById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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
                expect(res.body.data.cciFindExecutionById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciUpdateExecution - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateExecutionInput!)
                    {
                        cciUpdateExecution (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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
                        version: 'myn282zl1ect8c684xo8',
                        type: 'SUMMARY',
                        executedAt: '2021-05-22 16:59:15',
                        monitoringStartAt: '2021-05-23 11:17:27',
                        monitoringEndAt: '2021-05-23 07:33:17',
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

    test(`/GraphQL cciUpdateExecution`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateExecutionInput!)
                    {
                        cciUpdateExecution (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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
                        version: '4iyw9pwsdxcmgcu744j2',
                        type: 'SUMMARY',
                        executedAt: '2021-05-23 11:12:31',
                        monitoringStartAt: '2021-05-23 11:12:31',
                        monitoringEndAt: '2021-05-23 11:12:31',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateExecution.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciDeleteExecutionById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteExecutionById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6cb1bf71-4dea-4d6b-ae44-4214e482ebd9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteExecutionById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteExecutionById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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
                expect(res.body.data.cciDeleteExecutionById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});