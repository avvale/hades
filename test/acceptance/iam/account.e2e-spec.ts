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
                email: 's5xov1tl671e9yatbecb70edxars68tya3e2bdgybnjiqmxp9mzts58d6y9p2rw0j2st4ghdgbplpsxbix60mlv4v99yq6ageu47qhme74ehul9pohoonb2r',
                isActive: true,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                email: '8yffmg0bagntdsm1lubjfhlbnkkn9p730hudsrhf137hwy8059mz4ty575uusv6diogknjd2s9v0xdw3ji9hfcsu64t5ywuvnbaoywkcqztcn59ofm5gddky',
                isActive: true,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: null,
                email: 'bmymuxfk4qihznsmtg8efky97c762wwvd1wnapkc17p5bchzbk5a5hjijwedpkn05x61p7ittjkh88crtc35nl2fluwhhy1blejbbddcesl62c3rsx2kr5r0',
                isActive: true,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                
                email: '8fnpykbgjiey3oz75upz1whp03i44o9mj3c3r4ib186dky8m9pftf2p79gxft29p0avxnu1h48zbcvflrtal4xlgfyu6doeq5advmunndqzfxzuan8enb8c4',
                isActive: true,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'SERVICE',
                email: null,
                isActive: true,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'USER',
                
                isActive: true,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'USER',
                email: 'wgohbenakqj8ws2s0qdx2g6tvyz0539wqgs8u85rdnbrgqlsxmofd59hockjvtb2yhuxpin884qwwg32a9z448q4mfmujb1k2mgld1flgezfi6gs39ko1xe0',
                isActive: null,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'SERVICE',
                email: 'ceutn8v8zrvsyalfx5jz4pszkl0v0k7cepcwv5wv8lqiwvsim47yo4i8811do5l61rgb56hsp5854ckwmehitj76ffcxf2qk34vjk9n917ymg1vlwrahepv1',
                
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'USER',
                email: 'xe9154qrm422o7a3w9ivzcgyyxr223e9ykzpoaheh8hw6rqa4mii623o4d5g84cwz07e8pb9fnjd2237evx9cv38wnw5de7t4dgl3g29nreafg9wxzm4wjno',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'SERVICE',
                email: 'k8w6ry83ttyctcyhnmajhd1dh2ze2qljao9uz0ws9lw4lax1vjvx1pw3mbbesy8pgcuodyhnqkbmbmrl450huhha1abnna6smktxhsv9jyyi48qzavzkq1kl',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'USER',
                email: 'nlmp8j52lf5qpjpr8hunvf7jd2gysz51rci8hb17yani5fzag5wromu4x667cdb0shcumzk9w69hwy0xo8i3566jdao6haltpbi0mal3510ccenqtghtlqkv',
                isActive: true,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'USER',
                email: 'cby55fhlfcexsvkvfago6nzlc6tya3iyupn39eu5m7iyre0ibbv9y9mrgvi9qlzzns4kh5xgh2m1jbtyypdhy4t4bp6ambxcdtr5yimo54kyoj5pcmylh8jt',
                isActive: false,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
                
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'USER',
                email: 'ddsnlhudn1p97rcdglozfl6xgatxc6n2jhremcmszxh089ovt0pjbrbdx0o8ulmh4h7n2utsdze6a0jv2jvzu8m6k9zk79ydvk6k0394x7kr5u2841hg3f56',
                isActive: true,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'USER',
                email: 'akvysyi4nf7y0ptn579o3vp9pgqvpbn7zw2lxdue7qfc6yvbbkk2pvyvrfs17w09sc26m0om33wk72yxcad1u5ksgea3iwenw6zlsxujr5k5s1g4en7klyyv',
                isActive: true,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'SERVICE',
                email: 'sqmhzlvih4oenqjr7qgtegaml5btf4oc6ka2my3e4ddxrwtk7syd29bkb22n2w9cl38dsqu2nx6u53n9e6d296we9cgj7of8v8iwmghrrb6qbbmr58tpuizb',
                isActive: true,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'SERVICE',
                email: 'vxqjcq0l6k7gv3qxtmzs52uxwt6lmuxkyj69jqidxpk5tmcma06aiwfiuc45g4hboda0l1i2u7bu04tc52bzxm3edyh1yv8ksjilg82te7wrcvfcbz4yal46',
                isActive: false,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: 'p841iwrrp79p6ub9babn7aqaec211kc9c1sbc',
                type: 'SERVICE',
                email: '8pi3cgh9qwc5ryzfvpvakv3m423s2p0smtri94ezus2nj1klktby1me291cwhphp6uya04netbg5d8a8glmkhb8aw1a8v84riip3yeestf519rvc94uynnzz',
                isActive: true,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'USER',
                email: '1yjs9qiwt5bwebilnwvcp4t4vc8skfwexe3439vqfnf3x98lvba8ubyuu8di3d2zpst4b3sdmrr57zf99wyijzyhkj8akkde6lieyv8kfi4lglao2kl9s18a',
                isActive: false,
                clientId: 'vcgauuu7teyn83ir8rdyze4ayuxcpsgy9sa54',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'SERVICE',
                email: 'b6331647112yvl2xikyjvzgyulx3m1ju2v23t684f1lp9gypv63us14j7zp2ihmw0fdrc1z8kj8t7wzhmakrcmty2mx40r0y6ebp2i9wasmahfzn0q2m811l6',
                isActive: false,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'SERVICE',
                email: 'f0g6kfcoj8gvebljsjcudrwkw66h6ws4fl37dfo5kve512nr6kbutl37t1qjseq3x4gm0ox2s0vy8w5fhnvs7zgp8wafcd7lssx7fb5ytkhuj7ymp0416t5i',
                isActive: 'true',
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'XXXX',
                email: '7rh932rxmstznqwbjbsnehgqdo0cwnzrfdhyykbvsho6r3apwa1ipqj7ri0y4s2a6dt6ldeiv7thayuzsu1r3uaoh0z7so688x9q4keo9mo5q6emkhufdw7p',
                isActive: false,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'USER',
                email: '54z40bryphe5etw5ge5i5sme4l3d6zxkesol7o7p2zvjk0vqnucbge1nb8j7wrd6i0lfowc76aez5z7lec3eflotuewyhjulg4dbaamt75h4ufj0hnup1w68',
                isActive: true,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                        id: '99b5a5a7-6474-42c3-818a-1f80ee518fcc'
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
                        id: '32e2475d-90db-4d9b-a4a4-422fa5711418'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '32e2475d-90db-4d9b-a4a4-422fa5711418'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/e1b92949-9a82-4b6f-9654-36f50527e8fb')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/32e2475d-90db-4d9b-a4a4-422fa5711418')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '32e2475d-90db-4d9b-a4a4-422fa5711418'));
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
                
                id: 'a73462aa-a495-4013-a967-a4c0cbaf94d5',
                type: 'USER',
                email: 'i8017tnuzi251kno4i9vwvico9hlvf1e7swyqp6tmyqj62376vt5apq72u2aivg4wzrn6b8mjbzpg0wzk8z5bfw1qhqgqeojaxihhhwl2mce7r5im1o5g4nc',
                isActive: true,
                clientId: '0615ded0-b7ec-4260-890d-43559d5e2846',
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
                
                id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                type: 'SERVICE',
                email: '0bxpdqjm05s5f3o2dqgufq95tmlojms6n1hwnf66rtc37zpmwm4y2cbwhhx8iw2gda1j80shp0m5863r8vcuraorjucl5benr45k37irxutzqzbewx2vfi3d',
                isActive: false,
                clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '32e2475d-90db-4d9b-a4a4-422fa5711418'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/573fa0f5-b0f7-43dc-a171-4f4cce79ba22')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/32e2475d-90db-4d9b-a4a4-422fa5711418')
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
                        id: '85df775c-7ca4-4dc3-a008-4a62b2134cb1',
                        type: 'SERVICE',
                        email: 'r1qmtmqq4bxz509rt1lsz06ehaos6f3i9o9lj6rz9idu07a4i97vzkrjbdnvlk4bn3b9shtgj29xb00pua7wqyo8ow0afpbdk754tko6ec7l8ggm30klwrwy',
                        isActive: false,
                        clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '85df775c-7ca4-4dc3-a008-4a62b2134cb1');
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
                            id: '0e7d9fce-3904-4292-850e-92af48769998'
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
                            id: '32e2475d-90db-4d9b-a4a4-422fa5711418'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('32e2475d-90db-4d9b-a4a4-422fa5711418');
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
                    id: '5f1fd677-9ea4-4223-9fbf-5015e833985c'
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
                    id: '32e2475d-90db-4d9b-a4a4-422fa5711418'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('32e2475d-90db-4d9b-a4a4-422fa5711418');
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
                        
                        id: 'ba7b12b2-e180-4ef5-bfa5-bff47a8f545c',
                        type: 'SERVICE',
                        email: 'pb4f36nvk1ab17kyj2rxh2yeq7jy1ohr3ulr04sezbmjik6pb5y3zuv70c7gw88dkqn016auaygzp0j4ilgpsb7432us5vfm52qz6wmn9i1pcm6l88zuz3fx',
                        isActive: true,
                        clientId: 'eca625ee-69d7-4ade-852c-7f0f9bf95f8f',
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
                        
                        id: '32e2475d-90db-4d9b-a4a4-422fa5711418',
                        type: 'USER',
                        email: 'jw21jm61k6hle12x86pww69yg27wy69o9vp40alkm92cura9fku619fbzz1c6mu834xwkz1fqvobdervilhvirj982oy7lrypuoyosioq3l5pbnmpeqjyhe0',
                        isActive: false,
                        clientId: '03c1b043-a59d-481a-ad0b-e2f0d6433a1c',
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
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('32e2475d-90db-4d9b-a4a4-422fa5711418');
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
                    id: 'ce72833b-e461-4a2e-b454-a563366dbc0d'
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
                    id: '32e2475d-90db-4d9b-a4a4-422fa5711418'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('32e2475d-90db-4d9b-a4a4-422fa5711418');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});