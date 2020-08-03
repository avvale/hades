import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/bplus-it-sappi/flow/domain/flow.repository';
import { MockFlowRepository } from '@hades/bplus-it-sappi/flow/infrastructure/mock/mock-flow.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('flow', () => 
{
    let app: INestApplication;
    let repository: MockFlowRepository;
    
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
            .overrideProvider(IFlowRepository)
            .useClass(MockFlowRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                hash: 'zgn5nd4k38oa2frbkpvn17cle79h7vyflr4fckpx',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'd50d8otvq8cm80qkcu4naoec76j3ev2b5a6yq5zkrq2myl6zz0',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'xwqb4z8rlclvdn29l9pc',
                version: 'xmtbtaw242isaj0qzoxy',
                scenario: 'oglc5d1j0im91rm9r7hs3ogi6bdcz73bnokekealiuxh2r1i7l081x56gm67',
                party: 'tbef2aaj2ol2jdhc0zhhp3hmzkjrvyyf72abmg9el5zuo1gbcyqm4o4xlnht89jv36871b93lzeqt1hdm334yv7uoczgtc6kit0mvmeeru6u5lqwizx2w3l1a97cydtwsy41z47dbkufas0mmbrzova3qddfkptn',
                component: '7t0qi1wi9rik7rswwugmcmqoim164nnzryu0mwv8r0gzmm0q2qoiusmefht1c3ma4cb4wgpdfk21qkaxcvyhcpk7e5emd2ii0sh3agp1vys6g2scj1yzi9hv4bxdk0xlvxjucb9ngnwbk0g24m115vsahnsis12q',
                interfaceName: 'g21xkc8zgeq22o33e31225go3ty9koww08bq3ikigg03ptuzb6h9y72q8kenwj12dnhpyytt4vxao65i7pzylphgtheck15fb71ygezz09x1epo1t696pohbngmt6882fjmswb5be6oabz43fiu4veohfj5d0xaj',
                interfaceNamespace: 'uyc6dy1kdsy9qai39gtcmpb10smnxhun8v1km2y7zek6j876sdno36y7gzw2nrv7jtv85njupjw63gua8m7bxbiu5lhwukgerln6m1pmxiixdr9m0k4mh3qtn57qqrcl8a9y8bnl5xfc2v2i2biq0oarsafcf67v',
                iflowName: 'bwn3sqmlppbwuqklputxdw425zxfoahurgsm34qm5owukyx47mvx13tk4y0xpqx5pfu2reljq2rafu7wb2tnwz9xxq9hexapyl6jphzkjclotsag7agkaabcyoxal0amqmoi3hatnfpmalib48cm32ahiwonmzz9',
                responsibleUserAccount: 'ufphky69k8pxmhav85o8',
                lastChangeUserAccount: 'gkvqgu5xn0yy9nji1vl1',
                lastChangedAt: '2020-08-03 00:21:57',
                folderPath: 'lanf5lmox1v56koel18uf6tx2fnifs05o99lzva93ccjnadwkpe76rb0kwns23un95hs70a46qie75a0t6amnlinn1szugj0tpgxv0kukf8o6mf21dmhhhxzso866ul1eweapl5yoix2b4kpt2kdns0t9o82txjr71yjb9qzmb36v202c86ogj2w792jsvz7xpdf1210m4jgc8ox8lq03ji781buij8sc9m4xrg0o9aybehsh3nralo3ncjf1jb',
                description: '5dckzfxrfocb7defs3vwe22ar9h5ragzm06kmgab6afsxxv2mw8grnmj3589ykywo3ub9cji5wnrjwx90kxny5cdsa78b3srzga61d4ahhi1e3t5bul82scuxjgljyz03bkeihv5z1s87x1cw10gkzdupuu2wkxa6t7ifvypjuasd9i1iad785y24xh50a7pme7atd917t80nxwyp72vnkobtjvvatpoxjcgvqbu317wa3nqe9yqwyfxp8x6ozv',
                application: 'oia0nmxvpfnhjssgcouf52a30igo551ae5f5bar98xnomgfkbad5wxm02r5k',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                hash: 'nz0cbjuapsi821g0bo147tmx9925saeub6zgkp1g',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'l49xhi0zjlqvky3howa72fo02zl3uphb1daiqwrpnch2bez8cz',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'rcdcyd187iqz0z4al34y',
                version: 'vd6k3e5f8pgswhr0toq5',
                scenario: 'u95dua1zd7ccjuthxxyqqo7uhu4r366a9a8b3nmwv25q3shv4sawkja04qge',
                party: '06vfrsg6m738c8fitincx9jokbtvjtyxwisgr6o6vz55o3sd8dk04b0r2ql2jb3kl5bcspzsy6ee7gc7tjpzscx19zdq1vyqeee7g1jpqndoqxt3djb7d887enxjplyv795bl6qknk10k7ifhscbws6ydjc10k4v',
                component: 'zrrf3img6vy6w9ydegwkptb912qnly7tjplkaeugnkldd1tvhsij9mscmrlc8ggst2rt76lgo6a1uegw3dsl5sxihbheclq7mry33q7ng2e1wa51bvpgywyk95j3n7bk2ry86tr941fkxwwhuua6v3sdhvldb2ws',
                interfaceName: 'uvcvfri0cbm3llxrha0zfn13drmwpm0y5d36xtyio1kd5xlwiqqihmwij7q5trl6d45g0080cmo51cy4mxlrl3njt3pumfce131fbwxzg86nkp3yibz3q39ycj236qkktxwdz2lahz7o23j3s8sb5jzdw2zz46vt',
                interfaceNamespace: 'dgnzvt729nk1txsaqw0srnu4j3hf64ptgcf9gs7inhee6ynw116cmo5jdxn38ya5rsnyisu3e063u06ah4x514jcaij9qmzsm75hr1ik24b1xvevpjme8xsewem2eepueyjl10far0euqm3nmc8glmpj1ra4vrcg',
                iflowName: 'zxl4m6ctxfz75lgntb8r5q2lvufeiw9xlg3ynq9nb8q8rje69ngpanu8yv2kjsn23cidg8l9jtyzn7s85867xyovqohnjcxoaayj2819v2prk40x7txhmwgn6k5kr6kut7sg1ztn9f5jvhhz6bria8qlfbgfqnwp',
                responsibleUserAccount: '7nm4rp811w70d9ukt2sd',
                lastChangeUserAccount: '5w6bfe8hogxvqwsnzt1r',
                lastChangedAt: '2020-08-03 15:30:03',
                folderPath: '1f7179w7frwz5ji2zjrbjf9u77jv1c2rawww4llhy9koc6g6ssgpdcn8knwf009eauk3tll7tvgayg8qpsrnvflo4bl58a559z1yb18k8u9smi85236ie1xs3nkizx5ew5g8zb9cuu2oqvhk9z2pgn5hhyktlvu2qxu08hzs5da8ysue5o0kknify3mh5512cytiku1vf5r0gqcql52df92fux097sc09mnsfhjnamg095mpu80c1421hmya48q',
                description: 'jfsr8zvdc8gk2wbvpmw6uhjebrje0409uhiubeqqxzob6k8yaidnk5c7qzido651pw6reesvj3gqhipwzdl22c5fcfnnoxs2yaqdje8mfjtbamlw7j6o38i2czlht5s1k7v0168aeup7p33z7ezp0z7c9vyn10gso6bqm9xukfo3k50lrbjvryx05dacqbgmemomseoi7euvtc1mpfcnw3nud9ansqffzol3hqsmejcjpxw5gvvb0999jhyh7yj',
                application: 'o9hsfmprox070cmbtgar178yj7mg8lvbpvkknsbw2zjyau752ifc5o54n3xl',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: null,
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'yvppmeiz6dx4oihtg1k1x6baws3betrrj3kzwh2zpdxn8f4lk3',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: '5ykere9lq6fgpqb37qs2',
                version: 'elryu35hmaomtt95my7u',
                scenario: 'ym1nf6661wyz3y9po354h3ornr6wf6zmtbmvktvukq804gqav5e7s8tq450t',
                party: '6l9h43fdengnp95j9tfk178g330tru57bt0uhbirhzbv3njkm6y6ugu75pj0kuwfwxqveyzgtlltuo0sq7ijs5z6a58bqbdsdsolrfcupk2top816tpeskelsgw6rma4bs32vno9lly63310zfzuavxo8grm349s',
                component: '7nrb62sal8w82zmcz6suvjmdgnzpnv9oahyhbh9fpygho21yd3gtro8odx7jmk1o647vwx3fngriohva1hhj6pvmb8twpsugx06dvnp0njgiyxtkyysdwcvffhgl91eo999wzplkvm3h7rjlrw5hrhaky2pjxu5d',
                interfaceName: 'dc8jd0knewtruud42194bpuf4h0ffzioyry08omr0i8k8bir51hxguwrf3whzyssxdk3sm65bz91qwn5i2ypw0djoyr8xbvsqfm16kq3a5jd0lgem8p5ccelr7gkqn4e6yfnvn292klzwr8jnoc6vx4l0j1r0tre',
                interfaceNamespace: 'ho8y3hybxn3luq39t0ffdj24aey323v48rcei5tqnpb0btau72xx6oo91s73suwqc16qnn2tp054mld2fs98ggqe53wj7putbwg7fehrcqen4l75mbvz8vemjld3q1f52iwr5p00kmf579yc9ngdkbh90zpjyewd',
                iflowName: '49g9a0yi2uv235oxbgti67dp81t1b3mbbhndfckh5tdshgc5xa2ye0rh08ylmk6i2z17sc8n5f46zcfcn5x7fml9xlj9sndw07lbs0nwgllp2yezzowcmnxi9v77lkzz5yf8psn1rcrtnrt6i59a2ed0slefbdtn',
                responsibleUserAccount: 'qeu4u3hm2mc20wcv988r',
                lastChangeUserAccount: 'lvuvhz4788rl47zrfs2d',
                lastChangedAt: '2020-08-02 23:12:29',
                folderPath: 'nvz4lgmu0fzp565728v5k3h1radjh3l2836eois5839levbwx8ipqd9urwudbz0iefng3qjn307zhrzrcy6nqqdntd44fgtby8b683mcqtn9msvn641faaxunh1kb46vl4etqypcip75w5rekzr3pppuzpdzolvvq5cd3uwuagbip16dxzd3z6wtx3zr6x5xivm97k71hlak07j9xbwn3nwthz8696mdujsbp4jzk6jchu3diiunw6ss6q2vlez',
                description: 'xda4hgw6l8cbzwwxymp2oatcfdfa4xtty2lln8pq8ieuke1yi2zft75o0yebc15dk7mtsoub0azusvti1erzuqeg8xt9l5ayhdyg27kqh11rabl37qb9ttcni9u9kchfdc8nghiqm236urm90ttd6evv2eu2dt3i9o20p2b2dk3h6u7beijkwzn44s46kuh9kvljkpyr014etz68gb3s3s8j7cp9twkwcb3myi445pnxr73pmjlr1ts4r7ix7jo',
                application: 'em8t6wdm8bxjzzm00vouut7h4brn93alf6uuig783sqbxcyuiwbajqt6p1vx',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: '3egsjold0k1qtqvpifyzcs9ujhy9min69gpspcxbbduczqp7n3',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: '53slfnu415vouayn7k5v',
                version: 'j9xn4t4pzdmmphdg74py',
                scenario: 'pavlelx1y1zoqq379aefgcb5d1azc2mor4q37iywqxldaoh4rq2a1znpfidr',
                party: '1z2xz265g1p44hi0wn7w773ti6x6sagy5c2j9yaum8etor7o60k4ylwnqz9bj5arlsgeowsah6jnqfczjxt1l9tl8a7b3ly7138i40ajxwwwe3etl6fly9e4qvgyv3o4tx62aa4yz0n6j9q7skhicgnlnhsjvxqo',
                component: 'bjxoo9xnddxspee26f5ql58esa4a0y6rbev5bd8loirspxwz80mcz77n3a78wvbw3nff5agi7uhm5nf7zum3k0m0advwyzy9qcxgvg7itz3laglxke9bq7mcho7no7t7ascp3uyp78lamexqhta0svberod6voes',
                interfaceName: '7z32sggkuarpm1oc7mhb90ol7gc5oe5uu0uqf1yfnlx4qhe7jvme3d1bg24cq0y5jr0k90ylk8ofsy53ue8owdq520innf4lx8bgggl6dzuvxobs4jbs0to6jvms1mc1lhr284ene7s2kyuw68qxgdt8x67jj8uh',
                interfaceNamespace: '0b2mifpxwwz39ivnsgzhjpoe2gukmq3selwwdp0aup5xpcx8vlgj9sc2i38iheq7t7hoxa1z03k2tnpdtvd84k6tw6isneac478eyzzjzgie057ho7dnm5xues8q76elqe2f6e9p9zkqr9pigm9vqneo2h7qrn29',
                iflowName: 'dx239ipsk2hpoju9pidctgzs39lvbhizzgbn79h2goke611r7mqrmu0le2dz9xxopxz53gazdcm2zrei2bxj2k6c2vr4a0fljv7zloqjqcu7g8o54pxtpzfh61j9xn0664z7aa2bfck2iy3hrlmecmrcy7hlo7up',
                responsibleUserAccount: 'mm04m0dbps8bhih1njra',
                lastChangeUserAccount: '4hhie22ywl9ofmf4ocl3',
                lastChangedAt: '2020-08-03 12:29:47',
                folderPath: 'adbcxmxf171h4eduv1yo12lkqov2vfncpcsrr4uekkcs4f1cs0fj5magl3znpxzxd3jwv71d0pecsx9kjybf7av2qmasxpmrvki2ms1bczl2p2gn401taxswnpxcpdegfilg2hx9ly1mdx2gpgh6tt0imr4pg12159cm0k0pzh6rnerhsym5yjo4sa307d61a5iar0cpw39loph8vyiilihk6a9wfq6g8yzadfrul0e2jwk5gsj09v9hlq0zzsh',
                description: 'nfebyfrl4ym8uwgika1erhjwyjn7x36fhl6n9orlch8u2qoes7j37g64y2fj6mt9hugmfk80gg6vus8s55i5oqdnlpj87mqfpdv4buui2q3lo6cx5re38m7kux2eb3hpo5244j7xg4pk756zczvv4us5bec5xgz1y5hwj43hgilhgd5nq5nq1d42mm4xzl05lwd1qekaq2xjgkgb8w4cwar2sgxuysxgl8e69xabms06tdsvwrllflzo8yfbrck',
                application: 'd13668rngcxqzdt9m65n5smhxresghqkesi44lqfagi8moa37bwee58t82lm',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'zhypgybrwhqnmqjxj8ae17z9jo37oj9n377w34rp',
                tenantId: null,
                tenantCode: 'b3908yb3pzxxlx5gjnwjk90b2ohcwjhvznfs7ldhtoj2g6ze96',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'hh4kvxj4ddp2u8ng8mmi',
                version: 'c7vf6ib20kc31wzfhyge',
                scenario: 'ywstvqxjm9p6kuvofbzuqcaq0jooomugl0wvtlkcbnfz3von38y8rnqc5nxq',
                party: 'f3x3zgtgt8807z8loss21p6qhitzgu9bswguntb3u6rgl9r5rpq3362gin9xllmn2ng5mf19m4tgx2o2qvwo81tp67jmqeigxq64p087hw1xkh87qr29nlsugznkxwmrbtzjmok8lbfrjsb4lwcuphaueonpfn7w',
                component: 'c5n4dwwkvwudijfd46b1b1y84burkg2c2ll3cxvoyx8jjh52owkgtshu6atmigchjwwnbiv7px6lav57fu3unooo1exewic3v1ksh0q1d92e6t34a3mbj90boq8yed5eu7g51mrlrkq8suf7t5yy0cvqsvmyhplz',
                interfaceName: 'cgbw0bba7wd5rk13fpcwc4441d9x3ehrrjy1xwyymhrztsu92bbcqw1hvumtkr44fzfmpmnwgkoo598p7w2tne63kg1e4ns3fe3756ppyhwhvjhn9qhdaztd9q2mrhl6k20brrspsvqsdqvcl7m7e40wruzkwqgx',
                interfaceNamespace: 'qqko7bvoqkzo66t44tp9sdlrj5efmc8rnoiif1mdvmnbtujz4weo7nbr0p4pxftsqjtsdhkktdc6vcktomxatp3nugubp85xpen2cdcdpx7gkveyf7fs67925c34zuogc7uzlsjdcnkjf6qeuw4t1kzn5p5bo99h',
                iflowName: '5807i7919xp76tjfbk5ty61jgcf568iq69lrpxz538r812ywawdif1cx9e23ioce9f01otd2m9mw2siqbisqfokxaz3cgll1d4hhb73ggf6sik1wn0vvoa9btzmjmbu17dlijpntawt1xbozmx72f82na8n9iy7n',
                responsibleUserAccount: 'ppqe2cohkvfdpqtgcqnp',
                lastChangeUserAccount: 'b26at0cm2kkrl2ompzq0',
                lastChangedAt: '2020-08-03 17:43:20',
                folderPath: 'iywr5wwdq9lm01fknk15pxg4egg9v4olqei4i10jf862w0zk1w21oi6hunoj4rw3gv7s9vsoglkt0i2hhfm6o7tlyfhwzmqtqd3617391aluynhncaisjxotffjb5ta6xi0r5jn7pid6c2jomtlfh2o7aq4ccsxea34qmsvj5h3632mw51yuz4wxyty3s36cixsdrzcnd8icurgjpy34w0lap4dy3jp5528yoi8etfukcfozgtpgb4o74bksajf',
                description: '1hqtikad68pwsx4g8btmg9l8j4ob71shw6algv1tx0httwrk74qvuw768fws9r56txaceak8twljb66zn6om96z0xbbsr64kxkyjk94mu57snd8nsbfb0ri7v4395piwpg34o0u36v6kp9ul9l2cw5bf94tuymv57dkwbe73kw8fdkmc5lz30kgh783ns4tkn0ysptn8tmytep9qwuv4o3y7gcav5hob4l949aude37f8rkw16fx3zuh8ccqpys',
                application: 'fhft3tp7rnujaen1rpvy8y4kmass70f6dtrht497uzig4nm76e1rjm412zh8',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '6d1tblwr9az50npmzvnns1qvpwwcm1mqpql5dqp4',
                
                tenantCode: 'v6mozkz96y272thsazyglwv60k6if1fyl0cz23ltm1ggrcr483',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'bn9wex993c7fagfj3nup',
                version: 'ilwwg9jw8666lb7ka82f',
                scenario: 'hn455hce2jlt1w6bkodiex11o8gm65m0iyj27uwf6t1brekkw7iith27ffkz',
                party: '1feh2swq8xhlwdd0avsx8rri9i68pv38p8m5f55kzar24g2lc0jyyrdd121fa7daz8dyg17gq8tcfyblh0bemmjtdb9ikm0axfw0l6h43otwq2idt9b9y8irkhhu5trl368aw2hn31sg0rrwvsf49vr0kpk5bqe2',
                component: 'mp3rzfrofm902gn0u28s1zrgsg53dnrvyf08kpiivi8o9ruuqebanrrlzbti5zbbvunfonc6p719tqp26wq1mdg2km0s1g77kp72wjj62mxf9j2upt95p27jlvc8r2t46vdkuijrqbn7ggms43ob3wpwhguh6g8b',
                interfaceName: 'pig97kp2uo6p6027lo7pyjd3c4si921xzphaveaya6an6gjawx5awcihp9121atr57jnilwf5t52eh537o02ybels61llx4nagxv76a4i0u6dd6lk6b3c2e7lkrj89z1dr4nofqpla6btfawg763wdfi5imtvh32',
                interfaceNamespace: 'n3cvpabhkf97uluwseyjnuz6evxh6f9dxgge4sp97bpbp4myy3fno9f8l70yhv2ukvcji45u62fq07mn2kbn1tcdad4iwes1sd749dadrabb9v21wlqucvqsffc5nfstn8t6k9dw1t8hlxith6lbafqc1upm4imv',
                iflowName: 't0brsyh1m9uhf5m5yjghibdgdrjrrit4prs7nam9izrw6vt3d4vo6nhvz3fx3hz3puhe57mq9t4wlktrcuu7o6v8i5uvqhyd53onqdyl5se74mkhjlzj65t3ty9ux0bjtkfzs0vx3euu4fdqt3iszn172my9ylhw',
                responsibleUserAccount: 'udesjxs1ufa6vxvky14i',
                lastChangeUserAccount: 'kdw2ewlwvtmfsndpqmpr',
                lastChangedAt: '2020-08-03 12:28:13',
                folderPath: 'kb235xhqp2f6odnoxcgvr4ck3tvmmkgrxxkndl8j830ix4o4hg9dii3occ1qd6ppv5twr893lqb06yoz3hiisakp92wkvlp0gue3t5xx605r0m990rvobj6daiu5bhf4a0taxym5cdw8a00sfnwwdmxhp9h6pq7xbbeyd1mdgnyk1v0tldefnr0231e5eb7voyesaugr6zp2tzb7ylcshn9od762g2jmzdrc1ix4hexlnb3oa2tjjg6rmliqfsm',
                description: 'r95uqy4rdxuq1ixzkuizchm3fnj4lybbofed7gfkbod7syrkl7nqswpz89wvhvjylaam5osj3j6t535v3qcggtndf4c75yjgvva07g9c8ye9sm3a8011is7fydd3xxcs3oey7p0j5ivuqoe7o61foj4s74vsa1q1u6ejv3cmbv4zdtpj1g8tomjq0nv0hgh0cko1rf0muo1jb1s00v7tswnp9bf54k5mghzyy6j4truoz0mer2ki6mmjaujxqzz',
                application: 'hg18fy0gg9sam01p25bjekeva5ohv4uuunkyg73m45mj2vmzrp3thfgdlrsz',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'pikp0vz8mjg0vmiuz3r6dl4qm4a3j7118cwet58g',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: null,
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: '7wbdakyysrtqoxbhr1x8',
                version: '1f2y40dyg5wpxs911vc4',
                scenario: '29v6xq5ispfvxa9vha61dv4g9krb38irekdnk0dhs83lrw3hhglpjvssvqa9',
                party: '6uwh5mto0l87ewu4k36957rtezyuc3pxfwg7vl4ptgle50lrq3dfl9wm1z9n8cu5j3fog274a69l6dl6x52tbt3h8ui8xlaxizvp1ibuikozywa4x3g2ywffyznwzrbhuwckz0mq42d9ikdlu8ksjs5uohvym4yg',
                component: '2y49mv7xb3drf74smdf8ykvnkfjiufikojlmf4b9gwv76aie3161hydqdfdapswhabdlivqflaz31bz0pjoumjjjo09cpar517pz849q8g2i4kcv1bjy0fk97oq6zid2khu6ceuaw9ui4g2ftc0vopz0fdpelvd6',
                interfaceName: 'b4m2zjffzzl0sqlp27btiiyf2q56tt1k5t2dwotsvqzpyech07v82i6h5l72w3rv8lkh0ussor2j4hpybatbinc2y58rz4vsk3sv5zvltpnzg34244w5qygtipniidpwhbceyyrv59c7kx7e4dyiab0yzaxqvqk0',
                interfaceNamespace: 'uq0op6y8b65jjfldo14okduel6lbvrl8eu64x9setz6do72w5ov6j8h9h30xzvh2bnmx8wf0fxvnaf5nwjyswjdhrfecqzcm2fseipxw9lvbilb6yeysacmtp5mymcnql5l8pyx87x461wtukyv22vvkhah2day3',
                iflowName: '7e8svsnd3vq12rzc9dxbuz5a72d9iu7p5vzliogcbmit5nz96y1uc1zywrjhb6u1amcodp4xvw2v3q570vh1d6d9l2i5xtnl8v8c46mqkodlv0cbzhpyi3xi9zixmbgk7129238rcaatm6yk5p5474zxae81dlqt',
                responsibleUserAccount: 'zlu6brhxunltlrvsdaaj',
                lastChangeUserAccount: 'pi5d52xxxqpxda3aef3v',
                lastChangedAt: '2020-08-03 14:49:31',
                folderPath: 'ds9q28gqxgfh993y1ej6nxd8hp5bhp1dm3hl692ias56z58l3vvhhwprwiyf1xjb0qeeelddj5iwfkcskxc8xif65quioiwnjc903g1y50drfxd1w3w7yj0vy4txo5i0msi0waqv3ty98gqyuwzs8xgywsn8lcvs2yy1tn5gtxb3ynsalaodndlv1pl9o69n8kc8th7gw7rjidtuah0f4nxgatouwy7nw6acne5yqexzlh6dnkp1ahkidczpbia',
                description: 'jnsopyut8ngj8ornwk27hcsj4qu7yza50w0tqnipuclkaf67cj8pnrq9t72in1fk3959spqnme4tvzmcov1bvce4voxq29q7e8mnqe3k54jsgugmfnr33pmuxsov4nm4uwz69cb9v41e8lx98i1a57svlyqpdrfcfbjbcx51fpz3fj6t1zcyvyxqqb73p7giewz4lx7w4o79tlldjld0o9g7qih5hron0t1fhhvwfic7yanyjffq18vjqjdqd72',
                application: '8p57r43pr87pwhsiaafbbtvd46r19bf95bfs21gy0i0huvxkk1fanuw0o7ti',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '1mj35jfzaf0writtf0ddylxqefk5o9k8iky8330h',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'opjnlo1blj4m6d1upsdc',
                version: 'msm20nnfn14xcvmt1wdm',
                scenario: 'ldx1b8k8d333mlyv96fcjo858mm85g0nkfkp2hhpta0iqyjrlblgi1uh1hrk',
                party: 'vbbgsimxrfznk9kc9fod17kolilfhxjhuhjd02g9cqw7slip0qvjoncp5hy2vt3cl1hcc7gw8et646v0sp29kt0tu1ah6zkwo6n4iyk08o12d2sx7y0nsrwhat2on9gt1pzygegha0jdzek4dmflxdpw31ju2z14',
                component: 'aguv9d71zi39oinzmesd4vhie5sdw1qppj7ccc1r1n46m8xiafm2h4dlbkkona2wldiumk2xcdszkjbk2wbi395py2yfhe937tjqfp82fqtejvhfubjt5yy8hh7ga9q1q6ibrpmqw5xvdo7cc85x0jhe4878t3vf',
                interfaceName: '8j22x1li8znrdzx0r7j068m9jmm220sc0bth05x4o2pd8c0h5qubggvsdtyat9xymv0vpnn0vl7zpn8z96d24k479baq06waf4iifg99c56bsbnc80v0pmhkr1ytcw0y1gebco2b8sf19142wikygn6kx3ipha1w',
                interfaceNamespace: 'cq2bkg88ehqyvu6xqnrut7ohc7baib2q6bqulbocjrbtxhphjhjryyvrrer3xrsdaucoeak4gl726wtvangwcw9eiwvrl1uefconjln868utaebsb4r4k9eegc0eul90d5cxadmchxor8gpfdwflnungaxdxkrav',
                iflowName: 'n3aan7hwbcz1v03wxe5okuw8c5qzw112yzpkqozyi1lt2q2mq7pkf8cct9vp1ki96xeg7fxm09f8u92ul7fu62ycr1gym8z1glmgjwzqmu6kc48i1qkrnso3b9927fune06zqoh86rxmfm0jnahx5tm2qxfj67cs',
                responsibleUserAccount: 'bon9ok6qh4sb1s6t9cpi',
                lastChangeUserAccount: 'y5a18h0du243inzpvy4z',
                lastChangedAt: '2020-08-03 15:43:32',
                folderPath: '7qxn0kuisa7g3nh3pk5n9kklj3husg5z78va4gskc5r8pqqhpb28evzoejhxt29pybbtn78wive4c9j919q8k39dsm7z1x3ftbwql1d94p69a00eimihqdirzo50bg6ymxxbtkvd2ume0iigu9mlb7tqigoo1mm5cli2s1iiw8mv5apknil297733i7f2bfn8n2kdvi2eabsqtl6pdr0s0aa9n26h6wghesb5oyqns9czfx61ue1v1b0l484uhq',
                description: '8n7m1gzqjz944pci5b6waoz1245x53w4x6qp2ynmxgs3vsqfxjc1hl77ngm8oe7t4i1cg36pzt2ebzvp398eoqz1f07mdmmcs46of4d8qh2rw145ppr5jzeesn1mr35ir3l42sqbv6gnp8pr3r06pqu840j6p1rk52122xgk3qoss89yz0skf48edblrjp6yucmikdd129474csk2vf8baz6khx0h7p9vsz097iulxnvkpd3ep33205a0fv7rt3',
                application: '6a0zp35omlohkhnfn9y3o04jn5sp686w5x0ghz4y4gthyicczo93o3g2t3cy',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'woelemvalpbulrpw6ptkb3by3exxnkv3azc2mck6',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: '99gu8tq4qxsi2qb0j8zxutekbbn84kh6bw7i0tlholbg9kfmmu',
                systemId: null,
                systemName: 'afa3i3klt9fco48zepqf',
                version: 'ff0w5mvc13eyx5tmxsmo',
                scenario: '4l3fqu7caig29tphhzmbuir2thrxc05ewx1r9xrlsmrytmgu6szly6n7hcnj',
                party: 'v6k86fljqxmqckwbd8xfehj0ui2d4bzvd0mfbrhgi6szph6bt0kf8qpmo9ps7dlclwbvkuwnofdf4bzdu62hkecuqwbn30snn4mjerzbqfpxg84hltn72bs5ydm87q47n2tisyy9bm4jnhmwskaw46e0clx0pm5i',
                component: '5yay2u2a3xtio7gsh48s5vbyz4uldkbdv4q3khkp8cw5ixsdrnldri32t1xaeo5var187s4bxh8ofqbbeepsnwmls9p1xja5wi61s6z5p43grs41gjw7k65pyrnzwbn5u4mu958pz3jyqo7rf59th2c3u4f707ft',
                interfaceName: '2ypexyh4vy1utwvieforfzvueinig0jsqr7pgeorsekloh991yhz70awbxoen4jhwa8m8u53tojcnzat0zo5iypzdm163ew7gf30mdpwu3s10k5bqj8h2x7m5y21u6jgnqlo76scryy9yk5wsfo45v16wrq9ovbk',
                interfaceNamespace: 'ug1izd036u9y7z1g6wvdxs9nk54175ec8jhlcolyl6fui706mjltns0fvm6zickhfn2cb8vlja03p7y3ezbleu6c1j6he8izrixkjmkwu97hk6w8tpyxrxrke3s0sacprvncivzqejdkt1p1wx6w9vfo3vkti2z1',
                iflowName: 'jpofvhaze3bnkas1vlhzf6reubh2ql0d6aq68mt8lldl8y8mnyl9okbcf3j0ezvpif7chcq9ab7ss7m52ef026kpsy346mona5im58hu6gmmpgbrhzr1aevkta04mrzx28e308vgo55d17o7d9b22g2qt4q8kgz0',
                responsibleUserAccount: 'l5ctozdfev8k9jl8duzn',
                lastChangeUserAccount: 'pko3xhdlacjf7pcvr76p',
                lastChangedAt: '2020-08-03 10:25:51',
                folderPath: 'rvx33q4rxhncucpif7ipt1odw4eqc92v4qr6z5ystvbv2e9dks93qrfnmf0le889tmh4fieng9elfiyh334r52e3gr98vhwiod9hddw54fen5jnt21rt0252aqqxm1eu39183o4oco7p6nfyce74bu6dsuecdx1onu82euxjjvk1vjx58do6oqvkcwmnxeuj5oyfq3wg0ztc7h8sh2nhwxqmeiy65mkfixf1hsuf5fcl932gu7ypwz7nbrha6tm',
                description: 'l6dv9n952gk4kanns8k2f7po89hpblnrob5blb9511qzpsvvwoe9r31t9zyoambo03k5u2dntj1yysf3lppzvwxdoq9tg5mr3t4wz0yteydzawesoi938k1xgo5d0uaxhythceej6ip33m86re3h2h3s948705528py90n8nlvmlgg7oy0ce2prxbk5q2yh8dt9rmdzt3g2dx9j3t25ogyhmff7hbka59zuze6zvdjrbv7vip80zx9hjmbzz1h7',
                application: 'n323dxa0rqljvgbujudcz9te1hit35z3ufmus8ijl9i8emu7tty7c7c0j6w5',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'fzo5l02e81s6j0e3e8ktzg291kapwu46vygmnoll',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'te16ph88uuzqacmkisa58e2437jtsppetvd8ntm8svdmnct9tx',
                
                systemName: 'kjnfsjfbje5n6625p2r3',
                version: 'vid6l2ktnymjjh2dnu0l',
                scenario: 'mxu5ht9frmt65d01a1oaxn7texd9ox1cibslgvtnymr7rhgctzcfzgvvx54v',
                party: 'mxdst2vlv5dd4zg6tvf0ghzyo7ujnklzslwxsupocki03rlxhjzaom5cmjjwmh1yy6aqcxtoii0bfgnn954smj8974w15338pvxmb9epngi6thbz28bp5z8xbkz5m0zx1h9n7ttpxhn1du2nltlz67l67evder08',
                component: 'q515yfbftl9j3fuwulm3nweevrxecd76zwo0m5r88rarmxjstvp0r5kw8bj108f3hcf82djnu6z89fe4heyqpwga2wzrthbvyvgka5v7e8bq40t8x3ty66n3ptbvel121605x2bgznuyd8yht3h78qu77igt460x',
                interfaceName: 'pl9r0yz43c8w9mo2c5wvxcn6oq8aasjpp1dwxemondvm9zkkcdowjms3xytynof3b9ip6wjsxgca62azp3ececli6hnqqbakobtq0kagh37pir6u2ytzprfg12g262tkrkk8mbduendvp1s6hu6db3ilhnn56y3u',
                interfaceNamespace: 'awds223eqxe2vh5tn6c3stll90w9ky8rlb0ctj07smvq2tva9ft9cxh3d6x5fuerxz6pjs5pmfqunovhk90by1asdejmigm5riwrl4y4r0m2br0b67hlndu2kif5d7vcjn3rrx2bi6bkravitjj4unt9pm0hb6hr',
                iflowName: 'sb0rgwuu3hlswfrwlsvcor77egl9sstnki19xejqutertsl49y2yts5iatztqonu5cxf97zn3yyiqjqk38movdm08jcmszu2zv8er6l5e8e7vynwma03t04m1tnzpw1z0qrtml0oy4hjmkl1jnx92s25pilmz9q5',
                responsibleUserAccount: 'uncfqz8iv0bq9jzafaea',
                lastChangeUserAccount: 'mbzqgmanijap2rru6od3',
                lastChangedAt: '2020-08-03 10:52:57',
                folderPath: 'bwkj2to99nfumcs0i9qrr7g6a1hc4gx0zn9nswafblpq5tglxaqlnhc6ih02ut094j6h05jxx8r66wr0brkkizibkuasuxbfiivsemdt6wfp52aq9j2qvlgr7kammiyghsncrdburoxe0c7szk0ciz9ou51svnqhzvtbphl3q8kixlcmas4b4uiyjph39drga8itc9vzeh3ue39hnbbv2917pe3b0hqroaru8risv5kksl4xl6lf1iavrwl58a4',
                description: 'n2qracinv3uobw9im8momp9f0ex599gkozja447va0wrwofsqze2yg0qynzmndruqyo4bus42jm5fdhnz0ply92o781v247k1sme8hwaz6yh13q54wi19a5nk4j1z2xwm5lx49sgds6d8vqv98nsr7qy4fjqlz5iyl1m3z6rr3skq75ihkcpuutekc712kqg87ty9x8qmv507osxu67jf57aoagslvm2gchiv5eox6nzrxq950igqxgkqn8wzl8',
                application: 'kgp56xoki594p0mql4ogqgdndjsolo8tz4b51py6qux384jssovrvpr4xq17',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'p1kqt86mgfrtr8mio89x3gk8r1l3k0r44j4p3877',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'edu04macekpe6urphz8e4ipzb5r9akfu7kss4hq2hjm7r14mks',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: null,
                version: 'h9r6snem7h0wsbfha22a',
                scenario: '8t4qiw42i65rmled77jbw5bq7ttsrlwxzcca8e7bvmu9lux21ygyvmg3th1k',
                party: '7bqb9jv1dwjv2tnfpw53ewz2er6mm6uly0scueumm89qio53wiymhl7ld9m3aecghwnnb6nk4mjjkhdv2iada4nlbl6tjengi3gdva9xclu8e5tdr0szk05w10kh3rabe54cx7qkv699ein0nwji3wocokh9milk',
                component: 'wn9znhgsslo5o838gw3svvctfumxckmzshscrm6dy7ome71h9pzh2dzjdtdqtrapvk8zdeda8q9g1rlv3zo4dj7qcwgqo41kiuvh2b4bwhk7v8sgq7tgimmxamyqqzkc9ccgrke010vuuaq1yjjyy93tz2ay2opc',
                interfaceName: 'vazgbdny21t5k2fxcqchnzfw2uqriemx6cmiuuie94nypcxq671hftvtusqle1ywknk9l2kvq8bckuqjrc8d6s5s11mmhb5acczbye4snr2d8gbvqibr1woqxtpelipnqb2paiofo1jla2hikqdrb7359brfbchb',
                interfaceNamespace: 'ypacz2ln1tlf5jwlidxtco4gsdce2engetocue6a17wsk4figmhl057nmh3dieu0jzkhle65cg4xtc8niwbzseva3owuvfdzcx644qx7vohhqsra3b9isa0mf10yhfn9tr8x8lk530dp28erb9doy452m1ak8dwo',
                iflowName: 'ubg20wknk3fuh5ys8x9p7ubrre0kk06cs3noegrkup2r6pgerduhlieoc94309l4tlx5r3v6gh7gavg5inv6vnlcqmdaokt2lusceqjoscy5yqp8rjfvrxohvk9f942wzcmmptnko3q7h74v2lufraf7fon91dbp',
                responsibleUserAccount: 'ppmroyd72ey26ql1vbyf',
                lastChangeUserAccount: 'pfpgh5iqc8qtnqtachmx',
                lastChangedAt: '2020-08-03 08:16:43',
                folderPath: 'calf8zwm0nkdcm889rbgt4dx8f55udunxs5snans7iqlbmtvfi9z8tk5or60yah0xsbggjtwgjpsbapn75zh2rjp1i14ecszokbtihhnh3mu781sibf3vial5ybo7faajbnoxf8h5dpg8if4j0gmr2gn5k8elwfbqlvhmngbpcikj6ox6jxdfnmcdyo5vb0jxm1m3vtnx5dy2uwoutk6r75q5xfjb0a8fyfmon13b6tyiy1csxd58cu89zcofee',
                description: '9ldmv0bx32d6hkd1k2wkaz4422r2gyyjve6efla07apoa0sgzp82tx8pkf9t7hbow9bx3o9ecxp9gaaysxnonv183zyc7qjlstsdif04qzj2t6i5wb1jnxmt54li5v4259git1ohj2ijtz9dh5sai3t3issi56v7a8ot6do42wzbq3gjsuptgi4j9j1wdn2alu9qbk91a33e9jrkyfmk69ypj89xgx8orov66la14l0bx0odrk8i54ach8vepny',
                application: 'j7qetxca7xuamu0vrh0hga0s9lfoinmrktlhe782zs1607g58svc0kpjaxuu',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '42q1q59sa044oq8m8tgafc4ys5pvb84aee1mkzs3',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'f5v1iksik4onlhon7a2ntzzxelt0j20ty71bfvbspojnb6op8x',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                
                version: 'vcqy3bjesjij6mq0355p',
                scenario: 'cl75yy2d39m17nn05q3hxgd34mdu7b00ys0omowg5z016qgc8ruhk2vdfuft',
                party: 'xz7g3dyzfii4wjbg42zlj2hxvpfxvd6afkeeqp7xefqt83naoqukk5cipzof87viqzdcxqam6q1kcfo1ni1hqcm2p2wa3knxny31r4pwulga7gko7y04nd1fxrqj4tkk48h1di36gha13so88zzsw6rjz794qwj3',
                component: 'n1zf90aw3o4uuzzxpzr3llsxmeiz73p083jek0u6wkkcirm19jrs5rwqfq19dyp3vluxe5w1jl47htigz89sxqyd2oad5yf8my7brpzlutv6hvujgz7pynohi7fg7uu7yv731avzung3w5zlpa1o2n4qpyi7wxsc',
                interfaceName: 'u5jjyt1q42o99h99b59vysjzainhkxy4k35iflbq9c9a118k78srsyx5avdg9do82k8emtd7i3vmaoa26ucehugb5byv53lp7oruvoculuc9clp4itaqqxfs1tm48e7oh0bq29zfs0vchvr7ugu4wzuy5bs2bs59',
                interfaceNamespace: 'lmuwitqf66ot74g9ha39t74mqip06owao0rnrbqk09t1dqkcoyb3th7hg571alk44visjx5a6ezkqri92zybh9a2nvptrzagpmeidjz9jb8dqvvkwdm33fo4oy2edgrhud6nglr0ef82iasy30n86nun6e0qoia2',
                iflowName: 'pgpe5u4xlfkrqxdw8gqn1s37i80g7nncycv976mpuqx0bp1s1j45nhz9w3p2h9j2ot2rm23qkpzdektg018g7xz4mgidyyxehknwvp0qtp4waowmpbvdj61sqkuic0r5ym624gxiuoo39k9oa8sri4204v6dpppz',
                responsibleUserAccount: 'ivi0p4dfd0rhp4gi8y9s',
                lastChangeUserAccount: 'nm258yj9suur35ms27d5',
                lastChangedAt: '2020-08-03 06:49:47',
                folderPath: '94r1c2kra4k8ddwdzgifmvxql5cpr5m8e9lhcopnyb5tjp4i5kz7pjdbommhfacg1pt0holhkl6imsci1379sk1x35unl65d08cbtpe873106mkiroudg1320uq4j8rravllclfbwvxeyrcfkvawm7y8sbx4aqabng1xuofxhnqa13n5r0kfmbd91l077ewkmi2z5sanfjfqwzdr29lyyrx8vk4gzi0nw9jvcuogcmyg1tuv0vbb1r5wsoam93c',
                description: 'mawde3tyucdecc0ttqow6b1sld7hb1e50x8txobt7tp7jcipwnyecofxzvkmkyn85meaet77ub93vuha79ll9cka4z1wykmd19e2lygsf03me26lzo88d66ajhu4pb6xoxm99o27dfh5l9hlgad0jmih4rdhjaptk7xj5ffyac4tswv6sm2zxhn6j753r1tenwao4ygmmno9aoqmcuzegdfmdmrsrid13i2ejizjsako9s4vy8qizvpj3e5io1d',
                application: 'ck9zj3db4bvrw3m9kb6kaplg9e6bkx4i8bzsdfqnztonw1nbdw9gf4uwzun1',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'mz0b77tmgb0xb3wbk1612797kav1lxgcx6lynbl2',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'nu5yhskonv145hhqikwtzr6t6oamf2pxenx4d7s2hth776zzfp',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'k94h5doty30d22335qq8',
                version: null,
                scenario: 'fsa3uek81djsbca486jyokmtbvbgkdeu1fvk7cyh34043virlh0vsayssatx',
                party: '0vj1nvh1vrb9833a1n0qcgki8b8rvv87msw2miyt4x3p21q71jsmlao8kvlw1l3iy3y1zo7g9r9af4xuo0h1bdgo2e07b8sdocs7f4ozdo74er7gbv7mafr4v43rwhs2zslyvjfq13aaojqwusr9848flog153kg',
                component: 'cbm55du95lbaeh3zgypxhb4jr3pjogsctwio1cnwaepayb440bx0m4ubta7myua1nrimio52wipgl0dtsf2vr5gl13ya87axy0bq8tps36kcgt39hjfoxzz8xfwg3bxnl9tzudduqlzdsy1501sxcqjp0v087vta',
                interfaceName: 'pqhm7c81mw47q74peif0lu64ul28ufc86bkn4ooh2ju09h08qs67z5uvgae74b5nixjvsk65fmws9zvdcgkchchd06x87o0mcy3ccsvtlfmt89q44dwvpoujcj0jut4jd6ph3hfbsl48yu0zpkxebe9udv5xbsyv',
                interfaceNamespace: 'g473c6w2j880xy2cumonef1q3kz0ye8z3zqwneyo5kbw4t8j9wji3tvtiuifvsjjyrkhohs56ofl5c4067iwf59sqphhc1wbdagd2srgx9j6c3jg7riyz1ww8a05yry5vus8ff18hjo9ejw1mopkr2byao3x7yjh',
                iflowName: 'gt6pntpxfxd05wvucyi46g1ccoqd2kg1yr0xukl9aim77l16t4sg56vcklrqlaer7vzdjgkm0n2jqpbbk2ebzv4ch6v8lqxdfhg21df4o9p8kdtwnwin7a4nhe8k1wkh1pj16r5i5g45c1nzqbddnyk0w7ttbqih',
                responsibleUserAccount: 'xvo6ztvdi7uy6kq4oywi',
                lastChangeUserAccount: '5v9enmtw5eok4bsi74rv',
                lastChangedAt: '2020-08-02 21:10:39',
                folderPath: '70fekwocsq51lekkibsyohgpaob9c0j5hb9aonabv1g6wvs603qfuuuw4vuzo2hroe8p5c8m3sk5qbolkz5qfam4bxvqtfgpckk3ygvz184jmqqqqsstsw52drrkz20gojmawaf4in9vt9wxeil8j005u1mzqitxtuskk8jzsywvbuufq50vu9fbfzikm1i7kzz026r5gm9jwmw3zw8psz1fw3t3irkaqz7k6rstzbz6g0bnt5au05xsfr6c6e2',
                description: '0psife806l8amf4u6sn56cp2htkhan2qanpw7uc5ifgt20kmeorv6jscde3bja7fc2wbmuyeerablp2e38gfg8ko0d9qmm9oafwevykszlb44vsf9rfne00bf993c96nzh2e4n751qz2o1b4wym56hmyv7ijeaw14pg0ciw2vtqcrt42wjwtyt05n5u6obevrwfb3l8ggvljyogoxg9xaxfury5powtc18npp9ewpetaznsqumk19mx4altch08',
                application: 'i0wbtlkn1rpserbhle4azb1tttz1naz6xlp6ot04ayt5hdc72j5crlc4v3y2',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'xoza63i1jvda0w191f73l58zgd8hhp8do465c4jx',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: '7wqedo94urkpe7b94ubxnfqnobo2ixsbszopvx4axqx7hwi4od',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: '3714gxk4bcuu7r30g6ae',
                
                scenario: '3nh84ng2kxgdm277fcfgaeeuq4pe3t5pcvrby15kmo9nohcj7bf12ass16a1',
                party: 'nso0g8ufkqgcvwoy14lq5p7iv3kwm1ejt2ehyufs7fmo68jqcbk658878at1aahxgge1byuqavdek3oe6h0hruaecpr1isjk0e8jbagly0usnhi7w995m91c14lk4xi5i787yq49ub2uu0csq7kwy88hfprwftx8',
                component: 'hzmeu6apo7s7avnoacsqfwgifa4mn8tag20uo09wh6bz45ssab0r546ne5jgi2tjlexe0s2yjejfzmk5ac5aj7ywa69u3iwmmw6lhopbrsc0mfxhjyzl0o38knydr1epw53fybc94u3rmjaxyasgl2253j91ed03',
                interfaceName: '6tcd2dpmhfmle0n92zuyzromzcsbw45pwc6qvf3197tuwjxbselb7x00oa0qcln17c04aa49oc84k3512isi99vvxzoxqmbitnudqz92nndaeus0kgkpda8amtkem3zfssxr2jaa4zpk6yxdbhlgxpu9pdua4axl',
                interfaceNamespace: '4741rf5ydbkw499467zc6p1uuzdc3wyim134oey46i0efn6v592lhfyx25zstxw2u99mvlyvc6yqo0fbbgqe6trke1jd6q2pj0al3palkrj5zvqevmq9lb2ynuyl5s6whxlj7vtpryssz6v0xz4m1onqs59gnzpv',
                iflowName: 'f917vgr8be39x5bzo5e56yows59xu4e10e6vnddo2c1tnersuntz7bin9e8qhjuq6yl6r2u7e2agobx9e57rwaqj1u6ytnhkpuquckgc8ndrglkdwpmqnwzq0e9avj5u1nlxqvdeddxaw91xt25fs1ow7qcbdlmy',
                responsibleUserAccount: '97kz60y98jb22pfn2qmv',
                lastChangeUserAccount: 'lik38okcigx6yupkwagl',
                lastChangedAt: '2020-08-03 13:06:41',
                folderPath: 'hz8au64ykynl0l8yyy15mn052pyqygr6t98rnyku9x4w5nk81u2joytdfekmhoov0v5zaiadhcokowgr4e0evt9lecv7dnmo45k236qx4yeytif7vkk5471k6c6uq8ax0uzs4m1ka4xvxpqyxajqly1mihha1ysbkophd8nxu18k4qri0mt3dup2n30s7oyxt43nlzb8a5ml659nuj6ij7rgs1bxvmpwrxrxyx6461848j91oqqc3nho5qik4zb',
                description: 't6akavi7p765s7p41ze9km33z0fnhjnvfcwqfkxzrint3pgalfhyz0df3djzrlrw32lhbu52og7jd9rtgmixwlz7m7nhebfjymnf83a647202jtwzxmz0mqdyhex0vpfake7udti97fygx3ko3qmmjqu3e5i2rq3hj5r5a5ncmj4m6exxqq5fqcc6y6entblo1l9s4r94l2kr4nv1lwncrtzsmb3w0k0w4ptp6iuj6pe03zfm2t2zp4nkj8ml7y',
                application: 'mcxaoo6v1bzk9pmkwbw63awh1l68x339e0csuvvmc9ftbfsx2wondfrcfdib',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '91i8g46th0m9hy8dfzebdexot4vk8zyugtmlnzhj',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: '41urexqbwx8s2zepfzw56phn2a3hogoowgrv1zhrvphv9xqqw7',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'dfsihoca1ovxtxmewu7y',
                version: 'xl89p495ltwylto2w3rh',
                scenario: 'm5fl29jl6x3pdwxx5j86avovi67v9i515oyvhdnke3ofi8xu5e273v5a5yua',
                party: 'fhvt8s5cfvgogunn90w8fx7h5xl9ys63kq8wfafo9qlb9i5y141jmbaald0umx5maoonma8zk7skpk2e4oe8i3l38mdq2mor6uho0lgvppla376c15n9odjhy90b8m0isv7oamzd7tcjdtgl2iklhgaamiyjcocc',
                component: null,
                interfaceName: 'f8t5nexo9dbblg2lmshdssy3y2130kxnuys6ymmre5bfw64928530t7y27at8pk1x98vk288fmy6m7rdef5gr3dfhm6eh0ppl448otcnirej7n0z8re6vg9sw1ek7w4jltc4gp3mtjgusae81qk684so24m2a5se',
                interfaceNamespace: 'b2odqgefg9gb1otdaz8arjj737ggi7gr0g4tr2sil2dsss03h74d34lvwq0zt6slox5ttvg3bpzppy083powagd6smuum9rlsmgpe91shsmn3h5xiud0vlxo0g5o0fyb1uosc1t2aglvfjcq4uffwad6yeub5zza',
                iflowName: '97vwcceqzswrn49ikfbs5cajr3qwnna1cqnp0j0r22s1ib1o3urufgf6vo3buvt1hj5kt0ffvwmqkkexeim22qaqst6be26puyqypidg9hcisue1zb8oi3xrmsreotqxht0mcl73vhx7kpt393ejhwk9rycxqsbz',
                responsibleUserAccount: '8p9wz4r1r40ogezy5gqw',
                lastChangeUserAccount: '66e63opt74uatvn0jzxg',
                lastChangedAt: '2020-08-03 13:50:30',
                folderPath: 'eerqejjyvdge8zck0llfp4i7rv5t6ytg715y5tobs49lle0i7w2zolxaotfx3d7h84bni12rlctpjf45ongf2p86olj77d3ru4ozvvps5uagifn7drzcngfsgxg8mm4w3ygbl33rfzesmeonjofxs8scf2lhdp09oaq61ckcc9dgiin7tm9f9t6jncq8f0runmgs7xsboq8yb8t9w22ctj8p9crff50q179t561fv6lzt30pvx8lwlnaes3npv8',
                description: 'g2eujp3looslfp1jg9n11n222vnwoitic1vmlo2agm6fdax29n2eoe43u2wtj4qtv43dg8jcmvthfoqng0tkwvrpghzl33o3y63x5djhxpbhd75g8it9pblvnx7iap7m7nvs00ke9xszbgadkh1gexdly5le78vz3qi753q4hm6xk9o8wq31xkpytiig06tnddsso7d9oga83ghfl2dg1d07yyxa20an8kicofl36dden69u4mmzyzpouqsengm',
                application: 'yqnzmv4pzt6ebyfzxflyxkm8y48cdavzkd2l1i3gnuanxkuciy3yqw6mq8mk',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '3fejcyf7g51igjl6wv8aa0blwjh7kx2j2lmz56mp',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'yj4ftj9lvfwuf72gk9x9ezksaufl9rjmqdjfe8svmrdbt89lpn',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: '6blweyahrryolajx17lb',
                version: 'juctc8h025u1wrtf7u7h',
                scenario: 'dm1scehqpr8jyoe0j06rxacy4lblm01d3vazjelbwta5z4f08arben3qr0jy',
                party: 'ys183mosf9otfbkkpbiylfrgh6rwjyd8p49v526wxhcdrqm4ao0n4ztgxa6v7wzqo77y9br2m5qaub6zmyo72toh3xjsuibz9g5sidf1remgb00kv4nyn4rhp5dq05yv6tc8h5k9usc5m7lw9s7cy8noq5yuav8r',
                
                interfaceName: '6zc929v91q5d83zncstz4u17yubam30x52cgqpy2z93wulzfbrcv5rsjmc4xwrubuh51fndepdd22ojg6yqg66rnupul7r35iuf123em2j0svebytim2o9jgh3o7wlk4yo5ts5q68zo3htfj879sra33copxqwg5',
                interfaceNamespace: '08gmefmhlxsndtkxwow8ezydeolgagecp6sqf80yejth9kv9g1wc42exoxichu524dpo8suv16rpg5vntgdgbx684ag4xnkshmm44cquqpcezirpnthxmnly3yw193iyycvfoyk5ks5ix8dqo46kqfcqfxl042g2',
                iflowName: 'd1tie4jzpo9oqc2ckf55kn6892dd1okcpcfxjdt7wbzbee0aa9a79fffes4u85fqd1fdmasyj2zq5xjq1spj2pat34eu9qigra3kg9dam2p0nva2l63kap0i4qvdpgiua6rdrnvidwzbanolgi8e10t0x7lidhgn',
                responsibleUserAccount: 'r8l8bjezxgu933s7j80v',
                lastChangeUserAccount: 'q4szbc1qzl0t51sq8s94',
                lastChangedAt: '2020-08-03 01:53:48',
                folderPath: 'viwg0sf1sdbkdpih9epphdp1jouey8t3h5pf7z2ll0ko2a7dsddr2swnswmpj8dze64udw659pzpl4uyztsk50w95r9g4w45a1qlb1k8kccdvp6e3cbvixx7w2ilezg21ztisw02a0v8yvs1ulof8oliuzwum49ew3qmfa6nv64rng98wyz7ez4uyjdca57frnab8hmz1m7wyhska4jm9l3yivcegmjoezjavgzbv8yo16hvd47koux1sfvpp6i',
                description: 'gs2ob8ed3heevjzrtlf105759obobmpu0vrzvtxk5v1avhgc9pimm5chungcdasb0biev4ed8goykippiraoctgijkxtgqfz3xbxlm4f9unzip0rz1ej63mgfmdvt3c03bedaguwum59v8wd6f78f0g74em0s65yp1rt9h4ly8j80fvb2b42kn5kx27xovggm59ebex12b6my3kxxbmn0hkckssngjyjf1y2ok1tpvtuilb8joqyqs00n06czuv',
                application: 'qgpzv6z7ic30z2y3dzw8unj4yzxyj27ao6o2ninjowrv91szydnsej1ev1o6',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '03tszwhz4knj2jeqz5tdflje0a4hv9vbnzk0f804',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 't1icqbgr0db4njiuikhnyan7j0uhye9hji3m8do2wv3ltim02h',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'pvrxnrusdl204050ohdp',
                version: 'qbmfrl7f4thlnpgsvrir',
                scenario: 'qyi7qbfwhhrkd81p5mwka5oysajprudomwsiuos3d9d3lzfmdquai6lzcfa5',
                party: 'tlna4qosxqbpbvtvbvm84p5ohk6b846h1rlqvajxh7cg7t3jovwgrj87j65c9shzm3cdtdbmfhxsx2nnv2nwjnog4pjme2srsm2ajvahclr9io0btlbevp6e5d84r6dakhjtzcbphxhurgne7r3rxh1umfx14tyo',
                component: 'rd8b536o5bt0k9ok2bbapoo6omfqefll261jtblcmx3tidbw5jghx11ydeczspmw2zqtd033jq3yqe6mlwu57fes1dms12kq1n4vvzkh1sy74l7127y37yc368kfzirw8v903phsm6md2ju4vfzawlqtiaathwbw',
                interfaceName: null,
                interfaceNamespace: 'hsjubfhabw27h6z72ih8l0cztiusbyfq4ccrg3ajvj8rosrs7id43005yvpliljggszz9icy7kxqjeql8yy0erqzxtnelj2pjq9riekha9nzdvipvzu4zbu3a7hb2ddgh39m08ubucfdm3txut842ofippvox9i0',
                iflowName: '3bk3lhdo0it7dtlu3f3gyr0katlgebre3fqgwcdfcygznbwqhoxeo59x2tmvltdcu0bjuoxm27v0vedpewlwmexmchfkm6z2r2u1xg8ut4tsk8bmuxgllxt62kxgqzir9x1nxccq88vqih9zpvw4mb0zqt0qyqzh',
                responsibleUserAccount: 'az58f7v99aaeamcmmmxs',
                lastChangeUserAccount: '079f9z1nuc84gt1crtuc',
                lastChangedAt: '2020-08-03 05:17:14',
                folderPath: 'h3wvodsz1x04ognunlmx29nvumn7noferwru7lzzgnrq18tkmyax50qteed3n73sqi986mx937qduhkbt6nqsvgv6pfvcjgp6gju32fkwvkp7aftqj7iwxuu3ucwo5hjla97bbqz0yt5wa86ssaarf189bd2e9cvn45wxd6da9pujie71pbi1mtqmfvm53okppekjm9tts4pfdg8xznxf4aqa67o3c2tl7bbdya09igzwdpy7cyw9dfg47587ev',
                description: 'n9z76l7eh8xjlt13bi9met6w9efh1lvskb69mbzansoiz2ffg2w5bd160nxaso0e27d75ohxh2gm6ti1j40mkwpivxveq2pe2rcg60m2p5esg2wrbza53j5rsil3k9dm8l7ir0h6dzeoqaqvb27ebqpqj27vl5nxyburfe9mu2ihsq7j8p73aqdi4uuwdezanfvnb4chgt16bpuw4w43erlt1tfclbqlb9ts9fy5ntm9b82xlr791wfbbpod2ic',
                application: 'qzmtbavwzn4zrom0udig54ea1qx6fym37pq7kxqrt4w7s0tdx1bkth7ahbs0',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '60cutbese6uto1r6vrpgcm56mhtyxum5jp1rae9m',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: '1ogdn7c2s954lebrbkba899cfvq88gup3xtl0of8ksqk4nc3bg',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'y6z4plnt93i7vogw6nn0',
                version: 'vjefebk628xiitcu4r42',
                scenario: '3uk6xqnu0uvlg2x9gnionemf80bekvvfmm94jprkz8ssy9q98ovyudyqjnl1',
                party: 'zde17o31j8tskq9x15x57q7pdbvb2mte0emv09r5ipexqg3q11s0f5n1pbvclq157u7spt4r4ip9zunxivs4mbr5bxhtwlfyzd9dr3d015vdvshus8b3epli4fqn3nmxjx19pkiy0wmjbnl3c1b0h8akl0s7mymm',
                component: 'wauxtlnlffrm3z5n45xles8o38ytqi2siboc3s3k3iy7zvl5pntbl6j6eti00j8opx7mrnvil01kighk81sbbzb22pjpvk9ro4x42cwcyvxm8f9lvvt2eitsqwxkrhm8ki0ikncsx303iv77i94vprah1eoz5grx',
                
                interfaceNamespace: 'fooolk6x22kcoa4d8xdgttmzxu2cm46j8widjuoosjoo1tui7ugg3t25f5fg35bpgh4hnx7l35jhvay6vr7rpbkbm14f7iswyritwk1fiwth19pmsm3309he5g30a7xnae3kapli9n7g366e7vrqrtosjagaqxc2',
                iflowName: 's7qekqqeosrkamgzbsbc04fo42enld35jci6sv9sxlr94rsz7rjdecfm8c7o40l7aifjze1ocepdqslucqtht1pti4lsbmesbp5piwj5g0mi9i1gprjfq9nkq2g9ih4vbl7bz2v6el1p0cmfhndqmh33ui9jr9tc',
                responsibleUserAccount: 'mfdmx1xb1fq6aozpalo1',
                lastChangeUserAccount: 'h8z2k0ncy5bk7jume6ft',
                lastChangedAt: '2020-08-03 02:11:59',
                folderPath: '07zu3hwqt048roe875hr8lzuflp168md494cynrsyn38z5xmvdc3lawjsosot5bx40ni16oyu2fr63vv8h3bqgccas4uhogc7t1dztov1hga2z601yhq96xvlcnr6bfc7rglcpyeqawqaewk26miqcrzokpwmskq1tdsm7lnux82tbyvhmc15u3sqtve0lditc5au3jurmhxfj8fo918aptrde68v7t0666s67b13h00mh8xfgq2ul7m4j687zr',
                description: 'rzytgo0kqpcwfxnzdwhgwrtxki62fnjh00dk38807mbc7vx8lab9lw9o05hfkw7fiont0n59p1rkdwukjky16e35o7pau0nipef6l0ajgr8p0v8uxhcpn4kf4qepwquxipa6bbp9aju1yiqx5zl1nsybi17gmza80ddodifmzotpw538wur9pp43qc9i9lsv4is52jt4sq7hxcrsw60bmf16gf6tkohuu63vh5yvmppiuuofzjs8kjh7sjcoyjj',
                application: 'zz1ze3veb9dqjlyig2et5mfzhg8p98hz5zik9nhirr78qhcczh546zl94pl4',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'cp5kjadesqit3nhlx4rjegz79l4gyrvghrrxymgj',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'na6bao90ak8tdvkc8r0bhsr3r8x7rxb93axpt4odlfd588nmo6',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'r7y862xkmd8cbqj8ss4n',
                version: 'to8gavlimw2sn7pz9a1g',
                scenario: 'kscybc3zi38eohgognrrfxugov4ztcn6u7r5gaaynwwr2dd3cw8oc0yik804',
                party: '64luk92d4rl6hgwjbm92smzj0ryafsfhfnsci9k0bh7qfhlxnxuwogjfngsopn4lpu7f2hr0xedkqay0nt1in3u9v4s89dzjgaf0l3ukmrj0riwvd7fsrm6tk7mx6umrl6gnra9ubti7nf3f3ghym2e1oy8x2uio',
                component: 'rdukc6lhfbbv3nm4gtni6s0m2c8oebf8kbeq6wrikuc51l072b87ioo1av37vn7m404oco1zerpi68xep7u9ke607539omlzkbkwlx130etpu19e7mxh6x6a4qxyh0nvj8apczwjs1zrsmptc2pyfv5iehusovrc',
                interfaceName: 'gsq20nii5wukitehq4wzfe2113hj4ap81ojfvtghoj28gzf0vi5li9cevykmb31q0x02ruscgci1207br9f1hgm8armsmcfoy3ednjkxe4c5zgnmktsxzjzs00ew0pif686kr2a21cc58r1n04ovfz7da7qpfgcq',
                interfaceNamespace: null,
                iflowName: 'bfhk24ew88gz9h1gn2w8nap9hx12blbb8jzfptu787rl2ugao7cnqczm6tejgc23ytsjxxyhe6iyiq4uobg4ba0n42eoi6kww4vgzlvaxh4yli236po33clq4z39f394i9ftb7vpm3stebs4okgwoq7v90fv392o',
                responsibleUserAccount: '18nimvd9yj57y8ymi8gh',
                lastChangeUserAccount: '6feuyul7nb0pg0sqysiv',
                lastChangedAt: '2020-08-03 11:29:18',
                folderPath: '443nrnweblh3ynkkqinra42qhqlk1vfgj4inn4rek4gyy4wojtc5j5xnp93audrpk3b47jdybfsgsdag6h5jotcc37fmdp7cx7g4l3hxkx80bfbd7wrmn7nzn9nkm0238epk2pg4ys19y6duhumxbtfb4m8h6vj7eufgqp7iogahrzbm1ma0bjm9fw3393j8njh0j2thak51nsj4qn91970jwke51oqd64b70gnuvazpb9m3q7xl2wqntkilx91',
                description: '1s3rbm5isust08t3netdeyoty5rxillo2afnc2mtplbrywgv5rl74dqs7ml8758mdq0iuawsrdfljbe4n1advikqq6xoqiv21y1zamo924hbvx9c1tseri04rm7h8m1a3tlzfp1ovz6autr637qc35g950gypdma2tmqpz4mfhdvvzqdj52velwjxvzayz7qjrl98h34ints5wd2oh0qvsfxadolz6knvtq0rid1476kndt82n3ga69fc8c99gc',
                application: 'ayhcf6cwxlrsuuyt6cbpem3iz3c774ihtb2upwfciknio54cxjcutj7ee7p9',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'pbggy9ti897ur4203nq2mwgeu6tliq6xv8pa6sqs',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'ljpqr6cl9oqsejs0aptowsk7kmu8sn564bowjghc9ryap482e5',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: '4s318csflf9pf59k1xwx',
                version: 'i7314p52ysruwb6jzrou',
                scenario: 'qperp0lt8zmx1ghscfj15n607i34h0eec1bbn5rcwhhob2m7gjoov41940j5',
                party: 'sway0tlh4977lcfey7ocu484a6rnnrn3i17wmr2a80ztah8fjf1zeoxeeglpv7jxshi946y5qtgbt7fnuzu1e6rxq4og809vk7ix88a5mp6cv9qdj626n0t25zwbxi6ai11oia0uiyfy8o1slka6gh3g4dgwfp9n',
                component: '3diq3vktekxa10hjvyjgh00pd11edmmmeag69u3k9t1q0vfrn7o0qev3yjzlj1hfh2knky5yhpczrotro8vz7d6ry7grhrxchnnzlkg6sdu4r25dsjfatjdx54as4ec57p30snvldjvjn27vt4r8c4t4kznj4u7c',
                interfaceName: '69z6ew3ipopgzhvvseeezniorlwuacymu7qeo0v7yddsc9willor9beoe3460s1ulnnkcgtw5431jurbi8umjhdtguglv9s1jpbaguqlpj2vsbb8d2rakqwye2t4ezr1hzmr5tactsk9b2xpbita7qns3ur711w1',
                
                iflowName: 'yqdrtl4iedd6xn5tj45lyt1ubafvcf7dfrm6c6m86gjl2vhfhvmfz5hjeknohh71cdvpojmieffwcu301oboq7yfp8m6rfvg7bqzy6oksvy1i12c9f4qi8ipqfk14wta44y8czp1aw2vnymk1l3odlrlzw9ww6dk',
                responsibleUserAccount: 't6wq2844orrba0gnq30g',
                lastChangeUserAccount: 'ikrdvtorpw0r1chu7j1f',
                lastChangedAt: '2020-08-02 21:23:20',
                folderPath: 'e17rls9dz3sy9mgdzu2qpy0qufg2prscc4x45hclwtw6vbz5uqstibqo7evriqjclkdpeyucel2nweau8galpqkhmmki3cbx7aqd3px6v6givv2znfa7o5jiriyzyic81k6pjjdo7syp3ph0ogonshasiza84akrabsffxf8w3uodbdk5mlyccqo8uwhlr7govcmpdq5f4stb4vnzi9h0s6vrgz8g3lhl16a24cr6s6pihivf1ovjxlfsoibpph',
                description: 'gkjtea8l1vtokjuri9lp4bq5pr228ymykyov6w8t7wsxua5anpgjjwk8np6hzj53nwohpf8mya4cxvnp2yrwm3gvrli2zdx3t8xy6rvihqs7pu23w8qsvi2xxcw7s6ln8kbspo9sz3sch2si239gjg6ljiqjgizmm3ymk00ixxk35tb4zznx769qe6gfc8rxboi48cczhcm4xz21za6u7xxby8zwhhycoaxpkdqq6mydrc45o7ow57zaujk6i49',
                application: '5f8veonwyu3y7573qvjbvzbs7lp2lbwatdrukcgr4n9gyqn7p7z8sd0mf3pe',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'it6kjip1dz6o2bdaff87xvkthiqlw2vvlpx4w',
                hash: 'hmqk0tuz2vyasx63fs9nzi21c5e592243kdaq4t4',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'uw0fxrxp10im0i36z8ojymy0kh3qrqcuom479fgrx0i10xcqa0',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'jlpnzv91gqyw47k08w6a',
                version: 'u0scztufvsqghewk9pav',
                scenario: '97qi86kin85bs2d9j8nngqjr4kfimogfi1m4t8vos09xjog93qi8ldj2prab',
                party: 'bkbcvdadg3uoxf1demteojnlvkqmz3dmhan4sdo2shrv1tujwfsp0y0f653txaamrov1txt8l2w641bnbs41h4ufn1yag5k7qibt2txa8xyrorvgoas1ecv5hz24jm72uryw47q7jcmqv828bxeltu37t2p1ovzh',
                component: 'n1u3k7rmeccdfw011yl9803sm42douxlmtw7bioppuoi6nrtdwnuc5nc2kt6jdyiuua6uyq91wrfs8d9zy3lppxc49xu6pu88og0r7qjqf604z6spgsw0b30to8q59i604jr73tdg4chp8rafr6u3mabn2er6pye',
                interfaceName: 'j2kz35djpgyheafuqb8j3zrumkj7fpovh097qswj6f4k3ttvtsy5597kbg5ewaueib3h1ztb5lg98k13d7f2omldkhyxqjmj1eu0x94xg5r4swbr9r65lbwfonmdri0950z086lq03cgutlrl1eokrp57g5boaf9',
                interfaceNamespace: '77x24c6x3l73nfqkcxr5uk66j4qexpstwmni8wm0il84dztmqrp2q7bvczhnq65sonc3busnzn6jthwxwngxnplcljk129htc3qsbsaxux4q5yvtabahnommgmhwuog466oyj7azge09tnxdtywyvly02q0t0cd8',
                iflowName: '6aqrzkio8ykedwgqkijg3zx0lw2mc30krcfv06qzwqxl570aez2fk0rvlq99vzx4wcosprjmmx4elo2tyhg8u8birnjnotab69gikbbulfpa4i82rkndmklnaqcevr762yx2yjx5f7bhzy9lzhh6dtcx8gyzygig',
                responsibleUserAccount: '4glr9etthy2b3uhhc6ue',
                lastChangeUserAccount: '82zz5v6hzuc3273zvhk9',
                lastChangedAt: '2020-08-03 02:14:11',
                folderPath: 'vbdwog2z8o5n69n39npaz9l630id2rcqjlelh9pr1knwy3tu2i573fo0l7ktulkel54orne64bwkw7fzk8oxnhilynitzox449hoteilog9yo95fx5ek99xbp8qbvu9ecrhbsuvlbswrc936wczunqi9jqzckauk35pr9o46jll7t581n8bx3rasmua17tsntl5syrb46spbuadawbmx19cfe5nha0gli95uvcis0dqzf3lyq2hk6f7u3ifdj4t',
                description: 'z63dyilxfwebb67rjwkn9vkehghuu1rkpkcllm2q31m4nmn2s94jcyi9g7gvheuuh816b56esbwe0lsz6m05c03yujipnt1yh37qmlsmpfndofbc9z6ljjjp30nvbh8u3kgo9snfpy9gi2k06317ple5yeu0r23p7elgfs5uhqr6z7rqqp1iuc4tnyzqjw8r5lwiadbnlwa13tfaj7jenaxumlotwjfu31orekad0uy0v0vlorz3fgg3fk1x3q3',
                application: '4j95akfi402gc33bwn9xio945c6bg5poinsqbp1ljh2snyo5oq317681x3bh',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'v8on3g8lovwotsdmbgdsb4y0fu79rtm5pqh6vhzmo',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'tn2r2hw9lsjgi27fo1ozociyro6jdkhfayjuf0vwi0axcj199t',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'sfsiu1ogxrri9oa6swc5',
                version: 't3h2ubrk46tt6vpsmheb',
                scenario: '7ez06jl95p237y0o0p2g8wci9ehybojnmdzuw97vkwda21o543cbv9p0uyy4',
                party: 'wdbjoarvzs3fnfr189sgvlxs625hprdmkahcxm5fwxqbyht0szgkbakcwez0wjn7rztxam851eu81jwweeq9dxhxfoaqc64dysrtixp4pdxftz10sc01vo60zda9iykiny8sn5cuupj4gsl6khmlnoo24e0c5dkf',
                component: '5yrug69stddn3150fmh0dd3gj7qxbws9xkv81bd03d5r7ouuydzhwrr0mnc7vmjti0i3odtus7m3x14el88mx1u2el7h8ssm69bvaj18d2wmkdlziycj486gu71y9i0i4t88rs4ax7az63q34c2nuym4gr1zo0lz',
                interfaceName: 'tx03p5is4f2gi432b4jbdyk45dara949l3jwct0izcl0i9u35blz1j8nafdyujh1dychfeoy2ch2t5g0h1mmo0z8q9u17hd5w0j4261yprlhsvtyqtdye48q3udixengwxe0remal04txxwkqkniespiidctd9ei',
                interfaceNamespace: '89gi7ru8q258sb2802wm0w655c4kkd77noyoo89rgpewudlhquvfq5e3l5sih689pg1nos6dvmrkndpkhdflalcrlkyuhkn45u1qbmrc3ykqt62hb4w1vrhysf8uetfmywwa2xalop4m3pwi7kbaqzquskfr06mv',
                iflowName: 'b9fjjmzc9qc0l45unvnk6lig63d7k7v9eou80msx2uqwrqjwrcw5a0d0cxzvo7b0kow32mtuj5qhw2cbwe7g4l186791jrwodvt48m4ey3st9lr94h0z69kor0zyo8b6uowqnx3cmhhjqbwx2pqloz2mx41m4380',
                responsibleUserAccount: 't0l0rsx1ax6mhbi6udkk',
                lastChangeUserAccount: '2udnq0m3i1dzzz1tdc9j',
                lastChangedAt: '2020-08-03 05:37:09',
                folderPath: '3ro4dwytld6j8oeief1atwnfjmy4ca0f6o5efrkofi2bq18zzmvnkaw6qa4mna7b2v4f2bigmtjxll9yfg0f23ne8byinxk2j6gnojsh61afebiwljcqaf8j77v2o8pkm7i3grm086v0k3njrh25xctoyay7awabh78dvdu8i58ub7rwsmilfjnn0zmbvc3tvbaet2hk35xovhxm0iw009pyhlzmoaihdwqtwh4sfc1abulcw125kvoyt7rzsw4',
                description: 'sbksatlzk8pgchbhr8qg7dk8fwdona41kwxkgc9tzkc7ox7slum50dufb1qhpwi7t55l87d5aoumc562gcmp9ltg1xtiqhq0qc3qzbz3gsjvie2cdr8hw7n3xqgdeecxuem43137d31cjj1gasl8chf2hkm0ji2erg5gx5a339maxaol3xy2gkrh0xwv6kg620hvjyruvjfjsniy39ev2fnir4v2nbda7yv7msnr9tke1jw0xyufq3pzc3q79vx',
                application: '9kgc3xhoqn91zgzbcrgpvbkmjkkmreiksmopsqsgz8i5kb8tnbwjjk5aylyg',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '28ljk9rg1g4eerriej6wn9yfh8z4aztgomd09rki',
                tenantId: 'icy30l4mj9mdxczp5o8c8aik7a6cjrrqf2bqm',
                tenantCode: 'y16ofkig92josgqxf7rvgwj6wuxtf1t39pbnynlkpbgt36kii4',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'at0u73g56d0evxj95bmd',
                version: 'vhl0g5mx34r1ctttjeqg',
                scenario: '5rsej39pxzzkcc49jl5myflgrm0mqx3hme1tehbwhm2y19mlzao863ow37p0',
                party: 'ijkbqmv20h8eeq5gj3l6hpim1pu33hfcje37wsix1ynjpngdqlaow4uny07oas6avt72wf5xl1ty0r0u0es0vzoy174f92byt1ifrdt83i40zkud5rkn8pv54u2h3mkyjsqs1qg254d2q31qf932eqwaapgs18oo',
                component: '4wu3zkmh17i5uxsbhkn3oelh8a1axu49tn9e19lqdy75cnjigfrhex3ageelisi1oi9gd601jrzcaoxoh5xttyur8cobot822ksx2mz2a7a2r899lo20kx28oyk54v5p2zjby6w9wlm1kyj5hv1b17q2ci0vgcul',
                interfaceName: '35w3ayt5hckewbs2y7a5ymoztao88949n496exxt1k6b5p45ou91zc58kxr9f9zlbjvj49aniayszd3okzv5aq1dws2sn2varzcus6l4fa45q8eg6chb203u5apa27u3akpzvnpbp19fucnenh0kk5mwl6ow6ria',
                interfaceNamespace: 'p95hdneee57wp9iim9i8nyl0l0lgllogjlnfr0pkk608kguh9rhvcy3u51k6u6ruiwv3fz7hwy3z2l84en6z100s0gxe1xz8crd0se0vnn08xut981ii7yr9ki7am93z5yuvmnm6xqjnjflkjatnoxtwsxzusxlf',
                iflowName: '7nsj9wbq1y7p7es5z5ryqyokz101etylw5puppbofl8n4i3zfj47kqpaz0wqj5dmh6qod91t61bvby2va3rd1qeszajofq7my8v9hqutxtemxpfvozgwjvqd6xvrr6skybhi29mf5kumirn06clasg4wct3ri4gm',
                responsibleUserAccount: 'uk960gxemsk15his43qn',
                lastChangeUserAccount: '6h90gutho7anqkisumpo',
                lastChangedAt: '2020-08-03 15:14:01',
                folderPath: 'jjyhh1iqbdt8semjxrwwnpv0f0kevg2bcmfr8hnw9ncxzcl6myd9chetumzzhasj7fwi6kb3d2xnhxa5k8wn9i20578y8x8zoxtoybtyq4xv3j8vg72u1lz7v4he0ewkgqzmhjf3vyzeccnwiv4dfliwtuaf8u3bb9wupqnqrpxd0qe0nc8l6dfqc6s81d3i9792jjwm1hiyc2g5ob646sqp4j3x5q5rrhifp4lcn2aftuvwdaipoypbkau8got',
                description: 'gir06f955gaaajv53lf9gfr0m5enogmf3w1562bsbms9x6x3aknwabm0s9e467n15p5ulq0luchch3um8er6vhns5ec8ez0tf34y7drs1z3v568v9iamndikdyr225p5gla4hkun5ba6rcztffaj1xijj5zkuvhiuxgeibc9cvyih3i2uz7lqvxxj7zyb3josfdhkq7w82x8pkr0uvuu2mbo913yqeldpqutzjzxvr0bxxmxwr5rlnm8r1kzloy',
                application: 'y1vi3c0tudwqoajaqdc7g7etjbvsmy15hu6oz1p4vi9pvyyb0qtkjd9xptpp',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'xmsaxjiudgi8iykc88of0b1bq9hilz4nj32sqmt6',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'q06qfmcy2a9gt6xsxf0beeppnyz1lcl9ir3t4o6o2ioageswve',
                systemId: 'mhlj4pmh85gibcq1sbrnnuz6yh0jgmqnlqaay',
                systemName: 'lyrbsnvd234th5oq6yu6',
                version: '2owi2ogp1exqfk90qetr',
                scenario: '5fxnw5nc7p4980vomibb77xl317pnzemwot81e622momj2j10gqdggqcvm4u',
                party: 'dj3li2oxha2wmziwhn7bs0t0lwszs7d2rnhcps50vu2k6o4rxq8escp38tem1wsstwst2agw6jdcev5vuj3pih29i54f31o27zudyzc8i1pirpynpz7j9sosbezlp8yosn9pe1oqhtlvqmzexdglwzbkyp891azz',
                component: 'j83rgy3vvvqsn4s9kqko8vrylgimpgekqknhreq1jp0kvvrzwkuuh0lkidm5ihbgfri1ozdp9belsxsycl3j9eln2ez0y70qcs948gnz4blcvihvrr7qfldx48c3cysperdz9loatg7542htrg0r3i002wg4wq2i',
                interfaceName: 'c5iv8j4y5611ve77cxwroe40xcmgcgy3zdjwe1xlhtpz7888b0ikw182qohvjb6n4fb23ujletrdnr45igpvdwngkexdns4jkn3unjio4014whyy5be6ne0ad5s4dp9xqbywhbwetbfu3x4fmh4ia7l2k5jyj4cf',
                interfaceNamespace: 'cmjhkrj767jdssx25oiyt5ktmxr37kcizyma465g2aned14d9eitkteryxqvpkx6djwl1bi551pq95p2ncht05nfl5w3pw94acuh8z1yrk64mkvdmy30rph9bt5341ktgqpk5saud7qtgnwdgy96r3fma5m8bv5w',
                iflowName: '9u5wo8gk2g87gbcee762wg4obr9ajujaagnr58pevnzjjq4vag7jzj7gdokpodgk5ie23zyc10ige97brftg21m4wqrjsol77p4t491t6xqfqpiuux7jhizp2qny0og0madrppntv7bv77bw85w7bki9meeil2ul',
                responsibleUserAccount: 'urnga3w3ngvfvrotuu8t',
                lastChangeUserAccount: 'pfagtj4d7kdqo3j18rgk',
                lastChangedAt: '2020-08-03 01:19:31',
                folderPath: 't7rl0ocdukx9ep578jje9mkly6s8pguky4h1ru1vnnnlefm5cqrodwr91s7jo3u4u42ryu8csj5g6k0a4x6qu7deq1yj2165m0y0eqwze45rfzpvc86a1uukcix2fpcoypyjyvtij8k7wrx2rsgpja3zbws0bfvxim85w3e2xs8cbqnl8nrym9cq9037lqfeoubk2l4739y7uemgqs8xtui1n593dw728wzbrsmoh24jul3lvg0j8n4d7h2327o',
                description: 'hsmf86wk9h582ni6jy9u66tf4y6j40y9p94yd5pz5mpjfy35zavfow5wzk4foytsgbtmkuoappkck3hxn3e233icpxj3ukso7vk67fy7moz6al23tz44fr58va1wwixnlxklxy1j3zf7gt1smsvpn454oblh0z6kgykiihwjsn3yal3pf00m7eku0d3ysucun92fyjnwsxjaak1xmehymu8ds9p1asi0chgyixk9jka0b1mmlwqj9uzm6o9c5hk',
                application: '3ersr03bf55o9ndgbg7r5tuxjseltumq48fivn19c6qt9zs62bk4uzdcjisl',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'yj78jif8ikmxofj9mejdlthyu9bu7yo7ogy1f9a7',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'g1wv2urk3nqnphqb5pvj874mnujumrl4zv6p0sdpnixrutsi8a',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'o1du3327hdvty9s2lmz2',
                version: 'y6s4cxjtbovg6d5ecu67',
                scenario: 'z19qu9n8t9dspe4fejdoxbvblzejnulrhio6rtnzpmulj2o5na27ahk79ikq',
                party: '8gepd6ok7h4kzqd57yqswpin25cnvy858mmi0s09tgt1je1kjvv1ty2drczjtsutpfrqrw6ccur8i08fltj8vi1waqusq82djxhroeia2cyldccuey95803t10dl8sb3y2da6e9ymo8knyjps915307kvplq7zvm',
                component: 'ik0iwla4eb4tccc2da108qjeal85wzh70tqrz0aeasei1by1fjlck3969hbv87oqk4mjnl7mpw87ddcoocpckj5abaj6jexass767ei5gqir51tkjod0nnsncy7rdrsoms5954mi1hpdflkjy4bh1lmy7s397f1n',
                interfaceName: '1w3dqjr3mqu2n2g276h7g0of177wtzcxmwsv9exifkc6abfj84c7tt47wu6s57vmrzfwr6w9qpd0tgcgi1a87kw01gdms155kfaeng6b1mvpgzf5lzwlsmon6ixjh7h9ia5vwhap08xs8dmr53vyyoimjm9uczgb',
                interfaceNamespace: 'g0vlfm8mmz7vh8r5amkaii0fowk84v47usuz00jrxpw4v8tfsdlaj0zby2blwqauygoks83iw4uftjxi8gjo422wu3j9k9xvvqm5m0h30ugn2i5gka9ue4n1264nbnxoxct0ctjjruv490tjknyw9xk5q1hhrxk3',
                iflowName: 'fa4f03e2hwp1ey9qcy1at7d9yr7oggsmzz6wyr9idm2edubl1poege2lnoekxwx0bs8d2jo8p1xsk1phot7wzyizxluhgelrb1l1lr5mwbh64jvk154qa8kdyfly7baoetwmiop99l52cckb9fuhkq31sjzek0x9',
                responsibleUserAccount: 'k7hna41ira1ezo4ivio0',
                lastChangeUserAccount: 'ef9neljxmo4t3rispu6c',
                lastChangedAt: '2020-08-03 07:28:20',
                folderPath: '6pida7xo7bqrivej57ebinhgstlhb1g6afj5lqnpz19zkfmetg3ol5plecn0tlsv080yi857erny1y1zoogca74qfhdmkoovuv9ztuqyf61n5a6st6tu2az5vxvuxckdfkmuoetp10io370cg4i7ajh52oeudsdsh2lrlyeuycwreeb0y9mqp5clty5359mn5sf8s8gfs28n6q2bpq59niya3ge7906wozgx1strxgdd808wjsctipbsep80xox',
                description: '66upssire3ck27af3jcj3lf6bdudo48wixroi76wtscuwh83doqkk9mpwtqkvhtirfhqiqaz6elaj4ez2gm1eu0ml9bt5btj11pajb0izylwrp45pgjvxut7bviv4xjfvnqoruxhk68czhd1djd58q5eyt1acpuo6uj9rr46akzm539dhgyedx1d7raqcq76418ailwhc1cvpv39v84jmgg43i121bqhwyow8ykhhsal113wz4pwpn44hu5yobu',
                application: 'kiiwibezu5fq6ubr3hkr61d6k0f0ks4oen2l8uf46oebah71t4vsntaao7a8',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'aozqum8xnxxux0farsbp4ikkn84dn9qhu0qp1',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'z9knlvsxqo2t6pqs258uxrh1o8y2ec592xa1t5e8',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: '8ofdjpsnij0i7tvlire4hogtkcyhd5d7xt7q5jtdmwlc56h6024',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: '8odl3whqo099i9aa6j7l',
                version: 'es2my3gd3u6tltju4ote',
                scenario: '018bw0ath9dk7ttim2cetrq21wip1htci9qzex4tgp2mvp5jv4m6ia9txsqq',
                party: 'x6yfw4srr9tsnss30wtbangndivtosq52jk9syx2mwsc0nrlz1idyb24dt27imxtviquzgdmpz87y5s9degi8202u8s8ahfb08cf4ked3664aok8o9iuinhv6wijz53d2c57wvu2z12sft98r0z24g6fjvqkcs8a',
                component: 'jg1oesur3kybh4jkgdcamebbl4shjvsxpukyoatpudhvk1vgupotaukeuocykca088nmg7u8idkypoj38cawbem7gbjckwv5lz6ozdt62b759tkh4a1chqj2w0xwu34a6p9nlfspfqqud8rzl053fwkxjp6iczzn',
                interfaceName: 'r9fwe53rxemzswa5qjgytcdyuwupoiqfoppu7pr5faoawmdzjkeip70gdu78i23tp5xvsbhfuyvxwcgz20up26axb5ahv3x0f8bm3mvo2yvwy6dxqemj9fh960x0v6zm4jtdgvoiq7b3s8a0f2fphrvrs1c2ujk6',
                interfaceNamespace: 'jn32v1gawpmwjarvuc2mi5cizkf0m9u6fx3crubxasdlf6dt9fxjfywweh6vi0d55v70ej4lacxjf23wq38ehmknt171nthvwbr9kfxblg843rqwpevf685r19no66uis6xfaje9h7mn8mkev7hc7pe8vjdcs3ew',
                iflowName: 'spsyqhd55zx8rmb9wc3pmfvpxzxx6wrxj79x1l8iphf4xh12ouc9crfz1pg1t59mxgmgmlfotz75xa3g21i3p26hd13jtvimn0q5yh7rg63jeetgz79ve5i0sao9ditl2985bbx3vjrvoifv6xi9v8gvn2lsbw9b',
                responsibleUserAccount: 'uwwr12c0iiy1d4td6lfh',
                lastChangeUserAccount: 'ny1bvkfaomstkld5ne09',
                lastChangedAt: '2020-08-03 09:09:03',
                folderPath: 'q706mgq9i4e78qptxu59u2rl75tpktizws4et3zdnw578c3wrypl0ej1w4kg8ubakthaz26z3edebyvkejoufs5bjdu37n0lakbj2pdlnprbkt25ntx3xng7sk048eru818l92830512bjqz6ao4rzxilzg0tg9te5s0yllcmw4mra9c4gybm775g0lw11nszlmjufzkonrmgj065hwkbz6m2hbxikn5r8bhf8zadvbtrkkzeokap3hmaadveze',
                description: 'rl91b9q6r2wtco378h9di325akdrb861uia371cjtv9aywfxphve73oc292ez1dzf4dnewbufgbnlzo5iv3cut098s6gd02796pm8tg4sfxaxa71lmqhbxqsbyaxx3a19640tdoqv2vtzuhfzyj7c0ylxrf29r1hh8ijbmqq46vp6v7qp8riw545jm2r3utt8pny36doox8bpq7do65476gngpceoyak0zaybg6s1hw1iyr43fq8epk2eujy4q6',
                application: 'rnc3p6imzrtymofqllhrdi3fz4p8njvbbxystkordo5necb4whadia9zzrpw',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'fho7r4rceexruu9wfbgcq47goxe8x9djv3881w1a',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: '3tl7yiq97hvrj1r4nr24r33wx7f2gf6r5bo1mzb8sa93hyz5av',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 's0iyamlbot2j0pytnelru',
                version: '166xds6fn1tnazxv7zmx',
                scenario: 'dnn47afc8ejg6t3dm3biyzs6kll1x53ndvycwntl2fgc051t7ner3q5z06nf',
                party: '3rtj3vd5jxhipohhj5a19x5f6ekdjlguo41ooxm32fhjjxo59q9i3yjf8w1g8kwddfegxil84rbaujwgumuodo4qrpol7ynum13tjy624pmdw45kc5y8fnild49i0wkscuhnbf12unhc2s894fc016yeyhpj8tby',
                component: 'dobc4q43jb9e3ehbj5n2ylxbswo1ury7lj21h452l3r19sm3gk0dllw09tjthypxwy8yi0kvq8tl32u89euwu98pvs48beri021310hu1ud5w3skf33eedi3zy60wb11x5gwq4clr89kcvr9ekd0reb68jytiiok',
                interfaceName: 'd6r0nyzt5t5f3fajsg8lb5ndprv5v0l5lienfm2mpbddus8nxmkqi4dtesod4u5d4k4sxlco8cnqgziszwe1pn7phik2mjp1s3xdtf2mbgzq5rdhut6a2kux4kqihe71gva064glowupih9cyzvry0jbgqpkomsq',
                interfaceNamespace: 'mdxh6ux2pkprtt28780stt2t95u5xdi0r89q98lgblhugjw38w4czvb1ju52ak2b9nh4nh7qlluch7m1rko7ek2jve4kw2em19gfhmzcf2mphqvundvyten2yaepplwur3h41gsdzgq3zdw8mnkmnkmvzli35h4o',
                iflowName: 'blaljxkciltda8a88q7g6rvu27pttvah85n43z4lk3a5in9cczq9223gjbwhhtjwkbmthpbhx54uhq0oa4ur9tx9duwpyi2lhfmdrbvt28rbqg50rfbqieu9klnasxvyabnjv6owfcwsfi2a8ujy4h4nidl3ujt7',
                responsibleUserAccount: 'wx2o27xmi5jzljdf5quh',
                lastChangeUserAccount: 'vhmhahdun31dun0rj8tu',
                lastChangedAt: '2020-08-03 09:38:22',
                folderPath: 'xq9j5nip7kz172ts7v82wu0jwmmdwpv6k8cw22sspt2n1hm6a372kjf5ztcosjq9uvzuvm9b8yyk7ye018ps0v7ystbwcraxiksbbixshj9mthk0g88ek3jch6y5syb2k6mebahf9d2umn0vriz1brc9yfoew0cqba108mqcth4lcd0znqpg5ezuixnnrdcknsx0kr39abu1rrovkc7yjrf90vvblu7yca6kesazh65w8rrmti42pclj4dc32uz',
                description: '5sl2fa3dgznynxmhowrvgjizo1l0j67tzatkqjc6r2wpro586vcqjqxirwlztsvlorfbdoi2jy7psah7t21rr7xk22zt31ksww5p3xqjzn0jba40tjsd477lbhx6i05eyg7dm7db8qg0g1q8eoft1k3o5lox7enquayo1pzyntoh9prwukrelbz33qse32lt9nnn702ujq58d0qn5yszt9n6rz3lm55yogpym374efbrfr6e6m5kwpba29emsu6',
                application: '1xazh4aivrrq0ggxq8i5wkg0k934gkjjq1axeff356dnz6e6fxbanhs22pk8',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'mwny0o4q2fzebzxrsa082q197xc8oq6k7wn284n1',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'p9viry3wiltglktczu11t6hr9ukii6ee3vfjtklbenojjvmy15',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'q2pqc2gcg57uv5glynzz',
                version: 'cjqe1jiv3gy3fr3mbi74t',
                scenario: 'kcb314ncqogqois0pfsvmxiydki39l3ohoflxu5q8vnyvi4wmk1fbafyaaly',
                party: 'emp87yl55wsj4ne5idiybg7fopdru743hxd2ect9ilf3jtlb549kzrvswim25pg44bcf8yjjjykdxltvv5ak4hphvieew9skrju7gd8qsdh9rg5nta1tkyf55n9fq3bg4sjqfrf8vfd8cyr1zpr56tiyduh7orna',
                component: 'jesbgf874jrnbm6b3dkni5ba6ph7wlt5mopxcbpwdg6vve4bxfordgfdt0owphyiju8ut79inmdi5g27lsxmdjhfc9j99k89hqeywd9idc4dnldpzr2p7ynbj7m9wtrtr09lcu2llivqfwg4ob01av3og72iqe1f',
                interfaceName: 'gxauhsijtdfcuzkoqtq5v3c7s4d1awe5sxpvnmm4ei08ff0tkl2s9kk8v9ne6c6jxaf1ew0wpo0p1nwyp0ijwibnn6dfl6i1loqjtolmpn68iklb4xcdt1jy7fyrc1t46h5ez7s7rjhlbfcm7hxbt1fi52xan0wa',
                interfaceNamespace: '2w1u9vrr538bil130yruxb6oy4kwkn8896cq2jhncr12e1yyu37nxeqmdk3ydvhs0dvqlbpvoh7vv8muwy31oy6mzdl0rldj4iqertks33v9zgl6eghht36dayiqw740x7tvj0hkg1inaff3xdxrplclny8fdhdy',
                iflowName: 'rn364wezhj49w979bo31cgnoco44fqtwy13dh3f4b8b23x722gihfyhef7ixep8c68mssro5klxi94lhqqbjmx3jymddxgiuthwjpqhdmricwdx5w9g17aqxi37l3gvi1yto8z2o2tg40hvf9kw4vk3fg4a7y149',
                responsibleUserAccount: 'yje8smdtgzw9zdf7jd5o',
                lastChangeUserAccount: 'n36kktn6ycyz7banum8p',
                lastChangedAt: '2020-08-03 03:09:17',
                folderPath: 'xk9gkkorqjc7a0bnur8aagzxpialwvt0iwrnhtdbceuebcuh4wn0oh0jkprygqnvsqq9kwzzjswe3gxtwhex21u2v85f1l1wcijmv3yhdgyweq7mkbqk8rfvkw244t8fgn82o8loi8qaprl4p6o5lbbvk9rsmz7fwejoa0e1ntdpk2df119wm6gcdtxqxp10kw4z7fnplwy3dm8ydxyfeoec36eedzcte8911bmg1yzw1gc2fhcvt6pbaemttwl',
                description: 'vg1p19rnn7hq8aac98snxt2vx73pz5600pwhiewxozt1nwvvljmiuzgtasbfhcpfxjau13ssja0kxc5btzn0yhkms4quyi61mzcxei8y8d04897ylygov6588hpn1unjkbx0xj6es1ehoza99b6qqn1sebp3266gjfoppijacmhypr742ifqc0juvnqid9s72rmr1o1ma7ud755dolmr5tmunan615sr4h8rnioipxr39c03kictkrj2r8im1qb',
                application: 'mwv61kjyffj8bdzcgiegs4iocqm0hbgwqnqufo0k76eh4e5sddou9xi4uyji',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'dvx80yezozsjbt4siq8c48p3n57qzecr5fmxliun',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'd6dezc6ojjus2i5re43iz6ael3fuj0gdfsvqj232la1t86ebd2',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'yunlorr3qym80rqwdu46',
                version: 'vss2p0xbc0c3i887m4mq',
                scenario: 'ms0ycb73btgpbz37mgjoq513ys9jwyeprlfq6s9dbi8evua7poaaohewaitpv',
                party: '7tvotspltenzo60z76j3d58bu5ly09kg83e420vb2qvphg4295nav9jwbowb1g9doalv569vs7w8zfrewt99ky14w75mg4i6ggk9wigj2ovga8btc45yjzwtoili37fhdz0ymwp3hr0xbazjow0dr1a3eeb2xo5q',
                component: 'qd1j9dwlzjaj1ocxvq3fn2hpi05ake4ba5m95wskusyllc884r3ywt7qtzxlepgrxbce61j6d9fz6s0cjkyuvhy8z3v60uy2pl9jzhwxgff9180cshp8tmxebk3ippkk1n3unagdk8fyxl0zu4b2ntoi8rwm8kvg',
                interfaceName: 'o7fgjrdkmre2xoajnh1g4i71ibma09qsibju3d0frlpv4vvzct9a5s5ebi6ccmik4hbpa1r9sfjyy3wv0g140hcofgqtnusthmcqzuyr9tqwvqx09rd22n4ldl13bg6vukqrrnf15n42rby6zn32vy8rdfb163nn',
                interfaceNamespace: '1dtf715w0drisogk3z7hem9jw9g0fj8z30ws84qhe3jrlfze2vaqewaz6n29xmwyic4e3vk9byoo0bfd4ya7i0y5npbxgttkqrnud9lhueer2ctvk4s0d65ufl45xlfjvmpw231z7pf6jbxhd9fmedq74bq1yni9',
                iflowName: 'djmp5ccjpher1dn7c0pzzvkrrst9xkpgfi2m2u6o52d4gvjk88b4b9qd2usotvld0h1l6zcbmbu70owczcr304o13v0afoszyut6si09hd6nw4o893ie4va166mpkaxiy194dbuytpcox62jli3ii9u9y33fvixv',
                responsibleUserAccount: 'rtn1iysexz98p439593g',
                lastChangeUserAccount: 'amczqauywle4esisotht',
                lastChangedAt: '2020-08-03 15:52:08',
                folderPath: 'hlq3cn6xgl7ydr5lul018qwrbxhid0xmqhlq6ywgxl2vfmaq9tzt6ebo1jjhicjsrhm81afd1pjbe2phomofcv2zfm3e9io5crhy48zr8tlrl7h6freaky1ijzfofizdjzzrjipacvyxl21cweuqc7lcgfj4a2c9g6p0jmnmmulrr7pdgfjjlel3sific0sah25811jaajypsn0ckhu810fqu0hcsai9lhhtyaxjaaezy6dig8w592u0n9t5r1i',
                description: 'a9pvvuhsyqnxpet3p6ye5s8z67ry8q77jcbnzfovim70cypr87nxw0ir3diwqgh6u6k5qf5xufwsjvi5ojs1eqnnm2jcm5vhvkkrxmrr4bdxdcpc59q304abw21i4se2ahmpv8ehsqwk8qa8ff8rba576nt8o68s8cg8zd39euleb961ej3yv9w2kiplskhpc9w94eutpjxp1o9ya1dyyb4uonyt8uzs5bxf5oxiozs0itwidekz8p9fjiomcli',
                application: 'mgcp88qla5bubqeaot77sefdnpd0jot9lf7ocbrzazowdurcx42kbkyjtr4a',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '3tl47n6d9jc19t582oqvjz6p5g135hvsmxfzr7e4',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: '3to41sc1o8ujyf4s8qkprcmmm4hchf0sc0q9zomi6enivsqbl1',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'qqomwjhsggabhnlrwmvx',
                version: 'cmhvrtmovbrwy4gzks5h',
                scenario: 'vwgmf81fgz0zcqtiktw3hh2elilhckh7hq3140nyswicaiy9sekm3pbbxxqr',
                party: 'hrls5ukqrlrojwonihnr7b25tvg09c2fp02517hal51awujam1od2i9jq3bvxbuxz4z39i8m3b0xkj4bqmrtdo8wdl0cskbg2shr3d86euizfn72us1defdwognfdkkj6zex06j4p202xdln7dc2qt63ghxxx4vdj',
                component: '264tut0zy0m50xt5c9s1oya135qk8ayao6r7yczmkhoj9rf79r0g89hkq8xi4sd5frsk5divjduhzv58445do7iw49qnt397ye0ynuam0g32hzrkmiaxnxorz9i421euawd3t8s8xwdlriknk6db6ms4vf5xfgey',
                interfaceName: 'q0rd1kyagba1ghuk2u571k1v5tm10h1bra7rsfirhyzxrvpr0w48xd8tgd2t2ege9itahougfrem8n90kyodr20d3kadmoj8k1szbkld0b3ev4j6h6iwyzk0zue2j7fdk2ybs0llxmzpdx14f5arutz26kivaiht',
                interfaceNamespace: 'kd9qwljy234nl8r63a0ow010457m16l2jhymm70von1xohkhpe0bot8bfdv6p6xby02kf1cdwmsc6klwsrpbaps71ny4g1rwl5bj57dntoln45p3ftm9twx5kpg572uqwlwbxvwl7r6esyfl2lboyd6mwcldd1rc',
                iflowName: '3l5pgjrapbm0b0h2f0nmkdobaqyczwg1au8fqevmfspb7trr2dvos0q6yssc16813ij6wh6u6sakb76s01r1g7gq4e7ubn3ecp8z88ppy6ow60ew4myn1ounof53bd6z4f9fdfz1x3ox529u48jca3k7mxzzqesq',
                responsibleUserAccount: 'q00lmnwsjm4pik9qo0ni',
                lastChangeUserAccount: 'w9p3enc65nxjtd0wil32',
                lastChangedAt: '2020-08-03 15:21:29',
                folderPath: 'god7ft70uvg8y0uj495j4eukozo061sw6u719n05pm8pcm6vwcolgo0up1pp6bll5c5lojabrrs0z8kfmiae6pje9kpi9crnd6sppbux9xtjkx5iehry8deqtpx80tt9qa2iweddnxxiec3pz6mafseh1u3ha17q3z2465ugmqzybvbp5p32xpzmenhf6eehuzzcova6024azm9xdygdc9cpe2eaum6e9xp5giqi9p7a6ty0wc0gv7fq9aozyny',
                description: 'pe2ylwgaa8ws7tqhhh60pgxludmhciqs9a5cvcdmxsjlt77oeqnrzc9qsz1ahpqtnpzb2y9f01fxvdap1ymuvmfvc2jtecaly67oi7m688ldk0s8iw1dmqx9qkun6ey97tf77b1cyjvuw495vobyrums8cu7nybegtw5oafjho6506p2w4gnn1qipi1hn6muo4fcms1a3qj15a6qnp086juhzno1bw9cm2mmszvoneqeqss8x13x0u6985atxu4',
                application: '002u9ysfjciwxa82ahv8lp56d7qu4klmw2llul0s2mpaz45a8gyomp9spzar',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '1h7fy2a0zayysmphjp3p94i5u0gvo3ofofirn1xs',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: '5nsspvmhczwb60psgu2nm8bqyydefsbzlbqi69i0spawe1moig',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: '1ceucrifmeqk8l2xdf2a',
                version: 'pdzj7z4o2n03rloknwt8',
                scenario: 'x81jvgs1kq3ztutxtv1qpqs07y9l7cigy8o1wkwipok0s49a3ddxy8fyxfxo',
                party: '4huugrm2y31mc2eqrqz5026k84a1avcdk9ojdsb68i32ldntibjwpx7chmvqq8stadgeiacg6xe5y06urifjs07iaqhdpmfw85aq74v3cup139udl03xrd2idw354o6demdx4q4lkkxsyjsnimyjuccela3whi3g',
                component: '78ka136es9ai110lgwkxpgr6tdwcrd0ymfjrefx1zauygcc8cpmpchsa2nwb4znkmyloc3twi1reni12ge889d3brgq7syein3nym9bd4cj2gnc5dvbo7j903i5hj3twmyrs2jgj0rrnxdk8iu9hlbb16dculmr1b',
                interfaceName: 'y2q15vrnws9j0zc9y992hts5pvtj2k4a1rv32rztkyjip9wgtk2p9ugxz7c9fhcn1022hz4e7radet2ngecqu65cuxlds41dsfqzmxs5sgbudwlrn1co9fmejdqt1dbbjhor5q9ey7rwrkwcttyl6zqydmjgf9lm',
                interfaceNamespace: 'fh5b7xr4wxb97l58yte2uybf462bb71d6cdl19lay5b4mqbl1235itt1ay6ldq8kstfb8b4s6636k696hi67u2lcyfpg8qigz144nov7ac6eckwjbxjlk5t3fcrnq82yifrlywfzfy9n4pyell9vi8eopb744iyz',
                iflowName: 'w1gqha0cwdg27az36ms1eezgybl4ozkolc738pyxqos2zny8xfavzjxnsw9xyrlov5zrydqs9d8g0w8zki4rdvs94n5v3jc83vrtiaxf3d209hghhe3xe44jy441my01vrs0lk4zl2wnprt47ltturfztqjar9hh',
                responsibleUserAccount: 'pgpkim5s8jsbflxhit76',
                lastChangeUserAccount: 'a4s8ayq19q5r2pqplhr7',
                lastChangedAt: '2020-08-02 21:18:07',
                folderPath: '6dem5trzk9a1hx4f8r82eybpxc4xez1p4wzaxj3v1a5zilm5fz4mfg9pijpvi45mxxzzr8wl52cf59kom1foeeafhupy1yzsxqvyz963lyfkb30noydmwsnmbq4pun0m641pyh2gl75ehsjyrgzq0p76zx1mhthnu70xjye7dmlnjr0lochuub5e39lvb4rz4e8ohcjkd6iiebjcitl6oa0tpeo91acitbf1wkqx1e9lbzehbh3zuj3gym1xlmq',
                description: 'jltm52u9os44nhuwb8fqrzawo9ryejuvdsi5ntjv80s9256kfnxiqq8va3q14aanog204ncpbjno83hu787w5rw26vjy6k7t70df3frp47r6vmg1klv90hwk3nxv1h4bleav3v4gh3td08futtlhcv7rff339rvtbm11al56ntajmuyvei4oca9r3flu32skw49hiscz7w4012pqw57a6m2l9wvx03ko6ay8r5svl8fmriximm190prla4ilg8o',
                application: 'yvrm1pcnhbl3mwj1f7qsmjmdj03jbmd5oslgi6w5h418vqismj7vbjn3tz3a',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '1tebt1xphn9y7k362hpjtlk0w6fpryte4i2aj8it',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'hqm9l3o9ho2bju1n5sdtsu80pgzw3qnfexbd6ucupygii0uhw0',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: '3j0uyevgxey9vbz8celx',
                version: 'bzmi9nlwulhjhaqnkokx',
                scenario: 'mw0f9h1dmvefoxd4dlmu5mb24r12udzc1jz4yzuv24ytf8ecutbrb4dk1679',
                party: 'ypojczyp3jvzmztqh456tzh2lqn4xr94m794b9lbc0y0pbn3fh65z7fjufbym1euvybrezc6vkqsrak7bzojq1zne24x9awfhx5cljnswr47ahs8gzoa0ezb9jetf0mwthc4orwkvfb40q1x2hm0ngecaob43qrk',
                component: 'hxlzxoo7pmzll2sypkmcy0hh5z12750omou11ywha80cjfzgpztug0fm5s4dz34lmt4tx2syxq7ogeuml2e3h6l2ah9cvm7xyxi72hyarbcf7xpo6p86wd8x2hhykt5ybc80qm7sbb3d8svh06o5sgqyutsinozf',
                interfaceName: 'blee2f4gc8qw01om067tlleh442y0vrfd8wqxi53ster9a6e1k9swpms8othpup6e8iln13kwhelz6t9qlao6oqwyx0j8lhzf5559ao3an7f85zhwa7pam90y283b15abdghme0w4ygfzepllajyg3g4rfe11uihu',
                interfaceNamespace: 'qxy6mie7l3sdse0ozrrufiy8ku00qsvdd520u9jbkx2ed0w8vweg2jaqgwp73i75hvj1h2msj908oes8eigjvgkwupujzuxte71pjre27vcw5m11ci9av8xnmolc2xkk6nlpp4vs95jh01q5banaiwsv6g219uic',
                iflowName: 'b3m7ipj4zbc2vh8e0squw8qwyo54cigiz7wl2pyufu2902kzvb9gjrlup8gckju4e5nz2d22fc8azk32y81jcvl97d5pl92jstb6gisgxegmirqa8eclt2xrm9v3bs6gybnepb9qcybufhdxc7pl7p78si7z79g5',
                responsibleUserAccount: 'azrttysdi3tstr12cnuw',
                lastChangeUserAccount: '6j8e7ia36i3q4nt765xf',
                lastChangedAt: '2020-08-03 18:18:08',
                folderPath: 'ghop6rr49y6ngvttknai1qokhvpc1z82chjuph0a4mhcrlhi81mxx4nd38ht7b32p5sfucfrkb7adk30qt3tpodyh57mi9btl0r244cp2hl9kw0yi5fs1fpemea0zwwcbpfoval5zox16dc74189ckgdbdriscvvqt38wcxvqwoskqlosnjcqp3vci9dln9jm5u3oa6zmknkriikdrykd2yakkf2hcq6vgq5ik05xkm0lt8k22mqinhv0ncbciz',
                description: 'ygp8bxz4eqmza8x8s3udxe8hcfstda41bidem77b6t3jhy4klvp6qyegvy6z515ce5xi1se5zkokuwhazoapq5v5j30pu6ic4u9cf92dnygedwvtwillvkm3shbr7idavpba7w1p36tjsf8i8f8307a9g7nvcef523sno766vb7z112s91mi2jg7zjmjenf8nwg9qpw9njggqcwt7gverfiggk7nkcujiw5ihedrvn49yo5x7yndws8wqou7ifw',
                application: '1hjkv3a5qweui3g96p7lqav5y1cur6vbl8jsl4ksjpp9nb02rrk4i481x1nw',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '7ov2jzlfihe0q0jgy2yiqsh7rrgsehzhu4mpy0ri',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'h01h439qyov857f9616no5t0gai1kn52jh0a8d53o74chgsplp',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'z3ha1ekb4ebx78f0pn86',
                version: 'o7wwfgrrt3hhwfbkv1mr',
                scenario: 'kniruz4lgcdgvj8hvlrkrd06p5q3l2yzzcs9cnfom0tuum4vut6josy26216',
                party: 'v51dyjueztoowcj3w1jo0t0pb8cwqonrctc0uiexv5d5xe4snobgqa6oz31ewrykpsf4yts10ony2pzx40xavktwbu53uofcmpgkit4ar7m5tco6ejn3n446zevr6kd1t82c65m1n9v2pah835dcm29dfggu9zee',
                component: 'svc4kfy2ot4bkzib6sld4cp7bxq3jln4xwo374vlnjxr9zo8v2i8x2ryhmill3sxt4t9ysxpr49100wo2np2wzehoz3rh0buyexd77ga7v0qdcyzi5qpknncers2atj72evjwj8cz5zu4k6s2dax4pix6sj1r5di',
                interfaceName: 'ttx1k88q7neum8g0hje4tbnhpbm5g0xtn6wvgha3rs7c24u967hu0yiun2w5eljwlrrur9ay95jl8y8moxudr151vy5dfbpkecf8wi3zmf7dybi9qhz0i34lzsgga6nzmztoqoihl36znrbv22fm2tewjatf7pef',
                interfaceNamespace: 'syvkuded0hys48badhdun7hqofzxi35itwupdcngex91ip6o93kyd9yayrb9jt1jmvcnlaq3ug8hhmzs5kfch3fn36k8c13ka4y8inqp4c1xjgfgf8lcq5qb2t6on7u9ewb7l1l9vh8cku1ealyw3ituznpk00zp9',
                iflowName: 'kext05hyqj26mti3lxlt11lfvnxnye5snpj0cnaz3gk2yluostaqcku31hodng5j432nf7rfq40ntqw1ausg2djj57nu405a3a8rorh5ldmxmgh1bi5x3d8femf42p711ajrg8fylbkzb22ul4s8jhwerzgwc98s',
                responsibleUserAccount: '9aguldwl1nehrl39bo02',
                lastChangeUserAccount: '54qqf1os5obpx5nixqa8',
                lastChangedAt: '2020-08-02 23:32:17',
                folderPath: '97kp5q23rlizmdjdw7o2qu2f747toywr40e2ee1p4flk6hvqyeo4bhguivvo5o09cdaey8k2jbij2wg3sp864mh4gcnhmminn3p0p9q0j3htbidk9n7ja38kuys9tsb5krvdh980ima77c704xykdcwg86k3tlop3jghtz1go3vg2q6cosz9da8dgxobrfg3zdade2dcf33w2ibwo2jxhdfc81dxbieu1biq5sp9wkh4m46ingj04i9moz66nd0',
                description: '4cpxp1ows8ytjp0avuk7ezrh0i47aca8hs3mqg5jode1wv7ycu8upfppgj0n0zxiq63g2tjjfr1gwdz3j15zvhoopmrlcbqbm0wyvj1m8d8r3qkz364hk42hybtcbgja8ypebz9woe1szyl6xewwirsdhtofs7ijub0w06ecg5b7grjzwxa3yfhhaz2i6hgy5zq3eo84yhm4wg6j1w1295i46nwwqd99cst3ehfskh62kc2xbziebh3u3c8b2al',
                application: 'ewno209am35q66scjkdthij2tocunlb3ouxg1waxr0xy7e3xdksp6r2gnl6w',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '9xcv35g7tho5dbqfqweg7fnu7kwg5lv7ff43032y',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'gu3t7etm6flrng0rec64mi86gv3m92jd0y1dza4y26sgjwcbxj',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'd3qt8wnrgyhrdv9vu3ia',
                version: 'wd8on52sw5r4te6p8zz9',
                scenario: 'bw47lgbzn4iz4lxku2a1lawr1honqlzy6laebj50dr6g5ini9cfm3l3netxr',
                party: 'fiwsgk7chn7n9a2cbw8wg8kanpkwq9d0nor65wps7almfid09rbupdn1xfve7ahx0pp6ta1x45w6l50s5ln4ef9mamd25cfrmu9ijha2we7dc3o73yit06uygw0i2w36tz0vd4yvadzs391bxdqh5xrwhxntcisl',
                component: '3e3bhywq5iz9cfkkm2hbk21tocvhekuufhfbz9i79ljklkler6d5wi6h3tpoou5oryxiovz0dxq3ozlqxspf1a846r0233vw36gdexnqri8tfk844uimebz0qthw9ky1l6wc8nda98vn759tq11wmtqy1zkkm0t3',
                interfaceName: 'a3gjrhyhjagwezxxfz5on3qhm4grb17l1oz106fymp0i0auioyu7vvpowk3ytkpkidvsc5c9ojnh55sq5ihdxbwsjyzd27tlpjzsffbhlyi36xhqc2u97kszj9zyxmhtpowjoxe502qbplv5snr2bsfnz511dyj9',
                interfaceNamespace: '4gthlsaftniqfzk46n662xt95vs8pmxxttgz8re8z82n666p5hrsqk4qql3kyryazdmi9t8zx404o31bdtg1jbozpul8cz6wsyrxheaxrc5t7n32pdtmg7dn4f6a6dzqqrjs3zma3pqz50138vh3ixmzeqnzds8y',
                iflowName: 'e06fgq2s3hypgrsuewoinyl6t2b32ww6bpae7zplo1m4rdwe50qg4qq1fp3y9f2szhu5dqjart29ksvjlhyaqkr59o442e35i2h8eys3ehpt5xt7sxx5ut3tgpj76610l1rc5jm0j8ryf6r148y2w6095cm7uow52',
                responsibleUserAccount: 'vz0998jdzvrf8ssl8ta8',
                lastChangeUserAccount: 'xfe8l2rsfac38l3gy6rt',
                lastChangedAt: '2020-08-03 12:23:46',
                folderPath: 'mp7b33ahbpxkebwo9ms0fayh36kxsm7jvyl8xnfoq0mrkq3kwulein9d44r2liosxhohjllwg6xivih9tcjy4tfpgzlopp34c4i1appvzq35qgewi88p8b3j8ukuv63x74sohjk8ldvgbnidp16lz6j3kkk52m51s71nmx4840ofbw8m4sku6qzzop9aj35aliwf7hbc9prtyhedil4vhehtetjwy46ng8kl85qd2nabhr63qgtbuwse9oub284',
                description: '32kqwhuc880aruug1m4d3ktbdmuga8czim4cb4inm4nswwt3v1yusg5si8fkmbugs81rwqg71accxqka1cszas7qbp52j03mbtyjc37y6epiomz82mx66dsrehxhbjuxehi1fimkxjbtkc45w3n95466rhczfnluk9meef5qh7ithmiv5f7l0i2zxpg7tjx4cewl7cxu84lnzfv1dein4ttm74hfwhcj5mneuo5p9you6kn4ozczeiu3ykqkgtw',
                application: 'euphqubrmrtmne3fnpeyi54iipo401tef4gnzjc5xd2wf6v911voh41docxu',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '9svnsovau7ounsv1m11i4u54mt028s45iavikm3s',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: '0iz05e54yetnp61d890e5uz5ov2qktzqu3ir5mnxbvwx955xtj',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'dd137e2ygtxxdnt0d5az',
                version: '2a8w8nc197la8t04fqrk',
                scenario: 'glpw0sqkevd5rapritig1d5q2i14hv1ewwnnqu704ju0s1gc20ncb1lpje77',
                party: 'fwunq5yvlocvu4h9ih63mn2mdjox6ygwj256hg4ppknjjlt9k0s4a3t5f2dleu9jl7e5q38rl6fpkvbxeeylyw5eh3lhgj17whw9cx4f4nh1egei03yrpbcty9tdngxjtmk0w7o2b4te86vv9w1etffosac6nawe',
                component: 'uk9synnreuv515ei775bn5hxdiq9hao2rmfat7tcba3bf8e42tn3nuj28tr1xv6vzn6zuakomucnek64io1rx8untgtzei7417zv0yp66sr2zpmull5hceyilj5mej78aoar1pvyru3il5qtvmkkwyldpwcnekkv',
                interfaceName: 'uyxo466mxh8rd92gqtjg90gxmwysyjtjj90wzp4leam6slryfz47edgjacik72g0l99jp98pji7idd8i68ai8u96ad1af63j1737rkjzjo3fk8vakdkdxuu5uj6167c6ichhlb70yqmd21iytab97gccux8iwqp1',
                interfaceNamespace: 'iboefvf0zest6dnsd1z5421krv01n457yp4fbok8g98sxbhh6u18wmkpomjr8fhak01lbhvgurl8v4ou5grlctyll0g55kkrmayey0dgt01d0u0257r6rbce6t8xj822ek6fgxus1gjw0nhjctcdmk625pyiswy2',
                iflowName: '5iqmvmshc4eyjpzcav2013om50yd2tkl6mw8r35ur51f70bitzt89re75h1883vquf7gklt84jx46ku8gutth02z19dqcm5znmsm2sci1dmkv11cr5ty2kas2pzmj1hxv11nlg9rox7p1z4q8ooj9sfno1d0dul5',
                responsibleUserAccount: 'pf09vtq0bldi5zqyb8ckd',
                lastChangeUserAccount: '08vhy2317z1ytgm50jjx',
                lastChangedAt: '2020-08-03 13:04:11',
                folderPath: '2lf7h2tm1lzm3s1k3nxno1x3viqoyv6n4yc4uxlus298uuzzpiftq3kf58k4635xt1yiwyj7t454jlm62xnecqfo2omaq8q07l1ojdeu627a3l2f0bguip5uya0ljazv78zocuf7wmoex5qmmuhtjm32mngxutuimp3vugdkhf0i6dkyffxdi5bf3jbqm2ia5de59kl5umkpxpnhn44w8whipnba8v6yemuq4azlz0n3ekjuatva53q4ngx4ej3',
                description: 'cwfhhantb2wje46ntppfksg119yovng8pyvojolcshffgncq16aza1m93ntncf160uzvjf2vq5baa5d6ze49f39f6o3dbkav958thxskc62o3wtdzqr59ldwdr0mohcrgp6ofswlviave4zr4grcdy3unird6xctnnm7vbe38p2wta1gfxn3gwrbw6cox5mpiho1wrgdm4014p6eygisvll1qcufsot1tj4yp8vj8oxdrnzc84sw7z67h3ctmei',
                application: 'k0z9dsu7xhnx2zt2un2dnwcapcr7amqs22se7hqu4b1ol5f4mgmmrz1gaqzk',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'gzc0igxmc9tmdi51lau5n8rs6fmrqeqrbmofr6uu',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'q0qonnyu12dvmofvz8ikug6guro5cvqgi2fgwjx87y2q3i0sig',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'me3ihuj7dw1jdchg8kd7',
                version: '2ndm3zevafcm96a8ibtc',
                scenario: '6a4pxuk4h4k73cfxha2uzjmxhcbxhqu2s3wlzq9xjisdxqqkqlfeqkmj0900',
                party: 'blgfcjd6l7i80ka54usa08ofuun82ajkz4zmtrwn9byva1p03me4qimbxuv9xvv2dvltyjra0rpwz8vp290v6jnqjofngsa8kysbjo0ca2npgthlppc117xc7msqhp4n1ffkn5twjpo0w2zqb5mwun3at7czmdk7',
                component: 'gcz4vzikciabexh0avccxy3ee8zc55x23e766ym5ybjd76p5okhuhzoabraeivavfmdg6ahxmx8dj395s9pg43yk1e11q05w1u20kyeugjwvzcg6awczbcuy3vliylcxktrallcn7jytxnok30s4xora303cddrz',
                interfaceName: 'fr1vyxoz9bke0nvrus7zgleao22lptnlgr8oyqhnmgmhthds145lycbpt00805ls7hx8poqyk59u791r3i7p8s9ofvoj1iaaeixgby5335mrq2c1c06e5avxvpgkctswg5potzz25j300i5b3d6gqpbqo7z8io5d',
                interfaceNamespace: '42zci8q2ytijgxdpc4t53dc608xqvo55q7cyrobhffavvnp4nqn0h4953y9ftswnmehn52qwryn0ufh7rj8q05tp5wgh19q7fv5l1owdgkpa1mo9m8720s8smpultr0kw3ejkcyuo952n2tpldy58n4j33xaz2a6',
                iflowName: '539g7rdb0dzmplnl245ic4elfg1xkteusbpcwg8a50ol2gbmrq01z0ml4f30976a5z34jw7n7300ujs8002clfhxvke9bg67jjluktc64wtscrxcl6cbaqj9gy10lukmt4zabupz95w9isw3jx6rof14xywvu2qb',
                responsibleUserAccount: 'wudpw3bquvejncr8qtt0',
                lastChangeUserAccount: 'nix4yv73bruqu0bsj42ac',
                lastChangedAt: '2020-08-03 11:24:15',
                folderPath: 'p35djegveh5sqheadrccel0ic25xg5cfcsgbb94kxr92f473f6c1q8ti22ctm6pzzk21ihz3w0f6tg26ncmuyxvg4rg0vbp5yyht4quive6qgguiaojwhm2y42syn8npxvgebuu7mmp19c3uviq881us09biwvt5h5p0jx0xuv90op1v2r4zgydrnmlwz9g1eeew33k5taizaj53zf6cwdnsikfkkjetchpvrc955t8h3p117gazt8wfapttjz4',
                description: 'wjkl9yozw37lwesylzkwsg8ndkkjtasqwu895pje3s7lht97nbsozimrpzliv2kgfy8cmtssvxbv0x4vgbax6xitl0s99j7v2cjdmkj99y9z5ard5rc5pob6dp3j8ggg303se6b9hjgno51goipomw4saa1c3aezpproefd6jx8hwza0m9oiwqbjs0svuog8hhzrw3338n8ly0g14ygvk4tjrzqrcsdu2jiijhn9icv3on1vkektmmgx3z4pknx',
                application: 'b4f1sa3aiq11fykg8u45cma0myjkngqucp1vuk8wpseinq121gp6qek2ppkf',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'fzdi2rjgdllzprp5163owkjy1jun3gslclg7ow02',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'dm3t0vjii1al9gnzqvbl8ynlnaqeiexvvv04q7qeohnflhp0a1',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'd5hay8zf2rtduhdxikc3',
                version: 'ld45tc4dx66v7pixr7ja',
                scenario: 'iygn4bcbgxcffufijar8bf7kmbgt7b2c54roboe5av9zt29wxplhz9sxi131',
                party: 'tvo1pbkrzgw24mgoqo7sn8m1kedgewe8wf0y2hda3txp77tfta39rjoqsxl23s90odddmffoapndyv0vjni9x1mvgpc65hcuxslde4b4w9y6runq6qs6uf6rznmgyyb4mh4bxf46jhyttbsm8of824wmff0i80s2',
                component: '3qgzsw14c7ugzbs7krf8w8xoqlupozolvgu2y0i2roujxpum62zbm0xgbb0wymy6tl9vqo296ai1m8rfgrm9kg6bhrechy7lqr9f2wj8mvr6i0fyqnzhrbkld79yxy67bvy21qudbr3m1gfkfgad70hjpzx440bh',
                interfaceName: '7wq30ckx4xgkis6d6aij9rtt1vbfxv05cooe7vwqwdrwrc1ykcyaly92ifwpg4jb78fo1m5yy9wrwigx69jyxzid74xeo5yflltbyj1zc8edlkgve8b99s23uayg245vp3qek4794pol8j7srdkrk5z1f3w6apsp',
                interfaceNamespace: '6wei85php0f39ljxwk0e5t0kaujlugqrpw2ari52q2z00bumgbrmmljw0yml32pxjr7owu4xxg48uyi20b9k5wi3u6ly6chay7eevv6r9i1fntsnh9gb367fo9jjbvsp5x4drmljvti2ow7ipz73oyko53vtxivm',
                iflowName: 'edgfg38q6b1515nwikktbc544rrzr9epo0lk38oe884dj5zhematd0sdseqzfc5ob8n412pn2f4q74f3d6pjytr00ihsp0ebi3xj4nk54pxxjwd7r913pz2m308tk6uzspfuvi4rkkiqvmip3d3cxszzw1qdsw5z',
                responsibleUserAccount: 'jr251urpvnvcwplehrtf',
                lastChangeUserAccount: 'lhuyciv0kwfvyzdd6qm1',
                lastChangedAt: '2020-08-02 19:29:41',
                folderPath: 's9556m3lrh71xs35ynbw1npg9033aqi7n68l1oxmldf1d5e4vqi5swa7z4bwuhbzllfyfsfygcbs9vdo56f4ejto8o15ig4xr7sln90uduaj21aw4gj2erwafvx1aiasw8rgxaz7vztt64wm3r39guq2iq91zemaeugtxks127xpz3svjwf7ijf0x0cnj870ykx8bly9or9ze025b2zzu8w8ujg7z4wuov7fca03aflyb77342f6l4o5uscccqjs',
                description: 'srcmhksb2ouckpsdqqo7c7m9lr9jks7n168yi682164dcppfq0iqkxll909cur9846avvh6u77a8ls4uixw860agyca9qxe7ie8or9p0f57x521b6qw6sb3q2nh698jn0txhibe3db07yvx08uos16biogf7j79gq7lkbp39cg22ufrg8m0g8njwo64vvrn1ataiqwuchvokqqg6nopnkg3uiexhal4o6pcze6ul56nn9avub7j05y0vtxudphe',
                application: '52dju4om7pd8ghxwadwobni93lhw33lzfklp3zoqhd845px1w2mm9di3dc52',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'lnu35g5xav6rvm9fj1d6eu5atz69ky1z8aj1w8dr',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'bfd60nfo5kl8ls6f58gbjtwx86303bubbxiyzp76cw40c0wqk7',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'fobyqmzjxbkandd99hnk',
                version: 'p6yl6r26tlzlcqva35ll',
                scenario: 'vtk0w0vzz1njz5hcd6eeu9ldtk23jk4q939spcs498z9osep93a9aia6j032',
                party: 'jn05jxdeeozgmaik9a8dvspm4a9y9dstm4lunewcoxdiq7sncnsnwpfijbl5an8j42artw67jn5d544911j6egjfv91o2hkukx9pv6a8zzehzg3btfwku5ffktpag8srfbfca7e8m6w4q4n2ulqmmlimo0vddnhh',
                component: '8ucrugm1be4dt2omryowzfyu9g52cs8cx7dz43i5uyv3mjl7ag34pjbauxl3uw30ru5u3qrpvg3848ocgk3q0sw7721hhof52204c597aq57rbm1u0g3h9mehei0bdsx1bnyr0yknvtzdr6pvog1kb1mx51ytma1',
                interfaceName: 'dlkl8uf1qvjpz3074lfe5r9tznj9t0mtets9ucv9d6qxhuv7o15ra9ffjmmk2ru781avnon27k1iq0tnz4up2n4plcq8m8w3vcgeejq3a84z1tndepxn4bfm1osozglpd8a2utfhcyklbax7od1lmyv3s37fw3mn',
                interfaceNamespace: '8pqjku9qg9w7om32ad855x4hbvzcem17k2qggk307xgs8jgyywwgempwedscp3md97fvykj45dn0a784ppdtojppa4pqjhooh5qgrslm3q9rym75u1zkg2jiuf0m3zn4ydn2l0mi2u3776xmb7nuein52hp6c0lp',
                iflowName: 't39g9ghwyu55uqbm3hu6hvosw5dr2512wm5sprj0bb9id8b8pylahpod1dii636ebqxor1byvqscox0i4qj3kxcadfmpgc738fqr9exr5u6faxzmcbjnt8py9j5tx41wqyo5791pq6mf4jiocr41r4mj4fwt0ivr',
                responsibleUserAccount: 'qkgj3w4d7klfoqagorm1',
                lastChangeUserAccount: 'myc00j3l4l47fooxlt8r',
                lastChangedAt: '2020-08-03 15:06:27',
                folderPath: 'w5dqki5nsbv8p6nv1cgto8y2ov31fmqj18j7lcw8c22tczbscd8guofhhhfs0j4w2v9lcc2z563tw1lfq6vhntjie7l0sob2o84ou3j8410737e0lqsxwynjd4vsmgdtuiv8fpvkrmz68mo6bni4vsj2otv9yq9d1m9amscs7cjrn65s8bs4ekcu6i2py7uoy5v6ca25msk6dkeul86m2g58xcxows51bncnuaurkuqw1iu8y7ufux39gk9sgo8',
                description: 'y59us5k979xkzenbfmsgav3qlbz92ylddj69b85dkm04aiwdlg8cdbek3gte4c0zsw1lp6l48oa7x1ss88ivs15xjmahzjzvehwkom3do0ul0rn5mk9iog5y6shrxyjcqljklrrig5hejt3f60m32fcxrudr9ldftvygcneg67cklq9ni30gk3wuc4zuom8ctmi00gjpujrtvilej8serfdrexg4urvqsdk60m0pxqlzrr5lxopwq6sd53pkbdog',
                application: 'xd9v0o6v78xs9y9h9m7a2lyg213c43jjftymop9cfwgxdpk26jbtarivsg7y',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'kuxm76bn0qrodjb88n9ai1lmbq9q6v4sg6lag54c',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'vstvc2hislgs38f9nqboqy5gbf9jhgosek1ikqtbdlr65bvppe',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'pbyznfy0mvzj9kfqmhy7',
                version: 'xs28byrv213s20zlq4y6',
                scenario: 'odgtkpjoy16k8f56y6ww62mb11waeclic9sqf2jp49phfalgs9cjyzak8agl',
                party: '4mf4ewgofdnd4rdg8yzyze1hgz13pfwxyn4os264gy7zesll5prn7ixxa0hyr5yh23rrqq966opc0yiasr34zx0hkj28c23fdio8avdzdyrpiacwt0o48vjtnlbio7f2zsdujfagnwyuxpfvrkkphtmeyzsuz4g8',
                component: '4u3s4py54n2gwtev1ir8hpzpsd4ifego5k3eh5gf0vlc729j9a06a6mkqutfzb0oxl993et8x8lzimua8p7p31ah9kt7wraktn717lqmti60a7xrl1rt5uw5m2qvhat76yl9mqkpjolk6w4hi7pjg7arfkhs9u0h',
                interfaceName: 'spdx8vo7ghma4pk2ml2pn9r6qv2ia9bul2ifccmhqzx03v69qebeir0d0nninx4uqwwknhpn8mdqtwy4fk3qykf03x1u0un2mcfsgjy3czfyc3dqiv7wvzursl8wwpd58ys2u0yz7wuwjcc6ntzvxmtewsgbg5pl',
                interfaceNamespace: 'b10ycz72ujr5gbvud7iz75ch29rd2kkpjmp3a8ajv099ynb0xpaq1kad6y9baj49kjur9wyb2lfwkxrr8vs19xk3jps0ho5wgh1rbva6ec3zemywix2enim6js38g1zttq7wx0chruvre8fnhinmc97cb0aluxry',
                iflowName: '171r0oksub1jahra7khwe47l68ln9hljrr04n13b1vb1scql9f8wbpejded2mpnmb7etuvs5dko5obdwqwfdrta9ejpoo6zd5l0gu3zwbwtko2eqh9vlxk4o88amfvl9c9oblgkbtsacm3jh3nid5ktj5k1yqrtm',
                responsibleUserAccount: '8ilxypz73alwi46yfxm9',
                lastChangeUserAccount: 'ny597vx273n1i6sol9pu',
                lastChangedAt: '2020-08-03 14:35:54',
                folderPath: 'xwavy55xsb5o6t65esyo3m9m0jioalwhb5yso1scog19h9761reosmjnc9rm8vkawr9yedgtlhmhbzr8jnkqfxw1vt4ngri121wsg4e8qr3x41y0rm7jle6p0ow9v2g8d8yegdamhonlung1qffct5orupzhidfh1dqllj8w02r7iaqku2ko9gt8c9iwdkturcsh43xzeecye8cep0hsxj69t00yjsi8r46u67hneqo2p7qzuas458guh629t3t',
                description: 'qpa1g0tcp3chxe3ey5x6nehd2b3x3wk1co63ctoe48jddo0cqda1yf6fbq5z8ej46824kcmri85nonvdniwzfde8ook9wsmka4d51ydzg8n5f0ve3hevee4plewzkkuc4nz1isedykjdcvqwd4ruef4bn38ply12w501wlsusf3qfuc7d2d77zjlzxwx0js7e0qzu0xirekfsr3iiziqtst4ur6j0imivyylp9h8ze9zsnhcp03jpa6lvs8ubmx',
                application: 'o4g03rzi68ofxhu9ar6th2oieilmfzz85jprto1944190j3qpr43senxwjobm',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '02fq9sra2pyz66fm8tq60fjol4c8vq24j695xez8',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'tdmhjq7gl44dvob299all6x4q7wewhnulydy6virhwt0vzxem3',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'n1b50e2eui4pc8xof45y',
                version: 'ip8at9o89m4qdbsork62',
                scenario: 's7ix5fzj1aih6pdhkxq4lrgojoagnbdt2dzotws23idc6zw8nh9dubarh2y2',
                party: 'w0iatmc079yhvm6j6vkkxh4xcdrjrh0m6sce15up1m3gx21jbg589zh2fzuo7w1hq8x16x88o54a335tsr5p6d6g71watfpx9huucscgn9dxoxx4856x0x0abr2rth8d8uoga4r43krmqlkf1kltq11rm913dd8v',
                component: 'ejzvyojgogtxn3shtswvtazsyabh9pjr8b949p8wj6s0qgcubi34r13fl149k30ea8p8bgbfcjonyirim1jokwgr3kyz9hjvwz3wooqu9u1poede3i7wk0jtushtdgxmp2fdgqucuxtuwtah7k9c7nyopsak21m8',
                interfaceName: 'mp94yli8nhi5b0ycjkznh29nmjob2pceb2022ueo4pz15qdw7io7e8nvettjlq142rxbdp4lbe17rsjo4uu7ulwn3325mwho5608p80t1j7osbu8836idrokotvxa97m18u8r1natk7nw3l4qgqxotb7aw557iom',
                interfaceNamespace: 'w9e9aqn3ye07aa51fsr8vzdmrpd5wl0phxmfigavmpvtvs956bomrwtn3o6euxqus4ncquklv4cd4r88js751ds9tlv0fnc3jsxidytokg8vpmtg79z49vz3z3k7w6tpjxad0deqwkhj2vxozsfmegztpyddu9u3',
                iflowName: 'ztag2a21jy4oxw99i0mp1mc43h41gd9k9uvpn7id5pe4hztnlr08ut7h6752ihus50sztq45u2asty6zbxhhjci4dtvcdhko2jgvy4gb6soewso63xpdx4i0b3i7h0uuw893yylvpgnqk5a55szbpdusmvu9yirn',
                responsibleUserAccount: 'yvk3edoqc9ufpqq9jusj',
                lastChangeUserAccount: '5xyt77fubbt7gpeg3h4q',
                lastChangedAt: '2020-08-02 23:42:37',
                folderPath: 'z7gfe4y34jxc66xgf39o8oyaub53mncea279s8bysx7wo9kf1fp2dbwltq2pyu7t1wl3dwi11s6ms9x7zj6sx0g7z51op0hucq968jfzi0ztreudgkzuqdpcfu17wenj9c2hwj5jvq2wncklm0g48mvmty10f387wylea4j4pwr1su99mx1ddd7gafueeljkxp6eqezbo4ep8jl37boweuwba038z1vkl1fqqimbq87ezxt4fpobs7o9ymo9zm5',
                description: 'fqgevcueo788chnuxman2qofzw1ec6zqivqm7omumlwlj8xna8r432na2alplbd7jnsbbucnsd3u7mp44m4gs7ynubwgkmfk0lpo4gzvf09q1n54fhmhkfhxpahxydr0tdxd4k1xhcucxfuxxbn6rgm72uzd4b8y10x9ojgxxqe8u7md7sdp8konbmdtrbcczcnt0jnsuvqloibqccwrd7787d9bh1cga5qxzcmmnohc0wezp7odzl07q04suft',
                application: 'btk3pwvuvoxwzasqvymt21bvkr3othjnuk3pwxcs6uppo7y61biyv88wyk44',
                isCritical: 'true',
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '3bpsaffext2pvhz07t61jc86nw8p3nofaxxyy88j',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: '91cph4oqzse2rtrudm7ebz76qi71sdn74u2hl5sslct4jl13ad',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'ti1x8o26ea2jer23erwl',
                version: 'w3y65jsky1gr7bscm459',
                scenario: 'wida7lfwd1tkfuzew5xxxn8dlginuxjl8yv9brtr2hu479kesz32ha9tca3e',
                party: 'qurbp3zkwvleo1f1dxprzk7y18dug9ej74wicvx3im42m9ssuwlbss7u1fxqtczqpq8wtdi6zpz82h84p4ihb81y8s0c3hmifnzzdtj7wa7btejqg92hx7e0tt6hm8fuvyuc6qh8xxd4tkekzdik06esmuxsqj6y',
                component: '9nozkpkiuygza910s465erunxi4m080y5m30chb6b6f208pksj0igfw3zramqxhxnrd27xoe7kaobmuut5nchtk900bfzo88ajrw5hojq543ok909zjchj7p3n6djjwssmzgsh6j7i37get2qtikktncurwgru86',
                interfaceName: '5nz08xb1j4umn6ycvy72drca8og2yg22d7z7oev8q0598ewj32du55aw33h4bdd8r3afovvfb0ncx9bc6nkpsrcuz3if38tzdlzp4iph4hn9tvwpcy76i7byoaj7h2ywhtjecs39wxfipxdtslati8chot4n1gx6',
                interfaceNamespace: '0c7bhenpw5au5gmjuefqv07yttfxieswtbjpitrxsov0imv0p1zt1g1ncgk3ceyl47nwzgw34bc0dt8f57uka0c6bbiw5m0h3lo24fiykwpxdb8noqz826n1u73vebeg2fru52q7gca8g8owuh0f3nbbxdc5e8ty',
                iflowName: 'a2gvsib6rxcyjararq9hkz1as57nxctc63ptvmfs67ovqcwqysfndx5y96zcft6mrs7za9i3bn16ktjycul4qarlhk2fq954r9ifxrcb91qinbrbnla8je8ahww3iwb7aygag15ymkocft2afypw0f77oaibhroo',
                responsibleUserAccount: 'bag7l4zd5feqo0p1tvdv',
                lastChangeUserAccount: 'a64yc357lcgnejt24udz',
                lastChangedAt: '2020-08-03 00:52:49',
                folderPath: 'hmfhg38dpudby5o07pvqxmzjan8hojrxi00ghdxnxme6h9lk63lcpi08c59edob6emoh8gn7pc75yi00dssrlkzx8o17uccr8994suarf4l3cb6nxrrq33jt3wfumd0lqxblyoli4hj0fgajnkytq30d1obxh1fk3o8afk8m9rfln0j6b7vnm8e6kk31t7wgjcjjqtvwye68uy1v7cxqm1il58mbpaide1flspkyp0veddqhbypl2ddbg1w81zy',
                description: 'oevkpfljriqyn72h5or9j8wt0luh8v0l68px5gupxl62xjrmmelxj9ho1r1y8s0e4gllam32tbr57a3rcmvty0wqcgxiqhu86yqn4id54zmvayqqt2foincx1lfzk3hgssr42qyr4wh5gcp8mqrga9j6zvic0efmo3tznd0h7yqm5e1k74es53xsa1pdm6ortewudbtikzxiai5a1o9p8dutfcaogos3as2jq3dcatt8go7yivu24ik5swraaaw',
                application: '03rhii5412cqfc0oa7of3mwkzughlofnjc0q6zkus8tps5u4p3dv3f18gv2c',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'i5iex4hagtt6wuhzjojhj0hbv9n8tdudbg75i6cs',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'bz0ds5h5820tqcu3qni9t0amr1zrfw5t8cj5golneirbevpx8m',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: '36wf24jpl4ofamk7u74t',
                version: '89gkklmjy28xng1vgz2e',
                scenario: '3xxq7a7rhq4qpust23mpc4yjh8qo36gkcvp5zv53c25c53t3on2fwzk6og0r',
                party: 'gvilui8sl7o3rhe3jso9sqbw2979a9g7wmt1rinoodfk3e6ptz4qreh3rda3d0g8c1juomhsqw3dqqvnx9blzftofhz9mxdr5mtg0f7fybw5c5mbxg354a73sews2aderd44267bmixdzm5owazos8mff8rxhbwy',
                component: 'ualvh4kllukh0jibuljjsez7eh0kj21gz118fk1utnb3ty27ocdmzsa5vtzdb6el8aiy3xec87o90ij35whhr7n42wpc1a6scrdkukug7dulaatvc246q74xqnjbkmtb2jfb6tr5ewiw9duk1qgv1z0sdi5va05s',
                interfaceName: '1uk9oi0n4txfxxiw62un27hm1b9qly8avv4p49rtgb32txao6xqo2385bihkv8myqnc7c0a4awwtmj4cqb4qs8ce08dvnl1pyys3l6veadfaxmzzktyvkqz2gwl3yu5e3ks5us2kwqid6c3ytixdjaz3a2x9o2tr',
                interfaceNamespace: 'teeuzvuhk3b2ojncnk3xq6xwuvuxnyba9j2hpkrmbrv2hrjen00potwfv7qragwci1lqedrl6thgsbv49l9wft4n0ndi0h1kkq71gtis0udbi9gwppq9f7x5pqhgbpshpua8xqsqgpi6b0cpfl7y3ojfatc0f95o',
                iflowName: 'f8aj59lfo2r8ck8xsldaxz5vi0lc5ze0gol4svq4osv8rx29i93gf6183oq8gxan2f3xtmtstn2nefaa9rfurpfasr1t621zklm8qp3op5ydyebjwnrxlhjpltur9t4o38yc1mnv7utp7bic4kybviud4rxykrp8',
                responsibleUserAccount: 'ufdeocru46tw61folfge',
                lastChangeUserAccount: 'rleeehhrud64b3td12mp',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'j5aiaus1vlx9jpm9aucynzt7l098mxnk71ht8sntrsud2yf2wbf29hr3ramaafpnd2lbawtmdersfemp7zij8m3gnny6g5txg1phq05qan6a81out7prou8tjx4egufhysz0yseoqiay3oaqrxk4krnq6mg4q8yc49gbb7v7lp6tv1p4ti3m2t9tap93j4av4oxqlglba87fz7tdd9oybm6j914ulxtlr26tqsdoultrz42y8bm0tt5m46h44ta',
                description: 'wwk9hur9hptksojajpdq8gz6dafs0xdli3y87x1r316itpt2hb42zhmpltitmx7qs3d5da462qoymnax61xrsqfz8bkcql4npskjptwvyl052e0e653w2nv8xo0l8826iys9yiax9rq1kul8pfav3zhqctznhv7jst6dlc0g6qwh6gfo7s9qrr8s8we42jn7b0ab6gjpu5eczkyl0ohncbrx9zeupgjm2qpup5z2rs7up7lpffkpz918gpd4dvr',
                application: 'dboa7jg52aqh61qrdkryb80qfk0vu4jk4ghp9xb5zox61yv5hmd033sje9f4',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: 'yvjhkylw9sqr7t9am4ms20iiknmectjqrsmne2o8',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'zno3mcqd7rrrt4d9lrv0k30ztao089mzhb6yhwr3suq3702jtq',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: '3fcw353ej043mr8efivi',
                version: 'vzf120tz1xr2hu4yldun',
                scenario: '1ryoqvmitw76j57dcr1fofl90srh6sgcuv7tjpqcrkb8c6btx06m9jzakpth',
                party: '8yoaenv5w33zasxlatolmybzl3ng36xv86qwox7ldb1v8vxyt8ke96xy1hmdk1gh0ywvv4bnp423ev0c1gvfadguiasrbcbvyvv9zihcwkax3vd5kny1outygevr1cbegwxoigmn3l7pxh941snu5rr0sm1h9ukk',
                component: 'hvl4svtudhgk76n93vs6y6p7jwa2wri5l1wqn58901tv6fb2q6nxc1mqm0xajrb4trcofu8kjsqi320r029kxmwfseiskw4takq0pe5cfnv7bg68ii108dx9igvkwa56xtn2ompuus1981mp7z4dxq9c6skt6sph',
                interfaceName: 'ik3ai67cmm7whmejnyfjz31mggkcbjfmvbtly1sw73gmobfmodcao3980w38ybr53j8ibgrfes9kg1fopiv5ocgv5syo1v1uuegshc2gkw4da668f8jj7iuul7epsdq6rc51o72k81b0ong8xbmwkflsu9mdv9pr',
                interfaceNamespace: '6duvw5knezteoi7102pm61swe3gotsw3x21lsqmcjtslt7o2jj1qtjrbuxija5yjthyoehl0q865dw9zxvexundd0mwx3e71duvosdo3728j0781n2iz0rx9fop533krusotzb0s3mu95axd5jv3ts215psu0ysu',
                iflowName: 'rooc10aqkmumlaxdm0zew14ukhb4fubl8dfmlsfbq1w8vv0az52drqbhtggn1u50q5bldz4s2fz99r0pna95z5olf84r7n7pu6levtbbbedq7cql10betveslol9buxvu6u84chziaaeey5pccxmasm4ofwazgs1',
                responsibleUserAccount: 'u9x4lj7f54btj9qvlvgc',
                lastChangeUserAccount: '89zoyfdwij0whoijv2q1',
                lastChangedAt: '2020-08-03 10:26:37',
                folderPath: 'z1rgg6xbqpz15uvo1ps1v94goe1a0enfwbkqdrqdyco1iaasps07yd7tt8gkuc4qvdhyl65uk4ag3ogfx0f8169m97olnuyzjn3rbzl8qqa45ek934jjcgvwqqsememaxvx4l2cwv26tl0rz2l1msuddf1ymxm3qkxfw0qjmsmyil3sq5b5gy6av30izb09zteoqqy21tkl6zps90h0ymgrdw6bi9jtvji3dkezs7u32andj6wp8tz7ic1b619b',
                description: 'apg3vtlw7ayrydsa8aayvrnn404bb1wf79yvb32a95zam1u6ckoawwvowom4z7cljnh3qqnv5f568wan7ktukp4mf045v5z5syiza7izox99vsd3aglu7pm5qgdnog8doaxhy6zmq1jaxr0dinrjnk78khmb01agca42fyx5tcf9yp42xk5soa5soqxjx77onr1xztzvcfjbwkbhv8vpvky8tvc870921tsf4w2nboqv18humgdjnsm5jwlx3pe',
                application: 'v4r6kk4h886fc8eyurg5bsdqdcdclttgsjwynfxxd7y6alz1qcla3gfm3bay',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/flows/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows/paginate')
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

    test(`/REST:GET bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '1202c9d9-4b67-4dfe-9ec6-125d3994a27c'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '6b05d4c4-bbb6-408f-b640-dcc5e2939960'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6b05d4c4-bbb6-408f-b640-dcc5e2939960'));
    });

    test(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/9cfc670f-9e19-4dc2-aebc-aa27b1596520')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/6b05d4c4-bbb6-408f-b640-dcc5e2939960')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6b05d4c4-bbb6-408f-b640-dcc5e2939960'));
    });

    test(`/REST:GET bplus-it-sappi/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '3fe08083-0b2f-4b5c-89fd-952dc24fe732',
                hash: 'd89iaxv6a9cx3da99jj0ojhc15h8sdnx3v3tt0c9',
                tenantId: '39ac7b51-7ca5-4958-9281-76aab65cb908',
                tenantCode: 'ngzdgl4yjcvxa5e4aiajbp2b50hf5ay9efxtj9oyn59m5vtpdx',
                systemId: '04cdfa79-ea6d-4c15-9340-c9b62ba09bda',
                systemName: 'ql4bosptk108d6io5nkx',
                version: 'wuses0wlccs7ffr9n89t',
                scenario: '8l3ohi1nzvvqdt80lzjri6gb51d6n1tdvliiblq3buhtsg8oay9n0fm94yyb',
                party: 'o7h423kgansai6uz0lv9yc9mk6kguygbpez0k53a9uu6ufsv7b9ulsndzyw6847bb1rmskde03v6st3qm9esdu35so7vtp0kaczibxe0cfqxglvoh3wj2zvedcxtqtozgnorvdrjyma8kvjunc0w7trlarvip0tk',
                component: '1l72dr9141by34q6q9r4vrvafdz4r7it8ohypkukuhadeex1xl17jhb2d4jz2bxsfogvy9reqsxelwsx6kf49rggjhz72i92zeh9ghyoij3847jrexwmdfba3d6oz2kbur1e49phxgtks7how8rnhuw8lslgiysa',
                interfaceName: 'cp3v0m2vob9tgqc7cthoxk20fv6gdm087rpc948d0syjyrpi9b0x8a1975jfbfc3whkqhk6soo3l7p32057knk13vsdt0b4mfumupc1fk5r2i0p8ywvazxaws23lq3qse2cack41621p28k2c8kgzll6wxsjdrnn',
                interfaceNamespace: 'va1452ba3y8b6h4m6w05yugyrsh2e411eoxy44mgbso2l9zupo8it2brtua1tqbmh0qmpkpnri90c1not17e9uqtenhh2u0l50liofyj2zgefaifczv1lb7583zo3tj2zsv98uev8gb5iuut5pqb18i7vii3p33a',
                iflowName: 'pu0d9oexwx9ptz81in8xrh0bumq08t2bopeexzjq6hf8kzv5wh3340vn4izg5c0x6x71pyzrd6q8la55yjl9bdo4rpitfamszpyhqclnaysdygg5pkftybt9nkyv65jve0nhbqkgqduypbupw497gnvqrlyzzy4m',
                responsibleUserAccount: 'zj06yw80hwgbt1usnwo1',
                lastChangeUserAccount: 'craix4c0rmfk4u4clcjj',
                lastChangedAt: '2020-08-03 04:17:53',
                folderPath: '6w917f6bp787tfvg8nb1mrw7rq7r3gokyqe057jvjsbvjwafi0zlqwm6e27jv8xo9ufny8vg9ycx71zfjrqr4lto7h10lvw3c7dv1u5maah7o3alj76jzeusqd8cg561yixb0m1ne51bju788nv8t36t7hhzku6wqf1t0lpk0r7dlq35efi3zb8ii28ne5d04t1d93ruhak1f67ddkassx30wrg4mh8yvekqcsedkkg2rqu098k4z6uz5tt6b6u',
                description: 'uwh8nsepcaxc4axs1lqj3v0wcd0o13uyq140iif7odzmoovp3lwl4191965w74b0251i2vmz3hyosauc8usikich2v2wfommsuhosy3k4icwuugndow8pb29kykt2imr4kpd1z5oaxkyl331v08sudu2ma0gqtjx6vdt34fbgciqjhs9lntutrhdts28bejgx4bf0146jemwiuvuqadc56m4e2a4qtr5e3n3womzt7qun65mioz2giz5pqbhcot',
                application: 'n3b9w9sr09tajcx4ujlq3i3xayufhtub2expdf1rqqscoo2zu2jh2q06zujm',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'b149add9-e946-4717-bd09-642b4939c6d8',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                hash: '4futjkmr61j4x71bxx7zdw3gpopzwcnt7i480gl0',
                tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                tenantCode: 'xzlbg0qlf1ivgt9epzkt2kwjtdvo8yaq60oftm3mlgc43nq5f3',
                systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                systemName: 'jej5bpj4jzzobzg1bdqq',
                version: 'szs70j9hea9omgpvmw70',
                scenario: '1s7adt7qdlyd7focrllwgyh89uwrctjuxi1o19ikhydj2qd0dnv5fjsm99es',
                party: 'hf5vk7utkrgoajkl26y8mh6jkrn34be38wy49qkqqs47jqwd3foihobt5rg7acmp7n6diay2ovrja2zvjr3vf2kuakurwoyatyq4xdwdcenu7t06wmyx2g1xlce854qsot17202625eneu0orc1rys2r6loj4bga',
                component: '6moakunzco7550hmciwf560hwzrpg4zgiurpa7fpmr2xeqweon8snkktjl8jygxwqd2wl9w8p8daij87uxaei98sdpw4lk4y39bfpawohlgfko4nwchp7nfeaa3wokaqoqdxqt4zov9haym1sip8rz1lmzkk6yay',
                interfaceName: 'qg0humvpi6wvf5eciqvmiuhfebup26zllwa8ilt2u6rtd7x51mnrxg6lzd60ce9yhx0q62z8sfwim3o7ue4mlaqnostoize6ea2be2nae2xtmecu1uz3u3052nyc5e3bku2d9yef5k2gwhadwb3eo616i29gnb3z',
                interfaceNamespace: '5l89mq05gn6a56r0hjurlf2b33v2gukwtxzzzhq5g3b5aaegj13vd0sgcrsbctjx1o4t1311ecf6czey6teipct20zuq54vh56lpe9wmjts26na9swgjv97p56ejcplbmd3gls32cc3u82seiskuxk6veej1mpa3',
                iflowName: 'gj3ztddnf51f2074f05zll95agf782bx3gnz8efb4tkhqo1ceitc7qrma8bqsc80qzjiczvy15tpj407ifwvv8tgzyup83bjdfcppxm5w5q6f6l9uzoiu28l3e0mwlmoea5l7a9lsj1faqnhi9kk654wr0bc2gu7',
                responsibleUserAccount: '2r1qr6y6gjlrqlcwbv1t',
                lastChangeUserAccount: '88y7a8eszq9pzsvacejh',
                lastChangedAt: '2020-08-03 09:12:10',
                folderPath: 'l6b9t9ie1gh89veeydf3acb1oahq97m7bg8j1iiigafz4x73rsxtsgwg27r2k90rz7bc84vziyducrv6haous6tyfheu2gvosejkeh5ptonas8cij06yf875pe8kqz9syzx820gwhfrndimtgmux9a7tdr43kk37ekb5jsg6u6b5b9npak71r899wkvff1ah3cjx7rgepoe43r53g1m4rr3tsy31ud6hurtitk7tc06szz7ulzwwqydk8y0qks4',
                description: 'qy0qczcyeo22xea9fqilue1igvvrxqocqh8fv57ehxbiaq0ahaa95ghmwg48y8r7e8tv3c61voqbjeeu32zqbq2dj3d0cxwa39n1f706bhxii711d0c0fk8iz3qrtckqiyewhe7i8ct95eihtu5dpjg943es4zm31ba4paf53ddalksk2fmllsisd0kgt2ufnxkgcyok72f34g6knmyhdpmr5znggna6zjdmjdmkr3s9j006c2o1ubkpxgmal4i',
                application: 'ukpn2kq5r347l8x4jltjkf5wiu4d4acqureq4pxztxrjoo0i5110dg3obe1m',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6b05d4c4-bbb6-408f-b640-dcc5e2939960'));
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/fd7057f6-09e2-4e3a-b875-4913aa2c34c9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/6b05d4c4-bbb6-408f-b640-dcc5e2939960')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateFlow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    test(`/GraphQL bplusItSappiCreateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'af32baab-431c-46cc-ae19-8e18835539a1',
                        hash: 'm7a9uz2gsq4y5neqewwgtf5kwfup8lue0yrxh7c3',
                        tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                        tenantCode: '4djmrn0f99a9to4wcbqe1hr9j0ynr4r29rndom08xrlxfw84a1',
                        systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                        systemName: '8haotifrw1xuubpspkki',
                        version: 'wunb5wqu45wjy2e94rt4',
                        scenario: 'tp0v1xxfakdqsapzsvry4h6diw0q4g19yolkd94wtfz3wf3ppbtsl2c69crs',
                        party: 'v4fcy09ihamj9jdenect4sdvmiu7bmq1ya2i82mt5x3vsfg7uzfo1ihwwhqp1t8ztpl2sl9462jco1uo1jv921nqxl2d6n4l85svdr4af0y14puh8mp3mml4ihkbu86ar0ohoo0lcxe5viexlgc4pwmecg2w1k5d',
                        component: 'x27ibyj1oqcrwcel6hg3m9a3n1jrrhuhy7z9p10jf8oep9wo7xe7gb5irhjmwtgfsdw1krwb18vvm1yes3fwvmjn0iutf7rykub6hjgpa0pswr4xp5mpotkddfdadigu0ng5bxqt3hkfyrshw5vqj3lquyu49i22',
                        interfaceName: 're6x3m9x2cyb29twnol0uhb6q5haks7wbrdi4fxp7x5l1iskxgc3xx5rv3o616y6fes5o8am354qa5lpuk3xjwwgz4lp85f8eia32nmaqk3krtbbgi05drv516qrbzpynyjybjz286288dk8hfnmmzkxxe645gfa',
                        interfaceNamespace: 'nkx4nvpqnflq3t9jlt4p9gkmfkc1yoic5kt8xa9ipmvcvirlde9wdxirnctnhtlqxdd9uonjfibgdyr0hy2jy695x5urcj6es5g1q1kkig4229bplppy516l72kj3e3zf6q9ehg2uhqglu13l973cbynaj6un9ab',
                        iflowName: 'b63ip22l95otw2sx8nfqjhb5mqewdlarzn3yugelr22qvwogvjl9nqu2t6oa388h3eph043sx7wgq6ki4d8zonvn3djojybevr658g33yz3lozfnk7js9ff1tjd6nhlcjzuxobshy417ioav5q60sxtcm7e3y6o4',
                        responsibleUserAccount: 'wtql4l2e2prjf56pml08',
                        lastChangeUserAccount: 'uu84r6t1xtju9cf38q5x',
                        lastChangedAt: '2020-08-03 14:20:47',
                        folderPath: 'p2e64autlo6fr6e9j55kdpe8fgx1sgbkklsyyn5ixmcdcsn02ryd0tqyk1rxlh1xt7r6hxaz2aim2iewk4pt5jse55vxzyz77wsv8q6gl4tcznj3bopjphy99f2dntbwluuuw6w1qtcjzb6yvt5rvqavtp7sxuh0ljq8zfpnlaoq3jzleukr7gsg7xw6o14v0vg84w7zp4tlvb2g6546gcn4xs9wjz88o9x07p7h61ygak4ypp1zoez46s30seq',
                        description: 'chcv8xgbf0kpzeoa4r577c12lvv3mzb0vki3x3tt2gj2n4dsgwq36iezg06jm4xzvn364aicy2cor5qw019761o67fgeizhzs5dok1uin3x5xet4di6wgc7kigup2cjg4fdvg0ilw80nbro0wxw7u5xb9fqlta6m23j8504g3zw2d2nnydrwc1rxmc9orb192uj60f501w13czv12u1f4ogicai7mfnvajonii5fe41n2fa908gn18uet27i9rt',
                        application: 'jj6ojszcaykr3267jwnsbsanhejxlk4lqiv5asobeikm0kr5644bwf80jtvi',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', 'af32baab-431c-46cc-ae19-8e18835539a1');
            });
    });

    test(`/GraphQL bplusItSappiPaginateFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateFlows (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateFlows.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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
                            value   : 'e7fdc6ad-ec6e-4153-bf55-1fd526c522de'
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

    test(`/GraphQL bplusItSappiFindFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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
                            value   : '6b05d4c4-bbb6-408f-b640-dcc5e2939960'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('6b05d4c4-bbb6-408f-b640-dcc5e2939960');
            });
    });

    test(`/GraphQL bplusItSappiFindFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e3c05760-f59e-4843-8007-41b49ae48883'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('6b05d4c4-bbb6-408f-b640-dcc5e2939960');
            });
    });

    test(`/GraphQL bplusItSappiGetFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetFlows (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetFlows.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'becaab9a-93a9-4093-8313-a537cc3ac56b',
                        hash: 'uidtytrromycdj8657auqdtkz2e44l6vzkjuict3',
                        tenantId: 'af37328e-ba20-4fcd-8462-77f724d66bf4',
                        tenantCode: '1dxed49pixjin71nsh5szycfebd9p8w6s9z3458cioxghwh9vg',
                        systemId: 'd932c16b-2631-46fb-bb83-2643e846daa7',
                        systemName: '0rytsogkyzsqpw62xx3q',
                        version: 'aq0tihy7gl1mp8z6zmso',
                        scenario: 'hxiifz71lknfyp8pqnq00u2rweihc4nol9jy7q7u5cm94gwel3dk2u3f5edm',
                        party: '6s4i67c7sz9x351q5asfm7iuycvcfl7r6nbqt3iixt8m9o0hd5tt68zrg97kbesldn6yxnb6ryn6qfwq1btd43o7iudolryyo9okf3u82t0q6z3zuu4j8j3llt3pdxjhdeql0rxn37v66n9y3ef6vihlepn0bef1',
                        component: '1adogr5ci27iqwq6noy5oaub4h7jcfao9rttdpbfremodqi0kb9to3tartc94n5fd52png510e08unb7tilz4ghhhehjvagpxt0qgljwbvyhsjvqti4r6v4ma7nncrvd8c22jmzas2zybctttws2jb5d9yn0sqi7',
                        interfaceName: 'e9vlhx86638dg9sjo7igm4s8f2dg6cntypc7mvhurilxbcvlwbmq87zuh17uwtj81kw1596dn4faexx0kv9h3yj4enqlnd321hmvwgl18keef50xi42iwujvmnzdpxg23u2nbm4w9yxftzbj5c8pvw8lsypahwpd',
                        interfaceNamespace: 'ajo2ns0b40m98v3iylxc2j3y8k5zo94khqg59i4hae7m986zxmg2ox2sr2fddxnw8gk1shk4v4xgvffx3glcukcnzz235thjmjjzilmvjhuj7uqh56jr1y2mu8hqzm9ey4pzla3n0inc5p5e3zz4gbugnxdl4r5e',
                        iflowName: 'a33jd1b4poklf561ytkuhfp0gxsvd5g1gc1d2240epve1mlsuf88t8iwn9gm9eokxy4nx0rrreq46bu0dzxukv0gcrwx510rl8dn0qh9ux9dkwh81qh0u0ge0k3p7vfj0a1xw3ns2b5822zisvbp458y9erajb8d',
                        responsibleUserAccount: 'rt81vjvejznj6y22kxet',
                        lastChangeUserAccount: '1wk5haus1p6md8zupwi6',
                        lastChangedAt: '2020-08-03 08:44:05',
                        folderPath: '6bm3vc9bmy64vy9h4qqgg4e6vmtacsaq4u4sr92imrg4hjbeb9jvc0jc7dhqbdcxisbsc1kbt5tvgh4hb060e260fwi05roit43iwaut2ryrsqbpw6914y80795j7zu7hclmsc27goog3ib5uytz1cnzbyw1buhhtwak1e1ltmv38lxyzbqa7bvq475ite3elsp0qnn8l78318hnto3ksjvde4tu6hjkpxx2bnm2103gauv20wanexk80lccqg5',
                        description: '6mkcjiw2ou24fq6ebgghnf9m2qsflq0lir1c7whcqco1o5g23lvo7ms7migk9udji6mkivqetaxi2ckddgi9zls7jmx9bmur3uzrp2qo5idgrm841n6cp58hl0ezjuaoqrhh2z39r7z28mrk8w9mqft22ht7c1mrkq7qwfyy1mdmelcs0room47as4d4jku20vb90c43imawiqvacaksdt23w068ijhooeu7ckvsbagy0qdduy239bm7lhpspa7',
                        application: 'yia4e79unhcqcfpyihrlof1gzjx7txfbgvbo2f6ccwtmtv26skkekxop8mwr',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: 'cb09706a-69c0-4f53-9f5c-80f24afb2c8a',
                        data: { "foo" : "bar" },
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

    test(`/GraphQL bplusItSappiUpdateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960',
                        hash: '8pk4c9p79mdq5sf5y9djve5jqwl9yyx7ajfquyi3',
                        tenantId: 'f47af28d-aad2-4336-9207-0a6b77e9bfdb',
                        tenantCode: '9c53r55wqta1ow0cu6ib8gmgr8agh5wcc88t86u1yscxgvtk7i',
                        systemId: '8db51b8b-b745-4e7e-aebb-80bb967a02f1',
                        systemName: 'ajnjut2mshj5l9r8crd8',
                        version: 'xz57ot3bja7f9903gboe',
                        scenario: 'n2oeykgebaa8p73hvx2ztb6z4uphpxsrarypbkj3payhtjll8mng0thwndjl',
                        party: 'xe069s18xsuvvcel8kiq2l2giqkwoopl1zekjqdtn57ibnld1t21ll7jfddz5tc39w4bwwzyug4wqqw9n135b8y2naflp7j1u830asxh7isqdohxspwxr6cjb96qcr17tkmqufa902rhz1kho1p75x4ef09xxouq',
                        component: 'gijjosad29s328sbxen2zjyd7rnkd0h0jm6kcodx9tavm8qoverday1a9id2gkibg5hsapv5pedplbgrza64czaplzdtd41xb03j0sllv1ufypmohj2c4fsh6v5a1d75csq1guxxneqth8ubkqro3cts66a98aq5',
                        interfaceName: '89m9rsni5bbp6gv3vnuaqim8hvje54ds7018ljn7gurm09pox0vhhdkd8wfh80jcpyjdj3y7eb1ea0l3xm57hlkubsktayvv7p3uc9lf68m16t7u7osqr49ahutjsn9nbcx1gjd9saeb55xm32hanvmlcfg35xzv',
                        interfaceNamespace: '181bbwv2k8gh8kjqe403r700bekmhncuxicr053d17elkn7e8ttvu6nudhkrdvi2cvnjp28uxgdiqpa9vgmywodyunk46nl0j40smezkgkv3aqe8iw78g6rl1yig2xbz7uonclgkvty4k2velqelmy73kome5cal',
                        iflowName: '6sn7htbvrrj94fk8zl78cj6e9byacfnp5ehnxe55zhjj2udj4o2bk4s2wurc1bwq6mkfr7qhyykf8uf51dlbp7800dvb7khe9pdsdbz4yqfvbhqkrx5c1y564kbqpwicm4doqt1ieeox5ec7qjdbxzgn3ydsh5eo',
                        responsibleUserAccount: '3ffikc3dep7w73v699eq',
                        lastChangeUserAccount: 'uvgkrkzjk63jdz4fe2m9',
                        lastChangedAt: '2020-08-03 08:29:14',
                        folderPath: 'npt8vyaj5fvv4htoy2kah1h27ojw8po1cpo11lhpxln4yev8e1td431fmuydxh3i67o5jwaj7aw21zybp03f0b81cz6a7pf3iab637xyrz7yuts3qkbqu8nxq1j1f1l8031zm96u9jfy99fbea5xqfe2ln7hdljm2v5ij6nks50238iqjnuvxm16sr8n6p6kxhldtc63zmptb83uh4mnfiskq8953h2ry9ftq3iyzp2a70j8yu6y4q01pjtlviv',
                        description: '534j4xmo1mrbapw6ctaebdhkgltjokayw1zhlxjdkqtc6rhuaoh73373yqoa31w8g2dy4gaetccfpfwnl04dex0sne78tymi1lttf81cch47b2c9cd4x9skp19u64nxudeje2y9z9eubxk4stbtn3dlm95iht5vr33eng1j7cel2kfyhwygsih2fqm2ft6l78cne4z05dsd09nvmf6n32vg0e9cc0pzm0cz755vjryr8s48lnx6woxn7x1ho2lk',
                        application: 'c8luqokyxpxwjmg3outjsefzxsy2g1y5zqe1kblwzdfp6lr8obt6mvew12y2',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '818b53b1-d946-45c3-9006-1bf5decd917b',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('6b05d4c4-bbb6-408f-b640-dcc5e2939960');
            });
    });

    test(`/GraphQL bplusItSappiDeleteFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f0e7b1e1-3e4e-411e-a6bb-0147fd434494'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6b05d4c4-bbb6-408f-b640-dcc5e2939960'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('6b05d4c4-bbb6-408f-b640-dcc5e2939960');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});