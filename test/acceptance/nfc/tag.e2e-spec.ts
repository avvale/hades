import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITagRepository } from '@hades/nfc/tag/domain/tag.repository';
import { MockTagRepository } from '@hades/nfc/tag/infrastructure/mock/mock-tag.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { NfcModule } from './../../../src/apps/nfc/nfc.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('tag', () => 
{
    let app: INestApplication;
    let repository: MockTagRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    AdminModule,
                    NfcModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(ITagRepository)
            .useClass(MockTagRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockTagRepository>module.get<ITagRepository>(ITagRepository);

        await app.init();
    });

    it(`/REST:POST nfc/tag - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST nfc/tag - Got 400 Conflict, TagId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: null,
                code: 9093009496,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: '8d8mj3fgzm5cqlsdr103hcpwkdpsivmyvnvt69yqi0fv3oc9jh',
                urlBase: 'zoa8f7zziqugfgg8hk2ckm7w2n56rw8dgk3vdyebn1jk8ux00incma1cg70oopt4b9tksvrbnfjn6axmdq7glmdci9ujntxyefrs5u9busy7zjotmwuhx7gkzok6ezc62qu8pjli51cnj1i2nc7cjgmsvx5knixdfkiisiha9963t0angjmutaka7u29vtub6tpf0svo18bo3jyrcz9zc317m74hbpeycrz5tlcesejcu55zjdk5n8dkuxi7ems',
                params: { "foo" : "bar" },
                offset: 249914,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagId must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/tag - Got 400 Conflict, TagId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                
                code: 3310171122,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: 'alhhk4cbv77lp4dbfbf94b9mx0xogr1xar4dxuklw4dbksla6r',
                urlBase: 'qnebzs2es3do6g2ctdo39j9eyrauhi5ib58mez04vyww08cyvvskg83zjb501mhk5gwce5easgsb9pgvih0c65rtl6uwnnq45sd2bnjbm2ek617z8zyvo4ewpb1zf8r0988z9sfnjxjzc64r5p0dwdgn7i8v3ayivqkfohxuyudp8ia7sxzknchgu0sgjsseuef4z0xvx4stny9gfqo8l1tgtpdvrc8qj7qtj2eb6mcpxdpksvdnx27kiu9abw0',
                params: { "foo" : "bar" },
                offset: 493737,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST nfc/tag - Got 400 Conflict, TagCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: null,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: 'o6fwbilcjs6mdbwgnt8wfe614k5455lu53cn0sr0m2zsdv9ulq',
                urlBase: 'nkjwddifdj41gqwtm1mr31xun8havrji3qv81xc4c6wbb40dpk3f98cy9xt5mqd4hpp7d881kzdisgneszqthevmp2gms5rgko7cfwez4jlbqdma13stv8jc1qwfqejj02353uusrakwz3pn27m8j2je584lmn8ijqk15w4wr6w528vrqgc17ytlv4jb027qb99kwhazi50v9xsfe08elm7j68r94g9puteajfrkjpup78elac6alfh8ayg83jd',
                params: { "foo" : "bar" },
                offset: 391359,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagCode must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/tag - Got 400 Conflict, TagCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: 'uuwxje1js949dtns7vpbpiyk3lnmrh3ml4r6zuvhibohk0zx3f',
                urlBase: '51m5vdqta4team53cl7mmy7en2yzdoyzubzpeo32rrmgoenuwaxfuu6v3rxzwcgg6qs162r8tr64i4etxcq6ad0wqj3acu69110n813scvm2qnuyelfd9vtp76ifl5cq964doqg94kwxkdjyu9qspo7slyo9c7798licuc3nye053zyofsbdklgohauyq8iw16w1b3foravbibglyoonhnk2b0sxl3f4mzt85kj33414qhsffitano6q3837e8p',
                params: { "foo" : "bar" },
                offset: 266488,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagCode must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: 1430379151,
                tenantId: null,
                tenantCode: 'fwux858mae27vjfk0gszzqtfb5qip4m1sz4tb3gjms23u2wyko',
                urlBase: 'zxvon62ganxkd6mppkgxiyv3ru6utfku2w3wc5n24qxl0ic8gqhu7yqlgza1kx1nxu9yuhl5lbtzk4xk4ekpoi0ielbkgut3rrue2aewetrqf6w3y9kfokrp76o9j0a8og5cvicun260eo0ruq87h0fb495yqil0iqvmxs5awnvxt0cu11qwh6q8gj733ru4dk59law4up3j22ubmigvhtl75ugt4z87ngfbmakwwwm0gmqnidl1a4vs8ftnqsp',
                params: { "foo" : "bar" },
                offset: 321319,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: 5880346592,
                
                tenantCode: 'fdf6nsdxoywsuxopz4s4lxyywhdlpm5jtsc48o403s8vu0mwe7',
                urlBase: 'stkfvqq7amchgm7w1l8wimnjyx3s9g7x2htzt00jbnd5xixq03m3nkajisargzrv5r665mol8856rrtpps0tc7bdf2uo3idikdqt39u2psdsbuk1nsnbynl30eshx01ctbwg7n99mgxvcha7ejhx1ukuexfqtuvsvppyzgkq6akxbnv87yy0xqb3jiusu2q2jll02s6ku6xbpmnfz7ymw3txrwcz7mtz3sw48lsd3qayjbnednjop5b4epqu9hr',
                params: { "foo" : "bar" },
                offset: 273129,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: 1344090612,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: null,
                urlBase: '8w1wwhuja5jvwd379skt5tk1rw0dadgolma26t9c6pj5wayjysnruwkm6nvfooaqjpmrcpx35xtqsb1tr6kewgxowbwsrnjccfr8ptlpef7brjgj86xiofdlig9xmjew481coivp580tbz9epbz95phgs5s69tgaqkmwn3hvg649e3nwl6r0ldiyxvbqbrc2b7db8c19ku84wlsixtp9xsr36v74pf6vzdwsksngtlhrios0bfbsht2hzm1oo2j',
                params: { "foo" : "bar" },
                offset: 973908,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantCode must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: 3306328203,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                
                urlBase: 'wr0ztm46sdfj8k7fbyo2lo292zq7yl7aert5hzqbdfhmfuksqvfclxz7812sm7h59uh3onl7qixvp74scxc1h5us8sl66f2d3w4qiegvj060f8hpphhkypc1ohq16lktubgaqcwh8r6zxkxx7j7iope7sbezq1fisxnxrhkdd3udcqx8xjgvjgzudabpcm7xqd5w45r1j06ioyenskwwcgwr5f5qqcce9cgl3rzjjmxanj0alahle1bxygat9vo',
                params: { "foo" : "bar" },
                offset: 744994,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantCode must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST nfc/tag - Got 400 Conflict, TagUrlBase property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: 3040270352,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: '2cv1srnyuc9p2js56cng95fdxthcmm32of5afs30v9a6buzz2o',
                urlBase: null,
                params: { "foo" : "bar" },
                offset: 814567,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagUrlBase must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/tag - Got 400 Conflict, TagUrlBase property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: 1527946703,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: '3ajuzrtybzeu43b6xa0u8inn8x6w6shzsazrsuj58ezx9yuoex',
                
                params: { "foo" : "bar" },
                offset: 576099,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagUrlBase must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST nfc/tag - Got 400 Conflict, TagId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'ab0drujth6ahdthmhe7ecli6lvdkd32egb2zk',
                code: 6779376333,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: 'kqopd4k836y975setfnu6rn78jkd74skkgtaja9ustj9ttatjd',
                urlBase: 'hgl8awypj5oep0w7kwpi601ym4etf3bevwbru9do21yvi9twt5kgqyigvwjdyq7ou8r6rk3yxshbmpdhney6jj594knhdkda5qvipebcrnr944ibm7zpohg3jhq2w4nz8802a1r3p8gatxrz98vuhsyj8jpvedfbv3pyd90n8d4bxftuz9nvp1p3dbam94k86dn5fyphngd1mvq4byomyfmj4825p2vv4diogenm184hbg0xxisq1x1aiaiu41a',
                params: { "foo" : "bar" },
                offset: 668403,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: 3495929880,
                tenantId: 'y1ecm8d70rvyvrn02rj6d7dz87s4yd1b4tknn',
                tenantCode: 'b8nepvu59qk7mb84wctwchjlsvxe6zsfc9gvcxa42i44o14q8a',
                urlBase: 'jihfqjdtk0pf7lg964psy4pwnc7td37dma6n9qmt0t73je7ocgtzfxx0ibw01ihwyv959y40f474kmce3uu10uhdh32pg5t06jgwnlh4jhz1xuyc2gzn3vkkiacvrl912knytnd28r3vxb5vx2jgima41oyy5z8l5the3y76x52k7gakm6sowsrpibunu1fedwo9fuabx7jpz92zx5hf1bwn2ldldak13flz26ygtwzzmm3gnxx61kb6125cs5u',
                params: { "foo" : "bar" },
                offset: 792450,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST nfc/tag - Got 400 Conflict, TagCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: 58044865576,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: '2hxwrqenvv0spcjtdha3oc8h957rne115amsmuf14welyynvfr',
                urlBase: 'xzg7msy0dxbekyh8snhbzz2tozp8cjv5ag1klzrel88q7k1zad2wg7vnfpgxv4f3531qdxc08rc40pixfqgeu0b7br87hbqlin3ej9tsi2khwekx62gnr5rw5fusxpo705e9y75b9kiwoz5kdx9fcis8pj0ft31opvp2hu1w9muhai9mdg9kiax7k4ll1zqj6mcexofiz3wgdr43fa6b5arauzucjp2bcm3syj7ed10rtyijjrop3cby8ht9z3n',
                params: { "foo" : "bar" },
                offset: 170232,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagCode is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: 9721919714,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: 'rmjs4c51g2t75qcl2860fetnjmpf6k571ctkl6t42tmulrd3exz',
                urlBase: 'z9suinqisceo0q0p6s7it2z0swa4cyds92zclhlfabdvp3h6uucuwb6c9z1r8gub1wikcol45s26c6mhbnpovja42264i1i74nfo1r9pp2ehq97tw3dbezzjqeqmiknx3mou9txdueex24v42atobjfl0hc1apsuxk853s9109rg4my6wtdfjwdmpz32n59qxaler6xtdjc7sny32i3tv4s4j7ifm5s7qp9c0pq0mpzdhpg727b9l7q65y45aab',
                params: { "foo" : "bar" },
                offset: 788455,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantCode is too large, has a maximum length of 50');
            });
    });
    
    it(`/REST:POST nfc/tag - Got 400 Conflict, TagUrlBase is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: 3300012983,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: 'q02sdlmh51i640hu40udp8xetamgo1jcg36m9gpy5uvqa25sld',
                urlBase: 'gxnlsa0zjhgf9xy6xlylgdytil3zwhnxflms379ttsb7u21pir7d4i1mxxl4u8kyzojpk1rn2mucslayhe0okapnh9ki2l9b7fyrxtew2w59xgxcp6rehrpip5myjv9pezqpjvculxhjy2kfd9sy5sigtob1adsoqz2ghoojsfrenrns3im13you9wgvgcpewwmhycfovxq4a97l5gch7nyp61pilis83hhyf302ll5bqjnldhiy46ulnsatdo8t',
                params: { "foo" : "bar" },
                offset: 908307,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagUrlBase is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST nfc/tag - Got 400 Conflict, TagOffset is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: 3505158425,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: 'ud8gbdam1d7169mi67scdga6h7jzuikhqothu6nfzfvhv64f4d',
                urlBase: 'muly9k5mq857ckux1siq4i1lk1z7lipmehfjw3n7zjbul7uf0fokzfidmq3k6dv6yo98hwzg0sy6uxn1m6099mku1o6s3j5tl5t6n15nty0ht1lkfrwuldhpuichx32j61owdefebavtq9v1z2zwmveyp2layc47hgo1kdci6w8jlhi8gy9hffar9erasr6avyx5flf1ahdm65ced5nkohswavig2k6nel0kb6t4mfce3a1tkuz2v742s3o8np5',
                params: { "foo" : "bar" },
                offset: 3263724,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagOffset is too large, has a maximum length of 6');
            });
    });
    

    

    
    it(`/REST:POST nfc/tag - Got 400 Conflict, TagCode has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: 100.10,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: 'sgh11yn9s4dgg76tdjlwfpjp27o1pvpf72zx7toc5qexnhvuau',
                urlBase: 'pzo6vgup1ih7mrcrmvwg253xw9w8zwseo5dx0k2ngsk8u5vfxbw1eyy04xp1vyfhzp7g3orfq6or15yp72v5zfvgltog9vez3wi3j2wpdo48vysoux4nssvmy8mei4313x96bjm0rj6b5p0e6pik9okxi1mlp6ycnih4pfw0oa98cprr81q3n95b12n9jceg626bwuxjsnnsixfrr41809qu6xvoo3y7v8zfhjdk9afg2aubkvxb1vo38dyiwgg',
                params: { "foo" : "bar" },
                offset: 449968,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagCode has to be a integer value');
            });
    });
    

    
    it(`/REST:POST nfc/tag - Got 400 Conflict, TagIsSessionRequired has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: 1945339441,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: 'iye0bv0kl71z164gvimq2dgjazrqb05unc4dmozp3hiczgt6mb',
                urlBase: 'fzoy0go52vwmo26ote6qyqwri0z4rfay94mxi1y0s0l153cllc0hhknnsay9fhlearu6oer9wlxz9ybzxlzy6l6ho9jorow6achbx8kj4yevhkk6epeqbbfhlrfve57icpmpwzqoj03c64x3w8fqd1upe9szzojsn4p134l2i06xpjmqxomcyc53r4zlc3d94i9j805te0rkavaepd61u2waebijqtoxhmiunvp3l1ukum5b7b7w4tosex7luyo',
                params: { "foo" : "bar" },
                offset: 697531,
                isSessionRequired: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagIsSessionRequired has to be a boolean value');
            });
    });
    

    

    

    it(`/REST:POST nfc/tag`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: 1582599013,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: 'pm08ixw9wafyoy6a7twpbi95xukcj6qovadgoysp98sccg1o4t',
                urlBase: 'fy9kscktz3nkaee1hwcz2ae9iijnm5gnkex10k1nczvcrwz9psllq30ou6yudyh8sqwpmali8udnzdjdhd5gbe79m2alksxul81immom1fxxc6etc65fqxoahjspuyyleqmxr5etda0dwhlt9nvrhz3thpew90tnjy6t6l86l0950j9s1hd6tmpkncw2airkzjujzcv1act4yb525cbxk5cjb37l9glbzvazc21ly0zy286criginjqichnq6xs',
                params: { "foo" : "bar" },
                offset: 464978,
                isSessionRequired: false,
            })
            .expect(201);
    });

    it(`/REST:GET nfc/tags/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tags/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    it(`/REST:GET nfc/tag - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    it(`/REST:GET nfc/tag`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'b91fa74f-012c-4830-9dd1-a930fa42296d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b91fa74f-012c-4830-9dd1-a930fa42296d'));
    });

    it(`/REST:GET nfc/tag/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tag/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET nfc/tag/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tag/b91fa74f-012c-4830-9dd1-a930fa42296d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b91fa74f-012c-4830-9dd1-a930fa42296d'));
    });

    it(`/REST:GET nfc/tags`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tags')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT nfc/tag - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                
                id: '94f005bd-90bd-47fd-a69a-ea281fdb56b5',
                code: 8679878603,
                tenantId: 'd4f07e24-6796-464f-9335-3fc42807ec9f',
                tenantCode: '3dzf2deabfzsc8k3fk61v571wwwlms48kcqz3abpdlg7mb484t',
                urlBase: 't5ungkzn28avhfxa3qml3w3ahsdpld8lw2ns71s13s3l5uekce9ftadb80t6j6wfj7uep9ng413xnnfb5q40871jrp22st2ur0t28fb9tiunuvso3qbn6tahtfo0jrafp20o76060rmrnxe4pok1euayhsvi5cfzmb7zr6d5ep8t1ggh9w6387uwkqgevpn42hqcp977cv2hwl3q7how54dr1ok1bnmsv4h4n31meq36fcb46eyl6qwxdm5bn58',
                params: { "foo" : "bar" },
                offset: 973296,
                isSessionRequired: true,
            })
            .expect(404);
    });

    it(`/REST:PUT nfc/tag`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                code: 2290385035,
                tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                tenantCode: 'zxumvi8hjz74u71vd63m4iqfanmpfidqthb8gz8el9d4zh5c8z',
                urlBase: '7c6z7fj7zbfyvs41iqms1vhdjt3anyvs7monszegdxbhsqpsp8shopntk826gos6jr6r54x5ndbkz0ytm3xe3ggc8ckscx6lj3ani7q1d44cteqjrbcnw34ishabulfkc2jjcwdd82hi3g3z2gohl8y8bkbndmrdq32v2ehr94lmi93mlnaw3pzvtaalaq7xhhyc52l2uzqpgsq8ucnga4c18o37bahixtxdeio3xep75w39vr7psl0nhgyfngf',
                params: { "foo" : "bar" },
                offset: 636849,
                isSessionRequired: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b91fa74f-012c-4830-9dd1-a930fa42296d'));
    });

    it(`/REST:DELETE nfc/tag/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/tag/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE nfc/tag/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/tag/b91fa74f-012c-4830-9dd1-a930fa42296d')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL nfcCreateTag - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcCreateTagInput!)
                    {
                        nfcCreateTag (payload:$payload)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
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

    it(`/GraphQL nfcCreateTag`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcCreateTagInput!)
                    {
                        nfcCreateTag (payload:$payload)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '807f2cae-07d7-425f-a1eb-9e7f163b2675',
                        code: 4996506241,
                        tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                        tenantCode: 'euygjsu6xstpvcg3l2wqdgegockkvgov747e7uenecax1jckbo',
                        urlBase: '57by32qm7cimm5cgdyr4wrhynbrqccwam2zie4z9d3j5f3xj9ak7fzsj99amdrlr80d7q8y3a1zwhohtt14vfs4kt1qzdbfo0xak6dzrehsic3ythz3xpxdjxux6ipmx9amo36p0st736hz95eoj51n5ivey7z0cl2bgyc6m46ydbbcl1ds1p7s4sieatvf9wim9e54ibj7wjentidijo19dk4cmtwhd2eff1afsuk2qu57z398rcj5dty52yxq',
                        params: { "foo" : "bar" },
                        offset: 418414,
                        isSessionRequired: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateTag).toHaveProperty('id', '807f2cae-07d7-425f-a1eb-9e7f163b2675');
            });
    });

    it(`/GraphQL nfcPaginateTags`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        nfcPaginateTags (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcPaginateTags.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.nfcPaginateTags.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.nfcPaginateTags.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL nfcFindTag - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcFindTag (query:$query)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '00000000-0000-0000-0000-000000000000'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL nfcFindTag`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcFindTag (query:$query)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : 'b91fa74f-012c-4830-9dd1-a930fa42296d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindTag.id).toStrictEqual('b91fa74f-012c-4830-9dd1-a930fa42296d');
            });
    });

    it(`/GraphQL nfcFindTagById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        nfcFindTagById (id:$id)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL nfcFindTagById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        nfcFindTagById (id:$id)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b91fa74f-012c-4830-9dd1-a930fa42296d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindTagById.id).toStrictEqual('b91fa74f-012c-4830-9dd1-a930fa42296d');
            });
    });

    it(`/GraphQL nfcGetTags`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcGetTags (query:$query)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.nfcGetTags.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL nfcUpdateTag - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcUpdateTagInput!)
                    {
                        nfcUpdateTag (payload:$payload)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f705ec1c-f5d3-4480-bbf3-55afa34c4ff4',
                        code: 9312429428,
                        tenantId: 'bfd86930-3d83-488b-8a0c-9cf0c0e53649',
                        tenantCode: 'syyqzfe55df3v0szkqtu3x9td8bgkzy28fd6ggnrorkh8vlqhl',
                        urlBase: '5uqkoh79tbs0ajodi0wf49w4ddnthi9lqfn4hq0gkvrvczrfqxit6q5uxp9yuyin16qiau5a4iw0mgoez1wf0t2a9h8aq26lxz5uk0lyxm4vcw9b33bdz86itcnhwfeeu9iyi0ps5smnzprlzyiqx9hd3rh5kz6kmbwrgxmsg4n6evq6vxdqwlm6slvsnwd24ptmr0po0jppof83mefijyhecdyp2n96t2a7anhqjrl4l4m8v7431d2gdsxuai6',
                        params: { "foo" : "bar" },
                        offset: 269321,
                        isSessionRequired: false,
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

    it(`/GraphQL nfcUpdateTag`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcUpdateTagInput!)
                    {
                        nfcUpdateTag (payload:$payload)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'b91fa74f-012c-4830-9dd1-a930fa42296d',
                        code: 9965850263,
                        tenantId: '9659665e-b461-4578-9df2-5bd2f5cc5014',
                        tenantCode: '32ilqx25ababxqakqip6vpszinax8s3l4uf37oendg027b2m56',
                        urlBase: 'gh3ixr3ri6nfodrxn9enarmpufy9czdtjt783qtchnm5jcvpg1frtbglyvrvv9y0tfrshtqve90905yrkjvy10hwpkdkkyfn7lbeui2ab06llcxl7ze4mfrusqjzff78k2uuc1gdt7edz1rcml666kz0r8pvk9j5hgheg9z0usvfq0jm17nw9umho8cc3idajm1cj6q73ywyn33mdirfx6wgs9fpo8e1iuos5pd6rm1ewdjua4gcz0l8fmb97xg',
                        params: { "foo" : "bar" },
                        offset: 702086,
                        isSessionRequired: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateTag.id).toStrictEqual('b91fa74f-012c-4830-9dd1-a930fa42296d');
            });
    });

    it(`/GraphQL nfcDeleteTagById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        nfcDeleteTagById (id:$id)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL nfcDeleteTagById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        nfcDeleteTagById (id:$id)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b91fa74f-012c-4830-9dd1-a930fa42296d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteTagById.id).toStrictEqual('b91fa74f-012c-4830-9dd1-a930fa42296d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});