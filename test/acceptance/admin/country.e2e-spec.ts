import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '@hades/admin/country/domain/country.repository';
import { MockCountrySeeder } from '@hades/admin/country/infrastructure/mock/mock-country.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('country', () =>
{
    let app: INestApplication;
    let repository: ICountryRepository;
    let seeder: MockCountrySeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
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
                    MockCountrySeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<ICountryRepository>(ICountryRepository);
        seeder      = module.get<MockCountrySeeder>(MockCountrySeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                iso3166Alpha2: '4u',
                iso3166Alpha3: '4ba',
                iso3166Numeric: 'hzt',
                customCode: 'l4k89k5q1n',
                prefix: 'uenog',
                name: '143sxe7kzjib7yn2un1osidc146cy5y0wu2lrvy40fx586yv88tf5hzj2qfgklaq0bg76dmii3l97wtsqluelb08m4q39ushmru58q8oe7io3vjod472wlrwco9u5qp0r72oj5zmnarjs4smc4g42qub2dgfsf2v11csjp51h9kz705db1xhh4u4ncl4qgwf3bnvbwpcksnm1j1cjxsvnzrnz8rnz1gpze8nhvqhqn6nw75iaa1a5rjcr4tmpf2',
                slug: 'c2uivr9enp5g9cp81akgzvqg4u7y79exwl795rnl5ncnb4fc8fkspgrgybg669yy78j95vg6xayx1ppqpkym45ufnu5gtwc2v4vn7rwfoko425k5im5oc5wn7s8y3tx8j23jz78jv2t1kq381v2nx5di6t29wm5jsbyirhviwwclimy4mqmb14cwdyq2xy1yw67pop3fqph7k9g91do3rhxg1gqgo0uuyyexdpdnmnqvepjftem9r022wuuzjtr7ey3zhtcwwmw19k4wrsumqgutd72ylygi2j6xmh29mwfk0vvkxv3g8a87nn49s2gaq77ntcvdrdhwibtfekhn7ecl8w0d9atgafb9twfce2chifa42jpydo6bf4vhm0ixrk4lrmmyeo4q6hgvsay6w4dgecflmb9n2l4t3pnnc8c2ne5zlisej5ilcc96pr893p4wdges2u3dyo7v80ifiatvecd9djk2ohfobdedtz4x9pzgkvmgqjn7t9300pfhjgponu2e9cw4rikbwwpkua4v3t8s7glhcgc9qx14eemhy2g83fdqur215uxr9ju1cu86w89cs9hoz88dk51y0kelf4vgsqylf4pn28rgko9cqku2t15uk3nrhbz72na2ex8jcj3a3p22gcqfo3ulu1j95opaf62c54xd86vo7yv32e8gf71drzywdwxvpuiqsli8prlutrhlnah6oyby2k8f3z4a1sl866xjj3yxm6szwsic1mzjpd3dgfwcy937ft1stfv2ic0wnwhvvwpibprvp0rhr5nle89sg1w99llkurja4637lwjd2lvdakfcyvlnjnplfmvt6psbyh5g5ut4haarbbd47cgy716nzrnnvkajv8wykv8wvwf6upjqrn2v92grxbaq75giuen6g5aedouwg48tk4mm23qs71qozmtq03mtoe62xxr08cdymgrm460t1ywdf48j9om02jg43nv13n0e7aunujjhhvbgcxu6vxqp0mgg1kpoozyy',
                image: '062c0mouf5p3vjm6z1l1m91zuurp8cmtp883yqcj8ulltm2ohx4oos5hmu7vkbgap2kalyu8v9dn8k4fpk5j116x1aem4vc9ednpyb5nvh82n8v023kyqp8wvxwf8o55nmmbk7ypqkdcjidrp1n8n79ay32lzn1recoww47noevtqik0r7qwe535wqa8ez9xapzlldl671mhthbrnm7y0gu6jqe9yhpfyab68e5tvfu5mco24tzt5wxpxtgq11mp5qxuwsic5xx1638yz57tzs9ovmrrcokl98jzwzpaf2ztf0e4uy4j5foa6wrl6t60lnnwwubv7bbuv98bphihccuyestn3ge8axbz4rohp5ivccna4hb0mowwafk0ih2tdyq3bmg6cn0gdjnjjoc9el6r6btojojuojbzvk017xnn3c06fns8hgvp8iezynvqyhrrsrogcyp1j9eu0em4v5huf6crzcdvxtov39xsbeojhse3zirxr0409b0svryp9w15ilu6l0lbmq3te3ufdeev55odvec10cy6e3zmw9xmbk7wnlpvfzx8z4dcmx70vc79mwqb4l6wnh58lth7ckfl4hluewb2wu142hhozely345qkl7y6r9ocg83zuj6hwkqkhn3s65fkfg5hfob0emb3y4k5wvdves8ke7ldamykko8a8nlyks7v2i9vpa1ltux4g3xy22g92d6q2iz6rvyirol8kqjm59au56vfltftopv1d8e2waxr72jb9oc1y0p5vezyekkhdjhx3nfdkz8d098k2615l0843874trki9h07e1r9tq23paotftkeupn6r724jmi03ba0tjk9uvz78gqsx97qbec1x4lfp40x8bra05gr38x2nbiml83ag73lev1nmkxc5chucorckr5rn5pywv970kkfv1l44bttninvm8ddpborfngr0gdi0t2o8xgrauigzvpsnga5a4v3yhxxme39w4dody4udfjet4pqt6jkyf07oa4tk4y',
                sort: 365241,
                administrativeAreaLevel1: 'vpqs5vs1sia82kjhybb0zwv5eok43rlm30qmpcgnvlaxmx3nlz',
                administrativeAreaLevel2: 'wviz1ivjfnkl4u1vu51kqg3z1axt6r5tiawrp5h4fze4sopur2',
                administrativeAreaLevel3: '5nwczodx14q52gcq1kq0iir7aktl9i6k10f8e9nh03mu58sdw4',
                administrativeAreas: {"foo":":=f'BzV$Ji","bar":"G(kSX^:E,c","bike":24646,"a":67901,"b":"ab;aB7#7M\"","name":"gTK4KKY\\\\S","prop":79182},
                latitude: 19373202830438280,
                longitude: 17258908084892748,
                zoom: 91,
                dataLang: {"foo":32717,"bar":"K#$ly^n.9M","bike":"PY-jLOm1GE","a":25061,"b":"|6!AN.n@d/","name":12978,"prop":13794},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd2ec88f7-c192-47ea-b5b4-2d21ad2bebcf',
                iso3166Alpha2: null,
                iso3166Alpha3: 'ptq',
                iso3166Numeric: 'qfu',
                customCode: 'ioeteou3gx',
                prefix: 'bba78',
                name: '56xuh687v7o6vbxzenabi7yagrib8rnmupf43ro20ftwio8g1fn16qi93ua72w33rhe9u2qp21140n98k0cb1vdd1fjb482jr1v1ohrlg279gmzdb7kdluledisb4iqb48gkq3wkvxcznxhqx1wl37h8sj44aj5b0zzpzxfnl7b2pcws2sfx0otof1ji4od00i01noiyxq4vys5i2j77ihgatibf6quvdcu017cktevcp76pundwbbjdvkpdtey',
                slug: 'p5ud0qyt3qpe4gumzpfqjfisfluj3x0uodwuj9j2dcqg0trfcc3cfxxtfjykr8uhi137zw4wq9j3bafe2djvxnmovjj7e6kugqcbxo5ri1bwugb3sd4cs80w85f4y8netxyw675nnqttpd87zin4i5v8nfzmr6ozzzihr3seh9jz5791b7b2r32c0oaaioyuv9s4vusek9jhwtdm5epvaujk2a3wyrct2nf8ml8nbllbkuulpryo51njohhxaeb3h5w09ub2k30haj13ket90emcdonbojbzv4ovszh6kxsdiofcgusbniec78ht29ooosjjqnlhf7s0yvvzbzc4mqe4fzjiyzb9tuk30xcfznqzem2abxk3xpb780ubdp6pj1psz7s6quv8w9wkmm8tpq20mhgtxy77xrhecd9xf4200rzqw2txodyqcwbmbg79beak4zfr2ubj9wlg7p3kcrmh89qesxbznjczsh6p2l6ze5xaiwxdounlfey3kzu9cz0pmf1umqj81n5u24jn12g5poxfzq3eo0t69qaq4tya1aowlj93u4bkfhfqn5e2hlvwz2th12doa69nzfphm8r9fvgqpklh0jfsd91ah8re5cnu15gqts5fmq1dpywo6nhid9ro0oo1uyqmbrd0xm1ma2jpwm99drb4d2bo40ahupr2ys10e645z4p8bwwinilc2m84kkx8wxf6q78rd133h26noybfez9elh18eyt5govsm69eqozxmyzoo1dsznnu4pjktrfsqtb6q3nqtdlk2xu2ten17fq9c5g5qgkl66kerxjufgi2zcdije7k3fv74rxwtrln960chj25b75grdl4yqkefcje2mtx9gq1wis4n4dyclqupfmug8h42ah58z5daddjv9bs9nu2l4arsibepjd7llnoh627lq0zp584zas1nf29y651qf2o0lf4xy435k5nvrkyvptuvm8w9ba2xy0ny8pj2d54yp54veiuo50jpgsuuh817wge',
                image: '9cx5f56s6m3cwlap581dhw9vqk9r08vdu4reydbkyia6qsp6u94iduvkb1jzgup0mpsneebvpdspe7mkzu9z336rv875kter438tpx0jcqzx55s7ihu98l19ccs1kw4250o61b16p38yu50chrk0afrdq8dt0cbosr9fhajfcxonnt8sc96s6bax72hmq5bbmpjhd6vhwgnjxcqxp1d25sse6sm0b0c9e73w5p7z69s5pbj3fia5icy292sks8c9enb3xq2331yj4s8hvkp4t5tkylwsm94x0z8vcm63t7uj06eohs42rpl0rsp1aw98ziq69b7xdjls2c652o6zf3ljanfq6fog1roerqw69ssd039vfjec3wwcwplutus40uo3m37qbrshwsbbkw6jcghnau41fvvzyp0xyntn82p7d2rct1kg73sl2ymisiy7tapz90u0ornsh41irufkwj9msjzzp2j8j259pq2bsc9zoapdqocbwv6eychnkv8z8jjc52dw3xiu3l6lxczfve79omfxp4xoqtkgpqzgf99v7pdhyoxoakbbpd5d2m930m2bw68se8v7mrh38lze44lcczlijng7ny21rj0zu37yyq1cc0te9exffu3wiwgrg2egepm37l3v5rupgnbhv716qa4b6hye91kxapqjcphbd3xa4jt5kb8jx793y5geascpb68blo662nonm7b9pq9mboa4fazfbbisu7adibjqj07hwdonp9egeayjbguqaseyhbe9zqzsnm9qhh79qku0t178gp0jwqabitmcv71s6xhi7p38paw5no1y1u2eg5b05ihwtthgsm43e8h117vst70avs0sqj9qgogscn4uqjklbxp0j4mq0e37ifklidop21lc7g8e5vy46rtax2vuq25e4ljebb93adc0x7wmtb8d7ozrqkog3mt53cpzqc0692sr2z890r2kifkdqa33c8gsddkfyssrmt5927bf7wl9bpxbt04bkfvpzsfv',
                sort: 778919,
                administrativeAreaLevel1: 'n0j6aeyenksulfedag8nt03czv1cdtjlrrb2xuamfesfovipym',
                administrativeAreaLevel2: '2o6rcii7b11t9cxppktdlujo1kwb85x6x9j3jj6lmfs3btwnfc',
                administrativeAreaLevel3: 'awdgp90wv96czoltm8il56m9uaauz4h3b5arxcdsp6k2x6bt11',
                administrativeAreas: {"foo":"/l0P)<i0Ww","bar":"wpqf8M^GI4","bike":"!S;:I8{Ex]","a":2659,"b":39097,"name":"!JDoYj?|6g","prop":34770},
                latitude: 97758443764337140,
                longitude: 32538124608717550,
                zoom: 93,
                dataLang: {"foo":"X-9A[lW2D4","bar":"l?jx*)]!e0","bike":34326,"a":"n{%F8Ob(ep","b":"/H?,!At(nP","name":42876,"prop":"OC(bD(pVvO"},
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
                id: '2275a181-403e-45e1-9d68-af01b1ee1035',
                iso3166Alpha2: 'jr',
                iso3166Alpha3: null,
                iso3166Numeric: '4zi',
                customCode: '17j7t13941',
                prefix: '89aly',
                name: 'b7cj67bkh7fhdabg1e1z5kn9xk0rhw7wv5g4ihzj87kwjwecaf214s1jcpxs0cfyc3jud4d6egsk7ifzf6fmbrrmn9oy5ool519xltycku47rhi17u80ps3q5kwk0rlcdsxv539zaflw8oapuvg1gpavbv6zbv9vsy4zkh0o0xpd0v651zsz26mj0bk8eqts3kz319hs5r5kgouamx8emo2omb35nkbn5ugo64ii3kxgo8465zp4cyes3gkc1gz',
                slug: 'o10lam6svti06l3q3fxw6ffw7tfimcfzysrheyfb9a4msokb6um9jva2vfraf21tixrsi9uml8rpikaymccl0o9c9a8ncv146ja4kaqtihbps2ul8n188qlxppsm4jqrlzr5ve1xobfqd3z5td8i1n54cblb980l58p3qpnmpos0dhivqzy14ia9x5unm7tzuy1f3iwh8rrwcttqdrpdohtg9r36dblt7clhi8xge8arv222f4mapw6x1s375qta4e60046ujg7ivzkyyr8s6kjudkgrgz7v1n9gu95vnjip6hnw2400qcid5pgfil0lt933592po96b2b2xm3guvvqazusgh2sqh0541j850wu3xbg1w2evc8s6q2qirmwkgbop7o34tz0a0v07bmwv0qr8knr808conn2kjrb5uw6xt45ic3di59pt6f74khqwcmp8mkq2bvwgcua8c2vlrrcx4htbankot5h29u0icb975crbjhwbt22ftbjz130ls5rt4zey8642rm3sh9c7dj9t540v0gp19vpnslgp7x2uez7a0sdrz163wgshmnsv1hsvs3gow20kjo5igx5pu8pq6xezpngubcvu1bfa86fvk9va5eb1chzcokepfouu80y9jmqmk1ctsnt0mzzfe1e8o2fwfmadqx44vjqlcl2k04rs6gwj2wjlwbhju5e6c7409uls64kpwerdq46kbt9pi7kzn2e5c8ijqz7z77gdpikg25c1c3m4ml7fclcqv9imah13qlb4jzsbguoidiii4nrzkdi73da26xo8oj4i3xobrz2bkpb50ebymvph5a2302m6533sy8mmf0fkm3okl58efr3coc1pfg7clznplg37ge37s4jzqe14ag3mex1cww557sl2ffa3r9joo6pgge42xcc0hw0zebiagrzzm29js544a7tespdo4wgoe5itt7qdgzoxtzl94uh7zai5vrza3b85ut5hnfcer0ufy7oz7f9cy99xuc69l0zr',
                image: 'sde91qcs8ufs7nhxw5j8xxu8oqc6u5fnod4vwd4ftcwcj2l52up6lhg9sxgoy9xfi3b30bi4q86cxerghk391vpi85px1263gokfqvid3ys3m4uym5k28yoisox09v6cu6xy3kaapj0rstioyddhqip5i9vft8i0ygoyriz10wm3da1xic0i6u34dibi9uo6d1fpuv9lt3hariawyki2wd6uas0dz01iik1w1fowilrb66n2m3xg3ou4al29ulw8routa247c92ala96nzt1i5l1vuh2w6hp8btkkcljom8b7o7atb0oj4tk3n9ehtr2c86mr8fsp69w7eu44xt70kvn0qu1ql78t2jzmunkyx1apeoedzlmtw0utz2a4kv1nxxx9mkfr2z6z6vqg0033724h5uw9n94irjbbxrpwzdwo16dzwahif8oo67dk665rid7k0hkz8f2xd8hq1cjefvom7qwp11zn2u4s9iylpvitllqr2rrwccetniqhv4a9fh5atwppblxj7p4mlcaw5xwrwsj3szo0im35kqqclaw2wr2ytpiiuhjy1kql84va35tyusaxzv8k49mszm860blw9w9swrng24tlvdggd1w4nkpi1ckx19wvmcd4piyqy6uhmislb5b06uyhwcpkihp2z59cv1ru9xon7v5cerd0c2yrfn2hxrw1wng10756qpikgrvi67ckz0k38fasaiuxox9w8yg6dt18x1n1sj7l7zcd2tog0a72l1jd3iz2rocob0h2c3zjnsockwtsrkjexsvu2xqpok26k75smwpflno61xwwmapa1atswqipm1w2uqj3gqsrpk1dayauqnw9dxiq7lmjc8c8je9qpnmwp6gaj5rvkwtsnhtb67wveugitm3bd3eh72qterezldge5ehgnxkmsraydftmmqqa5ylljn86f9zdr3n4dvpc7dclrqcgg3jax4uceh195zpo9zrom2uozpmbpty7a2ukj3enw8oumae0r3v1wgk',
                sort: 475649,
                administrativeAreaLevel1: 'dxul3fj18unflad0g2az3le5tv9cve6e8woike4a054vpyyhmu',
                administrativeAreaLevel2: '5lf1hlpz2drq9m2x6u760o4bxkn4vr2crra2wozzckjx6jurjt',
                administrativeAreaLevel3: '2l0j7iv4ptee8h7hcbi6lm2xtbu7l8vse03d0pfrwwlpwud3js',
                administrativeAreas: {"foo":72613,"bar":"}ohg<F7wtB","bike":"^g4py14n!'","a":"*:aI0-$o\\s","b":99072,"name":96359,"prop":48790},
                latitude: 87024098617374940,
                longitude: 73294344849993950,
                zoom: 65,
                dataLang: {"foo":93454,"bar":30600,"bike":"Ud<tsG>\\N*","a":79722,"b":"Xf!h!ko2GA","name":"jvK'Nw2Uxp","prop":",-J+l5',7B"},
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
                id: 'defcd7be-8be0-415f-bc4d-a3cf9dc5c283',
                iso3166Alpha2: 'qi',
                iso3166Alpha3: 'uqr',
                iso3166Numeric: null,
                customCode: '0k6o8ltqlb',
                prefix: 'c0jeq',
                name: 'a9ubmgpoef9oxea2axwruuvy45xjoaxnanay3h0nw5lg3wh88bbcgnyse4hfewwl0y4mpd8ptndzv4cn2vrhtlbgbo2jw99wgseeh8bgsejq3fd1kr9gzx5jywkv5i4bo14ycxq6fkqwfgkh343u00vn24qu43zp0b43yin44chwmvq7r3c9k1i4tm7vq3vbpp87itu45m4vfx47ngvdagn0zyue7uxzxfanmwi7k0ndeu8amvt7c9e4jcl7rhc',
                slug: 'dhkakgy1a8kfp0y1ctujqj77zmkizyqqrp5ovtpghv27zpyqow3tjufmlfw44s3iusc0cyfdmu5l0rjo9o2raz6fbwubulcx62g5zir2w64e21ouodeyo2pz8h999rb5ebzb4d772quy8iu49l8xs8v5rtduqay7g7j4wioo5zt3e2vebimoffs0ywxxkajn3idh7a86o9z3yg149etvibpe9b0ytvh8ebh7eiljiswigu6kyvcpydsfctd4w74e6934703t86ywrjfq7lma56ch3xq6v8ecbg03t5iimik4ppagg7nvc0nc28s8wsvrro00zmrcp8j71f3m6mnmz6g0d6x1vhdshp9cbixm4u5y2h6jhxf0cz481niasqip8qat31acixy28yoi65h5wn2wlv121sbmme7pao7soasih5zmpzieu4qqdvbx2fo5iwnujkynyy9ud2a2nfk57kx81uadu84azflirczvabmtifkqeypvbayr41nqgcclkzxet459j7vuuob3rrbd7eh262wi6umwe451hth6t497d0oeg25r1185zv2ju26d4duf2w0cjtcuqbetr8te5llplis0rz0lfxb2lparp6vynephhdzklxg7otcmswmlkzxe9o6vj005ke57yae0j6vn6oalb14z5uclnwbv8ypzif3r3lp92asml52oub3aytjbyr5errojjrcqkw55f63qjgrdbq8zdxzk8g887wm5ftt63k0rqed9lq9rxai69aeng08ja03xep943kozhtw3j5fifjl63t1d5k0oefw63u2vpc2cw29ge25cdox9qa7pa1oeowf9tvzqbzwpn1az1qrzoxtxh9kvcij4vfzt9b0nvpv6wjh0n4x6d6ifgmsdlbcb31v5znnyfuffid0bqh0iazlr8fli9o4333f53b3k0qj01azul1s3l50nmjnsx0ho9b86f6lmza58sp28nmbrz0hys7rd2fgi1iiitc2fpbz8bv1u9gwtge09',
                image: 'eabjeg3jeag0mpzsibrxtm6bkcv9zalvkk3k505eg0scdcclwvu8lurcvn2aj2xr6ewpvql8je4i901ia1takvxbo5pa77cr0z77vsn55ezzu873vb2qergxjoperjpbddr36swqnxgdes8vkz186yhdhpfj0j4foh2v95sjsgilu1qvr18l57mqsvx8jjos4dqu14vj7rvll16s8208py6js8hc79m4fggccj5m07akruvt8nqgdt3k7cqs470f2hy1ibp78c3a21mfhxs40fpos11ccflfvf6xgqwfbft9s12p86tjiewif4mfecnmzyuh0irlislug15vepvf9skqpbo2xratkmkusqgad5t6549gd8xjk8n2tgual3bitxp97l92oda8viidlbj9qsrfdg1huwwvodu951mm2kewp07yxih8mz34vagmrh78e3tb0311htuvuuk4qhhe7c02blccgb0dtns5iils7fhci5jzjhk2v8c8j2tn11a094f213org940xkmxknd5ewz2h2jnum64y3sr3m34dfm8kmci48xys4eouyi87gufr0e0cjvy8c77ok15kk95lu3nm5y8c092o58z6q82vgn5mw5v5vgkn0j0dw4l7jlcm0wmwb9c9b4544vmpmsutzxpybn2iggpb9y87nlj7nm2uove4z8q5oqpi72bsfkv1nl039xugclaj08jo4sybul71t6g992j109zh98pcd2xe82y50v729e15fm4ifulkth6wn5nxpxbzzrmhmimnmujdib9d60p5emjj85j16dmiix8jm4g8vckszee0p2pux1khwoosg9ve619ba0za6c56qe77jrsx96xt1kelrneiiszbyqylimlwpn3fd25hg4jx013ziojamigwmo8bc6b5u2w3wb2dukexcu768acas2jy5yd0wxvpausc7o4cg32gdpgny8bsvl52cnxnfgdu4hhjumq61373a50yvwjivgbvgrd64yv08422k14',
                sort: 609510,
                administrativeAreaLevel1: 'x9phf1l86jjqr5h41jgzxpl37u05reu108cxar9olhbwn5eem2',
                administrativeAreaLevel2: 'a97dphpy859hqhifg009k6o73fcba773guqsyshpzswlfrcih6',
                administrativeAreaLevel3: 'vjay3ie1h2qel2qcij4j9ctrf0q1qn09pzio0p28fctp05vwnl',
                administrativeAreas: {"foo":16120,"bar":21764,"bike":68522,"a":"rz'/>cekyX","b":"HaOb!1ZA`z","name":"E6Wo<|;E@&","prop":"p3gpKL}<a*"},
                latitude: 63014543482912536,
                longitude: 75956632698205630,
                zoom: 98,
                dataLang: {"foo":"obir_u;.y1","bar":"7t4!>z1v7j","bike":50032,"a":60979,"b":"`/*k^+!suD","name":28313,"prop":"a]d{pgH59s"},
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
                id: 'f5c89fe6-6201-4e74-af60-83b4d117c83b',
                iso3166Alpha2: '3u',
                iso3166Alpha3: '216',
                iso3166Numeric: 'iom',
                customCode: '26h4801sxv',
                prefix: 'j0ga8',
                name: null,
                slug: 'a5bx32zwe5g3te8ki0c2s02m115tfnklvzwvwzu3ru0zgc7ptcmjavb9tjy845saps5ztzr63s1ige8v0x03qri2iaybt3e7u5wqxm6vuhjlc5i9taie2k9r2aa3jronafkhoujwegaqcmiwn7184q2xrh65scec384vs3t0so7nltfg28j3lhj4vvz0duc20h25l2w4g48lh1a45349hfspvq31i6n0lv8kpc1cjazhktv8tnaagku4miapnwa0no6w7ehd2sw0ykopjw174t8unb6jgkk6yjphn6e8adfz28i1lz48lk96jjyn7qw4s8dqta72w0h7iys92s6a0zir54f981c6mp2upnr8fisgsffunorgbdf63ov81ybonlefxwy95exo8yprv7vzakd2tslmlwi7a5denrm8fc3x15invb3gg6y1lknymoc88a7vf4gmgcojy67phj0p35whv6ivpm4eni84q2w2wu1vjj8gd7x4lsls0gdxs2v8raae3y7nelz6ve38j5d1z9id8dng9c0549wegvmxk6yq14qhb30ov60dhytjs9kxbz6podke9484gg8eu3sgckhhfwa7xpivakn7iykjutqsa0q1kh9sm9abtov3x5dteikucern6kw9huam699el2zak3o5ip0jt25ls19e7nip45det9ntgthx458awhbw38brpbssohj4ouy3h7nppqebc2r50ekpf8ui38k3naeve5g9muu6q01n3xhxhccpimcdzenpjcxt1flqkyp6nul05z22q6xrs26zg4gw5hwpxbqmhljqb9zfg22vpj08kuix9pmjf3dqad32qvvfnow4kl5a0ulupgfnwvbil9e030zoa4wj1v3wu36lg7pq98wa0s1mb1c88aitf07ash9og6mjnrd7hrh2imqh2t2b0koutrnrqjfao2tkmp5h6ulcas59creahw1b50kcflko7pwbytlsnelwnzj06zrv3j0cj0ce1nkox7coz1z3',
                image: 'my0i1h5ltxdhrze1r4lxxnwb7uiaki3zgng53lqgwvstlerdu9g9qn7765k1uvmr0hnbsdi8vv0xj7pg9oulnxiydo2scx811wq1fd2wjof3k9rsgtjouxkcjcidosa6yp9eqlnesstcnceqixl73uadn03gc7bm6bd1nx2wwvaax4arcwy6351bcnh3s1a8ib7t90xscwv3v7n3df57cuv3n212hublo0pu2xz6qa8vd8bi5pjwmwv5qyf31f15s07ls44xqif4p6unfrzstne6wub0kxq9yl0a9xbu849jseairofhlv5sactytcpmz29hubrqd4rrcdacpscu3spavzlomswbv6rukfs55p0fiwu2fc4weeb6maoxcedqprcjvq0xznjw6upat9ag8ozh0opkiz637v10nx1fi5mgxw0zsy56fsmpmueb346n5e4f7lh6uwyqgkho1wv0zadv7ygvpm7r903injm66bpf79i2z7fsj4cknryb96a5689kdn5qb6dksqs0jsrldtby7yhmjrrk2fd3qcsce41xs1xrsbeo4s1ss65wt5jnosdhmhhjj461civw6e64e1yrgmytw2fbq7gayhwhe0cl31cvtyuxxq68pua2i3ll2fc6xwwxwbs133ntcj9fv20t4o000syeidwtnwdmpcmb9jkda7jslt493g12kgzt7yk4769fqt62j4fy73wl23ksh3nb36idsnafgfmag0ui9x5mhl33at5jwhjsce58i1brtucykx8r1i3lecce6fwn4k2td4wazsxni3le5ovd6hj9amfiyt55wajtmyce9l41blq360ik2w60q9kkhucpcilj7nb1gtsazus68i6gs2heb32hthhtcbkqvuoiliigvs0qr9bpcc9iow8rg311x8d8eo0231nrqvzx5uj5b6hkp4tmt7uxbo8xydacfl2lkhio9ophdzf44g1d2ihlijov2i06pajnkol8antby48ohsju9x9qa333vniw',
                sort: 665974,
                administrativeAreaLevel1: 'p6nu3bj0t59z48a2tp8w6v091jtmp74f2kcf5ym26tr6qb05b4',
                administrativeAreaLevel2: '1htgq2ehuuihuj3jrwb67t383vv9myrgrwp8h92rep30kbcp20',
                administrativeAreaLevel3: 'ipmlzw5l4ei6lf5csyrf9int7hf7ctad7ip17jva6dj0qt1tqi',
                administrativeAreas: {"foo":64003,"bar":"E<M6N-S/Q#","bike":78553,"a":37347,"b":"tw*}g5V#MZ","name":"?5'@QgBFcy","prop":74643},
                latitude: 23352964462855080,
                longitude: 80769240477370830,
                zoom: 17,
                dataLang: {"foo":"ks:]HCVEN|","bar":63415,"bike":"6{=).{;l^!","a":"9&Hug6Sv6z","b":"2xT.{Qg-gr","name":"pv)=[lvz&2","prop":"?{XtGz7gE+"},
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
                id: 'f12345fe-61d9-49b8-b3f7-e0c54db2729f',
                iso3166Alpha2: 'm8',
                iso3166Alpha3: 'vrj',
                iso3166Numeric: 'qb4',
                customCode: 'v3zb942yxa',
                prefix: 'qcidw',
                name: '5s6dhsj9wueytml8jmof7enf3pgmxiy05v6c8gn66ncfm1u70plgsbc0w2n82xq9kunpkp5xkr91kuj6dbnwe7h93tex6o4std1lrzfixfxqma7k3au2m47w6v8hcobs5u3elnrwlqcp3u1fh72i35y5hanw77wpaoebynesbkn7fx92ob69ny08jig7380c8nfqwqee0dp98cozh6iod0gn5x1dcpg75x8l963oisczbmxh537hpbtkphqaheq',
                slug: null,
                image: 'yp5f640fa1stolmfmrzrwfdkjrz0x78on1ygiwr5shvu1ncsqklo0ar4pc8zlrwf04a97mryeab43qg6lvcgsqvmsizcecq7q5zyhixhyd6gcu9wf9gnf7o9gp84aeu7p4veoiih2hrvrz6ozk2tnaycxg2j7nqi0mojrbqs0daqhnlgje523k897jfzwl2q3s84uyjqz8ga2eug9uxhl7y07p1ldp67emmt1uwhbu6yt6a3gvx45om679x5ahycw7k1zrrdviko9ujriv8y5dtb1nh5ca6cj8hkcdjog4ab1wxkp3nxg6n5j1c99xgzy079kx2zvg4wfalibwns6tn5yt762tt3x5hbej8tnx51rb4q9n1kx6eyvsottdhkego45rj2hc3tp5cvpym1uocli0g040jsheaqaast6s8oeo1559vile4oa2kjjag9fsh8ammlq8eix2xiznvei2xbmm7jppgpl7mnr4wveog25x26ej8ce8iefzpvcqwr9inm1rrjn2wc6q4dcp54248fumnoxiva0wd7i4gyhdsk70j8eni7pdi2w7s4oujfvkww6vcub132x807tazmof03cwkiz98r90v2ylux5ct9im711xg6rg8sjy3upuvjdw4i2ya4p13hi95bi7549pf1yi4o1kkwbg9ydb71j5ca6mr6rgrcjgfdq4y18j63z7aws628ggoaz5ewkgiwnsqk2ig1xz0x8seoo492ifflz58din02hb4imtasoytq4lte3kuwbjtgrbof5ml72665eax9hmsvp7cgk71ys82tm1bepf5l9av750fv1gxt734y2h7u5scxunf5wn4r1haya54toxcmrn5djjom0agfykqne11eyteb4jcft5xvp30ljjziw5xkpu8y75jtmk2itp0zmre6t9ypk6805pm9x6xry1egge8xdv9yt7l2toovscqpj2kdes16q75pn54zzy7u9wivuhy780ade99x9g31da5i71l3930vnkv9',
                sort: 824648,
                administrativeAreaLevel1: 'npfx12lpe5eg6xg4g4w58eebqdnymaz9dnp0bxrjni2tsmul6q',
                administrativeAreaLevel2: '4igxh1uut1rwoqe4i08dd6k68bwqqhfz74yrnm3djaplu2nrnq',
                administrativeAreaLevel3: '3reoqvavb4n6okckm2qq3apkgg009q5mbd3t6wix2tfjgk4m0q',
                administrativeAreas: {"foo":"{9]t[/0C's","bar":23043,"bike":3203,"a":"Z\\CLTUBZNz","b":99721,"name":9998,"prop":"NMfTk{CsuP"},
                latitude: 44202829073376720,
                longitude: 38566598812183190,
                zoom: 64,
                dataLang: {"foo":",FOb-X'6Q,","bar":64998,"bike":92838,"a":"^JHrm|'E@N","b":68001,"name":62728,"prop":90035},
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
                iso3166Alpha2: 'ka',
                iso3166Alpha3: 'fs0',
                iso3166Numeric: '04p',
                customCode: 'dygmvw6gfj',
                prefix: 'd3dxo',
                name: 'k8ng52ib34nl1icz933bgfxvij2mu2bz058ix6cyqy4gggxetniyoys6qoo55misqz02dx9fe3a2ritksyu9ld02ezfd9vpdq7cff45ntin9vtyen8tnn4swv59i9bt0azke1icnest9aco6wyih3p7y77kdfywgjmtt5ftq9xyqfz1sqa9m9sp2rlcdwg6he6i1s8tzkylxun0b90phz4ycmy30zkf52wjndz94uaa2nokbtwie7qdkhr7x621',
                slug: 'a8v3671gu70cr1iq7rrb1225b2uzlhwpan8g6w3ad2huqvo5kl2z2in5qyirnrrbzh8s1eq38j3jsop55q3moz9vqdq7qz0lqnj0s4bkos07dhymbfv9kb0o4242vl6v4qsim247un4w8ewl7ddfbzpu9dr0ptkrpbhvmlmz3j956b8crsbn87mrsem7quw6kh1yt5fl4du0qt9twqt16ul450l9xv317xsv12u11mnzfg22xhwlqso0q4j4mnzibqby23xfd262thh3gskhg2sodw67mayo5jabor74nqf54wzs79nr7ez6oh66jw8rfgdz1lgaxuhwl33fvsp39a96zjtqg8qzy9jv6ad0fw4sgao3utv9ks2fqeapu84xbgkpyg43bxc6jjch3xzzjgvwibcg1av9z6yp967elw98d0a210qo9cict0xhnndhlguhqntpm9uzcq1cmz1ikfd24ozoxzu8ao153cfdfkg9zobdkn3nqyvkiih8u5lunrik2xk8zdizagya0r73taavk9f24tu4oizwc1fl2ocrca6je4pfhs55lyj2g9crxqbsg739900albe3jkbt2q1cj972s8rjwujznwpcgp45jnqk4eul56ur8jft510bpt06waep60a55a6u022romqvzzc6zhbl21lyfa4g8fb2d4n8w4f6ro20hyqehjuftle0nx1r8v1akv247kytlsl0f3hvn5iu3wb87e7kigq9s9pa13rprwm98ejq5wph52wd4whs5fc4as7ay0baqyb5bfmczi6izbppm9y4z0mxgs4zdk5dqcn36ins6myrkoyf092uegf8zc11puxx6diqd614ij63sa3qlj4f21rzowzm3jxvpdigow1ciplnqnrkooenhd9xj8dj6e2uf38m55o713gb3u0g2xdzvwkvi9jys87m0goyl1qnzcp3vd1rbgptp9piw79ui8jlxe97v64zwafc674s28smz56x0a6lj0nepn1qlxi9e306',
                image: 'cbsracf41g45tj0jshmb9xnieb4499ib9id3t53f32nguqbsjyysj07fxw3svi2vgvbr1ojqet8vtf1ufiv47vc8ro5qo67ca7kwnxzxn5bzbxtqvkwbm4lb3uhubad8069tae68bb1t8pp4tnt7x4nvlhc56mxlnilo2lncymewx8e66xb15vty2go9qoiizk1yviabx9ph53zfou8wwpc4yp7v150s7igvyb71a0xwmcaix0wgcmbkvz2lho442l8kquy1s19dnnqa9kl9iianwbdifh29l0jlkhf1tnys9ro1dvpldb98a9o4mv6m23k72lt06oaof1avzyiastifhtef21lhohv4lhf0c33vxz4sn1eli7hvll6czoeziugvp1j34ot5e907ixsfd5uzmtodaajovmda70jcmux1s0ybtulyjftytzc4ed6mmr0ywr8rjkl7gfidqidczimgsbsh4p824qjhbopqeu4h3bwd82w7vl95y8xndtnnpql8blvhm7p9o2wb41z7s6qapf77j44l8g1iirj3mtyqb5zw94mc3y96a65udcjr6b36dx4raf3jo96rnus7p8ojbje5yrtwtwalrlk40k8jzg234wpoqyk05c4lgzmyf8gmqz0c6nu86e12lo573nu8chomworuo2l6wh4rj5htc8jydgvcv401nyirzwdu3z753z431bd7zr7lnj206c77jj832oxgh74gizejsqsulv375d33h9w90cdguqcv8wk9rtqrenlq2mujrqktvw81xxf7smsjfwnndk2ybmjo9174pyup0xct94nau7bte52i9nlzyxa60pgjy4dit7b1gl7i5w1bga5jpj7rjp63wp6ajrr9t1hyzc3y0dx1msk6htbrrhy0emrcw81ds9xcofyt7kjlicqxtpmykrf5ke6dl07ig5dy9b28j4vwg4e7vvn8vbp946y4rwdtchq7ekboxwqmac32xleruy91ufgk6yblkn74z5nqzzwv',
                sort: 597905,
                administrativeAreaLevel1: 'sw4d99cqqgj4rq1r76nf1omjo7zb1n3q8rornj02cf9tifd1kw',
                administrativeAreaLevel2: '2vqx5lhhmk9torsno58fq3g59fbyjivpmk1rovjowcbaj137hs',
                administrativeAreaLevel3: 'z0vhjo9rq1bbpjdkdy64gb0rqpkqfnutz8ngfmwnz547oildmm',
                administrativeAreas: {"foo":33348,"bar":91476,"bike":"2aoLC/S.tQ","a":73207,"b":"\\NOS7{%]]v","name":"xz4{u>:7z{","prop":48279},
                latitude: 44079412399751544,
                longitude: 36978308789158540,
                zoom: 74,
                dataLang: {"foo":"(q_xq*0o,O","bar":"^Y4fNw}vRL","bike":61724,"a":6159,"b":"|c45fBSkOw","name":"C&#fZruQ:@","prop":"ZDm)7e{z7h"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b9ef6452-30b2-4f90-8f7d-c7b4bb4c41b6',
                iso3166Alpha3: 'csc',
                iso3166Numeric: 'dhe',
                customCode: 'nzbh9t4qcz',
                prefix: 'mbrq0',
                name: 'goh4djkfze1ohshpfeaauh4wfay04hlthieei61alpsn9nvgurifha34h3k442cvlg8f1m33km7i6ptu956vrr51oonvnyykw0flq7oi1he8tco7lif2vtvbzcrmdilkgtfasng41o69elv95afwicmko8g6gw7v5mbsy5j6yn44w32zcdpznnrkliqhn70uln4xi2qvr51qdg08ylxjate4hf33ko0ijd5qoc3zvd9u91n1gduhjyrud6teqfm',
                slug: 'j4zfo01qysbaqwde4i8x30m2dyu202yhqs3kreatoy1j09ueai1crux3kfoz9pav9bqp5tp1pecv5t43vgbe9i8b0owp8ywpua80te1wiqgeoo8qi2xihxtcrtk0rrvd5hl2rb2188lnpx66j14dp5ky7d4jt0ss3pvf0ocipepyu8wijrbrjtb3sh5w8ffa0h3jwntqzvzlqv8ldgffq57oviqbsn6h3grddoje4uijje6mtrb0y2qf9j3kqsymm3slwr9qb0s65cfxaw1lylh95bkktcqet60ygwefyays7dwe78ss3c0u9tur1oxp4vov8iyj356p3t4szhks9sqp04zj37r46bcw58h4kxie29tid0mswan6117d9w7atltkm2ifz717klnvncy12rgs6o13fcqak90qyrzbaj48v5eavp1c4z4g6apfytu98z8nwfxryr7kw4ozojqd634igke2wxy821sys8btez2cfnc7u9g502dvoszm0xv2usrxhtnfj502j76v8xlkphxmq0mcrfpp09g6fo9jydlwfsvjg83gaf79c8wh7yrjquv8mblff8kswztje5bev4qh8kili9l5s62phf53h7ergui51lga9m89n1aidq2hr3f5j3e3eumol2qzs8xjyhimg0dxsds5yq1amiha38i0d0wiayahr88rwltghigesqgykrc9vqzogw4z9d865bd16tgandidpzbylpp5pns8fk6z9y09fwui5na1qvhlxvknxfoi9qbxzbgn46wxq5kgjk7e2a2kadkaowxvrmfni9ckvrjrmcr0c8x18lz090v8vvav3f9i27mggye0beodl0fyrbd5csx0lgl1kbyp1vb4tl0pk909phl90yvqmyvd09c8jgal3a96mqlv5e4puxxbhz0csu871vivtgtn2dcmj088yigjljccdu3l45xbzts9r8ddipkxinrrgjwc73vjjro1bz8e5sc601tnlzi17fdsmy2fy1u3hmvp',
                image: '5m0x6kt9td6x5fkg94zdfqcnnrbsfagz8s76ngbi2thv6uf7hz0ztbv64k3lmo0m2keceynslihpjqqaebwmt097p2zzn9src2pp1l9ftow0re4v74jofgb9ahzmkxi3gjc9wnht40brwvoinzylvw0bxcqwrp2152p1r2r4lftgfd453ohgphm8kck16k3sq6uqzsk0am0zcnvlk7baprab32qfo3w5ntiq4gq3h1zns1nhr8u9hzh29gp6h88haimthxb2ssucekuu0c2dmksilgbfhq2wb0qzjzsq0nsbmast0zet51arl6uew1ivdm940tx0h27v3lt0izq76zwnpsx4sx4kb7jelguavi2atv06sn6d7d6ehba3dm36im7tl1fvz9funoptycrh35lhcmbge76vd6vmjku5vsjgrop8jvogpmrr5lshni95866b4j3xjb1annc09ubwjxij73q5g7fgpb1pr9olxptfhatle1cljsewlpkzseyw5nq020qzuw4xq3ccefesr1ylpopp3gsbq5at4x9i8nul4pb0kcrndx2mp1lywtb2uslwotducrp4fc5eh48tp8h2oduwg9y3nmlcsv0biwimt89kzmw82aodgyvpxnqj9xzcsdez70la64r2ekc7nd92tbkoepryk9xri2j0vli43eoy2r9jwpghq8enx6lkd7xosyup2s6g2jqdlg4zgl0crc41hpkyeuqwz0whxyfaccsa2v686qtmmcy75yetp5v666g077gxdce4uzvvyfncbt40kt5b9rvvalrh0x2aeil9ikzgi099vllu8orubw1pj572w0tgvmep12ym6l084ueq2mm56nohc547xs76d9pyxh4zsrlkggbk2rf4g9aah8zmwxfrqbb0wb69t96v1jjo3nyznqnbsxjjyrjavk0aziov9glhigd06hggw590cio2idr1pnwrvot3iaqhkeo79ctz9vj0vsccwwu01ohlzc8fcw1ax5jjpbm3',
                sort: 883836,
                administrativeAreaLevel1: 'vlf8ircmscdtxqpdxq7kqjm8oqjqxisv1xpm5kwp394i3zznhy',
                administrativeAreaLevel2: 'd0fh9x6wkdlon9ofjeh58s6c6cnwefzsi3fixxpme0n0ljsd5a',
                administrativeAreaLevel3: '6fdj6j1lwmw40njsqu3xdke6koko5w736xfl9x8bn9h0qyxgk2',
                administrativeAreas: {"foo":29565,"bar":93714,"bike":"a'P_O@DWZ(","a":44410,"b":"v<>yqbvHp]","name":58697,"prop":"iahb:c3&XH"},
                latitude: 64590613750855230,
                longitude: 66043243043711320,
                zoom: 53,
                dataLang: {"foo":29869,"bar":88250,"bike":"N4mZy]NeQB","a":28391,"b":88532,"name":4576,"prop":78471},
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
                id: 'c11c20f1-d5eb-4ae0-860a-b0cf0eab92fd',
                iso3166Alpha2: 'ru',
                iso3166Numeric: 's9e',
                customCode: 'qr6ei2rfux',
                prefix: 'uubw2',
                name: 'i1rt44u7cg952pd1vc5qsrztfeyanh7m0teo56ycmdxo6vvyi1tessdp8fysppe0mthy4b26a0cuj4j3yp58od20kv6kjy4sdjcyr9od11yeduu0z9t4ttt5lvrlassrt9fpmjj6ox08fskvfpwj737amfdfukwmru4kof4en1xse5vqqea1qmkd9mp4n2mjbdktzuq2tj2yisep1reoxa4uyzfijvukf98gvuq0phgnjmkbs3ihwigmc555vfu',
                slug: 'jn4yxajllhktg6jjnk5u9cu80vb40avpavgqfx8dh7tkffhv3famwefz84ubzldrvuq2znx6hk5rxs0nd1qm3azvsl86itsus2aumeet6xz0xmqvko098v0o5th7asvxrctuqgernmcudhdwigh4edbod2pgldtbfd40rs3z0orila22hifm5kt8ab4mgsjw5z3ub1gqelebsjy5pdw73lbd6q1dlrlblzm4o3gps9xociakomucfnbd9lefu7vi3qph6o02mcqcsjcvzeisz2m4cu3fzjiek1n2lk0yydxt76its20cql9f42sjwj161tv7g4ghzn9jsazbi0v1g6pegzuf6df4eaa1y2ebtdqanx4d3yn3odyz0kxiajoll4bdvtkyg092uqrld8859mcqzztb7zglcnr6ehem2je8fjlzuk7l9v2dkd83w5def3gz3cj7vd1mg8g166izuo5rxraxzos5i285tekq0fcbxysi0lfitana1vw95o8flika0bzp813fp5uf5f5ipfomd948vl4tzgu2ze0r5nrim68gg06jcwbvwtfjih36qg2ctxhrai4yw2uva8fnne0mi55r8eqk0rbnoodz479ibijh6be730o9lby9m3obr3nz876iuxouwwd4psqx993yg55o43c0invi625iaj45d53oijj282vs7x3eahkwt0ps73s3bkg5qlr8i49quri22pcv5lgjscz7dc7ak89uutoegyaim2k0qnpp5w2tygwucyqg3qlg8pwb03ousirubk9t6wwcv39667qs2j2ggvzokatcqqua15rfmos00zu7mfgwihc4dv8jv1yymdfbn0lg2y8bz1skyo2ym04y0fpdp9r1a5p5o03q0jdb1v7n7ky73c6et9ckxfcd3uphdldpqcprp50ubj39tddijkdz3zgeihagtu00re8nh4auzhr5rsw2r5couoc8dao37b2jez7z6p9cqvywjdjy8tvizb4qjn4guim0nm8g',
                image: '7v4hvfxno19lpvyknunbh6ud5fb66l8eupccpmegz8mpngay4b359mf2zmzs8mkquhfnf9psogruthx54ltm74uai90xv9ga73kz7gnsykyoxbb6370ekkbh0fmotnhuh4kwlx6f4ukkxtet9sdn8eiz9msif9ktv636dq3649ueq8rny2ks5ypga6jh4z2i32lrmqvjjyiikeoyfizcyl65rzgquzdmiycxzvap3ec6xq6xuc0biducmpw9al2u4hvkoi407g68zdeu5xulcl2s7gqg4is28asqwnaxellx7jpumr0x2glxt9iu6fqzvfkcqt8kqu9ge6kdx9asy0o9m6iwzx0vnawaaq5l48lgt5k5niuaz5b2mjioc1fae4j82eyj1c5vdn4cl0eapwq7aw0tluy9b0anlqs0f3kb4mdhkxy07mawvgeh0o7z5f308ibdkp4j4em948wk20ufvim12vnj44kdmadpen47abyuejzbhhcu8gjadhwm8mtevd26i12f6qag90zhknossmx8axzc3wx9kof3kxgqf1rxlfwu7t7ah2uoemx0izrrrx1xqydb57un7pxq4trjqq4hflyfod28c84arcnf4bwz1spcckkphdegk212ppoi1z4hfk5h9b0dwkckfpp29civ83wia50lg1ljmmob0a5qn7a1xrhxagsjifvdzvf41u4uy9830wfixwb22x3fvrphtplkzfct98it4llfh5laa49zstjd3q15wli5kc9jpayi6x0bzap0qwvlfj2mcfoavshqgfdi0ia8x395inkd1a8o8f409osy17xusnm3oyz4g703zv3cjaws429m9n7svw8hpi5fbxa26c71ae7g9ea8z09wmrb4t6skfqg6wrtn7xfw1y6s5mof5f7nkp8he5bwkhov3y3tfu3yqqi4qqemulydz0vmx7dadnz37pbbz5aupgoc26hz729wlkmzpbk9naaoe8l8vgs1nrpk6w14zlk8ls94pvgy',
                sort: 299975,
                administrativeAreaLevel1: 'kfx1dim28vcmjv0nz29ek20gdxaw58hisq3z9n1qqqmnxiyos9',
                administrativeAreaLevel2: 'ncip57zp0posjkccu64kcjg9qf8mdr2l07ce825l1nuzltkj4l',
                administrativeAreaLevel3: 'h5cfag0systtacvbrb6v80ye2roa1ucgxmvpffzrxvjx3dw1xk',
                administrativeAreas: {"foo":"gi#LJ.\"OOs","bar":"U_D=]:_c44","bike":34659,"a":"H>Mg\"-Empg","b":"\";N6=!\"^,m","name":"#4V)g+ux4]","prop":"'@5PRWX%%D"},
                latitude: 76381679739609980,
                longitude: 91160816523637900,
                zoom: 36,
                dataLang: {"foo":"<SHax:S9,)","bar":31519,"bike":49480,"a":7432,"b":"I9['wc`+sv","name":"}zqAeX>M1l","prop":36470},
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
                id: '94c62967-4aab-4f59-82ff-1f47515df696',
                iso3166Alpha2: '4v',
                iso3166Alpha3: 'w2w',
                customCode: 'fykz6i2wl7',
                prefix: 'xjv83',
                name: 'xlv0uizw4y04zb9w7vzrpb4rtq7tbdbiqlibnaf4lklor3l36lttzkd4sj69rhni1uyg0hugphnbmc2i47xfnnuprr0vurb3wexjam56oikbcl7p9ph3kdouw5zwl0xbc59i7o90ex9tzfiz9l4hdiwqd8m4je5dd0f3jhnn852qu20an54c38c556jfvi4pxxfvywzpyz8n15ng0osrs9ti8v6c9q1ib3nqj842768wg6cn6kgazs5uev1odc5',
                slug: '7duhvsag2no4kpe74abnix49xv7c9og7rzbzxsoy769x4gsb3hisxi2yijzktajhfcs8ms7z22hvcjp5nq4pki24lhhhy0kf3x6m50autuaf95khm0dnmxjl454kian0nss5nu5uxt5a39wmm8rxeijnqxckoajcjnt0bjf6gykz05j5oy1me2emje2knycaglw36u13gtfnh4t71qha67tfgvmv38xamykoyrj0z3fl9k00kzkzjju4z031ga52sa0bw6awt1rdwi4jbe20bwhurptw8zak831uzmb9y3a3b70d63sp30788hsee3gl5tefonb2oocbs6rtx48zb3ki85c02bdlm71vdv64wk7gfhbp21jvg03xmfgpysbvzn50gjokqak8rtphplgisnhh9bajq789rypg8zwzv5tsh5yxh3nfzekakw91umaa8cajjyj3hnujvywt7wy9vfp9ad2ds3va35kd8j2e6hglkazk8aw3oekvkl11lt2nmaw426uhdy8k0pvvfkat02owif7dyz5bsfd7y6906dtzz63h108fpws30l2s2d0fr6dvjwa4aw9h7wt1j32w8dwuasguxbgji1ccokbgu1adn8ibzzavvqochpfxg1ino8geuag932k0ghwdjqiiccj8gqxyhyb7l2jabrh8lluvgr4d00am9w4hcfg1nlnt1md63bbluklqu1aizak3x3esyxkwffxdkswb9f32p0hudadozxl68qpk4bik7wc45qgyrb8z8wc06n146r6oaxmbmzbspr42eaorxr5mnhu5ydbst6lw69lgzf7ya1kf1w5yt67vv0rz85kl5ghu68ieokdukcwuwxc1qti5bdzvv4ivuyqa52y9d9afz7748538gjn99v1s1jut5llltoq3jxtjbqkb8clcndpno8pgi022omsjmbqtcpsjhpjj8befcknvd4rfvmkilqb8xwkiqel53whayqswbg47l4dl71znvvzdgsnaf02btg0z',
                image: 'kfjzc064pjonkkxanx5mgr8yoq3jvjtarlvpi5vcws5n5m7e41v8c6g411c8awqyyfl4su1voy6abw1dcjkmsqom1o0w0at43tkpmk59v4mm9k3svgko926lw7kcp41t75n93t3lrkzl3rzgm1f1kgo4mtavzrcj36el7y08af8sws1574bvlfl8q8yb9y1s6d3yilfja2ceycztw7b29z4m5vju6nqhlod2iqom43kvm04t9jwtj8f37l50mi7yxjuwqlg7witx7qn14rrksrk1xqd1s2od1k6tyx0petkyz4cxa171pt0gqjvy042p3mdal8kyarlr62s7l58kw6aji692k2kntnfglvx2z0myxnr0aw5evqs1zu8aumfbxd8b1srk5ti01jmt9mj4jwhnfeofy962fyrprenuafp9kvfykhxcsxlwqbgns79c6xhknvt8unzdx1u7dys3x5x13vgyhf3ns2r444berzoxfqfzi6kbknazupstvbzukqgf1eobw2ksemvsdwvzs0idq16ddljx0jb4gaomzdd5luvam69ffqu30no95y33h1wn4w3d66mr3rydpof8dor6iliufk871v2m8v1y9escswdcx6ewxqkdyd30rpaa8gjhneygfo9439pbmzy5s8fas3d17tmzeku0ayu8nyf1af225r9eyujzkbikvibh30edh44v5qbpauan1f8407c79ezc0p96u2f3e1bt1fqdf7aehx4e1brmkya3ikep9qwbfl5ebuoe84xxpz5cuikdt10ywdzx68ibdxogqlyz8b9ax5zvs5alqx826zfzzzx4ks5ugey9wl4uyzdkb2o1najjzrbi6fqrvdheefn3jobgee6l9ba8arlc12jo9oxpwfw8i7d93ddyxh5rlnaof87fo8cnqwnblag7xxfg2m6uz5f6bi33coaruvullbxcibgewl9nifjy3h8p1mh4vndz4siz1th3xoyq2n31jnk53g0imwozyafmh50g',
                sort: 846383,
                administrativeAreaLevel1: '9nyq96ptxh95zw865g1uyt1nfazhlnxdz2pfina18okqectnl4',
                administrativeAreaLevel2: 'iini39p0zngir9pmmanc3nf10scfjoaag7e17qnyr5jtdbpxiy',
                administrativeAreaLevel3: '1psk7hiqyg7g2z02cv7ligh52dp0d2xgydiipis2d2n987kfdg',
                administrativeAreas: {"foo":"WTl.iJr}:w","bar":"8rU!?\\P\"+6","bike":"$Ps^[qZ&:M","a":"Yry=nw{S;0","b":"!rhys-aL)\"","name":"=K<?=Tm3p:","prop":65328},
                latitude: 49947757967330930,
                longitude: 99806262476217220,
                zoom: 49,
                dataLang: {"foo":"BJVd/drDYl","bar":96640,"bike":"qeC$2]g.@O","a":71518,"b":5963,"name":":%.gRVW\\$?","prop":"7P-WEtBG$b"},
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
                id: '4aa6b4b9-b307-4c9e-b42c-cdf9ac4cdb12',
                iso3166Alpha2: 'e0',
                iso3166Alpha3: 'mez',
                iso3166Numeric: 'nfa',
                customCode: 'vaihkcxlv0',
                prefix: 'pynny',
                slug: 'arz8zvowtw9xwdxkdo194ao6qwj6hxn2y3ecc5agmtpaxhwdj1ydh5bm1fn6qg5im1c0p2gb33maq7z5oadss1zlk4orurhhlv64771g0o36lwf3cph87el1o7h2jdj7dgea9t8l9topt46albc7dfsp6ew4d0xwykx2o3ikjt9sem7ynu9peyj552qalt3iplp5nt7m7af37c1d27wtzqe1s0boefgcs8h2e4yjsfx8cm910y0co18x1352u7bbzagbaekpnm00m78mzcic2kqe29vffv056q8vol2pau8259xu1401iuslsmaxhvw3al1gzkmap09uohvsd0wanbpfsmpbz5l1t3dv85u1d5tdbu45h2ljz88psst1o91oc2xbccy3cmaed4loql8tf2dhezqqu81rujdn58y0inlpsy4bn9nethyfgp8qjfedzsb37xs4olczuhev1q3e9uiyu2l80rjzp9mxbafxgn1rtsivfhfszrhe88m6iqj8ms2m39vw1pi5rxjmemfyt6e8ej5h1h836m0edeu1tp5tecjvze12deh2nbmayvu0wt14w4pms477q1iol7tdaqu7y1rerwqf0d9g0vn1crfwj4uc3gbqjs0326oymmfmrzt07f1ja49hk0w4l8dv1ikslaqs6fgfwcqkr6j1xa03qjblsnrqf8q5yli3hu9ml53r8rnqxz2u4lru8qf6zsf7wpbjjnaq9jnp0wyohf1k8ikz1hwykow99zbmm5m6ox1fym2e4nbyqyvjrmgsiebj52nqhxkg2jfb8l35fdzggxklt84twla7xoekugfdvv4pnj9teuhpsgcnugoi3h8zfgubrrf1fjjp1do6oay9p24jc5a7tehmuo7vx0407sd0mfytoq0010zks1q4a6hrho0czid1a944obd9hiz0j8t2r8bv5liefq2y9mxzfzg0lwho95eabvfv6if6nm0dcrn3ssclkrdwwumfw09adxmxzznpsv1xkw8zsq3k',
                image: 'qxz3xdg6a32o8v7j0vhtgih6s39xhpneb5kmehyxgyprl7evmkjun1ceq2clwenye22agc66yg867w7gq10rjb13qtvabd6srtkz28l9461qzb3s4uladx8wlrg39otke0fjwn7b1wj70iuxv8k2rfk3i1bdghlh79lly0q5q40ylbmmwb2atj6e0e2mev4lyjddc534pgfnhg9kb8azkvtk9nc4euc4h85z0oh7ghucz557sa1f6f1xuwhxxqv2bead3imefeitr9z8kyfpef69gdr6seorxidvt2ln84f1dojke4eg18v25lvcq81cmiupeandr5oa4uwj2umudj68aqt2dwp2u4eolvsxextvwbxh43gvmsv5xfe2j6dx3u2addqa588lvdfqm83w1hfvjjku2gbndx1l120susnud1y2cu8wi949tz9gjjp5dgf0hqhabzl3xc1psv3tfqtjay4omm316shc0xt3ad5rebybu5xy1s283plnw5v92rxkzkubwskrcjn992yv7uaa91cjx6nkgwaw67mc4lyn1qrun78cbnlfv5i2amxlrqtbt7iv8jezeqfjclyhj91g8589bzhiw4fg4qsxzzhkvuy7m30lza1ooech1aucu10om1qzk5utkdiu49oh4knqlrplladc0e4299cncbg9fvsw3h4h7wpicfkb3e5hxh4sg0chstq1e2czd9lel69bal4n7bbrnwhyf80vbnsbut0v2jh80mldcqm9wf1norbr0ykftoyqtg2zhqls5dlz4sf7h06koo7q5bglj4l1sakmr3vplfr940j6twxyzbf5jawp1k1c9dryt6mqza11hkhztjojm8m4lmx6nzmg6v096ticvm569f9lp0def0k5qkdfyr9wts7ovx9xnrrb030ifq48jp4c1hc4o3pep2v2bjnq4rb13omaa8qx0kbt906tr4a3cf6bf2vaf2bn1iyl0v89h7ad3wahspb1z25qih22cwof7fz9tnwy',
                sort: 664175,
                administrativeAreaLevel1: 'vkllzlgf4lrldutwlx1ptbpmqy9onsoqudg9vupe5r71nxhqtw',
                administrativeAreaLevel2: '8h6jrge36h4t4a8bwmlogkqfxisekntht0lykyluahkc4jvfgo',
                administrativeAreaLevel3: 'o33sf1s7yjzqxtclfu9qrb6meh5dsndukbcssmm6fcoj2leh35',
                administrativeAreas: {"foo":"MDOxke|(e|","bar":"UH}jF&d$09","bike":"PEcO![bwo-","a":51767,"b":57786,"name":"eh@w,=vShi","prop":91662},
                latitude: 36058525401835784,
                longitude: 41864478844084120,
                zoom: 44,
                dataLang: {"foo":68200,"bar":"Ln)EoFMCIV","bike":36396,"a":"_]o|+;';43","b":94573,"name":86340,"prop":93391},
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
                id: '1056484a-4040-4901-847a-2bf7a73aaf6c',
                iso3166Alpha2: 'wa',
                iso3166Alpha3: 'dbg',
                iso3166Numeric: '1jx',
                customCode: 'hrwhgv2eev',
                prefix: 'ozp3j',
                name: '68ekn153lyn1ig9lckitadlbyex5unnlwbog2meye5tzo2x69488hfuraot4ejv2wh2lct56usakieqgbcmmfgymfcsuuqvzp2shi5n6dvedq0t3iu0imvhol4ls5wnvv867xdexyfsp8tf9qpk349bk94q7edpg4wkejtrs02ef8dco3l1943j695x4nxz0mru7y8ub2y7a1lf0i0fb08isuejw462ds7or6fige7xqbvdkm2us1su6v5a2upm',
                image: 'a2pkng0bpew484n90j2t77yxk1o59h0hga35vp0h1zyjm99x1q2gien7vkh6wl2px4cpczspjwnw037oo7se1ehpm4873ert15yzc1xrrtuqn8q7m6y37pmt5yy17t6pfbqu2sa9jxenhck2kp9z5odntpvn6utbq946fzex4kb9rkywbhxscspf5fmou35ednbi9ud3njniia3x0f7x5jnfgf4wsm0xsycvg5lp5lzhhqyhen4gniyc77dcnunt75em7bnrgwozqpjaizzcww8zn8sxbukyc8h5t328zii7ij8mnij40ydl8pvpheu7slbhr9y7m7wz7k6w53hwu1hzisfxea450r35i4zki56o8yxo363fxqg2f90gkav3d0mrs6otuu16217vxlc4m5mi5nklafswmlwult1hbi2arq7bw1xecdqh1oixbj6ooj5bx0m1ktjzyopgz72f3g8ktqngnt1um2firr3j4o3jfw0z098inoi8u4jzcxc1a0y2hi4aagjz6mpjeuh1mhklpo199opwtn42t1520qks3crep09ultbpxlchnnm5ji3s9q60kfsbyvyklsy487ymsy7kgmam9shrmvsq62ytdyi8o86w9fk3wz7u1vhorkv7zzlecd84nbdfxqnvvsna8i79tbom776087hsn0q8jp5bajj5avk1ryxyw0h6ux6t8avjsak83giodsqftfxsyrctf6h5pcszcmp1t2gh7m3ps9lhlmrnkmv0mpb41u770m49pt1q9qy82bjuohcgpbp2ki3dqj2d0h9gfrwt35ton4mzowjta49rt8w5s8qcnisic5f9i9jn598rmd04guurmpekoej7d7rjxptdo3mjai07s7shfy5mrk5oej54mh6bvmwspkm6rzuaednlix41u3pewpgll1l3xhnjqq79jffojpjimdnj0c978f4urj4ylwqlhbx5j3veb7w9xnvfhuzk94dhawbioa95hsrkufo08238ibjc7f62',
                sort: 849669,
                administrativeAreaLevel1: 'vr764anrzaimb1z11x1ket5y106bhp9n688cf4ghrafp6msbal',
                administrativeAreaLevel2: 'ajy8trn3mubbzjd75alr993646mh81wyxj5okl14pq0r6tae4g',
                administrativeAreaLevel3: '1r7hgzem05gmmiz11m2lyov5mhp21k7y5lvzf7q1oe4lumrb1s',
                administrativeAreas: {"foo":33069,"bar":18746,"bike":22445,"a":41538,"b":"w05OsodCSM","name":"r2b)mS@xBH","prop":"OaG1pGsd5@"},
                latitude: 61065130641453780,
                longitude: 68018389853268000,
                zoom: 17,
                dataLang: {"foo":"KHi%RU74D=","bar":"Ma|8L[S\\\\<","bike":42519,"a":23499,"b":"Ig{ii_Tw/z","name":56977,"prop":18077},
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
                id: 'kj5hys74j67jsy0ktqpp1reww6oopov5iaz08',
                iso3166Alpha2: '6j',
                iso3166Alpha3: 'jc7',
                iso3166Numeric: 'kvq',
                customCode: 'cz1qnhsh2d',
                prefix: 'toows',
                name: '89soaupngli0jao1ggchv72sv0dt727y42amiubult3ix81ze1k4hz2xwx6wwe6t5alpittj9e11q7l541k90bw2issj0f9mgir4svfr3mydh7pc5pz524exavfli9z6s55lbdbdy5clvlxopofgt8gmfz7bjegcc4i1oftsqvpioyfme4cxnih5ci2jwholg7u1w4gqh42srn2jy950nfbl5d3g9em9mo00j8ipeoqu3370i60ofiit60d9cy3',
                slug: 'aq1aw4tg3pilq8crdz6bvxwumrqk59ss3y9bis3ow8m0k6hsb59281pqsozmi1hjxd7jyltowhfxut521q3eom7o4lpfgmdzisjivuxm9y8rel7k6235cr2akfp1x142l8n8za439vxprnb0lomwajgv0qb1sufgdyfo4iaxsfkpes3v49xk3jxi498m68bumvb397k0863gk1aa2hprslu6b5v99f6kt0lcpvvh2m73vrkkml5afs3no1ooqmup37sc0cvk5wxe97laxwn90t1127gkqghxhyd9g43st8fd3abi6463wcuw6brg9yb8r18q983qljhz6ke9aizkkpjb3t1ojc6tg5it92s2dvks2z7olal1ytq181ps22jz9h88skffvhigp6d42g4g5ot3qwr8ofest13pr5f0il3m7u2t76n02tlzxangrkcm9b11pelr1s43t5ugn22shv0r4iwg1ldrfkpff8en50pphwokk7y3xmlf8557k9f2o4j36o9lyp6qikkbkrion19lj361f5o1k997swi9l5dbaq6f8dr3shzs9v8guxjkgr1ayvzzs0xkduva5vjhdvv4wwo778yl0a9mo5gaoarqkd3og5hbtf4bhng9mc01wgybs8gyczm1793dt3uvk4iz6t8suiiuzwdqoithxhyayx21buhs8zs38m0syxgcxvf4la5xt3vmw7oa6bwxb7eerwnzwrslqou9b5di2h4xioiw2mkcoq9s6lgc7whm1yvs8g89hw3047yge2k8k7uhy2s739bvlqevwmdbxy4iq678htj0f4vbjdp76rqr5vd44yjiajrhq0ionf951qdam4w48jvkoskaim2lexfld1egnb3yuqsycx3eqpv4c07pc9twa5365v36n0duq6d5f5itvvu1etgxq31ub78xkdfwl7voeiwja0lzh5lgkueqyrmor5clg35bs9ti62z1zppoqwuyryiq9esoznl9y07xnglz1q6sfu580wux',
                image: '8wydl3j3a5npbmpa31fw64sujmbwtnwvfr7tp1vmexmfokbnph59s5emm5mtkifm0jfyxxumxysbdb4eeisyimlvarkw6h8uothzjqq22x211jd29fli4ty7b0infqa9jr09e3loccs54pn1orjtnu7kfsxrn0igxsb10m6j5d68z03pflrloui95l3ap023b0ngp3oykjqa1dswtuhm08t3b58mrgi02xrhx8jkzvkut2xoq53mzqgmo602kf6xcoku2dx934imbshsg5tpqbo275c075dgos1u7810fujpqbbeupl3cp5baeweom99e99rba3tfw4dz4ar3hljkisx0aa93w8zrspiqhszl6r4hbsoj9in5bg7amkgjdyq33tak0lksnkmah10pbpi1stpfommslx4mk6pzpmjrw72azzc7xxq1p7iyslfj66sduvallpfhfvgo4kg8bs15pzql9mtf6yxnzxj5mju97s7nmuvvej0ym106dvek5np9y6l696d7kektssuajhkmurr8kgz41hm12i1hzo7jjjmgcsdz0tzcmbfd0spcpcreonvcosi91otadm7yy5hyqfi0va5bnkueco84d57rkftn08yy3eiq943hbi1pq0wchi30lgrveduv7jc0sxkcqq2vxvwpaklpq3shh3uxg3cn50oty84xeco7c27mbcxvmd90vv6jg9mlmqamk235allm7k0he8zabykkyinrapbf7ihasz5budz6kkwrzbfkwi4xlfok2pl8pk7sifma264kxgwf1a07oiq5s6y2gw3ecgh5zw7516o7cyuijkvw4lyectidn1o4ep3rdbv6mju460qmfi1d4kijf6mpnoyu377ms2vzzrf5ou7ujplnmil6dkfrr8n94py96hcwlephg3l7935v13szop8zlpd4mve09tcf9a5sgvg54en35lrzo4psbyhl3stiognso99qwpndarbl167131x11347pki664kdwn0t9ddvc9p',
                sort: 845582,
                administrativeAreaLevel1: 'u8dnief01g0b49pm6oyqlnh56rvq6cf02i8rswr1036c8eu5ph',
                administrativeAreaLevel2: 'lsuew3mcl0z9qlrcj7q2lk04b6osk2geclr1vfzvol5weg3xth',
                administrativeAreaLevel3: 'mz1oukodaey9hy6keb487pb59cgy4osdmm8ivq9oo1ohv6hkg5',
                administrativeAreas: {"foo":42256,"bar":75202,"bike":"d85Rmg9(oL","a":"*.]UM*U\"6/","b":95970,"name":"Fbl44m/n^G","prop":56311},
                latitude: 10736703734149580,
                longitude: 86285436780563520,
                zoom: 47,
                dataLang: {"foo":"x.5)2Y,b\\v","bar":67344,"bike":"1F+Or2]Z_9","a":79125,"b":"vDYHw6Q>Y3","name":99331,"prop":57176},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 is not allowed, must be a length of 2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8ac673bb-d29f-481e-aaf6-f1234a12a5d7',
                iso3166Alpha2: 'f9u',
                iso3166Alpha3: 'ydw',
                iso3166Numeric: '0pn',
                customCode: 'f61fh522d7',
                prefix: '80wqe',
                name: 'vqbt07xdpp19unypswwdts1atzfah9fd4v0hecjavu0xyxwbjf44kbe9eim6yeqo79xg7mnme155u57yglzrtai4bjweb6ni4nh2fn6c5fm31h9lc03m3da36mh7wzqd8zwgmlxcz6v0nknzttztn0dd9b1ewwfrlk8nibkc6sgg6k54itpxeb7430awk4e9x5077n7e7lpc4eh9rvk0d0js59onkxizzmpn3j092b5q32ue6kr9fiy8o6idyhe',
                slug: 'q0d3m8atmmwdlxdapbd1fzdyst4c0z61dp185pps4lddyvnkowywcrwm46iwof05nensw7q58hb89yew577bz6kwgndgsltr9f617ynp7ozfoifylyjp13xmog085w4i4ktodvohcoxhn9sjjdcpgljnpx69dlrn8tvbg4vlahgiock1uv856re2u56f8r0hozxp7ze1isfnzovydj7ysdzni9f9x2vm5oir3de085ozc8vm2w2oran3jui3lgef8w5dia884lw9dlgwgi8zuxm867qmv1tmrkcunyjv5leons8zw7bp68vy089v7jg79j19oz4bpqi75gh3a1brs3a0nsbbil5tvpssb70m07244y3n2wu0257gcmdr5umtdh3jce64n576gwgf5i5r1v4pdkr3bcve0kpot3lzfdsopnbb9779th83064kn8ouqck6t4z0lj9qq8vytqeegu3jh1rqn3awnn0bflax7ndxexdsrk5uwsygctff92qmlmcl11jb9fa7i7wsgqj0i5c7jsbr8a0hfnnqzhz9xrjp6228dsghs6rdp48z110b4v8po54qanu38jaer9eyb1nmy8ly7fet9vfuur6zkscdmcj0sizd79zdfvejotxifmwutt5yis8e6upv5jkgc1jnlfcpi4gh9xf59loypomtqipm2r60fj0zrbggjref5qxpacao1bx9tyjvqnsh0ct5pf56j5o9oo4ibcr6wtn3d4tsek8bwgxxqs3wk51vnl4eoza52r3wltc32tni88lkw1625vr7jck3lx9ouofsnnm4y8bquwfa8m1fr0ykzemvua1uieo5s8d0semxm3o3l5sd2qp4vgn8637l0kpwgy2hm3zgieym7t2fe6eglslb2b2nph0fhk738d1rf8ij0mcqxxgpys4lqkb1j60zy5mjc3beucc359h91c60rssxz2ik9s8wbtkqfp4vz2lqdafpaqhsexpr26ydutzyul6la9vhqs1hlx49dzvq',
                image: 'b6ejeljf7uiic77qmhmqiqk1frul6ha7wksk17mg8xjkzheho820mu8fmxjygdsjulk8mgqquj8g72b880hexis5hrcnvc2tvlssx92wrfbhoi674011hu1mpy1plg21sncgm586pnzanqdlxe7qxbvzmdg0le8ewxfm6b4f5fjqm6njtihn5dwe55xugvgqsmilrfx6ken794bbykgpe84otrk5y03tzsrrbnlx0j6ojqqq0ui5g06uy9i89xnpzdgvelfppbtvrczw41czbv8ttfdg2x4pcf4s5euep1nr9vz8kmcsxif148q92xg459iepjnats9f91ro7pjubqyhw531st1axn3xdfuryx336fsoviz4wswrmfzuamqeskzaz4ifmu4wffxzwj9ws04mq0apnza67l7i964vpe39l15rhv3g9tkw21b34xngww61659rydzuqos6g5v2x88up7fwv2jckib20myiq91o4l3uleze5kit7ljde88jdkbho4adtkwkuui7sjakqye0s4wqdqxbyvi5x4r5dz5952oz1nmauvoo4wyddpd566zt8t6gern00s7h638u9tctr50j4oga4dzw4goj5b3f3bhx9kfplkt8p9qn5uz7wpo4kx7pijupsndlykkm81r88bekx2r521qu4fyppcoznrhy6ycy3vm4jy0h77lqezmchgqewj0f5nmyvlmqqjfku0sy1x1uk0l1160bmhjmedpkbwgkw8llcbn1tf001ubx2ltbgnwkatufyrct8nsqzvbaqgfmt24m7ueus2nsauqbtapy4p3y28tnppmde2yf64wcynfkx2ixkgl6j0w8xdgr8v1z750ueg7n8i7m2v9q1j49634vc2gtk4na45ho7acjzd70kswskckd8pjeejpu9azma89xqlv7fvindtiu4nb49pmcv8ui72ku0w1mukhord8mi2bkj2s7xia1qx6ir7v6b3ghcte2n3n706a5yi3grkgor05yxnnh',
                sort: 459378,
                administrativeAreaLevel1: 'mvby22anp63ggarces684hsl9h7xt1n4msm18ay42wz2aasbzn',
                administrativeAreaLevel2: 'ctzfec7d0qjbzupb1owsv1q4v3alwjdwf85by2w1j1i1vazlj0',
                administrativeAreaLevel3: 'unsqtcltf0hvavffufyqenck4njf86tcx68oka0y7809ygdj95',
                administrativeAreas: {"foo":8950,"bar":85441,"bike":9722,"a":26923,"b":99758,"name":"6vf[1,Z7S}","prop":24679},
                latitude: 69410968810566870,
                longitude: 99228008740213900,
                zoom: 14,
                dataLang: {"foo":"!'`:YJ9?N@","bar":13931,"bike":99348,"a":17755,"b":"IA0G\\O9Mtb","name":"7gC1aTcHG-","prop":53086},
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
                id: 'bf7555e5-dd22-40e6-8ee9-0e34dbf23e82',
                iso3166Alpha2: '6q',
                iso3166Alpha3: 'gep3',
                iso3166Numeric: '5gu',
                customCode: 'fn73mknb30',
                prefix: 'nq8oy',
                name: '234wrus12og2pavu9vmlcdhkc4ol0ljzlpetqo7nn3r1smemo8e8u837epcu5jc2om4yc7369v988ty6dk05pqeahakgz53k9o74q6c2wi4o6is1i9ii2huzn28fbneb7zd7niwtq5lk3s8m3g86s9tgs6i8sstucn11v452jnlpdkpihgfhu12a08ypi4omvseuknpzqg6vntcoi11iprl93ktkc14jcnfynhgsw5gabaw0pqpf18qmwvbap9q',
                slug: 'mx8j2jsmdhkba84bn327b16ttf9mvgoh9okzoh2zua63yxwpcbrk7ulovyngzywc3ql0m58ud1u7en4ddl5wbr2umrgj7n43vs4gacpdnv5dh5lhnlbsjroyv97shwcxaapkeqs23me7zs81o6y9ntg18lstllc4a7e969zxe8bhirrifup9ucr6136pctm1gwfnjuo6qc51sg1mcksco5hibgomsdrci6z6y1t7zil5chvs2kzrod67bd3q1jv6cunai3rjd0aqtektyy3liaowtg5hzoz4qmej9r0w6jdic5ovag8242tcezk33tqj4r9lpm9u7ejtoksk1th7cix5ss5xgwmpihz1e6mzex8nl70eb4i5kjmasvqijqnpn90hz6roh89q20hfkb5cvu7kovfttzg3d44s9s0ndzmmtnc20w1x0uclgkrtmlfdxfjrnsnmidq3v3wsxilv2j9tqavhcynzfjqmh3p9ex1jkkh8n99emv1h4q1ofzhf3ysm52iu2qipep4a7jm9apfperdis7ch2reue6j9erq2p0mqwlqqe0b0mb4hbcbk9aiwyilgpe7dazclzi361z5nmkliwt7wx01hgyt4n67k7meec77ml9d6jmubxb92rwzv8qhqu5n9xfml6yiowg1ga70r7gcpoi6n869091fzo6imyib0uray8r5qxvuu3qptgguohqobvg2twdm3anfplq1wfhg8a0jjn3wwqlor2lyp3u3ls5rz3bhbzl6njuhk8jstpw6erkk9w0uvhki0z7ibrejeyo7xormr5kr5mnx3q51f8sagi0civs0owsnxp8uzv18xgg4b95i7lsbtykifxua6c9x8tz8dqg76b96wd6l569kb77u9ytzaiy19oy8jeetuu6kbrftz09up8qmfpoocz0s0dqoxpzus506ys2uwbkoqw5ieipzi6kyxru1ckrzkaofc610ekjpfg80axzjy0s1exaz1z6m1ifmwlbl7eitjzeez83u8',
                image: 'u4afcmzxl4dnhlpk7evhnnhq7xy7ad9kiu22bzvttj97eia1lip3aqkoulqz5c2toysx1x7h8ukmtkk8pbckgf3m5nv4wp1kre9urlsvebwj23ophrqn8ah1ejump1p2u5s8jmia3nhgwezp8oh8szcuj7rug8huybpy18tqbio0846s0ys7tsyvou7swkwwdvhjk1ss20cqt779wxtddwf2x4y6r139inbeqamvdy9037wwygrxwq93mw0w2o2byprmhx91nvvo8g93s4vi8wv9j4dmrx4azjd7tcrith9qb98nrzfd8z8hdwxsck3ejs1wea87dgjimtiqz380px3wikl7xkmiaprjzz6kyo2shlrpw2c0vne1v3vemgsfuzu4fkq61oedic336sawfl854tzqha46camcuc0607ywivdp9xokog0unpckj8a78hejpyezr0ai6fa77su06cxxatit412uvaozkhii2rnn2glwbbbuype8bdgo3qo8s6mtkp5jp4tmo4s387htyh40sf29por3us4wg7xu90gbt8ab1puxctygv277vulvt4j74u6498cq1eklshrgp6u3dvhuug5y6q830j7jhamyro2l4gpfw55djjuxxnxv5z476k4x86ls34oqxmtx0gwhef27hhc4gpcm7lxocgvudj7y9afdngkcomh9a9gku5b2wj84t3rxyloj9q16rp9p3zd4nf6eong2vxshocl7mwscvcwn2ba4ltln1nxn36lzufijlbp625bfpq398er77bieqluwz9o9jnwnyymlnt195cklw2wv2ez89ya91rofpuldfuk5f1juz93qnnb0df9m4n0vemfi74ujak6j2o7uicgz99g2i3t31t74kgvenfou0elqe96p03mxy3ih85cussarnt1mrgd1m9ju3lrv4wog8fna6blof67o8e6gus6smjoqlhqfcdougi99pkh47mm1zrbtx482lqkjkpc065l7l7okv5wvq5np',
                sort: 888195,
                administrativeAreaLevel1: 'gfe6jhlecyk3dehmhz06ihettz34cm732cu1bhdkrnv48b1gwv',
                administrativeAreaLevel2: 'p78qsnnrl8ims0lp2yjr5mo8f5v9gxup6goo5l7djs3x7peeih',
                administrativeAreaLevel3: '5wr36cq6of95lepm59qzbjfvkvamfs8f3m3cgq1i3liuh4bozk',
                administrativeAreas: {"foo":"+\\C{yIAa^X","bar":760,"bike":"*y[.cyF0,{","a":"]'}F'lR]yO","b":"\"NO,r=e!'J","name":"'m#DhaH;\\I","prop":"z8:a+{aN3H"},
                latitude: 24432942682254040,
                longitude: 71967122877812390,
                zoom: 24,
                dataLang: {"foo":"DYuB.|-g|%","bar":9050,"bike":15196,"a":"M`8]<['dE>","b":16654,"name":"VDJ6,c^+Jn","prop":43369},
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
                id: '67cf6850-5bfd-4aaf-8b43-721e9497bf12',
                iso3166Alpha2: '6j',
                iso3166Alpha3: 'jo5',
                iso3166Numeric: 'c0s9',
                customCode: '630da32l1m',
                prefix: '6nnur',
                name: 'g775uypcdu8ggkdd1uf20fonjajynlrf41ek8zh8gl9rgydsqhim3mx6je5p572om5cpvycx5i2reo86mr1lzwawbpwgwrkjsheydj0jimb2gi61fnvn3jxajxcr12w88muoet9yiq26ll6cmrrfzyb965srrjvvk5lmxr0dxjyhh657epd71g5f36uakc7ye1ob5ol9g8mv704bpvgrdq1q0bbr3u6ovgscdhhw98sckdcpnfkcahr9b2eeaul',
                slug: '2z313ubdq8bk2d4r6vcizgf72bdy1lt6skqdydx6uw231wobhfxfwly2d7m65i7mlg70i78nvkzqgrfnytq4ba9yo4962ohhuvaz5yickwdtzelpzvg0rres7e6s025jvsco8qn7q7ikljyng6zw4fnujo1dm75zecjxxiq0hobp0u45t5k1zakwp0g3uxumazvj7buarq27n2i4mlkb1ov92pjvy9bqx2w2whn97qw9vf2n94bs94chqpcvhbncxqlb6k4wz36b0mcnrbk1g9rl08yjxge4wd5ln36pq36fpdl2l4hiu2pot65fjqq5drx5w74w7ckoqbmnalo7g2yefcsfavwha7ly37xssdg3s04t9j26ptu482af7uzb8ncnbw5jlmlz5fbrt3en7u1ol3am8iikduya788jgjw19iptv7qaluam1qaz5q2k8r2gy21ddv5w1octx5a2u8qmdk81lqfriv2d13dmbulj5gexrdtiqmh8t6kr6tnzbcj9az7to7zmkjn543i3wm66ax0xdi8kjioc419inzuh6aay56fjlfiufu6yo6c21jqtuhdisr8hlzy0s2hi9zz8wjn9s51p692fq6vvi96gx24d1qb4eg6uuum6u91cgv1e611s7hwdef840o48lvi3espo8n2u2kekdrc8pjloq8xy7243hbw9ukez6v2by5ucs9y15bnxgupmhgzzwnodhgicculynzrfpq1cwfpbef4usohwl5oej05a9msb7y7dz1vtnulr48og0kiz8ji32gc21ea0530eye8tw0va2jr3rlbhdyizeh3pbjknngjqmsz493v1doe5priquy5z1jzg7dfra65z92o8mx1bih2bwfhl2r3us8gl3od0dp5zu0v7goh121midgxwpz66jcnlc4ty0tse3t1hcjjsr4v9t4qy8jmk1piwlj5urqsnv3d764l8n4b5jowd3lprcnt2ebwkqbsadn86fggkbbk3hl66lgb4zjvk2rho',
                image: '8sfwy9p7ws51c0p0nbuj81ikpfvch6s27kd9rwciy1u96lnqy23b5ns9c61wl5vokqfbv3nq8szsfcm48ho2jzw8y1lh5k1qcomckapbz5j21tbgxpbrr3pi0g7ocrjymmcl0x3kumiote4acbpa1cz9lhkyvhukfp893aiyiac45hz3f96mdqn6kzhw39huk6nio6j7o0pj4smuw8xl25m11trx8vtu8m3d1c1i170t10qkyaqbskpn8wo068qfsp7yfk0nnn2n2n3rqqntwgdvm2lgghhjsd53yallaoxtz5gqdpfx6cthsmrhpgybesgoz0mrwugkxyjbhhx18vwz40u430g54v4l0s60qfkbydz7r3pzbapguxovs2gb8l0jrl98jl90vx9nmmvbnfvvkzlpxkpyw7czkhth7vb77uiejai1b6c7qknd34vcpyw8i884ft153s6srng5gviy2ihj53zcd55w20zj7fwvkx0jjfkshgtr11ncyawgo3762veuxbybppths3hvi68ou56dr0oyc0bhkpxl87mg5j6ts6uw5kubpgihq6j38vjcws5msskco9e087472eg1wsdi42x2uq1x4z9f3tw4blb4oei9ym5o7i4mafznf50eq8cfijwhuhxx97rek7yske3da5lvmh1kzckik6nb1k4ozru38z624z6yotwdx1t0w9rgtoflj1097jp3hn1tpciuxi1e68sbss22rgypvrafz6dl4oqarglu9egsaw6lrw54zy81bsxxo46fb11re9bf39jncr5yudpjqw51v5ze6u5icx4p173j3m6nbtodsg1i8ad2fs69fd2j347m3uuzrbfip8f9rnpiwzsm23cu6wz54cwtv0f2qzsh6c0aakor29kn465gnfo52h7s9ww8ehzxlzszawg8zh0xgfdx19j5vuthgcchqbhxs8tx9iwyrvg1rpmlx9rkxyf67sjt6hx1awirnbvrhzp51glyeqc4s6f1o6bw3729',
                sort: 617089,
                administrativeAreaLevel1: 'f6vvsa1ek947vnq4i8kpchs117sbq98c9j852tqxzlcu1crnn2',
                administrativeAreaLevel2: 'cwfs3h7qtdg19t1yfsitbnau4bng6w1xk14gsduy1eh3t53vjt',
                administrativeAreaLevel3: 'tp4gj87p0bxkir3c02aav60qku110mop6ypbl48s31smszr292',
                administrativeAreas: {"foo":24764,"bar":"R{.e_SG>%4","bike":22429,"a":60366,"b":4750,"name":26695,"prop":44141},
                latitude: 30280831605581204,
                longitude: 56685137310394860,
                zoom: 42,
                dataLang: {"foo":36113,"bar":3499,"bike":":tAdFGCgLe","a":"\"[A#1S{HZ8","b":70765,"name":45817,"prop":"8unFq8bu?;"},
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
                id: '0e4b638e-1ab0-459c-8503-9a39fb6315b7',
                iso3166Alpha2: 'bk',
                iso3166Alpha3: 'm1t',
                iso3166Numeric: 'no1',
                customCode: 'nbmzeawmlx2',
                prefix: 'veiqd',
                name: 'mc5w0ofwppjtuh3lz1x89qf3eflh84oi8fpfpu9adr33screg0qzcqg6x1y4y58c3xwn0uvyf5z7qxw1btnpialr8pswduwj8pyxyz4hq8rav442f8dv5fqhs2ft25jsuftlb80ir8qdm2jbr5q6gd72livx4196nmywp7t5wfqjn2oxv8ligvy4pt1sdjrksvu19xe0xrf0ndes45i73tf9ekgvld2zlwxv5b5gvf2xs3ead0kiwqfrltl802x',
                slug: '4zpsi1szd6wxt94fp73ewcr9zwu3la90r0iemsk9utg1cw0oycrpfeht6zrnz67gf0t7npipo6br0if87rysu0b7tiiwkvhfb9fsf3mz81vrl5mxymxt7b5re6l3oqoq52gbywcx9bq2um93y1v2bdhpar7ayr2p3omyvfsr1ocy7k3savu0ryovcsfnf1pxb7ew167903s258sanl52ijkj65fgpfpdl5knik1r709ys0dzq5xpfqt65mk9s7jdea9gnyusz8qapbxhbwzgcdyjyh1t1om21x42teph67r7iulrtbrjnbn0vuhzz781pqb5jabrnrtwlo1cc3m9dj0xjg56uh3rwfulhbgdl1giq7jso0q19cjafbud997jmch5fkc2c870izw2uctbll187vhyy7s61lrgsvadfnyp4ve7er75i3yesquov3xqluha163x8l1jgpsfgpoc3ruuhmigdclvk8irzk784adtds10tomtgs1p32fjqbhlzwczcofp6ulay0qi6v9bk68m60j8qqtnl364efiwpu7o6k7crip2hpvlzdlqfuw7vv56inguvukckx7628oasurgz7lzrcwbmbwwqxbilx5oo4tbkxcl9px1anpxp63qutchkqit5kvc4pczb4y0tskw8fooup689acg46cqh4zr0upfdcqphjcysbp6f2xmy3r20as38zuacoig6vkpqn7k1v8wjsbr3qbpkw4bezmaaj8aehdduzzwp3huougumovirdg9ruugd2wxgmnu0tc3shrk5u789xmig4uxvzk813k61nlit2ornspbfuke6rgrzt4c2a89aitzk3unme036ushtmqkycl5ic6pv66c2duzm1b0f9okijyua2psk5tnh69kkcztcrrar57s6hz6afu4m4bk3sk34h5ewixm72gl0rj2z9p4tw3an0yeoeizd2ueebbttyp5uu83ry71ry4z5jzvwmofogjolnlko4ko9gbq99n1ikznixhg',
                image: 'xqasw6yvdpiz7g7sy954tv8uqb1pztqc7c6untycqh3a4mgwpwnpigwzhdgjysod0ol2xn1l8lg2z5cze0pjekwd43ludvw8wqe0hih2nvlyun5m4ytkcz16sa3veb90cti62uh5s9toupz24vsoy2lz5j40qkszccy4mkcoozfsw4n3n07zjbfb1chq7uurzwbc3ugawu6dfbkiw2x470nh1ol89r1oxngw362kssdv7rjf8qir3d2cdvkcm9d2v0jnkevl2mrcsnpe81xck7asnw0t8l3jgy1f9wr07f2urx7q2rt5pxy97gn9rspbk8pwcgcigppt57jwlzep6xezvr2nurlow5fsfxu3dqcdoroc4t6l6kwyzw12sfb1wjkwl2r8c3fyt4wh28tcvmjepil2ix9j13ypekbvbgk0cyv571mk8ajjbmmj90xbflv2o5kniar1sl2jc3zl8p4qzj1eisuwezy6u3vlitc57t6im7io4g0xgodd435afdahlb7ed3nq56zvx59t1wrgnkwvuonkq0jpllz7q12i37y8vwtponl4kcxpihkmgwhqndh2ybtaxm7b5nf25izknp02t64dwjhdbd7ijwcfvkp87w5k10d21mkia99ht73w728g6mi8cp94f0c87tow553yb0qybjmnobnkgzdvnb6kcdg28l0cxb35gk4mw46str58qb9qjr6rylasnph8n63h0qorbvmx888pwuyc0fevecenvfcla7mhlvbxf886ru10ya7arh11c4d5tbs5422gjtyyj32qsdipucmevtb2swf4hsqdxzzxncr91uj7k60l3yk1zjwkuwptcvofx05lp80twz8rhrf5xfnq8vuk4swunvvk4iu6ekiiidxa32ew4ywf0pq767wekwbv406bgjspokozxyygr2ll1cn08av8ushzwotgzkw2dv08vndcqpelde31h9gq1snmwgytqj2rmxwmfgejyholkagfz647bf7vtfs9p58q',
                sort: 392609,
                administrativeAreaLevel1: '956hbypd6a37i4s45kz3ijfhqeyn5nmu2krug0r3f6v62e8m94',
                administrativeAreaLevel2: 'vuw32gmodz9mh2bqefbahja3e1joqg0yijfpmf5bvzqjtg87w2',
                administrativeAreaLevel3: 'lks27wzzmn3gm4jxdu06q9s77knwzch1f1j4clsttrtsok6ol4',
                administrativeAreas: {"foo":"2^)E#<M:/?","bar":"jk5;SUK(@z","bike":"?J8V$.){Ow","a":76185,"b":30799,"name":34961,"prop":49349},
                latitude: 53143658778390860,
                longitude: 49083661418094160,
                zoom: 44,
                dataLang: {"foo":52702,"bar":28602,"bike":"cNPa.iz}@C","a":"p,1_.pXgPW","b":7466,"name":"*k/x=A@=*^","prop":97123},
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
                id: '53f1199e-77b7-4fe3-9023-7dbfb8d507bd',
                iso3166Alpha2: 'u5',
                iso3166Alpha3: 'n4t',
                iso3166Numeric: 'voh',
                customCode: 'vj6hdqte62',
                prefix: 'owjknd',
                name: 'jn3lmgu7ghd90ebw5nrwiygbo7xi6lpfef51m15e2wp0llt1mhun9ia28iho5lkulv9t7c71zj28emjqnub54nys2ko17tlk15kuuxy4li7xl0cskh522kl326ouu4wcgi9q9qwjqkn5rtnlwc9gflpjy8ox59blz7ac7qk11iuhmil0o5dmfuy582w597eb7wpdd6l73zn0k2kqi1rt05tzkv6wjszkm5kb0kdzfnm0e7xjwnq1euucgmszg9i',
                slug: '6urzx7cp1ad0gokmgr969lof6icwei6rsobu43u8js71x2v4yhnfiwaepywkp23beiqlszx8jmzyzuqsumuestnt75qt3nu8fmnow04mgsrltzu4gl8xde37kip3waa2f79bwvhnq2cxssaactv8r30kvf29o79e9z7drv8yig108og915hcopl3nage7oqr3v0ot1w6tlwft3fq8859dgfchqcf6hichqgtrz1qa8g5ccmrriq215s4c9ri4osissq3l996j8gfrho88n3pm0azuu61pfpgxxa8ye0zftzeey59tl2rllygg1n6zof6j8pr6zi5ckrxzlm2i546cqfuh4ao8xbze962ejige858h5gdozmcneyefeud1iubh8b6ul0ttbnmsq6cj8127bisgy2j2aw38f9qlu4cgwnwdf9l4184hsbcn0xb782r1wqmnbe2uwaz40bbipnmybr1ct1cizwvdb7g1illhxzuyz31edo4sodqciaof545kzq1rudxgipakfpq0irzlhfj8bh6qtu0a3ufgxl86bo57j3j7uui0wl2cnq9iuchc87h2ndibcdfo3w0rk1csadeltto6bv926gbg346cwdnmdim8re9ujyf29i49lkvvf5v7swjqtcixcg01a5dgixc716z9egaqg3wy8f6ro43e3frnavr4ik770asa4916usdrdk1wvyraz9w44obvc07qinnumulsikebva0x1r8e2f7r0zv668szfklxxr952ayclb7c96wz9au3hkua7cyz6hiuni2e1rqq1wd3pf2jym8ce9s82gti7vqrmoe9ndisg860xbvwweatl0p0zutyi5evomltt27w98e81om2k8neft95txcsqmnlq0jdkoiw0861x6wxjoo3gj6or1hyszudmhh8fljig4sq3ihfjpv9n0h4efyusk0g4n5w7tm79zxxetdrglkbpvg1hivy8nhm5cfnsqoio0jn0owpjrj8ihig6k5jx8r03g5',
                image: 'hmxmlm1rx8wchk5dk0ebi2pf1tp4d7gpatu7ibtz5fop7kvh01byvq2z6nfvgsudtcld36xr2rumjq6auweelo8csprdsn4wvk35yj13gs2iyt9xw9utba616xtu7h71ey0el4oxrdjbmy3c7rlomjxjde0i31oeipvm1p3hoofss92ynlxs6y0hjm0tdfdix26wd2f102j22akf3o54xdh9ytdfz3kw9rrpkdizf2zfrbs6wwnd1b5j2gso3wkdsmofet14c4hpcw3o0iotepxgv3me8lwmmqhfy1gkfwgclog8ohnnzdxzsq5pfdgy01xn67ycju61clml7md8b14wdpexlwk8r4dbpup4nh83m69garpxfakq1lnvrhk2lqzoi4cdl32p2v9n4q8f8bn17e3bvn3ljwse46knr9tto9dngypygsvgdaewfasw4up14hnnzoulnuy45lqv1c7e9kwj151l7307eit5ggfipm8b5delpzietlix0ewfvbn8vmldj6pdfa26t4f4l3z9pjrhf5zsfmpu5ad4hrq737tk85suxty3uhv8ymm2qaifgczh3lbn4um7k7m5fnctsack9q474bggn4yulrs14krs95xk5qcg6l2dtqnmxq52x1iygb1eb5n0t5r9fctupg35fnpbg3uqbt6yrvil95cayso6btejvftigem7r7letbpc5uacy9cpjhof7kbwvspqqvzp5384whio98wsu20kowy1kwmhf1dcopgdwu123htfhwwnd6u8u1hk5248dnt72g156i3uldja90oo4bin63xtyc3i5bmw7yqauygwpchat3bsarah0a7vbj0a958nwix4s1avie134hw0bvmf9cov38mq6iedm2hkw6wn16gmzgziadhuonsno0jtkgcinius5rgn9p2637kcibn3e1m942a8ohl0je81act8x8rp8jgr2nxhbefsrgl5kgjia7n6pzj5un99alz53zfu8ybt6pq46sf6h208',
                sort: 658963,
                administrativeAreaLevel1: '8wdvfi3ss71z0kjwwl6srmx73216k7f9js2flnqsc4l6snyzfl',
                administrativeAreaLevel2: '0gqc4nlh96zl4e8gi5ivtgvwxy6vrci9lepvx8rf90nlhxu2zr',
                administrativeAreaLevel3: 'kw8twc7dger9735ju5kcyqt7ii2rtzlr327vczh7iscvtvcxtj',
                administrativeAreas: {"foo":17709,"bar":"cb{j#8\\?EX","bike":64294,"a":92885,"b":70697,"name":"I/R8{jeWZ)","prop":20478},
                latitude: 88972367171652260,
                longitude: 63434924141897720,
                zoom: 77,
                dataLang: {"foo":89966,"bar":64052,"bike":58546,"a":"Pc=H\"3Vy]Q","b":36669,"name":72193,"prop":"Cx`kHX}G=&"},
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
                id: '274c3715-c993-4795-8492-c87703211b1f',
                iso3166Alpha2: 'b5',
                iso3166Alpha3: 'rsv',
                iso3166Numeric: '2ue',
                customCode: 'm00d6c33r3',
                prefix: 'wmfzt',
                name: '4t89mzxvu5n7e7xxtvn6ryv5gut53boej3hqdd5hcw7chnx6iv1txjhnak91cp29guy1fbphbqyyi8diemtusq730uaaeaeesus1zdsk1rz7h3w1me8sml16wk8h92j54xa2d5fd9ipcl6wvjeggcd5wd1bjv3csvc224ny71ajruvcy0fhwsuv1rdfk31zzd6iczqh6abbuqq75gzopd37ikci477dbpib2ow5mmcdlup93la52c90drvaig6e4',
                slug: 'c6gbf1dug4np23mmtkp19sffac8rarh9r51mxubqxulrfcdmknih2fudq7q26wzc8ftrlocrhhjn6625vz09iy5p2wt5ceo8rjwrw03m4vl2otiyz5rej8e75j3hy847uwdsvs3k5ieoga9rkyakutj0auf4nwrbk3gl1nnu1u14xbbsow8c5gph86e0i5av6ttq3rq2kztoeer6oq6n5hw24s7f1qjf9oejyrggy9nuud1jukx7dblmk1cgfsangp3a9mic2c1ab0gnstv0ej8uhxsxbam6svytzsh3rom7z2sflj4ju7r7ds82uq9honej016i2hfktv6j2r0dupuir2wk93svww5oohhduw2e5jsqz4tmau0evgvpjjxm4jv9qiqs7cvfuc8vu3n6sqzer5ddjqjlvj4st8yije5d23hlfj2nu4nwae1nlvx0ympmhor35ky8fmm6n1ckq94yksqvm0gj6yjixdyicmxxi7vmbsk7pn500n2ianay3d79wtq1rub9lpj75bobytaeyk6pukwsr1mkptfp0ftgqh3hpl8a2v0yzubltxkt4n5y1oqlpj11qlr48h2w7bi2t9ah0l49mkvosifz1lfizlfqksyxcgasq7m064p579k6tk41v99g1tffi20me5874ys2hsi81tps9kn4i1hfj8bk9bsj8cv9mkwy2tn2ee46ig879rk6sksvrncwxknu8jwxsfi98kqa2c049zjudne9eushxkroasl6eon1rezhxf6fa7c9kgzgbyvcu52nsmtrx562hy3gcdqtu99rp0l01tqc5ql2fgtpjizger852jkzte8c26lw7t8pty18lv0lhltv819gyje0aafj07vx9k4qk2e6tiesuhxkuo1vnhrkmf392ejsxxu8r2u3dbbv8mgu0v1in8vc72skkvyjapzu2x66mqt8ewbh7pforxo1oguqszak63kn3r5fh0ywfa2kwe48cf0y52gxl1a8j60ze1kj9lic9j5b',
                image: 'c8j1w9x5l2peh8w9lj7cypzgfcx92tpkmw7i2clxu7usiaevzl98d85oun2xxp63qqxg19pla6mn8lfvf6wx6nb3v5vkj7vsvrw7q8sm5l9zumhyun55z287afrxcciu24mtf7oa70ttjzgoq0pr7nqpqex6uaqiif0v9r7m8k2v4e6cj3hu0sdqhanw996z01l3fl3851f0ob5cs32xoyc84l3zbsu1p50d9stncb8yynljqxfoxrdwjciumqp6grqxqn0auoobcdhkcam6pqtrgh5g5fwu2vm23a8ldi2itjfcohi48oyam2ghqenuwuifx805b9c80rk9v109mn1au0elwkygc364yot45opspd98lybo3c2gdowqmt79yr7krco3z7ckoj0ooqxu3k98bw7wa03m2uj1pwsddbsjzkhu0xiznzo6lzmqrwvmo79uvtv532z6fzgev26urdornwp2sssrrcc6ulw0b3alampnygzlpy5zhjn0elidmdcajy39wk9hxgcbjppbyfkcfog93yozb231kb33d8yfrwhsgpg6upfv3852aa37u7dyek6zui5ybvkois4nqhjr4aquxq9feg09arm6275h8mhgyoe7i2cg1jt5ow2bpku9naf70oku2cvnqf9at5vrcrf07ky9m59qvst6vghpzyaz2w6bczi2mqn9jjknxg20n2b76z7kxs2ccse74kz3l8fjvouq5u6iqrx5k7dhowpaf7uixbabeke59v3myk686g9ryyjcaqx05im3axudpqm1dhp5s11dvo9ju3mcjfs56xq9u3vr8idccmqipt0dxxlz05po3ycqkz9szcr71qh3gvh7hmosnwjn3mfgictfdavjpd0tihtz147ansav4midj5lw0m5htjvq7ab94zk0aw3j8ri89padrgjnnn14d5gyy85lvx1qmi85t3z285xmwgocpvwyp5u7e8o2cur2jgxn6g312c4huqe7o7fjqzzahtmay00p2dam',
                sort: 167686,
                administrativeAreaLevel1: '1j673o857zwbagbdqxbnmobuo05rsy8uh4uk8rh9bohk4as8pn',
                administrativeAreaLevel2: 'fs89myu46gaja1o0fe2890jo0neqvvzzhbx9xz41vh5stdql5u',
                administrativeAreaLevel3: 'dyhmyb8hm78d3smfcef3a3rbcg7igftdghlgfs4v4nej9bxo76',
                administrativeAreas: {"foo":"2#h992KK3&","bar":88574,"bike":92915,"a":"nNy;?-3v/g","b":85503,"name":".v|GG+r[\"a","prop":27232},
                latitude: 40854010299167270,
                longitude: 86502289311332980,
                zoom: 73,
                dataLang: {"foo":"cG|d({[Ipe","bar":"QAt2VJ[s+g","bike":27474,"a":"t93IL%-N5<","b":"i+p$2G2Tf7","name":41081,"prop":92967},
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
                id: 'e83bad0f-dfef-4bb1-af6d-bc6fcab492f9',
                iso3166Alpha2: 'as',
                iso3166Alpha3: 'nv0',
                iso3166Numeric: '6yv',
                customCode: 'xitnugdhsl',
                prefix: 'vw6ri',
                name: 'a5duuj4lfwz5y6ieoa7j12ug7ms678kxt6jw9xn96ye2wiiqxcki19qmcqvqrfj2uf1agpkxqrya58seckty1hsvrotaxb6g7aehu9myqpwlemkh1mnwgp1zg5vdjcnha01u4mnumi063kbf8lb4yf3rtqct50lhpneiimnd2r6fv8cxzhljyrll5eob34kcjfwtmbg9t5hl33vy8bbd2dx79hjh9s4ff2rba00rlu3xwlcf6i9vqs53csec87y',
                slug: '7oe2bb1ichiqgtbx3llaq289palhsrz3doyyrac3nznqgtqdic73u1kpt2mybjzvvte3zkvmc8guhdjks5ahrityzrlrr9i8zqr7k286q7iaicmmsn4kah9c8hne1xtyjz713olsm4dqv6arkpzdc4zqzyjyvmf1xi2ygsjdfvnn2y8sler3upizp70nqnnsd45vaiskr9oubdd9jamwvw8bghgkxr32d6hq6esoydsgefg13g2ba0efmcqdu900nfdj3bw6dm9jlk3oay0ew99tffud99aoxi1xlttgmq2klxvkewpembw1n6m6t0kf6ixof38coa3nalu5o43rakme3etuwp48wm9l0btty9gopar6w5mez45wdajdv92agcxx3bhmzh3efvxcz2sqyha9098b4m101wglncws18r7bs0rdetfttqunpn0tygoi20h9pv5x1c2l6nqt1mkkmqbglkmqddg55io5j4ixzbksfqgi5n59gl7ve5eob1pa6yp21k0tyihrfnh5gq3njej3df2b5s170tpbyeubf25wdhnr60ye6jr5f1b5axh4ql35sg4w2v00qq4zlfdph2j1w4108zi1sgoo39e20lsf51diis6zijrcbsg0m6foz3mca3lvc3gdq2umohtovov37kasymcl1dxu2qfu4bcazgyirm0o40gszi8kx3uw5lg02lf9j66cfeip6go9t8c3zormrg13s0xw1uvz9xckij9c6mwmcqww5zes06yuls5vvhii3boy8bmda2krgh8jif15ktidve0h5zhzp7kz7b5kwutnnul6l54spbab3np1ozxmgiggzgw2186wltok6pzy82n96zlrbvmlpwkl825hgcnzg5qwqm3v9wuxv2kl6s5skgq10o6ij39b00grd8hpwnyo2zl0lf11yt4627ir48ut3u2385qonbk5aenkcyjl8rbc7gdgigmgki0gpslda15jubgpg3mcbpxlok6s624skqv6lry6ywbl',
                image: 'u35n9qcn6ho0r693jt3iam0fuscre77ktypi0wnb615bxxtr661crrw46s4ud87127kcpopektdsn3kez192f1ixu4hoq1fg93v0041362dj8cd4suegtfd8r10xj82nuf20fy2joi22254un2lmj5oxxjimavr8xvq150nneurkl6145pci9w5m9u32rn90h6qgiv3tga88ae6eqkdghxdufod97j33a19e1y8mc9wpwj5ugh4ngk88cleot5n02q59sae5tznh0jl1jiad22e6pz0njwu1zxvp0migfv6evijfoatwj3cs2tx12plu4mgd6p9w59ixj77t5w1d4zglvegbosy67jm0bkvdl7ox19z0zs019i7ho3t2u9hz1hxiab01sbbus5v5m14kg5vrlqmv1ytsqf7l6o2njkdxanfjxiam94xounqblf927912ff4v3cb0z0tp8af8fz58nacln57au2zvs264xuqiq3c28t0yaaa65t07amctjgu8tf8zj2prksmhju3xbyujdfmxhc4df4ypbsk3rnbyn7gy7wxa5zxrdbk2b3b5ghjkr4nvu677hc39ab4l9nsozm3l8j8qbuyfyxonczn6b1xnhm53j2jsdo5j5ocnv4l08wrzac0fknwuqtnolxols0lwooqj5z33ywjayhpu0ybdqkloz34cdwajs2p1ek36mid8x9w1btfv7nf9tl5jesahw9wc064rln3h438q104vyui73rljpf58kmo3tr4p31sh0pafo6qfagwba7ww3qvf46zq1bssciv5l5xp10pal7e1be0i344orlnh5imk3a33kbqffa297v4knf4av2657cjxzqx32e6tlmqp0f7qczciaxjgsawxza7it8veg7959uek6f5ktfnrj2uyyjibvesrc0f7gqyb8vxtxoxe4mkgobwbu50pr7kq0yt3t4ij2zwzv0qoqd6ghd5fv5rp0yij4wzzxlyc8a503lhys8s8i4nfdnjoeehl',
                sort: 238742,
                administrativeAreaLevel1: 'ts8u74m9zw593ouxp36ru34x8riicg3n2q2j6mcvor3iq6tmpi',
                administrativeAreaLevel2: '41uv8449hcna5794jxcnmd48grult8iykayreqkz3tk940qd3b',
                administrativeAreaLevel3: 'p4l8l6e9oiihy1rrttjyidkjpi7d08npdplm8qlrknhzz163w4',
                administrativeAreas: {"foo":"ffcis/|Ptm","bar":77733,"bike":88191,"a":"8\"p_4WI%fd","b":"c,:{4{BI>%","name":79328,"prop":";3QXijMs\"F"},
                latitude: 39564410453802340,
                longitude: 19738010986722520,
                zoom: 88,
                dataLang: {"foo":"/LlW^o`ury","bar":"+oi\",OAF@P","bike":"m_.2JesLBV","a":82907,"b":17446,"name":"$Up[.R&!*!","prop":46659},
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
                id: '413db20f-c550-425d-8564-532fb2406d59',
                iso3166Alpha2: 'ws',
                iso3166Alpha3: 'jvf',
                iso3166Numeric: 'tn0',
                customCode: 'afgraqy8di',
                prefix: '11ixp',
                name: 'c9j4422nk41uwa5fnu5vp7t9ubsgwcxpetn9qedhmi7ynx61lii6honyyeijr0lz9ze1ufhwzdn2n9tkw1dcmzn57wnc615yuw0gbkc1ii3mlozks17veso0rc2uxvl5zmljjnnw3ex6tidxpep6xd4mrdfnja98yxnn3izkhgnqne7m67yqvdkkmoasdk2hwx0sllzn73voz931y9jifmr2m4r4ll7b2be5ct6nqr8u7r0ap5yvm7g902lskyc',
                slug: '4wihtu374hvht6txjt7mdehuob9m8ai2izazw6epmbb0sydilne2uiiup6gm9ort4prak0b8n4iwxvvuhe6s9eaq22mymio8v5nklb9iq9by7co5tu25xdcbpme83ed6eqygzl8oex9qsz6ym3eo5izo3rccu2u51kfj7s2nkcvguwbp8ceu2ybxc61h6efdjqzjn2uby4fhep2cwy7n02gqafursjme413cu9meydipz82trfngfffaolxpntidfqfspiiqfyj6cdgkd9c6wps3hkgr4l7k3j3u6w3u70qsqswy0xb1hsiz1yybeiycby9c95ufdfkwk2lnnuday8vqyek6a2m1jvwkb5nyj0snhiovfpz4yhfa7vooftlghebx5a1ftvlz71oou926ipnd5hh1uqnens7zkt6eoj1hr6e4jewgzlw4hcag26tjmanuc6y6wd3mreq298l9qajourch8ds878gzehqy0c90j4o9kuxt7mg0d02xcl5804rmzgmoc3hu94mnqdruo46ess79rcianugpvvgyklp381ajiaaszd3f18ze2qh1x7w7jbk3zuor7iqir6326ngmhlw32cdzz1ot054fl5g38yivzmhhzfb062xjox9r3ii2klrpp6a90o1vhd9zqkvnv5ok3sf9hkphve93mf4mzdmi04oej6lnwogr7r6ojuj7m3s3fr5703htee9ox66zmyocofnvys7lyyani90dns1hllr293i7gc3j3p69ocxigmmpcgu99xgkvjg39dw98jvv7uiu9b66e4rs9g29dzje46bkw6p8he9uqpfjq0c6aiyfyu6s7u2rxvmdf6j5fo9mfjunfsjaawdvyj280l3c5t2l7rn8duftybooy3prc05w5g14wwiwxrkpycoiyk1podu06xjwa489bt1wxlf1g5tzpklu9eg1q0j5l5yqwlkbkakbw27saz9e3dwc2nfuksgzkd4t47nmty40a04ep6f0jorhuy0166pb',
                image: 'xu6te2k82jb1ljtygt9hl59tdgabxpv627aq20q3i5gjaepstw2yhzb4q68h2cb66ss4q14rvqrp13t4wleb35flqtxago5dlt8blzq321z5og9br9lccvavrumwa7bbyzvzop3nr388bs9o29y0poxk39lad99l1kl0z4wy8mednpoecnkrdrw0eb7fdv05cfuywyhu5c5pf9972rzypsyx2nbxf6qtiasckujfgd5j4aje9dfc8p42vkelvuopumo5lq0zmcixeoqv06h24s33s87oj8r2msqyv3vnm4y27ye3fut63gfypszleqg398zn3s3dc3esuneklb0tti8thtc8fqnm9m7ppvbbmpt79tzu01vwpv3aeusf5s47cg2d0lvge69k4uvlypmz84zxsgyn5wangxwkaonjimiu037jtahd3peiuparkv6xt8845gw8b8095sco8pdkj8gzmzaswc1qehmoctg5jmgc431ursfadxyq7cq831bgbnnk3k2w8zo4tj43d110o58brywh24howvyw5xz2loqawc6sj74jh2jl3g7meav2knio63wjeehhivui2vah3l3gskxu1v4wbe75j76x6zd6gxykrc92oes1kl1g4umnw54jt4kgo0g4vlwgzl652u5i89zd1vxcb52keemvtkvsyy1uf3z7yq0d5prvhy804xoyd8jm0zp9mf1sh2xn5foaf3qe37zjk7vsulpyyxn5gjn7mupyn6zqul80niy3em1or36p5x5h3xnrz8x4bixgn7sj63d8jt8fp915haoo1cetip731gls13dr7o383fdzzajcaukol673062smtxbgj0uoj6jzw8oomn6mzibd79qhdy31aoxbfli4pgcj2c47kfrvdwmvi2l4iqt55ku00o15hnx1n4lpbrsz51ihff3m26og220kak9003j7ohdd74rwsi58i9c4o6u680mnwaqobvavsr9sgc570eiuzshgx85fjfyndjs8r0oa',
                sort: 776138,
                administrativeAreaLevel1: 'lbrs6q168eh7her87nyaiebqs5fvcw7sm7rwm7gvno1h9wvx47',
                administrativeAreaLevel2: 'ruucj9plgilz93lq7496c6v5lp2q880c8ix9c22faihtip3sxr',
                administrativeAreaLevel3: 'espudg5gkdo914dbaluk0bxf80xzqu8ui8kqknnxa65n85ctih',
                administrativeAreas: {"foo":"YG3axK0u@E","bar":"\"ZBs#?F]=t","bike":50223,"a":90639,"b":"H)O}&6BrpQ","name":9942,"prop":"^B(<y==p[h"},
                latitude: 48441510217375180,
                longitude: 11717361179985496,
                zoom: 67,
                dataLang: {"foo":"@,$OluF8h1","bar":"}vAZxHH<`-","bike":88073,"a":"J>f:$%x\\ST","b":"?_rlE}[Q&A","name":"@fK\"sIQ>G=","prop":"%|cs4HO__i"},
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
                id: '776a22e8-10c7-4b01-875f-2f56a6dcf74e',
                iso3166Alpha2: 'ua',
                iso3166Alpha3: '28m',
                iso3166Numeric: 'dd3',
                customCode: 'kb2ohk9csd',
                prefix: 'gx6kx',
                name: '5x9qabqyxll0hlylz29scxxmg8oqb0ft94iy0xyt8v5c6g2ajfi63t50539qsa1w2hks98aicp7ry5a1uqf3bte0bs54z8o7e8sxzeicx0jc9q7g2p2pqpmcbu5vz722c5frddrsb3xldgiid22ovy8g33utrv07tlo58vjmy22ef4eaja4u8gn0j5bfr5eenkj590vj16cqpy3o0gjfqf59kahj657wbsl0vn6606pfnh8gk0othnii2qo8bio',
                slug: '7afbw6qt5jqdwmituho3wix3klxffotk7bo2e1deh37tc9sr67li0caguivkruhea7qulm6gkfgydezh7xzhmwaipvsbqtg692ciq5ku7ujsvv3tkl92778zhx93k5qayrc08shw3vbmfha16ufw197ssxfp4wj7qo8vuxvpmicr6ti7oqyuq7aqmqf9f0cq0tcobv845ubywgt2gowj3q6we1rq1nf1mkw15k6a9fe1u5virbk9hruuu2jmixkft5muwcp06h8i7j1b35vvjiycumgqrns9n4k5gve6og00e3jpxbvnzwyxq5rxzkrqwqh5jn5sn9o1bz6zbxhiov3by3267xzxzy3gz1dsmn6pzdj8xfra4lqf58wqimlf4mzr7q37kpt3dndchdfkb72icgmsrtuimkwmrjequpze4aawugl3ox0ihzm5rdb6re65u8jguq9jd4uz4chzi5gxzwqt8vnkz69o2w8atp3pebk6ejknm9q3v5kr87vfe2njj0urse8mokvqmwet2b53vpz72zfujfa0rmet1h1oc4s2bjpy7p85qgb51eh9gcvxqef9xhfhln9vrn8c2obbflb4yqcnoohyo2irurh4ss7p557mvged2wtghf8gd2vkbnxvhotvjy84zpm0025ml9jf5h1er51iejl5t3tbqjxgpbhfkrhwf7svq4bswh1bbe60bst4ujo0nzqc33rf2m8msk6k4ybi80x2f2qw9ee4rkctp9pe58rteaygwq0n3shi300qt7bbcv1au2k8yx1psrh6mfv0w53xpcbw1vo79haub63k39p9b1ga2ox86d8ypyn5zt23spvgn6c8c7chcbri9wqnu2y8wstoznewkgufajuby4i289v2rwzpo0vz1tjsvw8wqq25128ueoaudbq02x2jup6fplbon3qvdc8q87nvfvo49lefyjqoanwog6p0jghwrwf5ijb687j2ku59b10ox4vyqzs93bu4wwvc5t6gk0yie78u',
                image: 'ao97dle0en2upmq92ykm0072y5q24ha39xrvnoyhyjz44x4nlq2y74z4qob73odtd63ul2mg8d0jnc6u8be1v3b1jurp2hrpjyydil6j8e6el4bjxf2z92awq2dl45tac34mujlexqsjltvlkb8tvmjsyvwkw3jtpn009ykeyjtufvnf9o2nhjk93mpsoxa4aa3vpvrg710c6sfqs3bjny8pclfgddoutzq95yl5tsolivlqnai1bguck834t7s4fx0djy2vf68gv5t682jaltp35kxo69wn4cqybsj2rbut5d28ar0h72fsv8r9rs7puukd0mhe3adh07tgtrqtr01y3es4x1h6fnb1h81oizqbnm6666c9b1qq6t6ah5p12bhalht1etdijj35fl2waxsaicviheuwpmma9re0lha4c40tv4ogkjjrf9wv3num5l6s82xwwxthrwzlpcjlskgs3lv29b1cxk27jbl5iejptyegwxy0s5u59k30gyh4mk9yydjjqgd2j2fqhm42gxhobzrn019ipsj0ohwhzue2exkuz83nc6926ypnl3za5c9ov3f52zfj17mnc2wrqee1nsr8nfb27hyerdn4auplbx8w4x9c9hzh08br1ui31gugbahfhu7acp8kfdjbnfol9tcxb1r7rej7m537brdi3c1abye5n3lo0nku0kttkymxdmzc3cyzswoibkn3gkb3gnfn8to2sgvopwe625aij733fhotgzlkjmj1hrds88u8b781hw5a8be788gxeha6hoe67pnlj0vdi688e16cfcmxzic7kia5nlhvfchyp1ilx1ewbla4nqapqdd0naeonyy6o3289xovek7icnxdsuljnf7gg5tk6s8n16fww5y2jcbm5jyunomb7kqih0y7t0d8ntkuqvu014jqducn7mymopvx6khwyhzsaz7x9tp427vvuxs0idufzb6q74c5bxzv5whyt8e5u9phq8fpeqop1hg49u1pgl8z49fu',
                sort: 7323224,
                administrativeAreaLevel1: '2uj9gzv9ulp8pihwd06ay7mlwxn3ici3bgnt153o1zijrc4fpl',
                administrativeAreaLevel2: 'f7drvyolaqpkmmbkjmi7b64e1njw9wdlj8af85iosple1b96ib',
                administrativeAreaLevel3: '5i4h2u6bwqbhnjuxnmmfuqun64ljj4l1y9do7c1an98djyvfpm',
                administrativeAreas: {"foo":"^6ypL}z+e+","bar":"xrgns[X7b3","bike":"$DF'W1q%Q=","a":3920,"b":2906,"name":"tORO1vi6cl","prop":79309},
                latitude: 75017740650173660,
                longitude: 28018921594258200,
                zoom: 88,
                dataLang: {"foo":"f\"='4E!?=5","bar":"`$J0-`<cpp","bike":"1'xH56f.n$","a":22693,"b":10889,"name":"Dnoq?\\$C+G","prop":72425},
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
                id: 'f3af1ab1-8bd5-4e51-b8aa-c86eb0fddf8b',
                iso3166Alpha2: 'xs',
                iso3166Alpha3: 'cj1',
                iso3166Numeric: 'uxw',
                customCode: 'pe2t9xng2u',
                prefix: '8x0qr',
                name: '0cugu9jwm3gfkn92cr25bv3arhofcw2vzqe3k893ginavijdgq3sc7vkl3ykj9foyaxd8mba6hxmpdozdwb1jwdipoa1gywjd9c97vx6ap79h24shvlbkowx4nlln423m3yuqoai99uaeh6eppw6p4tsx755qoi21ljih7xwdkhy7cwpelz20ux2txxmcj9wzxll7pp36vjnteoodxz2dgzebla1e5zgo6suxrrb26777j9irv30q24108urlm2',
                slug: 'z7wvvj9mzmb42uxtin64lnmexti6web1z1kvij7svb14y57n1adyc0lj1mttstzaj93mmxwozz402wbwa6uedgz2cax43b5hr0kcauafhth57fum3dm6qfumeeae6lq5pexuqnrmwglzda126dzyfir9ginicqjaro4nbsdjyfrmo1vdz75jw9p82wdjjrpxwmkkann0okjpt6djpgjjupc41kymla0jg3123zr76d6h1g3uytx461u9tbv1by30xn0j1vvi0dboodew8izm1i4qongl943432eh301tu57vnjivhfku0i0tkbhb2sy18kim2ukn7sdhc58un2hbmdxi2i8bdn71r6v5cy8jpw8cqitecc82sqnepc61r1lo4bsi8l8qhkewns54vd60iahziaa5txzdrp96kmmyg44vo22jjnkaa7k2wmdo4mgzou5rmly4mil7n4wmrpzrfjarcp4r4eopry7d87ke92o57gqry5r7v8aw0airtmkckwstg1c62ubckexfchxur1ehbwcc09mgfhn2g5pmn5fydg3kuqc28y5aryhyizcw3fo58slthnaz8f7ovk2n9vbamjubwmgqhr0k2jm5kevrd7yil9uzk0lykoqqlb5hojdfvxz9z70046je5jg29q9wca2npo85batso1qsytd2ktc7iw19llgi4f7omxbgtwpp8b98o5tmf2mt3z1l6armzffwazmgorxsr1acl20x94ezsvqibe0wj2b0tsclw4pnm2o4qnwgqmm162f32w21o4ty1gnwwjjj6gqn3lleks15lakkg8pxur89u4sdc03ge3eypel4anh3oryhtf0n3swym4p930shqb054ftnnqehgksg35n2eeclir3sfamow0qn52i0cqyt0gn7qfp5reqnufb6fyrg2p3t7cy4zupkmn03thk51vexkzz2t1ddam743fqv0ywqazngq4qip3au0202ebkn29ejkedhy3j6e71xc1qi99w2top5',
                image: 'oyrroe99u5py9dnojbnr3by7fs4albvy62rlrwr0tezl47g238k5mfohtegqbx3x05divrm4ezghw6xb9haqbpsi3l8w0eobifw84wwzkndcxruj6kt0khgqt8arrw6atimvlyjjftujyeapnv9zxisqdp9yu5la9etlu3bmdfwonkhl7hxahbetntn4egemu9rbl7bsi1dg75jbi2q79ytclwma2ndv13ukpjr7qwwalt98ndbjb3xuuz9cyhntkt6w4q9huhvjtmkucum1795dcoa7wjnrdu8cv23j6bo5hqo2ubrleloy9biawwyn8nz6badlci5qhk75xtf7wphit6zwaixxlgsz7yn3n6tbupebz0zdquw61yv22svoo5h1ocn6eo1j5sntlbb1orxhs2arzzkwdfqpbpun4wxbubmzshcdi2m7nw0wnw3sipj5k6luyegt9rm57k7wle1qb2zl78rz4ixn0syll6jvptkjssuq69ack8pi5zjc52ufnvhsn1xp4px4rj5539e5m7jwmy1bnax7x4k9qqebc7e8at2dvu92hnxx6scklrjojqvojs26gmp1n874mxn831uk084bvfqjjt4e03z9cfs2sywq8mznrtqj5n65l243mz4u9tljaakdeffnzz7lqeyilka8tle7z8xiudu06j6e3zysf6lzznny8awcvb0r1o62gz54dfc5neufi2oslbf6xyarg83u4olj0b8ykj1gh3tu5lc2bhupv8hr9kniqopb1tbqeek1jj6ej6izigxuhpjcbv2u44s1cg07bwyojd65nldmphzcx8tnlmq2ihadtwkqzqtq5w655jccsdiiuek0ikfp3v89r3yuhx6w6djanpgn629r49e8qypndcr7riz8ukjm1bvdfm8vm40kgh5oifn1hsz6ytce38chmf6gll8rkawwjm16jjqnvtwnktyls9tfcc5ph70a5qet5jqiwkwjnefmkv30iz31zxxg8n7qs5noml5e',
                sort: 256299,
                administrativeAreaLevel1: 's8z4jv99o6y4ryyzls6wgtvxullapgtrn5hyrrvm55jcvdx80aa',
                administrativeAreaLevel2: 'dsl88yks2l9bnlzy2cetxpp4t8e455oih1cxu4zyoag2no49hk',
                administrativeAreaLevel3: '8liywj943ghdas5nq19sy7b41zn4og2qy0qhhr5bhhm4pj6obf',
                administrativeAreas: {"foo":35710,"bar":"\"#\\7Qkw_>2","bike":95661,"a":48320,"b":62462,"name":86023,"prop":"b?|K@s,rw2"},
                latitude: 32591470846291790,
                longitude: 35805094613960736,
                zoom: 80,
                dataLang: {"foo":84783,"bar":"mok-9&.X=6","bike":"&)Ia\\'^-X4","a":22775,"b":92562,"name":"li?m5]ov`4","prop":83568},
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
                id: 'd25bd3fc-4e22-4d7a-be02-8c855528a89f',
                iso3166Alpha2: '1x',
                iso3166Alpha3: 'yt4',
                iso3166Numeric: 'icg',
                customCode: 'y15aaow988',
                prefix: 'ta6n3',
                name: 'j9f4id6o307d2b0i380twq5vstsw8jw150qz7tfuiavzasevqeix4qsi4xf8qqgpbkfz6mk44n20on44hqzda7h43gr9d4yny2htwkk89mbn708uakb7gkt1tgnm6y9zejw21t82fjxz9605b6t43phglmoi5birgfrwluqqt5ckhnv0xgb9g3ctr2hswq6axzrarff88zu4438wlstgp3rexb3bxp2oa770qv6nuylv9npsunulszm8a4sme3h',
                slug: 'dua411fh67w2lzuvpv47k025kjvdre5pi4e691ig8aq8dq5271li9oxax6mcp9fb6ar19ik1jrcot6y1719ijl67hdj0lu2twb142ju7zitjsp2mo70chuv9povgd20ji70lcn0g0nlsqabpqm8fx5z1k2wsruhcj4et06fk8xo3km9rxgnmowh7dvohhbklt0jolza3m6smprecwsh9y4s01nqfr9a03xd888uwn5vfgf50v2x7j4oh96dp2rj90rji8x0ee0xaqpuz8gzgl8p8xbmohviaphqin9jt0s0mnr5ffourgotygas48qteom5dems0sok8updwyz3hd9iwkeonuzzenjdato1cdeo7oo602ayjrek9dbyhnbhszskkvf2fbhs763untehusdyg2y6e6ggiszkql03kjsmigjll2ln2e0pozmnvg6k1l3ig1c0t5khh6ivthf5irehgpubj7x96rg2m4f6ukev3czd1xeo4pnc0r23oxihwyjvyl5elz9m2mvgch3m59xfsouxx2fbth51thre6u2hxbvrl199oaqr4rt3sgdfhwbfb8cw6gh9uevsw8ih6g398zmrdpuew9skbie4waq2tnw9nqcucki61vo1xpx0eh4jxmoj1h9kookveggyh1pms1ag84xnotqgpnnubjldiftth2c11kxyzwa5lzki8vqzbls9yuv9szeso7o5v2usb3wo95698l2d38s7oxcih5swavalz24qxoni7v0de40osoqje9r029zkiram1rlpp1dzlul4susbhm1be5k374inhp0vo9j00t1wb44lbfmo6ai8fcafvigzum7zdi7a07x5qzp2me8bln08jba0qd7wgg7g5bu2ayu3ewaj1f8p83hrm8ttewfxcuphmbh6uw26fdshi3p7hzbxt83bbu2wxn2lrx325ga3bwsyn87p3v684u6v6gsja4gxpdj5wt2vl5cx8h3tpd6qfszcogd6edgxtbfdsykcjbnvz',
                image: 'k6ailvxodskyu260ad3ksxexawd6qm9qa1g9y2kkstrpwcq4gn4tg8lcqtc2m3frdm3ppeimlj4fmflwyllmj0ypsen9zakqmvlgjy67zcckebvw3bflsn6rscwo1vombuv18xb682dlqyz2zqy1yu6gv1mswqf1uxrorwjbooik9taeksfj9lroy97a7wylqcebs7q53nsjh8ryk9kdfpm5asnqc6o5xd5yk72jb5xbs4yzuopkg8cnhzzq5hlhzfcbdhlgr7myjbpjlvr3k8jl2iaa2liwqipm1t4c2685yx1mdl9ql0hkywy3alfgznph4c5xru5sklxiacqn8novgtqsr6dkg6k3oecht61n5jhjesg635uu6i0mw0hxp1k52mz9yx25s4oi1b0g3p9hr0vherdp9un7ylw0fkew6voww7c32qa2m1us459b36cg4xycic878nqg8t2dno1sft6178h5c0xsfz2bdc1dwsd0goz2p7yk4kw0ozeqmzmbbayv6ejqixojewwqy5qmj7elzeb4elialc93ybenfp888j1i7axafbj0b96cbfg7rb0s8uib03b4dptj16w4ykht1nrzytfqxz956qabq7x2oz6fa605upllnabk2n1oxpt8py4f3oqtz15ixmygfr4efn0cug44emvmp13y0azx1yrw5v22ox22ptmav6k8mek521jm0nzhqak9d0dkavdtur8njewycn1fhylw9j266a99uz5con47g2byx50l4qq71mqxkid874boeqple9n8pit6azutsojtrpkr2ovn2stciwzctl3hlfoi2b4kfmzmc3lmhby12crfcbv05k7wjxobn4k0gd5pqzpzzwoshg407cfllkmxwhhjt689t242i8u4fm8u6lc3drs1di21mzvhs6nxfbxukn4n7lar42skov8cn4m1s91hsjh1xpj6wskfsfmeyka3srmx9hd1frry17cnvlo2mnakaifj1p8rnainh3ahz97a',
                sort: 824304,
                administrativeAreaLevel1: 'jsf1rl48e5nbxoikqhlw8w5gr1wdnpu15mghltkvokck14a2df',
                administrativeAreaLevel2: '7p28mm77ataz7lhtze7al34t5v5nspbrlpv8n1hdzwowtlvt7pc',
                administrativeAreaLevel3: '9kem82wtdjmez990o69h631pgvkv64whwshh6ndfwbkkxq7boa',
                administrativeAreas: {"foo":"z80c*v$\\my","bar":"<BL@E?q?=q","bike":77284,"a":21446,"b":"-}$c-cf}S)","name":11133,"prop":36739},
                latitude: 60671290628424010,
                longitude: 57753511264626010,
                zoom: 62,
                dataLang: {"foo":"/{0(vepP6K","bar":"Hrno&X:E5a","bike":21855,"a":80861,"b":56123,"name":6613,"prop":"}_.H^/49u8"},
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
                id: '7ec53e69-d496-416a-ba0b-a6c120428738',
                iso3166Alpha2: 'qm',
                iso3166Alpha3: 'zuz',
                iso3166Numeric: '4cv',
                customCode: '4yn0ii5pf7',
                prefix: '9oho3',
                name: 'zlpznjxgzum3nnv8277kys4t3q9cjaq22o8bged1pzjndlcw55t0fmhba0wro6sbzxbibgmwc43tmph17c0vthul6cap304311enwn7ottvtwuav8wfv75gnuv2lly9yodtuls1adgml39f7230834w83c20hze83efia43kchphq8t2n0vu9bilq0nhbm5pz1gaaqfmzp2fektsr05buhm0aj4m3v54ki7lyg3t2ssdz9vw32z8moy689fbtaa',
                slug: '6z58c5si4ygyvb88d1gvhqekaosbtuxud4hcyfpur2u88h3gmwmx5urz960tu4zw222se49o435h3k7v8c69hv6j5gdlv7znjrb60gfrq30948g2uy6cy4uw7l9n0yllerlcfvo41jwrvatint2l0g13p9sd6vw10ie20auc8ki37p1jvz7lb439qj6c0nlfz566mrgztit1cqsufgb0kxyc19cwhyo6f3t1cnbpnetiegpafdwotw9m1p3ib2h7tgxgtzpkjcijnu61s2o4wm95ud07j2yj9v722oxhvxp2yz6xky6pejgb0r568framk2f5tj0lcwokobop91dz645e5sjn8616stmivng41rc3hlpewbw2e08qemoz9g1x3f7uqcuax5ao4g16rcu3rgpsaiwgrm9u5mgxggn4kni4d5qolk21ovt4g1rvy723h4xfm2l77ugz58efz777du5ximmn0pr1escq8h3ew6fdp64bvgjf88cl6ekf7k5qkxg6zxc9p3fj2abbflqitatz8uuqukpx01fxiaghw0smf4dxfkwaqcr9mjdx6q662oyowitnni58wvs40iba096rt7kg0z4egqnxkty2t8ia5cnjm6u1m7nx3e7q0mta3b99dq6hpugxhsdd7h7oawrwo5b999x2yaztmprcn3fdl8s0n4wkp3suzxsr8jrcr7unh5q809mudyf2z26shcc130340tlfqilyu22eo1mac00er2w2mlglwphp3bp8zf0fotq48osb324digb8urokj47ms0c74s4r2u8p8rmaum9wi9ukaqatbqrm1vg0rlqwobvjhd0eavzyqopwa899rmhcr9rmc4su868uogkycd1n9eytqrqnoz9266sxdpfor3wyme8q9ksde9304atma1fym6tccv6iycxzfdjxytedoeh1ywfchgottp8fqdj30n1criwxwcdvvuz3r18s4jjyoisfmku5s58d11s9fdchmi6vu4f244enfj6',
                image: '12tosruunoo83ajd5pdciux5aq4m4eerjjy6lk36cjiowuaodkrudoogyp61pm1q5xpkkntw36776fkvxmlxmdw4qufl3kszsw1gcy5k4e29pzptdk71qxndf9rvvlgcr3acx09kz4u8lvvfyfbycwydzons7u3xvwj3d4ibfoewfnt9qz7mmos7gp1qw06vunl2py5v9ct7ya76q4qrpwmja3uweei09saky92gi2z100bkarp5y3trwgvoy7g6imhszl5yicvprhumqdwv95manc3hxl8msw5da3oixh7osve67gagt1qfmrtgyktk1s3swawt8fbokbaxouijmwn717wt5fa5lg2k4pt2stgpc8wx9k16sz4oa7y8y5st8rhn0harbnvyllwvosgq76knj69x39cuj88kejf1798fq8u78c9vedspaqdgjizt7vqxeo5tekx458pz4hcug6a35yk5173txyd0vapqaj45pn4oy259rmo00ct7xm8ceseuretjvbpktbe7kjk98eoi1kl6yhb6jeqgoe06zydiuzpysv5sw07j5sy88dol3vhw066qiviwha38n4y3vr3azr5o8fmobw9v92id82mj2resw9okalk47ui8wklk4ii8q9vnr8yabeyonog38nd8rp53d1v2trjs6vcum5m6r4engtr3vxajkd0w9f44t0h7c9n4ih0ztub5fu2xalqxghywutfsx9urfq1dr3af87ie55xzu0dxedb2k18jdiobv3y4pzhbb2arkczwuqq6shfp8zpi3hy8pn1ifjl3w7l0o11fe633nwl5xsyg23nyavfi1ar6ofzm9qz06dmh0tmtb8cm7cut7dvbqkykglmg9w5w3efeo1gvdzvz6vekehhj7jl9gu1ddjzpvt3f9002y8z6r0ncdhszvzterfezq0ia0fdhtxh2qsw16xsbw3vmv645b5be0rndi0ikx09qvc7ry9q67r4bvld05hmaxg26m7ouz7al76av',
                sort: 963039,
                administrativeAreaLevel1: 'g90i4cchhjfwy2iqypxnisiada42h8kqyafppkn5fikyuepb9n',
                administrativeAreaLevel2: 'o29l350r7q0m29ht5f9hfh50uno2zuepqc2s6il404j354ejfk',
                administrativeAreaLevel3: '1l011gyqp71d3wyh8266tjgftlfdb4v7qbmm28zk6fx3ax70qzg',
                administrativeAreas: {"foo":"HTWdtteO1o","bar":67803,"bike":46562,"a":"_(yvrBu)}a","b":50885,"name":3323,"prop":"lm1VN2BKn{"},
                latitude: 98734551056483150,
                longitude: 17460232960112892,
                zoom: 74,
                dataLang: {"foo":97671,"bar":24916,"bike":"*@O:[)|Wb>","a":"Ce7QF.Xtuj","b":25592,"name":29929,"prop":"u[:J_x>,7^"},
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
                id: '2b04e5dd-ca7d-4547-99e6-a88c5f13459f',
                iso3166Alpha2: '0m',
                iso3166Alpha3: '58l',
                iso3166Numeric: 'l23',
                customCode: 'unmphtu4ag',
                prefix: '7qegv',
                name: 'svgmzw1lvtta1kgzyv2nvxxt2xbgzlwikrl4zu8s514rem6gro8z81tlsceol20yefrazwl6sqlgn2crmzqhbjzy7i1gz2vswdnughpi6o4sx7m388hqyr9ipe7zjkq248zhrg3b2e38m9poajh0zo3xhyy8a2dga8glvvv78f0al43n3rd6soyw9mllmf7li3g25wk35182ygl76mbzevx6yhlcb3m133ze1gom4ojapm22l9s3q1x4yg28vox',
                slug: 'mps02uvbhtyl5jn4krjg0xx3craz83geqyyxt7go7cl4dv309mlm5c4bncbsv5i19sehsc3v8uts6i46bwh314dzohbr03pfjxnik6rtgz930i86na2eptggngt8lxjdxlacw3l7thon338xtchwjllb9x15qix3p4tn0oq3hf4dj1k7x6ytu5twlb7m8ucwbq8tev42cec8odshghqpny99ee6e9e75dv2usjxofofld1yjv9mli4ef80zprxyyq115u67fuln1tu977lpqzja4ab5s9lw1awb1ip9ipmthoevfadgnm0plegb9ltrbaf20dx3806io0cnjgmnvl5su6u9xkiuvh2jfs1tizoe8g8cc77xje37uu2kjkgx4tqdvl5uun0dltlc9gz9qwc4h5goo336ec73nohhxwuq3ezxo391zqvhef052fozwe5427o2t5foy4iowfm7dg1c8uhxabmb2kkat01pkvfimdm08dvuozga3biyxuvvvbp7xsvmht8fg0xp5bb3c7sdkvp4qh15141i7rxz2flc3hg242iz1azns4n6zgxev2mbtzaktoistzvco811b7izy6a3x7xt8ggr3tfq4d5e0b5hn7iy9wux8akbiw6659oflcb2z0qgndper3p0bpu3i8g2yld7flslvcffzvdu1avcrcwogpb01wwblm3d44j7l3coko6guhq0dqvk22g91c0w1879de6k1kgisrr947mlwvj3qcdshzd92s7h6dfd9ep1axt8gjqq4ldejgr3t7quxspvk7xn9uguzeq0t96uhjktgydilfyvu2yjd42qalh6senrljatws076xp77ej5gn2hzc6cer7qkofyt0mkwflgydw1e3ftwf8nx4v67fsdhggjkk6pwxt656d9z1b8cyzkuwfy6le11066wr5rmmy9ot3lnqbx4z80cm64rre8hli4c7mu8xknm8uukm4vyzjxtv8aai4eecpndmngeonhpn2yppkll2jl7',
                image: 'wwo517cjhvzg1y0gsbbsuh6xr9gqnazl30qpbi8daw1k2cwx6nc651fadlb10d7ttuq224xtbnhro8u5rj27hbs7c9k2xq9cfz1b7nheroq0ta6giw6t0hvla004r6z5on5coowbe9jjnbwgiitfaf784gsi6ej4v8way66dxb2goilh066jhjuq2sfk31b5qttpdzw4fwupzbdmwpqa7nlw1h8kgt6p7m8l14g2pd5hdnulpovo96c4qvcyrdac1rc33mhc730vpjynebcz6brw45b2lug4vidz5n9dky1tbviilfd7i3pahorapanfm0c8web3bcaeqjvo432sgo6cqspwew4aztyfuz5l6l328ytp0j6j5bbrue9g7pcjme8td0uivm2evm0vqu6il15ebbfb2am2rcphz0kik5zg3nlxdbcjiz5x5q38yiiu40cjfm9svj9skr3wgyc9ociaj95ryrbo5fwfixgyt65amc4q7g0b8wd7flqkvl2f9mymnlydh38ncg8touilvhoqoajs12mgdvue7yk9byhqbn3w3voc9fozfj9sktwalss64dvvohq60rsu7ko3wzkc36x5ijgfnwor1el987443dvffdeva13jygm2jrr1qq1kwzqv049v08a7wkw8nf9owjcv2m58mgtakddwj0yn48mm82fb0fy27nuqrd4i38hihjqq08w48xxqumaaw3yd7nwkbgnijc0y98wvxjebh5skhjorefb6tahea3kywpqy4kpei8ygsojwehekvt9ytmrcenxlm67kyd9izcaix95wu1nsihfrsy244j0phuz6gk6bsqhmv6rpp689417f0qxgbacaug1a4tth6coxs0t40keu0d375w40h1yvihjgni9zfw5h36metj6g46d5xs6x5ak08tju4wosfys84fs0becwx01gzda0i6ant918a3t2dktdu6jxnf7frstyzphw6x3nq7syo8zqp4u719wvluidtlehvonmu6rs',
                sort: 241594,
                administrativeAreaLevel1: 'cwtjwx186i8i7lsznb8puwdk3cdn90dkiqg3msdanyan30hd6i',
                administrativeAreaLevel2: 'oqidh67grw2iyl5feghk0etp1fddjm69mz8yx9g6olbofvc8xm',
                administrativeAreaLevel3: 'mec35qabn1c8ym7595vkrk4q4a3axsyol4jovopysy65nmfap9',
                administrativeAreas: {"foo":"48>1PN=7\\{","bar":"RNVHK.7I46","bike":"BeV9tg'llr","a":37683,"b":11297,"name":49615,"prop":"m}EA,6.:?u"},
                latitude: 303225789858885500,
                longitude: 90277431776487680,
                zoom: 68,
                dataLang: {"foo":41707,"bar":"C96|{ynOEp","bike":"MGycYy|?AG","a":22135,"b":52922,"name":"),ek$C%HZ#","prop":14628},
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
                id: '2abb2695-5b30-42c3-8de5-726d0835906a',
                iso3166Alpha2: 'jz',
                iso3166Alpha3: 'jei',
                iso3166Numeric: '0ie',
                customCode: 'tmxal1o0n6',
                prefix: 'znpwl',
                name: 'j4vthqc7rbov46i2ej3q8ppliimh42wb096yp8osgq9uiepmceii4h515cebuzvqi695o3chfetaqb90j3p63ift5v7wwfkkuwuq2lkavxuh2f3frlihi5qi0lavi4miqchaz7fq1myhpyk7kvh3f4be3kqqpae8ncqlcopagh1ak5j7qqu0u312gpmuf4ei6iy6i59dn7ax3s7qe7vkh0gttep7jrb1mo3too421mqqedd3v6zukz8xj1cjbfg',
                slug: '7s05dcwzxyq7t35hudlpysxr28nzmiu4zr2wedm3aeeb69p13zqqw7aimpr3wmxz73p95nxvaz2wzd6shrinyay7z3n4bxphfpg816lw1k5b2mgie0m3w4pez3k8rf6s5w39b0wq3t4ei8ep575uokvxu01z048uk65hx4ghndwfevw3n66l7909jbq4812rpmis2fdrfrq4gn28jj3bsr0fr71slwewv75f7pr5pix08visbg045j28v4j11oqyqzfpunuk0fulc4mp7yicfrxlos2c20akchiqefdpxsa3fr2dldwbenoldw4e6os9s154sroc7k3v1vawq4faojjqkav8n3p3rts6n78kjjunznu114tld54abpvz548r2gi2rlffqsezlv1hbp3slw8a9d2atmihj7sxdz846yai2s4sg3g3xyjfcw7ruadgqh5pvnrtqyf5zkhry1sensg4mn21yhzinzc4q6n2klbrck04spreuescfjq338j8qzqkm2rhodg0nmos7mm2niybrzp7y3xk284kjpqtabxf076ospec0pysceomsyyhz8adyncg29pxlhde1qwy946sua64awunhql2vcli7vl8s7b15vm1cgulieg8f6393bvmgjwb5iokkqlivi2tr6xjuqjetmjhnplaozlcan07tetmc62gkv9qv5tu3v86a1ksjejahknbadykugelqfpcuqul8jbo5tbr5v26jhmdssozy5zjlqpswvlrzinr4fp2qg9q0s7txkkc1rf9739y49ews117dkgk1rz55e67yntots63i0golp6txw30yhw7yhj1f07jcngz9o0l5b7gxh9le9uvf3afb7lgk0m03qk9w7m7r2a679fp0nhvnrj0f6fh88h9izvyx06c7dgyhkypp3pzze21dwyauaem8d7j7c5qvygoxd4mi4dnux7h9088rbll2zbizsvjeav0vkj1a9ynzlkwdp1wwn8woddd31oeviw15gdueiwa',
                image: 'n0o328o651l1z6k9816jlt4xt09pm2kxw7upeug8sjz9ryaszh7e94mp5uo4rtd6csg2huj7uj958hkpl6zuxawh714qke5qobtrn71xru2rr6vmle7m250wqdj14ka75ka4936dmk17wwfs1qe26f42evxswi5fmulaoxhs6fpqt9wsm07ujinwrbthczk3qerus6wz7acdh35kyaywg9wshomhonf5xycc1om8dzuo8tjixcxqopvdff1trz0ng8fd05avdmgq0t07bte757ek8u6ec5w4ru6aut2ohdmclmw99eurovkdncxqowqefcwmakwg6u03khauwqkktnejogrtileq5bx518ocpo824kax0vba4ii2dng4gdcfif1fy4v33qxq400kolv26dg5r24gkuem0swo9tnzuidf67s2jhiyu27e06w81393p2xudvk24l5bmpobxtnmvcbdmvs0bwqm05wyfvul14133l7jhjg6zjedbp2xpdya9w0zzhb8mtm48iooptwc2o0vhxfsy7u2ae4lrqkecc0kqp1d8mdq6j5gox8w085tueepi5lc0c3d3pacotu8s4kdbbx6ajb76fd1i2xr2g5fjl19vdy7aqd48u86m60030l4j9kk56e5vygl589rql4zllg7gi5dp21ji3kj835lo9m5mduiion083jvid1cli5gtlncnawluhzad0f76pczrpmn7agbukyoapcobqsysfv6sdxoxeo5jsx4r24km12j90z4hyuehcktg2lz4mvjshz1bujsnj7xruzak1pj0aqptaaogc7ptiu3bs4hjuwm9rx98k3zxuocs46icp8iqqn4f932q3ok3v6co824s8h8810tgpmqfnmv4taohbkedfdw6xpvusykau1js0jst441kgfucp2cbjbyxt1c1sqnvr9k04gje74kz8ii46humx0qvtibpnvxih5jo2d0b07lt9h1tu66fy4n2fztkt74kc3g9d0qm0tyqvw7',
                sort: 900032,
                administrativeAreaLevel1: 'jw407vp9ld7j2vuxq9vludqfs9yp18l9piy2w0ujs6kde3pfk8',
                administrativeAreaLevel2: 'f9t7cpd1hvvmaz2wdakcnh92hnr2ctn2yyr5vjpbqjb88a6bxj',
                administrativeAreaLevel3: 's403mlaa37fscv60tirjh6j1f30twgzkeyaha37uk0wss3zlv7',
                administrativeAreas: {"foo":"v7deX.<O02","bar":"CoDNls[/Cn","bike":"$ziY:A{ih^","a":"s-bdd_^zL.","b":47039,"name":"T]Y.ij4&3I","prop":46930},
                latitude: 65588962550264900,
                longitude: 534874811401979000,
                zoom: 76,
                dataLang: {"foo":16387,"bar":"(+J5(xUkpK","bike":"`.j3y+,B9y","a":"A5\\rh?<_mO","b":"wOzsvOJ@F}","name":47823,"prop":84751},
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
                id: 'd6135b0e-a18a-42a4-b64e-e5be32ca94c0',
                iso3166Alpha2: 'a0',
                iso3166Alpha3: 'le9',
                iso3166Numeric: 't3o',
                customCode: '7o8x6gyezw',
                prefix: 'rzyfg',
                name: 'fdpnrytgp4mlovhbs8lfuutmn44iikjuwskjy7haovhvjhovjc3rkheh6jh4u19rbkcw8kp6jdamhrj0r87dz4lh2yyhd73gb4kpukcb86rj79motlj87rjhkc4ebu2mm9ba30japbumdpwofmvf05cugueydcfs1ojbppdp730c62m1i7to9r5r0g29995uf48d5wzyt2uk9ig3naju4os35v0uao1mcs82jfm7s4imsaxrkezxv86tzq1y2ld',
                slug: 'evpdbv0i90fnscqk7mabuyqirdbhaf0u5mz60dje9ew2yqrupzttkinpg0sdnrx6zdxh1epre35ro12gst5kplg0r5lpobxnwo6wjpsewiksa5s7nzy4wvns9bk6b7qh9qnlo5si450ntymd0j3noa1n9mxfl77f4qehddyo9t3cdh3qac4y4harm3lqlzt3b9xjdy6q8ffajjmagt3n42xcuz14wd4vezix13x78gwvgme49wlgn2izzecm61avboh7205zw6dr67jrvcjq7fkayfu4oy7h00vmokdh6u5qf3fa97b96ic487sf80tt4bjzyhs3t466x1d0exrr04pjvw03ub9tcj7w9etznk2hktvyew6a87mdclnvx19y84r4gofpam27ri3ve5475ly9behccyrm0871425zqk3qvhg1ex71fd7jz9iamcd2bvk8ip6w1nu0bzhp50lu84pk537quzmt3azdcu8sdk82gn7s4d5dctyltavymu1wvzsituloj0iiqwfv539l97ztvp9obdysb4alxhdiri5lq4czwvo81y89awo10j4l0e4a7x6apwtl9ktm3ptm39zlihw2k043pgppzm0jget1frjt9x6i365186b7cb0hwven1rf9efz84tfv4p7fo6jdr0zu7t61cw4duqb3v9wtrmz6hp0umeu68yqkxo4d1peeduq2ng9v8jl75fytw76eodhlib3wdyyr6tin3h6fe8ipycbokfhw3224rsiw7yzcfzjloydjb692voz8im7isk7g64ui5ltuvvgngtg7p8tjt8v8xjisjulh2tkbm1edhyn3oaq40cqqvonzdhzzvmrrv4uyqsrpsn3r1ezi9f8em0xatzfsljoj1sa3dt6r2hy97ffirntsa5sl9bsz54k7korv5zlbwgyofusvviv7dum4jthf4quigbiis02w3thrvsagqkou8716c0v17zhpzirkvl8o2rsahpkf3587kb23cvdxhyyuxiwf',
                image: 'gd5tdwknxs1sc55ayjl61guoss854lhebijhow8bcqsak7trk4u0xrcprw0unnkc8pbi0sbh2hcbfept2xzbiu7zdg1czld5ov36usx802oni8ekqpx9e0od4qjf1dqelyzjlbstqff9j7itamp6ydan1780qewraqsfhp3n2y7jtdtrrtlmqmbypzg4ssxyvbqbzmmnut2aum7lsr9l4dl5wze3axtp2k7mvs6x88s1elmk3vikua27lffa2yft78y8k4p1935min00suq6f5sbw0sdeuy1ywuk0gq4hewg0cfpe1qmsb1eri1rcbra0lvo1zpxz1uvzdyewrrxr47kci24wa5pgedbkf0w0j5exztz5o53m5flk4wnfxcmqyyxuywdvr3s5bmaikcervmm1c5nwib6zlxx1bee9juf57tmsvj22y0ctv6zz8sisv01248pj7dnngxxuqrvp7z1nkkh42d4dlql0s6c3o1n6q645psccrlngphx7zr98ed5dxb7hhma63jxoqxno5im8dbjunuvwzmuzgb4x1sc8jnvee9awo2kbai1ngcpt0vx7fingyyy177m4hvff8sfoazksca30eoeg8dhc3wdt16flvju9xcj5c7x2llevn6znae3wl3m4esuncwmj8j7yiuyceruim42q821b8y3uc5vka9h155tf24wzaefolextyjj5i11h1c5ybz9cbulbihy36smu7ic15h5pw7g7xy7eq66p1t1vrjcpqh49t1fnkwnb6xqnaexib3uboqu0zul0sp1lfqryni3rwh35lkftmbqkrlykjmk99gpc3kly0xirbpz4h8ciwrbld47m0m8or72velayohfvk6kjj3l01fvpute07f685zzb37ezpzadorqynighwyvjpchfg92eh75ncxcc49dynqct5myt8r64852ausk9rdm0qas1hs7ukhxag27w8z98j28fg9z8gmnf3f0d1cv47tjn876s9nvaqu5d71xp8b4',
                sort: 877417,
                administrativeAreaLevel1: 'l4np8z3vdywv13g4ebop6yydnzeog0jr0czv2xfisroiatxy56',
                administrativeAreaLevel2: 'b5nux1h8dkr8qa08ayooz5pgx1ju4ot2g1uu0xl9gg1im5aahb',
                administrativeAreaLevel3: 'ygz10yy8xyui0zf2wfrw4q5ndeucwr62m3fylsrln2v1x1fav4',
                administrativeAreas: {"foo":"`q%8So9&>L","bar":56920,"bike":64972,"a":"d^_6-}#s$Y","b":"Rb;,pxQ&Lc","name":35441,"prop":"p]Aco7/oO|"},
                latitude: 67427508651487890,
                longitude: 15870340937314766,
                zoom: 510,
                dataLang: {"foo":"(f4\"?(^m\\Y","bar":"IG}yB8Oc}4","bike":"hX`)'90R*J","a":10265,"b":8578,"name":26617,"prop":"Y59#\"eGJb>"},
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
                id: 'b579f477-0aed-4118-8c11-62552afc47a6',
                iso3166Alpha2: 'z3',
                iso3166Alpha3: 'hf1',
                iso3166Numeric: 'p4l',
                customCode: 'fvs7cxy552',
                prefix: 'gdgyi',
                name: 'rnwl70nca01o8eka81gh15agknjgi2iprfz0zwhz7nlro0p4dqxzx05jaebapd3ato1avcuiiqd98p9oxnrcbqgti345vwx2gcl9747uwnm47bhvbsyf6n39wvgkfxc20sq423isaxpw0vsbw4g6odbq680hqi2gzvv1371yfphiul6ufr9nntlz4q2chzaxfgyw5ud9kojhv4fgbdsf9dq8ifrv9mnjcnnnmae56caw8y3rijm1tn9brji7zcz',
                slug: 'x8bh9lctqqx9q2njelv7uy93x8qinp22ehhnrc5e81wlv7dh7gezork8gsnv60vkyzvg7szwjzz2xcro9hhir8yqjwq9p4u637jvdksam3425v6leyh8fviltop1vgbnjlj0j3g1dbarareir4kiozszi84m7yay6j7r9mqzxfxk7ezh9n62x2ted3c71lgktss8kw28jlcos78oy0stf684falql89uvfc66p4cx8876lxae0ee0v45358fmlrh6h6thamghghkohbzffmboqz46yiie8soy5m4exrb7en0fc7q5n9bkvlz2opm0tof1swgf23m30npai93d3wq5wvnoe3ff8d69jfnaoz70pmumx4z5kvkg3c5hpa12daewgyko7d0xh5t7auuo80bbgd52fxop96n1vspt0ddog3goia7ws1mc5c0s47w9p858ttdrntukn0axaqbhodq26e3izlspumea6peqejjvm5kmhe8orlr43q0qzyp0t4715hzl99dikx9y2qibh1ritfm6gk1pwo6xmh7tr2ft2uuu7s6vh5p36g7pxsyvs625cnpgci8mnq986vpqumt6w3ygq71z7ouqr43ny59i0q1mx4ki16mb0s86wy0o8c2l0ukq7tq148c64gtl590nn950abro20sg6fvt3srk73iczd7zuzc93pvhqw2jzfeugnowgtajuy00u58i9yiwwi1y0aaletnrbi4qm0pejqpcfatoiwsn6c8es798kpihewaa1lk20xqw8k04kyk04a084bjshvm3qf2sveatnl2dg05ahjmje6r5wf0j5g6b3koq5dzx5u6km2s0isf7evnvn5ev3023ippzqo2mgdtlh5d3z6ng1taydfh9fn5s4u6nom9syecbk4gqz7wco7v5a2zo0wbv0ewndkdprg9kuam3jn8ede60n9fz60e0pz5o8kysht30zq63lxuiiku55wh4s8jmen80e3x2m7r86guohfv8iui8juvg3k7',
                image: 'donk0nb11dggs1mn8d0kanknrzvz2g6798r6vrprlnr0b6eeg8gq0481cxj3qturibs46lsn1qb3s674fj85iupwo1oxulw8w0mfzvwtf2lzs2bmymdoifuulp1jznf0c3qegm1zw43jhjybsnyn710pteic5g0wxlny4wvutu1pi6opwqxygrj58glt25leinpvzqked2f9t972zulexsryrqi8jbr40draurucpzumlhv4whd98h8fnl2m6b0grorgg75ikm1v7oz7ld7qkc397myxkatqzoz0lfb0tyvckibeyh8bbtbbd0soyolt424ujcv3snz1zvly3a7jkv7sh54vw7lhln3iadd1e9770vxzcfifm6v6iofz9qf19caydukpkn77r4vulj5npd69rdxw5i8au32gvu6f3uify8iiirhmaf1081ettx2zqu4l8vw4o5yqn4z2hhx7z7mdwpdvfi61zfddzav8bb25bx2isayuj0juwwywz2rngxf6tbkb2eak5mmikc8einf8sp6z2y1yi72pt0o77kso240hzhs3l7k2iuu6rotlm6qnmkdh0sxaw1yzgkepdoxkvqhxnq3tfm0prgpiv8xi44n06dagq3h4v4zpxqevck3xodggyusagvb5oo33q8070w79tqmk2lnqvlrk2zq9fq5wv2browu5t4ly4sb4gu4uf3au7sqqhnb3y3n84c4mtfdfy7jz996wnc18qn64047tkexi09ilo38g6ttodgub66arb39mdv8rl6locnzp6jpzus2s6txtu7dwwm7yrdr520mhnjaivtnwrj7tyvy35q8bjvu9my1jk716rjk5kq3fhxiuau8p2dcfqvrimzozmyfxs8snm2whw5d21yu750mrch0weckcte3zg46fihudh00jqed3yq4gimffnjwca41pd2ybqodif8884eqtm63h59txen4775jtqpyh5spkm2q1l5k37kvrjq03fywvit5ege44df5us8hi',
                sort: 397871,
                administrativeAreaLevel1: 'n62106y75ahj141hpmat1o440l4dkh1ovpc3yo1061144hcgcv',
                administrativeAreaLevel2: '892jx56q13vr0u8i9ue51eu2n8tus2bpr8v14qtp6yowc2oqjj',
                administrativeAreaLevel3: '0b32gk2vvqp2t82bt70w81kwkbb5p2m7swz7mibjivscaqeiqc',
                administrativeAreas: {"foo":"LI0MYt]How","bar":58013,"bike":43557,"a":67738,"b":"P|n\"r{Fk=%","name":"1603C^y3N\"","prop":"k+oDc/N}c@"},
                latitude: 38096058289935410,
                longitude: 95210936305554370,
                zoom: -9,
                dataLang: {"foo":";K/Njbv(Y]","bar":"#='|[:*$V6","bike":"kbDFWbT@J2","a":"h;9::Hr}@A","b":"nkN=h@|1Xa","name":39262,"prop":"XPXMp4l#Vx"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for CountryZoom must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/country - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
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
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET admin/countries`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/countries')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
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
                        id: '89871e84-3fd1-456f-ba13-fdb3d3360dfb'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST admin/country`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                iso3166Alpha2: '4i',
                iso3166Alpha3: '4iy',
                iso3166Numeric: '4iy',
                customCode: '4iyw9pwsdx',
                prefix: '4iyw9',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                image: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                sort: 459861,
                administrativeAreaLevel1: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                administrativeAreaLevel2: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                administrativeAreaLevel3: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                administrativeAreas: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                latitude: 39624792059150660,
                longitude: 44008729345034240,
                zoom: 99,
                dataLang: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(201);
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
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country/40deba25-23fd-43be-a2b1-70c1f7aebfdb')
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
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT admin/country - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                iso3166Alpha2: '12',
                iso3166Alpha3: 'v8r',
                iso3166Numeric: 'bex',
                customCode: 'ch6iemni95',
                prefix: 'gavle',
                name: '8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3q',
                slug: 'nln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5z',
                image: 'wwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383',
                sort: 946607,
                administrativeAreaLevel1: 'b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap3',
                administrativeAreaLevel2: '9slxzj92i3nx18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbr',
                administrativeAreaLevel3: 'ti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2j',
                administrativeAreas: {"foo":"G(Td4UCDg@","bar":"AxaO&r6IUW","bike":97110,"a":91266,"b":99069,"name":"-+ALyCl##7","prop":1289},
                latitude: 95806655653790500,
                longitude: 43199528679676984,
                zoom: 30,
                dataLang: {"foo":74631,"bar":"1s$j*q+,%{","bike":"w<g=waJ12?","a":"J1h{ON$Ba\"","b":"gs[RUUP:]#","name":";HiM'nli&=","prop":"(2^rMIV__Y"},
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
                iso3166Alpha2: '4i',
                iso3166Alpha3: '4iy',
                iso3166Numeric: '4iy',
                customCode: '4iyw9pwsdx',
                prefix: '4iyw9',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                image: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                sort: 496852,
                administrativeAreaLevel1: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                administrativeAreaLevel2: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                administrativeAreaLevel3: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                administrativeAreas: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                latitude: 21875989034479252,
                longitude: 28186239560655908,
                zoom: 67,
                dataLang: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/2650ff90-fd84-425b-b42d-ab717c3061ab')
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
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
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
                expect(res.body.data.adminPaginateCountries.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
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
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        iso3166Alpha2: '4i',
                        iso3166Alpha3: '4iy',
                        iso3166Numeric: '4iy',
                        customCode: '4iyw9pwsdx',
                        prefix: '4iyw9',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        image: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        sort: 552950,
                        administrativeAreaLevel1: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        administrativeAreaLevel2: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        administrativeAreaLevel3: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        administrativeAreas: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                        latitude: 19277559757546096,
                        longitude: 15047065300720640,
                        zoom: 91,
                        dataLang: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateCountry).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                            id: 'bbda8fd5-b613-4ba1-b180-9a338a5cc896'
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
                    id: '6afaf214-0bdd-49de-bf3b-2f3991a894a9'
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
                        iso3166Alpha2: '12',
                        iso3166Alpha3: 'v8r',
                        iso3166Numeric: 'bex',
                        customCode: 'ch6iemni95',
                        prefix: 'gavle',
                        name: '8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3q',
                        slug: 'nln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5z',
                        image: 'wwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383',
                        sort: 771493,
                        administrativeAreaLevel1: 'b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap3',
                        administrativeAreaLevel2: '9slxzj92i3nx18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbr',
                        administrativeAreaLevel3: 'ti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2j',
                        administrativeAreas: {"foo":"G(Td4UCDg@","bar":"AxaO&r6IUW","bike":97110,"a":91266,"b":99069,"name":"-+ALyCl##7","prop":1289},
                        latitude: 43077237874720270,
                        longitude: 54807230911981790,
                        zoom: 51,
                        dataLang: {"foo":74631,"bar":"1s$j*q+,%{","bike":"w<g=waJ12?","a":"J1h{ON$Ba\"","b":"gs[RUUP:]#","name":";HiM'nli&=","prop":"(2^rMIV__Y"},
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
                        iso3166Alpha2: '4i',
                        iso3166Alpha3: '4iy',
                        iso3166Numeric: '4iy',
                        customCode: '4iyw9pwsdx',
                        prefix: '4iyw9',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        image: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        sort: 464418,
                        administrativeAreaLevel1: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        administrativeAreaLevel2: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        administrativeAreaLevel3: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        administrativeAreas: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                        latitude: 91678135184096100,
                        longitude: 23889677304623730,
                        zoom: 69,
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
                    id: '1fee2b0f-046a-4ac9-98e5-99f16024c28e'
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