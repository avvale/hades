import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('account', () =>
{
    let app: INestApplication;
    let repository: MockAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAccountRepository>module.get<IAccountRepository>(IAccountRepository);

        await app.init();
    });

    test(`/REST:POST iam/account - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: null,
                type: 'SERVICE',
                email: 'e2b9m3e7q9mvrq75fuhhbq3p59cjhlqxz0h6i4mtfqldu5aldkblhwaxhb928p7ukzthz61ssssgbteg9692gc3es5e24bhptqvzxwkns6a22h48q6tajpxw',
                isActive: true,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                
                type: 'USER',
                email: 'tipmqrvbqh7xx725y2kmcldm0sa6uinj9hd8jxffpdifetqyq5zkl6zldvfyed0t3l1p314fa5n8ehstv22hnipepvlgez9ueagf78tl56nu0ynr5j4tef0n',
                isActive: true,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: null,
                email: 'otvivjyolf6k5ts4n4msiazxm1uynspzayihjgh9u2nqhqt239m23zdk7bsfy9ced1dhuyhdd7dgrt0ukkjotu1qj24y2juveona9z5defx5z927vwgb4c5r',
                isActive: true,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                
                email: '4bg5v6393dzekwyt4b48qoqo57onipw5jdwd98m6cuqy02n3ik43dwldhma7k29sa7t4a9t1uwfwfzpl45ahu9g337z3ogc7enncflzwmwtabvthyd8hgog7',
                isActive: true,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'USER',
                email: null,
                isActive: false,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'USER',
                
                isActive: false,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'SERVICE',
                email: 'nzkhmh7ilpfhb77tt1vq3308ku9rsg5kh4aq9f6cm3g43g9yx6o3x2eh6002euu0cgvzvn8hh2a7k7uoy34ems5q2t27hsp40qtk58ytclmsnizu14f8qm0m',
                isActive: null,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'SERVICE',
                email: 'luae2egbwct1t3fxr4rsq8nuir70rrzp0wkrs6ol6pm4sfgmubsktkuji8x3uihac1w9xm6gymyii0b76bo2yx4zupd8m5x0giv9ni28l0e3xlmc82alsql8',
                
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'USER',
                email: 'mk6jxsukpjg3pz3qmj8e94qvhmqjlj2xh5ma0luw6far9u5mcmvj9wq3irh357f6zb47vorgxk8398t6rlxsqnuejv88ei24r9loftimp9k2jj0h7f5n2wmk',
                isActive: true,
                clientId: null,
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'SERVICE',
                email: 'ewfq8rc7g7ic2ic6i3uty323y2t7q417ny81q5ptkjs5edt2td78kwnhkdta66iaqvno94w2na4pvu02hrgpghqgc3dmmwf9qqa2kmd0b6ntiuh5tcj78w4e',
                isActive: true,
                
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountDApplicationCodes property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'USER',
                email: '6g1t3380vkkqqpg4vcbcu7kkwy941jdhragd1tp61ak2ilyvs8wzaowqz8nyn22lpl80u6j0zhcpfizuvyc18rkq3idfjpzy8zfadhstq1b1a2zcg0d5gjou',
                isActive: true,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: null,
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDApplicationCodes must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDApplicationCodes property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'SERVICE',
                email: 'x1np33jygeehzvfpeld0ewpz98naxvovqvk9rywnkuu1hupk0uzc342mvxhzaj87a6jsj034quqiiz9ljppgcrhdym475g7v0dec6jlgwktkl2i9uju5mr4l',
                isActive: false,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDApplicationCodes must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountDPermissions property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'USER',
                email: '3ak7kests513q1zdd9e9orxmvwlinxs8drsp5l7kfls3w4mc0kv1oxga13d701x6xjoskuzcg4dpr4i1pausz8ywvgu3mwz1unjoqbgxa4ie5c20sy34kkd5',
                isActive: false,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: null,
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDPermissions must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDPermissions property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'USER',
                email: '4aabut5jm3u8eiyjbogtz1hh0zrkzu99bpm63grficlsd2s5tyhu8k4jr1r2xcty31dsflztxxn48dilokq869s5fd9z5fcwb3xhgu29wxoqrh2c8hw1esow',
                isActive: true,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDPermissions must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountDTenants property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'USER',
                email: 'e3m9xy6ya62egr54mqygikdcz0vi85t3hj81783p5vtgc59p1i52it597j8txpqbvvzjdply0f3mpkkoujnctiatsd6q3pbq8vvzypojyuiwfhxl0kenz2ji',
                isActive: true,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: null,
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDTenants must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDTenants property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'SERVICE',
                email: '8960xj6li477j8uh8c3bzrz7p5y1m9zvumt5l0fqxku51xv2ncw85sfs8yag62do6zhzmo9nsjmfgwo4vqom14xy04j5qbannn0qlymo7rcbxpsdy3fehv1x',
                isActive: false,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDTenants must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4cefi5g2e4wz7774x8s6vvyy10w39sclia0zs',
                type: 'USER',
                email: '2zaedtb6rgwj24djs93cgecohq8fcbdew60g8ntx71jvfkb8smxvfpgp0aix71s9qi2nrkr4t6yjwo9znf9sfnv12ibpt2uc7h1u4zsktgz6753w6jcsblxw',
                isActive: false,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'SERVICE',
                email: 'diaub6qt4uel6kusend3t5buq74ms4a854e2lnx6dx06w7kygd16i8wo4xbdy0l680zbosp1jms32baomuxsluremm1h6f3sbnjxgf7ok7y5rdhqorfwh1mz',
                isActive: true,
                clientId: 'hqqbxwr8swy6ziu8d8590vqvqx6xzr3ic16ze',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'USER',
                email: 'v7v3o4c17nb0s9k0e292jqkxp3z6ei843ynn970pknwwee3qmytsz1bayt3uh5hzdcvpkpl5of09gw5p0ni3f4y56omia87ymnhrnp1h3xzjmmp2t7tm0o9x9',
                isActive: false,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountEmail is too large, has a maximum length of 120');
            });
    });
    

    

    

    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'USER',
                email: 'ztmpnb71ts2yhtspig2t51xuvnllz5yb79za13f13vsjikbziwfg95wy63g1dzmbg9bpxzlzisrx3v7xxrsr6ivp5w9uoprm5ee221cm6loxdg6yc9o7fyo8',
                isActive: 'true',
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountType has to be a enum option of USER, SERVICE`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'XXXX',
                email: 'j9cik5aar8a6idr8knn1xbhuck7ygd55mbjwr0q7c66rk6wh9xs046pdf44hyue7n2jxbasma9xd8izodurkxhypms2a70spedvv8rwauzfyxsxflhc9frgv',
                isActive: false,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType has to be any of this options: USER, SERVICE');
            });
    });
    

    

    test(`/REST:POST iam/account`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'SERVICE',
                email: '33k9681s0m87afrhy06xoht1vxwl9kyj2dt6dfb1sd68qflw6fzhhj9maky3i5mhugjov6j81i64s52l2f2ah3pvjyp6lodydybjo150lmf4hw72xsmv2ce9',
                isActive: true,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/accounts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/accounts/paginate')
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

    test(`/REST:GET iam/account - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '8d5301de-a60e-4616-a942-973a41bda776'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/account`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/bc72a158-b953-4630-b52c-34658e72c4e8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/f7ee569f-2f9d-4fa0-a3ef-4c750d883b83')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83'));
    });

    test(`/REST:GET iam/accounts`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/accounts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/account - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/account')
            .set('Accept', 'application/json')
            .send({
                
                id: '034ccd12-48ea-4d7a-82c7-8948c17ccc9f',
                type: 'USER',
                email: 'ypvc6o647nxxhyg6o076zj57ufye2rfjvx23ngryzggmjjeyictwo4ibs38njn9kv4mw81gev0wekfeb8aqb6pm70pl1fc1eoafe1mcap8hp1dwxoazmpp2j',
                isActive: false,
                clientId: '4f00b819-7c51-4035-b746-9f4fd3804213',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/account`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/account')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                type: 'SERVICE',
                email: 'w6mnmt1evg2hdonx14lqyileqghhamugee6bpbhd2zgxnalisb4p215lbrf1dley9pm8qjp0q2je4m8yb1bmw58k2biiio39n1wid73phqxaaa0qqk3412t4',
                isActive: true,
                clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/4f6f6bd6-9bb1-42e9-8d0d-176147771ef1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/f7ee569f-2f9d-4fa0-a3ef-4c750d883b83')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateAccount - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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

    test(`/GraphQL iamCreateAccount`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '39ba0023-15d1-42f4-aa13-029c0abeb3b8',
                        type: 'USER',
                        email: 'xubuvqkyg7tey02k7wftx2wpywuuvg0n47xoolaqj5z98uj5kybgkkop4ad2g46hv6wcdiuhclmzfenoxd03ig6adsa3u2xis89bj3lnwvg7vzdwmbngqiwz',
                        isActive: true,
                        clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                        dApplicationCodes: { "foo" : "bar" },
                        dPermissions: { "foo" : "bar" },
                        dTenants: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '39ba0023-15d1-42f4-aa13-029c0abeb3b8');
            });
    });

    test(`/GraphQL iamPaginateAccounts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateAccounts (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateAccounts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateAccounts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateAccounts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindAccount - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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
                            id: '37b95338-9e5b-4af2-a20b-f244a15a89a3'
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

    test(`/GraphQL iamFindAccount`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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
                            id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('f7ee569f-2f9d-4fa0-a3ef-4c750d883b83');
            });
    });

    test(`/GraphQL iamFindAccountById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '81d1fc4f-5e3a-415f-9362-b2a6556d1672'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindAccountById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('f7ee569f-2f9d-4fa0-a3ef-4c750d883b83');
            });
    });

    test(`/GraphQL iamGetAccounts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetAccounts (query:$query)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetAccounts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateAccount - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '35b2a50c-ad92-417d-a510-3e564ce8a2eb',
                        type: 'USER',
                        email: 'dl1f0efguh0o4q9jmjombjomsp5emrw830383zrvlo451dip8sq6sgzl08pbmpqmz1ymsos8b0qn1grpbrssc5sd50ved1quptlh92kvnv42pf246ophhkz6',
                        isActive: true,
                        clientId: '24fb3b1e-f801-4a0d-b62f-c74b976179c1',
                        dApplicationCodes: { "foo" : "bar" },
                        dPermissions: { "foo" : "bar" },
                        dTenants: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
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

    test(`/GraphQL iamUpdateAccount`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83',
                        type: 'USER',
                        email: '2xkjr1venjeb29lixep7kr2gt1nut4ykihvchwie457c6bgynnq1t5to3zvm6qc4xrvpa4yxyu36udrx8hwm24st4frhy6yky4eo7imefam69pe40izc5jz5',
                        isActive: true,
                        clientId: '924c37f4-a5b3-413c-880d-2a4f0bdb443e',
                        dApplicationCodes: { "foo" : "bar" },
                        dPermissions: { "foo" : "bar" },
                        dTenants: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('f7ee569f-2f9d-4fa0-a3ef-4c750d883b83');
            });
    });

    test(`/GraphQL iamDeleteAccountById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6e9ecc41-bbd1-4f9a-8206-95761996321d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteAccountById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f7ee569f-2f9d-4fa0-a3ef-4c750d883b83'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('f7ee569f-2f9d-4fa0-a3ef-4c750d883b83');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});