import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IExecutionRepository } from '@hades/cci/execution/domain/execution.repository';
import { MockExecutionRepository } from '@hades/cci/execution/infrastructure/mock/mock-execution.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/execution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: 'iam96ua0ykpzxo7xp9sfio9vsq96t1iqyfsewqb9j3o5u64x57',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: 'njvmykov9k2ndq6lbmqj',
                version: 'l5o95r5pvh1px3zm250f',
                type: 'SUMMARY',
                executedAt: '2020-11-04 08:34:14',
                monitoringStartAt: '2020-11-04 03:43:43',
                monitoringEndAt: '2020-11-04 08:34:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: 'xmez7a6o0llbxvocpaehmbo8cf73qiy8zvkg1gn3wb0d85ftcm',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: 'yx9oj579111cr2z77720',
                version: 'x7b2rfv94mb4rda7knqh',
                type: 'SUMMARY',
                executedAt: '2020-11-04 15:26:29',
                monitoringStartAt: '2020-11-04 11:17:16',
                monitoringEndAt: '2020-11-04 05:04:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: null,
                tenantCode: 'hv68jle61oefl7hdu7leyd229r8hfipauo5b0exq28yyg507ae',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: 'p2xe6d077qzcsstbda4g',
                version: 'x6cvfuqi5d4pbv4zny72',
                type: 'DETAIL',
                executedAt: '2020-11-04 12:07:31',
                monitoringStartAt: '2020-11-04 00:25:14',
                monitoringEndAt: '2020-11-04 12:01:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                
                tenantCode: 'x73o6b9k71pdeeglb0yamj9njw1lpz8rih6b0capqqvq16lmmd',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: 'uheyzlcogtn33rbludyt',
                version: 'phizrxohw0hoqv7mar4c',
                type: 'DETAIL',
                executedAt: '2020-11-04 05:01:51',
                monitoringStartAt: '2020-11-04 05:03:19',
                monitoringEndAt: '2020-11-04 22:29:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: null,
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: '1ykxxdy8pw8sisz7yoov',
                version: '0y45ql425b3k4em4t333',
                type: 'SUMMARY',
                executedAt: '2020-11-04 18:50:29',
                monitoringStartAt: '2020-11-04 17:15:36',
                monitoringEndAt: '2020-11-04 14:52:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: 'zmt4hvwnokeofcfdh89s',
                version: 'hl20sdmcofzvj6j5gual',
                type: 'SUMMARY',
                executedAt: '2020-11-04 02:40:07',
                monitoringStartAt: '2020-11-03 23:11:29',
                monitoringEndAt: '2020-11-04 10:12:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: 'r285cyu4fv04lm1tbkl9penyvlhpl3rwtko57gjphft7kh4vmv',
                systemId: null,
                systemName: 'xfwwo7q1t18jln44dhtt',
                version: 'be66g8041eitvdai64ug',
                type: 'SUMMARY',
                executedAt: '2020-11-04 06:34:23',
                monitoringStartAt: '2020-11-04 22:20:25',
                monitoringEndAt: '2020-11-04 03:37:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: '1b0xl8nbetwhb1k5voom0da6nkillae4diih5fgul9nriw6g9s',
                
                systemName: 'iqyxnm6q8z3irjf7v7tw',
                version: 'ibc1v0b8bs589khpceq2',
                type: 'DETAIL',
                executedAt: '2020-11-04 09:45:33',
                monitoringStartAt: '2020-11-04 22:47:20',
                monitoringEndAt: '2020-11-04 02:49:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: 'vg3tly0v4t78abagupasqe1i17fr87jhvmg9nrvq11tjdy7g2n',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: null,
                version: 'qbt2sx4j3n8tigqglrec',
                type: 'SUMMARY',
                executedAt: '2020-11-04 05:40:55',
                monitoringStartAt: '2020-11-04 22:33:22',
                monitoringEndAt: '2020-11-04 11:37:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: 'w49yb59bpe53kitv95y3t5vtwp67p53p5wq07gsuv2yc4i4x2p',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                
                version: 'h4nkpc81ogxq63knnieg',
                type: 'DETAIL',
                executedAt: '2020-11-04 20:03:12',
                monitoringStartAt: '2020-11-04 04:03:12',
                monitoringEndAt: '2020-11-04 20:51:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: '3xmz15jtwxe32orbphrvf5fg9jisybmjufwvcqu3pitocy5gbw',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: 'kc7bg0rypqklchiff5j5',
                version: null,
                type: 'SUMMARY',
                executedAt: '2020-11-04 00:53:23',
                monitoringStartAt: '2020-11-04 09:45:04',
                monitoringEndAt: '2020-11-04 06:14:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: '91932ug5id5ozqoo9dxwau1ds91n6f8es2w7jlc6pjqczyec4m',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: '4uc4manwgr0ac161dbak',
                
                type: 'SUMMARY',
                executedAt: '2020-11-04 04:22:08',
                monitoringStartAt: '2020-11-04 12:45:42',
                monitoringEndAt: '2020-11-04 02:59:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: '6zvlbptr7ewdn8rtzi4cr4f7bwjjn9xrovy66aay49vt0iqlzk',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: '4tavhy3xnfdgsabpiiar',
                version: 'lrtie5rip6d99le1kzcp',
                type: null,
                executedAt: '2020-11-04 17:43:38',
                monitoringStartAt: '2020-11-04 09:12:01',
                monitoringEndAt: '2020-11-04 19:11:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: 'i2is9vbxxb4u1cur5kb9ux2ajqs32xndup3wtlnf2waa1pjmso',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: 'jf2dqj909yt5mp650vhw',
                version: '1moka7ql6v3gzcj98apc',
                
                executedAt: '2020-11-04 05:56:29',
                monitoringStartAt: '2020-11-04 13:23:33',
                monitoringEndAt: '2020-11-04 06:21:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: '5ndhk2xu46iyooni4sfqwcfbknru8tz49kpnlfbqfej2aed8m8',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: '9gq39rzj11b60f7itmtu',
                version: 'kknduinb9u0jjfs2v9ze',
                type: 'SUMMARY',
                executedAt: null,
                monitoringStartAt: '2020-11-04 15:37:58',
                monitoringEndAt: '2020-11-04 16:48:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: '9lfigut8gyigw7z2xra5daf1tuw2059icmsnoyvqa2yfmdcp0k',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: 'emb4bfb2n2bgxs8zr7dl',
                version: 'gmeolgt92ket7jgoe10i',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-11-04 04:51:58',
                monitoringEndAt: '2020-11-04 22:47:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: 'x8kbixmgf10sri5bp47zu93pg1c4riv65sxr4tf076pljdx488',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: '0thty2uvwedvheohza01',
                version: '96r9vp3zh4ael7wd8wwv',
                type: 'DETAIL',
                executedAt: '2020-11-04 20:38:41',
                monitoringStartAt: null,
                monitoringEndAt: '2020-11-04 06:07:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: 'b76u0js9c72hx9lhx2p4fd36cj9j9yg86wjyjeiifz0rk1yw5l',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: 'wwljna4l3b4hii5nocai',
                version: 'm3d81ihrhn97lx8sa1ug',
                type: 'SUMMARY',
                executedAt: '2020-11-04 15:31:37',
                
                monitoringEndAt: '2020-11-04 04:15:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: 'ft5qp6awx3fzlke8bmoafwy26fb8403yj45z8knkuts3n2g8mz',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: '8r355sh2nfzumfvjkrsz',
                version: 'f9kp7wficzv5g84vc5hq',
                type: 'SUMMARY',
                executedAt: '2020-11-04 07:51:05',
                monitoringStartAt: '2020-11-04 18:02:23',
                monitoringEndAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: 'vcdcjsg149lijph9cmqmicrwaf9ivztpr0b1onzjzedm56p3b3',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: '7q7kjn3c8ejs3ja8onrv',
                version: 'cbj3dcqhdvlcfuwxaia4',
                type: 'DETAIL',
                executedAt: '2020-11-04 03:14:32',
                monitoringStartAt: '2020-11-04 02:39:35',
                
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
            .send({
                id: 'ushwklcdpkah86jz2yhyfz5hna9mcwvlg6ui5',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: 'c1qw9r9inv9ea6sqqjdfkqa481crqj8hs46qlbletzdiotfyap',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: 'j60fu3187p92pznlx21g',
                version: 'age6jiu5y0b4elj4st9m',
                type: 'DETAIL',
                executedAt: '2020-11-04 19:58:15',
                monitoringStartAt: '2020-11-04 07:22:18',
                monitoringEndAt: '2020-11-04 16:32:13',
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
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '5dd9eaf6xbfjkmbz0t6ch7w7himexr6b7j0am',
                tenantCode: '3z1lk8ltjyfmh9wk143suh9td5urxqijuxneic9789oejztvpf',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: '95umbnctehru2q7c0tp1',
                version: 'h09hfoigie2oafi0e22e',
                type: 'DETAIL',
                executedAt: '2020-11-04 00:24:02',
                monitoringStartAt: '2020-11-04 19:21:38',
                monitoringEndAt: '2020-11-04 04:25:13',
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
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: 'uqyzyeiaelrc1kh4dz64gbkird8gonvkm4ee2xb0el5m7k9b84',
                systemId: 'pww7294fqxfptjjix45wuo1cqydqubjuszbnn',
                systemName: 'ta4ryctlomtdnoch42si',
                version: '2jpadlmri493zgdfttpy',
                type: 'SUMMARY',
                executedAt: '2020-11-04 00:33:18',
                monitoringStartAt: '2020-11-04 05:33:42',
                monitoringEndAt: '2020-11-04 04:50:41',
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
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: '2xghqm7c3tpdc76z5gd4xvwng9zl07qtwpa6fc21w36y72eyj9s',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: 'y4fxejt3cmgnae9nv0w7',
                version: 'kbcn471qqznopua2zyix',
                type: 'SUMMARY',
                executedAt: '2020-11-04 18:23:28',
                monitoringStartAt: '2020-11-04 05:30:00',
                monitoringEndAt: '2020-11-04 04:21:30',
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
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: 'kftzm87lvtg8xb5go1x0imxfhtqsamjnbhcixpft2rkx5nnilx',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: 'eki5jjro1ymnm0pk45oxh',
                version: 'r0kmies7uqjlyv1qpehq',
                type: 'DETAIL',
                executedAt: '2020-11-04 13:05:22',
                monitoringStartAt: '2020-11-04 10:25:56',
                monitoringEndAt: '2020-11-04 22:01:51',
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
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: 'c6mnss5fc9jaj8iaxnz0a9uizi8vhfij2aag9ctmcybr3kdz4e',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: '6kn1v9l49vkg4ezf19mu',
                version: '71x35h44ia0rl3z962qwn',
                type: 'SUMMARY',
                executedAt: '2020-11-04 17:42:52',
                monitoringStartAt: '2020-11-04 22:25:16',
                monitoringEndAt: '2020-11-04 08:18:24',
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
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: 'xzgw3x0ml7veurmbbvqps7vq5wa762knr3xx1vz492pw2aovrp',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: 'vnuq6kxradmu5wac6kvn',
                version: '43z0te2vzo35pzsnzwx4',
                type: 'XXXX',
                executedAt: '2020-11-04 11:06:30',
                monitoringStartAt: '2020-11-04 12:39:04',
                monitoringEndAt: '2020-11-04 00:25:58',
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
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: '10rmyrnyh44nft8vslgkyif2vx4yxa4y4v8okr8o0xjdonf8yw',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: 'f2ounwko0z3bgzvzwwly',
                version: 'i9n64b6v3104epq07u03',
                type: 'DETAIL',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-11-04 19:25:54',
                monitoringEndAt: '2020-11-04 06:29:13',
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
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: '9ecwnov492jb9jqeb7ga8vt0np2x6q070a1luhesvafchndtj7',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: '90h97qxr6ayr0cc8zszr',
                version: 'u5vz3gqqd0s0ec7v77e7',
                type: 'SUMMARY',
                executedAt: '2020-11-04 09:22:11',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-11-04 15:22:09',
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
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: '1j0tvvsp32auhvspzf5flmzfqgmwjzdqtnxcrsr51a1rkv2e3j',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: '0o7qjtk3vbmxxhjkarlc',
                version: 'iztr78o9wa08vjtybob4',
                type: 'DETAIL',
                executedAt: '2020-11-03 23:52:00',
                monitoringStartAt: '2020-11-04 19:27:48',
                monitoringEndAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: '65n2g11w20faftsikav24ddy0vwyl657w695epol758smcrv1x',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: '831yi9v2k33jqgid2hp6',
                version: 'vprbmqv855o3h3pqc3gk',
                type: 'DETAIL',
                executedAt: '2020-11-04 16:47:48',
                monitoringStartAt: '2020-11-04 17:54:16',
                monitoringEndAt: '2020-11-04 21:46:53',
            })
            .expect(201);
    });

    test(`/REST:GET cci/executions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/executions/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'ae9cba92-b5bc-44b0-b869-6fd1103dd81b'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc'));
    });

    test(`/REST:GET cci/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/4271994f-5691-4b36-bbf4-0cb2a20447dd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/fd68d466-1d0f-4ebf-ae64-f6c0a34738fc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc'));
    });

    test(`/REST:GET cci/executions`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/executions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f5e8e150-b652-45f6-bad4-17cd786402d9',
                tenantId: '27fdb5a8-77ac-44d3-926d-999a3d965751',
                tenantCode: 'fpav76ohh0fl6cvvgnymw7gdk9uva1633h9izub7jtrn9s682s',
                systemId: '3205b92a-eb5b-4710-9667-9b3156a359c0',
                systemName: 'd58erb2l457a3v5r6dzc',
                version: '3hc18d8rn2ownasp9yii',
                type: 'DETAIL',
                executedAt: '2020-11-04 20:48:25',
                monitoringStartAt: '2020-11-03 23:32:09',
                monitoringEndAt: '2020-11-04 16:11:50',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                tenantCode: '1n9wbdojf3jpd8jyquv1ibvo6l7uxt984a6r64hfvk2n20ynst',
                systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                systemName: 'nfp05ku0tk16f2mwc2e8',
                version: '8chj2lswx658p926pfa2',
                type: 'SUMMARY',
                executedAt: '2020-11-04 05:42:34',
                monitoringStartAt: '2020-11-04 03:59:36',
                monitoringEndAt: '2020-11-04 22:01:36',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc'));
    });

    test(`/REST:DELETE cci/execution/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/63ab3290-b270-4574-a324-c13b95923315')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/execution/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/fd68d466-1d0f-4ebf-ae64-f6c0a34738fc')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateExecution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
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

    test(`/GraphQL cciCreateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '261f84ae-4e5c-48a1-87d0-12908c9d94db',
                        tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                        tenantCode: '8rp53zecbpjy1eh6q458jtxi45448lakdbaslg6scujddgbag4',
                        systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                        systemName: 'rkof0u6ficacx9ffkkxx',
                        version: '5s32z1ce5hsx2h9yf57w',
                        type: 'SUMMARY',
                        executedAt: '2020-11-04 02:59:13',
                        monitoringStartAt: '2020-11-04 02:10:59',
                        monitoringEndAt: '2020-11-04 17:01:47',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateExecution).toHaveProperty('id', '261f84ae-4e5c-48a1-87d0-12908c9d94db');
            });
    });

    test(`/GraphQL cciPaginateExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                expect(res.body.data.cciPaginateExecutions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateExecutions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateExecutions.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            id: 'c2522843-93f3-4128-8c12-262dd19609ca'
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
                            id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecution.id).toStrictEqual('fd68d466-1d0f-4ebf-ae64-f6c0a34738fc');
            });
    });

    test(`/GraphQL cciFindExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '971598c7-6d90-4839-837b-f17d1a71a69d'
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
                    id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecutionById.id).toStrictEqual('fd68d466-1d0f-4ebf-ae64-f6c0a34738fc');
            });
    });

    test(`/GraphQL cciGetExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        
                        id: '1a43f839-4451-43c4-8422-37ba97f1ad21',
                        tenantId: '31bfc92b-5bd4-4f6a-8f8e-375cc79e7971',
                        tenantCode: 'lt6zkf5bf3f2rs5vs4dwteub0ixkuvcqujevynxx9j0ikfbdqt',
                        systemId: '69ec500a-283d-4ab2-b2bc-66521de6ae4a',
                        systemName: 'bwmtb0yo32nhbjl8wgie',
                        version: '664j9j1qd27g6bo92o5i',
                        type: 'DETAIL',
                        executedAt: '2020-11-04 08:12:59',
                        monitoringStartAt: '2020-11-04 13:42:19',
                        monitoringEndAt: '2020-11-04 05:45:18',
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
                        
                        id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc',
                        tenantId: '252846d4-267c-4ea0-b36a-ccee1cfe854c',
                        tenantCode: '1gee52cjf6ht78r4qtei5lzz5xoaq1oaemjpy44aaxoy78yl3o',
                        systemId: 'f937fb60-968f-46fc-8758-b0916c3da310',
                        systemName: 'u4g20bpayiozqgaci6lp',
                        version: 'ra3jn142bv7j9k8po1wf',
                        type: 'DETAIL',
                        executedAt: '2020-11-04 05:18:30',
                        monitoringStartAt: '2020-11-04 19:57:17',
                        monitoringEndAt: '2020-11-04 22:30:32',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateExecution.id).toStrictEqual('fd68d466-1d0f-4ebf-ae64-f6c0a34738fc');
            });
    });

    test(`/GraphQL cciDeleteExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '871cddfa-2778-471e-be2d-b63372cdfafb'
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
                    id: 'fd68d466-1d0f-4ebf-ae64-f6c0a34738fc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteExecutionById.id).toStrictEqual('fd68d466-1d0f-4ebf-ae64-f6c0a34738fc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});