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
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: '8vb1f4ounrhtylk5k7jard9l643kc6fi55rmlgaxfmbzgpempy',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'bh56oqyg7ams2592yu78',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 10:00:27',
                executionMonitoringStartAt: '2020-07-27 23:01:20',
                executionMonitoringEndAt: '2020-07-28 05:12:49',
                cancelled: 6807452953,
                completed: 9369039455,
                error: 8202077243,
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
                
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'oc1t11updvo1p538enhhr4xtbq3r6tve8lnh0qrsu6u3buz7xo',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: '987kdd3uno20x2uzkg86',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 09:00:18',
                executionMonitoringStartAt: '2020-07-27 12:14:27',
                executionMonitoringEndAt: '2020-07-27 15:09:34',
                cancelled: 8411446992,
                completed: 3659462210,
                error: 3568679490,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: null,
                tenantCode: 'n920x71qfek03ltoucldlia9pyfqkuo62gtodsktj479x5q382',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'q6dcqtucw0g8ucjl0bcz',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:53:32',
                executionMonitoringStartAt: '2020-07-27 13:02:44',
                executionMonitoringEndAt: '2020-07-27 14:13:36',
                cancelled: 4188162759,
                completed: 4750948638,
                error: 3444002525,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                
                tenantCode: 'hkw8b1n9bd74jnxddm5vw3hvc4mou836zk38uhaia3zn4h3fs6',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'nl36v0o1m053zjvj03nq',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 16:03:50',
                executionMonitoringStartAt: '2020-07-27 13:17:59',
                executionMonitoringEndAt: '2020-07-28 04:45:58',
                cancelled: 4018426863,
                completed: 7193041694,
                error: 4190955128,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: null,
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'yh3vcqa8jbn0b9eg9aem',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 21:45:24',
                executionMonitoringStartAt: '2020-07-28 09:06:09',
                executionMonitoringEndAt: '2020-07-28 08:46:53',
                cancelled: 3972338301,
                completed: 2042410871,
                error: 6976694343,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: '0430p0ot7udkdg150nl6',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:51:40',
                executionMonitoringStartAt: '2020-07-27 20:11:16',
                executionMonitoringEndAt: '2020-07-28 00:44:02',
                cancelled: 6427785236,
                completed: 7983399686,
                error: 4218485624,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'f0zfhzgyptp9tx1tmkd2t37xvi1gmjizz3cwulpjozt11elv5a',
                systemId: null,
                systemName: 'w2u2f5yqnf8mn3b3dnrs',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 05:26:17',
                executionMonitoringStartAt: '2020-07-28 08:54:46',
                executionMonitoringEndAt: '2020-07-27 14:24:21',
                cancelled: 8833107632,
                completed: 8260401037,
                error: 7090006787,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'yyoq00plvrhv35lfja7owaug4em1rfm3khva4x71kizfou3epy',
                
                systemName: 'buuz6yaetwlqaegugc46',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:50:50',
                executionMonitoringStartAt: '2020-07-28 06:18:41',
                executionMonitoringEndAt: '2020-07-28 01:44:45',
                cancelled: 5469110967,
                completed: 3245019043,
                error: 4496693045,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'c36hgc3ihytjloin0oyzye0zpuojfpr8jzz6tpczr0r5lgdkd5',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: null,
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 04:57:16',
                executionMonitoringStartAt: '2020-07-27 21:10:25',
                executionMonitoringEndAt: '2020-07-28 04:30:40',
                cancelled: 3872756401,
                completed: 4570104280,
                error: 6390576731,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: '19pfhl75uc69fm34f35y76jxo6anizs09knjnblfxj054106pr',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:05:53',
                executionMonitoringStartAt: '2020-07-28 05:56:03',
                executionMonitoringEndAt: '2020-07-27 22:29:07',
                cancelled: 8785071281,
                completed: 1385496875,
                error: 6165897302,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: '5x4d9iotgmf45h8ezjdzayswtrrcgqku498t8y8h4l0u6ifyp2',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: '0why09c8qea1asczvoe0',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:49:39',
                executionMonitoringStartAt: '2020-07-27 18:51:42',
                executionMonitoringEndAt: '2020-07-27 17:04:39',
                cancelled: 2763531162,
                completed: 7873163849,
                error: 5536900157,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'btxul3hic1gj5u40i2x094y5nfp2ui7we6uea1ljz88lw2lh8g',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'bo1xxkuili6lyw9zb86l',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 10:18:54',
                executionMonitoringStartAt: '2020-07-27 20:09:49',
                executionMonitoringEndAt: '2020-07-28 10:46:12',
                cancelled: 1890706038,
                completed: 2258495918,
                error: 5949473549,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'pj11309r4je9mwwp2wp5p914l930qcr4iccv8n6d5op7ec0omh',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'znv8hgba10zp5ap0ois7',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: null,
                executionExecutedAt: '2020-07-28 01:45:33',
                executionMonitoringStartAt: '2020-07-28 06:01:28',
                executionMonitoringEndAt: '2020-07-27 13:14:14',
                cancelled: 5438700599,
                completed: 1811371335,
                error: 9347735601,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'iin4c97487f0p8hhfvu6sp3gwmqtbjxrwnigj53wbsr66szus3',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'qtafvns4exbft5ue10np',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                
                executionExecutedAt: '2020-07-28 10:02:25',
                executionMonitoringStartAt: '2020-07-28 10:53:06',
                executionMonitoringEndAt: '2020-07-28 04:38:03',
                cancelled: 1135548088,
                completed: 4083424271,
                error: 9289347378,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'jkkrta26li17y3pnib6je7tryypbq1knvw56w9l13d9jbf3s4q',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'y6jgqnndbylwpu38t6ji',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-28 09:48:16',
                executionMonitoringEndAt: '2020-07-27 18:43:46',
                cancelled: 3173849648,
                completed: 8213199876,
                error: 3449163362,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: '5hqhhu2qds3v1g9y077wlabwhkfd11rpfntv06jvvfb02xyhcv',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'vumqds6ujvl4zmas22e7',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-28 09:37:33',
                executionMonitoringEndAt: '2020-07-28 10:43:26',
                cancelled: 4771882669,
                completed: 1340173206,
                error: 7338899796,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'brwubferrhss1qlnpyo86ba4ee4o97fhftb56ml57pks8iba9u',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'b1ddu294p1wb82fh8f0i',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 23:10:55',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 20:41:42',
                cancelled: 2693417806,
                completed: 1528886133,
                error: 8229008141,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'hl52ezccwj4bv1e7i0z5aqxzxoza508ltvfvgcy6vjuxm34l2n',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'fyn5tkjneaiuwjvf2g02',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 08:07:59',
                
                executionMonitoringEndAt: '2020-07-28 04:59:50',
                cancelled: 5836918156,
                completed: 6567152578,
                error: 3646980196,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'n4z7rvetvhfmfl8609j3sp56gccm28oei3losnaaqp54u5ndpg',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'wiw9eu6fswqk4kaqlxvv',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:56:54',
                executionMonitoringStartAt: '2020-07-27 22:02:32',
                executionMonitoringEndAt: null,
                cancelled: 1704242401,
                completed: 4761076785,
                error: 9070664580,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'zjxfbt5vrbo1btq1ji3a565ulk729s3rc5513xyqjikp9n39lj',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'xl56jihj2mssun17x6ev',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 00:18:15',
                executionMonitoringStartAt: '2020-07-27 13:26:30',
                
                cancelled: 9440406992,
                completed: 6116491186,
                error: 3180450720,
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
                id: 'texddfw7ylplka01nzcxs1omqgaj9wuasujov',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'xetnlpueg5f3skwkbfp3y288zom5y12ivedsl3ij9ptkl7ffqb',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'dflxdfbhag6rgmj2rcbq',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 10:35:45',
                executionMonitoringStartAt: '2020-07-27 19:52:23',
                executionMonitoringEndAt: '2020-07-28 05:37:56',
                cancelled: 7461141657,
                completed: 5599699352,
                error: 6103871079,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: 'r2r1jsdvha1zvgrwgly0npisw4l12kcvsg27y',
                tenantCode: '5zsu4rr4ebtus5m9kvbbsspxu0doojmx9gc2xdurbvs3ooeylu',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'x157jns5zeez6tqjtdxp',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 20:27:09',
                executionMonitoringStartAt: '2020-07-27 20:20:16',
                executionMonitoringEndAt: '2020-07-27 18:47:12',
                cancelled: 9546676004,
                completed: 4785695085,
                error: 1549923218,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: '33ucpfunacx9taohcc31tbr23zepknsqn6gjgjygw91mc0d4qm',
                systemId: 'v2pptqr7dzx4lbwesblo1qqt0khx8jzs88axe',
                systemName: 'tenmhj9gg3mgj1fgl3jv',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 21:50:08',
                executionMonitoringStartAt: '2020-07-27 21:11:50',
                executionMonitoringEndAt: '2020-07-27 21:41:25',
                cancelled: 4503497144,
                completed: 6798332052,
                error: 2744037708,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'vivxp0id15w2br1dse0nbgdvtmf56pvy29yd3zaef7vieaowbr',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'e5dlvriztdpw1g2jhqs4',
                executionId: 'bc9karrwbu8s3dd5y00qjynkbdrovvtks5ch4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:31:31',
                executionMonitoringStartAt: '2020-07-27 20:42:58',
                executionMonitoringEndAt: '2020-07-27 20:26:17',
                cancelled: 3301135612,
                completed: 7779516209,
                error: 1280286040,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: '3moagya0q47j5fmvvahfhvhbc9lu1vx8dorjfuljsmt65p60pf9',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'w6yvdeuunl9w1it23dzw',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:25:11',
                executionMonitoringStartAt: '2020-07-27 18:48:09',
                executionMonitoringEndAt: '2020-07-27 19:35:02',
                cancelled: 6116281874,
                completed: 2598827743,
                error: 4976902513,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'fezj5ydoybbt9ag8vgwa049xhsa05yjkw8me45vghd3uo91n2y',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'yngnwtzkf0t84ggp4ii44',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 00:06:39',
                executionMonitoringStartAt: '2020-07-27 15:16:06',
                executionMonitoringEndAt: '2020-07-28 03:11:38',
                cancelled: 1588316090,
                completed: 9649466575,
                error: 9751688726,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'fved76b3fp1neyeyshygz9j8jacm0kyqfbn4rg0a0iz9lybq9u',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: '3hresz2md3i49w9z4y5n',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 01:28:10',
                executionMonitoringStartAt: '2020-07-28 06:06:07',
                executionMonitoringEndAt: '2020-07-28 08:52:04',
                cancelled: 49152832400,
                completed: 6513307553,
                error: 7241921224,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: '6fa5lh54nn877tpd08qth6cycfslzc573e2uhap90i00wf1cad',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'ereyh2xayosuot5x4tt8',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:36:09',
                executionMonitoringStartAt: '2020-07-28 06:24:02',
                executionMonitoringEndAt: '2020-07-28 03:18:41',
                cancelled: 1453622035,
                completed: 50173452419,
                error: 2013619001,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'gsuxo36r3yejuig1znc3b0tv7dhyav8k4q1weqs1m09y4w1dbf',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'r8w6x3ea78jqtb91cvu4',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 08:28:50',
                executionMonitoringStartAt: '2020-07-27 15:29:54',
                executionMonitoringEndAt: '2020-07-28 06:28:02',
                cancelled: 5401261738,
                completed: 8386802359,
                error: 40691991725,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: '52g1m32d5kzg8a1xftjr8rpfh4ujles4cmv1jk4enptptru390',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'z7mt6a9zy987e3d1cxc6',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:19:09',
                executionMonitoringStartAt: '2020-07-27 16:20:09',
                executionMonitoringEndAt: '2020-07-28 08:33:53',
                cancelled: -9,
                completed: 7916808571,
                error: 1843649691,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'zqid07jl1yg3hrvvhzakvv6o022vzmusvlgon27thcffw24izr',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'arivl4wdwzx90guqo3o4',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 02:54:20',
                executionMonitoringStartAt: '2020-07-28 06:25:27',
                executionMonitoringEndAt: '2020-07-27 14:29:59',
                cancelled: 8553292746,
                completed: -9,
                error: 4363418636,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'zcj3okgmt3evs7ebtvadvoa957h7iayaoy0esz8pxci9ad9kl0',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'udi22jjt5s4ldpsu6sz4',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:42:28',
                executionMonitoringStartAt: '2020-07-27 14:24:10',
                executionMonitoringEndAt: '2020-07-28 06:05:30',
                cancelled: 7029070964,
                completed: 9554247532,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'jt9t299c3yj1c2a696lnbssrdii5dvotcidtkhd4y587fbmxta',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'ay5eqpb678pm4ekil0hr',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 05:24:00',
                executionMonitoringStartAt: '2020-07-27 18:30:05',
                executionMonitoringEndAt: '2020-07-27 22:17:01',
                cancelled: 1491778018,
                completed: 1065337536,
                error: 1738265260,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'i9dphj9c5cde886uofjzup3uys5rtzo752bgkkg1279xzu14lg',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: '5k2xrpblhym774ac00c4',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-28 01:39:59',
                executionMonitoringEndAt: '2020-07-27 23:16:23',
                cancelled: 3456249325,
                completed: 9483173751,
                error: 7120473853,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'abetmgpbvyg9u2ilt2vx75r8k91bfwvsvgy4pgmh6xw0xtvp78',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'vbsqv1e6jdnzp8tsmxab',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 08:04:24',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 17:22:34',
                cancelled: 9947978876,
                completed: 6446661219,
                error: 7958535990,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'bbpsy0aug1bz1xmhunt0ipdlo6uohbpjklnsatwaxg27tm4whs',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: '9xbs4vydceppzo3t345m',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:50:26',
                executionMonitoringStartAt: '2020-07-27 17:51:08',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 8331839485,
                completed: 2291006564,
                error: 6367580272,
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
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'jqyy3lxl2dd9l9dvt6332pgkprdz0ec5g3g5xz9cwcvq3mwxw9',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'b02b3zt90uo5240lzzfl',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 18:04:30',
                executionMonitoringStartAt: '2020-07-28 05:24:56',
                executionMonitoringEndAt: '2020-07-27 22:04:57',
                cancelled: 1040171720,
                completed: 1211522736,
                error: 8724689931,
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
                        value   : '61109516-b23e-4c66-9321-eb500634ea4a'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '61109516-b23e-4c66-9321-eb500634ea4a'));
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
            .get('/bplus-it-sappi/job-overview/61109516-b23e-4c66-9321-eb500634ea4a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '61109516-b23e-4c66-9321-eb500634ea4a'));
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
                
                id: '7682776a-4533-47f1-b2f9-48744126f334',
                tenantId: '3d250e99-5f3b-4ed2-802a-56fca70228f5',
                tenantCode: '5uhp86kpb1jza0su3hat5g3q1vr09slaeqluxvljx63y6ie6p6',
                systemId: 'd34b681a-b584-4233-b8be-0aa584eef83f',
                systemName: 'qakmnkft715psn3px421',
                executionId: 'd4c4a8f2-ecef-44e8-a1db-49e604228d69',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 11:09:43',
                executionMonitoringStartAt: '2020-07-27 13:13:02',
                executionMonitoringEndAt: '2020-07-27 16:51:47',
                cancelled: 7164464883,
                completed: 6017758934,
                error: 2662290515,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '61109516-b23e-4c66-9321-eb500634ea4a',
                tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                tenantCode: 'vfdesy2g2u4de774dl06q8zzfl8fkcn9fcq5by0nkkxkz0f2pa',
                systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                systemName: 'awzpzomk9l2jchhkh08v',
                executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 22:24:17',
                executionMonitoringStartAt: '2020-07-28 11:01:07',
                executionMonitoringEndAt: '2020-07-28 08:07:53',
                cancelled: 3835300620,
                completed: 1083265571,
                error: 4626525985,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '61109516-b23e-4c66-9321-eb500634ea4a'));
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
            .delete('/bplus-it-sappi/job-overview/61109516-b23e-4c66-9321-eb500634ea4a')
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
                        id: 'd044de01-d685-4f51-b992-188969431608',
                        tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                        tenantCode: '1wslh1gy7ec1te1cmncjpn8lo283pj82o6vqeer1cbtmfkv02t',
                        systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                        systemName: '4jyjp9g6edkrb0i653j0',
                        executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-28 02:08:49',
                        executionMonitoringStartAt: '2020-07-28 08:37:00',
                        executionMonitoringEndAt: '2020-07-28 01:13:34',
                        cancelled: 7927054273,
                        completed: 7847857178,
                        error: 1388839894,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', 'd044de01-d685-4f51-b992-188969431608');
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
                            value   : '61109516-b23e-4c66-9321-eb500634ea4a'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('61109516-b23e-4c66-9321-eb500634ea4a');
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
                    id: '61109516-b23e-4c66-9321-eb500634ea4a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('61109516-b23e-4c66-9321-eb500634ea4a');
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
                        
                        id: '8bb0bb68-ddf0-427b-afcc-28d32cf60102',
                        tenantId: 'c4fac283-3443-4f1f-aab5-5cc7c33a4d6b',
                        tenantCode: 'oylphyr1vpyfdp6plreipmun2l2bi9qbnvm0jp4wuq6p2c4stb',
                        systemId: 'dd8c81c0-6549-4f6f-8a6a-7713c303aa77',
                        systemName: 'jer5zacbckei2odu3chr',
                        executionId: 'b33ab3a9-743b-4916-86ee-c0a2bf3fb91e',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 01:23:11',
                        executionMonitoringStartAt: '2020-07-28 02:43:40',
                        executionMonitoringEndAt: '2020-07-28 02:04:50',
                        cancelled: 9736680390,
                        completed: 7380877080,
                        error: 2846161755,
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
                        
                        id: '61109516-b23e-4c66-9321-eb500634ea4a',
                        tenantId: '8a417196-c334-4f20-9205-bcb7cacfa2a2',
                        tenantCode: 'ssiut9gypr1kv4xz4x5befa01ahfl578w3dkxkbhuyoctcdeak',
                        systemId: 'fe08e1e3-efd7-4cdb-933c-373c08370b09',
                        systemName: 'lf73kpumhqrljzlc6qag',
                        executionId: 'c8608bd2-1fcf-4ff5-8096-7fcf4bce7f23',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 13:00:25',
                        executionMonitoringStartAt: '2020-07-28 11:09:29',
                        executionMonitoringEndAt: '2020-07-27 14:06:12',
                        cancelled: 3990421213,
                        completed: 4465022063,
                        error: 2333475309,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('61109516-b23e-4c66-9321-eb500634ea4a');
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
                    id: '61109516-b23e-4c66-9321-eb500634ea4a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('61109516-b23e-4c66-9321-eb500634ea4a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});