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
                name: 'v9thx06c6f836y5do5t741c0r7d6svvr848ol1higz9os84nbgti0aoiickf22dtxrkknwtzx2lubu5tr1ou36dr5w2g51c1kmf1hbb8w8rku3meez1glq1mdqms4f1bkt31iq5key8un9labopmn0ilnl9g5kfdb39fywqc0vyuscocpeyq3zbabnp8aeystgtnc0iek8ohqo32wn4jvtpfw1espcvqow69olk02y3wjqi6racqvl2hvyl910p',
                code: 'cq5d1siue1uyt8l5rbp5pmogtmg3cysqto61tfno21oy80sk1o',
                secret: 'xbvqa878y13hkku92adxs63q8yl7j7zng8dcr8ek17yice3yzmcuxik3v0j0mi9mwvweizmbf5j4ug623vakx9jfbj',
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
                
                name: '69p480h72jm641p744sn3y6mrnfxyq0d222p322jui7i7bhll6kbqv8u35wt9mzz6e6qfy2xa5hnpbpl7b9agxl6zys71jgq8dbawb5kjrt1gu8gci7tax1hdi7kbzufeffk2xtiurebyugc2ec38nylnzpp0owi4kxg2hdajst99hgny3u40lagi4wudy5lrtpevxp6esujwuy5wis40twvx0ielyccacvsy45un3m7u458gvnfy378dmdomzp',
                code: 'rxt3v5q1ohtafhjd6lb7ogk3p3l7e059phloin1aqoyjfd9xlu',
                secret: 'wfk5qxdy3kc88fjm5n0biib4rcvvfbb30iapzda8glph1qiibyf9xnuoheg72yn1mmxnvahtwlnrkmom8tab25rs1v',
                isMaster: true,
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
                id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5',
                name: null,
                code: '4ymbpszzihphuu5h5h2ijv90dbgzfbwoyb3xggd45i9won22b8',
                secret: 'ddn0934fcn8te6qa5pj814pvpjby4xjxq67njdb3p2zbb4zkguikoklm04tpvm93p8il1jojb3903vxli69fzptfps',
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
                id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5',
                
                code: 'qyigqlgbmfit6b7hdd79wvlwen2a042tqguqn691gcsly34cge',
                secret: 'q4fc0vpvcxmypq2vonidm0c23bpe9m0uv2mxa8v1v7ikh64xmx6gbrqwvqzu9r2xx7jzyzkqbmegyj371c5hw58zya',
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
                id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5',
                name: '73sxlmq8yf2hk91er9b8c5l6z3hx438etuj4to0uy39lwyztc76mu59n2sifsagracq21j8zdmecozjvuumxfuqrun70y6ffe2on8bkr2ut02je6j3fv7wc9hrgw586ff9obxgbq9uhpicgzk96mynaercslh96b7500q6tz41dwfit7r4zgoign0yg3wuo6eel2467mpu56ylvz6fsivvxafj60chfoalfj8ejckhiof9dy5rgnl88bv498i9p',
                code: null,
                secret: '6ii7qtuplz9guhndgkc3nrj2zvc5hird7r6wz42wtf4jleo9ti02j0c9o1bro8l7jgd1q3ipeiquta32htu1r3kswu',
                isMaster: true,
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
                id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5',
                name: 'eb2c7svyd0179ag115p47xty8kqr5qxuwm6m8xk4rjz5l35piw3oc7yc5j87v6tr0cuqpbewoowb139f06s9s4jm6hlh3wltfp5mvzi0j7j1y7hgb2yleqtujqvee1xrrugrqzqg0xzl67wel2dj9de4wuzow6hsytwgevmqaav5plqi13n5aj8wlmd49xqbvh97ndo5owxpoxmol0cm9h0whcbp8zb9874eo60x92uizxc9xvcmkno3j4a51fk',
                
                secret: 'mmtim541stza3l6wpub8j44edt2r1grfym6fvgr923nbfz62xtsgc4orqt4cgf8u8vv4qkgplmrowrdy2xppumdojm',
                isMaster: false,
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
                id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5',
                name: '563hlo0fmtpl9wj2bis10y52wr5taiooctyzd1ojtr9f6kc60x1u1uoyxearncyrmy38g1xxa45ytsnc8jnxgwwc675bzufhz8slxdgp2kj9htlgzu0dit4l4bdh5sfn09m78qolf59zfzr4e6x0a281e1akh45q2odgyxbbcdc6e0nrqdwg445ri26ik59p487vp9plbfs7z8hm054qkgng4qi5nulddc1q98oc2z3fby7ct9xmfra7ptbmise',
                code: 'oj1kbjn24jid8tp62lz94x0zkj1rfdirr3gbl002ljq2ajy6gk',
                secret: null,
                isMaster: false,
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
                id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5',
                name: 'gj4h8xwcocabi2syzeiewb2pbeewrqx1903bh41c8mwt7ocz186jw51wabnoemyd68g2tr9pp7en10boa4vn431sswjkb2irgqw0pa3sj38rbiyf92vxghxdop9jsrqtnq8w7ujm7mxubijg9siy6cw03d6k7l63hh64owulakzjhy3ej1omzb2poh4mjana4s3u9muz7g1j2xf10plla1t7vjrmpmln5ttrw2kktwrsscpqlei209ry8pohd75',
                code: 'nt7to3jco6o92g62kb9y48ykzswkemw6erzs42ok1heug7dpon',
                
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
                id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5',
                name: '0ol76vuvu9r5ibj2yqbyzu30d51f2pkczw6yq9s760466s1xmgb6wiak3tim2pa28lo8fn44jl0jcttjm62xkv0mav18n04cgpn7vu335amqu7en7ql69qbl2k178n67tdio2opo7ujkvzguj50hmkriz5nvz77gn54jz3j8ava6jlsnjbx7tgv2h0il59ktozbjr320stoh7q9b51w0dw6vc5cwxxabun9hjsyp39cft2b5bauc6fb960dvtzn',
                code: 'pi5p8x6kltcdmtuca7st97z7gqi15zelolkmhir08qh8utrhv1',
                secret: 'oziwqrm9gw46aaqz7oaf219wjohk79o0yab065bf9buynqdp80i9cajfvumycsag4lf6d1thykzb64gop1h30fdbe1',
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
                id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5',
                name: 'xezol80vfc8tsocajn9os63c02tbgyn75jttlkutxoz61dk59c1h2f7q2dpuf05leiuuelpwgjh3lteu0vu3zril084idgw4yyk9ptexe0wc6u5c59rhl7p7ry5gfta2yns1i7d0zuv87wb1ok0letpoydtbccx2r68gmco6y3j50ljwa1q1gxsjk65f8hq0w8tzisevjzledr13hwsaze7mlsaz4aejenucorlyvbqsej1wm9n128lizk1xi53',
                code: '8ld1fhpidlto2i8kas1waxitbsyjaztzxj2l5k6y41k6886ph0',
                secret: '2wsq6x8iq3s943lya9g9ic0c3hjhx9oc1obmile15i3mj2x6ai06jhxx4c5s9g3ds4v8ofe67if5oapv42q91wg8ap',
                
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
                id: '2f7rs1m2opoqtkyd9hzgh6y9t6yot052icmce',
                name: 'x315l8epfefo9tyfj9ni9e64it3ujiuhvg126cqf785dxtp41jpcpmfn0uq3phfg5ce4nlktg9gzknz8py6ugxp2bgle36hba2fqqs0v1cb3s5hzro2zcd8txforvh0y0rjf0bq9qsg0krcoj6jqw9ge018alr59ld5318ckj4sn6i89ajy6h4hok5jyqpvn4pyxvp123s1zrysma644w7ka15ego2qxjsua1657wr19488c486oe7vqjctoem3',
                code: 'jlkgpgk5b7oq5vnr5w9ujd8tqnr6wksuihnu3jpwh7upk0w5vp',
                secret: 'gfu56oooekq46n3rl9ybbdo1amx99o8sixhesnentltjp8cnvfk1b8btn6xhc37dpdjtilis4hfq25045z2sosncwj',
                isMaster: true,
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
                id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5',
                name: 'duhhbtkqxmx39ixqypmft1et941mh3hrkf3mwgqgltbv0mi6x1e9nx4rrkzwjldpkm4fm06s8gtv60tkwhhiko0n1i2p9bv79kmicd0krq5csth52d1py4z0levlegg4b8ru3tm81eclr6mtoqzzxdd6qflp8aa6g023f27pu05inb076ytdwdo1rg6sh9hjiqjmtykmjenyw6t6po7jzz8ii85sc7le161j9hfsuc7wwytk7upc0k3zc5y1ep34',
                code: 'tnag2hjiafy1wlpfxlp86ild3z3r948rk27oaifv4hmzl1rts4',
                secret: 'agzjixvmdpp6frqckn0n7gaztu7tqioqp0dyv9lc2tn5ahuts2rz7kdu0yqeo7mf3hnnt5wnd2eafh0kvr5u67ajsy',
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
                id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5',
                name: 'pnq3uq1un0mgv0qf7ahjgnjlh90fm24hm0slbvadqkakwp1i9i7yqlafvi7zm31prqdx0enmnrqlzh967n8fggtm2wbxhy00xd0s05gf6kt8pfqxq2tj9yoxrbtd306ymaqsi7sn7ppsoxm1a1ee6vgj1j3c1o6tgrc0fnhsemw5r0srv7d0fpmix0i6xhjba5aqvjxzwgzl4va6hnk1q5m6plk2x7v796v5mc7xe9gu7354bta883seowi3kuc',
                code: 'jnat3c5epie4izmvgi96wg3yukyj63g4jno1en2coww04pg4az1',
                secret: 'h2uc2nkbg605uas7v8v5q8g66wpzo5uhnybmu4g5mudd08mrr6813ivrharpqa7byqe8attrn8uli1h7rjjezdz59j',
                isMaster: false,
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
                id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5',
                name: 'e8jvp0rvk06uerb7jex0oapeymc7zwel6cp3byamo8y2ju3v3svq8j1nnqryha8jnyi340o01oli8fxlhfh3hvecic79ubfz0yepb4ul7btwnu9l5u5b4hd6jza1muxgw1cq1y04c14s1d34yac9cplztn4pu6pgpfczqs237n9ik9mwqpsg3jc1sds1xgau5fqm528a32pi5jg6tyu2f8vomvogtkd1a87p6xi18yv2clnlxqava01car0nilm',
                code: '38wwzkbl8zswa9zvn4fh34zsu79rzwz5uh0tdvoy807iw56umh',
                secret: 'sxyfto2bez5gzwtfevl8dqnbp5yx393g8m6t8kqj67qgys76rwvd4xedu2u3d3v5zj874622mrxy6il3uwo2rq8sgbk',
                isMaster: false,
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
                id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5',
                name: 'mcelqtktm6eiaxugjecvwcb9y5ru77m413b5b1ceeiubpm1otkxgospy9itb9vqvgznr39q2kqofoq5zn3htaq9j6rdurd8c3eksuprs994jronhb2h23h9j2wmzqlc6ff4cgud5fs604pkd5l2p1ci82r1caut5mzycd5c330ukcqod7uwi99hsy3rfunjl7op5g6ywhmik9q631i7qlr8yzuqksp47gbx96bvkwkaotfvgz7turmq7jobovzf',
                code: 'mab043o3gly14aji1s8cnsxo0po7cu52j1zy544f05m5cu9cuj',
                secret: 'jklb9q2e18gmbh0qtwhkkzdsts232rocv0zla7dbn2w9og6hk75vjgagnl2rmc30kegzyprevr108sdwflgvn0egxv',
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
                id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5',
                name: '7pv6k1pf4wabh5ke7g9zb4n8zjve8iptksz5dda7vba55pps9a5bwbyjph046yg3si0e3hyrpq8zn65pwu5lddvfazzl4e3i5oypi75jpqeg8jee5ci6mh91vkyy0ixfy48knjbpjfzcn6faxbovol9zb1a95hzkl9t3t162q1i2h04ibjtctcdxkgas1p7mx1tz4x5ufvw7e5tngkfnhl0ju0j0gejrvxxxmal6m7zz4y7x9y7r3hogfrcqd8f',
                code: '8xzckqwmiv9s0inh5pqcx3b4zmmmfp4dle15vu5v7vpi2uog4d',
                secret: 'svvxgso12byer2tesuio5s7lc408gi4cbfbm7t7k63zbg3n1cap2jekc82o2ypoy1i7m9awbo209dv1fx1dqgmp325',
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
                        id: '442bc474-2ceb-44eb-af87-6baa4a241d5f'
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
                        id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '22736ebc-e4fa-4ea9-b555-27bc84ba64a5'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/bd8fc4eb-ecb1-4760-a587-3095a3e2e067')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/22736ebc-e4fa-4ea9-b555-27bc84ba64a5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '22736ebc-e4fa-4ea9-b555-27bc84ba64a5'));
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
                
                id: '968b36f4-c589-4068-aebe-a940facdb5d8',
                name: 'fag4twtck129ex3mvdsvmtr9341uxplebxhcl053r3k9np1abstkadhh7ll361wmfzens6625t2fjuul2zk1mcsurjbv1frwchnr5huw21tfidqd1pxjx0kfkb4a5hsr7z7omezszgcoj663m3s8wyznv0kaovf21e3obeo59rqw8bf8z1el7zaa8xjd5mrt3mqg8d77328qey6vysd9jbgyzsauc0memnea55didxt5emuuw4xd7v9as1vfr0a',
                code: 'bgnfj9z1cgvl62ow6pvzwqm3wv65ledxm5s7b2yw6u6s6n47bv',
                secret: 'yopsgs6gfapfm42k77ufkx47vf41yvgf9g82ytmzwx10xxvjk5b4pvh3qhm0pt1oy5aieoz2z3rb4mlm2jp55yuioc',
                isMaster: true,
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
                
                id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5',
                name: 'jlse01v3lh4fwhpowk2s6bifj1nuloe2cqrckwm8ubhs3qp22h06esj0w3o40bmer7ab0jr39uibzhvanxnr2tdttppnyrw6je8dfhur5fup6guto2at1q95qxbx9g0bbywjpdjew8rutnijitm13blck8x5w21hy3quvp8ylgslj27361aqky4ldn21dhyucwwevyy9uabog5upuqqse0wtpqyub7h07kz7a7n34sv15nceljq1heodyrp9ibx',
                code: 'g66sya8h5oyu2m5ahq7azi5xdinxv5xd5u7ps5cg2kdlgije1n',
                secret: 'r4864pzcfx20f3ca7z5j1wehe6xod7pwqdlnpyt4gphbc79gq68zkd7oyxalvfcbe7xsam0ka9qyd7fwyrdsp6dk3o',
                isMaster: true,
                clientIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '22736ebc-e4fa-4ea9-b555-27bc84ba64a5'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/eeb54156-11f8-4415-a664-4495f481d75d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/22736ebc-e4fa-4ea9-b555-27bc84ba64a5')
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
                        id: 'b7d8c00b-0fda-4898-9355-210446c3786b',
                        name: 'ap0svb7m6v0hi7l1frzcl6vwwkynp88emqt6d9emd3996jfr4ut99tucddhtshq189kppotyzkunnw3m7ba16nwrbjuu6oy78ys7p01jlwolt7lg2atncjdzf0fu72xtpzvd8nulzzzo9y26gfnuiuuwohm8j3jp259q9h5wnwwrcsa3m73j6hlb7sxo8tg3kamvu49hzqtzwxvq5jzre7pztj0dcxmx403rsf2uh1j3z98kst2obj53u6z5jfc',
                        code: '3mxlsep6gjqo94ahdxprcn948scv5knabdgxylrgredi8v4qjq',
                        secret: 'o6xp2wzfyz52m8v50wbuvlxfrep11942oque5l9ge6supqe0ubj6qngjivvwrrulbxeb0kfwe38rqp62xo7x3h13ci',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', 'b7d8c00b-0fda-4898-9355-210446c3786b');
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
                            id: 'b3f25ea7-0917-4cac-8383-52bb61665f39'
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
                            id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('22736ebc-e4fa-4ea9-b555-27bc84ba64a5');
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
                    id: '4db0da9d-87ae-4143-b700-2329286c5598'
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
                    id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('22736ebc-e4fa-4ea9-b555-27bc84ba64a5');
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
                        
                        id: 'ea7d732f-cc27-4ce6-b5a1-a5fa9b2fbe40',
                        name: 'x3i5hen7dfu6xrcxgtzckmivqmka5ylwkr30jng83k6ijl06auftc84kla70t218fag615uupcfdt1vtp2ywfj2tvk680xpzmh9de3jo4wlxqfdfu6m2b1f9vi93wel6f20c7dgvcedsozf1gm0xpqkllda3m7d1zjgwyxx7ssbwuf63y06u061mzvfml6kwnpnaxg02mq5b5emdmh5ymu4kbw2jf6quoywhi7aie8v0gnefqnqwz6tzhv8xmw5',
                        code: '4vkquq725mcvrji8r3lt4ojexb6v67ay1uuv2bucr1oc0oxcfr',
                        secret: 'i9xd4vzff0ycpqit1j1gfia3opiwg76aq9y5byly6lx0iugqhh1qykgutvj3xpjhcsfpal5xkvlmn2qheurnbe2rfs',
                        isMaster: true,
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
                        
                        id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5',
                        name: '4e648vs2dimi70uzleiog6mchiersy5qsbbvzduyoxkqbfntfvtcj3cu2e28225668z0ghgrc3z110zytgdas6h1mm4a6snrurf2cqs5q0q4umqbyq3q0oxa0g2q1ghkzdcmco5xmw8b6vavlt5w1g9zaqcypru1kxl64dsdzv66hge0mq0tjfy8fx9rzxjxp5jkb84x00i4qrt42t52ajpxz7xwbj9g688rujwum58357u4u3qcyvyezfe79v9',
                        code: '9thoe8gmtnd5uua866iuld7mr7xsyg6axpnagrud2x2htf6m3h',
                        secret: 'h66rr50ynh1ez4a3moqwgxsp4b2nceaahdq1duwxdcy2evwyhdl20gtsg3dc4j1fn7jwqmtueazqtr3ofb80ad2uav',
                        isMaster: true,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('22736ebc-e4fa-4ea9-b555-27bc84ba64a5');
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
                    id: '1c48bf5e-f984-4460-a575-af2d2bb689a9'
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
                    id: '22736ebc-e4fa-4ea9-b555-27bc84ba64a5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('22736ebc-e4fa-4ea9-b555-27bc84ba64a5');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});