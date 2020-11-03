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
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'v1u5xy3lw0twi2l7ci611osbssycv8pr20phha4uw8n6d1iyo5',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'bkxptxejit0dqfotelum',
                version: 'vd6fyko81vi07oup0w2h',
                type: 'DETAIL',
                executedAt: '2020-11-03 01:26:26',
                monitoringStartAt: '2020-11-03 10:00:57',
                monitoringEndAt: '2020-11-03 11:45:41',
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
                
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'vt5johni5idft817vaqsdf5iv38ubftcr1xqpfjl10owckg7ey',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: '6r6lxwih3brb5523acvz',
                version: 'posgzkudsh0p6xidhfpd',
                type: 'SUMMARY',
                executedAt: '2020-11-03 07:19:37',
                monitoringStartAt: '2020-11-03 10:42:38',
                monitoringEndAt: '2020-11-02 16:11:10',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: null,
                tenantCode: 'vjk69y1kpacclssqemma581bahb3lega5cmlmw6egts4y5xq1f',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'gadyllpm2njja9y2z1pq',
                version: 'e4zkb31pkf05gt1s05eu',
                type: 'SUMMARY',
                executedAt: '2020-11-03 13:16:40',
                monitoringStartAt: '2020-11-03 07:51:13',
                monitoringEndAt: '2020-11-03 06:04:56',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                
                tenantCode: '2jykj406lol636mbwvw4cvsrbz688jhbzh4amtqi65oe28eqot',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'sxiqgxc0lhyfq4k2n5c0',
                version: 'qwwzy5w1tck0pvz5n4al',
                type: 'DETAIL',
                executedAt: '2020-11-03 06:52:40',
                monitoringStartAt: '2020-11-03 09:10:40',
                monitoringEndAt: '2020-11-03 10:49:55',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: null,
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: '3oqotpi10xzobuuirlt0',
                version: '723qajdwgdxrhhqp9u6b',
                type: 'DETAIL',
                executedAt: '2020-11-03 08:41:30',
                monitoringStartAt: '2020-11-03 01:35:39',
                monitoringEndAt: '2020-11-03 00:22:38',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'yfvniqckgbj646xis6d2',
                version: 'lg2ks8bi4maogwtajc3d',
                type: 'DETAIL',
                executedAt: '2020-11-03 03:51:48',
                monitoringStartAt: '2020-11-02 14:55:49',
                monitoringEndAt: '2020-11-03 11:14:17',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: '7a6clvvg7mo6cufhv6uxk8wvcar18e3ap04q0070z3iqosrv9k',
                systemId: null,
                systemName: 'z2han80ujk16hb20rbus',
                version: '6lqsgf5hs6ji5b7gkv1b',
                type: 'DETAIL',
                executedAt: '2020-11-03 12:25:15',
                monitoringStartAt: '2020-11-03 05:12:31',
                monitoringEndAt: '2020-11-02 14:40:47',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'pt2twubfll0xabcyuktc0b8uyb2c1zqzi7nb896yp5er8knuf9',
                
                systemName: 'emvo7bttq9c900q12w8h',
                version: '5w486f2xd4syan7qm2sq',
                type: 'DETAIL',
                executedAt: '2020-11-03 01:04:09',
                monitoringStartAt: '2020-11-02 19:05:09',
                monitoringEndAt: '2020-11-03 04:04:00',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'aig6dcrh8ijwiawo81ytxup5bto1u1ovnb9da9qrz0jxfju28d',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: null,
                version: 'lpr9hbqbtpozqipdfsns',
                type: 'DETAIL',
                executedAt: '2020-11-02 21:30:54',
                monitoringStartAt: '2020-11-03 00:32:30',
                monitoringEndAt: '2020-11-03 01:02:34',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: '0eieau73z8wd6ad1qyxycuiondve959jsfssamjs9seloq15wt',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                
                version: '2tcyn4dr62ceoy8vasyl',
                type: 'DETAIL',
                executedAt: '2020-11-03 07:18:23',
                monitoringStartAt: '2020-11-03 00:08:26',
                monitoringEndAt: '2020-11-03 12:37:14',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'rtog5200zjqo619dqdqa3zzjxh78psxi42per9w4z0os9g6c4u',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'eyeheagy9tl3538pvg4l',
                version: null,
                type: 'DETAIL',
                executedAt: '2020-11-03 06:30:22',
                monitoringStartAt: '2020-11-03 00:35:39',
                monitoringEndAt: '2020-11-03 08:24:10',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: '00zwhy0ywlbq6u3gtga9vg9ord8eohfoabqduiwvqxp7j9tlnq',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'bz1u5h041s1tmnczlofl',
                
                type: 'SUMMARY',
                executedAt: '2020-11-02 16:44:29',
                monitoringStartAt: '2020-11-02 15:03:26',
                monitoringEndAt: '2020-11-02 19:34:25',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: '77dtog08lc4dr52gnewtqnwsvl0o19m2yk3g8xdb6gqx72o43n',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'us2jixs53zow7yeefy1r',
                version: '21zeriw9otnve6kqfs3l',
                type: null,
                executedAt: '2020-11-03 02:22:51',
                monitoringStartAt: '2020-11-02 19:31:17',
                monitoringEndAt: '2020-11-02 21:55:56',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: '369d5oodbtseqltlwesx8la1tym97tjt8zpx7uc0fr8yfw3wqc',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'zspd82mbsqfox33twda7',
                version: '77gey06gkgoxum071uyl',
                
                executedAt: '2020-11-03 07:31:15',
                monitoringStartAt: '2020-11-03 05:16:13',
                monitoringEndAt: '2020-11-02 15:33:23',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'j1ku0hnled2ue1z2ffsl9ahoo5llqwg3bfoqqm3uqqxvtcznjw',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'c3fkpqd0mm7wdf0q5l92',
                version: '8vtiud7eiobgi1lm8xuc',
                type: 'DETAIL',
                executedAt: null,
                monitoringStartAt: '2020-11-02 17:06:21',
                monitoringEndAt: '2020-11-03 00:07:56',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'gwwcega5evp5zztwyv6s4m8ijo63r4h1j6fv0qdsca5ni0yi6y',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: '33qxxgs1cz108uvaj8kz',
                version: 'rnaus0r53wccevuzp1bc',
                type: 'SUMMARY',
                
                monitoringStartAt: '2020-11-02 22:13:11',
                monitoringEndAt: '2020-11-02 20:25:52',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: '1s2t3jviv1kjauijm4ofo76gydbrm495ddyx04re0282ggqtzu',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'exnwc7ejwpuk137eh5be',
                version: 'doeziw9b9i6insokuygm',
                type: 'DETAIL',
                executedAt: '2020-11-03 01:56:52',
                monitoringStartAt: null,
                monitoringEndAt: '2020-11-03 08:26:36',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: '2dp6empti44aorlouai9y0kxpufn1j56ymf54y0817upqyk3j1',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'ovzv3252oqx00k3w1in4',
                version: 'y85bl7czm57q7oqz6da6',
                type: 'DETAIL',
                executedAt: '2020-11-03 06:27:16',
                
                monitoringEndAt: '2020-11-03 03:42:39',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: '2dj2pyaouwtxvk0b4cvhsopiyek8wup1qdgb02atysq7xawm5g',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'qk76icsmlayoxgdgkwd9',
                version: 'v2qimggt78ztp4qgwjgl',
                type: 'DETAIL',
                executedAt: '2020-11-03 00:09:30',
                monitoringStartAt: '2020-11-03 02:41:50',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: '2ahi5rxeyyi7k42y5d1e867kx8tiojha1ov9t24vmepnb2e1o0',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'q5cn2xouzrpjnvaq9thr',
                version: 'ddqek6pv775t2jd1bmr5',
                type: 'SUMMARY',
                executedAt: '2020-11-03 03:00:36',
                monitoringStartAt: '2020-11-03 09:27:58',
                
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
                id: '2n9g45qcps8nu4cdv9vfni2gkg0zv6s5u426d',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'cbhjrj7g0v1sqlwlo5unxlfypmaoezfb34kyaeuwe5cniaybnn',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'rtarjfsscrm7lzg6bbib',
                version: 'dd6zqj0vp973i74njsg5',
                type: 'SUMMARY',
                executedAt: '2020-11-02 20:34:02',
                monitoringStartAt: '2020-11-03 02:54:09',
                monitoringEndAt: '2020-11-03 07:08:38',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: 'lrxx7j9qb8pwj32kvvlqfd3av8akbqcdp2nlk',
                tenantCode: '13msc5wu2hc51imzu4ywjwgm0k4nmi0n66qe6kjuf3wxi4mr2t',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'tsyrpdhs09244bp0nnwx',
                version: 'b7d1u4lxaso4wzzcbv9s',
                type: 'DETAIL',
                executedAt: '2020-11-03 01:02:45',
                monitoringStartAt: '2020-11-02 22:15:03',
                monitoringEndAt: '2020-11-02 17:24:50',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'tg1so1suh9oquwm73wnzujt2sruegdbsrz2enry38y7qtgfop5',
                systemId: '9c2vm5amxzum9xpfm6y4qcgdx57x2g4cjp8a8',
                systemName: 'pqhlq8iwid58gp3o5v4k',
                version: '6vtrbgl0b6oxjdu4xw04',
                type: 'SUMMARY',
                executedAt: '2020-11-02 18:03:37',
                monitoringStartAt: '2020-11-02 16:20:57',
                monitoringEndAt: '2020-11-02 20:44:34',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'n0yh8gkblwr3uljht8y2wq4jsa8l1urhnhqog7ftgfduu4tu6hu',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'wuw8apesgeuqrnet4xyw',
                version: 'bezv5zl71jq5rfb4npz3',
                type: 'SUMMARY',
                executedAt: '2020-11-02 23:49:22',
                monitoringStartAt: '2020-11-03 09:23:54',
                monitoringEndAt: '2020-11-02 15:27:03',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'wypqr5a8qi1nbtek7sximkoq36m74no9bj19igw99eazxx92gi',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: '5hy8vpohihfta3xzkr4hx',
                version: 'i535kcug1zld17ndeep2',
                type: 'SUMMARY',
                executedAt: '2020-11-02 15:42:43',
                monitoringStartAt: '2020-11-03 00:47:07',
                monitoringEndAt: '2020-11-02 19:43:32',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'q2nwx68kljlmexbr6mppdbtvipmf3y7bjc38f39qsmn4tne214',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'i02bn7w1af4za1mudjdc',
                version: 'ua81f6x5w2cytrma3flbh',
                type: 'DETAIL',
                executedAt: '2020-11-02 21:30:46',
                monitoringStartAt: '2020-11-03 03:00:46',
                monitoringEndAt: '2020-11-03 11:12:26',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'ap0njkc16ia1aroamhtoel4xasvry9y2kjjsnjungniwnig5hz',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 's7eqxz6j9cbok29d6fis',
                version: 'wf0fx59ybgv4x2m17f8b',
                type: 'XXXX',
                executedAt: '2020-11-03 03:30:32',
                monitoringStartAt: '2020-11-02 20:49:57',
                monitoringEndAt: '2020-11-03 02:06:04',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'rvzibrxetmns4dfiiaufbil71f05w4j3rsddxyng1pp5inft6l',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'x8qecp61lx1a3y6f5jf5',
                version: 'jiteegru7s4pg5lmmis0',
                type: 'SUMMARY',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-11-03 04:01:21',
                monitoringEndAt: '2020-11-03 12:51:54',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: '1tvne5e1ghd9x9ugwzba3s1f1qygqcbro5iydqmeyid5zqip10',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 't8h9g22pzwg0rdv3zxzl',
                version: '4fa0ceg9edwhmjnfi7ej',
                type: 'DETAIL',
                executedAt: '2020-11-03 12:12:58',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-11-03 04:17:42',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'mebcxfmc5caj8xf70p1bn2xjco71dlk7rovx1fffcgw4en1a5i',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'x74drp1dbmbz7plhgteb',
                version: '46yy7u5396bb7ihxfkex',
                type: 'DETAIL',
                executedAt: '2020-11-02 18:46:11',
                monitoringStartAt: '2020-11-03 07:31:58',
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
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'odei5jl3tcm75ia6o7b2528h1g8pch6djn5q4w8y92cv7a9vv9',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: 'cox2ju0vsg4gfnke420m',
                version: 'jl11z0qn5k7qavyvvzxt',
                type: 'SUMMARY',
                executedAt: '2020-11-03 12:40:12',
                monitoringStartAt: '2020-11-02 20:01:15',
                monitoringEndAt: '2020-11-03 08:45:33',
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
                        id: 'b0d9aed2-4a02-47b3-a642-cc81b432089d'
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
                        id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc'));
    });

    test(`/REST:GET cci/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/e9dda551-2354-4068-9506-091e6ac0c6b7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/79c9eb16-bf58-46dd-ba4d-de712bf9d7dc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc'));
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
                
                id: '51b62d83-2425-441e-bb42-7320b2a40616',
                tenantId: '7363963b-55b5-4b40-bf14-744c91804ee9',
                tenantCode: 'w9s25prrrc7dasd2l1ho7tkpwpy9t9jbsctfn2wgd7hez70oty',
                systemId: '0a7f409f-7128-405a-bf8d-f2eb1afe5410',
                systemName: 'c3be4ethxtnxyux6736d',
                version: 'q7lo4xrjxm8wstldti8i',
                type: 'DETAIL',
                executedAt: '2020-11-03 03:29:45',
                monitoringStartAt: '2020-11-03 03:50:21',
                monitoringEndAt: '2020-11-03 05:03:26',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                tenantCode: 'x69x6zwfxrdxiw3asp4z10p3m9ekighjy6uludwvmwwatd2m18',
                systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                systemName: '6dgoerh6srbnrs6zhv1y',
                version: 'lw63y6tvy8w7bv3eezpk',
                type: 'SUMMARY',
                executedAt: '2020-11-03 05:54:09',
                monitoringStartAt: '2020-11-03 10:55:29',
                monitoringEndAt: '2020-11-02 15:24:35',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc'));
    });

    test(`/REST:DELETE cci/execution/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/5580009c-f068-4efa-84e3-84e03d00a07a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/execution/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/79c9eb16-bf58-46dd-ba4d-de712bf9d7dc')
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
                        id: 'aa4fa161-edf0-4a5f-823e-21c88a8654e8',
                        tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                        tenantCode: 'zq5yliuyxyoyjp13pvvqcskyfeqzsqv67ut25a1qgu77y9pr6l',
                        systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                        systemName: '29ay80klw0oreck8vcot',
                        version: 'ickukba6kax0hxkdcgn3',
                        type: 'SUMMARY',
                        executedAt: '2020-11-03 04:35:41',
                        monitoringStartAt: '2020-11-03 04:59:47',
                        monitoringEndAt: '2020-11-02 17:20:18',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateExecution).toHaveProperty('id', 'aa4fa161-edf0-4a5f-823e-21c88a8654e8');
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
                            id: 'a71ed66f-0ef7-4f7d-9be6-2db002311341'
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
                            id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecution.id).toStrictEqual('79c9eb16-bf58-46dd-ba4d-de712bf9d7dc');
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
                    id: '81f804b5-8ef0-4ba8-9b83-b70be23289dc'
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
                    id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecutionById.id).toStrictEqual('79c9eb16-bf58-46dd-ba4d-de712bf9d7dc');
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
                        
                        id: 'c312f069-01a0-471d-8899-65808c658421',
                        tenantId: 'c4e933cc-088c-42c4-8213-bde5ffdc9f4f',
                        tenantCode: 'huamkmhg806nasoatswq66vs5vx2m2f0ph4pjhg4k2w8uax2bu',
                        systemId: '8727b4ff-389c-41de-b83b-08c83ce9c6ea',
                        systemName: 'fdkfchtrnsclq5ir4qo9',
                        version: 'mifinohcxgtbbnul947y',
                        type: 'DETAIL',
                        executedAt: '2020-11-03 00:01:17',
                        monitoringStartAt: '2020-11-02 21:16:18',
                        monitoringEndAt: '2020-11-03 10:11:09',
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
                        
                        id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc',
                        tenantId: '26be65ab-e54d-48f5-8176-5981e6ddbbe5',
                        tenantCode: 'kciwwa5alzmxpuhycv7du1scbu6bqb55mbi5weoar9bsju468c',
                        systemId: 'bffedd20-468b-477e-836c-b3275cd57f9a',
                        systemName: 'h76g0jk696dh8bcfvbcb',
                        version: 'c7afg3gvgsi7nnkzn5dt',
                        type: 'SUMMARY',
                        executedAt: '2020-11-02 22:47:13',
                        monitoringStartAt: '2020-11-02 17:09:24',
                        monitoringEndAt: '2020-11-03 04:33:51',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateExecution.id).toStrictEqual('79c9eb16-bf58-46dd-ba4d-de712bf9d7dc');
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
                    id: '3d1bd05f-bbac-4674-b37e-0d6e1e0f015d'
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
                    id: '79c9eb16-bf58-46dd-ba4d-de712bf9d7dc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteExecutionById.id).toStrictEqual('79c9eb16-bf58-46dd-ba4d-de712bf9d7dc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});