import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IExecutionRepository } from '@hades/bplus-it-sappi/execution/domain/execution.repository';
import { MockExecutionRepository } from '@hades/bplus-it-sappi/execution/infrastructure/mock/mock-execution.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('execution', () => 
{
    let app: INestApplication;
    let repository: MockExecutionRepository;
    
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
            .overrideProvider(IExecutionRepository)
            .useClass(MockExecutionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockExecutionRepository>module.get<IExecutionRepository>(IExecutionRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: 'zb6tw4azpyz70sum51eyrgsi9kkxs71gkkhqurwe5y8nuwpmup',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'q36m85t57yv7yixb1p7p',
                version: '6rxl9lvsh6eufw6ptuhk',
                type: 'DETAIL',
                executedAt: '2020-08-05 07:43:18',
                monitoringStartAt: '2020-08-04 16:39:22',
                monitoringEndAt: '2020-08-04 10:21:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: 'jxkjyz6ortn9dsdfjfz55e61sul1fikw8ud5nva4u6oo3dex57',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: '5v22x7kofq8ff2th1ktl',
                version: 'xcriluimoqpyuyisr6nz',
                type: 'DETAIL',
                executedAt: '2020-08-04 12:28:26',
                monitoringStartAt: '2020-08-05 05:32:32',
                monitoringEndAt: '2020-08-04 15:21:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: null,
                tenantCode: 'z6c7x4ejx9cj1hepklx1bhjino6ur044qnt3dgjjf3w8fd3pzh',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'f7ml1l0zn3azc23gv045',
                version: 'r0ln4kwjo5jmi5zkviea',
                type: 'DETAIL',
                executedAt: '2020-08-04 21:08:30',
                monitoringStartAt: '2020-08-04 11:28:26',
                monitoringEndAt: '2020-08-04 13:40:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                
                tenantCode: '4nwr2q2jf6loaya528k4sf8j13sz5fvdju0hxr5wilsp6wsgl0',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'pzehgmgk2chtcwr3wxi4',
                version: '5ill36gypqmvudtlcq5q',
                type: 'SUMMARY',
                executedAt: '2020-08-04 23:36:36',
                monitoringStartAt: '2020-08-04 20:45:21',
                monitoringEndAt: '2020-08-04 22:25:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: null,
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'yvo68ljm773mdlklhy7x',
                version: '334r7d86fn4t8rz6pfy8',
                type: 'DETAIL',
                executedAt: '2020-08-05 01:42:31',
                monitoringStartAt: '2020-08-04 12:01:37',
                monitoringEndAt: '2020-08-05 00:20:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'j7j8cs8yjsh8nf5oe3rn',
                version: 'r3huso2wcwxzqltwtkb5',
                type: 'DETAIL',
                executedAt: '2020-08-05 08:37:42',
                monitoringStartAt: '2020-08-04 09:18:52',
                monitoringEndAt: '2020-08-05 03:12:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: '841ce5jhjab1xv5c2lpuek3ppowbake8h1bjsxl04z5afz0k7d',
                systemId: null,
                systemName: 'x9je64b5qny3t2cqi66n',
                version: '0yylq24r02ncvdk7zkyy',
                type: 'SUMMARY',
                executedAt: '2020-08-05 02:42:35',
                monitoringStartAt: '2020-08-04 16:46:15',
                monitoringEndAt: '2020-08-04 17:58:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: 't8yslppc316jgid01g9sjkdl7vg84pt2gahd6ffaog7stbttx6',
                
                systemName: '3twd6xqnyk65lhdjbg00',
                version: '57xiby794uc1q4jm4t80',
                type: 'SUMMARY',
                executedAt: '2020-08-04 19:26:17',
                monitoringStartAt: '2020-08-04 09:58:49',
                monitoringEndAt: '2020-08-05 01:45:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: '3vkcw2paug3qmojrpsbi6z6vvsk25cyld5p3u2ehpezlmr0e3k',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: null,
                version: 's4g4pje9ib93h3bw690v',
                type: 'DETAIL',
                executedAt: '2020-08-05 01:41:21',
                monitoringStartAt: '2020-08-05 05:19:41',
                monitoringEndAt: '2020-08-04 18:27:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: '0bakh5k2fwnhoq4f7cu2rip01jqwk6yweo6ko7am9h1oxxkt2g',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                
                version: 'eupmgob0yaqmmivl7wsi',
                type: 'DETAIL',
                executedAt: '2020-08-04 11:51:01',
                monitoringStartAt: '2020-08-04 22:12:05',
                monitoringEndAt: '2020-08-05 07:27:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: '113by93ndmb50zopgeizz7zj5kjadpwxod6oni22kdd593iv40',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'lf7vr4uwq229prqd71tw',
                version: null,
                type: 'SUMMARY',
                executedAt: '2020-08-04 17:18:19',
                monitoringStartAt: '2020-08-04 17:15:12',
                monitoringEndAt: '2020-08-04 15:26:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: '8sydke55jtbrypjrugnrk5cwku9ot1pkjp7yh6bv3vekj6ew0w',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'w9ru6g48qeisfgmukihh',
                
                type: 'DETAIL',
                executedAt: '2020-08-04 20:18:32',
                monitoringStartAt: '2020-08-05 01:13:04',
                monitoringEndAt: '2020-08-04 22:23:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: 'b6rjpv4ml1de4inw32sj7bcev0vfae48039s8pz7yzn3hypmoc',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: '9botk1xggikshpzjp0vr',
                version: '5ctc588oupnxenvbay75',
                type: null,
                executedAt: '2020-08-05 00:02:31',
                monitoringStartAt: '2020-08-04 11:48:44',
                monitoringEndAt: '2020-08-05 03:40:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: '40by5av0sq57hufmtcnuyp1enqqr5q5vldvjbor6myynugpo7x',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'pw634lm1ojsgdmkgb5mc',
                version: 'vj9m4tw7d85lsfthwapp',
                
                executedAt: '2020-08-04 17:10:30',
                monitoringStartAt: '2020-08-04 16:59:43',
                monitoringEndAt: '2020-08-04 18:14:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: '9csre1jz5r3p7vlvihazvexvk5w5bwjl66dznvpxfa4htzc8bk',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'wwh39m03b79ktzud8euh',
                version: 'g1i3gx2w86q7ijbzx2im',
                type: 'DETAIL',
                executedAt: null,
                monitoringStartAt: '2020-08-04 09:58:11',
                monitoringEndAt: '2020-08-04 12:53:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: 'o6ijaqox462grdam0gzw2psfkbljo5jmayw8aepyclrtyux6jx',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'w4w2myj2n4rrvpgsrbjc',
                version: 'jsxof7bcvae06t02krg7',
                type: 'SUMMARY',
                
                monitoringStartAt: '2020-08-04 21:17:40',
                monitoringEndAt: '2020-08-05 08:34:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: '95n4qfeuhyi8dc5prhond142by3th5w8prvr8bff39v83kckkd',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'taahkyd27frw4jwm3pxv',
                version: 'l0nl8vrhz71dwseiyo9s',
                type: 'DETAIL',
                executedAt: '2020-08-05 05:19:43',
                monitoringStartAt: null,
                monitoringEndAt: '2020-08-04 15:09:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: '31jqcjyv9bm0bk1hvnbp1s21l60x9wd6q938msxbnzvqltesgg',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'ye9wo5dt705aoe5c0fmy',
                version: 'o9x49rvihod3r04ge88d',
                type: 'DETAIL',
                executedAt: '2020-08-05 00:23:37',
                
                monitoringEndAt: '2020-08-05 06:58:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: 'mfp75kqt65oq291jeu870bj7byz9et24hj6hjse87r8r8nkfbm',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'eti6pd26nzp1gwfq0u7s',
                version: '7vk7gbcw6wvc5mbi76f5',
                type: 'DETAIL',
                executedAt: '2020-08-04 16:05:21',
                monitoringStartAt: '2020-08-05 01:28:55',
                monitoringEndAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: 'mb8y1zoervgayx9q5yuw9bdmvgju70qwsy3t12x9tujz4ai8zj',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'cxgdprn7fuj36tbv4x0z',
                version: 'gtxk4wm0cmjhxbcym73t',
                type: 'SUMMARY',
                executedAt: '2020-08-04 11:16:40',
                monitoringStartAt: '2020-08-05 04:24:39',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'mb7nvt17lgv3vra5d0900v9g65802z1bz11o2',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: 'ptxcyu1r76sr55433klcbu7a0nyu1wt9ab5x1muhvfraad8hmn',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'rgfyv1qwo22ybpqn8lap',
                version: 'rqq4koytnff2n6ly9o9g',
                type: 'SUMMARY',
                executedAt: '2020-08-05 04:32:32',
                monitoringStartAt: '2020-08-05 05:03:21',
                monitoringEndAt: '2020-08-04 20:30:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: 'uhh9kn2mfx3ks28m5wr46u7tjttz9hgm8o5gl',
                tenantCode: 'm88jh469f9e7gft6rfydqaak5z1h04res1gi8a22yoqm34rpa5',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'pbxyevu2evm2vrx7hcrx',
                version: 'bp9ps96ci42apmzucc7a',
                type: 'SUMMARY',
                executedAt: '2020-08-05 04:07:37',
                monitoringStartAt: '2020-08-04 11:24:42',
                monitoringEndAt: '2020-08-04 16:57:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: 'ttela2b3sqnsx1jsfyggglaov18mcn8ns5m3mim2p3zg6nvl1w',
                systemId: '8z03qjglwzorzifjtdtdmg9x9vqvbuya361oa',
                systemName: 'lx3j844n4fyojo1i4k3r',
                version: 'dhymy6p6rimftm3ok6r2',
                type: 'SUMMARY',
                executedAt: '2020-08-04 14:08:19',
                monitoringStartAt: '2020-08-04 20:52:02',
                monitoringEndAt: '2020-08-05 02:58:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: '5kxcxft4jp6p0ibjmyhm9euvhbyumffonk6x0gahi8txyzee9sm',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'yi3mgpa0k75ii5fug5mi',
                version: 'dykybwoann49kr7o2rs0',
                type: 'DETAIL',
                executedAt: '2020-08-05 06:44:06',
                monitoringStartAt: '2020-08-04 18:55:50',
                monitoringEndAt: '2020-08-05 03:00:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: 'ay661meewad1597jkhx5s2s9s337yuilqhgws5sqo1vmvzht1o',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'h8j1l00di8qgniws7w3p1',
                version: '6dzmu9jtha28v5thjl9w',
                type: 'DETAIL',
                executedAt: '2020-08-04 13:18:16',
                monitoringStartAt: '2020-08-05 08:10:15',
                monitoringEndAt: '2020-08-04 16:05:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: '8wy92fnhtpbk8gnsoueywul8dffdkl3aa89p678v6gitfeqoqz',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'p095toukafi40fwqt9wh',
                version: '9ffi8l29kp8cmf1dw4917',
                type: 'SUMMARY',
                executedAt: '2020-08-04 21:01:51',
                monitoringStartAt: '2020-08-05 02:32:52',
                monitoringEndAt: '2020-08-04 23:04:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion is too large, has a maximum length of 20');
            });
    });
    

    

    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: 'r93z8efzfpzaq1581wxk586z7qljj2wg2esylv7ybrhxk8eg8i',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'u3k3lfi5olyfst5wnj9c',
                version: 'ed7icf6fajdai0apr4a7',
                type: 'XXXX',
                executedAt: '2020-08-05 01:16:25',
                monitoringStartAt: '2020-08-05 05:13:00',
                monitoringEndAt: '2020-08-05 05:30:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: 'swbff8vanbbi8xa18yizvpscu7bhy7a78jpyfskt7nwn9eonb5',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'zxclyq20vj6hhxxheh0x',
                version: 'nnfancsnfj7tami5tgns',
                type: 'SUMMARY',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-08-04 13:02:24',
                monitoringEndAt: '2020-08-04 15:10:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: 's8niqrruba8g6fo0axb694barticuyo6y2surkx9uoffaunvuj',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: '1r2yh3pizk7kugwltmiu',
                version: 'icn39j3f19vadmi6xb32',
                type: 'DETAIL',
                executedAt: '2020-08-04 09:50:18',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-08-04 12:33:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: '5y97eyhdxt7afwkaq01ouu8m1ezjhjng2907bnf59xw7c6ipaj',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'ikee6rigyfq4dyoufyg0',
                version: 'gyp13083y343jh7si56s',
                type: 'DETAIL',
                executedAt: '2020-08-04 22:07:20',
                monitoringStartAt: '2020-08-04 09:09:33',
                monitoringEndAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: '1tto77a7ptzbk16x31rizlanl6v2c5xjjrxjtgwl08gly636oo',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'w2pm923306guv872h7t2',
                version: '8mvyhlmhawgsokibu3t5',
                type: 'SUMMARY',
                executedAt: '2020-08-05 01:21:49',
                monitoringStartAt: '2020-08-04 09:43:08',
                monitoringEndAt: '2020-08-04 19:25:02',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/executions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/executions/paginate')
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

    test(`/REST:GET bplus-it-sappi/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '3689c4e9-bbde-4e59-baeb-282d03138faa'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '2c010dd0-ba10-41d9-9922-b30cda26fa5a'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2c010dd0-ba10-41d9-9922-b30cda26fa5a'));
    });

    test(`/REST:GET bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/622d748e-083f-4df3-a638-d7c9494a330f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/2c010dd0-ba10-41d9-9922-b30cda26fa5a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2c010dd0-ba10-41d9-9922-b30cda26fa5a'));
    });

    test(`/REST:GET bplus-it-sappi/executions`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/executions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '52a3e0f3-f99d-4d8b-8f29-79cb7159f3f8',
                tenantId: '3e5d7365-d65b-4dcd-95a8-56ec8be07fcf',
                tenantCode: 'tu136pvyxt54gq8ciwhflh3h02sclmvxk4f0svlp36cv95s9yi',
                systemId: '6e10d3c8-aae7-4f82-8716-fb46545d37e3',
                systemName: '7ua1ne3uia3xw7rv54pb',
                version: '4yhumnuw6vviwwapv0be',
                type: 'SUMMARY',
                executedAt: '2020-08-04 09:36:21',
                monitoringStartAt: '2020-08-05 05:43:12',
                monitoringEndAt: '2020-08-05 00:40:24',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                tenantCode: '0076cblizzfup4nu8qoy8dtptn23k67pbv81s6vzfs3ony3fjn',
                systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                systemName: 'cmska2tu6y0eyssxzb4q',
                version: 'i0nxcuekffms5zea1hjb',
                type: 'DETAIL',
                executedAt: '2020-08-05 04:02:29',
                monitoringStartAt: '2020-08-05 06:04:54',
                monitoringEndAt: '2020-08-04 19:43:07',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2c010dd0-ba10-41d9-9922-b30cda26fa5a'));
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/373003d8-64b5-4dc8-a9d2-d3a384454e7f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/2c010dd0-ba10-41d9-9922-b30cda26fa5a')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateExecution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateExecutionInput!)
                    {
                        bplusItSappiCreateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
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

    test(`/GraphQL bplusItSappiCreateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateExecutionInput!)
                    {
                        bplusItSappiCreateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
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
                        id: '2577552c-8d26-49f9-b68a-1e06b195b739',
                        tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                        tenantCode: 'kbbvv2so1h31ae2z9dbpi8zjz4n6zxatpgm5rj0nejveb7tfya',
                        systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                        systemName: 'un20bksoxalibqvjv8fg',
                        version: 'zl65tt56ly3xf31kxqfu',
                        type: 'SUMMARY',
                        executedAt: '2020-08-04 17:17:09',
                        monitoringStartAt: '2020-08-04 17:07:42',
                        monitoringEndAt: '2020-08-05 00:36:55',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', '2577552c-8d26-49f9-b68a-1e06b195b739');
            });
    });

    test(`/GraphQL bplusItSappiPaginateExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateExecutions (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateExecutions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateExecutions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateExecutions.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindExecution (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '9da69565-6c21-4483-b03c-fc13c87d23e4'
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

    test(`/GraphQL bplusItSappiFindExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindExecution (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '2c010dd0-ba10-41d9-9922-b30cda26fa5a'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('2c010dd0-ba10-41d9-9922-b30cda26fa5a');
            });
    });

    test(`/GraphQL bplusItSappiFindExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
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
                    id: '9795fdfd-f758-4c8a-af16-d658f6cc4b05'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
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
                    id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('2c010dd0-ba10-41d9-9922-b30cda26fa5a');
            });
    });

    test(`/GraphQL bplusItSappiGetExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetExecutions (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
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
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetExecutions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateExecutionInput!)
                    {
                        bplusItSappiUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
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
                        
                        id: '607a0c1b-5d35-4941-aa7c-537dce49351e',
                        tenantId: 'fc4f9ff2-7782-48e5-bd84-8613eef081b9',
                        tenantCode: 'w5rbuo0tyrr476kdvai2nf1sq2xg29jrqpzydo6a109ac85zv4',
                        systemId: 'cf3fb7bd-a345-43c3-8c5a-7abe958ec555',
                        systemName: 'azrb0sefey1op7sljuat',
                        version: 'vjxol7u89rwxitlchybk',
                        type: 'SUMMARY',
                        executedAt: '2020-08-05 07:13:31',
                        monitoringStartAt: '2020-08-04 10:49:20',
                        monitoringEndAt: '2020-08-04 17:02:37',
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

    test(`/GraphQL bplusItSappiUpdateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateExecutionInput!)
                    {
                        bplusItSappiUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
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
                        
                        id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a',
                        tenantId: '0289ef4f-03af-4258-9572-c4710ddf1b9e',
                        tenantCode: 'cn82me577p4h9b1j9mxfnnr3kwim9kvesnusbncik061pqwnoz',
                        systemId: '708a3cd5-650f-45f7-9db0-e84b19c3d1ed',
                        systemName: 'twupqg7jpw9gs3qp4mz9',
                        version: 'ipcwd9izrauc0jejms2n',
                        type: 'DETAIL',
                        executedAt: '2020-08-05 08:54:43',
                        monitoringStartAt: '2020-08-04 16:32:52',
                        monitoringEndAt: '2020-08-04 15:29:50',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('2c010dd0-ba10-41d9-9922-b30cda26fa5a');
            });
    });

    test(`/GraphQL bplusItSappiDeleteExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
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
                    id: 'f8995f0f-e6ff-42ec-b3e3-cc86cc68f52b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
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
                    id: '2c010dd0-ba10-41d9-9922-b30cda26fa5a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('2c010dd0-ba10-41d9-9922-b30cda26fa5a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});