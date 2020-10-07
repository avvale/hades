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
                type: 'USER',
                email: 'b6s9821n79jflaco9u8pz36qd2bh9udl83wmlem4kois5jec3nw3ut1vqdygv83lkvn2upg8hcnrzi4teuq74oqz8bwz3vkjpmtwijjcevresd3jllixbd95',
                isActive: true,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                email: 'gkgalmk3zj38pi6yfgd6su4jgx2kpblwnie9fztc5vt53csycsb1a81ysupo9s75fdetyiwqojchjazfqruknua0kh343llh0ej3rgm0i53pkgj31arss5qk',
                isActive: true,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: null,
                email: 'hicgcqxqbb9bh7vc5rfc82hz9o2r0oq3qeede1rz7y1t8diuicy1t962jd8uli8qv2xz3ilc2swb7mqr0wcslsgtbvvntu3zwkxqt3b2fkzqa4xsi2lsm6xy',
                isActive: false,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                
                email: 'dl329ciwgzbjmmi5gfcoravkqjj8w28z8j5r84b7om1pdd80zs443drg8hwpv4b7pc1ff8w2l3hp9cu02t9lkcbqgrfhgxshzlzzgxy8z0qp8hs95g7he36q',
                isActive: false,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'SERVICE',
                email: null,
                isActive: true,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'SERVICE',
                
                isActive: false,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'USER',
                email: '7y3bo9ix1mizukuerw852bqunc5hxcddrnx72rm8g9n2jbp096egfozk7f302dibnink9itz4ddb2qjkvfjewhgszgtfftgrrxkng66u6az1mohra6bgzltu',
                isActive: null,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'USER',
                email: '9lkpuqu6ixrowf7mc51mw6x6bv5kpjsk6jkn82c2ekdvbtvvhsd3lf3mcc191xc9wg0dbphx8o06s23hu2ecegvev36ro3pombknijpfslr9qmu05x69axee',
                
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'USER',
                email: 'f6ykrcpc64jjneh6q5sfj6r5bh5abq2lp09hbmbonkpz29l906ium6objz3qtvx4s5a4lb037ci87o7z8w5eoinnod4wpk39bomtvha45l04vjsplcb28vk8',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'SERVICE',
                email: 'w1rhocz31e2mcveh52ipta2b5hcoo0l1fbhs7zi6kii6ofzz2hjzsf9d5rfqahvrm9zvmm24tubs4k3fngb590szvjnt8cxhirae6sx9qcgyqm2q7rjo5cnt',
                isActive: false,
                
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'USER',
                email: 'iphqz06vdu6x14e6n2v34oxnbe3ifjvnzv6fhvbs8332k7qhfsfw7m3ljpcnlap5mtv29bk18en6fhffviq4ut0szw5e9d22ha54eev03efrbpreos783ghz',
                isActive: false,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'USER',
                email: 'hrgfkqm882u8tjy98bnu0f8zs7ghcfo49rcaozqlqi0b7xhut1ual2uhf0xudf3u4k1ilymp7eprb4abcuae609u2c1iswud85dzar44rkmu4tverk95mur7',
                isActive: true,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
                
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'USER',
                email: '46qx2pxqi2o1v342fjp7dvayl31j92rufmst03j61wjcyagbgqgw5d7w061oh4d610m6aklimfn8p402deovbdl2j73skqavvvhfxh8vrpa2d0bg793iglo2',
                isActive: false,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'USER',
                email: 'utpluslbqgb1n5jzjor26ovcp7pgd65nkgwrlnwk81yylaugxgjp8fatr6jmbrfbuu5kmpbha45vmtnvarfmcp4041x4rhk0olsxn38xf70898n44pdtcu49',
                isActive: false,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'SERVICE',
                email: '9kykm5gicpa8w9am5xxhlxmstzgzixrioju0d65r28s6da7qsgm84na6nv0puwrq5ndamr5jtekk8c7pncj0l5r0z7rdmu97k4p6nsdcycv7uvdojlm9dryh',
                isActive: true,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'SERVICE',
                email: 's3o5d1g55qp0ct73deac2cmp2h4noj7oa8jiunhoa2xldipnp7zyp6x789by0moynit5s1otdx65dnrw8e2h520awkisfj21u3gtthugizpilcqx2ysvqmkx',
                isActive: true,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: '35pj47hx1k887d5syh9s6ysrpgp70e7tpecb9',
                type: 'USER',
                email: '06pu0u07tcip4hwco1t6d5q85c4vc65uhwn3w6qwd83m28ulepvnexaqg8infctz17wb4kfobsyj872fp347cb6wmu8zudexuocamuduzpn3qcotl6gc4cwc',
                isActive: true,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'USER',
                email: '2homm3zc3begqy05oi0yyiie0t96v53teqrqpsfy0ev80m55cy21u834dmj2quwtv92rz66nlgc1j1r5ex2h26wp4eabcst375pjh1g7wzxcaxvl9np72ecw',
                isActive: true,
                clientId: 'zv8tsxw60zetjok4dcztbi740uxppgz7v8t4x',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'USER',
                email: '2k5kgc9bzv7vx8jhnl3fy745pdwvhig7rtodgqmp46hfe6b5uk0lfcrufm9ddgik8rxw43qyy9w4zcpxna2azwbekggyx3ptvjqnz90f0ap7vbj7i90bf741k',
                isActive: false,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'USER',
                email: 'jxx7catdufkjb282288n3b5nnwcxkssn2bj1lt13upjff17xkfn7hgyejzs7y3eftrkizc97iul0nudmqyd7jz40btuebqh0ceiyc0r5c9zwks3wwlon9qlh',
                isActive: 'true',
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'XXXX',
                email: 'twqr9qxlqaidk8z6pjgds3w27wz8iccl0hgv3vzltqojgmmgmzru8z1zq0z2evcmgb5z6piqtklx0cjh19z4x0sup128i77archakn0jg2m7mvtngl7fwtlk',
                isActive: true,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'USER',
                email: 'hzlj7pbnmyggvs9qy2h5y1xp6alg6byirsc0d00kf197s4na2ip1q5qjy3azp6jlw6xv2slet4jqmvv7m36e93mjzxay14vu049htp6tv8orolmqyidth3i7',
                isActive: true,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                        id: 'e777ba13-f1c5-4d1d-a5aa-d2f965157243'
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
                        id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a1116da9-e76d-41ab-a195-c0a8fc527e15'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/62390fd2-6d06-4340-9975-0372209b9b39')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/a1116da9-e76d-41ab-a195-c0a8fc527e15')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a1116da9-e76d-41ab-a195-c0a8fc527e15'));
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
                
                id: '793c3499-e58a-485c-9156-c5755a59f8bf',
                type: 'USER',
                email: '0xkfzw3hmnwckaxuscwnl33ane2d12wuzlowun9tsc6c4eohfnlevbodzq482ey3xzggortpgkr1p5awfy4t8pwj40dlkseavwdfuyadgi2mq9jf5d5qv7wm',
                isActive: true,
                clientId: '5f1af78e-8fe1-427a-83b8-d60fdf9ee79d',
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
                
                id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                type: 'SERVICE',
                email: '7cqr5mokltsyd0t5gmxzu4u15qy6v39d1okmg8lapb4iu3aiaxvr7xzn25lr78eu4vawzzn1at9rtr76psirhm205yu3b3yshdcqfeoaisedghybf0gb562s',
                isActive: false,
                clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a1116da9-e76d-41ab-a195-c0a8fc527e15'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/7a21e78b-708c-47ab-b8a4-616c2b640c4d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/a1116da9-e76d-41ab-a195-c0a8fc527e15')
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
                        id: '77da40b1-02d9-4c76-872c-114ef6c71ddb',
                        type: 'SERVICE',
                        email: 'k5i4avjrwmy91vngy2p02885v717lh8hr9wat6cti78gttix06qi7n49f5xluyljjdxgnw94hdg0wpni7tdsgxq3wtuj6gfczsggunizk8d3xszj8jr6fkec',
                        isActive: false,
                        clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '77da40b1-02d9-4c76-872c-114ef6c71ddb');
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
                            id: 'f6717ba0-c5cb-4a68-b121-595ecfb701e3'
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
                            id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('a1116da9-e76d-41ab-a195-c0a8fc527e15');
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
                    id: '6b6a6b0f-398e-4f8c-8321-c709ea62a8fd'
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
                    id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('a1116da9-e76d-41ab-a195-c0a8fc527e15');
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
                        
                        id: '9c92229d-1992-4123-8c66-7b1da0f1d944',
                        type: 'SERVICE',
                        email: 'u0r516d428jje1f8fx4wnsngnlcql9sw9jkd4t3sy2ttaut7533uaazuofescmkq2ahmed91dpj971jbjj5ov3dvtl026skvidn4rbhzp1huq9aadvioegv4',
                        isActive: false,
                        clientId: '68a4e7e7-10e2-4a21-a442-94c971e85550',
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
                        
                        id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15',
                        type: 'SERVICE',
                        email: 'awf5zgzv650rkxx9ze9cd9u2a6ba6kf10uy7l6fzpedifz075g2pvqfh99gq3jb42offz2x7s6kca9bvrifkssfle2bjh5fqk6cdshe91red2si3zs3qjn0a',
                        isActive: false,
                        clientId: '58cad0be-cb7c-4784-b485-8c8ff6e56414',
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
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('a1116da9-e76d-41ab-a195-c0a8fc527e15');
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
                    id: 'ff40c9e0-2d03-44dd-b552-7e4f4a9d25b7'
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
                    id: 'a1116da9-e76d-41ab-a195-c0a8fc527e15'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('a1116da9-e76d-41ab-a195-c0a8fc527e15');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});