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
                email: 'bj1f0pbo9kfa00a2mr032mdu4l02z56g1wbhgrz814kj7yz96zohmqu77q55cn1osha8ilk76692eb2t2bx3xx1vk4qyxbxeu6yg9fple82368svpu98iu7u',
                isActive: true,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                email: 'syq5upmkp6cealzsbzz65qgjbln2qegvy2bv0lqlcyz52jwdfnu7e0otbz4i6d3tkd0ya9d7plwfz5ar9xsvn1mw0vqc9id7msnh33f3k1krjaj9daxyuj2k',
                isActive: true,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: null,
                email: 'r3f0i0blpiv71lbxp7dl6fq6q50xn3jfahrayomm0m3f1wkhsknk7e9uzlh81t0tm99nr9sd72cyw04kuf6uw9xk3yyaorhiu1kxmxgxwihkke39rqgux26e',
                isActive: false,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                
                email: 'tv4uyvfr1jsc46arz19n7gw027p770l9ftn6rf1jjk8z0b7fxtp4sollyzhnu98scth2l1g5e9t2hkdxtzsn1cpnl0nyru1t04wrye6wp3kgr7avuwpsxqlb',
                isActive: false,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'SERVICE',
                email: null,
                isActive: true,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'USER',
                
                isActive: false,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'SERVICE',
                email: 'thfm312tga2qjlvywe8fyc0dgzckkug2d0ks27g8bwbd91wm08nhgr9smka0dox9mlb8ddrh689tdr1ljp89j3wyt76osh2o3ssde8txz8xlwfiltkatql5b',
                isActive: null,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'SERVICE',
                email: 'oy0gxd5fqrwxwpj7hn52nz19pdxl8xuzl2gdr92j3fpg02nuxtzxk7f5ffisjns1hnejmi3w39kdcwy2jj0w4p8m1fexrq5mp9igsy99l4dsl2i27zl1s2q6',
                
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'USER',
                email: 'b8vdbdfq7opyf576yl6zbmasnpm3626jwtkoj9ydqbow4l5hxzsfc988oaoi96qs4bp2i7qhotzqdattuo902a115wifdmtvinrhd474fyaw555lvt8n3p62',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'SERVICE',
                email: 'vg8bui9u6uustkvsax7bnr7audzp0q9j6w20zp84i58odz8b5vs4zcdoqfnjloy72gbl5vnyh0vxp7a6l4qfqm76bmko0by0kkd5jis6p41yv2rbejxs7q1d',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'USER',
                email: 'd2k9qfyeswzvu0h5hi94sy9a1xogthxm50a72dv2oeway03myxeehbejmiry0yk6aumbzxaphthhmhlhj6vzthxk698g2mi25tiuhnci61pnct4e0erc9f0e',
                isActive: false,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'USER',
                email: 'rp02k5cwwl464h6w6zt0hl1x2qcp8ulcb7xtf09d44kygu0sdbsn8wc9xcuma66lk9x3zgauukge7nelwy1ps6p0vbfl6eruryljdpt35tfg59o9vnc9j091',
                isActive: true,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
                
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'USER',
                email: 'pit1wzgh6f9oq7vidvm2sr2cqatos616jg8hdpfw3nfl7m49v26etrwvettiqarjp66pp65kgkj2lcc6oe9j5dmh4dcg38tt829uh42wk3gv4msnudgd1ast',
                isActive: true,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'USER',
                email: '12rqwmjhit0ir12oq8hpo63c6nxnhekmg1ma0ao77xsqwyqfscuyvs2ifahm03aoqj8sh9pcr1uu4rvm96zfbde4ylsvogi0r94ec420gfdfxnvimfisf935',
                isActive: true,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'USER',
                email: 'ebmp1pgy35cma47x8ysxvdszfj29bhzgxmobwkxm51sw8dwjlntuf3wy2suulm9q5dzfqp1zosmk0pos7j4h8hvmkqoqqvn00mepuh9l4o7k95kq0k3zgike',
                isActive: true,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'SERVICE',
                email: 'gr555zk3frmnycditqsxiznozei0s60u1p3ak0b376ep9gs7th55wtma8coutyp1s15wxgbvpd0uuh3lv2803chfdngpgubjwaudw142d0p42a3gdvv56wbu',
                isActive: false,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: 'i3fqaz6qzttfzahfme5ai4ytbk3i67b3vlivd',
                type: 'SERVICE',
                email: '5nauea7918i6mmr4c5nk1hmfj26tslcahzwdlb10pm7xk4wvqwa7vbvdsn59v0qhkcqmm90xf47hxkl9kvqo1948z34hl5s2b347m2e1pdrv3bb51ed4g9ii',
                isActive: false,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'USER',
                email: 'frxxoppubjfggto0ujaq2rrc0ehp7pzcqg3lng5i95jjbj597lxbmpb1ralqr8s10fjj5rmfl6xuy8a8oggedx9xlxf9qjqccs3o5z38vskn3q8lqnc0vwvx',
                isActive: true,
                clientId: 'szj2xxalje7eoetv0j9t77eqtl73hpy8nznvr',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'USER',
                email: 'ymflbn1iuzpat7e7scznsnw0bv1sgdohuxu9z0oxmf0jt7swwcq5cswakqnz1xd5wpj0zlfh97b2xxy3s4s56namxg2540es2glge24f129jo3zp9y247il52',
                isActive: true,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'USER',
                email: 'mfyqdk8wnyapg9ohqrd9ex8jagy009phtilfdr4ypmx92gnuv9sstoo657p3133yb0uubhxadt394ooudhag4l8ygd95ox5e9y1ouslagicbvuayio76p1zg',
                isActive: 'true',
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'XXXX',
                email: 'p31i5ohoundvm99rpgp932i2rnzh62jm6uoblu46zzxztifxtuxv5xixzpm18zttqkm06kbvirxry9ksok1znp3lyj509vsaifljtmp3pbmqxsygb1c2n1dq',
                isActive: false,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'USER',
                email: 'z0cxe3i112p0r35iocwwkqhpymmuadg5cfetkcisx3gcn3dckvccvhky20t150zkujt05ox0pvjad8j9tb7s6f23x3s6xgh6vzo4nyo4l4cuyjlmghyjt27r',
                isActive: false,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                        id: '17e602a2-ef6d-4352-b32e-4d6825be5d4d'
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
                        id: '12166627-093c-4a10-923f-3c673fcfb53b'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '12166627-093c-4a10-923f-3c673fcfb53b'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/0c3413ba-1c0f-4ff4-8070-111f3d9ffa8a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/12166627-093c-4a10-923f-3c673fcfb53b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '12166627-093c-4a10-923f-3c673fcfb53b'));
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
                
                id: '52ba00c3-ab61-4b3e-89d2-9f28b0b37dac',
                type: 'USER',
                email: 'ubg7e5aku0994azy5vhe8fyiljs7wraawjy1hf28znpdtfv43qchxe9y2abem3yp5mih9e4zghiujr05ncep7bha6trjvbgeo9g90dv7z65fzp52essr7itv',
                isActive: false,
                clientId: '66a26cd5-eed2-4a85-b7d4-354320904924',
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
                
                id: '12166627-093c-4a10-923f-3c673fcfb53b',
                type: 'SERVICE',
                email: 'nnewh8qolgc6j3gf6m36cy1q6sblysy7v08qg4ko7pros0fthkct7ixdmo7kdd6yn4m53th21s903br9njr2of90v8apobxei475men9pxbwgbo0ytp3bjl1',
                isActive: true,
                clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '12166627-093c-4a10-923f-3c673fcfb53b'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/2b6e9fb9-1f1f-4c0f-b4d5-a244b57c811c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/12166627-093c-4a10-923f-3c673fcfb53b')
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
                        id: '87ee4672-8e40-49bb-993f-ea998e18cb27',
                        type: 'SERVICE',
                        email: 've885kf5pqe4rk4w01kygt2yy6907az98s5mruza3l2n3xaoja1p3fuxiuic2diycbaaonf6re7bu2yg2up5l8s9pdt7213u4vdshwbdlic8frfm51dg9i63',
                        isActive: true,
                        clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '87ee4672-8e40-49bb-993f-ea998e18cb27');
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
                            id: '5a4248fb-1642-4b10-a95b-c0178644c7cd'
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
                            id: '12166627-093c-4a10-923f-3c673fcfb53b'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('12166627-093c-4a10-923f-3c673fcfb53b');
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
                    id: '505d736b-5662-48af-9525-4beb9a396c3c'
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
                    id: '12166627-093c-4a10-923f-3c673fcfb53b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('12166627-093c-4a10-923f-3c673fcfb53b');
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
                        
                        id: 'be0f8429-b012-48df-94be-785116ea4c36',
                        type: 'SERVICE',
                        email: '2vfbqmpxb2e4uvtq3spipb731k1mk8dpx7lsw7ol1h7ag38nceeayxjwnornjtj1lewpylpk2l5yg0jcbnq5fy8umim3ysi3uhrq7gtn5mjhjxo2xcn8r74f',
                        isActive: true,
                        clientId: 'e0073f52-23f3-47a1-9ace-28a06fbe7501',
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
                        
                        id: '12166627-093c-4a10-923f-3c673fcfb53b',
                        type: 'USER',
                        email: 'rqfxczn6t6rth9n7i1ahuvlr2g7h73te591fr5hiq9cnqzhs7ea39bfrqdexfxj7b7uqtp5wb4wawlnv7f1qfasp5osmtn1icnxy6sjwefk2jmq5t63lwr8a',
                        isActive: false,
                        clientId: '8bb58994-eb91-4646-9eec-70a812a26093',
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
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('12166627-093c-4a10-923f-3c673fcfb53b');
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
                    id: '894cb81e-cf67-482c-b8bc-c3e3f7d33b99'
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
                    id: '12166627-093c-4a10-923f-3c673fcfb53b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('12166627-093c-4a10-923f-3c673fcfb53b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});