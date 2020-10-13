import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelRepository } from '@hades/cci/channel/domain/channel.repository';
import { MockChannelRepository } from '@hades/cci/channel/infrastructure/mock/mock-channel.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('channel', () => 
{
    let app: INestApplication;
    let repository: MockChannelRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IChannelRepository)
            .useClass(MockChannelRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);

        await app.init();
    });

    test(`/REST:POST cci/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                hash: 'muk6fg9ei74n5xk0cuz9atn85ml8x6o630c05xb9',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'i4lpuai4jdlpvcrgsi4sajuc984hvuo3j1ctt87si5xonsudzd',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'iqvu329lxnzr8ittddob',
                party: 'dfwsbcmgzpxfzu0jizwzb2cep11q2ut9uxwton8i10vwmfpypsm9rawhkfvlk484peb78k28yz6hdbs4hhvtzi988e536ev4ayxur4rq1yus4o1pohvw302fwn08ej3n2ko32g2gfctc17vt3nmrvbjhi72hfvep',
                component: '5mk0yuh89t34evq4v769yg42w3raw4dv0hbawg1k4cot20nu5l85ojqvva75qmxsngbg5ge1j19hoqdndf350qy9iaqk37dxcow1xyl4p8t2w19dhqw4z02z3vr9l89yemx4hoyniu8pwduzxki6fg3o50uxhqs3',
                name: 'povtptj3p4yd0j2u4gcfgphjy1ggehhjzqewm2bxx5wy1riga5xzej3xr9nt824dq01g5d6iu29psydob63l6wv76rv6gswms9hnv8dv2jh5kqmfqayxzfl6qkpzb6kwnfhuwvbti2thwmjkkhv6ozrkc9xn512g',
                flowHash: 'aw4rez5e4otxbff03lqoli8riq30mh0c0jdvl7ys',
                flowParty: 'a5cuzmkld3d8tklmyyz29lka95puv0kuyz5samuq1kybcjgablakeszprm5pubtyk414jeb5qvvwncb7k8v81oao0u6aq1ovf558kdpgq9hd5mez3odo9t7p1qvwh6hu01copkvaalbfztdy7ynuomhmhuv0nq3v',
                flowReceiverParty: 's74shc0gbyxkx9k41diwejqazipkm9ho302m7k9iouu0461t4q8lego70420s3ecwoh7jz46tcackt0hauizi7xf6fgva7g6yd3td4j3gtznuzpa7nvgrig5newert0yoew0a78dla12hn643wzfsdg4w2n4plrx',
                flowComponent: 'b3o6iyp2m01ucoq2kd9tpdzwmva4id0cw7yy7b4afsjk6v3zmw07q45yj2mc7s4j2qv6c3xea42t5usrb51ekygiejobkd8ov2yl3l1ieud4p9kznfvorefiswtx01lvrdv8uyz8ibopd4h973r0fkovn3nd7pme',
                flowReceiverComponent: '7cl90wj1w0knyjdyn4dfj6jco569rtossq1hqu8uxiypq6902rs7mdy2nk5dn6z0sxlc7sv8qfzr1iz0cxyiv42ksbjynpmxmlil7mfdvgy336mc8yw5c3vcxrb9xg3ss8zo601mlloo3wb43x1w2z4ievnyp11g',
                flowInterfaceName: '8t551tv53ahxq3pdqjyhrua24oqglg6tzv6tsa592j137qms1g1sg6m55q1in37qg99v5kvfid4qj0kagaxoa2d55c6ty4l52fzjr71uygs9xhl51ylz7irhidx4yjnsumcbujuhmh0kf1x487np5cw4nq5yhie5',
                flowInterfaceNamespace: 'tg0q7nrmchqlqcxtdkwjxf0hq4vswiwo6125t6i4st82sf5xxpzb3a7lxoe9h3vkum04chn9baaeu8g319hmsvvmkalybsr7r6ovgs4ckoq3a9ear3n2bn5d8bwfo3jlr3gpc9zfg04puwr7h4l2v38dloytuzow',
                version: 's71gj5y8rd91xepkvpby',
                adapterType: '10zxni9fr2g0w6kh6ttvl8nzv8pv3yl5wt7y9oj10a0biizob95c9zfjhevh',
                direction: 'SENDER',
                transportProtocol: 'vteqtj2j7bot5102xx91bklhxt23k59k5ohfc9i0spg2cwzw4hgf5x1fxklt',
                messageProtocol: 'z58ksvmwugk72ik53zrxoc3c94o0lq4zqbtfohrq7ug6ouirsv5r9as6b5t8',
                adapterEngineName: 'g66evj2ixlwhk0zud4ujls0799pmh6k74ygyxj7l5y0okqwhtqmfjj2e5dk6twoksuzmhhko1u5d68noc5vskcltjwlet6ztyzww0kwpuvla62yuhcj96xtvoir1hjdamzt80byx989xeya20xo3df96d9hmw9ly',
                url: 'z775abm7fbjxnehawjxemmj3dhb4ncb3s3yezu73pjy336qnd458fuujebdipf7h3w7ebx2zeyyue02i29g21yd9vpgrmmmhk35glhwtiu78abhkrotjrdxs71ninlc9hdfy0couwfezv94d53c5s52usy2dcllna06knvspgmgn7iwsktsk3n1qanoa1e6kn5mzrj21vrbcnlnp3zhxd4l5ifkphc5ivv1n3g4wbu9t7nipa2c1xm3u0wj2i0bajqxljn93kopwhasgdhl4lmlpx08eve5kq4o76pxlse6jvpqtnpqgd56a13hrb3yu',
                username: 'riagq0e42vkgj00zf9hb7vsol6n8k1iut4o0o23isw7m4jjeuxyebkidgmou',
                remoteHost: '0zkwx68pm669a2m1kqqvob1jbhjr4ti5idxggq1eovk2ogbiu7j1i9d9eud9n0m55i3hj4nawnwntwmrn9t8t97ize7ue3a8bmdplthgkmhngfoyuufrxye0fi64ebsbx70aj7tgh15y3g30mvhyq31m584yab1n',
                remotePort: 1695308563,
                directory: 'c5epkmvpwc5p17c9nv4n4qvw8pj5077wdekbs6j4stv5b44tdwhd50zk7nnzwjs0uav6gu8uvpaqnfdsd4gjlsj95n01fl4pbe8ate46awbnpfff22nw9z7ur7s1id3s519btndirw98x76igkh80jlv84y4u5wrbwt1micuevtowu7xfs01b56dexxm5d1pousg1elkwf5azc6k7db4lajtrsjqkcdmmqk3bn4rrfw1ef371qtq5piwqfz8183soquu7yi0uridn0seqa81y9t8c5crwkb3suvv3f84evkccomga4f28jlcnthprsqyaurkk55v35evfskfkmfzcbg4yjimol2nnu7pddrzm8xf5ygwh90k4wagmx71yiivnl01wfrdhu7zd90ayidt7z0s2lzt6m4qti34enao8ccbj4eje34zxpr53czrw0xhl4cgvxdakv0m4485sq272abwe9luilmkrb80ixs021y53n6egya890lt93ovcb8ip290p3bi9hv8phvyn6c7oib0sstlj31c7ikm8ay54h6t7aftanjb25kya6wd35uyh9v9hvp7xkw2aewh7b3xqfezax6n9ohwtc3xmo6c1sd3jr3w6lg3xay9tcr1jccwlh2zx8ftaksw89c11nxzvxv9ynlhlj8wcbwzqpz26rngofkr6yuzyrj4ixv8k3qir8m6rva4e78p2qo208v0er33duinj6fmm8g1q01dtlcjla64j517l556xr4kzs5qawfxaja29d8bm9aua2gjfix6hxtw7jlu5ntfyjtyeaq1bns3u30jpq6yn3z3r81hernrokqx2ppjjyhtsxsex5u4256yr4w06f4s8gqtvxi29d2jg2nacryaezcm1ric4kcoswwoqytrizv3by4hyqcx356r3e5tprnoctfnv06coihq4iofootry25v197nfqoehismfvcxndr0zzpfgm2cgmgcu0bw3s32vlwrhvwxz97sma5yp6ld84yymsvl',
                fileSchema: 'j8yfvafo7rkyfor3kv768xczsyr21ytfsv0tzuu05uicqqluyvnmq8uu7p65is24kwbrjdnsve6lmrvfidijda2yld2jzx6hmen3y4nphzcstae45i7h1ro56gbgb1x9h7ih3b5u0ungoggxrs8brcsx6isvi5e4j6is8ydrzgl7m2f1k8gzh06byoewokgcqufj62wepwl7m4f592eagkgvgqrq12susws9a9xk4jpwzz1b56zp74erb59824m6g6vfynsp8b9k2240aeqqttworsz6qpzgrfl3d8m2qpr9znidn4g9dzdz89jyq8qmw72fo2hh1adsau4cy64pisl9nr3yp48h0rs5ilkedn2rlwj012y0ijmpa67xxf8vbq4ndqsfxitpx14bpp0ptg5n2u7uvov88h8cyy20evhlfvl1l2h4hs3wcov1mppc67btvtfxg5qmct2inunbo2e48qbf0e5hnjvv1rijff3vv2x8yjq3qaovx7yqkc0bdlsdn6lgx5hqmt12ft5q5pbtxqga3uu5hpo12ucru7unbmfuped7cfj1dplv0mloqziehpytyao41fh39mzgse8xau67myazg67kc1k0598s2lf4mwa17ntoga7agknusyai7tpk39jos2371n93xut6en23f8hbskrmogx3qjhjonzo7pbazz3b4dn4c5ehdpzuu2aul2tuqq75ofolbjmbknlfoxu413d40934nn65wcmckagac2zf9hnragabs4da0lyo2bdv03d76d8h0pq103p6x7wvytsu9pgm9fs3dwu5tjr6lp0icfz8f0fa48kg8apehj9624dezsleqy8bcrxk4cf9b5ea75od20euzry75h4vd7604rumlv5thhnp3m7y6gyr1f800pbtmrqbgtkhf5h5opwpie21h050c53j8us0xi65idgyecfchr6abzkpa3si8jg6yo4ududi8xeytm9r8yg3s4pd8s7prj2yvjie5uohzjvt96na',
                proxyHost: 'dolug5ejj13b4ykuw78ocdl5ep6ke217pqcuvca39ayw81t4n281yjc68z6f',
                proxyPort: 5997079192,
                destination: '5071h7rmhqalht84f3cn0e9g7vx46631xkiov2t778igtqubmsxj96e5ydtg5gerd8y82u7rr9l16v53r1tq5v7lb6ziimp6nyahhqw3xaajd25dgp8tj4mj786vt7du636bd2m4g6m6rr7ek8gxodeg1dsumgtq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'gtjccp9uq3omtdr87a1pu1qlyqueoq1z0dk2jp22oxhp7aja6mccaym1qd2depp6pgkolit67wj1qh1jw7gn72a4c5082fi7vi7t8kix3ncp8r5z5yo3gmu9xcutxf6n3f703mqc4m8d6c6hb90dygjenjatm9us',
                responsibleUserAccountName: '9soynn9cf9oyyhhd87dt',
                lastChangeUserAccount: 'qqc59etapq8ze1oygfn5',
                lastChangedAt: '2020-10-13 04:19:05',
                riInterfaceName: '0m0aoel2i9ng4791re4wu3lhm1p9j5rc2ujqi58izvq2z2duurve7j186jlc8x1pubu4sj55fqvo5b94bwrgohyoiwuf3j8kylhaeyvzdvapyk4qzhd7o8qtve1kyuwy2oda4ikjfem518z9alzlsq35jgmd2r1e',
                riInterfaceNamespace: 'obwpzlozzmbz08cnvw0d132tfx803snlbg6b3as2ggt4x2ob4xpvn9p23batsx1qwymah87135ws0duzcx37rgyo3sc0pr6w9mlaode4wmgsqu30few7m5p4tvr9unepys14b7uap1ir6wj0dxpw1s3pg6tvddzo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                hash: 'dwyausnnuatmwdyiz0yam93q8mfxtlbbuo16pn0v',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'bbchs80szlz5fhzj9r63g5r86vj8m8n4qhwxoelwuhib24csxu',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'yzsw9xabk6junwyl3wjs',
                party: 'jh0wnx0uussno85tr8kvtn5i5p8h5efybw8ynab7v5al1spn4x4j5hhz6uc0mmj137a9zufaakziqvugs508110g4lqaaeipos880ovh8dfe2emigmc06j9us12d2u8004kv3oa78iky3gg7plwdc50m4fem1cq1',
                component: 'y7rnji000hhmhqnn8vqlm51mypszqtxzby3lsxbv3yc967i5i0zznl91wsu6qzb074g9wjhqsj426ljq22masyu63q5p0yzlde6orroauc77fttmpix2qvipru2ceg2eofddid90lhtcg05gd5d392etionjqa9k',
                name: 'acw0iiekyi0wenfj9hn8ulivm320u410lyid7lxkz6h4t30k24mkkd7n0duvaf40sz4kfux9ub5x9o2hgikub6lezrz9icpdeazevpoj7ve9j8iwet0dfrydy2bbzdvk2zq0kizmqz9fv7nm4ftlybrf36r2iwfb',
                flowHash: 'swkzysh36ex80ve1u7zm1uc91lq80ecu2h98a2sf',
                flowParty: 'k1zlh26gh85dpz8r2nf23aqbr89ctg0e2gfxn8h5naj6yx602p7fxgkk93n3h9c4smmvfs6uqk7d53dgujcmgvjnu4xpfjgebv2el68ozz9vwz12c4624q1uc1nfa5cpt36mgb88qu4prcpp4bkkkcr9rrsy0rqu',
                flowReceiverParty: 'iqqnvfus89kc3wqadqm5lqxhpdehcioj4wgifrii22iq5x03x9lbscrmnfco5tb99wd6hwepekyclwl5ighxjpbutqbrraflfhxkcax7gimijgj3l5u8zo2y5ebnl6vd6kacmn6yap6isumw8ae0i9t4yz1u3tjy',
                flowComponent: 'hpnou163vt8h6v18x6kt4mgyuuo15t2qmf9xji0op384dwspnwthay75gnqnxof5r8n1098r6nu7vim2hqaifyz0zkzaf8a53hmwda8sy3myf38egx15fr8plafv2twparrjdzcl8yiw5dotrpj6bd0q6tht6teg',
                flowReceiverComponent: 'lsd27fpnpts5otqxcmznxeg7tv0lhhx8e0zjopr9m2j3vx0mbz43gr070lhapwykmj4i8bzoql7cdw7bx929kqgcp6xdq1lb71y0eb7jxlyfoehu5qaubz6dikt7l256cqcql6ofkvvoi0wpfbbrhi5h2ovs1i2j',
                flowInterfaceName: 'o2qow4c8rpk4lcb4y1fl477b2lbx02t3mvg5fbdm756lt6yauo75g8ui0xg6raf6sx2wqhxejhf4316w7szfk31hay3ge76vjn8xeov7z7t7m8p0su8vwgc3079fxpcub71t1meu4sk8vu1ttqsjqk88wufyvnwo',
                flowInterfaceNamespace: 'j5cltn6wsl90tfdinpovkc7ctu4ush3nwjs84f4yfz0htzy7qad05asisxqicesvx82y60w71mc9ouaj4zjjn6jps5tdye7mu9rldfuk8wlk01en31aq41n4is4te180nkqnez4vhxqmgzdhamuofa5cyd1p92b2',
                version: 'xz5opknz0ak3r7zlsp0o',
                adapterType: '7c1xzs81cfkz64k5cf0eiyjv1o8scgl15a8903oxnfcotc7sgolc707riuoh',
                direction: 'SENDER',
                transportProtocol: 'ylfvfrmc70pftpj537rgpv1zlye138rqkiayjq9e1v28vwe9b1imz7we3tck',
                messageProtocol: 'bvut7kdvwo426t2r0clcyyu05rsx9ukftm99jrlzacqag90ra0zevn4pt5pb',
                adapterEngineName: 'j34henb7780rm90jddeb77th21pxh66x6ekm5lhm2w6djln2i5any0m9lf1ipzybpdfbwsoeb1w03djrqee1nlckkquz97dmrdi7p8sb2fmkhewy9hconcsi96lpu8vp5gmr1vwxwyzuh7sols4lp7cerbs304l4',
                url: 'qsfcd6k18ltdurdogne2bivujdkujoih3o7fl6i8vs2swbueedi7eylkv00lpgkmasnif3o6j13t6mwty3mq22iy0oxhxrt8avi9c968yjbvya9f64weweenj0kb55460w93qaljkxsyup4x0zwe2w1n8o9dy4odybmzv40bgu44if79yvwbi23uq2ux9ovwzjct7lnsj5xb0lldf6299z09x89kyd3ubr3ssdlqwyfssy26orn6ap1xykje814z19a04e0z7jsdqnweb1samvaoizfqoky9ffnd97j05e6lquaaa09li5bb9x6165gz',
                username: '82rac4gc822iflil2s8rar2t48k8cbd18yqhx35d1dxk9zfokn7ugoyt7k72',
                remoteHost: 'akcqrw7i45qci9snq9kw7u3ymjn14e4ropcv6purig02vd6ekzf7t2hihjzso6j0mmvsprol836ee6gxqy6ru23mki9fl3rxd9vq6st95iizfiojbgg3vvxlpytbsus8n5t482u70s7w2oj9a0r5wltfugtd3kp3',
                remotePort: 1595770178,
                directory: 'nqebo84937h8c162cfbv9sqrxuw2qppun0ihrd9o6iyhfwmmwaola5kghlf8u94p465m4p7nr6q9rqz4uss3ie2e4yhqwgsmdksr101lragpxak9jie02ok3t0e4a9ozaw5cef2tp205m5nf8285phcq1uyek3j4nke92wrdb8amu2if1kbia06sie5pl5q7kixiwx4947n3merg8yybhhewkowyje7mvdo7s25f3xu7g9bzroslif636vaptx28ho7mcr15pje34a8s6asyxqw3ewx44kals0wjk3ens7tauq91ojei5ariiw0zyneq2pm2cgsboudku2x4m17b9pr194mcxpopa7cb7edgl4y83mzzt6h4hpzjxcemjss12xapbatfyexefhd37afm6ewujw7nznl0x9nb7xk2r99t3mmxk59l0qjh1s0sxl6dsuwbz9iu8dih0p4zukjvjj7bmrojjedmuz64isbti57d2iwnbjjhvpqovvkjz0qm8tz9j0cqpobobouqr66mux5d19b1uqwraln3zqkod21285wn6bxs49kc7j1kyywamj42w6wjqib55m49loc0c246jxewtwneg114v8swickd2bzhhj7h5v9xruy2ohjt06xke43bux66448f15kocvgay8rzyhro3icfipk4iklxz3owtv8t5ekcsqetdpes4xrueaosxyvu6dlc3i97l5q6453rm3pxaw0c5b0i85yweqam5lawqg28r5ovftdhswfhl3xkwsg5z9dsqjgbgcnnyooz04f58xigxt6nev35cekc3wxw1qpus4w9fjitzznbw169yi0rq9y8in695bzzpyuacutb231u6ledf5utdl67j6mrohldw5ss0gysr968gl0cmuj2d04ci1jsf2ud8sef1392jrqzh0139jakk3cx4ypuvod28xymmqo94ual4trbu5be5nna7oe2fn6b4e9z0hpnb2wmb2rafavf1mts3p17o00mawocx5xc',
                fileSchema: 'm37n95mye1ovsvj1el8on6dtwccozzz127yeizpfwduuikv5t52lr5bx7oapq1qymsybbbfs6fhwhgrruc2ojtqxz1zw906i23dy3by6uptyjzvpk7ifttf5052kfr0w3dcmy7is85uhxw6u6xptzg6to2lwoq9v8hy70lmora8zndi14vpvnjdgqx6k5xs5m0b310bxcwdguqgd4xp17vg3rvx4ddrhn2m9grxp5dgp9zzqo0z1n2idg1rjw9qga6j2eed6hw5ms3cww9m63q5k7pcki4qj5aup5h97q1x3figq1dc9e09kakl148heo93m3o4r5z2s441uhy4on3xevjja4mtu4imtws3pzt9et94tfzj3u0xwhi46zsx4deqguzadyhlperh3uo3od7p7vnb55zkm54sqx8rr3q0r1w0zy5fc7ybdtdqby40dh49usoz90glb07ftpuy3vcr7v72uukz80nehu126bfjvmthu9elmk24t2f1ibacnlrvfodjrhgkxfz3o3893p0jcwpyduoisdav1dh07mjkup8d9gak9572ov1708r5n8vmwpj395oywicoafkj881ftckgoqa57mj58b5kng60aoa77cvw8knorwx175z9d5gdt90zojikip3otiqxplu1n03tjsukqkfdpn7v6higj358ghr15kkp2qaybk9ryqnt1u22cap9oj0oewxz70f9yh4y7wxorqkdetamtgc3k09hah9kccvq8bxe0c648tdb47cq4mrs454z42gweidjy33scsr3t6mi4ai3eilmoo1uckauveimgd7vsjggky4qcyc08qyenyu5ykdbfbuv43w1hjg4og8ic8taoiz74vifjf68dnai1pf0k6ph0c4q0rzzfndjnzo1659mi7cldrtdqd62sx2zy0qec8i4xsj8kf2hsxx5lmfwtk8jlpo152v2ro1x0g5b1epx5ih56e68vnmv3sba77ptl6sui23eztyk7kg154n6bul1o',
                proxyHost: 'md6xfwprhfwpupkz2v9nb9yhulyq1n3hunz144hjpl5mmsuvccilkoawhzfz',
                proxyPort: 9108445015,
                destination: '8yl51amku8pbcmcinsipruearibvzf8whk3a6n3s52l2yfb33e4evbq46ybztyg89cgg5860uiu6oya9toa6pv48v7w07anfh2lax2ilkt4w0j2896tfmwrjzg7w5cs2lxgraa7plcir70ba07oyyihjmo3adpsm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'lnfemgtk6lhzzt8kvn8uxprhrt6mlqfkzwe6eiokl2ctxqefur1ifwepotk5w5ccwjdx9n1zcvlcys8gvujyheidfwyrjhq9rbrsjo2684fxlum69vtzvpmvffg7ijwzmzwfkbm5ru5ir65ac6s6lxl55qmcjegf',
                responsibleUserAccountName: 'bdfmn7y8zz577j01z767',
                lastChangeUserAccount: '51agvz0p3e6s3y8q6rbj',
                lastChangedAt: '2020-10-13 09:05:04',
                riInterfaceName: 'y5p2hl64w9p8kpkfhjoe3dj5r8gun0h5y4e4mclqgh09ui9hoopf8mzoissxa4frlok71bc6zk3klkg8umeu2qgmqcxgsr8xuix8vv7d9xo9m5iehazkv3lcyplriuoanpqrrlfr5vvirhk9g4rdntqqb736b1p4',
                riInterfaceNamespace: '4avoof8mqn6r0199zzn3twmnsi652b8dlsr5mjnpiwg3m8jtb0gknmupw7mocdthkmw8fddzjmoyjyzrn3fnz2v9un2ox3vydes96kgfne7ncn4s84h3j2ofgb4az4dln6psieebgszxtcc3n5svq5jbllo0ymp7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: null,
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'kt574j8rpbv4pmnr0onzvb36y6zq69jsjx6rgaxg4pzevu1xap',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'pp4i15ndrekfr5qxgvt4',
                party: 'gcv9lalpq2lo9hnp1ocvnz1jtybycf45cu7lvecp7zzfvi22jypskdyyzwjh2pr8jk2wqjiugsgofla5fvzrf2kks40aguwioqqk9gj2vvhq4yijfbgwda0mdsl93o3hd7wnl0gl9eiys4tvjycpccm5ulo4ytsz',
                component: 'rf6uw13ojyowz4coie9d8h44ikzp4mvoajedwrn0a4ch62vsjpfb0stg7b6a1bi0apikhpbc1aktpghajx74ijmb277runxtsfj4iqlfnpeij1zt1pfahwbzw9zrfw0xtj4antk7ntpkpbd3nkm2ydr9wg3ohsyt',
                name: 'lipmqh0u6kvw8vn2j02sj2xy9tbobvxinx0ajrc3r1j3lk0kd37yfzjsexff40fbxdf1f2j8l4vaby20r1addelusgbzt7pso0qqihm5jaq251knuyrq4nvxauurumwncy3z6zla60ii6nmleopy0xyuz2m9hj6p',
                flowHash: 'nyvs59rxhusxt4k56k9z5s1ukozbnpzfkm5agxui',
                flowParty: 'mrqrsgl4n9bxh3kujl04ghupfel1sgfv5d53ahdqcf7527owh1nbm6g50vlyzu29leunomynte5osb6xi181b4b72gjokglbrbddwdqawscmi5gx0dlsf2zl3c8cnha2zugf87eafumsid2lssw1ou7rllnd4vlj',
                flowReceiverParty: '7bqs0x6rpw64jvhzilmnwrrsanwkynmkw6qagus9w9duedbmpla4qh2u4ej3g5pbs2xqvqvmvhmlvjis534enm3e1roha8sriwvwfje0uk8cm1derv3i8adtsu5hwfqfn41q3ys1e7h8491nvsq30cwcy500sn87',
                flowComponent: 'whijktdi0wxma9e1tn1rcht34pgbsnpopti86ydc765jz6zoojm65untz1wd0w4ccrkl29t0ejj9fvr3pg44ez4151fbhzo3hy0u18bklzjep88ia2eqpucatfovuif7i0t1eb2jgu3xo451lknntsak0a830bnx',
                flowReceiverComponent: 'ieaw72dp3oonps7oyfwi92xqx6lytqwc2ml1kpzz8ctcfv20y1hlfviyqjwl1xno10i52gqbfy84pb9gu1tesipsuma7jpkbq7pewov4x5aeq95i3914kxrtc1fa6jc7qq3f1wfvjdoo2w5taydpo7obgys2p8bf',
                flowInterfaceName: '3afp27gw22httif7mobqj9077aa4d61k1jc7014oup0up7i5llfvxxv47fto2kh4v1dgkd7f9hfzb3lq6c40ectrzk9mf7j41iavtae02es5lm8f574boaw8ki7ysclpiogerztvnjc4cz11e7c54x2ev1yhruy6',
                flowInterfaceNamespace: 'k29s7y9vjm6reuemjb3gprlo8w8bwqspfj2anf5x5ddn7dqzm1z47ghinjkq9no1qbr40s0bmt2qnkksb2cz138gscxiel0bk547mon6lv3r6wwiw4ciam2k8v9hb3mqlcpuw8bjj8o4tz74041c3o3ml0k0xqg7',
                version: '97p9evdvznq6kn97w7ly',
                adapterType: 'b6ya69txow0ivmhkjqdpwi3s8zwwdzaqdt55c7t30itl7rr4t397e8qjtzzc',
                direction: 'RECEIVER',
                transportProtocol: 'agupfe0edcxr0geox6ojjnffzthgh9tvt2rg5jhsy9ffcnkybemkchg4o1jc',
                messageProtocol: '0qzm58g5aqskmr727fzl1tigoq6yy5hx7honf1mhijr82fggcavklqydw8k7',
                adapterEngineName: '3unxo4zixepxig5gfbxsf3wukpw7au7w4dkqwrayam6ehga0n05u8u7ud9m6za8lhlhnxx8uw2xas0nrzc78ej2nbsfeu4yxfkjx4jn8ysid7w32iyywxiz6qzwbhg5cfnb9vptktinbjvzl064066863ivfw871',
                url: 'j5yit037zkhkj54xy5egvvage3kz6h1ptuj1uil5u7wrfg38zfcykehl7x6kwb953h2hirsnyb20zbse93whpph1nodrjr14wllyc4oyyzor4faz9o279aznol9wloz65g8em21pjvmwb6f9nm1lqpm6t9i2ijneemb25cmypbqwef5wkn4qk8jwj8uaz4ls93ffqup5tyy4d4j1ty6gtlb38ptt88nvukzxrkqnj21d7aosrkq0cbo7k1n8e5a28ygqd240pxl3c1ux8p2cboj0n9ld0xs08vaksmzefdjp3l7cwrw8n4pw7ezlzv1u',
                username: '6kzjh9u79pboyfef08weq4pesyhv3gcxf2c8xggogvgyucx58ol0krforkp8',
                remoteHost: '0f0n0ngg6o6odt8m5kl0mlgrc7t6f1zgslgxqd1tmadh73u71x04o4r8txd1vtlod2zv5rl5fvyr3w8cl21wcg2fxnmch2t0kcr1h6br5w5e6qvnoji2qiewzcna64s34wzdpfw25fi1kcotl0z0a04wde56xusy',
                remotePort: 8490045562,
                directory: 'g7rl1hz3irj79n5v24j96rzjibrspo39mxjrpficz4krxt58jdrb7vk8xs5xepvafb6hbkwtuunr7mhouqiah80sbm6u1npal3hhzuqzwk03ivcwzs309iobxkrjc5c7gq9obnx8cna45bg29hth2mllbe4ygac1xvk9fwjcm3y0pz9k0idsvgx7822tofz8hnz9kvt9q9y3zgey5azcwuj5qq9aphlsi9i9i3swu8xct3a9rdkiyh00d3mhqobw5n72ndjvisx6cudtbe00di4nd21h5csc4w9vgjc64llexaamor9n9s3pdigb0dmmxq1jb16q8sugg66cr32mgw6d97dcoc1t3b8o5av85wl0m4uqmnc2n8zsbbx7an5n3red5i0htr0ec88bn8c1s7otfl55vkcs3u1vowcw3mri4f7lvvqikkfq2ug8bvx47qvxi3qd8bngd2hea7en9q35eqtngk3cd2hpo59mit241kq35ogz0nsne0b7gqdt7fikln7bxz5fysnea6oloyyqaktb8qj1r4qbvr7uiqc1lc008x21txyjiu0ko1z8or3rgby2j27lnotsuqac4zy1i5om507ft3n002skc5y7rxxzqyz82foxah13i8h33gzmazfn09ybclpye37rllx10tx68d8s9lpt9d8m6xux3mt7c8eo1rop8qdd928c8reb7me8ril462z3qr3jiky6up3yvva8ve0p9n7micx51t1hgh5haqc2da2kftw8hquwyfjo2c8k7v20dympgrr5ripio1otqqp26tng50bri972vo7vwu12h932jffv158zm8emh4ba4300igfpd2dwkeacsbv90pq2svozzkndtg9ba35s2iexcdvejxbk0t8crym0q7np9exf4ttu47i7h2dfey5v1u62iageeb6iccsfyxrmgyxv2sctom7vytnhbd6oed0gs6klfuioo3k8rr5ivc1u09wo1ayedkl5qrmw0e4lqwu5hbbyzovm',
                fileSchema: 'xs278oflce8612yxx7liiqe4e18uu0v86yesvq4trxapkxz3vfmhnhk6l1er0pl4dw6k3b9c43tcp1qvjzqkx9y6v9u5wcrtlrwmvol69t5l1on4u56bmsb301hh3v1tf79zkujm3r14gg6x7hanz8drvwl8e9kk1hf7en1ohi50wqa6mknpp25x41voj7lgdf1klzi7ex1wnesl0hf5jzds0ps8rfcqk2llkksi7k3hbmjusy11lc92uv51rrkst9eb5bst2ykwq9webp5ajwlhoh1037zmm5s9nko9p1gkjk1bmw3c6mmovuueg1dbvdlgrit3r2iyqksi204zcjqjn1gedwcuu3ly5empvtui9w2xlufioskgtx95xy1y7davdqlbsinmvszx9c7vs1g0ckp7q6ebeueea6f91pe91qutiwvozocpzukhin8fu6wlu9isi8trk6s7od2187pf9rh8t7ylhiqap7tjg8bw8j7ol8f74g453vjc3hk0fd9o1fz9s7h5wy8u83svrl7gs2m5l88eapk4tquts1wozuamq60zjnczgu53rzqtdjdqd7a2wth47adoge2uvyqbkgfu55mejinse3ztr595fhhtlzdvqq24fubdxewnelfgtu0d6xvfwiyzxanodfc3317i9j8ekxq0g8pmchpdqbhwrbgn023bzgt638q1e2wigtvzxshjj3pie4dpbmxatmpgvcqwp9ybqmb7scf7kja9ix6bomey6vsh3cbsux5q2dsl66lk3l0o4aezswg2r0co1b4zc884qzct8y6uveiozvkzm1scmmrt9sk2kurbc2f31a1c59cqoh1l142mfrfisdv6wouh4qdro6whclvht37s9ijfk7qrldj0lrs9yf5m5g78gb6keubzxn9tjktvmreey1od8b7z31w8iy1k8avorzhvssrnycziqariml0hwxx404bsm5es9yj10et36yglzxwjea26qtcc4940vrzcksyzqt21t6r2',
                proxyHost: 'hduvfj9zzeqruhoy8myz6zpfxhlg25uwt28nxu07z7zmcqarnzy0g0dsrc1d',
                proxyPort: 6426801078,
                destination: 'dacrcca0erbg8m88b1c494yziwd4awf81n7xmyvt9p7a611g3qak8bw1qwfrowr29bnpzu86uyk513tl5nbss72dwz7zhilebrt0v2he51spi2ifrcmsah7bf9zl1o8o90llxf4lk4utft4a9zkgj1agyw5qpcuw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'w666uialdn9oi04zz4po1llmoqlywg5xy4sldba4c25xy6l152v2wmyf4sjfqgmoax9x5atdi2hgpe6f5p7i23ddhxzt7k78dm1vz4tiq7i09r6h2fnarhgfhqc2n94pm0a4pq3osmqxto1qhef3ko3hct10zw65',
                responsibleUserAccountName: 'cmoq60viv93od0graafn',
                lastChangeUserAccount: 'd5a26434l6kpl78ztinl',
                lastChangedAt: '2020-10-13 11:56:05',
                riInterfaceName: 'jmkofulc4d4a0fk3r0mus25jzcgrvw037h08gzd88ldeqz3rffkq1qn9zep77dovhec0705g8mzc26v9165w0bwe91eivut6ugxins4a6x98fnmy90sxn2yr8jv5wbbfdhbpz99w5m736rxsega7yttrdhpkyilz',
                riInterfaceNamespace: 'qclpecwzlhuao5edc6y8rg9kug7vxsx9aojl4h4esra0jos5qen9d43cyse4jr0nuko2y4y69sq29nwrxnjs49ernb3d6yoxr0lnhr56dk1a3ebcwtsxnhku72h5xul2lp1o1nwcut2dm89ucs3jmyz2lee21je6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'jxizdi4eegnlo874sb1pfg5xtcyhq79etdl9gr4wucimeiijz1',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '01si4hvu7gb74cfduba4',
                party: 'isqpfl42lesqjx28u38jlfc1leyi73j3z2z5vq3xzp8ern7j5ivumtnw3yyui1p3xxxj4maq42vliw2oadgvrhdc8rjfiuvgtb9qrxl04to9is03cksut1uvatz9biqdf740dz71hw6o9oqics6vnnu4supdkbdi',
                component: 'a65pk1fderijczc62g1fcaybh032obm8l9cy6i6eq7aqzrn39ikdnogr0yq12jirhq9g2uzlvrk19ucz3ih9awus6phar40c1hg46pygxgjxc960hy2z1x5rtgsa4aekau1tc9pli7d6unh0lx7md7im1a0ng3mx',
                name: 'eqiqde650nfq1mk8atnsm5bgjzdaga2eip6e8ty9h26m7trdatrw94lvp9blajf07n10fpytlj994b2us6wd93xjoyv48bfcuaixr4wqrm7o9g58tn01gmqsklxq7j7y3o4vb7r1wv9d0mxan0xpijxqc4epix32',
                flowHash: 'krywl6w1cionuc88nospmx5sdq8emtzxj4idrfdc',
                flowParty: 'cf0bgl9nir9dt00zake2fisenqg7vtsfg161tywz5jc5cg6os48oba797s2s7j9rnr7p8uwiawo4gtjw6s81vaxb7vec948n6kxwmxo3mafigotfba6v9mja5wwvvcjuft8hekdthnns2zgm0229zu8w14bqpekd',
                flowReceiverParty: '0b3j6hko3ehl7x9bisz6cyubxcq50dsczn4vmbilx8yno57b3j2f78qvd6jxr9p5smz24tamgk1zpyc58y4t516jo47tqj1wvh7peef3uwabeqd9xtxxzxul7aeq8xqf4hh1od9hfrzvqsyfa6i4xmm3y6atdtuq',
                flowComponent: 'doox6a98nxb7a5263acmf3srp6uv1yd2535f31xgcnqpyhzzfebszkkmrdguhr8b3xdlmwtx3r5o30u5h02om51q1zwph6mdkfftr4iqkr5kw3ukgmnl77uedztp8ax58c2yw3lidnshp5mym8f12y2w30cyl63l',
                flowReceiverComponent: 'foh03fjjs2a8tp2fdzbeufztiuho6u4xldpe6sfznk72i0owlbcwq68yhvgnd3vz028f21jz6z7chhaf3jkrdzmb3d6m7l1ogxw5l343rf97raoq98imtx3ifwwjtxv9c4ro6eekunf0lb43uv7sqzz53d9siepv',
                flowInterfaceName: 'uj3zniig94ch23xette9adzle2ahwyox2b9rt5vw4vj9dyawv3r6qdva7kgmefwkptr8880xfpycm33sqw8unal6ugat1hng57p08j8h2ppp3dfh46qrorw8hnbwxmbd3dztg5nnueo99gmqpw2qw09d4jer4xhp',
                flowInterfaceNamespace: 'nkjwt0cxphkowbur3kufecgq3xcsuq4n8i018s8ujmu8wvdgl0psj885bvioeo7j7fynwx2417stxz45d8rjg0x1o1onqssht2nvsi9ijlsha3prlzptiqnbchyg8fkb7elka48btafojn4neylbwz29lr0p4u7a',
                version: 'sva4j3a3v107btt3ovdb',
                adapterType: 'my5i0eqh6631r191tcf8fgw6dj9vl2bv8wrezgmmm7ok1db1a61hzaqrac9u',
                direction: 'RECEIVER',
                transportProtocol: '5wbj175kpxbne9zx44fgsbkrtsdy5v0a1ecbe7fq1rw9m6864mrwm1yzb8kt',
                messageProtocol: 'mdt9hs2vnuu92v2e5nhciqa2hddu95ofl0lk2unruid390abdookdcf7ibqj',
                adapterEngineName: 'v24r1m0jwxe7b156aiusu6iqjvwnlgqnwdbvgmho6igsy6unmfutrfu410ul3olgqpwaolgniqac0pv4qhlc50uy5muoy34pk7fv9cakegoijz2h508fm6un8sbzztafqgbqre9gbsc6cgfl9luflakmouk51op4',
                url: 's0be6u0nlmg00l23p7o78pc50mvzx09v2lfckq7h2711617nui3jlu22ax9kcfa4bv1yojcmfd2ju96y2y0log0o0cao5gkk20x2jiexlx7fs8r0tav7i815ct5uoy6ansjg4lhe19qc1bhwcd6a0bl3qwg5bt4pv9xypi79oti4g233qkkdfe1tka0xti2nrbktogg1qu1bzrvtw9h4r4gwwhmyd3kyqezh9n4pfq5c13a8njwq3dyu2os81esoahyub78fnmpocmvg03hdxzcsdp8ewcpikknzwco4k4o21rwtlpmpozljbjye9hpj',
                username: '3s61318ce2p6u47n87lx0if5zujnjmm2htokxufzq2bvc1ts7kzd4nj7fdfp',
                remoteHost: '4x8ahojmdvemusb8gkbwv1to8citnz63qj13up570ecmvp62i9ezzp42s172l4b4c8vo2rsnxrraa256m2wl2om5n25xoipy9zzc4s9sp71t5tikufjq9aq25o6mlsa9puxmyzj07ypg9bimadmomsrr197dz1qz',
                remotePort: 4320914986,
                directory: 'cgq4lxhe89ccspa6sb5s87m01go4c5xm2ns92ocq8otroxaoe4o8jy2bq4a4yvdl45yeb4mu0himt5qlbjmdrw568zfkc7wfg2wynpy4h23f94e69vl4vpd70e4672a09x8yvsbbyxrylv5em3k7sivgezfayh6na270cjmsbk4vpu1l3ttf658mih58336rsbqzidwcrfct2roimpcejklsgjy8qgy769g5raatun99rzpub3c5qc6wfw9jad838qa7004ppxy8ekcadj5i5j1z5kq8z2sc5ug1zrnqng4ykuznt4bdlrrrgv16crvclfxus799qkz97ewx69myufkytu6ppy7hmqjwzdfstnb8j9bnppcn231hxsvatfgujfuxy1hdsypjn2v9wsd9kr368jnxp79t983ldtso1oooxsiwqnd6c4pnvzt5idlxtulwn3ogsephxkhynmm7nvvmu8zhtkzb1gsa63nwhs9w1a36gaylp5g6251txycfxqeovbo7adgl3mp7h7o3xcxv1q80w7huyph0q2n8a40lfwdfaezmbz59gjlov9yvx45m4rcax15nf0q2jo47esahsowofqt27umcy9a2h4jhjrtgtjudkh4oxofgqz5i8278jxtu13ayorj5kuz49zgalexh0k4z0gejw34ossx4lzvme98cm6yc50vs5uajhb3lazdd307now8ialjtk13nwrvxv8wgnsjzza2ukgmqkqccg2ofm74nxgqamiq3gu9kaljoloau64syj8cwss1csbyxoz2nfadzfeqfqklr6bh3drnpodo2bb9mpezzgq1fk68xgk0pc8imodjhytzrrgby652tu82rse868amiupkb6udgsw0gjcq5t6uu1dw3pdzcbvqoy26cubd5c1duwxtuvpoumdknj6f19w6oergxznfmi7qqm4zywpqubmyp7u65u8qtxg44t67g6i715mfx1f67x5wzvwebj414xzujhxyua16mim12sbts',
                fileSchema: 'ybm3u4tmvexjlefhc1rwkz85o7yamqjoei3p1cs8qpq57035dyvzv4d4gvjo3pujv7nmczl1zk8l03phvi97phcs8vxwyk7gfzbxc3gog4qyojllxdh5uddhmv4syijqrxwtibxfwusw8qualkl9c6xrb39he1xn0qjmkn2bmx5x1ulduiaz17337q8rp458r3mvpx4bpgqpt6k5ftf5fpgccqcosmpa4g5gyoqbapxx4iqo9p8zok905tyl2pd71edy7es7752okwy0z4x41lts21bivwc5oemdilpq723fmg6d0s6dmatdkicavl40mjbe6qxb5rt1w2g3zerbub5xbov96xvt2phlxvwn2jh4damgdris32blip265wu1u6atlz2c09bk7vm0ou0pny11v9dkvqdtoxrisije42zmsc83dleqzyj4dlu4ucljdqbnr5atqxwnmwr97143dao6pypiufeil6tbmhxigwcqfe756tpzdey9f1qsywse69pon7pilh7e26gpbwvdrgqj48j1rdvfehodzroqm2ml2n7q88ujpz12ycw0xubv3v06fx38tdwvq33jwg09uaoaetb8qmj5a029qk43tumt7diikz013ziapcayegadv3ne9t5ta8zm5womjn0v2fztbnmimdsndoo0vwxzx2zv9bqd60lvnij8yany17xia2h4g2kt30vlewdh4y12ed8a7v11elm87p7utw55eh7xrr4blxuy4ywjtldx9m8zehlyed5bev1482f8lky7kqgj1v4p0a7o2mdgqwv37xeh22n0rzklxoozdu6ougrei189mdvxyor6zjpw68za13jo8gs4fgik7kruycpzqqdlpr33byadsnd130jaaq8fopkdr1q1f6732fjbqbu64g60081w40gd16e4hj1a0ko4fyrmev0p61316uhlt1dka5ofm3h6e776ai0tnb8i4s8usdle8flf74rhaq6mwmyzy40l0vbxk6hhw6jrwjxn',
                proxyHost: '957dy8hl63nbym9h0vrlligwhpakkq6noza5quxdil1vte5qg7xg6k57y6pg',
                proxyPort: 5251263769,
                destination: 'yhq4qrth0t9q55sdq9i80lxx639zr44t0uvhgntpo5fdj4h5z7il4zet861whzof279rkihfrlqkhjgp95uewtqi08figtj5vbmqhdib5juaznwvxfbxolyqhvml7xywzwm65u00ohtcg0xg590a6rnnrqmp45jy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wy0x4stiub3o60b1zg8off5dok0vg9awkknqla0o5g2102bfm10dttqglqtq4xb54z593qf8m6jflx4qkgyvwby9ce8lt6lzwe2wneuiefqt1zw8l1dy9x3emjm3m7hchuqbatrjca39svc8s9bhl71ph4ykvlud',
                responsibleUserAccountName: 'bpjqjuo4wc3kvjwpf0f9',
                lastChangeUserAccount: 'm9qppyg7esrb0ruzyqzp',
                lastChangedAt: '2020-10-13 21:19:33',
                riInterfaceName: 'mw8ehz4s6eyu7m50srecuz9uub6imkm73nn5lv9wiapu55lmvvre6252eh7y8l4jegz2riz7jzfp2xwbcfpxrs5p8cbdrn7bgmqp0j6gj97c4j6mf3fr18udnhtqmbnr5iavc9sqd32r84iply06m6p5x907rktl',
                riInterfaceNamespace: '50ul939acfi3fmrh452wbnu3e95en2uc1ypn728ymyoxezqmscfbltcg0snxi7mgg0y4e1vggriuudealnk5p9glmftqvs58ntb891ux5300izbprbwajjslqzoasklsmva0ggvyli8ytbuqmdd9hebxgyf1yrm1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'vw7il49vsqkir6qmstzewyrwhhzpaoxbd083w8dg',
                tenantId: null,
                tenantCode: '0x0t5lhodv20p2xxgjuww2uvhoy5cxdghz567szik5wtv16uzn',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'imdgcwhfgs0or836g19s',
                party: 'hj7feucvx6z9sozihag1257iez7cqlmsjaxvo25jnwm465xu89itte1br7j5p27f9jgu1qgg7tj24ony89z1l1xq77lqwczezn8u7491vgf71jlzbryfghtz89hr15g2kk4mcvzxdyf7hjnggrdn9ttotvx8i5hf',
                component: 'al0bn6u86xgl8su0evs99cz0mryzj24m8x9qv0gqk5v40op494ysm2gmh4gwoar2y76vyb0sul6ry87lzm0wlomokm32dl9d82pyuw6a5ze6twme646xu796qe5bpqx13mqpwfab3360z3lwy79iuupc0vvw2wx6',
                name: '8pnnssl8u6sqf6mn5y9tw9mfybwxgbks56xl5dtcc1khotudw7nb15hpo0xf0d6iwtv314pf0lr5n5qznrofkz6q6xy9pa8bobld3iig1op2bgizfcs8q6022jfy0fonic17d4mugvebh95ps5njv90hsf03yw11',
                flowHash: 'mowicq1wr5cstan2xsulegt8aeuktb6pljrxvmn5',
                flowParty: '6jbnn9o62x5otg3uisvy7y3p50w08jtp2chescefr8d789f1bmpume1g2s4qmsiysnueynmuebrx0veb17txcd0p9kvvcm44nsrn4k5cey0vebkuyl4bp8eqzvl8mzddjzeie43fpadplqrcltcp39kvt78q4vsm',
                flowReceiverParty: 'kfdzyjaz3y4123dewm9ri720y99muhq0rdds1h9ussgz4lfuzmdabbwjk7hpolg47i5guzcii2dnu1nkysyh1pt1osb7xuc1xvv2sxtgqiqvypwexqnxsg7nx8yudarzuq5cvxym23feh3oa5veexwx1x4mumicg',
                flowComponent: 'j8godgxnupwgohd90w5ppfn20id9zs6hqdj0ea91ga2khkp4spt6crpocbvfazxjqsas1euuwpwygg6hana504ttlkz7qu5okpq6ofhfighjp8rxff00uyc4nrag9i7bgc58mavqrx3gfo1puhbjsqmfkh137hg2',
                flowReceiverComponent: 'xjuj0ahrkvhqd1foim9j3awatn2pro47rzj0iltlucj15qy9bcd3xv1pb71ol9350a5i50swbvs2oge4yxvc4h7px7jjsag7c9jutyeq17ys44uuwrvk7xwhjiudun26y38acyg443kjuclp9rkl14gu1ifzk3rb',
                flowInterfaceName: '7j35ucu5niawfwhps1oaygoppqaphk7jvmft442js5jy7myhxt2r4ju7s21l6nmuqw8h1l3onrvmjikmg70txzq3b39ywz7zhxsilwwj1g5ooyqfephmq66wzd7o4bimlftwaqzze1bqp6xe63qrwxxg55rnxb0w',
                flowInterfaceNamespace: 'yu92acwsizn6yicd9ylax0132jrhctkzpo7kvxt627dj75iz5trep5i33acmfnsx4j8suhp875sh4pnh0iy80ha1ow38t8kbdpoeweqt7yigdsmxtgd0uutoj1oh7ae2ctr79y6dd8ekfykqreufvjs41ci2puna',
                version: 'ycu7j8xdhp6i55sae3dz',
                adapterType: 'vhcn7eesdvkswvc2gbqvdjzlkak0e1lvrmwc10czaf5v2paod9jgs0l9vja7',
                direction: 'RECEIVER',
                transportProtocol: '18cenmvubayzufiv8ufy8986imbpm0hfbe6xyw6mivmuov9i07z6pd7we00m',
                messageProtocol: 'oxi44px4ot83peiwtcapeg1kuoot6dmw1qb6ucoagay9szgmy07x8rskyb78',
                adapterEngineName: '11wfnphcv2ya3emfyb4ury3op6rpcgahykup0i6zo8infyb6cadt8pvgrjaiy7clcdu06l8vet2rh1u26xk0ww89rvwv054fugoabb70i7o995q0s1hp9rcwlbwqsvg0t6vtkcuwkhyns2my9rkrxpoh1ykwq9a0',
                url: 'pm7uxidven7m66xxfvm0kehbau1bct909d4ll0e68g773ni0fkfs52vfl0fbdcvxgwoukwhpbnflojcbz158ptezjtxw88ygiy78loodjgv2neun2m95egczvmucwrkmoy27pqsfow0i3dsiirrd39s4pxkzo94sg7djmauem07d3ltmpkinna44pr3gs0birw030xo4vg3nljxa9rbpb49cmn7u7wha8d2m9ectoccss5qxzxisgxiot1cofvx82nr3okchf038lgmwix9xvzht7zk1wtehqp0788d1z0gacycu0ahwvmebxipj1why',
                username: 'verwnwefplgssutafqzbwj1q7tms9u1b24ljfnh8bxctln3hj0vuqssnbcbg',
                remoteHost: 'z8ip0xxnjh7g0qv0x43hys5146ijixp5nybisnpw1wc8gh3j24s8k6do83ic6f7eg4s5ny0hj42yv6a95bhtt1efpy407ecnrpeb549zu0vpgokh9gnsmgjte6rji5bbr1eeuxeniun54gpdqy64sl6iij1bhetl',
                remotePort: 8038040279,
                directory: '48e1licsz05r18wt1w9sc5c5rawqmlncssurho1qz32r79k9rug8dbjigh3poisnaql2f64qhf4w2onxzgnlizcrxb6jugjsdu7dl5sv3n8lljnt0ets8gdp6k2lrzaddt694je8cbor8zoyrw6rewy8wu17yronwf6pr4bcoewt9j2l1ayfgzxgj4geia6vlztafc6kgnlzhyuvg3k955qxlhobqpvy7c1nvzoeive9w5f4d8vniwymghlhknrfy08yrx2plitb5ng62jyl3wvdtbjrn7hb6d6bbadx9et8kn4umpx0q2thwqfto6mlfx4ux5zbagt0f8rhu0xlwvk6gr0gs4n54iz3kj0hnj9sj5vo0zytnk41qd3dxupn5f5hrno0vq0leaf2wd5otedhccv32i0umajx13y3nvukuf30fgr6y583xmztiqt5uvyh9825dpvv74kptjigqdzlbao49wi454n82sd0yuwr5s6orp3kl6igmfoy7dzv1r7zgkot4l2xympv49r6dytkosw36z4aa2en55a0b0pbg8zlqhyfxvt7gxw4jdzxj0i08b7kwcg2ea907826pa0rr5ncx6d42da8umnkym882q11n0qda8gjw84vv5okoxqp5vhqdrrarxmvfieaze7ldnxyfjdg0j4jxa7dmuzwwmx1frifzs9kizvgy3vkhmst5qqa2qucrazqxicxgmko3w2fd3ghk9hyh1tkxfowi1pfpwqhogaau739nzmwsbemkcyth8vfuwzlgorw4wtbw00dubcf43b884pjisfvyot92fg6tkfiz1t1uw7rdzmf4gerxs42odnm1zywib585so726nogx1pmepts294xl7rfdm6q7rxldjcggn23vumzw1relzi10i3w6xqqnq9q4ihr6dur9lywgysz0aydbbl773og99y5nuwdh1tyhr70jxadxvljp7raoclvs7bodxh33a6owm5wiem8hlrloikq6j1ibtr7p65cn4g',
                fileSchema: '18csx66sclbtgesrkyeipcu35xl7av1sdtyay9gz6ruwrd8pll0mo0138awbnetdhxaueykq7qr6qkk2u5w92qhbchjv8aoszq009mq5u1ow6td36nmgdy31tdzv7yqzu1wdqt0az2a0t6gqudjdgoegdlqyv65m15pxkpf97vk21ja3l0g2hxsjk6a9myjsb1aqw9lrsfwcqvvp02vcs4yugbabv121xeofwi2o9058yzprg85vwg85v4h78i0o8schd8yuc6ni0o7gc7korcz3j2w02qg1ry92j78gjkg4ke50m7e0o5p3738makhstktnz7prs2ozcbtheuqoj8505uo2gapqy5sq64rxmnrg5mgwe529vw61icgmny8jca7w7qvnjk6pzpbnnsn1i34oia9fmjzsb6tstnfdc5ttjadalfyr6l7td2mldt6l8hvhy6f56ftw70imnxthv579v341vwepoyno2roqbzb10ubcsabsp4lxhh9wikpude3hd0mebebbirt5i9m5m0e6td9mbvzs1rujprfrpxhymhni3xq9bgodhwsvc73auc0hev481n0wo1ma070i870x353c1k6y7qik9n9xov7e0sx5x78xml0ugb3suo4egjk1kx0q42to8b5vcbrjspk2mrlgmb0y6c8sj252wkpysd2urdibqlm3cbl6ahz3ezh76uzfr1982xub4tijwy0c5hpdmrg4jmcbxm55qw8h23m83ahgzzd5ob7p944yaen75ukd971s7smwj1e24abd6y7njn73zywv38sef7vqiimfsbjynd4xlkqmmemldqg8qcn79kvvamkdtvzbf6su0o33mpoapb5ykke30k1no5w64g99lex8fqehk6v79tmmdxueevsnx31ynht5896l3ndrh2nsiq7buu1hdtay9jzvjkm1e5fyckwf8r5pdz1orf0gposq3yq0ysybzwxppkzja9a049c2smd7w2izr945ffw01hdyp3h21lwk',
                proxyHost: 'qmrnhhw1vlfcva3pogf26flcp08amf0jviogosq7xs119phbblktii5f72v4',
                proxyPort: 8032778397,
                destination: 'odjekpxs7guabxafh5hvz9pfptz2a0svrthaomp0qcyvr8stv2277gvk0hmm7202fyyiizl433ru5uecogned7tzoqmxqrmx13718fh9vxjawcis5a0yhvmtdzuwry4kzwleb92hgn0zmhdwp7fbjasd49l1bg3h',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pj4wie2auklpe6k7vjcnsper4odf63cfehx259tgn3eftgc2nwapg0sf8elcos40q2dye9qk16mvoggdplugqjw02g87mrssh2eyoxq7upev9umrvz5til9cc2c2gnd43vy7j7caygbricogip4m7edrk9jhqslb',
                responsibleUserAccountName: 'sxuxfrkv8iwcutmjfauv',
                lastChangeUserAccount: 'i8ens1ell0kqtqc9f9e6',
                lastChangedAt: '2020-10-13 15:27:10',
                riInterfaceName: 'vzlb8jieq350k2sgoyif0hsv0evftmm5quvna76tqpvt0mt7evq4z78fnx1qa3rlc44fbna8ow6zwmemi4cv9fhl7fa5btr4yybc66fdp8s9yedg4y96e6pmp34fm43ap1rxlsbjbjqzbhpn96xyz2h0yxwsmllr',
                riInterfaceNamespace: 'udzq7zcfrmlr6coda9jfh1we5ufzz77zy1k126c2inrwjjcp7mfu66pd6czhqsw27pr44immgpcrse7ffk4lr95z9uql6divci7qk39pawxtulmuf1jy5qxmu2bxwigkditbzshvayxs5pfj8697693jskoax61u',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '0lz6v6jvrq38qvygp2krht4yr574wf0xwyk98jw6',
                
                tenantCode: 'gockvdgloaryv576zwkxt88zbnqzajwhwa4j8u27wkfb6jku6q',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '79ngmpgifsm6f141oeif',
                party: 'hkg4yn8xd6jgwn1wgrn58izytvcvutcequ6d5kfkwve9u0ujobb3xtm8xorltsntouqcquqvjuaso4o5hco566f4h5j0wyt5k16nnx5jp2q8ob8pp0xkfj5r8ihnoke6p2hf3v0r8kcnemb1q216bpu078fei2pz',
                component: '26r7r4qd8su93ivj3czre3a4b9t3l4vytlgrcvyvl3y46jc4iv83ui58w9jg0t24sh1kj08ohdakylgc61mfxw26p9m4vbhbznf3tn5u6v18yusmqe5ws66kl03zfjoaomeeaul3jm55ib8b4beuvpeelk3wybrz',
                name: 'yedxay78ny9dbv10l7ihjnwim8mt0c2h72d8ythe9lkhwjr0aoch2db3565faktytzkatmmh051wptr2bjxmzpufbljrp809chh1oy1bblb3kvs255dmv627euzg7dy2kwga61221efv0nnjc0erqhyvz5a5ei8n',
                flowHash: 'plznbn5mnzfydiufcueib3tq41949npog0xgseq3',
                flowParty: '2pp7uyk0v6ist4vwm77l1ad4lbeosdwfbel76byg9psg4lf13uohlpx6xrvz76v857qpgc3yze560w2tqph4w8oirdf0qr94jgorprc4nja4kqjf5hmd9043tg2f5dq24qm68tspl6og70y7z9gqowq6b9fpu49s',
                flowReceiverParty: '5zlyd7f1qq6xgm1u6jtdzjv8n4e21uctz4o58rq1urlfq59rzsjkmm7tc2swdkbbdw8ev6yk6jyricg1q0ytudk59ys6ul460keqlji27rqmc0v6dxnz0x0vi0n9eosfc8p3f9iz6b8tsyu1ctsa4ya22imj5xsr',
                flowComponent: 'i2tv627rhnhnntjc9lhwkx6zf5ym8b3sbocnnuyukfit8yczjq2ouv6278gjwfoslg8so8m8fsr2b7lcrhum1fg07ywi6y1ksa80dd86k9yrb9ljgtgha6cx51a5a9w6jwms2065r2m9quy9wzm6lk6if5oqa7lk',
                flowReceiverComponent: '586hz4y1smxaqw3f6qr580vkhnv3ma4ktk8d8947sxz05q6hnbu1ogjzk57y0l32ej27gcys2uxwojawrv0gdufut0cqsmmto5gsvhoy99df90gmkh1lp5m2h3cekg3egs9hjgglpxe6la7dwekq3ixiy36i6ce2',
                flowInterfaceName: 'o8zu26r7t8sxz3nwceebk3ewyeik1046hfth4cudaq48l1sqsm1woyqvscf4ie1ruqj170veg35lvacy5ahmiz5he3qauwbhdzsfnkgojg08g3zawg7zyfd26cw51tbnh7xmqol3h24rrq3yuten0q2l7oelw55u',
                flowInterfaceNamespace: '4yuqgt1ldarapa9iw9vhcdvy7u1yvgcu894zlrrrxnz36n0z06vxh5k8ygq4eavody0myixgneovemull0mqa5il1grjjft9k6v2dvjjg0wv6dexacvyturvlkqitibz6wkpyc0sjrjj78flhkpp3g85nv78kocs',
                version: 'rc2yg8ki38d0j2w16t2n',
                adapterType: 'k7sdcn2emvejyvcm9bszfyoef56onbo4ljh2x7hp6zx5rejexjc6qkua4s7o',
                direction: 'SENDER',
                transportProtocol: '73hhxulkf5irhhcgkzsqac79sxsgidqjupbeklohk16kqzib4ht7ynb5hyoe',
                messageProtocol: 'by0qpkvucn6ag2ba6pxtps0lihkypp83i78tkanr1vbqiw4y5v3jggzhu1kn',
                adapterEngineName: 'ymldiq95jz3kg9wsy6mppj0vajwfq0tf934l7nj8n3whu3rtqyks1242ch6qh52vl97b576y1bt94kyzut24exvsiyayfvonxqjj1j775xtdbvzl1b2rmq24up70wglw2nsqm557dimbwiqzu8ts44cnp5a0cwf3',
                url: '5716xmkkze09a6h5nwon5p6lgl34zbxz836fibdi6fyebwwzhhje2g46dk4ktrmu616gkm6wdmror5qr82xoobhoaexuwu8svrpdrwrpn4w5zsu7on9uwbfo744jc8am7s9d2nhxhuqaowlxogowe1v9v1hfew112wpmlcq4zok3cfkbcrdsi7hsi35ved1r6ig223qzpetmx43c419zkkacwt9ghcd7ebefab5byed2g4ebpbxeismgyt4wxbm8011iys4fsg2yzkf8u2jkkc0x6iplc7zm7hopci9np1wgrqv6rm97oaz2mhruzu03',
                username: 'atkdf26e01d99ls5nqugzilq8ye6o3ngwk66bo97rwlaky2pxdhupbtjuv9p',
                remoteHost: '184m50qzcaooa731vfylhairfcopu75332bf2uop28kna9q6sfq3lq8c8278oosreempdne44lk6fklldrw92luljnmjydxqwy0r9fzrnjjochfe5nqg2iqh4nemuqhfg45rinsvozt3a17mzna6sk1zit9x2akm',
                remotePort: 9217266222,
                directory: 'yax3aonxw7qk32elxqsaqdv98xotu0hhul5c80y9iaksoj25rpc7lx6ikin9csgfoesgxbfj08v7e7c6att29s7nv6ayxb6gtt2p5m7rvu2hhhq7n7gfaeeyzkpud32kilggg9rpbq6gb01bef9lylt4guklydv0kran3jerc28rckz90d4a11xbbwztgzbjj17z1oio92gw0lewfleplzto64zv8riwo735wudrhs5j00a3fd07u45094fx3tlksdvdsuywnyos032bd89dyga4jss33hlefqj6ej08ffi3lyitq5y4lss5co4b2p5uvoo3oflkwe9wupznkw61hp1ea845q2hf8w7zyivlkhgz45zxgymgjry2y6y846u102hgqy1nea84q7fvl2xyereskblnr7zqqw57082gdb3j9n0g8nr5hs596pdo6epx4304jboealkfh3f4tnyz3nvbvrpyybg1tlfx7rdnw6ciy403shso1276yj2avd112rekdea7mfgfo65qwqhq4tzwpkjce0r3odxjloef4rk5bfdqxen9d6kggrhvu33nkyq9m0uxbv94ia7oylvaaqauh68yt13piiuzs95pspknwvje5qiss57cp42tn5ckyiwvrh2fi3rhn0jijpuy8o32isr3ivumouy9vr07nxzle39lqiwtdlvb5qqjn21h8s79fz95m7wph3ix0avdw12wey4zejngxeuq1uexavdftqcupqdbo2ymksxku9v1gzihygmuj281x6070ywvbdq25lqrr0z5psijl9j5okim2fv0gc31ogdvx0yl1amom4oobs5jzkn2glddz5pxv62v8gu0jb12a1sanouqu8yvnjdq8r3lx2sza9pxlawqdkdp9qoy8t91t30wa01vwp4a9no83ku23srxwehddh9fx948ixs8tnvr0c90md0hyclbygox88fsjrbkdhps3l597inrf69jz4x2nmt3ar2ay84ie7dccc8dzfj58utk',
                fileSchema: 'sszgjo6as2yudt2na3f53sljozljje3xcx2uj8yplkiq3214zyuqxzu9mypmmw6glr59wkuapjdh4dldfoomhbja9vwfzpirotqfdzpgo7vg00fo6v4oxuan93dynefizn5c1j4rf31auy2fluswbbewehkzzbzbolt07f3un6f9mhcv0ud6cl4xdu6v0vwpojqab5nzfcw7pq3q3g8pfh6uir5c0qz12a8ygjqjv3gydzjn7xqks49m8qrbo8lb5iwziisxvlgmu313wdyykfvvskdb5q72n76cz125cdm7p1g43zkyh7bpt1k366ebijxbbaq6l13pq9dplifc6uxyxszpg0t0glea9b7mwz0hnqqwjcotij7gb1ln651dwud0xl6mrpylu2ad34c21sf9jvfyrx55yyfk33ssp8uyw2sb8z5rkkxff8smk73xq6fajyyo9ut7tjx39mv2d1jttgkj1qhvay54mnaaocxumy0h9uft2wy9o7e9r9y9tt3b7g5g3f86od4bmxfboxwu5ajvky0xmd359f7q5pqi405wmzu43d8lsfjzjgg5rbqkxwc29uhmol8rdxlcy3xtwfvfodt3iuxqevq6uj85if2t7m3ajbcwbtifcgug4edv1e1f1olojmbqxpac32oifcqi65u4tgt5u12eo6ypro8u4ncxk9elw4dav13rzeaj4e7j66fsncinydjzi9zi6a5wqrhdf1rz3saz86qwwqrigh0u3l26sre0p9b1svy6xo7adg0ahg0hw6mdstktem1we482nn34in7l1wjsxco2vwftevu5d7vsjpwb5uiv53i46u2prm0gpjq5zdycmzdudw1z0fuuaru3zydszftel7xwo1ii47x9ig553waglotuwyunvd076xu61stvuh1xax16u067ysz7m4596btjjkd9mm0rlry073c43ozyvad8xtcsqikvvmnb4hegl2y4osj7xjof1dj3nf5zair6vpm7bpegm9uatj6l',
                proxyHost: 'bk00jfkcnhl5rx2wsiggqk1p92lg77vhr39oyy5ie0sahizpc2msr6e6d8i8',
                proxyPort: 9802763162,
                destination: '6nn1ilgcicrighaxas6us5y4j15ibl7ikljqabnwtvk0oni2hz82x6b4gx3at4t05xhwovgk3vvu22zfogv816tpyesnkmylwa9tiovq8ox3uw13z5t81blay9qqgjfxitidipsw4suu7k3nx4a4ojprxig0n6td',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1o9cwqrfk8dgsdtwomvb7x0w9o94wqwbe2zwxbgwa5i762wa4odbmfssts2vmlbg2jyqpjgmrxrbvyndecqzkstzoy0ia6xlrbl3h0vhfg3plrjh3vs9igzrllbs84voozea60uajgeaa12mm8bza2jvss6jjghu',
                responsibleUserAccountName: 'kbb55z2bqijgkmqkhtzd',
                lastChangeUserAccount: 'nrg4nj6iihrbtqnb2t4q',
                lastChangedAt: '2020-10-14 00:21:20',
                riInterfaceName: 'sv2kp2dk4sy7iyy7mjvqbfmzzc00w56q29rjkke2dwckdg2cy0336evzrbyrhklx9q6v2l4he2k2mxbqwagtg996bz9tn6ykvkdom4etgq0ttk0pvkyjyv2ftyeqg4a4cnb26w00bditralrupp6l59xz5tu9rf0',
                riInterfaceNamespace: '3i33epdjurod8chxbcgipe09vd7lxdyeqeunkxmlh6x9y9gl0ymyrodbpu79t9xg7sxeaksu32o6zfzz2mf995q2o709jzt2430carcocy6oybvb9rwyiitf33mhq1xnyejz3kz2zz7jwg9ng38qrcmd242fjdws',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '15ieqh8emdeev3pzstq9av4oatsc8bxhciff0q9z',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: null,
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'ss8utphqob4a0h1pas1m',
                party: '5pa4bvv1jahigbnddsn0ez56q768ojrvx48zhp07ghigjbpnsp0p0rape7swahiggcz22l8qlipvnobi46mypbczyrqi9j9tbnydv03ni2m15as9w1ycik833q7sjr4j55jpfeqs9y3aq0pj50nj2wih98d2tjb6',
                component: 'kp1qu06l21vy7683fwmtrp3vhqqe71jhpjzh0p0p6zpmwc00hp70k3pacd3y927tfbivsbn501nv7s0wecv9qxexsucvntzz6fbs5k98zuftjien74gb7ofw41mu556tt7mtqz79k50pcouifdj03vs9r90t9j71',
                name: 'v9lyf61qkenctz8gfv0ta95yp2znnnocvik1qs3wqgux9h6m0zi06sk0wk8q5jswxqsi5c4akfhu6ti79w7zc2pxn3xbbwv29ayayz31gbfvtksijxpnk23m8ws5tawzqq5rcriatzen5ucsrd626ez1odtryg7j',
                flowHash: 'u7qt5vionso9dd2ihvnlot11yhliqqodpzx0n3xk',
                flowParty: 'ni50obcbvgloov9ygloz1seequq3pwal0xp3mchd4qjztnsordt43ig5ia75m4t83uhc30i6g8y3hrlkui4ud25gzrqihftxjc4rhscw8831nl8bjmcpftex23b6pk23sfvna99rd0fum3z4zt8cuh936z7a9ugo',
                flowReceiverParty: 'pbliwomi8z20cm7dbe9fnp24crcgj7r3609ymeqlh3g9hfi319t041a4moatvp2iexcufu9r9nrxque72cvnnfz2e79tl5vtbe9ra29qdil08h19bfa79s5mhfzy3dvl7glwg3qw3fcj5iypc5xczsyf1leojdoj',
                flowComponent: 'm328yibsja5riethg3cghx0se848k2ktg2asa8hu7urjp698zmaxgg9huorufaucqeco6lb85k0nntx4u2bjnk9i8d15i33pcsogpiuwz9u16b7an2acaf8fgi8f63eqolace7mlplqj0tbd6o2qcwtqfhhvc4q8',
                flowReceiverComponent: 'zee3wxp8h9ucnrlqbggvkqjw3uck9969y1afn19a9ogiu9d1wfdxsb0u4lc0t2b8m2qt8jxulnni5tjry61hykxulvfmfj3h30znsopay2w7mkvy3uvbuo4b9fmn2apbvv6av8y9m6u0tp95uwjiezgz03hcnqt2',
                flowInterfaceName: 'ngxh7syrhjl9mqvnwx1m46nrkl2za7ybra1ubpdiealtnefv70bwqtbe2m5qrwty7syemq9m8uo9jlu4y4n61u0ue12ayyx1eblii9p7ciqz7o1t67v4xbxutfz4sq0pg9f2jlx6ps2xpjz1wig2yxdwy3vfo9ej',
                flowInterfaceNamespace: 'mhlmei2zdm2uljnetszx2d5x2egno9blyc8bfk3ethqtbrsm51y3qnfexr7n5ye92jukoyhyd6po537r6njq40439xoj50epmqr7mou0bju78qg5byun05hposnrfw0gn4p4qjxeo9dy7t9tigkf1n4u4gfpaehm',
                version: 'insa8opv8pwpctydej19',
                adapterType: 'hih972k4lovaosnkwskrqidjyzg8yzl8mxwzss62x3ishjsc8olen9xqchsv',
                direction: 'SENDER',
                transportProtocol: 'clshavreakj6hvoldwq3kvge152gitcjp16o8fnzcg6sg9hv3h528hmnlj2b',
                messageProtocol: 'gm73j1se6g6doarzzzmqvsdsqfrce2zj7rg4hxbwxbw0u8kkbpeltd3vddas',
                adapterEngineName: 'b7tkh2wjprf8s24wki6rmqshren1kzi0bynsqqvf506k58utiwpp3i82rxt5jnrs4pv2ter34s6rkmfb82z55lxjkdqylicmy7bfgpqcmmltkgtyuzhkihp3htw9wcg8tyd3durs8e7xx4a1w4zded4e8x52rwx7',
                url: 'ksukutxqmmawowrgvt1idwbuz12t0ilrju1012oihr7313rqiy0xknlphhb5iwneq1n4ik2ujhtub039ec0y7lsbtp2gvxpj674x8uwzuhfibx44cw28da6a9id53p7p4ag8l01udnyyhm94g2w1lvrjg08g45e8tmcwlkslah8gt4umi60sowmussdliufjfo09fofrcgbfdz4mnn5hnz70h9qrf3vwbqn0gmd0oaona9ydpmsjuprroz66yetidq9zwochwpafd03baodu58lfg0atibkyvdfurlrgf12hvsl025bp0g08jx60qlvo',
                username: 'ij9jdiy8yi19o7ppa23xh4qjwkmqjqctni3m13w1qf14drzpd86jevg1udpb',
                remoteHost: '418ufq10gmt9mnv658a1w2r6atdfug5c3eejmyz9x0n0k161hygnmmo89ioqa068y9why32y9jk5z7nanhqzyu4nuxc6f5unfek1l7vydllxjs4rasgqsvmw5a48rvb85xwb48hv3c8f4col830ioxtt3tf7wxyp',
                remotePort: 3508804395,
                directory: '2hefh2ejjkyis0bfkynds5uf1h6nbvtm5u6u7rymwp0d6uqiznh4gej33plhq1wptgpr84iyfwpbrb2ajqnwvhgmit3zsxfl2ux7n4c8umptdr3hol5zqoy5givme4kmscpu36u6c4vr14y54zftt9mnr67st9jbthdl2tbaj2mv7neo66dyn62sl2mu51ha0f7p47on2gv61xe7jzbdaanud4vaymfccq2za73oadhgola2yhommuy1oyp1k6r4vbq4qaya2b7nwal5xic5gndjkludyqds0dj7ug9iambrjv16k7khybxei49ajoacf15r2uk3t8rzlapdzv7kfk9oncx70lmhkqp5cnydd04hkmz03xqmknv33yo4ovn0d8yz6w90vo4uc5ejbehzzypgyqr5lj9tsmfalc31lkuhiz4d9fociqszqe22d5yarseyww1g9ddlf4q1hwqd5degtkznamk7fu3y83s8lpafxu8g1043dhai2tiej61t4ks4swtvawiuk40odl5w664x6ui4za1dblal0upgv4ymnnqqxyz6ver3sg96btob9xop9kp17sowkbjbivfk6nnrm6inl6bsfuyg6ihkkl4spw2rxt9dvhle85aze8s4bfjt98ihki84wf15gzxvddn8byeh6iukff778c6gk7antjimyq7jtgoff7fddh4vnaiirbybpx78hojp0krwuso069xjlc6a35nqmjq0d3o9gxq0uj7elaswj1wkyblsu4ao2kunanbaqjk396t17gsh4qrj334b2lrmn2ocd6adt9a3cmnhq203tewjp31sh8wpkyawfjlwxxrfbujvyq4x8v94lef5bdfozt4pyzavvg1wd5mv1y1go11twi63o6vuv8wzetg4yd45pmro5bc0fgomgsin65r2jprhjdx8tkwm0k0rqjdhw0acu0msyij3jqggav4hub890fa2ld1jweo90q9aeo4j5rzuj65y8tyx0mvygh0qvn7a825p',
                fileSchema: 'bdvm3bxcjs4i7n8zvp357i22pytcy6gm6p5rzsa39mne5bt3njn9kylo4qn2y5jumppc4r6pegdinug9qljv523v6g1ysqsg3dvjgqf4qqeamwy1mpjq6wumrgbl3faydvsfm7x7bf8thls23zfv0tggt7ae14g3jnmslrn35cv5si7mj8bhvuyoiipj4orpudixzjqls3y80ftb6xd65muh6g8wo1n0ks0qzl96ovma8nqqf9y20mtyp45xjcygt3wbzyf20y0znfmpwn8oqh3plqrnxb495dvbf3yjsbnqji7qwvsmtqmy36vj7ak8n3lywv0zulico3pdkwb623cw18va7jwh5iu8r7w13bcj6kw4nzgup7y24o88v9wtr5yxrssvtfxd4vfu43mv1zj6rjvxerqmhfloeyr3thw3s5s1iok2y0acckc4zsoptzf0lmqifer9r70c99orj4vjukwm87gcnnjizm74xmq7uro2saw1qc5hmpka40k9mlh9mqm1wb5qn457reke7v51pb7ozcxadzkwk367x3idze1u9jlczxnjpuxll3f9q1c6h7tui9gv6w5bt2fgoli2zwyujl88abm3fppevgzr3u50b8k8cmc8stpkxwhocwlbpg87kuiqa39jydir9s4bttza1ir88480kiod4240y8xv3f9999p17n4ud902x0tmkpqyyowcoh8zkx6yiivkgnk6u70sjr0orxtv13908srptvclg6198n0yqavhpu1ckf13e34amvcdiif8c8kzv1hwji0p8o3tf5c3ex6hsetwzojneefvu8ijbah7e2df8j43sopsbikyc7yp3p8d57rer5u2zmnonvw9vfemmgxno8cqlmt7eg0qwu23qhs1cmwixc1pt6amg47wk2l5m3833iuibb5lo3a8x3wz64qx03azhk1klo6bekzdyolcztu1mam1dqfx2s2k29pf3jc88t506xhtbw2o07y6v810ixm9xhc8n3ngm6tp',
                proxyHost: 'ytvocnjqw5d0kz060niwamlz3e8uoxgcfcfz2984wx3l1tsl8xpcjurg6duh',
                proxyPort: 2789562605,
                destination: '41ova4t4l8v0kziul7by1n0sql9xuvto8206qnwn16imk1i0wg6f784i8kkd2sz5vi4gnb1b4n61uj9kzwlequ4k2u6vywy595l6fdnmfkk31l9nf5y9cmyhoqbv99cfcz7qhgbhdchzxvcihf40k9ivsaq8e9r3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'utavltdxnesyd8hfmyck0vd1vhhv0ntk9jgf9c1orxvl7g0wopg386kt9mz2oyxkwn3gomq0d2evq0nxsbgxguznyc36yz29oh0u5ex0fbqa1b1et3k0869425yvk8szgns1x6e0tarzixn7zl9lf40s65maoi4l',
                responsibleUserAccountName: '8astledisla9nih3j9kw',
                lastChangeUserAccount: '8u0z5j1m2yjxpt5nweem',
                lastChangedAt: '2020-10-13 12:34:36',
                riInterfaceName: 'm5zdtwfjcxv7w46phvckfk9hednkgqqxh1p9ieaxf3segqgn05nstcbn27tgyrwycxw3iqoxlezkhrf8lsjiwwyws2ztsoc2gxicrosymldkvx5jp1ucg1z20gbgdglfv0iufu2f8wrc4wsn32gwlcee69iuy0xu',
                riInterfaceNamespace: 'esgd3q4dxfu1x7nd0t4h447x7ma2cde70qsozpng902u6lhkwdzw4nuns34yiacqdv9etf88cffggz35vf9ikh1uag30qiw6mwzylw6nhn022vf4vwe0jtd3wa3urlz9bqje6964969q3dysnlxkutatra0yavkh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'z1ipcrxzg7mob8b3x6n3iexfp1dxkdq25g03n60n',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'ziykb33frxisp1pgzqkx',
                party: '3r5mqs2uaor6fwobcermza7wtz13gkqeix9kico7prbwa9yidk9136uo9jz69jub5r4kytmmccmfextvnbq749a0h0mhtp14zs3a8a4xtsdpi82o7q5hk0f896q4my3nbco42cs5i7fhkrtcs4u70krm5xh07aua',
                component: '16dv4e6e8lcaa41b7d1oipcyn68ackurz1q5qs7h22cpb6fzjohq85pnqzw1uw4sapt1kyg4m3h0s9rm93adfrg7j9omb6l8cvim1tqsak116dtihciu121fvdzwxj10qwfa8jmfnnf2g40uk1kbm3lw7yq762sn',
                name: 'ul5ztwhfx41yzuojr7bux3ayw1unqf9bb7ngf1v8dd01q7qnjv4b1op1io8jjkk2gqqc2t0109y6vjpmsagq8bprzwyitliglwqqshse8b4vlboljqko41dhaxyc7jjllfl8nrhmorofy85359jii0sqmorvybev',
                flowHash: 'l1vqalwkjp7p0bnm0ea5jp91mbnl1syozszf33w2',
                flowParty: '1qv6qioqc8agpx6alqjuekg851actk9jx2j3hcq2ry0e05o50k0lwb54cnvu8w2kkvchf2h7flb207wlewc4hd6di4lw76phjf5sf956fpvca5s7spa9gi8321ea4tivrdyfeop72phtwjmf0xliog42zlh4rwqu',
                flowReceiverParty: '4m952906swvobmtx961dyarh09erainzfnxv69yxggdv7h04ihjikf3eq9hk6aesmtns1mvnepnb2oedrxjlpb8gtdx871tv2z4hrckw7ql2dah7t3ckqou14behhlgk8u99ziij3fmt4rqnvlm52rpy8a9tmp7f',
                flowComponent: '6wgjyie0ts1xprtkp9mx2hg86k6gmud9jrny80vnrowmygrjib9so0lb0hu5iltvt9ccriwxadao5571e4fpikzpam7b81g9lmv7h9wiimq9zi9fyo721ipbz17sro2wizzbhmxx6b2qclob8hy3n03n55716joj',
                flowReceiverComponent: 'fyj5ab0a24vvifirjtpy2b3em8rxnwtqw7gsrcm19du9jrk9765nkxn5kjzve35oua9shu4c27pc96au6utr5m3c7ufhrmi1jsr0xl05k2i1t95hn7ouhnfkhnjwrz2ypdgk2ekvd2ngppoz8gon7z6gxc2gcv0b',
                flowInterfaceName: '8ctqicqyf59wl9i5ht1neaqdxjjh4hikopt3krawkcoxckoo6wtfdde8qd1u4mbc4t07rfkm4d6lkewiaomel85ez49d3v6a778jwui6pr8u8haebdxdejqv65icehj0naekllhcwepxvqpup4m9m2rc4m19mc0l',
                flowInterfaceNamespace: 'fijlxv7fbbuo0nrnn6rsu6ep1jtirsizade6q87r1yhyifvgobq5wlmka9tc3j0lhk14d0hopu03agc20auny8f6ilmudt0a28dx67hxj2zjijak7g62vfq38ltw17hmy346245a6lhcq5helx4q5ife40kpkdph',
                version: 'ybxjbc2a9g1eehtweslg',
                adapterType: 'mnpilo5lqvn46gjj20b37z07rg4dagr366t0huu8i57na3ynsq25w1y1ps0x',
                direction: 'SENDER',
                transportProtocol: 'ef9t99d7csl3u0alpq9u50febn1j4bcv0vhag8aux6ghkawwtttauaa8up5q',
                messageProtocol: 'voicqb1ratfozpxvvty5pdbr00tlsuv55v0nu08nidei0dbmd7h801rlk6jy',
                adapterEngineName: 'k7eh8ikbdloov08voqxrzlc18t5766f65to0k922xnjeh43fiv0ina99n309rzspxkh13qo5k4faip2x8jbzyrqor544txxkqqh2t6p10qqhxu4yygz0luxuqrw129ikyuptnscjqsnkx8zhe6iojn62z5y8rq8m',
                url: 'w08df61p4hntfo96paf33432qhjc22r5fbt5zi3pdpwwagsfsoc4albdai1ezfrazxzwnz62gplka1z9kfja2ac8m2b5j2w107lmes2tms28e6bp9kqg9t3bm7isr5vtybq9qzt6qu1flmls16yi2ig4lxmels25i8xmh5jiaabta5vqa5gilg6cp5dvpueh3htmh2ut8y0quh6t9xlj8d1nfi8gh7hsvzk3enimo7zgtcuku6ne4hc8m5q0772xgst2xqfstu3xw3miy8n7alncsoir1m7vvd0vg3fa4z26emyab7qqoxr0saeay0ip',
                username: 'hqlcjthtmqvhpwnhot93gbb2vtpy5rk5ohcm9sj7wgtueb2794iuocplzda8',
                remoteHost: 'h74cczpvgcdji0s361a7ylujt8apn6t4ndokl9wr9ai8066gxb245v6quyewotyic6zfn2mwj5e88zepng4m2fy824xnsbbzdf5ycibf5ttp86zp42v6um57c2esfvip4bqvkgcx5wd8qmh7cx87dxsrcexury2d',
                remotePort: 4653813235,
                directory: 'pldfllpc3kv36k1yb2zbkehgjmemumof60ofay7381kgq6nbdt1qp6eh20ua3x51xyszr06tw5i0pubdipgobr2kbk2kacyy23om12t7ooertqg7wnou1hp03243xo7pt4vg2ydm4dlub8n94se4ox7otot6e2p4xpxp3xddwzhyszzufoko0o3ysx2jv4fsf85d3dl48cy5n1wie8aou1lw52npbfcdo2k923rh61a4pjhkxk3pkg4zsdp7scb2a68cxmetlmgloyj9nz9ixrfu1grsscj4cuy4p6h1e4mpn05kh4t2yxoxrxnouq73s3kzem03d4pt7t2nt3q17s2jurvvm5hx4ikit9kjllzut8vsvftyxxceqt5autjf0f1p3go1scvrfyfm254jm1g17u8vktcrppkhs21i2eq4hu1byjtp7h78j04v8nhi19odrg8u0dgc2jqmwytb2vmcjte6dc5uf327blq77afpixv1qfwef5xfpmzj7c8dgsv9gqutwb26xwrf9xhnhyzzoh918ecahyesau9cg71xgfop2f0vorem6horg99sh6epr9m4gi8i930pzmiayauy2dtkmdhh7im7pmbyk0t8j0y8vytrzjabcomsl61fufz872kkb6yz6inag1fx3dnlo23bh9n8q7kdw82bhbnaoajh11raf5j0m3ecmf4ffj8o0aw830gnwstyqkpe12b44cdcbd04zx9ya22tz5dqt26a1okszccp3qc04qw6ug3eiaj69fc3vogdpiqb8frb7yf07909s110oabojh76wgw7om4xbbhufvcdrr86kelh24nzerimvek8bnqr8vcfo2smvoofv0daqds2qy8a5c3ol321th1vuaun2swzprt8yzdg596ce0oqlkugx8uyi4s876pl0cv9mq91i9w563hh8jkn8a7siyzyx6t54avi9tqyeazk8hj2vygf3lprrg5d3yu3cmjjjp5cperpm5cbgxflkz2mbh7grlpl',
                fileSchema: 'qsr3i43ta2tidn03k2o63omy9kldz1qpw0xjsh6nn9dfz9trdcmvgrt7agwfnrfrzz4i3w133d5blb0f23rhx5yk6k6p81sr19pevu58wd91q8ofb09n0harabln9g5lgl4jbvgimwy43wwnmuvjz5dkgtzqxpumujqs5ajgihh2dn3703g6ufwm5d4hcqfy6j9zumcfk2fddg6tv2piwe01tdy590we8c0svfgbp0hah9rz255hwo4dwa5asbk9afrwwz2jtluuvircgy72v8qb33yiy4t9jbbh0lxq1y2cz8buvp284y1s7wycmtiptko8hce1xv2spi6886a2xnuyzxz5rzrrsvgjhxiqevjcoigf9h06ael5x7d3ci01qfaftuh64mhq8r0fxgd6rse8cttxrymc273l0357boh892n7i4540rkikmvmittnriqo06jhny9dpb1ga8r1v9b6vmkd26p17eevub190ryfxlxe3fgcct796xyf5f62ot5l0lfsvk323seow21jgnbqm828u2687qfaurdesnbiqz5wg73cbpxfcn0a4dosz49qiiv7pn3kymbwc8ka55hdewh9u7eludrruvam456assbfjfo29j92hdecp7wqwt7nodmio22rmxs9suyga15ytkh7uy6kr96irglcc51s5vnfisdjz9so6onrqjsmfj82m1qbje526wlusp8tnx9dtx6hu1n5x7oppofn0xpf5vzybtdjwtrb56ju7xt2w00xdj11y2295g493rayr0xsyvj3r2k6nw3st6zo9lop7nwa7ybxxwstgnf9867srvw86uy80dbnff62m72zp8mzww6ehoo67xiz066texme8m2rfzdgn6o2lcpfl8zszdy722d15o14s9gvlhhfq0mwr3l3n16237j2fuxh1nwd8pvcnerc5qfpmcq59ow2q4by3q6jxtlj5mv2qvry6n9mu6n0f1in7sgs3s4j2wkjjh058hwfu5a4d6waprw9',
                proxyHost: 'ur29v5pm2si9vlhfk3f0si872tpbz6c77faobd3csodwz9yfswhlh7nnt78z',
                proxyPort: 5338274337,
                destination: 'jervq6h08l9vfj5v1xrkoghf0vs22vo2hdo5outs6l0r644zohtka6a228nrlpx3wsdmmfaigvhteszh9jklylaubveqiqi2d9h59tfuvgy17su673oljhi53f5p2zjwbftmmek8872t9sk3x18k15ypzi26izwu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nxoxislqg4nilxm4fa2o6vx0bx39yxs6gchcqm7hyjg4f5u687kcxcl1y0p7rk7gwjebxlpxf0egcn6i6u037989wwxqmfxz2oaqrc1k6jgxoopvjsibd92bfgpmjn1hrnfr9yfd40lp1sfntzmgyeal5obyqnvw',
                responsibleUserAccountName: 'z74oui0x9tn9bphrfpw6',
                lastChangeUserAccount: 'tkjv00zko8m7trpyeitg',
                lastChangedAt: '2020-10-13 14:49:10',
                riInterfaceName: 'b7reg67nn8qjoqglp5j7fbkwou93f2c86n81aighze8hn7w2mika1kpllx3llggbm0dhmwqi7nmrb1c6htg3mqtlc5exlqfhuwylfg6payf6e0eivf3jdnqkwcn4xsol44ujxlpyoa12gef1es958i5fsw4xor2l',
                riInterfaceNamespace: '9mvfgskgpld0e1yj7zox75ruaxbkxf983mfoollihy30nz77umcz3ia3nt6ca2s1mxn8wy9hbj4f4d0op3km6j3amdhkhzx3xi5sfqtkretsd593dikme30bgva3qp79j98h9c0zdilxijtpf2gv0rwbjb4842j3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '2uhkxasfxfgksru1ehvjmhg0smv3kxlo5uzms6yu',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'ufcbvnc0q9yb34xhbwepifpgcygqe99xydr03r2qnyk25vcx1r',
                systemId: null,
                systemName: 'wiejlwlopkm2wpwjbsyo',
                party: 'dyze49tjjipytzmlk9q8g35siulh2b555e42iqjyhbh6s07mij6cx4hl2izynobfgilix78v2ske17flaln986l0qa9enkt4b6hmd0sc2wqtxn7rsrh00lu5todbi4f2ikb2t66547c2ccfp45dsl590vt59jc09',
                component: 'nel0hazomdzwypj7mhaepsrawi6vhv0yre3bgolvlkxcgc67x5ffyha4j26p3ybb0ip3an6peiqiktw60vftywadfi87rn6jctsxre2m3gu159u9xii8dzld1w7e0l4043irhzuddqey7ie9u1535zu7pvtce9o5',
                name: 'zicq53zh11fr4ev6ck3vq1c0cddzm4evfow3w44teztzgty0nay3vraokriouixv6y0tyvlv1m3196993eotma8tfkheatri83dh4rapzpzdyfrnvcp5hkmd9maevts47emjzcgaizdbfu530zm55fenyt820q7i',
                flowHash: 'r222efzev0tihvg06oryuvyy7ka4qfbghzpuysbr',
                flowParty: 'uuboul66bca7czpoo0cimdbwwyvwdofs46momgh5jdb7dqprypqu3xf9pm2iurelbv6fpchio1g2fq47vsc4ov9s7oxw3ceienr0trwf38jfqyrlmo0wvhleus2zx557k3mmxzjj5t8ispq512oop78n5dyze2tl',
                flowReceiverParty: 'igu4ulvddo4flrfscy9a4ha1uxcs38nb08k8uf42oyy7auv16h4gr5ep3zjkojhawctju6p85exmebwcr0seq1pcbh8v9n4modlqj67c7l202l6imzgofoztd9i3lxiq05agxmylw1oo5v6p3r9bphoi8e4lwe5l',
                flowComponent: 'sx75ezyrftzeg45d2w1xchzpm3nbkdsptfamoqo9bcf9l7fv8iwdv2phy8o5xjmbv1ppfsiyf1vnrajp90gmy18qzk6ucqcmln3glv0rlkkw3eptkj1uurv01g3wttg26pxcjy03imvj9lywajyrsczz8q12by3z',
                flowReceiverComponent: 'o1kxsprdvzn7gxx9u1542j7t3mcqa1s9i2azrvlhlmw4rmsgg9clv08xp0hh8iv6decw249fpuuars4qyjzz58y8jbttv8yitw7rjbuxd9kj937h5tmezupwlhxhdoof3htek1atfw63zf83y4rnv6ir1aywxvtm',
                flowInterfaceName: 'kdidmw0vs1mv2hxozz7x9p2rkdlyhnkjiq6c4tyvno4r3jrs5oswzt2zvbmpnjq8t79jj1ypuswbm2u7eiyaz76tyeqg1z3omqfw63vq2ud53cqsmhoggf9iomuasu6xjfsjsq3gzovuhja4ukrowbd2u64e7mkr',
                flowInterfaceNamespace: '4lnvx02iet3s6lauzbt2vgg53t68nhwtwwppyequxvcp799nrzp6h02badylqp33lf484hazna7lrz0mn7flzn08xnaru1hguitqvfmyenmserqhkif162mgq051repgkl19242bffz890nh6yfj7ecnudhpn6ta',
                version: 'avw92pfjmg8bl2cjr225',
                adapterType: 'lpfz9n042o75yhpk1fqz4mvrmo9x1229rbxv5aztcfrzcjs1i054q1tsp72d',
                direction: 'RECEIVER',
                transportProtocol: 'gerez4xa1deexrj49esd841wg4b2faic3zxyjcwzkkzpff0rcweo8e22vpva',
                messageProtocol: '2qp63jkie75r62ahrbd9ps9siqtjkxrhhsjl38bezul9rjhxhz9pu7z5p5tq',
                adapterEngineName: '5kj3fciwo5kyvpefope0pg0vg43in3lwecv1r7x6vyilm0yoissika2pg8jn3uugdttwdbeoxn7oll3lfqezr8gbfaz2lnn9oy7154hlnif0feazhtm8x6alymm1wg1691te2fhzw5iop7p1aayoetvrsmjlwpmt',
                url: '21d4btmybpyfa5sv0zdlbht4ggcjgvmtcg9wqw9o83c4rynwgk8fzfc3ncl3hanwkrbmsf7us7t5tabm4fcqgi0mz479xv9asul5x89kzny72y1myk7yvpbn3jkb4sv77se6z7adsg6mpxas50ks1vkkwdro4imh94r61wppnvsojsg5znh6ejntgaeac24j4jurxhgv3dx6x5d9fop9m0645gggq69a3eco073f09loektxr6vz2pgqnx4hflswbs4ldo20ln4y4pf8ms5fezv3lcnfaxqrw9pmf8bwyy7gw9j0cn4nua15qkvhkngc',
                username: 'ketk687473dnyd7n4iyk01tm28jen8bgkqbuwdbyem8luf7zjvh1uns7oxuu',
                remoteHost: 'sgrgg665y8f5vzh9k28u2nsphr0cvkuv90jquezqxcsqe339f30mqzpv91v2l3ozz5llxk49pylk26wupqi54dujcpz2cex5wgnsnn2wbezryxdxs4dy6i1a1q1c1r6iuj7n0nyfnra1cyua39vftxd4iq5sqqn1',
                remotePort: 5342357665,
                directory: '38ejp4e2b57hvrujuarwf8ruh9ajg0kk9sjbefc6hw6djcv9th12ytrxq1zz9xwus4xljw5s0vs85sijgucy40crigdlh4blq42cko0v2wuvfwpxmd5ln4um0r6vh3xqgc1du78mpk4hr32gmnjitw7mf0mbe4c2km1jfvnvz88pk73vbzfv1ceub81dlymdyzp2bg3295wx51jyinwls1moafw62ac2xjt5vw73fd9fwyfe8jxi6u956io7wts96r7904sp1jsjdrntv97h787c17r5q0fcex47reuwoumonx8pmvilg6ovwxwu7pm4x90rk19529rjjhit69l8pci8vbjw2yi45b7th544rpuaqc0ce5es4jwbncog8kqodds9k365ldlzxy2rp25nwpwz449xl2jh11vvnk5cn2uoirzqm7s66smms793hy1tprzwb3cjhqxc41t815jwwy7g491vpywujriddd5i0jhmo311ov9vooxcojh7octhjwnwjd4de17u3ynxuw2eelpktnrsopc4zbtod77chofly7hswuof8f0j8t7mrcipwgfyo08wr38lxwkdut9s7g83l3s1ub09l9wk85ofeyr5ad9prkr6j7mdbsplz3iq40ru7hexlya5pxoxvta0rntdy1mmx3dygf8czz9p0cockvgbozedgxwbznhjo5q4vvi59eis2twosqygvjeb4eb35xgmu4o8swvj9kzksmvzioj5jx64wx13jhswxbdg57xdth0emvw5sh71eaicb5x5pe1sn70v61aexjl6zxp98v9whz4ubpz4qs2nmqsl87p74hhseoq81uoeeqltjz6l6dmz2ye2zgrbtcx4wvvs0mw1ryyraizhxpbl0he7hhlpj0l1igyztqk4pr6np7iy492ngsylu1uktjwqn1brzk9fjmwm821eubgfaf4esohytb1lxcxbs3edvbfi50gcmxfjaq14826lzpo7azydhnix1ut5lp9oiymzojjg',
                fileSchema: 'guhhxb2hno6p5yn9jtb1fec4td17tc73od87n36ebvgf3zyrxs5g8srg3b9ipfn81oqifleknbo2fd9xq9qr5f1af5s6k932km4mcxx585vq1epwvlujwgw5pdfvjlewbyo05148a5f5n63g7f68x3es91qw58g3dsi4ojb0taju8gk4gmcvtxxsbsc4hammkhjwwjlfw6npiv4np0nlrhwavih3na692zny2fdg4vpz4hlsbxyng14p7mdsuialq3vix2sva2u44k1fcij6hamv2103dbk10gsv611fcobtt1vvsr43nvbhcploy0j7c79r9danfwx4q7qqj0ges9tt71w4s00pnr5t5wm012grw4il1griffxbpy2ffhu95yi6ubz9bnje5p9fdk6qlhojcazgjgc8scc0m7hmso79cku6c189ohypt66a1gfoae7ys59m1e6fp9hfhwh1zhgfrlgradn3598wrmjj8wqjx8pxuncxomnbyk7jm8ddmuygjfucocy217v3jr9n2ng652pz020ojiofalqkmzy4t0o8126z6qwuqvh27gm82nm2ty6nkuffpbw67unitsfos82gwm7uvj1p7q8qa48pm03x58chtp592e25ysc810h36zut5r7sqej23ijxmdj1wle3aoqbohn0y7bsud7c5ibcjp6p0epismoxgm8pnl10yq23q1fxkrce4ctlnq5b2cuv8j304ksf0e810gsorwzv6e26jbodccsx3w69a4pddnh1041r4mfaobtg6rgg35po2399dox26dojtqj4c6kkjuz6x9o1pn6t1bpujr0g2d7r5hvxp8c1ge2mt7h2l819x3ivwemjl18yak6wpgx6pvwjr60jffnv73pa6duj7k1oix1cu6w27eei3plr867q5n5ujqftgebframdkjodbeyy1on12s28muigy7fpxp5glf22xaq0q3w5x61ckmn8gpt7ot5kbfce9w68bk6sjnd4i1i5luq6kl8n',
                proxyHost: '6zmrxnz60v2gpbx9d7j03n2wtxja9oz336quo3i4cr3jen3fvtbwte8g96ca',
                proxyPort: 4276926862,
                destination: '7l9gaeomrvcudo9o4pnpnm9wvsjpl1ee7g0o2jkdyvyzwfpaneyo03x6v1q92174nsv15pwryr9kku5ncxyojqs09bwk1hmfxczejh04y62mxfqmnkwmo3acqk1ohe63andtivnpulne1sff95fecn59wandlijt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'rs2wpszcyzuudrgtgh1illl3be3yjiuetu5h3f08xl0hfmydktnxcuxzoso6z07zkiwd8v1hkoxcoxm2nh5aqnpck3uiy1htncvxfffms9uu6w2arqivv71yl64rh4i3kofjhl0rgqpu3ui32z89alj5jg9odefi',
                responsibleUserAccountName: '923rofms3tswo8rrr472',
                lastChangeUserAccount: '8dh9kfrekgxr8hlrq6ci',
                lastChangedAt: '2020-10-14 00:34:19',
                riInterfaceName: 'oqtekau262a84on5qcrnbmv92d819izzfqsjp9cot1xwway83nqdrvj2dk8ef23sxejckvac0xhobuy6c3vhphfuaahsie07ss167t50nxs52ig1qec3vo0xadgb93ehju1g73l075jke70sg7ob8gxser8b9ubd',
                riInterfaceNamespace: '9562unxwmonoa3re3exubtt9atnhsgsmveijm2273w46yorsbuw5hb4z5s8p1a7cpv9xcnnq3kt26ita2w5xk19f8g4xhym7o5hn47i2yrvnfmf8if1xrxv996ad0v0hkyjmrnekr5vtyv5s5smklz9dkrosrll7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'uc09iqxln0fdg14vb6kr91e8xl026uto1jq1unxv',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: '7673lo74thfqi0o67ipbdornz8hc67e3r0fs57eo2cgutd26ng',
                
                systemName: 'opc7wcd135v9aif9bkzf',
                party: '8vsdlfbry1hjbuywlysoa2htqbt6ain3ov8iib90epey5cecilfc4gqncvu50op1ea1zo2ggnkj7nq0su23d6un66qnucw0eyc1zoz1yjd8u95sv0e45hmowtso7ks3agdex9scy2k7nzthtyk4bmic1a0lq3r51',
                component: '2np1brkw4qcj8007lli7k2a1k5y3gcw1jtjkh8v7f6ntsjj8a76i0tijnyksyquzqvc2dvw01eas45uawigr4jlxl9rwz9jhiak0plhilyjmmgyi2sbtbhaj3b0vq0ftcizjin10umvbc3mvdq4bsl19tijunkuh',
                name: 'b0jn7ptn7etyeuuglp161pv8qotumpawr0790zvec9dsbx9ll36n9bx6dr3yih98vzrz5o3nnwdmaj3qcxoyxyokvlhj1vezlswu0kot38gqonbwzx7d3yt9bdbznjdpbox7z3coforb8xn2i5igrpvrxkddzmj1',
                flowHash: '05fhfvw9x30073vs6c3hl9ha8qhh461jh6w5rrfv',
                flowParty: 'c2ssafpnzk1z4hhl3hbv7517jka186ido9uwi9rt5gogx1dnp5v1meoqvucrk18hqhdbwln2h32gznqx51ci8lq1td3tf83uajj71qv9dhj6olhquwp32u9nrdawnpv1hmktst997hpermixfpecvrtml7mw0nh6',
                flowReceiverParty: '4nzqtm7izsug7rmmt543lhn3y6180zz4a6cooazyg14hfi0aqa9va4hf7zdopbu4h7m5kvemdhapke6jokmfovf6iy731r5wvmog0oownxn94sirf3evzep5pmr8icgw28xysefnf7z9nijc92fuvjt75l1y5won',
                flowComponent: 'usty2qcwpzw2hpgslmw8db44k4hc0vwx83iamiwtjxyul8rtzfgazjo45z5tpdhkejwi6961uxx3hitys0vzrpen2dj1v3g355mepy6xdpr3qxruis7ec3gbd46aq09ek6kkvk6a24pajgea1vgvi48rcy2h82ih',
                flowReceiverComponent: '1ycy1iff5doyts9o1yj3gqbkdsy3lrper87wexh39iq46fwq8glnumf4c63uzqs7hu672zqi3lxfadmpgykr9g41x12mqv7m0wprz9v18ph5xb4y1lgkqvoky1ehscz1vt22r8b2kygubhgyrwoq8dm5pda4azu5',
                flowInterfaceName: '2sahgadujyfcpyij2u8bk1y7v3b0hgk95u6o4o2nx436kupyqmy2zu77huetj4glwbqys1sx9fnpehqlt22q488dvkb78jz34ekv5k03wlciiftt9erk3e7uxw94zhkc19a7hrbd6s96lxul5xnl2gyzrxswqxgp',
                flowInterfaceNamespace: '4iapxdxy83vtl7o1vch1q024c1bomfw5kmlz39ih8r3ovqkdr5f2h1fzerbye3mjelpfri90wo8k6cc0fa2lvb1ony97og07dwo108dy0i20avmmoi2ktw19fnlvvg9kj9k839eh239ocpoatcb0xnjaphja4q2b',
                version: '23won2tv3zrjl03548un',
                adapterType: 'fjp453o6yet13efsugvpo4hm0hf3efxfgc7howzyop0mi4eegtvieszrwjer',
                direction: 'RECEIVER',
                transportProtocol: 'oj7z09n054z622ks1b8bltsrd9yve4wnm29kc7g0spz2qrhukc91m9tkpts2',
                messageProtocol: 'mddyi2wz578x7iijf4e6t2i6jcqhkoc0lbzltq0d2jc9l1vsvn1nzw2se6jc',
                adapterEngineName: 'lywplbiqaaabji3fi2n7u1j5i6ziz02xbs3w851frohkfb2gy3dvfuvskk2mho1sf04j8icij869c7l7nbd88t3yg21slzn6w3m2gjn8tbda0hjwwt9mwpf6fb8xprrgb5dl2srcbquz3e51x4creo1n9wbszg9l',
                url: 'dwo1ilefqxr4pw34rmfs294u3jt81550v8h710csblfy8qb1w5f4t96je90m9be75vcuczbp6vgp2jqe1paz0z4acdcxwnpfdktj8djz6tinf1676zbbeabahg352vx4piecxvg5meo1vf1omt24uc0ctndsrudxdlozy19yw0jsvje0o370agb24tez0tqwu8sq11w873j2gi4xh8ye9ujxccj5zfeda0aeemsp8722pb6zh3il3ph7qis2b65mbz0a22f8v4b0kxo0zgg9xd8yoo2dqsvbb5jo5fuqhlxnnunr3eakmaxr7xitcmhq',
                username: 't0fgw6k1hopx57y95hvao6e53vsomt8xkotcz79cqb0z86twq21u7mxc1eyw',
                remoteHost: 'fljwo0cgldcj8v0a347tw9hfh0yheds0qo087xcg913ds1ysurcliupyej3o4vs9xxzenofiizmw9pt1q40ppsvxvr5u12o1jrk80s6z8wr099zu4xq42klrogn4evpj0xhoooxn7slu46q0gvle75r6jgnmiiuw',
                remotePort: 9359997884,
                directory: 'b5407oofklv4d39ia8a1xpxu28gd4uk41s0vdw7v2p2hqydxeu0lugqhwv2i8mz07np40kgk2tc7gcy7wfni0yube0kiv5pu3eucdalnjfoalyj6b5frq4kae1h3euh7u2iqpd3jq3ukkr1yw1mruv2bctmbc8b31yhmlxec0442vm4n9a56i9lbw6kua5hm6hg4dudsukiozm9k7tt4pnb43wv23an981vqk2g71jt81nps1tutk0c6shr5nhdouuef8svgmn906051qwltp22c3kjjhyjjdknfkbq2ibrrvfap77l1qjbvu8rnoxj1m6i0y5gka397guccf55ytt1wobfptem90n11shj19hmk70d0c0ty04rpyquqhxjac28dkdjth7hrvk5d9tqsptvfzhwbd1cklomujomlv0ibkrjygi3fhyxf2jzoidb1gqppeg7kozyou7agquemgb42smx2tdfiemvky5i8knxj0wu76c029r5hpg6lx6egxwzidtcy3tg6e0jclleegf6x0zmol35yh0ouqk3m6s8nk4qf6uk71bbbsagt5k99rywqcy72rv1qek1b57yqy7i8jpzdz9emeprv47ezayh2qbymdem52gl4ulbs2rbnw2g2qulv9sqwgvqcyffhdci3fdf1ozgns6r67rbxbv4902yjgnnv7ozzrpgl2wtdbvchiuf35aix9qnwtuc0bdtw737n1tt8fzfq49sed2dslzo8z09ph6br280yihq6vzxdpenpkyh5ii2jjki8d9a1h5rsozhob3e60znnrm00cnprvpbg68ceaglwtxhb4x68q2iw97jf6bd25845xe48pbafw4soxj7tfua1e251er59g20672y4suwx6s7h0elgcpiysi5xrjj4n7za0zkzv642k1ijnf33rrfu8d0gucez922aljkyjrvdqgz0udhb1yrn6dq877hqucoosps36mc64j50pdq4dbovunuu35rpzlmxfw5tmc0inxkp',
                fileSchema: 'dcmgtx2nlj6nossekzqlgg3287yms0uqnvy42lod27y788h27umizhox8gh9gryyqmej34lvvl25b6sbrts4zyjt98hdidbrdg4xq1qg3ll77ypdv2ryajrkv9pmjfnkqse43g721bram17wxmaf6l4cqk3etz6xhuy12mm6jyontgjun79kdrherchsgnswupuzy075vxwruin4wm2nb7jj3xy5fr57s8pz4o9sp5m8v0sa78fd7wbcj8e4d1h5vifnew9oe102q5weuiuystd2am7kn0vx74oy5kqs1ka9ah0ss6dw6qwgw2c2by2x5kw75gsovhnta2haosmabfkj35slu3zmctkncch0iyaxd6yia3w4c3o9hjb1nlpddh1ybr7bvf809t041cyavnjascboaqspidz7ykc5yalb2aypnqysdg0155xnw3pal7f79zeqwg7ef0ot24u22vdkp7dl8wsqz0ht5jq0xznm9tnmu0dikfo7iif717v8ibh3ytt8jl7x7nwizxi0ek1xb0e8e96lpgarekdznyfsgj8a2hhkf7bna3fskorw8ah4viqm76gxc35yrjsqln1g1pe80k0xcl2vwgyndrt20if6rq0de83qsnc8hv9r2vlyl6ksctki8nxhbr24jfx9anbez0umjg8vqm5lc94wcerife798l8tpboo74h00urh0ktkip2hhis6r2qxfteeoyumakv2hfretcznfxxwm6sldrg5yf293qfydmri7fdysgl23orcrr1htcro6bo3errft3ceq3xebgj98zcrl9gex6nz56ppy7bx6wb3n3mz3torjfaqoj2m4b9hgc5dpjkqf2x74incvjw30urrajj3bo4f0mwtei78i5y13jhwz1k8cu951h5w70cbrtmyo8wa0opd3jg0da707uezbk1my27iik4urgs7j4wr5do9f2zqslnptcx1t11dtwnqr2mbnpr0oxoj4v8zqxxdj1r0851syw6chzysv1eh',
                proxyHost: 'cvvfb7boqzaisq94azaxl6tajr9sliiagujeg9ils67ep1mchomflrmmlkks',
                proxyPort: 5044034433,
                destination: 'bsitdv2z7vqyuz2px4c0l2tbol4gflo243d0g3g2gfn5ftpcyd0r8juqjqtbnhwotuaup84kltx4hu7upsl79ghnwvf982j3fp1ludetp6m93qyl37qblfqkhgbemplsr81rlpzj6l1h99h0ot9z89z9cfdfkwm5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '58lp02f6mbknegfr5q2ckje73ji4pcu7zxldm0tgzg79pg5nd62kc8x5uskbx3t7b3rv8dhmhbodvfdbogxcb0ky4jx03jflhurv5id3teg79tyqdq88utpx4cvmk8wcbu2maejg24cvei8by484miv9iq3hy2tm',
                responsibleUserAccountName: 't7put1ru7nb4m7w7p1rf',
                lastChangeUserAccount: '21fbnppvn92jf64td6qz',
                lastChangedAt: '2020-10-13 08:32:41',
                riInterfaceName: '1wbhrewlisrhm9zm5a372igyz87wbdyenjb4pvc5nlhq8tjb4apc5t9fo6fgpo3sjp18jnm272wdav4jl2aebgcu45hs726ft8od8lxm8kz7j7eqcbgm37dnp76f2m37zzgcy6tmgccznbeo81k1d107h3zb2icc',
                riInterfaceNamespace: 'mxlrfxqrcnkxoje497steev01d38zzvx59jbr9k4kht6fozqri18dw98xhul4gua2a1ed5lp1s6dx43p4x67myovk0hd0idcr9914rhggb10lmlqrn6qry12zwuzy7rnpd4bqqer9dlsb8v7khmcy3gxu3imjgq8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'u3h9kbk9bw05xly8kg4v5ky34mgavh2hk28q9ii2',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: '35jhfae2ybzow5r8a484odqk06ajgbn4bi08xpy82a429vl4lq',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: null,
                party: 'uwjljc4u1z3uauygcu04mci72pfls50cbuay0mw7wna7q1val7l55dmvs6r7oufuqh58iewave66lcz8nbprwqc65fjs6y0uqqdpfgxprmqhldeh7ot1ee27yyed5xvcf2mv2zdt7b2t6ch0el6nz6s730b55bvg',
                component: 'ein3m9k9h8dqio8ulmo9iwwu73sz3xqpmte4m04aajciyaypm69vq6hzlqbm6knyfdtm13ttmrntxhmzumk2ejppxdqpk1zbs9zjnqfr0ifznax1oy4olh5rk8vvlgrs5s15s36awmesnq492dpa3soerigx7ukx',
                name: 'cv8e90v1uij1vlmnb4d96ypeb26seknvzucvut413x7zx7kspj7qew9wgb3z20v4yfrrfgr8xnaa10rjtmqb5jx0i4kyglwat0pour49aa9uz26utqfukp8ovjknoziagsdl55mpt2i9kj3e070gc75a0ff9x2gl',
                flowHash: 'qhz8lr9hw374vpxg9b6r1vzg01kvhy84proju6oz',
                flowParty: '2r5g06zm1nftk0gh6k5fycn9xsm1bjtr4rgih3nr236y2byuizunrhpp1pznpz292obfootz5s8i5jr0t5iz0isny0xky6d7mzdmbtasa9xb74gmuw46dal5xg4xvngrva0eg6u0dq13ewqaa2rk08u97xmixsbg',
                flowReceiverParty: 'y7l0d8z7dfboqajdc3fq2fe6prdatuzrofv8ymut2d0bne5pvcbd51perpm4ky8a0s9iki4upyo59y9awp62g5j7hta3533tka7y8q597or343jumr3v00n0ve5x0d8rc49txoo0o9a0t21e02kpj0a7fuqoc9lu',
                flowComponent: '6j57x4va1he29bdakxdv7eh75tux4py372vmmttpe3vut3zfcv3vbwgz2mjjxjww2vxfksyb7ryl1lkdmjhsrul1sfzuqnvf1f9jfgxn2fpsgmpk67n42jdt02nlvghbjaw1reo8orh9i4cm2lrxxb43yerj4xvo',
                flowReceiverComponent: 'yz52j05raevgvk14ts8g0qkixzfks4n82as6zyoilc4j6jzl39g4x67mxmnodf9uzrtgu3y6tr01yvb1qev00uls17q3cys5c9v4jo7ov37irgu15n5no05ghxbssc33c4hwgmg4g1di1xlo4mn3raxauvjj62jb',
                flowInterfaceName: '9uvwh378n72joo9tg0wpcwdxdv6x31ln5d39nr0h0y6q4567bldx50d29fim5dpv91idqo14pf8tghdkh7360z9gt48hvy6aeekje4jyzohpnbzhlasshbh12q769u7vo9v0ubj3d55cp602jtxeb8qsb262bzkt',
                flowInterfaceNamespace: 's2ojrd6g0xnsjvzr6lkc15zfy9roiwhvccdk1yveoc4rcdwlalke4r2bl5vq3vxty6rrdfsuvpec9rjm3pd8202h6u24as2zpj8wdi65o4819mcpen24jifgxcqs0actw5xdrrzvgaswq4ibtvllhij50npfm5vb',
                version: 'tw9822er4myc8ugwf2l6',
                adapterType: '035wn75r8ilpuvfjl9wlgec2l2mrayxv227tvub84a3zk3jhz4ni7oympz3m',
                direction: 'SENDER',
                transportProtocol: '7e9mwka35uoqwgeih86sguihipdua78t0npdm683ra6sljjjz6qzqgzj6bz0',
                messageProtocol: 'fea7jx3qgdcgwu5ggfq92q2uegjhb9kh5uvbpvzquxpy4q6ewoxksjpq78jk',
                adapterEngineName: 'iq67rwqosy6njenyvcgb0k329pvvoojw9g9slxfdfthgm7os74sg05387u1sp5bsjhfo25p6x752t7edj1soq1bot7jvlynnngge9x64p405eqyciuczhdpuypk7o9jazj62n5fc2e5994kumgh0l3xmfzbuj7wr',
                url: 'j3pd94ymkome3hiynsqmg58qz38zjffmus3nt1dtds91xotlzj4q8loqxd2m8fpwt7g0n81knbhdgbkei79q6hluy2k5nce13s08umdu3x4k5lallt3rkl1hyoaebdlc1tiadtldifyfm4lm4eb6hvda43x1ntpwijm9vxsn2y3ub78e9w246r2bh2bpof0hzbnsrofqrdrw0p0ba6yul3od2op5m6eo5tebzv69sgk1sebnhog0g9jz67anwce3pahehyantyzufix3kc7jwqy2s0eeggocy3olomwgs9o0j524u1a3bg0operjw7vs',
                username: 'e9tohyiimsz4k5gpteqqk415f9eup3cwc1g1zfq1ff2ahjkjy69oh12p7b9q',
                remoteHost: 'srwup561rbmxsg3t5tpjf2ifc1dldhlypot3kvdmf2odmatah9w1c2w1mtrrkywf3nwws11kuaihvoaudxlreqylqgx0wdnvqhibne5ki5xyjal8tocxbz2ahgvby6j3pfhlgbfskjk5fo1pcznrt8t08y6q41zg',
                remotePort: 6323027815,
                directory: 'eoxighh81h1wznn8k8ldzi8rla8ymoxu6e9q0e2ldbiqq1sm00bo6gut5n3ufx5t0t8ot7bwr5f3mwqndrk2gjopxfrfbwhcgfkhlh8cc7avn4g5z2vt2t4tpg9qz9v9cu14htzga7m2ess5bfywdvrd3i49hg0i9r26nsczzc303tucfrvsao9ia9rr2h4icnloyj6yzo7lbcm1i5yw9c7ify461i7gpliwsrmtc1fin3bpyy2ca8je7b0rvlbdua31k2wb0zcxdw5udwdsx0auq1xou68pobllyefjn1bfa5vhma6mmiu5u4s52vhvxuj0ubwkhbfnvs7a908h3lccdtzlhz1lut8jdci1v5qtu4265klfbpqia7h34cn9xf44wd0lgd15rhyrxirsajiw8zyq3kanizdjw28ndxecq6kk665inwsrtlbty5q5p61biynt43fnt1ycp9nhy7qh9t7jh8zsxhhlj6jp3me4jtej3jo8wr8v5y4r2kuhfxnqwv1hpf5bwr5zemd27fxhonp5u8wtbpaoj7nv8u852xlt47r8vrqa4ihsv3r1kz9buhdeelg0voas6je61zd5pv1dwqkyr1kh6xlcfac9m6ci7xuhozbg73b1tebqhcngnhz4fxy9a3baj001as0snnm6u3ae4elecle6c1hqkxu9scukcs336jsyd83awtxe3kvanbl250ru1whslvss5ylgye7rwub7whrssnnqsrl9brn55xkdyaoeei955kugzpvamrl1tgm0q52trom3incys1ycnot632e5p48n1bietcyo75jcsmx5mdopiv985hkfkdnh2iboualf549le6tjjo76wowv5qngqgxid0kn1c446ilxyu8im4ku8omhct0bnb0s1q57ngge5u4wizmoyqkoijpxhqkq65adts8ygda3rz63gckkrcw9f9k6b55kveg80jplrd9xy789ml5ggg8of1kpbyg2mohtectbnyb6rd8boaevck39',
                fileSchema: 'rq32jzvqzvum69364mpr61nnleqropj2s6a10dnbhthyrskqklak9vjyk0twtrqwuck2kyl76vt3zfbnf7y5oa2azwepeh78vfgcmxzuzlviz29z6v7rsoi7wghj8rdq3v3odo5i1me024a328mf1zbuda1pzskjtzoqg5134m7yhzrhvq8g64l4ic8naej2jkr30bpjgiymggq5tl99lcd695b4el4ant6rv0azsuu2bkjjsam6rv5gxat731ofqdyjjfiyz8lz453uy1mn54ij8le1tbmbqyum1f4z9tdky938rkf2ni4402jli16g4x4egjyjd34ng8aryszuq7qgu379lzhv235mx1m4jxpa7zakvlx14n4zkhmgowpevvzx12gww4vfnvekh1acwmz8eg4o70qk8mt5dbfan30q1j3eu8inut76nrdcnyqz8wmsirjcs8uae1wfvpm8r2rl3frmflr8su8dpk6p6j2qtkjfmzp28s2adgjt6bn0xf1gciaboy35gzk28xuyfn5vkrcymeb1vjuuzzfzoeiiltrz7pmisdx2qo7oygk5tahzu6sus5v7nmambywrb7c177ir8mvnaov8l6sljuf2uhu0l78u33kqq6ulqgnoqhlky4bvvvyswzzp85gl84lv7u7yieuka0sbyn6mwltr1aulhovgisr452a5zs3p9kue4ho0dum4hj279yeoc0vcgh346q5fksow56sj5wvaqe8ofjsgdokszeywp9ryvmujeude3y51ylowtfk9ku4n7jqkkp9vt9qvbm891s9aj6lpq2ia3tbpwly2clzb5bklsvt08bvudfpi2jlik09prymd2yl40613irdya11qz0vceyywnznpra6inzj95zmnqca8lbvg81xuzppavmymd6kxi2tg80kn6p1mbfkx8l9w0c2hzolfyufa2mjubb5udklc21py0vj60qc3ddgrtsgrbrntq2ixxsxtlt8oip22tv9o910vkrec759e',
                proxyHost: 'qn9smdyn9ikwx8kpf3ujrlqbjz0ake18tlv67wln6ajvvil60cpysyc8ux3a',
                proxyPort: 4180079554,
                destination: 'ozey1c2gmilr4raojcw2b8a2vo7bu6avjev5qw4oc7y0k701cxo3xlryj49xqacnmd2v3uvzs37v7uo50q6u59vhvz4z6xd719mhvvqvb29rtc8d6zzzq5fmg7x5lc3m1ugtfl22unwfknnn364vjrl5q42zojpn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7crkj4ml4zzmeey0cnrhyi2fuqm1tgwc83mhoo65l64qjpimnjxso6mpfll58r5s2vphi6zbffn1ys87e1s97ujm0s5th6bti36swwrlwl6wd5pypxwjtlyo2d4tow0zz533joy7hu7qw0fuiq30h5qn76fc4u82',
                responsibleUserAccountName: '0kwmwe47lpk40a5brqsv',
                lastChangeUserAccount: 'r6xxv4lqu8yo45lfz2gy',
                lastChangedAt: '2020-10-13 14:04:46',
                riInterfaceName: '1hqhv5q5m8hvwtqeq30wgk3cq5jw4autzykdm1dyiezpa167f3odclm73vop0xxdz9akbo1i796g922wt6zb2q5bmwktaekhd4q0aeg4f61rx8926q6rq6fn3a0l6mzgfmq7ioiyckbo1yxayawoduetva1u6jvz',
                riInterfaceNamespace: '5jd3gyn9f3igl5j6z0hqcia4u6zlqb50ycizbjkhj15uez3gdwpieusr3fz5lik33wo0sf2mile0g3pnfljye88yuihjk0d8ks40jakp7z7amyh9vet5248s2p4fpxml9r1x3y486smqqguk8xx26frrgeg965hd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'nrs8bs1us2hceze0o6zpyvo4bel8j1rwgcl187no',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'l9i2i2eud7nlt7epeyjls2csn1h3p8rl4mwh8k0pebdv5d2jmo',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                
                party: 'kw3g97g0f8r8iwmi1wpq7imi79tlcw63xpcgx52b6pd042mar4z92a6rl5tolocujux7prx1pmyqfqymhkhiljnev2q3l8xv578u4z5hhgokrchyl4uw22a3dmu1q91mx7q8mulrkw5el48jqac9ynlxlweutuef',
                component: 'ceypvidkltzkpcsxh3y2xk3feovmrnyfq135vxp00bw08plr88bjh7u4ax0y1bkp11uhx90fltw3a7z4rxucnoeg13e6mazhhg97m2jr8n57rsbskmxy82n4ga5f2ltgpy2wrmicl7n6ie2gn3vpj40m2ye3vcbb',
                name: 'fif87x93xryir883svkx6n8358235rhwy6lqr1572frm6bqbahr1skahmp0rs2wbmaqvujax7o09539l64kwfwh7hdgozq0cdt2g2wdnr7l610wmm1d523ttu3a8d2gek3ro53cd11agdqz86ipqc9c0mbf0ci79',
                flowHash: 'xd6m9otjepr9mtivk5tki6slfmejaa3q86b1lw8u',
                flowParty: 'llk66fz78597lc10omxfldgt3qttgmef3n5hik2em2t9m1wy7zi99ea7x86bmucar8t6qwur164b0fs0ojcgm16asy1y11rdd6dioqbm134d1myn4w2qjvsb3sx0nx90th8coc0zgd9zyuzjf26jtardx8whgqe8',
                flowReceiverParty: 'kseiynwkq0lq095gk6yyn0x9q8zsqng7mxfrbepxk3ixsv1d94p5geh699zxv003e7doctgp392jgv3nxju2gm9zchf660dtsicz4h0g66638mpmrmrn8ultyhl7xs4bj5vu0i94cnyxy3hh8j2k0ocrtmkg5e2x',
                flowComponent: '0blncykynzsg89g5jncvvjofgzxineu08nvfnmfytl5fea99atwejhqwcl97s8kh7vzrucvnz7tcy7lzb6phfoye4djrfawzt7ujp517jovn9oz2flkrtte2t2dwkw7tys47uqsaxrwv4rym821jty3hxp348zrb',
                flowReceiverComponent: 'b6g66uz5caejd6czmiyy3x3hnm42eeeoap5df1j8uugust8801uumjix6vl4iyp786uko4clxjolq352uae2tedebhvw8d5jvxhjq7m78670ws30vyj6g3x5x049055xhu1zrfuqeihc8vlqembm494v67spd7iv',
                flowInterfaceName: '86sk93c2js777j5vk1utqav8nucfuh5xxn4c0qnx1naqm4t2clry7uvvj23ziaf18fp0wsy9tpp6xb4shhdwi87ow1ofkjt9bbquy3qc2o7xihw1n1f2w8p1z9igbrr54dmpcdu8x5vv7alwvhgcufsx1e2h74wk',
                flowInterfaceNamespace: 'lxeuk1oaore4v3qy8zokw2wst8tjk5939cw9blnic8g9ysp6lsa8sn0lagl3dkotobg9118ew0ndlmvvk0mgopybx1r44w94odh345dvcyndxz4cq5cs93wto6caspfkjphk8uoa0aoyzkgc12vp811k88k31ns5',
                version: 'zpy48rs3wpuhrxvizh6d',
                adapterType: '7s2ohlyz75ytphrcejjccpolkxoys232bo83smm1crdb9muismudp9apowz5',
                direction: 'RECEIVER',
                transportProtocol: '51wmdqslmx930i8h3bj0ay9pbldgdr4olczp54zgivmjsyol647q8rv3g10i',
                messageProtocol: '6kl1svpjuxjeymkc1djw1vzixrhzbleoois2v78jfacypmprq440dzc1etpn',
                adapterEngineName: '39bhxjbqcv53l0341spknruqjce57xlgrt3dx0r9o6t8yfb740se5ee2wwb1f04eg0do4e3a0jq6ubjtgttksdwyhcs8m70o13l3kotdty90e6hkhqt3nlwtyyld46jp4pnhnpr2gen19kw3ffrmnxvcd4g6a2oy',
                url: '1j5lml984x72okh1kfkhmpt7k975hhzkgf4x3b3elzrf7ns932frb3qdwqa2qve3rxai1iyzytmp0v2u1yipx5uatx3x1qnegmnhb5eq0u6sfw0sbrdu06n2o1uedmiy5um8u6e69swp73uzboofpr3ale6ib8iya333in5ils7z20lm3oemrmwj8sp9p2obvrpv0zh8zlql710893dvc0bvzo3t4yo7vp02hpx4qza5bv9bpkcn4rehontysad5dzv9nj6wyhv72gsv92bnpxo50mnbrbzr2vi4r0enah7scfzxtjr4rky8w4rim7ma',
                username: 'ufiv0lr50kbz8sdt4j034k126eenakr5ru34tr2jo3vcnhnqij3flvaw2mao',
                remoteHost: 'l9d6i5d21ykm671mar55pk5azebfc3i3fbaqq1pvrknpf4azhlc5dlydgnwqqfbxikzud0xidt7jtm393z2upkt99ygioz2dwrr8qsp02hj3txgcqg3ha4mgq3jqm09suffzui2k6nnssfy8pveirkwp60e1k63z',
                remotePort: 9450849071,
                directory: 'wefzkoz87n9flaom9955pv97bbvli3pcaqotlg14ho9j1hw2bz8n44banoz1oh8o42l0p7eu2h97gk916jlx16qwj34nfbtelmuv3nzrs2l11zhsx2k6062s3limy4i1fxprk2albv80zr1fon1a6yctyfnty7dfi5mgcygk0hqolsi1vbe8d2w6odfbepp59psiukjo2g1u0foyu7cfka8r39soprzutl1j3dgnr4wnaspbbz1slvdbw7zmqtszylth9vu3sjcz87l9u25zsbnuufi6n4m68rf7wi81pi0cnoh48ggj892ajs4vgl13lbgu6lwv1ouewpkg8c6n5hqs5f8re2k88dt6y5p3bhgvovkqivdq8pnizdrda62magqc0kyedmdj4kdc6tm7no6tey0hzz57kgp0klqw8av7sfgaeec96opiyadb48nr924t3i9oau2zy8zuev41yvoh9s07319urzx9eolbq4f4fxffsdc5k1r06lj9332pivedselsjcyvyw0pz319baycjj93vm3q2eyiui70qorxm8hx8hz2zwib7kaj8yprrncvho87qe5broleape739k2u75qvr86sebq9tal4b79rdp68836kb4bqshrmzm0p7y92ujpp2yn9rfbyzio3cctrdipzc4z5xynloptz9cqev3doupbc7n8b6o4jl4dhgpnbmrtoucn2k0l6bupapgzgj1be3lf3t0e1krgpw2se5qgdlhbu8ryj9qbizfwrnj4hn2i2dfdp539hzup9pnsmitw9unqt222r9d6no0r7gou52045dp74tuu1kbcln0975itka8am65d7fvq1fx4boy65lt9zr81kwkirenypnimkbw8kchz8j61puje8lrwbr8mdw2fy0585lc56f1ik6egaa78m4c4es17nhtcmj56tmy3z4jhe1um092j5sqmten22s5uwh4ibjmjpr531yqejf0a8dfl1owy1th5t5og6yhykyjowi553893',
                fileSchema: 'o9q0awjv6vhspyqfaly795y0u7smvebkn7p4hjdz48d67jtzplh64oge5f8fjjj0uqffg8vq4g7nu7q9oa9xjn27u9akyoof9q205ndok5l1x5pvsntnuekd2unezc7555ditk7xnlcomlen2p4f70ydjsjj7bnz0b3tkqczl3mkpr55j4b5ij03zsq212rhne7dr0r7pys2vk6ntg7c8zdwbrmevn5oh4dk7e1vhizwn7i31dufg41hcwra017vvvkbreccsau49fbb6p77uhblj3ar0qttxtbzd9s9ingac7zk324grdxgilrr1yytz8mn4pbsm53uo8au7yrubmpr4v52v387qmlxohlzl2eq1c5e77xs0nfenu2z7wqbekke1uin33zc6lnbn9n8wnxe2qncv6whchpxtpjqlyd323yd6uvz0z44qg14bogln8sidglxu6lyqih03u4x1yz6j4py8b5j5mif85xd8p0h3njqpnf7pb7gwgaaarsmro7ref3gi8xu29rhnq02kjuydz2ym67uh6utjpkd8ivgb48cvlt1yn8vv5k05jgy98yvj0fl866ucsweecgiw2syxs80mia8w22ozia2x2d0emb57ovi0o48srymvehvw44xl8dv6l25s9jrpf9n8fnpdh6ly4n0mlz83w9vxewuk8vooxljl5tkriopxsx1aggcwz3qhv71lv71y8mfadne28iuu0z6m807via989dm5jm83zqfq2jrbhxzld4vlhhu40fr8lwmjh0kocbokwd9cmsq1s38vwreeqwjq35xk5la7hhautxdwt8iul87ggfs625a5n1x127ipbtwmk18tuxg769jt9elbexlco2tegimwmortizkivziaqmao0gtsv8yqf7ev93bl39gn435gkecmwkta8rk88qzv1qhrhifw9z82g0p8vqqj4j5mahtihq7dncta7ep00w5y74gbmlgch7vqnr4c6ckr05f2ye1w3jufimf6feqekju',
                proxyHost: 'lflxvxqf9cqaa7up19lgnou16hyj7sl3dmv1qfswr5wlp3ufyeilchj6smq4',
                proxyPort: 6675536175,
                destination: 'actqh6nhuj1sgys3h6kpa64ohfkdhd8ad8zg0thfigkrful2xoh213lpecsvbdmx7glbwrzm4h7ss6teirh3obpwdtuquty9ntqtc6hy215vkyzeu9q8hwy6ytirraq77oyg7wllsjy028tastkh0chq1iemkoku',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '93m34sxl5vafo0ywar77nae6az7ajh01nr4w7eilqhej3k9tv22hegk6nk5g21zqh497icz0kkpq5zshq72pksygf68qjk1wh9ab1sgqsriljx3zmpbbvwgn09lqpjhsy7x4d3pzr4gxh8wq9ab4op7v4dc1n11d',
                responsibleUserAccountName: '9ubthkvv2aje5deggls9',
                lastChangeUserAccount: 'xznduqxm5loj2aosd36m',
                lastChangedAt: '2020-10-13 06:28:36',
                riInterfaceName: '6168os42clmdpatmux1712c6yh5ysmkx5ykbfcd5rtnqu1i46smb8q6jmr96791fquuapnqyhjj230s8j3mc6opg8em0u776ofb4uhimp5tr8by5g362tg2576qmuxe43zr5uwtz48c7iojw062er92n7kg4a3yj',
                riInterfaceNamespace: 'y9tn8h4zvuwmnaeupa7xuvz4wav373w83h50g8z1zhe4qc5rcc5mz8s0byc2u2o1cp3cjp7u3kyhlevpcn73gi3xou9ag4lardp6i9tmrqvhewv0cq7zgiwg3q4gmzg5l9cscbc5rbq6t5bm13j9p32wfcenx3s7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'ru5urc32yyiw762e6s3jt2smurw4tw6bpphr2xzg',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 's2b6wmmov2v7xs9170g65cqivt6xi8u5v8aj38bkejbxz8ot4v',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'q5gc9jbhvxxjxktree7d',
                party: '8gjt48oq88wszojndkmbx77xpnxrex9qb9gj2fmso7s8vyq33rny8dga3r4033fv5csf7ycd2zru090znv41luk4rvysrwngouljln7pqqm03h8fk5t1xafy6lgssow554p090zobxx6t8v3fisfwdfmy9ahkt2y',
                component: null,
                name: 'mls1ym5qh0vxqrsdysxprdcnjthu35eqrhwxssgnoi5wncxnjev3u7omjffgn5jcw79lfvpnxi876xttm9ew12wtyaxio2id9l3pj7d09ccaarrcp4dn6xz2waouifvw9evux4f16kmjaftc5ovv646gsiok7enm',
                flowHash: 'qp5ovfz3iw0k8aafy8rwabdd8f9pt4b9xtigd7gi',
                flowParty: 'hg9pdbjp2nnriil9aapq4qialst0km7bqvgutlb0hkspgpcc89gpk4xncvb5wtyf133w44wt30wab89ychxthl4a79s3vpe21u32jvsh3b0vurhwrdt8amedso248nth2pre6akogbjjvmwblpb3l77qqep32fru',
                flowReceiverParty: '0cxryxqkel7x0f9e0aqg2nm88asxehb3t5y2bgghbsn4sct32348csb6090kph8lo0p1je7am59s1sc6hf8jawqza67y9wkleky95xs73dtwz3aelzxsk49ikbb864xchboptp1mk48f2655qnkppl15ym89qy4w',
                flowComponent: 'z10584iaolpnwkwkvkaj77gb2q2yn9oerx7uvyk3ghrw269dh12jfell8woc0kxqpd705u7ugoc190bsxuvxw0pyaggufzaadb6zo4ewhbhkvg1hmxigwzdits6z2kvr5nvualblmrroju9l0v9siubhw5i6cmc2',
                flowReceiverComponent: 'of0ixxe9fi2gi5f5s0o71tn7o97nq2zbvuqetysf8epsltjh6an0dnpatnj1e9jr1r8djz43cluk31nupoooyj13dlt1ljo5rlbj9eww9ild23ie9vmwucsx2bklwkby7ymuiatkt5azjj4yh94q0eflp2c8l9kw',
                flowInterfaceName: 'ncd18mf8zfle3u4y9hkbw0zxasg69iikzxerw0zp5o0jnsyqs7deujxx81ngshmihyvdsqjmc66pilzibxxr3oefz5sw80280jmks0rsyoj86tsrjgey6bdlpwqb0fngnugv3cykfqrz7xj5jc0innxtk68cnr67',
                flowInterfaceNamespace: 'fldgaslpqk37gklqsh0r00zf77w2d3fd6lwzur5sdnm5imojgin65c4s5yyf0bh2bwzbl0i23paeub9fr4njbz5xk542vluv18msnkmk75ymoxi68yqyq5o5bgm6nrpxr1g9xde5nzgrb8lt2tbxxf8mus8mntt0',
                version: '7pgq2g33ijj7o8o4ujnx',
                adapterType: 't1nngd0btw4fycsjqr2twekr6svrj7t38v43zvl73e12zdo8v0shnjrhev7m',
                direction: 'RECEIVER',
                transportProtocol: 'cf5kmvja4pd9zcs3ygkid8t445jiogl9tremiw9blw5w3sysbs2lvf8neyrz',
                messageProtocol: 'ed8jbul6a1wt3vxyzhl6wg6vp5545apbpy185ubg2j4cyhr7pabcsu33c4m1',
                adapterEngineName: 'gjdqi8h67yxd1tll8msrho1vqqlh6k4jpd8xs5lwkygt0yogt6jqm9ahy3nrlkd7hc0e7hb1ilv59efmmut13yh7phrbc6sguy65bnpwm3fblssqn4ebhjxivy3bodjv8yp2f2d65kzfrxofbv53nzec9ld6fx5r',
                url: 'g78nkk24acjgdkra8qp2ugyhlgbpv1ub2cglr4s6mzdpat2qdu5ubzsyuwef69w3u3xaiwdjn7wil0a35ki3d4lk3n5ug9bt4vsljj3y1taqk2324oo7a2ng2enwdqm71hpig8pxuzc6tpcfyz43eon5hftd1j19ipzy4ukbhco2tr8urgg3x3kme3iuzz7ni56ap0cvn8vv0d7l8d4mxgriulubt445hf2v4v2y36pdl0tkkxq8n6zim184nphbyplzc4f7o541g5qhaw7n28p2zs2upku9w6qxshqhinvza0hhzd2pue37qwb9vdwv',
                username: 'dgyg3r8rvtexx8q9p4qu1zjufw5lmafmb8kwu0lwccrpr9qm7usw77am27ar',
                remoteHost: '6el0avon7tdorjer4sosssilkii7goyxy1cxzfyuhoi8estym4u6nfwslnz9cqo3iadnws9e8ej4odam5mjxsyql831vjfz0ig3hca0ryp6j72nrx4w7m2mqvcjlx2mue4csdfackwg0woz8whprmpvyw09nbjrd',
                remotePort: 1173063757,
                directory: 'r3xkxn33x8d5p73m51emkedg8er4ifiev0mc5sf0ln2u5w7wn0rkgojwppmp7fpntxc408zpxiipcjl3dvg8ydoigl5v22dh6ps9eh0jgy2k5ewotp5sy3ja7p4t4vlsjkdxcee0xptgncsw63wi9nokp7mdk1kkmucad1hvktiel9jq7atcvsnbspndbmx0gaiqquxg3t5ep8tto59e4kckieaoi60ldi91rcr41dww1t25bvkew3tcs7v8k0vblm155ahi6ldtprseuepomf0taryz03obwrhrjjyf6c97t5yelg5kbf58xbbe9y9rq2eabg6lr9fh4rdmz0qf3z45kv2qzbhmhoyv2ddd3gan4vvs8517gaq9wpvvir31xdze4hw55v7f7uvpkfnz1ybwb0a64e7skuwwct6fp1uxmhwtnfrvjiqro7i424emaf8zyfiubdvpult2j0fs1xiajd5un4i388eyh9s2qypzatt17b65b9wia4sfrem7a6hkv11w1jry1tzeo0g7b5pcp1wr9addmln7fyudbnrahvcxjvgc7p5av2ebg2y4gp4qhanihc62w5xke5h93me7ulyhbkc54xq2idsdse1mohwxnlvisrj7u2d9fw3oj1z8js5bk173blp836y7f38831kvlpg7g072og0odlzn6w9fd7jl4kvl4qauov7qf97jpdgmgraqp06uac6k7obmriz7ypwntlx8d4s8xcs07scq29c5cwhrzgf3wtu5cy00vfcwazlq6rbtseu5sltknp54affqf9o0jxe2fvqlf3f1j4ecxuzbbecyqnfylvesxskprsrwx18jxrzxf6zkx0adszbttd3nrmb11d8ihdsnxjyd42qqc61tiqp9f6uqwr2uwwwemjcx1waebptcph2wls2vlwn7jv4qv5n2rgs0zk1sb4vkp8qq49mp06azovuw7fvbiaxcbr954kx3qii1ydyxpzuvy083ls581xmtmohfl9c7cul7boxd',
                fileSchema: 'j4uoak8nrg7udzsj2w1s5dr3donpe1vip1o26ysgmj27cbliqwrvu5ha30ljd272pgpfdpxk3btgvkqj020idhu3c8s1u37sgbzc55i7vinbyey80rmlje45gigayb6nxnm65vfk8af4v0jywvayyqkpfauzyhouxs92dm0noeqn246cl3gv2ve068tr7i16n25x8gaw19pawb6wpz0h3h7xhremujvr6o0ql3iw025xm2jonytkj1by2ezv0rd2p67rwifljww44xl120wlheidua2cwxc182rfsqyxaeeritpyxxcm18brknsot721t1bdbxvb0h226rzm5es6eaflwh230zm7ef4fblw8thoou24kt026fubi9hz2g7qu76h88q05y9f0ez5bnti1oz8wsindiww47mscvodzi7tcne1tr0is7ftrgmqw9vbf01gbwwmxobmonui300hgle26bqu880cxgj2sy2smpsa344fxi19twpkrobqvs66axjk1g7nzhi53fzknqkjs79ty4xhtp2evcl475qd5zx4bczdb63kwq2iodz1ex72f6ffjbwlnag8elodzm44m3p0cp9lflscxuc8kh98watlpx4pwe761sw8c96dfxolfutho7dxsyxz91ee6vxqreodvniqmb0e5oylqlgak9qy0sy1bqau4can37y4zof81e53jwtboz8m1mrfntivhfpaywwlttl1t8yfxklu08l676u8w3b879sfbjo8n9qz4g7yc5aofjs9qjlcdnfjozq1rl5kwtac9bnivoiieobfij78c248acr4kcr6g0n5mp7zrfpu8ngo1c8b65gjcg89m5rx3xfuio4cjguo0aiku14nczi9nnqlsv74501ogh1bhk4zpjevpeux1r7x9uhp28lkkedrhpgclmltt6546xy36nj4ijg1r7kg2s8a8bajx7g3ba4vhsxake5xycsco2fjqf468qjhsqctoqscuyie9ukb1ak73as6mkxko',
                proxyHost: 'y6zpl7km527548v7uxkwh4kijkyx25ymgbnaxjxwvog0gzyh0jtji2iryj7r',
                proxyPort: 6884250730,
                destination: 'g9jbv2621x2d7bopbeqmdoprp1tz3hugpaqk4qv7i9xzhkfwy8c00t91f2j0dc75b4bzuk7c6zzm1fpi7574216gzcvigm15sxg44zxrizgjb0144th26oo334uutxb4gbqdvh1z4d7p6recv4k8teq1a9gum983',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'de1wxbjfqbk7tl011n6ron5gc7jic7zsdcmoikn99glrrwjj3yl3jxluu75lhdum3z5wyzadxcovsczn1ixsxrcfkeqer28wlobmj8a9gkbghv7h3j7yfqn61cwe9hkam5gqjp2318lany7s6njvudrv0c2wuusw',
                responsibleUserAccountName: 'op337pvrk08ieq8q2pfw',
                lastChangeUserAccount: 'z8jbsi4727xzatn1frz8',
                lastChangedAt: '2020-10-13 09:14:39',
                riInterfaceName: '10sc4a80zfr7xh7pdf88qbhy1yd3crbpappatvdffbuuokzrt2vo9o7kgl0uawevktg0h2bxfzl9q2mjg0tr6oqes68a0398z350dmclzv4vn4kxyoexdt8ilgveg6887ksloxfzo391x0khd4yydn796sizgbr5',
                riInterfaceNamespace: '9hxk9xp3sorg4bpsp4jl7j1bbhs9ttc94aeuveg8cmkk3rbmnx7298stddu6cn6kam6n71nxbekqfy8318dlfq6zbxkzxcz8vpcran9bs3ea9p0j22z4494itdsxf1lsfxfn1hfszgqlt8jyk20f2im26cbl1w26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'ywcbpr9v0mopweremqycurf7cjknt084xjz954py',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: '8lzjwskog0fm0hkejx9xdia18s901nte1svo1tf6dbd4vbvy8u',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'tfm1dc5dc46qvslmme66',
                party: '1ho6rrbuc3m67aqldo6d0t1huxfgxdv1wuz5uvaoqmyd4p2ixmtqmiie8zj6avf30o8bufv477hp46r85qyzs8z2xapkpvu6egpgxzutylgb6kv2swu4t02zrzk7vyokgeg3pe6siz7fiomuk8pvd07dt4l8905z',
                
                name: 'vhpbz1xdqe8v96qskshtxrwqwabuvzgdawb4h9gv28t9ijsfixh9oqtgaw3jtsp8s9any2qnqmgueha2g8iby221c08kfvvkx9nvfgosfvm3aasavlac8i9wcd2z8lw4v4af1kv9j6vidyqs9ba5ylizqvsbptl1',
                flowHash: '6n3cf4849dv2j59vxo6w6n5hmejao9ijbmk1i64n',
                flowParty: '5cj91atxnn0bla7q08ps3zjzww1n14kpjaaqoic63u8sjq51cik4uv8699x7j2n53zuz9ffme1hr2o0bl4lhu8n3os5h4qh2ozxa8mf40u76lc3gkgodff8k8ol4lx0laqs9qrgdkvjyziazbcbkfgvrb2onc8g0',
                flowReceiverParty: 'h6cdolcbuf3046qik7tqrny1htvgbpbg6qe7za5bbc275ykpklb183ttdj7dm4xv4611elho1l0aiil9grnqzo57jc0ckvvb6plm3wxx30j4o8npg2f6v2f352kibna52tb17ao5ztx1f20s5zw0d9uin0t68r0n',
                flowComponent: 'ao04y3gfqlcxp5vll5anspnh4160nfpd54aatydzc0loksqctaujepnhcaq2kp2fgw8sbflob0skp3b72c17xgbebyoev2f94lzn7zo9lx7ilxnco4na1r59fgrfv4276eimcgk6nvd7c5pb2da28nm4vulcnisl',
                flowReceiverComponent: '3zcb78jzzhnnev6h7x709jm2wvmoho4v7v8ckw6zrgma0iglcw1v9qcm5wsx375rgb9swt837zhkdsd8gmych5wmez90t0j1y399m0xcyxmfy314xahvosfp87p0ddkhh09qbl9s2p2kicj4a3v5bsmsngmvezkc',
                flowInterfaceName: 'rb2zq1h3wyjju32twf8gilh9mmr0j1yyjs2yo0jsoe7elsc6ns22ba9buzwky1q2bkqggcf9vodps5l7o9g4b3iwccqdyck1jtvh006rvgqeji5uyzln67dbmypck7nhb1vmre2dmjoftyu461s6rtsl4ksz44pb',
                flowInterfaceNamespace: '4kgsohdf8f08o1v2vvpqtxt7dgc87j44iayfkxo0e7fh2vszflh331lxby19tan5ke1i6zg01maq137kh3fmvgfyxsaec3y1w1kxskato7hpmhzyyub6q1u4zcw7d59jt9gf1st0v6ta3gleekwfe4wtwffzqvtt',
                version: 'y1atevoqqmy6srhf8m6b',
                adapterType: 'aol6jhqg4xdxky2sqpbbav3hc5s47vk93jjs8qgxkgz71fwjacitb1epe5nk',
                direction: 'SENDER',
                transportProtocol: 'qc48ef6v498c8nkq92nifeh0scc8engqat6dlataoetb4ussut9ado19lsxw',
                messageProtocol: 'ua1cumceg7cafkl2uu9obkeb1jxfj2y8dpum68eowkmzzc497gzcf7swvwgr',
                adapterEngineName: 'hfl8aduit1kyvfak9fyb7tf3qr07ys15hlznhazjvobf0orwwuuebd5quvl4uct64ycm094m50aawirqukicv8snawm8whn0ds4drtu0ubqbbch1o9u0ycgtn2qas7n35qwjw9oaou5n0y4424rpsdob55hn5bpf',
                url: '760mt8d2dkihxro0pp78w5tikcpg2visowoerdwzaifab7loy8qbh1g5r28mx68gi7mu2rsh1znu53fk212km8cro7fnc4sianyk8nar3u05s0pkd3dgnfto2khzj9vywz59jzlcdaf43k5s3wap8viuztk1zc7yu0xnuiwol781v3l1xinskn90qyltxeklg81furiezm31lgr58xvv89ab7ftx2854mu1qzesg8r4vs8qoxf1stpl79632u0wt5gv2k4ilwe9fdjny8eougfe6ys46dofc276uxfko87mepjh1xwmylz76zmv5wav0',
                username: 'gdfzfaaj030uzlq8i75bql9lh3qvjinq6hs7971tb08pa1hpne8h1ac16wkt',
                remoteHost: 'u1bq4wqdwqp3vn20aaubp7qmfh16l4zrnwexap10155p0qr5xoljzewuco95yf5u67unje73qzc2q62am5ubv3ac7rdboup0sf7xjo31goicjrbb5qkjp0swtq49rd2pj3vvfnxji0p7sgkaalnvnevj3wwyhlsm',
                remotePort: 6850499158,
                directory: 'zmw259m46rj86y5gqfdvnpbqt8kjxiwjtrg8lk38b9hq2ofjorhrm0od0r9t5lnyjdu600cxf9nchlw353mkcgyg2oxn2moz1h4cf3h93jn0f13w8dn3dk53x911gsff7lxrev5o072f0jvbaktdm8zdeq6agy3y5lymzbouxg1invq8uazkwe98t9zn36gib68nl10t4qvgq9rxitlpg11p6rn6lof4rahn3rm8avvwaid8nukfgwfn6lhd4aafa6nv3uzt0h3y9grsmunr1ldhs4cd84mstjs6rfw9crbgonukcokdpz1vtjznkq2kfyqrxodbr8h1u4pkzy4gp5rbhqhhhj3hi1ozz9cq8chl5mqixt0118r36lgcikn61n4uxkfh6kwwyde26x0rfqvbrak0m7yfias91oapqski2i6ufr5doj9xnlhmof6nmou2shwj2v1xkuvz8bnc0vx83qa9r88pyjbjipel3ykr14h8uystpdd6y8utcbzbhwzx4i61g56pwhtwy69uiepoodaisi90tg2612zvicdjhn3w6ddr87jbugxn7n9mrp0bki1180kv7k0xh25olq3qyfv9ztf6oqgje4fd6myv0h1a3ikr72a1447wf055lx9ig9vosakb61t383wfdny1iw48uniha0l73dwn3b7eo0w0rsc0mexstxwoq5qfrouagts3y5qjwyg6vo3gnko7q5f0mx9tzpb8nir987kmz494wsjiasqqwdlwibh43bq04yzvww2f7bicztr1hsu35pxknqo2wbohiyuskl37iwh7g1yz4js8gy3v3bfm2awskxk8es3rpoo1b0tpttbuekgnmfbb7prek27qjb6zkzv0emav6ojzsd2jigl6xxyribgk1n4kcbaxc6cwevfy8mv1m2fiu3vc22tgrk3nrlk2ka50irs1ybph6rda2infd8fk5gqe9pv4qqskjyixxzm1ywndotp6f5ijyr7nusxl2zxpvwxntb6ip7m7',
                fileSchema: 'd3449wockaca41iayu1osxhpmpm6lhbwpmwqduanwp1zwh3upftkd0y8pwqnvtg99gs1kphgd0e4u2f2owwp4xmhoz1jdmvcrykqn89wmvnzna1nn8ugwwzp3y55qqqr0meo1mv013k8g640nvumeegmy280x074l1tvrli1z8ea6xszx6huebdt07esuz9mk09a9z01m0d0t28wk05iayaqdo81iqmldpa1fvpvz40ef9d97ywpre9pr8n9rai970wfwsg66v5byy88x5s48s3zdr49d4ypj2ponccu6cwgsdfio0dmwbv969yfaj4g76bes2gsl56z97j9wzqo4v24cf33425x73lkv81iwiwkyamy7slixfy19ho9ply6px1qr1xcnazuqi05aww0ctslsi4x4diwo9he4rdesbuqx7idvit4kw1lvguwn1rr28eih1ef7jub9rdxr8wfsge946utkjqbhjy3qr8j1ih9s7qygplavs6tlvs7up7ptpfqkmmlqwnvuty1pqquycfw1q2ez25uxnriujzp1goo670q4n8f6xcn4yin7kiy2io623qzqug5jcdjb61p7rxgni7qehpdbvvzgg3ncvq92z0bj8glhrr6p4c0m6vg0hn9yhyhnvsfuhl10r5w6bj2nf34n3qa5lf7uhsko5uvzwpy6dfq8lqg3iifurysd3kivqjbdn8ieq6a9tbrzt5gy6prevhqwlytfg8761v2qydokuqj75tuwgmabruc41x7h074jzq0fmaxhjq6nqewmbruejhxpttputvvifuik1ng5bacqd0mrwn7ido5eimcm2nwwbo1gnpzi2295i8nuc4hp5kqc3rpkcurapq1068x1gk0no416gjskv7s8ext09c8wixklof2huwfg42k08vpr72ychh45qmayow5ifvrxq57y4imzri9xvkgl2db8qnnon7lwebqh1gyv1zyfd4a22zo3swhb4gh4vjnnk5avjrggexwv1521ezt',
                proxyHost: 'rd3leqkntjouhl2yos7d8gempw5snygmlcbuxq3on1j4e3c6ku87jm7uaufw',
                proxyPort: 3224399037,
                destination: 'yfd5krl2fc6aienlu1lzrc1m9vxwxpail0v2cu4rcwgmk44u7o9xu8s900z0vz0n7vdk4f70hr3jxrycfpx41suck72d18b139qiwtb8tglviauanyf1vsuw9ghb5o11b9bc814on7kukgbuvznzbzm3b8g4w625',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wb5skksc8my7wifyd73vv1jbsn10g04x4uabgvjgr67g9n17h78qlovrbdpudir2kcbu8w7dvi5d45fjxyhr8qcvhn7zhbebilr98u0dct7my3eepkiep47k7rm0j50qqugc1qa9ptbapb6wsqhjdm13p3j7659l',
                responsibleUserAccountName: 'gmtlqk13tpgtkxz15w9p',
                lastChangeUserAccount: '2g8nacyjvgg82ak7pund',
                lastChangedAt: '2020-10-13 13:56:14',
                riInterfaceName: 'x00nv63m1dbxe7ef2m7us4hms1c4jklbipegy174r9isjzudr6zwbf427ejwwtbcg481cp0svgwas4v7tdsek4gkq7f2ficwcf1lkrwb9dd381barjo0q8h1yjwozhbpl52xc7l3lus5l4p3vrr9g3zckpfc5b8i',
                riInterfaceNamespace: 'qpz20vd8ic70py3f753gyrrtaiv1jcstbouq1i6vvqhjwhjdlllmikl1tv9emlu0y0kea5lfmky4vrmluw8o3v5giq2ov6sqwhg5vojbf0z9l0v8plj3337jvb17ollkzu8g157b4wc3o98pfzj1pkopif5kq52a',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '4djdam066c1r9oiv4bl9mz0343czij16gycx9ife',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'xdwdnybths4z7n6ubj6y85ongv8o0lrro072bt1xj6x95sebsg',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'pqw9687ippon0xptnoow',
                party: 'pa5whe6sapxr5nc8b3jswj2fz1m5xcxyiyznall5y0m7ytv9omkxm83pog8gddecue8ybcglobn3cl48vg9vmyw32bikfatifanujpifzt1gweadp5bt4z5ka5umzipucd4qtttxn0gy5hzweqdycrmv7sooa7dh',
                component: 'ot2y2xkpa41sm33zab8c420i7c2aoxowq0gau3xstfkl4utnvq424jpyj1zepfpvlz1xsun8bq38g4xzf03840ekina5s0ad5l1arll8i39ack9x5zjnbzo7ncs0iwx5zp2w9s2cbokgupf1q2f8l659xvwzge3i',
                name: null,
                flowHash: '03m3r9cui3zdsjqkuonv84wmyep4isjeqzadxjzi',
                flowParty: 'nrzfqyn2a67qrvxfy2c07vo9h2sv58p2i8zfo8rs18iugrett3yql612u2326t16cu2vcsm1glxmmlkzzegz7vv4t9k3zm75z03zg3u4mbeb8vz6vmg69xaabo6pkoaiolw3jyl2thhngwp9bq54n3se08v3y99d',
                flowReceiverParty: '7ptiga231tv7vkwmpe9dr8qopqde2j1v78gzp0453bya33y9imdixphjgyius7gpu0yd8f8uz6x0z8aa4vt3y7shohgaqjizvhgz3o0gwtdpclazyfwkdzjkg6wwzcq52t3qp6u6421twlsgh1bozqifp7fi4rqw',
                flowComponent: '99xenwo81nasxz1p6llvtkz3dk07vbt95g4tvuksaxticb9gghwoz9kyz366c53akt31xr7k4w8srq70j138ge1to65hhebwiemenqchpvs15uc3l0z5w58hrhudpyl2kqsmrg3gvs1kcdyq12hc89sluo7uvunu',
                flowReceiverComponent: 'xaucc3cpjdvpiic5se092or77i6z4fpcyug3le2imawxd3fdt344o8jqp7wnzw8liqcif4uz05paqma51akmuirz3uj6xpx1n26y45d4b6yplpcp5j8fnp3qtxj8p0xlfti358z1l4eivzzh2p34wtjfo37ddl14',
                flowInterfaceName: 'tc5711mu9u7ygkvmvxlhebdcvcag4vxzg995jhq9elnlkj1z04ei5ymf4g1eqa1lgfe98rt2a29ixusllbpic8fdp44d1ycsi82g8qkjbrirx6trscm1iuk3uaqb7c2cqir6dzonqpner6uzc8fose6vdcksuywy',
                flowInterfaceNamespace: 'd4m0ixsilx746993irc80bgsd3l3r0pw82m3d0jrj8msaat8ix3ic1z4yq2e6v3dm9sgm5smkfsehq34mwt1jji1own5a2uv9yvzqr4cv7pj1y96r7o1uwhxlwpyod5f0cp9jmfiairkqgklnae892d23kyn1h8s',
                version: 'jqznlzew49wrgnof1rvf',
                adapterType: 'rrcn6motc6hl0ao9cr3tq0od55o71wwa49n8vpdyx2p2h5ip9ljarf7quuge',
                direction: 'RECEIVER',
                transportProtocol: '2t1mialt6dmcdb9w3rilmqlwmg1z7tapq8ducsh7dakwhub0adukikc94yo9',
                messageProtocol: '4saxvxflz97oxe1d6s053z54f1n96hddpam8lx4oa85plbi2fnptzbuwfgx8',
                adapterEngineName: '242mrqfv09jlbderkcjx5nri78weats7kwtuhh819ufeqhccu4wk6tv7a3rxxgecoviftf6r4us5zh2wb6710b73c5s0gddwjunf6b6b7g63f31deenz1kr8f66udnvan8k54alz7oulx2ktg8jyel5h0gf8yjgk',
                url: 'pwst1mo6xasl73cqwmln59makn7z4wii3e7jgx6hl837ofm1zenlrczc9re6nal9nleql12g9sl2y7rqmvw8s6xfsi1mmv6h9r8xfhj1rpuwb75gmk4rafy1zt6zy7i9t20jimqw64fjqc83zbuksphvucblgl10af5yoewjwgezs9s91fwto2cawzjoskfkdghxy33z3uwdz9y5z13qhg8sx4mtdnwyojlpe0i1drwq8lssjyw4z7l56aozvqjw4c41pziub9kl48lhxn33x4o3uknv4xpgwm23g9l0z6zlfys149ztn41p78bio200',
                username: '7nw7vhuqkrexfy1m6rd4xj47vhll31m9mw8kr8sjq79i4c7rmhe5etqp9qi2',
                remoteHost: 'mxz6eyw6kuga10a2f3bhhyr7cx68l6b0wrd7caca3ybetsotqg2x6zefyz5tyj889iajm5r0korhfgkvoz0wehiwyefodg2ekdyho0uahb1ws3e1ab7csb6srjldlnqwrv389hwul4ru3dy8r1osh4yvo9mtl4xd',
                remotePort: 4684004578,
                directory: '3mdl9xiovjqtizfeqtqds5zqpdljbdea2hw7w34s7ovinf7ytv7ljcfnlq74v6padg3yfdysstzyz19ck2sjnf5ps3rjml4audhh2tywd996jgkt6hgk6myhrv5t0mn9e9uaru3wfn0mqpehnbiaaqzsfp37ur8cil3lg8hl2b5tp1dmcgbwxauulclm5w94xxtayxi9nx62so31q8xdhmb4vb1webk9jh9js4b050ls35wssgahrk1cf1tmjjem4kmk1y1usxeejvvpv75hz84d9uej59rpcamsfj2fikd7o7mp2p763qbklmc8fai6ttestpvqjsaca9te8zka3de7pnj7ia05q35ru2w28uzblmyu0pxs3jq01sc6msohkiq85k19xgrayvnq6a9oyj4zk1hko48actoohxfa02vcg8q11gentjz60izjfv2pgi5k1l9q4sra0t3cz5xp7swtnpwkp89lg5qb1qn5jf59vtav1zepmwkk5ll6pc60xklm25f6d5i8gwl4dg0wl5i4fd5rodfec8h4pea3p7ntyjb4btn8ja1kn5tz78gi1ipf2uek0cjx5w2vtx3rpwzzekja1bs3c9kwout9owdk944rddbzf3em2uyq4zu99dn0mvvd4rki2hrbdxog31v3ulvot35ns073kewerulkwwoq9q0uhxdjyb5r29raw35yu8kn74ke3jgb5o0knl7d4auexzy2349592x7w8pbsu3h0582yrlgomxingxwxasxu8nwdg4smia7saqacwch1zc0bcu1lb1hrau2wmvmgrd24o7tsxf5zd1ljebebxh3i7sdp6unuwcvt71l3o53wsafoqz382ruxkz06m5llu5r3g6fe8lrb05hcfjxr0eogy8cp1dgm02m0otu9v69pogree085ksmhrhbug3gp1xjssl6tr5qxnfyffcvrw2bib6jh1lg9cua0nupmja6g9kqtdmoio75of8dubxp84i6fd1l0wxnjwlk8lfn',
                fileSchema: 'liij439rgy4lli155xtehs6xvzjrznq9f3de9itmau68lww16b9fwgpvy7l2p464edh0dv7e2pnt85r4rhll7iuwnqmdydy6pu8k9h8nn19udmymxkgjh5zx4et0chtjql6gslwfbvae4lcxcjnf4t9v34kpry0exlgenbudx643kvq4fnv5uv9c60m4hftzy7eludogl3t49d2jg01fvl2711hkpqsvs42cg65kvtic41xslp6ci0tcuajrlove3zo68hpbdp7y7mwurt1xxtoew6q5r15bnnx9ajotvhbb1ygg77jln4im6xyv05039jcjzsmgyypuw9r2j73v3ghzvmcnifem1mvjk7gkks3xfvbpg956m7j6csxax98d6xw11oluklczrmm2tnkkxan1flynln0a6yhhpdva909a20etzt2hrj5qy33etzbxayxmysbbg14io3qpls0am698590o0qn7588akmsrrhdj259glgwtknetddp3x4080aidwfmhl722eun67002tk0ndf9vu7pv14wsdn265cro38seczremcu0trvvqk40x7f1w2vx3l94p0rvrruao9rd6dvvkj0szq5mcgkqv4zjnim0sgl2z09e7alhv1wki58h624fm7a2lrijx0e2ydqkh753edoua8uvz7vzxjrb2cughd18fcakyrfrw1dcgp417xmh9wg0gxwkhqd0xa02vvaov3um688i686p2x9p654y2kniad3ppe5ht8pu9c9g1h5q1a0650gii0jeq4lhs65zkc570whu8k0seqom9hr4ilgz9wka3ldjaibempqtnpn47bvw4w4lytahytifbpyp60nhgqd14d5qpyf3wxb6s577xrxxinec9xppiy7yn36euxrpffx98nf3r4qp3v4m3nfcyj6x6s3hn48aaol5lozj5plzpmlsvnnh9qxclwv8ir48cvwfndv1etoxaence1flqzgmht8yokr1o2x1gskxxga500sa30uv',
                proxyHost: 'd55gh98kh59kxp5q1j4832ndbzp054vai9zpppk4bk5un4w3mcyjjvctj5a4',
                proxyPort: 8110573017,
                destination: 'pkni6xrcdahqkcvjxuncyitz6vgxis9luxtplcadjdue5z7joqsx1i4y4wtz8qgw7hzujqge9mbts988bidqekamht1c490bcp48ziml9pn0qnik4hihg15ybk9i714pu3l19v4p7ytt1z3jfsm713rosjnsqmui',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'n5kzh5iwpxplev63pcmdgxdxe62lmfd2m3c4b51t4ekpyztbqie87axyt91692qtmx1ukkxq0pv2r5fe8oyrfcq150vb9g8nc0ylel2g2ugns5bpjzogyuochtz03to5g0w5iv3iao7wgcodunyim6949033l11x',
                responsibleUserAccountName: 'xy2cj29ss9u2fmk7qmp4',
                lastChangeUserAccount: 'x56ntwqubyqued2puurn',
                lastChangedAt: '2020-10-13 08:00:04',
                riInterfaceName: 'vih8pforadqnnx19wo795e390zx8snkhkzr1dj8bfjngrbe9kqwlwn4yykv6pxg3nl4sb4j8rgqwz5x0g3rooelwicndap9o55ojtyjqj16nfy4vt0yejkzqmye2pwdtkg4pmvflrhfsof951mylrh8m7e3aoow0',
                riInterfaceNamespace: 'mntpcquqvqsk8mu1t4obw7c4rh07xw4cw2fgdsjd3j0kr5ynqnzhyejwob7ux1nufzc8f4lkh6bq6475v82t5qay3hd07h5gkkgeh5uudry0jdw0iqfpy1sgbdeimwe97dbcupehxe41d0eyuofnpk4w0pdjqs3q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'zp7xfaxe6g5rl19kyvik610c9vph6lgohtpdudl3',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'ba2xjd4yyjwvt98yrme0it5eofg4a0rs88nf86hl8horde2ai2',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '0ipcfuw5g27kfm1z879y',
                party: '4r86xwzojlh0sx6x6ga0a5m9d4rorczgs0qkpi13rap4xb9x4ktlc4ndlow2rxu5q0ies8qujoblqp4yvddp4veuht9yt534vki6351jgoqsueyh4tav03xcor5yfyd5sqclwjkapdi8b2b2vvzxnpt5daiyka0j',
                component: 'kxu7sh2bpujjc4kovtw0sgrxdu2mckxrejyezkpxewjg2oxbjm4qqzez5sswycshb9fzxcrevomwl8ewyf39gubbd1khnye9rtqg7jtd4qhhvestltq1svt80y56elw0ymcwgdoj29ovcyz86q0ekluzlp3cgw2w',
                
                flowHash: '8eh4wst4ikpa0mzknyap5zkfvnbo69tip4j9igdv',
                flowParty: 'i4n5a0jwtesj29hqyps9avh6drqqy0qh1jz4at46auipfchqbnpy5ffpedvvjuuibrcbyy08b6454m2bxgjhno4487l1xdoh0xt642gott2xzcwq7b3qrx8z7e06g3j55hsqndug4wtyc3z6bfp37glukx0jlrc4',
                flowReceiverParty: 'xao4mc7fhio30swayd51z10tzx9gqs3rr2n0mg6yae9sw4qgvd17ebgxkmx9ygh4ny4p0sfli8msik5z5jo87zppns86iw91ct6wa9gr7bup24oo81erznhgie4kewa3chnx4qy7uje0mm5ph4eka7putl4gpqcf',
                flowComponent: '821hfrmywituom5m6tr6ytgei778mjhj1rtq7tmqczd8svjhor9mkjl9c1a5y38k85xem72xpclqxo6kfz93e3slmf5n1mhnnc0qj4pmrjxazg5defnrjnqf9iy1sn07u7wdq67qyqu6fkfhojiuxzjtvw3uvelm',
                flowReceiverComponent: '5c1uxhykobseuugolj2nitew2f7h5gikv90v6w8c0t5y0h4ne8832qzvq5f6htc1rmmtbp94j0pty5khosciy5i2q6fomtmoftnuvkp58jdtyaku66y3p6oqvq9h4cqfukiljia6gps1q9vpv6k7r6i96a1kwapq',
                flowInterfaceName: 'szja8gctg99cfetwlfe2hmn7tn6m2t71r53tbag32fllrhkua45krtrastta3gcxwpefpemo7t6pv2o1gdpi3mm5vo5v1gae66oyozupf6kx0ggqbpkfhgjvc64qtnjuft4y9pg3u9zbdj50fha08pq60py8lvb0',
                flowInterfaceNamespace: 'j43zykwm81cojioslpg527iez2dveff2x84ikt17bkg63r1aefvnhgdm87raxsr2a2ux2cwci8j9babhx0sv6n95xwg0zh2rgmdgbcuv418b3vt32olc1s9qw73n1k4bnwhhkpfkw1bwxylmvxk99lr51fj6papr',
                version: '3blrd6izieftqcrgj7zl',
                adapterType: 'okmiahnvqqdux9b7yoy2gajw8d6w0gbn0solf6mq87it56168c4n7v4hmrs5',
                direction: 'SENDER',
                transportProtocol: 'pogccqhny13546z2jjwg67m5yxs79p7dbjw46c4thi3pq24sismijxv45tss',
                messageProtocol: 's5eqmfwb92og72rm2f9jooqh9bmocggw9glrxd6nunr527yfv4vcxzz09k5k',
                adapterEngineName: '2hectu105kl7hktvd48h4acuerwade97j06mocn0ufrpw7buf6zu340i8hwdfe4hddjul9vehm8gnlicmw4yuz5cn23ituq8l2114i9y6fz7hmnsxb5ibwrvrnp4j0nyrirdisjxdefix8f1th8c0nc2dxc7a7rc',
                url: '0l7wjr8bz6y1953fmvmm0itnz8drpcq9dgbvqmxzu3anp0xvf5y4q33i40h216wtv48h0rmdjcdse2kwk4na8oeawz7xzfzi6wdz35woekzpeaauvzhtyay0r2qefiyu7s0mkmpb6tirys9a3n3moljc5qkvnzh7a3vdm0123jdaq7630d924gee5z7b35hhcbqoz6egqjqrbv6saaga60fvrxdvaz57q8eypax203ymvcrcxjwx97r9p7cayzcn628balaopszszr5s7lmuds8i9lxo5dce9gq19y2rim59u77uplaj8bq9jghz04hd',
                username: '24nunzyrl9g1c3susf86h1exu5gyjlu2mwyn6846kjd4i3g40o8fddwgvno2',
                remoteHost: 'brfdgqrjl6pp4wo9d7efxi7fkqcuzavb2ybhnmxp9szz4c0wnuu4pv7a8mrhbrgvh5iv2z796i8qci7frmvqebd8clzwpeqhtk418pkihp9uos8aprhafy7dgla2biqznhew4xunevbswbvr101rugq9kfd9z7qu',
                remotePort: 9380964074,
                directory: 'bh1uqqjh1pcjnxsqz6u290rwlgg6szt59uzqwilh8mgk3x46n8agy62r36clq64gh8nz7ra3vja0s15kq5b8gooroiasu9latbp5n28lmipma9ko5vh5aajf92akvufk3avfp77geuhlqrs8r4cdqf3wktsmiptj9uhp8vlyqwateuyja6k8xdmgjewx19yttqhcf467oymmkkgp42qjstpblp0uiabrwgr4lyvtpf03dd35co2pezsvitdq77qnr40mkmjecghht5997pl1mv1gcfllgbwntbi88ptmujj2oxgm9p199791fh7hjf2wmck1oh1ufofn9u6slswn82uc1z3i6uu8x2lx7568o297vcfij1k45cfkh2novl3838a2sjvrf9d2ijnqfbz0y4oj5v2t2bsoi8s196ekscm171m39quc1s04icsf04l6edkacmzaq5rjiufa1o9og1ydijfy4k6p5f6bhj5k6l9on8tf4sob5mz9cfiuzvtjkzk9i7ebkboiwtm2ucgwmy3isvj3nqkqbfys6vh0kk5zv2rs8zcc610i0wp9s48ilyoq03f6jmqkm39zrbm6kuyoepe3afqch4nhjdjrvmwwjr12rojjvkv81l8qo0xp9uzcqj445t4wbgqojshcr1ihtd2z6zkuq0tb1bnq4sm08i30cxefu0jdzrkvoxytk0353wftnc0ekasjgq0y3lpejdrsakd0effjy1zsbr05k5kurp05h71vjs9yv1uk9l6i46365ynlu0h8niskxufqpdg7d39gedke33cltlxjb2tc7q6ypikzr0wrsi181b5c1cu9eyy6ndi0wyqcbo78sykykzxoaihes7r4q79by1d1pfhb6b6ex4jgm8008j489u3v8hms3epspe12yk88djcqcscjpfgfg1vshqxciz071hek6rr83izmeivt5nro5udr8pjgndfn8uo38nqum5eb7l0capgs83ar0xeug5dinx2k3liekvcy094j',
                fileSchema: 'jevsm0am4ajo8qymvfi9ozbripwuomkkbo9jwqboo026himhvs5sgj1bn2fhnjhvejbjzua1c0wfzigwqyhgar4mowihiz5koj1u8i2q63ikb8ez0394sgdgofpvlkr8evxnxbue8jwvvk3rlfank83a8k83fthz2k9ulb080u5gleb3llc9m8jfok0ttbi3unn5oyibq9q3pzj0tcvjervs75ajzozoqombnsn1aok3sys3undymdceq9yjeu300fv89lurg5nwrg1qd8x7a4z8g8ae0xkvi9ui096mecaocsqy29h3ij4jbergg1248tfvqogowr7eepqc0296t8vcsyt9693yuid7htwakep4wmf7kdgmzkyi9hjlrkwiuif5em8zjo98oboa4gh8d5cjs7u8uby6v18gj3p1wa7dsra0caipjodr6k6899xhmkz4kwoc9alspahlrwx1r230ss1cp8wkpvl37azqyndjf1m51t1cb2yaur7s4mubjs7dnj754penoa1busibrz37z0wvhok4mtona62jzqn0yz05wbc54lzwox5gbkjqroh0t6lpsie8t2rk5vqw798bk32nnews760ivxbkjq6ssj1oz76cn1yil9yny9j3folafa2y9yojpkw16yys0nveu5pwkwl8zcc6k57k6c6wlm649j51bbadvqy9i7jfmleqnyzx913yde6iq3o1u02ket9zp1icuf4o5zkrtm7z4fl5evrcud73gu8el2d5de05nmkyzvs50z7exl8f32u9oildvzer35r9y1ucz6291c6beqk9rhgt89j4v0ipom4d3f0xuvg94oayqy7o793cz5t7fl05m2dpk0acqhy1nsm8fwvcx1btz679uagatan7uujkj9xndap2htdzq8vfb9th4hz6f4o3inmr5yn5zxx1hwm6yelmjb68ybwsj07eaq03aq17df4f42sn7asqccdkis5wj4a2ozemcx90bjz467ttl2ypo4z11xic',
                proxyHost: 'rr54q6to3agwivvtn4zptiqy1m9nyi6i23th4crysh6z6rywr1u4n8zxok6f',
                proxyPort: 2976253690,
                destination: 'dk63osk7a7fqx262v3mi9dg60s30p1gyo5zr1a5iu52joz3ujx5qd08j79d93l56d5kx63ab5s8ipfjla0rrcpbgqk332oev7uz9bnvr9qnnh1btjy0ul0k0q1168zogjkbf2rotbt8jczh3m7o59c7xlbsl53e7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '93rltx5yp76b2mxbqr50xswett6mrggwwrqrha6ivy48495uy78xbtw0ndjq0qmldmxmd2yi88azm6m8u1xs0ebmvfzt6un6uudrk6c9dkk81ik7jqgcq9gzzedlehrrzx35radf5c2ttgh56nca78z3a7y8dero',
                responsibleUserAccountName: 'xe7a1vpl0prcf3aibuql',
                lastChangeUserAccount: 'mmst2zc99y48wlm7hu98',
                lastChangedAt: '2020-10-13 22:17:25',
                riInterfaceName: 'qp3wjfi95z7fehi1cg0pytjicxzq6x4bfrgq3jd2ohz8ukcrbtzdk6486zkweepyiftj3yo76m1ovmamqvt1fjikat2692lquqsrvgtu7q0uxrczt43o8f13j3tyas29jxvuk1xgn5if1llj6z8rhpka7jfvh2ii',
                riInterfaceNamespace: 'ahcwqofpmk9wwizf05q8g1hvo1sxkhecvpb148b6an39a3d9y0ghk9vngwn4sgcmd0ar0f4hd93kefnfbxk9642rkldk1kpjgh6xkgpabz3amejw7fjg9ax2304ndvipfxfiq1g1eatdke1q5e1vxnh8tkajci7n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '36xtcm7sx6mff7nepuvp5wbrd3t7fko266mdu',
                hash: 'iiwom8hgjcvw4dzs1rbplm02o1pci2kx7ej7v4oe',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: '9mnhuuu00v7gdcf359btr0lps54tfoit59l00ss2e4rib4gfxw',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'lm1tsg7szsqamroekx39',
                party: 'jl2z4ac6i3s1d1rb619i0efe84fr9we2j897l5nz9y04fldnoe69s58k4sga96m13qe4b3jqrk6qt0ller7i3gw7w774tlkipyf6q7h4rqfk7j8trheqkg4w9asx735pcxrrxhay1991phievb1ltzdyn3xwohai',
                component: '1hm57xgs55ks6b5eld9hpa8t3nh0i186c8mcwd90xoxb8kx8wu790mtdq5gnu4lrig9acsjnwz4kmam34cv0cvfdi0e9p81ezmatlslyzs1bpoimol44ot7cln45iie46cxr6agdft3gkk4mi105xkwx2wyeap3f',
                name: '9sp9pp4prbecfcotlt7nlh050i06cr4601wqayl8ls2sb2idw2n0a1f1apzyjavegmm0xy5zsyo6eb6se4m55m79forywuntt14ces35f7mj4zzybvumr3byxqoe6b4rvq7j9hpxd98k1s297skz8wbr4b6j6915',
                flowHash: 'q6h784eormgrkt907884yke7b92z7f24jawnlnd3',
                flowParty: 'fbroq9cjwn10dvwqkq58k7r1kd0vbg44x9kfma4x1doles13tot7hrjseh8hr25wlamrpqv6y0ayemdf0gpfspuj321imp5q5ufllcilymrmc7qvts0j2tbphpc5l93ojovvesobb0n9j08hs8yqtflsilvxpzi3',
                flowReceiverParty: 'a4kdekq3pf0jiuf8eax3zupomuaq6q00mqzom6ovj5ukifscvcipo8kc4gl02g39evpy2n6dopkixdyd8zi5l4728gj471ykbumuxzaoojrhyf8whw2t1mdq4liu7zkidvslahii8itm144wtlhhbth76f9hji12',
                flowComponent: 'al3cupjdebmem1r88qzfl2ytwba4o06tcockrgl4zjuttaa8oogmipujzxa8zbfqj34v7au58fwgyzfrir30avtdmgzcr3piioabenfhnpfte8hs82apmoifx1n8woowc63kasab6iduioan653blpmii1r5r56p',
                flowReceiverComponent: '7xcxlkubfvbmf8j9egy1ofyi0bi9tckgou5lz9pbwjqx5vtgzdcfocmngxpip6cmybhgzf3skvmbyeplsy2zdkrhh47o4y8wc3ijynltnka9piniycizab3hvzi7h5bxxy87t33s13c95o7jsbi24vjbrjzfz6ny',
                flowInterfaceName: '084yx7jh1q2ci3htasupgjqkdefdn2ql284sfnausx69kpx1ztjmdcyoawr63rhrswpcskw6698auy8pgx6q8s548gzkgrjxs13fg3i2onlutdm271t49do738toq11cfui8fg6brjbohp12jm2ncj9orpb91jpr',
                flowInterfaceNamespace: '63fbwh7u433i1vx08yq4lk77q1hpzaqkyec3c2p0dztvnslkdattm0m1u09jvbv4xag4683ceardyru9ra6as8guwq5gn238dejaveaptpzfbdleyyi4pbhsx31bjx29c5thwcwu2ryuwvk34rrnu7uqm9g2x9cr',
                version: 'mt9hv8l8d2ea4seezpk7',
                adapterType: 'ahl11iwyjnmgymt40sw7zymh2u743az4qlwyptn994y9rf9lmfy5zprxmbjl',
                direction: 'SENDER',
                transportProtocol: 'o3lqr067lqg7dvymaafr6x22vmtlpdyzg8ksgwwyvp6aklfeszvwvr4cye25',
                messageProtocol: 'rpx2xcf251ffyx556nnkympfv7lt9fm6j52ybxgq295bq4r5arbfxkbz8m4e',
                adapterEngineName: 'gccefn2bdfhked56sp9drh22c31tl9udbtjwevaa4obzq0kg2r72ji0vnipoow7scf67jo9uy47mu4ie2gyy26hbkdz2yuym0hcoy1fxmex70degcayeqcckv8wejuer60v01q2dna6bezfeurrm7uritaa3tpgd',
                url: 'o8yd3uh22g5tnbth0p4ovxjrc7bwdt4tv4y9gsemmlmi0yjbxfvhmlfkkysneizlcythrg6q5kijz554ki2yrczzvkgtmf8zyazxwfqr0ne8b3nnmgj1rfkawyfaidtc5dgp22qcrfjc7lf7sd26lh1pgw80uh6xm24qrd63mchnxmi4jhm85lj88l0vwlb612xrrv8b74z1kihfro4ceqj97wrqknymmnfdhxaglhk6iekemnprir9pu2lr3cf5dgz0yyvju2rap5tjn2yzm8x5o1r9toqc8ywexudc1idbd721af9mzwjvccbrwlof',
                username: 'gaqww26b8zb5wgh7f6nic0f53wr2xi18h54u9rzqufsb3ek1d76s4o3wt0kk',
                remoteHost: 'yqk0dk02mrjuvwz4a1rv9zcp3u822a8i5x5c932gt1x9zcqkbo3r8kxozp00wgw32vt7lqq1whswtjfniq1izfwre6e18ifbyu6ourvbpth4tntn4tjq3ubou71wx7xxjocg8sfpiya97tcfoagwqt2zldstqx1u',
                remotePort: 7363633846,
                directory: 'n7zy3vx6lqtt4bzddln9t5txu4l0zmnahalqa3objh8pvdo1qk7ey01immybd3ylacik0viq7lnb61j35mve8ltlpi3yuhxjknimfwt7lo7wo3t02ffvr2f38hq8zulgpq8nm6iuy9x60tg8x8fvrwivysux9khthr1i7wbicwwv4tlyui8q6lihm1itb803lnntg5o38i920ivuryuj9xtuueh2k5903qmtm355bznxz2t5gekdfwkg40c3csd0smw1tel3tnbfv1bcvj56jx77za22bcz2he0sax7sijidoi4255jut2tajry2npyj9qwylm07zsx31stcui6pp2h493qcew3icrouxqy6yhqyi6qpghf4ozr24vuuxi5iuf022mau4lqqby8vn03s39jbo85hrhz8qjyxx6bdo70m8pstuz59bqdgj634l9feqf3pwm1tzdf17vav1m4wqs1gecbkn837n3869xnmh4ya47gzq4k1q771t0li0ffcx4mkji6s5nwdv46vwcgbtmnlcxzbkkj6hkvhyuucdmopp1ax8tsdzpntnn27cqplbl0dh3en2xzs1ls9apaw1ab8wbehqm4nzdv2jhgwzez2kj7oxmcuxifyqlm2jsm3ufsueer8sgj7aasqhztghf82l7gzqgtqo07qgh8b9z8790rnny8bn08j4x7ev16q7d09bge16t9mq9elvpcnfeu71ja0as22w6xfe7cvcqop0g54koue72lgg0pwcdgaowell17hjavrvep8ebxlqv3gageesij8wywnpx1lz90w3do68mlemlwupqxc0x92suswm093pzjsav1blc85dizidvhuxgfqottvykyctnwc55wbs1ivoox89appphpppxz63cvthvl4kvxl3wgfml6zqi1ykr4uord5a9nyb7tv499h4rmhr3q410tgt3e55ih6jihcrjw7w60pdwel0gsdez3cj7kztz97usdoqdjhxxpoac9qb9ykh6hn3dhk',
                fileSchema: 'vvdsnjyx1mycn950psrjidkc25ctopbd5c2putix53g4cvvvga499jw3rezll4l40fzgfzi0e18s7phs2mbmuhlh9x0xkpbppd0ulkqzq088baxazueazmnvaggdrj3oqqmiybs806lqcy742noe0airlvv9gbe2l3qz19b4xhm0w60mmr2mklelo2punnyalbluxvmod03tic9p35v2bt580up66i8hjktzwpt91af10fjyf9x32qwdna7t130hby4j2dv20uvdc8rkm1e0hl4l940x6e8rvcf9kobff7fmo9rh9nv1cxevjd4ns73sku0d3hs1u5oyziq79ngs4bfwne4yagjiqws46ezebaoe0e658o4j7f4np90agth26fyq7ldfr2ckzz67b379knczl6yp1ei8w8lbl8fff8eo0kj5tq542gjawk6ufjnua3lgo2l9j5xfsogconpalishp3z8ftofnd1x762tz9to7fx7wbwp0doybpgiahyqc7o6sfki9klueqw0qtw4vaqcz9ee50ewvwde1ib7l6boburotky5or6vu892myhpkus7rly7gboqd4eh3ogmnc2yypg9ca0eqaaqunpenssymel8o704el59uqgynaua2tj117v2hfw95sa14275zeus33j1b5eotktet2xgdqilknct1qclehoiz0el1567kfrynt4uq8ao8fl3xskqvkuzisqsinbgbxutnd7mopv4hjf1x2i6j5eelfox9miiwj0q3jf0xxoa0o6a85unqajdtbxqyp449hu3g5oh7319uhjttoecrh0imhmgepoodvpl7ucalq6fqdi5loj5fzzdc8w0kl5m8649j5hxmi4u9oru3wbqjx0ib9772zaod4nkygnbl8qfue32yihqt941egxjz71p7mgs0zvabye2hasmz3b159nfq4u8wdpgbxby2fbqcbpvtligg61h4wv698u3mx9w1he2p16lcpel3ny7nldu2wzr1jd4mj47',
                proxyHost: 'yxzbli2ekkrxmut7c1wkogl7ujanvok1mj812fiemfzb4m4i1dh1pa1xgdd4',
                proxyPort: 1152148410,
                destination: '1vk2v5aavj3kybrc94sj4nnhmolti50istgjgwgwexm79sfocf5adlexbk0li4jgga4fsxnazw89hueji7xn8zgefu7ev2zglt8ogoitmr301sii8qihkujyo4qoictnpvq310pdxvv5inlmqfud5y154nkku1qg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'n17qozm7mmov4zc5wqiji4ioiqyqq7hheqnh2ad6avaoc0st5btqs8mnfk2egzib9vgyjnm555kwz9e9n0zt7uj1wq2oshyx7m8nmvj7jecokjtjwk4blykj25nkie7r5vniqsetfnvzgyvkrsdbt2021bsg9o7w',
                responsibleUserAccountName: 'b3mv7aksjv7tqxdw5naq',
                lastChangeUserAccount: 'vxa2ajmiysxx4ovfjxv2',
                lastChangedAt: '2020-10-13 10:19:31',
                riInterfaceName: 'mrbh5cmn42svtdcer0ccv6v7q77cxdzp7zt2vs4tih3uqgosvyg170q8euti7oexgw1caierjl2kdjgiei3zk5dbynai66jyrqmhsyhmubg6lmxeobmqvdja6ukuj2czxi71zg9vfha7lmrv45liebt1g3nxa4ur',
                riInterfaceNamespace: '5bfvi7jh2we59cv24qg62l09fmhff600afnmfrwkpamupr2q2vcz5j5rikjnu8fiqq4zh8i4nios58stflg2s285iw3xs0kt0hfcollx12ioaqf311lep6f79csrnigin419ijqgdoqodil2did15h27s3ii7knl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'n59d0aipibkdpb9svv76eag2k08ywotu0l43f5kg9',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'q79kof08b3t4y59z9lhhjh5ig0ij2r76foki4fz3x43bfmewtx',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'pwgm2302kw0brmlq34yw',
                party: 'kimqkevleswsxkiqge725ehbtzlq5glwi5f1ysy6amh39yvo1ai968rkwqfcv1jfyqte0slkxho3flu9jquqpmezx8ino19r1ashnv8xnx26pxpcbvuwy4sos0bnf6jw9k86se1vv1kuo4uwsdyie60vujx8olln',
                component: 'ixk8n3fkhrqpvtc9j9xzuuigs402q70aw0slv8gql1onunoigtm66u1js9srowvh2t5nps3ixktti0zleuvr5pylkp9hx9sjplerf6uuvbx5bvz61rfxemmla9qrxuyrkw5kuua5vgkq0rio7pvvtoci2kpnigy3',
                name: '8ig622uctc4nebwn1un7kthhy69v3l25jhrj6xvbwicz2am5tl2u65vdngn72kyibcrbhwqwj0wcjs1kuivs5vf4mwu1k4zth4z0xv7izi4bmjagfmsi8uw5i5la4p6umh4d6a10nxhmyibk9z6po2f9za3jp025',
                flowHash: 'zokyftd9re5tf8hkl74zt7706jhnzwc42pjl4540',
                flowParty: 'hvpx8cfl5bxngsa54n2m14emabr8teizv5tqeg28m505dhh0td147346ia2pacvjkzp81kygn72qv07efmore8663byrczaocb42r3rc3d9a4xqdocg7ysx6a4p69uxv7wtctsh75wpaoe3ee0d86s4ozr4le4kh',
                flowReceiverParty: 'vo9jefp60wsvxv9eas7bm50w8ks4wy1sk1lwkg58ue184ks1l0yqoynha2x4k3oigxpx55vmv39nfe88jpop82uxn33cvzpq757u3eduf9h5g1nahep672qovijpdjlb2v93p9pzec55tb96akp3wmxf29cu2r0r',
                flowComponent: '0o5cfmrj67bxqlxlgits5odd1wluv03n3p957knagsw3k7ywch3ocqu4ooo5hgy8nhnsk95qu01v9sd5ne6ii2zz711png2sjn0mykxtw39qv8lsjrrud28wf5mrkni2os3rbybcqhclto8wh0x0r6tcospj9ewm',
                flowReceiverComponent: 'c0w6bejm445ngdz0udt5m1vppckpug5kaont0fjhxy85sh27njnya84fqhpxamk2eqyarxjmt72jp8rvvatvcgnjth9v9w6n8ghrj7pov88t1lmnt8djf7msll2ieawqqagf4zf4rxliejec7bbou29uy0yupvwf',
                flowInterfaceName: 'c0i5801mdofe3ep2fu5lgu9toccj5hmofk407i7b21fmmx7x5dh9n1tweq6nfk2lfq7xn59ox2kkhfe636m4nfbpflr2yw5q2p2scbmh6r430tzijdzpr990q975glyuwuumj1n9gaaq9crzk5xr54s3clijvg65',
                flowInterfaceNamespace: 'fdrxyrjeupx0e3gucnhu3p2gdjn6ihzx273u19d73g6b84irro3npk741djk7rlujjw6bzzdetxt7qr98n76hyxv02e3rx5ec9s264xtady49n8t54xqwckztxgbdtjf0ivooaghz0fdd6y6eamtody9hwqqf898',
                version: '6gj9nv5f0ea5tkw19taq',
                adapterType: 'qfxtnzrisjluidkx4sc27v4zibn7dbly730nsf09f4fnw8b9d5prqwevltyy',
                direction: 'RECEIVER',
                transportProtocol: 'aidgf1dzrv1q3q4bxd3gfaamntpdt8ycwd1vemvzxtoho35ts02pd9h0g9sr',
                messageProtocol: '3ovi57y2o4bksa8ec83ex2snjev7qapra1j0jbwjobvmud8r45ntr2mhschr',
                adapterEngineName: 'k7eqq6dqgqh2f21y89yqmgdoc115868j1tbjl921tvwrnjjw89vz4zq93h798rwlgbbwtj6q8srwg51oiaieju77q4ugy5wpbtr88u1s2g5xjqq9gartaco46ry9x2f7kkqmedc4vvfau9f2ue4ekwzpc7zg4irp',
                url: 'hvezhhcgi1vgqx6osx8cm8yxa0s2qzg8km2n46nkti3q15uv3q5iemiku13244ia63jz5ihzve6c1w2xfp5mttr87l89co89i0orwju0yn28tn0o6j7njhj0ttxq1v8iaifubpjpcazopg09l6uhnmm0hyrb40olo9771r0rxx4t1gfd5yzpjk2gn05a22ewnkgrj4ul7jg3tbxz89lpqgpbi07fn97891ciw7c6ftbz0kcy95czjcm8zfsbqhiwi6r6rkao3pviuqkb55t0g0bec8zu0raj5yqb6ebn2sc4kv8t5sumvo2mvze4ylvh',
                username: 'avqkvxmqaxr9i520hh63unr3tlwgw9esbln89tctqs5i5hvqwecvskg1eadv',
                remoteHost: 'rnhk613o5ribev6ccu0cu5mju1dexhlxeykahg7exl5haejaw0oupllg3qaraphn45bvhkhjsqa4saii7ujv9u4ghdecfmm6ycgakhhy99i8us2cwuwo1w2vwp80nyz1flwi2hm0h9uit1zy3o7i4mjntrvb95ek',
                remotePort: 3901828059,
                directory: 'bggxdooi91zozqtl4gxk35givpmusy72jrk8ys9gm97xoyjvatv67zrchbzcbohrm874vp7h9fu35v67fmpahvajrdchqijpahzjvenib7h7ij1os2cx8t36fpb66ig9vr0adxdhigblnmygwpgfiheh1velp0ji2biben6v3vff9364iirk0g8v9vi391whiuuz44dtpea34ujk5a1qmsj2ntxbyms8mr8fuknliq3wklc5hmsu98nkr27ekp85gvwt8co5xhgj12762g52toy647rkp0jhxqrtlfgqzm02l7jyceugqw2ev7f7jzx5bhxce50o6feizhafatamlxvdmd65x41zh7rzhej2rzk5kk2xwk4ybaldoardo9f0whow1xhx344xc1j2g4zbw12mcbghq9jxhehkh4oern9h8mx2wvrl5b4a3kygh3j8w9kbev8kf3aoya6dwdrgut2npx0coso9ftff0p8gl803hqrfxwsmi7o0y5hl9hdlp5pk0q0jsf5mi22drrmg9oy3o8t37y6tzzkjm756aqb0t199z9wshjkcp7ftbt6gtnnb6ikdsr5at0adz6hk8jjw6jzbfgqqg5so3jdkydqspnswwmg8ql4fb9yqgmt9q04cmxrkazo6jqcdr77zwtfm9wa3e0pegyy88qpb3j69qlcis15g4kbjofuse27q1353xkoh7eqpbo48o0qtsgquvzi8h6mbgtr551fncyqkxg8jr9uq1ziuh3sk5tkd141wwyhoijomp44fl8k4gdz4kk9cht85th11g2hncivr8m41y0dzm58t04eipmabnlye46exa2nwyw3rux00ommu3ko9rk0hwqfgmz0jmr3skla3kkbdhehzzhcvul1ravzyqei2axhl0mktnkxbum4cdzqx0aedvpb11n0x4d1j4wgjzchhhzh66pjop1e5gwmf4dodhzy5ygzj504jim4g0jpoy6aasdng37f4jbaeu80miyoojvmiw66wzp8r',
                fileSchema: 'srugwf59g904ep5xn9c5kk9if0uiu96d0zktmrw66vlf8eltmsm61fjolfcbculzhkw4keelwkds45v5p1s3fjer7rhqr7mdc7004j4w2q4fbhdib9cc91cwf1x4t4rhspftn28zbf49t2et19ukvbh3t9pe6nhi04dc0hh19sf8hg07acl9kmmq2tqhzp9jyisftgwgdq71gdqunh7ocecs2jfyvhbhxbmyq5y385awc2uk8t8j0t2bfgqt70z0t17lnsym09dr89begsot6emm0yw7npike7oc6aamhc3tntv7yyncbfwyzvsyubu3hgbgdr6dbvg9ibsfdj409sdz1kme5uhcspqt7jw24tismjug9vhg39t04cyq7wzl6mb189mk02msp3d3xe0g9h7g06iijjyz8zm111yr0us5ouk4ne1dfg5l5p4c7jlsqoc7ogealdym0gsjixxcj1mtwz3qml3jf5quff7ubu2yiguwaf1baj24pziuu1zb53bxeff38qgf9gwhadlvhrhbt0eq7ed0bboa6h7shej5ep2wevnrlqgyo7g951smw77s68uzvd0kvqexb6puw27q4valt05had32erv9tgyqi8tfrcy0u3cehtel6ob62rcd623lifgy2j1iy3soc5fwbb9s9jc4qnzkgnud936wmw49zz6q6k89xurufrn3jyrtp2sd42bfp3mhbqooo7qevj1sr3wo4xk8yjcfgkqrd8bai2ss80z9to58oa5tymqto5lchucwbfwvna23roas7nsb7nrxapeohl9niq257a4fhyfonaet7a0nidfq2txphx2aiyywgoi4ice3debd4rrtsjsqb6ajd1pbe0r8ukqxx1ttv3sxt6cdm0ab62tp7fkcovcp2hhrccyfa5dl428cam119xghjn1ib4uitlcqf6erwyjpuv0cojx4cw1dr0qi1saiklik7s2h6xhp0nv2k4nf2t7ns9e3qeqzgcoua24hvtdcepmg07rv',
                proxyHost: 'bw1moxhvwy4m1jr2of71lb9lycvelm4obh7usou2pp24fkwnndwrlsot5s4j',
                proxyPort: 6558308263,
                destination: 'nquauwfv0wwra9mnrdxratq3rgfrnogdsv5sxntf7ww2x1imoex82xj6wme39yg2vkub0vjaucj3eaio9q4pxxyiyxmnlo2eg25md7t8eq9vrcvjqio7eoh0ps3qhfcc889nnexcw5z9d17mv19lwbp9s55r1e09',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wvffapl7w6nx9i01kapih96oxz8v3c563o0usey9s0ggy2t6ujc86xxhoryduerlue6afqyc7mrr55q2stbp5hqwvs51a24rsavknhi4i8jrtek6r6lrsmcjuf6lu5vafbp1t61vl0e6q5mt5prihiuj5a6eo1hv',
                responsibleUserAccountName: 'ayva8citnduwsh08ax9c',
                lastChangeUserAccount: 'ymm8vgwt9rz8kx3im3ma',
                lastChangedAt: '2020-10-13 07:08:59',
                riInterfaceName: 'j22qnkclx6z4larig4cc6hgg1mug13gkn3zagamly3mjesokme7kb8rvoc5eiytsjacisjkwroysrpkme63bgnq4on2s7njjob29epy390u49thszqrk5r4it7mgl77kkns5vb98v5w6azw0h5d7du8wmruqrt6d',
                riInterfaceNamespace: '8u8hxqb1e1o80j2a9hq6scw7n4417yjbmu5jl5p7s42damaq9sk8fc7pcq0r0k3kw5svw2easwlzn925jxrec75xtayxmerd7fgp2251wmfz9przshrnhdxnv2r4gjbx98no2w9ap71ouasi4iylzltg830kgwrf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '5ke5ugfmvlyi5bxs1u14emuwb4nm3vh88icl4l45',
                tenantId: '7o12reui445oxhkp4rkfmfmfx8fn2tu57tavn',
                tenantCode: 'sfy1fy3rltr1sazeva3td4g5saylbo5kw2o7qxpdjs145udu38',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'qnashong5dwxltp5cxrw',
                party: '1sf0h41x6hz7xgorl7jgn5e55xpy2mnxsmjlhy00wl3xm1exvupzap91tvcfks5p5tkfg58bw65dxjrbwpysdnw9bhn9oflxji73h6us02elxubaqyt52gvsioxmljrb2f8z6im8h2ic0ero7o76u1dm9r88067q',
                component: 'taz6jf2bry1you3ihzknv14esyalwhkm1t2j3htbppacj3yz5nly2g7clrumyxf3thl7pegn6pkgu9pxzyfgkj9itz8415am17sou4hc4guc74i58welhzpl81s02gn2dm5duua7aig8cmsur8ftpvyo3w3cj6jf',
                name: 'yzxwzyfkk2lwpib752rylfoze30o5qxso80iloi1vippb364g61wlvid8t1ncby2v422dpox3mwdmslddbcjxymscnf4d00nq0yb9vwiurzwujvm7bgsisjqa6j5uuvd7r5efnehw8i2vwi68n839goup2f53gmn',
                flowHash: 'hb7a97dmqydamrw0t341vc8d5w5g4dwmqa5jj3us',
                flowParty: 'yzi8wytewb9w2u54y21die2rr3jt0ktynw0dhlgbxnyweq2xi7lq6k17fp0fphf8pan0i9vqenc48kp7jltdqh71n0r0kf6eiq5rb22otxefxzdas7ab547c34upipm4264tmyu1ktk63soqbrle0nk49ejvjgy7',
                flowReceiverParty: 'uvxa0twqz3bfjhdgd23y1z0e5vi9kdyukgshmzrne3fghdd4r9kok7gjg7db3tjtdq3g8i3gg5xyjp2c2516y7305zx5g90pf5mkub5qt6o8r3mgg8ns3eizrzck55h93h5j2icm35fqkgln08akldey61mndqtr',
                flowComponent: '4nvuitckp42g9yx4kayerim172f8rzevynn26t31ng4q19sa9btq97ih75p10atw507xnqvzqfe7vn2fbixv0nocwlb2djjxuu3a175wqtud6uy4j0ewdg0hns5p4peiisczj5z4m3dif96vs1tjf7cf3y5bd0jo',
                flowReceiverComponent: '7k1z554t3svb9n3yqqm27qsxks4iwwqoxqepk73s6y243opeeogv8ztvx6haq5caz4g5rpvao8m1mtxqplcxyn9kru90gfg8qze5h2a0lna5on4sxr6hgtspo2pzwzmoj01ravsl5ye0x2jv2ysbdnq8gfqxb82k',
                flowInterfaceName: 'ie9guj6n5qp3aad1ebybat7deswlnqqpfc2h5prtdvsepq2ryaiyaasv7ryonj2xncf1xl5oozrvilo83b8ehteqzrixzp23c238p2an2cznzxk74nvdsofbxpztjcozynirpd934ssxoy6f5vyh2ohztclpknwz',
                flowInterfaceNamespace: 'p2s3p2bhhc7g91ukdqj7b8eqvnns9zu756c5uca7vhwr3qzgb5q16ox6s0cqo15jzhcf3rgp267f6mzwafc7tyrpi4exzn7dq6ebysw0jfdwihy1j7h48gt2tnnczm1owt2rliw1n7bc1x5qseoacrs7j8sle7g5',
                version: 'my6v5wqunjw3qou18pl5',
                adapterType: '2cl27ozbqmfe9bo0xpi00lnrngul84x08w7qxgn6widos7x58oicjdf639z5',
                direction: 'SENDER',
                transportProtocol: 'o5rjjuchs70bzf2o9773jfri5de97e4bdnxok7chnwbs5rijo4z0yzxhrmir',
                messageProtocol: '3gsjjtj48dg1e9yrwh99fzsre30aclxpj0k61fvldjdce4juzift38zpyb7l',
                adapterEngineName: 'c0yqvcnzi44k2ac8wb1zkrrcef53jjutpmphgscxy85jav52aozntdpretgl9sw5wteaebvah5b2sl3l3pot8odhbu252okydl38e36m2yjk2mq4nbi084trn4gogehanyokoahtxh3la6vd02ldttldxtz3jdhr',
                url: 'seaxf97yeptkq4h372ngp1dkrdntfowib0x2i8hr9qauel1ehhe7us2mf8j0j33hm8fbhpg7jic23rlmoj0u3s66kwodmyzs0i78bz9fe30o3ix3jkz3xj9paqi8ncedsaq70hbg1e5cnm3y3gnl39z7jkpl2xe5fio9u9o4rg1xiu5h26uede2s63ow7l9s165we4mq0egjhgeldscc9e2gsh6t2andjh03m9h8yan7opbun3jaj6a2cnc9622p1ac1oerg8rfclhka82tas7gb2sszivkogao16su1jhsyxjh745h35zh5i2tmws76',
                username: 'cle18pz5pjl99gc99nvtl72w0uezss8l8owgat3xba3xdlclrt811jpont7g',
                remoteHost: 'j5c0xcdb5jeudpybaosijssax5nsq5ao2gfcs9hwnh5yra70xs8o08o93sbj3h2kzuof4qof1xsosny6vi0otgis2gtli3aribdzfcbe7ccj2tggt4nsioeoke0sn5g9nj9xox8ala4uwi5q8ij7c7r52fwwk2ky',
                remotePort: 3501287192,
                directory: '7sn1ylrzpeihrxtme5fy90gxebbzeegogk1alu45snbypret4hybcto37v3ddssmirafmu6yq5r0itz4yn5glzlcpejwj4j3p6jpm2d28m6lwjjc5b89qarcvxo9c4t9w0pqtt6v99tp6es7up62d3enktls1vq962r7gbxul6mtq0gpilx8270d14rj7xlo3j2ddddm58k7oh8caf0ry7vizgltmjxpy4w9p2c0mpoemebr6yskn0pwj9mpxm2pglww3m1kv0b0h05ny20nwf37dgr0j4iy7hrzngh1jst9pyvobqpf9kwn0h0y6dtc7mgcgdgzt3wjm22q3b5974lbnqz2w11y7ajz6cwe3kge1quljeqp6r9aclnkcj50yweg8evmpzf8mmtcrv18gp0xv1yoo4a23ksaiw5g79jhd9c3mtbyeomibhmguv1mdgfrrwew4swi3xz1tdt4oc321s7dxcm7cedm4uee7ij24nyczpw7gy2tmnoaf0cn0yi6kvm8cb28hyimy16jqndj7phqtkkflk6k7x90ovjfmeo0zhznccgcbmbe2xf3ptmhj3psfqgcihbq72d0hug5shptodso0hgc76bk4i3k2xh4xqy679t6wvkyim8qxjf0qmtdq4qq4o47hhee4ks8popqxkujevykptu9970aa2mp2u0928xwh3x6fa90n8xew9g3s2n67jkk7kwrcqegat9wjvyb2acs0viovi1u93kjfmgsno5bwbieuarqyzk57wwqo62jlkiusf974r70pk3q3ng3j9hatpv2yh6whkct11ltntgnmiya8ezp5u72gvkj6g1sr3jq7ll06fmrb37txddwzaxwlo3l04g13z6xjul32emvjs24q0n2w34y2x2fnm3eumrwf8t1669del4urb5fw44xvj1c7kx0ldk1n360tknen0r5palzfob7g9f0rb2ehd2hsj09nydytd0k2o2g19cmi9rus6t3k4e9kf551a020hwvdmwb',
                fileSchema: 'cg9hw5dgougv0ttq2690d985dpp8y0ikgfd4eezrydr2s2f1scp0ugvudflqaw621d29y0icgrqh9frt7n4nbdgzol9feureeqp3y06ai9key9tuxhuwrf31yih3bpze8vuhjrrvtojkvf7qb5a3ei3ab8qwkp35h6vpkbecl9ld9svub8kk7y3xghw7ob45bqjhlorwxro5vj2bkbr1m386pc4ryf4xa0vvx3w48hdcvj8wxb99a71nenam6nfybh5cfp9l0zuacw13607qqkawoznibftjnw27ssl857hayqx2kfgjbzs589dmu2cxakdootcyrehgh034c0oysxpyuzpv7k4qpxzc7isubw7l8mru9261xsz5poavsmg1cf3xudpfkaribgs4ummanqs2z665xrpkwdthkm69rswrwh6rmzk47ha1vx6sawjeuz1domiijnfq9s3dmqk7teqzwhzfmthm7dxdn6gi3f1kuil2k9xcti3f7vvfrbe1dc3rhjrt4ulx4hk8citldnfxp78ko8wfkhbtfm03c63x3anbbjmsufwezypjaqtbbhx7dvvz3fnfxok0nodmkwazg8tbszwi30zqdqx1rbmfuw8vgn6j8201feamy08rxdevy5v2atc9h9mplw34ird7rpumz7si5063etjet78kofgd8z2ottkif3wdq8s6mov0gbasvkmh1r7u3lnth1ol9c66vlnv0try9ubo6dx2gsja2jsd20vx3e3kn1bmzc2qvs47ou88704ssw5vm4hyrukf2f9qbh9zgtlrlx5unipvu769eycbxvg11nggshko8eoo7ivku4eglqeydmlbtnt32ypbjsorjij84xfonv5nr1cn3v2aym9g441esrn1k0qzlch8m5rfniycta9t2ctyt40mvw3emftqju3ecjix0kalfytau7123kjhfatzie25ogigicsnw4cl8xyg2k8zlztsqei4kgqht5n3iid2hzbkymnm4x8t39fn',
                proxyHost: 'aiqtken1n96sdd91zp9n89gu1ez3gxmjgmbno6p6jdl0yv9nod1gop3teux6',
                proxyPort: 5749069002,
                destination: '536jjd50kf8glqh9uw8pxklxym3rgz8jcsr7kmrx8s90q2c27e623ulnufxccc8yqs5xj9gqwsnwwc8ujubwsmwf97d1hw71qej3pj9wd07fz88gylw60wxc5i17jss61qtodm1cgm5gr9w6pgz6ut8x85jgu17r',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'or2yveirhaoecnnq2zghh35g8u6rxfxhn5vu38smvs0lqh07l090k2u7wovb0jmhitgwup38ahbkqpdu4t38xfk3y79scrzbalvaf12qgg55dccvpxyq9ko3sf97ehjq6pprro2ganphci0evl8u9nevcke27wo9',
                responsibleUserAccountName: 'azdo12949r37uli97tuu',
                lastChangeUserAccount: 'pgwr25mcegqr93mkta95',
                lastChangedAt: '2020-10-13 01:47:49',
                riInterfaceName: 'j2lqgv7s85uhk4tpwvzvv2rvmz9759lw4s3967te1bltuek6m3cgjq8glq1s78zj5fm3yhajjxtpm1zecwy0mripdcs5vuz3p9bw8p3wz6q6ay0w3ci5rnqie7eeqztdgsf57u8mqwrdkxioyxbnkp2fg3ilgaly',
                riInterfaceNamespace: 'vsmnhhylwli43y9jfdxi3zrblres5f64kmiz4snny66icwau6aijznbkd750nhef4ew41nx4lqc5dezbmj9rcxiopjq41xptatohor8ftq0iegc2moun8k0s9xxe3h09jsb771aqf3h6k5m39xy96ce113fsoqcu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '8sayihdj15t5oy9ec85gz4zld3t26sd82vldmiq5',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'yabu0uaga4zyp0y7gxjiwjv6pl203uazc0tu3t6lujbtzdroob',
                systemId: 'zyyb9aveqppb196bezycbyn65a2gz29nzb5aj',
                systemName: 'y18p4d7tlmuq5byenive',
                party: 'vk7ldlzz48iowqcepfsf870vt3zpmgsctzftm3uivlmngpd46i98qkam1zi5uvfcwzohjoobj910hry1khipi4mxiog206u3l9kdb5tct7ppcu3u0yx9omxbs7m5im92jlncs7ymx9i4vckgmjqbjf0qysqbo778',
                component: 'trm9tdkn4ixw3f7h4czyprw2u7cokcmro6ky0ob367a16f3ig53y2n1585rwloxkeit56ylxm0mxase923ic17p81ca58mia67i8xdynvo7wthufu2074jvhdmqqb8isl5mbz4zqf6c50289oa4tbc1hcrw5ur8u',
                name: '3ojsq9zqneamhi2fpx6utazmumlq2xbwrow9ei4liqf67g8ssyut1rk6hqo7gx7r1mjyitcre4wx2fncedlon15tw8etkpsxcerup0wy265i3001zl79p4kumepgouly8xh6yvdhdiyrcgoogg40gjf84v87hp6z',
                flowHash: '5zw0vfh853h4v1kndc89bjqc2c3z50i315k0ufv1',
                flowParty: 'opfg7rsy5naxfv3bh2a1tao8azai8cvhblea1tu62v7ks9jahjd8n6w0u6lu56i7u21e5fqkad5j63axb96bbvkdfc3p1c6df7qk4mfsi9y9r7v7esdxgywmrjy0ox20hipv32mfh1k3v8mciwnjor96lv3awfhl',
                flowReceiverParty: 'um8prbzxmkfy24y4opk1qpymuy1s49tb70pqz0m0a0k2alouaby1dghe3651r3c3gszf5imxdl4ijlkv8pp8drr7jnunf4mhw161g52qxk84pb0zqehrrd3avdp2va4ojyn0s72nnum7shu89jegq8wlt0k573w4',
                flowComponent: 'rjge4a23wa7rwd0qn47rqt6c27ana7by32t57rg4r5rg9051cgsrvs01o4mq3ul2d30s4ia7mc8yq2adlvw304oa9zkcu3pm9bwsizifbzjj6h8wk6vj2yk8gj6qeb7ctym68e1wdhkkqadfa4v5lq4d9hvt53hd',
                flowReceiverComponent: 'q61v11x14ebhndqfyi3x3qn0bzay72kj5mf65wab8i31ilr5jdgvqehitgq0v3esi5k3gmhytc69i53bsbenob52ssqk0ntslvanxw0c2fto6x4jhq4kag1zf1u6czrlh7cg8c70yb8xt90llo3qh263kha8lmyf',
                flowInterfaceName: 'olkbqfmthaz54jyb19jtazxqn8oeyfgva6kqafxfpsmc8txviqe7kurijvzoedkdvi55zlpr0hk8sx26ttww9wkh2yhyh6bhw4t31ypukzyl2ljh8y15vfx7j1qxgu0g9y7sou5x7xoaq5tpqb4dm828lcf8vngw',
                flowInterfaceNamespace: 'jmxk5gmjmglgjxat8f5m6xkt4iwccjsv1k2wa6dptz88285sciakdtiqy4zfr18dyebjjxzxefxgseasyxyzys4zq4g68q8mon0rfinp0zo7msyquojndlvd6x32fyzq46q5zxtwody0r7mggikttxp9z4rbpc67',
                version: 'm7tw79y1k3bqjz6sd6ta',
                adapterType: '1z783x63f48aohd9gpa383qw0ry8napbi9kd1y8pwadp9innjs8gvsbcy9rj',
                direction: 'RECEIVER',
                transportProtocol: 'n52imqgio6f3d4iqfm1vjctpcfke2owrqdwkwhhb1mveqm4u3nx5nti8rbmh',
                messageProtocol: '5hhkftl5cmpjvsszzkj1pv89n76wzohtpq0bhuaqjldwlwd03jkvjh0llshm',
                adapterEngineName: 'a0k9bvb7o49zppliwf10ivurscjn5lumo5eosq44owoyielde3a2jp4i5rfllpit68a0yo7kdfk839eqjoftm1vozjtg5j7g21vcnsb8teo09m9ymbfcvmb0mnmtfkv946304n2zic8cbwwr7yk7wa239phuk66r',
                url: 'tvdqbtrg4yrui0nnlzz9so1ajs5ehcbshr3xxitzak9wy2nq9n21se4j38d61w8alo7cqqhu4p4b3udgk11icmsp1mvyztab6xw5cuw5ftmjucqlwtrh5m991tp2ununnahclvzbj3yp56o32l2jdlheviktxiwj1yyxap6tydsmymd6r6guefacr9pv1n3yv6d2i4ktbedc4a4jjuy8rul02sd2nvg6zmyebzf38r9pi0fp3b80o5jy38s8abavzn9fr241f5693sa0k49lyiadnexr54ae36o7njljadkoasim2sv2sj30ijsc8uo7',
                username: 'wucmg4v19c6lr1ob8cu756qhb2i2vp6io0poo1rd54kmn5aov7312gbuo1ky',
                remoteHost: 'avxkcraf38w0mtoc9i1s6lqylfffvlaar6qnz4n7mu1pynhl2b4ob4rczms6bz2pbnmuueqo7uwhi05j1i9xpdvckjyijc80ohvkr29ntwearz4qxf3jgt9j7wj76zklg1wbbyvwo794kbg9lnza86p57lcrrv4c',
                remotePort: 7492503594,
                directory: 'je2vik31j1ufmk3to5v211zc9vga594jdfqj0y1wa4umhkzyvo79ig3fvrjdyr8huddvlmldqcxp8qy4cwb56otf3uuf0b98sglye3hehdo8nmd4oxuhdt9rg21zeejl70x0od802ckn5nebk4m71h4z2khp6fh7gitsk8mcehuim67ftfrc16t9sv2s8drkh4fsg68tnpr82lbtjdl50oiireddx6wkwtam2lwnn7kwvzj881yvipm56aofoy1o2r0oktloaioivgn4y435hop749z3y027sa54joiimdyvidhrjwwugljhev4dpbafzbmgzpelyacf9kxrz5f2lubkwj0jilugywqqtqkbk0e0mtjflva0fsxiuitrrdjhv0llfaargkoiw70shsjujz3jfptwtwgju0jd5hfvxc8h3nbs6qbgvxri3kxni21qhlg4iy27wv5szwbsnvtuxcio01thk7c4l03t92uwbsi0bta9pd2vdci425rke2nxxsj2t0ug5fro0jz1arcj5bbbhehc6u015zrrtsbq5idmrtc1i1ohdqc9j067uh3xg0t3dx2zihom7w495nspkubo4wghm9fscg9tigzff58i72hnu4ft4p2hftbbs9gep0k47qjtbryirzj7kk19sqt7akqgttxe4y1drekld75ocblewapi7p7ydb995cl46z0rbzzuxyg5mjcy3lfj3oacq4uj1q7jdp7dmqo8n2l8lxh28c4vku1svrn2k0fyqdar7ogb5jja922pwm9op5dw10upcpysucpc2buhyjkmcaic6gi897fgzp40smnte2p364n4ieuv5ndm9kh05hd40lg0lcybwl5fzdlozwwvfj1r2i3hxys8p51wnnezqp9843q6k77oiefw8vpeb85dxu6tkiskeiitbat6s798jmed9r9ptba77ltrbh1klpwhsy6ots1ajkv68kbepv051yny3zj5sa6hgnc4vf3eke9q9jue701aexxblb57',
                fileSchema: 'odt9rph9dhqwtrkhsplii83gg3ny9ccat6zr8i5fy8d7v92qxixk6dk5g8frq333ce8jrlzatzfd0avbp7qd8sm92jcu4kclr6kjiygxvkqfp2ec6mjfkbt44tvervoztyy15xsgzoblcv9msqmf0as0hhj051zts2l5utss4t5iwbrulhig35zmy9hiczkqm1dptpuea3elzo6yzaqaoenqktv8kzmd47wend5kzckphz76f1i89g546y9y3g0x64qd5iiqqz3im116yv0873fqolh7s8f038xfz4pu381unfsqonfe08zzrbahzi1gpm1xjgoqeemw8dv0o5doeteeudbkgc9fl2r6w1ye6jio00t15zisrn3w3ecdwqgnqlahdnbla44jwihd3khg4au1bhvraf7i4nmg7ur7e86f8nwobggu5zd7qoqxp9tbccq71cwollw3pe3t38z3cg7b4fparmxrdiql2yxmn6ethz22g0zap636c8podx3g908lbe29dkw2ub38utc3d4fqgaoag4wrtka2uzcyrdks09x4oeqqm0shuo814v6x64ye8cqgx0j4lpbb5guvr0myvay8mw1ucs2uj04pikgc9nusji7q6kt9qp6wpu85hk699a9c4v8cgiszrh8ydqclm4oyy11qrcwob5dakwjawf1xf50ld75jagnj1vei59x30gmp6q8jm90fqds3sjth1abyedi7ofe8sdedcwih89cg56s97escopqmg00t0wn21smt6h74c6s8n45vh0ibzfzn945ydo15zy371gwp5k49fhqwifze2ithopw0mpgkm0st7ww625p4cirlj0iuqssqov3wssr35ziwcbnjxlqyiqvms0ebw5nq8f9c23vhx0s3gdes4ir4f2a5qew4wxgah530c36vhud4gb18v8cd6lz1gh2kk39f99r2fk6t00hmd0a2ht1ftou90qvoqu52l6t10ssgdmm55eiucofm4friutobimr8o7sl',
                proxyHost: '8e9wqxin886i7lbacc4gwjryol7dsf1zz6djblxbbbx9ar5p6me4z55de7gq',
                proxyPort: 2593705830,
                destination: 'buisp341efme2zwpnmyhim27hcarenvaklpzd8iqsxt5xib0cgfk0dnri3cwd5cmqkt3f7yq5k0oqjwydwv77t36voo5g5vacqj83q6qnjsp72qu0uic0myliu8e4uo3dpjor4idnfzpyk9a0fudu84hn2aa17wk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'l9t3axc0l4seyo7f4zwvelahemmwnbe3ws2mvhza1qlg6mk65jdjx44d6ujxwukjokb7vuzwpx3uksje11eiag4kwrdus427hqhisi1y7pq83iamxub7c3bep8pdb61tl7v4yksden6ndztp83okt750yqclwxzy',
                responsibleUserAccountName: 'dvdn7ol8mfkt7n9wg6vm',
                lastChangeUserAccount: 'yc9nod5ynez5l6wofrxa',
                lastChangedAt: '2020-10-13 19:50:23',
                riInterfaceName: '5j7dd84ahknyo31kjp7mka5rfspi89k4rwzp70i1qlc86rcjs6m49vbli6ek7vqorl882ez5ju0bz0q7o5s6022dnwe3kvbkabozk4zv7frmv8kaguiklertoxd8y3zw57uft13kjaph4p4ri9rnbjns5bsprgni',
                riInterfaceNamespace: '6xmyhfl1usg59wmu4zkjqghfagrjru2edgizn0mi8fzbzo6tcikyakdfuz5utlqukudq7kd38z3pzrs0kv7zzw2m0me42g7zj7lk0heqjth6vz0kxzi9ns8vlh9dqmd0i3uooxwlumap19uj8ajeo2dqxzuk0rj2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'lhnm31v3hhcs2hcazudqfhljro1h4as5f1e5fy3k',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'knpgluj81prjsg055rv10ame423xlyt7wmj55rczelaocrf7iv',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'de57bcxeg8w1eps9t1a6',
                party: 'zn5qy3cy6oryljh7do3619h7rqfdne54bfjl6ntgm56ogp6sycnykpol5xjpr9mhed6orbs5xcxlzevlbbzb6iilyb5cfmlz1khjm0ca34vuulc0whfh43yy87kxzymriv99qmfkece41l3wh7dk343knzg93wul',
                component: '9iwtiyaabeecfm12cvftgkyv522sjd3bz6oflha9gob5rtzpsozzfm54596lbaeuj0g1g9t4iz3mx8fzlyjmdnzwgn4mhwusdtu9ucf6krw50bzeg29vwfujopeinfqnicqadx4l33kk3nnmw1pw2rm6bnvmperi',
                name: 'd9wmlfmyoeg53cqg9zd8lh7ch2pkt0iksnmf0c27h90nibfe46hfye7y7urnajz029giiile7zdmhha9y8qlxaefwdw434kuwawlw6kp98khpdsy05rw5z9dseuj9mjeje31lm4c1pqsiu9zcb0rthw6md804ycw',
                flowHash: 'dxhysfv52vixwn7i55amv8pcwhd1zi47k03aehyjn',
                flowParty: 'vxb3c955klw6jhmmgbtol8n2tb88c2tyukkn3reys9ri0lzud7x1ax45xp3sk627fzwy89o6a1hwvdrmkk39mmu4jowbuntjyims3ddm1jcvjeofejbq1382oicgxihirai23d33x1udca8thgsd3gnyerxy5zhm',
                flowReceiverParty: '77fxxnrsqf9zyzf4i8sh9fy6mr0r9wtrs7p3l1zsxce78ix82dmo67p26gq0m2uqrhb3f2g84sluyajilypoxt8nrvfznfbi17y54p3sd4v8y8m9oz543ltr4tuql4y2hbmgjktqqs167tqbv2nd3cg13agftbbt',
                flowComponent: '70ov5k05kdkq4ammayczuj5z29wjcqegceqq3vn8kb5zwqlhdvc99ui6e4dknqqie5ka8ycx1ce2qtronwk6237v07c696003rj94pp2tw74tmelevccbgvfceywa03qags0acki87azhraduc9aybaj33zv9m0c',
                flowReceiverComponent: 'dws35vnui8z3ivbv1zzzhs1fefifqhr68jfbp7rhka4h6nzpavu304zpp511maczqx68z1vnnolhl4ygnuiggoxow8r9xcce7s1x9s99riga0gjlcafermwvywx5xhnvtww3voit35mjfigqf2cvwt7yallztgaf',
                flowInterfaceName: 'dwni2c441cve2wkhnq4s0lc3361jjjolx4nnpfr718zdgshfgb6bicizqk4on0jvok3aw3ld2flmu21uyr8rfvkyl3f9gbvpi1kc4xc36zmzxvjjhd16mrty4tkreq71njy2z387yannhxmxzw2kjwqgcbt17pue',
                flowInterfaceNamespace: 'lsr08miutiadkffk73dhl46vnaiqeityqopryx56tlsidk2fggvdw9h2s7oh2zfishngcx2jvpq3w6rq43gk9m76cwmptg4785t15cbr98k4awwp2diarg6w4fg64x1t1rbb1spmp7vpaczdwyffvb9ivl9moyxx',
                version: '7qju3f1jbqwzyigatky3',
                adapterType: 'fa2hffxtffx36yhepsj7p2furxxzpluqrge9wwg2p26o7fpt1s952utafuo8',
                direction: 'RECEIVER',
                transportProtocol: 'b7tupxaz2xpaa6brfa3sxz4ciuy05z7w8flvlyd7g953j5ybin19yywqt88l',
                messageProtocol: 'jjelwz2fra206b7eaqfp4kzc1mrifrn6amemwnf6gz0hvladsd5etgumxowx',
                adapterEngineName: 'e5jq1e5opdsudgu55uhnrie22u60jvldb0dfnh62pvy6uokaia8ilodjccim01rcj1zo4bz5qbw8igzg1gb3arppq32nfvskvalwr41tfsttyzj7js8s6kiuy0cu3e1hl0rc2yrb7qemyn33pb5jd0i6c6qhf16u',
                url: 'ltqe3glxrjl0b5nder9at47wm6khehcxahd345olyndvfvz3av6sfv1rzxntalu5u0hb5n71hysglcz26kpjkvrtioyqxdlxcg3zy6ji5s01h3zy1sk5pt7gug8yn07ghmstsfut73gnjzvplvvy35hzs8mjan4joye2sevh2qgey2uei8nk3h1z9blvufpdr07k5wgabxf1qi3bn13rea85ei0ujt4cvisz5urm9luvwojvbz7culo30lddtxqil5oc1lzzuprxkn3jky5h700qxxwzb3u54qkglf65kdi7mn6tzwrzk6c3ve9vc8i8',
                username: 'iux9yazh2j27lw53afcj2kqqvpo12mgq7r0wuyii15luyvqrijfk1zamtmr4',
                remoteHost: '0jzkrlbuxz4mm3dbp73jqkpnz80l8q5xnyaqp9rjxd6ix7azymg794e99wy6kdfqccenbjjvq8utor9es9py62xgpdzukozxfvr8454qlzdygg0cm3ey3obxxe3zw3rcgpapzi8ffxmp4tf0093q2mx1tzq0pwki',
                remotePort: 9265400849,
                directory: 'wzp380as4uijn9h9rxy4xls38y5nyizllmqvz3fk461vbvlljgvr15fp0a2ooriqj32urmku20mv1tlhgxp7lg3t7gmjwrb1r4yh4luxmk8gil4slqvijzmqjd921pgo22rcj46lezfqxojz60o5odbrnb82x7ftvb7q15c793s9fuqzgdlwrtvj5q9wt917sglzcoeko0i8dxlh9spuk9npggdk8k4ee0gh1jc8kbohsl4eui0017j9a62uttj83b4udh7rjpn856bd3myygmj078tktrahihwh08wprk95nesmhthaa25b2k1sv150z9i5gfnv9zuvzo0elfj4eaxcsh3unbx0tdg1vg8t8nbfncncmrsmc6lev2hpcd1br5w1acra9lf0ma7rrbzjxlz7py19w1crhb1ty6lx6ypes2b6idrkng2o3rkcxvlvzw9ih9x0hxthhv07yzj5jij7pz1lk87g0i2x81wvnip8jcdr2idoyr1igb2pqbtfshwqojxlxiok720rke3mecxls5x5xq93rolcaiby98ateloo7w06ea8jeshe35vzrxyb4laid21z7d3igu1t4u23j1rkf4u6df76vimhe2731skezu86hadrp4nkgwg5p758nghrukrqb7ngptid92aqejlg1ut75o3j6b9chykl64j2pcjlflq4ad4yyngmjgqjwhvgl6l8c0xtcwy29oe1wcaq863ufh1p1bra9cta5xwxl2aldcj7fg0o1nbqt2sto9xiebdxjgn9qfyginbdri7nc1vdwkup3wpjosd7rv8t2vvwt9fs6t9wb2p79v0w1vgwzyrpx45ha58t10d7t0r4w69rx1ptrdeow7agt0u5425slpsuhm552bhp9sa11h6evyr2p44do7m2sft4lqp5qoowxb9cntzhsrtli3qub58tynerm35l51oi5j70ych20m8126vzj7u86wul3wdgmxd4vz4bcjsda105abvxgz1x392qun70x7m0',
                fileSchema: '15cbgt1gwf9lu8gjun7nn0v86lj2u8wfkiiwohnrc8s3npgp6kcna6h9buqh88iimpb993fb4yuu19wgt5zb37zxzf8ymdwovlyfs4w6n6l9ia1wbytiq4z3vfqjdbxdnedyry02rod5tephvx58axykzjxk37wxny72du4fle6opx3dxifhm38z5nmyoe8kr678wscy5zy61fwen8nmfsv05y57ai2yodp2hfm232a1zcm4peba3z46juwda6a1e6x55hi124w75padja9207ekdasvhy5q1bpuxex7ewgnvae0m777m8xy9mtgf97v4cy2anf8dkyspklolf9px2g6ewnz6e84xjtyospo0v0iuaz1et2f1pd2tlz0ekd2e5lemvnoe28ud93fewui47x1drf16306c35l0s7u1uyxyr7cno5xvshj1h9p5vgvh7ib60tsx5e0gclih0x0ct9cwmvl1u11envzyn438hvevp3du9x6zfxyyhspz4qi0d8qhdj0fs8ntqy4drnqbg87m1g5mmjv53skrnzhnbm84kenx75bxadsjqfox7b5vq0mmpf6vk0suvi7b1xpzer39p0fhzvzg8flor0zrzoie7aj9ntme9enrj5gp556hxch57noumz190e802vbsgkcsyouiiq4i72ka0xja3fc090wvrscf2j0bb1d2jce2vyy572gadj4eltylp9732erfyfwn4gb74od3mim6age6e3hp3qeinarwf0io3psxamq01pc6tikib259s1sdvq2a2gx087w4fny5gmgoc8g4wfgva6cb93zry07kyrbgmhnsata7su6m1ec7y0c5x9brncmmf5htt3ew6bcqmaazbyfr6wevitqsvaptn0x0fqbamevu8t3apn1d23u9ixtfnrk1s5gxt669vf5mm7eb8ozhwinu04w5cbwymyzxi20kz5684zy757h92fozb5e3kghb1bvqxf28vp2v419w9f1yqbah3x0mdpq8ebm',
                proxyHost: 'qbm81x99iumwquxflzcv10tp0fxw2np161d7z90tc5hb3zb5u39b1f6nbd1c',
                proxyPort: 5992543609,
                destination: 'zx3bhviz6x62xjji7ddro5i37th5js5h4ptqo9ud4quexpdpicsd0rbmoz4u15ylmkvozdo2ocz1qjz5yng2l3c6i7a8cazuqyamlwjt0mxxdpkokz3aqmp1oidryzyrldc95mkkbj4df24ruggebt622uag4j9b',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'b6m5gdvxzvfesyxv7qigvnoawvb3biozaam9qwkwlxxjo7hme8o65yka5b21lwfiqrujlexp3mmu05qhftu5kezskv9jfeerz0wv1nlpsjjxhs7t8t1einqq48qw729dkzkcyg57lqp57zbx7bctjqrewf9sv6ka',
                responsibleUserAccountName: 's1z19drb6ataf1tdoe7g',
                lastChangeUserAccount: '7nbsizoee1d6505ctqgp',
                lastChangedAt: '2020-10-13 06:18:00',
                riInterfaceName: '6tmo3bj7knvnqjuizrqusl2sk97pq19oa4sm20zkki0fo2yispew3tvuved8uka9brydcpc9hydxizj3dobax3ifbo5zd3bt0n9jnf7zjnuvpskbu9g3sd7wobh1zk32d1cpda2kg2lp7g8gyapykj6xzjr4sw8e',
                riInterfaceNamespace: '94lqi2rxvm3snhdcl5oqmgaijkwz7r9mqo6cbjjyjg6rzj313b6if45p7v5qh38wfej80db5p8agj67algn169wl7wjqqgihb0373qyhmvjvw6dxgbrpbaj7bjhy9fqyky7kwcodwuakwpn0elcy2o1wg329zan8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'pg4gvrq88wdtb8f4fs1vtfmdp2vfvdnot1xn5rjf',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'm6d4ugrvhgazjdsta6igb7vyxqe6ov09ij1lea8wa7xt7jvy3r8',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '7rpp6cjpml427b0cd4k9',
                party: 'stkz7u8wfe59lbvp1el10cxg8webqbuljrqdqbhqoirzjibceojxq6xdtb7y9bvxva4p6ro8d1uvmy4694zfy1bt8qa5fdtxzcnb38ocwelr35yu5v2jkh6wrxvnhg5gsg33681f2wylkh6jg4vt2jz0sbkxqc42',
                component: 'ju8t9upf6b8s7jfegsdzx8f7sdooeg42smqoxdj7tu4kddtixocjq2kjoi0f8quaumcsq9nyr1ty9iu6851o3olgpthd5rthbr8vevtarhg312tf8m1x6203ad7nwc0fp3jr2qiu40c4z1od2u5ydxitjryb64cf',
                name: '7wupb6wpeqhg22h2ec23xt8pzxs8isl7z3v42apqtq2sd218np0cu8gmn3ac91c0n79selyukt033mcwd22mcjkwqpc6xrdpxlrkvlt401diy9hed60iqr48cr8da3c7hqu30blydqqx381jl4c7feo547kcjx6i',
                flowHash: '17zcg1kw9tmzawymjkg0wasl754adihqfep814c9',
                flowParty: 'gcwd1pwpa4gsusu16zjbsgeydish1b942h6qns3p8cp33a44darx0wxzaksb6ietwwl0m1vuy77pqrj906497m0v4f2l5dvt0op6zy3s01lxqmyf2u00ar87a9qng3jtbopqvhi6fjs9y4vptt5qqpfnye41unzj',
                flowReceiverParty: 'tvzuz8x2huqic3vp70p5ylvj7cruw0auyjxla0jfbm7h8dx3jkncr26d08ndc4072uq6mb2dtbih6ig1cnamr22spxflpybehw2evfxw6a7axdy0d9mkgym9vpcsp7aewcxucqjvtgu73hwve5ptknq7z9t7wk7p',
                flowComponent: '9yx3jl9hey32vpep7p6vu4jqgo5433rnaqk3ca3l7oc6206yhfzwxl6mher03ao62zqdkmr5fkq8atvis2an2uyembdqvpdrx3cwsx3y9juby1js6dasdpxk4d7um15nt2uquod7dmstxvm3xjifis30qo3age7p',
                flowReceiverComponent: 'i5ythh4w496j200vc5yakkxehe4bo92dyew5wd22m9o55drcc9t2vn4eammsxxgrb04cr2we3gk4o6nsbmfesk5tnxgxwhtfqvl6li6f75wswfbyau4326kc8s2smwycqdslix1tmq41n1xvf9shyx9srwy1518h',
                flowInterfaceName: 'tmt9weio8nu52zjj7eaqg5d6q5ql53no1zan8emjzqz0jcci34bmplr1l933bx8g78yccv18lkzg7v7h2uq3dbwxo2h4wkow1q5hg08cuo6el7x8nh73r13fss5c4abaerzsg3s5h27bapz5pzjbtu2pwh0r5k3c',
                flowInterfaceNamespace: 'pgj0yyxogmtcmmpfohc3j0r6zrga1ar6edmctgq1qlw2bzyeiflggxenimp50d09sgdpinew1ip22k7tw5hx4oj8qefb5vlpxibgmsmkdedsyg4l4j394lrjk3gbgy11z6q90yszic8ydx8dlccgmp7sx0ytz400',
                version: 'dn2bqews5i1k332u2ihi',
                adapterType: 'lnqgqmo5uig3o9p6eb2p00gd325uwmh686bw2udyaj2te1g1p2fzxoxqfcl2',
                direction: 'RECEIVER',
                transportProtocol: '3urg5uls5bszc3vmc0dzpewpfzs7j58uvnfzfnmhd0q3viex7endzpl5ktqq',
                messageProtocol: '4y0a2fc02w719elq61wthf0p4gnl223awot9ikejvcyvyzl5c7rk9epn137n',
                adapterEngineName: 'l318hl7mrb4065gkxahnu608022n3hvmdxjqadknifp7tlpnpi6w6js54n5q4w7qktaoaygvytrumfl9nlzylaj9i3u2aqy0o526msaj3ojmkhwcgkexuv2ymv4y1ml8yrxy0qt6elqhvceg3fpz7ffhitt8rb97',
                url: '6omrtqizyl5vysp0crwbv48li2r9jb1ytdscgc1k6sia42jn1akpi8mojyjbm4gtl7rwm2bvy9dg1hwe67rogqpu21ayeuovcz895qfhezhyec7tml6ea424x13bm77ztr9upedexsb5p50k7o8l10ta6oi6swseiea263g2shd987wr7ngu77irqisqld2jt95m9avo9f8wiqecd5avwiqapp49rtwx5z4hxrxxex3x16zkxyr5n03txgntaaoyixdkkd9jbmr1sqgb9fto95v5blb75ewfassaoqzuah58j5577ee6pr369436voqa',
                username: 'fb89r5c418yqk9r87ta42ut19i6dq57puemyocajfpkicbdp0crl44itpq7b',
                remoteHost: '4su661dqnrse7mu2bmjjmf2bw4rl4dcn3yjb74ckt8q3bjj9igz9pe9hix1lf0vdwsadqdsmslgn67zcdfndqlojxswsrh26rlxt0zi4fmd76xl2cq98f82inxavi6y37movykf0vzhpz7vpwm8jkvtl13lnyfdl',
                remotePort: 9433186367,
                directory: 'up1g11t4r5xyd4dcax06umj9fjq46qmgzhxemkozqlgzodbfmhub5q85e5myt4guujftkzj8vjisigbeqbe4y4vehnu00y3y8hxsatb1qm77riyuxvrwj7995dg782hevhy68g65qqbb7g6iqiriczjzzc7b1bgf3id6v8i4dqi3yz2eakh583lvtemm5irvhmuzwvdssob3hnlaaqkiky5mvfc2am96pcgfcu2vqhew05l8raw7nwrzj8f30xq8hok18ostt7bzkzp00zbhm7csgqm6t1bkr1if2vkv4em141wgfsjdqilss8118r42b5a1de9wka5io7qun2llmu75v13obojsmrhjn1ak2gyb3sujfyg34fxile7lazp8eijv9ij22xwd4h5ji6oryx4q8chksmo7s96fo510ewpx8htq1u4cd9vjrx5r8erjjbp2aeuhsiatxbfh9bi3q2a8qkjjspvw4q8i9b1p8mi2szykswqc1tj7bg1nx3b9oiac5un9s3nk1zohk4qweh1fts56jnfly1hu002k1rqtd8sqpo8l7snav2ydnebbz0guwh4zgdx8jyeurm8p91by03jqzknu9leu3ovjoim4j6j6mp4n6ez8opehsp7qvhufeegtj6gqcnrjeylmtapm66b6g9on536y89af6kevr0u905ghgotq6ug3a7wmhhtrxv2lpfiv7amfeuuzcjelqqbzvwx7kdicing6797re2axoezfoyz67naefcmf9mzec4s1ocp4t56jxz5xgryouc6h8iwsp3qmybm0aift56kzzqyrdklpgijikippcnsz2k2dz41gnt740sfbdkbmtu9dk4zuxefiggggjdrs1szitl24w55a2ovwhayivy9d9pw5dke3xyg5ni1oh5zxtzg2lrgy2nocm1izdoxa0vznr1owroz2626wt7guzuay9ldt4zd0k75agnm7b3s19i4l0urnk88fy7zkgzkp5tf2r7nxnbocoyysz1vz',
                fileSchema: 'v967v4f8vxjbh8s5qlcrkwjr2t7lwshc37wtky7zk8s218bl147hglkmyr04kzst8w2exl3j657r0cq342xcwar5ycq5jk67t0g9jp2jcxbnpg0nris6hgt1n6x35nlhveszp78jpng1l9le0tha4lbzoks6ujd2rhatbn65861prog24ay6a6ikp45805fd7rmiwxg9slwxqx3m40us3k5lglwhg3conj42fxeqb5z2t5lbjl19wa8bl5oc4bmiunsmqxqkvufb3xuyzarmd57orn212qsyn1mjl2gwaha40d5udyia2gltkh6q5stu0v0opkutlj2i6ij4x1xdqjt8ticm67engocvnge1avel116skwvg2y5103xcnt1z2xec7m5d4qhonmrst0fn9h14yr6hpx1np1b50hyte70vliyr9c1f68yiwghtvawrc3d4w1cjnr97q8reavn0kqkxwum9a0mtmojowah2ab1i5skomjtmkrlmqi451774y0swzkcy7i5dubjxoxt61puedsbhl0w99vgcef2jpf1qqw5c0h6mau6ddfoiu40k5k2f5poqzbscayt9o574oi7m9iil85gyadhflvi4bfvuf35frwq89abjr0q2ma99hebia6zxy8lyf2sirc2sejgy3qyvtbzao0nru1ezehpoxwkibvod5vjbi3itc7liigwzdrz6tjg3hbdqke0dy55fxy23x2tub91nkdxdyjxpvvriyiiqu9h8bfkjw0zxbtt7jxz4ac7t1m3zz6rea50poztbtwzr13422adng4vkn5qll6y5k2htbhvlh56o8rctp40tuzzxfeih7jux4cxg7ow7ln3hdf688wlmqmncz22lpsdb2n96tdyi6twsg5ul8ep1wxc2i2xue6rb1mu6e0ow5e71c7ra1y3e57l7f0b7atjq15wqojj3p77km3hwodzhmr2dt7ks017ypny7l1jtd2bevfoejz3m7esz5dt6nyoovrua22kpz9c6',
                proxyHost: '35q7lt79a6y4n0nsulq4l12rzlrce5gliryv6kb9od3bg5c64fasxv67m95w',
                proxyPort: 8193043269,
                destination: '7tkga1a47a37nxp9kkoyw8nek5tatrk39tw38esmkzxzottxfghxk8xmmc2206x0hm5ku82l34yldeny7u1ftqia83w0xlnu3gc5hcfitdck6uupc4rm1wzqpgync1t5selhlswmbimf093ec8w5c5iostmufnf6',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'atkrs2vl4frc3i6o0vilohbfh1uduk5432pzn6buvbbj2q4m6fksver9ht7arkjczvkfgye1dpikqh74w9xtkd0docn3qk4qx1py7nu7aut6pc1783fb2060y2zzcg446astjpzcqbqsdjln3nd9ympgm1fxef31',
                responsibleUserAccountName: 'neiilyvcymznzfcftw5g',
                lastChangeUserAccount: '887rwwjvpnp55p4963qq',
                lastChangedAt: '2020-10-13 08:03:39',
                riInterfaceName: 'du5kttgbxscj3j1h0dpypuu5irgwga6z6fqq9w38xrnd0c46mvigz1cobj8hoo8tikr5p7lcvt7demc18czfbepws4chritsse3x2psnnp85fi93p5h1dyermnagbt6dpkup8bddrhoeaf5cuqrm659pkn2g4109',
                riInterfaceNamespace: 'l8l4qaprf22re2cvat51gq8txx11d6rkewyxr3ifbvnsmzc7u4bw3w6gbh7a7w0t4qlz94ogvhoyq3sjdf5xstl92zg3bs3icpv0a8uzlbi5136dggpii6pq6fhfiflte6vdy3v3qgt21pyclihic074cbxt44nh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'mnolo8qt87yhq8yahbfvv70osvyddw2o98lz2rq0',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'ubz9kl35iz74pkkwcy5xcl414q92e11e205tooxjzr80jdpynq',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'c7kzvhd4gftmlqhzer7iy',
                party: 'o0kmv6zuls4dzji8amr7cny6w9rsd2ajssz7k6chceb7r36zyq8uxok2xvgueu3wjjmfvssosj56cix3df54srwhh292b7j406etn6y58zedpbpoewpgsgqnxpxsxoanzqvpxiulfrdbkjkt9zqehkyofr81kc6k',
                component: 'wd21b094k30t4dsdu71ae2v2dfrz6f58ermz9li42lb7giagjpp9bf7otv6xagzrotqv6l4ko7sjmvorrxh3awb2559pmyy9xishqmq3nrksjuiebtf03edlxsxe9hfqt9esndj2bdtbp5nyn813vu6sjadreo3m',
                name: 'xt3ivoh9x2z0evir7njlsbxo236wbouuqb28yuto9xdbwuet8q8abfdjr2l24kai9f331mkdqcmr00bkw0ioatg3de8n199a4armmgqx3piei5s03k5fwc0x65epl10o4ab7g6jrh3ew89vrzga8qaknvitt0zm3',
                flowHash: 'unh5j03mtypnqprrqgr6wlfkno4vnl6ojv73adxf',
                flowParty: '7g2cpk3dcbak6pr4ouvvizth2wwt2m6xetotbkm8l726m2huqawo5aafyfodegfsuier6oi1uybwi0ipy2q7j3zr8fac7kvpwnje9snpbbz2j0dkuxp9ukjwplz6qdn0ry7t423am6cly7xqv6mxixyx9ew74wz6',
                flowReceiverParty: 'hl15rqhakehg3qdqswsed6ian8bun25ncad3r8tb1x4fou3h0swiro6dq781s10i8b90j58uxcnphllntn453bz3xlwshw8k5zmzqh9c1ouu5gcviyalfk1o9oiek6wsz3oi9760b03g3fxtw88aqbonyhwmj4ds',
                flowComponent: '7avufpy7giwnaa4zt32ij4ye83bm5us8zda83lr4u2rytmj3tarh990f7yigvqddburs72310a7sx74zqajt2asuh17go996yuygrcmkuafh8keardg153fi5sanucl186jvc0spdtuejsyibss6vmxalsnkyiv3',
                flowReceiverComponent: 'f4leus3uiwao1ijyj7e91fm7fcbc0g229k2m1qsbas3eta1ljrsh8813bsas6kv9pvxnzmaisptpawxn84zuljrru6wacrzxxf7oofajstwi2purw0nwcbyz3ia22p8ewb84e8avftd062le63b2spjv2fzr7oqf',
                flowInterfaceName: 'qdtys1scubxogsbo5x69skax58dyrybx2o313c9j67nmv8b55vmfori89wkb92srwc9mgjwmn1ascy256fahdn0sde0fdu46s1k9eeojtp46atj0b1uh09qszlt0bgcad79z0mhop2m6hxjl55yfi1ad5m17zsi2',
                flowInterfaceNamespace: 'rzt1uigh9hykwulcjndoy98j3ly87cvmdcgxjcx6o7fvcu66a8rr7dgs8hvwj4rwjfvqul3idghq10o1kdbkdvfqpqdl27doo8phsal3w2zxlkrh91m31b02d14frk4y2wm27nudv4dx4vk3p8pg0mkx11nerwg2',
                version: 'ceyhoa4n72dwagf6dk2r',
                adapterType: 'xlygx4wglkx0cpv0xgfh7jcs45561b3ku1ejiurkeadfbzuv8yf2ea8q4vv6',
                direction: 'SENDER',
                transportProtocol: 'z9ovnzg04cmec3dl2mnp3af5wylloxjkmrre0ejurpzr8sybqyg4br3jzafm',
                messageProtocol: 'no4y0l0cy2ndixkslq5pf1u303kf0seuzfy5rc1zi8ke80mbltungiym5mgq',
                adapterEngineName: 'pyfifn4ovaktvnbgqscysjl3fyg90xs11r64unbkfpg3y49j1aj44bs1h7svqtdbzn108nvjddhpmtls5sivq0gf3sbve8h3rhkc3ckj55bi0xqp7hcrml00rf6vdn1bcmhnbfxdo0mjfqhtw8kgbdvb8z3u26q1',
                url: '27a7syur98qnzeh6dxc07ins2k4e715dh66vr8vqnzaerep6voi2nhpluarxqfo1oerrlvi0vfuctun0j6ylincn213qfccmteoi0yxlxp33l99ithuejvt1ox86tl8egof5ghzfqsjnebosycnipwi0kjp5dw7j48jehk9p2wox8g59q3okmf7d2mq0lzjhy0ciqevehpwn6jaw4bgfeeavo6ji94rbydtgs8ylhueuc9negubz3012p1zaep7dditx1j18tlsp5uvhwoipz8vswmyk9whckibdgwsvseymxopo61zakvbuaoz75amp',
                username: 'j3z3k8dou2447aigoo6wxr8s5kitgp3w2g7czl38qreigg3mwzbyazzm6o6z',
                remoteHost: 'a7exv5j3cq5zkcv083700t3iyhb42tebi5bhs1qndffquq4honv1d17ckrt6w6sgwf8k5iya6mghry33llp8jvilkdqzr5cjqs24ql0oc86ri0o8tfzb9g1km7168d6jojd14yasok4u8539q5q8ar5aof8avrt2',
                remotePort: 3970904712,
                directory: 'gvgppr7lpc0yiq45fp8px9s9u7n7wy8frt8ezmckdk2w1j3m8g3yx8t8lsazl4wqehjs8wzqjjni8pm2a355pgvywowd9strh7traco5tcimjnfgzqil12f0olhlvn2y6t0mc1mb3nxjikp76i4a7stt064pwzym0bwei42zxtltm6oxi6w1siwpua67jdqowzs6950lon3kock51igzcvxl4t53nvdm4b7b1ph8txnelfs8gs6b5akgl8ol9yzwzymg0xrkh580yzphqg3ibo5qwmxli30jqhwr0pg7xjuevmghh7o4rgxr6gvnwr5t2nbq8sxu7w1hjrls3xqeh4oinro8gswpyep6xkr5p81m4kj042p17utzr2rxvgzgo34v4z2h76qxdzo38i84j711i8gxkwx5etk5bk4t2mykrqphh8dzofk4ejrdf67sob9eald3tps6xzv5psmdsyd44ugnm1hsp8edlfy6c6z2jmz70djajvd7yglaxccz0camoxv9mazmdqen497hpyx6zgknfg6qr6ufniok6ag3vya5va1avrc66i9yymc0lorj2ykpmxik7onleltkzff7m7w98y87jnvzpqkte6vrqqmlaf6pzdwpcjzebtvsspovf7goxf6hxqbvy6igmwcpfen6b8idcwiep6w8vb2gxjt55jh1ov5ozd4c20bu5atoq3xssi6sogimkxfjigzri7mora4d3wbdp95qw63mnkschcwwk8ple2n5zfd6sqc6qzyfp5e9px8pn9yh8k9ht9jik5wjfp0gsg48tlvueqm587sc9w7mi7fec7e85r5y10vxikdola3kdnt0onpezeki9fduzscceevs3q6njm094ihx3dtwmrsggzatv2azwloyoqx9nat7n3hnxmulpuvwiikkxe84ug8qweunfz6qeeb6fum1i9iuwfnf7fuk37yggyxupm2chk1uk6nthnag7tlmfcjgt7abw34yj3x1blrh1rvmvkxbpy8y',
                fileSchema: '4mn5xmewjfjek9ls8nd1fsk3fm755uk3xkeaycjz1icy2vy8q7nljyfiv06ne1h1o9r861e3b4n4udkwi6d3a49chbvipyupdbdb3hguv590wfn46w11ykw0d2z7layfjzovbrpxi50ehrqnu3hmzg8avh0oo79a0n62ln9o2byalv97ugeteq2xm2sdlgovv4le8es0bkg9mw4hjhx09jlk4b4reoe0tdyf4t9ukwj3m7119jxj97nkcft5j0gvie5criie3yy5ngxdwcpfk94yz6x9bdw2u22gm4je6pnmfvhdgwrnus0ovkcrjty9lj3ljd6nh8pjuty8caondh66b6bvx4g7zmsrozu1xk9alqbkn0o472xjg2jc40uiroefa0n3tqf567bebo4z7diut3m6c99uw0mupnoz1kw43nigr2t9ympf7gc5uu9vlnivqcpsv5dnn01te5j9rsp4zqqnuxwr3g9oljeowhuo3jketet6qqjuvvgxg06kzf73ibl1v9ofu16kkqjhjj7x431d78zilgrpqqpr3m7vm62vdtnoxjrep0uvoqpnycoxs5633suc9rl20q0in1bq3xuzcd21ppoycdcj0fsgnjv4htya0xkswdsvf1gr0ed1fwxcxd3dibc9k1v0k7astlvy737xnhntxzzwlbwkyzhva09xasf3rpozbgn4eb4edtjla3ws3nxj6v9zpihl6rth121g7kqm9d6d0o0unpzcx7yt8gme0cjrgqrliesnouekn2jp5279eq1d8zma9h52phaetqwuoqsp7dgxnnns37s8mfkl3vlo0wdoovuarnj5dpipuudc3bk920122c8grotgly146pe1p2e2wkxk58sbijowbanbwrhi6rln9o12dtrksdy0jtszye4w8ds38dj6nnlqpr1i3whm3bjgtsn94ko0wsjtlqj3dxiju66iqdsoejk4nhivwtr3w5wdc9qb3zi50b3n2fduivwiwy9s7cwxuidf4ax9',
                proxyHost: 'lyi3eb34gk84mzmp90vaautjtl92icmkjd0806qxy1etsbgeqb0q5srihxcs',
                proxyPort: 2539850336,
                destination: '3h98fdqrf35qmqrol47ea8xmn5ycoszl6sd6hf4fnlc3gxkzp10o69ywcfrs27gu8kmjl86cebg65a9mk2kthoeb23i4kxb19uq3wuqd0n15pkifya8o3uipmyfc5um9t6h6re97uk3xp3vhkqwio6hrp8hoyzyu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'lv77b6cttbu19mmalc2rifg5gsnxn6t1u0vx2k52fn3lv6ddf5jmvjr1bip08rltei9tn9nn3lkbabhhzne5j8jtx2shbqlda46ykjxw7g1r972ctxuhkk24v338eb8wy1ggmge20vp6e5yhxwfadz43pkyx3xmi',
                responsibleUserAccountName: 'c8kd4p4nc8rmxbhxbmah',
                lastChangeUserAccount: 'xwebgg9my9jit9xx9bcz',
                lastChangedAt: '2020-10-13 12:17:21',
                riInterfaceName: 'hkb4h6s34xlpw0xb2gqytwf18tchxie6nnwwirxaoy5rt6cezbl1x84abgn15f8c76tvksnrsau70bqwfdx6np4rwfx6v5b72k85nycq3h5i0gh3ps1btsr4nmf8wvnbgilqie3yww3iah0u9ur9cy10rplj71i6',
                riInterfaceNamespace: 'xp3mcbwxohl6g604mec8mnggtisny0nzwcsq5qyq2g5uusv1lmaughcf43p8vcfeenwg0g4g3qldsoouh6x2rfzek9vcdxe1e459mzrltbz26ovx8rkk4h0hrl0smbuvpu0g32o2einqr6ftfe1xn7llzhfssvu6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'fe7roprsctajpzacafhn9x7vlk8v28sm0qo5ogsg',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'nuf2hldimafe5c8m184kv2y2lln82jjzbdwf7gtjewwmj9j7rw',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '7r5cls8tf8ll6lfdhr44',
                party: 'p33v7nw2gxsokxzm7g7ony9hvy8p5098u2ndjgdlde3mhxxekoqb3yag9jb1afaub3rceqvwyacx1ap9ckpypgi9zzh6komfyoxjh6d8c9m08gpp0qngrlfe2sax1wcl5e7j399jhywx6a9c1tgrxaofkj4grmt4s',
                component: 'plcwqfn8s6qftvpgykqamypx9la0a3bl9ost2o5wowcmpti9qzywyn73m965pyfxbjdp3g4qvfw9axjn1sreqkgoiskn0ss5bb82vwkerwa1tbeunpz1w4psdnpve7xtopt7ag638bgvz34olks33vx7s4bz1msm',
                name: 'fxzpfzc7enggg0frgodtq3lcex3xw6dtz73kpdczyu582mje31phdp8gd7pycst9nz50969m8pu1oacituf22dkeswaq4m1bmgaeoed7ug4861tpjq8c9lekwxd0wpr8dicte805ipgy9xjomwlwtfnwucq2u9cg',
                flowHash: 'njpiytb8o3zslbezdfmh8h3p72esq68a77xvf7h4',
                flowParty: '1oslc52tcmwrsl9qlpdnlonx1w6v9erf83vb1xgvbnjmgm882s5k3fay6vxvrni6ff2q8b6m0ni8yy0m39ezc0p6bez63fv8yngs4h94ewoo9w6idcat305hlil9y88dvjo1o5u4ps4bf271ftl2xn5khapo436c',
                flowReceiverParty: '8a3v13oko7smegsxprrvab7zmghyrm6ah1cxd5rj2f6ysdillpjxcr70p12jvt98lu12o18ls2ic4edpuc7bn77vq75bpaovf4mmt8edvjfpeu69no4tkgad07yi2isgxpm4wdw52zk0w00uo4thi6gzt026fs7u',
                flowComponent: 'tlf54lo3gblv9wmznvm978r9i7w7dbfdo1r4crh7fya0855z5hkaor84muur7rebx6lk8dwlvdxupr2ik2wrcs07n2jv6scbyfd8vxjhr2qt5yp4nd1d92hecnpc9911mfax29s2smh0xxnjaemkvep9ugyhg9qo',
                flowReceiverComponent: '7ebdw7ipljqnbtetjqzkrmpgh4nj3hx5mxhm6hp2fanwa2w1ex5ra4gcyqj94rfcjsxgbsw9pvqgj81n9pvnixvfjc5aarbppffsbq4tz2mp3p8ug01cu6xfmkg56iveum0vj68la79xa1jwevyu0tm6plls4yvb',
                flowInterfaceName: 'xtaulj89v8qtnozouz3ovab0pcsrv5w95lwrza4b7cefn22d6lgefchcte986bmudsrmeyljj8pc9b8jcxwej2jowitnza51p02aojfki1hscj6fpo1fdl45smubcif1sq5fd3pwrg5iq5sd0cictmyzqr0oq7a8',
                flowInterfaceNamespace: 'pzqfswpxg4kxekbdewtt395wocr4c0cjzky0j9juyzw7kqowocrvxv5cti1n2ag92xlrdp7tldfw2qyt10xbzmeb9iyj6te42gq6p91ad4sejy80h93j2aj55981kiah06ekz631mumrj62ncpflzopqff57ey9i',
                version: 'sko34769r8xdfz9otthf',
                adapterType: '4tnk82lau6y0dyemtnzven995zfzev2k0hqsma3mn9noldv3qq37z3f68r7j',
                direction: 'RECEIVER',
                transportProtocol: '3puc21co0iorbw10pfah4qbv5jhu8gwkv8groq9bv6pdhqrt6tlezzgqvy5w',
                messageProtocol: 'k73hh8h0opdcjmwshuvaw631ct4mbfbupvtfvhqxq8bf8u3gfqq7l7s28z9k',
                adapterEngineName: 'tco9q20r7aihpf04lrjv4xnprt1cf027i2a3kt6p1ebh7vc208h4u6uewou8yh92r3zir0t2smo1rshg82c66yj0ffekbhh1xdc9hxb9upmok585z9ejabsnl0qqyjrv3qy7qmbd57ecacb5reftz7n84vmmlq8l',
                url: 'ygji3uml0dt8no5asaqc8w9c3gkz0vchwn431pdb4bkiga6e1o7vju5ehb3g8lgkvevo51qjv32rkzor84crs5w31vtnlug4r5pafjoz6q9w17tpe8esrkxzl3txbz4alm5e8v1b7fe0abn449v2yfwrdj25tempheep55x09fxo7yzwkjbfnrmkpgsznawrwbq65uizz9yy6ku044gvh5ip2lkjqgue2fabeu4idh78ont38zodz2hpn8i93o53sd0ffkeyz53rf0qoflo6o75qrvexj96tyu7m5at6igc2ovolpr6vjt8cxubjpnxq',
                username: 'przv9z3rlw7isn4fiptq3lv4hwz1chpp086tyx0v3o9hlvukspkv2vn5vj19',
                remoteHost: 'emfrm74euqbxasmnv9u8xnxmfuiikriorce1a7rvif845omyy293m5j4j16w0tfe5q74nmgy4eu3f89igi671xkuo0t55ioypdrd0na3z2fi3m5vb15950xspi027l6sz7djllt5ze6m7w2qhamdjtbcum2bpi1d',
                remotePort: 3908978803,
                directory: 'y4imb8dtc3ejzlnmpro2ksijq0xibii3uqs9ikkr3bt5t5g3ovhwfob0drm3w4sjp5up6hb9kcqlsp535y20q2agszhjyjnua0hmtjb2i9jvvdi2xaytzfk7x96s3ptbwkpkb6z7b0fm6z4elrxknhe8oybqodyy4i4300b0vbusfvbd0oy90n49y6m8nur0k41qlhsog68nbs9ikn4gkb1rjzfbmveuhvag7lrygtr14etixn4t6xiwrzq60y18bdigrm30fndtx820l1ebim4we2u5qn4tlq0vtxitqmpg6z2m24evpu1b9ksjyz1xdd6gkmt1xi2nk56gqdb8qiajwk75ge05utkm40snfn75nk8bmve5fhounp7ycy9ywe93kyg1mza3c9bfxubs3j4ex333v2dxp623yaxg5piqtksgz699xqwd8cct6hcj2s6si1os2jm7jiolwzipeel6r8v4cvwkfvsz3aon7oqn6pggjgxw19wrwxbfro5epx3o0w0bhzuke5ljo4ndv5f8x98jgppddpx6b8w2n9nhe3gtim3w3lym0pnfxhdl8nad3zq008no58vkcadp4c8b8x1r739gtv26ji1q8qsowgdio7v5v61sm6d8zxzyrd5h2c3kgp00yz9n8fxg9p5v7n0p5j8cwyj8zkzbym6wrnaesrtieh2twff22ymz6yf850b5xkkkjsbc42n78v2g5sdfn4vpskdxjtvl2vrvoz3o1ur14vsl5z9hcblokflg200u2ezn1zbbplloksdpmzt4uriqnu7hquqsy0ao5e02x1x1ovzl4ob00pdwm47aauc3cdi1lnm7im4t4xs0u486kar25bi7zuj64b6t4oooivv0c8507ivaaqgat3x6pumhacfc3duepb6rf25i562n9qjwhufqg4drnn19cwu5ldzlgwongfv2tjfdu3w8vmrwghgi4718o10f26zx93pndcfsfje5hug2sn9ut5ezaujjrnj1aowks15y',
                fileSchema: 'jwtisldmohkqfxoxr5qdm2oxyowdpzhv7yufrfxuc7tppfa8g4w0e3h0w8nertzajzh46vhhcj2dpyihcxdjw92p3tphsl5f0987jezpzohvcuom8n3tym491quc6vmg5f9lj43lhg6j9r1s5s2fna4mzotays7ndcz3p6pcl4f3rnwu2lf4v4rec92yrzeqc2bcij1xpszzecepkr2z563nu36lbjjwwkfljki5m9n87qv8xcfhh6zn7g3melz26fx2koeszyearcrmt5j4wn3jtglgwnhxoyitvij6n6v0tjnamu5qzcdbiuk7xmeckdm52qol2ghc8tn4s4y49zijvqsrz4q8ku6g24sjgiaw6e2c50woqmzqqm4sv48s3ntys4kqap35bi59shlyfaa2h6njmo3i9d4feun5zw77xgkzxkj0g5fx6dlw0xq97dz7sy7x8gj7vs7fjbfyml855p4tabav61es5qv7cxcfxp22vqjia9o565nuva9oq3mhrheq7yp2q3qqnqjhdvotdpmwgpk2a60usu7tt0jze8clfaenaog2xiyfybzm9r5vlxjskassqf6ol29ar4ajfjyrtend2fnw4wbaudetrlwpjdvub0atjzjk515ayxbztc8w3ahmutjsjelfauww0n8gwgv29cscpw0l11nbrpux16yg983py4be0132gmh7u35tqnqhvts7zfx0yw9xp393du6vqbgcocowmifnd5cjfky3o3c8gl0zemq1su2v2ttfo5wyxqljv8hfcu17uwwtuv8ul8pk9wq8j364syh27n7dtbvid4nj0j7tbeprmh84alz17i7um12vgwvl2uogm7642eg2hdb83j4ewqpep4mygn2z6ms1j0o9gh9s10l65up7pk4dmzx4pe3zc8j75b921wcpv5mk1eus4b9960bl1j7re6hulhxmlk7up338a66g4kxq8lmibcruwjybat2yztwdx11ccpdn6thmmapr3v5ujvciwf0c',
                proxyHost: 'v0rmgh3826h6wu42bveflsps5tldip9k79x98fgnv6i2sqftp65hclt6aw4k',
                proxyPort: 8099083043,
                destination: 'cm0bdgt5xecb7lt2zhtm82i678154p0watu0vboembihpra5gakv0eu74wo2v03f44use7xjv2hqftnbiwoy28v6jps49pns92p5yrx8c98lakzqp3caj3fedviphr70qdmiv2y3oguolgjc7fh7t5bk796rpgyy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'v7s2xtotqy9i7vfiidqic5fk51hho25jlh861u6fz90rsa9p2pe90c15b1uwxhgygty6ygx06ws8q0nl9fgyc0u58qsicqkkvro2in7vnlk9vsvsxlt1nmxx0gct949savwcqg6ku79gh3c37h7y9fw552g7vrwq',
                responsibleUserAccountName: 'j64k0n88zm4ds4tmaa0t',
                lastChangeUserAccount: 'nqujhbx05sap7d1n812w',
                lastChangedAt: '2020-10-13 22:50:58',
                riInterfaceName: '5s4y7lr58a33cwincf3gwtcoj8p71tdhwwp9eacu6mpifs1l4u7zivf8cd5bs9sa3v82awj7s5dp992hyse460r4qfrezwm3w6uq995korpghwgutkrnwqbg5rjofdjpuytwdtok122mb3jm6q9hm9x5gnr0v1i7',
                riInterfaceNamespace: '5d58rtguhzun4vktnlpf2k9887jr8oc41mk768euj0119bk8zsfe5jkjaw8i2jw60uenb7szsigkzhy00vsx200gquge2pndegg07l2wkok34aqe383p7nzqxrutvto4gtil5pbou633ll40fsy2vf1qa9z993o2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '4h3hnkp4owxqym43zbczaliiinq41omozq3h5evn',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'jro0mpkgnll7hc4d0v2x334exy8r2gd9rr1vb5tvpawgwtwfhi',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'b4817mu4pdnls442fy7p',
                party: '1v6767kdyaj2khmwiw5owobeftdjdkwy0m2ef1ras5exq1km0m1qwyvzceo16hupcm24qn3sct90st4s8fi9bvd9en933hdsoqqyy36xp07e9b02p0c4l9flg1xoiusuybpa445f6be61zq0xv7a26k0g555b291',
                component: 'wjmku37nja7sxn6m7oq2d7umhlied56l6qetvitu48b4t2oqrhvl36s22cuzkfj23vsta4f05qcoiq4sz4biczb1thd0f9zvzfofqecw8su0z4eh3d7gfib7pak3p22epl4ymssq096gb2xex5vs48wy6h1aoavnk',
                name: '4nugmkw3v28qhjv754ya5vqvna9q8k2ntncj2d9rm39sdnj8r53psz8szs7gavvlm3s8dst4ywnk1hiimnqc9k2gjkjdzhrs0v27ajj0c4wf4nqihjgt3lkb52njap5iowpfn7r4i9swlluf8r67ovwn8vto9nui',
                flowHash: 'c1lmb3tgli9ktvyyoxdtbiywacn309kwwxqo9pxj',
                flowParty: '1n0sxlo8r3h112ath5xe1k4p5m6g9bxii9eyu8ta79yxuimubfpbi2fhezr3fyz8rzhzadgdbz72114mmp5ikmkj2mmbrjfr5fa71g1cyiao1ff587r396y2hkhnayelntaf10611lp5ljkf14morjw2h4kk2561',
                flowReceiverParty: 'b6rheceet1d0n8v1bz6omxlimyv76kju8obcbbga4x6ks81m0a15ju94b7kxrhrgxzb9ivfdzvjvety3r9lhpdwlvuo0n5e3p918mnec98i9tg99xuxdib4caym0bl94qvhgu5mwgzm1jt0d1na7ubzbpthiltor',
                flowComponent: 'eucftvzcb4ibl5qzjmm0mkpkz8abjy5urdmeqycupzq3yec5gsxsf3gcri42y11uoq36rw757cglfg2ev2gz1l3udjx7ipp56ne2szu2z2s26zmbuc9euva8qiuiyojvn01jai814zpr4gmjqx2cpkyyphynurqj',
                flowReceiverComponent: 'f3fxqigbimbnch3t3f7niptn0jcpz8e4bnrn1a1ek6i48ccmpapkwpcofjpfwri4zvl2ddtetlnlirlng7802c8vt7j3nant2o2q3d1vufyqk54xgymt2ivdqr7zgmd5x22wfk28j80ieo1z7ambjhf4z47374bk',
                flowInterfaceName: 'h72v4ncpqjlj8cerh33y2kll85ij8uhg8o6ejs3ndz3g9spt0x0luebz7fcdi97gu5ocf5wnx0shmhpvp8i5ykcmpmfz8mvgm88vfs1m3tq2b7ozuu8dp740b84vyjeyubkequ8ki50gd9915l3ntd06vtadjnp6',
                flowInterfaceNamespace: '5ydy1l9d0v9mfvlturuiqc7b2sfhetbwxskd6qtu51en5zbgse1xh2y6t7twh8m9obc9xxodb9wyf3gvd0idz42240z4jth0qp5no4xfq4e09iy5kbsxh0tif2vf31e797ubnnqw45j9h4xxzpdze6i2bupgbe4o',
                version: '8tvx9vyoewxj6ffjtxas',
                adapterType: 'eeh1f6tu6sbc1qv9jovbtnbd5fpbumjyk61zor8wnsn5emktffrhz69c5xzv',
                direction: 'RECEIVER',
                transportProtocol: 'dyaed82escpqg1iedvs5qhwtx9dg7adxzazhidvihra7wrg39tyunc0lc4hn',
                messageProtocol: '8fwssr0snd73i85ob5bgzz0ijmjtt9v6yt4ua1lgxxge17z1clz1f5kj6yi1',
                adapterEngineName: 'cnw965pjapt5lv23uix2jta3zu0rzd8s0yqt782lgjcskh47u83msmsxjp01lka1fq2qck7o0t8kkwuxpaku1e5oq9knlmi27efjmp8todh6a67vuz9ze33z9dinmbm5r266u5p6hyf3etfcs48djk0nt0u88dix',
                url: '7olslpptxcih6857ml6gcyrv18rtlzu4e8qcvlu2tezkgd67c5myc9jdey76aeuvua8zi7pfw1vdiqnokm8mcpts3euuoxlsdn4j1rzsgr0zksmuuoyjuxuz39tq7hyuhc6zr160eewha9srgd53ic5nas1cenxkpe3m8t4hc42jxnqd3xwftt0f2txizadvlb047u7cj1d3vvpvu7hlrt0mjlb9i3tfcm932xysdwdfv8qhhhcnoya9d2mkxd5gdacten7iktcqf28rki1trwp7cngrv7aun8vjh2xw9xcu147e1s2r6n14d115wjzx',
                username: '8nmf65ny1sxyuhilsvblzbrut0446out816utknfp6wp15dh13eoi1gtomps',
                remoteHost: 'rwt1t2rt83vhczo4t07e2e9a8vxh4keskk0oql9m32hmbljkw1ui52zlkmrdhq7rxlddlvok3p6m7l93vk1e2wbf9wlpilzbe2d9q8hv2dlp610pmjb7ngdcj0zq9q3hx4trit579004db7gy7a41x5k4hgozil6',
                remotePort: 4460645469,
                directory: 'mp7ddqtj0yn9z1hzs0ihz53gljezf5pal59twdfa2ygjt6rr83nszjij3oap6jg5ehjefq2ioateewmotb0jtu7gf54jv3anu2rxjj8bkeajnfi6jpp4jhsnzqs0eola0lnpg9xxzj9ymanzo7lo35st4qqsc2hxi5cnzgf8e2lxr2r8ewg52drzfjgcgn7c862eae3xdr0bjx3jsfaonydojk5o8u2zvxt1adxgds2vh5o43s3jxogjk96jzkl929v9q25m474dw6w8zyo3vnl845v6sdeglgakqxa2lt7ytoj6zrhz6d3vmko6or17ibtwac79m46mftdlbvhbhttbw52rt1t73d5994swm7hy1wcuj44jmg3pln056wx7qfn80yxvepc6ibqhi2q532teidva4zqxlg74je72qumdzvntzc6y1hufzml3viii30kg8xxlt6u43xtvslifi5eknhxi609km7ie6reb3mgnksmlllt2emgnjb6rgbp0wihxx6lsrxt7aa9p9dg7aqpdqj6txogqeyh4gu8r42p2e58f9zd4e6k2a350t54zylmco9r25qzne4l2cqjrfd760q45d6lza0tvqnis63fz430qrtl4hqh4l7q2owvovf8k0iripx1m4xbl9n2ag8hlkg4eyfb466n1y4dwfl2yubpj9z4hh6z3y71gllyrimg0hxdgb6k58lpglqiesq3iumo5glh950xlxhqrldeaehaa3il8r3p2sirc991yzn3e3oxgswabbg1uiy66wwrzqx29sqtijt8pggeqgmmx9byh91eup8afjilxzy48k05xna0sjqnv43vv4x4pjcamnuhx43d5cvibthgwv6l1263972givcux753gthybe9h0lgqvwehfch9f78gwltxc02k2sqk2ruha7j0vttigfpmutcprucnro0socb3gkqgiis1t28lw9q7ir8qbrketuntvr274aujobzf31ec4mb0x6m9rb6r1quf6306u',
                fileSchema: 'cs6jbhtzjps91dqmi48b6h94t2zpqm4vvzwyue7gvaqs9jen3w9rxqi2nov1psaewmcgrkiyghlmorp4rns795zy8lshgwqhr7kesqwnle5tr4apjd2o1hfsxd98sn7po3u6iyqncupof518hv48shwtduszxs0h9a7qpmkzd61skn5homboa4l3tvyg692m35o1466ai6gf5i0pv3zf8u8lum5vjwbmmqua19y3njksrdz1of2gimbw2t4l6zzp34q8f0s3vwq711o2lnzn3ndh0syzncqpc6fa2yux5lzf5utitu6cj164rjwkx5awqwxab4k2sgpsf8pi0p599st6upx9e8cjhdv1hy8h4fuz9odec2zotwqwgccbx75yr2hff80d52nwnceq2mljjfv0mp6oljwnj46fyvmgte2y68vern435yphsc4mg7lntbvuv46ve48zqtmy99i7pujtgscrep4ieabop3hwd2pvyjd82oyfyo9xz88go7g0yg7b4g1wswu9poucj97tmls31m012n4axogbbzxy9he80yj64nz3q8hfvpllxi0xhaijh3s0mr95qrj1zya067wwdhbpqvp7gfzbae93qyt164e3mbisys8ezplgup1af4uye3xd3t7dp1xx1lrfpjntazwx46qibzn075yo05ezafdarwkzajg4rmq8kgxrny5nwb3h5veyqawtleu2qeu9lsoi9qjsvo7oe6m2fcuzdrxh6gak9vv3n5z19o4660axueeusk06i3zafgfp2bazvb95fdt7xkmfgt6j5874e919ntjmspcumc8kch7pixcqcta8wbc9cvne292jrt8dbcdkx57zg0kdcfzd7nxpwfn2qxjngq73c7udzd514g2bb4m24x3ik62o9nkzjm8ypw2fcl744xehx9mgeq6hbon8btxydjighe56s6qm2ngng5l22hrcood9n60o8eyulvagn5e3wxk4vl6rwmgdugvsb4lo94uq5wnzx5nx',
                proxyHost: 'c18hlp4psl1akawtpvxqtz8unbmybzuuznggodnbc38dygjtc0gyvz4yh334',
                proxyPort: 8906297040,
                destination: 'yz79m38tw49pzrqlbodm4qh5szepy1xzkojognarwairxw1vjifaabby0hf0ahavng32e4tv1k2x66nb19n6jw3t9k424w45xidjkto4c5tc0mmgbbxscvli1c6bdrtkntwntay2qh7bctlftvdyumcwvvgxvq06',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4ilpu8iaaq4kr1l2tbp9ne91bkaxsaerbcwcpowpufmej7dj4nr7gdv1y0tqnvghwnvd7ytg5ucmccc6e4y8ngewavd1v76d1lnrita9g58arh9cv3ug5xnf4wvae5akhfjxr49lx0s665rr3l8ztv48muljpqin',
                responsibleUserAccountName: 'xkqpiehbsnkmoxnwhz6k',
                lastChangeUserAccount: 'mvdmn8i9omph6nk6qkp7',
                lastChangedAt: '2020-10-13 19:10:15',
                riInterfaceName: 'jhp4ye6h1h3fuuan2m938bwsg33fergspuigfjr3ailupypgb3h4n31n2ajq53iods4czbj6t9jftut1um324tt6rg8o5og06ua2ji9evw1hac6vl3u6at1b1gtbm9olu3l3btv91borm89hmuvqzr28ysqofoes',
                riInterfaceNamespace: 'hzkc8m1y2hu2vhi818fus4afuln9nq1vasto2ilulky6wzpbvih2v4ni93gjdq8svrly311gchwgcys5obam67g70gy4fil0ca36tjj8s1z0wn84wybyyti2ma8tg25fcv0dym4lkce1a4oz2pcv0bjiy3j9amm6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '4byzd9uccioymuir7vk5jx3sl8ldpf32artb0plz',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'bm2ow2ouiysx9of8aahywvojjzvzxes8qzipjhkt2q23dnq5oo',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '45z6x46uam1mbzeqbnxw',
                party: 'un72tbxejeu6spkf6esbr28xu3os5ipzxskgojp9kyfjujyhxvj33mhbyy2a68yadw7nzol8tdgb7bj599dptgazpuvpjhvxabzmm5x9v4mmrz7g5ivhlfskx4tq1ka0c81hrvoqtfqco702pqnpzr26hpl0zev0',
                component: 'l2rexll018ubyje9vlbh2l13uo0gm1djnqiju3idkjzyqumqew93wxfpqqkkugo8ed8fdlppdukt5vpv4ps3f63g4shne5zdyei15b5acbsw9nouczbvzvg32fd0cg8kwiv6ycnnupa4qn939rebmzn9ns7zl5pn',
                name: 'lt0r0qdes8jhvzz6f42nl26k1ejs0ryuxdbat4k083ucpmbsxcs2zue5es5dvp3fwdqdndrrqzznanbbev18yx74xpwtvq0k3xzvzp0x2tx5p0yvorzo18puwf0hwqi94yuj8chg4uyrg6cbe74v07znohgjjgm6w',
                flowHash: 'l5rt3jiq24sbxndcfyr3dxl3wprimrqtldfawisg',
                flowParty: 'fjbdj3iixiha9vc0i4izha025pheay1byf1fpe6srq04ifl2j9cv3vk2csg4xx5zprrsgoggkqgzbf5rpmstydq3t1abgiarcto0165vdciq3wa9f06o080evsndughuio1hjkmkfv044uysxwhqdjo313k2jxei',
                flowReceiverParty: 'wiyqag15g377gmgu60tl4no9158adnyci12ejgqe5hu8dq1rkyidya17cr3s65gypfkgsojgemckwgqynxsbo0jxvgrs4nekmyai1biulklont2cjxgno1fuxah1j7fupsqken4mekxq83w2l7ufzrmlc2mahedd',
                flowComponent: 'pjn3gospody1bzsgozfrj6yj6b14vlwjnkqy1ndme3decqsb1pbfzopgs0lugg93tyix80tchwos2p7xlfysnuxrb880tuob8x4821slgdunxsrmqr9sljcw1g0lwdpby2cwy3rhja4dasch3efqcczdwevvu0yo',
                flowReceiverComponent: 'urbhbei9djgdq4vvfpowkdr0m547stm7652kwnzq9yyi5irwg1hzpb3c65io6rws3o4whs5d9r47x9jjdmldltqla3n1fvuovjr2lytm7q8o4ay3r3og3drdqvezwqwwoei6sc7yhlthtwuguzw7fkq38jy5dn16',
                flowInterfaceName: 'jb4vjx6uhto6t7use2iktd0fatyxrg6pidpg7ziqulgt7ys40rebs3lmyru79fsl8naq98yvs1pw6mpto7ulviexc4iw2njx5zd3ymr5118sfjst5at0dbgne5aj2x4xdxqm7hv6acji3hszk5gat4ei6igs0tti',
                flowInterfaceNamespace: 'gwhkdua8jznqzc4kskor3p8wdjsqhpq97g8k279ut9mrf1mlkfjg518lchgzabyzhjkgibge4h84eu9xe67s2ap0daq4yrggy7sbjtf8a1ch8ca25uji92wlg3weovng645bu0hr5j9wo3aqvxuhs77ytqo4ft5i',
                version: 'ifee15q9938brb0um1y3',
                adapterType: 'bhfnpsstswaym2r5i0xte08ox4l4r06jsosiqodc1hjo40o98se89kejmtr3',
                direction: 'RECEIVER',
                transportProtocol: 'l5iamd2hx2hmb7xcagyyrdi2afx4z0bc0cg7kfmv8vjrjgjm8yob0p4cmnxu',
                messageProtocol: 'i4j8tfj3wvtsljhxeb1x2yjzvv9m0ojm1xza2wet4e8c092qlv70enf8z5tr',
                adapterEngineName: 'vu59h1q8srjgf4gfj8oby8nygl5x0tywlxc02mp185vd9uxnjrqi1fzsvlfr8ok47wqediitd4s6yizfsoebm4gvlwa5fhdj7e1uktiacbyze6zz0fjd2ebbyu91xobahvls7rryd8bd1xlb1axwxi071vr7w1sw',
                url: 'np7yvhvk5eptet68orsk8m6a4v9cl7gxj117982835u1zi2u99wormb8ay5c5x2huw3ict6fn7lw12szs3qwh7i9himloq3pr5s95iko3lp1zomr5fpcn72ax09a3g1jgybq8m9i439s3ablyrolfqx3pgh4ana674cn7o3itxb1cfmegevbz38bxigjnhmddsg0rys2vyoeuvoxx9cuoyydhn8jj12q0cobl5w43i2tipuhenqb9mz2p7yv9e02kb72v30mujg856359eopxopsvup668vsau9m7knag6039qp5ht5eso8ix4k7ssou',
                username: 'auvptdw0yd0an4fqdrtzjcbex5cd9xk3m2dh964zslrlxjqe5ci5p4e0yx9x',
                remoteHost: 'sbk6jh9nch0x3flgbh8qqb1wsm4bopwo7vrbt3df3yj6izzhnm0a7xrkq73j1n3tz9ue3ptf1behesl50goppr2sj8pyzmdxaz91szbi2w3zgjzjx9i1nibky019c0ctyp3zxz3ah29t2czz5fy0jo16smb9zfig',
                remotePort: 9890439260,
                directory: 'ig9u1pchmtch6waysv2yv9gj6mnxhohkbtol72o7rgb40iw463bo3cidosp5kgrojrzhdisvkpsqskikjgv1lzsg2ihmk4onnuak0uc6gpbvplsicm9w4ket9c1fa9b0xfpuygi5uk70bbeockf1pksfyc17o3wd5in8m0425io400hme3jigeaulln19862f2xcdssc0qctmrhybnqec56qzzipf25h29de3118wzoz9dlvr86nkqh93nhz1e7j7voae0cvk2t0moxe57b65ihn8aqupgnvcl96jidp21sq2b054w8x98zdgemz7zz7w74kkzynq8su4nr97y447n34u30v0p8hkilewg0tncdobxbd65s22e264f12qrclen0qm8kg8ck19abvlz2w8qztwc42vewtaaueibg5a3rewj7c04wmf92jjdlu8z46ev3h6rdqxzlq2h6x9gnibid8q4lj8dfwxc4r2xzs66837uvobqa8p35jt7mf7c49fpuiy3yng5b1mm1hgntegud85uwdvwwvcjhyv6wqwttwl2vri36uz8heeideo9qyqf9i1d3siclxxp5p92mahis9uk309oih1ganpkqrzuxamjroah7e8gg33rk58xpydfgv4d6rpe96379i5m0skwjf7jyroda8vlqj2ilnkrjyc1zmkj6iigquuh49ari2v8qb8fml17qempjy8ngk5vahqeufviwbw6ihpobenjo0qv22x84ci9r5dehjko79rlkv2wcmpf7mr4zflzlszp4i2v7w7w86hfwjz4yzhpf07iy7ejk6xew9qmhdr9ydrnavnpyi1fusb4o26flbu4qhyf9q9a6cqgx7ycj1sy77fdqnvc8utoq4j7j7n5na4wj83iqdkaodxl4ki787otuzqzat7ec1gv5v3z3f3tzm0y2xc5pitx0egcxvdq6oe4s6zde681jy8zqxukenvfj23cp3rbi5llmxm416e7qb7jk5a94vnebjpvxmqx8n',
                fileSchema: '1dj114i9cxk86mb8old782hdi4ocnwwwttco46v0l4245kn76rkeo6l63ebm02pne4xn31lfp1rvxqxrjgdcnmmdgxo8m0k4w2vkqnh52led914bcobfp2q88h159eckn7jutwr4wiffkkvdlq3rc7zrbylr7l2q4eat9k2oc1vunbit84nzprmqm2zqbvoih0l4zhow6ch49eyvii77svb0xhi3vqz1ccn2gopi6gwg5zb621eyjzszrzayk2uan5m7o2sejy3d1u63yv9saplurlga4tl6rp8hpd6n643m5rl5pigtrcx0m5i9taj54pv3buqfhxoiax76tp4dhvxasvvaz0ci9i4kbohinlq0s6d3z4sdv2pj40kfjwjv950xbimokodxf3ylzgulxb61zq66yp10iqxgtfw3v1jtc5i5ecfwugczunhu8azqshpa2ukht424ocaff4t0apatez5z974vux2uim9q5h8pl34jogyfb5bs6oogtrijg6e0q3pcay6lym07g7b25gcixrbpiguqefsakz43dsy0zp5criqf20vky9qsyjuylo5vco4qvsp627k483z1ouvpibb0a6df67ww2wfaxvn6hojxmojqt3y86r0sw1xqk29nz0mjcw8834za885jhbpwp09qfvsmbd1cdqg7dfzxwo9yphwe4bm24q6e5fc5ipm9ev6o7c2d4zvwoxex7cjzyfaxvlc7g15npwczowna7rez2fex0kodnehznk4c6cwbzns88kt5zkk4rb99wzrinud6n3tzzg8aumjxzle3k5jbr5k5vvr1kadcm1n6k2u8cyhz5i555a77yiigoeoo82ywbf8mynz06mrppj8rqv1bo95y5960t87uszxgp6cjb4vpc98il6uviuaii31r6nd5kpg059j7el61cyiuy1suqk5s77or5dm1g776xpjkjne8o8d6rwzx5p72mng6dpzxv4az3fkxnt1amv3gb4erhc1zwuxxt6vji15k',
                proxyHost: 'oubqy7jys6dr0ww60dx7dh6nx398pgqnpw4vzxzmiy8o6fe7wf6v82mrpjc7',
                proxyPort: 5282764076,
                destination: '79lp9hg2oza4zff5zl6njhov3kmh98fb8j7fwvz8a05lst7n5tzdgd51rehy0idue8qpybsi7atu5r3lwt4dfom6ulr832tp9ft22dhcewd8mv69tluatdgs769p3o5evwf4dxpesf6ygznhxec24soqyxu12n7o',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'y73khcu2bcfp10i12f5sjtqwcp61t8wshcpciablmx3yhzccpd2fyjqbe98gcyn9pl4mt2rivqhmox0t5rtch1dhjffak9mr4saes8uqvji3ddbq7x4i552r4lop9zfxxhyvqcq8k9vbcl75a1dje19ib2tc94a9',
                responsibleUserAccountName: 'sx1di1yll89weusknon8',
                lastChangeUserAccount: 'hhmii63zk52ioejephgd',
                lastChangedAt: '2020-10-13 02:59:07',
                riInterfaceName: 'abkvpk7mofmvkta2v66q174dfvm2voal20tu3dz1czdo9h7mwu47vqsbsb4zlsyhi04njuxcptks5w4e27esp6681yb1gfbemn9rd99q43rjpetsstm1mkpop6djsh5y22kcvkfb3x2ozlta9vwwt6cuhgz6prnu',
                riInterfaceNamespace: 'hjhuni234ua4zkly9kctcjax6ojx38hqj7a3twroxe06b9g1tirtos4l2itlwcgv4qqtrw0q5f3hidcfcuh9tlct3tw5tyk8d7w52ykolgpbxc3780xye02rfnh9k4uos0plic8lycgfkt3jwbbw4y2r04timzp9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'nf1a2qjwmbjld7e2n1e3q98n3alvgngbz8nu27gx',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'rhwdbwhvitre6gk9dlusyiq2605cwdvkdx0mh73pi0a7o1na4a',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'nchaqsg5bd4ztgbgma46',
                party: '8m0x9qgrmqb8p27faaz67uaop52c5cqridvpaqkyvgwryzlnsyp76tdrvv7vhhe6dryl5evuaaur9di6u2wa4xtez6837upcpwk5cyjt7qq13zjfwjxtsepluebtw5bwuzzpyj86d2itw6m6pd16u3seo5ctnqpb',
                component: '6tu2h62equwlja0wtv9fppjrs02vfaor2bnnezwptw1u5gisywd2u6ylxcadr7b7a79532lep799qa5gfmqvp66rl0g06rj42yna3ld8te7fbxpjjs70j1aat5jrp0na6lrbys1kkur3zyyf0ju1gac7vjhec6w3',
                name: 'k5aqw0qbch1r2zccbrwvo5qvvwug34qzmljqbl2qok9agho62z4w1racsajfdqkov0iusgu38pla2hqkgusx7tccbkekg29tqabutl7ka1adg6b1k66xk6k7yd9mso2gbp1lzun8tk36inzo18cxvhj9cawy43s7',
                flowHash: 'ytvr1r4nbxawry1wsyurl91sa8v29wioy06iilkk',
                flowParty: 'h5mw2hk7d5osq756mzfnnjs6jgebc69hsdaalh0wrtokysag1pc27csgmzk8agcjf3rp1hk9sdnhrka6jbtdpayorjpvylc6l1xb86ff1pwiygouu5q28xjxizgfod55ghkok856dkwpzvryg3wgj22a0yi8bmhhg',
                flowReceiverParty: '5fws8kj56jjdhiu396330eegs8jb7gf73fd2fyd1c4c9fj5jrcvabso09ik9mebqpfsny9t6glkyhcpkhez2g1jzmi1bn51m0eg4la7t74auy07gdq3ryjwpnuslb9f9wk09rprlmb2ky87x34dwf4aqd2tvlqpt',
                flowComponent: 'vheyx3kxj9211ww35b5w2492ky9z31ihtr8e2nlb3go0g31v28ej0rnbyrpohlstkq3cn8ae1r13lw9kbncq0uun7gjwyiz1lzhh2s17ahqrme8keyr0z0oqhct4y92oiod6g7b6hpdpp38t3m5yr6gcki10115p',
                flowReceiverComponent: 'qor41dgx40rh2fjfjscbrc4eb66o60l6ul8y3wipk0075x9x3pvimw13wupgtg8is0qm8h3d2pij81fxykxf5dl36d0cb86kq5flmxfm0vynkor4l39ez719bnsdqv0422d50r46xvbxg4jkigfcvwsv0iymaysn',
                flowInterfaceName: 'e1xlwothmmgzxvh3ehwbrcsjc5b9g76yno2ytsvz9iv3pj78ma97h697efxwn5s0xdxadbl0eiu3h9gq2myagnfwy8itkcg6ln3jd3bxq2228180u3j5eactb1vxvpek374v5ii9hcoj8m2ik88bhy4kqkqwdg73',
                flowInterfaceNamespace: 'zucaf3elrastva171u0uc3p5rs1iof1eab72wn3ooldux3p1arl9pcyzxxmts8fq4k51vmlhkb1qe0dam1715e80hdww0dn4duu3tkbheqpasi8dfkyp9nlnfze4wkt5t9u1lmllxuk7ki607qamq6p003oawwri',
                version: 'cwizy3myp34grmy7gi1n',
                adapterType: 'hdyhyixqp2zn1slntsohoz8etdof05qmvjfox1npoaxbm7e5v0kx4rah3u2q',
                direction: 'SENDER',
                transportProtocol: 'by4w2l8f0ayjkivgfzdbp22ho453u6a6w2nq5rd8jqw9ytghu95rhjhvgawi',
                messageProtocol: 'aojpcvdgysn8wla79wjvoqfn6q7rmwed5sept24qd5vya3m11m6m07tfay6k',
                adapterEngineName: 'dq88u6673l582aqs0g793d7zjmdyjkqnrm44hcj5c724ym6vl5xppgmos6456bspkepggsff7riwhdk85lfclxn2rw8ivogdoclg69fjxt180y6enteralp1trrw4bg3pt7svcc6cxjp3v88tyhy6yf0363xraxm',
                url: 'iv6a69qvoexxt77o9uky2ogvlfd6teoq9kpvkx38y6m2fi6cilkx3qwibnj5mu8rfqanj9u8fwf2xfxx2e59sd7wje340te5edyqzs1k4zqhzwggours6v332ljpxrsux6r895pdpkrczax2ly46clv0rh15vg867ynxorb500lkvtp7tfv1c53vdp5s5m3frwo9mzxnkmoyj8qkitbcq3qbwkc5wgd6d1v6if1140w8v88xt7ux55pvufhrx8yz4cl58svh4y75p62bb6xo46q2vm3qjcys8b3ywhfxcxqe8mcdenexw6jepg7w5grz',
                username: 'v0rxttb54xl4r5c3a4weg0rj8aw39h1nx63x8iavmshunetk2jgc9vl54wo6',
                remoteHost: 'i3gl198bw90fjlz9aa0j0ud4q0rzmg5pvasonzuz2qrnu6co84mcn0dxq97pgn4243ujt9kcz9bo3hynezy39jcwmujlablm9474ct4tec3sylhikvjnga7jehv09k7nl23jiafwomhp46z2x8lxxr7o04dotfrn',
                remotePort: 3269493372,
                directory: 'w7r9617km4qry519gl6jeo1l4uhrhuzv7b2fd2dgtragn55xxmld3ifg8gglx8qjjkrb3265ywjpe7saae6lhjxaqu30zbspaks25ppvfzvpnro6j4ujxlbdadzcna2my2oibtx7zldamptrdss4lk7prcb800808pd3rndvuopadinipzuzi9uixg8et0bt6lmxudwbyp7d8h2eo1b96n6rhoqmpuj9sx9t1z2yt6pfqr4qmzsklyk2ozon52mbzfqy2awzfkbb3cd3kpoy4wsunr8u6kg424c1gdu11u7jbc7eqlhp03vx3gi4z0srtz2fo09oiib78zqemipucuvu56u62h70n021azdr1g26xn0pxswljcdbp5bg3n8vk6qhhbt248wuk41t5g2c5nivzeo6ao3lr1ejdwsfrj7ct2kujou94nel043teoyay8p3pnzg2danmwx3y9jasaez78mkyg9y4hv0ni7rqewxcm1w0xjgycpe00lgxos3bhexsahowfqdpw3zuxqgozphdduxiw94hug7pproh84ol5gvv8cvinehrvjbjfeyi52p7q05cp5m9y8at4wcwd16te5c9wdbdj4d88pt8uo9mbaq8qi47xo6hpz6y2x83d21h3pfseygk67f4x7ejn4teeda00hrkr7e2fpr8emecs9qr0iies8gzafuz4xilaqtgdj5ry54rnp0blb5ygsmpn4nava53ablaoz6odm4ph6plld2ymfpzxxljsgerjwgqwd3tjqd52yk58u3qyxt6cw8w0fzieey39adyv1r90ctd4i9v6qarc48yhg607d2pb6sj3ya0vo87nbuc5fc7iptwkw59xkh4qx0a0vboz3jlq4a5qj45zesrx47pc1z9dpehmybedxrlolww72i13qimofaqhyhptwvkizym0s9c3vzhqhott4ojty66qryh9vptvfycsw28uewep8xeha2zd4sf2440ka18yyl52b7zxe32qcmke1s16wl',
                fileSchema: 'lflu0gk3zvhkk7l6l8r72i2ddkww3o80g3doninm8gmuv75afwup6yibhlz3gvbqovohrd3zjuf5licowczwxma1v1zhqtgddfwtxfuo0jsr8q47071fqgsemrbij4h0w8xx686p119no3ny34t7thqrx0ag4xk0vdsbo9vi9x7z5rjy2niivowq7p9mlfh3wd84qrfat8k781ou945wo1kc1lyuzv7qvrac19rrvykg7osk4ihwphe9i02u0iep32n9k9px01g9sl72oj51zpfwdyw98s0q6kuw48co8vciklm6hb1gw4t30u2w1wbtv9i8kf9m224ujodwu32ewep5wk84tpifa96xjwm2ih4o0rsq1lrgbq9qfqlmfg5g1u8wqoinswpwsawvsuidypa61hovwsss5t31bbiw2r0o1no333xvmn13f7gzxxp4yimi3286tytg4d7c9bod8m7mer37hhfnpe4u2jazdc49js0e0e2o3pzsutwy4ch33lbyh1x7w6dp9elytk58bl07t6vvtpvxkwtmwnyioceb5vptmq96xiq41pauwtv4jtxgdhw2435mmcf2w7f0ru5lnrcn9l5ck690wzzd2ibultgtnq3i8crb312wx67yalbw8zmlod5j3yt6p26y6c6s8mz4pi9mv16zbfrfhac4m51vhz7ylbwwlccfseuqzdehskqmxx437dhxof3aggm69s2hwt9lk1soyco1pghhssrcq8uy0prcqd2wriy9s7251xj0o45b5zja0mkea95t56am3v0ek3r291xl8g3p0qqp97cj6ughqj9gls79wfsqjgqikewgj6rfxff2bsv5fav6fldpmg5on2cz7p2kt489sx3w1ijtjepih2gumh2h8wm6l079q4wctmak8b7v6nt0lfdwie1r78e2fn8m9jq9jktzrfbmst5km7h3t1hpljl8xe5fexlj6gggupqchvt54yjcdun4txbt38kgxsm041zg8ojk5ah12hfn',
                proxyHost: '06oo4opltjo4xfjprm3xqoebfeptnjb6p5jaf63dxm6pnp1vtlek6xm4cdkg',
                proxyPort: 7248093859,
                destination: 'qwblndk2t2xd7vzphha59qrveo58yqs5fgsjtwms0yt06nby23ckgq3q2hf4vax0ad7nj6a0r8m4i1rlt7el20oct4qe0yb0dae2uooyoc1uy0w5zbfusryehsigp795sgwipg1vikxqw8cgmfvp3oohpf7xkz7n',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'h5qi4xwbzfrbzyo8p74xwindygkhbkd19ay5ihhjccwg2w3g750gexzaz5faayv68kv2kucrtx1sfaz4yv36ayz7mqnvoutnhm0jfpir5qu0vnp6pdprmigjggk49rjeltj3zgv134cd9vcfxox6bfk10rb8f13m',
                responsibleUserAccountName: 'cqn2jjkw3alveavt5kxs',
                lastChangeUserAccount: 'wyqdx1n6o19ds9wjwi27',
                lastChangedAt: '2020-10-13 19:19:16',
                riInterfaceName: 'nz99h537ofwzcoadv0gt45eygsp2rfdnpa1migtyap5e75ij211ot8lrt598l24jui6wvn55mrdlymrv6o66bgpr8tf65qfo20qfmgq9cdbvk6y49iji3lm8qoignjyukpichyt3bn7pdgftxf6k3xkn2gtwzg8w',
                riInterfaceNamespace: 'vprx3jw5egb6o7z72z4mp5nm3fa5whweldgnb3p8jybqpp65yzxz06u7sal5nc70khblnvpxl0eeome7jyt96cawjxeqe9yynkqlnihhe6v4rsqn60lfoc0jy8sqvo9hnamec88y8ejb08lbbayt2fkidaugn3p6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'cy2w21hxngss3j1jdj3ate64hokx1ewb2xxw1xih',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: '2dpir77xksubmb7wldnuasiweyq4bfe4yue7vton461gm1lv42',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '5a537rlgrzb97ovcqdlt',
                party: 'y1ks1mj9ees8hsll7smeqfbd8ubh9mupote40qjm7r7nn25pkph4zya0ato9vvpajgskhy9ev5rjk6yu6wmeey9yyx45ra9i4s29e1jbwxfxllf29lxmtb3zza7lpq2yliujnuqa3hwlarb21oe6nnfl8ah4orfq',
                component: '7cr97lzuesri8ebfg6z4du3lkzkc7kewfb5ry2wdvft7q6c6ocr99wavtf55umeycs9pklbnmc0j8egj418nljwi37xnf253r4gxjxgcfbq81yv9mdwrhyswkzgfqg29jjq4aq1ogl67r29q3p5qn29hcsrdzcl7',
                name: 'k9khr4j0lrvpx7h9jv548ieqsn99064gqew7nvzw96f6ky59hx3xzwvjfcy4jighrye4jxuux7naxoehvy9owfa9p03gh2sis5ptvqfvi9aegy0j1si9m06smfo0ojr6dy4kppoody22shv0un2418jrvraa059u',
                flowHash: 'vgxzvta0qcl4y8mac35frjppx0e0054s01a8wz99',
                flowParty: 'ab49dzjujqjw363iil77cz80z1i10pylgt9d2uz3l59e0d2zpazzaf80av8zl57ks80fi3pox5jpm8wloq8cn0sz8acob4ux3gezvleiwalkte2394zvbedpzbzutnnjveijbnbnxplvcjh5ptrdvdcin2x0sbdz',
                flowReceiverParty: 'vek5jvy841g0hf3q1carmtdxe8m1z3cryem2h9jrlfz2qkzx26ad2qwno271wrwaro6h3vjtm8h6mwpxpm8xwuc5jvapawyuanahc16xq4y5uxo70r72ps84nva89rv79qv89ci1hml0zgbsz3tg4hxodtcl6r8dw',
                flowComponent: 'sxhy7oh1gdos9fup394p4ogpklh4mw4r6c22o15gffn89993gy2tim29qhr6t68yn153qb06mltf3dyrt5mzq1pf7z1b8dxinqolc1d6iovv5fr1hgcukizl7do01rber7mqb75tmwntmlsotry5j2j9g5iyjzm3',
                flowReceiverComponent: 'vm629oo1rtrjcmh8leyrchboz7clo2d3tmbwftf4hzi746ihro0xv0orfeli3vscgx0pqfflbgdtvqhz8h8qar7mj1ou51cwk007c912d3r2hsv8ei0lae897mdqxliiw58ptvatx3y69fmi0odm1cf39aa7l02j',
                flowInterfaceName: 'tnfeyutggyce47hjmy3ehsnp3fupctblph9y5yjjk0ljoz8av8xgz3sryolumvbxkaf0j2kjboutaexytsb7p3767rgv4rzxqrpj34bx2kp3ib26g2a3ed1b7mlscnwz3ypi0q3kv3djrbo6xb8goqcinfz7fb5x',
                flowInterfaceNamespace: 'k5ujj7kaxez572qanq4ip8gpa6nrviu8ba0n830tb34yj39fin6yg686jsin98g2mdam5hmkr7cvt9dy0cy6dczn6ig1i78q9ve5mevjrec5mllzm3ibqd9nnqpdnlxiafk0l34uvqkr0tfc4jeo03znf85w9oph',
                version: '6h554x5d7h4092t3mydl',
                adapterType: '367tu4bzm6bzt0kk1yg09uqkjlnqw8g2csi919ih5oevp8omsnu2k0rbnj4z',
                direction: 'RECEIVER',
                transportProtocol: '6bzz9zynutwv1qfhpw5ke6trq7bqh9sak1m9d79v9i1grsgsvt8a0vkio29i',
                messageProtocol: 'dg4er57a4rqscmc11vhzzcdtfj6f1a9ya6k1psyzo1tck171muvvdhtymmlo',
                adapterEngineName: 'ehn4kcmiv1l9epn8yiizj48yrtwgb6vyb9shckgxt67cdovuzy87ac9vwygce0f8jx6uzkpwhaibm91z9anvzmuxa0kn47abahtdm3aoeemrkvhndocx9rwu8jtyd7gepn5w4tpcg8qu0gqb73xaws369u1q23bo',
                url: '5g66gcq2a9bxrkdixtb820k7xdb1taf3urrrhlkb079iays55aqh7cupi0z4noogkehl5rq6fdzqqga2336uy5hiscqzo5zf21by1e4binvvllaaoc1emnghyy9otwwvwg7bvwv2gc62mqtnhmr31cwdja1nhrcpbvnbffwkw8wzueps7tzzdktm6lj9nlkeadpeaa5c6jqu7n6aab24b56bp4n12zu0oxoj6l7nje9im0b6zo057u8332oxnamd999u1jhifun1qbvui2hctxbfdxenlx8umq7f9d4l85u4jvj1ogyt44a2qvddrdqw',
                username: 'j7piz6jzl0po1m087n97u9jdw14vde0hby8rzv7s5z1rsv3vsywspstbeopy',
                remoteHost: 'cuwbhs10f6tllwmex2tvunab763ub35u8d14722ilsoeoj49lnvp5w3kf9290br059yzcl6mz1268smvle3fa3jv5fvwkh4ajq8dfkkkbi7dh4vwt5rnoptb88zqwjf0lnh1homknz36i5c6fpwcqygy2t9l0461',
                remotePort: 7462960091,
                directory: 'wvz0whtsqnjifzdy7xsb3wtpnr0zox7c9mkut4rkarad6b0murldbsvd764cwqh8l8q4g0lf79rs8h7rowh9tup1f123mhnrh19fe7j2zpi899twl3cvazvwkkyh9hsu8o8rpqu5fyo4hlnju14t4m7uzjko4tvxl131js9gaggymv8fep517yysa2wfojf0c36qrp7kwhqejeqdvr4muf5bkzcmerprnhwerctwl2hp0ugxrcv1gyauuw9zqay3vxdldpgrkaj6nkfkefka1m90fn7qbqt38jsdt991a671drcfwm6nvgb3xxnptuge8rsml4g89pyatkd1kr5pawf0fw6bt5xop5m6kpbz5101rs5hp9tibmglewld0ipsxwqmwrq7gkir9lyjltr66pk5iewxv9hr6ppal0t4yj6ryq83295i3g7np0mup5vv7k382dkm8kxof6cn0if6o7k4cth12r3bgr5mumvt6aidoahdq1iljl75l1r2342om861crrylgg35dueovyspp13qdam8jaosxw42obkdb38vg7t2c1s04w36xhpl432fuews6l8fow8s2vfk7da9na03rmcnca0exr2ivszzcn4d53tthn3k7chz1bhxezbh7idfyiom4wctqjr3swj3a1ac0d8qmshebx6m7ruaq3bs6n3rfgclo42zl4jmxus12472oj2qiygofjqeudpose8cgeuaocomix1h6vjuxha1njspowglehty2kpvl17kj1jci0r7z50uplaqy6oqblw0fezzvbj27iaxyyt2mjkl0ja5itqwk6jxfxndj2waj504em53c5tggslolp65jmjvmakamrmnwemnxrs2kiwssq2vtgpvux3aw3318wc000niq6izuul3kos5w2dzoozy9qrng4wf7fyrvb7hdbhnx9uki1m7eo3qm9mxm136p8fiw5ikmezbqxp7heb6gal1cvucssa3fw0wqu4hk92e4odjsw1v5ourplsldbu',
                fileSchema: 'mr4wx8gjws5bk3gb5z8ku0tvs0otkrb934wa109a1knnc14k0izcj55sakpaglrqkpl4yxnbz94egi5biczchfc7cvuvhp7jlf2tvjnwl0cw8iakwfbyao8byvcz30eom5fdxm802eaevs51fbhzcjcmkhenqm1enw6qa6mj5y4emda7k7l7qmoni3w96ycrcgfcqnlx8ast731cy65wdvhvypbutweg52arh7wsuqxlrxnph50v9htjqbidux1pe8rp08tijumzrki3p2vvxiyyycusr4e1d7valk9atqp4bgum6ccwoxjobflod38a3rtsqrlmu067zar6xwbwpt98ontah4djg15ehj0m3fxd1eacqtc5r78xoedgli3azxia54xi98vxfju75vrqmblqiew70uxdh3ntn8js41qxknwgxeg9eevy39t4vv7ixoaf1xh8ib4cb8ln0r636qaj6ndhkhlz10sl1u2iv9zbjexzq6sxw35h3ob0dt1qp303ji6jrdex3ef6aw0kuh7cglrjd3hy7i9ghsborksagfq8ofljooe5xaub2357vwn0wvh54z14mp4l270oqubmxznl1ylygygdw0vlxynahh9sw9l48jxd0cpwpjwe8a7er28y10g3wupa3nionv5kzuzdpabno2eyjm58wzgvxbii6cq5unaqoei48stdgw6csbs1ka042aj29scztgjagoeouoa74shvtt5vwe4okjn8jhyodym8xtn05mbsacll8bbybc99qimvzvg1c0bd6kkq76g2r0r09esw3uw1h9wf8veyhisoubj6gh80jd963nwuee6qzi3t8bb212097evewikj4s4b5ry18q1husai11vfk1w9hnh4uz8ohdktv57xw77ywa12xyhrisyal2eotvyne3fap64gxwt047kzs9x39e7z67nrfp14fec8lzjhku7akredx2tqsttaymg575jidiodh7a9neh46tubinc84999wny710bi',
                proxyHost: '81pyydw00xhop2y7vk4wdrt47lhhx4sxdhb8gymgf8rt8vzkm48twdatqkhh',
                proxyPort: 8307262460,
                destination: 'g63ms2bnq4ph7fg0p7753rtznjz7bk759nliqm9zlsw7kgbnh8s3gftk31cpcc0m8zmlyc0ez5pgida7v1xbjizkkygfdzm4n7vugtlk62mo2ip4d9grd88jr6wsywgz8serwhrcilmxy7nr67x40swins1170df',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dg9btmstfem5wbd4mtcs2r3e6x8sb3vm62gcd4bfswcqyn06dms5me5ud7cz7rlqmpr3zcc17zsxuqmtqa489gudm3rarq4osw7ly8druy2eqf9l26aahj477s2ok0sdkyvbnh4idyvhhbmlpdfaq7xqdok0n5qi',
                responsibleUserAccountName: 'mym48g8ghag3htnqvo4m',
                lastChangeUserAccount: 'l854yck0ygf72mdp7hiv',
                lastChangedAt: '2020-10-13 10:59:15',
                riInterfaceName: 'qapztb7wvma0mybnjdd7xxfqam2sn92zidhv4nkosnsvhsgro0xtxp663hozrr2cmtvtj9vqfz5ku3e77sr3gnt2xvh7om321kzncbsoa69stdij3wqi18wvoitnkpk2h3ksnoz5erygb5hoxjajgsdtcxr7x9fb',
                riInterfaceNamespace: 'xf2bibduk82km0l8tpfznuf66gyjwnz6weu34wnir5b25cb55tymueoxfxnbymxhky870nsyauea35hflnuk7r88ummamhkmku5gasp57o5xwn2nllyvfturfbty12j0sev25tuxp440ep9i1ddcc5a2uumtxmpi',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '3snyhhnhjio1kxvvcr5qy0zsgwn8yegvgcurb1by',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'zznqc76yibbwmonjnowea77rkziq9kksmx923o1yym1qauzs94',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '62f5iqvmzxx99cqz2imq',
                party: 'g80rc7cl8x3xjl0dcjmgq7ucaqizttglyt78580u80ja4rcrgfz3mfnihn6kdhbzalxupvi7c9kzk3njwyg52m0agzje1hqpw6v871ne0job2xe3erqdzap9f39307szaccgbdmzn1xb1segqhe39f7ndozu70j6',
                component: 'ew98klpm3rvmlylzy0ykevve6omvzjni8ugucgacqplrzvj0zi71fgmfqjssamjxwyn9r38n9zmpoqgofjdt49vzeb28ewq8unh3akym6xp7kzcvypjitet5v2auyd77o8sg8096ago735ok7maue2r9hflm7hk9',
                name: 'm7g7kxkludx187owj6qlhv9hm6qi47j2iv0loxk80hyvk3il6k0i33o30k5n264roxzi9d9ulb0gpo37dcxuwmtad0amckmkgds97sz4ejmo6gob5fzw6vufz2rlo4d61b2r59390sl51fac1lvhvz6jgdagp2wm',
                flowHash: 'n6ho8y92hwhacrs783zj84jr65xsz8xjvumtuuoy',
                flowParty: 'vz0yzvbcmc6pxtlgqzfr3ek5ty3902mf4pgmosw3o1ck6g11epqshklwf805bnjmaepikzuwe77mif5pfda5zvkf203fcjkmc8r4kgfiy80loccaoi4zl8hzdtsgiaran1isd65t9rv1oy6quhx9fmso5jojt4v8',
                flowReceiverParty: 'mgb569p1s33n27oeg6iy8l4m9pq1049keufcgyyrxvi6v3pchdaa4rilbzi7d5ri4wpiu8dakflhmkgugw8qk2l0vkp2sz9ixdse7vt7aqcwrfshbj0ne5iym8a70vocxt7sauq11kicp37sqs3xfc64xy992zt6',
                flowComponent: '90qhkyxe4v52ppd7v1yaodgu3spzx50jh7wwg345uo7t1x1xygyqpxaortacjgixl5ytu8hela6h6h3gt1rd8e9e72neqhsoofpxafgbld0jmfilffa0n68r070fablm2e3j9cdu7pqnd2edp5by5rl5qtx9wdv07',
                flowReceiverComponent: 'xg8mdd1q7q1z95jtgd98tvu7ijw731bk76353pycswp7djnoks9z4gcw564a2ce0wb3odtn1mwh93g9rs4esla0oearsvs70f0ul57yrsz99vx0qw1zl4duzolziqphyppqa7xreduqhq14omueutn3vnv1bhyb9',
                flowInterfaceName: 'vhblzjhds9x5e3sqr3whsbctk4bgy37e0fg2afauh5zzzs1nc4i55adfcfwjr2ah0q0j5zvk7t3uoe2244fr3jp1gyhnpwzqmjmfnok372sodw7493pgfz2wwxspbcic8psjb2e1jyj8v2gj7d0sz2qb91fswgo9',
                flowInterfaceNamespace: 'to25e1bz9068sjotry6winf6x0syxeq7oiao1bcti3uw7rxj021k9m98tltjz4p0lz2wkjm8h0qdqw2wpm0l8ymywejqg3ocnvtkazhiu6m3c5o4sdpdan1uebx0gzshdzzuv4p9zmpxnaz0vvwk7nyjdcq7stqg',
                version: 'epd4k0sdgxoyero8ui1d',
                adapterType: '4h9blptc7mqxoma84luiirha192kho9kvdahh83itvq7mh0dvc9t1f8ez2pi',
                direction: 'SENDER',
                transportProtocol: 'jc2o7m3cv32xzdtm058j6rz29j0qb2tmn0i2fsbiu6e5l5hgv71dvit84cam',
                messageProtocol: 'pc9cff8mad66csjb9vk66cvlypmcl0gftegvz70cbf5r4dcd6our8xz6onhv',
                adapterEngineName: 'ftqogkddrxqlujj30ipqk2m2ob0hcr0qeo9rzbmgy5wwgt6mebp1vnn1bkslwz6acfu33eon5vzfs3savjmewdu7u35ljj3pk3il9kkrhqaqumc6d21sfqgesr6syd1salpau1izit7136cdm8fg65ai0881vjro',
                url: 'hchlhfn26xyyw858cknyd3hgudn0tlz7xoomdo1ya3yuqp8ufqbtqw0ewjlcbc56fwn0tn4h6kpeelwsfjxlh9vnr4iimswd5be967f8o265br6hlkfrgb90sca6llb3g2t779bu31rfrioldmsjcqjfxtoyicjsm5vaou89typnet55450sdkvzlfnlgdq9h24bz0fjifz0xsz3r8c24kxumrkemm3tewt9qvj2kbwo187cdqh68bp1gswe9l5k8x118xtvv9reru7503dtlo7rzzldkbup5rs3q1ff08hdbsjxhbcnwo74nxsxrjzz',
                username: 'hevttezgrs9g86ktv4p8eehbvp6hnef2matu1i2ocb8nu3774tdsdwfdn5x5',
                remoteHost: '3ksqmxn8qsruh40dfub1jy0ugaumbon755dbxq682k11xwx29l2xcbfdcfhvlwa8olegqtqt7cignp939n1e95vt7se5b229xefqorhx7uudfuzk56am7t5vmrwdbf4lxhx1mkriraezwmvg1f3myhlt85ows0h1',
                remotePort: 2127953979,
                directory: '4w7sapnos21sc88v522x2a4vlrzbxbay4hv93zn6uancp5ibp2ivz4gk85mdgby18po7ugnm3j9gu4hiot4xecassk2m25u2xdx7jioxlqo4eftb0xfwye0uc70mrgepo6ssk855712x82d9exd1mnytizo9nklrbklie7zlwdlk4kjc95qrxlmzaqy5kvpbynlqfiphih9eqhevouuhmkxl8ecaq6pkscxt6lj51lhun2snnbuz8jd1i56yfeyja3m4nrz5t37smyh5j13us7b7fuoo32b9lz9q0lbo6933p7gylwf23ger6x2dc4sjvzfqwxcpx36j14krkfkwq9zjolnp9qtxawpd3rerpthcdq1u70vflacx1uacmm7oz3ni3ki1madh8lexxjj5z1safi6qg6tgha6g7osop97rde6f7d42fa1yh8vlciw6pir5x3qkvmv9usp20hirdud3obcy3a17qhop8zfb37aagrvd39rzn4ryhxk9eh0ff8cwfor46jdb5nr8ijwbt8gka8wymbw72k0ygr383d1x4m98rryovz8daa5964babvi0aw8r98rbmhvrmqs2hs3ea2lapgkiqbar0uvj1tjok32fkgq29gpnj5rhydv9qqoougbfc18e0xhvyh1aev3lj4vr6h0me7lznpbae7fz4zrx65nesrdc3vcq0hhpgzfakapoa5hkldki9fo95ro37vsbhk7azud1xffx47hosm7t3fzwo3lqy8d47bfykrl6aw4ynz1uzvy1a9iauc6ji4uje7a9ab6rvwebc6ks73gttpr0o4a2hyhy80kp8rrf4dpxh6h0a7vo549gn7h5mc3ylf16ug6tahufzca5uqhyhwqru5923gx6osj1smr9aorn4xok78adhqywyb946ye6ab5ytx23p0jerrckh7n2crmds3ieymtnx52z7wov9pvwu3sxlu3uro8h2c97zl8umxj7g3z3xs1o6mefzjs3jy9s9o1812oyu19x',
                fileSchema: '0sypi3o8g5b99s0hj70drvqw9kdurnahlu3ij9j3dto0dak8t0lorme8ig813bxon41e6334ru30pn0okasuglypmv91k4q8oyenreh39uyqcymyyv1fjbnlwf7hj8wd0gj89lpt6frewd56q0inhayqj164qbe3tmiz42ansqojt7vzuh31j9fxt4l7vqpne46cr90f8ebnoi6cf8jplnededtfq93eey99y9yy6gzt7fiwg7bgysttggu6q4qdr52lp2qd2soxx2g5wkru8lsjtra3dq5f1b4lm057vcso26dp51mma2or2j7vc81mkrufhyqqp7o4qkaih138up3zieizvskzygim69jyawqxdaaruwv1ev004gn0hvxkndgcnejqplfbx67efy697w1iexya8l718ha22ib03gox2phjql742ox9pwttdhe5ajrjn8h5nsnf6myoq90cwigcfmdn08s7qwhkgdscv914rn4lpsvxi4rwhd6d03dh2uf68y9peylhimde1s0t420fqv7d0b2o9lm8zfgr6dxr6uxahsmy1kd11xopuxwoisd55jqa31wq6e7ipw8d5aho02efh0k8999deutwtqfmby9opsfwnw29jwmgh9wii2ce4ay2a6virchlf2oi274904wujhwzb2m8qp705hut9r8cl6br0569qf8ezr0ptaolh4y2ubq0hiji9fn0mlphoy71i3v10dxzrg3m8zumhbrncas0apzw9bqy5b8o6ww8vtoz3cct1aw2j1a186aedpqtq9huk4mlnxouk6v5c57fadjzgkxcwbxrz0wua2cke7rnmdiar7tjvmv0v6uqerqm08z9j23384mzf2ql2e0p60sd9q57vi7sr7k49hfff5ztqdviq4bm5f2ust0vzme4szptuvbj4y9mxtfg7mqbg8x36gwkeozbnr6wm79olyu55ivr3q9n53ewy22j4zx9bsz3mhwg203hyndyekeu30o6gvya7bhozjnw',
                proxyHost: '8ebmo5bgpvapds57u12ioxzf7n6ybiofmjkyj7drvv9996q6g834jt6c3zfm',
                proxyPort: 7921825503,
                destination: 'x1v3vnyoocwcylt8f223yb3l75nj1l8b3yescs7p4dkm2z4b9h5dn6a7j72h6uth8ppc1h694kop3dmfktarqsqjsaq2h6n50wrg1u6r7dumzkv7aj5br9m2j66uo5jlfwh32llklz2bkwsk3g3022462od6fy1c',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zqjghadltt0vg556admnhuqsa06hfjtjzdpvc4dooms4g8htu9rxv23532v8vp2g4fm9tbx6khugc8as07jjlzeslgen4lla2t64w2zwzbxbjkxl5sugqta4eiv1xn9h6retxjo46emp081hcya2s44m2goybvta',
                responsibleUserAccountName: '4n7hlmcgvg324xa7y3t9',
                lastChangeUserAccount: 'hdbx5jhoodee457q0gbg',
                lastChangedAt: '2020-10-13 22:28:17',
                riInterfaceName: 'ph26fa6fjqnel1rae17pvu6fw9nx3y50434m3kf1j14tc24cfagu3wv38qk2relfdiqyzss7mrgeduqw4xsgnhqzr7flizfkcjbe380v9aeuergzua4vk1fu94hqtzstdv3l665aav18jx6qpwrgx8zse6p00t15',
                riInterfaceNamespace: 'pkgfpusqblpvih7mo4rgspej5847kxsegguiy4uebtgjtzu1nazv55xm9vx50zaeuc5y4bdgdvxcvv7f61eiig1dejkrkw10st0mm5o2huz0aguq5x87cg40h9ml1p9tbktnjw06suw6a7pfnc4qv1p9neeqra9u',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'tkufmup7uie1vxn6qjlz3h1nonaf5ggoa28qf47v',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'z84d846c50aavsgk4lhx4ta043ewjhg2jpgaxu8nqii0m4eyd3',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '8bqhyo4m81qkfbtdx3nq',
                party: '7tr4nx0454enciqro5dspplrpnmac2zofk2jh34l6nmfweftpm8qlcgxxckd5kwwhmi59bruiuajk7l1vyfh28x1x1uhm7vfq2guknoxkhm5jnoquw59yrvyipp6nb93j47gd70y6yu8kgzv8z2s2b2xkd78xrex',
                component: '0h6h7b3f8fshgd5582owaettlfo1bfo5jpfi739zb29mdtsl73c4jpbs7yrhod17gcyqovm36t4xa9a0hlsht9h6u8s9ywq80lii0xx83fs2hoj5jwq64t0dmvu3g46cj6t3bx9w8hvjd0peusy24dmf5na4ehui',
                name: 'p6ahyae4t74sp6kotffjq6kahd27vyt9dzd61fk4mlx8gqo356v37v0sh711cqcl2xcbudk1tqetqoyvugi4mjechwucdx88sd72dw1qbggacnkb3rb0cx8kgbjqlqkjhzux681qlthlphobg9r67jmh7c578b7d',
                flowHash: '6ls7nx3110lblwrhxlci0ronmwhibmjigt5mo9p3',
                flowParty: '985nuposgvey46kc7h6b3op6di62qylbzknte8xifyt5n9blmwqdiyib9q9j2vvb4dg05q21h7woegjy73jw38e64k03hguqb0uxch6dpbggc1uindnx7wwl7parvqdolpwu4r8qnsaqt2rwkpz0g4s48qiamoyd',
                flowReceiverParty: 'cwl5z8nhoger7wx77n5u5eoddiyopee5hdxwwt0mta0hzj81iuufeahef11rv56uk8q9of1o2yjro9h4pcwp8c58ec9ivauyki3ywybhjsmfbki2bkqyklakhsgvc6id1uzspwymuyrdqbbmy4sx3f8k76sk4hvt',
                flowComponent: 'bp0knskrioj717sl0twjqjz15vwgukt3vyyfep7zqp5zn0kob16oo8j9akpwqwnz1x1j2hhrjfgj9ixp7qw4jhh3921cr9ln3tdkacwjcs4m0lkeqdtkqaqzrjt0hv5yuy7kbxglsgh70duu9cq3o6syy4wjymv7',
                flowReceiverComponent: 'tlf7bidac6hbw266denryc0xy19bxhet06q3e5u0aiaujjacjf6z3yjsjipzd0sy0796l9aip8wmdtwenozv7it4upylu1ddnwvqey5k418it2zx3e25xw23qh6r5v5xqvwg892q10lxdiitirf6wgrt3f0yx37no',
                flowInterfaceName: 'qw5kq40pbcyx4odj59jwjw2uox7qpurnm5c1cmofyjswp6hlphy8yvzuu049195ijnqdhdmvj69z33m3bgj7v0cto3u1tpzaks3oaqla0zgq5kaq37b0hq1x93miyhc8ltgp8z0tvw1wn9jirz7vmnozt7v3h31z',
                flowInterfaceNamespace: 'qponhnwk7d8euhl17sar2l2nk9usg1bfiu9hx6uiz1wsbgtow8f3fwpbanyp66bqi8tbys4ya05rv478sl95k2kkkxw55nt04hhdnmg2f44yh33fxn4fg69onr2dw5rykn16nlnusnc625qpo8tsj7solvodru35',
                version: 'bzpf6lcpkh1j98a7wck4',
                adapterType: '1l1i6pcty9sporri3dtw15k41nfajtz32nfxe54acju3u94rzwf1a1vdq19z',
                direction: 'SENDER',
                transportProtocol: 'cl3xdgdhd1v3smgrbmhww44u5ou3vhlyfncgmbk6vbp7s42smtxw7m7i6tz7',
                messageProtocol: 'j8zjk3vjt69fc1kjcloyapflkc2jd1hpo8ezm9xj5wk1dvxozxb1j14s5n4l',
                adapterEngineName: '82n9v6s5w54l7y2zkpef9af6qwc9prkwmgjwwdvprrebqyxhmpzcf28dcax5revjdouhsmup43rx8hzvtxbtply2nv8l95ihr1gh86dnzy20jmage79c5qry7xwi93wzrrershf2ahy5o6nu1pvrlekrxi41ogdx',
                url: 'eelv56kmvtqvte851fnzj7xb2bzvc6q6ouanvkirgx8k5kh658qerhmu1witpepa8dcpujyixv5mh9nwlt6n4lxjwau38vh0a1vd7zwy95sk18pf6h680rfexw7ejx9vq28g2u45k0rehzvcy54veyjnlaxg96wslxg7nkhv3gr3a075tm8ag79omijh59086wnfcnt02kkrvyjnme5wtws75iso12ko9ubtxs9vcekeulzmvm51sx2hxo8ptphxylauyfkhl9fx3s0fqtz6ox8zq9xje9g5zh0eqz2ruddom3bhxvci40mjl6qfitc3',
                username: 'qbx7xfjy7tob7o9lpg6vtl1ur3674a3qb4zcegce4ulwjyar8141opsxplr5',
                remoteHost: 'trs4nf6fcf34htb31mvucv9hoj95mn5fl4a27avl9rgye65mb3cqj41sduawvmn257eslc7ewa26974woujcxk7x2hqezb74pe8t74o3reosfwc9cxb0ynedvurzm96o8hbzmksmvbfxhtrky97r58ys6j3iw4kw',
                remotePort: 5575056620,
                directory: 'krkl4ujxxgl197h002ie4jjg6c40z5o2mvba6v1v0ymyse7owv6fhbr3z1dwz54rx8gva4586sfdbt5tsun09e72ph0bnudxlna4p91ukgxokt2axqjdergfensos1n9dvr50y3irwbh2lbv72t7k2dtcv6p9jlbqvlfxyye8xr1saikex44vnr00yd9n7s3i4xahii2rvno1a5f9e55mo2hg9bu1l6e1xqgxo5stu9ih1uypoo92jor25nxhp3pigfv24t56wlc3arvsbo76rkq8va5s6w7vkdp206opmvgilgpuzgpsqdt2hmunvhy46loa3uuh2ulrxlg7au59176ll8ppt7tteaajym91wdl1t6lvoi6srgh9ne0iv14exjii0ws83cejbejmoqmltazmce6wb6j2curagndgmymteiuio322hiq1z6fqlocr2t9jf0y19dt5xqe9k530sd0wtnvfu5mta5mzc9kl9js2xvzpy82jmhc2uo3t3sgj86sbjvmczuzg4e8noqqw60k75cevywb6rlz9v5tyx2th0zram8a9l2e3lf3w1mogv96ll3bghzp8ecdry02lh7pmnomry25nz5h7tcu0jvnzyurqlleewz3vnzn7hf0h9inmkb7wm8tfwlvw26vjhwenmp4a66t2t9ivki8p1ko1tp81x2evp0l4ofnd8k3xtiz3kmvh9fk40qwcg3qwwavdgomogqft2co9ptpf3h2v96jpleav1ldwl4som9ytbvtt6bbi7hd4im9uml16ztm3coro9b7xkabi8u9zlbsnjer3zm4rq77se409xd7aim9a24xifoj6nhzp1fid5nw6vvsixfvp4xfqvji9bk3ow8tfrfkao7xwa4uh8jll7r9owgzeeb7qnrotv0p0wyxyjiy2efm7e2iz1vwcqe5he980ubn81oogcqmpu1axnd95qbns6ajo5xlz9msti0w6nwj9aq4envkj6917oz3ff2byibhbsoy27m58eno',
                fileSchema: 'vgm9u5in8tq78qv1dkwynxcxwixnaicg1ih50cubh2tvhz6ff50od1t0jcl9n1nm8myll0wd90yh2cizvip30mhgu1bcxxx5x2oorp35n4x8fglkddul6hlxjjh6y3zdxr0dioutg04ok3i1ort7szqntdajmqtrmis5gfedlmlp4xlr1kb4gtkv3cxeibj483e113nwcsp5evblohpm4vpahc5zkam9yn8bhw2esxt62jl4q41wf9ptz3bfnggq2a0z7aozxbpc4hs0meuq2bqqn74rznkeajwgwxernbe4r6rt2qhuxyloqc1lnwg2w5tn95dltl6i0rqp08sblte4daogboavasssli5qty42pob4bav22gs6c7qw2cknpv8kr9b1atpf2k0ajhtl29vj6ht8ma3u03q4ltsd95n5dyn5gub3i9zjs09qxafxe7yhqkhpov0e59q54fkfs8xkym9jn8lbilxxqttmw99jil42l2k004g7lvh6pp04x03dzlekg0eao275vtnf8cy7cihcgg4f7co5cudl4zbajswvyd6bfvtynbcprpzzsxhny503urqvxyxh4ufmwkqvbs5cu3ebbetzyr5v0aqlzi1c1u5z87mnacu4jnckjqs26cnvhwhzzu8cggat6uysoepte6s545q7ww3fo09m78lre9otahwafgmumgzfdvycmbbjrblo02fb5m9u02duxgn38h6gxg7iolls0f40ygkkib33fkfbixjkxsydlanqjr6w0j0s9yvbeb4bl3x5rfc0pe7gfxssl3j0cds6bwm3zm23g0h7vyl6j9luqy3fltcppr3iyzjcdyeyfwj12ocuwmfy74qeb3ff06wpf868n6umupb76it7d30o7t57tcy8xk1dgd87h3ipoave0knztzhhz5uriyuq9lhk1jv5ue1tw201d1qw1fje1aye0fxumip9586cuwyw0us94h8x5agw78q94uuf4o53ev8eeqgmnlrv6o44r617',
                proxyHost: 'j8awaetmrwk8lk4bbx0rkiy0fdtvem4j2m8rxue9np4r3aliqob11dfq9id7',
                proxyPort: 7163454751,
                destination: '980vrrhxxw2wiv2x55b1dnymxwded32g10090h3smnyfpsjvbd5xt8fl16dhg7n9pn8izdljtmnvhinlghlvmlu8h514p554t2l78p9tk3w4ct61kjbfxwiyxfxv799tza8ksh6t24ugu32s4fot1l6agh1c9doh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'v2ve8nbgb6tn2jhutnh1jj9xkc0fzgfy25xvpsi0bmkck9jjf7n6byyc89utb7ghvxuci66nz6tr9q12eugiawjjyuu4hdwd4noknz025tfrnjty3hy01rn0q4aonoasiz25jjwg53zhssckkbwb29ue9d54k5xa',
                responsibleUserAccountName: '85p1viz4214v6c86f7tm',
                lastChangeUserAccount: 'vizxgvb82x19bxm0wwgw',
                lastChangedAt: '2020-10-13 11:29:08',
                riInterfaceName: 'lrcls7wbpzfef14bjvi4mufzuac8c4t7aw8vobx5rkuudg4osqdd5bcyzmcpwgtscfnw07wwnv0edfzqsxgoawmcze7v41z8w8s1p12wfljqb18p1vcl9qyh54gewdhg0ghamm7b52tk2whje67dmykf9drcf6pz',
                riInterfaceNamespace: 'y1qhc72ii1rph7wgunrf5v9f3re5in4pljdij0t20djs05j5kpp89s2cp6uc5w3s90ym45b91rixdj3ij74o46tmy76g30qz0k9w8izd4xpi4rjpz58tx1ov3h4bnq23uvhaerk3w26waz3cpd0iugayx89ufeio',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '6ssaldh58wwhunskzvy9fyj2asv1fof3mqxfpsm2',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'z3n1e4mc47sdzqpv772r8cpcl9x06xh561o8mfb45bzumrd6yu',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '4yvxpnva5yinl2ib0vzz',
                party: 's7fdi7dspjnr54030bpqjhar5h4gcvc8z08p40wk5ot4gzd510zaujfnlubhvvwws0zgccn2ex4tvtsoc6cmwolw1dhq6krbibifh5r5dufjzuiurhjtvs7e3bxm95jeaqronahwtzogfgtjsfrarradx8n00ygm',
                component: 'n90vgq9qohzzqpjkidjwuo1c9058airsbdypfuqa53b4tm118re2jw8tm8m3uifd1ya28y3ocu3ou79v8gibtw3cfcttwqf7ar7ea7498pzdly7o7qu6azb550ll60kzxe0u6odleyxhpr17xajsst2ere73mtbu',
                name: 'p1jcpwg5jr8x3zh0t4pwqrn99bxtnsuq9uz7510nm996tx6onlhvctflacavh4ofw2sh65evkbs6kvdhjqvl0izlm2f699kmznv1oj3v37xwqiqevb09c84rcyysv670lojsw00522txzllghor11f5jsw5lszuv',
                flowHash: 'huoiawduj2nvpy9tg8207iuhibamrdunqgwv4vye',
                flowParty: '7b2mi0lsxlm7lm83tk9ypckd81e3xqjd1sxzsl4sao9n8p73dim4lx7ov9hzq2sdk4gj5m8sh9onud3h06ouhlxh42tkaiax8b6tzx765hgc3m8q0xt6f18ajx1hv9lxi7kzyc6svtvvevfcwqgd61yz9w65km23',
                flowReceiverParty: 'ziqci7yt1ujbokngyqt0bf84h0z3eny4mu27sey3fczbifpzlg45p4eaje9kgqjycomzyxxtghdb5nz7p1wqorou44w3s3fh2k1600j0afp4f1qwg0wind0wt15u81qh4oyy8amt5yt55iryznzhuq8u5xk3reu4',
                flowComponent: 'rwkzleffoxczxxni17bbzh8co1h8swi75y3uazz7x5xlnmjlv53zsgq8i3wbp5gjxktehp5w4oart3rcus4o8xkc23lf1opg7rk0g6n38or58gy0a6jkmouk5nxpkzszlo0w7xfuue29wwqvai3rsq0tsgshgh8g',
                flowReceiverComponent: 'md9t07ps52r6ykbbv62kd88379r5j4y5ng3nbq6ax70ztffw8qjp0n9xbqyavon23wo0uf1g92wb7kupx2yoy3mq7h87lmsjlw9w0xfiqym893shei2zswbzeqakkzuoh5v5lqbswgxgu6thoexco14kwut4holz',
                flowInterfaceName: '9458sum4kzdtgxpr2n2whocpw0osza5f33tn4unbowjzrgilmuuxd5uhio74icy13jgjgqptcrsr5vmqgfshshtsl6u5n6byzkj7268ejjinhyfo3xtlznkee12k402ankfn5zxnmt138784dla5xjcs6z9857vky',
                flowInterfaceNamespace: 'x1obxy5lqkik2b6b46jil2kw0dh7murlaw79uiueigzr0bplk8fv4cn9r33ba4smrrjfqxq9cvv9v5dj4ssnri2y7ve04r6osguhq4pmuqv36hse5ut0bnac4tizgovdnidjbgyu4dnclcecsjvn0o5hmymw9rn1',
                version: '1y5izlsjmavdtvxykn6j',
                adapterType: '64qwsqerocja7dmy32tricmlyuxkhwx8qdvddlno3gvk1xxoruph87fq50qf',
                direction: 'SENDER',
                transportProtocol: 'n0991on41azkr6qo019orm5pomkli35hvmlqdoffgw952cox3gp8ficdm1x1',
                messageProtocol: 'witode7lwih9ynj3aaphnwrwdw6h4o06lkr3bqwtngcv9oy1wt0z8nq3312j',
                adapterEngineName: 'nyai6ay0psioiv1olkfwtgkdkdozz6yeh2qn23icb48fmr0x4vpsb1av3b1b9h4q26078onhryiuzbnd89u8cjj6gmpyzbrchh1x5wtcm91kb56tlzftfrzjvjxaclclyv1dx6f9fftj5ruaaq1kuxumndec2tgg',
                url: 'r7yxnl8d47dl9ppros2h3es4cf5q2ssaif9jlbos1xy5vr5z6hqizk978dp7cro4pymceag32clviplj6o8w9kri580yj8rfqeg44m1ab2pppv512rexjvevq4jmab0l04v5m5f6zhb4pikf92ro1edl2e7eewmfq6umo8icy6aqj98p1vel32ucbwyv18klrbgqpz96akj6wb5pk2fmcbi9qohh5j18wcnj69ed09j5zjhb8msz6x8ei41zws7ogy0emd5hccufmi7axvdkgok0n4gizzw3rrs86mweulxrx7vhgp4bo53lwkpshcct',
                username: '9c4ugvx3sbob4o0dahqki3d3vtmet96jmpjyawxstkdz2rcgkxggw9trugc4',
                remoteHost: 'leszt35mb1hqb8sk1hid4uoe2oo3i3e0krezd1a039guz2c21ewy9bwwsovzitdvznozec60p5ge5xjxl1rqgnrmjzbh9adtrp17c0uy0ha6fq62ilazr5ffi0kc0b6ogm8giwd24kubg3ya01m6dci7r5142g46',
                remotePort: 8890766514,
                directory: 'r52utfktq0kqbrutomd9fayt2gl67xsusclvmeonk10sr2agy0x84jv8fn8gb7doyp07sxa5v2nmqrcprzhsur2eliskpwvkgvvmzq65j2jh2pgemxchfc81y46eadprpailqzqs703vnrfkgcbnv8uuq5gflmt11rge5o1075ycvjmd86pkdyzeeqrz3ialgek3dgtt8f7jop656u09eqwr97ivpl7497ajnus7gkvqv0ad8s4w21o3xmthx100qz9lxwqeevsbmbd8oqifi8ojn2jikzfg5f3czzgr5o6w1k72ekbc2muun3yxjgffq4oe6u4jv35shx39f1lyfuqsomjf8i22h26u6wnlx9k0ujzckh10scysxbxhxi26s2t5n981pg2undmiw7y2dl21kascb911n4dldr4v9g7m8dxd2zoeaoig7rtvymapmd5i2m6jc3x86wk0adhqn8xwbpv1iev1t1s85glotc9kvfflxmh0wn5t8p3be5q0akrmtm8tr4pubh5vxkccanfhefolmf5mz18cpvyrr74x38tukbfs1qxbudh4ho1wtytr0cvv5tgof44qqyneftmfogqibsvvuveck0rna0euskqnx6pgo0axjnmh2jo6eijmyczc252tsnl6xxtudpbjudldymgfkybdevqg0b0i9m481qb45h6oqlmxfjc4gg574x1hjxoyk1qdvfnq2oa07gg2snpi7pisrz8sj81ru6y5ceq2tpe0bhh78a23tnedt78kmqf4rbweopc20xrvo7t88u43c0799ur9m5zti3upc82pojfyu1wiui9eel2kh01twa701j21i9c3novdcyvi3czduhawqnv17ybpipbm5ubmz5dx9zq16ywhuwja1hx0wsomyvdegp9ktqkfrwhhcoki0nz9tldot7az87ugfpr5q89wbet61nix864td6ahcxcnhmer36tc93yw6xtk126vd9h500bb49q9q47bhp90tqoxl9ap9psa',
                fileSchema: '3bcm2ac5onb5iyr6vyabtrgxsvxop9k6erpeetpl18lc9gnnhulm5v99l9790mzw18vm5rbbfn5p2xr2p44m2fxodvrjmt5l27tfq8exdvlaob8vs9b786opb63rivbdzznkfz20fgrixroow9ndh9d7y5khlfcanrvilk7fn9e6r36ktaccthhtwlqy7mp88b4xw5jdnimnghdv79axuiudjuj7lvws4f2yzfqdodrph2vrg7369w34u62fldpyi08dt5yzk1zyofpyhqq7zd8kp3z82yueik901hat1smmnji9x2bl2nm01qpomdop23tah8a3a8qywwoszqsxvpgxbeu2k2eo5g3x2iwaraky7w1zuamb3rvbk6pwixw3hlnla43dm0knglevwswtd88pit7u2lbijlyecvdonnqb4u3z0dmpbz8kp6cyoe056vagyvm03xrognbqx76tcdx9nzextgq8v3r1naufekqa8jr1pvhfawo8icakftjgycr6plsa63adu15vxylwup8o4mbpfvgobhwo72fc58j6mjfka5ls0wdnq4fqv0l90y7hwupmoox02slvmq28qesfszjq8kxmb18g4aumhh07xiws7iv98aqwa7un31jxmpjr4woptg4e8nqd9hen8wozeg9vg58lc77djpagpce84wm15qa6kxx3kmrrd41jt5g0vz04b58mi4eb62o7eavahtva5rahw6w9gatlemopy444y96kk6qhzjwy2ufhfp59cr3hdp8lw2hs4vspiozb5o19ftj7znz3zxsnku99p0iqmsssxgxufuigq9th5dgeblcukk6tcy34y88dti01eonlcr3yo2mfm1zl936kjfpibfvv99aa2js9tay3eukz4g28pjhacwcq9lougjmaar1l9b7fv5bl6fmfqct5e36zbf3lqdj6dirrozf2v5218126vw6y0yagduyt4jbyqkgbty41w3w9mehh6hjpr55jxshxdkbfly9ex2yg',
                proxyHost: '4yp758opzuirr9kigwj5wm8paxwi5j4qtkrticgtaq5firoa9l0vd76m7va3',
                proxyPort: 7848288872,
                destination: '2r06fbo8es585k7by26m1unuyw3gdmzo67k0rr77hau0zt6nf5id0a5pmqx6yugdfgsul2f2r51sghonq0yc0us4mce0lqhi6o4t2wmxzpow43axwwuquqxj388oachb6oo3syemozgl692co743qau8ytx9g9ll',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'nq1yznusmd1sflx6w46fzdb1mh4f54wkk1kd3sa2bu9xzmhte75pzlwlwr3twh83pmm1fb0sbcqb6ihijinbz5puqelrlruthrppsn726kmfv0jpfx195vuupv53czfji8swrt6t05hydi5n9gh2z1r8l63kif7a',
                responsibleUserAccountName: '2r3zlyexq7fb36gwiw93',
                lastChangeUserAccount: '9jukdhhhe2to6pf4r797',
                lastChangedAt: '2020-10-13 14:12:51',
                riInterfaceName: 'gyty462348s8n8hg68d87cbd0xar7oksnfmta3tww7doav7zm9fh1xh3bbzba4wxtf3zxhr9k9su4mu2k2ce3hyjv4k17w7la5q8hfacf76826rrzfnfnv6l7g17tf5tkkbuczhbctwyligs6w5ro0d5ynhx4k3u',
                riInterfaceNamespace: 'tx0gsjaegmzgpc87qahwbk41co3plsm2j1egz8efbmamirgteatfwhh4n69jtfqenf0wwv8icqof1qjix8jvn5p47u1okky60vi87kpb4jpd8lbzvyzk7shopyi4iy5n37p9zlo90mm398ykp39i5hcxp5zy5721',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'ik35yau4dx1x85get15iontz2e6kr2oe0b9utvhc',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'yv4c8oicvwp2k4s7k2qfz2temr4mmg9rdts2ylhhse3i9xbpp2',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '6a8z5uvee8hf76st886w',
                party: 'h5lq07o5wfky8w2vr383ln3sdtc6bdsndn4fluxbabi0ckawygk2f59gcbabptwfi8i4fevem7pegvsz8b6zui2ya6n277gu3cp8i1khtknz503kybh31req9ldh4u8jsvnhktn13g2ru8xmmwz67vr70ek7vdi8',
                component: 'fmbtvghqgp3ud4n3dwvhsgykczyrxqrn82vls2zzdsys6mve6c0ssxmkqhl8vn7jtz9gisujfzdb9czhs7ga6svpp0noiqttwjh8thius4trqj9dy5frrlnpx8osfgldmgdwm5hj9czo9mtdg2yeoq1y618meg59',
                name: 'pc1gnh312nk1bliqlscf18hij5oey8m8a7n4o5vzssv3hnfhxofddfvkz2tpoyxz3liun26elmtk17212zp186mw6ow1pnjdpd1zwlo949qctb6b34d1awvmxll9b24wdq40c4va2o8xj8ibob2opbe42mkxfkif',
                flowHash: 'rqx5xqrx3f1c6guzzzg8j6nzio8omkixhwzw3u2q',
                flowParty: 'bfn5uyn6yxyon7x05opz0dxwmtqnr2oioh9a6f6w31rs6khksiayp0x1aurjdf6ngpr6iptgygn0ut86whpiw44ia799og6wwsi5b1igtyx0zlbyuih37x5wo5gzxfnh05jku81wghyqgu56896el79l4800aip6',
                flowReceiverParty: 'qekbvt5uxypoiaagz824ok5wt5ytn2pjc89ku1jqhza5dbmcpdhiz30gba4cufvnch6z26j92u4q7jdvdof9ljw9sp3o4kbizilgqmbl5ptp4gv50mh3miitoj6rlgbp97xi4x8oyniztf03a7x8ybdq1ihz0yci',
                flowComponent: 'alh3bgnhgj0goompg0ou2aqr0lcf7ccjx7fgtkmobjak99p9qsx3uhmqkk8uwacjikpx9y2svuq2xu7jvuo2aavrach17gmk0npydb8mnktsrs3tf1jc1ksavwpnvv9uwkl002wz0hxh9cat13u1y7nrlnv47o0r',
                flowReceiverComponent: 'dz3f2wcygtk4uwyri9rk43gyimvihg9t6oz0ld42259w57dgkz0zh6p931beekn23bh59qz76jdf9pu02afebwy803vxtiu1nuh6dl69hcpk61v8nkz1e32d7s3tugphbuhemxdr16208jcbq72wkh877dgqn7vh',
                flowInterfaceName: 'npkg31znoty1tm03dqvv3f5mwy1zscuoap43xq490le4n1aca18o0xb5hcmvdqgpi2052mk4q6koiwo3tp3gys4k5gnr1ufkqjv1rmg5u3t44spt110v8irq7uga0yfecihu7kqma1nzzo6ivnif1hrq3tlrrpin',
                flowInterfaceNamespace: 'u6r63s3zu6gmxzd7upcrhfasatoqtqrl1f5k9qvb3qlg9rrmtrsxyu5oj6z2ymdedplb99vco084yv55r3nqteojix86c7lzja9t6a48efkk5234uop4pw6o7u2niejlf632odxg38qb0pgz3kqbshun486ui07gt',
                version: 's1zd7y6o4y7wsjctny06',
                adapterType: 'm65q0s2tui93i8t8ps17r09wqih9m0bynjfbso3qcfoi6karbklxfm5xmcqh',
                direction: 'SENDER',
                transportProtocol: 'qnjunb94zudlts5z8eg10yaiuwgdgsd0ytdfsvhmtut4x0t0mf15zkquof1h',
                messageProtocol: 'grsa38ugcu49dxnvz6jgmzu1twr3vz58l9d8fvtmzqw5h3ifsfwfpqgfff3s',
                adapterEngineName: '8cn3dfkswbrkp8bvpqfmtsrgigfnghn7m47amzqnjctokhtqkc0mclljoebun3q7ynxl3ltt0aiw4nphwzwvjua34ffsb5eb2obrbmwa4tj3xoqw3d47vecwduj0se82qezyrkmmlgo7qslykmf98l871ls5649k',
                url: 'abxg9szjzz6qfxanb8mo4q9dpaj92fduhg1kjvlun68hers4rw2xx7xsv2fsvqr311l1e89iffwjc6rrkety2eq6arc0tu60buln6lo84wdc70cxs1197rwksnhif01qt05p6tiu0h77msx23dvgtf53qdf6ohdqn4arr721tyxac16g5mrwfka1986m1fumzcsuwneb3dp7newf44qz86y1vclqo24jmajagdyoq7w63lvhh0rpknwgvenqr5yjo8du1dhh6ph9rfeb1ftbztxki4bnu72lvt2izgw81xnm9ecgi0d1mtjrjaj5momy',
                username: 'okfznnorhzu6dfyjvakwbfk2fdkhytudf1y44s6phqa4iq2dgxbi4pd7uy81',
                remoteHost: 'b32csz7cmu1mq4y73ukjzhujjc7hqw14e9vzpuhy0uld30kbsv60964c09ns32q6tfyw3jztzzrvkrufm2yw2tlj3ckeokz5wu7jq6mfw66fhklp3fks3aogxff768b4s9v8xnnbe42qx7mag99qqsl15pctnvcn',
                remotePort: 6924959997,
                directory: 'aj1wfyepmuxszscci3u6r1m58f3x5mc1c33wfrybo5e1z8ux8gnyxhnp150k1uugk2jaftmy03y61frbtovp8aqz4o421xvceqs6yq0iljjyq764t32mhq9sfimde9t87p0d22lc3aqwhj8m0k7tvs1wh7pffzqqd54dya4vwamfslqy8n9l9axvpwmnb1izt16gl1kydfq8s6q0vd2vc80aob8dyerqr5shm7bddm1u0m9bd7jo8ezg1gnpv876yk5bbtrdrcntdoh2fnx3ebuuprxv9imoh2x9oyrek42ibhojb0ic2dvyjvh3zf128gfvo5u1kgzrjqaa373oo6k6an9pjqenbe4b0lsm7k46ss58e5xugr7ye2lyo9vxpvtxp52tsxs9dshhf40arsq1yzgkvipeqdv7h0fe2yct2v01mure7wt6w2m0brxkptqcn97pxv2u6qncl91ertd6rys4o3qp03sktk1wc6eg126778usf7er0mxsbbgfbyekia30m82xex0exqge7rirpp0k17ayw63mgg0vkpj8b88ckgf26zu9wbx3eggajqeopwjvbb5s6czpazt1v68qalvt5mz1vap45f9kt42mxbmdvb2pol23c70trifsuedyshw78xsm2844nebolcggbb57wl28apyz1e6a7j39p7lrd6skhqu38udomv4l8b7tqfalf2b1yzlxd0xl9f9vyv8fp6eoqz67vy8ej9qps5exh7fauyhgarad99788fdgz66w4vuqoksg3cnbmuvsj90ncogoz0y2iax59xt7sc741g1nfp5xz0wd2ws0sri9dl17bx0t8mo62g7tep39u51y4wzigpb6m5q27tjvqa6vxzf6419rmzrg0gqny24wfsz85ollitlruz9edarvllytq0ggb95kfbejqim9pcjrxzmakyzrux14dcohsvdwz3g3x9va6e2t7yj3ss635iatwr51phgy6ztcvm196p9xk0bwbc198q5xa0iz',
                fileSchema: '1xu7z7edr8d5s1n6qihdpw76no977622tluj2yag9z2vn3n4f05zuudafbk2ub8zjog60d8d6kmhtwed4iwx4q51v1dkerlbg70fxqp8lez30jantmsrhi6g25cvwb582cdvqmvfvl0t5qv4prwqzl2c9wwp47u8kll9rbr4na00f4b9sicgwbe18gb0u8lir04t6xxgdxwtv2c45gyodz7jv6khejspo1ltm15repnrh5ddy6yxfn80ecuxz1mokb6ob5figjaawwsk2cyz0zwcc8b19wc8u62rg5rwqm8vtyz7ya39g62i137emrp39dop5i2xezl7dwnenc23ekajem1gwxsnvu5virm2e9uvaaj362bvr8x5wolwm1pq4wjdoxnicztemebr3s7pa82qdl765uue0zgns5f6cfokboy3fnual0rxtefalifeblleoe5rmlha8oakxcfj8axb7d47wn136rdt2b38jcw95am3xcshgwo0qq1qhtws2448uto156n5o0canld8ig66jw0hw5eof7cchzvhd65o89ol3yij0nl2ct5ot2dwt2punbf8pkxxuukb5dgd7e0feat7eys5cdznxcitodwm6dgovo7mpp8uchkr4jkkyot3ummihvqt746bimnz2iohdasiholl42wrfpcg9l6c65219cjhm7f3gvhcpb3ylqp5lsbvizlacojhxlcxs0x9hw1zres3v4cz5add13vpsvhkwstpj6tj1789drbaqh09w94nlnhngd13tswhbnrze0lhg384n1ntbe4ogvm6t07e6x4wrusfx15kym8a1suy3y9dli0nckh585g541033jo2pyrr3exffsrf08kfrf5jzl3z2rcs7uefd8tunblm370c3kmk7ru0o399dmzpvihvhr4rtvnhy4ollewmc3sn08r9i3jq0l5a5810cq4cy3mxbsfspmd8gkkyqag3clzp3avgf637w560vqwgejvlaqxyrv4i7red7w2d',
                proxyHost: 'dep2f48x1x3110hy1gwdr8hqlvytpvhc8f64d5wghi7sllz6jma7ebnkgiyf',
                proxyPort: 8313304812,
                destination: '7pqnb5y0hyur7jzrv70p0xdgs2u357206lq06x4x9533783wb6v8r9t4c3vf1msa14vbtf1tze0717aj3pq7cm415u5n771b7atr1ag5b7hktkub25plqe3qdh15kql2xh9cuj0398t5kqnrh4dgz8gsl20op8o7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rvmvuphjua9qc3rl09vuieqxqcsj5vaj3s3mcc62hniw9a9kh2xbkdkq5inmofh7navfoifhp2wjahh0p3733loyg7aqbpffwe8do4ahvee9u19lkcu5y5rip1mur96igthil3n3f7p86adbl5z8jrghialkgoyk',
                responsibleUserAccountName: '0il848hxwydph0o7u2is',
                lastChangeUserAccount: 'jxjb0czcbwq7vkr3ov4a',
                lastChangedAt: '2020-10-13 14:25:59',
                riInterfaceName: '6z4iloi1pjzgwh9q0rpruq1nl1n3b5qm60vgiguc5mhdvdic5r0c6ef1ias1gqk4gopqq9vi5mjfdtuezrcshgqhfq7i3k3b8e9pp90ztcu8dcgcbcw6rcqzm16r232h9jkoem619nl056zyknyvqxcj6fgy6s7o',
                riInterfaceNamespace: 'zlx8m15inihuilq288718pnsjm4mdeiy601t2uxi69lzeilw6imxy29w9vpmqaay4jxbq9cbix0ka2ut1q5asitwnip6xykjfdp3kcpfd41dioiyfdub6l07ajhu76mwly4je4b5gil0o6x1icdp3cne92qher22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '9mhkt57m7dt5r9ypc000upzk7uk9spo9oxvgp4cu',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: '0w8k25kub2fe6eu62p081ogh2elw3rv997595ypfb8ytyd5ai4',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'pede2shlm46iwhrlz3tm',
                party: 'g63tilnkri66tujc3ndzs9luy9xm4gm1sg9627n5xeesmxi6mny1p7aahwncx4prdsn2ktoe1zhvzvvfq03vpzu31ipq9a6s521spq0zfb4syyqhgryt76hzso5aqc2bk4r8b6qtaiqubc2vtay3irv1xkfsk091',
                component: 'c5zu7x5ca10qgoxf1u2zn7lrwvqe96bwan88v7y7t6l1bi6cxc26u5g7d7l1gv1yszdluz5c0d8i67sg8lo2jg7n7k7r2pj2g42zum6ftny0lwcomii8dd19siz9bdrct90v69b81ehpxe1z2187ge8kb0bc1wft',
                name: 'ynx2j5bq7dgpfqg8alrcjbv5v8qkdx62i24ij293evo1opz2avw4j9d2ljkmarqb0jpq90ksp8rfaa99q9jzknb7p7o5m5q36q3g6b5hvioxsb4mlnocaqxdkpi369awlo56bgos6lwtyz1ve4huql5mso3dqw9i',
                flowHash: '2e4eqws6vc88836dc5pdl08xskx5kywr3i3uif8n',
                flowParty: '5ejeczl33brw3gv8a2dueflux07cvckckt2akdw4wfvd8y99zj2sjtxybt05yfavtzurqovvuqab3mr4i8s4thlgjnal88wvwx2xwvhrfkdx749wenroo0f1dqe2ufje2jiq7xjr3qt0ngb0jcdbxmidrp3564dj',
                flowReceiverParty: 'qppavotwhbnekmtyhh7fhi64z6sh6ns14a750uued3mxy8z7ez03dnjrbzwgaducyw6lnsz7rmaij17n6q6en4vxmzl1lp5yvudtnr8gek5m4zywpodkh7m5o85ernmlpbd8ijdjyax87jqg6p7soc5jjq8dp77q',
                flowComponent: 'sr1nput7sxcjhfrzvyd71ri8jveack9r9h3gn0ncb7i7xq0wjbicihbhm7m26qnd7kz3udad5culzmsngqvjvyo88xla77fb1nh8mgour2geey9bgx1nc5gvousuvlhl8qaek2qn9rkqykulqcrso38jjwzs2jze',
                flowReceiverComponent: 'yc6wl84yt3vp88mq419fmpujuvxht1vjeokqca22bc9wvs722qtcl7vx3cqqxmh43rfk1q4fe0iknrnhv12qqn06as7xm8oo7pafqz7b5y8f262kmvzly8gi71hh381k23qv5bqd93v1snsz7834i8vqmqg37aes',
                flowInterfaceName: 'f6lqfdnad93vrczda1fiiupckj8d2e76givoemi8qle4pg7j34fvtgjfufqwi2sfgvpk7oa166lbkj7q916k4p32d8es8kje7e38yphjh07gx21el3zjslkbi43vgpditd47omor96fwwickurngv56bo9ip4bg2',
                flowInterfaceNamespace: '59kry8yeit672epij5sy0h6k87s1lmfyvkqxglj7t0wmdhgt1qv2dpcycg565gdm24knr8qwfueomtjlnewx47zj3oc1ewi0v7teb8il63e3vfbcgtzslu0qohl2n03jmnacub77el8ccpyze0i59swgv051542t',
                version: '2y7rssuxi3dx443bt8409',
                adapterType: 'lmb6ygls2hbaalxivx0gfc89jlv0j4hxrzvswflva3q7jvotxklr2f36thdo',
                direction: 'SENDER',
                transportProtocol: 'tx8jlr2xynjv8w2xwc6w66ftnkgnm6rsegkz4wn501t9pjf9ayeujsgud6ak',
                messageProtocol: 'fgep9r6cljdzpc2visotf2ewnemc4983qff95gub9ilyracku20q1tqdqx8a',
                adapterEngineName: 'e42drezo6ny26cvhbvddp6gpcgspaq2l50v63nbitqycckol9b3v96elpcfm3ph6dfviczq0beia8aodx56j6rbw14k3ssw3c7sih9xi47u4zlzh0fmtxgxy8spmmij12hackswg9t89a11wchktrk3m36pjdd6a',
                url: 'c8vbztowk4406vvwo0spf9tgen7yc2sl6q4mbq3mmezl80n3n3hiperzfn0mg1guazzrsl3cix2szfxtcynkw6yjihuwm32sqc33xg3w6d9aep7jmp481tl6ru1j7vpglj1gdnwoqs2jnz2vgfavx6zzd1yvhquf6m0kwpl1zt7pl0g19y3dt9wuovgudy51yr7f6luxzjnip43el3826pbx4yalrd00rkjbocr7efkkgjpocsualqkfyh0x1n872t8k2m3i2uazxl3ngd3h67eunz1gp25zksuzya5wejz0l8251qwk7p3ruuawpbw8',
                username: 'm9elbm8jt4w3ke38y8pcftwtaafxls4biprjxpzg2qdkfr56ssiz3lnfdrbw',
                remoteHost: 'z6ao0idc906s7k1reziohpqi0j4j3l5fb6cka8h21ez38ioqi6e4jckygxxofqe8ule5u6t66sdew1m97kiyvbk36biz474c4n76wojh9zlupltq6ebl6xhx349ie2iu50umful24kbsqsqrci1j5cpz1fzgpfca',
                remotePort: 9615004149,
                directory: 'l7gnwsez2cp1u95qtz044ik3xh6u7rj17e6bdsl9zxj3lfpqqiqugdpf4ski6uq3vgs3oav6sr650x1fvkp9mmhq0m090ctu72ef1eieth32lvvfvvk2308bdumae0f92s9k12bxotczx5hrqd2pm78c82kqbwgwvvoc5kfv8rgf9as955q6af9uh41rgwhoz490ln222p7tirqzzgpi35rm5cuo71piiv2pzi0qcj9lne3ow3v3f2rnycpoz8qismgg3ovzcijpkm4kifc9l7ohl27fkqvl0z2nm0ow4un2yedxfd5q0jarnkedtjh6m2w37hzxz6atmdk53f1e598wl6o33hha9759df9gppmqp4ls2kc4vieyry0hjvu7jqzd1nifn8ansi7wr1wo1vby9c79mvnsngaba6yby440ndwe9sis1odfc4hblwbz6bqghmett31wyv7ylpx2p9gwgq3ilb0lubcolvt3uia1ee9tasfp1lxrxv12u7uzir3qwwxorcvmt4pp7t1azbr3ttpipct81hisqxrxrknxb88fjh9ajq6hweawgagv3wyew45x77v5dhw0ouidxmhkqwjytilwnq55qhgef4wk6xbomvlf9n8cn55npmuwtr6mua7lrhiaygbyxe65iugxxq3i3d4g8uksqq2pxeu9ll9j4g37z905liczzibeu5ys6cpo0evdxfrpbcjs2v3aj1qyoygfbb8sqvgv9z62c7otnl10wkdeekn2ijo42pi5zrxrk2lw0wiu22vnbgrlgpp4bl4p7ggszf5olv9wfpf55lwivd6i82mb025igbrwzyy0p6e5nkc8cx8yxtynaas4ara354mo9l49y6lxanac11jpfxg0ncrrm0446cevdl4d6f7tnqa1s9l2z67hxml558v7v6xm3o3skqur6owawiec8ahcr9nzdrwg6b6vdtngej5kcprk0a6dxj2ddo2i7inol9zc538yd3urxsubtomvb3hr2o6uky2d',
                fileSchema: 'u1gbxw5ok3fbxzp9k2g1nj1ao7gwk8k3f36olllxsa1i6lmfsfvgss4vlxli7622thy5sh4zmxptrcq3xn377barxh1sqaurll91gk43w3oi6e2ekxqcrhpbw75n2apfqbkp60315qwhhc4e8v6w91bk5gc3tdclrzn385nl3id49y4waoeah9dpklpttyo2f3ulw6d8t8rk4cigjuxqqky2xp124q5c7i20okjpznfyxb1rjpt64a3o2ifetyv6ud544y0cohz6rn9s6bjpqsnrbz1hfdl9ocuw7m1nqsbjc743hjdjhq5fhztwx366d1q4qva167655lj2jqoql78pvd7j4fwbc746rigwvuzbnrbeu9we7cf15rxeqngye5qf8ratdo1zc732al5km8t19fzk12yxc0p7njdwk5dxmh0wpj6ldawxhzzq7pb8xbnbsu294cd7sh2vy1jllaljcedz1zlga1ve054sltdmw4zpuo8dizqts6eq1tsjix06brdapssol09oq2k5xc286mtohwr0jutqmkr0xebk19l37iu3ueng4b95yc5qger37c1k0r6b4b4nk17yk7lhw9gaypem4j4v6mm9bqeqyympc7vuov4vy8xstk2gb87wm7s609m739tw68fud6w98sn10beh12f6cwbsseu8xs4hvj7vdw8r52bpd3tjxqj3dycnpgr5t9zzzvu5q2nhfuqmfhdglw3z1g62wdoazc72eock2wyo2mgdhde1o4dgsd9n2t7cgb07pmcbixw2zbckn7v9nlvaroe6fydygw8wzb21it7ad30mu3lm3ny1oxs1dma95nvey8mjeom01iav9ryz8c23qyfd87p3txnz6rzwfrumvvcnu3eit7jyj5p1od4wh77quq7erqxx9pgyu0yocaekqtzdk664tubi4k2mvcv2rliu8hj2csnrhqeobaphhibs25f1purjkpo2ac6lfacemlowcicikqqeln3288bdl9b89fe6',
                proxyHost: '56noej7zhp9ahqfc6elc6nuszmy6d28d89hjv7b1d0ggko9oexh49ij3893g',
                proxyPort: 6207831134,
                destination: '0yuff4pen9wwfqa4wwqekryq3fr1bb47xsal64df2g5gtj3cofy2cz5ba8vl6p3sjq7l0kk4o1yh5e231898tzvkjsao3kb0s01brx16ela03n220u85hdw9a47zundn5o12a4o5nfgak2ypismq50xputsmnk99',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'e0hhginrf61e1j0ozt2m3kxkhoeay79c1x6t7mc787uxd11aqxkwtyt4zbr4bvzovs977gz50og1bei5csp7amhym8mzeaqs69f727hgi1d4qeollfi8ouloa2slp84d816fxwm9nw5n64ntnx8lfvzmp3q639uy',
                responsibleUserAccountName: '0md8h75devbl2fdkjcs5',
                lastChangeUserAccount: 'kmmltp2abwt56nob3792',
                lastChangedAt: '2020-10-13 19:27:37',
                riInterfaceName: 'xznpwok8zrtzs0xzlgi7t7tul3xfbs6lntdem2ckjmou2mz8mzv96pyusrpdbekyx36t57mnp0a0koxd14z1oh1bopxfrcxx3d3dnozivjxmhrxjd6gocmkxt1s4pnoltn04rvsn33as3vpjxy7kwzpmnobzu7wz',
                riInterfaceNamespace: 'uyqwoma6ellvo3skxoedq3wyrvc4v9fk047r48n0wsc8roryumdz7pswk7wqoh9vd0w7cp9xrs86u67llng8th59unpti4arenyarxpykzitnjch3eo2ec1qpvjk0xzxpemi6ux7vfxcx4hcs7s25tj7wev78jax',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'c5y0w87043zv3gnvnqa4fpj9exqohydyh2a7n7eo',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: '6rr5iwcsh4fxgwdqj4904ivqnphanndykfgg7fyaunnghvfzgj',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '9i3d84866xce2bh3mrdu',
                party: 'o2ors2xfnjoypfnqdxj3oms2eoti4u70iiradbsaglduprzsfch2z51q9sha3qv4c9a3raj6626yjkrm072lot0e23ulkv4hqv6so6t4hzmptduqc9qz3qoj6t8cf3poir1y7xpncpetj7vm9z1wma9em1g37yyx',
                component: 'm23oxdzct4siks9h95v5e4w2p3w1vojsvkuy1u6rss251ivw0w3e80516g58lqvv03zxlhu4ok7unsf2x60dpcbcluk6igp8iwkld1xsu124tfdsaro1ofp1bxe9al2148nk9gbu8t31ysxgxo54hqgwwr9v1ecj',
                name: 'sp7npjq7yhg4pqsmfj9hh8gwv0d9yshgn3iz5rxhe5ups4j0fno0xtiu6ml7xmg8osh763fay88g34teeoblp8uq07qdht8fw6rgus2wyjd0g50c5oeo549vhefv3g2ft6lp01fcuj9o7gu6n2ojboq0l2rathan',
                flowHash: 'lz7m9hjon4pxb7p9fblvffdz7qwimmv8khswezen',
                flowParty: 'kqefl4it8s0lfxrh5j7ojsoszarneuxpqn9wp6lj5yueghq4bs1klpxwvfwhtktoxeqi8vzxymqmt2671qpkpt4gn4k713u5wv3fckto7nlyvquolzza944iyzasbeyeumd0rfrokrwgpze5djx25zarpkjroj7z',
                flowReceiverParty: 'e7i75700r8cv0tyb5e55n4392pq5x3wavkc9l09ym87tuy5aj8r7vh4defydyxw3akqkgw9phxrajwsqpmruasyr2g9693o7ek06vtp33iqwyu8767d5u1c8ycjs3855dw1f7ynmrgma4dv48h39dzsqm0dpbrb1',
                flowComponent: 'u3kqxrvkjkquqs77og2uyecu6nvvzhkh7jid6j8azc4u1pf3tshnfesj7uu9b9ivehv43jjak787ezadrclqxdsk2jjujdujtd4u2limxvzti9phvjf9jn6avyjg4imxns3lwxk8jb4qu70uf1temiyp28jlodcj',
                flowReceiverComponent: 'ro4qfcpsnkysgaupuymoe3v7awprjngl1qj7wfqa5e0g9plzirn28t8r9ftlyvgpelks2t3cx7lnhxdsusaq3brs7gjnnaqedv6tu5ddxsqvey68hbdpq82o6twq8xz8s7aakg4dfbi8oo6hcccax1q6560fbl2d',
                flowInterfaceName: 'autfmjx91uddze4sgpoz1sfrebj4or6r3xendu3el85fujfwmtzkwroajs127a9b27a415wz6ekydj6dvhgppxvskwu376pvwd9ybfibgf2e694hrx1kt8deuthyeg1vlnvktqdyasa06ggbv16i44wkowavirbl',
                flowInterfaceNamespace: '2b5k4w0up5xlpgkxwe4a3tohjhhcj8mqbdtmnmgiez14rf4ca20th0i5ii3veu3sw8br8k8tb3qefp8u2f100y4kzw8wnqxy6mhi7hefha2ym9q9dp6j4fn2kzbmsasasbrupe5j3px68tksdikn27dqn6wsx9ni',
                version: 'chthkqpevq891u6o4zcn',
                adapterType: 'srmn41jb2tcd3mwhlfhj49vwt5g1mlzit9kkspam9pw01kjkfrvyzeps7mooh',
                direction: 'SENDER',
                transportProtocol: 'ynlyzusz0kh07tc0a3g0sonj6hm3i6nadoweyreoq9tprb7z30l6vjn04oj8',
                messageProtocol: 'air16i9z4mero2w8nyl4fu5qxbm938mf1pkzx1ro21zc5z2ixsdfnneo2akp',
                adapterEngineName: '2lls7galt27dv1e6pz8yf5hi81jkbwyyayn3xwpyuvzjzm508lq66zokd437kze61ubr5h5wu1rboqy6gdu96mjr3ipzxqw5ytxr4c5jquyndi8482k20b7pbncz1j0r03sguvirptxhjhkqcsc4qazi2l7k3ew0',
                url: 'm3kl2pfc25vh1d2yna2rwqe4256srmnay32ndwc7guie1izxqtku3fx3xh8y05mxdum7aidolb2kul1fb20ktgn38yca19o1jzz8yxjvt2oddxds8bthjxwi3wxw9md06o9l9h3yyys0q2og7whkvpjtck1h9wy6hbixyvudf00nlpzvthd75zp29m1x4dzfpsykzk5heqkqhk9kemacuze0q95oiz56kb2elbo4ab9rudnj85g3xkwfmtw2drmciichmlfzenwmh923tfu52ydihjgcoxmgn3cnlhorlr93bergpk82uxxyuz5f18sx',
                username: 'z3vrofylzd4d16slut7n628kd1vuoh7ztog4b6sdawkqzn960sm2vnn9h9xn',
                remoteHost: 'j5hcwuvjnlwvkc3nyla3cujvmn72tsz7dor66ujjd3ohout11wgqjx1pfzg35lo528jzdro6om8go54k40vlssqa81k2nbytsudfr813n13vv6mbx0ct1tazfwbiv7o40zjk3im4lmos47ki4rcduuyp8pykquwe',
                remotePort: 6942536265,
                directory: '8kmlu9xjqxz13po5xr0wnap9v9grs0ndh5xfdc1er24eihd0n3rex9y1g25rvcmfv7mecui5eyp872zeq8wpz4169p543kuns3g47bnxabwhuhu8gj0e9dtfp6pfy6169wp9vfsyc9drriklztskqgsykze8fqvyu7fh47xfn7h8rgn2vsbvijozay1j6x4cjzhrqgtv9lgem0amwwytmofk9f5hsl7or8bi3veoksw92zwcvifbhbdbga49ntl7rtmaje8q6y0cjuijuf7lvyqv328reu88hxw6x0ipgrguf4w8nmb7d3adfmq4nfpfip69vhvhf6w1x0hpk3qrdc21fs2lnjswi32g7d4mma87djhsv7fafjwxivrur7b3uzixk6dzc9c9f9whpaby77brkbxszk96u84p9w2jgqxb7qvj8iq0j38s24gz6710t5kao372s821yek6xm6law4mxxl2emm2bi5i4ipvakka9eqoeho6xjavlbkaviad73mz8lu5c54w8cvdq7fvmthpkqlcvcs43qpq1gyhlvkfjt0jwlyg86c0flrlhc2mesvf7r333rnprpzbmqg44dc52v2sebz9hqopjrmfoqyph8hu14eicfnkh7nb68ee9tjwdkvmbegkb0g68e4yd13kpqcib84wbdlvm2786j3zwcg9qjqlow1jf0pbuyovsw2r9c7cf2zt5y1wmbmg36jwb4sbuyk51gd4t4ouarwqiimt90dbzwz93ualet7iff5kwwr0cgkfdygfq2l600ss438yyh7osan7fb6zzabh9lfetr936n1ib9ytyeacjv3ofns6ui5i9d3rhibbxsmli8u9jq5d04frte07evmuu8izgotem1zz3tr1yoold8p04fjlqbzeic6eu7605jly6qsagf9s5glumb8p7492ii5ucfty6v2rpdkikseost5nb0fd3f4bry6mj1aik4kh3864tp1iv7wt93k3r6a7vvotpzucc5ux9akesg7v',
                fileSchema: 'l5fbpsxr5bcy8ovkx0xrjcc8qh6wo5jzlsoyj0dqbmiy3f2qtjwtrc92vm5l49c8u68h3uz2r9sgibrvim8erc7qufo3hy7tnoz0brlx8qvzg66bb5c6s6iagmnzttct0634b8bun8cirbegq3qb54w4lnephietwevi4x0yzzqwviy2613zif27knjlkw46h1f8dj8tukwe084k3j4o9wkv85z19xzicgn0i3sw7gr0pwa1muhxsmxoeqfui3k2th95f52icr8etdpkhfl263hh33mpto83j69n5yw0gwrobeezf9sf4p8e2u30d21qd0vb054ly3yw9d70gzwkq6r53igb3zon9ylifreu4qb0gl3ji91qbrzz6oosvlzd0842701m1idspiwuhlmm9hct45m92napacr7q8d02qq50mxknq2libdeo6tg9c0lirhli9z3xe57yoyegtbluxazope9txaa5cwscsn521sabaktd5gwoa7xp1f5dl229xj1vfwefgbsclrrg2zla3bycln4kgei26qt5zxsg200pjwi6ze63jlm005m3mavpa3fmfpim4afcqst5yh9ahppxnrcxu0ll20qf9qtey9hff9p5pbod6gter1xlu13u32mg3m1pqhg73k2gd8026tkg4ddphr5mttxljohchxd4tybpj8aaz2g04d6jw1vvro9bztkbbhyco1slem7ca0ih9kp4qv2jo1nzhsun0grkxdtqexoelmh9neq1urhm1q8rqosleyy6lqh1di3wr3h1xehx61yxcojfb0tdccy29vmhck1aq1e9pomswutac7bxxqc19ad2yvdoktdfauu0clnf5sq74fsmsrar31tgjd3fz1a1s2nj5zwmdwlx5jst8lw0e8oqo0rexd52tr7h673saez46d82k6j9q2yv2q3b6o70f9mw9qfk38xp2f1tgl7j54dkowxrcx2bti7xr1414g89mvszhhz212xoz57daa11dudtrdtp2ts',
                proxyHost: 'dcq96su1lg4jd9suvixmxzhc9cybw5b1gm1gpl64zx3yydj1uug881lx1zu3',
                proxyPort: 9461490437,
                destination: 'ew7d5yj8tokq0a3jlyut2nngl8urchpq8nxvpc2hl6fnwi00s3gkq5eosj0q7654ys6qnw3fse3n27gyi279qn6ojjhrym34wdwh1llrjryc5kmuc1roi9idjk0cktcsgvynvo0b69tfkos4kb5pkei5e2ac7oaf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'sv4ii4a3phsl8v8dxfz9yfynf9cesecxvp8nhqfktgkdlo1tqua8kreq8og4kjym7xp5ekttmgbrz855w16sdgvdp8tpl18x9zaxlk8kmdt7pljfcvfl2548ty5zhlns87waf83qsdaqwgr2o6iam5ye6811pvyc',
                responsibleUserAccountName: '63zx31hew4tdlcw851cl',
                lastChangeUserAccount: 'kmfi4lu2nrcnwg0ej2gz',
                lastChangedAt: '2020-10-13 18:06:19',
                riInterfaceName: 'hykghjbt29oue7y53zdeff3fsyqs8pwwn15k7i6157ffdlifiupgw2h3oglvyfwqgxt2pcs7ysqnkdogju1p5y713cear6hm6n39kyx5d42oy0tijbng4dwb5qgknwlncbr19mmy5c3aqe4i5361rhjf2kxf1cux',
                riInterfaceNamespace: 'kax31m6nonaa28qr11vp3mp7auac46z1yx1b6ccaxu4v23s5i25u5lpe513ydno7y6it6buy50kfb9024brb3nnhegdw6g0yygryjfjse7fm1oj1oli2e57m8oxahdpj5vhhnz9lh8wgmknzmduzrv1kyzyuts3v',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '4h1ptbsc7z9mqo51k8depq7whj3dob4ya2g0oepd',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: '5qyqnttnc4ie3wrcb94zkfd5gpkk20ctnpn1ukb28dns0tu9z6',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'br2orlkueahznndz2tkn',
                party: '84qmyj1exu655kwde0jbjbm9iw6zdiodeal61grfg165l9oyikujup10khmfqlhxsp6o8bimm9cb03ii8531mqu543lv6duyriajdjm8gxdz47pz44z8w05nv4c479b3ywuequ5744tz8879bbk0ewhwpqkaz0qt',
                component: 'j1z94pnxi4x7x3tr0vshbrx05zdyspybl9e6tni5316z62xyff0l3kygn61k9nf7qfmxg2jzlf8tt38yhlokqrg314dqs41rfq2018c4i665y2ttano5y08v16ol5vcy44otvxnnhiqcz7p4qmcipd7yt6f8ww08',
                name: 'v5rj0xx7w3uxaqq529g3aww0kc26tlnnmsn20873v0t2gns7qo63e3cf0vsx93i3w82zfycsprfh8adm8wk1fc67gfh6jmzyh24jjqh795l4qyqv3mz04ajmuxw2kawkywa5p4tdkj6ycvxtz4kcbvfukocqjvcr',
                flowHash: 'mxuhs8nn1vm5yteo0xa7lv9mjyrq16z1hg9y7j85',
                flowParty: 'd1vky4i4beg7l1q5jri6dlzm0m5obqa2kq2jtvcbr9b464oshs0drt65w06gy56c71rwacc7iokbo179fb0sdkqhkp22xylyektccxzkfpeqhrv9qm5qg94vz0rbavqtkuzajvmwkcu0g3fhewnge5x8fgm7tmqh',
                flowReceiverParty: 'tljdm1ll207j2a0jal212jgibupm8kosnw004f595tvibofu7d68tyf9d5fxvu89l43ore34va987fn05kkx36tzhn3r135z5cz32hphaccwd10eusa4bgc49yes71k5wr4638wnuwvphc9f7iryffyau9shf863',
                flowComponent: 'ua4km1iwpp0mzw5eikkol6k6zmcx6a4t0t2rjk94m4ek0qrd4zhxnsa71mmkx4stl9zo4umuttljvo4utpwes1ej2n3wcr4cy37747hj965kdto8bmpiwt7glnprj3f75kuym0rs917oat2z3rmq8kmfsiol9n62',
                flowReceiverComponent: 'iq37ynjtwairbno9sy0y8eiz9qwbn4lrejr6kqo5x07rv6sjcwn8pmdz10wz0ybevl418y7h8igzrv44z0x4vdfvw2zbv8odapkwts2vqq9e2pr1rrzwdsirrdt3q35rjgqg0eyonchpg620zn6aene3nmo9ixkc',
                flowInterfaceName: 'meq4eqh7tvmeo4fqurmpac5yf937izfhjf0k4ttl3jkqatn0v2zp0ccy7mpdoa38ssdeg62a9jc9oembr26y7wcpigw1rjk17o0lgmcp69bunufmqbq77bt17xaalne80kgqr4nr1v5g6p24s3rtuorya9s0nfnz',
                flowInterfaceNamespace: '2r01ijlgueyc000mxdbl4ccfi29hf1sysgkbs0g46tcatseb6usg68v3r1kdreybhv0doobwmfwe771wu6xmzhrz1rezix55zn6vdpn7fskvly25ke1fc5r3awh8xu6qoaum9510f3kf61smig3gppt0oy4fwvek',
                version: 'hmqkd899sumo8xsfknq3',
                adapterType: 'rjvwurngp50xyt3eizkn8gbpry9be11yjobbcmotztc8qcpfqzi6xrdhg55p',
                direction: 'SENDER',
                transportProtocol: 'crjeuytkhx4b1ucja5t132aszkwsl82j9yv7lq8f2y5pkg3nivtzzc7hoy4ey',
                messageProtocol: 'lgf79f2vin39m6fnufnmlnkbo7uxegqlhhif9d8t0p0x5tvbmixzp54rfobz',
                adapterEngineName: 'jkpy4wm3eqgqd8je98f2j2gwptd586jfb244ms5qnakks55trccwjw39msx6t6ix3sa549tp4ifwt5mh6jqrp0mxa1gojaqkha44y5gg4qtdf7iflq611qaud1emvq86vmnq3htlp2w7wnrughr2ffxmrxqrc8wu',
                url: '97bhbsmv0a4dmwxicy4vlxj9hhrykuf7cgvgado3oyb5ft7hzduw2pqrt16rcffbmlu4p0lvhrzinsyqaldbd814lffusfw7e4ur9hpqmd4k6u0m0md7k8hyzbujp0fec37wi9zkcvfp7xbin0a2ziryyvhhl1nwt34w2y17jxiidft8o7zxa8biri33rzsoflxw0xv4nwokzt8vfsagqkr49go8och25b0do5vewf23lnzchbfjqlndknik4o7ww3t1vj4v7jznkvq1zh41y12iggyub4w8qy61f1c00rbjw0ovmyua9mv4opckqzpf',
                username: 'imikm5bndyaaysqdigdqvpeb747m05eaunq0e28pijdy5ynr6kdoyj1srj2h',
                remoteHost: '61rjzdvabzt03ljnocvbrvb8mk0x3bjvuagjfcp3y77ny7syqapod7twj418mxf23o5zj5dncs0qsj0lio6kul4lo2iq7xb5ohi480akkl3tx65wwpl71hlr3x9u1ohtydte9x4t0vpstdd5l44brx0oa1bj6okb',
                remotePort: 9651395060,
                directory: 'gwlh94330a214dxgkyldq0d2c3ivw9emlkkzsp0tyj4ev43gh7nripfbepb13u50492mzz3g69t7j4kktgwnuydnro1l7tdl3vixzk84801pwg4usc69hqgeu806faowoj1df6r5yfhvb5w8synblci9k3j32d69cg06euqmxpf9s950qdba7chzoomyfigu3kci455qtjx0l66ljtw3ypt5w477glqs8pifo2iwdisf997wt4guqrq10ym4ntuiayox0ccybg1je9urpp305prbsnvdam3mtwvvr7gjo4zgk1d6jwdtjn137fzqw5wxfsfi54hfitmbdka2v6i425hek2rmk16urmu77cb255s2e40w7k1z7p02btx8dq7paf6x3uz8smn0hzeu6qwy2qvx9sljebosdp5wunnnadry5ou7p41tm1ekon2wt91ioogqyz5l3fsj1sqk0cl5w0stlq1ilgcxhw6azbrjgi780srcvf7zl14y7sm3cb5gexwoh77n9guqfvedfeu1xsoiaw4cy0m92t69jm1srczmm2gdj7rkiu9y9zyd3yya4k0ssaex465p2mk2s3cswfnt1j7mstu29v6gzz80d8caoel8grp8geg7pcmb2wp6451c9mp8yr59k70ikgohcyi2k9v9l457827rej8lguvhl0ezxyen6cmbd7pd60zkf8b4x78x7pwtbojbi9qb1icg4had5956aypbisr1pp5x2q6donzen892bygyzrnsbn2tgst0lx9igtwnwpqed5dg2qpgo20uxmxuvylnnrplwju985se1t2fifzvbsnja78wqu60wmriqjf4ve463di635av7iwqbvmo9fr3di7f7b23ro6xva8tsuhpq5n8xcfwen7dar9xzyutzm1vmp5ihm3okbh0kxwqxdkenfurp32mcr6wppm5lhs1356a2xfeudw0jaos6m615itil76thc4deis6nq1od6wjcj3n7iw070qaazm1fm1ixhiq',
                fileSchema: 'vczloc94e11jjmyuusiqz97n5gyq4sx0dx2amtiimpmcjcw72o3rf7ijo167yk4y7gwz58m381q9vuez8qfk77tj2976j88mn7xm3ur1wap7496v7scm2l33szpkpvyc1w34hyd4s1o4evxkizwgl0iuku5sme1viku9zimbcqzerqc3dkciock0g551h73kp8ojllzrqrf5ghvesnzas4almv8tlimhwfu3kgip4dosmh9vnlyw11a2e4qeafp6o1ivxil8l2sya34awszdho9mz3opl7yvbty56rhcvzlouxasx5p21hq931yk5tfd5ytwenq2tujwv3no1ck7hw0u4svl0egbnjxr8fxmyk9ppxobb515suuhinebl30njeppyiovz3tt31appjatbpju40amihpyhxaxkj68mqv0n3ycpp9pd1yllv3xo3yj579r9u6nk6wiqy75alwzefv1hcq4e3zafuqxyxb06cws9ehy4dkequk4nufmgve3votcodfj84uli56r012npjuub4uzs1s5mik595l4rf2t1zstpxcv05jtv2ussflpaalq52ugo9e3uril72jcnfngqv45nr2sxrk8hq7l31vfgx372v62ue0g3bl9g4wwkdjw73zqqui0lfwg125f2ixkued997uf8kxz8b79ckhg62k6f1ywlqf4bx25zs6wzmueoeq3b1n6o0ozzun8w5vxcyj9yr399bht25j6ttfzoo25gbkumswb32rvu975xu0vudxb8ul4j1ua4jcpuo89os7s5f1wkmq7l64mo4f0vjk1yzbf20h4d4yq8vdqiztq33s9anumghum95qhyxjj155b44bhn9l2to3zp7c6h9opoziytl6zggh1vjmvwa29b53xx6j0754ci539v5kpag2g6w8g5627e9e505vbtpkf8ayfgyzsbt6478q81xtmgyiyw0vtb6a52iylphx95tjesmlnlevhxqiroqit3mrnsh0z09ysmvh1t7nz',
                proxyHost: 'mfxpvm48dwn61up25znwttppmhlnxzxzdc65goja99h3be58znmzdqukrx3m',
                proxyPort: 8315626636,
                destination: 'u79nkix83u16bdv57ofc45lsci0bsbnnw3iix2hqbustzcdz7cau6m3az8s7op9h7y5tk8utn084e2wxc7500hlotrdn51dh5oq79hdm5e17ls0ntc3yulz4xmbi8eyggcs61xr9lry8z524w9gecwmekwjoiq0w',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wbiw6o5z9kecu787p3wsiqk1r0p2x30k41goysghwn6urx3kngwizhrtal9ozofahh508b1434gl141566tapa49ptioh0u4izlfwz1lrqf2ztjr80x45dijf8acwa89999d5pnk8my2zb8akgea976y2336l6kl',
                responsibleUserAccountName: 'ksbay81jy0w2ei7y37tm',
                lastChangeUserAccount: '8ppx8rp50v6akuzoxm5x',
                lastChangedAt: '2020-10-13 13:00:36',
                riInterfaceName: 'xh1mi0yq9gcj3zamt2t3mqzh64dconb6mwx7l4ym2iyw7myj63eikyxf4tkhja6x1qivpy7ojo9qm6np1100ukmtzi7d1aic2cnskmb77av0w1el52vi87loqylub4lohqo4eqv7srtifyo76b3a7dm0es2ztqdk',
                riInterfaceNamespace: 'r4j5dy4srgbemkjukfkphtgfyxkzzbiw9w17hs6he0kznw5nw7o73s1cw8f04q436krqgdsu56199izt85iwet5b5qp2q5rf6wam86oo2bprrp0adnvlp6zmxbva04v4qmdux1vjx06iafm21xfxw5j4twms4edk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '1gozt390glaa8p9zszyryi7vymdwv3s3gh00nuyt',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'u46x79f0pn5ve0j7cvc7lbby4m673xota5obeigltiiuv5ft9g',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'kbwm5wetckk5r5nu9mw0',
                party: 'pi0sgrlrxeil28hoa63do7i9ie29dyg7orb6c4esybl8dxwlpchau33ew7d68zlkt7nwux54ppelcwqejffjms77hiu4o6j33t5mvpj01hzggojhe8hwuos7ko6ma7do978eybh74ox027lolyt35y5ph7btd882',
                component: 'ksd83mqeju69qpap0djrvcls99a7zy8hxxnppyktdl8ttxpv3azm7iokesbu9n4ccsg3hfqoj1u0g9gc9r2uh48hrz1w7kzqftdy19enu5quhmssx6sglm2h6gzkkhhci2f0ab6wdxrr1h2vkrnkmox1rf8f7k48',
                name: '9222urxzovl4iilxldnrvcz3zm38foszdmxt0g8b3k1hfzopk6kygfcz3zgnlcm47qodlc23jbicxhe05gl0nv0mqq49sfrocc9i8ata34scx590hdo2f52d72jc4ydq9dax027zvfcng10kwn2lbpl6mvfrxvhq',
                flowHash: 'c66izq5ligvwm655jlr415b143sr72oq1qmbxq25',
                flowParty: 'vjfrwfi70yzkpvf98ug23tn73zepxjudvs8ohoaz5t5iklikla81a4ksu8v148s0fe0xe0v9zw884ybogqjv7op3yo9snehy22mrb8ui3xx6g0f8tb48q7or6316t3jx08n539ergu7e07e9t1p2u4rvflkr3k6w',
                flowReceiverParty: '6uyscj44utckf10poksf7fufwy7v64vb6bnflmkds5ocdcjbjyrf3f9gfo0e8vo5w8z9okhwwjpt5fj78gvnn8lt0o4uwshqy8ah9k74wtlxw0feel3s496psbjcndobfb77js7fnmfmzzoogt664ihrro6x8w0f',
                flowComponent: '5ydh6l0pxfb2gnptqho7sgxi9jh1o50580jv5rda6ernp9ry2d5neoiv00yyus0n8ga9ep5ns3m5dxv6tts45ot82wpc70kdsc2n52bcptr2fl3tl7jlrxvcklo8tain9c9gy6tvv28deox2663o0zxf2qvsfr9v',
                flowReceiverComponent: 'grenxtai36rzc1lvtha70amzvdnrtn5dyom7f0uu0laugct90fq6at6l9pdzutwk7pcquc47szh9y0bwm8dho28k2lgsbowppt2lpv9mt5piiqggdrmjm5tvvtxus0yx02esjs8skhyy7dszan1o2zgyx82piwyt',
                flowInterfaceName: 'nkwn8swr83s4cqtx1i77owcknf488y9gis1rckkmvy3diczr3lpe31j5c72ahul5g7x2m0o8z2qw416rt5vq8sdk47f13wvzopuxpopzg0l7gf4wkrx4nr0080recaqyxc0cf84s7q1n4p6kpzhn6m9y84cxtldm',
                flowInterfaceNamespace: 'msyf0jzedw6twx3cgtuoot574vwqxd86xu4r482hg4eyilg549vv0g72itts3d954zc0gw8fikmv08ohk4egia1ayomlvgb8zh3o356to152jcvwy1mi3bskmydaj78td44ne5eeslxgtxdxa4lne0l5lmlkogrb',
                version: 'ojtwmkd9j2jwguboyvgf',
                adapterType: '8oi4x0n8ib1qd2luze2qw4xhioxc2w0agwqp20lwytf4uxx5ekhngyddtfzh',
                direction: 'SENDER',
                transportProtocol: '9golf9mdxrfv7mp7kgz137glsm1ufyt9mcic7ur4jndpvx2xdw9dnkzv25t1',
                messageProtocol: '0frqzwp7pgjeggkishy5m2f5duxayq6u8z42veh0gfupt7ljo9llxni067ao2',
                adapterEngineName: 'xn1lwgehagn2fzjm93et8pqyobh0tk77ho54c6pkmmchd6vaifpy5mb8b4x02yyh6jmvb0dj0f5f28aw5lf4q3v63s489zqitotpqvuuqncuf76srczugkh7luybwvz7vvttzalgg5ihzg12qlukhbx11jrsq9n6',
                url: '2xev05c8ph0r6r1byrei0m95i6ifmuyqvq00m0glphk1obb8blhgehzgtu8a8wmoxvftevnurbj775v4fcmbkerhb919z6ubr58jfvw7f8kn249xf0kto1fssp6iijpwcgbtbah2jw5nxcfs0e9j0222iuvfb18h3xngmxh1nhv0qblq0i12k109nc0jr9qffmsomrehid6xtdn590qbyp1jw99hf7dh15r9p2hcx0hszpgp1awu9o5rrct5gpdiadk7az4f7az3heqnlhbpxs58gqop5lhdz0gx0h4dh9o8khhe55xp1a929wbqum4y',
                username: '74vjs5ivjsp84twpsa69ej9wxok7yizre024oz14ianjzx8n9j1gh671fe5g',
                remoteHost: 'tobtseeb34a1vnan7l13kva6r419vzq8hm7np6t3q23i4fdzrcm9xhxs14u9elzvg1lw68l4oaqtlxq6adoqpv5p2edu6heqmlqgeul1fvuw17pe24e1o7zb4q61tjm331xcsq2m7hksgso3ti27fwrx1o0yjsp4',
                remotePort: 6516640726,
                directory: 'knzzgebzg4583vwai2fp6iel8rc957hv0qcgvafw5rrlpspsd0r16pxiob37d5gj1nkl76ffph49nonpq60ljf5rdu0w84fm0lzx5ll7liwt6ei3o245u8mqpsxd4p7ipj5ytaf30npv5zdzh7acg2m7n29ewc0psf52e1cnjyhzhu8gmlb0qonwa58pfzw9qkwgtgzm5pi3qpfr8ms8ki9z3o2jh4pca5ywwromxnn7ge3l6nmnror1pocnam68j7n79y2ptoyxe2erk5xevu9piip7i7na1x4hd7rlst8u1x5oesaw83wtq74geiqt5vwz8l7us4vkb673yoz4x3sb0cw2v0fqw7m4c6s5pkv0eoqipzxu0vmkfvvj2rlgd5w5f6up76sotytb0cruzqht2ods1dwxw81qovplfv0p40kx9k4hzy4jsxdhzltr54wvgcijni1e8t2r7wyv67dande834fis03fwac3fla5zpqlnhzhi2v330luy3nnhyfl0hnophkurdbwoen6h57cchk7thhao5bmcmfye1lvxiiys4dug38f1m2ne49w11ehrpbx95hk6fpytgektuw5pqdrs3oqggc41h4gzdxz3kihuee4a0xvjqjayqepnuufpept2lrz20br1qlhj0ecevq8aoujfdyqm14vmv8ndkwp1vavzbwj2jc5hhgorp80jxtjuqeim17oyzdaqgge36m66l7fhgi89ivecw9co82v3tvcadwqr2mn4wm9749quag7nex1bwo3n3ir52ac0qpunv8zqn4utkqyszozitzyhckws8mupljq594se7dvg7belp8nc1evv27z0lf1ww2cb3wm5wdu7ch84jqvqev1idgs3su633il5wnme2z1o2p8chvh6rsn5bug1ag9mer94eex33h0prqs8hqj4w5kmfyttzip8fj24joroku6t3i2om9so2hbo5byomqyip7p402jvkmcwpe69zk1vtedxgcrjde335gr9k64',
                fileSchema: 'h5tswivi1rhcja88akr4m6scvq8rac6evuj9gststq71frmg9b44j0rmqv0jp6xpir72ax8yqs8yf4r7vg78xfii3mjp3hzn6scolle6jwfqhzgqjsu7af5fnmfscvmfan09ywwy1u0a3pgdcmbn9fiq6xc3ci15u5hogh6q1xsnol3s6ullc00ta7ruj5glouxi1qfzc2kgrmhi6yhssdvljdhfmqti57vm53sxe69zygiqjwn7zpmcvtmtp5wm8p2s68uogsen4bhzgb5og6v8plbft65yskgpigh5fn547zwbdyays0c0kd2ijw09dmixhycqouolq326pn5wr5m1os6rgm0947ly50cs2401py3s873akn7ko5uk8ivc747c642mdk8n7s9atx2geozt9ikju007jrflzdc28wvuql9uja5rqo4e8konma1jtdrsk937ss49g6hnn9ts55nvv19dwxt6qgzydg3b9q8xblcy1ufomfgadhmnmmttu9y57ldxghx2jvqkdz6dxubslwkncjef9jebn4rtx4wps5x8lhpg3iqwaeywx5ddjd01vistelfa1j3rk9yv3iiztc8e0hzz8qz7ynd2ihyr6x72fia6v4a313dls30gs4299ygxnlql2nlmje6yfp2pvdq7t3wuji47667feaw5yb4v1fx9m9sbtb1k432k6nlwtgyf50nx2d5fb8aydfmcoguqc9eh9h0l0pptnzvyx0d427boy8cmllh9njzei2kx2eg81n6svb6p92adicifimpafnfnskuntovh6dql4w422qpczv4f3xtvpmicvmfmaaun51gr8pm8dk7wxdtaal4mo123zwtulnxol4goezg3i96qgvgixo95nf4sfa18954t72sayjekgcvijzsbph74ypnke9c9ebr4ipe7go71x4ch6xpkgaoy0nmleckfk3k8dgmvxyu75j918c4xlhvkf60i0cnpmw1b31l2wimet51tvyehgufykei5',
                proxyHost: '3i6vedjmlkslexp3oofinbsxs0ls2dpmjdu15aufxs7izt18a9tw3iwivfv2',
                proxyPort: 4392247863,
                destination: 'hh5dvzac4bmy06u4do94h5rccd6tvvzye19zjnpz3mbmadjphbzb96cakllm33u3xow1ta7tjzghftr1bg8jlxoovyjuyzzizbvpjz1uc4ke5wkro990ig0i13aqfmsczs4bbwxi2tnht1ibsf5l7ep1vd8qablc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'bhh4w1qrsno17qj5051vu0b2kph881iwg14wa7olykq9a2vuxuz6rwce9r7zxd7puypubu30ft9t77vzs9vr4a3g3bfxidnm9vylxnkj0e8dvk3yqegrfqwyrc7byzou6f51w4fv2ht4xh5e0hxkmjyprwz6q6xm',
                responsibleUserAccountName: '11m6jdmnsatmtqhcu889',
                lastChangeUserAccount: '2kzukx8t1ykjilx06r8h',
                lastChangedAt: '2020-10-13 10:31:21',
                riInterfaceName: 'r521r4zk59n72d99iq6ymeyuj1j788ka5rucar0oxb60zpq06vjhiem2oi82x373xmsfyptaps50hmdtw3vfb8lf2sismufxf28rcbayv0fmt23z300ycryalvfqcb2zgxbbhjen5y9f9tbuilmxfcb4ylqnppyr',
                riInterfaceNamespace: '199518e3h8b14tqm8g9z0f3jymvxm65y8i2c43jgdoarfptcjcw3ec1l57v7lgg5rjxkd6pedmln8or3czomubwe32y7bekcnjynmfb8dzz22d7xgbzfbuxwsp8joia7gspmbl4ypdgw4gqay1g34btjpu6uc7lf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'qitfbxz94gh9mlkdo4kbyo303tzvys1gyopyf80b',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: '3o6s4ycvkpgv1kd5u1sywp5fcsnjq6qtvshfe6alrnlvv5pgcw',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '0tff3ziap4k1077uy51g',
                party: '08fydygue3x8ku71r61l8diegycpksdlx0qzewaasxdm046tc8crmgqvrivmk33wbsiuh7uz7ewmix0hfpofy57a68g5xt2jt32ikuigqx4macqmuj8flzwrpzjerpc0q1fgusm2ipcuphytciz2nxcm0ii92qh4',
                component: 'evx4pgekd0j37wrfd00026kad7i2q3fuquuhgx193ipfe1sdei9m8s9tn24l0qhj32qwfwbv272cwg6oj2gde2suii2b6dzwlqbvh8obx1c14w0mejd07iyz6bk2a8ihvnvgb2n7jfq99xzupjzha4uei1wfczt0',
                name: 'x0irherwfcg8tat21cji8xgyhur1ut065cc9izdrhelnp4bjdhgb16cm4tz5qlue9l0lnhh375ave2p5oe1xtrzoh3gcxyo6werxipyvenunr273hnx687wi2chohec75hk8047usdmj8qx0kkd6u1t785vnre8z',
                flowHash: 'ift1pmsfray34lyn6s42ftykkoe54h0dww3c539s',
                flowParty: '3zx23ekulfscokk0njwqi1b3c5o2aaqm79szvm9ezl0ez4codayg9o35z063m7r2yaep5b1b86wsd3oybpmw1kis605fbgwkvq5lx4g7i7b8zre0axzasq0vgumbib2lit9lep5gvowqpqkmo1252cwyb6fz9rs2',
                flowReceiverParty: 'p41m4u23sjzvhxh7sxzvmlabhiea830bd8hp2i1bwkt29i4eb3ccok1ticwtj7xo3yo9e3nkpwdq2lbarvd718wx7ihtniehsjcr1amyltfem5ofod7c68t725jo633pko84qz6tq4e93qow7duyq0znhio9hors',
                flowComponent: 'j03l9bzni08gj0c0puaqaj1hc3zpox3yh0kgb3b2n3a5s5ozi1acabq125c5hnlt4kh086mwvhktdlc71buc4qwowsehkrr0sfkhpd36bxb4oppli6q83rfusqykqh26fyh0q3fr4o06fnuzsqf6gglt3nw9aq4g',
                flowReceiverComponent: 'bcl4b4ptmhsujy3mg4mnqs5elx2w4gk96alt5ccitwzwt0vmrhhcqa1hbhse9j4gakvgtll4qcqugvqnrfihcq2abod1vpqg6tbz1t46sc2v6jqkn0bqilk0hfttjge7s5k67jcscdfimwkcymiiuwxo3jz10prv',
                flowInterfaceName: 'mvtyedqs4b68fn4jtsr8fyvld8dkm18h7098bwg97lx5l6n0nnkul1aqovs4udtz79q07m19eeu9hwfflrdud9oz22gm0jqkj7zbb0lea68d1m1psii2961tbajxtopn12aesqrov22g7ofjtjzvd4bwew87ihs3',
                flowInterfaceNamespace: 'd4jbzq0be97xr9dwy5dy5rr1o3y3c064851tqmzkr5kqly7o2xsbkb40c88pg3pxc7cm1jq3ihbbux1bsb311a3ck5kofcj0nkk9qv79wieu46r8nbuq2jch29llp1k0dmw57drx1ng7e6y6xrwllvvgpsdfq2fl',
                version: 'c0tatwouprjaqz3uf18x',
                adapterType: 'pi9x1xyf6hyrdxso4enxulxo8sps3b7w9vrk9lzupj8rtoyzzzsclrewqlru',
                direction: 'SENDER',
                transportProtocol: 'e1grwhc4vt9yndmgy49ccnt206t11morgmhmtgum6cnupagynooneebiv6hx',
                messageProtocol: '2ex6p8b8jwgyjn4iw9v6ureoc51mhucejvu7vc9xkb6a4007lfkebjuuw16p',
                adapterEngineName: '4tldnfm45vkc9wh1ns9r81y8cwt74i30rflhs0i9hbenjnqzj7a5lpou3p6isvvyzmrjkaqwb6vv6o775otklmngdskeyz18n5d2c3hg84pc9v1tb6sn2wjkiu4ci88b0wb70bc3paii6696id1xi1peo6bw4v156',
                url: 'um9ol4xgev39mj9dn5map96m1b4kedcqz9unika3la7mqku77spl9inn345k7dw94izl0jhwxysn6p919qg0aehli8l8modivp16bnat0lvadf9wdgz5kt2727a57ifbg2svaknpyjnjplawjip99qrd2mgv4hrkcx1m9r9vv8eyh1ihxc6lq4kun2hjwvetc1moe6i0t6jmeb2rlhta9eglx5jrp1oui7l33iamc9jtru7mphtckxiwb7ozuhuy6s2wjo6ztjrvnk0jawd3m8kgg9yy9vzq54jzvqa6rzg3s83i9wap0gqstukf23ml',
                username: 'w4vm5ayv2833yb4orlcn2hbhs0hwlhhs97l8u33f1jk6yc884fq6efuf8eht',
                remoteHost: '7daj21w5cm8cx6a4dez4yhz0v10ssuab82vyf7alzcddw0fe9y13skra8xl9oig93x7iehtsw2h9nqm5urdbmgr9zdumpi51m16sxjiat3b6dssp750euf5ro6rzjft0dptft9p267ub0zt4rc5n4r353rbj9y15',
                remotePort: 8835935542,
                directory: '8f37xkpeqdc5yh35g1i0kofi1iicebkzen2rsk12nizi4eonsb5lpsv77rfi3e1shxi5zr02qva7u9rb3ik6fmq3gi6ur42i05aj4uslyin556geuffcxv3v4cw82v8c0clwmqzrqk9nds1sa4yyjtgyriqsc5fw2awe9z272lerboszvsr7ia4c6jzgmj4szx5ulyiiln6szsh78xohug6ji8mnc8zb7qsamd1cp9k435o0hnpxdfv4o8pnr48glg5rox7obmuzseuan7dy7zea4jyr1s7zfs90nhrwkg3fwo52epi7v2nfwtrcrib5fhagc0ozve0q7n98jx885zq7n1f18v6dagw0a6bofat9vwcrnx6dk9brzfgxozzb2avywvntsu93kdv5uba4rpg2t4efwasbramav4ig2elekil265cxflu315kttd17ig55xrucj5f5f0soomz6p2ff6ebguczzaceyyzrf5psx7wbygr4vi344yjq92arl5debht35cc0qcjv26b4x3qnzbvub6uwatmrf0nf9yjj9kg5edjls6lgf63k8vmovp0fjtucdqfdvsg583jj1ae0p1e4kubdkljbmlxkzmrltajn5hdmjg5q2zwwhal0ax62qbkvu7v6ocx7ubn1co74s0koq8fbyw0prhwwpgpzdd3yn9kj0oep97c6nk9kcww7t7cy71txy5y0i1tuzcguivkt6xb9d18np9sksdw8ci37rhxxkrgyaln7ofjd9ougcr3af79gldpcm408f5c80t1b8bcd9v2t7wdtp5gyg1x64vf9q1shtkju0af3pouft7k084cudagjx7rhs5k2wkhs6veh0s2qp8l52fj2oywh5gw7q89u68mdukzwwyy27w1noj58wzvvwl6ur8nh28chijc4deyv74znpmctenbpqpmf51g2z2cqm0boqd134zdu0rr2uysgs18g3v3xkli0dr52o1idmmu1hjtdmug3bfbl9db3zaiy8qp7n',
                fileSchema: 'weq6vkihqzh87ff4scnzyszbmhpnk1oy5dosycscxsa6lvcrsvk0x3no1vaz9z8b1b7tb0h0242p99gfui381hs8tk6cvf8jj9wdf7re7t70w9tj8c2a4mi9o2j5kapgwfxg8myj4gw297f0ga27ulu2imanewkbw5baoobspjwyflwuldptlrlm6qgd9x1zxcj8fysyu7v7ewo2ldbg3wzva3yyc9gdarbsjk0r4ykh02jl1b86kzrss8wozrngg1hmpekg5dwzol8ofv99vcdq3ai06lzs6ia58mzff7wvxxu9et7igzsfjzyw51f3nholiwb0aeudvi1iwr6dy1ziu4sl5mzza0n6ins2ael73ubfd31q7yen3dunlg5zb2e5vigx4muuandtv7q9kiyoaem5vwzyxv85w0zk4blgqycyrlozub4lpyny3zuq4smynl34zux287bruhxzmj2bhit19h5bnwd4p9fgnw61me8o00qddbjvgfsm3hx0cwoziozcw7hlie3g5pa3h24qj4i45lq9f3zpbze3jz3l0awqix3kyxnio5oeglhqcdkv1fn92mdhsvxs77k5m76bcp84m163dehzb01bdhy91fp7dodbziaf2b9x7bav9jduk1c47wu104lo6zfe3i0uk6sy6cyskir7d4qm7tl0ez1epoiukibohzkbfk6rrvyg2fdxxteeg9vfc48e834bdya32zcog5abu6inrv7egg29eqh2mz9v82n7nqzgurpozzq2m5fbet80nlg63nkhi9v9cp4gzvu7sn0cchj1tgqvfc9ywst3sb20b2p4r8spisw10qjf9pd79loh76vakvb4udnmhw0f99ly690w0qrlp3cwd4sk57iiiy4p29blo03su9xfi3hfrugj1833wvftsfxk56kf5klc6baych2erdq8uczrz83vce91serzg49i6cs72rmpuij6eee4y89blwzmw1760avbuqkeixamix7iwmg6a7jtuh6n',
                proxyHost: 'kvartmz0ipxx8cyc0p860mn8bdpwkd41mbal0mq1gyqir03wp7njqdrdsb07',
                proxyPort: 4846724896,
                destination: '62u6gz16zy1rwwkn7etatc8nynvv2q1j4weqtrim9q7v8yfs1i5c9ahdbqihhjgn4i8cw3nsiwbi61ri40k7m1sg6msxfnlag77us2txfvh8eu6om0p6wnu7gg8os5i8ypujbddpg5sy21zt42szib1n241d0h6g',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3a1autgt7mjgat1j5n1j43j8i78emafjtnjxmh3xaip76mxbe0pzd19h1gt7movo4wkef2lf994jr1qcmpbyoywgf9v38tpjfoka3t5lk0s1xeuun1onuzhcnctgmyordox5amexg737ksctylor0mdg77lylap6',
                responsibleUserAccountName: '1fojphx65gs3z6zjx99c',
                lastChangeUserAccount: 'qi1tjn3qqg8hwcznqdpc',
                lastChangedAt: '2020-10-13 00:50:23',
                riInterfaceName: 'k7pwbxuqpdiipd000udp233zrs21aocviy2jk0g1x2zygdrxhp7dq3sj0b7ozzkc2hugdj9mycrx5v5kaa3p9f0igaqs5pd0h38lius4kmfj5sb8rlspyz0yv1q4oivm7p9er1s5m6t8kefiidh11f2qu41lps4p',
                riInterfaceNamespace: 'w768gnoyhmqcrh0p3dfypktqrs53mndnx5bonirj8wh6cva1567vndgnzuiwqis2sjo1cmqu1jvmsfumzdpgd9f5xvfttksoqmeojqh1u83fjnkoy079deu6qt1xaj63muy5ocfjlnvqvbnz3dm4pgvmmz0tsnj6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'ec6t02a32kvvevlxl4xej9722am3npghinnm0xte',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'uow4vylj6irh5umvito4782pcfpale4isttrt3s9p34hqe4h7y',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'c7ehv80ogc72jcqihq3v',
                party: 'f5s06cscfeu7ltineborwwy6t7txu7qw8aos0ns05hz9zpz445c5xpw9br9eccfxhy6yoc715jr2of2rhvifue8vzaswp9kdelawbmgbxvlxig8p8anyl7z6e9tp8kjzi448wkobqzvxhf20nuf4fy0mwminxco7',
                component: 'nwr0vl838ivchrs4sj9z2gxl0rim9qpv6xl3zyrli15osu41j3u9ix4cewxcs00evt7v88xdszjwxkdx18g40rvbxzloom19gb8c2jifmf6l5uwl3xg7i9knbiij6c5isjwajux1f9h3sn4dxx077x4bw8jbkeer',
                name: '01fu1n2yswuasl04eyh0h83f9e8ycf6plwshq2gxi00c01jz1dybu9jqlutfvtkd82cde8uykjtjq7inyajh7l2n2myknlgigh5rxpa6jldfoyh8vra03h7in9eehol9o8825zehxuxcdumwuzbgaupydix74x8y',
                flowHash: 'yv9kp0fslf0vowq7684a39zsj7x6jg7x87jsga26',
                flowParty: 'ctayzm35z4lxpdwszli18tiz2gi61lmyuup48joixy1wr4vkdzufasdnv7j1wbkt05vw5gzrbn3eo07hr7eti3o2wiei571hwyptzie1rlsgdqsj8hdabb9b6ve0evl46mbj2jybydl4028aqhgosog9yhhn4950',
                flowReceiverParty: '6lwuvzfso8ylzqzaqdzsre5wxy2803q6z2x68ucnlj21kualss17h3wb2owe6pgyt1i2v7h45zibbvzwzvy8bxqv3zoat8w0y6ouqdap6efkljphlfa5lxilruadrwnf7flryqgs87u1nn37s0xs3unlycok5nfn',
                flowComponent: 'nrpf39ovr56964t4jyht6gjerj44lz3nj1spqdk05905l25x4bmtg2mwoutbkfp3wtqsem08yypt2oc0u880k9svfpddjkd84jdfvu3p146dn8eks308bwy5zq3nf81zlvhjrxdju72n9t6oaioe45n732616pbc',
                flowReceiverComponent: 'hh5d5vjef3n3hrxw5n4vk9ono1bfz8ni9f8soj6sqvzdk2t6ydt766orcqxnm0jgs0s4n5f1tjyvb5uvbjwq2c3kj9olac4zyfohw0zcvaecplf3kf3iqgygfm83c1a7pwdf8uy1imrkb3lvyfdqtjk9gz18uzhx',
                flowInterfaceName: '0lsg8r306jziacq0vj3fog3dityw0z2tju3qkcelj87srsb97j9k8tttansnlln0sf57s5wuyun1i38wiadrfk0wmmg6l6930tvif0maty80izfrtutj08qn34ym6a9oiirvhldnkzruovj7tuz4nyeem3ktgaci',
                flowInterfaceNamespace: 'xd6786rndb0k0b29nckyrddkbehmbh79ii4fpkpmg5yo1bd5b8joyylbk9m7t4is3mzr5rj121wbtv42b6moyeqst5fm7376kqp6tpdsrlrinkngtdrt9raen8dq12rjtledzjl7nv4ogbu7tldcrqee2w892sqr',
                version: 'ryych2rfpig2639iz7yr',
                adapterType: 'lzwsa04r8wqy04o0ezzrnaketa1y7781o990rlalxjkz0qzr9g5gfyrixg47',
                direction: 'SENDER',
                transportProtocol: 'uf81d8vm7akxl127ckj9x96qkkg5np43116ypwursntehmd2ynk5sle4apv8',
                messageProtocol: 'njwvbnn5l8yhudx9d4fqwj1brk4fih0lge6spa02wh1ezkl9596ymcnlhc5e',
                adapterEngineName: 'mqaheo35txc6bbuvxct9h52cbtka30xpvawx4g63e4mnm3c9sj0j46aywk1bt6mdb03bdwhowgca3njdde8s128mm6xm1bbpm5likpz0y8btazxds4svu1e76b3j6wok42kcsg05sy0d6qeo6nepfzstl4fkp2ph',
                url: '6p1w33dgi6tfzkas279yjaschxuz7ubhweca2awrz2jqfpaesn85r1urisbd0r4x3saum2egk0tbhrxa7rd20fum18dwjnusj8umc7el1zpizld7tnvucclajbf1x1j7mqsqrwouvsaa96nosjbgn8jwnpwx3bpzj8tu3n9swkec8anm9zb8cd7taf1p8jc4awi69w3qtf8o333lt5nfsebhpmfu85fn3bhc8t8peowhz6d6n0waxmt99icjn3ow6yw96xzzvdywp2pvzto0anhomn00ha0bmvx5wsh39rn7idpfm20740g0evhavj2dn',
                username: '3zc7r9mmui38guufekajqnsr64kpmjmies2sypo5jvcdvt2t8vcodtcxxcln',
                remoteHost: 'o5m83zhsrt2qxr7dz8fxeryk6tq8056tvbtt9mkafjcfp8gt9bs8qayhu238g1tfy8ofhtqouh4dfu3zstlk2buc25nkpsn1d0o41ydr2o3emzbhp0dwy2cxpj4y88url0jgn75lzeml895qlx2e034ns5e0dfmz',
                remotePort: 3491018306,
                directory: 'dcgmvlxpucvg1obd7ir1eo68ftgn6nciv1xf64v74epkj81im70wuoqe1fhhisfdnug8y7at7vvitp5f1fvlurpi3mkm8tv0htp15ngv75dn1cngg6x7g46wxe5na7vckji0hlcqry9l0182sueiu8v2i7z1zixa7dqc519hl1ptbw4otwyc0pm21tr43152vktzzdqeocy1f28k4c8400tth7exvxufsz9sjrrqfqw8gj35stxs5sp0rwdaftyh1wjegx307s0qnqmgavwjkvqbrufzywj4395hlo43hw2zjw49kb6nowpecqtuc7vbaunv12ycjn8iyo8sfll1bz26d40r68c81ur8t2kghmacuhels3fav1ekr19n7ln02kzzah1xjcohb3ucweozerthwdd2nayqpiqqjvft86qa31jcb4h88uht1rhb7mdvjx99277psxaqc29r4f7qixei2b67i5wgyth7wp11rfw7b45qkpv4vdtifw93bivahe0bi2vj2da6g8fes1l29dtfvapx4fyszh2ilivpv6ctncm259hdudwi57b9teu993gk15tvwchx3lu7vgly468wej6j8fmet7ue9rmagioz6xdvaljxcv0pkhjj23emnpjd2q00plkm6dhuetrg6g65ofjwondq4jdywto5hvg7xbppmtk06i03vkkcw1tizaaahckoqknxxj0nsp247tb7rl7j03gh0meeti5owqz07ppyrfmnb10287e7rcqspcy2u3redohxv1mlyu60wymy7fe5kdn7fa7i6a9ohhzuqec94voyd24536z21zqmt6njr0tvl9wzd1fmto3uetyds90881376awhhhh7rxt0i665qe6fo5hq7b6sf2t9okjvxq8pi7j4e5i83l9frmjqh8cr6oci201vxw6v0wacebhmyhec6gqhy7rb5m0imrm9phczh6vozlyyt6dqclkt7nq4t3twjdtyl6r10dlfqae5bncxmg8yn8dsumap',
                fileSchema: 'ndbyhf86zqmn67vu4p7vo9jdbisz8e7qtmd48h8v3pmkgqk6bcm9t3plj28b8wvpuwdfmcb6uswv3y6rr6pyjpjx2vfmznw22w6c7qjatezamoetpjc83mgq7gbqjbc2eu8jdoop2l8cg0razruujizlifqc3590eievxw76op65jrha5a2jn3dran0nayut58zjph3py15iyey3a20bai1ey7q5fd5ye8uw6cs14qx76gbw7q8xkso6e5np0n9fh4l72wjbs6oajg3rpfgtbgbk0plpxq0l7cz3bsadb0qq80kg9aflzgrgovgpoc28rt61nyiawosc9x031gr5jgl7p44j4lfgzgs3bzflz0vkkxgewjwcb621mkm1718ti62pl16dxegero4oaq3dvsxt3jd00t0vj82vzm6sgo6w0e15mcssfqvtlc0p163y4zxrb4dh3bedi1zm9qzjrokst1pgktsqp0i7c3s2v2ftfd0dh2idc2in9nusybdfxgs5cd32rg5ml1bjahmlw6hkqgxa5wr89cdo5445g1f6iogwsc2terc8ftfgnfblncl6edc6pmsp8kfsbpde9shzw1vznl4dxo8zkbcy30xpqr03v7th7tlykanu5zt9hfs3awz28boxl977eukdtt4ar6g2y9wj4jukw2v90ssnahknx14dsf06hetzitd4rppusibetguaijw7031by1ej3vte94q94rc326qbjykg1ijlwfk7gpbhl5rjabvs9p9vzzhhuzlkokxfjb8aemhk5zh2z49nkwvngbdgzglm7r9t9fhsaes0zec431mi9470gla3duamntnyn4d8n6vvb80h3aa79td94scpfukiam2a47w349qdqsc4p9fk1mad9hkojeniadxw7lvb8d3b3v934xbq8gtp558g1uu5ff5gnfivahsme9960takf3cch4w41g74awxj6px1ryz11az2l2rqw5k31b3mx9mcbjtjwzhosqtd35dhxtqr',
                proxyHost: '1z22js423v34z4a3ktw1wdrwyyikr3wl3r73rz6hrfoofs0p32eicdyfxwef',
                proxyPort: 1262090774,
                destination: '4ibawpstci6tlcy03ffak4mg8jx2dm4cum3kcv109c89gvex1kwsv74g3kb84jcaphtdfjnxnlkq9l4vghs2cjf0zv7bxa5fbbl1e35m0pmoogca8bxig5cojyxgvzk9vkjpjemcn1ggm3yypm2bpa4ehlpscmiv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vgscfbed7mjon5e05az1p93yl2rj77noof8vvt7z86ywpr56fhy7uzykm15670pxizldz0a5967cs2b9pctk9rkbg0ghq2cl2te8ixyc22ejo2l9qra7g2xmyi96hqf365dwo6ni05ui4kqe7o5au2gz6zdq8l28',
                responsibleUserAccountName: 'bsgjukrbyw3d1o01icnv',
                lastChangeUserAccount: '8fapagm8ilj48w9s038w',
                lastChangedAt: '2020-10-13 14:55:57',
                riInterfaceName: 'eyj7niixzz00gd6uh681t4k9bm76bktr1xg7gn8twj4omo155s7e4ald6kabea9tssr4km0e4dqn4r3xzv45kyx6eh7kbfppw4xoni4kqilli6bsygxnd000owx13l6sn6k0a3gv6xuybv7odpjxtg1xb914qxw3',
                riInterfaceNamespace: 'orvkmppy9okkixn58oyv5pdsx2zsibljgwgu3srrs09rkfmuioob6tdxlas0ssdm951unehkvzp8uvsty57ihkheb0de013xj7iw64ni28qy7koit98mwc82r923zcr7ajne9n08szh6rkkmoxmkas7n3dxtqes2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'pmhlv5mnunlcdcw4t3p68kdurc6laejv5jhi12dj',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'x3ctvlx0f5bcys1mpuadt64hk6kbayzadqvhceatp5bi1n64zj',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '1eq4rg97kb8njoym4g9x',
                party: 'rcbnqgiz4p4o9xqft004u4rf8bc6niznz7om2pfxmb11t3sgxyyx4efpmmmmv0as2ikvn1j86nhi07owi3lolnmx55dwdev2sgsijkpxq7e9ypvy4kzs6gmlqgbiszcezr9603dfaa5r4o8dvo9mcu6z5bnla52q',
                component: '7jpam52eu7pyp9vuhudwt29kpurre5et400groczt6cupy32301upnospfvdidbrc63ogokdlyld7e1x4l3plrv8ogs0lj45jk7q3ku7gh1gu3huoulg3ymg7z03inyytvgmpwnqq44e9hu7fzzhwzn24lwku36h',
                name: 'ruzdyp4fsk9x1448ujj3ia6ft0red9as0r9etdzfi25eigvxv5o4tn1ps599p1lk8nx4gebn2c86ky76rg2uigue116sn00f568c8xz06k79z23a3nw87td9tl45xm0oaw10ggpy1qaye08qtnudzrthkpgpto1p',
                flowHash: 'tkn6rnt8g4gt97h15ps3iojuwsfgkj9mtypqm9we',
                flowParty: '9dlajlzkor5xn20sdxayparsq3nhwa7ujx7uzlz2n5t64tt0mdcppdsymtfpk57xejq93wbirj75dlvzbsc63v9hg03n43da2ozqcuflqngx8ay3fhysp9nxt7x6abxrgj8k855v1sidi1djv78wu9quinzhp5uv',
                flowReceiverParty: '5yktefm3td1c2yd89ohy90a1fv2zoneoxz66o3g9i9y8h6fvt5clkb6kfcbxn4jwm0qlvwywjtwha5m674gdpnxfqh8zmcfouj43hgt2t3dyuj6cv8q0sxnxtrys7ksnsrkq9ey050cugxkb0nfbyh02y0yvam65',
                flowComponent: 'wd8k0kq5w0w0y1swpiopdshknmbuolmh559g55pdidslhu7lalwsjfc09z8ptaty8kaajlak8c4v5l3rl1a5uf0emdcoqk39s7zyyjppcr31ikkv77fzszyrps1j0wmmv4rnv91nk0tpz02dcjknlnoh67o2mijd',
                flowReceiverComponent: 'vfvgrloaa7ymsmyzn8ny2qblbmbt0s78dn5jxlfmmu313x9z86p3c3di07knmbod3scktbzmwt7quortjdz9z87go8r25jy66qmecczw23jct7rur6y6wr6vm8wk284duktdb4leq9hxt5pzj2w1khy4hyygc6oy',
                flowInterfaceName: '70yhy91dszi20ooiif4kd457996f3usaoe9hjrkfzgfdetf4fgiuiom1h2233f7w0pz519qi2aqoeoyjdl1jumfugxhm7t5uqo1o0ietyio59qx335tm95a2qrjai4gjh81ftxgiehb7nxi5cgdyld9q3nji3sut',
                flowInterfaceNamespace: 'fbbakliq0ndith8wu2lpmvy0xkfhd7pwe6inc9q52nx9qs60gapltb8w6w9e1026cg0j27rj7eulgagoaqec6j5zeowsvbruxjw0spp8yios9nmzmxn7w9jn5a8638x6g1riv1ra7n43g9mdmzdic2ubv3julokj',
                version: '9lhw2b7s54318dx61b5i',
                adapterType: 'wlaai99va6flzvramkfl218snf73th2aoaa3qw9gch2j2ynjua9btuufbdwl',
                direction: 'SENDER',
                transportProtocol: '9ettrkb339pny44mcf91i6fow9tv8b4p2vufmbrkljvqiescnxz1gevz7qlh',
                messageProtocol: 's6741qoq2vjqsxnq1v8io8bl5sj2g8wfbpmz14puzccbrj4sz0itohf4188i',
                adapterEngineName: 'ptnpzjv0s6bhksu348vyqzyhvgws4uomw79w6lxv3reyqd0l1j7pblm9vdpljaib7wzgb7shhb04uou3awwng5bvprfh90srz8ocza1dtorngb8o8biy7atxb7zije8pnvpkup1ob0ebzsvx2ljbt42jt3g77t37',
                url: '1z8efnaty9uxp5uzbug3lnzv1m4q9rny7m7ar1soa991m1tlulzgsdsjqkahjcmes44g2rsdmrvxq1rpsso6nwkrg684yrkwou4oa7bkjdcn71yuszp5jqipgqf6ivf55xarbb7p321egurmigwdd18zjyci3x0mg8zadgd2byrdbkq8ksyff074wl3oia5b813fquhn14ioedak7uxdgecxlk7qia82vriuf4c0ktyq6rt9644qxba510tvuobkwgm0wvn6vuj2cwsf2ivoxc83frokma47juu9c1y64d6396cfcjy3matxuec9p2s4',
                username: 'g4e8dwe5254hiy2ro1qcxt8nft986gb64fxkhhjlxk526wok12k8zil1x9nd6',
                remoteHost: 'iqbvgzh48zkg6dfnhr9kn27b8lu0d6cp1zmq7rdracdaskbim4qhvpy6amp1epmgk6o7j5er1yqvi4g2elujwk7ihmfjo6gzpiqyh3vcop7vogw9bl7ihv9g36erhcrqxinr1dyuofrurlr737cltwsqg6xwy35n',
                remotePort: 4308775559,
                directory: '6kilz1e75lht26xt1auoellzaifu29wqzp96kcypilh223cyjd7b6a8esbqth0huyoi16vf8sppnvky2paiak9xq8takdx8xrognsrmamp2ch70tl2i98nqmal0kh30ps52vvpaz2pr3om3nriq159d07zil8a08vddi361q12787dcx456yiirul8i94rkqezti0b1raipkv5qhroe1qwp64lk3mpnlpvnsdjaf71d98q8w59bxx3q4b764pgqls86qox1x434o5hry8vsb46qbe6ga4juopuljeef95cz6t7orbwlliv3rcsuhmzyd0h46pcfsaq874fu35owym8m8xqswnvachhle2r9og5lryt4ygrlmh4jfnc5jmlfso6nlejydosvjofv9lze2leqyu4bhknk8wdruagepb43cb78alh0gotce4saa63bj3qb2ujoo5l5h5sfyn7el2yusng2umer2q27qioqk23bbhlk8f3dm5x16n69qmk7h53l0729q2mxfzkyoni2semu1q4n8z31ft3vk9xv1dlahc2nmv0ct62p83ouzl6u6k1q3v1qkjssx1i8jmswofnx3uwhmdlb3ms0x1o7vp30gw66eigsmgm6h1qouzgkpr84338mfaemxn57lgr4tg0h7fwyh9x9xz6x02i9tjw92fbxe3zt6sbhph2oifff0ew7f349lobxal7rqhrsfde586wuhig1q3vavayk5dyb2pmbfm0r759ff237eg8qrp0pvz2zp4cqew2s40od9hry1vot43cydtfxlrwkxdxvm7gsiy6x0n5p4o8a0xt3tla2ruycn8d391l1ft7h777j15vl2n9julpfnjcqggc2qwjmoi1ur7z3hbzen5xk7mygu84ceryckrn322j6qvr1t0rvfa7kdx0r2t86y3f5r4kyx1qt9aln40s97k20jl3ni7xzedi0mjac7mwil4g6lne1p2p124a9duad7a26t2fq0u6rl3oreksqwhi26',
                fileSchema: '6r9wpxn5kqiix8s301akq91buljw0c557s8qf6cqo99mssn7g0odq1q54s1da0c3n7j91r3c1t8xvmjazrmagrlamgahqffdtorp47dgwxo23o5f29bhf25dev63wnh08pqe5yphlvh3tyoxrllccp3fmd2hbc4jpgmy8ouilb375rtkuxm375t3qkobeuja87suu99552yftt42b6gqbi5mmmt2em27zk42e27qih3oghhlvikm8j38mbrec1jlsk4tevl76yj3hy62afhtz19c11losf341r856tjp2t1p260fdb878a5nsfkg1lw8dqtgg5py8mql9fcuwys4qyqkbo7un3ctfzkgaruhqvpk4l1juczk6hff156plbm7lpdttbfo6qjmlqzq0bxr13bt7gw9d3tkscab584bmugsv5j84118adn28jspyyivqklyeyzwt0i7jtmjxu0jvw3hy767acjekzhdqaz06vh6e975vachxeaidt19khnvvb7ujgonfjsthpw7uiqnlhr82jbmt15qae3u5ky9rk0ch4xl53g3tsrqxi85mchczfndoerpd44na16n0r5q7gg900rr8g8gvkfk1o1rzi3007wqvkrptgryw38tthqfgvp9vrt5c9tdkz5ta1n9x9loeva2frs3lcr665gmizdi767lmdm22g1vn78z1v1tyg8vmngh58uiqhxnil4pzif1lznwbye2eew41sjuhzydkaansx4eg6ez5i8a21ildazwdhhy0c7hl02ys54merqq0f9qjdxqk5q3q2ims9kwcgff845u6rdi0ooaa4f4m48cxjzohsao5ftm52hl7uy3r8gga2opm3oa34l31ei5lm4ioala5tjc0akaecqxzkmyrn1awldabdgezmc0gb0ygnpqcxhes3euworjtgjmr5gc5yyfjziko0gwrw5d3aimtgytmwxmaoajnmcpamzf4npbajmi5f57wwa330nf5j41wvb0lalru1dr0ure',
                proxyHost: '63kkg00j6ykvwh5pg1sn5k7mrb3u21m16imo1r2haxcmjsdjf6ih77modaw9',
                proxyPort: 3366589667,
                destination: 'wzx299v4x22exkda1qcjvuyoy28v0akppk3a04c53re9occlfm4jieytaml054xqfqf12k0qcsjqaiwarmigao09wwempeqpgxtqzma30yymvk8d0iap8z1grp8bkrdordngggp6i3y3i4oxw9we7ykrwyqu8ar2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'lcbxdeac85kl0l2qv1p17pd5exladzz1noy97fh0l8iv9zql2zfqj1olydiafweh49ndtx4eop3uwt4uqvh4ht9ywkr7zk2l4jp98ppnttmb4nngqgldk2e0r9bq8osxobf3p2j5xwfs21k48jurpcxel8gzrqpg',
                responsibleUserAccountName: '2a2ov5czwq3sv5m50i5w',
                lastChangeUserAccount: 'pd32qqis9f9didlzt23s',
                lastChangedAt: '2020-10-14 00:07:20',
                riInterfaceName: 'alq57xeuqiq8bbsgczdx9cmqrhr1d3bd3sm0cttkp9szf9zxg755pms9hjysau0nzemk46bz0vhfd75h1ozog39whxe1na04xhdvnfuj88jke05s5xly7dvo7oddz8bn2a0zyrehu151x89yerxw3ffm60dhv0fk',
                riInterfaceNamespace: '3a2oro1act7a3ysfryjc5qwq5pon2csh7cfr0ic9ys84x7mmqbp0qfibumav0fwhw41rnswa6a2t1mli34pxbh9crobdfqyat3yhuc9erapvapaiv06vizarj97upz6i9h4tjtlr6puwwsv6e09nov7smbxvef4t',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '5wbu2nkw5f2zqmavs9daulkmizg8yffphx9jggcm',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'kuiajxzpmx0hyjm76tozwyeh5h4ieckukqqlf1x5z5u7fs4cf0',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '1emjsafsw3oygdzkodik',
                party: 'vbq4hb6k6ys6zk3lhelndwx73zv2rgm2we4pqq6n0apzpzrgsp3gfc2n1oso9yi1kyx7ocn4npahh8obeujm0c9ewf6cinhhcf88rdsobgm3aphldupce2r7wg0obr6xuxotf7mju6rwq63zeijfwp8k54zxkfc0',
                component: 'eb6ez73l1uqmmu0ba8jppackcyy1oiru7ar4bf1x3sq1h01c5i22c89707vccv1bmblx9tigav7ku5t5s9mtk53oixqlep7voikhdcr97dkgadftsvav7k9zoxlccq4i5oclw5txtofxuijsm5we57hcfalltae4',
                name: '6h06x2e4yd2c156kbfzvepfwvpram3x7etaw2f8qsaahoz8ev0v813dz9z7pgydsht06abyw74f1xbjeoo92lj9glogiba18tx1p4tuazpi6vmltiu5hpg6la6bro87cc50m6hiu6mu0bucparn5m7ltqnihyr5o',
                flowHash: 'lja4ebh3931o8c31pnkppidzhl0wsxlgaf5ftlqo',
                flowParty: 'hm8cz2dszg681ahh0brpv2x43apntqu1p7go5kxv6wjswxnjxm65k2b2fhugzc9gnfes1qam3jki1c6e4d2o8mjg8iz2ia07fcdmil95ycposw55kn4z4ak4ry0sduh9q9fa6p54iujijonttecfi5qqw0disx3u',
                flowReceiverParty: 'f7nmw1lkwujw08z8z4zkxkel2jgcxpseq8tcy7urtby3z4lujrtejmd503k87a1kkkjnylvaehuy89jpyfm0jpiiwh5oktu3k1s7i75xqw1y5dgrg2av5ouqw2tgwvsovzh9firhmufjw6wngu9fsrmnzlr2dfxk',
                flowComponent: 'ccbrei5nkhgnzkwts3fg2vrn47l3b23qpuaz0beffxyexfhl3zblej5k708wbtk2aqfellkdgcydljpfns08359w8qtet64r5uq0163gh0cphnrt36u0p19i2njxtb7azpuugxonmi5hp52gxirnpfb4bz2bgfsu',
                flowReceiverComponent: '0qh57hpjlza226gq2giworot7kybjypwpmvd026ollc6r1we4y8jizst8poo4l46rcfwjez3q1eds4qh3nlktgx7oejgsx8mq55q1qwhy0ywml2vjes911y3xy5rgjw6o35m524bfyea6g3whz0ir7q8cjynt69h',
                flowInterfaceName: 'bgtcaqqbaeh73bekxzo3ioj4pgeak6oropacv5e5kkgfl0riqkhk8c9jan3sg1iy6jn0mhkh4gwwr255lazse6h96a9qp46t9ld6cofojj9y5afqxv8qjpmbs92ne9fnrixyjaxo4dy1oz64340yrxi4kxbcsgor',
                flowInterfaceNamespace: '42log2qu34gbb4tnyjl2vv00wawe021lnvez341p0pve2vdy8gmck6mu0fia1us28334rhs0oufwbbtg3fyr7bgydwoqcnxrmuuchb7ikpqjui1znglkhrjit1iveljoah0luvsokiqlo07lq35kjmgu3eqcptac',
                version: '1o4gqgsdskc2m3gsa98h',
                adapterType: 'he8b15e5dmy5b5op1oqqkfqce8p3cx7m2nlnvsy13bs0c4hyov0h9p07ab90',
                direction: 'RECEIVER',
                transportProtocol: '5aakarp2rhnbzwixkg68djmiuw0pkj553nax1mwiuyip5oc7vi6oexnksyra',
                messageProtocol: 'kv9xad3yu470v2v50861pe0qi14l2o5xaxhp8cwxuy3qtzlrhnlzogpq9kct',
                adapterEngineName: 'pzkxhc6474i39am87hk1i36wtbwok9gogl8m0eolkcmdk04c5jhbs2ascogbr3m8o05bz49ulr5ds2w43vhh3dc5t4xy50hmjua7rjbwd2086isyajdnezntr28vby5k0fu5jmers2dqy2h2k88ob2nt2kwly5y9',
                url: 'dbt86n8r1eozoqey1qu1ea850xpa3nr2he95v49k6cf2hz6u1gpf8roabb9polk9yxomkgfh6jzuf7uwyyzaq4mfi7311m613y8dblur1rvng6dxx9kir9c1vbd1mtpogl0qeqlo2hjqsuu00a7cmc1szyzwobhez6jrfp0wrfkxz8t4113vvf3kqfmtuycan76ksniedgg1n0umiy1ffchglk569yia5gru4910m5v36jvksd1j3ljbvlcgauc7wk0qmqvc8ue6ppl1yseyvbsl0ltoyyspj6ky2csumrz3thchkmppwmuf6oc5yw1p',
                username: 'gb26svi6s2yd15wjnlxljhaor0blau1x7vcwpxqyt8dgf1dsccju4hcf1w6d',
                remoteHost: 'eljvfmcwbxlyb1w77l4slxy7lxszwqk8jc5on0vkwvlovm8g8ajx4j6r3n6f75een4sjelqqe8zjhnipqbdlub3i90z5advxg58r1gwhx6n9vvyy4jtguhu7mlfhw6lv2e95jm84a1r3yc8df4gs2dczlje287a18',
                remotePort: 5518937174,
                directory: '15chg5gg77hd6hl8db7ys5l7o3nohn7u6u77zx0d2ey8edkh2erwdu2hnrmhff8g2rpft51m8jhsaymtj3nze9zze5htkmdgg4weip763499d32c5am4b4bdfa3zjzpigh6as5lzvqai7vjwhs8g84d14jz1ui6or2j7vx5ba2vqhnx41urvowm7kuyk5t9bifvz7e2dydet9li7wzkvoszkho83m0b2rq0jqidyzzf2npft51qkr1b97wajt5l36naw6ie9ba25k3n3ghrppdcjz86gm1af78djntvr4p7gk6ettwb1f2yteib3qnfcxzrw5hqd4uhg8nntslyg5w85bnxu6kh30bduw5dm4ngy3r0c0yxr26t11mh5kzlgso30bp3doj3nlj1l79t776rq2xpzvzfvx99myy6c5n52m8yyfweiagj258csmwumryzygw9kbg9q2jy2s2yogvl61xk7srrdpwqv0hsijlvaytbxczcxh6e1pz4k0dvhiiyymqpr6hjg9avvnqhc52w4vtz9b0yxwujs05ow0ul1gb2h5mgscmzu88basaury5p7xe857aksmklio3jqkuvimcdk4br7m8rq6ztesohzmxuqz8i4gb2qj43pcto4bb2pgycf0kqy2isypapc1qhyudl5ou5iik1x442irb6joqzfwi4snncilq6jnwpeioqexymmdfosn4c3ix0yogl1wh97qgryxtyham52vl3h3ihpwx1w5rqf6p2g407g60nmw4y6ikqd76558mohspakzfxuxwhgd9xtfxr73sb1dbeh4q766h1q5lakhfgjuae3npnxpa1626n83j8rp1aru20clgf3hmtf5o7a0z47yzwpbc6ag7tf9dbpz6gkxzhynpdoei5n0wi64xucvnv3s0ozdhem7wbp3b7cus8ms246sb465hndhf5jb7nrrjpkchydvt0euvt34rpuwhzc8zvfohrgjgljkttkja682s04jtqyv1qy8kunca7k',
                fileSchema: 'kknrv68pq7jtnuhyiq62osv7uyeomr232hi39c01a5udh1stwqxuiutw2yqrgu7yoya6mq07hqdjxkaklrepia6rlressr6jh09f5o377p21liqmqsx38rcbe7loecb1mbsltc5lsgs9xeqwxoyzi3tf96e19dho18cpd46lj2vefg9p3pdd9y7cd3upkqbjaoq13wrepuhhwe2bhec0xro3ukg31pc4uqs3mty3tchdxjwpb2n1fsyejo3jiu4ojskvftuzidjn3rth3aei7dsgshi8bwuu84s98bdrqsx88u8f7amejg1zw2s3xoo8svrbk7adcpfye0jm5s2bz2nioe8m2bwn801vu2c4kmw3x8tr0su8chzbme94zodwks316g0e959kw0x3rqp3vx2nika3usj155aq0bkigt12j35upx64syw8enu7qbu758sqrec1sg0sjbv1gsw3pihpn49us7igpjo2rictahjyljey6w0kgydtjp1hsdrxqyrh8avsx2356rvcsf0o5m3q8ui4kdlc485gc0463yh3qzcekieran1q8g6yrhgdp1xiuucqvynn28sa3gatu4jfgbkeym8b5r7jg5nxd2w9u1bqc5jcpbpefu8lfobwq0fk9kk7ai079ebfnd6ndl6ljdsdgaak2chfia8acmneuuzyahaop70cacctxxzpccyv0mm99hmnr64tyodx775xyv3xidyha1yd086p860d2eudckf9k14q5b9w02sa9q2gi08w1n64dtno940jziyoioqtk4zmze9os481a10ch2pbxtem55j84mvpey48uuxixcjw6elo0aumzflfms5mvxkvxng2j9zn72zevma0jmbxjokc3ve8gop8x1h9vfae57j80baet1crnu9t6nkr336ypwstjo7mjek0318xjfs4ir7oz52ilmt4kf16y0ftqg5l1k9rxk8246nvm1b22a16cdhegdgmeho5d5rro41l9h6s2zkp5ck3ubsl',
                proxyHost: '4yxic1im68lkcxa8g9lqsdbp1voza1t92n94haxlyb5uvzw719iy4x2ghwgk',
                proxyPort: 1283157752,
                destination: 'x1zt2bxnchs5t9mfcbo62x2kh43m39m8qvfs3amtrgtgsby1usuj25djyjrl5tifes9g9physoqtxd38z3gorgxn1h6ukigdnaxcxbk8a2u0p2cfmhzaed93jijocl14rcj8kgns5z9lab4ubf46cgogsbabszog',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'fynya7fbr8wprgnw5r52pdp21g61e8ct4o49im1ph3ex1ssc29ipms1f87ii7tug4lihfbjs2kefx81x40el5akf47ooluvknbgim7kre0hygu5r80mob99ufwo7n0luh6xp2o5uf631z8pc3dzn21cgblhfadks',
                responsibleUserAccountName: 'f5xd3wpuzo7gcrew4897',
                lastChangeUserAccount: 'qgi5xj3vindx51x0x1eh',
                lastChangedAt: '2020-10-13 14:31:58',
                riInterfaceName: '6nseecd63w5dyhmflqoo1zx4l40obncbhevcvu4c6vzj2kgqnr43vbq6zyft4v7j176v3i6mo4d80ufokz3csl119yqfutp1lapi0s23bes60nc2bryjdx9ii5ey7ndzezqjsjp0if8p8v8ozphv1tjjlknyjx0o',
                riInterfaceNamespace: 'ragqfj2e4hxsp4davb5uz76pifdvrg474vqlqslbe0yci9mt21bzei3nxqivav0oo56cjxtbs7oiig3hvsiizeudw1qwjjvzxbv7ngrzlq23fef0dw28jpkn9mx1ol5rou4bj16jzlpu883n3kmytawaduf31iiv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'zvserdlnw35oupnogqwkkgrvccha9p6f5l3abbim',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: '1q5gegta2h6g1jwh65ew79qrhsxda9qkb3s4my4nwbmu1xilz5',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'b74l99mwmunzopt6mb2r',
                party: 'nnnxv5thh52qtva69mbuebiil737lgshxaamr64yq9uav0fgtwtksbwfmzznfkj0z4tsuv4hi844xu6jj1jodhly53eb64fvzmtyqshylry9ks9dkkuzyif1trrcyus5xbbk32bpb9mmvkefbjx76kigkge39aq3',
                component: 'cgfo8pl39k98l7p8zpo3vbogzzp223xgwnmk6s9eunqh36lersudoh5kic3ah60vjcfwx2cu9vfys6efsce30m3l64ln51s58eda6xetod3ypvbhle1uhqv0o52i4yfeeoj7u4w65g0pngf2jfg3zv4fpv17tkrv',
                name: 's5tug0bjap2ip37moyzb7y9a3j3ax75j2ammdzfmj7vhyr1lvea9u1edf8f6gi52e8srk73jrap6rxaxf5s08ekdnblcezo8it281w7rjvridwzqluix8g65x0e3zet5vo2xyz0a03xo4thjoayem3s3qhy05isd',
                flowHash: 'oy8aokiwtde91gvsmlikfv4jmwf3klam62uprxhv',
                flowParty: 'vg8y9h0oseo4g8ngaz8sym38z6ce07wza7di0cg9o7owqk4bebvjgeugpemsrm1p70o3aodp6ldwi5you5rugtx6vd083b2q5shgdhrod1wwwqd2tq0l2fhu5spmb61f9fmugrc4gma445iyk56jdzpmmr4si0jb',
                flowReceiverParty: '1bebwr9f85sfd4bvohfstr6lntjmhn5tc4yj1dt2fyqnwo00fyc6qg4zwksnt0pigcx8owhgj1vw44gocxp98rqcq5lexppyd170mr5hdl4u8v760udhugd7z58yravuvn78kspdilq1wso1mjst5nrjjit6mla6',
                flowComponent: 'bg9d56vv8hwcpcekke4zcntu3iqfyxj1d8sp4ev6oufian51q7px7gndnhk1ukkh09lr9c3o58fhee23ias61a1u35hx4c1oatmq3c4m3yes20700ng325g0n1qdcg98exer15hymxkorse2iwy5w51i2dfg70ry',
                flowReceiverComponent: 'fgrsc76j249rnptilcemiaekb4d1vx1gokcocqt40eyymahqipe37vcmjzokwwxmurcao91lja0s3bfmf9q54ctmc6bueg4qfkkkaawhbfg4xouyhv0iupcbvcdaa0b5qhmtofnovwyb5ih2uz58a6pfb13c3kn7',
                flowInterfaceName: 'ka5nkwahrrsce2gl1rk39klhy7w9mwxk6t4lt6n2trjo79fc2oypbyonghetrdf9n47v4tqikvyfxzhakcx7vw1sfk8pk603luk56dtaxjuce3v1ey5esgd940ee0apot8w5irfbgg3wu9h5gejbgtkq7o5puy5i',
                flowInterfaceNamespace: '0is2mka1jlan10szrxowz4dd9gs7ouhdfikqlci91zk4yuaiq3og95blajc2eyvtultgfijpzzn8v807qog4ucjqm0ytx7lm9r8rhhf27tggfv2v1etg0l7ha8ocvxomt8894m5u1tcso8yi6uk67uxtp64w3e3p',
                version: '76jjlifwysn7ts1ph2al',
                adapterType: '6fy54lobqljum3vkzn7hmw0sbubke2sov7jgxpgoapn9z2coojncw67uuehs',
                direction: 'RECEIVER',
                transportProtocol: 'u0p4b6dfhsfs0c2caub7k6a67pji1x9fnkqcq2jrkvwhozfzwxt5qeqb9999',
                messageProtocol: 'rrixg5mqcr9nv091pa6mapt7e2g9dpswmxc2gin8q3fgogmy1f8fx3xce7pz',
                adapterEngineName: 'ovx2f3x3w74jqf8y4vxxp7oud1j05sd9ji173mbmp66ry87v4w4b8mfd040sr9280kj0deokrj9wpqlz4do0uf7l4bwl351js7u0t2y4oppuh64z700hrnx0qp9p0l9t5nkb6xi7cn9v9a36gds1whoe17bn61vq',
                url: 'ounctkd7bpyxjposeynvqsomui6qes80rf494kupj8vno72t3oz1vspgtymnbyk7746eds7t74pzvz4zte0cloi76fmby89pp3o661tm7o1cjqmrcn7cb4hrba16voi4omtffjznfolvr9jwoup5yhx63pfoehxti32yz1qke2fbz14f7eo91rbrbiivub0scq4ybi8imyp0mx77z6njssf70u8yq1qkxbpihkse1p2eccvw1at4md2jjolpyv2wsm4chxq2ycgatkjfirszphzbk8rykt34ahlt2e39l9e0sslzh83xjc3rw7ocn5mz',
                username: 'agrh3uvubvwx8zv32dm1md93eirp29704ve18mzz8toabvlvy6e8ocoy3l3j',
                remoteHost: '32l9a0bruk06ti0t7tl36trq9g2iuj98l8gh36yxkzr34dznfihidhladzrws7qln8y8gn8q347g6fdvz3lbzfzkoymsla22vxz7wsdvcmtdzpuhs71oi4o86j1kq97j9a2961i5qdgbiu3d85pspnb3uy0t0pfw',
                remotePort: 59320969471,
                directory: 'jutwzttzwgi5wejvmau7i7iu3c3xd8lr5b4feweomunx6i3pde03ich0emb0vm855u72n4z100vjwasetyr2laka3yihq9qqw8u0ifhwoilgp1fxc59zg3lvhglipqzrprqjex9iiwcdajs402sb3qahicss7c699o9myiiia0c6ounhozvvc8izyj00zxyinqotp4hr8cipk1ny190trh6f2g72glf1jrr3o4vxkxym61y9c5zr3frh58r0sub0texuvrdvtrs1mtm2wxdi8kfoe5r35hn4r4r5wz9rm532rq89d5sygzcxk0oh7jvuamix4g2ntpnlf7xnxec42j1d3ojdsrqnqdwj59711cec4xl6u1dvikx3nb7yjq15w0q9fqfm7mrcbsb98hb549gbo448x8bv3bbobkcq4kq2vizv3vpzln1pwv6vnvvm49zpehn6r97kr0p4tzlsezzgf128x8srn77crn844cplz08vehdfhg336szgygk27j9vhei8ttu4e9en0lze73yo1tzjbytg6zdv1p0f1gmzc0chhulbnaz4yw4pxz21esfnljcudjjsrpaz03r0xv4qkkyobj9zew3irsnrogiche3el21pdcnexwjo12zgtv8gtk37vo1vnq038wwk4q8malt9e2rowrjrxqih1zqsvlf1brhhxhvetqo8hcz0cvv3zts03nvekt94f85huw7pma9go9brtm71e7uef2eyehyfug4vq61yghp3upd3ehwero9c0wbkgzf26oc7jyxxpsjhu7etw0ytl26uum7018xoaev7phcgut5hi96dc7x5vpmfomp73jp6ymqegmlea5d7h8socqjp4qrk3d8k9ovcd1suapv0n6ozrgegifa5piy0xoweyp6mlanllkvml4ddkvjirjbdmewzeuc49ec1xo56fcdso9378ulcqayenqux7zbk82xta7ujxyswjgnj4d1aupxinwjo7h196cou75vqfu2x2kzjk430',
                fileSchema: '697sqz9amzdouboxozqiwsvmy0lvqvh34o6saxsx5zklbn4qm9ptq9utz8tliouj8w4n3fyr60h1dbibsgvwlpzz15z355iclc6aad9dyv4wirex34n2ytgbxsbu5b3c1qngmrpki58rydewzqy67dgovd87ys5wy31innygps1ukh0kkftw31vze3982w8hdw9agoyg82icz8e5j5r33ajc9i4kkcivt8slupw18womjkwvcuaqaes0r2jfoipkmv5meuukpcj99zhuo6k96u8qg7ern2sfqpcmx733xqjx1wah75zgq60r2nfexi4axngeh74svelsfhd55yj2bmn0zr4jymrc79vzgncc5w4a634fofg9o2km2gf94foy47qh2j450ychn54eelvpzfgldt3o3wrsfmqpmvzrrnri79747jpauyczs3w7x0ahe9a2xhyrh2eqfgy7nauctlirb8nzq0h9z6p9bo3r54bkoc8cq26h77ug47h9x845qebgai0xdbszb4vhs1a72xuopt15e6pxkv67k1vzm67ck7kw5r07jxk64axj3n6xi72ofnh20w9kdyaoxojx4vwr2hb7fhxwlih7ifc32rzt9nu2y9o12q3y0q47x4vogd8dy0unyi5m0rnhx2aeos8fedez9dx2tpm2oh60w8h0i4b8rf9vebo4d8svoghvn7qgvrrz6td7mpf3cz7gixy3ca53175r56la5ey6yjwqyzdgxkarnmqstq5pyc2a6exf8gruqv3a87fbi4nnvrlwjsfm7m5cgd5li6ezan33n0ywet8v8ukoiot3cukkr2a1pru3bqlq6b594leg79wse582qvirl0dikw2h21fkqre5mlx82nf5ciujku0sd1b7q5srtsz09rrtm86xc7ixm6lac1iauh7kj8e6fgl1zxj07srihj77ae6ktfk0pwjlpewukvauvci62t1ss6fb9wndub929i97wfyx1l4hyll6vu4gxhyt7ioye7r5',
                proxyHost: 'mvmk2spgn37dgg83p9okucttg1s4olqpnp06fzmrwo2cnd33b1fgdiiwn47l',
                proxyPort: 6345555570,
                destination: 'b10szdq5p09sdno4rpcmslnhynfsn22tp5nt0xuqjbxywinu00wypv3h8c6ai0gcnwjfeeekjabhs44d2c5caxuuwsrg277g0pgvqm1itg72wqxg6l7elt89z5sa9wr9deaurhu6f67nt8z111lwq7xwmdgetow7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'e9e397h2bmo52s00yd5gr9hno7vlc3rzzbr933odjtofrbwqvlaq0hbwqeo6guwg3d6ijgknqbrfoqtx14m2kjx6czft718whdbrsp5wbhkez83801b2b4xpf592orpjv9aenuwsrtir304p6id5am8kz29e56ch',
                responsibleUserAccountName: 'caw3ckc92g7y0ketxt37',
                lastChangeUserAccount: 'lpgc99hvr0orh2o7dhm4',
                lastChangedAt: '2020-10-13 22:35:28',
                riInterfaceName: 'cuk73lbpc7sszxcmvekyhfy2h5rowaacrzpssa85lyqslu9v0peqtgm7jwe17r57cc3yyeypl7xzcjqixhgt4jxgp8rravx7macr5zjn65o0c5ug0t5lptqnh9cnxqgvrjdl9bur3hf2dvinivt7fs10kwfuklj7',
                riInterfaceNamespace: 'dwaij0o5egbcol25ggj97vqq89h55ac4s8mtqrrsqi1rsw83rxo5l8v5hsv9249k2xxmle7adc2awktjfh780vgixr229s2s5f2q7coux1ehxtybve8l038zmtnmjmmdyhn7ugkanab0qv87uwn66crqsnoxvgir',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '3zg1s25m6iapnegf22gou8cgxhhb9w0oarht2t8u',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: '7zu5q5acj5efv3c5xhljx02czm0v5tiva1x7nm8t4f8b77k8m6',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'za8fovwf2wev6az03yri',
                party: 'gjazmr17ham2m25doqx0mg1slynei58qrbeg9zmgr22kvcfsdpxbtp34pbvx4xcib37e5ui38seab07r4ryivnfy1l7znh9nes2b954ru6or033opjnb0d1fs5ll8imd926x430zuzwcfnmwlvraibxjycgaglpt',
                component: 'xjw30bo6d5w14sns98v1lgc3d1ust1s13xgwmdkiucn5gtlinynwg1df3yuig4osg1fsbp25poom6kt49i943lv0gs26us6sh9bmp87kyi88df83gmyei49nyp25ftxanliviti4zhbzckb98nm6794kntwrqpmg',
                name: '3a880392nlfawbwz0i4a9ewnlhjgjx7w4yrth3v9dvnse5s2n9vjbtnococ3yxpphversii12vq78zakby4p33irpfukyxxzi1t6m2ev5dsdbp3utaz6gbv9c3jue9pedfdssrpl04vqz8o9o51s1lx6zmfsuldh',
                flowHash: 'a792mu8vvupi7olkz8b5zd1is0b8ef487ogpomz4',
                flowParty: 'q9e1jyw4j8xhnjhoslzoayerhvjifpz7392r6bd649xm6besh6slewmflbwzvowhcuivo9b8vo8sugfgcc6ep0na3lgir6mjuzrjv1c0nprxog22n3ol0hdw3p84tgvmjkh2qd7zyg1w39eaeh81c26cctd84am3',
                flowReceiverParty: 's62wvb9vfwbz2v9zuxoh3xolghn7twy1vc62ww47yruz2b3s2lw73hp78m4lepootiggz9gk1leje35z4am8wzgao2asb3u7m6k02ec6ip4blzj4ram19s88uk1b5qn6uavel8pm72kwxcse7uxzxlpcqvd93q57',
                flowComponent: 'usfk1bij8q2vyn6hbkl8y3vymi5srqlfrznecfv7pdtvk49ftyyjinew3hlp1j4ts98jkab9hjuto76d8yki9dle4oazha642a5u8v0yr7ntm7wgehp8fnwoqlvyfygm04xvzsnhluokfmhj96tbv32yjnorwe8x',
                flowReceiverComponent: 'kdy8i9il9l996sgn6c267m2x9ngze3zqdkoigg78u1arl5x5fyqsh27re0oj846ogqkie9juzj77mg6phtg6bynbt6v1tp00md5auj7xwcj4dq38r7391807oigm8sf63uclrxtx5ydbbptm8ein02yli1eyhb3k',
                flowInterfaceName: 'kw8y0lm7zviccmek3wfxxjptndsc8jvyd7x5ty6cwy4nao2hvo9xrh1tjyrvisf9qvfn66oysql19m0ri01zjnu21w8dk34n88d9qkt4yl6vctffclkmfftz1y2d4ksehy4up9jw9lyhud05quhqifssnb8mbtq9',
                flowInterfaceNamespace: 'ykiscp9s89dfbtorr641hwww3dyv6mld127jeg8zfc83emxzpd4bmgj43zrcrfowj05etj58mnylubgnxvbrn6j6htwxbycfej04vsypniu0wcwwbaw97mffp37pl9hit4pkwduakpijrvn1axh983rymnnh4afz',
                version: 'dt6rv0kezn9te1u68iwv',
                adapterType: 'u5uxsytdzkie6pzffl4p7w3cxvr52rbflcc1t3o39s3nxmhqldb9j07k2erm',
                direction: 'SENDER',
                transportProtocol: 'id81iafyssmtc5zylmuferlu2tb5u1a6ulrs39vxoosbechm5ulfm38jhamw',
                messageProtocol: 't9nu9td3sn44yp11xnkagai58hovnrepfa9wpmyga7a6s34g1n2ibahsbjku',
                adapterEngineName: 'h1jnnps325e3zb9d64gibv77xgcwi18dvlpf7k3rfj1axdusen6hmob51h7by8w220kacd15y38mmw1ls0v21u75ov0nyt833c5pgusr49cmnvp2rpyw9hcowiq54ozy3y4nabyhq6iq4brgalne4ygjdh253zho',
                url: 'mrl69g3behd3ydz8rsl5s93gwdeu4w4szzgzgyoc6x0cy1rtcqnkt8xv79axm0xgwdwbpglul7kgmstzfk2vo082wdf4hk980z4qg53c80yln81uq4t2rdya3rw5kd09rvx4fe4i0lzeozqapm2mfps2bxrid7qy96n6vbwpxzjexrhliioedodh1oeqt7utky1b6teizzers902naapaaqomsognlzdr0fkzq0wprj5f3uh75h1oet9nesyqopcucldd4g6mex6s7q7hdo9tbcimfj6c2s4d589bp2nym31rfasgjcnb3t7zyd979xb',
                username: 'c805lf33at29dcd8prhqgctexizel6qwlczm3uzuhiwsg85w9apzpdjfk0iz',
                remoteHost: 'fhoigl9cnazdxeqnw1k9zktg55r1rk1gcijv6mb2bvqcnp2i6awqjijmayu3raorn2yoij2mmf0xxmvjvuaqg3ifgoai3j6e792ldqkj4w17tf1yqxq08f9u0ejyq7hhd5pme2lzu5kvp2frwd5etq3mo5yl9itg',
                remotePort: 4181693213,
                directory: 'u0p1v2dg5c7bzjuf0ecoqvd6ll15j33ee0g1srrjblboyttgpl0puu9p7vzcf6uvmx01cbef6s30gyhrpzqzhyy4vzs6804fab05opa9jugp2qug1uohze5ha6x18b42k5g4rnjxbyodv3uuf6zzstpr2t3k2uj2xp12g0vymhz1902l3k9noi8ovcoy4opw3cvnec7t0t8ttxujra9f7ubqwixjpj0s0fhis4ed6ztakqsus7t4e4689vitfqgmevo2bwt8fuw1slhc9gh140mclmk6j7r7we4h2k710wzqks3rh9wge6huqef7706iglkmnevxi0rkyaulmxk0nn6a2nblfurvu66gz56ofq35ztmj1cbnlcxo0k6x93ej9wi39x4o31xq3ip9lw5ppu4ixxwltag7yi8hwu1fzqc7ybyqhg9cymkmsqca37k0aqir79i7y3vtu1ss8yb28a4gqi5eyooj00xaxhj0t9tpkd4sugt1oaprd6rx29cv7vn2jm9sng6c10sv5dfdmexjwiur16qp7gmje5abou2zggbn7iklkw8ys467jxnbendg17wwvs5z3ybqwotukqdn4a1j6p7hzjz3hkdqc6vk9ed0cuv1dyr76np6ns3r30ej8fgfbetrmwjvmrzkajse2lllo9ibfvic5dkxlvk19k9pbdjvbja5e4396ye7x42y3ayn7vzhd0ykmbptbtmkgt4tz0ehj8xn2jvkj2461fqpc5hd2rwhhquzpgr2lu06lbxdqoc2k1fusoyzq5e3cqmkfjf9l6myomwjh9ywre87nmik1o1oo3tpp9shr6npaco3djdhd6qqvzyc58kgum4wi8c84pdvv3r5ifp7tnqu98n8oedzshviaf2xxra6676qarzhjqa18gzph8va26zifwbwc3u5zkz4vtnvtp4zkohpvfymamzqcokz6l7997ze0mocrr4h7vh9wamcgcpuwdbagao4h0sr4nl2t252k1bxhhj9yuj7dze4y',
                fileSchema: 'qa5wqxnhjkkxdwovs9bgy4g4dd2mlyxsgv5lfudsxhy8vw2pemha1mjll5hiux601cgek18eews1ncqa8scrkdrv9vhabsy5pkjs2j0qz2woy1l3a49bx7tzocbuyetqyt96wzgqdibevesx60s9sobb0mzexxekuoea3zbkkru9p0tl1cfwcm46027soffnh877mao53sdmzdn1ymuoayrsrv17sgntlh6l5bg8853q1ns93f6tl8hzdzn2cmgskmriffyhu67ofbfx6meupkghnmdqo37ttb0dmb8tisxpmtv9mn6848s2xbyf9w5wbe94laaxh2vumtq8p708x64qp9dflo88k716rp0p7h7j1rimekx3lsnltk37czinp9udsylf60a57w25hmna8dkywtyz5sjrj9vacsdwx5yfkg9yxysv4boupnqvrwvx76p61ge4nsb5w58fqmevg856gl4ngeh01n7pvhal5kalee5n0u0g7gd1tpxf4c3fi4v8ufzmw6reztu8k2romoq80b1oaleq06pfguoty6lnhfweqf7x6n2xbnvgc8y4grxize31n2k8d4hi8r6i32a891mv242mon85ni1jzgv4zz5czoqlve28i96lcl9ry9vdufnz3pom3bsie43udxpmcyze0mctmx3c74kvio13fy588kskev56ctqrd3y5v31ytl8ewlw6mkwieqmcrzdjxhsywwlpsbazxh1y23n57tcip7xc2i4e0qw6tt4m2a1jicpt9ech8v977xlj9u6di6nfdja8cun6f46ii83q8pbewxjaobo4jaf0qzvt7rodqmh1c6tlcjwjpmxyi8rutvj649ezjbtay6h59civcgaoffmtw8ra8hi8vfzt8r0sbb6ocivo6ggw72b28z4uu8nulv7jr2xwa6hssate3a4eugzt8g9zs9jevmbri7lo4hzgwtan6o09eb0or5piz8pnjxpqgtylt4h43uzy5e9jg9j2qbxo9lis9qww',
                proxyHost: 'zbgi0l8zaidmhwmveldhuwflb0rws7mlj6fjys4i56ob4m5mgcedh7wif2ej',
                proxyPort: 7250943714,
                destination: 'f6p8bz16kim33672ysoc1nm70y3b15uhq7tzbvbicsniv1223b8sjcp0ekcxpy7ay7ok10z26hcwjjvaipyq0eber4oothltb0sdg7gdkuhf9dr9lg1n7h9t64jakx7l0tlf2nmabzixcu3jri6ye58m8ycm75wp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'kd04am8h2774ku3mf3ykb5573tbgxman0j2jgrr62259nncyezqp8yqpelqisdukommnozuffs837zbn4fgqc8w4jjfh2z6yo23tv6ndiq9n20ivww6iercht0zh1lz7a7kglz9c6l631058k46krhotqa12uy4e',
                responsibleUserAccountName: '17dom2pp4p26tszdj83j',
                lastChangeUserAccount: 'eceyw6zxqp47r4k8e6ao',
                lastChangedAt: '2020-10-13 23:13:35',
                riInterfaceName: 'rxw0yphds6h5tkrgkwbflkruemjhpfatmbwf9qmpqskyrh6vvyj5i8av3wcp51xmuz5utseotv0o4vlr83s9f6uphfo0xnytzlw1x20vu5n0p6nukbzc3857yhjm5zzl7i34cb2fn6a1dswb9tv21p4chld80wrf',
                riInterfaceNamespace: 'mu5bhqaz8r24ivh3wr4jdfa60ju9fj8m9wf7l94wx5y74hloxnqd3nfgf1ehkzon3ez34112o4cnx7bek2lwe7r95saienm8yqmcyt7bj94eqjokfpln7uxwcrk91619kgzfl40x54oo6b4r84uze474fsv45e8t',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'j2zpehsnh4ipiamtry8iupjnuu35xq4hfoiqsx08',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: '0cojn13b3etqwom40s6978y7vl6boetri7fgs0rlenl9icsnvr',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'gnzzwmjavaa9f6lhqx17',
                party: '9gvnygtpmri72nu8pfqgl8xg418yl7eztwr0id8vdc3rf0486lh3izy2zenzud8ehj0ywrci29ny28n638cm9dj7ubx2riiz190uzbhf68exad7jmedbqoy6o9md6bi1rti4sblimb8t1yep2yinfu0mljeojoau',
                component: 'ftkcnbiorhi0rkl5jo6t590srw8cs3nht0h5mi3ht5f9ipu2p6z5o7oo5m4ircvauyekdxtsvqj4i1wmeh2nc6zeo906g564al89t6lcp190iryoi4s21wlpffjdgt97h2y1suya1inm31zyqceudz4ci8xdxo32',
                name: '5mis019ecauu4n4e4mcycq9x77vb7suu22pekbm7jaso702wgmne3vidonumdhpji5nl2balvtedseieeffi4jy86l8lquwzoa755al0az8vx17m2w0vqv8ol78y55atg994qggyos7e1fh2pg5wrbwy12yzhiud',
                flowHash: 'u8ixqq2pnnk9bu0rvwpfp615byg690127wak0pw6',
                flowParty: 'p552eqklu2jonxk9w1mpais7jdaqf7ykbyk74azh7ysssuzswpu2mthtzh71k8phxlj9z2ddzbw02lpalb1d5huok5x51hcyypvwgr63fh55c4hkl2dnwsq4olkxlihzrr8lp3k0ra61o1knfqi07x25kfsrtspi',
                flowReceiverParty: 'xl3hx74og5xq6nm8bgml8tce13ocoaiwip8g791prl8tg5zx544jwwnrfp9oau2ou3xiyhps6flnkharyb5c0uuiht77abypbmbp7w40gsdt9hw7s452hgvaeziwxu986pqnnmtzb1nsxol508gon47v6625ffeb',
                flowComponent: 'adugturonl8o2j7suou6furgpnyegkj0gcoidiamlxc20dyh9qvf2t28u9as4as3ciyp1kihsrxh8g43spmisfy7tw4my14c3n9s98sucd9cxlz4snegub4utlpm9ft0yrnbyal7epd0f6yve47a75lwfydh9umz',
                flowReceiverComponent: 't638wl6xyxd6myykgg4wp83x2j9ufu7je4ef0n80jp6h3k6arzwu97s0edaerkt67zdjk0b7u1r75koeup2jiy8sovbfn2wzlobg689yev3seyeoqsh22rsk8i30ltdpzeilwspmjglrx1dq990nxhp3hbrdwsy1',
                flowInterfaceName: 'e88bhzlf66zfr1ildtvcf2t5m3wx8kajfpghtne9n4ea6o2z259xntdsgk17f82aqmff8qk4vh1l1k2e5go5m7zss2lbm65e9aklw7i3i45ye4nxebb0zmzlh2lagf8tp2ge6vigurfhnnzx82t52wbkpgsrw0p7',
                flowInterfaceNamespace: 'tzu8yl5ht81hbfa0lw0krjao0nirlu7jbdh7xtks3ji3cki16uk77hv7bjjh3e7irfbvyyjik4qppg4cgaxkltq7h5a7uma176lae46ugov7bygrwrzz9o2hlwihyktowcrj4k21syp5xx3pzgnbb6chhli0gpqz',
                version: 'u9hjudo39ssdinki6i4p',
                adapterType: 'ucg1wuyypx6ai1mrkdm6f1689mab92p5oi2dvkmy82k8sy16xr6kfc5hwqd5',
                direction: 'RECEIVER',
                transportProtocol: 'zdbfsxe40kzvif8n9c4wtsyf8r8jwey2a2404fk3tx9sjq084tpth3x79luq',
                messageProtocol: 'c4nqldk0qv5n523b7rebifl6j8uwq4pvlrmsnltpbwymabq38j58bnos3dmj',
                adapterEngineName: '1vdyrz6mosai9l6kl68nm17agjhtgm7a4f82hq1dnt1hamcwlhmsjdcd4pvgd7fcetm7x7b9es6v91njjg747lylrsocobjasomct0ufnw5sh9nczw15vw2wvegxq4mqv4c0ipxyp1vhgcsszpnb3xj3qbuljzmu',
                url: '1pedniyg7ud7492ryiis7s8h5qpkygagtcg28ndg9pu03nn19nt92s0c3m6rwd4jz97au7wnwqpd0p95sip83z8dtrcjgmcgw9gtvssupi2xz3obp4afkckro39wxhl43wwa78fna1g8epd90kauewkeul6nodemg7oko3ki9qjjuj5uau1806p48znuddg2cum6nnxtarw30sx2ge3t956jvq5zvkmc45pvjnlreivic50fi0h3gj9tywg9bjbfy2qilj7qno82k8rtt3fn65l3kd3s36o93eh6l2zk6djbpwfl99icyoj6i3czu0ge',
                username: '5yixymckj1wvndlfovopbtfibxz02cs7s11kh7smdeudadt3lq09699j0u7w',
                remoteHost: '4p40l3d32366ohze3ep310e7duuols3lbyijvw1g580h5avnj5ni4fxa94acrhouxt5s8665k0j9xrzcbycr3ph9q8hlr9cwyt8a98cw5zzrcku42z435snarmkb230ix7eumuhjvguv62y7i7xvtvy2m94tpxk7',
                remotePort: 7064461340,
                directory: 'xbdhoxoi9mq6qlqp3syhdjp17i9hdwgcpaix0yyuwn11004jw9sagczob24gypxp2q6u6h0rhkzoajoajgjqr6ddbf2g47qc9qe29l56co2qac9tagscc995cmge2j513db1ps2prddjj855xageegfksglw5h4van5ji7q3iz8l537km9ty9wbdci47nnjz1s3dnwnzobn7zofj7bmbzugxb9lal95479ocwg2oyijf29ldxaa04uykk59ebjev2ctd3i6xh5k27m27t7hsh5a6i6xtcvaum8micdxy2pso6vcvft4xlnylyb5wliq8j6azfsvapmk02ycl38ll4915w4ivcjkvb4ozi2d3rwtevbml47cxs92jpjno64jrgaro5wsqrha65i0gifn1jbcetzdr8xmeplznp039cilraluk7fgtah25v1xrvbtv0bg6e8h86quvqbdoagwi3to2s4u8n8hw4cwo2h8qo5vn9w1bx9fq0q8cver77u1mzte0jt8ua8vwyv8s9ldoka8o26h7qbyndi75gs3uqyb0h9ekoqm1dz1aqxg2db1z6k8mvo3xkft1u4a3dten43swgg7xfvesjqqfblikki7swkl871rwwhi3bl4v3n7f7gqvnx6yu38vt7zfu2ezfkpwt96kfz8l08zefqi86jodhcnym4yvr86e3wk23iungxd4vsp7jrq9y3n6njqh07b967d273rpzlgtke12omd8mbm562hfcoltd34xl511tfjlzbxsjo5jxtsucg8bo06ftqektt5jn8i9l845gyz8loj2zqexhz3jb8m959uc4kk4zsj6jydyfdkg0rwnqodg5rzh6r0zmivsm5rqloz6uhastg1fjtfpyr6lhwamq27t6z89811imxkqiimr2rpzkt2oa5du5p3bi32f7awr00xcacnaq690gqxug554m6yxgnryb8l3mvu7f8gqe9pcta9nzm7tfgpv0el4g6l8esynnj5zwk9dwxu2pt0a',
                fileSchema: 'umao3gwqpvwu602wiu3krozpj2azdj0uls1y4977cn1l3ms32mbwmyflqcnp9fhoobzdq704iq1y39tqchajd6r6zzp0ts2wfrwu4tap4asaut4wchc9hd52u2jrugmq4hcj17ptq9uc9gcosz8meairglanjlwfbzhbfm4l902j3xbfzns30z4nbe3tgkhgm1a7s1v2ifqu1jfzx9scymb98897k6daqdlkvf26no477zns81cji7r0y7jd7rx0xz67ecjsg8maw9m4dvx90knel90jhy13p46wsk021d0h61fkrcla91x08q6ennogdiqi5n01cwhwgmzjlz5mswtkl39zi9zz1u9e6n81i2fc2thm6pf9sv4oibmjmv4d1o9vu531b81zhhumooxhvb4nre8mxlpjazwjj6vlvnuo4ofio3z686dmcqkxgv39rcwc64lg5d0uuydrpusn5uvngyw3ivcoi3rkde2jotlxmectbqnxnnzk8th7snkr1uh6g0eq7g7ji8ub6b5r4ibpangpxrfxeao3nw4nhqu5i1f68w68j1iqq2rr8xrdq688s2hhq6yfbadvemddtjdvqm4b38gezqga1pn2biksas6m5p0urh2iy8338sqxfgkn3onm0ox6ykzaeqchnvso5vf8u5qa0sdqxmr3r781isnl7553a29nune47x3e8gsknu8w0qav6aelw5px07v6eidjlfjdvtq8bbf4trjusbcixnm94j1d1xaor9bgjcuwuhqufcka7yd519p43m8xtbri9lh5tzcccj63f2y8rf2xrvm503k62m68b2k0r99pqr2xvnzqd7h43rggi1qgi620wp7kyawmc0t54bw4ipa2t7b2iwkf1tau5af14w3be61pxx4mbe2tv4jtw5rdgc5gnjjofw80wopmpbxohjbwxeq43hoquokyiq1her9d71242ohfzx5tr4bo1ityeejqlx3m9xpwjxjy9kx6ynaix5uar7p3x9kfughak',
                proxyHost: 'eci3sar4d4y5p8nliwwtll6ejzvjahuw5s51y06euce2xlwpxfqxe7iqp1r9',
                proxyPort: 1823151065,
                destination: '4d8nz38bmdjiqol1qon84ibqg2o9rx9knx89akea7yd6ku0ikm273lpj4uiosspmxemozawljhecij773a39u3hvjoum80xvhnnf0l8ppjmwqse4noscyh3cfb8gjn0vxd39f4urame2hih0ml2ykrucawtf0crg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ezjx7x6z20u0v8v4b6aedd233osp40p7olkrc0ko0ubbrg0qdhimckpii8ljokxx9g27mtn7u6ymidvsojito5woplq7xneh01dtoemmrse3rbqf17p4xkq59khayrkobt6lnu4z2mpaaupjvayd0hpycr1c4l7d',
                responsibleUserAccountName: 'uhq1yz81d16yn3t056xw',
                lastChangeUserAccount: 'if6o0e6vsj68gk3c4s9q',
                lastChangedAt: '2020-10-13 23:02:52',
                riInterfaceName: 'cafpadyob6lhmskkok3aln9wo3ouhw7vu5tc145qiuraawyxtqtxkm83fp0iw6adihahfy3kle7wt6ynf14e6q47xoyn06irm2ygq9efxmk0i4noagq6o26lj0ed0geqbgdwffxg8nbebre5ko02sfqespw95q1y',
                riInterfaceNamespace: 's55xwivgt7rx2f2i626d246qaa78r32xclb2f78hx480jwkxlytyivwq660djoqspigdi0xd77j1iyq3jupb2v9axgg9ajx4i9gpsb4jxgnr6v8h2k24pvi6qnt5rmexhrbizx2aai8slscevgu0amiw1ojddfdy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'oss6rr8ely2yvm0twbw9un92uq13wukrcs51tqmb',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'ff5rv647s4ii6dv54br8fp29rt57cztbd3mv25z77h0nwmh4gl',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '17hr45b3htdna0r9o7f3',
                party: 'r78pd3ubu7yckfl7xy04sdc31thqvp2foqzlcmy9viqx01orxrlch204m85f9e6hrqgm1g0rgny5fd147vj6erz6j4t1epjdmzwotampl3jiix0ydlgz4c8x8hrgcmke0wmerqubckr8t118hengjj7w85r2ywr7',
                component: 'pk5ej1adf0b52az7wo4u7bwqcq9ao7h8mbw5rqzb5ljhpz7p1f9dydde3gw9qyxxgwhx4ftps09okahfky35p1mdlu24txu3gwvpxvpeashvmv58qcsbisrfyg3zahu080zg890vpify5swd25sxmm5p5025gswt',
                name: 'omtb8f4nl9pvn1ybxr0ia18xnrr0eir9z618qbekrn1mwn6sq9iub7b70eoicwelk6s66k88y02rkf54xox4dqslef5ivjd0vbad4iiduav1lfnb0r0x1v5lc7zcwo808g18olgqpnnd3yzgf9epyriqff0spw17',
                flowHash: '2lz4qq6wwdr23vkiiw5mhqp7q46jcxv92k9pibz6',
                flowParty: 'fw6ulkwo69pxeqr7d8p1mjt2qbp0rmq9cox00ftmd5gkjbkx1ok1vphlh56x1g4yn1o20p9vnlez1rlltt286uyllw9y6mjudl6rh04o4yq8rxw7t7rh3zzbau788txqoft40aacsfaq3edl5gipemv0gium3bqt',
                flowReceiverParty: 'jqppbksabte872kcv7588mtfsqh1nl69cck021nungvdnrjxb8f6amqmhgx4spirr436t1m40stsdn4lb1ayvtc2cbysp75kctudorev6ocev3zc4jbfmgx0a9ihm80nmz99mszlz3dscp0qi0dzqajg3lq7c79l',
                flowComponent: 'fexr0xbll4huejggfjcovp763ilg2vwu5q1bd2zkm0q5rc208qlen8evzk79h2vo98488gpg1kq66fxbt4sqrjbql3s19tv3jc1vefr6pw6g5hdhqwyyo3wuz2zs71cy17y7fl7luapb4hxnurugaimpnu2y99bp',
                flowReceiverComponent: 'l3bckqxd01l6h45uo0bbcczz7yff9lk003ern2zrg0s98zvp50dbixpluk6w84gb03a1xc8quri9xse032v2zzhrgelgnxx0n5ivl27vyiofqdabcl2ak73mqhmmyiv4j14kgcrh41bwvattst4mujadr3zhzr8u',
                flowInterfaceName: 'swipm37au8ve1m7vjesfifyefju6r3fci9cs500z1ajce2q3im7vbv5dm5z6y2wnwgigx7po7mdid8bbnmcyipbvip4m4pg8b6b2g4wxcs2ioh6ddijicb9uvqbeigi21o7xyaupisk4jn9jl9ubnbuc5rvu13vm',
                flowInterfaceNamespace: '0adg9236zf9mqz5lyidbav5wmy7j96121tqhvx4hdedlbym9rjwyy0wxxmdzj6hu15yg5kn2ruayl7omxho199dt7ac3vkzkbrg5c1fs6dhkv5z2r6anaq8hlwu5gdl9t8l6u01ynedzlpngiiunnjnkfnvcjntq',
                version: '51yotoiojxzx2bzjkuyr',
                adapterType: 'kyq84n8l5vftpgy0ynetfuuqw9j0zz28dmpnh2v7qipdn8q5hm6hgtv5unjx',
                direction: 'SENDER',
                transportProtocol: 'ai7k6xxq9uj6rkqdynlhrss865xajngq4b63t7ab5evk95oubv7f2vpv2n9n',
                messageProtocol: '0r1h9hcfbozv18ugjt58ohf2iwbasfeewyvfofsu7zhkoyd93ss1d4bcxhqi',
                adapterEngineName: 'svv0mau7a69dwx4lf647ugcxtdbk5yq39a0v8a8uvf5z17hpdgbvs5wr4vu8e6c5dtmootxt46l9r4e46t4x1nbq03i9wczprz6dd1ilv4lowjrz26ynlf5py46xri4usrqzpj7p8c7n3f4tnp203fs642e3rzzm',
                url: 'zlr3jwcjhxkszhxaqj4mngk4atqlp9gc08atqcfwxeop8fgz0232n4z9dno9p12kjwait08z2cs3h672iq2wmx4tljaanv32cud1iokjc6zuuznp6rlwry6smnlx4wulixqpufzdvlk2oqdbslr1lqk8l49dt3q3eqowtj3u2qyera5cnr18toc3lxsidz11hupc7x48bn7t3kmt2kz86mtl0debn399bx1932yj62v5a74108nnha84fk78js6q9oqkzwqf2143yxj3013rf2pcu092g3or1kqf833tpxva5a0qnd60rlex5ibmnez6',
                username: 'k9b7ncxyofbw73tcr9o2e50y2pgitdmlskzsr20rebi7c3opb433m0wrz10b',
                remoteHost: '71nywlakmyr93yrz71mxz6moga1ro2aw9nw3wakq1wuoiebjlcb2xy5uck7wyvltkjc0icjejqihugu5unedld0xgc36d1y0ygovm64vvd63kdi6jyd4d2c2ndmu53zaxiltbiwa75q6x2ddwzatxsrsaptp3nxk',
                remotePort: 7256429774,
                directory: 'lrdhnjhhuunwpe6m967ncaztv37rbuz53w21t6nfg6qpbn0791csqbnsada69hxfwqnuvodhs92sly5udn133p7ylwrbaqsjkni2e1s5jvciiq5at1gbnaayals6haegth24icw4xx9o2cjl273r4rdnhr07pf7hxoahz8tiwva33bi3idux3x0ja1qr39e80zpncm9p5z8qu5yedg8fx38a196x0tfgpxm46prkw69ans4c8zaoepdqdx6f3ai34ibfeo96hmj9pjk4nh3dfbc0zm4n0w8culwb05lcbgrd12w3k78nnfet5it1pzxvi58f916kdicbcrurs79c9azk43wonkms39da5mxcloljxwos0zsm84jyjtfdpz07ayqa4twdn3kv6uohezt383aa2s3rjrboegkag0jvw0cl6zqqk0z6s6sxi52mjul34hm0sr4tdxuevlzo3fzsg3jdwz8jequkjxk8mrjegmdelviv28x74xkf0scf7k5y0mybm7iqq1dz9hvh57k0zc1eek5ikvt7wgla2mlsb9p0rs8qkvcihzlc9cexpw2acnvzqvfe78sn0oowdbfm1hmmg34ginler2kpinxe9e249urx7x8rovxxt98j9e4z2z7241kf5h4vmxnltdxq56adgztd27ucg0ej53whkjf0jppg3ax0t4y6dirdyew7p2ptg0nk1gla53jy5spud2r9lu4zsfez1c1g8zugm4daajpynpxs6yjcvya00ceaanhpe3b2kz5wls1av1e2mb5lebrilmwuwa4y91jp9f62nxj1ifdsgd0zzaaz3bim1lko0k9a2sgovhz3dp6rwi48aarwz1vc15dd2ff7gzo63uymblr0m9itvnggcdvbz4ldp5bq6c5oju561flej08newvkbjn6lmtvxqvdeanbw8hclfapgw1fiiral132zyctcehuqjtc114n2ftbn0set3s25lhjtfcdw5ud28xxuytjl4z5iczjwvj5s33b',
                fileSchema: 'ws89a4bd7vwr3cqxyksle3miltcanirrzq55rejb3kghzr7zokt344tbxq064r1b2u3zla7d0y5ugoix7suknpv7sap69nm8maw7htg5hy35ez89j56dur8d7oro1vmz1z81gedge04lbbf18b2zguskyy2psrnxae9la72r749frdh4klq3tar1csa365fw0ay3f4r980nskk3gb7o5s1dkcae82rmygatfr938ggwg89qmauxhgbfu79z2odz6713fqcw6obokhd5wgwq5dnvatqo631w94njsc82i5aumpt0jmqnpaahz67tlvbbzbjppega7m25x1pkw6kedm2cgvuocyk1objo6hg2hher5x8wtylt9dkm075e0bja64mox1xz7apqdnw63yu7qjeyfa7koy2t7mzus25xwbmiaxi3dbp01g6kja7993ajpfb0jia46ladgv4ypdo0v0b8wi1qro0a42t6lrliabx44tdnruoqcgumo9vt6he1v7liu3doduvqh49blp8vcizh7k852q7v9pw62uvcg5khai5p0o4s7e97w1utw4ocs61c0z9d209t92x4skzcmn5pk4ipduqf30vmzbwq9up6kelhsvwx36orhg2p9jkorzlqgobgdwgnt4lup56fmh6yncma2khbszi6apg19idjk9v01yez2mz1rwgecso3edhdm54mfx6u710cri940pl9w0r8mq5p7t6pknvwbhvwxy03j9zjbje6u3evn4jb86l9ac78r4t2tt46iamzu9hkvbmg9w4pgctfmlyw4uxx82vnbswldis6l3zhbjez9z0sv52ny9isidv9d0dbnjxedcc6lxcew5yevbs1ojmohfg44yaqkqo8lyf3xvn3hsssmozc5zyhc7nsws9f5h1qrjtey3qnn25bdsdrvbcog1g6qjbcyn0u7nm2q0d1av04tgctnk7k3m854j3wvnsabje5kbfb9tpz778u860w2mywpwa6oryqdnr40bqzf',
                proxyHost: 'ujn9ysqzxyrc3fqzwlcfrlh60slsbjlv7c3shsi7064pi5e7f1jmy5e47idd9',
                proxyPort: 1789729396,
                destination: '5tsdes08l1l65b6buo2vpzmqq54wfh0f8g0uztu2io0p0oj55hwolasdfgdh6kllflugoxg6vafb3ytvxb7oki6665wd67zyt37z986gbwmwawtx04c9fsdzhv72zurixj5nop1n58ggc96y9pwedzh8qx70tl5w',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'sxqj2qz2zmdxe8n71gmkgtfvgw7b16ongqfn2hdeotlcr07u9u9k7eeowqikhirzaqddmix2m2adr105lhcevk6bq7a2625jhu9po5g3oxv640xd15snhu4jy2wnothxqbdkwwajgbkb0n9saclks1ck9hnqb6z3',
                responsibleUserAccountName: 'zdhnvq4w2yz0277jj0bq',
                lastChangeUserAccount: 'kyt14oanbbfgc9vdbepu',
                lastChangedAt: '2020-10-13 03:43:40',
                riInterfaceName: 'wjh4nywxin2iclzm4ixsnp7y0wik4lrk7up9r87wgwntk4khmvrovs0ngi99ke5ydx564i0tb1phc2uzmeorekv6asxy1hdq674ootpb2m02zhn37yfv99q29c8zt72228akmipvfh3uooti0k9r25nyx4waz6zt',
                riInterfaceNamespace: 'rf9v6xeh3ipltl1j13uq0ccwtzjbcd9boxyt4milf0o4lsc51oe83xf5zdbut200dd3yalvm5vq7t37ijhgbe4ard8e5b9bnt6e49axd9d19x2ndpc27i75t0a0ptab9x2eizriyay6lh7oeest12h2iepg6o92v',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '54sdux0weiw7g6kwd2t6xqtdfif074srtuqtr4yr',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: '58q4bydjfwjs5fkj69u91ymlzc2on7btrxmz7635g9tofbly9l',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'wbzcar7c0xwtintpoybx',
                party: '1dktyg5p1ftnhjs2fk5mmaolkdeenbb6a2j3klp1h880jsi918vsj4xg4zolqgr8uplube81dfaihygn9g1qpnqtnpgb8hb5hz6a1tlv5db797isjda5bj1b04bcvl9qyxsigbiihqg23sx6covy7hhy6w1qt58n',
                component: 'n83fkhb7vtzpf56q0jblichv9u6wp2szxl2ec2lwei6a7g28kpmxy3zpegr85dpi910746ltmdzocupkswex2c9mi8yqazcfpgdxpt8p01svj8xqxdvd6x31xvz45zp820fp55wb08dulsw70otib771q199jz2h',
                name: '8i555fimzcwfovmgroqeo6ilyxhflpk61hlkmhxlownwjh1s0ym4yoivaddfp5me0sbdbbb4ssoyykajb87y8n2sepqykct5qbhs8bu6a0yi3dpqcrwe55zc57i1gwktblynu2eb37kc5066dgmmva47t6a6co0x',
                flowHash: 'hxgd9vieyw8bstobkwsa1cktdf7voslr1o9w06h4',
                flowParty: 'a99ut8zb4uujoicis1toieuinkdu9d9q9s0bvretntiksxuir9sdfne54armsfyp34mjtc8jmxc89w3m5n7dsojte7mi726qihn7y8hio4k2boygpmdaowwq0fpovlc2mhj32wmbdw9ljypty3re431es2u63bdm',
                flowReceiverParty: 'umw0p1udy25g4jyx1piecgdgs0gxol3f30gmlcgy1kblyzziam9hgz0mml5us4lzip9w7dmir9l2flyoz8nl9r9ofes88wqa45czq5a491s9401vxsum8nsw2m725xojizbi857gtj0sn2xdvdkvgndv1erba4it',
                flowComponent: 'agiz1ogkd9ke5m3xo0zh8mwkuc1217fwi4sz25k2jn7ypbaq217wom9deic2q93oqxj8357z9lhb1v29ip8x8n66ohcn61fekg5eg3lhw94i8bq7u7plhaci5gusuagw31dvswk7cvfds8pl2s7i2xz3qwzhv617',
                flowReceiverComponent: 'katbgkqltqsysg8vmhjrq4xlhswlhc029kwpdl0ohop8ppds5cqurego965sofb1omxjslrt6mwa4kpmnc9sr626wbuqf41rmkb9ddn5ui6ec01u0urol13glm4w2zc4ikjv7mym20gw3k20xsbh1iyrt64dc5s5',
                flowInterfaceName: '7e9i1chvrpyvch4hi7vwwtfanmk4pkta9jkc462vci0owkjyzmmc8st4mt73h8amf5wk2082gyt1d47xwa60affvib5gsmlhfr8qukpk9doc1gh73fe0i6v05ashvcf44po9uce7qjaw3iyz13pfibkt08ap4yxy',
                flowInterfaceNamespace: '8lf7fivqq3p01knb6vczz9adk8issnyj6ynkgbpo5hv6wbmb6ksp4ehg4fspumtidk2pnfe6oftn3vuudvq89yox0lck5s7y1ozpka5wngcq0x2oevkv1a0fwx40ipaigxb3mwf0o8mwkc3oben8su4rybzu7b5x',
                version: 's3o13lxo74fli0fzvqvi',
                adapterType: 'ied8jolcogvk3it6tvp3gzvo2snzhs6lskczg9wi48txq68zhorhxokl8ufz',
                direction: 'SENDER',
                transportProtocol: '256innci603wfii4ng8zh80enzg4awq2git9p9jxu52yevzcurjfd1rwl2dg',
                messageProtocol: '0o1o08stfe6ymcmlp44mcoga5lthhkwybw8gnqwgujdux9ie1pb016xc1zvl',
                adapterEngineName: 'wnhfafca7zxt7bwsh5wbmz1y00szfyf4bypy1lzc923o50vr99rj4niwap8aamadbyhoen0kugt9zp35v0tx1pt0suyd3kcs7s9rpay9f3nvurx1nshrfdkfun6a5u96gh4nk002ohvyxo8m8ph2gha4s4pya8u4',
                url: 'g4co5cncp400ctyy0odsiu96g8vhoz75jll3633w673u94e9zbzizk2akzj4csj8hdc7ywrbneis5qdszhhnzke323yavi5uw5mcaghi5eszlh71eyt1kpoa1u3dinzeaaef0o0ksnij2d3kxybf58m88hixtnkd0kwq69bgvqikdgxiivbryi1uvkeskidr50461lqzc70g207yixnni08ydt2fo1m14a3bwfnlkfdkidwrrvorv5d3qclsiqos0agkx2ezs1pq499twn3loxm3ofhzx11hwbprmtcd5d61n0n7bw42526h6iavmigb',
                username: 'q8z3dg0d6czlzz3x7dk978p3k5rdklxnl49u0kp328tpgstfg3bsqtpk5tz8',
                remoteHost: '8rhu5c3orj0fq302nfpi38kruaegievb21u4lr4bcp37gn6h61tjxsjt0xtnep7ce2thafhi6jgotyqg5wo1pb9ftwwczuwmdoasl7emgngki686v5s5u1ekhphtdrsyeioqounlemnkmnmx3lup9q8nnfxv6uzj',
                remotePort: 8763730957,
                directory: '3xtthufquq2sf8mq472kw3xsoekeg1qpcjmvgkzobe2ldf3ff13qnv5ra2zqybcp4j1am0y5r8yva8sfh06bqvd57pv49tj96fqna13ca7v7di1cz4a3pewi8izx2vgdnlcvz2i0zs75kizmhhvhyoinujfcokle640a6x5wwt5kpir7pnrlfna0dnohyqhvc3clt22hvb123p8siaxw6q5c331k35esdh7cwenht59t6a8ixsy6o08xo2zmo1gd9bi1mx8yw73jwfn2sejj5itudh8kl21dgbzhlmx96r7ymrhn32lefkkmofou28mzgpgg3qr6nnq6k1zkka3r73dvoiffwwwbqqd63yq5a6st6lxeglzoz3h92ga65sqys9bx70g7fa2cpk5naiaaie3csofknb8l9rn8f602kpu6tb8mso4hxam2x4c7vomrktaxw8njpqodwcjw83d2grx75boc3e82iyrew9kt2ukezad35m0pjrkb6ljpnqjrov4f9ohzu5aq6lb5lv2otitf4cjjbsrglwzfknfndt7u2vvvju6s19rlpcu6xmistnw8i1oz8sgcz6xya971ozn7rzkxzujql0wuf0rh7a7712hz7youen9h9kpa074hv8wrgzd0dqb802k9eed7zicn0yvruyrtaz0obpwbn56fwafq7mfyb7m6pe1li2ebfadbbt4npgobpjqne9q9mczy19nw97fr2sxhplzfkrhjt9qepdff7xxnqhkbzr9jjnx4npy1kyaeu1tv1s7a0euuyuzi1yxtr9stvwe31i8kwambk5i2efwuupe01ivw9e13t0dmg71t6k28bjpvx9w5rxom06imo25xetol3hh7ba2armml7ygianv8ywwyl671lg6hll920c8s5phsjp6ty1mtx50mb36umd888ft87b2bayz06skvwna1p3suwayret7y0xzbvhzyqk746nbwd2on7ka5su0nx2v75rgio1dyk06x9luu5kgwajat',
                fileSchema: 'nzudh1fio8krz5kmlotx4tp9e4ngwwyhchb7nw4ucwn4uq6eqgcyzzzinu27immx58oe5m783rk7wgxyt01hv1ztmybzh96h62mqjkk0sqo43bt1021859pwvz0ccycr79xnflk7tizhu08o2ribpi8ln02giofa9vssxr00zhqapnbbx0cvkvhka8ohm2lg8sbsxuo2yszpykuuc6e1ljhqdoelxe3crdyimh1gd46s1al8qdqpsf517rmfejxc2ieim1okw0uvn872xcc1oaye53bk4dy9jq0di91063xiyo2bngxbpkw6tc12z9r3gnugobxflubhp8veeceneg2qmr20zdasxrm1vb22l4ux4quxkpm1j69nwvzuvz77v1bu2xbk5h14kcxompjiovb1e5ttixt9m03bzrbx9462vo1zg25p066nmjn3vuphq21977p998l0lkjc1umzg0grhbbv0al8w8hkguzk984brlnb1e25rfss4kcwkv1yc55n9k778xd15awc21uo16mgjc350cg7r80xyypgrjg0qj25kwx3g1ixbbvaxw0dpb7vpp0o3tyeyztg38ctbq9nz60ayfs5wj863xkwub5otnzw5qv5l6ozuily87xkct7og70e8bp71duy863uelfm728fh3qhvk4s3zjelk9dgxmv5ctvwk1555qf74ccpx1asnobr73r5zakyjjoaryum6umwguy83qre5j0h6vhd7w4kzu7in8rlljl01dgiasrafpt53jev66kybzz3hjnqp719rd6bzvwyhso775zgjwm6ns0t2fqbr3oj37xczyosjc15spsqg3vbb124hvt5u23niv0ktg58ia3k8i5ilx5ieewtby7e8r05qz4fc1flu40h2qgcfm4wkyugbae31hiquk89lb6i1n5ilchy6zeqgy4lws1n9uedyrmt74gs1lrhj1jimkf0656kvwagyrxp1junyecn1co7pjtnua8sz92edixkrff9csa',
                proxyHost: '0sbnq5t5iy1beer0lddt4fdt09i6umyzc8jjxayd6aqm28oxt9390sot5ykd',
                proxyPort: 98952983709,
                destination: '0hgj0ap6as7b0rvvoc8rrn8qse4lwnsaz1it5gjbw7l9cv5yty926ownu9g0o9if6yxbko8z9n22azvc3yc7dz5necunz0ipazx3iymllmmusp0busmoapy1eo1bwtfeca1x201u8x2f90wul3kihou09h5twriz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '57bfm3u8fqdjzrfpytvbikwoct1bx74ue9dchz1oasmmhqrc3ku8553k9m7p8oos49ike69bygi0ha1xry3dyorgwkkh4y2fa9s29t8uj61meo0o0sj4wx79pr2u6ctb7v4h86mcbmsg3s1z5w580i1ah758w0x0',
                responsibleUserAccountName: 'e9ba3tc8ki40aida6se5',
                lastChangeUserAccount: 'eyg0px49h79i35dffdny',
                lastChangedAt: '2020-10-13 20:34:30',
                riInterfaceName: 'a1oo1hhxu2msvmpfoftl1i33x341lr9a1amcp71ouzbj89k9z77el2hg5hb2dgqmozqnskwnik6aqll1j1lkoc1e1diir9sefeifx70aj3asauf89mctci410hi8nhufp6htjtdtq3j6kj209pws2gcby0xuom73',
                riInterfaceNamespace: 'cw3x8e1gnxmes26g7lnksrr46tr31emkq3sm5j6u7car5y49k4glscfcg6lj8nqwku734eiz29dxgzpae5ydt3il2kzjho6x2oav8qxjhqas42wk9q9dqala5xffnpxup8rb9mzfpiaqwk4zlj6xp9jzc57hqo7s',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'vfss9zsehjqp0v8jq2awwzrw9jfyq7rhmpvk447g',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'b7ivef0elsp4q3jlja6hx93n6bau07ehjmm8kvgbs237bmjr3k',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'a83k0c051l596mqr21yd',
                party: 'wtq4hbakis44gzbxv14cdufiasiy0v5x693nj06ir7gm3i5yu9pg2m3xpttss2m2qww0ut1xp4tw6l3vb1bdgdwwwcn9cd5c5ut4ht25hrkg1h5whggk1xvn8o2gbmaan236q2x0i3p72mb0268ritddt9pvudkg',
                component: 'up868i4nul1wsghuykta37bpwafelicw5jdjgilkrz7icetexwb9jdfu6x72r9rlcgyzxw61065r304btrtroyce53m3u9ty2oyu15i3tpj1tqtll655mowxlc12endzj5f458wqfi64lnw5cg4253mttx9oa7bc',
                name: 'qygikq0ckoreqdsgnoppxyxxvlw1kvy3g75eseh6omixlfpmzu86ospcio1kxkbl3ey99g6k1gro3w2041zesdoufckdla68jl1tg2jvfv2yta1txguqegnb7chfy6z6ijq581ijrxy1c2of9k5th9yekydjapoq',
                flowHash: 'nrhc038j661aswuvo9lxc5f8bt1o545gv3lblfhc',
                flowParty: 'qqpww5h9wuheutkf34jl3qxeo197elm8aa8cu4m7sgqsfyhnma27e9osj6nof6nusxe1oihbkzicl9egmy0ysg3taf9n0y3hkrh5tg0yoz972ixwuwsl3swa3dpozauvxarfgcuprix6cr407p58f773pdl5bniq',
                flowReceiverParty: 'prijwbohcmozo7k1d8110wuqtmv7u30kcsd5sunud5zlql0qig2dcrtd0eda24n7etsotcfnj04rnho0cge0geobcrya9mhue6g0lw6puhh8spclrzi8xwysq1t807wq9bm6xklrn32110u455og54lp37w4v8pv',
                flowComponent: 'jb7tr7q0y5ur6jvtzu6pcpa0kjdp8odwv8b711eqwg1x4gqdc0637tfnd0ublf0yalde6bl71wl3rp6doqoxr6sfrhuef94xloxk08bbr8829tt8uazyiuxo5t1iu3h50h2crx7wxggpsdhijrb42e5htqhh6ocx',
                flowReceiverComponent: '3tx652fprtls2j5ttj6mfcl3h8y57k4xa12gyinfr35vho2wezflbbju2v7sbpctvm3uf6wkk6mcurztpob5alpokq0rdftji6rizdcyuvmxw0gy1sro9nntsckbo5lw9wr9wvb3llu37of5kpkl7dru32qdri3f',
                flowInterfaceName: 'pwoigfgldk85dl0d5xrr305ov4ebfm453vda6ce1nozydtaogm1omx0i79ke8685m39s1xioagbsz95mrn5igcml1ytt43onbl7gmh3vgslk5wcucsmljr8de08ftclo1qn743dho2umt9yoniihjst4pw03dbok',
                flowInterfaceNamespace: '6mj25n133p380w3cvrzv4yflmy4ls33choh4owluycumfnxgvur7npog2rlwn69n7rpx8wjh6713iihk871cwe71u807j5ftsoufzdd2gpemf08d7thphik3x6utz8u9ug0foo2sy3a3vq5nsphoon9zm393f005',
                version: '90ro8pzf83yzwf1pr2fb',
                adapterType: 'bzih92p6xuxqqw3bm5et1vtcr3bld0ubla49qsdsfi5ujxeik8vf7pvbgt8x',
                direction: 'SENDER',
                transportProtocol: '4k1vn85y27dqvl2en5vy76b9q7zp9on3joy5zaej5703qbs6raouaxnljc66',
                messageProtocol: 'bxbv1fhyanogurtfe8fz4hgqz1o16an3jsgqjn7ab57yzq8xgtd8xmiyv5vn',
                adapterEngineName: '847aymuwrflgho3n9285m3sgy5itm7n0pgcwlso0jhdqmw125zradafr6p3y87y4jl4sm363tjfqty6kfye2qbz5tbdnvkym7mgu45a0sgheszwauug4cnu11yvzxdsj45ds8kmhy3shqhlp2chlzlc81wi4wnvn',
                url: 's9mb094fgzcr3q21f85z3ng0bq3eyboshxrrj1g4sbuh95gz66hk0njnh9jgh1lpj8h3jjmmej1zjiun0e1886xihv9nw2p5eay7198eth230n2i20j9ox056s01vm4m1q567r1zeztan8ztkjt1stjwwxzhe7bp05s5ha1vvfziifjpgm6mh7jxalh2ya0w5ol130q2dayf3hd1xcyszya8vyjttvvk7yy22aklhwu4fb2dprg2a2i1a68xi1957rdlxuhhy2epl50dohtozka449sn1lf75dgbyrp2601e9sc13hjsft2057vymbvo',
                username: 'tsjdajq8djvq63o5aonlol0jq1xm06qxlciotttnegx5ptbxtvibhmpypqhj',
                remoteHost: 'pgreknts3f466wzq7m9dwksqqh4ozsqpdeffcj31aqpvzulzkjdhxsog4v3utwd08l8yu7elwmlkwc75jr51k1sq5dcrcw7kejuz5d3ivdwwwjphubnigd9s6w4w3z7hxs68w5k4wd416pqs5yz7lcdlahqnfbu8',
                remotePort: 5644346340,
                directory: 'y8ts6mpa3e37kkrasnq0p8osppgpn3lmdbwt44xu49rjr99np6llfzjyrhfbzr371uo9sz5s358p2sip7lpakz85hc9ic9u2vdpw9whwoyhfwewkqfz2dsz3bda6nw8pqkgvyznieh735mv01wv3t0ztvw6fh6443t1cyz1qoh0i82hfdsoc0o2sxqbddz279n7pcqf41rdj0ohert6vmho6gisug1fdk15aelj4e7nvwhh2091bw2uvadl3zrt7s0ie6yd77am90evsbuxzrs4psqq0clqwpoi25e1ei0vvf7pgiz82opkch8ggidudt905lj0iljm4nqby3x3ysdfl7tjl1mg032ryw80rc7eznisw973fgcy7jgk5mjgrf0935esfqpdetvakg18y5s0alad4jmm2exda4qhekoffbbpfeumby4j5rnc99j9v64o9gvt3qpabl6eqnc4aqsoza32ixbfl690qsm21jlp9gbos0e6l7341jedocwnxuuvihsogz1fru8bqqniu7gjoduwxz9e906ch8oe8cskm2oxdt71a3hz3n8rohdx471qlu34fsxvsgirg6kbj07i4ej76c9mc5zvnemvskiyt4z20k6mo9ujn0fbzp96q0jjp4v4hnyob84be29fjis5jiojj054payjnp8mo19sozrqrnpsp6hexyhom6hi8apysbnphv928lxwbycuf34vvu7wlb3r0dmqdz6i6kzd4z1cfzct6r2ey53y4iydeneen8q9hfuk1sspj7swxnoqpcpms1rxmxzn8l68wub16i8o62l8zlmekmitwbg8vg20uvrqrntq6foqjhczfzh7x702rc20nlem0k6t3knbe28nqcipg5qvb049bw7vpy7r5klyqlud62wigph3srmuvurxz4j9lvukcuybure6x0jxrthyfvmcrpay3fyl9fostr1jq5rkmlqeturlfztvdfle63csdaqu1k86gk819oufnzzxjuw2iug3y3vv2',
                fileSchema: '1xa9dn4vtza3z3g3q96vyvuboxem2moszghsb1ndvthk3mhqh5f1yn90wsgtl1yzqg5ucl9k2ku713wjy1uewobqhmtijcuea3rzoz4epklq44jtbca57mhzrzg23x8wnsfg79s8lkzwungh9t9mjyxh0va79qr8eclovj20ak28xc0uz3dx7ryif1xo58kgujiitpjg7v0utqrxsmmk7ogtofmfah31az2cgjvh6f5041scwlj056sx10kyyjczmoa1rrz66bjpd0g81l2i7ys0c472tnw5qnm8iiebewowap8ho4jmprcmujq98c1vjfnmhx4hfo265gsbj9g52d6ev1lkkmllmww7z80z8mve9umg93uxz0644c6t967zp3s4s0x4244mxj3w3x3jou92veqz97qjdsfjrqhllfhpd3f444g9fvoin1b4v2nbzc27y54aaojy1w5caljsunjm7ol2ltu065n291r0ad2ejyobimg3df1v9fvi45i6f9t6i603oskfhn97m6yies98678lab40tozueqhxf1art2iananysxt5w3t6njc6nhduojpd6jomhn7pi7qwuvpffap21zasiqour2r8o0jfwmt2c0eilg0iffuws7fve86nhkmrmb1h9t3s5bgrfppg9fs8bniz4xprpk3s4l557pjp87i5jl96r4pgj21n2kfeapsujqcpzl710yc0n2bdx49edj5gdrotb5o47mjn93cbg7vjpl7mpjokpsz1j30gzqmco0y3gjy3zlz8s7ocbgpkdf55m44zv2le03gheiw4hmnb3b44bltltail8xi5127fscolj4crkpa6h9lw6m2ncozbo7s1vl0s43r7g1cmlkqs3kj11hylt6cwlwfp0yhmt1yxs1el09l1jjigqcju46pm6s1o26n5c0lg953f8wduoxoftj6789cd8vvx45dp4zfceosa3g4hon75ruvnguryy10e7edqibb579zzq2xqg27r8sgrmji1',
                proxyHost: 'gnljp8kfthakntw14mvh859umy4p869n9k4tn38dgh6vyy8h78xch1xj7bgf',
                proxyPort: 5902929361,
                destination: 'pkas99jrlpx4h0wbd8196m4beisaic6pu7rx956anmv9s222nu3fvb2vijgeabkosicmnv1cbzawmss09yinnna8mmsdkfvzwgaauovf68yanv1bmqm5rc920rp8bvr9n9mk1vwl0w0wtzxk3621f42or0q1o2zgr',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'y63aiahem7mxg1d6yivmq0hcb8tqbfk4z4xpakkyye19czwugzntg95jymd13incgwz9gzeepml4k9yh6dod8lq9nj6augk2q3g8vo4mrp1t1bz25ido3ac9ca927mnb4h9xac48h53o0cf23jcd7w6c15rl47xw',
                responsibleUserAccountName: 'x46mzpch8statz79hguh',
                lastChangeUserAccount: 'ter090i2o7zsz8g8atmw',
                lastChangedAt: '2020-10-13 19:46:34',
                riInterfaceName: 'ws76xt9eh8r1jrb6jjbrex1oc4cw57g3q5cmelv7ah9e0pab1wa8mweg15cceeq2kor9vqzpt1pguok3r60k2equj3up4bq4pffy6kspargyhyfw72knows5bxmweqbnfs2s7ecnujx9j4dz246xb36qc6x5ofsz',
                riInterfaceNamespace: 's869zinejbs0gzjnrxxts682mz1lq00ek2kus9mmobxx4uoyqj0b5diwuiiyc66wtfly7tl5wgy39vbfvz0rdw9jn5e5gacyrsts6nha2tv1yu988fqki4l1rv44c46ecd1v2beq86zzfkktqncwu5astz8r8qvb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'ej3asief72e11l4dn57egu8060415jqttixsrxyr',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'cxe6j22c8j8c9624tcu9pmctpyax9l9alimm6dzwf03ivyy3bf',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'j20im61c8v6e9h9at6m9',
                party: 'mm3opfm6ozynuu85zqqpaweged7guqu9a75ouxa2y0j20qn797jhokdetuou2nmtr9c4iweul5kp6w10xmiih1a4zsj3vlbzx2vvd8bt7ckhkb45zyu4nl4iyjdmcweznjcn5o3s5lexfbgvcv9aosychu3tdb5o',
                component: 'cs3mtykye71rx0rgopbugtbkcwaw7f389tz9r3crnd7lypztwim046omavbgpvkn8thdg19mhyl915fvupp6utf9dc3gvkej7k69s98vz3kfyd61v3pjporos8sgl0pbgocle1amhmeuqfav8eyv5r3ptxte3ycg',
                name: '3x4ah6w99ewhkvbduk2jf9qwbirn9rmzjuqsza50lw7wojjbr7xjofxvvcql5mocraxc5634dxmqgic5shjx5dol9d2pra75wsywpitm8l5jvnprrglqigsnl5vkdj9et01tyggqq94xivxyw1pw8ip4you9vz6y',
                flowHash: '0erpclvskj8do55u0g1ijyycmsbz1tbon4frt8rz',
                flowParty: '174yhf53px46i3ms2o37rdahvibpqkq5sdrn22deailbi0lnlpbouqso1atp91e7j9njdkm2ixn4pvzzq5jnsh1xpb98afwhpc24fzytt4xnfaieknvflwxdw8t9uqdsl0slx9tgat9jleufm4tziho89fq69gqw',
                flowReceiverParty: '6ddka3aez70wt148it9izu1v79khmwfvhp35pkf14wfu10rp1gw357vnps2bz15z16tu0si5i3hlmucpo1vg0v4g800bdad2i6njb33mbonwnj4gk021mogj4ppubx3eo2lmdwq46ku5c9x3jl82fghtvzt8hph7',
                flowComponent: 'w2re1gzxvj7jk9tkw8ei1oldqsqq40lq7dssoaqciwawmrwj8cabspyb5m8v00xzb4oxweydu8prruf957mhqiitc6awybjbi0eh4wfmohxe73q8las65mra5xyfs9oyh8ki2n9maijoeq7e7tq906l6fhk31l1n',
                flowReceiverComponent: 'kezwk3cqb539fbjtyt64n37wiz9l2ftz5a06ccxi6qgdc6dpqw294d1wth69mt7zjb3wjkoynhsxg4xb90y4hhc3ac3o8u10x51e31qet4tnt6yqyt5ae3e233xgzcqszspf7a9gcc4ksuwxrpny7mal0dkl7cdy',
                flowInterfaceName: '3wxeyk5cyvbca9gz2rw0clityy9vmu3m2vf84c9t2kzfkto2fqu6urqzz7xux00nk8dymqo290w9egw5m8n9gndo0icmlqni0pmubncexxwsvmtv5fgbqiyl0l96jqfpfjsozd9d9y72pbf6i8uwv0zvtveg1zwr',
                flowInterfaceNamespace: 'ni698h8q2t7t25grxod2zwsy4dz3xlvshh0kid96es9r4cqafrqlrwbnjb2qpxkloo4n6owi2kjpjm3kyscqw8m65ey7xv8abmawvfr1auk3yn5mkfgqvkrfb1kgfjjvhvkryq9o4omgqcqjph4dw9ce8m37x03r',
                version: '7dhrq8u4nhccdooxqjiq',
                adapterType: 'hh02dz4oxgckffs5rl34i8zd7jahyb576ci959wucx8i2v3n6rvxw0tspydj',
                direction: 'RECEIVER',
                transportProtocol: 'n6mrrzc7z443y2pnvzjkfjwgsrq746nu7zpz85vcjyf9u3rbn4inbgqyc0g8',
                messageProtocol: 'e1qkb7oxm5ufbv4utba0m6ib33nu679egjv3p58r134poqkuh72co17rqi6o',
                adapterEngineName: 'c029evosj12gkdi95v611hklqdltdl1ywh4054ozvqak8mmvu5cwmuti7dtsh6ohkwsiptsljfu31z68xwir1ejm4hc224vpj69iookrdimii1lolb77m3jtpt8yu2eaefjq7oomgz1paet1y2raguen5o4d1pxu',
                url: 'fizhoqxmq7b2ri6pi1xlewvj5xrx9aj0m7hmt4h7ckr0gkg6uydtygth7h7nitxgwez3tdm0ywhla0a22ocrozl5u4xk3g06e8cwqg5lnaorum52b3tzse8azh409ms8hkwwdmgl4wz6d9rl0kq6bxavugigzf1iwdsgda7j0sgrk33tkeldytw1jvzzd3d4lnbbmb3fn9v0lb6zhpr69ye2yrk72zvb0lwdfr0t96k73qhkgsdnd8gby3kjngsfyp6bj63u7n34adbptlcpempj6fh0slzmdl9326j69qk9ofqnr9ddhejnz9miyqjp',
                username: 'q6qiox8yp7wpvmq3r0yc4eid13evto6y9jmnvhr37u5edueb5iu6za0dsq8c',
                remoteHost: '0qw6f05gyi2y5tg45isab5p2xbgy5hlpcagouewtje4ezv9mv6uxty27ge9gs4dd268d64zb0bavph1n4gsggaoabeaqdoppn1y83ftwufx45l6jrnuoxd1ficefonhs8cwupvq56974rlb8ktmfapf49gj9hln0',
                remotePort: 7347070984,
                directory: 'vsik5uej6t53seijrrkzm42j7lkuf1lh55dj236wqc5nf09meufx100p2ctwyih67wdjx2nns4634v0drpdrbn5bdt3h0k9p8ldm8h8v2y7d427f8z4lmue1y0xfzyimuu6xm8kdf15ukhno9ew4fsw15o88yl8tfturblpycdnt3znf6wgz88k6h2lweybs4nc1lfy8p4sq6boy9ygwfelpfvphui5qg0uyal9jgojic1dfzclauaahtfp7nigujrtid8r0emqpprki136a5qdczvvuf9utkqzxy1bj7ic8szcmp1ysdxt9l5iv8ofriifcvubosha505h5jlyynml5gfs4so1imp4uxn2s5j4w9h8twfjc4hon68o14hc33smwooy92js7r0fxk4en3081ki9m719kfjhxur5mjjknl4gjalvkow5n47r0css1n26i3zdngva5h1rx6z78u8m7nwc5r1mmw40m9hmhk7obohluuvicwlwv1t11x1rixlq37nmsgwbmxvas40vbpa2cij3b0ing7x6hk4nnjqu471tkdc0plvcdkmi0zvmr4m4lu7bq9mdjca39uiapcucyusci4dyf86tuj7v6tsu4jdouzz9ga8h72kl6i9jisfbx931fy5jd0g0p37bxfjqx1q3a7gunu69rfmmt3cqwmv7wuei1stnb60u5ueiaibzh9glj375i2iyt971r56y8ig3r2sngn6agvzcnyjoegxfp2u3ywjmagf7wlwl0p6ucy0oy4tf8vp0ne2xy77gtfmwddezt34r5b9609adnbur9lejt05i4a9h77b9540ro0oik9rutgopa1xai1geuqs86dbahic7oswwmwxnseqzjz0x5h1efu8kt9um98sifdqebbjfq1kjwg4e7odvv0h4d61gap9st81bu2teavi3tcifivflolfj0p717r94bkey52dpt69joryeee39gj7a4kyc0ab647w95bsk14o32hcezinebpsv659yc',
                fileSchema: 'sz1bbiwji90mezg71ej84cwaxosk82h5s0hifgl7ag0vm0fl9mr53g7iweiqzgmpmax57cw7k4798jeob9ao39wqjjjf5atp58t1ahm1n7pdcd3zypflhsv48v15g5py9v7z6bta2hv2ptdiinoqzpwfgtszpujvpbgtgi5vdhgi84bhqpac0ohvkmoupn673aih0wzwnf0ima5l447t9uvp1nr6fn4fe2hiao5f4gqp9fllllktyd1w548vwoj9eo30jemtohm66jc514ndlf0w4if09i3n30aju8hnry6b9pv4t24pitemzz8xcryeyuwisnjiik9jqk8adh1v3tzrk8fzy1dvib8chlapw0gp1w1lgfz06en9i15ektoi84xfhsiehkqu7gwdij895qftjkbkwjb4196iojr9f4whd3a2uihrbb5tjr221ahwqmugqtvcuf7nq9mnqueiwcyevmh8e1odqkyxmgentld7pnqoq8llyo8ajw943v8q9uxk0ijbwrt7rho9pfh9315i9sbzbbyqdxjm1oizzkwvvl16ls4dj94jau0aawrwsc2pxk3t9z4v8iabhqxy6boz79p6bejutm2kq1k8quy3g1zmwwnei30dlzsuc7aqbto308fmoulsnrxqwxtfmqq3y7p9hx56brq7grfvpumz7fq6w5y3dv6bop8n03kmpin2a6jw6mg25tt3cii6a7haqpu2de5ai55haafuept5tuqj9lvcd131hfn3pn7pql4p7xxfhng66pf7co0i7y62ujbg4vonjhadl6zhws8uqycl5x190xnvmqq1cag78ewgemqc7tjvr0ldaf707g58ygtr1fuy019vzbtv0efkrkhjupkrocfkrjeau2jvciot56mu448568va4cbs2gls35ev0rlwfbobd31g7vfrlvg5e4tb09ns5ermmuzebnw6pv1ucxa7olk41l43rglkscluey5esiqdlh93npv0rufy93zonlgipodased2',
                proxyHost: 'yyoz971rkxhq0aeh9ymli4nidkioeqrtr3ci6edd838wu7gq76jhja5avuac',
                proxyPort: 5357588778,
                destination: 'a8ql4yrorrosxpiy997ne0o6vw1lhubfgafib1e8v5iox6md07p8pxsk4ak5lofonbadqnbhjgp5q8a5lowffnqvl5pko5dgh53rf69agmthp44jgqf1i5urza218hrnt2a3x1p1r0fogrlmwr2kmvcw5j9fhx1z',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9lfuf44vg3z1a18atqt4uwp0xm84vtokcvu2k3bgaf0dmnjq1wq0mxcg9poxbpdlbov0ujyfpaad4yrbn5x0b89o9dll2njkx4jcxbtski2cp3t3v713vgmuok63tdvmwu1if9z5ghgca2ekscxr6ti09la1qym4m',
                responsibleUserAccountName: 'h99h7hr8cfziuy3wfsx9',
                lastChangeUserAccount: 'pg04ludn8g1rpakrz831',
                lastChangedAt: '2020-10-13 18:26:01',
                riInterfaceName: 'l9a3f8l4peq4dgf2jdiu95vbax9g2hmeqkjlhh24mq6larjmia7o2os1j5rikpty22ez7qohbka2rph2hpxqzxab1fsh6kk4i3w6hfhyddqw11uqyjm60stms03yrpn1d10fl7n7gwrfe2wm2ad4946iibu89ajm',
                riInterfaceNamespace: '6xvyxlzaqgiewys6zce1j2l5aysw2knc8l0ue0lto7b6297wm3lc11hz46eq9w0bq7p9tdpaq2jyyb09wjwxi2gqhy5gdjo8ggzw188tyu41ssti5um6zybhoh7t748fsn4rpoqwau309iaz6gxp9xlchazr591z',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'zela83f9be49ic2tc8j2vsbj8ihfckmirm4lzp4b',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'elhesbyt4najb3f2mtr2m1ackdbi7b3ud9mlwsxtjp8l34tt3j',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '0gyt9neh2awjpule8emi',
                party: 'rjy3k6hbys0v4a2lliddjktilim1etl5cyibgema3xap7ekw3hu3g3iw2ehbnudrudnkfjsrgzud3kvehllo0c6kjg3cj7nh7703558yh4qr4zce1d5gdmq2hj1e7tphug4vlox7vwijv01boqpjo8a6yk9d981p',
                component: 'o1ypny7piyc21hovud0xqzgl3c1mycyg5fp1suckgjv21pkw8sxiwt0tdlpecw6jm6b57bq5wsgl8nrkbyn4t09sdzuixh4uhm5zm2llzgvczbvmyowx9zxw1dir2iwwae2zl71ng9yi3suws57b8l6mi2okmd2z',
                name: 'ivpnhk99oqncrbt19mcfchm52a0vvw91dw7nyenvy6ewg14fa952wfx3kq3tng9zx3lx5ei5xwslmuum9vejs0xo0q0lipayv62uaef6xlxl38l7br3o8fduxz2cb38f4li5l7vc7f3mvomgs3in6gsqv44f1bl0',
                flowHash: 'yyhxypjddp8phfswcy8bswbrnb0n2o4rzoyhyh0d',
                flowParty: '71mi1li2q9zrthvr04kdb1ykhs2v8nki09ai7dask5bmhjnxs7jgpm7i43d5gtiacak4yvz0fyluggv8bwfhj0dw933ozve11avij55yl51e0w3i26oqq90820zh62jumk3zulx3507z37ia4pjl07r2mk4gg13i',
                flowReceiverParty: 'q3cx8ujcmyqc938zz5cm8iqbyy0d1duzpd70jaqwsyq4jwjzilnsjn8oyqvpfwjq237czm2p3kuronld4fi5q5y05n0zdwe874shkvbfn58fzl1mxpc5s7jc30i7duoh0gaoe3khgz0mck06evl7g5j4q5wz3m8f',
                flowComponent: 'paz1zus0c27ochsdge3ga9va5hgmgzagsik3b849whwfodtgaw8u97thqhv9emnz1uuul31eu87nyxo7f5buu3pcrhdlg5473v2c2pwlm1wrj0lzqvdk8x5qbcmtvrynah1lq3me47rzny4j2j0fdt5m4i9f88sh',
                flowReceiverComponent: '4ze0rinc8r5gi9qyhqy2xu78ebg09gj3qgn5x8e9wousfhynppaq4taj5jvmjewqn49opa8z42se5h0wk8xky7bd7d7sw5z31xzmgfs4jh9g140qunbzj27rsjzz98llfll0ln847htecz4xbv9g5q089yuweuvk',
                flowInterfaceName: '1tb7qslbco6yann8z9ztl0vlmqh4u3n1nxde5yia44bl1wpla8jlo5ki6ipfvtgayqrcb7jhtbfumznjyp1ttoezzc22nnzm6v9g52on3grkeifzgd9zj08uyqy856fl52cby594epevk1l3m1l2a7nl6sf76nh2',
                flowInterfaceNamespace: 'z6f25vh60937jgasqqzv5od0r1lhlag9rbe7kh7rljldeoo8p5wyxj2ndumrqcuje9fhu95pohxq961ngwtgkry308nl1mktqkxp40fxtv4wtdd3n9euxk5z29wzrpwng56i9ipq3wfv08dmk5sfusaec2bjw9uv',
                version: 'smowwwju8k9dfqcak4hz',
                adapterType: '7trut8mhicytsprjfj4sai3lt5hzjbmnm0muebze6mr6alhip9a41pqf28h3',
                direction: 'RECEIVER',
                transportProtocol: 'rac6bwxngevtdkrtgqfh7pk1d08t0f4uye3696ut5tdlfcej81rkrsh5iqn7',
                messageProtocol: 'e9jyla153rxw3z65bfnconzgrglbetx12fhgjn13221nlt7lzwzqcoswsb76',
                adapterEngineName: '9e0al9t4nqjy19stcc0y109klqk5hf4yprwu98pr5axg3j9hchokl3glguxg8eqc73vndmmgmu6rdq2yvstm3cf85wx5ekwjlpj02p1a58fne9210lyuvssujmkwv6exmkuwmfbinyngk81dslpyx7a4rmbsswfh',
                url: 'dfk82584xfosf1vsin65ss8pgp9r69xkne2xbc1rglscmljtigw7y480rc3k7wi47v85czcptavqlqhd5fpjv2l2knye5xol4y00zd3wyijtelt44ox9sjlvis19tediqzra5byfhcu2nr7c60k0ojr5lc5bllacdm3tccu5jy0dbos6o2zi0labxfjna81xb4hfw7osub3z307scyatvq32i39721ffwyergpuje01g8zs21qhgvkch5r5n6cvuon36nqxlb9gbdd369boxth25f7vfaiwmafeu2upxlf32kx2mcgpbiqflyjdj3svn',
                username: 'ev1damda6kpmezzkwxmcxzqi34c82kiu1z3uv38xbuoqw6x0bin3vbde7m9j',
                remoteHost: 'xnmbujp14t187fgl5g5a05wcx3oifsvaglglasnwgav225bi00lypv053xg2jydfnf73xio30fwzma3q5tyl8z8xsdrctwgs2n53em7gv2xowfbnzyp21u508kr4g0wrolaqdbdbhasfn6ctsjz3q6pty8dmecku',
                remotePort: 8708434426,
                directory: 'g4lvqnhsz4r2c08x0jafzw1pg3vv6otzmfyb901akk0gcj5jft8nbioc1d2h45rkf7494qhxbes847o76chho36anu5t3cco2vytcun4x2w54fro2tk0l670r1hezizly8jh306j26vkwts99bd1lwd3phucdwxf4tfy693lc3hngzi9gobb6ysmvz7r4a38vdlo149svcx71e59ra8axczck1ouksau11p6gid6vq3osjwz76z5ha9qzedzmv109gq097w4py5sg27tv67rcky5f1qgdhcic1qnrlms86tz3ber9p09w7kszzlz90vptiadibn1iuifnd7at2ye2brgwcfxxof4w8b4huf6527zqwptatu6v2gzzoq0t9l1icnpkq7elbnm1j2xgfrcj21s8c1cofd8xb8lgdpnhdgihzs2ikkie5n0g1qlmg55mzj5f2xm1s4sld2diskos2elo1dbaes9enyie4kjuxfd1vb0lutxro9nse0k3ngsw9oigfgx1mgl4um2ym6sg8p7cy8cn2isa6xuria3dayt1v7thirohvnpdicvvt5dxmdr23vto3wmubquttzwrbfwc2t6zf7txtgtap7771d7stj14oe9vvugpfv89b7jl8d68tnyqwz5kswcyn9es34f32qirrop634dqdu3h2pu7wr20pojc9rvhzxcfqhgbwkdgcd8b70ahnoxjqeazak1k0kxd0yd7uxh3qxu55yoqogpbtv8qir3nr3dnlk3em5yarlxtoa9wt2hsgpd6gwaa5k0ww25xih0jegwfunup3gjj7obhbp3o5oo0yq5gjursr57e6loy4ftl60ekhny70x6s5b5qxu46dc15cqgg2aepfq5cympv8g20nppsercuonm716r9flbiaxy592c8r8xg29xqy4j61f7y5dds1m7jvy4hmcepp1tc5x41276mxdksmhj14r502xooqyx3su7d5rx1jy2nexrpq3rhycenxfrg0zbesix9jzf',
                fileSchema: 'blh10693cglsr956ooodlz5lyx5adrfmytypm6oai8yn4k82k4dco2apo1u8ow0e6vq58tmdej8oa9b69rwptu8448rrdj25mtg6b5xc8u6gfh2ecdzquvji6eo2fx21e8uzen8yoh8w22mw86zbhwlw6y2wlhj3ygsu4hykjhc9pp4f42q1xiukz851r57jc9ywbiyr225233c2xwv7fg98nnibmmsyo3xu7zclma6fqskvohwg3sm1m21nesdchkweusrimr8qjz5lptft8w17eyrwz6xmu02jsvfgc6vgig3eqlw1f7kn50z2m1vld734apaeuh8qujwqzrkp66zb10jhke9rzlqwvinbnbhzzfbhmx71g5lyzfxux62z5yg1aawpkv6bn8otyj51nprqjzw8wimzmtxf6e7qwss42znhuit5cj7zlye0wvf1fk6gc6tp8i6zl1if04z76magtahpkpexqibyczvadnhbpnce4bwa6pj1y6slmfkfsuv87u4fljz7swag78l044u7ma2a7reliwrgwdmbjorss4vg2s7fa6z4h10h82yh2ygjzonhkozj7h75j6dtw34apsbartvij3fqnmqgqk0sjlew9amj7gn7134r4qwiq6tceold2c58nnjwsenuugvwbdd5104z95omjynl50uywwgm2ctta4v8cuid2qrf7l7qvctcm6krb33jcrh5ao6x29s6s3im0gi1va65e9ststqx34dh48iidpy46d7ztjc6dopf1uhx7yaqj28q02b1ev3e6chmfjetjh8c8ledfr0h79tuahv0kth95eba0tv0x3bd41qcn4dn3n7w2phw8xpjqbngs18ljxde02eymh07b8z0navcqxwr0zt3srolb38buprfz6a62yebmee4m22q2gxon0a0o3ad9p7kfeggcys3br13znfwda67vh1ota5h4np2i7znwjcayk4774g8gr0cwxx3aaaw8l4uykd5j3zkd4c4ki2i1gmx',
                proxyHost: 'bhjkgdfb15uzwvpdiv67blymqicj5bgeltw1femnliqc6rc5detc5mu0kdqw',
                proxyPort: 8411804497,
                destination: 'u97541c0ot4nl23jwo99amdnw2a5rz1tawqydcakqowvxk32phsud78w2hrctbtbkf356y6z6lx331o8k55wlwwqdz55vs6qa8cu8z50dgv7c8ynl11zexgded267y2a2rhe1d8p107zu1trso1aj6ie4eculuy1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ttnywoyl7f1iv5yzdmgxjgebs82g2z4w0m90dmzsss9iqsdjrr3wb4ppdwgh1569skeblyw5prhda03dwdgsmnwvdlwyael7tkyci05lwdbujprkkms6i7s5qz98t9sy3ooezuxzsvez8vcrttoexvf5d3ukxwry',
                responsibleUserAccountName: 'yo98b65n3yqj1q0inbv0s',
                lastChangeUserAccount: '6prfzr6casukkpai97a0',
                lastChangedAt: '2020-10-13 07:08:35',
                riInterfaceName: 'm395lw2tnqag1a0nzdshb43zzfzq633fr9rzomkv69z5qd5tb4p39l6hyertc0xht75e0vidau5dx6lxkg51niludokg1y64xwbkyp310aorudw5j580zbmw9u00ru0u4ahdxznfz3yf0qh7lo3x22o5mzb0rbuc',
                riInterfaceNamespace: '5wjndtzmjelws0hycm7og738u6eek404rokghf44a5os6ycxiqsw1dlnt8jof96t6vpiv2rfnsoa852txuv5tl0ngn6gmjr0gdowkxoaqodghi5v3spiasfzeisvjov2rwzqsqa7aq3phlzpr1rt9g1tqfunmgu3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'd1s5vu95mhzpk6axv3u7bel7ol1rm9rdj44z6qol',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'ebqoxqvfarn3pfgyav19gdmxlzvlefv4s1xju5nr83vusmyuby',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'zkec86avnhzzca2keu3x',
                party: 'pk3yqdz9a1xrd550xzoy3b4zitl6xszndjxrjn4icr5v25l7ymdrex61gzo0fhvr8zmbzdaak7kljokmb4h5vgl59qmzu3kdxkdvhhgo60mg3tj3w4zj950q5dy15fqq6rvtxgfff8hpmk6wnjh4cihsz7vfcmqy',
                component: 'scxr33nz5fqjksmtiv2ubqzdgtrwu7pzcmcc8laudezjsm65fppi3skt1fxfkoed0ggugpdvcsleu159lkrkvs7uzdjcgqtidjf7e65inugo45y1nvkbwgatr97cy3zijkiyatarfybsptmkzzo478btusuftlja',
                name: 'yvmcr8oakelcrm33v4f00dw62olaqvmu7nvsrvydczw1uergjystd5tutap3cirho7mpfhf0tn38r011ymdruh6v6hlcx24v2eh86hzolqm13edfwu71cmb7ahxx9b8axm6mrpbob0f5jm6b8hdvbop2s71drezj',
                flowHash: 'cc08erb3pjypi82k0relzr7bftn2zlsg8fixilj1',
                flowParty: 'q8ncmys8uoqvlcwkts10mv55vi7j2qzb14fb3mpn1mm7jls3fqpfhh2ra3ryskoiezwpjzfi4oawmmd4knnus7w7smvoptlotnqhrya0zkjcxuisc0tzy9tfjmjf3mndsl3m455qkmcnm5pcj9zkbmud3cyj7ztf',
                flowReceiverParty: 'cshbvjca88suo9824u026znssj4klkh7jvfcwlc6avnz00xn32myfj6fusme074ucpq0i8so7crq4wirxbj20k019u3fqigvbv72lkdze0o5kjnamyw3ru2y4trxy0vcx0joy89r0964k2kox0ifwj0yovmb1h5x',
                flowComponent: '5zfauvvp98ti1hxgsjwt7jt2mdq6ze6cb332k0rlp1vnz23z7beikefjxlvcqrpzxnw8kae7465gjbt9577b3rn91y1o4rzkje4ukpc0cblnyqb8bi503mmc9cpoderdmgwaz919tngl0lsu4eslvd0mkpu4j11o',
                flowReceiverComponent: 'r361xuetx30v1v9qjlaotdh25774yx8vksuop5f9nor4ztqmmtgvw603cipf5lwcqzyg1aimiwbxe25pfw57v931q3xuq4f4dwrm9o4bik9slyhm1pew716uar8vtgzrcwcpp75eniucify9np5pguvl5bh3bt28',
                flowInterfaceName: 'tt9m1hlusyvakatogb068egljv70b6m151c0fy8uuljrkh88ckontdqriiwfqm1w9ldc4rxvaq0qjy9swbq65tqds5itrga2cxejgq6v40zmm0vr2fwcxra5as3ap2rhyt0cpvvlt78t3hkumhv15yqy8j9kk6ip',
                flowInterfaceNamespace: '9vrfsaa2th6pxy4xxtlz726bvkmgsxp5ji7xy8jqa2jc1zlgp83n3qsj0x8etwbr2tv0wowpqtagfi9sc063tjx22ein4yhgox36aqom99lxns61d8jn7bq2jmcaputopaptq3tx7fli77cui3725orfnwuadua2',
                version: 'e61bizshbihnitdg4hqm',
                adapterType: 'ksf8brlvtom83p6syo5ucjbj31zyoyg7kko8788s0c08m9pyka63f2mce96s',
                direction: 'SENDER',
                transportProtocol: 'm9a6vhxi024qajmzgizxugpdlaijmji96wp8vck0pyeo8t9np60962zk5oqq',
                messageProtocol: '86y30bk7nx7bngv41gnagvxk9isod76h7ahgwmulr85io9r0nmti0ygmpr2y',
                adapterEngineName: 'tljl290fln67ysmdhgkisjl9ifntiz6nq4jjds0tq875z8necjsyg720nv3qxvra8y0prv9786mgj47o6wqqmh0x1dt4s982agtx7usx2fkx1z3f21fy9po7kylwsnvmbssccmx4242kqptkvv4zp21li6gzt8rv',
                url: 'tru4uhqhncm2fhz9sgpru8t4g6no5y0suxrbt0jhcq83znpurvb7q4c6jzoub3qcyzdfk7yt8yfrryna97wshkrlz7ywvrgt710y7a66llavk94p2s99hr5ax336oqmomgrmxm7uhvnnvz080zonfdg5ap3ig8p7yp58r5w61c2cnzmuknzo8s6od4yaz9mqjuf7sknoyavebr8oiac3mpjg7d8jy23ub0v2vx6rwuh74dqbvb6wtjomwxbavqfjfpnlzu16umfbyae61tekngrvh2ljcfz95aijw6icidov3169cvz7q91nlwp65qsg',
                username: 'e3bryhrtmv9dwg6jxlbi13ldp0sad3lhm572180vd6xtlercmdqoq89t2hz9',
                remoteHost: 'yf9yzihv8kspxueu00i8labn85wbbxhubk5dsoc0qx2hd2yc5urh22u0xx4u6dbaztmteokqzakajige7c0qkfn2kjsryrsetbsa78ixijj449dkcpqpyow2q726f1ii041bl2tif11o80qptuw8zibx52q818mi',
                remotePort: 3515919907,
                directory: '6z7aidyscthhmaqyttus0r0syin3ohuqn2ves6vkvegan56ifcfrqq8ai0d0wgl8nixr6gt4b8sw18b7frkd2tulyvocfz9jkqdnvfv4nibzjivsnsqi52j6vyf6x8v2m83v9g18bvr6l5wdjdik8ph86wcp0q1xi9jd00nudwa7r9x83meh4gxyd1elfp2m9e3yxpzgd3xrsinopoc1b1pochbflrlu7ooxc7qfu4322355ilfav6maq96wik49tmjkt7adwfv5zneqe9jzzg6s4i7qu01y733kzhgn2f5q1p7bz2c0804btond18kzytnqqa9asxkfmac3526wmqshicpa043dhpr7wqigby27olrxc52ja945dtudjcgdgma0kbw5gurtvcwt6in9yhqqhrc3n7vyzlix70vesru6iizwoex311ezrx7krhmg8r42qfhbwj6wwb8ehiwndykvdblddvoifl7fx74tzw4qpbaox76nt3if0f2dmfjv0dswatmlh5ug3j05mqeyfijyhv1sdex4k06n9pse7b8xsnfk0gbe181pzf3n24pgmzb10wwf1aaqzmog7du6yenekmbat2hfz7vusvuyop0i2g355sy9c7f2a49abf9fwmecq2cuiietu3p3dycbcw4vemt8gwwl63hx6xbpf7nh5wdabgqcns64hgilswsepd0ya57zg5k493wizscd9g7tfh56lnmx29qxnlwn7jy8ncgadkh8r65g3exrpxo42yhs71esvrq6rg36h8bnbsrteckwjtnnsyg5t38dv3wmaq4cx6ratl7fq67vfw7nkhcqsf2gjhqtzv7hd2794iot1wdfr8f9wgh1m49z9vta8t155fs2b6aczfbtc9n5eycr16b3qnz1v73dg8gun8tpjfp0k94tvjuuvejvtp4u7mz8fmkilp74zb8n7l5cvvj0hjldtbb46unmfn2lwd74bpibesbcbfe8e94wyh2hrcvusa9lb32hldzf3vc1',
                fileSchema: 't9hnmdny72iv3q6wjmlwz13tif41wiszre5u6hkcfgkduzn3a22nr2170fo4rtgrccu7zdu4y7amw85qpk9js1ykvlq5jlxk0pjrizfvnkr7scgemu18cljlatanm5lfrguojl9kz4ew4hwz1m8styzidegxbrf4lxeoy4t2a7hjufnplzmab6nfose27hhkxyk8fr0pgewpyj0wyb4byo5qarl82zjenwrritr959m4ry6egin3k4mnirnmgaopuzypnvdmc2057yugufcjqt34nlf1x2q3za7mmnua8mrpxii1wv2yilm03yg8dnw3as9w4yar7fnopsvss2cgwo8tmyggmbhbnw10tbx0xo5o12rt7hx50i752eatge267dk11sihimbb0mz19dmxlmy5xbcb73dsl7q3kmij687eau4nz35vs0z8e1e8xbwzpg4whvu6rwoxjmn1zss3b1fc5julbn6xo2e2bivojpc3agaodjcd5jdg5acidll2m0umq8gj9s8wl7zxx4kaf3r59ya17znovw3ho41h1pppbyv2hw5jhw398iiquh5hpuevhhy7stupe38m75a5j6xkyh1uhldzy5jp0xyqt2raweok3mr5le7eolbk9t617wfmccgm3j98hc4u19w75qm3ys5t6kw1dl00h9vx28m4bujk63ag9mfj9w36rfato01j3l5820iynwwdnwr2k2h9lnnrsycb0q0nwauvt7jbj57cc9mfmn2y60kh36zpn3dvemnokua16f6jvnu5v6zz77lvqppyxju7jgrraejdwxjhi0hv607r21geln18tgp2xzjlw9t3z7a2wfrri04jy87plazt9fnbjzk8tvlb7by5tnqrn41esw7s6xwrbrddq7z8co7cvjktp3403ei96389abr7p4hunjiu896v2jtg7d68fidlrl3u270wzkwi9r2n9x60r9sb7wlqomnahwva1l23txtzv28a9703gwnk46yfnyqbem338ps1',
                proxyHost: '8mx07t7lcb9dzjbj8gwnoiamqdrti4h87a1gz4p4zk1ld1t3n281sdai1mfz',
                proxyPort: 3431758318,
                destination: '6hhtu84awksp1og2ob1z9v4qbas9dic72duyj729grqhoowduiqjswquqhwwl7eqxey1wbyjmsbchkzo3imu8re20fv9uuvezdqzr4s9hfm3nxg6n1a3abz221wgoa51ywbem2l2luh41alkpzl47coyg56a4x7i',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'z3y1l2i3dck5j9phcp32dazuj7yu7nanrt41dtte9l5h5ypv9m07hm4ltk2ovf2df5drk27tjz57bhtt9voasju2mbml2rtq3zgoxvqambw9i6dc7zmkvfi4u98imogp3jryehfx0oxnbydedrbw7ph1olvmwvtx',
                responsibleUserAccountName: 'lztjw2pz735j36xdc8rm',
                lastChangeUserAccount: '1cbme67iona48k32ryekl',
                lastChangedAt: '2020-10-13 17:05:06',
                riInterfaceName: '1qqc3rvuf5ue2s4v3anana328d03mhomk1wuticcacsivlqimh2u2i5bjl74fu8ehsd5ld2e3tlxc2e6viihrp32v09abhwqrc4hlu0lg8aazetvx8u0pdsepitw1pats13u5cbeza1c4h84goht6exba5jzk8cw',
                riInterfaceNamespace: 'asv6rftqn4emy9j5zca82zlqbfdj0ofc0qpxnpg68hnxb042dsdo5htukq5ccslrfw4ild0z29jel5qsvrjii2vg4q0v8imqpmku72xonxquzf923k91c865y8v69diqpqtqja25k4j0oigqgqlxx7id9g9f7ee1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRiInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'nh67umck8lgabo81kl2mtsp0tvpp74cpy9b6ai5t',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'q1l7md8d79aqaln75517h585bj68qi1dlkglw2hhn950zgsqn2',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'jvkdp0sh0muug11dv8qp',
                party: 'xo77yx3ci3y20g330my3gj5k0i0sec2rtmhi4q3cjqojol2o2f0xanwajrk0hirr5raa4xyhldq7fgid4ubv1pvmx5sy3qql9p00pyt9onvoahe4r79at41prbff8y9inliwbvpez0ldyc8jcmm53kugvjrtsr2h',
                component: 'zi7fog2ekgmszeifrbisw2rle2ypwspm3j4na9v7koxvmv1c4rlt3d5xcm5kgfwsd2mabj5bguzmodzsan89rc17ja2m3gatmelchqg1k8lirkzlue9w9kmtz0ojgydacoghhr2mnc5e8lla0j1f0vpz00by8r43',
                name: 'dl6ptemigzzgwbi09yah74txdutbgz8otuyvhi0uqtlw4etlifwj1iiyoyh8tmul1oh6gtu1xqjq6qvx7ujbwzdsmf97wkt6dz4ajlha2c8dhkc42xb150jmmos80l4c5ayc0jfnfj2gixdm14rlly3l72j3e5lx',
                flowHash: 'imzhn610tgyrcfhnyr6e0nym7yv5qvp2eqykf890',
                flowParty: '66m1un9z2bnzamnd32h8m6mbzc8t78vzg2sektfhxwxg6wrvg4vxcmvxuvdtjw9gou7dm7clnmyolhls8j731l08w6jgyal1x2qo360fig1ykey9zwbe044e42yn57t5sn7dih69lfq7qd7kfi3zd9fpkjv3fzqm',
                flowReceiverParty: 'ogir2wpi70nda4t85k6nxo9qyhkcvt6reqywechii30kpojt6yiaa45oob9l87wcm7090k9fqmw1nvi3pai53vsfjvix3xdf2myeota3cfhda7d58bkd7xnc2qzb48rdg9nz3nam7v0z6mgv3k6ti5wjukuptc3b',
                flowComponent: 'fmxaqi99oa1lv4hllfibhwllv8l7d1jk3ag0hi6e4c1g6q1zqu3b8wk98b32iefloypcueo695t2l8yocb0xtifqj21di11hqa0fq7j4m8fq58oqhg1kq337yved2hk2lglqyntbyz42n4b4qy4ia9wulrzcf4y3',
                flowReceiverComponent: '6ec4ji7ic6kub8btkg6kabeic4nfsxdsup0dveno7mp516y1irnu8q1a0u4zwlqhpivi88qtqnfzpvd2bw2ybsvfh5qxsgan547rxdym69mts8uhaz3ef18pjn5td0fj768e4r44t80dpyxbqn5qucznu6k0e87h',
                flowInterfaceName: 'kfcexl0g74uanz4rqdmdihvhvb7nr2da1y6lhr9vz0cw2te8kjyvabk9syj8w1ng87ayxhrx4ymb74rb2di9wjpsyffcauqmqr53x9wrjy4nu5zcbippmliunrfll4mgdh75eoq75977aeakwz2uyi7hvh8cvcq1',
                flowInterfaceNamespace: 'pwlervcaus41aubhp5r9lvw7jpp14ye0ktg065tx2weu9ptx1nz1gydh7as41gosdro7q1nxk7m33ck0lo3eu1d7iqao1to8w0q50jczlvd3rwtbzthvsyf59j1h7afbtisfd11choz4h8cbo56x99rzryhyi5vh',
                version: 'hctl1bxjg275nb6wfumz',
                adapterType: 'geowd353wsndk8r6mn0bco140wwd4rqqb3xhz7ai0h0z8jwaqqrl1pu4c16u',
                direction: 'SENDER',
                transportProtocol: 'kjn7we4bqh06zyayd3upm7tqalwfvg416a0vtwor37jeto2rmc47ecpqqjdq',
                messageProtocol: 'e4590fbak3oewbe77xxek33ru0bajlwwlbuim7i4cz00zqc55v5vfmexfm5y',
                adapterEngineName: 'v3zieut32902c04uaslzfm2lm06tf9ma1ua1zcm1l6s359qmz4pnyeo8v4em0qkzont6ato3coj5i7k4r16oriy3yolf21ulrres7afsnscgz8olwpagdjdi9xsept5mfibb0cw5mlhsq0j4pnj3gp4w31gwucus',
                url: 'r1v4vhbbeanwfsxew48ry7znn3m4fz0ad7b56lpz5fs92yvzec86w6ksl4qst6htj7gkxtmxgu6tcftzwdtlvuau45ftz5if2ybgsmonqveehd6971afms37mv5r43vm18vo6dusvdzqa9mfngx16ee9mq2uh7q3qw0kd9lqi3v1ie2l18r5c4of0538xez2ro798advo4tej519y71gcr4meck46fstw1pcax0svf1vokjyid836ta3whuisjigqla1pijknjsevr5cijf8dts0i48f7ffoxr0sw6r4ugjkxggirra6f81om50all2f',
                username: '6kcahvic3es148u8f7kvldsasduwd0596xbtb5mcic5g89i2hm4ddcsggv27',
                remoteHost: '5rbmpikpo24ubn7j5h7ao5pix4rq1unh2cbbeteaw10xll3uqzdv4mexzh3byjmxgzwjs8pr502b8mkvhcfot1ks78ury11vpl68zhgk1w9o7cjvgiur01p1xjykvfjrya2atqcg4b4cdpm3zy23o6ut48aicxsl',
                remotePort: 9393841050,
                directory: 'lgtykvsqrr5nb9ue2pi2iab61rqa0cf6e40gmjjschnnvphtnx9fv25u987te6nrv9rcnv72l9q9iqi2qxd3u2y5561eqk0nsvw0khm4ybxhdc0xlsvo8qaafoyskvti9s385eas0mke8gnmhbukzb5ln5oooyqtqpdh6rt73v8jrtnyauu48z6oosvvkkvdgm6qymi634sbz9wfhlqzlb45zv5g99yvloo3wjtqsuop5822wzvf64fd9nv1jk14vowtvirljjv8p2lgj3lt196xceqse08twuakfyvk80i7neekihswj4qfgfnd5pln52mprd42rpq388oyhmxmmy713ebcve1gmd76rfn3m3ty2u1ngox6xkpkb16qwrfks4xu9vtbn4n5wf349dagq3ql316qcxulbqn7h29oxhhur38emp4nis1hqrhbxiu3fto4k7t6sk9jytvya6777yh364gooe4ks9w54wxofxmgc40286gg0vb4l3srip22ziahfjpms10gkv9ncbmogh5ramnx2xn2vb4jzs96a8rckewfnxoljjpr6b3ebbakevv4hkwvdsy8psqmb88aj1ajyp1lllmlr5gdevik7ybrk7mr6tc2wimz8gbt0xb0g35ikc7brt6g49fcbvy8c3yp6l961dtvccf2tar4lcgvth5hrber5er03apu19s0ofio4rjrat27pflykjfjq9m7hg1opzzrug4od4mi6j9auv6ndz0z4z0njdc4sc2epx2v1sq3ppgm6ilfkzvhoqitrcywm9xbo8y6m0f9i8qf7axzjm8lrfhy7n29j7v0uqjmjyeqvc3gmjew94178h3pnf0bfqh1ilmdhec4i9skoot3y4g8lgfw9dxdzasxvnv2i3r7nu7cwzjav18nqa9qp07rc3f1k7lythl04dsecb3g2cwsw852k2yf8w22o8b0a95e3jf8jgm8v8co89u4imlbfzcjgbmw65qb8lepwpwvcfgmw9noltzs3u1w',
                fileSchema: '7hrzmwmnqt44fw0ymz18wvt31dcph0i13nb1mm2hl6oa9602zc35goas33wl4aam6qrnzexpq9ztg61wsuambb8czcxszixbf7ifdcyinhr9p7kxtwgdi1a912jzrlzo06gwyrrfeugy8b7lx7e96n1tug3zh7qfbl1nmd4mwvnl7hhq3fbz1v1v19o36h6a0l5kh3pdb9l7qpvye21f28i244honrak78p9gjzif8k3a10cy8yj65wrrkd82iz08j9sf5a0v8v59m2fyom9l5h9r4vhfwudodziwau7nbp3eu20xk8ei5j3t7ytgcjwn7nyw9xorv3lf7renf3wa4rfuagfsuit5yiwrykb6lrv7yndgkag5fyirf3m09enpkythvdmb84uqph9scelvpp9l27exlqq3oii6eu9zs2c5gyoh5nw96t8j8ih2manmp1flrmouw2wlhskn0mc6y19ciuc2wtj6ga56os432dg4scku78e4o7sta3pc1ru05vq055bhmapitx1yllenxpyz49zse6zq3jz79ol8bf1udi7ahysk98206kh2gpoi20ade6i1twk9tu109l8fm25a2kq8d9nwbupo2uzefuklh7372wlp2t3f90y40g9hyrvjgy9z7q6zv8ul3pzxxms0uahjyelel69xosxhyiiio5ojq1fcfs0gy0b4v0tyqk1jcv5wv5t3iu446fj2t2au19td3iu6f8wu7c9zvrr719vd2acma5uiu784rf2582u0gag07nns2w7ll4772c16ba3hgkkch5tbm31f732n7uccqtfp9rn6hxnjpqxfdzp7kl0o4zoy2e4x9tdgdyn9rrifcxpq0tjo6981akaa4r6al28whtwe69cdq0vy3a3oygq5rewk2tbkhinn5eiy1o63msfm6s8dpffzjppexdnh10qprmmehk3ns2ncfsmlu2jmcsskq36ae4x3ulm6ksgh7fi01enyqmke2pcktzd308vzzl349ac5hp8',
                proxyHost: '95b2f8sm8v31d1qq05j9ttxqp4gge63pxhs7zp0p8e2d2vppkp4h8w0hzu7w',
                proxyPort: 7861155423,
                destination: 'k2e5h6z1zuxh59nowlgslje13dxnvwv0ojjyyrclr3mz7aimydzhluhk49w7k72uokps0f77fa2kccgk0m6ixaocb2gdxlbkle6mxxpvpyz5x35j5527a73z3opzc9kpt1f1m3o7vn64640njzwyolcgb0f1a8qz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9py3itwheqr56ural78bioq7ty3exyuain1sftifcfrca57iambnirlithpw52ln11ogrrzx0s85ofq1c6cshgtcla6dk5i0hfag82q466hpi0asbkizfc6ubt3l2h0wp4cyf0r4u706o25v9snk07g3grzoc943',
                responsibleUserAccountName: '76t9t6aewmcyp8bo6o3s',
                lastChangeUserAccount: 'r9mrmh0kitqkawxosxk9',
                lastChangedAt: '2020-10-13 23:06:18',
                riInterfaceName: 'gcd8a2kky0cxqic6og6imbgydu066refe1k9x2kxk6to56m8cwfgkg7zex8b8fi285yr4j31levcxzjiwexz1poz2rbqbk34pyjnjlzlvxveu6bhpspip8fi6hzmwku8g4wrdc80jq46ivgpkj9j9p3retktumq4r',
                riInterfaceNamespace: '3cmbwdfgpcko5dhphmy4xxnzdk1r4e5u4xp9ogqqvtmlz48uc2gyw0rhhq0m80e2v2ahq4d2jpss34xt8pnyqs0vr1q6epcdc92qcgxu4fggdeu53qtvtxijbxkl3ozfaa4dz3vtmtnckkg2o8b277wtluqgczyx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRiInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRiInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'nzzwncxf7o5ivlff6wbc39g2qfdf19b227by92gf',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: '7wvkxu2b7mrhri9osvjj5ba1rnzwth10k7nabcaqr3j2mc390g',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '1qamk7flk05sc89cbliu',
                party: '2q5j80y7bd1ej50er5bxhakamy6y07aozvgqz7xt6b4v7iq19plnkrxsp2re9vsf1nasyrnsgi0bj0toq1wuhfoygnzja0f5euxv5fkishboy8yfujvl5zzgdnbb99o3xf5l4fmghj52516hoy81roelf79ujn7j',
                component: 's1bby7z81hsm4k8lw9bz7j4bqsphhk8e5zyqx7radf7jkg4ztcys0mgi0d08cbm9hq64nodm6h2b3ospc0c4wowjt68ganr4nvnjjakxrre0rl1jiz1ewly7ze3v3sxl4qcryign3gbpcaxzfhyna2ny5z7p6y1s',
                name: 'z2vadredm3x6ez7irhatcafc8jq4bhn0b1k7bgvttrvzd8f57s13xwe58bpagdl30yg8fms9smrgbnetdtxvane05cui3kit8noe2fwflya7xo5bk6jhjh6fpvsuqn6bozwvavp4zh99xaczxehw6jh4dtwaij7n',
                flowHash: 'whepjpokvprg5btyysiz1sis88un1vgf7l2hgpao',
                flowParty: 'fehpn9s1jt9b6s7tviktorrjsgmbqjl9ox71an3jcbf8s4wnr6x5503hv1uosy0dxweeos2s622mqqd6hlxswl8dwlwbgw8ck1pvp7qwmo3sf3ylu3jw78psykgdjcrgv5pp0g7khj7ddj1hjpylpa2tdrwp7m75',
                flowReceiverParty: '6piylegqdz81ckbdx6s350acmqywwwigw3l6bmpxvok26wcb41c0ja37jul6shv6vr1540qydhkb7xkdaoqmrgc3fvnhoev1f1nwx1r31na7evhytjy2i8g22ewm3d631vc3d81qu4ui4r5kyzgw584j42gffpot',
                flowComponent: 'bkg027fisgq4wiv129g4ubuzl3czgxw1b79i4rppl7tjd14rpbkpal6mrubusfxytz4e6sw1d562htv6f3b0eq31l54sco7l1tngzelk8wv3rk4v364wk9anenr0qs78yyisd6z9e3qq42p3s6xpmki50i8sopgi',
                flowReceiverComponent: 'nuh6b89qvgdgrqjzurz36ibl6xx97f44wm88a79iihxygstx2gm0b0sgbfel1mjrdl61aew2537d2wlr67ii8icrj0773ejdmpczn4slhkhlyt7v85ccqtcj0zskqqt18a53vqsmjmiak9ip4puy8mmfks805a41',
                flowInterfaceName: 'f8225cvwi7w6c8oyhol0ghgkr4r853l3x21108aedq5jk3qnbyoighad44ws8r1kqlhnqrs6yh1jnmpsziqndliztvsuncxpl3hoe6lpmbwqe590qy831fqelis72vo77keqhjn02vf5dl1q9t64ka5cflhd3t7l',
                flowInterfaceNamespace: 'xwvai9um5tpjsy9ocw2vhi3ygrhq2fintq2sm6sosz3xgmzzczw1y1b2x4xykuwemg0kwgfqgltkxjqb8stdpyf25mko4rb0c3wvsbgp60y741m0g4u2pao41bjklp2qe0nvoy1r1tl5tswk891oa40pwnuma7fb',
                version: '08eopu47waivr9m356r1',
                adapterType: 'rxopkz78jvi191b18jvtbuul4hzopwmu38xy1n80o7biptm3mthkitw2hzcm',
                direction: 'RECEIVER',
                transportProtocol: 'qelcltl741ztwr99z47tvc3riqj4ulurfu7zirjt8st3auulkgronzozqktd',
                messageProtocol: 'qdjdnmf3xjrkuevns4216vd59nl83upd1w1ipmczqbba8h968w9zc5qsitkd',
                adapterEngineName: 'dhb0bz0l2j9q417khprl2g5db6vuc3bx00905jbr9coh6wmd5tr2ir65spjv9i9ah77m26b17na5307cb2acu4fi79g616efkue62xq1w7vvyd8mruksveltotmdrb57h4lc32rcz7zetafdwgmyv3wx3mo0gcbh',
                url: 'hfqihofotorhfimf9ge7py6c4vvdfraqc7os2isz8yzzmeunr3k1y5x1vjhbp1prv976cm5kta6tcjbifuq07y1u2nk19a5ks28kqzf887nsjrayr3ar7oim4o2sgl9ij331d63p1d5nx3voe51la441do1gvzb8hb2lpe5kes0rncrlek10hivsckpyj9xdx50vow3zwcrn8ckk9h7ccqmzs7bpvfgp2ydklzv2frwb2s08l1xhfhebjtz880nn6y9q3dbjeutr2ih714iabvyugopp40jh2hf16d2jmono65ibekyrwykw939pp7wx',
                username: 'izzfn80h5rzry77xpbacoggsr6j1ld4w3rjz52yf1agxgi24knw6801zokk9',
                remoteHost: 'df21g99km1gvrv2knubpub7a3v28lq9fzwxxrer1z3vpeh5ut4mcde7zkutp8ivcvt52tztimus4abto3p0jbmf9ul1fsfkie2drg61nfklgvi8zszf4vxoszuk316fxuau1wy6klh3kx6ib1tcyy2bqe1ki6uzs',
                remotePort: 4470399739,
                directory: 'x30l9ohje7j76vyrs5t5rvlsrtm5hptnju1tjzayciqhuh0734swjqk4hib1p9ge5hbe3rfogj1tkuvgk7karv5vxa9v1lmjwev3gqoeit93b9xrmiffvumidx3sdxrwog61st3gz4d78cj3gu3my3upzv44q1injqbwoksot92z9botmyfp5u0glnrlb75swc2qw1hfpodndeviybihe0nsjx2jce5h69mcjdgz4uylok28m5asvczot07penzon05ty0my0dmlw57yer1ceamkxha9vw3gmxtyqely8f9xtejf0wumbvt5bqy1bctjxrn6dh3vs60crlvivwz4c7iycfigonex2w17zcbx82eo7eutz4rtsh5s9bp3rxzquyubjno77g5nc6x3elwmbznxses297elvnwqyuwoaxbhj9osms6hwaqswzx9yh6dcer618paagou974mlidmwuntu0e7i6r1shkr013v5ylqhexptfmtfeylbn2cketmsz5pqmylbrf0lz7yp7ptqvfl82wyzmfeb0fegzpkz1gcicn4kvjwwivsg4sdja2b7em2r27u3lpyhjc52fi99oj3uczi27hnerotov11l8mc1tjzqyx32ybhetexy5d0r4hgc5v1timbp64r2qh76bmy1786o9fkqrv0y7504qsb4g7hcerr80m5vm6sgyj5wdxisgc55t1mjoghhcg7cgy6fhsnaabcevnlyjadof4366pmxrq7dyss2ek6cwifvm1omwty0uisfe40ayg70zwyilijzmt72iwq3icbmn13dj0wuedytlcn95wp4nh1xqt8r5m7ib70ip3d88ss08zceoyry8qx4l75d06ga24ayjvui0sgulsall8vhvw0va4cxsdfoa5u07aosz1jxdmmm2she4kn78uvzb6q6f13qq3y6reh0w4go4xkictkqsdr5i6hcfakwlgkfz9qriz1x2b48iokuyfpksk97ky8nu91yiguhebrk1f7ih5s',
                fileSchema: 'lp647v68iz59dfk0h4s75z1rtx3ni4ui3dh897e4q9dn3e2k3wvdo1uo4so7m74crt4lib6kngefern04gyvoiwg4o2tsrtqt8cq3bj6kellbxlmaiae5qrn875qfsofhmffkxjbnyqf6uglncjwwqhyzu5yno4m2aee0v627ivf6mi5j4emrjz65nmwj936z46f61mi36z3d71zj7whjhcfsgpodn4zik49ft2h2bpf1wbkr5jwgwsaeeqsnihlm0twdcz4hc5cnoefeytxwo71o5ndwz0mya32k4tezhu7ypxj6dcd8q2gozparcy694xr78wpzaxq07kjpqzexwpyby45uc3w6gexqnmhrnt2lydauou9oujvblgjfv7yoe4y8avrbrrxnm89zbs20ozrm6caswf1toge6cd45zhf0v31crjxh5kjryz31ibdeuo913g0qhzg9uuvzzjvotxh4x38maw8xwsszjv4cno7nglle65i785vx6yhk0e81j4hv3ra267tx0ikswz9bk8b180ivvyyfta0suz0dmure2aq8xp2hce04fxq5g3ohhe1bo4dt5tumk4l82mccipjbbtqurzn2g13fy8z90buiwkyhemeoj2jx3fyagv8wwgimry9pjb37zyepacirc73jj8qx2e0qbrtxle76hcrmql0r6pa443c7kfvdfatyly78l6ynl5j9rzvlrq62ncft3zifmbysokb7hqmwv4w86tfq296zpy13xvd5x6c7wy5sb8cd3th6jo9rl7roowr836xw3ziex0mmyxsezur0bfgl3g1pgulyo84khwd8qn4gfk1iff273o4y54aevgfbofrv19e8af348p2vv9uj9ufndoan2v6yks0vqz50i6u16gguks3pl6pfroskx2v7yv4px36n2ugm1moo6mexiwxxlag60sbma4lqzmcsbmybeq7qr2b2kpxlopphz91gc03mabqcp67g3pbdbkz7jkubryldevgaot0gcru',
                proxyHost: 'gc0lrz0jw81qzkbkner8sh024miyokt3ytawcazd8s7jsffl1jdqnssvlxae',
                proxyPort: 6456000449,
                destination: 'f2kjlddg8gxwvsk33d2mrwxfrgxpjwrybivw07g4gwdglhfrk18yap9m23jjsakf38qmpazwbvjfnlzbe5qv21h5g987fgpiz29sk11lmlmlv2n0y4olosmd0zjuly50ryx1he4pd9c186xr1twn0pa4byl8oiwk',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bwa8ddllahvb484zqczeq2czhglt5i8qpxkmvmuxegmul9d4k0ewn4fd5xne6dfpx0hmlo1hizitg4ih7vlwqbpkqn8141846hhkt34rom0z9wsmhp0ml44wzjfil40zuqocxerinotl67x32pmix8mblx00c36u',
                responsibleUserAccountName: 'aftf4s1ryh3fte021qf1',
                lastChangeUserAccount: '11s8w6c4miuz42w1unod',
                lastChangedAt: '2020-10-13 17:22:18',
                riInterfaceName: 'v0lx6koqsu2x28dyzi0glr0pvg9vwhjtzre252fpgv2n6931m9hse8xmur1decmz790pyu9uy12nfsowi8rhkdfghi4j4j13kpk7xdg6bg2rp96axvyvunz4pqtqeawthdljlxnz8cumm7canquf6d7lj9icy32l',
                riInterfaceNamespace: '2ssiom2vvweszlewbdn4gp4ypsu3o2a6hijk64otkunq6bwpggmy4ovq79g11ww69331q9bwri36q1g81t3kz302uycdwlsn0dgk87fq8yn94885xzb6rcjyae1ytgqxtk07eeh0ywq6dxethns9lvsg1qa02sytc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRiInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    

    

    
    
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemotePort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'inpztocbfxyb8pp0zfslkj64upsov1rxvky4ulcp',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'ukl69g4ti0vgs4qdhtap0xnqnip8y0eqbrk81d7g4n2hswdj5a',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 't0j4rhin3h3hum3mnywf',
                party: 'qy106pqdlbwfh0dwxgka7onsb5a4bfahxnr4a1qsxdt7m784b0d02kq4fwie6ecxo3kmwydq2v3iq19r1cl6n3ia7fiugpqjyeti3m3ia3fcldoxc2n2jyqsr0huqc8evgw3ss3x1mn1cakx1t2d1jyggzrleax8',
                component: 'myr6hheocvlc8c9bpxlncqkcc5xy3ul1w7aym0htpmvts3ycposwwo6xjqksrre2wxpl4cl4zf5h4ggwprwhu71s6ejfpfoysoxv61fasfx7rwh090sd7n6g7twoc4rkxg7ba6969lxzlpj9shl7tdfqp278dh4r',
                name: 'bm7ygs8xj3uhvgjwid9uq07lv8yz0a861uurmpgoc0oydksg2ppkj3txuuc07l8upg2yp5ehfe7a4r8ppbrpwkal2rd5okhp8kpv63ua1fhac55b4n85atzluc12445tsy3xhfyl8dy941bq1mt78u6sl68bn8cy',
                flowHash: 'yck8fq25kx7jgcjjm6lyk6xu97j3gtwkv6n8qmye',
                flowParty: 'wkjqxzgmxd9a4pr0fa3k85bdcpccpyms4a94fvqvlcw5onohqqtfrf3ss6bapg3eecrpmxkut36ri0a1s10koo0zt7pulrjckd5n86aoz7ndzmkz8acurzrnwkbcx4816iba2x7mce3c9tib3w94y4qbhp9b3hef',
                flowReceiverParty: 'z7m5jbhw69klvacehgexj8nc8swxmrkxnqwdm2xoi9g2i7ze2hehrvrdlm09cx97o059omraqtz0c95zx32nyj8bu20gns87n0in2osnzjv5iog5rp7mfzxikcy6b7wj4qfotvwq1x3i3p97ur2747mt92d3hsxp',
                flowComponent: 'vvqtrvoccxb81zhe6d2qsvnpiqx556iqurwwv1b47o7peauivw28oc69f6xz8wqpf8yrzg1473680ut4xn7awny5l0yjvma8yae3115z1ivjbv3yovsv8navu1sgi1613r26xbfikfmejhmvt17n6ms5w1z0to1j',
                flowReceiverComponent: 'abqkl39djkrwx0zmvcgpk3olmzfrt20lagc8kx5ulhgvulbfaaf2ag9am16w72b9thksit7zedbphi8xapdavd470iitzfjhvr7vz9cm7zlblcm05hy3thhu9ngqoqw5fn7d7dufqnbz2l5im9dyhbht25qpw5rf',
                flowInterfaceName: 'vrl60sgwaox9oy7n0e2gbum13dgdjmix5bu6bhrjx8way0vfc15n82f07imgq8834xpmr2uuf8r3q12t6z21fpjteq9oeag8b4zhhoj24kc1nwvjycjprmepj71soox6j4fu9xvu1xudow5d4rhjngpv1ac145ny',
                flowInterfaceNamespace: 'nvw4drrails6c4b63k2r8sr5o49sq0ytbwalbuu7622xj6h1hz5yudmn51xtntqcww7b8rkov76ioemog0f5smjzd7nmtjxv3zwmetoiz7xr7md51pscp3ykf8dskobr0fihr6nmx4xjlfcbylkvzvzwr83fsdjo',
                version: 'mj9yyedufdeeofsz48y8',
                adapterType: 'oiqxjc1pe6d9oinposwanozuqqbx21epoe1qwpv7jv9481lq9v4gme0hlv2n',
                direction: 'SENDER',
                transportProtocol: 'v9ht1ukf5oeiqd5ekdoi1yxcj20fyjqeue65d9blacfqc0vd2is1bwwbz9wq',
                messageProtocol: 'riokbnnucmspsvha6ekztxn5qflmo8n86dmgwp5hiwrjifv0l8rrrasnbpnm',
                adapterEngineName: 'ls9nh6ygzse5dwbx3tmejxeqy2xchl5q4lcz6np7i914mcipc5pesmbiqvudyuu2b81wis7jvk0dbyggamye88a2fxiqm3v210vxw3srmxjz5djom5amsv6h6j25sgprhrtmkafk6xowomc3xoyz7scmcr6qka6f',
                url: '0dejm2ix0izfk4g92yqx10ufuvf4zrp3jfg222mz90iow31cw62y3zx5kt1gpskfa4zv8pypx458cty9r6stjseyk0766bicuqi293w3h7qnr91ptc1c5p3tdjv72qof3ax9ppmf5rxrm7kjd47wdtfnv19f5bkw9a0jpcv1hlheczqn2jdp61zyycujsdrd57wm06pcusya5swz7pmzaoly010ikhad5w32poqmlpy450fongx264qfnk7kgcwefxzkeyl3d3hijkyky91g9m49fktu0yd3jnetbvqox2upbb3hpwrju14zssdojpfq',
                username: 'z8bru0m4ywinkbgcirfj1pjxt4td15o2ba2qy5mnsxr9i1sfpkn2g3khnmp6',
                remoteHost: 'kwpy35u8wq3ldrrrji7t7y2un3u937dfv9lnx8m0psgnkj4fsv0a3nldphfzsks8w7jvfbe6e93n4a1iu4ukkl498vt1qe1mfm6gfhoqhvl5otqlr0n9t336s2k8cvn9t7djxnfmfjic3tht6wl1j1calywytdb8',
                remotePort: -9,
                directory: 'csj1dy70fqvhrmhqtitf2145aa9059tupckvcc2e5b9g11n2o6lwu0xalk1q65czxbr32pci397csi3gmc0af5jzmxq5ejj28as4aw193pab399y0hb93qqdt4or5or3jdio6m4eymuuj85ntt89ddnm2k7bz7pwav90nglkx1djf3s5a8t1dhtgvvlmxrc7vm8vzv610rjd22skd4la4l6bsj5ph0b7tl4d6vaa1ezeeotlkvhczu3ufycga8m5smokbgc8lt8rk9l6jstph8o4z78mr67517000hlcy0chc2lai2wsoys3wvqa904hirv9hh7b1ui60iavj4zohqy05cfn9nvupxzdlm1ejyi4mvoreqz9ywz8gx8zb2nbtqeuf8gpznmc6pxkgxy20z9vh5jcr7oget3patcv5megjnqsvjcsoy71uz50k6una7ih8xh2mqpf6dhgaluthdny1o9ik22cnza10ssnb2mmrp9sjezf7ezqv284v8irnir5xwdp29tdv9wyqeks9itlafulfr2o8a7cfatgvh4c8uvu96pg88d411qhspei02308j5a6q5ldx8f8qci7o51ouxwmqoz0kuf1m6pdc7dnw0jgwc9nrnl7papx9gx9d470ewldpgi0e5lkabxv8fwgkuhzg7ggsat4cvkn1816tcf03p4fjc3wwazqymqb3n3lgkab0h8ab2pri7u4ejjkur4xuoynb04uagkvrtp27v736gmrx7wqzmwxq83i03q4fzs8enffyczzvgglt5m72smm5v9bvqaq0lurbp05o1zw7xriy13zofl086c7bczwutte9nac2iwo808ksuu22rmko9y4iyymsydte9etn0df10ex0z8je9r2187q79ih95w5d77mcmbyterd4yx2pfdl6h059ei9c6fg3xx14awwtdq7mpbf6u0gb41jfdf6w7oiosccdjvyvlce59jnfrkr3b606qwinvy7ps7u3a6uoufy1isu7spz483',
                fileSchema: 'rfb20vp1aqg9f0xwpfxtgcl9fbkn4nt57uywruwudyn37dhsfsw5s3qe4979inhx0gy5nmrt5gfe2v1xuytlnoafqrizqxhpcej6cvsokw1iw2upqf0p5btga6yku0048qyatems99t4om18ons5m7fhn1ysmgqtfdbqr9ib0wahhrcq5v5vc59csspnassm1b2woanuxt415iub0439y6pigyf8vncvxlz58wzybygr5c1wlh68yus0mnhxo9oy3ugcvn0yegwd2f70rz1da7od4pats5mogsrnyda5f0iq28m5ysoij1whbhmo9d0ooc9oydw9e4jnv50hn4mzvrnn8kkcwslws2ejhs61lcf88x9g7r1imu0yui7hm3vgkvcyrxc88eon67b4ju56rfvxuofj17vgar1fr1bcwf1a3zq38q2fbzasic3ls9fd76n04996fl6pnecg1i5fj5sbcj7tjve4b2pg1s81gityys13iny0j5gbd5tf2dyocib1r8gfrfyb6ehwaqj7wy3qr9o6fvoqwy4d7p8f3l6laj1z8a8uxewuzz0zadjupvv7fdfgh0g71oagv7pwi8k0yh0qymmzzgsfb2w1cfs3f0cpyl3mc47r35cyg83kmhrr5rvfecp2lsugco8w4gebs0pu9pgx9i9w7dow7ywybd70ua21p6ut5935kxpa48l84ly4nvqshx3bxyyarylvgvvw6wl6n1nm31fsf1b0ff2an14ta7ko1kfd7s22cxa134x4i79ios3boxuieb9un9y6v9zqw9qtwlm3h58mcpinofroiwc9o2rbm7t7mdkehy865cllskb3nleyehkjac4k5nufrtb0aiblimasilsy5rlu4kdz1qqc5vyqoqy0pbpe694el644em9lgz6msz1trjd6lntmndmammh54019z4xrsyn2fc5j37j20s2abratpg53a6hf5qdjbmitofpeylfzq7iggabby1yvl5wnkk0k0bfthznshbla',
                proxyHost: 'hmm2vur3zqr09p49r1dw8dwvbso26c01s3rhm886m5bgcojwk2s4j1rik3ut',
                proxyPort: 4857858592,
                destination: 'gkpr9rtexub69hwfcsfvmt29dnr83wd219e4p0kgwfft8jcpqu5kobc3n74b6e476ent1vfwkuicjayuqljlolt54ptgb10vsqoybp0r5ah7u7el6ld6stie74zsus8ryp99lo4lygjtvkkkkwxpm2z7n7f5obm9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '39frkhke1ioh8exajm0jz7cntwvbin25lpmrp68g0ny0kh4fulnbfidtkb9057qr5t6c3afchfh1x5do5jkx6na8ynqnb174kdhp4rjdpzltyr6abk8zagodmhbvtbbckdiqjl88f8zo0trq4rng0zbdi7i7wch5',
                responsibleUserAccountName: 'sibh7vlqadyixjveu69t',
                lastChangeUserAccount: 'p4qyr2g6shohz806t8kl',
                lastChangedAt: '2020-10-13 18:46:00',
                riInterfaceName: 'xurqksbjwpkeukqpsobsg7nq48gsl168i531emdhx2dphwb1200wpo671w4gak11hdug46lg9m0e8isa83aatr7f3fhbdkfalr1vfxtdp9suunuhjtu2fl6ycaf5984hbgx9ie0x2yzi8yvf9vzjaatch7140ihs',
                riInterfaceNamespace: 'ce6wj12ltzgw0t8c276wkn7q6jv5fw67hp3d0b5yxtpuwcpo2z6ups9v2wd6gs5ikcywlpblx1eugnbuje63k7ezoyxgbfjf9faoya0qo8pb5v452rnoxupujmgavr5lwzl57z5midedxftg640asgdjw47f8xl4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelRemotePort must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyPort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '3w7uy06nxw2uee4uqzxxm5j35zvrd9dgssdroq5a',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: '74q6oskwp94nv0gmvm7kx49n2n74odl1z90k25ifbd4ck78yyh',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'jn5q20017f3waav3vogy',
                party: 'xtx3yzgy9lbp4xqkv37gg10nwb9pnzlkjl473hu6k0ty5uza3v7948pvt5kx83jtul3xhscr6xb0b3e93hlamsga3ammympxc65faf7eqffpcn8waaqo0i4970ict8p462yrf5qhvg146psm5brtlfsyn5z3hw0a',
                component: 'vts68noyuntb50u3sjb2im8iwcnzco19002iuyhanwn9l4xljzfjvgdu4t6fuwuusdia6w2xwovi2f6hcslcm92jhudi0twnctndasbey76ckzj6g2y8e8rgdqnywiqs4mnpcdjvdref8y9g2ghl36afen1k659x',
                name: 'zmaiucfs7xy0ar1ok7xrpr0hlczw28grylmgxxzns6fs4ybxxys6wtkcivdlyqxj18ym3v5uhe13g6hgqt6mqbizfuyfnamxj0l4g9obewsyyb82tj8fxl1rbckudujts70nrtxbsi8c15uy3ep2bf9d940uodva',
                flowHash: '9wh71inmkf5wxralaihuq820krme1x33lvilodt0',
                flowParty: 'vbj7fhagly7isppegtlmeojqt8ji9hj543op8bbd27xanu5elzxpgd4c73gzzz88oaxp9lep1st9khutcfrvvnmz8xk7q2vdnnr3gsqg902n8puefd7uyu9y01pz4f696yitc5ep9z3n1qbkdq01ioo41n49k0ya',
                flowReceiverParty: '3jstn7zzh8uz2kgwyrhea6lclc9iopfwagjw6n5kkrony6d9q7wjfi5tgdxsfveojc9c1ao9613z5zlsfhnszvzou0ltt1lp2q72e4vr4qyp1v0qyahnp66g4g8x9cytgolbdyqabnqkjb4l4rfj9h8e0ltzqkuc',
                flowComponent: 'bivswngqihzmhmmfhaqv247i3wex8csae9g78lhjeyuy0xvpi5nycw7e901vrsiz9d6uc9xg17es7jgvlm59tpf37opkr5z1t27zdodh20bckanjs0l8s1kse4wiud7ffuzxribckfanl8gvd0ims5p2afm0g4ij',
                flowReceiverComponent: '2ggranir958sv7y86rtj8pqwo17myb7h0ee47k5pwwb4nsf0htjohs0kzxm6ppr5vd5zonigsgicqrc3y073i9annqikpzfncdsd0qmjo6m0tjlt11jgbdhh4u2f2g1dmbhxggsy77se89v9erx3xopkjvgrflcm',
                flowInterfaceName: 'aqw6904xyc6bp8519hfv8kl3co2zdttiixhpdp1pt6mgf6xiyip8wwl6pjkuojxxmw9fo6a32dcxrncpiszh6rtegjb41thogkd0sv87cimmo5fds07cq860eirl42ofccueboljtqlcr12qm1ks5z025xaosok8',
                flowInterfaceNamespace: '9bji555808zaooajhrs5sflc7p8g4pecnv8jaf7auvamav4rgjpalvx32jer4vjjl9yuvlap3xp24t9mpb5b506wtgomtbq475cy73limejifw63re6zfum7pqdtpv8kdp3etb4h4zpl241s4gcwr3edtdnm22ux',
                version: 'mo6kv9t8i6xojot5n91y',
                adapterType: '6tnwjo88nx5cb8mgwzfy0y4byop8l360xl380ri03vtkg1wlgu8p7j9aje74',
                direction: 'RECEIVER',
                transportProtocol: 'lue82x6z994zin4aaudm2ahwwykolg0kulpm2w2cnnefouu845cp53mb69e5',
                messageProtocol: 'x6cwy8wfeaa8ec91qwbqbbvxa2gdwz496u2qru7typy09upmaax4ue9fj4ne',
                adapterEngineName: 'rpe2rnavpyuqws56kgdveogazg3dpk4aa0brusbkid4uz9yn7fc7fiatdgg396cv38w813e2zaxd724abrzpoyl97flvg7o7881javn32na3ert3lz4o2hp57160ljgfo8lj3m1r7hy6jxmxal5ltlw875p5z85z',
                url: '4vwxbbvmr8el4aq0fwdawbk7adfidi9fi9u1h24dsq4vfoboayebf86mp9pto4tejunxdu0rb3nr0sxb0yuvngzf42ilyulxkbu8v601r251rdq4peb1roz2awdm3lzoepn40d5urusfvopz9930qgx0x9cnjgkvh3xs0lf8v6c7yodkyd1rnmzvy26y4ujh9k5un1uaocqdxzptmsaq0pau0147fab6dkfn93rwikomeqjqshy5elk769a5sqvx1aml0ijl2jwbqnjoi822ngh7xfjff37boovu135zvllkgsiqa4tts62bxtjoplec',
                username: '8nqths7kwox1k6h47hakzfier2fmzzur1cnnubhh01kym38g22xkufdtgubv',
                remoteHost: 'xg4u0tdke6yntutcf6p8ffinmqnx1b587cmgg7fvt1xuauoy9mcbj16nf57695rtwlokn77wpqqd5c9ee8ca97szvqkkowm4j9hfzkui3upz7q456lvnofkganrkp29yfovo834vd6lvkls3eji1grncafbu034k',
                remotePort: 5997212877,
                directory: '9rvse6vdqz7jxftbwfy5o8deos3oele2arle6r9mx35spr9kwla7368oagtc3x3ntgpc30w2pi40482njt3wbs7o29g89tto1qsme2nxs9stx54kg5wl995udt7pgllf7npgxeghbo20fdryx8x5ac1mmc149ta1n5itmrgm0gvnm4bq6w4rxv5v9cp0xnv66hzl1t2nyty4u1isoso81g211s28x21cvgu4ic5mzn9y9g3wze5idwyyi2bfy2eq1v2n5q0dm1ovp295wbr07n7cy8ey8zc1tpbzp6apwbc16q7h4ev4cpfoc7yav7e5d4c7k4uhkxjombcsryxkq6hykvcde6tpei5jhurca7cwmjia4373rbf6m9e2bp31sf4ssqs9fo2jthi643dnim43ln2urc7ghltoi4t8xqa9kaaiy4i2yrl2c8unxb6qna4hkp4fgi5njp775r3r3jnhpkmwbi3ot4xp3kg7nnsx7l2gi2l0dceiuj7hql0lsm97zsv6kxl5t55z1j363wvxicq3zafkwc6ap6apyxc5k4oez867uti8n450s8x8y250h84kbg7lv8trgafbf1oww4jcx80489vinkh4dmdzn2eciplpo3j6vln8fn2oxgny99nf0ppi4jq732j1tyzg1vqtiknrmxkq5ix2v2tgh19ltsps2434q7t208djij4ex3nyy51ai5nk97hifszx9ea3pxjl0uzrq0rahhccqxtzai4vo8cp538pkqrn6o63971vuppmtt3wc0x0qy8iyiz25y2nmgmpn0yzwnftc4fkzkobaiazrfu1eoh01rscoyunuuyvy7kmb3qi6s5lyxlz64mb5db2swdxy6s0g76w71cxnxpqkacaj9lnmkb0b9etgclmhiixt1lgx8vrqbe126qm0tibfz4eqi9h8re4fsigdn20g7aa2wzxas1p1oorwyfufyhikeqovflx4fwm03p02tqrm6cnnrbxa4cq60cstef4hj7468g4',
                fileSchema: '8dtd47j06g1d17gu5mnvli6ka9v5sl1js4tqlio98mwleuwtk30r0opohdwfxgubd4wupzzhrwnfl48qhc35i1aehu59ym15a1l7gke0vt588dgd7zntav9hssqmantqil62g5x5d8qk6fi8xtzg5p5xplbdfiiyc7w5mjgy5djygfepxkaig9g46qj8821hyz5e2glywf5qa0ijtt1tmpuk5noh6cxwjcyvparoti6e2a3r29ni2nkme78v34s2s2i9k1n43p5lkmrq7anaqehiyquo0psk4exq3ymfxtp3bl0mfb2neurc5n1v36n1xtlws9yl1v6xeqz2bkhr1cs3h8exqub3k04fgoveu7cqkegsr8i4zlig36zzsns2v2408tf81begv4bzrcpn1tgvx7juuhlo379bow74l7rl2pp8ja7ab6r96u8uuncud0oasm8pomq6bh7oge07oxfn71cihzcz16gplisiyqxy8i9babjd25lmll4f0gdwbsv2zu956ww5i3x0vgfsrw2mrlt07dwv2vga1v6zssuforofhd8ktijzjo5h4v3ykgpkycq6tqo63hhdqjwvv2v94pveoonpl88xy7dvvjtku5fgnzuywcx7q8jm9x4usuy91ey4ecxwlr9lpxak97eqt6ye5b512zqzd3v2ls6b57a7dwlmueyeu34csiu2j9f6xld9sh3c7bqhyt9vlaqwmkktir26tq8mnwkiu2u8hb5khm2pu6p1unvokxmwz3h5b0o3q6zi9wymi235bn1545vxk2mot11zhaozwhis3o4f8dxkbplgvb0iu57k47glhl8ykp3jwmx2pjnv9w92qvq9y0mptddpx44ldln80yfmsgl7dqn3pr79hb1hhq2glx19udly1ahldc31nxonzyuqjixh8tedxrzyec1xggwtn5klev55lni4srn64dyq2yvmnw1nalnrzk5sbldytc6bt6bx9jmmtwtfwib1nh228uyu12pbzrs4gvd9',
                proxyHost: '1si6isf6v9l1gzhu1wumn87l7u0nigohl48pev465lutcqrud1ud00xphll2',
                proxyPort: -9,
                destination: '9d60upxcmeq4ge0hphpa18hsv4l4bchu6tcqc0lp0v7mlu6blbpr4haw3pjo2adsvk7wqi4v40iv8kklnjo9gl3ez0rbv2wt9gprlhff8yks47v5u7jwxsqc94yq15ni7jzau7db9fkzgqqo80imn1sgs3crbzl2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'lb6frked86rc8dgh48dzpforsc2nxisuiq8yiwke1k3a83cju0ijtsnqq4iju2pbgyfd8xvogmjkywrdet5dlgnxj3oy5kj4z0q1h8gu3z9k2rruphaorsjwapvqrn4vlfzbvj56o57g1qr6e7orvscbufy681tm',
                responsibleUserAccountName: '32o7704aa9bd3vg1djc6',
                lastChangeUserAccount: '863v25i7jc44rv10alyr',
                lastChangedAt: '2020-10-13 12:14:08',
                riInterfaceName: 'xnp2187pkb9w01jjtyqtagbozu2nxzx17ooyaqvbnj57kencp8k7k3k8rq5suhdyxcqqeo2etq1ufzjefnultb1hx8ihgkl3iqhad49jhbbca7libvnsg8wfybh8znefnu14haaaow7r2hdeaqwgmhuxs36k5hjd',
                riInterfaceNamespace: '8hwnbczmu3p49la1eds84ewmww1b1ekfaj9i06fcrnmoqg5nlfnx5s5xvqc9an7603d7x0g3wiba2p8lue2o8d1z31qnhokyq4996a2hz0woao9u6agmfsnjzohi0rba0jxs2lajpbqelmg0g5ldf6hunq13b815',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelProxyPort must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: '9je8ew5hwzrlfg7dcmxuhw5c9gma8yxa4kkj8moo',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'iin828r3kejskv6r4jjgwvqmyea5nwbnbtkqxs6xjlpygsp3o9',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '3hj1o2510yff9nq4gfs5',
                party: 'brgru1i6yo0pdlbaq5wtquyj86n1ryyb4nzcomjoe7bxyzbilesced2m4trvdodg5f6peqk9d4vijwv05wx1o7rqleheb37zl94wmhnhdcws19phln3zxtqty77dw1fk3amwfo7vpv9j4vwwjehdpmcc76nyrc7z',
                component: 'mu4sbp7rjzhb7522ahle9fbv1oc96nlec208goqgqm7jd0o09uiaddcpr7g2io56nhx7n2pui68oy607n3oe540crds07xu0ai77ut1j0bnutsgp9qqas264rc52pw80wfb22gsbpl1ns0suw8g6kfzpzkdrp7td',
                name: 'prtrnr1mjlqd98swckz8d7ud4omrjx31sgkaoqzrjragp7hdvqsenpvjlxct1i5o38vajaygeww8o9kdsjnw10h5t6qnemc9sgywztd6n1263rl54b2yfysw81qp1qkisufko9rjvjvgdo0fz4dgc1wabqxecdi1',
                flowHash: 'pha27kl2ky6kksutfm11ypl13dngtippxs2ylir5',
                flowParty: 'tpsrrhvdfnuh610kmuggryfji1xwki8rosceh7j8eovcp15t17zlx2c7d85m79im8fhciafl4b60hnyhyv8cf6wwfn22c6gv34vmawj7zgwo4igkm7162iy9jgj4kwm8fv3faqezdbc98byxmp1qg4of56a9r3zw',
                flowReceiverParty: 'gg3xneyuu0kgyze77r0bqecen1y5zduhq5o9f9p6do7qxusytrbagx1ddjcu7iuuykgokhxitbrqhougr5hggr6ztan8plm16asos6kaxcp6zhh1vosfkdvb3mafck8ktbk0ifkkpmof7pp98reijf7u3ydtqxsh',
                flowComponent: 'r5f6ihej3c857dxau5g8hjodwvg0l0v2lfjli8vln9jxikbuxdr9gmlo5rzoyqqscilyjdtjtli45p767kxghb8c3u4qvs3440lgpqoc2f4srgmiik3kwp4d9eupxsyffp2xc2iup3xyq1rm9n28kcjjxilbazpb',
                flowReceiverComponent: 'e6jsozog06umqqvrfmf10odlhrca6r9hynf568hku1nw5lfgb52wdj8aux2ddvfk5k9nz05rdre2xgv3w8706tfjp9z26j4laked3un1is8kvcsjyg2o31uisulbc1bpgd8pi8vd63ikf03r39sxifmy3n6txobo',
                flowInterfaceName: '45fefmw9qeugahngw82lyeklbbeao26xkq2rsbyeabzdbjhwf5h1wh33lbgsi4o2ukc6abm8kv0w7vnagjcyycyl6brvv6dcch6iz5r9uj72vt1fj2fw03c302w8vyf46qxx5pedakxbk8w6ci103cuoz8jbibal',
                flowInterfaceNamespace: 'jdrphv12b9g3mgnbx6rcnaraut6835hjhphh71lyb3odrgralzs5s93eulyrjlqot8d2tc0x9zpe41669qcjqjuaxdyoznsxnpsb9u7xd45ht52do2jaggatnr7wal9pv82qbebya8biout84ek21fp7uia9mm1k',
                version: '48uercwxv0drjnusxk0d',
                adapterType: 'stookca8og4dz9wfitd3cp8zo0zenewh4f1ierd4gy9py6ufp3l8b2qj1bnx',
                direction: 'XXXX',
                transportProtocol: 'uxk5ipg4q8rlsjcsfetro52shkqix09ar5juctg86wovvcg3vijcpc668idb',
                messageProtocol: 'i4lh2qw5y3h4xqs6408bv2jz41v9u3jfwlj0r61oangh9g5m6rtf0uqe1r4r',
                adapterEngineName: 'vfzhtc91nqoc37elzd1goep16j3hww86yanebf908tdxse1ocnzsg3l1x52kxoy52c4o5exlhtd2x4im69qul4atbvwsiqezdwr68g05anyl6yj5lnke5lc894x2s7mapcwfqlfbovhpqaekqjza3tp1t2nlvli2',
                url: 'niahbdj1d62u0ul1519rkl7sjinuqgxs3x1ynscfnkve8xuwsfne9qs2seywn9tuy33kclwacpqbs0rhdq9u06bn92w0ilplikra1dc8thmqlx0wx6guwfo2ngc0scvj1xf1vn1z6x2wr5cwxdijyofqucibvs3luzta962o7mb3ine4lm5ayoxcodfei3moxo1yafitoqt5k8gfm8zwn0wkwa2x8nfx4x5j3efgca75qnkjv08pui5e3ps0k995m2o3mmfhmwl5lbx4liwk44fst3xvnvhy4atce5lzdvjdu9vtuk5l7p03fgpugp0v',
                username: '0dvudx32qcskqntjirv0l5sf0004cyqon4jmy80kx883ga4h8xcs6hcmuxiz',
                remoteHost: 'nzp7kns3mc1te3skzc4q4fixen7dzfmpqijn7yagk2z26jchbt52yjbi0rs49qbwplwi03txditf0niamokzif3n9fo6qz65lzhb50cxgg8bu5p42r1kulps7o72afd6cf8whpvrlbdqagupsi1bsp0blfx7dfnv',
                remotePort: 2700295942,
                directory: 'bl871drx71btbtq5u6wdkwlrk1segv194vxeithg95mw8g9b4egugqxjmyf5rassb8yv37fna9ejxqimb6j2qmcrabtbe8tn3avuvuingb5o3g2ltrklzpf238t8rjjhdy3m84cf7myzp3sm50xcbro4s1cyl436rt2ciuhtw6ii4wdbyhugi5h937se7zns7w1pmxo8r6bwqvedssbb1d0llh8zp5k5sufkwzk3fr4r4prwzt8ppz4v02ucb039ujfy6aap7yda1zitzwu1sx3urt3fz01pmtaqj19vwqbv9jlaknw6bogdt7icipg5ri3mln9dy4tw73y6vvtkzckvef7jyy7pmhgmjhi6sum74jv8qvyywmc9or3f2rqhjo1y4a8gdlf72qi2izqkedhirst0ghcz81haokv2c89dnbuq5g9uci1o910ijtiwqgei2fq6ut40obzp8qrx3cczneiz177cs6qoiamd0z51a4j159zfwoslvr5xb0fkozzu36x580jwe8eywtuzxgvnnpy8jw7oaguhu6vtwrg9w2nyw1a8ewaxpxofgav8z59v1d2kmpbe8swsblegg0ghjbw6uyxnkkdexkggo0oi1wgcuq69fzmftimqej28c3a8vx8sju6rtpsnmqt5orvzzotwv8ymb5noxo81jeei4n30s0mecwuybacd80lv1578ofhw2qk2ko9vhf225udlydw725o75d4kq4ht1zwoyya8ml6pwi8cqxpfrks3dyka7ckottcf6tl1t6brnrpcp52xmr3ueele8m2fvnizqrk067o1fzegp58k839pntucibu7jrf5au6i9owyvak0278mcdg2jon5oa6mu3tfqceid9pyawoajni56q8trx1ssg8mv2jp9pxzprn2syx4t6cjyyji8mujovtp30vqx3dl0vi4kq1lilozcl18yixhi9uqatxjzbwx9ywss63v3xij7gaf2uq4lbiuw19xza8o3xa8tjflxy2f8mq6',
                fileSchema: '4s6vrfja16ue6qgqhfj9qxcht9irhr4cbuj06up0ckh1hxc3qo0unv3anovpxu0b5b7wuytti7jh57lna1bri5x901rge1k3w1jd3xovcxpehqv6sixezw9mp8xygi8vb2jcmtaukrrlzqnut6ib3hqf18gm2grsk104hvddhxzwtejiur8xxkopk3iavaokdup8o7a5uli174mac2vxh5cbxdff0vpcu9gd8n46pgxh5gwkw2z4odkjm913p2drjq8c1bht16e0npx51unz8cvepv9ffrvyzccahx4h5245hzijisjb27qqwymtnwqr5wqg6kq4a4nr3r9e61la0gqshhuif80mcjj8wh1fvzyrwyq34mawdo3mon8xchm19gfny6uqqpk9am1vcxu2oojx4z2bamnm1m0w384vgphzramv9edg6ibjc27volzmuxfn31kqcd6joagd0nogxvgfpc80dntbjmimy1yzcyb04ifyh9l4qqjk35jasa74zhtm11uu4ddhrljez2nsigt4xuy1c7hg5yign9tod427oi1ncxx5yoczr19b2zzybxmsi0zc8h7upwhgv1r2l8j9ws2bsxzcri7uicatv1rjsxb9kkm3alsexkn7y0y4xag61ainys5zdcwsz3g4rwowegt730y6dnpd6h4g5zojary97jkncik8fljh0hv32ske8e59fzxrai9woa36mzle55kw7my9muqrtzchbt8zhyzwpze7j48ey3k2mnsb79jwljkbj4mtpp4n3ip1vvey53depy5brnoqriagr05r5i69zdezni0pyxk8uupem9qkny0tbyo2847r1cddkaekjkpdh5lirzgi5d913z2fjyihl4100wxhxcigxawxi8325857m8uvxqwhpbfrkc3o98qak3ymtfytjf9tbe0f6zub5sokza4gduro4lhn5zctv1y5l3lc9zqml26bs39f9pol3j6nmucp9kogwwffnshd045dfll2jmz9fohr',
                proxyHost: '0tz1v8f2yhvtkb9fv1e0q9t4s394gp5lsw0xyx49x1thw9cwyb7f7236ms0v',
                proxyPort: 8215781702,
                destination: 'glu6cknmua3ym95wkl0b4m93pzj4ix1457qwmcy5e9uc9xo7lgsx66rg6l10ypylaptwo65m61spd2qb4qn01pp79jqaxt0xb6chln67a8zaj9dkh0l4ig90u5fy316oq7az10wens8ra3qerg6mm7vfj97gq1yk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'glhqrpxdkuwy34qm7ldhdp3jnrclgfsn0jz3sl8c3ukthogmkn9hr1eup3njha0vko3lw2cunub940ikp4hqfav108k1ae6o269qpnprs0rzpkntf3p4flffpljrldqscz4s6jo0mqn13bxkfsqf2a588sor01mh',
                responsibleUserAccountName: 'srqh4wtwm6j4edd1big8',
                lastChangeUserAccount: '3gqz3g1ffbbr17hctfxr',
                lastChangedAt: '2020-10-13 18:30:26',
                riInterfaceName: 'rlx70pqjqt1msa1nr3a6b3s15wjkjw37841g67n8sp8inqtee80fialy6sflvsgyphcl3iczosmfnzjxpcey9iubln0rue7q2a66yrzvbz8wcmb0mjiqx6706p9llnn9bgzl1sx9x0ffsf10h8ibb4t16pyzl999',
                riInterfaceNamespace: '2jqlsb06vc1udlitj4itnddlrrz2vfmdpld8aol8f8wcvi75dk6cvv35870618mv9p3tuesobhebapxopm4ai7eohnmmr0hkff5c4i78sd7safhlp43o3jibmlp9p9l66dp4mhzv482g5ye3q6v3ab3lyigatwhf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'agfs5knl0wo6lza32hfwo9atlcva4bqdv0hgjmes',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'rkxm9rw4ho9f139va42u8lmkk9qvcs1ny5dr8p2t5axlyxqkgd',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '7qa7l3v6sp36ojn4w1vc',
                party: '9o4qt440ulgvlxrras9olzhhd84g7sz74wob1arw6yi5b0s7d39pwaw78jpoq5b197wubch7v9r0z35948abwpy3c2fewfhz0bxov1u9n2dgw6853j09rughdov1j8l23qumcnkeqmoyqhruu5nfbil3e5pc6487',
                component: 'let3wmpr06qriszz9ysz6dl3rvv8v6pagqjm548zi315kvw2sysr4kt9xi45jwuxj1ciykpdbl173zhql41e72npiez521k7z1c82upstvvyuvamyvbkmjgou4jq4s7wz1wor4g43ggxpbwa7ajz2cxqhds0syvr',
                name: '9zl35c8qcooo5szgn3c07omqdtwrr8996drtc3xzog83wlr4vtl7o9q72o5wk1rw8ipycv2u0ulqumcnpfhbojdf5zh6uopw1o9q1bf6xbw9hy4o2ndlj9jncvgk1tyq0p0wey6sd19eeiekqm9mx7w5wx09kg5o',
                flowHash: 'e1crov1j7zx47qvawpi38pozjn4i41wv7kcs1ig4',
                flowParty: '6jc7snk47n93skz3200ufk727d1cn0tfpvvpmbb387vy5nk67fvi2uoxytfct0etsxvmzh58emed6ocrjgbeae4tsazx4m2kxq82sx6gio1wr9ehatlemn711uc14n0gtiynzghj8wkarlhscr2021ypu16qs4wn',
                flowReceiverParty: 'duy4x0d3qup9mcvzjlo0ztzx1xm13btcfaj1m1hs7aj5pv23977wfnq8m4ibz9eqy2x9nue16gp0de24fahvyk7rgrfxyj3m18cmwrvp8w6hehqhaf5nd9e9nteu47e947l06i3fb5e33ld2zzl93dszi2gem1el',
                flowComponent: '2c7v7qm1wffgsn3rgme3vom3xwyk3v4zwt6zdldgl547hwjfihg1d3z4n2ml6lvnd2d2emn97n79ld74ubxa3mtfhubt4jr543fd9izfu92dsb51ddwli09e217c5uap2qbilt6irucj9ebetyl7koyyyu7gols6',
                flowReceiverComponent: 'd58nw2nrz644hlupak7z2ofqriq4jbf2i8sfrq6kgmkixmvhgw5op3vo3jurleikgyi27s4bxuvtin9pxwyzhr8pthu5cipmy4cnbs1iy2239snwu6otwrhq23fenohezshayhtrtbif1mna2y4j2uczkb8fzvk3',
                flowInterfaceName: 'vueivvmobwg0ampyejf7k333y0rrvzawfvgwmaazjl170ukvz21j2qb2978mjcef2v9gbn8n93e2uvfatesk95semb1nsskpz6bfwdmmlqj5e8k9uagg32f6b8u3rpzh7tthk1mkdgfwxrlht3kzsbv8ztmirx9s',
                flowInterfaceNamespace: 'tjb2bq370jj9wgfdfqz7fjq22aw8vexf0lk4d6nf59j0ohbjmtc0kzvys4133y5zojk5sm40nkullzx5pr35twcyar50izizf23baspg86ftuzfpl87eu023vj7p12g7svl4eyp757fcisxltqfd7eih4yt9bogu',
                version: 'hfwaloxvxjllcuk4jkvf',
                adapterType: 'e8ye1twgybqrqm1r4p3wku9sagn28qbfpkp3i7eo9no7d7vv344f07wk00tb',
                direction: 'SENDER',
                transportProtocol: '9qos51x811hlb0douxl7j3gnu9ls37w7n4g70dx0r40x58axkbxmi90iw8v7',
                messageProtocol: '85ecuiydcmxitdxzihmjssyun4qvq7xa20yqzsb1k2lzadw6nses1wz64tzk',
                adapterEngineName: '8vvsxmvwtbp6880mv2mtjkalabk8ky6fkr8zzunlxq3szojlaq7r7wt6a4kgeemik4l8kvp39p512ynf2hidbdxcqgsytmox84e3ux66sulbrq7ftgglo3rmpf2xfqdei48jrt0bkiq24iybxt0y5s8qd9c9h6f9',
                url: 'nfyzq6pd717hufwrzd6uwzpa4arlk7vez0yfykm538l5zt9wp9877vss4zoi54f646cgi7b2xvi0z2ax7gve0iwi6y019lu7bbbjuajrrlxzo78rpfukqqj7fecvp1ara7ix1uax4xn4avcel9fzdvdrvo94qzt7p4ntkftrei9qc4l29v312amxc08d9r7ir4klxpxt68mcbdx0wblj45t7qix7jph93q8tu3qjxh09ql7dojnxaforbizuxogb6duj8vba1mngeplsfvimdtabgbtmdyepe59ckz8fqose7yjz8pbulynp6fazgja8',
                username: 'd86q9th0zrdqt0jm1u6pv1m2lsq89xu4w6uziu29k5qe9hesykarq5p4fnan',
                remoteHost: 'qn26ua09fc96ylwkregtg9yj0ubc3mj8le02oi9bkxuvta9me1gxkv9k4ub8lkyep9s0qxmctm991xctt20o24x0qcwvpkrfztqmhfpxzjc6mz24ts1w68yxfaf7wm8bleejl5e6boe9ici2tqwu7d4hxsbet0k6',
                remotePort: 3350622517,
                directory: 'wibdxjxqt1n5ojcsqza4ludq6ojmq26ce3c86ex50zowhijt3helj4p9ztfrlynixskipa8vbcmpaeuc3bhsfh6dqebwf6yxb8h7op37x3rtkx0vbjmomx16j6c07afowwe9bhpqhl1goutws10lit9428p486gyvkiniv0lfqsfoyld1dpjv1nflbhc18v6r4aa0x8r1qy9oe9uczzt7x6my4zf1amqsi7tp8bli2ac26zwfl9vca4jj6f98oberaxf6nwy0xygefepeho50hp8phwsqeyn5k6vy97ybwot19hnllu4pn9aqgv0odxpaexhqgo0sjeoyp7voskphz7ojwx25obgoij6t1lk93mkqt6tsxs12fddf1m6tpebsm1blhhd8hpof86xpdgeqwi7qb9njr9nepcrwff1ukrowt01nkggf3migb66bbton7wvrsjd0zh60vzmhyj3z6z8kq5qr9puirv7bc0ta38ryw2ewpl39gtt9o8ebyz4bshyfl2jcm9vs320ja9435seqolv3a9qfbia44t6w8n97tnpmxmgo37r1gfzewnfbs52uiwkipfsrhq4ij7fgbhjtagmxr1ro9f3loyqklr4ut5pikdhi9rfllaijc7048no0j00odbvn8okggfb46vzq5suztnnh2scsdq7cetnqxppeyp9em45sssgcr8dlhwnxxpbtku6tg52rzph6ice6xb2pdyz9qtyi33exzqal2rsrddw8zndzyzq5z9s6a0qzqec0xg2oh5fk03xus7jtf7kxt622y0tadcxekbmwydpmxk1weskr8z42o7zay0ap11ijqdpbdo8cmy7mtopo98zp8eifkfm18l6g56ilbakhsst7v8kzr8zm4bwualod4b31gkc7puw614xlrlbmrf01vo6rligm7blora84g8ocr9yg8cnom9nkea3vtw3l9sl0sr2cv3gwhrrpznayxknonhhn7u75s64l91u3sbjr0zi06f43xny07dk',
                fileSchema: 'k6z4htuo6j2qsvn7ljg7l9h7tb2tty9d5c4wvqum8vms5gwnpm0z1kvfry21ndavcn5crqvcd0wd6zbt8cdukh8yiwmnjahyxazy334be9n8cr6a8t8pqu7igxp3wx1j04w8rx0a7t2bb8rloo16m6s5bjgz3ltwhjmvkz3xlipc6pvscujuhtyjy1howrzqv295j05pt748hqqthajeu0b22ttg0dyir29jwvp9hq2rfnl81ajkqqa11fcgk7mqnmfed9d6633xt6wryaw1xk40pgdhxdksh4v0yjgnvarabn034nunar9tc3m4g2v1cugl3dmrdd3n1vdvthbqqf8iynpriayqaff74tfnhystw4o21l6uexx345yioy7yc6hi1bo7i92v639mjpxnfugj5m7pkjbrocd4oam9kaq0zgvvei5acddrzy2vti58b57vmt7m2zzzy0lnt8p420ujnl3y9sz5guwso97ql92ea8psmmizfjuhbglcai9ojor76lajf9vbn99h6h2sc4gp22eyx255sj63ps13elfth0zvqhl57sobpkl1xv26cmzs412zkn0iw5q91gbfg2wrcgrckxr3bi6m6hetreb47p1yxpy7ejxp5crcln36obyufc8hcc0wunxnl7dh0pi3mfay7v5g3iushzov1sfseb370vzlkkfypgyv6cn7930amyogexnuie5hbf6olm9wzg4x49rucwjbx2kmsueyof8xib0tl497a9k1uvmzvo2oq9x510lr9eylr7dnyuyvb6asz8yxfwo6lej8x1lduik0wwns9db41twq34e9fxc2jivlqc718q5fivosx4x65wbgvzpja3pss5txcn94dsy7es6p84fswgiefp4km7x5mcasydetjgiux00i4xho9wfwydqw0tgvvp1hl1d2uzeljb7pe9cgo5fnnbnmgdtxzilq5qatwiou7dqx0wpqox0a9g05ofpekarhekiaowpzm0b8av4o2t2hxe76',
                proxyHost: 's9tebzm4hnlr2ff4vjzhaqcqkebjiu25aywhp9ry3357zb6a659phivevt66',
                proxyPort: 2377529635,
                destination: '6vmkixmw6nchc9eudzdxclpzw0gj39y8scopahjd9ad9k561m1e8p25aqnia1ktlvm3hgq3oxmpmkkrurxbx23tc4nf0bkr41y87i3nf4kq9qso05lj6c26x3pp8uqb8gv75s6dib8zmusp2y6p049btd8ts4ryo',
                adapterStatus: 'XXXX',
                softwareComponentName: 'b36s6armj9n5317fohmu21y5lfha3zm8bemdvt1962xoek7iba934c4q1uw4wo99nk7vd1mt33qd92pkly2oyhyq8fq353xlvawcnh002obu13laoo2tob0cvjigux9d08bbb7bmr4n99qyq6s86hfo3kxho0crj',
                responsibleUserAccountName: '3mwy8fv9wfbj4iq0hw92',
                lastChangeUserAccount: 'n4l3jpsbb6zavqlq88y6',
                lastChangedAt: '2020-10-13 17:25:05',
                riInterfaceName: 'ot9086b4a4k9y6az0zl0iq0rf09g2n2jvh23czeip8zy5wlkr4og913jnspxhlvv6p4w8ieghn9ryjo09sqa1q99ookczryfasq63cec22b6qdz4pio9w365vvqs6ykrfru2luol311p2bu7yvrcdghvil91z39l',
                riInterfaceNamespace: 'g8fqgjn8y9t3mblgnh8cjhmbxwsqkws9lxqan6pffqxbctxzv3jfcyyu31r3khb8r3qmdpo2h46dshv7k3i1a2e2q5b2sp6d0cnp64vzydhni7s2l2sdno5dkcveaj90fj1r31ynvxjvd3m0pohoiui14b00pvmg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'ry5tyio5huryzxql6qroaqu5cqz5vivd9ebg628u',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'aart5i5a2vq4rcoppilfkyu57i14vo5ns4iz6g82doqvmlpzbx',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'kf1hwb30akp65l6q1w45',
                party: '74z1u91vcr36btvubrzuhyt30pnzy392mqjuvrp9hqps1k3tg0p5h2bgtj2f4rp85znmmd94r1yd9asctncbyy00j6oj0ef9oplgpes6e7wf1eg6sec6kr84i9ujm4iizjuohkv0egws2ua7rdhi6uzivnpt6roo',
                component: 'x9ge9gbi9wxq4z79iiqojhejvpviugnduxy42gdf392bzmhy3u26sc068bv1r49673ysh7xga71orgrj5dwmqf6dpmihylg76ybzpnqyrxcfxjvg0ukfa38zzsv9q37wh6e7x748i26rya3balnuqxtjcdeir611',
                name: 'vdogdc39joyszknjd8l9flbc6mgqyssfvfkoqz3o4xhlnc2qfzv2x8waiaw2jvqpq14wc9nrivelwix8xmiwi0x20gg4ji5mh89dhw5xu9crfhh6qcjqf2hkep9le1yuoqb2hqgocu5pi3fe08bix6w1mmbc38ff',
                flowHash: 'j699r2sjh902lrev5tmj79y0yxel33sgd39q2o0f',
                flowParty: '4ki8gs8mvdy38hdkyquouaqd09wit70qrgn7gk0wj71r4laj2k9pqu41w1bnfmjk7rxl5yzcx47act8clann8rlwh6rp0ikc9dseuks8sfwroszdpo7xc2v033kwrce5riuqol76ur8g3khnrfo20o6g66n1eoin',
                flowReceiverParty: 'i0ozcovzfhd3whz6c5xrbht2r1g4w68nxsok0jsldcdf63hyoxmvfiw8dkc6w521g92b25erel3d68v9owevbcnbg27s7pfqcdize9f4r045l9pwg0dyrwuavik7vk7pgpzvu2dzr7tkv5r29fz47pcjacn0ui53',
                flowComponent: '0wxg79myip5vdumbmd0a2rb1xqydwqsnqryzh1agf4jvfhgtw66spxdxxti6mt32rd402mwl7lxu3dwwn9ieajjyp596b9hckywd5wce4q3hktjmovp91ind63ivrgg92okasw6g9v7qqiydcg2nazy8id1l4ba2',
                flowReceiverComponent: '10jxe9xcz4nbakirv4za40chl85hbgo6rvri5kp06l699yh33vdwueaff53u8h3a67iq927oyg1dawl7y3p1nmdyhjhtbt6ww33iu56ie1bnhpdj0g4863zudukgw6nh3orkmnmrk0k9sw002fo1dw02075zqnkc',
                flowInterfaceName: '3xs18cnmsggkj7iabvdq02so3w8o8f5lft88ok6okbgm0goi5ujfl0g7giv16t4qugbhcv03p5cdbei86sbb6vyf1hwsffxqd234w3ofwszne9nxjh252exkueybeir1v3qfze2kh3vuylqws0nktjntck31iubu',
                flowInterfaceNamespace: 'rjj94da2da8bywg2xdytk4yu8v6ekodxksgao4h3duv58zggrq6eveff5jpf3divc6g1ombzvf6u6pwvqn2i1thbtbww01z4gh9vk86kp7063ddcbrrtlcr67vguirevnobnotk2wyp39ydaoruhngbivsjyllbx',
                version: '6xwxkmx6phufiqb2ntze',
                adapterType: '2w9brvvlwh0h1c5fsdki5wnjvz186i567d3z5kimfj5xmw3glyhxwa361dwg',
                direction: 'RECEIVER',
                transportProtocol: 'qf28w9kirln47hjyqa8wsjgkpj9624asdggren4y7zt2kfgzo9w8mpw8jzpr',
                messageProtocol: 'nsb4naamnairtt6xptenlgw5ucdm22e5nu3reyldrw17f7byu92vkypmr6vg',
                adapterEngineName: 'lgx9xx3rgd1e7yi6pcibu9w70m2ht3xcse0efq6ja7epan2wxgx2hrdp052w5nq46j509e56q5rb7jdteffm0vt455qxn2aoz3e4k237qyie9gnoj2rypkujuv0le8h5vgi9k49705rfta5rkgutd0kqc57iw0pv',
                url: 'ybzwto3t74hzrshtaaqvv89878u2zs4p5lpu7lr1j3pwa8zhlc68tqctxmr61lpznypegebegshkmovpby5p9e4ofeygljblwftxg83bt7al8mx8eq3isqz5o6tjzsw8ty9q3hxos6p96z0qafkaj2m0t5v4y25ms92q1zu61k4021ejpe7fek3zg26gabcztieal0ivpkw8r6y0znog0fg90sk0yecjnwajme7ju0v0vem2y4i09c27xi8pbiuzvqtfbx73l3ejq5l3l0krm3eoig8ih0pr31hk3ao1tzlc69p1iik5ag4r0o2o9h50',
                username: '7axsj3gg5bjuqyjw9aiew111ps7y2toad6n6lth8fcxr03f7nbhp6qz9qlrq',
                remoteHost: 'cpd4ozrpja1uc1g9sqlyjh56ijdva47cjek06nv8c2gxiw1kyayhbt6mfva24eh0fknr6rb8u5cw4vej6fgvzpzpgqlmqzj11n0h5phzi3cbgs4iydvb46s5jju3uotvbzdhv6c7n533dommsv70oikoyevtvam8',
                remotePort: 3884154602,
                directory: 'kvylvrf55mfwrjavci7zypqcyx6s1pmm239buzdbyhiup5rt56loklbylaikpihmhzi3h1c4zzckkezbmb1cn2jipmko86ioe50gtql6f00zjsfi7hr8azchaca661evjbvvcd3942sp89f9g0hrurjzecrlexmzk91x7y1xad405y08viysxj5rcrfw1iha1a1lsrjenxxhj34xuax6980r4rwgmuou2o43tynbjicj1t8j983zaz5m8klkowzcmae5eus99r98gead2xm91fg7t910ina4tuu9bq2tp3bit24r54gklxe8ksss9kj6u1r0llzlhw55vv29k7nd84vbyc8e91t922n2jr5wuu09lv75i3vld0m67pqgt0d2i87c2vymfrsq39afrz4qg5asgiirctinnk0s96qgsh9hf0j7k1zb00puj7z16z4gx0kpgbivsjpiukuv5b6mc8gtxwur0veiypfsffaog43aa9z9432v51n4fqqynte4qarygafvxsgl7475mn156nku9kwzivnvewv750owic0zyhkdcognodvvbsd0tap3j3x9wyqf3b06spa791h59mfleay1lmqdiuidcuki51ibc3t486zbov8nvuafbe94ymx7666xd1k5qsuk67v4v8rvs2mocjn9s0lqziwtvuv8l42ddhfc2376jrygjc6z71x6oshfdnfi2qyauaahr0r967yvw9k2mu0q488h26lgws0mnvwzsfra2dgoej8q0qfmz7eqdkzasgjw7o36ix039qllpq1zw2j44qj0yodz7npfsazki0yhvu846ha6332hfwmisbu0iq1u0y5r2t1wkt3p0jv8f8cj5nf4b4bws2eb5kbs4ntjlm5qzbh7gbj7ttsbwksu65xmq8pwhz0669x0xo4y4rjsed2hd6uztloyaswwzqgmyopknvtsvupyr9s5sh0igw4ocgt2t0khgk6tfy5ead3nipd5ylz4qc276ziyme5r5obe61vc',
                fileSchema: 'ist1fzhe5ox4jhd8gbfthqd6da9hea478gdaql5sx5u2fbt46wetyh2d3oo0cegl5xqnx66ikbfhmj3h23cv5kfdswwmddgairl7farbv9b27c7ouii00v7tle1qc21ed93wlied77swcli9kmoxeui2v0be5zmg0nqpow5wx7hpnfin3ibslzutkokli09aafh0t9k5hks9uwfbwbh5iog72u5vgo3sheqvkoe77ac5meyhllo1nowzqatozi5ecj2mkt7k5p79o0itkluf9a7b2lt27l9l6o3rr5dcetohgjvfg86qrhiamlyu4w0fwzyhi3qi5a3evzu12aszelvsuy4fl2d07c1q9xpnw3s7pahlf6uwng4421qvpbuvozzvkgtst4y89pplldniu9g8ikl4jgjxvs07wkiok8x6kn7kkkhs5w2o1trvat6y6l6fegx82vzbtnunjqmdfy7nmfwlbtyd5wzo2pv8q1go3y6aq7wj889lsnxf94x9ohkxzc1lvjmomt7dj69b6855wiwrkv9ix1jqnrwj0ywdf9mlp34zx0bg0m55w4fls62o2t07wz4ul4sn4x5a3b6ly4ueq3bna3fjt7uwgwyry7cever85ussi66bnvqnm8dgrj8ecb2srisj42k1n8snutnzr964c9gm2r4n5pxwagrotsx5sghc4nk98435wr1rqj2u3mdfqi6hcmy517v0lpf3a9zcj8b55rwl1m5dfvs4sxqf3w6xowp0h6zppa81u0fnhgxujsmg623czpg248ojb36jibong8vsmizhr2i9z7uxmwsry0lite8l4ccwqbq4rnnibym8821k0e6qhbtt2es1wbsmi68v7k55cglsi1rpn8pq6xqn55h80skb1sn1dh4u191bxx5odvyfy9bfu3fi0mv2vvarzrylx1m8vpqa5qaq758w55vf9wvfwe6j7wjom4d3m74c0668idwkebs2q3z1fv4jtw77ei6ewh8vqdjm0z8fjytp',
                proxyHost: '06y6r7njoennl1eshyrnxvpap8v0viazcfnx1pjcniyr75ca3ilplpdu4lcd',
                proxyPort: 7222535902,
                destination: 'lcezmdopj43jyucggpe1i2qgc3g13ef8pid9clpy7qeext2tmxe4rxe619iwxdyay4p4ax6uu9bx0kw5nnfseuzndwccwkrsv3sau2hk7btpfvsfm62t5av8bgqv8vdseh6ngdmgx1x6uq3jlbtnoeux0ex9bbk8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qa2i3t2enerjxiuvykvhcx1xmto21rhpiukpj987a1yupb3ag6emuzcdz2047iaf3mq5cfix1jdkwdnjjaozne18r82tn4yyfr6g2dmcq983mjlvqzaww83d9wvrbc0pe3crewztl85ukoxsyjhwu0jpuhhlpsg2',
                responsibleUserAccountName: '25nx6oqw2igqrv7yeo1e',
                lastChangeUserAccount: '1pwpp93u3sle9e6qqsps',
                lastChangedAt: 'XXXXXXXX',
                riInterfaceName: 'xceacdcqmbh5xgg7d6fc89x6et8grr20wd9oz83uojqlcoa9a98avy38m7bogjdqu1l3e9kil0hi9vblds2bj2ln4g9kk2f4fo3j3qvod3fd9e2lqfv73olkmatoc1dx56aohx92elp9zbax8111g8m8ndflp5qk',
                riInterfaceNamespace: 'kq4rezkx5ev22b8ix954kyeou2mucpl176rj05hb2tbhre12mcnsi14znquq077nnf5xk1tjsqwavzsd9rhntrobngwo8biovzkppg0niow1k7da17xb6c84ci1ooqpmg68xomllj7wx5hvxd0bpvyd9lrgi4ewl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'xfm72my1061e6r3ew86r6fw3v166khbyqxlwoj49',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'i6vg1zk0ughflvn7i2vccg45ev9mminqq3l9m7t1p7apxsmngf',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: '2bsvw5hix2vj9wfau5nt',
                party: 'hw4cl35gafsl9f518a9g40j3as9z7ppnp0e8rq9m9m25yjy0bpgtgzoi5thdkv3l92al9rsho0myhsdn1n2kehs8jvbixpdf3o5xgn3aht7g3z8vpw5mwdudn3y7y84b50u9n2e0dqhk1fokhcvrjfzamlylzi8m',
                component: 'pcu7dt4p7jg91m0bssqg684wgp4dyfycz8h0ebnmla6pbvupcfa4ufo6d0novyroo7095ihf25ufiygjmhg2vzqye7qzvqq2g3pi408q86nnudnodiqpi5332kc389jf6tfuut54nwxfh2pqyw4twcj8qjz0ws4q',
                name: 'dwjq46iqlldhicun2zni3vabbwyl7m2ksch3hvpp4zsa3aaf0950w5vasucx1wbqmgjh2wuaasuztagfm4rsytuc6uatwyuz33o23p7eq3lvl4ml6wzn27burv7dpmt8akmii61ua7z0mv5c2cm67xrxachdkaa9',
                flowHash: 'fv7hjbf40073yhwhlmlaggaqxww49yrgg0hc199u',
                flowParty: 'd436evdcd83r8u99v4d8lxw4oz3chikdnfod04bgvv3467xh8k5drxbclbimn1220gnnwr1w6n46obq762781lytb5gfkfsius2o48fm1dehnkq7ubr7tcq4xnyexeyxvso5yg3n58g9gkl5dr6ktv0oiy1kuvgt',
                flowReceiverParty: 'vpqmxxq2xq4s43ak5bv9y2sb1lwlv9ahjfhxm3pq0olv0ygxejj44erp9qwuevw04c3ms423617y4sa5zq7xijszkj2q5gxbsgyujqkl2tue25sqwnviv81pwjqp8zfe0tjnsmlzmezhlx4qd6c8zsqzbykb1w6k',
                flowComponent: 'bzsaqpu7xusjagritefa6m7u0an55wx5bu8mlvszzit06a8l7wn8q2pvo9otqeamkcv7wvrsh6zilrwm2sck3anbsbk11p39kb9vim7bqxgfwiv1dfei7343on0od083wdpcvnf3giwzaovgahv7wfnlrcifsdgo',
                flowReceiverComponent: 's4ioe7cf7z7dgf6hkicc32kz4lgpbtmk3vbvev3vxerrfmitvgey4n72knl5bsvsm090ktxp666rr9hn6g3xgsczj5e6atf00jaupfmdj9e8a9nzi4qfoq0noj0tsrkur9qmfmlybjubssj6o6fjtyhtj9p8aepw',
                flowInterfaceName: 'y9h4rwqd07h70jmcpq6lix5pt6260xbe5dltsr4hag0i5sig6vymb0kisf1aiikpmto1twwkzzgmxpn7q0ontp4e0g0za0oijuxek8505amnyz20lehbu53kb40v8868eau5qb6hnphj4x35nyfpshhvz1b0hoko',
                flowInterfaceNamespace: '9v5yxbrai7vja7wjkn2kj5d3n0ff3n5r88hz6z7g9evnhvcf6hg4edx0lmr22xi1ylrmgcxswx0vqapin2cg6b8dosztzxmo4s1pzippl0zo2zmrz0y8ic6mwbivircwe35bz9b3m4dukwzxkbpfjpagh632nqgd',
                version: 'fplxvv9py5b460q0epcb',
                adapterType: 'ybgjqdi4tefa4wfpxf5mu0up3x4ciw140t8vciz7kk0c2yt5qxalrz1t1528',
                direction: 'RECEIVER',
                transportProtocol: 'y40szx91g0tpyen1qksthlze9sxre5f23m0efgw9uraqd1bnhlnp14jms21d',
                messageProtocol: 'tv6dvm0tls8zoglmw0tiwpoi4iqvbj62h5us54sn2xhqhtsnah4tkdnyp58i',
                adapterEngineName: 'r1jxejx4umjeqd6iyetgxn9uhauazuz8jzzc4tfu2bc2niq4z6148iefzf11sbmnaguhchmnp302kcuoh87wy1p064bsyx48dlpcquyo0oh9j1h7r6i7m0fqng2mbyhdlrup2pvldlhd3njsqso2kpylx363yzwv',
                url: 'nj83jmg3a1s95ixrnyeubzzcs2akuzyg7ttkvhvn7fcb7vtugyxdb0dbknpxplxom78vyuzspp6zda381w1th7fje6kd8c1igc57kkrlhvglniehc9dtffui4zwfqyutx6m4x7i5jl559c0ar0ozabqul0j94f6b6h4hjzmhxik19nszt76qg2k2scvcsic6fufo9fddika34ssluzt7qqloo004a0xlbvt6tefjit52e5jnmhs0djrvmfiziecatypo3h5920uu7a9ljb122jm9kklf1rc4uy0yedwc234y5rjfc32htbg0g07qan0l',
                username: 'ksys3yjg6uwbzfzuyzucfc50j650ql123g3ba2p6ftjfb9luxfckogtddmzf',
                remoteHost: 'eyb6zs31bdvrzbk9epwhh3aadwo1vcmxa5xegf9p42kw8x6cjglr07riwtm4l3t58smsn095v3wq20u37dftiaf7p7gdoycbj0552v6xuzmotthv9jfj3osjt9nx3pviompr3m6ozwsqerypfoqjn7ldiu4ygsph',
                remotePort: 9103914574,
                directory: 'nrf26gtash83mmfpbahhj03r1p0q9zxewnqxaury4zr826sioev25b5yy65zuppkmdqpzy44qe6e2tnpl2eio2pbjohiundwo5ho3htmy9o8tfzy3k05xfj09v82w83e6yuw0jk4eo9qvuz97b7rm3e7gpb5b1xzhom58ztghlo8fnvhbcl492da2c3qfi1rjhdrifjquj0nvxsci7nhxd82i4camojh2v1exu06b0tr1tn8nv94wqut0z5xbxmrn9tkse811n601zuinmcoo2b31h5f6uowzjsd03zuo8xj8jzhio8ua3ddvtklop6aiher2r6uy86lvhxz4y2ladgfajnro7phxo9h8ebm84c1zu98m0llz1wj7ocif4qau3mrogoxes4uquk92bclztfcjhmg33npjgry4j67ymkyu03aywjpds1wpkte6scyto5sf295lspvm15c7qr15y1bxn5c66p8r8ark1chbzy1ctmzxzkqt3esx9u01ys75kq6ke69mae611s244tu0nlrzr3rol58ze92edarg6h9ga3bba8pm4571xqck02mpbplb3cwqzx6fnfmid4uaz9dbr5y90rkmhyr87t4wemcl8zz7kojfv24oa31h6rdqbxx9tx1u1q35p94hy96w444ewu9bkk7cu8reh6o1io8g7xrn7zze284kprputzlb7rttn6klnbubbsjdgbj49dlnz063di1z3ryrffhldufsb510s4z8vq6wbpmytr1ip3z2w2fmgvsz1gcrnr46zym61q3qg5bl59juob58f0n64p2khqgia03n4itu9e8kykl78fvybogkhx6uljii9j0u4wq04xmj54ij8jy24hlrvii7c0nlqsznm09nicchtsadggb3j2thwogp9bvv0iu9jfszq9nhfu2evoefil3lgyfsh68ph61iaws0e4scpz029fj0ktlg128tncr3hg8vz4thoatpmhtccbvscdnhdz0vqjess9u9981luui',
                fileSchema: '1gep9ybb4b43wbm8xl0qr9ru5bpx83fb2npuvozncn595d9e9b0pumdu7srbolqii3kkqwq2kggjcen1dz3xb8vpzy7jtqip2k8sjsupplgr69zgocq4c8gk2c1bt3jjjx9hlp8zbztovoxrlwsbngqce8ycn7u76epbf97y5vgpmqpx27b5rnvoie34hnfl9irjudy3rwfrlhzvb1lik5v7jvqsa5q1mhbmtewjc4nux30b9ynbmxinmqs8cfmv7oiww7uddtmm0fy0awy61stgezirik6t3biq4gi9hv9g3xocd4d6l4dciajyghycfqgexgmfk6y2xslt1xafwfl9ybhktko2dcm35ej0bnc5at45tvrk40xa4pmecfrfgphlab30pm5w5q72kng59hg52fn7pshhv3ipdg2c03nd5bjpdamfmjnx251a7h44543v7jbti8mhxt1nklqd7ubpmlib37x6nh9zh54rp2ijovk97hvev8595cg0xv8f514dthj8w3v9ycp0bty9cgae45rteode3lkkhwiha4rpwmaaa8b1ckon3lsx0r7gbhvutra5mc6g4oh7603kxp2vz8uqeg2bk9lw7czwfaikg6h6r40s2pf72rqc9d49j8740305p4kb03l181o5cu0gbpk3gek3kthl6kpka9w3ltago01ij998tflvlelgj2qzlt2mxm0xfydgg1tntmp8gl3j2k5nqr9oy7683ly02wmulh9rm0u8m4ze97rxnvyqet3q1k6zk0bdm68ibvsaknn1rp1mxt6za70yja2wwhvdj7gpjbnv2rmyaduptqgt7strylazqball13vfq79x2rp427ynyk4xsdp34kyml474hifnvudujwneruh730knkehj1oxf5dsad98difspdd67j8y75f27gm7pei3j7l1uwbd82huzbgd6i9qme5hhbqqnm7nthcedw78zftkg2qg4g0fk65kfk1w87ozqb53f3x197sqwldu4wa9',
                proxyHost: 's3rdwo4couha3h1cx6u5e9kztkfb9ptsjtthvsqpp9u7wqf2q7oxpit8oes5',
                proxyPort: 1253455879,
                destination: '953oxtwtlzh4xlfqlg89wgqwsph0zjrz4msdbfz3kux7vtkbdpmted2byxibjpo74za8pbr2x113zyoivbdbjmxbmvb18pkv7ei27s0miafervdb992ddgblxb0cnf2pqxlz6jene2vvqgy6gavsfrg8umry9efk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'g6e9w0n744zmy0jrlxj25flfd3lju86wry14uaz9uw76nodzpucqo9djvf83u7kk01ddwhxgqm5rbdyom8pgtxnoli6w0217yrg8pnf7qtywmx4zfgek7s5nwiihfxku12dkfwqqvl0y15z72izmgtxxbxeu6uar',
                responsibleUserAccountName: '4fnhvk24ne3tlz5ykoij',
                lastChangeUserAccount: '4ao4ckmzs4qjmp4l7jv2',
                lastChangedAt: '2020-10-13 10:30:03',
                riInterfaceName: '4yehf94a9jdlz8ld2zyv6yclpnb7n59cdhufnilhcpo07p969u2di27m0pqcucmj5uounave573y67zcvqu26g07nu7u9qci0t82v1ki8ctt5tx02vwir05o5krfmg2otugipgkahs060ov3t6plq4xam1epk155',
                riInterfaceNamespace: 'cmfj3gyi4f0zh5lxumdw202ilwuwrldczlzd30f10b2yj266jmevn3qyct6cimfnobz2ki0v85g27c3ejcp2kzh38jr5c10tvere2n3km1th6swkjex2u73o5bpwy7kf1bgjeh71jfmrfhip2wg4if0jl5el3dhx',
            })
            .expect(201);
    });

    test(`/REST:GET cci/channels/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels/paginate')
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

    test(`/REST:GET cci/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '5218bd4c-71dd-49f6-9284-bd130a81be00'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea'));
    });

    test(`/REST:GET cci/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel/eb7db66d-4995-45ba-b475-26d722ef7c86')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel/bfe1231d-0208-4a1c-a449-fbca0ddc58ea')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea'));
    });

    test(`/REST:GET cci/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '75efc24d-ab77-4bc0-8df4-bc3bc95036cf',
                hash: '5kkwojsb6cx2jsoaq00a4ni5gnw71s92uwovaqul',
                tenantId: '6f40ddf9-b19b-4fae-a6ce-425726a0899a',
                tenantCode: '5xe9nvjc01dudo6jmyxulfibhr9l4hkfoh72x51gde2vei4mtj',
                systemId: 'c6880a67-7e8a-44f3-bfa4-58d528de5bc9',
                systemName: '5bdmloeu9snlez7q5qhj',
                party: 'gu2cusush8j86rf92bafvcmunt73mbydatly5psdejncugmhuu32nmmx2zb39dzhztmor8e53fhzpe5l8r0074geobsbrrphd18l1j343deoyupsv6l8xsc1ll7h6z0kjnw5lw1clw6h9lbm9hzzrbmx6mg7zs6n',
                component: 'mpgr5r275se5nfjbly0our6zr0z3ere1vw7a6q20f5clj9p14mgttav3ml9cx07qyowgg9db51tblkdxzpdzx9817rjpc331fdhu6z6pkwa43veul7o1livk77maycnge4tt21blntwcysnrx472uc1scrgv12lv',
                name: 'vamkuq7yeavs42wj9xjrfcvzksxkriucdsosn80646xbp6gfbnhgbgubzjm0qtqa6t3frxqq6d00fzxuo0qo92ys1s7kze5l4ur53xvm8xqwpkehdp5w41zyrx31iirl46sfu2jcamf0fs24hznhvu7pg0szdqrr',
                flowHash: 'eelmh5p1yrhogwekhqnt6zusf0szp4gmb3tvuno9',
                flowParty: 'cafw2lbemebizxcdw96yn5zkrruybm09jcx21yl7c4u7nw3470g7saodwjvpq9ftxleekjxvcwrvy4bnvmgvft7lq0hh68pcbwth170vhxkpvmu2k3h21jubcvrgts0nzvk7a0qvkv32hni8eh7tlezef8mekc6i',
                flowReceiverParty: '6450nytqxeyfdxdrxs30qbd4ocduysm4arqtj4dyhzn3tclfdqyynci5l3yke8aoxt447zbcp7dpmlq453ub0he71bq4ejj7k2r4c43ka2qskmrxj8mgfi2qnhmq2ynmf2qrp6p5r17ora3ch9s273u63nl5u79q',
                flowComponent: 'a37d6qvh86gpqtxdo5v51whp5723zw2ql6ophvbw83kufwdr6m0m8z5qzrmhdnjxyyi95fff5n8dfua0dkuigymogxijdmnyl9bv9poie4g90ppcwy8tsn2m1qq27f7pl2zcjj3btkyy4qooas0ffb2n1z47x5t3',
                flowReceiverComponent: 'pslbr5dk8ocqz1ajpdygmd23rtdyw5e67nof90qmpyzl6a26a3inj5vptfxe440wtz0mgavy4hoeoahgvgzewagnvy05md6fq9hoop6r290kxlhizavnf9rmdk2aj3978sude15tniq2406s6wg9mo179ee4q3o4',
                flowInterfaceName: '7dcuu6c2s7e404bjknrdo90tmvmyccenhbyl6so6kpattqy34o3ufcvx6hocyd7dtnkv2a6oh41rhwccetvlkqgeaw1cknkff2b6f5rrks6yfv4r60ahk8vgbfnqfi2zilomy8s4tspfcmzt0060dspy25dozqp4',
                flowInterfaceNamespace: 'ejbgcb5fgdg3onh8ujvdxu5xnrtzho6r51o0we4i7agsf3nq7ovr67i17obtnjyi4dy9a57kp58kc32waj44zwoatck96q9w1zh8916tuysrhuhnc515km4di8x2lvyv4fbsq1ybnkitcfcdcs2je6xu6xmznne9',
                version: 'ojiuz1xesjym6cycj3kn',
                adapterType: 'kdzwaijly0yww1hmhu3crp4wr3p4927sp3a1omy3wg6hrien2j88cmwgmtbv',
                direction: 'RECEIVER',
                transportProtocol: 'wzv1subix04pqhrqikk01od65j7xxv827qf9rt3hcynnun89yip58x5i9xlf',
                messageProtocol: 'zgfe8f8s4x50fn8n18ux9683b1l7xgqcdxynwecpsdeqy2uxqlijktt1bv2h',
                adapterEngineName: '7b81kkz5sjbauhq3jwectsmhc4tblkucod96d5yhbt8vcuyhqjevvnh1pmx23z8ekcqq4z7fciwqzegdnjkt4gllcq8i36cigeql3fmaxtuhhlqnttltvhamfdkerygu9b8ptorgdp9zfaldzbfg2i7o60aoibmv',
                url: '00nipr6hqg64uqpnyb41game0wxfnk58exe6nejwlvbr5vvzshoi8786c1a9ixxp1uzwqluwjuhbhg41vxxzi5rd6z5ln1qu1cm6in1e2umq2itt8czkcnwdjqhuais8op54y5e4ype3d48g5r8hxlukzj48zg1wgyayjf71cjypcqg8jfykdwjvzhxlc6kdccx7qp8zk0q9sy8a8z53q7g963sheibukttfte9abrajazphpkt8a0nz6ih67vq85gq6jvkx10plqq32lz1tapry0eg318zraozqfdrafgh5q9yrx53vaqsh1t3a33px',
                username: 'ew3shtgxnyvuywhnc99e0gou1f95kqrt4thbg9ow3pfj86bmy5nzf9h7avwy',
                remoteHost: 'p8unax8nthwjwrloutfz7f6yoqpvd8qxr5mzz4lkjrrt3waxdr12s6qk46jlien61x8odcjo2eakli3dn4eh84g74rstmmjez5el2ie6yqrgxy5tyjakzfrw1mlkn6mewud4cz4a7v02rycdyznva0y86kzp3f1h',
                remotePort: 6439548875,
                directory: 'cnjgj4otoyayyffc3i6idrjizjtyofbqctiqzhgwvbia8i55eeqilh0yjza4jfnyr2unxqar6b3i5otx5pjs8u903yvf3n0iel23ksuxm8nf9e9cy02i39y8gvkjtryhwuibpz9vf40q2uuer22b6mzx66pnwzuodtxtmaq64sf3ps5etg6sp4ux3emz2rbgmkt86469ucnbnzxu6v3oowz1e3tro0svagdgy6sv3mwsjpt3v5l1r9188gfp9h0u6gu2ag7q405g0yf1rnedn4pxml5t2rw3fs4q8695yubxtlbyzq0aj0lpqj3lgeowibh3tlrwf28qiameztu39aadkgesuz2d7t4azqkhmcrmsvhf3z02x2l0omupcww1pj8tzx5nmrh7bvmneptw6n31w33yv387vzu7s19sjhi2gqmhlgzd6bqy5lqzhhm5lm1wmk3lc3q5hewebptf74y2cup40gnoakytxt4kgkq8zxxybl62f8fni0xo9cv1z5n0askgp710rcc70hlg7vzjthqk61kinmcfjbf8rvfxe97ichqnlc5g6pl1z37388iozuyyjuf9ome4qsgdfxhaef0a7uidrcvdxpx3nawc3z6zqpd6rxbwcwjrv9zbnoz7301ybsgueno3h90ogntgewiirnwl46m39y05wlhibmwzxioe2jbojcce7wprihtf2xw3ygniix6e7klwyq2kzztcs1kqy5rf3adt1wdb38ak2o2n8k7c6ku3yctvtdwej7u5vbfpqn8wlw5yvi1yr91noktbb22hfpf2jmdp63ljq5p4o2800cyeltulgyzlwjlx1pijrwpdakgnf56pmwxclu295qvpwj63z247ghqpimo6lbrdh8enczlo9ji5v7w33xdc9a0y0b9v7a7wcl7wi9jlxqjs0u99uik8ahnjj3b8ee4eez6xv5eq0j0lmm0mryjhgz1y9d9k8oisjfojbtnyrn25gr1249v53j25svznyt9geg9m6kk6',
                fileSchema: 'i1tgskhlql8b0vw3yctaatqvgenoxhjgbxg2jfpxa2lzfhno4wlq71wquxnh369w9veb30v81q8zkr9l69of83zjuv3ct94ehyr5mz8m7vdbumos5c8ce9v1pc8li779afd4e5rk8wdpql45k7m6n6zg2qgg7dmf8713fmn8nuzvwaq15wmwjc4j5nk9m7v9e66pnegmi4s6c0v5csyhf3a8rffxum4i3h5eagh4yhnudzqst5icw5h4qrb0agcl4bcjafi2oub0gpb7r56fmi97y2mi609xg5lj4re9ojivx7ss12aiucii0tip3ji2uhwp0f4yp9m6ritwg6uc0ev9dc8vakt70dp69d9xsu573nadzpj1uy1jo106jj04udtgjx0vnqdki0stfr6ab59cho0k844m6z7l7bbl7bkimehbqruyq0cxwbk0dkhdqforqziku42i30sqj8ehvzswcz6uhi5n0mboo5w7zoqggh6nbvrnphyxkztg2o9q9vvo17cvgwqftc9lefvkk98o1sn54cmv1ahvq4nnll3cgxrt17b44ixawnk0xr4lyk0ni6gd1nam9t8a4gvfmmo4ocv05dpbjrwfg0umv5x08rw5y2wo9dpfmrhw9c4noweffwh8hb75hov5z7vrvl29ug5z13dx9piis73o4k1a080pr47o583q91rsrek5sa2a4800vbr5aly0jzyry7vxtqa2dcyz7wurzi2uag8atr9rwkuvxwlh03q2npq4jxfv4448uu4ns3mrn8grj0yo60fnkg5tm32p4566gfmwyle4h4c4d68i9kcirn6p0vstsuwckp3fq6sbg1tsoi50796mk844tfhujakjazotx0yurz72q2bl23sk8gz7mjhzikpwnsr0pc3q78y0c1jn926j8m6gvl99tg5lt5y9j9wv7qjwsc7ev0rrf9xt4rzb0j27ua63zeo6vvd0bbvbtep4thn2kdvhtw2rp19r19ga255w73mmfjk03u5p',
                proxyHost: 'lltu63ytaz2zc7tdlxvcez8yahjej6x5xly6shb6u9pi32ji7ohq79bmpuuq',
                proxyPort: 6787573321,
                destination: '8iu58zvky77x7c0vzh7wt54mbu0h9rlmyz39fox46xd72eksk2eajfa3qc9wa184vdalxrec9rplknrmzp1b6s4fig9bbftcshv0hsggfu4fu8p8r8t9jc1vvb1jtj36cwh7lwnyff0smhy3ydoizzto9o138b0q',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4q3lz8ycla7tzj5a9uxxk5q5uk90udkv58i55x0tczxj0140rxgpirzhk7kz3bm6yvjr5j69v511zfexvpgnp70nv348c5zymw7ctykf1en1aej69jsspstgl0yddh9dpwns0l2p4ep0t6q7rmpj5jdwxs9401rl',
                responsibleUserAccountName: 'wpuugkn8neb7acbifuhm',
                lastChangeUserAccount: 'stkm19wwuleq7dz2v77d',
                lastChangedAt: '2020-10-13 03:20:32',
                riInterfaceName: '3kw8p80egad4d1yvmk7px61szf5otb3p6id5ylmq97d74hrkw5rcidvq0kokkbjaljl2bwv9504a7lrkh50mros7psuga5djwkj3dj2k3x3bnx5vpfmu48w3a3nla0f1b3klktsg9chp9269owlj6j5e64jgq88h',
                riInterfaceNamespace: 'hlrqtpk0n7ng2nb6bxbu1r1e47k5he8oq0yktjupb6d5ynqffjj8j7vuf5c9667qhpgujdsm0d2wvg5gyse8gbgimxmmz37sohm4sdy3k84a05xpz85lw4q12xrxvq01tlscqnuk7n4t0wftzcy4u668swbdhg1j',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                hash: 'xs4vkgsspovlf92r2h69502dzdkfsbup5nw0lacr',
                tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                tenantCode: 'm7647h3bi9ljn8g99kkp161ry8f782ygw9dopz7zw8aymtabl4',
                systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                systemName: 'axelxdu3q7b39nepcu81',
                party: 'yxw0nlk3qcw56b906qkkkeacdjzbux0d19q9sxdjwh3yrx8wutvgheis7mg05hzpj3m31898dm9ychqryjqi0pa62sqvh9mtm73zfe8awfb871q1o8vkk3e639tmbzf6dfk2iqx4jz28gwmlaqxxu7apwb24jaub',
                component: 't4p7t4h3d3kehbtoq956z7cg0jj4zy8aia06fwq8ntcg233dw8apv5wykn0ozf4wkjdkunpdkatv269s1vgq42dhq9qbn6hl6tg4q40exdwmwi0prew95xho5a0xhqteboyz3aznb0urssdlv6tppxrarexu3r5k',
                name: 'jzfzj5rwlxoz2jfx8ejj32fua4vo3fq2sqz7dm6klh0ce3q80u45l3rjv5pd9ylcu6ee1sa4kk5mdupgnhbfpxggenngaepz8xgxu5azyza00znzo5e0om8b0inv4c0r3u4pmb3ieqvnrsjl6w1w6x3s4jd8jw5r',
                flowHash: '6spjbusaq5b9oslw7odvaohvaywcce3hfvb9tvi0',
                flowParty: '6ug00575ovrl7q43756zdfsly9zwg8hl1n1h8em6kczezsxxsdf7unkirnvxfpkltw1ozcm6ecwojtr3t6cszv4bum1ln43b13x8xjp777z7sui4ozfdhn5zadzw6bgv9n5swnmvy9iyaij8cbqd8vpltn8glg4r',
                flowReceiverParty: '9b4fpq4qc4ym7pnz4idgt0jbmn3d02alc47tfyeb3ooc9wyevx63zxvgeq4ep1pe2t5ygsu0j9ldne37luwowa6rlxzbmwnlz7xho6mf78p1k558wfg5jazv5s7ust4hslbcu61rcqidheq2q43ngozy9dsgijkc',
                flowComponent: '4i3tk28lqvyahi3hcg3lh7r0oadbwa7qf0ef75ydfxym1wdxc07ffzonzy9b5tjt1hx8dlixpcgmptgd8ylxq0vnq7nbo8cwezolhxtz7dkj83n9mhmlekinqh0mcqwk35nyqslzqrbqnrptudsx6an660e0fx3f',
                flowReceiverComponent: '8i51jt50ja5l106l737pbv44sxsakrand9npuyzdxlkay1qyd6894er6jpaw7ha0uwg4c0wrwsvbyevi2qkge4kxsk8gcatrq892ak4al5u5xyd9fr9jpsm6n4qtrsjjw7enm0mo2ydb0gv4radyj1asvc35jwxv',
                flowInterfaceName: 'x2dm9uun0dqx3caism91gzm2grfgvvwrtf53l4p4lc253kgt5qf9a8y9wyv2fzp7t143ynkliircsbbhod44fg5dv3i1doy64ryxpw3l6ajn7bz9d2tq88141xl9x42d7h1pxqjwyiae9j1sl6drmiey0fo6v8ep',
                flowInterfaceNamespace: 'n3i8gormm6cstht5v9fueisx5obz3ippnfxm2maw8fislveh19hnqguxqlzvo8eceguywa8e17dqypxzuhogflrgv0a0teh7dztxo7fomiyu5osnlfqchwxi7i9khvx36v85byynij9ks6hvc0lcv18b9wjyve7i',
                version: 'cmbeoofjnlumafofuzsb',
                adapterType: 'quoddtqu6y36knm3diffpkky3mvcqk90maej3acwvjhrucbxfbwna70gbhgc',
                direction: 'SENDER',
                transportProtocol: 'lqs4m42vwtsl8w9x1du8twyceupdm8itb072k8vp9ez6momdzr845fz4gw9e',
                messageProtocol: '3gu11gmx2kh9jkifmkczx41nmctwnundpfdl5uta5ktabwicru804itscu2k',
                adapterEngineName: 'wdpfy3f279f4qn07x0ulvpfxgl0fss4r03clg8dis8hciaobqef9prye2y4swtrzmybngrb96co7q1s36trctg10cnvktn7zhcsna3vcbrm24tdtjxvq5l78ajinqb2ef01kbmbujcqij2tboz62d3emey62cu6q',
                url: 'zmxad073gyg4aumuxmomxrj86cjs6nop48p9ktv6kwzcjpkqrmuoq8a4hvfelgctarv67ygavdk0qctvue9qijs7xny7fef9hsudti6ierudwnliieyc955dzevpvsfaefm13wrfe7q2hl6akje1p7wzqnf59olac692p9d8b8d4slfe6yt9bgde0dvav6zxekrclpn4n2lir47mcbbr7rk65jwfmiuxzyrzs703sg7eikx1ptjrgvp6qzd4vhk505y4kb47nh92zztirlddqnfpbagcyvz669u0nw804hahyqvto76uihazg091ma8v',
                username: 'amcngz8si2xcuhtcpqivrxw6th3r1naqadm5xdo3rjzu82k9ozl2vg2rwlqf',
                remoteHost: '8lgwdhlcjhvc4vxpe7zgss34fpysgzz43tfeti00wjwe10ikugkuyhdy2gaj1pqfjjagyp4s5li95c68xjt2tvsp0rpv5ojaix1z2w5wciw8b4fn795m6dbxj5bss846f9ue238zw633pl4a7ju56z2awjjgfdts',
                remotePort: 2478476564,
                directory: 'sbdnsuhfjjx5mql15t75qd7db72ullh71iyesccm33rz6po4p9736i93nnq2ky7tc7v6ezmt5glunfw52n4ma5smo9xv1l7aro7ny1d2rqmyrg1pl12eqiliuj4vanuuteuiyuxwsjvcs810nuik8p4ndq74b0fxnywgguejcfp7ee9bin2f7c54p16vwiy3g3k9zgxthatxlqmjogp3cszdnnbtioerrur289xrh6zh8cjjpc0e59io56yd1l4dfj7zjnbbpnh9jpvftkz4qbp9d6zhfelau1n3s7ik1jz60cjr3z7suk4es74o3zzq5tu8exzambjtxv1nfgabfujxe2761qd4hymmpj5xqh2675okhjn3zagbneuwq0seeniv8m1zc757qpeb0nf5hguh9mww8fdhcpomp91vv7qansmm3lk4fe8h1xml577sk5858wkhbhoefoghxyqzys15dq6egda0freibohkosgw41ymakzbtaar1ny8yl1osfsizr5ft9tg6sky029g83l1a2gsyyl9h42ern8m8zbra6rnwma3pm69yc6dan3w132itkr5ge4qk5k3qz07bmu4cv3rk3ptakb88y3gsjqgyfxlufvoqpzx1ydfv1ju6astl1a3cii9n03w11e4od7jh1695j78gvfty73162aqzqeb13c9y7j9dpcmidj4tgp6e6rp1f7145h4tkui7oq4hwto4hlb872q1ibgou0wf3fwwwhe5m8m0p4gxcvbzj75iz3c9tn0eu2knj9yexch3iec5hc7ohcxywqckoym47w4fk2uxb28xhmbatqaiemxxzj6dx55a5h3k0zj02vdmjavw2zpy6pldh74ye2y1azs4naqq5j3lrl80sr2hozdbn7ll7fy9xw20i31ht6e95t4ngmfk4vvfkltfo1597r9yvj9pmd4sjukueol27igwtucb1ddmgzegzdmuvuqrmesj8pa6g9e1bjxqcnkc0nr3zm4mjwbnkbe0kcx',
                fileSchema: 'pavjfu57zvyup62uo65nf2uj7qdv8hrw9i21h5ick0vrtmha136djxgxivr5uzeyt0le20m50te7oxe4htv5midtupclysyyze0s003wwkl84z9cwpoc1l1zjr7mbzomrofbhtqgwb6r940zzkc46xlphi5jvv1ll2lukpqrthd915fgqdy0pla523s891kmgjzsjcut1izek92m0sv1lgbutezksvccu4ql9p3xho4qkc5vmdii1vcocmr2fws6lsn2700uo13zfu875367vsg3oop0cesjgb2rgk1y6c5go3px19bzdxh3yk262v0o3gn63cw7ads16x703zkqa5vanmi6l6czqk4dlz0h2r2qu1znu65o6kdnwnwb1nbgs6bmt9443hvfe0dnv6pg3iicjwf3yljiltmvgxrmqzjpnco5vuvpkc1vowwwt5sutxi9i2zromso7i0sh8t09jcwsc5d8za8bytld6jlctt8c9855xm6qar0hbpvwlybf3fuk6e9ers3itgc3iyek8ysbr530qrlc9gfcz2upih0p32a6m215xtf0g4m2wp9o11e0xg0l9bqmk5tou7jrcbgdfdpf57mniuoc3h3apwpj1jl34t13a9z613iyzrwfye0cnadkxhgynv0vt109ndhhdv283xclo1db2q5b81jd7tl4h3i0tfu0pv8t4lurkfdn2qdsk7z2y2n4ne416nn43ivj34vo5pwp2vwyjimrth9hlszcw0zezd6f8juy873rhccv4naibh0umt68xvb3efmm2jo60y4ie4fjkht26t4hyim9rgx1huvtivnaqlcs2iflizpwtlrilxto40y0a6v7dz5at2ihts9s6n80e6u9uj10kfha89qj0qjt5m9i62f1leyxcea2s847411w6cb6b6c9ekuqmxvofy9e3gr0hgbl5cr8v4d7pvzck4sw2w4hqpmtibx3262dm1dobp974290saxery4chv9he2cb29m71geuytzfqwg',
                proxyHost: 'd2n9qt3d9l7fqmsz83cge5x2o3a7ogn7sr9ff3l6mtow4qskw1qqx20e7ivc',
                proxyPort: 8130539749,
                destination: 'hylu4kioarc9ir0hnhj8mjpi8i03bpfcw21iyxddovokv905beyf7z55xz25rpzox2uvt0s52nndn9ez6cmvzkipq8lr26bz8l0g5lzlsrnrln5x6tt565eyeccsrz5yfu8b9zqpa86kdg8qqxwp3euwqfsk81l3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5gftel6s0zt7wgn534dc6uoaemv28orailed2tn4mtwh9mmc3thyjjwygns389fmcu408xalxj7bc1a78qwnxfefsco51fehzntyjoe3yec5gfz102n7y9heeppqepl0ug9003i6dr3cu892556d138ymipgsrf5',
                responsibleUserAccountName: 'g16htlnfsc2l11wp9tw4',
                lastChangeUserAccount: 'kgighjjwts7zy6abque7',
                lastChangedAt: '2020-10-13 05:52:06',
                riInterfaceName: 'y779xc6hk7bs7ufqy0olw7ip50uavg94p2v4nd5wxinpp3pfs3t0gk0wxp3hdknzzozvcjuhlyqk810tnujw32kvcjqile2fp4p2ph7bcxy08k4wp24w3f2fq0z89g9a9teej6in2poe1n3abgb0oqv0a516l60x',
                riInterfaceNamespace: '3h2qa8xvu9wzp5c06vpf0zil8ejuc0njs2ghhiwk5emox7xk2z6r372a39tcj3ena4a04hh5u4l054s36si1q95io21uc1olzx11g2uh4ier2gxp5l7lxwijme14fzb0iu4zvwku6fg0qh2b8t5u4vg6saoe4cip',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea'));
    });

    test(`/REST:DELETE cci/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/b0f60d6e-1aee-46f6-95b3-80c1f90b5e76')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/bfe1231d-0208-4a1c-a449-fbca0ddc58ea')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateChannel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelInput!)
                    {
                        cciCreateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
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

    test(`/GraphQL cciCreateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelInput!)
                    {
                        cciCreateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '79a2b6ca-5cb9-4152-84fa-7781b9b7182c',
                        hash: 'd34tp9thymilqsdfgoshii0e6v8z31mh50v862op',
                        tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                        tenantCode: 'f9hrlsi88cwa0pcfbz8egx7effnnvs0fncyz7r0v5c0nwdve38',
                        systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                        systemName: 'yp3fkohhoplqw3yvqd1h',
                        party: '5lf69zokosce3bqekkmjonail4dml1smpth5tz03xjfruzfm4jgxr1ksqt7mn08reoy1epji4yq0v8nk6uho0tmoiqg2hunrxixcyqhonja71utcytjwtrlx8nagh9jycopa5jma8hntn10wjebw016mse8isht1',
                        component: 'lcz2xsxbbat4pnyv9p35u0tbgzx0iilm7ba3n7l0f4rz75othnwh7u9v43xcaolbhubfqz45ds7ribp2l7f8psl0pcw9d5zkouiy2y04051vh18bgvd2qw8f1purdwnplujbrhuxjldkr5ol4tww5on442loazlc',
                        name: '0yac7vjg5ab1bgbmel9ia2j3jr8tx1gp3uvpt937ztzev6jn6tohsw2t22gt8pq6ro9oge239bjo9hbnu0h4msrcymf90svgi2n8yx0w9oii3bzvlxblazi404nk8a5q0smhdp78z444icr1as0fqmtglimpyero',
                        flowHash: 'b83y5h3j7c90zsihbaaan0jmnlfd78hs92cl1xz9',
                        flowParty: '4uxjkzoqy9ayhpare1y4qvegl30zrpyls7ppfxabmrt2ihblmihdgxios64dbffcsq2ci6cly0ps57w2ithzr1h0bjhxzimnifp2u1rdmum6odx8ypekbrs77dvyk97vrhvoo9hh17d70q8pqxw47lqf97ee40ju',
                        flowReceiverParty: 'nywnfil2dfa93404eos6ue301uei4zi4od3aco6c127g9l3j1xvixxa0qd066ycv6mdgu6um8hny3wbzcztl5e2gbn6zfdd16xmjt1xz7oxexezor2qpta2hxi0m6z5t14o7ll62oem3beebnvlo863gnvfzs3bi',
                        flowComponent: 'ddlppaf4b5t1umvxifz73km9i2sgxyfw60yjfhotf56j62cmt1cn7wajantq5bikmq7r9iwfae0o7bugdb137tv11b7n9vzuoh7gnm9dkn9wv73bhm1j8v487v0uu8timm9rusddxi34oayrq2ty4rwbml05865n',
                        flowReceiverComponent: 'lytm5bmy9s9qs9ao7bx6fcopcmfca59z00w8rq5lm94oikg0dckcyjzchjmvlspu0m1lo4mdwd951ow9pjs3lo0rfuqwvaa66juwq1sxxvmphfazypgcdzhgliu8q9inz2n2hktrj9uzakjqc7cdsabh6837yewt',
                        flowInterfaceName: 'vegc7i3vw1e17nwd71u82uddziuiyjx8jo8z6t4jvg7wpqaafuxbvn3bmom4j3cenyq6nc075rv2xdtzis0losqmcd58mpuag1a0p3isqtte3v6fzmaa8q3mjbc6tx85tnihxfo1xex4q27vdtiz79urd6diwxi1',
                        flowInterfaceNamespace: '43rhv6a6ny3dsezbg7jl8z9trnhzyns3tfzvg7lik0c2jo515degmvosf6ntawforohwt6b2tefhw3volgpx9l7gk65f3z87ld1o86z3izk4ckyct8d4vbm40ujljco0gccb8gmu4l3e9dbiiz8xb0qwwc071vjc',
                        version: '4ce63h2hqbpo2sq0q0mq',
                        adapterType: 'ariyv8745dqkqsh5y871cfz00deussp2prhufq8v3aj7ehxhlgx751zoly4u',
                        direction: 'RECEIVER',
                        transportProtocol: 'jktlzwe0b0rpmah70wyswroax7l33dotmitigt3durdtq69gwquc3ff2vxux',
                        messageProtocol: 'htysz9v0g9oocykkw14x18fujoqfyb55qwfgcdlg5j15neuvbgvyw0q4vqkb',
                        adapterEngineName: '33p7i1891wde1gjqz9qqjyy19jccest21xu54j24iblb05y93opz555w3mnfiyp52bfzory5wzaodtgwmrfowqqp8zvrw9h0ggf3u45ebwqsdfs0g1ioincfopnpxyt5au0ioingu8sd9rrbi31qa31n74saem0l',
                        url: 'u3b68x4nyw2z9aowg5yk9xd2svqczy3isyu3nzizy7ectpw15vlp31pzxybkce8otuqnw4nua2lxv525h0ue5lro6cahygvoibafbpq0i1xtgw66ocz51anxej9pqli7s9eal3zeljvqi9zkz5fw0h2unss3h9aqg6sjy5tum3blrfx0ciaedki29hyoplwzlojyhv8xwxxo6w6jy3606pbz25kemo19nugrb4lhpvu0vkuars98oz4uqdlvt8jcb4o4m3wvcpga2ovy08n0jurg61evtsz8ema46dk81yntpvn3lrrzhso1xlranm06',
                        username: 'b6h0086o6rc857xapbmdy50dylfqh85qurx8eanfxtko00arcr6zxt91z1z3',
                        remoteHost: 'is2s74kse5h9fiqkwydfbs9nsxwvonbqjcgkl04tfq9bo3m4i83ob3ep5luqohj15p9psxqhlhd7rdzr7bxp829z0dlmxudpktbh2r7pn2hbdb5zlj5rsiah9x8c9c7j2xlirps45zq5fus7iuhfb0ked4qyh7ol',
                        remotePort: 9974666019,
                        directory: '3c3yc02z2ef8ioefzd5vgbo5z65hcu6gd3wanwr863u7slcdmnszdumdqejyi4hl659yqombugjoyx7zdmsaghwcbn3tv5jbi5z7louojfiirf7oawwi5dzrjnhv7zrcnaewf4mij8d2zcl6pzs8ysvceq6ne2cv5m09ujd40x7rmke854qg8n3d7n7dmsfujq855mjvaeji8ul5ll5cpnmwp2h3vwj9xoa5cmg8hkbssg72s4riu7rqf7nf8j2rv5w2db2an8m978aujzq6e2hlcrdicwgxvn5drloeb92xpt7yhifjq1dgsnic4v2kkeicd2nbemkb8a1r03alnvtabkdv1qub8rnqrbd4e2p9o4fumkjuvhclyfb4781pfkmeyb97gfe19u0byy3xmtw61sx9wm5lnsee1awzjmb2x5c25a7mf2unvr1l8zo8mpbgogp0ffdr8pj7wtq8em09ou71o40gzv148h4e3gn3q4mel54st6a8vxuv9y93bbc7xhk1nijj1y0xf9u5bzavj4jcmxa7as4wscr2u6vbmftlwgxu4itebxzezi2lr3p80prl662iczpwob0merb9h5va3u5h3gre5lbqc4hhxfbegdb21yt6g8jsy91oc0clryg5p07q1br54spe0qn6vhjjygifupvqp31yn5hgsdepn1lp578ua0pl4lzt2k8v1tz7025wlvly9yskoqvllbf99fafybcnbm3sbo7gv0fma7rokgvacpmwqv88o93zb3g8b5238tm2b7o885ccw1dbqf6vuxs3o6llzyi82zydm7u2fjmlci9ts3f2ckmxc64ec9pc941rm6tp20i9slevqtwxu9effcvlb1m48ts15r3i2v8xr4j21ldtx7lmju45ttpalnsm9rqythjyd2p16a4zmujtut2llwbmiefi8hiae3143rgrffe8yuvlrgvce0loogvwkfz7ep7090j0mvamkeqcco9lhc16e3a4z7zgqgs546zlak8w',
                        fileSchema: 'pokjfe0mni0ktg19bjik2k1agvh7k387dka2ev9dcw27uowi7rxek9uijh2dft257vxp8scmp30e5rzun48akhx6y1q1ujrcqhmc3g5fs9td046wwr1owyzde155kibj1vczh4fq46u2rz4wmb4gqtqa9higkaz7163hsqyepdpsx2tg5icbn7mersz2nrcyy9znqxf8ybtjn87k7wq123589yhd2cvstv45ee8woam61tr8eq7vuvhc0cqt6scug6vzh26ktv1wnwr9szzamtjdky655tr65oerytok3shc7iilhpo1xtv7ksi0k4wnhtbmtz1y4ezblg7vmeha0c44rdxuk4vbhrxxdy5exs8i78el8e1gjq9qeipwxhgrcnfjsycshbuhrp4hjxpmv89h6nn9hkd28ersd5a2zxmz2vpyvdc3ljz1frpb8qj99tvs3qw3e5fbi66tlqsspincm158kcq7i4fgrcwa8hx620v4lsji2t8r6006t5tqh9i6f51v5z1a1icclfjqjx3q9mytc5h7yedqs73iiaucbdl6i2na3v66qrg23can82adilhs6m237x9iegzu0qzrqkwgi2tn8z9crbstj5pifi5punstfq8smxzwddkj6g057tlsqpdt384p17g68294sxxhdsw77pydrpf3tj37vmbe4zo0x8zzvvlsyyjpqm5hc1cr6j5tpad7b2kkgxwwrdz3a1njiysb9nljekv5ji3f9jowqr4hcw50oblxdo56o3e2d9cedx5cit4dz0ccrfpebhkbunpal17futbu8cw8sol695eupng9drd37uf2q20sd87yge5e77yr2n55ewpr5a6wjdxyo3okng2ie2y3c46m36tpsnc6chjyb1aj0pk12l6tsu43tsvk9dp7rf2me5ssrxu24rsafk8e1fd7mqrjwsup1f0lc450obcadvr77uhk36kjy7zxmn1abjkpux8vu6yxscfpqb3gjqyht7pdp0ksia3ubmbk',
                        proxyHost: 'caxcsrmk21036egr6iqst0o29r2k8rphla6hghkkbjnmz0p4ysghbz8knrad',
                        proxyPort: 5945309072,
                        destination: 'qh6mkpabyelcg65k825tn24dlx2hehwm1ni452mn9me9yu2r8q6clapcl0i7w1n73jcwkm329kcfg2nz8c0iod7ioibz1yk72jo0ti82zfr73lovdy816govkumura6vazwqkfmjjm4zu4cqo7is92hpifm5dzgj',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'nda9drtxszzytjeloo1hineqg1hdzvdzhjrwcmhvla5krz7etojio3qgd906903d9v9fbeum1g24z3g9upup7dqpe8bwb9czv856xcuo9bm0huxca84u6duxtzexmlh1zdwn5xn0silr2r65jujvme9pxa8ky81u',
                        responsibleUserAccountName: '2iwhge82mepvpnrd880o',
                        lastChangeUserAccount: '3tp5a45clsaqrj3xjwhu',
                        lastChangedAt: '2020-10-13 14:08:15',
                        riInterfaceName: '919sxkiowneyozquo7uc73wj6zh6n77ehx4hjlatqoqrem2914uha5pzhgys3flclc5mfvvip5th80v636ner3t52cdxwp4dw1nwn8corcr375zwh6c0hojomcccp49rtl265xhg625thizuntoy08z3yvo2ssnx',
                        riInterfaceNamespace: '5e5omuurk7p1annx82pe8b0hvjnhwrbwcew22cqzcqk7si7cp51nrbn3ngegryx1wy89xq5l1ioqyxngf7nd90d8b78325gg95qbrfcjk30iwx3eiw47oitxzsl6fqa661hfde46pchwfd3ul745ym6ikyx3rc1w',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannel).toHaveProperty('id', '79a2b6ca-5cb9-4152-84fa-7781b9b7182c');
            });
    });

    test(`/GraphQL cciPaginateChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateChannels (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateChannels.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannels.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannels.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannel (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
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
                            id: '25bb2cae-2ab7-4200-adff-76401a2419bc'
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

    test(`/GraphQL cciFindChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannel (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
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
                            id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannel.id).toStrictEqual('bfe1231d-0208-4a1c-a449-fbca0ddc58ea');
            });
    });

    test(`/GraphQL cciFindChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'da9b7873-b381-46cf-89a5-e515d4dda499'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelById.id).toStrictEqual('bfe1231d-0208-4a1c-a449-fbca0ddc58ea');
            });
    });

    test(`/GraphQL cciGetChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetChannels (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetChannels.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelInput!)
                    {
                        cciUpdateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e99461b6-e6c4-4cdf-a513-604d1f9b17a4',
                        hash: 'e4u3jxrhmq6qn11hw96viptarel1ym5u2k5olnj1',
                        tenantId: '690393be-d2c1-4c8c-a157-355e5c620c6e',
                        tenantCode: '0pv4hva373ebn13plf28gbfw3t2n5o4blta8tds9te73onfxt3',
                        systemId: '11556382-5201-4c1b-96d1-9fc852c75cc2',
                        systemName: 'hblcf0115f9eodxgcdq9',
                        party: 't3rir96fdrfnuvjqj2bwjmcd998ofldol0f4p4we6bs5jcjao93juutuh8pheki4cwf75cth3zptr1xi9vxo7l6zbn9g638p7tow96f5u8vrdu0zp8z48t0ywe7xtvwk2qib8w4k4pojjvr7811ry4ly2fhha7d6',
                        component: '8d0vj6wo44puej48br0i6muunhbvmr2tzk1fxme5wn3x9818esp6ljn9cfuq7xrch674dkwlwets5xdzuuqe7a3rvesmy89damplb2nlfw2mglwal6nl5vy60d94mx47yd5fc10gx62y63l0qly97sqpcqo9qh2p',
                        name: 'vgw0wn0vinddfdh0x6qa9axq7ye3arsbtbony9n0wdi5v94krd36p7ilnsvd3vpbe8b7coaqetm05nbtxq5gfi4nhw7j92baynvbp7fr37aap7ly9n8b57jnucylas42gcyf9fzrbd2n0t6duh23aq3cxib1e6k6',
                        flowHash: '2zz2j4979jqo1q2hhef2p96nkhd1p5atjs5lrmro',
                        flowParty: '643brz7hh975msf7rmp4wfkjsfmlhdg05tsiggwu5imh7y894eyrwwp0ihxfimiwwmpwxtaxw9ymuhfqef0us4wtsqgmyqdadgl9vqi5cgxmqutvy94nx0ikfsele3ylghfwj3uxddrb12uo5fk3jp57kbxd9gmy',
                        flowReceiverParty: '7n2xsnzkyyvfrs2n41u87dln9euyi8yyh2qeku4zcaf3ip9x557w1tbjmidby4tztlkkzny636jf5ve9jo6uanlk2xakrl0y6xzkodp645mp0b745ojhf7j5wyzkdrpzrs0qlf5theenx53mlecupk9erl9q2n5s',
                        flowComponent: 'r66376qbz6vvgivy8lpeqhkm1q72e0w90h40xcr2xjwjy4j8x7mhtjpfe0q6jx9qh3n12p9t5acqxyknjph6w1fpz2f0nwsp860ui4ch03yjxe1pm1gcfplavf0kibk2cto78jwh5vw0p4iw8dff7ay2x2z00bnn',
                        flowReceiverComponent: 'rrbqg20mt84crfg3je97jvn7x7bk6qx3ymo1i6139vp8871lfbdib8vi2eftmzdtw2h9nt0y0ghgm29klh3koao0edrzgpjncx79o13gcqpvfnnkp4p6mdvti4i459916rxgy4vk4zeew2ct6q28gpsbz2r5ob98',
                        flowInterfaceName: '73phmdihyby3714xr9gvtoxebjb078uirq15o4ys2r8wi1kk81ahm7m7om7nsvqxpprp4raaj9m7bcmcw266mi8oxp17d0q5rnlnx9ptpu0vwkqx0s19god0qqtqnn7bs96yn1w2c5ts767kgtqa406jl7yoelje',
                        flowInterfaceNamespace: '7yegqfkkx51ry81bt2oyiml0ald0qk3fjlr16t8fpmtep7w08wkjtyrya7sr7rndln7nnqkfmy0xfet84ad4vl472cr9nhxr4p8ohtuur42ctcw0bn7adj168mwuneaa8om55a6rpaxamm872s91kq0k1hf0w06h',
                        version: '72qtn2kfvhtr53t0vu2s',
                        adapterType: 'sjel5vbahtzdjvd3umy8fqw335l526fa85nrbogl2j7vpkd16p0wlbnb6a66',
                        direction: 'RECEIVER',
                        transportProtocol: 'oubr3f4rm6fp38sh73drrjb8q13tkjo5z35swdzbbtitklgopvw3f18zh555',
                        messageProtocol: 'g317jrdcw8xsjwfr7gxz9stc754b3b01pns5wxxntrwnoweqqpax0jjaqiyd',
                        adapterEngineName: '1tcmqivdib3u1hvmq12bcfslf190xj76h5ahs41grb0tekfc99x7j2pdm1z3rspixg54nfydz1itt5vz3uec0igabd7qwxlu867ujvbpvv6hqs2fk78cdntj4smifngiu2cii4ai0kwsscur5wslx2c1ynz5vgmt',
                        url: 'kp5h0al54896jsb56ufzohtbsahx4vej6qnmtoc53jz4i037n0slf0jt9y4rljh8jndthm9n4hu0fa8jacmnjvvayr1qgshxuwrqy5m90uf6zg5ce6xrfhfgxs5ecb2ha7g08b37r6cn3un6w577eobfbflfy6om5qr0a6g3g7l39j2gjtbvnma8zehqr56240n4wub4nhhvet6brdrye88ttayc5fcue1c1fvb3cxnj5up9cktxlnresthipc42qjp26wylyo97ey2nwxfvy94oytj97w7azgb6fqd6fa70om7blcy9qrblrhicvthi',
                        username: 'dal6g28v2tq85xlkhuyquyc1omoethg3klzf29baz29wu6ao66fmb87nogym',
                        remoteHost: 'un98z1ngfq911x79jwr8b5oj2ezpx3bb7pcdixbsar8shcw7opcj41jyqyla45ei33uft639p82ysdnpvhlpt8jsouvztkgxw6j5f1bu7w4ciif259ugxifk3nk8okkfstdvubti537pmjd1lvhiv2rjb0yca6cx',
                        remotePort: 6454479143,
                        directory: '0tr30fj99o1le48kxdnkyqwxyoojejk3qtobbv6i5spqoneowpk4hdsjzd9hobixs5axsoehczve2ix3eklammcjpbfxpijqw6wjxxcf78fetvkxaxdlr8t7aahas879cqoq6haptepa5wbv3gq7v05a1t60rliz63qf4ipe1n1wi3z6m4ujxdlnssu6i770srgd0k1xr7dyph2b2sc6thh7z6blrpavgraiivcpyixp1e4y7q1ilmf079cvwromwi1336ie8dzefgp2m4ggduhr1osyvgkmqptk7t9y9vmzmzyfnuthncbllpbkyxialm282qqpwgh3kmn0b8mj04k6h2f1xkivg2dvfjmmcyulkgt40d0vguhgqkhnf35wlqhi9pnigxqg3ykipy5ve0dt4zralehafvneruiz4eekr6johtuupnxjc33itl3z6pg1at2zkeaib9oa8s4ljahsjsdunp95489rsib1kreizi1cu9dwe34ws0cc67st9q9dt1qoujx8lyr0fg27smzxwbuo42jxnsy5hbri5r4xfukxbc9ojsc9hkmoi9b255pc703adrxyah3x6ub1q96y607h9zkol3texuew76sv8wcfh3j0wsg1ha35oclwt9znvqm8k6zc2bmc9hroenrpmiawzll430udpvgtpr6q3a5cmugazftlka5gb396q8ri0y2964pdsfcehcgosapkd30cbexl3b3p6wekjejnum8n1z0rpngq5shxgcz97hyg3c3wrg7w1d2rhiupl2e5g8odqvev0hrybtp4h8t8owhkqoi0uz8pkcoyjpqidlgvt5xusjve48yerf498dhfcr64ryzhyozbzka7dx7nzd2ia227x5ov4qb2cshicf99chzkd15udeh3mp0n507xve7lgtu2crtnqgdzj60dpjqqjvk2t091ldyyujwr3l6em9kxehq0byownple46ld4lphktjrwtp4u72ciwmp1hs8baausf6wz1fov0u4',
                        fileSchema: '9jo4ym2eva8q8tiug7kep8usp6vds9y7vovfsdea5dbllxhr001xi6784g2m828odb7mgkcw6cfxe7p8llyib9hfh7ek6pfg1t00z9qx8euinros1e7yf0d0gjudtap17pxj9wglt254zzv6fkb2j2meis966cccs4lbbon9f10gennjruv8fel0snf8zd21ljwiv8z593nb9vxrwh8wo5ddizn3f34f9hcsyslui5zmac2lmjaouriudyxdm6iwehla4gmvbbehg6qzp51nv3wye9glpdf9v25ptzv6hk3f0v4vlfu68vwenmfpjhh18lpwvgvfpmjs0ve9c7bia05jaqv3qmjd6qx9h39mx4y6urc0ufgt3kzc9660q1bftmxhcmgmr2isk1wvwlq69ll7tjgcn65n4iwjo56vxtsbgnexql5gb58qz6b8ave1e11eiq0251071edfkugqjyutjb91ru9zl0r5st6uqhof6rwba8fv2ii84mw3asip2bwufcaynk4a4jtasy81d4hzdzl0o512ja6e6bjm45mzoyw5wco2d10rerqors1bkykro2xxfxg7vai0rgyxuxxd4vmkdo8im0aqd2bg2osfnoa1vwfrltxsjs3rp0a6mc09qe9tboxfu7dz8gwum19ig3bwwrmnr9g1qhybmxuexcqkc0ze6p0dyndiuf8i2tasvvmmgfgw7j7h2sbfucwbrv7ljb9ie020i2tsev5nnu31o5i8mau9ewl0bw90nytpafqpnmqmfyo17sfwkvk43d9qbrnttlkyfkcymwoi9c53ozoi1tmrudc4dgzbe3xqfn6r1y9teg2oks7rjczqeg94i6m0c4yt7f7pg5b52my1vxs261a8rd32dcra4izadm7cqjwutn9qq2e2iq2jirbh680j0oiw7yzigwnbnodbqiwe0yqo0dtnpeqv9h3cju4j6kar4b1jggmnn4nesslv2ygu0h75kdsp8cpym6q8xf1j4jf25euw64jn',
                        proxyHost: 'k69s0rsya45ufii9rq54qv44aexb9icqpbr3e42ipmtfa85ingkcexmknxjx',
                        proxyPort: 7940266605,
                        destination: 'oazhk4cyi64qawolva9zzbcyygpjsc513no94gcmq5heycrezv631t24lbbq85g92rza8jlii3qrglefby98canwlvba9be4zienmemfpeuh9806x5c6sc39f4xkikwnch6wshc3r21movfjk2pr9vuw7lzwq2rp',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'dd76l7mln2spuqns4ac26mev1xsgrh4p8iprzvld7n9wxhn6dbshono57zl9hmdllggs3oe76jqyoptwdebd0hs7w4btovhuvzjiha06uyq9tttye69sllgvj27ypmthix8el5chh4yvzp7r1tztsrpl417x1fh6',
                        responsibleUserAccountName: '06tt9vfy9vg14ljl8o1a',
                        lastChangeUserAccount: 'y9t8d6506fe5y6amjbfj',
                        lastChangedAt: '2020-10-13 06:40:49',
                        riInterfaceName: 'ad490tohq9zba46hyn79k1tpfau7bonh6x6b5k5t3juyhdslpbxmxa3pahm472m25jdv6ufxr7lio1ovg1yimpr4kcthzersmon1u3mnyg4iwgddy736u4ltik09x8fdu3bq5zi521iw28f765kn7rur435pz2ix',
                        riInterfaceNamespace: '1gvj474o70xx6bhevfb7hmmvjf0pkqx5tveoljbhb1jga24jpqf803uvvp15jxdx7wkrdcjig509mzl3tuzq6c6y7qayecfowul89u9orj5coqgjqy93smx7f94ngt9f91u1l7q5h8t5jukvh6tjvs01hq75gby7',
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

    test(`/GraphQL cciUpdateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelInput!)
                    {
                        cciUpdateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea',
                        hash: '4ugvg91hmpgeypnql1mowskkfnngwo9vf66podjh',
                        tenantId: 'c6681410-5384-4b59-bbab-a166f5e8172d',
                        tenantCode: '713koesjndlqnedvb6yn734n1q5n3w5otxwvaaavam4g252og6',
                        systemId: '86cb3a36-e830-4290-a4ff-4053ac36b2f0',
                        systemName: 'zjurbl2ysp7z55pz1hiy',
                        party: '77kno5yn3tmwq69nwir3crrpfbffimohzr2h0119p03cyom1ubvnn79sspianzup6kudyrw0h03yc9q6637s504nfm3uuzbu71oktcasgi99djzz3gonjaguetc6hw7yhcjse53ish6765b1729ilmsvekrltehb',
                        component: 'r62sc3w048ayanmh3exq1pur7kq4nln5wbkbsjey6q7or2vmgvrotbivtyorc6hbmrnakjje3r2ih7kuv053nujka2cbwlfa1yup4wby3clxbryd5ywkh1kpu2eg5h00dvjvptajn09ugwspuj4fd5l3ywt491kw',
                        name: 'wqstqu1l8qe22imjbpv3k32m40kr9chrkvhqh7h3jjiasxmxhxt5y908c1if5neliv45mt2lcvw99mgzz98bunhb6f8r3kwyvirnj9ny3memgdweackrdjn4zgd4y2x5147qtw6pi5o15da0vj4hkhfsb5hgme9o',
                        flowHash: 'sezpj7s3k06i7tzncchtyd1shi49fcfbooo0vcny',
                        flowParty: 'c47ode2w2ir9zfr47ij6c2mtieew4qie3n3kfnsi9mmfxf1c5ns9yedji4qpwm6qsm165tttkei9o2caih4jk0cng9bszo2ykyd2x8hheengsien5npmmacf128ocve5fkyhlckrlfkuwk2ba09nrrr49t6jrik9',
                        flowReceiverParty: 'ur3q25zo7k86xdk166kdprlu4mmg65b3bvl88677rdtx1jskaqp2gdp2htzzqiskzqcphodarx0b98tozyu67rkge7pdewyu20i76ey09benc9syvnnjukbif1g4nf8vbm98cujdhywmutfem6uz8vbkntpdpr5s',
                        flowComponent: 'niqr1s2bsrv0ylurbg1wf8g023sl5q981d25eaznlr0outk6ssifa6xgh632lvrnt13c3xn2md3yc8wai7vcljjqo18hqxivazvyzdwjt4koetq2d8ao0yigw5asa8suvygaobl19jv39yt5pclw3oq0b3tj9kdp',
                        flowReceiverComponent: '48mg8xwd0j9xpkt48xtxjpmrmd5lxkangp7m1p745yoth8322nhgrj9iovc80x5edrhjqggmti3zmmj0vej2uscys7wnzvbaudow7vfu5jckl1ikzqlm1gq0shp8t6bohewwcthhhmtdlzvyathos1hut75wlmw1',
                        flowInterfaceName: 'm8xbbdaznnwtq0lr4g0499j6st33jsob6ml3mnlnz80vnn1ewd442iha1d41whtizxzrxvdmgkv1m0eehg6bgrgh9g6iqemc9nt7r9rumkwfjgn590fqp4xgvq28o0lwbhbvanburlwlqyo2il0o3jmgi3ndanh4',
                        flowInterfaceNamespace: 'mm8vyddn3hziir93pmchrvo9iqea7ygxhmun9y1v16n0hq30ku8c24z1qoebb7slnpupysqe1pf8iu6nehhn60ff7r9rbanjnsu5ymp92r46fmq77vg3qfqvhbw72lgc20guj9o0ct136esu34ntw67hh0uf7yis',
                        version: 'kchl7rb3o01km4lwxb38',
                        adapterType: 'ytqj7e7mipax7fsnu30gxiof4tfxt7imrzadftrzez0pnfxy6hicx4fvya6i',
                        direction: 'RECEIVER',
                        transportProtocol: '3q0f16u91afm7xh567v5eefw6im4q5ds8c8o3nu3d86wxvgtnyjn2sz05mj2',
                        messageProtocol: '56frfre9pzlh65q8mweet8tplmhil714lv7qhnrxc8199fnc82n6wjazswng',
                        adapterEngineName: 'azxv0gu9ufcwyf9lku9jrbavh21nm10xpo3m7e54hfd2qyzhrtum7dwe63fjrlg8c9ttsd50tzddpde0c7pyv2g5qc938e7ztqtop1hggwbot18o9ijmnltw48mjonn65oliuzt466w3cj6zb3kdyigiwztekewq',
                        url: 'oh5e06j919oggsjgyseilji8djg7b18w3vum57ckqho2fxpbx2j8t7i590q65i1pol3hhiqbsbiupwhj1oipmb8a82x52rofno8n5t1bm6mqxt5yxhz7pflmxoqh4s07y6xpslx41hlonn5tgiwn5wlwphyv1l5xvf8ef3n7bqkulpv8rrii26w6xkksudpxtgil0u9y8nvt8v2u5yx7s3olo5404mdaiwyzueq2xt9rcw50ypgpa4ctdqm0mtyt823yi3p6iqlgc8i7mx144lrapma1jwzsdhhzyv3hn3fu0i8aylxwo42hddcqllw6',
                        username: 'qucok61ct8me3inklohuf7512ajk616debpwc3qewsviujv2cfun0hdchcj1',
                        remoteHost: '2tycjoo9472067kskzarabvzg1tl8op0niowcdpbth6bsunq6ittyn6ko4mpbs8fis2ey1885mnmm5mahf3i68kvggx4st5job9mwd107fgo6amhnco1vyr202r6e2cesh4zn07u7ooosv8s0xdbburmu3esknsh',
                        remotePort: 7021059110,
                        directory: 'v1jxrflx7s4gm652ktdwst3f31jyxzt8ovhkgqup42zpyqhc15if8rwm09y34trudicpt0yw6b2e0gx8a392zlgd661uibf03c6p1rg2gdo3ikiq9jm5ny2wooe4iutrwvf275e30gjt0s9qvi9iiug8n28nbaoa7ue5omwl417hnumb604os32yqrr3a9v61b17fosg0urm8qnabkioy40pqa7qejq1wb2eljvuhmipqqb7o89l57wudgkny54hqeuyb88m1q4qcn9ocpnmc0ltr22womd77x1l22hui8pqsaapp1gyl16znztehn27zvpcg83xrha9tzxpw567e5xpirqc7owwrhyxnovr6yk3esnr9uacuseqbr1gallpcjrlwun7eahbqc7of89orkg9ih4sp7un052p8ja2flfuc0m2h7i5wtb0b0dfmp2es85qsbricaoy4zmejw7oyacv87g352p4yahc0ima0ptz922uclc4bqfm1fdd9e0ehym4thf6afi38g1t0b93b5etsdovzb9tiglyfvxslag0oyd6wrysyqnul6ir2btmajanpuvih8gsxoiavcds43nrt7zicf5pwx62drppdsbmgm08gdk0rw9gwwutdn5sgaq8ff7qkl8rvnebqintlv1namuvnrhlqbv4m8xct9jhxxf7d5xbkiu9wnjath4goampfxferk1zsw29n8e26no8tmecxdrnaq11ihzvk23gbhm56uidbwuzkl1uj32e6gyz476sjrv1qh6i0a0clyhw1bwtdw38d8b43lrprg0vp1wq3whan83wer28sll7airv4ncl19kq4kggpe97mn3et1o4i6w65toi48g8888m2slw5jxehzdq3l0w6otdo8reqzheet2vwv31jtcsu010frdqaot1dx63oui60vv8m20il3l1adjpzigiek6zkprvo7oai74h0j8225mcf6w32gkvohfeft2nveyo21528gx5i4yelw7c54uilxya',
                        fileSchema: '4pljr7id6s0nur66v1dh38vti7loxq0c8d5k0w4x36oof93tydx8esqqe1e0nrldl3u33uzsofif1kiwvfz506wz0qo5gkfe86xjijtniktah3ucp83s6st284zpvj97vd8dh3rw489j2ckfwpnti30n8vwe9wm0cal32ifcm5cdu0vzvefnfqkbf3c5xrfqn0s73jvamfskjumanlfi1463a2orc4v8bkpkmo25jmu1gz187r2repw648maniefpvknrbo947rl36vwdasp54khy5tbpputn50x8re8ujth6k44syeph0tdro8b5hspk2zatoojooqoprpdtcm4vj4dxneh84p8k99ljmqg5djw9u6wh8npxnf3z5iedrxr54nt2fusoiy19kvt4zsefrqaqyxod7dw02sm5ot92b721cr8nyv6ygptdpoon9q88l1yehu5f60aog9mtze78i8nv0sysb20bt6wgevjp2m8g9915qemdlghq6velme2qd7zyaxnk3ohrnm7r0faugyy4ti2v3i6mj5avhjov8f3bivfd2y8g7lz6yqh2uudtztakfeu5t6i17t4pvkuz8woch0ls3qbek32d7ujl9ng5bvniyzbzax62hrqnq4pfjml75xql5ygireih9vg494ysrgz3x9kmmzxtjl2neeojylv6p0gtie5jmnx9fs84q88i1ggrx82by01yrbshj5l1en2y7vubw0re265phitncibo4c42xecpg6by0bz284cb7d9w596gvjsjchw2dvr1v38uk3c8tpabgm4t80iq1zx0c26rf269vgi2wf8fpkewmfq7bcrk35dbhkdsg570ebex3dludykia3qagjiqxe240u55xirrph3i8gcsntictzh1khbcxy6ev1fjjnx13yhtqvgdy2ua2c61fvww77rg0wx96c0mv756dyjwyn4gkdiuetyf9dlczk4p0vdhx16qj88dyta9lxkxvedwi6uixginqm6pdlle5om',
                        proxyHost: '0vxuhfj02n6v8w5fjc9hrv67k78sofuutvg56o34a6zx6uk2550vq5p7gbyb',
                        proxyPort: 3163977452,
                        destination: 'hhjcxv7ofdpx7watbf5a61alc05oca9vx42bqggbm9o1gdu79fqkziytgczgnpeic7z7dsen4j54ln1uhbc0q91c2vgw7p7q6rtxwnz8mcqkx2pjydtgl7v6190hqpam1c1dswbfikhz7hm773slinbdvleoi9jv',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'vy6xmtm7itrx04fbrzm5olprj5hpp3mljazthd3jdde27s9xmuk15zso3rqwf727hfol6wgk8muz61xhb3msnijwd1a6y3tyqrd6c3xq2weiusxi0e5x2pue19emuthddk3r0ekszbhdnpomg43hde305v5wmfla',
                        responsibleUserAccountName: 'u17grwzfpkb3inxhmfe8',
                        lastChangeUserAccount: '6u0uaj5uhpbwy1ngel9i',
                        lastChangedAt: '2020-10-13 12:10:22',
                        riInterfaceName: '8sm2qmqtkicjutix5avof6mr6o5g3tavs88w8z1zcwcsanb3z9hhmxpmz3wew2egpk2qv0w3cszat1jq33seqlki3dlwe9lqcjvvbi54k366qfjp16fm231fjvm0qg69qg7tkvri725c5madwbkf6u850mpd2a6l',
                        riInterfaceNamespace: 'oi1w5zuak1z1a4nr6k6yqhkjiwg3rtedhkutgh27cilcxr3ekl04zh0g5vesox5hrcum422qivbqv4vbujxezjujkdjngw22ukv757gd2pkftuu2lho19tlzqh9e318tpeacq93kxnb3kkkrzgsvugaj1wpkmnu8',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannel.id).toStrictEqual('bfe1231d-0208-4a1c-a449-fbca0ddc58ea');
            });
    });

    test(`/GraphQL cciDeleteChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd0de59d3-fe9d-4970-b6d9-75068a0bb660'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelById.id).toStrictEqual('bfe1231d-0208-4a1c-a449-fbca0ddc58ea');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});