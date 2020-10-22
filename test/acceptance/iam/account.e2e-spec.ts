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
                email: 's15bczmxbgsremxnftyl0gurl32a4gif9mrkv0h6fkys28vphy833vg86oxmqjzdemgggmwwmyk9u0c82wbxur7z0lbeh23r5cs8r7yhaufabrqk35i7tcm8',
                isActive: true,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                
                type: 'SERVICE',
                email: '5df70sem8nskjvogqgb3s7r7k69dkfsak46zg9oki4yissgmz7kdzxpwyhcocast8yoyztw9svkotr91u2flwp25amdyi5iwiwad2fnmnp76re06axf326uk',
                isActive: true,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: null,
                email: 'navugx980xngz68ooqqbx53yshjxyg3jwwjjw020b8emfdqmn9xmwqcb7yxf08yy6vmrako4hd0tjqzetfv5ohzc465liyzrhxhh42lfrku7578m7yw525hx',
                isActive: false,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                
                email: 'k201e87ws2o505x4nvvpum8kr8tl2ag2rn849jzeb3sr2t40uccmcxfhnteenrawlnk6m3rvg12h0lylshuw2xxwxv6bwo43btoah45qh5ekmaxwqk14s8ot',
                isActive: false,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'USER',
                email: null,
                isActive: true,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'SERVICE',
                
                isActive: true,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'USER',
                email: '0d7kky1lndfxj18kfbnzp3qy2rs91xliswcut2fs9twdirovqdj9yel4mfi1zstb5oa8e06w163dzs12gooe3n8oop0wu4kq2i9k6regyd2dmbl6pqvods66',
                isActive: null,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'SERVICE',
                email: 'n3bwa3nc6hzuo6whmy1gf2e1hj0alj8tv6y8j0dzorjgonx812yq72tjkp3x8qud89d0ar8t6b9fjg31mhk4kouwxxsev3ib33mit7bg11rbvelszucrawo6',
                
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'USER',
                email: 'es2iar3t3c9fj475rw67szw5pu8mvuwpp9wu6srenqeuexiil7jtx5guf6o4zxy7rplndyg7g3dj8qqfg2dy2brkprqd1vwdtp0aikthmfbztkytmdw9ys94',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'USER',
                email: 'r2g8p86mukhjeowrej3a65wxke50iuynal9lslj0t8n2zoyiibjivrhn2r1jzwxsdbrzjrsq53y4mpjbamyxaqssvb41j9fcq8k9lk6yl2siu2bbzsmn55yk',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'SERVICE',
                email: 'sy5nqqcujwxspmkop1gpcwzrr2nqkdljls7zwpsf6u6ztahty1pdutxwojcwxf197ecgi4rhi1heqmpud73ywvoi3w4agq0gdnofh5aib6nd1bhwn3184gs6',
                isActive: false,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'SERVICE',
                email: '4jni4jxy8wugphmen5jrhov1m6291yhd4eqv9nfb3uc2quznq3x5wffkg6d359f2d76xpzx54il8gawwofhdpjis0prv7ux1gfaooqmastlmwvb216xe3oow',
                isActive: false,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
                
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'USER',
                email: 'ezbql5x9kqhzjmd9hcm0lbep2cqqvim8dv3lqve3z48tumssmrb6ckown0kpy8u9m2wuys1bkj151ceqhyb5mxzrwbd78ugcrxyb39o89r5y2h788m2nzp8k',
                isActive: false,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'SERVICE',
                email: 'pidr8vrdy74al8kimodjm9whyz9essuqi01gk6wd6sfwxxrgci3uo0jrq6c9eg0dijrgmo7974m6lm5zdywgkjdh9f32eq08f7ksiaca00yuawqho26vhsq9',
                isActive: true,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'SERVICE',
                email: 'yijlgce898xiorhz7esdzq567l9is28w2p7mqjr7ts4fzkgi4d3h3k030q09sclm0q8qqm10dbw7aesdf6esulu7p7q5wld3fgm2z7y739dsefnkcftkrbv8',
                isActive: true,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'SERVICE',
                email: 'p7bf3bpoj1bl7o7bm6hw0r8rgheemo2bbfdj1ka1ntrhsjpuccqwhil8gzag9r40punpesiwtl854frlop7kv53sa92rzk2ouvr33owk7ev534uxuiv3qv9g',
                isActive: false,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: 'ykokvnaqd0qniffrp98oo9k9raiaijysl702s',
                type: 'SERVICE',
                email: '1cq69budp8qfekm6ylame5av04gftolp6bw9ti03atdin89wivilymv314i13fsipw4dreyurnlaptgzcvhpzfthekuwx1edcgc7sl3bxzmlkd6u9brsdgpw',
                isActive: false,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'USER',
                email: 'ecxl6zcniko7eaj5v7zvgba3h19l9j1csgixg7d6c3xhkotd0zi9rq5xk0otdjfsoij4x3jbx3ghfy7id0d86t2ntnga9pfufn0k6oqnns3nla86k22c4g8l',
                isActive: false,
                clientId: 'noi82mgugp8bdfyvsezhivqxc31ouq0zttcat',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'SERVICE',
                email: 'wc0765yxvj1jgucqjz9lnj1z2qixu7g1k5dytpszzfic06epjeb4xjehpzloryr5ef9kmqqk5u2ea23krwzurrpfi5urckzovby6r7msrzz8smeafvh4615xw',
                isActive: false,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'SERVICE',
                email: 'tqav5rugr2d4hjx15dz8cqetzwsyfn6tcujx9oqx77cj5ll8xzr5c98jmagk7smvw1dntjvo0oklsrtcfvoi9uff2mz30w5yfy36wdevk10ciimz8vbbs7pw',
                isActive: 'true',
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'XXXX',
                email: '203zzmhwvppsvc94r403lsmi5nn07eip48kenbtypqkv1qtenx6q1ed9sdv9dc56et5k5rxvya6d8fb6ka49yl5xrd0734x8s668b919xo1frdiz1gaez4xt',
                isActive: true,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'USER',
                email: 'flm71hwvtpltgq9vx6pkxczltd95wziwjzv521m83eef9yy8csye6dtkon9y29j8ctnvabzcq9vts3p6gnmwhsdiiisv1nscwa7q7k35zfgpacillmq716q8',
                isActive: true,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                        id: '22c82d20-22ea-4792-bc5e-9573a0dadf07'
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
                        id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '82a7ea0e-7002-4854-bcc8-2092ba5ccbba'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/f4a2ad6a-18d3-4047-b234-cdfd184ec4a2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/82a7ea0e-7002-4854-bcc8-2092ba5ccbba')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '82a7ea0e-7002-4854-bcc8-2092ba5ccbba'));
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
                
                id: 'ccdbe2b2-488e-4c41-96fb-db3fe93ee730',
                type: 'USER',
                email: 'iq0kct62irovbl4oj5ly1u6eqa88umphcxnl2qwkqyomtzkrp4wd3pxq5ma5oxeyaaliamkyckk50w6liof1epqa7kfpu2g804zy64ndyrmhu5zhudhc4glz',
                isActive: true,
                clientId: 'a96d04c9-0359-4080-9ff2-47e24d39f560',
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
                
                id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                type: 'USER',
                email: '4nj6giyy1bclalmzbvl7wing2x6p9ent43tcd7ey7bkuwdi6v9uarcn52i2ypszo5lz4hs4q7cokkggjhpbheu7n7gxlv6malnqea7zg31p2k3fvfpx51tpy',
                isActive: true,
                clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '82a7ea0e-7002-4854-bcc8-2092ba5ccbba'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/06425ad4-22e4-4824-b0fc-da982cbcbb6d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/82a7ea0e-7002-4854-bcc8-2092ba5ccbba')
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
                        id: '6eea87e6-086a-4b03-ac88-237a60a83523',
                        type: 'SERVICE',
                        email: 'ku0pz0cbapdh6gp8u5jvt3pq57eb9x7o96ynfjygbiecjf2uv78bn9s5yy0wno7g7zm9z0gpvjjsqmfmx5g70pdibg6i7n2wbvib2au3u61dazvhpqmypl5k',
                        isActive: true,
                        clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '6eea87e6-086a-4b03-ac88-237a60a83523');
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
                            id: 'cf3a1b0f-c614-4d2a-b9e9-a55319f154ad'
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
                            id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('82a7ea0e-7002-4854-bcc8-2092ba5ccbba');
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
                    id: 'fefd7bcb-222f-4713-89ae-eb043d1185f5'
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
                    id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('82a7ea0e-7002-4854-bcc8-2092ba5ccbba');
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
                        
                        id: '56d5d542-2d26-41fc-896e-fa2a1e1f4459',
                        type: 'USER',
                        email: 'mfw4jt7uepplc8fzaazcj4tqu3mpz2xegn11witssj71qa711djcxop8zidt5iwivgzyxgzt3h4da3pq5w1ryzqj42je88nf43f6broyuatz7vg5sz8mi4cb',
                        isActive: false,
                        clientId: '2cb20db2-f99b-4ef1-9b44-f4d797404f09',
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
                        
                        id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba',
                        type: 'SERVICE',
                        email: 'sxhvswoydqs4aumqqleknq8liaxsivv4krpukr6lje2gsopx4zkfuyzrkh5hbms6d4nu6cxv2bxika3e46ez5rfjibootqhxs1sbuvptgc4oxnne3twtx1ze',
                        isActive: true,
                        clientId: 'ed5d5ea4-3b4c-4606-9ef0-841b0c40a4be',
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
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('82a7ea0e-7002-4854-bcc8-2092ba5ccbba');
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
                    id: 'd5b407c4-b42c-4d57-b1b3-104770f0cf8b'
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
                    id: '82a7ea0e-7002-4854-bcc8-2092ba5ccbba'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('82a7ea0e-7002-4854-bcc8-2092ba5ccbba');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});