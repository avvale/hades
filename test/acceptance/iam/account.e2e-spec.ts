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
                email: '8t4q9061afm15tk855mm0mp9tvklet81kgbatkjkqao7viizr0t6xs0pn6vl7rlaz0478f2styjqd99k41xopfgdfo193znsr8bv09s2ch65vof4w6lat958',
                isActive: true,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                
                type: 'SERVICE',
                email: 'cmzikrzh0tibyc335ek7wjstd8m6ctgfezn9eisgen7pb0cfptkhliju9plw5udwxb8vj0o2jyy5a9hkv6ee8ig7nl9g07q1k161gl3l3ru47symjeqvc1km',
                isActive: false,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: null,
                email: 'b3ekqpmjt7e9c4o9mkw50xn8hprsvwreva5yhoxkbe6eqzgu8ipesm5t03bgdlo0sqazp85qmpoq3jsiwhvl24a5749wjdanxppmh0mky876c5j1161oxk9z',
                isActive: true,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                
                email: 'ksfec9ix9xv3tjs5jggspxsjuz9kayxoh9np4dhc9xy04smbtrdilxr0hhkdp5907o7qbtpydnjorcxyv3np4qxvqywrrsrnizh4dghozw20hsq9uwa3a2ec',
                isActive: true,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'SERVICE',
                email: null,
                isActive: false,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'USER',
                
                isActive: false,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'SERVICE',
                email: 'lvb1ps96xlcchbtjz4z4gx5huwyufj3wj6nupjw24u74eew9gvga4sudkar71tegf3zzxa6glofubm3p0yirz1t2gi60ou3va14sxm4etx53nnk56a4yrocf',
                isActive: null,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'USER',
                email: '4i256u6qudddq08imhqeti2ikp2vh4lr82ns9pzvf7ceplmwhj06hbvy2lhnyvp47rf4y6re2zuq94ldu5fs4n6z3x45tmwxhccx9n0b6k01uciv9jo2eujj',
                
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'USER',
                email: 'bp41r6ummk725mi5uy3qvkpukcgpsagit3m6atvhacj2ukdm1zh7uudwagpxkk1w581blyc58g4cu890q32ky5qqlkboiemfs9x0aa59y2svaal353gystsj',
                isActive: true,
                clientId: null,
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'USER',
                email: 'tmy5uh4850tktinowcv98la4eucnm6zfr686cca2jsxn6jphgbizo443kpsn27bh9eeqdddba833gxufxioxv37ezsrlq2npmgjiynhpgh8fcljbx0rgamyt',
                isActive: true,
                
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountApplicationCodes property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'USER',
                email: '9au8mi7bbijxws2nfg1jja4rztfwarb0s59j9zu76u2a8dxt4u1enysbjncihk79u6g6t74fnm8nbtis29nabsd8s4hzgr7w025osnfxa8kbk3lzb1k85xdr',
                isActive: true,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: null,
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountApplicationCodes must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountApplicationCodes property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'USER',
                email: 'vohmvbr3q9hobxb3n907igsnf2ubo7r6g2cw4vmjyvyzjfxchjaytwslwgf6zv6klfgnnq62apvntkhoxda73cpen7pory5jr1eznr841lh44ni6s4ltkwjq',
                isActive: false,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountApplicationCodes must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountPermissions property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'USER',
                email: 'kd21355fj54he388bs0o4o3yr5ks1snop0sleg77ra3m0opzilom3yg049y9oq4206yvobnydageedte65egcjc4tcee0yt4tlvsyfi22jtc9bgkibog9w65',
                isActive: true,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                permissions: null,
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountPermissions must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountPermissions property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'USER',
                email: 'ivezlz44xtwxcqrss3396hrcif214qjwwgz54ozhdxxxon17myuoidi7y26aejgw0293pbi47wioeserzv3c8dyy6pqydihhi3pd501tujya3kc2tr9kw22i',
                isActive: true,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountPermissions must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'wbm6k4795aqygt9a0im1fx673ntmo0uykg7q3',
                type: 'USER',
                email: '0cszbn9ft3ajhiyj8yemlc5tglyfsmnq8fxokaxysnkesopmce1zoqcp6aymr05f80x4j10t1fc7leuoyvyvfjy61u1y1r4cp398ho8r5vai4nqndrg0td2q',
                isActive: false,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'USER',
                email: '1fltyuokzxh886rehqtv10n71gzl6p8wpaivewke7x2ezmcgrsnrgqaxpsidtg9iqr18bz8xnoxihw0x3j4ec3jo3sxuzvbfw46e51buhyv5sisi90lvjefe',
                isActive: true,
                clientId: 'ch2lltgdxrw7o3o575e15q1ea6l9q9irfzbm8',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'SERVICE',
                email: '3qidrdxz1j4whncysi1em4hgfbbepq9ad7m0r4rfyniuz9fjobbss8uqw3obn87ovdgk29zy2k7zuo89t488ji7i20fqq2lqsk4s2m9mk99z6ikaikjkjvwwg',
                isActive: false,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'USER',
                email: 'vpk82y8rft8z9jy2ffg944c5euncv2py0vg2qzlksjbnglpnfifnnwvt8tfml6n7cwp1mlcu170prjmacq5txkcrql85ubd16eb29zszuno2mrx5kvorl6e6',
                isActive: 'true',
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'XXXX',
                email: 'vadoowto7insasphvgitk7j0are9s2z98qiod7uew4zlcilwdplkpti6ni9ap8zblprnsnpp8wpuv1i21frol3pacjgkx8bmkltyxng79sgvq0n1yk9lxuoq',
                isActive: true,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'USER',
                email: '0mt9wda2u4a0eiznq3u9k2z412unx22ps0i83vpdxr0aon6mvp0lisyx7rxwhjk36jpzmdtlhel0753tdf3evwmg2wcg7kurqlufr5or6zzo4m9fpo7ubmpr',
                isActive: false,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                        id: '3ae39b2e-d125-46a3-881a-35b7ce1fdd88'
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
                        id: 'e4621d72-9fde-4584-8339-fb219f70820d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e4621d72-9fde-4584-8339-fb219f70820d'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/6f733f5b-657e-4c36-afd3-a341f79bffff')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/e4621d72-9fde-4584-8339-fb219f70820d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e4621d72-9fde-4584-8339-fb219f70820d'));
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
                
                id: '068c524d-0d90-45a0-a565-17773f2463e6',
                type: 'SERVICE',
                email: 'zylwmcgqqjxfkobjyv38c676tmldwn16r7o73g1wouer8sa1bkxbtviwx53kzpj8g1janu1ecjn4vser6o5ihaa2dnu8tzpx2lvoo3g3ss0yrcsjp359x7ao',
                isActive: true,
                clientId: 'c3758de0-e441-4877-a99c-6c634629becc',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
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
                
                id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                type: 'SERVICE',
                email: 'vgjc5ell0rsxy9jlm17r9gqy9cujkxecbwhyrrj1xtdpwjbh5g6ppituqnh5vbrohtpl1mgxllkjqgk3j1xqz4zvb8dnwukwtqykmz7f2wrp5iswnuqaj0gg',
                isActive: false,
                clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e4621d72-9fde-4584-8339-fb219f70820d'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/39950fa1-198e-4298-8b1d-46bce54d4466')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/e4621d72-9fde-4584-8339-fb219f70820d')
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
                            applicationCodes
                            permissions
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
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'ff14f650-6943-4df2-a9dc-2a4fbffefc60',
                        type: 'USER',
                        email: '2rvs9n3l85x3s32kjt7wl6xnec0cftwvgyi5p0vz4djmd41mjneppvadb0f1dxkti9ljkk388hku979la81i65xf5zgnmzsiqsou5r6987py61vsf6xc2ytz',
                        isActive: false,
                        clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                        applicationCodes: { "foo" : "bar" },
                        permissions: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', 'ff14f650-6943-4df2-a9dc-2a4fbffefc60');
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
                            applicationCodes
                            permissions
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
                            id: '12a7e9a9-551b-445a-bf6b-502f666fd440'
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
                            applicationCodes
                            permissions
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
                            id: 'e4621d72-9fde-4584-8339-fb219f70820d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('e4621d72-9fde-4584-8339-fb219f70820d');
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
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '98e459fe-0822-435f-96df-9a55d8ad946f'
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
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e4621d72-9fde-4584-8339-fb219f70820d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('e4621d72-9fde-4584-8339-fb219f70820d');
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
                            applicationCodes
                            permissions
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
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6eb6a459-3353-4a8b-a0f5-1fd8a5d5b510',
                        type: 'USER',
                        email: 'gls4agekoqis08twfjgj0lnpd0dqckajyp6gw1stkh99iyi5yx8s2qruo1uv686hancfpalprnstowz1djf7dcptrduec3mzxcm10vsjc6oawhbdz6yvdtq7',
                        isActive: true,
                        clientId: '00cecd55-0fe2-41f4-91d3-d37f4ac5b5b9',
                        applicationCodes: { "foo" : "bar" },
                        permissions: { "foo" : "bar" },
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
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e4621d72-9fde-4584-8339-fb219f70820d',
                        type: 'SERVICE',
                        email: 'c8lphjkxdsm2356uc6k4ijkjzn50sz74rmtk58xxw71o96l6ojbtof9f9qhbg37p4v07iaclwum5f7qcozkws7mcvba4vx0xs3o9178giaeo07rpwbfj67xi',
                        isActive: false,
                        clientId: '336bfcb5-292b-4769-b559-8dbc72eeb4ac',
                        applicationCodes: { "foo" : "bar" },
                        permissions: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('e4621d72-9fde-4584-8339-fb219f70820d');
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
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'eb0981a1-5fe6-4fa7-8e55-1cb865ea9e1e'
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
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e4621d72-9fde-4584-8339-fb219f70820d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('e4621d72-9fde-4584-8339-fb219f70820d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});