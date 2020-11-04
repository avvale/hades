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
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: 'bveelf1yxcggudmrk7t3c68e45kwx6vh5plg79o79fb8mzrgix',
                version: '9',
                name: '6',
                environment: 'm',
                technology: 'B2B',
                isActive: false,
                cancelledAt: '2020-11-04 03:28:36',
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
                
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: 'lrmqct2zgxcin3z8klj8dazu6itcrg49srrbsmg8ztgx3hc3md',
                version: 'e',
                name: 'z',
                environment: 'e',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-11-04 00:37:52',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: null,
                tenantCode: 'mtfs9jexlql03x8ltv41g3dr3f2xfzzkpk3b9djpgfu3r1937z',
                version: 'o',
                name: 'j',
                environment: 'f',
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-11-04 03:53:25',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                
                tenantCode: 'u261i0a0ercla1gscbbr6jyaijrwz0lpm7z1rbr66151j3c1qj',
                version: '7',
                name: '9',
                environment: 'p',
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: '2020-11-03 16:38:41',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: null,
                version: '5',
                name: 'f',
                environment: 'l',
                technology: 'SAPPI',
                isActive: true,
                cancelledAt: '2020-11-03 23:05:20',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                
                version: 'r',
                name: 'u',
                environment: 'q',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-11-03 21:03:34',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: 'dnhj0ylfj26rxty8d3cxgok3y7mb6iuqqqebm8s8qs5ww4hqrq',
                version: null,
                name: 'e',
                environment: '0',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-11-04 13:35:38',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: 'ay1xnh89f3z873ec5je285oa6u02a9qvramxl55hv2bqclnaig',
                
                name: '9',
                environment: 'c',
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: '2020-11-04 05:19:02',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: '5qnjnjo24mlz6qbnwqdmd3j6um81qkxd0d2av0ksmy8q69q6gc',
                version: 'd',
                name: null,
                environment: 'x',
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: '2020-11-03 22:03:22',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: 'a9edmip6gark6tsgk5ma5acvxh5ce2och9ceetw6hqdni6bzfj',
                version: 'd',
                
                environment: '5',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-11-03 23:23:31',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: 'sxulcrzc93y1v54i37z81sfktplqfi12r1corok072hjbs113b',
                version: 'i',
                name: 'q',
                environment: null,
                technology: 'WSO2',
                isActive: true,
                cancelledAt: '2020-11-03 19:42:38',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: '5po7nvcxt6av4is5khlrouv9v04u05acc2q0irxmd9lmqub1dq',
                version: '8',
                name: 'g',
                
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-11-03 17:24:02',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: '3advtkvzz3495bh9xi7v0ww0e8hthq7pkhk7b9gb755jqoj6nb',
                version: 'f',
                name: 'g',
                environment: 'z',
                technology: null,
                isActive: false,
                cancelledAt: '2020-11-04 08:44:33',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: 'tlcc4xn782w9ofu4f75jfpa2t01c6rrc4bjl3wqh2k3liap3ou',
                version: 'q',
                name: '7',
                environment: '5',
                
                isActive: true,
                cancelledAt: '2020-11-04 12:23:41',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: '3u7y9vjm4vl1446tlmzj1es2oii9jbdfvvev6s4gvknti5xd6k',
                version: '1',
                name: '5',
                environment: 't',
                technology: 'SAPPI',
                isActive: null,
                cancelledAt: '2020-11-03 15:38:37',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: 'ujpsc1ppxms4rea9vy5rpazw8j33kphosnwptqdpzgkqdwd0w1',
                version: '2',
                name: 'j',
                environment: 'p',
                technology: 'MULESOFT',
                
                cancelledAt: '2020-11-03 22:03:38',
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
                id: 'gupjfb4dv2ojkcvnkboyuki8s7rffiknscfr6',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: '7t9cwkyyl1179z65c3f4il69q84o49h6j5j5wn9m31kuz9nv3e',
                version: 'l',
                name: 'b',
                environment: 'n',
                technology: 'MULESOFT',
                isActive: true,
                cancelledAt: '2020-11-04 03:48:29',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: 'ni3ad525mr2l4ybuvcba16cclebc2pfbc5se8',
                tenantCode: 'aof2wxtsc0dmu9d793v6zui5a9ziz70whmq9mqb8wfb4k1swy1',
                version: 'v',
                name: 'w',
                environment: 's',
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-11-03 18:29:34',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: 'ezop9x4yztgz2gw89ybmly1nkows81buv20auiw8ttzgj4w65k5',
                version: '7',
                name: 'x',
                environment: 'p',
                technology: 'B2B',
                isActive: false,
                cancelledAt: '2020-11-04 03:49:46',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: '2sui5taur9fwkr9xc8ri7ii7xsjn7zmnlv3yaclznmaegyx2zn',
                version: 'j',
                name: '0',
                environment: '4',
                technology: 'SAPPI',
                isActive: 'true',
                cancelledAt: '2020-11-03 19:28:42',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: '34sw5t99vnco0xr8gkjl3q6xcn1q2llg682phvt6v9yh32rvdb',
                version: '4',
                name: '7',
                environment: 'k',
                technology: 'XXXX',
                isActive: false,
                cancelledAt: '2020-11-03 16:31:25',
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: '8s87i7ynadgdhl7w55xig3odzb6x7r3n1h9px9j363iyd41eqv',
                version: 'r',
                name: 't',
                environment: 'h',
                technology: 'SAPSCI',
                isActive: true,
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
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: '6fhv3hr7qlqhcvw9t8m4g1om01nnf4ydcv3nw05ozz0fgvbc95',
                version: 'r',
                name: 'q',
                environment: '5',
                technology: 'WSO2',
                isActive: true,
                cancelledAt: '2020-11-04 04:21:02',
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
                        id: '5185a37a-db85-4107-bea7-4b54b84df4a9'
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
                        id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c4e2af74-8596-4d41-963f-4e94e6c51a70'));
    });

    test(`/REST:GET cci/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system/3fce4473-0437-429a-8f66-a60ddd8a7733')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system/c4e2af74-8596-4d41-963f-4e94e6c51a70')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c4e2af74-8596-4d41-963f-4e94e6c51a70'));
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
                
                id: '2adb1d9c-e4ed-4ccf-a556-2386e2a97e6a',
                tenantId: '11e0567f-1ee0-4ad9-834c-caa706386511',
                tenantCode: 'r5q0mrt68yw07bfboe2jzzuly94189wazd63touaaz2h6dy3ln',
                version: 'p',
                name: '4',
                environment: 'k',
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-11-04 10:49:47',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/system')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                tenantCode: '0ltnuvczmrcx8jpqvcyelxr22mnl4wcdn7wgp2sdt93bu1o3p4',
                version: 'i',
                name: 'm',
                environment: 'f',
                technology: 'SAPPI',
                isActive: true,
                cancelledAt: '2020-11-04 03:03:21',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c4e2af74-8596-4d41-963f-4e94e6c51a70'));
    });

    test(`/REST:DELETE cci/system/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/system/4a8e86ef-5eea-4321-93ee-73e04ad4a256')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/system/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/system/c4e2af74-8596-4d41-963f-4e94e6c51a70')
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
                        id: 'cc6048d5-2e03-4743-b448-bd7e2e02d10d',
                        tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                        tenantCode: 'urk5uwqtian238lpdlft8qpk9yliawoo0gms6xbgpugnxity8j',
                        version: 'k',
                        name: '9',
                        environment: '8',
                        technology: 'SAPSCI',
                        isActive: false,
                        cancelledAt: '2020-11-03 20:41:48',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateSystem).toHaveProperty('id', 'cc6048d5-2e03-4743-b448-bd7e2e02d10d');
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
                            id: '50638a3c-89fb-4fd2-9e69-94e3d12efa69'
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
                            id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystem.id).toStrictEqual('c4e2af74-8596-4d41-963f-4e94e6c51a70');
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
                    id: '9bc3235a-eb7f-44a0-a672-c3d447c4b7ce'
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
                    id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystemById.id).toStrictEqual('c4e2af74-8596-4d41-963f-4e94e6c51a70');
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
                        
                        id: 'ea37d2af-0084-456c-83d3-c5d842ae409a',
                        tenantId: '10ca0a68-7590-4356-99f7-58487790119c',
                        tenantCode: 'ge7enw5uq3lrd9zymkpvdzuferqu5r9qtd1b7ka5pve5a08zyl',
                        version: 'x',
                        name: '0',
                        environment: 'y',
                        technology: 'SAPSCI',
                        isActive: true,
                        cancelledAt: '2020-11-03 22:05:20',
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
                        
                        id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70',
                        tenantId: '9842d057-99bd-404f-919a-c981c57453f9',
                        tenantCode: 'f0tjvnt2cbk3vymqspyfnubqsxsq1brkykcgmys270z50xlyow',
                        version: 'r',
                        name: '3',
                        environment: 'd',
                        technology: 'SAPSCI',
                        isActive: false,
                        cancelledAt: '2020-11-03 18:43:41',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateSystem.id).toStrictEqual('c4e2af74-8596-4d41-963f-4e94e6c51a70');
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
                    id: '092503d9-c634-409a-9705-9ca8fe855a09'
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
                    id: 'c4e2af74-8596-4d41-963f-4e94e6c51a70'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteSystemById.id).toStrictEqual('c4e2af74-8596-4d41-963f-4e94e6c51a70');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});