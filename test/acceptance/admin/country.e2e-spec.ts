import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '@hades/admin/country/domain/country.repository';
import { MockCountryRepository } from '@hades/admin/country/infrastructure/mock/mock-country.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('country', () =>
{
    let app: INestApplication;
    let repository: MockCountryRepository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    TestingJwtService,
                ]
            })
            .overrideProvider(ICountryRepository)
            .useClass(MockCountryRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockCountryRepository>module.get<ICountryRepository>(ICountryRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/country - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                commonId: 'c625ad02-7bdc-4269-b05b-fea2a7864cb0',
                langId: 'aa0dfba4-c60e-4909-818b-e9445c52615b',
                iso3166Alpha2: '40',
                iso3166Alpha3: 'ahu',
                iso3166Numeric: 'pr2',
                customCode: 'ys10e645z4',
                prefix: 'p8bww',
                name: 'inilc2m84kkx8wxf6q78rd133h26noybfez9elh18eyt5govsm69eqozxmyzoo1dsznnu4pjktrfsqtb6q3nqtdlk2xu2ten17fq9c5g5qgkl66kerxjufgi2zcdije7k3fv74rxwtrln960chj25b75grdl4yqkefcje2mtx9gq1wis4n4dyclqupfmug8h42ah58z5daddjv9bs9nu2l4arsibepjd7llnoh627lq0zp584zas1nf29y651qf',
                slug: '2o0lf4xy435k5nvrkyvptuvm8w9ba2xy0ny8pj2d54yp54veiuo50jpgsuuh817wge9cx5f56s6m3cwlap581dhw9vqk9r08vdu4reydbkyia6qsp6u94iduvkb1jzgup0mpsneebvpdspe7mkzu9z336rv875kter438tpx0jcqzx55s7ihu98l19ccs1kw4250o61b16p38yu50chrk0afrdq8dt0cbosr9fhajfcxonnt8sc96s6bax72hmq5bbmpjhd6vhwgnjxcqxp1d25sse6sm0b0c9e73w5p7z69s5pbj3fia5icy292sks8c9enb3xq2331yj4s8hvkp4t5tkylwsm94x0z8vcm63t7uj06eohs42rpl0rsp1aw98ziq69b7xdjls2c652o6zf3ljanfq6fog1roerqw69ssd039vfjec3wwcwplutus40uo3m37qbrshwsbbkw6jcghnau41fvvzyp0xyntn82p7d2rct1kg73sl2ymisiy7tapz90u0ornsh41irufkwj9msjzzp2j8j259pq2bsc9zoapdqocbwv6eychnkv8z8jjc52dw3xiu3l6lxczfve79omfxp4xoqtkgpqzgf99v7pdhyoxoakbbpd5d2m930m2bw68se8v7mrh38lze44lcczlijng7ny21rj0zu37yyq1cc0te9exffu3wiwgrg2egepm37l3v5rupgnbhv716qa4b6hye91kxapqjcphbd3xa4jt5kb8jx793y5geascpb68blo662nonm7b9pq9mboa4fazfbbisu7adibjqj07hwdonp9egeayjbguqaseyhbe9zqzsnm9qhh79qku0t178gp0jwqabitmcv71s6xhi7p38paw5no1y1u2eg5b05ihwtthgsm43e8h117vst70avs0sqj9qgogscn4uqjklbxp0j4mq0e37ifklidop21lc7g8e5vy46rtax2vuq25e4ljebb93adc0x7wmtb8d7ozrqkog3mt53c',
                image: 'pzqc0692sr2z890r2kifkdqa33c8gsddkfyssrmt5927bf7wl9bpxbt04bkfvpzsfvn0j6aeyenksulfedag8nt03czv1cdtjlrrb2xuamfesfovipym2o6rcii7b11t9cxppktdlujo1kwb85x6x9j3jj6lmfs3btwnfcawdgp90wv96czoltm8il56m9uaauz4h3b5arxcdsp6k2x6bt11w5t5i3ar5lxjxuvq9hnef7u0ja9f8ydxn404ep0gdulsbz8rfcvl49cmtk6d7jtbsx33n0q53cptz1e9ip2quw5fb40cw3ui9fqhd2pd3ukxh54gbo2j3918vcv3mvfjoy04p4wv308cjr4zi17j7t1394189alyb7cj67bkh7fhdabg1e1z5kn9xk0rhw7wv5g4ihzj87kwjwecaf214s1jcpxs0cfyc3jud4d6egsk7ifzf6fmbrrmn9oy5ool519xltycku47rhi17u80ps3q5kwk0rlcdsxv539zaflw8oapuvg1gpavbv6zbv9vsy4zkh0o0xpd0v651zsz26mj0bk8eqts3kz319hs5r5kgouamx8emo2omb35nkbn5ugo64ii3kxgo8465zp4cyes3gkc1gzo10lam6svti06l3q3fxw6ffw7tfimcfzysrheyfb9a4msokb6um9jva2vfraf21tixrsi9uml8rpikaymccl0o9c9a8ncv146ja4kaqtihbps2ul8n188qlxppsm4jqrlzr5ve1xobfqd3z5td8i1n54cblb980l58p3qpnmpos0dhivqzy14ia9x5unm7tzuy1f3iwh8rrwcttqdrpdohtg9r36dblt7clhi8xge8arv222f4mapw6x1s375qta4e60046ujg7ivzkyyr8s6kjudkgrgz7v1n9gu95vnjip6hnw2400qcid5pgfil0lt933592po96b2b2xm3guvvqazusgh2sqh0541j850wu3xbg1w2evc8s6q2qirmwkgbop7o34t',
                sort: 681346,
                administrativeAreaLevel1: 'z0a0v07bmwv0qr8knr808conn2kjrb5uw6xt45ic3di59pt6f7',
                administrativeAreaLevel2: '4khqwcmp8mkq2bvwgcua8c2vlrrcx4htbankot5h29u0icb975',
                administrativeAreaLevel3: 'crbjhwbt22ftbjz130ls5rt4zey8642rm3sh9c7dj9t540v0gp',
                administrativeAreas: {"foo":27078,"bar":"b]kXLc4w(p","bike":99649,"a":29225,"b":80037,"name":75426,"prop":"#2)uJjMZ]k"},
                latitude: 95852215279856210,
                longitude: 64585493931313030,
                zoom: 29,
                dataLang: {"foo":"&Ojrj*K_t'","bar":58189,"bike":"_.QLv0an6d","a":"2xF|a^Jp>A","b":"p#=H<62IrU","name":88202,"prop":14662},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '65057f5a-96b7-4bdd-b0f4-8aba905dcac0',
                commonId: null,
                langId: 'aff66063-a06e-46a4-9be2-1d8b9590801c',
                iso3166Alpha2: 's6',
                iso3166Alpha3: 'gwj',
                iso3166Numeric: '2wj',
                customCode: 'lwbhju5e6c',
                prefix: '7409u',
                name: 'ls64kpwerdq46kbt9pi7kzn2e5c8ijqz7z77gdpikg25c1c3m4ml7fclcqv9imah13qlb4jzsbguoidiii4nrzkdi73da26xo8oj4i3xobrz2bkpb50ebymvph5a2302m6533sy8mmf0fkm3okl58efr3coc1pfg7clznplg37ge37s4jzqe14ag3mex1cww557sl2ffa3r9joo6pgge42xcc0hw0zebiagrzzm29js544a7tespdo4wgoe5itt',
                slug: '7qdgzoxtzl94uh7zai5vrza3b85ut5hnfcer0ufy7oz7f9cy99xuc69l0zrsde91qcs8ufs7nhxw5j8xxu8oqc6u5fnod4vwd4ftcwcj2l52up6lhg9sxgoy9xfi3b30bi4q86cxerghk391vpi85px1263gokfqvid3ys3m4uym5k28yoisox09v6cu6xy3kaapj0rstioyddhqip5i9vft8i0ygoyriz10wm3da1xic0i6u34dibi9uo6d1fpuv9lt3hariawyki2wd6uas0dz01iik1w1fowilrb66n2m3xg3ou4al29ulw8routa247c92ala96nzt1i5l1vuh2w6hp8btkkcljom8b7o7atb0oj4tk3n9ehtr2c86mr8fsp69w7eu44xt70kvn0qu1ql78t2jzmunkyx1apeoedzlmtw0utz2a4kv1nxxx9mkfr2z6z6vqg0033724h5uw9n94irjbbxrpwzdwo16dzwahif8oo67dk665rid7k0hkz8f2xd8hq1cjefvom7qwp11zn2u4s9iylpvitllqr2rrwccetniqhv4a9fh5atwppblxj7p4mlcaw5xwrwsj3szo0im35kqqclaw2wr2ytpiiuhjy1kql84va35tyusaxzv8k49mszm860blw9w9swrng24tlvdggd1w4nkpi1ckx19wvmcd4piyqy6uhmislb5b06uyhwcpkihp2z59cv1ru9xon7v5cerd0c2yrfn2hxrw1wng10756qpikgrvi67ckz0k38fasaiuxox9w8yg6dt18x1n1sj7l7zcd2tog0a72l1jd3iz2rocob0h2c3zjnsockwtsrkjexsvu2xqpok26k75smwpflno61xwwmapa1atswqipm1w2uqj3gqsrpk1dayauqnw9dxiq7lmjc8c8je9qpnmwp6gaj5rvkwtsnhtb67wveugitm3bd3eh72qterezldge5ehgnxkmsraydftmmqqa5ylljn86f9zdr3n4dvpc7dcl',
                image: 'rqcgg3jax4uceh195zpo9zrom2uozpmbpty7a2ukj3enw8oumae0r3v1wgkdxul3fj18unflad0g2az3le5tv9cve6e8woike4a054vpyyhmu5lf1hlpz2drq9m2x6u760o4bxkn4vr2crra2wozzckjx6jurjt2l0j7iv4ptee8h7hcbi6lm2xtbu7l8vse03d0pfrwwlpwud3js4qjzurrae8xwcvnr7uy67t02x39pf541unv1zgy9h9x5bvkqawwfbnh39svlq0r0su6ecrswg2hx6kyuw44g3t8248dtwzruhqwjpx03bxhsavn7tymvsdt5j7qiuqr0k6o8ltqlbc0jeqa9ubmgpoef9oxea2axwruuvy45xjoaxnanay3h0nw5lg3wh88bbcgnyse4hfewwl0y4mpd8ptndzv4cn2vrhtlbgbo2jw99wgseeh8bgsejq3fd1kr9gzx5jywkv5i4bo14ycxq6fkqwfgkh343u00vn24qu43zp0b43yin44chwmvq7r3c9k1i4tm7vq3vbpp87itu45m4vfx47ngvdagn0zyue7uxzxfanmwi7k0ndeu8amvt7c9e4jcl7rhcdhkakgy1a8kfp0y1ctujqj77zmkizyqqrp5ovtpghv27zpyqow3tjufmlfw44s3iusc0cyfdmu5l0rjo9o2raz6fbwubulcx62g5zir2w64e21ouodeyo2pz8h999rb5ebzb4d772quy8iu49l8xs8v5rtduqay7g7j4wioo5zt3e2vebimoffs0ywxxkajn3idh7a86o9z3yg149etvibpe9b0ytvh8ebh7eiljiswigu6kyvcpydsfctd4w74e6934703t86ywrjfq7lma56ch3xq6v8ecbg03t5iimik4ppagg7nvc0nc28s8wsvrro00zmrcp8j71f3m6mnmz6g0d6x1vhdshp9cbixm4u5y2h6jhxf0cz481niasqip8qat31acixy28yoi65h5wn2wlv121sbmme',
                sort: 115436,
                administrativeAreaLevel1: '7pao7soasih5zmpzieu4qqdvbx2fo5iwnujkynyy9ud2a2nfk5',
                administrativeAreaLevel2: '7kx81uadu84azflirczvabmtifkqeypvbayr41nqgcclkzxet4',
                administrativeAreaLevel3: '59j7vuuob3rrbd7eh262wi6umwe451hth6t497d0oeg25r1185',
                administrativeAreas: {"foo":"q(Rn'2E,Dp","bar":5703,"bike":"\"BSn@pe?Fm","a":"7mE-YXbWQj","b":77681,"name":"\"XIv='Xc<g","prop":"2sz]GdMMD}"},
                latitude: 48168181551440770,
                longitude: 77494204712653760,
                zoom: 89,
                dataLang: {"foo":"WwK4_nBZks","bar":"YU|wE:a0rS","bike":1032,"a":56572,"b":14279,"name":95891,"prop":39260},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '083ea3b4-9502-4f2d-99ae-5e3fbf861c19',
                commonId: 'b404c992-1ad5-414f-984f-c26cca88c5b8',
                langId: null,
                iso3166Alpha2: 'w5',
                iso3166Alpha3: '5f6',
                iso3166Numeric: '3qj',
                customCode: 'grdbq8zdxz',
                prefix: 'k8g88',
                name: '7wm5ftt63k0rqed9lq9rxai69aeng08ja03xep943kozhtw3j5fifjl63t1d5k0oefw63u2vpc2cw29ge25cdox9qa7pa1oeowf9tvzqbzwpn1az1qrzoxtxh9kvcij4vfzt9b0nvpv6wjh0n4x6d6ifgmsdlbcb31v5znnyfuffid0bqh0iazlr8fli9o4333f53b3k0qj01azul1s3l50nmjnsx0ho9b86f6lmza58sp28nmbrz0hys7rd2fg',
                slug: 'i1iiitc2fpbz8bv1u9gwtge09eabjeg3jeag0mpzsibrxtm6bkcv9zalvkk3k505eg0scdcclwvu8lurcvn2aj2xr6ewpvql8je4i901ia1takvxbo5pa77cr0z77vsn55ezzu873vb2qergxjoperjpbddr36swqnxgdes8vkz186yhdhpfj0j4foh2v95sjsgilu1qvr18l57mqsvx8jjos4dqu14vj7rvll16s8208py6js8hc79m4fggccj5m07akruvt8nqgdt3k7cqs470f2hy1ibp78c3a21mfhxs40fpos11ccflfvf6xgqwfbft9s12p86tjiewif4mfecnmzyuh0irlislug15vepvf9skqpbo2xratkmkusqgad5t6549gd8xjk8n2tgual3bitxp97l92oda8viidlbj9qsrfdg1huwwvodu951mm2kewp07yxih8mz34vagmrh78e3tb0311htuvuuk4qhhe7c02blccgb0dtns5iils7fhci5jzjhk2v8c8j2tn11a094f213org940xkmxknd5ewz2h2jnum64y3sr3m34dfm8kmci48xys4eouyi87gufr0e0cjvy8c77ok15kk95lu3nm5y8c092o58z6q82vgn5mw5v5vgkn0j0dw4l7jlcm0wmwb9c9b4544vmpmsutzxpybn2iggpb9y87nlj7nm2uove4z8q5oqpi72bsfkv1nl039xugclaj08jo4sybul71t6g992j109zh98pcd2xe82y50v729e15fm4ifulkth6wn5nxpxbzzrmhmimnmujdib9d60p5emjj85j16dmiix8jm4g8vckszee0p2pux1khwoosg9ve619ba0za6c56qe77jrsx96xt1kelrneiiszbyqylimlwpn3fd25hg4jx013ziojamigwmo8bc6b5u2w3wb2dukexcu768acas2jy5yd0wxvpausc7o4cg32gdpgny8bsvl52cnxnfgdu4hhjumq61373a5',
                image: '0yvwjivgbvgrd64yv08422k14x9phf1l86jjqr5h41jgzxpl37u05reu108cxar9olhbwn5eem2a97dphpy859hqhifg009k6o73fcba773guqsyshpzswlfrcih6vjay3ie1h2qel2qcij4j9ctrf0q1qn09pzio0p28fctp05vwnle5075opvy25bpqsyltfpip06mcoyoe8luazaec2mu7ruggzao3nuprvowa5y6t8w70by6x8shi4lqo53sn30wwdaawpnqyurf79vxctikzwdf402whavye1i8pat32hrj7p3u216iom26h4801sxvj0ga8a5bx32zwe5g3te8ki0c2s02m115tfnklvzwvwzu3ru0zgc7ptcmjavb9tjy845saps5ztzr63s1ige8v0x03qri2iaybt3e7u5wqxm6vuhjlc5i9taie2k9r2aa3jronafkhoujwegaqcmiwn7184q2xrh65scec384vs3t0so7nltfg28j3lhj4vvz0duc20h25l2w4g48lh1a45349hfspvq31i6n0lv8kpc1cjazhktv8tnaagku4miapnwa0no6w7ehd2sw0ykopjw174t8unb6jgkk6yjphn6e8adfz28i1lz48lk96jjyn7qw4s8dqta72w0h7iys92s6a0zir54f981c6mp2upnr8fisgsffunorgbdf63ov81ybonlefxwy95exo8yprv7vzakd2tslmlwi7a5denrm8fc3x15invb3gg6y1lknymoc88a7vf4gmgcojy67phj0p35whv6ivpm4eni84q2w2wu1vjj8gd7x4lsls0gdxs2v8raae3y7nelz6ve38j5d1z9id8dng9c0549wegvmxk6yq14qhb30ov60dhytjs9kxbz6podke9484gg8eu3sgckhhfwa7xpivakn7iykjutqsa0q1kh9sm9abtov3x5dteikucern6kw9huam699el2zak3o5ip0jt25ls19e7nip45det9ntgth',
                sort: 991332,
                administrativeAreaLevel1: 'x458awhbw38brpbssohj4ouy3h7nppqebc2r50ekpf8ui38k3n',
                administrativeAreaLevel2: 'aeve5g9muu6q01n3xhxhccpimcdzenpjcxt1flqkyp6nul05z2',
                administrativeAreaLevel3: '2q6xrs26zg4gw5hwpxbqmhljqb9zfg22vpj08kuix9pmjf3dqa',
                administrativeAreas: {"foo":10635,"bar":74003,"bike":"rH]_u-UY/;","a":83855,"b":"obLH\\uq?PW","name":40031,"prop":10958},
                latitude: 11061469331749460,
                longitude: 39631646875923440,
                zoom: 67,
                dataLang: {"foo":98838,"bar":":,sT#r)uo)","bike":60631,"a":20157,"b":"d:8u=\"k&[>","name":34221,"prop":23472},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '48d6034c-74a7-43a8-ac63-7c718ab71d05',
                commonId: '09bddcac-b864-4a1c-99b2-73d954c245c6',
                langId: '47e05209-5798-4a3b-a5fc-9ca69eaf803f',
                iso3166Alpha2: null,
                iso3166Alpha3: 'rv3',
                iso3166Numeric: 'j0c',
                customCode: 'j0ce1nkox7',
                prefix: 'coz1z',
                name: '3my0i1h5ltxdhrze1r4lxxnwb7uiaki3zgng53lqgwvstlerdu9g9qn7765k1uvmr0hnbsdi8vv0xj7pg9oulnxiydo2scx811wq1fd2wjof3k9rsgtjouxkcjcidosa6yp9eqlnesstcnceqixl73uadn03gc7bm6bd1nx2wwvaax4arcwy6351bcnh3s1a8ib7t90xscwv3v7n3df57cuv3n212hublo0pu2xz6qa8vd8bi5pjwmwv5qyf31f',
                slug: '15s07ls44xqif4p6unfrzstne6wub0kxq9yl0a9xbu849jseairofhlv5sactytcpmz29hubrqd4rrcdacpscu3spavzlomswbv6rukfs55p0fiwu2fc4weeb6maoxcedqprcjvq0xznjw6upat9ag8ozh0opkiz637v10nx1fi5mgxw0zsy56fsmpmueb346n5e4f7lh6uwyqgkho1wv0zadv7ygvpm7r903injm66bpf79i2z7fsj4cknryb96a5689kdn5qb6dksqs0jsrldtby7yhmjrrk2fd3qcsce41xs1xrsbeo4s1ss65wt5jnosdhmhhjj461civw6e64e1yrgmytw2fbq7gayhwhe0cl31cvtyuxxq68pua2i3ll2fc6xwwxwbs133ntcj9fv20t4o000syeidwtnwdmpcmb9jkda7jslt493g12kgzt7yk4769fqt62j4fy73wl23ksh3nb36idsnafgfmag0ui9x5mhl33at5jwhjsce58i1brtucykx8r1i3lecce6fwn4k2td4wazsxni3le5ovd6hj9amfiyt55wajtmyce9l41blq360ik2w60q9kkhucpcilj7nb1gtsazus68i6gs2heb32hthhtcbkqvuoiliigvs0qr9bpcc9iow8rg311x8d8eo0231nrqvzx5uj5b6hkp4tmt7uxbo8xydacfl2lkhio9ophdzf44g1d2ihlijov2i06pajnkol8antby48ohsju9x9qa333vniwp6nu3bj0t59z48a2tp8w6v091jtmp74f2kcf5ym26tr6qb05b41htgq2ehuuihuj3jrwb67t383vv9myrgrwp8h92rep30kbcp20ipmlzw5l4ei6lf5csyrf9int7hf7ctad7ip17jva6dj0qt1tqifnveah8h4j5i1gscdkwx3zr7k0hmmb72circepyhqusv9nfdkehzbmt8zb35zatn0z92fwr8jx8ym6xj5zir4rvpuw3amtxy26ibzlwe',
                image: 'y8re4z366adyxd3ukkpk78zgw1scavq5g5kzm8vrjqb4v3zb942yxaqcidw5s6dhsj9wueytml8jmof7enf3pgmxiy05v6c8gn66ncfm1u70plgsbc0w2n82xq9kunpkp5xkr91kuj6dbnwe7h93tex6o4std1lrzfixfxqma7k3au2m47w6v8hcobs5u3elnrwlqcp3u1fh72i35y5hanw77wpaoebynesbkn7fx92ob69ny08jig7380c8nfqwqee0dp98cozh6iod0gn5x1dcpg75x8l963oisczbmxh537hpbtkphqaheqyp5f640fa1stolmfmrzrwfdkjrz0x78on1ygiwr5shvu1ncsqklo0ar4pc8zlrwf04a97mryeab43qg6lvcgsqvmsizcecq7q5zyhixhyd6gcu9wf9gnf7o9gp84aeu7p4veoiih2hrvrz6ozk2tnaycxg2j7nqi0mojrbqs0daqhnlgje523k897jfzwl2q3s84uyjqz8ga2eug9uxhl7y07p1ldp67emmt1uwhbu6yt6a3gvx45om679x5ahycw7k1zrrdviko9ujriv8y5dtb1nh5ca6cj8hkcdjog4ab1wxkp3nxg6n5j1c99xgzy079kx2zvg4wfalibwns6tn5yt762tt3x5hbej8tnx51rb4q9n1kx6eyvsottdhkego45rj2hc3tp5cvpym1uocli0g040jsheaqaast6s8oeo1559vile4oa2kjjag9fsh8ammlq8eix2xiznvei2xbmm7jppgpl7mnr4wveog25x26ej8ce8iefzpvcqwr9inm1rrjn2wc6q4dcp54248fumnoxiva0wd7i4gyhdsk70j8eni7pdi2w7s4oujfvkww6vcub132x807tazmof03cwkiz98r90v2ylux5ct9im711xg6rg8sjy3upuvjdw4i2ya4p13hi95bi7549pf1yi4o1kkwbg9ydb71j5ca6mr6rgrcjgfdq4y18j63z7aws6',
                sort: 672806,
                administrativeAreaLevel1: '28ggoaz5ewkgiwnsqk2ig1xz0x8seoo492ifflz58din02hb4i',
                administrativeAreaLevel2: 'mtasoytq4lte3kuwbjtgrbof5ml72665eax9hmsvp7cgk71ys8',
                administrativeAreaLevel3: '2tm1bepf5l9av750fv1gxt734y2h7u5scxunf5wn4r1haya54t',
                administrativeAreas: {"foo":"wB\\i\\.CTS_","bar":"!=KH{Vf^F$","bike":40153,"a":"lG?-RAHm0x","b":"c)#XSR{Rt.","name":"Ucq5z4.Tn[","prop":"'Pld\"}[hF1"},
                latitude: 21203910002801584,
                longitude: 72559189139128400,
                zoom: 47,
                dataLang: {"foo":":ybW05!/c\\","bar":92675,"bike":93124,"a":"y$FLLG6wBq","b":96600,"name":"3W'm_`qiAd","prop":"R'VCFk$2e4"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2ba21fff-3d4e-48ed-bf33-046644e47106',
                commonId: '42830914-10ea-48d4-ab6e-019b62672e71',
                langId: '71e23665-b6af-494f-85ab-05ec8a81dcad',
                iso3166Alpha2: 'l6',
                iso3166Alpha3: null,
                iso3166Numeric: 'q4i',
                customCode: 'gxh1uut1rw',
                prefix: 'oqe4i',
                name: '08dd6k68bwqqhfz74yrnm3djaplu2nrnq3reoqvavb4n6okckm2qq3apkgg009q5mbd3t6wix2tfjgk4m0qqy9nwm56d2v48a1nmndgjkcmhyeza3yhhqjsydvwiu4ehp4l28i4fn1xlnffvtz2ech4oambwkafs004pdygmvw6gfjd3dxok8ng52ib34nl1icz933bgfxvij2mu2bz058ix6cyqy4gggxetniyoys6qoo55misqz02dx9fe3a2',
                slug: 'ritksyu9ld02ezfd9vpdq7cff45ntin9vtyen8tnn4swv59i9bt0azke1icnest9aco6wyih3p7y77kdfywgjmtt5ftq9xyqfz1sqa9m9sp2rlcdwg6he6i1s8tzkylxun0b90phz4ycmy30zkf52wjndz94uaa2nokbtwie7qdkhr7x621a8v3671gu70cr1iq7rrb1225b2uzlhwpan8g6w3ad2huqvo5kl2z2in5qyirnrrbzh8s1eq38j3jsop55q3moz9vqdq7qz0lqnj0s4bkos07dhymbfv9kb0o4242vl6v4qsim247un4w8ewl7ddfbzpu9dr0ptkrpbhvmlmz3j956b8crsbn87mrsem7quw6kh1yt5fl4du0qt9twqt16ul450l9xv317xsv12u11mnzfg22xhwlqso0q4j4mnzibqby23xfd262thh3gskhg2sodw67mayo5jabor74nqf54wzs79nr7ez6oh66jw8rfgdz1lgaxuhwl33fvsp39a96zjtqg8qzy9jv6ad0fw4sgao3utv9ks2fqeapu84xbgkpyg43bxc6jjch3xzzjgvwibcg1av9z6yp967elw98d0a210qo9cict0xhnndhlguhqntpm9uzcq1cmz1ikfd24ozoxzu8ao153cfdfkg9zobdkn3nqyvkiih8u5lunrik2xk8zdizagya0r73taavk9f24tu4oizwc1fl2ocrca6je4pfhs55lyj2g9crxqbsg739900albe3jkbt2q1cj972s8rjwujznwpcgp45jnqk4eul56ur8jft510bpt06waep60a55a6u022romqvzzc6zhbl21lyfa4g8fb2d4n8w4f6ro20hyqehjuftle0nx1r8v1akv247kytlsl0f3hvn5iu3wb87e7kigq9s9pa13rprwm98ejq5wph52wd4whs5fc4as7ay0baqyb5bfmczi6izbppm9y4z0mxgs4zdk5dqcn36ins6myrkoyf092uegf8z',
                image: 'c11puxx6diqd614ij63sa3qlj4f21rzowzm3jxvpdigow1ciplnqnrkooenhd9xj8dj6e2uf38m55o713gb3u0g2xdzvwkvi9jys87m0goyl1qnzcp3vd1rbgptp9piw79ui8jlxe97v64zwafc674s28smz56x0a6lj0nepn1qlxi9e306cbsracf41g45tj0jshmb9xnieb4499ib9id3t53f32nguqbsjyysj07fxw3svi2vgvbr1ojqet8vtf1ufiv47vc8ro5qo67ca7kwnxzxn5bzbxtqvkwbm4lb3uhubad8069tae68bb1t8pp4tnt7x4nvlhc56mxlnilo2lncymewx8e66xb15vty2go9qoiizk1yviabx9ph53zfou8wwpc4yp7v150s7igvyb71a0xwmcaix0wgcmbkvz2lho442l8kquy1s19dnnqa9kl9iianwbdifh29l0jlkhf1tnys9ro1dvpldb98a9o4mv6m23k72lt06oaof1avzyiastifhtef21lhohv4lhf0c33vxz4sn1eli7hvll6czoeziugvp1j34ot5e907ixsfd5uzmtodaajovmda70jcmux1s0ybtulyjftytzc4ed6mmr0ywr8rjkl7gfidqidczimgsbsh4p824qjhbopqeu4h3bwd82w7vl95y8xndtnnpql8blvhm7p9o2wb41z7s6qapf77j44l8g1iirj3mtyqb5zw94mc3y96a65udcjr6b36dx4raf3jo96rnus7p8ojbje5yrtwtwalrlk40k8jzg234wpoqyk05c4lgzmyf8gmqz0c6nu86e12lo573nu8chomworuo2l6wh4rj5htc8jydgvcv401nyirzwdu3z753z431bd7zr7lnj206c77jj832oxgh74gizejsqsulv375d33h9w90cdguqcv8wk9rtqrenlq2mujrqktvw81xxf7smsjfwnndk2ybmjo9174pyup0xct94nau7bte52i9nlzyxa60',
                sort: 606450,
                administrativeAreaLevel1: 'pgjy4dit7b1gl7i5w1bga5jpj7rjp63wp6ajrr9t1hyzc3y0dx',
                administrativeAreaLevel2: '1msk6htbrrhy0emrcw81ds9xcofyt7kjlicqxtpmykrf5ke6dl',
                administrativeAreaLevel3: '07ig5dy9b28j4vwg4e7vvn8vbp946y4rwdtchq7ekboxwqmac3',
                administrativeAreas: {"foo":92599,"bar":"Egny8#qILV","bike":96619,"a":59215,"b":"]4,|0\\f}}v","name":"kt-C99BdfL","prop":"+gf#g42]H%"},
                latitude: 94233294426900600,
                longitude: 22548868942062616,
                zoom: 52,
                dataLang: {"foo":"\\R`3}?%\\*f","bar":76646,"bike":"g]T#&BH:lO","a":38798,"b":57044,"name":"'rev/XMO[T","prop":82604},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bccaa236-b172-4464-b88e-b980cae8be54',
                commonId: '480137cf-0d78-4b4c-b045-b8596f21740c',
                langId: 'bb9b6add-f3a7-47ae-af21-3a89699657ef',
                iso3166Alpha2: '6o',
                iso3166Alpha3: 'ugd',
                iso3166Numeric: null,
                customCode: '5j5wi4qlnh',
                prefix: 'hj8y1',
                name: 'nnxixy7zwb98yz6ht2voxv35u4hmnl7qhxzxjgdm02izp77qdjshxpd21qmvwi9cymdt38qzy8rplxyead671q4zm1aygurgpaop9t93odcscdhenzbh9t4qczmbrq0goh4djkfze1ohshpfeaauh4wfay04hlthieei61alpsn9nvgurifha34h3k442cvlg8f1m33km7i6ptu956vrr51oonvnyykw0flq7oi1he8tco7lif2vtvbzcrmdilk',
                slug: 'gtfasng41o69elv95afwicmko8g6gw7v5mbsy5j6yn44w32zcdpznnrkliqhn70uln4xi2qvr51qdg08ylxjate4hf33ko0ijd5qoc3zvd9u91n1gduhjyrud6teqfmj4zfo01qysbaqwde4i8x30m2dyu202yhqs3kreatoy1j09ueai1crux3kfoz9pav9bqp5tp1pecv5t43vgbe9i8b0owp8ywpua80te1wiqgeoo8qi2xihxtcrtk0rrvd5hl2rb2188lnpx66j14dp5ky7d4jt0ss3pvf0ocipepyu8wijrbrjtb3sh5w8ffa0h3jwntqzvzlqv8ldgffq57oviqbsn6h3grddoje4uijje6mtrb0y2qf9j3kqsymm3slwr9qb0s65cfxaw1lylh95bkktcqet60ygwefyays7dwe78ss3c0u9tur1oxp4vov8iyj356p3t4szhks9sqp04zj37r46bcw58h4kxie29tid0mswan6117d9w7atltkm2ifz717klnvncy12rgs6o13fcqak90qyrzbaj48v5eavp1c4z4g6apfytu98z8nwfxryr7kw4ozojqd634igke2wxy821sys8btez2cfnc7u9g502dvoszm0xv2usrxhtnfj502j76v8xlkphxmq0mcrfpp09g6fo9jydlwfsvjg83gaf79c8wh7yrjquv8mblff8kswztje5bev4qh8kili9l5s62phf53h7ergui51lga9m89n1aidq2hr3f5j3e3eumol2qzs8xjyhimg0dxsds5yq1amiha38i0d0wiayahr88rwltghigesqgykrc9vqzogw4z9d865bd16tgandidpzbylpp5pns8fk6z9y09fwui5na1qvhlxvknxfoi9qbxzbgn46wxq5kgjk7e2a2kadkaowxvrmfni9ckvrjrmcr0c8x18lz090v8vvav3f9i27mggye0beodl0fyrbd5csx0lgl1kbyp1vb4tl0pk909phl90yvqm',
                image: 'yvd09c8jgal3a96mqlv5e4puxxbhz0csu871vivtgtn2dcmj088yigjljccdu3l45xbzts9r8ddipkxinrrgjwc73vjjro1bz8e5sc601tnlzi17fdsmy2fy1u3hmvp5m0x6kt9td6x5fkg94zdfqcnnrbsfagz8s76ngbi2thv6uf7hz0ztbv64k3lmo0m2keceynslihpjqqaebwmt097p2zzn9src2pp1l9ftow0re4v74jofgb9ahzmkxi3gjc9wnht40brwvoinzylvw0bxcqwrp2152p1r2r4lftgfd453ohgphm8kck16k3sq6uqzsk0am0zcnvlk7baprab32qfo3w5ntiq4gq3h1zns1nhr8u9hzh29gp6h88haimthxb2ssucekuu0c2dmksilgbfhq2wb0qzjzsq0nsbmast0zet51arl6uew1ivdm940tx0h27v3lt0izq76zwnpsx4sx4kb7jelguavi2atv06sn6d7d6ehba3dm36im7tl1fvz9funoptycrh35lhcmbge76vd6vmjku5vsjgrop8jvogpmrr5lshni95866b4j3xjb1annc09ubwjxij73q5g7fgpb1pr9olxptfhatle1cljsewlpkzseyw5nq020qzuw4xq3ccefesr1ylpopp3gsbq5at4x9i8nul4pb0kcrndx2mp1lywtb2uslwotducrp4fc5eh48tp8h2oduwg9y3nmlcsv0biwimt89kzmw82aodgyvpxnqj9xzcsdez70la64r2ekc7nd92tbkoepryk9xri2j0vli43eoy2r9jwpghq8enx6lkd7xosyup2s6g2jqdlg4zgl0crc41hpkyeuqwz0whxyfaccsa2v686qtmmcy75yetp5v666g077gxdce4uzvvyfncbt40kt5b9rvvalrh0x2aeil9ikzgi099vllu8orubw1pj572w0tgvmep12ym6l084ueq2mm56nohc547xs76d9pyxh4zsrlkggbk2rf4g',
                sort: 908025,
                administrativeAreaLevel1: '9aah8zmwxfrqbb0wb69t96v1jjo3nyznqnbsxjjyrjavk0azio',
                administrativeAreaLevel2: 'v9glhigd06hggw590cio2idr1pnwrvot3iaqhkeo79ctz9vj0v',
                administrativeAreaLevel3: 'sccwwu01ohlzc8fcw1ax5jjpbm3vlf8ircmscdtxqpdxq7kqjm',
                administrativeAreas: {"foo":69327,"bar":"TevOjr$vbZ","bike":55845,"a":"a*8+Q)|{]O","b":"E\"JM:w0tUC","name":"_\\:aHTGN.5","prop":"0A2A]uGG}j"},
                latitude: 31043342303319776,
                longitude: 63024464323290130,
                zoom: 36,
                dataLang: {"foo":"*JQxwcZE\"^","bar":59238,"bike":"jB/;2IBR1T","a":60831,"b":"Zv-\"^Tjeo)","name":"DVF2V`U`.u","prop":8623},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2f694e34-a470-4bfe-b911-44ebb18a8569',
                commonId: '9167ee45-fdbe-46da-a98c-bcb4b3096045',
                langId: 'ef73d9fa-7b85-4244-a000-cc11c20f1d5e',
                iso3166Alpha2: 'om',
                iso3166Alpha3: 'w1i',
                iso3166Numeric: 'd0o',
                customCode: 'o0sz0woql6',
                prefix: 'zurus',
                name: null,
                slug: '9eqr6ei2rfuxuubw2i1rt44u7cg952pd1vc5qsrztfeyanh7m0teo56ycmdxo6vvyi1tessdp8fysppe0mthy4b26a0cuj4j3yp58od20kv6kjy4sdjcyr9od11yeduu0z9t4ttt5lvrlassrt9fpmjj6ox08fskvfpwj737amfdfukwmru4kof4en1xse5vqqea1qmkd9mp4n2mjbdktzuq2tj2yisep1reoxa4uyzfijvukf98gvuq0phgnjmkbs3ihwigmc555vfujn4yxajllhktg6jjnk5u9cu80vb40avpavgqfx8dh7tkffhv3famwefz84ubzldrvuq2znx6hk5rxs0nd1qm3azvsl86itsus2aumeet6xz0xmqvko098v0o5th7asvxrctuqgernmcudhdwigh4edbod2pgldtbfd40rs3z0orila22hifm5kt8ab4mgsjw5z3ub1gqelebsjy5pdw73lbd6q1dlrlblzm4o3gps9xociakomucfnbd9lefu7vi3qph6o02mcqcsjcvzeisz2m4cu3fzjiek1n2lk0yydxt76its20cql9f42sjwj161tv7g4ghzn9jsazbi0v1g6pegzuf6df4eaa1y2ebtdqanx4d3yn3odyz0kxiajoll4bdvtkyg092uqrld8859mcqzztb7zglcnr6ehem2je8fjlzuk7l9v2dkd83w5def3gz3cj7vd1mg8g166izuo5rxraxzos5i285tekq0fcbxysi0lfitana1vw95o8flika0bzp813fp5uf5f5ipfomd948vl4tzgu2ze0r5nrim68gg06jcwbvwtfjih36qg2ctxhrai4yw2uva8fnne0mi55r8eqk0rbnoodz479ibijh6be730o9lby9m3obr3nz876iuxouwwd4psqx993yg55o43c0invi625iaj45d53oijj282vs7x3eahkwt0ps73s3bkg5qlr8i49quri22pcv5lgjscz7dc7ak89uutoe',
                image: 'gyaim2k0qnpp5w2tygwucyqg3qlg8pwb03ousirubk9t6wwcv39667qs2j2ggvzokatcqqua15rfmos00zu7mfgwihc4dv8jv1yymdfbn0lg2y8bz1skyo2ym04y0fpdp9r1a5p5o03q0jdb1v7n7ky73c6et9ckxfcd3uphdldpqcprp50ubj39tddijkdz3zgeihagtu00re8nh4auzhr5rsw2r5couoc8dao37b2jez7z6p9cqvywjdjy8tvizb4qjn4guim0nm8g7v4hvfxno19lpvyknunbh6ud5fb66l8eupccpmegz8mpngay4b359mf2zmzs8mkquhfnf9psogruthx54ltm74uai90xv9ga73kz7gnsykyoxbb6370ekkbh0fmotnhuh4kwlx6f4ukkxtet9sdn8eiz9msif9ktv636dq3649ueq8rny2ks5ypga6jh4z2i32lrmqvjjyiikeoyfizcyl65rzgquzdmiycxzvap3ec6xq6xuc0biducmpw9al2u4hvkoi407g68zdeu5xulcl2s7gqg4is28asqwnaxellx7jpumr0x2glxt9iu6fqzvfkcqt8kqu9ge6kdx9asy0o9m6iwzx0vnawaaq5l48lgt5k5niuaz5b2mjioc1fae4j82eyj1c5vdn4cl0eapwq7aw0tluy9b0anlqs0f3kb4mdhkxy07mawvgeh0o7z5f308ibdkp4j4em948wk20ufvim12vnj44kdmadpen47abyuejzbhhcu8gjadhwm8mtevd26i12f6qag90zhknossmx8axzc3wx9kof3kxgqf1rxlfwu7t7ah2uoemx0izrrrx1xqydb57un7pxq4trjqq4hflyfod28c84arcnf4bwz1spcckkphdegk212ppoi1z4hfk5h9b0dwkckfpp29civ83wia50lg1ljmmob0a5qn7a1xrhxagsjifvdzvf41u4uy9830wfixwb22x3fvrphtplkzfct98it4llfh5la',
                sort: 677446,
                administrativeAreaLevel1: 'a49zstjd3q15wli5kc9jpayi6x0bzap0qwvlfj2mcfoavshqgf',
                administrativeAreaLevel2: 'di0ia8x395inkd1a8o8f409osy17xusnm3oyz4g703zv3cjaws',
                administrativeAreaLevel3: '429m9n7svw8hpi5fbxa26c71ae7g9ea8z09wmrb4t6skfqg6wr',
                administrativeAreas: {"foo":"]5xIt%z2j0","bar":"`H.G3\\Ua7M","bike":15529,"a":90294,"b":"M_r*y*nIo*","name":"ffP-deE[oY","prop":"C|!s[w3C;C"},
                latitude: 24403406379344290,
                longitude: 74997790861680130,
                zoom: 82,
                dataLang: {"foo":"}*3b??{0<p","bar":"L_A&2M}4(9","bike":"XUZ}c?V9^;","a":69342,"b":24473,"name":"6rKk$\\hcV3","prop":"$+{XU5Yj:+"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'be7f96e0-6891-43d5-98e0-af14691076e4',
                commonId: 'e2378cb1-f4a0-4bbb-aae8-fac4a58b23fb',
                langId: '0bac8855-d219-4587-8b73-a5c090356302',
                iso3166Alpha2: 'l1',
                iso3166Alpha3: 'nuz',
                iso3166Numeric: 'ltk',
                customCode: 'j4lh5cfag0',
                prefix: 'systt',
                name: 'acvbrb6v80ye2roa1ucgxmvpffzrxvjx3dw1xkmrs0gf50hhvvkodbnaop772ckfbhr04eturu0ah8b00n4tk07k3r3wx7ny2c8iill11dlajfox9j9432b2h02if9m2xpo3wwxzyvcqlbh6tgdlarf4kdganoqycla5zy2y9gc3duyfme4vw2wfykz6i2wl7xjv83xlv0uizw4y04zb9w7vzrpb4rtq7tbdbiqlibnaf4lklor3l36lttzkd4s',
                slug: null,
                image: 'j69rhni1uyg0hugphnbmc2i47xfnnuprr0vurb3wexjam56oikbcl7p9ph3kdouw5zwl0xbc59i7o90ex9tzfiz9l4hdiwqd8m4je5dd0f3jhnn852qu20an54c38c556jfvi4pxxfvywzpyz8n15ng0osrs9ti8v6c9q1ib3nqj842768wg6cn6kgazs5uev1odc57duhvsag2no4kpe74abnix49xv7c9og7rzbzxsoy769x4gsb3hisxi2yijzktajhfcs8ms7z22hvcjp5nq4pki24lhhhy0kf3x6m50autuaf95khm0dnmxjl454kian0nss5nu5uxt5a39wmm8rxeijnqxckoajcjnt0bjf6gykz05j5oy1me2emje2knycaglw36u13gtfnh4t71qha67tfgvmv38xamykoyrj0z3fl9k00kzkzjju4z031ga52sa0bw6awt1rdwi4jbe20bwhurptw8zak831uzmb9y3a3b70d63sp30788hsee3gl5tefonb2oocbs6rtx48zb3ki85c02bdlm71vdv64wk7gfhbp21jvg03xmfgpysbvzn50gjokqak8rtphplgisnhh9bajq789rypg8zwzv5tsh5yxh3nfzekakw91umaa8cajjyj3hnujvywt7wy9vfp9ad2ds3va35kd8j2e6hglkazk8aw3oekvkl11lt2nmaw426uhdy8k0pvvfkat02owif7dyz5bsfd7y6906dtzz63h108fpws30l2s2d0fr6dvjwa4aw9h7wt1j32w8dwuasguxbgji1ccokbgu1adn8ibzzavvqochpfxg1ino8geuag932k0ghwdjqiiccj8gqxyhyb7l2jabrh8lluvgr4d00am9w4hcfg1nlnt1md63bbluklqu1aizak3x3esyxkwffxdkswb9f32p0hudadozxl68qpk4bik7wc45qgyrb8z8wc06n146r6oaxmbmzbspr42eaorxr5mnhu5ydbst6lw69lgzf',
                sort: 963610,
                administrativeAreaLevel1: '7ya1kf1w5yt67vv0rz85kl5ghu68ieokdukcwuwxc1qti5bdzv',
                administrativeAreaLevel2: 'v4ivuyqa52y9d9afz7748538gjn99v1s1jut5llltoq3jxtjbq',
                administrativeAreaLevel3: 'kb8clcndpno8pgi022omsjmbqtcpsjhpjj8befcknvd4rfvmki',
                administrativeAreas: {"foo":"e=7vsWPeEX","bar":10139,"bike":"M;xejv>L-3","a":"+EW3$|^rq}","b":45953,"name":"]=H\"&?mL\"{","prop":"IS|@\"1+aR`"},
                latitude: 12993905335855148,
                longitude: 69881639569790510,
                zoom: 31,
                dataLang: {"foo":"VUw;]w/[Kg","bar":94791,"bike":"e)RsSl<gWr","a":"Q/rAtj.^0[","b":41359,"name":2792,"prop":"7@1K+$#B6;"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                commonId: 'ebff691c-d0eb-4f24-9e05-589acbb90a0e',
                langId: '04c11d9b-a924-4d1a-9491-cd78b4129e39',
                iso3166Alpha2: 'cp',
                iso3166Alpha3: '41t',
                iso3166Numeric: '75n',
                customCode: '93t3lrkzl3',
                prefix: 'rzgm1',
                name: 'f1kgo4mtavzrcj36el7y08af8sws1574bvlfl8q8yb9y1s6d3yilfja2ceycztw7b29z4m5vju6nqhlod2iqom43kvm04t9jwtj8f37l50mi7yxjuwqlg7witx7qn14rrksrk1xqd1s2od1k6tyx0petkyz4cxa171pt0gqjvy042p3mdal8kyarlr62s7l58kw6aji692k2kntnfglvx2z0myxnr0aw5evqs1zu8aumfbxd8b1srk5ti01jmt9',
                slug: 'mj4jwhnfeofy962fyrprenuafp9kvfykhxcsxlwqbgns79c6xhknvt8unzdx1u7dys3x5x13vgyhf3ns2r444berzoxfqfzi6kbknazupstvbzukqgf1eobw2ksemvsdwvzs0idq16ddljx0jb4gaomzdd5luvam69ffqu30no95y33h1wn4w3d66mr3rydpof8dor6iliufk871v2m8v1y9escswdcx6ewxqkdyd30rpaa8gjhneygfo9439pbmzy5s8fas3d17tmzeku0ayu8nyf1af225r9eyujzkbikvibh30edh44v5qbpauan1f8407c79ezc0p96u2f3e1bt1fqdf7aehx4e1brmkya3ikep9qwbfl5ebuoe84xxpz5cuikdt10ywdzx68ibdxogqlyz8b9ax5zvs5alqx826zfzzzx4ks5ugey9wl4uyzdkb2o1najjzrbi6fqrvdheefn3jobgee6l9ba8arlc12jo9oxpwfw8i7d93ddyxh5rlnaof87fo8cnqwnblag7xxfg2m6uz5f6bi33coaruvullbxcibgewl9nifjy3h8p1mh4vndz4siz1th3xoyq2n31jnk53g0imwozyafmh50g9nyq96ptxh95zw865g1uyt1nfazhlnxdz2pfina18okqectnl4iini39p0zngir9pmmanc3nf10scfjoaag7e17qnyr5jtdbpxiy1psk7hiqyg7g2z02cv7ligh52dp0d2xgydiipis2d2n987kfdgikkt5rfvz9xt9vk0bni048x1ivnmvm29hrlvyatxzja5p0vryv4og30jagabajt6u97njcgkq5qvdlthytvqd16nr5chgp82ia15rjklm1bm8i4lewcf1pbondp9qmq71grlvqb5rttymnrasuq25e0meznfavaihkcxlv0pynnyarz8zvowtw9xwdxkdo194ao6qwj6hxn2y3ecc5agmtpaxhwdj1ydh5bm1fn6qg5im1c0p2gb33maq7z',
                image: '5oadss1zlk4orurhhlv64771g0o36lwf3cph87el1o7h2jdj7dgea9t8l9topt46albc7dfsp6ew4d0xwykx2o3ikjt9sem7ynu9peyj552qalt3iplp5nt7m7af37c1d27wtzqe1s0boefgcs8h2e4yjsfx8cm910y0co18x1352u7bbzagbaekpnm00m78mzcic2kqe29vffv056q8vol2pau8259xu1401iuslsmaxhvw3al1gzkmap09uohvsd0wanbpfsmpbz5l1t3dv85u1d5tdbu45h2ljz88psst1o91oc2xbccy3cmaed4loql8tf2dhezqqu81rujdn58y0inlpsy4bn9nethyfgp8qjfedzsb37xs4olczuhev1q3e9uiyu2l80rjzp9mxbafxgn1rtsivfhfszrhe88m6iqj8ms2m39vw1pi5rxjmemfyt6e8ej5h1h836m0edeu1tp5tecjvze12deh2nbmayvu0wt14w4pms477q1iol7tdaqu7y1rerwqf0d9g0vn1crfwj4uc3gbqjs0326oymmfmrzt07f1ja49hk0w4l8dv1ikslaqs6fgfwcqkr6j1xa03qjblsnrqf8q5yli3hu9ml53r8rnqxz2u4lru8qf6zsf7wpbjjnaq9jnp0wyohf1k8ikz1hwykow99zbmm5m6ox1fym2e4nbyqyvjrmgsiebj52nqhxkg2jfb8l35fdzggxklt84twla7xoekugfdvv4pnj9teuhpsgcnugoi3h8zfgubrrf1fjjp1do6oay9p24jc5a7tehmuo7vx0407sd0mfytoq0010zks1q4a6hrho0czid1a944obd9hiz0j8t2r8bv5liefq2y9mxzfzg0lwho95eabvfv6if6nm0dcrn3ssclkrdwwumfw09adxmxzznpsv1xkw8zsq3kqxz3xdg6a32o8v7j0vhtgih6s39xhpneb5kmehyxgyprl7evmkjun1ceq2clwenye22agc66yg867w7',
                sort: 974175,
                administrativeAreaLevel1: 'gq10rjb13qtvabd6srtkz28l9461qzb3s4uladx8wlrg39otke',
                administrativeAreaLevel2: '0fjwn7b1wj70iuxv8k2rfk3i1bdghlh79lly0q5q40ylbmmwb2',
                administrativeAreaLevel3: 'atj6e0e2mev4lyjddc534pgfnhg9kb8azkvtk9nc4euc4h85z0',
                administrativeAreas: {"foo":"M3KNpB|..5","bar":"=$I1J#wouM","bike":"ver'?E=C*P","a":"FHEPng:|6V","b":"HcEG0:JBh0","name":"EahwPDqm'X","prop":"7-J%D`RVF-"},
                latitude: 64430017753633990,
                longitude: 54904439506543330,
                zoom: 95,
                dataLang: {"foo":46407,"bar":23615,"bike":"(/WrBe7%B[","a":"obE;]Dh.`;","b":85387,"name":"R'pZpDT16:","prop":"m&Dtb(o+F`"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9ece6fdd-e5f7-4117-99cd-2e661825f1d1',
                langId: '465b4233-9e66-4ba3-9e07-7d888d174a5e',
                iso3166Alpha2: '1l',
                iso3166Alpha3: '120',
                iso3166Numeric: 'sus',
                customCode: 'nud1y2cu8w',
                prefix: 'i949t',
                name: 'z9gjjp5dgf0hqhabzl3xc1psv3tfqtjay4omm316shc0xt3ad5rebybu5xy1s283plnw5v92rxkzkubwskrcjn992yv7uaa91cjx6nkgwaw67mc4lyn1qrun78cbnlfv5i2amxlrqtbt7iv8jezeqfjclyhj91g8589bzhiw4fg4qsxzzhkvuy7m30lza1ooech1aucu10om1qzk5utkdiu49oh4knqlrplladc0e4299cncbg9fvsw3h4h7wpi',
                slug: 'cfkb3e5hxh4sg0chstq1e2czd9lel69bal4n7bbrnwhyf80vbnsbut0v2jh80mldcqm9wf1norbr0ykftoyqtg2zhqls5dlz4sf7h06koo7q5bglj4l1sakmr3vplfr940j6twxyzbf5jawp1k1c9dryt6mqza11hkhztjojm8m4lmx6nzmg6v096ticvm569f9lp0def0k5qkdfyr9wts7ovx9xnrrb030ifq48jp4c1hc4o3pep2v2bjnq4rb13omaa8qx0kbt906tr4a3cf6bf2vaf2bn1iyl0v89h7ad3wahspb1z25qih22cwof7fz9tnwyvkllzlgf4lrldutwlx1ptbpmqy9onsoqudg9vupe5r71nxhqtw8h6jrge36h4t4a8bwmlogkqfxisekntht0lykyluahkc4jvfgoo33sf1s7yjzqxtclfu9qrb6meh5dsndukbcssmm6fcoj2leh35thdhxsqz3qzokfzse1q169qieph0mpxu4hifktqrcx4bxjrs1w4opgu3euehdfkfdjonuz3a2a77cyhvax31ce9iama1a1k04sahn5qyhoh6nmzeswadbg1jxhrwhgv2eevozp3j68ekn153lyn1ig9lckitadlbyex5unnlwbog2meye5tzo2x69488hfuraot4ejv2wh2lct56usakieqgbcmmfgymfcsuuqvzp2shi5n6dvedq0t3iu0imvhol4ls5wnvv867xdexyfsp8tf9qpk349bk94q7edpg4wkejtrs02ef8dco3l1943j695x4nxz0mru7y8ub2y7a1lf0i0fb08isuejw462ds7or6fige7xqbvdkm2us1su6v5a2upma2pkng0bpew484n90j2t77yxk1o59h0hga35vp0h1zyjm99x1q2gien7vkh6wl2px4cpczspjwnw037oo7se1ehpm4873ert15yzc1xrrtuqn8q7m6y37pmt5yy17t6pfbqu2sa9jxenhck2kp9z5odntpv',
                image: 'n6utbq946fzex4kb9rkywbhxscspf5fmou35ednbi9ud3njniia3x0f7x5jnfgf4wsm0xsycvg5lp5lzhhqyhen4gniyc77dcnunt75em7bnrgwozqpjaizzcww8zn8sxbukyc8h5t328zii7ij8mnij40ydl8pvpheu7slbhr9y7m7wz7k6w53hwu1hzisfxea450r35i4zki56o8yxo363fxqg2f90gkav3d0mrs6otuu16217vxlc4m5mi5nklafswmlwult1hbi2arq7bw1xecdqh1oixbj6ooj5bx0m1ktjzyopgz72f3g8ktqngnt1um2firr3j4o3jfw0z098inoi8u4jzcxc1a0y2hi4aagjz6mpjeuh1mhklpo199opwtn42t1520qks3crep09ultbpxlchnnm5ji3s9q60kfsbyvyklsy487ymsy7kgmam9shrmvsq62ytdyi8o86w9fk3wz7u1vhorkv7zzlecd84nbdfxqnvvsna8i79tbom776087hsn0q8jp5bajj5avk1ryxyw0h6ux6t8avjsak83giodsqftfxsyrctf6h5pcszcmp1t2gh7m3ps9lhlmrnkmv0mpb41u770m49pt1q9qy82bjuohcgpbp2ki3dqj2d0h9gfrwt35ton4mzowjta49rt8w5s8qcnisic5f9i9jn598rmd04guurmpekoej7d7rjxptdo3mjai07s7shfy5mrk5oej54mh6bvmwspkm6rzuaednlix41u3pewpgll1l3xhnjqq79jffojpjimdnj0c978f4urj4ylwqlhbx5j3veb7w9xnvfhuzk94dhawbioa95hsrkufo08238ibjc7f62vr764anrzaimb1z11x1ket5y106bhp9n688cf4ghrafp6msbalajy8trn3mubbzjd75alr993646mh81wyxj5okl14pq0r6tae4g1r7hgzem05gmmiz11m2lyov5mhp21k7y5lvzf7q1oe4lumrb1seb260',
                sort: 348205,
                administrativeAreaLevel1: '81ejx58hvuqdjhmv6p3tjcxdfrhpe6uewq7clgfs1ik87daihp',
                administrativeAreaLevel2: 'z9hmjnma4f18jfrysrokx5ydk96kj5hys74j67jsy0ktqpp1re',
                administrativeAreaLevel3: 'ww6oopov5iaz086jjc7kvqcz1qnhsh2dtoows89soaupngli0j',
                administrativeAreas: {"foo":69221,"bar":44639,"bike":35367,"a":86618,"b":6943,"name":"q!Dn4'3y,'","prop":63205},
                latitude: 19589741453210360,
                longitude: 32152840466234090,
                zoom: 45,
                dataLang: {"foo":"p=oXn(Px6#","bar":"F%T,O|(wuw","bike":90131,"a":"F2m.;XbPmm","b":":G%%d4X/-%","name":":#>t&PjkS\"","prop":25434},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a78c1ce7-c1af-4673-b52b-f2126e4d6984',
                commonId: 'f2c22956-46f2-459d-9eab-a67d3796f348',
                iso3166Alpha2: 'eg',
                iso3166Alpha3: 'cc4',
                iso3166Numeric: 'i1o',
                customCode: 'ftsqvpioyf',
                prefix: 'me4cx',
                name: 'nih5ci2jwholg7u1w4gqh42srn2jy950nfbl5d3g9em9mo00j8ipeoqu3370i60ofiit60d9cy3aq1aw4tg3pilq8crdz6bvxwumrqk59ss3y9bis3ow8m0k6hsb59281pqsozmi1hjxd7jyltowhfxut521q3eom7o4lpfgmdzisjivuxm9y8rel7k6235cr2akfp1x142l8n8za439vxprnb0lomwajgv0qb1sufgdyfo4iaxsfkpes3v49xk',
                slug: '3jxi498m68bumvb397k0863gk1aa2hprslu6b5v99f6kt0lcpvvh2m73vrkkml5afs3no1ooqmup37sc0cvk5wxe97laxwn90t1127gkqghxhyd9g43st8fd3abi6463wcuw6brg9yb8r18q983qljhz6ke9aizkkpjb3t1ojc6tg5it92s2dvks2z7olal1ytq181ps22jz9h88skffvhigp6d42g4g5ot3qwr8ofest13pr5f0il3m7u2t76n02tlzxangrkcm9b11pelr1s43t5ugn22shv0r4iwg1ldrfkpff8en50pphwokk7y3xmlf8557k9f2o4j36o9lyp6qikkbkrion19lj361f5o1k997swi9l5dbaq6f8dr3shzs9v8guxjkgr1ayvzzs0xkduva5vjhdvv4wwo778yl0a9mo5gaoarqkd3og5hbtf4bhng9mc01wgybs8gyczm1793dt3uvk4iz6t8suiiuzwdqoithxhyayx21buhs8zs38m0syxgcxvf4la5xt3vmw7oa6bwxb7eerwnzwrslqou9b5di2h4xioiw2mkcoq9s6lgc7whm1yvs8g89hw3047yge2k8k7uhy2s739bvlqevwmdbxy4iq678htj0f4vbjdp76rqr5vd44yjiajrhq0ionf951qdam4w48jvkoskaim2lexfld1egnb3yuqsycx3eqpv4c07pc9twa5365v36n0duq6d5f5itvvu1etgxq31ub78xkdfwl7voeiwja0lzh5lgkueqyrmor5clg35bs9ti62z1zppoqwuyryiq9esoznl9y07xnglz1q6sfu580wux8wydl3j3a5npbmpa31fw64sujmbwtnwvfr7tp1vmexmfokbnph59s5emm5mtkifm0jfyxxumxysbdb4eeisyimlvarkw6h8uothzjqq22x211jd29fli4ty7b0infqa9jr09e3loccs54pn1orjtnu7kfsxrn0igxsb10m6j5d68z03pflrl',
                image: 'oui95l3ap023b0ngp3oykjqa1dswtuhm08t3b58mrgi02xrhx8jkzvkut2xoq53mzqgmo602kf6xcoku2dx934imbshsg5tpqbo275c075dgos1u7810fujpqbbeupl3cp5baeweom99e99rba3tfw4dz4ar3hljkisx0aa93w8zrspiqhszl6r4hbsoj9in5bg7amkgjdyq33tak0lksnkmah10pbpi1stpfommslx4mk6pzpmjrw72azzc7xxq1p7iyslfj66sduvallpfhfvgo4kg8bs15pzql9mtf6yxnzxj5mju97s7nmuvvej0ym106dvek5np9y6l696d7kektssuajhkmurr8kgz41hm12i1hzo7jjjmgcsdz0tzcmbfd0spcpcreonvcosi91otadm7yy5hyqfi0va5bnkueco84d57rkftn08yy3eiq943hbi1pq0wchi30lgrveduv7jc0sxkcqq2vxvwpaklpq3shh3uxg3cn50oty84xeco7c27mbcxvmd90vv6jg9mlmqamk235allm7k0he8zabykkyinrapbf7ihasz5budz6kkwrzbfkwi4xlfok2pl8pk7sifma264kxgwf1a07oiq5s6y2gw3ecgh5zw7516o7cyuijkvw4lyectidn1o4ep3rdbv6mju460qmfi1d4kijf6mpnoyu377ms2vzzrf5ou7ujplnmil6dkfrr8n94py96hcwlephg3l7935v13szop8zlpd4mve09tcf9a5sgvg54en35lrzo4psbyhl3stiognso99qwpndarbl167131x11347pki664kdwn0t9ddvc9pu8dnief01g0b49pm6oyqlnh56rvq6cf02i8rswr1036c8eu5phlsuew3mcl0z9qlrcj7q2lk04b6osk2geclr1vfzvol5weg3xthmz1oukodaey9hy6keb487pb59cgy4osdmm8ivq9oo1ohv6hkg57fcrjp98jtr92ugn35nkh3k085byye',
                sort: 515449,
                administrativeAreaLevel1: 'pt77t5tnf6kxx5736l4pnx4ot6e4iv6nmo91smxdlfx8ibl71z',
                administrativeAreaLevel2: 'bkjnseg7ppt5lzj2x4oyez2689n36ncuhf9uydw0pnf61fh522',
                administrativeAreaLevel3: 'd780wqevqbt07xdpp19unypswwdts1atzfah9fd4v0hecjavu0',
                administrativeAreas: {"foo":"ywu>TH-,U>","bar":26600,"bike":51777,"a":"1yGe`39vL4","b":"\\ZE$./n/3z","name":60093,"prop":"hm;P-=TuF>"},
                latitude: 47300595395096920,
                longitude: 29403573885305910,
                zoom: 42,
                dataLang: {"foo":65821,"bar":"+]L&I^2B/I","bike":"($N:WB\"+[)","a":29648,"b":18769,"name":"O3u|dB7}tK","prop":"YwA{2r\"^V^"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fddfda05-5440-46ee-ac98-3a85952c7729',
                commonId: '228cbf65-3210-44e9-964e-2033a3639b52',
                langId: '674ce805-08c2-44aa-9e8f-faba1804142b',
                iso3166Alpha3: '32u',
                iso3166Numeric: 'e6k',
                customCode: 'r9fiy8o6id',
                prefix: 'yheq0',
                name: 'd3m8atmmwdlxdapbd1fzdyst4c0z61dp185pps4lddyvnkowywcrwm46iwof05nensw7q58hb89yew577bz6kwgndgsltr9f617ynp7ozfoifylyjp13xmog085w4i4ktodvohcoxhn9sjjdcpgljnpx69dlrn8tvbg4vlahgiock1uv856re2u56f8r0hozxp7ze1isfnzovydj7ysdzni9f9x2vm5oir3de085ozc8vm2w2oran3jui3lgef8',
                slug: 'w5dia884lw9dlgwgi8zuxm867qmv1tmrkcunyjv5leons8zw7bp68vy089v7jg79j19oz4bpqi75gh3a1brs3a0nsbbil5tvpssb70m07244y3n2wu0257gcmdr5umtdh3jce64n576gwgf5i5r1v4pdkr3bcve0kpot3lzfdsopnbb9779th83064kn8ouqck6t4z0lj9qq8vytqeegu3jh1rqn3awnn0bflax7ndxexdsrk5uwsygctff92qmlmcl11jb9fa7i7wsgqj0i5c7jsbr8a0hfnnqzhz9xrjp6228dsghs6rdp48z110b4v8po54qanu38jaer9eyb1nmy8ly7fet9vfuur6zkscdmcj0sizd79zdfvejotxifmwutt5yis8e6upv5jkgc1jnlfcpi4gh9xf59loypomtqipm2r60fj0zrbggjref5qxpacao1bx9tyjvqnsh0ct5pf56j5o9oo4ibcr6wtn3d4tsek8bwgxxqs3wk51vnl4eoza52r3wltc32tni88lkw1625vr7jck3lx9ouofsnnm4y8bquwfa8m1fr0ykzemvua1uieo5s8d0semxm3o3l5sd2qp4vgn8637l0kpwgy2hm3zgieym7t2fe6eglslb2b2nph0fhk738d1rf8ij0mcqxxgpys4lqkb1j60zy5mjc3beucc359h91c60rssxz2ik9s8wbtkqfp4vz2lqdafpaqhsexpr26ydutzyul6la9vhqs1hlx49dzvqb6ejeljf7uiic77qmhmqiqk1frul6ha7wksk17mg8xjkzheho820mu8fmxjygdsjulk8mgqquj8g72b880hexis5hrcnvc2tvlssx92wrfbhoi674011hu1mpy1plg21sncgm586pnzanqdlxe7qxbvzmdg0le8ewxfm6b4f5fjqm6njtihn5dwe55xugvgqsmilrfx6ken794bbykgpe84otrk5y03tzsrrbnlx0j6ojqqq0ui5g06uy9i89xnpz',
                image: 'dgvelfppbtvrczw41czbv8ttfdg2x4pcf4s5euep1nr9vz8kmcsxif148q92xg459iepjnats9f91ro7pjubqyhw531st1axn3xdfuryx336fsoviz4wswrmfzuamqeskzaz4ifmu4wffxzwj9ws04mq0apnza67l7i964vpe39l15rhv3g9tkw21b34xngww61659rydzuqos6g5v2x88up7fwv2jckib20myiq91o4l3uleze5kit7ljde88jdkbho4adtkwkuui7sjakqye0s4wqdqxbyvi5x4r5dz5952oz1nmauvoo4wyddpd566zt8t6gern00s7h638u9tctr50j4oga4dzw4goj5b3f3bhx9kfplkt8p9qn5uz7wpo4kx7pijupsndlykkm81r88bekx2r521qu4fyppcoznrhy6ycy3vm4jy0h77lqezmchgqewj0f5nmyvlmqqjfku0sy1x1uk0l1160bmhjmedpkbwgkw8llcbn1tf001ubx2ltbgnwkatufyrct8nsqzvbaqgfmt24m7ueus2nsauqbtapy4p3y28tnppmde2yf64wcynfkx2ixkgl6j0w8xdgr8v1z750ueg7n8i7m2v9q1j49634vc2gtk4na45ho7acjzd70kswskckd8pjeejpu9azma89xqlv7fvindtiu4nb49pmcv8ui72ku0w1mukhord8mi2bkj2s7xia1qx6ir7v6b3ghcte2n3n706a5yi3grkgor05yxnnhmvby22anp63ggarces684hsl9h7xt1n4msm18ay42wz2aasbznctzfec7d0qjbzupb1owsv1q4v3alwjdwf85by2w1j1i1vazlj0unsqtcltf0hvavffufyqenck4njf86tcx68oka0y7809ygdj95f3euf3e9ezi8xqm64m8jz18v02o9lg9bhc454z66sfc6emi9hwpu8rd6ojpff43jqyhcdcwdut460xf1wwl1w8aupy66vk56qgep35gufn7',
                sort: 464162,
                administrativeAreaLevel1: '3mknb30nq8oy234wrus12og2pavu9vmlcdhkc4ol0ljzlpetqo',
                administrativeAreaLevel2: '7nn3r1smemo8e8u837epcu5jc2om4yc7369v988ty6dk05pqea',
                administrativeAreaLevel3: 'hakgz53k9o74q6c2wi4o6is1i9ii2huzn28fbneb7zd7niwtq5',
                administrativeAreas: {"foo":"T*j7[+K62j","bar":83063,"bike":79633,"a":52580,"b":78439,"name":"lo@]&$s+.'","prop":"^WbDVbOOJH"},
                latitude: 31805812320920710,
                longitude: 61365008539606350,
                zoom: 41,
                dataLang: {"foo":84021,"bar":8150,"bike":2439,"a":96321,"b":"O,`[qkGpU^","name":"}eJ2r]l@_P","prop":4995},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8bc9419d-9502-485a-afa7-7ce27454e0bb',
                commonId: 'b703baed-54b4-4bae-b818-c957954314a1',
                langId: '13502cd6-4ae7-4a74-a8fa-70fd431feeb5',
                iso3166Alpha2: 'br',
                iso3166Numeric: 'k7u',
                customCode: 'lovyngzywc',
                prefix: '3ql0m',
                name: '58ud1u7en4ddl5wbr2umrgj7n43vs4gacpdnv5dh5lhnlbsjroyv97shwcxaapkeqs23me7zs81o6y9ntg18lstllc4a7e969zxe8bhirrifup9ucr6136pctm1gwfnjuo6qc51sg1mcksco5hibgomsdrci6z6y1t7zil5chvs2kzrod67bd3q1jv6cunai3rjd0aqtektyy3liaowtg5hzoz4qmej9r0w6jdic5ovag8242tcezk33tqj4r9l',
                slug: 'pm9u7ejtoksk1th7cix5ss5xgwmpihz1e6mzex8nl70eb4i5kjmasvqijqnpn90hz6roh89q20hfkb5cvu7kovfttzg3d44s9s0ndzmmtnc20w1x0uclgkrtmlfdxfjrnsnmidq3v3wsxilv2j9tqavhcynzfjqmh3p9ex1jkkh8n99emv1h4q1ofzhf3ysm52iu2qipep4a7jm9apfperdis7ch2reue6j9erq2p0mqwlqqe0b0mb4hbcbk9aiwyilgpe7dazclzi361z5nmkliwt7wx01hgyt4n67k7meec77ml9d6jmubxb92rwzv8qhqu5n9xfml6yiowg1ga70r7gcpoi6n869091fzo6imyib0uray8r5qxvuu3qptgguohqobvg2twdm3anfplq1wfhg8a0jjn3wwqlor2lyp3u3ls5rz3bhbzl6njuhk8jstpw6erkk9w0uvhki0z7ibrejeyo7xormr5kr5mnx3q51f8sagi0civs0owsnxp8uzv18xgg4b95i7lsbtykifxua6c9x8tz8dqg76b96wd6l569kb77u9ytzaiy19oy8jeetuu6kbrftz09up8qmfpoocz0s0dqoxpzus506ys2uwbkoqw5ieipzi6kyxru1ckrzkaofc610ekjpfg80axzjy0s1exaz1z6m1ifmwlbl7eitjzeez83u8u4afcmzxl4dnhlpk7evhnnhq7xy7ad9kiu22bzvttj97eia1lip3aqkoulqz5c2toysx1x7h8ukmtkk8pbckgf3m5nv4wp1kre9urlsvebwj23ophrqn8ah1ejump1p2u5s8jmia3nhgwezp8oh8szcuj7rug8huybpy18tqbio0846s0ys7tsyvou7swkwwdvhjk1ss20cqt779wxtddwf2x4y6r139inbeqamvdy9037wwygrxwq93mw0w2o2byprmhx91nvvo8g93s4vi8wv9j4dmrx4azjd7tcrith9qb98nrzfd8z8hdwxsck3ejs1w',
                image: 'ea87dgjimtiqz380px3wikl7xkmiaprjzz6kyo2shlrpw2c0vne1v3vemgsfuzu4fkq61oedic336sawfl854tzqha46camcuc0607ywivdp9xokog0unpckj8a78hejpyezr0ai6fa77su06cxxatit412uvaozkhii2rnn2glwbbbuype8bdgo3qo8s6mtkp5jp4tmo4s387htyh40sf29por3us4wg7xu90gbt8ab1puxctygv277vulvt4j74u6498cq1eklshrgp6u3dvhuug5y6q830j7jhamyro2l4gpfw55djjuxxnxv5z476k4x86ls34oqxmtx0gwhef27hhc4gpcm7lxocgvudj7y9afdngkcomh9a9gku5b2wj84t3rxyloj9q16rp9p3zd4nf6eong2vxshocl7mwscvcwn2ba4ltln1nxn36lzufijlbp625bfpq398er77bieqluwz9o9jnwnyymlnt195cklw2wv2ez89ya91rofpuldfuk5f1juz93qnnb0df9m4n0vemfi74ujak6j2o7uicgz99g2i3t31t74kgvenfou0elqe96p03mxy3ih85cussarnt1mrgd1m9ju3lrv4wog8fna6blof67o8e6gus6smjoqlhqfcdougi99pkh47mm1zrbtx482lqkjkpc065l7l7okv5wvq5npgfe6jhlecyk3dehmhz06ihettz34cm732cu1bhdkrnv48b1gwvp78qsnnrl8ims0lp2yjr5mo8f5v9gxup6goo5l7djs3x7peeih5wr36cq6of95lepm59qzbjfvkvamfs8f3m3cgq1i3liuh4bozko4ndzyfcpnlh0l3ym5pye64ymn2ze2tinyhn0hh4vbq02gw2t1drofanfty8ap4yoh7fvdlwc5z4rz1a3h5iho8nam2qeb65ykdg84pn4gudfdgrzejb1dpztnny1qa8g62xm9mhqx246jjo5c0s9630da32l1m6nnurg775uypcdu',
                sort: 994813,
                administrativeAreaLevel1: '8ggkdd1uf20fonjajynlrf41ek8zh8gl9rgydsqhim3mx6je5p',
                administrativeAreaLevel2: '572om5cpvycx5i2reo86mr1lzwawbpwgwrkjsheydj0jimb2gi',
                administrativeAreaLevel3: '61fnvn3jxajxcr12w88muoet9yiq26ll6cmrrfzyb965srrjvv',
                administrativeAreas: {"foo":"/YZvh!CwTz","bar":49363,"bike":15177,"a":40490,"b":"C5%L.H)1n=","name":"@5yE%`>/_X","prop":44816},
                latitude: 63145013373472730,
                longitude: 50124352553307096,
                zoom: 52,
                dataLang: {"foo":62666,"bar":"5!-?crLgDd","bike":72922,"a":31913,"b":76208,"name":83598,"prop":67181},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd7c5677e-43c5-4955-ba79-547c451664d9',
                commonId: '0f101d45-b359-4052-82d5-8f763156f09d',
                langId: '3c9b5f6e-3de0-410e-a577-e6e9f1639228',
                iso3166Alpha2: '7m',
                iso3166Alpha3: 'lg7',
                customCode: '0i78nvkzqg',
                prefix: 'rfnyt',
                name: 'q4ba9yo4962ohhuvaz5yickwdtzelpzvg0rres7e6s025jvsco8qn7q7ikljyng6zw4fnujo1dm75zecjxxiq0hobp0u45t5k1zakwp0g3uxumazvj7buarq27n2i4mlkb1ov92pjvy9bqx2w2whn97qw9vf2n94bs94chqpcvhbncxqlb6k4wz36b0mcnrbk1g9rl08yjxge4wd5ln36pq36fpdl2l4hiu2pot65fjqq5drx5w74w7ckoqbmna',
                slug: 'lo7g2yefcsfavwha7ly37xssdg3s04t9j26ptu482af7uzb8ncnbw5jlmlz5fbrt3en7u1ol3am8iikduya788jgjw19iptv7qaluam1qaz5q2k8r2gy21ddv5w1octx5a2u8qmdk81lqfriv2d13dmbulj5gexrdtiqmh8t6kr6tnzbcj9az7to7zmkjn543i3wm66ax0xdi8kjioc419inzuh6aay56fjlfiufu6yo6c21jqtuhdisr8hlzy0s2hi9zz8wjn9s51p692fq6vvi96gx24d1qb4eg6uuum6u91cgv1e611s7hwdef840o48lvi3espo8n2u2kekdrc8pjloq8xy7243hbw9ukez6v2by5ucs9y15bnxgupmhgzzwnodhgicculynzrfpq1cwfpbef4usohwl5oej05a9msb7y7dz1vtnulr48og0kiz8ji32gc21ea0530eye8tw0va2jr3rlbhdyizeh3pbjknngjqmsz493v1doe5priquy5z1jzg7dfra65z92o8mx1bih2bwfhl2r3us8gl3od0dp5zu0v7goh121midgxwpz66jcnlc4ty0tse3t1hcjjsr4v9t4qy8jmk1piwlj5urqsnv3d764l8n4b5jowd3lprcnt2ebwkqbsadn86fggkbbk3hl66lgb4zjvk2rho8sfwy9p7ws51c0p0nbuj81ikpfvch6s27kd9rwciy1u96lnqy23b5ns9c61wl5vokqfbv3nq8szsfcm48ho2jzw8y1lh5k1qcomckapbz5j21tbgxpbrr3pi0g7ocrjymmcl0x3kumiote4acbpa1cz9lhkyvhukfp893aiyiac45hz3f96mdqn6kzhw39huk6nio6j7o0pj4smuw8xl25m11trx8vtu8m3d1c1i170t10qkyaqbskpn8wo068qfsp7yfk0nnn2n2n3rqqntwgdvm2lgghhjsd53yallaoxtz5gqdpfx6cthsmrhpgybesgoz0mrwugkxyjbh',
                image: 'hx18vwz40u430g54v4l0s60qfkbydz7r3pzbapguxovs2gb8l0jrl98jl90vx9nmmvbnfvvkzlpxkpyw7czkhth7vb77uiejai1b6c7qknd34vcpyw8i884ft153s6srng5gviy2ihj53zcd55w20zj7fwvkx0jjfkshgtr11ncyawgo3762veuxbybppths3hvi68ou56dr0oyc0bhkpxl87mg5j6ts6uw5kubpgihq6j38vjcws5msskco9e087472eg1wsdi42x2uq1x4z9f3tw4blb4oei9ym5o7i4mafznf50eq8cfijwhuhxx97rek7yske3da5lvmh1kzckik6nb1k4ozru38z624z6yotwdx1t0w9rgtoflj1097jp3hn1tpciuxi1e68sbss22rgypvrafz6dl4oqarglu9egsaw6lrw54zy81bsxxo46fb11re9bf39jncr5yudpjqw51v5ze6u5icx4p173j3m6nbtodsg1i8ad2fs69fd2j347m3uuzrbfip8f9rnpiwzsm23cu6wz54cwtv0f2qzsh6c0aakor29kn465gnfo52h7s9ww8ehzxlzszawg8zh0xgfdx19j5vuthgcchqbhxs8tx9iwyrvg1rpmlx9rkxyf67sjt6hx1awirnbvrhzp51glyeqc4s6f1o6bw3729f6vvsa1ek947vnq4i8kpchs117sbq98c9j852tqxzlcu1crnn2cwfs3h7qtdg19t1yfsitbnau4bng6w1xk14gsduy1eh3t53vjttp4gj87p0bxkir3c02aav60qku110mop6ypbl48s31smszr292h8qjz5qojeb17d8el21h90fcdb1y9wcqefdrgqv0mc06jzfm9hp8gz9wuev8pwba1xape7kw4no1dksbc17mo8kypf84cqgbkm1tno1nbmzeawmlx2veiqdmc5w0ofwppjtuh3lz1x89qf3eflh84oi8fpfpu9adr33screg0qzcqg6x1y4y58c3xwn',
                sort: 114103,
                administrativeAreaLevel1: '0uvyf5z7qxw1btnpialr8pswduwj8pyxyz4hq8rav442f8dv5f',
                administrativeAreaLevel2: 'qhs2ft25jsuftlb80ir8qdm2jbr5q6gd72livx4196nmywp7t5',
                administrativeAreaLevel3: 'wfqjn2oxv8ligvy4pt1sdjrksvu19xe0xrf0ndes45i73tf9ek',
                administrativeAreas: {"foo":88064,"bar":"D(|Xuvq.>.","bike":87140,"a":8211,"b":"j*E=B!VOue","name":76012,"prop":"mW5\"'w+}cj"},
                latitude: 13193679024868788,
                longitude: 64278271584920060,
                zoom: 17,
                dataLang: {"foo":"%k}C2vvl:,","bar":69622,"bike":10195,"a":90896,"b":76172,"name":98885,"prop":"n*Y:8#g!RE"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9c94dd70-5e0a-4f5c-b667-d2fcaf23760d',
                commonId: '3ab8ba25-c086-433c-bcd0-53d88e8d7644',
                langId: '7c61af30-ec92-49ef-aed3-52c6291abab2',
                iso3166Alpha2: '2g',
                iso3166Alpha3: 'byw',
                iso3166Numeric: 'cx9',
                customCode: 'bq2um93y1v',
                prefix: '2bdhp',
                slug: 'ar7ayr2p3omyvfsr1ocy7k3savu0ryovcsfnf1pxb7ew167903s258sanl52ijkj65fgpfpdl5knik1r709ys0dzq5xpfqt65mk9s7jdea9gnyusz8qapbxhbwzgcdyjyh1t1om21x42teph67r7iulrtbrjnbn0vuhzz781pqb5jabrnrtwlo1cc3m9dj0xjg56uh3rwfulhbgdl1giq7jso0q19cjafbud997jmch5fkc2c870izw2uctbll187vhyy7s61lrgsvadfnyp4ve7er75i3yesquov3xqluha163x8l1jgpsfgpoc3ruuhmigdclvk8irzk784adtds10tomtgs1p32fjqbhlzwczcofp6ulay0qi6v9bk68m60j8qqtnl364efiwpu7o6k7crip2hpvlzdlqfuw7vv56inguvukckx7628oasurgz7lzrcwbmbwwqxbilx5oo4tbkxcl9px1anpxp63qutchkqit5kvc4pczb4y0tskw8fooup689acg46cqh4zr0upfdcqphjcysbp6f2xmy3r20as38zuacoig6vkpqn7k1v8wjsbr3qbpkw4bezmaaj8aehdduzzwp3huougumovirdg9ruugd2wxgmnu0tc3shrk5u789xmig4uxvzk813k61nlit2ornspbfuke6rgrzt4c2a89aitzk3unme036ushtmqkycl5ic6pv66c2duzm1b0f9okijyua2psk5tnh69kkcztcrrar57s6hz6afu4m4bk3sk34h5ewixm72gl0rj2z9p4tw3an0yeoeizd2ueebbttyp5uu83ry71ry4z5jzvwmofogjolnlko4ko9gbq99n1ikznixhgxqasw6yvdpiz7g7sy954tv8uqb1pztqc7c6untycqh3a4mgwpwnpigwzhdgjysod0ol2xn1l8lg2z5cze0pjekwd43ludvw8wqe0hih2nvlyun5m4ytkcz16sa3veb90cti62uh5s9toupz24vsoy2lz',
                image: '5j40qkszccy4mkcoozfsw4n3n07zjbfb1chq7uurzwbc3ugawu6dfbkiw2x470nh1ol89r1oxngw362kssdv7rjf8qir3d2cdvkcm9d2v0jnkevl2mrcsnpe81xck7asnw0t8l3jgy1f9wr07f2urx7q2rt5pxy97gn9rspbk8pwcgcigppt57jwlzep6xezvr2nurlow5fsfxu3dqcdoroc4t6l6kwyzw12sfb1wjkwl2r8c3fyt4wh28tcvmjepil2ix9j13ypekbvbgk0cyv571mk8ajjbmmj90xbflv2o5kniar1sl2jc3zl8p4qzj1eisuwezy6u3vlitc57t6im7io4g0xgodd435afdahlb7ed3nq56zvx59t1wrgnkwvuonkq0jpllz7q12i37y8vwtponl4kcxpihkmgwhqndh2ybtaxm7b5nf25izknp02t64dwjhdbd7ijwcfvkp87w5k10d21mkia99ht73w728g6mi8cp94f0c87tow553yb0qybjmnobnkgzdvnb6kcdg28l0cxb35gk4mw46str58qb9qjr6rylasnph8n63h0qorbvmx888pwuyc0fevecenvfcla7mhlvbxf886ru10ya7arh11c4d5tbs5422gjtyyj32qsdipucmevtb2swf4hsqdxzzxncr91uj7k60l3yk1zjwkuwptcvofx05lp80twz8rhrf5xfnq8vuk4swunvvk4iu6ekiiidxa32ew4ywf0pq767wekwbv406bgjspokozxyygr2ll1cn08av8ushzwotgzkw2dv08vndcqpelde31h9gq1snmwgytqj2rmxwmfgejyholkagfz647bf7vtfs9p58q956hbypd6a37i4s45kz3ijfhqeyn5nmu2krug0r3f6v62e8m94vuw32gmodz9mh2bqefbahja3e1joqg0yijfpmf5bvzqjtg87w2lks27wzzmn3gm4jxdu06q9s77knwzch1f1j4clsttrtsok6ol4i6',
                sort: 748543,
                administrativeAreaLevel1: 'n3e1ah95bxst7ajkg3cyrbg9k153zix8r8bec1heiaatphio5r',
                administrativeAreaLevel2: 'yzcdlu46o5ulrik12s3s5xbccb3n9yc7z32kkwggqgzx7m068g',
                administrativeAreaLevel3: 'tpypjub2hquu5n4tvohvj6hdqte62owjkndjn3lmgu7ghd90eb',
                administrativeAreas: {"foo":".]iuQ{J?`3","bar":"Q1WaIEI.$\\","bike":15250,"a":6890,"b":"b!YXm#[Mp]","name":52160,"prop":7208},
                latitude: 30075053348484772,
                longitude: 62527148371485050,
                zoom: 55,
                dataLang: {"foo":52508,"bar":69031,"bike":59959,"a":"pWr8m5A5#{","b":"'6FZRd^q?-","name":64751,"prop":"k'U_#4mXV#"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '29ddef19-83e9-405c-9721-199112add2e5',
                commonId: '784b4be8-b9a2-4cca-9e54-769b8f3be244',
                langId: '9f3453b8-008d-47a8-90a2-5a7df231e243',
                iso3166Alpha2: 'eb',
                iso3166Alpha3: '7wp',
                iso3166Numeric: 'dd6',
                customCode: 'l73zn0k2kq',
                prefix: 'i1rt0',
                name: '5tzkv6wjszkm5kb0kdzfnm0e7xjwnq1euucgmszg9i6urzx7cp1ad0gokmgr969lof6icwei6rsobu43u8js71x2v4yhnfiwaepywkp23beiqlszx8jmzyzuqsumuestnt75qt3nu8fmnow04mgsrltzu4gl8xde37kip3waa2f79bwvhnq2cxssaactv8r30kvf29o79e9z7drv8yig108og915hcopl3nage7oqr3v0ot1w6tlwft3fq8859d',
                image: 'gfchqcf6hichqgtrz1qa8g5ccmrriq215s4c9ri4osissq3l996j8gfrho88n3pm0azuu61pfpgxxa8ye0zftzeey59tl2rllygg1n6zof6j8pr6zi5ckrxzlm2i546cqfuh4ao8xbze962ejige858h5gdozmcneyefeud1iubh8b6ul0ttbnmsq6cj8127bisgy2j2aw38f9qlu4cgwnwdf9l4184hsbcn0xb782r1wqmnbe2uwaz40bbipnmybr1ct1cizwvdb7g1illhxzuyz31edo4sodqciaof545kzq1rudxgipakfpq0irzlhfj8bh6qtu0a3ufgxl86bo57j3j7uui0wl2cnq9iuchc87h2ndibcdfo3w0rk1csadeltto6bv926gbg346cwdnmdim8re9ujyf29i49lkvvf5v7swjqtcixcg01a5dgixc716z9egaqg3wy8f6ro43e3frnavr4ik770asa4916usdrdk1wvyraz9w44obvc07qinnumulsikebva0x1r8e2f7r0zv668szfklxxr952ayclb7c96wz9au3hkua7cyz6hiuni2e1rqq1wd3pf2jym8ce9s82gti7vqrmoe9ndisg860xbvwweatl0p0zutyi5evomltt27w98e81om2k8neft95txcsqmnlq0jdkoiw0861x6wxjoo3gj6or1hyszudmhh8fljig4sq3ihfjpv9n0h4efyusk0g4n5w7tm79zxxetdrglkbpvg1hivy8nhm5cfnsqoio0jn0owpjrj8ihig6k5jx8r03g5hmxmlm1rx8wchk5dk0ebi2pf1tp4d7gpatu7ibtz5fop7kvh01byvq2z6nfvgsudtcld36xr2rumjq6auweelo8csprdsn4wvk35yj13gs2iyt9xw9utba616xtu7h71ey0el4oxrdjbmy3c7rlomjxjde0i31oeipvm1p3hoofss92ynlxs6y0hjm0tdfdix26wd2f102j22akf3o54x',
                sort: 589520,
                administrativeAreaLevel1: 'dh9ytdfz3kw9rrpkdizf2zfrbs6wwnd1b5j2gso3wkdsmofet1',
                administrativeAreaLevel2: '4c4hpcw3o0iotepxgv3me8lwmmqhfy1gkfwgclog8ohnnzdxzs',
                administrativeAreaLevel3: 'q5pfdgy01xn67ycju61clml7md8b14wdpexlwk8r4dbpup4nh8',
                administrativeAreas: {"foo":63099,"bar":25485,"bike":28607,"a":"avH<Ud$X\\q","b":"MW(Xe}_P,A","name":59030,"prop":7296},
                latitude: 81765074670564820,
                longitude: 81139312942853700,
                zoom: 11,
                dataLang: {"foo":"&q:^-e7H6>","bar":"%4E*?r^*YS","bike":"kE-1V\\i8mn","a":":C]Kzc{Kjr","b":38634,"name":40670,"prop":"H=jt+ob#,M"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'nnzoulnuy45lqv1c7e9kwj151l7307eit5ggf',
                commonId: '8ba35256-9bf8-46d9-8e06-e6d4a3ea9682',
                langId: 'b56402d2-6191-4f4b-8c77-2fc69bd24617',
                iso3166Alpha2: 'rq',
                iso3166Alpha3: '737',
                iso3166Numeric: 'tk8',
                customCode: '5suxty3uhv',
                prefix: '8ymm2',
                name: 'qaifgczh3lbn4um7k7m5fnctsack9q474bggn4yulrs14krs95xk5qcg6l2dtqnmxq52x1iygb1eb5n0t5r9fctupg35fnpbg3uqbt6yrvil95cayso6btejvftigem7r7letbpc5uacy9cpjhof7kbwvspqqvzp5384whio98wsu20kowy1kwmhf1dcopgdwu123htfhwwnd6u8u1hk5248dnt72g156i3uldja90oo4bin63xtyc3i5bmw7yq',
                slug: 'auygwpchat3bsarah0a7vbj0a958nwix4s1avie134hw0bvmf9cov38mq6iedm2hkw6wn16gmzgziadhuonsno0jtkgcinius5rgn9p2637kcibn3e1m942a8ohl0je81act8x8rp8jgr2nxhbefsrgl5kgjia7n6pzj5un99alz53zfu8ybt6pq46sf6h2088wdvfi3ss71z0kjwwl6srmx73216k7f9js2flnqsc4l6snyzfl0gqc4nlh96zl4e8gi5ivtgvwxy6vrci9lepvx8rf90nlhxu2zrkw8twc7dger9735ju5kcyqt7ii2rtzlr327vczh7iscvtvcxtj56jppzs08mbelbnexbpxf5j9ysqlm397fw6nglsipaf07kyni4d1pndxosflzea24g9r8h3cslk7gmcs9l6rigg18523q2zb5rsv2uem00d6c33r3wmfzt4t89mzxvu5n7e7xxtvn6ryv5gut53boej3hqdd5hcw7chnx6iv1txjhnak91cp29guy1fbphbqyyi8diemtusq730uaaeaeesus1zdsk1rz7h3w1me8sml16wk8h92j54xa2d5fd9ipcl6wvjeggcd5wd1bjv3csvc224ny71ajruvcy0fhwsuv1rdfk31zzd6iczqh6abbuqq75gzopd37ikci477dbpib2ow5mmcdlup93la52c90drvaig6e4c6gbf1dug4np23mmtkp19sffac8rarh9r51mxubqxulrfcdmknih2fudq7q26wzc8ftrlocrhhjn6625vz09iy5p2wt5ceo8rjwrw03m4vl2otiyz5rej8e75j3hy847uwdsvs3k5ieoga9rkyakutj0auf4nwrbk3gl1nnu1u14xbbsow8c5gph86e0i5av6ttq3rq2kztoeer6oq6n5hw24s7f1qjf9oejyrggy9nuud1jukx7dblmk1cgfsangp3a9mic2c1ab0gnstv0ej8uhxsxbam6svytzsh3rom7z2sflj4',
                image: 'ju7r7ds82uq9honej016i2hfktv6j2r0dupuir2wk93svww5oohhduw2e5jsqz4tmau0evgvpjjxm4jv9qiqs7cvfuc8vu3n6sqzer5ddjqjlvj4st8yije5d23hlfj2nu4nwae1nlvx0ympmhor35ky8fmm6n1ckq94yksqvm0gj6yjixdyicmxxi7vmbsk7pn500n2ianay3d79wtq1rub9lpj75bobytaeyk6pukwsr1mkptfp0ftgqh3hpl8a2v0yzubltxkt4n5y1oqlpj11qlr48h2w7bi2t9ah0l49mkvosifz1lfizlfqksyxcgasq7m064p579k6tk41v99g1tffi20me5874ys2hsi81tps9kn4i1hfj8bk9bsj8cv9mkwy2tn2ee46ig879rk6sksvrncwxknu8jwxsfi98kqa2c049zjudne9eushxkroasl6eon1rezhxf6fa7c9kgzgbyvcu52nsmtrx562hy3gcdqtu99rp0l01tqc5ql2fgtpjizger852jkzte8c26lw7t8pty18lv0lhltv819gyje0aafj07vx9k4qk2e6tiesuhxkuo1vnhrkmf392ejsxxu8r2u3dbbv8mgu0v1in8vc72skkvyjapzu2x66mqt8ewbh7pforxo1oguqszak63kn3r5fh0ywfa2kwe48cf0y52gxl1a8j60ze1kj9lic9j5bc8j1w9x5l2peh8w9lj7cypzgfcx92tpkmw7i2clxu7usiaevzl98d85oun2xxp63qqxg19pla6mn8lfvf6wx6nb3v5vkj7vsvrw7q8sm5l9zumhyun55z287afrxcciu24mtf7oa70ttjzgoq0pr7nqpqex6uaqiif0v9r7m8k2v4e6cj3hu0sdqhanw996z01l3fl3851f0ob5cs32xoyc84l3zbsu1p50d9stncb8yynljqxfoxrdwjciumqp6grqxqn0auoobcdhkcam6pqtrgh5g5fwu2vm23a8ldi2itjfcohi',
                sort: 776342,
                administrativeAreaLevel1: '48oyam2ghqenuwuifx805b9c80rk9v109mn1au0elwkygc364y',
                administrativeAreaLevel2: 'ot45opspd98lybo3c2gdowqmt79yr7krco3z7ckoj0ooqxu3k9',
                administrativeAreaLevel3: '8bw7wa03m2uj1pwsddbsjzkhu0xiznzo6lzmqrwvmo79uvtv53',
                administrativeAreas: {"foo":99307,"bar":42112,"bike":"JEq'1ohCaf","a":"tc&ijjhg@A","b":84867,"name":"u#>):X<Za\\","prop":"J}Wcz0|OR^"},
                latitude: 58370209569093230,
                longitude: 29922509176026500,
                zoom: 93,
                dataLang: {"foo":39497,"bar":"QDZC@:Rz)8","bike":"U8MxL@?Tbb","a":97057,"b":56744,"name":41849,"prop":"L:)z`|?&*%"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '951163f6-ce7c-47b7-adb6-e13204413d35',
                commonId: 'yek6zui5ybvkois4nqhjr4aquxq9feg09arm6',
                langId: '13273a77-fa63-4805-b08d-2be05b8d4a46',
                iso3166Alpha2: '70',
                iso3166Alpha3: 'oku',
                iso3166Numeric: '2cv',
                customCode: 'nqf9at5vrc',
                prefix: 'rf07k',
                name: 'y9m59qvst6vghpzyaz2w6bczi2mqn9jjknxg20n2b76z7kxs2ccse74kz3l8fjvouq5u6iqrx5k7dhowpaf7uixbabeke59v3myk686g9ryyjcaqx05im3axudpqm1dhp5s11dvo9ju3mcjfs56xq9u3vr8idccmqipt0dxxlz05po3ycqkz9szcr71qh3gvh7hmosnwjn3mfgictfdavjpd0tihtz147ansav4midj5lw0m5htjvq7ab94zk0a',
                slug: 'w3j8ri89padrgjnnn14d5gyy85lvx1qmi85t3z285xmwgocpvwyp5u7e8o2cur2jgxn6g312c4huqe7o7fjqzzahtmay00p2dam1j673o857zwbagbdqxbnmobuo05rsy8uh4uk8rh9bohk4as8pnfs89myu46gaja1o0fe2890jo0neqvvzzhbx9xz41vh5stdql5udyhmyb8hm78d3smfcef3a3rbcg7igftdghlgfs4v4nej9bxo76v61r996gg713vhxpthyab47x5r9uw5wzef3vm0p59ypezq2ymfuqpicw6kfmv3rf9sw96fg14h8avr3u16e6kq80eexwj8oou2ytzvyqo34zftprdzsmqal4ykasnv06yvxitnugdhslvw6ria5duuj4lfwz5y6ieoa7j12ug7ms678kxt6jw9xn96ye2wiiqxcki19qmcqvqrfj2uf1agpkxqrya58seckty1hsvrotaxb6g7aehu9myqpwlemkh1mnwgp1zg5vdjcnha01u4mnumi063kbf8lb4yf3rtqct50lhpneiimnd2r6fv8cxzhljyrll5eob34kcjfwtmbg9t5hl33vy8bbd2dx79hjh9s4ff2rba00rlu3xwlcf6i9vqs53csec87y7oe2bb1ichiqgtbx3llaq289palhsrz3doyyrac3nznqgtqdic73u1kpt2mybjzvvte3zkvmc8guhdjks5ahrityzrlrr9i8zqr7k286q7iaicmmsn4kah9c8hne1xtyjz713olsm4dqv6arkpzdc4zqzyjyvmf1xi2ygsjdfvnn2y8sler3upizp70nqnnsd45vaiskr9oubdd9jamwvw8bghgkxr32d6hq6esoydsgefg13g2ba0efmcqdu900nfdj3bw6dm9jlk3oay0ew99tffud99aoxi1xlttgmq2klxvkewpembw1n6m6t0kf6ixof38coa3nalu5o43rakme3etuwp48wm9l0btty9gopar6w5mez45',
                image: 'wdajdv92agcxx3bhmzh3efvxcz2sqyha9098b4m101wglncws18r7bs0rdetfttqunpn0tygoi20h9pv5x1c2l6nqt1mkkmqbglkmqddg55io5j4ixzbksfqgi5n59gl7ve5eob1pa6yp21k0tyihrfnh5gq3njej3df2b5s170tpbyeubf25wdhnr60ye6jr5f1b5axh4ql35sg4w2v00qq4zlfdph2j1w4108zi1sgoo39e20lsf51diis6zijrcbsg0m6foz3mca3lvc3gdq2umohtovov37kasymcl1dxu2qfu4bcazgyirm0o40gszi8kx3uw5lg02lf9j66cfeip6go9t8c3zormrg13s0xw1uvz9xckij9c6mwmcqww5zes06yuls5vvhii3boy8bmda2krgh8jif15ktidve0h5zhzp7kz7b5kwutnnul6l54spbab3np1ozxmgiggzgw2186wltok6pzy82n96zlrbvmlpwkl825hgcnzg5qwqm3v9wuxv2kl6s5skgq10o6ij39b00grd8hpwnyo2zl0lf11yt4627ir48ut3u2385qonbk5aenkcyjl8rbc7gdgigmgki0gpslda15jubgpg3mcbpxlok6s624skqv6lry6ywblu35n9qcn6ho0r693jt3iam0fuscre77ktypi0wnb615bxxtr661crrw46s4ud87127kcpopektdsn3kez192f1ixu4hoq1fg93v0041362dj8cd4suegtfd8r10xj82nuf20fy2joi22254un2lmj5oxxjimavr8xvq150nneurkl6145pci9w5m9u32rn90h6qgiv3tga88ae6eqkdghxdufod97j33a19e1y8mc9wpwj5ugh4ngk88cleot5n02q59sae5tznh0jl1jiad22e6pz0njwu1zxvp0migfv6evijfoatwj3cs2tx12plu4mgd6p9w59ixj77t5w1d4zglvegbosy67jm0bkvdl7ox19z0zs019i',
                sort: 987953,
                administrativeAreaLevel1: '7ho3t2u9hz1hxiab01sbbus5v5m14kg5vrlqmv1ytsqf7l6o2n',
                administrativeAreaLevel2: 'jkdxanfjxiam94xounqblf927912ff4v3cb0z0tp8af8fz58na',
                administrativeAreaLevel3: 'cln57au2zvs264xuqiq3c28t0yaaa65t07amctjgu8tf8zj2pr',
                administrativeAreas: {"foo":"k[NRp+x>zp","bar":"EG[vMB+BH,","bike":"a=kW(g^>z\\","a":47162,"b":"5uv;0|vgD?","name":"(>*=.KNRVg","prop":63950},
                latitude: 57402943781189370,
                longitude: 23694526265829176,
                zoom: 56,
                dataLang: {"foo":"o143NA*:;?","bar":59046,"bike":64205,"a":"`}[)W6S8f?","b":"yHzw_^@{^0","name":3657,"prop":"]N[.*S'SjC"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b282a5ae-2903-4ecf-8506-9aedbdab9fa9',
                commonId: 'c09eaab8-2f11-4fe8-8f7b-d0f56b99bf12',
                langId: 'cdwajs2p1ek36mid8x9w1btfv7nf9tl5jesah',
                iso3166Alpha2: 'w9',
                iso3166Alpha3: 'wc0',
                iso3166Numeric: '64r',
                customCode: 'ln3h438q10',
                prefix: '4vyui',
                name: '73rljpf58kmo3tr4p31sh0pafo6qfagwba7ww3qvf46zq1bssciv5l5xp10pal7e1be0i344orlnh5imk3a33kbqffa297v4knf4av2657cjxzqx32e6tlmqp0f7qczciaxjgsawxza7it8veg7959uek6f5ktfnrj2uyyjibvesrc0f7gqyb8vxtxoxe4mkgobwbu50pr7kq0yt3t4ij2zwzv0qoqd6ghd5fv5rp0yij4wzzxlyc8a503lhys8',
                slug: 's8i4nfdnjoeehlts8u74m9zw593ouxp36ru34x8riicg3n2q2j6mcvor3iq6tmpi41uv8449hcna5794jxcnmd48grult8iykayreqkz3tk940qd3bp4l8l6e9oiihy1rrttjyidkjpi7d08npdplm8qlrknhzz163w4vqrprv5ziwt9r8vj80uo7kf1qqyp49y7zcfb1esxa7ilsshv0es5gtlnuowvyq4us04icecipto56gqvhdkct96t1kum5j2030dga47uq50yrbb05cv9ceab85zp590euclwsjvftn0afgraqy8di11ixpc9j4422nk41uwa5fnu5vp7t9ubsgwcxpetn9qedhmi7ynx61lii6honyyeijr0lz9ze1ufhwzdn2n9tkw1dcmzn57wnc615yuw0gbkc1ii3mlozks17veso0rc2uxvl5zmljjnnw3ex6tidxpep6xd4mrdfnja98yxnn3izkhgnqne7m67yqvdkkmoasdk2hwx0sllzn73voz931y9jifmr2m4r4ll7b2be5ct6nqr8u7r0ap5yvm7g902lskyc4wihtu374hvht6txjt7mdehuob9m8ai2izazw6epmbb0sydilne2uiiup6gm9ort4prak0b8n4iwxvvuhe6s9eaq22mymio8v5nklb9iq9by7co5tu25xdcbpme83ed6eqygzl8oex9qsz6ym3eo5izo3rccu2u51kfj7s2nkcvguwbp8ceu2ybxc61h6efdjqzjn2uby4fhep2cwy7n02gqafursjme413cu9meydipz82trfngfffaolxpntidfqfspiiqfyj6cdgkd9c6wps3hkgr4l7k3j3u6w3u70qsqswy0xb1hsiz1yybeiycby9c95ufdfkwk2lnnuday8vqyek6a2m1jvwkb5nyj0snhiovfpz4yhfa7vooftlghebx5a1ftvlz71oou926ipnd5hh1uqnens7zkt6eoj1hr6e4jewgzlw4hcag26tjman',
                image: 'uc6y6wd3mreq298l9qajourch8ds878gzehqy0c90j4o9kuxt7mg0d02xcl5804rmzgmoc3hu94mnqdruo46ess79rcianugpvvgyklp381ajiaaszd3f18ze2qh1x7w7jbk3zuor7iqir6326ngmhlw32cdzz1ot054fl5g38yivzmhhzfb062xjox9r3ii2klrpp6a90o1vhd9zqkvnv5ok3sf9hkphve93mf4mzdmi04oej6lnwogr7r6ojuj7m3s3fr5703htee9ox66zmyocofnvys7lyyani90dns1hllr293i7gc3j3p69ocxigmmpcgu99xgkvjg39dw98jvv7uiu9b66e4rs9g29dzje46bkw6p8he9uqpfjq0c6aiyfyu6s7u2rxvmdf6j5fo9mfjunfsjaawdvyj280l3c5t2l7rn8duftybooy3prc05w5g14wwiwxrkpycoiyk1podu06xjwa489bt1wxlf1g5tzpklu9eg1q0j5l5yqwlkbkakbw27saz9e3dwc2nfuksgzkd4t47nmty40a04ep6f0jorhuy0166pbxu6te2k82jb1ljtygt9hl59tdgabxpv627aq20q3i5gjaepstw2yhzb4q68h2cb66ss4q14rvqrp13t4wleb35flqtxago5dlt8blzq321z5og9br9lccvavrumwa7bbyzvzop3nr388bs9o29y0poxk39lad99l1kl0z4wy8mednpoecnkrdrw0eb7fdv05cfuywyhu5c5pf9972rzypsyx2nbxf6qtiasckujfgd5j4aje9dfc8p42vkelvuopumo5lq0zmcixeoqv06h24s33s87oj8r2msqyv3vnm4y27ye3fut63gfypszleqg398zn3s3dc3esuneklb0tti8thtc8fqnm9m7ppvbbmpt79tzu01vwpv3aeusf5s47cg2d0lvge69k4uvlypmz84zxsgyn5wangxwkaonjimiu037jtahd3peiuparkv6xt88',
                sort: 488137,
                administrativeAreaLevel1: '45gw8b8095sco8pdkj8gzmzaswc1qehmoctg5jmgc431ursfad',
                administrativeAreaLevel2: 'xyq7cq831bgbnnk3k2w8zo4tj43d110o58brywh24howvyw5xz',
                administrativeAreaLevel3: '2loqawc6sj74jh2jl3g7meav2knio63wjeehhivui2vah3l3gs',
                administrativeAreas: {"foo":"vp$q+s?F3/","bar":"31x2|C2Jwy","bike":"hA9&_Ej%VW","a":44965,"b":85392,"name":"]v/-Sl+VJ`","prop":46724},
                latitude: 94268409207937970,
                longitude: 19828950665597200,
                zoom: 97,
                dataLang: {"foo":87639,"bar":"uJ|Y0.(o.Q","bike":26630,"a":"D%qwA?-&TF","b":63686,"name":"mVqi{y$nI)","prop":"3ye!D/dhrM"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 is not allowed, must be a length of 2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f302faf6-3890-4fb4-a70c-71ea26a461b6',
                commonId: '13f893ec-d9bf-4ffa-a78a-39dbfa3fbd93',
                langId: '0a8f1690-ac12-4b2e-a71e-acf3e158e7a3',
                iso3166Alpha2: 'sj6',
                iso3166Alpha3: '3d8',
                iso3166Numeric: 'jt8',
                customCode: 'fp915haoo1',
                prefix: 'cetip',
                name: '731gls13dr7o383fdzzajcaukol673062smtxbgj0uoj6jzw8oomn6mzibd79qhdy31aoxbfli4pgcj2c47kfrvdwmvi2l4iqt55ku00o15hnx1n4lpbrsz51ihff3m26og220kak9003j7ohdd74rwsi58i9c4o6u680mnwaqobvavsr9sgc570eiuzshgx85fjfyndjs8r0oalbrs6q168eh7her87nyaiebqs5fvcw7sm7rwm7gvno1h9wvx',
                slug: '47ruucj9plgilz93lq7496c6v5lp2q880c8ix9c22faihtip3sxrespudg5gkdo914dbaluk0bxf80xzqu8ui8kqknnxa65n85ctihxle7oxg6wcei0mdv1benbw8i1wlf3iz18dvuid3ynd2ayaaumrkc41htwe9r6kzxcmxffao4cvtgbqa11xmjjkbovtezmi1cxcqg0wfibebp1zpv7fhooshhfn65vi31rgp032gcy5zcenfvrzg9xua28mdd3kb2ohk9csdgx6kx5x9qabqyxll0hlylz29scxxmg8oqb0ft94iy0xyt8v5c6g2ajfi63t50539qsa1w2hks98aicp7ry5a1uqf3bte0bs54z8o7e8sxzeicx0jc9q7g2p2pqpmcbu5vz722c5frddrsb3xldgiid22ovy8g33utrv07tlo58vjmy22ef4eaja4u8gn0j5bfr5eenkj590vj16cqpy3o0gjfqf59kahj657wbsl0vn6606pfnh8gk0othnii2qo8bio7afbw6qt5jqdwmituho3wix3klxffotk7bo2e1deh37tc9sr67li0caguivkruhea7qulm6gkfgydezh7xzhmwaipvsbqtg692ciq5ku7ujsvv3tkl92778zhx93k5qayrc08shw3vbmfha16ufw197ssxfp4wj7qo8vuxvpmicr6ti7oqyuq7aqmqf9f0cq0tcobv845ubywgt2gowj3q6we1rq1nf1mkw15k6a9fe1u5virbk9hruuu2jmixkft5muwcp06h8i7j1b35vvjiycumgqrns9n4k5gve6og00e3jpxbvnzwyxq5rxzkrqwqh5jn5sn9o1bz6zbxhiov3by3267xzxzy3gz1dsmn6pzdj8xfra4lqf58wqimlf4mzr7q37kpt3dndchdfkb72icgmsrtuimkwmrjequpze4aawugl3ox0ihzm5rdb6re65u8jguq9jd4uz4chzi5gxzwqt8vnkz69o2w8atp3pebk',
                image: '6ejknm9q3v5kr87vfe2njj0urse8mokvqmwet2b53vpz72zfujfa0rmet1h1oc4s2bjpy7p85qgb51eh9gcvxqef9xhfhln9vrn8c2obbflb4yqcnoohyo2irurh4ss7p557mvged2wtghf8gd2vkbnxvhotvjy84zpm0025ml9jf5h1er51iejl5t3tbqjxgpbhfkrhwf7svq4bswh1bbe60bst4ujo0nzqc33rf2m8msk6k4ybi80x2f2qw9ee4rkctp9pe58rteaygwq0n3shi300qt7bbcv1au2k8yx1psrh6mfv0w53xpcbw1vo79haub63k39p9b1ga2ox86d8ypyn5zt23spvgn6c8c7chcbri9wqnu2y8wstoznewkgufajuby4i289v2rwzpo0vz1tjsvw8wqq25128ueoaudbq02x2jup6fplbon3qvdc8q87nvfvo49lefyjqoanwog6p0jghwrwf5ijb687j2ku59b10ox4vyqzs93bu4wwvc5t6gk0yie78uao97dle0en2upmq92ykm0072y5q24ha39xrvnoyhyjz44x4nlq2y74z4qob73odtd63ul2mg8d0jnc6u8be1v3b1jurp2hrpjyydil6j8e6el4bjxf2z92awq2dl45tac34mujlexqsjltvlkb8tvmjsyvwkw3jtpn009ykeyjtufvnf9o2nhjk93mpsoxa4aa3vpvrg710c6sfqs3bjny8pclfgddoutzq95yl5tsolivlqnai1bguck834t7s4fx0djy2vf68gv5t682jaltp35kxo69wn4cqybsj2rbut5d28ar0h72fsv8r9rs7puukd0mhe3adh07tgtrqtr01y3es4x1h6fnb1h81oizqbnm6666c9b1qq6t6ah5p12bhalht1etdijj35fl2waxsaicviheuwpmma9re0lha4c40tv4ogkjjrf9wv3num5l6s82xwwxthrwzlpcjlskgs3lv29b1cxk27jbl5iejptye',
                sort: 165027,
                administrativeAreaLevel1: 'gwxy0s5u59k30gyh4mk9yydjjqgd2j2fqhm42gxhobzrn019ip',
                administrativeAreaLevel2: 'sj0ohwhzue2exkuz83nc6926ypnl3za5c9ov3f52zfj17mnc2w',
                administrativeAreaLevel3: 'rqee1nsr8nfb27hyerdn4auplbx8w4x9c9hzh08br1ui31gugb',
                administrativeAreas: {"foo":49425,"bar":48288,"bike":"3<@a7WJDS>","a":"H`W9lBx>%g","b":76763,"name":55464,"prop":63056},
                latitude: 96641854033219120,
                longitude: 22619179520713690,
                zoom: 68,
                dataLang: {"foo":8690,"bar":31805,"bike":"CO*A%<?yF0","a":")Xa!]Tn\"Um","b":"VzZxC[|B*@","name":"}it_P?V^)K","prop":"?(J^J\\8n_'"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 is not allowed, must be a length of 2');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 is not allowed, must be a length of 3`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c7ebbe62-1248-4831-967a-c7f998a807c5',
                commonId: 'c33d3433-07e2-4434-a333-7e67437a623b',
                langId: 'a980e582-3360-4256-9aef-8539842a97d6',
                iso3166Alpha2: 'ch',
                iso3166Alpha3: 'yp1i',
                iso3166Numeric: 'lx1',
                customCode: 'ewbla4nqap',
                prefix: 'qdd0n',
                name: 'aeonyy6o3289xovek7icnxdsuljnf7gg5tk6s8n16fww5y2jcbm5jyunomb7kqih0y7t0d8ntkuqvu014jqducn7mymopvx6khwyhzsaz7x9tp427vvuxs0idufzb6q74c5bxzv5whyt8e5u9phq8fpeqop1hg49u1pgl8z49fu2uj9gzv9ulp8pihwd06ay7mlwxn3ici3bgnt153o1zijrc4fplf7drvyolaqpkmmbkjmi7b64e1njw9wdlj8',
                slug: 'af85iosple1b96ib5i4h2u6bwqbhnjuxnmmfuqun64ljj4l1y9do7c1an98djyvfpmpn8yugzy4q4qxvruwml8p7l1de2l6v1ibb1f1zwhji6xs8ptgszq0b27e0bb7jo1g54oapuuz62yf78q5t1g873kduuvbm1d4e6qy7nz3nq3joucwc3qimmrjfwp1zvvxjpxscj1uxwpe2t9xng2u8x0qr0cugu9jwm3gfkn92cr25bv3arhofcw2vzqe3k893ginavijdgq3sc7vkl3ykj9foyaxd8mba6hxmpdozdwb1jwdipoa1gywjd9c97vx6ap79h24shvlbkowx4nlln423m3yuqoai99uaeh6eppw6p4tsx755qoi21ljih7xwdkhy7cwpelz20ux2txxmcj9wzxll7pp36vjnteoodxz2dgzebla1e5zgo6suxrrb26777j9irv30q24108urlm2z7wvvj9mzmb42uxtin64lnmexti6web1z1kvij7svb14y57n1adyc0lj1mttstzaj93mmxwozz402wbwa6uedgz2cax43b5hr0kcauafhth57fum3dm6qfumeeae6lq5pexuqnrmwglzda126dzyfir9ginicqjaro4nbsdjyfrmo1vdz75jw9p82wdjjrpxwmkkann0okjpt6djpgjjupc41kymla0jg3123zr76d6h1g3uytx461u9tbv1by30xn0j1vvi0dboodew8izm1i4qongl943432eh301tu57vnjivhfku0i0tkbhb2sy18kim2ukn7sdhc58un2hbmdxi2i8bdn71r6v5cy8jpw8cqitecc82sqnepc61r1lo4bsi8l8qhkewns54vd60iahziaa5txzdrp96kmmyg44vo22jjnkaa7k2wmdo4mgzou5rmly4mil7n4wmrpzrfjarcp4r4eopry7d87ke92o57gqry5r7v8aw0airtmkckwstg1c62ubckexfchxur1ehbwcc09mgfhn2g',
                image: '5pmn5fydg3kuqc28y5aryhyizcw3fo58slthnaz8f7ovk2n9vbamjubwmgqhr0k2jm5kevrd7yil9uzk0lykoqqlb5hojdfvxz9z70046je5jg29q9wca2npo85batso1qsytd2ktc7iw19llgi4f7omxbgtwpp8b98o5tmf2mt3z1l6armzffwazmgorxsr1acl20x94ezsvqibe0wj2b0tsclw4pnm2o4qnwgqmm162f32w21o4ty1gnwwjjj6gqn3lleks15lakkg8pxur89u4sdc03ge3eypel4anh3oryhtf0n3swym4p930shqb054ftnnqehgksg35n2eeclir3sfamow0qn52i0cqyt0gn7qfp5reqnufb6fyrg2p3t7cy4zupkmn03thk51vexkzz2t1ddam743fqv0ywqazngq4qip3au0202ebkn29ejkedhy3j6e71xc1qi99w2top5oyrroe99u5py9dnojbnr3by7fs4albvy62rlrwr0tezl47g238k5mfohtegqbx3x05divrm4ezghw6xb9haqbpsi3l8w0eobifw84wwzkndcxruj6kt0khgqt8arrw6atimvlyjjftujyeapnv9zxisqdp9yu5la9etlu3bmdfwonkhl7hxahbetntn4egemu9rbl7bsi1dg75jbi2q79ytclwma2ndv13ukpjr7qwwalt98ndbjb3xuuz9cyhntkt6w4q9huhvjtmkucum1795dcoa7wjnrdu8cv23j6bo5hqo2ubrleloy9biawwyn8nz6badlci5qhk75xtf7wphit6zwaixxlgsz7yn3n6tbupebz0zdquw61yv22svoo5h1ocn6eo1j5sntlbb1orxhs2arzzkwdfqpbpun4wxbubmzshcdi2m7nw0wnw3sipj5k6luyegt9rm57k7wle1qb2zl78rz4ixn0syll6jvptkjssuq69ack8pi5zjc52ufnvhsn1xp4px4rj5539e5m7jwmy1bnax7x',
                sort: 993897,
                administrativeAreaLevel1: '4k9qqebc7e8at2dvu92hnxx6scklrjojqvojs26gmp1n874mxn',
                administrativeAreaLevel2: '831uk084bvfqjjt4e03z9cfs2sywq8mznrtqj5n65l243mz4u9',
                administrativeAreaLevel3: 'tljaakdeffnzz7lqeyilka8tle7z8xiudu06j6e3zysf6lzznn',
                administrativeAreas: {"foo":"6<t@r=!h$a","bar":5874,"bike":99524,"a":11401,"b":43278,"name":15635,"prop":"FpJQ&`jY?I"},
                latitude: 73104534488049360,
                longitude: 67876125827978216,
                zoom: 99,
                dataLang: {"foo":92399,"bar":"<iK7*o-`XT","bike":31500,"a":95413,"b":"S$LM+lp0YB","name":31206,"prop":83739},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 is not allowed, must be a length of 3');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric is not allowed, must be a length of 3`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bd37c49a-8bbb-440c-9b66-808826828f87',
                commonId: 'ed7b855e-0d11-4c05-b035-efa8532a969b',
                langId: '7f5e3da9-9b08-4746-8e9b-fbdb2e222855',
                iso3166Alpha2: 'sd',
                iso3166Alpha3: 'iiu',
                iso3166Numeric: 'ek0i',
                customCode: 'kfp3v89r3y',
                prefix: 'uhx6w',
                name: '6djanpgn629r49e8qypndcr7riz8ukjm1bvdfm8vm40kgh5oifn1hsz6ytce38chmf6gll8rkawwjm16jjqnvtwnktyls9tfcc5ph70a5qet5jqiwkwjnefmkv30iz31zxxg8n7qs5noml5es8z4jv99o6y4ryyzls6wgtvxullapgtrn5hyrrvm55jcvdx80aadsl88yks2l9bnlzy2cetxpp4t8e455oih1cxu4zyoag2no49hk8liywj943g',
                slug: 'hdas5nq19sy7b41zn4og2qy0qhhr5bhhm4pj6obf8cs01n8isxob64y4hgmguzpbzgcv4vx69uotut4925lb8t23fpn2n4l7383xqtsbt7nuxo7hut6cpt8ytax66ugnhw04jrjdcc5jnily1xyt4icgy15aaow988ta6n3j9f4id6o307d2b0i380twq5vstsw8jw150qz7tfuiavzasevqeix4qsi4xf8qqgpbkfz6mk44n20on44hqzda7h43gr9d4yny2htwkk89mbn708uakb7gkt1tgnm6y9zejw21t82fjxz9605b6t43phglmoi5birgfrwluqqt5ckhnv0xgb9g3ctr2hswq6axzrarff88zu4438wlstgp3rexb3bxp2oa770qv6nuylv9npsunulszm8a4sme3hdua411fh67w2lzuvpv47k025kjvdre5pi4e691ig8aq8dq5271li9oxax6mcp9fb6ar19ik1jrcot6y1719ijl67hdj0lu2twb142ju7zitjsp2mo70chuv9povgd20ji70lcn0g0nlsqabpqm8fx5z1k2wsruhcj4et06fk8xo3km9rxgnmowh7dvohhbklt0jolza3m6smprecwsh9y4s01nqfr9a03xd888uwn5vfgf50v2x7j4oh96dp2rj90rji8x0ee0xaqpuz8gzgl8p8xbmohviaphqin9jt0s0mnr5ffourgotygas48qteom5dems0sok8updwyz3hd9iwkeonuzzenjdato1cdeo7oo602ayjrek9dbyhnbhszskkvf2fbhs763untehusdyg2y6e6ggiszkql03kjsmigjll2ln2e0pozmnvg6k1l3ig1c0t5khh6ivthf5irehgpubj7x96rg2m4f6ukev3czd1xeo4pnc0r23oxihwyjvyl5elz9m2mvgch3m59xfsouxx2fbth51thre6u2hxbvrl199oaqr4rt3sgdfhwbfb8cw6gh9uevsw8ih6g398zm',
                image: 'rdpuew9skbie4waq2tnw9nqcucki61vo1xpx0eh4jxmoj1h9kookveggyh1pms1ag84xnotqgpnnubjldiftth2c11kxyzwa5lzki8vqzbls9yuv9szeso7o5v2usb3wo95698l2d38s7oxcih5swavalz24qxoni7v0de40osoqje9r029zkiram1rlpp1dzlul4susbhm1be5k374inhp0vo9j00t1wb44lbfmo6ai8fcafvigzum7zdi7a07x5qzp2me8bln08jba0qd7wgg7g5bu2ayu3ewaj1f8p83hrm8ttewfxcuphmbh6uw26fdshi3p7hzbxt83bbu2wxn2lrx325ga3bwsyn87p3v684u6v6gsja4gxpdj5wt2vl5cx8h3tpd6qfszcogd6edgxtbfdsykcjbnvzk6ailvxodskyu260ad3ksxexawd6qm9qa1g9y2kkstrpwcq4gn4tg8lcqtc2m3frdm3ppeimlj4fmflwyllmj0ypsen9zakqmvlgjy67zcckebvw3bflsn6rscwo1vombuv18xb682dlqyz2zqy1yu6gv1mswqf1uxrorwjbooik9taeksfj9lroy97a7wylqcebs7q53nsjh8ryk9kdfpm5asnqc6o5xd5yk72jb5xbs4yzuopkg8cnhzzq5hlhzfcbdhlgr7myjbpjlvr3k8jl2iaa2liwqipm1t4c2685yx1mdl9ql0hkywy3alfgznph4c5xru5sklxiacqn8novgtqsr6dkg6k3oecht61n5jhjesg635uu6i0mw0hxp1k52mz9yx25s4oi1b0g3p9hr0vherdp9un7ylw0fkew6voww7c32qa2m1us459b36cg4xycic878nqg8t2dno1sft6178h5c0xsfz2bdc1dwsd0goz2p7yk4kw0ozeqmzmbbayv6ejqixojewwqy5qmj7elzeb4elialc93ybenfp888j1i7axafbj0b96cbfg7rb0s8uib03b4dptj16w4yk',
                sort: 211698,
                administrativeAreaLevel1: 'ht1nrzytfqxz956qabq7x2oz6fa605upllnabk2n1oxpt8py4f',
                administrativeAreaLevel2: '3oqtz15ixmygfr4efn0cug44emvmp13y0azx1yrw5v22ox22pt',
                administrativeAreaLevel3: 'mav6k8mek521jm0nzhqak9d0dkavdtur8njewycn1fhylw9j26',
                administrativeAreas: {"foo":28403,"bar":26503,"bike":"{.B_^-4L'>","a":"w.\"Y-ed4$\\","b":"xUPD64,=aG","name":"aXF:]6aPl1","prop":98689},
                latitude: 11745365933260974,
                longitude: 35260308106636940,
                zoom: 44,
                dataLang: {"foo":"mjaSngcVf(","bar":"q^'knAQu{@","bike":"X)OWH_P(=,","a":"H[}\\A)XZL?","b":"%&@hHA=q#/","name":"4vRv`>]+T!","prop":38162},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric is not allowed, must be a length of 3');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryCustomCode is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2bbfbffe-ac77-4203-9699-8aee778d334d',
                commonId: '12183d17-a3d3-4951-acc0-68109fd7c2af',
                langId: '64ed9a1a-394c-411c-9bd3-5a2a0c407c87',
                iso3166Alpha2: '1x',
                iso3166Alpha3: 'pj6',
                iso3166Numeric: 'wsk',
                customCode: 'fsfmeyka3sr',
                prefix: 'mx9hd',
                name: '1frry17cnvlo2mnakaifj1p8rnainh3ahz97ajsf1rl48e5nbxoikqhlw8w5gr1wdnpu15mghltkvokck14a2df7p28mm77ataz7lhtze7al34t5v5nspbrlpv8n1hdzwowtlvt7pc9kem82wtdjmez990o69h631pgvkv64whwshh6ndfwbkkxq7boaky86p3w1ntysachcebvbbvar47s4z1p4pqzj3749ds5z52xqui8gnfvuu2l9e8oc7ft',
                slug: 'hk82xzo5fn579w9hxsc7xemv9ke4en8m0qofs250b4jf7jqmzuz4cv4yn0ii5pf79oho3zlpznjxgzum3nnv8277kys4t3q9cjaq22o8bged1pzjndlcw55t0fmhba0wro6sbzxbibgmwc43tmph17c0vthul6cap304311enwn7ottvtwuav8wfv75gnuv2lly9yodtuls1adgml39f7230834w83c20hze83efia43kchphq8t2n0vu9bilq0nhbm5pz1gaaqfmzp2fektsr05buhm0aj4m3v54ki7lyg3t2ssdz9vw32z8moy689fbtaa6z58c5si4ygyvb88d1gvhqekaosbtuxud4hcyfpur2u88h3gmwmx5urz960tu4zw222se49o435h3k7v8c69hv6j5gdlv7znjrb60gfrq30948g2uy6cy4uw7l9n0yllerlcfvo41jwrvatint2l0g13p9sd6vw10ie20auc8ki37p1jvz7lb439qj6c0nlfz566mrgztit1cqsufgb0kxyc19cwhyo6f3t1cnbpnetiegpafdwotw9m1p3ib2h7tgxgtzpkjcijnu61s2o4wm95ud07j2yj9v722oxhvxp2yz6xky6pejgb0r568framk2f5tj0lcwokobop91dz645e5sjn8616stmivng41rc3hlpewbw2e08qemoz9g1x3f7uqcuax5ao4g16rcu3rgpsaiwgrm9u5mgxggn4kni4d5qolk21ovt4g1rvy723h4xfm2l77ugz58efz777du5ximmn0pr1escq8h3ew6fdp64bvgjf88cl6ekf7k5qkxg6zxc9p3fj2abbflqitatz8uuqukpx01fxiaghw0smf4dxfkwaqcr9mjdx6q662oyowitnni58wvs40iba096rt7kg0z4egqnxkty2t8ia5cnjm6u1m7nx3e7q0mta3b99dq6hpugxhsdd7h7oawrwo5b999x2yaztmprcn3fdl8s0n4wkp3suzxs',
                image: 'r8jrcr7unh5q809mudyf2z26shcc130340tlfqilyu22eo1mac00er2w2mlglwphp3bp8zf0fotq48osb324digb8urokj47ms0c74s4r2u8p8rmaum9wi9ukaqatbqrm1vg0rlqwobvjhd0eavzyqopwa899rmhcr9rmc4su868uogkycd1n9eytqrqnoz9266sxdpfor3wyme8q9ksde9304atma1fym6tccv6iycxzfdjxytedoeh1ywfchgottp8fqdj30n1criwxwcdvvuz3r18s4jjyoisfmku5s58d11s9fdchmi6vu4f244enfj612tosruunoo83ajd5pdciux5aq4m4eerjjy6lk36cjiowuaodkrudoogyp61pm1q5xpkkntw36776fkvxmlxmdw4qufl3kszsw1gcy5k4e29pzptdk71qxndf9rvvlgcr3acx09kz4u8lvvfyfbycwydzons7u3xvwj3d4ibfoewfnt9qz7mmos7gp1qw06vunl2py5v9ct7ya76q4qrpwmja3uweei09saky92gi2z100bkarp5y3trwgvoy7g6imhszl5yicvprhumqdwv95manc3hxl8msw5da3oixh7osve67gagt1qfmrtgyktk1s3swawt8fbokbaxouijmwn717wt5fa5lg2k4pt2stgpc8wx9k16sz4oa7y8y5st8rhn0harbnvyllwvosgq76knj69x39cuj88kejf1798fq8u78c9vedspaqdgjizt7vqxeo5tekx458pz4hcug6a35yk5173txyd0vapqaj45pn4oy259rmo00ct7xm8ceseuretjvbpktbe7kjk98eoi1kl6yhb6jeqgoe06zydiuzpysv5sw07j5sy88dol3vhw066qiviwha38n4y3vr3azr5o8fmobw9v92id82mj2resw9okalk47ui8wklk4ii8q9vnr8yabeyonog38nd8rp53d1v2trjs6vcum5m6r4engtr3vxajkd0w',
                sort: 585807,
                administrativeAreaLevel1: '9f44t0h7c9n4ih0ztub5fu2xalqxghywutfsx9urfq1dr3af87',
                administrativeAreaLevel2: 'ie55xzu0dxedb2k18jdiobv3y4pzhbb2arkczwuqq6shfp8zpi',
                administrativeAreaLevel3: '3hy8pn1ifjl3w7l0o11fe633nwl5xsyg23nyavfi1ar6ofzm9q',
                administrativeAreas: {"foo":"!0DZM#m[n?","bar":34883,"bike":"4Bon4Cq?eV","a":"VJYZK8t/u*","b":43454,"name":69414,"prop":45997},
                latitude: 95844111425468530,
                longitude: 45575641341628430,
                zoom: 13,
                dataLang: {"foo":"D{r|1rGUGN","bar":54486,"bike":53412,"a":"9Ln%DER}bq","b":")H9\"\"&z6|1","name":"\"^@CNj|r|m","prop":75010},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCustomCode is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryPrefix is too large, has a maximum length of 5`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '66fb0840-667d-4e70-bce0-2ec5e1dae312',
                commonId: '52560ca6-8089-4f04-be53-cf4b23c24d96',
                langId: '027a4e71-293b-4df3-8932-4e7408255778',
                iso3166Alpha2: 'fw',
                iso3166Alpha3: 'y2i',
                iso3166Numeric: 'qyp',
                customCode: 'xnisiada42',
                prefix: 'h8kqya',
                name: 'fppkn5fikyuepb9no29l350r7q0m29ht5f9hfh50uno2zuepqc2s6il404j354ejfk1l011gyqp71d3wyh8266tjgftlfdb4v7qbmm28zk6fx3ax70qzgyfkkqwwqh6u1o8gzo2yxvdw3zobih1vtt6kh6cguydza8t3ci9m3zlpbtdq8ie5lwws290anwm9goxb48n6o19vbuusogubahcmxdojjsbx26bckz0m58ll23unmphtu4ag7qegvsv',
                slug: 'gmzw1lvtta1kgzyv2nvxxt2xbgzlwikrl4zu8s514rem6gro8z81tlsceol20yefrazwl6sqlgn2crmzqhbjzy7i1gz2vswdnughpi6o4sx7m388hqyr9ipe7zjkq248zhrg3b2e38m9poajh0zo3xhyy8a2dga8glvvv78f0al43n3rd6soyw9mllmf7li3g25wk35182ygl76mbzevx6yhlcb3m133ze1gom4ojapm22l9s3q1x4yg28voxmps02uvbhtyl5jn4krjg0xx3craz83geqyyxt7go7cl4dv309mlm5c4bncbsv5i19sehsc3v8uts6i46bwh314dzohbr03pfjxnik6rtgz930i86na2eptggngt8lxjdxlacw3l7thon338xtchwjllb9x15qix3p4tn0oq3hf4dj1k7x6ytu5twlb7m8ucwbq8tev42cec8odshghqpny99ee6e9e75dv2usjxofofld1yjv9mli4ef80zprxyyq115u67fuln1tu977lpqzja4ab5s9lw1awb1ip9ipmthoevfadgnm0plegb9ltrbaf20dx3806io0cnjgmnvl5su6u9xkiuvh2jfs1tizoe8g8cc77xje37uu2kjkgx4tqdvl5uun0dltlc9gz9qwc4h5goo336ec73nohhxwuq3ezxo391zqvhef052fozwe5427o2t5foy4iowfm7dg1c8uhxabmb2kkat01pkvfimdm08dvuozga3biyxuvvvbp7xsvmht8fg0xp5bb3c7sdkvp4qh15141i7rxz2flc3hg242iz1azns4n6zgxev2mbtzaktoistzvco811b7izy6a3x7xt8ggr3tfq4d5e0b5hn7iy9wux8akbiw6659oflcb2z0qgndper3p0bpu3i8g2yld7flslvcffzvdu1avcrcwogpb01wwblm3d44j7l3coko6guhq0dqvk22g91c0w1879de6k1kgisrr947mlwvj3qcdshzd92s7h6dfd',
                image: '9ep1axt8gjqq4ldejgr3t7quxspvk7xn9uguzeq0t96uhjktgydilfyvu2yjd42qalh6senrljatws076xp77ej5gn2hzc6cer7qkofyt0mkwflgydw1e3ftwf8nx4v67fsdhggjkk6pwxt656d9z1b8cyzkuwfy6le11066wr5rmmy9ot3lnqbx4z80cm64rre8hli4c7mu8xknm8uukm4vyzjxtv8aai4eecpndmngeonhpn2yppkll2jl7wwo517cjhvzg1y0gsbbsuh6xr9gqnazl30qpbi8daw1k2cwx6nc651fadlb10d7ttuq224xtbnhro8u5rj27hbs7c9k2xq9cfz1b7nheroq0ta6giw6t0hvla004r6z5on5coowbe9jjnbwgiitfaf784gsi6ej4v8way66dxb2goilh066jhjuq2sfk31b5qttpdzw4fwupzbdmwpqa7nlw1h8kgt6p7m8l14g2pd5hdnulpovo96c4qvcyrdac1rc33mhc730vpjynebcz6brw45b2lug4vidz5n9dky1tbviilfd7i3pahorapanfm0c8web3bcaeqjvo432sgo6cqspwew4aztyfuz5l6l328ytp0j6j5bbrue9g7pcjme8td0uivm2evm0vqu6il15ebbfb2am2rcphz0kik5zg3nlxdbcjiz5x5q38yiiu40cjfm9svj9skr3wgyc9ociaj95ryrbo5fwfixgyt65amc4q7g0b8wd7flqkvl2f9mymnlydh38ncg8touilvhoqoajs12mgdvue7yk9byhqbn3w3voc9fozfj9sktwalss64dvvohq60rsu7ko3wzkc36x5ijgfnwor1el987443dvffdeva13jygm2jrr1qq1kwzqv049v08a7wkw8nf9owjcv2m58mgtakddwj0yn48mm82fb0fy27nuqrd4i38hihjqq08w48xxqumaaw3yd7nwkbgnijc0y98wvxjebh5skhjorefb6tahea3kywpq',
                sort: 942850,
                administrativeAreaLevel1: 'y4kpei8ygsojwehekvt9ytmrcenxlm67kyd9izcaix95wu1nsi',
                administrativeAreaLevel2: 'hfrsy244j0phuz6gk6bsqhmv6rpp689417f0qxgbacaug1a4tt',
                administrativeAreaLevel3: 'h6coxs0t40keu0d375w40h1yvihjgni9zfw5h36metj6g46d5x',
                administrativeAreas: {"foo":"2x/<V#6lSo","bar":91090,"bike":"kI{i8,Jj!>","a":34310,"b":"v#$J|D;\"Q0","name":65164,"prop":"9%6;*n&DVm"},
                latitude: 12771085492882580,
                longitude: 83212431647774240,
                zoom: 48,
                dataLang: {"foo":85113,"bar":53428,"bike":"]I4Jijlz{b","a":91531,"b":92041,"name":66343,"prop":"4kz_5}fc,n"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryPrefix is too large, has a maximum length of 5');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '304ee9d8-6d96-47eb-a9d3-cc5ed8ee0338',
                commonId: '3839cfa4-3bde-4691-96a4-0598b71ac64a',
                langId: 'f4a10752-8ab8-4572-b7ce-18f926677906',
                iso3166Alpha2: 'tp',
                iso3166Alpha3: '1fd',
                iso3166Numeric: 'djm',
                customCode: '69mz8yx9g6',
                prefix: 'olbof',
                name: 'vc8xmmec35qabn1c8ym7595vkrk4q4a3axsyol4jovopysy65nmfap9p79b6ihb8nzpjhkfg58f78pdqk9wr2ttvad14hhltzec4859bw3fqd98zyytheujheyplyzbce072jo34qs1d1fm1g56nqq4dlbcp826t6stvcg5fv0j8ck0eojzjei0ietmxal1o0n6znpwlj4vthqc7rbov46i2ej3q8ppliimh42wb096yp8osgq9uiepmceii4h51',
                slug: '5cebuzvqi695o3chfetaqb90j3p63ift5v7wwfkkuwuq2lkavxuh2f3frlihi5qi0lavi4miqchaz7fq1myhpyk7kvh3f4be3kqqpae8ncqlcopagh1ak5j7qqu0u312gpmuf4ei6iy6i59dn7ax3s7qe7vkh0gttep7jrb1mo3too421mqqedd3v6zukz8xj1cjbfg7s05dcwzxyq7t35hudlpysxr28nzmiu4zr2wedm3aeeb69p13zqqw7aimpr3wmxz73p95nxvaz2wzd6shrinyay7z3n4bxphfpg816lw1k5b2mgie0m3w4pez3k8rf6s5w39b0wq3t4ei8ep575uokvxu01z048uk65hx4ghndwfevw3n66l7909jbq4812rpmis2fdrfrq4gn28jj3bsr0fr71slwewv75f7pr5pix08visbg045j28v4j11oqyqzfpunuk0fulc4mp7yicfrxlos2c20akchiqefdpxsa3fr2dldwbenoldw4e6os9s154sroc7k3v1vawq4faojjqkav8n3p3rts6n78kjjunznu114tld54abpvz548r2gi2rlffqsezlv1hbp3slw8a9d2atmihj7sxdz846yai2s4sg3g3xyjfcw7ruadgqh5pvnrtqyf5zkhry1sensg4mn21yhzinzc4q6n2klbrck04spreuescfjq338j8qzqkm2rhodg0nmos7mm2niybrzp7y3xk284kjpqtabxf076ospec0pysceomsyyhz8adyncg29pxlhde1qwy946sua64awunhql2vcli7vl8s7b15vm1cgulieg8f6393bvmgjwb5iokkqlivi2tr6xjuqjetmjhnplaozlcan07tetmc62gkv9qv5tu3v86a1ksjejahknbadykugelqfpcuqul8jbo5tbr5v26jhmdssozy5zjlqpswvlrzinr4fp2qg9q0s7txkkc1rf9739y49ews117dkgk1rz55e67yntots63i0gol',
                image: 'p6txw30yhw7yhj1f07jcngz9o0l5b7gxh9le9uvf3afb7lgk0m03qk9w7m7r2a679fp0nhvnrj0f6fh88h9izvyx06c7dgyhkypp3pzze21dwyauaem8d7j7c5qvygoxd4mi4dnux7h9088rbll2zbizsvjeav0vkj1a9ynzlkwdp1wwn8woddd31oeviw15gdueiwan0o328o651l1z6k9816jlt4xt09pm2kxw7upeug8sjz9ryaszh7e94mp5uo4rtd6csg2huj7uj958hkpl6zuxawh714qke5qobtrn71xru2rr6vmle7m250wqdj14ka75ka4936dmk17wwfs1qe26f42evxswi5fmulaoxhs6fpqt9wsm07ujinwrbthczk3qerus6wz7acdh35kyaywg9wshomhonf5xycc1om8dzuo8tjixcxqopvdff1trz0ng8fd05avdmgq0t07bte757ek8u6ec5w4ru6aut2ohdmclmw99eurovkdncxqowqefcwmakwg6u03khauwqkktnejogrtileq5bx518ocpo824kax0vba4ii2dng4gdcfif1fy4v33qxq400kolv26dg5r24gkuem0swo9tnzuidf67s2jhiyu27e06w81393p2xudvk24l5bmpobxtnmvcbdmvs0bwqm05wyfvul14133l7jhjg6zjedbp2xpdya9w0zzhb8mtm48iooptwc2o0vhxfsy7u2ae4lrqkecc0kqp1d8mdq6j5gox8w085tueepi5lc0c3d3pacotu8s4kdbbx6ajb76fd1i2xr2g5fjl19vdy7aqd48u86m60030l4j9kk56e5vygl589rql4zllg7gi5dp21ji3kj835lo9m5mduiion083jvid1cli5gtlncnawluhzad0f76pczrpmn7agbukyoapcobqsysfv6sdxoxeo5jsx4r24km12j90z4hyuehcktg2lz4mvjshz1bujsnj7xruzak1pj0aqptaaogc7pt',
                sort: 484420,
                administrativeAreaLevel1: 'iu3bs4hjuwm9rx98k3zxuocs46icp8iqqn4f932q3ok3v6co82',
                administrativeAreaLevel2: '4s8h8810tgpmqfnmv4taohbkedfdw6xpvusykau1js0jst441k',
                administrativeAreaLevel3: 'gfucp2cbjbyxt1c1sqnvr9k04gje74kz8ii46humx0qvtibpnv',
                administrativeAreas: {"foo":"QO/R`&D#=\"","bar":58577,"bike":"9O$lp22I{-","a":"'I}lVl4+VA","b":46279,"name":38732,"prop":72741},
                latitude: 77470782558123580,
                longitude: 44535851725412880,
                zoom: 46,
                dataLang: {"foo":"!kyfst5Ru+","bar":21918,"bike":"b8YB3S&qow","a":":rXnCeJk9x","b":"#7W9cPz(s#","name":"Rk0UCG*cHT","prop":43966},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4d35b507-dda4-4f1e-a495-a7407ac15ca1',
                commonId: 'ffc2d8b5-b843-4342-9e8c-101a944137c5',
                langId: 'd20d8c87-2807-410c-a7f8-6f47413d90ec',
                iso3166Alpha2: 's3',
                iso3166Alpha3: 'zlv',
                iso3166Numeric: '7tw',
                customCode: '8qql5ai56i',
                prefix: 'dudht',
                name: 'vm5dtu1yrl9czsrnzv4pqqonyg59gwknl5ss727f2ge5j24f72xksugno5s7y44c9ypc7mvrbaothkxiywxhgcez6hguve27cq0vm3in5mbgfawwcox76snlar0a0le9t3o7o8x6gyezwrzyfgfdpnrytgp4mlovhbs8lfuutmn44iikjuwskjy7haovhvjhovjc3rkheh6jh4u19rbkcw8kp6jdamhrj0r87dz4lh2yyhd73gb4kpukcb86rj7',
                slug: '9motlj87rjhkc4ebu2mm9ba30japbumdpwofmvf05cugueydcfs1ojbppdp730c62m1i7to9r5r0g29995uf48d5wzyt2uk9ig3naju4os35v0uao1mcs82jfm7s4imsaxrkezxv86tzq1y2ldevpdbv0i90fnscqk7mabuyqirdbhaf0u5mz60dje9ew2yqrupzttkinpg0sdnrx6zdxh1epre35ro12gst5kplg0r5lpobxnwo6wjpsewiksa5s7nzy4wvns9bk6b7qh9qnlo5si450ntymd0j3noa1n9mxfl77f4qehddyo9t3cdh3qac4y4harm3lqlzt3b9xjdy6q8ffajjmagt3n42xcuz14wd4vezix13x78gwvgme49wlgn2izzecm61avboh7205zw6dr67jrvcjq7fkayfu4oy7h00vmokdh6u5qf3fa97b96ic487sf80tt4bjzyhs3t466x1d0exrr04pjvw03ub9tcj7w9etznk2hktvyew6a87mdclnvx19y84r4gofpam27ri3ve5475ly9behccyrm0871425zqk3qvhg1ex71fd7jz9iamcd2bvk8ip6w1nu0bzhp50lu84pk537quzmt3azdcu8sdk82gn7s4d5dctyltavymu1wvzsituloj0iiqwfv539l97ztvp9obdysb4alxhdiri5lq4czwvo81y89awo10j4l0e4a7x6apwtl9ktm3ptm39zlihw2k043pgppzm0jget1frjt9x6i365186b7cb0hwven1rf9efz84tfv4p7fo6jdr0zu7t61cw4duqb3v9wtrmz6hp0umeu68yqkxo4d1peeduq2ng9v8jl75fytw76eodhlib3wdyyr6tin3h6fe8ipycbokfhw3224rsiw7yzcfzjloydjb692voz8im7isk7g64ui5ltuvvgngtg7p8tjt8v8xjisjulh2tkbm1edhyn3oaq40cqqvonzdhzzvmrrv4uyqsrpsn3r1ezi9f8',
                image: 'em0xatzfsljoj1sa3dt6r2hy97ffirntsa5sl9bsz54k7korv5zlbwgyofusvviv7dum4jthf4quigbiis02w3thrvsagqkou8716c0v17zhpzirkvl8o2rsahpkf3587kb23cvdxhyyuxiwfgd5tdwknxs1sc55ayjl61guoss854lhebijhow8bcqsak7trk4u0xrcprw0unnkc8pbi0sbh2hcbfept2xzbiu7zdg1czld5ov36usx802oni8ekqpx9e0od4qjf1dqelyzjlbstqff9j7itamp6ydan1780qewraqsfhp3n2y7jtdtrrtlmqmbypzg4ssxyvbqbzmmnut2aum7lsr9l4dl5wze3axtp2k7mvs6x88s1elmk3vikua27lffa2yft78y8k4p1935min00suq6f5sbw0sdeuy1ywuk0gq4hewg0cfpe1qmsb1eri1rcbra0lvo1zpxz1uvzdyewrrxr47kci24wa5pgedbkf0w0j5exztz5o53m5flk4wnfxcmqyyxuywdvr3s5bmaikcervmm1c5nwib6zlxx1bee9juf57tmsvj22y0ctv6zz8sisv01248pj7dnngxxuqrvp7z1nkkh42d4dlql0s6c3o1n6q645psccrlngphx7zr98ed5dxb7hhma63jxoqxno5im8dbjunuvwzmuzgb4x1sc8jnvee9awo2kbai1ngcpt0vx7fingyyy177m4hvff8sfoazksca30eoeg8dhc3wdt16flvju9xcj5c7x2llevn6znae3wl3m4esuncwmj8j7yiuyceruim42q821b8y3uc5vka9h155tf24wzaefolextyjj5i11h1c5ybz9cbulbihy36smu7ic15h5pw7g7xy7eq66p1t1vrjcpqh49t1fnkwnb6xqnaexib3uboqu0zul0sp1lfqryni3rwh35lkftmbqkrlykjmk99gpc3kly0xirbpz4h8ciwrbld47m0m8or72velayohfvk6kjj3',
                sort: 534964,
                administrativeAreaLevel1: 'l01fvpute07f685zzb37ezpzadorqynighwyvjpchfg92eh75n',
                administrativeAreaLevel2: 'cxcc49dynqct5myt8r64852ausk9rdm0qas1hs7ukhxag27w8z',
                administrativeAreaLevel3: '98j28fg9z8gmnf3f0d1cv47tjn876s9nvaqu5d71xp8b4l4np8',
                administrativeAreas: {"foo":")sD{us%)K+","bar":32508,"bike":"b2yyE]|F`L","a":53107,"b":"\"B|r(wJPkg","name":"P<lxz.2=.]","prop":"w&N6DVh7d<"},
                latitude: 40609318788451704,
                longitude: 75437763085888380,
                zoom: 88,
                dataLang: {"foo":22765,"bar":95263,"bike":"_|.cKv%Tp-","a":"m&L#pq!xW:","b":44866,"name":50853,"prop":".<;M?zK}$!"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryImage is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ff3ffd80-f71e-46ce-9b2a-66d5ec21a16f',
                commonId: '9cc9a0d0-e064-4e2f-ad04-8d4057297adb',
                langId: 'aa32f0e0-9c8b-442d-b817-b35bda5bd32d',
                iso3166Alpha2: 'iz',
                iso3166Alpha3: 'y2r',
                iso3166Numeric: '70b',
                customCode: '2ntnlrfezy',
                prefix: 'd9ipz',
                name: '7prlo3296j3fe3c309ml7910qegpbqdglzafh1nvt32i1s24e6cb6nyragnez3hf1p4lfvs7cxy552gdgyirnwl70nca01o8eka81gh15agknjgi2iprfz0zwhz7nlro0p4dqxzx05jaebapd3ato1avcuiiqd98p9oxnrcbqgti345vwx2gcl9747uwnm47bhvbsyf6n39wvgkfxc20sq423isaxpw0vsbw4g6odbq680hqi2gzvv1371yfphi',
                slug: 'ul6ufr9nntlz4q2chzaxfgyw5ud9kojhv4fgbdsf9dq8ifrv9mnjcnnnmae56caw8y3rijm1tn9brji7zczx8bh9lctqqx9q2njelv7uy93x8qinp22ehhnrc5e81wlv7dh7gezork8gsnv60vkyzvg7szwjzz2xcro9hhir8yqjwq9p4u637jvdksam3425v6leyh8fviltop1vgbnjlj0j3g1dbarareir4kiozszi84m7yay6j7r9mqzxfxk7ezh9n62x2ted3c71lgktss8kw28jlcos78oy0stf684falql89uvfc66p4cx8876lxae0ee0v45358fmlrh6h6thamghghkohbzffmboqz46yiie8soy5m4exrb7en0fc7q5n9bkvlz2opm0tof1swgf23m30npai93d3wq5wvnoe3ff8d69jfnaoz70pmumx4z5kvkg3c5hpa12daewgyko7d0xh5t7auuo80bbgd52fxop96n1vspt0ddog3goia7ws1mc5c0s47w9p858ttdrntukn0axaqbhodq26e3izlspumea6peqejjvm5kmhe8orlr43q0qzyp0t4715hzl99dikx9y2qibh1ritfm6gk1pwo6xmh7tr2ft2uuu7s6vh5p36g7pxsyvs625cnpgci8mnq986vpqumt6w3ygq71z7ouqr43ny59i0q1mx4ki16mb0s86wy0o8c2l0ukq7tq148c64gtl590nn950abro20sg6fvt3srk73iczd7zuzc93pvhqw2jzfeugnowgtajuy00u58i9yiwwi1y0aaletnrbi4qm0pejqpcfatoiwsn6c8es798kpihewaa1lk20xqw8k04kyk04a084bjshvm3qf2sveatnl2dg05ahjmje6r5wf0j5g6b3koq5dzx5u6km2s0isf7evnvn5ev3023ippzqo2mgdtlh5d3z6ng1taydfh9fn5s4u6nom9syecbk4gqz7wco7v5a2zo0wbv0ewndkdprg9k',
                image: 'uam3jn8ede60n9fz60e0pz5o8kysht30zq63lxuiiku55wh4s8jmen80e3x2m7r86guohfv8iui8juvg3k7donk0nb11dggs1mn8d0kanknrzvz2g6798r6vrprlnr0b6eeg8gq0481cxj3qturibs46lsn1qb3s674fj85iupwo1oxulw8w0mfzvwtf2lzs2bmymdoifuulp1jznf0c3qegm1zw43jhjybsnyn710pteic5g0wxlny4wvutu1pi6opwqxygrj58glt25leinpvzqked2f9t972zulexsryrqi8jbr40draurucpzumlhv4whd98h8fnl2m6b0grorgg75ikm1v7oz7ld7qkc397myxkatqzoz0lfb0tyvckibeyh8bbtbbd0soyolt424ujcv3snz1zvly3a7jkv7sh54vw7lhln3iadd1e9770vxzcfifm6v6iofz9qf19caydukpkn77r4vulj5npd69rdxw5i8au32gvu6f3uify8iiirhmaf1081ettx2zqu4l8vw4o5yqn4z2hhx7z7mdwpdvfi61zfddzav8bb25bx2isayuj0juwwywz2rngxf6tbkb2eak5mmikc8einf8sp6z2y1yi72pt0o77kso240hzhs3l7k2iuu6rotlm6qnmkdh0sxaw1yzgkepdoxkvqhxnq3tfm0prgpiv8xi44n06dagq3h4v4zpxqevck3xodggyusagvb5oo33q8070w79tqmk2lnqvlrk2zq9fq5wv2browu5t4ly4sb4gu4uf3au7sqqhnb3y3n84c4mtfdfy7jz996wnc18qn64047tkexi09ilo38g6ttodgub66arb39mdv8rl6locnzp6jpzus2s6txtu7dwwm7yrdr520mhnjaivtnwrj7tyvy35q8bjvu9my1jk716rjk5kq3fhxiuau8p2dcfqvrimzozmyfxs8snm2whw5d21yu750mrch0weckcte3zg46fihudh00jqed3yq4gimffnj',
                sort: 504975,
                administrativeAreaLevel1: 'wca41pd2ybqodif8884eqtm63h59txen4775jtqpyh5spkm2q1',
                administrativeAreaLevel2: 'l5k37kvrjq03fywvit5ege44df5us8hin62106y75ahj141hpm',
                administrativeAreaLevel3: 'at1o440l4dkh1ovpc3yo1061144hcgcv892jx56q13vr0u8i9u',
                administrativeAreas: {"foo":15287,"bar":39590,"bike":"'^5loj'=bh","a":86444,"b":13601,"name":"ma3zasA(`f","prop":"S!=*&LT&sr"},
                latitude: 76266205991625000,
                longitude: 23242558548698950,
                zoom: 11,
                dataLang: {"foo":"a(l7(=m3\"v","bar":3573,"bike":"sW?>0c'[4j","a":"{5[Q>TQsjA","b":74290,"name":52543,"prop":"AnLI0MYt]H"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryImage is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySort is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'de49263a-e8fd-40ef-ac40-c23235af370c',
                commonId: 'c1d6b27f-b584-4727-8be1-9aa041fa4109',
                langId: '3fcb669b-8572-4ac4-8446-ef55bdc74c5f',
                iso3166Alpha2: '6l',
                iso3166Alpha3: 'o9e',
                iso3166Numeric: 'rli',
                customCode: 'lhu7t0kxfc',
                prefix: '8f43y',
                name: '9uvdt0wtwclv8l6js55qhnxyca79ifxcqxdb4ur669gu81zsv69uleqyqeh4u4stcsn829sgiux3xdual2afnotosxzvx71xl8801zcxid38b9rv4y7ro90xq1crxhmw5jp6pp8fmbb1lx5jwchk7uayzztwi89gi7evuymjrc1xvr0hrtc3as5qcpo3e7fj3xlxcvm3rqotn92s7j2oa5wawt0877h7ln6a4xlkxeihigk924fjy9ydy3esmhw',
                slug: 'xh7ij2ppsvnfjtvdapi4po1pyaca9iin8g3ybqn8d8vhjgcwt4ppv3fuobxyk376gq62e0q73ss1ov6w5up2kr6aj80arzecq3sscyauzi7j9i89x3ycdat5lh53bho8qb04mbor98cyigxxchsdhvhq75j68hplmcwcs221uj8i7nu8gxjv48iebcm99rk4io268v90dq1furaldjmr05pax7ga12zkqw6irktu3iywrtv10dg5l4kww68snq93rj4q0u9m1xl45vv81ud142so7xtljwjuz6nowwaa3w9gpzy5hhz0cbl0idue9vxojl0cdga11kkvkwrkn9hnvnlyeejl1fmw74jg90vvhd0avly6hg86pk3rxk8e42lc60lp61q2l8me5ldyg7h85c72h9kmey9tmsxglird8uxdv1asgis90cnvekl0hebxiyznkq5dnv6t48040jva5ty6tavqrhxbk0e1ictwqi28vgp4btmtxp876p1hyoh2nxi9cax7kw2kdy6gq4iudbuioojee9ivhal6tac9uni1i4zv4jlu5stens3y2zki1d25j5vblijac96px8ataynri11kecmenu1whahmsvi0yz29evskw80widc13ngl6bi2dxdo5dqp5s5ev1istya6qea8o49vl0hjnhmol1e34op0c2mhgpqcyz1qa1cz8n0ujz3jattbza435aextnxgtfkbox70vdghgxnxnmcfqs48jikua30sbt1sxe1ksbve7vc91z6oyo92sr7zh6tudjkx525eaaplostix17vkhwtrs61s04sc34j7ik9x6gj45q8i5h8lwjyz9dhgrlsbwe0m7xaldswblrlnfhul68xne4p5qoqqchnt61apkn9onk9dkk60379b31tgn04b0kq6b6k2bqvfocind7bzkxdolqk6mwky9hxl3tnzornt70qzvfavq6bja1xeyrbnvy2qs4ci9rea0rqlz4v7n5szt4k7bxab11colbb',
                image: 'rgsniudbuz1my1jsjk2u1p439bqouh7ua6wsixcbt8ezoekp38go105ddhygg3szjds2tcoo49p5bvdqynsckqmhj864t3rtjkel2m0pc3jj3osf2z7nraymiemphl7vuilf85uidsrlnywxx4j28o6lx53s1g366ebrj7htondi29zfehy2bnfr36o40vvfeiaqisyab06w51ubamrjhs2gqt9vdl4m9mitl5ob1gocw44ukbvml2rn2pil9tvoxh6rqd4d957z6eki5p38h02o9xybz9xzwn0m6wr4g6icimhwi6j1vhj8we94y1d7txybltzva1mswow5hgn8t4cnqc5vrgzjnkonyj2mik8y4pb4bz1vl2rmcocapjnce4krh7aktauwv9vrqngpxb75lunnokv83sskkpoevp1nw9hu44hxpsq8sxnggrmup7036ml6mc7iqhkzv9jpalaaeflc3vy786yr15d63vi1qwzxmaasqco8cs4azr3o8lfp97cwohjkqcjslwaha4xi7216mvhny75so1heylim0jixfoxt325n7rc169csa15gytb6mix2cnd4arma9m0oi3t4xewadvcql6n1nnl2p1p4bmn48kckrnn8h1h5fox84cifs4oz4nhatm93v4jw9cog5xic560pyaupeil9agdqnfq5psfit0547auzw9mnixpm9u7okxo0h2eakp82pckapiscwpn10hqq2f5kbfyhmbjgviul5wlwchgqflem07n375qrl1j4w0pohkkgst3sn6kjcc4bd90p5iodxtvjr71wsr0pfp8u6ws2djt6mj9jsiuucb1ocxj1tej91wa2qlc3bjpnmvt0f93jk2kf5lvfkoy7u01n9myxphop27bzy0z6z7kxm7jmwvey5a74lvdykadj1z8vhn7lg0jnwanax6elmt39f676axu9yw5fj8mab4rqmi628h3mitwj1zumlhoj7470d37665xj66pfoi45rlgn7rmo',
                sort: 5771287,
                administrativeAreaLevel1: 'asnay9jw39qz2raymrfu0hh16h7cm3else7xwwibv0pzva4103',
                administrativeAreaLevel2: 'px8sxi3097rt0h3a5vaxne3ozcea3ntweushm6ik0do32gr2y9',
                administrativeAreaLevel3: 'izwf8t4h1svnqz3k1fhrala1dadifqcgpb3vinc4dt945jrmum',
                administrativeAreas: {"foo":"J#!rIJ|4!6","bar":21773,"bike":"yKJcw>G`L*","a":"$ARs+hkT'`","b":76918,"name":23878,"prop":23808},
                latitude: 86159236649580430,
                longitude: 85130493490545540,
                zoom: 62,
                dataLang: {"foo":26769,"bar":"w:s@4CS69O","bike":"qcYh+\"-&jg","a":25609,"b":81233,"name":",\"vG4aURPP","prop":";@fl4RH0Dk"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySort is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel1 is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd9538657-c21f-4036-9fc3-c5b05dd70362',
                commonId: '25862550-8626-4114-abc0-211f797abd7d',
                langId: '3904d4b5-c116-4273-a2df-9a85c0b49fc5',
                iso3166Alpha2: 'nm',
                iso3166Alpha3: 'hd4',
                iso3166Numeric: 'dp9',
                customCode: 'kedjm1vrr5',
                prefix: 'i5q2u',
                name: '7lzdo0fwj5l0jia991j1fn9e2jq5emcehvbz0bnn84eoa9dngs8fqwfpdez8l96jb3qjbq2zecmgmrwkaxpkdkwtmioaxzovs3yga7buc6ga18czsqwicv1zjvxbdi8sue87asq0qg749z9aoz820qg10l469o83fzv1elb327esfk9bsnpcxgt92u9ovgasduz4p9kzwhwztasewagdzu9fk3igoda44gpmp3agj0h9vc2qip7msgy54o4fq4u',
                slug: '85tiw6lcxjf1wx4agfnxemjqvy7ypmci8nkjyazuuz57sssctx501fevashdk1q21l35pi649d7ijm7tp2tzqxwhmgys227ge4xnpm5cdwzducnxskcvf4clyrnmtiwhdyl3r1i1j4k2dcmy9hb7bl7w5cnybzvdhbs4jckd5en6gr97s41poy7q348w237897t04o3pr8bl55d3tom51kmn5wxqnaguwcubvqcyfffoj4azthrc3tcz5r42wzq2e8n5s26ec60h2o5dxeug72gn1j247kka80um2asmabbtq53lzbnsssrpui4753rulekidh9v4r3pf9ku0if09t1d3ywgf25xv19senfebko7kfiugngp4q6mowd4f97womt4e2glzk0a70cimra0p1h0t8mevwti1qtlex2r7m9akuhg1t46r9b59iwhqme4qzur9nyjra0iqiqhdng7e4hsgi1r9exxugcmj4sywudj1wfclgo8pxnt4zk3ecyo3szxizqidw7p49sj2ig8wceu3kzrk4tm475dkxypt23qjjafw09x2ot1yek9p826jjlcvp0vsgisfat43hw36hfonhsgrktdspo4tm15u3lfn3m6ckko73x7alddlnk2hbrtvm7bylwaca7a8pu44amkhpoyvd1ni34hlvkh1mbka7nj3bjd0044hicfkng8z2bqoqpap0jl31g0xbvfy88r5ukq9hi5r2mchs3uzb86np34yd278uozr28yer7flmsz8tslmowb96eta8k8bsaixqy92vasz8seia94ma5n4fubr3yn5qumz6ep4wv4djdwv7bagna6msusaudqxg7hfm670jb8ffmn9z12lu411zv87e7khqautcea644ifc4l14xew0mq4pwy6d9rssg0fwhjhhsmi3zckki7ycxiz6wqd32e719icsh4x74thfw5g72ljbbaj1jlh7topcurhjw5zwa859dsiursyef2jeceddeoh34eecryaevq',
                image: 'xw0d0t90orpzwnhgcb8wpviv4bro8312t7phjz4ipyphgq7r9yj85jw9kq3m6x42sh4uld7xc802jr596xaeetkefyrsmwqrfkzceeh819gy4wkalhisohc19zsyxrg0eer5j1afg42s31gsdvfx2zrgyqc70957djpo38eerazfborospw87vme4shn0nfd8wguboro632s4bzepxysmqldrs85r2gvo0c0kvj64sqctrlaf9vdz5a0tymegvoaawosmrdd5frwv23tovme7rpwuvb5kr64t5qnh6gza2wdwc769vlyldco5jb4hl3uv5lrxq7buu9l4lj9tu59zkoyw65chy66c3xe2k5oi00e9g5ainiqbgtd4xt6jczjic8ukdh3e23w0ik3tmpmdthkjit0thzrmb9ev0fumw2qq03ks1cq6291zt982gyaftienmh57e3u1nh0peppdxii59v6p3fup6etfz0025a1myvxflbutjaf3mub3rs1d1v8d9mp8qz9natccvaxnrc0jw9xkydgo1sk925u25ucoxpagi78chi3aphyczzak6h9stltlnn5e7eeap8f600pxk6fpm5oe7rzzdnji3dojg3l8ppq58ax4cw6qlb5ei1efays3kjsw017pi20chlvwr7s3kkzdy0nico7848cixcqu49yi69rrin2gtypgbpnax87a9knoonssz77kcbw5hng7kb3tioazspebnsiv9r4a5b1j4gr0b1r5jlloptor16qu8yr2idojwo2082ja9vyb35rzbgyngm53wpp2eqoysz8h9jce7nhrza4f8x81v16pemdljp0n19dmaysg13brvl1v5b53ul2sd97xdqj3k7toun0lumrjhl6wovocw1ndjkay36ahl36ej0rn3ef2deuklsyk7un8h1mrvvh37ui63nu8bqori6hiy22atw2aaafk63u029y777ng9g839hq1hooifw6vejwq3ry9abta3ut2a64x640',
                sort: 778156,
                administrativeAreaLevel1: 'iz0k0el5fsmxslis75298ghpf14rp5pdz72x3ihtvswilewgy0n',
                administrativeAreaLevel2: '0vn4294po9uqpq716hbrixb03m6rrs5g8zyq096ojw77xyiy9k',
                administrativeAreaLevel3: 'pujg2oa4vr2a5nlrhw9rnrtuflph1c7vky9tv5tfvh4bn7w47b',
                administrativeAreas: {"foo":74957,"bar":43629,"bike":55306,"a":"A%felp!7^U","b":"-^%=m/8n2_","name":10668,"prop":"whJb*d.lt@"},
                latitude: 32731500554806040,
                longitude: 30307072024345130,
                zoom: 96,
                dataLang: {"foo":"*}6r$FO'sc","bar":72873,"bike":75284,"a":"'8+1&_Yr2e","b":62284,"name":"Q]ElPA2=qM","prop":79052},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel1 is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel2 is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6818bf17-3132-44a6-830b-ee0e5de03404',
                commonId: '95673044-88fd-4721-96d2-2585dc5e76be',
                langId: '17f8e032-5ecc-45f3-ae04-c1e3f4f99651',
                iso3166Alpha2: 'fx',
                iso3166Alpha3: 'siz',
                iso3166Numeric: 'eni',
                customCode: 'iu8av21w5e',
                prefix: 'jjbk0',
                name: 'v1fds9pptzecvu74r6826smw0xi61k27muw3ir4gvpq7wnux5ihwxwr5hwvltmbe6jpf1ba3b9h800yb0gxvu2jnrjz2bytxreilq60gqprglb00yhdsf8gh4hpes4wgbig6asif5nkgknqur87j7b1qo3k0xsaqnao38u61nccncrwv45miubcacpfft43ucstqwpat9jih6qbqigjzomzlfqyjc606n9c0asi4o4ar4mspeab27t1vpkh6jbm',
                slug: 'zn3val7knrovbvvv1qz13j75x9x3szvughsf2iwyqztca8l8av4pvgpwbc8okf6fm25d6555zn3iu487hp9plwcd3eywmvim0p51wn6q9o6f0hxkii3htd4s9jvjf7wuvz71uhuo0b14x2sa5tz3ws9baiv5j4umgs02tg8p73v7wstukbxrahnmxnla27qt8onjldal8p99pbj9plc1lo1j0bouh5eglrb5xk29td2bqsy4fi3mbb294vk8qpv76kqz8rmvyhb8149o0uduwfgv7cow3kw7pr5xlpf69u8knwyjbhncdn0c2hx68ptjnd4vjnlfvt8rjagubireuwctfj49mn8jhgyid0s2h9wpdu3h396yfzitn1i6up5zae7ld00tontrhptruc10v8vkp5dc0iatn675346mmfc5d4c4lmljteortoqvdujq4jx7rjd60gll1v24eeleu11s4zqk9zf33p82bavduposx56dvs116s09d7bk7jl57qyd90ccev1kl0u4srwg3gg0ynz6nm4mua56buf8i7wx6tmj8bqurb7jit2azn2nro4v7shf9j2k3lu4iqanupyxwd4yn338jgtym0anmyfheip9z00ksev19chn2u2o6x6tsac6yn07yc8cnik7vbzfadduq4acwtx3sfu32mz4rr4zeqbu3gtfnxapwslqjvmwbq6eawm7btp80yf6af3uwvzrofbvftbahasglavos62twnui6rlhb9tk834y81w9elsxyk40xlgk1t9ijtg1usqsskixle9leq2y1jb90aaxsg09a4cinqqtb9zi1rejiczwqoiw5jztfyiiljro8dtgk349fpuush7jlkws36a9ngpz6xf3h7a90797jut42jd1tvdcydbq0mdoxuc2fd4ur8wwu0lsvce2xfz1fywn3pu28vzel6128l280zmre1t70wkb85h1pfdgy1anoptntvvwngw29led9jf39qnfqcynxg79cvpoyqmq',
                image: 'r4atwrz0x33oqb0uv8fk95aw7if75hawforv83w79m6py3gnzcc1i37t24qcvyvdnpithborxhwtig40uvqfgl38834387tcgjgsom1pjphry9o2xhs3r4pobpsv5lbhnz0kqoriakixcotmtqfsgxsfy20of2vfb3mnowcsk1r052ct5ehjh75lpr14xvpq91hmnivmnrgyarr6i6t0vczityj3j5rmt7ydsvxozgjy7538mcce0ds9uxsxp1siccfqns7me01c8z775x1ioh8px2094tflmcmuaut5tdwr9l6ktto2e4xfqni7ze5oh2gj2762h87h1edtdwyctthgfrcvv1px0jwy8anjiore8t3ngprsw54pf11lgpdlm5zo6f74twac0fz7vl9wkb5u3ms45fn4gtfy6g3w7fxrbhf802oewe69rqjq10iikgqwqachxl1468ujgrayk2oc2lhwfg7q05fcyg3oywhm3hyvcv1kgj5mvfzyrkzl9nazg4qvfxbnkyu4la218lce9wwdd6qoshmgosjkxpnx316m5xj0rbx6c1khmiwrsxf4kyh6nhr6toexn4ah7qikrggpaf9in44xmw3ulmqqy87qwzky3flunst11h1cfzmoson5yzfjbzth6bfbdfbnas43xdohhjclztgxft1uj6qr6aechutfxyp0jhu548k6zaijdwcgktp9h7vlfwhlxd83s9m07mrzaea9le9dpxs95wtd35r4qhkb3v6e5g107hg8l6fbbc0251wbfhgxtqr2blgmdzm9yhdd1yrdbkrz9tdxihgqumcjfr63u237mwpga7kj4dw56fjpracdj2qayv1ppnco7mtggmmbpjcmdggjkp1wnlj7yq0bh5ctlrb4gqmp06hjj6s016c7qwwp6sgbtwozhgqt0zb3ieyege2npipfod3eaixjq976xyjx8qjmlzgk2evca20i3pi4ov91konn9faxt1fd2745doms8uowlet7r9b7',
                sort: 748632,
                administrativeAreaLevel1: 'qn4s0x66x4rm8iqzzs0l6dk55x1t8h9folnmg2z5mgl3eb54m5',
                administrativeAreaLevel2: '1w5ghiv97pf3agj0pve954xubhu9j3zleql6ygqzvnoei8bdaa4',
                administrativeAreaLevel3: 'gz5ymkoi4gepgwsumes550jsp1b3vh046by84kuaix8idl43lo',
                administrativeAreas: {"foo":"c1=4'h_2so","bar":47900,"bike":"c^^s%}_Ccb","a":"Ph*X#eMjzb","b":"8REz(Mp&m2","name":"$,Epgl3Al\"","prop":24837},
                latitude: 28505927748503610,
                longitude: 50001499530428330,
                zoom: 68,
                dataLang: {"foo":"9Erji_s/|s","bar":28083,"bike":22886,"a":"RxNz[kou?V","b":"?V2;PL--3^","name":18570,"prop":"Oe`QT(chiM"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel2 is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel3 is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f610eb1a-fc2e-4405-ad04-19004f0737b2',
                commonId: '79611d7e-c244-41ba-b979-74ff6113bbfb',
                langId: 'f8500a50-9630-4e40-a330-7d207ffca923',
                iso3166Alpha2: 'js',
                iso3166Alpha3: '8rd',
                iso3166Numeric: 't8m',
                customCode: 'eojbnijxao',
                prefix: 'ucrtt',
                name: 'icavz9ueuwj8i7m69eal7s933iweo3ix9quxxl2f73cgvf7bzuchvvvaveu0ztt7jutwwcg5gclxicismzsmhbqu7f0sze9el6d1f9fohyeuv1r0jhjimgvrtg6skf0hb11ncb79u9tgpsp7hnbj549lg64724bm10sodp5j7rpr7uevkh3kcllk4c4xo583fbsco1fja8yclf6osnvqxexvmjtlvnp5zkc6y3ws5dpqx0kpj6o0e9gg4jme4jf',
                slug: 'f6vmuw1h5igo3eiaarit3qztsut20rapj6y1ldq9cr280ag6yipbof1l6dqxwy0z223igfavkrxscjr9z1pdhiexcxx0oktucmhe6pwf9hxmmxh28zh8v05404vwy6exxi69d4nh1x2co4ua62lu77mp99bspryvhh27sxyg14kaj4now894q8s3l7674bock1zho3ar5qvl94nt1yd0q3n4boz9k3bfhgze1vxxct8szz7densde1s2ms3yuzutxq63r1e31xntgeor1l6bebk5w0o9p7dy87r07ldvrguii4ygpp0d2i1sa057okegi0lixk7qsh2qss8r3kv03au58p4o3btss41nr6mizg3y9il8f1mu6aiaf8z34da9odupjdc06bd8zctkd3ub869f5b13tsu4piwmoz8dnd3a3tyzdkk2pbtkt01qb2u6ifznp5t39y2vjucodh39bsjzklrz8dxqznkak5bg7j4wicm7fv26ydm3zhfqxm0t7ba8gmcx9eaivdygqdkm4obdui16uka7w2uyi805atnfl29dccnoqh8qlalfpjzs84lwyukisqjn21c3nte9vprnnhz9qm570tkkg2u6wwj2b6r09pae2ntgi54wytnwyiqtgqif7eay3lx6ybmh81tps464gsufi1evwmnhm9coslbx9cij8olb1gaflgvst0275igxg6d2fux4vkfzpr3qjzm8nbdywm1w083jzftsjmze0jm4yoxsasqod0ktoeqkkt1h3tywkylkqbt5yqntolpss0ynufrngmqlygy1sssvlag0wwf0gp60kop39bcc4g66dgeyyl36tdtowbtm1k9z9pnrnzbzuz66ezi4pcbyypx0op57ywum1je1jqc21lctpu3k9hkuu26g3n6n28cg5uqkry9kz4kdu709y5jdjyc2jrpyyuccf8ymndq5as45nnj56mlk9ebpoi4tw56i4k86km10h2wulr3izqs3nc24w4lpftua3fw6',
                image: 'jc2chrratwoef2l6h7r886qwoy9oug1n4mloecq3zt1ge6pxsdni4u05say3303hqj62ful25lm8op0o8axqhn5gz3fhnvqexjc1fbk95zhzcrb77ouitmju6zsl8kdre2gkb4i3u315zhv1caljeu0wds98s0ot2axmpetoyakh16d7km7eqnnpr959fb0ym7i5ubqbn0gj3evt5a1sv83xszcsa7qvn4s4z1yhtl69plwpjgdhh2nw66bbz9oshnnh7m8qdtuo5jwggg2pkrnzcf04l78pdhk9t8iavbql3hx1j70ipx6d06vlwrlxdii7phv8i9xlon5bhdxbhrcu1jhw32xwo85unw4xbgvnvwb3f9g21y5s7ksaxg41v78m6mxtm3dd95pnyzo55m34uc250dk23c4i39f1ccsgpyy45o668k1k6vpwdmsqvtuteqkshfbqekpd6pufgytjzg9db24sfdnpnk3xvytqp8dyiab0ouzob5o116am06ph1obw4zyi90q6fce3nosag44y8bbs8cqdj67szqaeqrva3n02q7efkv61w6v3jducjoq363jy429jmc88x7xxd6e8ta0vsfjlrxowsp3dg2nhjhwjk7zsclg3j5hb67n9nfl10uao8mizy66lj1gx938h72gep72k9x468fvfhlzf06lywdmn2sr76qvc1ivwl6cl2eoso0hf1y85qzfustxdmjj47lhr0yucmekcznqn0mnsxb4grtaocp6f7mup0o10tj6pdaos3ssam1v9zkzow1ysz4io2bzsdcvbmqfe5y60tz92jdlmzpzkdickqfsajowsz512bdxrslf1g37iop62wz8lt9strrkw76rotkqqem6gr3ohcoi7ce0rvo5eqzqbzj755t5wy802wp5maooyzgppwwa6fomn9chl9r96qepezwy3ad6qbasar2qusqyb1idqhr8fur3xx80x5k13kgtitvg7j7fjmff2zi5xs9ec7wbziop4',
                sort: 306217,
                administrativeAreaLevel1: 'u0f2n1ad6n5qibeuj83uygz8wkqeblgs5l2h8278is4gxv7nof',
                administrativeAreaLevel2: 'cxi797fpp5xq2fvdkelihq2nu8m77trzp86z4bid0t6zegiihv',
                administrativeAreaLevel3: '6d89cb77nobtdq0da51cdpf9yin498dojslmt916t4gn8ag867w',
                administrativeAreas: {"foo":"NDet,eIxE`","bar":2710,"bike":8816,"a":"\"yoKP-zNAU","b":"y?\"j,h@Yiz","name":")f=r8|,eK<","prop":99424},
                latitude: 67197401746775350,
                longitude: 10712519190719844,
                zoom: 53,
                dataLang: {"foo":57149,"bar":"J[3j\\-Cp1g","bike":43180,"a":38553,"b":50539,"name":57364,"prop":"opYg<#pfzu"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel3 is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLatitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '88916c5a-3402-4252-b245-a88d75f0166e',
                commonId: 'f9bad7d5-0ac0-43e6-919f-6ba896b7bd6b',
                langId: 'a25d2728-57e7-428d-9def-986db608ecb4',
                iso3166Alpha2: 'e6',
                iso3166Alpha3: '9nr',
                iso3166Numeric: 'xpr',
                customCode: '14sx33lrfp',
                prefix: 'a2eeu',
                name: 'ud5htc40363n7ervxujn1lbexmgecqvgmntvh43bd5ikuqcj8i8073afhytrtm099pre8hrwo3e0nocsd9eoj6ym6p0c4apt0vmxzrb5bztbb3ycy110tsafxwgwr2upj527mh11eqetsf5euqjs0l1d91v8ne9vjyqmveae3yfaisde2z198zt0pezjcjc8j9htrfckvr4w0jg1eupb3ex9h4sx21hro1ahvgutgmlwf7yjupdkg11ry06ytfl',
                slug: '3zw7uifgahjgfuofarutqq0fkb8172ilnnj47gjnl459rjaaameu684gfdrahzfui7nz5a7g5iksq17uskqkf52rjdru1re0iaf720dgviwinomirt3ghu003k630939icta0dsene4vepgv7q3s8cib3rygvrcb2i4igxefyunvwyk9rf5c2m701ovglqytp2j5z0zrlx6gbtj5y311rlccymmut2k0hkdnvz34pr4pr6v1db93n07qve656tk1c75h041qrsjviq9vwuo2hru5mk1d76hgzq72mrux3p4q6xb2syuhpx7z2u5386b2lqww5ur4z24n58k4rv1duzepmlmrzat8vr0ia67bcziaww5mk49zhqih5hcrhk9lxrvzo1s0tlklcyezfwzmvjt6ler3zm38wjy22fgg9jt2exot6ew0toix7emjf49xca7ha2vrw8u6kbwz85kvz3kdrxlncpxg5if4o458qr8ekx63ai6wpektilq7luobmbjuefsq2d21sruhr8kbctd4j4djg3uiby9350ljns6bmo1y9ub6vm4k9re19w6pysqrdpma4tv0fuqu7vjs7e147uebp7x82gbp4wfqkfw7sfw2arwlo08ybpssx9i9pnnzvm6w81y2zs306ugt6d4ypdduwou5calqv6iku9cfnk6yfrsebadyzev1z0bwoyph3xvrjduahxnl17a11mfdivmel8pkbu2e9gqvx6dxzzgb8g4n4zvjmerqiro6ibadtfjuwk2ycz32d2g1vwb90p9aibq5tpdvbuji81incjl0nokes7bv28g3vdno8ami8dnek2jlky6zyqdb7wvjfa7s0uvizd9akntfdj99niin9ircocvn7o52p0ja8or3v99y2r4cj3fhuvnz2h1kt2zz29kzbfh2giw47kzuab3vwmthw7he6xk5hiowro22gt2s1vztn6l9lqm1h1lp2o7re9p06fxtwa760e1jhwq8u81mn4atanuu14a3',
                image: 'mwhqyxedcduqdfp4nn3fy9sk0znlvxt1mmbfik5wvok5oifqif93xtwox4bk0n3afj2fs85iz2newxsm2ibenjehlqx7yb7qcbm3quo93nj64adkewiraxmhnvp9bysvxshltxkgwab06vct2visgbfdqh7oy9pj8z6cad0lr69wmgr3bi4vdoda13sw3eegjdiua02v3w2v2a99ezxhnmxdii7z4m836ecfuqvyakjcib2njd5837sq89087csszy70q47mturp272n1v1iogk2g4s9ovq2g415upglkhaun13z6sq2znkct9r5x48rbkqu05yesjbmvbr8i9nidtv3oaupwq6fco0nj779wgvyjiytffeunp90us6s4ed5no0razj34ytlcxnslkvl16pqgobwnsnf6eq6j03qxltqeit9bsawcgowq6fs0wc1er7pqskaz4lfdg5q702k8osg3hfsog9xd2w2ad8bhae2shp4czf2vqk6kiqy161z52gq0ifit2jgeqgn69b7e4d6cpqzfem16tyavyj98uzhpgcsjssk49u0qxuy35wx6jklro55bczi65dwzcm2xx91vc8cnpba74f4pmrru6lgkriljzsql3vuje8wcwytmqkzi99jxmxbocko9rpre6stv47kelaexxjsdkzarjd2ufhgm84c0966ns0f3d8y68xo0nvxtgzcml4civ4f6n85bbid44i6rdkkl83xdtzp87zvk2sekgjzywlme0yp47ehay7tgaf9o5gpcji27osd4hy0s8ec4lkgfa5lazbxxl7w0q5n8yr69b246vzt87nk6mx28fmmprsrnvqkapi0583f0fhss8yygactm4hbtcry8rqt4zrvhj0jhwmag41tvkpx4p90c4tewcps0dhk8vtjh0o1d7urgay5fi2gz8omtlah1bzixj5f15vkyba9dc2j996ag8s6c0908jvqbmf6yxsqyhu8xkxy5wpecog16tmpmpfea5ldr11d',
                sort: 283669,
                administrativeAreaLevel1: '9f2vzr0q18o4ikyq7pqx83bazri2t6494vxua4nkwr4uchzre9',
                administrativeAreaLevel2: '6hut0pumbd52oalhmrhynea1djc00flppysdvu4rllsz53r1kg',
                administrativeAreaLevel3: 'ck5exisxdt27364qy4jijp02u8ufhlnir96p0kylz442tpy9xr',
                administrativeAreas: {"foo":"Irh.'XoLsr","bar":"jfWJ0O7f.2","bike":"9&fw?\\f%/.","a":"JA2]=2Y@+=","b":83146,"name":"la?(@TNNl`","prop":"42MFn*b}\\K"},
                latitude: 690327479426849900,
                longitude: 53875359780595020,
                zoom: 65,
                dataLang: {"foo":63039,"bar":"B:z?d'5)'8","bike":"Y^[+J!bOix","a":"Kki\\<#ci>V","b":"[@d35hiDBE","name":21902,"prop":"[^`=6H83b8"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLatitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLongitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '293f0c1d-ffc7-4b9e-8a99-ea8f720d1488',
                commonId: 'd98ee9c7-afbf-4dae-bb6a-d2d62cdaf814',
                langId: 'afe342c9-17f6-4a71-aedd-69b2c9a327e5',
                iso3166Alpha2: '9c',
                iso3166Alpha3: 'fd1',
                iso3166Numeric: '42b',
                customCode: '2k6coot6xd',
                prefix: 'oglan',
                name: '2gvunzpr2t3quo9a709q2mrmwdjmztivxtwecro7seo01dfxom3x0snqex9ih4mh8h46q081nuc2e2p9du08mpf4j4zjalzbmf64bj4ffhu026marmk83qe051h42g78r9h86kx8cf9yqxr0h4xi4qv96ibh0c4j77ejgkbet9iezbmy3o8sd23g4pqf4i3qzpmnl5z0j20rm2qee4lhe9075s8bugz3q9hrbt6r880ynp9r3buuhok0oc133e1',
                slug: 'njzg7o515ue9ui0hg2ydmv7jpy3qr59jmby3hkec81ht0cq3iux10trcnx8xzoqx6wrtuc04tjk3m85tozcpakmv49kj613dlwl7r8odnpuusr5jcy7l1sjgmc7e7w26izf0advzoxuklsn2rs6a5asxrx2lyfjmq7j1ga54w2l6k0jzc78esuzu3aqj9gw46ejrfdai3udotog1bu7jnnjofwn2l7m0g4zflgnk8cvhsj8tbegd08r96xoa83knrzct94rcgg1zslxu41knj3jtmmzc086epnut2359xrfp2dg0hot8628t7qfwcq69icho52srcpugtmdgrjxfmb21ut3hd3z3a9hwlp8ljs8vyk0ja0vawfl8ecrus9tupltdfyrmdaoc6c3fjtg88gq44qxb4judc5rkyecedtpkrtryjdkcjlu74l2oedrwwvtjenw8plxp16emvr8lwkd0fnlramset3lmugy3a37j7b572oqogfcd5mpb9hcknpm9k1976f69susnjh73uzim27aswr3l7phiuii6ckfz5yg1exq8o2v0i0aj5i30q7pvjumlyz16xgmjekoxsmu6j0njgucpxp86jxhpugc9d5s7wus4dh3pvqx6indwbbahcbxhe29deyxlfcfd4szwa6brirc7wk1yweux10bzn0oe35k2ih2swx9z0lvks98n5c4guz33d183wk62n1t0sljyrduxpk4kfsqeg7q7p6ki2uqmgsjjktud2lp93hjqh1gkdhyh0nrhks68lyd8s6j3bo7w8cpyo1oq2277xt8vpxmuxaehmgnyytcsgg823p6et3lo6wjhuhvs136zvbbapeokvqiq4n96hhn89h8b4ouhngfmv3fx8fgd9nka46ixr2c992d32h73wqze2yw01x4uyn2tla76g6wucq7m5wk79wuow2meceehb4pdfo1u70g2tdmzgun3h3arsrywm0tntq680zzid3e5y5k4z9c7gz1li304auk9',
                image: 'cgrzqlcf9pgy7cg0qfmvc1y05cskv301vytzs9677qzp2h5vge33mpa8kijrg5dh3taejixwio8h397r9tc846kqm49agbpo8fyvdmkwt0dwr5qv7hga4r92ihefcwjt3jeirr0ezqf2ma6wrj2wdwzdngc912zq7nbslr61ptmlb6xl2gm8i55l74ifo5tn4fp49tzqqdpa4gke6mwcjgdcfevirct2z1a1kjo7aeiaak7wkosh4lsmk743l2ggqecegu7mknmd9u289gj9gfyqnd5y1yuzd2bq0vej7pa1bepe0rozvno8k1f0rb95o0754angfthd78jloq5g1ub6w7nnm9yhgevf5gs5n3nb0wwsczru81ejq8ir9srprjgz5rj9mfgt86bj6dkkzp1z1g6i0eq77n7j35tp2h66y2ftn3ygkbsetozutkdm9tcc72w9prj459g53uukuily9x1rrweezaz9wl2umyx74q0v5rp0ypavk9t78n7t64zite0uzr1wwqi2veu0iubq494c7rwy4evv226wrq8xidospz6257bwqrxiabedixamiyf08funvwz9g6r782t5cjez1lnyjs7t8x2nr5nrwfganbkr5yxj9k8zr4q3pvxkgxmjjo30xikaad7kamx99h4xiipeddqjnfa4yf55jh6qwu65tsd5iuk5638tu33anxh28xedugicvvmklk7kawk4umkkkna4zxyxfqg2ie1up7oux3e901ow5fls07wnmun8wj5srxpc48j6vrlxx0om8pmlyy6ie9b9t3v42ty85t6jeptwyvhsi6mzebuefhx3lw2uw11v6ttdfb40owskbo6x2e3a2ri00eo12hidzc526b70ycun7j0ofo1ijz1hlvwoqoszy84sg059hhwcug073pkb5mg1259rr9x1hixar8ff3ovt28ckloa4lg0a8s58p0s3ltd5qtj2ee2nkf0npd9iruwh2i2254fkj2wh7j0sf42dwjap',
                sort: 139234,
                administrativeAreaLevel1: '2ifgqxobnecs6zyixgab9wkpedhrc9h6656h3sqz6e049igqv5',
                administrativeAreaLevel2: 'etjjc6odwrh6jmk7aayxioy2axnq957f5wjvxnjs1mzot2dif1',
                administrativeAreaLevel3: 'zsog9rqa4bz7g0xzn8pr76cfqsl4dhygahn1waaphkz1xagkz0',
                administrativeAreas: {"foo":82751,"bar":"nh`>CJ,iA]","bike":92707,"a":43015,"b":"^3Uz-pZ/_6","name":"#9`VuLeEjw","prop":62271},
                latitude: 99954160114376160,
                longitude: 599602571984945000,
                zoom: 42,
                dataLang: {"foo":"h\\yhfF3`td","bar":"!>U4$PtF.a","bike":"2>{^uw<:|`","a":"W==:(.OnT<","b":71225,"name":".waW!*+#.w","prop":"\\CcV`I!%|c"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLongitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryZoom is too large, has a maximum length of 2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '509a444d-e736-47f7-97b0-69a6f3317a7c',
                commonId: 'c18170bb-34db-461b-9d0c-78cb47e1cac8',
                langId: 'ad99c15b-b1e0-4f42-8e8a-be6966d3cf54',
                iso3166Alpha2: 'xf',
                iso3166Alpha3: 'rgg',
                iso3166Numeric: 'mb7',
                customCode: 'd24h8aqm8q',
                prefix: 'cxa73',
                name: '1wo48hx9vwb5pvf0se6i8fxtm2yd4qg6ogfgizb2jpfchtkzadqiwplg4f39ofyansbe2lsvou49ruj01tfh2uoqqs315lenxec0fhwhv18brzwm9wc6s36ii48yv2i90hovqdsjs3fy08yy1cjgzcdij8wm79z7eul6dye3hjc2hnees56ez20s5mz8kfocv81rq5hxv1fdxz4y2eo8mgarajc6gx2cf2bicrrpqrgpyk514dvxrpmgqnjngy7',
                slug: '2w132dbz02f99q2z84wd8lslz0nnvsfczg5kyva6cmsv5wqtp49p8kyore5gmbk19qojsnr1ko2qob3dwfkomofsp5f7q7act004urjgyyvbelk8k8th86fiahwypzjdosznik2bojd4brg0jj5tmrrir3p6pz14diat6vjsyphudx85qwjp6swsprlvu8v2rnfi0k2hfs7tsaerrmt06avb1gsytci031injkbbs2nwq7dv0mmetwmylow659m8zpohddbu1b1yhy79tzi4s32ee47o6ee34kis5954k4rff4gi5rw2vhi745qlsjvd6449209juji7z886jkq1a0gnqr7zxjkrr8hdobkpvnv7kp08qhsogj093jl6np14xaprryltymllhslmo3ye24dk9d9wmgjh6xlwbbrzn01c45y4y3k25yd4p5i041ys1keavuwc2ijzpc62t5dd34xsi8c435ktuxxran0yx9ewnlw7l86xpq6bg14o64d7ff62fpjaoqezsge7hrzve85mm29h73nzjwidvbfyp4yeb4wg3xz8yqbubhrsyepgcp5pcztf86i6xyen9ft32kmunbvf9mji1jpsms4x2f8f4wxgxyvxxazl61rqtmp4ctjpsvnsvr7wvrw4x1nyo0gym8vvs5twjv4iah9vndki50cozn0yfgqxexh7ayk26zlecfm2cm5jkz97eyeim2f51ey7gc12gu509rwlvn6z2z1jglhlgk7i10bgvmp7m280gabo5h0odu0xfk7tr22g67igk1qbik6ro5i4w8dtzkmiv2h9kcjh3j9rtitxnmzwjl1rb2hzxy3asyyvtv4a920hea4r2zu1lm1cwrtzc39gv0o8tuw0597wxaufk2l0k91mxbrnq63i5wypoulrk5ayhbscz2owmph5f3ig0myy5eqoqmp0xfalnhxc9r7710mde1gehhlri7esaias0fugxh2d7xv3zfllugmuo46ui0ci8009gtd2pvg6',
                image: '1xfh8folvg9r4kgoag88ss6fb6x3p7yyryr1cs0ekszr3vkp4i3ekwgagecab4mdpasgfnql8i0pv8bpq1d4w8p4h8uoqqo00rfrj7vb6z8ktj3a8q85o01j99g6xnhuyl3mb6s41yyhs5scjyz61v244x4fydqjk9vfwpk8zwqltwjf398o0bi0buh65v4cx2znjbs4ibu8v4ewbc8wuadocloaa8hfbzro8t3wwkq8dakgas4q7gxw04gap9rxa48pxujiiyboee376gp73e2r80vnw73zlpqib0ufbo2ure4r1r7s345z9czrsna7sjncukiwhysbxxcf4dubhrrbqg7s6gq59fc5u24rdmh261i9lneqn3yzopllz5t4xlrxkit3qu4ccc9rf3asl9ct7jx46dw3wf5wnlkvool50te5jbetvq9tgu9j3dnlem3lclpgccmxefl5k62hrcybwoopjwnd2nu2cmsevg5o3ncj8oulop96alpxh4308xh4u0f5s72ix6rqqb2ttdtycncr1d6kdouuo9kztg5ktnl0rbra029nlnmsdvq531o484p4lgtdze523n19nstk95l4zqwt4d4f2adtyh3jyxyfc7qxfaesxxw1a1t2i25h650litbudn1eqlbkiqe0v1rqds1tj0y3npq77ln7ldlcc8grxm4ygs22pf8thv6y3ukugvznwu65c6xfd5n588wq9igdsnxqr0p7pef0tz4qvuln42xbk4f4vyvuj5rcl0meprujz9yr6uvmuwpkp7ae9gwb7wv1tzzg3nxduj1o5s9otgoytf3gwom79g9szj005e6j6a1k9eufte7kqgbyabplavwtmuada996dzes6217lgm32e4q9o1c14jp4vbbs6h94659z80rpleh6979rr1f0sjcz4sqc1y9xt78w7slppkyf925l5wmqsdaw91pbnk0kgnn3ey3hpc5rj57lj78kuyw5tza8l1f84a570rk3msz74684bf5',
                sort: 186435,
                administrativeAreaLevel1: 'vzkmfpxmzjxo12zzphgwjiypsig75n8bo4wlhma786tdss96r4',
                administrativeAreaLevel2: 'rzdl09am9x3g0sfujjn3iiukkjppw8t9tqjtp8cag3vd4uoom4',
                administrativeAreaLevel3: '7tqgu031djgol9qn0jfyvel6pmtagxx4sdnoz9paeo4jznwfzo',
                administrativeAreas: {"foo":48033,"bar":"5,/hoa'bQ.","bike":"QX`&(o+8}E","a":35560,"b":26427,"name":76865,"prop":35268},
                latitude: 76959556233097540,
                longitude: 66424923220651430,
                zoom: 421,
                dataLang: {"foo":"%3h]}^[lDQ","bar":"#eWF`u<|`@","bike":59023,"a":45618,"b":67103,"name":83877,"prop":"RK\"K\"Pxmr,"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryZoom is too large, has a maximum length of 2');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryZoom must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3448d137-6ddc-4318-9534-e5ab2ed72048',
                commonId: '2b59d537-1be5-4d61-afa5-74c0cf26e631',
                langId: '91b0562d-26ba-48ed-9355-057cdc4a4ea5',
                iso3166Alpha2: 'k1',
                iso3166Alpha3: 'mub',
                iso3166Numeric: 'sjk',
                customCode: 'fwq8appvrj',
                prefix: 'jqzb9',
                name: 'x4i9nwkusrlv6tuylw9ij0oqtmhvb5758nsjeqvqnvvspzk2mroclte7sopu1da8uckkr4wh56w6rlezcv289hh9jkawcdltkykuvz71m2iimg9uiugi9p5p4npnht9k4sloeqwq6jfivaxr7ja5cwtzjv690p9j4um8yvmrvlvwwn4c53vcv3pqpyf2ift7r6u64rc5femoh8289a44ayg41m589s4lddspyxj0l4lbr7todiorcurvbpkyee4',
                slug: 'xrjovcnju7p098hww87qxqk3tuu8sny1p267684u1ytsocv5yvnau2l4wq2le33sli9j6fw9a3t8bvhb5t5k4xqq9k1w5ghu3ldwhmzoz09kd23iypy6nvybxvme4rtk0qo589beof4k20ayueggk13ubul7odsa2ki6lqw05nylv9yzmf0xuy4ummihvwn6z66984559yuwrtkrczjz4rlldyzsjdwslq2ctces3bjpang0lk9ir9928mur4y60b1dqhqwfdp2a47u48onkhb3h7839dp43lar50d4cowpceb6i2pfirqy3ojjjcgz91j1t9z6l8ljuj4eq6ml5vqfmdqnqbztirg9aqe213x8c1ug9xsmfsde72u1zu6zr0erk1usyx05i724bypbzkblplw5ytsox8odvdv7fi7hgo30oqnz6y60mw4s8qmfn79ea53tzr4831dth5ds1x3p4idkpuq6ddym5ebk4ll48o19vra1mnh4x41imlfj1zty0ievg83tve5kmnjexazzzrlp7hiu3lktjmggxqorjf8aap6kkgd69epkc92bdy0zirbzgdfzs9eycmv0b1b3okfqj5mqunadyjlgt8410p888bijjoztvqueg6pbw94va5odu3miy41ilgbwks3b62pzla1a2eikn0ttvlgb8lfy253rl2c7ixgjyqvcq2r4z0qhvdh79pmml5wzrpf6bhhsu55ukjagfyw8yzixmu7awysjl3zi2ohmhiubdn13qot6pyna1sd0fm62srq7b0emecwe0q6d1rzaoyjs0l1djhbzus0cf0dl4ll47fm7k707pfadvbc5lilmng0ivzf8t1p7fvk2tihe3wqegwkaffb5fp89aiw9pnsrv8bjbwmyt1o3rgb86zn788z59d9xp89q2wk6q71b1tusqu6i1o49b5jatlmcenx55ofiucjzz9y4h0siagxoky9v5eaa9qum3rm3a7os4zrmub4r1m3zt419xqp8cqfxt',
                image: 'rdcpq1uh6avns03ybmezsymlnnks2nntv2ux0hndnvcofhr10auqwepkbj5d6so1fe472q7rxgww6no8nv0c9bftiuoefy5x6bt0hk5zyaufrxlytf3t9eltu8ea35auh4qmb7y18xw1aiig95f3nizvu9ivkyagc5nt0iwtfu8u6zvtf3e0kbfizeno33qw5yacd2glat9nrf80umnmpzvpboqx2fqicdbldem5udfyn8dsd526r5annosf7dj4n1cr4hvsnwc6ujsuqnn6k9mq3ucnadhcrj1i739llsv49zuo0z4ljd2hf3ori62r9q0lp8qv4v20y4c2p9k49gqa5oez49ejltxj8z5mqgtk7ruxue9nw3pfkmzyrmjomd0uask0cnc2p0oom5e4vcj4yghau8737iumiy77akf94ptpxskula9d10ib5m5o4k46ivi6fwijeg4y5jrf8luaw8u837ml34b4j5nurjjst4lap6ledfczfgsvfc0405md2hy3csyp0yyjb403tbfpqnp605c057ytsp0zed4tgouqcjxp3hq1kn3p73ns27kkvesb14g6qy024zetb18g0mqwbykg01ccp1e9o95k0fho6e4w5fj6tr3dr18ig4621kidfzaqzb9h4hn8zcks6692ff99r8n8n2xbq54k5n2kbvy6peh500yg4gqkrop9b2qcyftssl888qtmtmf0nd4se5a0uji7fiizw1goyl7dst9uy016ijp8n8sf54xrx6lkfh03o0ddcoycs69cg4nysfvq4o9dso49rk6kfxth8u8o882wa7h3xm7p9at3oc4lk57c52vu2dz828um1fegfmle6xkeltb2awbglevzl9a6mdiji48dh664jcu3ykbk7acp6g9s9ozy294o9eh7tiohpnc90dc8kjj1jhsvve1ythdq6x5y5yk5hnk16bs9qs23972zixtc49mqs7wejk4tnnu10awa7xykjiolmzr000jggmy1qzcb',
                sort: 266053,
                administrativeAreaLevel1: '0jlca2x168twe7kxenbiatfvu7m7czhxsj0cs9eri6je63vzha',
                administrativeAreaLevel2: 'qilthv17jswapyqs3ktzegjmemsm8alwcvmy9pnlw4cp1so3s6',
                administrativeAreaLevel3: 'cma6q15s6zml2gcd2cl7a0f6u2idxeb7jzky6ggnpj2geujkyn',
                administrativeAreas: {"foo":"/t-m6#}F.X","bar":"#zC*<[mt&]","bike":"wfB+`(&]BK","a":83786,"b":58336,"name":19591,"prop":2690},
                latitude: 86588876370173490,
                longitude: 95237587882477300,
                zoom: -9,
                dataLang: {"foo":51238,"bar":8958,"bike":49079,"a":56585,"b":"[YdR&%yO<-","name":58616,"prop":"FhF/b2iLLK"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for CountryZoom must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/country`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                commonId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                langId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                iso3166Alpha2: '4i',
                iso3166Alpha3: '4iy',
                iso3166Numeric: '4iy',
                customCode: '4iyw9pwsdx',
                prefix: '4iyw9',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                image: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                sort: 399826,
                administrativeAreaLevel1: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                administrativeAreaLevel2: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                administrativeAreaLevel3: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                administrativeAreas: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                latitude: 27646870899597136,
                longitude: 48493422689653300,
                zoom: 57,
                dataLang: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(201);
    });

    test(`/REST:GET admin/countries/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/countries/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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

    test(`/REST:GET admin/country - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'e0a9fcef-543b-47bd-9225-3b0e30b1131e'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/country`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country/8dec1439-dcf4-4fd4-bc5a-d25ca49c0ace')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET admin/countries`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/countries')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/country - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                commonId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                langId: 'c5a9a341-abe0-497f-9b71-d1e1b4c58473',
                iso3166Alpha2: '4h',
                iso3166Alpha3: '3px',
                iso3166Numeric: 'y47',
                customCode: 'm0n2f35cvt',
                prefix: 'ol3ik',
                name: 't5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6',
                slug: 'flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88k',
                image: 'cxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx',
                sort: 916283,
                administrativeAreaLevel1: '18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofp',
                administrativeAreaLevel2: 'xqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcs',
                administrativeAreaLevel3: 'cxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog',
                administrativeAreas: {"foo":18783,"bar":92335,"bike":17784,"a":"{ON$Ba\"|gs","b":"RUUP:]#x;H","name":"M'nli&=h(2","prop":"rMIV__Y@F("},
                latitude: 15746863471864324,
                longitude: 78181723383059710,
                zoom: 39,
                dataLang: {"foo":42584,"bar":65973,"bike":93192,"a":"EY%sAaFUFU","b":"ss$TTMi9o-","name":41979,"prop":"DBD\\5;(9db"},
            })
            .expect(404);
    });

    test(`/REST:PUT admin/country`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                commonId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                langId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                iso3166Alpha2: '4i',
                iso3166Alpha3: '4iy',
                iso3166Numeric: '4iy',
                customCode: '4iyw9pwsdx',
                prefix: '4iyw9',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                image: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                sort: 656172,
                administrativeAreaLevel1: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                administrativeAreaLevel2: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                administrativeAreaLevel3: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                administrativeAreas: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                latitude: 40889773904729864,
                longitude: 34403397965504988,
                zoom: 50,
                dataLang: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:DELETE admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/2ed6a696-b294-4c90-b385-336f67a8e23f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateCountry - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateCountryInput!)
                    {
                        adminCreateCountry (payload:$payload)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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

    test(`/GraphQL adminCreateCountry`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateCountryInput!)
                    {
                        adminCreateCountry (payload:$payload)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '96b98829-985d-447e-9136-38bb3c8056d0',
                        commonId: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        langId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        iso3166Alpha2: 'sc',
                        iso3166Alpha3: 'nln',
                        iso3166Numeric: '7a3',
                        customCode: 'oqw0khx3oh',
                        prefix: '2u3w2',
                        name: 'qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus',
                        slug: '3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3',
                        image: 'az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc',
                        sort: 542038,
                        administrativeAreaLevel1: '5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9hbt8tv3vuko4ux',
                        administrativeAreaLevel2: 'vvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb',
                        administrativeAreaLevel3: '26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44',
                        administrativeAreas: {"foo":46951,"bar":"Cl##7N\"*fi","bike":88815,"a":79394,"b":86503,"name":12646,"prop":97020},
                        latitude: 23919057174676470,
                        longitude: 86473850761935550,
                        zoom: 59,
                        dataLang: {"foo":"w<g=waJ12?","bar":"J1h{ON$Ba\"","bike":"gs[RUUP:]#","a":";HiM'nli&=","b":"(2^rMIV__Y","name":40288,"prop":30952},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateCountry).toHaveProperty('id', '96b98829-985d-447e-9136-38bb3c8056d0');
            });
    });

    test(`/GraphQL adminPaginateCountries`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateCountries (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateCountries.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindCountry - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindCountry (query:$query)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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
                            id: 'f57a9cbe-84fc-404b-a2cb-cb3bdd973184'
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

    test(`/GraphQL adminFindCountry`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindCountry (query:$query)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountry.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminFindCountryById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindCountryById (id:$id)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5fe6d1a5-5dfc-4bde-b93e-6abf3b70a706'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindCountryById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindCountryById (id:$id)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountryById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminGetCountries`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetCountries (query:$query)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetCountries.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateCountry - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateCountryInput!)
                    {
                        adminUpdateCountry (payload:$payload)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        commonId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        langId: 'c5a9a341-abe0-497f-9b71-d1e1b4c58473',
                        iso3166Alpha2: '4h',
                        iso3166Alpha3: '3px',
                        iso3166Numeric: 'y47',
                        customCode: 'm0n2f35cvt',
                        prefix: 'ol3ik',
                        name: 't5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6',
                        slug: 'flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88k',
                        image: 'cxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx',
                        sort: 158879,
                        administrativeAreaLevel1: '18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofp',
                        administrativeAreaLevel2: 'xqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcs',
                        administrativeAreaLevel3: 'cxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog',
                        administrativeAreas: {"foo":18783,"bar":92335,"bike":17784,"a":"{ON$Ba\"|gs","b":"RUUP:]#x;H","name":"M'nli&=h(2","prop":"rMIV__Y@F("},
                        latitude: 31247651200672932,
                        longitude: 99742420240719410,
                        zoom: 36,
                        dataLang: {"foo":42584,"bar":65973,"bike":93192,"a":"EY%sAaFUFU","b":"ss$TTMi9o-","name":41979,"prop":"DBD\\5;(9db"},
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

    test(`/GraphQL adminUpdateCountry`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateCountryInput!)
                    {
                        adminUpdateCountry (payload:$payload)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        commonId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        langId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        iso3166Alpha2: '4i',
                        iso3166Alpha3: '4iy',
                        iso3166Numeric: '4iy',
                        customCode: '4iyw9pwsdx',
                        prefix: '4iyw9',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        image: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        sort: 687319,
                        administrativeAreaLevel1: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        administrativeAreaLevel2: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        administrativeAreaLevel3: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        administrativeAreas: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                        latitude: 41041062327181656,
                        longitude: 29877698450582452,
                        zoom: 47,
                        dataLang: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateCountry.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminDeleteCountryById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteCountryById (id:$id)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c9654f49-260c-4673-bd74-4636418e3990'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteCountryById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteCountryById (id:$id)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteCountryById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});