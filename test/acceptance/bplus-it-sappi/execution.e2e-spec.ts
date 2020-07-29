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
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'sddqur1xikf8f8tnt3ltrbeu38jlga1r82hw1phnd2wt4pszmb',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'k52pd0ivjnd5kum19s97',
                version: 'lrl2ywab5q1khdmnucg7',
                type: 'DETAIL',
                executedAt: '2020-07-29 14:38:37',
                monitoringStartAt: '2020-07-29 12:34:25',
                monitoringEndAt: '2020-07-28 15:51:29',
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
                
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 's0ps1dvndtxl4rpbyib00vgxb7r4ye0dusbryvrc46t3mv347r',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: '8sn2rfhet8k0xvsvw8rs',
                version: 'usdbyvtxf3hcu6fctd9a',
                type: 'SUMMARY',
                executedAt: '2020-07-29 08:19:24',
                monitoringStartAt: '2020-07-29 08:34:42',
                monitoringEndAt: '2020-07-28 21:30:26',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: null,
                tenantCode: '6125fiuba7se4ylgpe58hlqj4awl99g5go2d3ymc28tjeae8ub',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'f1zkeg0a5xe7wn6fnorg',
                version: 'mbjqz5ndymj1vsp66uhf',
                type: 'DETAIL',
                executedAt: '2020-07-28 19:30:50',
                monitoringStartAt: '2020-07-29 02:26:34',
                monitoringEndAt: '2020-07-29 05:09:28',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                
                tenantCode: 'agdh333jo9chj4x3fehxwqjtkvmny2070zbbazwlauinf4wn15',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'u7jtkmo9sllo4r0e80tg',
                version: 'bdg3fu6vo1h7sr1hw9mc',
                type: 'DETAIL',
                executedAt: '2020-07-29 07:05:30',
                monitoringStartAt: '2020-07-29 09:03:55',
                monitoringEndAt: '2020-07-29 05:22:50',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: null,
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'c0wjvd11k1nqmzlfx4jf',
                version: 'zxlncg84yk5afhtx5q2w',
                type: 'SUMMARY',
                executedAt: '2020-07-29 04:14:17',
                monitoringStartAt: '2020-07-29 03:32:01',
                monitoringEndAt: '2020-07-29 01:52:24',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'r869vhlx2m6qlwo6qmot',
                version: 'zbt8eeze297k3cb0p11o',
                type: 'SUMMARY',
                executedAt: '2020-07-29 10:33:33',
                monitoringStartAt: '2020-07-28 17:19:40',
                monitoringEndAt: '2020-07-29 07:23:58',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: '79e7f3ivz5nlqvscsbks1xsfg3vv6taf0hsl99503pkvh0czur',
                systemId: null,
                systemName: 'e6cr4g8eq4tcusxharaq',
                version: 'oavjsk7a9nw6uz446tg6',
                type: 'SUMMARY',
                executedAt: '2020-07-29 03:32:11',
                monitoringStartAt: '2020-07-29 08:14:06',
                monitoringEndAt: '2020-07-28 20:05:53',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: '2qcitbn6ho2qthznullqockbz04elobkdoj2ltl9u5sf23p8zr',
                
                systemName: 'jjflimq4xvhv92aco6b3',
                version: 'wjzl4mginu99ry80ru2l',
                type: 'SUMMARY',
                executedAt: '2020-07-29 00:14:07',
                monitoringStartAt: '2020-07-29 15:33:03',
                monitoringEndAt: '2020-07-28 17:51:50',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'ieny3vib4afnug3q4uyenry3toefqp3zt9zstr89i1bfo2us6z',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: null,
                version: 'uepuw61l45curl28pcau',
                type: 'SUMMARY',
                executedAt: '2020-07-28 16:19:52',
                monitoringStartAt: '2020-07-28 18:26:33',
                monitoringEndAt: '2020-07-29 13:37:04',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'cf28epx4xgbkwc7hc5v11aj0bylq3possoh83n4lix6rkwvaqq',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                
                version: 'tsg0kxzesrxvg0yawcxe',
                type: 'SUMMARY',
                executedAt: '2020-07-29 00:33:58',
                monitoringStartAt: '2020-07-29 04:23:55',
                monitoringEndAt: '2020-07-29 02:47:46',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'hoc32zaf1pqjwyil4rrqvxk1z1ayahxrwetymn7tqx3be58186',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'sz54adxffoeycspw6u0p',
                version: null,
                type: 'DETAIL',
                executedAt: '2020-07-28 23:19:41',
                monitoringStartAt: '2020-07-29 14:28:24',
                monitoringEndAt: '2020-07-29 10:23:22',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: '8uy21i1uzmwgiy7a4sqqsk9me2dfsogqv7hzg8z1hg5782wdsz',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: '3brl260ma7q2d71ajmi7',
                
                type: 'DETAIL',
                executedAt: '2020-07-29 04:36:29',
                monitoringStartAt: '2020-07-28 16:15:20',
                monitoringEndAt: '2020-07-29 08:30:03',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'rftao41tkfx7rs77em7f4advdxtroyli5bpqmcdj4ljld7egjn',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'i869eeze408a2u2ggflj',
                version: 'f86b70lqurdgotyaclby',
                type: null,
                executedAt: '2020-07-29 14:10:35',
                monitoringStartAt: '2020-07-28 22:22:32',
                monitoringEndAt: '2020-07-29 08:27:46',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'xm27my8e7yfc9q1oj0y2d29uf9p6rh3p2m7a049hu0hdl31hal',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'tvi4vvfmiorg614klrin',
                version: 'jg3hkdd05go8spbit032',
                
                executedAt: '2020-07-29 02:57:22',
                monitoringStartAt: '2020-07-29 12:27:14',
                monitoringEndAt: '2020-07-28 21:51:41',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: '38w714kfk4spiyb43urmm6zn0wjgf33je9do1wn6jx0xmnhpky',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'flm0rcdlfocfdkc2mmz7',
                version: 'ki3oq45fdutyiuyjgzc5',
                type: 'DETAIL',
                executedAt: null,
                monitoringStartAt: '2020-07-29 03:14:28',
                monitoringEndAt: '2020-07-29 14:03:23',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: '92xd6rj34vsggakhojnp9570ybpw8c0tj8pklh78dbh3jw3e6r',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'a52dlzaq4sk9spie258s',
                version: 'vzbvwf7qmkp37uoymuh4',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-07-29 15:47:13',
                monitoringEndAt: '2020-07-29 06:12:35',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'jk4tnu84119xh5j0g0vd206lo1uto7jzt4cmyders9opasmps9',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'xg75k6vshv19aga1dgvk',
                version: 'wmyxd0fdcnabvshksukm',
                type: 'DETAIL',
                executedAt: '2020-07-28 16:18:08',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-29 09:59:33',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: '8khl8460t5k9szj8mhhfjtntbzxm1slwjffxokny7ea55hlb69',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'fql4b0azmfvi2pnhgfb8',
                version: '5e2vsb4xqpflfdymokw7',
                type: 'SUMMARY',
                executedAt: '2020-07-29 10:47:54',
                
                monitoringEndAt: '2020-07-29 04:12:03',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'nl5br26iqa2lfrc89jryovh2rnldxnmdtygksvjqmrrmzlltwf',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'mhpc7mmojdet9eda1qom',
                version: '328kp8ugb89mbocny5l7',
                type: 'DETAIL',
                executedAt: '2020-07-29 00:43:56',
                monitoringStartAt: '2020-07-28 21:53:58',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: '0v3rlwptb7knh3qnyoqmy4bm9x1u6kud5g2r6xhe2tvb35kow5',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'foktovxpzhb9nlq2e1l7',
                version: '7k0c4rezzypdli3xg7d9',
                type: 'DETAIL',
                executedAt: '2020-07-29 10:01:15',
                monitoringStartAt: '2020-07-29 08:35:26',
                
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
                id: 'q4fwytf2jxmlidx8omos6yfzc4hjyw01guql4',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'y1j7qbv2vhbyzchd6l9kny8t5oo3bnk79a2id0ypaloxlf38nf',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 't1y4d4c05x0w2cq8wnxz',
                version: 'io4rzjwimozb65za9w35',
                type: 'DETAIL',
                executedAt: '2020-07-29 08:28:54',
                monitoringStartAt: '2020-07-29 11:30:12',
                monitoringEndAt: '2020-07-29 14:31:23',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: 'nyddxlx4ji56ncj2xyetgtm81acr9rz68kpok',
                tenantCode: 'tnz1hk1umibydmy11rl8181s03m2wva7ywu82zm1ugsje29ib4',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'giv9qh4z8jtmsx30zxhj',
                version: 'ilck0iqe0qxppyr1tyfp',
                type: 'DETAIL',
                executedAt: '2020-07-28 20:37:15',
                monitoringStartAt: '2020-07-29 07:20:01',
                monitoringEndAt: '2020-07-28 19:15:40',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'rohlqe3l197bojpk3b7dgq4saznmsout5lw7guujuhdk3ywha5',
                systemId: 'jwegzv62jmlv3bpttlcjkr7rdirrqczzsxjia',
                systemName: 'u8i0epn6mcsxq1hrud1p',
                version: 'ewpjjz96nmzipu8jfs5g',
                type: 'SUMMARY',
                executedAt: '2020-07-28 21:16:21',
                monitoringStartAt: '2020-07-29 09:10:37',
                monitoringEndAt: '2020-07-28 23:25:56',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'icj0diberxykzn5jmlfxs4tpddjq7au7r3fj210uy9h10b9eahk',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: '69k765vektaq2o42ckx5',
                version: '5bzajeehaomooywmcnya',
                type: 'SUMMARY',
                executedAt: '2020-07-29 04:07:03',
                monitoringStartAt: '2020-07-28 20:46:46',
                monitoringEndAt: '2020-07-29 00:42:00',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'f1qxoiicasv2bibu244ysbe9901dnfdpixq6llwbzxw15n167h',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'q8nezgjxhlgjyaxvoxxkp',
                version: 'y2ei3vmjdxv8lr6fpfyz',
                type: 'DETAIL',
                executedAt: '2020-07-29 13:23:18',
                monitoringStartAt: '2020-07-29 11:29:28',
                monitoringEndAt: '2020-07-29 10:00:04',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'gt4z4en6yt6bptgalag79gqofk5511w9zbhnzr3b7lb8eiiwgj',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'horbucb90t443x80ybwk',
                version: 'cb8ji5n05yvdqiuvq0qek',
                type: 'DETAIL',
                executedAt: '2020-07-29 07:28:58',
                monitoringStartAt: '2020-07-28 23:13:19',
                monitoringEndAt: '2020-07-29 12:44:50',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: '4elpums2f32nwbm765b3tog4oqr47iuobhwk1uq0094zgy0hll',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'wq9fllr90ra0x81j2km1',
                version: '50ogdqqlyd9z0t0v4ll8',
                type: 'XXXX',
                executedAt: '2020-07-29 04:03:44',
                monitoringStartAt: '2020-07-29 07:01:10',
                monitoringEndAt: '2020-07-29 10:37:04',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'gjeyq2hbegtz3vwic6ki7u2v5zf3gt30cxkkw3e1zts03zwo3x',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'mntznp3cfk5tkmiv7shv',
                version: '0v05aensxr80wm0nyj74',
                type: 'SUMMARY',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-07-29 13:22:24',
                monitoringEndAt: '2020-07-28 19:55:07',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: '8aivhmlh3g5lp3satwcc97zr3rhhc43qhg5xc7cdd3vl2osznz',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: '0qatu9irb1szh6qr7y2s',
                version: 'b4kdkjoe6a2fy1hc1xmg',
                type: 'SUMMARY',
                executedAt: '2020-07-28 19:34:01',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-28 21:21:11',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'jlkcmn2z3ucaql655lcp94kfpz476gv9vhqy6cebx9u9k4qd96',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'emmiap5wytdfudwkeds1',
                version: 'z52vqa3sr94b1bhzpus4',
                type: 'SUMMARY',
                executedAt: '2020-07-29 06:56:58',
                monitoringStartAt: '2020-07-28 17:18:04',
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
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: '6gpm8wmrj983fhh6vfxglkj7xb1a6h11xcusixusscdc7tza1n',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'jgbbxl4tp6fkzc5gf44j',
                version: 'ey35yv5u9aaqf8kpmoy1',
                type: 'SUMMARY',
                executedAt: '2020-07-29 07:17:53',
                monitoringStartAt: '2020-07-29 04:21:04',
                monitoringEndAt: '2020-07-29 10:46:36',
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : 'e3826456-81e4-4ba2-b902-f11ee506bbcd'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e3826456-81e4-4ba2-b902-f11ee506bbcd'));
    });

    test(`/REST:GET bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/e3826456-81e4-4ba2-b902-f11ee506bbcd')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e3826456-81e4-4ba2-b902-f11ee506bbcd'));
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
                
                id: 'ea87aed7-cea6-48ba-a31d-bf9883ad7e1f',
                tenantId: '1d0fa392-1936-4c36-86e7-e53afeb44071',
                tenantCode: 'sqw1ch4b026tv6xd6qf28fa0hkbz58uyn7mgtfbtk7wr4u7gje',
                systemId: '062d1f01-fd9d-4197-ab26-12d8d72c8e42',
                systemName: '905bxe0be8h56bwqeadc',
                version: 'tzeyz3jqznp6maqfo6pd',
                type: 'SUMMARY',
                executedAt: '2020-07-29 15:07:16',
                monitoringStartAt: '2020-07-28 20:59:30',
                monitoringEndAt: '2020-07-29 05:52:21',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                tenantCode: 'evbif8bp7w59g0wk4pitsq2r6bm2a9pvbivkullf5sehs2jj4n',
                systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                systemName: 'js7zmmchrhp2cf9eq9a4',
                version: 's55nmuvp1yzb6q9zkvr4',
                type: 'DETAIL',
                executedAt: '2020-07-29 09:39:50',
                monitoringStartAt: '2020-07-29 06:37:33',
                monitoringEndAt: '2020-07-28 22:01:44',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e3826456-81e4-4ba2-b902-f11ee506bbcd'));
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/e3826456-81e4-4ba2-b902-f11ee506bbcd')
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
                        id: '6d6195c4-e90a-481f-90c2-77815849b1ca',
                        tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                        tenantCode: 'nxopcp8rpwrgd5xv45adj0fycmptfee7zm30s0nglhsp66f2ao',
                        systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                        systemName: '8mi3dk2jeqylvepeiajr',
                        version: 'gthu1lllnbc8m0mblfcz',
                        type: 'DETAIL',
                        executedAt: '2020-07-29 08:55:58',
                        monitoringStartAt: '2020-07-29 12:23:53',
                        monitoringEndAt: '2020-07-28 17:57:18',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', '6d6195c4-e90a-481f-90c2-77815849b1ca');
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
                            value   : 'e3826456-81e4-4ba2-b902-f11ee506bbcd'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('e3826456-81e4-4ba2-b902-f11ee506bbcd');
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
                    id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('e3826456-81e4-4ba2-b902-f11ee506bbcd');
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
                        
                        id: 'a5f7e9f0-6514-43df-a6fe-c8ac33730f09',
                        tenantId: 'edd41d30-63bd-4918-966d-7a4ec27d2cdc',
                        tenantCode: 'dlzod24eh7gmxo0sqiryb50f1sf9zqeh5qm6f475hyncnyzt00',
                        systemId: 'f0c39c11-f697-422c-b317-16b016ff64bb',
                        systemName: 'frg04o855dokv477m1u5',
                        version: 'kth1v8gb059228v1whce',
                        type: 'DETAIL',
                        executedAt: '2020-07-29 05:05:18',
                        monitoringStartAt: '2020-07-29 14:34:39',
                        monitoringEndAt: '2020-07-29 00:49:06',
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
                        
                        id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd',
                        tenantId: '3486894e-2507-463f-b6f5-b24337c355b5',
                        tenantCode: '6jl7bcnx1ewo29xtpio1wbca5mycz6vlib5c5ygrs6leim0g7m',
                        systemId: '1683e835-b23e-4f1c-8a96-8ab14da5c1b4',
                        systemName: '19ps5xvlhd7mvwvft7ik',
                        version: 'kx5aqj3ukwo7p2frwyla',
                        type: 'DETAIL',
                        executedAt: '2020-07-28 20:28:37',
                        monitoringStartAt: '2020-07-28 23:57:08',
                        monitoringEndAt: '2020-07-28 20:15:01',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('e3826456-81e4-4ba2-b902-f11ee506bbcd');
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
                    id: 'e3826456-81e4-4ba2-b902-f11ee506bbcd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('e3826456-81e4-4ba2-b902-f11ee506bbcd');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});