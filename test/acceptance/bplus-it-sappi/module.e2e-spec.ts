import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IModuleRepository } from '@hades/bplus-it-sappi/module/domain/module.repository';
import { MockModuleRepository } from '@hades/bplus-it-sappi/module/infrastructure/mock/mock-module.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('module', () => 
{
    let app: INestApplication;
    let repository: MockModuleRepository;
    
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
            .overrideProvider(IModuleRepository)
            .useClass(MockModuleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockModuleRepository>module.get<IModuleRepository>(IModuleRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/module - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'j2ftzhrdz0aum22ah0qp',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'ry7f4fa33vi209paen5r0j4uvshdj0q37z5r60sle1sw2k5em5clsab8b511l3gpjub82nh35bpqoeo00ztnvcfaq11vc1p8yol7kg5linnmm8035lfbiijfose9ixpduh8xj7gjos9iddiuvohiiny19ha741kk',
                channelComponent: 'mreeq8bvmkchw4ottqngwvnj8702906q8ipise69flsq5mdlddy2zvm3ez4nlbx4h0hettf0m66ym0schpl0vzovz5wqckt3rxkp708hebl8o6a61c6jl25u1sikdx7ugjnirshzu7zj2lt5g4oe37j548p0hanv',
                channelName: 'ejak82wiwhn4bkmnm0q32pzdzpvl1k9203fcu1dfy0zqp3ou4ohte1tlmmfdk95ocle59q3vf8zd28tgbo0naidv8rh34e5lnm45npqnq3qt25xw40av1h0ctmjfpxotjbromaayr0bjjpa8jzblevyze4q9vs4m',
                flowParty: 'key4oynq4y9ovvh15kgfpypmta25pqjhkbric2jn1hon3tpxs2yeca9cuufjy5vto05i3eez503whwgq20xl9b0ejsvg1eg07nt10efymjj81asovnp8q3q8inhico7tjirueo0jbmy12tuh66nh1ubizld3036n',
                flowComponent: '0n55xs2hyjwhrk791xveyv20tcbl1zj9qup2ts5pmda765eo850tb0q91cnf68eekta6ipf4t2tgbnei44g03ltcgdog2lm4wju5rysik5kztg3t3p86j5fxypkzbh7jeof3czqtiam1g01i6o085xxcoi10sv4a',
                flowInterfaceName: 'w1tjj4s2aemdg52170isct02wz6zx08p0gdic3270n1txxsmhl2eaecp0t43fqrf93jsc57hdzkj9kx8c0ex6jlxltms4kcd371uzmk7tkfgjqry7e8h3gu3bcncikb1p9jybsb68u2y9einqq17uu4rmva8tvrk',
                flowInterfaceNamespace: '354cpwqij83e09c1l14i37ewy8dzzswrshtf8ifz0w2j1eaop2sb8kl8uwpcrmpjdrk76ybe7hoowjrqb4u4gf2ayxzz34shah1lgwebcemoiac45qs7q2grxerhrf7jvtsoa5bpdeqycof0fkpwomr1xkohwnsj',
                parameterGroup: 'db9lwgak4t6l1rv5ux1s4dpzyq7ajh4xbodiwffylhz9bettbpuyhjvxx0aj2kx73groa805h21lod1h8thuoze6o9smplt60jv5dzlffv6kmbewco6dfjin706sbu7iah11rnzs28smjbhn76w1ubqwueqoqj5bhutyw3skadyoicaeaoz79cyhzsmwn9c2t9i6ilxengoe8f8g00xft358wgyn43qcasn96hqxyfj7vjzv9de8lhlt9o5huh5',
                name: 'sm95lithq5tnm7sc6sgx026mdmam9ihhokrnuodslv692grq35vak5vlxicu5objaed1716rqvv81ztglscipd6acv2x5epafckvrgs1oognilir7tsaxi77z6erlgeilrbv99f8tqe9789mbtyjw5z2l33hzx4q67v07ca4znt25b0mazjeh5b0y4fhtu7g7iclocnt71989g5amm2fcz1vijh7sgowcqgv5pdczd0jpxg8l9j8gru4mysrri7y4ailg15nop3ar55g0tmxvh0r5snucvdboj0ljn0kle00ruo2h3mrvqo2opwjj9e3',
                parameterName: '17j7xl1rsscd5mpd24kq9pgxdflr50plyh7pffjgxh7viy5wbs4w1u4eyeww1q20wppujg8cb032mynhiee8hadqy4d0h0nsxdzzy7cpp05uabnipas8irpj4towg7b818snkjdyna4egtqibo4vjsrh1hi6e50bgbk8c52zajwdu9m2xy5v0xycxtlrwt6csprnk7luv8kupj88i1rek38va28afc3iy32li612fvtg9tbruhzjz1d1j9jc4cqlmjsqs7vyn0o0he3eywg6x8etx0uxjb9q0zs1qe7trny7i0c0eb24rh5uihtmu32u',
                parameterValue: 'y5gsnhi1b9ppx9cf2mwpf6jg9lutlwq2hv9nsmvjw7ad63435vackygo3arpz1jvba9j0juhk7d8xi39rtj3rax3ely6bjjql50gbay7dbly2an6haapoert9wgafzmrgn74mss8kkmv1crfyzu3xtuplrfy1tgp7p1n7bh6cnttyaesdb5g6as36j6nvb3f8tvxuc286vhh2le8dfhmnkhqheeouiv1ko3s4ew42w7xi6j9972vi3jzp2deda8n15gmd9mq298wm22momd91cyqvdiw23s5w71k50ujaojzuceuq4awbklwvzogyvtt1iga42bd29w0t17u3wygm7fsrcli1chohr7mjmewopkco0jp1j5oz3xov6hhuuszv9vkd6u1v5jc63ylh4rv27fjj4e2lz41x2dazcaiqcboz4kpcx0wpnyiwbkqttk2ekrta2sk9sbxrra37kd05s6jrrn21b8z9ygs93ycq6t1foeyu9g3e668hm12bum8wrtduunyu77x1ji1ltq4o0xobn26lyxmg72rbexqu6376bsz7ysguh64srh9zjw4q65ihksj9tt6bcsp029zdzke3bn80p4q3v5sbv2whzdxhdhyvuz7dm6qf30ovhv4nfg53y1k0n9bu7fl58rojlhfgp43n4539hf2afkzhejnxp4sp7qjyy2tp35wwzsmoz1caevl57td02pube9axughn3dqzft6i1d7jju1epkv95xu5mn88dphb6jc4d7uukpt1nzcoornnkbhxngmkiz1ww62iq73rvy6847tfia2i3yraepdiuerdnpr5iuljpoa28kbmd1jlifho02msqrqbon82f2bldkmtm85gmqj7tvohv5kiyi8ryqm5fo4na65b31qm7dstk3lk7zvkv1s1uuo13o94gpyt2xn0z8jk0ztyob9trn5fkw3tgxc6i4ee5ct9q91pqwu1dnqak82ocbsfhwhk0u3xwp8azi122coitzcuxs3v9gh84tc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: '4ekpx5zyr27nb8jpnp88',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'idv8gusgmm8kxe6ohqd66wb1t1prx667v4qzdljt4d0btibh5uj1lzpu5ys23evi2rkj7npnztfg6m0mfqw4emakhy7q1bm6czxxodzfj7p9bq36h84ha6ps7qvguetf2qw11cbebgujc85vi3a9iqs8prq95geq',
                channelComponent: 'fi2xehwemnf8havs90qwlifuz09eeu10jqwafmxw4yyvz54ni619prr5228npeb702pm32cdibn0bu55ugk3zbnavfk39u8qm9v0ggtdenvszw0npwiylupn38d0oapd8mqakc90te9659k6lx85ie8fjimbshyk',
                channelName: 'iq1nsnrfx59px0tyackfij0ibu0ss4od2ilzbkuy9cel9l6rc4ikri5jzil700dd7prgqwfqcg6gi93822yhhspud2l6sypcq6skxrnse0hs2h7j9gkmrpdrde8e0lhgjukg3d4z8bfckqok6hmsckchhd9h6vzu',
                flowParty: 'yl9jl6koji2n413pjp2tzzcizdaxx4b81afkskfx559oj0ti9gk09ggcptq495n935q3yvav090ut4yiudikzft7i1b92xi9blacjp3lclr9pi0uqi4wd794jvnb7s15rkxfeky19jzge9n0epdi24kj9fet2z4u',
                flowComponent: 'htv9ymr9xt9xzsvyzjfsg313ifrz90unpqcacd5lrqszxoq8g6dqhxsjftmm9lml3t14r2j0k6qahqnp384wnvkormejiojqwvnjlcdjsr57hj5rzobth7iqac5ox97ij4oezntz54jhg1v4jx4lmx513vyp8pvc',
                flowInterfaceName: 'gtkkr8gaymksfbj1iwb7pffn7m4d6rci7nalfjlxsqagb3zex21i4e0jzmxfllty806our62a8qener71tk322xsepgjxlhuefjy8woczn5ga4f76d4op8y4ppzyzbrd6rkc8nehgjx1ee52rrdbsdd6vggqc9i2',
                flowInterfaceNamespace: 'de26buuowd678eh87i59ywva5he7lrnxug1pz0ry5o41rgx5qshz8rew6olddk5hetlj8hpa92avc2y413k0nuv2lsgkijhu3fxwktgoc0xm01jvg4m3nnertmu0wpws0xev8a1leefhnl8ndk05tl8wpb0dau4y',
                parameterGroup: 'jty12zc2uvtj5nvx1k4x1sqd6y6gt9x11y84zblaag7ebyih2lnbtd7o6wltoshcyi79ff66xoedgulejldh8i3wd3ntx1mruft6ydfj3kng6u8u0b0mtf1bxh6i9z7ujtj1i9n0ixy9rcnbr7ctqbsu70wqzy2ck8dg0fhc8lhrlu65kuh2ozwkwn0nfsuiiu90p6x0f8c8phrfetn66fym76kfbp6keznt9d6keopf1o4zxp8mje1kvw6g37p',
                name: 'ptoup2a1zmkgxiaeqmkkyreycfsv46qe9pz5h98xdas1cja9vfss3jlck23mnec81ml0wl7qervur75e29mn893u4hdx6mswuygxmvd9fzkkzpsmqf6ce68rbc7vb6c8lc3emrnbyi0hrkej3n17mjqns23ruwtprwr5sbs8ty0cni1hmkt2phifa3wanxbemnbnk9jrp7kclsb68g35c96q89k499u033jcpbs4nkhlajn26m3sit0o8pdyz8uuxzskf6rm9q3rtzxtxwpuyqf1r8kfy6yay96u1moa8fnosocov9vawu4pwecwnyy8',
                parameterName: 'm0h730zz7395s092tjj67qjrzjd1wpfqfn2mpes6bzd6dwxcwy3k2q9bjmms9uttii7774g8cq6nv4hy6n4ax3iqku5nszd6x1huuekidy12g3kk654xgo6qk862i4bmqya5jhm8osjkoii6zgiltf2emw44mgbjskc5ehqalslwjsv3f2f0v3114kbg9tgvh9fbqh91zleeontw8lhz4rwntldxqkcu5y164cll9glaayh06zm15smkotc3gudardeucq8ltisibwud6v6aogm9sm9f4d4rnx28vvwecics2lhnw78flbh7wjjpgnsu',
                parameterValue: 'hy0nn8mnybnkf2okk1h7880olct13io66hh60zzfqhyh7ggfa2is300rtzs3uzeh0g3zwq1wjcn1vue08r9nkxt9bpk90fwqjn0dl9fvzz11dl7frde89tqx9dwghlhfud7gx1sullqwdt0bobspjuafbtu55blmtwsnea9eu9ugl6cb6g292djz7j7xru5z3r6s3nfgos438t3xd6eue7pm2xi0tvs67kpolwwi04h5xcj7mnk8uu06hpe76pr3ii28bagp3xcq5ykmc6zminw7uqx38lt9jmnw0odntx1n6825rxpk7slhgqaqz1dsdkj0a9udjm0l29p499u03yw2jxdxejpbani1i3rd2w9uz4yj065mf83ibtdbin0oxb1u8ec9bg57k4fmjmvw7mja3hv2aurnd1s7rm9uspldx895pe6ep6hcjc9unjeckb1t6tj37iy0bggv2jrlpnab30n9z67dm3gbcr6de87do340nxoj4jurqjnaliqj0yt8k7mdoe3n9m52mazj1bgqxovbx5d2h2q6dmzr532yqja9p4mit6bxmoa9h05vozlpa2qsnutzy0d8qa4zetxriboyqd8wnfijoyjks752m3kxv2sh0ug2lx3bsgo6q72mgl8vf0mwrfdoq9209cf6vzlv7tx2eg390f98heddrte444luxoww521aywbdkaj4pj4lu5g186h3cnd0fl22c65ottwhyumt79irfiwi9csb4a4ss3rsf664wn25b6qrtht9xkp11jxwbup36ozl49j4abe0vkum87qbwphlsvb5olapnbed2v7q5txzzgor2lk6yhes1thruoknrebdf0oasls8kamzth7jmbd90qqeehmin8gwm64xixb72oo7e19s34latonj30rum8chzerj26u2djhiwi556nkf8hjjh3m2c4l17pcnstxwdxgydpt7zllrzszwua1oti3pnr0gc7al86jpw3mxlizk68w5rsdvqzzk9muc229g',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: null,
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'e26pte7psokrlrxk7y5b',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'n4zj4fe6k5e8nwgagadrq5comkvmulvdrrwitrwhi2ue1lkfc0k5x4fkoqe4qfnf5orxk6l2md5oy1qgfpit7ro6aukhu6xi6qzl0a0pls0p04v4y6j3rpuox3p5w3hl2kmpdhi4gqe8ekfmv3dx0at4fbod2iy6',
                channelComponent: 'hyb1txw5q9i5indxt1yidqpgdh7ai837292je1ft83xsore40hpkzdhcd568qz79g4qghaoloobkwys4nk1w04wlyreds5iagublt2l506ojqxhivvkg2tabtor2774hyi76r6b776mhamtcjck76v6wer6py18c',
                channelName: 'or9542ohzjn0z5ldbedfedywyi5sg1ckb4xl5gz020qvfvgtnutdqe4mxlp8v38hbax1opvxq3dvb2pudpn3qz6qlf6k9q5aw4iv70bggnl7al64wayc4zqa07ueqvktus508vyi8fjuhv0e3llx2n7qn99y7v4g',
                flowParty: 'prncwto9pr2rq8zv6a3nqvrtfdbkugf6wj3zgbng1ad2csz7jrtnegsui5qsn6qh7rcq1dcy6ginh546039lglfp2mosu2iwzg45vlaf5ro4rk7ra7g1ts3db8cj8w9xbgu4uwduvzbfs4qwi685uhl4b0z03bom',
                flowComponent: 'm6j5g2ie6rv457tydw46d9u9hhhr8jkqvg2fc35n12dt340y2eadbshb8dqr9rhn4ep84gt8puafen3y0ikmepqil9ftkfwsn76j6twfkboj4eomix29szbtw8k7lv7lnm9zfw0fizx4g7hp22isjb3joaebfoc4',
                flowInterfaceName: 'si1zgahsgbgp920z0uiilg1hc2ba9ll0n9qf772cu35d932cw1uu7w5muqaeyj603lkz7qgp7kujli459frm0lz9ictl2btpfctoyrmupte7241fx96z4z6egtky1bv4jusxw5k3l8e216hpl2pdi90r5gn7v360',
                flowInterfaceNamespace: 'tmfuqxgupuyk8x0bg753bl7eeayrue6h0ubm4dolq6iq4melt6u32nhynrvn14jt5iwzckcgfyuy3fg63q5ncfkiftsv6llqhiyky60iungwofybx7k4k0pjehj5g1mh8a0prugwp739q6tu2fddykn9h5flicc2',
                parameterGroup: 'muvz1d4zn59usvgvjghfvv5su8mcwtm65r8ns3yeun07ku7y3wiqqi6odf0qshqx3ldmngubr8b37w6x3tevn0ka6pic744vm8z4b47p77bxmv4fpa5gjx6b15tdp8ql013nh38pg4kla0xfik4xinszwabexj7bavq0ytl4b7mdsktyq7w12zmddixrgz4xy90b88x7sczhath4sm6fycrpnq410ltpufktk2v0ag3xym0p71izot7kt6x8y7e',
                name: 'k8emku2te9jej7dbzzvupyd0rvtzbe8jv09dlqeca4g1jth2ctdaodckv7ciko21nz1g94qg52hrn4uaf5kutnu63l9ozzvbeuxrhx7bq7aemybbekhft9pfkobrllnp9m2o2oirniqge3tm1v7cnjxqlpqpq5ujxeszu6jvpxz2rexi45svx16mqgli5c078guncw2l71cdniqnub9hzhswvhq1gren9ehtek3b0s5a5t2ngcgka7x1o7zywhj3588c8h875chmrv8g052adigqvwjpafrgoi76vgec13za2bpvarc0g7m3mttjk0d9',
                parameterName: '3wvmykxpca61im1uxpbh5qd8vd42yx5xa3istht5t9bgk42r76gevi8ukdbd1k94kg2z8l0tmcbfw3lsam3zgyli2njshfoeetmfo2di89mwjohuipn47uwpcdel334nouh4vsnwcj2nhfkc2dyxif7at8mfy2l43e5f4kz1twkotzhd46278gbfql0qcxhauzjuwged748m3crii3ql57lz91wka35gjr06g9oifi2fu944uctc9ergdwdhagqocnfihewnrdr7uvnxexxiy9oxxzqyh4rbw71avy8zjqxyc8q8xot64ub3ebt7safq',
                parameterValue: '0yoqka33711w3c54gg6vylpacuny4h483o1up5o62r517rgtosgudercneurzqlsn21304p6bvdnwuwjetf4ysm6mdnts69opn59l8ut0ys4g7ep4u9c60gyntuz70u9gj23c5kpq9mbkf7xl0m29b2e225jayy7h5r71qywqg67a3pswaoq0ebjac3982avlkshr2xoxdxapfi2ouolgud4w9dgn1u9jtohgtd99s6j5pu9295q6hi0j1cdvkq2tpz8qm16xzsw03zqcfi6y845aqq36h1z0ss0tbcgcq4gmajhs9cqioa5z4secs0wisnwhg904879wllw63j0ohm29ng1294enz90ku4aom080b3kjkuwo66841127qaezj97ysfmoy9sy3rwq07w24975n3mmebkyijhm67xnnmukg1yg5bi525f18keqznnkymoy0gb452bprrooe7fhgygnlv5qd2j17yn7g26awlwah523833lf7leitbcxahy44rjxg2hnqj4apvk3bfdl36tedxooi5onte2vhx78h0nqt7c3j74un28bhp6ty4i2js5wrs9usdwa8qorxrr2ov250dpgb08xi7hr3hyvsrdqtcnf5ye1gm5wx3q35nc11a6mb7xxd75me9znr6jmenffiea4fefztf6ck2hl9vjmwjyn3yqbul0e3vgx26d6wmawukvg981r63ois50v3hokcgkdjcovtgm8yxjzicq6swqwwwnz7p2tdfv9da1plwgrc3necvnjy2il6xxgosjvaf1ent2gumm6388ux5b14184mjt4qngzhgaagujv3m9bwdgvbaollkb4t71iqryu5ao10vxhrjlwulsrtie4r8sizdnp1y1o3nyk5jhxozyux1tobtkkvmlc665z3vstb963rs0id0qxol4aoo9kpz7hywm4ky8i0sti2id6komhuikvfe1odzd6q1t2mc4jfe74s0eew94yhltrupazrlijb2phrqy4bg8np8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'mfdw6onri4iphbwab6pz',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: '462x8s44tjqqkxgw3hzbwq61xqpt9h8aovdc9l05hugssxyjc4ct7hyxk81geeekxudr2qijxqkkqai448gm79q0a6yo9t1h1k5ejag855qk5d5em8n6ueyslf5ugme2j3v6kvch2x08l4nt49zmezktbpinhifw',
                channelComponent: 's1tz4jqzd9son8qts1rr9r4yrv3g8auno6dygalw7cobmb7o1fvhqgqvhn6o4sxkk9r4810d1nz6s7tnedn7luxryd9a8efv1km4n78z6ufeh06tlqg988m98vqfv2rwf1f4bq81v9xx1pbdfsdpnjdej1mi0i9r',
                channelName: 'ib6p4n9nyqmctd2mc62kjua9pimcqhhbitaapovy5lmoyikmqxoolpdj2dm3r8uezqvtsup8cavtj6sd79en64qqkowj5gt1br3y2n6vgrwijl1vzzpkfb12kbkm01w6yub4rb4bxbvs1e1gtbmcqb17bpsw5tjx',
                flowParty: 'cyp9upjiqenqfhpdr75g9c7tcaaw68tp7ck2mf8dtxirqmcjrb0bwd8dd6cnxhzlqmdmxeth4o9kgt210rkh5o0j9vh1wk6mr65nx845vule51liwrcdoz9lzcz225tcwe834j7dygpufw55x4rxnpihlihpf51g',
                flowComponent: '4mle4drli7o068hvjfjsm7q40uf1egw7bk0sdn7v5gf1wnaj99fw5d9eg6u7u4g5xclcp20fe1y9qjo0ol3f0pvpw74s2r26nh60ze76mywd57z62156efz5u6qm8p8icqm22d5n4y2hfb9f2j1hqpd05doxccey',
                flowInterfaceName: '5pda71qiacux6l8of12r3yrcowkhwmjx11to8llrihvnczkrlqn3wr0hyx6k85b4ck6f0lekqo937rviq6gs0p2nv6ynashon4bd3lw43lab9gcmx6oj2d9q2zpvw1wyhlbv465m5fvzr1til62tnijt47cpsa4s',
                flowInterfaceNamespace: 'wfa97eg9pd1nhvh38cepv1rngbga61rdbfxjze5r9my8vuc4krb2p8p1rsin0jah6lli4crgs0a6qt96bk55zxkjt5w5f2qay3kxpzp7a2ejn7hokl2rdjpubxiu11crinm4pczcgatcyyb93bvwiywwsmug4cg3',
                parameterGroup: 'v6y6t45jueuie3aj6pqszaa4jj7kyhnlswwbhewlnwlb6fo9gylga5ako9joiuae5zg67ihv5mf4yv3cl22oafiw6ca4quwl4bb1lzygkzqhin47m7s0xe5fdr8wkio2qg0tmhxt5hgolqq1nw92abrgx9nzwac2rtwt7p1189tdaz5flh7udso5vzizjtbbp8ctvkhs30cap9m7jkeprty99djhos2ne1wo6lmjjinqyh5qvp8b9a9xeov9r6r',
                name: 'k3lbbtd6cox5ytv15mmn3e2ff22jb2mqpn1p2tr7a15gp8uwc5xg055wmeycca3yym7oearrhi0o29qox5f0ibvqqm3qfeyy3ftcb0mfcw4f96j6vtvlcm326o0p1yr8zals46o5jjy072no3o1y5cvktx9yy5xmhnx6vkt9xod9v395ejtd8plbrbg3d5ojea3oshttugn7lsi8dzp0vp33j056ycl18tthmfo5bveenw758069px7kbaw4jgbkysqit67kpmh4o4hok58nk3gog5dn8j9spcishn46g5obgp8nsovwnxz8us0ctu7a',
                parameterName: '52yw0upti9t58apy622coh1z96jvsh37lvtc3kkh2rejjhcrf7e8yx1sg5gmfr9txzantv3210ukbf1zvvc1sil5v1nkpmwkw6f0a9h0v3ngq44ayoa9vi85x7uysbf96dj4kinfztisgiivlxfx6mn4b8m0vymnnze8c5zw9557emvc85avkv5vi5pe7uxpcqf8kcz7q0p41i7qcupamkeedzokvxyywvrgrglg2yj0k43dbg1vykultyncysnvpig2ti4f84rz6jw18w7pkbopba7uq3dxlwfcr4ln6ktq83bh9l8quj3uxfys0qrl',
                parameterValue: 'pbdoyasvi28sbah1y3u8igmhhb7ogtjipugfbq8e819vpxotccqgdqjimwj485c5jxxb3ppy2br7prr0ze7xov47kpwjj5zwrmjnv8vqiamn6o9n0rttatp15x4y3sf1nhb0f8awlams84a5gli97wo4b1c3rrlxugms6n4ex7mtr2f1j1wi6vglgdhw8zboairylxemxhm2dw7tkoe34zni157kjd7i8lyic9r13t7y718nu89txa2v2e1sz02f99q12sif86d3lwc97vjac2g2lutlqa9ev280xiwiritkov4dveks6cg60zzepg8pzk8incbe5wb52vza7347ki1f16ixkoh6igwxpsqwnamgzyntnhwayam38ydnrnqwvngbk017t1gdvdcpas9o4l61gtndvkrdq7n52m370htpgvjrhx9lpn0fdvsukmiltqb4yuy9tx30refnk10gunpufhgyuhsuk0xpmab0esugtciwopoiavfllg9dqh934f021qehfiydjg3ez8bay4osqfp80ev2b49uycuvlwuv42rfcrdrk3wetdv2k151zu0flhrr5e2bpisu2ytab9h7tbnoubaz9sw764i0jj0exvmewtevgkzw5eaya9qcl1n2ns1543ndpydq024qi5e6826flc8hool779q66c47c2cbei2p6fekhz2hzm5gyis5mdgx6iiq1lfujovspxxf5a9cghaw615genfg7awfbufn3rzo2kv0ogzncc3hb0uqq9ianii4mn9bk41imcwmdyqj0eytxe7kmzilre1ks4iihds9yzqfd2hexu7d7jizcdtul234c75f3g5rffj1z6svps3316znypbl4073yh8g99tq9vvr9pvym8o56si4us9o1vgfxtkgv9war6m1ojmy4hey2hxyel5ob7xb9cbytiqu54fii1anonq5avf461q7spzd5z567gk10w10or0n77xql1d8kd4rfipwlhkz3yemmiuo0k4ud13h',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: null,
                systemName: 'ysdsi1y9shgaszo886ct',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: '5f98ux2328stksieew5oo0gf3lbckz7657ngvv5b52kjkb78ywo1uemd9gym7w2f4bdm5dolunxluv5nokn8bf22976yw90ztqb4pf244pe0ynlfyv8ngpbvk17x1ocv0lh03ooadrxpp8zvm2mmumq3ti21azr6',
                channelComponent: 'lq958x8zf6wydb4kycjqqnmmyjd91mewb3d1zs9v1lz5lhrvc891q6c3ab70d6kp8iy6p3gi0zhdld7cgwmjepu8kpudjylfsjytudvnh7jnsz6578wrxgjuvxu1ro3yexcgrftpk0xxhnyqi1n15q9d0zoquhcz',
                channelName: 'klyc7k2ex2eqxnwt1vnkmcml3fkjf7pzzs5d0kci1mqevsc32d84so3gp8spl6bmaz61o2ho4dw9fd92lwauk9gkzf12ckr9ex60cfd5x3120yf02deeoykvabogu8xq00luyvj3tldj1zq8i4zfbo4f8mkaecau',
                flowParty: 'vsex9nzdd6syip5fgk6uefm7cf0nzhr45h6zcaf3jar5nj20iaqolseldk5jnxd3eqtzcd544z8qwcqia84f2a477tfgjbgxisopj8527rs552p48ap2pyikfsysis7ql9es5npol01c4pbyfwj7ye6xbbhoa2kp',
                flowComponent: 'jlgrm57s3kxvwtunryy8v948rzb5cac7gn0nric1i8nrzaeuexjxfjsf9ya0ik5dkuxl55959t925psgaaitslf85tnw1zvfwsk4rdke203nmvmo37plff1usjcgmgtg0run5fkv4hczdkcupeh6zkqiiudyh9ry',
                flowInterfaceName: 'mf567vigpm18h1xlcggmjj3nm40p230d37moo3687puog39sckymsojl0amhzbzx7kn1pvygvlnasox58fqdmmr8avtffyvnhlphixjw7gbrhn39825d9gwrflc859cqvekyaxy5hwl6mxm79b1cpeigg36nk5dq',
                flowInterfaceNamespace: 'kupk616sty5si93x2awjvlnirhym8y6ez2d4aykh1ds2mpt66scdxlao0j3u732kvmyaa1vhguglf6hzxwiuv89z7liupstx5qo42t4qj73ykiny90hoq3exu8sg7j53y9rmtrqb6xazuo7ucqnwtxi11emdq4wq',
                parameterGroup: '7eado7e7d1729k8nfnvetodwlisaa5f6pecvnumsi06mmr1p1alo6xa0tspgppuycex0dfyld0mcljtk2dkq9gzga6r2cb4yo8p71h3j8dnxc2d9t2wmp8l4yh2m5otfubu858o5z6f7910gl4qs4dviwpy34124t20eepgntklt58sq75onebipdhmn2l6to1hgnixli9150x9jzh6cl4i6b0r3amarpu33rd37g7c9uexik273ludqt2mvfso',
                name: 'nxnvdvetmempr3aodij2osu907j9a2n82bse9g3vfs1zk7u20qp8hkz2bmfwpmxlf54zt9aftc05yseovtn14501k4dc0f3qi2niifqs9yqtcjf9owgbz0erk1ix6ujbrw97dmyspr9d2g2ggw7flfzcb4ur7aowawudynil4ys3abqkgj7c4nd0i9jmjoez5cqqta6o1r8sroxhaxz6zq01wr0cegaz2crmqmumferfui2f7rfmb9938xlt3iky6sb0xpzlk4ali3izgmwl968jdoi058hchcfdy5zx6t3c9yign5kw0dev4gmakosq',
                parameterName: 'mkffxnit1rwj7g9nqdsm5eyopwmdv0smq8j87kleaqz7dzoztu5o4mh46j7cnyiocj3hg7ng4jxesq44n5qhtrvo277qm2zq4w7ee945u3xfzal1xe7uvh8m5n05ziy9mc2bdbioju128hv9pwzlmyna9kzp4691yj46kabo0f014572irge1dqmwjl8cc605xc9pop5fqgmv333qcuca1hw2dfy4m96ussy3y2stf8e2a7b5iox0ysne4lxdmw7xtxjsry6uhiwv3d0iwn8oej4amb4z6l46ygb95u09jh6h0pdhjd59c63hlb65zi4',
                parameterValue: 'lkk89txj6bwc25msrsxg1apnvahw1fx2gctdzlpvwaowodqkudwyw8c7e7zkyldm408fepefsjh2o6odjq1s74qfg4d2gy7kgizdgyxvot7fjyzwoj2jo1qzm2b2qt7v2mh7i9lyedxrcffgyowu26t95t8s68yuvj0cqec1ztumev9kg641p6jlm6wupe8y30epbnlnn0fe7qgshytrzvg47ukk7j6s7bx6zu5k2ouw3vdof8c3rd4aqx2ydbg0t465uvekw8gsrz1362u3vx9u1js6byslzx1jaq5t1lndh1aj7n6smqnlqp1vc8edmyosakmi5b6fzvvft15993kgq3yn7jly09wt5u3pj4zoovje953wvcgpeeanw1ol354fztg7p1au58mapop2l2j50iz8j0qjgz0mg2odhxyjk1g47sjiw5a3w6vqtb2etnw5qeoew76wsaqksa77qvbgh9r33ri7c25d099bmhksz4b8ztav5dtiqq0dp8d6dpmw4uo28r33al7gjtdlv491pcuod06ypuf5h2laywflnet98xwhqluyha636lcqmc9g7rkap39t0iqkzqcf1zf9yqvdf6ettwzj6sddgqd9agxilo7nu4qer0ssteoy91wmh509brgowfr74elvsa6qp5dlbjo715ued3yi2fg7x1f795fkx3dnlcx8qybpgskye72jx7uet8d0orl9dszf9nzwk61tyfipvq0whu1k3v5viquaoqa5o0lfzfzup7rvcnbtc17gqe2yznmqfwhmqynfvcxfj5r329nakb6jzudguk9efsazrkl6elhc1pehj7v5c0all758rbucm2d2nikzfozxmgi49rzwdadvv8hxoclul0hzac1xn8b56fmpt4drxesget8jz7al8uqqspfqqidcgvc8s6mb573eucpmc3i9uccrnrnp1t428avy8q2mv112f7pmdi4tpcmjjqa9qbrk9omdt6rxtzf6ywsuq62aziw489s86n61',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                
                systemName: '5q0q2p0gqi1h8ap9w413',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'x5ypc5rp02s8bw7slwm3di1os7u399784zvko4kvfgrowkt676r2c70oeux9pv6xcen9iul7wu2ajz37w5msa90b912n7fs4srvqlits1sf4ulzfx4owgbuvs1jtez7jkgheiz5pc4c7aebd0806swloef0xam2d',
                channelComponent: '1w8itcx6i2nqlm699yviwc92qyeingw39gw9a7ufvykr8w9bs6yymcuwl7n8gp8ueu4arzieha057vvp1mvyxeg018vhtc1gnuib159fslfhudzyzbwsa5ysvipp3s383g5zhtwfrckgvmztifu9ykk5ppz40ovv',
                channelName: 'ibakh3ytjybq3unh7hpiruv8km37zgb6dwaslnvb0qc1mo3pwb682j5lo7iqvb6lah94qzsrlfs5mmsuu9galdks9fppnk0zdlk3zdiqxm8y8l0p56xjfec7qg4si3b9onu10xp9yvp7y23d8lgqb5t0pj5mkrpz',
                flowParty: 'tce74z907dsyvascadhx8flmdezzqmkqsjldygxud6oyog0isfp132gx6tpeudt2a5zztut950ky6hkamv1hvkt5dhleiria1b7x96d9hpi5rz9hmc55ct56s4eslokove78fwgn4714ok4r9aapx4w1hrkzbs14',
                flowComponent: '94xu1wa4km5cshux8j3klvs8njs1c9rl1ogsp364cxct7iarkzsii1jpr7ir302i8gkqn9sqji7hsfjojfcj5uqo0v7alhcimmalz6c9h4pgi2imvff9lum5yd8cgcmopxgdag0k05zrm4jjntklk9307m0wnvei',
                flowInterfaceName: 'r3mshokth9zg7muwe4h8v6s9ab4uvzz3dquh0nnbsdrqk5ixro96s7i5lwvi5cbclrrn2py4vnyoi2yf44iobt3dv5p3uxoluv19zsmvrjp42bvq83imlm5h948653o9iu1ahp0kafpfs1bnbhxojgptly4xqfei',
                flowInterfaceNamespace: 'jkkgsexnh1j4f15g89ptuw9rkztgv3xgbtekbsjzbtxwtxiw2o9mcepcw5cu19fjep4jc619t7y9zuy2yj6gz7797vt6pr4ne786cn1bxyrgrjb9dr3pygr4e2yu4aj4y1r0wkri9ywpi3ov79cb0uye6y2azy35',
                parameterGroup: '9k7vkrskad6vrv6s3symyjhfhvo5ej16tdx1dqdsot9mbcfa5k3wtcwww3yefg4gosxfx7ee4efd0xm5uqr8z1sr4kh5y4y0rs6sah4lc9vvas4m8dfi7sdo7tctcbccr2ve9r8yoljfz7irxsp8iznlwj2qu28zjc2xtmvl6kd0skgyerdccr2dnbdt7cnjqepnai090mfrcaj44mboyr87y0zdnjau2q5pfuvnnyjjjxrpp884ansssf1dnes',
                name: 'swavtc85lna4nq0emmsytubtxz87vsipm4jb1x0f8h00jssbfpn58k7v11vgs3p94m2yahijmqam2is54w6s5p8vz4b7f460r6ayzkm6i0og91t14p5smhmelkhv06r24i4yukiact236w65haamro7alluwm8o7l6cto9sn3iso58b627qmn1ltm6spimjwe547ge8ckta46yzh4s0igitlk4dxwvpncqohztan8cxoa9usmt2w535kpykn7a4p1oe99a62jzml3st6p3dltz1a2n5ez7y9m1kwm4ack4hih2n2x9ztayuxz2z80jg5',
                parameterName: '9vo9ym4d6yxemfevozeevz4m6rmxrpmy9ml1z774xhoixsz09gwn0mrg1e9wp9v97evvvx2ct74a3e1tnx683uv0du4k40due8x8ps6dlulmk2womthciqa422m7ian1m35546dn9itoktyslh0vntm9pkk6vidml2uggzsez2w7nb3efy6sxny85w0pifx9c8v2ljby9kledd1pi55bzp35h6mmy5h7angzeyltl3hhr437a0hi4mkqw4wfag66dg8vqnrwp44wegsgejncndo4971vbbnagm1v1kp9ruep10pz2fmw48g6q2sbs9ct',
                parameterValue: 'iicvcx2fuxfy3jz2wspoiz57ywyn109xl064gb8no1vwjp80rm3ugyzmhdxgyjovoejskigyvly1gknsa5rmqzw8z867u7ihh1ntinqlvee9wxyt6uwzafzdz49oitcswswzixj56h95bzp0ktsmqxtc90bow99b64kpcdk54hyejd7s4ouwvnrdgyqzsowlimcpzf1zv8ia89ybaqieysxl7fdnbjj24kbqakqnvv4lof5jvb7dg3e4k9sjsrb0eo00w5v6ycp7g6hm8o64rian4fbotw153zhvi211fyp429lae0tke2xyuc7e5y3cj9k2zymu3h8kpwzoboyz58c9py6wg037z7ejwg4tuvq0dznkv78jnzm7dd95tao29bvn7ygtevb3qq71yghgkwk3ui8io70gye1kh4dairsztvffb2fr9idfzsism7oa9lzeey9mi2lmlsyl1vkq587tyq2i5hm6ppvpp9vfx9msc1ctcvr1j30q5b15qbmce1n8jk8jak7o2i66h12ooxqxpdi37ohvkrv9vom76j6mho3yjuh0lwb8acu42pspjiuaviw0k1gbrxy0edk58cnbnf41gy2daxsnpgxyhux8kecvf717hfinqslvv8z5nb1yjr6xv23q5lzhqiklt6361gw9vik3q5z8l03vh9xp1h4h3lxam1uqikegce03wlvs0cw53nlqwdusba4bs3n5z37l15v76mbyeqbd1g3ppuwg4t5h9rxeypakakrdm0db8ym4vqudbc6ojxzfyhc4acxlp2099nux4uo4u9y9ghjjfi1e6wvakscff4freo139oxvqmw7lshrayhreqv8u6cct5b9mluru95tssut6qvyd8sjuvd31mk34ienyglai7kw4snacthyiozjhwd192m4k7wixklp647ruysnlabmu35kw7m8o6ofmin5rrpho4s0k9ezszt8rfmud7izsx38az5znu82ukoktchkds4pypde8rnw22ygrlec',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: null,
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'm2kewj6gml8l73exum2t2lpcfnl0bfx8rxo19i1emzppgvkfkwdr6keoz6l2t70ae6dzo300zfcikhlsnldl8wbcoyzkt3357fwcsh1p6z4m169o0ul8wk66lglv76sazxrdd88kz0aavbjikqmewdqgcyvl7e6a',
                channelComponent: 'nszc594tuoyf6vhd3e3fdduyd0uzuiqt4a9ca7e9mvh8gghyyx5ueiliavcpwiwx8zm25vqj1wph71ftiwkt1zwb2ol62xzxmoswtir4c10hjbug2mh6nmipt4gh38mxv1q4gobcon540as3rmv5eg0m4qqcyoyi',
                channelName: 'nggkx001t1m74yhavzm2bbqbimn2iwyfuhfwp834jlkketqyxujnikadzsoo8ivmj9wwzqrvq8h8fn66avl5e0uxgb9wn8ug8x5k1f0g79wb7nec4ikpw85q5z09t750angcksoj08ssrpjpvomzcptpxaq6mm85',
                flowParty: '9jc350ygrshjo3mbcm5dnzo10dkqak3qq729kk9uefzd5tf91j6oc7ylpz7f0wizalsgfczyr5gz03pep894cvpta47800slne4tfoze5eqnuau6m4gs81633edwkniwnmnf4n89xa3t2lj0s1bgdf93phyij9dr',
                flowComponent: 'goyqbf7saaxlzj91e1ny5x6vhrc9bdxhlh2iya7in457t8xh7dfvqu1s37mkfr3l6fof02jblum7xummynktm6gu3ca076la4fb8id3wg2y7jyu4pfld09ljjbb8aj6iuov5o33z8o9im58lscfhfv705bi86w4x',
                flowInterfaceName: 'esv4c74yn3m14tl7xn0fkn7t1sea6t0bl48s6nc10fvs9c6kc21up1y3kr1ta326k8cs9hdso15zdnfpuxoadnabugtvlal7avkhz0tvjc0pvfpxn5e69zeqivei17orwz3l0make3j4q9n5j9fz68n49jw9icqz',
                flowInterfaceNamespace: 'jkykl0srofj0pgzz9jg7laozoy4ip8hk36cj6y69wfxruhfn8383loy5mj28vwvs3zwi839vr0jirtu5xv9sbgi7b4033ah5lgn2xgf7i0131kxbwf2nhmw5pv0c8y33pvaprx9nz3xtkjsm90nbfei54kjyf6ma',
                parameterGroup: 'leuhohsle1y4nn1vpa53jqx7vcsii9hnphujipokx3yezzso4f1pjhhx6olhurbi3p3wdjqwo00czwt0167lawn1vwpcxcp786c35jorp0wfi741boen9xx5hyzf17vucyw4bvdn5r3xhlxbeb4emilrbjhtkyusjrz1zpd08tay10iujsgcvyhgjra3onef6vrngkjyxusqw6qz9k6gojc31mo2fxtvfto8k1b6x4ud7sdadhzkxvup7po8flg',
                name: 'vd35xr3skdbw41au1sb9zwnfbfsvnumz36j4rrh19jo89x8724xo21450vufe6wrxirk8t848b1706ibowm61x3zjxqmbex6vstdz3geodgpmx6h9hp8rrdgg0r76ufctm9rrgnpi7763pqzn6egdpgup0airatph69ar925dyl1j81nxaq0i77g5xudtbowxb4holfbs613a5e7keomeqmbprg04a0ypee5uavk9qc72bzb0azpfg81scjdghbyf5si05t83ek7g9cnucipe3uwczhuyfx2fxv06tn6dua05md65tme5w1r9pncesiq',
                parameterName: '93r31ltlar8npoeffkd85zwf0mzx3dqi4yxhzou4a4mq0103og9174o30fxe9tcg9xtkidliy438s16pp8qm6x0gdb16nds131po1r4own5aldivqfq9k0o975n09r50vziutph3houf8cokzf8t9stdjbhp0yy73g8694wpubvd9zu3eoo7xj8e7d20popsxmd8lrlirpuw9xje3q4medcx7vgecxb86wkr4wx5joq1xi9m0yjsnint7uwizuidzqq26iwm7x5fq69wn2plebzs5jsle1wzkmm6e306kpy77zabt9p0bfayjvug63n2',
                parameterValue: 'nomp973x1wnbuhllm0oqh9d7zcxji37kcgcg0vvvkcck3o4666nvv3nav74kerbigydid6jw9pn2xag62p7okpwwrh5frwnf2q2u13vh7qefhwh4lem7ytwpdx6bmzorfd0l1sjq6v1xv21xh1tu08s6l3jzbfupb0jxi43ffcpi45zg06j0p2ba4dqa3vyfu321rod6yudk5ejkhbjmo32iqjs7w624fb2la2m90diheqvd1206ii02hepixzz86n9haxgp0jjln2qs299ej50ip8dsvjrvgdg8ap7xvfpmifdj0dim88c03awd8ycjhlk80toney44wjowrqzjr80j9qp09471oopeh0ij93ch00ug6rq8bl1xld63lq8lqu5858s2a7ysoazmtlzh1luui4bbc2f49ob08qmxmr735wa9by9mcfvvzthz5qwi609xhobhhulnq0nsw6xzul9qukfzyeba5p84cu1tznbpsvz2zes5l0rcyp9wnm555cp6iquf6zgr449aw6qpqyamk1ii2eld08o7xjxbjrvbsljtexgqusa2o2t0tolxqtxawmj4b9kofodds9t2drkdyz8jxplaqh58f9kf43jj28u6eb8gyqv5bi06w5s143ejnqmxhpjhskdwqzb0fv75uaaqfxkhbwm76fadyyu9tyj1an2rxsx7aqcqdcpcgw7ph1wll30v95yjyikfg2jo4wvq425rg99bvw5hpx5ezjnz15cyrl1aupdilp5sv75y71lt322qvcicg9e535m369gvbctunehdtru753kuqz6vqzqe1zhl1e38iscxzj3oscnx1ynb6g63ijjomp10qf1529e5500r9jx9a1yzeeqhgjjqahgirmy3slccq8grbklpxfcdiugxq2jvutfkc3b5pcp31oonbu9foazm21h2a3dg7rlei0ilezzgnxn9febngnn9lcztjl8ujodvmzm5y7j4nn7j1i20pfewv7lwldan7a567es31aqc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'ejc27f7cw57tf6nazrc7c2u14fj4ijc62zo04q160t5v5oy5nhsmwjigit32a70q25sdztarap5caifo71tb0jpdwq0q7wowwz0gvdqpxncqhpspea0ozxjyu4bf2ttcgo3vtsgswkwbj0egn1etw77y6phwz1mb',
                channelComponent: '5clsiyuqe3mglt4f925lsa69ad38fki9qgm0xcftblp79nnugm1j9vfza3pe6w0jqx0vkqh7ywb2ws8detlcmfjy38mygog0z9qvsb8cjcb0h7mfv2jiedbfcflb4n3irp0jdzeorg4llh4tk15830ljuql3crxj',
                channelName: 'k1k91bg01x40bysganb130s0n9lsdfpi9upjt6qmagorx5v4omimdk9zbfr6jt2dawja4h9imr2s1ge4zu67djv362bua000iv6fog10cyoz0y1kgqlxm7vfsiamu0dnredlokytim8mb30kowoklu7d124r5qh3',
                flowParty: 'y2yg4voi4tljxfxr0em4qaafhaph765l4reyjrnff5bgjf328hmnj96riw8jozw81w25wkuxhwvag5t7jg4w2kokfs0c2720o7rh08ci7husnr39gbpjdm2iibw9oo4u6b3b6igfpqa1cfvrnwwknm9vim174daw',
                flowComponent: 'blp24qxm4hs87t7wh9hxhw4a7y0sg075sb75ob1dzbagfhae9ohrmjfbk6qm7yxkpzimrpt4au1uy60u0lsez70ji5x1k6pkyigry97jort2mypbdjccalorhfhs0yjxlb8l00ozrhx3g4q08k1oly1mvwhnis7x',
                flowInterfaceName: '7nvczhaky3z7tr208rv683ai0t36lk3a0qsu3vgh8tihhcyayc2k4qgfostx08zpc33ml4rmf25cclucixst66fkqtkqjum9mzbbxyan9ehtodo1w79hfv9jmetaqnw2pk8nkmphqdspts2fgdino53tuzx3f6in',
                flowInterfaceNamespace: 'l4fn633fly63my23w450jgg75v0oiuvlxqivej76vaz51k85lmvnie4dggem3d3n0zkzvv5iy59v4r2x4nmyeleelqfe5o064tcz2vs056vd8z5wkimo21d6ma10lvqsdmzznh5z8jkdp67l5t6b05rplb69anha',
                parameterGroup: 'd3f2rqja10qzo9n42jvtgvlu0c9bjphktttq9u369l7j8luzbl1buaygt54ovmy4d9pztg395yi7503yi1wzfakytfg6bpv4p4xcty62vo4ts19htlc6rljnmv9rypdbb00rbk3ta0rd580vwbzeqbshv375qd9mozlayi7vg2gms4rg9depvjw254tytvkz5efml2e79dcemphxmb9r5zbwr19ut6zmgzlw420dkjt5ce7rfprppuavbyqr2sa',
                name: '4p01zmasoxn26etux2ofkbuni0uv36cfpgffc2k578y7n2sci97usg7xotlem3m9yv14rii5a5qti23aj04l3z6u74a0fqtrn2ze25lo77nt3hncbevn85ri08hchcqlxospoq7vbilfjyqs412poaurci2spkxrwgnodt1fri6fc9eun20u8fnhiqhq7rmm2qtpbha7iitsaf05oa23rwlen5sptn477lauavdpf8nyhbdtl79k0tezh9sqb7wffqcguh2rpjm5u9sfb2kkjd616lc7kahaq54m9tt1ao340hidtvfhs06cu7fdnk19',
                parameterName: 'mcngwnqqo4huj3hz9mlcd3inerovpr74v22lcqi5sxbqn27ydoujp5kovq4wp1ps25x7lc1aocey2rf8h5hzxips5oe51yhq5r1as0id3gh9k7tg62kt0bc4wuo5k57w76q3s5e8z0vx25ioxitqa1mlwj5t9see37r6mjky1vu87eku7gn1qxju3f1jnftcfgbi8u5fmx2nfkb4ev769x4pt2w019l74xefptzuwl1f9rrv4ufdq8nnh5ecdhl635fvshq6eqmslhu1f8g59dssj5e65pk3np8pk5rzbq5cdht22urhmd64wm70g8ll',
                parameterValue: 'dptqvf1xirjt676idrzn7k0e3bpj8y3iw5jrgfp4ehhwfs8050pshkz0m699xit8ppakyr4ppely2km92bgp8rn57zkicmzwh1l07sae6c1gq7ss2lzbgn0dvht7ow19w4aew97h0ho8tik8sx5f3spocue210qt3dkuip9r3c820vmuci3ywzq3z4fv2m4jb19ja5y8kxvzstbgmd8n59whp9s2uasfjqv63jlr62r1innau1l9yv95cp50yis2hb5h1nieyrese9v9a03wfyjwgzahmfg1cdwjb791vhldjz9o0rf44u6sqo32iwyuth9dd194kw4qiz10ukxs202zglajow7mcddu4nrx2bna5jnw9wlt639gl4k816figzfx1p4avwbdhimduwzqfry6w6kf9ecrd59zwiatp8awuuiagvctdsoam7qkzatz2lchjxtv5r2ka3nducu10api7t4dmqfvo8mc03bq6t1xdw4m4g0kcfra0zqepdt2tyz5pf8cyw04ih76x9ceog58cmb3y7d05jdrjiq0fws1tuswc1o0pzc57ukl19r20x7yblqm67b7m2obqlj2yjk5m6tt69bg82yw29hwsczmcnzgmfiovl6ltlm2gqot8lsnfhes7kd4b2cq47j58ae3y6xpmsjue4pimtyesa8aneg9cd7wc3h6lae29g90ik082r3xny1cn8t0uss6mbj9jngss8ct3t1y2qfkqe3pi8zyjh7b3pa2lms3ihzab5wj85zcuit4wnmf51hyrm05w9um50rj4302gd8u4nttyyqh9kguty997mhuqd30y6o9dubdpa985nhrhvq32rflutqyvtwfv5jwwwdj33dpmtvs9mfx8sdzg3xt11l3ptkeej4oi6ix0i8iszxq3t3rwkashc8hjnn1t5gk36s5xpukpqmd406dlvpc2kkmogsu6eql84fop7s6ymuvcm76vqxmnzxjq12cb95hltzpuuv99s7mg3jtoq86xd6f',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: '5s0yxul1hh8m78lwpkwg',
                channelId: null,
                channelParty: '26o6nyyucda9lb9tpjaymjkqqh0619jjezxtt04p7307wfubkyaezyl7h73vf19wd91ozmr7k9eu5r3qw31nq3ha4y6o0es0kt70h3vc2g8qsgyo0kuytvhkbtuqsagqv8jlh2ft9bnrr0etwrnbnydd8bogd9ky',
                channelComponent: 'akh7a69wrwgt68imwipcl42jnvivz9qeoa4k8466hq94e6xibhin3z8cnvdk5weijb6z8inr08dfhy2zkmg9g8h7ulq5ujr59rkdt48i0r3ld9pb74n8a12juu0tyx22dva3ph875d5tzecxvripau2g8zr8hz8r',
                channelName: 'zzteb86brfbipgb93q37trk8tsra7zx9aohetriw5tnstdkilb7a9gtxwwu1sh6fk38tynxoos3577qkzp3bujgi8h9hbthf90iiqbsybdr6b4v0d4rfyoot5l5ahsw3p5uzbywgeinigxx0gu2l5xula8xydml5',
                flowParty: 'avwuo5ntetd4p0ffp4fpsmyyt8s1xnirh24t31tobcfy0uurb5fbqjxot8twqrqopuqeeygk0oglc789nc003k83565pjb9g0nhwcwuwoefuo6gg7uzdsipdw4f7kxch6qa5t31injrod8u000ueia4av8t45321',
                flowComponent: '78t7o9rsuauejg5bmjlb5gllcsloepksnoyhu7qcug4i8ec2lyyj8ey1k5kz7oyn5ngbumzkd53qi5gxuqygul6am37z9itu97jppd55ojtmfh5d6bjq1p1s94n569hme2we6l9ttj2j7j058wsodgzgixpf37x1',
                flowInterfaceName: '8rk3kx6ew721g6bz4toags5l859gzrrsnalqsrf9ncjgro86s7y4gai8ke6zpc9jkzkg4xu4ep7pzkkb5hp9kg9se9wwerz70m0x8ejl7t1nryz4zzbz3b1a4ejagwqgfvh5qeziqheuhl8mqr54ofn8c3fejofr',
                flowInterfaceNamespace: '8mkoi2q8lv5y7v1srpp17j68c6xn8x0zn537c3h8302eekd4tr5cs0y57ecedewvyn46zsouarefaa29mpwy6xhiy36mpk58kz341baah5q4nssbirklutscxrbzmropxowelify4iz6lq9vxyt2xlb23idmld0o',
                parameterGroup: 'io0bptiv6qcbml2z15z8yl41fu5y9taexf18cjptny9dw6hi93uqt7ux6jerse5yaza3aati2cmvptpez7rs9jkc9wabfpled131urnqwqz3c8530cjxxaezxny1pkiqcmvr01ypi6xrh4wf1vmf020g91aeo9u12wj0jfr5dtheqfwf70riwt0d3cw765ebdv1w4xqovn1sguus4ofkfgwlv7hvtoxuq6jyhzlknfrqedux07v6rilgrw5gklf',
                name: 'mtymcb14chw6z77oeetcz2l36q5w3ho2fo6gutgxoog3ap9oqwhcwyveotkrqm7arq5bl1bkdghfd9zacnl0hrzn2eftiayculibcylkanky72hig0kg54stsvrelr9txvwmhq32vuk6cptxnfkwqob7asrwa80fxtccwgof2th10ho28h1zzzxaqw5u4iw5f652hl2se0pxu9j7qomrkhbdxxptoxjzkj5abvojm3v0vtmdjgi6wjhhisf4pn9flfzc7kvnkrkc2kivdhwv73mbp2cp9lv0tvwr7ta1tkkepon65hhsg5h9xyd1qgxn',
                parameterName: 'kwov5zip4pu95g54p5xudkw8n40825ihdle3632bif40ezkaa4dyqb48bhxkk6hxx7im8dil9sekjzzqo8kxoh5tfjpgkm9ao3isu90n1hmu88mw4fuwq7unw8mnuxzi9pejasoisug1pwxpyftj4i51br3z8twymvr16hyxs49gci6w5tgd958poprddalobwcc7u80f47r3n3zun6hkjr2s4c03s1a84z87qsug2ss3zgw1lxtb5euchdwg9gv6tajnvjj8se8qp3k379llqz3nhoy61y05labwpc6tfw9eaqusssfn8x94cx899ll',
                parameterValue: 'oag2m7158y1rez3zrkh6cv4jjvtqnxuflh34ca8gl49wkbfzfqnhwbn4o0t5lpcn3ltk1vfhg4g8dy428aqlfxdaqd40op02gxcq2s3plk0s2zpg9iisv97w3rtju04alyqtwb4qf8w9hym48ktop6pmmdcmvbizvpbwfjq3yd5py0d0siidtguys54ojm8fkwy6icq8vwz2j5fk9prx9nz30y4lz31hhh0e9of4kbkffp98azuo74jwutv0fay0n7eawajxxkj6y62djbl8d8foteiaoj5na6c43w3lpttym7143xgn3msxaczew097jx7rv0whts56zyzq00pke3cel22e9hv81m62024yg8uu223h1ttw1rtfvnte9q4xvfrmo9ct4lk1fzb59pgy2n8xqb0kle056covm2tao76pqr5oyyecspwqpj4v9t5r791uc3yvzsxwysl1x9nii0volva2hzl96kv19uavt8l8gt28rm2grr1zczd3mo3vqeccr7kcs2crluutm90x2ul5857r1g6trxrvylpr5zkb1pxgh2ydc5eip7biui8mq8jfnr35s2bpui7n1vqwdyxz382bkxzfzuhjuuf9xdo616w1qw3xpcgt6thipncgvxjxw19sl7wnzxg7i3742xng08qfsgd5qrv2bbh17e2umpxtojbj3vyw8cufcmnwskwrgc9enxbqtdavv0inejou9ungcdbdo9bg9x3zqel658kms8mzicvyya5gzvbccn13685nbje62ruvkcn5cs59ce8gvta41eusgi7ka2sfvbhd7en3e25a31lmad7ahywn9i9ksw15zsk3731vpqcl9ogh8igbn46jdlleeqs7qs6ulhlupmzigbiios1gfozummsssvgg8sw2mrwmv137t557c9d9iftcqydksljxxw1hnaaha6r46jovsii0c6ine2voj569t527q2ycqikydhsn45yy80r9slfaqrywba7ctugj41gxhsyty9pd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: '1wsx2anrntb0oriki535',
                
                channelParty: '1g9iwivm0mhkj7h4mvv2dt2y2w1olftceuecg2bqb5bi5p083krkrh2slbdx2vxm6ntej4qruozucm8rq2a8c64tbzrzyxtn849uyroal8w28j4zalh5q2thn2jl1n1vi3otkvvdvorbafyf6nucztiqi3kzucai',
                channelComponent: 'egflmwogu5wdptwm6cmo8p7w58wewmteqzfj0teiwffa40id7n2ytgnf0x03ucei49ap3lpod4zmd0k93uyv29ujpm7ath73dyxwuoam821lhpj0s6ncjyds9ij2iy8ywmh7bsazd4qxujiixz1jg7pre1x51qsq',
                channelName: '5nsqavh001o9kf8j0e2wd94zzxdmc36xyc2y62d04jokq79hffozq7jdhoq3280uydsw12tbx549g0ijo3ubvlvc3rbzd8octdisdnqnrd2853piaz4cthdjqwdbmc9kxqb5m99ylglpwa0h3vyvaz3ok0vo4vx2',
                flowParty: 'z89pr8v9ctjdatc4e6m9phhbpvqyzl68bhlonwruyq83tysk2dfuae4d75sfkbi73cedo1ahh76w54fmd9x27opg35c7kc7ofgdic5569w1gaxl99cjxlmbbtq7g055w67l44a8v90iqv3pif3tozvu97jiour9k',
                flowComponent: 'zqyk8qyt9hpakz5jhars3fu725kfrtfhg67q6mtsstlexjw9a89czw239kjbidgbprdukpuhe85mw6bvle6f35rha1aivvlv9pq2vf1u91jig26yukjg4gmlmiucblk020ej4kosapn85q82qnii1848q95hud4y',
                flowInterfaceName: 'joboc8ksggt8mmlqdr0d5u498si7q5rhc0dsedwqg5tj83cmyk0kn7cknkp6mzfhx2q4739znvvqim2yhody1gfcaji2pd24jaacpem5ovbhzjhhsvq3tqtg9wmaj5zpjxoyskjizvs1sluh7x0hvvp5yi43xqa8',
                flowInterfaceNamespace: 'll9c9ikfzeynxatgsoe63p5hruy0hjl6wbl7v57qgx5qhcymgra9s4nap594pa9kb2yk7wxsp6rpmxssldtpoiidtcwozdyjr6tlxxm3j0892a1plnoga7bdk6k8otj5o5gud0kjfnnedjtd35bmev3rq6y2fb0r',
                parameterGroup: 'yfvi6ncgf1qyvcfipcs8meafvs8cm0fwdmii86obpgxneij6wrkeqagfj9l6gpxghfb1uhm9b61l6xweugbi5xy3qh2bu47g2tpykty8aayajacywm8bzbl820bkh6kh6gks6c5hsvmmwqw3svgubdpy9ji24s5yh1xaqwckqehvde8zioqbrpqujwassfbaz7h64fki1mr57u3sjute3uq9q9f7egp2q4hkjb45ejvvnprr5xk3rlabkf0t7zc',
                name: 'zzzsvjc637f67kb4lgwhclhbp1i6shsitzcq48vaoxtgpz1qvugt376uhtbuc64u81ulmaaklpayzfq3ft7pdur83abidjrdbdbx5mzrp81sr4j2t5t0j7zniqi9l4m1df8clzuz7szxxr5zd4elqzadf5g8zeahkk2hmhgwlf8kjd9hgiapdsusld1ek03ytbpv8nf65onvb5hbagnjdtenv3zjuiurx00p4uxpyltcyh5amrgqeqj91gw3a2l37sv159vk6k6gloq4s0xqjomlqd8yaudtq9jgt55zx6ur2mzx9leyi8gfbm6rzf2i',
                parameterName: 'mu3szj4rybd8almjw14vofol927u7x1ooibiq62opov2733rgpcqj5l5k4yxti7bv9hurs3rpin3qesyi2a4quu89ag8cjh1qjn1ugct7qanx4a3s0rotzblqz0r9unol4rp0d006sxiynv35mwkvi0k10rqiinqou506v8csbqm8qlb1x7r0aarsqttlo65fvunv8zjbopashqob0vsv41rpp02jgw353o4188brdukryox2e73vqm38f2bp9req2y0g4nw9hpnag2fzbf0tbb91m32uwj9tywnu2qr5nqiucjr27vpnrwcrjp9cjng',
                parameterValue: 'fcqnxuz45f4a25x2pa8vnj3pgkvmcqs3srrs05wdrjx4nla3xwps5pn4i1xavj2bpay4e7k4kkksf615dec1aawmcr6arbkjo3bwmby6lmpwzemxqmxa6mc9xge18ibjpjqswdv4bgpxav0u678bftei61oz46r9hz2nf5bpzhpwcii5oe59bo911554rwgwcmfrut3mlwio88u7gmscwvkf0zgsyxfn08yhqzqlv2skkw96zow3r2dpz37fqsncfo6925144xoeivdpa216ltwmm1p4se2g8au6qn78xqpkaiusimtzk6xfoknz1crz9ib107wa76b3bc0cyxv352ujumeu7cpps8yzgbm1o9jtj3cqv93drfnt2o0wsa7qa5sygxu46vjptojtr3r8oo6i5as99qqtj7trhvxjv7mr8p4k59o8q3k77bothe0pus3f1xmvsrz2z4t29njtr6478f0twszt2zkedn09ut84f9grc2iymmz3jncq8f005owyofak7eo186xrud16ts7yiiceqj2gdm8s48u3qah9xppmq4oh06elpct4vcjoy626qguzvn0n8nr5ejyc72miffi5zeh6i2kfcl610iwczg5mqqp9ct34t1fsfohoym01rb1gtj9y7w4jetef6f4bvl59mhl036lh5cqcylldy7chu2uyxpklkbcy58qqn6bmbs7a2cjecholslkp0j8cvoo00p8oh3525hee618x5wzrryp91ikpewp5mrvbsn40h959sl16sp8uxkkyd17wf0ruidnzede2dwxih68n2dychysfpzibuxrm5oip9o155t1uqvrq369frikthbluvn2zi9sf8fk9o3ozxffwa9muuq512nt0648cz3aknjg0u6t5oj2zm3hq61gvoqu0vuifs6cvls3ett415ezzkqpniqo1a8zbkntdbcv6wacnc0vil9vj6ni7cyfbf88u3hrzxv4mt5l3m2e140xwiz233og160ndd6lvhlrz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'dfsb5sdwjo99empup9mn',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: '8jmmsrqmrhrb0awa957nogdwsqd8hk8c1we130orj4b7k158pup70llkzaz6ib78mnetpqken3q4gxn0xx6b3c6zjz1yvpo54ksu64rq0532fqgnmq2g3zbaz7uq1af7eb4dlfpvwzfj0nmruel4fou3xrcpmsp5',
                channelComponent: null,
                channelName: '0apyo6fsx95blsn5bbpmttswf7v6js6s2qe02novtrjzmqbovlr7483chrose08cvnpd6ozyjt7na23eimmx812bdi3u8n0nk29b960xwo9rkkp4nrxwlhg0m0emuros25543klybo60ulj5z12tsncvkclauo05',
                flowParty: 'td9b98wlkxtmty5l1rfiewe8xyzm4cpoxrk5ammhulhp531hkn79f1k53yglixukwhy7s8le2r71no7fputkj4a65r35c237egl3us1kfaj3pkqxpqenvij7wcvkbx3dpivgavj0btzrnqb4rxpaz2xqvoy52g7o',
                flowComponent: 'et8jg8jnuiv0trrqpofdgcgxypalv8ux3a9brcexjdnzawscj7654snke1xrsougdlp6c25zavvjceqjquiauai9lzet8bprsybboxk7f2bg7kt5b98gn7l6a2woeskitqzk851qdpn31cciyc1akvhomd4nb17c',
                flowInterfaceName: 'keyjkhpbkuwr1zadv8up3i2da0llywb2bz862aeq5u5jbuftxq2b5zqj375tcjptzx0gibdxixw09zkeppngs2fesstj6q91ezy4i7wpznzbu97zywbaj8e762ic9dbm3vp8n40g22ps8eefzpniljgaxqnz946c',
                flowInterfaceNamespace: 'z8n9q80s84ngxvuji28q7ho7ql1j5znh4iupuij4n7c4eg3xj1l203eaghndokg8rg9q18gqggcatwy4paepipva2h0z223ileju2ejqrysshr0em39z6docg5877o20tjvt4lxhx1z6ohduv7csihxsy79hd89t',
                parameterGroup: '1z1r0ynxpy3z63ymydvqtdg0t6nngrpgza43b14u3jwrygecsvqpch7mzokjpzeqnle54duwydlr03ugjwc6j2rrr3dxjmwv0qq23rprew1klahus2u9wht8yy67b1rr93jixkifkz3887ewns59c1ipxmmwric9c4qvxikm2i5viye2v177018djie1anpweazjj2r6u25z0irnrrjbddohdf8ew0sb3w1yw30yghkvagbb4gvzv51r35eteyz',
                name: 'yvb1b3y0d9pa5ztuwi9opp0oflr4zv200x0s5cfzkrkkhh5sm0p2bne8fjxpyah9lxsjvmjs7upf4od3wca87wafj4n0kty9dv2da4lxzfa8wttata2inrtbm01n5cshbnxpuyamzacqlxtlqvvhzfwr01sdve97vztd1mj4wp51nty6x7s5ycywjprnlei0bxu8njph7rzeqenc095azd99ck9222za9jmea9uyrz9o5pgoak04vu56pebhmtfqklwarwtnfds0rqo74cjjfzcjkhuhtagasjhgv8a3lp19pxm0ogoc86xxcc4u8shs',
                parameterName: 'n5ipwlsjwu9himmswcam0vld0amvchuu4kh68xqiyklj63os7bia57g5lh38wyfcgwlv3kgjbokdkqjurz8wrlrjfiihzp6hqjddvwmopblh1av8ul25gak68c4c1z6esz79e0ss6dtvx0ohsno145ujonqxnyfkv9a3o834dctd1it3gvqaatof4b4ra08d9p8uqmhd4gbmrkdjuv3750cv34dysmlx083tfwrrujwka4f77pag7iadvce4x8ugjpap2wpljgdmzc7xzjewktxh7cw3gdfdempw5ksrdq9kj5zf57stuu56mpt0nmsz',
                parameterValue: 'b2uh4q1e6oy9dwj66b20d1b04p1fwkp5xeojh0rc69yaj31s42x5xa2s8wl602ddaao1uyymm2ys6br6ts6xm6zu0m3to6dchy5ksyea7mmmgvaj5ib5l9rlj4zvgi7pbkmn7dokwtznwhfl74ub8jfe9isa70anqrpl0wulgnt6mdzlxyxfl7qltg9iicp38lzdrg3it786q798qx7phrlh3tbw25gt6t6nc7sjzmungvficym7ls8dttcn6r5j3cpgjhonsviup776y6wdt8hhop8ch7bzhkifhvh7buxch57zg3a9xvz3s8d8mhk2j8c08xkkb5h4nq7r1yr8vpehagegffy69chqw299gchznr75vjtoyq1jloxabk57nvs4eyl2izr5rsn81sdnvva1yj4ktrbytnpii71su2361li9r95fr6nelmx6v5fuzxblp2iffto2q3fgrnm1th9lbrayube4vkdtj23zzudr5oh0dvubxwvoz9w1rdjh8qlycfsdwyswujh2r2jy8fj8v04r1zmpogfwff59ma066dssgkuvgnc23gredecvjvq23qbcyapjrjug9ncnmgy4uog6l3n7utjrd0ncg2wlwl19r327dr34ww9dlb2r5mmd4j2twtsilj79oashgf3tlxbbt72r4ykajmhea0t2i0d35uj5nj7v88y1n67o3bmxuvz470ghg0xgyxxczmpxr5k2vquqcya7xcd207uchl7vclknglj3rw9m45ug6gf56a7f0gr0pd2fj4z9219kubf1hkdsu66ze0tbbq1vk1bq6chm0f8utnikhysazgkpv6w651ugnpq3xauj8x8uyutdwk4d4ve2e7hpkpwk709eqj1vr0ctm48ej356bqgaqgn1q13vczxwr1a9j0rg7ljj0rrlzmths04khr3chfly0fvlrwqmlsom683arbmhn916fzkglyybx3r2wd03yxmjytcc38fxtxvjkkdfywgl9ufkywhwszm18raa',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'g1qyxffxlhvqf7cn3bb1',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: '2v5bfofvjsw4v4r0vpa7xgplxvkigc2lzb8xa3kzygqv1mg1bl3xij5mkzi2cm1aacyqdj68jrm250xgznk7q21bxmfjwcw6af68mnhmk5vtdrlx7y1w4mhzmdpcg30aaqgt3cal3sfnuo7kfecxao86p6sxl5me',
                
                channelName: 'd3hi6tycoxxv3f9mpow1u96zugnrq0oycr9k53gdw3dds5pe33bd3gbh1p7hcdwnm75xdtr0tx4xjox48tnj4vhrd7s916cvq6i8lfzvt1cpit3y22cia1nya16s5l18146c2wv6n8ub1h9f1vdokjrttndg4qou',
                flowParty: 'm58n9273j7l60awcpxzyk1uog5ijt8rflvc3cublppys8kn3pp7qzgjro6sftnjobyj63r0jbs3k0quumxmh1wm94q3241kjzauhw7w1km9qx13lugot2tk4kfitgibmjk9hh1mw7awbusjbm37x77bs2nr1gvoi',
                flowComponent: '4903jwpjjzjx6gk0ba6zteaer96na2aelm5iwh03m0i2hsnw4l1p6nux87c1fq9uyp0id9iui07numpmmkizmuvicor76hpw0k8c4w56rni6pp0lxasc324urrtn0bg0kv50g4typq6bvnj92mwwxnh3qb3nvk8t',
                flowInterfaceName: 'g6yp8jbl20ftjvv0m60dqoc4phjj38rv5dr5b48317wt6qocfa17h88a36buv6phgsctkxnz67xbcnvk0zg6nefnvqkub06w3crgpmfgi2mixqdjyi3x2kzh9k7d5dfn9aqb8ttsg1i9j6ar6h29il9jvvkt6ndl',
                flowInterfaceNamespace: '4x9re79f6gj25hdlu9kl4isuz863cr6b56w8hgbr3jq1o9vb2bgubbi6t32h6m39mj9crzfvm7k6zs53qti4us8c6sn3kx5tnwremn0yioqtvwgl5cp0uysbxuzypbghqx3qfcjapfzeaqxpshe7ccxla1uvs4fo',
                parameterGroup: 'jc0vgd41hz6707n88wxj9m4t9q3qz79vqz316oum0ihgojazjpjhfe24vfn2cpbnvo2wsab8dcgx1tsj4qci6iwefs5nqqqqj4f2xec0gu5rhuscxvdr52izuxcevaz181fw6rzu3mdafyp2i1iveo08sluuc4vl60wx1oerpfa1aznttd6nytgcdwpw4qkp4iwy6xkbvbbo028lvz726mx3slr4x387vrlkdt5bh1cww6rxodpkieku13v34e9',
                name: 'chv9bsdffvnocod9vue0t0k2883u9iwvxj3mgqig1k6rel7s7d8zwon3lzl868mzakn2b6yqhog9e5jx3mu81jttd8v17bc0nyz48baq5p69trtx9wd9hn7gslm0alnabfcrr1dzstb4uu3xppxhdo496w7phazmmxz5uh2wed231k4vw4ipsuoske3fi4han2z1zwftxs6cl1jba69opw4jzpfeclj81lkdeyhxb8m5cojhmj4fb6jcg5v7o63o11ztnklqlfo30vouwv4v9362a14jggw7g1h4clq1emto3h2hecuyt3temp7turhn',
                parameterName: 'f2acsq7u9odq10xtyof1m1cc7s8suiyiq3kw48e620pbb9ihhgh2rw9530g6myyus39lbegkcxy5c7gzvsrfjq4w96kjhtxjez45e90ig4hbcsyrdmzan5polemoini0ouwp6tsma95yrzul98paamb4f6u04ui9ajffra0bgw4xdnhbhfn825nrfcwo56d460raljt1f1tj8r6ihayx3lkvdp2srpf75jzqfrric82uzct8wgko0in8lyhsenb0tyoffv5u9b6uf4b5jc57jr412veb39wa4fuonlft90kqawm3er3h9y06og21e5rg',
                parameterValue: 't18sh8yvrxk5p7uvel8tyt2omqpq9hkzqy8uichubklilvgsuwik2wx40wswfhcwic8a1g92hswr8qq33tpunt8hsegcaba94a0yqapcmarm02lfcayeby20o0sutbhoza53cxi4skkd41qw2klf7m3iujt40ojeguyhxzurfljlvf6g2jp071hbrelahc5djy01o81wyk9g9qp5d70hc2dftspgipkp91tuhg4u7pyhfv6b2n08gnrqvot6a8mxrfbcm0jvllc58ud1muhjnh6a1r5wvz04xrk1jrjbliqbw0rzxmtsa9vms5219yacd2qel5wsszfz2ntmaxwm27blch3izkfq5xw62ey89gcuopbi2iwexd96mzq80fop62t9f3feacxh6u4fesaxd7iemobpye2k7kj50vhuix2nzf9j3gyzi1dli45kggpyi621k4ryor1e761xaskea08cbv4353n03h2nzvj7tuo30ov11zxa04wdug8st6pqtny69fvs76pejjugaafex970fyo38u1ylt8sd5vd84e7dckgzoqzl9v9qm7gr5k89dipboe65qurprlvgww7vl8iragsdztg7u00ww4kor7h265ggz5a4vqnwokpbtuvn5sk1gcvghpv6ngq5vppxfi96nbmqivk8nfywt103bl5r4ma9p1i5kbzqyt6bf11ze27pycrohkz346v5qbkt026w1zpgvl14k337utahs9ccno8uav9z2d4zfoqc88huxddfuoldcr6t8n6ygv5zi6dmgvzmlxftwy7qk1v1m4igzd5a2nup6y76pthrsd4f6yu8gipqapnpvb1qm75s9kglcz3s4b4t3lxvc4rqvt666dnkvdx57zjxrv62yqpox15uy9p9x9np369ybehkgz3c26j328fdqch5cryxpulyg17cbfx82qp1xk3phpf1ii0k3g7jsrv35gv0grngdoh3g2lr9fn5prurv9s20cz9jspg25abd6paaip12or',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'hfqxj0izxg6daa7p8fu3',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: '1oglristrqcvbjx4vc4ed026jo6yuwe33ljcg1yw82r5s2d0985th05whpgu9nu5utv3h3ucui9w0cmr4d75kegbhu4dk6hq0cncfhysoamk3e52ewymfnyuzmx8kb65ddyazvwwfn471v0uhbr0c5fq3xdlvazt',
                channelComponent: '5z4m25ypyif7v609sns672t50oky4fji69f1ipc00b06puddd3whu8jhrnj9hen8dxgcrl4q65glhv0hitdq3fm26xyu6g3gar047xvrgtgvo0879fo6qd7pritw7o7fx4w8byq81gmxa5f1mkwpaqblevsfsoia',
                channelName: null,
                flowParty: '8eq3ujkw8j3lajmwbbtwx1qqdv0nvwnqwv7axne8deq6vuucuyp70dp1mzrms37srsw5li0oqzvw5lcky7fax7x5ekrehpwy5ytw5w5wwz90qg491dcbmrq8wti8ubjtblea8bw9oe4g4ywgfjyluehzlh0thvj2',
                flowComponent: '6vx750xnjf7djzwlrjvlzz7ubwvz9xs73vcj89usr6euv8hd4gquo62feekvii48674t6putw4ra90n6j79axvfwb1r4g0fbsj835jx8wts773jnl5o21y9jnnro103gl3v9k5gfhfkx6dyki0fe8ybv1d5lbd8p',
                flowInterfaceName: 'z5nesfuhb8j6617obqo697kzutufvwl8ryunmdhnb2xjgeug5yc80oh5j6ofbsbkdedkh8gpjgu2eyq4cfl8mfqo3r6uo5mqg2uadssbujjs3axp99g1pslso05pgypq49tw7x7ugtb65nn7sa77zh6rkr3ecie5',
                flowInterfaceNamespace: 'fy8eocshw9r9gmn14uz0m7itvyfyfu11a1mvl43mp5hqpzo7jiv3ck00f3pvplddruyqkgatukvdolzkim4fizxtceju1g5k05artqctp0tuu8ymok7thw589yd5zyffao9utg04nqp0ubrecg9wqtiqywduuy1t',
                parameterGroup: '2lf7o6stsibgoijzvr3jc3io2fw9ssv1wshnw7vwnsyr3brk8oqjmgyjw3ngzwbsjsxfmin4n70gbi6nn6gn598k77hfzoyytntoqwimxemaiussqtbcg179kl3lzt83ttkpn2p37npdxswv336zv7kve1qxftjdl29hal7m8fpz5a9d8v1mbviycmlonfin4wndjr7pbqcjb6xv1gbskmmljsbsvy616nr5x7v5iy2pp6kf9a13rzu85icy5vd',
                name: 'mdjld7wve3q7qawllw6pmet2fxb5kd8zikb7s9ipvr8n3kabtigpvrlddhfmphaie6tiob99qkcl4s26tw0f8c5qi1sim1liokmcontl5lz19z7qqd8hti1hs5j7qha44an5cqa2qw2xlqa0maf4cq8ebia6cr4h1y2pw8kp24jbbx1ervjwoqi5r4geo0830ujwhddhwm7uhmslovrd29887dfm40ja58u1rvbx7idm06lel2z924zoggkkq9p8rgmiupo2039cyor73k16d5fxc2oc0maju49pp8f6ni6u6fi4g8tgrbm3gfaqh4n5',
                parameterName: 'aew4rge5cti56uvr7sofb85dsua55luksumgpu9kzcy2vembpm3g9o7awrrl6jdnixzk8z2dfj1u65lhbq2vqhy9enm56aewb41i42otd3eo6x2s86a4y7g4pmbbilzze7flif2nw3azp67nitafxjars4yltbhrn5gxkbqikpnsssppegybnn6lpn6k3ow7oy4uzcy9xw5rhjy46i0jsjqsq5yc12ag2por2kxd1k5gne10ehnuzowtouhyy2ou3xs4734zykhz8ep365rhfxnolw461qayq0xx1urz1qhg0qfhqwpvbygv7q20dlhb',
                parameterValue: 'aombnruuucb1gs1fsf2gnbe00jnbajfa089cwyxqzk2sf3jd4xni6oi0grvv541b2ndce83vbfad9s10l2hide9fxsbgw54xnvf8ng445j8130a5863w646fznoh6vm22b7lnlge3gl8tpcyw1m1dcoxjsz60khsd4ppomroz0lmzq5hen1w3ayzomemzk951f87en1qgzacp76l5o38u88ovcajfrd7aucyi2ikjb63af9qnx9ybevm64knhv1aedic9h58evuk2t62463nos5lfrwq1gxnz3ozkyssslzawtrkyav4gzylx190ycuhitlmph61npxp0lfiuq1y8ngfidn902bz69u1epv7qvfv2jia4if2m2f8h8jnnrze50001qvv8a8jns80nr6ps336njfwus3duco1k2ty0p05rlxf32ecr4ka182805gn5opo4bp2lhxm9oa2m1r6a327i2mzjcszxqgzbh6tcf3iwyyveti1b1ds8qhvxjnkgrz79v7btrjtz23ea7m00qrl1hdrz99ukjahrg7tz8ukj5x0pw55sfzouxgyzwdawgs4qzodc9ai8c1yp5aol6505mcb2torfvm63vjv4rmybi7a48iprb01a6lykrl8szzqjkw1zvz1hqkqzs00gla9yvw6jsmm46x08sd1ytjy8mwmty70zsfyn3hocpchq3w3t9z6zimam4ximj87k6qp0x4x2nn5579t2isp1vox2a0e96cb9ahvpksqdmpir0myq3d8816r8wd6seaoycf86boqu6uev8eqlsx8oehplbxtkmvzdm7x3i0fy4f6ff948vb4htm9s0eduv23efd63krwn95qjqf3tefhoti7y3cuh5mftmo040s6o3jpirqwlcsflv45dnjsjqjkkkcm6dp9vnzjo0s5ydypbg7a0g7tqmugmlm4kzyi7389oemxhu8x8to242bhakd16hy3f7lzebkhay81pq50eovex28pu6o36mg70nbjmawv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'g4u1uvbc9v22on82zoie',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'zfxdcfa9yv7c8u87vj533y8m8o96ya04ml2eu33cwwqs73j11g0uloa3pfk0ej46f8qfdjmv7dnz0y79v8qeqlvjrn5kefbnbs7zrf4lpl62ultmorazjrrvd04t8hl2ew25byp7ljg74tgapnzdc08tekrxscve',
                channelComponent: '7bhs527fc1wy7ctql4wkwniuuhgkx894uon0gka0ohfrmxbkssvjfhssc72pzw53nybuumclgpmpcoukgc1nw4qopwfnnb05ad4gvrwum5vjfhg52rirh4nsui3ubojpp0xaggm0r5qmwi7tnrlt4wgd7ihnuo8x',
                
                flowParty: 'peo72e4m5lrolmsj06wuztr156jc3koa39qmpqksj9rxmeljkhl2tq2fzm7z03j8auid35d936ol2m1ple4wi6i8wtvlfaciq5sitxus5veq3uf6h4l5fnt1c131tb1babadkeu4yr83u7f12yfadlrt5l8xxeu4',
                flowComponent: 'dmezg3t5dup7x8dygrm8m8qeeye50usrayu53fzfvw8yhkyl2okg8gwk3pi27vuivq52q5tpt86ojg4yzi4aust6257zdvzneihsy9xvg0aw62h4k3ktg5xhmotuwuko034bwh96fv2x8n4abhyw3ffdkrjdgymj',
                flowInterfaceName: '2ut8ysb7v2j9oa0vu5so7cwjk9zmipr5wid7mpxv7g12jkn2o7htx95mai4ta1do534h8502ggsl0g2x70ung3ai3zlldckuocj5qts2yxj02a6jztfohmp9r87gak0ptdbh1fvmaixbncagvt5ywajd12t7ylw8',
                flowInterfaceNamespace: '7ximamz7jom6gawkwhd9zt551wnkcjokl0hkou4484nwtc8084tzcwy6lusft848wf1dvksmlhxaluqpqp2oxyfzu2geirbb09c0bjurbze8498ray3hvcw8rae15f24l155e72jlswtyy3rdljlxkubn5dltgst',
                parameterGroup: 'n068ftj2yy8758q8k5bwodwitxngcyx3zajs8kbe4qkdz3vpw9i3rv43l3vvmox401l7gq760gunocuqn5r3bjbaab7hig4ffozov6nkarstvbxwhrvrr7aikhvl0yqyzkx3ivx1297xle6s4n22xzofcuonr0pmn0wfpen792rf6eghu1plhq4pvg9nrbp9e1ayws5bg07fw4kgq1dppxmilw8jebz20qwjqfiy2qzvpev8e26u26c9jcxckkr',
                name: 'n5zdgxhr4x7x9dn81h9vwweryyygqk7pi4f3n32hc6mzbyfj5pqeohbbk6gq8c9jv0hg46vqm703pwqkzy98gkhjbc3ayje4s693of7illcwepwtyxwcl9pb49t41bua1mll2xpv4qf06dhwtfn1r4bmgyifl8g9wu0o0j3e1cgayzu76ubdk6l2mxgapx2o1quk0sdzwgcypii55bvk16hej3gfkj2f3ud1mrkogs8i5daja19jnwg9g0duvvcjio767nshc5e85letot009uqf218uucy6px72db39hfumi84lq1cq0dm6rgoe7o4k',
                parameterName: '5ohlugogrnk0nskq965uepg82oe4j6ohg7hvlunmipjs99dlneem0ru1ti75bjh6am0jexhgpep1dk33koiiv2e23icvpksqwhfknz57epxrv6lgzz60o2msvsk4pv9hyznutoiv7r1d1g0emtk3h66xdqhm0ruqxv605zrma0mp13h06fxydjo9w5p0nmq7vy7ncw4c70xa5j59bgz5fc3r9rooym491loitm9c7t63hwl61x26npcrzpgar65b23pywu3ukab8cqno29pol9jkxb4np4ztlpavc6zeivkwq7b0woa2ajg3cvf0p7rq',
                parameterValue: 'vnx4rzm2pze6arv8r2ph8jvphh2n42ec9zy4dm42q89tykpis9e6tufxaq7fitqefyus3nn6ns95d5hhk5t6j3vl3pzt8up6dae3q3852l0fck62js1ucm5wmcdzdtzezzcybtgt02nlg4qjj07jqhdppb3uxgrozxb50lrtkvttjjykfm4dsthugzzy2txiyi5l50x43ynck4bdnmucb6pac22nt9uam1woby91rk30iqzli867iosy1f98ppucnh8rh8z2lnpv2lr0iizulknggs10cmsfumml9x646hy9i3i5ypgqbwh28ndygblf3swxssb5tbqerxc3y9ppfpzfpxfbfklr8804hkbfsxjygfit82pszewvfndholh9lwb4cp4djy2xaxxuyqa5unvkwj7ikmkku99sqcvljc4zl89k4vzm8jz8mt2b344kso9yy82rgqbgepydjj2qe3pvbbv0sy7ee37d6mo27rrtge48ouju6x15zrtzauk19wz32bwlm28hm5qcyvn309rqtu8ffdh1skk6j1vlan0zhq1en52hbtedbtrrac877lch6zuor23hn60ilcweo0yx844dm782w2rxgaw3kri8fhi5cvj2ql5jxyuetlgs6mzd0lx1hteijdooxbicj2f0t22r0oxe524mgsc7mhmn2zg6bbhylz88wykw5f8ucwea9g27c869xcu6c4ffgb7uabx14tv953kccxyy5himmyyl1tj1sn08uc2nkciibygf3xb9xa5czh4ysmo2p3f03u8gvim22v3mp3rxtdh9hy8r8bcusdq1fs11b0eatk1raegpphe5h7pt8r52jxn4dqseni7yj2m7p30wy9nnpdautb8ygkyh5lcpw826wumlws53daugdnft7hx7t3the9w7bzftgtpw7qfk3zujy5ljbaciib6gemsgi8ohoooqou5ihgjtoe1fsvg6f0va66olr3hva7lrrteichbvmi3q2dpvlgswd7br2e1o',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: '8pugrj34hjorn26m52wm',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'qbyffz2rd29pchlzu118z9kpvgtf8zw7fdbncphlbx0bqxiart448xxhs1f89lsb8j2bwaoss696y6kojrwpg1vqz1hzd3n1ip2b6w5bl6ccnkpeabgsz7gtcrkh13e7iasshfkpldseiudszfjpi15a8lc14987',
                channelComponent: 'r55ttl32jf14lmjfll1mb71uum61ysts8zt7rfd6lp6v8ml15dli0oduur6pam7wkq0lngozh5cr2iz56higtinclavi7spr784qpn343tvjd7cmjjogbmx7j9m4fjrf49pezledbzwy9fv3ofdtod5ng85o2gu8',
                channelName: 'b2rxtze7sk8tqkosm6bnq2q13xx3idbknir0u9v97pima9iqut1u6leki9i8ic410pguvwlwk3iatc8qsiiglmrkwrsy53aqic41y6y7a07ah2l39ay5gm52iyt5ezpdkhqhu0x0ro2soadlc6gj7pm89zfnj1lc',
                flowParty: '69gt1q5wu10izj51xltlbbqe6nuilrmi5k909m2edfkmvse8mm7klx37bmksckrwu3c0tpxakxf4gm6ie8c63d6of0gwrhu6sxkwg9cki0r90tgqbcuhlwqlnoz4hwq2zwalk3xviw3kacex2o36lzvvvu857ffu',
                flowComponent: null,
                flowInterfaceName: 'ttiggo3j59b2h34m493t51oiqnx5xx0jzxxyh448c0rn5szcmhzrc5civgpdzwx96um0qmoxc8jqn3sym5o2llz6iilqg731m2e70ucnqnvjuyzr9f7p37v99ir25c34x4tlnia0n6frs777hcqf3um9qzbc0n22',
                flowInterfaceNamespace: '5812gol9tphc6kk8y2z827dl9bv2oatd76q13bs06wuys0gd6swjgiyf5q2v6fogrwklxcs1i4jq3cqugptnq1drw9911x2k2kh1ugvk92ltzvbl6yzk93krvh37itxoytgpa6eyvfoz2lozfsb736z2qjcjy78m',
                parameterGroup: 'w1bwfln5ksvrwvs7l4d1duth9k6p5qdod7pjh1gbn7pu1v5myey50qxc6g1rcxmpbgcud08lrcaw1lqzjhb1zq0xsg0dk7wkui6jwpu9jefb5c2v9yoarq7vvit1c4wmcautjqs38v681mtevetho96x2yvsioqlk4ur2r5bk8n4nkrf3bd4d3q719hpqk1qf44hbssnzr8ubfir9uffir4ei07i4domye4e7vn2r7srdfvtqs638ltu6ppvsi8',
                name: '1w3s9nncf7nlbyc9hzwi27lnh3yjmneiknbltfvxz3dd8nrg1vd410jkmo7ouhbi1xqcavknoniauvbfrywafyrbe7y0fekap40v4ffjpxh1mbawmgxj3n18ylvkjcp6t6xygs31xkc3lmb1aa8dv3xnujypqwy92p22m3wu0z4hqsckow7kbuwxn07hk2h71o3zt6ndof2zl4gqduzopznbxp4tbdop0ate3duievnke62acj9v821zvcyu6nzqp2skl96yzbiwfyonjycxfd0bgpbmgu96mm4gdzvmtmg55r8yavdze247y0p50cxa',
                parameterName: 'a5i5gtqavqlprxt81kntpgukx8yy77wnalw1jkf2ag8wlfrh3ns1uza3hssacwcj6jfm5k8tn4q7jesi952lu7yco57azuz31yrbajxmcpe587q2rm49rjsrkqwmpwjvmhr47gd6oxyzcrp0jw575rmf7jo9zkwnqc13e3ww9nezi0y9jl8sw4xsshequscmiyu3gdf7luyeedxh4fgqf5fswsctunjteq7yb8uksc8981vdv7x5pebqd1fw3cudki5yzd0fwl7cy9s4afyaool613jbl5xh38tx8xfhfbbjz1vjqr6igz118m3ktsa8',
                parameterValue: 'lmetwi80wymzsrbvkmt5xhq81wmeag4qxildebcx58qfi7f95bqrpm2naa49hfl3yedk5vyxllfyxh7wo84p4k42tdam05z0sfiau3eju8hh1aki33edd67366tqoml2kpxd8k5fxczurcpjecxhw19kv56cwnzfanzt2rz3wsj69eunrt5w2yb3v0jsfvlsc9n3us1eb37ikthdujdp9mxz6dcpz4swfamc7nnzuo5ygmgkypea6z65wg9ikfpi7tmiewl8358ut8z8cvr75l9gp0dcx09xn0v64fclzpcw9p0vr5129dmenu2k2u6t53p2jij8f5dpympponxbjkv6gr957pfckmalm6t0kq6mln4rd6fu0r917eoe2uyhuxocqpzb067e4u8adu62id0tl960g14mn1nggw0735f4rb9q1058jailm3c7kwg0fssftnweqhpxlod3qenrqaz3cdpb5b7jjo2lemp5ps9lvwrcgxpsr8lrqyf3kehn3o2mw4qcdrvc0n82grdjya1r3knl1t8dem8nr59v871u1b18p46cmpj7qpvz1w12b7gqwbhe8l093v63yaqqg12hocd9u0q3xcrxfaxto27911j07srevw2si5a5w5824dhlxft6gsxc0s6atfkq13elzws2u0ttc77up7p6kurl36m2lxsaz8enx7llod10m0hh5pep6wu0ywuxqeehhmyiiog3nc52phx3tsne9az4l3qapa6kjho4bxof3kz0p16w2vlfrr5nzajloo21omziub528372d1hp9m6gqthzsilwfbnzg5weptxyimx5gzto73vfr176ptebatc4r3o7h3g4ax7505tm9aa8fm88i7et4lljfh8eeg7apccg4zxj0gbuws77sxvokuo6xfdyxottg8r4bt8u5j4hcaktczvpxr1cso6ad4e7dimnwuwt3atlrp3z8v1jci202v65f6en8z5aufbqhub0qinxsbviyf0q8o229sqymqka',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'jtxmblep6v39qr9i2jqo',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'x86kwsvdvcqdr5tj1doob5vwap9oc0fg3s56k94leecox3mxym5t26yr8vipa4ocu2ue6u8tix33y0o3kw7vvf3xsp69k4cbuzzgkpv6npb9e5mibf5ufuascw6pmmqko6asivjqnics4zwvbdd3u0bb7subn8rq',
                channelComponent: 'kl309s71cpd18mhx8wxtfrcughd0pqth62pbqufcc70sqxzdv8klf914ty13p7025spuc3yuq3a1kf30vlatswbel7y6g6lmquyu46klt36s3z1mzq9x0bn61pda272ljb2bwvuge3vxri6ox1lm8lniecyweo14',
                channelName: '5wzlo777jsp0pij92ph3s5eye7ohhcwqe9yseli9elb81ng6bl1bnvicqsdtr5w5j2mzo6krcx3hnn7rpfzlag8r4po7wuv0lr8ebk0qmp5ma57ojf40z4myhl1vkxfw5jtppvf9oo8hji26v8wbczrtpa37ba89',
                flowParty: 'phh31a4265y9uvu9l4q9m82iztxdr1rfeoy68d59mvj28tkfb26sh2piieqz6spdnkjh93rm6r2yhqyp6tnjmf0uhc3lg48yay8eu84cez3aw97vn4amb9cvkwoa1sjfxw63b0uq975xr490yi42ip474j3y7so5',
                
                flowInterfaceName: 'bsio2z8q9mjykgrc5mans0gk5xhwxa60avggybmvqhs81ha89copkkgnmeadgl1fdzj90p1al630fnjmsxs4ay2wywjt7hfb95h6y6jkjz9raaoaw543ztddv1as9rluc22fepo4u7vd3igu5bjglda2obiv1d45',
                flowInterfaceNamespace: 'q8qfq2nqe0dpsxmcm9dijy6ug64zeobbvyn2iwqlupndzzhlj79wedl2upooskcjtsp05q3h5b5iaxrslewcd2ggjnq4dtqdaiwc4xigpefgj5e6vf5eoxayw3iryb66q9gogu90e1yj2z0mk9848q619sqnkptb',
                parameterGroup: '73ns695ixtse8gmq8xt3jkfpgfgmoxrq7uqv5g2g4bse5tt3olkwlrk0l2u0txvlzv3yhdsotqqilq3rwaia7tzwxfhtka9151swerto076a6xcd67nbtqvg6v5v01343wa3cw98rfqd9fmfhk52llosttg33ff4qe2r8rzwr05cftjgf5nz7gnqyk58ufndfqcgax6y8jp78b3auwvb5u0xsprci7cnxhv3bsjor8oi75n3f5neulgjslipn1d',
                name: 'ql16ztzwwilhnlj10iatzbt7zj7ssbdwto4ewdin2cbbif0nnx7efll5qox98hddoeisvouhfhhrbv0xt23211mzxwcwele7pwsycmdd9i5in2kj20a7y012c2vq0mhl5whstfckp8uhv1496o7yfl9pcfko7y4qihfivmrncnx7moubsl726yw9ytnxg84msgps3kwx43lel8dw53v21e27mpjoy5vy3m1i5xs99hdi0jg04rljiglb0h4t4socujqdcc84qqr82oz54ftgda6os31iu4rah6qsaihotspuzqb4ngm3jybc0nr7c8q3',
                parameterName: 'qf287s7vyjkbj54ig6v9hzl74hy1n31s67q4qdauso044bhwqq362typ28inzmoi4mj4tw20u8kudv8nj3qvfa6ukjroz8kit4pi6zkcr7tz8rmyk6djvdfbsmnuukqk1t1ej7iik3guqudz3r04nktxsk6pjcl7kd7493yok2a6gyu09kmc4i5afl4o1pvrhje708ytoqy3x0g0ulevex9ga4datjk724ul57pujedm7yt1oae0wyqzbv1nl3l9xj8100p83i0b3fdmrg5clqku0uxo0bvwgyk9wh96egrfg7y44dfifr5urhh5j6ea',
                parameterValue: 'fskhn50h00wf1q82326xahwdavx6yvbxo7t9crdoqsbng8u2xafoxnvnifp9u4xb432ej2dn9msd4g0o0crdnxntkh3m2mh9lkjvhmhjb9kl6wjla5xijqysdma04tou0sdmm54idc4d630gvpap4lgvy8odobi0ghw2jg8qtpblqnzgraxrhy6ycdqsxpjw82yyidxv9cmqv680qsthoeq20agp45l42caxrsa5l7jc6evwnywpz3ocg46f62bca6rdngw5glc1e1648lhu9makb7hh8tef1wjv7g9axuzqs8x2s65mpibc3sjy6a5fc3gtnfba4salfzf855s5cjq9u3n5nez42b5ayo8ablejb2n1um5y8dlwefsb07zesz697geqw7caoplq2l5tms3q2hhhel2dwovgm1xwyzngv3c3gxvddbwugxav4wnrx4g1ek61pqxe82zttrel8g5knfvwitnkohzw8g7b0ngudu22lof4ovmo79xxmvr5awyu9upitf5xlphg654wrbawczi6j5vacqp9p1al8bv9omejyamku8bi8o0pij9wgb5wxbnn9wev9425ep1617ad73nzkz0r2gja2beiqgegxc9r4fp81ryhod2ngruo5apbasyqrxiib9p7ghymy37nsmsch6487480h2j1u5q1a6qkaiqvmfgeo90xjr0963n5i195kpxpegxlv5r6au401g8k1zglbo78xhaz53p5pkyol72jg2ejpfnj9n5xj3ijqswzw0xerhz0znzvekpq7hzr8jhmqy2kgiuujf8bwow0xjdj53b2550uib2xeesqhwz871ptk42xgymcp23fbrw12zcgx4xr4ic4f8t02fzx988p7cghfcfe1y0nxf2zyvez8arn8gw2l2shuzfnua75uxfojnbgx5h1mfnlqj9gr0uzviybdcumv6uwrbbxohd84o79s29uq73fussxty673g5jrqxfv2sxmi2pv63ep2io3a9vlc29dsuj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: '96gnr0x75aue4sddtp6s',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'p4u403xe7kmtnonwjs4xp2vzmwxhfdl8ef20nc63vqz5y13cxukqa4k6hnvrdj7ia5o3r5h36t6slsomo8ykf4rvpmnu86dhgtb8e97w5ysen724yahgaculxmzfhwhahldm52nrw6bpaw39z1pon0ktzpiqtuwu',
                channelComponent: '5nc34g0x4f0ev1g9mb42h255ph19cl9iki79egtwtlizotshdnj41mgzj0qwnzhcfk0gm4ed679ulte6u9c64r0z2i9t65v559pvyomgueqofkckh0dg2x24aopvpdfu7f4xdzfxu70fvowfscbh5wiwi1knzmr4',
                channelName: '29gzdy1g5fpou1x7pe7dbo7w3kvg41kay3tjsdp2d1r4ja6ka6va68xmvjca9bn0qndifi2fzrskelmjh4foncu2aimvm55g8lmp5m9h2gs0y857fq5tnbc20nd5g3vs1n4lhsur6r2nn6gbyasxzct596bqdy4n',
                flowParty: 'r0lsjocsneu59tul4by95bcxqplxud47tzur3hzophihkpwfj469ztjho5rs2cse43lyd9fonhgrgqaeyns3bxgaqnu17dzf1kuyqc5gktf8pmqamzcrzhacni207ckdu0w2gvybdgn1edlfvqp3hdaavbnzkax3',
                flowComponent: 'hxbl6quo7msts6tkgok9m64pwjbds13o3tt7qhqfhmi8mc7107m6cf0pmf9octty8ri4l9k36tdab2nq8v865nyo1wdyz9d3tf4bcsozyo7c9sqh79k3h63ngvjlq79g3o00wbw3tutma6huap1mzfzx0zqy379d',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'sizeseow6vp14etup40zik79qz7sg7uavpmzwjun73patwlb83a9tpp20mi7ihkefb6entrsucvvvfwi2nimlvpmh9nthqbetelu5f4no39wmxm96ng4t0vyv3p04qap519yvqa0kyjeplmpz9p4yuinhxk6g9ye',
                parameterGroup: '6f49pzodooq6ccqjl8p8itnjt1b42sre4kf4jh8xuuz5a5f9i8v8w82qkcaal7vbwsssf7oec526ilow23eo4b0lh6eult1118irs5bjey800i6j6b6n9dp4db4p4nrdlpk880cb9trldl7hps9st1fmgr2of57fsum0fc2oyax7it8n9c8w1ewuaowes64brtadyskfhtvtvm8wcitrsuzf2y1eszvpvhuh4hohcpdnk4itd45t5mn7zkogkro',
                name: '7mdusfd2ld4zbz5khtch1q2vum52xqgkr8zqn4g0xi9hpi9510er1etdclrfatvmjet4oepozffykfnbmqxh2x0viy1zftd4jmjlog669bfdx9mvon5rfwcgd793bs4mt80t547q7z73eyk472xp7amz3l2vzb636oaflik0fc15hg9o5n3uzbo6cfq0ll31b2gsxf8itzsqfsvgxqr7hf2kwexi1u3s2ofmanw7dtue4999grfzizd553nij3c682mcib9k2rlrjd7ksjypbhei26x8ad0rbeghy25d2aso8rgh6qkk8g14cqeg7jvs',
                parameterName: 'wxdalefq08u85orcud012d1g95qgevk4lz0qybmpbmk7q0bxqqcqxjsu4v4249v0mc3z5l9mnnxfxp4n2ppa1s1uxw1ukfujlr79xcc70e1deikra1pfte23o6trfdcv3y037u9lh30qhg3px45221v1rcnby0jfgk8sc95n9nqs17bqymbn6x7e9gafzgd2nc9a6oqahhejxe1c14rhr2dtrub1xnrl5qxfejkf9rojkisrxk0d3hk9cjk5x5ltlgl027g565nxdyqja1psvi6ulazzf3rtbydplyqf1y5k2mjpilheg9sv4yd6l1pv',
                parameterValue: '808k45n1hg3k9iuh5vbvt0mblvcx6lvbks0jl4ckvypzwz0hodmyvtsoegtd6ualh5dxs6qkqrxk7xgux523dwawridnutd02tvmpxhu1e3uqifp6hpzymujom5b0sgle03lm6me1z0mjd6k953whkl71q5f7iujshk51jpfcigk6xp0hf706vdhswz3h18sgld0afzi8ytipc0664l228y5qxmfsx64lpzoqh53z4dk0888ll0qszpr7kn2vb28ycmgwe4p0ivwet0rxfabtacqjrc56jiyt7yrv2iq4pj33lsqc7bcgz88lgtq68seuf9b084db7u19relhw1rmhu5bcneluldg51uvag5tse7b0vss6grp26jf6m1i3fky9kyftqr43pnzfeykuv7mn6rh77fdfj8fb4uloyw1o1tugk65ksg0eu1op65q49guab15nmo4zz4edgzt89tztg7bfo4ctd67i2kb0ya5h6xdeo0m9bvqto6j7z08k1w7v99vsvtc9mrhtlbg0xe3jk5bzs14p1yehruabcrsav4mvwsmpntwywwy100z27orn1nhw3nomyi0679ej3d9rg3sw4k6o1d6cby5vhwbrabyh03479bp83qmnzmuhqoklo7z9fiv151rp5cwofs5tsrggn0frndv67jqr5grqfyjbdccy43yuu1rn1mm4pvg0tem9fifsy1iw77s1dxdf2njg3w5kyybdn7j261ypojthes06yxzciirwcbk5n12g4ovkn5e8qc04gd70m2bh529bevhbgzd930yzf950s8mz17hjrytjs6tkhutecjqs5hfmvbeoihybalmkntvpdaucke5h9icn611blb3ydksychze1a8om82eppgifcagk10c7tq63tf38ayhafsqqp7jf4j142tmakkzxh6scjwjm0icy3ab1gh48nil89ckr0e3dza50iklkk0m6yqqqwmcejjump9x78uro6whxdscx8r8dpu8x39rgvqoji',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'rx61yhxj407axmillkfz',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'fyijxox8g30jjotugeeo194k095ae50r1fi9x6dy32edh7qfpaqaxihb3vhjvf5bx078rjt37n8dsemhfk35yc21ietrz6o0limbegfd5iw1y0zfm6kgkbipoonlg2pq25ypr75r3ikfqq0dcwhctomrbg2j7azx',
                channelComponent: 'b48rq5ap2wi157vapuzfcssku46y9fg61sos08grh24wz6t7pffsxgw8n495c3hmwgtar89d0327yk734sydbfvp5tu820vwmnpt3x67lxjwifdt8jdrtpz3bbouq3g6bklehaytxsmcp123eiecw3637ac18q79',
                channelName: '3w6upflfenvcqacii4vumbjo9grar5l7oylnrsbojfy7h0wwudi2nmeiuvhylo98x1xltvw878lwehkeq90v1k7822hckte33ll59gcawgpxj4uklpkwuv9bn1jl1tj2vmonqcietbyxwvdxfyp464otv8oi3y6e',
                flowParty: 'wyivkgqe81rnqhyk489vs68pj2r9tra0zihy98hsiv68virju9pi5emnoe5kn9awxz6ejc5hdzwqri9vshox0igm8jalq90s1caa40tr8pit7z7w6bt9ytj0fuadib35qeta84swq7qv9r223ia9p59ncdaon7cj',
                flowComponent: '7qkgid9085n5p28qv70vziupl84e8h6pjulv3on0uxj9umhsdu7m5p3l36gtlg997j3lfp9r6maijaq5fmbwuwut6l2r8y64kjl4nzeegpjk38c1xyesrka21fk7jihdalx1d21nkxf6sfrenmrjl4kiyuvs8s9b',
                
                flowInterfaceNamespace: 'glubrrl88otyko2s93vn808j4jf85nbw0b8vzcuhwrqegem8p6idj3f33k0wmt687j34kz7xqvy4bd4shfusdonzvq4znpm6rwds4mpfchkccp4fd6g4svceqvqk4m1mmw33qdmmrxiaxo7shj2dxvou4vy4qgne',
                parameterGroup: 'txsm0aio91vrkqxmwuf414ipnb4i50vabg8255cqhqzlhi2xm7eo2aov45iljia0dc8xpo9hqhiypk6uf9yfgabhi9mmeem37azwkvcgxbx9s4be3m1cfnra83bikzjh4773l6jwqq48h98popam3xqo3ef0p8pl1uewtvrdxk615keqcbtiatr1xt6gkh7oheek4rjo5e1kloulch2hmiz9pzhmhsvz7rkvqshv0zdmry71d3js4iuthi6lfhe',
                name: 'ur1etrn1p89204sumtvim94xtqed0sc9r4t0shto0eu7x3dys6ba55x24ln2fdrmk9ntrwgn7zg2w5efzlgkhgziafm8d3dkolyakpl6eys0iqq9rrphtd365iulbvzq5vzcqst140jx3c85dteg51eh43nmkko21rwl3kdfpt1z4yzpzub2ij1bbxowd9ielxqgy1wl1m5mrymr6l5chfp5svautmu68osl2v03ruk9ro34n9qsopqgfemde7g9f36z8i019vj8vf6z37cjkffwfdel99ae99s64sjyscm6uhno4m4b4oe870b8io9c',
                parameterName: 'lkv5u213fuyi9fkwvx2wcwmh4te1sy2p2tzb97z2lakz11lo5rg12csfx55n6z9zlse60sno7gf97ds6ux1bdjvbdmdna7fx73kw5fb2pw98dlpuayn28nnb38qsnbtnv02sw5bxscum28j2b1c4rciuw16rx2s3avvf8cpybni6w0mouw1ynkzn5zm4giwkqblhmava6y3dhxdcku8ztq0kbi818xpdoa769euzsn2u0aefb42tp6g2iwnryrj9aooxo67xks2j3useq4qlm00o4kbs6wrgym8cntplhk6jo68qmvw6b1pfk6cg88ut',
                parameterValue: 'ifxetwjwz0vvneyx9v3lehm9rydtu1pfouzt7rqgsnc80727c0291bvsn42hd2wox5551jtv0nsuxc6z0dbf3n3x0wpb4qe6eb9vd77f9qd2nnmtkbolbswp793210z9umu2rqpiugsdzibfnay8aolfec5ibw78segw2gl0o8oa8hoh0qrcqh5p3glg596ubmbbyi89l1sid4v486mx4evsnltf7anjunxw10jposx1rfmd4vxttgpxs33vzmzqxawjg7guw7ohgw02sijt1udcayeguqh55zdwnpbg53xc8fey6tcg5zkqnqf01f70pu4xia4w7iqdk71oy3ypatan54vknwncxhma3qf404vsq03vmb8asy77veisdwho30o3c0a27273lrthdayb7np4ytc2e5wp5pov29zt74vcjg1967cqu0uh1x9pkm38lhaexl0khqeryj0im5xmdy94a8pd4u7ed5qyf8wirs7m926l2fwxglimlg3ep0getvle32symvp4tog9fcz9wtzv45gfalazqt1ta4ibj38tadhd2y6i8ng2xgt4eh9anjwdlqtdm2kalq5fii4hybsvxc8uy72hkozp70f5i1vw1b8g1hn30ubtbnotdi4rzksagmxelm5qf4svo01rlfv623eesg3iueyhmrgpxf155eptnsl1h97llt9x6guwrbqx225rq7t4ekterxcdd6kppesxhdzeuogkxpx1q21ogiegfv72yw9kxyotofh185z4j5iidwxzs7rig9cf91pjsi0hvevkkb3ejylaub59r4omw43bsjcr4e6rxa98pnevde4slhi6dcq8eorj4hsv02xay32o8gr6ise9vz8knf324twz24zvnwitqec6madg7v6crgpj1w2rc8uucqz5zl25xujket38883ngx56sw1npmgdnze1fj69mu576akdse1vifif9gy9l58o295ht2oy7rqpm1f6nbuavuatuyujv3rb7o6lu55q41cj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'th65p66lz2xhv0303y1q',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'dilmsii1ii097iwtgqnyvugg1l6ak9dk1abxgvodr4apbvc8awpy7rrfe4uqa2ff0fonvpgb99n5asg36p7bla263ibxqla2s5z283ing9tffe0val86iwtnpu3s28z1y0i0osyt6tcztzgc3wnojouppxfo0js6',
                channelComponent: 'aqmbqhqwe75cm0s8dkzass86xzdyqox2cpjojqbnw6fsuy0j1c77n6i9ew3561uwjlxchzp6yh6dn5fim5454e2vhn68m8x6niz8uiid8qortn6a6tjj1zao9bjjigf1srbelthratg86zlnstiip29wepmd5cj9',
                channelName: 'qc23022ojxansu5bpauzy79bqms87z52qtvd1an6n3327ntdzyhwult792rg3lyefr2pa9dbzs9jfcbdrcykqmghbugisj8u9r4upbnfgqq1r01avdudnl8zd42fmuqhy1s90fef98cl6xskgd9nvy6xgp99gtvt',
                flowParty: 'mq77hovmwbekobaf22a6sxzxh28jw3wir3k0ockv2u1ygbbhvxxezfl1rblzq9ewlfatm9mbxkdmt7xqo0ly03vm2j2k2p7fnuk9tj4r2h7i8ej3mxmzl3zky52c8kye3jgyy4msn5aj2klmkyg7ooq7nkfy9j32',
                flowComponent: '2jdc2cjxn9vauf7z2dhpamc5yu3ol2hnr6rhodo16hy0owkahxt85f5k2x6ywnq4kcnuwo8ff71k41stgdfzknbl85gxv1d3ia7o1fa21xnmarud6pfkaoycuotcadm4bbik93vp4e9us3ciqbkcqg85bawc27au',
                flowInterfaceName: 'y2gd34fc5oypiys7fd6t09xnawr14cp5ifwaed8npzwv4wm6mvajfyfq51ytldk6rp0s3bhk5f6azqkt6yazmj5nl9j2mhfjsfizh21i2ryheev016wf328fkhdpol614ii9petqlxsgfselojgsyadbvjirdb8w',
                flowInterfaceNamespace: null,
                parameterGroup: 'u54irz7g47uu361mm3t6z2m5vpzvw6yxnwaztl34x6yalp9zkxsxu3wx41tmy7zdflnxld7powd5oazj0dem0spf5l2sqrvec9tn0e07kdyu9i334uilycdxv9wzhcicv5wy2jj9sos9rx6s35c929m0xsk0j1sub5amqsrtf6tv9qwe1mr8rthb4mi1fhnu9c8r13au4cp59ak3jo2np0d0eavogyxy55oowgwl3qe6orio5rgki2yzn1flu12',
                name: '8968776zp6rt0sp1mr3af1mhcxh2wr7qrcltwxthvgt4clxx5a0a0fecbdhg2tsun4m0tkhjjozzswkmdfa1xig6ko5yrmy2o4fbjhhcevtgclbi78s2i04e7kze8c4tghvqtnpnytnxaiap84tvmrzijkd2np5m2foaberoqvossjtbnnvx4p6o52k8zaqog9lgxpfsjf7wvx4hkzwq3lzmrn1gvni1kd5dps0we2eq021ow7cjrzy4l25mr7l1q79l1z747mmsyp3h5pt2mn2rmxrfx7ymm00zcyy24hm1yf0nhs62jhryzauq098s',
                parameterName: 'hs8n6cmwnd3tji2wivbgac39em8ic9gwmgvc2hdyng0xi7um36klehmm086ljtousqxhtnrtq1nrtvhzaukpz6o3pscqsjoq0dfqwab5y5eqjh28ds2klbp6t2u9eg4v336qlznxbipsx8rm48vrq74exotabkccvoum4jeiqhdos3bv6mdb20ga46q94oknx3ekcc4y5cr4air4ggkx3a52kd3vh89hhuvnzw2rrgqqnwmtvurfx1nasrhz9dbgagke2h1xxa6abltr5c5uo0co3yzlbu9tu9v133n5mrr2tjjr9aazf2ih251msa0u',
                parameterValue: '74r9qi8yc0mg6a15rm4doqpgtate2t2wzzafdos1hk6a972obrs87fro1hie4mtqn676aj3pb8uq8dihigqm0pfib35dqdxrq48rfg90jfwse79lxt6833zp09gvf18lhv0rbsblwkv369haqzt5nltzb987oecswl6c30yrerbxdncgc3m4xn9fbool942hpnt6781rymyabmuj7oc813leu5h3x1q373toaflqv1tjvdsuw1qdqckl8lhcxeq94dfzqnmt37v32hteiv31e6iusvmz6imumnl5hqscfc646lwn5c5f06b5op4vyt46vw5cy9vnjqkyw8p290qmju526v1zzhyufao1kleupzga6ou461p6spagt23wi9rvk7s7jpy056olkvv4rxg587tav0oqqfd8vdqf5s6z4hlalyx4srtre5z6a7h392x4f9yszxp122qdil66zxvenz12zb17scdlee9axlvvxhi9o0pnps6c4oqhxxqvm7qrf9vi4545ncns28pxwptgo6gdjum36el6nopqod95p7ns6cysf5zm1f41gd83wvj63ypg3uzg9fuco2a0sem6l1u0zodtt8ssqnrl9k1a4g0547r983d8je9arzdom3buotrcni7yg6gsnbtzlv1hzfdu3t258e8k87y7tjhlxo0pd9c1tg9wr8fkl039o9lfw68igaukoiw35rxidnok4bbwuuq6uea6jte6qxj9ju2zpym4n4pigsyiterqhbrc0spv558jjc1hhbxx48yuvpzc9mikd1n67jfp9ftlt861qlj32eva5eu2zb0q7aln6uku73e9g7dx0xonlljpb27mivmm4hlrwcsngf2mhrf7mw6t6n7gz2vm59e0bxejqktddoo88z5vgwlm03dg4b720cdlk2uehet56fiv9ptr4yvctsaq5m5r2w0llcvtyt9siwmqj3e8rfkvg4j26gisz2sel1t9ym0gl5nnntzaq665i1058wd89h9qsbmv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'dq9ljtktd7o94ppfxahb',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'vr7dmp0kfsvudev88nhv4ak5k1ijj2nucmqk3y4xjig7bs0pbe3gt8lkjnb17yi162axgiljt4b0nfbvdua5fr12vfpvvzcvt7fr170k5j9aikvvislgijjh5a2l6h3dn5nmocew37la11vld2493qi3vo85qxvq',
                channelComponent: '1df79z5lys1aub2hvf0v6bl46ycyomrz97x6d1xs6js6f30hskm8kcwbvowew6wbfzuo3u1owp8tgzkd6z60rtuc2t6hz40omq3u364k5bxr3n7sjpkx5amfsvo0ndl9d40ogtyiye1ym439ynyodqbflribkyby',
                channelName: 'xydf22lbg3l2lh78ozj4g0njp0w99otg69j4xpbo98w38z3zmkdxbf2ih40wpfn442q4taynka86gl6djrjlvwg4gm04auoqkf4hh7k9g5j09aizjzzax5fwp8h2sfuhrvqa6idysukbb5rmdhpxf23uw42kxb1t',
                flowParty: 'yc3gz18ot8ez3smdk0aoene2acndujosm0i8yzdifdwl1oc9paen8kzllz7elnpfpp6lj9xraxtm3okahpix5q60i4uwfeoia6326t1lht4cvnuilrwn2u4fvh8wq2j7mlu33jm4d9odghrddo06witjdtmvrrkk',
                flowComponent: '83qvyrmu2w5ja2i8vefb1nu3h0nit36j4ziqvsdrkuy871lx0bo8rakyyo99t3mmbw54lfv1ltimzmnss1kpsd16xxksf2yc1i09pkvcgc79hb5qsaimu4clpsz03n3xzswcwj7jiy2m67h47jurxxo1ksmeow7r',
                flowInterfaceName: 'zs2bqn1h2k3wtb3i88nme9srnvdajg4qkhmu9jqmxxecvoioepy7s9lesdoqitjec7s6ojm7ff1h4iwkm9zpcngei6srvxaw837nyd7n7tvces7fx39xu9n3sl0z27r0ionmb5h6v6fnn88jjs1vuy1h1ij6zj3a',
                
                parameterGroup: 'sezzf4gqe8j234m09ral4z2tevs5b65lfajndt6oj883l803oqwkyy365pxmhaq8i89igtclol25wky94hu5od0o9ic53t03oi4znuv5xizhhlhlnl7itxsslw53cvt7xyijawtlnlddjh4ap1qj1z2xxhrhsn39nuictqe2mu0pj1xd1y6bu05soqn7yita4yzzdvg8jbrldddib3u3cmt76bqiye2sick5uvjj6j1bt1rxfxcms7rhpg40erc',
                name: 'kuwaf5u5kj9imx92v1xjq1oq15fen30dp1o9iipfvbw0bpdphtwlyhalogmmxnnxu6ufqzux4hsaschg3qkmsfz2ioedbbdllu575hr4veu3e7dyrjjk71g8pchjv899ahmgvaa2vw97ugztmwtab3xo7nbwjfqhj4cwut9qc93v7rolypqyks9jbzlyl5qjefrptvdt7xkkktisegcog35t8xhvufkkmxpeoswu9ab104q29wmo582j3zx1qo9y6imh5c47b793v99l2vpkieiungwketvwfcggodjjln7ug3eq1yb03hbwutki3aoq',
                parameterName: 'vlh4f5gaxolrp74bdgudgdoye9rx8vigw9imaw6ha3d0huatse5l6x5m0hbd673ovxme9xajnkbfqx1jty7h9ia2bs322vrz1txzslaw8qcyzh1fo1wk1rpg7yox52qpafa41js0wlzfoqxk895m2rd7rljx045ab5us82pdclnyqjnt9raq9piss264u423c9xgk438r3xufai9gar7wtt85b1y067ahf9qybohmdh5rlfotej1vt3kkymws56ra3fgfk1xfvmuue2u03mr055ia4xye7a7uasko5uip23c9t9yukk8v8dtwrlmwvf8',
                parameterValue: 'ev1hcx3mcomca5qjl0ln7wq0cmk2zinonqhuuc4lnjibi3p2qpxlbpea679mcgnpnb9ia94jvs68oa7subloiy0t9fmgvnawak66qxhfs8jsf04gzsgqikjr14qpkc9gaxyjml7i2p66f9vk3rwhjv1apao106i209ax4i941esoast9agweomxmcs4v45fnfat8o35k32weekx3x15ex97dsd8k8ux9a1jpjuurm9uznaqa9e7x1kegfcrjiutnjl4pmvyh0tueqn7zhlya5wzv8lu1t762u6n4faz6h0yk4had4zl47a56iqul8fq6ym4gsmzokbqdqoqubuciznpg7frcvlzhtlcs9tc5yq0khsf6zv4wzuz23cpdbhsrhocwo14pwvjrex5grvb0f705y9j3omj9df8ij9ahuk6mmm5bd7lwu60ttmyahde8c0e9kth098iflhbgr9jkopptsd9tyk1z5zfi0qvsfyr2nyd5yruqhwt19bp2j4zsdzxvpio3r84col6g95p7sn0a0aones25bf9nd4cqgs1au4sojqm1tub3tdrwyw0b7revabs49bu7ocwflk5v2b9co64x3ety7x7wp6js8x9kwyvvpjr4egxvz1cllwfdhh60dqxw3tzq6wua0k2amxcgi6wnwwz7aby6zahkwtxoct2hsh9j04wzmqvc8xz3k7swk24j7gdk9jyiioabhm4jxjy5k9q6cf5j3yumhpbokqiktnxbp30v37728oz6oury6apk749s0zk15hwx08rinf4ziwgg0zh69yb3hwdxdis9u75s57ff8m3ytussc1iamj78pi3ole02ox8swiffua0lh6cv30z316kh6xpfxhk8fqt3du6ka6p3iwp13wr5yz24qmpig2bcs1uy5cjkxwqsipy2aucgacs2tbzpwj2dy3q0jik1veqijerxizz9f843r4y1tqtghle7d8wkuzpr9h74sml3tlxyrxdekoru4a8zxoitlsl0fcv0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '1qxo5sz7bkpadvl941oweyxm4r606km5gyv4w',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'btewua0u358ox1dcn47m',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: '20stxztco287mmk6g7jo4z76ysw1a2yaq2t6uly5gsts9qhmpcc5cpld67vogbkvcuno6ncs4ur44c5zyw6xppisr3km15tl901g5mvfkeyl5v3tqhas6nnt02tn6vb6nl32bo3o38oxlyga42x5smghmdgttfab',
                channelComponent: 'vm9yc6n1m2hsnj1p0ath2rmx2ff7yhy3708mtse2vqs8d44f5ijq85i0k1figzg6yhf34lwmnmnxo8ncwmps3bshxlq3lbwg1vacp5lyzjo73j6t3j59ctjcvbnf14joo9rrcu71tylt2xzgnm1fl7tydemhalll',
                channelName: 'uss203ysr6b0hxd5tun8kpgk0leiv5ehph72fiowj5l4hvpzc8yk5v5lcx0qp3gw4ra1aejw5dfxg3h1hkl7gc9qfoo150cml0f3rc5njfy90owxkizhhdiz0wlvty29maymc4fslpmc058t8cg5ytgbi7srrs1a',
                flowParty: '22lzmmmrj9wmnvljcgyh58j7s44dhuazcmjllaj23g4rb19nc9f496zn7i9oi1rw1itjmdhdtbdsqjflbw301uk16rvt2aqhq7y3cwc5w8xo4rxbzosm8k7o9y40smd7h4jg0kxawpentxv5ydiujdar8fqepodr',
                flowComponent: '7bph4kc86bhl7msrmpsj1e0epuhi8c1hhd1h8db7fmcw18yd3xhdnbdsahi3ycfne1o4zykfyaac4g6tr27xadv5socsk3f2vb2ry5v9worflgbyghsizmn1z8h8ow3wsg7yopx4q652jtk8fhjthx4jmzps8g82',
                flowInterfaceName: 'n0kc45zn6uck41yqcv44c76g1tnlzt3xc6trginzntg4v2awtjk5uhs91tye0bromjbkvnnvl43n8ue9sa22jbzb8bi2bia9fg24eymd3ehycdw597nvbkpz6xibk5dpxno0ogbs6d4fic9hsvfjr21h5zrxljgi',
                flowInterfaceNamespace: 'yh3ue55f93a1ptjurbbvidaz89ol726wm3sl333m7w3eghuya5o0562tp1qefsvstep6uvl9428vscipv3j8841qw9rfiq3xaoa1du4dzih9gcxieeu4maxhpdt2qo483beleojmm73pgcwkzryc6ovn5ywc74mh',
                parameterGroup: '79ot92lbsr0xvwfdh1qw560lltkheu385cpvjt76hwdi9lpfdvilfanyyx11oqs316uiuksfmxcqvto1zi3s3sglf43xhos3zer5y9s4qc5x18jj1nnf0b2l4wj7w2efy916j8ccuk4pwvxhcsjsvi9cqozxr4ml1g1rh9j8hnqydvdnl33vzgf5d65eulfd3a67armt8nenzv2ffz7mns1kuzq7sf3qpb92c2ae2mv9viri37i8lg8871d1nh8',
                name: 'ulto8xe5qt18qrjqo892s6e2wmc5x1sjwi3g1noy9nk6nutc3fafharu4ii9p34qjr71ygno05n8zkx6w2gvhwux1j89himsxfclluekw2ybgwo6i4f2an9svmia74zuds9l2vm5ubrjxdrqq8obcta7dzhpaegd1g7nt1pox1cmilhzger38h6jf7nuf48h1k98mywx42mrzgt3rb4sifb5ggxvjgfdqek5enna0d4uupdxf36iym0aa840y677smhihxedshho7azza9hkvlq7he0udwjfboxg4uhphrtyadt85552no075xsk67y4',
                parameterName: 'm9i353kp90bzg8t3z3suscnf6ph1o5qk7a7skfxme4ak0libdw4mcf6bg3q1jxx1eztiof5by628zumolvnc87ou1cdxepw7mzra3c1y997uy3yijwr5qjm8pnfplx5x9dsm7gvo0ucij8dycfyciugpey06f2tuxdf8wy3dw1unf7qfgo6eif6gxnpnt2ytuuefr99lcjb0cp7pyypehyzfrng77aq91v2d8x0gktt89lhp09szer0vxh3mpb9ga6867ij0dnuxd6b4hxf6f5kqxw55r0bjb402hpg2l3arn2oh517ky3100sllpxt8',
                parameterValue: 'c7lganerzyqau2ppvgztt0tcy7su6x9d4lr62lu4ko6lpq1ci6p489zpnk6thoz1eg07wkj5rprr0oqscu5b84j9fhrvwprpy3v4cxm5272qwquc5mrcvc7n99c08phttpxlhto7guad8opr14buazrcabiykza82e7aanziyp6p6by86osznuhxu6vehjgebhyvmeg5dvdk6pzs68udpv29wclctw7zo5uwwgh57rfezsdnnjvb4i20tdtax7aswwjkaefeojx7iram85zdkmwek23y8v7p9exup1i8a88b7rsjmqnev2t2s53d4oy3i73fjveix40u7rkwtcdq0aw1kawe5pi3xu8fsvddogji79huepbrbxtfpc4t1acrynnvna1zll20h6yi10oj1azuj1qfuk3yjiu7817n262uo5gi8ma2xzxezuue2nrqhkzxaq5n5plh0aoqye09rguiz33vl5r73dr68idpoi4o1aow90mo1hxeygzrlxij7ul8h2ouee4rmndw6vnt3m00pg2l5a1lw0bzzjtq7rc3kc5wynft73bsfg6j7e3x9g1xe65v3h7feil472mnwdr08oj71ai5hdpzl1hgk2kg7dpc0x7mb2yk1n5hq51r4fs44zler3eqc9zznes2emm5riv6m04lea6dwdvxfhiq1nok515pueu4r8xh23dqtx55yvia8q5vyrx493hx4c5nhsenbve016shijim63yl60ejsie5cilajndz3qvwknwkzio92rlur8mg5zk4nujfxlil3mtvb0olrjo3qjstsuexxv7k34qk8m0apmxcjvoe6sln44o7ubbadb6er25lcmdq3d4sfhrfpr9x9l877p0tq2joq8y512ylcsf6b5s2v7xr6ltsxpa81hbn72kenayncwt2px28hnh3hv18enw00qov8mnx4vc6shi4y0lyco626z2vis66v7gmbeths43d4suvw0rliwox7ndpzptbthj37x868dh6vs98',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 't9py1h5fc9ckalgpwo3koignr6nb9eiry4slj',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'xqir02w7qqr18ws5tosr',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'yt05qfp38e5ny0bmutalc3h8d7ixqsb8ixyuv6ibpqr6c497cqdbya1147tcdz80wga7mfhnmxbx2a8soqvna62sqe4nbdnuyoh5xp4bhnajw9wb38r446phiwujf39e4nb98j0py7s69etwtml0kui5lmkh97a0',
                channelComponent: '3o9oos0hl6guvf70575mz80n8r5zk24bwmuye9f346ok4frhvcssc8nlm01qophhfzrmgawpurxoyoxoerns000crrqoq8ni1qdvx3yeo88qc86uyeo324edkdnlezg0abgo8jn8zvkdd1w3h5wb8yum1pizoj2y',
                channelName: '6fw4fsxmi3nq48gi8sl7j8pzq62jxz68yxnt7qwu0f9ialh2xrlbsugnyyqanvzm82hpeiagv5zvajqy15ncq2wmzl12fczrv0gl07ki66wi0iye8j5h82jhnh546ndtvp8m3409v9o9911f9ksa8fhb6zd9z5kg',
                flowParty: 'hxilir7xjis0ob8gw7mr02dresfa3b03rdb73u9fygvnnybhz0tkay6nh50l7dd79wwuyetj6bedqzgcvvhr1ot62vm9ldgbiu8dpp3ncuhoaqln61nzc6us2sk96654bqzlcohb3u59iwd0wb7v3vto5wwzfqja',
                flowComponent: 'moyjz6s8wln4y3dfat90a347si1x8q7oigglsp4ia8bhtt7x5w7jeelty8056zgn372v3vdyivcmwuocuez3g7smtkp2bfk9r5me7c82d1rum3ayxg9tp750udbwzigwft32h8nt8dw36q2l2umw3kqkesest1p3',
                flowInterfaceName: 'pg9zlka1prf3c2xo5gxqtighd7mhistdlwxnk9cu9etwt83ccdjdtc19kcebutsccvqv622pv9ra3504id84c3rt7gn7zepbin2hro65w8atdtb3uyyljovii8mah26que7u47z9gr2xyldc7lac2vc4jg1larrp',
                flowInterfaceNamespace: 'pftjhn2i0g96fp9gnpmfaxunzd4t6pw058buw6pvh6s0qr7hlaw7k7iebngmpipzervbwcfxqcfmqa71zx4n2jxwet7f16mk0uefq6ovj04d1kibrghpceoei3jjtorunae6ux8e3rkeybmw5o85x6prz9q84ira',
                parameterGroup: 'l33yhbgjua60zv1nqp6453ou2ul50z8pe2ub8woybvfuzhqlrk5ebx1r60cabndzjvntbxcjdrbdb4sriiobm3x3g3lrgtnuhdb621j9cynd0xm8tl7equalf2pt9ptie8hfedngusyuvy9iix94t19z8zkwsq7z81by0rvplajb3ggkjcs1dc8mvaqvjzee4jk0wrwo43vztfieqxwfe33b24e8gsogpprde5c6pfi9os3hqq02ta3vet8wgnt',
                name: 'zrh6n2ee84325qdbg4rnehmpbjcurmbw5msy42ddhxzd8xgov1my8ov94d4hu231ic4v1pd1a1qfpv2yln4snbch4byz0cbg9n38opccyqvgudq8txl7i6ysj0dya6zl7tz0kivbwvi7s6tezcsmq27l4kmsoeb058nqd36i8qxcx2l2pwytwou1tvutdhkgl30qovpjtt3963xmnuag6jqwysss2k8b8pfic2ypncm5nouokjwh8yewqcmb8kbyon1yam1jmw43umq576ckg1s9izd2t0yolqf16r0k65mahsjvjbiu3jgzs0zpxuj4',
                parameterName: 'z91su1ncneq16rnlay91taw8c3er34i1dhf237xwcx09e30apr0px4ws29i0b9twthnxgcxf0cczsfhvi48v2er3dcz3fxf98m4gcuyqmykie9xd8r26wo8un2wq35z7swh5j0cm6r8p6kfoxkn4isoydo33lp0eu5qsa39akp2nxjo3s0kkc1ofjcj5x78dt8a23rjgvmxybhr1zbdwnmdm4cze2gpf381k6lnjykbnim04c2qzni1vqdivm1l1925l3cypa1gdcww8uownfxn0cbtg0p1e7od2glgqnerqjyhojsgzj4sw2rx3fwl6',
                parameterValue: 'vyl6tcnsbsiny3oclutj0p0je0sqovuv5joo2r2uqrkph1ynpk9v5vaycxvxeao65ta8kvywu0xpnz753u9ne2pv73tlenqofqd84xja6sgnb5ih55x8tq9zrwobt6vgx96teuunj3kggd8t1z6mczs6gddkl9iqli3xp294ty84i9efrylxw36jqx28fth90zm102sc73gp59g28lfthm1358u9jy5sa9rokl2irftk47y76gwawr3qo5bzw2xewou60kv9tw1rfuyrahfh90g1kl2x60yoji2h4pwvu4uylbz8ips56306y9fx0ojloacvchb9n80q7sv8m0l1rbvd33n9f9b7840nxdamm737rhzyx7ocks64vh0tnhqf4bajzrqkv226ifql18aw5tuz9joggs0sd1gkax3hnjjnu8d5tbzxrn317fiyhewu797enivcz6cqakes9t4o29ya6vz9a53i9wfhf2yuahk6xdyi6t86dh67md7mxmjlsbdloh6k6sdzxmrim65mtig77a734qv0yxb2f0jt2dg94chztesvusyopgu08n6i0lotqctfdzkioi0961zrfw88yrauvwzk7s0jt540zhnjdiguxw6lkwm1zik5v2zocjcp92m9d9463nr7amet2x3exbgqbr7jgy5ec5s1akx78zue50t2vaot7z0ghuigxyvdcklh3ygc6jdnyg9wbii9b4f5e7y9ju2sb4amsic1tntehxh2bs9lb2b5jtry35fjmx7gl5h66qbzg3im95t1sfqvokrvklvswnbwvk5gu2g2yy6p176mnqfzyoo5vjp3ybp3kppuadvyhp3i9qxip4154pdfeg3sv2s05bdchnlu7lz06znjw4uwb07p0pu8o6cpci8azl9m1t6sb8fyrkx3bxsyz3dmt0yh01pze1sxnc6wu8a78gyv3zf79582xuce6qxqucsq17ugfh4jm9z31ie3dm9twi2pmg6oc3pz49hwbsgu40i28k6g',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '61xt9zkwge6lfjrlu19ympb9btcxbah9ckk5u',
                systemName: 'nqvi1728yasvjgyd491h',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'c3cf1a0k29ar8fd31ptbnhh9rme7d8ct636rpgv4r576q0e95f5lt8yiqrfu2watdjtc0l71ym9l6zacorq8htl60pnlej1feayjbl12mxw28y20c8win6rwbmj6f9ik6vvt44ebh13iszc93cm5qfyolugf1wvp',
                channelComponent: 'fu1dwnyic1lukkl7vri61j09q0z7o99c8ra2yfr57trjakht94v3rtxm8c9236ar85b9voqvzbk7yajesc23ofpnplqlnao6hsbrdnuc9ivtq482z6a379t4a24aeq382xa2g0kblkae0wb4x9lvdr3y5og4iedh',
                channelName: 'zs0v8gcng1w4bbe0hx4qssue1c2o76f8f506yqq05k4xcrbrqgnmodb5qsg11ejpxvs47mlgozow63j61r2tja3xoo4xifqa8saty2urx0x5pdxevagwvaflfk0e285z59xcsmde6cigms86qzneu3mvzpyk72n8',
                flowParty: 'w75u9y1chbdg10z50wo6avl5c72nwpk0fjnpwvnc5thyt06vztjbq67jje6j1amqrilxprn1h8dk9iqkbuodpscl0gzk0b1kl26mm2zqfvml4druprxz29eg0gnvscy8bg66o3y2zvex97mj6m5ovksb2650nf24',
                flowComponent: '45i816ydqa4274484xac2k9dph6pmkmfh7gl6f9d7c97f1vi8lu40q8z9r2hiuj0bo9dnhuzrjyqhurh4rti54ik7g1ppvq1h29des86ctaq4b3quc2f2s3k9zcf5t4tebpegvw775j6723vv2vh51g4vum06zyh',
                flowInterfaceName: 'xsa964nerous5vcrldwq0fm8md6hzmolp0aqtg7us470p64v3r3l7jdgp08oyehhveqtahtyli4y89i9u70kbhg7t1wlvk0xmv7g2v2ldhrap4w3ly60qec1eflbom38xzxyikrmi91oiwmazm1yzjq80bblj5oa',
                flowInterfaceNamespace: 'ymcbqqh6z6k8gmuk07cqws46zc2gz29rmyiof5uq69d13rcnfbeyumndh8vkudlow5v55s205dygicda27d1jjx087z41gchshpp2w0amsa59pvb4i5wmp5znnvsm51unbb346p4zy0guwga8ux47m7dp2iqd3jm',
                parameterGroup: 'y95f47xnau2d0twcg9v2tomhysod77xs3425z3iie5dr282pulpqb3pkhcb48rks84bryhfybi7642u6gq7p6ft4k5j61b42tlfe4s0avyth336ham784754pxwl1bbz6nwp6vw7q19ym7g8kmm9fvk8nfud1hhj6fua14te8n94d1kouj6jyb4z3z4mr15flkkked2xnzmdvwk2mudhpjgyl30psrk19z4xe7wyeuemyrsrzq7m2vj7rpei2gg',
                name: 'd19wddnsd944jx4pfv4i5trhzs949aj5ya5ua80otqdolm9uj22kgmzrbyp7ssdmgzsx855d6m23bw95f2y01e4pln2xvjzlndg988bz0wqzqvyvc81yh2use87sng1xxzm9bor2z0w1oi6yn5kwtq4y850ltef654fkzegbj7385tvf81xgtwpktob7w8i9tcsbj270doyptfn13c1nbrlzeoc8en22d9vxjz1u1ufjtrxevaaopp9vwsbmvvui6cgngw8x7trogvjrmz0n7v702jauqc0admst07x0n88jya51xwe7rlmn0otx6an8',
                parameterName: 'u0z1h40ydohcdzvn82x4tqgf0t435z1kaptu1ia3xvsv3cbwpkp0qnubpfkhdyqsxf9su2lb0exva1k5urpwql3x1j4xo3bdy93t99el2gt6swb2b9t1bxuos7gu5fhaagv2kp8unzdnnkl43ud8muimc7o3wae718wdi90ypbhegzul8tv073qzctw8r5yko5z7u4jcttptwth1buw1iizzc9c9qppu3hcr179ofynu5xmyw1im5o04txg0mpzws7fqwsbguvztg717o16r1hf3gikplvjqff2jjs27ou20zho06zn2cy1gg1rduval',
                parameterValue: 'begfd5c2gbhsprdz7s2j29uz0oapvyrwk2qa76oozavn2kpacmuq5306wpixnyf7auvqmn5xpfl0u58qx6o5v1h0q4nr7woarnq4dsk0t6t39p8tnmov0yl6fmu56preoe99m7ga6ocdimnook9f3o8fcr711dlp2nnl43qagio79orjqh9ci129nwwpoh3r7mu7ldj0lhrxbsrolxr9ekbwu5mq2js88p2avczb84y3k2tk1r3hskkvtt6lr7zzcgdy37qytg0gaaeln2j5lgmq5s3upz6avruidwa0ugmxf30i78yaq08ckf8jky8zsj2urh8jesfsmpg5gm3k362cpba2s7e1n809gq3df163lrixeqpxhfts47x3be6ydzkuxotiepusrstych52bsuxljgw9u2nslfa9v88m3p3fmsv036fmu7x86xbyinlm7s7x9f5reiyytcjos348v1qldcier96f0euqq00mhop4hyhm87wzifcgdgff593ef3nhak99e88q2kgf4i8g24kuh0tkqb00v5a4fqcxck0n70im6dp2yrgsegezi91y6kye545if8qbf57difvmnj9pyppodjd90wrqgse1rlgajoqrgx6qwb80pbiz4o0p8uyu9vwpulwq1c65yw4pvl9wvrg2ol2bpo35fdwonhgnecj48wc3xxgjsacm10rbodortpzex17qyh46c574vhgr3vpe2eg16shoi6y9lykzq7gacu7kj9nldqyc4soxx2toke1f06vpjd10ubuyiu82cs7yxeiwiyqq8684zyzt0184cv021yok4ucgc8k11g9rh0k1gow096alnxdncaphdzmahv008dnz766lha8kf26ho013fqvtatfokf4su2grs0sgr5uhht996iydweonqgepu4hdwnwn5u0n384i51v6xb88zz969ve5qdjlhe2ud1pzyeqylkywyj6cmnfvubh7c10eqlrewqe2mebgbs4xxklx5uy5me53jr1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'e1esocfz8kq7f8ki4a57',
                channelId: '2ejflu15mnhz3brud8c3yp1l8hvmypl8v878c',
                channelParty: '8i98bxsp80emaooh6ka6cynd93x4vdciz8p1shu0wb7ggg00ph3f1eaef936uz1euia62n26ygvar5rnhqocubaogbjxroqynxdqq54u7u4e668tzhea76pfsvhgyo8wqgcvkws8ob5c8bt6g2tqzezcpbk0urfs',
                channelComponent: 'zqft5bn0scsyboau8qhf700ekr8dhzz7iwz0p5b8883inl2j1ejpn4xhayv1m6mdmmpkt0moellypqbtn2ev7gqpcai5qci4acp8eqa1vdpmdll6gjym95d96bett1skpiopz453l8v41i2j8krq6eaql6l2bflo',
                channelName: 'vcd42lwxgdk8c98mhrdwi6x792ky0nk8fw84whjs93kjzju1fez4dyxm2vudt71u4rztlaafk3pmvebw6sg03epbgqh439940eedjshhdk4k6h8hjgkx2w9iegue6d69108hthsp1rgaj1ucuz2vmkalnl211fq2',
                flowParty: 'f4wzvnzerlnkj3u7mvw6xjm2q2a12kbelyigvp8flxbz4dbn5g1f9pi7rjemikdbtpcx0dtch283559l3claly70i2c411wkkuuuqbckbjuefk7u7o6f0hhxod6908rpkjvonfi6k4616uibwuyvwow1b5xlo565',
                flowComponent: '94yyuil6xn2r2bkdahevsxajkq7lrtbyh9w5ung1gtlek2z2veey5fudcoc8tjfhwhcixunyi6g5b37k4k4qrwathrzdq4t98xfecm21ei1fy40pbxyc6xlwr391gvhji1fqome7x1ccapv07kpeewquqcnvi7qk',
                flowInterfaceName: '3eow25mni19m1o96sjgklspu1ipp7im5cqtx1vr2uhtvp4em0jt9xn9mcy98o2f6be1rbg1olr1acme1xlx1p3ywo0875uin2uzse2hhca9s2cq807lcy0ryym3uuqd25w2poc9fe7wtgiirlamcfouycaxtnfef',
                flowInterfaceNamespace: '75h7x1rkya7n49cv0c3tlyddwsjvwlef3922kwh05k36zbsx5j602boau6yshvyldahh2wf7x6k8ryfsadr9lzfz2ujeilx8hhd7gqkfujsf3fe7yyvqpucbxcsueyo1brfaf3d5jgh8kc9vikika2iva1ux4i5x',
                parameterGroup: 'hs1fvi4edehxa18gqvj0a9ud0k8kcush8boswle1jgupsf86gmhetu8y4l20upbp17cl6kyyt4wdhq5v5s8g6tzchjqgz4ybh4rzh1ypvlyee7p34ymxrn1845tuf5qyhr0rpxht8fjvb7zw0iptbd0cyc5cgdyswwf9s21cuo3skj33n2yibeagpbv51mvdae6p9d9v7sw2iy4y7c22vyry4b03ikz4kidoafrp45a48w97pg52sxhzlnm040m',
                name: '9pmgvoeiskvceaazxcw8ng78m3oa4iqyggi0eb294lu8prw1plssy4vt0rlq2biayng0p3u8kctl8jeu4fqzvdrfw1jm0ad2sedn3k3035zdmrctsbkvhn210pkpa2rq9k6r3ib8xr7ifxlzknd6l9junv6lt7t9dioblep4vetoabukz7ysy35fz3wtxj8f7c1tg8c6s7egyy3q151xn58kvxyqvh7cuep6qxkvxc6ocfqsll4w15fgckwcob4p094m0ic7u8624d0ncrqvquggb2s4bvnuydh1vvd2k39daj292ll2splwcmbntt8v',
                parameterName: 'j49odmbzza71xa2hhgjeibduxv8po1yqrlocc8llwfme4kazrd69eki4nh3yc1u9bgqtzizfuybx1wsx8po4jyrnfhkzt3brzn086lwt7djkc37rp570pizerfjk3b8phbqfrd5ef78v36fge4t8m2vee7anrmemh31kog28d3dj1pdealv0zwxqaa3vsquggejlglbsjrj8fawqi9bjmjd0zepoaf7u8zsush3vnt154awm6up20sq7iqh0ub9591z9mkbnmmoduygodv32vd8be4utt0oi8iac0d5kjgw1h7i9i92e4dase9q7w2ot',
                parameterValue: 'o8nxkael63rs96btp8277otnkklmrybopegdecrdknk3741kbr2apligc2hzihe5wkq56ayfgafaa79i14apgqmzwuygksmn2cbzggww0x7oogaubcdktvzotq2k1fedbngbyral3pwcbf8ovu4bcrvrgyhxp5p4emo4xirsekqk2tkqfaaopwcudo8zwd63cracnl19okstf6yhdvccxvr2fvrmv5xsb31i25qeixg53j7j9ne15l2tjj6epj3da3fbgpnitmylqc2mpni644q7om1jf7qwr02tw2qrv507h90xmkfxvjhloaknqeat0iz5sjh3gl6xn9fzyeioi8zjhhpnj3njsng33a6oj54tm13l332p48g27o7isccm164kw92yxesjj211ambp3296qhxl4k6gufsz5dykjp0lpg9ugf1dz5ntev11dc7lnafwgr9u8amd44vyz3f0fnw78vvhm6g18dg3ce0z0i8qud1e6j7a60eo1lb0vx25qd0dco68iz98i57i2kcr3m24roi9rwyvodyclb3l4cphx0wtvdw5icxsj9xyflxix674u4rmlzdiux98dkjwgrg67m4cwpg4xydwvawfveocncx4r6gauy1g1o0m3yowjbi44yoamqh56dw7b21qga4a6eor1dya51ugbo1jaug0ot2znxt7hnqyo40ottydipnjsp2khvo9qgmz6j6q9hdybizmrx79h0r48duk15lwjfvc4eau5lhlcyoe1jl44k5r4jy4i0plsfv3jn5umlpez2jlnf9ga9xp3uil4rhup583iatyp9u6h54zkuddn0muzc325rfgsrsy3l6imr8niwpvr4cswqzlnwas16s5kofa6n26nnhjaonywcaygjqthlefhhz4ay3iy9rrgy3sz4sb6wwqq444kxeu1p8blsabky2lpngrl7t2mz2b7szexwpg4xj8xe8ponzw4znfn4bx1h0vx92gjwitjquhaplkpu4bt805ervmsdhs',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'dciim4zopbygn01o0rf96',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'fv01svkkzwhckgrxi890s48gyjv921r7nuogby1td247jfxh2bnm51bho7lrkaf6gdu62ma0kk1l26vvit5jfregqymx9edz42sznfhqwp1k93ffv0egwt86rsrvtcg4tkcjfzcd8iwihizdf3f0j4shrsec55s5',
                channelComponent: 'mu54c45wz1bs5ok3535vp4u86mods8s19vbnsqjetlkekrh6wga5akeqqpnvx0skflpuqe31pzgfdhb8zkmy8yfx86f5n2n82202vobo7jfrnrr7ghwmscwkz9aou3d8j51pdk04jliqkp729g93enxgzp996bc3',
                channelName: 'qvxghu6pg7pxnp4ci8nqh4pzezk0wo7dvrnip03poarrtsercjy5ohtwkjixdn7iga4sfzoiz35a1bvssane835vp9vp7uxxwj97xxfba3u2qjo1f9w4g4u0ao91mepocdpmzxh83cste04ditn062k9x89l240l',
                flowParty: 'nts8powf9q55wgd66s3eaiow7r06ar2dicgqmcdb0op66kxkk1nyg4ildcl80xc31fao91oeq3i977e9ff7vgc3k2thgmbq9k84e3nltucv7siylm29mg3wq6qrsqs8ausyh2gi3wqbdtjard2nady21v94fxg3m',
                flowComponent: '6r1w8yvs6djtpqd2vbnsahptwvgxhu9vpncmksprw18ufor5ua1qy1fgk1bqzrnklhfmkaqq1racumrw6ya232byn5ctqxz6p51ne4y6h6olwl4x93vqog0nvmtep3p6jg1zwh56304icqzqht99cdyu0yqzu5vy',
                flowInterfaceName: 'abhw0e2olsddq2ucy6kopwodfddtitdrok7vndvwtt3ilrysl4iu7q49igz711jj5pf89xwcifvhoa8pvxq32vlmmfctpptx95gst097hy92g3164ube9qmkc2i7gx9hel9dh73al17n8budss5gklyl9ubplmzh',
                flowInterfaceNamespace: '5knd4chjmq95tywogbc4iqgrkpxblpm6m0rb6a654rbnhwhnicyc2v2oh94d9bp53u2iir4gmnrn30rrodfblzcb8x9llgzy0fw5ckh1x6ndrdi2szm8n6sz0qwgb4is1w60sao5ok21rbj33hk24uu7stt7im93',
                parameterGroup: 'a9lorb33vhh80jgppl62ljhhnczqe8lgv5tjfzi0q0wzppk7ylnufv29t2xkls8jxffrgrxgw64lfbhq9182s9o0uf4gi0krhu2yi8mjmcfp5yv0ehc4pjuznl8jyfwuihunii4z1a0th7jjsq61gimx9g726i4yku6lsjtmegejkiysyejjky493ndczpjxijujxcd5al6rthu13z0a59g3e2cg2ho0j3qoqq6ksfkvvt037z470tfm5c1s9vt',
                name: 'b9crmosez4evm7vfua38j5q7e0oc3q29tmfkrkhgkhxlcabesfye86i80gn5427ptu0e09lzagk8mqj250ryfvrafeg3zf8now17pny5rzjzv2x144nwcuf20av38gpb7z3libhsd871gduy0bk4zczig0o1pn99mprweq4nbcdxoamg32se14xgbc18wz6s437redczkz2hgppsjxgxl8vcj2b7xf2ipmju5ljfxcz28mxufr8u68jdy98z6b0tw691373j2lge0s1ryzrewt4m4qj9ywng0yovqlz0vq9w8dkfy771stkpkvvs7om6',
                parameterName: 'jda8goarjwdeksqmu1u0r1rjkp64pugz8yhjwcxrdudo3zg342dzvktub8azuor1isyo4nsmegi10vwfqks5oem6zx6atf16ij8utxfdg89i70lx6tl2980ul8rydfhzdx5ksbjnkglekpi68wd2dqdrrvvn2rpr4xeasz3x4oov2n0ik1oc22ijnnfq7m2r0dctlhew5dmqo5lw08p3aky9hu4uqzms5cgv84bhsg4r2ymiqb1vk4512o7umg0dutrbpz1x3izrkedlilpehxhlp3mb87oov7z2xqbngurxvzdtr76fff65nqpg82xn',
                parameterValue: 'mxuvvq33xo7bzf4eicepgjbt4f0c1akrpy34vmq9l7yd6g5m9oocz1oo9gtz9pewb163uigu49rgxiwtjrq533775ih0fbefrazo4z7t3xk1fzdv1sihyqfrj3desx11g6yeldygm4jq0x2o8x85d5zllijrthu7abad0wunlkq62u0dhoos3ledd0jsfb0e01impt7uit520yrnh33yad00h9rt6lv02b36mc01a4uej2iox3ojprzvirbimz5lrfonitaf6i22b0av9pu0lvnpstia0dk70w2lepy492kxsw1p99mme2qdeqm7lcvrf5csolr13jtv3c3jmjm43vov9lpdqwmox2b1zhigt3d52waq68ij61jnruzbau0caqbk46xidnha3dtfkrv6ji8tp1oc2hkpf0zh8g40c1vedb63g9lx51fsr42p43f94huzljxhurzadz7vjsw30hhd2ra0cgcgn3u93sbktf0xykg24byel35a6b7zo3vybscotlg19hp36eua2hu6vv8z0eybgdll6tluh7spvw6yu9aw3s7rojkp9yoobnugnojf5tkhdpuzpslzt4hixbcl3ke3m7i4fxkjeufpsy5dirb3sapkewupefnjnppu3ozq6hg720miyqa0wmzn8hr9dh0qxm5jw30augkg3k2edmlii4i7wfgh7jmzvwbvb0q55vd6fyz16dmlwfz7bs44j5w8t9ktp2ym191v67le1ny223236ucvcr6ena5y4y8jhed0aj64e45thsp5s3egx8qrr5wzjk1otq5y9y84rdyot41k6f9kawt67p4x04d9p4lzmr6qkqjqq794ohwtg944hr0m45oz0giz3mcyyiyd2a787i4zbtxsjw19lzjv2x2ovn3gqb1zt7ml0hlocsqzs8ek6tsde1s100vsgze28ieiw8bz8db2hz3rix5fbdwjwq7nfhv48g1hla91zx15fqd55672fs7h9rp0omwpyvs4qmo659jej2c5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'eyy6nn1ztcvwg226wgbk',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: '8gvho9cdsc2rxsr9zru0n7ux4ykvn6a5urn53aj499blcr8eu3dt9hrry18rvuwqv7mqzu452jlj7w7ccpw73t6espnulq0e18lt9uf14k1ewhrilrrhk8y0o5z7hy3b9ha4i1xajaj9kunb3m9nyq78tc3l8lyzc',
                channelComponent: 'v3a2krfmenup2ww254om1rfcra965o9ptueqy22d1z772fz57o4yrc9vvsxwmi1ofvwbvmmsw1raffa4qd4rw6fww1t8j2vs0tkcio72yaef9m56g0gp6sdpzpewsietcleqvrre3f780rkgobf9f3d0rn7mqbdl',
                channelName: 'w6rjagvt98djrr0ifctc9a4v883t773d1hcl8pu0m16unuuatr00st3xzvltxfswq3fjh277oos8zlpsvtqlnef31zikyuunjrsbt73hjbkxzykqqek1ic1reqase5tlvo57n34x6tonfhhrxa2im2i8klndnycy',
                flowParty: 'sp5piwutwrbpwufl75gauluusbhp0ix1raybbn3bf2l4yt5401rn0rtja0snw4ogfqy26ch1sapyaz725l0iltsc059bv4hy3a4gp4tuekpafcbnc6y8vevk6hvyuw30c07a841jyzprwpwpzuct3l1v2mhv62b3',
                flowComponent: 'vge0a62xnt4lgiwe86og1oxg0ir6g2li50wtol0cfux4f0dtku35jnkb6ugv5v5oi6efvujruz3jiphkbkjyzjgg6w6o43scvo26fadgd69r4li75u95ntode36noy4qv9o6b3p4tvvquslpwrf1clkn06l1zn9c',
                flowInterfaceName: '5r1xna1b1wsnpo4fh2y16be6ksvtzr5vva7gczvx5zlmg5k9ezh6g6o1ntb4mm75n53eb3fu2akp615ezyefausdejrwns7xj3v51czxqij3sn701ia2c0bsv72a0mzaex2nb0txdrwajxkcr9jgfmzkwlvufqe1',
                flowInterfaceNamespace: 'bb7wl8lnrap7tfavp332m436mmt1zkv0s5ty1wz6wn8ij1flai6fcmy5wop43hmkxa50yco3xp7jcska9kwpjbx6j1rjvoudddfdge81d9bpkj0orn0sl40uprv7rd6w3omwohkri9xaeb74ljpueellfup0zbk3',
                parameterGroup: 'v3mm4njeezdbhnt10ayls1gr0xmfh68nbzxs9kw56rkmsrush1q6t7xnwbp73lewquglx6ma8sf3gf51gf2953an5u3yix6z7p83hcscxmsfkz5mpx9wst90ddb8fhjeee0ri05f5u410nk6qqvl5n6ziuo6ncfvyxczgo4uf12qi4ly4ps6k3c4gvc5m0xhlfvt3wp8o38ytom3mz0ku9klu60j0cojh8ski1ogw9wimohjc5u9j34gs0xprd2',
                name: 'hp5o46igusz4hss8udoay7vnanqsqijbhdnusnh7euqvlb9q2y9rhkmgmma643ebm50ow7e70f7yz1lg63ht904ftgtizauq5bcq3gdjyr9vdk0kcvdc0aryu0sj6hj7ml06uh0s1r5vc7p5s3kol50wcgxdsnldzierw2pxzysjbjuhm24m7358v7yd07rcvlbw8mqvdtrj76o49ufkvjd44bh2jdx1r8l4tds9f939yz3j4w8hcit54a0pudqmnpepa2sz7esgy90n25ukkgow87rhfv48r6sxfpauv3mlqpoe7rywj3g7ds7qzntd',
                parameterName: '4c908piuxcomrhvcb84plxsn57xdy0k6ctk2wjznf04ekfqavhmsbsg75o7usw37s3mbybstf2ex2lsg7o6o0mqda7oj6u7l009518cxwnh1xwhccukcbf8va1srfd9dyx127jw96qrakqseuvqlv2x0907nkl5z88pql4es8z0rtfugb00ah3xiw7cm6rksydl1jkmj28pjoz81915anmqk74mysyvmws6zmn3sptqekk1u055gwk045e5kmbn9celivw5l294yaw8fd045to5ds4c9lqqmyrm672uvdb6xvxy7igotdjnd3kxfr7sf',
                parameterValue: 'f23hpg6el9mxugxwwuv4yj4lu06c0twygifg0yqlcle7r1unykj7hcx6ec5xpfcie8hekcsue75whr27e3oqdew8v1686lmrcafosrt4bqk6e4t7e7wyyin7ys7oalwhw74kx228lq896o1aqeztzu5gbewuesn4oz34rn18pzyc2y6shih9qhyjwzavn9a3hhlkae2e6nt2et1j3qtjojtun4nmybjqwdynyb395bjo48mdn5q5pbecbdfukbtsvrs1anh9rekdpjl7nmvg45b69nxd6zkuzpcd8zfve3z652yqmkmgmhqmxpn8bsb2bp9h5dfve4i591k5wzhouasr61ileyswfzp2qgeevujrevo8ubk62ehdyx8rbzm3ira7pp6ovgwi36r34zzprbsf99i6lk3647okpslkvriplgqhvgep38xdqz76c19g6iikwq5b32lvns2jdj7ih0hfemsoerfbzqw0lnpbo32yflpemtfqyk0r5qn1zcdsp1ma9epwtspyb5khr0vga9t05uv9lth542iy48nqs7t5mvqampv0u5r8vxezn0fcp2v1e643gj6hodmbaskqj4fndagkfghjz0ydlttkctl0c64o8v54wl932yaowjp2wcy8872g1krphmk9yw313v23tunowidek0g1sbow7xdp8089gwq2ugot8hhhmp36y2o7whpqca7fyr2okicy1uypyrnjl5vp9x9gabbenqwdmf237fyyddoarvhymhcppa6h5t5cv73h21dm9ooifaxn7yfrwan880fvfbx94o0sxno868o8l0ftfcqz5ypxlwxostubs6f4bnjpdy20zm9ce28g75585r2tt8bzirbyqe7e2imsnlde1qlnog8k3ek20x37jaabpk52xltj9iq7ptr79e4ytchnh00a569w0gilkjc3m0hlwldn5e37d62tf5k97midb44q8x6mkjdt8nfc669pjxofv62ufwfzovud5ovi8b1xyshei1vg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: '8nxxjii9951de0lobmfv',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'dk2argip9p93huh0kq1bqjrwxbazvka75q29uyjj5216cf4mhwrcbli77ash9kjlx12qvvlghzrgyi8r5jv9e87q1ljx7m6609a95oq2cdl2337pwy33ra3g8ixg7v7s4rccupwq74473x6ie3xpsyforsbw3jji',
                channelComponent: '70qstv63nzm934ksb85gqww7teqr7bm5nt8vgw8is0x7vmk2ir3qvq2n6ts15vpnu3tpkc89zdmr5qezpdnf8j74atgh1dlifrsfkwqq4gp43zggnrzkgtjtquyum10i93kx9lfbtektf6zhr0o66zi3iqquzh72e',
                channelName: 'svu5qr68ud8pxwhqd6ex2n2d417hkx7yuu0lj6uwfrjmg86sju0vds2xwczeoebf7i3flnhhn5yj60ol1lzsh14sncr0ui1q4cdxz6iu9qchgapvpa85dmuilwtg6l9ejbsd1vz7jkj2vofsqa6evhi5qdss3znj',
                flowParty: '1wig7h3s9a0y219ds3xix3zdu5da8t84wbzjvwee5q82btkj04efcm45lbqbcaqn4sl9ata031cit65u4n7c6rjzbmiyywtvvnbzu1fc3jggvvj0pfd94evj5bu4srt18xwabowclomttg95vlqhuyn1mgn4zn7b',
                flowComponent: 'llk3g2a40b7c3t8oxi71ule9lkri3rk4mzl0llndhqk155gbsmqe8qot080va5sin0n72mblr43bvq0c23fof5s88k2a0gj4zmnspujvo8330baa482ezb0ck1tethl7cgmvpnxleoii0p479ccovibb5i5gt40h',
                flowInterfaceName: 'egvrrlnecjlcg17ku6xvpkwg72rbnvwpz7cupzfs2nkd5eqz8fqupl6fnb2e5wf537bs2w1ep6msqyebgt9xfvrto95pvxmwmlfuieh3grfgofe4xoo980f3zrb1ujvg1wzcze0ueew117t0vzsk5itujf0plmrq',
                flowInterfaceNamespace: 'mtscm5tljlw6qdu6ka4g2jjubgmvdznmslxdc5p5abyphe5v4dnkwm1uirtwqbow7gebjbakzy2obkgkm3y0zey9g141u3tplx9kkj7mobyhwvwzd9gjj5lwojs9vu143gtdyus22rn0uxazurswsfkz67qxdlnj',
                parameterGroup: 'ael7ehuqidtj6isv7nzil9lyi548d50dxx2vk0ljkddpax1b0zpv6r8gy4afxr8oy7t9asqocmm4nv9zk8010ef7mpkp2glz3aqk4f7ege8x2g0gbu4c2gctfrbhajfdg9be9ergqlk5var2wozdhqkoko56riev0hmo2f3kkfy73mm6fmg23s0bpbbene21dl95y10nqx1mnpv37w6prf2ljdflj5cxqwyvwwnua71is90b8unnhrqrq6w3z1h',
                name: '1csnsxwmrfhzibci72d3etyyk1o7bun2of11avuzfrcr68w6ybbufct44rj5ue3saz02uvziu6faie630vp7x05qesgdjbv87iao06xvbhi0fbfl9xsugwdzn6h8xie2lipuj4rfgldvnqmr9n90ummwulzs7l4j0t3bgiooc4l9demrkioibmkqfc8u6pswz9esyywspyrd1zdzk7dpycos8tbwrlzc1imwh8n2sgg877pciombtqxemd8gdjr8r8r7vmu08idwypeg071113wluyz4ll2zk0y2kzi2i14p2bn1syvoydqnffwv455t',
                parameterName: 'a88jj6xrfxm6cshvlg8tfmqh2p053eclhb44vhcl2xd3h0i3nth7r9zt7kk6m8mppsv3qdlb9xxuh0txxanohwc15gifbwto42fdzd5me6vol8y9draclrrao0wlvcy757zznly9i4j912m8mmtg7wpg4j7wvlwco3cczllqcze26su9rdybzi9cy2hmb4a4lloc6ke8txryu56v9uqs9pnlvwaby8bojzng648lidfrzydnx9n60jcf9gmjy67p2opm4cawy44nfuzfaf99rdvjn2bhwce9wtl4kl3imquc0zb1d9f3t2utqlx3fq89',
                parameterValue: 'k43xlzh1f1eowo89uuh8t3z2ua4ksks0e6sphmev930vm4vjj7m99yxz1ik5q26nm27jspns7jtf0hlsxd1m14pw2wvlotoiarbwiyphdvsrbv9a90b40z7lpzj11s3vt4k2fxvl3hics2xxrevn7c1knb55gpx41nj509za0uvei69lsigzxhli2svrz8ml0r77qg5bzg1wbg1qq4tfa4h4x3fbkfylm0dp3oazwl5r076x838bhoayumfhuc3xse8vact9vvbzg88tuvm5bkbjvio3d8gts8rjejns45d9c8b98hy8b9ejjarcnixg8vrqeqxtd6ewva28cok4vkxfamz26pver217gunwoixi2udy6o1ex8310n7rve8swrd3lc6l079zkebqor9wdme1s2q8wd708g0z3e6xsp4yxp8dk2vq560r6hwm3ulx6pkj5g9ki2ih2q8n9jpo9sdfewnst9y3nd4gflgeh645jpn0oe8o4s00hxj71a69ykv1ybxli65l936uobccq2lyzu164gu0ocqy16zvp6jo6l9c7sycm8ve8ju86zed2xt338x21flo1hq994p3811wk5wa62ecpr20dd8vpb90lxw5zix2ocwp5s8hs14ap16ea8hzehoul7w9fboamwjmv3056lw0lt07ztk18oz21rjhpbopnzvbmmzqdss996xnqvjqkn6wwcrpuaqc88qbx40jn5htn5xzj9yw5j7aczxw6bpmxr1lkv2fegzt6ouxaqsdo175h4tnwokzuimxclqihy4psdz3b6x9rbozicesc356m4zpnzzwflmqzxx2a83uibxtzglspvls2k0bfnzuvqyurkjyfmwpkr4x318ggiel77unua4lzi193mw44dyyth4jujkdsn0o1cooy59w31jxy7kan0idzrm6xdadek8maanpv9w440cwuhavxptnjilezc66vo3hxdh7xdd1jyl0apfpehaxd8ul813lmliw0t7a0d3c98w6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'pqkpi7ouhair9fchnm9f',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'p89fyse4n2j6h9aauvc8bf9x2517ty3bmowz9ix1kb92dt7rn4sr9kx7zfumxuwxzphodfkpldcs5ccd19m5f17qjjr1qltenqst4ekjprlh01b87a3xva7lb1fyan3dd85lu99amtrlwrs5cpdm2w9qiexzfd2j',
                channelComponent: 'yec173brbssrowiszckebul91rotsegccdf3prxqwhorywxvd7ig3h76v0dhacb0wzb6pvsqwvui1a7juaiwlskekyq24caqra9y8wur7iop33pa4rbeah1sr4xr08czg39nr8ae3vimdbkeurvi09gof42mcx0y',
                channelName: 'i3nl1rq29p5o59i9e39vgrg84ppclwe7rhkv1bkhk4s21uoponrax2py6avgp6zl92b6dy6lrnsvw4t8nfgo5zy29tceo89087tlrzgd6607jt0a2q6xu57epli5omlxxodzcrtyu0v0da2hbxgebqd50fb2pcmu9',
                flowParty: 'dl5t2dd2g2lyeszayrr0n3gfl7jsys7qsu5as8vwckdl6h0iirdmytv24mvatrtgqof5scniiat83y76s5edx4h4q98ygnlqkx1kdi3nimsxpbou93q9g0r8qy7u0dd9fma5nbzfvufbh68sb03fh1646u5a0h1u',
                flowComponent: '1dj0i0vflgp2rgg1fjwkfo8an309cz2063ae7bo7xhc63o5cc2rn1eg5n0cg3y1si91ex2c9qxc7wu79uq8c9yb8p8811mv6qvvaltumg25u4mg8i2rpi6l5555yb7d94701tmq29008kpltnezjdodarwmc6x4p',
                flowInterfaceName: 'tp92pzzb2ls7qmx9im4u6mnrzeywcsg8bth8a7o9a0sy1zrrbi333hw06sdtxykxfixlydsu1s89n1bxnjg26pfkmzq8oan6aszap2lw832ucohel1o31joj9b4b4hlyp5asa0u1b4ips15ozl19ewvv2o0kk0mk',
                flowInterfaceNamespace: 's53xk0u7c0n6b5lloq0fgvy1cjmma7q1ft5msfrmkvq3r5qwo6f2hrxim50t2kxvy85b84wjoq1u2d8dlkk7p7pcnn3qzim38jrk7z1hs9led85f7l6vft7pyaaptrkmit1sbdafhzr7pj0byete3sc4fkbdbqd4',
                parameterGroup: '5hxjkbq2ff5ao5bkis58wrehly2jdc33n9sthygn4k93e52uewom8g1l2adgj2npu6iouniwx0qqopvyv6n5d2onnzogr9yytt8p53h6aff02ygvhepm1y9jk56d3yujtgthzd9obgfxyxjophnzwbzxw4douee8u1rk5fj02elvddldu79a0htmo0h0j3v26vuy5y8hp94o8nqf5aomlta18fr6wxdbr50fn82hdk3aabifcu31kvh6x8lf8u0',
                name: 'p50lq3e7r3trzfdkp0yvu9ot8u8hp9df2rkktkaflawrbhp5p8acdf29gzl7ensjdyy4xbzp2ltu6q9n1x0nvirfgbynxv34fr64izabo6fvj16tivj8cv0mhsv6uck8w52usk1le3alk5y7yv74nqcl2xdtte636fprsj706n5xh6ro0bvscvc69nhgnomj0qhtnha0p2l9f3m0ssem97rlrpc6f6a3ygwjeowlx0vnoao1e68t2f3k05yz35qkchohhogcskmjs8bsictp9tpodwb41kf381g29hu9qystcyyjnpfn8ju9nut1a1j4',
                parameterName: 'oltnmop4dishxuz4dbdwqdnkt7yok12drh3nqhdk6coht2qrfym6vuw4h5lx0b6dlwb82tcj8hft2vvqd84aciuqp5myxfoxf40ad9oi27aplo2hzzrk5khg668mmhruo8wjyjenuf9jg5pu84lblo3ivnuplx8awb2rja7kh52klrmr76wjkneqprs3ehddeujwh3915kxutuarq12jfqe52fwjz707273n5lkhj1z54avg2pv713fv89goepayzaj6d39inx540iwxbka0vvxs5lells23cnf7hlbpr033jd4ftd1e7whcv9hnjmfm',
                parameterValue: 'nmx3xf1xhjttc1r6ssmf70h2jeqc0cha16lbv0lya2vn44ir9l5u3lfzkayaw8js43b3bmqkmajeyhfd70si83b82oe0i77par7qqcsund1pm37ko4f682rncilkb7qcclvmv24xxe6qkt05umae05d8646fsgovknnioebfcisieclm6xee9ollf551iprn51n7uf9sgobxfv9pbfiorm13ibtmwqzl7kkugvfhv1jjy7yjot04ev8tblsc5fvmylyl2kxxtsoqne8ucwrkavdpc6w0m1h6tgf3rk9xrt10cf5go7jrquhdn2utf3wty2af9in2lrw5updar1ve3j1nyopjtowmn18hdpenzsmk5s8dkxwdd24jtaillq9bf6wvjt4l2s7u7q0plr1mmykxx9hfwospxjq4wbxzhcmpfl6koq2zl4121u3vm742c60s8u6kb7mtv177ghnq1f6zr19x3v78jhm0fop5gfb8wwcfw9rud8hh7vz8puwtnqh17javdru44nexcw1qwmby5t9wq64zgsz0e99hm1q3h7bar4sudg39mvungf667o0470edmnrlqtoh6jomhe8cgwbwatimxt1hk11vnguh678cqap5njlaoll7sjeusvm053a14auwk2ohdm9eczfjt6givs4td9mzy4drzzslrs8hnmmlbqrcpw95pp1di31cr0ske25qigj6ojh2kfnrie0ywvzhikk0qqi79yhnod9xaeyzlqhnat2v06jl2gge1y4ej2vdbffiv2ond343csah3e7po1dfyry3twy1m8vllkm2q3cf1jpmvx8wg4ia45q8yzygxqzducktgsx2qe88zv5dh1m3bgjzkckivfu2rh08atinl7czju0ez9qj6h36kud81vi5qo23v2nxcirclrom5fm0frk7bn3slgds51n1jddosj52v7oc8364ba9v6aeeo2jm128mqwcjeg9f1j18aj05xw0si5w33g3avv12g9gbyl2bmxfi',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: '6cgnn9qttn5cfp3yd7q4',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'sfpxnn4oxcp3yu11nune82hz2ixu70varw90wkbdpizq8wusla2k1uwoefsunjxrt39xqgqvoinecz5x85uftmpbzeh6gptm1p7b40vlfhp14s97zhp022xo2qt8ka18had852se1kc04jrgri1dk5gjeojshxsb',
                channelComponent: 'b4ekydzrglsds1jydulb3yp8z1e2jz2d6084l2xu2uqa2adpfjvf0iwaqo7z2hj23eiu61yvtpwhr4rexkweuym1nak8xzax6rj0hjbo5gr6lvj1rb9nh2b7qtj1n9cncylnarq5yb5i553y2lj2dvhwhrufshpq',
                channelName: '15k3n84yfduaxnonlgfz0ev4e3wunp029kbigmhykm29k9dxh56kqyaktijndhjztajxnyz0qanxhn8u0q4objsetfyrjwgo0ds6cad2vl7cf9j4c4ojdcko3dkqw9y6xbu8fekpbjp6ynt9yr7ji62fwz1s7bq5',
                flowParty: 'ib8v9juh1rzwqy1od8l02qbly8sn3anoofvgijjdydgm8fb1zd95mnc5gool8rnb1zkhd7lwhkcpmpa66t5j7rtd3ummiwtagfhlyifganv3hmvwumcvqs7zzyqru33lo8flj3pif727gho4l4626n9n1ktifcc0y',
                flowComponent: '0y3fyntfscuy1pe9rttxtmz0bp40s3oxa2fro4w284xyaff06rw6nc79hezelvvc82mu03t7n87cjnrk0npbl568qed93f6o08r6d9kompq9if9w48b438rmv71clsxuxq7uqwt0cvv03phi7myibcht6s6eyn69',
                flowInterfaceName: '821gh20gydsxgw74i2gy5242x882cg7lrcxon7k0ojshjicez2fkdug4b1d0zsm1ctyw7cqg7uphb4eukr8mrv5s2o3lcvo2eohn1ux2bzz19kjndv5vj3ewxmsacd61aa7wigq68zi8j9pewcg91yaes0o397je',
                flowInterfaceNamespace: 'jm4n0r13z5e8v6gfpbn00ln6yr5h6lj9uvqentxmw91ljsjnoqzi6j6qolv5vj31wepxc05t5for9ry8bt7c94zx8hb74lw52zqhcq33k111wgjbpbelbqi52geiwd722u3pmpui1tqfw6jxwrr3qdxosyu3wc7c',
                parameterGroup: '1mp93g4jp0i4cb7d7tq7wfrvi25vhn4i5cxc2h9ci88vntfflgcoh5p94jz74ral91jeztj5wytsfn9v5cbu7d7pul86q8g9qyenfgdx0udcx2zwns4n32wtm1coglcet05v1oz1eqrp0vmmn2y43skwbs7uislog4c6wt5gwhv5u5oq0aghy0rj8tpgh3lgx4s8l0u6vtrv1upf3enmtp87zu1z507xojef53jl7d6i2tfyb74umj6e0vijzeq',
                name: '2nm8u3qqzd3tk1kzxyvawbqwyzmx085qkdxnwm74dizwy3o475m4jpd5htek7d3gxsbs3vfc1uejrukcuiigzk32x1ajdhkw5n20j8muazotkt4mypiq2fg3uhsxhmvl3ej7m06w6wbf6056v34utxu8tgqqaaiilzbamknv7b6dlqinrmsvmnigis9t9y3p2qac4h3v6u04y7u9rghwwluhvs3lfa7p0qzsn0i6tgsol3o3tdznzr3ugm79sl63f9upqpuda0mi0eekbors52l4iqz43ofy1gma59oaqxldyyixrjaf0xgxzgrf0onk',
                parameterName: 'qjjyd24lho9t8he9w26pjqkiwjm1rw6aq6vgkn6rnold231h51zqnezv9ljz8nd5ktkfwxzgycwx8owulm3j51vl3cagmlmeokoa79ul8wyy72n2it4imszz2ifr0apoam8rzg6rsrr9vzyn1a2hx3epwov60cew9ma0ghp2ugnakrov9ppldz0m7zymaot76ctd22rqrcpc9r8eenvc69cxqlvgn4zzkp5obext1bb052fqtsl7lfrt6nflqj2ku4cyi9wjhwh4fhuetvohjueu2qgkmtn3g1c5swti5dllho8gtc07oi4sx9dpel2m',
                parameterValue: 'iif9lw98pbb5i2x5g8kwa4meo25mhle59twr1puzda22o0mao9zuk6n5qown53s1esgr0l4ojjrtc8jnak70yz2qcjthf2j0vzmvqv3pttcs2dka1jpdu1eva2ekphgfelwevi5mf0pfc7utjei7rztz0amtwe8bbbpcvhml9cjneq1o2bt823qo4swu8mivct6kxi89fcer2jlmcl0fjj0em4vyauo92bi5tmx25vvhxf03y3eactoqymv0cnoqfniysm10phyg32qrl8v4w3glt00syhibu4r2u2pr9hegd7x9ctqc00yxpov2kxvdfemmd4gexeeaunjd0wp9xhib9o4m8ifbu0pywdix2559bq9qzd5ug2xigu9251wgsd2nlfi1c5idapdkrrzbrt16fhowc7f92nv4xxk78w2utlkx44aeg2l6i4h3ok2g15wmg68u1vvhkdvx950nm9bxrxhrufyj5u83vl67o94gv4dor2peloh9d5m7d8u6l0fgd9od61mvdsi9j7hdpdv9x6rme1ufxlawac9g81mfzertdd7o318t8ip5dtjrrece4cf2c7hb5nbjd7o26cu11i93q1y8wcqn4154opsgfvgp3gwjetxbz0jzrlcx8as8nuajkkvnc5jrxty44k990rmgo3vmh082hxz0lf6k25jep9svms8tepjemz7wwwao96auym7sx8rcnbui2bhlo1lm2d5vto0fujk4f1wefw5ftm3gy35t5d5b5x09u26p4lxb5egoang14suv6jz9t8ttbowo4curao5husauyur9tf09x3rpzi84enx4o9d1xd5a28nwbtcq9txch5mwsflhpkshmg7oyxvzfvygt5e9i7adlcd5kmg942boir3il4zkc16jb3ctv8btqpevpf8a9px4pxv6itwk6kfve10hspbkvpqxfaly7cwmmaxj0zyxynm7vvzrop8vp8h2prz2wq12p4bs10qurgcm3sxfbvh0f5dpwulkm7of',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 's02n2p1psxb3yw6zanvn',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: '32kikvjr8ud85pamoowvac2bnar35an285iaewuh02w9dqtxcofjuu5s2r6a90lzoglygjcf2bzebiu53qgl28hgz1ot3veykf3lskchd87pk4nx12crfei85ug32ecoc4rrhms2nzsptoj3363xscw7yhc9dckh',
                channelComponent: '6kr8a2hadt7vmwzcg0d4036lca9gk8pxb9kn7e9dvxl0869685jyyoe9jmv8j0apujc7vadell2wh6qkpc6lm4aequwk6zb2ou0fcg0qln7oroadn1dowj6vxnr2eumyifptpt53kt7rwwzfb4oef1w8t36lxi0o',
                channelName: 'hwzbtkwn0iix2rcdmne1g3r4hf5ahw8mzs6oxxcito6wvkit9ud7y3nk1of25sesgpi1aet6z6nvxmrn75ouakgk04zrxevuz20dx6kmfwe8aluoo6o9isnlu6cla9i48dlmol2bs7jer6h17w6va9l2onf9ap09',
                flowParty: 'qvwrh0befog4bxehbd2yvmrolpnb9xji17qkcuzz5xth4hyoq133yx9ht29lkt0iznf3dznv478xdgcfmdnpeg9a7w0onusuneqt6vkjtblxzr1of32yuophvdbekycsem7ja1vazfuey3vxvhuyk2bkrcj7k6xh',
                flowComponent: 'n9jzuwd8h7bv2kb8ucfcc8rdvlgmlzr8ont5tyk2ki3nyynyctcqdn99jg4xh12rmg07w0ksd8l1anuqkffp9744ewebosuwp8xxhugs5u506jo9x7hdwl7qxt1xvpmmlb0vl55ra8x3ff27k0mffyqs8p71wbukn',
                flowInterfaceName: 'vyakp64e45b8s853ir3icd5x0yf0p7oq8mdi93ekz7c2712xg27ubzz560zxvli2s2og3xzpz27449jhid6ee5i0h83zswe7y1awvcikj7dp7u6rgshq7p5wax4jhaxwrv755bvmiddq10kpw65i2xsyzvqtzmmn',
                flowInterfaceNamespace: '38ydqz75tby7bc7s2vugqe4o0h9ustsdpj8z5mmb962s6yw5q0zm5yow59h88grf1vsyg1v5f7ckt31oi48adubl1iurcy33oeqvpcsmk5p0g0r4yp97ky3d7mx0o9kjttfadxhbtpw996sp382ijyvz5cwvcg3b',
                parameterGroup: 'g7xfq21i8pjgukr99thi9a2q5ovdlcuo0pon1ayjae4ajc27vpqal81u7itoc5nuohosvsr3huonrn2qhdlyx62l6ie7cd2f2u9zhyg4skzt9gm1k3m4vvxec0q6z35w13aepfki3ntpfgk6gjmdimobvtzgqt4kfiw914wm072ne2pgxbuei9v0sv4qsunjk8bdjl4wp9pj2t0w9swvfqmmnxe4l076mdxyl6m7vk3uysowo4uukbzmeg3dosm',
                name: '2l32odxrika3h99l66jmzi6ksc04mzo9mk8b8fxw188exvx51xej5e7hp8bkbnc6pmdvu242zurs1y562jk11kj43dhoh261deciaxvdf5zfqb0xpv4uc37lh4jk7ypzmwdar8tmsqkw2d51toy3o9qjvntgvqbxvnu3uxchav4z2smtgy1kypk3a8fhypr419q3y21brxzu1homqbbxskv2mnltxz52h3nagu7lukobbwzrxpl46w007l93mt90qlowlkjg932mdpdfbunmzbw5njbma49cbqtt065ds8z6avsd4moheko72vc34kh4',
                parameterName: 'zv7krh34ti0046ty5ejf9kvnatqf27y22h88ifpj2bdliaac8pfr81v38uk7qmm2kwe6ncz76mp4wmf15gjpy9gzsakuk6gb61376vdmx8bt0pvgb10kqx5xovfst45by8m2538z26bxg20fy3n9ofeuolz6ppzitc1dp0xg3vr4mzan2boytd7w2daxrg0q3uznbnhlstf98q6iyj458lyqtdm5dbuooz281kz3bp598u99u2mtvb5co5t7cubtzb5o2gqqyrx6qwd8jrendqz9owdunyvdaizhwgotvas8l1qxmoymxz2apqv7120f',
                parameterValue: 'gzndn8731oyjfne28n56yvnvx7hrgbc9yluub348smu6vw0dzdbzvxfuy44fvfkkn2k76kdk05939f5y5xy5c1myusaweqp85olcbhyl1erwj4m5p8ry087ikoatn4jc65f3b9v9qxiv3h7evr3nnpqh92qoo5sc60ugscz6gksbme2x7f897p6pj81o7nrru088uouhwmmnbolp8w1moqc8mm6846qdmjvwmmhw2ag6zepsyhsbp5pi9ttl6nqxw03ejcp35lutkjjn8jn4y3gp0sy7cobg1njapqimtbev1nzcp6z7al5fymbp81ua091d6y83lxmi496iakvuvglr1vsqode1gwqkv2kav7shoemc9gi2s3a89opg9c7hamgh8vs01yt7tiggd69j0k4y0o6otkp59h0bm1kyg4hy3mu4jv8on5i141v1b2w8b86bwpaa0pn4je6ekr5bpmbo5z4dw3u710kvnt7khmxbf3z5yjsqfcg7o2s00s948b48lx3chrh8f0uwbqevrcvuyxp33h4l1u5a3mdvu22groztfb9t73tmhic3aevaeb7ur5vqy5xyoe6xouub1a0yic84l2g21ujey2conarzyt28081bd84uua256cfmipmoycqqzw60ue44h0kkvaerneb2sa417yzp9kun0jqc00dkdl4p3pbz967bo6ljumm2oexexgn9q481rycrh1qwj3ap53qqa8vq33r91o2o1a5q5nkz4pest9oqlakd74vbph6pi28a06lu5jlkoczmplcabmsu3c3ha3bkgmbxhsw3m9cylc86r5ke83p59uv6yd7zu9rngb387hcsp91dy1tezikv4zpvcdrvoe3urxt99v22vkhxktya6ioj3ek08nxrfkogy32k9hkrmp8tun2zx8psxynk6ui1b36g7cskxk1b5q9pr2c1znp3cc74yqk2d73amirg79672tesocnqm09u8za0x7ycxov3on85w7vil4qjhgyts9mu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'd3fay1sazh1jznuyunw5',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'lquesnqdtupwwlb9hl0kp94kbqa50vmfj6wxcuf14l0iu1e10x7a498dqo023cs2nkqwltdnq38i6oyr8232fuezzcngypahtva9s1o6vb0nl55bozpuobyi4s4a9m5jqch1xoqjxi30pnov9wtr7cn8ngpesq15',
                channelComponent: 'y0abp0r62n7htzii1gqnf3b9htjxnlq7g0rqe5xh5fdalfij4lpalwwczh3h3cqx40gm794keyau2a18pfahuf1wsdf5b6o7dbsi2ybmktci2memphwgzrflpy8q9w9ji84pezmmrti9uaxyfdetfofd3i7x2nrq',
                channelName: 'oqnamps08fos9wl46panxwiq216fyvuifku6p2xwxibx26kwuylils40ne30tke6waz620hzbkqh6zo8zteko11vvcffbmus19l2rl03dgn09zf377ct8pe967jn3l2fai1a1x61l0xxvmlge29lw2vmk73zqt2e',
                flowParty: '2br52nhhacmtygxr2f3cowxx139kwbfhi0f163awdk0kxzug0zjecebmj1jkwrcwo10lfajien5zd782axl4m3isehidx8ln22trmfcppjzr796ufkad5qby97yrlg9ougawjzrrd2hn2halyszkdbzdewtp2pjn',
                flowComponent: 'txi6n7z1ceh6n7z7fdy91glr3t68k4sokf7g33canjzmai9e0tni2om80ccvijsaiiyx3s8ztvuyhlg99m5354ht2xy2ma8qeds41edj13pbaq7ct001mbm8bl78db56e5inf844mc6qbdrevmuj4qs8319hb2jy',
                flowInterfaceName: 'r5b7aq1x36qpizfs5jps89uwlol5qmm68cmrbm7umrcq5sgtknevwof4phpc5pqxm1pnh312qsh2vddoov2shjufykiu9d4bucwobovazob3dcf7oqz0a6n9h63qesyyt2ql4cvuwk9bgde6zaaw6p5ymkr9xn8ri',
                flowInterfaceNamespace: 'lljl45lycpdywj919ml1yni75q3od45yizfeut0id9po3jzf814gpgynwhxr7oog2qu0ecuq3u0w2vkpzyygeb30vbq9pa9550t8byd49imub4chx33b0tfka0j79kx6605hvyi2v8pe3zs0wzx79pmdn5fz5yqp',
                parameterGroup: '9km5c4wkga37vhbx3iqhcpncy2ko2iqmqlqpj6bshnhpjm2kaed1jxoi3e2951dj4pmvgbwm60dn95d9tffd0nfs7wxvvhxyros0jvnbmvu1yffeawftwg92cfocwmowij1khqzyd14ykgs686azuwaofyqoolhwnr8lyrez7s6tz1iwnj61w5h5b061palni52e749edidxkolqx5p643yowlp0jul9t9e0bhujtrvpjxxm9vnjbhl3xaqe5em',
                name: 'pu64kok1prqjdiakfqvly8agg8ad9btajv3v5ow39jdn9gowrqvtj24zu97dl1crn26dz3w42vmr6nm0u90xvkvlgx6u7b2xr4fdddj3gynboiwzd12kkre3s6b39w97cebc1icolnaq2i94qv63i6i1hork601vyqgubrbywfir6dyi2de0liwt2oyxm5l8rlo89iqdxknnvg31ih1ot5r6wvfq4nam6yjqgv3os52o1sawuly6pryleohoh43ayibauwiit3cv7la3c56wgdawe306rhtclz6ghlfy2qn7f5x83kst3yv0h01d6me0',
                parameterName: 'ixdksh36zn3ed83c18ocxwyqp6cxnryobmwp7aryajifsqga71lf5dmtrjconrfzuby7av0wze18xt48s9tm9zm3sd4ehkd1rhc9xvh93tvufy3h8w9vacr7lzoiyiawa0apnoei7uil62xcs43g46ssk8huawkfgx4vjowmn671jxykp5mrntozpzt2l5di6ummi6gnqpltpwxbygsvmmfsknyddw3g60d783t4j9nu1vzqrei8x1gqy8yh9uty8qwadygyvdnrg7at9dlgyp3zx12nws749ghoqqv2xb2xmaqmgp1e0vv51xkrtrby',
                parameterValue: 'zlb9bfjvlobkq3okagpyl7zc751p1o4j07oug7y9e342l5lk5xb15cxb9xy9tcp0f8tcmh2rekl2sni5npfanuzom5zn91q5tbkgfdgjgqsirql840kjwkljn2srmq8vgxa4j2fga90f04turohz1hp2syuubasvdl2226x1axc0y7oqkbltbgodpcr0ig12g88xfa9rnrzgbs9siqjj94dalqkek1tg74tv2gvgo61bgfcmvpr8rugwvumy9x5x423jjyq29zb8ubho5goc81676jl1m6cilwl3q6lk9da9r9txfx5041ouv6v5e63tkzqn21oj2qk70n8n6s9a1yljab7jbl74j25kvduou5j0z7rgux9la52b7gmrccq2ijt6kvgqxi9tbzs45naj8ls0rat77t3yckw2rxti9mn1opan0voz42mzk10hxlq26kcgg29lyoi1g82bdm51pivjbn2u549cznfgy34z247i69qcutrz4utrr66zbzhb3cclycig34cj3vix80pn93xynb9k8xu7mkciwcz9j1eneg3rzthoj2qpziebpl1t2hvynelr96e7zxg8394qwvg97rwn97jwxrhnlpxalg66gdckintaqum6fpyz3qetyuk2c19a89s0udfbfdvetbgyxoqsjoym6sli6t6mptg2x4olkvftq5q39ihoba2iteh9xezrmwfb6tzpyhlu9xrx575f56ipck33m6dltstfwflmrmic6jsz0kqby4briw1p6k68d1bd2iclaj4zcyxf5rr17iaoo2fcob2zem6894jxyj1jfnry4rqjar3z687yqsnbwehtu86lrrx85lwa39bzvr9m1erajd5fa8qzgwx8m70t93qe6rhpsztexoog5nth4h0390wk5rk6452wb017bfjzrfqg2vocs4idpqpfy97mjppyw5zseir5x16yu3yjrwot3yscvhenxysd0svz02isgeqxh3pownp18ke7qu1vu3w9lg1ypcpf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: '48jul3su9jy7ic88vpue',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: '25cvyudrjppovnnqdgvufmpx9r5bc902hdowdpt6k61n6bwm5cncke6b928p60anjtnhr3mq1po21o9ujs54d33kobrihxlz1fjuhpka7ulmsxiokleck0rj8lwdg55p3x4dvsae6hwczcag9whziwcin8hzwo9f',
                channelComponent: '4xgmglmaitlhpsq11hylerfkm5qgjy5q59qkbu3lnjjkov4p1bzx4i5ziy9ogyyk7fnglmq1np3fpsin9ctri4alfykycggf8b63zb6ceo2z5u6c3yya4izknklpcvkcjwb9akezofha5nmswu2q2wwrgl93g0me',
                channelName: '6mnv36qwxtsatoejwssc9n48o9goh36bvgbncesix9zfsrdruxuuk3t4le4fxexazoi0lzo641p1yfmujrrs2d75sruy11fxvj5uwzn02j98kgxzkrbdchqju5msa15dcrkitxxpem1rh8l1d58e4vfwmpy1usjp',
                flowParty: 'dv85bepbqx73oq4hvi5fyjrboeseut7k3lwiv6lseoc3yo41ko92gyxff0mkptkd5akatun8wbrsvfnfqfyfthv7b2svr3m6qjr8pnft9scbyzo3ckhae3srtdyt7ua2348iq6r3ksb3k56pmuphxk56ku9pl91k',
                flowComponent: 'otsezv17lxye1bjpam0trpl5xx6ony3ll8hdkvs7yt1ndofmjt93m077j0yaqi83ychnonx2gzipcmuax7xnhvqsanp1w3pslm2nuinzxq0vs2440b5h9oyalat7b2slhmzu91z7s8gtk0s7kaif9kmcxkyz6isk',
                flowInterfaceName: '3upe04tamifzhbnbg9muesom5dztoa4uyxauirv0zjr1feb4khw9txe11tmqehwsdbyuvzltaw9vdud4bfmr8n8duoerghvblprryoa6yw0mxr0zouifu43yrpcw2xfo0zk9hqgc0adzu5w717wgj5psnq0nxvs8',
                flowInterfaceNamespace: 'tqiltpvbdarcgigzy9p73ymc1npmknz4azr9udg95wl6a4na7mv6pjz3jktmgkvst5p53gzewfjigjyos4xqgowvrfgcy4r5vgkcfvg0kkje6it1tz1ujktjev8asdh7ef297wfwc9dj1d0rh6bwks7dbvo0c42nw',
                parameterGroup: 'in1ppoqxvlbyu5nm262bk4l76pzaor7620qzsoc1lm9xvgr1wsmfzfi0zbe5r4qgauywarm77pmv5awsbf7w9t84bk8ui1b7q2q5ldnan4aqssiklh6tw29wfe5pvygktshlc0jm2lzqywmi48gz9i313el0dw6tg0nm96uepgcer2n9zcl4ai0uomkh0ve3eignwxgaaccxupxz0hpblzlxsxaqbflu1eu1rxgd3cfur3tgnbngtncku7dlef1',
                name: 'bj7dje9tthxlcfsg5ea6n60mo599sdzggh6qrn59m8ypfx5r9025io2mfqd0tir1p55vu31vdprufxolhospz8lo77mivqez052zmnfi19i0f86dsfv1178kfba181hnpssc8ii6c2kwmntstnf9o58qitae5hodz0cpofk0dod4sqa00shzyxhnk6pgrim3a6b0imfmeh7gczx3v8mp7wx8tdf5737z518h66e7n4otwh26gxzuftv40yr8ug92v3bacmv9ifvjjhlxvt4ngewcj8cd7qvn4hdyw5pzqp6howv7kmf9kik61yhgq1nh',
                parameterName: 'h509e65fuc10x69gyim8sdmn089nik6mwd0zjioyf4c4nthgne6z3srz887koq4ywmd5msw5y0dmv8x3o6jok6bgmjp5dladzb0k0wxutwrvdqf7xqo1so6pd21zzd6amu95sggq18nn0beo5a5j2lrs488ub4aayvtxc3mrilvod8hxqdshknxsxgihtww50wpnu7nch079z74p4dese7htpmca5mclt8pljrkydirhqbjig2e4arsa18z6jxh94prx7hgh4fvn5e5b0xglmgshu0p1n8pf2hep2jb1fhqx3awqn1o61djt8zkffxne',
                parameterValue: '4yk04awrs26c1x6iv1hikgn33behte2ehw2mjbke048shr0k99q9q1t5uju503wnq9ykx9ljumoffo59j3qroifxidhiln92fkge9yc56e7m4agtomdtqy1ccz387zpgcsv95h8h7qgc57v46u06bcqs5bwtjtairrlhvrg8c0hi9m9u9rg7tiflalwjyh11fi607xkytw6zh37nmpc15gk4g50asqrrcqkxytpaowmfcxmpzdjicaqu1t8gjm43s5sdrok08d2vvnbbibz592s3gpp5d95vpw90d334rfejiqtke257od6fhbh25x2nm5xo66evsan5polzslzl6aw35jwx5iiz2p0bc9q365wdp9y8yb6zrifqovumfvikzqjv0p0ikzvmcusxkhobrcd7iiin6tzg7tt3w91q9zvihq7yabetsq0plba6micilt5r7ltsn78nha0ufmvgoizmvuhiinr677kbne80qsswyxs3jystlp6c3tcqjnqo0bbri2c5n5eibniz539z0fxf49u82x6tnuwygwfkml6xbkh0gvh2fi2xvivi7hudw96h00jzkmbqtx66quluzyy1ucqi95vpvoda79w2td5iyy79fp60g6plxsuvkgd5abwnyy78yh848yvzn4496kmtaefkjv1ggqaa2aqcwm8kxhpl2g8kbnwt65l0wiz4etwurn94z76gjtzdrg2dxkjg1jhpvuoh22yh2bni6xkihgufzsu7o8vjgzlrvjxhocgjfqdjyew384xl2jd62nxjhofvs7n1bt6u04292y2yao1qxj9nrjcmyd7msxcvrrkw7l9npl7s7yofdkfbkiensmpzdthmdtmxx7rh69ecyh7iaogjk0ri8fyvtfw6d84lq7cwu6esxcmz8yrdxtpfq9y88mjesppqg5jm5gp4l5vlp4iwl3g0hipe129emvtyacnziouy4v65vvyldk02t4o0mko7z5qc5ot73a7pr0cdtl5flguhqm7o6hg0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'e53jsb81ogtreo4z8zb0',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: '8kv9n54gjqerxm2nxawd7urdqueuq6efq3fwudsah8gj5txwx0w0ra65o1jwdva1acg3s8fatv7zgnfmf9wy6ke38hy977v7hk82l77f3tstgxxfh80r8eaggrwexls000whon5641dr3iq2jce65g1eji76zev0',
                channelComponent: '1pdmm94jzf834vbo0zhlht8vkhbjctzd2vmvb7x45nf1hucdqgwh013xz3qoclathx065sk0yzp2txlz9ozkcwwr3mlt23j08ludnocm4smqdxeerzz4fbqip08o91lo30hml60mbttu805d5jorj65xfxc18i0j',
                channelName: 'y5u76hpxbl0uey9vnaew1lcivaf3yp8h66x9imbtye4k3pnvnjkzqepv3uvxcxdzatcw0m8dwmpcoshh2pvu0xxe7ln9rjy4f74ckt2o8o5y10xiaey964c59f50le4udn7iqb9q14nve6dr4gwr051phipvu9xv',
                flowParty: 'wnnb6zpwrq1og8kv4du79g3vsstsm76od7vq7nlqoifl4muyt30qady6g4m6j72ychjc7i6x4np92yhlvzt8g0pxfh5kyqje6x674pzeazlf5qr78dcpnavyq3wtl75x1sfnetxwq883mi4mfcsuah7d40m7hx4b',
                flowComponent: 'uke90lnla71tbleqo8rht2xzdn3s8347ut5ed1x464trwatosbf68tffo1m3zuhbkgmm0i7z0ym5j4co0nt5kiq5js3bz37scwzd5s9q8d6eh7x64hggq4sjhy21dus6y0u1l6rb0qiw1egh5o0rfxzn4xvij8sw',
                flowInterfaceName: 'zs3191ax6hj3rdhqggeqhsm3q9ufekimbrrsiq9unyct1qvh7bj2776keo3zttwsnemd6rsmu8adviqd31ysypast5dfpehcp1fbhyq5abf7uxlk3uctec5jzcm1atsgej0oilpqxoeoqvfb0gkvzzuu2zb3h7jk',
                flowInterfaceNamespace: 'kaa73r3aqv4qj3y36os0bn26w9n91xp375k9bxcod7he1z30zzc0akaclxv0b728vdg0yppnlqx2ayibjj5827akodgyd6v2k9fegaw8raut0z9dv5apilxp4vn0yu79fnp80wjtbmwb0g8pjzlq1vtuqi6wvous',
                parameterGroup: 'z8mlefws43c6vdqca7u97pjhykizep2xr904ktfcc3q2o8e7n4y1yaegxfxv2a7mv61nen4aald48ph0z106m91058rxv4nlryuky800zgr3dbfo385zmt69srh9o5lrvkb18kzl52j8m2ojvy4wle65gurbztd7beg340ex6u3hqmfzmowfl869y89bm81f0r9tudblp22swiorsvskjqxaovskuo9ioj1jk5oh0hz1gdzo5vw5tmmfimckxmsg',
                name: '4ekf60za3tmoviowbsvr5fchbgnfkusuxbqzx0ddmp67vgesth47ri6c8o21meseer3ktz8txm1vbsad3ze8d2w6q7qa2m3wnyzgpnyow6j8h83sjunv760taagybmpd4dbdvx4lxj5sqxvxmhsytu0d5384isvu0qxue3yuoie5k8y03wisawyt8az5coboksyrsr8q2grajjovfzhib2zppf7uzwbl42tsflchb9u92pvijfow0susbqxnpo09cphpo2cbi2ttv0qbff20y90ez4b90j8u2s3dsa9qf3tpwxihm963qinzg09ihgdr',
                parameterName: 'qxeyr5hgjak1o98u55msong4kaqau050o7m8hfiec1sbmx2tny891ovoio8dl9d04zwjaz3cp128v5rji4g2ku5f54o86qhuqnw6v3p6nhf6eao96mte7yphz3d4unxgy32ok75o2ge87onrkjgzr8nhsflyn3wpzwbxcb7jyfur04hot31315q2452yf36he1be5jzuiwxaaqaot85uefqj9ygsf1g90h2pmv4gngik4jpz51ahuz5jiq566uzgyqij6n68o109c1ovkwax0rjryjmez9yc32fd8lep1xq7hzd3w4dave1ks52dmr68',
                parameterValue: '5gr0zzt51ekcbrdakbzyqxfqog6azop4exdlafb865xcqd9eza9bbfzdjf0asqwr1o7u5b9414gwv0ls2n4i4wylc72hdod7qn8am6kop7p4e0w36419uv7lyx7z4p2r8tnfw1av5rd9t5ew40q3kla6qthha3za9lp9xhhkrxwcogblfn0kkeeytmkqn140lhec82z1fctxtqt21cemmjq3kn6fw3adpnifpg34wl1cmiaj8tq388row441fr40neht0zw6ojhl0kfjox0pdm5ejqetmuevj6gfggc27tfye5qkc9f3zer8t4d9tgrvapv3oco31ugxc6e4ul1t6cndbn4sx7dtdmg60hl9xyh3th2avaup6sykmm29sqfbhx10hopehf0pn1fxf7kut0zn163zlkcicxhf8exzdpcpd56g3xls6a87vi2rfktug3fn4zp7bek8uyno1o5gi6vx55j2in0hlmbthhx8yh864plaix2jsorwqi34awvkr9jwjrynx4sy14jhwr17i8fla9w35hpypf3m28ta7yxm0e5ti0ntusgy2jmku5ye83g6hjb4pwr9d8r5irwwurcgyr6ecmar1bnuz5la98fqwek5cy5boh8pkytigqfnpu5psdv7pemc2t4u02zce0aso853czh6ckephfy1obc4teq6yv88zljdbfcez0vznyoj1fkrc20gwt7yfwdxry051rtdgvv8buwxzyslwt5krezrzxd4ugeku1nvkr4kqkjec5xbqpqhs920nw223bi0nt0vpxvv2atdk3c91rc1vxbxkbgb4q67x8tvrzcc5k00ci44ery4u58v40ga1rsneki8hd4m7kgl2p95klfrj4ejl1e1emniqiva159uzi2afkek2xo7z8dz0s6yejk2hpnpoegyzpq6816fyxvt1rdyemsf2gvr2bn53d73bna8z305cbnwat9oyed05n3w6eqht2u9iiwvfwdmnedjc4hyzgkrgkn52vgu1odr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterGroup is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'cipkfhnti9smxceub23u',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'ger1fv9wcufqgfrsauzn8facr6qv66p02aw7y206n24x8iylce919hzwoxloqgrw83gk0e88igrmajkxugltrdbf889sqobvcdidodgc9d2tva46wry8srb52qy7cg54729sk30owtoo1tdr1mimxe7rm1jfeazf',
                channelComponent: 'fhqg03kdx229ne6d3300y27jwmodemusk4ouj9sjmgi963adeajup52y1a6d5kf30hhf2zs7ntbiqycs9c3gtde4obf93mxr1j3wuhiamk5fvec8g37sro404zll10cd96khqt861igv8il6wlfqqmdvtbgovpod',
                channelName: '1idojeesg7xx8f12o5x1xeyvckhn3886yv3o4t9i6bsjixyoj5dwvtrtxjucs20fej1d8yuirebfzfwqfsbuxbdrorqng5maolz7te0s1wnufp35wc3ga7z4p17o233mx6vuttbgcmww1kxap1wcrnmysyjtmkof',
                flowParty: '9jh152w52qsejmhh2jc2lg36v8w8r2fyechqvogy8jxcz5x4ol9vj5ei2xupa6k30agvev60qxham7vd1bnuh2rarbzxh15yd2tt7igxhfbb0uiiz77uzgtu5wak5a28k1svczlif0tausnzgr62h7dwuhx4gn7j',
                flowComponent: 'p2vcxj5asipyk48hqpwwy8ipwmclmxjhf3z95c4k91mcpjld3ghpite4knuwxthzaub7d65fi4di99b0jzsmrxp7dzixuqijt8ukj77v82nw88rih47q3cllna2u3ymuxzoxj4gwvgalcykgtkbl3ehggny3p1x3',
                flowInterfaceName: 'brx1ivx8locvfd47j7tdy9zsnm6gmscuihxb5kq65zddthq7te3fc6keu5am5bifz7rkzxqg7jpmw7clkfl2nknbvnmcd5a45pcio4yc49qslp7mzhd05x7rv4pquxbfpcin82os5zluuc4mvlgvjj8e6sf7ngrj',
                flowInterfaceNamespace: 'go5q0mk7untikopflmwa5aloq7lprrb2g9vx9gonh21oukliug4pze4cqv2a3zgs57jpb4lz01vteqz9z0fbjfem1rmcm4kxgifiac63xl1fc9cetd414l17htmy4t64mkv5nmp3tpyicxoojy3mnjd8i9chkruf',
                parameterGroup: 'onpk3sc78jr0ov4dd5ixf2z0rfzx37nz23pu8foavkdanm6ztbm2iao7k2orjieg34yd4lyfcmp0miuo3k2gaiq62exvti3mgywjuefxl7icd1m10cdbop6mbojdcj0pw9lwp6yswcl2qtsxat39o69mv3jfwq21zys9j3j8cspd0wz8rs4igylb1orebojk6os3yuwwimjas6o0g08n2ces5a4e0yasz2li5bm0o2ylh1z766nsk2as3p09blx',
                name: 'amib005j27prfj4egj9vn77zgka9lyuk0x33i0g6c3bqtn7q3au60t229v8jby2l32d6h1c3urgj6g636v5amotr5kf6m67srmeaw8ov8aaqtrqw6j7f3t99q99l4jnfghsbmedc6k14ei0qxw9v0lsirxczgttmyyegn6u8gcpvtpd8cnde1l7s5zbbbaf8oiiol26xg1qn4dgcbaxv8gezpaxqp0vb33dw1his9us2e9do5wa938bylj3ta8qjt54xgjzash3yt3gsknpx3cemlbonf8esuct6c49ololyh3ic5ke5q2ip7w1gxryln',
                parameterName: '1k2xb8bld6o40w1k95conn2kmz9vsxlwffpxw9vf4hmrwa120en0tde3fkk4vfnla1rdxz3o9h6z3tu5af8wa8ns1hn7ihxsu2a2plr6nuq5yotzl9yp6edk93ic1dbns6tsmdlack1q5i6ddrpt9nc0xtx2b9grk50zizlipiheopx0s5wn6lzzzy811k6ix5gh197hmzydwerc5reyj5vxruhi8b9vhrkkpsv1rnjrh6p9tz53nistmr59iu6k6rq3l77toaqhrcm82bz3uogjzy0n5ibgmdqwyphb0zei0inuybzxxjvjkyy6o2lg',
                parameterValue: '7qawd6hrr5qukmkph4gy6hhnvn6xfxxjczrh2fh18p46qoquqxppyxay4t992rsc653zd1z1ppsxprkbjgjxb0gnxw2kcwgc8nqdd9camzil59mnnwvndvqz2y70cg6ybfp432bntqwwtymdyk37cn9pqfmv3yvpgr20zbc0pmzuz1zr598gndvd14zkiv553rpur1yjt9i45j2is64pyikusbbf7lrjk7mup3bznsmgpdausnpragr3mgm34uuzy63ehc2khvu7swbvxjmjdg64calgpyxtgs3wnbk5bc1tmbe2by7dhugdnovculean803ns33ka1y03000m8ggkatzu14f984ai7ycpu22y2wmpw8t7jbryz3egu80a6r6tkjfsh18t3pxk83ykb7bndubtdyw5wi5uq5a93ay8y6xnro010080dk34wzil9ohcyp6r5vgkp63hwkzcdlxk34qyf62pyh6ngbf0g0sk1njcxpnqt3iiw96ifg0nhvyb1bzecn6lkigpw7p13dvdonhpmkwwpvqkpu3qmtu7472xpn30tv02xj30yf3xzdhn3g17m3g80nnu2a6lk81sz3qt9i325nypaf6qr9111dd2bdh8indqf5aa1q9b3fmk4uiothy72mcmgjy2pk83i5fs1bhb6aijnz79rr8dxpccmwq1utjd96y908l0icu3845cjk2adcn0fz76rus2v4h4iybv86myqev8u7bo65puumdib3kehd6cu4tst0t2596tvmpiaeinprjlmqejul0hoyzoe4t7t2pizn5ufrln5gnz6nyumy3jbq4yawjngn6cc5lynziogz9k0hqle7x4hgty934c6stl17zq3r5sieqcf18gvyxcqpkwbdamus629fwvc3b8vpu2hpxttrygqk6rdka0ycui10t0hah0i0h3u41r8cm9k1jhxa2zjwio0cjeq0v9cyd71umlhn34qgpym9plh6evql7cbbquejdz0bhsaeao2bfps3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: '4z1dl3lw3jq84pz766tw',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'c0m6hofkma9pfppabusgzjqj3wowmmgvr203317b491tarqtaw7xtdyme7a9nn410qbe63kf02nhyd9khzqj5in88fzrrjr2r1zjimtlw50wgx092tv86t8kb5ue5a425910y2f3pebgj4snaukbulj1dv5omq1f',
                channelComponent: 'qelv86adw1gz0nry27zty5zrvzyzt8z076ldcdis8ie40qmmphd4lt19talf3zymrn062te7x1e6ppb6xr3xy8ah7x7qdjzjscxt6tofhgvtxpnoib7gd95odqkyqch6wzr0ahv12h2rsj647xjaw30qwuxrwa99',
                channelName: 'aalcy12bun382e6bdc9nfz8kamdnznyt3dyilglbzdr7pes8cxm9tyfkszc21x3ecfm46ih5kc2gy8ctnl35s1idkllfbhx82zel2hrnyxiwvov89ic2bbblv4ofh040plchyae8ejtqmpgwh115cd83ij12myqx',
                flowParty: 'pqcwo3xt11bh24oocdbjv57p2ybgf6ybw5ii2u468wewyrzlxxr54x20ahf0eo3grl7xogsqywlzm3bkabmzp1dp3q6yogzufzpwhnnmwhznzcwzhmbtqf9hm0a29noronjwokfga5v3da93485tkekllkqibuzg',
                flowComponent: 'qbk2irg6vgot9tsxvflrwfjbdpgc48ij7tzwtgux7s6wi2kkzyccvc2swlwep1e8jyhnci0vjki40zk0ubcd7lyv88c20uu8hnnq5srluxz7mq21k0fff5spwxbxkrhn9f2udk3nnu9cvrmlhfvqcw0asyiqi29o',
                flowInterfaceName: 'qw0slqbu2csoqkar7qe1paidnvedhzlgwg0qspdswbaa98kicub17vbdcw096ryukr7t3ufyyedy3hsikvijoz3qcyjjz75wtp4svl86wpqbxvlkrlgqg0lgvm03gn5fwdvzgljpoy2oyjo7csvjghhu3gt04bz1',
                flowInterfaceNamespace: '4duxcnesfthu53eihj7ao3hkivm445v71zulkw0gppidnp2h8ygxjizgz7uzg51kbmkm5zsiq5g6gqh7zayx8wx4kk0s6jgjppjsrvkdcqces1uvfjc7jetu4llgiuqfusz0d0o3v8uu6ljqv4dxxkjiehatdq4f',
                parameterGroup: 'afb4ijs5pf2by4x6y4oraiwtjorwhp7fs2g3ctg189hppz2hf3xkpitjukzsynlrb8gb250j04esuqeuzk8yse18cdfd3zaq539iklkz6vjb3cn38vi3sorj1rn6pz56f2dt98xt0gim4t6eezjm9tgjtnlk1e2pj22yqri9k93nf4ouyg1mlwx0nzwhpshbyhmxw5jf1kchnh9ffc9s7cnkj35oq6cqsxh305n9zaqpgd54o01553ncoquf6k3',
                name: 'f8bqwc8epx8t7fbw3o5mohi3udg3fhhxcc3c971ugqb0poyolubz74eze9vlmgnzarha7th0ht965jadstw1nrv3jbxbdr9snvjre3auf91doler1kcnmpwrvf2k84nljmrflzyjmhjctlvekhphmrjbcsuir3kulpk7tbjxgqqbfpd7a03gcccny7hgv5vo9w1fcy6wbqgifdz1asnax0ztbahoslddj4zvtq74kqbxoxaoq31lb0v9qptp8jk1oc59hifij7wwzef1rbajc6etnhfnh41ecxd368qu31mnfcxcq12cgh05qsjppz2g',
                parameterName: 'hx560sj1aib654tqmqlb125849ndddcsav16no3jgiegn1rkpph7yj68wgd9e0ygr2srndg6ll2x2zje084g0axdadzfjtd7u826iameyiin9xcn8krddzh3wfot8a1381r9sb2eoderyr8t1aqs80x9uagc90ibz8cr1186iv0wabnvpwmy27jvska5uvlqfffnwliktbhvkfjw0322393yz4tnbn6on65jfb58gmg1adnp0ydt8sb9lawaijkdov9r6w44np1c36mth21l97yjegzl7j7po5rfdcgygsdhyvyn14w93hkvr7i79ctez',
                parameterValue: 'zfxupotv05529es6ea1l4c7ot7r8wpiazq2wlpypyx38ykedazwepzqt1ttvznbwvu90fh9ynf71wcn76sbdupjurgfw5bf0a215x3it7st0gqnd97tbay0883hjxrhqpx85pio8tuu0ayn8xjrolj0b83xyi53ohwudjarnbfzm76vwoob13dtg58a1ugvhd36u7z5ohlwlvcgwpkryj415w0q7kpsi74e3lzpvk133kmqqdrk90lp4oxu6t5x8hs7evdqevv4mqkv16uhk4o36bur9hsu64lqllrrcskjoiej8c029prf20ieqd92v461xfz0au3tchf64xrrtzzvrcrsyrpm3x5y0asia86rer4bdaln0tr57mnpw9wh4264jk8fr2tyaqa7fvvam4au0z8lu1m00064t8zbkphlietadqz8vbx7sa4gv9mo288lsukjvta44sofaiekty7afkmn1x0hxmy0prez313x8qhhdocltiygca2psfp3i09q7dx2f4hwyccpv1fuernsbd8a0ghdhm7bu6h1khoxysjc7127zcfgkbm0sgz92ja8n02ni7xbvjz6dfg50xnjr5bo3o0osxv0pwyj4eqt7mdowxl0yzwryly5eyl794m2s4pdcbf5jwr8reiun0lkwecrk7nfmm7q3yv6iesq7o1y2xuthk4eraflljd6qx9bo70gz9tg42owpqwdjt33rmpps3dllfrhs24kq35x1r5ja0c4gh1olfyu2w54umnu2pr7ev9b8mwix0z5yanngwusgcs1yoav83gs7pqi8co6n9wi3x8n1370vtrc1csksgd951eja9fhzvsafctkzkpwinfomy0dxv1kfe07dds6zni2gkd78kitdufda4uolzc63xdvnmu3uqmtxnaf89rgwyiai7joq37d1q0eckr3i700ujv0q35k0mcfajiz4daeb6nv7bdw5fcdrjg5zs95nxlypv6pprpmasn97m7ufj7xhv6l6jzh7y4bz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: '8ue1yhm85s4lff9ka8io',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'xirjpxuureoe1283cw7wzengnfg16qghyu4q0rxextye85k90lieloyvsz3tc21ak6l28e80gywe5nky0vp9p3nbsaz1oziv25ycj95tuj475g2eiij48nl0aov007aaayyjitbju68bb7sg4n5bbmvqqfwy0pb4',
                channelComponent: 'zxtciywpge87dyyw0ohanpdg0hgr8ioj0wjvvr1abk5a17s5s3l21acx0d6rgk87eqodrgsc5y763d3sqw6sax1rdmrwiypfyuhyhxwjrhcdrabnq1wwlrmdtoiz0fkuqksg6o2tku68lfprlmsks2bu7t80g4tj',
                channelName: 'qmchkcc8padstuee2dt11rler2qipv5vkw18r0bjncifrwrg9syx2c9qmf00zbs7jbw7mu8mo1zoqpgzv1h4b7mqmvbkus06okbapwb4e8eh5odux3rp3q90i3qnvujlv7yxrjkvji2n4xuh2e8qym3lx48hmn5o',
                flowParty: '77w096u80nz8n0toptya6kljulkoagiiu6o4btdmj2tu8l602aazks6kajxrvdwc7jz015i41r5ylrn8go0qgc8lq38v5yqu4nhx67cf9vxhobrbc55daeiaxm2qbwj3xhxa872w9srz86p6vf2z3ypn0qbhiktm',
                flowComponent: 'iv3gigdai7qk8yqfg0zd221muavv4dtnu30abnc6clwjuubzz8izhmmi7as61877cqfbx3ejz8rncpc23c80953k9nj4hmjbarsfpvdmmr717y9u04jxafbnr2ustnutth6i082zqtuvcweuffqpk3t95lfttcg4',
                flowInterfaceName: 'oia130dhguxetehy47i1etd9qmih9y5s4f4atsl45w3ycw4demxtd3jt7x3vu037fifcj0oj0h3k93t2x1esyv299m3n63m3coqzj0h7w8sk0lrf1ci2o2rt879xc03wzyammedig8o29ol2ula82f3p4bv35iki',
                flowInterfaceNamespace: '5robj9x3d7rfy975uw8anaiu52emw6xzrdbguqu8i2p0ghdukaane7mik5ibbz3yxyzdzqfpiknyarlssx2gyvh7y167r2gbl364pg12zh16s4jn5gba15p53d634alj6a1g1aeqnw3is5fgrva2dms9vwxbvrd6',
                parameterGroup: 'iiy0gpfeuydvr2zm7wc7vqbv5e40m2ym5uga70al0qjptsakjfargbjyovcw8o3y6r8ltmofdo2dywzukocke17ih6oq0dli0g4w4csn7xyhhsgl6bkt4z1saua6le8yiskji9garj69wv3g6lx3upmxkdilu3y5x2u9m509yomvmz63l8vfady7dz1j7hxmv9sx7c3znyeu73xj48x0fpnw40260adzrzpxg4qnsdn3qzi68jw3x3ocadondps',
                name: 'yc8rpmhvw8nh9zatep5wtu12xh6u4x2a2735k2nievoyf94wdhcfvua1ygluzs1jgi1qvixphzp42jfrxauxl0mebtocl9gkk1r6ci0sld79jpry69oydshjll3p8k6pji1gsa598sa02gp3v7iwyo2n7ctju7i4d6q9vc3oqga7y4nhcb88i814fxyubai747svq95yf865iey3sb8nczz96z8fullb7yz1ge4ka65nu3cx99yv6j1nvsdde6p6216i9njpt1e5n21ynggr9s80hxx1ah8472jl8wswb2ufkb8xzfdy9apx6x7g3rvx',
                parameterName: 'auvmepxoc0674yvcmg1i81xruyvtjg26y21opo6s5u3knytc9tbjdkpael6182dxzyqfs61sj6bavckhwrssefu8wia4yo2cu4kziod7tgrtmxl4hqvxss6gafdm2pmiy40421lovczygcrgforvq9d4d634u4xslq3o3tegzcdokgeykyniugl3jl3bc60nd6yr50egk50g7yuotojpswm4uhhjnn7rxkk8qxbcc3lc77y030wu19jdenwtuincz45kimxsfdv53i2jbbwk1t8qhzsx8ircjckaj4a8xvp2658gdtjgx5slnieoz3hh',
                parameterValue: 'bic60ru3saapsetw4oo4wgl51kpz4xpu545sqe7hhe8orpmm8wnreghadi0ksby84rnniame5i6g2jqr1vuhwtjkj4g80r8w5d4y6qh30z9wt322mc1lpixflxyyc0n9wd0x686z4ao5isn0dda9fjm58s9ibf97fuj2mek8b4w39wh38ypdoprp8jb76why8bwjs8cpxpyo6qbursk9g50s47c15zybyl3svczijubc7o5g2ijrxl1c5b88k0eeb5o66yj9gryw23ghcza3q4nh3wbjzc4c6w9g22hoj1sd4snn89c3o23puv31uw7fek1idotuih6p9hjffl502h2jbmxsjcm7hzcrfps3oaw3lu9z9kz1r45z5h0xh0an9ffemtyye24yfydis0qzvgvjo6u8ts7fr8bzrortroesejfusdzedlsmgbpxrd9u2ios1p86bvj3euny32vpnbo24eyweql2qdqkr2lupif4m9y42wiaa0vvqn1kpt1s85ni4l5y5i2ojzpairv71yxgnyyf00uup3km6z945pwm15thgr4xw1zpna7krudtyv69pqa3jbpboyxjq7xpng4m0sij2hwlbifa4vroio9orf9nhelr6s9zsu5d9zylq81cxvllu242a3kex6mjai8bfrd28yvuq5mk59rcd3it2ahjelf3r73v22xgc9qhzu2gk541713xaf069q4yileb8qbwcvx0whwc92ra112sg14156t92ls0dkzh3loe1y9qazp0f2g53lsevcse0kcb3zq60yrwp9rqmhlc23rr1ecc2ybkiprxdatuip9mr4cxxdndp8qhz349ttvg3njl2v65xy4co54oualcz1dgi9tw6ibnwjh6s04gve8yalte6p6d25albakig6my03nm4c423evdo5fha5q5m16tyjowxfta015hqsd5jbuanckf6nycjhni54e4dcpraivxbm3o8i1blbr7mtbzf1rra361oxbltul3temzj41zo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 1024');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'l6vq6tf7opiemqeyi69j',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: 'obia34d0yg3hb89jwe1hfb6hcozhi1eb04zzxg37jate19d6y8r0964ref8ux08hr8vwxbdwrlscipk0p03xfnqcstzdd6qoy1ckps1e4pf9szkyndv0i9u6pnxopvnv0gxxmp6bwj7z5riqv7w5lzwvuulinw1t',
                channelComponent: 'cjo2z6c75m80vne8fzm9je6o7zi76comimm0y9rrq7ph7iaubj8aibpbmotj8na54bw456oxh5anvxsqj9nhtnhmju91irgjmqjl7xqnvbrilqgdwvnzcgxgmr8128kfulqnprdr7ttf3qdkvf5n49gopmqwpnoj',
                channelName: 'wliz1bolpnt2odyu81v8pqnjb5gzsyaz5kyr5wb480oz9tvhusckl9cewxldzbrnyw1upqa67rasjp6e7h4vv7iv3a2onkhwv45q5uynje0tfo7kjlbtbiq0d6nhnclwg73ovfox8d4rkcyzqc45gyxwyxkmr6pi',
                flowParty: 'be48c6queumhird4d5pbgetkx1eki6cqpi2nz35i6erzhgooauve5osb45ysqa13lnpa2oqj9neablxmflhfb81f3eama1gexaj9u5pvdx04616yi6c98shu03zk9sxb4nt5c12xbp9ctvfek52bhhzs5rpdwsnl',
                flowComponent: 'u0iylpqsmb100l1rftvvb9xxujal8yu9qm8ylpmjm11px4vml530w700m2scpbxp1bvyndc276ytot5jqw9rw3sk600txfbhmw510s8debi46343w1ust212oz2jv35mqy8suitu8enj0sy3mjro998ohcra9s2y',
                flowInterfaceName: '7xe6o5t67xiij8lwlorf3n9dkfiwvreygdtopi719g34ex3f16dgbok5f4bhx7bh2q9h2q0allrieklig4gcww7qjcz9nec80sbbyl6xb6kw1so7lclnq9ck5z6uu8gc3jthzczwkixx9onuhc3pczlm6f6blreo',
                flowInterfaceNamespace: 'qohydwn2rwh56tc63xy86mq2180491gfrmb29wrdryien1crvgcchzwaecthg7vr48pcbbquhl3bqayzqyg2r4v05mzos3yb50qw6wmayozy1ebttw53ljuh5opqm5gkk4y1fap4g3l5jz6zswpyj1b2bfy64xbb',
                parameterGroup: 'zv809bftsgqpa13h420ftpnn2iulgor0uf9kvh6j2s1pzxhow9xtddej03m8d9txdvcgsu2q125zwfuc17qxs1vppzz4b92cn11bg1dcn614oct13nfl1f4oabeabztv9t0bcrenyaq8bi0o2ft2ivprzv52ytizm4scex5e22wmqkx6qwhuny2oyz0b313n240zfb8kjz5r8uz1d5ze2kzs5phefbcgja5osx9z8bnoimhp2z5q2qs3p2uaxfb',
                name: 'iqotwfqpk7q8zzjzili2qbpbgj0ekc4bkp60spcwzoo2tfpwa5du44dkeqhpyk48yq5xkwoi6sfxd9wyw82tpn8vli63fxx1zfo8d1p6a0r5v33r473rq2gfu3b1hqlutn3gy9gyk6867ulklgvinz3xdeph1ql0z5zs7rpbqdazx9n3xx27ekcqcvuscxuz2sxcim0z21k64tqw04xyftqllweojf6v3iwhlm75fs4cswa2v9wnb0ly9mdjolt845ur6phacld4b4ryrtvdyy8zdmw93utc79xh9wtcvdkmaj6xsdijlcb465rcudwr',
                parameterName: 'xyafsjnzs5fmvx8ionx38m317m37saip94xjd7cn3aoy7ovczfmxw6in97l2zrca9l4ioqzbzlhhpwimyiuusg77dfqwiee35nuj8i82lv0moezu8hjgt18bgnxr8ut4ib3g7xpi3fh8bs6jyr812vkwmbbmqk1iojz3wpso872leosbfvdxw9oxjbf25zs9k6hb1pw2tx6s33xyit9mk8c0exisdox34cu50f6jfbglbpvsfdc82qak2i78xfp7a8flmcqwzqysplenvitxsuq5xg8cku7zju9nxeh2qzz3rug49thvo3516exyx8to',
                parameterValue: '3rk2t19g81pkzcoyjrjbfnq65ux25vctciu4035d3hktgepze7332ver0c6qrxyzes22vp1pbr40dvm46b1vj75r7l1n79qww7kjaiadci2tpkuiq9inant3xu15b08skl1xjdwacbjzthqvm3aw32c8smg3003rx42ipqc73n6ruhj4auppryegv5b4qqk59m0mmqvmcigoomsc14ypdlo9odpjl5c0bce262934u48c4gjoncm1tobv47ocogdm8m6nudc9hc9966gqk5scrpa7jgp5iahhj1k3ydov97q0re5medq96q7njr4g18u3eqp3zp810c7dwgebouzt9cpurwsr51j9q6y8tof1e34s3buyn19m6niodqv30s0igsg46g610wxdrgisc3pmyxoq4lwa0dvehnltw8jwtqqo673372jb4vwrbcorl5talu35fj3luihyxybfj1g4vwthp3p4bqhebkxxd3tyj0w8monlkxu0bwx2pjn04ndvf8y5tc7635t3x0ymukpbhrbsiu2zvgo734b6u0yfs3bn5onmfhwjfgbs1i76rcaroac49cuaka4faql32o528cxksc6laurmjs55kbbyt6cnrm2ho8k0uh05hb5s0ik5wfxsoo6158jutnmn0nab9177fw0f4u9kedjvstju39ifw25i7wde6m8mostsa60jmbh64uo9sxwkpns15zuprwf58kb2iqi7xkow5wkghpx2usdcow14vu77h49m86kkji41ndrc2hcrj8oy3fs9hjx658anwp3ejplmdusk8jyrkpshaq041x2ry4k15cjqkx1ae5rfjkraeav9cfcuz9geker9ejg3lu4f6nans3lcwlsk8ww8d43nh0yrs62qltpbl3jtpr19dyaknnucetuuexfkntcfvlw7938wglx6bewfqncmq1v35c2okjd4noucb9r02tgvlo122nyv018ytw5hrcu4tsyhbcq1phnqhwb820akwa8uejk0r6n',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/modules/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules/paginate')
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

    test(`/REST:GET bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
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

    test(`/REST:GET bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'bac4e3ad-e299-467e-b9f8-81453a5badc2'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bac4e3ad-e299-467e-b9f8-81453a5badc2'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/bac4e3ad-e299-467e-b9f8-81453a5badc2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bac4e3ad-e299-467e-b9f8-81453a5badc2'));
    });

    test(`/REST:GET bplus-it-sappi/modules`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '14d0b7d7-987a-427b-8c33-480d9cb1f079',
                tenantId: '0bd65cab-87d7-4d4c-b06e-6846ba0efa90',
                systemId: '2297e1ed-f153-4815-9ab9-d008570279ce',
                systemName: 'd5an47plwwdoxrcvkat1',
                channelId: '5a7d3827-d8ae-448f-9554-8d4f6c0738d5',
                channelParty: 'lkzu5qxj9t9qojix0yfz72t6no822h9od2hu3h60pxatsj52vg2p8j33ohbnn5pppn6joq2actpxo6b3q7i8no6dad1hur74a3rfufv98dordg8xkpy709on5jzfr5tzzuws2cqgpt03fqqll07hcewhye3sdv7p',
                channelComponent: 'msicknveprzj52qvyblecbkrlz02dwbyblfv764lxk756ic2gc6r8c0jysd1qn6r86n65bh1we6q3n3zv226xk48xhmcbamac3ji660bd9hszsf29pthk9tru652fhp3xghzq5zf2wa5g15c8iy3jxvowc1jqmk2',
                channelName: 'fv8a9ssjeahtcfc6lme9a0yht57f3byijo5pgx8v4w9vr2sne2mmthuhsnq1cgna0cmtq0m6o5x15ukt0wf10ghn7st9lw7w60znlijqgnzval3pqv2vpvzdu27tyoju1uum4sgjwd09kalzjgbtzkku2aeeqr56',
                flowParty: 'nkcp1cpltw16pmnvfxvud2tqwnenutum3z5t63cz5cupiyz13voq8u3vc8xili67v6ih4hsbvdw716vfsmhscu3liuc86ljpf1p4omubhuy0hogm8r4su3ek2gr4qwxmvtjyupr5rjx2q9tvlqhx172ua8qd1da3',
                flowComponent: 'a5r57xel04os3cyw4hgf86qxit6ej25rxuxcqiyv0kcy8ouc5xfdoqcwi367pgkzwat03lnn6krgatuehfox31v8lli2bt7com24sgr2v9elvnfwwyvvuvpxpxaf8z94po5xhxn4xje5qqixh00lykvgmp3y7jbq',
                flowInterfaceName: '2pxlhz1dy5a2b3mslkmytokpkwkiw3jz4s6nxis0nnpmyqeoa1iard2kwxb92a15qqplf3m7kbiccibggs5z25j5j5f6c8xkc6ghip4ye6kf0r35m6ms8wgsabx4g7g6yimheyqazbwnllf7zxfuwevhdxh8idkr',
                flowInterfaceNamespace: 'djai47fattdtkr2yg9m96mezixumiz9gru607d7p7bfu0rc2tc27vmsf65j0hnzg0a3r6mx3ykmfkbmmwrydfnadroykrndp38wmy5o69mbmzvb4ezdf083mpl844ucjdaaolnmh8ey75pbdxrjihnamknj4513x',
                parameterGroup: 'gsxb3h8zxkffh4f3lzvt84nxq5yx3pmftb07uqt9h6a4ohqfgissnnjyhcqifjl6kumi2rivjwupw6m5ka5keoc68j04yya9n2jnp4xn1dzrx8q0bsx7trmqecs4u1rzlrry1g75hm6sasyy8kt1nwbxg2bczco6h4velfj0deljaejqyu2d63vu9wy9q18pvtitk7vccx4ceexilfpy92hdyob69er9a0df5f835ed7ul7imopp119omg4xcum',
                name: '698rj5t0ljt885o08xv8btbbzqvdblcg2990uxgsmhcpn7hrc8645qs26j0mocih1g2nwb284elzmgjushvab3q9zizqdwjg06u7ojrjh3bsg6na7fygiunl5un9twkrxn0gz3ptt565cpllmx7yhe6nri2zf1r6hl9tkdhi6vxp090h6syeu0az8cy7kfcm2jwtfqbowj33npa83wf8f44sdga2yvfybs5rp58ewxhxpnbv9qfgmngd5rttxsa02qc90k574tve54my10bpdfanxh4mrzeb52rtmg5imuatapn5wzx9w58nv0txonpt',
                parameterName: 'ch23i8430pukbbcliw0x2pyzej9ea86lwjtw2em8zofdjpbndzvfvj1smu5a5k71oepyi2tgyqm2s0jzp5zu1cperb2857ebu1rm2s1mpmbw59cd8cet9qsi11d47bxtabo176bm9eqbzk2ayy0e3gygkqpgy3p8jyxxwcs6ujikmkrdymciigleaprl1o7u87sb7awkdqo0r77i1we9oj1kq14xx1li1sbaf2o14qcddq9n5kq680gi6go9xeziezk4yxzmdcqtsjfeybesd9hnkto0ek01e2l2vqcrgxae1mvtt5tiqhw5uc82jzy6',
                parameterValue: '1ym8d3vtizsd92zv56ft7a2xysek4m588v64nbnxcry9hrtlb5w0ayjf16cdr4m30sq5aficcu617h2k9co0ts2xy5frcssgjux3ygnkygdesqm8kucuu45sz8j5zv0gxpp7juwxurpe2fnmhgdo8z95q6a4docb7thrukw8bf1p4fwgnd48v6u9ic2pojht2bfcxrdm00wccydfkyexz63cdv2swlkuayzx75tvgut8g0nnuccd8m63qn1iyfrubezn3bq1zqg5n6mdjtxbbllwzh1y1vx8xlf0ysalc6vi6v2qynmg529e6x9nxjnezlulp9sieqyyprgp22egkl79tenudemh8hy9lhok28wdbghzpu8v2rknzdr5osfiew42u31mz9o5gxtemdorxtbquwnk2occ51hsqqq9yyafefv6035ljjip16ezkmh5lndxk1t778hhult84pxrnshozhynn1gocle2nq88kt17cvb48zgeafs2vzb51rsn6om3x4ldy0pugv63r028duzt044kz55j1ldpw72jx1bppverz2pbsh1oaohfj1fm9itg3xj87gsfz12l7dm6tys9o5jr1ojdvsg25prpjxo192bnniensrgl5zf12p5gxw396l89kt44fi3hq1h5ofsike681cbq07n5vxsx3wmh61yovc76gipvuajx6km5z3j3nh69jcm47l0e5bbms9faxmffz7r6fnpw22chkoslv53k2gf1z497wu9lt689lip0y5evqke6lk2wk569vizyeczwwt7bc9lbr0lp4919lellvl7kj9bi1fle27srmxe6u93dwxp0xu3tr9ih1l18bb90495vnlzbjbxkuqqjdk58s0hfep0qg6n7ucnxe86aq4ps8oxzrfnrwgehdi1ao1yrywp9e2l12xzpxaxoz0ao1o1yz1pd720rxrv6yp83hhrw2zsurj2ehkxldlyopqc8didc9ffm82lp71e6039ef0kf9wawma82vxri',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                systemName: 'miy8tjdejxusrrh4z87j',
                channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                channelParty: '3gh9fik8noasuf3ha4gbzgrni7v31kg8clty8e7b089jadvd4ayd9k4ud8bcjlrlrekeedz924uuzcdg5qzydongxncrblxkte9ubf7ccf1py5413beu0nwrf6jrqwrhiaux8xwqx4mc3xirtaezr34iokywbyoa',
                channelComponent: 't6gs2x90nil4qtgt8ohiysnxc7ycvni63dpq2codhrtagii356djwsgy5qw6kiwoykhomjh37wd5al7l5uoz4p1kj2q2zfa6n2aezxxblqzyksp7czo18ugi2jxg0qxe60xqbs182fa35dlnhs79yvjsv1efijhd',
                channelName: 'wws69mbel2b6b1672mrl2bw4x4jy6553u96v34nm3cpg2ms19ht0wdammis0c42t4q553tiakwg4781pnqfwvvmpdz9nkflmiwp7yni8n68j8vegokk6gwkkznqg2ih7tcx19yr40s38fppq8cpbewwmk4igzbso',
                flowParty: '7mzr1u3u689egq9ofjuxtkapfbt4klvgr19dtn9xuvsib8ce6cthcp3oqfa9kbf73i4i3z0gov6r5k5srrvi1r8asxn1583ptr779d27s6ehanmiv5wcs8r495zagcasiq54dirtqnj4dd1tkz4x4uajbddw958m',
                flowComponent: '0hgh36x4els401pxioxde700de4gviait8g2yhddkhvxjfvbvnzqdeuygdu9ws0omjtao80w43j3gmw8z762z0mwfom18ledk0j65ejbtw192oo0o0ghf51me8ogt25eymj4tukqqxxnbsijtl7h0eeslggchb6i',
                flowInterfaceName: 'zcai3w1m9clwltbrzn2z44clehcn7can22xi8q8nzrtkm7urbr1qihae2ysrbophbom7l8zu2guu2eyt9qk07m7jcgdcm8fsqolj0t0dkgmyc16vjnx48ua24ttk8c5v3xcky7dc3lb3ayo70zxpudmzuo3znceu',
                flowInterfaceNamespace: 'un8ajbykj2uijzevx6xwtxy7wvnaes3y0vxnfs83i2q9z7i67oy3ot5t5rgb2mw6pa1hu29oh9znloblqbd41cqpjgmsa7wk3slbovvdwuorojol841xoiei6rqs5jcso41isbj8k6i99pc2hkyfziebhtw9y726',
                parameterGroup: 'cbuo1en8a00340rjs7h0b3z4exzze3i92wgslwzxsf6p91o825cvhn7aje1cypkv2zz6dcknt0uuaba0r9mlyxq4dsgy1pipp0qpkdqs1adf3230oqpfdmaot4d9xyu52f493ex0m18ti5l9ewj8t2wo55ugs40v0m1b9u3a90onis3fsob8qm265wgv08ggzc23id2xbhidejqgdrb6ae6i2tgkordbora9mvjrzby4ueiz00ut0m6zw08y46a',
                name: '5rprftz7r2tvnmbb05lge1f1do4r6g4k2w6us627tm8smr6nytmnbzrlv5mhuum4oq89wstc72o8mmdkcc7ni7xag05r8ge2hk3s8pgeeg44lw7hss0talhlv7e5n8rm0qf0jh8x44j5zxkyzsd1buv75bvwhfdr91bcqhqt3iroxt435peb7504jumv2hon8x4ugdjbg2bmnnh1h49ib5myi61uiw3ylzr3q47j1vu1j25uy7ku89x3d20g8ue64wzoca9sg4ogubztr0zxsgiq61pn5m6qy74rywpm773o8jvhj43la964vjm22tn5',
                parameterName: '6czd4h30jznaie018apxf27ac24vpgd7sg7ue8amnjwjxi3swhmwanq64tsnb68dvtl7w1uer3m9ia3puai4glxczolnmxtwtace4kjqe8ffbwqpgtd4dk6vwf4mlszo1g36n4gn1c04ijp4vbpfxitas2wghdzvums5jqxue1w2hkfr95kfmcp2eacsu8ojsuhe48qe3totyg4qrlngj8oi8qsmnix2is95vd2prc0crr1amh9rlaclj3jb7apwuycqmnkqtqh9xqvns1hxxp391o79wjynzndc4tk8i8klybji7i4eu1r4dpce30ja',
                parameterValue: 'l9cmm6kxpn12kaj7394hq2d7hv13150e2b8lz08r8k7itx1v6qoom311glzy6yjkw46p7pp30frpj2q6hw3yap01v97cj4jt1n77b701vsn7mpxrx5lsgzlx37zdlc2l32wb5s5rmxo4mnohc32bqcjnt3156kdtiob9amctpfjpjszl0tnrvnycltsoripa9ldk76vvl5j1xqytew9og7yiodkn79gqq8w3wwhspagi8tskxgh5jhx8q77bf2mh1x8t43smgq9per47o6k4w0c23mo33s9zc7aurhe1jm8vsrwmc0epha3czkc0srzgpq4alt5zh4l78jdq3vn2sz3qvr2s74lkx1gesrin0p84dbr8frostx2nsiqwnt1j110zychg9g9d1hybunf5rxai3mflnrx2edlhprmnd7gnyc6bpj9xxq3ux6r4xyxn2crph7yq50khkw5s6bsvaggtsssw20th84z22ty0dhgb5m5hhhz3a0yz6mls7d7lrwoh51h9pn7b3gvyxf82dg68tfpyelk9wgictozu3ymr09s8k1uxrwky9r4bzzrzk4yw0r0mlxpfgq7wc44pj4ynrsalrqs35celkffly60uhk2im3ade2ho45k0hin88gnchczfd1ujix4nz649z0l5qxg50i90zt8drnfyp0q0ai1iaz6c5m906vocf6dx94k6qufdmz5vmauix5r33g8yzty93e5m73hhlhzjkeqwj7fjdwo1ydwgf2g71q3yypa064tzsgt309nocwwkduwmjhglr1lk9qecu955wxzemizeszh3gomptx1jjr9dablrw3nocf2vkevebkwfs8q69md07xih1hqdred4iteb3e9ysntaro89b85y8qzajsdfy9zj8s0fimztx2ye1q6ayhno0ltggwmkvdsua65v9g3fhx83xjhjopkb6faas4j62vfg6aum2ap7y08z3xy4vqpu79hnns5tho8hu7tfq29wvf8zb3nrsuha0oax',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bac4e3ad-e299-467e-b9f8-81453a5badc2'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/bac4e3ad-e299-467e-b9f8-81453a5badc2')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateModule - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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

    test(`/GraphQL bplusItSappiCreateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'f930a716-32d0-4189-a64b-cf3f6b3962c9',
                        tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                        systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                        systemName: '1bketoyfeotxudo4evz4',
                        channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                        channelParty: 'h2lmkom3x4qkrjpotxgzcazxjwa1zwjguf8ch0qzz630kn7vvhitd88zntnynwmhk8hpnn3av5t6neivg5oo0zg6562vpy4lvkyx9282as19qug6vuqdwxvg4tpi8pbj557c48mj9lumi6afp8p64bpycym6ec7f',
                        channelComponent: 'lzshcujr0k042pwti2aypoepma1drf0350mbn7aklp66n7jvtuqguj54bjpimo4dorvi9adxxtjjyazffw2nyyl5k7q9u1sbwr3wbviz5j1b4k2a5n5pd5rmmyklinv3q7psp11vyfch8w0fx929y0g72d4i9m4e',
                        channelName: '2244psyid34xyxkzwxdx6d963v0y6wo10sr9gce2dazejalax2kbhxo0l8w7rhf5zjzfe6cwjxplszhkvsufedup1erjk5mjug9zuzivld0lj772yeajl1ioch3fq6d7s0iz3mjw5w9rcu1kj09bxhs96mnuhz9i',
                        flowParty: 'cgp2inkcobbln6gdsaigycwsq0hzqh8s9ayyl4a8exuh0hroklpced02uicndv9ak9j6emovksxmrxs7mwopfz2hxbvg49om9iihid52f8w2x0axysmqyxgl7hgzb0b1vdwqgl2tfw732qsd0vo1cb7f2hc527xu',
                        flowComponent: 'ho7cq57ya37wup5pb94plrt4oheeys3ueyd6hqbrcy39im8g24dku9091drnk2h7h6rxe28crzh2621v4tjcfo277uwzojgleo15o85iodxye462rdw69jqqur56xfb3oqnot2r354rxbhvwsquuw97c6rxo7v25',
                        flowInterfaceName: 'zvvznwxd3nr647bqhlucgmllk1y7cdxyv8s46h3z3mvrr068iotbu5m5gpmc6xprzo74sj0fs0oxzt44n622mrvkbvklgpoaib192v9ewijbp2vvvd2sgnmbj24kbkgaanwmbgbh13hh6tbg78d89s2v22jrro3j',
                        flowInterfaceNamespace: '63m263cn9amoa81w3ff6en1sng5cl8xjj6ljykid27ovmja9d8ho8uj3ugu30xaf8v32wi6cpepx4qt9g1un10yl327ncv9f9cugxpsx5tjabberq3l1kw91khppb7kxpfbcyl7psceyzqd4gfxfx0vyks8crpwv',
                        parameterGroup: 'w2qyweh2b45zcsj5nm2ju3fil144ri8pj2u0idf4ecw5tseuakl4531h3r9i42tmfgsxyti3l2rkwznhhgc70puhfp9gblzyn1h3lq91z21canmdv84kppufupuzyqi1rli2ak83oqcpr3j6d6t0xci43qz1f2lqnlbkp53rgvx2erezudkhamwwtzo487jpu6krcs4fbw4lew2p0ef67jatm374rftisx7ir9xjpolyxhyfwc2ppf9fkgv8rdv',
                        name: 'pggriy2r2lqz5rg85l58n3llqbx1c950tbyn7kyqmc3cszp0zb56w4gvwyilgd4ulr67aqegecbzlpre73rzax0ib14zja68dychaithjffsxetladwfxlyrf1ajmodfcad33aegmiuhtsbfvr1uqoyznuw92vso5x32jdw6qidnzacjjf08p2wbal87vfrzc4vrxubf05jnwt92bpzrfb46pl2h6ikohdzzigynl6ariz9urs48y00pncuzd1ov18vvmez8wks78yhbpqyrssjxyr8g792cmlhmmw8mtvpg2tbwfde3xmhse92zax2h',
                        parameterName: '8setx35o9oesavch13eswk4dtuxhgk8o23yof6jx760eglopvzpww335zl0kmmlxx0xziyvdr5uyhrb3y79nkq7jshbkxbb42jpb8zzfbbafsdcgj4aup1be0i5ehgxb3dmsqinr1ec510ib95jcnp5z3l996ypdxn3safo645necwq45r5ij95sx2xoi9oyvxjphah33cfzubv1a5byy9ziq59bffmjq8aqpvdjanu33zggh87k5c2teuzpjdgbcrq236p39ngljnftth3nng8uuxf4v185mkr5a7unj1yjqmrf7r34p5bfya4ujnzl',
                        parameterValue: 'stnemuvysll3znco75hivvno1vur4jaa3xrck1wxagggjd2139b1txicm2yjc3vrr4mgnyurwe6xsumwwjxw0u4fgv6y179az59p7x8xjcr5nx88x9tbw9ix2hoffuene3cpcvj9xehiaul02byzk5i8jqexdxa5sb7cwviasokhwu2542aarlzvj39skhrhyeexz4xyqja9wt6k4bayyma5vw1303tz4tdyvsg2xpyeh9szi4smxs31yv000b4jygy68tzr5xvv4wra02mms9uzo30i47j9y9quceveau89lo4pgyuvfs411w1iqd1coklnhsyzk8cdr0z6cbb1ybffx1gfh6z1dclfjy8uq9kgj2qjy9bke90jxdgm4i8d8kxy7op3724fng37qxc2d6m7mly08dm55uddnlohtb6z55x7r2bto5919znif6hvl2yt1oxnfp37r4a6ftuuvds7dh85rfdzxnwic39lu5ipj2u37hp4qgxdel8st19ad65j17m1m6jqs3n0a6a73zb527lk3nb8dyup6t05l00ms0v785p5r7ggxnnk45l7rrzzqabet385ekwlbo28f7rq1g3fsbycndnbbdrpiknds30gperfzuo63cdily66ri77ys3mdomkw3p3cz7g6guttno5umipqlbnuhjbqwiqmfwldb2oakpz5uzdgr4rd5gzfyc1m3caphykerqu14cajm7zny3a3ym9cncvhq6ekl0qfxudrtefza28kybjbtwbn5mwr9zspd0zpsx6m172fg277ic4r06pr2zw3riu926r4ascz97395nvf6w5bo664ne521e398a7iz58hjzqw76ms63nezhl8t4occjnnybqnx0sz0d9pgzlq9pvmlm9j92wlwjgm2d0xtfr3jms5eb6c08vkzo6o9n3qsh6og7lq67qcwm39sa3ipgbll70muq75ocyi7zm1qpiwqib280a6bcvy9ot3irwrctjph7d23v80dpvz2y81kel',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', 'f930a716-32d0-4189-a64b-cf3f6b3962c9');
            });
    });

    test(`/GraphQL bplusItSappiPaginateModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateModules (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateModules.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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

    test(`/GraphQL bplusItSappiFindModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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
                            value   : 'bac4e3ad-e299-467e-b9f8-81453a5badc2'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('bac4e3ad-e299-467e-b9f8-81453a5badc2');
            });
    });

    test(`/GraphQL bplusItSappiFindModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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

    test(`/GraphQL bplusItSappiFindModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('bac4e3ad-e299-467e-b9f8-81453a5badc2');
            });
    });

    test(`/GraphQL bplusItSappiGetModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetModules (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetModules.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '0033d822-deb3-4b86-97ce-55b01c96f6b6',
                        tenantId: 'd7bdc59c-b1a6-4e9c-b2ae-f5cceca3ebc0',
                        systemId: 'd4c2c071-9b38-4ee4-91cc-4899b946b841',
                        systemName: '7tnr9udc8u4epwk1am88',
                        channelId: '3eb1f83b-f0fc-4b70-ab9b-8b0b6ba93139',
                        channelParty: '21267y01cmlrsj1wc5ns254zu5ehqe4uue0bkamwbvtdr2b0p0f232dqnq687suajt3h3gp1sgeilq50p9dts4r1pju6k07taomaia11gwkz293qcv2a533vki2olfdak8elk98a47n54k4j8hee5ajn20r9iowd',
                        channelComponent: 'r7q3cxpx0l8slusskhmvf0oi36g7wnzie0ohjf500ow9d0fx3hjiri9qkd3zdd774660h2um90ga39p8vmmvss4cbns28x3m3ba3c0yciy77dmxvuql3wef77ywiyaazwqqwrdsarzqtlzrzce3fsi8xumde0gcg',
                        channelName: 'pyca0nty7c1tyljihhyvqgwyvknzwzi844nyxdhf320ojggarr1d7a3zz9k3x301ldof4ac4va2bhq0kxwvr7nn48h7oqnku8er30mdz7yn48qvp98bdwsxj6pvjlctgu6gznldwht9aqt6two9kr00s7fge9ad0',
                        flowParty: 'og45iwzu8orfraufulqw8yx1fxy032btgiotdcrwscr5dmlwzy9wvc1swfxx3cuxg0nlcavwlmd3ypt4pd38gupctxbwzd7hmw6h72obhvg2amis2cnqs8kscwi33gj3gsvgeugt02y4ce2se0kdfys84duj32om',
                        flowComponent: 'mf06njsxpyp1tgh6xfrivjnxnck4oec82d5dyh6f0ecq3agfqang9n1gfnwnt596x4d5qxvbcuzutn5ndph85y4we0f3s1seqwfrd2af4rb1znevj510ehnizoqvij13bj1q94mzix10n788g2t5fexg8qtzeapc',
                        flowInterfaceName: 'gvc9z0pbc8ujz31p6f7zfjyf3u0zy2a3b39yrp8lcw7dfxwreo08lv0qxh22bsjom4hv2f3wsvi0p8bm1mqsk1sw99ujqc52hn199qi5aa08q74gl9oi70mhm08g8wx9piwgyd2pq4n5nf4qh3915mac0pyisl1x',
                        flowInterfaceNamespace: 'lv75bko5jamkgcyzcg1xlg5miz3vs0zt5u5tdj8onxww36oltw0dpalwrsmt08w6mcowb6m1it7i4la2dkqa2l2o9ugj245dvcd5jxi52vwywhuyz5cx9gqvgrc47ahpcn2ccwl4n0fcdtzvgihgiiylkhyo3vr0',
                        parameterGroup: 'g4rknvhkhx7x3nn8m03o7f0rdh7rrr45u929xnvlu97m2ipdgz1ok2e73c9iz8vs52jf70i1m6m8eqrmhfu6q8pvppghqdpmvrj614j7ause9e41f9psjstx17kl12qg1jx3faxunrtsurl56ccjg2k89wmrlgcpz2gq9xnq2il5k61yeetluz3t9b6r8u12132h2w3lwu60eivf1nlwux56selt5a1la2sgepryn6bch7x3f9c9401c0kt0pfb',
                        name: 'xzt9hz92o90gkp03ev67ef6kuh0c45k249fxb4u433lntp4skpse0uz3ll3jplegyeaah8ydakcj5kzz1ulwr24ys8fp30mbo2z08i5sqwjjkf1eccg4t3my2uc2csslapyabrne06e9rjtswzi7iuy5jdcmkyy3jjxryeowrj7aoeo6wamzj2s9ywn04t2693aexxj5z21x6rl588fwa2gchhvjbuo410fg5jo1q940d7alfic77hrx5azuhe3nuj404hfn02ogsyy4yeotb27tq8apxlu5ye9omw5ennassyd4mqslmq6et65ilv74',
                        parameterName: 'e6zgkfb6r2kiwv79vt3bnbmvv3joy8d8rqimfpe0zzzlynmz75fvmrh9j1e15sg9r2z9xj3fohvm0de9gvzlhxsnxfr4c1s0pomuxyuaum69mfvp2u2z3azpyskezl0i415nub075gk383s1d46ltu0tvdzuwznitlu89s6ifh9e9zjajt4n9rv033g3mqdkhe242pbc8cwlvgj53q642vxc3w4xl9ipuk5yr517say5cflfrjdjjnq7wsjuqmo8038gpavtj0bsvguhpz6t5klgewisj4ocg9kasbj0kvd1ymbmo41r0macanetb94q',
                        parameterValue: 'yx2ui55urfe755955nsvmi81rqrw8w6cfs8xg1b298emg9jbaxputico5m5uudv41jcgudiw3487p9up377wikyqe4qxxpl5fai7r7p8rzywy777sm4d1n1frby2x26wse4vtdzympw1v6w76nfl2y6bv56d5irq8eyayc8s84tv29p4es1jddxlsnfsgyqgxiz1l5npoczcsikokb3fhbz57a5onc0jii1bvwffkysvfbd6rv9fak0qrqup7g5440unjpunc7tclisfelijnkhp2ka8qmy3reslvji442bc3otpcq5e3ug1i0mp4muddxq7u4iek1tagrbuu4sl88tq7y2kxpwta5dufpxuhllhtemr6tbk9fuexo5d1p7ufszoqh0re3300ew7ddqx9edspfyv3daxzsf8f7zu0uia2ti6qgjx6k5y3bbcvp27j2e7tn6me82hjfmwcaw5qj0079hoh7rqvznrk3hy9ckgb3181671z1jzs3932la97bqnnljr6kxukcfzx7xruuheaxk3lnbc5rltwy7vpbz0zfb1ohg5fitbgen1cmkrr3r19lvb4qxabum5yi01qg1b51ejdjbw96a3bmqxgy8kmee18wavbh0uxjwxesuuna1obefc1t11t3c8n1bie5ekc5lpse98hwi13qna2wig0w6grloiuqsdljijfa2200joj3xlrpaosvion7xhmr1lvyyhexgdottc8vhlhzozzv9abe3ergmwap58l3tmo483l21nuxnrx5xbqk8k5tsmyh5jqym0zg7577hmfhek7eg7fkbdhdm2zl2ywh2ikz9ejz85tpqsrkpi0vhuqfgwwitmlr1wltjgwh0evvmf1fofhtctnuh4k5qtquf4r7oe7v002wl5hj1b9dh2lqjhkpyi7iy6c0b85iod6tgzo22cxic4wuwuc1yz32rqdds3507oaqj6kpf76x908q6vjoo61qs9n6a5v4u3ds1k71i8dfkw2k8uox56z4sd',
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

    test(`/GraphQL bplusItSappiUpdateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2',
                        tenantId: 'c87deb8b-4968-4e99-82e5-8b88b24983be',
                        systemId: '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288',
                        systemName: 'jy72phco4bbqod9abtso',
                        channelId: '441e74fd-7959-4f83-b022-82ce46141f3b',
                        channelParty: 'jhprtsygmv9igb7hk03nbeneqd2mm0bfv2cu95azqttpoxjvyuwd6zgho97dznbv4v920a5202nzc4l0dktudvccr3yzrv78xxn770rl44x373fhtu4k5r6p85t4582yiikt4fj8gr83z02hi3jk20wb5tn7bepw',
                        channelComponent: 'ofelo14gy36mn1jouus3hra9yqoah8sjblodwjzm3uxtb6zb4fbg0keup6ulhvu1drodb7jgg3l44jeaepw24ln53ykvooh24e4ra21s9hump995ejpowioyzfkg8apllp91fl06c2pziakhtibeibuln9fataqt',
                        channelName: 'vu6mrp196nqyw2ip1dvi3gkrdd8iu40kx4zr16yh5zved7r69f42vjrbffkrmonuzz8zw7uax6cfhle3t28uqmch5mce6ybbk05zmwq65742jc9tzl5k1psdvk57qy1enxdw6u392l4ar72026jgikgg59tx79do',
                        flowParty: '6l8y0z8rmfbtw2kcwtyzahx88krwhdgr45yzbfzcvreb54jwmljojiyzck70607r69q4pmh9kouke42an9qiadugcppyexrggltxnl977vslu5gphkx85403epuuraz3oygoic48yqmqgm85zrmmcxvnfextmcnm',
                        flowComponent: 'u5hy128znib5wzgspe05g4017cpl1znac8k1jmb2ae4b1ho9oune2bher9k8kr24pdnoukxlvylohrn61uxzr3il1wletgrpnjkp71evst9zeeb5kh6zy3ccgjnqo52b98208hs53qsn1zkqrhtdihy4ctwsycqq',
                        flowInterfaceName: '8wq0mo4qta9bhxmnaz5vbucxjocjtod8jpmp5u9coytu6jlax9sgoky86zkpa7sfc7t70ck3931xpvp3jypgb9f2d2n2m7dler80l2yn9afjb24jbzwmnbeozh8r2vnrvy7wgy6e06n717clhp9dx7kwjmdwyd91',
                        flowInterfaceNamespace: 'uoqyy20mk9gy0w097tha45ygk7rj1n0eeeezkj4eu9f8k4db56ikd4ii6edh52lcat5qejtuaccqfzoeg93irhn80v0s6kik8dgnp3n330m6dr34haf9k4wyif6itmpzdkq3hqici64uik8dd86xtvmu8urgl42f',
                        parameterGroup: 'fxrh7pd0v6w7sz93f88eg16sri8yf7ot9qwyii654adkz4h89c76z058h6ys1u14cb3bsiahsxnj20ufuq0q68tchrpi3947jfa41n3e9kn1ld9o0xwbbxkzughneiowqym81w9k9jwtbo44vh5mggttcl9s92odvo4j2fxbp2jvvufpl71umw9td9uwr2qkd10gsc4odg3acgc0julnub3p2qg5b9yvtj0igr9wqar2agy2rzw6t8jmm9y37yk',
                        name: 're7j1f3id2kiqtxdvflho4l7u8tli6itgul3r0kio3avflc6l039nk219pqcm8u51so1g8aet67iji0dvcyluekysjkckgm9hiy74dda9grdc21sylaeylflj95qt9tatm55a3x4xo2sl5xed6x855gvrq0fi4hhxpkhrgisqvpbfwi9qi1c1i5ln844egmb28ao5qd4gehkxi4bh87bi7af2o0o36jbjvr2jlewgkdgx7e6fms904vkpqqn4npfqufj16wnzv6k8zz105otxcug06xxzgz2z5sbyklk77ndrxsaldd50sa8is2qvoaz',
                        parameterName: '1s3ui0htlflpnnmxkoih133obgkqk63uom82dl5zzjssrkx4mt1q69w3a1xsk4i37wi2jwhan2u8m3zvpqqtwy2l3ibmeesrsvzmlxp7u2n2vz8e8rns6itwftr6h76o21n2kdrnjv16os326jrieredma9jbzeoqrbdip7wjk8crdgon4323gkgug8q9nknxb6772e30ro0ctxh1ck71v5zb03fix7slx3qu9a0wfocymzz437mcqly7f0t3wqgmawymkx7qxl1z6opzln37zuapfimibqzkhssnouzuodxnul4e0efbu1royftojj5',
                        parameterValue: 'mledi005dy4yzq8p3rfr6h60fv88fs7bb0f0l90p05945gan12u6sp8854rnqxwp79bfnwp7mnw44c1m771llb2plugwt3afc8i9sg4y14tmcofj8y13h61vwrelg4o4ijagszegjm2tg2hqc9s631idc8pxhr8gp0ff00sf27x3vfbeah4h3m5eduoplpe4gfqzmynnlvup72noas9yn54iewfg3whr8u47ko3hps2avj8xutlv4xfo8th97repvoa5d677ncad5jlicxu1njzwqhv831e0jaw1cknx6e2ofsk9mu9jkoxiav0me6rt2g1ubj0fi7jkipen4o5854w7udhlx5k65y9qbht9x6ohxuzeysv9tjw9jzi254prt5fx1kqvu2mc1cbd3ebzycce438r9l9wrdoqr022imnmw2r82qrhnn2jtzvs0lghehn6csj7t59k45smugao957q1gjm2as0fh16uihga8ur5s82q3dynqtq2lbopvacse39xebtavlsb8nu7b46nvua51jroh0q1sm0t7xxkwnv9e7ulxml1hk1oygntnc26c3zlqxdyvqdmqo0ohwy1z7kk6gmldg3enlzcwnkq9uwznau500wtgywn43jc67a75pns85vjp1yhffd6cdy44d8743fegldggpbrstlod2ke7navlwig1cxrriv7j4k0dvaf3306wklns9hkleivtjdldf9ymmegv6oqltav6h8hmxj8env93xl3vxk76qrqwlfzonsst52fiug4fuu3or1fe0o3em5cw296rl7mozzvt0yjfom8jl3am1hypejfvhm36wd0s1t262spzqaje1ge5h85zz5opxwec5aoacyjo89acqx663myt4b27yid1horjyxy1cc677mj8d17j37spxie450n86jrma3np6fj5z8woc0p4b8kxgascp5hemdzv06ijalpf67oqchqte0o0vbfzvxtcgy3cichkwj00hyuo9o41s00nij4qn2',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('bac4e3ad-e299-467e-b9f8-81453a5badc2');
            });
    });

    test(`/GraphQL bplusItSappiDeleteModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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

    test(`/GraphQL bplusItSappiDeleteModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bac4e3ad-e299-467e-b9f8-81453a5badc2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('bac4e3ad-e299-467e-b9f8-81453a5badc2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});