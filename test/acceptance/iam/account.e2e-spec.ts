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
                email: 'ykiac9g2y5t7btfxipxmi932hitle55ky78ynl0iz2flkk3rmgw9fc27h1qixp8y5rf3kdwpu8c6xsrhuga4vac083svna5oi1oygai63dpc21z4gt41aluf',
                isActive: true,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                email: 'bvaiaowl7vx2dnuwbp58l6p5z9oin3xy1qkshxx0zj96hd5y4ucwtrgu4i4bzqxzigwm72zwm5jk239ez0pkohhww2fj17k4h9rsf6912h35bhtko27p28r5',
                isActive: true,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: null,
                email: '8tp4s22xwvl492sem94kcwwu2hn7oqzxdidfswqgcwns52yq3jaztzqo52wy8pls3dqyfbjpyih8rr0c5acw4qwwnnft5lcph0t0mpiiqcnwd2qgxqzs2u6m',
                isActive: true,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                
                email: 'hlomna9y3qm7uxom3m3nekkklgdks1hf89uakv76thpggo7sh6srq4abblxfvkjypfruvdjoyspbif0t6j82jscbxon3jajra5660cgaytoe9d3w2mgwo6ll',
                isActive: true,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'USER',
                email: null,
                isActive: true,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'SERVICE',
                
                isActive: true,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'SERVICE',
                email: '19urtaqkwi64n7dkcqpru7fe97nlezz26uwyc1n1yeuomvwli3mat1u7obmpuu68om02iq9irkrd4gzzz1f9u2bt777ozkkw8pti0gkpjefpw6xz3qtirbdz',
                isActive: null,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'SERVICE',
                email: 'kk8gtx8ynmgl6ymdw6rvyaziazm6253ttnmmq2olxprwhzjqfwhxjdionfa2t2hdc45mfm7id9hs4kfb6mfzmz5tivz3h4bbi794ajnzv2no3ubbkdcrwao2',
                
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'SERVICE',
                email: '4vj43toiw3djib5j96c4fr155fgeqtmfn1i3z84v1fzrtax4goch7ees0k3sdscju8wgan2skm6oi5w9dah68id4ixuzkb5jpgzkvja1o7mbknlj4cxlxanz',
                isActive: false,
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'SERVICE',
                email: 'lqv94yw52kbb77flyrqqlmiahtzoif1f2lsysnkmrsqzq4uq242zu1q1js7cpkxqq2bigv8dbox7y4c8f2jvua2vhe6xgv1rmciywl01qijjjv33vnredzuq',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'SERVICE',
                email: 'lrkc5dmhn2s4ep52drryfathe91mf1qsc2kj1ljjtem1tk986rdqqjmsf6asdfb6lt7j3nnz5eb9sh5j948lblhrh1xp5aet7vqxpjpqtt8cjzkdtbeqei0c',
                isActive: false,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'USER',
                email: 'ux5ku2qhj19rvs4n036rcuzg1mo411qrel6b33vjdtxxaag9vksnlpbevkikioofufjsmtgfahsygra8hckdvnbh6gkmsxwot6jbrezfw5865golhca5u9n1',
                isActive: false,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
                
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'USER',
                email: 'a7si8i7bmzykeucamwqdj0pi7qhk8rr92azbakmfwhticgr28kxpnzuv6ugobec4nzyayakyh9r0m3d2blf7sei64cee51v5wfkgidosn809jppoc9erq0gb',
                isActive: false,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'USER',
                email: 'o24i95b1bpx3v7ix8bsxwo150wauod6smsmq65mytszq57g983a7wedjbrryurfjn6fczolygfn3vf8hkx8vdngfza731gvfeuxc895jrjwkncq9l4o0zu4a',
                isActive: false,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'USER',
                email: 'qoryurbbxq10gt3nk9fadek7v8icnt39386g89m51rclbdx3bdmfpnkp5q5vhd41qtvlcskxpatxpljk5k3rc7whvivwynwsvhbcvy0epeadcy2oc9igqp49',
                isActive: false,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'USER',
                email: 'gwe9i24hc9kaqw19ibe05s2ugp9znts3q8cle33f1k0m0w2k1xa4wb9vvafdki2vo6jh8axr5jcgq4dmb5sv236x6k8m292aearyoh05opb8cmqs64xg2kus',
                isActive: true,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'i5ef6hhjwkdp9op1upw383z9f992yx3jce5a4',
                type: 'SERVICE',
                email: 'bemx5n739vt5h91twwttvxqyfzbhdfii6y6smw5qib8sgga9uexzm3wcxr7g15dxr5axt8h71h78djia23myi98tkocfrl5a0sze8umkul0n2jqdmnnq1qw7',
                isActive: true,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'USER',
                email: 'r9xklgdc7bhi6oqu4b0enw17ia13t8zbg30tuajyj6683agsd1odgqmmymxsi5kp6p7iy0b5goewyvr3tddjla5pbiyvps4nh2ur69w9wf63zshbtp30jgdo',
                isActive: false,
                clientId: 'wpbgosg88a18f1a42bi0b97fzmhgqauhwpeby',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'SERVICE',
                email: 'a3191wwlsfxeox101081o41h0xcfq4byjogc4m8684jph741yi906bazkih6hwauljat75d2kf7ov9ln8co9fnn0g0moz8m1me07bkywbp4f3i0jkdb9uxl9a',
                isActive: true,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'USER',
                email: 'as5ui0mvis5j9ldy3nbn9usxwdgko3csxf87pntorngcqmdvnoan76gjy4cvrdtmthgpmcvti5lwktznnobbpi8sovp9k5xb4wy8mbzpa7oxxwrolxfgh4dy',
                isActive: 'true',
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'XXXX',
                email: 'md5pcexbinkxgs5ytf4tn98nsp18zsvpvxpzjszm11z29qml9mmkc76ejhy23nxj43a9p4d9m1sf0e4iu5wfwxaqhdm4evndm3znlro7hfnxjp67yaai5ro4',
                isActive: false,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'USER',
                email: 'bp8jg0tk2vyhjbfimq05jhwj5whi6xoec38ke5eq00b8krak7ozj8eg9g3uxwud20p2ebj677pydcuppr3dcy7dtw2sy0fvepel8degxklmd9xnjm6wjh65r',
                isActive: true,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                        id: '04d03dcd-5f63-4e6a-8859-14e2087c9ea4'
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
                        id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cd64e54e-0d77-4206-8e18-2e0c98dab157'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/9428e268-5201-499a-93ba-e22b722e075c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/cd64e54e-0d77-4206-8e18-2e0c98dab157')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cd64e54e-0d77-4206-8e18-2e0c98dab157'));
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
                
                id: '65968c6d-36f8-452d-a319-32832fe41d5d',
                type: 'SERVICE',
                email: 'gt3puqlrp6e5r2lradcd87sayofc9xubblmvzsg5gtg8rscvuwjkmw8llbajjgxxl1gog53ghswfycv7x4irmeqzctfmxy7wqy2fayn8pedf1fyli80a6w23',
                isActive: false,
                clientId: '257eb92f-2b85-4aa8-84a4-f72e5364b5b2',
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
                
                id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                type: 'USER',
                email: 'agahntzt706ul3twxxr7z70b1z80crvmjgjh8j6rvntmqmeqagdzd2rr0kny4tdu7wbe4vc35um18sllt39xwe9cji4kclli51wbz550mred1tzy5qwzeg2o',
                isActive: false,
                clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cd64e54e-0d77-4206-8e18-2e0c98dab157'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/2511abcd-b8e5-4d8a-b610-d762a86d5f9c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/cd64e54e-0d77-4206-8e18-2e0c98dab157')
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
                        id: '21e5c54a-2efb-47fc-ae93-b57fa39c9695',
                        type: 'SERVICE',
                        email: 'nmjad00eyaiebbi1lz8z9eh043ckokso2pg5aibbo3o39egu74ydd82yo0mimb05b03lnvz0buvxpmbuii3elbsk5403x655tner95rpt4dyrnwjra2y1pv8',
                        isActive: true,
                        clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '21e5c54a-2efb-47fc-ae93-b57fa39c9695');
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
                            id: '8a36cc0a-0c6d-4d1b-8622-78caf7fd5e37'
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
                            id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('cd64e54e-0d77-4206-8e18-2e0c98dab157');
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
                    id: '195cb415-2e3f-40be-9c4d-353ff5323ae1'
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
                    id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('cd64e54e-0d77-4206-8e18-2e0c98dab157');
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
                        
                        id: '4d636608-cc1f-450c-9a9a-fd4ce1c37f89',
                        type: 'SERVICE',
                        email: '38x3a2pwiwf23e3pa4liy6ovzhc490xazwud2vtcm8436edhu4tm7fjkxn0jb98ugzvc31i206gy5gqsqgiowjawn141onblnhk7gc33cpqhwtqjwudq1jbl',
                        isActive: false,
                        clientId: 'e0a3de27-6dfd-4780-915c-d9e816ffccae',
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
                        
                        id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157',
                        type: 'USER',
                        email: 'uu0jk1vmqoxhaeddh381oykulob09rxq7yg0oooxx6hpi2d4yrvghrk5oyazri9j0ghi9dpse3qsjq4mv586bzq2wqu2aikdborxzpolq2qyc104ko952wfs',
                        isActive: true,
                        clientId: '7db40fe5-6ee1-4c26-a460-3733d2fe1c61',
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
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('cd64e54e-0d77-4206-8e18-2e0c98dab157');
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
                    id: 'c7420280-4724-4e35-a127-28c7edc55704'
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
                    id: 'cd64e54e-0d77-4206-8e18-2e0c98dab157'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('cd64e54e-0d77-4206-8e18-2e0c98dab157');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});