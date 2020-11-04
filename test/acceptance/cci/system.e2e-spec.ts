import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISystemRepository } from '@hades/cci/system/domain/system.repository';
import { MockSystemRepository } from '@hades/cci/system/infrastructure/mock/mock-system.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('system', () =>
{
    let app: INestApplication;
    let repository: MockSystemRepository;

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
            .overrideProvider(ISystemRepository)
            .useClass(MockSystemRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockSystemRepository>module.get<ISystemRepository>(ISystemRepository);

        await app.init();
    });

    test(`/REST:POST cci/system - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: '9w13ciusneestgh857rqgqwitq3yl92p19gvsm9q4nb7p51xvu',
                version: 'f',
                name: '9',
                environment: 'x',
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: '2020-11-04 14:00:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: 'ld1h0btijeid7zcf35m5rgyb867loq60ji5pshnlox9s2ecpfp',
                version: 'v',
                name: 'c',
                environment: 'x',
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-11-04 18:15:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: null,
                tenantCode: 'ctypkk1lnuy6bldh04epjc9gz479qqztdluzahujhx4cf54ctl',
                version: 'd',
                name: '5',
                environment: 'b',
                technology: 'WSO2',
                isActive: true,
                cancelledAt: '2020-11-04 10:10:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                
                tenantCode: '4zfns5bm85l3ux4ggvt158ri4zu6r1h0yspcvuwqn6sw3h567q',
                version: 'i',
                name: '5',
                environment: 'o',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-11-03 22:31:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: null,
                version: 'm',
                name: 'q',
                environment: '4',
                technology: 'B2B',
                isActive: false,
                cancelledAt: '2020-11-04 00:36:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                
                version: 'i',
                name: 'x',
                environment: 'q',
                technology: 'B2B',
                isActive: true,
                cancelledAt: '2020-11-04 11:02:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: '9ft4z66e4xu52bezk2nd1axauekfu6e42n7fjwrsviqd5u6gw7',
                version: null,
                name: '9',
                environment: 't',
                technology: 'B2B',
                isActive: false,
                cancelledAt: '2020-11-04 02:36:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: 'cpbewzbzp734nb4cp4b5ilnthaz6dryrz567zndgsoom4bxnjd',
                
                name: 'g',
                environment: 'm',
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: '2020-11-04 16:52:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: '4o2n7624jir0pfg7c13kbut2wzlcn776zbituhlgm031b9b17d',
                version: 't',
                name: null,
                environment: 'q',
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: '2020-11-03 20:39:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: 'ejp8y0uae4pnpr1utrdysy7jn1e6ooeiybuf2kh7iy1p0y8kl4',
                version: 'o',
                
                environment: 'c',
                technology: 'B2B',
                isActive: true,
                cancelledAt: '2020-11-04 07:11:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemEnvironment property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: 'qlnil63ypu497uqmxyy0yr0z4eazjq3cfxnrkn9fjowhwx9air',
                version: 'u',
                name: 'p',
                environment: null,
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-11-04 09:58:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemEnvironment property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: 'etkspnpwrog168pw45w9yangrzqhsgaknuj8vcaznfw2g4b19z',
                version: 'i',
                name: 'j',
                
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-11-04 16:25:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTechnology property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: '1qga3qz1pduqnvpx8clgv0k6avbh77w0pn34d8dlrwugaxvvrf',
                version: 'c',
                name: 'r',
                environment: 'r',
                technology: null,
                isActive: false,
                cancelledAt: '2020-11-04 15:40:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTechnology must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTechnology property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: '1ccl2r7ckxioa9wada66jo4fr01qigx7pxvctnqd7cm50dap8b',
                version: 'c',
                name: 'j',
                environment: 'f',
                
                isActive: true,
                cancelledAt: '2020-11-04 19:19:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTechnology must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: 'yhvg1o487u75cxtnmhgwa1lp27qqt7g01nj13zzwgf93nty8re',
                version: 'j',
                name: '9',
                environment: '4',
                technology: 'SAPPI',
                isActive: null,
                cancelledAt: '2020-11-04 00:07:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: '1apb7w79ixt92033v0o7wotndi6dil7s0a5nz3gqrvbprjed25',
                version: 'h',
                name: '9',
                environment: '8',
                technology: 'SAPPI',
                
                cancelledAt: '2020-11-04 17:03:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'kl60j4y5mwf8h0ji3p3hi59v44ur8mv2mj1tu',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: 'xm9uzym8jk2g1mmlvbrefhwj62h5jhor8eoxh0fizkcid9w5kj',
                version: 'w',
                name: '2',
                environment: '0',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-11-04 10:07:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: 'ly6i8fran0hfensfrklmguyvubh72nvdalipo',
                tenantCode: 'en9xeoqhpgl34rzryglx50yqff6u099zqojxwemkxaqwq2608a',
                version: 'd',
                name: '7',
                environment: 's',
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: '2020-11-04 11:04:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: 'ms5jnzvmwdgnj1rz1klpgqui4odicbq0jt9dyvi6l9yzkj65zht',
                version: '8',
                name: '0',
                environment: 'z',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-11-04 02:22:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode is too large, has a maximum length of 50');
            });
    });
    

    

    

    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: 'q4p9iunrqu6vafbfrbjngnske7y0b9lgsgnatr36485xgr4bio',
                version: 'w',
                name: '3',
                environment: 'y',
                technology: 'WSO2',
                isActive: 'true',
                cancelledAt: '2020-11-04 13:22:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTechnology has to be a enum option of WSO2, SAPPI, B2B, MULESOFT, SAPSCI`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: '0ofvvrtms5qnknjk1jswg4q9xx7p849qtno0uxhfr37paxbv2q',
                version: 'z',
                name: 'w',
                environment: 'l',
                technology: 'XXXX',
                isActive: true,
                cancelledAt: '2020-11-04 07:23:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTechnology has to be any of this options: WSO2, SAPPI, B2B, MULESOFT, SAPSCI');
            });
    });
    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemCancelledAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: 'io5gs2vil1vo5jygs3bc3xdefdqqfmwjvhdaozf5qddb5z8wzh',
                version: 'm',
                name: 'x',
                environment: '0',
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemCancelledAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/system`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: 'p5b70ua1u8z0h6gbg7r434evg9w20intic2zfgjw71sawazbik',
                version: 'e',
                name: 'h',
                environment: 'g',
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-11-04 17:27:34',
            })
            .expect(201);
    });

    test(`/REST:GET cci/systems/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/systems/paginate')
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

    test(`/REST:GET cci/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '8a4bf92a-0f50-47c2-ad20-bb042d1c0c30'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/system`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'eb360047-9795-463e-ac59-806ceb2e65fc'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'eb360047-9795-463e-ac59-806ceb2e65fc'));
    });

    test(`/REST:GET cci/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system/b434f2cf-e2dc-4505-8fa9-b485bb13e262')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system/eb360047-9795-463e-ac59-806ceb2e65fc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'eb360047-9795-463e-ac59-806ceb2e65fc'));
    });

    test(`/REST:GET cci/systems`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/systems')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '054f2746-e30b-4191-8802-379c480e153d',
                tenantId: '770ec6a4-bc4c-4df3-8321-dc6bef5a95c6',
                tenantCode: '73dyxf7rqsldvmv78dolx0sq73chzvtnl98z6osl5mp31k3v5q',
                version: 'n',
                name: '6',
                environment: 'o',
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: '2020-11-04 00:28:02',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/system')
            .set('Accept', 'application/json')
            .send({
                
                id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                tenantCode: 's6vryoi4fb74srrlzbevlt4zbqlmlekxq6s2s62kzg4uss318e',
                version: 'e',
                name: 'x',
                environment: 't',
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: '2020-11-04 09:52:32',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'eb360047-9795-463e-ac59-806ceb2e65fc'));
    });

    test(`/REST:DELETE cci/system/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/system/dc0f9171-224f-4928-8ca4-585734ab7230')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/system/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/system/eb360047-9795-463e-ac59-806ceb2e65fc')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateSystem - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateSystemInput!)
                    {
                        cciCreateSystem (payload:$payload)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
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

    test(`/GraphQL cciCreateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateSystemInput!)
                    {
                        cciCreateSystem (payload:$payload)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '2fee3e71-120e-4b89-95c2-d6946780be5d',
                        tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                        tenantCode: 'zbzbba25cxzdq1vmxekypi01nf39xjptqccmlowai2q4ib2abo',
                        version: 'v',
                        name: 'd',
                        environment: '9',
                        technology: 'MULESOFT',
                        isActive: false,
                        cancelledAt: '2020-11-04 06:16:58',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateSystem).toHaveProperty('id', '2fee3e71-120e-4b89-95c2-d6946780be5d');
            });
    });

    test(`/GraphQL cciPaginateSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateSystems (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateSystems.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateSystems.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateSystems.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindSystem (query:$query)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
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
                            id: 'dec971a0-81e5-43a0-b469-33fafa1d3195'
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

    test(`/GraphQL cciFindSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindSystem (query:$query)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
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
                            id: 'eb360047-9795-463e-ac59-806ceb2e65fc'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystem.id).toStrictEqual('eb360047-9795-463e-ac59-806ceb2e65fc');
            });
    });

    test(`/GraphQL cciFindSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindSystemById (id:$id)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '188ebe9c-9171-404b-b420-f45e8d4a25fe'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindSystemById (id:$id)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'eb360047-9795-463e-ac59-806ceb2e65fc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystemById.id).toStrictEqual('eb360047-9795-463e-ac59-806ceb2e65fc');
            });
    });

    test(`/GraphQL cciGetSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetSystems (query:$query)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetSystems.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateSystemInput!)
                    {
                        cciUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4bfeaf48-6618-4b99-9631-304b98bf3299',
                        tenantId: 'f7d0ead0-6243-460c-aade-e21262238384',
                        tenantCode: '6kb40fxadw0n1nhpt9m4bztutx2ls2tfr7m8b5nifi5fxjti15',
                        version: 't',
                        name: 't',
                        environment: 'e',
                        technology: 'MULESOFT',
                        isActive: false,
                        cancelledAt: '2020-11-04 07:31:33',
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

    test(`/GraphQL cciUpdateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateSystemInput!)
                    {
                        cciUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'eb360047-9795-463e-ac59-806ceb2e65fc',
                        tenantId: '5ca27768-1fb7-42bc-8bd3-5f08b7014a81',
                        tenantCode: 'fwt3h30gt4anapuq42shs80jn0ofkmbcabnh2kxuzdtznur26k',
                        version: '2',
                        name: 'j',
                        environment: '2',
                        technology: 'B2B',
                        isActive: true,
                        cancelledAt: '2020-11-04 17:10:26',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateSystem.id).toStrictEqual('eb360047-9795-463e-ac59-806ceb2e65fc');
            });
    });

    test(`/GraphQL cciDeleteSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteSystemById (id:$id)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '58553be9-488a-4101-acb3-c951e7f4825c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteSystemById (id:$id)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'eb360047-9795-463e-ac59-806ceb2e65fc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteSystemById.id).toStrictEqual('eb360047-9795-463e-ac59-806ceb2e65fc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});