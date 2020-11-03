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
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'ssny5oso8eap1dpba39urdz3v8jcp4flp96ujuyjy9yb0venik',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'xq02okn5z765cvzendsp',
                version: 'c8lswk8apttrirec6b5n',
                type: 'DETAIL',
                executedAt: '2020-11-03 06:37:23',
                monitoringStartAt: '2020-11-03 12:28:20',
                monitoringEndAt: '2020-11-03 09:55:43',
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
                
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'mxxztzs5oad9xfk1p9xp9nzbckvd846wmmap5r35gf7kiqsx1o',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'hohz3xislag106nefcy8',
                version: '79gwzf8qsfrd8ogoy7tt',
                type: 'DETAIL',
                executedAt: '2020-11-03 06:41:36',
                monitoringStartAt: '2020-11-03 09:46:42',
                monitoringEndAt: '2020-11-03 08:06:41',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: null,
                tenantCode: '56o1gsy1ri4ubnjycqkbato27v4enfq0vs48xzwkihy8ne4vx7',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'jquhi4k848im19qhdfho',
                version: 'xynztkcb2j4rcdywzmty',
                type: 'DETAIL',
                executedAt: '2020-11-03 08:07:31',
                monitoringStartAt: '2020-11-03 23:28:36',
                monitoringEndAt: '2020-11-03 21:51:48',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                
                tenantCode: '06a3hnwje4apynrukf4xdfs0ol29auo3jai48zsdl69sm8cnd7',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'u6qwa3fnbu4j2m4b2cfm',
                version: 'ptzrsca9b22oadsvtoi0',
                type: 'SUMMARY',
                executedAt: '2020-11-03 22:12:46',
                monitoringStartAt: '2020-11-03 04:53:34',
                monitoringEndAt: '2020-11-03 16:21:22',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: null,
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'arjjsze3o3l5rulz1o84',
                version: 'rgs7mfk3uizbh85t5wqv',
                type: 'DETAIL',
                executedAt: '2020-11-03 23:49:40',
                monitoringStartAt: '2020-11-03 11:49:23',
                monitoringEndAt: '2020-11-03 04:36:59',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'o8ftldeab7nxyassgw7l',
                version: 'zbrxu7zr6d70tuorajpi',
                type: 'DETAIL',
                executedAt: '2020-11-03 15:49:01',
                monitoringStartAt: '2020-11-03 06:08:55',
                monitoringEndAt: '2020-11-03 00:52:21',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'qtae892ef4w4ox772581hixu1ey4eow9zhkid6wpcrzfxpav9i',
                systemId: null,
                systemName: '1rvllf7sxv0hh98i25t9',
                version: 'z3ur0111sh3udj2rg48t',
                type: 'DETAIL',
                executedAt: '2020-11-03 04:28:00',
                monitoringStartAt: '2020-11-03 02:43:28',
                monitoringEndAt: '2020-11-03 17:26:45',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'mxwjlevvr37r6h6zajbzwmie0dgalyvn4xp706y4cgwk78jcm1',
                
                systemName: '22l62bcnczhlf835fd9t',
                version: 'oeo5zsaks0uvcz8zis7j',
                type: 'DETAIL',
                executedAt: '2020-11-03 21:14:40',
                monitoringStartAt: '2020-11-03 19:14:16',
                monitoringEndAt: '2020-11-03 07:28:24',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'uppr448z9hgrtmax1fi0efe9dmvrdese7xu421zmfyvoetghx3',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: null,
                version: '8waw5ewavt4rcat8xk47',
                type: 'SUMMARY',
                executedAt: '2020-11-03 20:46:19',
                monitoringStartAt: '2020-11-03 21:29:15',
                monitoringEndAt: '2020-11-03 02:38:17',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: '5pwp8fchbedehw11ybpbvikyiwih7yjgfkomhqmtrikrsy9hot',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                
                version: 'olehesjrmzcb446ngeyw',
                type: 'DETAIL',
                executedAt: '2020-11-03 23:27:16',
                monitoringStartAt: '2020-11-03 11:02:05',
                monitoringEndAt: '2020-11-03 18:56:58',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'cpad01a2eii8p7jriipc9qqwpc4n2nqaf4e8k9jwvfujen61f3',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: '1d4zgcu8vpynz30a6oun',
                version: null,
                type: 'DETAIL',
                executedAt: '2020-11-03 14:26:03',
                monitoringStartAt: '2020-11-03 16:58:14',
                monitoringEndAt: '2020-11-03 16:42:25',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'l82ws9ojyhiwc0sthpzo1crsegrvat317nuh4xjj0vt0bacduo',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'c2aon0953u0atub5rjoy',
                
                type: 'DETAIL',
                executedAt: '2020-11-03 04:28:06',
                monitoringStartAt: '2020-11-03 23:30:47',
                monitoringEndAt: '2020-11-03 10:09:09',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'dquvjtux5tva0at5uz9mlq426f1s6r8qnnfpkarojohpl0wcd0',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'zjhj3f424fw9efssc983',
                version: 'ladczawn6seu84fmcwpv',
                type: null,
                executedAt: '2020-11-03 04:13:54',
                monitoringStartAt: '2020-11-03 15:59:38',
                monitoringEndAt: '2020-11-03 16:15:53',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'ipx8h1tl1h127qw5usibhnwug3pdxu2zwk3lnyos6eruem3onl',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'zz1v1kvharkkfm356po6',
                version: '3pvtrq1ucbs8gxf6zxfd',
                
                executedAt: '2020-11-03 07:25:00',
                monitoringStartAt: '2020-11-03 19:06:20',
                monitoringEndAt: '2020-11-03 04:17:13',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'wfj9pbikpqp48gzgzd2kyqda3hg2y8auus6qibu5jfisxaqajo',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'y2j41zm7jw7j4cb6kkqh',
                version: 'c1om2f000tx93gy84dc1',
                type: 'DETAIL',
                executedAt: null,
                monitoringStartAt: '2020-11-03 01:59:31',
                monitoringEndAt: '2020-11-03 19:40:47',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'o1dt9wb65v0g3ddmcjsspjv12qnqh9so5cf7yhmk0z0vg7ilnv',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'pda06qfl57qf3banb42b',
                version: 'dcgecd2ri6p4b3ifq2dq',
                type: 'SUMMARY',
                
                monitoringStartAt: '2020-11-03 07:47:13',
                monitoringEndAt: '2020-11-03 02:23:04',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'lcy69r9oz0h3q4j43c1t0n7dkbv6lqzj0iapqoz5xj4kbezso7',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 't6sdf3dfbw36lzgeyf0g',
                version: '7zjupdhdiir66s1ijszh',
                type: 'DETAIL',
                executedAt: '2020-11-03 12:36:15',
                monitoringStartAt: null,
                monitoringEndAt: '2020-11-03 22:18:09',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: '7yf4qi8112tx63he64l2h4xybtipevruxsy95ff83eyx9h3zfc',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: '3fs45872k95mkmjo433v',
                version: 'zp3gp1eucglarxm1ul15',
                type: 'DETAIL',
                executedAt: '2020-11-03 02:26:48',
                
                monitoringEndAt: '2020-11-03 19:26:19',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: '8h06x8ax8861hn5wqf3pc302qjhfsy74q3yu0avsqp91bgz41o',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'wntzldsw9vd2kt4sndgj',
                version: 'k1fh43vwpah2eaxqd91w',
                type: 'SUMMARY',
                executedAt: '2020-11-03 03:08:55',
                monitoringStartAt: '2020-11-03 01:45:55',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: '5mk4mdzarm64jsaxke2otxib473k6w4bpp2nze98w9c7ynhm1v',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: '5elm0ayv54678a4l0i8x',
                version: '6m6c7y7co8huolt98y9u',
                type: 'SUMMARY',
                executedAt: '2020-11-03 15:01:03',
                monitoringStartAt: '2020-11-03 00:16:04',
                
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
                id: 'knoq6bfiuci4cyfqvsr8w4wltmrz19zu5qmuu',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'qh83qw5kknzbqus3ux656dr6ff1v02yrcjsrzil8leu91r3q5j',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: '0axxxmvcosag92ujc7r1',
                version: 'jj20bx4gfjcfbui8p0sy',
                type: 'DETAIL',
                executedAt: '2020-11-03 23:15:52',
                monitoringStartAt: '2020-11-03 18:36:23',
                monitoringEndAt: '2020-11-03 17:28:02',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: 'gnv3gjba1ha5vnp9khbcynxkzypu8q8ppl6xi',
                tenantCode: '25t6aktjrcwcmw4b472gvibtg24g871jovrhdwxao3r3772w1s',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'lb2s6ub6jdaul20b9c9x',
                version: 'eazoa1tm3afm33l50c4g',
                type: 'SUMMARY',
                executedAt: '2020-11-03 11:52:08',
                monitoringStartAt: '2020-11-03 07:45:04',
                monitoringEndAt: '2020-11-03 05:24:17',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'v7a8kw283lequbuhwqkpc6h1vvi9try8pig5qrfutk5idfdbnz',
                systemId: 'jee89ertt90urm6w54v6xkt4mdjzyaumeanof',
                systemName: 'k1gzoj2973pam6li3kok',
                version: 'xulizx3d0u33uw0ysmaj',
                type: 'DETAIL',
                executedAt: '2020-11-03 10:56:56',
                monitoringStartAt: '2020-11-03 02:32:30',
                monitoringEndAt: '2020-11-03 01:31:55',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'roz25sutt007f1r76jwv8zag63tf4kea462qowev5mav8cjbcib',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'cjfiew0bw4msv9sz4jl7',
                version: 'lg9ln594pka51o0wiqft',
                type: 'SUMMARY',
                executedAt: '2020-11-03 19:37:31',
                monitoringStartAt: '2020-11-03 02:56:12',
                monitoringEndAt: '2020-11-03 14:47:01',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'qhifebl4y99qhdrbxy6fgz106dhs0u45ajo8uhvqvoi9o7ybiq',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'kwswkeywc6j61ygi4lylr',
                version: 'c1w03zsntixmqxlmg84g',
                type: 'SUMMARY',
                executedAt: '2020-11-03 03:05:47',
                monitoringStartAt: '2020-11-03 09:33:05',
                monitoringEndAt: '2020-11-03 16:48:42',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: '2og2j0yyymh5vcpbt55p9ztdr5gi7kxo72xuh9p0ik6xphxyoi',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'k18nh1pcqrrynk81m7xd',
                version: 'jy3m0xlze1ooyhew55s4t',
                type: 'DETAIL',
                executedAt: '2020-11-03 20:57:22',
                monitoringStartAt: '2020-11-03 16:48:26',
                monitoringEndAt: '2020-11-03 04:05:57',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'yv4pdwcrbdl57fmx3tls4gzaqeip06kfn7lftwn6rn6ovrduiy',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: '08pp0u277wux65u0rbay',
                version: 'bvo4h8ed8bpwr0dyuy1f',
                type: 'XXXX',
                executedAt: '2020-11-03 00:43:19',
                monitoringStartAt: '2020-11-03 22:27:31',
                monitoringEndAt: '2020-11-03 04:21:51',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'sryxxmd8a7lqorlmcf62fw5eztwq8cb2434fj6sqjo9bjdae4k',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: 'a8t579dc5b85qn6ncn6l',
                version: '4jydrfqbmnb7lgi2vx65',
                type: 'SUMMARY',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-11-03 04:42:02',
                monitoringEndAt: '2020-11-03 10:03:09',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'sj883g34oqojhiwd6wkcdmo7x2o3v77oxcfdm9fsgovs69vzyy',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: '4ja2ex03fgiq7l1cwinx',
                version: '411p9k2vhxa9o4lwhxkt',
                type: 'SUMMARY',
                executedAt: '2020-11-03 22:26:53',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-11-03 09:25:33',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'rlzjg85dvr01oe1olhc42fo69maybq0tyk64n5ulhzy3re4q7s',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: '88uq6oh2pk76ix65eark',
                version: 'l4xe0lbhxg7ewaxcskl8',
                type: 'DETAIL',
                executedAt: '2020-11-03 08:13:46',
                monitoringStartAt: '2020-11-03 05:30:38',
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
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: '6jwyzxc7ppydzyub136f59khrhdi70wmfet7o12vt67v4y3064',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: '7i3nr3bzim93zi3812qp',
                version: 'kczzfcu2cuauz716i65g',
                type: 'DETAIL',
                executedAt: '2020-11-03 08:07:34',
                monitoringStartAt: '2020-11-03 14:51:59',
                monitoringEndAt: '2020-11-03 06:05:30',
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
                        id: 'e42dac3a-6a18-4af0-9a55-df46524e0c55'
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
                        id: 'e69db8da-9cde-4b35-b301-0b037b9690cb'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e69db8da-9cde-4b35-b301-0b037b9690cb'));
    });

    test(`/REST:GET cci/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/557024b2-5f59-44d8-90b3-67c28aa5b5c5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/e69db8da-9cde-4b35-b301-0b037b9690cb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e69db8da-9cde-4b35-b301-0b037b9690cb'));
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
                
                id: 'c428bffe-313c-408b-b915-8880de20327d',
                tenantId: 'ad48debd-a9f8-4c7d-bac7-c1c0955b6892',
                tenantCode: 'z08h1ect6oy1ebfcablrfo9l1cq8r62br304kcauoezhlzikw8',
                systemId: '1f868bb3-0468-4cde-86d7-2fc5d1ff7cde',
                systemName: 'k2yq5a5ralb8stsy9kfa',
                version: 'eh58sqzlluramp66a70n',
                type: 'SUMMARY',
                executedAt: '2020-11-03 05:13:24',
                monitoringStartAt: '2020-11-03 04:44:58',
                monitoringEndAt: '2020-11-03 03:53:00',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                tenantCode: 'lcpvwqb71nnbmu75h9c52vgdsyvsh5am3dcpajyu2v9gb2pnwq',
                systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                systemName: '92q4bn4kpluf7erl6bjr',
                version: '3zzmop25asrp2xhxvze3',
                type: 'SUMMARY',
                executedAt: '2020-11-03 15:24:15',
                monitoringStartAt: '2020-11-03 21:14:32',
                monitoringEndAt: '2020-11-03 12:46:04',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e69db8da-9cde-4b35-b301-0b037b9690cb'));
    });

    test(`/REST:DELETE cci/execution/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/34339f2b-ef33-48be-925e-85f253514a0d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/execution/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/e69db8da-9cde-4b35-b301-0b037b9690cb')
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
                        id: '0f33d2ec-74c6-4249-9361-0df2260a0342',
                        tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                        tenantCode: '3cad5w1s9ikctncmh6rz5dvv53xupt7arc2m8ght4kid4arhox',
                        systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                        systemName: 'yg3r8umfs54wpsomhm6m',
                        version: 'n9kx5l4ziaapubnltbs0',
                        type: 'DETAIL',
                        executedAt: '2020-11-03 10:16:36',
                        monitoringStartAt: '2020-11-03 05:55:02',
                        monitoringEndAt: '2020-11-03 10:52:46',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateExecution).toHaveProperty('id', '0f33d2ec-74c6-4249-9361-0df2260a0342');
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
                            id: 'a76c067b-4565-4eba-af92-a7f89c8677c8'
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
                            id: 'e69db8da-9cde-4b35-b301-0b037b9690cb'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecution.id).toStrictEqual('e69db8da-9cde-4b35-b301-0b037b9690cb');
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
                    id: '3e549dce-502d-425e-b579-a0235adbf1d2'
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
                    id: 'e69db8da-9cde-4b35-b301-0b037b9690cb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecutionById.id).toStrictEqual('e69db8da-9cde-4b35-b301-0b037b9690cb');
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
                        
                        id: 'f970b464-a26d-456b-8b8c-68d7c3b96199',
                        tenantId: 'd9b2e210-b02b-4c79-a9a1-36479d252c98',
                        tenantCode: '3uhirs3lmuoj29ajsdbvyvhqz9rk9k81q0wh3vr0rfs26r1q5u',
                        systemId: 'ac87550d-a702-466e-81dd-246cb20f47cb',
                        systemName: 'wrtq3nka624unl725ohv',
                        version: 'uf1hsm08dw8ehw608ula',
                        type: 'SUMMARY',
                        executedAt: '2020-11-03 18:57:50',
                        monitoringStartAt: '2020-11-03 22:39:53',
                        monitoringEndAt: '2020-11-03 00:45:25',
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
                        
                        id: 'e69db8da-9cde-4b35-b301-0b037b9690cb',
                        tenantId: '70db1085-d99a-42f0-99ee-c018d061fa4a',
                        tenantCode: 'acqybwqb4kiv5z3ogpgy8ixdlglvkn6mqyysq0rrv08eafzosj',
                        systemId: 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb',
                        systemName: 'ecf0ujtytpae4g6cwkpe',
                        version: 'guojtm9s3g0hv5678qye',
                        type: 'SUMMARY',
                        executedAt: '2020-11-03 09:53:58',
                        monitoringStartAt: '2020-11-03 08:30:09',
                        monitoringEndAt: '2020-11-03 15:59:08',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateExecution.id).toStrictEqual('e69db8da-9cde-4b35-b301-0b037b9690cb');
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
                    id: '18df85ca-5a0d-47df-bb19-7be197113afc'
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
                    id: 'e69db8da-9cde-4b35-b301-0b037b9690cb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteExecutionById.id).toStrictEqual('e69db8da-9cde-4b35-b301-0b037b9690cb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});