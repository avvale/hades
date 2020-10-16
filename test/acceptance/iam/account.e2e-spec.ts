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
                email: 'r8wfm3nfvgxgzjs39pk1pels9xht0e1jqhxdsezgfwsap2jnz4hewe0mz3cp81nu0plyp5fzf96um465wmoarspdgcxjq8n0tjnpmrptnaio9y6sk4gibeil',
                isActive: true,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                email: 'zxuhsex0sqiczyq16wqnm51mj1rsooiqc25lwkqb3f7kotg4j8l6orcce1war7hcxm84uastcyedo0e686h01zbt9w7w1psreop1djqu7gtnuh9w5y69p3z3',
                isActive: true,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: null,
                email: 'pndsh7wkvdi43oaqytnrmswlqd9b98x9buy4csdbeavssm2j3upw1ztfsd3bfcmgoqyv8eguymw13oh0n7q75hz6thueniqn8w4h7hciefq4rfitc6kg5dj3',
                isActive: true,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                
                email: 'v42zn2042qe3f8has7z9kriqac97wxozmhlxe2z36m5swjv6cet5hz88hx38v2kk2c4qrq3qvebgbqsoufs5v69arkd39zc12qff3x9qf7zuyhgw6pxswr6h',
                isActive: true,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'SERVICE',
                email: null,
                isActive: true,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'SERVICE',
                
                isActive: false,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'SERVICE',
                email: 'yuw5wdyxhrkg5sov0jmntninv1l9bbuze8gzledggiwczobnx52ajrnes43mj82a1mvv444sho6s7f6w5a4cdw74z58dx4ecle2jswjisilh3yfakaqx9xbf',
                isActive: null,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'SERVICE',
                email: 'tovnxpc7belmzevkbrk1q1p3ryckzzquysyjg3u5dt3jcw9tkoz87otwel8h8zh1u43xjnq1eafvzkphfrm1pjylk1prmyac941xxzfyt0ypzjmq9oajcfvo',
                
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'USER',
                email: 'pga5bigdb4m9d76itn76px00h56di7p01ualfbqfz8u7imqsbet3svh5d9xvmaaaymrrkkyn4ca25dbuqbnzfh39v0e3msn2110y908eepcfs8su5yvxzatt',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'SERVICE',
                email: 'iwfqywvc5s4asqsr6rfsai449e2wdd5eswjtqbor7bvpuwjwvki9593091o9xx4xfn67qwaj6iiqjm65poxgapfuc2rgsn9476excho97ez7ii1sshafecoq',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'USER',
                email: 'ldskv0z63v7q2vi2f6rse87x3g8g2yc2xu0pjbxem8neitw47ib03jbyuczkeawzcq5436i4xnh8trp5bd2lr8ivqxhownuadjdan8ylew7dv06dj2eic11m',
                isActive: false,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'SERVICE',
                email: 'tq5fdeo79j8fikalv5e55qp5mdhpykul94r8hkbnh7q5c9lp9dxvalfx8o3ucqiggska1od97eqf3gfl2cis1znadr5wdtqmykczdnwieomax9ohkncvvmfv',
                isActive: false,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
                
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'USER',
                email: 'sk1hi44o88c0r2mainbna4vk9au0dtu097092vkgr3a7uddjb996i6p0iz6t60dsogbglldg8c71vptmzcmztjsqd6xtd96vrsu38js48x9kmisa9fvke60l',
                isActive: true,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'SERVICE',
                email: '5iy0l5ptqwhp7gbt7a2spnpwrn1zvxb9hsk5mq3x25c3mkuhudjxhp20byyft8sq4nonl9b5r5axnlcmjkib3h9tp7ipk8zlvy4o8meg4t70veesw4az5kf5',
                isActive: false,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'SERVICE',
                email: 'ootoi5q03ax57l4kupo6lqi3le4h4b14njl79tkocthb91ffl06or74tinaxn75g2lfb488z3fptj4tu2glyretor5yaci3zmr1uavjwm2mq6vx956h065ph',
                isActive: true,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'USER',
                email: 'ds56rkhe4bat6yblvm4qgt3jmj40rtndywqfx4dey9ih3n1iy4gyk3klfslvgcwtxvoz1u8zw395l15jpgmca3bpvhvq1sot4f04haqnn1mb1ijp2ja0k7yx',
                isActive: true,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'hflf4l15va6sspkxbrcweh1tjp2elm8knpx42',
                type: 'SERVICE',
                email: 'z5mle50ndmvsx0kb6r7gw18d1vdu6jfq31vhkbmr2auh4uy6bcpe8hm7w82fhjx5hxckw9bzkttpx87aaealu4k60v8n81e057nusi8k23r1m5igkg5lbgwd',
                isActive: true,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'USER',
                email: '9o2idduu5kqxawttvuuy5qgmc41hejsq2dvldjre4xd2w5cdryca7usiw31kayhjz7cfq1jiylue3oxxsa50r62skyvi65zhtnrq3oi2kkvo0wkpe8n994ln',
                isActive: true,
                clientId: 'rqp3l0unfxe72rhw6pk6uzvknro2czbxy3xez',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'USER',
                email: 'n6kczx87m9jr4ulyhju6bqgrghmxwy46mgjqfdr9shag4w7tyhljplcilhm6vcc13ofohfd5xf7ftdx6bvgi9y2go8bdo3raah6uufy4tatc91gfgqq4fecfu',
                isActive: true,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'USER',
                email: 'qz7sd6come08e0h7uxuc89wpkzotsol41mxr57wgdaoaigg9fhcsj5u4gmycloas3dgzponrd0ghnpyf3h1h52bbjl37h95dmlu0mrxobakyxx3fdyf1988b',
                isActive: 'true',
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'XXXX',
                email: 'yvtpjih4xvd38onyqyjkrdtvrja2ngfabf787b4wetkpbkbrfea2xgeuecdz343ee1fbkn331u26dbz1rj9akejt7zmjjf0irvgcz3tx8lwt7jfn9cfsg7z9',
                isActive: true,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'SERVICE',
                email: '59vbxtv8roq82kznzszsa11ykb67pflxypcvb51jzxalseyd1wajkh35r5kkvg05b39gp6bku6anchxb6cr9qmdahv8jghe6t87m0277xxu91dcpusgtfd3v',
                isActive: false,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                        id: 'bf2e24db-3813-40b7-8d2b-77990a80d4cf'
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
                        id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a961f0df-8b14-4af1-9d95-bd672dca7d80'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/c6155a10-8d9f-4049-b1d4-80226a2d1364')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/a961f0df-8b14-4af1-9d95-bd672dca7d80')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a961f0df-8b14-4af1-9d95-bd672dca7d80'));
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
                
                id: 'd3eebaa1-bf5e-40c1-9ead-6d7b08f91065',
                type: 'USER',
                email: 'me5vqf9uhkswqc9s8hwienam5380tdagwwsxp0s8z0u8q0q5qe6wil9wq8j88d9edtxr1hfzbeaelqtb13x9eoonnwb6gr0t03smrdodpez7fn5m9uikgkdq',
                isActive: true,
                clientId: '4d7b48e6-7de9-4718-ba8e-c2525acd8437',
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
                
                id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                type: 'USER',
                email: 'amyyfaoa1q7y7syvpk3h4hybc0b1xmv990vewknotkfeip4xvp966x9g316edr9klapf1f4ndxiazuwj2m9h36km4c72npvw0d0f4lmt400ac67zy5gtwd6e',
                isActive: false,
                clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a961f0df-8b14-4af1-9d95-bd672dca7d80'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/bcf83624-14a1-4a83-87e7-68b63ee40ef3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/a961f0df-8b14-4af1-9d95-bd672dca7d80')
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
                        id: 'bf75a724-b1ed-4b68-9141-1568cae4f59b',
                        type: 'SERVICE',
                        email: '2s1mh813pha0enobtibum0uh78lsjbjm899j6u7p1z1f3h5u4bs5j6ledxfjd6exciczbc48ifwrjv0z79tnwec8mqfid0z8k2zu993leevly5c4c8a6c7vo',
                        isActive: false,
                        clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', 'bf75a724-b1ed-4b68-9141-1568cae4f59b');
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
                            id: '2075e14a-c2c5-4439-aecf-353bb9d35e45'
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
                            id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('a961f0df-8b14-4af1-9d95-bd672dca7d80');
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
                    id: '7a63c0ee-ddeb-456b-a062-8b8369152044'
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
                    id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('a961f0df-8b14-4af1-9d95-bd672dca7d80');
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
                        
                        id: '30774fca-ea18-47f0-a77c-5cb7a7e9b70f',
                        type: 'SERVICE',
                        email: '4v9vnjcf6mc2h3vk30zl8ratac8wh26jfbujrvn0l4qi9sxewhsu75w0kd0vuq3foljlstrtlqv43l2a36f8vby2idta7ar8u8zxrxffbefa3gg8ot8lyld1',
                        isActive: false,
                        clientId: 'c68a0691-bb22-432e-886d-c790b0381abb',
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
                        
                        id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80',
                        type: 'USER',
                        email: 'vuvyjbbhnjo88brijgd47y1qlizd960yh4o4dlnt2ngi1rso1a1cvprrc1t08c9wa5ss7eqoyf641b4kutgwwgc4p49bwjvd8wxkqn8fg5bovyluate3pvdh',
                        isActive: false,
                        clientId: '943f4e5c-22fe-494c-8987-7bd283d7717e',
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
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('a961f0df-8b14-4af1-9d95-bd672dca7d80');
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
                    id: '55cec370-e4c7-426f-bf70-818251863688'
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
                    id: 'a961f0df-8b14-4af1-9d95-bd672dca7d80'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('a961f0df-8b14-4af1-9d95-bd672dca7d80');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});