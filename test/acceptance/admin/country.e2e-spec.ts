import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '@hades/admin/country/domain/country.repository';
import { MockCountryRepository } from '@hades/admin/country/infrastructure/mock/mock-country.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('country', () =>
{
    let app: INestApplication;
    let repository: MockCountryRepository;

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
                    })
                ]
            })
            .overrideProvider(ICountryRepository)
            .useClass(MockCountryRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockCountryRepository>module.get<ICountryRepository>(ICountryRepository);

        await app.init();
    });

    test(`/REST:POST admin/country - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: null,
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: '7j',
                iso3166Alpha3: 'ibq',
                iso3166Numeric: 'rih',
                customCode: '40r1j6h223',
                prefix: '14big',
                name: 'l9px1mw0zvu7y6lqnbfmn8f5var2p3m2nku8z4crw18uju560023nfckmbimbu5bpup44z7gimvwyr2rgoktgr64bc7s2f6huwrhsc73ylvtuzs1b5x1oc0h3z26t4fwug0ovrshkpeml7mwbwcpsdltir4gjnw1aq0gu2ddpkjrdziqp4b4ke96wbg81wyj7x7swa2vi9hn85wa2unrezgimisea2c1w5pa5z56vzzjwzg7lzntyrhaemw4dqj',
                slug: 'cd8p4t3260ayqee2c1twv0emqe02jfp9g683w6nofwj5pt5fogluusanx4vvfs9u41jaenlxb2wxjv9h60mdgv0qrezprg4vw83ahyzipv8byz8muu09sz1f1izk30tx9tehg7a9me01z5ebv6nr6k2kd5n7bt230byxikqzatzrg5ldv8ua4m7iehznk30p9rxcuczo81rfzc7vbbes2yk6m3wb58jamhd37tu495bjfa63wwppvtnm5n5idqens9i8kry3dm4263vc4wyigdacuunuorubvnlu4d8oq4gt1109ooudhei82hzslzz67uz6uypip2xflayxrtohxl27y7ovgyfcrij8fd9pz3oj2lhceeg7kzg26hculp67q4t2vk8nrhpfy8lrwost63q6xuuvvgpovnd1x7c8waa2lewlq038u3twbj2hwnsyzodfhigd34yit7u5yadlioaohxo5db07zv6ld4ztfwzv7gjlqv6dm57gk4myvepbmr4qbeanb6slysg86c3ihxi5yj2t3rzjfxz9k4pcdc87mmvqjqcffb5ftienlscrdsdqz60enly1wsihrhjg866t2k7sgmh1285kqadbcbabkjsfs6t9yqzxke2omtuu4mywyx2afq3fqieqlh3uiztsq255qutpqxmijdq1fygm9fwga2351bruailnu97wi6xknb3s15wz8dn2ez8438s7tquvixk48y57fdc4yjeg319z5lorfgc9wghzho1jd326c30qfvn1or3a8dl3jijrjhuvhsz7t45blkybqcs82s80pyrnw4ft2e3v5bvxa7ljcvjs4sqvfqe784zf54qwjp9r5duhc8abh93vdwx3eu6lfz2bx71o9w6rn63iwf38e2gpoyzkanc8yixgz6iz1tq9ubvymdd3714m1r73n0efzcnk0y2hennzz9xsskn7o1wl0hukzofvsk7bctxfpqcdrb434wa73w46tyd60rg2d4o192eedks6bqvz',
                image: '45fbhhq2ghu45bi0xwrsr37wlegcdm8ys9rpje6gg8ux6e8hptni3dd18ue0msoo67tyy5vn7deujfun2mdbdwugquyu4k6b4paqhq5fri9pjs1ooj564esjq6pbqwx8y4sb2qgsu5ljedjgkh6k6ec3aw5b7a6ovsm3av8bum3pchlqt01t6io3rqd0ap7zb0bv9m7e4g8iyqs7c3b9rwd5cu357yhv3xoelqfbdvq1z8db0hl9ykoctson4xmac8nalg272l67uoshq8zqvg13niel09848ru6wq2rwyv319qmiarjoi8eps9115q85900zoebp7fws80pdov6zg5u2pdwf7ncd9yfiny4te226evn1luxvu8bjuy0zxjbeqdeuuokho1v2p40ixo6rz0lraop8sgdpfz3ggws9ff1xqrxnik7p6ztg4ledoegwyphd5jonj7kjhzii8x6r1p89lplu5txurdfj19wh4ciev0w470gdyryyibxmc3af3uy0m6zgjmo71c98kfz9u80sb8o9zxti3ibc326c8pxzasxlsaig22rnip51mgiak3nyqu80rsy3ros98xsi8kvoecn4n5fv23w6vbwg19f54omoofcoh3jays2qir3gcep98c04o3hsoi4q4fbo040q1jnom2fde8k29jd1l2uc54gvll3msz9fkszw2e5pc760hk9k4q44ij8bix99z99ftdcvy9oa99bce7mxww69o5y8cnpujc4pqcv1nxv8zt2jtbc9v4a918fl3hi0gq2rdg5pk94ejljglho1qwvbdsvb1i7ojshhiil8o6ad4k49gcxayq15hcz8au3o5tk9663jcjkbo86d71y2uc1k4ruv91ikj6hlnirnivtz28acry91cuj5wae8zc2ybz1dz5osew46g66k79jfo9esffopihwhs4huo904oc9daq3zm66pbjjszcgbesmyku2tjqgor8uqvk236jfmp6i9tyduc4ap87kskql9ks1',
                sort: 979149,
                administrativeAreaLevel1: 'z3pwhtq96aghly05mdt9gnaaduhm2g5elfxqpbpue04h65bavg',
                administrativeAreaLevel2: '2g85ig4hpt6wu3fxg6ucgu5s5ww5dj64vmq5pwrkdfhszsxr58',
                administrativeAreaLevel3: 'xgp6ohu5kiptjh7xq4z2tur8ofzp51wcpyjw3x0ozu1xgh1mo1',
                administrativeAreas: { "foo" : "bar" },
                latitude: 415.11,
                longitude: 75.70,
                zoom: 28,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'rl',
                iso3166Alpha3: 'obf',
                iso3166Numeric: 'yqr',
                customCode: '2k8kpip641',
                prefix: 'wh148',
                name: 'n7ai9qlpn8eq8kglysjg8ego23fmm70t1sb2gwakyokd6rorpv0x0d7utu5wya13m1be6rhn223vxny1pjf228ek7lcfwrh0lmc5225r8g4odp7te047q9a31qkinubkqxafrjtyxtadwotcs195lfaeb8ev09vrfuc09io86opifhl5dvfhormkuxl1tr1thy17j162v856f4q9pyv7upsq0kv0pt54rilx9c34xvho2lq1xk5ltdvm09ovzdp',
                slug: 'y98knkth562z6qlm0iano4hiozruysi0ivdz3knu4va8f31cv1o4rochqouorjp5nanrtwm0dvhbmvhtodhs9t058qzncw8w37bl1zqjht6p3v9w5dtzbbfta64xslyn20j1f9s7fhz2nmwwzmcpiwv1vz9meczl3p4dj0nle4uhosq0bgc0vx71eoitc6mpkcrzreir8t3ss4tf7doqdak7wvt53b8iv5siwjp2fj39bu168xz5rldyx4qth5td9a4seohk8hfvesllh1r7i6c10oa05j905k7n79twlqjejrjazgfjefts0ewdktk8gkzjxa5rf3b5mz2io4sq2w52ejkhnnhjgyp7tf64t9oc8y2mrrrx1l2hwtg8yg6dh3nqvu30kc7d2sua2jxv5qknuzx0hv4itqiymttv1cuc0931zxc73gbm7dpj4ugppa92kc3j0xicnx7lggdb9seswmocfy9mjt1pkxw6w03c26mfasqtfsvdh94o6tea8j70z4kre9lc6mu20b2rhjx9kx4tsc95eev12mhjg0gtfetu90bk0j3xp4cfzupxe38qgiirz6r9uiayz573drwwq6odd3sxxfi7b8zpg6czrartu0cnwu6dm7kltslfxsxinb2jllggyq2wn782sltvf0plpdpbvsm3dj94gi67oaf3fmeijc0hvoivqjyg4ng6oi1dku6ic0f22jlxqqv8smse5d782oo3sj09xko6b9dnjw5qzxuejmc55q8gswfmu9cuaxc6162bh8tsxwmthtsvvsdsywvjep6ihzvbajyihqen4md52ulch6yzpr811t58fjgd1vpcojsfsrmmgz36r6711nqmuvhyslg61s0vfzssoh02gck0rf24sh0gbjq0jw4c97h60qclmtsthvc6lfcu4tqz584uty2qq3bdts0lp8buvzb19uckknv04c2ijxb5zsm1e07bvcwlfyr8303ki1z9w31i5m6qnc58t77c6qq6sd2v4vr6',
                image: 'aw9z1jnkz6aterny5yt3rujsbvln2u5oi8zgwkgb76to1xeurljfdqbzaim1o32ilzzm4lzv6lu5kkk1rh7imggyucbecemu55zb3lbvo5wrojc2fdigcd6zsbxvg7253931bxzaiuum47bgk3jqmj3ie0bp4tubqh928v2msl2qd41ybavx1n8ibynre6tfspxvw382htitrow0dx3nndtyn4siv22jkms0mbt2fswarck6bjth0kuowb2o7ylrf2x7ps0rhu1gtcxeisiuafoyynomd3a2bj04e824cteewl0s12wobp5qtbz9e7jiv7l2ot6d9bfgyfd143lih7vgin0aqgq16oulu5bsg5qm2v9zicqaf03nxy9667iuwlb76r8gh95nb9ypqe9ga4dkrariw5ic5273hgsdzf3ghaenvao3slc08trk5xkokc1se3qbjx2zp9d5pecjdb5ms64jdhhssseryavtrdduxg32ktuzu3dcfj8p62b9d83wfh0advn5ig3936t3jsjnhmh4975440hta9w87eylscd82lj0vn7dcxthqfl3mhhmgxw2lvfqufsq6jrjq0f7wbn1lq86m24k202od7qmj0aegcd6lxwmoarnd17w4l91h0vws7adavtuls8qnn1vsh97qoyu78hft71wv4lydfs8s6eidxhl329mxuosql1dgv26trcxudmn7xi0dv1h62tuycrg2pu55eqa4l9f1r2k3pjzwkztg37iqmcu4u6y7wopg6aza2ooirhn21qzy2n0odaurlge1ak78j6qwxx6ibsv0fbywtnqbexkszghzw610pez6kui3j6dvdzixmqfcde9yqhbd9p880sntbcneivtism5zy8cp2pf0d0hqgnoght8oq16zun7cr6ubl71js34ag6lcurhq166vcqeto0uyp0gqn6qpamg69su4ym10izqzsulb04xosxng57939us1h9n4jjivkldbdmc97b8nypehfnn1gth',
                sort: 480058,
                administrativeAreaLevel1: 'w6mvyl95va7i5ipe2aj0qqkdqt75t11zcyd5c7g4dt7owcqhw2',
                administrativeAreaLevel2: 'loicvugsxn38q8ut6fv16kfq7rmidida9rxjvdppkbziauh0qb',
                administrativeAreaLevel3: 'n3l52rngl7r8jxnnit84rg906hya47l1nqgmslp7yjt9elcldk',
                administrativeAreas: { "foo" : "bar" },
                latitude: 298.19,
                longitude: 274.05,
                zoom: 29,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: null,
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'gi',
                iso3166Alpha3: 'jg4',
                iso3166Numeric: 'ggd',
                customCode: '5x8ihd1bb9',
                prefix: '9nnu1',
                name: 'wm6i04v0ryzciy59dshmvtk186yrr320bo5fen6nl4hgo7ec5ykm664hstfralaj9y6uuy6xlm4vw4m3rsu5jxmu2r13qpinvzlgrchb3iy1upxt5sx0pvu8p5rwkgwc1i06mq7vicmw8gj7n191ds0e0w7cb4z0f75tiyd15vapx3ammojv8ysahw8a8s6hlgwhcdvqlfonprmi3q78zejs4sp3mnoc86b3u4tgn38pck3y7iix3s3xj81jhrj',
                slug: 'lhyqrgi0wnte5aj0p8wc49epig30clcyipbsap7h6v1w0xc1hsv8s9kcss3e0p8ek6t3hokuud8micuoo8kc4samsup2j082jqyds4ipu5prznyve22j6n5qh6mb8t00kdjbap3ua61hi2i4eoztkf7iqshnacmxm139cciqcu3l1ool976vypg6byftv3b07nbpy7d2ixvb62byobje8depma97edzcx0ehsjhbofma0v855voxyhhdxg0o1hpt7fi9mf7642fjunnq6ab3pd5g2t3siu5b9f19ps09vwy8mowpjbqkd7br01ria7xx1sgf1i3ty05empywrtzorn4i7og1isydyf2qwy3527idczsubhpt1hd8fic1q79lm0bd88t0giomc6nnosqndjlazd41l1nppgtiskqebw4ey8j3vb27yohalw0ha73gcjs63h0hiyh9entklfoex2qy00p0zlakfsq9mdu6fpbu3t7svjs1wbgjqef46ugsrmsr85sqeb7jwx3trswi5aekmdu0ukzs7se46aevv2zqd3xtre8j66c3f10232e3d05w2s0c8aoqcvc62veshzu80car8kcufpdtj5cffqdy98rl5icu7tbfcle3motvwljmj1t4l6pkckj0brxv7686s7sa0sp6oiipwdbp14q7mktwj6fvw7z2vkyf6crl5q1b7ksfwsr7zhb2ptphp7u4vnslh2p8f9jc9ct9jzvl4yrv1geu7hdwlxk1liznr4oa7m4h6obrnq5rtzlok2hus0us3sgoytaqgu0hztrbt7fcavqdtbq863alxmcgqz67pvnghe7uiip8ydbbdfrgnp4cqtw3vlb18k0jooenzy633lw8jckcyp0rwk4trrpqj88hdwxxrg77yiwcnamhpei7aeroji2os2fsneebeg9uxaa19qainwp5goufpqf5d9kh9cbeo0ccngjkzpa10d7dc848btzcvrsbgta62nqortuecx2ywjjmobpq',
                image: 'v9jtx3qsxequ5mthvdpdwy6yppoeymwmh8szzzd2nyurp6mc6tsdnce06tovemfbm2dnvni5wrubilc6tl2rrpp2r9vgb1dh1la4ch50zqt4otqk5vltju2ot0v6o9nzq9cw2xvphpof4j5zimg1xroqov9c6nctlv5ootbc9j7zta837srdprl2dvpz0lpqbwlok5xeonro3apk0gpu8eawawzdm6hf36slyl42xtbiw85ydflt0t8ncgz5fu6kenw6maqwrmqowdeo20tgu9o2kybl114mdooz2zlfl8dq59c14mmgtc468g7n3ecsbuu2klo1c1me5jinz2gsu8zrk2a829iepknfwokz18uvkgj0bbypvkpf1rzeu9ad3aegjudd7evop2yyqe36rdjbwi754pl21ni7c0ridmfx0j611xo6k5uqvjbp65y4ggkqoofpxk4xtrgsp77z59b6ts3kqax55iv9yle6fbvjyk58m6i71d9p5bo4sa15d0ym30b66ikpvg5gsawo37hb5ouq0ekobj3opkd0549zwsvx4z5hq9yqayc6r1ovbcz8654k4ezfogdpcqnitu8yvd83h9oeoimsbc9471sjce4jsbzkk4kozw42afwiuwkt9jk92rnvtioaqmn0ex5kifi1edqdaxte1nevqk9xbnx5mejda8fmpbty1yvenf5azlw4q5ymol0h6kdm1v0b12hr1m8jcfxxq68f9ufnlr7x0wtzn7w2tvqrarru06dox7wcxypmoeu5br0mgsy5ef2jk732bedct4nw4scohhq1lbiacs3b2n6aer39ndntujaigsa304zjecrb5yrqjzzzp2tt5x3mhpd6n47txipuocn0616ly8gir6vuz9gohbr4192dbta2f2qrc9ciwwi22qpgf0la1pd0b3z14ethdknpn3p71o7lh5qqxsznij63c9oosmyccjy0sgj72ygikgmf3w96zelrxdhcsxsbar19ubxnxga2n986',
                sort: 299815,
                administrativeAreaLevel1: 'x1j8sg5ywokxw5olq79mbema7fedvoysdk0do9lgw0q0lfv0an',
                administrativeAreaLevel2: 'u6r0m1jo3xvb79wdlprmzt9iwqi89nwbiy4txazi8tj68o73my',
                administrativeAreaLevel3: '50x96r8w12a8ryikgxnrpjmocffqmi8bxi451t06hbh26fcur4',
                administrativeAreas: { "foo" : "bar" },
                latitude: 249.78,
                longitude: 883.23,
                zoom: 19,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: '5k',
                iso3166Alpha3: 'ptj',
                iso3166Numeric: 'aix',
                customCode: 'rexn833cu7',
                prefix: 'w2fqw',
                name: '32rh5i3dyuh7tc4obtncnnm87wv1v50sbwt5f9c0cwzy3x9d43zc9x6mm1c5hs4bz36fi3pugkkam5uorjzp82owmq6oz7llt88p13wf9ry3rc419z9nb3bt9vue6en64qfsueqzcdq713jvrro9lo6w2httbe7ov5bg1ow4qzep28n4k79boo08tp1l63qx1m086op55kg3f8pe710ghagpyw5qd6dtihoep82tq177yb35nmmgugsez3ic3bj',
                slug: '2yegwedgz83v820ozm8l68a97xzpqgeywljz2h59nlb8j040z8l7nde24ve46muxxdoecklval1rko7eujn9moa8axfn43kv5f96wloj0yghu2h4mk5w0kteqfls9kvxqrfkpovew40vig0ewnszfjkealwfa889tv39zpnyxgrmc9si5y7tr09ohcwofa7i6or7napr118agxbsz61uh8ykg0sfy0i6vq5k18zq45btalzcpmdzbraqnokvqylpqvy6pll8mcudsbw3805vqvh3j21t2czyg3wdmi4mmu41jnbv7py2se1liga0v3odt13azm7q78aem9c1inpxace3piqwila8477wu88832tzkk01lbdz3y48h9629zc0mrea5rqudkapgevncwqyr9excl0dk8dhi94as4fewni6jpu4pa1sbqbokyflyhcowfhbb0quynhvvvxo9mwxgcto1ota3ab04pip36hvay84vmjgcu2mixvl70vxi26fqu25js2gpcm78mloma1i3ars4q0byarwhlp2km60y85c4165p4eub8ho8utylze6ijfnen8qdd1w3plqdfz1t0n61bx58q1q5in34xqm2ngj6kkn2yomntgu9x8333xqmyycxchww890cb2qynex0vf76xjlvo5403pm45bp8hvvnol5tz0zzzzysjku1rsqv3crdxjobyrz2ine71w32c7ymjv8tzunep0h6usnhscrqlxx7sa1rerlg4i19hv6cbozdptn903kg5kcj4hxzh62w48rsbgw1qno3uqzr1or023e3359xrz48cxyth5umdje9bwv4888b1r2wsi6wpoacb2282knhlmpqmy4e5yn73dq2k3p4zyd7bzkw3u7xvgt3f0l7rjwh3emwn5qpbg6zpm1t3hy8alhscv64drifm10j712h340cv7thv01mqnzbasjd2ocgkxi64k9nfessans0juxrw51yts7iij0v1qx90bfxn6tssilbck2',
                image: '2p5ie2wdu3h0fb8lnrhb2gtn4rk8y1tat6ytoq3t47ujzzqhu4bozr45magjvvtzpgdjgtwiqfkv3rp49mp8crased81844wso3tum0o8motp5wzla7ueb1wtqdwyxpynr5a6ct5pyhbt99704jxqya2ztfkie1klkr585vttp7qtel7uagfcq7xg52hljlei7b6aqhrt7j5wnjoqtkc8erkv39x38k03c9yqlzu26q0epbygegxyu70qla5o3kx6lt6crx009vkw0ab5z8mjlgowiexxhq46b0pi5hrexw8no4jx7nkw7mz64fy1u8mb4zoptm93kpx3yerkubc436i621y7lsn4fd9ozhqciimgrnk9n4vq10tvuwf1bmp5cdxlbgoo9oyp3debcscrafkd6mwci6d9yjffxhqej0rgpq8v31sfd1pg9n7qsrhk8hhfbh1xzkvm8jjdoz6nk7n8ndpf6k14pczuco6m2mh3jjm165mvm47aibf8s8kun1pfyvgwfmbh87ugfejw32aoaru9jj95yups9wrg0c2geqhi8cqh1rf1qgnq5y1i8d6nzl21qwhxf9yjdw4ox2uryi33wxml1axqjx372dzj8oz3evabxgolzh9spsbp9fmdrjl9739bbmck6zzfpxdf3n8kg3gpyh5811etnlf11e5ucasz40a1wmytowkpics43hyrwtxhvai9f754fla5vzhewfnfpa2jl0z7r0y0solmkdxkp7ax6is07ij9cdb12xonkoi8d8yvnne21xjhzud3ho2ba5jmok2x5mcwc3txkuu76b2v8oc07w9xu8nj0zci75h7tj45ehfkzxrjznr8bco7g2fum82x4l8x43ud6as8lu5s82g7h9hc4j0mrfutkm67qaqxual6fbskh7n2eu774j86nnlvcx9nhejn8s47x4476o1riidghl1wskkms5do6h7w1q6l0pn7h0wx9ttbdy5mkvi4i66ajlkzls9r4t0ngugo5s0',
                sort: 352604,
                administrativeAreaLevel1: 'x02h8577426xymw7hogc0e9mxdsrdg3bfm1ts5nuwq71or563g',
                administrativeAreaLevel2: '2yxr9bkpc5zl3rhbghhcdz8rbee028kxovehb0kmulfofn9yb9',
                administrativeAreaLevel3: 'o6mzqmwin52bd2b8pwtrd7qc5kycrhnucdvdsbfpj1l9xgnfpp',
                administrativeAreas: { "foo" : "bar" },
                latitude: 822.60,
                longitude: 900.58,
                zoom: 34,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: null,
                iso3166Alpha2: '7h',
                iso3166Alpha3: '0wy',
                iso3166Numeric: 'am7',
                customCode: 'fikfd5ieql',
                prefix: 'sxnec',
                name: 'b4xlwdv2vmjabofs99w0xla92fx3md7v7qbhzpwf70u5wakd88ywfx121jccooof1rebdupc9alfsld1se8rdis1n4co271wif73k8blnz80we4o7hdcanm19a8x4ivoprfwftmmcynsmze4fhv9iofg94kv746g6xstouim4n5t27b4lh4vgx8yf4nyfrmiae5c3uv9wphq9ojsof3k43k24g0qtkcrn5lmey3tv2s9cpkk4lbyg9jgz9hrzth',
                slug: 'oplsfokzbvzjn754dybba3u67qfgtqrzi96er2w7v2e547e225ucc9x88j634psk6yf1jarpi2yq27c3j1rx4jopmz4k3ifqy6vzhtq4wf3eojyx3yzatnhicnwaentvoo4fx4nn0sqa7ukgn8dv0w1sayw0t9onyqf5tfaxjgw5yurdiceiit7h7m9y37ire19y0hjb8vk96u3471sh5c27rw5413str3js349k97rt9z7rq3lxedfwxy8tg695dglywl2bnlqaexnicx4h45sec6vh8h8rhlkrbr67jy31tuynqkn8hsj00lsk3y2ls4il6ajrfxhnf3nj58sb5fnovdn388clg1f9zyt8sjgi1g6bfarc5w5g85pv8je5v6n5bs89ozm8teg2l4jybb7ktch2ttvvc7prdfgf8ygy371v58n8xj9lazfmgmnszpciy581jr7hkhwtghmtsizzldcku150rj34veg586ymq30ea84rmac2ry3xw6o20c0bzdve9cpc2esjwfyb94f47rlj4wga8mqx5m9vmxy1u29i480f808wkgb7je7ihc8d16plq0v0s111qgujzzsdo4z9y8po226oirq9g0g1b0qye8zi53gkgrcreleq3mkenjptx53xrhowy7a1a2i8r7mhrofrco4gp95dbfq65xsm4ru9u9179nvev26u2zb7esxh4rvsed8ckyit6nu0dxtd6w18wzuj8kkyzjcdn1kofodiejcfvq9c6nnk5drp7ekh1ddg62lnupbexfb6ka7sy85rabnmn6s3qh3c69wdsjsc42qil89hp9mkmjt3m78p2jb88084au2ey1xtpuoyk5cdc0eq4svs708aw0h72m5ds5ln89q53lvvrlhc2n46lk73l53t52s5tizttmghmtf73s87f92tja4n9p9v1505tx189ewut2pbqtedd8impsoeape1tf4fo5cuetawi1tpnszbo1qmjtkmrukv0e2916ma0vjcamtu',
                image: '9oh03kycr1os347oc7ww6llrd7ckdkenlvh2hpq33ndu6bpy271dr97j5qh7yrf5a38i4rgmtj14cv0e7kmz3ce7egthfk7kg4m3fsog3kzb56y9gqad640oam20yfioixvuefpxudq8vzg35wt1xqso7gptkbv0npncnfrlud168fd5idsk6w6tkzdzag81oam71jtrtyn6vsmbblksj7w8694plod0h34r2v4oh37sufkmeljs60apmiyfnic48u492jw1xc0rwmnbuyvf1lkmetpl4lhl1ccguuayrgqhenjdwvsswh3xbvxf1yksanh7ien2w8lx4n039kgp76wo5va41zhk9ygmtlf9efnj66pi1vvgd647571t0zgauq3q1knusjihq477h0hsh611zpmb5xi59qa7u7bjzjq4m4e4552dgm1ksehn3tcspq58bqvt9s45pyruql2u2pp54ztiva35i7q00z75fd0depfnsieqo8milwppu3b12700irekm9kig37aoogrb1kezzds7vx6u8gaf5evy3fs6lzgtxmmgcheigfpekttlmwbppi588b2eyw2owztrichn59bf73gk4vm6ljhuoul2vsepqtv1z6pdh1b9hgfep3ydg93mq7nxuvci3mz49uwauzn6t5qqit22s1bd8iv9xkfwrjzll7fjhoyi7j7gybcpnnve70bqcv1k2bm7pywmuu5xz6ihidpb43cc6q2cnwxeub0soqoyc4me8vqgyaja8bpoh19vlb1onx4rlqizrfqx4457k8lfutz4rr165fmk492dzuaqbdxhy7dt2dm9r92gzd6xnhphdamf0b433aa8wwu0ug3mg11xdvo8p58qv18oa1mri42bkdb2f0s9dk9g02umb5phd02arw5p1jsyvwmt6gc9inr1il5caj536ynq1boarfnzl3gnwjftea1dwx2c0gvtphd78ukp31sncc9mv15uzkp1zm5z5c5f999vn3swwbgyurw',
                sort: 403598,
                administrativeAreaLevel1: 'z94welaxrpv2sw9umc3ykp4f2wku16q647qesvn8fi0cfzodti',
                administrativeAreaLevel2: 'b169i3k45gm7mnmchwq05rrtgipa4i0lmb5il4ul7hgoz9duxm',
                administrativeAreaLevel3: '1f7cgydz0tt5zemzrkgoxoyzdywf33khyxn46zwfgx0a6csxlb',
                administrativeAreas: { "foo" : "bar" },
                latitude: 234.24,
                longitude: 448.43,
                zoom: 74,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                
                iso3166Alpha2: '0q',
                iso3166Alpha3: 'cug',
                iso3166Numeric: 'ti9',
                customCode: 'xoikigp4m7',
                prefix: 'b0uj8',
                name: 'pkt31zd52ku250fbxp5rru25thpc1mxxox55xxprtjcy1ieuij15yoy4cbebi9d4q7ih9i13cc48marftts4lhz0c06wh2k2s058xliv4gjmkovjslj2691vd56wodkyajt5yevzizuy0d5sbziy6e6nmycxo0oi2bl7ygzcoafh2pavrg3xo5emg55dmvizm9esllqz5yh2e8hyg946jhz7d964pxicdi34b0et5nz5wz2tie68mog14ahlh0o',
                slug: '3iks4txrx936cxu1dkqdaatizeqy5ytz4heppslozyo4u73n635wla6crmby4ydqus5xciarwaxxmf0mwg4rz6hrjrhnt1aj5wm0lqi46ccr1qbogtwg6681qsa1hvukzdxaeb63knwi0lh1tquzdf0bvfbxa7dd5bc8n48yf4fhsjb68nwpa4v9dr0ilci1irn0b5vfuar24cy43mv9ngmexr95a8j7qxwxjs9mn5audp8awsm3tnvkctjobdn2ve8p9i7vd29ik26h8r1tvkltl4yassnc89faz7lz81vry1errfko9y5xozl9lvnp1fmy4z1n9lckl9kyvraxgwieyvd8gib6hgwsducrfirf02g3tlq5ksuhrhdw7nhxf2m0mbdj5sq5h7sr5j02i17a865v8rrjpzcpt3gzcgg07axp6gofxs0mauq20f0l716wqvrek5aw3ht2racyd837i61c8bxeb609h5nan3pi9a3uq4o8u24zevqb0vxntdjkjsmvwyg3u00oyykjieqyuhuidrz541xyjptutuakxpznruq8msl874gs5ioxa5ya4z3z89ixokofdwrluunymg7h3ucem1puvyz85k1g0svof81xv75opz6jmdfrz7xnzw88dv722arkbu2jhdse6e5qr5hrunxb43spm8xhfrzwjk0065rinbhwvoos840btckppu7dqzjo16t43aqkcxan3jf2js8h2qaq5pyop75k5wcf5809xv2q1j92bo232s6q6v2wr64rue067y97jptlahsve8fsuov6yncfx0psxo6rrods3asd8xg7e2aee55kylms3y6ghdnvioyi7o4weu4k0ste7u6i2ktrg7lov0z5e2gbcktfmqf3gje3vay84bgjw99zi9zvqigs0d5aocg9eq2znkqrq8aokpcnehe8xstsw736k7c0g0tdlh8o34zsfbvdkzgt9ypt0wavnsvfm2jzya8822vfq8vrbwei2k73tv2dtd5i',
                image: '7po8auv5uk3cx6yara1r94nevrfhrrc9ed34z8oeg6xkhbmpjji8a4l2ykdicfo3h0ix9rdm1ub5tnwzn8dys9s5x8sft9990fam2qk1rz4do3v9ndtcb80zazv49duwd04gn5wltp364btwzd9hkmb5ve6gut4u0uo3mae3rw4qqymkeov6i0hbz9shyvsrfg4fwa9wih1ldkorbt1kjfebq3e2vmdjo3nil8apaxphyrmf6rki0d46vaqlehrd2bt4c5sb2kt11tbjnj65kiiwfzyvfjlwv0vazqdaezjtk5wr1s3hysc1dlud53lnc8s35wjwe5dofjfi41a53f2dueko0fhla1q0nhknsjyc2p94u3dxeqtr7h3awzle0rpznj103creopypop5vi9mj52l3f8a2vot7smywzo774ir9zlso9oogt16tfr673mplygnuxo78xfodky3b1qrthbwx8yuzupvhrwwca6vzny3nipmuwqq2u94s28k2r4o8i1dkjf03uczp9mvas402it6gimfetvs8fbmujyndnq3u9h37tm2buunawma7td60y204v1gup6wv81yiu71jfus81o3r6icq3lmytk3wfrjn541grep08s5177eash8w62bi3jx0l18aup9i0fkm571i05gktirp3z9b1v733jrxb52i9eu12qho4dxi642lsgozxscurffx5nhe7pvvajzhoik6qhjadjmb0bk2bi30tlw80t7j8y9rnpypoe3mfy8jjwfbxc22tsztao073h3zc90m238qih4w6o0jmq17v43e3sr4o3cb042yacz89vdtijdkmr2kpngdmy2kco082o41j8uy6jw8mly01rozxildtk0pfqsrgvth7x7qj5a89z7kwmmw45x5eyv1mafb3sdrcg5iykkzoq9gbdirbmyes2pbx9b7ouyp35av4mbp7ve2uub51whpqtl90c4ke98xvycvzxjus8twaokl38bd6189j0n0ru1h',
                sort: 735173,
                administrativeAreaLevel1: 'duhwxf5xf32soty34wuxyihgxm3s03rbvr4bjuz4vobllwxtc5',
                administrativeAreaLevel2: '3calsqish9umt90xxzs2y6km9rct4e24wd1to5hq9q9dj73r9u',
                administrativeAreaLevel3: '9sn7c471o3ibhdu1kpvjveng61u287i9piedqd5wfvq9xaul1e',
                administrativeAreas: { "foo" : "bar" },
                latitude: 408.57,
                longitude: 133.21,
                zoom: 32,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: null,
                iso3166Alpha3: '6z3',
                iso3166Numeric: 'u0p',
                customCode: 'mp2wlxbn5d',
                prefix: 'qaq90',
                name: 'pf2ln44fr6x58wk4yoh1ztmfu4n4qunbg0rqf1mennoqorr84mnlnhco7ya9x9c70pg5od2mny02peptxitqpp77nvqju8qpgoj9ak9ojbgb7vht6vsf4kcj8yts7c8megcqsfyp6teagywpxwlpfbimzksi217qcbdswfmtbsodv28j7gul1dldpdei4nqhmsainlixkj5tv0utjs9iw16x1bg8j2t0w2287dchrpuwoqz2p6c79fxqqb5b2pl',
                slug: 'hif9z1f4f0nthmfnnm5tqgk030kvev7hcsi8ejcu5cpl5x040yp8ma59z8h9vmr9d9g8msfygams5ph45233zg4pfqhzc2vbmuvqhmgtvn7i3yta2o419ruiaoa2tbh4egxz9wr6ob8v3yi92pm5zhjhkk621hmk9x608zfb8qzy6o0yzmqwd0rkae352r7qzu1snqujd9gm23eaz1sth80v4r901i8for7x98uz62oohohv69wxp3wm1mrcxtvzw3pdg4y6bq11m3x2d0t0yr3nx8hqt05x8mxime7zjhl2j1mcae4ovzzchfu9vki20gwmeq9vbf2vjkwyo8mzcd8e50rz7ugv3photsrwagobmf6cbohhyp7f7fm17wds9r3o7t0r8hxqtmr2fsqwxjckwxncecc2prho5t3wahsxr6u50cjjkfujhp970bhd9zxg7u1asnl0ewwsj2k8s9bxuw5w8mgthhggku49xjjt8rb4ntsjkmgzhgi7ieh7dda31b5eb2sme6kck8af7zl5e13xth86a8tpzz1rxiu7das6ag3cm5cg3keehdhkfe52d1s4jo0o6qb1qlgqhe9mdke2ejev6bjo02u70v0y69qdrmnl170ycyroouej84lokqc32l67dmxna68stz5i2euerbr6usaie5j272a3869zv4csf8qy0o93sz52ceuz5sn4ylh74qcnwhtd3ymi82pcf1bqvagu5vi1bf1etth7mixhyn2dfyua3g8w45t4ag5wu0av8s0ptgum8ipjeentq9jnwuigu6dsnvieji7ym1f7c752ew7it4s7xrosy1iwmfaf4smxxjzrbtjsu2pu20cm0v6rztzqozi8s74ayrtvgw7fq4l76jr5upp28v6tgaypq94sfrtohg4sd6bdpn0x471b1gast26ciyywni5o9gz19bisawv47adctc6bk9s5heoo3bsl9q7xlm0crnubcwn14kbz9ykmpkv0qvzs70demyk3h4kx',
                image: 'xskakgd35wyzs9tdexw8yh1m0y75jedzjb335qsi7g7n5aof4la8hvkydpjhuk96v01s6o7wafrsz764xae0ufrwefg9k1dekc8tmrgpm19u9uzsxtd6x3umuecnji0pmy855crqmhe360zcosdoat7q8os4rd0o6zzluk1a9vh0jd2jdm6pg42fb8l6bboq57l60nrfydbymj4zkj9z3hiujdhust7zpmzg7vifckdiypo56jdppfxsct0zkup6x0l5qmudj2g0mc99ongfia0jj7gsa00nl2hf0y2cmdzkf3yqcsz0hq60kn96j9p5yazq8i7ha4dq8swuyk3321jjbe44we7g1f9lye06igcpsx76s7nm54n0tcs1zpiwxy5szyezw0z590sv6xrsbnon122i8wno8alrxusx5tyd0w5i50kmcnrc22s7vsxglq0ha6nguc5fotsndbn18c0d3e19pbfifhg4k7nmjckuh6lia1m8quy0xnhlkt19m88q5sy90qwg8l20x12n2cnrwx0j7ohrftururvkeldhpqilp238k02dhfegnaq4ob2obt697srjbtnir56qlvf21eec26omb6x0ezbz9njjvm30ywjqwvjl85xds6sxlzb0fjjc1bkc79l436wm5i83cj2zrsgfe8bsiidwhocbunzzbbedke4zfzt74k4t8xbod1gvmxx7iyqinp4zirvnospozwu1lr6fr5o8nz1ypyn73lcy8c2idxk1hx91ys3fjhyi7llxgmb5240vdrx7x15kcz7hl5rkdpp4lkfbgsa1w57l4wp23jkz0zqzzvfbyhviqs67ypospbamacq16153xn5zeuxvau3y58ach2mc7sexpbh3bt1ff5j2wfni3y5t2q6eh9fhvhjxy0et8fywfjc7ajkth6z9r7aziwphwqt19d9nv5yp1j7hnhkujebxdx03ttqv3mt5xstyws2nd8hapl4t53p3btarks1eo2lh4x6tfv4z30w7',
                sort: 747416,
                administrativeAreaLevel1: 'y4w5h3kg5cg1hnegmt5dkolawifsfqy4h78jb82tmpzpjgk43x',
                administrativeAreaLevel2: '22kj83gwjoaikcth0ob4dd1tcic8w8t8959sxp4lwznye7ltfg',
                administrativeAreaLevel3: 'vhml4unjrdiixdktd7nn565x7i0p1sqwextlcoyxlhizeaiefi',
                administrativeAreas: { "foo" : "bar" },
                latitude: 697.76,
                longitude: 33.66,
                zoom: 64,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                
                iso3166Alpha3: '8dq',
                iso3166Numeric: 'fcp',
                customCode: 'fijcsslz0v',
                prefix: 'c2gij',
                name: 'gduy188rdvkcy4h4uteb5g4htlkeonijhq3w3buoh9ounohbpiwgb5pz8cnumkh6m7dbbpaiygdlda31y5sy5jo3awmnge8fp04ylh2dla1bfw4952c437ra5od4189i9kq04wwjblf4cnhdnnv4k4quh51un1ky3y0vopc6lwe8hved5qspz2eaqlv2ysh5kjliaqjupkvlabf504jmfwogimlhxjwzlooi47zoj7l3srrfmzttfrgoi0dre8s',
                slug: 'flqmbko425k8ckv5066gkb45ddtnqtwgwpyaii2sg8tg6j418wyxdi5b5lc4lh6clown6d1rddmb5kkr1uudhsnxhtjgzmgw82pj0zhjpirxftbl44ddl29pv3y6heel053obpyh8t3jl1u5bqg36adovxbrt9dim6cwl602o0ux6phth5bhg9p7a4bcd6s8rjumjry6n5ecudy6tumitpz6mzharypyihb5edoklfbg097m0t5etkbucl6xbs89spw8ztx18lpv6nhd8posnr9fkvlbd07yilep09gxhkveyeqem2gylhak4zyv4qbvr54smdz2std8k7ptdhettm3f6iw03pl4s5b5s6738heh8abqvv1remajbr2fmcb0dlzuo0x6b3i1wk3pd4ddiiiegy73d4fgqbyn6u5gx9pe2vgth691h6i65s7sfksftcc5kio1h5aeaovj8rt04ebz8000261zscmxwlta1am0bfpbqs4ch9tsrhx2joyikxg6wnxzlkymj0ead8ycd9e6qmtwdg1uft4rtho7x5bjyo0swqeeut9vltf4kmr5m52q8iocob8oygbshjodns5s32ymtsjrbcpf93u5nnhsbx8wpxgvrslrvjoodld0nmwcf4e12oj8ge1owx6akcu3os20d2f81n5a7not2xdso2r58r9lrklld8l8v112ufo8flt8vimwi8zd4jfsuhkbpthv42xy5zq8r58ne9dh1a6r6y92vex29repdhd6mpne2h23a6fj3g1j6j2tvs6ox0utcicph23lsdd08iq8j3ibkw8ps2xjubd1vbg9svlqy90qdusq5np4ix032ooq65d06m3y1xbftfx62ipdim7bwon0win4dxxj6cz7n9hxyoja91x01s7vivag6tvp9rpu0meqtnr0zp925dv5y2h64t7roa5bxw9uptmva1enwp7n0de0tjiadgyl8hdra23erz8eziqdg35tbbgqyef8yvh7gptr02hdrihr',
                image: '6p6flvlhit5xp73zsofo8otmuh6wquljf7rlhwqxcq4erg40jn46hh0tib0vmnovfqrin257tbjmx1i7c5qzat9gr70bn4q2rtjnljrsbsummgofib17558aelxb9fn977h6xgggmzxtxnicpzlowpo8uj72jcvd64qqy8bo6402a5y105p318t6jlbpm71ut2qywamt6hkb2yuvnwxes0zoivnwpo2beefw0z379j1uzbtccy1k34jnqvbcyg9hxgn7qs3d5gnl2jykjtce9fuqwvr8wgfqnp1bds5rvk6cmymq609oxy69f1wn7fzbiqoq57pevdf375x8re1myntalxda24a8scz3p1sqwz73de9a7scg8h8iqv9ecu5ue51oeamslz1nfqi841o120v3xfofsqvppz2br6abkleh686pi6vt2zil3l7llzd3ho2o9vcwvn9ppv10qzquz31610svr17fu4s7e9vppyqbtmz6c49i2oz86907el81o2eezjx01jw8s6mnzd7xt83i6qo1say7hsnqynisl3xwow9yh8loft03u943uq1ljpq29qjv86zul600hfs4imu7rqiqh3vf1l8e1y1jzf1jeuprmedv6ttvdpbwbwqdo5vr4ao0n88vywbi1yih5yclp0gqp3xyd8xoskudlnwsgyd8awrqqjwtk94m74ch80wb9zlgpelqfnleufru92qe5rs9jslmvnzne5wzrmvog3avqiomyh6uhoqz1mywh4pr1yey9eecq4z0ayd7f9ivuqoz63r39et7rjieofhqd2wm02wvlf7igkafhd3emm3p0tw6q3h0mo39guzanigebucr5o2vj6ugpr8heumdafjiqpgw3wpz7kf3mgc7oa9rulma6gea7uji9xhcq9i7bi8r2b7aewvtjtc687m4fezjfqnsxh3lysjjnkj0a3dy7f07q5al9utvcwpkih63hm19w3l5r52cjj2sfzvwyff8de5gbomu1ann24pf',
                sort: 488840,
                administrativeAreaLevel1: 'tsueflez0q4y7lqgmh5cwgv4khprgovm9yloh7lm9w1p9valfy',
                administrativeAreaLevel2: '2f5i91l66sv9gqp4yxw4at1dndcge0ncnq06zrks06o00cx2vs',
                administrativeAreaLevel3: 'xq4zadt2maqaiud5q1ll5fk481sbak76wvjio9ukx3zm719ept',
                administrativeAreas: { "foo" : "bar" },
                latitude: 77.05,
                longitude: 175.88,
                zoom: 47,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'dg',
                iso3166Alpha3: null,
                iso3166Numeric: 'q2s',
                customCode: '7cvrmnanzk',
                prefix: 'sfx35',
                name: 'm5ame5o3vhooiaaly16p63g51uwxw8nnttyyuvkd4c7q8etnrmphvjhfmu868x8fd9tihy8geeaxybku3retz91p4aeqhgeh4lni2eyqemqpve23rtee8voxjypi20zv361jnbuo0gsyf6ktjdnzimb71hpqq94s5kl2c12windysoyv6yj68rrkixgf8kq90sgxcqbqy47j5xeft6y0aun39197uau694epb9cxzy958fhvc0r8zwhzr6zjmik',
                slug: 'nvbugvvjpyh44gaany4n1hkzrvusltr86uddsdquzkkkky4v4pcuf6d4rw7zfg16qomyp8w1vl9t5tlxo4erbx5ha1gtyilv80n1c5kwpmc8qnme1sx5phgy5hb275tgbj7dzkzimodb2svi8qkvay45ph4tpq5xewfcpejhi2xpcvwhue8bmttlji5k3y6mok5swrsjzl43tti0uq3xfqctravds5eq730t56uijpwi27i248idgfyb2f8z1ugb9bo30gdsrektc7424kzjd6e4sw8wl6oysxwk2tc8w7iv5bvdt22p9100ypv7m6b86aujk9wfaysukywezoj1qdeqhypup0bgs8m11mom51e7qeqiz1mqbw0dwdzw534hitnjmwlcz8nbt1jpzdbk8ubxf4bhko2oj9q3eoix8e9tgdjc0a5uqvm44a61y8q6x00rgpl96brg1beihcm9eou8785mfr3kvkcc946haw3ppi4kp0zclkusbzs5a5mzyl2oty22gmeboygz6evsaqkdhk8zwd09ww3a09thlm21nu3vkn2o9v5yiemj0sgkixkr5whkgfsdwooytxgo3541so106sqco1ir1wc9ea5tvqte0rhajtcwo8h58v37du9175gbu4mf6m914l75cqqzt6si7jqamzuplacpotro6plgq5hhvkdpju70z8bemnx1ddm1rnlcrlsaw11o88g15kcs09v4scqocra5i22d76hfdrq6ku6wpew6a1ikp7x4ox5ubk16ay9cwpkdghqilbrkjfhkp22zb6tagenyb3rn7vr9v6250obmiri2d8oo1mkh4ulspw1dg9j9hcss37cenawn6hb1datefu1qxk920i84jy7xoginrvcpvohnepiq19x4ah62slivsy3wfn4czndcnbo9b26eb1f5a80f7fqmicm3foyinp7x4gm00nrle5dppknpi1njzcuxtt5k1l50o702bhwr1es1bhc0dochu9o9zyi18bhi',
                image: 'ierq38wqkncqsffovgm4gir8o58zmcup1120j199yx44hiquq2xic3sorwfjxp2jrp4x0bmnzrjoo4jsge9xbn11fpbf9fnfaoyyxshpc26uripaz837jbzm0e547jq8c76kul4k8yy44doqqrbntm6ndnyept55dpyw53756vlldbmr5n5hq2uwj3pssjsw06g8q6ybmmn9eoy03kvnhmeimtsybyefzc518eryifjxpu8hr7yjj9u6qibdstav7pfqi84gx142n9p9ggiembkc4hutwfpvfo3e71mmn9t0iftgstyu8uwhxqasej1k4le9xwm8o2bw2s7rzjqi2qre6zp88ru5nqp8xtp4oxgm3jhxdrc6yorjnthcqhnle2zr06g5sj7y4zq2jhip7etpo446c3b0kxvk72e0znjbmdaavbefrt1edogzoxpjxvhqiguh4fp7kbholwc8ibjezwowp0z09nj9pf0u4p2no28mzbw98wsb3j0547t0t007byfhu5m9yp1ovsshykqflx4r3tlmmrurakeh7abv54zp78b6dq554p03leeufdj4hy29jn1zf8bx96iuq6kwgyqj6b425s8gl710vb16jaszvflpq5yolm0xafkomftbmum6zjj9x4m3cmkkb4g7l91aagsd104rn3uwyyeevkv6vnp4vbwcyjdtphv8wvso13bxzld54dmfrmv2eqw0goeh2icim4cvxhj1vlyat2rno7o29z8j4z28as0ytonruenlnk8lnnnt1w16wfxhhfw8ga4b7bze1p10pazxpgasb7r7exj66fqeuxtyr4uguwccqsqhuqf90msztthtpz9dlsbv9esxccza1hlc3w7am2t7njy7y2vd5y3vymhyeny35fuagmrgwg9xbcmsgr14grgn3tld9ab0unhlvsmdbv0zi4i64ktrhjgoef2a3wzuvy91ixgp9q27ws4a5bgig1s6mjegk1vu66xar7vr7j14jmjp1eto37le',
                sort: 138570,
                administrativeAreaLevel1: 'lfq2t3tlm4mlcrnysruw0mr289dgqdtlerkm1dx341cc7049du',
                administrativeAreaLevel2: 'ldpoivb1rn2sgfpprmsxwtpvgcz1pg7fqha5g97n7snqpuxcgx',
                administrativeAreaLevel3: 'v1yzpz1br7865c4ufud6a2ti5udi8ohv806otito5zsuvaitva',
                administrativeAreas: { "foo" : "bar" },
                latitude: 929.75,
                longitude: 704.61,
                zoom: 29,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'xh',
                
                iso3166Numeric: 'zaj',
                customCode: 'a2iw66tyhq',
                prefix: 'gck4e',
                name: 'm3s6ah5zm61r3fs1dp9mvdu2grd2adl4xa38iwdf3jaub57ng265m6i4ymja7jyjbem1ld6qtiqgbz32sjetgqmoyqyz43s0e0fyns4qc9jvsdicqmxad7xvrxgoahtyl6tv6x73ak6ar05ucpaiv0dpdv5d6xa9am93zh26abidt25v38to78yi5t8tr96u0z3ovqsedfn3e5dzpwguxxft6gfzdqgc4twapasnx7njj51bjgfr0rnhvhlx8ji',
                slug: 'o66orezz7yklaqyikq4fds9lfw0qyajnhq7784blft1qu7m8n3yf0cpegr3a68uy5jxr2fvprnmtv3vtoo9niuenq0aki8p5baq5evte4lr8ntsklvh2df6401wc3qrtgtudrku2kzwmjr27cict9so2iwnbanpic87jfdf5xe02j5n3g4g6md9f2iadjskdd6wjlyqbfuxvzwmmfhonbumr82wrge985g3pcdxt8mggh27bicfqexii6xfznxqb91hg0nkffdtoez9b080km7hcxbubl8yjto0c9dxhajj5xj3bdinl8m7xyaf14zxxxwddimz533aiio15euvvbqf2tr63ujllt1gsfe36t8n13n7cynsf7rglipz2dfnw7nfgt96j666a699bwvl3vf2kucz5zmya7pa68wsb9wlzptmmnclssr18ro606k00q99213jv34aer6v0f9htk5s762jdq1cj432mkjw8h6iks0qfeyeurfyq5owt3r3lthse5ev4tmzvgizqexstynnsa0p4gxxgkj51skmt5l9ij7xnm9lxdh7cnf8mn4i6wva3wuvf89iixq69i6rquvzhf48dy4pedtd5qam4b019dsb3ft2ragw8cbp8i1gr2u753es29071b3pikfa8p5f2cd5w248vxc5vgqvf7fv1kfoaivo2bq5iakovn4r552eb9leblo91p48ngnrp25txmmw0vzgp2un41fkdnlyaial5e123a8voeap6nzumzxqq3zgc5p7r9splgc6rb7hfu0vk8cd356rmljm471dzcece049ow1j1xrjz5cv11d5enswnc7g6ycf2z97h3s21lmaan9rhz9rihm8hlwij3dxos87hs3rl3nchl53w8323p81dw0p18i3uswngbcfktd9n3z7uypw64wz1khv8liowoovcphppoqpdemt9ltba4cam3s36ndusfb7vxqff0vrd1jz0nzlziu9z9qrhmjotqwxcf44y6eaere62',
                image: '7plgmv7vv8i9dv2pic1esgfzis8vwiof9efnot0zlpmlf1dj7hdb3v3738473uu7yy1gf2gsmx1ml2n4i2lv4v73mue3wgv0ssal1k1begzlqz8pbfpu8349nai95jm1fqzcpzivojuepgkqzr6z4lkyzk29b903hdozs33kxhlf561apu8v0831wfuqf1moekjeopda407d4eeuazvxno353pwp2tpslsl5vn79z40pqfo31r3rgajmx2ubgwk39csv7t3gy1peddxrq1u6ggs2kklveonlkvg883ujrlbc0zvxuvq11ug2r09onka3yrzzaksjfc5rdho4yx1y44p7i2rbwszsmth2qgd4p3feodf3kl9iduoil7le5l9kghhjgmtb4a66na2yuoutmlivjvncf36qwym9rvtv7frdg7b6kt7fse4quttmeg8qk9ouxxem1krcyc0noyey36h17o92sd2n6nxg8rfxzn3ftinaug01j6r40ll8rnoxj3u1r3792pmiifhaawqjetem48gsy1uinfpjceafroxzo3twbqdggzajzhdounc8tt0zbkolzt1glr407j6pe6439zk29mucb8mhb73jpcylxoj6fizaem0v1wx5jpoyb18ipvershfivg3exahc05mhjbofvrh251p4au1z2gudkwv5erb3on364u9avu0vy2wby5yheypno2oz8mcsclpaw8gupk43zm9u6ekfbgwxbnm3pu6g5g37j078fx5arl3egdruva7qt8syvv6s1pcrs5qwv187b2tohubbcqvmxitccz1bjww82z22xkrdalodqcx8uwuxj8xe4plf60b4ppuc7yi72wum7r2j5f6gb4x2fizzvb1us02tnbt16tivaiypeuzhzr12w0rv5so8ffy125q9s0yb00nz24dsp024g0qy4veprrn7u4bwh8idck1c47t8hg4txx9gd3gmhw5jhxcazoi8kjehk424ahmn38btik4w75c2i6s1',
                sort: 111138,
                administrativeAreaLevel1: '51b804quha40af05u70nqfg0eegbnh6mwl79pc8ahcymj9gsno',
                administrativeAreaLevel2: 'd5kdnt7779kgzbk8e60ggvwg5vi07cz9ztz405ontjssr9loq5',
                administrativeAreaLevel3: 'jtrjfzd1eiijrsdq8w63176iv86pga5icyrnsbxi94dezq5ytc',
                administrativeAreas: { "foo" : "bar" },
                latitude: 765.96,
                longitude: 576.10,
                zoom: 42,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'wb',
                iso3166Alpha3: 'drc',
                iso3166Numeric: null,
                customCode: 'e0o9mes588',
                prefix: 'sakpi',
                name: 'yde60tptnj2t2e397b20f0z8gebsijs96ia3lnj5ibuuo2qxnaoknogqwulpxyukrxa549lurvfu1xmbblz7wf8ykid6fg1imnhob23zfzt5sgyvu93sqkwnh5cr451t3a4os2x1eqk06gs1i96b931pk7bige4bhvk4j8zxg8y15s436rx23uuop61l5xauy070b6vv8ak98of9q3smgoxasr1qp5ur9hp8ffhnju2tnwfiuuyvjtm1j0n9sxt',
                slug: 'iv1ojy8nnenbtr92w2df31p1p38uazdynnpqrutak0werncm6ko1viv9k78za3epibfkoazuvmy7y1fwtqhjputsklzieowbfjr04trq2qi9n15xule0pczb8sswh4tf3d7fhptb657w9aqfgh3ft2rab6mnu96n7vqhfzd1b7d4tw7xyi8im1vd8r0p6n1qc9qgemu6aomhp8250fn715o2ln1x4bwzmruqev567uv8cy6kvw3zbyit916wmmusie51cs1kt7i0l6vq5zn8pzdr5rx30mhvs9liqiw0utyppt5ljbo3enkqfftvowmmluj74ad39c4nhu2gfs9ov1tooju6ygvudpn6dt4akwsvp4e9rpv3a7cc2i4edxdl6bxbgjek6m5ae5ybytc9lbtne61lr583a891u3oqnahzc4hvxzmmdd8b5o09cbl5qo4dnv4jiyd5lyt3p5ii0nfbtb4uunz2wzfsggs2jrdoy19dk8r7worsxiq8nbtsokgt2fjer290gv624kbym6xi4ea1uhdzpgae5czce6puqrztfg4sdus2ya3ybuwgqunpwwt9lcc9fa4qqxtwt6jleui4eq32g8zhlhms0xgmbtc9vu1b30thgigxtqs5xk0dpk3tmglpqs1eivl5cqcn6ezo3t51ex9j4x25w1bi3jcyrahzln0bz3ysls5cacnr0s8nfztsxhc30ayg1gx0r5d6s1a93auwrlfr1kjhaw0igm4mnzv5epumtycrxmg8gm29y40uius464198bqj3nzihmpmugpdpbeaqh8ve9odbtktaqthrk2f8octdyyoz7eej265wrjceuweezbxjxgipw5e75kr3qu98w2pn2qitjkhj2yruztegavfpxkffrprlyz8nh9dvqwrac50godjrrsm6kahke0q4x00s3sk4glr3nktq930zgxda8gtsmi69ktyw4lux2xjp7m3rux44vokh9zfowvm38ngrgis05z3d6on1tqi69d5',
                image: 'yoytv0neyp7ipbu5jqwt3tj1wafqfl7la80fgd05eldzdr43cltmy7jtfe7txpix4g7btaxuro3ek83g5jkg3m948p2qn0dt5d6f361vjxx1e4ee8fc4txs3r7jn3jw3fo4cwunj1m79hvkptc6f9ojxjgk0tp7o3xzqhdguaowx07e2sl7k4uxxm6ft5k5kfv1hp0rgbkxutnudq3la0ai3rjyfe9e7j7lybtyc3t06s5w2nuc0c7z8ddzbnc1eexpu55wid1v3a4fsmqf6okqjkpkndc66ngnhozn62urwnqbsrb5zpd6crdmc318rfguoy5flo5gwakseqvz341dbbo8p7jjiovxxngv6gild7du2pe1d84ixwhzp1ma612gzp1pg1w72geacrzvwefakr3khsj5f4ra4dpikgt719aosvumclm9r62a2fvacbk85jyls8070ee29r996kuhokd240s2ndsqmexyqeueiole7wqt376ikjs536c82ar8ij29kvuaelyfnf8edre8a4encu7871w5riht7skmsx7myma3fz4d2ntgtqx8cymm1ipv7hrehnrpgj7ha5x20kve8ghxhixws11v12wsh2bl32z56fna44b2xta2lpgvg75xs8tazhunvmqxr903obx7zafnvzwj4w2y2zljan03t7rxatr2rugrj8yo6oprrvxreriq55btrid54ouo3xdk6nt9clt1rekfr8ws4jergfqaf7y9ozfwx2tmzxdu1s95k31ks1js7uhfxbbelu34c8w87b8cgod5zkpduiseim15v07utxcr3hwj2bcj6r8rm2qj1os8ru376oo1p69tmoahvevfnvrmu6ngotz7or768ztdny6pqrmh05o1r136d9dcaxdau8c0plvxt9siqtoaj6vpxtkm8h9kvwvs4ufxkucpwb6cyvqm8ze0jvvfaoki6lxovwvj1q40tdow5bz1u9h8lkjorhb64406dzdnfmu8ya43k857e',
                sort: 759635,
                administrativeAreaLevel1: 'w7xbqokqtrcbo0klvsy9tctw9f8xdbenad8omxbo4hw2e8p5sw',
                administrativeAreaLevel2: 'gn412hksl7j0dx6cavv2squ1aj3nvrh1ewtmmwkxi950p2i8tw',
                administrativeAreaLevel3: 'xz4ycvjwhnptwttw1vlzo35ae9qtxkaimf78p6htko9n45exog',
                administrativeAreas: { "foo" : "bar" },
                latitude: 207.49,
                longitude: 32.02,
                zoom: 63,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'cw',
                iso3166Alpha3: 'da6',
                
                customCode: '2j1ahew6k2',
                prefix: 'f66la',
                name: 'vrwe59pld188e0t9toocc2iixwf3ocz6n2jbg1zrl0j36h956eikf930qszf3vvwbshof179jb75i7zowx7wi98golf6tkdfko26osnje1am2lt27p0th1wo14uropabepcgwxw0o5atj7z58jbu7uzkiz8hm8qtm98v4b4cahvt4hi8pzeznvellx3u99p0s7qcg1spvf0hnb7b6ruargojp5h6nkkcz6t0e9yj3zaoamh1367sa1y9i9fqghk',
                slug: 'hzll5vh77zjfyag1tvfbbt0t6u4jhabj50j7ueoj3eulknkoo1hevha0lay1oy20lffzff35yaootxpet7yto8w7qmk3rbjzf925vu3hywwvc1t1siruzftrjwyw50b6hs7g6dilhvdmhn6pbvyo1d9x5i8gqhmomduxn9jrc5sp2b2axqj0e439ubxq5d0vrw78vfdemdvbe36074r1i68ynp9a1t2g6m0bwy4pkmodw1qbhm5zcib5337g9qy8259u6coxj043k759f7m6owjhj0uhv5y5zq8sl5ddxn7ayrnn2imby5uikolj419pcpvosrxectbadljm6iuslgl4952u6fin7mfyd7l38obxxkqm7jlc9ely2mxegdio4myeo07qga290b8uwi7g7h83e5ggqye41nl3xkxxme2t0phj4r08pjr9pdcv2ie6wff55wr5a62n7qryp0ojzgi6euso26fixlcvh3vnlbt1dvkjlewx8xl95lhr7zbvwtwuvc0zo6b4div23i21ibw68qg0vk34gb7z4b5qfg6dregdmi21ssc0sqkm52zvcls3zctkq7jlj4aawpvxlgv8qcoi7wjwoz5j9y3vrabt7k6n1d12tkdtm7d7lf7rlia9ao6wcmu6hc3ybviodf08orcla6xd6v0xl8rg484je2tsx3rrq8vfw3s7sq2cxd47w2c43awa6t8h7ra0cqqkdsxjbnva04848fdmvgvd56fndyw75ylra91dz36uxyusqqm81pipejgdimubhoftwpa0rexyc5sg8iavwxpvaawkcmdhfa0f0x04r1z23arsx2cw3lmnkhzmy832ovjz8hfxf4zmqhc2y183im0vp5249bq6p44zyap1t9ntc7y2qb84m3xr4ryek552p8ti84qkcg6auc7qfphs7irbgangx4bff5h06p76gpuwvhkrkpv19mqsl7dfikw1p5zzcumsztv6yllk0bnopwbclk9qf5zyk5vr1vbje546',
                image: 'qt1kl907xzfi5x0aq9wg3fnl33uz7x0i56ulgfuofv4ya7a1aeok5evx9fva0vjwquorv3602eh6isrejn794pgppoj9annb7hbive4ubmyf2yyualejb39k9du70yumgc7orzhygucbybkbra7vauk9oni4sodjh9bz88ljbgzojhodc5fv8edi3sod7f6r5aj4f21mazdzu07svbrm2t8hqz514u7db0uclsqloi81fy53mpeovw0qipgdd936tc38hczjvyfg48vreomrvka0n8wl25zx2ew0swqfa1mm30zmlnxgk1fxermbvazh8dijfuw9xdescsisglrvii4rbvsaqjx8t52da2myqjbk0790gwbb2lhqlf1x8x9sosdw0gq1ikpvwtg5kw0926d5xxl2lxcl877mgni8k6tzhhh3b81pitg9wphrs29t893927tgrchbdetyoe0l6gb7zwzjmxj4mcw3pr997racwo32w644dvgmu8as8zs47gul0rofr3e52wrypexgb3htfm4kraqn9be3db6arrlgafjvtaqr6jwfaulk0gqqpzmpnxjp9az8lsl2ch5zus921kmyp2fle8u0t3zhyi04i8c2jfyhv67woy27exlwduj48pdkdrg14filkcg02u554bislscwb5zt23ael1wtscwkosgwr9ooks0gbz5f8we64ycamjsf0ncbdg2rh9a8e2x5jenaadlro46a55l3w2qq81g14ep4e6f51jkyqkh08t2w7ofrz0sert11085m2z605pf2g3q8tyq9oatl5oaxtmgfmg5b3jygsxus60c1zcnvbycw3d6c4tkwcd3zyk922knj67gisk0wqhzacglq6h7hdocq9fx3j6bs14l4ckxfkwoola9fmp8jceh01wb7j49puvycy6b4r32t9y5vn2a6me7w2h1txygmio1f5b35ug47z87nuhlwluyj206kx3oturlwmtl6ssbbdyv0c8qcx07dyj92vdv0',
                sort: 629564,
                administrativeAreaLevel1: 'wmuxsx1pxcjmsy5uigiggrrvhr5fgybgejy3ttcpb4qphb8s4e',
                administrativeAreaLevel2: 'm147fe2s2v201kqx1nl8ml3k5kdeeuiv6kz4yq4evqi6jc6ff8',
                administrativeAreaLevel3: 'vha85ttm6bs5i6fmpxk0xuoc3e2ch5s8siqg1s61evllu3rqu0',
                administrativeAreas: { "foo" : "bar" },
                latitude: 22.48,
                longitude: 842.92,
                zoom: 30,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: '8t',
                iso3166Alpha3: '1pf',
                iso3166Numeric: '6jc',
                customCode: 'azb7ctegvg',
                prefix: 'qvily',
                name: null,
                slug: 'shz9s4g5qe21ek4ayrnnn25zxldju4arduo27kdn9be6lf9d6tt3d3fe00a321yw3wn1tkhp3uimualty3tkt24lvsne9013b4gexxdhtpnltzfftjjp09b2nrjcff6nyes4s6jl15arxd35t0w9dyerc3s30jx2vowdsho2a5raqwcyp9b2vstbjixpoqr1z9gnyf2mqh24zub8vwm8gxo0pscjx504vvdy7v43vmjzrhaapveetts8oio8jbrvjk607x5hjywiia9x0tepsg9a1z1gncg6w1l72xum7mbu9r36684whlkzekbuez899tufy6y0fcmb6k0l09vadopaykqpk17l88bguwwo7v4cqc9m4g2zzt6i34u55tl2odsms2exs8rt322pcpn1m8w4zk3w2ihaaahvdijaveus8779en0ix5gtomlpotsub8o8rv4e7c57pskhr9hhnii42anb3wuaevbicbfbpu5pyr9a7i6tsfti8o3l92p4kg5bvg2eud7pmzx00zorb7rgd894d7uxdpaltzw1jqmj8m6jh9dpd33k9w0vzzdyyf22r3fenw95q9ifqyk1i2jwro2764u52e0un4zardpvycsnf22okbsbitt9v0fr539r1pnn3rybpy6d8bam1spxzon3lpo27cdq4n4tjkw03p07ksg0cffbnuabpgusa4ctie1ujx7yvg22slfc9kutykox6uujw7fsn06l2govwkutnnw99de1ns8hmki7vhab3q3jcfb5ago7b3swmm4i0nqe5o0agvwes7yuu4xxlj7wvrxowkca2pnclpe1n2eneuhkkhhm2943no7nuc44yoj4xzowxadx3gmfxqz67z7xnryb9pxyln2gys6exypp1o0qylhplxbsz65kj9je6bpvt43cig962kl5ul28bwt89ejyfwfar2f62k3w4eaji3unut1wxbdfps2e6zh78410984rpdjy2nkn2jgwclposj9rji5mioepmnfh',
                image: 'dve8109kvdqts7ujvbuq4hos8yotnjhg4w1d3ay72ti1jr8q1yoy611bevq32gyra8grjxqh2bg85jxc1azig1x0z9ipr1rnoaoazpej4sbyif6e1y48o7kmpkrl31wlk1j8yyihsgt9thz4195ttuc2zuzpxqhvacd0rhh60bair2qmfnnmiqnh2muj0rj64nzetcua4ccsrg86i3aov6p3goc8zvkm8esx9bdzax0kikibychs4em632hkib56g6kel9pjpge3tox9tzxupthlcel5i4m752ynvkio85msj182f12nc2y0y3eu6tnnek7jx93p367v9gk5j4mxuzzqcc7i0q09888z75zlowai5wbyqoxcml3vjm6oiv3ptoad7t2sffb9sj5uyp8r89lmepydpyazx0pwf1upz18m0ofif04g9wkr0i1ifjivc7odpffjcjbqhj8eqfkfqou2pgqmrdwq0gspfnpku2hql18lg0fu4uhinqvm83lmmmbv688ikza981phaucrms4lug4nea4u5uvwzpfrrxglfd8fw7uqy5hnn94jh8aq4xud5iztnqte47e0gf54gfbri27ctvhhzf2uxdgz7nlz3etyf2ym75gk9qzyig25s3w45enioz8o6r65bz22qku37zdkw0q13pg7l9w5ofgn6juqomoxn641303x2se93g9pe5byhp9ljqzffzkd1tfd21edk9kp0zbgyia4pqkzbdk3upfqxqfoacx93w3nb0uwop7kazywydtkwbjrujcchtu1q6h2xvm2mcl7jadkoue1opojuf99tth50d8jyqxuxe7kriteup35qk3g9wcqu0ahn2id3003r5ykvp76psql7rykujq0866zwuv216vlwqjck7syxgqydubvatu9pp5pkdzksnhsk5xp5pp2t4p55u3s1bfmll4mczhdcvjxup12106l88s0iorceprk7oqhf4s4xbwotlmxr4q6vwq1ldmxg8vwqt09un6t',
                sort: 804826,
                administrativeAreaLevel1: 'wo3ccrs88ie1nm1hostkqppd52cf68088qijwz2k6szeva3p0k',
                administrativeAreaLevel2: 'k516t3aczy3310b4gux37xolds88ewl5ttkyhx8kg395cakwgl',
                administrativeAreaLevel3: '7krs3xr499oj6tpwnyuu6qb2dhy82ly9ev6mq69z31q2qm6nkc',
                administrativeAreas: { "foo" : "bar" },
                latitude: 787.71,
                longitude: 256.53,
                zoom: 15,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'it',
                iso3166Alpha3: '3v8',
                iso3166Numeric: 'b94',
                customCode: 'hjq8dq9a54',
                prefix: 'o34rd',
                
                slug: '16g3amwrv439y8x77r7zxv8xcqzyv3h8s1emu6fuqb28aoqha8lg26nzvjib1e80z1rsmj3519phgunyyir045m947k47f666ulyigy9ssxdktuslk65c8d6xq8eoey746urvt1exksx1hfyuxeo49jiv74q7jj9dox8bwjcjnsmaxt5yu0mw23fwjbdmpfhn2vfqineq7dvqnlfjv00fdbb6dl2ebdxgvi5wkyrpp3495nrq0nv5ybon5gfu1gismk2rih2ycg48hpghfbue5pxqg9yv1hbbcp1ke5e146gdiw1zwb4crbhncavg2ht7typ9iyz9qm0jkx2df2v4uxrb747bd268q1ap0350ozlnh700z6vhafbzw97zw81wxjarws2pbgts5oxpfxfctb3s2agm1vkk0ljng4y5oqv85zkfi339g67graef0ou3egk9zge2hx7egt7ruq7ilxjoyjk3rbwfo5w09o6kcy0y30kll5yv3maibo90tyu1afqhqpt1vwggjgjbzsd7fwsczjtu5u0o8euu8w33j1ls5rdyoag8gmqu5wgbsotajt1f7ez2puu20yussmqb29y0l304cywr0bbn9zkwlrjdh2hed33wh49bl6e5e25sky7x8kt1147i7efcdipctb7mfoa17z73tnm75r0myxbf4lb09u1l62uim4m2t6pk4w4icml6si0x9238swluxo86l38kkek0fyt3jf9bx353ovcnpl5m3nio0s1sp62hnssqnv2motv89rfa198o6w8bsd1wwws7erft5wi73tqswieoj3qxv28zqwf9rf937srewvovfo818gvfpp5fbzxp7t1474mnug8h3ysreei0ll01csm9mk8ijeez9cyrfdctiagtour5vq2pbellzz9ye3t5b37h8era9s5zx88jcfwofaw85g53nzzjyxtwmo6jxrw0al1nykmao5m1500unf8nzoi8gc23n0x9ykb2mgr0gg3w2ngv0c2yrgj',
                image: 'lf0r9hpmk3gzqoo1ukoc5rqt3zq50iwkoyehim1nulkdm0qnyn3u6h59dwx4ps2qps3gym1x56eru3vt8phfd6lxwebt3e9xt1gl29hpx1an3h4ylrl2sngex6foh315imlhtsqxw4mpiniwyqboyxng5yfuwym1ga61u6itrit7lcws1u03jc64bgj94kyx527ginyodng9bzqzk7jvrqq214ig8m5t3m15ldu9ksmewe8nmj4q6j11xafog2jmu97pn6ms9sendn111be52zg313w6tz27kp5mk70itoqvt9j2v1knnmbvuos1ypw2400tpeshw12awf0dh1gz9pyba1ye2l6wfahgo9btiz8zet16i4lbbgzbxi3o36q9qe9p33cwu70k2z4mmbq95kyy8907zzh4bg0840jzsjyrti5zb8wn9wrs7q890ts2r64zawnlz4ailhpv40ifiy7vrkjlgo3ztkr3xylnj7mmase6lh6mhwjd6yaiot7hfzs0x502c6jfy1hjw4hu9p1zr6ujq6253jrnni4jbqj103p1irmxkezu9g5a4vjf9ieze7iwziuye8hshekwm1ch0w3rvksvrl1k6bw3s8lu4gehewq1yx2gob1zicpflre2li3vx2s681ec8t1vcncg5dbq93sd7es8blysqxhygtxi9i6x8nyunr574uui95n82kxn5ualfrewkfjkeh4p8cqqa5afqj9vb33jjejhafxsq17i799lggmzn4pr61hz2ety98aqrwrkdjmjhaxzj14gti9nkpevu4qf9abcu43h1uqxxoxto3n738c9g145gx7e4ol1bvp0zzan2l5se0yxj5oivjrbzj8ajb7gcl9m97yia2olodyqusgkxqlervyxua9dy6badxufibdoapfs77i0abq74gb4077keignoklvv7i3h9wjrba5ymw6hu55droqxdhin00edn60abnu7zyik2rhkkv0o242viex5q7kwj49p0hvxggz',
                sort: 799762,
                administrativeAreaLevel1: 'rd4ks0n38ycf0ovchkl6l8robf6bel4zm4owg00etkbk3icqa6',
                administrativeAreaLevel2: '4beuz4ac4u1bc1dldv2r9u678hixcs8xdjyyvvmk4f0to6t5wx',
                administrativeAreaLevel3: 'p3ewelt58kq5j2cdsr31rsf3wuxdyvnyo20qan3i4zjjcqovg4',
                administrativeAreas: { "foo" : "bar" },
                latitude: 923.38,
                longitude: 289.82,
                zoom: 77,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'li',
                iso3166Alpha3: '03l',
                iso3166Numeric: 'tn8',
                customCode: '34ldj9j1gt',
                prefix: 'mdjwu',
                name: 'pog167jlqriq24vr6cy0xhsa3dfaxlkpyuci53a7glxsm36yoyitz09sryhgah23rlf22ddh9khsy6483rfjcyy8g0nquk8x468albpfobjj29q6ijqynspv0slljuw1slsmekeohcoq3je9tqxo81x27q1w9u8lbjtq1g37jky71z0m28qwp5w9uld32u9ax30nx0u1o7f4874ku2ie65m5aa57px7ymciixpufwce8ldryatgskkds2wjv341',
                slug: null,
                image: 'sosf7rv58fwlhj0bzahpk1356vwdcielbi8br5dzynouax4ynb4rmur523d4bva2crsc1rsnr3yjf8rylitme5su7lf14ged06j1aekjw2tne1epp4gnwd45uhmo4dz7uzyj4yh5hw2er2xp8jse567kf8x7ichksjtj8pm4dk6v2i9b84alz0nbop2ftktynzef5espbdx8uz1r3no8u0pdn1eml9evsgmtox3kw11vmq5ckupah0qucc3rr8mqjebfhe64jqsxi27z7untmirt5my7l3pbdcrl0r2v7c1v3pak1agkiodzifl2jcj5l27v41xjdpd3mkc8p4wds66nnae8t1g3697wjxu1pi7u6ndabem6w3371ogw92x9bgqmirgm9xqv43cqjkrksu66osre9rncsmp2s86h2av5y94wydl1ahikhkn7qqy3dzhxm8807iwyyhxruu33gi2hf0y4h27h69noq2czbzj2p6mfl9n4k268qelvzvs3c987gqx9codpq6plg7cox15k1tau4kvywhvovvl5bu8x4wr323dd0mbe3gnu0j8n775brbac9765madp32u5yu3gqj5jo7uy4qcrxlsq51rh810q7pcfpt8g9pj2r8vtiskvh38yje24t0g6p8x90etisse34uwax62o8866btfrqp9z7uff353s4ld8pz9op3myop3gr7oi5z8zziwpq33dqd0uctytquz0gqqk9c7ev4w9x6bkapj4ny0qdh8q5ab0yulmndty8fn5ttp2f61m51i6rq6rrv6e1snxczb3l3xo77g9cft0yoc1iriuczvlcswd7qnee4avp5g0035zrs70hgr5569lpcqofcarxcvjjzn445ooqy6b6fulucwnpxif03zyucvz6admkck3e14dku2j3vu3cn6br27ylyc7hl05p0xr2gsur679zvwqpno4u3tje4rt9k6nh5hosncea5f1s871da9tk3wbev4o134pn3z058l5x0df',
                sort: 360060,
                administrativeAreaLevel1: 'wtu45ojqy5c1iv1tjs219tz5gl4t4zv78wzihpjadk4qbyzlnn',
                administrativeAreaLevel2: '9c21qpr4ea6hob3bbunkhqkdwfv30hpd7r6j4ictuhgqhgq08j',
                administrativeAreaLevel3: 'mrvsqfgagpphpnqxzat3nxf2d5hkfb6qj47od6hthybm0marb4',
                administrativeAreas: { "foo" : "bar" },
                latitude: 155.69,
                longitude: 590.02,
                zoom: 57,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'g4',
                iso3166Alpha3: '4za',
                iso3166Numeric: 'nwl',
                customCode: '5524aluhz2',
                prefix: 'd6fhf',
                name: 'a6dimss1dcg7o90azzwqzsp1b7jyf8sa9p1j5o3rq8jj161f88exepnt4ln99c68d5q15z8i5btyyyw2a3r2bjgs95zhksgcerfp7vfk6lugat7zuw45qofwl0z9pxlk2082oaefhjb6jnnfgs7knn61s60vd8w8gei6kcaiyzc0770tziojzuk31jfw07nehxuxo0hfvto0xd59aeh1vaf3y0xedto2g4q3j1gfhkw9bb1hld1sfxpsqermef9',
                
                image: '5ci2etf6zadsup2sk7c3mgbtd5i1fdoojk3fy4cw8d39ex9g56t2plq7a13rdh4w0eyaxkl2ryqujq1v4dkdtv26atiau8jiqhovmqhv165w6awlcv7ytq755bpsw25c8g9y3hq2mtxgyx0nc4w0ljq8m2y1yyfz84k93597xobfuprmfgzlwqwx26zts4do2ucz8jk8lcf6ouqc6kfeagcm5a6c3ve6fsoe5lasu2jvafixsbyy0c678zu632qm1un0mnygaukrz56o39oxxzm0qur7lzh4u3tlfgj8dmnt36ri1gpesttfmo55nx7b6hbmdi2egbdyd74m888xojbs98as4b1q23lr9f0tlaq8ce1s4t6mi7odpnxi6tlv5xh3269x94vz08t8no0jaghlryx4sdnqolvbndw8m2kddycdcy4vw5i7t2rg6nnhouakxnf7k19wj5yhkp21eej35rgirau91z6q7jxanhfp81aqcoqml1ocir61hdeh1my2sjicspuiarwq9csdloryfp89xkun6yw3vgy5v16jvf0e04l2j5vrs90k4h1ftrtao7w27vtb7gwcrp4ie9h1yb8ly155mna2o3dvmemlo9ylk4hscyamnv7t6suu9gkel8n3geowcsps31cs1wn286qq6zga6xro69s4v3uxelek91uemtmoe3y70m74e1agka9k9ug86gfbisuqiq6mb0ga96l8t2krx5myggg985kat6bziurf3qwvyjjolpfq9cpshe2cr8yc35tr88gd3alsa9fxtvnaj2g3cftv087xyh71zqeskxjqf5kg0c5qucfi9pambrqqol5aksgdls0mq5zxrnto1phxparyuh9ffbj16gkrp3cv6vc7p8ds4orbcdvskt6u376gv7yaehuaznev6vlpre91vzcvw4l709z7cqyg63kw41o7ku09p75wjax10jdwl2x37d5d6raex43cl5aq901u2qm2ngnvax5r2ns02yrfebpy',
                sort: 772134,
                administrativeAreaLevel1: 'il2e8981apasr70ebc9g0q825qc8e0qonslgl2mk6sow3p08ge',
                administrativeAreaLevel2: 'hcf3vm9zuq8zd7mdamhwzb2p12599l689i5m1tk52t73nk27ow',
                administrativeAreaLevel3: 'iqpmxc5sw1y1e3sfpg1ljrube390n7fsw2omhpsi80tmynvyvv',
                administrativeAreas: { "foo" : "bar" },
                latitude: 326.30,
                longitude: 774.33,
                zoom: 88,
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
            .send({
                id: '5nzb378g31zx025kc8d7wyb3v95wt3bflt26p',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'lw',
                iso3166Alpha3: '4dc',
                iso3166Numeric: 'mwm',
                customCode: '29pp090872',
                prefix: 'xfdoe',
                name: 'dx0y3by7zyp1ow00oclxp4k4zodc1432r7hir7f82c65hehw6v4uniykgnn5kt21n674dwap3i7w7xu553zaazx1cxq3n8lsuv19m0t0dd5xi6c1yrccwo52na2z33rm1oefty03ibhx41nzph2357pp228u324qvyxlzzazojq44dvl0d1bzs8qbs6iohxv3zfo4rraqjueuh0wj9bgvr22bnfp6ebjni7tuy8acfodg793jb6yxg6q9fhstvv',
                slug: 'jruzlkw5x838or0ti11pl6vq3wm4rwf2b8tye65r5944ls4rgu5phjhqf2upv9zzjkyh5mbedyyi6xqfl5wgdsv0ilazl4ykrtty2vubh6d5znspc069gt1qkcjvhoey78b85p62nuh9df4l160e4vspiqv26p22b6vxxxqj0fo8rp9r3s2lumv4phfovukrmbh4ggkxan39fg35bmuob22fir0p6zr0mf3zq23o4viplx9wylbl7i087s7h0koo2hwfc7dntaohtr3vcxv1i7chjom1r129qsu50af3212in83yq36ptfhmw11svnrfocdino57bxmivbu6di7w8c1f0yugukqqyso2k83fy49cb8z9rqb15bsmrbfl4j57zak7xc1iysexgga4652w3fcaq2xzgbcevkl5k9myktu4b66sd4uogaq02pcbh9r9atk3a8ktj863d34pjj5uuhtykl9foep2sp32ozr0wzczmxujr75t61uh3wiyq774elyat58esmul334kkifzw2pwo43xacr6qjcgp1t16ipx7o182ntl41pqd8rhqz9j6r0coc3xe711tn9cs9e0necmpb5q0zrzlc2plxq4fsvqpa3bt768ciqjodvvoekpipmqfna9j36uluqvr4wite8cwbqhikrbyijmursdg49cthajzrg82b628chstb6yww9zwh57kc4rdhzqw987ha6jo3b7p2lo7m6993u495fihcov5v44w5o7g0c9550mh5gsr3exneqpmnhbp51xklq4kcsu1rw9t1szlvn7kfmy2pt2aenurj8tqt0dyubjxzncrv3qlucf62a5hkwk5up8j7enjjsk5tvk4a2tf13iatxwqmmbbvip3juzaua1phf2rqbu1g3yuh4jg3048wqduc41g17zy6b9d6om474sxv11bhtprr2xfgdcpttoq9g4hep5koy0y1loomiufmizx92cjubkprii8j8lm0l356rgb0fygyfch8ojey37',
                image: 'b2m5k16b21dfli062wpytj8msyxb744p1fyen0d0aiy7ttcix2qz3b86m848zpbt4onnaacwqca8vvnvqeikhz4p54f2pm52xfpm3otilu6n6gf65am4ifelbakz0fn61gvbo8fden98nizoj9ibwk5xnonsmme0i5azmlk2cw6zxpcdxmf8yoso0zxm7qriypro26iqzm979wc615qgfdentkzp5j9u46kllzi64gyotmbl5sv1gnx4lhu7uhio56bi3fp9rc7vaqx2874fna0bxf6xzts1nnkltk1ws5ifa7a18c2dgphyiwncabvwrzc9mg6laxkl8wad3684v6xyzennsvqfn6fk8emmt51le9ecu0zin9uecm07epb5to5jb8i2nno7oof9tur6eao9syh3vzjyv82i7l4xvouvx6bdms2x9ftrvyab7ygqapsariobheo3yoe68mtyrd2ufh7ngdltnh9kf16h5l2b0xppfhvcj9jjlwfakxr19vrsrd3s14pd8iqqmk1k14vo93x1ljyhpk8lnrzixqmv0joffqiyxt1d1oiurpoumey8gyplp8xvp7pnx5o97rgdurzd9fue35y9rbvjyc2x71qpt83muw2z2qdf9yw11fbyjpr53d2w8zh0c8c3hqu9be7z918yoaw0mywwqvxpva631hm3qggosocpr5yhiigqw980txveq2my3w48f16ja7y2ayhz873k13wxnn6sdf0of7rjmnhognm3e780kiklzpwfggwvot4lo8tt7k2gd6duoab77ltrs8ihek4g1kw2gkzjdhiq45x1ekwhoa5nzam8kshy7h5iz2gs33l2ehx4e1nt3rubbxi5fb1og4np8rncx4hu0fvikpdmodqyglj9825kvzly9tm5pvsr795lv5kx7n5gic3tp78kpxt681bj8t0ekg2tjetg2zrfc83wc8xrypbcudjf3eo3wtjxmmrngng7g0jee5zfquast11yszll0y341mpz',
                sort: 209990,
                administrativeAreaLevel1: 't9v83k8io9enjtsqryh8e0b79erldtf2zpx0u5d89bp7fts14q',
                administrativeAreaLevel2: '0gimnlxht5i97jajfl7jeg8lxvaavavmelu6nsy9aa9m95zih1',
                administrativeAreaLevel3: 'isvzdb45xd2vykaawhtfdm6vguzqa4uly9fjk24jwot1ytn50o',
                administrativeAreas: { "foo" : "bar" },
                latitude: 921.73,
                longitude: 161.23,
                zoom: 75,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: 'msvnp4uci78klulagnyxgsd9nis8xq049qd5a',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'g9',
                iso3166Alpha3: '9x5',
                iso3166Numeric: 'pl8',
                customCode: 'j07h2or3ba',
                prefix: 'uoijn',
                name: 'v4d07ptdrcvubola1dcz1o3e6usrqj4uxhfrdhtn7e6l2usrlh2abq60klgsx9bx321u7drsjbqa8mj3ej4fbfgikuupaovx71jft0zp01kto6ohmx1e6pyjp9t1kkz1l0vx2fi2r6gm2x3yxljq59mnulbzyac1fji7mz1bmcrvnaq01tk1xyffuymnot7jhmqgq83lgibz9f2dy5cwge5ptb889udh27hgd79s750128w8ufzo43scmhcdmxs',
                slug: 'wnx7ouf4j06jebq2kkog5qcpwiyk1roa272s5hgrj4c0dxho5h1rr4k6nfedoegiil3yg5yk9e5gg84jc0ypkkrzmxb0aakn0tspfhmgb51j03fi3hjgfa3pqm9seh684i50kw3jyqa4et0f6hgbxcgw45zs4iaeext7alp7khicbg9u3pwda4ae462xstwikf1sf5nker0cedftfu02rxp2vsin3q8a1elht8dafnbu6lvvpolt1qy0olnx9id6imlrf1eam8hui0rk5ri6b3pkulm4856cj1p6ojpoiclhz09k98mqb9r88bgh663baf1y6ro2qvue15jvl954p1pegecruyau2ukj4mdz0qsger21b5spzjnf0z75blhmgvks3s4n1j8jeigz7fi5wsvruuvfdjjopo3nxj2k2h9cg5s4fx8ybva3fl5f8nb02yj7sirz92oqadyt58a0mbcgmdnw3v3fouz7u4an06gu4z7q1ug4cc513lik3xoaggth9p3cn6thestdvcqi3cb7aegyjc2em1u2movrw1t4u3tl6vx96rdcv9l3tosi6jyfa1ada09z7kjvaokerqqtv28n9mhhj84ogvqzauqplku3tiaogtuagiwt52yzkuawwhfry1vuo7z2k8se1qmt9u4sv1eq0ffmgn3xcz80ph32ubl39vpwo18ode3i4pijdeu59gmz19t3drh06nz1i41nbksqpd8hfe3gdn988amnm7q3f9a5sictcp80rpcfqan3fpc26ep0zyk11vzmabmaa3ohmtj96311a018416ksylrglt3vxx9za5502plu0c86hawwjdv836yggrhnwks8nbampfxc2veojg082ntdhp2gd77nrfn5eucbk0ip7x8mifxjqps8l3prin5wki5o009vr0asb6r507uecarw4dyax9pco53ijlw87zj53r5hcvnvn6p9g7uwqj669hstwd4ahd7mp0o213v4hh4b8n6rtg13j6ow3bt',
                image: 'g96evovre4lfcdz2mypv8rpd6jig51s3l65sr6tq83eo6utjannfno0le6ruim1wfyh8gjoe83qtz46soidg9pf7i1l2p07rt2cktlvqufau2pqujvpu4ftlq156pzq5tyc00soaq2ixgofl1nlvnpbxri1r3tm5zqg87bth7tor8u8903tbvb8dh4bhs1fojw5xjgtb0szq9ppw3l5q2okf91p7p2uiw5faeaskcyfwomakc3xk9zh4kwp5o9k1fg25i1rp6hs3k8z2lt9hyp2s021bi5rycbdf6k6hs0kidjpsml6pk4k5s6mb75bnpxrwrx48dgs8qxlk15363zr2m3msmh9ezm7sbn4vzcz4eluttrgq5lf7r7272j2m2qp8m17jhhuiuaso1hzirym6f2ezcvwp0hkzj5n4e53slxde5uly8gnmdddjihqai8u5rqj8sbq1aiyaxnknhs4kelye35ortgunkaz7hj7sn0idkexd4yfc23xsh27915qrss6jx3kfn7jomdkj574xbofpnbg6kqu5ynw5gq080pya2xqjhaaqtr1mvbrz89i8syi1jy0z7zvk8rjvlbjspe7st6wevbchv105v1chh5e7cbjf3b3mpf6b5wd3ka96slqsva4kecrghuqd00u5cxx21snnswl81ru6xlze2gwm7xdunuj8qexxg2zubdd0x681a56f12ow4frq6ofoeqasi17t33crpdekh1nsf7l27l4o2tf3r1wetz7w6xcjfn3r7m8a644o1xtqorp7ytfrp2zigu3q21a76hvb9dqoklzsfdugatoepcewctq61rcw3fzqa6bb3mpwuinjebx01l1u0emqw8k1l1pg959fqlckz0od0fvjyn8322nj8ynwc3ho7bf2s6w65fzghn14hm98rkgoghwbl7v1r84e6r4dqcb9ryl7lnga6t4nqhoqnlgqot63vytt086qo78gbs7h9a78jzyp2imn9mpbp9mszkcbkiieapem',
                sort: 837563,
                administrativeAreaLevel1: 'r6yo8fzd9vzkl2ub1kktwnh8sh7i60padm364nqakf5iy79ssq',
                administrativeAreaLevel2: 'rahnpws382eq9zc6nekjlh1wcy6ydzkxz4l9yiivvjbltia4d4',
                administrativeAreaLevel3: 'pdeah8fwkyep0wlp7n3wsszr0yte03ax9w618u57iczkc830r6',
                administrativeAreas: { "foo" : "bar" },
                latitude: 28.43,
                longitude: 529.44,
                zoom: 31,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: 'sxzwoxv43ibyftzb7614o3q2wb854t864ik06',
                iso3166Alpha2: 'd8',
                iso3166Alpha3: 's9l',
                iso3166Numeric: 'vow',
                customCode: 'fc4m7w61vf',
                prefix: 'vjqzq',
                name: '1oab8uxd3uruwag5zd0h906bn4kxhg7jee9uorx8qz6jy6fx9uiyt1c6g34viiwjygryupt8tdcv13xiajxoondj75keij3pp81pt3ecrcwieakoc9k4svbnxrwwidui0fmcq39jcrjv1rhl693rs00a8wcwvp1zc0i3o47ihk3iqkun8s9rfvypp1m2e7a0mwqhv4kzlkvucxj87w934xavqt4uz8orcrvbf17h8hm6w8tbkqgtvfxefr2rnme',
                slug: 'kr9msg8ao7f3sbbhm7tn37qo3o4gqhxu0wygmnretrxvlpqhxrjdzp07lav2j6mxgucqtj12po2ctafih3n9sf1r3qvgjek9iqvc6mu77ij3y12b635w2b8lfhxw8wf7r3ytf3el2xq0xxscca4atb0ger2xhzwlp84l6jpunamw7lqf0cvye9ldxj9o1gi0f41bl0oi1p6pv7xnys9mq0fjo20g6d4l2dc1gpirez28nhw5zce78ggq1iv0hqs9nfg8nza8qay4mx8tfst1g0qis1xbz795o0g6zxg97srnbc4d7m0psugygp7nbbgj1pbvoxdekaweig8wpnv800i6f399xmcfelgr9knw1wtss102r003cc5yhoixxo37o55drcrkrab8as7qqwesm51jg96ch0ongtf1pq42szqca29hv9dmgqyipws5h1azhqsymaqfpjn7hdtlbqjcinm0v6wqng2khinqrkgdpj3fnhtmdu01rvooshws41fb336ubwkeafh2c9at483xxi4qplgluwwl3ln7bft7dbrvzkw7pe0z5gfqid7bth2uh8u9odfh1f9ii5ijyzgjaymysi171qcip24y8475lwlbq1p6dahrpvsjmew7y1nauks3mkssv61iccamb0svhz93k265zuamhcoe9ttr9zbciuqvfy94gyh442zrvbz2kiod4yi796cqw6j9n2ky6k3id7rw96fjoykum24khi1aid503da1is0udnbzk7nq6banq8fxjg0yyb6pdhey5wbas4vk3cl9ulf8vf8wbnp576zl86vvbyg735amdkscmm6czluv15qemwqhf1rjmzw7xe9wtsvpiwgdhzgjilpz9esopqtoig1bow5cuzytfkmnyl5mls6fddfk6smh3c8d67en33xlyykiygfck1koq3g377rkix10ubgirq37vrwo021macmxchu1rbiyfoz5ld9hjxpthk0ptres1jfgxynbdew2xlnv9gt6cd81',
                image: 'bru94n1iz6ggy0x8b7zfsi39240q4emkuzyg08u82054qlj5mmmlp0hosj8jsm2c5zj8ilq9toyx39h002x4uq5do5cb4p4xdqdybisj9yq5x9ksarxmhihp9zr4yqmvxiyi2h6cfyigklqljpq68xuvabi42m11rzho1ehuju47z4a1omcgigj68dqoq3m9m2dzadbv14osyd0mqt70rv6o4l2ztduhjd916rsz4dqjuuh4eo1y7qqlfm565wwo4d1zvi69dam136et4zqov20lvkkdwxwcfr2bbwl45w9nftd9pv2di1fztj07c9la9s2rxo5eapj8syo9lijzc0xrbuw9lag8cxhwqd6suc00lfi535bdmgzkweji7z3qt34voonkopqq9x8l8qevsr77cr0wwi9lxn3ag54vvi3tj7pqco96wi08pspwtqgwfkzhfen8br3jozfbd1lj4m6g8bdglck1ey62bw6guup5yod8s2ep80dyjxbgp52w9u7exz42jjs0pgpdnwckryf4uh3gf69txrxzc629up0x7o1oevhf4e14y7qbu03i7ahi3r9mg3tevzvjc3pgnfv6g9809am1x8krz32txvsizxikk0qifdrj032854mdv6j8ikhnld85e8yq24yw0329a1vbaqkh3ajosohrbc9ftsgpskcxpxyefhiobuo95dydv9f1bfuab16t1vy86nz03bwknm09bpnsp710mwc4mt3xuv24q3ixqjxhecc8oq9li2zz9zxaewxrhn5xpypx81eywhjhajv5rkoaj3gcmgmq29bqmvppwoyatevsaip3hdvha8ts9qe526q0lik8s3rl6n7w2gi3rer5jx7sj3jxhd9w35dm07i4ikp2dvzzyf1strt91bwq97svi30drnaad1ajd4vtpbl6rbay0hoyogbj1u1e9qcrld4k673s24ewq2uohu12qer7ex36zotplimoiflyw5l5g0nwf9xy31n0owd6w0thg5ps',
                sort: 661288,
                administrativeAreaLevel1: '8g59vds4rvyppdpxtdy7kty7uofbccdrsfx228h3hpdzonl6vq',
                administrativeAreaLevel2: 'rznskuhaypajyp6azp0ckoryvevv9z6junsx9sojm5tlelxbm1',
                administrativeAreaLevel3: 'sj8kkejftkqwfffzgjwq03enwwyy87xa010m9988rrr7q6xvlf',
                administrativeAreas: { "foo" : "bar" },
                latitude: 591.60,
                longitude: 415.18,
                zoom: 44,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'vmb',
                iso3166Alpha3: 'heo',
                iso3166Numeric: 'lr4',
                customCode: 'su4b0m5rxy',
                prefix: 'nee5e',
                name: 'w24zgx55ctxdki0apmvp8k3cillotmzbes0enark1rtx0k88l0hg74nhfctb30ic7zqok3bqpv6s9dmnfjhwmvqwvdhxrz94ann3kcpxvhw9pc97qpcjf3qasbzbh22q0ygglgpe9rm6ufldaxzaznmh4kdp56r0eleu99qsn7jq9kxnon1tttejy74gemlz22lgu2hj1mj969tiouqse84ptqfdl7cubisyv2f6ch9mkxt87ipghls0f6g3i8x',
                slug: '53rga9slgvsizwo3a0cey9f0gu1wuyz3qsgu6mix8mncj9zlhxdq7rxlvnr0cpafdkueoemgmz9f5napddzwi4z2ebqf57vnckxmcxtfw3sqgc1wwi2fph4pfp78a4t57qnytfixgmfecxzt7k3sghv4jetamwbytdcrnkdrli029p1ulxjgq3qfvuqsvm9grp0bueg2p6or3wahro5t3bhjqmdio4t152prxroc5znu66cuxba0eezuoi9kugplnuw0n4z2dzqrabx70prmke0g1ox6qcyog4ruzgvamso0x72unrt0m0z02qnr91x9nw5qhwa0ljbdjl49lllqa61lybcnwac390tquvoua57zgmttyb206uvysfz5t6vjqxbkcf2ieuo3v5jyugzg24fjjw41crcm9zn8ys1j9enudlovso93mlaer5b6trxuf7qs270um3kzukqrcnj3sfri6y258e9bgjaxpsmnibj3otm2q31bq0ebjtk68g6agmwgrwahea6tev6ishgx3y53q4kegxipf36uzxbm6ff6kc1uw025vr0eth9qwpjy7kxmm6qjbbb7x9ff44pioxv4dhef8mkydpzgqk3dfi529283cdxjanwecgf0u3te8aahxcmdnk3lm7iuor35mlbpljt8f0y2q27vvejzmdn4ubulnmrpsk2bprrl0z3gcdqs904obv0g4ryghclskn1wmahxgo7cc2v802knhhrs13s09sqqhgom6yuqzdwtzfnkljl75bva0bf84ke2bbjhl2o8bxbzbeetyasaanzvjkvuqq6jtm39g1wzxeh1pdixoi8z2n9pq8pd83fne5pk4q4wk0hb9nnm86w3vopv758cvl7jj5odqhlvztmgza0ok48gntwbqiiuvc8kmmslzo5gipjcqysp8unhe5sw3a8o9espca5i52hy4xuwgufchmahmznncvczfvy0y614sr02ym193h7fle24mvfolx1ohpgt1np5hywksysg',
                image: '24f4ipchyzt8azhp99x5ji62bu2cewtkftvpdfcr2dwcorn3axtsr4dq5elq99d449wjocqwoq169u4wvjfgk4t01jslivre7zwg9moasazpqlg7i1cfqjvfdqijqvqqb21g6slal58j8b9x2izsy4wuu5pylctp3rqexmddawtiux4cj5rb8uxubanv3dz62zvjlln8m2rgyzo4ncluasf9lzxss0apfhag9r84t3uzguqomskdjgxb1xmxnetfh5qrcwkjkucb4yidqax6k92b02rht49bxy3ey3q4uxs2ju3xz4hcy6c155yiipjeabcyinoclu0pp3pghqxek6lwlh2q7nd92inh8qaehtosolyjgkp1cmtqqh7h6zqljg79eb36p9jjeoxcxymo9jl42k47pxjhgfvcnuf54p508bhbslvxi8rsxt4h39ctd1cv19cx7k2uyzjhsuqi4t1opf3ew6pa3o3ye11z9ua757vd6055caec6vakr1xdcw12l5dih0dg4jc3a0p5sfz1omyj0rae9erorwo6iex7ycjvl50sfpv87qmldd111sprb0svwdd1v7kd5v4jz9lkniww1qp5n6mnnugm6lpi27185t9ttzbh3209didqprd8kwm7bmh2x081p8z61j4x1v7gry2v3g6y9wavbx6wl9e7kr6ztdhotvf2mjpr67l1x38v4d5uqeuv14qaumqy4afirq0qup36adi9ul68xxt5b2ol748md0lyskwn5ci3bijiba4tl1rmobb6q315uxhgf83hthu14993brset1uua8ea64h49m3xkcehfbp2plbdtpbd8740kozx3sktnbn7q8s6sljjuoxsmbijd3aqe9f8qofn6i6tgbjmkv1dfgz6pmdkhcoaz8sknf5ga6d1peuvozxo8hwirj4b737oheli6ccvi8rzkhhdt7z68mp9sb3rq99lvyuqru29k1v0iov0mss132pbymg913aaa2remlgyusiyb0q0',
                sort: 797168,
                administrativeAreaLevel1: 'jedw6dlwrt3dqje44548gc7f6xjkjtro9d4dugujpp8cjuldto',
                administrativeAreaLevel2: 'ifaipixr9unjiu227d2n4kzdttpmlqx7lb9pa2a1ly5u1hz2qp',
                administrativeAreaLevel3: 'mlkfavn943i4opp2ipsy9x683423s66uteamrhuprafj9vg66y',
                administrativeAreas: { "foo" : "bar" },
                latitude: 788.17,
                longitude: 142.84,
                zoom: 72,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'nj',
                iso3166Alpha3: 'nr31',
                iso3166Numeric: '3y0',
                customCode: 'v7sqcakv0i',
                prefix: '730mc',
                name: '3b3ewjkhjbrpbdxmm0eeq64c9ypg0f0urnev9kmflcxknmbcvkd78mibi4rr81jpjgfvnyug0p9hku4xuusxhfvw30ylzu601cwmuckxo5yzlodwing01v6bmgwqk81k7xlaw067lm0i61p9ab55s7n1c9xusvm1rwxie6f5iusis861tx3rghamedjyg50vs09hl6pfy7daq8te1t1ucribw7h0nnqwnmie1l4g8ks4xjxkqsy6e86xypzjwpc',
                slug: 't49b7sbe2mrcogyhe5soptb7ato4ed60hr4txvlxd904dz9iuahf2gy31i4b02nk575pktt5jnl84srqj50wyyd9mkzj66ybl9e0lw51xv3wp3hy4e8ubys2dttr590tz6mthhmjldwo44bg3halm3g7xngz4uqf0yetybaikax1z121rv0tttydv7j98hi8apo94ktwsxgovaj7r1osprk6fymxb1lb9pgcx256zgd8ph5ho05z8ksnk7th4xxzgspj63eax7kjcs7uh6ea0y62zkq059cycsmrfcgwjslta69r2xq91oheuajbrhh7x236fkdsi7ouiv6q6907jvkl13dxu30d0oxjil79e6t080sz27tw3b3qb8ekgwr8rc93k0agd82tfurcj7ii1smi3x56eqioznf8k0j1lia8elcnqpbno8vlxmo22icwrjg9fowc3gt2rsdhgg2869it6huhkfxgxej8vebcwt4751bjeduos315jbazyvoul9kbmn8vgwgz0x60xe0ztqbsyk2tvdn8jc97w5xodnchf0zhl05wjng5n11byyun9w1wn2mxi1c5o17zt6x0cy6udq5y4569d9gk59n1y8cjay7plz5v90o0ykvo94zl6zcv5q3w4htgfpje3ui39j6gmj71zfdxnb9ea7ckgu51r1cjju3abhbz94lnhzg1k591c235cu5o5tl49n9ok4b94o2ors7bto9uvuwcvsq5r9goilqvblr3ua30znzomvv6ocdu9qwdqodnvocw8eaak4y6566p6mz2ouqt8olfwb82ifgu5e8vlcla19iyscc1099091x2o9p12w3ndumbnjs1yyu4lyk5rgrh3a64gz8zas3217uoqw5nyb8gjzdp18riiagv6os4cyngmnfauqwt0ys4m2078o6ws0o4ea3ud8ln10gbhtz9cg6o0103jz0y5max4lerfaqdk3ndzfyl57bdzp2u4rcipiey6z8fls4ss9mvgcqghle3',
                image: '6pn7hlrjbq6xl3de2p87yz637k34bb75l629rvbh1wpdpmzler8c7t8g57vi0n6inip7i4epop20l0j17c44hrinwktwb517igx7qr8w31l931swv8osgqq52hvdqy2iqttuu8pabujpjlyk0b78i6050b4zrwneezp48vd90kke7cr4qo33bh8itrm9kulta0lofogl5r2ptwpi6kgi63054905hprk444a3cmw5cjweia1z61203m0nuunbvwszyksh69ffky5zk2586e2nw264nk9ak2fegt3vdo2sgwmbb71n1c20y2p6gvyr0yesj1tzurk96jbtbcfwdwnv8bjpgtkx9pa2gntkpzomxiemyhvjiklzb0lnlbz2logql6ncu9kosw5hayswitwrbhesqe7cip02je4wmdhtxhb7j1ov2kztxm3cmx3fn04aiuwimq1ld5s0r08kipnwxdhbdf7xld55v254abjwbboy19u9aulle7niagc8zrl7svhnl9vu6g531apusbhckt4eb7atfc2vzphm5td05ow18mu0pbgx8f9oza4vmj8xhvid2mdvizv2k7a9dtt526ntx58dpjdl1ywusfcfow7hl52u16pl9j5mj2h8uhemflluucdxb4zfyap1a80am1lep0vkddxonmawunpyhx0yvb6oiawg5rl9d026zwhoh2j8datdpextsmcb3oiyxh7kimcnkd822e6v1cu5vsbz2b4lal77nrn5f10b0pm2ti5phphmsw1nt9t9m9u8o6xqekerlfksn6o2mgr9lhm9p2vdfk5t8th304yi4j6yle7y58pt3jl217qx75ykgj1msdc27l90pol30cw38ebfkbf6esdofd5yae7pofqh453z2o8pns3l2m97vegii2sam16w4o69o1r1w98m4kj7ju01dokuyqgzoqu2jld7d2e9ph3bztxqpqqu69qk1d9trltuzvh4atttuy5up72z4u5rsvml6wf4meqpp15',
                sort: 690122,
                administrativeAreaLevel1: '2spfmuyuu26e8jvdenwnwyh4jhoukumbxh1av887w3chsj64e7',
                administrativeAreaLevel2: '0r1xzrdx48eydokxuamyavz474jtd1ejgcggjdjgywex4ikmvy',
                administrativeAreaLevel3: 'k7m0eiyxe63lpmaiazbj6flfuktycn1rt3innm9i8x667czu68',
                administrativeAreas: { "foo" : "bar" },
                latitude: 272.97,
                longitude: 676.82,
                zoom: 93,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'yr',
                iso3166Alpha3: 'm2p',
                iso3166Numeric: 'clff',
                customCode: '58uu5sfeft',
                prefix: 'rb3ed',
                name: 'ok1qmoqh5cwkd3g2aawy4g3pc3i7b2ubcrgiz739jwckd1rhkce4ttri6hoiqvm5ywle2ot0uqgfqzr43fwz5q0qy5on20mq3ygpd3gn0uzsmzoqb5dihez2a3p5j0zwhetyj4k3cwws6h13tquyvw7a8hby0d01l8a70cn25hqf62n6bzrfvbjdczhwm584xpg1dny8wen0aqn9ztzcgna92hcv171fg27m4cvpxrhuvgyf5gifxy123bidzjp',
                slug: 'i5kbyyocgy1wi3aufn1nl1v7tua9syl1kn4iubr7o62hx8gfmwypislzxh3u09uxtwgttzc3bhcdar19q5aaok18iixj6rverluuds9zjstug7djkqtdtx6m6qe9owg774tq9mxqsjgbhx0gmdkhljf7leatzafva0xsj2aau2ekh5uutxfk5w2ijxs3572oe16l49jk7vms94yj1rvm71b0d47t5y9x383tw8vjicg2eao241zpfbuog60al5g3x9yjk1rmxi57o4g9amdzcvj1f2ndo7e9szi9a0k4ozs2yn3x90xmlkzd6f2c4srsxc2f910jj7rgddtprorygt02cc8r84pxj3oxagqf1s5a8p6yxgixn2t3jdg3cl5qicgpihc6gcu7ed3hjw6xvz7p8v84xz34a9jheqj9hc06qzgbmekde82fhtxgepzlhbl2z9ywdn2mb2qj364rptpo1r5uituxbjfu8hfvnegitsu39w8wpvivyt0961o8pkdxsgbmy0ab5mst1kygppom7xq0edf2vxnoc1f3te50mycaklhonipcdfk0op386qvd2t1ogwqmx83n4bdejsduxtd5v9o6g119qfw4sapofrpw8ev4roz9pn37bh5enymi869qkx25ydwp2eia161mfwvy7vs2ocy35ojs519yxqcy782rgsyb9ifbaztxcvykwj8bxvdpj828x5nenxbf2uuxif32ml0osr6bfc747ikx5fheyrdc7qfbcslo9f43xx883xzxpm0dhckbvffszkq2666zdfordznxhz0flkcpkmyjyyscjqhtxq3ck6rby4mwmxeaafpbcd7sz52vuju26cp7hw0ihg4demiknernds9xqnsgc5cufbr81jxd9xicyj9eex9lltwiq2btz26jj6jsds1ye84wrlt7rjd194zpz3ztdswjxcrdsg410ych30pgbm5fjgsmhyi1lhz3yvrox4sh6owq742g8zq9if9gk4044xl35qbq',
                image: '7trp10bvqxhtuwvlhwjgmanf9lc3sd4ijvfmk0a78mh9gm86ol26f1wh28xdztax2rvggklrmc26d4fbrus412xgynmtzw181g1xe11dn3f9soip35ujuwcywzfs4grk8yji7401ylia54ceeqp04pi1619lv4r2phkd1wgfwr57d14tallxojek8w36s08tnp655rqe3pyp7fywhqr7r2dancde84qq7h3p9wt0mtxpd5kb7iuhrt1kktw82urtaub7s0gccle7x711nbifffd3ubpj9y430x7tnh0br991gbp959gab5c52prtqrkd2plewenz2djwoubqotd58zys9zik00g5sf8ibm8awusao4en4g263e1iy9nivw5pdojti6563jd9pia76ryyvl4533kv52jp0ikwlea8z17dhcqc0os9iwk65twkdjikpd90hv5l0thbiiocmqx1si2zqklob3msxcb6h5tlbq2zlbve6o1rdw7nm925535rknjedj9xsfbyjpvg4ryyboi2z59nb7egtumkc5fa3qa2hzxw496fb7kpxxrnbeyfvh0h5xbuzbu7ptuth8jgtc7xfh27u78dak9eatg3zxzcmzk33rhgd76yntwuit4llcr56sjzewgu2mvxmedmdsdf14i0zrqbla5vguzzu1lstewc9oijocy1e70o5ww8nig964za9dbf0aw8m5fnn3mpyahseq7k8tu66n1zai3nf01qnx5yznpddeh7q5o1ri99pkn7vb2b485t1kk407z84w1lfp4uvt7zyuyjaxdodvg99t4tq0x9uezj2d8falhdikbtru9im7fyemd4vyqevobquov8s27nz9ni9xz38fpzi9klmuzpx534lgjjrl31lz6wvfq08zejitbfokrt3daeh8nbooprh32vepw0yq73q061udtalv7yeh2jnxfyemm6ti92fs87ixiong6mbp4c7fqju0yaq8afh9tpmuv17r0ykp07d83tnba8',
                sort: 505971,
                administrativeAreaLevel1: '000xvfuurfh4s5qo12qz1i9817pf64hhg08rth5y8mshoupyzr',
                administrativeAreaLevel2: '1zytfxxc9cmlsoch98pqz5g89q104jvnb7zsjsuf10x8ly5pw6',
                administrativeAreaLevel3: 'c5e5pq0i1affia4iam8e7pcixj5ihf63vlbsvpu4hm209lbqn6',
                administrativeAreas: { "foo" : "bar" },
                latitude: 192.85,
                longitude: 862.74,
                zoom: 90,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: '71',
                iso3166Alpha3: '119',
                iso3166Numeric: 'ayy',
                customCode: 'wf4w16k6cpp',
                prefix: 'lxnd3',
                name: '8yftm3mwjkfduvevualzi5u9fk5xqpml0h0vic3tj1pkexnfie4tztxp5ze0ia2v5fzawdzf0z30g5xdtxspv3nmaod9bggi1lvtxf7e6m8do6wphr4dfkbs3e1y728k8j5u7984cmzr5rdlu43l0w864cbbznlitdug96f5h079bv1wakktg1by07tmmyvlyeuhc4k9gorkd6ex4b2kxvx6hr66kdru667dv8tu7bxk2sbk7ftiwz6y162yrst',
                slug: 'r84fp9uwdj2xpsv7go2sb3li0205yl4l08g21yg5y5cexrtflizfgdjsh871xvfbaxc8bo869ocrduuc2r04lhw64w08l9rq4zksummk6h6b0388r30ynnsnv38u77tdd34lzv7alko2w7z5cei7qmotex7ejki8h6op10k5ubv974q1ni609eh45vdaswnyhixcxbld48kraleu3sea5dz5x0d12t8lhika0y3n7jsh8rt62875pq70kel16n80ludk7ujd41hg7hzxs9pellru79z3f8vup2ts42qlufc5znzzyewjcydh3pg0fofbsxqfnlgl9286vnx1qd4k60yb8oshpc2q47p1oc923bapa7mgol8s9kjmc26362amp4f7g4pbh5jv2qap7q47hwz093h9jymccw6hzdx7uja9focnz02nz2a52dsbp1d8kj71lp5bjqujs86mnrqcmeckpzgprqsq0iraqekj5ivgxa2qzln9w20tle43nempvzgp847rxoawwarctnqkfhwbvzbfrslnsuzagcgftjovvnv8yk3mzi6y4lxdmy8c5iit3o1k1mndcyw75p5f0rsp70yl5y8075oqaqj2bp0vy0f9itmxtklbga4bysntew7hg57qjom1x9awuh4z1c2yca5ytw84t4i4vx6siglfjjfrc27og360ipyhypwl2yj0to74blucfug09a66701c2vs5thas7nd805rrc5zsglwjgvq877pas6slunvxbvkxizorsti11wqqhh7zuengt6pjbhbborbq0ujzlkwnmzt110aa7yi4ddw4ysjnt7lyzwxmv9l3xuikdz93837erf83r6b2ujx9be5uvwp00h5c79rrvgfq0d9bq1bkn56vjw9maqtwg2xvrqwjeqhs3iyy15liz9tn2e1vl66wciked86bvzoo9x69452okqk6cgqv4h2mlpsul8k5m9hlw760b1iu0b31hd6octfth5kuxzu1wyed5hpeedxn',
                image: 'l0cjzx5bhryvy9u9eobidd8je9mmqvguzgkainvl15147q6fsdhkvhge304slf55ewyooxiq7ekss2v5z9u25i6xgadmjzct2alal9d90621fa9ceh0c7o3s82uzdjo3fkd0crnbj8eil9ks3fastu7buvxin0mb5q6czj1jol0kywzd2zqmv8gvvwclvf1lai19ghzm17soh2qkq7d1qeoyv0x9gk8p2lt38luzmut8l8o7jjkh7w8st92c67d56yg0veba653s880t28frw6tgqy6pvualu5pvqxxyt03ib3qjw0n6ntfh4pj99z8m3gkbze25ww4v1qr01fprdnxob8157vbbu12ukrxdknrljehrnq79nwkhzmke3s0iof4xtewmel8bw2jxp9v50izn8gwonw8q7sxx4ra15q010vbqeq4ues3jt6mqx27zpg8d7y65j6wau3skcvnsy24gbbv3mjkpfh1rgsr0ecvdmr9rbs7azdpomqgeadf3gb71uj47u9pqerk4rp9pwpvpnxtb68xri0plv69a591wuijceh7bm00j2t87oijmd9g3764mrvkxswhbfctiw2u8l5l2juzpyceod7yejn0l8kv6ie2pj1d884qsgk4wie9kmylur9dpjdg8c95yvzfemdjp0c5ixlecmnr25itvr7ug1pezmlcas5jscdjy4248zi96mory0tq2a1oze39ya7pyrcv35t7o8voxe04f7kggtz7t2if8xfusiha4fag0s5ln38qpgslr1lozlz3dvklbdm4mi59wnwn9840a7nh7igoyclagxzmvc5j58c9f204e8c3wwl0ygo8hyjgagdevg1z5r8gigqceehqjehee6kl4zzkbca6g7x63mwm83ys2vheeyome5uyzukbb2yhc16888up0fw5qtg069ovazdcgzsnh2o5wvcu6t6609spbp2vdddeqf36iu85n3ee4pp7wr9ssig233og7cm5jly1eqv9hkxa767x8',
                sort: 928924,
                administrativeAreaLevel1: 'zpwxt4cju2yipu721vbw8zmg52pwsc1il81tx2p5mctoqin4gu',
                administrativeAreaLevel2: 'gubgcmritt7hcej40ty9wlxnqo1l0rwiq20nr3i5ia2k8xcvyu',
                administrativeAreaLevel3: 'rrvnjepaipdi86kfs530tp8ng50b4ky25q7dkcf56fen9amczb',
                administrativeAreas: { "foo" : "bar" },
                latitude: 733.81,
                longitude: 793.29,
                zoom: 88,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'qh',
                iso3166Alpha3: 'ra5',
                iso3166Numeric: 'wk1',
                customCode: '1i273pz61s',
                prefix: 'h0z29t',
                name: 'mrn0amjy39r2x48cuc9yewpi02tdeoho5ace9mjik7m3wuftyb3jmfxcplo3ucbin629zn5zs3ic62x5ko7tedtogt48ak1upiyq0detvf3bsywiuex3tl923tjzrlp6wjra9s54wfqkdyhi16374usmenf935bik8uilletx8evcrn6qpxxtgqj0lhg9grptbsp3w74o2hw9mff54uks7loj7db3twmm6f5qqlipa4lf28ipqs8sjer166onp2',
                slug: 'sqcggcwioeme0amw89wufsauh94doqti1kwunapxonyebl47qsd85uoikqm5ap10tpn0oivunx9y4begvh874yqva0x6u61akaskmxskgqxcrwco1wfw2e58liib86aqcsvn7o0j06ydavlrqs310f6kv69xspkl5pcn51jegd7j8bg63vw0fkkf7a3u10n8uq1x7zmk8dl0l7tts2johebt7kdrag6r7j55uinrjimow3jyq4uzvzpy1wcq5stplx7qe4abkqbf5o4rpyvegzovci06zdeltffpqix41k1c02slyi6bi7f9rg3npep9ot7y68wdsod9nmq5omy7ovsbw8gjtn7jp0jto67c0ad08ufh9kdv9c3s72q0h6dlzvfru9w3wrqz93tkaf64f13o7hj6nju5c0c5cz63jvhw6i0dwkvqkgwwjnlnzg207yfxjyeikhm1f75edw13jyz81y2l6pcj9mnyfw0cmzwurcislv39244x9wwv5reqw28pwze9yhorj9m9c1s4vtz7piwjiw0lzl8jjtofdg3zppnzld07dc09q2nsenmd9veavsmme44aqsryg2g2s1xsr57dk9190461eay7etwnhd4pulov6efk0vrbmtn2udl5w542w66mxqpt5vj6pytmqvd1nduqrnagqye3hqaqz1gukcngt8d5k67soqkmt8rs77xw5kh7jf4euevn2xlonvdyhbwsqvilt2b70fk110rn0gaasxp5k5d65vpohrv2otx2roo4dwo9cl8cbs0x2h3n4p45le6u48xqhhr65ifd509dchvx0g1t9azt5xy7cdhj9fnvo7gmk1je1p1efgfvote5t66a5s3iuaz2bzqui33v2mn9l64am6dnygt8xke4gg80uzbyjjqhihpignb8hohknomm7mgamekeb14k2dnhp1ugh64dygx5z7ghzhdpow0x2o1l3ygw2ubjdsjf2fa98hqv7jv4fath7yd2x2v0dv87cvp3udbl',
                image: 'u5q19t7m6ehpgz1vgxs5wcvdisg6nzcfthls2zg46sdul4fhs2jbooc8ej2ho3l7p1fgy0c3ovc5ay9rratzy2bgy289utcd2r3dd11ea3zcsrzunkxbz8beluviig2rc5ztciowv865gftpui0zhk0cvj1o6ffke28oqeiy71g5altki2zdf221hdt5vvuaqmocdrbwlp4gqeup69n1nbtn80thjuyj3lst2jhg0vwnc1ugc1g4s3tldc4zm5wn8d9h3w7gq5u669v6pgmon40wi4a5t3347ypfyutnlvdpcrqmpazvvoaew5m7cyw8407319c6pqgj2awhwp8orftxozks4jwbvzryclfh2li43rlal8rt54ob2qzekv720d1bkfmn5y41ziywsanvgkrnao5tjwau62kf96xnu0icrtk7m9os4aqwi30a2hylstgge5hs03habxa7r6mdhglum1gusn1jgmxmkhpc9pt4f4xj9kkexv5zhm4h5z2q4vdsdfjp6q4pehndvm10w4tfcd24d7tfg4a95qmy7j1wix1rrn4jyd77d5eomb9zz5flffysivpst3qdeobhx8l2czwh1mkeep7oatqhcbkvzddxw7b83bljcigziec546apsfja4suta0d3qe7krgirxzdjqlbrcsh6uzfsfu6vb3xle21ktybuycnm8ligm4iu85f3yuniierlstsfjwpq9v4env3p2p4hyg1a1v6c7ofjprw47i319jzd4mc0xc8t2hexabf4zac4f06soahvzsm3zsqffq9z1mldn2n5047j1bpite6yaqvlk7kqn73gaesn4ygq4upic4ypa9op2xm5q30yqcko7sk3814t5s5tv6vwflai3exwx61f57p711shbkpkztmfy7rujn9cwvtg9eodw0i77yszcu6hye84tbxcg6gsn45jpjesmdufogf7qdxzzz9me4rumexncuwx8hshxh16vz0lp8p5rp7mn5vsg196athhslit',
                sort: 282302,
                administrativeAreaLevel1: 'x8k1ih1lr4m2yys5xv1wq8ho27va2ypzvwvhgaevme51y6ifaa',
                administrativeAreaLevel2: 'kcta2q2fk3nlhu5nu8phdq27kggszda5cddz0mff7152ci51p9',
                administrativeAreaLevel3: 'ucgv0wqxnt1vy7r0gfcbbd383nzudsw2075k9fmelgph3gfc0r',
                administrativeAreas: { "foo" : "bar" },
                latitude: 603.69,
                longitude: 115.20,
                zoom: 87,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'on',
                iso3166Alpha3: 'haf',
                iso3166Numeric: 'wdb',
                customCode: '8nf290xtn9',
                prefix: '8yl07',
                name: 'bhz8onpcpxml8vb9iu4fmo8bnmw1ggn3hf5mz4rw1gnmd6jbrnonkf4vqyqe02i09gkj3n5zuvw0q138lisd4tn6lrw0f35zult4k7dvk3l25puuwvjcg5lrdyorkfyeso5wacxsov5mt8u0i458j3fqajz6g6rpo4r631lz547ydba0ga0rtnkzx1dbz4x100xrmyb1dtl2qgeur3c6qqqx5c9e64l8vp0nsd8cwrdiq88zbhy8j4r8lslspikz',
                slug: 'bfdj3w2e5grmbtlxu5hf6m7kzz4e79kub3pmpsrxr1t6g2e5n027375lvyixaxqlmofnfo03jd1wons5dejvudxoi93t291g2u528kb0g3l2lyuwfs7x6duvrqns884098arvorseq3za3ahhzdtxcpwrb6nuwxsftv4kafi4h63iepvpbeah4rsa7d13g1g0ehudfya97d3qup01wl3rvug9589dv1dthj2em60qjpfr6vvodyi5pgar0vci4jc8duiqyu6x4a3jksehbuh5f648ehq2pajvrrazgx9kh3e1xeb4f9xjt37blllpdyvglhuj89ywe3orzeccpbgg149bx91mxo2ipd1j8q93za1m8nc593r961gftzo9v8kxg8b0ofudsxtt1dgqh5w64k1iazzc734ja1oqt8z78uswsbbey32fso45ii3zl6pc56w2gecwr5wi8gi57kwvrsj5ssuzghxoolp9yq5p79hbw11j9qvc7frolp3gfa2v9j48np84wf1s9x93tt9bjk9qkwvojumkrak2ap8x377f9jtoeno3qy8wulsz2j1s095t4vashd4m5mr5zl1hfx9wa8h5s04voub0c4fhqmgyd0nn55ngf3dktyx1ssa3lpkpmozpq98xnfmarqqesqw47fbv0hvayx2mroln53vm920x1wvpenyh9bdiwcayxxwlevpukw1itv21v1nyr7ovj5fbsfjhmj0bqioaqffssnrz4hkrs5extpjter2g6ht6julvhixlddmlx38a8wvhklpo35lpifx5ubxvn1y4ojp6824vgqkq5ezq15qq7mhqwz6p4yhnwpsvg2jmqq742nd3tsgn0b97yi2lx6btk5b3b5ltbjyhvap4b05nzgdoo8a4b3m2ligu9muu9hzx8ctrkpcsfn1ca6icbwqkwgtv3g8egg322sevfhajsc9j3agmet8r62l1euhmlhngie8qfjzvizfr6s42v5ir3qn34rrf25ox9snjd9x',
                image: 'onwdgkgd1zxr7lsn3bi4120e0hxg7zddva8be568zok4f7zeqs9z0yso5soz0kdifbuh2lhcqr6r1km85cmjkuxl41auzzyat7t66atpnp60qe7kbnz5du9ed7ilw7hdrjla2vftm1046h6mcxwa0yyvolm28wsga5swh39zeh437h1co94xkw5rg8yoeyjrm5bmfw64s00tiqz7kk282c1ca5iulyjjyel3vhlzelvw31ujjjvq61kktvyofoztjmwtb4jduf9983drqreahhrhj8j3dojukld1dqw0k80dhu9f8f8kg8frzaozdp39r2spng1u1fe0ljfvxfijud4d99du70tzib7ldfd917q101v7tl4rsdmsx6wkz6p3u8ymtuli3w2tlzf606b9q8c0w5tf817nf7uppk78tiuo4lu9kp4ecmgbi6ylib4xjmj49xwwwikkcdwp5exzlehwwvh71jebjcizrk6m8j8vxmlhziqk1dmagkd5tlbs09xb9yb46kelp7gxsh2wpepxlihprjuw8w1ycvrk9clofo2my3bq1oc0u8aglk44s5soa2jdjcpa5xfqyq5fjaj9wiavz21slvpturxeazfpluodq0q9kfriqnnmr9t0v9uovrr8i3e108dxgav546m7k4t6orxykikbgdgu4nan6abgx76ib3dw1oosi6hyxcl0xq4hhmyt922kzcd8bg7eydx5s1k3e62c95tfci2fh8ke2wtkf9ab8abqnj2kjgel6m9psv4cgta8aaeagks6ab9r4ylv66o3k6ksyt365d6t7e6wslzz6s6meptjb9vgtr3q454csyq3td85drljtbj5mpvbx7nvixu0ubgqt88axnrglqvq54g6v5i8foag500fl2i4fz0u53867exhjcumyjoftheqyj07f4ov1sonbnzp3bd02hikwjlzd9g6mnemwaztzbnoymka6kibso5lxzwaxx5ukeypsqnp89lsykhqnzl24ipxow97',
                sort: 795155,
                administrativeAreaLevel1: 'b7fvbzzvxf09uzg8bz1ff4trqgimfr05yxddivs2v7p29z51es',
                administrativeAreaLevel2: 'dpirxm5ofbq99kwg0uzmhdaf5ws3pezlpirlf2tq5mx2gpcg3n',
                administrativeAreaLevel3: 'og1ouggzcwc3a8364ezoqh0nwkt4eft976xkv8gyy3noju9d7q',
                administrativeAreas: { "foo" : "bar" },
                latitude: 586.04,
                longitude: 686.55,
                zoom: 46,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'ux',
                iso3166Alpha3: '2eq',
                iso3166Numeric: 'w8t',
                customCode: '2la2wdwgzn',
                prefix: '1o8ct',
                name: 'qdrzcaipkjz5l7uk1w01kfdkiq2ul17k1pt15enxdxy1xhrq4rogum2tgqv2i8vqn9i5e031qrvwjzhrsgeu6u5po0719zynqg6cvr8zwdj4g0emtr37fb4spj055h6xz2okxwtw8jjdszppp9kga4psxkgk8428cc65qstyas021b938r8byxzbu2asdak0xlk0w6ypbejhg2yaja7antoydvs83v926nc61n4oh4wp8zi8wcm43493l22cls7',
                slug: '0yvme7dcgsinzniu8wzdq6r26fyjc12lqrpwgvxchb3m5uz3nxzt6r9ozspiaocvyqj001jz1mmsn4i0prprx8p8eiiu9sa7evi86v7h7ocum79lo6xqwm5yt9safj6voxunttx4bbezgx10wsqk1c05jmvlb25shz3uccuxumpqwgvafhesfjppwr2ju7lavv5txqu2x67r5lzxf5aewhl3p6z6b8c56fe9iccxqleouoxm8dgncx0clj9neh80ed4esxgqw59y3k2k43uhwwqsfinoek9rakzuxyo579gvgrz3ubnf9x9tm6lh8ucjl102yzty5adndxsaru21wyqpvhm094srh1jnharrbtev484rabz4ks6t36zlbda5t886sdic2k4stbcwnt5avp5afydo33p2kuq2q4cikhghmya9neexhmw66lgq3bkppy3gplvv9e9dh51lps6jwruo1v5uuctls6j1ohik1myzj9bpi9snfmsmikseszuuhu0dlzmh5ajhinr31zr7e119id6e3rdmus3oefbqllf8vb80wy0zc8d822276r4drzbj0e0ir159s26xd13sj9f8z0ngewr49pcx4bor4lc893ubhiqokpxnn9rtubpvzg1dj89t81kzfrqvv21zl22j3wuzxizky5ayjkcsqbumge7ksx6m2u1ktmxgc1xvfi4gd359wty6e82aju2pmwujuorhotswzy82yb6leehujsw2mwdv18n1qz4mri8nvjr1faosksha6pkll5yxqn9ufhfechcwdauabz8id6cfhsy6d3j6iwwxnus9sbc7a3pgn1zvs45by9yqtieghbfr10yqps0ig98gjespshr9rd161jfbwf91eps1siy5jmh0ae4nak1gryzaqjckus8x7320i0937qf7b91fwsbkexyyzmey0u2uqvh9gybmpo08uecjfsj4js90eeiya7zrp8ka64it4cd1myaotecq10v29cihb4iydi5f5loeb',
                image: 'plgws5n4ucdtc8bmkj5v1ebjlendet0u1g658trg68r7wf9lw4drc601bu3x85s006ekcs05967myev5xtsq02yapawi4jggoogsr3k5yvurm4t6nqjbb23bfwajj30soomo2l2v3zxe6zil1fk2drsyojdrntyyvm70agzqizt3fd4bihimprqcryepfkfms86trtupht6fziub43exg0mqid8wu6pooboy233ov87i56ick56hk6e4vwqnsf3kdsn7vwc9ck1zchx8kttzjtakk9u2adr5su7pcr3acyqxk6gf0cve82a8mzud26pj3kkvtxx0k27hloauonm1jnqmf7fu29st1t12dhmdd2v0eh84k3mtydpxhg8et8dskjiok06scf6xjnc3pihbc4mbnv58ggzd29kq6l8pf4w1mr6e8qodiosv21rvf7m0vdqe9imvtjvo3lqx8z2breuw70tmuij0qh7pvjbv9nau2mmv8kb5sillxtz5q46ojhhgw4g5zapsyazg5aarlxeu5cf13skbc2ltca1jnitc673jewg1agizvg53t9o4yo2ciifbn5ln1xb5pj35tmqh9nwlxw1rqr6z3bmhlmruhouhe7e9okzc4ma45xw7qfvemvltjveiatsp1czvn8zzwqzr5afw2ievswl1b7xlxximetfwkna7opow3u1u5qnwsi38e1cehz4lzxnsmqabfjdpx0ngtmwqd46dhql49030eez5ubrsnkpk53y6uwkfz2g4ep1catqxcu5sqr2lunjlo61a87nlsjzcmo0lttkw5frram2qy7ywf0qmtrvt8zy0k523a7xjfh9n78ozcysfhpdgbruz9p64iolzm4pxukco4weooaoe6zmf55l0csqzevezzs3m8isyz2fidy9yrvm82wpmej6qg1p4bjpeul2qyy34v3ysjuhhdccfrk0so669lmdijxiyooo37twgm1qkou8140ju1l53mqhaufta7450hw3feom7',
                sort: 265220,
                administrativeAreaLevel1: 'l860xjq26efdmgrbjcdeiodrmqlh2dwhu47vvqdn67us5r3zas',
                administrativeAreaLevel2: 'yykxq8pwjptyw9ihxy450esnnc4ay86c15mmez3z2kuujx4jli',
                administrativeAreaLevel3: 'hd3eo8obom9q47nm6a6jfeo2900mbdc4of49yq5g8i4ah4g1n1',
                administrativeAreas: { "foo" : "bar" },
                latitude: 772.20,
                longitude: 874.16,
                zoom: 58,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'ic',
                iso3166Alpha3: 'z0j',
                iso3166Numeric: 'x5j',
                customCode: '1tig9y8oha',
                prefix: 'o3vc4',
                name: 'r22qkj40t9zeoc5h5eb79fulb12144699grncgbzrp9qfucnw5fjss8806dpm44rl5c2una0vutthxeri7soee53279h81zy3vfu17tiq7bdp13j1h6zh0rnyqxw33sjm8fgtigeigudtblzrqpaf4co63i4j4obnqfw84ol831ju8l4ke5czq6brmc486wxw0w3b4rwqu5mjysbha1gnpxqov0brt79djdg4f4wnxa0m0ca9ot8k3iyd20rr5y',
                slug: 'qicafii59novzrn1kuwf42uofpx6lj3bgd2pque58xy5wdnyv0vftahu84j75ron0jxf5wya7b2gwo3liagfqt7ammniklboz87l3ngemssa4byxncoktpq95fctju2gsugffdqmburh1e49qo5e4l2u7pze8e24a5opuokjjgchrg28kfy3p0wkf4nqvpkcak7ze6in214s1xl29o4udvyaih8n0gml44curnfy2r28zaag07r5awjcd66w9uxndrws06kv6timm8x41mvx3yb849zp8i1qyvbr6z5wk70x9r93x9c5wsseethnr9blclpn0ukm27etu5mo4mdycql8lp3cis0cycorvexpjuoeopjvyhr27p3zi1i2b5xf9kxe0tvk2thh2rzg4cqjirlc742yf0w5ocxvkof6ojzpp2y0xaxxz3eu4iytg77r4irhd140st9tkkm2qurhu0h78x069j20sh3izixcb4m6huere7eunfn82cvh0kjgd6vouqk1pds23g3z2vj4nuinz0fuubwl9s0p4kdoeyyheyt8k4h9l41ch8wlaszctv5td2dgwf8z0ljzkk8xosuh6ou8t5k48g1kvw3by1bu1mhsghy9gsiv9l3yhb6hib3gm8zas0unnbjfwllyy4f89um2nasmq6zqc1llcjx1q884ksejy937yql0gm222st7atla1qp9ii8acyznaky6c851knnql05mq50xy4fu9ol9rei5mp7cdcsbmzoix0d8hhhnr1aa7eg1kym6tdu4yvqiqxe94ku1oy5x50bg94inorukif8bjv108scpuyxg6cszknwf3z0qx6o3nhwwaxqhdjcpj9zp9amb2d22qivlb4ycxvcls1mm5u1c47f18wv7helv73mxwvnhw2zrouvv927u49q96htobuinn3wsttvvzwkl9tyold6d942et630lmspjelpx6hay6ymn8fef4el4amoq2oybtiu7o0q5f0lgihq5tfkx7rs',
                image: '8bo9o34bodae4y7vmggcg9uhpqi4hmpw494vc5tu6i6na0qplbh7fytme21mkupu1mc41e6zaa88oyqt1z3jdlrg1py59cmhnccjdjnd8i1v7a36iq1qd7ykfhkhcidc2i432ktyfgui5z4fvoh1x8u1f5xajs5qw0uq0d1s6b44sp3k67wp53qrsz2pf2fluo2peqjrsfmhuba4lbzr4mhrqis7k96l417sqr1e67jzetw3gs6kbejx6slnsc1yavzh2wkp756mux51uc822y8ir7c2eog3r0y2g617vzi2cvvttux8b0u43m0j2qc3hlbeb2b2jova11y7z7xg0e0rbr538mvln6dgeidswxypfa6om328r6s5ys7x1xb9y4ajuaxqt6m45o46l0aljw2728qqe899ajdgtmbjb8j29jhuaghfwlhbpe831lv0amhs0s2gev8bxxvi0z4fsvay8ud7rsv02imv7lkzl0xtraqwo4zixtx7qy31rwvcnurnlxeziigj6wiu2shzy486snx0pe06q1z3y8504wlkvva4fbpm0c9beadu2r9fwkmwpbrbfk7fvz6d5gv3maj6ovq9uhn62ktule62vo4mwe1rjnqa4tusryzlad7aq8hkq5osvu4cx9br6zqlpz5dxemigco50kipvhkuam511uv6c0maez1pej6jje8i9ji1fts474gdina4utis9o56s4gm52p92awolhltiepupj1zr5l2t1f35cmqfi331r1mhlawu1ck31ptzyyf2gah0lkii127bwxw1i3wuqb0ce7h3n72613xf07ubj57y406g88u5m0xlytowz6i96ugq0b6a37gi73h5yr0r3sgd7sv3qtp4dlkwhfftfqrys2s3hrozwzjttpkwuk73a9hly3n84m1vwoqnptftabsmk61imx4vptr9os69doptb2cfabmmajosozyiwhrz4m1vydn7vbn2rdao3ic1erqzciz8inb5tbav3hefh141',
                sort: 189390,
                administrativeAreaLevel1: '4gwgdxwmfdib7fi9b4a44usdrtn3j9ymu20217fnk2ne6eaqig',
                administrativeAreaLevel2: 'wsgwxthkd431zz25q6be4ol1118enajk0hsidrn7zfvq5b0vtq',
                administrativeAreaLevel3: 'smw31dqineateoxp6stmvh74om714zmpdtq8kfl18x6c73yejk',
                administrativeAreas: { "foo" : "bar" },
                latitude: 456.99,
                longitude: 517.54,
                zoom: 35,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'va',
                iso3166Alpha3: 'g4l',
                iso3166Numeric: 'ww2',
                customCode: 'akuyzs60ez',
                prefix: 'lvsdh',
                name: '0qloel58dsv9q9n8sj1ip96cdibsmzea3n0mo407zn6dticbfgyqjulk70ed4h1w44tryjvs4jn7ksby0o12vg7eg0cd0aiv1iyxjo6gueb47ejmelbbgrflafhlpgo6u0rlxfxvn5qz5r770yrjziy3x82x2yeda09rlzfj2givv6r6ewed4cyrieu4sthygcb2tux5q1y3srwm9a8l6s4ohhpl3hl450bpz3pcgona8ma7ia5d7fr8mx5hi4x',
                slug: 'qixd3958qffdmhq6ouxbnfnf79igemb6razqqtiuu12ho7isfu9000coilt9qwpo0fgjmz1zbepupawis7rirny6fgovlm68vpx8davfura1t8mvwj72eqb6s48lbd0vbejztpiwg8wemyi22p1fgmijn38eweblbjm28afy3piravwny72kt0wgq7otv3co2n4rww1vgypj2hyv5xsuppq2jveh5b9fnnlfchln9t3lp1b6xl8jd1jnjgqc6ym7fmagj8hm9euw8sxx01rqw8aa5mwhne3w28o4li0ew1lomunl6tnayjcppiowmo99yuxm41hghtq3f0oyexmric565oa7tcma9gkwdzhn9kauwp152c3d70w5cbjr4l37pybroxp9hjldz9nvb7eu3npvp7i7dbwxam63byr8hnuirk4i6tkb1gfgj6yh8uf4jiutcmkvftuj6ob49sn8cthckp3z3t6jj49avog3cmx957j430dpnhhqa134w54urjdfcgnunn6187gd3l6panyefan6wkkaxrh6m29wfqpnqvzvh29kdcybxbv3b70d5cpkvi64jiywaovoce6wga0x8n0i5hiopx2oylupo5zfsedvhcs733os70fact7lfkhpqul930jnfmjv5c2q97t2020105k0u9b2njsbx58di174lrzqczlh1tsm8g7bgwx3809eumvn8xp6u93xrmef05syj6jgvk7j7gscyotcjcwhngwijn8sk38ulrtt0tajwgujd4aq6vpuhvfqcg046j0gu54nin34d2034niyev0lq2a30dui6l5v7a7sdomfs9r2iysogd1pjimap1wqxzwq0sfntc1xqazegfocgnu3g6jgfnihdgiyy68s7oks1vvwldyp6gms9ebmq6cor7e3pusqxzzh2krc8e968oed40kk967k189xew6blnmbejdfsqvwqagh6ptk4ymisx6y9lc94jz9p81tdfkhkxw6ku9o5m7o7u8g1r3n',
                image: 'v7p3flzuij3hg3fnwmduusv8likna1r7mltyh20ofm063xtiv0tni8henph23fsie3z01zwqqtxy8qq0nf89enstuge6tqzyzi9t7ynb924057y8v02531xpwwm4xl8j2c84c7t4l2xkw80eao1918iqsqle5napioptwnspr2vg0dnurvinele1yq3hky1o7tv7klici6pu5unobwx680ynkbs3gqvptywvwvo19wmesrcjxa6olgo2xg99kezkoyzrui4vhwzgdbc0x3bcaevm8le41hk3nppd7kmoni6isluy64vdqned6r1bjcfkz13t6lekf122eeyn5pw51oo7mtwxeib4rcyqnktq3n5l935yhdvrgar7wapbyajsod429o74z6ys4u8is22vm0e07ber9crgnqfyztti7805l1xauhet6nharj8xeg5mfdgwu6ettb4dffjfb2lc5z9icb3e8adjnjqxpkbqj72n5zohaj28g8eucv78egikd7j1ghlg5gjp5hb5gzlvnx5n1jzx5ifpwody0b8k6inh14lv883swqbbbhu7kbkjiycff5qyq7614j0wonei3u7dy6ymvqg7781gk03q4onsqb8lbjeplpoyezn9xgiwluh1fb46oq4g1ksw20dilc07knxj3uxo91kl79z1ayxoelvh71coxcjcywv5mbyadkc41oagbfn6wd4fzpad54xz2591efibnrq5q5ppg8y2cvlkvha07tk9ri1gg8k1xh7kwahobg1qlbwe7nt34ozmxn74ee9lwya3hqkqrnerbah2cj2r149bo8p5cwtyaq7aoams6jfdzyoe7qlpan6unm3v54dua6nrx73e1hu3ag2t9ubm7hwpsbbxyg6wn1tkl3l4ccxcm4szomv9fg1m0xndrbunguvaj5n036w1pxygcc3msnyr5eu3bpb8qfe7tpkdizpxzmifxq5kzt9swwt6fnmocpq8azu5uvggt9mp6zvorpe65ztdw9mn',
                sort: 2197803,
                administrativeAreaLevel1: 'oczpqiyhuy0bgebjwyme83702e3h3jbhk0z1n7qfqgco4dggp5',
                administrativeAreaLevel2: 'uw0ighfgpxnksxl1h0uwynvc4s67fy1qb6v6nfkuextyq39gi0',
                administrativeAreaLevel3: 'db46wzr20wtnqj2l6b7an76o1i1t88g78i0xehd60i301p5vxw',
                administrativeAreas: { "foo" : "bar" },
                latitude: 67.86,
                longitude: 812.57,
                zoom: 53,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: '1g',
                iso3166Alpha3: 'kdz',
                iso3166Numeric: 'nuj',
                customCode: 'ekeegd4jud',
                prefix: 'nx42u',
                name: 'waq37goxmehtcymd1suqbqjzj4vrbogf3g3j9s0mya0m4hef06qm5lc2blcvlbbb31v2wh0lj9mmffzm1go9ruzqidvj2l8cfhghdnbjaktyevpc168sfy4fl505k5q5hvf4xvnlpushqc21gbyhuw5f3xdhijodilnpd1exu6z6jm5agh1e5c9oziaulilt6u0xo4e91p3pdo1fsccfuv3snp2a9g8chmma1hmflzstys6bmsrj8a71gicc4oe',
                slug: '294axppkpjly042p130qwd2dxnliz9g84pjd3uflyrtbdvwzd95hyuxg8jzpq0gtpxdpuweqywd56p78sjdlhfdijr68shpgbwk0k2ppggyor9ybudp9ttw8rrbg4j2nvngo3wasi93ozyxz94j3tc6u2vi3l2flivzruqmedhy49msoh7xfzc3yvueb1chws7drs9eefob4e73u1mm5tubuhi405uz6th6kjguq82snxaynt39qg0khvy4gneq9y95b41qrwdcfl6vyurepwfea94b47zv8scfvz53zn5lzmjq9biu4ik4vgw1ntmpgtef6n0oe7nf49mzvmjgybhlzuq5j3vi2cqrag5hl3pz5epsisdxde0fwob9cw9fctewm8jpvysg7r9ih4b0p6z452ktabjvf1evb7fko6o9om1rqxsi2rvuwtidlb8q8j8m7wmyb0iwjiokjjxw62uso5k3ogi4lna356gueibfqq4g7x4gooqbh1rab513ydzxwomkpxj9xasuuobbyjwtrtqdkekvxo8nch5v33huq7xfcsjlo6z02q4kfh12a4juzglxrbvnv6hefw1nwxqbcznnq6nlb7ur18foflpuy94gju3h3i2huh22hf1b2o8y58leb9ooqasvp36jlcu6307y60zz7deweexm24i8cn8ur9le3tqefos2jwnq9xi2geg1crasp6v1k60opf7egfc62kvzxyidq57qph0ypnc79gofc3c0h5fb4qssvpj3vy7o46drpaw7shck5da4ms71jr2nmjbk03d1qd19uy0atl6ax7mizypbqtn1e0wiocagcfa5lmh0w70is4hye4549m4f5qniahl7c199kwzogd497hvj2ro1rshw42249ggwu7hkbbdk8ti3qhtprwa997ai4ldjm1k43k5bmp7kzdil19l1zftyyrtnzdlycjv2mpqjky341u1n843i7tn9b69w2sw9e0cjsh8swj9up52tc4oskbkho3npx',
                image: 'huslnyuqtrr2l2b14uax1muz6akagcm3i92plqqkxijwrhvvpmmrg2blrt8szl9nqwe30yegwvlzuimzldk09e0x4hy1t13teinsjw1xpeclq2jsvglhccxz6tltyb2otr85ef6ubot6m7d4quhya9wxrvx159npl7noz9k57eheum1kyeu6nnw3van83sm2vc8yml6hvdg2x94gqubyzr76stc2fr7e9l2sls4flzblyi021mom4isde35e9qwvp0cysxrxavzapjoz98wtocf1imu8inj3knsdnb5vnblpeqy9p19go6qyn23otr7hyd3ihjif3kvzal20p1yzwzowswu68j3gdghds74na7glf6lyn3r7bl7rtp7bpjj3qs36ecbtnpw9e4hv3g0vssnfz8zjo8dbl4xttiu0qllka6ewge1bmw4tit0zhalpt8xk9ktn8wyegusfdszbszy5u9h5q4c16sga26vraq3wx4v9jxq4jmdokn857ky9np5pxpl58364gpp7gtxmvus0efhgrx4oudlswogso2frykia0yr366dd1f2jayb2urs7d4sriobs24fncy10u4y38pinoqq8386tw3z3p2flp3bwnj9cvq6ozx8fl6xoqzrg49axii5zwomkm5sui812zvlu1t4bfqm5ix1w0w6hxk4y9tx0ahxf7mj33n3uf3g2it4cwgj30ruzv4ozjl9uf0m3j81xejjnfp3tn03tsnjc2c33f0xe0hxcuzruq031mk9hunp8zo1pzxyf1a8u7ab6p75qe8196r3xcff66g9f7w4vqh7h9fytqgr7a5jfw8ywu1zh8ijpxk55i733iwbnmi8o2wnmxu3l5sxdqsqpspwkvvjvuo9y5y6rh6aayo2c6w3cd1a6upfs4uu61aghl34f77cfvcu6bev0w2pxrpqcw8rj5vfhdxhu903y33o9vqul67xgbhr7d0yd2ej36u4mg3j52cou1au4xwfixl73bgnli4yze8qq',
                sort: 346475,
                administrativeAreaLevel1: 'h89o5xm5ls492iykq3n72cmcfmbghbzyvquq1dko89vegol8kmp',
                administrativeAreaLevel2: '5pbbxute3dspqn4kt5wta3ci1yyi9axwwpd0b7n1brasanyiif',
                administrativeAreaLevel3: 'fjayvh1c7wnjrcugw9yoz55iux2tci13eypw4zwiabrsqhc6be',
                administrativeAreas: { "foo" : "bar" },
                latitude: 854.96,
                longitude: 546.00,
                zoom: 53,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'qb',
                iso3166Alpha3: 'lae',
                iso3166Numeric: 'qe5',
                customCode: 'fmrsjn8oyh',
                prefix: 'rpdka',
                name: 'zqg4zy22yg6w32f12j9ekqoc0l03ranhl4s2sj9q0jegoaw6s4uj3o4gzdhuobf7evabrongmo813n4sh4r8f4tt029my4hv1qc4s7do3pb1jbsgnxvwb3mr6kgbcgenwdat5911ekaw4bkyi872jvaplyrzsap4t1jyvu8m79ig17i7omfe79hirhv0mcdpqh5hcadua8efi8uxtbdn43phge4uep2ib6f9sz43p75h9kfyvssqdbpqotqkht8',
                slug: 'cd1ds4xmpij12it98fem76h4l63wehe43kxlrou5yfw3hw322ep9of4x3rpgive9ja6hqxblmfpt2i54x58htv6xfvzg2otzp7lh2wap4d7dkf8s09u726vr8a0iu2zrmearkxacaipmeiv5j67uj92pxw1iqdghi7oizbiirr7ckrjhwhlryi7ykyg8uo51qg3vwn6k24rpb28dj9g1kf1ubfucvdobbszyv6bsi9e11kmoxjou6qpjqbfvklnufg1upelotsarh8bdmzkg1kubqeijn7x8e11g82ecvkvp7ukn0ptfv82lzxh8gkf3scj339d2z79ue6y3rvpf0z781zgb379ktsgo16ymd3cfbrgpi8qtwpg3jukp0rpjhhd5dpi85ie3s6jyogtvctn9mq8njze55r0bzvx93l6tyh4xlus79m7rk71w6gwvedrqmgvzy269ptceof2zueuj6jcv2robozw1i78r41pyzvn2ucsc3calvimcmfkgamkcjxyqchrp2eq0g8g9jtv03qubdmbca1konmf041l4bv4o7h8feyrq13ilengqpxu2pedrs1aw2r4bl44581uw6ct0whr1r422le1qle8fthe59papq38e1xmevdzusl5129xh1zyukrc16ep5bwmck1fwt2py7v4oeic1bw0aaf2nx9ao15sek4799d7g25rlhevdzhkaayhzsuq74y2cmqt3o41ob5m5yob2pd4t1lksjwe7ttgkm8linmezzpt6i0wlf4sn9k69273b0wxz2kzvvk3acko1661lod8qzek9k3lj0lukf51u0jbr024mf3b84qd6u3kkwz1px5jza61e505fjpmvdanl4vyzdxdo8uwmygic19ifamfnhaq41ge5r9fjpimk2fd84jwf3k7rf47vatsmdm2z7byf2db6wbndqixphvpijuv35ns2nwmto0gv0gve3ndk658rq9d65hqbbhx1bo7ptth94t1glo1g3wyubxju02zi',
                image: 'yslj0z8nku5pdat3n6ghxejjt8p4mubpudxawevs80rsxo7tr37vcf1ti8ty5suh4p9rgthu3c4kmdmj5xd978m04qsyn4bsy0q4itd1mjw1vcla9lp2cp4glftgef73h75qhz6henhp0i87vpx5rgh4of3ova6oh32bdev3t654t42gz82t8o4t5ofj2ide0ift3xa7mc2tp649evb4xeqng5kv9ffptelfj139jg0hcnftwnw2n0u0c74yerrrxmcpgd26wwf0t9fo5vkb7yvleh8lcb05lyyxsqovmod18yqmmpblbh2gwbjzcg9uybhkjcqin6dwwwnpqejyu9vvd552ysad221eeop9vzl0e9yi3twvqgexfmjfhg3nez24uvgywu5ye9hahv1rn71eriwr58drdmvfks5wjchrg9tjbxdhvyq8myx2yjsz8kb4bx84kcph4w4unc2is5mo8dml026sjg5wra62qwkysa78d95vgc4xwuilv543cpsxb89ib9hwxfp7iayj6w9961tt71jk945nk9qp0mxa6egmb2h9zyjimt2rqru6q3vhqjf5zgy2i2t90en6dcaxbw11og3ztxw59oi5ooiaxhod692ptngprk7rvont26ljuw78bsyoy3stkpf9j1cb96dy5kxhx6p1kelfhsqoue0myzq5o57igfz7b60h9ias1p17q284ik3w9pogypixyrc294wryhhqhv7ahtq3nji21lxuwung41g4n9l7w9y0zt863th57hqrhanqlq2dwb4nq6l6m0blljsl2gt6idwod4ze696y96tqn9hbmpixpm54157lgsrf57l1k05bfo0ekxqe62c2rf3wrgbzmbl0g0ndywqqmhxso7ueqdkpzv35wenaa1nqluct7mj04dyn5vecluvsqibh80nzqzaskysl3owfx10ktowqqwp38mevsocpnvcinfr6vz46jz25mca75k6zeohqdqoapj8xsbdh94hjkucxiffh',
                sort: 307460,
                administrativeAreaLevel1: 'ukkx75hs9rzckqdmd20n2w887f9bs38ef65u1kzpt3ciefbd1k',
                administrativeAreaLevel2: '83x6gmhnvlbxtuzpprp472haykmtvgaczvubx73k093nvxvymy7',
                administrativeAreaLevel3: 'kdkmrqgxes4lrd681x5wmq4lrtairu1ch6260ax5wbsgxlurqp',
                administrativeAreas: { "foo" : "bar" },
                latitude: 131.67,
                longitude: 29.11,
                zoom: 84,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'h4',
                iso3166Alpha3: 'l6q',
                iso3166Numeric: 'vwg',
                customCode: 'bvccl5jleg',
                prefix: 'v5f5v',
                name: 'hbxklpewtycsigtso5expifsancqok4pk3jjc3g6ksrxu0onvgaqfepwcwfz43hcanry76lfsh4qsvnsfj74gy0sx99kvcdj0i1l02dfu64pwnouvcd51g5mcfe6k0mmdkvnq7iqtjs4fz5icem7zu8islxfh17eiorh61typip4pcpkc5gi6p787xrifj6u0nqq9mxhcvjgrg05hh0w7awky5j8mxzwl3u9xl49ln5blqlwp5vyqzb48n3bgas',
                slug: '2xra070obuicdcdzj6zgkynuewvj6maholjvvd1mcbau8ne3e3gpjtip6h7qgtl1b5jsa5idl2hmdndfo9mmbtdfb5eug9dwiwifnn0a4rphdxprcsjalwuf47srj6jj5rk4c9c0f79clkuxsceabgff33umw3kskwh5irc09xapzmgtsdhdzntvqw6m0bmaq0un74q25fh4nvzj4pbd9k386br31ryzwbqlhgvkb3uenwf51dfevh9yywexyaytr2vkx09waoddwzbww07yyk8208m6li92cxrxzg3xr7x7jpdzyxbxudbqdfagnhks8fxqeant0blbkul5cg80y2v4v3bng4yglqjdhd3w19aysmt4lthsf0ukkfs2kaumlsiueff39wnvtr168tz3gqu4ygrottkhnsly5pn1vazqkmedpabpz8l4fb8vczl2z9ge38m2xz34iqnfqknvmxiebm1x699l5a0w9dq72dec2muyq3vfw0u2pqyp59o19t9mui90cr4c7crj8d221cxvle3xeoos9ekzbq62nzsqs6i0ty0n3kagp185taxd8lmq9pp6nlt4i9vv7paoxcjd73w2m7gb1hzfqwqky18q22c05i0nhcu37k2h3i8lsgpx8e7koon7xt8pw05rh37qgvd743oi6d4bycy0wewhg6i00093f0xvfg983dgbftmolzadv9x12mnlxkjdsz3b94mcvhpaqr5pq9wqmuo9b970obgimhckufy2n1yhmi3xwxkjivzvdbkw3xul38428f0bi2tb0tvw9mgz88e5u3zkk4yw0uf07ttts5om4s85264ue4igygln3qnb2oo9ooirdnbm1ipbug4r44jg0aznt23hijp2iqal1xwmtkku1ftezg6mjqx1de7usc3ta8wa400zt9rcps6zd0dus09o698wa7o8dxg7p0iu8wl8qbha7deodxvjckdz4sq8ye3xfqlcr47mo5bwdbklmmojy4r3c6b65pzansaf',
                image: 'nft0aj50xgjprzmknp2z47x2qub8wyq6nd8ckmo4pyj3gjzhak22epv1u17w956a3zedfz53ivujohet87suj26rnsrl9tn5u6hpbybqsoexix904j3xjsxsq2qhr2sfeo9xyxgod0s39epsqxacam77du21rxbhjqgz5r8nvgzxj7aa6fnmoq4d8i3ps4rnvujqti5rdfzehqtvzh6mb0sytdi8xwalw1nur8naer1ulej562jak2xoe35oothk5f4u5lfpd6f9bmllok6wqgzz3oqmy701rcr96vo07b6nwjxgll3f5w4hbwo0ctgrkhj7skth4utv3wnoogg97rlk31u4ccfgz48fz0yigs3geiscf608u8n0pboqvd08yb46qfb4tcuu9q9cdgs7wmvzsil7vir37iqvtqvvlqj0uizxcl5p10n2vf0ljv7im8l95oyynj5686ban09rvz29fviwzuv0nre3wejn44dx3quhj6orzis319ssjemmjt71qhwlla540m3af4pz2aemqqamumdslkls5iei6yhkqoen6f2movpkhdvt6ds5hzm1er7kkbhhvt8jdi4u1suy2qn7p9noi3lcqf8ifsxus5udy7wxl0pd4tq6dqmoql9ze76ezmq9tir1ff9ahc0wvsc6wlibkk1iaibic5o7ued37htw3fg9ccs8456b3rpr8enujxzej35urt5m6mw9yhd2zzysprgj2uueesng11voj5btcxcav37vxctlxd8qcriqug58owv4h7szmyiogz1mrwj87pf4q5uj0m8qs1c6yff28znubdhfy2v083leup6vcu2mv388nkutc0gqhsjqabqstrnck218204iopowsuo8ouiimd8d9317kgndfdeu214m6y7lg236iybu1bva83tdnpb4iss8cnxt5839b7d8w0f26oy0t8iptwfjq0hi57i36jpw1ovucwohh8he9tiirfu7b92fg1tkmb3ay3cm4l0ieo8bxxjn',
                sort: 317155,
                administrativeAreaLevel1: '5xf8rrrxhl1rbxncb1v0l2hk5giwve0kel2yfezqh4u937g9y8',
                administrativeAreaLevel2: '20rlwt9kfqors7ffbp5vzu4t3kn89k74mauf97o780qfyvkd1v',
                administrativeAreaLevel3: 'inrsf0zixv6w2608pay50tegminmmvrn843c9egqhykzkn64u19',
                administrativeAreas: { "foo" : "bar" },
                latitude: 129.75,
                longitude: 902.21,
                zoom: 38,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'm8',
                iso3166Alpha3: 'nyk',
                iso3166Numeric: 'aun',
                customCode: '12bwgjn9e9',
                prefix: '0dkgc',
                name: 'pv2uel9ku0lzodkdan4v1pszvmtli1io4dz9154b5cybvi633545hlxazw6plhgake7x5k3jlc08xtjyono0fsg7bavktgebsh1boiyq1fzn4k1s465x9ft5e7m023h543lys351yqtf9xpj3hejlc8i1mhec31h87hi4ce7gi3hwpr2of4azgyadjtefn9j39jsxftz1iacc77ip1o8orwwiholl2qzj4b9aonih57uu6gqk7wdzmgdhzp2ob4',
                slug: '76n59i8721hloyuf50mlr0dwu8cmncw5407jtar2hu4ew0pqi9cgmch7i7kslqsaxwk5xjc8wgad6oyy0m2tyngg6y6mdqed0dy8gphbqoo6d595boqnizbvhlzsgwsmp0cw9rxgel2wp6ez430uslyr2wwyy844ndvp4sr29efk73buwzb5uag24f2mrkzmsawxj4hzj53agf4c6kqegy8u6s4hgeu4fjyoerii8x6t9wxbadwgnyz3yultjo3kocfl48aig1uru4goeljrqptdfixp336oiz6wejyeud6u7uyh91exd3i5f7sa2zq3017f95mfld0if9plwtht6t5gqgn5npli4xlrx94sdr3fabchena5b6ygefc16mbfjy0tf2y2jxj59h0artm4yl988xpgqpj6x4yt7uer1wfbnqc46z2225wda789kyk5tptpi613w5usstayhbr94sd4u672ibr8t0ynltmwzt1ffbui0ukiw4bi4tkgn5y7mn0wwq36ex9jb7xlcjbzags03842kjk5g81b0371fxr1o7982etzi5r2e5nc6xdnwe4bbvxejgd9rphbv1rcofyap17lhvnureb568azpb7r97lh938epo79a5raxd2lsp0zol489162onh3ux5i3w8anart5lw39wgrnp8cftmsu4v14l01p9pdikbvoe99i2p405s899q3qpwhd6zjka1ajw2ipevkn725wfdrzb16ln24v9u0ingux2nfibdyt7tapec0e5jgoyy2rl192uo2j6fnwkhiaon0mqr525g0krem0r7c4focmp2nv86auz1lsfptygetr8easjsv5l9kv9mlsr1orqzlbku77vrb9cviax8u2jgdj6ppz7v7rbwvfygoxvaqzio8kzpryg1xcez3bm5jrrcdpdj7g7vrx810i9zj94aa6jyllbirvz4uhdbacpqsdipkg3yikuvk9rojjdbycv9qxtv8kh8ngack3mtlndatjivljp3t',
                image: 'leno792n45tn50oxm6k4wkp5usn1o0vydbo4dgzjge7212wmgge22u9gwa63c664kogss3u22wopibnivmejai4vk7c0qxqn01f9n5lnk3gd3nvgnzpk0xjvx17tpvav30by6eyw4kv5g2e8eo0vk4w3wlpmamyv3gxi7i2twuepfkvqx1tl1tpzafl8qjp0lksck2cg82kvetde63ezvjk0n7obrc0opdxnmie2hnkh46ri619jt5oxi78wycqkrf89viemmqojhiu84rkfm5s7wfomygbwkosl63iybu187q71p3huinkdaag2e6hre7p41hv6wkn82bjs2q7qqsqlpr9xygk9pvi127fx5pqywqjqqet2hyjp0ivkdk41l62oqx982i25nram0ttivzjkx3i6z4gs0hs705g3haca3kwj67z081otoswwug0pvcnsx3ep6ilgg1bp7kdgw0xnx9mlx6ir6anag5us790saeuspdur2jp2ke0yzts0gx92adyc9rxwmd65m1z7fvme31loosvhdxdlsi21w0h3lutjrsfjjyksn5ci8uj5j8bjgtozr39yiwuq1tjikd9rjvzcajslukx9bivkzv9tlhsj15rbmd2b0y04bbjoern9iwg9g0o59hs8c6up0gju5tdfwzpx7fmyswrxyovyiijqlt7i44cbaxrami8y7qvyi70nnewhlexmh7pb2b30bcy2s9c7bqzgwnm8iwjfwssr4fjo9vxf6p526fmdq88bfyyr225fpr2smkmpjj0l1l1boyxyqddl6u8tgbite7yg39d5qr73yd2hhvk110edngfidbeiv2bto2kraghr7b4okxmwjmj9ulfe508fz27p1jjqeeach1fqmsdhrdu8vznd6brl6uvvrnzc2oko7665c87d848vkx3wl1lfafqv5v1si7euiilsmwhh9w9sg49s4qoh7jwn406yzl9plqjffgx5zhfie4v71xtetmbtsadbaknhcrmomrgq',
                sort: 384886,
                administrativeAreaLevel1: '4r9ccogsq0vyolm29x6m8u6w6eygwlxgyvfqz0qf02xwjy7r3g',
                administrativeAreaLevel2: 'v0r1k2bbmfqywm0k3b2o1idpfgoce133pkvc88pggrg4daei73',
                administrativeAreaLevel3: 'n1mt00er7yb85h14bsfvmagemx63z9amgg0pksrrysexwkahpk',
                administrativeAreas: { "foo" : "bar" },
                latitude: 771.29,
                longitude: 188.65,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: '92',
                iso3166Alpha3: 'ifd',
                iso3166Numeric: 'kkm',
                customCode: '7o19lmpwxt',
                prefix: 'csef7',
                name: '7ky8d7p36ur2ei920r8wtyd262jjrphk8ma70bto2x127dsrvxozbejq38ia6ym0niykp3jwpjx25o1bcm5nzut7ouuveomvr51i5srtidzaikw971wtfdpylkdvgem0gzrwlxdaxa30qdpr3coah4o3uho5d9uu9x6u9nlljp1ugaykk14mwfbu875uhb8zmqgdqvi6ffdwz164dnt20stu3gp3qj6tftg6n8txww3jai4qtzx88mfajja3053',
                slug: '0rhh1rqmh5jqjo99ltmu92iv97eic5lenr2mh1s87r5m3qrfn7c6sglvehfttu81fvwvncbr3ccjb2pn1r6qoiy2a2t8kd3ua9yrd9kuzo232ufgex7o7ny6fp9z7bds9yvxqoiazf0hkzfy0pg8a1u9r27k23rz0rnhi85tnqd67sl1yu7e2inkh5yy9d0nkjal3iq18wma5g10c8k81lkoq1whdk8lgby5qopm3vpmcyn3aq2cz26ar0c0gc8ppsxj2uxs0mmrqld19yu0c4wkhmn22ozyy9aa42zanbg191rcn77x0w7rfru9lkr3zklsjntug9neteq422gymp2v4e4525mvh7pb6s10vktjh19b079x9hfsbh81chgu5rto7n0q1i4b4o0errr9ni6smr7qdiqg61qs616dhku3k6f9izz86h0u6yptfgrrlalwpl0azzmrbay561rag9c2ncpvoq7n16wqrwzca2d42ksqqprh7f2diwwjqyld74aaguq7a0sepi3gdh2wmikx6isogygmoazzaunok6e3h5xu65do2eouznokzk2ej6108bzix55tnn6cba3lnx7j3nw270kwkb1wug4lrjiwk0fmc4dlaipq9d9wpwof0vfpdd4yn1hguyabdlgd20x9lcqaoplig82pxa9n0nwkqtqu27wycmv6hq2jtvm12pai3t4is8t897n955twy429p0mh07pmalh3zwtq21qbn7727m4amur9g4q9ummvz77kx5gmbyuypa2zme2v3s59eqkch7wsr2wzp367v9iiif6o7tvx87xkrfs6kx034prlxr544fl1lq89bk79ds66b36oygkj5ftricjm5htulmxmpbvq0jupwn1jh73n4q50byaeh45mkmq4x97z15wzerdpugbm2i2aps73uxpwrimwaqfdtsflw2f9yn0tgqdfqwzn8bmqp55927s6nwx49bnbhqrxj8dghbvy54pmzuqylffk69fb8584e97i',
                image: '39fobzsp10mg9nyu6p9bxzv9dkb1liagwj02xlxp5wzx2o6unc1c4d3viynf1gbzhvs6gh0r0d2dlfwf5gjwbr6rssblqqkd6rrfstav8p7wjcmjaaar4868nrvtg09ap3azkrnccnsz4iusfitb06t0zzd9pes6lnh06ygpcbswqfds2e02n96or4izovv9akji63hgdh050uewxdo8uueq1noanhr5up24hc64j6t44n085vi2ugnicje4shyx3547z0ir0ux4eje7fq8h62yjtn62tb805hp63hkuw8ujd4xi2vybppmt1uxoe4n980kpdf4stqe9bsvjbbh2zekeq7fo2cvo0nxy3y8zbnf14yrim27850alc7z4dyd09xj7elgpvdmnc6k1yejd393qr7wa58uzfs9bg47349k52a4ulrqek93b18dgyut5cphixdefkb0kzmd9oqbd2s47rz9n8k3qexu9pumcz9dzmurjzjtoh4g3ots5uexlcacy4brgtntfdwh35baivst59399h1tggf7fg9och3rdvnj8rzyxfx2n5fy2lc5gx1bflu384ryyous3e0qvjboahbjtwowvur5nxwbhokhrphc6x5sil3hql2583rag9k41cn66k2xthlubdxc9vsjx2qbqxywrffr1ipmz9sy0sovz3peosze6kotnanbqycyd9c1nr05luyytl8bisb6csyfy6cxlqfjjbk47fzv5d42h2sjm03sphbg00s6ezasmkoxhueweqpb7s4l1jcftxbyacd9fg01cmfshbxaznof0z99s8pzz4i47y1t8ccr6ya9rjorjki7lha8rn3mgknqsts9zu0wt25kubg5hrnsbbkatz0935gcsa09faq2pk16oxg9oihlg6nhdep10hv11pwj5g6jlx18pegafb9bdqavm90htileradjkgd3ioxbhqjv9v3zvsh1i4wl2j714syhcbc9dfe3awe1edjao1fdzyhsq7pkdgs0j',
                sort: 734829,
                administrativeAreaLevel1: 'q6zogmbutthmtv4r6sylkmg5i24kl31s83s224yjjmj6xevqq3',
                administrativeAreaLevel2: 'iswwcfa4bik1xtmacfe9xmbcihlwvubyl83t096h2vzdxnds10',
                administrativeAreaLevel3: '7zlmdxcfwaybxqbqo6k9erin5524mdx2ebmpni9xn1h2vfusmv',
                administrativeAreas: { "foo" : "bar" },
                latitude: 470.73,
                longitude: 407.59,
                zoom: 25,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: 'v9',
                iso3166Alpha3: 'w4m',
                iso3166Numeric: 'ub5',
                customCode: 'c3ykmwjt72',
                prefix: 'hrg8c',
                name: 'fut0imexdlv6tbesudrihmfqy4bs1l19pomxg4jr06c0z4buq50mr7lt4gpx1mmalrd62otxpcjwevjawvmotz8zqlfi7r32uqg0my0cwph53nd5xgl51iepsap8ejmp0a7na5aqp9fzzvwqdnjwvfk5g29a0m5waaaxad74mnwv9tqbcabmmeik9b3ufj3i18318qb7jlt5awqm5p80zhtwxq8sy9l6ggf8borehjn9yqm84t777wjudiyret8',
                slug: 'qatrvv4rq8uzeynklzn6gqmx4tqzsu8s62b7zbazovjs3wueehr730y4e1rbziht7lenwwafzrghd8cyn7ti74idemxguyu0f98kxbh6k7me4qvyrx53fxi0mf58n84n8379vp94c6csnb30hr1b3ycoq3as9zm7p0xsb1spdn0k3y064pvi73hum128ikjt8ql1jzxpl5hfwv8tywxqva3j586hbfh4j6zeicv131s0np1iwkib26s6p0fa3ehak22o8qez3isxhy9ej6a48102dtuym9b35oozcftgz2rf9s00r2ao41tu8xsdsfpzacuk5sd7s8rvoi86sa788nl46mjunedhfdnt39li5rbcmwe0i2djir1lg9kbl2uw6ejhf1whrmfpt3r42iuwhor5vfu29tb7e3qplm4x420j3su724rpldihl1us2uqsy9lbky1mxrw8dblze0n7dicrati5o5a1roytszt4f3twn9nvzdrz4g1fc5wi8c7mlwzmcdejt4kq0bp9gi7x2makhf9lsuulhp7ytmx4hetlmj20ii6nos5ci6v2ap9khufwblh7e7qzvjuqikzdyasyt08dqavq9gj1rxo3raq5asflxqb2otj34pj3vqcx6bbycqnt9klujo8qhf3sipgly9g12y9eymnhv1wnosxe4i4q0qoctaerpiiujih3g12w7qwuco2t4xlf4whjo45t1ny5b1uiglqr55ggc50pndodypci7w0lu4jgrbjn8uhvfxqbnwjjepbms2xtwpbvdg32i9dmkvjph8ojx092hm1r7zddgp0cqvpjyt5u2fn8mydb2k8fejzxtavadokf3dn9h85w0yjcpk3hwul8eru05lnqo7uqo5u1b92rwcn72ludl3sxupcd8fwipk0bw0ag0xvupfkijie2l5flxlql363xdonwg4y53ct21zjw3hlztj55gitn6xirqrozv9ndpngmqw1i2aowx1h0jru0qus3pibhsphxwqo9',
                image: 'dnfsusi1j7tkaia95r0f7lp81i4u0lamzngtvujlduev5v3n6079s8iqfmo7l1u365lujrwr5vzh342uosb3k0jpfhtclihqlfr6728w4ovmhtedm21gp5hoy10ftfu08svxnslj8yq3m980zj3ead3sm7nzfkmr9ku7ndxjpg1ww4xqpinkgskbue2ngmwg6qb7ao4vtjft66va33h3ybf5xwrgrjxetewtp3if520b1wtp7mftyiwn26qdbbckggip23cvg7r00pebdcj9obn6lp92x9c95zummfut53geyc5npwp9qnjz8vk3kd3xpsfnhz6av1xblrouwe50kkl9q807auh089s4auq4q3ghqos7thy8psqdncvsictwogxw6pmkxkjwq67yr77r8wp3oibvepr2sa9hp0954jeevo7s49wqki4kix13vuknb4v06f3895ukn75zi3zeifpza47b5s1rwfclr49vy70w3w35sfucau8zg2rv0bxzbo284zy0f9hkigta8dkutaabfk5fgn7yehomm8pf5djdao2g7vj8y9s1frcd768he18lcqkdkr214n1bwmd2gdggk1tnhot5heaa1cl3hta3mchmnb37bebzz6dydwbsvzvwjvasu5bqpx8mjy5fko3m2g4wdkp0f0fk4yc4gpx4hbveawssw2yfutspnvehfucasblsvz3hulehg5fx5fp4bcj89ij18hrq0qivl22atlbkq3fusbmrasclk48loh294wa8zuclecv6y71rtgkm7tu49yf3vcsnxzd9bzxq8wjszxu9gy5h7malwdfdpzx7l8poz7zybfkwkqy7a9z5te2nyees3brbvk0jg1knm8s032relu0t5pg3nff2w6yfrim2a94j0mhjrhzlmp4bm725xe7wl5fr4adx1ext0g3nqb3hnti0esfdum6hxn7nj3prr0bfp3cfhdf5bn21hzukli974as2xtk0fijk9r0d3pjz0foss2o3s18y',
                sort: 870868,
                administrativeAreaLevel1: 'lvlrdezonknbcp53jo1umbf7hj6g8ujr9bb5opr1ko1dif8rll',
                administrativeAreaLevel2: 'ymsfu0lkz9jcnne9jeffpooui8uhn1ke04ff0ra7gt3khfa3bw',
                administrativeAreaLevel3: 'hmbzsz5heeex0x77t4hletfeyykp418unvtmnc99ra8dx5icxc',
                administrativeAreas: { "foo" : "bar" },
                latitude: 639.73,
                longitude: 441.17,
                zoom: 592,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: '4w',
                iso3166Alpha3: 'dx5',
                iso3166Numeric: '8o6',
                customCode: '1wrp6r9kw8',
                prefix: 'q3czs',
                name: 'p0n777t5mbvltr0vkssoqswowxrxj57axuyvgz89wg3sj87krt4ot3su2yc7luz213azeoyh3hp4bcqwfda1xrtnbb9vg66cdbalcp09fs749sdjcxfzq45w83ocxytm2f1eusvm10hf94q2nycnmxvl0xpyhsin4t4aoue3umx98hpz9lklfl8y36vwkz8sg0guzishk4p0h187re3re70xnuuwwnxcbj1pv77iduglkv2q6eiy2a29d1v9mny',
                slug: '4wuhw209a1y1c4bbxj9608ifuar96jeg7rbdpadgy6n21ak8p3jsxr3jyj0kuwsfthimjjg9iwl101orfsxhmmdvcy8bjxq5gxaj6ipmi6cngi53heurl2a28r09av49ea1r0s3cy3dnjq2t3119rtphx2ho3lc8uz34jhlo9o1wtx3bll23065zb28twvpwfa4rg0yvlzl4m765sci58fz36ca9uhz7z9l6l9oo82p1ymrc1e5oq5ptqy4dk1sb6f002y0idbr7ah1y2m23qkfoagtvk410vumrq3fr65l06f9dktc2o8hvxbkppc51t64xmvs4ns11ej2eb2zyrngtzpnsgmce4es5g9cxigo0x9eef1tyuhevgm92rfocb9ws7dm1z7i85mh48lkpsmlhetzvl9nvbu8qfc0lp69l1748jpynz83v6f6nfbn0f4l8c25jfv0meruk84m4ynzzt6ybcqdhu7ojn2slssmj4iyawdnh2bf5fq77rpkelozgoglymagul34l6uxu8h0d2oavyhpgqw36i2ggxmiacoib04m2dgq1uav9gb02dhbqiji2mjayv003wukoxee8zgw5s2oa4zg1whwht31q9fwziw1snonzgb2d4hguu4gxdrs7p0j45ab1ps29ygylf4wll9mq1ru0p9c4ex5pjm96ivcmnd9h3x60gxs3b1jq3iqy93r7jm4wqgao2sn5t598wrf6r549r7844ozhby9gxjg2b8w8mh6tklayrxfek6j1hcceqoa9q01xsnnpd69tunia6d240twrzcm7h2873v0xr0myhsccuu89xwv3jlt0n5qx1u3jr2pay37pgxincdbv9c8i7nqi7x1yw9gm98fdqixda6zxreiy1vov0oqe7lf5fnek36gbqxvmseup0nqz3ppnktoamj2lub3vuzwwgqpl0m69camu6c77w4xxtwslhaqvw0mp5kgcw0tqmb16rd4xzbe6f83b22tk4worizjcw04mw1ce',
                image: 'qpi2sgmc64amwlhr40ndp6fsnkx3jw2xz9eajf5ngt8f6fdf5sny7yn9kr5jhwpn636kp7ai47p90yf1fz2oz2l91ecvapr1ap8n3i2fhwizy3k6xq50xbj41ddn77xy41nlajon9agvsc4bt93kv8825ppefaqec8xzr4671pt3falya2irk4krtfvlb2l5w4k00mneozxfpyd7cglxlkwqa35f5ndal6ceg5wv9k0kqyiyu1woe57jervvw97xzxzb7y75ljvfqyjjdtmsyfc408d1ha7ig8nu4i97ztyyb6dlxk5tg5183q3i1t6txodo2gl4nu40igye6z241sox3dh6yws86496lv3ha3bmclse5zva0adq1k8oc4snt8s8ckb65udp8rdyj5nlkr1qqym4hf1kyrr6ljqckraix3luef0r9aqqi2643x3hmh23mg5518051tefkflqq5vdtx6ttaz3ixompwhkl9so7h2kbr02akhebdxwya1lojveb8m7bar31kvra0mc4fcit6ejgd196f49wbk84rigweqb7kk8x1eesra1mqjvjkdg82jnz0s5z88vgeo4jt6l2uk12fuke5ai62yntlyyqks3hqh2qnb82ysxfwg5q77zomarcvmi1tm4oyweuxza2sxkclhn3qxktnhrds2psg5ribz15nva0ohjxgd6b68n7q6trunkovzmdb0l2dgaihlo53b1fl3nt7o3g88n17pmsg9njqcuo3xvc5hu1d7a5ex0hvyu5yj0zehbpcxqb3b63gy3quxfwoh7cubpxg8c1izs1xpa333t483b4wedbuxs0j51m5e6bvo504zrmuqjeym79vsf7l3l051c9err5tyiiuz3l2h4lgz7xtlehsr3frptqumbnfrvl9r4hc5tdmny6osjda40n8wigexr27eoa1n6ssmk4mc7d96xdgh61tpstdda43azta8ivexvipm5sv4j56ln2oe1w98kbbvu5kf9r4yoghg5',
                sort: 872776,
                administrativeAreaLevel1: '4zis3a1z8xlwvfybpisah1tyfo505nthkcik5hnrg34l27zadx',
                administrativeAreaLevel2: 'eeqxhsn4l3lf47yicap3xy6l6yt98er74vnry7ywh7sh8asrnl',
                administrativeAreaLevel3: 'ehg5zijcj2mo3opbpk2gbm23hdoys2lst3uuhjn7ok8bwsvj6y',
                administrativeAreas: { "foo" : "bar" },
                latitude: 289.47,
                longitude: 861.17,
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
            .send({
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: '0e',
                iso3166Alpha3: 'uqg',
                iso3166Numeric: 'ykt',
                customCode: 'uqxckoqqaj',
                prefix: 'aa41t',
                name: 'zmohkyxs4dx1ms1lnl2g1vx1h1lfim7pgnqc17p7qa1on6spa5qizicrusu91kllaaj09ek3rtxoz1dhg8a53znwhmecspp4eee4au9bjn7ljvrfl5q35vnclzrunbthioj1v9ozxrw0ei85cg2r6lid4od2cknzg87zvwhadauvivnv8u0slq20yvmnomygcsb87p25905ytgn6ld0j1p822bnmytm1ya68dg266bmgkl9c0rx6mcf0zr8rqs1',
                slug: '6oxct2qvsdfhs07jhchqx5kvvwt5u2xfz4n3844o22im5vzrsgx91e2hqat8ub8y5ieu70bzas84v9wtwlfencrjcg11wnb3je295lyqvcjzsnu3jlv41ml424vkijuswqd1d99eh1k02b015p84c0vwbraajkvj0kxsnfnsb4x7p91n70ccfcultc21h2u651nl7z13ha62xv7z3iwd5oi9wreyswh0ef1fhef2hi2398t9d2hl23wfuvrkhqbt521b3tx61ptlok5jneqzmon1xjypes4c69vjw1cx39p7d59k05a0yjhusxwxuo6uawl3tragxiubln48zgv7bpgrkdetdp5sbglot6fm8xs1kxz2rke7b20c8tx464k81sbqc7oqns2w2rry3li1mfrv2vpl16mwluf2dg9yruyk87sria8enrtjfzsrn5sjrt7nkupk8ulfi3v3mcoh2wivkb49c107irasjyrexfkaunzgtf8ebtnllxbldp70qn45noiy1prkzxk9ss5bns834m49age6aeqjfrw2izdchovqflkqdiay0i2fw1tgsbad0yl06wr4evffx7zlj2t462lfp66how9d6vjjwu9vanplkkylk3md7xgf0a3gkyofwfxpb7nq0jpdjo54eyb9ri9cr8dikhjjftevxrhwq1tejyznr0btgturkqxc69zyqqqmx6xtpuzfxinuagaos6ipqucyohdk0szxg01vze9az9tc819kz8sgev15fjv0b9ig1845o25lrlkdzi4nf6c2g4t36zrb0abw6ij3pp0f97s8bc96vd2ixs58278kqkc1angl1i4w4rabf8atl3s9hagce1w90puwd72925dfjpu9hirajum5l4wq25s8l36rfoev9h6rwj737ex6asmduz6hrbriaajklcqxhb5sequv297dqosydberronlfrbfyvitimyk465hvzrs7fn2h09yqzrtn522oj0g1tb0x5f0fpk4dlbdthwe',
                image: 'd67675duy3ob7jvxgqqe30suzcrie3kl4smg7uefx0pcwiqtckxhbnxxaf27j3erzmpsiftytso0dbsnjafd4zri3sy3fynlz3pv0zvksgns8jrvrnj8o6ixbgujuk88tm0mhxqtqvrilqu75x0djakrwepm9sevuudykjh27qdsqbqx8u0xi25301aidhagc69kj6etc5i3fay2p37jkjsl2sb439izxyimbhq7tlw2dfmerfci2zcn4eqj8tovw7p3595h83gunm4tjgcejur2a65ylxho0s2fvieoluejxwnv9inj31vv2p3p5gv1s8in0j0bb4ip39xtd4iu3zbs7x8ic2af9fuyk3phg9cn94nz7llwbabzyayc3e539rpjduap4dnnrb981i1jecomii6qkt1p7fv0v4f5sczyuwf0bku8xvfs8r8snqvbe7h975t1hof7p709c00kav1kerjzio3g52fjhy2x823ueqh3t5ndhx2dh7shd2hroms5cqr8qf9yjd8d0g1gjh217tqjyl312twwhnfb04t2i006fiu46ehy3ga4bdepqzv48ntavvxgaebjo7ejbb5wbth9lrgs9cni2y3fxfgvdztrex7cvp89u45q9hfgsnmwl46h6t6fbk9sekp37k1bmuqs4p71p382ky3muz0v22wcxprkhvm3nxxhkosirkvplt0xw5vkm7ovuqflsycbi0nyjltspigpee70qy4xb60grq6ophyudt754y3trxhsv9ygu3rnkijj9fqwhtalmljag2pumptstytq9gp0g5amphl2akif8lnicmu2zq4xatxrfcf4rltaemjhs8g23ps06duoyltsaxsb21uk0sikj88b8k6dsrohp97sdktpmevx3rb645gspixpz4q54g80l64kwi70kooyprtjjkh5dhlhqwkf742n57bo3ijl39ysv25lcco6g0vys8q52419jkbu4ggzmvb7iyed84jf0tvfxo22kuf3rl9y',
                sort: 732184,
                administrativeAreaLevel1: 'je74yxxh6701n74qjvp28wyibbmm2vu21wymsc0og8uzhskxa1',
                administrativeAreaLevel2: 'xb5wslyp9c55nlipq2k585tcrabi0zh0f1wutea2onm6pgcwp0',
                administrativeAreaLevel3: 'nnwd3ipha0c57wje2s2g436cuditat5by3g4dlj1k0a0gta3lc',
                administrativeAreas: { "foo" : "bar" },
                latitude: 44.88,
                longitude: 119.32,
                zoom: 22,
                dataLang: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/countries/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/countries/paginate')
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

    test(`/REST:GET admin/country - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'b1c12888-ca1d-491a-bfa2-3968732d50e5'
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
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'c91e0d62-cc23-4b42-a7ba-42732b504896'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c91e0d62-cc23-4b42-a7ba-42732b504896'));
    });

    test(`/REST:GET admin/country/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country/c8f71b08-1ad7-4989-a2fe-90ed9d431832')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/country/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country/c91e0d62-cc23-4b42-a7ba-42732b504896')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c91e0d62-cc23-4b42-a7ba-42732b504896'));
    });

    test(`/REST:GET admin/countries`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/countries')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/country - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .send({
                
                id: '59992104-9179-474d-a22f-036ea5019ef3',
                commonId: '7f0823f1-06aa-4acd-87bb-87c1dc0821bc',
                langId: '40fd4828-c31c-4c96-9779-99804a6b7479',
                iso3166Alpha2: '26',
                iso3166Alpha3: 'ama',
                iso3166Numeric: '0oz',
                customCode: 'c93uxacm24',
                prefix: 'vws19',
                name: 'ah68kjuyvhn79bnupqvp23w3npwff1mewgc40hslsuvvktqzavu6s56s0yhpc0uz4sa6p1uw7qzv2duzcr03lai7dpjycvuyxem2gj7g8zipkhk0v4uo3bglwg1ceh5wuxdd50xzawvgv9qolj3q8e25xle8wmw5425yg6zcliq43m9vh4bka9lhw5qm7hylw0q9qdgpcmigonxs9bmvwe5k8l5bdj54txlziyzxgg6e2z07sbogyl9kvhe1nui',
                slug: 'l4hwbl192mlzxrdoqc2zlkbikifh943dtosvkjh29zyr2semh6ga8o7avq181rw7ppubr3upbe4clntemnavxcr0k3oy5f1pjgsbuo91nex0jkdxyfxsll09lmowb39u8wcd8p5bcw30va9jylawiz9srn28ogjs6vojp0jpwinks7bu4k7ej0ikqvocn7fq2t8p1u1xfh00z7hsvyy9u6acqfklt80nqt37hutwtr7bxjslyvx2fz157n4nebg16w6akleqlbdnp0j79wocurgcxr014ytj2v74t96d0m1e1430fkq7iq79nccmrcwwvvizgquanp1a76a18xnrv8jodcdfvni6hywxoanca7b1rg1zr45fmm34yehm13ao9ftp27mctauhmkq5p4w9z6yoefnuhp8k7acdkhlr1joxvxu8vbq4xvxx5i6zhj11gjyf39u1canhk3qnx3tfz73uy75j8ge221qyg3rip7lc1f5qqmktlke3wj1fatlqayyk06bj3758hs3mbsku661t6id3xq4133t1z710e5mso5bsveq6aqm8j2u71ecj2oi514jdlrpslkb6ytrdgj0csygkrvd3czyl84545ww3jdab7if2e37b3lcgi40rz28rpjfumjyy1fj7ilrvzw7s55tfe0aztlccajw570nxciib5wdvtwlp7n45i4nz9vehtl4s9tzrltrzu7gy8mhn2uyn1b3v0gts2m85cq125k9918atrh98kklsn4doqmk1tkjw010tipabamoqf6ey7cguegk7i59kv9m53npbz60wy4trqg3m3ohhbfzfplowt2ufrijmyvfjr0dg74uf90z6dgvvih9wbksqwggbhks4pjsfcn7yrv0n9jjm7hsnrbpiki11y860w1jd2joykf8sc4i29emedv7i7bekkauj5wvo8k07lh6p61c55zbyils44djsaedmqr08m749lq26w18vz8xmjishw673s6imvnrwlwuyrw5f5tfd',
                image: 'lr22kui2kz7j9luzuin2vaogvm2viyj1aq8uyvap4y8ma2lktocca8q99h55o9igy6glyu0e9bomg5q5e9911ccrfeohtb7ep17cnqcgvlkb5t03l36q741oiopkqwervc276850qzwg7ns7naa9xexbzfrnt1nodq1tpapapyr7exnc12r0c2b3bokw3eosqj2en284n1t56i8u3hs65vo0y6xx8qis88wc5ls52vxeprmpys1iebjwhmqckz00b6aaxukn9jymts4nvz71147wyxi1xdb053hdy1c1gz57h48k5l12lhy2ji1untwzbvql34f46bvu8jxxcjd341dv790007t0thtmdg2p5pldqzmdbzg3x5pv3anscqj07i6aaxn4y5o9vspc6s7tzezlxh7k3y9ok25ckbprf95xd12pdiiyu17blczxp30tg8gmhpgao0d9m61cup79iktbe27zn9a26bba528lskg6q9stvu6tkhq64i3etudejd2m98vkn1c27dt10fx9dfhfz85niw9nbwlb8p7cm5syh35zm1dwxid8lkviqmk8vh5y415flm9myjmgi7jjbxhltklkn72bqx7ghwm1gvmb11h9w9s4wdjprutudw2i1to37cb82brxnum7a5qgbzar2rnx8ng0fjysxuj6kz5mjetzcbqc3sh6xzm5q2eci1rl7chnmnsufsck3yi59vx6x55y697nz7ir4ctallb2dvx8piso7gdo7p5mcs9xwkmb3jkwlivyhef1m44urnf1hverv128yhxc6o4hq3kxki1jap6x5kh6zxfm79v7wanpiyv0zwubruf866e0mle9ru6ox2nptdbccwp7g57bl42yghlopewvjshg040sezoz8o48azok0ofha4hw6s60p14iilau3bo91h8cc3e34wva6406ws0stj27m7xtmfe5yh05ixb1h0y8fdsyqj3dq22lo1rku64wbrcl0sc5y8overwacxnumn0vthw8',
                sort: 716219,
                administrativeAreaLevel1: 'xdgnckkf4tlt2yg28d01e1ln9kqc9llu28grpe88ghxnegs5rx',
                administrativeAreaLevel2: 'tdws9q0xln1tfnda12tyxev42gu7i2bionek50s0xqgaqjo1by',
                administrativeAreaLevel3: 'z3to7qaccqradmqxhq91o7d2fzhfz9r2csmtkn1w56w93yaynp',
                administrativeAreas: { "foo" : "bar" },
                latitude: 415.46,
                longitude: 740.81,
                zoom: 14,
                dataLang: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/country`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                iso3166Alpha2: '0y',
                iso3166Alpha3: 'oqd',
                iso3166Numeric: 'nvt',
                customCode: 'dz4qpb6f8h',
                prefix: 'lg0cr',
                name: 'rvd49ojvohta0czzhzs8z9myod6pc1jdoi1f0zpuosibbhw9l6xtzvgz6u9wul7nni3ey3uio2mco516ux1v78c53uu59k0m89l7tazh11bhkggdgipfbxg6udl55dqghp98bjzsw1r5b4tfu99apvdzip001ca6phmndhrkgo1eb4ire9eynvl68fhsk047hxtzk6m4u1lwbld9ih2kbw0jvqvb7ttvo4m9ojp3d2p0e3cmno141o57ts2xsxz',
                slug: 'xl5zhjcj5v53d15g9334hyqww9v8i52hvznribjugjewir2b8d8txib7gdxbdmzlt7x301hpkompbo0evjvlg66m2e4gyz1hiznje8cqlz2xrqkiinwjh2vpfa4msviktjhn2vxwxt40z1z0ob2vkz1mz0dj4u97vxmjjqbmep7na8cmbk1scjrkpyemc342jwzguba4s6oqp7ca7juot8iuvmg3ul0xojtx084aam49jmsomd91errunzcjnj8f1rvo3k57gn7kka5magixqf9uymmzt45tpy97rc39ad569328pkkgmvympcwclimpdx0n7z92mvwupm96nsz781sjn6544254y2z6npzctq7qx2r6ypz578mnx5i8c4dlzss4yxnfzpb66cjbjn3w5zoo4i1m6fq6vfcq11cz2mck7g81tdxlfdkud1j7o5bcchy6m6jtpb2o5cupxe6u1hk3vs5scya36jxwfa4ygt2d0x2g74i5zx9m9lbkwqmudjd5cxxrvlhefasfqb66qzbi0q1kcpuvdku2qqposa53pvywx4dbretj126gz7f67pmmhg4upunkvra80lf01pjrh5yocnvfihdixzzxw3f4knc4kmqunxfoiaueceoeck1ot15xhyeofq47usvk4jdinihxuqjst9dgyuwilxmh9cldtchjf6haenw1i7mirufg16i6ardr22tzivga8gej67s4ztvkmw375q09ns16i4jt6dlzpc7qg8nmxj33ezuivm3u3i3zwcdu0jqtxm7n85f3nxmi3wiaa3yn1lii0kzht7ygxu3hxyoa834serdh6n2rhj9rkwj107q4um89m8edgw259ullmk0ccz04dahg9kidqpl9eteq4n3hlyiy47latcz60nvhhq9ptl7ic1gl13exyddatcncrs9a4xvbe381908n35zk7wjvks3hd84tapvu6cpu0jnunfgv525daitf7tuzrbe9gzh6pc9vee7fecjiirxk6irl',
                image: '9ia3ug1av9r025nahaophmj3wkqwtshucz71a72tedalro7k90mvfe7stsdiqtunzsglvspy3gphtlb79ifcq8t1c8ryw833pazq5u947m3xo6321huvtg39rs2zi8zi8xyx6c9j8arfebnule1smgi4vce9g56zuwzl3bucxwtvo25wakvg3zt50nabrph0vi8bqifgli4g9luy6m7qyrkvq6uw4v1qc35sadho2pbsqxfrt3b1lcxu4r2zov0azfv6675tildpu5jxs76pcq7hno6oul0a7emy1rwmq2qcd2m0txhvwmn5ojvsvwriapb6khja39xbvuugb9re7ged2o3msve8lf2te5ut0b8ch7d08h0n4eewgy3xq2e4ocittpvxiab4j9pgz8v43q89u6ky0d9vefo5jxbdexrv01afar4p7i4jt7cblr8unae0eny1g8kq0nzq0oiutvlf1ktm1ci84qq3wtux0ijziwp7jplapiuirl4deranqmeylycdg52ij1763pkqie2etbxje9su096c4bx12oym9uk9vqjkl00ym55jroxouf8or57zxhsmygssewahjsigs3itxv78t6zxq7g0ozhlmal69dic4s3hcmpub96jsulppo3zhlz8b8kvz12rtnxaup3ebg5gjt9a61eoxze8l6o4rmaja8a5h3kp8xkgqa9kn4os6nletq0w9dnm00xm6gtvam7tzqz1rdpco8ltrd10ukhf1x78w49swsz5nsa4mu9rtnuquox5avdhb26nfglu2y14hk0mbcjh7cjguvlm5fchpit6w10h76jmii5eaxdxd9qis9tyqyyg7lscvdawvhqmuc6rf8zen6as0652g9kzzva3tb5886antiytjpluvc5nqc925n1gh0ovk3avyx316axdbrlbkjf9ftgm5yuq225wywkyj0fqo6agrcyj9lfgbz2vj0q8i194b15mip505lka5ukkx66g2bt72s0fihs2ywylol52',
                sort: 988962,
                administrativeAreaLevel1: 's1xxyt2wpd9oh3c481bjgq8y1od2a2zyw0xstybbaftp8b1uzt',
                administrativeAreaLevel2: 'znwe1owm9w0qd95hywlxrqp8jjion5rvueac0ugsjclhx63fvp',
                administrativeAreaLevel3: '8rh8ras5y11hkv7dqwrvuyxaf0og1sqo6xx1gmuzair7osl59e',
                administrativeAreas: { "foo" : "bar" },
                latitude: 33.27,
                longitude: 345.68,
                zoom: 30,
                dataLang: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c91e0d62-cc23-4b42-a7ba-42732b504896'));
    });

    test(`/REST:DELETE admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/b762510c-a70f-43ee-8517-c85b58b8b658')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/c91e0d62-cc23-4b42-a7ba-42732b504896')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateCountry - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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

    test(`/GraphQL adminCreateCountry`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '65c671bf-e64c-4bad-bf8d-719e3a7855e7',
                        commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                        langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                        iso3166Alpha2: 'i1',
                        iso3166Alpha3: 'f4t',
                        iso3166Numeric: '2wg',
                        customCode: 'sjvse9dmy9',
                        prefix: 'cb93v',
                        name: 'ofpk1wmin51czxi68ocqroj29ggeafl6uyiuuos82y40pjoxh1d63goxlwlwb49wscuanm9o3l2m5wrqfklud3rlidgjm452mt64wz8mry8t53mms9kbwuwq8nih5vpoultf5yygbbwoxsy37oti6zjydf8wy1dkdu07h3tlbppqhgz87y3j6koa5ojp8l8fv2g2gu416lwplkyjbw49tn4b82qmx6sdzc7bv6i6jvgsvpkp229rt5jqy9htaxj',
                        slug: 'v7u56wncdcnx3j44h4dec83n568rhc12k7tn6ajkcf12hbpq0dr0lzw2p4a7770qitt362id1qdrtw4bygv1k1q4rndheqqk3dgzwudc4pzvy5rwh3jbioe0d1x35n2bltu0kqivu6jlfoq4wi95joqu6gbbj26q7bmzwicg2pf1xywh5alhbxmdezxcvk4a6711np83sd1qngn1wguikto8zef5vd912xek6xn1eksq9yi4nthkg1e6ia32oxy5z4ris4xu1of7zzbpot9knytezm7mhzy8hydq0yt40qjt16sv1q5lmqu9ynufmc4x6gtz25dgke5rhmfyfa2raq0bsrnb89ytsapdcc52nxu6f6qcxz1lt23z029hzagsh955b6aty6w6mj9azsphpy6x0e5jw8o2lvcqikyi57rozj6ui9a1h4fvyfphgw8xq0yp2zt7jo0yj7aiswvaqg669i1i23b563kc3h519m43afjra3jl763h8a1gbxjupjyw5bcvqb0geake4cupd73xh9gi2q455vfqc484zmheojl02isbzqj1nkqb6cmq4k51kv7cbmrec1wevgo7vffy07jn0bve5kbyry7nbe40mxgdrerar57ui9z30dzt94ntpsp83j2zxyh759ia21lh48fqkv6aqj1lnahx1l3z6apv6fhcpgkn15mi2d4ib2t624fbn09qm13u5jas1k3r6o4ms9uhq7tp39mnfn8tjvjqnwcqid7sschvj1zieie3zc1cut1tgtxiwy137paw2pl0f4fqrhtdgf1uylzs1rkhdrbzmkqh0860j1p2uq4wytl1k1ck1ddwghm9zonxd0bxg54p95tsq31t7jyi8wecfahbbiu1rqzj8r8t32phvbxjc1bax8zwb6sb1ex64drar5njt1qlniaep3lzxcaf4m7f0i3mpjc3qu2lfbb9ca4yytjwviivwbi06t83bsairow8lmgun5cpc00t3i10inx9ozdr3tkd9ray',
                        image: 'vpfcyezrbomdwmxvxc6slvgl7qk5oayrbh3wnc2vhszvglqd0m6dpqci4z8giwubj0xdznf8goaxoh1zbrij71u2yy5h5cd3phqbikeuiq3whhht1kjwjdig8qa6wrw115xuuqwq79t6bv9swc31z6g8iohbp0z5b3pcmgar196vycpceezfbsinijkubfdf8dzzea6q2qr06dpmhc8jqv9gs4854w0vf02m4gxo2wlmy99ubktpja2n4vburs5hi2inpwu5zpdw10gk2hcmi6kfgx0ey4e96mynm2hbfa83cpfn1mjim1bql78gdg93uacz1s4zczvv4vl9euxzsrjcrfzb8qowijdy1g1ihr7tpud4qsk1a5sr1ki0wl2wxz7lkciyfxqtdnjaj07183qx9592kl3jx3zlvnntra3q0kgeu88238iyxx1zsyrbgu8ydx52kaoyi65rkfkkjhxl97l5mahnqaja3727f3dyu4w80sscgkxn20nx4crh5ims9xhr73tbbzmkvila8oj8ezmcro4l170v5m1f0vhojkfssvl9olqq09wl2h8vde4dj0j3skpvc4ewdmyyml68r5ofiooysgiumf775pt2m99v10x7wk6ovhupkcvdeuivor4vnjmtw1gx7wvtrm7tjih1epa8d9zhxk0km1603h2xd4l1nz19n14w0zckxmosqxid4ics2iinx64pcojo95qhekryqeii34nglbyy1mxmg2fz1ruc0bafbwgb2e2td0pqwqmtsitgd2fbqtxczt7fopkdve5re0zfbt35g5x8m936jh41eyz0jy9fstix97wgrug16rgbulxrkp8guigd3xhn5sljq1ujbeobfi2uz38yepgb62hwb35dt0tmbx5n4hrclywhlnc5nduur4ka5tcefpqpnt3quu969k5at1bc59bglvi4pr9yrykitjz11nqlbydgpjrxphp2xzof38hitm1ptq6eh4mive7tbvoyejj1heah4zqg',
                        sort: 393208,
                        administrativeAreaLevel1: 'dq40t3abojmcdtptjx4xk4jaoenpfz0xyrei88rknqehh1ahts',
                        administrativeAreaLevel2: '1bpkxt8u6x64e88jfriec1ddhx51702xr2y5tafu96dtkjjp1g',
                        administrativeAreaLevel3: 'a5qfojut8qwtgb0dagu0jcvhgmvyxritjx3qpfdj7fcu3vj7ce',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 897.30,
                        longitude: 977.42,
                        zoom: 91,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateCountry).toHaveProperty('id', '65c671bf-e64c-4bad-bf8d-719e3a7855e7');
            });
    });

    test(`/GraphQL adminPaginateCountries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            id: 'a3c50bd1-3b75-4599-b683-5ff4bcb2d48b'
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
                            id: 'c91e0d62-cc23-4b42-a7ba-42732b504896'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountry.id).toStrictEqual('c91e0d62-cc23-4b42-a7ba-42732b504896');
            });
    });

    test(`/GraphQL adminFindCountryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '52ca0d1b-abb0-4908-8e30-90a0ff625e2c'
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
                    id: 'c91e0d62-cc23-4b42-a7ba-42732b504896'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountryById.id).toStrictEqual('c91e0d62-cc23-4b42-a7ba-42732b504896');
            });
    });

    test(`/GraphQL adminGetCountries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        
                        id: 'be34158e-c713-4055-a64f-c03969d8c7b7',
                        commonId: 'd5ae179a-1f61-45cc-a1fb-354328821d52',
                        langId: '35f537fc-deb4-4a9c-9bcd-79a9444433d7',
                        iso3166Alpha2: 'wi',
                        iso3166Alpha3: 'pv8',
                        iso3166Numeric: 'xju',
                        customCode: 'qdk6ec1t50',
                        prefix: 'uhdss',
                        name: '0yua3y5ksakwi6fogtmkzxrdr6zyw1w44eh17qzazru65rds6owbp3d8ipre4e8mpyhxmf951y1g7j0fhhv0jzv1z1xz57luz9aog5lzd46irlq1xnqsguwtog9s0cb16k4hranorn2fc1xfl3spuc677jykvz0ayzvfczuls6dc3wvf5p0qj1s7fi2xhkkin8fr99gvja4h90qw0pqckc7cehoi9ko59w826eedlmaizlds1n5wmule5u6h0wt',
                        slug: '5twz5rpurtb7jwxoq3ilx0ia5xfagy9krkdhqpv9cp027tflhcprrfqrnym7qy6sqiky57v4soeiqefyv35kfggf1jrbpasrzg4vr9yfc3dfufxzt0kfens101p2xm64tvxp5txh6o817g0lgy9v3ndqkgmiq394u23cexynod94apxsp9y6202ybfqjy13cr68zb3hs31746ps291rkr0612wsr26sah51q7unecfpi6ls86vcfcntewfaxwau34rryxck4ozwbgysuvnvv3nhqtnajggc62ujpy7sd3d7nfq094w9nlwr7oj8hes6ah3rydil9j130mau1dbtec1skd991b4l9j20wkfzsao6mz6h7fhgvnb2e3sz42xvexux7umvbef7v0fek9fa2prprvkx1h0lfl40andqbwe54gbvkdeupzp4qx6ph6zdr6c4gewr3d1wj9031actuhlct11r8j518b2ey5o8102okq4o273cacuzaalk4bk937qeeck030op1ea5k1ye7rb8aalf2b5gi9d1733l7zrojej0okt7oxqxr7wxeidkemhn1gwh2b5t7ncbe3yy8a1jwkw48yza78rzxl243b01nbawm22xr7lhqtj15s52she3zasr2jp6kkn0linc1afl03hf3tdjdtvx7aqzhmg2wv7dq7ok75vqb9g9z4j41kg4wydv41r2rqzy96npqvvd4es1gcn58n28qpw4238qtq27aclr6kv0dgfwypcigt8ac093lvi4vrhsuuyt0w36xmuq4bvql5jbodj85yiunw2tnxdhdopn49as0pqbn1111arcykvp11932eawyc2q79q2z7498iuxpuo2ft67m4kz0fbhgyv4ik731eai3okrobamw3zqxg8dl0kbdzgax6w3jhq6wzy4r50vwbtbmmmy53omiorvryp7kec427rvp916povaqa1ourlp479unxar528dp31litv2zhjll6u3gjvlbwv1f9lzpdl1m',
                        image: 'cvst4b38lnrt4a60np23vh5y7g1dvey1al04749d2dao6c8djlrpqqz8fzk30jvnpffwen0abxowo6hrqwqeit80y81w3lbi0cwq95egy1cgihnyndpjdz8ges8xl0d0jb36s7s45ne73aafrmib1txjehw49awct5s9qejwv89xuqc9qtnahbztrbfdqksimu7sjtekih8rw2g2dhn9kuizo2fvf279od1uqh6o73spcpngswbnmsqj11nn9h2rmr1icxnm9ea1p23j5k24pwz7kcjnx3t4nd6toh0e6apxt98okqd2skz4iju31ad0bfxeyndtlsgzy2349z8ou0e44u8r4wp8ylpcop33tp1vxzm5lfcehhg7zk5fkntbu2bhgakbht8ad7mw6mn8yr1wczhpovu3pbtjld8ytjzd57zk7xzeppou8j4evlhx9s2ngbwmuf2usfrhsx8wiapwqfaw0ks5c07j4ksk5d9c6h1kc7sedv46ywse1z3bhz77lnky0mvopk1j61gw77buja2e23vajeyjys9svjhr1e4wcocich1zj68wqgbmw6gdesb8ejak7o3jfva398mvcyhej9rmsf34ipbdmsncj4m42am4lsh3rs15797vlbel9awwn1hs7z6821lfp6clph8d7ioe8hmgxlox4jcvxf3m6jjhkn3d6vyicw4y0ni69xprg5vaanqqm82szhgyqaeunqy8ss3dqiiiemhg7pa02mtw597xzbew419vt2pag4vety2xfsjv8kaau1w2s95t2c1q6782s9xpy1epkm2ko1fvev9io5e63r95wit373kjyyyj8fp9lt7xdfvhjm8wqv8tiubx3ihk9e1q3o8l94ao80uc1lvmikxjs3rm8ijaer9w2y33m7pnh4kemeg4h49uzl3hlce63atodki0sm41hjsqi4v722dibqm0hhyr6if4fyggch6w1u8ccuj45nl9171kha8kw2b7o6cmhw7ghcl5otcuyvbc',
                        sort: 983845,
                        administrativeAreaLevel1: '6yuup3a1aopqukr7rhq03c8z4vsb6jn81pb1195a1b1yrmdjip',
                        administrativeAreaLevel2: '5gvkq0sd32ntnbhf1hhia5ddxocn537g3s3acr9lhboxeb93cm',
                        administrativeAreaLevel3: 'ih5clexx0ubpfrrenx8ado2ygpobp77ycu2im5u4zxkwouf64w',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 296.47,
                        longitude: 781.59,
                        zoom: 57,
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
                        
                        id: 'c91e0d62-cc23-4b42-a7ba-42732b504896',
                        commonId: '438d8b8b-824e-4764-8e6d-249d4baa6b63',
                        langId: '25d04039-65c0-4af2-83de-3f52621a8ed5',
                        iso3166Alpha2: 'bu',
                        iso3166Alpha3: 'u9n',
                        iso3166Numeric: '6le',
                        customCode: 'tz63sqw0fn',
                        prefix: 'munwb',
                        name: 'm51puivex6qoyecleqr0izida2l4rpqmrjlluhvxlo5c3t7ojtcbbzvmzik6orycvjammquetf64yd7x01vedv24hnxyhcctjxthraz2lfzz7g5xab9wkf35hobnlgm58j779voi01lzhmp2mhri8j0a3bgaq10qyebydiec3rqx0c9ms9g6gylylfc2l0uk1d1xl98s2nlmpx0euy1xh1fcv1joqxsdyn4j3gn0sqmpdlq03i6jmxrkhzweeic',
                        slug: 'dktu6sk58ex2wly1uy8dfg31g4lzzsywctxny402l4m13ev2i6birbbraxs0e14ci24ld6r74kdlexb6qo32uv9gdp91crubm10pnx9gygpvrbedw8aa8mzf3onmsvp2hxyjthr6m8uvj65jg3i6x5marl885hyl2c51ew0m1vhyvqqclcqupkr3dckuq6elpfdyzm2b4zqydiyu3np8mnglfwdfqth1kjx2n1trxvz2vaoqzms6uuctq3f4xwmkhuwvygb7yhtrb7iny3mhy1e2tmdptvfij0foixjjz6ctyfysofxavbn2c65zuy0v9e4lm3gdeynznpd6httsmq4yn6pxrf78g3naf7p0ut9jddusyk6xn1nvfpri72yo5ai8hq5l38x6lya0lez6tdbsl26zm2bdmvoi490mvy6rnf0mwb4lv57w2i5zo25bbft305ii0d1p9q0sbc5mroetwe5wvlwlnyw6wwfr49y30oo9gy4yqof5vwa0q823agv0vun5697kl3vpgkbuqpo8lk6iayk7y8ed46ei7g51m7mefzp6v17zjrnjxryiwtxka4d76ame3pzt4f4wzxzem73rwnbc0pxixocxfljpbm8hw6ejom0tf04xu2zs04xzdlcv4ru3vad581ylsmbphomlp23gkyhr177qmp9dzd7oar3qtlhdv6xx6kl8mkzxl1c8niaombs22buzl9v7d1i1trkdd5qb6ux3yxu6b58uir2vrribih89q8w7d2o045sgpor17hble6di0fc9uwnzpexs7htvzsu8ch3mjty3ztey074pwnkr4yjqook2cv28dwh9e1wqs94m7oo6ikko52nb1q2xreunfjk1f0e81norhgujqkkjxgfxo3r4l4vr5fejowpnegorkf9a2b4a6psqm4h3d0nq2sm7gkhjxdgtql81w1ak1zuqzv4d60341xmu9fsrjgscb1tk9umbez4hnl38ykufux3x002rwv2e1y3tnplms0es',
                        image: 'chi8ed4uaq0trrtsoxcbvapa9swdwm7x181f4572ytfbidq6rdf7l5kuo23i40cobgj6bj6tpid1i9jikw1xcfsq12pysxurge9gku0sc21cnnuwvln8b0fqj1eg1wkp85bnu54p9yhsmr3ta5q4vuepx4nbdbjfu2vpt08mfko5vdkravnoy7e16qmq1452cz8bisd6q0ue86xihzhysb3dld9f060ce5336569a8hhy6wvbgyo2bi4h7dhpoo9bzwroo57az7cfuldtfhmzrzrj0fbkrivu3xoqurbuq37k0k4frt3kudt1mxauwcmufnfnb03kzjelquoboqm1ntyym3nfqhft4pxzbygtpa03z6uizggwx9s9lw6hcha8tsu6z4sod9g2du1spu7tqi71wanehl61btffuktmefntrjvzwb6m4bm2ilyl6wvpak75vzi9lrf1jpdpuh9ps53vi17v4f9lj5f7769kpg9xp3jdsd9nsc688ih3pne6j0d3xqvf0mjdne0i0z98aqjlyztu97glsi53a0r271e82cse4d45bgjg26v1kdw9gnuyelmmr6rgsgn8q7wdnup76u42vr1mswu730wtapxb4rml38pj10xxu2t1mzmw5hxvug8vdw80cvl6tud3mmovnt4bbfdtdwqec4wh4n9gfmkp8r5mpgd0b03w0bgd17wrw2ho9vu4wxa7duwhv2pkvw39idc0lr6rjpfklxobbfgpjgblz5c41258rblklbvj8fk6c1qkw8l4j2lcvnqmyznpf0zj8k4lkrvkiooc1g9oujyhomh64ebr3uc7ur2h6xz4y1shhw4inq6zujpfzbgylnlgdwepthxiuk2n02p7re6sw59rn7zwjd63o83vqdh0i0l67wqb5zqauhkvf2pwkg51stw5gybgvmdfoimws9z0aslt1czkdz6gj30d294zkd51fphnvdz5aqd2rgxed0iepic62ybf0mx46vu3br3dd4jnb35c4k0',
                        sort: 474494,
                        administrativeAreaLevel1: 'n7atl8fek3ykayp2vnc3f9qpmtvesva5eld0eazafp3eifb6nz',
                        administrativeAreaLevel2: 'rkr98cc39dflzp9f677dt8zcbn2lfodzofucntl0qpytcbcuwq',
                        administrativeAreaLevel3: '39kei940ls9cxqt28sh7rb2l7a8trifws7dlq5xy0hcgz635bp',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 412.90,
                        longitude: 35.91,
                        zoom: 84,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateCountry.id).toStrictEqual('c91e0d62-cc23-4b42-a7ba-42732b504896');
            });
    });

    test(`/GraphQL adminDeleteCountryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: 'b4448592-5863-427e-837e-47842f40495c'
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
                    id: 'c91e0d62-cc23-4b42-a7ba-42732b504896'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteCountryById.id).toStrictEqual('c91e0d62-cc23-4b42-a7ba-42732b504896');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});