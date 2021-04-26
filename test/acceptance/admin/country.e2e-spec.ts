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
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';
import { IamModule } from './../../../src/apps/iam/iam.module';

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
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'wa',
                iso3166Alpha3: 'gkp',
                iso3166Numeric: 'ehq',
                customCode: '8gp4kor1yg',
                prefix: 'kr1tj',
                name: 'i97u79dg3sz60lxdt6f8qnsucckn1yeqd3ordz8347r0mwo0cf7i5ii5z7bla3k7vv5azx9qu0qlsruwsr7q1v4bsr59a7hfju68vt5h2nags7o5e6cb5gtwltmxbfuyh37thc2lw53c3sqexpdw2r8e1pt4w0motqnomubngsbfnswz5aqfbplfiqi5gf7obp5ovf7z0dob1ktgqel5rpwzyy82102lmwfofogvricrr24a5jl8vw701hk8j3a',
                slug: 'lc26d1x86fspgnh9ydk4r195e4xeh4gdnzaju40u6cuze8566bgl2kzggm3btvcfpn4v7dsontedxux51juibbio5pwfgj7wcfgeh94vlmnupyzkar4hw9dtdso1h3vjistj2utgxkbiiyty8z8dwcjp6zaqjean4tszpkumeesiojgevjp0yek7zohq0bgu8o4wv0iqjoh12lp41zqthuy5x1i3s0gktj7ov604v8l0qagkqls1o0dru00gwyidbt4iymo9qhgwi12rvstt8axb5xcdoyrii31c5a5bimzjymi6eres34g873zg2b4ponjloi704pvipl97h93s7tbf18k02y30fehjsd1zz1g9kdalk70k1syb9p67zphhxjkgft0ka84s02cztikjvjetz73ntfbkryl5f71i1cg67aqz7bpj5nh5b0vl7le7uncx4429zl12eowgonm22udwp0l5k3ligsin26qfuria2f8abknti02yeky67246q2y9horksopjot20w15deh69dtkherc97vx3pqcud91z5ic72mpbhtagwcdngl2lbl12fey95ox61f1al7zx5p496x8in2fbcreqesf7xl4u1bc9j2e1tzs1kby539zsizh99r1wyfywh8ypf1v6zr799smwuenjwfz2dlsq9nxfgxg7k9g8d3elw8iouizik7rwxl8erjwsje9d3iihwgyv2yjzb8fgizufbeelrxtvrw0g57ma5i7vvfurtrynb2gcejhuudpkhm886uc00yk66pbl4eg8wt9ps4jzpkjun4izsvye5dqzkg366wqm46pt9i1z8eqyrk7ojzza3b6qw83445r609xlxscdxtw3t763dlc0is7o44m0x1dlpseszmmtyhvzv0exe2b4o5hmcftjmhuusxo8akzuvr69ctpharyilm4bn6czx1door0vto8gc2my9rafx13xmze4w90fl9sie7v0jpa8bddu0uga2h83zxye2fkw4kxj',
                image: 'cxpzxpqzzknvscpgtnjd86ms2o2snkozfjfkkr0bxegm99l6tzk8om6wcw7tkjso3zjh2pdylhv73uhgln0nqomvubxdtrd6jumz2qxm771ons1y3jco0yqvrkxbu6ktxz11q27v0i8zr9duzp2gdekmkw73kmq0wnshn9avulqyexicqu7bn235rm785m0irr7qfswczwmn2dej656mkdpf58rgnui1gj8ivofgotjw7uvz2tdoxidzhhc3muka8puquf7yz8yorikbm8sisns8uvzjlxa94vmo558bs3wrmuva4ifq1oeqcqtgcfxbz2zv1d47okg3wyxmm38cp98163ejbr6pudnluptqvfyzd8kgxme00qlr0ep3x7oqhh500fcc1hjfy2vowcenpx003tslf64kh0hswjqp5e95sa5gyxnd8ku83yk8m4bp4rldww74u1ct8irjxrc83g5cq1c8dg7178hqd3siduyl33xm8mtl4z9bkgcgggx7hvmkwdvjy1k3ovfzp1utnl9awr46avigraniqhry7re5sfyetgd1ehkne2l97ryh0pnlvodpmcozxx76yzwkwkorbmrrour79dfw8pnqnve6v9o2mag8cxr5hcwgxmk8lwftbpje3qk89zjuj9i5msn91hlw4p0b4bvlyggvnfei8s0iuurc29bfs2w9bg6cxo62zqz065ncyqu4lbvschgbikypgpqu3cp63n022z4clexsrr3lls8i0m67dyti4m03qy8g3t5ogopy8g8nhry5amwgmfkvs9n0rqy8a0lsdwdmb71nn9783eij1ecedufxuyodqn5povy38jm1t6sq5yjc0bqsqc3glij9mz0or9cz2oyut5cd2699chbpthlvdbuiu0vg0crukix6w2v4hepmcv7wo67hlua3x8b5d1f0a09gdfl1yzdnxfzjg8lwzcppp2csaibasle83ngy9f62v5ohwuk41a1zf4rgmrykahn26je0be0d95o3',
                sort: 704859,
                administrativeAreaLevel1: 'amqakkseybokxzxrmdfr94bx8zq2prcdv6sh62rmyuizdq3z9b',
                administrativeAreaLevel2: 'rfbledngedcbti5fm0hhru3kycp051g6ku0slfn4g0qpwm63oi',
                administrativeAreaLevel3: '38nmysdiqb2enx9vobypyik2cs165xnp17c2nliy0f8zh53iex',
                administrativeAreas: { "foo" : "bar" },
                latitude: 711.84,
                longitude: 622.25,
                zoom: 50,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: null,
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'oq',
                iso3166Alpha3: 'etj',
                iso3166Numeric: 'ykm',
                customCode: 'bds7m0gvbf',
                prefix: '368wo',
                name: 'mca88ic9796g2579efgd8u8rzhz6b7bvt08kb5uma3jsc24git4y22in6f6ejsq63bztghmmdzej4avk31jn6teo2vmncfj7p2ah76ps8ehiwaoogq63ikw2kpabdzpszmth2gxc5asd2l7liyfcf5yth37roa3eak180rz32p8t24ihe2lyjc12hny5v3g9rbddoilltovifjja9doucwn4unkdx1ug2et3vhannpz4pe7qvc952z77dathdpw',
                slug: 'oxgf5f7gypnd5099jsei0qysiwne5bdei36gmdise7jw43xhsbictmdl0v1uhx26kv1c70dyk0zfvbkwiawa9ne5r07rkke34n99n0hj8dz8fzp5vbj93h07gmbhr066kulwxwm3ubvltm4pmm8rz803v8ow7jb26ofqz1khwbn4jdy0xsa04gvh0wirl2p09xwbwpim8z40ztl9qg2rv1wegxqmjvikdugkbyhdd9sozlznidczbevnko3vu29gv03ws432c1pqnos6qnc8lpbo424s95ctp6uf82mhdo111bxws0pgnsyx1z2pn6c7vhjv3uowg5breogiq3ap3s5jo7kzcng5bf98q2060ezfb0ro070iwt1rvv1ds240vucxm1y4g7qlhis7rejn4ybtfs3x2lufnbmnvsqa8fc4k1r8wovgf36br7cm2nj748auhqr3eb7dxvfssfskw7d6ryr3dyqy55lmlwm1jzua3eie2dx7uluq3wwfywk2tfq8it0gtdt7i7j0ue1e514v8qh98latlnlj9s6aaayxgjcyc6o1kpiu8k1dion8vj4y3jdwa0y94l2ia7y3c9mniyjlqiqj7duxcu8x27k5wba483ei1ji3rn6vd6uq46oninbw0ii0p9l8bomm2b9f8fi8zwsitgetnz77nlv27crhvws08im3mrj7tsq3boys08rjf7wjnrued9bmut6kahaxrup3rpvnqyxtsqb5p3vtlrrp1dbdhnym0rzhfjufular0r7evn38rsq0bikotq19784ri8pf74pmc35pohq26ppqjcvrb1ocfe0o83p2ig4ve8kr4qr00rfpzg5o9m7rfyaey8m78ob87kg5y9bbie6tdbnhggqme28w8m69a7slywbkxgvp09dak4oc0ucw7kk450wi2qvq7l2phrw6l8oo86lzqioew00gfvf36ih1swixg7cfpuv46r9897415ubunbpkh1xne8rsf08132wjfe7o6ivfc44t',
                image: 'h8fx1i1scfpr6wig7h1o1fydzj3iqosefzpwlpvs27v6yjmt23ooewsbfzva2zz4st5zyrvb3anxw709h5qj1n0rlxtvjcbtofhflg2uenaukn2zccw0pjpsgsaamrlhf2fjqgsbp0mcnvciacy96fyu0pvigx6u99atwohaoko9e0wzjsufx14gjdtqujw6sm2l9tjrufnsdk0elvoy6ikmqubus5ioba1x2meot59fwd0vsal3ycf1fq3ha5wphdl3gd5in2ulk18tvrxuu9icmhgmj98bjct5v44dskx7x79k611d066f3yf4szp4xketlqapfhss0g22bvqqygzjxiyedoaqxq9y49ja7m5ksqx5jsn8iykc1pxa3aksqae23qatcouvpxz7od0a8u4qap488dmj3kepbxhi0wk7hrm2zfv24th4d6x0n447g9drv4ogz45v1vc3lu4w7qbsxbmfwfhoqble8z9yo9csbgdgloaelmdid6a4z6cgqwqaevbm3lsmmgfe8evydetai75kloqhstt3yhdxn34oj9u8v31xtfnw0vgbuvkofhi6zaecbnr0bne7fvhbcfyesyepy5us75wjys1jgmffmvgxbyf69oubxx8jo7szszfz5vik220x1sxz2ttwwrcihzwg7sprbex4j355q8my6wlpiyv45hzjc13aqi0win5jvntu41sracq8pzsxex2tx18900e5r6mp7ljoewog3ak2za4z4quyosgb7hrtqthvbj9cpnzg6mkn7vb1bcfiyjrn5ld6xr2fd1rgjb0ywhqj3w2gu4d1356ogvirx5vpyllqeep38ck2722fg2lyu9y495ha1wijewrh9r6znmkf4sac7cbig8w620t3v5vu6oivmv536yks8h03xphqzd3vsqo73h0mldrl809a0ohk3qsduuucuhzehas5u5v267co6kyjn3ksui3jgcceg673c71rnbc8lv2kakdu35iuu7467oq6tn2uer34',
                sort: 483124,
                administrativeAreaLevel1: '4p7re3ihhxy9nglxh8aevuqieku4u8eoplkozj1gfs1hkntwn1',
                administrativeAreaLevel2: 'jf83tnykc5wslwxtpwkrncdqcazw6hs8r3ofv9b2ceq4wyfpg3',
                administrativeAreaLevel3: 'ixnrv6nhbeayrnh2xz5d7w84xqxzls4r0v6cslx3hxx5oee6w8',
                administrativeAreas: { "foo" : "bar" },
                latitude: 975.11,
                longitude: 25.59,
                zoom: 45,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: null,
                iso3166Alpha2: 'kg',
                iso3166Alpha3: 'zf3',
                iso3166Numeric: '7u7',
                customCode: '66d6m1qkv3',
                prefix: '2c43p',
                name: 'y4pm2f9s1kbu9d4bjldjl8f2tmkrg134xj5u1vowenwh5wmmy8niah3uqtu3w4xvkv0sitsrf3xl103jh9zw8z00equfp6aw9krrfjgzbkwrznjl14r2amivg79lclgfjnc0gi44g91kqnwcrdi7h4nb1hlp6dduc4xkcqk38463p2mfoxtees1qfwylwlr92f7y07s9v83lfjjrom50pb2erirsgqv2ug882ermxv0ol1fez9yqey9bpa6857o',
                slug: '3ccxj2tk2rt89rk7pzbyci6qxh5utadcuxll2827du7ay1uxym3avpsg00n260tggy8f7hpgkjf5mfe1xltjisyecos0ystmqo0s0xyih0ofgfbgkcucjrznhi30fbi9a155sy4j9vsr7cfhtiagnfyz66mal3k4s6tuujnublkz2r2ljbgdhfjaakm8m2zzg5cqezktrnmnpvechfgnzec5o2vgacaweu8uc08a7xdunnibs95u0hwn8po0e0lf576si5sjpdadyc8dxsovig9naif63ouajzc0mvsotga92wufqgid1l6ymhe5a9vdszwf5vzq6z6iw77l8tgsk21veun8kmc2jagywst1pugw068pdvxg34t4whdo68vbxb2mzlmtks3o6dwrmsz769x6d0plosvg43c7yzvsezen3jm4qbq5l0nmt4d5lch221vrhwhafr7epzxqr2itusq9l50a00d4s0anyk4hbajf4c5r2gl6s0uyabu8l58doqh8nbthmz4a4ah1ti2xnbg5397oy5nou7mw2g2443u9bu06q5462vxykh4lqf7s2xeo63e15xb17n1tjbogifhfy361nsugi69s2bqk88gahmm8gpatpavnig4op4ci4mlcyoz9tnkdc3lb8098wtxe0qwcjoyv1bgorwdre0e1ryew7a7t1p7prczhltz86heyoxvirxgrtsdt0ua84hzfx0lmr812bkp4g1rob4sr1xlcyjwe3ung2epct08kl8v0iw708tddfk0awa2mffnq3vxwpto7tvhamge1u1gnlgbnufbfbtin6lkrz6nfzzld0xuj1hamrmbby0y2v7e9y8am51v8xpcp6hnikydstdg1yh7rxjuf39mq1c3e5qijb8w1s6y7l1906n7x8zrkf6qxh8zca4apfnx5duw1fb58pnx8cjqtesjf94zylp7shatsidhs4442y8r3rvy651k93m9mcmjdqmm4397y9b4kijg2dzrx7mf7jg5g',
                image: 'iw456it902fzv0ia4cnv8uyei567g1ojsoauv05fns4qdqklj1mgvybp1wnm74kvoguziwepf4jndxzgbifl4cf6rzbk5jvm5wqgd2gne7w8826cuy2z1u0atai5k53rjx3k2rtyaexqocnbp2n9beyhi99vf8acbk24jxggeynjhcvhlb58qk6iwcf1x5v6531jrc2lg1de21ews2s1rduh88isc4y2eyojduwfzz7bml3vl7p7km0ug5qbtc8z4f8ddqnx6aph6qntu8gvxmiu0ox5nh7p5nmu146bm0eo7d91yusnspcsdgs43vqui2unk553xnk57qa3hh92rb3euuacp6xn3vv1byncvchi11u0sw56ydqxkm5km4ecrj5y6vh4p4u3qxa9w07drvao9e44c75zgxztuxm9cyboi5v82w9o5u08vds5z316n3exw16z16w0lkpdr94fu48mjzsmpes1yez6qnplr9tkemtpxu0t5kr8o1iub9wtoq5f355u36kvapqikhkxgnre37n5zh84rksyum8zq12xhpqehor0evfu9opibzkq6c4e090ae8a0cgy977qs3monwtpl82hsrq6cy3orel2vwxfr10aygbzg09fdlc8mg4ge25w8hicoq6cfjugstilvuf9kiknxa2ghxjh1b499o4lojewnycvlk53inmc99jy9zxs75a1kxrkz2rpzd3jr78d3u5rv8e6ydepk888ij03r4x5inwl4vbzl6kfixcuxbrlyhqrxzgz23xbdoopentg8qkafv4pss35e4z6s1cnglqq4ffyj3facn8geet6whf18u3uo0dk6tm91f65eav4vvw9gs0qxdg6gd2nrfyxektbgjs3ue4ihcdecu883eqy05g4kskurdb2xxq18m3k8pjannpkmaweut1snwe2tn1t2trilk00n4irjqb5hiujen9j14xsazli79o431qpf9razcs2lt78927z550uibmxj3b4ys36p8wzr',
                sort: 328988,
                administrativeAreaLevel1: '8uwhc3hh246b58ne65mbmn2ylasaug29b2qapc2k2vdfynhi24',
                administrativeAreaLevel2: 'ysfvruyy9favnpn9vwapk64bc6pg9cecv6uo5oekipkh3j0pkl',
                administrativeAreaLevel3: 'ijdr3m8vrx87autlyipemomskd55l4u1g2yzn3tadjr4rluklz',
                administrativeAreas: { "foo" : "bar" },
                latitude: 991.45,
                longitude: 154.23,
                zoom: 13,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: null,
                iso3166Alpha3: '55e',
                iso3166Numeric: '1na',
                customCode: '8ujjyhwll5',
                prefix: '89fuk',
                name: 'ck5e0ry004pt1czvq08d6sy12lccfr7jq9iw16t2mspb6i6gp39338ps0rtzi09rvnj39s5gw1hsdf7uo59iw95xsnaluua035ip3aq0oc5y2c6wvx980s1xwnbtuatgo00xghp94wxr065qapg52xw6uspx9jqaohyhwmsczafo72sh6kdmiulffmb1qgccs39p6l9u02vn3a9xo6537jtmgs97wgrp6n14wmbyvl2aln8pf2oxe53hxn22772',
                slug: 'fbw0k4mqomntnk2o3dilbft4c9c1or5un5gv83w3kwfofzlpoczrt26k8i036r02rcpskpz1qo130sxs4xhm8yfjemf55rutslq379tyvt9tnyzhxopwq4zffzzsfgwjjcim1edp2owh4ujb695ja2kj3nxxinyknyabqaetxct9cg1tkbb1wmbre6jw5m9e23fxhfqqovsgxwrobz06rm8xnc7ifua5yw6tf4meh3lx7mxintph2xrf9u0gt6qfw7bwbgedl8ujq09voxwqwm4mupjvfkw0mb82xosif6jkujdswvggpuclff75gapuchf3naiazxl6ovvxmkfzoopsxzosidfr7n54polvqbk7gn2uona1qsagw1ipgy6lunvzx3tksfzgqqelqcnr7i7ybck3vn63rgu30nocnoy910bwiub5umt7344zheud38rr50l803kjw2z6jfpfuxf8qf1khxo88no56gxq1xgfdc2oa42uyixj4fkh6v6yz3pfyij6yd9e9zbuqs3judicysk7y7578aln881zr22rhd2kmww545lbb93k55scquyn3a4n5hfm5alnl9um2d3fyyo6ieuucafaceg1crd17woiqo5roodkv1xj702c92ktzkux6b0igbt1wkrmf2ud8bhcywhd0p8n9txu3sfpr4u6x0sd5fohh9ifkwaa3ncp97g2syecp8kiclnwvxuqgea18h78lwehdt4y5lnqp4h53nt9lbox1fv1lbtwifbzi9478s244expr1pyy8qeh2if7hcdetqg680vmcx5rvhgwmj52lewj30k0g561fmrszct7n08athc9zrbtqzjl3a5wdkm2d7s65xynpicjzrg8z5jzvu5j42akmntcgkmrjciuw244dsmnvui0v38n5dcd11lqp81t3ezbksgcra3wje7jce6zi37gm6ui7ukh8htmrtsq26ipfr44m9u1zb2uvw8dss0bubm7c7xn7301oeoren99igc6iag',
                image: '0gm2cie0u586zqrx17ejq4izf29tilqf8i0a3fus28ybb1esxveek4frceskaxhlmlzqzsb2du337tvxi6ge7fot0kuskepbtxyoewn4crunwsx2qjecblhtth6a81gcpc3pfjiqo0ajjfz7vildt29jpusz3i89tpbwunzoxm2zp10cyhn8a66y2srtygxm7gckqceudilp1mbd8panccfbsna4nezf5wny9fz1km3cmylq8a2saudcxcq2gmdfbl3ihi6ehwvtsjpsljkkyg0quzokx1h67w52b25hnfndqdgh36wq0w3e7y1v4y2ko4vhywzgf0qnfoqv9kjkry5e2w7ri1xfhwkbo9f190dl3ie5uifvrocopis8ovgojmz8vv8ut59gecg56sngfu75jukgp3s14hzhjh8xiw6fhsvierzxv6qrghfvek86hl64xs19ryid45ou6x31hhn3kndx1jt12lixix4m7f6lsio5usiy9jt31xek6wqra3zgzvh560mtu3sy679ax9kwn6nc3nyq1ko05iemrikhev2fb506qu136ky802osnnvr9mpapqulmbvkme8qmopl1p6i3qqyfy5spev72eu1q1s90m1nznzu2wmessbln2fphwen4latm2aunfr51pdpdpz7t1z48qzttnzr94ffkkna43thb036xxnhjokra02qyfz9hd0ywucnwshe1dytc0x4367cdxl8iiokbart04wwtzaa6783peprxt39usji0ouqm2whyi10rqjr11rvmyj9sus4yib1bytyg46c0vxjxi5pdbrfqxcj5kdvdvu68pami3ie67rrkfzqt3nnfom8w8cfq5q22cnfmgd4c29d7hcckut5c7yyth4gldhgqydjhiosfcuzbbtnh65vou8eh48lcp9z16hv8oj8fdv91efdb5hm8i26ya013u32jcf1ydo4fuyh676h3lpok6udo5q954yl6q0rkmfi4t3lbbcqv568v3ggh2ve',
                sort: 563795,
                administrativeAreaLevel1: '75temag6md2rrlgcuerw3p83bnctx9il7rppse7753fledxofu',
                administrativeAreaLevel2: '16xsp20l4eym3v7f6d2v7lybxx4jcf9a0xrph9zh3kxc4n5unz',
                administrativeAreaLevel3: '5d38lt5670y73fn1cpjequjygkdzw2d5tgiypczkzmvhuwppcg',
                administrativeAreas: { "foo" : "bar" },
                latitude: 578.97,
                longitude: 625.08,
                zoom: 29,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: '0n',
                iso3166Alpha3: null,
                iso3166Numeric: 'hkv',
                customCode: 'n4vmwjyrhj',
                prefix: '7ijo4',
                name: 'r1eiiu9iijrgzf1f3aerhh2h11spuwhzx64o843aq7luewpiskmv5chl56zekvu6ih21xgm6y65vfkvkr07bzrqml3agc2jf2f35hdqvdkxu9850u3gj62g9w5rf1i2xmpg7k0rdhuraog0ql0ftwevrvk3gsr6epkeb23bmbziuycfrva4nhp03a4q23fdj41vmcdief7r622ok090vzhuqjqmod2irbk6sl1pha3ep67ml1ivj9a0sppzrdxg',
                slug: 'ufcofn0ejkkq5p4ybc8dp18326758jm0koc4h9nmrowdkdi5dq6kol98ea8tb5etw2l11sxpxfga3ovc2il6bnt91yrtandxa7j5hb8qdylksiqprcqqr3fhx4hs3zclvnehmk0gcmgmqdk4v4haeiudpiqarcowa8jygg71p3hzuwrg1rpffsd8zxqxzv24rbtylmhxyi8ug8d14m2gxpev266a63ub5ds9aymd0b4n2c9ku4cy9x03k8b0t9jrfnlt24zsolev7o3o7nkm99ea3wmwt6m3c51xsk17rzrdhk7wgxmfho7p68klijea5manopthze5dv8icxb1zc2jw1lqqnpt796xb53vmea3z884u06p8g01jk633v67tp5ap6okjg7jfc0uc3khr5gr0grk07hlv3k91gbgddmape1k9f3botindoiv37u9cgeehsllghnir7antbmz7vi4k8fksdn6ff17osiihgse3sdtzzbl3ycbkenvzyxjjub0wx3oe3s21iu5iiyqb0jup8nq1ilk1c2ekzfiyfl8ge44ekkocyrs9l0hgog0jzx7nlenvczgpax0ljbdonrki00evn1marnzug7db1cn3tcleau626khmmfrldm3dmn6axstfmu5t9x02ejj8s5nk3zqxqc6xf4nsqbmhgflhur55ku16qw80pavy6telke0hn8iaoofjhor26olkc9dw48izzbsifeslq3gg4ffuu4ajdeywhsyrtp57uk16p8dkhhbv395ws20j4gfsjcc7gevmlu5qjy5it5djmp3hevagmowpsovn3a6n95qgznsj429yq2ho8inhc3rnac42n4olql3oyowqplclfixqefwonb6nca5ns5pyppdc1jv4hndmcxf7i16x54myh31u2vl7bmsj1t7lwnyk1j8fiy5g1ulrunydku22llhlz9neaqbs9relc0l55bm7emdhn1wgv9eyaveu3d3dnwovcmfqxbd5idah8zb3gmj9',
                image: 'r5kvr85b5z90x0czbrph8xwi4q56x5jiuy4la0c6avp3gtsvymjevi064o9toqq4ozerij4ejnuvh8odml1pfxm00h8fd6og6c1jb81yfnxtkn4im8ql3fk6596lwx5b8wy1ls5tyqvtb88w7yirdmxc6djvio9k99j8oeh7x9u4aob1d0tz8503vsihuqin0naxqojkdsuaqu5npdhy2rlhbighls83m1bmpf3actr5k8oppuna3ou3yigh2eet675q9ibwq9qb2t8679xezzliemwuynuphqu0yqqgz41qmq1kpo6dbm4fmyb5exwo0ph2ktfouuvx8d6wg332uualbnio7fx2b9moepcc9rdrqmmc159p4dms4ojy95rg5j4rd1jbnkzsijdx8vpyd3aipuc0m3a0cztoh54njhm9cabnzao4bpn7bv3w9cq0buaz371lw1l7jgw0459cvneydd1acjtq2z9v6hrcedxxz3hnhvymx0n5w6xrsvyxosj2izxvoqu9y78tgf0w0gn0qk4o03n1p0heexpkl9r5vy5gq2ryxrfgqkfboe0b93rby559uh6rxmf7mroy2n56gol4h6mq5wgrr5swhxe4437wby93vrrncwecbwvekvet9oc9nrtd0t8s66ilfgr37omwhfqqkgc76a7dq5xgtay0458i8ne25tewlwhz9twjfmb5gikz9wughvnbliekoy5tekl53v13x49hd97sdjrnig6ynn4yh8n2lifvf6u756xlpyr66v58y502c83o2m6xajzrr25dfo3tbozclabac4j8l5rqz078v1dn7gt1213pmnqbp5vnpmbjthepm5jphyjsibdywi6xqjmsvartsyjbkz1x573e0ajf173d0oc0s0uluwije6df9q2czacp3h1cuawqa5r3kvpvkhfdbyxrblmit6uld15foujbctngdgbkqkx7opqzjejlea8blgb0tp9mgtqdaxj535hfhb9yqvedklpwhl98',
                sort: 280232,
                administrativeAreaLevel1: 'lb9ts6zhidlnzswq3sok5cqes22bomb7eh7mvtkzm7xs50r7zl',
                administrativeAreaLevel2: 'xktwczr8sv5zkmdgshlltwsr9r1e5814q9rrze32x0vj7yg8ma',
                administrativeAreaLevel3: '3kikk283n7kg9pcugyqrc2zwremxw6lua8uf48dbdgsni08t4a',
                administrativeAreas: { "foo" : "bar" },
                latitude: 770.82,
                longitude: 1.68,
                zoom: 74,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: '9g',
                iso3166Alpha3: 'm7x',
                iso3166Numeric: null,
                customCode: '58s93oiicl',
                prefix: 'oqaky',
                name: 'nqou8d90ztqup9lmgs7h2lzh5l1x3o4jlvu43tctu27rt9ut3x30h7lylm1mpbtbfgirhjtmfjzzxs3a12xfxule3ehvxt6da6i15glvi15nii2za8z7z1sw14ol9r7hf92bru2rzoedr098qi2epyt8nd8ossg6jtw0jtuqdhtw3mts181ohbi3xn2hfy9eb5jl32pxh781tznq82q256d90vwgx7ahhzxvr9uhmdpwyah9nohx6s6ioiyszen',
                slug: '96s4sxmui98txceuxp2rpqsfkm4goer9oyfc3cp2w3xszmdy175plph0wljpyffxdi2j2vgif4nar37njdbtkt2ii0qoah3e2qj6b24fxj04t3codgr5mm6u991lhmtfcy6xmhkagmu2ikagj5la5c7iitazqkqto3x5cg2lw0c5jv38vx3qv9rf7t7zvwgn2ofvja0ur5eg2hqf23zdr0fogx3kdryzfvt75woeroedzc276z1852ljabov16t0ypymfvq9z60ngxl0hu0nbt3dlx4vpsn94mddfx4ihf6b3zaof0zcgfaxsgczlr965oqhpop7r207nojaokibbzuie4vgwprbgvywajupq0oc0fxzubrduzy15dwlfuaymv62gt03d2b2zmaoefada6ybmovnjmo6mypo673x34109ygxubrk5j2dk0t570y8q4z6982x7dznhvxhy4spmlwhatodcjr3ovhs4e5l39ojrs1xgtv4orlnqtru8yvtwdb73r97bjx6c5sa657zhay1vbi0b1u7suzj6u5p3fydo3pniyxlu5hme6oedfcsiblop4pnqeetclstxul4y06yhr4xh4aakxclx6887a8i5jl4hlv2ly0z52696dgti1h5ruwvpnhtyceznm623gm4zz0w4bv7hqrdv1mu660xlzulvx198ckcmkmma5f0xfn6gfgv9l1mn8w51hyy5y1l871i8yn77pfn8kvw4o4xqvnpigfxdgv70moo33tcberesk5ckf2uh3iwrrry57zsslez9ks0rsct8jq3wb7sqtgtshuizdbxvw86kbefi46870lbkmhqnoke8vdhk57z7ge15w1osjdlokmmcpmsg49476bgw5dtxbingrrzu0m3e5hfy9wo4tbykicnb4ehtbnickbf0a19pwwwqth696wmbxtht8huy6a4rmuymxro24teucxdnvi1u39751ry1z78s3d4mk1y0og4gswdcmsu9vywsyb5533sct43',
                image: 'j3b37ca8nkotik162ymsh3r82e9igu61hb5bh3mc4ujhgm9ky7b6xks7cuft48art7urjft4dwsnf8a552pqcu7yyn76v9pqt7ztydw2040is3e66n3mvjwhafenztqp5gsg8f66z2eaiw0ah8vf3vn9eiqnxugs28tq4ywjmxfiq9ofy1pkr126a5h567k291ayclb7581oak3pvjfsyosppggbaapckcw0y26azi8ekg4fkx2hmouc5q1ydbro7ppsdtz3i9psdn1cwa7jx8aw2u1artk09fv0w3c515mzati4wso073yx2dd7gkiw0dngphx8pc0olv33sjw3gv6x5x2nk9ibt13vp0m9ptnf36lbbnk0klahn7e9czhossl4ydyefyrg520hty561f74xaa783xpsujtgf4ini95ah23fvutnpcrg6qi7ls5b9z478qxjaoasfh441j497cwkeny4dyq394yqmx0z7vy909xg7vmhoe6946v783qgml1zmqsycfdylo9j4kfsmyah3jnkx668yoxvqa4vrgg1gdn36spimbucgfimjqgcerk1sknr56talql8o1ziq5hvuzvx809ekckcz3sr6zl25gc3vbekq4v4why9g0lgdlrykc57n5lqht0afdzhey6rcbhsa8r7v6ka284f0rpxj1y3dll1rsxzu7n608rtqgkpukm79pekvmqh5m9pectucioywzmj8syn6n5dr394tt6nu2k7figymyv59onz0mg0xrh6f11003aw5cw31vxcjch08z1p39uqqkw815q3w0p0pysapng4equppsadv3ht01xql15w8fa3szpx000n8exhv8a4pj0nmup027dyvc6xe4basz8dbi9w0hotrhw2yiyo7jd526kno5sthi6r0dodt2ojomkvssavl1xnmndqhghy2idkrvtvepye6x2rweqvbo7ob0m8tv3izavc00tp06noawdv64f7v3gazm8yg4guj7k8gdtbgn3',
                sort: 474840,
                administrativeAreaLevel1: 'sl65c0mf9ctp1rd3hmgkyao0khsp9nlv4sc03kkrnezd1ts7pl',
                administrativeAreaLevel2: 'b2zwhr3z7o9i9412pop3zlmk8tktshykczsjwb3u4ckuhp2sm6',
                administrativeAreaLevel3: '0zprcoxpcbz3t0w3j74pvmtycksyswb7653jid02n59j2syplf',
                administrativeAreas: { "foo" : "bar" },
                latitude: 122.41,
                longitude: 989.60,
                zoom: 74,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'ij',
                iso3166Alpha3: 'p6b',
                iso3166Numeric: '7xd',
                customCode: 'w19oufw7ey',
                prefix: 'uud8j',
                name: null,
                slug: 'ynwzxxanmc719mmcw49h1ekusyrak7ck6g1bwjtw3ley8mo4pqvfz6qoi23xsoq67x5xftlu0x81v05ly9a6mre5yrwmunsqa1j237jegs1m8macrojjw2ac8xzb1pt9crjdxisijlv57z3qz1shfblcezq4pvimkn6t7egsmiknhti24oe7cad1x8d1pkk6bqclldodcofndghs5b84le93lrgs9wubj2484nmt9b1g6mjh6jmmcfd5zrhxhaxqgt4vj8h0ut9y519oh9j1b8bhmgf91mw2m112aga6fwjwhvdktl1b6mmylhrmxf1ei4ihslpf0ql0418y8winc6cdehfcbtgzwnilmj5bhdhij3kd47ki2gq0afatdljg5lpmlai6h0v7q3u9pac5g8upbyrb7a19tuw8q5qgb5d3dery71ze4k10d3xu7ng2dkibn4ikf41hcu86jgordki7a73ameeceg34zynal6e3g1uexkkxbt899e9e0oya5teqau8fq5m050rpwfjr4beq4zrb5c39gu8zefxllxotxo6luiga0qk9h6b7ps0fy6n8o3pses8bnm0xjbei21sfzsnilx85ag6sm73hjm2uyoep7r5izxp01koi8l27ywizczdj9k7d2drixuhkp545kmui4axfu43ythpp665om5i0y4sx7z295tqxtw3ctva0jew5vcfnoqxwdh6gpzqqiz04io9r4pkq0h2jrr0uoklpr2fox8pdd42ypdm5v6qsaas850kvj1bqf2f51ss1e5byog4zqave6jrnomjlhtbd5z1uxjbsaov9s7mdt1p2db0p85p3oxy7fpeyiah59m1o3o5xscnzpkbroxzsiybcs0btsiyu4db39wl13zklyyl4q2g2e65c5yvrw9a34ns6uaqox5exqc5ulcbg6fbm3or4w4g7xjza5j4unj8rixis6hqtseb48n30wnwy1zvy6vfi3acghuqoj7gfnbzsm31nig65lvr8kgw9',
                image: 'jdqf92f6g8h7uqw56wue9ublz088zlbfisj64o9te80xw5exbwht0ohs19f8lety3y32ci84x5uvmi2zozpjvvlg79qtk7tmlj9z6hxj6yq1yu1z4lyvre2ldkht7a6s9rbj48pl3idxcsz54eyat8tusw0y9m2dzmiyk3znlvd3tjcp7i5nn7a24g5e36lt361vyefzlovemjh3hljis0urvvhywh4ivt02m4upu0w0ho55a6a0neqpc2jhedohknedfrms2pe057ptqw8yjljksw9gg2sxkz35mn9gmr4qc2dsduytrmifrufk23kbwn60mar0sijqss72asjf7gb18b85h7gc8793cvew7wbptm1xqdw55cnbxcyq1qa4s4jycuoqc617x1wb4cr5ku7unl8yinf9g5cwjoffnd9bki49v3z4fyhvz9awtls52lgp2mk7uoi25xv2edoa4sjl9yarntlx6dq0qu6q7t340pzmsyc13oluy32tsdm6qer0zfy6ertpibjhfbb2b4xw0hgqm5gfkadyj4ullvxmnni5heks5kbno0aztg2f3ykvuymrv3u4jr07ljokrhh920z7nqxyobqsb16yyfvukdv6nxmkcg2em99lqr3df5hucx9iek0otlbo190pra8cxdupruyz7aw47301h245bkjsmnvtsqo4xcbvkdpeyls5gsqzfcw2hyg7zgoa86yhel17cb15o02agzx8vh3tl8yf82yus908vlec3skd8uiyv9hm8y4gj9aejs6jqsy1vy37iy6ckgeagpl8u36j1il175047m4zwf9w48zae3ljsjkffdhsnc4y4srjl2t8us9z3cck7bp49v4pto692jwrrga20uwit2mmmuagwnq97p5p2etuudt50t3toifkr2ra3hosw9424o3s25ayfk7gbmt1pqfwkq44665a1vdg7w6hmlk3fb00hmm2dkfwg7kd5k3n8tmqxuacmgxnnhkw2vn7pa5yi2fjg70q',
                sort: 866427,
                administrativeAreaLevel1: 'x2sa4naqmlakal4f48p6icvwe5yzebrjs16hrvzoj57e1c3ryt',
                administrativeAreaLevel2: '4lxrsh7wzvzxbyyydsyurnycyaj0vz6ptlvh7ha1vlvo0p7hji',
                administrativeAreaLevel3: '6h1jea4utehnp0kns8zawk9bcakbgcozks9o8x2ygan9kbjnoa',
                administrativeAreas: { "foo" : "bar" },
                latitude: 585.94,
                longitude: 138.35,
                zoom: 94,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'qv',
                iso3166Alpha3: '30v',
                iso3166Numeric: '3cj',
                customCode: 'pxe2053svr',
                prefix: '9fno4',
                name: '3bir9sy1hg8njq2k3v16d8njzno3591fwuxmzksp07fqo6x31yir3guwlh5nsviusqae66t63u1uvq16krak9ag4j49w9x7g2biayvpvm1dc85na8ufihiikh2pqqzry4xe48f9ir0iz16220t777nrmoext7dx48xp4z6k7fpmyo7cin81vdragjsa8w1j86zg1r01x3awo8ljxdyh4zhotmyon4oznmggcuj79n8ym48co4ziyabhk5d6y5st',
                slug: null,
                image: '3pccaqil36vwg40xoktrh6n4k8ff3t1pztqmvlifyxtdzd7a8wbpgtxxc6ffvdhu8zbpfast9b671vdmczljeee8ptlg5hzrkz2vw22fy9vjnkrpbwabx890y4e7ul26kem1tic128my8sghb0vlyb5gomor5wzkoqv4710soxatr575iclv9hyi8kkllrwzuzupsxaa1ua3pjjqgpz1mkvkvm1uw8fxx692v0z7aie0udpldpsm46gmu78sx4au3vlsnh0usr403nclgke9dzzue7mz9s22nwpvwpg0mu8lp90b32ugxq66x3b5avtvffue5jlipat559pak5vlmurq5zoqakneq2vivc7o3d0zj0gap8vkx6zam5v05saxy4zx9ceu3ndxg3jhyiju6nw7ghdfyujz2wur7i3swrai93ydpni0x631d0pb6xggcq3zgd400xo967npftjafyxjv24kldjvixbrpmnu9wr03seo3s3opw3nhq7kzqtdq6r9p4jvfzephh6hivjjboscuf6i1ouq4w57fno5aapllcps35fnp7sh0z64ldbtgkjn9der9ebxt8opeqi8zh2j2kpq5t3y6gcx5smv4sh3v3gcszqe86luht81bisp0p3mjot4thjl3prftlhy8n9ycydq1vpcwo9c6x7z168us70r9domw3q94ki3isoyvry207rgw8d1o78x5biedaf4hjqp3buavx0s5idlfop3wyv9t6hv8wphz0exuum876zok6gteiqb971fseuxjovokcf6m42qtoj3zi2itumuwwp9wf7u8fg9jaguyzd1xzcier19s1irmn4526zcr2en99er0ml5ifkhfs7dungdlcnodfiia9rz1f35ralmb2vbqlnlkzyklxsame1u8jwepnl7opmrg7cvmifawzuv46bad77rjkwzj8sc0aqvwwdw274dqfsttta2zx0io0jvzoejmm05r1jowu57hjf70d4b4xkxq9u7zzfe0g3s',
                sort: 468530,
                administrativeAreaLevel1: 'jy0mxre5z294wn7p4kws3sn9g46bqr096puf3vv5z3ya4j52va',
                administrativeAreaLevel2: '73uoow92ttizeh99wap2e3yhx8u407vau8klqjy0mi4p8z3z8y',
                administrativeAreaLevel3: 'bphdnfee7trodq0sntrw904txd88uh1b0zlfn6ob0vqx0eglo4',
                administrativeAreas: { "foo" : "bar" },
                latitude: 898.21,
                longitude: 404.46,
                zoom: 93,
                dataLang: { "foo" : "bar" },
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
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'pz',
                iso3166Alpha3: 'fk1',
                iso3166Numeric: '77e',
                customCode: 'q8p16hptol',
                prefix: 'zm0zz',
                name: '4z6g0i7lakzbxjorn24e8xog79suahvirl2pf48u3t9cclsfqk5t5yah6m047axiynfhdfewx1pqoen9meaw1njqzpsoh9pkkuiri8n255griaw200be6wnfy1e60rhehglltxqsoko4w7bioqsm3c4il2urw6othrka82rwyg9r3kjxw6z9igbdeqw88dy9yyx3g59kx91quwy9jcpevi8fuc46du6icqlgrblrj9urlabs56ow7q1yktruslx',
                slug: '962sgyy9y1ce6uew80ggg9g34f9r99f8hd2echkalr3lr1b304yse89s1nvi8aruuflwvtffc2lc7lh6deqpakl6ej87bwhdj8zmzi8wft98av2vk5t5rezqxmnwzpoko62s2dksyiuk0harzvyku6sld9ces3rij1m38c5nqevva2gnz9ys73h89d4h9yctd1yl5g6sczpy8pa7z0y6ctqc6txn6nle7mgdolb7m60dv39upbfzw361ji1weopgfaiu5annlojc1b99ssmnylogali8h8woea7emxyieq2srsazzxr7izaf0e9hc5dys6hohszc2ere50qk380gezzz9swm5ln4rj6h060fp1dlv7lz9fx90wuwp4zma0hlvbl6a18rs39ovrzdkbhoufpvdoaw3vtvfujx5phrvffi41uz7o8xahbgcls66v4ycoi45l7se2n8eaji1cubkkbu4qnvvhk8afvnh7o8uoiyix5vosztdad90od9pycle9zetyj7r4ngbmk0xho9gh0ovcvggkqz4y315zgql5y7eh1qhwbp9wn9txajaagefmj08sbmpdeyos75ibvhstddqm9vxsabrj3co54of5lsdsbn0ubf3bufyevg70noo1ukskqru35d1gafsc3rie695f7p5c9uakrfhuu2xyfhx99mr67kcqj29es0ndk8wscv2l6k0d8ec7lwrrcet3z4fvkgp9a8qbaost27hld7e1kf5ccs42ec9ld1ryedax6r21ifl0c3yv5wn4ygyymkfoe0fgslrx20ttapovzkmndsr1umx555kcshatmbq7uyf68zhc10r630tpl2aqenza8a2rl8dmicynit7sjqlbs8pluu0ds5qm5igesblhh9dj01r2g5mskt4nhzwdobqjvhcjxsbxzdaajsod9y4l8vhaxoivfr3h1gslrhgvsz699jr8jpundr3hlxqihx8mb3jj7wz380pnxehi5fskrqrgn40437695no1lz',
                image: 'cjcro40xhrupbdmo24roxty030k81npz8kqcecyjd9kttmt0wiqh3u5p8gngjx5y95g24ifz4c0e5r7xjipdg2wtwzmyua6no0cdrr0fwnpkp1tsccygwsvu8p7of3zbvi7ah0k08bvoz8kjsz5k8simo02cehtua5qc2cv3mi6o62bo1xpu3rrozhiq22eg9qvqj66du35p56kazjq4y72qbiicdt3mnin389hzoyr4nyg3vk39bitvhygarodk3928ardqxucau0q5jc5tgui1y7a52z0kz7ln59rghcsukmvwl18m0syugsecbdl5isajn0yw5i5po9xvrnjwoscvlsv3f5op9n0t9kabva0u53i3mivrvmmomb54f7dfidlzomftrt0s3oakpgr358t9rcsomxlmjrotcdg5gmzll0kxt76m6ssrbadgfwqa7c0ptffz7mgi6o072lzqsy72ytq88diipn1f96woz2hpqqyew5nnspmitaqkvvpt7vwzjealfzfx4whtye0ymofde437iklw8zfuohl441ip180rgl1ectm3k0h8ujw1xxgbbst1xi6w08r3kd1eovbvu4mzov6nd4r08fmal6muikw3ns3damhsrvfxugkklo791hly49c1lfzcfec8sbvuzn243fp2wzl2xa38qegw5h3wqpy8cntfbkfeojzi1zz48aonzl74glhape8ww21s8z0c6wur23mnylcyp4g3s5fdrmcy247avg7uuh469fk4noqamijrvem18o1pockd3ekeg59i7pgaunn58mspwqkpl7jmtwnuf6ls5c4xzyandntt0g2hz3tgrq3jeuhzl3vwyb0f7jgy5dlzjze2lxljxdlphdkdvwy58u2agwa8y9mwqjstrgwsn3pnos6ev62891apdxx2nnpm9qm1h7644z7d2ff3m4rk58iem4m7omzdchwpweozi39uc195kkz5f6yb5rldhokxtx896ss1iwwa3tctryf1mz3c',
                sort: 645073,
                administrativeAreaLevel1: 's5tuefb972nabkxusbr3pweay61a2m7a1nlnu0wasf998wdwu9',
                administrativeAreaLevel2: 'ih5e4489j1d8kji54fsmtttannr1tte7hqyrl3bbel0mt57abm',
                administrativeAreaLevel3: 'yisyp92r7mwm8525zz8uabtne9lwsbhxqwrgtxbvyzbdhx4fzb',
                administrativeAreas: { "foo" : "bar" },
                latitude: 246.25,
                longitude: 715.44,
                zoom: 61,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: '5s',
                iso3166Alpha3: 'wbr',
                iso3166Numeric: 'q03',
                customCode: 'w6kmaitci9',
                prefix: 't3kyn',
                name: 'el3fjwb1kd4ueyhylwavkv96gnm3nbdvq5jb3ztdyi2bp9nxa1gn7ej0e5horhg7klqixxt694oi34d5y7ii4dp8ls2xnyn6onfmywnk3zx1evtbp5rmh5uneyip1bg5buhaqztjs6frlds13uiic9ym3k8jvzxdm9nci4ldwexnh9ldjb3ldv4rf1nbk79f0esi2lbm3zgrx04yy6428fpm65k56ve4n265oiq8pn97rjpo5s5tj0hycv6o1gk',
                slug: 'qoigpgfytpw1h3hce95eza2iabn1vmk6xo0o1q2wx5slnyjchxqpsb25nifcnvbq0pi6kuk20sl0wp37te01urrmpvtnkut4flcb9q6itkhilcnbj84eh4l5t10titv980j9qf487ak2piq84k2vkxcs15xtx8yyepfwjbuf2esk4qooil87676vvy3rpymrfcjexclqty4l7vyb08n22zwl8ycs5a7ggegkl3byh0xs5mv3hldkqrecknhe79u7s8unailv5dzh8aobztfwgu5t210rv2gwu59sgv3kg4sqsicvo3eu2rswdbvalkwj13lhj7facbdohb8blqzofb9d39waw7m5sjllce62x5tcpkt2i90na50wxx2cnburnp9wdi508m5uqwxdd2alp9tobchmqfe7r8qtzyutj0low1pas5c1s1jpwq3oq75a2o4y5sj36hjji8eq4qs985x68c7cdp76fva9vvavygptkqtouff8w7ot77tze99wylsvaeqofarp0y8nsvb2ekv0l9yg9t5epkoa3js9t9jph571u92397l1prrm91gpwo2cq23r8tmrd8u2k5tovgwh2ojpf3n598sqaiz11cryuj3xz3rpv354qydvomvybinv4z195gjyl8d34p0qbj0tuxfijxyrlb6ddktz0oxkvmflfw5soqjlyl1e7jtu5aowsgwr7xera524mzkhrv5n95qblblssrgghygfqc05nc6hc5bwmrfdophhc8slbgwq4wb3lyr7jtyzk4hl0u3mwl5jdyl4sfsiggddukgd3yq69hn521ht49ipf8q8azfb3lplsvzqowcs0xqqbd1lnybjm66eyighqj80t0xtpza8inl30iaj2auzbkwumi70ll9t5v7fp01jqx24jtc93pas0qtyb85k7v1s8tnz4oust8hdke5tdovqqwfnxhs6zh6wd808bygogtdm24b3nm93xp3o08xi183hj2tq7l8cc1o2desqx0hofjeu',
                image: '4fixw9lb5x93x8fzxcr54v7vf2fzco2ovsq3se5xvg9p4kqii054dcxaxxvetrwp4v6ccj621d20zosy7a8lam0okwscxdae5w9anll3gkob1udl1pb6tj04aelfiob0ewajk7dbwplbfwkfi3orkkafnm6r6ltjlxylq6pmf83phm1do18d33g9aizo39j3fyj6mxkb8yqdo5sitkfrwrqvfzk8soqrhos6ybq3n3a4zilu7dwmyodrybqhaknbg4kzduuu9fjmnkjdrcanpp3meb3t812bijxhjhq7pu0pier9orbcvyw1k6x1fwpam2el9w4scb0p5pzn62p7xn75njcbzeh4qyaavo8c76bv6lzej9c6gzd9pb47habwvc12wrw7064gbsyfp93yi7d4wum4o0ph4covwflne5foiom3fbiyrsuqzqbfg8yf8z5hsh4m6dak3zsere5sy8ptos0ktmeal1dgjia9eal9j0gdhqhxw511bcgphper7dhq27wajwkwpg7sqa77xlvx29fcnwqwgb24ejkqot1z1ms48u9nizi4dp8d8o1m94ndm716zybwulv3jamekuj6wi2pc5h9on6661am1ejwasagb0kf9l16v9p5ym3h7vm3523zrlpy803704isfi1cqzwywamtqooy6nwfk2niy89wruif85fq7mqicbasie5byttjpk4vgve1iq7xq7eesdcfee45wopdu9tob2edirlb9x80knej5clxc38fw465vdwjj8udhwm1zrmturkdh24i2b22skkmsorb5g1bbda774i6y36np2guy22bhkz8d5w0cfs7s4qx0ssyoibdt2xakaahi4f3s23prt75yewhawxm8s2klm6tx5t1wba6zd9nl0od05buwwf1yj7h87az41ddmn7ar94wvqz2nojxssdkjabob2bkhf9x02qa64cbtgw2zszt8f8qwymsqcijg29ib0a1gdh7huejqn3173i8wzmkkwojdivs',
                sort: 689393,
                administrativeAreaLevel1: 'm9yeep82d6ujchs35g5asl0p8xard7eaxrfs80xe66hxbin4ou',
                administrativeAreaLevel2: '10puc38qb9da562fzoomi5lku3bo9t17isx0c0gkj0ybxqvotc',
                administrativeAreaLevel3: 'rkxk1pm4tg31ctala26kudhr5jbarb7p8m9bqcyj56og8ppumy',
                administrativeAreas: { "foo" : "bar" },
                latitude: 476.25,
                longitude: 634.24,
                zoom: 74,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                iso3166Alpha2: 'xh',
                iso3166Alpha3: 'fe5',
                iso3166Numeric: 'w5k',
                customCode: '0cns10kwoj',
                prefix: 'xlh55',
                name: 'v6gzd3uzt7a0cjbawdzawpmkp4qyzgel90gpt1bhklok3690dnsisihxynh18bhpanbkcsvv9xl0jjsjunb3dxo83mwazzgyiji174pwmxisy8uwl22d6x91a6kmna8ys0j26am71pbxggd060t2fow1tqambhfvplh65enmkpi9ufkh2r5c5p2xmhlqvw7pnijlj7dpl6fr6ws2h2n8v6l5ilj18to019guz38l07sqlwt3kvxefm2t6hzs9ci',
                slug: 'fojx98n6le1ngrz7aj6t073hzkq9h4v173b9ts0wek3z8cpoc3xhobzhg0egu5f6jxk71xybcjv5jmq5bvyjhywcq5lgvykfycttio8n07h1i06ru2t3d33lcn3hljub5ttdv67t0ogqwb7n2p2kxxn643m4z9ea6o4b21do7wkoe6w5e3mbux2k0fequ8sqj126nd1mgb5qtcdnzsg7p6i84velbg9mh0yz18znfaerkneqt4caz6v3n8s5xw4jqx4n6x91w80txr86kkozyraf6acn8i1vmha4gt8ay6lbt34qlyw9am5s5sduqbvp2rrnnfhwpou8edi0kpq7pwcrm9lvlucs6enumxq02lfsbyf4i5ctp6enkuy3tq4bn13ye6jfc1ll85b2y4vmpn7cvsiixdt4q2jhl9ct49qi4s9s4c1lba8k4hb7oobmgtz4crzxfjs5petl0lpfa24igu0d71fw7oy0m4jirxjh2afggrvom8iezh8lst70ngrj2fr2ci933yrnnbzdxp9fzpa1x7n7bbjded0h0ovmlsott7docdgcsxd37qwhu171k9z5r1xluo3l4xlsu97u2rhofm670cjqhcnvngv4f1dx1b5871uc2850ckao299qf4ipf0oojt9rftfbtb9wlsgabrskl0ek229tvat12k5plddxw2925kfdgcb53m5pbvbi34dd9qhhyajh5sfsj7t1ve4kwrflhilws44vuiseeda31v23hgvznvloaqg64q0zj63xukgvk9yojvtt62t9dnqi5wqcr4b24owm1p5epbpd9u51uuckdwxk6g0nkwph1bl6alxh0dvvs1cmamk1ut1tqdmg2e0av38dmutzbz4drpv0qurqew717m5mrnkpuueu0ak77i89npqthkt1va82146bgal4t4w8ohc5c5gjqipc3752c92bsk5uk5hjwjlj4ic650jx60jxfv7o9x5yk6u5l9hq9pr5uniie4r9s0ta19l7394z',
                image: '077wcrm0syg5yh4nvskf59uml1si1vwcnvbkd8di115aoyzwpss4x0t3sf0fxhmqcf0gaadg3z0c8gq6obz1fphhqulhim5opmhil3mool7sv81x6i1rh52byetc4wnbqcfwmz0q7l0isat64tyob0npdm73yopn7nolualxtblx4crl6rpc033j7cx25v96sdo9s77eedgznpjmhn3s4dfo4brzq6p8kl4hz6quzuctt9j0thb2ivyhuldosriuzdl4sm9tqkxb6sd0hq51gplmn4znodzyor2iz9uifni4d4dv2vt3pyh36x0nib9690lrh9d90q78os4twwpzdh14hzz3u6gs5vn7qe0a7i8p7414drzrrsrzctbpn1ho4axr1mmocz3fzue42isxam3ojh6ilaj6377ow9bsu33ugzlvydfomwjlaeqb2isunagbetz5ccpmy5jew7mhj594p3t9h5h19rtjrtudcda1nv8qkic2ii4g5xtp830o2u6yj3aocf89gowh4cgkd0a9n3yrcln501p0hm2iywh827ng5n37ju3v33wsvxnhbspha181gm6dzdybntb4clzrb5dmk2fmvpt2ibyc70uz59z75xoe2d7ww3459vdso4969xqym9258ljiaq7opstmsndbwixbx8vw3qi0hh2pe6gfg6d5btcldwti0cxp98jo3ndvaebhnc6wv770olhseczuo6moigu3jwhu9cv2b4co7fzh3hops7bmogo6srlmwzufr5xnmmfkl4mnjhdrqba1upzw2tnpvttz8s5k5t17wn48ss2k3o8muv0d1gawx94uetbckb0dapxist6ehh3q6738mprmn1xr7u5bj1whzsvyrwcaxhihhj6cd36f0vok432dleyslpn564i3jsszjqeqskjzl9o3y7k5u5o45wvlwgxpho3lf7c5lr52d55kv9m4nv0bqdn51keemv1is7d55itls16a17ygvkzizgkaphwb565eksj5',
                sort: 609819,
                administrativeAreaLevel1: '2ia4ga2tfk9iy4ok94sb18xsc7pks9dh8ofloxvmkb246oeasn',
                administrativeAreaLevel2: 'citoyv6smrjwov2gbo5mq9tpyndflszomtcir2r8pyhend3y0r',
                administrativeAreaLevel3: 'f8t9nnhqa3cvifrxj8w7grs5k08hkt6f2a7tqp04lgxm1r3nyn',
                administrativeAreas: { "foo" : "bar" },
                latitude: 451.92,
                longitude: 935.51,
                zoom: 27,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha3: 'acn',
                iso3166Numeric: '2xl',
                customCode: 'xx2rc8r9vj',
                prefix: 'ing8e',
                name: '5tmh22onsiyk73gb5t2iz2kc6y3ym8e4tsi4ldhxp1yxhkyevoozk1z3nkuileo7v7pf57r27kg672bee4aihc8m2zskj1taaxk2iwkxj9fltgrex79tg5ubr6ns5749j58b44kyq3it5ng7tzytvg88jsrn7nit2mj2bla0k3awy44kxwb2ayd2jzbx78doy81zizwntedduo170uwp7mv8m837bg7u6357srt9qmxkwwg8xdnvt26kj22njs0',
                slug: 'cipsi5ksjr3hez0dcx5jkx76n7fm6bpz8iwr82qqv2oe7wa1gnd6tt94jgdwzuoooplesdfgs7b40oflm1i37925znjfw031ac9xpuloobz8m4w27e8qkm4y9go0e2xt3lzp22lm3nz2q90bnvl3zao8qhr3khg1uh4ctf1jsk6jevyalgfhx5xcuunxmvuq1ssy43xt3qkwjo3xzshccqd66awfzt06u5nauueajqmdgslg9fzgbq8n3l3z959pd6ql00zuzgcgc7qh5k8dh1pbhskamzr4da9dc5zmruoy4tmobxazvz5mxtov5yl6eq7a4efvirotx6umgzewtzmbewhkiojywrjp4k9iyq3t009a7lyvg5d9wb2qnrtd2uvfzfl2msmdk6xcucexe3rhm7fzeiu3zpsg16sdiress2xh00zxbwfu75808ng79zwhijc82pslbmz1io106823d9bbyt8onz7asn0x5k6njkj11cv4g1hpjb2u0jzdhihadd0lntabll5e1m6fia7abqiuz91wh7a6ydihmdw82a0osko9r0h7yaqv9bcr52s4pa0x8q86todiqsxwuwhnkl0haftjwslf9gy8yiducuxffo5kfa2rl241aj8nh9621bflrdtqscvjlkou1ao5yvkeh5gtd5rek53s3c46ci19jfnuwdqu9tztl68xo8h0lmfgl2gw7y1q6f80kjza2y74vj48y16x7hq0m8hzx3q7si722heock18cpw8z2bcj6inucask2ai71a0moiqckgrbwkqhptnxmpqu4tn9j11ypbst7paxj8x2dtfwfkoukzsrbklkir9edtwzj6nr5jytalp6konfgfyskr0d13jcogzkeo1jslg6h35ly7kef3rcl0cvf9hb3h9l16kdybbdogszeh6cy1h8gylic03juol1pq9b6dhn7cozoe5330ajsyldezkj0ynnpqms02o1bni8547vsz7qwrhdb1vnr32sdimlkcilewo',
                image: 'md4l8y4hvmdbgzb0pyie0nryupjcqvdga64eol7b5oyqggknn9xs569nzr6br2d17j34bqeaaidxunyxps72tizdaruhr5wqpaku7qkxv8jm3oclajredu1art2sp27dzqt4hsvcmknlgyut86c7w6x3vi29l2u17n17x16szo3piannfgtaty405955ykt9ske95cwfvvxr1t999vv89ql8fhnclue6ex4wgjzh7dkkbx3as9gsgh79m0tmp0417koqrlb9xcgqx7bn3amo2jdu5bi70allnt42lzqcvvbgw055enrulj780huhbeyf6fv9wqgozko3pqwf15myfw2m82e9g9q13jtdy4izipcsxew2aw5rl6hbeqlb2p3vsm0cva07lqafvs87hju0dcfcl6sim7ale9ehwbx6dvhquqnyjp0bdf789c73g2k4u7283337z6ows69yzaujajxdl5ux75prksyn5yxkf4jaajbwt26wtwyatgvffa841qgw62m5sjia5k3lww3t1zeqvb4icbhpd9h5hhh20gz5khq6eki32ys7d5zry71yurw0k8tn9gcojp5m8lt7h84u0wnuski25cdyigm8dse34dcwievhbx4j6wgm7s72lp41nng5wpulg4kh2t7b894xdkt86jlhud16bgc5d2q7o83g9q35vdprsdhy6b4rlbjf11ecc7qol4ng19v21htdmzmkcf9sikrp1odf1y7bz80sdwovzvea30g4cpf7olm3lgsxayd7hfbrsxch4hdfhc7z1cisve36i89wukblir31r4f8b6ryd00lhsu8c7o82dg855ghx7475nkbhpmau3jb13u5tclz0lm2p4hyry0b760xr28t88xgf0lfdq5h1jqf910e8j0wb9p9yhxadsvpzxg0w7zdm2l4my4n20f8znwut0je2zbuj6iozmmrs7mlwozhlxiumdfftxo1c1np3x6hxxyq9yxzxhrpl16wv1zpe2p50b4so8dl',
                sort: 411547,
                administrativeAreaLevel1: 'hqcl6j08ifwj6n98uadm6213udex1yjcyqoit44ai4j7dyzhtk',
                administrativeAreaLevel2: 'uebz1q5vz3f17crdorn0gu4e6w584e6ii7ehpkxjuhi9mr7wnp',
                administrativeAreaLevel3: 'pbfs71y1mrvdf2hls15dqlp3qgyi4exru0cjloc7009n4jlcrx',
                administrativeAreas: { "foo" : "bar" },
                latitude: 255.31,
                longitude: 769.27,
                zoom: 86,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'l4',
                iso3166Numeric: '3mq',
                customCode: '3x1eield99',
                prefix: 'a7w44',
                name: '37jk0w23lbrd3vc3kksri25le6ign5nuf9cq420ffgvxs3h0cs5wrlftrniyf01qx6d9ykbp84l8d331666j0ebu0i4dop2wosfb1tqskbwm1ktqmcvnn5uvtfc99txkad7csl9n26y9vsd2jtbw66a3u2drjhnj60dzzjg2rn3x8fcm4mfj6a9iae36m5ybl2qci329f9zj6vek2um2rrq7yldcgmh8tkm1mtt25mm6cpvafadphj59hpqtm1l',
                slug: '6x5y173jmv9flt2b43blgu6w1mg1u54zhwfh45kcjd3s0v4umlfvl1u7ndd186mhs7ee5zgl00rug1bs674ip76a20p6mobun4l82ol6nuvlonl58k1ae1l4dvvsmi4w95joql5afu2g8gw0ou4a6va3rxrww5bu5voxfh5a3tjdm1v93d9se2w6vrx2s1yubiyizk0nhjhd90egghx8f41gdkrojhzlky3bsdiqvwysptlfnypi216kjabupgxb2v5anlbiajrezljbpen8cl9ko5rlcsyq53vhw3x6psrnifukah71dqk8xc8z3ro9xgvzv97wdm1kk2a7n659a3xg8jjk6m7qgi47hr65jczeuwgdgpzn2mt7bmvpostbx4m9p2599w8cu4j46uv1y697fv1vcxudhubvx0wa3ri0hnjhf5xa2ca9cyooftym7ct78mo819xwrvgj1aetx31r92qacsswbt0z200el9vf07xth78br14v9j9rzeupi9tto3dwbua0solq6cquxj8vb0mnh8qiw5els8e7ppy50qiuchsjf5h1acgqjzpukxcoy9jwwhjwybkk356s2t39gmtzc4v3ssqoa7fj7pwhc8w1le0ikq8rncrq3cz9ju9ezdj5uuhmh4bbh57n194zn8ovduhfa15ln3asky0ja1qen5g4q8gmqind54sxfoh9o6urxww2eosgfw0mj1s9txld1wadgrj6m4vj95p9h0qo117k8s6r1o0u372cqdsdzffasbffgzos60y8j292wwkxwxqumn8ui9m6w8carnhnq5v7isx51i8hozzsxomt5t4ovwke31gtxgm7jkccqy6ji9w6h9ti5bvapguhq7aimshg247gb3ahqio335ubqg3uk8xkt4n56exdx8fs83la6pqjcq3asusjrtxveul12hcmlv2cpj7hkym67v17pvzaku2ilokdlf2e1q6w6kt8cc9xqsnbj2ug6ajfpn3psyoz0hks9m2y2jka',
                image: 'ejx2xh2kxa7xazbfmiooaft6wm2t62m6n8xeun51d0qakiou66gfr33jptq2yt82te2vdjqbhcnv4zj3s9xj73ael6pfdrcr1y0rihmwef3k29bu4eftg1p96tidmjyzwyw4x1w73jx2ck6t69r1i2o4noymrx23oonaf1toaii370gwnewwbheekym6m22f7ixqg18krxbq8dteg3wsxz6id41g1194q333bkv8v53e1t9xt9mhdvb5i4wr6797ralfcgkasctumdv62oknvdt1tobtynz1b3rvk27qvnpe3iqq656nlis7sj6noltkf9wnu1rzvz3d7jzl5th0wnfeebcjkp4w2q6y2z2otqu57n9f38cxcjdhrtb64jo748glpi3vxoddwkkos2mxctezjqi2jp84784mzk9keaokcrdqyvrzfxgpyqgbkagnj8rc243oopi0smy45ka9k27ows64dqam94rwhmfdm0i7m9rpzcrdvgqcbe21vlk52ui6xz78fvkfjv1xrzxt8qzxrly7hdwk22bld70ltbox210rwho0matg43t7lda1h0jpy25e38bfq3xwp9htxe5p0kl3xqwuf3se3w6toldcug3f7hddm34rymrmxzdhnf7wr4bndsqvvadp0kxdzggvhlz51zs5im0ejkza0331vwg2ic7x03888qido8ip7j0y91jp3f3omd7nwkfyfxjq6d8abz8i5akldkvj62o2toocvup6h1uuxmeimpv23vxijn1auvrev4xfqr4xzm28pup847j63gh4p7aka2bbsa9oct6nztcmt0v3l1hp4hhyfapbpqal3dk15a423loxb30qd5zhazy8iip93vz54uuqj7e6uc6ok9adj0ril00kajvq9r7udad0t0gk8xxwsad2tr4r5qdxoh19kesb1hqq5kg3cbre12dec9zc0kf8xd13vmedt39o9prg3wy2zq3dz7fmlona4nvwxcqcmna0q5501vvdnd1cif2j',
                sort: 794971,
                administrativeAreaLevel1: 'cu9807gggxmltekfvfg288jx084pa4suz8npev5y9g1024ll90',
                administrativeAreaLevel2: 'nl88n50y55wups4u8s9dqhmv3h2x5txszh419cxnpslk0tnlot',
                administrativeAreaLevel3: 'yk5muk3nwt500k0m9skwr82pepj3eqy789tjyoflzc422le1ij',
                administrativeAreas: { "foo" : "bar" },
                latitude: 40.52,
                longitude: 414.56,
                zoom: 66,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: '8e',
                iso3166Alpha3: '9gb',
                customCode: 'a05peke63g',
                prefix: 'tqo70',
                name: '99rvvqay0evba9ok3zk97yar5jprwkyb9gdabu6gu5qtgeobrlvrskdmcnqnk7n4lvxo9ih1pr1721b5k9s0dbvq82vsu8rx4g4f9mcgvl51d2zvka6tohgdjxll4pbjnq6h29bctk1nj7nlbfqd1mrhgsogt2m92lgsjw313zhzm84dba5nnl2zdwzuc203f9sw1qqzfhzr34mg7oe9mycnfu5znmrwiaadffnw4skd0fxmdwmzpfv47xgamva',
                slug: 'umtg20db5kioxymqiorhjowhdhwbsbh3hjtkxuc01ne1t92gms2s9ib0b3rq3bw0pxrlyxe49o0064uz6ltlqisxvxcq0pcxlyj931kbt9pg15ntnuc4s4j5iy1prueiqo9068x0iuvkvzaarnadky0s7ai2095chmh3y14cwyifxwbckqhu500zetlggi2nabkdcwvljhcu0caildhreha5jbkvjplb7mq854ol015h0ads1xrnljrcrel92z2k2v3s3uc6cp2r7cul62r5kxf3om2b0q1y2z2gz71gawz8v2b1ldf0q5evzczievk47hduusr9wsgyvm6ww9oobcmq24m1jbzdztmlhhp8plnkiaalqi7hgj1acg99xh3soxix07hvdmawi9v9j0bc822t0ug4xa2v5qza4fwc3gatwbjbls54yczgl4iqsp8enky83w12nnb6ib6c5ta8e6rb2dbnw5e3lwzkcbyjzb6ky2b08s6d4iwsa57zw3qy3nj8fhi5wjfnjglliyk8sbiiejnjdptg2rj10dc9hprv989e2ccqwyka6t1fetulerdqd9ytfc6r4ae732qv3w61lkmfv9j0y2hdvrhxfuusmtat23vn8cjnir996gpwrzxam3p6ipfelar3kkmki8h413ayt5l7x219kxzad8bwo0um14tqcn9b8y2sdchilutcins8pdmd0o8labpewryfjvjidrhqfyusa9xcod46iiyco5ia5lisjpqd83fxl6firjkajb7s2hno9fc4mwb7xgkcqhade814yg6lz6k6hpt4122v5a282qn2v7dp69lsamw8p753wqvawjgopxl0vnyzxeo9r07nkqx7gbs69tzsj5nvem2mju66jeoo9y18g57tfpkih7e83inhmcdq725it2gepcswh29ne9fuyrvsi7u1tqtwhyhepqs7y08q3wlbpw8me8rtyl8wbavw8kzzyowbjn0ebkxt4rj52ommurjr858qgyr9cpos',
                image: 'y4g66vsg4wlfcztqnhhd9mw98w5xaopopydzpv9lv9yp1znuicgeojdbheh8gi4a16leepwpyn2vu0nk6ddfzmy8ib4m5vyx4q5as9lip7oq8sml1avo9v9zb1euy7c8kwefvqzbz1k6gvhosagqf9jkern9qywlxqoofvqq4r562c6rw459wjr974g3nne1gmbsj1qychshxmi2gt1xnoo5qmhmttulserx43un68yjnuodyi3wdsaagvdughpfxg6120rlvda1x6e13t7cqld0kv50f8j5xn0np2115jx586ybjtkua7nckn1r5xqld1544btcx3miy0tfa3gxyv3ewtwg2b70it6vu84ya8hol2730hpdkrqkd70519wk1t1rfiapd5eanbcxee52drjyrdp4gpen3g3smjf02crm16vekj10l4cv54roqewzhspisft2z7rezlu3q08gddmkvrc1bmrvb478vws8rkyqr3rh0nkv7c3v5j6u7evwi7d140n2a9mucvc5mgf8xr21z2u1lfmfb8htxvm0a3fhku7hqnu2wbjmaiu6bu8f3sxqzqzyn7io0g1um4l7u1x6wahoxjda4ygw6i0kb5nkg60byivguqxw4ba3wg1x3emq0uox0dhccnutdpud1jz7kp2he9umwrcmc6yg6wmljhde0levf64vd2bg01ykkb77r0xqlp6he7cjo9oqet1j845951595ye4w4kyzth3uf000f8lx6gcc90kij2g0kdszo5puezhkudji7983g54fo52qee8mtmls67y19epzsbr4fhc3qere6cg8fapybp525opf8jirhy6girov6rl38kjo91lwjl44di1i1hk2676ugm4nuuy8nnqponks8d0uoh0sd33agwg71xb4sndpwaydcaosj40aredpxms0uqlglwh23blpow3d582n5p32juol0y56vlvyxuzf5setnhtry5pdlgktpsdoscd8po3fut4rndrwaa7dbem',
                sort: 732204,
                administrativeAreaLevel1: '1mmr8d6l9w07c6g17ec67a5cfm1erk37hkzhs39ueykrryrax6',
                administrativeAreaLevel2: 'ds2bn5tp7t9hd8j0z7xhqcornvbcd5fbb3k5mktsfuyhggx2lz',
                administrativeAreaLevel3: 'gd8a64lsljzubnbp9hduh3wtsq6xtlqhbel3t17xaqyv3l2kgv',
                administrativeAreas: { "foo" : "bar" },
                latitude: 257.43,
                longitude: 129.54,
                zoom: 15,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'uh',
                iso3166Alpha3: '004',
                iso3166Numeric: 'in7',
                customCode: 'fiwhrnjtkn',
                prefix: 'ya18z',
                slug: 'tel2iglvyk9gwkzr72kkcxnsin8zeu54rtjy018nejgx14382tn1v7fsol9axp8m2pp2m5yjt3ukpib83qga4yt2axwgieymmv4cy0wbhxabxdntndhqhf8uohttjc1nf5baj8noepzok3y256fbfyrsuuodmxtv3yp8p1phy7py60hy0e1r3o76s87l3vtdq12vzfzd1t1mj1gqw334z0m1so4qxvpidgul3a63xwneft148r6klz5rzeqnxogsggh92hiygwvx3sdmh7gujx2brbx3skx8udk0e9pe6gkx53di72y7csfweuoy1ddxujqni9gk0genkxpeh24937i9xbe262p5wqs7m80z0a8qojd3op12zuck5zo4waesjlh8byj7khwd8pk2ru7626xae81uotoo4x86gfvqr6eg98bqeomt9benhf9vr9tvmli228t5jfx5zcvp2j4f9uzngjakqa3av220jks6j7j85akr4h1f2z9kx04nrzriesaseysr4bdh5ofoi0s6ydd1wulmxbeb31tdz62ilkn4g4a0m0i520bh7i90h4ulif0k9ucuc0sykofkah51f8wvbl4s1nb65qf29v5w2648ta5zs1bwxry8d15b3z34r1a1at0vo76z4a5klrcgpjaehrjz470ll18t2u9wnv3novnmaunnixlmfi01l55s7jl7a6lo6mvbgr4mfb7bdlifvsxlom90w8csn8e4mnhuqwqcgwze912789abrq5ws8etoc965wxojutcq7oac3chxqgvsz0p4yg7rtyoaytz48ce01cymqmvqjz7dshcmjvc1v9frbmjdjcliq83q0242842irioahow6g3k998prad5dbec3qsipp2j984vwhcgnr1brc0hkppwbweh4agnnd5yyr87n4jtqbppt1avjsadw1umapop0ajmrath3yzowtc4lkf50ajmwgiairdy1054cx9qly4fg9qdayu59e37r0fg43f5gxsgbbdp',
                image: 'wtivrd0nm6ob47tsuo2f7lfwhxih8841p82ajei4zmhxnahby816q3jvphl4eb32l2i3bm4w5mvxabpk91xdecvbv85w4jyevrwu532rgehb0k2uwsjrhh4cubngboqbm7kque9gxt2ati31k9vsyffgzzsziqj9apf66jlfn5g98eux9fxqe7c21ao4nar3eqijpfmhrle7jkx9ym97hrvtg06vnf1qgv8i90wcg3iv8h5dhmf223uywbijk5ardwih6wvryogsqwwt32d4c08y6vmtuktroqvmeq8nexyuydhd8ni65yduv797pcyjjl83yujop0y3ygoiiql7e3iwe7d1aj7zni0opqknyb3gztzik6m14jff498idokkrjn4avkbldgxq6au03m41fx1par3u4a1lmmwnj8hc89vy289ijvyiq0os5q8xhc5wn4eo3lgke57yvkq5kuz7yvoceln4ct2hklh7pj28lo29n07w43whgkgiz0ww1pfnwoxfba511d65f716inp6u1gswowjkl1pm4peftjpk8a6ceez4jz7nye2tutozp1t09cn21v2s8qdhuczh2puqdgf31unni3qwvkjrfm1jbeqc750snl7i8cr38tzyca023tsimfy4iq6ihixn3zf93es5h4mnn74zyfhxi562d70c5b41twg5r2l78rm8ekcag6wjbd985nieriz141agtm4qlz7w8vx2o87souicony9hqg0pmm3g2jeew2bkyvh9kbamj31xg5jjl6ei43wuewpm23puvjes4g0kzix1wf1j55t802vsatj52ehrpzlmpobgnjb2p73lbwhoxtglux5lobovkbfb0iya2mjwzkh58tagpdtj2d6cp83mirgdcidrbd3j1byf8igx3k2npvwhndokyxu707vrpc5xdkcd8rt9tt2y7lmnf6nd9yk1bog6jwxmx5964ew42ce7eaku8oz5ag0gknbyr1679y3u83qxjleils49zuv5f',
                sort: 488311,
                administrativeAreaLevel1: 'pbuo5qvspuhux4986uvb1ssz5si538sugmxbek0cklr1nswvub',
                administrativeAreaLevel2: 'c665qkmbrlum8evn0njegs3v1k0zkmq5acmaob3o9qkosotih2',
                administrativeAreaLevel3: 'mayfohiz57zevv4qm7ekuv60zdrmw57286dlxxogrgd7a045b3',
                administrativeAreas: { "foo" : "bar" },
                latitude: 824.53,
                longitude: 651.34,
                zoom: 83,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'qj',
                iso3166Alpha3: '5qo',
                iso3166Numeric: 't0w',
                customCode: 'xsl5q4vw2x',
                prefix: '0sgvh',
                name: 'iyclv7zr9efmcfkpxwshdb0hmkecxgga1kwmr9gqhdfyak9i087nnwdx758r8x201pgnreawevh5curenj7j3mhp46p9tws4c415h9ebvgst9kkhnp86pdiuebsv9xlqy32vlbrkeh8z2dgope07ncy56fnn7fsgxxtt5mfrgoohu3w4k3oeixfyn81wj6vwbxa36eb3q0903ilg5vhvh8pn5clej6508lzo74giu4a35y5lrsplrasfnpbdrv8',
                image: 'qspbs1zbtx3p7fpytp77s90b0nauumf0mxgn9tz53203pe46s6sugigqn70sme9szljmeyg75e4fdf4cplrtarqfjodz0qjht2ptop44pem5ul6g8g6j64eio3k3t96d996h3zp66ztzoz318flnls78iwxmqlj1is323788oepeaic0gjzrklotd486si1366z8r3ct9wcjnvzym2ha4r91ldvcz0rgr3cp6egkt5zm56otbwl7vdgnmth25qd83zhf212zq7pm82wh5ti702eajzcmu54v21wc2622mkcb2rgrfyvjfk0a2xso5zlm1to0kcm7iv5gmv6yij5piff5mqdobe8sdw733z6vh1q7nlturmsj6h968uoxcmuv78dbc5a2i772zddxuk9zi33e58o7svdly64srxin4mnsxro326o3othz6trvplh1arft3k9jxkm6lvt91r70o6j15n73m9gbs7o2umse9ailjyxsx1fq1gcbu8oah1kxxew0pqnss9650266fsbuch4cpmn5r8ktv30jivdh202j7j0el67n87ldu7xck0gfe8fw5ilr4h4r1pt1govcz7qr2n3fzzmviya53pcr1d6tmxzw939qv2xwof4n3vh88xb09hu9vloiuhxlgr2e6zjvnntg7c4seod0k9rwyotk2ldpl07hbkv5rl6iq5hpbecst77lu5ls2zi5gt83zdjfrzsrdij7ie39xctzoq1f1iq0g5qy6jaz0rc7tzlsvac9mt0n9o6vdicb2cs4cddlxx20ytazcq7in0shbbsdhud2tv7c0mgtjg3crkaldd0pc28vwxcdh21a9yfn4xyog2n0lnfbjih8z9j6zkxlym22uvjnvrnulmqrexe0viq8ld3rzzws01xu2906ig5rmx65ou8rzjkjjfci99ajqays4x99taun01defevv7320klo6j2xh3ijeuuabjxv4hs3dit4x0nbcqz626a6qhkysdxd57k7vlgvrb7jf',
                sort: 895287,
                administrativeAreaLevel1: '6qz7yfo4f7iyvka1m0i32nzl6hib0l8hmv5shyxar6kl0rp9xm',
                administrativeAreaLevel2: 'agybje98t03wcwwvlscgpn5p9vrcko6ny2uw3o04t5lxcky8oj',
                administrativeAreaLevel3: '0gknsoqlvitm0hq8h3lhkbh2tqvneq67pg5jr3f1r8jv8y9qf6',
                administrativeAreas: { "foo" : "bar" },
                latitude: 624.34,
                longitude: 401.67,
                zoom: 77,
                dataLang: { "foo" : "bar" },
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
                id: 'hy59kz76rde2rg4yz11owggcmilyrtu6v7v22',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'd1',
                iso3166Alpha3: 'c33',
                iso3166Numeric: 'ton',
                customCode: '0v3vrd7lnx',
                prefix: 'jngmb',
                name: 't7me3801zvwu570qrzoie2cvalpmm04jdd2gh5st8qjqswx90cq65vyn7e59ocmhumtqjcefnz008wn9f9htaoe7b1q1o3dzhwig5cm12q45qwk4a8ye05oum1ivmkm8sjflqxg95y0ffykyz7ie74emxjqiyo1q2cxhrk95m6pxwtgk9bdsr0067uxelsy1vj2lkl0xom0ktd503evg5vlwxbf24u0smov6z5tfnl25tq7h57d1qmezhfq6j9o',
                slug: 'ez2x1zsf1qimqggbznq3tkme89otlypn59m0gjukrhxnq00gigw9wvh3o33qs1z29quz37h7205h10v2jwzlfy38wfgli3zx5b3a9fr0m11enpu7i3nqmw513q4esxtb31vabvq72cqi10h1k575rdfjxyeg8eziaz5s86xsh82x2ocwp3zchyzvz4ymy5zqm119qvpsfh3skt0rnq6rycyrmtzt633girosxav0swcd6m750lrjs8tetm2w2hr7dy5q96dk9vsyjlvr0qcti19zkgv2x2wfa2vvkworgpf8tsf7844akg6b7imh35l5691x2wrfs069d5hx6o4god5cogfnhlicsskczefoaadspdcsqwjp0hd42syxilksrvhhs55eh5gy2rv87e0uavpd79tilpt61no6krh2y2beswrw1c1v6jje0vtvb1qdfjg1kq45rm4sy3127puna8miu2q05siicjzn9kko7x4eiskeb1mrlf74ijfkcyz1vws9utwxusy3oh6jx7kazl0xrka30jsff2j3nnduvyndfaudv12y29m5fwugmmmwdplssse8mjz7wa2mmn3xlek0u3huefy84onbk3ztuhk3e94t286njr4t6wddke25gnnv64wdvu2euthd1pit2v4im68i6alh9f5mu05tt0zjgsuilipc91s0gxtz7vl897ghoqs4ozjz3zxn0otnjlfwnv23a6ffyjc5ter9pyjyx7fgp90b2d7lezqnng38fghmd8jxmnsknv39wawrs7ef9nf2p6g8uvia8iiwf6hn2wbau777pac3iymgyeyx5v7x8413mp2gf9zvz9oofittjplwe5fe8k1lu1koinh59hmyq6oa716tpm3m4mclurtdzo1f1us4bzf912wwyzrxcnl19xlahobs45vqnypjq3nqdw5ool7x1er1zpqouf199o5mbpzmyq6mglfbj6wqg9cgyq8e5ybz54h22ax9oenty1p5dtrkgwio3ts9',
                image: 'kynw5njkszalcw4wce96opr46yi6xwgei07bxvz3pjk6hnahze6wcnmx39kzq5ncy91wxdpmyzjsqgkh5f3lvm6x2q29yfuagfl7r6m0aimoui00qc15w8uk1f16r681exzxwkvmv4ccyu5gs13kxdhoz8whi9be3m7iasmfpxvoihfuoj5cmxq9c408d6gzoqbm23i93p494g2h0fg13i264wuod9cndqotiv92k0rn34ih6ohpnhpakhffy9f2sa2bk6467uw09d4qb4k36x5h6td3x3vnii3sel4c4jkg8jyyjkimmpov1aej0qmfe6sbjctlb9h8nltxhi2gdyfeeorrysqwsp2dzwqq66x1sboedgwnnfmae2d7ugq5ree3jyye4o6c29c2tn1zqi1webofeeetcdm7kw081o6uqykx0svt2uj6o3vhnj3fja44ln86xaeqidh0xgndnu3q3g1fnrbdq73c7j2prn7grpvj9i1sa7tcu7ixnyreuj025onrmwziuh6yb17ku22yy9fwtodkoaowhqfzohuy3dwye29ljmzddsbo00u7n4est6loqy3gk5vd2lyr3xbgw486u7m12pmc9f41ufx8hgxkmxyt35z08q7i9wzsg3t6rtn105ll6hnw4mpc8l84zysmz8ibgc7lgqbnra1bpk5a2ar1tyygskdu170p8rvewc4gd9fmst15o5dyr3z7tjfxy0qqm0uc7d6jd54hvdjh5vzp65zhskieappnww14j1g486c8ixpay62t692fta3vsw7hyyr4h1ow82gv7cijz2l4xmsm2p79xulkiv3gadruylaxc18todrdfbizz8c32b4uh41hdyi37zhek8icpe3950wy70qq7hqop4dxq1tuzdzfm3s6120g94wlxpjwof9r8tmdi5v9c8uqmyortihzqvrou8tuce2jhdnwmmz36hxmbp933v4zuiisnu2xibd5logknivrcpjif41x3krrq0jxulu9a45d',
                sort: 822406,
                administrativeAreaLevel1: 'azj9c8i1rcotouj3damciy5fj42z5m28neu4r13f2lmjoqpm6m',
                administrativeAreaLevel2: 'u8tk8edq41i2le78xjb5swxa8lqpqqeb5q3kos46q57l6sso0j',
                administrativeAreaLevel3: 'ix4f80qausxpp2139fdjyddgyj9wujml6frwmm1g93t6mp90ta',
                administrativeAreas: { "foo" : "bar" },
                latitude: 359.06,
                longitude: 917.11,
                zoom: 76,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: '19obpfjyhbex8dcztefrgiu5aptkpnyg2gzt8',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'u0',
                iso3166Alpha3: '6xm',
                iso3166Numeric: 'mbu',
                customCode: '1ymutpyraw',
                prefix: 'pmkuo',
                name: 'tkttaywemqvojo76g63pzkmwyixn1oi4owbfc40ztw5t285j2fkkb29hnnsdxhqhfd2dxtyndmbpntnya0nlbendlvv4axsd5bzw9b0skcktty8dwesbqhrryqzu2d3jolqnnnc1p7lanmlor1x9jkgiiy2dfocx9xsp8azyahnacme6wmlxhs49ogfwzh8kwx2blqqvd9qnjixrwsl8s25tz0cka7t03wq2l1iqcsc472hcop6oezbp7nggcb7',
                slug: '1wwkwjfkocgw76pqvi57itc9ykutz3moijueetwj7bki33p7lbesq98l14p4xt2gi0ncwi7g44xdftxhqtv1selwiiwlata2kce1eby7b7sg4a4g6c5y0chqsfsid5k7wywqnce4e3s2mpaxp6qhze787d7ir3enlailvjb7f2uxdaevahkv1813384rqzbunsk8v9kfud5yenqf1ae7ey6vhe80rkaidfufex382ajjmkbqntqv96328x5zrf2rjv6m8pyf3lpscyfye2zus0u2tasc2p5xxovh45s7t8oejnpu59ocr233xagwedrh26z5k60stlko1m7ncib4h51kzl3963bequk8u6lvfpsyb6jsoauycl6an2mfvs51af7emjygex8mi02wycun1gcl4gyj8mjvgp25gz00dt48h4mdwhywvfr6mc0rq5nprdvj83pfyp804jn08op2y4roow5e2jkdj2yj22acf19o8r7ql6isiibv2daoqt0ihvnpb7giv5pzt7oe3vcrvne55y260a2mjpzcaueovzwz2khjx2fxteb1uktwltqm0zp6ipsdqma4pegzk08tdplxsdggj5b0bc81jzcwegrvrqmd16zlnavkp2f3oldw8165vi0x7v0sc90ypu12723bo8z3iviheq128fbv2l7ng90rl1brfl2gnq1nxuyo4sbl6x5puqmic0h99dyqsordew6q2x4dqq1z3hb7aacfo932hhpzls56ffm8r7bw09337m0gsieunbk2dyuw6c2tqkdx0lvmhkx7wtf0umc2cn4v9adaiqvv30k5mc36nz0hfqhr3prmhghhlagcxymtn13y5kukxox5grnm1344ax1axzjggttzafsmetxfpgn6pdprd4emhp3sthybn8zukqyjtuygq35btixpfrfoefh5bsocz5akhrmk9wtnobm12ujk6etu0bwk9rvmmoedxwwr7l9w4sli6meutsr13kpdszw2art24tsgupuc',
                image: 'lqach9r6pa1eo9o7nfwj6gzsxyxuen354euex0bk3aghba8gxf46t9t167a9117a33zcxxt7dr27d51fkvfeguw2lp0vkitiyvz9q9m8ikcr675l3mg48uydq3wc7mh9lw7nl3en38emmfc9rcqn5us2vjqxplj2rrutjlduv2b9qlf7d3743w7focmzxiox534475o8qzlqi2pu3lwf38wi6o9peifkj8qwo4zzlqxi70vuv659h0vorky92cug6bh32tbwdf4kks4a5zmvi69ywvcfo7w6hgeofx6ciujz61zb3u4b2q0dh1g5fl4xbrvgqvbl66v2slefzej0fpzkauajdgsiyjb9n7fp9l42l0o5jayfmb5ni55b86eixxecic9gvsoh5a3ruwf44ozzfc7x3hi9136by8149s5nw4qpe1po8gnawgeehsba29d40ouy5h4c5sy7l3zbr7fd0misgd29r3gsntifn76t82o69qlg55630ugi81bqg92i99ma1bytninq8r4wm42x3pxpw2bzywcww64b8u6hb04qm3kyja9vag7j4x252dbsswgj5jkgm8ytngjs4eyq7ge88ew6vosgnhpq9owiz5zagnkohv8ln2svv9f4g6eb29crox8tsatqaygte744fggqwy7l6qbugzaeo7xqco4ljmwu72518f2g6gbsvkxcscd4fc7n8rfqsawm6mvrcl2vuqs93v0snfhr72qxusfi4y0p6nxx6vzolcfn34fafr7ncy0b3nxyf7990cw8ysfr54zml22rvnq7jjno7ofyl9znf9n97smqzkm9rfhu79pqaj6xohcvd4wvg9x5hw5032n1xmsnyog62z8iclmz3brp5pwzn914bst00fuingyy0qojoqf0kl53qencwstdxyc3wfuc0r5hp6eadqi2rojfsn1693wub5hl6n4rdsprvfu9vrolx9xu0w8x5n9o06msuxbusg4x6ji2t1rp87wekc202wnc6909',
                sort: 973068,
                administrativeAreaLevel1: 'mx1ge7motu2gd6tlyorcyv8ra949cwpkksizosi1nnbrgnx08i',
                administrativeAreaLevel2: '80c11tmgie8y3tvh7z81dn54g17uq082gzrbyjbmfr2ynmpohj',
                administrativeAreaLevel3: 'gpe86dhyh5zex2an0uy9oqiw8hhffjle2wzr05cx7mz6s8n8db',
                administrativeAreas: { "foo" : "bar" },
                latitude: 983.25,
                longitude: 997.01,
                zoom: 43,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '8uctnlexv8ni6b7jdd92toe99saye3qe5xedw',
                iso3166Alpha2: 'jd',
                iso3166Alpha3: '0qw',
                iso3166Numeric: '3sv',
                customCode: '0t554unmzv',
                prefix: '6vcnp',
                name: '2riwqojih7t8eybbx2u138f1cevq2ycuklt0mzd3gi2xqa9yyliu5d1i33o1fzubu6u5wdue63cz02c0orqoa536iv38lo1d6fpqauesxpmm1qgfdvx9b4s3jy4iqert9oius5rtlitjywd2lkhpi1xa4ophxzub2hbjxxygvgi1r8lpkbvxuopryrwlc5c1ao74feb2pcqcyx7mdw035en2qjge1vsf4e4cjo7jh8d0lqil7yni3uarzkpkidc',
                slug: 'f0h6mm5r1sd71gwz5cnmjw981q932vszrc6fdqvixy7p4x69ywgzao9ytyfgd5fcce0e06nuj9h6q4sv8avt5u8q7d9xfwbt138p36bv8mz40d7ujxkyk21y9tojlofucsw216fiyu94h6q95iind5agptlfretws39yk31ul1in4q7pa4pk3g81iik5y4zdkk7na1dgqr92rrz2un46twix045u1az1xfvcwozggl08j8x44kqbmn4415k3qokcqou8vgfo1o2uarmw9pdawtmvqz4af6n1d99znlo5yu22vp9leut2vlw54xo2bcn3yudt6qg4vie12c9ur9s3djq71v0wec5nfcjidqmoohyh33mh57fara6hoz5id6yatbefr66s3dndk68459193x00me9s0w43yzhvy5hrwy2cttwxyj60i7ga1w0tkb94utn112ckhw0s8og7n0k5qsyuv0fuh7brhfxl9wcll1xjun8g28lhqhfys7j2x8rn06sjdb8x0s7934c32ijzmzmddw0wf5vfi938xtc3x9mkogndzjvggj3dqemg6hucbs0uxc00rdyvvxn1qka9w1bh3ogi3uz2h14ddx5znhqtl8t1oun67nylfu0ogtat8yloxa6otljy0yf168jyx49qdyq5yxuwa4c17fwsl5y3o8a2bnvbmu7xth72j2jehqbrsghgmd3vb1v7wylicz5gesq22x9vw55juhqaizbgyxexmovhd3i1uz1z4rmnk6qpja3mzv4lqlgb1k73gnb9w320c8s1t8fribxpukllr50ma4r0rjq1qaoiz9pml7shb9gb913dy72xg888yodi8fl75di9n6zwxgm6fra9s0prkyw2zdz5sejc60o3ytz3iv3wm9mrpmmw5qh0ah273jm22cmfjglq9ejfy0aap866kmza2048g9wxh9882l88wqa5x3fvyhowycqak35pd3iddlnk3gajdumq93hmtwmwam7ar0z9halgovb0',
                image: 'cfnxwpg7qmnln8g0euq0pmde8ilqmt9u67mh8wyo4neq03euas3yj2ucu1pjyoef32dwrwrhnt4bf8pj4tvzccr66aggk8j3437roxzgta6qjo5qef7gypzxjdftj212tgagdi2jnwwmx8vvoguniorn6pujm4958txnuv9e2da7q811hlero71oo64loobbx4nn10ecq2275bz3j6z6ggxrcmq1wm88do3yh8atjf55nb9cmsttzijav1sjpcs2k18ymx0wsmfg28xfcnn83ix2xmtqxdfnhelqq7egjgip5xeqjesrc3i6r3a8vkfdosjz1b0i026gs6u2pwmidjxbqzbpxe45lmzbkbsgfnn2b6z88fmgp6sse30c08p6gdpy89d26uyh25ldyvxrrmwzdtwzxggpmnrj3qhi75ode99lry9np8wymz7pp5150iiw6m7wflkdawpq080gegh8nbgleypzvvwuaf6jhy2vr10ha7uuctr2bzu8ds7s7yxsm78nb55ul8qkvwxb1kqruw3dpt33iydwhce9ve9g48308zxdzl9i6hnp6kd8w0r2hvva73mo1yxk5u0x6v3o64w3elw3eq0wovv8ujv3x11829o75esbnsi6q4shtvr2l881m9264mhkhkgipbc3ybls4tsh19dpj534dqu9rcmja1lnwq2xgmfvt1d23eeglcni7fo9szgyzs61cgbr7oehykd0gqiyy0phj95omz8lpzw8khzqr61leo6yzx9mixc44zn985169zr5cqycmdtb0f2d9yif56gud4o5speqpv8b6b6tol5qlqi2a9fx3xb2558r4g4afaoa6axv7fhzrphur6nyw10zymo8w5m5s27heqncqdl6qfds18bf6z8sdk21r3mteidjfi8fqtpq4j66eti54hf1s2zvyul0bx1ps4iv4a0k3u6s1ephjorutu658mc64fp44zaq2ye1zsoe3h3ioywpbjm83v436gbu8imzy3gfeje9',
                sort: 481876,
                administrativeAreaLevel1: 'x8546b9cxi4ecliyiqkzp2tkxor0yp5vv9mwum2zoe54p5tlug',
                administrativeAreaLevel2: 'olkudwxv6tnbb16oc8xuf9smm5sri7ctzgblpsf20chglcejga',
                administrativeAreaLevel3: 'tskclys3bd7blv55isu84f0fi5l4ymcj2tedgbcn8sk16vlkkg',
                administrativeAreas: { "foo" : "bar" },
                latitude: 761.08,
                longitude: 818.48,
                zoom: 99,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: '5dn',
                iso3166Alpha3: 'ru3',
                iso3166Numeric: 'f6d',
                customCode: 'vrmhp2d7k8',
                prefix: 'ka0c3',
                name: '45fxwgxcgzqg6lk3hckqo3zvggfkel8f45f3m8temrbfbp76grft81tdpicxgpgyfb6hq0teddkxsjj4gw0291ml4kkui31ioqu9h03rzoper1vvbm6b8bv8qh1oxcd4iq3n0hnxxv09o3v825yzzvz6arz98imkt33aegv905obv60r0ccwqj3h0za3u67vubcak1yy8bet2d796zbbo0ahl9huisotoqca7gfl1crtfa9qwr4z8sbxtqhkzt6',
                slug: 'pdppk6i10vnhm4oongbbu7solshi9u3k3oe96tmrauc44la6bfzhqmb48tudndtkek5anqfui15bqrf7ikng40eei21swb8oktsluxe35eyzmehi16dxgyrkwwxlbxkkeaw38umymq6pk3rx64nmcif7k49ics8vgaj25hxygdw4rx63m2748e45dwophx5pzqgnj0ob7gfj0uv1n0gbgxuebjzd7pzlpgzo4vejfqlsm9u2u5hb84222g66brqtv6hvzyae2h3sinueakbv3wtxcfslso4474ov6bfk1w4s3ws5ag5bz8w7tzf3dgi3sd1zpqm7nyw28my2uho0l17igsc6sucx5mqt46f0icic9ndf64rmlzaa5sjz3dyva7ittsmql8f1bbxgr7azb17bejy0kl2ggf04ndqddgi12x649o1kcxoen7buehmyruvp9vogm7jymieokpgt0gobaczmx6jlbor9wgzds3w71wvb07qwnsy96rsczxvo8siwqpt6sk5mokxwtb02akje8z0n8unt5jb75h0n1g5bpigojc43oazwkl9rfffgkk1pmmglkku1xgdku4ojxx3xmwyjosj41qwu0zntb8kidwt6e5u9ljufi13nqhdp7wfsx5vhgzsy0qtye53r9r3v7lraspm0ta6ruzfuesbqpwcph6dj1pxtnxq0ijrlo2osng8zni5rhto3n9r16d1wrs5062m1j5w6fxii75lipjoc9anmqp2zm65ijxjhm61g0so1cxoekmiqxed5gqfpr4kddltxyf0t1rid3i1hxliybn53vuhu4nsiumr7x62avfmeisnqn0pgyqst6tyuntkb9wqgmkhbnqndqw70n38n9d77v9h1wkv56x08dsoecgikelk2jih1ez2sydsqglkds10vz67di4ap5cl3pvh1pn4088l7lf5gr8hd9h7co1o2ogswc5rbqh5k9begnn28kcq0k590u3ywa1uj6dubwonx8ktnhn61lunj',
                image: 'h45alwg8knz6qzd6ipwe9dsja35tcdsc5e0q5w0jipx0gcgzs7rfdnn7wna73wsmt9ao8nu8uvda6h5wz9l180vut5ksw3lbao25aln9ltil49hift1l8v5syuyjnhs49kmndyw1gve3fm4do2ppvzxjn9fagpk5bad3nljarm677nb9ju0bynpwdmax679uvj4jl7dy5oo59vgynqxexj80429b2h20nca9b9dtanxra4pvam06hao3ndztfhbh2eaf7x843pdjwj9fp6k0ke49w6ic0sqal86buv0p3dhbls264rg43376revjxj0zg1mh958p1sdlvhl87mwq8gz5ul9ijr6hkhhhf1znxs549vjdjt91osjvuhyvn7i2qfyiyx1kannv5t63kdgpmxjtlw741w53kdyk2yd3xtu7nhmca780gia6reqgeg3femvxg3j21whup8d1pyevy5lfvyznkor60hlh06klz803wjwoq6urw7uk6zrszxis07tp5o6q0n8lgrdmxzs188etykqf73gxj3dbgkt26qlwovv8hcdj80mbdzq1fghn1xwzcy7r0jok45vg3xzkkailbl9aco22qf4z8kz0dj8wrrisk91jnxtihhylxe7e490vshhayape7d9sd0ezttvin7rowj2um19zb913jhzra0z3sjbewfqt3dgedue3sg604vcc2epvt8ff006fdoj3fvf80iti9z2h42ovm0uhugbrjb4sq6bbdr5fq10gawc7whdi8s263kg4zpn305s1xtu20t2ymu0sa3wio4nbztkhlborm6bqcwewbxzibyl4j0qouovlzcwysh44qv79rrayba848i6apyair3ej0znbbhxuf548olkvkebzs2d6ckc2wml2o6hnr7r8u59pk04hlu2a1lqb4xzsx7v6gn3cj2x0q7ior71nnf5bjqm03cl1djd2quttcqh5wh99k8ezy94tuimtyvv3vxj083r2fnh1wssd0ogtllbt',
                sort: 280022,
                administrativeAreaLevel1: 'hib7sevoq3qthn0xr04i4ea7bz408hn713t3x8fjpw50691t1i',
                administrativeAreaLevel2: 'krzb6pc727g21begkubuc16gs7wxwm8qazpp8igkvc4sfvh9jy',
                administrativeAreaLevel3: '4wvszfnbqn20xwoyq5xzsvz3aqqub4nv1nh7n80ech31abjbad',
                administrativeAreas: { "foo" : "bar" },
                latitude: 350.78,
                longitude: 410.52,
                zoom: 44,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'us',
                iso3166Alpha3: 'zkh6',
                iso3166Numeric: 'gqv',
                customCode: 'welaxy98yx',
                prefix: 'mhhf6',
                name: '8qewsu7m4sb9ckxgjz692u3rwajfgdhlt6womzlti4a7kxxhem4iakmbzz1knnruf3ft9su1qwetfdptnlypch9xmommw8fu28ixdhab81hxv3v81262webmtyaqx51grc0eksz34x16ecyucgv09h5zf94pun7ab9r4bi0b8gvx8fdxmfg7som5meby2ning3le3sj8wp6ifw0cxj8yem690qpv02dbna9qoj5la916jqwbuggrmbfx4p07oct',
                slug: 'kvsod9i46qcs2shixye65d4a4o8gjsqvkkchpq7tl7rgku6gmft040pfto4h9jny2lfxwl7sbmuxovpho8dwchfgx03t8mu864cm65urjubojd53aq6nfngl0hdbl4fs1g0nkx3o25re652al42i0s6wsy0qgtscned2mwvwml0ecmcv43aowt9nshz0dg0kzjgp9wb81guzvpvz36eastm4rt3cef7p7f8ny9gbkmz0uf2wd625w6dxg6zvt0d0ma8orrekgdj4pusktbpkljr10vg4vxbf7hvvlclm284y0nplvg07nhtm0h8f3nklvntyfatrb5eiukn55iwiav2ls6s794ycybyn2oku3feojxft5pvug97lfmw0r882ig5tfzivc4ziqhrqwhr7wgaeg46vrpcvp0jt4jhyjv3rw9zgp3xmz9rrghc7k1uj3n0w4thzochhed6dm6ixl0osozuzy1k25imdjsd290rumq7p42f4cpm7mzyny9jkhpfe2qthjz4ik9nghhjk0wj4f80agsxmxn0p0giqqkbdcpv2youpokq5mcoi3hpbzz8kdgpfojc8s6vssk9sdrzrlhf8tc0b5vetx4lckswbhmdl22t8h3s2la1it121q4ma349fye170np2p021yo0s0mhbjhw4dzzb17i5juonyeisq5qw1hg1m9snlohwg8bhxbo69ayl4y8rmwdeh0zn97akrm03438azv1mod1pjecl4pkck5ciqajlks716g5ds9xfbfosl23b6kfvfsp1edhabi5eb3d02m3pkhdy4mlquxk8vrm1oxxun68fa9c5fkkpm19ynrnw5czzfppya5v9ryd4a9oaixdllgolc7amjp031t35f7tryitqt5f8htyhmsuujkxa4luz18n6jcqt12sd2kqo4dii51qmfzdznq3r716rasdhxxfgig1z0wip0csdxhxjls14t5xlg93iiffl6ygu4l4xxbifus1oe7px3e3jq2yfwc9y',
                image: 'q459wr7vy878jysiinz817ef7jpqpvqyuvsgp62p50sj407jcij68sb4t8tlfc362kiyu3psx4wb10cbgmwz5wfno2bbtd31jhxucc3ciw7zw2vlwofdh4xg1n6npy2oyx0tl76r9mwhocaq6krxyjawvr6ru48905ahqf78i4z1jjn18ko8y8qoanyty4fulu1m46toxx2v6q817vbzhs0ddq6n8476qf1udqvme9wbssgitxksnczvpuyvf7k4c0dglkvlg52sleprjgcdrwsgscwszf5s08o4e7nzumi6invi77fj2pb0uep0tfmdeqncsowb7kmfwe4rnhp6b59xbhuyov20za4k4lassh9bgouvf462yq3mn9my8mejoa2i141vuo8szza4heu9z3p672rtceezwamt2xabmr5vm9fgtbxav0q0awykxpu8ul9p000anbmbp59vg8yo3k4r2wa458mltlwgfj7qz8hk29eipf851cby5jrtrqg9dt56347h1navgq4zr9nmpc800c4mtot8n2qfqjnk8h8m7thbabflm0prydocpqrteuacnrylczx7wggn4v9wmvid09st02f8kdp7tni10e04hp8ncco627gfebf3um24pgb24iwz6bf6nixo6zto3r2xtwhtwssbuy7c2gsf0rxwm9q8ve71ccnr04n2c4w4opwgvuoav8dfnvnfd3i9nh6kf2bf88kth2uohaavhe1w7encb28vwekxig65kz0zc7wpo3l6amryd7ifhoz0amr2g3ds8aar6ofd5ptt0022328yeb2u492yxoy38blrp2xu9quals0xri56n87wxp1blxxdeslcl622oi3a7np0jqtgpqd2750kl7ckkkvmm4cp6h8st0hcswvm5sqxtw9hvqunidjnm4p57qtz0zxgvs01popqru2so7c01q1h13yf8pugiprx7fdbprb1rmcanl0rqa5umxmecew3ws3lqijwhzympbciju97mhq2',
                sort: 735146,
                administrativeAreaLevel1: '0yeccz878fvg0o86ayvj17h74oigw0tup3awuz73qazi80e9v1',
                administrativeAreaLevel2: 'ai00szlsi0fxurtjyx648sqp7cs1d3l36t88tnufx9myaccbum',
                administrativeAreaLevel3: 'hszhk3rnx01aftjy3x8j2dedpws9nejexz9yntb3mezwfdta2b',
                administrativeAreas: { "foo" : "bar" },
                latitude: 272.97,
                longitude: 798.28,
                zoom: 62,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'o2',
                iso3166Alpha3: 'txf',
                iso3166Numeric: 'nfyo',
                customCode: '3frpq5trrj',
                prefix: '380n0',
                name: 'di7uo47rvodb9xocfmtiwbxi61jq2f4nid31o411cb600x5httj704euyr2ru4hg7bqrkrn5uc5un5mrytpe54ro6wxut7khs2l3thgqcqmklzhle4k1btccad52ozxh5ucyszaa30jjlw189o0wh876dua8ejyy6dr66ia31ruuliflmqmpw85cdgs8uko82yms2jszw0f5ore8947ef294jv3xhwnutci3q43bkzs47orntvv4hshbjf3snt8',
                slug: '4zkh12lewnapgy3my1f91wcz13z6rtm0dx6qo4s6re1k3j35xf39prtvfb8k7mggdnarlb4lzt82d1qvlau5hfhkhh5p0g0tguhlcoez0jmwszjdaw1rjalx81mvu88yqm9g7imoayebzavs6zr2y18j0hgw3k7lnt85rwvazdw1rs082tyiybhauyelaieagcojo9cx8galo0j8xjqilpezkg7wjwf649p8rzvvu9xikm20en1dj1epndbiw6arflhabcef5annvfaewr7lda2t3z48ajg53nkf4hlhq6oacm4no1h57efmg41t5x7tdrygmzuf73sqky9pfk7704cxwcvizvj81y6tw608ba50gcotyck9fj150rqzju9ms8bacvsi41qkv828tw6xfwlraz7cfnteptiekswjbztslubdc8htyihcqzmpcuk1vtp657g02cfihmboaqw1ygxiinnmi5anl4bt5a00zsla04xxfzgpr35g00wle0r50ps763hmlt38mdul7kzjkxnserdszcjrt4ugs2zm1g0dr7qdbdt5j06brgoxv5yd3qlhlqsvdjjr883fr39aqdk2e414j8e5d3hg8g9a0y6nzca4zl4ycbx5al7g52pndq8n2w5r7dzb9bahk98sai9ejugsoecvu471zvtxhj2wiplwo6a3ciyv5mnt8zk5np013ptx1kpsllhypltcrfrc72fgcvd8e43zupy7rtzcmnlejg0dk9qnn97o8jcniit4y0h3bv0e8bef9f59i6jalw2vijuvb4mk60utyn4908fw2g5jriqbo5epmkgz30tk0e8br2ihjfy3g2zvp1t6ji5hdhhyu9rmopg16dyn0ihw4e0je391u2ux1dccgjsfz63vejoiz9grt66rfbi3iuls2ia3guyr1juu7tw6bkkqjvxr8gqbsg7ha15muszzu387ldck0ddf3hioaeizfo0zoor7jxq862czrxe52a05w6iwcchjhphsv95k',
                image: 'i4a4x7pdeis2gar4ld89e9xx8x7bttjerg5cshbonjif2omh6cylc93ai36nqedgltyl7dmkp2az5garb6849gveark5ucsp5ujs7fblhhojza0e64t7q9sk60qnm9uq2hgypvlda8v6x96p5tl4i2tvg2v1blb01z35wnktxhz6f7x4fb9yb8sv6zqqfd02v8z2d5kso5seydwcaryrxxlsy5a62po2z0un9neljmgiictkcal40ebqasfxxbtvttm9q1csrisi8ssyiy6n8eqccjbbxxqc40whkomlrpc0vhy3kshu1at5c8w6gwxzjaxlbrdmouz7iqlj5ef4olylkwmglo2x84mlgeka7xrp1z31fw5nx6p5b71wjep9yg8btffqn8wuqexfd1snn8fdqsnpp6qb0ncwjquwfe1i4egf1sdpz72b5g02g0gyxdznddf11tbkco5c3ya7ta5gzqywpglhijn81pk3wdfqurqhaqanifuah45t9juvk3z2d86it7e7soa6hj7xto6nbcub9w83afg5kk6rhjg9m618j0hsy4zjof641z1si78h1ax49n5z9247yicp30ex90ez7ouzxnt8an8zyq9dgwduyguk8h7vx0d2z9c76hzdd87vrv036cyf48e0nrj5gj1dsn51w207drz36a45cyvyfhj21ey1a5gi41886ixato7516hu80nm4abhkxbqa82cse3g1e60uqrmk5wjqf7cstas9m4puhiyic3rgzbvxxsz4x915r7gho0ru3rkv442kg1tatmttaasqo67wrraqigwyyo1kujrx56rr1kgprefoenimwvdki03g95dtzl6o6cd0rilbpgucmpcnyghrotle8ahz6rkne9i6p5mexi6lw8b736nxc0x1hwfowyhr1sfvbzp7gva5goj06swk3jbeiichvon2a0jtvd35hfyaasfrp3xx84m2gk7l7mrcvs78l6hzztfgj1vpvnd2pscr1kr50jqack5',
                sort: 946328,
                administrativeAreaLevel1: 'vn2poqvi83t78tpjvhsyuarfd8q4akn39yyrp8p2vdroh5rb0p',
                administrativeAreaLevel2: 'lyjibbivn0bummhn8eipkxnpcfozut6bkthawgn6wupxvdddr2',
                administrativeAreaLevel3: 'a6n4jjv2vw3t8fh3owrbjdkcssi2ly4yati8cm8uwud80ymjek',
                administrativeAreas: { "foo" : "bar" },
                latitude: 293.24,
                longitude: 474.48,
                zoom: 49,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: '8z',
                iso3166Alpha3: '0lz',
                iso3166Numeric: 'v16',
                customCode: 'tlnguk7nitb',
                prefix: 'o8x8g',
                name: 'virbz9e4isyva4rk6jcj8r34gmrl9nq0bqc28k1vd57ltecr2qjpbqkmjuwy1wtsicl012su9mz40jrqf4h85j4gemd5k773gypsd4uuxjtikq2v52785xq5pjqb385m245s3ra8a909pvpg2itowzsq5bivucmfb1k73pk4iy5wktnb87gzpu84iw29bjjqd2xo8doyv139wr4z9rzn46vnt3iugmon4bcpa2k9jtgmak9mofupla0jhdv69ri',
                slug: '9ubputp58x57eoumidq6uwryel220zfz9fdv6y5u1z90asu23fmb4obpoml8z52gk0596hb5vc59bwrocefhyo2f4usimy0x6hias53r2v6q8bshu0ox0tjyghggzqu9z8oma14y2nsv98ja4fg3hl21oxttk536k4achcb6c11plru09193zqwguvy9wn9duesd65hz8pm33rnx65vrlg0ctx5ws1c3btgpcmbatlhye4si2pp6og0lmd5oylqxsvvdha9juvu2yxcr1jr7vu1ykuwxdob09fun64q9d5pv8jd91q6zddkopezrssudtkbinq38bnmtwwqc4ssydrt7uqzry1r7iig1e7gy4tcfctauez9e3ada79t5g89avr4y8wox2gnsxx2rzq9s8tmh7lbgz5yeq8hqpqpek78m682so5isdgjr24bybtkkm0gh79ncjj4out01q0jebu1jaihx2vwk2i54x84ckegxxfmi5vd9g5odwno0g9kgug2qtixir7ix07ws389ky307ktbxfdtwj1i2bdnumb7evcaqkzdhzcke4ubcx65lqvrd34qm2amc5iapy996jg8d95v53y8m87xd5esqi4jb51fuz1gu0123vt79268yc1qspkf8m2az1v81mt1c04lplsu7bjjgdwenr7yaa14hd9i526eh9h7kc9mh5l102079i0ptiwhglw8b0q59gcupu3js7l2orgh7yrop9h4qvocxaytgt6bcna8nqr4o7bgnyc5rwmsbm25w7h9tcs8utnhql06qcgrw3x1q6q0mk985uhcubhyqstezdoa4939pmfe293n7uvbpyqnv81yyicqefwtila4xw34djym1lc8fee08a4qk482uxz4vm3fkkuoo886542bpa1qegonee95j2dku3nt4krphilfebfz5b32ofs5zgjtggfwrmbw9mbpkngy2qjkaz2p9u51v04rz0n6zzup9x28bq2p77dcgrwyaz0lrxmdrbyvy',
                image: 'gvpeo0f6ynkf2x390yiell3kxaajmqxynyhjqaz5qyw41yidq3ezmzmhz4va7y0y3zrw9klzokq8ef94r2fhuwyelvrfjfay9vboab71yh3eiyk5eor8j0w5e7q19iou9jv0zrd56k6lltgoomik1sd9y6aizhqbx1qcpv7vp1v0d1secj414ht18c3ikt8s1f0mbnl50rk0xtg4getp3ceqqf9kzu6srqe27nvi5aqxisrg80aaax2irv36vvoofb2jhqunooth4j2fc6psqovwzncuhmav58s9kux19hsp58ij7imkm2yflq0ly5fowm1mi4mb48wxjfcnleuynt7ri8d4wtwpzho6ol5igzlu2h71918gi9087qoexo0ui05g7kqj78nfcq1ytrh54mx6zckavbp4n7ho87w0ghy8bggqhwa1kd5ez2apagzmj7xoxhlkh83c1me0ajbdgslp12w3a26gh3b2kpdo3uvvq7selkfbvv40vih49e7mfx3vpslm6qj4xupqw3blcfurop6e61pvm0fig6bvb0bbamj69k3qvqrefauukww0yzwyy0iizip77qb45735gbaesjk0rfs5gdb9ql9wuce1d8ypdy8cvipd2ggmeyx3ukkslwwuoxuvsq4uz7dxsr4skpfi4sqpkia319927w17qxg3t6mmny5552q29bmy2ga2edcntjwepa03ot876t2nzs58hkgecxruv1599rvyz12idtlkd5sxanpqiqvqp2n9jw4iwdttm1ygi52v4rloejqm2r5octa8qhcit3j222k60kwpxowrkgzhrupa84e86ydk6zopebjv222th8iv8kzu1xz6et65aunx272sctwz02sieciyrkro1r3abgxhkuhmnnkhhodoxbx9vj108x5k93f2hfltj0wmqb0a3axwv2wa6r082wsqwg4ohvviv1uulyki9mzp6r6g70ysgy2qgtkf9wjds3nw1if54exmpug4l3jp2vmj705q',
                sort: 745071,
                administrativeAreaLevel1: 'tifp9jys1bmht5c6gw51v4yymxjpmfom026bwbp7byz0h2j22a',
                administrativeAreaLevel2: '71gceu62gcfrlalqjyn8a165iggqr6e6gc29udcmlqj5od4mli',
                administrativeAreaLevel3: 's70x30df1ckz3htih66b0evgreo9j7gfg0hviysusfmh360tgo',
                administrativeAreas: { "foo" : "bar" },
                latitude: 2.57,
                longitude: 400.31,
                zoom: 61,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'ph',
                iso3166Alpha3: 'y2y',
                iso3166Numeric: 'p56',
                customCode: 'sdl3pz9vq6',
                prefix: '722r4b',
                name: 'gdzitprpdindinzj7sc7sogpqir127olu775uhnny1c5tl269bih52jipfd0xs1iohnae5hgnctqr9uuo4yjobnyqz3cg6vt4nq56dqlh38g1ngz1k933t6kf5pbjzhuxhohsg8mtbp4xajpm7cjl34grmlsh04ptuywauzpb06ikdnu99jg617yai345vmrc25zwvo80ziglgovacq94w1c6g3q3c7g8cw7ly94higuf1gpk0zxc2a16j77dp2',
                slug: 'tc9zrm1e5op1td59lw4qc5kpkqqxefqz7v23ye64vgcfjxkleb4b6oh6rcspj3pjmw1b8w0e6fftjmeq6iud7m2ywz2ew0p8j49v9fpflfmtopn9o195rylyxw9tefk79jw973tjflszimrfhsip9suffwle3ps976fgwj9f1w0wjxiqyhrxgqqva1nkdefg5q1t23vetfglvjfyvk8ng40fylc9onw6k0lnif9gsu6fb385yvohtf0kiy9hordc4sxmyteks5fnkng520p6xeuplwrgbf6ei2ant9s0kcvgzwkav67fh64v2n2x6pxnzwwd96z69n0j4u2iqilbjrirarukq536td9bpsll1zdd36u01paea07n0nxnte8drjm1soxndv0vpyjro8jq0n71uwnb3qkerhrq7df86uln6y605k46wg9i11dmvxtfvbwrbuqd8nkv0py9vsvohintck32ynwx3rtptvxholztb43e82ib1v5z9ohogugrphx3l48l3m8ku20grnk96eblfox39d2xj064eay2qer0n32p8fb7bbi5uejwei8h0y9fxt5dllxxrbf14ha0ehoe60nug5628lxqpf4p9tyrjfgqj4v9qssfxm349ivukq7uyvxa61xj9p7b5lkr9avi53o4tracf63s2jvjoe88s6i7a2ebnqz2fn878nyfh6hzmrp6vk42t1zjafzngt9imqzm2vb3097q94susq6ir7w70xzzv481upupef9ndhwj7649oubkhdhe4e05y5xgfv94sik6h6gn19ky3joizwwzbp6n6d9h0w4pwtk20qb54751jjnlpyma81is7m9w1ymh41ukygb1jw8jgxh0ac3ygxbgszk62ulnarn147wmkb9404eb8ajwvcslnkrnjcjbcggcew9ll6cjxzek1plu7fbve0wue8yje8b7w5vjb94j4alsek7d4wr7oapp0pw7fjhky1552iytp6zlqbpmonpdb17gxg3fgmbh',
                image: '7tl62m68yiv3p5o3dbeq0uyxi6i0xt35nt2ya1vd37dr7z6a2rhgw5khi1bd76u87i2lebp7notlo5ku97qhdtzy0bal777ugq90phdajdbyynxvqpnlklyszhc743fg8pgu477subhb5sdvyctyv48vwodag6v74elz2cix4eov404kwlwvofrpkcxsce6y01hvp8jrxov2w3wqvj2irok9y84evuxv56a16vqchr1s0ytg2o8mvi6lfgier97pec6olvs1hnh78plqhck2kg2n2npk2w5vbl9lpurnpi7io0g24gu2v8eiik75mwtf5pkqi61xs45ug127uxq87pifnkd2h0l9iw95m4j1xn1g62yq9bh5t2h7i7m580vaa6vx1tkdqvgtzedbniqjqjjtxyldojhxpdj77nxyux46xuj2nb7qx4t4px5wa1g8a3vbp0eer613ij249v1v7wk1bpxytilwo9e2bkdp5b3gl0ed07t1h8v9mljdiwifkvokr54uwyl4iqo8qkgaf3k5s2mzaug211zo4t2l1y9pj2m817oaj5jpl52sgshxo5qb676pudtjumq7auce4pjxtnvtpn2h3hnten5s21x0ao2vjiajo4c2cmpd3zc7vn674e1lmfhsxme3c7gw5uci7vwo0nepqkvr1mj88fjjh21igmlc455k3q94mnebpszifff83ufoy6shgwr5zaid63yxfzq9n834d6uxogb5vwn67yytsu1pnvxxf76r110h0176ln2ebnzw9v2t2m3dk4d2m0ryvzmf08kbu0j51y4325evq596fqa086ldpz4cb7d6p5hdsm8z6m6s7vy0lj9psxemlwlfvsva6j48dsl2vc495irhsfwjx44wu26eh1lc0w71no9thdo1qui6uqq7n1gfg64bvef3qdp328pem86bhig0fl9ujnrh2m5n8s0m8hj2necpfovkmx3jbvtfxqk8i5bmnox7fdgxhinmfvf8w8h6dugm3dwi',
                sort: 370548,
                administrativeAreaLevel1: 'eqo4kocs471g09xzypd7ygrjz7tjdp4wbizisv5647fchwpk8p',
                administrativeAreaLevel2: 'knc0nuq0w2jokv976igpr8a73rsgmiuyq1fp1dhan0c4hxf21q',
                administrativeAreaLevel3: 'mnspxi3iz9s6610fy3tnmrrbtobhv6gx50o94nu2ibgaxyldej',
                administrativeAreas: { "foo" : "bar" },
                latitude: 636.03,
                longitude: 775.78,
                zoom: 18,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'ws',
                iso3166Alpha3: 'rd4',
                iso3166Numeric: '4e7',
                customCode: '78inhhz76o',
                prefix: 'xgy31',
                name: '4hziuho7jgzxwth1226us771r7pexmveixesoes0p9wj80odtbxxv7l7yxlav0oof2ptmymh2ymd27ujswjh5yblxj56uuo23hlo8yp4ga19ye88a5vc522b8sf2zwy4mji8p1pws5tr53oqouu6zxovjh7oc5oqtlr1oxj2djgkcjrg311vl43yy7vtt81jedxc65kzaq96r7cx2hfrmsvb1tk5dmj6k8dxxjtr7atiypmpr30bq4x6760w2fwy',
                slug: 'f8o15r6kjcbhdde20c8er2ml77bz17jt9lkjglrznl7eqykwcuv4u1j5rp9d63z66xbiieneo31v6addhyzew39c5m26tk6j31ymh9h8xp0j4id18t0db7c5fhtprnros3a4dzmsrite2i393i3kb7blm2hgt55qmusgz5eha4x8ehy7b4348qkceg181x4aywohwijg4gfnxwrkiyf70ncjmo7njeiiuoot96iwpwe8oz1ihxmypogk7jhl1n78d937huew5r8f7j1sk2t69rvx8k39frgv6ml3zpgpwrm4ryil5p5bmcwj60xglnwtt9wxm83va15wfwg9u4uvjdup29nsj5sutivresa9rnw4r5oj71vqzgziugxr4v08woj1lpq5ryprq0qrktqb2qh61wtoat47484w15o1r2d2s023cbzh98pi6lagoeil3ou3hhhqv0gbz1v4bigrkhh02xmyobg6xkgapvlnpgxq6i7na57x2d85nya1whp12q28skh4rhz5egpmbsquks3b8ih0k3rsimahc96akmhumvj0s2i86e6is2ehlbrr86gll685nkdfabdhbc89ubhyj7367vnnkwmmkjqite65dl0o9dr77lfypo4rsg34nuajloh1bbwxewzn1iq75hsm3f92c56d7qy2ybgjoucn8pg1o7nwwbw3sesecvl55js19nq7hlrm8b91aqn5qqrzearl1xdigotqo8pnf1iwkqlnrmy14dcysrakyjvogelbkn09rk0fus5b3a8lici7nrmwxcs8m3bmfjyeubkq7wl4wtfa28xt05er3c1yx2c7dyir4ls21v6u39gzwufj8g8jodpzdjgruugvatjz0qtxn7fftniwzyk5xtvc4zqzevvmkksetz45x2oldl6m8rrjmxvd9rh185skmowef5puzrdx7su72owyo95m40s0gzjmfnaurduxfzhdz9q9nsdk9748j3d9qrkexjdlv79gyi5ivzf38u93wup4',
                image: 'jvwsj60mn3dlbps5fy5c8c2f0vmuxjqgi8vv1jc2a0vqa79u73xk8wngjca8cw3imzpj6ll5fo52c2f225ietl4maq49o5s5jyfekwir0lo1gxludwej9avcvvlo7y0lal4ygxd4v8cihevc84opfel19m3gal8x56xv2n37mte7oz6gqx2symbuf9dgymj8w22blo9g59y6wgun2dxjojizu8wpf7w0v73apq6dqjcfv4zolin26jma9503p3d319avhayrqh0ya4h3gpy4ayjdt23d1lf6t7iqfln1rpnlfpqf8l5jwncqpryq96fsu0elwninms001weqki5b0ld2bc0znaw5klps6ztqqoomd3oqx4sswr896gl5ap60rbprbp9f0u8lhuc89e19y71clnmqq2sm830suzbaito6oogl90shd85xo1ru1tynbpc8494p04inlujc3nj53n9wkbj667nluh9ndyvthgt9iposdt6jfdpyclvdfhxv22ql17plje8859h4lbw1nfrsti8zkt7yob2fby62n59x3ta0wuv7b7ollnxzhvav0rgcwiaf9ali2s47yjnxvqkauo5kb9tl7zghxtq1d53k4l6v9ulm0nartdhiubvna3aglckruz4rrn2ymuvm1gor1b6vdcbybvws0h30s2d25rw4twstlkse628z408acnfjbiz6b0gdwpg95iz93opag8ral616l939jycwcrmmpiahbahfd6itoyr9kkuidf7gig05psuudohtss9zz828f0lwgr84uzhocimqtfax3fnsegbv62772a6dmtcrozil1x58ieacvsfochkow88ky94la72p34zg6k8hufi4ftwj6xmi4yse7ljlhlclurdiu5umgo7pn1vt77g31xtomz3ju0dokwycmemq4ap2umgd7sl0zhs63vutfbvetgmreob925jh89gaurdojd6n343zwf08z750ddis1w90qfh7ib6bi4duip3fyxzt',
                sort: 158012,
                administrativeAreaLevel1: 'i8miftgvuu7y9rlq3dbuw8zdhercsxt1j67x79z7ka1rlunv61',
                administrativeAreaLevel2: '1xt2p95xhqi34ypu0g03egqqtrz6g1ll34xaxb2fnvtt5be7qu',
                administrativeAreaLevel3: '4sb2qtvx77a5foxgs3vou2u7gzemtf7vemre10jba5fkd1276t',
                administrativeAreas: { "foo" : "bar" },
                latitude: 204.62,
                longitude: 115.97,
                zoom: 10,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'em',
                iso3166Alpha3: 'dbb',
                iso3166Numeric: 'ymt',
                customCode: 'a71ko8k4aq',
                prefix: '6sl3a',
                name: 'rh4rlokz765831axfx9fq620z516me4mo6jd04gpkb5044n8v6ekyw6jhz9p8cek6cxc727sx2obesucavbqrusrbrcj0ap9gz67ur6k5yt0zvbjayywdcvjkog1lmizg128wdcvtoip4laavwjt417w6vq470d2ff4p9qpe7e9hvaa48bt58r3p1cfkd4ihnumqniyxocodgj7zw7n1sspb71podw9ldw10h3c5zn13vlvqwbcxxbtq14dt4rc',
                slug: 'x3egk3y3km0vwkj9e9ahjy2zjqfrfcv1zzgi5sau7d3aux22p0srah9bjadeqaa42mvy9bw6tpbpaoqx10qvy01apzrx7ghc7dks5w8nqzi4btnolrh9qrp8aacbyt53hac3tzbf3p7e33h8pkej9dvc5w9fqkk3fif728dhv24ayp7gh0wih0r2rvkro8zpa193io1gmts0lj6ougms35a1d0sd3l9ge7203ke622t287p2etxob6el8uucfn0ovbnz2wq7xt1a1qr7s5ad4n8g3ou2do9v1syax60v46mcn55krid5ubd6h29umt33l33r4j245co94zbouxwb51qdx25u7pdjrmen5h42o4x9hrqpv13khxg1x7tdpbox3b6sa81h4nsbhj11ap4ta4d12tfsvamxaghbgar0rjigfa49xhpjr7rfytdhobseys6ii6p5w5ev913hw96resoytqw9t4t2ngxum31rfh91rw5eerli5o8pckreo4alaam15c8z67kqow5e1bhl8ro241zdwgaqwdpu3xr5wx3ow17mk9n28ugo9mejtmgopynwksnmv2vg6o55sbcxkm555lraoomz8f2qpbpitv8u533f45m6nbct3ustxddlmuwiusbq986z8y6devyqjpk90xax4u3rcgin75szac86y8e5a1r88ly9kqzbzbfcsgrrngzxw0cd3349kq8btehunmh22p68htwg0tiqwhkm5sb8upl8jsyzlyko32q6o7m5jbqpy3smif5u5gpuy4nj8l926jjzormzs52gjmndi7cqh6q8crymgski1gtz52ingu5bk7i4ulatrm5ydu9ueaj2twte09su4ngkmotce8fxwomkbgz6yabl1r7cp3gua51wcnzghaqrjg69skf3zgap6wcdxaopmnabas3kd5ds3e3f3ch7v0u4ljcka5myzv01x9fwjt7fh5ao1yy1214nk7oxp8g9cnq5lvqsgav11jtbpldbyefmuirji',
                image: 'r7dz6vq0jrg4pe2lljlmx2eyhhw27hxg3nagwnegq8bc8fqxs4dwwl7fb8jmoly1n0fytxkuwszh68krb0gtzdqhd8ke8h3jwvimkk5miqrszknrttew79w5xjwac3cam6u3f3nurx5nwqu2klpusagh7yl39jytdp1fqy66wlj2p1qqbj55hm77eznexk07xtwjivshz5rg37l1gu3dvf0dpa7dqgah62pb3hk6qvbt0f8muttpebg48ksqkd8z1s2560ra8sgah8l2sae0uzo507pa67c7xkr97sf64u2jxcs3p5tfmo4g0ov300jl51ckji9a25b6ow0c2x178lb7zor9klwtbsayk1cp1qfyapnvscofikdwoen9vwqziheby5smvmyszodfads4c4pldsndbgro5cwpsvt6nmjg8wcsi03ov0sravfmj2pksw9qy6zy932aujovo9f98hufenb3n1s6y1omo2fcehmzdtesfhvr9xkliwjmuht1polgffjshrrici9s6pbn5krtw5cd2xqfsmig473n7urd9mhnwluyxgauf15491evgf0fi2prvsa94d16vje2ruacdvdkgqe36emn2rchrmtj321eh2eb65i3xgvjbp9bc10fvfa034mru85js14a6x86980rwtoomhqehy81uu2bir8oypr6m8w8mqabt2v8j811m849qw0fa2hyghmv5eit79jnb6dstle5sqvt3pvvbs2wefyb39orpcpp9sckm4rs9ne4hurmpwk2hlh43l91pzxv4ycrjtz1lkbjkii0b7kdckvclb2928ytmm9b2aszs212g9lyakg1ctpfrmsvsej4dns2glu3jrx1ojvnslqoo9mk15s9vst27xlr7u3vv1t33xx1f32ttlm5utl1ys043gsp3w4pf5tiiuxmkxmp6eb0dd7hdsucnqwi075j5354jpuwbccx4p0i1pt6clforyh5d5ief6ip506z786zyeqi3xyeegmrrbap',
                sort: 761972,
                administrativeAreaLevel1: '11zvm8a42zeun8rd3gi5mggyuvdiqtyxi7uqxbiqsb7r65qn30',
                administrativeAreaLevel2: 'mo0xnnwkd4wbhw112wwv5i4i53porrj4tmvjdhna3nl7ukgxqz',
                administrativeAreaLevel3: 'zyktz9h3fvwes7qvafmjlfyu3j1n4tdka5jcyadu2rgkz7n6ww',
                administrativeAreas: { "foo" : "bar" },
                latitude: 548.43,
                longitude: 782.95,
                zoom: 62,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'sk',
                iso3166Alpha3: '983',
                iso3166Numeric: 'gu3',
                customCode: 'zojiziznkq',
                prefix: 'wr6vw',
                name: 'g8b6qpdzfq7cikvzdd2m9hymcwqjpmnsw08x2lu0ui02fv5cx16plh6zy5sbzpkgd1kkpmi9d2quwpodc6mcwzs7todn0d51oo6rpm7493r4zav3a89zvudc2z6lcfvc4qjy2yres65t3r1j1holz3umu3plvjq38olx2bykx3tchvdrb0a55axgz73ywy8ni9yge7ck03uz6dppw23ipfhfylurdyrkwozgkks87ahwkkiom9xbie3x6kdnqaf',
                slug: '7uabt95diy7kqfftq84kxhf8f8z9q8zkxv56ufko46j8g5c5cw3ruv7xhq6crtmz6utwclxfkhteoiyfdwmoer96q1gl14enlqdw1or1nt4pyfi01xv8wxxku2iydesln8vzse1qi13dlidehtushmfvpt1ny4gd39gku1zp7visa1qk1684nk9q4uocyh1kbp4ezkmt3qbsnejn7jvr2s6sns456cwc96y30v56e65h4fsmf73to4m8vznbilw9e2yfl2d3nnq00oh9z2hthbak6fqp79pz69dxjq372k2zlfmusfxj4z3fwm5l6hc43tkqovbh1tl43t7hbsx6ofgw6ejryeltjkyi0l94ssxn5v2pxpmtnhorpmmeclqjco5lob36tcdkogp1lomgk69e5plg2mkygg3lyehzqvricn7w2gxc6kte4te8htm1wfoyofi1tblmlhgsnl1u6afn2b8v7l35dwbt8iap80ubgpd4i8x7vdj2io5k3o2hq75t1r5y2thtfiy7l1e90fcefr5ud93nu3ec3ltyoqf9xd541elu17nf0z7bnm2aj3qutdu0cww7dnmziyla4rt69dy1bibsmohfsag4utem62vih9yi2spn4s9jm3ghs6kp34xr480qqyybkrj5ylje7ep7i95hf8cou579gz4dk8ntlrrwgb35vq2pzebyypwbogewgg457wf1vtnlk8e9d800xd3xh4bmhf8azu9rxos8ipub45qqevkpzdovr9jp4m3ywgi5qe5cb5x6bz624vijloftg5e21i47omk5ofg3k5wr61pkqjgx7cu0ny52m1vmlluw9psvx05wg124wpz6fb57gh58ohm47ezor7cgbhi6n5i8r1ltx5or18vqt9i59zkjgtnt8bn37j8u093rp4hqzx53659yevt7wbycqfwxzwwv91uc2kabbcjgdkmpqpbfre83c6puezm0pif2xy0eedr4x66i4h2exslrhotwup10sh629wbs',
                image: 'ueysuxs1uffixp0aqm7a7tao8z1b5rbcgqniqtcsmtnjpjrxvbgvkpw4pt7q2c4l8sgxchpcbl5b3t3x12muebakylggj9qcav81i8vrpwuhfdfs9lntnkeo1ir9e3xlxvf1i952ujh4qz3r1zkw42iiag4vh5mvharzmw2lx6x2990eyubq5dtxsk8pjqpv74posu3epbfxu894gygexi8k585dbt7oif2rxyngz2ksdep67q1nfaarze1dycb8k97ax2ri2vmiqarkcu9jygl9uubb5yd6sy7w870hgs9t7xh8yb8w3fpaly9vzu6o4x134rn6lcg2axih486b3appv1mjia69jme4ldy7asih27f1lwxg18fl7qkahmkxsnmwpew1x00umlmnci0idc8rpl4jklo3iv44tahb0ydpx02jtt4o2o5xdxwqntjw3gb7etimfzguizlc4q5yxkmepqb25ccri6q67axt51czy4z860nk4omxth48auwn1h8h7urvog0sempb4gotsvq0gqvle4b3j4iz4nq4x9suxx5cg48w70sj27fpqe4gzt70hnx7syuikqs9ov001m1b4js8mg8cvmr7k807oxakmle37alc6olnpwjtbps0wtug8h9907vzamxc7jbytrlnirvqtktbbuyn24v291aj6t7st4ed1l8w0l4joetdphqql9y6fyetxipp1l8tkfqmf3x7kmxvda54cf6gqw8rjrm2n8zvup3r0qu8xnb84pvni7kckizndvt219ski8m6r11ls3cd8516lbwpk9ynb7waktlzwjynx1l4h8fnfi130nc96hfev93k9res9hn3xyf3g2sl1okz4lbpuzrz8pqyhotqdioh3sph73ndetlp3j621yisvv74fvswqqhxqftfhxiscdf4q7gwn44o8swji6wydci48qj6fwsrq8s02aiqq5auxcbwhx8kcdvxuxm9rufwz5rmw1snvk5421zm21mbjycb6k01huqpa',
                sort: 933376,
                administrativeAreaLevel1: 'bpdemgtc0s34hput7tbyezaff59c7adsedule3jll1dyz26r0s',
                administrativeAreaLevel2: 'pz30j1amd687o8kww26fyixh19hcodcz0vde10kfbbpd6gt8h6',
                administrativeAreaLevel3: '8et4gyxtn98zqmkc9x0tcrl4f2v6vw4ba5f4ep13usvilz8ex0',
                administrativeAreas: { "foo" : "bar" },
                latitude: 472.62,
                longitude: 511.25,
                zoom: 23,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'd5',
                iso3166Alpha3: 'd68',
                iso3166Numeric: 'j24',
                customCode: 'om471v4ts0',
                prefix: 'cyybl',
                name: 'rlugn5c7ozvboseovgw5ry0t55v932831r4i5lo5v88hw42havr009yvbcev4x6a2xelb9mwif2icb5pv2fm2bchyqgvkyl3azhn7ystv07ypc4xa0dp1nbghumngq1ryvvb8g2wqunv34o9hk6notuhil8zs555j9gaiadypmc070jno7ey3r3oh26iqdwonykufdibspv3gm8qb56u1f3lqwkchbf18940t1p2ljwjdhxjowcjrvv5jdrrzzs',
                slug: 'm7h0r6uwifjq7007gmvzq27z67oeo2nvpo6e25q4sa4plm17cwaq0i4r74wcmzasz0qr2c1bv6yzvjc6af0p1rufp26bk4ptxat4edom0ijjt5d3bkgf0pdqx1z71wr72iperlmu8p2eki35o70oh905ju598t0vnn1chagvuh2qrjhsg4hups8kc8iusnyo5gzfqjai189tzqyhkk1dpjdj3rdncgyg4lk17671g8f8nsewvjx3ofvwl5vdmxtcs1ljp8xsr7u5pjabc56gbo1z9lyyx1q1o9s5zuqlm5nvzdcltwmdh3053ghpa4ado3u232vxwmv7rtdgxnw9x4c3diemcywtogp3hxzot495ydazts9jl1f5d0f54yrubkix47itaoxww6o254b3nxqs7bi8jp2trgj5jrrrfns1hia1p3n56zarx7xkra0m7wzskzkxq19oyobvctjaadc302y5vz4atz2wgo6cfxwdtnp5audd6fsbpi8sv3640ymag6gx04o94hcbfdvovxrg90sy1axisrhmoa5sbni2bjywyvq2ldruc25f1jamn6x4ieo7ov5bk5eitvx2poswfwdmcgi2owxsfuia43bknus4innzeqrbf5v3pm66hf6moq6y43oucfqbls8740ozwhyczdr1pbpdk3xej4fgf5kaolasbity8xk2hvdhokbk2kb5stwj48s529v7xw50n9z9grt88o3h96uej2ocljloiwqahpfbv641sbah76dfleu5xwrg5ud546hxrk99i1gb0thf8m0q4nu24k2ff083jr7l7knylhs4txzq2hyhlqw31hnfmrarl7q1ko69fhn3t1xkhj80gal4iim6kocah5bpv03591tmbw1zkvs8nwgiihya80ep91b1xm2d12qsdelxu6oxc0ws2ncuygaydomhc29sxvhqueuuwot7031r7lnxyp1jmy00m161xy58lhh75np05o2syue87d5wwpvqx0vtr6n1pbdy',
                image: 'gfnkja88sf45igo728rao4h2rnqua9ydewmtvq71jc4orv4ohz9lcek6a6ow22av5uf4pur0ukfh430btdbq4r9ur5d7crin74ql9aumx4be37gb0b4areokz85bk2ce3xhlh2ju87r09ecjkdyuyyqjt3k1l6cwoqsscopcn4w5edluqqgicnbb4jw3ea49avqawpojqacr09h8y4hexhq9e3q3270yvgms8gysbet1xep8pbava6h3ppxdlsvolxcy6ca3kckvo5xmus30d5m7ycaawq1wm395kjoilbzy8xp75qilg8nz4q08a87w6jp1mrfxa3fd3digzlpqgniyqqhjo5by3fyyaoxvbswsmvojb2mpk532g89t2hepbyt3ycmrfwesf3othr5o11je9vdy4v35984uk39fpkv3kf25bp1ddof2wr9y1fk6pk4x2yk81zkaqz0rv6jlvh2u19eggxl1hvd1wv3diyhp1k66cf56o68lg7lw9b93c7y6qu1hk5506puy62e5ipbqxnkdo0l4wig8wo5mzmjsih56psarc338eop11x04rupeols0tb30lhmu5k4bld6yirpx37d9u7uqsfa7s4o03db9db41ourhxotjmined2af325ypjc929lxs3492r012tz58y2w0i49yljq04nvlu5mywfmdsfbe282q802zskbivbrd8zso2d09bzh37uzn08qg52pkdj3zxd7mjvb7rkd1vwrm71jqcxzilw3bw8k2x66vpxk2vu1s9wlan2r9de4betmpw7k2u5gq1unijqfa12pgk64dxbljtdsl3vjx4dnucxfwchjvcas8oynamg5cpsrkzfvwooytemsty7axf278tb6795bxumq94wqgbtx04ov1ormq92041axgyvuv2c2rwtcxv0n1zjfjaa9j6dmwei1k7w17686m0ezegylj42prxjkgqqtcio9b7sqd7eouo9y6u41oz9uw3cu33woqqt1dgx132pg',
                sort: 4764390,
                administrativeAreaLevel1: '9l1v12ojc9a34fm4yosesbcr9hekr8c8y6foiybvgoo6vfvlql',
                administrativeAreaLevel2: '1aurns7zqkfo4ce3jde5frr4smqsaxlt4g11heip93txpt032j',
                administrativeAreaLevel3: 'oed45tl32va43g36p0wpua5fh7f9gq9g8qbti0oqfcflfwdqpz',
                administrativeAreas: { "foo" : "bar" },
                latitude: 613.47,
                longitude: 298.82,
                zoom: 98,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'c9',
                iso3166Alpha3: 'w5o',
                iso3166Numeric: 'i7p',
                customCode: '40df6wusx0',
                prefix: 'f6w3y',
                name: 'din4rs9wpza2k5ntpykhlr9lekfo8ejdkh9ciu8pjigl7fguas1fpe9ruad7w6ctjko93bvhiezaax5mhtgsxypoy5aerire0qyhze3lkcvzetf026tllyr5z4oo2269vdipgpvn7apitq8ckx1nxsp0vy64o5iccjcmupzmigel2kdshlvqh1vdlmm3utpoojypxat83683fpk667xrydz88yw27085g7xg0k34cksbkcz45z4n9cdfvap64hw',
                slug: '1fncrsbi2qjtw4go3pj6napok92xw2ilelupylyszeuxmku5sayp91l6m8abu3h971va3b9mv7ix83tykqz51igf4eta037612c7vuga0yailnknun47tlslg17toozvkwclqq3x83e48qxc4h7p58mqp0ldsn7dmrjvga9lffevpane1e43qiuuk6s4ohfv4aeggese4xmjbpidd12tp8kxnwznmj8wv316jzblb7tswsoh4gkzzbrypnxb0atrmbcghgthslouwiddb8wlzfxw63yuj6lm7i9is2qe8as6nw5f8tlh18hfmxr3rm2dlnsub3r1c9skxu4xl4trp99brc6i0ryrf17h9v2wrsohh3mki7qb25i40r9a9i0ol01l61nrczdthz7z71ro89ce92iv91kodlpd8tvx7zlnwssc4iiv6v6je4p24n1uahkc0y2supbxonuwh60zok56uyxggzbcah3mycodesjwyznzkbsaq0movduq4x1xyjleb8eehxfq1fm26gomgo91nlmsqodejcehaaal5qxyllmit0xeq6q7nqxpuou15n1idh8mqcy9z3xmex78ktn2xcr6kmr0euma6p5qpgk96jdophpqpxvyeq9071q7juky5g77cl19tn9o930zlxg7nne0cm9g9jzunsax63lffsxyi8e9kpoxvfd7s5ol3831q9ptehwa7x9yyn348odvxl12g26hiljy24qyfapzv65w30zlg7lcwr2xyogaby7c247nnehvu3rpoakndpp4eykpwgh1l6qa9lj2d4xoqup5fc8p7kq9ncnnd5d7qungb7h0ux1jhs1ucefl9czpsegena58ow63hnzwgqww5g3s9xfj9xpq4ldvmuv9f332yq3cq8ezcq4corlh6r7ey9zn5w1whtinstlijj0wvuyu8o19c6teb5n5a1i2u094pzn7utx93tj0cu7e1kscuwo74v8t5s1raden49qqtfshjrmjud59k9rso4w8',
                image: '9q63em4ynh7tvev9430qcvikuxs6lmliz03hpsok9a8nfdlk488d9nu3oxjhimxqq67283gzfrpn4me1uqv9432qt1pdjm7ljvkz192dov04iom7duguef7ac9asqbz2d097k4krfvt3fh6bbq2wd0r47p9h1ann7vlk58at2hdvy1e6fnxe6qbsha1jqgvxthdo2psr0w48f21ys4rftpy2a4jfovh6yhfrhd2bcp0y91juoc1ze09691s42eganjk4i9eyln9duuitkdpzi38uz889lp72uddjs8mrkt3gc5kzq4asqij6g51qsqpfftahcwed8us88bsczz5u05itslvfyswg8q2uhsry3urt5c5j8cdagrwt1k9olkibcbqlumqu93n9z58iko1dkqsyd7vchikukt7z30jikfgmqba8wpaqm65c20ibjbh1lgw9wpd3tck9wp2ixlfllxrwaup0imbe3jswaanm45mey19u5165hi530yfdou24yiql79g889exgevbhhi5eomlb9fml8w1xieh2klbvi4c44i1tx1ifq1lx4ftcxbw5467m6cxxgn22axl17y0sfdvj6twzks6cpy3x7vlhi72abbv99ji8cugzrxwtivodwwbvcaqq4t8jkjgwv9cm2w8d9y5mmibq0ljmzfvo3u8cm34gpy6v0s5xzahkkjgjgrrsx6ofjqq6kn2dtahd05cp3zt9os416tl1z2ajde3vir3amkyuctm15ngsyclmcf635iqh9meyj2k8tqewooc3efggozb6e9sx7k4vstwopje3isyq145c61r0fbtig0nq85sb12o1ungscav7m263o4sx8ew7tu9mwj0qew5lrnlhs6p5jupjz8d2un4u7ghpn2cvw45r9ir61mto0g9eb2qtwawn0u550sjlx67bgwqjk7g1et8lslx5u3zdx92c1q199j6dqq0i291ltc9m92qubzk0i43bczuw5mjnovnk6vb9ziqhxnkx6tm',
                sort: 573348,
                administrativeAreaLevel1: 'pn1r57qwqkjy3hbxnwgtiavujyaaddfnhg6ztyqevwbfgtn6nel',
                administrativeAreaLevel2: 'z795dy1bxqxxreasdr7e9wndof1nkbu1hox3oin8rq6ev7mbe0',
                administrativeAreaLevel3: 'recumqylfhphal09ihdsjp1rlnutmbd2f4ad3cwhejvf5r8dya',
                administrativeAreas: { "foo" : "bar" },
                latitude: 652.26,
                longitude: 551.27,
                zoom: 46,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'vq',
                iso3166Alpha3: 'qxf',
                iso3166Numeric: '5ev',
                customCode: 'uu5lcyf7nl',
                prefix: 'mzh5a',
                name: 'in8wa3hh467kgroopbhejt97yykwm4zbc5ye0bg3jvovosntgmav9tiwhulvfs45p4xq3nsr2z5wp2angb5ucxwy1tsyn39lujv1fshkvrqsav8kkjlhxgr9drnfbbn4oroyvuaub5029dw5c0gkwntypbmzbf0zix9hrjtvyhuzi1en59bsqhawzmpydmkk1qsyd5g98iyc48gi3724w8s2ryhno3k60ndsmm73wek9hizs3flexmnhcjqxl8m',
                slug: 'qa3264zc7utcuiptjovr5hk6uyr41tevwt6uxo7peycc6ykkq88bffftnogrlt40sgw62nxmeojl6sz7zmq56nwzscv7d4r2axo2hiihoi2qzi4zjyd03yhn00hf1uypz5cbrqlu3v6pczekozyuo7qdbbed8c2ino6m5thbzibidtmcf0ailpifx8bgb8byf4dgao3d78i98s2n87suw8w4gsikb2emq1ltirp9s9k3z6v2fdtisowltdctf5sovyeuroz3m5altd2n7syiduvzjab1h7os6xc4auswui5cpkcl0uu9542osrk2z8g0m1b39xog6z21ny4kolq32bni0m1saom19rbfgo7tbhe8q1ii9hn4u1kxb9u65e4gfy5e1cqsasag7t5hrzsz2x71v5ca5d3p8b3ctq0trolzmhq7pt57dxlgbuxxfesmk93ccpmmkn1pggxdnn69hre53ktx6mn0irbc3iobv4krxnw046nk92rnwqasbkhcnpjh8r4b0voeezps8ohyhahs7flw6sr1y18tduxd7lk9v32qo76u76xkjf39vkombbmnkkohr1n6k17onvtq67x61090qfo7m8xf2zx6e0fpshlzqovfdx6ay4t9znc96drvfusx87sbydmwnzfm2yhl6s4nbex7plizek8yt5p7hn9t5zkjgenxun4i3ce5oq7pdz0aa97o9fb30bz6x6r6immbbkpt2wgmpkqxhezbpoi27n1w6o5eougmbkb7zw49ohlylht0tg5r41d39p0684l7qucprrvzk8pj5ko5w68e8o1o7vtrade5dzsdsckp48m1wv8w4iimutc4r7qmxtbe61o3pinvnpssric48ux1mfi1z7jj6x36a7wnl8mahaf8wdyn0v1ivjhhekjfmjzvj2tequn4u3pep53t3uvs2biktf83l0pmftze8t1yvwyx0n719jsbxpqaxifov9o7kcjn09x2im8u7czeunk9c1ypm00nkz89hpky',
                image: '7e0fvgv0jku5ah1p5ykuntwhjehqdqz929xlpc0nyu41z6mrstl0tgud9yok1t4qv4xrsy8edug0job45iodsveorohzrb0xgqdihidtt7c33vb37d14behvy26949m5z4geux5d6vfsi9xc7qes38qrxxv9hppss55rbecabvlqekbzba9ha5rwjwxvb88vakh3cln8y2btsxfibmhg195jnnvyvt6uf4cdt96fvnloace3yntmmtjxcl1c6day6ydjvxu7rxkkaddjaz1mbuh6afdjox43odrpuxazx7sxq8wxzzjvp3i2ictb93e4f3k1myae4x4rq091ljkyo9zmrrxa3b4i6ai65xjnrwc4jsnvv59llp1058lyconlhzb4a1ukxlesekxcd5qzfgf95qkr1t5e0issskpwziyszdi4nfj3bw3yn6d4qtrd0e7jdnd0dyzfivlo1r05bbnfxb0g2s0q84nfx02lmab6cvyulqlp27w2pks0yq3f481atax2devjckc03f03cfctx0x4s7nl6eowma7oew6wmkjvothkyfdj74y9p7l65g0mqm423q01f2lrv4a3ko3h8c7erby25h6rtknkeuvxom7iglr67rmzis74ch1z7b3kc0me55ojmphkcmnjic3dlvgvh06pepz1gk3csjx7zy0xdeg2ysdxuuau8xsp70d9az4pn9x2o8ear91mtbbp52415980z3298asddf4k2segyf2268lrwq1t8rrbbdyl32bo01l894v9qob0cts5gaefytasd6lup6pqh7xul8yn00tdq1lnebjodxk7mn4y3vz6lzsn8wy19nf7lzsgk7aklq1fd0v4e6qa8765upx0wnns1z379p5g9d3awlx3oufa5h721dv0a5003b5u5nbvgcwbm8h5lgn8nklaudf7yerlnbvvhhm60cm1k9ka02c7dd98sb8njrsxh4akq5zpgf2a6mesp4ncbk4zj0f9o3b32ycsvjzqnw0c',
                sort: 763821,
                administrativeAreaLevel1: 'clr0fsgyqk8ap93gmdreeszzydrkhrn99mpsqejdqf8w27gj61',
                administrativeAreaLevel2: 'me27286ugpmxa896d751a3gv4g53q21dajhyn68ris43bqdgi56',
                administrativeAreaLevel3: '2s9uvmv4lgc4dutakcis04bxydwgk6o9q3ui1yrbs7d06egmq0',
                administrativeAreas: { "foo" : "bar" },
                latitude: 27.00,
                longitude: 880.27,
                zoom: 22,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'sl',
                iso3166Alpha3: 'm78',
                iso3166Numeric: 'bjk',
                customCode: 'ddgr4qvp91',
                prefix: 'g5nmu',
                name: '6so8fumekujrgd1nkr8hrrfrvqblh1k2blysy5y6mp7q5d4n9qsswjr60nxry97bnnxoqcipgdd4zo3dxjwoy1h576aol3x550pdj74bj8zimxlnuynek6iaojn6uuvnxoqpnqyh6psm18f8r9ycliojvmyene0kt90nekft24ma6njrb9xscr0q8v3jyrqs4t0glw3jdjdivfj62domfzi8rmu3fixj6nt4fce6n6j5d585y7rmbrw2sgb2qly',
                slug: 'us4s0g3ojonvqmudz44e76hp38er02trxng3i8dvce1a4g6qqytlg854dz9wru78tjapz275p9w99ps0liwfdb832yujwq4dnm59okt22gr7iq5mdmfx96uibgs0ubtftm4lpt2cnhka6lx07tuceb88mj7zea0kp0mk4zn4m6z55eaerk3j6xc29dlp7lndt6s7bn346o093gk6omsumxxeilw3fv0yfl5f1e6i66vp87ljrjwa42zxnq4m2xjnx4x360ngcs6der3vsruhsynqx75cuze8t59p6bb3d3grg8igx1heldkxn64328hlon8vgm2xupx33riepwdqn2152rlxeyoawh8zuit3dz9t41pc58uud89fphzee4cd0tvqk5u0fhlwjldrba00px5rcnmzqs4bghs3j1qyvbyhk3qi7cabx2zkxb2yzh397zzgauwsi6bu0rik3fuoapvha0yi8cdzgbmpdam7p28ap3y10svor2cy13m3d9lfgqonuykm0njw1w99pw2lwcjufjpqdtn381hg0mzm4d3uqqzrllvurzues3egjdqamfr9ura5x2d6oj9a13ndwsgps6rfk54ig4s74fwr6pmtditv8jurwp6iz6kiu5x3bjgizccdjujeu2cdz361226xcb2zn4wrh0zjyws73l5vzb1n8mu1l2vsb7pglp39u0fc2z0hjsvx882no0ij6se9lgbi9jfs79r69a6zomibjou43k69zs2otxujm1tg5m3ha8b1hf632r8hflcujqmmsr8pupo9clvpg9wcn64ymd6pri9jgymg85xpw7kldbsjpolzjdskxgue48xv1b17dmjylohda095bjqwe09q43waizpjmgwl7v3bodm8sx4ms57zhgfl2raji22a7c5c9n7czcmgknvupiwx6s7bi21gkhwx10w7qs4vx3tx17ru75q7ti4qtz1e5ytls3a82nmkys485nnpiwin18s7yadztpj6qq7vlazp2j9d',
                image: 'w5vb0mnec32mxhcgruc4w39993fhaf4brdahl0ge2fzmnooglqkf8pi643jkyq8g154tm4xz0zde0igkw78gxp1ky2h98vhy2bq7rh0s6kyvbzf1xy279ngdsh8yg0xpsn8ro1ljppfcfhw6j4aqycdgu8za949zxevh988w6yod7r462xkucnelggktqtd84xvrkd0dsp5vfwo5hznsgl6iv9cpjie5bw61wcndy1cov4sdurykyxcwon6n77tvo98eq7g85a6flhb2li4twpdv6cayowvqkr25e3stuiag63wt2p0z18cy2eqql7e1wizovje9y6ae10css5o866qiv9a4gsryamh3tuvkofpp0s73rmw8autlud5trmt52qatj2z3w8srjij2jpx2iccd6yzcwedgvvmq7s2f3isu0papww53j7x70rf1spc28tuwuzki6hrtprhey8zgbi8fz6t23j8jmsjhi1apu7cneo0li0a4qx6cxvgihi1847q64mowrlnd5uhhwla3m1nrx8y9ge63va9nwnt5b1hsvove11cj7mpu2z2klx8g7f4fvmrqbzckh74fn4sjwbnyk2o489oqpirn63yd30jcrdy47vj6r94wjv9eoikg7hf4ijt874wputml2th5xvyyeg8vjr21ql2i8c6uiz50jt2h2jgpib5g99le2kljrjj3p4hze1pe4bx5m1aj0pejznsvuewct2mr8ydd3cfr0nimdm24mhm2atfi17ij013kuu3ygavnbfw9rda8ejocq4fzjnmm795j7fugy9v3kkur53398eix6sygtebv5e2i9122q53oxyqx151fltf6v6gs8mghtexxcqo2p3jra9gf8d923lq0s90w6ab322v0ul3a9m7epual0il8ver0ldvz5wxqv58izv61ps2vwsetkofqzony7nf8yvffnovihq1227qcdtedtnapy2yb7d89tr8tptb8fpu6i2cqvna5569ehgweq48mtfbv',
                sort: 539113,
                administrativeAreaLevel1: 'ko9abg3pgz86eug9es0lr5v31un71c1p4epoeoicueqp9a46rw',
                administrativeAreaLevel2: '0nwc0252p00ks1ukhkygrrwltdenbhkmk91t3rsuu3yp28aefe',
                administrativeAreaLevel3: 'wqlasjhwuqjt36ec693zhnhuzyqlc5643hcekrwh6c3k60xoa11',
                administrativeAreas: { "foo" : "bar" },
                latitude: 949.66,
                longitude: 362.64,
                zoom: 73,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'y1',
                iso3166Alpha3: 'nkh',
                iso3166Numeric: 'c8j',
                customCode: '67x3larypq',
                prefix: 'hon9p',
                name: 'q8dsx8rkp7tp2qfqrcmk0ah2frq2gj17pvfhhbb226ug959o9gkkgqzmuwzfqkgpd1zk1g2kxk6l45xmjfwly2xbnmiav7fgppcayx0lsbe01m52t3p4zft58dsmbtojynmv3610bj7mgw4x9q29sdbdmwdkutnw445aofilmdeh86zo76s50yqm7ncvs26vn740dtujcvjep0k6dm6gteztxt1407kckpnptejwrdven8kbivnwlgwvxh3izdq',
                slug: 'q26ygu0viojs0bjoncymuw1834d4u88cqplgnxjszrhcsb4p89u2zx0is9jmf7rc8xqyvzekfoupx7jk6wwxgpzdpcoza5vbw5kmjnyhqbm1aijbiegid60l7lbkrr0f3dp58tlj8rw1efczup9uodj0hfzdeu33mbprb47mg042qtk6qka0mknb46upve093joqxjm5ti76lfir8affmbsb5bmvxgrltcxxr9segx6u5fyb5ol0m6avelj6fdrdxctvcoerolqrt8w1bxrexvx2p6r7h1366nezx4ybiseudehj6ypnw56zm1khmjc2l2rp29f2j8fu4uqxayh9dj60rdv0m1w9o8p15c5tmj8pgyj5qwqg9ggd9d4j06siazxqbxyg9w5juqeqb1rh5m9ap63pwyu8ui80ojgh1m8294qyt89oh8in6khgekjz9omvu0jvginkcueli6inacqzlquzngtj19vm1awlo7l6ogqhd1scm5adpf73jhfksmqx2ri5mgg2jq33z1y0sa9znjo87jmposf4jw1abb2ooxr072ysgjl3npd0oasa13w72g3c32bn7m0g78h8msztvspareal9t2w1a9fewy94ysu2jmkqwk8o9b9hlwqj1b98dk6qb4d9iu8o7kl39x13wwdgdr6ihib02npzo3kuiiac5x2bvn8wv3f0qzbec4xudy2gwxmoztpctbpudg5sqx8ccer76opxvqlt00xh3a7h7houmipgn1gl49ktkgdvx1ra5x4bkb4wxoyfo7po8rxo8xuxtoy9wsnt0hhsgy4imvwic72hbjgfymtz9t5psqsbi2ucxxnohunu1myp2npzndk9dw5vwxeeu1fvwkmo50m7ts5xbqhvdj3hxyi6u4iykp73i4i34m0qsjqhyyvp5d1e52pt6pui3im7ml4ohqdkw0s8snzlgtre6ubec0r9a0ydpnrqankhk98jt9ipfwrex87h83q46tpksq7skvqnu0xni1v91ep',
                image: 'telvq7p1ctmeg2an8j7mzv1urbgp0bxra533oq6ectrv1ypibbwzgei44zoc4v4imhtt2ntzec01ir99221h3g0wyz5ishdb97ugvi123axo4kit3c4xaungsomun9xhnkixmmxge553ho1fbw77v2yi7hqth6cy8gmjfubcvjchcei3lr1m3ve77yyacz5i757n2tyea1ojm6stmqpjbn16ln0fx7xkucj5tlo221wnu0g710uxoblemhas3p3vjcma6xfojzqq8v60ratxtnaal6trh4mnhz5kxaui72ir7u1gsns574gk72ez7gqq0twi5mo8s4keej1yhnskl9z2rodckm2ny1sf575tpahx7je01nyf0f1kqp39xjt8abl2d569kd3d6e78cosvuqo8qrzyi6tme8m3iusb28nes358s44x6w1hst01b7gatx6s44znvk8kvx31hh6apyr7l64jk4s9rpl4uybh1ebyu7a1hp907wd9a6i8ls0ynu0443ajsvl871b6982wcs5dw87vde1kklqe9zqmmefwldmvfjdxhgrfuamhjoz81qq5bh28yv1aan3osblzz1t9cr3fweflegwren245zoj7rxjf2vaq1ium6hervswtxkvoslow4le4xbsaq22ffu2bn0oh67acxtku2yh0cn20zybr0b0ununsg5jbns741uzcmzu7nflo30d1ibwtpem5saexci3t4gby02x9253f9nz4nj2tme7l07l1tndhs5hui5fotcxbt591bixtpsl7clql8kh6u9ne1ej21xf4lawaflpm55rikhw3bqwawdx2yffqnfuhfwkdz1zi4c6qeiyvzwns59xt4dnsur9g2w4a8wknxzpb4xpzbyqxkqb7fkpgoj6u7tv4vfc3ialhbn4a425b5z8urifxgke6g0k9ocxxof0zsdhc9klmjr0c2kmtv3ixsla343dw6f247vyudyq1hqxk1acfdp4ns3ainzb49rqbxh8jjto',
                sort: 390499,
                administrativeAreaLevel1: 'yreiwiqhjn48n1wn55xje2m1vscw1qb7m1z87128crog35mllm',
                administrativeAreaLevel2: 'udgt5x500l1tdhbx4kn1fl0ju0odgsh17yuept8l8flr0p7bj3',
                administrativeAreaLevel3: 'jvrhu3v40lbgh2d3dsl73vyt50mdzogp0ihsdfnb82bnrssp1f',
                administrativeAreas: { "foo" : "bar" },
                latitude: 710.81,
                longitude: 716.89,
                zoom: 21,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'ld',
                iso3166Alpha3: 'mtm',
                iso3166Numeric: 'v2d',
                customCode: 'sfvj7wm698',
                prefix: 'gmrxl',
                name: 'z0qcqcpk1yf6p55hhtshte9c429720nfo92vm2m71heuon64jugsf6l6ql6xm1vvtdjr626vgznlk4of2p7t2jnv4v00cw2dkyyr8y5knezyumtrb6c0is2bqrnsoke2wb6jqbf1n9nawmufs71zjfybienn04y8gelxl19apuads6917dpwcqjx4l1l2nrv6qm6cy3fokyztfou7v6vbx3zi5shm7efri8ouxm3q86iyio2o0g4y1dek15gmaa',
                slug: '4mep8peq3bos38vnhtv0e7k0hbqzy5lopqm0segt23xl7mfschpotav3u7whzvrhd9o8a1g1zosq0wcjqstcfa1t44up6kaseirgn0few5edxto6f759ajlxm0m209vgvon39nmyszsawk2g0v5esz6yfk95hq1mtuvr6rl780g32rsn09lwa49h36i85v95mszn0sejj8t9gyixgrvg96r7gd0g6kkxc25wzad354vc9tbgpon9dcnk9jjnqwzq37v55lrzgewczd0icup71sb91oqp7bryu62alpc1agldvb654nfbbripbpmn0siebj1zzz6w9ioe04sa2y33012zk3oh9ulnidn2qa63cwedi92duo75zze88g1n4t3lx4nj644o3oozvzq78wirg7k1cmsisg1f9vle4qk7ybye9djn3bo16obykxlhvy5klnnrg88dnkpvzy8n7t5v9f4gb2bdhxh5jfur5ytlirt92scxvb8nvnfdcr2iuetjyu6awt2qpbb0r21iphs4x9dnns3oq1dky21lnw1xd06oqv0daqx1p32bknx4axhhawepd90f1vqykl1x434o00m3ly7cpyg47ph33m8ca4cvdyp69kshx51kxtfldlwunreys4s8rsrl2lm1axaya9by0csgi0pm2im0fcdswr6jp7fgpihc01758moppe8wfluzzsdsly6ygskaoppspqm9uxksiod5xjiyt5hj474gb8vttfiyuxzpxcd7fv98gbpwr1uwg3o74kawcopgf0s0hrl8vhbg776xztbi0qzfrbbe1qti2ssu3pcs0tpw31ye51hupdiwxe2kjly3jt9uvkgjinz0zibnk9e4em331riomuindnl9jm4trei9q71rgels87lfbi9awgp91p8rm6fokz8a173jh9ulguae0m1ojoq3xwe9b724i8xphxhsfj2f8ob043boq967a0sre0cjdj0oohb4sxd3299cn05hac5a8pqcfmsw4t02',
                image: 'kg4in01fx9ikgi3xw9kdkm55ovua943lzalegeqy120di6plupaaybqrhrc3kpcb9ka5wlwnrmrrb6wcmeq7wepis76nmarbzkxj06v94lil3zi69k5cyegc3qm2g9vpgzryzxv6564pa42597mrv2hvdkh1264gmjgx5zydcsjyyb5zvvahl5xi7lajq6ljse53v64cv8dnzdrrlzo9r26d1z0d6dt2u3rdykut5sg5xilih4tgzk1dug52h7y8ji98qc4yu9hzhmewhwd97wkyv6tqda8hvqzq35ms8dx4mg52v77n06wj49bx68coe0yssw256gsyg9kdlxgbanpgzd38py9on4azcp73q8o16ewnyd9x5xnyxssb82eo1w5douwwpiwubjk1oomr46tw0copemciodfnluybcbzt5quf8cr7x9mass098un2ga2gy556g2qe524p3g9rltznxrxyv6sscu1dmq8u31g5nt7r1p6e1y3tq82xv890n5vup4d6mlcuhzlh8zs7efkr97484hdzii8rmld3yia1z8p3wkwhlitvuat6zutosw298lubcwo7ysbwuw1mg1f69px1s6lcyvwc1gr9sobsq3la1f90tml3hqjd1k682l32r5r1z2sko1acnaum7til66o35dsejj7g3iregy0vbcwqxyfvnc0b5icztokqhyuza11yebvd043f0qlms3jmwjmvgrxk62mj19qnxim1r3o29q3tze9s3icivqr5uxrnpa7bd6ai5u4tvhjk0uycywuihcn4maz2pq4d7kpan1h8yyfrfyox6cn1x8bulzirkitkhco5amj3a49zzy8kzrbkrr5vg9h7k55z1rpta9glqpqxnqt7efuor0twtrzi1ip2rb2wwnjm1yteilp6jri0kpd01esx2b54wxpdzdc0pf5xz7k9kuyy1ogablawoqv641dl5sko31bz7jbxz8cv9qoie8p8qdtz9g176df08zqwpdaad525xuwg',
                sort: 931645,
                administrativeAreaLevel1: '6qh0lxngmy3a8estp2p6r38g7xhpeokprc29huroo2edgwjjzf',
                administrativeAreaLevel2: '79umuq408q0poht0738zja1shvn75ukb2jtafq8my6t7k03kaj',
                administrativeAreaLevel3: 'hi04qa1yelzdevfy4h2yd3s46ojc4fzlimj7kpm74h23p290zj',
                administrativeAreas: { "foo" : "bar" },
                latitude: 946.23,
                longitude: 454.05,
                zoom: 30,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'ck',
                iso3166Alpha3: 'p2i',
                iso3166Numeric: 'lgo',
                customCode: 'hgoj5f8avz',
                prefix: '3gis6',
                name: 'nacn5t9w3jpktcsnzl2ba74rh6bgs1i7cn32eei749vqt99vu303gbw55vg0ut4xusvvveogb90g6bb3ha1c6274c06qr0lmn3g21jz6vbb4mm5dwyb170wg5wbdmfxa67v4u4edycvdjdfp1s8j3deqsrro7vkgcab53k2rd3sk8vav1djx6iusjqmsa8181fz47wxj7p7bp5r930w1gc8gq10akib3uonaz24wh7ep3etfxt9gfn1ie34ega4',
                slug: 'cqf7q0ovmjobj59vncalr0p59tgd90xrenbkwmk3jviqs800irtm8lr3ongnrm2q1v6wzbh2du4kfto63s2ltks0lted2fgyhxxagi9la3z7zox1awpt8pv23lmc3es98tsyo1q2rhxae4cf3v2emcmxbqiw93q4fjnk1z2xx0hdv79mjl6bydj0etp06pu8aau7chydpej49vlyarc4cg7wgn22iwjdb9pxtcjjdumr65cv6gddmtfr3ejoyjxfbek9tiza1ajcqmgjsx78wg9qetq6lij73s3bclmx1un8gqmjefif1yigairrywjcbpubo2n76vh015d7tswvwntcmo5kgo8hc9hc3l50za7nkcxx6m609utunxs5n1y6gni6gxb9cgk4x1x818k7lakwxhbhboajocb4xard3d0usikpiklq4kzxyy2qf3mn2lp0k2qt4jnt92u28dnk2boy4qct9a88i5hut4ckhi4olr98bcp2cw9692rvejv8r68huk6k8spbf8b3leud8e5801cch1drsy7urnjxa3zg6jc3cyoxshb3w7wdn8xgmthh8inux08ccerxof9gwp8f4d4u0z465g43l63wrmelpo0bmtuxur5n29ec3z3mgeg2ysluv7gjhnu7xrmh06ie8mour0lepj8e27iqith6t745qybgtu6rexnd2s028ldmdbkb8wsj1bmoo550l1twgndo85fjbzlb5hb5fa2p2j4ewqhe4i5a1ad6j7mluk2kusgl2t0urpdlbi34pf8dwhcwayuo74yd1nb1a2ywr4xtzvyprxguu1tiwy8m20iypcgj319sbx7cezijoenvrycdsd9enyz98315a5ba3vderktj0trptgfb5eo8y6fy1a6vwor8z15aq01a723szfjv1brkyau2cfgk643u9kneg1r0v28g4zpcu69dni03s8fgu107a5yvwd5sn0pi0kplsgebby1nhupdcfsqcjfvi4yx726zh7dv1drq',
                image: 'dyl9jm2kq4sfc5iaqxba83g6vqmqecezu1n7flbpqysnkbxa552j2buwmltzzrph7n90h3dsr12rq4b9xw8tko14nfdrtxkpdnwekg47oqsodkblbwtyxnijq1reuqemcdxq9aj3070sp3k0tfau1bsyjc1k1tj1ftj3ehr3wc1mo5npxbbsynpegj80d5mkj1wuhcuknvzd29ny9i2vl88lzhcoh0wtzxey52dtfttsmnzd227yvlaqgmj9m64qnbxtu4gbp20m8sbsqv4zghygmmrx1zbq5fcis6g9kumuxudjgn2ft6ha90szkuzetrgs339tn89m872djitszjc2ns4ls8yb0xiww1yy654ocor6fq937eguts21gi1f4d0nrln2d79k0w5aqgdgddh5oaxv2yypu62j7f190tqt5wtbcyu937d1akggsexdhxpnrot3ze9mj28nojzy2jsxdptngopqtsrdg7gza7rw1bz5avsmi823y8xiwtdooi43srzdlrcgerdj3eecelw5f2k3q6hqmj0zak7cvsyzzrku1c42acqjdj3vj17m7vs0jh39ancsrn7kp1x1all9vsbtq9cels6lnl2dhz8crz44vb5r32nsdbx5ed6dyb2vegyzurx9z2hp5ecsor95r2k6ih9b7kj9tx6yctd4vs9y0ugw8sya7eg5xqdwg1zobgsr8bq36tnrt1m892zm6kqw4npddybqditad2vt56fuvbncyngoj0ncwkdn9r4xcjkanrq0wqmi6r4julk57nlnxlyehsp28pdyvz7qro1d8w2b6qpalfbcwn8x0t2bhq2tl10izu7z97gr3ylhghlw4c3nm8ea2pjmfpqjefuxhn9wsmuma72pawrlgr21qdudzzypbg5jsfc7mkzfdgms6w1jmq5zli6w3uefdlaezec4c0bji9q9le1hxjlid2can05ont9deuinvwf5vekn36fx497faahggcc1f73d6vtvkrd12sectf8m',
                sort: 769351,
                administrativeAreaLevel1: '92cvaeb7anjth8txogv3bh3cule5ts3tiitj49gc7rkeuicnz6',
                administrativeAreaLevel2: 'rp5xx2aw0a2fn4ob7xb6nc3334quw08xztg31s1f13zgegragw',
                administrativeAreaLevel3: '1r0fphbzrwk82dtktp7mc4sfra2lo0jj71y8l5r1v4ysr52rcz',
                administrativeAreas: { "foo" : "bar" },
                latitude: 629.18,
                longitude: 156.42,
                zoom: 766,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'pi',
                iso3166Alpha3: '0ib',
                iso3166Numeric: '2h7',
                customCode: '9i0fejmmza',
                prefix: 'rgdgx',
                name: 'wehwp965pgxb3yi9sp5her9tqepa7n4w1rpj39iwgyt6uakgkw3vqfauvuzp6hahnl84vfczcqrd4vgsgyaxm0pylmqdhvcxzghhe3rqh79b0g5k34ia6b3v61zsyero6fknssew7vafmd3d3yqf8ree2c6geudvpjrp5n70cxv5oc5cs00b6g8rmj058nza5vbqb8qkqqopnrl1bi3yaw6qr0olp4d60qpjkze1zzxb2a5nqw3d27jg9q1yrb5',
                slug: 'ojxbamb1dlweqnxtjvyctaxp6tvusefrilqlndpzd1nh1lw2km0et9u2khat11x19t8aq8mmjvnn4aptbw7e8otrg34dp0mhbwc9ywase2kxk1tvoog2sljpp2gq91lfwpf8qg9a8o8lzagp5ozudt6nulhgqcep7ykakggz74yhq2p9yg8ade3w0797rpt6es04g4ukj0nduyd22lrxe8y5hsy0udjfhwxo0ffuta8rlzayikg6g0e7y875w7vman1rvphn1x1cz0p0zv9yr0mu1rot938nwf80t6ufhyvg1qfna0lofb3lrwt800taxmbkvakp75mak96vsoqp4n4tynwgsxcip7587gkkakqvf3l589ibndbfz254tiq6vmrslabm9v0nopjux962y3xz800hc83v5tdy7spbncg9b62y4ppzy0vfb2tphlo5nt12pdjg38jjq0jj1q5hwlfau4l8vdwqml5fslorl3ifoyjnubog8jfgjrxbqrnai2rduhjw0jh2v7uhji3k7owo60pa3ker4q5c01x36u298adqguovme621jlgjk227i6fndhfzbwvyuo0z54k9s1qt0sb9y8f4qualqd9tydh91fvowq18s7akhikxbldrvrp3synzmdku4izkls82l8efjv3pxbbcredyl026eqzx756xn2nbtcgdu0fd84j76af6uau5viwm88adm9rs4q0gqyq6o4j7c2t3y8ojqpqzxge7iajnjpibkvjnreoa9bel2qvsq3hi3m273p3dpqyv1sl3fxijrxjb5vzfa4xb8tempi59xkr6i4gd93sgbu2bag52pqyduhi0o8nhxiw4o99zjlvbrj5c6l9h2eoh8e2osgsmr2e3p56xshqbeam01fmdqmc62bmke9wigivu69ldp23d20mt3pz3rlu0ycoxvxev5ub4lukop2f44twrdmkqs9443z95kmrw63agzjqfz72c88c2iraahmfxoru70bbfphgum86bend',
                image: 'mgmbcer1w9yj2r3bxt316xmtshc8wpaavz7a2g0g2m92wiw7f712zsyxmpvr4d3e60chli4mpxf699gtr5ahm9547v94xfcdlcavadg3pu4gc7ri6q0vx205yk6pfgkfvcnmwcnxuqdkzithowxlurikxnzmastx9avgfz7igfujeec9oc474xgf8a9q9qun30q9v88erqtf52bvr3iyoxuk2vi1ej099xbec58y6s81zm2y9zxftv8zxhy31tlustaq73y0c6x87u8n2m2xp5rk1g6zdm5yzg1t7beuon2basy9tk098rcmn4ng5zrivn7xntaamm16ywky9clwzcfa91z0imy3i13198vigq3a0z9fu6n5c9wxfwt0k3ijfyjfi0g5pn24ahn9vep41ufygo9227fclxehg0tnr8fcoxpbzmhioniwqsfq846tnn5z48gkehl2t794ek37s9jwwph9w9y4hx3u92fkqy0pd451go62etbxtnkmalonymlu8kzhnetnq8x2bdrege8ie6e0p7yoa7dz14le35n5b4xlwl5ux2yf3zlj6byx5df19a9aolwbog60t2igzm5z2mfjxvtezl79mnmx26sfeeomugnu7h408kndv22qlpjgza043kljak1yz9xzwrrchgd66swll35nrbtviwaoq0rvanwmwuwglkn05750vin2zxx59k8l94k16sx8m7q22jwgrtpoy60fvnlqksc6ge5zff4jikasbg7v073hgr9dkky5wbv0qw2rwkygkaq9x4olx0eqw12whji2zd4nqczgmlsodb4hb85bszh0aqlqbp5dcj5ghgex4yglkmra2lsb6ytpwth5aa3rc2clt9eh67qhbwovqz153kd7md57aihdzd1alwtb7x4ko5x6hl5j53g42h2xguwkmme17a723g12jsuyme1xl1xkqj6v5zydazdeu6xdbv6h3pw5crx0rgr6mckz0krlhhtltp8lptg2h10m8582bd5l',
                sort: 403275,
                administrativeAreaLevel1: 'jroiia3y8qe6dobghm5ivcmcz2h35avhwoq4wr2ss4a7t3xswq',
                administrativeAreaLevel2: 'tkaz96sr72d55b1ofkv9jep8nukcpht00pmcuaux4mvav1c00k',
                administrativeAreaLevel3: '63176j94o20jrqvxi91oa1ttoi1oqwzqfhilbhbb1c8k3s9qgb',
                administrativeAreas: { "foo" : "bar" },
                latitude: 416.25,
                longitude: 929.47,
                zoom: -9,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'ud',
                iso3166Alpha3: '2x4',
                iso3166Numeric: 'kvl',
                customCode: '60r7qsyvmd',
                prefix: 'st4rv',
                name: 'ltxtptes4lfzdhic6qhhovnmhwkxawdr3twormpujzlph6oj7ihzor8oz8zk2wo0xff28e8q78r3m55mhzxcgfcvhddbjxdu8ffdk7mzetpabfgml716gh3s2mr50ioa2pa1smqer59f7hvbzypo8zkmqtc8ua79vn7uqkeq7ufuyfm1gwfhejau0ttf1a50sqrzzdb8k4tvzcsdf8rq0q7r1hkyv2dxzmlo086ue5xp4675ys6qmzi6qh2089b',
                slug: 'muh8jt3hzievpkpjte90o77cfllo5pxwi0ze9gaunl1n6z0hob4v2ufo6afa39nzmleto2epqch6rxuzznx2jzlkp3pk2ifc2w0vkhhlq972pjx5cm5uk02j15hbcwc95e7hrtg1e8hz4sbvtxci0ozk3d8ttxplmikdoxj736cqv6jhoxi6qxjqchcvt0yx2b84mt7waqni99yhvux3o72zf4641386255wivwdhxlcectkfx1q9zuvyuddwg8i7xur3ff9rqebovu89kek9nq5g9vqwvktyla0dnhnvr7cakb8utfs3ebnleezemvzm7pno3sgvlr5o4x9trjyjhdcq14nov4ulu5lni4uzsl1cjqyiei0f003afejqfkor2zdy1v2gjljkarobfswg3jf8myc6idenldnp3xpircjn1t021paxe7i9m3gdnu0pb0suymndcp15kmwmswga3p6rvrgagwjf5ukwbzj8ex3buktokajwdbbo6o54u5lypnzzumqxgwnc1e6a62ufrtsulpn6wl7rthrqu2ukj8gz6pxpdo1f9g1db9zovud9br8f4413mu2r3o4bsdvknqgjvob0qexe5bqqz3g203o4kfmihfkvzltvuhcxoafrtwlje4u1pir999vhhmc5anhu2zxmazawy6keo4avy85p56yxvvwv1f9sc2x97bm1kmtxf95j4zuy8x330o853q4hbm05bypm9tgt97pua115zfrtcgc9aylm1q8316qkp294fxnflf2ogcybfyi6vefn7iiq0ucctpozssjk1mjtxnq5db9iy5g15r80wilzpjtv9u1dmoshwxcphz5pamnb1cjpeke9yya4a9wh8kf9nv0tdaeehvsmau48zz5ozulo51ocufz3ydge574y65ilyp7b9sgy5jh3wthdvgp1q0q71gtj69um16jvhc3j4mn2bncenisnqa7jfhnsveqqao1pw4uxw3e29hn1obsuw6srw0fzam2y8cbm4pq',
                image: 'tmuzwaaiesj2999nl4urmddpcqnurfpuywgxl1iq771d6hyyz5whflm81d4vy28rslzhxw0hqekie3s4pok2w2srccttc1hj7e8v2flhd4uds6lgck3w8pma5nzlks4w2pnz36aq8du7wukrtjjgnkeu5ewa77y2fovzn1bdr6o69um4gz4v12hbklribjdpyg20y1qei82nr96h8qk85rn59byq59fkrj7g7k4audgs7oapwl41sjpjxkizsuoiri1mvvfftfbs5pefa9mw6v2slwdjouqwnd442dxhrwig8eieltr1on4rst3ojmtsbk8kyvc1jbqtf6cwiorhp9tueu0z4g2yxp83dloil40cmqmjehbvnga32wdtg17118jq5u5njr7iig01bk3sp5dp4yqoblnqgeybbw876tt19l8ub0x1yfcq6bgfguw1rx4hodom9p3goo0uyq3j8kb2xvf6kg4p13qcg0e2cymfvyi1jjiittxbkypuidbd2ns9cb77iqij1lpevbkcntk3cxwzboa90khatgsqsegniw0sy1ukr6cvc7dnvne1r9o8yukeoqj6ou0doyo1vn4aut782g8hdtx7uzf1pb49xkmntjqyr265ylhumdv6zjdad3nonhnp1ppbsuh8mbdf21zwict6picwwkqbwyjr3nc1xu8gy6acx6siocsrnuaioiu8kvlmrcwr5svyotis92povypn52j4rmz4cx4xew6b7bkc96ku0bgrfte1l38tycn4nvok1t0cx1497sxs20ghio70ryq4ybkf5wvylyhe4qhwm957m7tner7ou2v2dptaa5k0ysvwjdflufusdmu0zsabsadd3lhphmj6v90hihfb7m3rrhvhnlgd7xgf8x6nlndtxzq7ppga1h9d76viehwpz4jzdvngqzids9yhdktb1z4xkee9swzh1x5oo0lsda6t67kq6iworr6pvjzkj5nqd5yep8wljd88d148311pte8ol78hwgri',
                sort: 391386,
                administrativeAreaLevel1: '8azvw73lun576akbbqswiek2uggov8cjwfoma4jywmgjwlgzd9',
                administrativeAreaLevel2: 'q91rrc3ucca1pcn267lyzrsv6fbfbusrj4echbsdda1ui3x61j',
                administrativeAreaLevel3: 'u69r4mohjlu1gv2vv1mbu7b4stgg7jolpzarl0200ycffdru5h',
                administrativeAreas: { "foo" : "bar" },
                latitude: 707.51,
                longitude: 11.08,
                zoom: 60,
                dataLang: { "foo" : "bar" },
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
                        id: 'f324bc7b-c655-4639-ae4e-7e384bf8336c'
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
                        id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3a88b01e-3c8c-4a48-8bb8-782c4fecf035'));
    });

    test(`/REST:GET admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country/74448477-628e-4970-81f3-ae08116b689f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country/3a88b01e-3c8c-4a48-8bb8-782c4fecf035')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3a88b01e-3c8c-4a48-8bb8-782c4fecf035'));
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
                id: '8ede70a0-3188-4508-8253-f7c3e42da2ad',
                commonId: '777f3843-9ecd-406d-9760-dc8ef598f034',
                langId: '2704e4f3-b79a-46aa-8347-7589bd3d852b',
                iso3166Alpha2: '0e',
                iso3166Alpha3: 'gyl',
                iso3166Numeric: 'gsx',
                customCode: '4zmdsn2eic',
                prefix: 'yz7sb',
                name: 'z1vqbv7zejxj3b1z2uklt36dgp9aexu8h040bt2oa0l92c41ch0g3gpv29qhu8ndc4j5s1nsx32bp6yuwgdnyol1bw6o54iif5cfn0hritxqjy2vjwxgzq5ll855lv7zjpql6dqu30vnu4oih8wmpeh05t16f4849w3tk3tn13tpxgz500b557zplfdkkouzjt7jc2i9dn1azfdkscfbvgtqqub443p93id0h15s0dve1fhbk3y88epmqbsj1wp',
                slug: '1lajb8bnddpemwymfgs1nlnj8jr0xwvf3whmz2umo3cl4alykeoeba6yogju3mo1s8bjsdbqs6may0f6hqwlrz3hq22hyexs5m2us5ydpl2ny9vk964dwx1m1rwdl38r33e4c4m789zwvsvsn3qn0fiqlsibqxuiojh36prn8ele58iktsyt1ctzhburw8hm43pcdijq3c9b93r6cpjt8sz1zuf2lzoy1nb2apawylq14n8ipszjo4xx83ra1vygwi2wp54p0gjwzr9ju5sarhuna9p9v5qnjgbbw9nrc330umyqju3wp99tzz77t0r0u1q341smkgvpav7stsqx3geb323g0c52vpj4606ggtzrvj3tk9jx4v7lg0o0y1p5lbqjs17qa7xj8qled8vmz5pikf16qzf54t39dvx7jto3eut74m07vb56hoxmjyl8v4poke7tev2u1g06xvlatj4pq1jm04sqy9zipkxhjgsb83e4n6tn0yplp6o2pu89m61cpmxbi58hws9196asvrfwzt2575eeh5dl07035zdw6c3p3xtaknt1r1fknp86m366542faswe6nbiy2qn2mjc8yocauwjqaoaxmdpuhdu7e83b6gesoyaonyb3wztvqxwo5n89ax1nlfoyin7jq4rxnpqdxma7nzwcl2hdh2wy7sx3j3z1gye5pzxpidgu10r6vlmgnkvjowhk4ecny4u6t6dv68jo160p8t0fqr89szoias8aw3nn3mmesnrfqgszpkoq75omf7y491ewp68c3trpwvl6actuo3pr2c2hf5jtno6sl56ovxyj9rv4s3wmsz041ojx0ojjtkpsq6bpbj0ervmu4hofk0t7zhscvihkidso817t6q84ybef1aobsfvkzkas7fmlb110hf80ug94wimgdqzajxe4996tleknh9fvkaa57v7q5q3fkglq51z1j9dh2xoyh9uid9smld218tbrx4ecp2x2fqdf4og8zjac6g2ialt4g0i',
                image: '2ssoxhwif8l0klsamr1x283jd8gok50dsao84w2x4y23vfcljh37z62wbmpcau5m40wj2wsizjoqm59ufrsypkmqgqla3qh546zk1wd5pee4koh8wed5ejqng33hatfmk3qe7wvwjvgvik2e5xvxj98b3dgek0948vbk6h4zl3l17acuo9em4s43tptj5vunglmakhjs5ykp8f7gggxhq7n51bmdg3yhpioca9ger10kqa5btqoxdgeloownqi20u2tegzpvngx1kb1c43yn5edxma4cs5ori76u7jexvfrjvecv2g8tiis5kmfe3gdijjx9ohwc5tqmhsbh9qgjwg67apnzbkymxy4cfw02c7bx4jeheu236asq8k0tozww00c71m94742wkyhnl44imfeo0yloke7gfuwzk3y961z2qk7cdjna16gr8tb0omxo5az0enc8se3dv5b2ji6av1k0zu1z2272avx1tudw59q7kxgsv4l4k72rcs16uwije6do2h32ql0canvp5tnpfrran4wt8jba3he9vkbkvsbr3jpqpiq9if9mo9tvtph0vlq4m1uxf45pj5izz9fibl6sqzfvut0e4y1bdoa3e7dnyvjy4mc87ei942qbcf04sv8y731hlwx7mvz5fkiy1oeoee82gp390oxvea6742umd2yzyej4hn4pogidugdt5r6w6iax8pxb231rr7z7w5d9sgsl5qph18vkvu9mvd1dfzda09ni1p2wyp7fv58ihif5ecf3mrl9bkzzs6nusmb23rrongdp83q940d0owv0c44mmy9zazsxol7u1jvqs7ry92p96hhm5p523qxml4pyd7mshyapx2he8vwfip3r9weu7g6nxseu4j7dyqfb5vbebzv10t304vg2cn97qdmilouyqx5ypr7aebh15u95cymkj4wd1nhcu4iw0p4iui2821tuui3kxbv4ww2mr08f77y9hyk0ct4ezdshqcx5fwvevqkgjyx2rb1ltrja',
                sort: 133093,
                administrativeAreaLevel1: 'h3eg1jka9cjlshg96jj6si2qyknzhmxkykv9bikgpxfimn0k1y',
                administrativeAreaLevel2: 'a281a1n1xfi6ci89keescoayezkbngr6mkum18kyyeazq774zb',
                administrativeAreaLevel3: '1vqf70fjofh01vnx2lw7vo6knmkg10p52dbablgaa19uwf9enk',
                administrativeAreas: { "foo" : "bar" },
                latitude: 588.93,
                longitude: 7.30,
                zoom: 45,
                dataLang: { "foo" : "bar" },
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
                id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                langId: '75629613-9276-4e9c-9a14-b419194716a9',
                iso3166Alpha2: 'kx',
                iso3166Alpha3: 'i17',
                iso3166Numeric: 'nwx',
                customCode: 'mlnyzdz7ul',
                prefix: 'lrz4t',
                name: '71ttjsq0ci9e16ai7ceu3g7fhpg4djaoe2xq1p59bj8fn1pe7eb3a659oujvhj76ueur9tbnlysvq8qokkmh9ef546c7t1276pz3iz6duidbtp1e7mfqlir8ki85fv1b51gy2d3pl9xmyt1vpaqfy67jdqpxyx0db3scow1qjz9ojgljdt6gnkynpfeuhq2alhtmfiqfa89hg8hvh3bsi9wxormlujl7usrxcn2lc9nufsq9uu4c9st0cnbtaon',
                slug: 'itzpj2f1tue4p2giv81alms9qlez5gdznhigtu8o8g4bja3qzr24uwsvzs2nn0gierk0grmdfijft6ahj7w0wc6q9r070z1n7txsmqhw09rjbsnebtp8zd28flr5w56bii6r7vfsehd6nmmjdtooylja8mkfpvycia9zubvu2s40ljcqrzf35hfsmdt2kk73bubanizy4lhz8jtt6aol1e0e54dxs0l2pgwm4ywk415kzzw89uyrdbggf4eitmb6yr9mtz91efgz227hqdlewvw48qkf1x89f8j3defemv2avs8u3tv7qy5sz0wny65wp010gcevb694ioe3ui38xk8nf2gm1diflpppa3spgct7vdi2hw1l6sa0d82ar595gt0ei0euceagy779pu5lgfddy0vkwhyc6qgmz17dfm7m1xayfmp82vsqraglnhnaueatrumths77tpszx44z33rxrysslu5w7dtfnfim5fwq5omos1cubsgg7zmteyugcx3s3rzlo4229mwbmul5x8zzbvr8jixjn2ufpqy6vb88ni9jqck4zkmyaq6ztslgsljplppo33v5izfopf6db7no0izr7smyafpge6cn3rkbhupofsejvmxb9xaf8mwpl8ww2jtk2u1gel800c92flau006b2r1xs9uymdrg60l4xeifw8lvsmw35ym0syekzp5u73li7idj6l6zhrnact5tfbm6cr18dp6pvqxukdv02s3sh023piu0q7r834445mjyxkdmnecwn0p0dtajmeqkuq41xj95lry8ijci7zx11uxghvj7pkazjt4c7rbyufa2y7qpvxhx98ngtric5ugqlw4f026cyzod0yx8v3ran725v21yh40rk2wkbsbogzts0fv4rxzjestl8rt3v8ewt5vphuys5avzeqdfoutnb3qls7g2a14dv44c24ycr0lkiz80vhmbrobmpgx1o0gp96nz6hwb7q2oqpnr2z0i7prh8my6tfkj969ti0zg',
                image: 'jj6jgrcgms468l367wvfj0pi6p05wwkswjbv4tpbipg8m8ekeabolfwipbdbu9q99r9d0rp69fm8xmdpfahyxicwpoph884ta9u1h7ax3acowuml2qcqiyqt3u1dvt48z3n85070812xxzg25vg345gt1i5vtsll0v86qhp1no69ytfh7hxlnw9vsdw6x2quzfwd1is6pejany1jmqs0u4y9gefevc9iwphhyo5bhhu8ouxwuu27u94lewgl4493dxwqk1ktpa8cmx2mqs44p7uipw9a4xhu0ciwh1ouzeorxzeclthhp4sk5xuf7wggh3dg086bx2tjckwide8tr661xcsn06vbbigeif0p1xf5igj1d3namak81jjh8mlatb507triep6nyw024nxb0e6osa5ivj2c6zu0t1fcik2coucqhmtv5ta87kvqtjov1y6v93d4cifx8rmwf0pgkfmji17peh74jlon8ilaoh0zmc65wc1zj0cxanvba8eow6mjfc2fhhmdgp5x50v864boj1ctb3txa7zj6yr920nfhiuazi74iphjovgm692p87p3krw9do7ex30ao73xlaeynd17oz7mbj57vhx0ih84fdiosw75apc6n9edj3zozzmyei4zc4vuc0fbhcjkkdq8irhvedgnki2dxwrulaaekq3wo9ppyp18evli4e2gusaohac20ynuk6436m8587s5fhxny7avw8q2j3w7chevksjvjznw8km1peq385eax5hqji4u2mil9htyrneobn20j7531onql6ybivhyyoy80za9ycg7f587repmf8opwiuyluzfoi05fm2eqpym3t1lisva9uji13jiqet47kc0rpx9eofl2y5edu98bspdebye4gt7ryz72fuv4vodap9nxz8kubg8psvr3r3eulq357m13wdeugk5xtf3w2h7n1i3b1hq11oezhr87tl7a8pi1w88tfegfpqempfyc6vv6nk8ampw5z2bzziuglft',
                sort: 435060,
                administrativeAreaLevel1: 'b2uvajv1ltgj1zv25bi2rneij8wph4mfze5lgnm9zugyvhwyfm',
                administrativeAreaLevel2: 'abqy8eixva9q3sgh0r0xu1arg7yzo4p0bvc6xqu7zafbxbzmas',
                administrativeAreaLevel3: '8zsf2d7ee0tmk658u7fxxtzym8bqj0cohxmkn7zkh5hrmufxia',
                administrativeAreas: { "foo" : "bar" },
                latitude: 242.66,
                longitude: 669.13,
                zoom: 87,
                dataLang: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3a88b01e-3c8c-4a48-8bb8-782c4fecf035'));
    });

    test(`/REST:DELETE admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/e36d8860-dd72-4cf5-bcc8-b83c4456ef88')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/3a88b01e-3c8c-4a48-8bb8-782c4fecf035')
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
                        id: '43179846-a8d0-4cf7-8f74-c4927b468bc2',
                        commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                        iso3166Alpha2: 'ry',
                        iso3166Alpha3: 'y1r',
                        iso3166Numeric: 'dy7',
                        customCode: 'ilwx2uwjlx',
                        prefix: '64bzw',
                        name: 'cr3w0c9ked0m4hjarkvbndoudo9bl11dfm4iqy5r96znlsi54py72e3ykhzbll1o2kyl2kz3akhgc0rya2z6l0b342r3ra2vhz8b3gpp5yuvkvw4co4zuis6w3eetzotmj29wwku0mstj55rr84p5u0m85bya93djs9ujhha7j2uxhw1yh104aj45i8vpih5wuy2g6temlva4o6bba0tmh21d52yhxe3o31tev5hopb8pou7txsodof4bdol798',
                        slug: '7isnm68xeo3p1hiw807addpj2cc4zl5gyd9dp5bbg8rs9uanrqkhq6iq3wiwh67f3j6ox847mihl0nk3oinfr2u02tzfffo2qyvvc44z22ng2kq2thom420w4y5epk2cek3ehrqwhl6am34s0gnn72dj24cfz8v6htf6jtrlmialaq9xg3wrbmmn25gq1ovwz87w9w5ww6sr62m3q3i0a9n79n45vpq0ihacgm9th135eae1nu9nkgvo6lc60pxb9kho3gpy9snxh6xa9zympc692z84rvrurovak3zaponvoupqzmy8knc2pbb186ogx3ipmhtt6wmsqai1qgfthw5m436cy9wy0wencz6c0gbshu2a6a90b8uacegq10gqxv8ysa10d5003n6pkhqwnoee0s3osi6mxgdx0ikojjf6q3a6nt08kl25u9krq5hvfeqmfemg9z6zyyaw64dq2j6kei8guurcb1vhwo7ktn33ni110h6q7312lu9bkzb5johjiktmna6juwex12gkkbs30d99mzgg6rhu3ty2lqcc9zakgx4ietcwxwgad8a3kmvqv82uxinvqzf5h828kr4l0mh5f5swmvspeauu8w42enp82vkvu4k4g0kvtujdtw9cl3o9y7124yhar309we0fnafqs3ffwc5mxy7yga6hgkoyoeqd9c0p1bsz3u1x2y6a5coxmrq7ectdqfc20vob5eo2p8cdhrb5i0ofmhgent9nala5n2r2q26nmctsxgz0gvsqaeqxqgq64wue68auih7hd4p9zmuzh0qerpc4thrxgfox6f51nst12r8nnbksih1eu23v1ybe4zqmlcy72eisl43pn8owrehqji66n0i659rj4kggcdmjmcy111lirne79w9bl1co6fh3cuuxw73rln3qoejwzapa27xa5qm1agkh6cu1wp8u8bghymjvubarq7urqzejt2hl2la849tyzkzr10wdsyo9wxcza3wa8qfk3eu0qi9l6w18',
                        image: 'lw4fk86rf9kgd2z6eardz3te6zfhds48raki513zvp8w6kbdysl4bvtnc1h726mvvpdxn4ustdrtmknxgjbpuvn3b2iltj3oxnnplc2yemh39bvh0r7ebo41b8407m98iauepdr69t9cm6vqaa29nxu776uu1ovfcwljn8q9unczrt52ucp1fdrpmp1abwiaqp4p95kpm4dj4prx0sqc6eqo206oufvj4678viiqnz5hif2685xnq0f5k4wpb4bcifa1yrh8hpf810ekg6hjrh46nq0grke2ww5dcbjj4vki6rxg5rnqmd33m08tr6h3qnhrf4mwb28kevq9fyim75mos31adeh9arijqdw2b693xrypwcqruynm56oneerqzq8hgwkhhe75g3sh90czidr7a3wh2fltshogneb98l3grintj3byw8ksrqenqb860jh8s2ekzt1xerzdfo87z7rxnby604wn2s5fv83chmrn1usxpwrrzt5g8qeuxd9syzq70sjy93p6kzwulbvuhzagq53isw64pxuhpxmyileasiuc29p3h2p61363z1xnczpuev853x6p9d8ux7hcfu3pud182xc3hsx2plccvjfbrxx3nl746emt8iwyjnisyvgyjhb8j4r9jedfd51jgi7cwhw8li3rwwdg7yh1xws09yaystx4nyg3p5yndu4hlhwxge5zfwcfz55gqss31hva5tgl6rzqxbzvqaaf82l9v5yke45dbjt1575i6zaghwcmhiea1ex2k1cmpk0z8n8zxk52kgd9wntvwyyge9nd6y9mrj8d9xyuf8tcg9rw9gae7rbuz3mkjvp1s0dom0mfy1v7b8z55yqjlufhlwyqkacttofybfg2iiuc9hu3zr3y2cgk60a366vmgflc7mw0yp0on7k1acf90e0q2htd8nk0o1enj6lyw7aav3lg1n96s0oyir5lwn60ms4z21umydupzoo03vwbia9vjs9nqx82rz6kf32dz6hdcxci',
                        sort: 171741,
                        administrativeAreaLevel1: 'p77uaqgttzpg1u8939z22uwmmsn7p48zp17j7zcxyrua6bfhr3',
                        administrativeAreaLevel2: 'hgx8ulz5vpqxnb6wjx595f82il1jxnmy3qundkh6fa765tw6rw',
                        administrativeAreaLevel3: '5unzdnuvvrxupl3feo1azqbnlmjrrxcxqa0wml03qr4kylornw',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 229.29,
                        longitude: 704.85,
                        zoom: 65,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateCountry).toHaveProperty('id', '43179846-a8d0-4cf7-8f74-c4927b468bc2');
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
                            id: '03528dd6-a069-4b1a-b1cb-7bb3c800b51d'
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
                            id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountry.id).toStrictEqual('3a88b01e-3c8c-4a48-8bb8-782c4fecf035');
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
                    id: '30c10468-d746-4624-babb-31bf1e724d1c'
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
                    id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountryById.id).toStrictEqual('3a88b01e-3c8c-4a48-8bb8-782c4fecf035');
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
                        id: 'a28b05f4-b358-4600-9e19-b83029afbc98',
                        commonId: '9451909a-ecf4-4908-b61d-a111af70c27d',
                        langId: '5474e92d-dc66-4cb6-9c46-1097c11b0054',
                        iso3166Alpha2: 'ez',
                        iso3166Alpha3: '9jg',
                        iso3166Numeric: 'i8e',
                        customCode: 'lr6kjlt9nh',
                        prefix: 'haqc2',
                        name: 'uulcmwbaoc05duwr5ne865d1ps1h48g3w4kbn89z0e9c7u72aiyrowwmijtiv71084s0lkqamjct1u5ms7b8lz90d5yttld8x9du33xosp8rjiamk9a6edaew3mwcnlqhcproou2t43o3uszxhjsf3z4d7bp03jtkdogzhserurspk555uskba44qv9vm8qdvcvmtxl83nbee0auehcind1o7fxlw0fed0rre5ff9u6ntr58ggjiiuy0qqx83qj',
                        slug: '78frb1i2e58o8mjl5ztbns1g7uiw6f3aiua8alojkm8nzw9v86hr4qv2qrbzdxokt6jx566axgyel6snc6rhugbsgywi8e2rdbvdcmrve0ohv45l1trnbc85p1lnmzayps4jivgz4oexlruga5gkmqz85iwugyljx64b4ibbcj39p1q3enmy5wyjukz4z7f3coun5u98gr3hrusly2zrl1o9u5ne2h6f7z2qtfaehwzt7xcza9k8vzs4oqtb83uwn2jq4fv3vj8cvfgd99wwiodoi9r6739q6nmuunbb297zbvp5wwep1q76myvaiv6wk2pxta8m98606q3awfhlzayojsiajuz7hmcfpmj4kl57s63dgyvhhlv0ig4b8hrsl08tmtz0sq0saw2jirurdto0yc26xcrc6i1ax4qgt8itsrkj384xxnd9e14mxj1jixdiapr45ocitjyom52j5wq3ot3bjemjgobomi5mbieejwy33j6v170ojv063kfy04zk3st7rhhhe97sol4hxfilhfcbqx5s6af0xzcvb99h6d3s4zapo8afha9gevugdk9g3763zw6scflhxuhucxk4rq9ks4uekz18anhuqw2peeqvb6p4sz2zi97cyyvo78d11s5sy3amlb6em31gtao1w2d7zh81l8vsgttyh73e1axtnsmy7vbhwzav570q4l47b75h1vrc5e82icbb5j4fydnfh7jrdrggt48lb3m5ve7e3pmf7ij7m75wajqho5pmuj7g1im111ve3qbcz8rr6xwwdwddqmbogod0k3damnsqho38dzrfg56ufq31luu86h4waprmh4u3p9zokefnrf9dane8bg93cuu7zliqigdnw1larb1rewfm57ylzr1kmahesx4i4lhm1ob93klqhhx7z14ple48p4vw7wwzysrc2b9m539e8ztqaekoz748o7iztf3r82u1mkiwwipm60a8mhmypdzd68t04omlsufkc5nu9g89sgx3wn2s',
                        image: 'tvf7v1ggvva9d26myyokz1pk9rxc3kwqybyp8ejc9puruxkxkurq25n58vqu5pr6zvscqgxc1nr8h890p3534ti9u2s5syo29kz10tnhfdlhs5q5emq1ztj9ub7hogfmywcbysu4uf7a6scd13dkm5sjoo9fb6wtcg8f9hmba2106rs9l9ma8whe48uf4qmzuk550rodsu0oxqun7xskx8j2ulu35722s2hz40m8jett57cb8vczaaxdb493sz2l6ozko02sysnx4xk0r7t4epxxk8ka4ls9vpv3ryqkbwd4a1vs6i7uw6o9c1rieqweekslgtxxayb2gy7p97adnziz52ae2mhytd3n1jil84ugvs831nlkkztyvnclzjlas9zweu2ek81tdcev57he06r99tqrp03friykxrxwuf3t2g0pdlyvxr51gz58lits2w1wumdklsspy9kwwakxap36m76qtnj5o9n6yg8sykk43w3n0i33aa8j9f8ug4s6trkh1ddg9j7bjla6ozrd8y4cowomr0krgv7ccapsp6lwcn3uji6gcdtd0v89kao9o8ln39hjb1ni82ssfl38qf4nhaqudydmjklv0jtowtcu9q7wwvrqg46fczagamqtmmqer7dr8paw6lbu3x6219ys4vxyxw29y6keq1v2zsww1awex2ajx9ckum09bzyt7bjwc1ub5mgjt080vtrtethxex3hs2qo2zq22ehr4uprfjhi0507spt54j5qlg5sa5lcweiuomskkim5xjy62ht1t1a2wf26523zuxcuqe1kysqq65o4gno3pv0eobe7lbz7354skv6xhomavdvt7yf17ywitqlp3yl258y7ogbbdkxp7qydxn2lewdnue37k4vjlmfdzmekvxkq7ysjqzcbauf46sos1h9yw0ch66oa5uchf5fq35mcv6zhdpkgkowafr99j7k8godd6fxlwxsn3hkcnm0t9w1b4fy6f5dubazf4byym6wgtk1g53a9',
                        sort: 144659,
                        administrativeAreaLevel1: 'mzbnqec6g29iiuy8h9s2ndqhjpmo5lcyjczzzeinh70qb0dd3m',
                        administrativeAreaLevel2: '29r9vlb1av5c57bav3s7xuiyq88mpnfl1ssn5xtox2hu56u9cm',
                        administrativeAreaLevel3: '199i0ic9c5lxiwkh1rbg0a9j62pvyh87m2qagablteeutzwqsm',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 937.89,
                        longitude: 252.11,
                        zoom: 92,
                        dataLang: { "foo" : "bar" },
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
                        id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035',
                        commonId: 'd6f54be8-c234-42c9-9f7d-fb0294ed141f',
                        langId: '75629613-9276-4e9c-9a14-b419194716a9',
                        iso3166Alpha2: '8c',
                        iso3166Alpha3: 't0j',
                        iso3166Numeric: 'bca',
                        customCode: 'vllnf1sfwn',
                        prefix: 'h8e0r',
                        name: '6cea8781wn579bo8114625m4pdk2zj0ach0taz5da5dnwsx229lm9dyrh7fdcs8rv5kfbczfokjj6nixt62hqjbp7rpalt0k5qk3o3h1zyalax3brczysdwzuuemroq5e5zyslbmmljrliy30wcjp1uuh6bc689nxurdvl94hdwxujxxj70t7m84k8okjasfp364x0o21um7ihowbzguphmx55zanmawhdcf6w1f9qko1dw1t7bd7yf0k280c44',
                        slug: 'top6r5fnlzj0q0kyp6ag9txm0e9hb7dbysql89sjpgf1w8jqdhuq2x9trkk9ehrps9fh6jsb0ow5keb55o7gouq23ni7hn6fqbzutv7sbfm94lm38ssrj7bgor6e9r9fz9t0v58j7lmlvsg35kgmu8ocr2wi1lxzszlcg3dluvbnq5oueldy0nlslt9dffu9byc4tnlj9yayhtmfsdrau93n6utef8qss8wxbwyqchn95a1lu6giozzeo4sqjf9ir20emkww7s2rfbfwea3j37ona1befw0wq0qhgeao2z4bxebcjywb4hi185pr3l5mq5wbzv5sjj0qsr5jg9hni8co6web4upcqo11udvdn9ee51jbnjlri5cmzpwhmr3jzl7c6pskzprh3k9lw78q7u1pqkdr638va4kyziofq9sjy4o2y0s48dg5t7p0pokul3sx1qqeidz25uee42uw095s6rwmbjfdexzg28nogdnkgpfjmbi1uyd46zisz1nqc7nggjbeb34t7696j2ed5pavl2e7xeobuo41b1z7b7jkq98ay2btn8o03q5h9apt65fevt3yw8r2fzxmw6lh7ql0c46zdezrovzlc5qlomwkjhxemjfe7mpypk80xfben02v0nus0125klfon4kyqkscj59jdag11iutn16ad80bez52kwhq77v8a0hdr8npxjx0ttl3186rrm25hfvg3aqaxsp0yzuo7jsahcxjr2o0i4fd6md2gv7ovxfk6r2py02drjbnkjutzgve0byweofrzmtwpwlsu3s1rw78kkucvosjklz8nuq9yf509qug2xeecn3zm9wi9nbmqadu98vp94ve4nlxp3b1rg6by2ijlgbu5w78ulf01k8rgmjanj91nm3p4xm6bkif05w1hzy5rtfb9ltqj279k9xqmu2yqu0f34fe960imlxnwucaf2pnjj9j8vtm4kltx5w90odkvhcwjyw6ycgb355kp5do90n3d2xtsrrihlqks81y',
                        image: 'oaafbpt29h8uj901954y30l3ac4hludcna4zcf52hlzj3nnowjdtndxns5f8n6n32uwirt55xoz55ems5737ksoreogtfgpg0h0f5padyls5qxwocm6nrazgmvr18mqhl7bbm2lghgzvaqs4s3gicrzvs4bz96xn1lw07puxcrziveynj7xy70zlyne5bpd7y56eeffh3p310dn383p40qfuqraf5gfnjvbnkek0d83gnsysedg0gonyefln65jd3v1g4src46lrssvus9tizqmmzar5fk0huufogebkjgcf3m26zq0zyv83pjhfu76fp0wq7xqzq3s5ltlcavwrhgz5v8mhv6uxgbwkbhf8jfn0lf927yg9ep7ncztph237fyc4ekm9wjfgwpri5qm1airfdimyhvhjzattehpa4vij1dw9969lvi3itwszodubyypk0dse2j65q9yu641hslvhbl1flfoq2zzcrbrrdkz3lundevehtmociq6egg8oftmok19koggyv51hppjlc3n1glgba97koa10xvjluch47rt7azg0qmcsdwb2psrvi7p8sitnvogem8lxub1umq8lzrxdpkc1jichxcl3w6hswx3th7en5ehsir805jttb4wxjj7r189aiwu5wbfxqwdnnlizbm8khv7ate8ms8nt2m5x3w3qnmpops3d5coqruud8yxi9m81m5jy93odi7b43l7a3lmllaogytks9et07d4zms25g16jyhoox323cyu4ibvjtbnk24glppn3320i7nlz4rroz3g2o443fa9m1ur4d7n0ma1wz4pb5fjzji0qj6n0t7zs04bzvja64wto63ftfdu01ag26rs4vgqp9ih7vbz1qfyn8u0pmvqgohoshgy8lbplw7m7ohf7w1vdzyyshn3aufouy0trjqwvr2ap5crb7vrcpfkdr7640vqxr9bnj1btwoz2dfbdxhmuclay4wfu5qcqyvel3yxt0rnpok1wvvkw4zt7br0j',
                        sort: 944442,
                        administrativeAreaLevel1: 'avmancci0xqdj0r24mz2wyralr4hys8dqgl7287ucnpmlz8wu4',
                        administrativeAreaLevel2: 'w3vknnjmg6uzgf0g482aotncs14gt6z7lmyxvrys2hqyuobpd5',
                        administrativeAreaLevel3: 'qj58ip8b028x48cayi7ioo85nei38e4j5s98a2hrwukw1yxh11',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 313.27,
                        longitude: 534.29,
                        zoom: 99,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateCountry.id).toStrictEqual('3a88b01e-3c8c-4a48-8bb8-782c4fecf035');
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
                    id: '0f8b86ea-bba1-4a20-9891-8d3d23fae56f'
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
                    id: '3a88b01e-3c8c-4a48-8bb8-782c4fecf035'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteCountryById.id).toStrictEqual('3a88b01e-3c8c-4a48-8bb8-782c4fecf035');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});