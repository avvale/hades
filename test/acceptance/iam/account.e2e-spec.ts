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
                email: 'bwp60egs2ovr15gdon6l0r3hw9f8n7un70okp0hz42ueavy7oh32dc1khqeewolbfg8j19ehh5vx9iskukt5a1hidbczrnp5uwyc9v9dmhrcoa2rmffyyz94',
                isActive: false,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                email: 'vyj1hdhfx8izy27c9usazmdhyzggnkwm42ffgp33r73lml2y1b1t8395oweavo171njm9en2bitblzmb7mpejsd1hqop5h5qgp1lsfwk8829u9oeunyzhohl',
                isActive: false,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: null,
                email: 'dqp27umpyhamhigr6fs26rzoxr2xchglp6ccj5ptcifynum39i54nv3kdd7w1xudl3p1ttam1unie4m5b8dz6y7h2mj4qs8wf08bwql2r4zbjfssx9vkuo5b',
                isActive: false,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                
                email: '36dgs0x283fnc8gyjqw7krz8qldzf4kcuruhaaxgje6ltxakymtrjlg9ux5ef5vucfo55cdvvmv3gdeyj8nz7q5fg0ctbrcha6qhqi7nna6rgcnb01bgp8iz',
                isActive: true,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'SERVICE',
                email: null,
                isActive: false,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'USER',
                
                isActive: false,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'USER',
                email: 'bmsqi70bi5wzjxlx3q6pzz25qf0q42bp6u0b1bvwzef03nbaxni4ssw16pp2fmme54f54hr36rfg9zwux69eba51ptbczmxuwzmsjcy1yn06kc61bf4uuupa',
                isActive: null,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'USER',
                email: '9787aq5gq339unem5j53hyaww6o1al3aobu684ve6r9fq6jo99qcqqv8kh5ztdkpid2sw0aeavk0bpiape7i6v2okgzoggfeem54a93efcw9rfs4mpuim3ow',
                
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'SERVICE',
                email: '2935otp8iqpe1ucqznco5lkgjjoh4g9w3xaznawm2eg3amzrcibl9t57wdcw2t6ebbqpo60tdqprbuo1yknk7lsxcoxcgjg3vlp5bru85jmas10kie4e1c5b',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'SERVICE',
                email: 'r13e9ava5xq6mij1xd9dn1sll3l3pfp29un28ien7x9gad3j3pjzmsmn8bjr5bikth66s7kaetl72kthrr1nxn59fplsqmo7ysuykesdfdk33r7hu6gudmtn',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'USER',
                email: '74u66lpj5s7d5ol9ljskhm30mpqhtrn9hcji3s63m3ssdqywxf7f41yz9o54eur48xuyi8bjuecxydmjnu3smp3f174u58fwsu7ybdu5dzehm8k8q0x8043q',
                isActive: true,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'USER',
                email: 'mpshm96d61sjwe9fbl2ggq9uzuxtwydlwrsf059o8igc5u5ngxe0pdn7s7zhi67k4gqd40aav1n4zkv9i01x70spo2l1on11upf97zyd2s9qh85zhxndz7t6',
                isActive: false,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
                
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'SERVICE',
                email: '4artpq3bbhgr6fmpjml7pzrk8qv4ndvyc502z6exyzfe2rlw9hd2zactxnnkohuv6rv0s4ud10eui8kz055452qmox901zm4f2n4j68nb1fkuwth7rvdcvvn',
                isActive: false,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'USER',
                email: 'srnmloyu4e00l97q8o1gqfede2k6oe7csqt69ou7gdqu8jvlhmi3wgsiqe94tuqt0fnqhvij1q4c5r28amg6cc8g8srskhqx3vox58vbn7f0a8hzts7jxu5e',
                isActive: true,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'USER',
                email: 'onl6fc5lobqu5lxo1um31yvuqx2xuyzjltnumobaukjmz7h62o40pwce43f9p0dkyk0lte7o5kavbrensqh4xypvu1o22561w3j8m2rkaiosgz1mp7wa8eae',
                isActive: true,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'SERVICE',
                email: 'tq6oiyecprygp4lsgxylrooi6zd0u0xdeixijg4qd7ce7inbke9rilwuti2jd4dxja94sinp1bu6zc5iltjf4cx0ynrgaa3u5lfgn0zoux2gvl98k7xkj97t',
                isActive: true,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'y0l5z00sdw6psoju44brjvpq75c4zss96bmr5',
                type: 'USER',
                email: 'l9hyfru2h6h70bmt0ph2w5l9ur47o9ia0nxsimubg405g3bvfc21qrfsj13l9d7nbawqmhm5wi18dir6ahbeknxrdfonu1z07atfkhfswpvjnkn2zjw8snow',
                isActive: true,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'SERVICE',
                email: '15hcfzpdb96jy5gpgzz0e6oh1gts3652e1d0pfeoyw9onezlio4mi7e3av2r8y3khl1u3xpjssp6gcipake9w8bs0srz6pbnr04n2o92x44y2qfiqqlzx8mh',
                isActive: false,
                clientId: 'qbnaw4zg4ozm78s72h7jkfj9y50nzaq2jf4lj',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'SERVICE',
                email: 'x8e0z0hopns4y32djw2406v031bszechmolnbgogcuw5vs576e6v2pmt49ltzssldpluqqoc2o7ceaigrmhucuhbyje1i87tuwwiyq3h5atj16z4x7biuwhdw',
                isActive: true,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'USER',
                email: '8wpnclhxntbw2gauobcacudyr14pvivfhip6d04k3eiwz99ub1gbznq0xodrrdudkl8x03cnd8368v9yj1ijrn9w049ihgu7jmhy8iiarhzxb1qnl0zqp0t1',
                isActive: 'true',
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'XXXX',
                email: 'nf3wkq11hytoatdm6jok43bpudq6dul7zlngp4m6cwyb2ecx0x70r2kyoqp24o5q5pfv6kg3n8vzn9wjj17sqex065usmo3tm0grwrp8w8s8ndnj3g6w5tk1',
                isActive: false,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'SERVICE',
                email: 'grjma95y48s1dhbhgwhoxolnw1s5u9b9o3zj6hda6etvuxq75e25990l7bzahjlxbyzqxftgicuj6989m5mb8wnggquqxv0gmti7hl6w1ubxx99y2ysajuf6',
                isActive: false,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                        id: 'c74c1e3b-aa69-4bd4-b7c0-c7fba8c9198d'
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
                        id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e1889f0a-1aba-4476-a0fd-5543f975ef0f'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/601e108d-5cc3-4d7e-94b0-a33d4b257a18')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/e1889f0a-1aba-4476-a0fd-5543f975ef0f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e1889f0a-1aba-4476-a0fd-5543f975ef0f'));
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
                
                id: '733ed8c7-5ee6-420f-aa39-f7fea0a1363c',
                type: 'SERVICE',
                email: 'wp3nxuc4q9kaiyhpaziafy9dd8rd6ldcvk5sxc7tmzxmmar9linel5o90bm1zgzwzcxu4ldb85dcqiojc56sux7qigte5pcrxs2eid14lfjrmazgv8p83gqj',
                isActive: false,
                clientId: '0122ae89-2cfe-4143-b91a-16c7fadeeb3b',
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
                
                id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                type: 'USER',
                email: '3u4kc1jot3lp2p7c8dn1bniv50x18n7kvvwg2rxgm4zfa8ttupe14xd2a40wrteron2s2edx21gugytf5hs4l7qhtjqzesvtf7ryii9bb78iujrk4rjblu01',
                isActive: true,
                clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e1889f0a-1aba-4476-a0fd-5543f975ef0f'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/7c629170-864c-48e3-85d5-da7156375973')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/e1889f0a-1aba-4476-a0fd-5543f975ef0f')
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
                        id: 'c01e3704-895c-4988-b170-72f70eb8c376',
                        type: 'SERVICE',
                        email: 'b668x1hyck8yb0c5y5vdone1qe2y9gsc2ifjmqmsf7e5z2t57m6sd2hk956cc058agwblkw1vy7xab55jkqdfb2o0hh1ir0vdro9tc92pu63qetjz2clxdpc',
                        isActive: true,
                        clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', 'c01e3704-895c-4988-b170-72f70eb8c376');
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
                            id: '5626197b-f847-4e26-b4a2-f73c374b742b'
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
                            id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('e1889f0a-1aba-4476-a0fd-5543f975ef0f');
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
                    id: '9a1aa40a-3a9b-4578-82f9-323b3bc96947'
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
                    id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('e1889f0a-1aba-4476-a0fd-5543f975ef0f');
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
                        
                        id: '11fdb6b5-aea8-4159-8383-7e299bf89024',
                        type: 'SERVICE',
                        email: 'zgjvulwihyhzie66jzuhpgidayv8fchz4ua3rj0cngri01fs5i38t18bidfyvy80w7krnau6bacdlaf23t70kzi0w7pi7rosr927j2j51qob22wjp0fj7jmt',
                        isActive: false,
                        clientId: '3e488c87-bbc0-4389-954c-8e2997cc5491',
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
                        
                        id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f',
                        type: 'USER',
                        email: 'gkg2oxbzx8g9lomnqr94atsmupuybcoczuut5zybo0lao0rjt47drn9l8n8vv8og6p18wwk9sav2apfud6tby380pdb08m3x9qgqrqsn0judkbihvwu70but',
                        isActive: false,
                        clientId: '72d065a5-259e-4f1c-bea6-9c5ea1b9f45f',
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
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('e1889f0a-1aba-4476-a0fd-5543f975ef0f');
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
                    id: '4c26ad1c-07e1-49e3-9d36-7409f20e4446'
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
                    id: 'e1889f0a-1aba-4476-a0fd-5543f975ef0f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('e1889f0a-1aba-4476-a0fd-5543f975ef0f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});