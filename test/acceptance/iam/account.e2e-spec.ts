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
                email: 'oa69w0uo399j4sfvik1zuhu2ibjevd4t5o730ih9xle3qhx8oq153vuv4b5p7y1ew1xsyi9as7qvarenfsq9q1ydcm80d1ssrh32cxumiwu0kkv25ifj54mw',
                isActive: true,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                email: 'vcslmfjyl61zbjihl829ae3okxt8t4ye9epauoj9ok0aq2cth6bko7xjvdfpe9db63gy6ltb9zb4nicuuhlk50tkfpmitwgpvprl1emllvnqhy7f1rkf7ofo',
                isActive: true,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: null,
                email: 'gecr6rnah4ffkob0dib419dt6mn59hh9prnnhpvsx81vg7qn8qoa7w1ol6v278zf8t7v3rh06nsjwi92fwhrvrhkgtpkup44amujnj6bc4mf4bl378p65tpo',
                isActive: false,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                
                email: 'd0yj2wdm6nbr7ho81fwk9lse3b6e51fnhx1x19ogfp2w61ftvs35wk67yn9attbc74m7ndps55779n04hxq6vfvtx8z1zt7xl1721fmoeu6mijqxle6jdh5l',
                isActive: true,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'USER',
                email: null,
                isActive: false,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'SERVICE',
                
                isActive: true,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'USER',
                email: 'd1e9fog332cowy11pzd2063djlisvhgmbpg5ov2aoamf6oe75ukfynkqd4019wsu1ki80m727acvfxepktohy8jd3j8abo8eqsuky0ifwt5znh8ey8aqne2a',
                isActive: null,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'SERVICE',
                email: 'pdjvo7fos4i63b9x8blc6we277lgwbrfif92z66c3q1qt7zg7t1umjt67q9ra9lumeplqzqcrceig604qu6ntxytf4n4fsub4hk3vis0p35uvuloga7digki',
                
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'USER',
                email: 'yu4qux23n2rf4p2hs040yvcus70p1nodfvr82x9fqr1z9vzo0czwzvb7i2sdmhml3mxfz0a4ttqlohgby2mugcrtkbzxlvrd1dzwarc5qtwpp2gr9a228kee',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'SERVICE',
                email: 'h8ul9lj9xlfm7guh7jlk18w40wua8ktx8izsxobznw9qs29fuq9ftjxfzvx811moq8v4t1rpm3us634gk0bso1o75439ab5fsnqc9cvv3fo05riszuigeuyu',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'USER',
                email: '3x68jgo2nkkq8muevntdkj84x1h8ynz68m2i04dji66euvqxrpoaka714gicv4jjs180y1oduyomp0cbtmjfdy00xrcv9vpdl38yvuow5xp0pp5mxgxjj4li',
                isActive: true,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'USER',
                email: '1i4z28wa0lnpglno25j0tzv59sx6g1xbnks8qgy9fn0mbbvvq5sl7rkuphiu76g33b9na5x24p5qdxd69fw10dy7ccxiixkroczqs1u5gg47xdg75vvcql7s',
                isActive: true,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
                
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'USER',
                email: 'l1abbnqzwilcvl9bu3y2l63wdf9nz9n103opwt0sw3fw8z923opkkc6orqgbw3mve1bd2nia0pm93te0abg1v8guc3s3z4fv8arzbar0miarqqc1ofd90vuu',
                isActive: false,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'SERVICE',
                email: 'jm43e6zwp2ei9kcj8803gi3bt5l9dchfeniycezfqz4bki5k6csxtuds0xmo2b7io2yl464w13paucux27icb7n4ltnn49agonv1ka8w8lh5iawaikl9h0qw',
                isActive: true,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'SERVICE',
                email: 'fwg7ypkqtc9bzpe5ws8o8vmuvjbbtpea1jxi5uj68qi41w4a5vn7ov8lanum0idhtb06lkwefw0gmwu8vfzg1gum6ut9qq1qsrcsb3a4dxjf7cb2uwp21ksw',
                isActive: true,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'USER',
                email: 'hojq9hka7qttqjovihd1dqr0fwrmgzmz1p749x8nedobpvzk4b8h5oo5rvbos4u6mjlx9p4vh1f1k0yre3io6rrtm7fncxcevsp896lee9ovi9wy8d2prb5i',
                isActive: true,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '1jyte0xwe7zv6nspdc6ezrt17zcpd2ziyvsve',
                type: 'SERVICE',
                email: 'wyt23rovj7acwe05uu4miqnbr8db79uy551jtgto61attbnh700ffk57ryni7qhccrbuc8rxn4kt7oqq7qfo3o454whv7tqwt5upa7bj0occyqrxha8jkhwc',
                isActive: true,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'USER',
                email: '9kv1pac79kl4o4yhr0tqz93hn7ld8dz1zs3qfroin17o4gp6lulbnjiko06xhl2ed4v6uydy9vwcn8a25drwv0gwjrzke5sx3iihr9y5oer3ebd7oo8gqhht',
                isActive: true,
                clientId: '4r911t6ay6688xg7a112p93gcd299z5qtyosp',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'USER',
                email: 'qnjcy6aro150uy6q715vujjm7y9fzaih3fmcnur5epm5p9nyijebv2ln1gbc10xhu8pddr27501j3rwya2eu5agtit49tfukbbphzj8davtdjcqd08thq27b6',
                isActive: false,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'USER',
                email: 'lz3cdygz9b3bc4ijol8m8ttj6ehuce8o9qi9k93wrju0unkeg328flo97nr65vvcoz07p9oh3b5z53vrv0lsugy35saeww8pyajwa4yuw8q95c541cgniqaz',
                isActive: 'true',
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'XXXX',
                email: 'urcypqsctwvjzf6xnqi1e3mq0z5fd2rr33e3qas6jndphg8ockv2decfi65sn2yp958ypz3r3pm4n1sxic5k5sz9rd4irklycogj037tucwegmqqge2kfhxu',
                isActive: true,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'SERVICE',
                email: 'p59ex0igd849r7cfsrtugevnpc9zerhkxtfkll4ernufoyb1vd10p4fwvc49ywqzcrvsdcl1gv2cbm85ptkyof6ts9hc7hihjxz0voa6dmpvqe2olso35nhr',
                isActive: false,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                        id: '4f635967-0a15-4207-8488-5c7e5e2d6621'
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
                        id: '0f527b90-73d2-4f29-a525-4a23cb8d0067'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '0f527b90-73d2-4f29-a525-4a23cb8d0067'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/a8a4859b-4093-40ee-a5f7-5d21125e14aa')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/0f527b90-73d2-4f29-a525-4a23cb8d0067')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0f527b90-73d2-4f29-a525-4a23cb8d0067'));
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
                
                id: 'ab578abd-4d1f-44ff-b458-5cba276eb01d',
                type: 'USER',
                email: 'aq1jryd6g76n5q79ut7bppxksb5is0ppfgfliv2r0mlw2orywkfvruilabo2xolnk02649elc1hxpfviczmpja2r9w1f2lbzlnve1zvscwqxxxbknkhq45cv',
                isActive: false,
                clientId: 'd4ee7676-edd0-43b3-bd4b-0e525c750f71',
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
                
                id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                type: 'USER',
                email: 'xfdfswhmzpcmnxde0l941osf5q0aprdow2hcvxtja6wmcivhggte407bsh2cz2rjj6p9bs61s2i5ds56286uk7zaxmpsrksey5qp4qm4jmaafg3g1x5k3pi4',
                isActive: false,
                clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0f527b90-73d2-4f29-a525-4a23cb8d0067'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/99ab8f78-0a76-4931-8c08-cfbbfd6e66fe')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/0f527b90-73d2-4f29-a525-4a23cb8d0067')
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
                        id: 'e5004020-5402-40ac-a31c-1d1901120ab5',
                        type: 'SERVICE',
                        email: '8qz56m7l7kweunyp1dhuwf5n2lh4cpkaicn9knqj3xpqiify6i1d1ljiox5jqm6mtl3obmyccqlxbyv9pdm1i03608ps7x82h8md15dodt1he1jfh048hmla',
                        isActive: false,
                        clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', 'e5004020-5402-40ac-a31c-1d1901120ab5');
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
                            id: '9c860b7e-b353-40bb-b3d4-13ba4fd96979'
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
                            id: '0f527b90-73d2-4f29-a525-4a23cb8d0067'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('0f527b90-73d2-4f29-a525-4a23cb8d0067');
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
                    id: 'a9fe3caf-4661-4af5-a983-8a90a48499a5'
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
                    id: '0f527b90-73d2-4f29-a525-4a23cb8d0067'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('0f527b90-73d2-4f29-a525-4a23cb8d0067');
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
                        
                        id: 'c96c2ee3-6f74-4c2b-82fb-2a8f814dae32',
                        type: 'USER',
                        email: 'v4d614g1j04n7lhp7cc9icbi50z4ydv7c2g3x2tro18e2rjoa454erw6vukgiq5q03yjm8j3iq9pllfn62ts4eylyqsad6tduufa1nk0ygcmth5oebdgja70',
                        isActive: true,
                        clientId: '895b0c08-e991-4213-9f31-e0415b9748fb',
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
                        
                        id: '0f527b90-73d2-4f29-a525-4a23cb8d0067',
                        type: 'USER',
                        email: 'c24vcvr5bydqzc7ac644as9p7h893eu4jfa1v7p7wyhs29z0m7ennwl2ft8dswrn837pwevr1uoaft78scsqwlt9zuc54hufhsrl22mk6fbxozk6snf1q90u',
                        isActive: true,
                        clientId: '7a010c17-29f1-4149-8031-33bf1e3f4bdc',
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
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('0f527b90-73d2-4f29-a525-4a23cb8d0067');
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
                    id: '878f26bc-5c79-49b0-a0a9-9376fc9fbf9a'
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
                    id: '0f527b90-73d2-4f29-a525-4a23cb8d0067'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('0f527b90-73d2-4f29-a525-4a23cb8d0067');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});