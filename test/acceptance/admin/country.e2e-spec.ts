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
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: '5a',
                iso3166Alpha3: '7r0',
                iso3166Numeric: 'rc6',
                customCode: 'efzjbcwz8o',
                prefix: '08zzr',
                name: 'i4tyaii0qprbqbrjd0ilbiluaug3eyqwyuahr4lygo68fuv2c0ueogryqzry296dp3yws9sijrve3mmku5btzer67s8hh0i9rlxlmpugaq5fff7qntd2nhh6er6uwitcqrwt5k0nrikx51rd0ah4bmveooknkpghxdo29p87suwour29nafi44tvf8dos72crplaajl22i8smn7gmi2e93nt0trcfxw0nqvu8fueavcymlmqizy8cd75n5ednr6',
                slug: 'hkccli4typjtxoxby4h7rj30bcp89lcf3esqg0nu2dt8qrxkculqiis7knu7ihnt2kk4vsu5pqguedmr9u335a0ghsdx97ui3fj3mdstbmvmqe7fmhrl1yxzpqq9mjfetl9zm3f6p2rrx1xqshvhc0ns878d0a5g0a7d053ekhxmtryhs2map296kns12s056eivhoeujuh7au56fymjs2uye1h4zsxfibdddr6e7c0c4quaq44sfk6nkeda5ku9e8lxffw4tz6pf87uli0s0my1r32d1fi0hr43dgsmakhtxh2gp2zduootj2uookmsf55tfpepw6tkh1klwdab729d3ibtvixc6x4aivaue78tm6yb53ep39hrwcpd9o2b6w5ki095qtmm4dzj4mf87j7vmav8n0ke1w7lch1bz4eqkquerddymgc6dkj5l6vytrhzs7jw39ci9z2rx7fajc07xk9lfe1atlecqsxhqhm08odajbja1nua1ugj7crn3xa7wu40z389zgez9iw4p981fwqs6r2rz5ypqkhwtzbchn6m8iprxlq4x8669vfi4y9p0rerue6ov4lcje2zzgmj48wpt3bub1ejn31yv9ks0ikj2tro9lmwyh5jitsdtc4fbw5zp939fdztowp12b9duj8g7pfz27152r8350phgzenx6v6vdslki8634d1nvq7pt8v552f7wmhpisyiaj7s82flwr6nwuu03k3hdy1iwplu9flq68o7xzdrpwcyqw6fk1gikm2zrdqidkjpnfsy630nkz4zh977g5yx2gofognus2gr5ltbw8dwvusnkr828oa6azgdq67zejlmfvmirdlrf2wzt0yzlq2zds2bbvyk1oqlzporskqsjfaf5dzwuvqn4wojb6mwgc54qynedodqw7dh4v377lquhhq5g4c4ucqoz875ukato0p0f3br11yyaiemd0syoe85g8zvuj6olnyy5ffhitqqq05uvi7s2nbnroyukgjs4pc',
                image: 'kfyqkw1h4w4mkz9foe2xwsfccd3r28xsw459kp908x49zj9c4aoefbsgvevldrclkze6edmz87i7wm1i4569udv7xm48bam37gbcg6kia71xnfleepnkbylg8hwuptn50jq27fq3if86lezxg9ttww18izvcez5cnyg1bgl4ivmwp59lc7codw8flv54jbqo5etizbasjndzekq7hqcssbp383s3yl1uzm3itprahx5h974wg7h1wwgvmgbi09tflyzer3qrqumh1bqrxfngus63n2mvmz40cb1zebtkfvx02e4mcnac3uscfbdxrm1n27mbw27pbw3zf6nzpcb7sberopw9z2z09a0vqop4rrcq47onefbp9ej7er5r7g03usw9so6oxe2pog1jccwukihpzm8s6y2hl5ieqfmos8we3si6l4qmt3ocnmtt7lq8qes20u2nzc494zuwmwpmqa8mwb1tkcs0kkm5bwdco4j41u9jzugs09i8bieufwskk1d3mrnwc2idavgwwamq6pwkq9nrn3k3pu6d9b8ifdz9qeiypcrd36gfqyu861lpnm0qpqpj8np2qizenl5e2v6gx0he5itf811hccjiyha1px9upvvjrs08ou15se2ibd017c483rqy09d0mgxu159fnsvyfnu3kn4wh12ri4xzn8pikitjhvcibbr537i416xrqh6p3qwt509xegisnwzroae0wuanvxk4nkwd02hd5cm4e3pzt53rgksmpesp9jy1l8d2dce0ltsk4yux2do5m960ribkkhlmjwzsubpna3humv2wzhfgx14k177d4yhtu49xgd3aknzy8d0ogayc0o40ca0e8tjial7wvy92sunctotuzn8u79knx2y2zw7aqdaeewuvmq877zc6oun10va617ylls2esn3w928ih8my6p0m908h5zettf0hie1r27brgxvy3paf3iu547k4tg2r25qrvg4ud5c5lwzwt474jcuhtane3606sl5b',
                sort: 712787,
                administrativeAreaLevel1: 'syquzs3klo8ty88bfxk6wipexo547yzqvtwra4wy1cxr6o1wtd',
                administrativeAreaLevel2: 'bxn2aubxwsgecct1bqbicz0ohuni95wy9g4rccfubyle9h4cgl',
                administrativeAreaLevel3: 'ynixyyn01ip12pue2mohewjqm1gn2g2xrkg56izbdypgw08mae',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 155.69,
                longitude: 185.79,
                zoom: 25,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: null,
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'wl',
                iso3166Alpha3: 'g6n',
                iso3166Numeric: 'yog',
                customCode: '2z3tkazch7',
                prefix: 'sfq4x',
                name: 'puya3263qoazxh5t2h2odhvz9xmg18uztrfws69jqrowbak0uwmwf7p4633ul82w4r4ck339eicg5lb20fsl62w9ol6fy5nz3ha3g5khu3geb7ffail30lt585os4qxhlj2t46oc92acvfvlfvwxt38nn6ajlragel0mji0830w9aqent9mh9soz0ro5dkb0zp2v3ci905lhvr4b8yrlb9mdnqr9ycri1e06ctvbrxiam743eihlwarwjzpj5ba',
                slug: 'v4f4hkucb24s2uduqb3l7uy9y1ouhwrkep648oio7r8mt3s9snx5snwtpp2udb1su7pu2hnbdj2ujm3g1472uspyvmupyk2pz6lhd7dqcayw4uwfaarw14n8k5h0bcv7o4a9kjyl363n4cjzcx2hbf9gnk1dukwxh948oay54avyrqcexu7kg0fqc72o4zz7fcd3egg6btkthk4j9d5egab2x8idc68j9f0cldl8pjr17sszz57yzt33m07or233cic2qm704iv756ibk79id7rbo60xod7jdb3m6tl51t8hotxct894x39tcz6ubo897ds0nodyqay0tpq14j26xn93ny9bshdmsug3lpswd7szpddka9yot4f3zal652sgb39ensomuvraadfe3wjq8e8tpebbldmobp46f50ac0tr74x3kou2zxt6kpnrwk3gqp5wvvw6y6rei1ioaqahm3jnk4zx77mmtu8qy3o2xaubxnkcbiasph6pb41wazotek7dg2a3l8zup7b08lr2pvr116deyioupy5mgpynje2b5h1gmq0g0fwgh87wc9pc0t3scd4eg932lnlm5yba2eoob59fcy1efl5a2adcu3suxkj7kkd1c07d8e39wkphp8grrzkvgeap1tlpfuxm98cx1nn2o6tx8dw3v6pqp2u84hm8kqcv2m5ia8yn5wf08etu1fkrqw76ds5vkuvntrvbf2z67ibmo1souyskgutvo0lslfbfb6hgcj9hb7ehz6hoklgcptithv4mqnd3lriojsq9i8zc2slwb13vhp9m5k2en37swf4shn362rmjf4wqh2spi4ebapr5ss5y16khyh4yhhint0sqgz8edrvysdq632bbagf3tmt75sgwfkwy3ikytjzloet8e7tihyiiph75zp0v5kcyjzl3nq9dy5l86j4rtano4vi280u2crr43ahmao0pomomry7gs9eegio4a8vs60s55kz48ahpmi0j0ia283zxd6dgxl6w',
                image: 'h403dc35lpt853o0xg96245ts8xk579r2x8d0zv5bgeb3exhn0lypp1nq10kd7d5cun7kpnz219j06r0qgqetncuc32h3ay6sa5r9ufdpvd3w7p3fet5vw22j7d1ou8gusivolabmnd6ydpixjq2xzblbbz7zh5cwq4ovf612ymtlh5fqywv75mp3xdrxuzi4r7i5wd4wcrjwwhprr3oz5t0wziygvlztqgckygp9ag8sztnlad907iswusrw4kl3j4xreozcvgjdcswz0lashkxx1tgawfuf8kcvjcswvx2ho8kuxvzcjjc9harqq26qtjmosdpuaxw7qy5zlr1e6ssyrk066oa4ea2znspz6u9yjpknucyyhr6f4jymmgqyth54kn00ybtttolru2oyu5o9zpyx1mq00caaydfe9salvufgkeapil8q0rjdxa8f1vyss20erkl1qo32a494fftnd29wb8fme1wkgzxaw06nh9d8kzlimm3gy717aok8f7z74cqsmhthmbrm7p7dbdo7rjzplfrxkoi69ersvfqtvyz3hx7rckuxjdmvkvfzit4n51up3jd2du6uyx1d2yh1mtken0t1yx0ik5e9b53t2ipg6q7c237x0yaakkt9ro8exkdgpa466wuv5ihjrkvwnisrmvuo4a9n5tbjunwwgf8z7sec04pwu0a3mqcxwvqd91nx5u0rjtx0tykyd5xib1lzvoybv7xlyav233kbxqvyqx39muvmcoc8xyc8a5bosez8b8cnw8v3614y80jqf9f690nw3sbgn6m9481dtps8wnoihgpcgqg0764kyn6qpaclguccirkfqacle3zjihfkj8uagus6oonl7n8i02edsqnyymemvyynlnm0ec7qb6fb2f18e6h47rjavncdb2ebfavgtlauux1nyukls03muim9e19bf4x256qrea2l70eejesjzsg4babi7qro7z99g4rz0z09n8ik3r69vtxq0fxhhj7bb7h1d2v',
                sort: 424499,
                administrativeAreaLevel1: 'rprvdxyxxkcxaoex3kepswpmhfe39qpukxqj527xtcb0mujdws',
                administrativeAreaLevel2: '2w0gjm78i58vab2rnnfll890hmqc9g2q4y5hji2eqvkcf17xrl',
                administrativeAreaLevel3: '79iu6zixucojohbm25pwn2xfmkksgw3e4rzr7kbbw7no51zl0k',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 346.62,
                longitude: 961.74,
                zoom: 58,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: null,
                iso3166Alpha2: 'qq',
                iso3166Alpha3: '2j6',
                iso3166Numeric: 'i8t',
                customCode: 'uf4j687xbh',
                prefix: '5lzew',
                name: 'vgr09w0bkh8cs760ef0wmquxjkou9t73nkkukmfg9lgska3cafd28m77eb1445bmjarbdboc8u0kty9p22gfeuwr0uyejyt9vcvzicfxoc8mvj7hkrh1cktajni7872pknke02q27831jznrbwiw0zfaved4h4q6ctwpwqc5apda6l9otigcl16zwpm7nncpwj5dwwgn9uqxrzzr4aa3fadc9vt9faeb3pj07os8ka0l9xuxe828h15978c5akv',
                slug: 'srxy6jtvpn4ulg0hf55tzfna4fzgumoje9h95vhwff95qgbv9r8bcvzfgwmc7qex70b2vj76znleyyfeusceymvsd2bmnn28s8v8tvb0171amuht6ma2nyxv7baqdijq9kgys8vdv7h1akk2bfom6k579luw45klooiq0p3mzzu39e1q689yx41k4f7jau7avjo2h8qej1mi7prww779zqxtg6cki99rm3ubhkbumn92z6hldixport4k3jbj4o6keekev9ww62ah00l908wnuzuonapyxwtfyrh8cne27si1ppuvcrwxxjcqrvs187ou5ln007fs9levyn376hy2lnoqxfwwn745k0az1pg74eu8tz5ymxa0uanwzpivadaf7a2ii25clxmw8l1bt9dpmiuyx8156lgchfs0m996opbpxvdmk6bvl1gybckly0eghqbpi54daohwcfaumwzzycjxfxyxzgp1d8v018yo4pgn7ew58cum84cx84e6brdt5tulwsw5zva5yotdshf1h7n9zwkoiop312vevl3vy0iopqgecl0pw0wiurndcxoemig4nj3x444i1afzn24fr868t4b8lslsi324srucjluhg0wxal9g27pz8f7tz7swvy80cz3v74okbqn4lxmp60yhxiawhsd1qnlo856tv6u35i5bs6nxyrjk7cw4sztyefxzq0a5j1uafamy0e36b096frilnves3kx3ftsdo1cvgnwdljamlx8kzckcynn98z9b4d9u37bgueedo1ydmeoet80ts9goopxmxc2qfyabbop9xm8hyw88ajwu0rdgrw5o6joukpbkmpekqg8rb27qsj2rr5naed3zwc45mwv82w7jmlae5m5w0bjqehsitqa3y8rgt1nxqrywdnk3tl1rzacidump71oouexmjbqy7e2m54uxq5iud4vzdio5i1ybmqt8kkxlbstbt1pp3fllgm0gqf863th5lgbitijo07zr4pusrh2akkpnk7a',
                image: '584c8z8i6f9s8jhn8dzb96vixn8480o57hwhg9158ynndsqjesz08en74u94doa9062rmc22iojkaaiy119dh8va4wybng2cqyx8zpw8luvjazbveabwpo9putdcjkfbm23ju3r875somc6s95l4zveq1f29azl8aw0htgpel3xlux17olcerlzdz698fh3k56e5o4nwd3ebuk5bdgg7iq3ryvzdkxn909e7ub820hyr1vger0kcyah10qlhd1qs5ca9tsmkj6exno01lus3vkcrd6yzfukvt879ov7kfdm9ov27s07ddtkhibg268pw4sitclgxhrhvzmvjhsk2izkoy61yrzr28o6h0cy8y9qp31dboqw30eb0j4itn52ne0o5rh3x5ywumvgaa07d38e8y15wor46icbsm8jplyejikkw4pujnokrh8mcsy3gjmdrwp1c7vom1lqclm2mjk1fti6f8106x96hjerrha4wp1hf8ektbxl4i0ho47i0k919mfin9mabkuhphm96kugfkk9couv929vjbj7ccpp2dy262ns56s02t84xruw9jybdok4gxikj66lklg39rz080cowjude3yco367k8w1knpz2akgj5w5icrlm0mbkugkt2e9ydt81tbo7zl8chz90hcuobwfyqea4znw2xboivsqwvokiu2e1nekxe582rj5i43cxqiu5i4p0dt5xuwj54c837h9zerbkjx3gqhitciboqxdp3iyxc887vyxasle20r7s5dimk90uhm1678uvfsn7rle1nm7irxr9kpxhy63qen3l2trbesv9i4n56rwkkzgqjgiy8uwi2518wa9zsv69egxbivrsjen8hyci14gm36gete6fpzf4awaa3ncrxl7nvr4owazgjnav9it64fhyvqkt1yjyl8t4sifk5tnum2m4trqemcq0mx6f7jedqew7z5bfh5o07l2v4u7gro2y1t4zoga8agl975n1ow7in8734vh2j2krnrt5',
                sort: 154120,
                administrativeAreaLevel1: '10v8ycqdlhlsvg49hhohdjq6z9wu8p23axo28vec1efj6ze5hw',
                administrativeAreaLevel2: 'yxu13l4urscabowaelxo1ceg3rueeo08n32jwniv00sha5qqmp',
                administrativeAreaLevel3: '5q9ah29zse5oa9pu2akq876jp8h4jzuwuji0oij847w3a018n4',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 363.75,
                longitude: 393.19,
                zoom: 64,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: null,
                iso3166Alpha3: 'j2a',
                iso3166Numeric: 'sj5',
                customCode: '1jqmeifta7',
                prefix: '457z7',
                name: '3xzor2hw9edkmx7jipu5wq3x7k556scwso9xhqy5vy7uwlksrdyo940few5lw1dzrpj0butyn0rzehn5wdqj32psgt4sok4iiox3j7vjsw9du9rpxex83qcfk4hec7urgjlcy33t6yf6o519jhidid27al6gvw832cg5oguxqpjam76ccfflrr8cpglhenliqhhv1jekpidrfg1p3s85g40c8g6255f0n2j0fgonhxqild0uczfaxilj67ou264',
                slug: 'thakeoaj0l7im9teqno0n7ia6h8fay7lzts9pqovpjs6smq5tby5zq2e7a9fx2pfbpir27rp3my6wivg3058vqh9pkb02p2vr655bkb2g2zhasbk67ntt9prxp47lpj5n3ts7c6dflwb6esx5o3hz0ho6ayo9vv34e3c4oqgcrebhz8kc1elzo0ovti5v6cz4cdax3a3e5b53kjpav1b0gisgtqf54n3rkma6cfq56adv0fgfn8fgpofeirl76laym3deojuqwkm0qmra4mqw0eqynbx083y8i9vlw0jtaucc63r8nqxodxhkrh1g4woirr7iroq2twqgany1a32dd5wal5t69mqobwseix1y22n6z0stc8fe7oisg16goykdxhst15s1y1zwrgz3rj7cto75gidyvtgaebhqlti9vwe0zmvdyta3ujp7ey2mti4l4k44d34t51w580vpsna4276b6mjlc1xm9yy5p3y0hyaoyzzy5klfstlg1nfg6ywf6lqujo8t8igr3q77nuwoe1enpo3e7movc8x4e2krdm1vvshelfbyopemwmgnt4ngsnklccgqxkqcouro1grqa4gzimh805fd8ltsczhmaqop9ji95huvi5xhwejigjndaw7uvf064t1p41qhnddwxuwy68fmkwu29emcp6lvs8act9nbjdo7j8sdeefk8gxuxpq5sv0af72fmiikc8a5ksjl22ielkg9xhox6r9b9huwtzzkpkwo3007mvg3jq5cpnjr5kh2d64ma5elru4nf3me1npzgkv05r0630h05r1f4x0o3c3xwfvlohnf3646dzv0caryph5vwxx04tq8qoj08eo4jv7q0pgv4f3xvyu6yzchg8ahsk6c2n6hqxlj3uvhv3w5unbgrs76w4tktv3yvd0gdciv4zae6jtb4yjkdsrcy9q8iynvplfh7vt2lzc613bsphvqcjdtv85f5k7z6xu2qyt8skxwcaod2ihk7h725qxfujxsz8terd0',
                image: 'ae6jxvr43u0vnfbyrg2lfx7gpfdwhvn8rabob3hh43i4jnqv43z2msl6pvyhi84udr1021id7b4wobdtkpyafiwmjkkmhdkthcx8cujvb47kso4jrcpsl5ipfuarg5szz5frwmphe1jfp2hbjak9phvvuytvkdu5fjd5tihjuvtajhlmeppfpapffqe6syxxhm3w72p1u4rmxdlu84po20haw23sxxrnwlg76yqwdilgyl899d8mz4wz9x3v3k0co870uznonkk0548jt7ff508tadxx04741ngusbia4wi3zjwc41y5j4un3gzmyopd3vdjdd9s4gl9sv6n817u5jipsdf1qfn3jqox6522nstyh6uv1mb53spz0ktama34qqrtmj3hiocn9cigog7clf2w5mao16mp00dj0r2v14te5hkarhk46pz5xkesbm3eo8ykh9gyhy4xr47pbmopejvuead9qitro7pf1p5ndlali885bad6xeuerd0b63zdo60a75xgfa0nudmglc4503amfcl92fjxu02xo1ewdl2rzqdrpdtqq32ujtowvi67osrxslm28w1otf1fph7y0mypadjmr979amye1fw6k4o68y7go4cc75otrgh9c88l3f7runmi7xgb9x1n7tf30vhldxds4yyrlsskrj2pcaprrjavr6ofqp4km60a77i6jy3n9x6zepby7c75eyrbckq2nf2j84pqminb7lvlldrk4dq99tf7a45327odu4u4v9rn7fcwg4s6bsve7tjubsp60k4abenag5neyjkbqq5ldh9ig555wmvvsbiut5s20r222lgak0zi3d51p81aq8nn07saskczlbh2cnhhuw7bl2ue8iylkxwegrefqktrs853mktlwxqsk2flul31yoinosa60tcbmor2uorwd35jzbfja7sabuc15mnnpilvtbqzmwx2b4ohrjpy68ckcmzqvpwqd9mie0mslp2ea3l6zsoxx9grlhydzxgfruya',
                sort: 982411,
                administrativeAreaLevel1: 'h2xhmfevo2gulb3isk6yiwsz6y7gebc5li4azyste95oy2ci67',
                administrativeAreaLevel2: 'u1znpe3dl0f2lkdoz7y3q6w3wje02yoc9by2vqfz0rct5h1vpe',
                administrativeAreaLevel3: 'ebhiukmf3xxtgj1izdpjnznzr285hh6fsg9jyj1ixtfcit1qvu',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 165.27,
                longitude: 766.56,
                zoom: 97,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'oo',
                iso3166Alpha3: null,
                iso3166Numeric: 'xff',
                customCode: '1gx7gx706r',
                prefix: '1h7tr',
                name: 'c1ibwoksptvp7u7f6g040307sv4lrl14xx3ihf9etzs636tgolcxfr1eqaupwvkcqmgqj3wfi8h77830512fj2myni44jwz4z9pdguu7ndpk3bpxrty1l2a5og9qih91xcxfeuyobonxa1ej63g3ifv4zlb42206qzdg5aycf5kb1r3xf1prcts72os72aktv1zmv76tmntumhp9knt8vizljc1wg8qjw8b7y2gp8nqo7i871phc8a2a08qrebt',
                slug: '38hpl4qsn2oh57pf2m66pbuig3tlymokytdcmiqewia6iohzr4mcihx69qh285dv6yapde77fsirt1cce5lidsnckj9vzg1tyyi5sbrmdct8w79ijq2i0l9iqtoispwh4vj45avx9zr1qdo0ogvfy6ynzuxeda8a916f4hf1qa5l5x77w8s2woeqd8zbuxeq7t9t2hkzoc5076r5src2wpmvk5i3ke4348wxid5yiohtzi38mzk5o4mikhycygjzq2a5lniu1f7ahnqx6x32o3h2afq5vuns6t7icrzs6sd12utp600zyd39f9t371c4lwdgzefuxgfin7tt5i7oc2284hpbmptsaktu3z3r4n6trmv3n68s8gght3kb6rjcqppguau9jcmjtfia1vv0pf6j2b91f1l6fbe5088zsglx9tu0cuopzrtfxn3qxbyeytajc8dfhdaystg4esyduqhwmubs66gckr8bpeng1pvnh5fjvfq6ad9xjsgmcy0n2u733los354368esmxryvt9tbhyx4jmtrga8wcnn33jzjtva4s774gde27xan03su6v8573xbdsvu1phxjo3y231xp2nrif1fjyl935ou5i51h6qw54e8ubwowwcvxskyw19d2bhuim47d7eoayozkzt4aylpfo2zh1l7mnu84z21xn98tiv97vc6hhu9dq7bmwgg4e1pddbr5w6u7w2851agvjbcxv8tufp8w3o2jkpdyp3ac1waopo912xws7zxoi9dotphwa011cvhi407a7ooamh3tf1h7zvbimmn08w4ktp9mqys6klzq7fnl46wsmpxwd6ibxfy3ln0xumcpspx9a8hqhl7vs9hbegog2ah3crlwvc8gmz1wepxkcoe224un3myvcrrst6gt7zq604uagk86wfsqnw0je3az2bagqvvwygpkpemp92h0pngfmy4qnfmza56979uf8pradbfukg1ajuyiu9n7ux0wmzyr1btib0v6grc9qx9vmd',
                image: 'r6radfdwdx0k4sa4s5d4nu4nc2hu126o5841mjl0a8zmae8ctbwmbsl8i7jsz2tfu5qs6ey60tes42sujineoinhibb0xhhc2tw8rb4cazekk3kj8trnyqjsgasmsj1lj095agjg94eq4qsie463bp6edtqa9dkzr1hux88e4h4ds81injprqjthnbdy4kopgb6dibj5t590697powbqa8em8s0j7jpeyzlq8zf4mpu3rwmyuy1vywf9hl2fouxus1xv8x34z26ljtpl0puwo0pl2ci9eb6yh8ceywaac4rwuipid3xvo3927zchtyb4tvv75ffy8uyyoihmvvs2dim5rk58467tp6wg8mpbymr5vq4z5fzzahes8ma900iwywlcmwxh55wmc2r3tjscgp2qxfl4phoxva8th5ss043rhockh23f1dp0691xlz2ke80w26ni7q1y9t8p6ld60jm6jg0o37jsv8cv6ko27dgsjkwu7idpaxrg4pf6mmhw8p9ew93vy9j2feraj2805uydo5x1hb761edb0ltlec3nsby9qw3jrnwl6tkt69ozaxvissvqhgxcw54xckf438eowgl4fbty7g0lynemktppr294fx15btzg07nvx7ih902he9kywccofp2yhfxy07kkp0p4gdmzootdxno9u1x45fm0hxdzbqpycn9es0yy4mwx2xfnpwd5cjmy3n174c3pczkq1py8icyif225g9z96ga1531gnsw3qxhz1z263vwwmsit88l0gg1aea6yrh8e1rpx0pb59xsu3iv2h0l24zz2nfc10rs025srsc31bjvi8t3thei2o3he9zejy576j2g3znr1nm8v1at77aum44fq283mky3g2xl1upxaflrhuz6vqbw3rta0vk2tqcfacto5p7wpxb1trszu91s4wmzrtcdgexil1uwkt1vj3zrbq7l7dpvb9zl6obs5tqes8s8zg3aof9oypzwpxsg4q5thcntv2vyzlzq6x9vt',
                sort: 421903,
                administrativeAreaLevel1: 'g39rh35s1lmtewfbayr6yvypke9i5t38y1tsp4x601p1208603',
                administrativeAreaLevel2: 'fzskad0bylhjtzi0p2kh59tqpxigsl5otvs48vz38kabr6netu',
                administrativeAreaLevel3: '4x9mbiichaa9e1jwwlg925cd6w33z68jjqvm5qea7nlieugw72',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 721.96,
                longitude: 994.77,
                zoom: 57,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: '4p',
                iso3166Alpha3: '7ng',
                iso3166Numeric: null,
                customCode: '7yt3joxr3g',
                prefix: '9bud2',
                name: 'cvkozmelnuweon41babwls5jg3fgczlzb9aui41j1gzf5a0bgoywaqyrdc4xm6qx6pwe6bh7676ta2a43d7stvfvlmwo5wp4pj8xyu2di7kt6sbw2k4h8ygey6ekrxnikkpvpg1w948ps7fad6t6n360e2ca6rcxcdmvofq5ucw8ik7aomddd4ly1ps5r3sd5ciqknu6ktd9iflru606lczutlp6nocjc4ycmp0zjpfc07iyrbetndunqiew7qk',
                slug: 'ektmdez5nuho2fktyslnlz220khjuazutfp4cop3ksi0f65u0fwg4zawd8gzjcfelh1a8jbiciiph43nkhagagp1310muicfqk95gi06ockk3aththwa1dsafvtzkqw7j09ynk8xjjg4wlelljg9nl1ck9i4z6y2ib5lc1vuhp1h5thou2bvubdt1cnlj34y2asobn3fj5y6kv6gev1t6drpdm9pw6dcfx2r4bdqsm3i1br30hm21tz0ofyz3yxp80zcvyt9tlkmlgywgn82z2uldla30btqyw61wyt1393lch0mcgm44vt5njy2ppq94pd8hxnv3kbkcng8ytt3m89d3lv96yto1c86kfzjwkcvgmjyn8w4sd0stixmjvwno453nmnjn4jfzpt3l4pg8k3c1dws2s9zjwoz9ygk53b0175syoj483u8560tyxrnzxg6y019r484tjpbn0bzfxvel48hroa5sxfuu294si8tpokchcvd3r0wzpdjocoex51s7lgcqrmk6caw1arkiqn7gsl4ue4uiztiwsfsjrv14x1gctk0f6t6oyfyfi3afmf1zxbiy38dqn5y46y5n01j35lgouoqoc4wnkutatu9akq2x2qj8ntsvl9bwtaimdv2ycjbv0rfql6cpn667wk0en0tewe4ithnmfiya9r9q7prculuaje3ipagoxk2ok2w4jdj9jo3gbr02v1yvrmbehiukzec60n1u5yubjqmttdtfnoxwouv0et4o9nbedqu0p169efrkhdhvjibb20wvqamslzir3kgbx1ay13qgudftpvupcwaldvwf1vrgtn2a0s81f0d8kpm2fndw9q3d14ysjxc91mjbfo70h01ks54veovpipujgknfst4vkvpn9mt1uap2w91998zqqrzfsdbbp5z54rnj7h9kjgsb6gvr1kb1954a4gi0s05sklsbq40ftsgtyo71fhrq7f2rn6v6htxzn2umyrv9lklj3tc3d2bb6vkvopsmtyb',
                image: 'lz82g8xgffauzquva91ed3ybt0tq0jnbuaz7n8pgekb8qafw79en4wqlcj104tl3orbfz9x4scdyk6ajoquxenstf0je2a9nvg0652k6y40cdgmtn3jvkv6rzie7am8hod6lvg6ox7jo03bdqlmydcfw8r606dyql7zer7ff9kxx359o1yrky6cjj5kijhm7jh8g8xnmhrtzuxawjvts5xgciwbe9mjltw16iu449vl9l8jwdru549l9drgwg6puun5sp03pm5z143mipusq3ypihuqlebh0234iug7jei0oknflbmmdps8tl6xhibmpnwlj4bjn2llxzetm8vpfitylbssq9vx8u4a5xtxzueuo0hs29809jl0qb2zw8lhho6z0o08k2pds0ixf4itxb7g6sdnxg1fp0r8ymqr3mfdmih6kibw8vskdwvg0lin8ansdl2sahixcou7mh45go3bos1t26ivz8slrwwcd961kgisdv8plo8ltnni4bbxw1mi8x4duk6f7tabwmb0y0wwrblo67pevn2qjj76p0u1xsepi3y4d3zl0nmi41d27fc0ug5c1to811huk8e0meynwjtxs605328ar9p8mh5bogeuefb6vomopuskzlk09ftkrw9ckiz5qkw4ea7up17kuro8ip6h4vlfjdeq0kinx6w3gyqbwfgcnl7mzcl0yfbpg9z9p0c51xyoyminckvrz354pxmshqzfwi4wdpjaiwud4wkjihw048bn6zwb0lx9jailgv3i218w12fceujn2mb5qf43nij08z9kosl8whyv8d0rjbejt3789af2h0f4hm37ridzkpxqnf5kxc5crxnqestsd49zmwiqg0tt9bfvhb7vnjjf994o18u4wugzvq8933xh1oifsdx5y629w7qpc70zcgnnsohw0g44rdi6asi7vg85ab3v9etsth4e8x7hl0x95n91wo4m9u61esxhtsxhmxni2it9mslx5kegd7uticoz1qdci7n97',
                sort: 198321,
                administrativeAreaLevel1: '8im831rztjvaefrwhtv6czgl7u9i7rltz5bg8pzqitdl2tl8av',
                administrativeAreaLevel2: 'pg6psku7hzd5q6t665ufvkf4y7pk4doup700keobyn2trgh4ye',
                administrativeAreaLevel3: 'ltladh73inr1y1se0u05banjbttgunpeqr6upq5e4745mrpvdn',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 824.76,
                longitude: 735.89,
                zoom: 59,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'xr',
                iso3166Alpha3: 'qnd',
                iso3166Numeric: 'yfm',
                customCode: '8h6ye7apgx',
                prefix: '2z9ar',
                name: null,
                slug: 'akdd1seqbidztmg7uel750artc6jc7qch5cgy2cmymq5jvpgu3rm4nitwj29awr56uzaaef7ekgrszxoryyrxvnb6bol9x47ks9qu2iuek1q8smpb8sssrsjfnx5nm8ny6d22sf2fkx1in8nupcg2q0mlp23cbu00att0kdkp9yft49e27yktiuxgjxdkbulxcpe0liaoai9pct6mo185zexoaq4rpgnk3tpb9gami9818b9pux1xx0z3zp221uia1ay1cijh4z3ot7yfbmwl3dcaorb4ze8hdq05l5o4j551dizk74lpvcor25f1a5ax5cxnv83jzz3zu08a2qp51igf7n9kfi9rts6hrmjnwym2av11royqa9u8366ukvrvksie9mqiuuruilzi5od58ox7iy7joe5lfhide5ra45j9qq1zj64redi9zob9eiifbr7dos2nj95n5ex9hd9zomkm0wxfb5kmpemuj5vxabappkp5xuvxy1bthz3jrvbzw17nkof8n0h5qbhe5ooxgr495wg5g83hbo6e8dotvwxj29ni4dn5sogtio9q85lklwu7w845b2evxdm9yf1xqe59bstpsukftvzwu4f7d00wltoluo25ujxublo98qrd41t260atwo82wcqqvdi55bbabwusr8rvi83k857r41ymvsu85kolbtt23ysnm23ghfx84ojrxx2tjpgb9gwr28sbqts4hvm3a6p3dit0ofs0rgg0uhtdb4zaf1cevmki25prjqkhn91ldumc52nj9750oftal6apkiarp8tut3b8rqtxouqlkjjonolt72ssugglar0rmr1n9f0rr7dwuso99vbwscpxccu2c5vbz1t584q80grtlvmin8krpj7lyi8k6yz9ag5e80nmci49snd84byd6fw9klfdvavlhu9ax2p31a13fi6sh4dd5zhu4b1ue3x0v745rqzygacbmqpapk1tdaoama9i4ziplz3do52e83wzl4or5c77auk',
                image: 'm3p62gufn27p6twegl6ii2iqd1sjoarpn8fqe20985ru27hgy0nxinzc7m1skisxhmqh1rl0e3b23j7rng8bm9l89pg8i6i40kgnmxgo00cs4cxqq5a62kzj0p00a65igsnueub64ez9z6tz31ju0039kokvqdazh21q5lsct1e2lx55vwyypb18g0v80fsfoh6k7jja5kd5gbrq9w688tvz57qp8azqc261fj8cw9ida85hlljt0gdkol7m1t2ct40y8lt1r2s429sggktqa1jo60zd8ekg31my8hyzclhkg6ck8p6v6bnlhpsp6zqdif9978gwhw84ac4h0fo5qf1ahe76g6yj4jk4m0d30wd28gk0m1c44mey1sbtr3yw28q2al0e79k443pj0aodeun8j77lv3syxpfjplzpjqmjhf2ksk9hc6f9jjbehunqy7blmiq1ttjgxtl1prkd0q1n8fdp3cqcrhyc6lrro7eucmpz0sa23bw5a8jb7ax3pdgucj9ia688gnl6wfundlkg8jhgx8rzilfv0vl4q2rjbcrm1nyiks5j8fl5n1syto0nwnfd7dlicxxwanah1fjsaf377td1zofflotb7jbc7svp701c57ejzclo9e9i62rqsbg8w8p9mt2i0rav2r8x8orjc6egwv4e0em9nl765l24t3807ddutozvbu2yicu7xuh6nigm6svzfdlkwifpt9guclso1lwuklkcpa8glytbpaumi11egqmbqotn4s6mz1omenytcjpylc6183zqmh43lj6biv2osjv3xapd1ik29hs9hibrzpjw37q7dw9u63l6ndwclp1l2uyffguc66mieivwz9n5ok2hsf1ju2lbnubew1hj2bty9gjpwbp37mbi7nth4q872osxav3hzpg0zmp85r87kgogfq0btf7d3r4ednw19z2etel7hsuywbjgi6hgxlyifp2y9cuxi1jfv5hkho8wlb8ca2lxad9hdbkgzkn82aufuv8x',
                sort: 762351,
                administrativeAreaLevel1: '6vrcyav04lrrcctgzpmghbef8ofd78l1js5sp0jyxonaxrngrv',
                administrativeAreaLevel2: 'tod1de1wj0jq691ezzfwxe26m8ksucse6m89xg4x200vafcrhe',
                administrativeAreaLevel3: 'pbc29w20y01cr6aff5kryh2gxeh4g72ckcqg441suo8utyzhiu',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 931.05,
                longitude: 582.60,
                zoom: 31,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: '5d',
                iso3166Alpha3: 'h45',
                iso3166Numeric: 'j8b',
                customCode: 'wb2aqpbvas',
                prefix: '8xmca',
                name: '4xfd5jjsohe46su4dsjvx1qbbyvn0kk7j6mo8iybn2z506hoel2k7dnhzkg5yrcp9t1mwpao56i2g9lh2me68w26lil36uh5mycul1t9h3eostun4rsv5fd94hzi0req1q2xhoyxvl0zhdhyipm1ptf8cnss4w0n3e2domrowxnycdj7kcktm78ahlk6sbrlr859ztprk2blq539mf7xt0nd3qqca1r0jy5voutccxx1l85arjajqwv4idc6s5g',
                slug: null,
                image: 'z2zw7rfyxo2pphsflf8wapc5bvpemc9o3v82bj3itl0t323dik4ny0gy7i1iex3gulg3h2vw6kkax22nknuhw1kkfqwid6ricdhyj6hvy04wmy6e5cy64dusvxkbmciy4sk09d9ggipji17ybyuxr4rw0tbs05w7q3gcfehc2mbny7uw0bgk1rv44ilqyk76rar7sved4twus86aeznafqliu3hwaykzoe58bzqhjaeal4icsgzj0sv6v3zkgz5d6tmox4fvaghwtybgaougbyczi783bv28djee3msch2gmkj1fom3uhfv15rrlrl82lgd4ld7xq90o4smxiv277tsz75a3071mx8iprg5ob2hy45f7uz6sm7cq5k0lyx8dtn5kvd7qyecow8dsgqotl1wbslhlt60yqlzyf1zaloqrwqgus7z13xeoj05nvxweejuhato57f6pdine1vtl22xgds4yvio0cd59uwnspv1m0qqgtefsf5wk1k5dg6c0h1y9st69uoenmouh2yyy7hej7vscuvh53bqsxsg0wk47fyg7tph84602e7ef22i7tq74elxs6ha6m1slfakden4uttnwn26rj4969yb56uaz519g992bkycwj8v0hq6ybxr7c50gmlaj26p9n47hx500b2k728l44e6h6d4wzgwgvy2536gxopryz0sn8zrdkcf578gspystpxxlqpijg83wb3l2thzcfqd4n8r6nj619w53qfhluljpowc6xndxhch0hnvvemtivehnqu74s6y7nindpip24qgtfmmpotb52marmfcgr69ldy9m4m3gxub09v42lkmdlz8vuysyc7qht8acu9dy249bivuomi4vu0mfozes8lx76tfp7glpy75g4pv9xux1p0trfs8pid6zqlgp6jqh289euz9is7t8unwicr29ltyb49yeq9u0c5693flf3nramlgdrguslbgbduw3f4kjg9lo97vqwkguij2i1ria0jp82ck7r2gd',
                sort: 501309,
                administrativeAreaLevel1: 'j3t3dp1zjiq43qhsv720iil4uht5ie9xalz2dnvwadvr23peck',
                administrativeAreaLevel2: 'psle0jhjcptd3ooa3xvqphcs7pyhw6usd0jbididbb8da5utv3',
                administrativeAreaLevel3: 'g8v3xqs8y513728bu7yeetaeqz3ju9kx0lv1k03lvlmbo3webf',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 332.07,
                longitude: 645.45,
                zoom: 75,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'sa',
                iso3166Alpha3: 'o8p',
                iso3166Numeric: 'isy',
                customCode: 'zlv5n9cmui',
                prefix: 'g8szd',
                name: 'svikda66apxe9vgkbmb11hxj0eexvdmcaur98w8xcmg33sqcqu0ob29mmhgm1xle7shtt4x5fheok36mv3sehpbxc4zfzwt9pflgev98rdxzc4b94175mpqin4o5gkwoq5j4i0ty8tcsvo2b2fz0eb5hpixdxfgly1hb793rzo5yrzi9rs2u9v7da2flytelr33crchn1w15ous325idhbjd9m4g486r43zioi30klwjsrqs7nd96e8q3086yaq',
                slug: '0b9uwy5d513knwtn6rkieedfk0mdhtkt8sm1y9ljpd055zrezioyp35lofvn0xuqtmkctnd1xzvb5ahphnsc7lr30otxxbcyrqrpobk5vygckyt98rh7hf62d38l94sj8pbkya4yau46gvn6aankhrjkr9zsoxowcyb1xzt58gd6cw4n65bts925zr6eo0qzi33lfskqa1h3j5ogbh43rd621o7ufuumhbxeqv3cqbpa580d36lj068vwu0by97opjts4s8lv3in39ye0dlm6p6xnboc10veeqc8sg0yo7i6g7f73ughyabpqoojik0xsrhwxe8sb9kgz4fzfxe9nshr8rjmsinfje9dgppsfc3h6ddbor2gr8ps0d8ht1sqmwaufxivk4vj3cb8k9hhxw4dhtip9e003umw4bpbzgf4h1fmd3zbynu0lzodls9wbnwky1096vdef5t1hv31jdtn2wkzorbny79m8qk6o8j9ozt0mbvpwpxwy1shil7lihw1r57orlokfcgoske9mqxhb4osjgff05qyk5qfrq3s1mu68qg7u76x2t1ro8p20ykgtpashlnul4lqqatn7pm5vxo4coiivs757hcrjpqzqm82ubs7ppxw8ouxg7psq5meo8qc6g1i2qz8sv3zushuggajay2rzjdfsmyezm7gukb32gfe0jtoudjm4nag6gdzvs6vjquddnih0jjdr7jshoxcho9hxwl2jp06zhl317vue9h587s8ockbveid3do3b7lk96sf8yi4zsh5yow4snv8c5juxkhg9jx92cy74xy7is13i3lhiuhw7i2qdgkzjf5132gj4wm3cyl6619ihhrp8do9lhzubdf0171th3y6zyrtpo1308ettn5ysm82wxvd5pu25ao1ielhvju1ndfauzelrconpoj03wor9t22lc835umgjb60fn6zj1lestap6me2c0vzysv4aen54qhzfnc1aocu9n7rpllspq49iwoebmg2j2fyfft2',
                image: '0fn8b26z07j5vpmow8ok7gz3qwvot828iier3t5s00nn1weyamqkiaron5kt8q9z1o78s5oiebcj35nejhhp9q1165qzyal0sfgz90nke3sgqvtcaiw8pj9ldyg0fyx2e75jnqeopbjo2h59ng3yta8c22vq5nzfudmr7zpv2s4pk7s77c87idrx55c0hubsxpnal8ce61cnxg8pz5uff13h82jpkik2siuf9zqzv0s58rycyu1sjcczn5cbcpviu7iaggg37tfy55azjhec8nd88fau9fnf910k6hvnxrm985fvtvqpzikix7xu248pu4rvavsnzgois8drg3f4ro2epjmfuui8b0o9m1epkgcag0s61jmo89qtu07uzs9js5pj5w2utzweiss51m7s5jkw8hwcgtdmcbs6b2p3n3vprdnin6on80ybn3pckgv2plj0jje68ipl82x8i34kx0gjcf6r0ri3coi1czqp8dn5ocibf2yb2olsyxngmk7b23lar5l8ix3vbvrhvf2vkh6w7pjyvk5a7xno7ygxcyy44bvr7aof4gzlu92ftspnsauhx63e8l2w7qxuoopnuj05c2coldf652k3oc4nricr45u1wgevo28qa2c5lafltelmch1bwx5azk7ilwz4i9onmaw0tk9e4tccnssarzwto4iuop6tyxlxyrukjjxw29sw2d22q7jxbdf275y1kygxds1f6qsinlndvr2d62etiie5q8p01crue8mjuypio0v1qfoecox73pg69hd646h1lsh30vmygl8k9e1e7798qc84bote16m9oqx21lviirbv9ysrskbsxlikvyxrp3veyuzzsmw5ajowfevq6cfd0n3zalysekbl2tgmmphjlqb9z8dsbdpqcqnqoruhjlwc3uptj62tsxa4scr7t4x7zo38gln587ksd3bwxnl2e4ic8jx22vjnwlmo2zgfcdyg52yd4wsjc5ryc1tvcqi8xrot5x8lybollbfpyo46',
                sort: 432788,
                administrativeAreaLevel1: 'c8zh2vx0bm3i5qn5mihrq9g0lfjzn5vn0gpi4kk0jsy1i8ujaj',
                administrativeAreaLevel2: 'j8uqgqg755qbymice817s6zybc06xzcy99zi6p99gr6hx4qwis',
                administrativeAreaLevel3: 'birciv8c7k4fpkorwwwqrf5dat7cid7b80y36urj4mp195154u',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 691.63,
                longitude: 367.69,
                zoom: 97,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: '37',
                iso3166Alpha3: 'l06',
                iso3166Numeric: 'vpm',
                customCode: 'jzutrnjes8',
                prefix: 'bwyfd',
                name: 'fgy7ispnt2jsk7fzxnhbn1mn7w20d2jb6jugsfwop1a9ey3qgt6lp8mbo0d5pplrczif7zwng0qjdv6750xbb3rla2kmjhsd4ygabot8e8wijxxiyj4g1uaqj0j2r1w5qpsnobolzws66wj2xj7xivsq64c4voeb244x38l0rubf560gqd1xmny8wyss17sszt8mp7diy57isocorn8cnqh9ed4pqsnveey6t3ou14jydqqlflmuqi0d6ftw3z3',
                slug: 'vrfxnw3no5fa6no0k2wyy2seif3fyg8ckrvbaaubp13qdlbqa8j4ujgmma8zndwnmnukh9ivpvavlmts0ujprwvako48pov9p64ha4jwkqkgiqu3y9kel9f47lerya3qt9h702qlds8hnm29tfy3nhgtnzy2jdxtk2viz14e774r19mykimq4ovimacfsumw3qyqynvkibye4ckaedlxeu7c7rzc6qvdx9wxe28xyam826f9knw112sgwbf3bvvaewl0c5occso1a0i0ooc045fvlqjldnb0bb1lnx6q1y8x5fo8gou25o53hb1mksippkk9gjjza90e9keydsiedwqtxaqkokvt2jtv212eo5dyag54xz153megyqah6axl546zlgb1393x64i5713nofcngd2m35kjr36w3vxcu4cxbpl6j39ynv334b7a7o40c5vpiqfo8o8z39zoyx2mh7hg87a6fvf3gev32r2xf8ydbw9j4n96376y3wn6ddxtak9zcswib7hi12tbog7bhhh87hmesfumn1ubtgw7acw5cgeheyj0qtkc28e3sf0cw83huetlgjlgl7pfdfusaw06ag8g7xpviy0ioumt25u6jnvbgypjsabo1xp94oi53rcemvg8ccfbtwvkvbc7pjdiqs2glpimpzthaod9m3ig1yevoaa6jyuso212cj71dux9oeqc8wbd1ejjr8nknxd1sh34b8fghoycib6b86u4f7o8cza86isw20btghhqvni4lglg9lwq38zjnb2n4arcp5wmqxu3o4q7d9n1e2818sx1k9cu3dq5hnqg4m3fv48pufemdrqsliooofz3p6knz1bpzhuzeqilrobhnona6r6r80lu8o5hoajt5go2c5co299cg8dilufui0vyx03cq4gxh3pj3ehn2k8muooy3cudzspioe07j973sjn3y7lawvaryg9ydf6xuj2juvy6aja9ozl85sjs2f3gpcjh39b0iqwr2im9ntr0h211',
                image: '1q0lh2ki10rfka2gry9elstkdek31fskjisythse6rkp10tj5nooo2rprobce8r8r9i4xhehqfr8ssci2or4x2akglemncyp0vl0817a7iv4ipln7p4tyweo695512nf2dpw06bvyfusiv21qa25xedlkd768h6zu19kzlrluctb85ynbtzndte1cxqn57pymx2xsekep47xqkx91sk9ln7g66vnresk0idbb3nvr81gk87u88wa0bwbns1cssr3ftotelltnyjdl94dyqcsn71uo9cr0i1fpc7h7feoqsze5u4319925kgf0el8rqm967dsm2wiiotrzoejcxblvtzdbk7azgxbxjh5muome6y2nftyenn8831vxko3fxexf3jzyaar9fh2r8oo6yfxri2rbmm1x6ts8l1tjmdstb25apdvwao1135q1c6gvbxv1zw1epzcm82i4852fkuq3h2xicf9kzq55pyby8c5zvo5khtfcthkdq710pq8r4e4jkepqlh9g173fh9vu6k28pgqmqgw4caqce02blmbfkqilk49g2pbpvlc4cha27lk6qy5we1j13d9c2l9t0b5sksa1fsjoxyqjnwdxc16e7vz5lomqqlzwk2imdkd8y5wq07fl7ndhzcoikmb52wirdkcbu0vn0kununufe5jia0szwg7axqzxvpmx8oe7cwz16738qffnawzgeh2qvgwyytwgzdab5c1og415i5x0vku3tlkgvgmjow0rb9ip23qdnc3h3u4rorn7o4z6cfk65mnaf3hvfv1xown2ark56y8qh6hn8vq2yw9bzo7pnmn1floqr3l870v9y56xf0p2hxh4ve3vfj4bm2s2o4zcd2b2kqpd10sqwn901ytxx21q59wgam0dq6dhg12ywarg20cbg1pedjhjq23u4y4sdp81rk88jenhddr5hhvs4ong13t1a37mt5zfw20g0bwh5j7k7k5c6z22xx6oxr61la7fhkn6sd1vz5tjkaqg7oa',
                sort: 872935,
                administrativeAreaLevel1: 'yyfxbbxds3sf6efwpueb2lds7r76gflwpg6a2zifk8nhnhnkvo',
                administrativeAreaLevel2: '807a6cfs71tu58vf8q6j4c0tmi2rdzwda1h31k6z4euj4q719z',
                administrativeAreaLevel3: 'zx037zqt4tr19nq39sv44np8fc5grz12h3ewgnlynnd9t3kanm',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 452.89,
                longitude: 515.98,
                zoom: 51,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                iso3166Alpha2: 'kw',
                iso3166Alpha3: 'l5n',
                iso3166Numeric: '2bo',
                customCode: 'uee9vc4258',
                prefix: '7ykj0',
                name: '543lmo4b9kd2s9zz940pbp7agnu08jwt5fse04nmqvho5ph458elm37ne3xxzu55kcc9wlyq0ab01dyp58wc3l7ge3x9hoxqtzaiej3523pd7vhfz8q6jrpc3xjoss9zun20twg7vshlt80a1q6tg6u9uag53r5eaq0jmlauf3ge8xkq6riw0lf2lcbolb0276mup7nb5njwlbt1mq90mtrh4i37glkvzcdfmfxmhh536fgarfnuigac4vca269',
                slug: 'x2nl1is9m6vwnkbbdpocxsved8misa2ohv13icfmms0tlyrx0vk923lv7vo0p4oanl5p48sr1e7d3s674qgsaml5zmmrberu08gfmxs4pfaojmzcvoxkhzmt0x9fibg8wo29nsyiddv91b5k8vvc6brb987zbvih0atrkrxlyyxr9tj15upcqrcpyhtvwla4t2dj3h5njj7g1i9e17dflowk8sttblsycjmfupra0xoye2t379g4fhg7fb7z8u89iek3lpage2llkm3y0a771gmy9uddxflowu45jpstcqnvqp2w4n03299vo5et9muwg7l2y2vqs7kkkw5crjcop231x0sm47gzh911mote6v4dv5l0jy7xb694l7y08jlsvg4fe5q3mb9ry5hqegea553omniipxn7ldcthozxig8x8ebqnhzfpgzvrytmqk0vem3vse2r3wu47s4l6uu3i6cqpe8o8q6y31jtn7drcn6qtvdtua9xovc6c83h6mhj58fbadcs4nh2bmb0nzig2gvkmsn5f5cyfi2ru0fz0gi21vkxh87x5vfticx8h3xs94v28utdzaw7adryjcq94r3uojn5mvyvpf9w1odq2n13vhqnovcs1vz1qj5zujltvd1150cyb7xdndjgfsvr2c4urwqmsi6u32l2eicf0c9k6j352lbxgsp58cnogjan7hq8a1um396bzmzhd6b0rkmk8ll4whkg1ehoaivxw25uvie1ujsjogfnynx0jbvocs54qw0kve7bztxqsdvpfwxe2gie6u0wc83zdnxwlm4r12p9lerzywzz7x7zowcb8j28hg6fy1eetkdm74rdms2kmihmrajuo0l6uoh3ga53nwzpzy95jmpihb1ygeot1l38wso9yyk7pusqj4g1r70ts0g2orotmvlytlma6r3l0vh2gx38338rogknf68rm8ytezb4i44ovip4tyo1ipyw44pvkji1kk65oefxo26gizslxg18rlxy565blbzq',
                image: 'hpbxpfzu4gvf6oqcnoixdwis499o8dvs2nukbdqzpkuqqw1fnlxwlqx4aikc79igyjzto9hi1q1enplzqvbmhh4xm8ug6i2o8vty90xlb43e50pxdlipnv8eruuj3ho3ad8xokqvi5pycasshkl509ayc0zwxcpwetvvj4sssb3ofmm1frvtcem5n6hextz2pcmie8swoz34gp5iy1qjuo6ba0czth8u4qzwshhh1usqj6u0696fp5d5dspvqkpdmil803zyrqt2g9537cys6xllqis8y66le9xsmrfdhkwnc7qnpavw3fstpyjzu3qcvotap4c3r18hfbrf89m09iy30ndo698jcamu3uw7ovakz1uhr4hqmgm8oows0wy1msxckjzmoaavz549jjee5i7g5fi6fs5u6g50rvtn4ej0i56kz8c3r6k45390cwfvx64x2v22jqnltoi2xplb5ypomw976zzn1fh8um60qjvipz67pqkd5whx87150aoh8s3rnp5fimqhgj48gouino5r087hutzr6rt6r4q3kh8fp0cmdrx1iblg34tekxs3rjk9fq294v2i8dsxmmfnef7vo5c3iqv2zzf7ydejs5pmanewndjjnuvpkzh3ibtpbvhv4wdntskx1w1q3g74za66roaaoqjt938euevo5pdirkmvrgr3zooniv5ym5qt7hgqiwddcks3s3t9gr657bxd70l7haoxqcanl84k7v24oa0wo0jx412dc5ou0lmko9tkrv0a5c1iii9q0orbnvbf0ua2ql2noq86z245mizls7qbzbif6cj99c99jezyz9x29itci8zm4m5ar13birt5zqqi009io91r005hnyq1hlgx1w7rycke4e6abd6opgvluc2g4e3ohvbcwkj40fgaapj3b96d0fnfmv8qr1ozboegyhkfs3a2qdb2qeiz1h3vp5ctv1kxcrnbipisnsef607dxokvuin6f3ujfhwm6vx9yw5gk7ig9l15cyc2',
                sort: 650553,
                administrativeAreaLevel1: '2d5qtstsyzqaw9lmbi3hdc1maqiy9kn1ddx0dezri0s6wikyoj',
                administrativeAreaLevel2: 'f2mb4yb2zb6n73v761oxmv45dffzluss2vom9m1w3lsnqjccgq',
                administrativeAreaLevel3: 'pr1h4ttf1kds0f08ydtk6j3p9o0dotrtl2zer1lt1asm8vfrlt',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 289.36,
                longitude: 633.97,
                zoom: 79,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha3: 'dy3',
                iso3166Numeric: 'ygi',
                customCode: '3rpdtfabbw',
                prefix: '5qu9h',
                name: 'eg2khpq6amzaryp54yxrj4v90lomqoums6hu5m6ca16uj5mu2it0nk1uxdsyf03a5bkqm4q6zlg5ay7k9iv9jc9bzug2341dr3u6ctgrdiuoteq3u12pa74xppon6u5uhrlagl4b8fkepdqmaynpiqolizmpsh21acj2k8lv2nb5cjd5remrt2b9kllh4w66vkrlth5smubx16p083bi3o96z82n3tt6u0p58ddp1acxfn7xwasjhq5jxormqg3',
                slug: 'nsjz86up2il5i8qbypxxo5wl9qs1m9prgffkx5yfydr5b2e7ws3qjq556zttchk6mldutfiir9jep8d7flsbg8cs06dhnnxjt09rayttenjt75ssifz2qpuyyr5wwk79j364bv0lhq3bb0mvkst8im79kswfvvun204po1hg5t5udpymsp3i8mptcniy2y7u91k5xv9mflgk7622xqt8ebntt2834vc2zjouu9z1zy31tlfc26xt27xh6r5xc50sl8w1l4ai20pdlrb3ocggx1dxpq041bfm9t4919zt5kery3yctohpagoo1ji7i0ujan9t294wleqsjxodktokfh9hdz8t3hp5qe31kkgrf6h9down2uvmw5lr365t29b1nagtbk2yrra3pwj2i3hegspiwhmr84f6y66tsu4rcrvkqf1zpcay6ra6swtul3fua9bct7om5uzuv3gqaquctppj9cruc9h8bs3221unhiuhn0kp4ryd2x5g3wpt7tik86959a6ik3lrtjutlr1eixhokbfdlnh498d3qll7ai1bvapxnpkdok638kcvl51mso9m5c4i4wa3ksrxbtrqdygrjs9odgukb0d64df69tjaq3lvetvh0adqi8mp29qk2t62yumyzvv9c7ljj33qzjy7o3bj0wa0duq7t0ijcfrmbokacwgc9o3us7ne8gjr6ghw61xkd8cwf53fftq0i44p69fw0l9vg5oib26d7m56ewhsojhxdv0fw2ko9xiy1iv6ivep02z939bl4xskx0jahvtoa9m5eorek7dilek431rgvm0nk2ayg7rkheg2kzlwdd7t97lkbplt41wf3ap5owhe62gyd0up4yogb7hn3wcizcxcedtecsqvcjn84aglgoovx6kg4jly21t7cc2m8rx1ywcrd026lhb3v34aw0cqgcyqu5y0fe03h8ka44ttj9uihdm8nnzk8ehh3v5qqwjeni7a39kq1vdk6yf6d1ugytss4t0x8e5m0cu6',
                image: 'pyifwlt00bu2u7f5hi132gek9ah94r0ool9hxpizhp27jkm7ap37t376bc9cls25ar3y08qugssrl6lietqerpb6hprhw4nqt57j9kopktyevayq4bra5gy86yqnk968c88gjq9dcse6hbd4ka80k0psr5n72hj1vsqp6fdhgbvw0kka1zhtnqmhjf8t2guxgx7rjrtlhvcow103s7necd56o9sbdh2ja0qp2mcx78xpfnlm2g3sq8xftoq5n638zwi56bcfwxzhol0doz2ai625ccdajhewtydyy9swabe05iy2fo7jbt0zkt5t0dhou42mli87pbbeqj115mccfdy27au02ua2cfzm8hxjzih9ft1u9b9tvxth1lzrjdw8lsbaoz3yi9j8pqyzk35oqtc4eisf4n5l45vw1wcpqpkicvszyrg8bnujcnqw205nt4a2l7hjxt9y9x4q0ymvhm8bzth8in8punlzbxxrnfdkdtz4pht91tszjmfzrnmtux810rk8q06kukncbdex5ahyjwlvl4y8p6szqw93g4tm547f0trdwba9wny19190412jrdo4v1aj7hfk8i5dyvh8d9axrb7dwchm2qc0q9eytia3d0xop9ka5elxdgvn74osjo8jh6d6zxxe7b07a2irkhqxgn418ffw0x2slx6oh17qa4wymusx9jv2nfc1sgvtbux7rcefppagt2t59n66s7qr3tb5nuvrnlkof6xvhnx88455zn5emp35f59lpi0pa7ey1qyn7n41z1o22izn3v2it4ah1nf16gdqcc8s7nntdjhsxfdqex1pcr1f5uisu7tpo7aqemurhjfrz3ygm00bg8jp80nlvv7tdhlmaktchncqyrzy993b639xgnbu1bmrlqa8nl6yvmv39pd6nh6oh4jkracuq7xfletfh8p8f1bkbdn6jd4z6yoqg32qyec64973iuzx4rgty6zpkirfdb8esbn9cq5f8v6z4qr4xwoptb17sw8xu8mp',
                sort: 729365,
                administrativeAreaLevel1: 'c5zrfsjfj8sxg139rpbnj95g09ohe7wvykzxx98xslci25gwem',
                administrativeAreaLevel2: 'cflrhdb3flqb538c82mqatfeowpono5xos4violn74720ax06r',
                administrativeAreaLevel3: 'ux1teedazfn91yzd9j058ux5ao38rp91c4tkltraozr2jl0dom',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 190.54,
                longitude: 890.68,
                zoom: 47,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'hh',
                iso3166Numeric: '256',
                customCode: '34bfx9q3m6',
                prefix: '32qd3',
                name: '6ymje11w84ehdahlc1l52l1knkrglzqbkutn2kthexph2dvixjifhb22hzfrcftpxp93l0vrcaa25pgppuujbj4x0uvzbae84rvqt4jeu4oboc3lej9qblcmcezd9j9ktyekg5sac6a0eirolhioaze0iytmwx3wsxl2u9i7yi1z7uyc25t6p79ibr60qo1g4lx6spa5y0zq4s2hxde9dkvtqia0wx7bzxh2tk00wgfmb1yn2lmtipg9f572hgl',
                slug: '6rgzsw06vpdvgoiyonf7u2ez77ic0vixtr1g2dp085cnzamh13fn691yx41m1pxx7f7m0h6feqjtswusal1h0onewedj8tvl77ouwjn3pj1rl0hamxjar8knduqh3yirel4q86vfo5lfyo41larmrx0f12l4mzk9wbjjaqjlt8ymcoqr831ofc4s9rsu0790uggn7qd5n0un6u3e8vyge8e9dfrg6lsexianzonhpnhlvvdah14f3hg2gb37x8p6g6m3zhu9wu19wpshx0migoqilj7ebxtbtsehyudv9cvglemt50tjq9ikphpr63iclhrg1ba8u4uqtsovvgaozrnhttyt780baft16vudzmq2tcvlo4uif4sq3e77jiz1tabdr31qnj17zfqktbeks91rptkn6hwsnd6xqv61y56pq87bjqwdpzwhj4uymdk6pqdltt5ua5gyfogyk4rp0unlq2aq6wa197zjl4w6vzuua3keemvvbo8zg748znxv9thmf7srbit6ljjd8jysobp8871c6a1x3lssy6503sjdgmvfeamq62kivdadoup2xrosfji321c87bhzd853w32o1b4w5cih2j9gb3m9i7wy4indcor58iyerfdn05bnsti9g5nveaenkjxalrfet5cysw560oqfb9k9krc3bbuq0lzpubvrpmpxdxv3pkom5ph5eiib8d8zyjeeufgpbrdi7u0jggjisakyzgnc5qxt941u14mh96ewx5yvlb94osuwm7of7dnxgtp5yks35qwf6u278t0jw6xz0mogjr565f8rhxmsjws9byeq0jnzvmaq5fhq30mk78eunle417y51s98lyt76h62lyh45pt0ut72eld98qb6x51zkfj36rwvwlszwjyh2v43ooru831o5po8rod39bkesy1jwwqpm2bzduqdhvtslkh2xyo263n8u7rac19r0h1lvoh6v5t6n1f58jbj6633wfpiic3t83ax8t3t91qo1pm442tw',
                image: 'vwlu9y0mg0yfaxq74fonms22dfpbvmsb3c4j0vdaq5g6nrb69fwnqt9bkpxqlcuc27lcoqo2zap83cix5vljrda0kqfb7j6xnit50m2384ko9igprs96yp6b68991ouve86zyvp1n6c5ud6xoy3b6a4vvnur5ke4mrp5w441wos6ns6qdp1nuff3o9s417j23a844xokza9rs6wfig4nldq8xveuih2wyrb6j2m2qgex4wds5f19ln8rav5wugbh5ca4w1rsi8etagg1f6c3c0rh9jv9l0q8kv9a73zigucj1fjjd2roptiadehxcuvu3z3mntuaz0mnvwc393z3pc51emloylmjgeis089wg0xszlruucttvnkfepamvowotunzs6v2a9neb7hik8wqu4wk1jghjqrnpzozkhjezy1m3wd6oo1pqzvy6jdr16f61arpz64rdfbanqp8jl7e1zmyuixcimikeomj12ocid126ak8ipcq6zgxf12rvnoqlcyfiqhut14prb739sfacmzww59ioflhmdzd3gdf083puyeqtjqp70c09fk2q34a4jptnbpv1qldpv7qz9glf3smloh3xyttfexrmuim6xvj1zdt52q21r4z44zuufn8ly4ceol56116f2o8pyqxn0xecf4e0qlnv3k37mqxoo8mqiqe95sizwcwxkmgk72qvid8jh7m1wxmd3z28rnkf45cd5jlgzdoavn71akyiskwlqadysxwml60an2mwx0cuy8xhrfevm5d7685tboubvbmro7h1wblrjksdb18nqk5v73qg4bnvuam4imbccsg2hxz2lx20rmj2e1sv7o49jnm99gswgmt2tu57kp9mxw9tlq4c3x4autp3tq73bryazaan8aq6ajtrn93yxp9zdzolymk5ozig575x0mg8nkx3u6hya75n4nb4n5fqx7ht3ucgwxrdoi9su709zg88bj1ufqz14goy0qcw0lwb0qc4rpb3p1n6rr1i3utxap3',
                sort: 909337,
                administrativeAreaLevel1: 'huiqun3h0qv8h0fk76a6st2acuhgaly3sltlgi6ff52jjo2ihf',
                administrativeAreaLevel2: 'kiyn2uja00jeghe6qlpadhwx84d1d76tac2pnclcbt2jrhzzoe',
                administrativeAreaLevel3: 'djuh9oteeyo1vzn9i9zhpdny1sd1s8rv3e3bhyqyr0i89b1krz',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 342.25,
                longitude: 608.44,
                zoom: 25,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: '19',
                iso3166Alpha3: 'l6m',
                customCode: 'sw7v2ih7rc',
                prefix: '9rnqn',
                name: 'wvvihfh4ie46fz45dpuvfej0glaw6hq9xp1phjjzhszwghkgjwn8rcx19xzlrp514nvzs3a7ha7jpjcfjskvswk2oc32opdyqfwd8279m5wgyx3hnwjobyn6jlqimaxny42oold3p15yezzovx93tuc3blocnatx5lhu7rpl9de0f15sqvyfwkd4z0hi9axjiu968pezb23lwhlqarf9lyzlotst6qp4iueh1zuxviapz2ej5v7mndnpxpibuim',
                slug: '8b61fmbykho2fl9vtlej5gx866a07sq53h2jhoszz50vq5ozniom1jrsi6g06fm4a2cgtwebk8vyemig916abf96fd8qvyvyan9cvbp5dqewzhn3nyi9gkmd87zwydpvyrlw2i26po6clqw21up8boati3jyto9k5fseer37xbpz43oeupg5x64l5mj07wtguwkh01ed89iuhhmw6p5fz2yqdbmpqrg5p78ig28af7x3va2lq1dnl853h5f5w2sc3mfjtkmkqv0oz2n4k4g68v0kg7ql1iqyquqldxh07893o1tm7wkovhus9pjy4c2snhnqzemd9cnvxgbn6fsqxs0rv8et4rkc8x37cmu40k892fo2hf9m3y85cyni1u4er80v310wmj2bvuk8hhomgnbplpi2v9xcubfzcr8j5xg5d6bawvwspt53rzs55149ylvzcojouk92q05vjg3ruh0rhrt4wz4mvrdbpj6ma7y4kvy4e48f5m33y73lja4u0qvcierp72xeqosgelzdklfy6sagqcrih4pgyh1bef0wrbrid4kvvb6tdygeoar6226w5ng6aai8k2pgmwwqupjtg6krkbkzkezltannpk49tnovbtt3d6dy9exxyu2p1id4ksi98cn8r77l0wai86jwa6phxysbj9day527jw1zw4by3d87n3b0fxcums3yi21tuouhlfwtq2q96azlvigoq57hcjj7zgvhfqzt0kwv9ex49s8qm3p7vuo33okc1o5oe0pe5z3sjgz929pzqyd79u5pgh11fcf0gocmvd4fjjuty59crk5uv0uhzayoqjfc6jf3ol6896nw9tbwagfqv10j5i1qy66g9shachay7okgkgfpv1qqwbr88j7lk41k6fbl55aa0008dwppjiejb7lbzmwow8lc1kplo279nbkx6ltvg3ju1m3g64jbtzs10nbifmii0xhg5vjaacttdon8v46ovvhl3n9i0lmykqnvgxbhj2zje10k3pxp',
                image: 'lj2zu0ap96d668ijur3nn26vy3affa2kz9rigp7lz736dmlcwx0lgbol6iif6tudg7orm359p7ibeyqw4ooinjwj6b1moajrrjsidh8wi4f36x4begnlnzsszx89mevte3ptpt6aqrtg12vn92l1bvdnzxpe2fdc8pox1fv3qy69puxm25oh64wd3pkkn02v8otyuya6enwxzcmj85613xgie7oiudzsr4c63uuy3t4wkcw7vi42oi1k87iofcl9jikmlhkv6cb24l8xi482r3ld0ejg7cirh1wk8lz956gwig1met26pa1omcxaj0vyut0kl7nzzneeykmcax418jgg9fgqxnmo32zvjo530fpe4xozczewrm7w5jpjo8iijf2gk1c8nonywjawhhm882c9pbie9w19isgwi21sfqbjpc1p4temgn6ekiuh8msj351wfgdrd73t4hp4ng3kmir883cct1v0m1rutb83c5mo91chknt4u0xcjmtcm9p6tr4lv1spphh6nnxer7qt2xjdlptswoqrwcadhf0p6ug8mf86xiq9j6mzhoy18m5e2qzwajtb0vlkb54av53us9mm1t9099kc0yo5izz5hy9mtbsnghuf3i8k2dd1oa1s6qucvwcrgriytxc0maigip0b5m4ippz31f983byzexk4m67uriazfeh0sa7snn04m1oc02roxp69qsosr9vto38767nfnbww78fey2iwz3cyo29sp12w5j0vhn1log0jp9443qnehb720wfcj64q5hvzx2ifldfpl0jgan8gas2fw6b2v01hz6tpbxkdnpgyl7ar2jor7rvb7d9cq48hn1ytkdel9qb4wb1m0zhpmcjudgbeqcelab88zr39b7c09oocxcr3oj8cc1j9aaq1gmxbkvf383nivc1cejkkjv1ezsipbywkq0tx3qp8igu3rn8rkoazpc0nmqw6jx27kjm3q8f1yjcmiwxzcl2wu1np40t9b89zlja8i5vq62mn',
                sort: 330140,
                administrativeAreaLevel1: 'p2kliljqsollq65n45zwthbzss06rvmp3nso5m182b1zhfdgm8',
                administrativeAreaLevel2: 'mgotg4mophfxh63heufz26exed0f749qnpkdv6u09pjxczg5hu',
                administrativeAreaLevel3: 'z3f8h91m0ht2irixsfidfyu1zkfil82kcmlbh19g2rlsz3ulz8',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 487.77,
                longitude: 639.96,
                zoom: 89,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'v4',
                iso3166Alpha3: 'frd',
                iso3166Numeric: 'fii',
                customCode: 'gddnkaqub1',
                prefix: '8gtg6',
                slug: 'cui44vzfagt1c6hnjuppkjz3dthxmwx8w9najzq02149z3hioiojz7xrdg0kal4sq4tw7zmazggz3mpiu815v4japimpk5uxp8byx0icyow92rlpgzjlt69v49puiu5xjx4c0q8j0twzwzqn7ojkrsk151qu74kfdslaawx4d5jbis98ol5jmd61w42khoe2im4ndn7wx1d5rgxknjixky3l84gsc3l9ew4yc1x49dw6484hnd92ccnzdnej7jesc040zzkf69ejob4vija4wn01nww15b9ekm6trskwwjy2au09unozdzcjlico9n3m00bp3ab1g17z6hgr849os5vc9yszw2oo5vvdt9ozo1vgbbmmh89d3biyrqco0eb95actlufzrx8pxxnm6v7t40z3x1943cbfanls293ym8r3p8fl61thoxc9y4zu9yji5ykyvtp1tn93x257qleacjkgkwzwiz1xt4gatj1q3mt57jy16v0z9e9fz9b8krxgxma8eo9sxhk62wfv8iqq6m1oj1d2wxrwdizpkdp8duip1edcqy6mv1fmfo271om1q88l08svcxcglhbg9c6v9i3jyg52cj76sbwppckealpdf2l0qvorgbw2wfbgp1f93uaz8t7lpfyi5a4nl0cbnst4820eyd9vkogo5k184ogan4gr2k0jds1ysaa0qsm14wyqdeqmitpkekw00h7dn6wwl9r7zaaknn6oamrb79phidwkzw0g6to2k61jtqcwshc1ovxeyiu6sr9470ymx7tfrve8soiv81ub26z5o8t5pm65sb0n2sn8njj5b4yv2j0819elx72bizwf9yykegvd772j6jqpyg4g52r3l770jdjraqeal14hc7c7cuuquc2i95qtj3xgjfble8n0ou2x0tof8ni6bdaos4hnjsj4jwm3a42vgyhfy0c99vhk9mxxdbx5t9jh4hub6z59uetzn3wtsry4y2v9vpuxnrpihoo8t6ik2cq3ttf1dvc3',
                image: 'mi5de3qozevr84xmw9j3b7r26ikuj0tfl8yyrtznuxe46c84nhrmyash11zpmishv6vrv02n33sj5drin7zqa7bgv6oijnmujbtloqyxq2a16nb0hnwil28j6cm4tiqllzp6mvp163wtcuolh7hx1pb37yn1rypcgsxfumu10qrs0yhe5abhsyolyh03esnbou8mb2qjuqj56870gzjcvon3w0om6faw906lvazywmryz2d8flwchvh0xt931v8bl8gj6gf77b751fbba09wajcc20nsbvxhyqiahcdi9xggwt5kwq4xbr95yq5kc945oujfaxl8oc4hmmhrc9x4x6tst4lybv7rcaa0e529n3iwao6sqcn9c2vw2r0rbqp4b87hia8k3e7jmg19qqbljikkfp2zxlwzjakp5ksr2vx3ek2ugrtpgki65lybb7w7kfir6f1xo46pyhymh8jzs6bycuj8ga9deiyjeyrqi5a1hg954ryeioskhbyio99n5qdnzvqr70ki1wxgynqyprcvgb0u38evk8bgmpvqievyedcfabtek7p65qep94kkulcptxgxsutrgtf8bl8b4im3zg9sepllv0gscs10zo3oy01908ehz537b81bfam1wgjy3cm5b9z1s6tzprjr9nvy3uc7z7t2kmufgxg6wc52shj97ei528ap9mcoxqhw3uik6jz7gw2wwnjcz47cxstw69a83w0htsj2ecq7yiq3kssuwdljfog0rv5n2pan35t88z9wc2sy4sty9o09e7vue04n7cd0iq3uvzmhrag3ey33g4dkgjbj0lgh5vg01n9wwgheglixaobfydxv7wzn5cxzhhbvj03ps0zaq4dez9i00f354qppmuf0sthz13y77ua38v4vyx4lv9zogfjjql78mnu4sx9atljx0udyitzuu42tzol498rfybrve4v6b36q8g3hdqtdcc4t272v7566vqpo7oyfhe2md0ysmt2c3499qd5ka9rxkjvp',
                sort: 475155,
                administrativeAreaLevel1: 'meec0l4r52x30vjcndgpl8sd27282jljlr643sjp7kir4w45p6',
                administrativeAreaLevel2: '7gzvyreki0hcgh25gsvjvqexttmhg4qbfh3rov360jghf3lmks',
                administrativeAreaLevel3: 'e2c3x801el6uo7iuiazn7r0mhnsxnsz8u5hwfha9w2ksctndeb',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 385.70,
                longitude: 714.83,
                zoom: 54,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'ef',
                iso3166Alpha3: 'f5x',
                iso3166Numeric: 'jos',
                customCode: 'stsuvwh695',
                prefix: 'l2r6k',
                name: 'opex0aujbjlfhd1t0668t96hb3gdvudq0eqoz2mh5dsbmkzfnzhdlc5p72v62mjrextyihz9l4n4y8k99wgf4gfyp6xj7jazfjqxkxvtlkisto23801w8l7913qpv2jp2kt2edbfupk18abpti4umvk3mhszbn0pzv656wfh801yrarv07ycdsoluvmmzgkc24sc5b0a3cg8m3ecv6qv5c22ebppboyrf706jgabiiu5j46v39sbp5580dcznzh',
                image: 'ncmwaif6e6v8mzczozzscsp5nngv8g61jaw63s1uppyq57wio9hmx6i8f4604pv8sptnnbozvtlezv22wu8ggkucp630p11197ukdpou591nny4dr5028ggzx3up2bp1wld8vq5s8pn59e38vyg0hz68ccapzracy8zkwwkxjbdl6mp4ckal3wl0kex8tjd0fgsks9hpujn860w038y1ebkgn98nfq4yuibhjijk5bxfom1vpbf8i9nn7j3xldxghdgp2g25sv7dgx4nu9itujttwuoejwbt15q56ot708hw9p8c7iz9xv1upt65vsrkbsn9ncx2jstzidmj0b4l7zj4h0c8wuvm5fnhh7tdz4retmvdqbplvj804tsen04wzn8d3sc3tyr60umaxrvidjk825ffkand0bhmuc3kh9oiwfcvw6wv4ou4rg4b6500v6e9yany4skdbfr7mmhzubj8l8m8rjd0ksxoxjvmo0wqklso9vmfdswa6evph0sz74flql045u9i7t0zu4q7nztjer55z9w85dnpwri7ve7202l4l2d30zdkw15et7tkteo13sta17fyocr974g888spdf09hjq5rjh32wo9d95ikj94yg62xueqcz7dhx6ath8ptqyf4ymhc1ffjz0thn5ek8fxwvghampgnhuph1tv69jlgvpmwl8pdc3etqcekysl6aipkyzxyqfqvweib18e6kebzh0pc857tx6rvpn1wuqzz4uo81j3bhwvjbny4uzhqboqdhjv5la11v3rokx6egrkgvv28x2g7qw26rxcp9fkg85s3v56pmu35r4ln8wdo21qss9bp8a70wh35hnx6matdrjtnhkze2wzogxadm22vnupbr2uo1rv1ezvwywyu1ccnjt2rip02kr43uudv65deni5pfizls82fkk25ueekjxktv93oyqfima52et9v8lnfy665x6a9cfm4qogunyqmg7zculeto0tfqw0z7j92v2xugmu31hjwoz3',
                sort: 397223,
                administrativeAreaLevel1: 'z3i2jwa4igh0jyqf2fujh8bwrw3ydsarlalltz9mn3v23s4xxd',
                administrativeAreaLevel2: '765lw1ogp8ck8qle7efale4pvvez9i5tt7oumwopcne9mwez8i',
                administrativeAreaLevel3: 'u73j55ywa0bajuyois8yey9t2tm2lymf92gdayznfpayxjjs8j',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 889.73,
                longitude: 620.18,
                zoom: 59,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: 'azqt8k139u4q374vkmaagjm25yiu6wtru2xl5',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'nz',
                iso3166Alpha3: 'g6u',
                iso3166Numeric: 'gvg',
                customCode: 'sinq75er3d',
                prefix: 'raxmy',
                name: 'kyqldjq5djuvr4hqq5kb1cbeplbp3cj0mh3her9lpcfo34nuojxmt0yq2dl4zvf1xxi5r6bj9yrip9o1no0gz5zz3ylpir1xizb9cbtmf8ihygywox5fdeskbcg7n25wn4huo2rnxdpso8d4d1lqi5e40uga73ykk8tka2bk43a6hz5avl912b7luv1ryqggpxv4zubmkiqeaetf28rnw6db5ad99xzb8i0xi8fsq83c6p1kx3f7dozsrlc0xsu',
                slug: '8mfmunlh5gvcinx27p8wo6jf51gin63bvd3nz17xjcf27o1i82ocdyph3l2itybm72ktuh6vh31enf0iy9s0zf13mvhochkugk5bob3a8evqzwn1xgd0pxo3p67o2jcl37t4gozw73kgf58fb00zefrm3t04nzyeo4qyyzg3xfucevuwwwxyituzy2yqt33eu9v83l96qssyg5ajxsca8v19cwqthfax4qwnds6hqbmhpi57i8e4phmty1dpktnuou7e2g2u157pejnwt4dmfl3nf2f9jtkr2zzjisok5fvlgnj15pmo2ujvmd4kxclw5ykbycl645vz1x289lo0suaa42z2umt0yed3swlb350ashq5w7eepzttblj08wdyjg9yyy9l2s9rqr631b5m3hbz6z9gfymt93k1tpnex6mfa5gmb3b4ybejjbnnn5mk1myrdj18c9emtfoh7wl99xd1563wiq9qrzrrvmp69qd8lndtbhdscm3lsfo7ovepjfedn9c00rxt1ml8kbrbbtqitbb0g25dsoibnzw6kdtnouje7wnb5palw7fgslant6wtcbxecuhmrlkuye0p78crgs6isjkyhsaq5octe086whdecfrra4lbbouhr19ekbho5l8zbyeuphanlan2dk586964f8oweyvp6ccxumf49122bam3ijcr2w3untcshljxtknxa1yir3fokhhyelt679alrcog0f4koq02r98a8ws0wd0zwijq43iprfa88kq39adjj2358zzqsuyh55ampqp1tpu8uumu7mox9d2eeyh7pd7zqyk1gj2alz1rzgg9te1wr9jtpapiaw49pt5pwomc30onzg24wz4smq36glgrh6g3x6w2rt6ojr52drghmqtjqv4pti1vvn4olo0xmxys4ktk2wod31vtsvj1ol5f925hrvilittctf2bc5zbsw4zkm8q1bhvftqa0jowyf05bbp85ipxnfujm8kpyuk4h2idk4uv31u0t2k2',
                image: '7o6x1unci04rwrqoe4rw5v1uuol92clagb109u0nz7dt3d29l778g9tqwwzm89voxi2wcxapfa1mqravkhxtkbbeyj2smzfpcoxut3zzye6qrm5l439k4nxwhfdlb8vwjiz2u7mmh3o5l4p1gvcq85af67ijsdvjqrudwtpup13pjupkzm109wz34n8d2g0cpcykzjqst5mawxcfgjx7ekk34ai14os59wgftszakwgrx32opre6uvqkzx4nab5cif9zhe7wjyrue5t4mwnkrmidvckea1ve0k5kt68jl5wlsqpjdtilwqpx8x3zicbp5x0o3u1lrrvweegoo0ze08n4chsitubc97by7upi872v94oyiercanrgfgs9kegtef4t0f4i0rpfktdjyk1wxtoz367vr0defj1j3c4oi2ra5a1ce9rxt9ne84j7qjj5qla06x6ycu3nk47dfosydv6t1mbbajk54143bejy91dexrrjy54e2mnvfy6yngjj8jwz1ebo97wf7oksrym50mot1qeqave0tolcc375zqrzozmcqrg5wd8karp1q8iewde3gtqm5p8aa216ctfso3sa7bojjtxogkihqftsxd2fod104cckml8pwqc80dq7te3eahkavk3rmq05w09kqv95ylt1e7zmuto5hkp2iimcrqw8h5o55whmckoc5xjcmi4f393zotji9ldasz0x5ttezit7w2v75n5mn5uodor71jj1bw02w4vwk6cv3npt0vzlvl14t4bpinru1ahxu76x0aa4hc9ryrmzlts1y93fyprfuvjhn5nbdf9hwjzc3jugx52y4wsw2ojajrgv5cvq4f5nnpe0aatj9oqj1tweq0wah7qz5jvwcenpc9fr8euanxnckqr92uu2hjkwq2njlqbwa4lq0e1jmhyenvnzcwam8v8apexqtm7i6r3dkx13hqgp8bt70u6orsncl62rjq7id6sr46a5dnpvocsmztw9k68708w79ehl2yv9',
                sort: 709648,
                administrativeAreaLevel1: 'iwhdr5pwqxemctc9oc3olfj3pmygf6x2muavjn52se53m9p5zn',
                administrativeAreaLevel2: 'jqrfl235iilauvevcpf2hvqo6eu5xklcqe9pnaxtoumzcdcqhx',
                administrativeAreaLevel3: '8nq39bvs9ej0i81qvmbazo3w141vc4dzid28k88mny2sp03106',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 130.09,
                longitude: 211.26,
                zoom: 45,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '4lbkx0mohy2cp7d6p46t3c7oycb92pd0up62l',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'vo',
                iso3166Alpha3: 'oac',
                iso3166Numeric: 'qlx',
                customCode: 'aae374ntdw',
                prefix: '0go7p',
                name: 'b1mrzjdfn5z76534ah6seeplmqvh7f7fzmz2zhnqe63mg1x3sqt002s9a9hz4d19m3aqd73vpey0qq3d7uhpv2kwdgz4vgg7f9031m0y2ka9juz4ftafxy6z1oxjw40krd6hnun2duqulujvq5bxxff2v4vnkciywojhv1zj0cirrog2l8bym9bq2zz38xtls57jnxa57pv751wr0tkbervfj6k6tbdjk20p3n5szmt6hxwd5uz93i23qxmtqc9',
                slug: 'nhpzjuau93sah28y6539rj4otdl3lusxinz45wfp4nuj9yufuf9vhhdcm5m9ld2e8borrhbqq8jq2lz0ocghr5a0cg1mhyar596ta4ywo2jywg3ow39l9qr02gtsed30nqjheyb8mh4xx8jeutzqe3x5xhlxs61qhocstef2v6gtq7p0rp6ux55tmra8sf8z1nuy4r0usht9btq9ddztqryken80o2gajiujqe2eomf648ycwlrwn7gcdh8oo810vgcozwhym9j43hmrystih2zzllz24enndzit6bnscqxj9rl82l489xse6ytgprwooex0z414btzdvdn9o2lxooczdqyuqst1ioi8ujivxims5vf1twciui2iysytkwgndpto13ghucknkwso7a9j6n7oya5qw5nqp0gxid7fje4786lu7kdzy2azildz86tkybcnfj0cxienq3d7epc6kjr154fkmi7s6m5wsqqebrvo26ihpwgn8v06yu90lun1v4scyam5r4iuejewq72134fe11dmcclgtt1e0dq94m13wcy4uijfomozet1enh98sduzsivfbp16ela2u4cmxjmufhbfnryv12k4qd3b3qyqtwnju319gllkth4m60g4ddpcvu42qp2mo07bqy5ykflr24afi4gnv8tv5lw598vx35nq3spj6avwdw6ja45rp9ejw6g10sdjjf25n1spo33316ummiimnpkxdhjxnagkonxbeek2j25x2jj4p4er1hdezfklmj88eprqk13npw556ixbsb8lc5t0oemlfg7nj8z24hizlmrppj0albczlrf1wdnbhzzs8zcff5xqa3kro0rk8vwtme8f84buaevrnnuyeamtcpu6wx5afhu7u2ttp8m4d7j3zone1dzil4jfp6rhk6esgrx2yxggv1ggqdhhuwlqigio6dxb8s2va07o0scqzt1o3dm22z9u7oaq5j72d936gksbtu8a7ilxxju4hp3l4f88cu5ki8d2',
                image: 'jjz02b8wkmt8culewsscafe4e6jg6elugmueuj0r0cyik05g186yxmqggvd2crp80h7kekyosxs5tpqopzf77gctm4tse6fb3s07ee8zxeq2y5mb3m4vm29wlu4vgarkif5y07muciaf1mczuujjaudig7pf2llo9vfvum96v6iztt0bxchq27fgkb39rn3m1y77rvoo5ed8kygd63zikyi9eajpqxafkjfqxbco3a1prgvvi2v2chp5o4yc00panwxr76juo89v23tgmuekiuzxkcd6uqhl1x1rpbtmhggcgp3cwrn2hd522i23fl4mxc85e6icirr1emreowmzxnxi5v64refihigvbh3f48kz7fgo41mqiyvc0q42v3b7tu6alrm7s8knl1h4a3yrv7jlta6lyt9n3dvkwja77kocipyrh0cd8a7h27q42ix40gda40757mjs1q91dlfzqxeaaixwxd4lxxk51sztp6es65zoh7r72zz5ejom18tre9euk9vw37mfc8e7m56q773k3temz62nvw77j6f61s9rm8t4dd5njpqxbyuzqmex48nd4yr0i94fet5ghezq5pz9f6xnta4avxk4ydf3ns6sbbvyh7orcig1s47cgy4cfjq90w1sas7ncvxl9erxtyttt9liy2kajnr2fsiqh3xfk02033ne6nj6qnojmf0u8h6zbxmqc2ecaspyaex3jc1ji7qw8kfb4ozzyjdiylg68qklcd9rbe7lw7oa77unoqjpua2hzokfgtr51nvetqogplvqzf0o02eg2x9vkaco582dvf93vuhe43pln3sgtaa3q1y06mzrb8t6yus81jqswuo5br5awcsbw8mgym8f3hupjbqciwbn0urvtw6hourm98700yipl6tamczis2s266tu12xuay41c7g1nw4zmcbsn7u4flwd73vaufw4ncrw3jqih9oyi8gg65280zo392y0tcqllvywrllf91t8zugw177qfpzv0uwvwx5z',
                sort: 572172,
                administrativeAreaLevel1: 'l5vvcfmiv4374406hunnzvirf5zjb39eity8j3t6k8c9v2rcam',
                administrativeAreaLevel2: 'tnhrdt8rvnkmeefkoyw9ne43687ek80lkpzr3impt6xhqinm4a',
                administrativeAreaLevel3: 'l478hd3cbx8k6yb309sizhscn18svujp4fjfafzz6mx18uw606',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 442.40,
                longitude: 190.32,
                zoom: 77,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: 'e5cbq1dt5y0nhmm72txm81bzhhkvg7ei6h553',
                iso3166Alpha2: 'l8',
                iso3166Alpha3: 'ew0',
                iso3166Numeric: 'vf4',
                customCode: 'qbdm9vuckz',
                prefix: 'oo5lj',
                name: 'xso7568cmevi9cic02wqbe89i1il594ktu2x5qv60lx3zf2tngwn6658gytjs6vkj6y05cmxgg2krr5ryq3k9zvv6mhomybw780og1po2bvi3p6cgrjul5yb8scrafdv68m62gdsrk25ek0ih3xmilc44jsmvyz2kd54i19323ul44w2z3tmjwzrf4tpnuuatd3v9ih2cbi23lq11p9ighua45ujs1wmd8k4lqdfy41icimjpcntcjpg2oci4vk',
                slug: 'n6xa5vv5d5bcjfltty34czfrywixe106b0lugb5wvfe9gbgjmrjns2oggxljh7mnfnbcyec9bb6jrgvngbmjoe1balzat4qwlx4gnq3gtjdu7xui1zlgo4j8y5kxrye1x343vpk8rtdwnf3qvl0pr9ab8wrfw96q63l5qa2sc4hz0akncwpwz64yt8kfz516v4gc1nfjqlw6gkeq4casgs1fh7hka0qfp9ehrgosssp488fjiqd22hfod70krjk2ezevqwc3ypum08egppsc8c4oxn69l0egl1abua6ibmniypmbnr53ozrgf7xd2x8xnv3l25nwyyqbraxt179ygv0rme053vn8zbxf23qj0s7g45046eymy27cjclp7akkp1tgbq6gmbhiz3fe0m2tppdk4veg7nppojbb4dznzwvftpmt8kdlxchsnbx326mqez7qvr8vl65rd21p5ntj5xy1xrqqe3yvh4twz5qpob605ljvw9foglobraj18a0seqj4qwn7xphtau8guv5405zp3xktob0rqlqyzssndng9rtkojws9kyjeowzxqrzyso0ye9mm8fxx7qybsg873p45qt2esqrigm9dyh86s0is1jsk1gjhdsn5rrrsnftzh5yku2ifvle3uen9i1o87ohoxfwadz3j8w4n8lmr84e5wp4j0arn131qnu62g9n8mp7zczckgupy1680ijmek6iawy8cb9wzoou6j6y9xhgg00cbgbw59uz1tjcifc1sgfyg8ttrrpolua0nzdsua78uo69w900wam4ungz4us0cpo7scuykgkpjgva199p77a9xyuekjcof3oh6lnkkxu19jqezwo090azlbhsr79qt4qm1qqz6nhb942tf36v0o87emye1gtn1qkkp0e755czlzexl4864iuseiiotpupik5kpzipu07fdkb1j7orkygcjnmu0lhp9r7wwj4doxsh3zx1v841ayt8d1i0f3c9vorxey868cfgkda0phlb1',
                image: 'khdstwfyy7o39ncarmn1a1ds1q5ita7nd1d0i2579x5qzyrbly3j66nrp8fx96mgbr4mwd9d1hb1pe5153fx726tc1it58rrpfwpwcp2kac6ff88avhicr9bwsmc9xz3b9fx5c2m072ewg60cf8yqxdg1hpnjdoq74mprwidtknr5ua77onevsbo9hronpy9yifilctmpohvgvudats9bpctnnscer9esvc9pukr1zp3rgdvdkjkf0jlpuby7kdgq82u55d94kyrelsozju1347l9cej9y1p5aoblqxly3ek71hmre1pdy0in6apxcj6wc4omelxoa5726aen4g1kmh60p8hmmineea8txz2fdflziyr33k4zg0nsdqj62elm8lnfpklacknlhbldy5l395jlffujx42j9w4elhf3a4u44wlqxx4za4o7vs6shgob9527k275bvck4xfm0cnlobleemp5k3yq9vy6hggx06266rt43l6x3aodocamnusyo1yb1nqfyst0ixz0v5sb5w2a6v4ctd61w9boz0qkpbm7ae0yup7mbhwfbq6ho6opejpbrdjn3kb8bf9c3ov9kzvq5vw6t15e6tjjdjwgx9w72fogdzn34c8c9ife0k6aviaegpzu34xu5ohdg5rn1yr6ez0arwpl0eoaw1lpi9w7imo9dto5nk2e927vidpa13bherzqhpse4j3f6gmai7biti88h42our0esrygopythafqhnzyidr4h7ba06vbc1cui1pp21m34lyowo2t9r56kepohi2au6zzerr8k06gmnp60x1juiyo2uexgj1qm7hg169bkinifa2dddhk96a1yq2ijv16xn7h35mnjb999byr68ylxylxsop0io9bfwpjrldm55x08zpjq8wb9zd4cs3thib3b4otveqjnjprnpq3ta243bij00zftkvs8h69e5e9ghdp3827drzioms9yv4phz2h1k252cnhfrtdrp48hoxbtdi4udqknab',
                sort: 386024,
                administrativeAreaLevel1: '8sd8p9jmeetf79waw431i1ngcl3qfhoyu4oma72p75cmyfyvpi',
                administrativeAreaLevel2: 'gb6ex76k4yl726xynxb5s1jjeek99x9jtetgkjnu6zope7jrdj',
                administrativeAreaLevel3: '1g6984wofqsxbbx74ro3axj19unhewg1m50akkps8axciy576o',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 732.71,
                longitude: 139.36,
                zoom: 91,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'hot',
                iso3166Alpha3: 'iln',
                iso3166Numeric: 'iz7',
                customCode: '6jo6df4a5q',
                prefix: 'u4sd5',
                name: 'wfmgkrnniyfsqh7h1vts6uas1qdllx5ncnuz7g955pg3ho1vgerrpxrbtvcpmtlbh7r0h4oxbgpcrmresdviwa3j9fa86wezfzjt2ipoj5aqed2njlhj4wt3ejqf48loglvrykgv4yutrrzym0ek5fnu282hcdp1sb0ji46a1gr8pynf4ou268cwwlvl80poay7izopalw05n0i3ygd2waygd7hlpodi7k6c3481epcrba7aq4kr8uxnwisr9re',
                slug: 'u4u828lhn418go1g210s3iv1gioitl6c6emu1impb7ykjhdyzbgzbxivzw8rjzyfv7ietnelxeqhxqo0y3n1vndnmm765g9n5v9a6bbqubgcmg5eqruv2zwm2b2dlhck41k0ubdpmvvw9mpnu9lzdv43cyqjffk5gxwu4rc1mdvyibzr37jfcau283nhizeehf0z64joia2bavkccupr50tqnvh6tey2756o7rxc1xks3rtu2p0vvaqnkfr1990us0skhqgyfjf2uvhd3vnuidg39djf08gob50lnj6y8gq49k5jmb19zo8wjlhvu1tlpvm1z0se5q0plhmrbbxorecpjob0tcwbq3l6lx4i0ix0n4coj12tpmfv9bzn327w3049nrag1xphpkojksqelz2e68hlfvw8lk5uhvjk10zvy3xwhy0f1irxxxi4t7zfndp79zjnwdt05aoh0w90q6s7y4csudm9d0jle7zfs0v86kzjcbco0az6zj82or0degv1e0xcqdzyqt17ycr6hgsqcdu3yx74guc3514xu7nmvfo1a8nnrch3obw9vvafab4mngwh69vuofyorxrscexedf2pti1d9nfmravbpo2gp5s71nnnqow3m9gtmxeqpr4dt83fun05t91yisiub2lp4r1a58axb5jobdmwziw8twighxqqyj6b4xy4ic4o71wt93d3oufdx3u3obgmk8xb2hngdv00w428c4atjjbdrd6ey3vkmbi59dxsbv8ocims3gxgxqxqnwx1wymimgg211bgbs0hc9d04vidwwvy61v4nfem2zkkxqg5daen30hp0jqs0j85ipfp5o31g7wwa8o9pnly897oi70owoacg2fr8cjztg4a2zfzcf5p4x0wbd4mnx19ee6fa4a2i4h333oyc0nccevjhjmfvzqiooqhtmz8d5r7i6f0kiubix6y3pto8mjd7c2rzbl39avba8lurzwl6vn92yewas8fgozoiz639v7il7z1k0um',
                image: 'j34r7ylmn4kmmb8rcnb35dnhf9i1cxeeajxze091a45q13e4x69k0l2bzn6iuvi51tn6aosl8qzlev9bw246o82zzyrgmbmgupjldr4r93888vg39pjxio8tc9wszsofszge3sm5sqmkgsjdgwtp0i4ek7jig8ns6liqu95pzl9zl6j9mehkjbhvy02i99mj1q11g9ghvirbvvwri8o1970gmarza4omayd65ma8vjkjy3p4x507jihvxoplzkvxjtx19wg3zi5ssa21symnf85w7c58e1jzrqjgd28232cz6z8jyej8jxauyjkx2suwzcjbkrytzungqohoutlommcyevy51myqnxlm7g1ufrht347pdi0npn8dbaqjyljjov33hbomasijdkfja3s8u1no50ed3qiwq6sljiuqz4tnwep8x6oymq0ex1afalupx1vgwd6y12i6jhxb2hm0rhha989vudi3d50yerek1rb7z876uqwi5psjr61czjqi4sj66ixut5os5ifribrfgqe60zb5thhwbx8oaezb0a1jqma63wxi5lybw871lamodz7p4wlwk6uzfp0jj19v3zktrpkzlkrdsgzrha8aaejgh7ol46ybna2re5x6vk3oqsayd6qzsrszned0ybx7os5v9xxd4ikc8cefqp24irf8pvvr5d4u2at4ev3b3bnlqdhlvzc6qqiziqwcp6e407adt2tqqviacuqwu0uzcdwbv2si5id93mehb1uywfvxjzkh5qzql6uowpo297wwtw4ftgw6osj67xmncosllj4c86c5k5j1hs97p3z7o21bwhwqkceslk0eqlzhw79iawsdxh5l2q7a41fhvx9q7dfuvjcsj3mdmjxfnfzzd3g4kz6juqesmlcd145kmd9jz65g9kz5rz8gs8te9fgytsbwrqe8pm1hdanrtp1rn76clgx6b051tx9g6ykm8j5rhu581jk5eq6pq3beun8y1w1eh4y8i1mbqree8hezvx98',
                sort: 170148,
                administrativeAreaLevel1: 'wmr3qol4ifktggnladiuf3b1gkaodxum9xi0c74ftw0gek6b92',
                administrativeAreaLevel2: '2cku6uoruvrhs2wkr3ubxvkenswu6f6baxgllm0hfz71q7deck',
                administrativeAreaLevel3: 'kh84n9x9b0kic1dcasuxl1bkf6l01kbrb8k8c1hkmtfalao8un',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 759.87,
                longitude: 613.02,
                zoom: 21,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'go',
                iso3166Alpha3: '5h9i',
                iso3166Numeric: 'hed',
                customCode: 'idfv4uzyld',
                prefix: 'veaql',
                name: 'inchsko1cyqwj02qt9mrtfgu97uxz4wnado07x957djyd74s1ru6bnbov9k5ysiv75viv2oj729gczkina8pvdskqlartd2m17wpoxh9wc5oie76jl6hnut3v79ql0qaimusvfwajp17pnmfyppd29oycotkaiqmnslmc4ydi797gx2lsoscs1l16jwfek0c4qsezddjocrn9aq5925fzmuseg7qqfthfzgki83m39dw8j7kqmiuq1l0y13rqmu',
                slug: '9ggfeq9pl48i5m4vgr0dc2qjxru9zzt5pbdnb7qxyxevibrc7j6nvlgcwyuxr5ewpu5rnovso9fp4921fy3fhf5f2la2m7chzh57obers0nbp5u30g8xh9o4md8kpix5dqig1pntnekiep1220f1bxezq91vc0vvpp5vyfq5zukcik2kdlqh8xshyorz6p6rcggc6px0rc1rb9s5icxvj7fpqcgbbg24ihy0e0vceuwvqpiz2wrwefm0vlkjxg7ysirmybslrypt2zl5czdzb6t9l1vxpgunajopflludmnq1o4c43jedorkbios3ket0qzsyetb41muxukkuwhw983t5tetc37zyic341eqgr1ljmtcp1pn741ijpjcr06g082gr4zey0w5xnng7wfcl3aoq9by2sstuj4j8afetlslomuw7o8ihraajp244ftqj2x5njrlgl0gs5ae36uixgbphk68urztldv4e0e9sxytg4x7s9u529t3oo6s7fnul7qqxfmabutvxw3icopd9j09o41kcbymur1gnaldgmk9l8eeilc3z4r5hahpiaq919p5lgtmruazgvnfsrq1cvs02mhe5v77bh8mrj7p85r2pj1hinqa9tjzvnzgezg5yl8ivybwskg5873ynbpnyyh0zrbu4g6bg4ebx4mlozd71wq4q9sh7cc6kkmzro28ssbxq2cx9f4xel6npf9f4xtousrmq23vm3wplb6l6v4cyzk5qk3ozdo2dn6h8ffbrxbftbpl3vtwvkol6wx6gpknk9xdgtvwlimgho1w1f07bz2hupw37cxgrxt9kw0fv8we5s4cxml6nm9oock9du21kgcosif3hs9ics97u6jbvic2c22612bap0vud90gwdejuabgi3z9w8xlc3d2frnc7cophbcnqn4y4ad8jd4pznkxgcm3vpsu0yob91kymhwmqteirhni95ig3hnypy2njf26udeqgd9lb3b01l94sikive42dv5lqu1owzzb',
                image: 'lou49t7nrywmt2elb6wh4le3q515aqjswq0raj5trae4ylbgrl3qgiq2780y4maa6kb4z8ejtnv908kcyqtbamtgaln2gmrh82bkf3uuw624irqv0pkhlaru5iem0shbqctbei85i35k3oqfo1d4whm010n12ktfymipiosqpvoxuflun0spnhi5u1d0kncrid3q5ukcarbnmigomcypj21y144up5wcl2uf6pt1a2q2nc4xwkn8maz9wm7vfqrcavgede92xknm71ol01fuwa6cnk9myixy655mhd0a5gci6lu03mb99l7432yd8do62d1of4ybz6qrysmta89lyhfrtybd4fmxhvna9mytzarfsjgvocxknftsp3h51vqfyrixm2bbuua6nw6e9rwmx2qj6ik5vby7x5665x4yffdstrhhf1u1rld368wxephkb3pppgbxhj42u5edt5053yxgeafgzpx2sb48pkqcytp6rd4d1ozt1bfkhh70k6scxqlnzdeo1fb478okgxmq1gwhiwl2udw17oddwxku7c9ma5wsfx74n7xwxtqsakpqdgsoauv9d251tmjyon6saua1rxdek8ub0m0x2wuxl3yfeq1n4pp3suzz9kvs6aivpznls9v2hacoiphoy3u9krptlu6ljkdjdx055mfuetazkf2ccci7f7op4kz2tlzwoc73rdr0ysf3npydknsesi9peaaa70j4y8sieb20gtisr4nw2jjovc4lsk4nowop5is2flzeyfj7i9zosb5vkmm0shtlnv1ben3jim82rhzgrwjelfwyqqlsf6yw28ftqtvwqoo7ckpdw6rdxbymki814uah031stemgqepmrdm3kgsnsdejkalh6elh1uveefwxj83c4yoc0l8yc2nrz372crjdf8ruqpt7di4k5pv3jgkqr3w5tv8tf99u8afshviyo0pudrb48dq4ilg04b7josu83m4t97b3tpnq05npmf6v59v9pal3u4uv7sb1',
                sort: 904513,
                administrativeAreaLevel1: 'v0lz8xmv0djtpbb55coposisibvvyh3blvvy5jtpt7luy363af',
                administrativeAreaLevel2: 'r7rip9x7ue75iwk5d6agrds84dxgsakcouewe6ve4qnfqqqg1z',
                administrativeAreaLevel3: 'eetq08ioap2qp2lzw5pd552gqr80ueab0d2ffdoyo9kndm0f66',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 392.41,
                longitude: 749.74,
                zoom: 69,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: '0y',
                iso3166Alpha3: 'bf3',
                iso3166Numeric: 'k9qj',
                customCode: '5b1nblju6q',
                prefix: 'ww3a0',
                name: 'zkhlig8iezdy8c1hmw1stct189tf6pj8oiewbwxwe9z2qkzt3id0ucgqt2g99yhrjvgyse38wll02jnjv6a6p3ue9v2p25pl9fwtk4zybwy9i7al6tla46fmzly58cexfk6fgi9qq41ojdhzeboxjngk3y49zuspugk7zi10r96dnfkld51mdwimh1ie3qlaxbzz4iwaxf3t7xv05ey79533bh2paj8u6yoonbo7gtee61ydq6s0hrmyx5eklkh',
                slug: 'z8v8njir2bferu0dej3ywn1nf6rc80ph02atlf2m5pf14rplj5n03j3cjg8zqwrh3umg4hxm7yzqsc8appbqtff2vambkhlnm6cpsk1g0z8ueifdao1krvkg3a9cbng60b8bkmnxw8u6gpl8eit2j295ivaimfeml58ge0wwo0b65pyvr7rdwv5r8txkccrk7arvc290jmsfnb65yoelyh0p6h1atq7s3cix9fq2he84b3snfffmaotw1n7yevz2zwsvlba2w6rygof8nfxtshad24mi4ybp29aapm386hbzr2wmk7c5b8tttzkrv7hzhwq38kdsj2onnxwg2b5i0980vtk9y97xqsp77dgw6r2t6nrjtcvw9k55vglqr0lk2gejd3z2sf0ucger5kwfkzms7yer6isp98hl0dq1l88tjkawz6sjnrv8qz8bouhwf3uzze74wzabrfjf2spt7q4l3p7zlc8rrb775gmtbm6kg6hapqjpvw6ug2lqncmn52jk9io317p6x5llrc57z5e34ibujd33c8kx4w6zhgc5ub2ht4wwq27xp5vz7vgiw8lyyuc88pbld7gg7xtjam6icjpa6r1rgfoudxjv7sm4nbovofrlvkk54jxdpgah746v7p0zguehps1halz2640ko58ne97c8sxid52ydfilkbvtygigkxhp8wyerk0eerq9zxqmf46igqwfpocqntn4a251lmigxvlvzh9skbn9jguzmrgy6bm048dk6og3n7ccm7qzfyuombtmduh5gop8r692gssp6egrbzrm198onox3jfwt3rmmjb5rf6elicym4top72cfptyz1l59dth2e9g08gx8skxstanvqbz1f44onx0lwk6ejz0qsc5ikrndl91yxlis91te1tvg9ch7lufiht3qlqji8wpxvpjt6lrr4kzasegc0d8u5jp0z9eypoigt7j26dvmx2gmv5ws7x59nrfvzkdrjm6xm5zk3pk2lhfpdgmln5tplbi0',
                image: '8mq8mxmhvupdzi99xrtkfsccn8zksxmvbykqqiw31ztdahydteut5zmc967iyye3uigfqiuw69flfrtzvwwbokfnq7kmzmv5pzot32132knuvn16sg99igdqj2gphnfqe0art0qno3rgi495mxmfc0x7mt3hk0jp360pig7uobpujqc6rsxqma7nxqg0x7akrtbz7uc8lerpmjuljmqpvsk1o1shqkgn6j46mcnv3v4kn2zqrzedsas6yx4ivhz33gga3te10vkji3qkcclmf7gcll6j0ycs1sj05rx7h2o0iyk533wlpbm0n2g9vymclqbdc1zn9ht6qxoy2vspobk8bm7y7jduegn0jh5u6jrsp4gw1wu4d31hmqq7i8535433ebd63wu4opzrkyj6n47t5wi0i7bwxzdcl0dlcf2tqmz6d4us1frrhkt0eb0boxuvx6q6o0yt4ryaanhc907otk20crpk42yjfxm4pg024tcr1osiam3lf7hpal0h41y2j8pf4ka78seek160sui6haybnemoqz41bdrc321lzlx7a03nmi8780q9nujapy2ppposyv3nq2jpa7tw3mkafmkeyb6c5posd8l3v6486m3j61sx4mmorpecpo5sw1bf3nqdm60i79d02xdh2pa8ovgrlni6xkdtavy5aovke988prjc1poffc367j6oygongevr03yk20c7v64tet4ecn360m76azh9pu334kwphvfmj8tyga48dxhz46qxj7eoq6atji0kfjhkytq7192oz20o04pdi2h1ibdbnhb9xal4f1owrooivm7ys0bhshdxa9butt7anxkt1evmcovvi4fnskvh5smyrtuxcyh351v2i6mer2ffjz6hbhvx6qnjn0kn4hbsk8f3ykts0uxt92iup9o9awpmjse8o5izqa4zmwj07x8qx2ix1432ynewtqcpfkn9sub1xdfj0597dvutdpm7mi921uug2jfvod6gluo7z904xublobmg',
                sort: 685415,
                administrativeAreaLevel1: 'wvinp7qj3whlykei9d72gx3vv768od4nl8qd7ofwpvvipkcn5m',
                administrativeAreaLevel2: 'i94r15sb40cx35fzspe75dfami62000ovfgpozt33lqb2yq9kp',
                administrativeAreaLevel3: 'rmiyb3nex51jp9ciqfosgmlyf8lf7qx6ve7y1vigptcd5h4yzg',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 696.78,
                longitude: 602.94,
                zoom: 65,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'tp',
                iso3166Alpha3: 'oah',
                iso3166Numeric: 'idy',
                customCode: 'mb2glejfiy0',
                prefix: 'zq1cg',
                name: 'pnewt94ookz311nvn804o5ihef3zmba924yao6cp5wqh146ok0v50dekygec55k0kx95nh752kcsyv3ao5ou4eqey3z7w92beq31lmvffbr6x2p2jj1egjal15qnv6ngxdk96ft2f694xnps0zf25cnx3lwpqbpntixmdarncwjprtwyznq3228oqvt7oqt61m7lzx6qr6ux018ibf8ibh8p541biw9yfovc38za4okkh8pa24643d1q0kyjjvy',
                slug: 'skmm9fachs7qa5sr66eiki1gx4wl34n0vp3zwg8b1d4pvc7zplo9p2rsclq0b3od0bt3jhotq0i8efvgzp3fmdno6bdrb43ggr3qsscebojigdmct1qeiav3rjj8jrwwebwgcvtjo1nw6nfrh14rg4q1v38lcmhnjzombrvy9hrh1cy422hopvs93qdv6lp4x7vaogh57qyritufmuvoxe1htq9695ruzfmlstao3edz1hg3k1u6gaystoujslsmng0sv72vjes2zgii435tyay5gsbnat3xr8v3uvjauxg4qcvufg23b574pcabxp0ki1uvt3krtc436pyzpicl6kzyfnwbsodslok78xo3j6hpa1b9s4r88j060g3iz4apxx2jarose0gil17zpemt3uz6byk4ltw7u62t5ylhe8mca7jmm7ezbmdnbwa7v51siia8dk1ure9ep2mxo5tifk03l6u96g84l2igeadty7uxbakakdo5llz225kgruqhf4s3omw8vaxp0fuljpvjk3w732e37jjbcqk04cscsv201quadoyixefug7o7dmc2uzywg2owbx96bgz53ts05ri17naij9rp1jeavkbtz3v087w787z423i8r3ahgjg95wa89ydctvgpuxnp1i5akbg6us56zmbjujsuu6g73g1w45yfr56n81kum0aqokg6l3g2mq1cnln3qv7j8xod83zvetl9alftn6sl0gq1wr5l6lo81e66zz3clbz4o1ng0iok7b1585tbq9nlkmsmkvn2q6uvwbvsga63uz80f8tfcb0beom3667krfdfg14vbviqm3ssoj2sdcxwhfm0afpfvdjcbi7umhcizhq5dmq2cyi5vo57rcbqpf7fp0gfmhu7cq6svl25ctxhnkn2k8ch87f4pk5zxmgqfi4jfvr8l71kkj7fu01rstwkgtvzvp45kmiqucw1v97ooto06z3dnydaxplh5bm4kt9zstiegb1t9wrcig1p7nwrpkdd',
                image: 'mk69ltm9g8ikqloh35dupc9gq22u7817ry99qjhxe4nwxupyu3ze46nspqq4jnuyeux9zksnn1wn8k3v242w8y3k4bzkrx1glyfgn3howac3ajltqju18nmirnltsha9sfetztt8b7pjhyunx7l9dedrpmm5abmbecnw0lpi0v9r7ofe9dqsj5zgyxgpf4swq1c8uttd91ems60qz11g2sd2jy05h8frbgypr00qgfrav9s0szyissasn4niav4j8ov7kjn0lks3hj4dy0j7qfzo18l5mwrfasr2qre9yjwzvllsubjqtzk263q4s4stfc1iw6wlm6vuclcwmnq8rpdejb447o6rw6se88bn9lvl8cs9bme3ohrg1ohwwepmhofofd5mhdcvg0vfmf5p5kuhj0rmdcppl8wf342y71h5yp32u437hcq88utskfour9esb2wmac4664yxtcqv88wzk04kyr7gvsxws3otzak550lohwedod4muq7ca16dayk3qms9khr6pjcg4vu48cu50cezv5wkxwncyln857t3xp06dbu2uqfh266qv23omzp73fpciggkf8t9sddlk67dstjznvcp6gl7q764tcnjr1nzqmnqypz41duer0s58creqqh9rc5xzgedmxym8zn61g18uahuhbvnp56mflg5j06x3ta75xq3hej10dwj50sf0zfjysu1labrkj2jecyrzky51hvo194bpfxet1w6k1z43qhwe3n5zxbr9h0mqevxs5m25oo8xglfjvnh051ozpvp93md0w5wj10iugib5cvprmuuzn9xt1tg57mtljdjdx0brpkrsmew93vfxs8sthw2mykcwkonmb67wc2gxq622u9ry9gwy0yfd4bavpcah52adk3nn0updb0p1r4h56kxt05ufasj5f4eiu6ud3p9vyvcra7dlqw4gaswfb9tzckx5a9yin0o08cj0min6dsnto9ltr7lcr238fzpe504b403mpv2wf4nx4c5',
                sort: 692618,
                administrativeAreaLevel1: 'wuyii0fhqdehd9zvxh4gnf6v3cqk6zruq2gv6nih0u7lyxx1s5',
                administrativeAreaLevel2: 'al9o2aqzclg4afz7ijmn6v0y6um1cn20hbpwtep0b3v4g7he1o',
                administrativeAreaLevel3: 'b6vjilvqgsz3cbid8n8vu14lot5ahu2jyluzjrefgdnj73qh4y',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 302.20,
                longitude: 356.91,
                zoom: 53,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'cp',
                iso3166Alpha3: '91v',
                iso3166Numeric: 't03',
                customCode: 'o9tsc77xwj',
                prefix: '0g7edr',
                name: 'o5xavv8ekhik2taq5dfj4ybkaw2w5ddmkau4z0vl1fr3d6tbak7ox5cijo8idfk0jvt9kf34fi4g8teveu4qi64rpv8hxsru6h88gq8q13tsxe72qavxb7yiekrxvit0wtgmihu5whvkmhs96rfkcjsk5zfvbn7xhgh3kfvdpacfa5rkn1qmutojpbqnq4f6karxomfs1yfuak5vfb30y0b64l2a12b8vfhkbyzlgbf9o0or8g8648secnz3gp8',
                slug: 'tra4wszw3ax1adhs9rfpfslhp5hsm63iwpvs0osh2hbtuns7gsk7k26bp1xjejdpf7tuah138r80vg1a6hhpx2bvvkjkl4v3igwqjwmc376pskrl5lw4ptlor07bhrmdn0xziq3km6d07n95uas2u9aef0x56gt9ptr4qmt1q69a2mw304jq3a6v4ikmnym23a3s3gn3z4he9n7xdogr81ybqq15elt4zu4rvwt2fb2flxwrpm4hkkqkwgpmmaft9fnnbfzxzysdfo92opt3hi30msqqys4pibvehmjux0uxslise2qxilhlp335bcsk8qx8hrnav1zv5h445z0u416p6giigsdboh9riewdfzsmyldrhr65e5o1ujriad0cz943w3rrf8wc0hnswqipbl3dmpbnjrl8bbymziud8a8k1l2rg2gdnc11ft6x8asupu9h5zl2p0gb86dpvinu2rc3d0s198cqbyg4awwxhhdkpgvdx74f1kih5zajrz70e3elax555gan5hefvosksaxljfgntxjc5ujggm9ax79wk74kgo0xfjwvtivynzw80tingnhxror4drz3uyuy6ekravtdnlzs8pgqzokorffiq5k7bnpih2u6fa3j31zwpk4f1clkcqz8yd8z2j1adgo03d5uz2ti181aysp9dsps4fggh94txz2kngk9jest544ogbabprgk0vjxt2cbcnc8muc47vy2ypsatei8nfroyeengxh5em8l0zyr1e95vnlhdceop1ge9zqlohcujraqz0mj7ddmrqcv851cwt1d4uqwqdda3xe4jg70u4iyj60on2bacwnrr8f3r0xyeydx0zaz91g27hd97awpn1pelf1nzklbrtl50pv39vdthsrinh206505ddsdnkuri7n8a5svo7d3vmmyl97ygui3bbxg5ted86o6yy9a6cco8aew5rwm4bo8v2celuzndmslv35pozaugk200b39gv649razwpp2a7osspfr5xwn',
                image: 'puj7gd88gbfdzqczr7o7l5vuzc2gn57gaakof4zfq4pd7few2lxdrq88pr45eroh3ph1g3kxd4ce79jdfh7y7bc2zix66rvig8esqqthqxmuyzjnpmpkhsqz7mbrl7lokpfsalaqwoahu1gvq982kah268xa6x1n4hc8riub92stx2pge5bsjiirah0q8dh8mru25enfecimaopezy1av3o1s5xl4bkjy1w52v6zxzf0mwrdno2dv9wsrfmv2i8wzsq175o64sw738lqkqfz4ozjd5e73idwshg3dbca3qkvmpu6xz0svwtfelqmblcxthe1uabinqv6qy2hn9y193rk5u2m3iyz5t286nk2cl3iwyvh0fe616r9u9pow8lu08ocpdbfnmuofetd476ai6u02bho9netmczeqjmqo7mdbgy6zeex2y9btcim4k63o924zc643c6jdr5q14oyfjf31gtkna7ol2h7fws0qmzx2ja8u05oa4y6utd4mzhuxr7gocexemcmgd5uyabk2l2uq7mb88h1ys5kveto6qvfnjykelayibj3r3c56gav3466i9lrajbqxugqr2a4qoovtbvhylihksdf9iy54rwvmo14gj42cdc0frmfle6fp08r2ewk83mb58cbjyhq7zbw6dhhk450d4bp2ibj16n1z7f46jya12smb7st3exn9iyjlfc6bqxo7dp189l6tkupplz5qjairi0ga0w8ic72ljww7mvb3sy2ce2ow47q7pb4i3xnqu772bc75xhc46nm3yfz6zqbprdit3lr2o40d4ukc0lysqewlolsewjrv4ikz6xrl7q79n5cwftgedzle07c0guv1wy5zuv3qkgyi2o2x43n3fey52rz26l123egu4gq7vpoc2qc4ukqv5z0ejba7cdrve3tx740cwppwc3yzfzqx68145ua91pgxujszxp3rv51ypxkndezoz8fajf9kub2fn6kw4tollqbfno73qrfz28ymvxepqj1',
                sort: 879111,
                administrativeAreaLevel1: 'f3z80vlvc63u6ssgzmlk7186am1crkyiqp8s6ifma3ghf9tyfm',
                administrativeAreaLevel2: 'byqe4opa8yfbff04f3g3ff6i9d4k2extl5fw387bpmqgtrgmhw',
                administrativeAreaLevel3: 'xc75kelmkqbnrv6jvpree96kuuvrgj66pvjfwpto8q0hyscwj2',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 869.82,
                longitude: 726.74,
                zoom: 84,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'om',
                iso3166Alpha3: '4jx',
                iso3166Numeric: 'nu9',
                customCode: '3waam5efzo',
                prefix: '69fl4',
                name: 'bj24efzuy5hvk3xa7aiyyh2yc3647kg862gcmflyyex36bhbkdkihr64gbc9dzqrtti65p0dx61n6jrmb4wq1at1quf4jcf0sxv4a0hv221259rdiml687jzhlowk2ranvengvov718g7vlc1epa5xj1me12cenrsd8p9e6fytch7wumilddc7kus1ufbdulgcb63m9v3kd1nlge4e1xtdsuqpiinmowf17ti1864yxtv2jclpieq2llbnv3pvxb',
                slug: 'fva1f7ahgz7aoab9f81dxi15hb2yedh6xyg0pr1f55fbrmh8zew2u14to2py6ls9k3l1exsu4fecq3jgsjynflb0o91igwsvg66yt90xfxbpp4c423jywln4m7k5ct0h6x1rf9vhx7qetu3c2edqz4megyl8diunnhswo6sm27yy9jgkadpu9ke94gkn1h9f7avy95b1d6wyx7p6x1dm0pl7yffwy4di6prf1ten776nouxyxlb1mdzulzyfyd407nm9kg2ix69152z2mu8a3ai51y8nec605511qvbva9cbc9sy11muo4dtbtcjl5c0aylma28vuoqc7af7b60qa5qhwejaf80u1xzsfo8dwar0m0j1ha8dkh9w6fvbp8q7nr6b4k8c2le3ds956v444g0yhpgchzek6zagovytagnh8p0zr91ghuphfokqondj57t0ko1pqqndwjn45hizxg8fjdf1dgar60necrt5rg3eviceums135n1fnqw6cqraqzrdzuhgg15llha231lgn4q5kqhlfs76zggt0j44poqjknls2krvq42gy6k8bb3s60aeczklxupdexlpr8a76zhubh3nkdisyc38n945jy88zcc55lo8zbh2v44h6zd4tbpaipvqooc4em56yz28st0oapwns1ljpzy2bqiws6dffefjlkdk6l2g7i3x2qul2s2296mu03pnkyeoqqfpey7t67b02wpzovmtd6nfm0xv6jav6m412rgag90nzpuv2ey2fl7gm7rjmzzvusevp6p6p39veodc2peg8bylc9ir2y4okf03sqz2omktiw6wwwim9fsgicfsa8k65j5p3qldrmsnw0lqssq4bcapb8993qzlaprnvufi28f9xvi5makobxrc7sn4bsswokzzwftt41e6i7ku3wghl1qd1bq67zjt8qzsl3qajoroped5vpryud0xuoijn1lulznmgsoiei22o7rscbup6kv3wha5j11gz7wjnvrv66lg507',
                image: '7wzdu140c5dz0dyi8bltr0tqpepkrsr0ep69jxq91ao4q7ti896eqewu4s4kvoqcf2qgrrcui7cn1hsr1d8vr84fu9dmyg0fg5ujeipb289un8ekc9n9rs9064vy32jggb3652gmkx9ii2glyqvm43np1dndan0avwhz4zqobo9hgxm47rjyxhadlgexydpwb3mkrkmibdc2my4tp59wwhh21v1m7b3ho2nsp4w31erba7vsjh0bue7e66qayhm3u9plh2wlzybiw5ufgcj6uvh54ws3b1sh8s9twl08rte9la47kzrh4j80igr4pbiv7ejxnic6z5ax4qj7hvuilk6t54yfopuffeqqhua8wsbmbe456p82514akuk4g6jtlzfd70u7zzynmpdlx67ktf77s3y8vygz8tg13enulqubm9jffs3gfp4dv9rf4ux95k8t3b08dgfsbqqbxf7pckmziz0fxrvmid425rq763mntg1mxff5jobz993fnlvysb35au474hdedi40fsmcphihqeuin1md8ceyzic8xev4n7luhr50ez1jfhsxcq50u7hz9zeyjvh7uebw5p7inikg3xd8fahzja7ijyp7q9tedzuz44un0lk9pwayahu1n75jbny94e2qbprzunwyg6uyemjihb3xwb8sqhppf7da9b5srdimvr3elqj32yjpryhuu53zrlzr80st8c5tcrz6dr8d0dxf3jtd4engj067l0dkih8pbk0jhvdwgxl8k84fwhlzsh1mdh75po9o700tbk9543srzdyave86w24vjcpjhlx9rryg5kkpvv437cnvhuvnffobxsso2zi72n85vtcyd3nfzvfk0fojx6t07mtkzivheqgjuvocigy0aqfp7rou9pjfrhwjfys8fc38te57eaahm8ecgcjzlkkex6bbym8xgxz9piuxtoq8yi7zfymlr47ygzlobvwzxlo6eybg89mo7a1qfxbk36egxvw5n5o1bxlutj9t93yj',
                sort: 373884,
                administrativeAreaLevel1: 'bj41ap8svs3kwm8kjrdmqzj9wz9lniahtmx1p6tv8fg2yvzexo',
                administrativeAreaLevel2: 'zbi937rb24yvxcho3h9gakoyt9obos7zg99yec6fs6xbtc6hao',
                administrativeAreaLevel3: '8ip3x0l65pjvl1w2vdea329kl4fazvxzpv4krzgqdtj4jedlrg',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 515.42,
                longitude: 354.87,
                zoom: 31,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: '82',
                iso3166Alpha3: 'b60',
                iso3166Numeric: 'xdy',
                customCode: 'qsnnddv6nl',
                prefix: 'sroz3',
                name: 'w2ujsvhcco5kzfvk7ato1gj1910am41jedffsdcknhhksbfz61esxfp25yohm6f904x4bmijeh5n14qlstezokj82slx45gza78e0ukiv3gzrlls4gg439sblwh0ga0zl1f5o5sizovswy5rxxl6ekaw9jhq0m9eg68ki18hw2875oug3soawjfz1fjkiih3dzxzk9wzwqb72jpz3v1zoej6esxvqc5tsola4lw7jh8nun7ocptg4mo8dx9zf6z',
                slug: 'wgzn4oum9tpgiclms8lxe373rrarm4hsjj2i6z5kqdt8k5xz49b7wka4a153pmi91lkttxk1bguusv76zww95vwdcxevjjqrd32wepf4h5cyyi2q6yum8ygm5e6iw8gk9ge8tuc24s08xp2ftu0e9c6diqunp8rh7ivzjl0rgoyq6yqrvi1rhvkhhsrtfyzi4pn0xnshpxdyb3rbumr9j9c3mq2b2iy621lvbe9a6zvsx0r9emnz19v9bzib21vl5744fsft9cds90dcsimw0gpqoco033licvf6esjp15e9dj9j81mxbk29idfprm6fq3tfu2233o9ig80m944xfb8a8grpu6pg5fs3c8hqda9u6ooqx47yzwxyygxk4p74mb3nvtjm23w1j2p008rawknnvktw1cpzjg7oiiebcb0wc3javbczu8al29cmt27fq33ndt9hxk5caw7u1irlvyf7d04xisvq3tz9lv68pr4sj5jpm9bfypgxuipwf97yz94u4xrh6qkhzprrkob5mkw8a6n5xlihny9s8iib6fv21mt4h0f6uc7esp73lszmo4wl4b2mjd0zy3lyku6xro9qsm6rwqcuv5m2zwqk7musbgzg03c18dd0laq00q6e1c2mij5a8778lhi1t5ka0pv85ebbrpjwcc6brpdicw2qd31ffv2t83cgbustq6jgm3vorncswiwnrc3a0bc4wnzo22yh20ctocwm2x2sb2u8cy9366n8br08p3tjs9rurnt1p3emrnb4jdk3oqa9wwy5wfqw5piu7qs0h1biov1oi59i35upe05grb7u20u3i4q4v2sld03xxxqyy7wq8jx1ovicejn90u8k6ju70ywr6etsuqy0ykazndj6xdgdpmycww8npzub5y4yz7puxzqm19yletnlgtigcw12ouztm0y6gf89gvpy5z4kvic6dt8tf9qa2nrmf7jg7eewswdftno65wo9uubjewr7bdiy0kosu03iyxh7xx70an1lc',
                image: '9i4lv6qcoq3dcsswcufmp1ha4t65kdroff9j27mw4x7il5df43s9ifxc8519x393hoxidrk8h87ooqlivwosa4f0t77sh5h6djlodqgqz8flgomxw2qepshi0mlz4k60uvrbag8jya80ftevgwy6zlolj2m55dvpb1412nbjez1py7j7fy9062nzibowqdwl68yrs841cid32uakfh76omvfhednhz8jwdzehy40swujass73l0jlhudmf99lg1tz17x0ad29ehjd014kdi6w4k6tza2u2xeh5dz7blrjnqqors2p9dddcv5kp6gjzv0tdbo4jaadvxgvst0u6cbv5bkwjatelidx2uv2ysogwla1sx2lbp2vlxz4w1qtdwuvdsa49wh1k767drokctoe8lw67zjx1r5pywvz22gfjprzl4llbw0f5nxwjrp3825aoy3oe8aetedq14j7kxapqawm21r4h1wxjov7rverremtgm6gqfm6hm70zfrzhi1j0nzhqrsclp4szvnwwrlouydtwlkofbji1o6yugsn752cpb26c9xkbu2qc74eiyklpv9qj989vvpyk89lw8arwxu38oabnponbebivc94j0i9xo9a85kkn2sk6dmhd5paxypg8lrmq6d1wc7wqv9knslepe472jmhkjbqsb44yy2pff497tkum11n858urjk6iycz92kp36ip47nfj1pz059dxv4e03fu37x4ida4d3xpiqyplglafwizlg7zm92mol97qwerixa9dmozztwnv6tfs3s54r8gh1oo2f43t6882fk05gr0i02lot0bat09h7mlki8rh70hhw5sinq328t5nxvycoxstgs2g6rhaanwjebqwuuqnruayb91s2rp70pwb5u6no2qwrce7bylemsmphayqmcpv7m1irehsznmqujyks9cw42ovevd4cdmpqctnfs4jqkwss0ka8e9xzob46ngovj5rt3xsr6tharfhplikzr0jfvnz3jn7p5',
                sort: 791466,
                administrativeAreaLevel1: 'ue74sehocn2vxeycycrrkoe1zvoykcnl87ef05pt147icosdiu',
                administrativeAreaLevel2: 'hpyq6gyp6mo57h7kvfwf068zeskjiyne65rgvfqa9nhe58m5nj',
                administrativeAreaLevel3: 'q1u4cskzrxlikd1u3sot75pdhnxl6brchhyi5v4r04z0cvwby2',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 78.81,
                longitude: 89.25,
                zoom: 92,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'rp',
                iso3166Alpha3: 'zuo',
                iso3166Numeric: 'ouq',
                customCode: '14uxgrek29',
                prefix: 'gwgh1',
                name: 'n9n0j3ugo2q0n8p20sa3ilmrxqbqjqm5ahoqwc61aeazqtkrl0ygy2tgfifyej33p91nqa77eellp2avu30ccrmlpevw2c1unb07bmyq3axe69tzodvvk1gtxmm3tztvef4arch4euqppj4rlea9yolqz45rdxs1o5n72614j20n58lo6nfw0o5j1q6i1kn1gko6ew4i9cj4h82iwqmq2bgn9bh8ihku6n9i8qhk0aczfelip7vm6gnz0l0bphr',
                slug: 'ghbyfwgjkd9kv93c4qxulfx2q2pi9usu8csotcvh3lao0zylnk88igtr70to4zhbdziep3ex4rp02eafg1xkctqva2mx7e04lt1ch1ekce7scimd042v72h6wgfnv2pux5aswelpkf3ndweo5yomalebdv7ccd6zkc88pu1nftrv75yz7euj017fspbc92ej8cennua6ue7k1qwe6loscmql8s8k06bsltitbcvltwg09w76b7k0az5g1mol1kdh6dywby39e3m85t3020aa6wf9w7qgnfke332vaf553brk1ue3af3plpa0tcektiekgqxhlk2pk6bla6ghew7acgm70l5r8o2sf0cnsglielr2no317oxxevkspd9z71z0upm5xchdcbih4s2nbz0egl2wf00iirvu6dyoxp28g859obqaslmrtjx1mefvoawiblyt63krbi2fzgrz4b4bsuplrt8g26f0c8969zbxcbekxkekgo88etgl26hi1puhi71ujnnqmo5nxvvfxcy4x5beo9tm1iqksq2fbtmgwchh98qkg98gxd0llwgq6jgup9e71uv5q76ftyqof6dbegkjh5knfl2sf8cecgeiuzxsbfzamg9dx3m8i8dghjc1gmp322h7ogz91i4xdu2gckcs1bhtis7d0lfeaakywnvcqwzfii4fgseqwba552juw98vz9qeqt8gslus4xan3vhph76j7yavfao6xp50jcn1h1l1dk8aocyyilgigo4tllsfaabd39sc95n721fplu4jfenu0b41b971hbsypgtsondlgkga8rqb7gzzx8l2q8fayy45558ofc6l3yowfuh9e1k3vvblyfxuzooqb9t1s83hs2rc51j4wsx8y0frerpvi2obyonn0q2w8es3lhg9a3x2ihvksbkzfwpmvrsv21ubxqi6qgnvux0tcfcit3jt3k2d1c4vrgwboi2uy2xtwt2dr1k0s8udm5ngbiltel0rjxm4gki5gflocsql',
                image: 'a3ula8ytxkwggoni2ytboje4gb9n6lnnigzsrvj7ukiopl4q9lni42edxwcp96ro5waeultggppzxlewd1ui6hzh4dm1bogf2pvftzo30jrk9an4s4nfqmislfaytfkqq820c1q63ob4jizdhas5qhkg4bgo8shp94ld2auo6b07nxeovrhrv1eow24f99md1vvse4ho5x1gl8uv1vcg4kom0znk8vcs2t5ldn8a5fthy7jz1aleuct741iyki42lwskk0r5ksh2u7e9uorewezp7kyqzqbg3d1y8bax1voun317e8iqevc8nq3o75bmj9vvz932cu6yxv2zowxhbyqfnnvtrwip4zklly80gjqweeugcrhz0jn9tkuvhc6moaeqsi82n3tr75chvrg8a8ioa884h1dzdowuz6ya0ttdv3q2jkkzccqglekdg02btnnrks8ka85nkxu5afljahb6x4e0sd4wmr1e2ojd4ohiy5ub3emyt3dozxrhb5ialk2aq7ppi7ipif7kondgw9wls9k5sikwuegpulla5hr18kr7tw7y0wz1da9j903vdx498748187nchz51s7xnlc24xewavvs03l6brvj07x7nx7zq6imdy8j2njjmzrynfhz6ynctzvt3p6y5jrdytt4gbyfxhuthv5l5eqzgu4cwrgd2ufxv8xdiyw22vrpfc0nsnmn7f8tcf1j4t4fbtu8zu9iw6xljmt65t6cbw9xhnw8t6vtuysyqtraw2r7vcu8vb352ee511xheb238f0i59qs9jkfh820r79l2hxqqcwq6my0qzf8sp0220y1ofc2fq902ng6atu74yvf2ud2rsl1xr3k01bdrgrr943c9c65heqw0xrsn3lwyycwjdblahr83qq128vcedp8p4aldegq0sv5k4ce5s2f87jvnywvpmuqqlnw851ln21z5dddha1t3o7ga2sd7n39sotvxaefvncxmp66ob479myb5xqi9hu5ams9ytariulag',
                sort: 330905,
                administrativeAreaLevel1: 'hdo55ueai8yvg9npx95rkzmmf0u2jz2l52v33icc5nofx31mom',
                administrativeAreaLevel2: 'qc5ke39np7ay718epwj4mvzstl727hxa75wvhchetczya2qqak',
                administrativeAreaLevel3: '4hbyx557ijbnexjpxg6q3dvqnfbw6klhiojmhlv8lvd13rdmdr',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 573.88,
                longitude: 810.19,
                zoom: 60,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'kd',
                iso3166Alpha3: '7xi',
                iso3166Numeric: '7lg',
                customCode: '34xunfk2fz',
                prefix: 'zm4x1',
                name: '6tbohve5xnuwki14hh656tpa3aqzhtasucj7cq4wqheusy6bugqpnkqfp5567a813vww5qg82pnr7xkw0cxdzeyzim4vm0dn2d8dy8912g8254uqaw9zi3z4qd5w81epb0jv7kyniltwjvgf9xrnp0o68buiwgwwspr8w1w6jv1f6vhnxwh99ry47lervascvxkzj3da6sl3jqr8aku32u38j320nqeelxa97pl34d8nhm160i42071f5mjduna',
                slug: 'r75as9nw0t19atq5pp2kb2fk9yxdxnd36anetvxmtcec50b8394m4le1phipzw95p4zjfrdgrtrxe6twdsa0kml4coa9c9lnk6zk4uoiejfwmtpnd0cibb0oaduwf1vtqjlzwhxcocrywtcj8cmsedvptdbqi9chvoqz49rde0lbk62uk7c5j3el8582idze0vqom8h31t77fztkgsskm7fgvb96aqksz4emxrzc9wueonx626fnvac2w5412iv3i0fdod2q6ede102clsrydm9yt71y2qbjso0f8g81cogcooaagl69murfuet2uupk8pdna6q0rcs32qf71jcuzv28lomajb7xbgtq6kp215f7t1uq9ybphq1qj0130dcodz9326a7kqvzdjmvb1p96ycspygd26tmdiomty2wb124dktoj0jkyyg7q8qwa2fsoqtfvzyp0uxd6ppbw5gsmffobevndg2vpr5at2t166l8mtosi5ai0v8lvpo7d6nmx0ooii8qaxh9svm8u5v1h9s8l4uglg8wvf80pxy2ocz8g0r7z9fre52re5a3am6iqv3evflsoyekutcdvgx6t72n2l75sujxxgdg3i6llq96kkwr6ximnfc3gn8oit5noi0tb82ozv4otyqoa85hwcj5xjtltfoll9ws1ybngsguw10avxnljx9cu6opqmqv5m62047vb4p6rm23n76xkp1gbjqla3lkbij3ghupbrrk9x5rurgymebs5w0djal10mknjonpsc8u0jrxjmp0jkkw3s86l1na94ib5frf6xrv4jpklw67f8uxhcm011zdap57axf890yh5tlsh7qobvd0wtgweynwadutf7jlvrkkrqbtl7n6e86gbel8ax2im69du6e6v3wlt5yh6g69usgvlrbj1ym81fwplgw5djvwbswc2mdszpj5nmexfjxn6gh4lf7o5j438jpc72sw8znfv1gfqdzl1ho5vqcbbhopi86ztszi84x720x8gitl',
                image: '6vphvp2up2nsldp2ascd6jyc2qykoap3e46r1kx13v48b50keczbgibr26s7l3p7ihyxqdkd9j8ypfsh8pckpjmp5o6sigsh1fqzdyxkoil31oy864eye9bk80i2v49iw0z3ubvb77mcdist6th77tmylzvechpzvpat1wmlpvszm57mtqchvimoj44c9gtywstc21loix0jtfydgyr9op8hr5l5b83jsn7c8ma7vovqvmde7o13774sr9r4a5e793guyp5a0t0shus25jyqarzsvi3t7rcex7bva05t49lmeqgk4cbysvtfu9dmlpt1p0o88042omy0zs5bfcm03dinfq5gnr9lrjcqzllqqrclx0na18z8twc900sv9oylq1f8wbvx8glesuncilpkb6aee9bo2yr4ibf31s9qtqvmlwlnvfg6xyqm8ijjmkhoxc0ix2zfvwyj386su6ubjtpuyxb4mtkz91pgmtabml6imz8rhzml7e5inhq4sgdxxonbrqydvpsrnn6p8u95aar0wjtgzt9mkh5p83rqdde5jyv9cy4kxwbrlom8hxskd141e1dsbmzppbwuzr49uj6g1wd0opsoy3ol9e26ht0o8qhmsavz78u2gx1savmvwtzynq618tfb1wiji75s29i2ta1xfg6o1zwjx7jhzouvjis252wn3t37xue834t9a0xdnusgfnejvhkima4dtvxqgojdc6wio8v964ya713bgt3l9zr771sxk1or3sqh8h69pnai1r5e6fezjvhfpwix6h7su95lsv5eo9kyeg8697574wugyvywr8ohmg1o5sqmugambaoqdugnjcpjfjs4zhvxzyrmxjc4syq45efguuepppteiauihu35f964a77dn96o9mkatyil5d9ivw9qtl5oa74xvf57htdu6b85uk0gauq78wt2u59ti84bpek1ukizb9s98jazmhjqts894g7tlowyp907x9cxwctysrgbx4cwav1kvgsdygdb',
                sort: 6299927,
                administrativeAreaLevel1: 'xyw99ff0w114xr1tjv5jv5p5xug6ua9iy04ca6tb8l34tlggut',
                administrativeAreaLevel2: '2dvje2krqmx0pcfdubu40nnfbm5w1cvjhvrnsyp1ppxuocp9tf',
                administrativeAreaLevel3: 'w2c8nqaub4y18udt1yjn5urvg7i0fijomynviqt99ptg8g5otm',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 47.51,
                longitude: 456.38,
                zoom: 82,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'dt',
                iso3166Alpha3: '8gp',
                iso3166Numeric: 'pr1',
                customCode: '6m3oftjoaj',
                prefix: 'w4n8o',
                name: 'jlu06mmkjc9pw2aqbasrpxe2vrt517y6vk3qmy1fml2zxk12w0ph9jmvlpt2b8b6n0qhw10aif5idfa819k5r3a4iw60umb2cuzlyf20g3buw0ysee5mucdx8uca4b9cbwen1l920d7smstfw7ouh277v1wk5iyw3awrakcnnumn6uccmzbu63vv9ckspuq5xakqs0zzxazs7x7154ys6u9pc2dgvi772i4ydsxawr7ffp0mwh0yol1n8b8pmqg',
                slug: 'sjhllao890ms72d72hpyql875pzl0ezzpz9n1q5i18f6vcjze2ehq9st71g54qw635kahrh5cfqiwzpwap2um4ykxrqa617utmtyhuplmzx491afhjgtnpn6maa9c1az8ikqzpi8u9vavt3p76uqxoc8kq9u9jseiiqxll2vg2uwv8smqfsiy09fbvbr238i6hoola5upzx8mqh3q28f44956p25vo9jyub0erpaxz0a6jlcx6m4afopi7fwurpgk1z1l0ybyy2eiofeghhysl8p38h1e3ijclz0ggb82n8ql8z475au0xkesgcl596h7sg2a8wy74v29cjk16osnpw50e1phlvpb6alox1819667nvq58l2pzgkunv0sh4kqcridfiilxvue3srem1pybzpgbk8zdvq32i3v0bioxkea130f0l2h5iehtzdtstfkenjdd06iur944dttzepojkjx0f9ia51ngk811xsi65pvjp7vjrefboyncgefysy5ugu63j9bhf9fslw2rc8k8lnioab09lekxbvpvfpln3pyfx3l8k7pm98yvoe59b3gy2moltk8q3pkfja805d38pnymgyiegs037uwot39yqabkzv8pdyqagbrvhzesp3psgub9i8q7v0w3dxxyujgg3n80zkxs5vrublqv0dgfb6fj9hlv8j32iikxllh5727n3lzmf95tesh97sig364tvlnjhngi576e24nqhcil5zr129th9b2pz5w7t5qkpxadfehio3zvd9bzj0qs9urfhy6lofek7wtz4hbetyk3cj6f1jgi08el06zpf55rgpx4ine0c577whndd3mwo6u3koke40lrfr390cuzvl6czr1b5l4xs16e28d08e2w72undl9txhcgafljdn8aijacwn0kc65igwsmlvsc1mw7085ljos8sdzr0o0q4g8dzsfel3xmqqtswnsn62guu8cmem9xfpjn9pt4c4p47wrcej0l2fc7qrg5jqkogcs8tv',
                image: '2q7flpopm8x4p6p5xh991sb7p1q0xr3qdhrs7igq3l02s2s15m2hs4nsb7jmn51wxdod394nw2o5va3eo3v47vrf4zdpi6sxiazqq3sn5wdlvj8umwwqt4ay946mt7mefb1xehv8pcvoxb3s2nobptyful1hb5tkdx8ipdf0z68sujpbcrbwlkn8vbu7pwx7b2hl72675qp7h7ysbhdhgr3gw5fiwy873dn236ik3pgl10adcdpu6p4t694ukgufh9xigk7s6b9hzsh9papgbdf48grh9tc8574qfagrkfzfnem0vwi0zg87nd48d7cl3nawxsosjivelge5mp9guxa79zoack47e0c7lbahb1fv3c0ziljk4yrsi1bea6xzzivlahmqsok4onctqw4yroxsq59zcpa35w8k9cn766rppztyh3w5dozf1jkpj46wlk27fotjyf0hf9fht5q7kvt32ks4fn42uxz6whr2viti5qjfk0n8s0pqcvwlp53msvkg9yosl2kq5291biq0rulcdgz8dimnafhluc5rpn8qruoxltg8vzvqazszmi6dkyqlgzu0vk04e9mw8fgp49dmbypzzhrhoq6pliorljbec04oqsktq6vhkliqq6p2nwarg9h8emyipsbtewt11ngvt3o99o8ve490px8vqgnodfh62rinvlbx4mdmvfuen281kphtd1455xhh4dz5l5lpdyjdg0lgidb0t0cvo83uqagex23ztttaesztcipdpa72xahfrh7izqlwkj7st95y1cy0ujk54xlb63m52lyuol78yjtno8q7xa8g48g3qnzet28wzcmyx8gyaq78eq7wdqt4qv33kc7onhjtr0yxr1zcy531szebxzbn7li14tggtc6nbcz8awo8j226s24tca1k12z39oew4cyqa9prkcybtuzllk0j14p6kn1ub269kx2mjl7hw7grihq97nd1ycnajq6jjuxfv13cjxed5al9rfmytick999avipc',
                sort: 453497,
                administrativeAreaLevel1: 'alt1d8pparx2k5tow4d4tdupm1arvtmkxw3kdqmyt28sir7zbf6',
                administrativeAreaLevel2: '3ogzethvs0t9f6of6uad1ur8ikjck70fz58swf55sjd3wm26d2',
                administrativeAreaLevel3: 'zne6u8pld4ghqhqxo9glah7g044b34b0ek3m46yr55fzdy450k',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 474.60,
                longitude: 275.51,
                zoom: 57,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'vo',
                iso3166Alpha3: 'wwz',
                iso3166Numeric: 'xr4',
                customCode: 'p3sa7w81a1',
                prefix: 'nmmoo',
                name: 'ssxeoit7jujua5ukrvihkp8amkk8q09vhi82lk66tjai4mjhj58ivrxws0ipdiizq9fb88v6vkixe2bxw55hh9re9x3xn0geg4o0dht9wrzh2w8fnpunv2fmdjny19karcqburuw0fg19pbf3b1vbpkr2geqjbrf8q4w592as76jjvyf6zqnnw2u71g453ees1pi424ogtvnu2sz53ljrhtwcldb413c9edrt6m41hd8z9mfxii3xkobhy3lyaa',
                slug: 'zsqvpj3vtz39h72ein1vzliopupvujjjv3zuc2ftonojmf5h5j32d3q6sfcw5ng7g1ct0pv2giy1n7hqsnj2n88yc4f46ixclaj2k6kqo33y47ebcvqb50jonjq8cuq37esrghya0mqkf28lcwj64igv4q0e5gv4dflo28g6281xg76ki5zl21rwmu6o2lhw2y4fobenfidrgk69c8sft5g1isikcf2bpylixlh0q6n7usbpcttttqv6aaaab5omwevzjran3lrcimc4wpfwanbgb8pzq0s7vim667gfy1apns6hjigiermyot873dorkkdez5dbjy3pduqmbnlmx6ut1zfo8sf4qh7jbgpgx5awv5lmay0sfcjfgoaq52m13blj8uhn7m8f2d42l2b4tmov2d1brs82szca3sdz74nu7x1o7ythr02iuv12d18so64y6aa8bl8xt74v653l128l05kut417wfeyxnww3xclq1rgx1abwmp79h3rgln48xjfg364dbklarqqsmm5yukolb8kg00mj94dcx08x47dxzv5hq5a2zi51q9sywke7op2u90prnwl0ke218v1llbslw9nzx8iu8yzvekwm8mg52ugcj9haggkeb9lj4sqm3zy0pwqkbrl1h8gar7352uw4jxjr0bkx1v6ezdxbs076j17wpfrfhaythk7xqfxkqv5rin77282or2lq3aatdj6679er4gxmxyxikb9e9d3jqx8ju0y2zju9uppwplupan6mv5nqsrv3lig17geztx1ob1nbujz769z9spflxlszrv71nx4bk5eu2111bjpd2i9sa98nxm3vxchr1j3zgs7j2ets0di1u1m572fgdk23efd8tgyaop9mupgsw36dlg9vu8jhlt6l1qh9y2ht7tny8z0p4r81ree5fe74v30xgd6gz5rou3wl4ows6vznxo14arviqg4fl5cdd7xl12709i1ipfld2xinpgmgk7os43fakfj7366yopccsgq',
                image: 'azg17xz4lgs8amtmsdyjuazdnqjgv09ip21hcjuxtnmvb6kgptagxfvaxdw6doqrwk43wbeld6vvmkfy9dawry2ry018uo97y0amooxy63wod2p9946igogi5r7outfjiq7dwnnolg7ng3ciza2cfbj1zdtok4qkhvjk4udsuw9fo043dfch23k54lxlyumb2njiv00d182zi3ov5bap5lhdu0dwgbkdngnsjmhuznlyy2z8r88e55207adxiqf6q4fd8io0iwkq9uyij9u5csu0fp2r1jpjpz7tx5dcxz10x3973u0qa9ci9jp0eimvejw388j6zrj7looicbrkbj174i8zpj81zx9utydzf8nphdler9togsd3qdb9qvpdz290s78sccr9c7ullvnx6e7srcyifbnxlm0rmqfrpz3rf6tnj6oe16wwyya9oaewob95w6g80us05wi6bhy00i7ybxfr2ioma3akebwqxa1mpducf4c2pmuzm8ugkgtwid9xln316rxf7t41cjclgjcnxht6yfri59fr5szbzoveplhyct2ba59tevpa2zy7xxktoh0fxsdy39yraydpjimxtql8qgtjpx7a0ml8f9wyfas1vnltkq2ew3pi1su68qvex1hjlnh0tc64q3p18ku3v62yx2fbv44ruym8xumq9criqbeti897xdlcka8ltdjjq80fudfmjqu0xlklm9tvt4mxp28dhib6awor4kmyy2rj7hm5v2fvf9ynx35td7v7eu2sdao3tfhbj4mga54uy3f4991bb1k6vopjfnr5cramn78xepzns682siwfhi4243ku58v7hgew0heb48kg9vmi8vmam2fmcn8hcpg5gk2nwtr7hbd5ic80a0axvrol99l5j8epwpehs6rdkh356729bc3zaxijfbhbysktzxe826xssurt7j6f48lrlkh2kfoc1fu0bd5t6utdsgef3aq4qyru6yrivgzav9kcqnrauwsk2ou70eoe0snf',
                sort: 427408,
                administrativeAreaLevel1: 'p5p2ga3fbhtkzvbzybr6c0nvfvk266689gjvrl1c60exc0d4tt',
                administrativeAreaLevel2: 'zs5tp04p4rwhloe7hu67h3bymqxefekbeijt28qlz3run5ur3vl',
                administrativeAreaLevel3: '5wwa53mtwhgqhnr7ezi9q5hgse9pgc3ho3o62v3dynkjltsfry',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 411.00,
                longitude: 471.78,
                zoom: 67,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'ce',
                iso3166Alpha3: 'nnt',
                iso3166Numeric: '0zb',
                customCode: 'z2xwcdev4z',
                prefix: '6hrk9',
                name: 'jigo9i84ysg8g3dn0ukivcjw2m987qovj5lkldsaz7zbkg1z2jkfjqzjantc7als5mavsex1f5kyn3v0d3bun0gx9qyb1d5zd93ugczi0pjsmzjb0mfh3i784q913ixp2xf3f0im8z96sbo7ac35acuvfluncs1vksty41de26wwjqqndcd8ocvylnzx3hh8m6o528gaimeit4laxsxdodl1g9ek184ap78ur4sgpmzwp9q9pol3u6qz7pi9va6',
                slug: 'znsqsk3aqhcfsgr68ck9u3m51hnvocrfhog8nipegytq4crlxf60807vh145m3000jeixw9el6o9wtfrzu9r6b6uwehtlbk2w2e3r3ef3ap8clp5i8fvjpxy3nbypmfmgrlzr1gvvoo94329uf6aklp1elx7wcdoqg3u19rn3i1p2x4hb2su5ck6dn48odcmv4f5plapz6lcybyk5bi6ixche190dr5hthvjk8i4v3klurvox81xz507kq4fjmpolutd20i2aueud7z2bdybxpnzarzrsmvdcgt51xbf2mrjndkazi8l1w9m71db4p9tdi8bop1iypc8817r5084ouov4ixf6x29tiumo6659pazt04yk4iklxx36npb9rmlpjwckudlbxs3rn19az7k5hufmr75wf95kn41wlsm8t35nb34xn0sfsslm0gwobx7c3te4zwhzl63ej15vcjocp3oo5gn598irouis3bss6fwsweonl1ysngov8m5158lqz3wly3entu1ob5ui5ac41r3zfq9vl1y8217h0roj7gc41yh98c6mxnevfl3bf43wctm2mokzrvtae0mme5lb1u646yntttejvjotvkbog79kupjhihiklo8il8eeb4hd20gbcqc2mmten69g1yuf8qvlak7lz84uvl9yu72jvur5daxv6bkew4lxcyqq3pih7e812huneutr2om37b0dv6xskeo3zpeg353a14624i6u108fbvg75e9v8ky7zq2aqb6vsa1k53gxwic3i3va3gn1yt4un9jqzvxcxi0z24lhtixla22boz1ms49uvgm8p2xuamyr03odym33lgzg5e6mh224y52kihxt8koj56r20v3skso0nr5znai7jeh5axu7i4vxorty2tqgghfra2vhpt097n5n61ap2rvfuiu7sowjk4297z70ljuj3jfsb16gtuxm39bpsppvr4fshqsy59wdlt0a2rheigwhjqzqiaztcz2dgt89j7pa6hg',
                image: '9oof91k2sex8ooaca8yr00eig2721p02n5zyx1x068ff9ug5mhapluko8941n2dbify28inpn0t9a08dm0x84nd2matnhpa20dzh9cj429xucm4hxn625l95eyorro6hn6e9glzpddk9bvulheq0yh3bpasla3zr2jqdz2ayxaj38sfxdygl06ko5owex2copgdr4mvwu0vygyy7hplq2fod3vu0mjj0ongxwe6i0ngdd02sf7vkjq8pomcobyjh8uhvwy0zmhg4ipviaxzyxac72mu7ccz57u9wz5qhtzq3w5t5eekm7ntlqxkdtgvj4allstkmp412xho1k0way864dnb76urw3y2io7dsa2wz116jp03h91etw30xl9weoa2f9uqn91gfijes6co0pc2ifgbzguscwd0qtrxspkdzza0tm0u66lnrw5p7aorfnty9j5xgvnxnoe61178lgbwzuid57aynhcf2q3qadid7uf27r5hb2u036ege6gl8cswyjztqdyzm7lu05ynf8s9auvwk2etacrpa06c8naevdkze5z3dcualecd5k0uiy84c9jrlozt208pwv24jaoynbc666689it3lno6xxu3aacxuna1dl3s1xo98y1g1ar96qw1e20tig55tcjqt1xo0ncbf1bvejkm3qf3np99lhndoge1u2wej4anya8j3co13h8rvslqaezel5rowvr0bhr9bhmty1qum5wbeg6fdhcahtadaosmey4s1crs6uuvex7igjk2asf82mm9pr5gswhwk683g57g7gl0mgt0ufdxyz7aypqjgdn1po5bxctkrjzvckoa7hdtj9ue3v2f8rq9k9jd995ktm91156azgo60q75aazibt7xk9l5unymqs86zzqezctg1mcibjd0qbctx70bm0aopb9j0etxebwmi19a4hhsrqcyjhfkkcpj5z84xbqec8kwsvvwoym2q66zvg3ff6yi1wpkbr8dtyj1stfm97gzo9bn9h5l0',
                sort: 284122,
                administrativeAreaLevel1: '6yldewj73799ruak3s27wluf5llno45rcayi4e8oeux65uaupt',
                administrativeAreaLevel2: 'gn8yfmtojbdp9myd8f3ddh518l520vyzyql9bgkxooeugdjnb8',
                administrativeAreaLevel3: 'fd0p6yllcrg3tzgn0ttflbqdw8zar19arweaeb74ic98gv5v9e5',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 550.23,
                longitude: 567.90,
                zoom: 18,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'rp',
                iso3166Alpha3: 'rt8',
                iso3166Numeric: '5oc',
                customCode: 'xw4yho0n7i',
                prefix: 'qaag8',
                name: 'r04f5oldasjt5ck7bj3ua6gd77yv3cwm4bfh3a5kqpskc6t6qeflseynm6bzwiqblpt1hql3czj4lp0h6kcfppn0hzykycmjjfmsxkwl90msz8ikxpqe42tcdldt6cyf8r5y1ilcpbr2m8fwe003djr2vj2cx6a39aljsgbrdpwmklsmsvq3htb592y2vzkqur1h5d3z6bbsu4driqdy7nkek1ims4jhqnnl4tmkkvvlbl5e8tta98ycm8fmt5v',
                slug: 'c2dr6q1nep50j2hamlmo7ged1hngfa4aym9ivoaso70djnm2hrkv1vywi8aaar04nbu2e2fcqk3l4dhfve93b4kgwhbkmjbh3mk3s2fb63nvovpzcre06ktdzayeivdpce5qb822gvglwp33r93ivmvalvcsdlta2x4ai7quze0xmyn8ic6c1ykj7ykah7dalx5vvzt1rc9g9v4bhog1l4s1l4fpvwsh2xfb560k9croeducp1324439q003t3f2ipzvo442l0m3bvpwy8jp77s2dlh9zm6bpc0p9iudsqdu61ihte40b5sauva4xkhwmw94qflj04egg5jgvzebtqff6rw8yom027ss26spkbqdhgm19mhd4sjeozccvmk74s9vgmi60eto642ns13xbvxuwo2y7ejglvryxu1vmurvr6jvyor1abv3o96vc3zg25v9u6ejwqaxt8pes67t9m24aeseyklgwr0vb97088ihlfrm124pt725qk7pms5nahtqmcs5gwmkirepodptugyjbefmb6wqiu8lxg8ylnldus0zh9mmst2or5yx83dwe0tr9b1ojxa765bssrqstuem3m9uwhb5xr78mml9853ki158wwf3uo4gzfshqymmf012s4dwzbqy11gfuhokm7e8i1okjsxnsn50eq38ewo4soczu43cw5hj7kw8lntpjn4hzynu6j9oycan3k488b8oevzje4g2if88mxs4r8tm9nbyh5792kcj97l595zkj9icewk0ksg8yqpt1ipr7qy76c9hr2q4reqf4fvll593l8cemwuhy43sd7odhtnrvjz75u6u5inqm32cqbpk57mkah3c4usscyzjvyblrqxynqqf0s4y2l24oe0dhg6c3yvwjca63d1zxiftcgemqss9s2vrivwoeszfe3qn7v8zdocwshylb9qh6jo435lq0pfwzbrlpk85cl90prxosj8zkfflzog9htgvjdl9s72412lb52edvbh765u1y467',
                image: 'v56swvvbuy6y33bp0kjsis185l0mbab4f6276g7mohcw2c08hutanojvkywicjk5r07dplz8fo62ekrytno9jpzcatww3fb3386j5omjat7oltmhh1e8nsl6drauy6qhjshatm2kwksq4r6t78k2qdw73qxhdg814mxakyeg9y4lmwezik4rmmxnhd0ff7vdwbwdn9a796vfy9sstljvs9n7imco3zmduz29ylq00r2gdd985xf8svhjpi9ytxfd97j1izfs9wpzh4j3u3tqrbqhkyu0vgk8fqvz1hcfjymtyms3rd1e8pubr3h5we1j1q2uyhu772r1y79qpcektj9qxxqvjr4uh8746ejqrqcrwb2adfshtylq98g7v36jkp3fj2cugisekt2okgppxf1p757dcrdvmpha1uv5ngdi7fv7y23hi1u2gvo5lovbludcaow4wwwvrvd12floekeapiudq682acxo1fqoq6emxfxkjuctauvpfo3uiepbf1r5vy65zkuitbbuj5yw7quizouuri3ccarkzfnzp9yjymer3ptpw8dac66k578dqd9za6bap09scfd3ic7egjul6vpi86ihp6vc5tx2mvvi27ybjw7yb9lxe1hi74lfeojqkzgzi82gw2ce1q4nhy8t30wf5dmi84syzzpodv6pnh2qn3vyf8mb7ae60eb0o8ef2c2bcv8nbyocufu1f496w5cp3ljdgph1yhr79a7gaovnkxk38q8jq171monput3mi88eq7y0a8jjkjjb5t27we9culmpjkky84bnh8rgthazyte9bakilqlc9881zvmf8t3tta7oh6q5ws1nq59oqqa2ccw83caj6sm3zdcswo85846jjy8v50pm5ka5vcwq03xe61tj44jipax4wjxpgazttuqhmg0q3nv1ookf7fezwopcdeq1a6yuv6e770r9z40kw1ap8956spcjdqjyzwff0qeu4hmehnmsyqiiy5jvx8emqw74daqzklt8',
                sort: 309086,
                administrativeAreaLevel1: 'qu5tmo62is4iwanw1u6691is1232nmc72ekvq4rhn5d5cx49wc',
                administrativeAreaLevel2: 'jgvptmb7lf8c2orfl4hcchfl39c3po8nd61km73tvo4dpw4qbq',
                administrativeAreaLevel3: 'a7ybik6dhy3ys7ex8esiseswluq411duxauwny18vkm1vp01xo',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 792.48,
                longitude: 288.38,
                zoom: 78,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'wh',
                iso3166Alpha3: 'zuw',
                iso3166Numeric: 'azr',
                customCode: 'qlbdou1ujb',
                prefix: 'xhote',
                name: 'yf15dpfolkeimwtmftm48lm7x2l0kge5dwqiarhmphisas6prsf9p9szf4r60agkzazcuw8rtzibc26xejimne08w6jvrtrbqzoc2mlkqz8i8s55clkbd8luvryw4h9n4a1kjcuwso137whq5ujbw0mig9panpcjjvxljrmjr2l2hll1w6osfrflyxsb7jexiepymb30gojx57qthib0stx7bx2tacm0gka245uwx117ix2b4zn665b0527npsx',
                slug: '9btnhh25jpbafiq9onm27xjt4y8plwo44agyl9rmt1mxl8vr5dhr02gur4sskhlqe669pm9s5w30v7d4oqbyaiytpggj7xn87q559trul44lk1h0bqowzjoyar4il2feziw107o4qzdeqj924yzs4yarxkwg9x43wufrcy5thi0r1ue36g1n4b9yny0xretlf8eir86coalzxl99ik0sv33vml4tvekxi0mdxyu2fnpx8b7xzpqtmv3yhmkdyetztuztvxzynxp9ucim05ump5ozquyvaa9gn1l689aa7zjnv4cravs7co8akota78s3k7ry9c9c1wo1lykwycvnf0qggbaysc2gdl4a435paq692hvhcz20gn7qqyf8sgcz0rs79lztsv61t2gh3yk5n9jurat8j4wf3tehqwn8ygktkcrubmehw9dgl2kmgquhrvzc6cxfn4vsk1ce187hrdaulz5l7dhsp64ozgh2rmncwfw6qhju1pcnz9ankxaaz8bt748igmbt5cpelj2ytm2bobrmjyziqzdr9x21irgpma6czq6xg3vat6sibhz9zcrwzeoheajyr5pquotgqgyv3wz8d6cigfd2840wz0j060prbtvg815znu5gxd0lwecax13ocjo0jw025i4q1tats9n41atc0hdup4rwdpm2z1j1r66gpx4um7yqe6ay26hok41s0qa2rnhvjasr4j5ykxmcn05nn3i4qk2jdo5llgrjbemp9ntrj36a8erdywfqwhchfaw3os9tujauqv8pbnmvn5fzzw6066xss8vai1l09oe597fx4r07u7y9oathdlhwgr0j5p4nz81r2ekus95az0pca6rmidsy252w916m7vjfpduiqa36qb37naxr7z43gpk86glgly19pa63pyga6e59p75je2qf2hz8qs25voactqr7rkze0rz0g9wrx30wn3p1a9nss9vx34sltk9c9figt2hl7w4spgwo86mpj5ooh8gp85ar9zlj',
                image: 'pzexyjkbfemjhwuf2zbnlk2oqyir1pwk0r2ixrseg7j6lziigyj0tfbctyi8cec554ljqx8btd8wtppd07228tjzd9bd0oudby1v05lqt5wusvqpj1zvkhblem5cpd0d46xosafrbfe7m4mktx2t707zm69cplu3br0kj65suc3wvflzfjsf8zauof3qh01uwkl3cnuznkyfbxoei2tvlpbnmaqslc6qv5bcupsmry9odfqgdn2axklpjxoqi15pl91p04g60ke7dpc66di0sd63veq0lspengve618t2673sagprugidr93xq1ldejaxmho495963i9u9npnk3d1xip78c9q73zdrg6h1z2caj1nfpigmiwenet3c5an1u66lk05b413ev0lemz9m6gciz14koqiub80oca3diiv1ll3rhj21116xuenw79qwwrbu9jp5l3peaex4zs55s0g6cejp7q7umrfb1swi3tdkbszf5t8ehi1pxeay6r05k7hlkuykqz9ygtpo9fryqntlaldmu87a33oxajgowod0egsex3qbbq4tw17ygwweu7d3jif2swu0kzbcqzyesr5dmvuo5nv6hvvtn8kc8pp8tkzeugoc6an7quvvh9zoh9sr8plr3kiv3cbvblgflhow6ir8syicnlwc2xzlmuq74nmudp37tmwl6fmr55rw6lsnj9zco0sxvb7prwkda4iivej40s5akwjsrq3kk9kjijfmz1xwdej3bkwazxb3acyoorcd5e07jr1roqwskpqggctspoaxb4gnu1fmx96lom9iowxr35raqsk8r0101gr4ki0md3tew0hw31fko5t484i466b3p8e5emtsmkmnby0c856jtewusho8iv6tlh664i69e1otz14zu24mi3mwl8tm8obgb1w7usermdlle4qws63p0yx0ejib7q6ys5w0my0a0cpwvt08wjbyhz0evkm3sc31hi6nr9ugs06qi884ofo5fjygmsh0wdpt4z',
                sort: 871987,
                administrativeAreaLevel1: 'ngefxyai09snks4kcyqetbrqr1nqnyk4e2jm0vftp4d8g9m5kw',
                administrativeAreaLevel2: 'cqi3p35wpve8zh9goz0cpkibcur7rfe15vgpllu7ydpz5exbmy',
                administrativeAreaLevel3: 'jnpu41y18g19om1cw5bzu3bf7kefn56tggylfaxjbz2w478jk2',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 939.50,
                longitude: 563.10,
                zoom: 80,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'cr',
                iso3166Alpha3: 'yxw',
                iso3166Numeric: 's3f',
                customCode: 'aar0oaihkr',
                prefix: 'h9rg5',
                name: '824i1k7jiqp0p5tk2mp8rd2bcefflequcj0sijq4fa5gvq49jqno5ywqrahkib4efuu9bu2d117yva7b7mzqzx7f7ap821z4uze93741sg30ua29ll30wlld0c4qxhnl5u21gq14xk2vgdygqrq19p6tv2vs7d0430cf9cifspk98f65bhgm2c3cmv11pw801hjhswzqzpndi3vf8rnh6hpl442jpwt0eo9yhih9sddmpzberhj8s7nv2djjvfo',
                slug: 'muu3mu5hzcq0uvmtjvnqnptoiw3uujdpe758sehna2oj27g5kp8chedl7bq22whqsya1is8wjbdiljxffq2an8xli33pkanveonb8kz35m6h52z1k7dmmym8818t30qp3nzqbkefr0nd004efk55367koadna8s641lq0pobt7c19zps0p6uwz2j7getoeqb8no44zrob4zp774bzrfhpuliwm1ctb9mi6ff22betr8cjcc5u3qib7fpgm6e2l5k8t4abd90eztwpe1cauzre5lcl5rexes8b0tbn8dd1g0x7w6ng15c9dz194pqv4x14t06rbx3uuhbomkdy4kawscnkyo45tm2kqi20njwr0xu7c4hiqui66dolmyd2382cjgcj1dy8gsk3ujoolztga7i9e93imp5d460sg2f4dkw99otemk8ccku5ds7hjf5ixu6gsa2cqpimcm13p4tzk8ryodbzgslxq9beyiolkxigmb4jzu3u2n5bbbb4lnyvba63ibe4r6a6xighm6cjlaqkogul32m62bzw74zpcr5j1ep9wtv5mwusrq2vglfozgxzd9eu9dfvtv9udergq7qgm55a6acmq178wkff3dm0irpkv51fvs7nyfd9hbwyhigoo43qixi51eamizhajv13zcudhwx4ma2eqqkdkhh9y0e25r9onmefkvwon3xdu1kq2c17cseuxjm2a3ip5fmk5shaisnzypa60s0b65fu9ejy2f2vgugh3k20m92pfjrew7snvz8k4cnqq8toi9xrs3rojc5b8t2ycfkefmp5cbenq22wxk8ugrivlv9loq9vzehw8kv7sqtq4p2ptjiyyv2uvfez0wampwuhv3f9zb82no9ac8h94uvgwhcwtkgrjmdkaomp9k9rwxafqid0horqfhsnzvxx8mbosa5mavh05pa87dpm5k73gv2534y9n3t2p6t0rnh41np0rpaqgt31t23pko7tz6epgtbe1juymyyp3iy84z1aagc',
                image: 'bh7j0gu8jlo1vv3a4b6brv1vbkgqb37mmjrfdzoqdngkjbee2k8i1ks6f1asips5ca7ydfawjqkrrw8woov0dwzdps08ndptdfbmo7wreqdl6moyijhvsl51olueiur5n06wpovbpfeac8bp2w679l8kq80jnw5a6srx61zcd1otntesqtztgq1g44wd5bmr49xip50ujc9exe543kufdpgmiqy60imgluptywwempby24fx65s6xircl3zok8wn8wjij2jctor10ytzdzhek4oppwysiu1lz9xo3mqmcr26rz5dg33evotpd8377suqefqybh2qnyn3dlu3pkk2sn2umd40x5g962nv59yq38ijh1sr8grzl63vof0mgmfntpqvfatp5u1ibtyr4cavf5gxvve7c8we1zxe67cipic5jhedn750t2ousozu9r8ktp4tfbzqe62enlytk1sjaw7myew6k5551yxhxfl99ech4h2sioe36urp08ye9qw1vk6pyiff9okqsn6a3fxhmwzjf64eb86myllraqywo6kq7ru0yrhz5t64epntz2bkwdxvix8np0ha3wij6md0tiknzvlfwo7z7od8lw1pmeo459c2xuxgc2kz2hap6ulg6t72yxcu2idgdnuy7e6pc6aqps2h7x912hn9t6fbffugva0zybrrvx1wcbsw6il6e9w2b2ymbce1n342alr4k4b9fx0ck3czelelxgog4jzxhpyb8dd8ii615aqvxg6owlin7qib6wybsm02nksksrwzw70oxgoa870x2tfhxdjvp292hve44jlsm5daack9hrpgf57zgvrut5pr5bl0fi2dz5g2w8ud12hcwhza59gtzgmhs1kggi7vmr20w7177gxpzinjrb0qt427wjgjmrl74svocyaak9cpt0sonk6hmuiekqgq1vi5n4k9txwt9lxkuxpnuzqak1t1n1sje1f6bk9as7oteg0d0ep237lw17i31i07xv63050g2hag',
                sort: 912331,
                administrativeAreaLevel1: '0bj0imii1byiedlhyoylfkj17zpkyx4re8qzjyzfivggfnsmf7',
                administrativeAreaLevel2: '8o3iuramfw7cs0tqmn01lsyh6vv16rlviaoqfize0ebuonibj0',
                administrativeAreaLevel3: 'dmjweerxic6ss9wo8jli9absgyr4wlff5exej1uli3tgbaze9t',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 750.53,
                longitude: 342.04,
                zoom: 801,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'c7',
                iso3166Alpha3: 'x69',
                iso3166Numeric: 'ls4',
                customCode: 'c85x1g2yar',
                prefix: 'fp8ov',
                name: 'm4d9jt48jfr0edvcwp2zjhbdmczzyz2gvg6c207l3l5yyxk8c3l7v6ffoihga12as0mfyal1dbf7dseh3904b4kzlesz0hmv33sv0n4c59gh98l2sjpa07g4noksrkpa9imcuunuyvrx4mm2ofb6dfy6wqvoxffq034b1aq1psa2wg811w6bfss24t77054yx3zaex7qm3yp6xa0girmzuuntp46hxlrefoyn5oxshiyvzoct6vi09m6a3pvdim',
                slug: '2w7af66iyw55gv9hpdvqcgocg8pf0a8m44evwy1mvfiglpyuh905quyzzzqg30rvbec4u888n3k5i2t4atpdpi31qg0icsv235qvxdq3ktw5c4c3ej3vk7ec9iwt7fa5s03byqnpylhlvuicq1epce9mtdudrchq1a584tw5i5y3bpaw9b8sz6h2t85dfloigpkn4h1dgurz17rdn91vdr1p5c2htdo08j816sbmdwzxieyc29zk4ybhclh1qeldnb4zvffs73p5srki3nr3rrdag6cy4a5d9p794ulsapjz9mdxf57rdqis6xjv33fid889ohe10xsmo7k85gsibumbcr1loakvjdu2rda8euo0bpo7zem45ux8t2zs8dyifqsxemus2ue8alykloiwuxy8xklmdzqeftlo6cru35p3tndjytgoygbxiopg5lkrd58vollabsf6djfhznz4afrvrfr9kivzk5uc8879ujvnowz33bb96u1kt9tf1z4u6hunjtlyxsgm5ayrf2gtmc3o8vghtsxhclozed6604b5kxj9z1o7asf7rckxsz03vv4w2c29sxc1r1h1qa7bdtl9dgd9nu01josnj2cjywvr718nelq6wabt9xsyct4tzte56wuxzyvxf1t2wfxzm6iakhxrgehcwd8i9xxi77up9n69n30g40190t8ivz7xl8wbrgvwvtabfgt9xan8q61nd5ol5rulwoapu4z7t5xmr7pstmit2lq0rjpsx06bmqlb3haulr55x511683fc8gnnscqkhp5tlv0o2ml4f2muzyv4acp98eahbvhgq754s80iccx82v4goqg1fi6uq3ih8vrdp5gpeskygn2spu2fbbobm76ejp8230fwnk4c2tzh1cwi5fr9f9scgffi2406yglffbmwzwk0waae64bc11xqnxphsw5vn5l0mw4yepwkw47us2cqka3pzbkf3r2hx8da7t77sebo7hb7wex5hdzverco7jti3fojvr1',
                image: 'di8ufs3pqed8jc6g722z895itdcz44onmufmzsr1s59gprx0o0x7pbrshjn79qu76pe8c06aalzez04rgk1fcg7r8swx7whw1cg8zf88cq9kprk9s85t41ce1870aov1zm3fwsl6mlxxhqhviypytg59ufqyyyzexqu1zmnsrh816zzcltabwtj5sunt5g3ouenu5tb0b4xd911c3dn3rtgc2plb8caeribvxnbu5x3lvcvdpawzwuhvlw6vyvmoy1ux8g0zps4svs9y3jaq9yqro0l7wz277jv0knzqx7h21o6xmn3s6uwqnqqs2galsr4d3qgq9u1sjuxxf69do9oxsgr0mfl8gqi18fzh15acms7q7x8efaq7nr84clcu7fgomd2w6qhstvp960yrm5d7fau4r1qj98lma5bzb1orgn7d2oif5krrqhuq6hexclh1lmysmkt4fzjcokbkpi690rpj240fakiymh7ykzzz78j9ceey4f5ghyl67sutl06112t0zjzj6f59eee5b6iaw9ukjhtr5fz729o3dzb38d3nnfuavc6p3qke6tu7g0ccn6600d00ulhitkecunv2z4clefj0nsslbbhpwuze7b25vftptlroyk16zmx1j70i6qvyatrtu1oxs6k5961hqrpnrr086te17g7ixu53pks8fqy7mijs0q0v6oj36uefcw10gtqfhuhglbnv4xv6z66ry8n5ehaf604n7wui2w7dvn3cumzs5mju6xkld2dfbvggxkpp57tb0m1ly3mtu3e1omoz99tmo051vr0zvwvtau2fwk4iadow6odft5zy8tey2rzgravs527txsva8g4jwf7k8a0ogyjvtcyun5t7oumuxpy4ddaarfr8ezwduesqwuxqexbh4jfotaaec7zc31x07fl54af6ydemyb1kf6wdct3bym8stzgd5sknjlqjjafnie03116yoa5udpf79av5mqmefvz3hw8jivsheqi8ih7hthfwrsv9',
                sort: 958185,
                administrativeAreaLevel1: '4zwau4wcazpl8pdwutipjg832dzoffun4ce3dy4p3c8i5a2au9',
                administrativeAreaLevel2: 'rfwkinyl8v7pps6zfpg2xg2za83qiv4ge2lsaqwg37qxsn3f8x',
                administrativeAreaLevel3: '3z9urks27l4xcvqehf825n2hs0rinn2vax3iqqg7ga34z61um0',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 296.10,
                longitude: 823.95,
                zoom: -9,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: '2w',
                iso3166Alpha3: 'wqx',
                iso3166Numeric: '6uv',
                customCode: 'evw7ug6ygj',
                prefix: 'e5ygz',
                name: 'uu2bp0ed0tn1cujbgaghhn1obzv700cvkw8g24jcr0x0tqr60lw6n6taoea6gwd9hew7ce3qsv9tlzummzucbyjxo56v1yh4kwugzgzq2ywcf1pii3csfwitcprfewtkgqjgffsylnuj0t2tn83uk5aoz3txotb2f0cu12vi6wh8ld0sl1qa9oeoq672ng64wbs3h1jsajf6rwd9uo6s9ysswtikuhqafuttux4a3lr8cixtocdck09ife3cflm',
                slug: 'lb0bsxvlddrl1vy5ydpy4brk6dq2916wnwvr5pytugzpruorzjtyf0gcml9a17plod0ypk6vngg9bt16qoo8ys0xcae8ig8k4xbbigbukoouxk09pnhcdh1t24ovlefavz9d2x30a4p205p5klztmr2uzvsj1v6o1ssslhjlx407539mbxj05z011btuy9ayohrqaw7c0jjuwksk5affi6fg03x7qvlpq0jtkhhkhje6mx4qcpp6w058siwwupnu6bq5767mv1zrjj8o3pq5d96zzux7ynes5n90mufkvpsnvj9xnt0ikjfzkyinycrnftlxr4u70g85wbg7jv03jprw1n4ze752us8t6uumvpg89ak1nzntnro87m7ici5pa35bfz1ry7d6ijvc0n5zf57v34ib14uixv1bu0b91sbs5ybcfwhc0llhel2e476arvtsv3jv6f4w1a9vf388qzp2pu5cax315a3qedwud4jpdijlqtuu2umrdm8uf9sgtig9bj6kdladr64yhgob1jaebopd4fmfebzu2mys0bzqij404wj54tj0q6w0ctspswy4k2k3hkbuesxi0zw2zevy9wlaqt3ft2xir232wu7nnpowkhythww39c1qo4539zq0hi8uirhukwnbkvavfv8u350kllgu7qfc0gnuhgp6zbvoek0u6q6ed4aow2qffr2i7nx7ysr9mtgwhbw7ocv1i1k4o56qovqviz04fjpozk65twk76lmx6pxn2kf6swf1dmt7jrjqdi8ovndjcye2xkassp4176ztit2s0clypidqd73aiccn1a7avq55c98ygtf5ifxcic40wz74ugf23696cu4p33hbh9uvdr59m3d7n79f5ct33g30741ra8x6n1ikdzp7kowdv10htu3cl4uk21a7ms7p3xrcbjpyg55f7rffi677ebhqbuy6r3x29nagschudyn6lh6gpbaufnkhf1qkb043cjl2u82t9211fhgvkuqub22h3t56',
                image: 'omzx4qlnuvsm039l7qwaxc6gy0xpq7gqsus57a9i26uzsmfm6g6jasco2c44k6t3tki2wc5lin0y76g2ut18fr2har8zgiyxkswsp3tp0jrtvjuuzugqtnkcs7ihcoohe6ctgp0s167p1x5nsf5t724ykgvbn96n48bgg29dxuehcyrk9ealo9262po2i1kplhe025z6qdkx5v81snmcqes6du8lh1l25932hq92jib82njcwjsdzx1r87i1fxfwtl0imhxwj7tctlhruo9cvmz2vqfc35wpsppdxh4giggxyjry2bhict4o4rmslif8vj4cvwkmmfx40tpx1d0lwcpwm7t7h93yeaoooua6cpb3xk5ojys8vxnvegxq26hyq3izxas5qlw68lpyuq2knh89wmhwf113xo7acph6ybq4ru1e6jhhiud5zcgekepkympkqm7lx8n9wyktbq5zn5vdpj44rtcu6fo99607rp79sy15u0zae9k9f5f0a1gzzryt02ua55wdtey7mbv90wl2f44mohsqmv3eo9zyy9sp6kp2rwq5ofkvqetbsd4bt58v12yutvur180e796gn53peh75a6yf894hyk3u3tqud45l7cqvypl17xrpuwtyfl3i6w3art7qir6tqknezit6jikz5ghewy7ovnmbgwsbjxyal9il32e2fdsnd31g9893zs4klcvxsr27q3r6eg14qp7d04q647w5qsplvs5tqvp0ow6rwkkb5zbl32ha5l459fqe4gqrj3ozrlk07pfhp06b2fzi8mi1e8dlgxyhwwg5r0k0rr3khubvtiur29mfjc14ba82cymduldksk3x53mcrze9vpbxcoaznbds3erufgxb2h34ecpvb7jsti4d0ks1lk947zn2ts9hb4150lwhqa9eh6emua2y51m5zramhvuozpu4f6y4rqlbn2ffp363i4b3rz00s2l3dgem2cx5aluuflwrwmtk1w1trk0tzk1c29ezx57pkbwk',
                sort: 501543,
                administrativeAreaLevel1: '1k4amhaozjp0egi3hhooxpcys4jryivr5bgfoxnnik4nxph9ms',
                administrativeAreaLevel2: 'ummgvtebpuxelizrzislbnbdbe7y5gczgwv55oxx9dn3vw6b8p',
                administrativeAreaLevel3: '67lpsky93nszqr2quc0igt26o10c5a98jomgokod01ro1xeajf',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 489.35,
                longitude: 88.23,
                zoom: 49,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                        id: '76a6570d-cc47-4f83-b9e8-50952d2fa515'
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
                        id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '799e0e20-59ae-41ed-9ade-3e33c425aeb7'));
    });

    test(`/REST:GET admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country/3793d663-df60-4dc9-ac48-065df0b97b6f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country/799e0e20-59ae-41ed-9ade-3e33c425aeb7')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '799e0e20-59ae-41ed-9ade-3e33c425aeb7'));
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
                id: '36a25169-86a6-4200-a8a2-85c077e4dfb8',
                commonId: 'ff8171b7-cbed-4f15-bca0-5cf85c3eec6d',
                langId: '46d56b70-9050-4923-a4b9-ee8b1f91d343',
                iso3166Alpha2: 'mt',
                iso3166Alpha3: '3v4',
                iso3166Numeric: 'xe2',
                customCode: '8bsassyeb2',
                prefix: '7ql70',
                name: 'zacqf8yokopdw4w3ump8ynxgk13u5qzwgeoovls4wiufl55be2tehc4gibjd7hbis0504hh3xlfao9ge8e2kkypv983bnx6fn2s7e5q13c5b7aap9b22wu1e4pp8bqcy993yi5fh9l8hqaqhmhjyczdxv7njltlpk8p8d0667pun62w5cgjfk444en78cf7u3crbd5ldolok4vkal2865y1k97cqkgvd0l4matcj266jikevkce1njsrj180jl7',
                slug: 'ck569plig4t1s3cog6uizp1sbsmayvv510f79elbgk5z2p2u6wfb34n8nz10tzrtkxt98k9twhzqi25boljw5c0gkovo1exp8wg1y1bnskix4wngtfdozripa0epzd6m4vswrufk4f4lfehdggf7zwd452n6odmo13m3te4s0hedhduxsqzrv4zfgzqldckzt165vj7do1a22j9ukojfj8t4f1phuwlwyj16hbplpajxou9owy7jep63y1zw1hmtqj3i7o7s1ygpwe95fbdj7clua74sbtj5xtkbo77un51dej1yxc8hv4fggagn2kb286tddzyi2z2p5vp3avvkownn1nulaa3zkcxr0vqixbfraks60qr7ukgqt8arzdre5y98cgqb2pxwvj4jqcp6x4aas2u95w4bwbunyhoz5fkbgz4nwi6h8sy5lysyi6yeq5tl0rgpjq64phngnkd2o3j9btks8z6prvfhqcenyd6uu55eeztv96iy6tvosmzw4lb8svtmydo2aggj14jp0mevt1wpso8h3t3lho0da1d9pzfthqwc0ofn0ur8c5zhphq1gzcsq1mx1hlgmxv0ilaex086z8byicg0cknidskgvwrrzfqrc7ckz6exrduvtku6d89oxsj9fuif9cyhs4r3mjy8tl9wmp0pzpbvtmyv7gyivuciemtdsbca6ljh7sbooiv4l6sswrhibtqm81qrzlpqwdgjj12pjabgirl22cr5k4jh097eyy86rhev3ysuc52eqtxxkohrw5pk52v3z7wf7cj6m85r0zl61pqwvuara1azeqtuze51j5n1x5s8aj9to6a2i5vx98t7c3h5vh4d6bk6q08e2860i3gxvyy4tucguu8955xou9wpf3ik6b82q2adnbl6ms9qm5h1x9dwtj30ahpjf0pmgpc1bnwseistdwgevccoh6jxko58bku2ikzp636yom74npxpunuwcgbt87r37bgr28ctmualchne9lu8sd1ksvrm',
                image: 'e6fjpceyx5guu3aux4qcvdewxdv2eupdd6qts2h7roi5gcf4y07jmtf2kzii84xl9e5nrcd4m55tw84o35v8ludtceb9u0tn1zbeohg1i3xqb04nn6601wtwz9ec9x2lm6s6s6v2mzwn8vtjpdi0lsaui74phaoauoo5ps8mlhmvckybn62cjgs91gsf372gpzrb0vq08lof60u4thq5dhi47kvmofzzmsl4afvvckwme59obph968bqookvegiwm5ki9gqw98nctg7lul2cfg84tdy1t91ht67v7x9tjru7hze1c9qqulzqxsq4bwxjqmctl5p4s33iymcflo2whok4d8f7mwfvtpqlmc08sm9ba10kpvdk0nvnmv9t4a30shw83t4tqlyzq9nroyylypi7kwnoct2maf4kziuz3b8me12k1gldhia1b9vvwtyl5t0gajetmdcab7ls3jm6mevkfgpugyh34ciugngpp70k58eb8myzbphopo3363ze937jmxbfesnbo540ro4iuojmzf346gy5uwc8adt738qu70ota5fxpp2j3icbtsnfyoublplle7pnx20qrr8mdm4g9j4kemus3nii65r374kjhv2be1362dtcr7yxe5wmxjl9wdz0fmty7lc22mhuvlvcqpyprhnl98z11aw0tmxjsgw3g820dldxxqpy8xlnyo80dfjgh68evqxtc2vsh593fxh0filj8inlc45mk4477kyywthacbfuz9r2q11jcn21yc4fv81nfwvi2jl3v4kmkrrj53l8u22o5u96g8ygivm7d4j8bh9krvwozrsvnq7foxy5bghdo8eg0p5x0r0ho8c902v9lkuazalzc9x9e1dz96zyk0rmt94fawei3g0youla7t40jwnjq7dsx62hynic3mvnclrydjplul2tnrr0ymxfx8jvk4k5wn54139tkt56zk7ekboxikkkazcflwll0pp1blpaitjlkwqxptwgtzvatqclpew71zuk',
                sort: 591498,
                administrativeAreaLevel1: 'o8029godh6tlak6b4127jdscv1pqif8jvzb6feqfvf868gsrrn',
                administrativeAreaLevel2: 'm12rikzldhnfs3t9gfu1euzjixdj8xocqf4u0tfhvfthz72kd5',
                administrativeAreaLevel3: 'uhkw0facrfj6z2cawiqc08hudq8svyvaih7xi89xxqxlkgoz1w',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 371.35,
                longitude: 468.59,
                zoom: 77,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                iso3166Alpha2: 'fz',
                iso3166Alpha3: 'm9u',
                iso3166Numeric: 'atc',
                customCode: 'qcgszdu1oy',
                prefix: 'r2pe1',
                name: 'qo2tf2gssegt4ok5xnzdlwhvtt4trfs9k8l9p82ame4wiavuatuw3biedgb460oqw22n9ivppcg0ufkatvsxbm0j7an5mfd7y46okc9g4s7wznizdz71apehgzsn6r9xt1hh76ha6lqxyxkdgvzim0nreqrcjpv3dluxwqu3uhn7zxyv3knvfzm0m2t0m8khl0pdj98xqa8sa2rlsp0lnegsot8nbbmqweedarlsm6r0zx27cfsk1yspiu8ka9o',
                slug: 'vpx9860m5u5p2ugguoaazl1511dkmxlyuj5ro4fmho6etksewv6xijutbm5qsf81q4l3v0nxntf2bs28d235ep3n124iyaygvlxvwn44ofmdw8ei8wnty2cw90fwv8qmfultx0c810apefi0u76ql51klni8egb20fq3enc57s16ye6kf1x4662bzpogb7w46i7exss7hvs2d1bt2y1nqdv2y6gukgw9lzjxryj8b2xhpv2i6zayyxyguuhbbheayeyxv23hywouwz3hx7gcdy8esn6x4zjd74dk14iv6q7zeav3rqqsx2e7pqupgjrlwypzsdwgjudf7dyz21xlcicw71o6ya6oubcq5kikbqm52t3qkm55ml0kisqvjuxr3oi3k0msovgfkxpkqkq87on35kss8axk5202nlvwqfbbfjhk4pee70gh5nexiqfl54chl7pqrpug29yqw26ztclsy7dfm5srkg6z7swbtezyuv2qzeen22b37a54d998edrnvgb5yhjjxgh5nzzoe5wt7yd25kpyrjqa0qk1r91vyr93kip54xop7aymw4tv7c3r5w9cn5rjbszcn71zrwbhj4how9swgvs0on87xgc4q3nut5sxvxavm23t011f3t45h69dr9bdkew931mi01w5ff8czu2pgxbzia8cdha3cu94oujx5qb5wix56hvh6xrd2xj5pmahm3k2evjlvdydab42wcp9zpbsow3qj6x6fb8s1mkelikexpvi8p6btkqdyopzfquf9gwczrh0mv202l210jy10yxslxcmcu82u6vp6fgua9qj4a1p0vnqg1pw9148u0j649nas7xvh2n779ufs7jeqfh77yaht038vihks3jqzt0niint9vfvq2y4hml4k4m5wymk65dmrfy1tozk4hu6byr0qcdkpgdg60tus7026refr55cneqv3xaphm83ivuk8w1uipwtqc6utgc5v2e31btn6w7dri6uva7k1wy7wdlvongluv8o',
                image: 'yafc9stn1swedjh0h0sfpu2yn3dzxkd49ibbu5zb1ys9pn0mre9fh9bp2dphocoduqd3gbhj9tvtet03wp0y9r7gk6khmntswpxqr978q3zvo0zjyt4vw1ztgoksze3d9sy9rpagl4wwliy11f2300hey5kajjzywrle2q14vvnx6ia835jgee1n1wmoc69s4vesto7m7udf57249rtsaa9gabnbptybfgtyk9jqpesbr00r79jctsbprvm3z5rl6qg38m70g1crxa4kqh12wdnzztefmk1vanzcu7sye5oqhq7e3tkreanb8psnq0oq1j4uxxzm4m5q4v58x7bysshywp8sg9oa2i2sejounp5hodck0ofcd2mvxbucashw7053mnqdt3n59u1vr5g926w0tr2ww2bwxqm35yefjgvzv7jwmiyxrphuswuoaqmrowtvjk8afduhwgc6b155u3m17nr1xy9fmass2j3sx8w897yo95zr4gzppzou532760sqxo7kt9cn6zpjxkwq2w2xkhvyll5d0y6ns1rw3a3pyf8eyn1cj1vdegjsvj58s1vi3mvcxh9548xd81jn0p59g32p21mmcmr6ytzl81fmou72rpvbk5fpt6z2tj6gyt5ai4l3dxsdyu38wh6o41i9vfithnmfdmr6mrexnfzhfxfeguicdceqnsemq441y804jz1l7to3f17246c876psw58uwc4cdln2gswutjlzwi66lzmhcrx8da6yx1agqbhp3aiqutx3h4gnfpxbfz39bwpmlp9vca4cdhh8qnz6w72uewsxke8b9djzkuilll8cr22cjwhcu7qzdg4rcpkjgtmtm016rtpcp5dhsluptj1one6ji2v8l03k1qtabv1tcnt4qxtelu9orndzma4wnz1v41wy1wvfwigglr9kl8mhae1i4fb7xsl8xcaejkku65ovt8d4kp08ljmebidxr3t9spozyabqyy7biktne12ou2yybl3zktb6aufi',
                sort: 977216,
                administrativeAreaLevel1: 'qbd0wij4w7dgi9f35x8h2np9rp65488u870qiugmsq0fm24ebq',
                administrativeAreaLevel2: 'gh1w25ujv6nj9a1tw16mbhxu22n4tkne0eo6untiw17vxiw4gc',
                administrativeAreaLevel3: 'pajndlnxgcfhql3miqey1k1i0cvz580usdd0kciovy2f9vtx7z',
                administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                latitude: 339.38,
                longitude: 470.14,
                zoom: 34,
                dataLang: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '799e0e20-59ae-41ed-9ade-3e33c425aeb7'));
    });

    test(`/REST:DELETE admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/afd21cc5-5bc9-4c1e-85e8-e57b300e3001')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/799e0e20-59ae-41ed-9ade-3e33c425aeb7')
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
                        id: 'ae0faa1d-053b-4cea-a2ff-f713d04a1ae9',
                        commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                        iso3166Alpha2: 'v0',
                        iso3166Alpha3: 'l86',
                        iso3166Numeric: 'hzy',
                        customCode: '8ixqlg826o',
                        prefix: '1bg8a',
                        name: 'r2rc6s4swlqgdkgk9ummevqjmavje7ck360roo3rezo71iwhdfy2pdfo61971p12pb471jt5gimfld6wzygustcwe5qzhi561fuatid9uzx3fmqiihethe1hoowx5hwg7eor2a4fie9n0rl1r1yxepnx4jx4yqio5q17a19dvvtrvlgfnve33nnvnhbd95s88zsxmxxrx1otmwwywvhl2p74yqivoxzf2owk9v85al3k12wp4e0um0y0ow4vzst',
                        slug: 'pql70cuc9vik9h2e0bpllb3p2i24pt3lnbtxycnhezq34e7dw8eucbhosv6tw8r07bi07ptn07v65hqc03yl7r7bsk2uxq3yij0z8nl8u16o464x6l8ewfb9x8qpyq314flahr9wmfz1dd4fgkl1hlkk5bpq4c2uscs1dnofdgdvx88998mfzs9ajl9rrm817tqyknevulxcwvrxqa3rcjpgo0gijod1sapz4jt3w10kbb40xehl2ejopkeog8u8at3uztmoc6mg9ihjezksb858adkrz8r7tqgp24hzuo1jl5zu791otmtat9lki73doyrop1dp5aaj8bs67h7y6xode9f25rajl3h7akygnijn7l3fm730x3recv5x41xogyce69egtpaf5ntor6yyamnorxva20jjjhecee957o1sril0p59jdrhxsf55u0m6cw1mxnt91bmbxvxz7ib5npu6pngs9t4m6bqhrrcs43tltrbstwfvqf133nsvy75xlt1ig09q6xqt89bimw3980yj5ldp7gwjgtqejfcy5i5mt0jw13t9jlcagsszbhf0gu3wz5f8eth7oxupeya7dwhf08t0bfch1lprw2x0eg9ny66dk3igzvmqyqxk4dhrdf1yilmo09i5o9h5fq2r11bg40h7jo844mqletatlse8732d9984hcoioegslvckkpmxrkw3lekvxfs85kxlo1sor5orbi0i1fjmun3wnjbgi2gob908rtb2p9txegj48kruuh6vmjez7rham3aoiixr35euyndwu5nva34rk14ikciiujtm84yool59qwqdodubzt2icbr9b072yr1xuu7tcegq92rh9mev46r1y40rh6z5zvpn31nddomfd9woteajwkvyqdgqpfmkbjrx8mpc0eb0hb9rlfmjhz8o1fizeztox6hf2rpue8jmu0ghoj11e4toqt3ze999clkbmdxax50u6phem86lqeihm09yw9wckwlxkyljb5d6aci4',
                        image: '4y84i1atae9rwf4oxo52271f9sn5lslnzfbao26d1khxbcut2grxbg43a9vsx436u1bszcwgpkizei30m16h565k3g8xporccl3txafz2am1aq2ykl9l0zoq9k53hm67f9ns5z8dsztdh38bumzvawvahbny1cy1mfxdu75whap4nmletbwhs72givhwruiuvu77hyivg3mib82dw8whd9ayuyaw2yd3vfmek9goxxle59ncmrqd2ashg3wv3ebjv2mdbqtirgwngi1arhvcopllgwbobevnkpze9c5yevbl08x18caoe1wzs8x72javm5023rrqbygormh89x2s53sdiaj8dt7ilpb9qnd3pj4qepzompx9ppo653x9fk8eyv1fmtv1mtsfbnyrzsuvm31m1ab6g6942qe9aacayua823tn4ngm73cryprhbfo4z6qo556pmlfyzqy2qxu1lu283f68t5polzm8idcm5ezvc3kpl6wzrejbh42ztnu4ukjm1se3psc6ew4vvhfgddywtg8zcpp241gwdj3jvxaxb4d9s3ldz6nkea5knmmqweettgfx2crcbwu14p9hav0ymrrwp5nxqu3ya1v5hiyf58hlkpufvfu4wqnwsfw85a3e2plypzfkz7ymz14ez8zf4f3w9nnuw1cd1k43h9rsd1nrhhc4epmw104l04aksdkyna16sfi170e8rm98d7uhbbgjaorwhxpqzz0p8mpfcd45nrdjwqpw4tc9h7mue9vxsvj6qstw631dpi22oxzzrvgtv4mp4vjcnbdn40pw834isxrn693qtevwbzjw37uqu8mt2vti5ftt5rfv8diz9yu02wmhds1poylku2npmrlkiy76pzfygtvajogwo6b8j770om237mseaxbnehk20z04dqfwossdfxt2y9s38ld0q9am95gxt5pxgsivude2j828ohpzaf3tzvxsny3u99at6pt6i4lgmildf30joxupivsa87or9lft9wwr',
                        sort: 495491,
                        administrativeAreaLevel1: '863jnhqnxuapyimlmjlf8rz033rlhcg4ithmmxd36t5m9ir09h',
                        administrativeAreaLevel2: 'pe3yemxy45jfaz97qx27d0xe50m09jprws4p2yosalu58wy1ts',
                        administrativeAreaLevel3: 'jtrlwszxrsiqkfeb29hphimq9vg6d8tn6ingmakdjsvnguuvob',
                        administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                        latitude: 792.73,
                        longitude: 906.35,
                        zoom: 76,
                        dataLang: { &quot;foo&quot; : &quot;bar&quot; },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateCountry).toHaveProperty('id', 'ae0faa1d-053b-4cea-a2ff-f713d04a1ae9');
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
                            id: 'b177ed55-f6e1-41a8-8ea4-2952b173a287'
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
                            id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountry.id).toStrictEqual('799e0e20-59ae-41ed-9ade-3e33c425aeb7');
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
                    id: '1e970f3e-225c-4ea5-9948-b78c1eaf72e9'
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
                    id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountryById.id).toStrictEqual('799e0e20-59ae-41ed-9ade-3e33c425aeb7');
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
                        id: 'bc153b21-a6a3-424c-8668-fca2bf685e31',
                        commonId: 'bb2de252-6465-4dcc-a15b-6837020676a5',
                        langId: '90aa817b-6504-41a5-ab2f-bab03f66f36f',
                        iso3166Alpha2: 'n6',
                        iso3166Alpha3: 'k4a',
                        iso3166Numeric: 'xej',
                        customCode: 'guhjl54mg3',
                        prefix: 'ct1bz',
                        name: '2qsw6h44f4zel4t82qrq9pndko1kv6figq841vpgi16p93u8tmp44k0kxzw3zwskl1wqk85qkih4l4ieu0lx6o8f8fwox4znsyzmrbsnj35qmht567n70bql0rvna31l9xfdkqtn0h4xk4oylz1a4ootu210jkljftidvmbookk96nq7qbpz2309xxpi9rl3np06bs8bofi8maf5pzi5t4bz8o6wwo3nt9v3oberx0sl1n4d2elw4klssm60ew9',
                        slug: 'b2099ymxbjqhbazw2ly4rtxphs3ug2f0t0rt16hc8uf8ka9m5rqev5wj8dln1fghtpwh7g6690lowgr8i02epyi78op22aqiawtq0z9bwkxkvi1fri2fmva3i8ullvn3leq54ykmzg69mkgpdp8a5rx8vd5tsf7zrplyenk3dvs6lct1kb3unaq2a0bt4ck5o5tgxyesh00n9bbc2beqmiipismbwgq7jdlzw2p7r4glb6c4uf1ex77it6jwj0b5fo7r5rkqofuindjugjjdbyez94graf2nedkfcr9rslwgsfh4rg9yy14hklmjr7agnk4tm4btv3z8gdvxpjd876mry6dxxk2dkg9wkuxqcfq681ey8slpn0unvvoobs4p08sm7w46q61f79f10pmj3cff7g41n5eax94j3nxuglpuh95h4u4jeoh36djdg6dswt5aepvtexa7oxx92x7nl4ihnji7bfpmk7n6xtw4ur85j7e7usicimeb39e10j8syfy1287gjdof3zy0uv5e4hqzrx4rn9xq3j1tincdqrb6t554gt108hnp4okegbgok43drj6izpf0qiqn7ke6qm1kptajdz28oq8pfzno8iri67kzhcwix1fjf3yocc8k6bpaao3mzqp5358mxzej4gsori2afvbzujoyrkwoiw24e0nyg18gskjho3sux92ocj5v72i6jbryrrpx201lywnq0vzvwwd129kiu6f0dnm22pbh1pdiyf2z075yn1tqav3mj258f58383lf4kruiplssqd38pqvuxfj69q1x1fkdjoqx0nsqrobz7b6neijwtt4fp4qcbr16nu8od7bqo8a58woy3cjsbwwu4vax9394ivkt0y0e84v6ckdilcetozjor5011bpjeh729e4ydbr5ma6jm49y4j31ppl25iiqaaout7txplcv29387fagoe3jvni6g8f41yzizmn7n1y4xwy360zqei5zsnwanb1rairweeilhafjecu8r25',
                        image: 'cq14wzipu18tapkmt6rzh9h22843ojkg9wvi89us9mh204yd2hj2yhmepk4z0e0ib7292b2eeksbli9dtzn24vup7l6qmaq9erv3ppqfkpt16ksdjl11vpxcbc2eq1a8558y6ums6s270cl0yeot685hbdp2qbhqune9rba16nsdglk00mm7q8dspb78nodt1xjh2kj1il8ftbhtyhknnmehj6z6aeq6rms6f02499quxifplxoyihqda6pnsvmdz4svhxuttx4wh0gh44763n9ix3cpx3ka73lv5fpyft5w38k742gwdyyt4svlf12c9y8lwz30gl33bprtza4jabszaq3lxc45z86gi87z8dd4sstsulb23lp28eqm8scyqm2cj6f1otfvj5zsia21n8hqcwa8fvf5ff4iohoeiht96tfv5nduf65009vuncz7m6mv6iqd2k0uhe2k9clgz25nixs3196nbwvieeezedilozntkkl7m0ngay6qgb77jzwi8wdxwebrn9rc1e85bvgjc31h95wkzrzj6fs40wzjoiz9hwsyq6qrb8dt78vmz8vceiq26976g1kodh6vfcx4hn2wgorrkmog6b9hpv39jaoej9xwd2iqad7r8oc7miz71rq72t1zf2jfvtmb51sf9cg2kozicwcctdb4ffkguj9mka6rjw5frgv0o5lxidao41ugnmhe8l8torpqttevcah896wim850tbpl9q7dwsme6z1e1ba6843sibpk1hy24eqgcwsqhkc6kz7nxag4zy4jt35svsvld6t9h2v1tvp17ibmm2qdvf6mepfgfcif74dc87gy8wc1rai5mnb34r6qa1vfmqty24jh5cnnpay83ypc01ko7txy8emmbm5drlqapf863z5zryv02sat1dhnstv7wnze6zt2y0e6a1iih3n1ne96fjqyf5q8bdp2qcputj619sppb996p6gqeiaqkwvoum70m8c2edbg4pqrdjqg2rn9a2pf5ost',
                        sort: 596672,
                        administrativeAreaLevel1: 'fgwvvxqrszba6mq55mazk43z3czvrhutkzyuslnyjkqj11ad1x',
                        administrativeAreaLevel2: '5476c85b57lovpvitu63ujduwac4w01nc4dyv712wav1qx452b',
                        administrativeAreaLevel3: 'qhyofih1tdgfnqsgy7ovgm82hejdwwnaebryaq8qbt2bjxke7c',
                        administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                        latitude: 463.90,
                        longitude: 670.02,
                        zoom: 53,
                        dataLang: { &quot;foo&quot; : &quot;bar&quot; },
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
                        id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7',
                        commonId: '7e22d48d-87bc-4323-85c8-c53d30bc9c35',
                        langId: '02bea3e0-9847-4d87-9107-ee4ec11b74ae',
                        iso3166Alpha2: 'r8',
                        iso3166Alpha3: 'rgu',
                        iso3166Numeric: '4qg',
                        customCode: 'ryt307s7d7',
                        prefix: 'pcsl6',
                        name: '68kyscr47xdmbe6xd6dti1vr8iz76pjruhkvbvpwjqf2cqqfarmbdcwumlfxpvp5clgpkcxe0zcsgi7lu75zgtt636fnduujc0567we0bc12qoe8ndxjmyy5s089mep4zrs70c22ek7pt307uqbdigxqi0hmpklezgiyviunvvrylqk6irpmt4w8bzr1vo9n6v421zfdyiymlxvao3z306xpvld5aj1d9gnt2eprz43tfyfiol4y4iobgh2343p',
                        slug: 'loovtnhfrh51xds4e9vg54s1ayzrk3daivvwu3orcg6x3bzrp0xhkdupvstxu6cvct14g70c58n5a0s73t6pzhz3057qqfodwjz28qten7tdpzyfhw174a65vsugiuvqq9qafc8a1c9wfieqm8m898ij6coykraz5ldoipoppae66lg4ed40wbkzwz3mmud7zji20cq3c6k1dkzbuyn977g94hp2c82y7w21yx9i7ryfzcey41efelje9zekbjb2c6jp11vb9vh1ti3c10bmdo1frvp0dc5k5mp5k1vdiavrob0sbeupqqnct0x3pewhhrwq5mb6yad5ly7n8ku2kjk7njnoajane85lwlzoxloviwswnho1zq8clh3vh8yj8vqbcyigb6p2w0r1kg4fr38av5rqoygr6z9xkd8bgcgewywtoiuvdiv80ll7uzppzqzrg8tdhd9hted663b1pu1hpr2yg6qrwvu0l5tjl404dg4cw7gh70lbhslq60td4yflu8u1kw06e1tuz2twli8kjr6tuppz30wqpf7w2mbe0zr0r39x0yatrx1uxrb6awif7drtp3mccdfitg5jir89fav3t51t5u93a6zwerm5elyevqult1nltxhm5xvf87f316r8jsf477brm1middd2psmwr4cxt5bpq40zppltiimya0mcnl8g5szcztahodiz943b1jn7704nfhr9k3vtmez09oaggjox9qytzugs7xv8dm8becqa34p7zbm029qn0bfrsl2dncu22cqs1o9gzgl0bu916xnzmfg28w2ub7n3c73upoc6icfmk8dq10y2i9t6wnobff30fqx7x0dawpuvh0ymivrbgxtbgv33tsh3yj80eb5lelq64qkewkf7u0pu8l6vrt5424npuwdecz7uvrmkt72c2g76w077zxmfq7dcjsbkvu8rdw9vjgrvltdhtugtxuy3vg2ucz7ff8rig4drl4qcxt8vlgc0quls0pp6pmqz1z8lowg5',
                        image: 'inws1gs8yf3y04smg51zy5r94cldvkkodxgqcccaf6pwgup17yyao96th1mibwn2wfn3zke2x9m6ebwfqe3pi4bip5ib01buk7odvq0g9pxnivpmiumohed7i82cqvxgnodrhehsv453f9m5dg87rlaj7n8xkoto14to72r3kun7nglcw8vbikrjkxp5mezmhpzf4ieyg7vhk65rjnmj77bsgyku1wvtbxgz5ggnu8r1uvistbel80ssvzpnwls9fj40u0a6pkk62bavnm3xaguxkeyujec5ee87fub0w5wid864ffcixhatkbugzqb0ksthdxxz4vc8y8czhwf94wx2avr8037gv8dowzi4q6jj25vj5fv43l115mrp7qjsxveon9wa5t5ck9pd2nwyw09i9b8wu4injnq2l5ra5oik2oenruftgs4bjaff4nueglockna50mizwvng9cbjlqjovhihpq8tjfdmqtqek1p47y04ae77mdc0tcsc1aoi0hoabtvvknh1qa69l4etiwelcktafmzu95tvy73siw74ukfglw4324quhj9in8waj2w69nymjffmsux3098im2ey5hj0nemx4qa80ozx65dha5nxj0ddsrtk42svnx461nr731kxvsawfet2albdza2ibw5sy64c6m74l880s1hajtxd82ksau0xpetu9ajcz3aiclxrn4ucnoq41nqr09ixb8c3e6k4r8dol4xzb5elfu871xbeoqmtbluskyyspzklnwznbzuxzm6lbyubxq7ne8odvb16lslbjdyluwz66gqym64d1iur0l0kyy7gxq6b71z0ko0vpmm1cx767fszfrk05poygkv9s2ofelkb8npzj2ws5qz5e21z4bsxxr0r2uyt5qv7gz2hegj94pmjvbezf4wt8banc1enudzsq1pvxw6i96dfhsq6wrx9o6y5hqd44b5tc9zbhuryqibg5kym858guva05g33na9wkiwz2r5kcs9oxoqrhq45',
                        sort: 987309,
                        administrativeAreaLevel1: 'bdn6l2rprqtmvb72ytlx23x9x871v1uazs0l17s35l0gla40fb',
                        administrativeAreaLevel2: 'm3d3l4hkfk91jor7twzizmplzorxvxjgape8rkkws2q739yhkn',
                        administrativeAreaLevel3: 'w70ju6xztbe3j7k3r8vu264f96e8niiejm4gmh96a8gc9c68oi',
                        administrativeAreas: { &quot;foo&quot; : &quot;bar&quot; },
                        latitude: 956.08,
                        longitude: 958.19,
                        zoom: 16,
                        dataLang: { &quot;foo&quot; : &quot;bar&quot; },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateCountry.id).toStrictEqual('799e0e20-59ae-41ed-9ade-3e33c425aeb7');
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
                    id: 'c6f8fee9-1946-4416-bd54-6bb692f5a96e'
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
                    id: '799e0e20-59ae-41ed-9ade-3e33c425aeb7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteCountryById.id).toStrictEqual('799e0e20-59ae-41ed-9ade-3e33c425aeb7');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});