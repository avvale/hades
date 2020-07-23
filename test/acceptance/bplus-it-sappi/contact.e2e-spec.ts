import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('contact', () => 
{
    let app: INestApplication;
    let repository: MockContactRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    BplusItSappiModule,
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
            .overrideProvider(IContactRepository)
            .useClass(MockContactRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockContactRepository>module.get<IContactRepository>(IContactRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: '5lgz9ckrv69htj1duicp7at1suhwqh8sv9gd16q51jqo7qy483',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'jcmjkrjyqt8jzd6a5yfw',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'l27fed10omb9strw9rsgivivlkieduy0687sqqefx4fh3wrvidjw844tn565gsqdqlzphpcjd7n89bdihimlntl09ree83loiqjjue7kwtc9ggiwe8fh604bvpv01tstge7664gix306d1vsauze5yk12d75mb0f6ulps57si0pm4pxsp9ndv951fw76uqet32ze2m8mnnqxabb0ol9yb4is7pspqdncgs9wcdlm8vlbmhgcgnwm254mqpe1yqb',
                name: '0pvl3m7202250r0vhru9srsogytfc295qz82ac01yhhlosg8w1ts6ze46veng9nsf4yucuu2xt5l1g13twc5u4pq6sfeecas8s22b5hpk3db39bl8q1jljt32la7oolvm20zxo2wp2w0mp1rrhj9ym6xnoocv9xqybjghzlppiwkv25muadbabll14zq9u2x4ml2b8xawm1fvfetzdto5rj7704b1juriaqmo20c45twhvi0mdvy8ojngnbyocf',
                surname: 'wew11dtfujn4xneoyyfqg9csnlghs7qclpzlvff3xdr720jjzxbmmlxnh80c5irrigsft3uqfyp0v9msjhysa6rhulxl3dt1kt88n5xahmcytevblw5id0xgm8sdzgfq8wfso16lzs7hut38qyiq2ue2p4npar2qc7mgvsn1oz7klvx8xobfqd80wa44ch9gy3gym7wd8hp6tbiws5eepbpyj09jbr8j7y4n54kzvrnmolzy1yyetn7ca9i8r3m',
                email: 'iuw7cwlv459ojx7cjelkjxprcnxvwqs0jruo7tilbu8mhpfq7qqmzyg4zfj9ybtcxdtg9h1w85varo8xy9tb4gls1mlfefulv6acqtxpmmwtstfwdz04qkp7',
                mobile: 'tauwtv1lhex0uaq6rf9emt593cgvrc83u3hyufjne02tr0kcr1c5dhj3itpb',
                area: '1iblp6lnw7hn0se0qei9w6zj763k9dshla75gdg0ihq89layqxuuwxl6wbrr9pztujhwylgcp52ebykduhf099q0q96dkeds1yru9yvh2w3io3agpzfqwex71fdvbz59hayc69e2rpl8ydvm0z84lys75me62byg5b8h4b2qmpnfnv2u2iyjye5gw1amukqg4ydtrrifvvyv98vthjywg9ivmku8uwprj3ipxfz2qmsw67ml2nn65gr2mcisqc9',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'ds6nvyerrbsqgh2qp9tj5n021v4myjqhtpnekv6atko9wajxu2',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'z3io1ct2nc8lpp7uml27',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'gqllsk28kkrsalid0c5e5jdb9lvhb6r08llnumsuwxpcx1jwhqvwuromlvl5fp7xj9idwl7hiy7x3tus6c3bxf5sjw9t5s2wexoi8jqx3xc78mhbnvw6dgiccy44oa1xnlnvp8rx7952wwt9qzl1kkquir3b2tnklymoxucjjcxfc44wm0itotozzie45ksbbdt7ioycvye1okuark07i1mnd187mf1zepsqkukv53e6t6h2jgwed13h37sye50',
                name: 'i1e4hje8ab2hrjacxlhu67o1ej0ftyqtmy7cvqvmmpdljoj1lm7dhg719ybat8ds02ivlge60qkbmdboyv9vu9j3vc58l1gf785oxeo7m7q63s42r105ijzxcklq8jd4d2szah0ubyk23nw5pyau9df04pu9c7gdiy4kn2y7mx5stjxdsyyk9zhllwmhniewqt6oft2m7n85txnvhskpfuge56kwzr5kqy2xkkum1or4pp5ngeeenfijl6cnfp5',
                surname: 'cur0ekyf555bq9lgkh6gyqryl4r91npkn4yhdbgzc128u8ob238dnxy774zr0r7s9gzpg5ra6hbavxt0b1bl8yqnmdhsrnkx0jt3ij342az7tx14r26c2r1aw7lnsgi8cmmx15ue8tgjji4cwkv1hfsih9dyj8lshf3dl4d0kyyk1t9c0frz8q20ra6btua035dstk4rphqc2yes90iy1qurd7bmo2xu7hqw3290w02gx3vypp7973wswhmscu6',
                email: '3z94j4krjrl92qs8u7gzstun4ywk92lljv7i42jpo72t9kp01510t9lo2k9rsdpwcjnm0nhd3roucxjgarnhqar2d3tdkkccmmkiya7rq4ipzm7ikdagiuyg',
                mobile: '9b3vecccb1finh0ur530tm9r5q9yawhxyq6an0ty1am5aqtrwtvuqce7rxhl',
                area: 'a51s9aaeoux6gpaxb0e5ov4gnrf6zkb9wr1rc9op9q44awueanzu0lbtxysgwiswcnip0rer6sopz7dqlbz0oli2k9saemsb3hbwuwhbalt2q95sb11vendnckvke6wo5d4d4162y5jw9cjpipftyxfik0j7rg3ubp0i103uradfj4jeblunjc8w8fkyxee5ksss0luk5igqna7cuu7s6xu93meec9r2t0m53bf51cfa3jz3aqqp6yvz9bix2kv',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: null,
                tenantCode: 't98cxf3itenvdy6g4xu8rpqackc955o54wqbls1alv19nznscm',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: '2eljjimwe5kpj64rn3hb',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'fb8skb1rbm6ltp9h2n2pi29w3lfcv3v6tvlogcszb7ohmtdf8zasirmger4yl72zq8rj2l28tv5fipoa133nz66tnpectv3oiawesxt6q7rmsyyi0r2k7qckcl0w7ep0w82wvr0ld210ub91yr84ujt2zqykv2cfpotsp28ctbcf6ftbi5f65dp84z8z2imckhyy1mkvkgkvbax2vhjz92sehypeh9j7oag7lfizoaysp6ixlgpvn7eo2jflh1a',
                name: 'zc0f2u8s2wk6gzy4map1ekojtgqjyqik84bs74qr0ota613s21ypq4ko1q5oxdfepce4ss3fungkxrnkqmaut6y28lheqwzi8qh0eid21az3hxiiuiw23uarllfe07oz8gm9lc4mrlyvt47oufpcor1jjt7fv2stkfthldekkjw834ts2evyvyawlz0jw9eg6llb8tx1xqhvhn5se5ykftsl4crbqo5sb65v4fjf8josoya687p3gob0xftozo3',
                surname: 'mzehxmr70enp876v45kxypi9scrvifkt5sofqvc34v5x2d165afbda3v79sdsco2svqq8yoovqacjtkly8ymtsiiu6n1ahu06yrptzutsf2w6uv7cl2ncw7sg40vp0m6gkpymaimjqds837qgeooj0aftn1ria9ohbyzcmcjztf7ly0t18mthnejexo4hls1g6cqgu29g8804z0w0jafr1wphd2w2lqyi5k2v7clalyc2otiidbipul8o911fhp',
                email: 'kwzab8iszuy75st18vkzn6nfogfrvuwg4d06vshvz2pxixxnbn8r0li750i6luu9d623kcxc8bj4gi1w8pv45lh5ktv7yfm1fxytw2dwjll8vn9bvrucwv9p',
                mobile: 'rzcw3q1wqdhq5urswkvt858m37unkgavsvdfutqtcw3te7n69ald2jociy1n',
                area: 'rfsrqm28nh4lktojag2uy7ipmj5ssz3y67v6h7rbu3zunulzs9wevzpom1ch3i59kflv7qpsqewo0904xqfvh9fvjb8xebamdb7o73cgyw02kgm42pjhebhqhbsky8qlgxsdjewenmaacmrzgvupju11ctvbkonxe1txdu3d9wuns6u7ijgkpl6kz2tkjj6ob293jipavzpkj5bnjp4m376r6nuzw06o7ay4e3d3ad24tr3mpefjx6zlmymyj0g',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                
                tenantCode: '53k0u7num64d05nwjfyjctu3skb50q7nmpabsw3lllhhw62hzb',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: '8acm7w29bisbxirczge6',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'z68a0jqzo6x9crt6t80yeir7wj59pj1c5t62ow7au7vdkrq1elwe1j1gt15takb2eb07vc3kaw1cliywalbhn6q1pzjyrqd73tbb8d4t38o205vt483pu4ipeb094f9p88vut9zl4567vmv5t3u3m5bdy9huumsky1l9m6y4kkcgolg8nxa00r6gy0wlqpzgvgjysvrvw2igbbb31b7zbco5teajsdpf2bk8jhruylc9bj5nl74gkhi90zcan9k',
                name: '79r46le4coerfx8e9lwic71luho8usjp3uiqzxemz71kn8323bwpqpgwddaza9imh67ky6vcne43x4976oltfox94k2rde2d534ogtqkhjtyy371rac7aozjryqw6kk7xxb1m89qdbctnocig5762caysmce59x7v6zwysc1os2a6wrlcbpd4xbmuabkfrynieyxh8w0m5q4m3bjjilk8hk8oytfr7n11c2wyzum5mjb1yd4712js97j9l9umfn',
                surname: 'dkj4c7z47dyufm0r1lxjc7427xxjgke4xxdnmdynvlitydcxv48kbciylcdrn3ugsvbxgaig3mgehnjb76lx021bh1az2lmanj0i5l6lvoo5w9gbqbzrtxu553gh8638x5cv3nxv8km1ckwk2ck9ouhe032psqebn5lbl52j2ogpytk24wq3qqd5bhw13nnr8k4b4i49o56zi5mhgq91u4ennbqk1317x71cey76s2urpctgpcmq7qpx2zc5zrt',
                email: 'u3l7p6a5kbda30ut9gcytsvoxjdf26ev31dihq129vyp9fnsdkzoapkr582o7fyi4vseouseyyg1v064fjb5fpd8bg6w2oh88p4lnt3dvmho4rcte1menfbn',
                mobile: 'l72inhf10ptxmzxho5j7brnbhubna3a5frq4ik1lkbxh4jxofmt01y4moicn',
                area: 'ynzi5a82n7gp81943opvv5uf4mm30y1p9ccis91ybg4fdng2xxy6eig8d4amz31x1alvln59vyndczlqw79jtrae0tctmo2m3dbz49hb9ahbhd7euv6j4wnk2y1og3ikzmo7i61xp7qbcqraqpnp9rgkoxk7d7y60lpq7m5gdq4j7e9zdsxqehibesdoit4t7al7aozzuw31i1rvucdu2xo93tpn692sxgpfcjsdngk1irz0quly6jsip90ipu2',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: null,
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: '4dxhrcpi3muvcnpkltdh',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'xm0t3ldypqjzqx4lmktn35ypmzi7gucrx3sq14wf84ugteagg8tvs3ij06hva9xjftw2rjz3fkc1peck7siv0zj8goc698jr461oigf7hz4amz6tx8q79w90355k0unqrkcehc042js2a2b1v37s81zalbhg6ncb5hepza8x25fwewttkbmzy5hd4p6ttjm8h38kt6k5i1nx2xseobrk45o9tn4ra55w87e7yqdvkts0silkve86jjzn2xrgc9w',
                name: '9gvz6jwuqxnko74ki6ftcbqpxq1wz6uvs94f0pmo2fdq1osylsks2wn871jukczi6d4h3uvp6sdpb5ia8lk2ewr8z0erncos5gvc43gvjz0xsx22ftdt7fv3955gr04vnf0ucx44s5icvsfxijux9jiko8wy327queyfgc77hr05fm404wzuzv5llbedpuofgo4o7hki0z83abc1zg0wvrc8c7hakbvjg9xzq9refnoeayrugl5dchs1y2400d6',
                surname: 'sfi7avq4tm5usfhzjpnoheqgwe5m85tu61n31p32c7e88p6wuhi7pspfsty7kdhgqj5kj16gd0qo89ocksm4e2oxer3xp7far8iyodrhsqlt8twf99fozikl0p8alu8qdpl1pzb0fduuq6lysoperc8knv7aik1n1awgsbjxbpql05u2jc5v6ptsi5khabyhuj06bwit96bmg7ncy3yphm4idm0xhrlr6b20rq386kze7crho6kynd1h1oleylc',
                email: '5s2lwzdehkbu8s3sbrg4a3zvqgkk50xzbqoyilgijcjuuxoznf8o8zu662u8c58w36tetvgk9t9tg6bk6nbvpi8yyg1nma0t7gb1aanlxuvm4597d2ege7sh',
                mobile: 'a99uuoz0oefggs382c73hio7lauqfqq24d0jaxy55e73vd7glsahh37j3uup',
                area: 'al8lrlrtkn5oydsvews99vmqh8bbkgsz5metryewp8sc91fdwfmynrhkb2v48dimpy1lkdk0xe01ocb12qs4y05hfantiaqasxl9bpqc2hy3ar1kziw369v4z5osnkyehbtotky4g4trcfkf6lzbic4ax10d6rrajjbqqzfx16524uwwh50quqivqcbwlmydidpfc5knpv5l05bgw51oz0pagq1run5n1maw8hicq7e7xs3ccoq0bg0sw6z9irw',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'udr805hugosw3sqyxz9y',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'bwodao1wfm9ddjk2fj5cbyjfcqzh5isifsb5fqd2yllujuphual917d80e163z3bhlg3awsb080xivk8cw74zkd39ot3q6abk2mjk5xekm9hfy9hyl5n80z1i7z5twfwaij1auiwpviorsamaf9xiww8nv714ac8dwjxu0q6tvywqdkyreosfu2a07mkgky5prq2ycmzza9qxp04ouikxcwcc6nfzn7hdw0rdqlkii5ki6de2bh0hhixx5f0w0s',
                name: 'wblghuc4xj9nq01rpf3gda76r793gvkth2llwm9ggpqra9mp9kzbaelk2qz6q9tl8a22wxtzwb47x59b8fzangqh2uedwyfl6aqv7wcjaebayx4twuvufb6t028v7ycyy9at7j5806dt40fl99vrvgvhx9sx68q4r516692ofk8ttj4ul3tv5pz5bwvr1ar3yvmbnkd12io20mroaag7rx6hg0zske6f0v0q8469x66r9cqo84e12glc81w0a8x',
                surname: 'xwz8px1b5ngamkt6bdytwa250ym01ct5uudo0hp4pe8h10ua1zl3nuq859felfja2z26eedwj6qs94et7mq5hl2lf894yomkmhmia7esji5i87wa5pc5idiibexcqtn0lbn10az601ap3tbpg0il684as2zeyyrqpfpt9esny0v6vxfuqpmpt7zv0ev9p85sywmy76xh9b56rv45l2jl52vv4n1cty4odh5iyqrvpbd23m0tttz7biu2ua4ydb9',
                email: 'gh65x4go8jpgdrvc6uw7g2zb3duhiodbfrcqndp2fbesdsik2imr599m70va75v85fd0piwn5s7xhny1x4rw1pog44eghjzyvjexezjdgm0c0dpmye6s1zm6',
                mobile: 'sbul6llzodwurl97b0zvbfra1y36opnqtu0wuuu81lif6tlp50ss7ahe1nyq',
                area: 'xkziombhdoy0i5fs1q9jk26pd3dft7npes5gk3rlilca1rirclh2cbevvc5n8emi8askvr5iggdyk94el8uzxdwb5slmi2hv552dqbnro5rs8tehlz87mitmeyolhdmrjqa12sihtdtovstinh5aud7brv7kkvfozoiqlnw1xw760xn5n43vmzjteohglu9lewi3wgg31an53vhsxu0kj7gl86jn4jx0cfbeykfod47apy5yt03pcboedkffpbs',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'l5azur2yzh3arisn79cxuo8hogl7w15r8hc2enp8q15673szcc',
                systemId: null,
                systemName: 'lhyojsithdf0zu8bfct3',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'pmbyfnlqskv2rhn6k8toe4utr9sfxxtp8n6gio6ty3j2se8vlw8vl5z1cae7qiauxbeuysz350cy5qvh325cwvs0te4x5ko3x70v35x7o60c1yr2u5g6wrjs7namahxky85roiyincdm95yjnm863hzlhrvf9kzf7d2oa4oitqomr0y9cxbyisw6ugck4gsiwydso1l3zj5oqutstux0skwnz5zoigkfx1vvkszx9jlofrjpp5p14biptmtywcm',
                name: '19zj29o63dzriwj85abmwzsp67ixl0kd8n0h860ig5vyng45qvxe3zdbqv0rpxehtzty0ayuhb4ap1rnho9slldr2x10hixuh9dpwn9aeuubfadow947juozy0lngg020y8ij73ecwjbuvpl1q7zr05ptta45ttwyxw5nm7qk4h7xn02bfca1cc32bjpnpwpv18yxj629aianhcuph5m7xt21rlg6v2xaw1zn0xzn2n3caleslce27w2w54hm3v',
                surname: '0d5dzb6mvs3m8rkvxoxxhv4z8l0sbh7wqlznvjf940ya3lomolpe1mrn9b3ybbyr4x4t6dnavtrc4qcx7uli0m9mvi1oregqb0lsq84eb1k852eb1fqfml662pixtc34upzegsralf77eigmx8mgwj7myto3veknecc2f283p33bletwsfw3zskxn73fi1bw87n41z6bovfdcxr0qj6apfp5d38uspahjsxvdg82cfiym0hatm5z5izpa63llqx',
                email: '20cojf4gu31mfuy04bnjbtmcxu01m4g8su217vypwlu5xyv6u8jnj45fcj2tv9jvvg0k3tjujpmnibp2sad7hcpeng55yq281e2tzvumrfg8ql818fua6vbd',
                mobile: 'mj1v02jn0orwoc7myfx0pvcjp9gt18aa792996sfmyk1w5hg43qoxxqnozsv',
                area: 't4xzum7bjm6odk7i69dddlnvyg9paj34khtvc6ksljs8yy98i5wcjsf3a12w70gr16wks8xf0hceoer4yiv91muz3c2xpbogczijy5qvqyk177iiqlc19asifp7zejk2v7f1g1kx6w71d9kz9999lz2uvea55nyulo5rx6c7g0l2u1c7quyww50ac740qq2fykzqvhnoyr7prs0o26my89jvvuzihmguufv0o5hq04bxo5yf3coln6odkm9wj62',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'gf5qqmapox0od1yoc88tig2uxsmbcs41t7tq27us7utx89bl4j',
                
                systemName: 'aju2ob5hbudnxu2gxbi7',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'qpgdq77k55qf0qgajlzqnn7ui3mum07cukwpaeitlqeibgn80txqchdfs6hfp0q44tlgfarkj3zwxuzzm4kxboh5fmgqtsrelxkv22vketg9qalx84upfm4vbpv35gl574ve9knxpa2i1rhamhr9imnjne0tked2m7tmlodo8ngz02magpnas1mmkf891nel6816jzioggrzrvnvw8poe2hncwkr4wpfga98xox2qxq99vup60oemmggo4l583x',
                name: 'saunj0hj7anfihfqpk2dfvz9kit19v1vm2y4p3jj69wez818omnxv6sgkdel6ojproptp2ho0uo2mxz5oqsvr1w0x5p5zymesvuhjx30ygalvzpggj99k9qpi0o2eotcvgqit0lwyej0h67kfnuq1d79edls2fa0uxvd5r94h4e3k5y1ynv37b4ugglylb2q3tlcleqospm8lziwkdl1n1yx3p0p7ym4mfset74gv1hu4lmdht61oidk3z033jg',
                surname: '0rdtzitq4xe7vwei7s8tavl953h1s4ycjaa7tjj5n8zoluv4ky1pwzv33dr0hcgmgmk786lwqdtis46y06f5ummyrew2fpki2tn7i2w3j7jty7r7hfllsqe9fw6kn8oc5hm10i0wb683hedc0ahbkldgu67o0if8k4pjgnqnaelr5wx0kfv7tlsp59x2zqikchlmpi9v021dq0iamrxrv9n7svrtf95a2ftvcghh4c4kw0lmeglemlube6of6mn',
                email: '8hl7lgffam9if2yleb8cmcibo7nmq987rwwydslsi2jaui8w3mp7g5a9w5x6qm19lk8o5hdjmcrg0doakisovgh0dt4hy9vzun223gta4jbjvzs2c4cmcyxz',
                mobile: 'b45yxbvuvp9b4ehf6byedomhjh4m35hahpgoet5zyqrl3z8xhl8653kysvkm',
                area: 'ujc4kq4ib1052kcniabp0b15x2qyk7m2izh4zrefjxmkyqqkc4lm9pdpfxn9lyc8zuga212wfzf0q39x78ingcubclz4o81l5jz5rwcfnxc5633ygrc8iowsur54og6j9cqd1yx3ihgk7lp2v50znxwypdkvrqosq9y5kakqnu9ay3710j5pf4izqr3hhoby6zjkfq9nqobn8ei2azvpd8bd8gueuf1yjas7x1mfz6bviy8h5lwmaa2l5biufah',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'xxxteho7kbj1rkrz0sagtel1h26bfptran54ndg3qr4m0h2u1y',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: null,
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: '657b6jxs4y14wpit2mofg62xtgl1uadqw95e9qpl7ybzrncg3yn1mvkyx4xg60ffpz9ogf71vbx1tu63ebf6lmf8x13xjhit4rtyayh4weogqds1dqkbe9hjs8vykql1kphui9y4ap2xi50v8dituj8d2v0i0ksde4bzng9bog9p6l00l31vijojoijz5irdm0grczvz0gv0zk8el3t78h92yssbiogw2vui8uhl25bpuu79h4u0r4xt7cuu25u',
                name: 'z9sx5aesxpt2ds6codmbhbxtgs6s8v9dct729vzibwqytv0n9r59o9pfcyi1t6ghur25tug629bk70goo0r4vnwu1k0q8z57c9oj3xpqcq0asmkchxfud02tkoakavr3lvat1pcsi8xd63boy2i9tirtodrdwz1o7txfs636wb2hb7q2p50n88m6nown42ewz1cfdynjon0j8hd6rboykt5qrl3nay2e3coma0xm68rj9huzhp1wo4ewxhau794',
                surname: 'xjo2hghpj8nzxxmp6xxxy5ue0b8rpz9qa01453ztgih5yvldb9siamkzlqwx4gf2hx0x0qge8kwdc43qqfszitf5q2ibvlsn1jqicdq4gdj97xtrb88t5jxelw3meyoti920b5lmdr7onvqnpcyzj87xr0vgq7mcaahkwxd5j2qral7gqphmielmi42lrsysw8y9bujfqpahfx1bd0ehv14w7nvge109en7hi1r7ofwg2ov9pjuhjybq8i0f1sb',
                email: 'dtqx812ewc9bjjanf2dijavuy5zjtodqtp5fn551y2p00cojdvaujt00wncj89ebs1obb89refli9un2mi02a0ycsjqbg1gm9hrfs4a28mxe9u1z56p7sdk6',
                mobile: 'd1bmjhnz1u3afblnhzwhloltg4hfes3dlsg4jhf624pua6y4taow1kk3tchz',
                area: 'ecd737praahy8eczjnx9vm6ggfzlw236l8nbiqze8o4ju4ph17mt9fhm5kuynivmiudkhudafxek8wihcebbsbyt4oydkhl8mnu7dzc4vq1qgwibimzfyvaiqgm5wodc07m2gipwrrbq088x7xwx4yzr3pwc6z8k1pzn3uacjkvh32o17ty2ts428m2t7ai1e3m575qujgg23r8xbzua0xmzguufr6j0oi4481ug7roca99a87i199awms51wjx',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'h1jkksfkcul75t2ahbthok68y75aht619mpe1fubk5rzo9rzdh',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'fpfeh6wbzqsma1bfqzqjei9tth7dtuntpudmlait1tr9s64zev54q0dvktfeuapmbf9i39oq7mgrw3ry085fpkbmow9mbh0vbj4hk14urr9ikqrbd6sob23kw4bdqlhtzraq4aivmtudi1oaqhqft3gnwq37510l8fpg9qxjec2qud2q7p03iaizem22n85mybqeqfgmvew79mn2gpa4tbwvjqcpqq8imt1mno8waufuzpehv2wsu98bq4t0uud',
                name: 'qynrm0jn3w93s5qkwsl0ksdvibra4435dfku1hbo6i3ad845y819x6j1uq291ne7a2y44u15baxq1shly8z7egwm5cmrsbkzod9ict0n28aopz3i8xmn60hvza8iij5ijzsmyyebiwkpq94fahcr3e1r6bdpb0kllxdpf2rb0ytz8ikk46tdj93xfqgkbc1rmxl0irozb7drkloc537hldj5gy4jrek92aa7inyq78m42veui47lc22djn0nf18',
                surname: 'hri3f2p40b6m3mse4xs6z8k08lptd5gzae31v7u1303w92vn7dewekp4eymi5zjvd5nmllci9wcwtf8dy0l8jq665g910aqa9u691ud8npw7up1eppimu9gd3omm15tvfa133549sddp2pj3qc36ygmpexc9mg4vlrvycpark13r00rym54n225i3b1jpbyi0nohavg7ae0zz08oe943hsah78xzbbtajsh1858fnble56w0qp45tdszshd8qby',
                email: 'dnvp4ze8dmaz7h1dqkf2kbqifcsshfkqn8py8sbwd6ovw1e1wmhjlv0g491ziyn3z1ce6so6jr4la4qstkmedplbc3meyzjwqqzqv2b31lqoo9sd4svmfz5s',
                mobile: 'k3ggt790dik8nam0c7omz3f55wisecu63fb8ud289z57ybyovuulshx8x53w',
                area: 'in5ws1sxys5mnngk6yir9swmkz84gw0cpoapzlgrcw2sdu1gschzfeuuwngtaq8wym2edsyapbulu3xfswm5v2td068n2riaixrdv56om6akalgfislmugpcrcto1cypdxguxshc72zw16oauphdfi1bnnibvwss8ptf8k4vcn8a5p3o8n5qjo8cu9mu856v3045vhu96c62ke64dtl16m5yi3s8rw9she5r02atidmvwvekwrk7oi6uh8rer6p',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: '2qzehnouac40j7t6bm1jifirxjl7nf04ddepby8g8qzrs5wdrc',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: '1zkwybk3i77x5nm81xuu',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: '7nejsanygmk3440cbtmdi0xpkquv7oot4whaeqkoks8jbwsa4u4pcmppijvif9xewprsxysamu0t937kzz4k5exbuc5d8ddh2lfjhrjsuwbqn36t9evp71lyhmlyimi7hac76geqd5liwxmmegv0p6zgh2z7y40trop9ch8txfcetdon0wny7371vdf6qtg6fw79nfe9insh75wxocinqrll3rlx8z9j8bx3d1jq60zsafb7xteg04trme5qi6p',
                name: null,
                surname: '1s2ks26x9j1mf9wg69uv5q8vfuwcwr81706xqyu2y2hs9z0ao0m6fqkfopyzv0b21ultorn77vjg47fkj6sp7126u2o2f0f9bjepronago4n7965bwb0wc9vcwfhq8z4exgig1bgd0vjw0whixryw2q2wvfo47tvkuas6a9ctfxq7oqpkf9dxhs2ymismth9hk8qvfwe944x0ys7xf7mqfp3q25vu898li9kfm7ex5krzxba2a5mdjnxma0j24c',
                email: 'v03ob0kzf7hi19gsh5uqhh8k3i62urnuqbmsmt9wss5v7obdp7zy3xemoq45s7ijmnoz6ozk8iqsmsgk1gpe5i0whw3ph6ya54m92yogj3lx223tvs8bnltk',
                mobile: 'fj76il1nrv9u3oquqc8zjz8k41zbrdz0ulaw20blq7nge7ywk796lnf8qi22',
                area: 'oph2520je613pbp7gc90kqse3yp12jok8wbi53o30af4bp7yvet6c2bqr8vnzjwjo7np779dq40d02io2idyg04x0k0mzfkm0k363i825x3878op61rpfs2djae0lvifssy5auyu03pbir7dbbohzyjk13ffsxy0pluhbqnwkpqttj6wyzwfezooyjohfu0jb02zjs3r2a5ei37pplq7z9ipxu51utrj79le1btp2iuqhuosfvpkgmsb8vywrgd',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'fdq7y5y8w7aprz0qi2ffb1alzytonsj9rzewob7ez78zqew3km',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'kx18suk9suz71hn7t3am',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: '4dc1h0fxqh0p43nsw3qdqv6i9o1n33x0rqyy6ifnx79c3id3vxszz0ama7yk2zd3n2pymyazki9ds2rcha8g52w16kkz1vtjthosvwm0xkgdc4y1vblzof959ooct506avfwe0wbpr4z8o3qnnafwv162wgvei7z32d253wzcxxmuauupte88jlgkumniiiewgdv4hpfl94p6hmk06fkq1jr3yhe5ncbhve2oclpt8tv7019o0zop2tvwht83lt',
                
                surname: 'w3k3v5raisllsqvtawl9912mq8zo2vf02dupgu1aleemhpn94cyda5hqxr1wkc4t4vqjttpio0yexcgrxhjz3x1ehgm18d22t7psdg8o9y4bt3q286rzg3gui5u826d91107me0m2wnbo5gldbu1rveancryi0684povb6cdvhvw5kfxs4rw524dq8e560131vkap7l8cccn33uujy3iz103a10q3y8xrfacsnfn660u85bei82jn0nbuic809s',
                email: 'jd0sxbvfqph9cd2o52f00tcg3dj3qgtynouas38y42xvegjv6sejscglasw3pyyj8jio7idf9dvpj3vhsavkava7665sgeyu8t73wwxjsoe1cljj11dqrqb5',
                mobile: 'vpky3mjjq68suldyik8h3fazmcio9zozgcf5mvl5hwyc6lecyzlmg5orxydm',
                area: 'cr8rk8yrctyrpnltpjctmh95661z6a5wbgk8tpdeueyiumtvxc3993vo7qbkt3uef879x31vlp65bqasd3dsrgy7kbuh7qw3hnsa5i6wtwg83o53j87ctixgb7gecdxk7rzh1yqv1xewaqgnhrhy63dm7rmmx3odf1aumq8yd0q0ooly99oh0prixpaye0f0afzsrfevogldbtzzv2flipa9xr4qk44t8k8vb6bd09n7y4fo9yvcgg8hi5sbh95',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: '1ybqiv8pwkgpdpjdba3077no4mqc4mb13l0mv4qhra6203ma2f',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'xsrktjhloxlnclmvmfqa',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'n5xaqs0z8eehyty3s5qfh054vmpgggojqm4mj7kss8w87wo0s8imp7mgdvvv2i9u5ay7fv5j54ewbfogfsayi7c0e784lwy2bhnsoo79bqqhb1eos6mhe60fy4d7p3pkf3qqz3ot6ypfw4581udd1kvs0r3wqtsjbumolcw7cbkfgtvdrgpbiqaui7giidgc7dm8xki8npdq2546xhlrhvpok9j2yn6tb0habomz8z67fzbsxz7ev7cyzsyzrji',
                name: 'q1avpb8kqvm2x81mjm53odtie436mtbud7iivfbccpoisw342dlq8m20egnsa9xgjyj69yg5lai0s0jcgtv5vbo90n16xv1ctvb36h9svhe90zgit46na0mua8id8dxyltx0432u387yn2ygqix2prqlviz9q07fn893xpwdpdgk9ehc84pnxi311pnhj3ljvvje3mip6ouxa8xlykkehzzg5fbg2kijuuhlkrt7zzauwddwjgqoace90w8qlwm',
                surname: 'teg3nwyvvmleahnvd6q3a98de7eiihyndyghq623npseuzj15y4wizrylfxwcgbmmt2xp7bkqjftp613u8pqtsspmk329zu1mnm78layjzsk23x2yhakyut076qf5scjb5jxpmcs0vysor91k6led5ghjomrzkqp7n14ny7povay9p6x0n35z1ejiat1itmkfjgzv9uo61fjqng6jumgob89vxucyyfudn5exmfgji33m9up5ob416kki5dedru',
                email: null,
                mobile: 'zqsdo82q2eezlewm45kx8blq3zjkcm2s3g5u2mt1a2pgd1q9uqpcuxo7mxdu',
                area: 'jf9z4u5bxgotgfogueuo742rpsfx5q4mekvqxx9qxmmwb3011s2bcgaipaoytmah37hbh0pk864s2ogglj4vbwovubsalmhrlk3es36e5w4etpzk6uebuu8jo9neuflcbstpvv71bl9r4ptjwdxgw4pnu2jwboqu1hzax89zycx2nmchxeq0sywur2rpo794ye77gpivhjej9ur3ryt7e2p9f9dpbj7j2yt4cqyrkftl9eumgbny1qppc0q1iow',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'z6l2oi13bw5dr4hg9bw732kqh38x3wvfs8ypakbrwaq7jcskc2',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: '05vx491zn0vc2uxe60qy',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'bv37njpo4grgrkubvb108b2j3q3o9cnfwr51j6bf2didbckrbljq2vdpsh1g8fr1r4btzev0ke4weqce4rg8lo27uoig5lvl51s1xafo6o03lrg7t2d8pi3g08p4marewrbg3t7bxhzjvcsw8hq7m8u26l3ehhs6ikdpvdbktwzidzs90gzhjhxet08zkc0najz2aex8iz4lnhj788i8g7e3zm22z9h93ejs7hqc8no8s16uglvwaai8u2xwcfa',
                name: '91hk0c5h9af3aluw2aups03ai4giajyofuiq76aitpdxeoj6pm1yfadu3z8fx4fedb5ww6nvz8qb03lgopk8dbegafek5bejz263h46m3lxqche4zeupkpd9lk2l83ofghjxmlmqobkow12fusx8cwo57ny23j264tdfp422mo5me814itpkhw2gryfrelc2xk31eh8l596b9j39wvl4huviyg49ilfea33b9snt7eeqrvj84l6x144dgdlcxrc',
                surname: 'z2p8x9izkejo4eh04m4f0p7erc7yi1keiikd2heze2orvyd5o56dcvgmfwar4sa8o4vu1rezcard0eld68q4q9ns8au9dy2apevrvw6urtvkn4555r908uxyh65z2y154vxxs8brzqkctiaie86kr05xtb4t5dzwf043flao2q54u0uk97qp4wbcwtmt3rr6l19nrzhd95rfnece4qhqxii518tpatmobzprevy7zqqccwphztade59cw0gmend',
                
                mobile: 'abh8ianr5aupgbizg9rn3o0zcn6zaaxeynwpmqn3g7rpzo2ngufkepksrsz8',
                area: 'xnv3fhucwiylebn8ez0o5zc8fikqvliys5azlxkx0uztxchjo76cjsakpu4my8tstask4fi3rtumexbvr31mzrd9ubx5fzmyg2zbhgre3aau8q5svgg39taro4gd234bbh64f5ondsjwglic17r8zen2u3rl8vuwlbwx3qhqcxznuf1v2cdgb1ftgrycti2sqds901y8n60n732518xpv965c69gm1jv7ey6zt403fd3cia9jybg1k2df2yhg9r',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: '9yijj3lcyywpulzhmuhtm4323zywbesd2umfpe3h5lzli8hizm',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'uompq72r9bj75wtrlemv',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'in7dzzz7i0ifky2n8k2ix2bw85c7d6ynpr3tlu125wae103msa6uul8jxhob68ug3o0u5d7kgyhorj48mguqrdbjhy6pmy4lhydumiqpxdf9x3ik5n8bbjm0n1imhevzhxc5sxgwynjjyejukbe8ysf6uy0j0cgei1uy0oju4k381368n021xkgw6reccxp7etii66o39ld6kwwwlu16kywjxsoa2vluf4bvb98maoytpyj2allm0t7hs0cp18r',
                name: 'i9hd4lyk7yzo9p15gr2zig5qmeyxw2wp10cy9hdk1nfcwyslatorzty620oa8gzpparq54l7axxz9ciojerjer7u8a4hjw153g2q4vdot00gzb1xrzyh7t5eyzmwyma1mzl8t1ybud068np62g0dyjkoainbwuy4p3tjn52aoutetqwbyv31assvu527qqjoyu1fces5uxbplsx5gaokpma5xcaci39ixbittohp4dvhez5bx8ih4xwl2vy89k9',
                surname: 'o4nom1y4zmzyjlxs26lhgq6xvkkn4qw8f2xl0z6x65vmgwsdth5c85j1qcb2vtoabjb3k2l3sys6he1o57tfu4vsfmzv4juan07y4b3rihicn12pw0svdhnckjneof3mz4pvgtm5kocdwxxug3vpewrfo7sskzurutzpb344hadovauparyfb7krdb09612fazop0v70q2wzs5yv10ybakmcuzy3s5jsg6pb6suzi7oba5yil09r6p9xblcthzf',
                email: 'rqh0ndun3qhlzr0za0wemnonca21zbxs1vsljpoeja9a32vqixz8u9wxgqxglbrhwwhpn0pr2phz251wxncbg07xytvx8ebobd0oaenhiz55rwaffysayzjt',
                mobile: 'pv5jmlsok6gbc5ei6xf4cfl6uubesb3rvz8pft209vleapnad8yjkhpinm0x',
                area: 'eu4k2j3fwypd6jml0w4pkdokvyl8a4p5mj5e14d2p315i4w039mqlvwx5buxfdtj7b4hsdpxnmljq4krirtqgeoq69t4xag8ig7shcsasvzrojbviqnu82kkbel5ilrx7fss0rf2z07fj83rzy3q6ljkf2tsaz4u9fh389wiqxbns717lfvi0qnkgehwkrhj37jhc2akeqcoucvn8s7w7hsgl9hikb2sddya89jw4nsetw5xik8cby2amwlcwkc',
                hasConsentEmail: null,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'pvcc3g9uakt6uql84krqjx7jllo6renx7hlpxe1bxzy5r3kb3b',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'rnawtbopaptkqjffo8q5',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'txodmzobpsbezy62ktovcxix45qo6ypdov84jlelp7h6h8mreo7eij53rg7t11amorvoeparz855mzigit3z5cllckm9qmupm30rbxjafzou9enh0duaqfdd89balo0vqxte8ezrfhxq95yba2xhbkbh4s5jg191gdoko9ia8q55ks7kqqa75weco031owhn2ikkvmyd19wrhh4b535xdsh62e72yilrxqyaf1uf6tyqo9v2ivodxt2xqz5ylqk',
                name: 'n6xsdv1g0lvm420safkdepo7yu75hp3k5zssm5fn9neoru7482uc7tu1lcvy7s84a4aduuwho85x2k4pb9wpvoh388ky6pue56th0r9qghehtwl9p63bjlonkiai4j5bfn4ojhj5j65tsadq2bll861le1vw3ogirx96uogaw8ypy9bj3pchvq5pg5tsjmq8qf3xfd65d5j71w9j405ybs23m5yhj0sybqzs3t4vuflbskxtu2yiqp3tkk2w5pp',
                surname: 'dw03n0r1atysiylf3gcipy6dgnutqiy4p6g2f0g661gagh8rfe3k49qiqfgd075idakysm5l3jacubb8ci6ok1347jqkikxxeuqbv6g4qvuewysltpusbrxurbotitbysxu58yj8donxtzk72i024nrm5nuwk6vlhuvewelqez90b4mgkt3cabag9hkww7mkjblf6qd16bepxiohtumf9ewvl68b7trdikvjq0159gff25xp59ivj4nzj9ua9yw',
                email: 'vxybh6ju418suqm6jlk5zg8h80yl0049h5un0n6kf12pmiwum5006ewtfmgwngg0dcicklkcy6wzyxqzw7qs6flywojlgbxte6k95rva1jvj41xn65ut4u8r',
                mobile: 'yqn5gsnleveg0bug9zolionqdsro9hoit6843wspdpghglhgtez7uc47fta8',
                area: 'l0wpnfrt7mrokv8gib4f1jc3fq24xcdtzu0nyr9aiea3kdctoakwmd9tfvq4c87zn55zodatl0x69w2f1djkbx6ku5jc93abx2eckrlnkrlyi5c89t31yx4jq4qosi4nb5779cy8kgdcfkg5h44iukr3emwkhc1sx8tpa7tyipruxl99fq5lvix780q6l5gs4x8ydiq0vlowwdcgl4eh017ccjkncr0fgo7l7hsj9lnws1efv3rgqknd3b1kppu',
                
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'bu5dblam7wqrhxm0c61dy6j4fk093po0ackhlfb9796t1pfhg8',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: '93j4nf1nrve9lxh5sipa',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'uvrroa8nssevgb9b8a32ksjqardkqjwz2mm2qwx15g7c0dujfrrxvrttov7iz1ez1zz8fid4zkekie5lhdo62apra43z0ta7tdok4y79zayb48jx1273c1odx3k56h1m7hanef3t6h8ci0b94hzws2joqt05umzbbaqjdadnfzf6inbjemeqt0f8zlvgm3tmzdsl0arwyi4vuzrbsgwz3updl6p3i0un3bmx0dfea6djrw44fpnutee12tz7k6u',
                name: '11h80xcgql5xk8k9vj368p1v4il6l7zy1tioy3sp358s6zxu5v4rlxeamf4b35cm90sfcu0wabiw0rd8i53f46eyjw622pw0dpzyw4qjzcdgyl2n1caqx6n9pmrh1423qwag1kbkwlrgkfbzmlvfojir5fxje9dl18q0v9cod9ma0hv9hullzigj7lwambglfysvgrl1hwlo55kmhb7zrgorhz86gi8uuo6jf811aquff5em771p9slfr9iuq5f',
                surname: 'sukf4eo8w0ytxb9lxbkte5rvkr0hlsgaj98w3a5sah618jxoe1kno7c0265o9icrdf36ag43dvd8xxxsz52qcr4pjicqqo5t0o6iyo6xmonid16c4yqq7t03vjjn7au09wecligr5e3u1haa1d86twdbls036rrzdjmks1f4ma65g29ln07d4ffcylgztanh186l3vhltozek8hvi3lzdblz2l56ewq75ivsmhzw6dq4j3xs691vatrf8qji1a8',
                email: 'g7jovmdonzhi4frnvk4t9laka1qaib3iln184ulryc5vcx500nbnfkzds8ozdeiscfdqyixvfctlmco3jg9zo84wtrlthshtte3rrx58hkxzqnxeu4fkq2rq',
                mobile: 'ukl8v8kmdmk5hbavkm6c7a91t2yn3xec7j0ue9pc7hswv3kuh3kr2xvpslrx',
                area: 'fs510jutag6rpni3pkf5df691ea8jpbtmptomkjbj11ahocuvl1tvbsimdmi9vj6weieigiftw8mxd03lnhlho1zsk3wi9mz77slqjh0zw61huywfpy2ozysbx8fwdqpr73yv6gpr01gwdva4xwpa8txstylmi8nuac1us48tqruwvkw3wm51e8tckpqm0h3mntx28q2djw5wsfp2uxfn0en7ac51wtinswqqwvmskem97jsk5o7cujkzgt8doc',
                hasConsentEmail: false,
                hasConsentMobile: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'bru8irb0q82rc23ot8c8ak13ailwq5jxnvnh66p8n2nky3ynly',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'yhgs6jvucg1etnk6mna1',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: '1tz3s8mbgdhg5tqgvsh7ntpuwzbpjf93jjngf0d24b8ee7fsgb3uoswpoblt8ls4f0zu9mjyi6iop9bfcm2xhi23habst3xe0qpo29hzcz5tutps67j4vlimn38nw06gy1qa3lqhig2s0ace7wup4fiy3iepthmjyzjtrd4jrhhy8vdg0bi2wbjllt4rvt4wakqgtse8j2kn0qyduev6y7851vboait1dqvj9v12yuxmo0764mit3gbs2v57cln',
                name: 'dut5t4fu2zro3v0qo3780z07jqfu7karrwdvo75op37v56ewwh37447n7yoavv9vy3dz0cnjbshzxp4zj9jnerrsapuyvwdxc499ord4qyqmmeav8maeqjijcv7jcpba76vodwzvyeldcpeag00f33cmvapuwjlup2l41v1cx1p94pu8c3gmymew8eltmc23k7lx4sphhbqxrz72dek7sn8jt4iu79m2ux38y45sr51vlryywars02p9gbrwz50',
                surname: '5oi5qdcvcbudgob5za3pp2xc9bel7e4i8faket04875oqrhr2askosq8pewt5ki31v4xv74y6dqf1l8oyl0jygfpsdrhfxn0fvw11wld0leussi4tacro6ogfmlbu9h6ogfyo32hd9cqwpukq54gy1isx1ekx14c8lacpoim3sr1zgjhe6qxigi142iajbgy1bkpfvh4q2jpi25026acxgrhgcgyf92106lxhm3i0oxdjzu38mjbk84pcsh1j3u',
                email: 'pajqv23e48w705iilj1nz0wavjukgtchiy0sj19h8oqn9du3hcrazdwn0gtcrjn7kwfgsxt4ulxvjs2fbtrae8mkdzyczmogeeka24jsqzrvk87bo4x3czn2',
                mobile: 'njhxolncl97mdw95ndrmhnz7cxk0vy1vcye7mcpn3nk6ctz77psj7mt78wh7',
                area: 'eab17z4wcc32xq02astzvrqczxz6wf5abothax2lv8oy4mbibkj3y282q97rupaod1rgn44qimpjlge4jicce7vx2qq941sct9a78fwcvcd7fdm0wo7a08lplbv62dzvjf3lr95h3txfwjw8zmqw1cq8qfpqjfsqgcwmzzqgchr3tbq7teqf8dymkye1eoj1mrk1e3sfk75dqdlfhm0kjeypxqhfxytt4o97ypl27jz53rw21u3eq8i0x3fx7o5',
                hasConsentEmail: false,
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'ygbyripv40irhn1kcnya9sl0a8to8x8rik3c8cg2gwffxnttc5',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'oswwib0721sb8lokaxwx',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'bqnbe81d792zqa7ihpfdux8qzg5gex3cjmhr4xz4j8vylm28n245ac1ve4za6v222ilsgfq8nwka3jjegdyq2ujar6oog3pgldnn1hfbdxq34npyjlg8pivfppb2yusn5wr64b1j0u4sf04n8zblydehqu9bn6b2dvaatu1nqqfls9hqhvis6ohd0f1hoq2ud4wc4kk1qyq22wzcjcymywc0vfyk363vlqhs2tzsgqya687dcn85np0blv5nfdo',
                name: '4aab1md3ujj68hdoamqr01cbb2fbsoeubhkwws6uojwh6f2mzq54834h9gitl1ulguedza6z2zfi02oorsgomxi01n9godcusf13rhkvme3sh0i1hk9sqdwa5047opwntl2n459v9juuuirql1ju57hvh1xkuje8xslhtounnnxpgfn4ticqzzqeu34clvh4e52h82t4sshgkapal3v3r8hk3d2un60liekl5ay0zarrpf4wi0qmi4fmqi3xy9o',
                surname: 'gwpbznusdv2yu2gwmuzkhszvj7837orcqixkfte2lftnvx4rplbeiobvrj1yk79s3y45hhqwv77q4l1p680400zt32i7cb8i5eh4hsda5cv1f3aag57ajbfgn6j7n1lexou3j8bmmkezbpnw2cemu3nu0vk2cbge62nhdwaiivfkkpeb6jdf6kkr5hf06b3sjmcbfg64wofjx0uyiy59mju8mdu0cqkc0orz7zcs26enq00plasqyr7sr3mkf5r',
                email: 'h1umffs6tdgary5juxsmadweszjnz34okop7kyb1j5a5lpj1hkxq2ypx0qag0nhpye9qb9a7as2ec94rdryw346ckhtde7kpueiqga56alg79f9xu0ibhgo6',
                mobile: '8ywdetpi5dlyauddoztx9fu8k9f7a5mvsaogybev5gn7vhzbjk3clnejiwcz',
                area: '62xkyngtzi903n3plege4i5s3k0bd4p24tdavisabisbcghjlav52kbzpqkullt6s4z5550geo6s5vzjldhv3nmxqpqi1eprvmp08cjh5xzupt36th73ajngpwvfai6iipmvbv2vd14omehs84o6h4fm4998yed3pbbf5oltnxqs41n7okh0a7eguvxf71y78pz117h0zty0t291ebv9fisk0ia70myinmjgxb0o8grj6hmdgm4o58d4wsqo3kx',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'bcs1aou3dclfhngbnar2cdxqouuhm045eymw1j066lhy1lk8q6',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'w0g1hz0rd8cel05qa3xk',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'vdpeu5fm4kviocwonvpb8ohesvwd63f8acmgryjnivzwcughonlu41ismzoxd9wopvimioeup00l1vq2ujoqdh58eug0bsirtbru55qh0f9x8kkylzbnhz3ffxtunnamf8gmzwz0xr6v5xh7y7jv87mdgukyxs7cst115iz06a0ux14p5urm8go8rpiiwpjbpgi97lbx7jjsiytycbkwby3swqlompkbyex53j5t1md3vwpybh807cv6xmybioj',
                name: 'd5g2ozg3vf3ayagcgihexo5cli8jor2kvogsckt8eqf6j17i909qlqmytkkrf0yaci70i2tp1s9guq9wk5fgy2tyz06u7m4hly2ae3fq8ew75sj7rvuarpjuvlpxbxoonskaufpvitqro6aidk85grfgnstc23if9eg4v9nuq6f5cxhqgnsfrkowf3tp0b5zwl9hxgmpncqj1c5f7p1cxgmkhs20rzlutyp7dul5llbolyvvzpg61se7nybzovr',
                surname: '0cw1o5z5yx1gfnq3eapsvzn4lye2ovr1eog9p50jyc9qgnx7xbr59cf3n39lyq6wac2bvaix9l2h89hs2xcsuwyz36msyfkngdu8cmc8djbk7eeniupmc6v4piyc68bfxf8nsnokw2cc09lgwp15de8sp2k4or2h8v8wmhp2ek3jsuwhvam0rw72w6bza0on4vfzwhau6ds3jr6tn72hsnr7jf8sxs2c0vrcdcb2zpi445z8opfp2d7uw1rk4di',
                email: 'tt50jknouuk84dy5xc9d5jp4fsqfv7s1gy1dljwco49wqiymzdevwh36gwwvoq3jfhje7jos5xjtq3id9n3g37c37d1lsbq9fen8pmmr4gedclitmxeeinn3',
                mobile: '9tp6m5nt5cs2alq2x925d4otl0t737emnc35563wn6tlqzrw24tn4weyf136',
                area: 'bmqcutihieu9smickhb3qmf5ufwdm2vei9m9ves88nnh1euw771vj81k7aeipdgwp6rkofcvndtv8jg5ju29glb5n69pstfkx1gyi7a7zblloz9ugbrioe2f5br49fm23ww8zqeqjm7iqe9wksqt2nac2gm5ijkaota3gh0b5w4h0z7ju3nhcs9lqvdrw1dq8mftnov8h7c396qzjy6w9dzbrasufj6g643e8cmz0fzrl5ilgtk65sn8hisalf3',
                hasConsentEmail: false,
                hasConsentMobile: true,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'klbpo67eojc5zai4wab0n1tp3ogrt42el1w4f',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'wievlxylub6cfn5puf9kv4qfxkyjdawn5uzm47cbpc0u32ea97',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: '10vf1imj9ol5vpaqnrri',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'mxz14nhkbyax8l28zpn34qiasd86b71s26m7jhkhldy09qplbpj2uhon3zx2izlyrdut7e5k2pudj1c1t62rl3ubdpn5b5hqhgk0bdwuf6k4f3zh80sc38a4hrr5ejb4k9q9kfpxbhnlvn2vkm8pdgp2kwkpkmugnab33u5h2wyimyniyktq47omo3rh6q2bfg4gt9r0d050x3qmeu0jshxkkpkhnlejrchx81rs98v38bo1txykfa8f6ooz4et',
                name: 'dmou3b0x9jhdc6i0u1uqxkh6u0vppjcf1j6rgq0qfa4gmyd6hz2smb3baji93j21aztekcxnumeretgvp2cjhdfocw909xfm20w3cybhjg9aqjfkknxkyn49fwr0mvj9lwlsfq59z51ovbqzztojaswfrce498ervcjmsrx2ntmcouj3iccim8pbxq68biz036lijs6iduow1493uuvrb7tp1ktrklwkbhz1nsj8yyodo45qet1xrqrdyagif1l',
                surname: 'w990205jw8tipc1wtzhw67z6chmyzk188wyqph83wqy8v6japbamfmxcdfw2notglynu2q3vs4l7qjnc0mufojlqpqlnf50xi7a3aiyev9zjdj8pbsmdykh2ob5u07oesb1j7oxu2k2xmpzum36tu7cfszgpc9l1vd8zy05qkyhyto9suhxq49rqf82vcwebm346xugo1s1krzyhhov214gdflfhbtijg8hwjmcbbkoqaztuokdmjmcnhsbjgwt',
                email: '6gwrx18yasb4klpkj8ihwzm37j33bdhgbd9juaa0huervp64zsuckystpe2r65betctnbjf3u9ygmldv9y5munxv9fgstrkph3i87llx1sxs92g217azidm0',
                mobile: '8wvszlyrboj1rtipym06rixdbja5w042vtqecsa832lv10zgza8lnp2es4vl',
                area: '4g87upuyme46m4unlpwxtkeol6cj66sw33jw3rkokvjk4ceta6xguit5mfvzhk2d6l7i18n7nckppl9t9wfw2ua4c761vaphhbz4xf8usyz019lfrs0etrm48i1ydff1oiz5ap0bfiff4ejuxaphi7fd1cuj3xa9z9doxnri4p6e2zmwydo1s4kuu5jg2lbhyfr7x5gdpjzoomy6gh1ec8x961nqdbuq3jueb3aj71ethvr7k8xs4brudshvhj4',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: 'pfbcqgedwgj3j7v9705cbc2fl1xpucp95e5jo',
                tenantCode: 'dd4po3kosabmsjpb37j4skg0w6ux26ofacgsyzm7khj9ar6kf5',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'r1a44b8vfowz7kjf1dat',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'tzf3x5l6wfjamsc3wdc7op7txfxwn7ltmnq9k99bjco8l5fubjlvs5q0kegmfjydb5qokzfhy3pkpiqr75gxyy75042ynf8u49s6uwroo9lhvb617k86bqwfjmn5sv9djst2og4ef8mbgpxx3rw3hhhfzqqb08zvutafna0b3i3kf8h8zruq5sx6d2rez1fm3dfin5o29pk7lxlv7f91e6v20am1e48imwxog0wskf3wmzw7crxg2378igbmwo7',
                name: 'cmbypejg3pb59grjy0qj19e1nrzbtqhw6qzm7twb5dvkhrqxnaxscsd5zkdikun39ml15tmdiiu4jsm8q7ulq56pesyhndpidf7m95quxlzgkj2cf8tyc0q557fzhnkpqep8hxxgcg6v91tobouf8qzs8rksdmrsbasu9bke9k7xptoi8l51eoprd5caqnv5t9t6cydhhrrim2xr9uxfvxc626t1uz8jyfcv50izhmzojaxzgssgy0loxz8cu43',
                surname: 'g8bte4xk4npwbzffxpl4gyumr6s4yi44j6r5ng8kqt89esft6bg519d7tn813natpqmlr3n4kdjrd16tj4q8u7o5rxjl9rq4m5gwryd8912u0mn4eemwcjhcx9163nxjykb8xqmvcyrl0y6v16ggyxyip7lq9uykgyyvsf55ta9t6hh3diozyg118nryaletz9f7qyfe76e0xlfvs8lowbr1e9r37uztlk94de5tvlyd3kuly2iz374dgkf0vjj',
                email: 'mqqcympqivch0a8ipi99xftps99iy104jgckhx59t5u90hzhsic6eb2dm6u8bvx0obcj3o5ykziwxku9r7zft9mznlwnim6zu7wzmyz3qqjdqo6paptkxtb0',
                mobile: 'w0qubq4cszmaejmbx2dc3cyd6piqeh1j5n4m0ur18k3bcdr74p26a4m19l2l',
                area: '3yyri54rhylj14ei52nu0a3ztslqokxsxunvr2jmrv2kuxqhb3ejlk08dq2i9me266jv18lamapiyygh2clnsx0qlp1y7kafki46ch9hgrfcnvcowpupuvewx7jynmsmg5l40wrn5scfbpy62ws6xl7qznheizkdtsoxlqxeka4z2woffp8bh4txrq7ikgt47zaxiuabjg5c1q9myjhicl2g0wdgg44cns5g10l5q7mjcscsiz7a0hwlrcq55xk',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'k9ks2097l11b2sy8uckto2d10kghqen4240360ib6syxowp79i',
                systemId: 'jyjkuxrva972ktp3njidzz8ib2x4tuhoxgkud',
                systemName: 'k2fgrxz9cyaw1rq42fcb',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: '5pw4t7hicasmgzkytd4gytdy192mc7g67xv27po1hlevsagq8a3jx49zvcwdhdz9v9gc2ei1hy5porfcoel0sedgmj7lbxsq0gfi00y17gk06qo3pup40t38nzwgquvyx6qk0lcar7a16za9prbgioos4iii8kikrma1bhskycu6gh81tz2qfrvmdumjcbb9lwi13ehlshh9vh2ltc27n498bgecurc318dhpd5edkpep2z6vv9y1kuzi0565zq',
                name: 'kmh14jx84hehudruwcdsuuli0phflhjjlukx1ji976er4i5psfm7kv485de4eccst33sb7ubdoet0d0unm6gwert3mrkgqycgtw1vg0360rwc80w0r4cuul5hi28hjv9zttoebigp7ya0lffpopbxvza99ooyuc0smtzhgehyrdxibagg7mze9fn4gk504adsptpnfjkltr8j0xuzjhfuyx6jh5np3kfjhjre1a3mbsmutm0vpdfkeu8hyuduo7',
                surname: 'giyohax2x805nvj8m970csv18hmk2ps9gdm5d2j9d7jn1tk4t5snv0n7srdmrflzsregsr7lcsthuav1ja3obl7lee0w1iy28b0yv0gxaul5f5itpmf4nujlzc95mxi7qw0wwlhnex72f9uhs8k3qj4ksloxw4yjmi4dbbscneq9qmol2mor2nztv5zohg43oaj5lgiwqccctxzsv09kry9lz6luny8ljine5u3noaof4hrkepnshlnauldbsfy',
                email: 'cfcoqey5t12b8lcfyybkdd3ilv4ruieoj0iqj1zg5ddyv3oasqo1w7yh8mb8lg0gp2zjaukjjemt4uaypzi2bn4k4n0z2536htjbrwqj50n45u46hxdo34gj',
                mobile: '1pco0x6w9s2j94wteo4jm8qzmb9id5bz3f1uvw12m86ixpzrloxbway7sfni',
                area: 'glmh1y64oiy3nb1uxi2fswqqbxptsx19cwl9lvemulz0wsch139mpgp32z08febf5221a5kxipsaqjgs3vs5f1j0fturh8yuplorcbfs2y2rc7h991h59nfq0x7g8teecdupytgiz52qcjccy8s5pzw7x7tltzzmffx04n2xo1nn5iywop3zknfo7e8tn2xhmppmovxqs4hxsl9gx649wzil3o92kb3d4v5eg16y4yx3wtgcdecgthleeob1fcs',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'eucvgh2kyzwd5k8levhj6t3od0n97khh5sdqbc0n011vez99io',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'llubt23p6dxxe2mhaqyb',
                roleId: 'ierxq2l36uo8d50v88pdecwzz7bc40uf6b8b2',
                roleName: 'q4kscs39viy9ze4fys97brjqh9mlv9jtbc0bx9jv3pawp5krnjcm09ydaxjc4yt4yk9uyspeilvm33louoqpg5rrqbfswy995gdup1v2lby3nlcj61jm5gt0ziuq4nzcmrnkuepn7vvysj33uq3k0sc68reolmdm3lg9e0sh2scwi8ndnqzyoywv1sg6sbxqa7zb1t5nb24iwtw39za2ysdngtgdamwlirrnwyak47l4nspqqgajungte0x194t',
                name: 'y2wqv5bo9l0fjr7nmekpkvl8c8ep1agaig7yc0pdszqrhuto94vusf23yauze20i3nvxr37bdxcrwmiche1t7ghcxg3c0ot6o4zhsbyg26tmr6ax59632yqzrk1i1u9nfzp6yw31p10fie9vvstsak259zjfv6idu2kudt8rnpldk2peqfqlnohfcmso9z4524yk8vea2huo6tdfnp06k0sbzo9l070eu4vm1mr282fzvhtzhuzg86pk8sg9icj',
                surname: 'gaq6477b2g5yk5b3kl4upz1cbxlj9zfdomdczlnsji0v1zfdtr61yfwj136o8ta0g1s9peaeajyb8claht86tg0x36cmxjdwqu929fcxoya90p23dgxofq5ryn0hp2csoc1ziim0jckj0jc1k8svqolq1klwel5h45bnpe1t3bhdmp8o6zg74fsdsmqqo942lbxnk0z94lpuxc5gucwvkxwa5bdq1d97wk3754z3jh71hvyua903v4gaeqe04vj',
                email: 'q494iswb7err7fqtvrwcg7f9u9knqx28yleg41a0ll3txq8d6hj0mc82m0j40zjk52el05ko9qqpbh2bhdsqij3me6tr0l640v3eumtnv0c4uhdlven4ig3b',
                mobile: 'd3phcw28unwzcox7cf7u3ak7j0e02jnrevbwm07rfae1cilieoikbe6545wo',
                area: 'xwuwnu9wyf1xb9xtjtonnyg4e4x2m7vqmojkxn25gz09hfcmkvvw79dqm6r4kfvc1uc0wi8l70dpo9dy83rghktg077ozt4iaufr8cfeppq9bx7vuqcgrzcvqvfbs29yh3j1qx95xbp2ue0z8funq6tm9ct2hp9bhlo2g26z3wakokjsvio0mjki4yrtwsmnlt0nk2md20na1ysd8slwrdqdztbzq4tszfdj0pckluhaxwt8gu1zujsa72dwdd6',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'ffk90uxa07i2ej14zkskcqi5r8id8cvhpnyhrzuiangq5uirg1j',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: '66tzj0rlp8ajk4x0ktfw',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'iyfxtjfdugfqt5khb15lnskwktcxdfhdw6ekb0wg6xl9nn5tjqhqcry5mmoaxyu59yzxfeda2tz8ul5noj2we8vwebvmc6jf690jwyyz165b979px1p2jcudyztlzyysjpzlc6ozbfb246zoqirpdori1j3nhwzdz4gta7ux77mfx9z62vzdp5t8kqadc5sw1vv0rtdyus53ssrbw65vzm4j6x7e5sxnrqsqpgcfl0u3ar5gteec6hl86gju6eh',
                name: '7tfan5gy80q2vu63glsoswnwyg9b7flk8hoe9qy42daguhhb2grhlrhysjccwqe2n68vijg7mr70njgun26dn8xah43ks0x5c1wgtfrqr9tqdq6jyxuq7e9s7mtjnmdenciejvrp2b09qqy1ltdhtz39xzefqyc0zb4nhggd7lo59y0v9nvu5q804eius7w50kjql71uy5ycjwzyz3njt9bvdt97xlu02s5kh47f0gw7wvgdbgyt8c2avtm5x9g',
                surname: '9j9yu1dzeq5fss8f207s7ffp1qe2j6zpy8eoe5s1ee7heq6eoac7k2c6w0ul35v59ulxuuc90ww88atmo1n9wxggo31xxtu4shzw4bnczas5m7aunrkoc2fe5zvw33cw8g1fi96vdxlt6ierfifgmkxi4l91ozfw11i14ohme531km39ur1ik7z4mqtxh82p6kc1ey636vrbz67grts18lf7x94tct8bq95c67q4at0wh72brlriffh3y0r6ym6',
                email: 'os7teys2406pk2yu6csqbbx4a5lj1px7zjinu8spv8zlfwb8u55if2sofvx7gwukwixkyzwukn0pnc2kvm4aimx1yz43oxejskrz0xvvw0izkn0pbt9cm0to',
                mobile: '062vn9q3nsic823eqkkrptbq4ibb42jo80gd1743j936aw776oyh583zr3rq',
                area: 'fuwskpw1x8fopu0hykb0tjjca096z25g6byyk0ooaxx6ilu95rhyfce3qrbkynzymad3gihhv8fg2yytc82b1d7ln8xtx4k57z71v9vwrg3ejpap5bjjc01b4g2d8auhzm34rd70r3e41k6yb5zwboqtgvoz0y26piroulhs884ekr0r6wv6sxs630vlxm70p8xixk47a9oweykc8xtxoldk0daa0sxw2ybds01eosnw4sl0ske1w3r7l34qviy',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'gzb3t1bgsi7gulgz3g19pazfitbp8kac23ox88ebezacka20y2',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: '201zlh09fxoexcwf2go4k',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'pfjt83wi84fl256nrppd6e636v8dffn44kzf0yrt06s7wt2l6gcc1fk4hovsiy8agwihk1p01lfz2sz7ef4mrup91c0eugx3jipbl7dcdmm87l5oh1148acr8w539ul3wwnsnbn9j3l9op09gjvkt9l946nofjjtucaiig4vtoo5pcdncripiax09iprbss9xq9mwyiazlnm1keiziffdje9587efsoni789rqzrtqflvgofjxofre3vh6hcl92',
                name: '0mj403ixf4cec81rp1vvapc1rz7l4qus1353t9x34z1o6aepy8vublw8rc36xy53hojl488p4jgfmxkymna7h4ddjfjavz03kqvnyo26ra0ktx9q59oq609xokdw7ciyxdaxe5gksz0l2emg7o0uidjn0stb1o20vq29w5vu8f5u5h3xb6xgt8xw4p97ddj0nbzhxwi11typwf38lk6sn4u5gavt2u6hft5o6lwblkvtcs43ym7lssw5d89ksx0',
                surname: '6d0ep0g7pioeqngma3zw3zyajemrzt8aukwpt2fffo6t1udeixorxo0ikvd1npz31b3k1x92f5baq72r98nzobxwwq8yj7xw7b7owmc1qzstidcs4ie6gnvh399gnq9p0qmjv3nt9ipeakr3qmlza72ymocxpk2vc6clj1sc7nf98es4v22ikdo02cugge1658mwmb50phg5b4icpwq9pnfrt7scqfi2wl1bm61xfoflwdj6628x8bwwr68ddzv',
                email: '3x82uzvhhw4u981j0egjac4txc4nkm16jhklruti65q3e1iw5dg4gjh3g4krbd93zmrv6gr4fv0xh89ja5jz6f4iyamf2gv7gqhsz97uo486s66dqs8i04jf',
                mobile: 'xn5mjgvnnxapaar50h23a6wnbnd1p8yl6curgwe7ho6q0abptdo8ww6grh7d',
                area: 'hvob5dva0xhikjzsontr5isopc5cmz2zeu6k61iwhhka6t354iyp9mt0tu8iarmzi4nhht333hfb9edm3awlbnfgb45v79p55rzus7xrbsixsghcubjjgdxsrr174chkiv8qxr24jcjvg9vztgk9po1xrqogawws2pukgf66wg5eipqhgjw4n9ulmv1izea4lzf5p6wak6ze1ryh123zuwdwwn6hq42i12fkdopx0jrtc0ansr6esfsjqu0gljt',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: '8v6kf34y0h9ghduzeb2qfue56xc6j6autqfox06ech82r475h8',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: '1ln6sjv5x4ghifo3juy0',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: '0lzr8w8zfzb0xm2gyhtlly0yhlv6avh8hrepcyuv6a708uiqmlwmiv56p46sotrq4rgbbkcp9ajr42vx4jtehyo72e7bwoxdfs2dpams3im63lam9vbxi9wyoghorq6fdtl96y3rpt9n5ytzf3oo5aegsabvmg32dbhqrh9fykis2x85u70zuwhqy906n0gkatgslz0qzmuydt29994y5ez76kvq461368rm9ydanopbtcni2efq4vjpu0n1p3k8',
                name: 'rsoo03d8iakvudo029h1tzfagexkfo7amiv83azccq6b0s1kvr44p3suh9fdrg5sldzs635kdh019r7tzw1a3r2izpp099awryrlyixh3r6nqm0kl3b74axheyseglcn87456wnzs8u47ka7jrmb7hzp1pl1exbrqfogxpsb45g4kwegrg01ok3ygrof69ehblb1fxp1j86mbosoi05uu0bchen3z6dvqtxom97vtczkp7cii5q1sx7cn29bvcv',
                surname: '0nlmbyzogjrqxus65cbpbjn629csy73ao1liq0yc4nblwk0bxmwj0neojmfn5nrb1wxb2q5i9rtqawdttkboqrk6v007lhvc3xu20392572dkq25pmdx1fvi07qqs5bv3dsesfb8r3akeuqs6shqu4q1enx84uwn1ahnuyq46y84odg35y2mq7r1eeyfjunjm1lvqkostqhmyc6ujhf84d9firu9byzghms8rlqb9edhyx24visqeadpn7hvu34',
                email: 'idst1gvafffh0vzt6iolv831pnwyd087isr0srfhk28ktn9wv28mjhb5zwmdahb0kan3cqxl3g3kyb941j235tfeak39m87qgdddsysua6sx2429nw9ffx1x',
                mobile: 'u60kxwkxvozo1jd12j4j8nv8c0hv4s9zod8q9a8sswky0yy4pk2s7krjsvwy',
                area: '8rlk2viekmi3h0ks8hakvg9vst9b5agfa5d9viga24xinpun4ds3s78s4vz91we7whk1bgpwy6ouvh6t3ltlb72hzlu3malzl1wbvht8n85qb3lvmp6q1eb3k116jcgtw8bvxyskjn9ulje59uk5d7xrphditoo3eajeajlm3o2suzs20f5e4pqsck6q4s5l4jbqgv3dhlqizvcrrql3uwbyg4ephmjqfwc887lldud921utcdc8y2j5o627stq',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'bgesum1my3rf4hm9c5zlchc251qnrxc92lh9nffdkh6v0nf6hg',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'tzwvzx0ysgqmlr31kgql',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'rojwyevzyy6whuku3vbn5wuzjepzkyp9ejn3dm0khgbaw0f80i5co15x9hj9rzvfmgzf3fd8to88z35yvp37zb8tv04mcqpmv8uyke0i7k3bv7uvowfl1ljli4o9f0fm7jrijmse47bse6c55qh5aa6af67hfulp6c3zpsf4pti2p3fgk5bmszzjxlwf1iwtjlxtmke3s6q9j0t0y8n2k3ybyzpa0h8bm6tkedrtjoijfzdgkj024iplgfwdi6p',
                name: 'eihoz1b3zws181h9r13k4yhl8v1mm9zg5hltlzkrcdirpm0mhn7q8cq6862d7g5e9u82k5h1x593aw9jl6998xm0iittztyk5ustd1ehm2qgsuel90r1ov0ntmjg2yeay0b65usi35bc7vy2a25jgxhe8th7j4x5h9pxwwvo3s4yvswuw9izctxjs6k8pkid540efdzwuo8d5etz5q8fg18253vghiqkzfr6xz3ht7cmzrt9z679iqmeiughn5am',
                surname: '79hpcgbp6s8hfzwf0doanltc21bfdkur5fr9lyh1ynaay2c23k9y3r8ciesyfpg9aqrota1f01r7yvbfyw6euwvztx5kwahkemeo7rwdbtffyqi7svkfra7yd8t00ab647e7wnqy4htqhujwr0wytve8jxj3e11yxge61erblwgcsx6vxmhhl06h0p7vdgr9cnz9y7vpergz853kq88nclg4tbg3ap6rytnp5n256cuvc94tpapdrmok28dypdx',
                email: 'myj4hfclz1ech10rbyy772sy0zxulms5kpwlyo258tr7a7fbhy0nv1ajzfmocr8blwx93qzi2k6dz3fneg1lvja310wd8hrz65qe3p05kr1u05z8thi6anud',
                mobile: 'gs0w222b0ehi4dp9rwfybqjbrb8gt276k27ysfup1n7mhn9iv1qix9qe7ek5',
                area: '5sjmcnmjl0d9totack1yu1r0g2wm7zktlw4aa67dwogu2fqwambii3o6xyugmgcnfz7e1mj3te04shm52l816mdypcoo47kxiafl53uohtgbrammwu8ft56y1j6jhht0fpyc7ltg3dcn3ejy3nuwu1c1iyfwqpcf7bilmnqmpaf00h6hm9jdxqh1kgde2gj51s0hmflaoi2degw03hccbd3036fown4o6413fe21ejy2hfenybho2wmi3c7zo23',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'ge9mq3qgxzvop0ccedzvedmeduqq0q4xu3y3u9v7c7ca13ctfs',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'fxn32c50p59wotwm9rl5',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'z2e6vadkgnx3d4e9h2ysa06i4hh1gh8ht3va20m1b5ic44dk8lcd8wuzmwit2zmgj5nvsdvyst453458eqols689zlmnigslil8j9nbnojjz1ftxpuovymaf8gqw68cw4skwh58h7prgm1yl1jdbpjcw71i7tztt2qbxg0jg2zqshedlbiv130hm75cjhx7kolpixdzcv91p27t3fif6pqkrmdifimimz8gmv6mzzownnmqlonrol29sp5pvb7l',
                name: 'k6va59ui040le25r50f2erxl49zbtm4w7crzk5b4sbcmovdfbvwvs3ao9o1t4p3p5eqai6jl4gcwp2jl7qp5f7vsguwttuftb5rzw9o8rdv7qq4x7qk402qvkbs2a7dr26gsw5gyg2hit1i1z9x46xe5nsh8p1az52ok05l4n9bp20rt0cotw0tl2upnl4j5rt5mlxz253w1suqsy6ntg7n9cpaxkco548dsmmv8j24zrx63hx7nxlnrvxae16p',
                surname: 'jbvmmmue7r21xfu1vv42knwb2ro6aox55oejf5h9k3tz4akp8tf3n17118wmfds0cp8djes3go8hp2z56eugtkk7tct8rohu2ir3g9goy7yrq98id5cpab8jutdwgxtwjeqi2514y4vkc7b5ir790rza18gnzq71erv7zcwpjq5dqxy909f9eukcqujlaf59flw6rupknld2l9nnktnqy5vt08nnwxn618q12ov21saz7qflchj69js4e1gfzpwb',
                email: 'elfnhxirarsxsg2x7hcqtyrnouk473rk9ouqky3f2d4oqe0msckemmod7cpw191qqy5thlg4rfl90xcc95fun1yg152znmlm5rk06twy63z9i5uq94557nkh',
                mobile: 'suy7vgtv4xhdousqk6u7kyjwqzyriqrb14ecioav5y9w8o40i8xs5nutc016',
                area: '6qzqszd8dnd2jr1gv2jr57vhza4gh2bx3yqt5q17kualibonigowbf3ml8530z68q34w06rq91fhmykbwg6g49e9rqgwmwlptrk4u69nue81y2k66p64yn3nh3hmivpqexru8ewyfjyabkkajufcrn5043cjkdcrejogjzjqu2665vw7gnd2j1j8pni2yz7b7jimiriyen6ht6z0ua96vll5q1kt4t5638se4jubh4pe4ud2902ez0gk9gihp1d',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'alhm51musqmx2wak8fdd2w63q20up4cats5afwwylkmv6n402s',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'ff2owr8az4ryk7fu8ufu',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: '4f9xnebes0a8s25yi1d4703dwzu930qyvzdp709mund48zvc2l35szgcypu89i1h51l3aom4c20rrpguq93mm2fe2aq2k88f9h2nu9bfefx99r5eensrrl5e3ldc842t4kjeb44qbzpqg0e1set7av7bu86j5jxvowqd888y6ttdohv809ww4cbxuiw2dog82q6bixy2wt0lyrgzgm5ik5f099waq4sycpema7ta7jc2fspbw5z2n6gcq8zomwt',
                name: 'a4q7jjy79i4jzv76sqbfm0u3cxoke6zur54nx43i1kmohvyldzv4fh692ahe240yqrbeosh19enf52olmux4mlfgdcx6m8a3qvk9ob85db0dg0yxey2pzjrr8eqrazg304maaui5xrpv44v6078ywvd921kbqqfja4bjxphnsth2hzxbc1itrrjkw692tccppoh6zqxuwcpgxgbxperv88zvrffa51rjnqmvtlpb16u7r464pxx9iok4r2u166z',
                surname: '54ow6ilit6uodb7f0bh8jxntedg2q5wpcxxp1o46zuofw17p32qwdub0ms10pw4e55fnxg06t0gka2l2vyj6nmn1pao4p3gjg5d24s5alli3k1pxzluqtnveqdfmbwqmxuq6mdpf5p6rlgl5ejblm2qv48262688gqyv35hcg8xviep24nyde91ri7vmmraega3jbphpzrntqtgyzx3xli0qk2qxx438w349z2ow0tb79472ck22ktobq51qlsp',
                email: 'kxbsvnrvq5qwrktzgj777ipq037a1bclox70256bj1tbp7cf0g6hol8gmc3gg5skysszl8zqqw6zdxgpmvwptmchly11gc8dvytse3u6w9umt0mlbyz4ww9it',
                mobile: '3oci2bb75f3j6uc4dzop4cben18jiku97822f8hzvdfu4wn5f7y8fuby6iz2',
                area: 'bt7983k88tipu5onfj6blsadgol6t7jawo9pwtymi9rwmm4t12bqygem6z4g80roq0xt76e1xe702amuf0wgr83elk02clipjfj17fw9ij73n5i1cq8s2expvdljcl6tt83iy5ogk9kf92avc232l6iwrnjtceeobfaq1az6iigta1jxas6cwzrdct4gfvsyf28kl86qlsuegfocm134r4k0zzh9mkp47q0idxks5tvaw2qho9fdyi2km254um9',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'nte36iql759ii6q80bhouzokhtjwbkrygb0s3qihupwrosdl4s',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: '2gfg9q1jumx5wcr2wval',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'du12zcg9epc69fkegb9xa77lxta0pjh2tgm5ani5v6r8nocuea864ntgdf2o3bfui3eivw6jux4ajebl3ck923zpemeldk7a7z5saafwm7zmnakpewyx3bmmqzhw2n1fdcxqtmjau95ua94s2en0v9wtqqr5d6h398k7kf6267jggrt1mc50q71sqmtop5u5bw3axlvhevxebypos4w1nsxlgfiip4aowhbm4cz34gvxvnjalhe04fub7ref0hw',
                name: 'wjip6y2ur2h4hl3jmbyjo06wfpi32mb26unulz3upxjpfecqij38uuvrz1twzlmsncrzot4l3d3i4a4lg9pidbvfig8khynjn9wftxim811cs6nj2gcihs9v70rm4y2a3tuwyrp5swk6ldfmcsy0trweha5bc2bvry2q94p985b5ft1lx3ec1qjlus1c2azugfapm5pblqodmmox9riidglv7u2o8cjz9oio1o1e22bha9b900y00h9siw5ipem',
                surname: 'elt8ipsvu6e481n2441b81wjz3hofc1zwjvr5jq2p0gh7kpcvirtysrkx65sxx66x5o6p74xxm9cq8suz2pbyh6wb1a8s52d8s49vlf7bg37ib1ed5jhv48n6ir9w1pd50krhlcailrqq7yctzo4c7x26e49tsbwkqlm57okxz84ymt6prvwh8f87uq3bog329pi26uppso4kugr15jhxe6q8k7vmwhgcfgepkt3b6lu13jzc534ypusbj7zyta',
                email: 'dapv1c7yss126zrgb3k48yu0bx5aqm3avndaveigtw58coocbz1sivuymfs98wb8fxkcbpsqvs7p7w5j42tlherfbxhiz62wb56h7ano7h74trb54onh8jfh',
                mobile: '390i73q878h5mclnqvrwrga129hecq338q7ev4yu9jdlxn9fj0d7c6fapplxi',
                area: '0stj3yu6i9z9d1glpn6b5pkyncy6dlv3amq27whlid782pt3y994xaeyx4uabq9bz0eaf3v9x7q7su217p4jshcb2kscm00g6ngijb54fzpzoeo76zlkno3yrdwdooihiwy05lscky6vmib1pluq8jymhh7nz281v7sowb9mfilc6les7c3zyzq6rzy4q09x4dh9x8bmhfsv0qhbcw3oatmwr69r4ifaf4sswurilg9i2mq1ib5ahopgpuwz7ot',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'pwuoe6zyy3s33s2fr4lavf0habvpkhnigi5xhr08vt1153r5j1',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: '6gba22skqmhqofei2lrq',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'ae0g6lwy3o084jn8jedvum6yrms2m015tykwiiti113fly4onk6ql45387kzbtewl4jnlq491hnxoghfby8behdc8mgwgab3faojswuio05cq432lyj15f2vtorg1vby1ljyud5ghicckysrvudl1z9pzhg520mc6ewjuv0eulevc2hdmklpg2yur13a4635m5lefkhiwozsqrgxlrursqk639ayxi6urg1v3lqjst89zb4t28uklxfekvjww7d',
                name: 'lhu9cvd2lu12xwp0srtdfi82od3q8o8w23o8okwk7c0vcq3s7g6xm3dofv5f403ike2e7n6c7hhg4oeypedu2j44qbs8kdam7eh1jr3kt0pwk302ew4dwq7fckaksamu30ib1l8rgsm8f9gz4cw61ko0z1iaxn41wq6fn6ag74nsjele3f77r2hdo5gjhh5v8scgq02b2ksv9snk0222uj08ngg9pyzuh3b2upyiu3ldxdkumhv0ulqf6fm0a16',
                surname: 'b9ctuzvi39s88w6akcjvsgbq4b7p20ya89zlmr6svy9vdbudnhxiyxe0taivwhgkpzc21rp7dtmzsvx642ub5ua2h7tox7ucci8rcqz7i6uqhhrphj4xyoforzyfxomwoen1h1haqa3doqghbfhqesnj4bf711ol8m17gfi7nfotmdlhohouh0uat4yk2h7xr964o57nw9cpk3buvtcllv2civxn08caggvjom6gh7cptju57f6l7b6w8i6yq91',
                email: 'fn5qxkbsdq1hsdyo6rx3m66lyxqo6sk36wr7nq49zo0lgj8cxm3boz5p5pzps24xulapo1k0qwaqshqdq81fsvz6fmiw0bziexycg4119na4fz5opzze31lj',
                mobile: 'ybyinyf1wmlk0jx79ulbr6yjccc56q3kjsgtvyg8ti7jm5ygn4eq3z7qf09a',
                area: '4t8lib7vym3dz7m8wcqwxtz4oqhqv8ou0dubki3vaiqyqn96mu560s5l15oz9ql6zfj1bgoxxe9qua3r01cnivpuubz5f3cwxslull7rq087e34quyi5msxvn7favlo4grulnzq3ij2lvlj2bxsksgqx6nd5ulj14btwp3p0w806ndtxqjg7xzjccow69n66ph9rdjxcwp2v8o76bvqdw9eujn477hij0mbs4bfh8mi5zh6npi0meu9kshdz2uga',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: '26deqkhex6uqzkrdgaa66esavtd6u9o8yqya6joh06pgnkhdrq',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'tsugdfag0kecvzvsbe8f',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: '0f0qprs31z9f1vbbp41d75av598yuyuclaioypk4b2rfkfrobbl2k6qjnbacdnwto9ijn546uu7aixl9s8ipcz8et4ovfiq6g6pk6lb56kfjrpq5j8en9ogqni572apwdri1fswkp8mrpbcbaaddiw81yufzzf506cwzpp8kpwoitsn7pd1qon5bvkoqlngnwuxroowpfw0a25elc25ivqccpzoe6he6t45mstnkgwnaag499trvxvb2h72v4mx',
                name: 'h803iby6xf8zfxpxa88k4hun0cttkx4ga9147feo61sjh5gfd8cwi6pppfrkmcivv5izdv8ag24025e072klko0xsl0fd8ywf05lozujmsyknnva6z0s1p1uqy6522x57jgov09olrusikiytf7c3uwlb2mhabc8t5vo1994xl38mwhbysmqc0t4t23y1xagj3ncam48a4g8she6gwfhw24sjlteyev9ch9q9iu3p4asflxordjv1l9cxvrromd',
                surname: 'x7w3enns4b46f3ve780e4dkh44kunk5pe8qxmuolh5gy249d2rzwkarztkuxk3atz5lmtu62ilk63cm7c9vyvcd8csbm8epsrq8mrp8ecxc6z9un9pbhilr9kizkhlqjhbgs65fzp5cqojo9ik9vypj137yu4xsnekt2x4s4mmvxmccglgj2cb33e1uih29mb8yy13d8zy1q8pl7og7azvuk06fx43dlmi0253s2nhuz6yibbfer382o25ilclm',
                email: '8fva1gw2ipph701a7z6morwq10z6pgkcaiocz5y2amdksdfd9rpm5czdxg1ww2pcbc2ce1npa8fc86c2mi6lju9jlujxxblssbfulpwh9gn97tk1xyrttl70',
                mobile: 'm7fibx171jypv816s6w26knqel9bneo3puzx0tft1njy465n1yfr5layfjhu',
                area: 'y2odvt7glbwvdluu9k265n32p9nje3mb71w5ey750iq980e9cmsu24ol6zrzegeznde47lzj0ckatmru9477ys4if0qs4ydr6o1zm5porhc7hp8lzjd6o2xmo5pemdv5c1qzvmlu51cfmuit2y0165129h6wzb2s20kw0rm9tm1fea0caf7dcsthwpr8sbhr14gbjxof5l8yunt39vop5420ws8e1th0a9tmkxf2082j6758t6si41m5tpqtp7a',
                hasConsentEmail: 'true',
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'g9cp5gf31hq6b56tzd973h3vwdbi1nliqm61ui0f19ubaq6j39',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'zqpjz41z04in49jz2i2f',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'suzdgb8vgbdsokbvlbabytcpv9gd1qe1w403mqviz6e9um2rmkvq7yokeelzi4eg8ewzchzspltn95q6k724jrx2j7ym0sz36oaw7njo8h4dxhkxo39o3ia89eht1rffhvilslyoojsn1l63vvdztsujrbda29ip7pult5aqsmcieo77uxzmqsi4cmjkj5bxiswbvsoljcnomzgu6vbahabq9dkychfuaw2vuxwnni423ts38voq6dp5ywmj8yt',
                name: 'o3r4t468to4iyq89062nmsvzrlwkdzj9shtnfvwxdkak2khegde7haqaec2mriobsihb02cbtbt779ba16s3pglcve5lwe9yagiuz6v4h0cxyxg8oyfqynolrkbi56gqxubslkt0vx4wp1zjp1t3d3qdz4vwwog542uytwr4eosh1e4hdl8ggn39c0zkcog2gimyhl4kij3ugmq76qlj3h63jrlfpym3hr04mgi2u57owqcaz1nv97jj6vlrszk',
                surname: '74rgw908lajfgl2q7ulje4fe4t8rbr4zo3xx8w0521t4t9sxjz5bao73pyqa1xf36d7j080im5g7tnkx1so9irgq42tbvv1x5mapefvrw8cuuxa2cawhsb2cshh36mlu1q3bvtyn0vrmzx6z0gf0g3wnenrf6bz9ncjib5wxpbkmpcuyrozlsmym6mm906cxrc1ujk7gbcs9zrdpmob5hdipqays3zvvm83rsuwxwlwppzmyemhd3cwj7kvmduf',
                email: 't0ds3h5wczmlgxtgvsd93prleno5xcxlfwxlig2mkiwbh7pwpki1zsdf9hblc7cigowk7qwltgaorv9zet9it67t3r8rc0slylrs7ajxjakxuipgxlxnft02',
                mobile: 'y6cnqh7vomvrd650g7yrki6p7osmr0akshn4yo1aseqtjnc51as0r3koyi8n',
                area: 'v5bn8iy6q2s0bmq8bq9xda1tx8h0wclko5o0vz1kvxomllh1vutu0b3x40dmaiuunute7iygbxibxb1ko2jp9n3ntkhxo4bohs63hxfzr8lhkvs4vj8vga082w2nmsstbr9n0qz8fjjn6tmvi56ubbszmht68w5m3qbvux5rluasobysw58gmhsdvwa2mgvlc2nel6g6c88du10eerjnqrit5xsf68ard5e2gt3d5l1z6hiui3z1lsmlmrrxnyu',
                hasConsentEmail: true,
                hasConsentMobile: 'true',
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'yt8kpduvikk2gbv3j6in1dll50r9c8thl5jh0c3ji6d34eqs09',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'unidk1hkrb6cvgke4zsy',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'j2lkvy95wlfpi0liav6k467d7w79tmtj0xu9tvn72mn3r336nsm7zxnz3g1tq38ebbpfvbots93zt6h4gjccj34txi9ecifua040snj5nycisf6vzzga3scpj6ge10s5dt845n9lc0in4kst15utc6iymochf3jbuhhlomcj9iktxydgwzvny8ivumjqrw5mb1ypi4jtgi4f48nhic6v86vul6i0vw0gpu0hw3i1v2g3mo15ualmh3shaghpk6t',
                name: '0rtlgscyyu8jct74bngk1d1fgj3jc2ozetg6iijr6xqjmo2qf57veiixlz4ar7aozrgd6wep7z2r5rikkordqvqcpw0257kuf33czfypljs7uh58onxtnloxu46nw85n520pd1vee2facdblr4ngnjjhwda63x0ymvkg9u7glw8qchlojnjw62w4lcxifsvvbaj8cvj6ir7500zqbwsspi9twebute0dmsxfkogh89o9uj9kdyt5d8jks4bap18',
                surname: 'k07ibu1jlttxkv15ihe5bez21atiz01jbizvbd3f3h8c3umr0hs01f5ap1fxkcg0izowr0v3fv0j893kmbtg3jw71xxjn61nrk1ajyjnpqoethow3uhbkafesvyhhndxusi4otdi42hggczooww9wrtpb3lsc58mdf8zs3w2e75hpaqzw1gd8a5pna00xobwg4smbz6kovpni5rwsoaz4dqt54o9pwmariqp36bvsfnb0jvpm84djbphiiy5n8a',
                email: 'i1pjh6p791oz3oflfl9p57rubizexov0qd144ens5mzj9d1v0pli25zigekb071uqyd1vfo6kubcu4bx6tpzibc19jl2gutlbdlz4b2xzpxzg9jrka0tl6ps',
                mobile: 'tuavrkb573dxys9bfsqoro3grfgnxvpnt3hcymn1mx5be7nsh2584x8newaf',
                area: 'p1efk47nzy87xk3bl3yf4dyg9veoaldg2abi4fu2502keaxg3ayn0axokb158ivwqtq2lux3jyaxdbqpgqbl62e0jmbh1gv2mm660fxgezkpcc7h72tngsh6ohj1wcqzipxw7g1nwpb6pdmuoaks0v70a85fc28fc1f56n0h9tas5rwoyf8ntt2ywpygi8wyh411rrwseypsvyirvfovguxh7b3wgk502suhnne6mxn4qq1axp9unwz4jxg1cxv',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: 'kpr6ghtmqw67vts3pmdhuh8j1dpzif5wqa2w5aosx0xd9qbbib',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: 'f8qhuzqadxxhldyhhsod',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: '5wgdniyqcae2fggytb4vcgvtw6xl8au2j3i0jtrbaa0xzhv5u13n2b6k5bxhxxedpewwr9ltgl7l76wxznhclyjdh1xbv5i0t3qaal7khk7u1tqek3om0f9ptpnptb31faglam9ss8t5nzbh785d7t39fpdygk38mysftquwyutnhsp2y43pugbfa3j002nhov7eij44hcydv7f1rfag1e8vkvy4i0zhngx9l0xl82bruy981qzgs0lpa59p0nn',
                name: 'mf48cm8fqt7ddjz14au298gpe0hnozzb3e5tj68szbkzbmfhb4z9c9q67fpbm1fjbi32lamnt68ju6u38a0yog9j6xixo98bg5x216a3yhqz318klinp4gp9jm9z38m1zfh611b2ns3v5ssjmt1arxcm4xcd9wjttm58xp3wcnssmbuysba2nief69sx2nkzpy1lf6761oz622gzzu2f0upx1ykyxhybktokhcw131ve1ny0107nvv45t83qka0',
                surname: '81n26c4ov1rurgs6f7ew83j8oxf072mxzllks7y3gwu3pw1t3rndvlshflx8dvvgdfxshoowzro9e0onu0xemrw1eooqis3j3ymtdtp8tui7w82ydsqvwcav8zylrobcwsft8cwyvw4ojti9yz8zm4w5fqio0fk7yth3y6v9p22ic2ha9qxum7n0f97bn1eqrpt83xejh3x8fhpabsdpfpz7zq0nw9f2d8ny80xo9iun0a7jg6iufgtov1lhb3t',
                email: 'vygjolk84xg8xi6svvf75ojja22zc9divsy7o4mcgi05qricssax99t8eo0swwk4kx1g3pw3s5bbvoruiwfwjbxmc7rdggs05ad9b7y3qu7baghbpzf75zu6',
                mobile: 'r9d2b3ri53raqgqfj8s24yamd9cj1jxamb60bdr0h6j6nr3w7bhoxzud8hgr',
                area: 'duhm6ldx2e2ovubjufgigfo4rumu8qbv2mu7rjnabgo5x9uih5ksk2aitvhubi0ljtxtj90hkj70k0n2zfpkvzii9413uaypota25mp8n4vw27h0apv39h7rt9lde7mers8bm614qotygsanj6i1trsy7cs9sxysd7g7x6bmwbujs295aty90l6v95cprqftnpkycela64df1x1rspqxjwjc5lkelsw4ka5zx34cy3txwuztnid5gi8t8bojrh0',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts/paginate')
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

    test(`/REST:GET bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
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

    test(`/REST:GET bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'c300a290-1bfe-4329-9384-b1626fcfece0'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c300a290-1bfe-4329-9384-b1626fcfece0'));
    });

    test(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/c300a290-1bfe-4329-9384-b1626fcfece0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c300a290-1bfe-4329-9384-b1626fcfece0'));
    });

    test(`/REST:GET bplus-it-sappi/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '014f1345-5f07-4644-a84c-a9ec197f8de2',
                tenantId: '1ccb2014-b3ab-4bb5-a240-9e5f773292f3',
                tenantCode: '4pffojwd6urlrfypwnuk6dfxbdm5zvm99mw1nuasqmezt8ngfx',
                systemId: 'b1dbc842-659c-480d-a6f0-435e8d9372af',
                systemName: 'bn3kb4a4wquqiaf2y6vx',
                roleId: '3cab30b5-f0cb-4586-a5a0-cb6424421ae7',
                roleName: '28fwq103lunwq9l0u2a0b8ugs15eyy5ncdv17xb1zilgx7ocjftitziyzqfvxldaswxelle1sa7x6nok34hk6hnapxufe3bbkqii2uezgy0dl2vdadw54lrdhqxko2f8zzsumanryxbrnc1foo0fc64zkl39mp5v503nw4ogcc5dohewtw1k6rd22jaom1j3t6yug9amjm5ggxj3oah8i2llz1prkp1i0qzj6dkvu8jnc9zigrf5w8h8wcx3f0o',
                name: 'af5cbo19ca9jmdmef12tpqx9dpep181xak4a2b665x21ont5fwaz87ssgiuddkvh0f85ln9rxbavdjznmitc66fbnt14jz21wmrkzb42yxqt5cgxd6ubje6ox86riyo8vdy1cv3h6rst6e2t7t63icokwym1wn5jk4f23qofezqsljbx4eqyca1ayg2gv0kop4oulllpdn5majbq53ip6ya6qoqnpya0jtm5c952z2hz827m4yi0wwr8g4i6uhn',
                surname: 'n14v935t5e6dnx918vepeacrscneflzxjuahpcdo2yhdzb6wdl4dx4zoxg0r2r77zq9denkirjz5ipnxo7hzoyzbamy9ebtunc06j0z4a1a9rtqjo1aman4h675ged1nhh5urbhva1wnk3ais1vf1ryml07ktuo1y58xqn0xchp09jvd28gp4t32lz1laevjqik50ywxjqywzic251pxifboxigvfl5eayj0kf1b93voywmk6z7qlvkzi89a7xi',
                email: '6jyo1jd8jisvzqk12r9ugu0u11ol3kt51bqe7biiuskagsfvo30udbd9id3uru2jok353br81gah5ls8odfm4yej4s0l19eixuvludwz0mynsy5rodceba8h',
                mobile: '02dfhh4ltxhl8wahqo8c8wq3sfeshkwmsmqi8h5tljz8rjavbetkgwc0j99o',
                area: 'bpnn4xuktpbpydj5fgvas9rv7c8vfmr4to3qt6fv3lh1lz6fbk6ibtcbtm1914e5btwnfgb8t92zw7qixapozszqrcygi1daqje16ux94k9m9s27ncih2m0e83x3thiw53fbwatg2v4kf4dqkkcmcfsq52fxglcpxb34r4vg3e38f515tr1adzew3ztl0z1mx2qnqkbejvi7sa0u26w96ge2l8y88r7l3bttneiwjv1fqvm8fpw73jlmrvsg8rh',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                tenantCode: '6ild7jel1iyn914s43iedj7sib5ds902f4ef5kr6u4r20w96ht',
                systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                systemName: '389e9bx83zxp8agna8x1',
                roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                roleName: 'au48593efjby0l0e4c980ejrmnwu7j4gtdpostzvj0ddds75i4fn2hivbh75yif281e9dgx2cv6x5iyvtmfgbm49ycvl4vogc0nbyq8zc7s6pst48x7h2vy3q76ndfwucnh42wnvknk9jycil3cgzdqqwzfyw78anyko9q78iz83y21hj94o06zxubzmb1dircd8obtwaiqhogrhth47o17f3757vlafw9ua28d7s6ny30zdkbd7wb4c8hcczzg',
                name: 'ycxy3x0b3zdy4z3w87df6ctb1mlp4bp4tepthf1bzgfsgmd9pl8o33zcks2s7emm0bc6hwmp4oq7dhj242q3nd6nom08r5hldgkkl4ktx4gwftngm6hubbe4g1d0npaliy2e37u5vv6e9onx23793k8mwh1pisdvlagxd0rzudsq5z4625gudse9ilmv9ngst7vtxe5ggvhr98z8xteocbwsa79f6nrd2j964ozarq57tgbg9bd6c4gunx94p6j',
                surname: 'lgi2qfwnbsaimpldz7fx8jdn4nz4fe7ijxooj1kw24hxammcac43ehlmg73m62nub4po0mk7d3x1rzqeag7ctrj845ju6t8ahnou0ljc66if6nqbon5rxzegz17qcfss3kdxmplmnvu5wjodnfvb0aho9iyekbyek7ozax31u5b57rynyeqso23zf8cwcx3uc935lvgu3pgwt9jeemqkty7dl5tzfmeyhdyqievz12o9l7tomsrx7id18mh2lij',
                email: 'b01slp41xqjbnuhv4qpftuvreyfa98um44kddrb6iyx7oufzdr1d4ugz8xltlc4vl8ip7a28ir92p8u1gk0b6f00tgyuvayetzri1jpu4y2t74i7ci8q2k6t',
                mobile: 'pc6bryk21nudn62zu122fo4139lv3rnuqgm40w37corajqbhi932sdl5craa',
                area: 'qe80x3wbjz7rnl45905fb1fifrfftwa9u59h50u98wtbfk2yrwjjkir0ukgeyqm2x69ahz2g0d2vjq5chfe016vvf9vs4itwqlwh9p42e0tvwmb3yxbxt4ei3n6gue90ogrfqs7qm679pfyvsn330n3kxaejqk7ry22n2engbiwfd96pr7te9475e7g9433u3o8zo3l50m7pc4touy8wwwyd358yhz92l6pkja5pclixrfn5qpwa18uou7qodwq',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c300a290-1bfe-4329-9384-b1626fcfece0'));
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/c300a290-1bfe-4329-9384-b1626fcfece0')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'a1cd789d-4ec8-4fab-bdfa-4cccd326b9c2',
                        tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                        tenantCode: '1g5w11umswf0xkasxdhl2zyjfobzo0ha5tteryv810ycqhn9sw',
                        systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                        systemName: '461vbrhkpyyxzxwpcyf2',
                        roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                        roleName: 'iq95tly75dhwm9l0u17fie2ti5skatu73f9b1w8sn105e88kz7thdn5bofet1hx55jvwt8dq38hd63qo9jw6mh1p0mcgf4ofhnx2fxvinfveo1bx5c2jmh4vfkr5wq40jonc6fdz86jtaarj3ynsw19lfihymw586wizm27lwgkfkw9efaesqffyttp495og7o4mkylnej1hwvza3icxg0jcm4ftuvnfga8tqbdjiengtuclhbo3a970z9adymg',
                        name: 'to7ds5ahc8lm3msvri7zkq6eq8yplv2eodiukh8kej9rg6r6t0p06p7w6jvpivlsktjeulog0yaceaazly2bj0ug11uh3hzqcs7fw8i6kft4peja6185vo6czw343y1b6ciwshqdtsugsiao3t4q6tygdchto0eiqm5l3wjo5d5d4dmfsfp6s56djqugswp16t6r5ji4fa20qjwtf1fqnax1icaku46gsnxsxwx1rt1yw3e9f9n26nlialaebga',
                        surname: 'hc1njytudqpllxxj7gc6exon22socdcejpp2p3l3cceuoyy6nynlbr6w4knoqs7q34j0qinujv03q0niu99mktzh6fv1uuh6s2y2i6aoqapfr1xuu64oes4jopq42xqazzjgoooze468lt3ty0d9tapkzuv3xr207675lw2xzlr1dws8mahiyqtd7hw4v8gxzetnb8k2y6ml1ilifhjms08u89li0p2q054f5kuwfyofpt8w3jbcqno079uibxf',
                        email: '91w1wi30akgm41eq72pyademje9oqynveis6lpvv38anbkow4cpdr3e1526ehms1yfp0g0dkorl65av9bxv2bxhfi2d9c61d00t4n3alw3gwzu92wz4x23tf',
                        mobile: '66hni9nx1629gs7lh6xwc2cq067cum10wa497krkb45bvllgfrduihvjgb3c',
                        area: 'yvhhzr2mg3pp9oyaiag2fbf8t6p3729blkndmje0pudac5kc6ypbztxxovx1pqk26iu354igwj6ddza9n14734vq2j62t5dalg48j97p1zngq210oxa8fiikzbwfea746vomczxkecne9xo1kke042rkzr85sflky68wd9swn1hrsuevw1hpgkq7fja9slobmgmgb7n1g469gs50rhkok6q6i2vzfx7uhz0f4070jzz98s1kgt08s7726cp8ef3',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', 'a1cd789d-4ec8-4fab-bdfa-4cccd326b9c2');
            });
    });

    test(`/GraphQL bplusItSappiPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateContacts (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                            value   : 'c300a290-1bfe-4329-9384-b1626fcfece0'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('c300a290-1bfe-4329-9384-b1626fcfece0');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c300a290-1bfe-4329-9384-b1626fcfece0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('c300a290-1bfe-4329-9384-b1626fcfece0');
            });
    });

    test(`/GraphQL bplusItSappiGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetContacts (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd0f61436-7cd8-41a9-bad5-7909695f37c4',
                        tenantId: '4391151b-cc48-4b71-928c-dd9b16d6a450',
                        tenantCode: 'hug255eybj1253jlnegv4h4isaeq8dz54htidyiw4fy11cglgh',
                        systemId: '5bf5cc16-5e3c-44c9-b4c6-dbab217249d0',
                        systemName: 'by2lmm7cwsoy4yuw2ayx',
                        roleId: '63f251b7-906a-4308-b124-c77c988c2484',
                        roleName: 'vw8g3w51oa6o37vpb4uvdac4y5c8i8ybbekv3nviwcnlel4im6uvvu5f3k3bshq3922igwsufsg10djj7kf1b4ozqhdtmw1k7sr59rakzuujcwgrm1tl76ecgb45mnnl3sfmv7aoritt27jdb3aacd6mmywyqn0m5ws6wycfn27t8na95ftxwipugqj7a58o73ys42txz3zagdgfboe9qjztpd0x4l7x5uv9zyk16lyfo2s0uhrl8b3393o5kgv',
                        name: 'bjyjjlm7aze9cr70564dgk7ke635puz5xs4nqaxhgu7l7yup9iwm7aea0t0wo9b8jym0jkqir8sh6nad446qgovt8gr321dbbc89kclrqnguomsdp3leqd4dzejfgooftvrubfdkfkk79bupwxznsmpi4txxwhn6hccb2s5ram0ghg4n7fco3lue8gft795hidob32cb97qffvdkiorvffx9ca5e3r1ssgm17znz2razfrq37gxx893ik2y4tzm',
                        surname: '4y0c35lz387z9mu7m7ugw6v40dhuj20vvw8pzqbt9mt7lrkjngfwtkt7vrikmfwnab4hwwtvirgoyqa5iayyrvnv8sjw57x1171xoh5pz8jnpd7v2kdcgutmd7ixc85xowqlvjpbl20ggocnz9ix684q2hscfpbw52mjt3uzps8444vfvxmxj9iy4ll4q5en13rlqct9kssxn9y0lfa3ayohm3t7isxyn678v0onigphwafqpeyh7pjyyhhjfbm',
                        email: '4sz11uwwsfdcklr16rx41sbn3n9ypsm8sl2lr76u6p192sfox5t3y21gjavg93o4cvk8xm05186vpglwknelibrc8lbv2ctbr8nemvm1nmtanwas3uzayljr',
                        mobile: 'f8487uu0mxv5doouwifd3g018o0ik6htouk0x0t5egvwz51r0343wr7jnst9',
                        area: 'rxg2cbcoyhsxjtl3c1bcjocbibf9fg4q7x4txklp8bftoemqvtt58pl3fl9t0r5ymn7141g88cg6snx593s8r9u06n78ljtg27dx236a90aqpubwbckrh8occfmbevz5mpj5xe2bjsagynrtkw267q8z6zmylrwnn2zwvy0q0uk6e9uduyfulimmry93nj89bzreee707f10pq5qreknw2121egnq0kyhly58m8fschlyxwqbt43m3ixfbvy7es',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: false,
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

    test(`/GraphQL bplusItSappiUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c300a290-1bfe-4329-9384-b1626fcfece0',
                        tenantId: '6a4c3e39-3938-46d8-be10-02ae6113b5a5',
                        tenantCode: 'w35qc1qi8duvi9zuk2x6srqmx3vyvmbpbfm1bdgrquutlvz6xv',
                        systemId: '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8',
                        systemName: 'bymb9x2z7jmll8nrn9ji',
                        roleId: 'b1279008-b3a0-4753-9fe2-11c1bd1b9613',
                        roleName: 'pa7rdyvj3lu2d0fypefbcyejdlrdhc6cl2bj05rn0upgzkf5j25d6py9qb00ug6wenj2jb5tnhmu2clbf4jfhw7gwfi9gt2mio7lptx3ul1kfmlo5l0h5npiww8zyn9vvw99eke017ubhdmkjwtw42tugrlzyj8ibaejomyw2dffjz19ck8pye4exj5bgrw5cm5w7o7wulryvxzp66qoxs39as9vpzrpjpo6is7iwputunifup7f9fv40p60uzx',
                        name: '6cmwa7uqoiwpnzrey54msckipg8vmqohtebs4509hoabwtmtfrzkszizlujywnep3n9nfgyr96aepyqp0aim6mdes3sypelm9ok4n36t8ok05t134x8pw0xku7q9jl8d440spewnd34kb1biw8bdhw7oeb1zagnulj6eyaqukkeg8da2dtx9vnwn9zk9s1yo7ffmvhndomkzmcudaxnubn3ol5jho3vw3zjaiv7ys6094r6lgh1ukdlgtb75u4d',
                        surname: '1us2hylzih33c2bfyby5usru9yb03lt3l7p4baugafzal0jcpjdf67noxupsj9mmfggb7pfhpt47jae4nsy0s5t38dcq413nlhqbnbk65cvc78y400g4pfgm4vlajeam3w42mtropfxphc83eg9aec812d6ockv3ofjoe28gvze7zsg19wcaiymom730xenlz938enhd972vk5tekim9748j2zw8vizb3o2dh5gljth5rsrfmxq1qtxc7gf594k',
                        email: 'nrt2ohs6fgrks7ssjqn1ihquhdsca9cnk0au0q5uzhtoeunw1resjlktdzgy4f90n4ozvarfuye1ymxgfs7vmt7ljns3cnh1z8rmofdwqhgr6ts5r1f0xg8d',
                        mobile: 'x273pncalrp1xmlmqlk087th9hyq3uo5bw94dcl2m477ngif4ej3m90zdo2z',
                        area: 'n2fo54hr1ril7c775flmsgysqklsmvj8346gs5nccjm145xztw2lukhh4a3b9u59m8yfkh33jl3cly2b1aqe2himea6o0wd5wq48fybn8qqcov8e4y6kc37xhx4rrfnnugqvitx236yqon9qsqxcxsq98oskm7kskxj9a1msoc3bjf27tvssby9hinz077u5mav0d34v7iuitih30s8noicnyo0fvyi7l6agc1asw8doangmam10kzpr8kkx7nk',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('c300a290-1bfe-4329-9384-b1626fcfece0');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c300a290-1bfe-4329-9384-b1626fcfece0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('c300a290-1bfe-4329-9384-b1626fcfece0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});