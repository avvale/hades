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
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'xjrjky1gy0pvxdx375gbls6dbo0s5mrlir5slenlf5ubpqg985',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: '7u3spgq0c4czr7lblkd7',
                version: 'hzr210wzqwt2nu2j1fyz',
                type: 'SUMMARY',
                executedAt: '2020-11-04 03:48:00',
                monitoringStartAt: '2020-11-04 04:35:07',
                monitoringEndAt: '2020-11-03 20:39:47',
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
                
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'y4ezxxy6ezdm4nmd5dqmphn72bvlq7o6hklmym4teia4ifz7n7',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: '368opo7prz7w1280b2et',
                version: '2gl33wcpz1p4kly53qgi',
                type: 'SUMMARY',
                executedAt: '2020-11-03 14:42:27',
                monitoringStartAt: '2020-11-04 06:19:36',
                monitoringEndAt: '2020-11-04 00:09:09',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: null,
                tenantCode: 'hw7a913swfw1g07avkcro59jnj2vkn58pv9trdqryt5sgx5ijj',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: '5wd9lpijvk9yyfnsjb5a',
                version: 'oif5vd1vlhuo72a1ifvn',
                type: 'SUMMARY',
                executedAt: '2020-11-04 02:15:48',
                monitoringStartAt: '2020-11-04 12:17:03',
                monitoringEndAt: '2020-11-04 07:47:34',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                
                tenantCode: 'lj6z5oju2381x85wlwkw2tl6uh2u6sgonaqe8yrogivgvjaet3',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'b2eg1q09us9yp6o0y4ll',
                version: '7v9hwde15kk245iz7b2d',
                type: 'SUMMARY',
                executedAt: '2020-11-04 07:42:40',
                monitoringStartAt: '2020-11-04 04:38:50',
                monitoringEndAt: '2020-11-03 21:15:57',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: null,
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'e9zre6zfmcy00t1gizbi',
                version: 'n6lqvjdv50fhpk9dvbdk',
                type: 'DETAIL',
                executedAt: '2020-11-04 01:26:45',
                monitoringStartAt: '2020-11-04 03:42:41',
                monitoringEndAt: '2020-11-04 01:16:20',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'lggjitbzi0ve7meh9vz5',
                version: 'lpjjzgjzpiw1g8cpqu4f',
                type: 'DETAIL',
                executedAt: '2020-11-04 11:45:38',
                monitoringStartAt: '2020-11-03 21:07:47',
                monitoringEndAt: '2020-11-03 15:49:31',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'evmtwbv96pu6b6jdf8biiaoiiss4gubzjfi1baaen7gy9yl0ik',
                systemId: null,
                systemName: '5jpi79hluhy1jjvyhpcp',
                version: 'l87nz13v9rbco3akqi23',
                type: 'SUMMARY',
                executedAt: '2020-11-04 00:56:36',
                monitoringStartAt: '2020-11-03 16:40:06',
                monitoringEndAt: '2020-11-04 12:52:45',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'iemogemp75hhanz5y85n0h5rx58tph78dckwdpi80qz5jp644g',
                
                systemName: 'ge8dp62bdfjwdo5ori8z',
                version: 'uhkdo40zzvuidx08t359',
                type: 'SUMMARY',
                executedAt: '2020-11-03 22:25:13',
                monitoringStartAt: '2020-11-03 16:47:06',
                monitoringEndAt: '2020-11-03 16:25:02',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'ivmurezvp96x8sua6q0am7zt7fyn8dgusoqfsk80aq6osmr7iy',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: null,
                version: 'v7ck462b370t50vim4sy',
                type: 'DETAIL',
                executedAt: '2020-11-04 07:40:20',
                monitoringStartAt: '2020-11-04 06:43:57',
                monitoringEndAt: '2020-11-04 05:02:36',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: '5kzppmlz0vcsxp8lo5hkh8q2tqszdxox6fj3dypj8u2jgic65g',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                
                version: 'ggkvjcxe5eobmwxn2dtc',
                type: 'SUMMARY',
                executedAt: '2020-11-03 15:19:58',
                monitoringStartAt: '2020-11-03 23:56:20',
                monitoringEndAt: '2020-11-04 03:25:37',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'abb9b1933q3ssk9qekt514na3rdf4oi01bghkgb1vzywcnmlla',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: '0153zbia9hhhjk82tx09',
                version: null,
                type: 'DETAIL',
                executedAt: '2020-11-03 18:00:42',
                monitoringStartAt: '2020-11-04 00:12:41',
                monitoringEndAt: '2020-11-03 19:51:36',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'h6cgu7fdyoeyvn9tvlw7wxj3svkcktlu6n4wmegnjdj79jdpz3',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: '6s80hyg9fqsb8mu3celv',
                
                type: 'DETAIL',
                executedAt: '2020-11-04 10:45:25',
                monitoringStartAt: '2020-11-04 01:46:43',
                monitoringEndAt: '2020-11-03 17:25:40',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'ajtpufe0hbsuvtd1q1e4am7n26a721bqeq2rtrb2zb3zdmz07b',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: '1jqnqbcqc2pnq3lm4lor',
                version: 'uhh81mk12aiazn2l283g',
                type: null,
                executedAt: '2020-11-04 05:26:10',
                monitoringStartAt: '2020-11-03 18:40:00',
                monitoringEndAt: '2020-11-04 10:53:27',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'axw92ar8v9ngkfyddz5lb5jumkewvdgvo3nhdfy9t55dz508o8',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'm9kf10436hopdj9yt9xm',
                version: 'ja20lkkvqi5c4mvo19k0',
                
                executedAt: '2020-11-04 02:15:08',
                monitoringStartAt: '2020-11-03 19:10:27',
                monitoringEndAt: '2020-11-03 21:22:21',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'w5uvi3kkzxv0nb053dxzvqkjjl4cmlsk5a49pwlpc7r2cmcndi',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: '91vusf3oh1m6sbiyfayn',
                version: '4d4f85avok1lpzyx18y0',
                type: 'SUMMARY',
                executedAt: null,
                monitoringStartAt: '2020-11-03 17:36:26',
                monitoringEndAt: '2020-11-04 09:02:40',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'x7ju5qhz8qn47doc5x2s1htlezm8t38ubu01zx6z2c9ypyoitt',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'alytwl2ool3ni0kkj13s',
                version: 'urnf38s32760esxa487l',
                type: 'SUMMARY',
                
                monitoringStartAt: '2020-11-04 12:06:14',
                monitoringEndAt: '2020-11-04 09:28:21',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: '6edw0c5wd9zyn1cxlpowbxnqxkwu3pnuizng11gxbs3m8itzpy',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'ow8dleskv4fcl859vl9g',
                version: 'pe6qwnrp7znfs2c7qbnq',
                type: 'SUMMARY',
                executedAt: '2020-11-04 00:58:14',
                monitoringStartAt: null,
                monitoringEndAt: '2020-11-03 22:07:50',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: '00vj236zgeapsawfl85tcxwh20hn4bc3bnunvsv3qnsjkfmxas',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'qmrgj2qpiqykiwhftmpn',
                version: 'jzm5ojyz1t078qiv43sb',
                type: 'DETAIL',
                executedAt: '2020-11-03 14:25:36',
                
                monitoringEndAt: '2020-11-03 20:13:56',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'pv6d7wdogfz9erer3qxqc07wbezmbb5w4cpye6yxn6emtivxzo',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: '78kennt8lx1ha4lxxfl3',
                version: 'qypve9xm7j7uf7xo6kf5',
                type: 'SUMMARY',
                executedAt: '2020-11-04 07:18:49',
                monitoringStartAt: '2020-11-04 00:06:29',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: '88s4osm4cje0dse4jj4544jblkmtii0u8x7b5ewnj7br4c71i5',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: '0sxhvo25h048ojrjjlk2',
                version: 'yckpjejevjme974x07yh',
                type: 'DETAIL',
                executedAt: '2020-11-03 17:18:10',
                monitoringStartAt: '2020-11-03 20:05:10',
                
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
                id: 'r055wvmizeoqesmt7g58c9vjulmrjdvvvnzdi',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: '0aztx5bxvia0i52l8kji2u7c1qm9stg6y9vllefi59693iepl4',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'fyzts8nzc7a5sms78vin',
                version: '4k5viukf7a3ad9k0qc7x',
                type: 'DETAIL',
                executedAt: '2020-11-04 02:31:46',
                monitoringStartAt: '2020-11-04 07:11:53',
                monitoringEndAt: '2020-11-04 10:29:26',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: '5kz0t8ev7h9btwid7beunlkft0fy1m0aklun3',
                tenantCode: 'be8tsrjsjv1zt6hdasd0m2scfd38ivz5g12fngec6uxku5ck3b',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: '9t88wc8bom35yq3u2umh',
                version: 'k8fj4vun4n6id2nzjth1',
                type: 'DETAIL',
                executedAt: '2020-11-04 09:49:34',
                monitoringStartAt: '2020-11-03 16:55:31',
                monitoringEndAt: '2020-11-03 23:33:07',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'uk8f4bkoed1prsrgegbxe7auuo2aomwnc0paz3nflrbe47n6w7',
                systemId: 'qkjhbn3pvjjnaz3pr8elnp52vad4tszbki05r',
                systemName: 'ftbl9pi2tqt6mxgtdbvk',
                version: 'frhee0jot3ujf4xctoaz',
                type: 'DETAIL',
                executedAt: '2020-11-03 15:13:22',
                monitoringStartAt: '2020-11-04 07:41:06',
                monitoringEndAt: '2020-11-04 06:36:45',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'i3cfi1etsd2b0u1ivtghqdq2lhwa460j9y9wtgb750fhj23ccqk',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'e2do04s7udn7uu9wc91h',
                version: 'p6k3v6af3ipo43jaeiva',
                type: 'DETAIL',
                executedAt: '2020-11-04 10:39:15',
                monitoringStartAt: '2020-11-04 02:15:30',
                monitoringEndAt: '2020-11-03 19:52:37',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'bfifqi4o53wlcv2wt96l5fqnyknhnxo70p40xjyub9hz4t083r',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'oiqu6shbqb1g3nmyxasbm',
                version: 'ycrsuzvyhf30d3944vx5',
                type: 'SUMMARY',
                executedAt: '2020-11-03 18:41:01',
                monitoringStartAt: '2020-11-03 14:56:15',
                monitoringEndAt: '2020-11-04 10:34:45',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: '7zj46umsqj886slpi02q286qtajnb5g901kyippsynt5sg0nup',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'raond76wypqn0nvdrqn2',
                version: 'awct8ktxuilwbq9uphnrg',
                type: 'DETAIL',
                executedAt: '2020-11-04 00:55:58',
                monitoringStartAt: '2020-11-03 21:02:39',
                monitoringEndAt: '2020-11-04 03:17:58',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'xz8sbpz2trk3ij77ywplc0eu2mz82jvi6yllyupq58oy1dl2rj',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'o0utids3lbhwn1hokzfg',
                version: '39lv9a8wmwekk6g4uozq',
                type: 'XXXX',
                executedAt: '2020-11-04 11:24:28',
                monitoringStartAt: '2020-11-03 22:49:58',
                monitoringEndAt: '2020-11-04 01:51:48',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'iyohbtn93fdg215i61snyggc7ejje3zknth4askuoawsog86kk',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'c3876m8amxijxj066zjr',
                version: 'a1u3k3ivn1z4vwms4c6k',
                type: 'SUMMARY',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-11-04 05:21:16',
                monitoringEndAt: '2020-11-03 16:39:18',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'lhawuh0kboegz04fr2let5jn53v79fwcac19mx43xjlv9mh1g4',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'nklg7sbi701iqkbgw6nd',
                version: '4ajzdtfpqef1lynjdke5',
                type: 'DETAIL',
                executedAt: '2020-11-04 05:54:25',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-11-04 10:24:21',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: '7fy4cdbyehgtkduwc41jga1zexa1apt4d1cxqa047msuejhf0e',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'p1r218zrjwax1dn418dg',
                version: 'sr7d07rzyt3dfj40u8lp',
                type: 'DETAIL',
                executedAt: '2020-11-04 11:18:31',
                monitoringStartAt: '2020-11-04 13:08:19',
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
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'jedhk9mcbboy2j02s56o7wqfscbk625b35qen5anzrfa1ztw17',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: '5z5inmy490gj1ufi7pp4',
                version: '72k8ee2q33hhtwxkhxa2',
                type: 'DETAIL',
                executedAt: '2020-11-03 18:03:11',
                monitoringStartAt: '2020-11-04 13:12:57',
                monitoringEndAt: '2020-11-03 14:13:23',
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
                        id: '8cebf738-292d-4adc-9abc-5359f3def960'
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
                        id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b'));
    });

    test(`/REST:GET cci/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/9d3c76ca-3e3d-4065-bdfb-30a268160d2a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/9e0228b9-6c36-443e-a4ca-8fb2c01fa67b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b'));
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
                
                id: '7162aa75-bd60-4a70-b2dd-6d86a2f97230',
                tenantId: '80c119bc-5ff5-4f20-862b-4b6f0aafbea9',
                tenantCode: 'tyg255wzsi0u1b11jb2re558mdseigq1ab0ueldqdf17xmxj94',
                systemId: '1f11a6a3-b244-4f83-9dea-9eb2c2711b5e',
                systemName: '3w8es0tnd9qkxsiskx52',
                version: 'z8l9ti7lrudl4pi7722o',
                type: 'SUMMARY',
                executedAt: '2020-11-04 07:58:18',
                monitoringStartAt: '2020-11-03 16:45:42',
                monitoringEndAt: '2020-11-03 17:58:00',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                tenantCode: 'w3al534avsd55fe7udi0gh1klf7e0r4xp6ni7c2o5jxkdy1pu1',
                systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                systemName: 'dpxa9wuifb7lel5ehdqx',
                version: '2n62b04fdcq36mgay83e',
                type: 'SUMMARY',
                executedAt: '2020-11-03 17:06:34',
                monitoringStartAt: '2020-11-04 05:14:01',
                monitoringEndAt: '2020-11-03 22:58:28',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b'));
    });

    test(`/REST:DELETE cci/execution/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/a2b5544c-f79d-4783-acc5-2a9d75bd687d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/execution/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/9e0228b9-6c36-443e-a4ca-8fb2c01fa67b')
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
                        id: '95650f99-48fb-4387-a289-63df7d00a464',
                        tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                        tenantCode: '3h1izveapbheyg1rhooavcpcfbqzodxge9yoogcbcssfh22qf8',
                        systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                        systemName: 'hsarpbkxm5zgqlx1ygfl',
                        version: 'sc958ei23s1t8azbtqe0',
                        type: 'SUMMARY',
                        executedAt: '2020-11-03 22:20:40',
                        monitoringStartAt: '2020-11-04 12:19:19',
                        monitoringEndAt: '2020-11-04 11:57:16',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateExecution).toHaveProperty('id', '95650f99-48fb-4387-a289-63df7d00a464');
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
                            id: '323b395f-35ae-4ec6-9c11-c98d2d4a91f6'
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
                            id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecution.id).toStrictEqual('9e0228b9-6c36-443e-a4ca-8fb2c01fa67b');
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
                    id: '54122ec9-7514-4c26-98f3-2fd9f7f6d65c'
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
                    id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecutionById.id).toStrictEqual('9e0228b9-6c36-443e-a4ca-8fb2c01fa67b');
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
                        
                        id: 'b03851c9-e43f-4909-a7e7-17e87bc7467c',
                        tenantId: 'f23dcdbb-9d7b-47bc-8ec8-80ac8d70e933',
                        tenantCode: 'c6b49xyl6yq19zywww87qphtoj79yooxfdf19tf25c3ppvxrwk',
                        systemId: 'f660aa67-3bcd-4d5f-b7d9-dde2a25a47f0',
                        systemName: 'sf4j00j7mod7sgxmn2wt',
                        version: 'i2cknx759zescqsvcnrm',
                        type: 'SUMMARY',
                        executedAt: '2020-11-04 11:41:01',
                        monitoringStartAt: '2020-11-04 07:24:44',
                        monitoringEndAt: '2020-11-03 23:02:56',
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
                        
                        id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b',
                        tenantId: 'dc7a2078-d299-49af-affd-6d361630eab9',
                        tenantCode: 'ls0i7s5r4oc0hjz3y15g1oivcrt1o276rww32cfyq3t34mqmw7',
                        systemId: 'f7c8e8b8-3689-4d27-a79d-58e59c401e50',
                        systemName: 'nm6b1n51hx0l3fqq4a9b',
                        version: 'tgg8o2jcs2lyia2aeowv',
                        type: 'DETAIL',
                        executedAt: '2020-11-04 05:26:20',
                        monitoringStartAt: '2020-11-04 03:26:24',
                        monitoringEndAt: '2020-11-04 06:19:15',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateExecution.id).toStrictEqual('9e0228b9-6c36-443e-a4ca-8fb2c01fa67b');
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
                    id: '8c316ef2-d627-42c2-bc8f-1953b6e0ed86'
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
                    id: '9e0228b9-6c36-443e-a4ca-8fb2c01fa67b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteExecutionById.id).toStrictEqual('9e0228b9-6c36-443e-a4ca-8fb2c01fa67b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});