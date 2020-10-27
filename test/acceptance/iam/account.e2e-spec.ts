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
                email: '1hjx7f60r4vuy12tooizr8fy02av3lpp24h3yxsamgfng1yxkoq45zftovwdyxzt0oee3r89a1kp5kbzjjiac1weow32vrng1z5bbe4d8cigpzahnp91n9oc',
                isActive: true,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                email: 'k7resvw6bddlj5zt4a51q8gts085gola97ai25z615doj08ks3k1x6syb6rjpucrzw0rszkn6gi4vn9fqkhhbys0cfi408zq1hmzx0g4ta07dy39xm2d1o3e',
                isActive: true,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: null,
                email: '00644luwym5ih98nd5mozsziemb0sxqqa03wp78xes6syezsbhsvdpmakebzijbc7sseicpyns9lweohwbtc0gtdne9ju90y5hy74p7dczcx10lgg35ue21n',
                isActive: true,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                
                email: '7ewlca8cvhddhpfcppxg80aqgxjezjba92749xa1y1iej47ps65k6xe4rufd4fawzlon2hempe09mlk6inzn92wzwtoe3z9dxurjmxps4d5vemaw7m63uhvp',
                isActive: false,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'SERVICE',
                email: null,
                isActive: false,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'SERVICE',
                
                isActive: true,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'USER',
                email: '20j9chz81cxgxp8rv09znwcyiibzr6tks7pn5lobg5guub2lyzksv28smhzrwic9dksxi7zit2nynmu1perr9lryuhylk65ok85q1zy3gwnrq806pjr0taze',
                isActive: null,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'USER',
                email: 'k2kr36fb37qowu7nqw1zbkxlvoftovwcuglfk8fdbee2jyvlkyivvnu8h6abkofm8sahty8sepokbgkr4v4s52x5uk4mquzb6u9udyhwfiv94v1sb0eor0kl',
                
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'SERVICE',
                email: '6oksufjjhygi8mcox0ms4wnby3v4vehowdensqbfoa4apqy91dvkl92eekkts0v368vljdqim65dcdkylpt870qhc7c9y41h3gridx9xl463q6vhe3n05uvl',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'SERVICE',
                email: '2g90x6qk5pc4ta7qusiaf0bul7wm7uv9a15wu1japavix7hwk3efw5zt0bbjd3atd53xv3hv7f6y8ljl62c1t1mcrqkfgmx7crlkw1plm3etjwfrqa2xixfw',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'USER',
                email: '8rikidavuwhr28v6le4oufd9o9ezhtpjgq8qn69c1rxcq2p73up6v8l1l0y1py1n5xy1k38lbmuui0uno2yhm9jx6od5lfahusett5qpc6nrq9fzfpi98v97',
                isActive: true,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'USER',
                email: 'eognonkqbtdjc7x3twykd74us2snurp7kxespagv13p9o19m0n71xlg6th767743xcmcyeawa76skj4mkmsue5huugfibd1cjwj4em93ovy8hmu50bly0oo3',
                isActive: false,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
                
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'USER',
                email: 's6qpoo0lrc4y2cr9hvc9z8xb3spneap9if12n4zq0wsgio6h18tcamy3dfhu9ek5sa57kjw60rsutsnezna2dac8gyc68gq1aw78dx3fa0g2gjffmehr9ann',
                isActive: true,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'USER',
                email: 'mvtr38go67nhwq5sur18ngl4v9wdf9hnhlu3s7goj50tjyqb1l8ayna7toq2hc4gczcq6dgmgl8th5rdmvrwjvh69atcvem0wmgl6it3o661qgc3pbh00qr8',
                isActive: false,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'SERVICE',
                email: 'jhtepuh20ncc8s6l17adf0zb6id7mkij8ganxv6fxlviatobio5kgx3uvtfvt2qr4i636253rs8g3ykkgxhd89osjr3dw0brt75fp6o1o1s6kg1syjo8ue3r',
                isActive: false,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'SERVICE',
                email: 'o34y2cp91wg6bwyqunh6tcevkepfbzz4to41xhdcfw0li83fotg0w9nfu495j906ctpw7j4ff2wyyyj0tckhd2j1y0xmve1njigzxeg4ye9c340x21w3zrsy',
                isActive: true,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: '3d62zpy8i5u13fx71kid7noyno3fxrrdgfdg9',
                type: 'SERVICE',
                email: 'gsvozbeskcjxve1gr26b2nn87ksodrayalsz5i88nirzpiav26fbs37bznkh9oh73pz9y0xh4u8fvfmvyv2lrlcejlk89duu3ue0lfn5fq9p6a9l4fc3vlqb',
                isActive: false,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'SERVICE',
                email: 'vsz86hkz3cey5bpz1qkr6ft5tfv1z438861ma4hhfgigauqeqt9ec2md7ers57awt34oa1elo7rox4ljhutb0lipnnznekceqmvls1ept4816wr3xh82udx0',
                isActive: true,
                clientId: 'siwuinvuxz3d59ow7tm9psc426364pb3yjazn',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'USER',
                email: '2hn0m02oc6ytmu1r36w8jjumu2r4r898k5kale1p5gqrhmx6dvz8eupnmcy9saeaqwc2q7uaeuy3pq3qchrux9jy8oxr9it3w2z96ajzyzcfitsn3w0h216wp',
                isActive: false,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'USER',
                email: 'vvu41tjtxuf4q9nju1wb1o5w7pwqtt65wbhsvml9glmjthbhej284au56cd993ld8ibxbhy2tmm868sqe527xuu2c7el3j8xgasvr6xzjtpj69oarr9z9pbb',
                isActive: 'true',
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'XXXX',
                email: '8w4mzcx75yt0oo54yf83woh5irz6u8pfwu73fgwkff4plezb5mqa3x1np9b0sy3nrkkgrdjni07s4dlp9mtry8gm45k2y1nef2wurin9tetxmuftyaiyn7hm',
                isActive: true,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'USER',
                email: 'snz3mx5lbh35mm3j91i7mvljztaapw7zpc66ssdvd6fvir1ryehcyhgxg48vo0vhhjugnat7qqfe946nutqs3j198e24bjjlbdlf4xrh0w202hkzskn4o8gd',
                isActive: false,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                        id: '06e0a51b-6579-40d3-b0cf-8f671f9393a7'
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
                        id: 'c660d088-7ba2-4012-92db-5323fb230750'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c660d088-7ba2-4012-92db-5323fb230750'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/497c492b-60d6-4667-840e-4df5187f7e86')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/c660d088-7ba2-4012-92db-5323fb230750')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c660d088-7ba2-4012-92db-5323fb230750'));
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
                
                id: '3a74fdd5-c3cb-47a7-b889-14edd52f4bfc',
                type: 'SERVICE',
                email: 'wcl02w5rx10pi3cnx3yz8yjqc347csf868g4k1itjoxcifr55h268czrqujhcmmaee32f3u9gaz5mkihgdlp7jktzo59t6iqtcnc4pak85ag2uzvs6otzqre',
                isActive: false,
                clientId: 'f3be75b9-8565-454b-9be2-d42f9274305f',
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
                
                id: 'c660d088-7ba2-4012-92db-5323fb230750',
                type: 'SERVICE',
                email: '94cewgxnaz9atf8vnvzbicmznu4p6k47fv6ttnsh4c3y2el9j7gh9luvm9r716qc8neo2s03i0v3hglkbwoz3fh20uyfehodshyz0bhifd0f0u1jofihjplh',
                isActive: true,
                clientId: '312210fe-a843-4978-b957-ad5080765c30',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c660d088-7ba2-4012-92db-5323fb230750'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/1d35b2aa-b1b4-4165-b70a-525bfaa04a94')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/c660d088-7ba2-4012-92db-5323fb230750')
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
                        id: 'bc466b11-a36e-44a3-b2d3-3f94cce2a7c2',
                        type: 'SERVICE',
                        email: 'e4lji7iiqz6hir6l5330hhhowgqn9jysesflg0xz3df01zpxc64brnn0c6tecr31r6w9dpbv94n8dp7geztlhhco476eqz4kukzvw0343c0g8x3yljamfz7s',
                        isActive: true,
                        clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', 'bc466b11-a36e-44a3-b2d3-3f94cce2a7c2');
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
                            id: 'ed083191-0288-4bfa-8d33-3f150000e2dc'
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
                            id: 'c660d088-7ba2-4012-92db-5323fb230750'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('c660d088-7ba2-4012-92db-5323fb230750');
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
                    id: '467d475c-d569-4fb7-9bd5-1f42c30d07b1'
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
                    id: 'c660d088-7ba2-4012-92db-5323fb230750'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('c660d088-7ba2-4012-92db-5323fb230750');
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
                        
                        id: 'a59af166-1c41-4895-876b-e53aa90d6e33',
                        type: 'SERVICE',
                        email: 'kivnqecxrdni9c8zxy4owk482dm9rn435mj8btrm3chbfp4ynd0s3z2us9zg5igs0q3zx8og1ic1kovslcgors8zjnb89d8bjhbd8zr4j9ki131cs2fjeuti',
                        isActive: false,
                        clientId: 'bd2aaa23-b47a-4a25-a54d-4a64a2464dbd',
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
                        
                        id: 'c660d088-7ba2-4012-92db-5323fb230750',
                        type: 'USER',
                        email: 'vld8cozby3opoo4wdffxa6uf0nl5m9mp17l2cmdk3ciq9oh8wsv96jltdpf4j0nnxq0nglvnhs090ysg6b8801qd0gcb565p1yiolt6vy2mm7svbiimx9djl',
                        isActive: true,
                        clientId: '312210fe-a843-4978-b957-ad5080765c30',
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
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('c660d088-7ba2-4012-92db-5323fb230750');
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
                    id: '3d80baab-f122-4d5c-a19d-ac896bcd6664'
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
                    id: 'c660d088-7ba2-4012-92db-5323fb230750'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('c660d088-7ba2-4012-92db-5323fb230750');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});