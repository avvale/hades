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
                email: 'yst0tnd3jxjvh06i8ooblsqbqaairglg8pqj7mu1vzq1r90yo6qdr7l9c724zlyjwo2icpj62gbkqr9s1pf0hzyowr8heu10um4l9liyygpzqc4k4bx46w2r',
                isActive: true,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                email: 'zjfv9oegjbry0lhg451l2vea83yvftqr2rfcnkkg2x5kl1yali6zhb5y7zq2hwb5qcu82pvcn7tweheis4024w3l7dqdyhxkhr73bb2i3okutg3nrnu5p7l7',
                isActive: false,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: null,
                email: '9gt2prg1n0rfaz4h3whs1iroz8vps8pf5ybbagogkd369cxdnc9tt2z5ayz0xd9hayy4q4xmths0w4pp07lfxwfjzo2af3nou4qe2hgiwjji4v8boylj5mnx',
                isActive: false,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                
                email: 'wgrsfbe1tr2d5lwnxqdy6tc2reqopdw5hul1u2nvrmhjicpy8i0hbup2q5b1f7ybwi8928im2oefv89yz6vrhoedhp2h8qlttx9hr1kuadzlnoqush57lf0q',
                isActive: false,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'SERVICE',
                email: null,
                isActive: true,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'SERVICE',
                
                isActive: true,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'USER',
                email: 'fg91pu0xju016oew1fw1y76f1bnvvcigc09314wquisyj4xfl8itycp368a6droekbwahajptx50bzt3zx8v5w0iup1gfsuwvkoec7k2f8qb5oyrmcbw8up5',
                isActive: null,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'USER',
                email: '012lfjbvl7d6u5uja1ma1rt5oqylrqwba5j61dngpuivp02kxmmryedwg5ks6sgy6tcrvae01vghhlclbob7gw82qcbbs8j88dd2b8mtd2nufqsa72bjvah9',
                
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'USER',
                email: 'itoe3n32g4llvdi5stqyg0tyz1q7zbcbbfqdfytet8o2q9tmt070pqqezai8y7s7dwyyxuk5hlaqsmdvs9baxr1wbwgq9oy4ktys7wvnsz5ptp8zqltmn3xj',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'SERVICE',
                email: '39xhahsiad61egl7m90qoso9da6oez2gdkcqw0s2zc1ywnesxkyjt2ilkf0mgdmeddr677onmqtk3wmwvh4aiju1fme4hll1i3w71u56dini8cc1cvx2qtj0',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'USER',
                email: 'e3ot0f6by6jb5t0jmzxr8g7b1qolmc29e90xz6hxr9ljntl6qqvcd6s551j4kc0eddbwmjb78k1ieq72gilglv502mjw6ufz9dy5d0n88ofj7endb5xj01jt',
                isActive: false,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'USER',
                email: 'wlogw5uvidfj2ondndwy42uuv9lagr2t5rsk163pr5mtr0nnf1xikpplcaml14w0dajrkjemu2xbczzduv7u1fmpanbmm7nbynrbdft8cjqht3xxpmr5yeua',
                isActive: false,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
                
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'SERVICE',
                email: 'ssm03rox9r1yu460gsvd7mkrt5kchnfx2gqrxswupumqvizi6cslinik2hk98l1jb9nxjzg4r5j13xaa0vahna6k5dm3gznd8hgwcqtkv811c92c22dyixfi',
                isActive: true,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'SERVICE',
                email: 'mlfg78r10btip3nskepq0ptyx1c3wi4osv8zwn2o3jjc8nfw7b51mm6e92qsh0nv8634goj4emfgh9g3ez6px5mt4l830cgn7l77qb2clukdroh1qfrle0rl',
                isActive: true,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'USER',
                email: 'bilicxgc5zlgb5q3z8edv8hyyy1sferg9lmw3tq7paxv3mvlddlf929me97hrwpwkgkpet4d3un6jb3jhjoaurk13qd4p9jhhj61z8tb82p7cg9iy6m2eh5n',
                isActive: true,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'SERVICE',
                email: '4uyitlwbc4y6yvakc2reprsngrnqn2wfejn1k5s0kajlcfn2yjajsqz6mso2wu2v1i7d01gau6jon2z430gqcp4p02jvxkk6xk8q0rsf99tfyh9frvf2z4xz',
                isActive: true,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '7sdjru6h2qlvjiqlgtz2wzz1tmud44nde2pl9',
                type: 'USER',
                email: 's36tym2xyjn3hmm0yhh4v4qe460hnzzh04ov4jlt7knzv8ahwygbk6sdl79mwtpygpoz4mrtgltzcn3umyarc47qtqsl3kkpiyczxdv3xu6n6oufwm4ieytg',
                isActive: true,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'USER',
                email: 'owi6b9amlhyvjkn8x3gxujjd1rf3eakzwwezctga1tcznlzxdznyk4ucy1yvg3fva7wwewrta1kbnonbv4bvbwmoicqym25yvpzbi6k2vx8q7thgrmma49s2',
                isActive: true,
                clientId: 'is1cp5dlyoin4pj2q3oztoeiq2ly4e5ookndk',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'SERVICE',
                email: 'g3xy7zi76i6ynzuuwbtdm0e60o140z22tmsg124deh5libtmt7zdtc0fct2m5qdut0p4azgjwxxi32bh46r02121za7249p9np5oys00zvw4f54byq0hdrcle',
                isActive: true,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'USER',
                email: 'o36li02t447ulvhuczetjr0lg3jeo1irthwm5r6btqigegoq799ptr3adhfrhazxdbeokwigtqlmgff5vg0e3smioew5je474y3g5r0yyahpd0teauo18lbo',
                isActive: 'true',
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'XXXX',
                email: 'di53x2rkhxgoacju0os5ks1ohr7pnhgaek591msb4grcwpmzpovpwksbng1rdnqqsm1kjry4p5gvyb6dt60grk8rcleobsqfg9ibpgq5kytcmueew1g1g90l',
                isActive: false,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'SERVICE',
                email: '0e1ss62u0hmek3xmd5p65hkkshh0l7rvq4y2fzykizl831wdst5i4rkgn4f5n530cxwp24t8bpdqbhrsu24omjr7csdds26yfyxluoam7ahvap4zg9yhgwbb',
                isActive: true,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                        id: 'fdcdd904-cbab-4b33-a3fb-33d6ee3ecdf1'
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
                        id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '570aa66b-4abe-47c9-ba43-6eb63188b8d9'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/d8fd0c40-f4e9-46a8-b7c9-828d528e9b1c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/570aa66b-4abe-47c9-ba43-6eb63188b8d9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '570aa66b-4abe-47c9-ba43-6eb63188b8d9'));
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
                
                id: '5cea5224-4f7c-4bf9-9d50-46733d9a40a9',
                type: 'USER',
                email: '4pzkyia8l617zks1vbbsqng5oc0oep7pxwrcnhzoteuomnhxl16t3oqrbtgp9406la74lr3qr0y1cxa0a19r5xi67r5dzc4d2sv184pdz0r3fwsdb943wui4',
                isActive: false,
                clientId: '82a1a987-d8cf-419a-835c-7b0defa30ed6',
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
                
                id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                type: 'USER',
                email: 'hbnld1jouv8h4t0jm8t0v4zw5nr4oqxigfxncjt0foynvcvwjw6ldxa54urtpzb13fdbqscvbcwoejk3wx480nb5g61k4p1v6sff54g45gmlm7avdxxwbgfp',
                isActive: false,
                clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '570aa66b-4abe-47c9-ba43-6eb63188b8d9'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/808b62d7-fa22-4a3d-8e46-50566c7ef00a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/570aa66b-4abe-47c9-ba43-6eb63188b8d9')
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
                        id: '2df9df5e-70f3-4424-a244-8c987f685271',
                        type: 'SERVICE',
                        email: 'ea7zlzrryjt84v6tf486jy4ih4n1wfutx66i79l9ebr7e7opnt4omyy1fgdqb48wv5q1o0tmis01sr6z4xrnxqgzly048j7hmp1u6wkp63yti9wqk794hqjs',
                        isActive: true,
                        clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '2df9df5e-70f3-4424-a244-8c987f685271');
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
                            id: 'fc3cd6f3-1073-413c-9635-730b9d6503de'
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
                            id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('570aa66b-4abe-47c9-ba43-6eb63188b8d9');
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
                    id: '4b557846-7357-4a8a-8683-3ed6608136f5'
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
                    id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('570aa66b-4abe-47c9-ba43-6eb63188b8d9');
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
                        
                        id: '33be0c4d-7bf9-49c5-a42d-c6fca5d019e0',
                        type: 'USER',
                        email: '3w3horoien11i0hneg65ry4rmp8cac1a4s26t1hdxlpp1cl6p91hbsr85eg7mjjx7jbzsrulr1987h4pirzoamhts9gpcuy93350hqdyfcg9rwkwddtic3bg',
                        isActive: true,
                        clientId: '510949d5-3c95-41d2-8c2f-1f3d11c34cc6',
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
                        
                        id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9',
                        type: 'USER',
                        email: 'zn7o6nxvra8sz9tctkrr6t1bllwohf9rlexqmm7aykpoqokd5mpqdozr87iv16qwhj6mose5q00d5t1s4wb2qu9gw02r6pnzbzlg7k3o93pbh6uxgaflhjtz',
                        isActive: false,
                        clientId: '387953c1-95a9-47f1-9274-b0448b4178bf',
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
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('570aa66b-4abe-47c9-ba43-6eb63188b8d9');
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
                    id: '75190de7-9893-4553-8ef4-56747e81aa1d'
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
                    id: '570aa66b-4abe-47c9-ba43-6eb63188b8d9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('570aa66b-4abe-47c9-ba43-6eb63188b8d9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});