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
                email: 'tkzn52dy1d3eqtk7mrcv0zmsl6tu5nnt1d32oljv7gqqqegxgundxik8szkxodgviszgvo6iwdei4u95vsces86246x0wi38hwjyr6fct2rto8m45rid7cx2',
                isActive: true,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                email: 'xzyjz9wq66bc5g4wsgwmzvvh2csku7odttrwbek8idewp3sxzgq216h3mzcucbu6g7txw9j4tt1h4p2blxp170g98iqsbs4rvjak11er4uwr95ry5vybi1pv',
                isActive: false,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: null,
                email: 'ljadorl0kyif5avg3kltb2c7lkkykxu06uaectnif1v6o1y2oawecjctavjf6e2kiwm7pe4rgq6wrdcve1lhwo8i4pude0h6ytk3qqyplfsudy9w86wzutgb',
                isActive: false,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                
                email: 'a8ga92ai8eft2x0sh1i3jvg3u0uik1b14qxgcv29mm2qevbeieyacnbartq3bdyvie5o99flp5xp98mpol7h3bv0dwawj978fvao6ei8lsrldr8l9o8f6e9a',
                isActive: true,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'SERVICE',
                email: null,
                isActive: true,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'USER',
                
                isActive: false,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'USER',
                email: 'gd7t4fjzyt5e2r5x7cu9wdiqdddavi7e8wjxksz78hrehjcleqlhz8guimpzjfadb7apwt4n85q5mvsuu8wi9tq6bgrokdyh0o6htr2fbgwqoeaax9b16xy9',
                isActive: null,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'USER',
                email: 'ycl5nnrmq3ro1fv7ahosql1djvlj3kjjt1w1wwbgx5pnn5xw56mnm0jrn3dm1p2bfpc8f2vfebohv7wbgslf5sa9a1qp6vew7rtgb8idb2gkok23duotby2s',
                
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'SERVICE',
                email: 'u3y61w3et928rbus6l3pkumxc89y4l5i4s9tchqiomv08sp9uj00nsdpvkzdaa6i7ohqd0e0d9szn4ebaxr79vskmarwg5xfmrd2d49jevj0psk6amr4cekx',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'USER',
                email: 'wjviw5z3a2p2y2dbz4jazf31j0l7fczwj31sdcfthg3uhv602gnkpw5luj6rwmhj2vldaxdz28dpl0gf9cmyb0o39n02umf5qkx3ge3ke0x2hmgb6aiy2fpx',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'SERVICE',
                email: 'uxnme3eulnecdz5ol7j038zrnd6x28lhs37c7sc1vrhblp0iqean2873swtnnbrde15yuiv13p1soskjhpngrt6uz475pj4u37lup0nmpjndw61xd58bg83c',
                isActive: true,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'USER',
                email: '83bo3q9fq1nm5hxjpl1tuk3a4ww6ei7bz10qzphaedjpx2g4fmp6m8krh8gucuqnsugrx8w1jiww2ptu72o30vr8zwp4982pqjxguxjcq7c78hj6k6b2lijz',
                isActive: false,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
                
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'SERVICE',
                email: '0rg568jqvfow6azjcolgzwa93ho81ke76o8thyd45uuuykgoq3kcczv53mteinlyf8ewi7byt7eysvwulo6t9cj93vrfc09lvixyeju0l4wsotu8tmc10eu1',
                isActive: false,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'USER',
                email: 'ojc04eqx7wyqu70vzomlrumb9viips2bu9eryxutk7vyp45bv8nirpatce88asb9vur8go1gr2up2tp2q37d43xr7e8ys8tlccocw5p5wq90dzkmiwh0ett7',
                isActive: true,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'USER',
                email: 'ukboklfw7e9gp58d6tmfu2v8o6q1rcn1uleqtrpktaz01yrhgwjwx13fvsaxqmtaz5yvf6dp3pm2v2xha1fzg3kc9zmc83vjxahlabjcili4bfcdtkmfojep',
                isActive: true,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'USER',
                email: 'lggqy2z3vy97ura5j1ujbe22g9n1tmk8oubipz4uuy9k1nlz81ev19ntujzx9kf1ivoews7m90klabya08u65kl0jfyhjnb78dc0g4iwa7grzw8vfqpytp2f',
                isActive: true,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: 'snw6k7lxvt051dg1zi43eizpsu2ojota9vybr',
                type: 'USER',
                email: '2yq7gx9cl9ufjlfmxxchh3ge7ihju0lmjbfvoe3we1co48bzg7br06z7qyu08alt8fyj7f00ipds3rqht8z6050z0dlszivgquobqnmgv6zcuoicqaqselg3',
                isActive: true,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'USER',
                email: '1isql6aaw2cjda569jgdgrsq5efm7x8afl8pk72u7o6g3padbsb8j3ju0387dy14cfc9q2nvzn2lhxqyzh3ze5lrvdlkip7u40dwn0bmz6q4am6fg2lyfawk',
                isActive: false,
                clientId: '7mxau7duyqn6uqmhcbe7shjopouroclz92urx',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'USER',
                email: '29v8p0c7pphnk6qq2vi8xb2wseom4kd2zi46ofbmdwvrte82mvzntaxcgtd78jk7km1khguft6mkld4mwfxjos5605yc4ccx167xvz1i7b6c7x1bdt1hnoazy',
                isActive: false,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'SERVICE',
                email: '702fe8erln6bojcao7jwwbirj2ludbpaeunp4nasscgq7o3gyetw8s6t0eik4909pi55ofilto79wdhxn2ac1aahrxvkvbj03m2wcdg0fcf80u2bc5wfrawf',
                isActive: 'true',
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'XXXX',
                email: 'ix9ai5urlktmt86uu29lpmcsybrxsbiecv2w6v7g8fec2n0zq1cp4rgl5ow9najrbbs1kzn6sl90yhudmgmtg87z8gy6mdj41crtn5e10p3e0ixgdhw9dp81',
                isActive: false,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'USER',
                email: 'd0hyprm9wb7dz8d6s4v6kaxtb8uxp4cokz1ixjrgdf6jhl00irzxxkup9hrn7qxjksmgzlepl7rwvv317eq7rjv3z7cjjmt7yfc7n00eu4wuizvf4o51j7rm',
                isActive: false,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                        id: 'b68271f3-aa13-4bf9-a776-ae9dc102fdb9'
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
                        id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '0cb20cdf-0a4c-4ceb-81d3-b03164f41584'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/bee8cd2c-4b29-4608-a966-3b10785dd658')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/0cb20cdf-0a4c-4ceb-81d3-b03164f41584')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0cb20cdf-0a4c-4ceb-81d3-b03164f41584'));
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
                
                id: 'd1e06e46-8106-4aaa-9dfb-c0e0715d5d7e',
                type: 'USER',
                email: 'gs06nnksq0d5nsqn6l5s2rm2x83enqft8s34lflc62o0l37e6sr9wmjk6yjafwy0fyp5etu833ebnvninhcjzi74xg3bzfnu8ofydccixiskxjx6fxmgdb8a',
                isActive: true,
                clientId: '5b9ca8f8-5922-41c8-baf1-45afff4aeb55',
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
                
                id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                type: 'SERVICE',
                email: 'au7hqov4tvxzscmue7h2j1mc6nr9q3gvkt6go6nx6trl580mpun4a8x93edvf0q0a9qc8jm5h9442c1ict8zj1hzivbxl6rtruadfall8c853ozznav9ppok',
                isActive: false,
                clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0cb20cdf-0a4c-4ceb-81d3-b03164f41584'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/3d09a41d-63db-4581-888e-bedbe99759f7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/0cb20cdf-0a4c-4ceb-81d3-b03164f41584')
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
                        id: '44de8752-7126-4dd9-880a-3a1b53206eb5',
                        type: 'USER',
                        email: 'y5keazinz8k943yanwmhkhzhwzx68ps49dfx9hgvyuil3aiofc5ijsem26omu444n2ynz8gtu6pqaat51xhauyy729j37syva8jeini2jr7xsfuizngsjokb',
                        isActive: true,
                        clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '44de8752-7126-4dd9-880a-3a1b53206eb5');
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
                            id: 'db4e2169-ef2e-436d-968f-b4387ca9f811'
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
                            id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('0cb20cdf-0a4c-4ceb-81d3-b03164f41584');
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
                    id: '297bf8a4-bf06-44f5-96de-cdae4f7f2363'
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
                    id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('0cb20cdf-0a4c-4ceb-81d3-b03164f41584');
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
                        
                        id: 'b6ccbbf4-9904-4f67-8316-ea9721c9a7b9',
                        type: 'USER',
                        email: 'btz8qo2wsi8lf6mosuo9a4t24m6rwvjtsp60s13lmn9qio1ns6hbmps17m2gpph3ln7da2dgg4156u4rihfa04vjs6v7on13kvf6mcywyf4prcx8tofi0i25',
                        isActive: true,
                        clientId: '5a71be3b-3224-4e7d-b671-c4992dd9e4f1',
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
                        
                        id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584',
                        type: 'SERVICE',
                        email: 'xr91r7d0a4pwh9vbueqfbiui09w8rpsvpb9ta8dr7yl4fxdjn8bkp8fi5sdo78mwxk51if22v5tf4dajvp9p31cw91vnk6biv7d2yg5n9qtf3jt2jwj0eqrg',
                        isActive: false,
                        clientId: '7f5425e0-f71d-42a6-af0f-8d2cda05c5bc',
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
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('0cb20cdf-0a4c-4ceb-81d3-b03164f41584');
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
                    id: 'f4601e71-ec55-4625-81f6-10ce45678188'
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
                    id: '0cb20cdf-0a4c-4ceb-81d3-b03164f41584'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('0cb20cdf-0a4c-4ceb-81d3-b03164f41584');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});