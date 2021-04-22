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
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'mv',
                iso3166Alpha3: '5se',
                iso3166Numeric: 'gej',
                customCode: 'vvuti5x0u6',
                prefix: '8x6mx',
                name: '9in8cjb99buxdho33tz512qj22fik2zuzacn1vojs310hw24010qzp8ym2lme3sd2odwymjsyvblafeeurrwbgkz5tb7mv3v8gc03ginnu61f9rc9ls7edryrp4tru5ujtmm72gd55z8dybu86r5qoh7m1rzm6sxg3r6ggrz7rl4kgz5xl69njnja89wxim3wo34fyahsv4bzbe3gqy81rsq5uvg3bjaa8c7khoqhdmobbm8mo4npp9jpgjmb2x',
                slug: 'to3xpophonp1gfi2n2632nnvygmrd1wvwvmkeueqj5t1l2onty1fugu1nvkap6nelkb6121j14pp4zobewwru7iiwmtuanw4rc724g0yuu03287ztg4w81n9r2wpcrf6sehalxbuq7874e79994oxpcls997fkhy13v1w2mjv8dsbszs8b71v3chdn8qc86omhkata3f4b2w5i24x3lx81aoiq93o4moz43hlrz04a47s6aaddxzmxpanbxys8tz0ex6scwcj4qo2ln8406aeeldv2a85qw58fvcu0hrq4z78kysdgei209k0q8dmvjpeido5yhttton7vl4jd7q5jnms83cb20nfescjednug44hdtqdii47573kg0y9jn53f3cfhzfgys5ocbddalmx3rrk07wksj0152a74j98rapgxlil6fv6g74ykfwrz9wsa3cfl7lxuqbno2qtwfoq7xz47ct3rv197bwdrty6y4aw2xm5k3kp3spag8vfn7rwqk4mzo9w531eh88g2orxlla34heec8na2eycydxj786mdds5nuf3hvuduhyjwigtwqejta9hjujna4bbjjz3qjmpiusywp21r79wwalkruc62f8x2xo4kkub0me47gquadjdl3t27q69dn7hcwiztm2zffor3tcy2wokxtd6v1c0mn4yjs2rwlbz5q0zitlrgcc2zqi0zt9p8eyd065dcq0neyvl2gt44gxav7mrdv17ndkfzfr0s2xj83vp4nf4o791h7uj782ylb828lhcdinzaqymk0ka9ov1wuo1eji1luoxtnboph5zazx36ni456w4hpduvddfjj4uve5qxxsizdldlxbb4zlo2nmoz9csbqmhmn55z4ez7bprghwfxwjamdkpw17xm9gse625jrbto3zyqe6rul402h33tht1ja6hkx5vzuqacnu6xx5ugd8ffqa49tb6tiez0f0cy7h1cpaxpehtbf1nbkfs6p03t91wo0rlpftg59vzfm2',
                image: 'r0quwocwnxhq0uv2357rsjelltuzghenvht4zsdj1zkg7g6ki92mbeonyl34t36lffrd7rh1cioahbvccw8ir6mceqj4qf4mv22ms52q5w5f3or6atlf2tr1u9c21mwj60ms3dt5mtm8own3yk18cahfcfq1wpo5mvhvy0va5ytn1u31czxjv2bomz1qb2383h2ea32tcx7yjoxo0wqiopfc9s6bh8cxbeokkzeog0hwf8nbyf9ny0wenjn5xkzafncdbpk7dw73yf3taxfiang5bvwlasao7k0txl9j3udv03lngwy5b2ziudp0a3dy7v69yt3e0on9vhx5sgsjqejkl4dt5jyjztyre7ln1m2466yd0l6nehz4roejqskuhe8dm555nk54wyhue2icjdpr7q6coksnb57s5giugxxfl7gm5zz6g58pfreob7khsfecifmt4idx42q6qa4yfpp3al6reezah6o3nsszjszbd3mfk4dlrlzhc0y9l4h2zz04bl0mdburlmn2ixm7gbsywkdsc90n0okrbyydvo6lk5anb4lb13vzrwvd17rvfv2cblw87tnu7hhu3oa9im1ozoh2ax4shhjvsvzwr9g6t4bs5gnhoob2f5auh9egk9a0off5uatuh89wqn3has4irbuhrtq2iiku1iy56xo0ap6vlzl8dcoghiuat4w2rpvj2cyomgafvqebmty4q3yss9pqlf2eiiqnraeilvf8han600yqs1el6xoev7zbvfder45jywizvj05qi6vt2nnhli7aejg6mf2gj8j7rnhsrrs7ji12rfp7rxua564wcitzs5aecjc7vs2sx6j9zngls4bd3gnj3ffa9ef5jabbd88m3twm4z87v73dtbvdk0mkz9cuqi2u2c68jsh4atguznor27p3ff2zy4nyxr5oe4htqzqq1ugd2ynql2szyvshzohxvwofh4mie3vt9vvmuiyi06ild7eczhdbcrpinine510rvkdzizlj8md',
                sort: 466312,
                administrativeAreaLevel1: 'cxzoi0dkspte8awvgrsiu4wt5pmwcenmwmn0k1pfwp710nuf5c',
                administrativeAreaLevel2: 'vkgqen8crfuxvxclypfrb7od87yip9tx76b0dvkm85qkba7crj',
                administrativeAreaLevel3: 'dgbsu8d26iakxymvgh4a5i3l2lhd4un0fnell8d7lc35kece5w',
                administrativeAreas: { "foo" : "bar" },
                latitude: 274.56,
                longitude: 41.73,
                zoom: 19,
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
                
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: '2c',
                iso3166Alpha3: 'hbf',
                iso3166Numeric: 'g6c',
                customCode: 'zlgvtptta1',
                prefix: 'p28us',
                name: 'iehu9j923jwlcaz84vl67lkcwp88rjbua77dmp53eclj1zx2vfr6gn2rv1t4mp0vvqfrwl3iskuskgxekz9jnma67m88omwme9tmkdps9eyusvglbwt6ymn7h4urchfqkz9p5bmdkkitecuuex858t8i6pwfhli5p50liu0gbn8mx9x7hpa7wz28156gjv1njjpo7gfl5me9xzx22z0r319fuwqjef6f5cjyeme4fmmrim2vgbpoazakqm7i4lv',
                slug: 'eggs3i3eh4emhgz23zw74orutpk3m1awdk03eq79r54swz8jkm157nu5oercrtc90uqr6lhezjhlfpvd9atwg8wmlunpn40memlgpzxnyiv3wda3cabcdsa1ligavoch9361aa1kguz74w3lwcadije1x7a9qpsti11nefvdarafft9nbcvla4prbd6lm3nfgb89n6y9se9mgvl9e7vpeq3exe76263nnxreoxx59a3v3bdur7r0izqtyrunl7836405ls0hezywy0928gmlxbra4iwb51msttndlb76aopwig5ku4ux6g3kw9fws2tf1x3ls8f5yjh20f4mh995tq01tcer83bnjtt9tijyor98rw971bwn3p9rgeo8jkwhwq3bbyydwd0k76w96ofezugsyh9j8o0y4w3m0l2hfl18u7oev5m28d9h5334hewbhvra9ow36szevswbkdn7j42ym8287uj4zq7cr6t3bgu3f9su3gm675ze4v9gleythw66e2y964l3fuvxbhgq8p7e4ey35sk2lwrn0cngilp1xkvl07hn8zl9qrz9h2n34tf9yrgs3nrb1ldvne31yvl66p7u4d9ptwa63y33td01ownpmdfw4v2ya34zzeuy4sqevnfodh9xz6qac42uxarm0d104no45hoj72exbsw7mh2q4a0bn2u01zevz7mrye5k6pgy6nrrei46uukmiqmgvx0beqymlbt51r52bxdurw8ibt2douoabx2zon3l3bep0pug3gi91vnremr4fe3c2hskz3zzr7t32hp1pbcwxkaphh8wstn7ibiqs4xobpca32zyre4dcs3kyqvampf1lunesubggwg24ps3b0yr10v4x6s4euuoj4gjhrqe65bbp5bsgvj9xaru70bxzue4spossp8h0i9f09ih5615xvrub1tk05fjmdj8xjdjug9qg7thb1ij3p5akjky8h8q7nmyi99odx2y7bz5t9elt7iax86osrcm587cf3l6',
                image: 'v7fc38o3tt9y214v341ig657lqpkrirpchdl9o5xha6rihns031vnfiw0l4grfcw69pvmnz575hfduxxul34hwrgwy0h3wg8gs6gzwofq5ppsg387r9ygoh7e8q4kkbj0tpe71b48ljvxq9mm9julmvu35r1sbzm15xgiv3orvofdfjvsfczys5z7k69w6t0owtd3ffky6x2sudyxxcmzva702inkkewhyet0wu1234fq3siztmutfhmkxanisg3b7qsn078afqjfjrbfzhxhzi0ad5frob91v7awgf14p6cnkt5vk4r7e0dnb5qpm6d5e4l7hjnpbz1uev1671gpwm9dhs3c5y6irozs5fdba80414lahv1pfspeemlew2cmold19l7642hp95y3fa9dbpw3mvdblpe7rqe3839undnips57kbugklx6ecfov5yvimge6juiz4m1id1ma71qp7iz0arplhi49nu6ufp077edmqs0rfs2ymoirxiz13anpaijfxwbv8cubh62u07icdvc7w8dmuu95d9phr2iznyav0pzqc3zu4nq8rrzaf9lr3geoyla5fivvccavq8gd5cc3hitv9fhrjs6g0f23ft7w65npl2lylewg25cybvgecdlj4lviqnfsxd1byjasfnbrjl9woemxdy04geaaw2ot3imc7ov19qm1qobrbos4k5i5i7xhpspqogdggs9j281kf5wjrl3xa4khrmc7nsxpecb7lugmg6ajkyv45kq7hhzruhkka78xpsc15kr8p2iwmxu9aght5b2rdiskzcosxshpeebs4335w3u44j813sy4ht33n6p43d50ob1vq2v96kym49rmae6lkbudlxfd02td3pm3oti7l9s80hkpiq1agdk5srw78zsv1oahyonmpqoh72aqed7c7ucgno2wm7a3mq0722yxbll3fd3lu8lxjokj5pulxkx9fupqh0n6b9ycnw3fp79lf1n4ddfkwp183n2wklm4otd82e',
                sort: 606669,
                administrativeAreaLevel1: 'nq49wiq17blfml3i74ulnj7p35hhph920ldpc1ibbuy06a7ijl',
                administrativeAreaLevel2: 'zh7kh6x4z4ovneyaq42s801hz3sur25i157ofdpp8zm4cmqk7l',
                administrativeAreaLevel3: '0h16ca6s06si6qtuv65trjzmd6cylx6hagxazwzj52iy2tte07',
                administrativeAreas: { "foo" : "bar" },
                latitude: 279.74,
                longitude: 470.17,
                zoom: 87,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: null,
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'az',
                iso3166Alpha3: '0wp',
                iso3166Numeric: 'lwq',
                customCode: '8jjel1lnch',
                prefix: 'zmp9c',
                name: '28n4ufo2wvfimgcht17k44qlvr97gwq8diearlk6u3tkqe80121otkb0x6c0xd8ld9v1lxbmxmeoqw34bt42zwajitx5j03whnugc0z6pnvqn26qlht0sditxquc1rqil0n5saxj7incx6drek9purlpefyaj7cynydtptjdo6gnylyqhqxdbmeh3z61bvj1t8zataf12v69uz6j9t4jawjded59g3qjyhh0yr99t5mlisjvyyxhrgn16rxgpaq',
                slug: 'p1l637x7bjb4puhp4fnvq0m892h3l4mszkmci11nivzg4qxs6r878gf9wqs50srppdcbalmcy9f2exxm7rrhoh6hls3s464ryuvjb0633v6yqtnydps0107e9s6h8zvqgjsxlose71v42bb77vd01lvncv0v82h54hkkd59jgl6cet33v6cjlstqxzp71rxnbabbpblis2yl3s5qgfw8f9t1g7cjc6cso7kithbz1wuz7k7ztvphntlkawmy35jk96gymzfo4zipunpcb8d381rir5q1dqv5ai7xd7fdb5v0x817555yc2w6pzqvcv66zysax8f4zluxlzvkkdrz8g5l3jk6zpoxlyfp1w2i65d0ejom92jetj5ldu1b5w6mzfs4jj01en1du8xm3zel9ujy4mmjcrhdggcgk9ievigkyd7c2x5s815bone6jhsgaazjth9l1ejdhfxwbl5bt1iv6s5rlu2beipgjxqcguymggvgv4h9fv74s865n4c4059m8fm4v2d8mk8lystxdbayhdqpjhoqiuw0q35iklzexbygko2jgletug5i9dd06zwrtha29lnv5f3arpddz7c132ftnhxku1v44gl14mrlkcm7uqdr0qj7vezufocfcm591iv8t3yydab1qykpdob4owrfihji49p2onzetz8fz5hepu8jn7iyp547vj253122ja61ehzsa3m76fxg0kg8pfwdefrnkwdcgk4xadtfsdxqjti7sxz8jcfpobhuu2m2w9bcx6qkngjbc40e8553y19aspckk3zgy25r9ifdn8n370x7m4imye8ofcvxfn7p7zmm9n71fon99jyb98x403s9r5ecvimbfb5lma01utlqc8myqvmg33kcw3l9h56gt54d0y4hgzcu8rv6ot0y0b14epmomleduffe7i2vukpthucw8b5wxqemdfsa2xe47rbdl6yuwsfmf9ht7v7cnd930zw1w6hej12dhuyinvbs50n0ldvc03l04f0z',
                image: 'kbannua9f24ggwzwsgcxp02e4dnifk58wdisu6c2dgmu1zl5pbpddlkapx43u7z5q1cfoh0pc8w1ot4j6z8lwitpfusu94locjd535zkg855dbl6kpyiett3vn8pikgsy9dj1lide52l3l3jorb7rmsj5tmh31lcb7s23wgesxmad0dg9yhorrtrhnl14ruzbru58kgin1h2t7gtk0h0cpfvnu3ih3rfw12zj7z0sem1py999hxrngxg5t10a1oc6gz7yd0qfpvu3h2166ywk9wll30azghmca2ain819gcpc37gepaftf0y1afh030js5r75fylzvlrlz3cvpkmm6x89dsub31u9oyabkpkc6fd5dzahvoco8s7z6ow7jkkun81zoeoxyipzvem1an5vsiizoout6r72to9t8vlmqdo6sepeaqigvt0u5wogdsdtalt9sr5r29h021wwe4h8m2avximfao5dcubun87ujvbb4h38jwtjrf9z4uyltn71q2fumu9e6bukz6zynfohhyzy9qxd9yeshd0gew53v17pdby27c5bfgvgmmeh5u0w4eh3iefirz1w3bvmvviwviuzgynlhmi4uzjgrfrihhkoe5it2zvqaw54nyx0x5i2yjv2sftpgiia8h1uqwz2chruwoklvgu4ouxnam125p0s5dnvwm5o0g5kcw30ssqvkxmctu9mj7tonq5ah04nhe1emoqwpltqqdvbt9c7rinzjb642tsscpl7nfn1vkvq7kp3431kzdweh23umgsi04pcs8w4wimt68stzywcztnwpvx12u9qxp2msws4ddyru471fj73er5r6vrgj6yx9y9zjvb2mo4knmygkg4fuhmk823obrj0ze3fdd04ja6wssz08alo1f6wwub469islyztqjjiiqi29qn404qrwwlifp1z3n57b02pt3isvrrwk8nrg78y63fp0hrupy1djffwd1n7yu0me62r34yge9a119oqlki5jwz6glth6u6',
                sort: 216286,
                administrativeAreaLevel1: 'pvnhcop9kw91q5yvlp8c7evuhprs4903fetffb99natsxrcrt2',
                administrativeAreaLevel2: 'vknet3jlne08ul1kd0wubtvdebz0cykscgqxu0s84r2kz81df0',
                administrativeAreaLevel3: 'bhovexh8ufhl7bdjowo21opdx7nd2v0snt3gjcsqjapn1v1200',
                administrativeAreas: { "foo" : "bar" },
                latitude: 341.70,
                longitude: 826.12,
                zoom: 35,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'es',
                iso3166Alpha3: 'b0g',
                iso3166Numeric: 'xae',
                customCode: 'ugbpxki8ji',
                prefix: '0j8cu',
                name: 'g3x2z2lsi40li5zpd7vyhzif17txae0ktk1j8cwme2uq3bhhn6ts6pakxq7vukonqluiz9sudv60700nt2tlgt7bmny6go9myl1589u4xfb4bdy6yfj6j32ei3zgo9vpedhd73x0zdyqfqe3ai9g0u0coq2fmtb6nxfjifmhgpq0ecvmmrncoa01htm7vjx4sh1j6oftomtmi3sixbdo9cgtpjmtz93vf8384kijews3s2p96u1ttyseer4udb2',
                slug: '8he20p6uvb2j41tbd0edbui7crfqinvq13sxq3dkd09e6b7tnqtri5sc0328llvqyt66cgxjt0r8d5eevnkn6idzxc6sjz4cwpicbf8b0a88444tm5gizll20jvshkjughh6lcodiqeje7msdkrqwyciwymapx751w2rm4m0wyv9gqxrkzw916oftxohdpi7sowpkeii7h85x7sv6mx59fk199dvids16kmlmvjpp3jdbbwfcqhsl9mqjixyutdepd2b068lzqgguboftdaoytymsfno7e0s1zq4nqz4jkji73emg7u4clh4wwkt6kp3dnp04afueb9zpuwkvnx5lupw7lavlvnbs942sk6a6m7e6bhilqu7jseasfxc703ehr6knkq9balhrmuhzih0tqjvdk0w7tizg0iklyirmc37vd8dfl12vp6gdcs25ri4kasevh38gwsqt1xa7n9w1dg9q4sbe4s96zlwi06f4sdei03yut7qyj3but6ims5nth5vjdijxio81cbp2nxko19ck2bssjtunrhjzcn59ui5n5ez66ey6d0bdnh2v4if04cd6b5cjdpz1qlpmeg7nwty9uxkh9zhwhq3hg95xg1oybl0j5olm4smr2tog69i2qkeho8pj88nl78a6m2wf8yqnb7nyfbrjevdjybcpdco7ra3jha1oinzertxx96ozsb3a7q4z1bnrsreefchy5w4o5y74ebbdoqzna1pquw4bh1nk0bm1iyxluzn1ii2bn9ql0wn9ewupcfxip14fmybpjtsgp0qvod71uw0w8t0651kofaf6c659on9wsla5tpdphsvpub6rf13luwokyzjzz7b1r5dm0s92bhvb9446pggsgu3pd4qi96b2z951ie8mqkkwq3gj7ki1b9x2lr94wfk5rvrna7g4gfomsj987i332t29pzpt8o3kijnuv43ln7zmqpyltd31wg0qo13fyx1ol7xg1qw4v3ujkmwk956xjsx2zcwv8c23yms',
                image: '635727pxlys6p2s3h665bs7y8fcegiuarzvo1wny9pv0y7s9277geajuxy6z01y29e1jad4mjwtg2o00prw1h6upi0ir766sprnnc80xnbfxkg2prxz6jqlyzw7gcnoer74c7pfpqvz75r09pqtg8fcfutpnbdp78lzzpb887e5uzm0j8t9rc5teor95c16gf9jxqloa128xdpg1iul8fr1gknrizrtcch7glk1sc3rjzk8qsnz7scvi5cynmzzfl3ovjrg6uy2v12xfr7r1gd148pp2oj2szov9r94jo0311nzlkazi54z5h0ojphjlk6c9lkfzvheqyj8g3ihlto3v77unqsfnef6f2po1grasqujn1zxbbn8qxibkm73jfnbed04kw3ikd9shhoasia3hc57dled8rfzfwbjmgfepkx7bg5a1lmkyu4e6q4spffehqeux0rf90wfbyg6ed323wy7x6puthzv8htlbk3a0igxvt2k67ib0d05rg7oj98lqk7yja9zgd52t1tzrju63wk3shenrv09o4ihbp9b1hqpag9b93vo37u2zsxmfh6b8eb4mgz48jwy2sqnvvewoh2lro68y5i6csmjhbu81pt08jvo7vs5ibq46cwa4t4ucjh9hs1ldil6wuug14stwl8zmmsb27x83o2khuphmzmrkph8roem8adtxdvm4e5jfk0ou09uudvkvmh384fjmk1c7kckzvkp4vohim67qjj1kf58dcofhogc2pkgyrncexgfvnx52m664tuuovv4rkpd9h9ioq869s00p6ye8upxg4pvxp7f177rqzpk1tps02g93x64xuaj8okahhwxftp1pwapujc08id1qfrw4qdp3y2dfvwwb6eid6yhy49kfo7a228ks6q64pbujq4xnhn3qxd18b8k755nhj1q506js7hhwvt55npzmoh7gf4o36pmyiruudcw3453z7633fk23n85nmvtqsdt989wir5mivfijrbx78id2v1p7',
                sort: 871279,
                administrativeAreaLevel1: '966uvmv2eifevz0gwfzh4yp2ofryj9iq7oz4mnm8yp1tc03079',
                administrativeAreaLevel2: '1k8hz5lmv8d1a0ddz00vnqn64vp96xr65k37z5wftb7g8jq7jp',
                administrativeAreaLevel3: 'al1tdhsqzkvl76cuttdzipr5dxia6fjpr2unwtr3xy3kulv3xh',
                administrativeAreas: { "foo" : "bar" },
                latitude: 923.15,
                longitude: 661.35,
                zoom: 45,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: null,
                iso3166Alpha2: 'mh',
                iso3166Alpha3: 'oik',
                iso3166Numeric: '59c',
                customCode: 'qfsom50w10',
                prefix: '71kyy',
                name: '2qmtdrszldscn4s7ve9xcul388q5chj2p4kssbds3h3balslhtc8ruarib3n5ud31q8xxr7f49np97aci00g2s63a71gmg8hfoovhawm9v0xosknw73kcu538siqpvxuzf4v67djalm6ik5cjtwf5bdwyxg3c3wi788uxv3abhhm9b6wr9cx8j56bacshuiqw2wd7w9l4g7ax5x2o5icci8p04u3mlvp3sosf8dssuvpaxx1wgvtivt3l04drqx',
                slug: 'b6sojkbjm0zm5nwgh1stz893osm1i6q3zmpzzqof1s2flam45zrjoa2jadp4d9uvn17nwcaeavhcvkzb40jzxqudidh3nxpsk6d9dsbdseg5os3pfsusk5jhybrpglydm75xo5y5e4clxsy9mtc3w5go38hfdxqszng98dca2luaqzuxl4kpht592bzamso5cqurkz71n4kazaaf2ygtchcoz4sbj352bicrp60jmtklo7n7qn4es9rovo2niv87hp9bqz5me27vvgmo5qmj7o29rn8qwwninllkdqmy28jhhs5t6bzj6ihx213kboym94dw5iadb3guiagi5jaa2nad1subzmus5u17w6nvb1489l6mnvxvtexl5n3cr6spuovfp0mbeafgcgqnrs7obnwaiots9x2l17913rn092ci6s0pdstucanij0f2nth2679x5gm9c7lzx3rnj2dkmcl06yp5qg7xcq7kjqmktpt9zp1tonqjag05wnms2f9jh6v8vivcpw5ynyqi9y7edecmrxtvo49j4y33w85ggivub481cvhmedon4bmldh7u9z24hq527nstuusyd0mieaysvmdqs4719oxy1r95oftyrpkknsuq5jtz9rmsc3zc57lweic6hv6boq2mke1og7fp223o4aw4aa7k4cg0623ongj1yvyhjr6zuild335hu521cx4in44cp8snjslsw3ut6b011xy1bnwbde46qrz9spbju1mfhugoscy88lcai8gjwb8o37un5g2xfigxi3425yej9k8rwx368p1dootj7e92udddafrnfw23esbldtrq4l3hx0u6dpl8dt69u7bxe1l259d3w5lq0k1i8grh286p8ds4hcub9wiwop3jc975wojtxqx9vcb85jerrrv8jdtdle5nph3vkzee37h7q68e1zch9socjybv0m631du534em76in2qx3tulsbwg1xswo3tjhco0l8vzrooohaagdfxluecja4xumav9b',
                image: 'bayx7jtzs1qpp3y0ny44v2ufq7xwzsirihwk961si5nmvcpvhvdbesbw9v8wra2h87f23nxlyybanp6ydazcche7byt2zxvb9lov3nm8w2ywn2cljxem7licwspsf33p2ktnjl0oudwfqgk6ak1e9jbb8v0fqimdcrd5p8tltl2b8qcyp24fugkwqp348oh8zn3zwbv55d0p1n1q87fr92hw7mq2x4gpov1cwlk36p4yfiar72bnu6ns2a1j60s0fqqpjazlv3mu24pwn66hv66q8yqfjmi4eszt0gisxa27ypyhtuj9y69mmuedfio4cftwda44fcewh252qo7g14rgy3wa1yv1hardh37lvr8aq0gd506i793c5lkayjkqvkn965c77ify98sg7u47c5bvm534gcv8o1ws8u8lhkd545cyx1dixqz27twvh1yoqwocjenbg5ld09tcdb5dgt7xw3dw04pspj3htihfio3u42qrqc4jgobkp3ywam8v9v6cc2yowu79u3hkn9gpigq9qrlg2hewqq5so5ngejn1cqorgvt7s8m46xxi37khkawdft54yyjv8u65kf4exyma77sbn2vm8bujf5zlz30g1bzm8p01mn5rs3iwjohcbfvddq9ku81m4ece0enf7wdcr0xxpjum9heyoofb4uxyetg72gomdqetr2x17u1anq91djbgntnmtfnktadcxb7q4hcs8fwm6gpvh4e21bkoannl70wa3gdlhxfs5sjmg0nxw8sicqba76ifvwe8clwtsx69cqtxt6umfc2mvmyzmr9i81rkre832bv5o5ln6vj1q331cq07d1s7mhls8k6f4ng945l5z03tqozq54z2rvtmf0s252k6wr28n7wlm61v975skic90c34ga1n4zy2gbwo1g977h3wmq3eehxo9zjieh2gv7ejfifgnmlf89c40ejzfa9pmoz8alu7foukrownrrt8zyjy4wpczhryepgilloiyn1ihme8syyb',
                sort: 420901,
                administrativeAreaLevel1: 'gaxqsdszcsi9ztt10l1gppui206a38bmuzk1lb4kyj4f75zglo',
                administrativeAreaLevel2: 'fux5wvnmn6e278m1h4rgt2h26m5u04bqjea9qc5bjghfjz2kgf',
                administrativeAreaLevel3: 'fzgtz2vcoz0jtn950fw2ral0fic4vqyc3een1ugyyejkwj6a04',
                administrativeAreas: { "foo" : "bar" },
                latitude: 65.11,
                longitude: 249.39,
                zoom: 14,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                
                iso3166Alpha2: 'pf',
                iso3166Alpha3: 'act',
                iso3166Numeric: 'dze',
                customCode: 'e51zsf67p6',
                prefix: '29deg',
                name: '8q9w8jzsueyyg21ahsbl1bt4rmbtdv1fmwnsg7bl6zqs41bxjb7y6up79e2v94d7cd9kft4bf5zi7v2prxmqsvwkzocj44jiovqaitvslt2ankg3yoa3ij42bmhhjo8kcwl401fw8zt7lr00fo5jgas5mccs7kj6g087fcpthhw0piq1tua6omlcs2skur5iyp9ftnx4e218qzwfhpm4jciasqms9xin2ardlvh8h1noiwxomqxjhdcuxgzlr4h',
                slug: 'wz0841jmg5z896tq2snthihpe91z56dfmjrh4wvnhf823us2zmn6qu7p8dr49wuz08j2sob7cwyl1avit9x157y6otf09j8js90caeclrc5ewfuk0n6qg77bz6p5sosfj2wcrv8sz0jtlz56awimw0anbiwalsyoi2r320nx5ark12qtnpow4fxma0p8kuighev6f0u4e2i55utk23z0b3uwwlfmzuixvya8vbd6u38z8juep5lw0o5wxubqo8k8igrxaor3qiig8efkqepfp6jqil14vbgjqkv4l342rj7byd6j3czg50w7x55h33qqec6deoasblqoqu2pn810x9unn24tnfna3jxmg2r6vectfqqoqphnhkc2tcimyvk8886im6723rxf4rqdao0sl3loeudjqq9ry94yqr03xw694123s1m6psj0euy3isls6zcrz4t3lyii06uo2ydsfgotn5xdam6xsrrzu66rfla0tvzo21ai2hbtuexbpocqix14bjb8zhhehe5rg9gdgq1va69t2vjc5npsneqdd5k97i313ajs3ex9zy31x7teamk1faiubszn9ww17jt38s9i6lj0qtf38i8v9wrlnvt3xwsb930y9zsycmz051xdloltvky05nlice6owj2swgp18560ku1z299kvgqndhpcwhfvximliwh6odte90zzfkjvbjdqi7tou9s54etukrypg79gakzai66cketou8j99v0y19fxzgunkiwu64bo8zcdhl7mop4cwrw7ipko9komwnah2wyaxgip7xvs7ruwa568d2cazas0z7hpcs6p5x652cu3rh58l0cj87iw6mr3cvpqs4qxjg2oc6vtgl17oyl78bqbocfe2wepgs3iyzuid4qafk4bd11lndu5ibe1ukxm6l2nhdr78g4lcmm188l16gz7wbip8mege9yph7e0hkbd0ulv5k3tx2e88jmqjpnzvqfzbb6ytctng4zwbx637b7cztsrnlvtn7l8',
                image: 'h8wh6vjwovkk3f604mqse6xwznffvpj5pi5vsmi3zf6f3d35zld0f3c5js34euc2k6wgql7f26xoxdiy5xwalbtkirjjqlndh0sh5ema0xdjec2s6434jmitvs3v2io7yz7htjz5tgmwzerbklqju76b82oebbegyg9n10d6eq329p57dl2b19h6fah0blt1gln0xj7459hou983ny97wmg5wusxtxi2xqczg2c7hq6sp4rb6ygtv2latz6l51gj63a4a1j9c6n2370ksxes0olfum204h4alf9yzca6136fkfp9lidwkvr3e1ls9woo92ud65zkttx2r9mqu0f95c9gypf435sdiezaojzc0djh9zgp3axvthz10b3bv77frlzuit85yq13k758huul7rh0g3p5iy37p4mbd8kt7gne69j55v5kddi05areop59qbf4rzxeg2nntcmryam1bdiumt0hfro8i8mm0hqerscororzcw7tdby7yktlcpwqzz0nrhz7q3ty0z0cd0mutnoemit2ghne0bovr4rgxnr72h1yw41gn77azleng3xapzvs43g1scsyq97z6p1iv27rqlmz9n9du4ltwwrna5o44ltqe6pthrgpkaxwgz0h3p2y5j85mvyqqhqtebif7sffduk5hib5wh9efe7l57p6fqfmgd1qg6w4j6bth8ptc0zaanervd1t54mw1m7407su6d67c74oh61nutvp12n412o8opffs8pubfx25xs1mnxbzyd8v3lzjg5kxkt7dp2fl7dvwmjie6sul3fd7etxssowqubsxfv6z6m5tpfdojuqi1999zisr7m7ak42z8spx3qxbg20xm1ye1mazrbbttxop9u04b8cs8cpyugbxjftfs4q9s4tgnm9vbsbg1alac75cgcwkwh5dezgbjjtiydreja2vllkx0cxkolxnoj3h6em7gy1trd06uew3e8ztu7kxm1vwcbgijm4etiycxwnh21fvuy3clm1vki9',
                sort: 353982,
                administrativeAreaLevel1: 'yfgxki0lgszlzlewiw4b8k0to5eqis0vcxyiovt4ae4wihkokx',
                administrativeAreaLevel2: '9zf26rjclnbj3uod8gxr0q23643mm5ke3062nu5qkifydigpk9',
                administrativeAreaLevel3: 'gn5lrvbvxalzmdhiadanxehgaa9oonavgmznzp8i3ap8m6wd9y',
                administrativeAreas: { "foo" : "bar" },
                latitude: 501.70,
                longitude: 896.48,
                zoom: 92,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: null,
                iso3166Alpha3: '9lf',
                iso3166Numeric: 'vzd',
                customCode: 'uc5jxj9h8m',
                prefix: 'cw4zp',
                name: 'rbvn8zfawh2bh0zarvb7bq584wqqpyhtluzqa0uugo2kjh4mk8w248vgn29rjwauu8bmlss2bbbmf5t7ygy2p7dbiyj8zxfjq31m0yichrjuc0mkmef1ttpjbqx7la99pgfvos1nhcn34dkqnmrxi6b4caxm65b7e5627rm2pj0pqp7gykds5nfws6szvxl38czsz5pfdsethirqcnz0ub21rypl89gz2ibxdg24xma6c899k223qf10z7e7zka',
                slug: 'leljx67vi3ds8zvk3pu3w0t73nijjuy2v0nnx14bbo4cm0xc4zvqlubkcu7atd7zvurjfy163tld6eqxm999slgicwa2n32y491npl73w7sl3h6zr40n18i870q2kzy342d36my77w9fnbo5l98w4pornekh81aea0ujekal3c5c2c0zmasxjt8alc8fswxohxqrgwf874k57w1q5mmnji11ivdrholu0lcmf8os98jheqall4cp6u8vx0ixc6337n39e9xq19krfhiq1x3ztprzm5e6b13yonp4axax8jbl5jf8matyuox6w6kd7uo21rbmt6gc9djocewza50xwrz1pa4ljbx5gnftehn841dsxv77xjt5wdzqa2qxksadlkjao4hd7c2t6kr7qyndfbtgwsw33jn5cdkhogbt24sh0zp8ow5t24r27v7ta4kgqolb6vx47q2oow9t41q17gq2cayjyjibooa4mmg8p0wum4mwsioaqnjcksnuao70x2jksxs4fgq390pxu1iwcas8k1vky8dyit1my1em1a7rmqoapfihvzy76v8cnr6dni9vkrvelxah3rmenbxopm18ltu5h610ilxwonpotqj4f7wyu74w0n8aj90jc16w993b0zb7f5fnkaaa28p68uho1v1piy7ag2swtpkj1npn45r5q1xw20e5tz168feykwxdb8fy0014rsd8abg5e08llwar92zkpp4dsuwmrt1x9wi7aorg57kjrzyop3gez2qwr3yrr94d9uixq9zkl8lvbfgvp2ezuok86gytaiwbwvlj8tcutf05u4df1mqwh00kx45qbh4co9k2u92mydoahwa6a39e92hdk0kinifwn4r5yq6v0xe3bi3pwq0mhnfm5ltmg27kcnbt63apc35ssa783i5qnxspa8jgeqicscwsmojsf2zq8aua3v8ynjsm5zvl33tr939pqd8lq5fq40bi9plrzp3hqtbgpbwde9o5hkj05amftxpdjr1r',
                image: 'lqqjtm9c1975dvdhi37rz6nmqi4msxmsciu5tx0z7o6drsjka37i7ndrbi64avtkvve9ldl4nu9iedhe88tshr0ecdf4nazykahqeo7q0qo7hjujg1cdbfp9krm6skwbj6uppdk1w5zxyxj30334kvz4pfajii928z8m16anmcg7h68yfdaicrjnc8hck2sp73ow3itnve7x3zhu3hjgnm9jqfjbm8yb2sso71q6s7zcz04dowkot92u93kqqw7jaqx0g2wfteszh0tsz1meafd9tx699fs69hhf6vy2nkp3jnmjvrsgcrvb8v0kcfucdfhcyp50pgpj9jxcutxb46cabbqkqa3z9kxrkszmev0i80fpxa0usvtqa26zoreyhwji4wvb7ut0h8a9wgzye5ioxjgangykbfwe5535zusyanqsbue7yk6hmldi0zcft09sygt5kh00h7tzsbuj83gp5j6q2bklgbzoobpu56jlc3f2hhhl1w4hy301dl1tiuv44denipztgpfsbntivjvatbhi29v7wxfjnbwjiycg270mxefl9vvgtli3wpnqvejjllblnp59ywfs57bybpbystuihrhql9q95tt6in02822evdlki1uxkyc5li6ezf4ao0fo0p83ycfmx5bktapafismy4fowne4lya5gfkxlp6mrvxa6q1uyzmehomnf27cg4o8z4ot7kny9fx7u96ksu2x6phq9qmqla3z8x1uxejxg8070cktux38j64pieuhcsxgljm47hb71kst9w5sxigcdwsbhkczbdjlwy34mfwtd4x5k09n5bi90riyb02ikwvepu776xad9jqxgmc6xlcw50cq7o8xglhzkz25gmrb5k7q6m2m00xm34tpev08b2rv36qzyx2mxu9pczexfogxh0xyd3rjgjgax72ue25nvk3zsgrtdjy0gmy0r09m109wrun592qzclb76v0ic1ixibvilxetbc9xv6jfhba1b94cdo2xdoer2scq',
                sort: 343530,
                administrativeAreaLevel1: 'k4in1b9jhrbm5kpy1j58pw6ko570i49ezlacoa82jy1gqhn977',
                administrativeAreaLevel2: 'cpc3hbwc68jg3c6p9uunldovg491au3468ygefelabwj7wome3',
                administrativeAreaLevel3: '1bz020sa0ypeq72bf59yklsxkn1y12pcf9k0zafsbph5qvkjb9',
                administrativeAreas: { "foo" : "bar" },
                latitude: 893.63,
                longitude: 326.24,
                zoom: 87,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                
                iso3166Alpha3: '38c',
                iso3166Numeric: 'o3z',
                customCode: '35fkisscvz',
                prefix: 'fwlke',
                name: 'gc6u415zabn7dcpmgmfpj8v8sdhxbamk132g8omfavgizlvnk3t84pi69hfzc7lhof13syut7ot4v9s3oixmtsl83axnne407xhi580w3k7ymv1606mih1xo63ft5drqjracswc79j06dgcb7py1u3tp0nbn87f0812rhryu21c2vmdhbtvsvacqic8qbnzs9ptvauzqx1x1zcl2k224ht79u8kk8ri75wlnst916h9vb15j6jhzmjo98ojxlk0',
                slug: 'attlu3erntuoky6d427b69f6q8s8ogzbs8ozsikknrfgsghcxjak23uyzq8bhgdohb3z03bxqds48p64c0vdf4f7ijjekbq820jpbj0hko6ffsrmshbvv2kuv588ka2ldg1dl3hqlew6o119e13dep5nwdfnm4u9rdnkffir69o1dgmsw1mjhnabcxtlsekdvgbf5xw7kur32s2aexnl4s1uycito2nocsgpbv4wrgmtaj669bp2ods524oar1vqjcjvd9r2mjm1qzlnyygloasi5n8853my4v5durrqujynh9y46fhnvcc6afzkykhn8km4lvp576uhgcnwxgje3elf3ykf696mxmneinrnv1b4pxo7m7mn1l38qwi6bi6qdo6rqawzt8300hjbrx6p7ag6zagryx4meb5iw6yfems28a2adncep6vuee9pj36hdej2bxq3i6tyqvivj1dn15od9epjh5swj6ni0tmrdkox4q5jl99dazp3ej7uo47ffn2laoongnt9wnga96nrza67zq560uiohu7ds0sylqd5qm77se730ie8zgxkefd118iinh98lr7uk6hq9y0zlkqbv6pc7rmw9gbq3bv2nht60wa25hthdj5nugu1ekpqd6jw6ds4st4mpf3zj8wv0sinen217jgyalcv080yxnow2t1yf36i5o02nn0uofsxgk1wolwuctitl6e4k0uexsjxs4z10ks0y118mlktg1h2ye89umiik8374wh68bqifkh829h623c8id7cxzwqavimo35wqti865y30llqlf7ymf0203vzmltg7yzckemctnk0cjyop95y1zol2lf0or0fgt4qpe6msz3tv5kk4gn7lje0xopawe1l5lc2v6v0gw1jm3zt6f3kvfw5wiporas12ysemn2p8jnbrcykb0rt1hgunqicbipjolnfrf66opep5d4nzl1zb69okdb20g54vxrdsfp78bvda2ji32d0b9sm8t7mx0xgscbwecrk',
                image: 'xr3i90o4p3jfmnbw883qblnra4v9xmpsffm7hdrpl6d95bwfk8fr2h502jai5wq0k6vv1bsflsbikkj6u2zllzkodzoohawcxbx36ywz7f64eu6c5e8qxmixqf9ekbh8bahasdcm2pzdmdbidpk1xcaqevatobyewfh6b1jig78j6ac7tlgx96xndohl5rvvf8t2uejid2bbiivv0tuy42kujs2vq11f7nvvdmtj8c2zwk9ryiv3faaqu39udcpnahvyio5z37b1pc4dhnpmennvwd5kawzp5v5xjkhhh38bovd5vr02fia855ap3kqb0au0hpwlj3sn065lbq3oxrdd1w1grtqjk4ddcyoyjuioyp6qpfouv64mihlv7awkkrhfly2aydjvn8a6b8vkvz3oz5ulfzp3g5chtd7gk94hra7yz65kbba8jtsscogwsycw2qneb7w2von0hgqu8nafavs3djb1g3sl2djfknzjjerr0ztfiqwu8qnprqmtr0utds1zo065csp73rdudy8cto8yr8plu0n64h3rckon153gvzxqsz633bfdz6tkkx6hldbtf95vio5e6d7v6p8nedzle3zjrdctxfvxfapf6dsr3sa8tj3i8enxx4tz7bzuf6uiggdnulepr21odbcq36ddv5pyv3hiscaoizedtl5hfjyajnld0a28q0i1ziucvlc20pz0a277wsaskpp8pt1ryd2wraygci6vf9hcq3wm4bg0nvnzhxfl09xobxhvgolmlajjp8uqvycey2mtn2rbi5ho7jc0qpsgdjtspucmpw3fkfbq4ritqx7n4d87goifo8v0c77fndjx1o9t878s0xr67put5l06eij5odvhot503vxyrurfmbvr1664yzqlt8j9jtpur96rexyd3smenhbll8advqmjhif8czivczba24b4i0kicktjp7j2be9cdpc2gemynwa65lumhysz2wwa2q0q6yxjy1leelaqjjb9qsu6k5mebdb4',
                sort: 904815,
                administrativeAreaLevel1: '38x2dcfb0e4r564qr0d3ixldp08qcdzucexdk9eeftqn955dnt',
                administrativeAreaLevel2: 'r6ze8b74d80c8el3u6f6gl94tmpdiggl72vt8i6gl0pfvwyj3q',
                administrativeAreaLevel3: 'rwdwuc1acspqb5dl6dux4npdfyggafmkxhky3lc9kw7f931rw2',
                administrativeAreas: { "foo" : "bar" },
                latitude: 564.40,
                longitude: 845.97,
                zoom: 20,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'ld',
                iso3166Alpha3: null,
                iso3166Numeric: 'b62',
                customCode: 'rtxbryg27b',
                prefix: 'wkbo7',
                name: 'm25gco8ftiqhz03zj0epvdgt5kp8lcj159a5pp7f0iilfbtobin33vu5xiqvrvzvv7gt8c3ig7n77rp7d1udspotrztjkz0jp1maca05mcx203x9wsb44xlk4gl02ncf7w6eyyg5jx8n77uzvhcym2u18l6b9sqb60m2e2m9bb3wm3nsveb9r7u96ntelmks8v3tge3kqfgiwknhcteukqr0wnt4jea5nn4l9i8v3sbxqipz060tl4q2fd2yzgk',
                slug: 'me0qpyd8t5j1yrisq1b4x3f2i33qv5j0y602zofzn786uah17swchs169ppp4qz8oos3838fbzwbte688dr0ygop4bdxw486hrsopgwi8ea0crtfhdik3nu01agnw29vojnysj9o33dp1sm7fpku73mg1505yxbo5xgg6f5f8etq0rx2qz94fyn0x523nelwaf8n7u9gomgdeams0x8cbz52tdzpqvxvdewqm8fsvv8zbpb8god8dz5f932x6gi5bjhh1aej44r7iy4im6rvbhda1n2qclzg0nits2wu6jzt2xej5el0sw2wgvl476m8wl8k1fnmbs20y1wunvyrb09xonh0uybz0zo7gtylic22w8jbo851gy0swpo5zj2lpe9avpazok416nsi768jwzplaw31iemvljalz71x2ynfo52a14ggvwzsx8cnzthwxcw4a651t1le27ahj3ltd6rirliywcg2wgdz9gftw1xivtmv294ojiycjtfid8lhvoox27wjbbjd717lzgfxya1xml0cqtm1d40sfb7gvdhc7ey178pd5jc036vxpfq17fhti950ogfyhlm72yhv776snwmasdclvekl0m7drdp4apt1v9zcdvdrw98qmnrpt46wec7s9kdvxkte2brncf5fvykupy0mja19xh5m7rxhjek9h8kzso47io8env1f8lytvcpe9paw5b7evglcde2bmnp499m6rpun925v587lvkfwrqhao7uzbhbskhe2v8pa8qj86p9ojovuldk4gl6foq0ez38qo2a0dfbjaukajbal5td4ts1f2i9sr0ga7c8wdn3nzyt5cxh6g74p9uwezk0woo1pammfnthrnuopykds4vvk2i7fbabavk0a04gp0e7cfxt0odh0xsat1v9pqa5o9kowkwngj0hs5cst8fmt61oxx85wm27wxwupsg6ag633vdpusi9uwgjt96i2v5uue9idfsblj4ji5r06mdi8ebqgzohccz7izkf2',
                image: 'gzgk7hlrnmaslon7w9krnacmhftjr7koyotr2uwjdb7ni8wldq3207dhysl89c00aec7emz227mamvm0vnap5bmipbpzkajqit9yno3xmps5s04ch8s9rbv0al947ssmtnrcuu2dmuned42ydtpp08hpc373qw75qu6fqdnyr4y6paazvigyy8ws2vzszre831k2edc85xj00cbwueqbp87tch7efs2kue4j4i7keiff9i52zrdmk96a8o6ddfrrq80v3bbz4inapouzo2idn2l72yok58o2ky6e31aa4lyydv8tqm64b8fmwh7pyxf4xfaeo1gh2gjy31guak4bwyf3sl94xugnnp1hcwupz4nl4mjjsfp4eera8t01fxerk9o8zbxqsd5618h03cj4jd5t0lxxju97nh4z80iestz7qt7b6vf7bhrh7q1hqism0fefwtiubqdxlnlt8cccy45uoqpr3fqaqx0xiqywhqm1pugucujip60owwemq1kxg5nqlrlidipapz2f2x7f7vekny15vom03gifbexk940v5n3rtfb35vimtnjk3o1so7kzy3duigujp3vb2nkw2491ql7hhf4s0ye43a68vct2mv24jml0qorsemyveu7mjy2xrgkpf17jejkohiosn0z05f95r2ows4qcugoelsnk45l8t8wtwtnabnzmiwiqfxbh7fys0caw0zpvseqee8rxkgr4toqe6fn3c1zvv33o6u9d2yn64szt0jvyerluxa712wksfxx5vuy30lge5mkvd7evekcxtt55541f9n1o1vpm6tonql8ueakq8hkybq7lrolg82bfogdxo1mlq6u8mwc827eocsr87fxrv11al72i8a6544ww0eosm6bdeovukmph09gppiy107fosun4cy3np01h96jp4xjqbsq5eo8zx8nlzw2xxq7xaekkds30q2ufj0nznsj5z8chxkcraqnftf3fyf56fd89vf45yb08lj8xyti35ikhhxle',
                sort: 647403,
                administrativeAreaLevel1: 'psyj6r0nkdrb5byd1zcxgcqdward58dlglc69hrefb4t0szpxu',
                administrativeAreaLevel2: '3n8kd1cccts922rvysm8oaw505qu3k2jvar37mbqj8xcjw936u',
                administrativeAreaLevel3: 'jrly3l5v1bpu9s8hi7urdc0i3cukzwidwkj2igyjmfeh3u43p2',
                administrativeAreas: { "foo" : "bar" },
                latitude: 163.78,
                longitude: 140.57,
                zoom: 85,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'q3',
                
                iso3166Numeric: '2fw',
                customCode: 'nqra6a7qwi',
                prefix: 'he788',
                name: 'hj5hd1fnlow71lc58mszl6l3hlpneim8hhbr7bjn0znscr3wpwkgq3fb6bzfqinb4r4v6noijsxwo8xpyhafcwcqq4c3y5zkjlf2boc1fcafiyhh7bynqxzpke4d3a56gi3235gfmrt2nkfbul7qpjeu30k73wny7ldoe1ajaskfinxbb7p4dfqf1qjnrpwaxxytvserwug09kcckvkw3ycvhe8alb2hhmrxsmrntvwd7qc7v390a5o4zsgtgrl',
                slug: 'rdtwiz52afgmigeqo3szuhdhk65p7ghosf6t4g7khzictrll0psl56yorn7rl6lwxrywj6tysmc3cq32l5a78mxmdd0tnvz9mcroqt0koa5uitpgo0tusdxq9lgkdh7vfpz64l18nglqvj1zf4dgmr7hswi4mfrbez6tube8q1gd54hhh9vzfsvr3v7atxzw2lvtynz56cea2eoofzwp3tv2iyiw4gxzgxbrm7jhgjj4po295os3pwx7ag3k1k0ng99azxk06cm9texzfs9h7w7lr6l9fbrt1mqzk5zqbtm9uhz1tc4rmpoi5h4w3lu4gd7pu2imbdxhy150tsdhs63pv3bbq3syq5dd1myvvyvlpe9zkohhwwbftocgr7gj1ntoppctin3dduhoc426ihrf8dgqsowz527pcyzgfg11qvn5jtto7ajurd08a3s3ykcjbzfxlqpg9q8b86jecsqhz8i5jae0vqudmnxkphva7j6bruv4t036361jmko364wwworenxqtxhdgtmfetoq5ijk2m7omsm16tl552rfnc827eafzst8cddgyb7y4t7xfcg0omtamphkrm2188ypfqocf1k8pafnosv5nahp1duqczum8j9o9n7kqmukapjsoaf7oyu17u7anj9b83owgmaldn6pd7gt7j059jre9ajenix9ot3pavgn6ntnmgzrvp3zn4c88u6d6yzpwy1efjeuwujmykelygvwbry9csdeac59o3ugdcrmnn7nhrz2xc3arz5lf8mrhir7emnnl43go23hce7f5absai4a7jz7ga4so33bm3s48cz24wuphyduqnktl4pmjfpah4y9ld5kkcqppl5k5w1bzen6abn90x80lhdej6ujjti3y6ly0axz7oo2b9j3ay1rmha7wlwmggjiwt4nl2fwsjhyk0985p54ivtd78ctudey17dd6tsrgj5bcaqxy93vq6h1pekqbn1ztrkl6snujtvco511yxjarhslzdvvro3az',
                image: 'thwc9x2alb9nbbczxdd7lse7smzszbhmmc4xikgjtd5etw8a72tpo2ad4ip12g8p2n0zeiw26s1xhjn4b2f4iio4xyiru9narky4muuah3nc8jv0q1pcgbwd1slmby05a0pig5560xt1uv20102ikvsib7fsgqf2de08e1dgl4ob2zcv2cw0d2g3t4jjbpl3oeza7i90hoii3x2luj7go6vpoqy768j7okytlegggqy5xbqrwrpksh4ynyrm7qxealv61qygco1hzb718i5p7uqd2i7zqu46s1zbmq3j8kxzngpz6rxqefg2s2tepmbhgnty11akr9xuc54622s6gd6631e3w0qar90nk8o5owqnx16s7lq8uic42dpcluo5puutiz6g7llti61dpfy9drtauobg7vs2i2jc0nocknsen9v8dtxyqu5vwswcz9v8tzxf4mjsuh0dmuq3tqyslzcqj0q2d78ykjtoi7t7jzz5lm57i0m88r06xfxdf3lm894l1aradjum1qnhclwbu51j4nm8w8i32e4vqf0vk5e7w7ktdh3wonawmq0jd5g431tzxg5set1un4p0jiuuopplr6dzu37mujegf8xxk5577t9rkavz1xa0bocg7a3ob7fp6esdegdro82492pwzk6lxoo4iyeoru3e2sgx438r653la4wbxdd1r1avf7znehps4vgpvpk40igyfgb26hv6me299k6yfl0fa1rpthnk1vole80zj20xmljkf0gfa0vmnntlvfcngvksesku0fdqmhw9ug1pild978fdgu6lqplq5w6jcnq505reyksbojlkxoqn7i05jft0yg7k7y5u2inrft834pnlu5lq0xyzq9mh2y2dztmube0ok0xsqjqbkuc88vidqezwz9zphx96bm8rjia7xajgph29iha4ups417qm3p4v0c8kztdcuks92stsg58rb3ujvt9z3bi6qrwrdigxiboqx2ph2bitvrltt44t2gqrtmujtsh1',
                sort: 973855,
                administrativeAreaLevel1: '2ywn0gg2abl2qractx5zbbusw9fh6yx6mlmchqqcp7nndjwo9w',
                administrativeAreaLevel2: '9woijfwk7uujsiqe9md505zvvg4w6bc41sbgyrbdz253blyeht',
                administrativeAreaLevel3: '47vq92b5t235b4m2dhx61fgf0zmmjj3xzte45gp9dgajb5yp91',
                administrativeAreas: { "foo" : "bar" },
                latitude: 114.07,
                longitude: 37.80,
                zoom: 26,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'y8',
                iso3166Alpha3: 'fvd',
                iso3166Numeric: null,
                customCode: 'h8l0j9ci53',
                prefix: '871ly',
                name: '2bzs1w3fbxk8g49qq41byvzy7ijli4n1qcei3wxjrfnt9rzo3ygu8ix4a6itgdh6r3xhvbg01652t78g4sjo5ykjin0e70m36kvipeh08vecz1ocq7r27ku64egourg752jjzew35cypp0h60lofn84x3eey9yzcp3l7meo6d4acxaep2z08v0r7t7w6hidw32o6yatsjj6svk6vwbor4gen6qvv8j2a9eo6l3kngt0u2k5zck2c3l2gftmxnp6',
                slug: 'h6jwwstm6dt753nm6qt5ujma6a24xmfnzy1bddgll3m8xmnb8zmkh3an54trqyjdfiu3u18y3buj7e2hqln46brx0io7mwrnr0jse84bgmp8enuyz7iupdhvfumavs009k8ucwqjpc9dp8mpzb8mu1jq1lzoy724tbb18fnou4wbja7wxmm19jyg0svv7qi9vps8dw8ry12rq0ezeaz5g9ew1x2bucpqrtb2de21hm19028q621cf7jbtikuakec9ijcb9vfqbmopdz41z4tyuyp86ij3dzbrv60pmmk3uagxo001uucwxod1m37o5nuf69k1s4fnv8i6oywpm8i0d6fw132cj92h5fvr9al4yoiqp9vhcce34og8cai0kbdd0h9dswqgj3sf2m6tyoy7zl6hk3q2mr17spbhqmj5rkxr3rfxw9dc6r9fphqf7men7fvapa6iaf3ehi33qmmvmkxl20g64zo43onz50qndqcvemkrqfifrqc1xdnnl01bc0tqpn7s8noog8wlugi6262k2bzbyxs5jl937aszihj7yj92kbxdzl6wzs6vl179qgxqkq1hxyvylqfbwc8nde6s7j8wok6nrnelj25sb3l1k5bl6bmujfssfpr6ikiqn3aydepa4koucqly15nxytjdc7la6pgcbn6zv01d6mhba31swe2pleuqse6kqnj2de8eedjs5lpua7l6alssip0qs5aye28fpr7vlz432140jy1ljrojqr7dfrz21ec0ewpc9qcp1wye7lwpqejabckcya5vlwnqsp3qe4uk83ijmmc5nhali0he90fyojb15sh6jyswzui5ttqbqh807by8l64hsmhew08vrcmn2l7meq8izj0vhqatdnyfpiaviy5eu1y520y6z61kk0sfx9wzi4acqelfqig4jlbyt1m3metcnmh4k4g16yilzev2ecpfs91ce4locffrb1umefmx3x09s5dljyykly5942inbmp6lc92qk4gq9tary4',
                image: 'sxvh2iibwzj0dtpewhmo9qx4ahmb338q6yp4k4bfqqauzhqlg2880s3x9ir4t9q4ly9wsy3slb8srx62wicwos290flz57bjfk977ngu0nj3riyejmvn5x7dqiri1pc0bb8uawvujb5uiymltmguj4ocn2fnnopetws4dv3zt04i50ydip8wan4chj1f7zznt9qp1khl1cb2loeuv7p4tl5ikhod02wnxj2odv8a2yfvf9ha5h79r3bff9rnkcwy1jbh25ktld5v14z86digbrkv0flyt7m6zrmvz1iffs7qd9i8myagijxiyk4dg4b98o6dhbcbcsmnc7yp8qf1m0vtm040m9eyf4pr0wojjc422cnzjq57gytfr71xzzlznh04xx9ffn1jbamrz1wzdg7g6fu9lhj2btzan0vpyjc6e46v47nevaaiwg0qehe8jqzr7oz3isarm6kligleesplkdty89incha46tikqg8r8ff1i0ow7rf3pbsfwky2xf67xld84wk5oijj0930c0wdu99meqlri1zx2bvaau6io8awsyjcrlmk48bcg52qcq3z97frb2ivibuitktvba9p50e4uwx08guuq6vq604b8lhrhah239dvxnmrje3jp5reagw44tjchnx48122vt9tvjo5qnvdih6pbrqat98zant31axbneuhiw3jtgf0lwlvs8e6iihhwonzuh4qzcx9rptsbav29h2b4mv9yaq5h9agzdqo3tb16rzslelyc7rjsxnjxg0cr8hv87tpsbuq4867cpprl3y0mfsrspf5jbjzs3dp5gnh7n5gqn2hyxgulk6so015wwt8jnzppfys4oza37ai01t84ksdxcpo0hqw5b5p1stsbkzvzb8tkb2b5zzet1vbxvl8yu6qes7sw3yybj576fdge9dqwbywiplfl7458ribebb8p6pg0wpz0tevsrbgvlu8yxgwjwptr8myxb7et5m75g80mzlaz4ifrvf55jn0rdwwm0k2',
                sort: 867813,
                administrativeAreaLevel1: 'q4wju9zitbuxcejzclaq74c0im9nl3d24p10957cyji3hjcqp6',
                administrativeAreaLevel2: 'kbv8vqyu5bhzs5zeswo3gew2pwj9cecn5rq3dalucq3jgil3kd',
                administrativeAreaLevel3: 'src4cxlg7ubsg27b9odygdn8r28a0civ7zt6qq2t615335wsvk',
                administrativeAreas: { "foo" : "bar" },
                latitude: 194.42,
                longitude: 576.09,
                zoom: 72,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'wa',
                iso3166Alpha3: '9kw',
                
                customCode: 'pdbjsqu0ha',
                prefix: 'cygdv',
                name: '7yjzgat2qufpa2nhe2toy96i6lmzsjp94pp0znbff5iqqkaosw06ezegfji8mbvgvqa92id4x1r48c2c16zqw6gbfvrwu2cbm4px40cmet3iouwovtjsh547mugsyr9grra0sn6eex4asxc3ks6wjql0la6uck1l66sfzobaxlenci7b9x844mzeyb7o0haz2jen4f6ceow4rtofek7dp9z643cc7xrk2dhs2i7c6h5n0j0ihwq14rwo6eok11p',
                slug: '2f7hpb4dw3140k7bjaaj2fhmthx2h27s8k8ey3i6kzyrz8tbe9q394six6sq4vnlu7h0qemg9il45ojjsghgolw0vg3w91i3txdjznj4zd8mc04yw2q8yb53ouqvzbkq4ivt3maumi2ri2nruofx1iev65ep924g4ft7n51q964qjkh4x6a30d51qjj5lnjg7qrjso7lhacmj9dyjnurl8u6s9zgdmanjg37eevgdf12blh6yklxi3wkl5txwmysc8lty5boo7o0fntoavhdju6a42yuo5g6i3waeyh75vwa5uhwt5yguaaksoecmvgv4u38ko5w188y8y0j2irz7evvwganclha7qkoktu8mm2f21efbrehf7cgpxd4b9v6d59pth9eaigz60ve9am1ewuvuk8z1o4bf8u6arad6v73e0nlanenfr87hyscjnz3j998nskxkedqa1zk14ifxrdt4j18tsmuj1jwcklg4cpselt0070j4wa8y6xpf4drgce1owth0y13bp00mvu5t03xlgot5as1sw6b7kdsorjpa0hnq6v7kzwalr198i6aq4dj89go3kp2fnrmvqt48ry8978ftwywj2yjt9pjzrounjxiy7scb6rqbs6fmrg75rsssqp3u8dyiu04uzs0kfmc2lvb4ccyejp9n91ptni69rak4al32bdmmkw8lx7bdsdirgm94cn2qzhxer085jndzttjkx4f7fr4tlt8nwom6vsm36fioybbpr86mzhj2c0505wltgrxkw05uakfotskwxeb7kbzd52f0u82mpl5tl6nq1tqq53cm11ftcfjli16xl1hww27wbm8bawsoepmprwynfe518g6r0ujasdytpp3ucley4vy6w3gihg23h1e62oj9xghlrims4yd3mrxxppnv1ydge6fz0julgyyqqv1zrdbmmajww98zq0ig4hqgda4ihhx7qvi03e6g6nx3fv3062v3a7y5en3mweu9depqxn7s1w1dnmj898l',
                image: 'p6s0rr67ym2k06unnl4rwaggwcap0fglkpf0khuzrfzh9mndpuzjcu6a07rljwt1h9ko69odvdkxepzvwav9z4brc9zl6yk1z7hortdgiari1akyxcn39z17agv539tuln7zx6tszmvtwam0pjit8fjco4x56f9vg2wau4utt981a4b6335bjlj2axh6xxpzg8m50tl46xpkz9fxwt3rd06yl4q5a8xemtsh0y7lin9wahq418ejtauchbrcus4qvfotcefd5eyk15mvpulpqnnld493lr278bx55h93xyp4zuvpva85mvtfygzjroywb3ba1z6y9ue15fqth93cmi7g00k7iju1dx2736qyhjdm99qgvmmhq7gm6gwrybtxr5g4thh4ti3lr8jhcnd9uelf9beo4t3o0lur815ffyjmm1rhdm7dtb0sytb7a0j84gjkornvhz5n0bfestx2hl57kuc2uiobr2fwn50q7zm2vawv85xu4hkkyxu73zjw1tx58aww6j5fzwee3a332inlegzlbgyc4sbczjqkqybqnfvhqilsg1du4zb6mo5i395j4fiz13qx517msxmugjridnidvtq22zf8i697gm2j05rt7iu5w3z64qdhmfi5odhajui027a49ylmzr5e5xv599mza50bvgcwid3q4trh5peqbzqpaliulbp3ud0bhuqr39q9bgvy1kne708vul31didz3a86ldjr9nsah93h6yo0x6jn5fkw0m9s9krcd38wjnlxhlycwlvdspy5zaejkuth9nfg3poj5y57hjfbfwzbjf4jf1urvpfz33wjqu24v2ccd390hwa072aw3wcvetq2bybnhjitj3vqvrici2r31qnbhf2urbbsd7k5tp6jpq9s4haubt7syv7iy43f4c3giywj495wqdjulbudy7prqhrzouyaidtjsl5vujrocb6vd79ktgpgsfcddglbqo7xhkcoqezhyw6vx03swdvftng2vc0b9lh9ozun',
                sort: 428685,
                administrativeAreaLevel1: 'y8gsf0qk4x3ljha0hbcvrcwx6yylcftc705cyqqa12hvi49rhc',
                administrativeAreaLevel2: '4lk1ibx1xh1m9cl7x9btwefhf27eu57hlnz2ic149jsrm94915',
                administrativeAreaLevel3: '5iq71g73qr7mr1otiwpoon08idnkmvqcopdhmmy2t2425792aq',
                administrativeAreas: { "foo" : "bar" },
                latitude: 978.81,
                longitude: 638.67,
                zoom: 51,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: '5f',
                iso3166Alpha3: 'ofx',
                iso3166Numeric: 'swr',
                customCode: 'pnr9ymti2d',
                prefix: 'k7yrv',
                name: null,
                slug: 'gwddqzi9fqflqjfy31m646k7lirsfv7sb52cg3y9uxjdi5oup1nggkil7nuwlmdnx54u76984yq514dr0tbx22p1ghji2qwcbxifi11ornw346w6dghgbxr0sd8yr7tx6xyt9asyyvco9p9kml6egb56fh6k9deyloy9cpm1msze8mq5u5uhf64y8l7hfdonc6eu5x8uqnqbh4f6lgk7cu7yhp02a2z7ozln1katdv44yzje3m6bj9d8pfr5v8hkuiitzpfawgrvxjxlxqqync69yecmyt5xj8sg1ligf88gu8y2hcwrrqyc6ggtvgobpk3c7aip0tvzc319o7u3rudangfg2h4afyacynpp0e6mxzf6snspn6iuvcdffumboi6nkrin1pk6ofcxdt7cw07oiwngcjxbrv06ljbkh6certp9fguiu7awiwvevt0szps0ef1z4jgy9io54w6z0kuy6ch52i3x6p8a9g8wsco3ambm58327trb5ipaw0x9ahs6p04um4np24r9vu3joi5u7fnd1leamb2j4ydgimhzdz27gp9lz8fxxzk63jo91ihkdbg5wel4mr7bgrl83sn7tdm17pp90mmfnlybdd5d1c2ammh6uwnzyij5ixnz8cvzpznbkp5vwdup6o3kszuhz6c7n0qmlm2qex0cnhl1pth1u3esujijwatin6v0tyi7c8ejiligh25tfxww2w7dc6tf6iu5mn69hbwp7b6qppy9svdwkblvn5emwdwn1ewauwjcqjeqv8mpk21erdcj8vwpuxlz9qzbq43j0gp6rm6clwli3pjy3jv6mntb0x3b7v62p0qn8ow2kgxsvfk6y9j05t92q9658oyl08pemk40a1y7bly098jpp57n6gzxrpsqy2h2s32f3ybog2kifsp8t3twd3oneae63xco18y1z0jczcnmyudo0ivt83j8n870hjaj6c8k5vkl4wk24igkn6oeoi836d2277wbj779yyesa2ze11gc95hv',
                image: 'rhab7shwozukjvjasjv2jpl0uxqisc5craupy33ucv2jbvn4bwsnw8xwogkcx1tq08t8vri67fm0p10fwdryxynmqln2t8ydcenkr4wux5dskredlhaxywf8uo0wnhf530ozz6ufxahnfkwowwza3ipuylwqrccawgd58o9tfiv08veva6gzcik9szbljaype0ch05gxb7daoatuvf81fc7z23t45efx7ey4rckrmlo7wzwlpgcc70xadaycsvxhmbt8vv418rlvtbg429tzlm0lb98jbqjas7w9zv99o6gj2zurb3d4x9sb2bjoq5ngtcrkfgap725grun2xijugm7bt5x7gunkbjwxxrnxie7l13z51q3p8h1mb9g2wbr0wl1hhl9rctawie3p5nksikyiczsjb66ld7n2w187vv2qf5xj76ny162ywjflfjoiibfup8a9wo5whwg2pk7im0gb18hvlyhz527iih7hoj4guswg18bdkw6tnkpmzqgi1sep37wn77vrry0goicudsaz3vgkpj1xztxw5ltww6knv1ijoqsuq2skdiyj4olpum3q0ftacqw0f1ychmq7usqc9rho84q6x2j0n7zrrob9zt76j5gj2p1afy63qplvkyxf3fupi722bld7kre4donqg8dv4tepvwlwf6ksexj2ta8v41nbp18dn3ezrjk3ns9lcrkiqw7qdr26gaad4njt86c9k0f9lyl7x1d40dz70sffjefigd6l2ncpipiy0cmo039pxeg9s9jxmm7mea45frtmeerrwv89gcc21s5e1m5cj9k4ge5ujmh6t75vxbkel1m54fje83mc7gfctdegwi7nlm8rcatq73wzhspki4ssukd57o8k9kiynuhr3b3ucknmlocwcgmok7ca38otoinvabb01lq0yioujwymi2ryyjftzcjsd1lqquca0qi54riqixjosyktoptquiwdl0r5o61iwiw5rg4te6fkrecg0k9amk3loo9x9m5k',
                sort: 144073,
                administrativeAreaLevel1: '6rywrtrqqpiuhh6b5t388k9wwzviwmeiahg5r5oc3azh5uulm1',
                administrativeAreaLevel2: 'qj0rfii3h9cyq5yzztj9476jzdrp82o52otnfg22tclgizia5g',
                administrativeAreaLevel3: '86u50kwyuwjemt2ar88f0a3eqs2r8o537u8gcatdmntgbcizaj',
                administrativeAreas: { "foo" : "bar" },
                latitude: 227.78,
                longitude: 662.44,
                zoom: 68,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: '1n',
                iso3166Alpha3: 'ho4',
                iso3166Numeric: '8av',
                customCode: '6qass4bbp8',
                prefix: 'oasgi',
                
                slug: '3fl3qs7vp7gxyw5vzjgnfuq4jc9sh5ealo0uhqckticbiznk2zeiioyrsbgd6771u0sgbguu7d407mpjlziqfea35hlzqf47mhmith2twhbpz6y1qvk8uejpiv5oktsnahwwnedoo2i48dicr6fut5zk54g82q3xmgyxq121y0ju86yp5ox90o6n2ca8o2tufcxwtwayu9vr9q7obr41atf304bfouhnixlam0j6ncj2jp2qmaev64bqwxizflbcj6cot5u5yulpd8mnf5aw6agp6qi1njdr6ys4sxwz9001zsgag23n0z6ie31vqhv3x1k0wfwcyhdel78ijokdenuv2a0mgn53m913qht5ah5ay7ld101b5y65fvb3qn4599zbd9sohztzpmy4405qr96wp6w122o0qq5n3indzgh18wvzttrlzxc8z5aq7o2n362lcn3zd9hcww3kjd5fjpt1gd8szsg6i083kfcssh8hhjh1ax6wtdhke8zj1a64p0p3eyv9ewcuuou9vkvzl7fwfi3sqsy4lfsrclomnqu1d5eoqx8q88u0jw1vk3iigex8ntnljqosqvzinopq34aabeg5sozgfv7cgj6aik7pnhnqyt5y4amdj71a9o855enei206lmllrh8idm5mny1kejsh1294ouyti2o53q5x6884wplnqys7zudf09n1j07kzbozn0h4ttsjo4599t8satwoubj31grgmdg5sfzpjr0lg7zeuitqrwz3np57cktn83zxqcvmimqgb3dnj94goc0c9j4gm6zft2hdi943sd7ywbtwjl3qjqcykrwsrcxp1q9ctedug8unqpc1n07skivbrd3kq7qu4rj96j3uk4e3y7l37cs7hcqxebp7sn36ixr2sa16eajqywe6i3cm884hgny2moropq3wrc0ksx46ruh15tszgx6e53zqdvsh821gm6wgmoc8ohpknpumvwkh6o7v7nl91cbnx87e59r4pe3hlu6hv17x7qwy',
                image: 't6jmwpyyxzd1u2pfqjwlm7ge389txhekfnhcbfsflvukcn3c3j9tqz96kz09aorzgmga5d43w1rb04gvatt41uxign2pd136sytuzpecwxd2luqvg0rnu46a598y4gglp4ybizudoh1m7m2w0gjgoc1yb4yatonypfsfeqhiwloqnr5084h9f8t90o5jkgrmbgw0zo1r66juhaiquctnx17dstnrnegndit5f0xr0vwc7yhhw9nnxp7xbvenziwmexa45ejy1dlzuyff29ic4nyydbkclk1iiqzucj1ow7kwzwtgzgb270vtsq641tab6kij3us1cxthq8m7x79kvt6yqjv4bkh8kbk7mes9opup98ffdscd95z0ohnuo8vl1vl0iurafsoip1a4mc7r3ff48qm19dm3q2ir0n2utk7ezwy3u9o9d45xo859pyl3z3h7s8j6gnxcjhw5x3e8ivg2p33vaiplhedvrxjptt3u771nlswm3droke8osinsrnffp14u80gccvrhh1bodk0thkhgsr0h61y0djoz8v6ytvkdt46o0ytoidobj85kiin7ndlzqevmzxzda6rf5cg95sskq841jr17wrsj1xyyq4o5akfqfo4dzcogfk88w2kkjg4subw52nzodqniaeesioffmvach79r5h0zicow0pvp0y6bniwk0hjhw0hd3390yop8eu20rfe0oac36n1j357wx87blgvmsi6bdapwzqa0mnl9vjr4wz5026nwq8fxgkrsp8h0169vc14ojudvuwohumua9qfsdztm9a4pvg784wxjg19igh0n8urjrvqwze2o2cf19ddfxwjl28llvzmssb43ngjrz3bt21ls7ykspgc9igp5si6jnqz57cnaybdvfi4zf67nyff0pckpxu0lwmhqxd6lldtwhqtbk7kq7tdeozj2wkrp7d5xssp47l5l0yt5p68b6u81yrlq0djfob3x0s3hpg1zctfy0ukwasyo6dn76d2rai6w',
                sort: 284211,
                administrativeAreaLevel1: 'd1yvhncwk670p10sclkggnn6cztt49c88pcww99zvqqi2u8p5e',
                administrativeAreaLevel2: 'i7dggkccvcg2mv0fwewpa50k4ve2gpe5xb8jsaamckce14j724',
                administrativeAreaLevel3: 'nzcsu4hfnyka8iywtfxx71n6t2e5ncvostxc6toheilhru73ej',
                administrativeAreas: { "foo" : "bar" },
                latitude: 620.99,
                longitude: 717.37,
                zoom: 56,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'k8',
                iso3166Alpha3: 'iu2',
                iso3166Numeric: 'dr2',
                customCode: 'vhgqp1ez9x',
                prefix: '7bqio',
                name: '8e3xb06ovykn98myv38slul9ogricf4yvlp9ihnwhizcco0xdhfenu6yzvh4ia4ty88iw50ml2grp3gp6fp5w47715c81rkkgd9xcqicu4oth1eg14dwukn4hliobm2mailztfmvwpai85llcfgnqzauafbnwva0tcle69mm25r0b8tsb0mr2s6biqc8mivepm00yr73aaucrhtfowl02ebmor052kpqs2fowkh8kxmwp6lppixikomz2gg7fp2',
                slug: null,
                image: 'jse8jhb1uk6h8wpiaqmpnkacg2k7rgtpkxxgvzars4jfus5ybjevg72mdfu7gtd4c1z9haw0i9e7evocecctr533ujubeqlvppq79c8yqeup5knrry2i3arnh8pijqk9auq45armpf7er52o0dqnd05dnosn4vmc2z5l3klvusm1yn6iywt2b55d7ewees5xlfcxe7hitotdxiz5qm3s3022yd0n4d6u1xtotfgdydv7i2ycs7j20iicl7dpdvns7v3n9si26b9tkcd7nn8fyaz1pj7mck7yn352jichbwwkz3nhugdexnxvj67a2x3wfwmojt81g4td2gyueim38vrve9ve938js5gdf7rj22hih5cc3qxbai5e057vj2noslw0o0v2giw0n8sfg8w62byayid0a9vzi3iet988egh9vqncwpqhz8xm8lvlql3ojjjkc4rirm59xolahti0tqh7b64d7h0r6y1unhn5evg4ew3tkjq43riovrs390ao2994rx58gmwo0y98d6zm15hik9cqkxf1fe9dbbmwtkru5fqc3fi8an762aw2u1e0nze1xj70f1blwudvvjkur9tueaqz0msa4vlweok47va72fxsvj74yn42pmpce9nz5ugye9fujw034xsnjq47uyg1uanjwlzz6zpfp23p7g2k26oxresdmccm3ykfl93mun8j6ajc2e3bcs19b3n467wmwgomm07getl6kt30xsz9069wc9a24wzqbpl5msmywqnb6pkopqs3fxbf5p3uc9galn7llq4tqfrtqxhs43c7ftjqma2qhqsfhdf6g1c0a6b472g7f1ebqqhx5r2nbif44bl3cep31gt34m2d8nihz8m6zxogtla80x2jl32h2rjlrls3o69u0zkqxn7i6pa8pp5tm8v7x55d2mzauctns2fgcdffvio85oovwcijkmks6r5ps7jg60unmkqah1kdl9gce5kseheqet6nslkh874ku1glb0qqvmnnj4bm',
                sort: 439776,
                administrativeAreaLevel1: 'my0xclictt2ssyk5rzounot3ghu4h4wfgtkxi3f92ccrhuxjqf',
                administrativeAreaLevel2: 'h30vfm9dwttfoc1cuhy2rmm2so539f0wi50dbbwzmjf7etid48',
                administrativeAreaLevel3: '1bhmiq48f6hmtvubypm0qlst1lmu72jxt6uf3no3pr2lkjp2cq',
                administrativeAreas: { "foo" : "bar" },
                latitude: 382.53,
                longitude: 689.89,
                zoom: 48,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: '3b',
                iso3166Alpha3: '759',
                iso3166Numeric: 'xkr',
                customCode: 'fyp2230sda',
                prefix: 'pffj0',
                name: 'mpk8fewq60h211uo8h9b9wu1zu6vvwixmzan4ftzejoevmakz6br31j8rnidsxs4b4vnymnxadbfy16rr5bz4gzfu5p2svbsd8qjrqjerf6hny5k8me4d5fz9dybimkm4kdba0zscu57s95eqvcz40nrt4n64ouqvtklhdqj7uu57fkodsqx80gfpd11qhp5j6kzri53ysj116ldocpmcjqitodi5kn9p7pxhn7csotz8qdhn739gk7zj2cjr32',
                
                image: '5r79aui0crtaqi39trhb08zr2jr46ro3g4z610zl6fpwpk2drquiqv5qiwg7uebpfiz7t9jg6du3fh6vwpuomi0huub596b5tytgg52peh0cpdii4xuotl0mx2g9oloww1y4954v8si8i9taa3gakarwuqy8hcpil0bxo4fabiehxp3jfmiuovyfecuad776vi8g1z9hgtttxri5y9ggt3e8a4nlu4hn1k0vf3w9jzjpnshgfp73307ibul2b6h77uftq81o6jsdjuti13kzd51zd1fcbk1vv5sez93cje70wjrl0kuzda4tjhore50a399bz91qe81kpvu3nwzwfytu8qc2ur5g6li5yn8p4bu2mi5rjupqh4ya1h14pxgycrewbopaqw7fh7locwxr3vj25fwhlhjigvk5xw78u0w7o2gwd4natoq2x8m8gmp6gn8h0gyopnlrg7phnuyfcy54vcqxstrptjkkaxmnh9mk8iv1nunqi6yzy9kfzm10muon4e73wbudp4owolo20u7ps4wxc0hufbbgxljhcdwum8aoxl3fjtx91u00sfqcmf5ye523g6s3kzxu3tz75uoxn45xv8i5n2d15nkreom8zbqujm5ebw6eq7ea6hozqhvebqc3qotwhwkgw20i7cpljlgkup287e25wxayo3b87gee0yfshmopakfjzxrjlin72tqxd9elbflrw6cz8av4i2wu5ib0p47y0u142fg8fnpw73gdzqtsyglup0d4bidn6r3nc6qnjxddtjaezifws87ypwpza6riqsrw7uvna3ruv08g0ninr0hx2uhz6bbq0sxidcwd0k32vux14nmlvjsff9brtubk1nwo9y78qt3fqiu55eqinzh5kp3q7idex0shhj5tiasl1p6ds9mbes5346xhppokhiduhbkp826gp1tw2rbw6yq2gg6c7ch1bk7ahmeqxi6zcgmjhh2acxw7kaf9n72aeawf3ytov6z2d7vp221mttq3wr5f',
                sort: 730625,
                administrativeAreaLevel1: 'mh0ut7z0gxooem4zrwbjb8ldljyaapd14lqmhy8lbwc2tl3ep0',
                administrativeAreaLevel2: 'htgtouq6ut90ueqihhe86cph6b73q3q3xasmu1v59988t7k2p7',
                administrativeAreaLevel3: 'o2yazihq8cxep6e0j5pw4mtvl6wmsccty28zhhujoik9bcn0xv',
                administrativeAreas: { "foo" : "bar" },
                latitude: 501.72,
                longitude: 715.64,
                zoom: 64,
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
                id: 'w1hpjo351v1ehxqad1s8dtn8xwxqnfdidg9jl',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'xb',
                iso3166Alpha3: 's1b',
                iso3166Numeric: 'q8r',
                customCode: '5klwss7qri',
                prefix: 'gwo6v',
                name: 'u9ucantuso9nydvx0b3r00negpyz3gr1r7fs7h7u7hcpuzp73mk82tes7mqbggim5h4an4gvpfqtnf2pvahx60frul1ql6u3vrg92l95b63s1jzs2ji25vamwdwi06p6ki2wovnime5i5jhh226dxyf870qqdi2gnqjmsexnak9ib0fndxn5bsdyixbqien8ldrzp0f4af45ndflklv063m3mlc1cwqb92he4dz5ks56n1wt2evx1pjvkmvi1eg',
                slug: '8rksqoqnuq3xy163f9gj7rn6gz02vtrgln1uygt66g0gu9feoeg2ypbklfd2qsuykbmhkpcoio5zr5jeyfgeobd8j762k13uzy22ugyeie46zkdl55g330p3fbmt3tau0o1iz1tnq0p1e8gvd6coy153l8tootcgy6oesruy155vvm7e3l53aqdcv8m95hde8i2us0q3rypg7ojati7g7eewawmyfwf9d9cwh8qxg3kk5mi3zbgfmwiop63mddxyyhc4ubplafedwkqwh8sow6hs33qu23f3s9invlonpx80jj7rd6xdig5l12t2plusvyo3bocgbrgxp3p7ps5uvhl1pt9rqt64it4s2gbaai6ocwvw1399f6b90rm7spykjy7s53mt3bcy5vpi0arb8zexozpzp7e1oaz4lhqxxd07u5m9qe7a6y940ur57iji9gkr232slhyhxp056zdy7sqmx9f104k1ry96k49f4a1yeetgootfal7kwc4g3kfwzlshb1nskun73c4xb7yzbzv7scfr8yrd68a7h48h49vb8d22jr2jdum1cl6uply7ryg179okj4pnen77d2o9qj8o4ofuir3syk6v3dfzlw7jmf958ql4d59cgvje6ludo46hvs7jkok5n6rai6uahf0uuwrb1dy6o7s5soso4sv381uv4o9xe1te8mksiezrqqtjsksi7y1cpwof7hbmualkgcg7u5791bjc66c5r7k5boeil8xynmvy7g6r0ql3w6xx6hkavn6hm5rbsvoec2n1yf4pl0llpxyawhovcviu9ihirfb2uroj0g92b5d1w0mdlu5vps7v138zi8z7i2gfsae7fkrvtvdflhanvvtsy8bdbguacbq3jl3cyw1l6c3as0si5qaqeezieq8reecbei1qvsg38967bsgkias39uhy58qwh6dwfgr6m42ct7tp3pr8dyu160xi8vd5x5dcwxsue29n5abroz2pl41e34efk0y65n7gx5b4811b',
                image: 'bzhgbf74bse8ksi9it03mylwajlnuamxu1sarf9f04543pn33pg2mi2tcnlvbb2ga6hb87n75amdgx472nk0v5x1kcpe9vvv06g7nmfq8wmtm8fhz0nuqb10oxar8luzgaitiphlz4x3iyx95eaq9wpixncuzowt1ub6x6w49os8dum8igovfw7td03mi0bztmksxv1y3sq4vrcyv3p44217t1o7ddvho5rxyp1dobgmb3oeiqjkn35j78aju3puegcgr07q23xcsrhws10kcpsszpbrn2ro9tapslyjte6xucjgwnf3cuixidm5y24hk2sc2zluba1m69vmedaisy8msl4m7qu1u7mtf69vfca7i63tvrowbcsx3yv0zun6mz4ewaw66j81nqld68bk2y28yh9so587871gvn73h1ytgj9l4y9mrye6v0xtpvlttlx06nuqcfk81xav4mvsnugjq8izi8ifuofaqenq3qd5da4bdfpzg2tr142qvbth0s9xp3migkgu12162jm8pwypt5dt65nxg7922mfyn4lq452nlnlhk4cb7fwmdh5ouss83n0hrbuih0rr0wwxvjo0ggovewpxehohmlthph579ohat9jtkegr6vs2ggqte2zj8qytet2wl8lp0v4eef5u7nhe8p98twlc5ffmr4jjti814lfbjnx0s7vew099i8k6t0odfnlx97fnu5cwigtyh3zwnr3r36j96ekc3ns9nxiuh75eu8rsqvhvr3kq646f6trv2hg72pceqndr8wk4vbuysopsb380d60tz2nhzuf7r5097cinrq3m4qvj9n289x3bjt09w62w5rlvj77b7oyaae2ota6xla1chjzefeqc89fbf5lp4ur5b6gpz9ewfl7ptt7ltrjz748o06ucaq8ycitur0kv9du4ns70l6w60ydtqjmyqnkjoixidyefd8tfaskfpq0sv8tk9vdgfh6301ee5v3iqco9q7o19akxy8mh1gx0g6ofx0e8',
                sort: 341986,
                administrativeAreaLevel1: '4le7vtlktfso3fy6blgjyzocwuuwk4zcav75l12n4w1wc4kbrh',
                administrativeAreaLevel2: 'n84koacqtehzhcplqjuwoxs0uya5nsewa6l3lq1kdkk22gt92v',
                administrativeAreaLevel3: 'xz31p1tysa14efpf84hzmpm6j54la9e32ichk51p92ejhgqf40',
                administrativeAreas: { "foo" : "bar" },
                latitude: 912.23,
                longitude: 277.65,
                zoom: 92,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: 'fc9jwgiq4dc98zd5cxhp7indp1n4jhg1nj9zh',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: '3f',
                iso3166Alpha3: 'a5n',
                iso3166Numeric: 'ju9',
                customCode: 'kl4xmvocbs',
                prefix: 'krv6y',
                name: 'fla49lq1wynxelm8ghjyv7gf8ehak0wmrflr68udxfa0yx9p7atinuzr7suuvyci9tmnmw4d99feo5x8gvrvrmdwnu05kp322vtxqcy6b1xluua7xflasbd6qqqnxou2ini4ifsjcszu72vhszbolmylphz7a6eeji8jt3jwqepavmd16iuj8tetfsjd62tq3jssrgqeylgkjtw9dj7wkzkssmdiftqiiqizfdkez97awi357p3elku3yvni1i2',
                slug: 'av7rk31wj1viiorvc2hh3z0adn6zmrqz9p34elc254e080s3ofjx7hdu1a5ypukb8xchk6tl78xggzdsv9vn94lbk59qape0icqxx4qfg1jrflfk3iddqsbm4tmsvmx72fjz362tf69p3mooo2fa1l6j6ylabx9foydiw6g2gyt1rw1o55prqhex6jullyyomxkeus0jjk5gm4tglmj9g4tw6i0ampw67wzuq1ftblljstnlce2v8i7j7t49240z5e2gk33918w5u14nug4dt3t1c5kbdr93ue84pmlzodihltsbpjtuotu86a1ix1b023x6hm9k6q2yvc2wlf7lo7t5pcbhqfp4ehagapq2dejxa2wdlegjqh141rd2j9nrmn2zo00zuq8092x7w8s5tbtmtgkpkrfc42cqh22mte8dye5uxb3cavz7uyppmalss80g0f61d2hnm20c6ph0dcw79yjemelsqw03gvd0r76lwyhcnrzimng7yrvn3a6jyrgsspcaaj3lrsyoa4bvd71p4qc4mmymjm2cspwdh8yu62t0ve4jgbcz5l6jta0rw815957x265kjjolpmamn8z0b9ukm307knfd4jkyal3vbm3e1chcjxe8jk15w7nxq4ffh2fx8hhy5nvcje8qlmyjk2xe75zchvh210gre91orokjf5qkti7bvjvgrr8qo6mp0e5kznsayrszagbr5qlxemdkrx9bo8678ecalrtnzkjcdhlh0krrx2xq366hx0w38jqefcqdih1kafwvn040gagkicwpnaoywgifn9qg5lxxsk0ltku5d5evc42vq7j9jv6n5inizap6mpnhzghlzv1n4kq3npbl2jgjrwv39492v8haetgotmrxg2pyhaz42wzsjsw82uoe3wzrxd4ulhpvruehdb9dt3mbc8glls79f5ekmtpt5wxsn3zhe2pkh8feaagrctcjsu01d6j4w6sjlx8qlvgorxgah9fqgr10ex13g3rzhdq42sig',
                image: 'j31phll32ctczmeoun89amy5e6lynnz6y0zn35af8gssxuunuq92l61oikevlpppo5r32lb4ver9c6s42g04fzhm7cegymbprfccit4e4jnmrfjmnxa7fmo3uas7ny5d44l50kalx6iff9zoobzxaucenoowkgbhvsm1vfq4ntklrzvp0l5bf64rw6riqcgakx9vohtm7hb911mqg9zcryxbwuvo4ki6qhd3xi8qn2n75zduviyo6v5pqb1owxi5pwom6982ddz4w7ewk9tpv55jnq9iivym9zx13e66zndemctdm04zwldmda2pjdebqybyw85axlkv9w3engoq2827myp5tyxoa0k1bvmalq8fhzfege6eeo6w2fspk5k63086j85rl61q2zdu3tbys2gu77q127ohgv21nzwe1s1qcfi5ev4h2dvqjgu0376omvqghkf9dm4zxomddvuovto1n4iixlt3jx7abs2eui14li0aaqp4mgdi0cb2l6ulhq4h8cqiozwerbkjmwoloflin0fkckb5my7b94cv1lks6n6nx86egkvstpg13j6xlk4df1dmr3agna05k5qis9quqojr3ys0r3xhvin745orfx116bm45838w611swed51n1ygmkof9a3oqjq5z4km11s74kp5fz118dzpvhhlliaa69oz2wj4crh8af2fjqfumgmgtrt91ha01avyt7fcewuxxcb09mtgyw7i8hvv0mtnhtx1e30htszdu2lrb3j23ptmrudxhu8xmfyn1d5i4pfld4z7t3h9qy3u3q3ubz6nhndit8tsybbt6q6zikxp2409p1ko5gyn0uiftenk95ohgnjinykpdayf9hozbmt7mjvthaz3w54dp1ktrwi7f5vbd0vbl0fsivb04cri0ruacpm690ffuhmouw491l6cisrmh15up6mwnyyhczqiu2ggnypwwg30zvd3jvs21n5t25luj1x7i4lhjl1p7fm0guxwiozrl56ssltwtk',
                sort: 513851,
                administrativeAreaLevel1: 'kpwh0hsdmx0mj8sg2qcd1oypbvuqd5u258p3ldb5k9o5w9rloe',
                administrativeAreaLevel2: 'uvkwb188fe45zfa30bmsf3jefelzcn2vnnyztr2818rf85h2pd',
                administrativeAreaLevel3: 'fqgdsipv13arowtoleyxj5bfzxflgcsw0zud4dvdeqkz2vgcp9',
                administrativeAreas: { "foo" : "bar" },
                latitude: 669.65,
                longitude: 277.20,
                zoom: 14,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '48wyb0d8sb0sf8afs2z2levhkg4ti3jzr9se6',
                iso3166Alpha2: 'h7',
                iso3166Alpha3: '4kc',
                iso3166Numeric: 'ypq',
                customCode: 'kz1d7fjdvu',
                prefix: 'gqclj',
                name: 'th6fbty1zim1dbmkmm2mpw6aebts9bfr7pk93yea9v7uq0oxc4y2tu4otuhpy7eyrq5sm1ytjqmb30ngq8jhnb8leiwtk43muk4o1s6qb5btgh2bhmjr56a9xpgic6g2x9zzce5ch5e5ru6rhmey20b9438m4task1nur77ltzr4wholl9qtojygyggegq8492f27xlh324gbb0a46an8wqoxlucso7ontt7zuzh0wkuvxklyz8nucoacna1flb',
                slug: 'wflysa9xez3vyt7clevfo0fm6ew8kqqr5fbu02ljq1l7pk6gzc4dyjsfpvrwwlf2eipxgtxf12ba08e8mhsxcqjnjnd1cg81xui2y3akp2msk751i1i2l6u0g0k82o5hed8wa8aqkwtkttg7d54vxh1nddt9q0i6lww0tjyc4ggqb9cl6dbfv7ycer6qxy7wl6ulb6o9nq13b1zlat3ubz5dl6v0o9p61xu730nw421nsoxjoqjjpatqeyu8e11jqr0xzus4n79jnfsz2p6jv3f7zxrnljf92r8nrxfifokatjllr2gpd8bqwqcqk2672h4ra8ewnzgpf2g194vjniqfwmvgq1r47m09vij4vxfuqo7xf5gi6otehhm5dtc8cplseh61tnq89gty4zke1wud7ovkb9egmyzfi0uxauetnkxg020fov92dhokwcn0ajevjl3jocgey7bwpek9zm27o3c8sitgh74k3in7n3061yiyzsw3pi4y82kop656yqpwaa8bbwz3g0k2pup3symseyzkyenas6xe35p0nqj4oote7uswlnti702mmhao2k6ktymglxo1gwyhgrewcvaisn6y4kiliok0n58xnqr1peam44sjjdbgeh8y7k64rehlnqc3tfrztmx329wud5r0p6z0gjzxr9j73b103msulccipg7aojp91d2eygul1fowwpxsuqlbnhcpbpy5oaisuw8gmqxlkbvebjfhldxkgibt2jii4u3adeeh18nc3g99wgy0zwr1e8mwsk3twmgytkzdlgl3blpcvo1ntdka8o094b0rosf53wzr3pc43entiefnnparrijs6l99ecczizzetdr281elc4yzaqowou8eo6xxhhx8fahq6uhfdl4zpxrm33yesvdqkq9njd6sua30liiarxhohjyumq7i78zjphoehgzg9j942mhdj7hjdqj1ldl8kngxuni64zw1q89gdkyl3naov8gihe5ut7ljyrt1nuogdpoeqorw',
                image: 'x497k6agoalz1pg657tho5e2zpkqwt3atjo68nghebcoiuuh7mm51kme2qzoz7e6nwytvvordnavkyqvacsw2brmjdf76jwxy8tw5ayfgcwxlvka2liljmzp4yknrjayagny00ish7ey64vn4r00isvqd788kagukds2b97ayskkij9dbah4m91geytk2a2v4emu1f6kveuwhr3dxoegvopc12a1i5iy5m9owgaspzjwlgz6i8hen99cemgwrggmiwfd1lm8jiog6s3xc7x12ll77j93wief94kibxhcnkqeb3esabxieamj9ch2tuklu8mh9r54aryjg6pveqkfkhm08yxy2yuk4ujhaltts8e0rqxdykrs79zjbzku5fj8yd0mq6mclxwbm05ozunksa8spuslp4cwx98salyhe7ge25hpig02d7p4hwl22v2bb7xcune8o822gt39uffsl41vo9j3r9vmjsvrf0546hzusis01vinznw4kxkuc9wgveycoz0b86hjzgu2bchsanfwkyqxnxk0nfqzpjatgs4kzv50jrfausu93r5fq01i5apph41vl8japn8q0gc8ccubkq7j9amqgc23k9q21t60uazsu3nqihwxmg9s84dgcufkahe3phhmi0xovg8f7moy82h0g1l87rlaz9093m4s1cv0o9n0tb9vb5t0lm7qkv0eu7v6w6duvi6lyust91pdixjnoxpoo5p1cet1c20we3k5z0fqosulnoiqxqoy55jbf04ymqvfd2xs6za5r5jvu4onwrbac5ehtyem17j8yms8z3pirc2hikgyvsfbo51j9ujlqfd87yn4osm89sjc817nvqdrrfcxy8n30x6yygho55lxg2kdyar3nxbv587w48iiik1dfrpfx25oz833ya61trwsqdewc0b6ridbtya4kbhfs9ll40ygdkbjr2fhpqutq7nf70en192o19s1aj75b352vipohurlqvd0dedtpz0g3dg3b2mbjdpn',
                sort: 470187,
                administrativeAreaLevel1: 'umhg1d6jgbzanw2gx29u11lhzt92e9ftocj39ancppwr54agj5',
                administrativeAreaLevel2: 'e08or7alt1w5798mshs9k7zi7aozemb9ge9ycd7v27f5laahzi',
                administrativeAreaLevel3: '8i02p2e87knpaaz9p85gk4fospb584s191w3odhgoubkmtcgkv',
                administrativeAreas: { "foo" : "bar" },
                latitude: 949.87,
                longitude: 430.08,
                zoom: 96,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: '3t6',
                iso3166Alpha3: 'n9u',
                iso3166Numeric: '9om',
                customCode: '8s7rwrcpcd',
                prefix: 'ks17v',
                name: 'pa7axjngyphyde3xxyttdqltupestyz7wxpisqd7xg9w5nqah0rjn4fsw5tx2slqe93u58c7qe2so9h57rwt17hn4y3ok4x6tbvk360r5ebr2qb50sg5dsppbo8w1hk4fys41ynsc2h4t3y4a904izthx8ftqe3paxssharhxsoohrgy3852v5rx0fmdzn0hbv3dkdnctmd4quxtcssomcwv1tcfysc7xrcp31mdkw6a3w8o6q0qsx4tmgxrt33',
                slug: '4lt349e1ezazalha53ssjelw677s9y3w0iv552nxtfl2p22t13jpl5lncttrz5jxyw65scc2ex8z1m7dajjekfohomndvgidalb2tibcao5ist5uvynjxgs6h3442w0huqp6ovd7moahen79w4iska21tg8qz9ye6l08h70ybmdqx1cvfjm2273n04dp74kyupovn2d5n3g2uui1sctirw4dyx92vpa65e8dcd8kauo36s5ykirfta96sc3qqyoqfc7klb69f7b4a18ajca3qsa7knmmkq4vewqef91kmuk260ksb3lr08mp3ggzfp4r6b3vzi4osafpb9axkepswnuxxwzxnozmi67z1iwvvf86gr3ny3qapi0lbkgu3rs04a2jkhym2y6nj5tkuasmcmufb0ubjca75cosvi62r1ozqowihw1lwoaz7h828go95vyamg6j2ecewnb6zjizxwpde2g5d08kdf89ug3qyobvyda2efdkbnvf3z5gld9ugfuhoffc6taumbpyf7r6m5cjthq2ho8f1ssgtu8cveng2y8sdpon07buy16crar4lvnn39z5db60ejrflu6rcc18tmqx1aldd8hqu5d2vdir8ohx4z1enb20hius1t089ouexbiix81you22lt1dagc87sx8voj880ey8w5r8zcsqtkhlywsuzxxeaoqtjh6gjmei3iu8y01478q5dnj55zq3lyl2g4vhefzv9ium0olrotbk158ahlzh8cr98ymt5iue8nqj31dd5n3ocbo86ukuzvjocwgxxbobznqyt18wa22fudwr7irg51vqse6n9dbjnu1n6qmhu7vj118bh7y9t802y2ln0off9f9qpoobdoxwtxlihgkwvocjxk8f27owni15k8eyrmjtesxfkn5eu3sy2bguh2mczsfmskobsmt65seuxl39z9x37f79rsvbl7iabal4k2oqdsrrcf7qw2kll31mq4rladrk1umusalyxqtty8xy7kc5zw9',
                image: 'kbt82vpswycno6371soab973fatkio5453y74od00uc7l4cemgxqe6esoeu0ycnzqa4tflzm6u3adzl6g57k2q3p4g91ii4iezowo7otysid55ve4pdgjnis4rn8x8i3a7474jmsi58ax9s6nt5d30rf1spn3kp2ze3ivd21l2dyelyxs2z7xnksfsp7lxmag4d7m7j5etgtwsp224lp84w9hxahphpje1q8hp8wt7qf84b5alzv7iukwc1za5o3qhbcuyjv7waxlxo0suv3t27cctbpdp17aki1clkswjb9kv4jyno6bi610c8iqvw8frcsrgte2dhv9fg78tejk6zzou02utwuimmjiyapz1lgk8g9tdfudu1ecnq0tnndtf124h5ud0g2vovtumrfituaj264ldajqgzi4l68100y5y917d2j709dwpibnxxdeyb36pxjqh8e7a08pv5dem2hq5u2bwp7krqlsz0r7fcgtkido429vu2s4khvm45c76shu19vhfqawfj57ho2acfa2ncom5gwgj221dxs79wgnk2ce52plzchfhux3853sg8x62syt1sko7omcmx0xncakk2tjpuooh3f0yyiram8he62fqsyh3jekze3k8a8rrm33ovsah2f19m0fvgwx2f2pnfgma94yyo2mrzj6tjh94ly5wfhsxev152g5l8o8cfpwl5s0faxopt7o2om991xjxoq22021tmld7nadvtbslfuv5hzdazwceunikukjptyvkqxhh2vs6f9t9d0o6fqcyoptqms7coy1z771n6l29g1h8ig6khh53z31w03loki4em3lo07jh6nyexealtkmln3k7vflrz9lwl4ab4cwuky2mqan5g1yktya9eyw7s1ieytbuul0h6jqjynxaxrcvqkk5190966g6anfs0g0gyfp749kmls2u7bnzx5x7at43qp6at4b8lvh02g4s6t20ys5sblyn3a3liit96uypu3ri61dlcadhaqjo50',
                sort: 305512,
                administrativeAreaLevel1: 'nimo00d3u6hvlgyhie3dp4jmpcrl6fbi7gh16nud4jby4r49c0',
                administrativeAreaLevel2: '6jljpfbe2uq5wfzumdg1mnl8i7z5sri3uy3k5f0supp98xnw4k',
                administrativeAreaLevel3: 'guuinfvv6pd4qxl0x3uih43q91pq7j3vvjh0j2ljsq8ivyxkbj',
                administrativeAreas: { "foo" : "bar" },
                latitude: 611.44,
                longitude: 561.94,
                zoom: 17,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'l1',
                iso3166Alpha3: 'i4gh',
                iso3166Numeric: 'ijr',
                customCode: '6wlqntogfr',
                prefix: 'nrbtq',
                name: 'atpq28i9bgos3k5q7oge3k2mhiuoae9z5xqdjr37rmoxv41uu0cj96ezx3qxjqi3xkkd6dectxmm79vngsf98nfw334xwuf15n1f9f1nvjemlrft2f4c21gh78mleyv6k1mzo1g34oyiqn5rbgi9kokjweqx75a8c4lnthp31c8tdqcxz6zlfvpbtlbzchjyqxajmt4xe20jnprntoyscusy1co44v25aldeon7g6g15kif7zhpb8gsmvvo1eng',
                slug: '8o78zo4nx0dimbw8y98cm22olsw5vxd443wf8cb17ql0r4bci7f0e4msfsivfmcxuuxc5c5xavho315huul0qg5d0lv1fd7u14hj25vaegdqegl41a9sgft69d4nyhihvm7amx295ektevfecgvl6kpxvqwt8o14mvzpvf0g2dy6xgijghp55swphxr9m902th4allq40sasn6b5j5ia7x2rbqok4gickmm4yomix08h9rmykhzz8xhybocwl7c28mf2x1lnulp1w071qlvftqycrzz51rx835b5b7t6qh0rmqw3t2q9mt6ko6txg1gcc0r55qu8loqs4pxzzwf18y3btnngsl11mypy1xruzjmwieeazq2q0u4ophzoi811jry0uljckh1h92dzh7i0thvn00j9sxv0btjf3bzcd75vxlaognsdw1qmkpcv0gavjgibxedldhuvyjtb8qaw7eamg1ikzg25nr6t59qk45zbn48fj8chsxx17emmdlsj0of197noxr8ifwfhawu5xduw15fyhmk28vzmcfigjd6og3cmkdclmxm9qkq0nv713ch4x3zug0sz99wrpt1infy3zuaglhpjsvbkbgv9jygmqy7siiqohfyb9sbcg3t3zx3mk2iqu59s6ruq3xvbfosd033eoacfja9y1zx01nkdmfnkckp3h9cxyaaxzyrbli7x2cybtafxqobdvnx3nrnfpaq3a4ij3enwwhddyw1fojvnmitn55l9pvyd7s3joqvecuatj827vyexj81r9i6gwxz6aggnpgpmp9xq8gamvhw2csw78494smdwv0d9dtdr3tqxmx7y67urkkik19kowu7hi2bilupaow571s0yjvw4brunwn1ctaavhee43a342i28g1anpsjfwzp27m3z59nuryuaj0x6k5gmd5ajnsouy78r6xf7ajnhnxveukml6jps8wvmj96kz3ye7mrbthx54vrjc0o9spczt67m229j8omntw2dven3539t',
                image: 'w7lh51f5rvdrd62kl95cwqzrsonozwuaocqit2rfebuylctrneokl1l9ks8xlgymp0mw86ghd5d16n1ua4gevws39hi8sa9u8uu4ma2tbjaaj9y7s31ika7vr2wz312l1bszmp8rdo5svu9mlwfczg60oblchn4sa3wisxxt8c6sy0ghu7ngqfgssihkexxbni1dfkn7bwg8e4gb1olvwfbql71mxeesywrzjqp4u5hvebf5jssil3v7nbxogzwv4pca80zyl1aqi3azsvcbeygxyl801pjn4ojh1qgr30eqowvdvobr3oluu2orqhenecbslxyfyl2ynh3o9x1cob806nfaaio03w0kvtta1za87owa6xfl5bnfqdpx2l7gcu7km1kxpinngxpcb0d40t5zy250geklw4bbv06unfdrgl5v0984kznhyqki5f9139cgx119x7wvzoydshrburgievdtnatxeuz2iix60yu19jtq0n8w5prhsc5q3ii79dke6525wykxycgx9csml525pqi8u9g8tmnqcelg22sfzzp0ctb36aju06cdvozitocpm2hwhqodjcgs0mnyujcgxoafjc3gstiu4x9my8h7zkrqomkk8n9vi5y0gvt6wwx0cgbf34fva367zvxyf47nmizh36v14rsr3nne88xz4lk2rh7e7rqyqusijaf21cdfoqj7mdxpafnj2fmcmdma2k85rp3mb9h8fv8lqp2l0k9bu9n1gnoevckq1c18k4hv6grrbwtiqqjzyke1nayv5acs1dy7o9dx2wjinwdxggjw25sveez1bpgyy7ftmb84hlsnawrzp93enrtqadhpa3f8uydnrp0nttemhfx7eqpy8jf9v8av8h7wak8y1mbf77zci64odj8kt0vdnkgx6wjamzgramsa5d5mhv5eoynn9i5s9x6j2pbsejfxtynsiamffgpn8jzi67vdw5ns8w2xpyqr25q6b9iqs990sjrg3ia9jdzpkx8odhbc',
                sort: 732561,
                administrativeAreaLevel1: '1ws0d3xldhw2ej8jce9a98ih77d1cx71h9h474znr7zegngd2u',
                administrativeAreaLevel2: 'zrht96n3q0zcmuygisygefp83itvvcpj4ojq48kjkdb4nysx0v',
                administrativeAreaLevel3: '3fu0875w692yp632v5hycwlfb6wh6sw93oq6hex2ynuo7sw5a1',
                administrativeAreas: { "foo" : "bar" },
                latitude: 895.19,
                longitude: 780.35,
                zoom: 20,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: '9j',
                iso3166Alpha3: 'ijd',
                iso3166Numeric: 'c2p4',
                customCode: 'ukdbszbjba',
                prefix: '9zf2d',
                name: '85zj6fqybsy80u2cca0jcjgkdo06g8bqoss5acxq68i233tdkqzjl2h5rg83espy7ryr6l1fzf8sw98sp18n4cu7krs2aqriaesy5dvo8ok06l6eilrkj57jotoirfdoxdokmo35jyw07rfljwa77qpnddskc65j1cejvu8oc05s8f6b3xmqdvzr72ohk0zt799lhxdd77zppfns251e6vystrzasbigf4e1thh55z8y8tk9ihwpp9qo1jrag22',
                slug: '05a0rakul6nq3m1kvwcxdxyvp6x8pjra23rxveg3iug5d5uh096tm2kh62zo934funal2e4bjb609727lopx2c85zqkdvefig9ma550zwoq7s3uvvu5grejx4csrg5d7mrnsrukwy0k5qn29q13du5m9ew2q2oszasdzp0yx8ssb0z7yasc7mai0u03w418u4dheci47ewbonpm1dtv8fm1pt4mx9gd65ymbphm2ryuqqd3jwe2qnx213exba1gce7hzleulv4j5neiguqvbtajg883mcwg8ltb0r40topbqti1ey70l0cuaeu6bic367g23eps311rvtxzqds89uevpuo7vgaifwthqm188415byrti07glolnk25l835rf9ax75yllmbgcuo6ulyruqjp1iuz4omcxw8n5md1jwos6x91si2m7fn1dpnuan510xvd7uk36xu81s2ld4qnz8qknd3f336kkhx9c3b8od56rylcwmk00yk2a11dm5zm5wiwfu45xqfz7q98vgs032r6ab2opy4vklfeyqnok77zb1wtm6re2j8rmept9tzr358tus1wijpoxdyz5nadkpoo7y4ufs5c721fkiocgxa1cb1lcl16oqnrytd3l8c4wwnwmm1e1rwb5t1bp4kvf7dax24vxtvxauotvj8hpubmzb2nyhra8b44bs7gdo1uvxrzd5i9rplwq8zwxrcihyjsmby5dqtuhzf9s8x86erpkshvef8yine59gik1j4k6axovz5x3er9cxr0xo2i88j4krw0cwu2zlalwcod8g92p8mo35xl0b1gdja7xxz568yl8fk5u1z3znltsfh5sdwlw6se2l800hn5vstwghrioc258zs2fw2us02a9wen9vlz2ioawchtrylo23nb33nnevsojh1xbg6ejvi3cdi1ojt3q4s510w6wcbxfhx4mht5bs44227omlts8zl8j6ip7gn1gki19h5ypwvrdcmvrtcx90674qftgk5k1lw6p',
                image: 'f376rh3umzu31ic0uqij5z1rm3lxnfnpbnje2nn439hg92trkp31ldfy4aflxwa5nd79i5win6x1grh22ew4bzybcnm8kk6639712xh2k7rvybo7izpebtawxmp2zxfpz7osim7yv0er980ogbtktos8pm0sy4v1ssvejyz6hwxs8944jbch84zg3c2snmwtty7o6h5hg4zolpgl15qi9uvi9ziiv5qwz9y9d02nukvzgn60avlcse9qp1twwbfdd5i6t5qtc2a6wrue9nsovsbueaqatqcrxwkexgolpw0mmoyv1q5lh89drlyacx59pnfotd92cew59kq3j383h17ly0yguayais7poa5vc1b7hvyxrinrhfvjlnwu5kfiaqzc74qxqughpjz1nm44kroov89ah8mo315o0xmmp6jlaglqwdocscpd0n810niypbfvtlqkpkdn20w7xwna1zvlwfaemj0f9gz4c1mwjmarl27454j9wb5tn8ak5yeia9kbgxk6ja17gki77msii9v2tgguskeue9pjkk81d86wx3h9nulvi8q2y1nnvnmzwqo2wiwb0ea184ng12ajiq1xkgthuca93h94c1ajc50oq78ngc0ho7pkti5ja2kv7a36uttv58u4po9remy5odtdfosckxrjyumtecmr7u2yiox4tuzt1sndtozb8k64x7nm961164spvptqcnjphe3089ovmtpu8arpotktxm187efexsahu2xqis5kl82z9itbji932jar6j4e68fz6jqsxiayzbvtc93d68fjgk7x2m9xthyl7xeq3452en0v2l388llo2usc8n5ol7ttyf7vzqa2pze0dniridfzenzebu32qdra7x4t108drcjy0mam2e5v3gzob98qd8qdxg4n49v318x3xtr8bnx9nz46ojxslmq3abuktk4ulsczxue6gouhsu5sthg8f5ups0mb5w0x4dq02741lara0q4cjbelnxavkez200u1wf9t',
                sort: 535552,
                administrativeAreaLevel1: 'fsdmwwp4mu4ltobt71vyptdo53uwgo49q0ssd8serxvvkgzr3r',
                administrativeAreaLevel2: '0grv36r4lp6dyhtzs17nw4avujce9uveaxywp46is8knovn481',
                administrativeAreaLevel3: 'qyrk1flogu2h3tsph41tvzleu5aie3rwdiwsl5bnncnfgpcp52',
                administrativeAreas: { "foo" : "bar" },
                latitude: 587.90,
                longitude: 253.35,
                zoom: 34,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'al',
                iso3166Alpha3: 'owu',
                iso3166Numeric: 'dbd',
                customCode: '7k3gnjfnu2f',
                prefix: '2topq',
                name: 'ck2sknmk50qf4nit58ryutrweeapboduf41b83kii3b4b3vpz0onrxsf32952uzz8magydprnm4e6eqlfmvjysyevupfj5kbu87vv53x6t4iyrilcyfpkhdok1g2b2yh1u1hlrnj8i8zxsq8x6p4mvdqeh4e1rl2opfvvw72yx1ney0hr91ui9bd0zhflwdv18mpf37j4hyyq2d3vky0zvr5sm18utv5ljhc5uujqjfsk383g2oau4v9y4cq67f',
                slug: 'bqgkgumxr5vmofym9tqagucd73goby142mxfqrpfddbb7qa4ygbjuqtksb5o3r7owg87xutgnrzc6ghgzqknuz6thxnh05hq0gtcyiiq3qa42g60jogqjqhafwmu40dnc53snghipyye09rs1jikzz114e9uhah4q14bge1d5bwojxdq0xymj3m009z133admect34r6ob63y3pzq9uzthoq7c5j9po1shhb71c9k2yx2o12uf2fn6ahvogb9yipd39ugsqfilq1l64wxb74vi87mz2nlacbdnz5a7edklz3pnio0th74bi7g5obbewtnd3oun3bcanzlzgkqke68anlzxfdc8pp290kn7j624uw5kuoy7i6cyu74m0e0k36zk0mlt1hl7cobh5bccyzqklvlt8jb7juysb6iakth2db5ivgqii3gpw2fwjz0fcrfuehkemt24pob1ufavt4lxvmgass8z7ap500eumk189knj5zrubib37ffouozqe5scl6u0jivbbfnsqwxlez3o9vnu7teoml4f3i7o2gma4oig5kz03aw49g4bm3fs4k6tekunfhvqublomatjyg8x5mwmdy2h4k1uor56bb4a6ahozie75kfe4hlaes33rhjv5kogqa1i66ntgq9zjurjkykfy84ed3xwchejgehvf0raeqh9nmbp3mr7figwdaqqyou4i3eg17l3a277jgb6rsl9s8yhrcga8mp7qlh39secr4mw5ff1oa9tyuobirt1i9wzp49u4xhztas01xapgpi2s80t2oqpuj3ojt5e9zqhh5zkj7rcx3nij29nknooudopwcnbdkcuneqktch8ek264cqfgkxty2c1euatm9ieehy08elpql0nij0ynthe21h31zfuji932j3mix6d85ugqnal22owskajev4ns2oo1z5xd946tr9a05y1u1nnx5jhbk402kyrpn5iedlztqvm1gzy0kcl60omxbd6x1ukw8ibgydftd77n9pucn',
                image: 'l4042gzr7gpssosne558d1biwz3en84afifim61xsf8mmy4r9t070yqiaemzmayawe2phdqeeus1qyum4cztz8ltfi1ryg7zkfjqtlaerop90nhb6googv03kw8ordtquk4l72gsnj2v3sdiwl7sr8942ag5ltnb333nwhfndfbrqxvlbymzi3l6wqiyeqe39511plhqdr9zsh2oomhvxmqh1pyxq14jxyburjdwtskkk2dsz49wip9dki9vuc61yo235je6nkb0mdnul7z48um2o7h3blaowsn5pkjxt5gjfmzq4ttxdyp4z6y1vp6mw4sc84gu38r5fus2b2d1770hdmj82fy97zdpg3rl3glot4loxiobbj17ex76nznsh9fhk6foc6jn31098kxe14dt2bqomz4oc660nsd5bstglu8zjkune93b33w37yzyszh6wqhgcqkqxjjthhy0s5zjaabmo7j8khbq6j9zf5bmddcek6bq6rzwevovm0e7mm35zziasbvlhtnio9lmlzxxtw2jq2i35jlyekhagstp6irlba02uvnwjq0b0mxe57ej2jcwl62vh7nacefz0kdjobyj9d5q5bqtk1mzhfx0wc7kcxoukvk9k9b47160i5dlgad8gvrjynyh6p85qy3pias1e5e0q10t7v0qbqg9y8nv95nal6ppawudlsehf1buh4e674ws33fo18fhau1v8m4oqm7tb5415blngp4ug1qh164inl2t5dzns1bst6k5k25vph6wowf782wgl8vh96mig9fnus8b4lth6u9oi18tlolnhg2pwo6q0uvwe3pl0antpyrd2jv61pov82n01mgyle3fjcbpdo5qb8ur2cr2nnurx3amvrcqyommi6oufej5c5d4n26gwyhqdd5vcu6lezk8ywpm43z2073m0xy1jy2k7i0wl41uxl9lybynqsrhc9yzuo4i07wah08v5156hcs27b2dpoj5m2zerrz5sadpxqpvgc8eu2zh',
                sort: 465660,
                administrativeAreaLevel1: 'm58dnab3xdfps3oh0whfyb0bpsmkmywann6keeg3gkj0net3rt',
                administrativeAreaLevel2: 'pdfq3nwtd22z0fq559tbuzj53pqaxf964y7frhnvjrnflvbtlh',
                administrativeAreaLevel3: 'zjx99z0addiidno78y3p227ujyp9dxzm7ku763s0je4ez0ls4a',
                administrativeAreas: { "foo" : "bar" },
                latitude: 749.99,
                longitude: 212.35,
                zoom: 26,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'bl',
                iso3166Alpha3: 'syb',
                iso3166Numeric: 'izb',
                customCode: '31rwiruwde',
                prefix: 'jusih1',
                name: '9c3u6fsbh9hs9u9czx4bwzrau6bs0jky124cksujv36uge28ldbg4igvny187il9ducz8ro0aaplsroqo6mlendye555wjyt2582mo5pb06uhv6cft3u6pbgqdfo7e5ar08rnpwar6w6par7n1abv692wcdou4dhu2jki8o2e21nmdx8nboo4z0o92qjex7bkd8f4ftzsstukslunmtxrhei373wq1j15jt3w9x5eajpwytx5buaaftbw9stlon',
                slug: 'mm9bj9h4ac865v3rfdwo8bebkmv8nr7x6bvygevqi652cmervbs86ljfvstn6r9qr4435ovxocz272brmo6ih9urm6st0laoylco0o5ikgi0569fpldxh3mioa1hl2gmysbfa1k46xk9ea225mj8hyjv0ztoyy7xwdsv34ytim0zkvt0rx9nujykh8l3t22mbmn5jpzvifnjok57yfgjj5l0hxyf1x82kr665lzdn1plh532jannqhvz9fyw4o9w5txhfbizv8pqgj9xzzwo5xka66msxwm6upba2ubencp5kp8cjei2isvzv3smrmg4uvi860786e6gt1mvblhekhr1payh4rtavchhojktnikkwblktldfhrb31ppxrtpx6omfnonvigz5rkto9lqqnxgxm975ra8qo9t0vbug59r1jebld84pcoyx3m6u2c6ry2erdmiizygftlrcwh2573iukl9tbo7vsu2pg4838vovtazfiv408l7c3pnip4flcxdsxs15pys8w554f7j2i3vbnnqv5m5hrv9hj0k1befmz2r4lpmifloc1xk99f2fj50zjpcs0uylmzyhj53esn7ft3tr5j17j2lewol7wzyqyn9am1zohzw3x89xmp82q6luxu92wa43w2tyq0ffct5bwqojm1xucwkv87rl2f0tkv6jlv8t7gdyf8kdmugz2dcmz1kam4n24ua9vv9l8sve3lx8fvaplsnawlkg92i6linld8l5r4b8g0voqh9h2zz48gp0iu6kx4ebwlythynnufants27xibczxi6ypkm4xbkj7vu034448kug5fqe8suai7pn3yx1epiuyo9kywcjdl30aqqo99e0nt201kauoqn1gpchcy2la2cy1yv9wfo0twnaejvzrno9ahm3f3s6xxg8posstc3sop6hd2otptybzalnpt0i0dld8do3odslzt81pmnsjtzpmnsbvvox1vj5ri8ck8n8wagju6fjjonhe43ett89nlkhoi8',
                image: 'ozwc3vf9ft59qnncn0d91zmu49v8hra9pza1mzl19polu60pin39p020urj5w4l9xmqcmmkymdpzfvmmn52aeda2s8m2tmwrb0e0ltsmehpae5pr2yjaowbxrw7d4dyl04pgdg6stbc3bzd2mo31eqogzug9h4jwjttcqrxe8kdv62jbl1tomungaohzlnwwn4rqot7w3wvx9uhcacwyt6a7kxqw77uyy463kk3etwiyz4rfs2hk1e3ds7ikw9vl2lxmylw0vdlyjee4gdbe1yffwxdidc59kts4jchqe9iod1izwll2khvsjw9ka2rn9tg3ctuh68l2xt24zhzt0xa67gi9sudmfryicxrts5cfc7q9ax7hcj5ruy6y476dkj85nf4y92i44cwi8flkpihxjewon5yhuo4rjl2g5md5wdur3ofagawlr6wjmqebq2lvgpbih8gh8y12gnzxvszjwcsemweh0ky901oj3j9a0a0kwpksqx6yhfcdejkfeioujn5uwei0kfotr7gqr7ef5qbjlevflal2t060ciyy4fouqmgf8dras4w8zto5hp93qqiihu9vz70iicjtdqjiyc6rsksyhecjk856psjti7w2foghjyijci7scb4vb29gi891v5d6gnu4wypg7vsniph6r7diegx84qg02ny7nmnf475mtao07uch2joovta5aaapmlf0e6sewonn6ntwoqzudvdfkgmd9noday8dgz578ej75pqdhvzphoherselge7esrgmc27fhz2m2lquibp3239dgn56h4i6cwaioxoy9j4xuyojp6zsrbw984lcop9czn9pwlnz244y05kjlgrod58e8ydwvmm5i83hnabloofw811l5zqf7b5jmxdf462fagu5oej7se6k0vhu9plocip2jgotl2izqlfvf95n2tpeex51joavc61ot2jgg1q0to1zbf36f96xw2h8h7tp6tjyfvvl0h4pl266mgneksz4pem3r14qpxb7',
                sort: 386736,
                administrativeAreaLevel1: 'invn22gk0qgfw7gu4plzsrvmawyot3su4udmnx4ed64xpoca3v',
                administrativeAreaLevel2: '1xk4vgk7lxdlum3xur4fvph828axbj38bwivy71b4yrqo68oh0',
                administrativeAreaLevel3: 'od03r3babnh2bdcf4bqnw9ih7skq1oc7lnsvo5epk88de8hd7f',
                administrativeAreas: { "foo" : "bar" },
                latitude: 800.39,
                longitude: 554.43,
                zoom: 14,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: '9x',
                iso3166Alpha3: 'roc',
                iso3166Numeric: 'pby',
                customCode: 'jxneshx303',
                prefix: '32ooy',
                name: '5afvqswpjqvibarhbm19s620fxjnm2asakvw23mqoe3yud5lohxevc1hfsipk4oby6f8vqx98mk7fpkkosz9pa71dhjaprw83gt0hm4ayfpill9iufkc5q3mlvnrxn8rj5zzbvlb8uvxtfq3nrl2l5pm5xk9qolccau4qlw2pqjxb0xyrafuv645fddc71g7kbijdetijt25x09idq6i2t218tr3jddj5g7x7kvdul2ixkygn321m0owjyj1jhfe',
                slug: 'zccoqu9ln5ze1rl86cw0dyo09bh6l5jtdako2tvuhtbacbeo8qo3nbtziexajjhkabcamlbu0bkt5yhv1m5h8ymu80j4g7207gaw5ydwtj4nw205jc842gve9h2v7uniii1o8glaocffz0ag8jyxutkjgrlxlqroqezb936632s5pwnxvdmtmzcu473mtogbkr9jthddi05oo1h3r7iypko56umtpeiowl5jvbqljgh8utmodfuwhjdqx1u5q8dzxbhxn91ru75t5r7d3fem9ebkq1drw4tmizg14a1l32bl82o6s25s370srkq6uy9uixlc1ltbsior8e03o3x4zppuesmrtfdq267nfvoatvu2xfubho5qii0rvuss6ugo6zoq10wdefuy5h28u76ftvk9h2y7agki84fgqybiz3sizkmnj2kmhpnomga1oojv7tjb8rv6arbg4faz3ru9twpgytkuvb4bz4s1s8pi0zh8fa3bi8zljidf62zsmegqmh3y0vqrntew4lardrf0yy25w2jphb2251og3lcx18ydlmake1oy6psrlb3pj7juhjy4lxmal39vy04d5eco7e5tbmn7m2xfq9e2y6huocf13lt3sdcd1lxubxbsm2fmwpd7wvidjub5oyjv9lpr2a3ywbz7o3ct87gywve0zfjwctuccca5c2tt7wuxc1w6zpnoe56e0roevemf6drvmgatl64er59dirp25rygdsrqa06irzdoba0blwe0m6o0a8mxdnocy10dhmgq9gywovfgz6zejli57mu2o89jsaohpqg6cfzukuclj0gelq0a479ov0u86x5yo6q6pmu4k0lc5v81vk0oyd886fewex0o9pf3zzszfbw8q53rxwtnmxc25knckzkesteoappu5jdswndxing5xj71z98l8rthtrdkph6ytejqvtrnrv8fl76dulfktrllx1ou6q73zc47ce7dd8nzu9ij7628e9y0418j5s0tphrz5901gvu5',
                image: 'jj3ahm39f14c51k86oma191ppntr9lcuqku3rmrvgdp9und755ghcnrzcu37aung628h0pte9zen1wo4ddlprfjkz6j3o610s44t3lk0gblmzdmsdrebwyoqwr63w7s0w88w5394qmlalc31vp8m8dqkkpizti795t41929yxqmo982q3az1eu1zqf8lmnyyri43ocleict7t7sl3jljrzmcgtgopkj6ea8shk1x2qx3alh2wpojh0xw6xgp440bjln9xl2b5vm1heca0q1u3hovghfsfohadzsrrmecbth91n41igf409myt83k6b4rgkonk5zws4lie7inqrpd9cix9we6zcmvjmk72ehae2z39fonrqy5765fy9tcnwpfaxff5xibru9u6oywjc3262nohaxzxqm3sldrtk1881b4r5glxgp75k60vmww8eva1j0xwqdeiiix05j9ztk7axnj8k6dq762s4i9mnju6qqf06niqrm658qnb9pzlcb5e6igm81fudjp5lr11uow404cqlzdsgj1w6x3elimpdo0l2q1le5t00mtzepff91vurw7we5wduxzr29gkaxk9t29le4vb6s07yiq4q2cylwkngeb7qnkw4g7bh8h7k762i9stzz1tdm036s0my9gp70pkz9l422ub89imnvf4a9dwyst8rlo1z9d21lbfqwjp99gvud4fqfd9g4hc9g5ht602cgw9pes6a48r264ldjdlpa6sr4rhauq942l2bejdbwjxxjcz60wl63w4ngy505aoaf80xaxtt5qg779agy0d02ms96yhi29xp7saz5hziierfvs9w9txbzxw8vme5rm09hquv2jgfawxnkp5e1pkgfh4tezh1dnwtad702zhvqbifevmwal82p8fnmptswhp4fcdv4qudom4wa4qq185m379is3cc3yj8edgbmsucjkb8dpuwgn3dwffpts687uta0wziyjrn7lrtrypcml2i7k7ctm7ogfw0mj7njr',
                sort: 252500,
                administrativeAreaLevel1: '300o5ayc2tnjo12vsshifjti1c4bubzpj71txlg4bha4ms3816',
                administrativeAreaLevel2: 'mvszsjrkqiy8zokdth3pprv9mt2mec03yo85aan4aani7vo9dz',
                administrativeAreaLevel3: 'tmoss1qh9bcfvf1aiynaffvjes1jmfncsaylrpxwuqvcys8pyn',
                administrativeAreas: { "foo" : "bar" },
                latitude: 817.54,
                longitude: 801.10,
                zoom: 57,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'na',
                iso3166Alpha3: 'kys',
                iso3166Numeric: 'ruf',
                customCode: 'o40gu1jlgg',
                prefix: 'k20au',
                name: 'c32f6tybup5i4dgoignnq1y5gc66u5siqgfvseil70wyqj5xaihemfn8qhq6r2dq62m38ysce67yt8ulgrxtucr65f0z7okaqp7q3ylmkhx3q3mkj5ke9eq5c4jnbob40fjy9tw1664e4iezzwnvfakvi5be57fduahwp1cacrk6aw9fpq8cx4h375ktrk3qvm5kpvt4zuj01rqj23jf0jwx74s1whe5y99haiai7al18kyjmcr891fxjy30lpu',
                slug: 'rq7jfjpao2ibg6lev0uk674lo4md6gbbvg83fetttra623991bnombk631ddo3a0str3yyvd38c0av7618vt3m5mklnedy1cua69r3xinusufowdexzr0cdn89oa5ml6nb3ob87ykiq3z8cikmfdydetg0p3tj967uiwt07gfjpjby5cdvubrqo08of108lslulk94va1l2vzzc2wlwfjaerl0gyuo681w5tod0bubza7vu2p02hqxr2va3afb71i7hztofhk4mnnulbeqojxj64e6qxovnmtda6xh61svx0ai2t2y5vz2uxu8o8v6pnxjvgieeg9l7o5jfeaxfyldlmol6w6sk4w16w1wwmq7ebubrc0huxi633pti88mt33sill5z5vg5t69o80pesd6h72sx30r4vldqa0ykn8leaan2vd09vkuxk1acgwpp7krsexvr14ipfiyt68rju4kg6x5y2ljea8slx119s7otgs65kb9nm4aa8nulja795svxhv48q6d8lfhp5d5r1ccvapfldypbraws18i7b14z82pohar8tpovlopodbkqbrb07x79bpb72i1zye52xfrv1zjv99ntrzhowfzmnkid20h8ygyoz1aesimlzgg4m8rzuifhzcvne94oq8apj6gtf1tfjgm58n66hsowd874gib2dmgncq0dth074dbhqft1gw1oyjmg0k4znylpmcefm0pvzc3y2thb44y7gifrw68rurjnz29rv3r6k3g8gfpros7hwenbozize8z8end2ji1i81vsa5f41qqp8k1vjbac6fxotcnqfq9h8ddvq9mkk9xfyb18qnatrolkbwm83tzp4qr8b0jrjlw1p4zybrenm1mqx8yn96374jbwnjc8fzqgakwmwngxecjx95xcjgyrggd39ls86fxz97ks8mnxc1cjvl9ckvfc06c4n0vsb37y57vnr7y6lsbxpzjg28pgnyu859m4uaabj0lyg8byj6vudhx0ji26d789uu',
                image: 'gyutow11syiixz4uzxz72vyux88xrsbql6ehqaq1ruurlm4n132u7c81jgti10a5642bd9yaqlxwbmta6chy8djldb9oxs67huxl6lhaqadg4fjr94kzphvj1yd84vuwet8zhkx8sh3xxdvtaczddjic5bn0owdbwgvh2f8s1qm8sqotcuardlxbxcj6fu8ca6xplohjlvxtzput2d64n76es97l05bswzblx9ghwtfr1qp1gtylw9u5eiexhbqc3dmg6k4f1z7736r6rlbq9ash4oo4gityrbmfdy6zef0vvd30kk9n667pgfpnyjp6kmiyo4vjk982x9eql40ae4a6c8n1zg4ft18l3akofuwcz0lk5hciftweuwbxypbn1zxync5xbrx863j24v7zwoct3222br3v2tvc2cpuq4ucqjo1teb82acb4havz8ivo76e6fsg5mvl790p4vb1217gvc46wox7ewztcack6unv8wxm6s3ykgxyrvclowpr9cqk7ytnm00s4kobxzeb233xo7k0f1l54lqjm8f2u3dzglc5payrrw6498cjpwkpqzsny6nzwx4mzwiohobhe4v4sx6ilzp8h16kiq4hhmomkc77c5u29kl59htgy2jb9wp6gbp0lmqdus0rmjy9nhgi7562wmiherf03qxkzo88l28ax6c77s1xrqa0dizxnr3a7ff5idfz9sdnvrxglkplspf57ae4ze2b6t7tcsmkh75ef2ye0sf4vzvibpikssm9kpj9b2qal0r4263y5673008ojxbb4mgmlqjgfozifnkwuw4ylpijudhiknsg42l76ed4cwykhb08eb06fewltl0n2g712psml9s071a6f8v15ryu25u5k8hr1glak7l7jb2cth26qw223of3d3bwiv0g0ytlskcl9epcgvpgwm5ynkckozgtxmg0qoy545qeu34yt04ci65obetbz1ozi76kqqr04uw99bui9eelh4sc04f9u77p89v8pcn0',
                sort: 964860,
                administrativeAreaLevel1: 'p3q4bykzyzm39roa23r8w1uxmdqjpu86ov3rhlokgvrbwhg9in',
                administrativeAreaLevel2: 'auv9ntrzg5anljd52nizg6v16e47g6nul6o2hf32gfmxh72grc',
                administrativeAreaLevel3: 'sbgrov29f8yssj77j9o1p1juvoxl96uq4v6a07muwfa7ywegt1',
                administrativeAreas: { "foo" : "bar" },
                latitude: 540.36,
                longitude: 621.20,
                zoom: 81,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'e6',
                iso3166Alpha3: '7p5',
                iso3166Numeric: 'rkt',
                customCode: 'm9a6w2bqyd',
                prefix: 'vl7zm',
                name: 'z6ni7gmg34vpc658xmvij2pncw7igtql52hs6rd328x8mutm5foaibs0abvpizg2nl1q6reum7yj2dlj783crgl03eoktlqhyq8jtqgljdbd5i4aj9hbsp0gwctnveuk6w2toisuxd2p94f06zde9evrjikbd555gvn7ty2yk299bdk5e98nfsx9ucggoffv4mmqgutrykrsrefeaotr8357f0yadz7n21xikr2ghpxrx5e23410moawclc21fp',
                slug: 'udbkmh2oq644eodi6ni7zzg6mhgbdmyx4ali3o26foho19k7gm97pmh03bdevfauu5d1ak2i0x7rj1qagyiu21j02mlyshkes1wgjo8z9tctmlnoac73tkklg7ydq0e5bnggtovwnrae4ztpodvx441dv6fcu0wtaqb3dd6okc34784fuc9au1v1tu55iyg52n0dc0j930w7lx1i8pq8e5i5o592qlbs56g1zq8mlgczc4ul2zfc3rva61k2kseiishjygz6qt9s8mf3fij8qdzf95geaw6tc6olr8x21bifhxzm1osvp3gqtwezauk8ytgq9x4jx3b6fqe1o0mnfi4xbigoroiasvt4z8yji604fmhhjvmug3svj8atpa8detmyl9806g77s1aldt4ag2so5nm7zpey3v5mjuwfpkvg2jg709pbow6f6wvj5hjpt5ne2l2jd9lfyp9mgj062kgvybzbsjqd3p6b1dbrxeog6e0kssdr2gomdagxfceunbv3ywmkaqxfipke9hgp0jlvidfx4nkaayxm0iv8i16y2mka7lxp7zuburn7z72u5nqc2m396c0zrngpec909tfn8izyejt2wh7yptoe29l64060320k8nlvwclxbjbsjjixg13oph45es5jf3ro2ni75r4ry3r6074sv9qjmjj6tuvjaa71ewscy9051iwrp4uljfmrpr14ubf71km317dsq8ehnivjifsvgn4xr1h9jofflpehvy3pzxmrvhqeh1rqpzx2x482bad34k8imzhd9zjhgbmj63t8k6ic8mrka00wla2oqyfbmpcbkse31tayro1p5w6yddaixzhpcgvmja5kavbryir5mgao6wmicai6jljunl7a2cacaryvx26u9dy8b6x03r244mejrz1irec4gkis36awhnpji14i7oqd4qjtxmt1phq3vnkujnkgbov0mlxbb10uoz3xfdwr8lhew9yhatmhg0k44rzbg6iuih6oytfh8wo2wbxw',
                image: 'fgck79rof2feaoq3elww8e6t4eg658yolide8fwkh79qowab2jzkfm20wdhtmvn5ifkxj41hufdgsulz47xw3wefd0wnzjt41jyow9p9un59qbkqvo449kt2yfqlt7jkakvulhrl23pb4cdtjqsc8qo5mt0kgcz457k3k191fq23bcm06shgtj9cd8qn3fb2emdw2j0iwnjn9pnmjrlbdyq0bguwgizvqa24kjqpqo7n41jf9hr0ft9k3fpp19sgqy7sm760grstue966xf46smqnaa95z6mff7gjyw4elvmmogd5q782uztkmo393suxpclj9x7zymnnozxxj50s9ay1b23po7kwupe51pfngyhbv7fuxdx0kz3tiwzps11t2fwdw5q6iqr2v9r7mm62f48n8zw5vkzdi390lmt5wpwzzh4k4ui9gkba5ri63l1vf0un85dteoplftyquhzza79c4b0xjw1xzpu6abxuoumdamxe2ungjpon2efqaql0f3nrbmln7twiloiiu1wxfvr09xl7vwpdr8iv3a7pnfk7od31faivbr5s48v6af2xxa7w6nbufji3yk4ac0qtpnn1qw8ibmbcibfawe7pvhu3z08vsk75302h1ufzae2bzj3s3niakc835ynodg3vqzv216izhh7grbdqt6gn2vr25wc3dr2crx3m9z7ckl2du1q4vysnzkmv1gmzj41jcqdfircetqhr9gi99adcli759st1bvh68q0eu7rfnf7fi71gc7nyvk1dn2h320uc9bpfydic08i8t456xlqapy1ikydutyn6ndp6y23kvagpc0b29y6d7g2ectj9p1bjrsnizfa1nn5x6io8lotmkdskcte8de0a67ea9m7rrc4jqhz9xlmijn0nsw9oysolo7o7noxt2vlekkwxc2kaqjfjoon4kuqj1ct9qt0n5i6r81lvnchrk7zrpz4zbfrpwn47e8gg7m3c47pozeq6f1olnwrli5b86i7t4mpif5te',
                sort: 871941,
                administrativeAreaLevel1: '6z548k40ezmafhdop02azjtq111jwd4rdmkkm08ue8lln677pw',
                administrativeAreaLevel2: 'xr408dey7o1lrtrnmgkp5odmj5qhe3qfgg7r9bewkz7yl44m99',
                administrativeAreaLevel3: 'gd7gq87p19ou0d7uhk3baptl8dpleo9i9xwmjweo4r6jerg8pa',
                administrativeAreas: { "foo" : "bar" },
                latitude: 640.53,
                longitude: 626.79,
                zoom: 26,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'cu',
                iso3166Alpha3: '7a9',
                iso3166Numeric: '2i3',
                customCode: '2zt6ihl0qn',
                prefix: 'm2ntm',
                name: 'j1sbqrel7ehe6xjc9cbqtfwp00d5xc03skqz7gwu7yu5kd2n0tikkuyrl1q35a6v5z82thuqsuwll58mso90l05hfddnwq4kbivsmaazuw9vlwoyt5p5dd16oqx3tivqwupgroq8ohjdwfksxxqibqe9gkiaapey2rdbyo2ndt3zknaogs2g4h8yocg67akw5e32knf4w71tzlxve9qb7cf7vpqu6aswsnr8z77xdb8xrhfkok7s5rybe20jzh9',
                slug: 'hvhzi9glttyno60xmpj42jl7etd1dx6piy5hqfazhmsogwunbk8e0zxp2h74ylwigkagh3rfpsg92cdagzpdwoywqhzy3hb480cn3dr6i2sl268a8tpkuojl1zobb587adwew72lrcnvcuhugqdu7c31i998le559oxhcgzvcqyr0gk0sqvlc8axxi7t9tp2rmw5wwv17t94j89hl9lylyzro3bi0mg4swso5mfjynhj01ul06sv3odqpyv1a4au21ojmcxrv8ijh462bc2pxeujh77leb78pkl4v776xsp9u0sh96lzptbtz9v9vpbdazzq3hy6xwqee0ziuli8ezdm0perpwpzctci2tdhftix5md96iohrjilrxwjyao4i89rfux7bsj6rattmrw00tlbzobtdgbwp4i2pzdt262t0uwyldrxemk32ozda2ge79mcp7hz8focltlmkjuagjrv7g0o8a6bwrf60rr37pxe2hybtxi9kfqlw1dplbsri83xu495evp61o0xyzcgh9hbyb6c743v64lw7co78zf5tjnrbemtrhopjikeuhyv60xz8zad3oglpyfvaptjayqkxzupg0qv65rtqc5s8od2vvcnceolg7i7d5rm6o3agbdf1x9shj99i6b5mzd0qs74ojgt3apyuh398o8fkvjb5uneuwbqk9sq2mo2tcbzlo3u43gaoe0thw1k1ye7gutnu7ze0ww3yt6jtslmpqrumo5lkce3bn7n5epxkp9qkqg6cv7tejrrldgxyob7qu4wbk518qlw4kkb7aab4bsbkueeijkv8vtl5yk7cbdn3fqvjra4fdqymnrgabnf2bzqgyk4ugjbwneb45fsjpijngx72459fr8ymy1dwhbn7gvsxfioe94ttoxljmd5p771uric68xplqovl5qfad17tvlb9q7ge2c7n1qh6u6cd3l9pl7heupo3x5whinpv6gg43l6iijppjs4uz4j9gr7rtqeao4mx6euar8jhoww',
                image: '44xx5y5upnvgnjk52v8zflv6k9p9pnbv5rqm29p9ki2pojbezxw1osyf7i12xkj3cpzmaxwjcrjalss5u042fuxb8ijvhsjo1d28lvu0lnn8d1t1ck9j22idrdwz28esnyktgcs77vn56t84nfm1a9aoyb1ggn741i83uu7x2jzm2934b2mf46prrp0dlt70pt94vll0rv8g7cxdgyyvbbvpwchkzbduaawk1ucu161zr6vu6szxramok866254ejcgyvcbqwvtqjbtjw2fpsfwt2abe19vmgo7hmvhrpyc4pvfkpec4qlvik1nukk1zjiidu4bo5y1jmmsbpgtkrl0w2iid2pf5k4zb3pkkhzevrcjurxz6h4mpog5qcuyt3v60nc8ctxhspembxdmdv34qluxzzcm2ts5f7k3evjfoapcm2fpbchgmioiwc9p2f7zqkzx9p7o3xaxxdaw5xfgp0xs795oz9hei8j0h1si6oxzaxjzjvuc9exy7tzh15v07eh704dsbwoxkqfpb5mmmvvtujk14iryrneer4u9nhd60nnvglqlbrcl9u6q7eh47udoy0jwt0nh3l0l2f0xrmip1bwdl63und6xdc3lr2uo4jbfn3kngap3ggs1iw6aga606k2it9dnfl8039l0rz2mu31ivwab1oisf0rrldrrt5avwjjbwqkmiwnob7rzaxqprrnl30a73aa9ihpzayfhs0hzlex7kbanfazg3uz5l5i5f4dot7ma6tfgrg1ypfl3p7ypjp2wswaqr0sug22nhjwchujg2i456gf7ozuo7i4krj6t9sh9hyqj629uw1natnyaptgfv3ip9kphj20xihk0hx40i25cdjefpa8r21q9h2zma8ypard4a3hjov55af4nickvqf0qv2a47ev4hxc8aukdkdvbet2uu7njeesj4ixjca0hglv4ukd7cp6207oih8eun85j9y2uch50dlj5dx8vtxi1m8fgvhu0di822z01k3mrwq9vo',
                sort: 9387544,
                administrativeAreaLevel1: '1pvc4odctm4h11vgza0llof5a6vvvoeoxlsumelcajxtocdvs0',
                administrativeAreaLevel2: '4gbyd3ng9o8zpdhu9hikmnsfpl9u4vyqzydcsw949gggwy6f28',
                administrativeAreaLevel3: 'ivzy2rnfvnbw1zokzrl2hb4lov8l34aexhp0vs812rwdix0jio',
                administrativeAreas: { "foo" : "bar" },
                latitude: 691.58,
                longitude: 692.71,
                zoom: 58,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'bb',
                iso3166Alpha3: 'ih1',
                iso3166Numeric: 'l5f',
                customCode: '4bebto5su8',
                prefix: 'lmgh6',
                name: '8qc2ba392n5pv31olxg4alme9rkfbgpoq17ksqbo4i3qsg2byrotx6z3cz13ffzg4udftegwvj4izap0bjlb15g2dvqg9fnqp079mo9qevoxsrhugyykan6fggojnoz4gaeujl4m29dlja59agdjmph10ewtzquxr31r84iqdb6r51up1cmgd6woo7yq1smu1gr9p9y4l3flq6sm1pdyoyr8nprie6zk0m1mwn6b4799kmpzjhhfdphqtd7kuzn',
                slug: '4zpzpl2zz5f33iz1or4ntd94e362rp1v29ueqjqazo1x28fp94u13snxv44dy3pm3e79ilzchctfng7gaqix4x7a5w0kh9xfz5wxlr22fdjuqzs4c0vucif0mpkm8ujeabvovkk3rzw1vzdi9xot678632idympdc4wcw0m1c5jen97a754bovrkzjaecfgf2mwzx2nlqmzormfutnsz87jk0dst2yemez52ezh2nb9d2g0mptiq9agcm4ni4cfto11e76pjlqd897o4t7izai1elm63sr46nz4r1h38mjmzef4vsk96qttfqg5fdq0h8h0gnm0ixvkwhivojyr5otjtpzs8t6ifabr23ic8fu1x59iz462klodbfg50k9f4js2wqnygesme8kvwv436strvn693j4h4x1wsyyfezdudkdw720oxofjiw2m56ma26xfqurebqob4xre355m7wm1q0r14oub4aozbovvv1yrpgoc35zvrr1a5nzh5hgcvzwl1vo0kagzyabxv8epr7zibhcrsass1nbuuo194lwznl44s66s6h3jyes97zurug50h3br9b16zsw9d6cxeh1dtml6uhb7i1w3q3oce475oyulg0pjsgml3bkme6h9x9izffjqs9qcyvm9ralc03rmkduolh9unfxwr0tbbmtjbyvef4084olyvz7xm9purg1jj5fxwg7eopm5ul0h0myll3z5ow9s21lxhjd1uqe2u3hwsz3iiby614cajgyceoywu4rpb3l3mstu0vqrxqc4ksnz4r5ia1jh1bzc08uqghe8whf0qqpy6w7kldjig795g6b0ns25q2pr7qiix0zx40effd8yyzbhcnj4zxis44o005ir669qplhk2exqx4bed7pwyseov29gq40zf2io5dkei27i541sbrn9x0mx30bd4bkpvb3g3eogi5ubghd3omxhjiylktx14kf23gr9oufxsm4ey5o401npqhy5m1bwyvmdbz27onw3ub0vw',
                image: 'lkdiedpwd16qve0cqrma6e6j0uw30av0a8saogmi2de3wxe2utf9b0f7fi33uh8vuom1mam8sefcye4xq9si9a4y5ianaif0d2nij8tmm0245qlg1wbbgipirkpyj07iv5ybsev32seu4ps6xwd57g1pl2t17tf0e06wqabs0cm3p1w2b83k4nytxkcpalvep2q691zc2ier5oj24d9aeq1gwn2zlnmrmz4suryqia6uvm4pyx6bcisoamhhhs10obqman4uegiudt865docxqeba3p8nggzvhgtr0l09exvr1qi4ozwyt7gbyvcrtgqb2sycr0nienikrujwa0p3altw6dai7rmcqcgy22ngkc9jdg3d7u5ttu9j39m9rh4r0rbe40hhvcdb7pfqqwq2rw3egfuxo2hwnpa2gsuvt8gp5bq7j3b8x6888x9dwlbell39oa7kpzft6rl3ifjoflzu96u7nx7tq1pm2fjpkjnariog6gkcxmqconfc6k854lw29oahx62tt95zpsvr0n910pgr1kgr0f894p8lden8g5z5euf0f0rdfc0kzfkq8mq5b7bupnkopnqvruoqlrcnhsf9wzsn8uz1lnqyashcp50vqmz8e8m1qtq8g1s4zk94vymdv1pjt5ma0rnssf7gakrrxf92lkwzqs83mle4jfyu91zi3zww6ndtbrg5ql5tnk8s2a8wapqmu0m7mdbmvciv7e9q0auut9x0a3u2guymub1k0evw5hhxjm82sm36e6nzhhhgnv1dgbbd7ui84w0opr6d8t9b1p3pn5ja6cqkuiy0ua1kyi4z5u3wfmtl68ffxid1dgyv82zwfla6lmednfv9uhgrqu0g26fw7gcipjs0ak7cv4vmgem0vaz3s0ux22mbn8y7pj7d2kmhwirp4u5bm33e6dpvp02w3458wmc4d7otx3toe6gynei1vrld3lx7vh91yjpenso1755y4a64mi2g958ds7da4lvcwo2eaog0xmmzecn',
                sort: 176317,
                administrativeAreaLevel1: 'qs6fajia3slu0q76vh8xlll2aqv7rr2eyi55ozn8fmz0ua4bvkx',
                administrativeAreaLevel2: 'sgs83sx68fzos7w8cgm38sotahc6nqad6x849qpg001r8thjod',
                administrativeAreaLevel3: 'iaz93r7yx1uuycbbe6e4zbfrhqjh08kdabubb410gzugukq1ag',
                administrativeAreas: { "foo" : "bar" },
                latitude: 424.84,
                longitude: 483.52,
                zoom: 73,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'we',
                iso3166Alpha3: '8gx',
                iso3166Numeric: '32k',
                customCode: 'gahhr3pmg6',
                prefix: '71qd5',
                name: 'm0bsryo4afz336slq8b459llipl1lp6nugy5du9clxw6g4lgyb2d37hcrpwqk46gg9222vglzozp5myu1ab8jfbij1iitryq465ldb2nregc1p8jmnnl9ucxwbnfu7xs6l8bd3xoh0m6nlnhi10qz9xkkrmr4k4naybwf7euud7n8l7ds9rbt7egkmwjkvl95nyaktu0yb0hl6z9l9bj0fk7pxbtt5obs3y6v2rql2heng1u2xpe1v6h6318p0y',
                slug: '42cx1a5qc1cbpl351bhq1id5q3906xuz0edf1i3m13p8wrg9mwtvquu3kcc03tw7d595y8nx03wfuohv51dxesgqpnt4yxvw8xijopa3jkvsdmafgkr58kb2o115twnyeom5fct82hd53a6ocuwxjrqhpkcn7dly2kja3w7i1fzvv6lhowchj3cnw16rb2jny4qwvqradiewnx7h4egkw6fga4fzry3xgmkfav925lttn7kviq8egj6ggspqmqw6g9aq8yh9oxvj0s6dvswhghv2ou93vab6dgrs21fqwy5hf9l5e2rpf8teqp5xedar5ljargxcz9smmofruf0k2r7400ig2s4iehl2yif2uywvbmn0gba0kk95urgioseqqmbcbebpr1no78rae1op6jt2xd5ik2k42z8s33lnovf2wede2pcjfwtp2gwfaiwqxub5fwng4ab1bssd9hr900y9anc6abcmirhur5apf9y1rybrhmiyw2nf1qbpm9c0pe68a91mgs6tc9hrv90gkfxzldzap152h6cwv292i02hxnw2oc2sya9d07eenfpxy3voscs1o0srfbilozslwu355s4l6krqr1ms99d2giddkxn3hnng80de70ooh7mwezhv8wpqndseqio6bd1h9s3v0k5q6c1p4vn1nrnav2f6z3ow2h6ypixo8wgab4tcyd1pek9dg9qddjnksyifey69ezcxws8oudw6l7qt6xq3cyjqlfrwj0062ip16vlzskclv483eq6hogah8av40gnedrybq8toe5hxwb9hmvo3fj541qlbwyi3qch7xfce870dp33e8u4z9lfvtfv3z3yavy935p733ky0poyajemuzdffi0umyy80rnt120w2c88t9x68ia5ui9k2khzuhfsibngdd6582zubijyk4fzn36keje9ibx6wrge61mz2wap6ckug45dwbd7vu88gmpdj7sb0kjjnydriq2ah4q1q562m6w5gk5v0arr1i9f4',
                image: '9226htgbxfuvp6z2tq2oayqito2ruxd86kmq83c0pidxklie0kdwqv3vtaftsdnyqzmzhtzh8k2xv5e8t35ecrcwu3nyqukuewpq569mev1iycqp9ixrjt2uauqbnyvzcfrc1rnv2jsuivhit7qtwrb301tsgs5k39yl3nw25k48lkr3n5cfp1xj63ron9m9nzxfoyvvj1f3ov4t9aill7dizj5bdeqjnqnu490s1evc1aumc64zeabqtw7uasd9laaix7sseiqm8w7oz70w6vsvzxescy4k2eycz1fiokwwxb1d0qm4yl6t58buq812ueubqivb0mijg3xzwrxmqko92g1mtlelpxogq6wp659osqg7pl9wlt8v8ekcd16k1i373tprifvhibub56bkfmh5th816sq1oo53c69flglzw9ewnzkr0qkvam3awbjs9sy5e8b4o2a9la2s4a431zc92i1r2xhzq8xs96myrne86n67n2gpcl6mzfvjzqeoshn8qybn97587xyu7vfaxr05xk4y25nuvloauu0iepxmh6e0imtsyvzq78nn5dx7peroiisv2szcbulc3oytxfiiz7cmxpe5ciulns8wdthp2gctzgsv2yt0rdulhemji79sxclbo2p5wk0lc5tndmuiedwai2i4f5leda78w4kutxmv68nvlcagohohah4si5du38ji1cjyu20u5blnh33t1wdg7il85r2iarz1qzp6tx96vy6fcjeps5e1kizxolpe76xpehtfghp1ek63pzognqq7y5ydhceoijjfigq7zubmyi3g1rqb7y2svd82vpf5aar37rv2m1zulovebu9ve6w3jbpqvt169kbb6ovppb2zzdutypfeb40aa6jznp9j3ctnkrnci157ndiyw5x8tmjeqz2shzvwis0i8legnj6wvkqerax5f2vp2s1fcsk66bx1wwv8w5j09lo3jbpp9gpb9q4plrnd20eact543up2nhk2pb5s69j0sbve',
                sort: 694919,
                administrativeAreaLevel1: 'nmsvo5qmmj76c33za7f7turzcvcu5h39mogvb7fw5m4xn5kz9m',
                administrativeAreaLevel2: 'v44kfdp2919rei7bx14wbskax73tmyzvahqfo0gvsuv133bpzx6',
                administrativeAreaLevel3: 'y9fjfkne1p4z7wwqwtopvgq7cq2vhjv3xljdz1fkjtpz1nkv4f',
                administrativeAreas: { "foo" : "bar" },
                latitude: 28.71,
                longitude: 646.99,
                zoom: 50,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'su',
                iso3166Alpha3: '5yk',
                iso3166Numeric: '1se',
                customCode: '08aec895c5',
                prefix: 'r36g0',
                name: 'b9n1wq2iduww4r5w2d88tzwewofocji4q9fm7sld7ca26sna36uerf6gaty9xiac6aa5ltxv1z5oosyyxkrfwehkamx5vsyvqw7ayrt2lskv6f8qm2g0e4qs1y0kxbbeejlhjsqlz43laxvtokimuwunba3bxflr6y8m1mod094u093wtw1wm8oagc12khxjv40084vqlq2o6ovbcibhdesdmp4aq3ymksm2fub03n4fso31my10xty6dymxlxn',
                slug: 'fp8894rjs9p2c43oj1t7ip7ntu5ozzvdyeof7s0d53ymji01qoqceyxq8y339g86xfzs3hs08u4iryqwrxcgb1kto8tmnzh3avgywy6m5pk8gkgjkj6lrawgz4g9f7hfkvf79jz57j4s9ug6vx9hhpughaxsghurdb6ai0m1zxkonv2121hqqst8wuzcmje5g2um9uc6hbyqpf77eyjiqcdgup3cw9e6zt7l6trhgilfyr1oz2x465jvceumoonwlkpbl1xl0br6neahpna6ixyc400lb5gcrw3efanbog0op7e09x16325e8v2vpf5qfr63dzqamb9f2u0qix7n1kjqubvkplpi7xsrln9c6oa9rmuxrpkv32dodenhjwl10fxzarcx5bjxanibdijv3mafns0oz6y7dooun90fgsbgxvv03umy6aspvzk0shqrdqvqrgli04xbem9rxe3xbr1k0yptpmpo6morvmr2mr9wjq74d5m3db231rw561c04e64kbo6lva5haonuatokuuv1rc28qbvcfcbleaf4hjcb6e5429i3sxfs8e0q951k1hk37z3drt1xvhsua6fmlr6m6enxargljo9ro6tmz0n1g7q73o011e8az9aa7nvswej00eiuk3sd4hnzlxsbsdixtgkenjbap22mj2jrj14ow15cb6gx2ip8s3gumdmpp6qn9ui8qj4no3qfz0zu7sszplnnullrckktmf3wkhls23f7toaf0i2lcb9iqmzlvzn8yhq7mwibfz2wc54gi6btdt9hpm3j5kwctj9wrsik8wbgnh6wqu76yvkzny963l7wnewll072qhfayau0ki9873z9h55qihp9798z88jrruuirlwuc2mouw2cizwevhitk69n9zstmu1drm5qo0pi93ka779qnt9webk2rn3f09gt487quligva2wfjck9z57kxrcjvtanr7g7md44auh2ia9zx0zis7cod8z2xx58s6074e3p8dbg3fjo2v',
                image: 'pn9acmu5ymh4etcpbfe4oke4960l0h9dhe192474ddou1k6ugflzegxaeylfocep1h11ewkdg119ou2496nq1lx2gshoe3tgxwq5rq0pa9846whxnibjka8zlgzjwuoy24g7p958c4uhgyu2jpuo8c4wux1wmkhfqt76fjs1warqqlk00oy6i5zfypexioys57tiravbqp1z8m1o82mfwx9y30l4x03ssuk0y78uwym5y29btfe62mjh942icm33tqoldqwxjg34bmyfakr4tk2mvb6x4rf6okl5kqn62woafo5pdjrxozeuhsr1fitcy7imqxh3ld6yxmd1td38yhswc66bq5nm0obitx3l0ctcomubwl1loqgaajkff55rvno0rz50t7o76lspwxaj7qfrqp2s1pg3fh4d07ytx89l1loyaqvy6bhgochwoeuwp86yd0nuem07tmstdgsfdwekfik7vv8kg1o37plni2uagpopsi9ib4r4a6bjyp4dt8kvnesr3gysolfc0k008cuewsvc7wdls4u6o17wf4ig3vc2m45crb26o2tv7r6gebh4tq9zoaoqwy9nhif9mic9d6626iuy38ewrrrtcrvpx3iryn5xpr2toqv6ne5ksqhqtfh3ij9az622s2a40mbw3iztpxwrxr0s4eiolfdzsrwlnn9cniddkfsa9rtgt844szyhiviuk201oxgbnkjkqkbwfw5hy0kwmmm5j0adybzn7b0hp6yuqglb1p07kt5lt9irxsi1se8s7o1ivka0t1ufzyqgkg71ax7a1htmn30f224pudur6n43m22lm0hjxzg56bg4iqxqrgdnmsopdq8hivytcwr94jbvdofo6k6xpxoj976mugodkk7x5bzqbt1puo22slghx963gy411u0plwmheqyxfu3s3s4kmuo74y37zo0iggrfr8ipqtglqu52c9ro99cf1zkr6uuc94x4bfarhfjtsf0tkeziy57lqb9k46rbaswa3145',
                sort: 268820,
                administrativeAreaLevel1: 'avm3k5t15mklhobp2a5pcfn65g3n8ok7uzki3wgpz8k7k8mcf9',
                administrativeAreaLevel2: 'snexsi88jvv4h2q5ta0ydrz57v4iw8cbe9k8vv1y6tfyhih1ik',
                administrativeAreaLevel3: '9qy6kui6ghwlax1ko3zucyl238s5z3br0uohhlm4jmois14fc6e',
                administrativeAreas: { "foo" : "bar" },
                latitude: 146.71,
                longitude: 631.60,
                zoom: 85,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'vx',
                iso3166Alpha3: 'yqk',
                iso3166Numeric: '273',
                customCode: 'pk0ytj2gh2',
                prefix: 'uszs0',
                name: 'z6bezoapz7f9jd39t4xtokcfmzxh6hlmz57pni7optx1h7fywf0lee9nkzcpcz1ghbpy3ciqseyny8qa1f994r289rn9l1qh921545a1n320y59b9mwbwh99g983pu7qtp4emiw3ldjwmnf4sbhldn3amhhu60rcwhi6cf5hrxjvpxoa72ouu3aal2k6yn1vee8c6x27rvxkmaep2a51yn2fjdp7okezpulx4xn40zs4xge9u987cjn0t8ee8uv',
                slug: 'ppdeianbv9yox7c0wb3hxby6imhs55h0m8xg3uglhgt1syc1nxgcjtu93o17trd9t9cif93zy7hcfuzx93tkkccdb5y3lp98o0pgubegcq01l554gxwpmfcoe70ez7o4sxhwhbkwvvkk3wrpcl4agko6qqdb4i0fgz78vcqvplrzsp4k393iqazi2ko48eq2so7adq6qcf5nf69hhqqqdw1ytrfx8gb89vjoaxqnigjgtqan6yeuu5535bqe8h1iu88i4d5hewvjclj274r574501id3jpqfw3ymse1nds2evqcu0hgtk52xcrx0n2mae9y7nd743zntmdlqvmlzu26th1wbwcjyq7b2ockpc3k3gih0mzkt3gm87ohwhjjckd21t2g8g4nv8off1cacf7jjzqzkihk1zgev0npmwvt26tppzflv4a15qpse4m9z4gbeiglzg6aqd3l5oa5awgh9832nubfb9bku015uzaf4zqtlr4hb17s171sc942y5hgbcayndefyx6yottj48lifzcaqdknquse0tkay2j5aqp3y71iwt8wy3p99hvbktkbg0x4sa7r4vm4iszb86jh0l8jfhlzgl02wge74zomq04rvw9ddllkmtghttp8usua5lg7nc1ayvjmr1o9kmjgmvcmtp52v08k18zqh7lbn1l5f1qt5r1xvdcc995gtzle69iagbn3o8phyuswuhb0jxyzgbzu7tlg22fh7fswpu8yj037worrb7qfuj5ot4oj5d0w0loeov98kzrlqiy69l37lekgs3u58ojhi492l9wko1hu5lcf6ondlryu1z7403a1li86p3wuplj0fkmlqvl4v3x3k7jacr3cm7nh8542z7m6ul4wrjunskcfjo3xzcgt2a8jez9a6qjck6jsr44xrxs1xiubd15epbrrtjgfesjer8p9rgv4thpdj759q8bpf85nkaamv422xr4bqvagowkofvmniqzrofav23eqaw432to64d70nr7c7',
                image: 'cnpmzqpz8juq8tv79sn1zfjbgxrukgutv2ipm2h2vxc7oy2n9e4ep2rp7n4jqriyh7ng87yrunkoo8zy0ztynfw1vrfp31tpv92flk909td9umflco0lu0kuejnkqsnigq5gacxvljsdogkct8nb2x4gac4ki9bvq0ngivyylaovr6x1kx7ztgsu0xvkdposb4xmrjdclx99b7ohj65zf4z43gywd5m77prqz0i7mk8shmqaty63mp9nt88oonrw5sweyf65ls5yxhl6p5zjj3y94hvkedqhimzee5ohe3frqaw001ezz5nbvjxlj78c11cxbr94b85mijog809q9brp3sucge53x6ps0m2s2qx4080h38h96vpkcpi2spb5j4h3t14yvzkjncj4sibl2mb56uecxlg7mnvcm4n9e3uthkyond86ep4h5hgzj55lp476i1mf92g3vf5hi8qhsfki16hmm0oj1nfc69cxxk3m72o6wxrd6fy1j38p0t5n10mgw8f4rf3n1chsb5wql3udxga44crg3ghmr9p7t31k21dynfj5usfpo4g8f63hr4jc2dlcauh0wq87bykugik9vqgs4fidsc6p8ba8elmmx6q4ui7lmb8iow1928cuvqhzs5gextjdjcm1xh5uc7r0i835t8js47g64akkz4ye5mbihcidm7tirb2wrmvn5fjw94rne0it8mfvwpqo5yx65s9cjza220j47xxzsy6nwg3iymi7ck2npmfi4r5fu2lchk0ldxxy4vfc5lyw0bwprsfhw4j9z3sg15owdkjcbtana4cf0y7koaktcoep4470pr5tsxi4fozoyexu61jufdt36mv5i27f6gct65icxvqdboocikpvql5gnlbkjtic6yuq8bvhgyk8akhipdaauuykhi259vf9mqkanbiz80vb31czq2r2jd5zjbc6qutfw7woa2wow3gkc0csvzlwdsjsqsqj8u60obfpgf6zsabi0ppzvnqbqqy1g0zj',
                sort: 805944,
                administrativeAreaLevel1: 'vmmzkjko325y13qaghdpw3hcqw56rpwgg3uw1g7y79g3zazc6y',
                administrativeAreaLevel2: '8s802glwlancu45osq3r11xn1ax2osj3i0i5dvf1qyy7mwf8m7',
                administrativeAreaLevel3: 'mcpws5h2tlduzgmuh8aae8k7pwg05fw8w0egm0dxey4kb5587y',
                administrativeAreas: { "foo" : "bar" },
                latitude: 509.01,
                longitude: 289.49,
                zoom: 22,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'mr',
                iso3166Alpha3: '9rk',
                iso3166Numeric: 'lmc',
                customCode: 'o019fw7sux',
                prefix: 'trh4s',
                name: 'm93ygeha4i11m04fl5cogct327bywlwpcco2tb2ayev0jp6h0al81q8xgo6t04hwz73yujec3opokqd83tf1q4v7meshobzk3jjggux5zp1jeq49tale4ftkj2i9izu9q7vjmadba8givqnocch1dztz6d447lpzcfvwswrx7ly2asiimo2ptebmnmvva6r3zb9qaql6lm6er2yenggvukoae40kaf60h49vjxtlmw8f2jag310rttqlk6wy7lk',
                slug: '90i54l05honnj1gfxhcg7b2o16jd4rrenshben91ff9lkwn82tss5a8bgdrhmyhbpsr0qqgrak2p1q3uqlkidp9eb9tnwg3dc2o9ettn1ifkv5mmxjf5u341k17jo1mhotusghnckveqiwb0yezhxewof83qdx8pj2wmbemk94teh5o8q5aj8l4jkumjo2vu037pc5hk7yynq8jiryzubnn51wwsdegoup17svboouodun42r9naz08h43ffcxqi8doyo6ej10njhnmcrvyon766byu4mmg0u70qbxtuh2e7now1pmekw7t3il13kvk98s5jqzzixql37axmphtp23ze4di6r858xqxb3xzpfvkkl0ddw1cqfllabrbbtiyjoa4hw05mchv5vi6n9k09anwxxages1xlrto3vid3h2939ba976iolbtw9k9r4ai9yifk2hpx0ygrkny0w89m8et5biqkt5r7m2olyxqa9oeve6u3gt60xr2q12x8pmwaym0r1lgzz8o13hdd8243z96zh4m1b1wcmul7jvgbbjsgxjp5i42q2tjouwt69nxh2fm28jtfte3t5tg7yz1j26rrvrcv23fjzmf69rmd2znst0p4izxyo9bfqcbypo2r7lypyxx6tcweby6kpo2qo2qgk8lxo0sy9viw9pi9wk3hmu7oniiw047bupdjnxfyxyt7o50efjbfdd7dejdjupi9616znp9r5ati70ovmnbe42c1ysvv5tezi2tqmtm89smzev4dcu4jdsminrv56w1l7fzm8jvcgsqhmgqrn5m7yjjclu9eocvnc3e0xxitc5gzsa7whlmnknwwagjfje1pd5fti3mttrj6mel6jkh54g12sxy0gi1e0ttgkncjopz606s9x5j7jhx0grhiligv82umagfypwavgwcxj3ojuz5y2nhzjkr88k722myp1dbfkq8wtksgjhprworcvyiobkb46fmh9y8g4nco1nc1vom7sbbljn3xd0uvz851',
                image: '8b1x984t0sd5i8rhapfhaxp4blbdah7v13migb7cevz4fgg5xasiulj5096urr7sfnj0zcr5sfunu73bk8lazqqd0iabjq9rpsku0a0u9rds37woehhyi4scslxhakpezb98uy95p8sir1w25t20hc0smqcm5j9dtwqj9dlyg0wohrbu9zsejqy6pxolubek9mvwpq7nlnouv0kg9rkd8e20d913psqt0gjljl3ppov3chzlftrwhqxu7tqjfwklez4wx99y5y9j64vz2q6m39aqg6hkjc0c896vbrkurgj161x9qfi9dho2or7kkze83076atn8mt4k61vk0ouo12g6wrdvwiwreyz613k3db1lphwceb1p3tvc5ytgloa6m2bp1qpd61ip5rgetpc5f6uko7l7o1vstjv0bky20p9zrgltjeqf38x2iwmxg1v0mvsdclym01t5zvx0vomdxqf8cab4wf846a606b98y7c1gt73fgkkhyaxhd03ym0r64w5a67gqhm80w0p63edtbnubbafk0f35txv0xxuveccwu18io2ibm81kham3e7cry6g6nxztmp5klk4jn18z9xo7yolkgg55z1x19kogsiieg6xxhjkswrtrqzoknoj6sniu59z7jh6qq5646ngz6e1uvby6266a57qbcgovyux9e0tyapc78xz3p6zmzvqs0a7mwp5l1ro0sckz3kdikx9cxrky7mq52dh015oz16hqyfga89nymlccwwftbuxx2at2vn9kxoirhek76t1l5im4wd7is6r3kzv8zzeq9cze0k6y3f1gvdwnoqz4q01mapha9klg97bz3gz8mbm3kwufuy4zd10ki8kye1ewsd08j7mrs19jmg5ykeu6zplb4q0zl4n69mbmnkm0ko3ugjzwk3t8zlt9vcvov1nlsq0qq649zse6kf59f4k0lymrzmtgu29ojbz9duxvst66j7tnjz003tm0m0cqpydvcc66iw4o5uqrquf9ssra24n',
                sort: 333460,
                administrativeAreaLevel1: '5ka0emhfjl6aq6zo4fuvvski8agcob7plqqnrskqgvsmllz43w',
                administrativeAreaLevel2: '26cro760eoebupg7exq4r75b8d0xpnbwnyqbblfnab7tdziyiy',
                administrativeAreaLevel3: '57plotsic3f0rw310h56747w7feyyts2qr3n01lw91gpppdmru',
                administrativeAreas: { "foo" : "bar" },
                latitude: 5.94,
                longitude: 462.01,
                zoom: 75,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'jq',
                iso3166Alpha3: 'jwl',
                iso3166Numeric: '7k1',
                customCode: 'bz8biyzc3h',
                prefix: 'ko7iv',
                name: '7bp4grrzi3ptyl5zat2iy0gcetoblhp2ykne2683gmjmyr0476hx8ur2r9nlsziy4lglq365269mbd5dnqsn9vs8gqm4ndzaca214mayl6tc032fm23f8caezogkfi9uzehr4ccftqav7rr6qxu8uho3qd74q4lyuzzr7ltn3s1xsi9nhg8aagenpm0lhe3majsz5z1h42iigz44zedtl410hgtk2pp8xa6ajefvmyjsz34f66z1uah0pebtcj4',
                slug: 'nk8zxh54nhw8qf5omk8e60ufqefl0hm5l2hwquh43d02l881hiyes8r609b5eejdz7xooc3yn85ka8rkrqyfa5fmd55btodt67d1hnd6dawxay56va5dwuc96h5hm426kic5xyunhhniidav76906p7fdiq26zylabut3zr17zwofsy2uvlk1d73444hkl4lpu9tsbqzvt7xsb1cpdly89nywrhbntuvj91yv6yoiqo8hr6ga1r5rv1z46uhbm0j8nzuq1zes6rnxsui3gv578q5amsowb5k0z6bv4b677d6m62zjq3373k3h6vx4qmv9w6etyl7qpkoyjnmq18ut4o3si7c8haxzm8f6dgptxstbzas27u35p0wq46zi0knp6hg5varja5fy9c5f69qz51t3wkfob52wb7w5vmc3xzfq56wxy2qvmofww9oyjpj4v896bm33iwqnrri2gvhjakx0hyxk6djqc44v70tqazs2dfz7inntwigh1crtnve2iu2lkmjs6hma8rukkua919f93hxmfdhf9putsmr7plt06nz43e97qtnzzx8kfhaulx1f2pjgs4fs4ogkpjkndr3zx4xpqcv7q58d9tbm9ckj0qa4xjkr0ltaa3qarppfo2oeuw82d5af549r43ry2rmviwn5tgiady25yeq1p3j5h6tf681udrzo5uu7b9463hz607f85a0nziv2174vm02hen8cw8ararzvrcpxajsw0f5vc1dkelavsq00ik4gem6ot9h0hc2rn4m09ps8x5jlskubmidqpdi0wou6g6g3wmejgi4255zwh4vmj2dom4ekttqscwe4r75suppwtzybpmlstxxq7hx63kgmwqr25artkl78rij708z4bpvn93id8ox2obaiat9t3rngdcm3w79maohw4uu81ea2fk9y2m8fb364lqc0v1f08szitjovzgu4gc54zlpjxpswlrdg4kqzw6vlqnqrzcsbxnr92l27qb3zcul786wn514',
                image: 'v6zd4qynvst48mor8umvzcx8s56hucibl8me6hjlz5ctzqgxpbjyjx6z60dohuk0o6mcyxl9jy9fuvxxzosh04rvtdf90uhiwq2qgo3gq2ajfwbkf9digexqf2w0212rbngxj6yavfx8xos69k5zg0rj1jfvc43eioihh3a1twwxwke0a3wz59s1ady16ll48w1ccmlak96ptsr28avsszvsf233y76b2cmjits01evuzjwjtd3olacsavuq0hhddgkgnvr4fk8ya6i9pqytrne3wjf67m3zs6cx59nq8s5omezvzzeimz2h3cv3fm2m2yf64v74s5hm142cwe92gwtqn6epo59nt5im1tuxkxa90q0h1mp64h9s4tpf3vld8v3q1eoq4pmtu3qx6814vksnehqrzenkp4fqni3gg94xpj4nyhgb2715u4zmjy43tco03wjmh3qciiy9zoy4k9ktlmxl8yc0ffi5i27x9766z0o97uig8uxwx82ddprbg7bpm42kufn9i7i0r7wlev3ukbvbzvfe87apeh7swnejactqurix8j14ibbny6cyy0x2xuvtel5n1uslps6zufcoc3u3fsd2ylhkijfxwowekl7qynv7utzbvnt6qk5lvcc6droe6a74jx8ky5pt1ymtmfhprweg7djchnmf7fna5fyhanugd6zouwm8xzlldzgacbe7i7suzls3tofnttm1srxj9s9wubfc7jz9k2wmwq354i4wltich310d4luxhmwk9c7g0xx2dmjhf1aim1aq0s715g26ckgp6xio5sta9utmou79cbd9uc6ushc1cu4hntxf3gixk2l3x1gfaeplpq78gksny98m6wwv3k7ktv6fxk3fb01wvhpvsud8kvppckddast84txoqfaho4cfjpmr66hi8w11yp9plgu5u56mzd29xlnrugm210h6f4smhjqclgl6l081nsaf53to3301ft9llghh3hhvg6tnbwu2faa6zu6h7rto7e5',
                sort: 788824,
                administrativeAreaLevel1: 'edjrkye0lee8fznvgarte4tmniaf6qtx0psrfwvysyn2v9asnd',
                administrativeAreaLevel2: 'h0iau2g353a784eel63r6o7jvhhv8o37hfqonbdjrtpzs7g66p',
                administrativeAreaLevel3: 'tlpmeaap1guor1oiywe08fdt0w2wcx4t7aj01dhuftvgv7s2cx',
                administrativeAreas: { "foo" : "bar" },
                latitude: 941.96,
                longitude: 953.39,
                zoom: 364,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: '6r',
                iso3166Alpha3: 'fh8',
                iso3166Numeric: 'ml5',
                customCode: 'zhe5wc6tst',
                prefix: 'dedms',
                name: '9fv2baz7fc88i1tpcrazer6nph8ci1gjh0o02u0obsdourp5jgce9wmix6ekkiel13jwexk9q4ni4wvopxmlv3y7zw044s0d0pq2lelzh20pczy1pqaapiaqid4jijmrv192t5ijsm8vtsohviqmm7t2qc9smpf1rk1y2s3x0gwmcs1dvt786ixrafhqnhg5527jg0ymdk2b7hlgg4hqmpq2e710zo3crip0kbau4s0lqg9nh9hoj0web8q1ml9',
                slug: '0zr6adzdm1vmspaqffzqcjzocp5x49srlv8589be752ntrbcd6l7f2hn55cx4littez0dgzzmbaxpwzl6he0d7tq7cbq9w9lc17grt38qaibo9iyyrnyg7ojid0l8f1bo7h13nxu16qalnzgy41gmvu9ztm1dszpm2tytbvue0v4202fj3ab7pnbkrfvah8tsrcvrs5zmn7ss1o4sepx5q8jyz6jyk8xjym963c4sjoxu5ui1qlwiwzjorji0uomts0j96j0suvkm5h3zgcpjj20q3nod6grihcnm80sujs10tceiosf591yvuws26nse2158u77yms2aguv1hgwhmqk4jyu7igvvsxqdrwvrbk06hhhcxmaajooqooj8cwq51ghf387gzcs86dwpjh5iqjp40o6gy0183970ma090b55ai6f5m7m2kxgyrbe26rsxjnjke7nd4bzxtb7h9blu0rfceuxst28oy1pp572vinwk2tm32wqgu55cltm2knvl3zn11g4uq0wnlq9omvhco2jf1vxx7zspfvgmkpgifr8rm7240eo4wru5n3fo01auzo7q4f8oto6ocsqp4jpu0bfjpcg5twt391g1rl2e09mhlcdw4cgtc4i8a908q82312wbuxb3abwivikwakx5x8akrq9t0u40einibxy7c5y32og5jhxijrs9pnchalslk8zddikles7se7gh3ftgojx5thewm0uq2ka1c9j9wzyy8c7b38u2m4j5ujq9xiqldu86c80eq29ohz6kzogz4nzh84t1fc9ctrybzhj5vcazvlh83p72cmvb2ev2ms9536nktx9ntl61jb3s3e265kltry0o7qamzlzeaxcpoufz21r7nbp0s74bxepvu36hodm4iyfx5khjqm8ai0hu6ghayowexxatly92ywyj55jdb7k81lufd6iv9ih0xifp03z46jmmdl6ccdw7gujyhuq95qcvxl798teg34kb0xfhu6dx7maw8n78dune1o',
                image: '5dxxsiv9e7gz5ivvnmjnmkkg4iftbcnjxj3x456gqye3vlsdmb8hybjf8256age28n7jjrety6otln1kaoysnmnvelg6qt7z3kb056owdxfm1rdk0noc6fmnvfl6i1l895nw10vg6ildfm2jbhn1f7y6257lvc7fjx348zcq7j5fbo281fq210n1f223qa3f7faslazyyajh669cx3gz6psr7zs2pap8tt8kr21qc2t1minzan1ejiayslvecblzdd3fz96yrei4vn6wewrzkqaj8emf10n8jw7do18e3nc8kpz7397vltb9j93ghm4trhoctxs2hklyye5o49hcdrdgxdcv4tbdxz7mr9vxv7wwjuykz95uzzmpisqyhxvxqrpmwwunzpkibcluripinenlmgkia5b0qxcq6p7ev8qo13otsqein607te8j6bee2cbgnaicq5pbjx70gd0m74loyjtjgtgs4khgof31lpevo23r2wwb43odec8nzg91p8an9qaa3o3y0s2lvibkdv5zuo6h9dq6as7ayzo5nl0qqpebxm24kxw35wb30zmy06gc8m9mwuz9qcwwl07739neg2oej3wuw22qg2hfw6e6hx02sazg6szfj2c3r9sh3it26fpf5pbjgdup94shqxay2hy9okg59pr09epkm6tib6pqjjpga0vv99g83l5upin64jngxauowusy320c3j1yzz2uqrlx4uu54vlirk2lk2zsy7r7e9kwkm274setp063e0q48rwx4ie7v40dbjqzx5kvzyk1ffp73ppp4jiat79jvrav4eoij03zbzcm40kjw33ly2anmpinb1qefcetuoo6dge76nlip3i0kkxe4lwukbqmn9kjwx4i0f6ttxnx92w2336w0ysqvv49xhf8aiemvlkaumrhh21kon3u4i1jaju48k5ve88749eaofqaa6w8shf1p3c81mbsoq0y0lxgtqmwe5zj4boac9j7a91jkpdx2q9hzig1d0z5',
                sort: 376084,
                administrativeAreaLevel1: '2y4reeiwoszg8lnzt6kixdu9bdbvgxvkjphjcvzr0398r902jh',
                administrativeAreaLevel2: '6yc8wlpdcp90244l9z52e19bdy7n7e0aio2cpzkey3pnwwywjz',
                administrativeAreaLevel3: '52mu00891n3951gcjh5hols8zk74veiv9ays6syyp82vd6xkjl',
                administrativeAreas: { "foo" : "bar" },
                latitude: 266.00,
                longitude: 984.31,
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
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'q3',
                iso3166Alpha3: 'dsp',
                iso3166Numeric: 'p2f',
                customCode: 'ubegq2rk9t',
                prefix: 'js2h1',
                name: 'z028e4xpsf715u5udz7liihnp8j4sw6sg2c3sgr6ioemue9abgcvsokohpqe39i3e6c8ztckg8g2xmaofuwxubjk0k0pgiilsxai8ocegow14c9m9tookvn07wco6tbetp5zpwldwhbxp145na2jbrt288661qo5bdpw9q6wup08el5wbvhfj4surj8ff0siea3lwle4u900hjldp2h16zorsoroaz1v29mxsmad7fkyhknf2abtjqek0e8i2qb',
                slug: 'nl617g77wihdxj9wud8qxd38b47q1lunmxbeofz2fsn4fbhfn7vzoem1n6jreem62l3cxrmxqj1ipxijxh6e8j53zuvinooadsq7vhw2fyas6vzerw0bqlux0lng5rk1j537swlio5vyh34ph9x5ydgviwti054yrpuo6tgi5mx9k78zdg4djmtzmmr6bwhrs26os3qdgezur6yg5xa24um9fw6w41lovn834735thi4m1dn61m4zbccnqllo9fob4dfxegr2zg9isql8ul586oree8madzjv9kk0rimbwykfyw7hudp3r6vpi9b0zs4wlggx8d26exrd0ld7399vjiiknyumw7qc6encgxx70rm67o4w5u5onlzxq5jnhytl3uhbov6dmujhhb0jm8i17hongiaibch9m3qiibus0sz378bwpbyla3fgu7z1fzjxq75ergwet3log7toirjsbl33fsb7yxyr36e9rjvz22n0ep0k0kthvwwq0arwqoie32lzei5o24qtswcola2izoxrc8ifl38y4e6yifinolc3a3aw0ws57fg7ury1dfvbb5oitzpiebm2w4z18ljp7zt9o5ko8vzolncpzbuaa95c5skgy1yarv6d5jpwmyw2a7hgtmmptix1l9aw5tv4wxog1usq5akvfnqk7anwbzp7ufk761qqt892t41stexhcley5rvvymp8tribbm1kwywujd8m52jg1rvtc9fcrnzfaefen6aw6cvu9p4ynmhku9zywq9vtuz8dx9r0rdr4ynj8z42j650xczwl2brth389uw8roaurvi3wl5r34k50avzjswz0o9osehk65qt8am6pucmdwvicz076rifd0dm3lkgoukjcpoju9ny913sir0yv0m2e2vjhwi7vcq458xls44jqr98dtfd1ju948wn72cezigy17kia159868mw7det9y0ldn8tas8wcmjsa8ekcwl3umjna26bhmv5u2epuyyfyvriv1b183yjgt',
                image: '3xtrllt0tfnymte4rx5q58n9ua2r1j5kyb8vv58ppw3vfl3i0wt4p2pvuo5ijsh024nca4nhfnnbv5hr5gx7tqrrsuw0om8dbokzrkbj49d1xrx077h5e2e47fvomtm2ux82eoya7z5gibtue3qkjsrd77td79edahfok29f20m1dhakkl25wuwoqh8gk2oxghomny6s1j5k9vqa39aeyool47vjmmfkl3670fdgu7dvtleo3ptgq0jc4kxnrxqljdd98smbzwxscasi15lwhe0vb0pjae7bo6dwqe09tfdx2gqgngvpgaav44vbppp8qk1woobhn6dbn06cfyqntj79t3et278slzhzfgfcy29wtkk7oeadc5jubkqima3ka8e087zzqoak6lzz9x3vt6g6fttcrzryzx5ubhjqax1enjsii9vhb3eriiycszx7dqeq5umyw95xnlxb1rni0poracutia18d2c53upln3v4kdoie1enr9nu9u8ta5c4fvm67nus0n4golmgzbf957h13awgcezh5inlupe8gri9uye3ktpn97ahuc3x5mt2a2asdpqgiknda5vmj8tfyhfjv2zc8an85p4ca701fbnpwlbzc8ndkxatku44gd6wckl3ugtj2gp4bkgt7inv1eniez2lbrdbm7dpl9fmi9vyr2tp6stlul68490ky9928k6adnwzvg8uw09vslglohbn6g8umod4d175v5cj6yqrfz1lw2i4bqhe2hh6r1r8cuxhw6zxvj1vy2tz7gqnt9onuvfoir1mlpn849mxlrxse5o63d6m9gk89got02xxiavnbgfm0coqh91s2blr2laqamgmxv1ik1noihmczbjvioochtsgmdbtn1i7mmod87eo0p9gv1f0f05nnj330subnbnzzdgssvvg1v3yzanl0rmoygwm85lvqdhtprzyduk9yq8xnbh616b4zpinfdp24xfg88qbgc8u10av3gkt6zp45m8v4jt8iaycc7ve',
                sort: 455245,
                administrativeAreaLevel1: 'lkkyxw5i8fk0yhkoowcxzu4bk8uos4iebuenz132txcql4lnco',
                administrativeAreaLevel2: 'g1t4cy7m9r8bq3rz2ong16fek8dcrirv63bmxrm403qfpj5xw7',
                administrativeAreaLevel3: 'w2mrok7agabg6i2yq2a8na08io70zgtdh43hfqimtt3brkrb7o',
                administrativeAreas: { "foo" : "bar" },
                latitude: 880.61,
                longitude: 519.90,
                zoom: 33,
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
                        id: '65011962-1a76-40a2-b47c-b95b55e6db90'
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
                        id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1a04e5f3-108f-4f75-99d4-706ac16e1dff'));
    });

    test(`/REST:GET admin/country/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country/41336c2b-f505-45f5-b70c-f036ce47cb69')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/country/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country/1a04e5f3-108f-4f75-99d4-706ac16e1dff')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1a04e5f3-108f-4f75-99d4-706ac16e1dff'));
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
                
                id: '767150d6-5b8d-45f0-a35d-a0e40e71cd39',
                commonId: 'b973e6a9-6d81-4262-b38b-4b8e11f4508a',
                langId: '25a8cda7-3adc-4a5f-8201-c9c11da30822',
                iso3166Alpha2: 'ap',
                iso3166Alpha3: 'pvq',
                iso3166Numeric: 'wd6',
                customCode: '4jpw26t9rr',
                prefix: 'ddu9m',
                name: 't0320tmxwfdtn42evs1ehm94id6t4um47oclmk8u2oidcos0wj5n3veg6ommuxhcf10lsrnp4181zfi4oqtqedmha5rxvdamlyqouh5c473f7k1d0bz95152gt8ragi2rdd7l2pgz2c38uxqqq9mxv4hw1gpp53dx1jt99ifiptty8noc48qrjs6c4oowksx25k26920h86gslbqm2c4dh4hx5jo3ctd00u1s9z5sqkvmykd0eao6ymr32n1pvq',
                slug: 'wkrdi1nyg9p08j585zkdfs9hlwah33r794llfwcds8t6bzy3cpx89c1o47gmohotc8cs0yny52hy7olu0q4dump0wha3c5dbwa82djyii6i17ive056iiqyizwdav6nymfaf12dswpn8wke5beiyqwhbrjll9h27pmvleqc0vrckwzwj1g1v44y1xhb1rmnxswv2mfm9kfkiaszcm8i3zivwfiagj2i72mgu03rgujqfsxwmte4fommv3e4uw9d1pgazhr6ue6dytro60t2g6uo1fr0koimyn45po2riql4ms6wf98g08tfjps0zad8s72oze433ee26b4crh9qqe5iy4oxmfamuuu045gqltsewneat9vguzc09moepvwizg1jcj25evrgq0gb2pzwue5k4dznd8qg635jhrigxle2il03n1kn5nfojuti0qz9ci0ec71ejadjp30u02axst0tt9hu6xrqd2f8b2pfsxnvkb9kjfhsb6y2v799qqy92avdgu77bug3fsma5otensvqkxayy3n3el98t93bwtfntm60hpm8tnjzxtitlujhbl366u47d6fav8o59nsny1hjlwh8l088v68osmcwmcffxxuqaqsaixktoooe9i3crovo1bsrbu0ti8wpvruifzupsylnlcu3phs1050arnbeiptwxg6elebmg80vt195gfn0e22azeubmw64e8f48xg8nvip9t3wub2lidp7mhfj95rzybzdih4thei8bdu2u6sz9azvey9ri4n2acv1r15ybpivfa7uhcc4p2mrkd1ecfad9ry5xc1r5vk6ng15cv0un4637ti304cadkvd6yo3oslpk8cvmurtm2ns7pg1pppxmvhzzk3gre5wcg351qdnexxz6f90kj3knip0b6kc7ofjcj0yekl9slbbq1f74oefs5ix4u30dmnejz47tibpbzow7qgu97xclxglo31dme1vbybvbh0vm1b6ugpp10tupdanm50k1p0q1kw7e',
                image: 'buyi5cjflcu4kkj43u91feoyci63xxh955fkzrblr8gi1a1enh4gcq80d4sz2ffpmgm1ousds4k0mibtegdyxd52psrnmroyqmsuvdzvkj85tr9f1as6lamznulzm1h8xex3e2nujp7h2nys9v5q56lgthookx23dj8o7emvlsypj3xefafi0y2xjr2tv56vcueavkpjjlc4jy3ryfqehr2ljpth3nbe6cdwqkdammr66ly6vyr0cfrg66884oij9qu75cslyxtemb0ef4jmxsshu8xd1nm5x5v13u3tf1nv1gwkvro2znnkn79yckza1t66jk9l8ac5lc3wjjbjskbsjofol3rhy2nr26ncgc3e1cb5qk60wwiu6ez3fqecqhhowhw1uba4noi7jyg6xinp63w78s0le85w5fnza9t65ek91ky465kzrkca1eux81kisa0az7lp763pyah8saeo34a3wlmqca456du9dzub4x59hhrmu9tliv1zgso9lmdb3arwsblclyb6iho1nq7fi8qgdd8zrlja1aatark3oxje59oiibg18tukbaeu5611sx22j5cwlttehxptdiyrf1e9qv9ed6kk5klo6dgdtjxznl6tp0ktxdj06p0vuemff8b6sx4apemfw2iayhgmd4akapuhb847y0kbof4k3znywmru4rjr56at5xu2tx7awojoafcokx1ey9qp7j7ymtlp6q01s1dp1i5tchtrgsu3edjvqy5zhg37god6y6i62xqcctfv1icvtm4nifp0n880647ofmwwcztnfx8950nh44d548deu4ebgt0gbwnjz02zhokdli3sa3grid1xhnq2ion0de3fav6eynxow7ep0t6d8i1rtjxlulvs9b64ci069o9hfhofkhhnhcnov2qdrqdjzhbojiewzvkz3hncv75k7zhm2ypu47ue6lhasgbd8dtczdzsv508ogq6fnsynnonjqulrdkoy8zcegoek9en4wn30fui87dc',
                sort: 660154,
                administrativeAreaLevel1: '8z396i2guiqtuoa2fsbrgm0ushlnawenq3tzh63fmrg17a39l2',
                administrativeAreaLevel2: '0xw53u23yfioogadfctbuq75fumi6067u8qfgyceb89xtxj1lt',
                administrativeAreaLevel3: 'yd0x5gg70uax8oonzc6sl2g8132tq1hzatue3zx4vu5etdnaqo',
                administrativeAreas: { "foo" : "bar" },
                latitude: 790.63,
                longitude: 989.93,
                zoom: 37,
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
                
                id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                iso3166Alpha2: 'wf',
                iso3166Alpha3: 'eav',
                iso3166Numeric: 'spv',
                customCode: '6ucjmm2lm3',
                prefix: '3ut76',
                name: '7etdr2r5hq1xt9xsm46shfhika6vrewjl8i9d4n18m1tmam4r2c4izrk4xufx5c98jvs5n5io21wucpfwy3i0asvctxfa0gy0gbtltb4htq6by4j51rdb10bnqyq9veu0i9yyzv1y1ou9bpvsy2yaj0knu8yi5qjk6ryy8p1qxz4p755p0af07xn1op3bh2kcr0a1i3dmh856gfyv1258uqc3q2mlvlmjvdl1gi4wysdtm9d34o12megy7t1xge',
                slug: 'g7eueqvqgqn6eme0p25oi2h4741b0a2tqflhi53knm7f2dumy4kgpryp2on7urjwbv3g50ijxwh7tko06lf8lzw7apr459pgvbkfgx2g05dfho56hal0rtb3qh667lkgdiitu6w48l0jw8fpz42444xam2mnf38mkrwvkk143tlye7mxdf7gqsihmajkradjw2hl6whg0omuqlhyz547h5gc3anooxenjdr601sb613xx8y3c996wn1rcsd5bnx2i3hqwrhotmk2gf0nxy4wjtf85ta3fea9d5k9ba9dmimswkvrrpvaqgfeby8z37wpf21w0l98s7rpbpe60lyvnpdj91n6xudv9u6koqkrtdc7obvgqwmfdcy2cmpzjlawtbgkrxduaufa3j6j8xum9cqny7rbdgw6qji016pzmjc82l7i399uu7466386b9ijtpzh4h9vjrjqxtjdtvek5yegla93pj38ppt07jsq5c2egfsq0hefce3o7ja1tl26of159nl0abtxj0rpslwowo7p827rk5zasm5g4zqgrtpeke4848gu6n6vy6nw73vmynju0otmiu2zao9sjy2vkpnaeqtz0hc30bwiycnlrejccshvrfsv915xwle0bqbf9i4ysuf7k3svldp09ojwhshhphsbnmla9o66lm9lurrheom3jh13bt2plg9zqxptfy5g3k98fg0jvit5wazgpp6giolnzqpoqhzft2bq5aiw2a6gs226gvdgttu4zc0ckbhk934ugucadv0k7w3hrc38uhs99yqlwq2xz4rvwzxv1marbt32x62oci7vf38umtcm8tzdwp7s0ezf554n3qa3q9hyyb4g25drce8jyg3raf6nypnbbl0dc4qmt7q0d2m7m872mc3oa99ir7ndb7qam28ax9xx6ohkdgrs8j42rn5akrkyl3m05ezwwkb9lapuk8gng1cg0bl16ob6f9z5u3w902lq9lpkb2fa8pc3ammktv41p3z1o47piwxb',
                image: '9mcf9xbyolp8clb0a1l8e3jy48hbl5tab6fd0yirwaegjuienmsmb3yd76y3qkuoct38tdoxm0jloy1ayb4od73ye3h3m8rw5bweaty15lwsqi05itbg7e4nru73qlxsh5qzlz2w4yof5uiupnqmjr1ibogddwrgetrzlwzl5uylb8qey9ivcju1h167mqi93bmv3cizq2vgkzoje21hmljmu3lssmnuu1p8vo2axxeva9qd518n7yhpq9e2onxlklq1ibruedso2dfe7lne21sige40luvwic4kw1l72l0nxww148a41fggcz30bjfru6uvymefg8zq9d2oprmf0ytik20f68h6y3pjg47z1np9q4a5n6a1vr5rosn9ulektf4wkow794daqsgnetw3qzp14k5fqyhydjed26r2uz5ji138vwrquzf4gg1yyduyjjf0kb305c5h4e65y6kffnh4oqvpwgckly6koumoifx5z74t8indxyolsl13b5184pfxtzoy845uja5ny3ep4449z5pv7fv68pj8c909ixf5vzdfcp812n1i0y2so9azpsu2w9hq6tog3r2nq50z7nvww5lzpt0mf03gprla6e3rmnvm86oyi4tuvcy2i4zmafn62jjt2wifasf1f0u3258jgvc2ok32sobg0xbc8mo62epx1ovn6ft4oblwmpx0kpca0xc5mgq2k424qppks9ogu3bu8m0cgc4lvxwe33fpmoyqmtp1gwpkfsqmi38m4804c6l7cz0uxbyxtahvbqqgxbg67zu6kyrgo02bolrndk44u68syt37pn5ipanyswcekod01zvjwx32rcwx3hnyd2obcwqede4byyvm61xe4l6vk19mbz74x2eed891urwwmrjf8i8e75o4zhqofxvqkyaw9aqb0edceoybmvr7ffm17hpav8iq4sn8x08jlv5q76tqlav9e9r7umjr8xej7m2pxtde2mxqov7zxg2eubgx8prligzzs475f7dw',
                sort: 300466,
                administrativeAreaLevel1: 'lgs8vyam6dh849dvcyfl5vv13vfcak614d5ewat0ke50hjamzq',
                administrativeAreaLevel2: '6gj2hzo1b8tn9otv7g822xgr9e8k4y2qy06qxv8krxr4pj6bmd',
                administrativeAreaLevel3: 'abdekkufjy7t667igck0rrq21zdyglsmaxs9fjqq3s9c0pci3k',
                administrativeAreas: { "foo" : "bar" },
                latitude: 317.78,
                longitude: 717.68,
                zoom: 46,
                dataLang: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1a04e5f3-108f-4f75-99d4-706ac16e1dff'));
    });

    test(`/REST:DELETE admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/88c25b1c-9fdd-42d6-869a-903c4abf7e95')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/1a04e5f3-108f-4f75-99d4-706ac16e1dff')
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
                        id: 'd7fe9470-9f55-48da-95f5-31b6130a1aa7',
                        commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                        langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                        iso3166Alpha2: 's1',
                        iso3166Alpha3: 'gbx',
                        iso3166Numeric: 'rdi',
                        customCode: 'ma6vb7c9hk',
                        prefix: 'uke8m',
                        name: '46vmua9v1c1dl9d1mrb50yctggb0vrjksfbf671s3ykrd6199o29og4vji56v6qtopknhl3cdrbm33ld29oapn3l1wwapc1k3u24gtwijtxzrbhbyruvtor9tzqu3gk60ht92o1dkinne62deg8shyj4zkxxrjh3iw0zo552ydvh4g74vv1h1vgwklcnyhgqyefc437rdy9w5hsayg429ii57t9z6owe2vn3vwssqgniexeep68ymelrmvm9tq7',
                        slug: 'bawpngid49otscm6kywek3ffcrvjs0u0bk5hfbsltmn8rwlvybusqc6q222bt4rp5o6vcczdx7hcc6gtgtpulgn5h9eciew69akom8mt4726mhnqnb0omwcakhd197jcr3phtqxbnb97ywaviu38viaugkxx2zo47zoq2x6ud7jligm21gzbqpo1hnjfq8iz7b261n143c9690lw3ctdeuvb3ur87fk2ft1itha5kx7mo91i9yraphfasbpb9obg47irut6cxcis2dy6btzzcrb1ylwpao5fsdk3vhm1636qfhsx0sxuzx8gv6xramwq4d8bk8y1l7b43i2m4mjci2j1efo09d0lyzlfnopomsp6vypd2m0gc0kmu3jnjmdr51ephzq1toea043c1dilrbiaacqt1j6e2ij5dbvplj7hj9tuwi6681f9mf9023pyetbm3bdalykh0e8kyqo6am7ttg4bib1lep4bbcuas3pj8pxqgl2gyp8qqizsagmno84nkbaw2p80jnxseaqoiapibbkyhhfd8h89d9gk86vvs1h8l52o641mnjax824o1on8vawzfd5tfqx1e6py1rqg595zo6ir05ea07krthbxjfgqbpxr9g5491zqkat409f8s1l4mdvzga1yfyucvqz3ec0b591memnmho5fkca4ehmgqot1yac11vs7efey8vb2l7sji6vlo5lx1vjr0lokp1elosizimsmprvngssicmy35wog8tozm6zsfnopsimg4rk4diwadhwlwxy8xozeste4224n9dibbusnfh0yiwx0sob9ruby6fk68sd6coqvt9byverbemjpunipra0lf8edtyyzy7sdvoy2lc6lrai8ttl2jbsgxvidwqluirtf01pjzxu60q9e67v16qkj91z7oilj54ce5ei3esnu3gzirduit99b4s70mwgechqo5lcwrc2rh19zro84r657mt5xner1dht3iw5emh4qcix6urfikrhvkydsvxlv',
                        image: 'j5pu1p1iuzfelbutcjetn6uqm0wvw5sqv8chctoipdenzgq0lwfv5ulo975ja9szeimiitwb9ew8fdofj2j7wq63jsccgvmh0e47d6xnuv0d3e7u0cilukl5xsus1ceyi2aillzdkjbhf41se6863mjy65g9oyyoz7y8jqppa6gfk9oxdermscqkfa51ohsyraafajr4qti4j5pshnr353zdiny0h6cz5uela0tp4gwl5rujqz4zobnn502hd5ygsydyagzxvxpycf35ej2qszdqtmlzzprzxtr98h2jqskrpoh824ld4guucsvd35bemlcixewawetj8l5lsm59ei7brelfwrojy6296boyd6a7uzqjjmw125kva15nfo2t2vpqbbga9xtkx6f3cyefpwkm0z1z7td1mle055gqpb6tx6e2s3gffccu4dtd4703dz9d4wi2r5pvueif78y6j09u9kykvrk5zzzwxs1m6r4han1tnnaxm67kncqj9crbeboec6hzeb8j6nd2kapy6b5hipgmrk7ze3o2pkl3ovonsrpqid1s4b6bqv1usp9d118tk4b0a1v234e1wcfxrsaf409gpia7cn5crjj58v0atjqb57ezos94amzayk3jz8lyaedgezihgc0sudzhv65xhzjjpt52912eq99ff6dl3b814k9u788a0ob8hqtxgm5vchs3gtivtx5lnmuf4tdzoz7sa1419mgq7bdjiuiceeu4hwunmlck1mb8zdkk84uv8f6xn5v23clnqqgdmh91cfk6dfyyuwbjikpqvfx8w4in9i6n1g0h8wpnr49trg4pjdaepqysdajvgunce5cybs6lm6o9409pmm75xc3dorwbc1lee2dil6pxllesy82gg7ivqxyzkz9ol46tp7w5bq925hqmxo9zp4v6lk716ps0psu5k7yj4eq6hyjbu77efhdsfuatc6sjf2ba7dq7xb3ymjdifnpb7kk737wq2ii7hhhh2baz23u61t46',
                        sort: 244899,
                        administrativeAreaLevel1: 'vmbebj646lvn2dbxr3xhvm59gvuk2122pg5xfvbcmh691qgypn',
                        administrativeAreaLevel2: '17k41wvjub13yrvtnd4fqy3a9158uff7ss6faqmzbtizisr3rq',
                        administrativeAreaLevel3: '1r3trmt8hlcf7hltwnccivmulj4gn47jn4jidbtdx3v9bhyqgf',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 219.67,
                        longitude: 304.08,
                        zoom: 38,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateCountry).toHaveProperty('id', 'd7fe9470-9f55-48da-95f5-31b6130a1aa7');
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
                            id: '9fc21d19-3e60-490a-bca8-e0e0d5cd685a'
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
                            id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountry.id).toStrictEqual('1a04e5f3-108f-4f75-99d4-706ac16e1dff');
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
                    id: '6d6c27d4-05cf-43b9-9782-0e4b5920d8a1'
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
                    id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountryById.id).toStrictEqual('1a04e5f3-108f-4f75-99d4-706ac16e1dff');
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
                        
                        id: '8b198bcc-8b15-42f6-877b-374fdb05adcd',
                        commonId: '4eb6976d-ab22-4a38-b5db-47f7b246db96',
                        langId: '3e466352-9d82-4996-aa9e-23e62f5b9558',
                        iso3166Alpha2: '0o',
                        iso3166Alpha3: 'f9x',
                        iso3166Numeric: 'f80',
                        customCode: 'lgsrgb9a9h',
                        prefix: '9mm6m',
                        name: 'dstgxt420uwew44blrwn8us5xgmnzlxz9e15l2os5k6555ywo08ia96oosngidh42nfqfpk3pqjkwsel69a3diakozgzymhdqr0er8w4c2zu8f13eevw0kpx1hx8ec6pkbh10marezf76n1n80fdlrtgdou8jfd8qt5xc0o6dnk18p1t631ok3f0190ucx77iwos6nm52q35xdqzsvi1m2c40kcpmuiqoknyvcv6t3e9yqc9gug3t13tlkbc2e2',
                        slug: 'g3nbh92denkjt57n33c2o5tego5cfa0mv7wpt8p8wwbxqd49vou1tl8g9ly2jskjvp3tm7q7oetyfwirfd8eol1lg06j9w1gvmhh0tyqobnl3bxvkmqucfljw8q2cu1m78573kmvt19kponu8gltt007407e9r4gldp3hv6rnm5pnov8z7xmj7p41js11r8weh4adnetcry4al9pizcknb17l57kmrua1mpd9id3svnevvklg1nrevct5s84xjrwp4udcv5qi3mpki06a6pkdkrljx1ca4cwrg9yptz7y3rjn0c7moi9qjbaqtcgs6c5mejrlc9jlloqbux3lwrjps1mzq78pq22anuitfwr9olfl8jfodlsb2p9k5ba5twxbfemrcdm5mev0zh8jvauqjq9bc5zkvtukucgcmym78y682e8hxe1x6th6r4j0fdvea3yb4r0p2y4655vgkizkrbado5u4spf7knyc0duugcsiyswkjq3ujr8ukwe3frqopk6v6u587xgjt55jx9x3gqm47o13ginh4djhmt42efsv7sl52n6cloqebi69wi9sz72lil8yvb3d69pevzt48rmt8cu344hj666qaajqq2aqytdn9x75ws1v86jw1siw0j213n48yks32url080vnxqhzeo3nrjxgdv0csvz7pypv9bq67ylghkmfdnwpbwxjeir6f9r7j7lls16w58slfedkmxq60r0p41s0uh65cuj088d3ky8pvnxnkrn89tuhhsgojplekbyxf1g2g3qsya8kyomjxsolpu3hm2d9wrs5978ja41jbqqielx98549z6faurzw68sfleythra4ahxdkub8ahrmtepbvj2em1zwn50me3a84k7ukorgzplpfw4v7gq82cngyhh4e8bx20z4kl65o2lxh3mhjuu0n7put5saoidin030y3dl459qnurgc3ddm4dexokgzz3ym8dhrsi217wy1jwnaniql5cdimg356me7wykgt4aju',
                        image: '3a0j7efbsxjchgzu3j4rqh1pb577il78jawn304cnd3fcrx5x7u9t93k6sc91w5abykpqh0dh0sdf5muhzhz5gluuw95ymtsxi8z1cox8i9n0qcbk0rc03f0abjuygs5qcd39c1ihzdlf8cxtmdm8sokd3c5ocj5bhrxkuoebcqn0jcnpr4fpoi6lm9cuyvpz2n1ep71rp64hctlddiwj3owbtyzjz17uv0ecjkv0wcxmo3oom3jpvzida82oy5vlv3aj80orqmaxmkj5kms06ibjeyyhc0u3wdxzgkox2466u83je91x81jctu6u0et59rno08x4twc2fecxec9s3qa12g09nyxgbbth88kre9ht29fuknhqz0s3dgyyhauq4rgbo73n9wmknplr9ewj4aed6mri6agoq0du0si37pfbhsudyqhutuz4eg7s2mm66ap0nmc6ooa9j4wjpxg89sflx11bjjo2g6admshfizq4omnsfygqdv2xzhhg8bbekh2qr6ce92qdx6qshx7lhzsbcchenh5swt7xjtms7j3twhcoutkz88c7qknw9mi167zvtr73pxtqh583fqmejv79ulhqg2955s6ljmvedmih6h7aitg6uihictvqtkbvg1vw64t60vco3kwr13y9q5ptpcv75bjc4h3exf77awmc5zc6yb7p600wuzf2zsj2o6xljz856q2ud44t837gwv2s3x6unfef3d92n9p5ssijmnwdj71rcqvk8tx2lt0l6axidbctrr48kkf6tr5ac79tjwuqt3cmfrrl8zq27lyxhop1i571izh0oqkf2drjfhs3vgjvwo3e25kebubpeixsxqe7xehculmjgmnza0mar9aittxbiiilmzel5rvkbnc7sb2n707oe313ua9ylr4jfpstwa63kym8qa0qkeyymplmobt48nwa83g5sa1u3rux04mk05ono2ytapxdayjegykldrukut09f60d6wgnb79ugrv429du2fsek30',
                        sort: 418235,
                        administrativeAreaLevel1: 'l3yiqdfhz9x3qrycm0qlk0mnpwqcekg4897a8q2e24ish4tc77',
                        administrativeAreaLevel2: '7q5p9sht5z1qukse0jw6cxs1j3yox0g556jp61qqabaouqozu3',
                        administrativeAreaLevel3: 'zfiaa81b90isyvspvs7xfxdc27ixyx5nuz1hjf3uewrmdji7du',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 835.61,
                        longitude: 564.07,
                        zoom: 47,
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
                        
                        id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff',
                        commonId: '4ef497bc-80ff-45c3-91a5-8cfbd2f00199',
                        langId: '0d9b0497-990e-4341-b1e1-71d42565df4e',
                        iso3166Alpha2: 'n2',
                        iso3166Alpha3: '80p',
                        iso3166Numeric: '43t',
                        customCode: 'x0nds0w19o',
                        prefix: 'tsk54',
                        name: 'wov9pnpv2aszaowtzstzo2yvcw6254luv1x5w0x3y5rul09t0wyxvfjz7b5aaqhbmrumlluen16yp7l18je5clxftgwav9qzitbi0s5xtm0b82zhjxc0uzm7is6epe1jp1kisvyh2zxc56n2crcjsfecppgnpfcqmhrgdlhfw2yrra3rlpfdgwhl4ppe6wnvepd0kfzh43d60nja2s6q1nnwajldajel4mwmgppmnc41lau4fwp8msq85aiurqi',
                        slug: 'cq9y5rpx0iuc4nwfneqm9ynof16ijtkmhbpe5tgmqdmz5mbfsp5xmabdyt44yympu4j0yj26eosdahytnlkby7ez5raf5iaqordiwqzgtl23u9ydtgfna4gpxdxa26gymiflkosmvkea4bkd2v5e4ab8ce96ixd7mnkd0k5nm6j502zusc99pwxpnvaxoru27t1eckwunrieeffudqsgdpnfets8yzt7kjb0u1wy2hwelee7i0c3x22601j9is7jrr5aww17orfey89hu777r9uolvziobdi0kljo7magrgmanpfq6mn0fcwtnb2edefw2kcs6yzom44ucp9tgp5utj4ro7jhlpabtaj3zou27qndq3qjatvzk3swgbtk0h5n2xczp446idgz8r2y0xfdipd187mbi0ayv2x2c0za2m4sziy3jcjyuxyrum8jit6j3qggau1c0z1bbcrp84uccyylz85voqbr4prilytwp8shtaptgirvkn35oems1vk2jcr9mfvsal0ej331c7evzlo9z8nel34izr58fqcr4sdm3wi5ug00co7ma3zhm8ruwbsd4a0t22ifnwmkhkltd68t8hz4d6o96qqmlh9frtuhxbc6hq7vzwy4t9x0460h0mjhbootmcrgvhe0axvopfnrohczv8w4zb3ga0634ij2vh23b7j24punc92843tdlu5ic7l1vnib3tgdnhp0uhtxmyq6p6vvinaa1vv4469jyfnn5b635uilcvf2jr6umdk7bodrcv07ah2vf1y8wwz5q4srd8vtj7seuts5jgk7lsinm7wdv37shcpnn0yco1g58kyq5119f2g49p3p9mepb8b8wu3w40j2be85xwprlpqbkd7ic1sdpga5p2mjueeocvaxl61y3wz8r0qi5twrq9j361u5hax4pxtli4q3wn9c0ibkfe3hlh0t1wssvp1mq9z4zwq5byxd12mflh59yh2g01bu68sbp52w1ypl768la2mlw0f7tqocb11',
                        image: '5t77nquf40zoqdbs9w6f6haldm9xdyi1z7qnjxp0qojkmg7sovsu030db5aofewycy386e0qi7qz4hv9ejheq3apn2o36ibu0fnvgw3bg6i5erluu27rj6u3e2pk9za1u84dg4a46q4ygfhkx4lijq17c0c0bvvgtb0dpebp7b991ktt12sulvgj7gwhewglj5agupkgvj86vo1ihupxufbvrswtnxumiwmbspyydxr9cf3r28xwvhissxejqsfwc7ymuiymrjcb2u7t3k4o4uf0r3mnoifnpmhifxtz8pspc47o5jtyu7hbxkqbs61wb3ykvelja4kzumol6gk0q57ybeiezfmftdbphhr5xm0tkzvqs47g246vt4cdve8lhb24q6v7tpi4oawjpyza3fopzyid1od8n3zl84lm8jmx754hl94uxz3kvzad3le3zrdewlgrjf6h2biezpu0i0pg5jcxphtfhi1c5rhb8w9u4irb1s1wciw4t2yk1g3o78soap2ubondd3wozi5eb81afnl33kowfzedox8f19cvhm8np5bzqlxxfd7n95bim20ekt4oqee6scjhvouoyzq5k2fz9nmmpvgjz613up9d0wrpt79zqnqse5zjpc13uqnwi9b637gyk2oi3xy4abhi2w72kqpnd9uv6vp7npf3cxbxa8bmkm1qj4929k1xeuv9yyps7hiea7jcswa7ea7186y4lgt3voz1sjllq9agol9lagq9minw79cnfivs1ofgw3uxfe1uwxf6t3wov3krdgeqpcpzp35i43yzgil8jwplf5fbbom07m1y64hte6s6j4pdh4h2nuvh3sb2wvaszagjrspu78eqrchj78sld409huttjk8hb476dn5sog6mlchs8bg1wgy8gumuytspz5xhmvl44x95h7f57defhhmtn56khcu31csp1qogawje9ki020w2iad2hpbprydfovmcqipontxmpwvk3x0tcjgynsakw4de7072xvyc',
                        sort: 827071,
                        administrativeAreaLevel1: 'axibo2j1cdi3444rvtq6xoksxhejmcehpy1g36h4baer3lembo',
                        administrativeAreaLevel2: 'rt2w8ge81lh7e1zws7wah002ngbd0qag149wyfxl8oj08m86la',
                        administrativeAreaLevel3: 'akru40a5x57zj8p5kxnpdb0zi7kiqjcij7yp2hfpfkmw9rocjt',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 986.75,
                        longitude: 555.30,
                        zoom: 78,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateCountry.id).toStrictEqual('1a04e5f3-108f-4f75-99d4-706ac16e1dff');
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
                    id: '50e5eba6-67cc-4bf5-bffc-08bc44c7167f'
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
                    id: '1a04e5f3-108f-4f75-99d4-706ac16e1dff'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteCountryById.id).toStrictEqual('1a04e5f3-108f-4f75-99d4-706ac16e1dff');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});