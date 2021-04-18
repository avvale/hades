import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IApplicationRepository } from '@hades/o-auth/application/domain/application.repository';
import { MockApplicationRepository } from '@hades/o-auth/application/infrastructure/mock/mock-application.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('application', () =>
{
    let app: INestApplication;
    let repository: MockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IApplicationRepository)
            .useClass(MockApplicationRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockApplicationRepository>module.get<IApplicationRepository>(IApplicationRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/application - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'xk5rpuhwvp6gl8qcwtnea5q3yplngv1qfv5k98pbzicyfk8fembef1e6tw0iqwdztl11yigav5igexhtjmyh6ovc18y3mpdbrrbjsae915om1rdkw4y8wq13lo4acjt57m89mvejg7yz3fpei94k8ixk1f8l6k56imaoe6suct9xil3d0nya9tikwvnuqwo0u8tls87vzt2z5xjwd221ft96y71xvinjstvs8pjw3b1r6gz28a9gdr92qbthaqj',
                code: '2uiqjhkonfu57elotzjitnux3o5wowtqupienkw65iemq1qzfw',
                secret: 'u4h0j9u51aiofa9zo6u74rdramgqmogo2vooricmai5jj9u7n9uuw708boiaewd52gbm0awnvyaq7ec6lx847ah3de',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                name: 'w0zzk4ioeu9j3lmq733x5uym8w2nd03z52z0ypmi1z345eicad3uy333ftb5zhdosdc8qa52pbzb1eqgzw57j2sf03n5wfrjqvi3yd3qnzdsu3g2eg4lyuzfp8epxokw3h74qqio7zss31uzolhd9kcud3k9uxahpdjzj16g0w0hkd9kddz0887eqeurf9cutbmogn1yuqvukqbtcjod4u348l1md4qwp98kel8w6u6rqmbwa49nopa8oz4cnb4',
                code: 'iw8mwqbjeqk000ma8xklhcl21csa66luozc2fmccjd5zr1fue5',
                secret: 'kvjnj5c1abaegrz8y6x3tqijc8tcrucs9buj96rq15ufyt8pmhvmxcst8v6x2ri0o3gh842kfwataodvd2noijnqm4',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2',
                name: null,
                code: 'r8gjmj71o5vvmuuzcdn0zgilj7w4po0sqikd36370rsf0wrx78',
                secret: 'i1fl1e6tzq9ms2fys00on10obw7d4193p7pvtidvcbquyl0ili8caofp05cn6vsw77cpltajw1hct60d1vix8abuyv',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2',
                
                code: '0wwsg3h4ew8w5gkxothx12q3j1mqoyj307e7nvdypsdcp6vs29',
                secret: '5wzbqzxd1np6w4nomp87olcckrtm5v8mhvwo1uk6v342ch4oxt0hlv52e3zh6n1b59hg5mbnlldpaldioftwcjgfcc',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2',
                name: '2am3y1r48c9syqpjcrbqf31ykfxjzi8hltsfhzkbi6bi7arvoloxnj0j8dw3p1ujw64adimpkqe3jy5ag6z593h2atcf0xkcoz9oppswf35n7d4mgei0wbvs3mmz1uwrqkofrw6q2f658l0q8hxleg8jb5oh7l14jmzdnmcidisc9oglnflj717ny43f5ss88jbw7peur95bdphavi3lwn7bea56ybdlts0kuhssamo599q0xafv3wbo8ukby1f',
                code: null,
                secret: 'n720u6esg75jyu2xpz0ig6b4l20ol9lhza0duep56c2l8shdby3zawizvorczxq5un7c6dn19sgwyxnnypz5897wgp',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2',
                name: 'oduysp6uuj9dopc6x3lji6q7tp5sy1lopeo87k9uw5p3p8m8qk47t6p1ssoxvob1xknwlnk947xn2w4h5okniss5fze4i71z83corvd7cg6gidtsv921udc279fxtpvwkqb5t2u2lsyg4axazbhtxoegnhjj3iytoqfmx0k2jh3zxwieo1cgnjl6y91zx8hal5zorrpzztan7fruqykz3yjwerv3mzvn9a2348soydr8jep8gt4fvb9rdgqk7sj',
                
                secret: 'hqkzq9ebn4ovhe3rv2j2a94g7754gwfqjqvxpb5tuq43xmoj2n1vvoonsivxb0ved8wixm4azlin8xh3nzf3gv5j2v',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2',
                name: 't5yf09w98moyhc7rdte3yfadd9lzzxjvrtoitt616qjh5g3be1wusb7647xb7nbn9fmc2gmebgon4zg4hhondcfv2qkkvrech9gapp96h0krdvumgbee8x6iyzfgxc9eyo4htryvgqc9gw3o0ouh2g02oopm7bvgr7qk2ndn90hfacip7n1962ne4bbo8xezvzno4ef7vh4e1at1ipiujmww012bz9db48nqzbrbnji79vcuawkiwc87549wg7r',
                code: 'm2yv6s0l7a74wa7lro6jouidis509dzeyie63qdk3eglmsj7xm',
                secret: null,
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2',
                name: 'qzg83859awh9zdrhrlaoay6r4l1gnyk07czwfu9iazvm3e37dwytea0zl4jrzcdwytrvfygwx150rmee7p0bnc7j2gyzj6pmiwu2vjzvat9xw3ehp38tssaeq599qxtr7zsnmpdm4rdy4sx6vib95w259vgybb1um48az7rb7hreuij86sggofk075epaozbwtjizw9pf3lxo5erb6rzopwlkba7rofjlkugc9z0i7eqmsgf2jy7j0ji0ksa7bp',
                code: '3hyf30b2bb6sl7409u74zf3dlic66w5ukspofkf4l0r7lwcabe',
                
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2',
                name: 'syucmpd8og6zuwijbn20t4ea4uo7i50u081ce3eil3jtupro2nkki557xfopto554h99s2rs6mwned46o8vaxwetov9tt4fix5tkm7152njbkxr4ur7th49cfe5btyftovjx85r3go5mo1sd7zkfjr19iy9gr9lrr8wc4ewu2mv2riut708hj8zo5a4jv15widlusp5duya144dqysozl7fjx2eqg3voksuyzqriq68cnt8xw0dw02ns2oqqbej',
                code: 'uts8khrqz4en8mdihon4gc99wccrbfswsp3ua9d2atj13u8vs8',
                secret: 'wx2vntkgk7d0vhh9fkzl5i5nzcoqsfn3wo2nr5niz9svkij4e9ozc6dbvrts7eod93v315mulr4u3woeoqeicxizor',
                isMaster: null,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2',
                name: 'erhqnstq0q7nlcys2mxs6mpnw8s2g97r7ixc3d9ek8ykjtlk5v94ux3hzd3ltemtdenvzpfvr5z4hrvsno2atd64qjf6xm44p9ijxqd5z527swg7ar4v48vewwccqf5f2mx232lsgthkx89uksu4sj6a4bolzlqxqwezvmcrxl9xxk8az3492ehm1cjpmx4ap35p5atb18ii5md8rxos4k9aki0eq6467xiiv01vj5da6v2xlo3doo9uxycsj1u',
                code: 'wxx1qnls4alnip71twx1qmo1n4i7p5z2jwlk0n2rw6h1jkkmsl',
                secret: 'sgsn3xgee8uks72ap3jkerpexg2uaf0g40p67sc5fpseoq3icctty1ftanf3zgxf4kjaon1b6h9vr4ncuc2776zyxj',
                
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'ragx4xudrno6p0akv9fwqhgjre0rg2inyo41m',
                name: '8uk8au0i1g8uledofp1m0kg1lhu131hrxtz5favd67ogjwmhfkax8y1pp5iomz3b0qag03wp1y9e6f0i2oe77rzme54ogz877fbzpsnvjwndkhf4l507tapwyxs39ygktq41cy71424f87uq3pkaw63coadtrmdmyh247yukuh4u8wthfaxg2clz9tj1a4tptnm4ody6msdeuwgu2phu4qlhsu6r9h6v5m0n5ch7bc9nssztwxcj1higpiowsg5',
                code: 'wpfet3tivwupc2rg3ukluxbkh6bdjyc14prqpjfdvzqbux0u9p',
                secret: '39r3fmhyrll8cqt6mw0aqxsrccx4csdjjwwv6wgnfp8zsyoay21hyo35ik7uf0wgxdo04s1tqx6cowcts7v7x5py9n',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2',
                name: 'v9wvt3kek3x2c616q57r4vfgaqguwkystlsi7natrdyya0s9k3nxlvkuioeqikoqkn67cpnxvyofnoeyyb89l4a9e45c4u9gxnsks4kv8e9k0cn5rt8g4e4f9ce5t3ck4pdpr0berwwr6qhovyxei1d53v545m76alnl6vcgokf0lkfju7hjozd5sq8hrqitejhmwrt16v762piw2vvruqtenwwhc1neoiz5hmy233aexr4h6mj5f213p0qjwdty',
                code: 'o6jshk9is6h8siv0q89s0ti1tjd56wwxiqnjysr1z30hvc3jfd',
                secret: 'g99ks6mpuu2sy9i986omgm9jf5rq5soo7qws2h6ty8f47qh0t54ricg33cjlbg5w8c0xceoqs8ntij3zbbnkp1ynrg',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2',
                name: 'uew8whwl5fj4k6fo58ix2nxu0fjfqf8fqunjvehygq6x80c4oyxg953focc45ppyr0yzj8zcpqh2u1n402adr1guazwnbztoi2t58o0b8ddlo1rz02e649rf04o8202qrqvyny18ko2ztb4awkas28e48row2f1mco8kceuew415967ghrg2w4739utrpjleg9lsh6ezez09x5o4hwme2z45rkb2ux7a06277wdss3nd1czss9oo1d43jgditob',
                code: '98hpf4vmeyo3fek5dsnl3o776nea40ssodzbe18qkp9wyymlniu',
                secret: '8hfbqg8053lt4yuzei4clux0qkwmjpnl31lg88nc18dds9jpps8u9fk69z8onzih1ucrswy7hav8xe6wz71qlsh0hx',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2',
                name: 'a8vppfixqg86ionnwgu0xssm0jhfyx4ezehdplj2iltbbyncyfhdikgu23541scant10i3twxxww9lluv3edjsedyfv2fqrigh3ftu7sau04fr3g2uep80ewi24u3zeuw3zn8i70efhkuiu2ephxq65mzxau8crqh8gukswov4qch173vv4eee3ffyreeezg1rhrtmb7vky7zue42fc1um4j8yy8dwntz6b47uxmr31g8c1i1eruag97f1nhsn2',
                code: 'kyxcvk6zslrbllxkrxhl0ob7pl5475427yolakfavfj9zrbpze',
                secret: '5xf4ti4duygjk1s83tjsd1ryy1iejl986h17svogjh4woi650lj7lzukucft1iwkc4ylh8jr8vnb1o6lgu6m1nr28rx',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret is too large, has a maximum length of 90');
            });
    });
    

    

    

    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2',
                name: '5t4s4a8k3r8cf3vda8f3wvrm57z9xgmr2ae3tp36hw8g9bqahtlvwf9nk7o29ytd0l2d374s184qw67xhnq0rcul753fmc78yid9h7zw53i91anbesr168q16b6eygl5vvdoz14qkfgrvymr1pbk52atv4a9fdpkskwkzaibxr4b0i1zxj1r4xo4fp8faz77unzclmtv05ekosle906j6m6ebho0lehi98ee21rompgcgreq0y6t55btx0vfalv',
                code: 'sd4m9gcwquw4zzqdsno8xpok04zb5lwvsmmojlp5m7y2evxyrt',
                secret: 'p12t4opphtnf69iloe3o8lnb5aiz118m2762pn5u5zcjl3d1j2cwlwyx74ur2lh0riapc1gl8jklx7z8857ntb2i48',
                isMaster: 'true',
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2',
                name: '8bbdldbilv1e1y0o48gjm0ephr82o4eluvlxns8p416f55i0s80o8994z9ifche7xp2gzaf9u9yaxmhninr76juzb3ekhqflcr8tgkk0tekarlyz18uglftjbdis35ak4sgk5hkv28bcev8zpj2iibj2ljqhuz8m52isu99pj51jo75vrim8gyw83dv3ogss2bntuj6ui4nx22jbuw2yclspjgq4mwwkvpy4h5erl1i3b2b09lpqsyu8qu297uc',
                code: '5wd16fm6l4cmnj7fy2no22752t53a8wu4hga8dc852pmn2srez',
                secret: '2y9i2iigt9zlw1tr200ud7km8icfsf4z0cdsk2nv6yaxwg7a1cvtrzv5a7ykqu10cl90c00mq4426gulcbjqv0p4k3',
                isMaster: true,
                clientIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/applications/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications/paginate')
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

    test(`/REST:GET o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '17dd3514-558f-4865-8c1e-e73e8bbfa2f2'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/d840301a-c234-47f0-a7b3-34d04433a8c8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/ba8dd7d8-5b3d-4fac-87d8-603de83863c2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2'));
    });

    test(`/REST:GET o-auth/applications`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: '5420cdf3-81c8-4282-b6e2-2a3bb269cf2e',
                name: 'l5tqm1b8wkhqnxz6ce5qm662do26cww1zqap4vfo4jmlymonjhgquu8rvfg6t8ww9ck6r5vb1d6hdoh8vcg5yvn4ihlglf2h8h8b8rxeezvfyk0m3uryq3ejxq1uzs15py0f6s88uwjbn0xybdhxe7zxkx52jvkxce8h9ta50kjfvy709vaee3082tq9ky1hmfrbmo72ska2oby5gy643air66bfz0u49258ncb4eg9nmkf7csqytx7nqyob056',
                code: 'k4fk0mhpfzzfvrd4wpvvg1l5ndiagn72r8ynjv2jqjap67apwl',
                secret: '17e176xhks9qw8m3cfcojhfek842i2yh43kvs8zgyqr2m12me0itpq5i62smf8allfsf98u0pvys6hb09a7co5gijw',
                isMaster: false,
                clientIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2',
                name: 'jv2z01iwo2oxqqkbyquc5cfnoyk064y3s44xwin7z0jo2mn9y1jt9rxtckmkqhu5dwjgrr9bojmrhrgy9d367u11ca37szc811qpbblg0mul2e7g0cj0m1hxf15homvar5gtg8inrzk56lb19u8tqysq0is49lqsiehtegn8zmgkb8iihpd5ear2u055cb5tfh14au82rt4jar6udkfwfjiho29se0dmywx0k62w97nk8px5l2s2nwyrdlgak5o',
                code: 'i2uczjqh3j3ijzdjiolzof4rb2ztnse0rv4av2wqlj0n09huah',
                secret: 'sqvpiwsp3dnum1bob3i9n77o3bp43bypajdnpg0gftpwdvatfr9ocen08vbk9kit5g55wuuqtkmimk75po535qnxsb',
                isMaster: false,
                clientIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/aa241562-e43c-4dd3-87da-7ca36c1cfaa1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/ba8dd7d8-5b3d-4fac-87d8-603de83863c2')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateApplication - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
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

    test(`/GraphQL oAuthCreateApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '36da5480-b006-4977-9d9e-c36a3100c3a7',
                        name: 'iwsg0d8x2gbna8k9gg00t9i4g2osfe6di6dgoncd2tickblc2m0904ioity0nus3dulbkalg7m7xgro875vnhphunx3rmz3lo8ys1s5q83qwgdywrtbit4pruqvemg5iv7gyx47bta03g32xar6jpbtt73zcnqkcx7pqg7k6me7jef3tt1bp023a45d29p5ybdu2c3qj29cbk1jnguamkf9ef8fk6p5vrxjl5oslocml297bv9hi8af7fc76fqd',
                        code: '4jso44g8ttccn0oa54txfb7j4lao9cz4y75l6u8sc3ue6wco29',
                        secret: '0jo67739kh527s1nqzllcytdatslazw7sdoi8wadhd14hy9ifir4700lm1zchmb7w1k60tyq35wowplld48sbf1syf',
                        isMaster: true,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', '36da5480-b006-4977-9d9e-c36a3100c3a7');
            });
    });

    test(`/GraphQL oAuthPaginateApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateApplications (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateApplications.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
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
                            id: '8036fce6-9e4b-4b01-b446-1fa6c6543d61'
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

    test(`/GraphQL oAuthFindApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
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
                            id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('ba8dd7d8-5b3d-4fac-87d8-603de83863c2');
            });
    });

    test(`/GraphQL oAuthFindApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '621b3cd9-c1f3-4bcf-bb98-d3002cc0364f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindApplicationById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('ba8dd7d8-5b3d-4fac-87d8-603de83863c2');
            });
    });

    test(`/GraphQL oAuthGetApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetApplications (query:$query)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetApplications.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'eeae6c52-483e-40b2-858d-218281cf30b5',
                        name: 'fmvzbb2kcl8pnugcb8qo7ajq0yrgtverngfskb65xmo6fcwezxh20uvjflibvfmduincpo1sd5k72zkqj63mq52ozrlmr4vhqslx1la7wdyp6a93ml2exntq3l1psew8zw880edbgtbez1a7tk2ghyt5tz8j52ub756e5cgezfigia7g6r1khcvw4unieu0xwolyfotnodrldxoz42bi8s8bdhrtgxrugzprg2mdsn5z70o3qtpopeq18ner0lt',
                        code: 'khnqlfihfjufn5eq6jekv2ke2my5fg8ksa8tqmbym1vziltqdw',
                        secret: 'vq3jp49xryol1nob4x2eqr5g7kst91jzari6ceh3k0wd0cunv3lexgcib7ipboqaouwr53iihw25xz5n58iloq4foc',
                        isMaster: false,
                        clientIds: [],
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

    test(`/GraphQL oAuthUpdateApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2',
                        name: 'cf832h5884tqeemcaooq7e1dm95iw34qqzgz1prh6ozvboo1u9anaof8z0mk7col6e6kg9p8pgqi05ujkupml3jqs5bl27ad8jh8mq8jsvsm6i6ytsgvxx23gt4pspuahlpc92h5ajho96jdhxx54wq4cgsoobf0c8bc43zwk2qlkk99s237zkms5xjeftq994lyzo1n7g5os59fajj9emirlg7asy4ganxl24t0j0u4a8iuxln5aifedtx9s0i',
                        code: 'kjfq53g189xz49a991nkdg3aq2yn6mgeipigcgtpoa5x88vwzn',
                        secret: 'f57uqubzgymm0m8k60q7ldxsgakltodwuy908ce8lid3sjkcna9tpxvdayqperhgedsfr12s9djmnvuprid3h00e7h',
                        isMaster: true,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('ba8dd7d8-5b3d-4fac-87d8-603de83863c2');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '155f378c-e5ee-49ee-9d21-f6e2cb6640b5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ba8dd7d8-5b3d-4fac-87d8-603de83863c2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('ba8dd7d8-5b3d-4fac-87d8-603de83863c2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});