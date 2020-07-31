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
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'ods05vaxq5kfnxsrcin5n5m3bsfhtsnmzl8yk42821hf51if80',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: '8jpqf6pvitrox2coheip',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 23:39:18',
                executionMonitoringStartAt: '2020-07-31 12:09:03',
                executionMonitoringEndAt: '2020-07-31 12:44:08',
                cancelled: 4505230699,
                completed: 1459730439,
                error: 6938300010,
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
                
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'kt1lm8wb3wh4vtg1jgp39tfr6oj2j3ld35055k3k016321ra7o',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'tin4qc66xp9wuttd4wfy',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 11:25:55',
                executionMonitoringStartAt: '2020-07-30 23:18:42',
                executionMonitoringEndAt: '2020-07-31 04:57:20',
                cancelled: 4745623270,
                completed: 1085331768,
                error: 6581197339,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: null,
                tenantCode: 'qnod6e5ch1fvutve1o3vlfopyx0jevackszcsfjig5ssq9evoj',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'kdspuh5p8f0f05rve33l',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 11:33:41',
                executionMonitoringStartAt: '2020-07-31 00:24:31',
                executionMonitoringEndAt: '2020-07-31 04:33:29',
                cancelled: 1070333719,
                completed: 3415895157,
                error: 4569099812,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                
                tenantCode: 'u7a7kq36rd446i4h5kn7ymz2mrqa9subwq6n2jtz898mse59kt',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'uj9sy6k2hiu1j09d3tlk',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 12:09:44',
                executionMonitoringStartAt: '2020-07-31 11:02:02',
                executionMonitoringEndAt: '2020-07-31 11:47:58',
                cancelled: 4015401800,
                completed: 2197748692,
                error: 4160966351,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: null,
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'u7p34ytjavddm6e4yoy5',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 23:24:08',
                executionMonitoringStartAt: '2020-07-30 21:16:26',
                executionMonitoringEndAt: '2020-07-30 21:34:22',
                cancelled: 8774790597,
                completed: 3494846311,
                error: 5801226100,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'qwk294dy9tpdwmh7mnsf',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 00:19:10',
                executionMonitoringStartAt: '2020-07-31 10:40:17',
                executionMonitoringEndAt: '2020-07-30 21:12:44',
                cancelled: 6418512574,
                completed: 5862099255,
                error: 7629678974,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'bkwo9jf0lqksyffnrv56nbe1rnuoqjm7zx92cb8vmgcjl4nu8c',
                systemId: null,
                systemName: 'rr0n8fs393xxcsk6268q',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 22:46:16',
                executionMonitoringStartAt: '2020-07-30 20:46:46',
                executionMonitoringEndAt: '2020-07-31 11:54:42',
                cancelled: 2257409769,
                completed: 2789700138,
                error: 1487023832,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'sefp5g814no2ibc1ms1w85qd19pfx6q4ub4zmr8s7fzy01mcfo',
                
                systemName: '350tm18cyv4o8tgf44fo',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 02:11:54',
                executionMonitoringStartAt: '2020-07-31 00:08:35',
                executionMonitoringEndAt: '2020-07-30 23:13:31',
                cancelled: 3596232260,
                completed: 5704306425,
                error: 2845963804,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'k6k8vh65zbf2dolwq7q4pewqzkfs2kc4zohv0dtjpg4kwr9dn1',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: null,
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 10:22:50',
                executionMonitoringStartAt: '2020-07-30 15:53:07',
                executionMonitoringEndAt: '2020-07-31 11:19:20',
                cancelled: 8287726846,
                completed: 7302760176,
                error: 7179903798,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'dsgt48rulb5ous11fw0vx4n15e9posdujrtpbonif7xetra4zl',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 21:04:34',
                executionMonitoringStartAt: '2020-07-30 16:13:19',
                executionMonitoringEndAt: '2020-07-30 23:56:12',
                cancelled: 5964330581,
                completed: 4339554453,
                error: 9712805303,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'vv1cph1owwcowzons89beirgoyknj5kl0pdxi4f8bd1j0gnzy6',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'tsnz3uqyr8ualodlp8kx',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 12:56:56',
                executionMonitoringStartAt: '2020-07-30 23:29:54',
                executionMonitoringEndAt: '2020-07-31 02:49:25',
                cancelled: 8937433147,
                completed: 2225226831,
                error: 7785362252,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'px5p2kdzrgmnc3nb06ycwt2ch98ocvff63d9muostbj303o3yg',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'w2mboshoguaemdtgdsxw',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 12:31:09',
                executionMonitoringStartAt: '2020-07-31 10:16:06',
                executionMonitoringEndAt: '2020-07-30 14:52:08',
                cancelled: 5605855024,
                completed: 8524707146,
                error: 9203130438,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: '79jwy1has5xyi9w6480pp631nx1xs13rsyzxpovs4hktmunaft',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'itm9hwdwyd6s5axgd5mf',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: null,
                executionExecutedAt: '2020-07-30 15:53:45',
                executionMonitoringStartAt: '2020-07-31 02:07:58',
                executionMonitoringEndAt: '2020-07-31 06:55:11',
                cancelled: 5407052078,
                completed: 9218381216,
                error: 8225057140,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: '9b8ip4z70a2owdozvjy4kacn31u2wt418is8sos1o6gikv8xff',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'kqusgrmzi1cglfmw63a5',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                
                executionExecutedAt: '2020-07-31 11:51:33',
                executionMonitoringStartAt: '2020-07-31 04:36:08',
                executionMonitoringEndAt: '2020-07-31 01:19:29',
                cancelled: 8665281288,
                completed: 5702050344,
                error: 1362774493,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: '0x20s6fcpv8kt75lwghxzdflkqchc04whyxtw973w9yudhzvhg',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'if8otklspzde5pksltet',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-30 22:56:40',
                executionMonitoringEndAt: '2020-07-31 02:11:29',
                cancelled: 7482916446,
                completed: 3359751610,
                error: 6715141911,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'hy22i6jardxp3dytdnvbt89mznh0ar9hqdlfn68kp0v343nxsl',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'm28h8lliargz7nfcol21',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-31 03:39:25',
                executionMonitoringEndAt: '2020-07-31 07:24:22',
                cancelled: 7333182067,
                completed: 7186165482,
                error: 6649581621,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'gujx1wfz8wopv7h4zqu1vy8gz009k1war916l6t4ucd20japkv',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'ecvnsgq02fuf3jb4uaeh',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 09:50:07',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-31 11:00:24',
                cancelled: 3060565818,
                completed: 8477235162,
                error: 9278697155,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: '8qx4rwq8tfhxe47jdf8i1nitd14ee3p01o1p9jup5bliv838a6',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: '7k3qa9mw9as76q8mckn0',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 18:47:16',
                
                executionMonitoringEndAt: '2020-07-30 21:38:27',
                cancelled: 4847293827,
                completed: 1650399786,
                error: 7736058684,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'ds0wjj1zzteevlzn6msgl0jel9xe1nsoq0vtcutkw7zmi7igqg',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'y9teqjuvnadnf943qllt',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 20:58:14',
                executionMonitoringStartAt: '2020-07-30 23:29:26',
                executionMonitoringEndAt: null,
                cancelled: 1697228585,
                completed: 4405704214,
                error: 4513676714,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: '10je9tehais37ifog2j47mbg6gh8mjkbkupp5s94stkitalx5a',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: '6foph18322x9vrozq9wu',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 21:14:41',
                executionMonitoringStartAt: '2020-07-30 15:19:30',
                
                cancelled: 7340118523,
                completed: 5433539634,
                error: 3504929537,
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
                id: 't4eksafwgigung5koyq7ivmjxombmdvzl8pno',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'suin0x92wbu2ci3jqq7pc80dni31377si53l5ttgo1j7uszdcm',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'lgha5es5tajuksdr5kbx',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 22:11:12',
                executionMonitoringStartAt: '2020-07-30 20:50:45',
                executionMonitoringEndAt: '2020-07-30 21:15:04',
                cancelled: 9910497279,
                completed: 3236235510,
                error: 1784056720,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '9scy9xw08d19i75dfp5ovebnc9whn8ty0p72i',
                tenantCode: '8tl86of48h911n9thyati1svdeql7tn9pdoe29hg9m3u7otjez',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: '6ewz5c7tj4goum0sp5ry',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 14:26:54',
                executionMonitoringStartAt: '2020-07-30 15:44:19',
                executionMonitoringEndAt: '2020-07-30 22:47:33',
                cancelled: 9734125912,
                completed: 8991965852,
                error: 6501748771,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'yi8q2d9xn46p0w2kcd1mvtyzt9oanq9nxk4qqql2ebsqorm4ut',
                systemId: 'ecwdgezha1fxprodpols9rybey20jcvd16n9j',
                systemName: 'qbighak94fyiclqpb96b',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 18:22:06',
                executionMonitoringStartAt: '2020-07-31 13:13:40',
                executionMonitoringEndAt: '2020-07-31 05:54:11',
                cancelled: 2088842379,
                completed: 2870819736,
                error: 1448282047,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: '2mv4dzjv5vo2q9l2cmsurqe39nlutjv2yc0lbqogtbp7ee3w7u',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'n6wahqgb42xhc1tptanm',
                executionId: 'g68g1gyh7gfnvamtbg3vohqo2eo9t27u54xlm',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 21:58:36',
                executionMonitoringStartAt: '2020-07-31 05:26:48',
                executionMonitoringEndAt: '2020-07-30 22:14:24',
                cancelled: 6299543361,
                completed: 5179263368,
                error: 3933626091,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'z7wawkfe5yluhppk32j3t90fhsspitzid1qt6uzrgirdgxk4eic',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 's1ackgklliceas8wyvzl',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 02:40:09',
                executionMonitoringStartAt: '2020-07-30 16:38:27',
                executionMonitoringEndAt: '2020-07-31 03:22:01',
                cancelled: 6767490740,
                completed: 1159074836,
                error: 8947680633,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'vl8hcoerh1ef8a05ylpe7ir7bdjkgb8te9nxxg5e7217q18yan',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'stsq8uqytzpt59oa7oobi',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 17:36:25',
                executionMonitoringStartAt: '2020-07-31 11:47:40',
                executionMonitoringEndAt: '2020-07-31 09:07:10',
                cancelled: 2437773886,
                completed: 6938586569,
                error: 8856970591,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'cp9ud3sgyuum1ug8xfel8ifl6sfwlvx0f71w0ldmdq1rskhlml',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'usrh51uk48ybf9yv9325',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 10:05:29',
                executionMonitoringStartAt: '2020-07-31 00:19:13',
                executionMonitoringEndAt: '2020-07-30 17:12:09',
                cancelled: 89052285571,
                completed: 2691961980,
                error: 8065622072,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'vzmtulx8wb1osjtbo1ms6nf6kpbdcroaykfsxwh0qmbyo6p4ak',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'k2ogzu7j4qzs2mz38n8j',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 13:42:12',
                executionMonitoringStartAt: '2020-07-31 07:06:21',
                executionMonitoringEndAt: '2020-07-31 00:02:55',
                cancelled: 9370784994,
                completed: 73129361722,
                error: 5547657342,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'm1ezj6trs8hlp2l9jzolykv3yyw5bqvqgjpmyvyglu3i4lmh9m',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: '3nhk4obybrbom0kxwjib',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 20:28:47',
                executionMonitoringStartAt: '2020-07-30 18:37:34',
                executionMonitoringEndAt: '2020-07-31 01:06:08',
                cancelled: 5746998034,
                completed: 2969459029,
                error: 18158739702,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'eh182vpz7j59gkj87kz8jpfulc58vjzc3qkthpcy6s0u4s5evx',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'l81qo4jvwtzm5ql74qo7',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 02:22:21',
                executionMonitoringStartAt: '2020-07-30 21:39:29',
                executionMonitoringEndAt: '2020-07-31 13:17:00',
                cancelled: -9,
                completed: 7746828659,
                error: 2967515757,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'ksbxzspdfyq29xd6onb07jvu3riwbvvxycsou3it9t73ofog6y',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'ey6mhuh016en79eu9x1y',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 01:44:37',
                executionMonitoringStartAt: '2020-07-31 05:18:28',
                executionMonitoringEndAt: '2020-07-31 10:20:54',
                cancelled: 7058367656,
                completed: -9,
                error: 1929491217,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'zowz2kkwamo30i4odtxmi5nv6dl9u88pf4f9mpyosqjmiyi7y1',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'gocw3lnd5hs59kp4rrpr',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 11:52:41',
                executionMonitoringStartAt: '2020-07-31 03:19:11',
                executionMonitoringEndAt: '2020-07-30 14:45:11',
                cancelled: 7868761331,
                completed: 6127888353,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'e0rhs2i4l4y65z6gqjn4vy4xdnvwmivr7bu52pn0lgr8z3pn7w',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'rgbpdfjr9wrpvl2iq5ol',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-31 07:58:30',
                executionMonitoringStartAt: '2020-07-31 10:07:38',
                executionMonitoringEndAt: '2020-07-31 00:42:20',
                cancelled: 3340276785,
                completed: 7819931704,
                error: 4674161707,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: '3vtl4tdoggg4a9podg2dfdubwhtt87zicv0kkoipbug2dqwxmx',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'bqf00vfnyb1ddse3pvrp',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-31 04:30:02',
                executionMonitoringEndAt: '2020-07-31 03:36:49',
                cancelled: 3768446001,
                completed: 9319772272,
                error: 5039100807,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: '4d0tz9drq4ezarb82ftuj472g1kly8bgayism7g7xkbcyyqgis',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'vumgu4wq3iit904szvcu',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 20:05:33',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-31 00:36:55',
                cancelled: 3726183542,
                completed: 2772573549,
                error: 8041407758,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'pe9b2pcrn40ew8gadi09htxsbjfi9933elg5i4348wuz9dg3yi',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'gdkpvk1hqv7kbzxhoy0s',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 14:37:11',
                executionMonitoringStartAt: '2020-07-30 16:50:39',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 9004053108,
                completed: 2930296481,
                error: 1746536822,
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
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'b26zpofasq6u91xfwh5jfijp41s52pu6sytgewkq46l35xaeqi',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: '7j9guojqb0z13d5gkbyz',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 20:39:35',
                executionMonitoringStartAt: '2020-07-30 19:38:21',
                executionMonitoringEndAt: '2020-07-31 09:16:46',
                cancelled: 1052615815,
                completed: 2504591603,
                error: 8963901051,
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
                        value   : '228237b1-24df-4e46-a8f6-cd501e27a1ee'
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
                        value   : 'e57466a5-40a4-48ba-8b83-cbd6dd80d137'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e57466a5-40a4-48ba-8b83-cbd6dd80d137'));
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/0a0831b1-2f12-4c08-a6e7-26427d86def0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/e57466a5-40a4-48ba-8b83-cbd6dd80d137')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e57466a5-40a4-48ba-8b83-cbd6dd80d137'));
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
                
                id: 'a6b07734-7eba-436f-86e4-f4f9c8bb19b9',
                tenantId: '0173521e-9783-4494-b009-86fa7e2b4a6a',
                tenantCode: '8n55h4s75a46o0syaus3kb5hduyv1vlsualw4alf17f6r3msxq',
                systemId: '2d979030-881c-45aa-83ae-1b8af46b1200',
                systemName: '1bbpfbc3ry7ccqqlaapy',
                executionId: '512b58bf-9f7d-4f3a-92d6-ba3cda8f1f85',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 22:11:21',
                executionMonitoringStartAt: '2020-07-31 05:29:26',
                executionMonitoringEndAt: '2020-07-30 14:52:58',
                cancelled: 7345287602,
                completed: 1340388541,
                error: 2569024218,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                tenantCode: 'igogua27ivj7rhfin4or5tdbrbsdsrl3wvp3q959z8qcdb51cs',
                systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                systemName: 'xujaykvdvvippu3ityp8',
                executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 21:30:15',
                executionMonitoringStartAt: '2020-07-31 04:24:33',
                executionMonitoringEndAt: '2020-07-31 04:50:55',
                cancelled: 9908507396,
                completed: 2743797720,
                error: 9683200244,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e57466a5-40a4-48ba-8b83-cbd6dd80d137'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/3fb5ac5c-5417-42f5-a2ee-4a591b3606dc')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/e57466a5-40a4-48ba-8b83-cbd6dd80d137')
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
                        id: '6d22b01a-0b41-4581-95c9-eb269013c282',
                        tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                        tenantCode: 'mcli0z8p0kgvwt7kr1auuhxzva61kb25gisszmvte4ysgs4q8t',
                        systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                        systemName: 'd2eythsupjqibdllsr44',
                        executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-30 18:27:44',
                        executionMonitoringStartAt: '2020-07-30 22:57:47',
                        executionMonitoringEndAt: '2020-07-30 19:49:05',
                        cancelled: 6132227794,
                        completed: 4459809684,
                        error: 3050714861,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '6d22b01a-0b41-4581-95c9-eb269013c282');
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
                            value   : 'e2084c9e-9382-4f9f-9ea0-641d8cb1a030'
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
                            value   : 'e57466a5-40a4-48ba-8b83-cbd6dd80d137'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('e57466a5-40a4-48ba-8b83-cbd6dd80d137');
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
                    id: '9677e559-1f10-4cf2-b0f4-bf5462b18359'
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
                    id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('e57466a5-40a4-48ba-8b83-cbd6dd80d137');
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
                        
                        id: 'cec5b38a-dbb6-4012-b01e-395dda2ed821',
                        tenantId: '20f0c801-aa1e-4fa7-9fe5-07ac4eb5433c',
                        tenantCode: 'kj8cz7f6p9n5kifyrchdywj83up5j02xv54hzglytc60l2puzd',
                        systemId: '921515dd-ea1c-44dc-8f40-ddcb277b2f70',
                        systemName: 's9eo0bcmzoc0n2czw772',
                        executionId: '92f8d731-cd39-471f-90d8-e5f065a58803',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-30 23:07:47',
                        executionMonitoringStartAt: '2020-07-30 15:38:15',
                        executionMonitoringEndAt: '2020-07-31 10:56:34',
                        cancelled: 7793167876,
                        completed: 8122361727,
                        error: 1816122294,
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
                        
                        id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137',
                        tenantId: '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1',
                        tenantCode: 'nqmt00uh50lp9g80677mfja28dc13gmi9gkj6vgahh4qvsdxgr',
                        systemId: 'fc8ef8de-a1f5-4958-8864-8351b9263f8f',
                        systemName: 'jc8aml9penva1ryryh2d',
                        executionId: 'b2567ea7-1d38-420b-8ab0-e98087672709',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-31 12:00:15',
                        executionMonitoringStartAt: '2020-07-31 08:53:20',
                        executionMonitoringEndAt: '2020-07-31 00:40:01',
                        cancelled: 7194700310,
                        completed: 3941638663,
                        error: 2180163123,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('e57466a5-40a4-48ba-8b83-cbd6dd80d137');
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
                    id: '38677fbd-8e4e-41f4-a93f-0ee80ace26fe'
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
                    id: 'e57466a5-40a4-48ba-8b83-cbd6dd80d137'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('e57466a5-40a4-48ba-8b83-cbd6dd80d137');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});