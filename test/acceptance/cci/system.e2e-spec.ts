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
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: '4yyh56zeewbihz9evsfufikkkg5vxx4u54zb09cr81qmhjfbhb',
                version: 'g',
                name: 't',
                environment: 'i',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-11-05 15:56:05',
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
                
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: '1isvvipez1ba5npbuxvq05f9ne4cr0q060moodkydrj11ynnt4',
                version: 'l',
                name: 's',
                environment: 'y',
                technology: 'MULESOFT',
                isActive: true,
                cancelledAt: '2020-11-05 23:37:38',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: null,
                tenantCode: '4lc6wifxq4lxqvuekfp2lvkpmwvtch43933wzj6epuvr61geot',
                version: 't',
                name: 'z',
                environment: 'z',
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-11-06 07:52:04',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                
                tenantCode: 'xwl04u4sujnzky0694xm47kcnrcs02tvip4jqdl1tcvfd1nmtv',
                version: '5',
                name: 'l',
                environment: 'v',
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-11-05 19:56:20',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: null,
                version: 'v',
                name: '4',
                environment: 'b',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-11-06 00:52:39',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                
                version: 'a',
                name: '9',
                environment: '9',
                technology: 'B2B',
                isActive: true,
                cancelledAt: '2020-11-06 08:59:20',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: 'tbb69yujly59trg1cqgqjku4gf89l839mbxj5ts7wzft3x2623',
                version: null,
                name: '2',
                environment: 'k',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-11-06 04:15:35',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: 'zwe24lwc55e546xkkecs9f81f7a5pnrtrip3s2t2hpaq4tev08',
                
                name: '5',
                environment: 'm',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-11-06 03:56:42',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: '9a9tkye9ubsoyb4w5nohrjn9s46v8qd4vawdu9xnnm858wnt75',
                version: 'y',
                name: null,
                environment: '8',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-11-05 15:39:37',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: 'u84f1qjlif4z73zx80s4ve0ykw7eusla6pc4x90wscwci3ldiv',
                version: 'n',
                
                environment: 'm',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-11-06 11:01:46',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: 'b6ykyja6s8i5z9ygxwq0pstrxtok0c4hoyiypi3owaclpgwmgp',
                version: 'r',
                name: 'm',
                environment: null,
                technology: 'MULESOFT',
                isActive: true,
                cancelledAt: '2020-11-05 22:59:31',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: 'gmzmhv3pei96iroso1nvt0t5mx54tec947meh0jhzpjeskzskc',
                version: 'u',
                name: 'q',
                
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-11-06 05:40:45',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: 'i1i3k0tduzk6mxgz1cp6ss1tdd4u1ynu8juqj2p0qr47240201',
                version: '1',
                name: 'p',
                environment: 'h',
                technology: null,
                isActive: false,
                cancelledAt: '2020-11-06 00:54:50',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: 'com2on44lxlrm1x8qt048vdzi15edz8yjzkw1asm9mjauvubal',
                version: 'z',
                name: 'a',
                environment: 'x',
                
                isActive: false,
                cancelledAt: '2020-11-05 14:15:21',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: '5lvogljjp0w2k2vnpmibkp4cdt4mgeut7wzrqqhzv5w8c7t2db',
                version: '8',
                name: 'o',
                environment: 't',
                technology: 'SAPPI',
                isActive: null,
                cancelledAt: '2020-11-06 01:10:08',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: 'ambnra2b64wwn9isvsfxp1vr4j011usipl56e1f54oh7kmive9',
                version: 'r',
                name: 'v',
                environment: '4',
                technology: 'WSO2',
                
                cancelledAt: '2020-11-06 06:36:18',
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
                id: 'z8bqv4u4jfncmvvo4zvqsflinqmto10j90mrw',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: 'h77w6tzq4qokt218vm0rjrhcuyqzlmhn5pk6slapyz1bhp4jg5',
                version: 'p',
                name: '8',
                environment: 'f',
                technology: 'B2B',
                isActive: false,
                cancelledAt: '2020-11-05 22:26:43',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: 'qfns1d8neqeuczmnzhr5k1mmwrc0jt7t6a5ok',
                tenantCode: 'rx5dsgda8xs0e7qvx05k9xd6cwbwo0kapfnd5x1kh9y8bxlbyk',
                version: 'g',
                name: '4',
                environment: 'z',
                technology: 'SAPPI',
                isActive: true,
                cancelledAt: '2020-11-05 16:16:10',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: 'e3nplib9fwtbcs2lu4o3r0peu2pzl2pu8v8ezboye9i32xm6hk3',
                version: '9',
                name: '0',
                environment: 'x',
                technology: 'MULESOFT',
                isActive: true,
                cancelledAt: '2020-11-05 16:22:14',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: '2lgukwaat87r2dmc5udcat325wkk83wvry705h3t7ffgjkbcs7',
                version: '3',
                name: '4',
                environment: 'q',
                technology: 'MULESOFT',
                isActive: 'true',
                cancelledAt: '2020-11-05 19:54:11',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: 'r41rz64930d96w1agoaz39f6w68z87iwpahed90xh5smjnxcgx',
                version: 'n',
                name: 'p',
                environment: 'a',
                technology: 'XXXX',
                isActive: false,
                cancelledAt: '2020-11-05 16:53:38',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: 'g9ju8l98loxren7kq3oxmztlhkmq79a5kwl9ajmvpb59uq8isk',
                version: 'w',
                name: '6',
                environment: 'f',
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
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: '894kn391hnhzhsl58l4jeirk8q1xwh6wubnwdg1n876f7zmada',
                version: 'q',
                name: 'o',
                environment: '4',
                technology: 'WSO2',
                isActive: true,
                cancelledAt: '2020-11-05 12:19:07',
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
                        id: '3e465d63-4fd9-4dbc-8532-b4708acfd8f8'
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
                        id: '4588be29-d2e2-4237-ae20-6b5454220d3e'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4588be29-d2e2-4237-ae20-6b5454220d3e'));
    });

    test(`/REST:GET cci/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system/b4437d76-5021-4d71-bc46-add360d16e69')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system/4588be29-d2e2-4237-ae20-6b5454220d3e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4588be29-d2e2-4237-ae20-6b5454220d3e'));
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
                
                id: '7bce9c7c-4eea-4c68-92db-a811bec2f1c6',
                tenantId: 'd0dd07f7-df4a-479f-821f-89f09ac45021',
                tenantCode: 'no4u6rg5i2yw7wkcoqkbgk08reuf3ofxxs75zbkk1gwcnygyuy',
                version: 'e',
                name: 'm',
                environment: '3',
                technology: 'WSO2',
                isActive: true,
                cancelledAt: '2020-11-05 18:22:54',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                tenantCode: 'dcglzpi8j4sbdu9raw1y93ve6m2t5zrvnj9lnealxfv7qou7wd',
                version: 'p',
                name: 'y',
                environment: 'u',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-11-05 15:26:44',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4588be29-d2e2-4237-ae20-6b5454220d3e'));
    });

    test(`/REST:DELETE cci/system/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/system/5f462875-1bb0-4e4e-a33d-0b30e2265e03')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/system/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/system/4588be29-d2e2-4237-ae20-6b5454220d3e')
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
                        id: '112d5782-ddaf-490d-b5f5-e00b411f18cf',
                        tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                        tenantCode: 'mt0u88baqeud3hiwnsrh6jd6eh2wdps9360vtphrbyzafgvgs6',
                        version: 's',
                        name: 'i',
                        environment: '1',
                        technology: 'SAPPI',
                        isActive: true,
                        cancelledAt: '2020-11-06 05:49:01',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateSystem).toHaveProperty('id', '112d5782-ddaf-490d-b5f5-e00b411f18cf');
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
                            id: 'df1e5462-1950-4f85-9516-f6646e86d008'
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
                            id: '4588be29-d2e2-4237-ae20-6b5454220d3e'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystem.id).toStrictEqual('4588be29-d2e2-4237-ae20-6b5454220d3e');
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
                    id: '69ee92e1-a4e0-4ecc-9fed-f3917079b11c'
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
                    id: '4588be29-d2e2-4237-ae20-6b5454220d3e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystemById.id).toStrictEqual('4588be29-d2e2-4237-ae20-6b5454220d3e');
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
                        
                        id: 'f933a23c-7257-484b-a2b6-404c62b8fffc',
                        tenantId: '57a78167-5db5-4e3d-bf61-7122f41ad2c3',
                        tenantCode: 'q00simgfwdcdjevrj9x6p3cm0hjckwk7lkngzvy9f3k5u5zp9z',
                        version: 'e',
                        name: '4',
                        environment: '5',
                        technology: 'WSO2',
                        isActive: false,
                        cancelledAt: '2020-11-05 20:47:05',
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
                        
                        id: '4588be29-d2e2-4237-ae20-6b5454220d3e',
                        tenantId: '42b6f309-88ce-445c-bbc4-0b4836ea4c0a',
                        tenantCode: 'dxjdk43ifbhbx1kytu93nrt3oy28qw1pajvjg1kzm8ll3gz85b',
                        version: '6',
                        name: 'g',
                        environment: 'q',
                        technology: 'MULESOFT',
                        isActive: true,
                        cancelledAt: '2020-11-06 11:35:39',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateSystem.id).toStrictEqual('4588be29-d2e2-4237-ae20-6b5454220d3e');
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
                    id: '365e11c2-0c17-48a5-a72f-1a535d531646'
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
                    id: '4588be29-d2e2-4237-ae20-6b5454220d3e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteSystemById.id).toStrictEqual('4588be29-d2e2-4237-ae20-6b5454220d3e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});