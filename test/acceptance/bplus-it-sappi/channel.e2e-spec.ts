import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelRepository } from '@hades/bplus-it-sappi/channel/domain/channel.repository';
import { MockChannelRepository } from '@hades/bplus-it-sappi/channel/infrastructure/mock/mock-channel.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
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
            .overrideProvider(IChannelRepository)
            .useClass(MockChannelRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                hash: 'hoxqbtvrkfpu1r7ukss88u2m75j4m0v5lqwjlr94',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'fwdbmd1nn5noxzxceqhd2plcivakxi36yl5wjia6wvr53x9vpb',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'z3pcieecpfdjhylr225s',
                party: '8gkv7wsezqsj930vlpqb8qf98sz41sppwpth8cfuinpfv4sakl27tq56j5efrhw66uc06din4f93qv2udlniweyzhlg9g7zkf0ii5iliozijinro4yoqxhhu20yqwgti4lxd8uk1g8n0ij1h2ibq9r0axew2oof1',
                component: 'lwmqug87i2zw6pyli28i8gz30ff54j43jvq3j7b5nczj1gk16069f9dxtunn3a2hits4z5hdvp2qo7q3yc9jmzcw8yycfh0u0a2c7o9g1hmuvq4na317bk7s301u08slpcf4x6a1qux1zw7kg8z3udwu3f0upv1f',
                name: '3qayo2rkjsqopj2goxi7bze66x1b91mazmk60exq99ghnvmdph212lmx2o0xup197i0h3c70opc4flj020xgu9tww71gn93vx83memzg1xotfr10ke13z0n43eshs5hx534komd1poaqo6hisg4707nww8ccugsp',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'ankh91xdd39z02wzceuccz7edj7gndys454o7xgwzy40b9xqngue2vj0a5vogsvkv1c4o1dgu0hpby97ix5n9k8vhglori69jrnbsy6fvbgvqe7kev90uj9z582fc5g4vxnwu48p1ewyeb847fl04tpyjyknigox',
                flowComponent: '2i9tojosksveo1kceamdbpih5uxjc9rmtx91dl7n0k8w2jbqghlpzg97aedj2nvx35t3qynitrpdlxrp6rp0o2iyajot8yn50qlfl37zg7wbnucz3hq65s4i2a312tdlj29vjw7n8cpnk3agcq3askp388yfxd8f',
                flowInterfaceName: 'wogtoi6mhv6dibum1svr68me9nm6qf0zuapxrjyg9ve7liu9kyo80sbz0zuifp0kpbkhk6cihx53bd9wl0tft3edknan1n6jsp9z4d788co9ecoh6icvjab5rlgcj85vexl2rccmlsice4l2o98rar6d6xbz27mo',
                flowInterfaceNamespace: 'wgg0xq8xssti6k9p1eamd83sdl3bj5t4cfqlf71aij4ss27lsj0pv50sug7b9xb0u5u35j4siesh8sy8oti1p29s9xwm7wbhz2k1b6jkwlaucnf6ac59yut6dugjuwv16dmq5y1y293r98zf20kr2e3a8dnafyzn',
                version: 'sr05879inz7wz4d5nvbo',
                adapterType: '5au0cuc9y9r7ufj3sai7nq1cpfrfu98q82btc8elujq9j8gffzbxbq8u7f6o',
                direction: 'SENDER',
                transportProtocol: 'hd733eq13uyiwu8o21owiortsnlonmp26zvpth40uw9wnvwecdyhlbj9da6u',
                messageProtocol: 'f9nyjvv9zfnciff5tnrk9ss4heqr0hsm3pryuozhzx17r57jtr89sfhj1s2c',
                adapterEngineName: 'sb0ttvzhetbp1utr15wzuunmw5hpfk7io6fvv4soy8tcc3ewiyj15bf382f6drsw5x60nuz64d2u3u2z7qz6lepi5lydo7k79xu2vukuag1eybh6qhi6cbgucgl9vhbe7h3l67majtgtgfd68ni1d2vqc1q2tu7x',
                url: 'its3883ab0l5lqgzv7xzlw4czltg2i88erdn0iz0ghxho1m16hy09885eb7fpcjq2r08ik2solajiucmac5z7v17vmyoaz5fl6qso5kdu01dxrry0yku2zpskbaivj1aqeuxudfiquo6vthcdpsxlg6194ngxz4uom7h7ufm1fyn8mgcge3tfh8e6wwq9u1b7tlt6stkqk2r8hsaabajd1d4a3c8e0io9sdkaxdh1ei0ip9riii367wn12dtphaw6g70yoxd0ktiaob78onh53ylavqyoij9bsw8jmiit3j0pgeksvda1b7ymmpl2yaz',
                username: 'c5hxhqev8phkr5zm2vvyj0k3z83ussnom0zbv463vssoq1f8agvvelc7r7nu',
                remoteHost: 'vtihjjekk5e0fy3byu9wzar554fomwb0ig1h59ilrxswdpqyvbz77twepjv5xm20b9e9qcz6i1qlnui8h8vru3mbvrbvd1c0dj0w7hilnseojqc2tnkzja7qqc3fuic6uinvql9rfbnx72m7gijvu24u8tww6xps',
                remotePort: 1478575698,
                directory: 'hbh2ay9zzed6nox55ujjiyirnsuq1pviwuvzndg8yv945wsjhe5q5sz107ea6zs24gdtjelv391e3ngxtamhg1rz575qlvcutla1yly1w49c85yg7ycbrwxivnkzql3vgv7e182ya7mh93oyhdhq8bousamc1qp63vwq0z66p6vgfsdemnbmcd346c4m6f70fwgncc859xu8n3rxz5l4p8j3b7qv9a468e09sn6cg8ygcdgpj8t4i2eqpz1bives3djwbed9q52bl131etqqeqx75ubpxzlaweejcpaqxwjekj6fsqi4sgkaxwvhzth846gycdyo8af0m5ywk7hwe0exaek854a3nenpwubqy5bj75yueuorgmvg75l6p0jzvcw7la6emoc37yhxssxa6q4ii9j16ixw5gqwa6npvbwoy9crj8roymz9rgba9s2cwvox1xlrbb8ut0n1d7pscschudkr28fgeyejtwivlyfx9b18s973anusqxh6pzdr83ri3in8k9sjk1llxnnesh31gl1xyk3jzmequy5jccx6zih7pp4sqrlqott8i33dr7vmrab2oevf0hostf02sdg556sxvcweja7krxb7f8zbfwj60ahgva10ffqaitdl48p0tz3vnhoevdek5jhckelsvhebdmfd89wzhy881893x6qhqdub2k2hp58eduoieyut1l101hszkwgq4k61hm1goihtoomc1xxe4hsa6almrr80o667e82h15ajcp1scsrfr6w1ywkl5evtjih01j01hn499ua2y01aft3l1cji1szt9i074tombir6audjsnjykucdjvg1ebjollim4u1hskry7m3pkdxxiv6it12okv5ela6my11hbte47qwcdd45z5yze7eipfly4kdupc837dq6okvi1s5xljov6mc8vvv97odp5sm8ndko4o42k7mpmvft7z63slgi4x7itx5c67uflmgq2inxu23tjqskr1oq354irrtafv78d33k',
                fileSchema: 'gliesvuqu11xl4i3edasenr06oavo8lg2yjgcp13e2pm26nkk2ff9jfrkcczyxzu2y49ew3afv3ow3842sr2miakcl0tn4ir0si6dpm337lfleg8zduzouhhcr12a9csi8fibt5hjadke3lohlffj1mbrrl1kjlnvnlyf77ml2qfwl60saflz70vktvs08wjgqqxhrei7kwnyabkluiypbe1678riw7r1fmpc9str6ryn4olkmbl19nn2xx9sn1ci0uz237c2ccird4h65l0bz9q6nyh4if8dlxx499m5i9vrbqceuym42vyssu47w7whshy39xjk3qyw96ciabwsi8i2w9ppqwgr3a4gs1f9877r0ii0iq4u6g41g6s08ujhzuxlv39kn3qfuwd74omwbkgevsj1o1r7nlkux6rygvx6pdxll52yew5eu7vidf932z3sfjvn7ze92kof5gegwdtjf8rry77sdnv578f34w9ji5g849qki9vnpj1m109qdn76y4q4tz3l68n8n77bwtg7ry21src35mmd73sr7ef4ai3rh64qbag9rtsboh0v3wdp23ccom7rq69vht5ej9t1wyv0luh9lbtz3ne6txbs9f7tuaimn4sfv7l8947241z5zc0vwbxs5d78qo62mz5wdst0zggxd0evcw5wl5nlfp1g9a787sigo41ickfcxzmurvzijdn2ycwjk5hun3zmenz2ch06m0ww1ie9sxi9fpfx7zii7tckvajtxbmqhyopxmk7nhip46yn9t093366lbu1tq9gg7b3yhvgq0pr4qql3kcrl7pva5gfr1bhzdzbzbgq9dcdzi1pciwgqqzkl2tkugwu1h01x5yykqt4qemasovxs90dahiuvtaydwdp5x44v73gnlmze5qflkpwfv54urbk15axpw6xwijbpszsav0d5c8mml341r2u1kpucm8hkl0yumvnk0ydlu2bohbp4hjr30ktm9svn2bveuezp6wejc1u7w25c89',
                proxyHost: 'ljbpwxd3rb8rhthyjpruj3tzjavhgo7jvsbgcuhb7obdoyncrfsl5yk2u4dy',
                proxyPort: 5008080547,
                destination: '3qsv8bdk7vxrwka55jln60v13aiaw3lb5wgmu3e38hvptmyr0e31ued2ca7pvr2nhgdf868rip6nmowf5oeoo7lekwf7s7naq4a8evxvgxn9t7znfis07pgyqbforfon14jxq5diu9tnsbvtz6217v8ahw1m0szh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'h21buqlm5j99vtf6t291qtcid1pbkl90a5hru7wesbiezw29jycikvz6ltlyq2h2rs4hyh80r153ocazyib83ik4g2fx3fmoyxrn1wyrsaolxeg4q9u9s4toi80ie1b3dakaqkn343dku91px4e2784m5720ga8i',
                responsibleUserAccountName: 'qkbu966k8wk3k5ci958u',
                lastChangeUserAccount: 'xhowoc3s0chlsp5teu0v',
                lastChangedAt: '2020-07-28 16:22:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                hash: 'f9sn07xnqn5t8lnyyh95cuxkvm8so8oj5yu7k1iz',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '5y76b45an2beaa6k16gofblwban6sw0jztt3x16qd3s9mdq3gg',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'qhxhjzp2p36uqobe8co9',
                party: 'qpssdk1h9ek7f0779ab449blce2uonyoflygubd85nej3ho5fscr07m9uoqelysyh1vng06pol9qn1ll31jgqxi7umyj17m0kv89oppob1gcwc7z8nsy90jqhbg5xq8lomxzatm1e1lqbaod5kzu6dyrvsqttvcw',
                component: 'sb9h4qsjh8wabsy1dnu01ncsb4b8t29p5supr9eicmn64g4oyw7z0ji3geg3uldw372jybwcx6ljc2o1ex8fuh6vwimi5vsngqbdp4srxxzmtsgoh79fnlj89zhyzfonkvem8q7gcni6o4k64zxf5p2yikqpxmum',
                name: 'vvz36ito74ip54ih5itqzw2sxfhpapo0iniebq6lv1s4egvsa7zvqfxghkp1ozn7y3envqdl33dpdxpy5fcta2yk1vbgxeufpjkszha4ej1tfhyvb1a2ifn5w3p4d0qiai1u6704m3e4lo9soru90indod7xex60',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'fsmwl7g0zcnlyltzfbknew8i8e2ohra3a4rp0hjzc4bwpnazzgqdjtl5dbccs1365351hp5o7m1zho6nwasqszbk4sf6xpc6mcdgi4eudv0dcdndetsd2tnn5q0ezfsrgwm1sm3x4whxomx6tx0w15ogkwkkpkk5',
                flowComponent: 'q8qvpeetttda3jlrtu8ax1zntogke36tw2kxqguvb0rmiv06515dlaxl2o358t82jorc5aste08vtje46xni0phtwo097ym9k26xwzdnym8rse4hamc0ic23ieuzchim9zaq6dfrxs3bsnubv6p4i60r8q963rqz',
                flowInterfaceName: 'n11jo29u9b0g0ck2249cqifbhfez1dclnaexp761rbddkoyk73dmy2wtgo1q5n9grj2ddguxo43moqpbbc1ot2gq0ldsyuo4uymfhomxuj1hqu1psaml2w3kq49v5h5kff7rqdlzuarnldq90pfbhe2rvv6xqvjd',
                flowInterfaceNamespace: 'iw9kii4c65wobelfarji28bbyiyed6d9em83m6ykdoean1pd433d5xd8qjqwqhniqaqjzlflsl9vr9qa3vhf97cbk63ofnzq5ahddj3v72j3j7i1obz8i0flo1di1aos70zrleirsjhm4d4w71j7lo567qfihtgv',
                version: '6ga3oijzdw1uvysr3l6g',
                adapterType: 'p3eb9s34evgc7923degk6f9z6rdnx2t2yi314khss5p5jenm57ce5z788gen',
                direction: 'RECEIVER',
                transportProtocol: 'khs8reqn7zcwmlc1osq5p5yt3st8gnibctlply2n1gfaj5zi8lrc7zb3lcmr',
                messageProtocol: 'tkm5s6af9pyvoc9grq5xttl5nwr0je66z9t1kzh6gyh2ykvlnuuv253uqukj',
                adapterEngineName: '7isnd66r360u8q4uzvme2e6afp8xmasy9owuxeqw1syfyxwdn2gnwq7gg9oievmsv2wpssav3sy2laczg9932wzh8tlxotcieq6dwd2oe10a0nlikrg7zeu0wltywszpm5jqw7ltt5dd13cze6oj870efsb4zvj0',
                url: 'pn5or4edr4ss78dd9r81r04ps16wn7brr04zsbtfldrh4l5k2aq1vkvylb61zygx8har5bpz3d8i8wqa10fm7latybnsmiol2qzhx69innzgvwh0usy5i6r1rc08984cbgyeqtnck3532nuk0hhc7jkra2jcxyhbwxmcxa1ywy4porak8uid1i1sh6g24jh1by1iy0n2g72pmj6bl6xixegr8kzeammdnb2sux2julscchjf8jwoiq68zfldihg9so4wjvpt7oj6oztrsgxh0nyfxn7ylxp1wvg9853lepakm4khijdaygvkpb4rz3pf',
                username: '20bikrrrugegoz0yzf2dg4y4zenocg9w9dppsq4u4qk3kadd3fsmuku1dqmi',
                remoteHost: 'g4f0nwsobs7mlti6ae5z6xzz5zbl1kpbcvap1y8hmt9zgio72lgp42teosetl62ztl0r562aqv4l3eyhttbjsaxk70wu9invqw810q3theuu5h6jbcthpdt4f8vcgdpohvkv6htaoh76mn142voe95ecybqsx6t0',
                remotePort: 9505424094,
                directory: '69arxkbr61kc445g136s34c8cnbsh4zrlw52rddzdti8kh9lwa2q18egupckzs10ed9yj2ddhu0dzy0fb9d3vsvl14bfnux7akesoze8g3ervosnua0wptyi22xv3ykav4m2aweggv4w04l6jz8kcmky4mxrrrdqogtd3kio2uthzg9w61v342bvekelw6cwehh1sby5c9agfc15woyd7ah3jw8miao27sqt71q9zjl19hmi2cqtikehjre3699hvb9gvydv2wkxrw1u5728lff4tzx5nlijbr5961ele5sbtmuucc0jo03hasiirkueny19mc17mubsgan7reh6zj9si1a4xwglwx0y6ujtfmbf1p1g380gz8fldrn1cnorq4h1my9y3efkyannhfqg7dvfcaz6yatjh0iljb55xhz186zpmb1pzas7xnctwo55z54b5azekae6diuavliuium476vap95adb2g4k6vjgni8h2e22gjoubod6zqoo19vygcnzznltzg6v9qf6tzrcvdiojjbhlkwpigq1cjg4k5mf1hzg5kiyybchvjupya64i1gbmg6xfu2mxhbp7jy4t50e6hv84sf7nfv6us3sqojdtdmtdptwwsa9ursbniexhl3brmdvavprsiip9v5cptz8cp75ecprdxq8x5ikoc4y62gbmvb6occ0tuplnzbzs3io68d24thiqswnuh20jiw580msaq5j4s5l3tkyvpdbu5kym0vky7t5fvgw590s5cdc3px1n5wztamngnayi7lhog7991f6wu2rsijtjfu4bldqy2fxi9y6kc2ezdni04xp40nygssukymdcauw5xwwikp4aqco6z7r8tf0j3bfmerj25meui0s3vn8pcctzgn80tm1b8bhez9y02gpzgxxa8ddmmhq6o5s2tibxc9l5pcv1dcrcu00v01j8jmcmkpnnw2hddyedgorez9ui0u27be6oi8txkdfr0avyoq6d169fo0jkdueshh7ks',
                fileSchema: 'qw13q5hmjripvvxtbt13tra586z24adlhu2kcpt1qu7r99cnrrngpmfnt4qj4ilyxzn8henru7ectg08rw0lk8op7f663d0bf43sp2m8ov32klvxwab1d6dlyvu3vwtygnzhobsd608v3fz0jngy02om49mlygq9xvgdh7fglhu5z6vklgrs3n37x7bzsks4c770u32q7lsec7nl1fdj8vforr9ksbyq2gkr4vb25thee60u41nb5xzcobdupywryulxcswq2pz8hw8i0vtgy0yx8s3qgjbc1zamd4x1g43abjxpas4jkd7rgw07equ85twr717h9oadlyo7wvih5r0x69yalr50gu6pqc97ogj3mdqunlaiq3kjtb32kb9zen6tph9ltlctoon6fdlq371dnbp46vk1krik4nal3ku8qc3qv2vcqgc0det4ty41dge3krlzxry549862h6h3iirnq55vgqbdhr6yr8ycb4eniefxxvvimvjrxaadrzx6ao800ym9pjuodfsx568sle07ayvur4x01uq5saqlpt2x25jbfr8wo10z7105jbor7u4jdhpo9v9qnm28hmalw3syt6l01yewz9gpyi94ribxw7hnjpf858r4hrgz7dyr1bf1jfow1js4ivn5en3gs20mbqz9iybshse70secuplencc2hy7k7xtnvux5bih17h4z1098gpotgg63ihn964uoeo2r843prnr7ukkn9dzcrxoxmvfdqfnfsg6ebywlbunmcqxxx6c2xvv8a8utd4yrv3ptp9s48jomr7p4hjt9rrv80rp41mxot0a4t9xkfit26zxw8jhwld776h7arsqgcdr8cvc8kkiaefny811p7bkbx281x98ifkd3lnf3uhb1a120o308ez7ktzpbk45wmqvdbi3x22y71gjivnp68da31srvr0jkulwnn3qg3hx485s71nsxdb1qyt2wadzmxd6dudlyz1m083toc110q1lm5ligfq2nfqlvwif',
                proxyHost: 'idwwg39qh3a0e4vlfj64nttsr44zf1o9szpal5quji837fwibi7i33rk10o6',
                proxyPort: 5342156293,
                destination: 'q2ubjd2cxkm38uit6ltqk71i5hloqq1gvniapn4eq0kfpki486tg4ivla9yv0prku97oabybn4jpkpypm0a5kgltblwcnelmjxol348w69nznke0dpdar22qnxi8djdxzosxw5o4q91kzbhgbweidjf6rspw2w36',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tau1auai4hodpaoi1xwrvvsrrf029o0soa6o2xfvuqdc9nnplwteowp2ag38zgepo4oubyg7q63dm7bw0hll8b5p5042wzg6dlp4u6extzh5rgkae5arpixly4fqzd2v2sxb5g5gdlz7eibgejqgywz5cyafr10q',
                responsibleUserAccountName: 'asmzc4u25k27u2k0qn51',
                lastChangeUserAccount: '9hzqfcosjb557xf5pree',
                lastChangedAt: '2020-07-29 07:52:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: null,
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'rt0m6yp835d9ys8xazxvqyccrgvs0cg8bv9w39eh9wznmbofm3',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '5ppxin0edra35imj5hzv',
                party: '8j6zh6wqg2g82rbb8458jflpwrskso50cwp3kx7ma9i6wuajz3tb3k3yxzc9x9x3jqq955ikqlepe81dnfq8a0vmt528n0p1yzullsnh3j45i7r4d8kyvx4fmbbjwh0hf48b6j8bu24gsvwcpaus0hi0foutao2u',
                component: 'pbuwmjh3g5bmiobeq9qzckubaz6fjevhp8tuhds7j9daywlez0zvinxx07bfxv6wn810mso4n4zs38zv817n3jxgjcwvv3mvs9npe9i0yvkwt979lu3cdff22indmuh19a9jngcbv7tqslfak5olt6tbe191krj9',
                name: '50hl9dehv9egccdqlaq3pyis64i5guxpbjzktuioos8k9hy8lny5ykjuin01vydkm0i53cgg511k1axvo069csgryimsko9mrrjp16fz04ej8lnk2ftw0cqlxh5wn4mhfxx582b5yflw73h1b2257y1pec541njl',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'opyvxq38lit9gw2ityzptqmvao9tlc8q19i3bo5geocwkoz8e4p6giwk31shbd9qatgupnt5yibydl9wkca0vzk5o97uqc9im2vh9juieeeqzdycf4w5sb8o6i1ji622jzw5fach2ltcrsmlorb96caczpglzeb0',
                flowComponent: '8fy8h4a5g1rsw75d1z1r8oakgs79e707n7ze9qz8659nosqf04o6ndgndrxuwjwl8nar1smt1gttl1qys1dnry9ifm4ntz1o0iuhbpxa4xja659al68vucf0bn96u0j7bdvtfxuqds3v5yp2znvz1xygy3b3hahr',
                flowInterfaceName: 'lb3xugccyxcbu1bsilggxyqizoq8i4ll9mtplyknfl5pdd5thexheg7w94bk8gt50xm4gshuwfw9euzx6esygsfv512lc0zrpwr3dxhdjy4tcz9gttxvoworqcrrinhvi7w6k8y8119m15c1wfa77j372ojzm7lf',
                flowInterfaceNamespace: 'q1gie1efaizuh90onzd1on0vpy8jboaimklpw6q5ug147m3hl012a2yi85ry8qehyayti661w7wfeappxv0yk5kzrhzi4p52k5bbx9f3kbbyo46d377ewdchb6h3nynpq20jqr2axi2x3qba132djrovr1mh6jwu',
                version: 'hdi6x8ktdff4ayza8riv',
                adapterType: 'i2oee28dme9m6g3wnq0laag7r8sngiwabtxxblt6l73h8hgj8r252hicfh6p',
                direction: 'RECEIVER',
                transportProtocol: 'mmasd32fjwnaixdljm94taeb5rhz9qk6quedqr78ui8bq9s7ht42kqka42nn',
                messageProtocol: '8rp2qftfi1ev13hm9bbuk58oq61mlq9udbzpbfuuwj6bpfvsnheohayhqo7r',
                adapterEngineName: 'qz6kis6e5kk6d0f425xqc36xc7hm4r697xpeam5a220vp2txbwjyull7t2431wssz5vq2b1s5m256u56k15satmexxfeuliazv1wvp1jsspkqasok261wnfvoq5yfv22y0w3fx2y3b5n4xxvw1fj8vjx52pszki0',
                url: 'xux2zpkbm7ofov4xy3ywx5sczz6gpeawy5brc428bp82aqzarnqcu0rg93j4mfog8u50z57dxunali5jv46q3q2s7wpeckt4idz2m7dfh3xwvraes60slr1efwo4kkl6hn1pktyjouwtrcnjmpcyi5zidgjkyuu4tywp4ky9haw1h9h5vzil0gaebna5pxq96l33q9nf118toavmlrtay7fidgrhp6lvzf0cibbph0a1tc239jqrdlbev4ywz8jd12iec83yuiy19k8nnhpou8eie9mzx08436ngu9zplbpz3c0hcvgkunquu3ve9zxn',
                username: 'jo1pnphz3m31qm6qf7u8j2944m1shrw1noj2oxymf4a2i62bcp0b0awtepfu',
                remoteHost: '8uk5vx7s7nuh2fglgfuqtza592i1p32jp475cyai91feb4kmd3xjcvptqf056u7hjysojscwkh7rv5fnqt8asa9wm9sr7ylcfog4a7hp9lvwbccbq0drj2fllakqe8jz5834m29j0lmf8wcacscnchix0yty4w1a',
                remotePort: 3294131584,
                directory: 'rcc9vxg01p8mi515sgnikztf4rv7ziz9kjlegc34yplpvw6018wija73e3i01rojqqdn1ydmofkc37k3wh6uq1g97uszty8l0ghzs42qys10yvxx4lfdk0b14658oqw91f3ffjug1t8k31fvpmyz5yfd1yezdjygkcp7hij2lv83usybihnpoc4gugg1puq0c0myfbrs0ozpimn5edcaqeistsiat7k9p73ala281fkv3nyv7qal12ylbe8fgdiww1t2nr6q5wbiuuks8olmtjxbky7d11r1eact85qoepu7lrhmlbkhnpuuj2v1eizul80fdwe967a9eug271setjav1il36soymtv4nr6n1lv7ysgfksp1uijtx0ufnbx3sm49sri29c3d7gu91oooy0frtj4kdii0hwasqop9gigs3zlt0ytpwvmi2dk1gsv3oil9q7axi9brt75lv6itbt9j2ak67m0qur2w66xqxoy2at4huuwh2bnytw2hnnkdtz1bf2uko49ttv7xmgiq5t5yz3su0swlwf3dzkgo8lk2rjjkwxt902pcgd00kw8mucjpx1y1yvou87yvx6sjxerdhqj025nbvwzgi0xnhh055elrbvpso15e6qhe47j5i3mdwkb9debs536p2eud9ivumivxmcachb6qw6vsr9988rgv0gdeyfeuclssi0sdaalrjn6pabw7n1kgle075eyd8fz2zzbos6awma06jou1qcke4ljxay261iwujsshr51e5w9ayf7622uudul97jr81khzq7vjdi8wcb5655c7fwha282uhxhq4audyc77hgyh4xlhumge5goskw0kzdqj282rdd2qkauzuqa8e8giks4exo3usan3av5kazhe8dlr9ezrjnprebewxwcewpvb32xkp4tq6llqdjcjtsib2q1ho3szwyhbm3mvsvpwtst89ip0l7rv0by75ea93la6l6479amuu87riovk197zubn0lbvithiicvg6pye2',
                fileSchema: 'lzyu7djj5odjeepauqedo7a0mckceqzp59jsxnwwx38ie1iztfbtpkz1t1s2qfquawmra20omrzirhdjd0olspee9myv8vadu07p4qmdenrol6nmw4jjunzcokbto0o1or5j61y5mthzg7ec0wjysitnlrid0rc2lasv4vixrlm11jxiek6dnh0yle4flwwor58q979usgc8vbc9xfgftt9wujcriscxg514udynjphk71inlwarndfb76i6xs89r8kix2d7e9xr0yoxhomh4iqecfijz04n604wj9mcfueqej7lskxip6ael5fvftbiecmd89haht45wvebbfrr7ktj7pb29n78k3dyf1vwizkqtljyrhceos2x35t227d3l4h1ck5fm2k6tdk1jrs8yib7mtftkxkuxp26gve0ii4o9tc4rtfikzkeygov0u58arvb0v2vp9m7snv5i8i8n1c896ieiyrcbu2sbmg9x5nzatff55k09y27f0kbxsnjj1g8ineqdbb1dhlg20t8w6dez4i4rgtfgbvhg48s339gi39gky37owoz5fnh3cg0oqrpeczrxy3znz8ermym085xi6um94bgsalemvf1h5mnumez2c9dwm4q1thi59qofr0l5juhq76suzc9td5pd4oypw7pxuhmrxr8yiupnr5es4rbqnox1q7516u5mudaeqi6zxrz4ley0azoup48vdrrdi1gy8zcp27yz2ikz72vbh39fnolc2diubq77lkdohr9bcesf720rznipxr0lwv8o0pfa6flxafw0pgarevmazuy8x6daog0rn7f57jburybowx9qypoj1ophkvwkviwtcs3notbixl9pee876tfr52nvy9kaf8ows6c0erlc9jk1yjn6xjueo09wf9uyhau6g5dv8tzvxzqrdhrqvopvbgbi19i0i2uu0abkr6t0h4qjs6iy1aqbuyz9oiemhatub3k8c2zxvwsphdfqakaqosafv9e8c5jpx7fju6g',
                proxyHost: 'yh6xzt2717iegoavszsuu53uodo3vin960qhy05t65stskbdhbfuwefbvzat',
                proxyPort: 7559218610,
                destination: 'o339rd1ojjzfimcigswf1ju43b21zj2a3uqtla3oao4wnkuox4yongy4xspobrcym8b4kevmzeujacpinlvt43g9p0cf3cp9zo8tzoqa8i6w9nbri66650ohqz04jznf5kby0bzoj651ty54afxf78y4bq61zmur',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8ospwlc5gbmcpj8o31slzzv6vu7e0znrmv2pg64t9mmcwb1w7zu1fxcte9ovhc2afgx6qqyd9p845te3yddft74tkklixtd90lm86wdrma07iashh9waqqtzhfosq5vu51ujb3m7918v78h8ohpcbdss3g70lm9a',
                responsibleUserAccountName: 'uapdotvcp430oryapb7l',
                lastChangeUserAccount: '0fndkxcm5knelh75y7dc',
                lastChangedAt: '2020-07-29 13:54:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'xpdds2dl2kq2terlwlj8ju1vpvoubmmk9hm9etih8x4jv9k556',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '6e5dl7g70hlcfg038iox',
                party: 'map84ilnrx4hw4r33te4b1jhi2mc5vvmq0q3jpt7xi04y70mcmosit1vnbbhgl1ejpodmutd8xy5fvc68z29xlk8kajrmpq07vd7fjookucyul925hp97tmligg55thzhfonwk993p9rlkockuuqpdfo8ptu9c09',
                component: 'woq4aid9ep31f1ynbi64mqhtasgv0edca0pefkkqxrzz298k5cc5qbjvrri2blqu4nsyfp4kfe1i0qltqze69rwr3uuigyurn9yw0diz9mhzfnl7fe633pwm367azds1juts3h9ash9m93pyz0cl3tthyv18z4vi',
                name: 'jb0chzhq4yn2cvrp0ujv9fby8tadaj1excvez984kc656h1duf4pckzyot1n46fy14pd83tst0r69p7kvxwxug6frdw65m4xt3x74pnk5ciifz7l5hy6su8cakcohtgkswzhywxen6r7v4k02o3rzyogy1n29b4k',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'md75i1innuybw8ptwotojekyk25kh2hq5gqy7t1gi1axwprzpfmsyqdk7dho9usaiovuns839ov627mzy016qio9yr18dmn321zmk0sl5hzcn42k7iqfx5edzlyygjpj1ol1bmtqouxsnmuxa45ngeab007fp1xy',
                flowComponent: '85ibpk8rkeup40ks1s226yucj2noegihvz3qhz25qkx0crxtse9xflnf7zxa7xic9try12vge2cgzcwypg2cdrwh9imap9tr99y3i866jp3nk6gytmwd7nadp6eqa99rpy8rerg9tom3pedvofmcwjs3l28gggnd',
                flowInterfaceName: 'ffvkz8xsno8q1jrchh900a01doeo2k6ez5bgk715tscvsan02250boh3lzihgfoep74qzqo0k6uwhn8w8r4c2imwcpcr1df58bsk4rd1qhc93m96gh7jiap2jnt7dq9a4lryywfxl4wojp28t7009o1cpttlvbhq',
                flowInterfaceNamespace: 'l0rovaw8xad3cclicx427094q2wtxajn0hjcuc9ai152yttzdennxf3xp5urlzgf6zuvry8onsg33l9u17oq2b4ssr27deqz9ybpe8a5th2h6ts1s30an4eic8nzbdd9rqlwd9mj7bjkoc4sey1n4x4dzydac0n2',
                version: 'ibmouzx7kouspipc7l5j',
                adapterType: 'pz436sz5k6l7pm3f58gm11l04ann9fwfo3oha1rwubfro7c7t9nsip7i5rb8',
                direction: 'SENDER',
                transportProtocol: 'jf6f293mabu1c341hmik1fbi5dmv91bxbbmvwjgy47l8t2jkz02t1zo2sywi',
                messageProtocol: 'huk7pxh3lphz4tu1jsu43ze7sz7kjfjdh0lvdoqt2mxtfpgw4o65pljriil1',
                adapterEngineName: 'knhga83gsffgg8ptxsv63pzrduxd73gx72mt5ew4ibyqln9hp7ifgxn9bdhaug4tisbwfa50msijqhahdlgephc9vnmpxzp4db35nmgwmig7oe698xoxf8ple6uzpt76hn0su6gaevp2djq2pmcl1eru3dqpbe63',
                url: 'klgoqfy2pq4ms5m1xahb8l8uvzctzazub175rlo1w44d48yzwgtvr3zft7ojuaivh1yoqs03jd1ssif80estua7rddllu2l6pw2peijw2zvyhdh74opqx4pzsem8igdpbspvepf4bcd3xhostee3uemm3sw2j3udrwdwpi8z4o3iwzb3yziutbwyf5o35avyunsujbbht787ax333gc6j1s7vbb1gqcxe1e2148ej7vbw6jmbs56afaztnse3bicqyrhztwiu70p23a0urtsgtbxe1cfsdvj5oaprveq09552glpi5b6pk5351p1ahwx',
                username: 'oa7bm3ece36u8rno61khfl7g5z7vzwnp8et81kxjc0o8246zscemz6g200uv',
                remoteHost: 'vhsqyqo57up9f7gwpz12t9zkxl2kcjrrkdsqa8iw29z3cbp3y5bq6lsncqpaaon436tq2odibwnesq4iu4kqce3uca0i2hod023he641y0knspx5vgyjx83i3b9se1jiozsj9vbnj7po3dexkwjwx6erj9vc2007',
                remotePort: 7227104596,
                directory: 'xy94nncdttja91o3xvnfhur4zwvd68tu1p7kx2xhdds7r7qye4hqxddxoh6foc2oedfa4u5bx1kyoe9twzisr8r46i43608saq6ea1et4fmmcpxrj87drbhm7l7qnmawct0fc97qel5chnyeiqukj96h56q46ecs747yfjagwxjhqpji4t3v8r31w490g40xvvd9ado0atyi4derm4hx62v76ihlcqmxjt9w7qy3nwy2y4828wbo7unsin12nbs4nvxjun4v172940xuebryf1b7vfl27uspf9qqchu358fod7dges65m1igkrr23jnbi32x2vzov6uob94ivxjp4rinxafnn8o9gprfxplsh2w0qpws2cbbi3cwb0f064qb4o6kqpxtpe6l8k6k8gjq61h9ehke1ob4ou4b6w7x34c8iqvn4e5663bzjonttcvow8ihtkgjf7yjro6u50l3aslqbeqki7jbswh2722h28g02kvxi07j7xw7bhoome3ztsvkt5zkqmmjvlnsktxirvd0gh5acxu7mnelcgbdfttgxam539x9vrmbzrlr2xjdezhmoip168r00a46saphjogc57d8hrha6tt5q4b96v2jin83wkqn00j1crghfhuj77vnf7xxelc5on68mmb4ftbeo8jsdiqvjs7srmhi5cvfh7sqp24qxyrhxa6t5nwbc9wkt8vx0ww92iay5bl40eh5x7yshdye0yllvydqrn1j3qopyiyfwhpk73bcicx59vu68ccjwdmv1t1ucg30sz6ldytv0l60yapwdmy9fkqnrqwgjb8s0i0kpzave8xsbw3pf3uczsp70jyl96igd8zeaw5maqfelosr7c2t7f385olrr0ndir7e19hxmjz5p3l0e4wq0394f23x4xne2sz1rra4k6cxrx370km4p0bhsfxc3uyvqro0kr2bq53vndon583u4rt4g660f2i8qeeqki2tb1ycaid1mvokt2s861rrqz0pywrl7djm3yt3',
                fileSchema: 'cp3hzioxjmqqtqprzeew9k6iwina3m453zi1mj4m25g47a4mgazlsfgwlxxbo5lu0cbas49ept8z6vbd2bil0o23c6o52733pdjmv3gzvhyhb38bnj71v4z6dishiz3rl4dcm0w8yruhfhjq83okl5mgphedsa4o6h6rz1on3webj6hxg5czuzc1ays7u5aywzlhc0ozgqssly4yqg64slacimldxfi6ufg667x97qnfcdibpi03a00ujr3karimamvwhblqixy602tzoqlmtnp2nbfq17tv47ci10exus0yhyvczf75ivatbtyry7ibrmhwqmnv1axr0yprnctg5qgxgi608uanz3ju3qwpzzpvsj5ahijxfg5md47meetrupvyapq3coh2z1q9f32yyerth5lc2ikle4vqemj3jb7h84d7cg1ilfr2wryzrkzy7hfx80gja8xq9w8tn16xw3mdihqoqakg1tvls56zdjfs4i6avnrfu50pgc5ikw5xlsw0dzrpc5hk48otk2lzwbbkokmpcpg6y3azos70v1043vb90700vqd94c068zrsosk69mlrr8f5wv6zxpy6jyd9adx9gu9lclkm4e0tfz26e1nxlcxsbnzontay7bu33qej4pholhqaxhdm300mx57r539hexads50z2chntq9o06mdoh3s8rixxrxxbj073wwypkg51p8qct7lxrevx3f4i6urp6c8i67w1zc0q0r5x1307bukc31rp8457sm3hogt6b7ubj7tvrenqx7diucxn1zmj4o71z0czieg0baqq1t7p1ej1zaj15ya2eo6qkk0682b3bogc8zjr976pqu5vgn6b8fel0ho1ohnmp8mzqx0h2dt4y4duwimccm6slpqimh7jntvl0rclyaqzhzpk8vfemt2iqe1tp8hga9p6ztd17v5ros9gvqhdpvskap2k45vwg0sv5hswyk60p8qzn84m7ubx2rcl8ga15t6ukuijx8ey620lpzgnx9r',
                proxyHost: 'uo1gznz14bj46u3t6334hubonomvwyz24ndbhxbstocw4maart5vm9qyp4bl',
                proxyPort: 1461716561,
                destination: 'zaup87gvi6xegqdj9ffcabj7kf1ylju02vy5v7te148tje39m80vkfkbouf2iq113gam97q8ub2rhnhe4r245rpf4tei772hixqwjzqh25w6hob6diaopq2g2jd8jzz5uqd600d2l30wmigb82tcfkr4vr1kzt0c',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3062go25jmzayskxth55207m2iiavruwmi3faew1xef1zqsk8c1et1but1a01enukkfbvzn0jhv31qqjzprcms2xurdzvk5rik2jxfc4lgajs51e6pvbgq246izttm44mfnmv0q6dedksu95rk1a8ygq5v4e0zxt',
                responsibleUserAccountName: 'ho9lip7w3a6gr0avdnkh',
                lastChangeUserAccount: 'kglgtea5i27o366klqk4',
                lastChangedAt: '2020-07-28 19:10:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'bwwaldyi6i454tjxix1zb4kezhiuk8mzyl13341q',
                tenantId: null,
                tenantCode: 'hajcmutroim9tp6sxruqjpfzu1yve8qje9bb4u5416byv54n18',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'csvo6vewimw9r5he4hdf',
                party: '4bk391ojl3gfcnyw7mjjxiohicrpf4zl9aoi0ghsbbhoph593u7y4mmyopcecaj0ase2w5nnv39e21jkp3w08xdyxgh3gop0eau8zxv4dn1w0pae5wd8dee4pl0ampt9dhp6i2jmslv9k87a211qshocy6fy7jcr',
                component: 'gw3ptmyxcxybibv204u2l6546nej2vzbr1c2y7hhzcp72108p9gln31jroh14jrex3varlqgh3ymamgayz0y0ll32hdoo1nn68kik383ia164yiggxhtkt2nrahvl33bww1e3sfhlh91jaqgtnr57qrio686l8bo',
                name: '7lzgss3izj7xa1kqu5fau1paussh5jgl6soqyj78f9duer7negm1onq24sgmmq9mvscvigdl0yf7ql608ao4if4mzzt1lq0s1m9r92xj6glwo7bd5azdp8x0grdvob4pia1s5h1w7rqmjdqw58j2e8pv5wyun23b',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'tvw7mcmwgwfmaf54eqs6r37c8ccxhvfklx9mk6jca1yll9bxjhl1yi9msf63h2n8yotk88pre2xe6nvrdzh65f9o069gekn3lki7kac6zgypvpetsgz1ix0mkq5n02jk45rjdja4j7jwkuqn5qqpv9mqq3n9djwv',
                flowComponent: 'r4cjgjtrjgsiedy4j5g5lpyywxjhtfq981evoj2aipseacodfgt9txl5e0ea26b5dcgosktsm6rz1fn1na76z7pu35no7iehsaxzoi0fvgo6ughl1d96oxvoaddrfgyg6oldbsfw8ztecjo8icfqfja9y4kcxtz1',
                flowInterfaceName: 'j3t37g1u0nstj17kwr90s7r7u8opzqu1rehuty8918biw2jdglbqcdd7lz860jou9i1t7fol74erh6rpmv64dv2jm544lobnjich3f8gmxl3eh0wvoq341d4vv4w5p79wtbprfb4via13pw12n4febwddvcnpu64',
                flowInterfaceNamespace: 'dty2v7h73c043wtzlj5t7npa6vr4rbg4x315e3j069nbk49uqodd685oi35zc1kinwjm53wafxip8dsnjiiqk3ibd1140s8s1k1lo2k00mmyi3c6r2kb7jpt1zg4omsaq8h8r39xrnxq8iyvp9fsts6ii7pzwfzh',
                version: 'if6vfgxrxkn1d0ri2jn6',
                adapterType: '7rzxyjddkp4kjlh14tskpydutfhrqcej30kc1itu9mevgdb33wsk3ttv5uch',
                direction: 'SENDER',
                transportProtocol: 'j6ndjaujgax1zqm3s8d46pk3lk07i1z7m54vl6cso1bc7oui4mc7ndob2ncw',
                messageProtocol: 'm2qxzinjy0qpaj90jfiew75n1oq2t1p6faca9nytn6uwoc620j9hbdl3o9q6',
                adapterEngineName: '6fcyd26acykys24982ag0lbr8g1s52g69ca1u5zdeufnb1sjz6t9nueiy4jvhmpcxvrgpcq6k9vthe0xbq9doxp20i5fb1zwtem0nhlwuinsrybdylkigq5nyv9y9qncbi32k1kml50okbhfyfuktslx13hzkril',
                url: 'yc7fnqspk4mnuqua47qawz6jlbqscx9gs43s0qg96gqlfj2222473rn0j4oc7w8mqnh216sz2hexeemj9k3uyq8vzxu5zlq1i96g8f22i0cph6iopvzgtcao55cvy7sv8ioepnmsu3pat1ujfqr872x6sddlzexravuooqf2omtqcx9ihrutrx3a47tdd2qqiywfzo6oo0mhdnonbw8zkdwxrv4qqicieq29awktk921us6rpot8qvotp53hv2ay65l8wf7l20b2ql5ses96qmxqvlbwpns92eng0xam3u3yavtzaz92mtc1cy45dhjj',
                username: '8h6ot2je9o1tmj2utvwgmrgpf81yzr00rrlvg3bdjp299f7m3pcy6ckimn6p',
                remoteHost: 'ffnespxzemz1movkqoqg0vye9vipt5kqoqxs4j76w0h5w1shhwgxpr8r8kgec7i3rosmuxh6z2gaslbbawbwyb1u1yuk8gzehdny6kq1tbvh2gjfr9026rb0p3hbj8ndnx1gq12k8tcr2szerqc875hkvdcz272e',
                remotePort: 5899099279,
                directory: 'ghrfg5gmix5dv9chlp9kux6maxjet3nkab8l1noe6hvlzcxq9cool8c1ezh4ty6x2u10ke5rvhr9yk45wt1a2zeu5nxxud9txwve0y8jqfj1duqkk789axbuqxa9z1h0mt0xpb8whx7khpldtu6jim57byupkknczknjbhso4wlhzo55s3pxw5p0hxr5wk50wrpna2ysj5ijd8qw526k46q6rqacx13kcafollhgwjhhdxf1spcbkuk2r9nz48au000gqunncsh4g549bvnj2vegpnd035tv2ootq7xgdnynpkoo99zz8gtiszg9vrfxl6g50fqbw19cdlq2s9bjsk8f8x17n8ef382cu299o4voikav5pai2wepv1btfiurzhia3acy9fmws9lnhssvcej2mc6f1pp6fndlsrzsk5tukzxey84tpqyvp5nl4pncni3v21idyqw4fw2icj6f9p267d0sdnd07p4fvdlc59vzwwhpzax38oknr3z03w7fmjlu9w9urr4uw169wkfoq928g7nt0q4mgsz2k87axyb26t00d2yxk84j350qtmom0ip90hzf5r490o8rne6lij2n91oh1ylaq8jvlivqxu5xaoojcqx519n7bcbxspvml9nwrapl9ecptyhdyb7pvt0apxl02fcrwt8tvtdncssfnu2qbla5h08hjof0zll7lkibj3lmiirk9p1ob0hzch5jguxq5bbhgsn0c154qcd8cxptgy0i49jssvz3mn5l4dfwpxgrh5cwct0keqnvrjgw6idyf2qbbjf6xjn9wvozawjy9njuepz0khwovaxh7dz9y4w6tt302n7lleh9ny5a3wb3mm7rmm52zqc5urqaleoxbwb3xho05d9bl3sm25dhzcrgj4intahoosaetrc4gvztlvbzycsffybdt4l0favwsk5d7vvg1jnqdpr7miv6eb1ljmm6nv7vnuq6pgv7e1advq3y3dujlbyk57b43h05eqw5spt0jajsp51w',
                fileSchema: 'nhrr6z9yqau8jmkkg5nq50cozxapii2yektjuxijtdib7vixses1q2314gkccccv5auwwtybd0fzs7thorvmokqe7rcy13k4tqitydj5bjoww3l4d4y9g3sczjn9s0fao9ipbiw0vey7sbv61x0k2i083xh3kj9kic2mufonvwkywgdgx95k93gjau6bmoj0xegryv21eojkvx2y7o55iz1zdp0hhi49du6ua4j5ppn4ofhmwipqtc2pjm92qdxzd2ht1vvbkbq96scdijjnfi19q7zym55vmwvrcwmecit2t7quojk18le3x6itjs30ikuhzwz2brbqwv2a6ug2dcb0kwe49fpm7ur7tyomjm346nus9y72wil4m3fe6hqme3rebaoid6ym831iv03g4n4r6j5v4jahme5kodbsrxmyqi86ewb5cbzub8s3fczing154qz7p3pg681fz9dpxfuerlb1nqn2y2tqkh2bf4jka81pxp7enp6p1mcdr7ls2ncfh6hkpvd4q3h4b3zdja6s5rqif8uctjynnxtd0iencziy39rf8r0m518a03v4o1zbhk03eyzno22v1ir4m7ldfypogvy9j74hw45sxvesq8l28eyub92lxvl7fodnx4i304qso0qocen79x4revmtzn6upeb4n6crjnbigygegxvjp3ezacongflz8x69nuscovjw8f46g285mh14y6w0ejy7d0ubo0z4kizjymxjzfsjwnw4ok0kg770mhzhzk09ojvwfx8pdib6y8q0x05rjkirpppdhn24wmmq18ogsxw63x0tw17z6l5sj82z6ychtnu64bb2nocxf6vlx6nti2s1ti5ugmcrknda47nx3zhjfqsnricmtkrywftovnqbo0onl1snl2eze4k9iqngt85v7zf3v1xlerusq6p6tfkdmysn9n1al3tp258155rh11x17saj0zpo7m65unan2n6bnuyrdi2qxksqbeun2k1fukxtoxtd9qscm3nd',
                proxyHost: '4jylw6a1shgtktftsksz578fyw2t8uagqb2jedkjr04ptfq09sqa2qyyxfoi',
                proxyPort: 6322133087,
                destination: 'ryacwilkhtqjne4esxcabp6oxeocmujxild36wyij3lc7ftz9tzke6f8rffaile8xr72wticjodnvz04bsjyrecpcpquwoq232ph3esde7gimi7wm7m6ktjv97m92epq3k31i9trai0578tfd022hvpz5kfivxeo',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'lkfm9ax3ydv1izlmvur0as2deipnezqht81t8ava46yhqhlapd55jqmq5x3aq09fy5r6os2xcqupzlbyn64dopd5a97ttok0ayqm3lie6g5o5g92d1hyovxhdqw6hgueqy7nwi6w4xd98f1mvmhqr62rtgbnb2o8',
                responsibleUserAccountName: 'nt6sxsuux6uwn4x26upw',
                lastChangeUserAccount: 'o5uziuldzj148qvgb4h6',
                lastChangedAt: '2020-07-29 04:28:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '5vffir10k584jhm1w9antgk00xgb99hgwj9ahm9w',
                
                tenantCode: 'o2pnytmo1zoxssboz9e5rb9ws5mqr8890y707ur3nm2i8ernem',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'kuecv7b3md5mnu5wklgk',
                party: '67c3a1845hckocvlon4ez2dxcy1jo7izh74pdr38amzvraof3xmwl8eg35e7o5xzuuyjkjg0j83m14ji6mpvkn82n78602dla7gcgy4b5dg8nx73rxb3kwxw5pgli3i8ht1efdfrcdksyzs5p361tdobcff2x87n',
                component: '8uztfrj3swicnte70pu63m4e242rpwofrnm097ptd0ljm6snn1avssgfm8uif0nj03w5ol3hlj9t8tvf1tjl6i9wwmarywivgxgku8rpk5mbo21ei1yyi0dvgtw0hnvtwbgp2plsifwt5eoeuwj31d7zcll4rk1t',
                name: 'z2jtxc9urcs7sg8y433gczjwi6tf8o20om7u8dw0mhf6g1y5avvms87muek4kbufdyoj6md2ze81p4mtp4j4f4fg5iakan824xuynz2myqmld1vbtqsau7szqdr73c3n6ufrcdsjedy6cpoysl3zhn4baza4v45f',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'tx4fc6ko2g6e37cwzhdrd99khmdg2ago5ss1lvjrea91sf4tqkkkec4gzmvdsppjjt5ecd4c0h6gkueoyvnc4r7e2ela7uuo2ntvkzzqjgp1zgrjd0guet22fdu1k6we6nktm83pfuciwekajwdb7pk71vdt2ri5',
                flowComponent: '5seo41phxyx2d7le3liy5fv7opbagssdcrirbdmm6bd06ws53hgjgghm47g2kumlyzqtth71m6r2jgs4nviu1033q4o2161pvjzsz0xidj9thwowanueae1wsu4fwh48mpb0yvry7hibih1sq8qgl38ygee847uk',
                flowInterfaceName: 'keruudpia8moalceqrevue5je7lzckl9wci6kk21il6u1bu7rtqdhpfugajbayl4fott2b4ll5mhpt2tizd2h8myeojswisg2q78oecakigeg3t6wog35p6zxuc65ckxc6mmd03yc8qte671l2tmvbscv8aeryyz',
                flowInterfaceNamespace: 'kqfs9544imzcdaqdil6h7nz8hxaby1ngvs4hcvctsf5145gnv3ffbsntgy3ev6f7vcr0rygy6yvblmrcsp1hukwe2rr6wqstzicjtyma6sz6kj1nyww8col7cocnrdba0xzeo0h3cpovrpurqxu9pmcvz7w4n04i',
                version: 'fy3lr7yjv2imhzip1e72',
                adapterType: 'f7t5vxnj0dde9bglf4pfidsfb414xhccvmvy4r89g3uaqzsph8vugsl0grtg',
                direction: 'RECEIVER',
                transportProtocol: 'b3305ehlrd8dlz7aruh75o244em7p2jkn56tzodkchswr6pwh9etdir1dgsf',
                messageProtocol: 'bakgt7esyuoj45eqndsg9xl6pwm51rtxtjy695a4jncu95ie52pg1ov66u86',
                adapterEngineName: '3tbxcwsy5dncffmf2021tqhqvoig8wi222818cgbpyvh1c20v59dlukeia9h6md7obxx8ygvah0mw8n54zfvpb7l5bv88h0goookqibr0j582y8kccgt5fq70upe39nkrblofzqxf9ybga5sj4x41usb1gotx7fb',
                url: '1h1g13snxdreg1gonofhuykdt9bh209rcmykelm5ps39jmvn3jxp8d30mh0uskp74jdanrvmj9w7h66feo6b3zmq1koc64lm9lm894vpqmg4ghf11dgiju432q6mu0zi5mp304mo6mhcopx0ubqiyqq9qaiikjnpr6obdo4g52h54ucxwtxzj2sckwjxv4n3zbbhkepeziluf9w0p02gzxnwysqz619ytn9ow762fsgimxom65xavz0w3yoylc2g9vb0pftj1qo8pcxinid86utp5wtlqzhwmznpfqobs966qn9g2mukw7zaozepbulx',
                username: '8zb4nij3ov27kgm9oqdwg1nhvvaj8qkaizyeo0kkxufh98moz5spyqf6ig8n',
                remoteHost: 'hpqdd1dykimc09f2eb4ybxv90ok7kmtev4az39l8qhqk5yjxdqf9jd4vr0fxp5nwtbk8yexckuy8dx9ivq44kt378hk06n09y4owrq2fr0wwkb23djdqln6i3ce5kvzn0ai2rkrij9r902diqpd0yzc3o3kpwplb',
                remotePort: 5086885784,
                directory: 'vpyjyzrgy4yluncsnerurwbfs4ipzet5p0yc9s12pi7yztnxp1craqedp2pan41untb5lhtora16v8mmm24aqpm925oahae6o2k0x5pgur3gelevlc9m1u6gwiwydgr494dllbgcigkuh86kzyuc067nsrj0eg7uw74i6nzr9lqt0g64sh57nhif7odvhbmvi700rehhzsyvsjp98knmawxuhh9s1uf6i99bnenmf9rvreds7pcprs3awwb9mp67joqnm4nrvs2zz1zrqrqheiyeucmzufg7dhejts6qdrgz4bqeg4cp8at9d6kudf8q9nrh9xoyxfz047bx0buf67vtcgsybts8r17hzyyucw8wnrnuffemeem0qc9zs9mkiutz6zk3nhialegh7rq5j148dss356s2n2omijz0qzxw5kclvkbhr33l3rhjyu3g5hz8iiyw4a0a0cvf04clncvl4ad99x00i542guyodxdceku1texpznzkszd170nz48zkg2grz5b6n3zw18ocq2e5n4qzxdktda4gbok2k2sunm8wqqr1et1jyve930qzj3xa27oe7m8kr4of315gki36fpytet33ql8p24lbxinqqs2su4is7c6g4ggi51fgns1zndvjvmntojrt1cescqvzzo0s2kr85exfjynzyc0ci6v398zbom90q22rscqmlf6s8ghc8g84qkr2im6pmkspdtzhklqgjwl8io6yvs9505zjm60812xnmnvzpz0krwmvoig9siy14u7mse9wdore037njbouacqmh5chfxkyocgln411hrq3gzcnhs6hl2fzibpwsra004a6w9673t3w918brdza9eav1ha7h2vhbxtsuhj2oxf83w1htdeukkv7t0gn14c7opk0dygnmg9i3vhavuqfaw5ud9gnvba6nkjwn00p1vf10pbfyeoqq5krujxapdedgtq90bkupvca8ygt9jgqjc4a8me5ylgyo7miib0z0la1bknpmop5',
                fileSchema: 'hqsfrnkza38bmnkkgyjb8gbfage007wxlcy6m61k59aa0ehgh7wwoalc02trao0mz86e513onsfn9nd4t8lgmzvujhwubvazoq5tjxh8ygzn5n83um656d4jveywb4if9cnfp4porxf0uy7gc79upo1fc7jl8pu43ca4zuh8tg9sllf0hu1eq75nv36m77g296l28m8p8htu7ox41yc5xo1gnn5p0yrgv093m48940uv6ic2cwbtlb5o73iyzfuuferfe8s8l2jukb5t1i2v09pxhy5guyktjzlgfnam41ypywp4kuatmpx3x48y2jkzwug4r4j15mma8fh4956x5cb87wdtugyixrjp8a6n081jcee70edux0pl3twauss8pqi8lcfm0rryr8djt829e2hjlhla257uh16fzjgk6yigu2jjh5cg4j7ozr0u2fgzltynjh6g5gqbjso8fu5gq1s3bc244ol1orkaf82snev0sqy9u1mbnxqg6mdgxpjrrl9zs09mxrx4igrveviggnd2s479j7tinv8jtd0dbna63djs8z13pd1y0lc9k6xss419xnfk61ost7q53s3dw7mba12hcpkkppjvwdkd31d10sgwb5u6wiinsmmxky5971i8gn02uyixtx4sg5exnmpu1u1borhpqisutopzrbh32sugd1563wnkbbn59b3qdambwu65s1lzdosazuy8ogmpjlrwjz2u802lr2bhp26qh0qe91bfmpnwwnnftmp482e1jt3urla40d7hh3l1ooatpzq7wpp6yp0bth9hrpw2zlj7g05b5nujt6n1kqzwf6gwf7yofs91ee3hwrq15rurz6p80aq8on9ahzenlgdb6nab39je464bp1685gmjpwubjwqsx95expe68z0z62hsfgm36tm1yiptj49tknnnqwppkvhsouxli6h3ei55qvmvyiym6r4rq2d0mhy7kga0m5z8kyi1dkwiad6glcio2o8d7lyicedc1nc899jn',
                proxyHost: 'sxetzuwzq9trp236pgqv6i811qesvjxfcyow9vrr98kitupsxw2au8ofeu8d',
                proxyPort: 3519095670,
                destination: 'bbbtnrda3d3i54rsxnrcxq883e65wav8puq7n5zot8d0q40cvfaoz9stk3e0z7wvsqjlj8g5a2k56fwqakua6piq2xjuvbtc6maq9327bdm1pg9d9e45g76t5abqqpx890gdfizlrkwc79fi1tczgn2j1ju97cn1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qyveh42nf8o82pfiyjt1stbqxcxw2zq7nw0g48hi5eulfd7xgz3hoeel3qf5bz2ioj2dm3dj3wdzdebswn7660t011g26tcyas8d2h8b5tzjtmzft379mprcfwj5xj2c0xdvh7l33o02epcggkjeccof985d96g6',
                responsibleUserAccountName: 'm1lbc5w1uzfryjo5dab8',
                lastChangeUserAccount: '0uo9j49gqekr9iu9shy0',
                lastChangedAt: '2020-07-29 07:14:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '0dl4l6fgav1oafcsg879i66h242qd2y4aisvb4gb',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: null,
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'eavh26w4ix9kaxq9uuqw',
                party: 'ydl2fv6903icbbtif0dki7thjcagvf3bi7cx0t0lac0507sdba1fbyht3h6osyc9olxa596wbx301pb18ogl9eut0i80cd1e6mweidwafg87piseqg0wsvg2ytjnj60lczxraitto7fjba7gqrept0ivtxyhxcwy',
                component: 'vy07hgmar9ipf12ovp427w56swk5tsnxcqkxe6iq8dvvto4bpoewfmts5vkoosrlqewmdhabdmwi618sfprwvw0c8cgbdy2mzvoi655nofkd0phjm67hphcmrz1uu0f50r9ipx9heb0kopbt4x7j2h3p3hkf0pin',
                name: 'xhkdtao2e1ywqjflvtlx3pbz3n2tr0ptiwazsr26vd24deglbay20sk19x4s3rzm3pzoykr7bunli7i4ad08xg6pupuatp3dn169upqt4w885fy5rteo5hbsqxck35xyjcrb27940wzl5ah71zm3x6hyja3g1j1j',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'c831cujr6a0ibp2cv71thdw6pfmdvxn05000cssgsl3ofj99lkxgjddi6dgsq25ue4qdpbksnc8756lp8ewzic6bowgq2uu33ckfktvp5zy4ba4n94c9cth8vuegx40vcenxdbq95v589r3sym6c2s74uc1ug3lp',
                flowComponent: 'uzniaw2t2lpvjydpkev44r6oyy86k773i9v9k8hwqelbmgu4qiqwfg97vn1lkapudbbmtwj30y3h1xnx4yvgag5mbqswsg2cw7hoy6px14sf9j5ch3p9vdxat6kvgefzu2admqjs9kued3njcrq8mhh6jeuasqw7',
                flowInterfaceName: 'x9se8pfk7fxzjrqwe4dr9jqznib414cikrqnou33lkgyjtljm0jql8625g2tuvza64bdyo9p5ssbb9d4mz1w9b5lj2cxy1qalydg7y7tm5fd4ta2zyd8nu6fyqdtm0gnppe5vno5gb5l53qcbkjr9c34zshlmt6u',
                flowInterfaceNamespace: '1nfju01w20ib1knjdf4h0u1s5y7ot2zjcdrm7tjkbbzwduyv0bs47fi3oioxzt1jenvbfk4xsstx9wsdzyfxpjhqbrrztjjp77mg9k8h1dnfyi5w21891xnigujepyxramfv1xavs0ou2izjhn5ui6dhfks3p82y',
                version: '3auk96w021c8fb5ky5h2',
                adapterType: 'pq8o90t3jgirhc3jolxglxur2vu0jj6e9ary0x1mlide7varlhsjva71sv3t',
                direction: 'SENDER',
                transportProtocol: 'h6cbtn7qedhsof45x50n76iqcc2x19c22ozkolaqa8lw3643ta1ow3pj9kci',
                messageProtocol: '6mir0ql09v5k0787eokjq8x8f3fa0o72n7z9duatcjox2i2dt5ppe61cflpq',
                adapterEngineName: '74pcnx0jgf0xhyxrbkoxyv8pydphpuuw3llktqrhpb9qdufei8zlapxm09zihd1abbc8esvy7ahc20zuuz47ppxcj4khtp0rbxuo5bkg9zijqdxkuse7w7ecdpzne9guw74bpubph6zhy1bgwlpnf7z5uhjampr2',
                url: 'o3zfx7zry4cr8llhq820fliwsywbty34cj3t7axfjf502cexiqenga4l2cbrfl5gg17shooei14ukqqoqosfg3us9kq3gexzmxzb42iktyk7ubbn4lh1virwjjp3henuhlcc1yz7z3ac23hrgvzfjr7e3zteeglb3vbfnu8zvn1sygv5id8wpxe5psqce26jf15wwai0whugxq36mbno09ivrilnnxug6rzzyjdfs7qyqxxuo1453k3phixkzujckzsgzflofzaoqmbxlqdzn1a6smzahcbxdm21us5xv0c2vhbcpn1yl6yihz637sly',
                username: 'kbuu88bzhgt1n84abpxxuymu2641l9n2rcuyuen1n9euhcyim84bc59k3e8w',
                remoteHost: 'j55pri4227mc12vzud0yrcb1wlt3gma1z6kbejmm9hcm8aynhusfail93mchd0riwuplszazufckyaelgo7mxkttaj06rf103vb3imksezy822mspd4m27utwxpahc9wom56eszafa40f7bua8kbfokdefdjgxsb',
                remotePort: 8956107511,
                directory: '7zcwkstfobfflq5odpsv8qv1sq1xz6jvquck3oig38l3dy0mfha38e3j3bllyp8rr4n761xnsprdhnqw2vvw9cwus2ump9ftqe8zggks3khj07lce4nw5e7beg4ssu445kcu9dg7d54g0co9dqreugwd2l8btigcq7zdk9xypr9mmg9v4flpgjmt9h8psetlu5thirdf1r5w0dww3d7uxcklcr131cxk5a8ddxwcly18uwrqtkci1q366flfm2mznkxxt0p8uoaabzuvsg4hl46hgq8jrjy05zcp1re3c779l579mrysxbb64czoyg5c32krgsjvnx548x5x3alykfsfq1ovlwyjxd3zo3vn9wc1ekpwuac1ktwl3dzqjom8qpyqnk89yn2our5upn013im11ue56p2gso8fzn53lposirxv139oiwgu8qnzrnxo3bygvkeuluc3y5yu130nmlmtsp80agvq2n86cmkaxk08bkjfuryp3ho06w2c3g41tjaq89wlzfut050tf3mxfr1k6iclb44iv3nmfzjvut9or6rfoi0ouryjuk88r0gsg69uyuxn7m129ti85d67i9zt8pwaq1q1gc9g8sck85rtq2jmfpjn0qxhci1tclz6wx6r25fzv7qlkuch60zq99lculwpdb5zwcw96j65g3mlzsf1jk24wffkmn8d0eexr5wvb8vg7anc169zmeyli1x4u3ol5h27wo358qafzsrxxq1re2u52wkdlnn2vlohckoig76ybzz9oqtlxmdd1edjqjzr1a65adwogoio662qtdvtmwvtgc032lyy60vix2x7q1xzph2zxi5zdds5ewmitmrhpj5eq486ophzq429mm97ofhsgbtgxgdj14xs2ciqae3cq9bhex5plr5tkurws860rumxwttrz3ju38iokrkwyjm0fgny2llth72bgi02o1b5wba3ngx1rkn3vd7v2gysz3csz9lkue95x9vqgzcw7lqw6tf65z99icft',
                fileSchema: 'c9i8kiwj3877vwuxn304arwfwn95b76ljgaqsv6a3g07ntmnvrgjzral886dyhxt11ylqicmdo0cewagxb84294dp1nvcanjgd3aha2u9ml8wveedfevn81sxmvpkn1v3zo2opmfrc4qcky92cnwt7qglr7cahntb62t7v3wjps4yzzfl54sbv18190i8lwgpbhiv6o9tizs8uctdard2wzynk63drovjfas503i5ejtpibf6zxwa5iri8d7x113ilhaolxka07oyh62gsuhgnuu3eyvgj566e69m1ifjnfonwgl3038b6kuglfp6ee3s2ztgce1p0d2ld339ar67zfcfwozk9bx9bd3knhxmjuvjydqy5yiz0b693ehh7didl6hvhluwdytndkrxk08cvot7nuwmi5grnsi2872v3a4kb7vgazn4fgxb32u1ue4e9mau6i1usb6tx59j0q7f3xv63rynjtau4yui7wpwz3pmxoaxfxd661ituors6behe62qws7no5lo450dzvtbk2o5n343h7y6vl846go1b1cvag8ty050a8a9477tmcy3x3xuwybxb3ncq0vjlfpdlm63s08xdo6gl3rhhhwyzokt4osqfi0czlhy5md4f3b1gul2erlhxbc0egeuqqjcywrywp45mzbu532pth7u99my08dke9g2tbv08vxudbkfuewjmha4i3xhzkyc789yixyjw70jafbntil0glq6a0c1qla5vaa7kuxszduywkf4rho6pj85kof7fhyz0h7dhley7fayiqroedsn8qso9r9nqa4o29ck0hoqop9vq3el22k5sbkd1v9gpmgf2cwj5oszzf3xkjuhfiau604oqi8ctrgneo5z20ozd5okqcbtk0n6bkwkqvq63h22ntv92q3a8xboya1z12qsk0tameiougxfas9786untozyz9kcxv1hpwii4oxb0cw4xv1nbslzyq4fc0agzvha4hvfui4x5izf4i10cohdslhi14n',
                proxyHost: '9gqebqkum1xsznhu6dvuddddhs9ar9mgh1m5u3trlm6yuqsv22z5vmq3rvth',
                proxyPort: 7558192282,
                destination: 'tay83eyu8sa9z11okt0oh1z0nb2r5fcyv1dk7j0b2x6lzpu5tcmrdzjxi14mfvz6ju5t8bn5szab2d9q8r830jc68gw4le1ncd5tao6pxu83jaude7vpv39c1v5qc4lsogrpnuarq9g5qgwaeofds4balktumrs3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'gx9mmj1n61p1xxvskeesu59z7joucpi5ncnt4avvxjctln1tle92gba2dsqyhjftmapuc0vsdqp8fni5cu4gnleyi3e9x9jyplz79q89o10lonlkqi188i3g6cqnzovto4ml2pxdztlp59y2lqalfmflkrmkr8z0',
                responsibleUserAccountName: 'ex4lrg76atblehzqwmfo',
                lastChangeUserAccount: 'w6w86efq6x5j6unb5i7l',
                lastChangedAt: '2020-07-29 10:41:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'ikfk995mfum2hhmq2axl5674jg6ebnth74kllrmf',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'o86wn86gqti8z5jsqz1g',
                party: '0mebhov5j68rn99r4pq6xwmvvocpx4iit10te3ulst85fumjvcm7wtsud117084yd0p08iykg8yv0an4mbfgre81hveod5uewdxno9szpzr4ot3r1hv1sixo915isai19c92tx00v2ce3qi492dglx9cw5lxefh4',
                component: 'al06dgo27b638vqbyrhzqlk7woke2oxlzk1pumjbo88gusa1r0yglc6mz5nwvaglccmdp68kyer098qgdxcb5j07encfviyv4njd2wytv5njatvekju1urk96l6814xvcebc8thbt5vop8b3egiihl315crfw12q',
                name: '37zsbvw01qe1v34soxxpw3hnhs9hkr1dfu86d1m6y71h195d6h6vt3zs9rwbcc6bultdiutoun5bl73eglka3e2lckyydnu9vohesjn942wvx3839pp83xf2kpsbrsj6o7qqt8132igr52htbnvrfdohool7cfpa',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'lobjwpympu81k30c5qsefq9lpujayfm7olj27o0zgsg9aayf7ygv9z2m0kixzth01kc4syj2znk2ijzrx8wclpmu5bivdgnl9gdorssz1k9l22udzulup8g8x5vsn4uz9t1l9ekoaooy0g5mrfl5iodaigpikoqe',
                flowComponent: 'isav36js7tq9t9fi5kqvhyerdqveomw70rq3lxefns5nkprvjxjkhoqlql2qayp1p5f89vl8amj31txjrw3jlfjdrvkl6fl3okvvrmkurisqifooe43xgm0o8ohjmqh3eucfcbrdae7fl44tjlov2l19as9z3kjp',
                flowInterfaceName: 'h0ilq2paxjob1sox7alnoje1gfas4ves3xnr5yic3zj3k6yc801atc6yt1l8kgf1e529e2ehb3ftt6ysepf5ynuu7b44xemt0zmn8uxpoyv0jpv85y6mogy2q0ildeq9b47p76fnol0kzfxoqji9agtkk700w7ge',
                flowInterfaceNamespace: 'wrgqvtshkyw387iqtoewmowt761n0hg1hbdz6595up69sx2auy0imc7rsihfymo1woa3pynbm18jwan52i2hwu2qrc0u7imol64nxvxe0u8kisz66shtd25k9tj5dql1yojjnfoo9z0g40ozyc0tviwz9il8o3mc',
                version: 'p360hsl6ni9tjslcljcy',
                adapterType: '98wcp1d089zs33cf3k96p4yuuhywymh6lt4wekc3swa6kdyolkjyyhb9odkj',
                direction: 'RECEIVER',
                transportProtocol: 'wjw6d5d10hknvbrzcgcbm7n305txiyyhwqq47iurs4mvazpbgnctqsq89zaq',
                messageProtocol: 'aeinljsogh4pwjrw8qpsg2xhns6njlbuxjjixxtug2tq9z4dnfz0licqkto8',
                adapterEngineName: 'zevmi9nt2xwgyn3aprnuzu7fc0ueaa5strwl0vuxyff7h39x4inl291n409uvopa9d2rcm8i3e0p831i5togknc6e5hrp7k7fja8zamb4d9b2rd6ixgsnsytwz0ocjq6b5hv01sa1elk9esjo2zhwej394v1tpiv',
                url: 'ddug0kznt765rf9x1m519tuip0d73qhh8e1o4coou1sbfripf6kxfufr0mscq66wm0p6bu0t9jh3t0bs3fgr6q2o5zlbxroly7v46zvw051227j49rvd9iwjjiiztcidaoni8yd3fu9x6stryyvsakb8r4cccomis5hya7423peqyqcszszp473gi8ka231bj3462o4j2tebwltv08m6fd4gcyfbfja9dvhhs7iup0kvfdfzo3jz47r28c3ryu8b0rpv84zjmomaqkvzkvtez09jk20vbt6vdiw3ipvnaklpcihfars8yyn1pjgcetfx',
                username: 'i82kz4bw51azu8zeiowy4wsybuz7r7i3f7a9az4prviaqbn9ottzr19ewo3e',
                remoteHost: 'krai9iobyd7hs3tqkesaaajnz8x39e8eulm08vrkgw9ychqseoezgjf2ec94imwm37tn5rlz9ck6dz0mhtsvw2wcai4y6j3v1ufvvz9pgjnkpoynik8r80qmxgn76q8dm5wagzm7lad4jvca0wfvo93p5gvb6jbs',
                remotePort: 6908768839,
                directory: '0ab5qg7s4imruru90tnytnomlwdu8m42kft9oeesolhewqnlzd3h26tis3la3daufpal6ecugvlrjuzp8khpdsczb1pcyipbi41p7a5mobh6bzwg962kemfxz8vhypuod0y4th2dqi4oh7tax2zfrobds3v84oga4kdghc1lq394p576aebbuxqagvqyjr3re6wp9442te5rix7btgkoosad8m8tnafuloi5xt6m0ml2vq2m2qm4riu2rnfusqx08oitoqkutw6bk6a6cj19z3etc7etoiojyahtrdrfuj1kdnltzo15opweq0utd5mz0m6vismn5zwetv28r0sk2lq03n6b4u2bqst5c90c9o64kw1qu3r79r4fhkqg6j68a696y2rwx5t3ev0y0r9zvwp5lcqfaap6k5kv1ct1udv2kzje0xc9l8ih77vjsrmixc00ghg21w0g7nd64s4lodnqw1xkc2tnh98m5mmop3os7j0efc63r65mwygpwfjspb3y2j9avxyu8gne1bnzine70e6e9cxpp899onr7u56sm48x1x6my8jyu4gjfy0j9h37z978b9hllp0ax77f085obbl7eya3d258jmkmwwi2xde8wvscajc53pu2ffwtw277yzpazlx2kngniddkd0kggiaq54pycy642j6u8n3ldbw1wjpzm96huyt4wfzt8pttkz69zgpeyzml2tn3056ushhe3ch3luswb0a9klkyql7ug7ovpvb6m7uiu4uwcagt7dvidsk0xejtbeann73w8pbdkrf7cvc3q2un8ewt04cy9p9etlyf59ruuumrbhvap0xzik2hzwyzik648szb1r3aeeqdevxuw4mc8z3mg3p535pnalt0ae4w5w5frutkm58t34h57n3dizbq5qojhwwwprjr3j8julctf9uu80flada28xeeszrsat5pq5nn9tybcdcdtctc1gxvsvol8hwxlsg6x0yr52selcc5ul5zxqosoq8od4297mdf',
                fileSchema: 'c7h77nmsbdcjhs4014wcihbgj2t9u2kl0rwsf9y6swnaow9bxvtto496aesodqp9xdpkbhk68v0nndmxse3xhbfu4fm6ybg9takrnhalyvjlulkw90eu9pxaa1ottwgujiz8kpj4pef3zwofy9rve0zumw435p2zowihj1jm8n43vwyr68z2fmva42gz858r5vtd0k9nnz71udrcucbzue5nx4nbozvijm6j6fqen8913wthz1l17vbcs6s32vvr2qq2o2br26u54v8o5oqvezod5cfo44gtwv66zoratoz9zbrby7rw57b5xywh6w2fsg0ddxqvyd9vtrrswzxu12gelg9gkjsotcxavh8jw0jhxs7q996iw57r22vn2cih9tu3s4r4lnz3i6x5qzsttwth21emadd29z4vesemncd3cjo6zj4oliv4cnfbl7du6fbs56ma9j0l7kghd1d6rruqd0xhssrj0m5giaa3738245byf808qg35ej4156dkkyebo4htyjeqltd2s8s0j6991fasyotgd52c6yuc9w742spd63iqz090a4jaf0kp83a1b8bq2l4knomubpwptc1c3xx72hytjtq3ivwz5cokwb3wjttm6mercp8k9zsp4j99ygcdyvny61wku1609x7r4uqdhmh6zamzccpgd5z17mv2z7sayo9bnt5ug9zwffg92a1j11qhs9mw005c87cbgx6gazzl6ra6c5mqw93jsjrwmz826y27l540zoorvh5ujrz1yqlku7spegck3ghs4wk8cs075drrpj4ebiwvvuxzogvetbzmb26nk9vyudmsjgd3ewoea18rirdpxsdho5vrpcuqpuvmqej45jihbih9o3ul4ly4rhvywf0wmw5euxrcowgsi1xndserj9m512d0wxf494onayxrf7sdwwal35bykggdw3ntneri5tttzss7kef786yz2fm7q5of2l957i4ico8x8z93ii19fxbyqg7ax1crg8gb75m7',
                proxyHost: 'b0xj1rmcteajlew0v4xp3zl5e44npo0v3bp85ycxw3p1i9w6j28ycc7rq82j',
                proxyPort: 8497218129,
                destination: 'mddt5mrq895oaykxje5czah4fn95scn32qiavrhx4g3wdgr3wahvmy2ukoowdfqto1e6vxka08jk999fimde2l2xnj23b72nu0rvlwnbr5t5ra0hl3srtne8vz3n1un4s42fjckrlztux78w1gg4xt8m400ibb0a',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'l6e7ogolvdwzt3nqeo1q20pgqyk6yr60w7w3550ayajtixobkfr8mbc12f9xsm9ul8qj60lnibxlm6uzl294wyv34plxqvu94el2u0q0oz4bjb203xsj2ie1bq3sqsav8op14a3jmyzc284xej5b77dfz3ew2h69',
                responsibleUserAccountName: 'lzkfnn7t09476rh2kes9',
                lastChangeUserAccount: '09eel2awroe5322t1phv',
                lastChangedAt: '2020-07-28 16:21:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '70h270oyrziqh2t5dma98pp6gaqk71zfs8pk3idz',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'n9uou3klb1z6ezr8q54bswemm8fhssnhethvch1madcfs23lkz',
                systemId: null,
                systemName: 'fmn872zbhy8pyj2bmkz5',
                party: 's5qlhcd3ttd706bmku4l77pal7wqbm9m062vwhp7vgogzwro76h118jztm5fxju79wyt1i6h16h4gk3bvofb7fkma1lq8wm2fmgm2bwlab4bntpzvnu1iwprnkq2061fnglyuhydxmdtvgykgzwb8xvdgvtp1ka5',
                component: 'gw4hstsyatygqlqp1efrlb2wnptuqlad2ri845bil1xncnmaexvcqu20befouunsbq8gcm4bd5wlqesv9kmjhclctyb1seyp929efo3ahkbpdcu1ilze3lsmxblps801chciovduu3l725vq0n93wsewbc9rg1cp',
                name: 'flj1q4n4rck9vk20uersg26iko3bbwns11oef39085ojpchh4ue0x5jxvavyqxuurkpz06dpdexzcgwj0veg74bczjmj5cxulz70lwunqpfzker11yly0i3dzs65a4fl3t3f1peje9p4ppxnyxmyjvki5bymuzoq',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'z8qxaxc5zup4g2svmuos1lnozy7gpcev3z1iwy34s68fzzq0vz4jtvk54gzigxluyzmdnjho43ia18d5lyyf1w9ifgryfxnf7anhk9rmrv7hirgktoizjdgk6ib1lomuao6mi0c6b10ccn35ozezap50kxtym2c7',
                flowComponent: 'yzat39kffni2kp7oc1rovainbvwsgnwxty2vj364i1lb3410dseo9bbw0f3v1sc543ykjn9fc2prnzgsg5e4qh5wqphqvo6nkq6fpryvsi2b2j3gxg0xe6q150hrk8stk9ct12ssx0rjj9m2idsiek9sd0gfzfho',
                flowInterfaceName: 'b2z4jkj3a80pvryi1jtx7za8v8a81z6hc8iue91isqjigt6ibutsa3sz23b6xylgry15tuejhhdf4kv04cgeyes8fwdh99sdr4cwuw4ok89nsz6otcwslpbmk13pre70boe6bgxw1t0manvdmigxoqa6eth0q4tb',
                flowInterfaceNamespace: 'rfeecjznmcae7lowudskswetvk8fhogg4qk3tupmra3ffm8vsq5w1tb3dyabw59lediugpiufiltdi8gs4n2hu4utzx6q2nl8ingdt07ye4xrkfvcg29pt9nfho2asdqmufayq4vdzxltl6odwnfu64e2dou390r',
                version: 'qsk318mvythdny8papf2',
                adapterType: 'ca4sgvb1t5kpkqiy7pw9fo68djzsj4v76swkua5ydfshd0snulywaxj6c6we',
                direction: 'RECEIVER',
                transportProtocol: 'br85tkwvbahxigpxmy4x5i1rkv71hjbzjqxh3js2ex3x9cko9vo4zos44gp6',
                messageProtocol: 'nsw698hcz9gej6ygxw7v14d9x79iqk1v3eoz2b53bfv602zb3cs3lkmzqqgb',
                adapterEngineName: '1er8rymgg1nw2lwemgx3abklkpa4a4lsqtdi6sksf0ffqas25yick9w73xjxpksnd6s802g5wuectilq5sfq60avih80xsldyfq09vzq8bc8sp13gkyvzq9954nylxetit8r9bxh79901lrpxe9dfsqpxxi03nee',
                url: 'qzoanjmk0hooahli4iuzuxg622f3in7nuv4zr5h8x96tjihg1nc21xqma1t0rc9aa7ftwd8fzhzlofyjhgclnbv7zuy3swn0rcd1zzspqg54gcpxen10p6roriq4vpmkotdqjkp0jq7m59y0my9kbl0cta3w2gjhkbgnyi2y3wogovaw2n4awei8sojpjk36bqpjme28i0nahhxq1hmx7qkuv5jnim4ijvkge8yebpjirfd2vyfy1bt1oivm6t3hfi9cc7yj5iql8cri1imsl0ztlqohxlw3d42h93bd8qkau70dj0kj4reqx7ghanmd',
                username: '8r4ha7qnftaquvm9wei65zpnm9erdim6yyrdk7vtsqr8bgrgf8gneimo8dd3',
                remoteHost: 's051jlc6fh8yafae7793efpskhb8yb6kl3i6rx37cdzkkdwgmow7ftye7499kcus36bhx9z23lc156gsxohnqdlj33six5hcxrj77fjjdmctsxhd28isajaaastrwkjw3hzzfy0sciqf5tb6g377gccs2bi3wtqq',
                remotePort: 7329669892,
                directory: 'ntbsez0swvfd3yvezazkb8dqgcrhw9rn1jurxd0yub9tpx8ppi1p8ll51x6ruxvtv6lp6kclib98g61p4hu1p3wxpssuoer17x2t8pu2yq2fhze78vupa5jmkosrm04buiw3kxj0ddhwz14c2ld9q67kwsftkheds7rd9stku6yut3m5tsvm0i4q3htzmdu6ibmuv9k93wiyaxlqadwn1vjhscnq47wzr0ztid6r2lwjmohd8ymmv49l8an9a78ig9o7zaidl1jtr999p5kep9o6vcprkc7nl29je9ijrajgvs874g3oqt01gwb9t4b0sd0yks3eiy2i4nl420ks9tm38ax921q24uu382866rehk8rp17i66audozd9fgccozremkgc3uoflmfndge22aebh437agmk0xk56py2gpr1q1osyk8pb0wmnx9ujjusxp691085z0xxaelrixemtd8q95ocksjxtuz008otksw79ye0pswknk3cxpo65x5wavbirgsmitvp98x2j1rlgr4w1c9kw69tuseu0eq4kv1anvyvcn6ymsg4q2f2wiy01901f1he3guktj6yjd4v9lvuwapgn24yehxxg0w7fyeyceqwuhs07ckdvsvpo5b280b3cxnyhmj13dtjpcd6ujs9v37kb4nou0ppmv3s38qt1a6jo3iihowpxfmg73l830cx14b2fldxom7oly2557x7oppdn4hxc9dd8l40cze0p5kttwuxwxhij4obyrhkf1w4yoiuuzxtqoum4bmwdxqcqcxka1b2l22uivm3zlcfnldu8sjtfpxy8xx9whmll21cah173ge1smn252kyasiylwhs4r030p4bycbgj5e1zni8fqgo1yxp9bay8caba7ask599vtqls4t6vk9jg519wpxcqqu9wvqkyncqvsssmoa9lv6y7dvzax9y6qvs9g3tral0ej8kn2ok91zuhuqqvtmiiazky9hb3qsez0ojyq1r0nsh9yehq00i1tj0',
                fileSchema: 'wtkmmuygqgyxmfc478esjiu2dcunhc2ebkgc193s4xjd5azb9zmpf0rdxshjyxoeuvr711yhfgq2ryvoc2y6gzxrp6r56cy3zbfm0pbzzf6ovowlsasfhhibg9zy3ek7pqz1r21dezcelv0grnr962w4fqavj7zmteoeiuo6owf1e36a53qq023jp1mlk52vg10iamkva292igtine5naao7dhe1c087ks09wxock7549wcz1sbhbg77oezcqukcfxhb5c1qx2o8cse5rgxhfa75t248wc1exzs3zyf0xju0h86udf2fynx0le3rywywfhys3olg5ty1sfnutsy7zcy5ehesppk7nqlepxfmn5527sr1obkuwu96r7937l8fmg1uv9nvqljz3fpn2xu8s9zgf5pe0ni0qyr7miq8zo4vq1pc30mulmg8dbyx444ns62ym7l1vpl0p7aijffl6je8szoqgsy596eqwgawm1agm5l4qda4s52wu3aa5qj01r302bctq5y0ndc0kvbjpp2ljggqaqjeva55b746dfrs84hozfxv5hfaxantdxqm5ucj90ttj8kdh9y33uac5404aq5q9xick57jgtcbvtrq1w7zo3l1t7smez7mhhpnfjowf07slx8spw94sa7rpno5w6quxdn344ddo810cxvxtqj2eq2021uj98kkpkavlrxyelurlpsd1php84cxxnrslmrabjfbv4g6a0oz8w2whelgwi5hf9t20cpcweuhi074vtu7gxb8z61k2ujb1xftjw9thdg3i3si8uh98oy1y773gv7tkyhz8lpeqckhcpy2qr0repvw46d80i80erh5wewsq1xv29ps444saqi8va57zh9nshbp49hdyt3t61e2pzg6kkxubyb195hyykv4dc0is0nnq45upy029plugxrnxxx9xyr362551ghss8w1b23ngfaibkaeapgxjwund5cbsccbjyt2bquj1b7sils3gtaxlg9bgtzdhpvh',
                proxyHost: 'osc388fu1wue2yd1xftbilnuthp4qozr6l7edxahj4w1cw97zeo79xkxhvks',
                proxyPort: 5302359123,
                destination: 'v4a4qfvabjs1gaabu5lccshm3j4aq4mn4kcqkn2l6f3fe3ltmmft6uqtcofar0y5qlkpj3imdpron4vmrybhlm4a8lk3e3rdxylem2kdi9a3oazj73n3ydq1r17x49w0d7iizxign898foycx0b4awv96o17qu2v',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8zlwfgu1i1q2wdj9r89wag53mvxrwz6j8txuccwf31h8z9k7mc4ojbb7ujbmqc48bwbl598hczwld110fi4rzlnvgejhsof8w85zv5k657egxq6nkc1n1cmpw897v08q7ml9zht8n654b21eoyavpxoje9rgoste',
                responsibleUserAccountName: 'aqyne5xn1mn0tkjv1ikv',
                lastChangeUserAccount: 'bx4oc1i8rp8co0hs797n',
                lastChangedAt: '2020-07-28 19:13:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'muaysayvib67hgbd1ggimwu5gxkco6petn7nkkef',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'kkmqm5ugsze6nml32ufa1xnlanfpziz0pj0bqh3l97btfa449a',
                
                systemName: '3msfk3qem3fcr4p4962a',
                party: 'nhasjtz5ma53cl7oizjfv17qpp508i9uuz7c5rxfjdp77h8qrtudghz91c75k4xykluimfc14dcba1hzn2w61kwsfctzudb4eozye21hipofiau4hrmn89rc0u2f0c7zbhf1s90e2h9vta201ad8klxqoziymve0',
                component: '2wl4vnktdojbzxubtcur4kz33w0mf8xfdvzx6gddcjn1thg7ohxxctq33dx55xu0rvxac2az4uvo84nd1ulg1gspeski1h1b6q5ay15t3cglgm2cqddmjbl1mcd8sakhov268chhhefgaz6ld820d87xhxjtddmw',
                name: 'k0s2arlid3ainfb8enqpslne37s0xqlarx4kypkld8qz58xg3n64hpooyke54ttiv7uq5yonkqyx38a2wip9n5wakv2a1qmlo7al57lmqm8yh2ud3j9kljsldu40xu7u59ojljvuzlg7ejzw20exuaarel3s735n',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'mex0kn9uhhktgjyabondsz7wgo1724jo03mlgxd81elpqa0880cuhqnpbjfk5hrxyae6gztx8v153xjhov8lt8mm007nxu32rdmrwoa6pjwnk9b0z3fmxtzwh59zsgbt1hq03hz4x6wwj2cb4mr5cejhm9m3iles',
                flowComponent: 'r62h2r5g8vvbbjrl62lcj6f7npp2bmowx3b27m23917i5css6d9du3gwt8hyt9hjad96bqmbkrlg9vseyc2ju85tky6wcbuo6e0jtipg467fc8j3dxn0m7yx4zhwqiuk2wmuqyoewppvnxs3i7pvq95qn33w08ly',
                flowInterfaceName: 'l3jp051sp1m2sx62du0rsorr9l3908085oi7zjkwrvt4068vdzf7fpg3mtiy30rrmw0i0xmr5ejj2l6wjs9onem29mp4orcowaby8q50r2lo5gtvr0ya1sf1vivdjcje5lhf9nemf6ffdb81qotrrn63c9di3vr7',
                flowInterfaceNamespace: 'emcjsjbmla5ygxjz3th3sbw372og9cpridelllxc5f592rfvacrs5kn4r1hj3fi3b49vpzl93h2ny789eb3s3rt1gjzn3sf8ea4nkmjtbwioe02tgku4zeue1n38qx7zijyummemkag1wxop4gez6vmjap63wltv',
                version: 'djx899cx36cogiamroq2',
                adapterType: 'jq5h20y0fdk2ek4ooqqfywkdl1qafx68er1jktrwj8n520qtw614t4kvlt8x',
                direction: 'RECEIVER',
                transportProtocol: 'qe8g3l83qaqk1vglzmfwyx840r7v83gqbkd6av3i6m7eyalld9pz90vh6zwm',
                messageProtocol: 'x309j8d5lu4thxerm8iwgnid8koqpqr93bbowwvi7s33mxnnhousqk2vy6u3',
                adapterEngineName: '6l4trv3bvabq7igygw2vdkk2yf0ssjc9uiqnwrbncydh1gdaliyhlfr03t3px36y2b58aftze8c0jpvgmb0b8d4reo2ib0cgajvu4sy1s46d8jv23h8n2qeachjc6ixgkz22w0tv3bhbn0fakreb8sb7losml3b7',
                url: 'h3an4379ec8favxyfhw8m9re0w9q8aq3r5jhuj0ucxj86naiwnjlpl80qth9aezb7x6a56k3dxingnn367kb39wlger9510mq7nb5u54kjyw3q2tmix8m904hu7bscfjnaukhwyjxsqspysp72nct3ye42462f1b8un6akhddjqrfios98k6o1phxrltkxly8gudz0f36vwi8zwuv2f8zgi99eytht599yqeuxtphicm5bwljau1b6ak5bv21bgukdwvf9oafn4grdfv8gmf1decs8fe2x9s97zolubtzxky0w7tbaki718bbzbniqz0',
                username: 'zo9feq27xq92gnqnjgkgbo9b7lod009byn1oirh64hhty9lg0t4yzdl1yyx0',
                remoteHost: '3e8sv0ycyolqey9n7rlobmjqdju3an728tjdof6sorl23i6knl2mtv2qajdgswjbaky1gthnpcrvn8g9vivrcdhhsklwubz82hjaoif2f3vxzz4tk43s2ujz45vqw4tke81cohhwouxfz2gjks1cz5522j3d529n',
                remotePort: 9295776079,
                directory: 'van63g6anr29lovadpph6hbnjnbzu2w10zccc48jar2mxs7fcewz6nlbr6xojemstto9o8otgl9s04y5q9vr1g8mdf5v5bxw1d7f5gdlysds319t3bjv331zasr1tsz5hixu3o3e5qil6vw3779gif86cp55fvamddrqwhcz2as610fahl6z1haiit23elpdsbkwswmbd5uj7yt4bmrml8wkrndl63d4qznwdvm41dp6qkkdkletb04tjh5hvhca8cz44w1eokhp4vbfvikn844fyv8ggc1onsq7bl42h6l8k1pva75wr8svt7xsfagap5ummaeiwflkjocqk047x4b7pia92qclhb0w6p2oft73dats3xcx8ixozmcwm26ej6p02foy3hepcnf6hxr9v5a2s5jbfycti8barwewoy0d4frvq17jal4hhakmutddu64kwts9htqr7zoa6x1by5kduvwr8f8bpwp9ri2381vq3ut7gmv1r3uxddicf64754uxrhf3adbq1x2ssup7x7uvlul4tmuca68a7t5jgguc7y4khnahav7wcydhx48ads61rbwykryaw1op5wb4hoasuc7s41rqlady92yhvkdcmyzjkudtattvlmcspwz2vfc0e60rt5jhiziiw762hlp0bev0cz03nfebnssnu8t8b64t56m4sql213cxmkzvj78ig2ybikywfcs3vl1ssi6cqz82fipc06hb9t470pagn2em5vkwmy3o0iifjqh6w9heedpuau8tleuryvm8onpuskqqsh0dvd3pngyt40enef83qax0ase0a24k2srfrt2mhfr2knqgcroof9abqnt1ykafqhrjr0ydge3nmrui1xbztmd5kdmic3ylc4n23dd1ii8b77tioqq1f734uw5lqqhuz6e32q3jgv4fheu9uy1vu2gqat1qa8fz8odnomhif705zwy3tnx8qklfnx02zmpt2rk2v995pt30dez2gpmkxjcevlacidpsjj75',
                fileSchema: 'gg6domk3s1pca2yx24v9c1ju6havgzs7zmn0knsor9on0hvvv968um3xgt0imtjo2f65z9mqwhg6k5jxozr0dilxmil4dc13ouu5i3qqcjx008oi7jynosfrmdyme3x5ix7vk0ne4lxsf4l6gv6rz1hi2dthpehl40iumx53qwm5whaaljaiosgfqoloexdvwqhvzpqhnkmwwt382ja55emqqvx1tixq287zr51bwjfi9csjsd4vwmtgati2uddjpl4y0fzj1d51av0jpqx5h2lgkacmkfyo5fitvj644hemcju2yabxis2ouyxsw6m3mad0tkhuyv1ula03nnu9ewg88ifbif8cd11641emwp77uvqcjsgnmjrmtbzg300j330itjdu3doobjgdd0o6v59cqsslk4hm12md5jamepmbysnihasri7f4v9hicjn9wn6p0089ruuq4w5n492ly0f3lhck7lexcxujrykxuvsa01xsq0ixwcqf57a117pnhylubfhqn29e05zn1lmjl82ezu3juws5l6e6qgg7sbbx5ee41m11dt3kge1tuircu82xv4faf64wbgq9g78a55j7upkc6uzct7vm5z3rn8q88q81ibkabt4s1ghcdlaod8t38v58mmb02w01ex88gks2snbjnfv0qs2n6dkpv2n7xioha6fm1qhjcjc4lnna2r5amuf8krl4y4lz918cdf3gpv1ypwtvrosto0e0uhnjvaafedum35bj9uv1w3sqjsesl3cjkhu77o6kik98nng14zss8jxa0ll4p7rhmql4rgv37e1gm0zxpswdjt26kp8auza17sihsa1swndr54yct1r6pkx38bwhzfqilggslijvcfgnheimfkgyf47ocosqw88k3mzbw5ulkdc6qix4t9e5p87bpoe2a61g96tufxk7r4dffrtpl5v6xqfln9cznfuql69tbb6a2lpv5lxdteevvykbg3z0uw2y90dpxnkropvydvud88iqvtt0',
                proxyHost: '7eptsaf61qsipoamuqhkjhw4daxwkliqe1cgbwpcv7z7ryr593zgi6d7vs36',
                proxyPort: 8144648193,
                destination: 'l83rxrf1vrwsk45fwszlajpj6qh6fdlhn9l5233hef7v3691g1mjzwss1b4qcs96s6o0iqngzmwdsh0o80joha88au08h7q1slczzv5ukezl7fxav2tn15vez06eahqgvxeoumne5g308pn4crsccwj2hco1ziy5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yfv3ea10083sdw1hyaf7gb2ik8ll9952rn63p25brhss7wdvnzahbc7mvv6rg67r8qmv9ziwuwtgp2szm93bye6xnhb8zklff204a2btchb9nawvyepzpls127ts7khsf7lulbr4wy5q91a9lgoql97nlzkhwuqr',
                responsibleUserAccountName: 'eyg7fy4gipdced64bawq',
                lastChangeUserAccount: '6nss8mb4lqdi8xiqwgqy',
                lastChangedAt: '2020-07-28 19:37:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'zxy1rugx4x5440qw3p049xr0hyt89wf6v6318orj',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '6t5icehcig4v23e5sl9tq7dl7oz8lifbobidv188gavqyp0igu',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: null,
                party: 'zkconep50xmtvn1vsn1odyvduguitt5uuuaxvi9rl23yxeevmm14q8cncm1g6rqdq5dtziw8s3yh3gl9bgez4m4n0wupxcf8mhpnvho0vo7smoakgmnc5afnd8l553egeliw0b8m2hzro9fuc3in5dqt3grscl8c',
                component: 'p319slsnviph0cdysevd85fjo5kezvy8cfo80czzgve0ksdcfdayzpnhyrh0xw4hpnrc57hmmwgqb3waa3mg77rgivxsl8z0ics0wbz7dyv30zqv2rnq64ybe71usv56pwhoc7nv46b9n6ksbai2x3ommi2d5zv7',
                name: 'is5a6l2x8tn00pf0piqkn7t4704r1jislwijey9n8nbnesb5f4r3uufk37dkdgkjfjdrccee9ec3ke9pmj5qv11znaowldcv86o3epq0p958uv2h36b4zl9ct262hx7gccop60qv1cppb1b6k3bjizxplwvgq4ds',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '4hqe0rgpkaggyddn9cfxe74y0etiu1mo650mswme697j5htmt0ebzubzczgmjizwtpyhzh2z7fcdmjeuf57aq7funtly9yk7b400cedt9mo7w4n66ukrpbjm2d00ms3flvyxks72t7txbin1uu0wedj6j695guts',
                flowComponent: 'b0r99062w9iw1rywqznk3l6c2cq21ky2mw8r7y2xuy09wb7dz44i1bpinkd044cakxbutno7il8h67rmlkvwbtuzh4rg34gyz6e28qbguibh8l16062hfhw1eysyu0moo7mxcond9rmsgtrvypudiliygrt4dldu',
                flowInterfaceName: 'g3ktoeyjo7444e7kybv8xd48pmhl5amh658af6ylprh5qpikyg57s5v7hyp96fxfzfaave7nkxcleefk9qvrqxjvligyug4jn6lccwelcdo1hz9onxr77q106bmxhyecjox5v90di8im7u2m8w8y1dwo9r9bn36o',
                flowInterfaceNamespace: 'waj2u1vtksyc7jtb8pj6hhb1di75caa4pd99ihqdqc6zgqko33g9q8e0afx50gc8ypfirf21nj4o9onssh4p4rrqimpp0l7igwq1uze7v1nk3vmdh08y85buc2weg5ozxzajgonq7d3wtki0fbhyf77a0ugh4zdj',
                version: 'dmpz7haj8gtbghkph19b',
                adapterType: 'ifpyl770350xrop6ga8i9fh4fl9lhe9ynyrkpcegix8hzghniq3h0i7f9xsg',
                direction: 'RECEIVER',
                transportProtocol: 'r667hlqt7f10d7ibi8k1li1jujjkropmp9axaimqvd6iotzwyysk2gsoydpp',
                messageProtocol: 'bwx6fo6yu4bhb1jczxf2rfwuihiia98dsb2f63qppcu6qlnda0uw86dot3qw',
                adapterEngineName: 'dbr4uhzfw0pwy20zob52pd46bvxvqi8uz7r1oiykgb57hn88xn933bkt81efdrlw0i98g8y6as51waltqxiynnmrbbfesxbqjwa1ylmvqja1gfe0o0exlecuhdllcd64p8s7jxa1jhuo37ccz5hwu2tuiiaawdew',
                url: '9djdg05j2kyzrhm053xi8un203zw0df3u0ir2movr4806rftl94zdi6q8uojud3jl1nrb0dmyqm1krc0d6qzwn0xjx93tedb0ivoa35h67lfdriwtoapugv94qbgogvasjo03qr6vyyv65ds5qhljjgkalvrirmtpj6qih743jjq016wb253erk17y4blx0cepv4z1kueac9fagwhtj7wve9016l8mz1x7m28wnbkunkis0untcwfdpmn0xa58qr80v2mlmj9nv8srocmzmlzevtffyqfzr1jw95xe82cqtsh20wjrgketp9r0qmi15q',
                username: '21kutvzms18js1njs0pe6a472jeeodgqzr6po1zcpdo25cxjmp1z97fhdxoz',
                remoteHost: 'v3fmq5fqp1huknifg8l1kplwpl8e3msz3cevyib8w5r3w8gkt1zr6hffycflkhd0cfp2ic43jyrz2kh5ek1qigs2zywn7uzze9ujp1lq8jv6m5cfp6u46roxlbemxl5lrdzgm3c8qitfgc89mnhacrf3hfksl7o5',
                remotePort: 4832170269,
                directory: 'hc64mdt9nkgb2cfsr4pqsjktsq0xz1ohz8z8c7bya2qcfqqtqmhwy82kybsqo7pivj5s4hqfl6ea36ejot7b8mtknxfbypmc7w601iwn3hob19nx86ifs3kvjcly4zn1wdbs625vovffy0j8eio2plgkdxsmngi1iaky47ewzktmxdq82dln607fzwic1ke14y9hqa18rn0ldxtz3z8luslfpd521iymrk7cgaf8zjikzprygqpketfn8cw5maqgdgj0hhthrtrp13uk0bayukqsfu4sqjjdjxmht8f4x204zfh2inom5eiz0aokc3sqgiszu9km7ersaasycb84dkqy1r85534rlugfetlk35vj8xg7c6nnp4bcd0f4lm9myp0ghap586vxkwblbh4khdzxpbmf9cvih4tevc6glmhm4nr4s13it5ddaxx6y3t5qcvcm9qaemhypx0cul3bmcvjcujw8re7jl7a6hhudykdh0viz0prjfamf92h82z8cqirmzwce2xxu7qbd9vlnuesuy644tjatsz6jor8s1xvwyjhslgl3e6e1xclkx1zwcx09xx30hyu3xurrpvp8t101mhi039vc8uokr1t0ge0h8nlrexz7umes2nytd35n048669ksvcum6yf6rdlllim5d2bib96tcoqhqzr0e6nq9si6bzob4gwyzwzkcy2tdif57je9cpxb4z3m5govfpol8thnhwsq95i86xsij2p6mupc3sr55uw2xqwbpp93ara2iu9giy6jpf504jjqb5tx2p80cqub1lrjwkj0fwpae7thduxn2clvwdrxjciel0uo51fl3bfnypmp1mup21p39eln4iqd4wyocwg7b5aeh5rjfh6edt48v5z4mp7jj0sr9tbvu8d3wehankall06zt6xzks76hww41hvkxi7cmtghzldkewfwlo72oaw6ub1eufuhkhgth8gqg9lbb1nliqphdjhuso47dnbdzo4a6cwv23xgob7bip8ruc6',
                fileSchema: 'hn2ogr4qkalwi6kdzo48xhgex9gwfqpnfic9x9nahraqwv96tlrblw1s01kcoe7k2tv0mcyn5eiluo2597e16pe93es9qoncvex0x1p7qmrp495fr32z1ntevsqoaorwm9040q9wn7nhcy8qn3s9iurg37uk5wf5o1mtocr8g1539ajktzamkylau30hl8miai6epkph9o1bvfzft2w4fbzfxnpelctr7s3qcwu4ggaluzqglb44e5dc2vlmwkotacy8fq7tg2ddpb1ikvbkizniuq5sebuyce6h331yo0evtf9fikppoubohtpnvh5kq4g04jm5du857mkm5w6e863scb6uh5zd3sk2gm1rv7dzqlgwtg4cu32k3tmqyftbo5pyz2mhtmi6yy0o5ujghxziixt5a1oi3vhma9v3ktg0d1npz7p8g3pgui67rtkd0vdjv8jt67qlx19k7olealr9cgh0er76koepyjd771yx1sdf67dswmifceqfuw9f1omg0xjh3bfq2gcsltap4w0g55bk5r9bqc80gwuythoh7g2fy0ap9j1nn8pokajf42bjf57ixw1uk0o5onj9klfay725sqptvucbjmphq4axf3xjz9olzleqqy7tg6bj3r50qgfuevh3fzaskrb5d05f5y54yy3sqq2ux3qnb0pfj57u18e67e3h5hpgds8poao7xb60voqlrvakmtksihjmjapvx5vsqtr7owcwkwj09ybqra6s3b4f72qrrec4h6vqc2i0h658if3ifbt89o3zjcl7oky01dih7lwamnmftuvvsfyt2x1cvujv659qwd403sdolnsa5lmjm4at5k5eunqm9vz1xj3f914f6fmmcrxuyef155na1jyeatesjusndt2nfupw3fw9uwba69qqofme619hvxx8crtoa32g2wza7dm2y50q833qtkzgcb25e2ouw3rn3o3p7mh8gxeumrksso0umfa25i1pm9q0twbs7hfe64hlrodn9auc',
                proxyHost: 'qvhzlkzs30m9glq3j1unqa31x6d30hd8q5m7dsibduzqgt6t9md6awcq3rx9',
                proxyPort: 6806971421,
                destination: 'cxijep2v3kl0vaw99ubhbt2zouj4s05l53w4w1hpgb9rp4pj1m24wq5orjqfkfrtj0csk7oqv7ntgu3nf7268wa8pw1lr0h0p92ktz6s4x4gve4anufk13edllglkiddgs01dn7zbs9wa12a05atcoj2481fjl2s',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'm3kt24isb6bxj4r4gu8kdkgrdqfp5bg6fi2z4g4mrfho92b9nynkazmlxfv8wjtc87ynabcgalct6kxboj9533l0816sciobq399ilitfhm41hmjv5ywmqxh2y32vwefzgbmczgbv42dqlcsior7gd4m3wuk4ilu',
                responsibleUserAccountName: 'fb7as9tz4ozd8fyv5dok',
                lastChangeUserAccount: 'ir0sko97nb8zqwclehg8',
                lastChangedAt: '2020-07-29 06:19:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '6f991vxonsohdcl0v6aj1jvf9bpmn337pgonst12',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '7w4d0cqh6djgvor1gidk141ktqg3tfapu7fskmylgxgg4n1h96',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                
                party: '1xaq691v9q5b4o2pdnv5wz5xcla8rxblrqhdgovw245gbsqfs1hzhd1r2wui6w8wsf7z0s8365k2z2zrc4ppl0s0rilw7ase1n8m2hqoo6wsak8gh0dn0lzacyp8d1axqbwdmvjy2ui7m69atxz39ey64k6nxm6v',
                component: '82k2o7u7btyfgdn29au6x6ek0eqgqvfdkg4wjxsdgp21199id7hmj9xo8uqlh23ycdi427liiibm545985smidos98o5uy7c4ie3jyxru9xx9hrw3qvf5ed7tzaq0yt47jv5drfcr3uo94qaupeonb8gxqaar1t5',
                name: 'py4k84yd9h6d0fe0nt45osqfcy26hzxdqvnrpe7v3m2yvhvgxddh8muwfh9g6tqay2c4e88ws1k1i7wzzb7kg5alpegom4taygajg7h4g7maykgx9okyoj7chkgutd16jgu6rs3vzrpyrfgz5m06rkh3cexoqtj0',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '01168504zwukgju5n3i1ida9yzinecvuxrko1cuni0yt4zfi1j49kgv95wymlv9ku18emy0yuk4v6qxp6bcp8ap7ik3w8awzipz20e9p9nsge63rypm0w9091s41n76kazxq49hfv2xam5rpvw4ftzoyx7fw2bpa',
                flowComponent: 'a4ttd1xs6ygkgeqz362wq0f1tyqobqvxlevafyc5l7no0tv0lyp5k9ty9jfz6zvfcsnr3uboxa8tzj7qfuhy9k04cedhbs6qo0eovuwer4bnpot48oqhnobp447j6a3vcyhyyhhj6bypfizy7di0jr285yhk2btl',
                flowInterfaceName: 'hthadboe1tl00sv1ge6nx2mgmagf9xc0gtu68ce91wiww5k7ho6alwx1iiz1qg43tidnc9kgec6wb52vy2xn74d3bu8mdredlg796xu5t88y5c8de4f8fy7r8nzhyuphzmas3ag3qb5nui6ioh3f94hhj3j2kj1q',
                flowInterfaceNamespace: 'v401m3q1g8hbtqzwdmptjgd9kcwazu81ppn7kqmaztbu67duuktmd33der90h7ggf2pc9mpkunwjkubmp3f7hx1z56l5ehf9lpn1iqlpoa1bd73th254qahav2k1hwaeng0hhoog65xtnlyygdbdvxt4y1wlq3zj',
                version: 'mrsd9qcs2ib7cc6nqoli',
                adapterType: '68chcoueoxz3ht9jqiwjbzz3uotutxzil3o04zpnn7ckovcswq3u2z1hyw2r',
                direction: 'RECEIVER',
                transportProtocol: 'qxiuie40h7ikc6te4otrsp70hw63ohqs4j0b6qwgisdikdvt6vm4p47uev7y',
                messageProtocol: 'uk0id5uk6iv7m6fq94g67jpu0z66sfzdrleifvjmuryecs9cyj724p5v3f3q',
                adapterEngineName: '2u8dbv8jjbnzisv11kpvo51s0shuv68f124qlwxrnqcchf8pn2dyhohjtjekuymyo4ykray9dzkf7xs6afl5wuqvclvkrlse0k6bmb1tus8szvwdzg73djdwps0nhx0qana36y3k5hw67kxmfz3d1p6mq6hp5po7',
                url: 'ylc2qwnsbvi8twinmbdab8szcleo0rubg1x03s5b828m8lqe8uux86rywp4bjx1l6yyxsfosyb7tmcipw3du9dda8k6cml7y9mb9uo2idm6lkbtfjdfn73zi3rycq2jjdm4wr7ph956fnm6y7vttq6vvabq2kjennwj6irerbk6npv65gr1vl1ynbsny1wgjx7zslos7gc2jch0rtuisjlzpk4kconb4dabjxrh9f4z0oqfa9mqs7fh8fui8tr8hv4b6l5apn0uirivsm06ebsvu1cb5nf1xd993u7jevkzdja0c54szd5bshho8ss5j',
                username: 'phlye6n23p75xgg1kb7iugc7pfl6j6a3b6ip688wewqwpwixwojkh0go2o0g',
                remoteHost: '2jxhefbbqa7konkcgj8dttwd2a1xbgwlj2frbvwue25bdi08pzuuor06d2hl8n14tkoerdp5jpt0m79ygnojf4bzd6bwimx0yhl1ah3fu61twz9vx5zzol0l1aexci0vtjpejqzikd63pzpywndd9k7bmz0cus2c',
                remotePort: 1534107221,
                directory: 'pl6rl0o6njtibc70w4bsctn8lacob0igqvro5a6kzox3ubp5lrr19fewozpa9xib855ueyjrrnojfaawk6pef762q4nw9bqwfk03zawfsaur8y5ofdr8853zy1ro0j92pb61hbi7iw4kffxthss4donabw4i185d8zt11wi9guzntq2534d9i8g3cip2r9e8gdu7a6idsujhlyzugekezmespmj9jqdpotu45d2jjh2p710kpaxtfy9ofn7lmxu3x1jc21gf589fnnirojbm68a7rlnsn7rxsc4vcvfw8fdsazm037r3ycqyfy8q9nx5kcikdehtg0pnp8e9o0o8g294eh7qme6veugme9kly8kl1q9niialsygkc807rt2208jeme6t4zmc03hmba74c16zc3665erye42op6i6d5imht9x8p3i6aqccl9j9f3bkd5dx6lpe0fqw89ejgkf9lquhn69ffyjvspuc3d5m7h3250whgypg9r4t4acgonpgn431rs8h47bgv9w15pla0lfo8wnnx6jwui2xqk8kta75xgmlyavxg6qql74wnma6b67h89jy7b57j0a990owk4sb2z18c50j81hxo66qz6olm7vakz7jl9b3uezfok63yj90hhhepiq3oxge6xylchictgzkhwn9p8ns1ex8mio4ykcoxvd51ns47qr88d5q5fvyfehtbqo96nig4s8778u5kph2mhmsb0joxpvw3rvwhnnzky9mn3wf7aiujlewkb6f8lfuxipvzolgqy2dzmwun65kcn041u8c31tcfraj1n0pca6p8hnbhbpf2j4gmvu90mw8y99mlj7he4lqb4rrq2z7m7yce8yinoz5iawryilomxj3t5208oi2a93fjjcpdl5017dybw4ynzbf3n4et8li3wghqqaup2rd28mxm6ddurwkb9vr4gv86d9p3mfyb1z4tun6hikprdq0hqx6yo01snexqsdb8ef7rlklar6pt6cvcetcvcfzjvv',
                fileSchema: 'uj7662rwz5bycofdmcrbm6eiss7oqw1izf9izcacagqzkyrodpc8x9hxknr9whchu5do4ypmpgju074jb2c7k2vu7a9ngy3rj95y47bs33ag160hk1nr6i3yk1ib1kzxggm0wlagmzu81xg41ng6mw3qhhdipkhqecmv5cxb1mni8t09noi4e50ia9vjfv00cxztwdiyoug7xhpjlduhuzy0iet3ksthbl37m2umb008qbmtvkzagvweml3wwnw8u27rwacc6vy00dppkyzg5bifzniwm09koobb89yfcinj5p6g7n1entbxusg1kg2uazayjd9pcvksurbd68jtwuslhdljafv1sh3nsip86kmvza9xn230ny0n7qxk2jau6sq7wwtbyx84qt7f6e7olt992b4z1q7ivefxz1ejf95fgi7wi46q33i9y9yn2hn1llabnviqgar43gtfeodxohtg8vyfyujvgwec5xepwaim1tnd39b9s024ctx2nsh9qz3wsw8gm9ep2wql96w34lbhoo7ux07hluo2qbbect29f0wx2bzht8ji9qvxb6cghl1gbmuvnjdukh4q8skraw3h8boh8mzlkzi3gs0yhfb7m56l0k20wzihn7jkzzszlgb5bp6bh00b2rdgeg3pqj61pdeihrkyws16oh38xnl6zxdg61lw55yvcip4c8yuer28bjquah6o0eyaxe55rxfcu4cz03la0oym6bmbg2dkcfezl4510ocmjlt6nzvwghgk82ldk9cv6iuspbbj8p2zfszp7hamk4n3ph8ah9fcsuaw3azo28jmwefma7yk77ql8cwjrla3kgvhx8i8uq60wg602iqy3jjprpdgvr8iyr2kn6kx0ugys7p47sr14ns0mpyln4dclakc0gpkus6uhs8qw73m53a52dq1k0pa07dgrjlcxnm4z86dm5fb6t9l0imuiauzpg0sklvqd746zjzneruzmmkam922f8wvj8in7mrcodbovnmwztqd',
                proxyHost: 'qnj3rna02c761v0n8mf101kutra5kjwjmebswjhf2s11cez0f7gpj3txxxlb',
                proxyPort: 9824421868,
                destination: 'rby6uzlktg7e65nuwdz1lxmkzl7o2teiheld4sfajssflsuodyzcffe1hw8su9xo9x69bcrpm9cla21rj25azc4dy5qsotgyq52hqtfbeaaptj1zx5lg29t5e6f4ki7jwjxbfdrdiyk5wx4oazqm1ny1vnn7ae0s',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ryw7kyfttu87fmpzd9ngnka707c5d2roxdxfd8qf929owebc5lotxfne6pmy2a4jpn5amtze6xa4qxy83btxs5hh9hw3u9a7z70aph6697bwflwsurs0d4qs2lca2bip5wdobaaeico6kwj2oygz5ea05knx7ynn',
                responsibleUserAccountName: 'atuvxlsoa32u6twuqh1a',
                lastChangeUserAccount: '1953rdhnus0yebi2jn4b',
                lastChangedAt: '2020-07-29 05:19:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'zsa4ia939miikmihcoxzxi4ouoa2a9aqygrw23at',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '9v8t51t3gv8jg0afiydqsjskyi50woa0akoj0uaf3axs5i0ymr',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'zw9v7cd9ahpwvauamgn1',
                party: 'tzn9gfvyys9suv4ja1b6jbmn5dykn8cs0h02sjtcpkhojn7nunq8mufzaprv4tyuipunjxswyol32v0rvxy7k2gr1inz3tych9fufhjs5fydrenyr9xrfhafo7bbs0ig9pqausyl07s1opasz5y5f1yba289kedc',
                component: null,
                name: 'lx56qheg8naa62trbj7q16ncrm3wyq385wt18zedokhmfdvyzty2ye8sxu1x3blyqcv2z07j5dinje6l0t7b2i92jwji2lthovabjynjsfir5fgf8ncbl4dpnnci1ksu5xk123kf79omnduazkw8vc59symdkdez',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'ks2npjo8b9xp6xfibm1iocbuyb3iklbzsaj1lmepcjieqnshzvbacj4i65491oript24khxay7k0b9krhl7fkm72z8u8go521k5ad6ssg5fyytezj7ijy0ayk1zgj5ddrm05fdy0gu6flky94q0j7emtsq8o2oxg',
                flowComponent: 'y7v8mfe63og0olcuexg63dm5jrsuwl81t80hdja09pgf8crjh60o7jbyikugqdjdrkovbb00umd0sidu2pp6dwgjpcpccxcgbzgr7k17m24pxw6r3jx99i22hksn9ukcct8ymzablo9rmh0yml1zjdmki26bjfal',
                flowInterfaceName: 'benhwlw49gf309emkcez48wnutlp1gelgg7ai3a6ljiozdiicz3uf7pva8s6i6po6mmcmxqdxu8qgug8qspy2dkj834i3nufrtux9oqdxw8eip5un1rap754vxwt2xmkikvojek4zvl8e7gjolxh896lfl7gnh8d',
                flowInterfaceNamespace: 'bwsz23ce6pv5n02glw8p9tno3ggeyra1f7197j0s5h0gzj2gx1uhng5c37g6bqo3yti9z3clkcm4qd7eadpgh262k2mjv6x4eildo9y09i3cq9kn5b6qbhv978zs6soe71zt5dsfqqfe4quxbgk7bcavnc86psw7',
                version: 'xrxydld8d2k0usj9maae',
                adapterType: 'yysms7iqeegfscveb2w021vwt3dun9b55k4vywef794kk746sqydvkknq8jx',
                direction: 'RECEIVER',
                transportProtocol: 'gnwyeyd62mieidgv9llk3f7xri8u9bjr8174i5r94k8z7qsodksx8at3eeya',
                messageProtocol: 'fizoagenn2s404epopyshcksv9jzju3npyl9ahjvlgnu27ljcq835nm7d4jw',
                adapterEngineName: 'qfjoajsdod60k7snznqo1s9hw5y6i4j84mx099e2elhls1zh1h4wvldacwbdqnq9cgutpzrmcdyml81y5f0eutjainv3uwry97nq7p6lh1vdvttyq90f16y5wf9lp7tkv2p4xt1yini90xklzhr0xpf5i5psl3pk',
                url: 'exemzdo3lmyqm34qp5is7nr6cv0fjbh951huihxknctut0q8y7yqpvxmxstnl07asmrrzkt3ii3fj30ar2w1a418ss6lx65yhdqo76zym9717q9qpd2tk6e71hx52ws2l59dcyzwmqp6o4zxti86brw3a3w85v7pnzi8nyzekh3xyf9rxz6t98gjyklm171w09z7o4i9bwz0qgx1w5xf28u65l3s0rt97sihj58v0qbnaxs38sbnjklp6rtp7ri8mvr3bv7req6ghxx5sjnplb03g5ryve5ib2zhfwme68cvzno9mu59frihkj141zj7',
                username: 'ebbsvc0t3r4qczbvtj6vzhvjgo0bk6sl5vdqjgdetdn9xgq4wp4u4jp8c1bu',
                remoteHost: 'o143q39pman3ohh0cl5lrffjrb8mv44rxzbz6lvsz55g0tgixdu85e1586flvy71slnnx6kqxm9mpiimc0kwsgp9i6mc627w3srxus520dgg5rgkz1jof1m27ry678ty9hy31qwtlc8u02bjzfrcdwlhh773eicj',
                remotePort: 8354914876,
                directory: 'j4k60ls395upo7dyy1wju7ldycqvar6lmph9y38vdd0sskr1bumbyjoskvkxcopv21dxs4cvdo9tq18w4k8xcbb3az26gq39wivwywb4ctrwowk6xorcgn3p3rkux269x99t04s8tc20r7opy9dtsyfl8jlx101pxfv6mag3wtff8kz50c9krl5976385ngeetmsu3gt61v6cr8i1wiestm2p56hw2240ervecb631e4ouy1e9lv445258nwteeqmvb3zp4rq2bhzmelyumcit747xhkbs5vs3lzs8mc3dv3ed69954rlp3omqy2yl4156mm0ndscuoapvupxkngpvtxj5agv1jrqvnbezsoxjp2s5nrff7k0y43vppp8ifkr8h4rjpb4519mmuz7l8p5ygvbs7xbz3w977mhna3gr5iyo3os8cp08nof14prvqa6l4ebzr442a0x7mvqzt4wptso41r5tbwqnsv6isjygbgma6e4fvpmb0ra18q6c3i38ww0ocz96139kpw1sxvi71zr9o4387xcqnpqepl6r3qpvaey5zdciu8m00rjahxu85mbxafnmbc508qc2ihu3jmpqj5zhdsksbcbka03tm8yf9nz070i941pqy8hjvr023q5rmogtrzvrnpgyt0o2iiyyrqxqok865ijmdfed5ggp68jjsl91m52bvsqkf1vbsumwvdq0tozj32hvxu42w16j88ifyorg1y5adoildasovv5yl8ng8jnr3v12ls4i14k6nt2j8953iqc0e4tntbhudoaqbounl14i11kchsrcza9w2v7uejywv7om0gb8nuv8scnxggaimsiykbmxglrzyg792bqf74fk2opbieixmk5m9g5ubgb2tnab6t4no88zw3twndipxz5tr8mdv09w1m9zo8d7ywf0toa6xq6eu1989334cypw08gle7svmiarstutk0ewlasr2xi8o9pd3pvqt7b27fr2itwhm1a2u0kb8yms2uta1rrofc',
                fileSchema: 'roy8amap2kjnfq8gj0unufmfgenbg3sc14d9bnupndq9t9fv5ljnzqm3b6pq9os37nv7zcoozugwp98pgrsenjixju2odvyztluy8qhg9zzda2yzntt8zlfl4cj05jr2c887lyhqymasirydslt5u3xp4hssa63vn0vv601olyfm3k8209bv8vy3b5f8etnqx8of7or0zk5706d8xoxwjshvw4rwwbyr2zzto8yklgr8g4clwlqg5zquw69cfrdy1f264t2dh22uvfauvnj9wvado1aockcoxvlqd88hze53t3bj5x4xrd3w2v7ervsuk5feeyq2hrymz040b83vit4xq790xgptqm4fba8ru5fyayibnqkb5adykw3wrz1qa1lafa91mqwoo5buxtk2nsochk03dgqoo1twle1gdquroz7shz4lfokc08k8jo9uh0tjneu3yr09gaj7zhr3cgc1ks9nkkpc1ke48uco7qao1oyzr192zqso6xcuq6xyjv8oysj31re6cjsqc550mjtm9fwuw1so7l2t2lexgpkcrb97r843j0c2710v52wfnzzih4yhj1vqfdwrkchic40wxcp3tz6lr9yxdpuqurcyonequd0jn3uo9nn0sasc977ld2xel42l7mhudjzjmgx24iklxpjwoqdrtlb4c6fwryknqvqoy6t74qpaonu6rmjwhxnv5ysdzgnzke3v2sizp7dtudngqbp953htqsopjolq4qetc8il76rce7nr1643d14sm3hti5ew9znp4xs1956tyk4xbib9gknvuwzh8k5qtjl5vj36n9lon7dh9pqdyn0lz0n0coy98wba1d1ers5cgj6l5mbrwa8h0c79a8aeld6mysyupu13qra2ivvlzyfq5axho6r9bcebnbnx9005w1x7xqkwizqicj8fqla66261tzf00c5bzkruozyzmvwdq685ixdjaumlrlf7yruaqht7zfrf1jkf6k19s5vzwax8lahdk4sd45i9',
                proxyHost: 'ed5qdmrn1xmnei61buz2kvssz59fokadyqvllrt2oj2wjf2yyfandn2398fr',
                proxyPort: 9803744879,
                destination: 'qqoqpc7mndyj2r20ax8uoxzw6n8v78ya08e2ist932vgwry11ap10jbogkivz5ttbby8fl2mc0xndy3obppsugfqf37rd4h3on9oim67vmb25g0lt0kg94lct7yy6wat865pyw9fjur5eneop13z445mfmymbi0k',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'o8hmji4qqos7wu20tg68gl4cgw57yuhpizfs3wc97l9gjn4urj6mapkk0vyeqg8p3etdnwj0jd3sytl7pyi6qgxoze1ktspyugqouwj8m8l0b0xheqbxosvn9lg4x3ebz8tnsvrfty3yuhlh4ha1sxifjak7kl77',
                responsibleUserAccountName: '0jt0n17pb6hpi9jyxlny',
                lastChangeUserAccount: '1kmfdw3bif5rjhc7half',
                lastChangedAt: '2020-07-29 06:39:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'ucyl9j3qorcuswbkzll6q8f7wkk69ftreaxyx5ww',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '4th001olwwoekmt1b3vlzwuinhg0irc98gu91qbbqm7z5idn1h',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '59pw4a0jt41rlbduqyto',
                party: '7z94n8cg1s7j5afqak31xxw59diwseb5k3qgywux8a9fj6a09ws9jfi5vcggooq7x92vs0k6pr3h9c2805d1awr3alks96169vfj6q0xc42ml9jqwym3xeo4f5a5utx2v3k5osjwh4bd3lozigigzd54jy6pk4c7',
                
                name: 'dr8etjrwbcydt5lg9iot4vrdtimk1jgxo5gr6h9yheqgw25miimu626n92twcfddbn8kplhv8sabnz22svjybr1jzkxuvihix25gp9vtrxf87nkmdryh271salyz7dfdklbhsgpxyruh99dpvrcl08px374up8x8',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '9vix114w1zd7fnsvt98bjdrl0pucgm0jnjlydvzy6fqmt1nl1dl6oed7nbp8vhfh7djjf03zymey7dl78gb085ebklp3ed7upxvubk8xp7eegkanvv3wl7z52a2upbata03cmgk262h6yej9iad9thhegvv3bs3u',
                flowComponent: 'qwn43gojwx49t5bszjkoh4nemkez2k7t74rgn2ete7ygkz5gg592wl6pjz2aogs1f279rv4c0fpoctgf3xw8qjfk3ikng2169jkp4py0t3p22vg06vcpfs1pdmycm6c2vsvyr3c5ghkldvfrj3iwxcf6jh7o9msm',
                flowInterfaceName: '3kfyyb5frj3uidtrf0fker1ri2azslplu7gr3frezfrjuo49czwhw9x7ac25y7m8kij4ibzkp36a0d8k4k6p3tqsh101ci3dfya0jdvb130n8bc2bewco2qi2l686ka390z42ffmhdm6a6s1v0m61qqs6gf717p2',
                flowInterfaceNamespace: 'te1if7mq10cgyhwc8t72rmognwcv3tmjgf22q7kppimrx35pvtplpmpacmr64ryl3lfq2pkzfkx3i4qr6o5n2prp5ft85x5k3totjioizszx2o8n00ekr2rusaoyo4i9agnsnpdsakdlkrciegjl6lymjygcnkml',
                version: 'ya5m5uz623si1md19h6n',
                adapterType: 'cixnn47ui848g9siuytlkmz1u84oikx8mxzrywzd6kt5pt9wa2vthit39fyr',
                direction: 'RECEIVER',
                transportProtocol: 'sazdmz2cijleex02pzqv7aj762xrpdo2fk5qsoncotxszuk3pgiivsvocn3a',
                messageProtocol: '73hb6uehhaogqpp4pqzx45nz3lax748dmsgrc00hbi3d2f5lvru2jh5ltjlo',
                adapterEngineName: 'fewphztw8qhd8whxio2h2f04w9lzydpqjdc2da0a5p4wiu3o8hr078ee0admsp3vaxhv0jgmzh2lsq3bmj3nhfnno5zdrma53uojgz7edk6ih3bj482h39gfl2447n872kgrrlluu4bbwqqft2hccmtkj1g4j30n',
                url: 'pcmnzzwg5fk4dc0jh4e2vziym3e71g2ysi1ymu37g2tlcufmctlh0fj30xp5r8rc6r8j0ae045gyksqyu8as6swpzf578flzen8iznwkot3tgghbvrdjhe5aroq8d2lugcc38l9dzvnp9pn44mr28xe2as49u2gjfvkkcg2nxwfg45e90oiabf8lpsrgvgv6tvb87hdby4b9e6i5yiaow65qjyyuf06keux6as9hyso6xmzu2fgpw53zg9fh9p6wvlbpt4d2anm944pvijltyx54d0r43ndru7o5uslv5zgh8z75nrkb1tda5w1w7jzp',
                username: 'fl2qz2biwnp7gml3xsgljy814uj1e3o1y5auiy8ylx0d9fom43nshw0umm34',
                remoteHost: '2ranzc6kddsxm2kvcqg9uxwbl8jpst8kf0lm8pilj0vmibokp10ze0hop5s7i4e3zkue418t8nr6npac3upkivqc2ttn2vq4wia4j58pmxass1rng6x7id4ql0ewx1y900pijfbrlm93aep97jqi6zn5pc9qko4q',
                remotePort: 3393377608,
                directory: 'yqsy4a47p115dlcw5fkyrxmnt4qj0t542477z0m7flhsj7jn5cdu96xn5dvq4o7i4xrp2do5v7g94ybl0fcslte15zdbvogr5677jea70xcbvoexe7nxzym1cfneg5kun1tp310u673lr8ehoxua96v2qe2nvjypqvb6iu0icrqijo3w6izcmqqtkmk04zpvw5h9acplve9h5wvi4izxpik53h2rp1dpng91vp71uq0acyw3gssbktcnbuzab4z4nwjnh2vocnjsz83klquzblv06ny2dtfaowskh5c33uhk9rp8bewjq0nvcaoycdzkua57w30dz1jd9ukhrwp7rfojwt8ygy69h9gi4qyjs79ya64doj3g8x2sjtkfq54601aqk5ux4ks4eegeg530a20991pwcuk0z5t5rzzxycpen98s7g739dv44zbjfwcu0j8ypjmbz2lsly5km3pyxfml3hvzki4djhgyvqcuvrg83ohamxzu4p2ly5ux1d0bhnkuob06oe5dhcm5d7zulzg5bwwroy4xwutuo5yvttgbict8je3nujc8ilbvgudg3lal15000sa2dybw1zroa2ng3yrln4b1q7h3n2f0t5f4ic5ccns92zafpbhyv0zpqv139k35409llduomfg2krhmaw37y0btrush2unuidllvbd21f2d3ypt58banp4qm1ul08yj43hfv7t2rw9nrdfkftzvwnjve017pdt1ype30dje5iq73hedl682i1vwo75k5mh85n83gwl8cu2r1qq9oazkp5jkqrn2scfq0eaooq8crh6y3h63ff4qvmo4wzghmgzd3j9gbcilhl2nax0cblyqlpok2s88xpq3ufz8vy2bp95gl2eoy7ynj4r89en4z7q5ujrej77vzdzluep9s6z0d60212j18c0idzvqoc3ou5nit8xvisaogvlxivd2zevuhhdry5crwsr2ponzrhhcc2qo009es9v57frx4xgqwkm7ccsq5apv0pe2',
                fileSchema: '3hq923zsbjyh6puglctqwb6769hcrznv7d1x58z2r1buk204skh11frr7bhlhtubtxqnjg619p02z4om3wa8ghtdit9je231evwqdrvgf08re70r4xfea4w24bjqjwp6alxn4b1vsknkl2xfexi2geep7aifhymapi6c182vjjh1wv11jrzj4okgg052uzuiujq1c08m0qs28y0s33vq8n2nsew31hrjxb8df7pb1djyqj9jn6sodor5mnoun98h4ggxuupejpub0d0mggxcnmjcr7m4ovhkk9xc31m9hlrw5zoyfvn1jts8hl1s0xrrmv45jm4rc3oz5a4qbey51r0i0imvaq6t5jpqxxy9fz3u4vyrpc5jw3xnkuxcabuh8f0unqt3hmz9wtlfmw3lyzzrgki3fr4hefv3shrb2d7shsrojh045qm8na459gvth6x1mmcwnuwq2zcm22up52d4nva2m7fz382z23p2kjxvyy99n783ipyihcjsz13jmzf8i9x6l0yfdcelmcw2ppxs9xs6m3mgogsixe1jdjxdsq7c7q95vhwecfg1yrfxe31q15vofkgg5k2bpylgr9w3vwhaaouaympqs0w1ypbplwiyxp8gnbj8fjeeds5jy67wr24qukyw3vb9ar67aao3nsu6b2xgpd114msi56cn0rm32k33fy2cn2my4ldt0warwxsc6qkn4gdwxa9b64pmc4ln76erk5pcodtpc0nzdch0gqb5u8jh5ydwjxd44fqyt9txnt4coxy130vfajtlit6rnuqhst72kdhnb9w8s8tgc13q07lsb7hd1f95oddvsipoqr77zdf22mhqe4tf3ml12qf8qc6xjzdozauedjdc4a4bc01r1u3hgj1vnd5qctzo8flgypyy8akvye88a8a7ezf1dhvcaytrn77gcijqspke9b5jjudss86uuykg0wxikrhlofe6g2c5kcjrhc3srrfj96ygrsxeyqel2hzmc5h8r6dgt1bq7e1v',
                proxyHost: '16osvlur4kjkw4oba5a7c3zge70175zqw7589qsh10uibujq2a24hq8cv48c',
                proxyPort: 2066745003,
                destination: '3mukwssklj3c2bilg3vd7s5l03u38f2u6g6ye1zj2hugezzyhgnauct1w1sc922dwuh0b6gfp1jq8dg0igcwufq93jt08c0737f1froe906wcz5u0zi61j1s9e7ortk4np340wh43383jwqqx5ye7442f4fy2pvy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5z00ybjwxrueb7di0ld276qrtbniyy0x30xmdybxc5fkmp75we2mx45g5e906t4brnflxmpiqohdkp217mlgnzhrtniw86ng7fwruroqhe88nlymy469lmwy0kg3tru8x9zau27n9a5x1oxsbx0o5ifs49mdfs1g',
                responsibleUserAccountName: '1zrgt52ec6hxwt5uzsm0',
                lastChangeUserAccount: '1k5m5qow319lbdzh27bg',
                lastChangedAt: '2020-07-28 21:48:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'si773gruobltcv79oajp94qr1ht5p8fq09hk61ir',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 's4126cz7qcf6d3ayisi1sjx6nll5wy8t7gshm35uj0thjrpu8c',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'gi5f2585v9yympyczif5',
                party: 'cqdwurfemnvbu0z9q5p45fs2zc2ca3ocp3dlzttp31iwctv92dnft1jdwgf1vb8oauz9q9folv7wmoej4xis2a1rxcuzutn4w6qsyc2lo8yrmhfiuwnjo93ki7vq4bupzxa2gb86w41jhr25yeo4m2x6uv5gfjw7',
                component: 'gel57eqm991kbakh0pguv0xy3pxeyvtk2z13f46o8sb396flrrgostsc964vlozraogtyrd2rd6oxsk2zl9qjt894kpj3ii5kaum9l2r22xzj9r4ziyewzktz9a6lgpbcc7g9pdsqxk7unda3fzs3d1dgd89mpfv',
                name: null,
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'krksiw6zsche8yy1t62m65xzbjnkuw5cswxf9gzugfdwg2pzgwd220mdicnl05k2gyhjjwvj8zefjhce21gorozt1g94zxhbb17tbk6a2fgqecwxq5ixd4bzsnnwkgr8xdg5qd1zkjggsx4fycyleq1iyvyfwtzz',
                flowComponent: 'mw02i60j93atpbtasx43a4ksuk1itdz8c6uxderegs9ekczlt99du8l1fqy5qlw16wlakfmmj96u6moy3ll8cns90g1vsimb072551a78x2u2jw1qa7lkffrvbmek9dep7nqxkhnaksobyhhhl2zq9244m12detx',
                flowInterfaceName: 'gr56yt2pk24mv0atff87s3wyrii6s5v8onk31ub8eg7ezgx6d7vv4tuiy2kyyx696j7vcsk39vb424juhvskwup28uy3txjuk9lu73h8oe1sp7wv84uy9o80ybmhue0asx55803uuey54n8p2y6bj99uiotcfd6s',
                flowInterfaceNamespace: 'we2h5t5norbw1fl64n5lumm2zpzifr1ufdsk2g5yk4gin3ams7ml0d8026w10hqeirdjmihvtdhiuyj4h7nldfkuo6a2si5g91bfyq04p8q0v0jz1jk8y999tsde3xkdd8tbu5sga17exse5aclc6wxhl8ty4o6q',
                version: 'nbcym5kobrnno0m2f7s5',
                adapterType: 'j0vg2yp65l3ghq2sb3ml0ct839zb2a414vgzrlrhqme5f0l2u0qmc1v9wx1q',
                direction: 'SENDER',
                transportProtocol: 'orkjf3w307aj1wrqhlt8i482amm2h1toq3uhovymawbpdzbdtcixui8rx83p',
                messageProtocol: 'spdq6z0v4v8a2b5s0xynj54g1sdh4wxvz1i6s1ao239rn7regjo608p3p9o9',
                adapterEngineName: 'v3g8e2z52sjkv8sshdhnhmp9tscx3otpc0n8ytds9d6fs27kzp3p6v2hkiqw5f6tnn7519835a9kh7t3s5isr3unto556670s1xe1v0834hvpmf12l413uaj8xd72405esojibocxd8blt9c1nc1barbvy9rqhh8',
                url: '2g97korw7m5x8p4dtphrhr7huhvnair61l6aukweaqc4dll698495ri2ljts4guq700wugg3b5tmuc4h3b6yl4cvkroyhsp113t4ia8xej06lqb4hv26atyrxa4qo5sww2s8g8ofwxqfwe8k4jemjrluma11ux8p34lf0tt4eod2y7hxrpzfomufrogc5j8g6w5vsx3qf6566j157o3es4g6w2gcmev3npqj1nj2n30lriix321716srollxyqcms8mzo7akuvoaxsg5n43gfaqgek9rs4c30ylqems0jv8bivajh4mk9ia2on6ips5l',
                username: 'tnoynqvf3b5n7jyh4xhnzsa4rosh5aenggxbrycssggdz62fmp78oitk4051',
                remoteHost: 'iroo7l3d25xp4dxyfysgg2zd6f35ojnfn98e9nbwjoo5escb4zbanroziaycqyut1o9fy5xuksm7bzg3ei2n4t6gv20b1xvjo8xw0hu05sk4uft2tc6ede7s2qpw7qtfp0i4jfpvyt6sp1umcoi9xhb6r1qnugu9',
                remotePort: 2224768512,
                directory: 'qsxbkbis3nlomd2wlebtm2hddbjwl8ufv5vrbdrw3m2x8owr312bonovnej6ht4hyxcwp28dtp4359w5ajrc9d46xhuik5a2reh9v9b4u0h5gyjwyzpb9qynxrn6xbllzdwsumbd4zk3x6g8ruhl5guwto4varyb9eyhl7umaf75fhm9jn9of50xt8260pdrnj9vogvtt21o5qfhjlqmo2c3dwqavoi4pdpzx4sj7mvn404yqmg0hoxvufhqv8bafdxurtl02xv7gla0s60p4tdaill75osceblhwwgl4xhja4dgrf2v3087fpd3rmewaxpd0faruvf8zb6dca5qtfsmw89x8dmybsxywpnycts9ugiai7it1z986j9buxri63lvnxhcr0odbgy1aifcnytqq35fljyg3j86i0n9pgs6xbwx8w37gm05rpmi3kfaa5eftasm26s5f14houibi3v5mnul4bgb5s1xddnogwh1682gtovn1ajylnh91300qm4v6jgepsk2bj2ojhg05fz7x377eatv0s53p5wmva3c0q5kpwub1vuq7dgn53ve4ru55cvcnsti7lk9w4ibd25xtzd9a1k12rfdom0bde52aubh27xxb20lsalmoko4u2qle99z9e5zsvyfvup4ebvz6l0bzgowq26991v4b59gsu5f1nf907hvu549zxbw0cqdctkjllefum4e1jfx3pai8iqthd4ewifshacf1vyb9ceb1wfj8lteurzodr5o3r9cbc98at1fuuz0142pc2e5ivw4m2kyr5xfcjetza2ex2nu93k3u1o5d3ipsmytv6kkioqtxcj3t4m117x9jefaad3z8wiq9gj06fv1j9sdf4uzhabucozkpx6ee8kk1sgve2a359gf25k5wrrur9t04zb7nrlnbd2bo62eftoq4m68wdo5vffgvsj4h3vaevenru10nkw39z5vbei7adv08xy8ia5y2a00hl3qn6ryct2k2f0odo9lva4xdepm',
                fileSchema: 'p506jwoigael6gruh5nn8mkupatnyrtaw93dtqv4jjwhinyp7h4bjoypa8ug4llcyaee9vjxdqro5x2973dvlh8g4da1h6jnqgvpfgqsf5eq41staskmnqgvku11043owpumwestt18bda8z0lc5mhbqwa59p7vj6ehl00iz7vqklh1f4b48wq9obs6zxc9bxya1u06jiejko7n7f28fbj0xfi4s8ldoxd6owwbp4wjev1c4qenvh4x9ggmre7f9d1sqwyjy6u2yf8m6vpui77k70ld9sd7nuqnsqd3lekelj3elttphy7vietlgsaxbfg7t7fihp6jewe238xgjm2e78y72cix7s03wcicy92y6nmfjq9m0c7m9mejstr02kt4vm03yy5z9o256avru2m30nd4x8vt8qu2rlayrb5njvdsopmmofmey74ig3e9bpseh4vjxqxk4c3h6fdertvymovg1z8ibppxbj17s53jkcn1kpr3f0yboyh70juuswbzcyo59jamo6zgio3t5olg4rfq8894cciuapi2qgd425u4443han4ng7tp4sy2v3dioatb9waiw4sfwwy9lzklbld8ihx42rb3loe5ptiqcs4oqk60g90husdcvk6btcjieqg6m0cunfj8c9y4om3qge98x01ihxuthcdmow2yo3sams45qhg5zjsl57i01yuwscltepou1mihbvec6v0rkpwgal7gx1gj6ve7uc5lthlqdgdcr8ushi714c53xxx7o7o6y9kq4sdkbrbvuar7h8nu9v3urllg2pvusvoyl2szh2srfy4zkfvurttzrgwzrejllh1go2zpixozc1dluyoho1umgq5ekl4yhhp16d7s427sy4gx2jbw7q9zm8awl604idktbinhrpmb4fh4styc0c4kjgrw08ke0wz5fgpwaspeeobviyuxn87cybkpmibgbffdazw4k1ghgf8xljtiuvka0x254doxpf0p592ad3kykx8muq6xdymph',
                proxyHost: 'cc03kwdrdzraqnxwtngjx8if8zvz1fv7qxq9j24a2uymemjv0jf4yzkj5ry5',
                proxyPort: 8991009290,
                destination: 'sa9e38qbe0lwgq6i2npq23gvzzxes5luk7j7warg8eam1z04acxnbk7shwkcmqon2sisxeu33sd23l032xy08b2fl867dg98t7soev4jr95rha1l6kwpn29cfrfwo1ros8aurbaesxl9nd6ditomott56d3b95dc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'z6y9ex62rwmzzxkyseoh1gf6mzotghip3ccv1eigcv2jydw7ow978ec7tpqgjoev689l42c51z22dmofhp1hfc30q14qqlq05irjze0pg9iw5nk6myk1nhkmqdob5dl1zeqou9ux4sqmgb5tcjrk3a8ip91g4kvn',
                responsibleUserAccountName: 'vk8jdqa55zcajq124rrg',
                lastChangeUserAccount: 'qpq36rgbf6dkqh3692zt',
                lastChangedAt: '2020-07-29 10:14:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'gpw5pex48w1kx8imlmqwi46bbxdyrq283yjd6fkb',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'e58yka2dzeh5l9g3a1web2mjp285t4cz9fo9gycycahx0m53nt',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'sq4s14i593dzqyoa0lqk',
                party: 'wj0mt98u2pco3aebkjfve6xzevft8mfcen02w98clavgpzojq0gez0r7a6mh9b7rbo9cqwjqjtpxn8tqpethfsh661q99n09m4z5roxmvhaytudaw97uk0h27y0jfii7x13l7nuno9yqbh67xwcfsm01wiljwine',
                component: '8drl6q8r911f58x2eewo4rdm8u64fk7a0ecijloabwbajdwkaovoum1i48avzzosd1iuzus9cq8217z94aag8jsvdu9eqwamgkqyhybwbo7j3d4m2idfs7ihr0ws5ri9zidyunq311qs65flnotun16rg1spe9i8',
                
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '2ejrkwb381w8qr2z6ecqxpsejlqhqpkonvqxffldsbebmpydy59g5h41jencw6n2n78bqjchb1ck9qqbyii57hsm01wzyn8akko97jfntaoofx7j0stypx0op4b8g3awizqd2flpz07hm1v0d53m7s89nrqee2ks',
                flowComponent: 'q3xi3bmmeflrircd8u0c8cyolszapg0jkh7zdqircj0h89vchulh6o380s9svjhu6kf1mrpeog114nsc4geokqpiksg58qzs429l8dsix3k97tbe8ae8p9bm3uv4zue6fk8vy9bsrfj67xzw3n4oswal4ux320ob',
                flowInterfaceName: 'ok3gvzqpgjent4jqv2crq7lyr95g9ym2010hz2ym21ozs055t3aezt07pzp72r7qgrjx844fijcxqj0dl1pszbvkiaqyj9t3cljuc2dd1wpfs5zu4nvxutk63zu1z9mdj9a9obdlzp2ws1becsq3cgit1i2rbo04',
                flowInterfaceNamespace: '78noy2zc7u03f42yo4gutahlsgrg8igags356cmvhfx9mzybc9e2teb52juhf49acxzrnqa4zdigyom2yj8q3bpkyjho6nlk5dsvr1hpiddzng63fqgthavyarzfuena39m4b7nsc2jiih2zyy89ctann95idsfe',
                version: '2ea8h152t91ngkac9gsi',
                adapterType: '5d83jbdbjps8n4bil5f2mcyqg5907vtd68gm1yqfalphaveg337a499eow9o',
                direction: 'SENDER',
                transportProtocol: 'd2892h0lbvq70yyuotp96zfl0wmgv92xysofyybfdnry3eufsy2a625s4edv',
                messageProtocol: 'beu7oio6k8lmo0fo4eamy44640qeump3npecblty9l30tofjlrm6sig3ty2l',
                adapterEngineName: 'bgu9o2bpdipte8i79p6wikv1pl3ykhcjc8fd5re553wu000hmjze0lrbabbuuqiroci3xlwmfd2hclhad1kma0h82dkmdr09o9kj2vjoek0b444x96mb3t9v9rkerwr955qnf5yf7330m62ajxz605smhv00jfss',
                url: 'jbriz91y0xu841ifo9hpqev05tuty1lv65q7stpoo846c34dtr021xqf9929ioo2ymgre6i2ovkhai4esqf5mtzfvspybguu42ydkhj1fqmn5g5y1z7zjkwbh9p646qdsbcg71toirbr7noz2ubp85e6lg4dbqtm4hfhbhcd5k5juk4drytm297wkfhhkb0oc63n49y7nguyrtppegibfo9ci2ua4j2ru86kvvg3aoszjvw2msk3pfe2cea82ki4mqfgqt3li9azda8ev84xkkkvc264vom792hot78rw2l5h2h9ubihnyxbo7magnup',
                username: 'cnpi55o5816bzt0gtdyuymioojwwwa6nrejeam6k3riowou3dzdrpkk8w1az',
                remoteHost: 'qm4tpp8jkf9yz1v99szu8iqalgkkvcain5t88g9ni21agxndrhsgm5qt0v7rzfael1x055kemvrywc14w0bqochzio9aaiwe0igeflurowyjvcn36p2phgakrip9065ha07m5q6a9a9l7d1ozl6h2onvgcq5n2de',
                remotePort: 4015854737,
                directory: '995km8iicuedogjmybwxqv76xcowq36i0s615actimj8hzqgdnzv0uwinbf4opqc53s2azcagp3jywu2qsm00tek6i0xox0nc1v0nyba3cl95curj0905z6xc9kjmh0jk9mknqibq2vu4qd8v70w2nhr1w9j40yhaqejydrchrgyndr5us4wttof5gixpw1kx2dvr8vyuh73yymbtwysbboy87uqt94qx8ead8dv32kvml0xhyhp6qv96xdkm00mjwrx3vltwm5wbp9b2m5rtolefbqj6z967znvt84hcg14hblcz37jtuufzgy60vagt836pmy585m38ivn4e1vtavrssvtzkizk2zj8bpydg3s8t6kzkc9q3gv2iji3jdyv3igv93oydxvrq73dl5lp9dmbs1lsw9tz1gs6uw2aipss1mbstrlmcq1mtagpol1x2rkg9ty759y5txtvs260z9431nsfxkujcgkb5dkygcmrtrg7d5dm0ejsjs27qxx77ukuf82zyqkiqwd4i0x2ijami9qlmgs703urs2cwoca9i6i5d49kslsr7mvijugnlbif3fcktd5xwaa1m6od702utqbpyqpaj589qteofx1ve3so2f4032o1su0bx0v0mp272aryvki24kad1coymfgg4582p1zlic0hfzpustnufa7m22yp88gqtarwyixplwsypjlndj8imshbsnazkb5zo5qc5sj0wbr0qkbbx1yyvrr1h1tx5sngbra3vubk5o43wo6cxvv0zty3o22yg8hkbimys7glkqgc9o76a0otqqemen788lcjrqu39atyrwnfa6k72bjgg8q3ynwuxqfkvs8tunn8pn2u636v6wfxjwvr46703cunvxyxm3dvd9duoiuqmn68hmpz6z9fbwjoqx4v7cagjeb42wqbuc8fy07y9f52yci00toy0ljomuharzvwwt5zrgpf34bxsvpk2n584ksp7hvukltpuye8md50u7u7gvwljhwntyg',
                fileSchema: 'hl4wdym8msh79y4jzuclcsoh3qxkp72t8m3b8etz8t1yykrxfw6n1di38kfwksdll3g7miaizxqwt24otg8ppd74d4ico997cyp0tjmyqhhl7pfmskoroeeuklmw0eic051gz0173f9g1xhfhgdeek8acmtt4ixbcopa6pkqpr2l6y8jcpznwzqluuseldulgmj00biatfe0z461ilp4mspd5hqv6c6xpcpj2lh3jv9k6wb6tr3mkeibu2pqlduvrmgd3mbevsmhn3jhnlv8y7dkamxv5flxo8khogr21ng8zixaf75wxy2ksj9m7u8jz4l6fo7dz63em04bz72j0afhd41orzugu07e27etgsqyz6khkpdo6vk8e0wahi2x6x1n56ohzfzlizail1gy4ss4axtyw6cn5opuc70j5tlrcafax2nj4t6lk9wud35go0jc5jdjm06sd2o4f12oebjh061tvwv10ot3sa43be8nz7noyasuw07t4r2qfao1m02z2wihzx5wlzzjqnozzi8euvu72onowmk3j1y9i2nhxvbnt1tl7ry7gr1qlv8c2lxuj6f7pdwq2fm4sokklif459ufm0pxthdwlt4vui9ftwrbax76cujvn19rhcqbr2qhc06wuqmfak47ltajcetn3trbjrehz5ksej1xotxg524ul0vrhby9q8ovyzc0y2lqkblgfwmflprzuvrpkkbbukzs9mrnyu1j2y1qrcdzio6cv1nzf0a2lf0gdwyhg8nu216oh5otjbyjillc4h4a09aoyqpqciv8r61n0f3igbk8l51z8gkb8qi8rbwczjkm2wjjjwyvoa865h4ruf1ric2rppkpo4j1ez9n3mdfu9o0gj261g89r7jo8gh4e94s6jrf35rze8gwlya866dgob8x1bbh857zj0lr51hrkna01gicgmisdp14lo4507rt9jy81nmw07td5fwll0bnf2h6g4mk848v02eugrz81grladoog97yqf3i19gy',
                proxyHost: 'o6lxq94aaenvpcehccyln9zkgng7hckzp7cyh3j0vij3gexuavom31j0f77s',
                proxyPort: 2237503733,
                destination: 'lhyqpkfz5rmmikc65f27ojmj2g995jwitfew3nq7ss4fxwvls92ql7yyiua8s7qzbnlkegtuq43npiy307rmazxvdh81kbitv6hm8w20dl2o1motqy65ub1i4qvqzwtxmz4ndn2tuz5gukmayfzwg86m5drxs35b',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2fmgg5o5g2tsc4zvqet28hk2gsw1lgzql9ri7anw3vji81rmvrvzcz3tkgpn68fz6bx612f4lki2z3uyz2wlg5r9mqv749o2jc2lelcnshd4jutjdxlq659y26q6c1ux0d4per0ywasep4rxj1h052plpilxcbur',
                responsibleUserAccountName: 'n2mgxms4ta7bgwn6rv55',
                lastChangeUserAccount: 'mwrqtkx5rdiiaj7qiky1',
                lastChangedAt: '2020-07-28 16:44:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '8b92u47rn0sacsoa8nq8zcn7ecc2mmfsxmlsrnka',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'grpvqw02hwkfgd87f5yxv66ao0q3unczkah3ig7c11df2eo4sj',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'a5zrwzgvfzy89owl8omw',
                party: 'atysry2rsot90mif8ce9zmc4mc7cklopqfcbg036pqpjb3gmk8h4p3o7ezdp5z0e49d6i84y22rvtilqpw257vu84eyty52ac3bs6mu3nznfs0a5sdpgc6d9l00fw3pzvprm9n6j1cf47bprqg5522yxnb4a6srp',
                component: 'pqw9nonhmhsjz0nygl33led04zgoickitcgzuk52io9pnn89hceh40rs9z1e9lmscwd7h3iym9achlt8kjwztiryt8yq9933rnoneis203r72yrw3u1dv1v177g1w7fyxygkz7eod9a07jjlwo09qvfjegv13tz8',
                name: 'nwca6ns0gfjx01j6no7l389sp6won3xqui99qi3kzs0ho6w0go8kfr3cnb0xwzu99t7j5w08bsolm1pqqbjzpc2vuhb0zd9yj0juxxvp2wxolldtkxgon83vyw3cs3cv1k5zgm249j3eev414u9vto6totk2j7if',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: null,
                flowComponent: '1krysx7ul02wme18bffygu1zkphtoofzbbkoiro7z0dn12yuyaqb7chzqfquqjpi95weoap6qpfbwai4alyw1jqurbgrwc2w8kxmn0ft7cm766tixr2g5s1b7i58hbsv6ybrvmi359kat0eg9wooc4cwxs7qbawo',
                flowInterfaceName: 'y47ryitszggr0d5eqf4sf04mph9xyy0tdggmzmu8kb9faor0jvsz66fj729yl5jtj5e3wnyd11plejlrkxwjttmruc56h8gdz2bp8ndgvq4gbq1lxni66fip1holjddut1nwbsxgm0nmuvg07djt7ujv4b1pg5jn',
                flowInterfaceNamespace: '7t2mlyvuanogqgcv6on1qkyvt3ozehn4uwegcl4li33qx2y3lf5ijz8l7dw3bnjk8o6vp7fsiidqeev0gukszufxek8b4djyzf4jw54yplduenq2mj5ibw2jfo0tcmcr32b91ev61a28kig9kmgmry2d3pqsjxm8',
                version: 'b2phvbc8fiefdu1civ39',
                adapterType: 'rujqnuc5ez8n9oj24vael897qbjpd8jonxxuegjvkflbkesannkez6ds7y0k',
                direction: 'RECEIVER',
                transportProtocol: 'hjfx3ye8t0l61u9cs5t2umn8kb8ygryj0d1bbo7a4pmfrecbnyz2qqbyi6aj',
                messageProtocol: '8pm2gr3bwyrm699sny7v6bxot6n7abgvaz4qm8qufaeaklw97vbw6u48nu6m',
                adapterEngineName: '12ubzxhhowz52kppx6becgoszms6y2l9evdhrwnnk2y6q2h4161hycvbu199wrunvn1sx5yt0fqj2fceay5z5zfbf4j3rsz9y1gscvhmidu94gbiuuweoohb5biv9824m40ye80dn06j0lrm0hhvvq04nffa8tlo',
                url: 'nxxsntm0bymin8jhl8qxyk0a752wovk74papvqhlg8j5zvy55rd2hm6gzrtopa0bekeddph6vac9fiedi8lj42odfb4sve0j28aug55q05kl4bl1xe1rh11sd20zz67a0rvey38zt311773e8hbcisqsah4bnjjngpn1wftp1dfvjgglsm2gqybp23wm8o4073gilwbg9la6cp60tnrczdki9t9id91wx240sh7asuq5yifixapm6hdcb2ms23kgwtkbppo59zqm46gd94ponubcrvbyg2qqdtwnyqqkniji5zffgh3gefys1byyu9bc',
                username: 'j5tjdjrq19lk1belmbn3tykfvrfcg358y2e1dhg0i4p8h8elz1zq0aaan9ch',
                remoteHost: 'c9wn2716sgg3gxg0cl4xs7lh3934dpj5130kizd4e9pjgcew7d2xvycky7v01vzp0dbv1lb9ol7qnjko7ufi7hzhxr3jr10w61j9xsvsqy02h4sdbpdalmj0nvqz3a5ib1ftp9dpdw2x3kctdsvzlyf9ecwnrlys',
                remotePort: 7715431727,
                directory: 'f0bxu0n92uox4sefo0dhu2dsakt759l6x1th857uqs8t6049a80rsy8yoy9u71hv3nu5c8jboi883utmmy6h3ubztbdr3edqgnniuxb6t5cyr0thqfs6wgnij42nus86j5mz62wpxuonjxdg5dk22ab02odvi33w37kkdktvhf0nfmsdaczgf52eqo5dc3sqlq84m6qly6tjdn7usymhqc6c0wmhdjjfsmski3d9qt015c5o2ztpmj90azkbtyuvwx1tqcxvuaoj43xm1bee8e13sf8vjvkdigj9u9upqjhlglbhuzd0t43ufx0vr207hj7uxdxm5svhua6kanw3tv16bs2d9ys25emiemda69z15jatf1ff9cb7trzods3ceo6pec4r02ucso5uihlig3tx51tr8lqwsothg8dzyi6xj5humwgowg38inghmoo7s8m1yzw5dq4c4022ztyu8xhk6g16qxbsyotjoyxyutq70ks2ebq0lbm92zs3fegm7a683cnppmipfoqqoaefvo9u4cvxodtp5ja07fnfir2ay6k0efdnesgvkghj203oupu8japf67szk5wol1hvzkrwtgx5ggui4w4ytf2ahqmwqpt33pmt0rwi64l41zlokkzesmr23megx2kx653porxm10ave5bpwere4txi78q23kf0qhpu4rjqu1ow2adb2stajb2ax62fa5eluve7k8jfonmva2n5079kth27i34199h5sd3ywugvezxy07usy8etq6akubku1sd9d2hsw73ukthblxxt9h8t50zei3wwfmh58190k41gf0d85j63x25zt7xby7mcavzytn8i9slcpm1nuqt2xek1a55sru93cwgky0pb5cr0c1uqnjb4fjndnzanw7yzo1qr6mc7t3facf0azrsz3pgeahzubdfrr708cld0z0ibkf8kcp9k4c7r3m97tv6iv52j8g6vwgzajdz8u0ss2ubq72vabn6j2m2f7o9z35pfqdovmmu9',
                fileSchema: '17ucgxrh76k1jhpgh7b8b536kr6gm0bp3rxbeoc9sguf41hcz595v5bzvoio902klwyghte049muedjooyxb79qmwgkpisiyeav27i0pqmjit4376mgqiw9j0vpzw4pcexxaq4ap3y16dxaubgmj98vsk8u9n0psqahy0jmp7af0zxgurhql20cbrhv4r5nkii4q76jwhqetvj94suk3txhqwlwo1mb5ps8y7j1gd86n5uf381wt1jvwdhrizop8ests8dymb6p15lp24lh4pmad4172bofzwmtifsa50bgeyh57zwaqildvoh6qnv3njic92q7rd5qyqjlld8dqtbxcg3g4liqsv7gsutt3c6v83alybr8w96v0jmyacoeloyml6731zfz50q9s3oe8fdjg8mktukdswmy1uh2b1lbpoz7e2re2vbija1aj9ievchu8ymg8fa6ni8b2pnlq98na5d7745g4aow9tdlnce757xiuegmx2rfgn87g76ldbb824v7svceo28ddepp54ufpz10rvnlm2qt45x3vxah65dtiohhmwdp8posdytegp121bcdwv8dgjc9dul568o1nh0wga0pv42dqsf7ypljcqj4xhd5zf3s9t1u1dtgzee1vxu3xlb8g16dx4vt4t9i477uxivzrxrc5z6e725d6h8c6gsj2trzik100d9xydwqbb29avdofdaj1yy5g2pr4ay382lyqosdua8ad6i0v7vmsk6e1xtprw91lgnyktqog2xeyw1w47uafcmb7hjtlpl8h8mb0g1shdfff47j30zah60pi9fjeol04j19kl6xfr41vbzc9j1gr8ljnlgbsuzqyyin1c3jrwicxwou0814072wsp5e2zjcofabp1byzck8dfbvs7jf1cnx08eynlyq7koh1af1zslp9n113xvpxm672uyazu9mvn7qk8k0mojifb1gyypi5abyi0lm2t8a2pqoia9wgyccdbep0ya5qfa9g9kxg3txje0h4',
                proxyHost: 'p2i8yu7b7xrd2mutoenlw8mdfaesnb1515hu970n54tj0v2jdiwexofr3rdl',
                proxyPort: 2125920004,
                destination: 'mmovixqybqkx38yfd73ijlvzwadatcvmsbcsdnexufq5mxpupz13kna8xpk3gek0ydmng306f8yjq5y7jfce1ag14u9ybod1yzq4wt72cmr7pjgaa6kgar3kxld36y51288wszngzjx4tistghdk0rghjgihzz6u',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tnqnmtsc5ns26t4ke3w1v0kk2hzf6lcem9mzgqppr9xype9bsi6ebmp2l9kvacuz2b1h8azfrkw7pofde0vk8jjph04ksvl4a97qgulnsj1lfcv5aofos0j8uteaa2k8mh0ebum4kfj11verwoqjkhywciw7adum',
                responsibleUserAccountName: 'ojapnvutot15iifnlifg',
                lastChangeUserAccount: 'po0s91i009et0zjaz2z1',
                lastChangedAt: '2020-07-29 06:34:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'fg6o2cnuavmo2u1idlrfr1w3du8vqxl5cjri2w98',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'vewb01f7wa7ic4kre0mojznpi3qlf9bdal5krveabw5ahoqo1w',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'fwimjam0qnyc7i9cyjqp',
                party: '4z8w181p54x8pv54dlcjrhb7q4fiq9qm3z37x3hzqz93qw0eeut5gz5kto0s1bvvqxnx6p55u9aah5mvd6m0fprdcnw1n2v5p2pf759mqwaku2hl3sg78m6iwhguern2kaaolsqdlwb72g6r57wmgo3bwcpdl5t1',
                component: 'qwijry5s1al0mzpeyiysgep288630vx9guuw8ewyozrapy54t2752cue23ne0we3q7gddrht2xej3eop7b02858y48ub5syvho1jlow36neddx5ivnliw9rr6thb3rs9tl6cbx0jp54skw9q2eardfllurkuojob',
                name: 'xrjzxuk9380rn0j2xdp396ofj6e9zoo7q0i25uf5s76pjwflqv814eansluncmlgryafmexmgzo3e7erxo4ymulxn539od2dj3anslqkm5nma3g6l0t0v4lkpvb4brewi5ih03p3pw877casa3o4bizqfzq2q9rl',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                
                flowComponent: 'sr92f63ub120gpk7f7l3admnvl0d7ksyo1t50art3oyhtr0bptaoao3svi3d82mirxo3rvit733aj3pnruoau0k8tlv6vzahpbbi1gx4wjva13zgijeow0dgy3ggy05obmsqo5k8snvpam7ity3l24gvryb3jbc1',
                flowInterfaceName: 'txkpnlekc8pveejjwny2zxhr8kxyf4fprdihcabk7dsyn4afkcedr69h6uetaz9m8t80iebeak2k6ntnkfkyq4vqhiuaa599sir53axknwabzrrt1zr1iie53b7mny9lpzqt5wajt8k6jeq6rght56yto3k8n9lu',
                flowInterfaceNamespace: '7ylmwh4wo0tf27qoome88tmitvxepdenbn57g9vkomylu5uvqvy4i9nxrlg5mejpc6686j0a5ltzw7j0hb7sdi9qoj131qxsk6i5ku0pij82jb62ssmomh2jbywptsgo2d5ggl23k7q284saa35t61uz5z367uaj',
                version: '9tfozd5tt2z9jqkw85zi',
                adapterType: 'emk080qxt5x3rvrlcmced0j8p1k9nsevq90o5t7upfb3y86ksfhte140x3sy',
                direction: 'RECEIVER',
                transportProtocol: 'enthu0bsufcqcb9ky9876dvo7c73u1rfwqqehjfhafn9amu50z1to8855da9',
                messageProtocol: '11rijo9343zgw9ds637hy9s7kblps7nw3r43hb4gm0ad00qe9fqj22fotj14',
                adapterEngineName: 'ewirkkrglnlurimchoavihvbc2nufpxclajdjvg7hfjvmqth7hojkyxjr5d9jatsehduprwaylcti5vdoht8wr1mcw89mp8fq7k84k0iu5t1zv22v9tqlmmks79rmy14o674co7zvzces14oleb1qqcnbauat77a',
                url: 'pmmri693a5c0d4oglwbm5kdopch6g8zb4lafkaa00fsuff05enwd61bgsgp4qus0fkwgl2kgl9zkc3gpet3tiut8wpbn7sc135fg7v2vuolka8bgxcxb1eejk6zpgcjs0ow5a53xgmziddqujccx0pn4nhf5ar835p8n9zn1z0r10wu7geeo1iv04r32pdvjm38ayvamf6rdjbwrrppjqw17pflfabr2femyojl1l9ppj9tq2yfzehfk8ogsjrdyb39690fm7oxi90vyxokadf6ri8jl1yn6idpycjax0zjqnqzl7hk35sa2ulp4nva9',
                username: 'gl7py3117j8q4yk5gfgnwtnbef1nv2cci05gxg980xz6x0rmwfj1u70co6n7',
                remoteHost: 'ubqgc0tln7xkwog7ay30w4yuq05q3wbsycfstgl991jz2qg11ux3cwfnsmcxf8fh3me7adq94iuesvn35p2g0n9jwma4xpuyjl84cv3ufqbp94ghxhzly8t5tl6vnxzvncv2fcioz8bs9n4rwoa14umf49fg8buk',
                remotePort: 1142737289,
                directory: 's9qqtbgejd87ifjtozbahu2vku2mxng0xhdq72c3fag9ghg9zt0uytp41h56dbryx9raahmj38262bc4wpz8ns0c4mc8ik95sgwtampahs7hho9t24c9a7cv2v54xtopsuru8e76pkk14fcqek5vx1qzg61dofvz5m4tt1s5qguzk62oyxcuoepldcvh0cisz3mhfeetfj7padhllf9a2m8hl9xxh9a5sja0t0d09r052dxqncs4xuhkx1rilualb5hyr2krpds3bohx7n81varh7di6lev3tcavgepdaq3vs380tp3ho1azecwq4szonbp717h51x9zkv76r9ovqckan1uikk9oimd5c9f9o11pfguzox8iat4wyq0b07egpnltc5qepnlfcr4fy9e7blckm7sia63gghn3lh783249jiofzvq1q0iggi6qua4ijopwmj7zvkflvj3wglnpegfbfcchedl03vm5479s0kflgqgf9h1vggdi0xazoxn2t7afe5doorn8eic17ebgg9llz9hvwxbs39xeyoqd0xh5axokajwppn8hpqsiqljqj7tfu4w4iezb79bgid8wdyfewt9jpqmp0nu9cj5i7nbkvbzy362x4ggmhlce7cv3lt00q2yu5clc6661jbajq24ozk31hrzkeiy2yyyz7jvax146dkhxzv6qajjqfcc297d4tvfdu5zw3v7sjeoxy0cqkshlw7wpdwhm0gel3hbk226be0ucfy8dla913mc2llawowhijbqixe4jmq2aqwkr840euehk0jz7pji076i6busa8bcv7k0xp4rvphim60qlcio4657er2c28mt0gv93qnvxicxie02d9rifcc3s4mtjupri6sn9wwacrvbu9u2lt2dgal8kzd180dpczo1675fu5jdxeuobm81xmse5d2j81qd06x700o6uw8v8rkmr7jj41r0cuh5envdg1b270k392w1cnmprg0jnrtu8hj7vxl7j45kpiphm87ju',
                fileSchema: 'jv0b4r0q9jpvtgvqevn8677hk0bq093oivehjqxrbm6btc1xfwkirhjeal2kwazmu4id1sgqztkjegiywrshb2nuypqqomb7q305segs5kbtiffwh81tpferuov0dz45m3725i8titew7eiv317a0jam7syoy05glth4fndsb09p5j6sbyglhblvxgl9wsec8odsrsqkn4d1znnzpiy17ez7k9n1ddd1u4dqttzqi5qscivxu55togwgy9ym5p7660e3kf9chv0opt05itcgbgl0jifp0mggsyi99zreaum1ym7jbjzfgz31qnx952ehd7phgk9xvgrwqomzwm2ktld2anccr81fp1so7mq6j2l3cv0rkyy81kwzyr24morci4lasdd866uqakffgdxs1qg94ksr4nptdwkpcmf6jgazzq5v68kb53cw1twq6650avz8rhiyspkkw2sbp31et6oapvj3rgxh13q8c7r8zz3lsyqsa8aq6ltkfd9jnigbzpeb3nqf4cfh2yr1jjgxseulnjzg9l3oyv8ivgrp4iw35a3jcpm5vkghpmmyfc68k6bp2z7opoetf6x8a8prx88np1pe9srkutnnwwubw1yo6fw5bslibbv387j8rrc6wc8tuekwvd908gu1n4yo83zf52km7h33jc3jt5ev27nqk5wzxbawbmntobfgvqln6fowwwb064mep3h3al7ndr2g33a229w3q6kfp70gkwxcnencsj6j5x53cw1vroqogrv8ihlfqoawhknggzsppy7kvc1d1jrfblom1g6ocgwnk406rp7u46eyd8hnyy5dxb0b6xwwtbrukxtfsq2maf30m6vlrunqwhz74drju0s45dryf9v0aa69nct8izznyl2bi5070z52tmmtapdwu64z965gse26xcuzisg4ile9j7cjwh9elgvo2wy2coudc88rxt5yzp2s9n8qlyg49n1emyla44oj50ulmwkpjxjg3nkewju90fbck9xmpxwz',
                proxyHost: 'tooc7hh62cp4898nku58tvtyiiwwd9uim3twr8r0zh6tc7ncp4espz8tz6i8',
                proxyPort: 1284554764,
                destination: 'jnkfg2rvewa53q9pgqon18cqhh2qkuyob31plp9gwjw58in9g98ft1ojie0qpp8ztm6kc2jf7ksob9p20jp475u60ppz8ivzazgk1rfspgoenfzxp6zz0l7c8qbz1mpxjdor3wdn55bxu7fxwe014kwvwz8na5gy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'y3dim7krzyacam0ymkhd1n678f1utdjw6979arw6bv5g2cfng4570o9gqgquozojnaoygr7lf6wd1y5j4094p9ot6ltqzrsap4bx1wav0o3gjanwzybw0sx4wbcjd7kcesu188mdn3m0dr3x653sdd34r0v63mmz',
                responsibleUserAccountName: 'qt5n4xgtjmyeg1bt0vg2',
                lastChangeUserAccount: '35xgh9l5efepnl48p1xt',
                lastChangedAt: '2020-07-29 06:06:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '18refem722w775x7m0lz1a68sg11s9rc5sgub2qs',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'g4cnh89ycwhl6wrlvowke31ppf6pbg89mbjsnx0tciww0fe1qc',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'npzfr6p3w6crx1euu5b1',
                party: '5a6vrz6yecz7hw2bhi43pk6dzyllzqy1omdv824kol8jxtmd4b9x59bzgomsiwmeikjt1ko17ipycc7tqllafqjhd3an5ezgercjn64mt1fd9fcjanc79af6urmygkbab0hxpqik665wm2de4pxetop0asjihyg9',
                component: '2c8jqlvl54rvruab515w7vievyxdl5cmr88rspg3jtcqe4g1io3pgcfzugv20wnm2vcu90fzz6jsgkobsvhiwhlns4qsvex5fqu3xzlj4er3p02vhq3in1cfum7pj0of1s10pxj84ibo1f9kbou40jxykszp1yks',
                name: '9c72dukiw3cxi97exqubns6sior3ckxm5lqdza1ep47kyd671aex4etcap3zv28q1vpmjloji6zelkdqnt6m7m73cw0remx9vqu1hqpvj8e3dl6cqinysrrs2bfh7alt3ht49xbt39ymy74s7j9l7op0t6jdjory',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'm2vzdzhkclhr0gzstcthqgub331zvhi0hegd8fowy5fac9b7v9bd5lh5z3ynp8h0lnhwpu44bu4isz99eswgdgdm36wnpmnbrjpynk1tp9hiahmm0c9w5hfttyk6xtepmc0o6pnlremjx0i7vxopvzxpt9rfxni7',
                flowComponent: null,
                flowInterfaceName: 'mdv2up0nddlnekrgt6k0f2gr01od5h77fjo8x0qlm8xgsarw4urlbbxbunm1f75rtrt58vsm3h9webp80h7hm96oprdflhklccsayrruqhca9pegrqq84tdtwsgp0w537fdeo8mobxnimkcedr9j6yrvn2avuxfe',
                flowInterfaceNamespace: '2hppd7276etsbqjw4tj7d0nvyuikis17d5g4pgquwamkwpo416byvklijsos8je089qg8tavsz3857gg0do1jma4kvoqonz8ga0v9oouex31yo9xpbetaba9zftpbcxjvllued3fhsvds4kw5tgkwcjsdbyk570n',
                version: 'iwiah7gs7sij9h7wh3ow',
                adapterType: 'ju1hyr2yxukxsqtqeweydg2a6cau23iri978fewtzy5nhji11aftrl4ynfp0',
                direction: 'SENDER',
                transportProtocol: 'zyy8bk07nnl3324v114vkldh6mbp80l0trnhaqqwo5nx969lnw6vvoi8x870',
                messageProtocol: '44ef9l7rrh5eebdtujzptlkm23aifnrxelq328alnzfo0lbdh6l6qz63neaq',
                adapterEngineName: 'nyudvus39a2qd02g9n1307uxiy6c9lawa1k4z7uwb5ijbgax7jescnlpeus3edqltcujgkpir7mfzysom0glvy4dibqvnd9onv5gmywjb3ziki3svxd3yodjx8nk7behqrwy8u6o1k8ubr6hsgj8ytc8zpy6uoff',
                url: 'ndtbxemywvczi5vd2ay5elk0y7brznj56oso10jbp5jzc0h8yfazfve3y1jgo27bb65u2z1y5n1p5kvjx6aefq21vetcd1bm5jo8rgxz5w205g54yk84bn09x5tnybf2h4w32oq7rwl6gx9kgpxmwrnfrncdm0acv8tyvcghazexi50yn51lmn9emfm1e90cihfdb6spm7pn89pwvj1k3198zvdktjmyz8smlpt284kk3g5njzxgyzvxk0byg85kb52onxbbwlw4vsotkp6awphhmkuy3srsf6db2kghsft3ev867flcwpz1usa2l4rt',
                username: '66q208xwwpzr8thdn1eusktzxvftm8jzzzmeb11euq03ub7t33ah2omt233l',
                remoteHost: 'f31phu9gr72c5i3z7gbq9ylxxbe25pom9s07ue4ki95hx7maqdlru7lv3p8dipek0cpcs3te34cu3uhdqdjog3h666suglqiivcdxmrc3qg7y49z4lu00cfs9z1xuae8clwgywhq18gxj8vychvsyfgn2mm53tcd',
                remotePort: 7047240297,
                directory: 'gj4fbo57iubdeqkzqlqwq2q44ikriuyxomhum93dikskmba6jkx7cbet9t0144enozqk2ntilg2f7g16a4in5w01298zt3xavsk64sgdnx68h3dots28ax917vg81je76zj36bweei9frzj0y300k2l3s2wo1jlyat649y0o1kkqawqbwr5f6mgspuntwp0lnrj0kwx76gcbj1y4pjzcyj88xvtsrsucv4efr7mfi0pli2z7i8izf787a2rtuzmepdc9z9kocrg5hc8fryzlijbvt8ykpez12973faf6xjilzowqve1k462zqzf77v49lzk8mzj3ufv3asqo473vuzetqq7lw8u7o5p69pgsg66bhkqgi9o5vkr9z6x56tg3b2166txstw7zkuy2s7ygih4bwjewh76zseq0ssjorqw4cgwc8vtmul5x4gscxnb47uw98wtz7xyq774jts890z4st9age3mhdbzc8q5qtv5ar2rbychpqqxvyyfwd3mv3dc9f2tc9lpevgpwrmt3jixzetyidcj6bvqwlgpdib4tdc7cwuulmw1ro137s37u85duvnuacg3cyvscg1pgncapore1r3rfj1qnm14k3516oewzzqx50b667ugeajz3lkapcvfbuzr8wakxygfk9g6hk5ys27jrom4l29auq7yk201asf0gwf5gq0hg8q765mogqqen6jy8z2tlrvu3b19n66przknefsta6c4gnit1rxruqt4mu313kyi8urrs433nvs2kkxsmo5q3p7b8qah7ofke2h9v6b9pq80cemoa8tryikb63i5lg3npy36rsau9nz5eqmz9zf1jh10f6hgygpiv92w5v7mxtbe18e138fe08pp56i4yx6yeftgguaa4fy2sph2aanjhqhunp4r45wkk1w10h2sh979weik94sdn3w0kksqjh9wqzej3ykqdt81kzss2nz6qbyfxepd9m4o04xou2c1teiqad7lmdq0caovurmxs9n43lc4i',
                fileSchema: 'k9sy9npkxebi8k7xov34pgpp31rh23whrmfy1rz1rdcfyeoh1zgchgp3opehg3kgsr3e2fg4as00w2t4stayhvpagl0wur01ru3wmu50o2a2yrpjmp7ebxa0pc513l00buf2fyjbjypqcoey5g29czq4f7xr3vckkq5p1zs20gpbvnis2a6r1bqzucitz01fmo5c66fczq3nt7jsxibnooc5kuh4nta4o20496khf66di8nexkn68j1c15sxdhh5b6wrgbo7tjeovbqjz067qrmzbvq2fxhr205wz1shxs5wow156c9zhpcdots7kyfdmn69lzwzv8c5annt86vh1csvr730my75dj9wedheupvy9f9agpijnoajva472xyw36yks2bqt1k6glc26dx1q5jsfzn4tydpakfmgfzufixhf4741ynrbxrxk86bwp4fih7rjx36lxy0cy8p96cgs3fdw9fefze6baqgn2v2ctqztv9k41cjymn89z4zwjouuhwft8mrpzm80fts0crli3om6genp6jc2t0g00g4a0xbfby6u35jplzc5jp92kqmu3317f1qtst84gt2l53gam89uqptpjhdfgj6juxrn1mgdznvpsaskfr72m54qc4xxs30pun9n69pjxo20m44ojhi2xm6zzzeyd8knb22py30r60j7itg9c9qjh6jgxhs2byre41mlrdklzzwcjonh1plyfyfond22ftg3urrxcbwkx76z0da4b1g85krgycqwamgei9rlnfeid81kpltrww26k7x3guyv6yz731njvmuw6co7k00gjqo3mn2adkieeh4r4wzcw436e6f6eki4hkgkae4jkor61176otcky341kn38u60f0854k5unxgrsmtbtc1uof1pu4rqxuiz14p4qo7rsmw4fmdngmuzeq91ba1yelm7trq1uaxtnwtr5onw2fspi9bt6ronpn9u8k3enft9qwwyjk44nbyygtc8vlfamq5r1vhzgugqyim0',
                proxyHost: 'dm62cqiokomrmmkbx8dck8y45nhyk2xxf3s7nww393q9ylghjunpkn00d2nu',
                proxyPort: 7983467945,
                destination: '25yhzops537bm9hmdw5zqs8umxax8ftwcugjim3rxtikulxcqpb2snwkpim40evo3iwtcpje2vw3dfsqb11r6e2g6zb1iedgmi722280ovvvlju8ww9dslzhbfwzs5yys250evp9ts214t5ynof7xgd7iz969gsu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'umg7xql9p7xdg8thmsolyv4x51vymkk4mgwvprt21iuvvsgpzcuv8e8whvbs1bdeumcdms3k187vt57f44y6hssx7iqn30s4qklizwnztsofq9ejl5e7nxgzhnxjnkh0deo07uqe7k2avysgqjw43ang8zvetx94',
                responsibleUserAccountName: 'wdthicvlgr9gumj0jcql',
                lastChangeUserAccount: 'u3dbbfux68yij6e6tp8g',
                lastChangedAt: '2020-07-29 14:38:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '688d46seygvgkhcmstu3dedd0e78qsvhsqa1lwgk',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '2wcads3uu2wefzwomjdlu3x7mp7ngka1h25l3yle73i0rlxrz1',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'yr562r09qixbb3t3oxvq',
                party: 'bsj9xliyojgphms1nzenj8hp8v0dj7a421t5pi18wqytxiakuvtwi3mm2t220tgcb26o0sib4rfxs1qx9jde4ctak62rusqem0skh22yw6vyx075bymj3irxck0xesdqq7jtfpvoyxcqrhnrt9qer75w96156h13',
                component: 'pdewtqp0g8il78940bssgm3yoeyni5mjlueyzcoj7m0djdjyt8u1mjhnpt18urxcku3fahhj4qvxdoubq3zkclsxukucyo2y7ztqpud40w8irjm3ekec2c2ul1oat3o2cqtznd0ch1qmyvfvlmv90cban1b85z6x',
                name: 'vkrqyg8kk3w87ws61xcan016is4lizvw0g3hdc1xstopishxvlpdvc62te4dqvx7jjzosbeb98gi1nf1i9rxyvf2f3y7fbcqyf9yiffgs47cyswksev1x5cu5qr24vxa2efkzp4hc8e8l8wjm0jtyrvgva0wl243',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '0kph4f3c7fi0429djoj068wgrzh9a9dsw8mn0waz8h288v4he61kf0670swvlau1w9zn72z1oqixzk9r9ubl437721el4tc8dpfdset4m3oiwubm23o4pih9z2mroe088lspzr1hhzy54ngh1kxjlov71adrlqw7',
                
                flowInterfaceName: 'v7niynh6yyc0c3n955xcb4ihoblm9bmv6vr64gv7zt8qljgz038m94dkjvjypemrozneg2jg7rhsfi31dt01wnuxzbl2ql1kp0gbahhymhvsv95f9xm63ubkknnz4q9ekkdew1rl05n0eik96m9a4hikmoogejol',
                flowInterfaceNamespace: 'wr6jwc53pzk8wz11nu2jnamrke0b1dolwhf62srl5x92rgolo12xtvbcmlxmev4df7q4lzos1x999fmz7fqjw23op8l9618ejvm5lowbraiq8kit2idbmbw778sks11vef1ao9vi1js1hod5xs7hukz4t4see9mi',
                version: 'm4hj9a6wdscofulp0noj',
                adapterType: '92ldw52kqb6bf033xtcai0r20cn8fob2668h13ahri6dei4yiqn3zipi9j4t',
                direction: 'RECEIVER',
                transportProtocol: 'jwm7cnms216z4gaipqqhr38jp7dsql8szax1h2uy0m91hil2h1bnglmzq7eh',
                messageProtocol: 'ylta2396q9o9l4zii53805h1sywntmqaufupidenex8y9aclyd55r9etb7z7',
                adapterEngineName: '2vdlj9hlot1eh2b247177q6pjp2w8azd3r1c3x74og3k42492c6wwobmyemwqx4nzz6j47tzs5w092571rxizvbg761os7xdu7ixj3lgdzbr8bpxd04djhhqtfecmf6p5gnxgaitheeqq5nzq99g6ezoe7evhtiq',
                url: '9mqattj1jvacq4ifsizkvzbs4zpv4etiroptusf1ye7eb9862pp1s9wz434ofeazgc1221x113fhfztchihbin2zl1g0t95y5177yk0jgw4sfz55cylwf9myxjdpwj61aqv9do9ehn4eaan6qplc1hmqps82ojr4u4w9mdlxbyt5ds3qi3j5mn18jgezfzaqtk0v3u6ibinb6duwl99f0mn38p4ukkygttp2gx8ozi22ksqxaldk1b9x4awekoc790fctky45tl3sviiicbh6f8xd0z8n9vbel121dl4rhg22fq0euval7f65r493jit',
                username: 'ftaj49gzntab4syzwccy7yu8fkkpo98lj3jq2nmvdxwksqze0fsswv0tk2em',
                remoteHost: '5kuogvhp0agi51ap77qf64u0wvvhqlz1ak7ct6frezqzok6uhkp0fpb0gq2yycrphlkslije9viq5k94uo0gjxeb8upszfllntotqd2uva1ehltogftor5w3yb05u79m1em10u39dnfleerfiuuj6bdiaid9v9n5',
                remotePort: 2861000686,
                directory: 'zskarj5c0aps15elckf1fef7e9uvqlvjrluesj36xc7tb0ufg2gwj1h81kfwznimbyjsf1ixuzlhw1e0rpm0a93xqnebivvw08zshfo0whfagu6yvql2y788hvup01byf74llwga7ezs1f9p3s89akt253wsbd6hroza7xqcwlppsvftjqx6mui8v1caxksr6mgvbs5q9zlr3m36wonm7k1n9jer816gbm14h5o6mk947prdst9nb62y7zkzt2vasbh3p70zpq0kdmrl1dt8djr49pcxnpo4ry3rw7tjlf750k4pv4k8zxf9xbkdeikcdkvxiiddl0j7iztt159rss1uhaexl58hga38u11comzjirf5saz4mqggfrpwubte4nzsocq89kod1phrwhl3ikvlo9j4sx6qi2ml1iewvyo63oh0u55evxoiqq4j7ed5ha5hcsyl3qeudgho1eyv8jtqg1qco9yl1eh9a3z92k8asrezwennh2uhzw87oxmf3ds21nm9mle9huj6uly6l1h1fkoxhf0u35n3bnp6pahhjfagaek8qu0xhbay1vhlyva5x4liz920zo4u661h9sl5iqc2io7wple1bz1q4vk5z64ex9vkzxs0nw4fw2si6oycomdl75jv3x51ryxet3seijv5mfqbve2fv14lc65pgvinme6i2cduxdu3lrdmvgzokvhzf1dj57d2b7zsw05ptvy69ajkw3kox0bxpnl79ca9xi16dlxrorm1erxau2g8atqz2wn9ibf7uvo8jojy1pwsaijgm96b3nv5hjlwztf2kz0pwtcjnbq7dal2v2dbmnaqhn0eg9vulsyd754j61ga9hp2qoeu7dno90jkq940kal430rzj85nck3xf4gwkbqaz371pbhv9sckr2kua3iy0246f6hv57vb2vse4o26lcowcv1pg8g4cx0cz00jgno96remr4k4gumguov5jjro1vl4g0t6pspgoghyndwexdjv4yub8anp4nhd',
                fileSchema: 'fr7a1t8rmti223uy9b99zseo4n1kbos2yjjv7uxa2yh1gxkw6hgdebicr5iioob6dsmay5tvanbhlbsu7ctkwppt5fduhpxje2nuey9toyv5i8tway6ijjk20xdur1ik5vtf3s2fbocur8cwtc28727sc3c8jeu1worafbeopjoizi8py3sdrfq2tzaa33uiz0h94mg7ql9i48or1o9jybii2bjidfqillf8myqmchs2nc259vxlu3w59ovgjjzbdhzbarq7bcgxe5jkfn06jira1gg1cq6ctmtpwi32gvtbfnd6u6aas1zg8p544lpzhdy3eu7xuf863fpjb3841mugg4hf6jyz5loqq1riu4ihznc9q2zd0q1ejkxymw9wkt83hptmwppah435ehmfyocleckm3rsv0zuszy0k8upa436n0c9rj61h25mgt6iesa5q9ti8a35iv6halhk3l7cfn9lzisnt0ocuxefsn9gam6gco7ltcupd5z2p10puepzree7mnd82i3wnw8f65312ouah4dn4ivdjiptz2mnt1f0ze0udm65hz6s03sjodob7xfwzzksjm5jk74vqbpfxhiux4s5a8oilmngh4x9njk0e2fm5vmndp92638lk0og0nojsrly5jk39w1dth4cvmdymypk1b9jlxlk8nljgai63pt5sea3ta090ifwwdeaewz4kb23wota366qr3uwyjehq4db1ls37j5ly6yo33smbdmqemnxxa94edr28btezdypg2mqmuk89g2hke1y32a75tgcpqjft26vmyucw4m673fl4u5jxwenpn6wn3yupejj1hfb13gjzs8l2wl9bk1sj4folw69fmhgejx9kery57wwt976lrowwb48ehlyz8d2x1s3cwoadbx67panrxd7tv2dpb1kum5wg25jymdet07iv20d5dkuw1p5y96x3kbmc14fqykg63zsj7si94chco8car85kmgt6cxdq49yi6s7na8k26j44pgxp',
                proxyHost: 'jknhnguzzce83mxm90anvo5zixgoxa3y7d843exqkglyqp1r18dedmj3k1yl',
                proxyPort: 5717859830,
                destination: 'jz9kzexktbx7zqtssldohvo3mdj9wtmevlxxtw3mmc5ll71myov0fdnrlvlugvyqs6gkej1cf4m378clmdgsqforqn7k82y6st78unt849nns9onsktul5bbpx0jyeeno21yvb84pkw2709iuizmppf81g940do2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5h0a4u5e4qli28pwkwwm8u5hu0kk3vi0nnpkv7ljf654f74mfv6re46ebsr9ubtgaj4vdljgu9u8slumppr48sqc5okcyo7g6x9lxgvo7a1b9y39trf7liwybood2bntdta5o5su1y6cbldcfwma93tl6sy881v3',
                responsibleUserAccountName: '6u8tkdodjv6e93w6c7o6',
                lastChangeUserAccount: 'q3ahrtumfswnp5y24fcn',
                lastChangedAt: '2020-07-29 00:47:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'ako38pifgd0sk9coih01ftx57s5hqyb9eyhswz61',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'zeehonwoar1naxhs1rmiup210anmbhzw07s9pisor09h7otbnm',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'tjdukwtszr75m746nagj',
                party: 'qqhqq8f4dlp7z6neis8bb0n2oc5w70tw814yarsvrogbvgo38df5ypdqirxnf4e8nnvle3j7z1t6scahj8s0ply2hjqtb10xb03tdny12yiphdxmnlpguntrh4ly4z58ofmcvuzhwviw2xlfji93aqjvhfc2htbr',
                component: 'yakhhmu6sdk9m95x969qvh49hcezwuvk5j2j243syibpfybtjbgl4f9rj68czmyu2gdbduvjptyrra4retstk8j8etnu0vdu27pamm7s3xkodcuqtoo4w94ukt86zl5fjlhuc34tf2s2eqv3tvoyepa7w03x38pp',
                name: 'cmk8lmwgpniou66crnasgvf8o6zrnw4z7oh8rzsq9s5q2ozywyluxorbxvyzwu38qq2uslwwolvzhwu33xq2jxuke646frzxm5px819vv0z33h8us36p9buh5y73cv5bplb3tncnag2mmqglunihck5y0g73rbnr',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'ykbvbvs8tg2twdoem25tgo6h2opj39a2tkscyhz8zkf42x4slm5brojtawbvc5i92sz4m20n9qt3qjhq8fwnm10mk957yf6l3xn74pkvs7i8kdbnloe3m9vzq1f163jepdtstdrrrreyxl9c461ige6rkgoimc82',
                flowComponent: 'r7su9191j2u1ssppawn5uswkii1dtlo58kq02p0d39juvo628wunlvm5podajtkq9pyeyj1690441jsq5jgrjley47w8whrhkbrlbsn5e4fal8g6lbmzkhzexl38m8cbgmq3zvuq93pbziwoxo474efnna54i028',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'jyumzokwaewa4jpu4tnpqiue92b5m3amllp834v0s3xos68oftvex043e0b6mu3flboshyyj97sm19dlac0zwly1og1i5z80ofkj6v4m44gxb8uu8jeybf4n8gzfiwk0hu2bzlh5dv1s05knbtmpg1jedzct4apc',
                version: 'dqet7487y94jn3tub4s9',
                adapterType: 'd302foxz78xq9n1pxehiv9afruw1zto95p8ceqxknr7i6skaas81zdyvcr44',
                direction: 'RECEIVER',
                transportProtocol: 'gcejbgiaux3z6kx2yrns7hco5xrwaula9i59khbttphlhzdm2oxts7xljwmx',
                messageProtocol: '5ykwygem1grh6oed3swhwkagur34tquwbxa4472r5s71ovp8y8npqbvdlzd8',
                adapterEngineName: 'rk0gxcg5wpgknila9o71nwzc3c9fcvxrnan5w5fq9wd9kg06jpfhzq3mw5aed45jyacox7zgp4kkt80ii4bkcgdzz4xip8yoom4az0stv2sochimktcs0duel0yl7ug79lrka0qehsp782bsbtgxtb0teda98tgp',
                url: 'ypikjs2jyvh8s1z3ikk7lsq7i7f3qy9zwlfjc770t41ws08n10vg7m35w122htw82cze4239ru0sbcfifavdj3eua6qdzlbp25shpkr1h7aoieub1ecg2wkuwwevwzjz93jkdnk7sa08artofwbn8cu4cpe5np0nyd8qr57w0qddb44zkvl2jd0h2up2v1sj9okmupqm2n8met0t5xctys4l09xshh9a3mfstajrbwbnirkmg7du8ihuxljtjo1ehi1hw8vew5grp8slvm6mupcdj2g5mpqhednom2wld2d8bnjdljkqhx7wlwyeyx5p',
                username: 'nkwl62frywpv26byvkubszzkznvcmpvpoc0zc48dt9tlx6r5ltff5mjrsa86',
                remoteHost: 'j0s54v1q91r7vetzjh7fy87usf20t8ybp1l39ub2m7do2m8gfpfulv0z33rm2d5q4l0xxk6vwqa0ld8lq4q68p5afwgk2v4oj5o1a4bbh0qnno3hz20t6eeeiscpmvcx9ke9tlx4qqbrw8nfotot9bwfe496zerz',
                remotePort: 7405721768,
                directory: 'azrx322t6uzlriwywv8lynt6hdgicwgjs5rhez9jljprzogxb9mpt2lrx6f7hydiviuu3bf5gz94zyzhy3j1tjrjj5ik8dh8j22jh7jep53niqbmjvx8oidet04fct7r3oitidiya08ijigwjp4uqws84zcru1et1ali1g3wce16f0nvxntro1bya3yri3vlxp5s4qfin61kw30cd4fhv53wyiitrp473mt4c9ygu9fru7l6yx2g848rqegwowutscvdlt89nltab8g37cgcdxghqauv12m745os55hseiqxdo7l109x11gq9bpfbxnpn1lz1khufhu94cg34kg430mboaw0q6bka1aos53bbv9nz5960gbvi7agiq1p7onr0xhdbbvp6r80k9a95p29ajkl0rv0075pkvfzmpxwckj44pduim5z2gvsfvilmob4mwrt6wlutk6okxzwbcxihk4hfolxaz6eq8zecxwbg62uugi0w60ch8itxbg0pu6ouwf6xtc3bqzvtfxactk5fc2obj9w7ibv6ewcbhtlpp9adhd2w0lexg9grujviir320cic116tl9fxxfwpvulqcriff9jy0xkslm7pjq2qg0o2ysrpsxtmrb7p41hxww8zskwisuep2mf91jbtc8flepnu7xlkh0sro1ewgkpqcwycgsuj8jkzmhf7wl4lzoooy3vvwk027huqe1ny49hyfm0m9w69qdaabltqwiv31laj2x04tphk82psledvw87bgmebiah7kcqd3jzlp7yix5ukrseg3sfcpnmmofe83rp0sks4w49o1i94xsetxm6fl26u2lydenfwph2lzi8mpauzm5qwkrbxc81xhyyzm8ao3xliec5imbowio77le1ozd0tr3il2hadk6kxiem7tsbvlkkzoujzp6nndjnzr56ftvbpqfaw2ybx8slbbmm2oi270imdxn2rk4dcpqk7zx8gw253duaylezem0uvmwn0pashs9zu8luy2g412e8',
                fileSchema: 'eusm9vuun8u7ha2appoeyn22cs3dw0p09kzi7gw9s5pofrv4rxvg7gnqc41vr0je4il6uv7lluokpcixdk6izdl2kunuuyc9qwpgyjufpg4krp36qynm2enye7kr1xbrahyjll395s0p2goc4thbk9mc7e0ap7h4pjcqrv6eui5bbvf60j69so493nsaio95asskpkmt9ymjlnqv4c8klxmkfyydrq49do6pdmsnp9phouwsy9fdd3uo0lyo925bmutpdbs5gw09d7z2thofw68sb0of5fp7awue1jajr7ifhj03rgxxz1jedn04h61q3edy21kf3w1m08ma70b1ddxaitcbt39w3lgoxjfbeifsa0sgd0hrv5luyils8ki1mznmsfqjwa8scamdsml7quevm31bsc1dgtvrqrzknljrpjqaqrlmxr6f84c4dfduzzu9vu20pyp3vc2v79vi6a3h57t6zg6eq2hgdlolz898qxjmelui9gl5knn58nvabsai2per8du791pgiblw5lseesalzqsw4o8521hrb43b0ef6kwuh0bz8hkf1nq588cmwnnl0f41xv9x6ecb2borixtivnucopav8l6e9jchcknc3w0cbw4dcbikm6guxfyt0nkrn2se3vkjjv5xk06s1n7vq2ja8h0ua6gm1oqncrs2jkcwp94gbe9pk7xqeck019e93m5v2wjv1c3hh6owi1shjlabzwl7p3le1imk6gym1mkctwfurigpyb3460t65mt9tu0xp8wil87es2ufbmszhzdk8dom4qt97m94rabitb9qyfb571d5lozpwnhzosm5vtkyphzsvbzceyr570mvk8m08ecrq9jwnlorxgj7cw6n7xs5glkfjt3cx8x74u88xcpdanml67jddrbrgg2ep4a3e03f90y2boxmintd8hnja4osi50y8buf4736xvqh0xlt69x9iq6cfh2hi1doqdp4ynbskm2cf1yzab0o8u122q57mts7atx9a',
                proxyHost: 'wrbsyewk2xw18fflp5t0qtlvkc8b3ckq5umvpmdor9f3way32hahrjefbais',
                proxyPort: 4683310883,
                destination: 'z8mqggonavr7mtpr6sixthgvb5787k69gsu1a0zqac18nmyayadq8slp34nn686ssj9vluulh5ba5k622p92xk3bemyvtg67oe9drmn2vvhofiq260ye0us930fv41rtmqwrpc320wax5dxqi2icfsejrkai5a87',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'kci08zbiin513cwp01mqrzl71wcjv9c0scv74svpjsxzzbu0zpi1qgc62m4u2vfegv55loy7stbfemfifbgycxsdwapaszoq6wsa00vpdl16kozecezqscfsfng0ishpwaq2l6hm3in1lsgh9c2vrb1jz4yusb67',
                responsibleUserAccountName: 'zj2rlnvub82i0mao7imt',
                lastChangeUserAccount: '85krvm30d34u9cd5lt3r',
                lastChangedAt: '2020-07-29 07:18:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'hd9ulq5lvo9vpf54oq7eb50u5gu1nby6u7koyb9t',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '08cc8r9lumg1o6fiy7ury4xcgkowqzwqm77rjubwfpvw6nb3ow',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'gxhdvlq4b2fbow0zd0sn',
                party: 'gpvkmxl9d41cna8iokbx9ue8iv7c9pfp7kko4r01b9ltvesfpn7ysdf6qdb1td8t81i1yxki0ry8ipea1a6fldwe29avc5jnf7vdwaa7o0jiy6lsb2jz2l0tsxc24rjbhlyjf2qgyzj3y7qia7v4ccmu3gofu0rp',
                component: 'tgka2dvu73yvt2j63ylo3m4l2n4ajqb6y4ztcand6fgdfum83wuz52mw82x9cy4dgv71l8no4r8yrtvy7vpzd9v3t37p3xdfg34ck7mcpv95mnsm9luprxa5rx09xveil7a6iju1c5q5pe0o8rv43jucyo03qh3s',
                name: '0ptp0kqjhebn4cw1karnstsxuo6f3ue9xsjgi6u5uwi834bxx1vixafmlo1krev9fc9928fusc7h8099d896h9oe9rlm1faac8y88i3x4xa2vclvn0egdmjwzgf7xbx7nnihs481te11pj93hxmbi0kmb6pcmfn9',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'ewsr9gxyy92gbxav3t15bk34n80f19cazoqxdqtc1idj9k1tutplmvqfaaujrenk393p6sv1zpwbm4htzcaim4vxjagom8mbs0qdpbj1g35aqmf0u43om3f9534d41e5th849alst2wwhfjuzk1r3ho3z47zjg3n',
                flowComponent: 'lfwq5du2ajj8q3y6mb4zgju8wxxi7ei72vnu56lgy1o70spbjsrut6m5ju858150xm836swpcmoexi3t0ydrng825vu3hq9f0puhi462tj6bd6vmctkyq03ylhrm88s219pu2nzayy06ug16x0hi79o38dffo0tp',
                
                flowInterfaceNamespace: 'eliknjr71qdys2nqp8ypi6y84too4barjcfw6cjo4ycsmiliwtktezrpf85aecidc3db9k44nn4touatwrkemct9sl6agx9k3jd9llrume3sm2uda4lwhjw9h2xcirh77y7lo8j5o19kep812xo8ra6j0atd76y1',
                version: 'q3si72w6nfd0htaehe94',
                adapterType: 'ic9nsa7rnznedx6smhw3fpffwp3ask9slu6h8e3zkfd0lm3uuktd7ka8xvf6',
                direction: 'RECEIVER',
                transportProtocol: 'uj01xd2mtp4g6lpbe0ntfyuzw4xeta2jxiyn40mhlkt0hi46w8ws300j0k37',
                messageProtocol: 'd5zl9xjt19nox21670bbs02de9uz89q5zkzg53wlps2v67eaaeipn4ptry8q',
                adapterEngineName: 'ru11meq3ntxjbczcvembd1uj76zmob5j3ltl0c2r6vhkxcfnrdxn5zfx8oytyu16wts0i1mdnmtqx6fsqunzrj2ht9jf9n6suejeefecrljnrkg1e1ors6h2icsw65i5lmr2xaui32rl9faoeogo3apocutnuhoy',
                url: 'fwzd9dk8mbapnqgayl48sn9qylhi1ydssvgs17wj8mpajyrvdzmqvbp8do4du322dv1oesd1pddhpo5yliwr1zy0432vw9p45pb3m3tkz1u49bjwgajr07sqhn32xzvrjaqz6s11ub9mg15g2zh05ceeuj38tdde38zoh2fsqufg09v8wfgw9bvcvg7pyim4lzm0vifwshmkz62604ih0d55c6bpniaqlq6ktqo4zaqaaex1kh1syr8zw8b86rer9v87kmfil4rrck6hzn79pl1rhl8xcyeh8ccxi47qnrfu3g3b4619hg6t40wad2vn',
                username: 'qpc5g7peape10de4bnofjz5fl1zxqmpw009zfzh57cgye2e4fpkxn2o7wcnz',
                remoteHost: 'w9l1xldwagrmqp6dp78azfujh7jjxlwn64l0ou3ppc0517krm115ehxbrn8f7k98bmjoa0xaftzuyhwedxaj12r1qpbxtclkz2op5luksji83ymu3e5c5ufqxgtgggonm5rhdbxuc0hjxz7ckcowlpqdelh2l5o4',
                remotePort: 6639293082,
                directory: 'hyza8j22fd8me7ye7v9nsu3cdnisy7vqak1pdxr9t2c4bzg8p2rdd483ipvpnvghdof3selamd4kltdp74jywuvbhy39uq28aw86fxexsqap7awe594j1kknt51g6kwiwn3n0ubtm803phi5qv335dpdx6doqfk0vo1z6f6j9zquochr8tk23q9lh9sraartaw4mrqsjhpxyjxlo97comfdg5d7diibqexfluzqkuj92gxvcsio6ouwf9cu0q8xhxxa74zave52px8lsuc5l6iqlgzwsqf7srg4ecg6oyhocw2u3nofrajavhp30y260k32u9e9wfk14dbz4vy74f4gtz5m1sihni6omv0gzdiyl0chkldnrnz0mzz1sgn9ur0c5hye4wfuskaaaq2sfkmustfqkn0qfj4ggv3y3gqm9234iqjt03if49w9p2hv0sfo8h1aplkrm9slxwzcwxrc2afpqg4hy9tx3f5b2qex4e25ks8jfmsug1pyrpf2f2dves3qt66a0otn3tkboxyl5xlozfx5saf9ed61zznok20u6j3knurerx34j313hrdp09tiyui5xi473tqk66h5c46ikn8ijltnr113box0pici2f6nsl2iepzugfpwvokqbdqz4bznxq3lqllbuzy7wlnjnqdbj5mxz4ojrvfmu7po1dpllhpaj0jt8cqmw98azzzmyohx1w1zotj56uzwhhuu9vu44e8o7fodmr3i3urcsw4zzu5vzk3jiel25wq7vnwefchpcbwmvfh2tfy3bmapba3nfasso9in4tqxeqtsx0zuorkjf44fcus8cewnaln6ffjccpyn0yyfawfw6ztzp24d6tm2orpop127kw3e3iz6krf6eyrzb8xrh2f7kz2acrwcuuo8qyi60ffp3oj9wo76wowq3ynn6bwdr2rntlk6z0fqkme5jtvwyb9yujx057xkt8wyz6qrsgkcgghjah6j7otbsunnzegw92epwb4w3wiyqdon62xqt',
                fileSchema: 'dd5iuht54fcw7m34r5oy1psye5fyujywnjmrw30eidlv5zj1yswgku4xjnjv2cylhg4fi52tzangngz9kxnohko7z1l0z8ccmmez6havvmyzrf7yengqjntnjtm7dvl72licj8e15fa9fc7pr0epe39nw492742q4odft52n7rio2x1jcfpc54a2450h4jbno3i7mgp7y1dgdz5nnpr9rwy77fbt8e4nf3s006pe5eb11tso1wuob4e2x5uelr5enlcbyfic7ieyh3brb96ey5fsuxe3wjkce8r5krcg7dgmxhwk6sfqhd644twgkpqbd6ztcvb7jed7ml8t5l1vdk5h6xhncqtc4obmrv0f3xajbn3gsw98hiqhwj8q5fdsgr7zozwj5ir52u24qa6o2nqib2l2cof4skt2o4g3ni8ee7i56h40j26iduw1c4vy40ixdzrxs5fzepal599g3yxwl6ys5wqtjumaohj6z2bouimyi2popicsqmpupzz360b9x9p6rkackq6q1j1o72m8emxno0qrt8vqt4b576g0m1d2yaitceid77b042ocrg2nzmb7zo80x3nkfbnpwl8dzl1g1uaiaag2jp8gzrmuk16jhxmdllojz8xnr96ts3hejzz5f84g8mzo99ru5flmn9egud50cxofvab0idd45vl4quxm3o3xv31fni1kf1ebaludip3t87me8nsnwtb3yxcp80yc56etcubkasnm9b7phubopeeqymnppiiofh2bsfxh6do9edvipp5vtp01hql0ygpwixiiiqt47jezcga55zx1hrrgsj6ps2v8wu8wc1yj9voq7sv5ubdnked02s1emrresrmsksaczoek4zrxbjeghzsbptvwl8btzuzc0hfpslzfapl2v1jhq5tglgkeppadiid33plz21urb0aj407mctlo0e7o9ioxpwgnsghwdlihpwqeshzodps9nwe6u0alf15u689yewhssitz9lplhb3b1jhjq6qt',
                proxyHost: 'jptn8jbblm0y3a42k0q92yct1ocp92rjowxn50eqod0u89uvgl5mqldthzpt',
                proxyPort: 7434632569,
                destination: '2bqvjhz4sf6pz1ulpxc91gdg4c6vlmfjwr1j314mv1avix3ernih5jysh3bzp0ixgm1520qx7h4960taqvlw2skkwfqkvftcu1oplj5lh2cig2k2n18bxm13du0m085go8fhty8qi8zwuptbiopvre39t1su55y4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nwo2ti3y7mogjk1pcfebdatpl7meq6fv512z4i9o1cmvrwhp7koxuq28nm2ocd4yo8ettmt38y1jvuwb14wcehgurlo6kre7ghe66iu8u6w99k5b7uz5sxnt7gjjy70jxtchjymz029h0w2ax3psgc7ypubgdusv',
                responsibleUserAccountName: 'wh1klnag235hrz7bl0ny',
                lastChangeUserAccount: 'zji34ojlslr09sfod6pv',
                lastChangedAt: '2020-07-28 18:55:41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'fggnk29eegwbcoohmlsf0loabdt3xd52foyvmd2f',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'hzwb3akx8escw4gpaznq915m6m2jmqs1ab4rs9wx07xbb4vem9',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '8n48szu5rwf95l8a4mds',
                party: 'hw9rkpmw62a8rcasvhk2cepnvi5gyoovb6ac0tc1f8im5qskvtryymz8u9rvp7nmqo26wbni3b3fy6o0bcexov7b2imh3scchp3lg5h7d3dgohd9y1ng79xvdcxkoa9yg54i9z4xflz49xr0x5ecryy8rmycl695',
                component: '4q7798fqmbcteq4wwaslawyn6w3aelj67l2ujem3wcxvuhpxu9e40qfybobvnjfgdgzvl4a20kikbzkiji7c1yhxeutatr9dsg81bilz5vzj1pcnfm9tjd3rjnml1oxj0vp01fvljpxl78a3mlzcc1vrmax0mgg5',
                name: 'pbgdstrjgn2o4w2yw48hoxhx9xcl59w65v7x5ydzf494tvnlon72hhu8s0szq0rqayj76kyki5quuttygcyr7cco1wwavz8244bdv3to3ve9wyx2i3bsexzvksrl1ete6uvdwo4f4rym13jnqctb2y1n35vueleo',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '77m7obla7uflq0vmjva2r1llh0ldu6yecrtll3rw9e4ovy0el0snsfin9pxa5y0yyv7axmzf30c7nlaaq1rhmb6zespfx54i59bt5sxx9k2n7ft1wnvq865x7koyj0pbb34spp4phbpt8j7r5hwaeonoqyccsase',
                flowComponent: 'wv95wq9650z1adkl9gx01ya90dafgukzagcvsjlczocq9y9zvf19gpi32yybawxed5ajm3kpbl51lyhr41v7hx7qh7udy56gha7p074ajz33b47i65l55hgmwwiyl3ydvg87baupkwub5gwfo429k4qpr9n31751',
                flowInterfaceName: 'bpc6o54kl91pdzm9tdu5jon1fysfo98p58eivhn7l0n2epfuau7u7x4tbidsmgsogdgeoqyp4rn4ot6g7z51r97r73qr7ubia41jtnbs2qhjlhqbbt9c8ssjxaii1vh9nvn0v3zqk1pnfy77ewiqtlinieepp7z8',
                flowInterfaceNamespace: null,
                version: 'i4g0vthpn3b2rhbrqobi',
                adapterType: 'qt3af0tkvs3926ggkmzyezbv0ki83gf11sfbkuhpy3wt0hsc477uuzp94u15',
                direction: 'RECEIVER',
                transportProtocol: 'ztd7j44lwdjtlr4vej2rvmnz4myntnaq7o6njvs0bjr4oxsw2yp0ewp42on9',
                messageProtocol: 'rccdttwbthg90p9q3zr8sy77v0imsix2n5evp3omh74jm48blt14cplsykie',
                adapterEngineName: '957w0q1czspv43yg52397aa37qy7yhymecreeqh2159gf5vflluopx5it3xevsnuc1ciuebqoxvbg6th95s5kmkci2atblppi0vqla10lj6kgteg0123k1x944j5w7xhbe2w6nst83un45kqhylqrc9xllithyfc',
                url: '2ae53b0539a3hvk1gkk51wbt1dyugt5vekefbsj3wq0fmm6soaenc38rdoks5oh0anoibno47yujjldgvdb5x3lxv9xzbprmett4x48lftsuqe1xizkaqwqxjmkhgx8dn4vdy2ertiszgwxmytrgyj8i85ym2fvd30g3fssovl65ufdeigimjcinasxrsapn1bpvwwtadpc0gq89msynuv3ka6xcgb2lo13jspgc8qj7o7d4dhi7jqmqnl5xov1lhz7fidk039mn5tgy7vcpyrpozbgztjvhqkw6bzgygfeoz6uklz499iyijndgs2hc',
                username: 'cx5f5zoy431hyefx72j5hs78sykm8u0sfwduhaqkriqonr7m8dfrguhn073p',
                remoteHost: 't5s3td9ml7obi1r3enidqlay9memyi4rhaydhrxr3kmwthh0okmifu3td039gbv4jkgkcpib1gv93bv4mxwg2vaguqxk3snf6noxfclzh3zq0s1injels8jgsx8h2m7v593l9zpfsgwvwfuvqme6w9om87x9oiey',
                remotePort: 2297075844,
                directory: 'oiqvmpstgkg6n4arp9i9hfez0j2vrci7jnj2rflp9xsg7d5mgr0bqw5qp7n5ws1wplyhiy37f40pwu8a24idjsktn10up2rtrq9vw5jpthscbb3fb7dwulzx7oksojqwt8fet69bwia2et5mj6secjfs1dlqdlet040pj8j70rmu3uaxwfwwhekzktnre7c7mkfrlcgpr2d38uz1sd0iauz2h0jsu3a6akouwjie46cusx3vszr9ty38ls4stix7xnfgv8qm6qhn54t9xivtoh5yx6kwhxia1m7gbsfrmwbknkchdncy502fx1znshpd9fpsl5c4hgnp0ainnv0wm615n8g16yy1i3tmaide2hjlk53rjje71suw3r1pvqlzirnyephevkwkfzd5ojlzzw98ji2toly24tjyogptj07uwa87wm7murfytlzvhu6ar9viqup76gl2dxul0xcgcym5qbwko0nsz39b53j3ltcq60i48ewe5b465qmyhj66ma6tvfigfc0vylvey9u3ibgfnmxzw0k06w350rkw7eftta8wk2mkch8cq65w8al214x3uyhjt7lohwupwgnxmk4cdsng2m8ttc8v0zbmiritvkh60v4uwychn61a3nwp8vj0s2m3ulle17zy476xpzpqw764foqlzglorglbgkbwpsk5lskds0th57w05xti2ribza3r2hose8jxnhoogxjkjrgwb5j0lnhu5q8g7mfx618hrjrjyhi63194b4334v3j56emna0oycq8c6gufbvanpw98toim1opk3oalgl8nbbu0sz0jlbn6c9k7ar7fg0jli7wngus7yyl1xmr13njv1ucal703a2ye0rxf5poit39j0lfpgtim3v41rr4detlr217x1jf8mpvbcojiqvtyglpcse69d3u5g0l73eoxhenl29jqkxleg948ona8tjr4itizxdeotrbyyxhz4ulsdgldwyvl8eb8lgvkjwv2bt66u9f8v8rflc1fcp3',
                fileSchema: 'tzeh75x4a0n1ptxt7dd8iymbyhg02ntuqnoawv59peysfuh4nif986wdu7itb2wllqgbbg5zgl3i2ldszypbozt5tkwajit0ejgq7ht2udsd2v4f0g1gzj2ug21ibph5ce3bjzoix5v680hl7lrr1shq2ngzh6rtae2m7iwejifqt693p00jhoqnoog3lkni5ki37qf7bgcgawc67v8tkt9slstzfidv54bntfrk5jc3z4jhai88v0m0b3mhdid85414opgojcn9if4nqhndl1bwro8kv9mu3bnpz4bpybfy8vm64z5uzdv7hbmf95mmp49uqqjmw6g0ewdtyxrx42zn2kpajj444corcse44j9vwqv8b9frsae3egvuaxw4e17o8uz5busq45rgr7o10t6fm0bd49addy7cv23nub2b86uxj9dnmdg3ja66a50qakqyz69zn72g4o5zljjo9gxkg9ncw2ykm8inx9nlclanqpgnl5uvk4ru9o9khd5vr37lw3x57h8zt9uhqtbmxh8dzad7ianglv7oryk2bfdb8isee94inlisexxlb3m3wnlvew3fn95rfjsaw602uiiags9bml990criu19hxzzxv912dssbzghr75ii3cecgasvaf725yahdd726s9i04vwvbybzd6om8qvsw8j860utor81kw1uboyddxlmpwrvd27ja585lhmdyi2aozms00n3vw3x8id3q17rsz80hzscddze43nt5rrjrg6frue4mnwljktmj9ugxyyk25mftzse55g59hfk3vx0hg9qbfdk2oqhe8vest3s9jdzzvjqmvglamw4t9q1l1p3klihcs1mub1a5womzzs1wn1oeq3vcho6tv9sjz1f104kuxw6rr53sqf28ze62f2gkv3j205t24ki8jezyoa57hrd6351dmladlx9kadqnzl86jo4ag46zb9ff3rg01vfp51aj6cfqjj8exm7oeedlrvrxyu2tg3jrm7d6e28erzqjm2',
                proxyHost: 'h0173hkfr5wwpgve4cb7jxzz1z1whcgkr0oangsvosma7xtk9nks3gv1d011',
                proxyPort: 7240859079,
                destination: '8ga9n92rkbgkswxdt1lpmokayoh04xtd8b00n4s5lohk07wvkbw2ziwbje5lhdyescxca2crwao4p25sf25mnokk1p3u5j2mv8fkq2d7m6l245ya07283gm6qn6uykxwqwo8o2hond3zla8es3yst3uln7rx61tw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'c35xoj00gf9dmc7wpa65u4v1zaug0usk5vvbvripq4za5i9szkrcc3v3g8a9tb9i8nmew2ll5lw83ix8g82e19lwtfdc28edbzz3is759am4swmw54z6liypp0g3ioju7i43ovgq73yej90v7eysfu7pbg371cn7',
                responsibleUserAccountName: 'p06le28ozoodwf4ni40u',
                lastChangeUserAccount: 'c23n2uwi8xambiybz9uq',
                lastChangedAt: '2020-07-28 23:49:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '7tgbsp0wb61y13pld4tchfi78jknag0urwst0k5x',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '2472e8d5veu3scei00gt2z6fli8r07zwavbe44fhl8x31491tw',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'afn4ayo5e16moo38d2zc',
                party: 'ckdnxdhzio0n3nv7dwr5es40ztvsivz1rw55wfhwtjiwz5spo8uju247ndf1kyy04l1ffiklz1d4pfkyhtfyor9axri1bjzh29jtnco2vxg2jzpc22mox21dj3nx38fh5kc5qka97glbyui01z1ptsgid6fhigxz',
                component: '17iuci5abhso1vnd2hmogjsil12p6l5q5tyvyp69lmm5fgds83xibbv64yabeurf45lwt8l0071dr34edzemoin052wexx94bmmwnns6clptjfu5ko3yz5fwoat8gtjr79v1q4lyj9uwshz0c8t5foa6e9vtrokl',
                name: '6ipe1xdcuh00cdmvvg4gjitzr79sak3k6wh2hy9a3wdtm6p71fv0l56cq6w3nmyi49pbxbpf30l8tn49aop2slwoqg9t2kriyivxdvpvfd51zwvzywn3milc8x83shljresr0ss5lnjjiciu8p8o7mwzh98zvc5x',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'a34yf5g46cbox1pu96ptr3mc9nw9zfw7gqkgwihctx8bs3t8hmfseb1umghlyjmt4934edtw5bzr5zbztmkkv9pr60z1s7a3q9ar0s5im39cxox0x567ys30l7lm7yj864tjvcgyps4e86x67blsl1lszuc9takj',
                flowComponent: '759f3a6p2x6w4lryvrbph0xl99v3glxm311rzixnsinjdxuyrurhlgct5z2zvdd2glotc36l5qi9wv2q6ury98lr8qcehv4wntaoj1o08p61393m33nl5uyg5ruewkdxcotzz2c7npetdvqv5jjst0z2obmfbp9w',
                flowInterfaceName: 'i8awhkek8aaztfn70uxo6bmlw5i9wj7lqw2hzmpewzjgxues37i7b8suc774q28iwinaldcpmxwyft6hrvaughqns4bd8ik4ahx0872aaanxrrft6fv13s8q3wrj51m0niccaiwa8gg23dkp5sikczudc2q3wgxo',
                
                version: '0cemevo1qko7h5qju419',
                adapterType: '12kep4ge2tpx5i9n0gfcsigw77k8lsqcvdjxg6elfibfyoqbqll6fa3zpdbm',
                direction: 'SENDER',
                transportProtocol: '61i8g072jceeis801brvwr2eyi7uk56fxnlnw2x8ve7xxlkbsoawb5vfpi1d',
                messageProtocol: 'y06jgvvjw6x5nawx12c9ctl0hm0jzop39fjsdpf6beus9bmrr0f4z8stjkcm',
                adapterEngineName: 'u8oascnbf6bpqytqt09hrcoaac0g5wbobcs6pv1jzox0gxhmlf2c0cozhh2xx245znp30fz0ry34xj7r4jle6ew4nvzyz70zb6zblgiqdo9u5v29diagw80wo9d7oy0hiwseuhqn4i0wjx1q8xeig24gv1pfcs2j',
                url: 'cbb0f3f1ci1cbqoehdukj4e6oyd8m2efl3f09he6nlt072hc7riwzaremzc5w9l9ggd7q7r189l9ndjxtvcu8y8x9qf71yi7l27x5n2mw8tlm20zgn6qri7bccyg8btr13l7h6zuc1qe6b2whenwjhleecijbw7056212amner9b1t3t3qrdix3d8ic28rnfnep9gndhnz5xqsq55gnrlf83st13h5opkj9w6fwqkono0yaui7oz82qij3w4ef7vlloy5lk1bx4ok9uih1me8hslp0aoino9v6k23479dbhxn1rvhvm7w06uw4rokiv3',
                username: 'dv3bbm3gfomlezko5wkv1pqpv2r2n2vnkwmrs6k8cbdbnvdmfpgcry979vc1',
                remoteHost: 'glmaq8romy1lor4wpc6fnf7jq7coexruryp07dbmys24d06677dpk26r3jhydtuvu8lv6g6x55zyav6wkcztpd89wloa8gi1k3cr686fitmqn3u1oq37lr7mqcvriyuzbr33lhylom0vastq81nkwchyucng8yil',
                remotePort: 7111150734,
                directory: 'zkr187161d2ty42a5s4r52a00m1ctmwdkjdnvnq1k2iyc1p4vvuf0uavpb2ixao2r3s5folk7x2q09w9ltv37vgynoz7wkplrlwr57aj4jkr0igys6m19zf4b1wo42v8tn5jvphast1nxiws5i1celcdvwqdwnzpgvvn6nwwbkgd56u34xo2hlx213loyta6eifcb1ei65okamvqlpafjbso18f9nb3ctx9r8x1sw70rpbdpgj3q9znuaknisrp54ypaffv3qs290jnvtc6v4yjl8glhofteq82qw3d7rw62o4qzhjywjwfrvf05ucb5g66vkl1r6waumgo0jv20rm8yeyqu2l8u1tzhn4i5fdh7a7q7f5387dup8khsfgff1jl3pv3lxz40tilk3t0m5t50erernifg9806bg2l54n64d85f8qqn4w6w7ixfux3066v0kp1h1g26z2xl69vktwtx7rllnw9vfvyqjq36zdj96jm4b71o9t8mht6gmdaiz9a4e2dbh29l13ohecfzipdgyd0u432kpgxlbdz1j9chs3osksyyy8llm7tovbkkcnthqdl8l2ere9ohqmp6mivw4uhyjw59r43wyd686zqdd8niau7ezfuxiojv84mwknlv89iycbob7yue9lqssafflg52tqidczl6wzxxwk3jasjkxrzbmzc708kvd9bqozc2c8b0m5y8s5ksmbksv0o95zzrou5debbhsoe9yaj4omgd14tprvdx63cx125l0dyhig14yl0rld3hxqkwg2aiyt4vqtt8kyft2nz2chopvflyhwcaitpdinmoimy9m1m43bsivryj5lu5a0jqmzl0tugn6xjwhz98xpwmqc4frq48r9j9696slqrr0lebbyay7qgxpnst8yn51d8io4i3qvepb7dh1wlrx2n1xg4mdz1g6c15emikegdozzi0jzfhj8tzltschzohy4h2ntybv8sqt2c21xoscrb5rup8q0xin97b72ryjcou9a7',
                fileSchema: 'su3zgv5zgx6rxvejke62wtzd2wykn5nlbip0n59byq8sat1hgdqgg5iwao4uf3av4ub733npeyrky384hnqd9m9u4yy7ocp5luow3n8pmy0hj0bszdmrolau1vwtz961uru04257mzcn1mkino6ovpct5rruefd21oouex23tinc09ce2qrm0ji78xvdh285nrrm18yreoj8gxvdbrsxp67qo7t64kokbxqs04siasrurpbxz0grmjyhknftd2w0xmolqv5fgrwg0qplpfs1s6uqbw10xu1j9yju2hd7yzwi11gyv5wlgib0eutsdn5oyp1nngukan5vttsnmwhv2pu5n2kaxrlwlitac20upstz5olvbl482dl6xbuqdjw6vvd3xp7wgke6hcuelqdmhuo68rgl0fldj0yj4fgpsh0wj08mg664rpq8ihy1qt5c0pxvrs4swkgpk2epq492rdqgfg1s3xwot9eh653ozhnwwqgchu0jfifk6oblkbxsshku3v3w6095gowfsukpxyifyiowbspruocxog260y0upnbzhpyav5cpzaw66i2wa9hqj4qr2q8rab8ezeoe9m11kiktr3f29cca6ps3r87kdjwkxn1ek1pfos5mj3e0hx6jnqoe8tajyo0p33fzumpraq252r76fu5i5p45um1nk0i4vxp6n8t8aly8cwav3dx1tv19dqxe5hsauc9bq235y2n4352mgba128h0qpq6fl59v9gfx2psrz7y1uay4a0cjmgz7xnxqljcbzv0od2thwutxcj2zwk7p7u8k3wfmuyiezf826oeyafvgox2y6gmge9ziru1f7vk4hwc6yhhbupn5x4nyi1njwi2jp70v2auuymes0miqn1bqceiwbwddprjgh1m5cbvchetlkpyp43aop3o0tq580k1k4qdirovmmfehr2xtqullt9b8xy15n8y821i4mk26n7wwtw6k3oyo7eb6vwrzlb6lg9y6haqy53you3zln0ysg3b',
                proxyHost: '3nrf0htu9tcx28plr3xdve6at6es8oi3w5pkhfbns1uspg5sayjd8xhh36z4',
                proxyPort: 7205596920,
                destination: 'bwnxi5cqqbx4j09z1haiwyikhrnow4h8rroiqk7dvfkeczm74dt94e8ipmci5v53ij6uegnvslbwflw14br49eyer01hk8wn8772pr3jl25072lm75zckz2wshgw0fm0h4he34lr77lcamtbz6yapxrez00mvwqc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'itvntv9xynz59jony74khco1cxlzg4bzoqosyics8wga2z5pfou6s2f7wwcyn61tkg810ett2qbh8eq5ngygwwvmkqa4yyljf7w527g981gj72xn7aww709v4oqlkm5diws39pb1htyx697cpig40pgj05oyq4t4',
                responsibleUserAccountName: 'hcpttbpmts6zyyrzbru8',
                lastChangeUserAccount: 'x1w7alk4k93dvgzhunnn',
                lastChangedAt: '2020-07-29 07:13:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '3lsdpom2r5mfd8ie92nzu2uhop5mynpd6agcqh89',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'd1ld9x4d5t24ptijqim8hlkd9yh1nv340kpcaosn7wszamscby',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'gz931c0rgca9ij2zq9hd',
                party: 'acw8iid7ate68lfloolqug5v8fzzdk402bn9z9b3kr2dxvnmotttjwqw4c74coh8ax01wnheytu6cbkfapx0uvp4tihhcpy1psgb0rn0j4iegvppi029ye03gg5b7dh3ouus1pbk01lkrf6x9eifvbuszgugvzop',
                component: '0gj8pe3083p2nocjxq8n4aummexv2gnsoxfprl1nrav1w8j9lv5tvyt82m47sdg7sstu18p19u91bucjxs9up1jjsp1yecemdrg4ay610ady355sezvpcqk4qrkoaws8nodcq5el5v2j45oiud8jo7eyt1aankqj',
                name: 'ezx9vsn7pdx1d6f2rp7eyi14kkbauplodl6hixc8ux6m9qr7gn0ixt1rxzc1qtstvhrg2k8dcs3aa7u02fiybcaacukqua90ebhl9m0uuabjl8fx7tyy7muonrroygwu5c14uu1afyo6qhp4k8fk2lkahaire0vp',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'yqo9tsyh92ixpvr3bu6r5nb87a0uucnkjdnn1hhumb3oz2jbyk6i2klamrq7ny6xa6byxi0ace6mav6icn01o7rcouhjfu632q1u0q4yot73lfvaoi65uysmxmgk7lydq50dnn0w8nh1d3l87dk22f3nngq6c38v',
                flowComponent: '1c1lgkyn2b0i9qbgpmad5yfi2l7qk1wogpgq3q7nh5ybplq7oke6e3njtgct5pugmbnc19iewok59ipb03py5amvkhnvlqjaqvte2qw4czi198vp8gluowi47ps6nnk6dh43dfa8w53aw4yknwvg6ax7cak4eo8t',
                flowInterfaceName: 'nwvzf07b23i8w3dn3ieg3hsspy54w323uxlelluwztlj9clk5el5l1wjdogmif2holvzbwkx0mjsaqdzo1gj7z1ljy0k4o3fita6o7pyweoswaqou7orkufpt41skllo27c9ycseymc6qxbeodcfkspd3163njjk',
                flowInterfaceNamespace: 'k8kyjm0rmrwvyqygte3fsu7jm5qb5k9pjrvq8d118qxujdmg8fuinezycfm415hz5ykcg396vtoeuxe3fixejz1e3f36rog2fumisypfit4rzib7520zej6nbd4ow4ac1zlfsf1ar2cuvymvxwtah27n0a4lt0rj',
                version: null,
                adapterType: '7o8tkcekhd5jnia3y37zu1keztnn8bndqq4kmcfxa9a334x4onhmimfzbpvx',
                direction: 'RECEIVER',
                transportProtocol: 'te4wtrvo9izponyjxkfxcvlnz49rc4n9ge7oysr0k8mb3ih7miupbukwd9n8',
                messageProtocol: 'hzqa4if797dg6pdxlxzaovpoi1ta75p8s7osqm3iq632748gawayabzn27kb',
                adapterEngineName: 'xn8vsbscmkuf6yrgyrclau8zi2xwvzctdlmh9dsqsb9vienr30sezhh7ng1zaoq3z99et3lzf23x2kqvxygxxrfkxetb5hwe5vuimdku65fg42iwodp0vd3qtabrggg98osqp0lhavbip4qsfzpzr5v3qsgxn5p8',
                url: 'b8lxmm1j83sqklqoq2gt09d0zukx12liza5xttz3uyhibwwhoyaq08o50cp0vx8zmxn3shwish4u9680srb06isv1i4bplrcx4l1zn163f9b1st6t6mrsy6r2sjmio0llgln8kg0htstxurivanoxs9m9lzzwy5mhzj677wqv6pkv3cb3r7wzahi264wphpqav35llxcap5d54v71szanjs3w3ary8xhmgdkil2v46fh79ezhanm12ptiyfsekql20ii5zb8f21nk2mnygafc63zz50gbxke0v9hjpwgk0xj8x9oxty8fbdom5thbpc2',
                username: '1qmhsm0pwpjh2ryr97nx2lm5ib1rgm6eyx14iieq9rs6tay6101de3d4kger',
                remoteHost: 'fx9c5dhfa7koiitnv9z2d5vwbjfp8chh9l4oaa427bw8x0ter1m5b2qg888l1mdxwceh0f31joql3wzgad3p5eup9cy6muds5nsg4q32goqahzv7h6zhu4cvy1rft4angpvx61bje2g9iiw97j50fwoxiclf8xf1',
                remotePort: 4751054751,
                directory: 'etpex0epry1ohcegb0a1rkuflzmxctwr0ca8lsh23zrlbo2g7s8c09xmj9gtptds4ew395lkl1zwlvgfjssebd3os5em0xt6bq45zmw8swpog5ajzi8o9c9eavlubceqogkg0alu0ijl4vapsccalyypmpzx190082d1q3p2dujfmxocctomiavat1j2jwtpy3ikgfsci6em2itqcqdfm9ouxcdjvgup08sf114291q2vl7cmc1sgrjjyj393nri2hme9cka8q74guvo8u8jsnqhav7c88vwptvpkcz2fcd2ibrswxmogk5oaazmlglg0kqzwwvgj6brb1xpa56sp2d23b3a4zrjzoft98zg2hlgrr6f3fkndqvc6a6r7i8w0qmm5k7eeedhybe7zzgosig95oiiim0fzcevhrjj364fgtuwvxhhrwetmmirr2oo0txd44lulc4jfskl98sbp8kb2vfb17f26ac8r6ewemw80jvgtp7898qnb533dwqzu86vtw7katrgctrhouta2i2dzda5x4x4x8zd5iixtj30ge70car13k1t8fpqebtb8d92rxvbkzjz1wrt3torbamtx754ba2wi47lg9gl6cfz7k018np4n9qtmdfk7gyitteask8ohptzwidtcu800zpag3qivv5frakmscmb2tsl0clmhu0ow2txsd05ok0tn7oh31jcsex45txrfw5ei5kn39it3ytdrv1g9ssn3ib2gqyer1dpqzylujbprsbj33sx7arly502neugcnqf580e9wjj7r4hxbnp7b35s0i245br4404si3tdkeo6ulq3n0kq5l464f3ks7t5gyh43kkqbum01w0jicin8dz5gx2itv9rvl5frft94qvzcmq8gwptndph3kaiocnkcmy3tpseprdc6hliadhfvir2nqr4t05q79ushpg70ccjf7erxddqpl81yih8333epvhunocbhue0vwi3mrubzbbazf1ihlelzjpgh78nlfixrzc',
                fileSchema: 'zmgqa8gxqfr55thwu0tg2e98fupt4t2hxpuul6msidvo0xj800sq3j5atjyr12nbnsnefi5n01gntcf65ficc4qn4ij2jsvzl2j9hc7xahxr2h0s5kkr4bkmjohogo7wx2d6adrv0e7cqy9tr6zg281q1myz7o88co18zsjl5dqzcl268ycwhdynojai0d8hh3bx53gc7xcet0mzemp0gau4xc22xirt0inxt1f1zqsxqk5t1adngom1gsrqtli0rnn46snc2sbbyeyynnzn6rsejq6z0wemtv8qero9pmifgpmf6kdm7sbl0v4f7cht80t1tp1wyavn0nlkmaa407xgk0qao9m2piqryaywn0midzsy7bj7jedwczbskvd5t3uajr33h12p715p7ifwpn7k54e88c1rvyn1c2obffa6jcrn99u0t6o6b603pbizuodm1u1llkut3qs3ypaawt9wla5cmmoeqr082wcu1xzpi31e21ckr34n76e8s1bvcw2dw37xtuc1bxgd8c62y7x6rln3mqb4cz4idq77qkscb1fbrfaj3xe1it01py47pplw9iadxe24qo743ngi3dttk1v8lfq562ek5sq2akhzybezjr0cbgbele82uv8grfuan96vd8g7k421hb1efpgsociqty3hrrbrsk3acgbzksplgo749wi4ki6cb68urs2rwhoypjg52hrl3xuc9ce7ad7ztxoqu09grqxq8legfc0zmcdcqeizxrrlrov90865kka0vst08b5zxbyi2f638606w2zrbrkv3zi9kc4375xedzr6o9tne3lovsrc2pigozscaol6rxsm6pti6c6ei9cq9q9x1jfgrurxlgwgwa6fxv98tg033zkianw693bnr5r1of8jldmdsgcfevv9v474we819qqh20jfqfqfsgu8b5lpxqr8u4rhipi3okzk7f8m9bd7p9ettz7pgbj07hx3nnf0gqkgtgislir8igq5u3ouxo5fl85v4ahf',
                proxyHost: 'tc5a2zxyc85gdxv94805oj2uooydyzjhxhy0qozpe25zr282642j4ju9mwr3',
                proxyPort: 1446360281,
                destination: 'uboijxtd4nbyakxa18zuwlgakmips38qpj4pg99gg2vr5vrw835kbueoxta06mogeumh1fr5xg6mmmnrvxend9toozqq9491ms3begszjuy589prjjd55sgq16s3eso1jx42o6ad26k480fjy8b61pcj3unj60z7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'x9jhvuodjs9ezvyrpdukvv548sefbfkdy96h8y3lwwjla4onxndtkjaxyibrsv2mqbqdvrjdaoxq4x3u59bndtjs6fiijpmpb5r5x2f0bem2end1hp23q3gno80bzzkv6baw5v6vpy3f5mw2c7cfafm0qk5whkgi',
                responsibleUserAccountName: 'wxqnrsxl04xk0616aj0e',
                lastChangeUserAccount: '60y0isl3l1f1dwun1yts',
                lastChangedAt: '2020-07-29 09:58:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '0w8yevmz36i00gavgwwybxkmmzt6vq2mfbmo6dzb',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'vwf8u49p8o75k640aroarj6trk92oihkw8m3kl58gdd0mebtjf',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'pr2ec8w1ie6n7lq0uuli',
                party: 'xaq7b80hqmf8gpr5dz4f1si4qrietmxtg0mhksp5silns17a3nmw0dh6pl8bqf08d2op615jnlvzi7uxm06pkrjvzu5zxjhk1zqj02vqucw1otqip7r0dhsnzwhafx206pmqopabkby8jmsr2e4dnampz761rqnb',
                component: 'q1604xveahcweo9dagnanek5inqp6psbwk41q6sm8xq88pv2pzqimezry8v38i3thpevnod6lh4p46519fvqlq26ezg1wnxaselvlt7s6noys9zka9o1vak68uxl64wi16ktf2m93cv8gblphm5q0luj3ckrb6en',
                name: 'hhdn2aptvlj2k85xgazeztlfjdx8zpcc9maxaj553gneghzsimztedh13zy9oj0caqwflp6i7o1rfr62hty66kbupdgn4nj0bbnw04slnpdnnfjebcrl8fm7ufawxff4es7a4wfn7fg4sg1si4l00vmw2qzdpk8n',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'ruui59pf6k70qguwbvgro0gvun5umnne3hbv4wpd9fyqe4vlitvfciwc3ozcyvnybsel09yo4wsx1shozuh8ijb0r4actzudjfpbmhvejaay1d9i1qmv0fwuwm1ijhuy0c3c7y523oyt0weaq36lvc0vk8re1b47',
                flowComponent: '8jbp5cbfeh17c2fcjnvhe0putzxa8r75631olgw49ry7f2un38gk1hunvwqvnhszb5tz2nggti7vjxqlb13rrlduca7kyoymw94n9g2cr7kzv49d56orf6z50mbw3y0k4gtecfqerjakw97f4b4ciuo6bc73nmz8',
                flowInterfaceName: 'ha8uo9jgw5psghfmksw2phzejf04xsuod2e453vm1aycw4cppi70mdk2ape3nkjz1bwtnmyvpkem1tw48fu846jf9uuauqvjn0nxless75rrrvlvsovd45ath4u5l7a03bniomz4a98aubq5xlx0v2dlhh8avgrc',
                flowInterfaceNamespace: 'udukdfzelfi67hoil14pz01o6aabruk0wcvs7mmjmhtfpktzpia3iid34p0f7w5yal30325bkudphndirkok1cle5hjuqnvveovslpyatqhpcu43ryq884dxmu0b8zc4pk1s6djupm11v97dplt5xno1pndj6v59',
                
                adapterType: 'yu24pzf3vhi486i0qfnt05vn2jcse8a8qu4cecdflpr7tzzd7b2u6jxz5id0',
                direction: 'RECEIVER',
                transportProtocol: 'pf3ru7mfuzjmqk1zrzxjnj60nkfc1774rejb6rbi91394t6tojow178d9slm',
                messageProtocol: 'na6ebbippztoyx9wzi62aqu3gj7uxl38l75lq48aa61mb53885njp0d73tzp',
                adapterEngineName: 'mykh45oj57kpofa83h0lyefanzg33jnahf0twyt1nzuvaqeitmhhh200mn52x6zk9awfxk4bdix3bm3xtb91moc3pk89dv10wkqeauafhx7dku5sxditizb23e1vapniw0q92o5kj5qy4dzrva8rovlxq5lccua6',
                url: '0luhmlba2kiup9ao708qu8cvm1g4hma7jpll5hg1uw70egu1zyo2wth28yuj0bfxobq2vsqa2820fjxgbfo1hlf5upuvdw7yx7x194g2yhqdbd40yfex10lt1ztqj9v91ot9y8y5xq43gva92pvqtdjlo8mtni84zj1ywm15crnmy7vqdol0ltd93lks94cb0s81qyckugvc83eoh6ac81u44kvp5i17741qsgsrxospgkoi5x96bzsnc0n8wsym5ob50cdr931wpi6sdld4r99dnsfh86i8pvb9ec3lhzuftlf7o0pms1ncu74xfl90',
                username: 'afcryjdn071sz91bmjut2a0q3baudtn50lh5ib6n7i0vp8yyhoc40229udac',
                remoteHost: 'k1d6e6e5g4p1ni5ecc3a0mc938pdyabokfoy5vm9bk4xzg6yeceq27aosc3xtl0z694s254zkald13rdeaaiyk1qm24015xtd7wupeagzz8iq2ic72l7g8vdvsv30wypmhaiyunn8h30fbhaqheetubq8hgn0r8u',
                remotePort: 2446582982,
                directory: 'lpdm35xdr4ruhkfrcndltxltzxpl28r05hxt9ykodq1q7lr4ogr5nbwrj6gjdmj6abakfmi4zq9mlw4lqhc1q2ib2dcmldua0tgdq6kjn9l1geeumjp5tlvardi4d9t7kz0dxqqv4vaxm9c267cstpvwalof2dun2v41i9fkiz3epqjj8jzukjord3hf8gadkuqvpu62f1rf7865ys6499kt1y8e97hawwglq9vtrmvujvyx3kzbr1a5tgc4wzq1vmpqp05ic2klluo9xgr6c68pzn5l1gx78ejq5kowyil1q0m3iesrh6bzg86xwbx8q9p98fpdvc199mzj5fu0txncz8p68kb17fucei8eycvf6jdcpz8patnc6397l96dyp2dgxwm2xya1xypr4t89yyhs1sifm9y1u2mplzodvx96fr83ap1vjr4cs1r9kocj0ih1pqqbiqlo7jo8fvkpzvrazwtqhbkz2ckn01xrvsoa5bqa0pxglw6b5j2pbsxnkuxr5sh3bqdpc8bqx5wd2aqjb26mucmh8jtvq752hx6ge96zp9c9ouv1dt98jkmlh9dvuh61wbsq6im91hglouo1no1zfqg00jj7ffdpy72s83plo358y37hd1a39rrqrtrioh7dv0nrdhf0zcwsdaqbxeqe991lckovmvq45injm3medi1x5kqnnnilfkw18bxnmpm73iexexrquqcj66kgjhqpcufk5wn6gamq1elq5oetdl29j0o14dbr9f50fjgrwjvj1a9flnp0uqlueh1yq3ynou1d38z1kfechx2ncc6pf2yzysuei9wis9rucjteuivvohvz2p3awfmoytvy0reofls0vcd3yi3t6dlanzileqloey43qh7jgu1casz3yevqzy2v6m9rzx8evieud646noqktn0durt1h3koydfj4b6yeeccjxl7dfoo1qk26nnu98uyibi7lkvr12vdqut4lm4xyhlm9g8zuiuwziu0q793bnk8662t1km',
                fileSchema: '13bszbkr6fjfkjzdyb6lbtartnwo018xecuactwjjan4jh0f5ufbahdcz5e5od114i5scn2kv45fqzik56dnxq4mjt43098h746yrk9xhgbnq306e0mlp26ivyhzwx7obl3slmno1fyieqousf0mfg3h1s9m10iftelski180xswzp3tb494b9sqo8pril38lc5kx9ntqlsfqcwxorf0osfvx06o1f89sn42t33ngkey6ms5umiune45hx8t0ffzbz8yowy3zkv7xx7wao67ox4xdzlyvtie9u7ujodo0fqxvrpvmfwzwfl0vr3ifqognf093unwgxnuygeolvudr611wyi6yve547k80jmhotzad7aiqgzsypho1otissmonk7cmpkxusekys5d6qbhq1ttsqbli5bs7zzilarxiv1zm5agd9oj7ryem4wwihm5lk4xlv4brbuonscj2urgm3rbchvfvorniy0kuki4os1rg7srgzg9ax7qt21wn91kiqobwjyhi7vs4ojar2sle1kme89lxzbyhfe7a1jedo2zufg30t8wwkxst8xplpfwyq3r43jua5vzy67idhmjlo2g0s1c4xezu8cbv3q7fd3la9wb9ai206t7addbc022l361j9sjlxf5fwaxhckq0ca1xzresj7qan5ch4zrinul6z9z90yz2y74gir3pvywirsltcfeydm6alpuzvpxjg0zhw5sfkzz4zlbtqa2rvissj4xzaxrtdi6zk4j3a2r0t7cpg05jnx9a59mksr8nzcnljgqveee72t70rejhu7du0ip5qqwzau21k2xw1av94dyvp5xp2vbefriv6y454p73p85yfj58gndxayznvxa7hdigvbemz9krc4w3tmxtlg292w5jauohorcjuzebl5x9g2xx2dcrb4pef69nekvzl32jie8qlx5ozgitk785vtj2wcg3tgpwiccreq2llpnxd7u7gnt0x9uimbboxvgrmlgtninu6r3ij2jqojl',
                proxyHost: 'em05psi4srrq2z79upt7vfpk25f50t7ts60mnpqml2qvv92cz83d65mo83kl',
                proxyPort: 4028890569,
                destination: '4oo3rqgyzkxmtvwew0b0cmb9z100nsgpe3fu1zjx2w4821mxcq251mnk5mtub6dy9t5r2vgn2d6ttoo6mohpl9fw8qy79l4hapje7nwph2am1x2bcrjassfvkb8z3gxql0q2xc44920gbtmp5bt1wcgwudg4bxp3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cdyi4124xie1wffn82nmzea13pxb3y501h6oqxd8fuzq9ljc0kdmgw4t9v3ee7qyljusatkx42ikgktnibv4bbd4qh171b15743qxlpbk1mkuwo9x5fmzsbruut2i8g16ugb5072t4x1yrdhezjid7xox4opjuwy',
                responsibleUserAccountName: 'xl509ike0kglkp9fem38',
                lastChangeUserAccount: 'fxqh4u4bef7nawcb3gl6',
                lastChangedAt: '2020-07-28 18:27:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'x99t038bgxuh0cdz3ezjqex2yf5qu6ppvc52e5bc',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'hpwrtjy8r8arm5fe071ebaqq3c2jb7k3t1u8raev1o9foa9wm9',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '9lcm4k6mk2s3qoh4p8np',
                party: 'bultwfnwcvrgtlw5hxp3obyvqzdj70z6bkkd8yf9a8q4vpz5juyxz7uc5irg4i23rw4pclh3ycfj5593fiyo3ycxcx70wbjc91oepfi7srulk2jui2ppvbp2o2oreqylpl5muo41utref91k4coj2c5m5mm2vllo',
                component: 'u1q8d9z5xk4uj42zh0a6cok8zoefgh8spte5ajm7in4etejfw74h670829phutfyw9vk2i8ty8bdi5g0clwiavsrlcejsckdi4iksu0jv3x2mgae6tag2gf423juv8x5l3xb4evf36sfszhvbw3y3jtp9640e98g',
                name: 'zf7rjx7vjqet2v2avjkoe2xewlk28grn8a9nc656izxziyd5l6bzb8ms1rsjlkie879l8843lmyn06qo4m9ows1ykfcjzfmxrjjx08yuq0gbiltmpda0osgimqbhnu8bwgid22eumjxsy1q5wo0s6n67g2jgv3tq',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '214r8szeap7deme1h8nl2xgzdxdgwb00bay07kpjrixt6evc3qn3zdz05ohdalckoqamhllqlnema1uuxto9l48bq2cchi9jvpigcoc2u9cw8tjawxowzh7pzdfkupqoll4mls27lm93tckian4d1krcfort3qp0',
                flowComponent: 'lsviv2oaf85pi8gseso30pb1wp3awbt17d6djuw7av8in53gt56ck8otyiop2i96u3n3f7gqziwn0bn13g9xeqebnbt27pgj9ccqj2xx8q3qnzwjc2at30ltlz9towzlk47k9po5c0lbcramrd3oysrdtu4z0g1z',
                flowInterfaceName: 'txh64u86aisrnppvwcqnsuxxwj0fud67ehpbxsm8nx1kwz4mu7qmbxg5nophtflnyx8isuy26eymffshlo7k4uy88qjc8047fbogvkvk70qyh3qsynh7sjm3ti0ae5o5oz7wb5jpnvdttdshq8acffprpirwzzgw',
                flowInterfaceNamespace: 'iq62f3rcvtw5y60hyj7767rq8n85miharsjre5whrcmfsq93kd0fpwmsm87uiitky1uqsm9vpz07079hgndounyeojzgs1srx6yx16mwxsxmwhvmntr4qb6utae8iw7w97gaglrq56fdw9nr07bgr1vpqu25xnj2',
                version: 'hiuplqq8uzx4arvxe907',
                adapterType: 'rqratbqj4hcrv72mrsae7zbvuli8tpt61jyfwr4xl0zv4060t1fikjpk0tcf',
                direction: null,
                transportProtocol: 'cdson794zqrypehdgas9qt326njvkk9vq6f8wxnlavjrel63hbkv31axxxp6',
                messageProtocol: 'kx0nul1d5yabi10oto4qychxy6nt8luuf61le5gt6weh3csl8kkk1wontzat',
                adapterEngineName: 'ea2p41jx39pxwcahb5j0krxeicr4q0pbgihbr3udoe0jg8f9zzbbqo82gkoorbstdev9xwxabp4lcpslsoz83fzyxs33fwzo66vl8ke3kv3bexcqcquiin9ehjq504yoak3rq55tgwtaz29bke4bfjemiakj2xui',
                url: 'vzyv2kn6objcm8b4o0ciuc5mb3jv5a0a8myhboydanisdw5aictgurprzl7jni8yg9tt0s1aewtqfb6tji3iluhsv8rhuyh2s3xbto2i76t9lsk5rj8ky60rxkspeadhrb97hjd2sjlkfm2vjujqzhgnwdfzsb7rycw6n1s5cip95mcqrzepcu9dc6xx27hkx7jdgik756kagck6k2h7rkbup7hu6rexikdflvuk4onjzrg1hqfkasmi00pyd3rntnxu5e2yxvmqbcux8z0kdta3wyzv6o5s5esvzr2n1eb4w26ki13j9fdmm86hc4tx',
                username: '52rhvdlwvgqrxx2gtn7bt1dhm5ux2bgaj9vj80r25usqf9do3n5s6whloscr',
                remoteHost: '44mu1pyme6c1sl5ee93439lnqwerzu94vu0080m3h0b077dxbcvvfv25b0hw1jk4ktg8gc0ziv3riypiq2sp8g2cb24yys8yfis5ox24b9puz6zdvewn3zu4pqf05zhshox604bw3i4y16ot6zhe90nkgcps8f6q',
                remotePort: 2687895982,
                directory: 'd9b6rq17kilkzxemfo95l38byzs3wygdzm5pye8ej9vlpt22nyczg8adqgahan5jntkgs4rj8bwnp2n622e7pavm4ylncmnsiyc6i9lg8o8ig3nn36n59yj7nciqd5ml7suv4ubc1y291zh53eq8blnza2nvqcvyh194jbfscaf1hpvce7tulambuvneqoi239werijqxgg6u6v2m575febe1dxpp1wo7b0al4ttqmjislwtryu79b4rqf0xkkaloz3y5g9yb6innh00mj4rdkxkqdy1fxoodih8k5pv521cya8eronrmd8ixzlsjcpb37omonpjzznj9ia6vm12t1dzw86aq0ksuujrn3herqd1nmthfnc4buv9sctox5mr11qa719apvm7ihdtk49jd6wbaregwu094zsvpu14vl627sqyngxvxzzdkijh9tayz1gzh30p1klns6n7omzty7sdlh4c21a9zf5h4szbg01wnzeian28fbnluj2ht4xdf7vt3hvo4630xzp01ofcbshc9p6opdsrzzpbpr3p8gjuhquhmy65sszbhytcrf4j3lpi9wswgluxeqyj5kv1445w308xmcorqzhp3u83tt5o55p7erx0yunaounyh9ew1s1llesq17bdzbd40zkywzbrlhg9r7d4rtyw3csx8pjwy9u5s12psn3w745q8gwjb9f9t9z8wcztdnz58gd7h5smbmwbeld5rtbbebrnt15stvztw33rsfzwwjjair377f9bxcleip5tpqzc2w666k694tvu7z9jo98suy2ufwm2l5dul7bki4n06dhna9nuwr5xwxxjw1pu16fy1mxx9olinifont5mh6omr6ukwbdry1sqapdhhxqnvgj2nyw6thngu7b6krfuhg9mxoc8v2u6thn08ev0sgj28dnubqa2fnpv57cdv85s8vzohdbr4oeo77l6msfwcwlkujjbwluipdfglijuht6tr4qktunkiy3oqq99xxwz6m52wkgo',
                fileSchema: 'ec0jm5p1j9v5fi7f96lhf6uicck1n68pz57rihs0h0wugyp4ge2mhm3u6ywo918018nrpz3oonmasi9l6m3r64xgs6wok68uzdvrwdgugiknrvnc2wqg8045dtwidks30jl754q3k67397zj6t9uqfwl6n6mh3juekhu2d2wfbjuexzmmpoi0u9urfw6m6q2gtg2i9zq5pt8n1sxb5suiuzw2wtm4nxy51dh5fjdj3f0m8feuk5tjmdou5ixmqn836pc5e3rcza6ql78gszqt2eamc7fva4fzleok5eppcuwqg0o7s9qb4ylsuv0olglo17lx9kg63yzmujbelj9lr1rkxb37wmybfbdq5cp1qx54yxycinx0mdso18jiwmpxpjsz7afq5nx4o3ar9on9azetc60qetz6fwbllrvsz9kvt6sbx69x78bnaala0qutb62ee7y7h2szsosmu7mjwv2quq5fp6zj1i0j8cf4y585erx53n5gj5j68d6jlaw5922jb8ob2pwoh4m71tmvmgq6byk4ldlxm6by8jquorg5p7mrpiv9aq125cti0lo6ovraov9ihc8a6z1j9ljtoq7kxpb1zlyasdoyrr5s7dvk1s19ea2x2il3beu6maetthb9xqc789ot02z45sb9xba8zm53esx1atsycml09b4331cu21haixidkbt48s16qggfq3cyr17u9z7cj1tsm8l8i39kwroxopa5xdfw3hq3wi1ldvng28c4cusq1lci67900lrzl2cank3kng0v4ipyz0qhfwyz5p3d2s3oscj3c97z3v6trn9b5oniyviflubplbhkm8hn7918657n485g3pi59enmxpi56gnv6qt8n477i0gq4yhbqvsnncfdawq4edllvt51264lo8chy1f2bwx8knynzwjeli36g7t9705vm5tuxlaexn9lou2i5wuidhsh66o4dw7xgbg1p7ku17sy3pd8q4cu3pwcmebg9xzpkpg29i9xjpsmq9t',
                proxyHost: 'q6kxr1e60l83aeuvi3yg4gvkg1unonp25sx7yvri3y5zt18quh30f1zg8n5p',
                proxyPort: 3465584189,
                destination: 'udrl5fk942aux8gp7lvpxvseywgnoqhs6hhfz8r5k0xnlxut53abosaec13cfb0s0npec9lpdn0d7qn2g7jtyhfelxqrjsqx5hu889nehg3mufvltydz3ewf6nrjng7scj7c03aklrj3pni8u58kwjokka584ffo',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ufgvois9sygyc67nquy3pz89foo3a6rsiqxcryurooe9x0zfnexyjssb0gyr1fcgo5agpjwihbx9kdq2xlj1u7v6dypysnmhgfqi2y1plxfwmcvj92thzyh0zv3z2nn9iksp96rnxxs8e7ss3ywzgq6ld6f65iz7',
                responsibleUserAccountName: '5uhyziqchxx1z8kfbgez',
                lastChangeUserAccount: '4o2y2w3mm0hjftbfmv3l',
                lastChangedAt: '2020-07-29 12:55:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'prh3urcm61i64nz51o0xjxfqnx2weawtq6kd25lw',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '9yzoi6t16bo5ara2d5jad4b4pdg21shvp7gp0rn0w9ihwrtmj1',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'yhdssfpc4dqcf4pd0ntv',
                party: 's7nsj5pccx2x19w51qxlqog6ijlfyvlmts5qagwzit82yqmrvfo1l4kogli7t84imqdg3ezcob8nxuz8rbhwjwmda2dxl5sjb9grzsup9uk2qvakj3dkweyhvpwvrymrp0yi8axrylnb2a55kpqr90xf84cnl6l8',
                component: 'dabqnyw6nuhxkvexjio3r9pt8zkxwwsh9n62hzsrrhr6mhnfnl01b05f4fpkcc17dfq557jed7fqtuwaa6akr7qgkoxnsvh98fg6d6yfud6duu8tcc59dohdzxfxjfg3v72oy210c2w643zff78jls4tr3u11k5u',
                name: '10j7rikvf7079po4waxtjnevgxtudpoa5s7a4t5d5w9fxz8le9jyfqjvywwp9dfowqgpxxpacucuvtqq9xxk3k3ubj8nsbj6o0dbi0fnc8xdenz15y7m0zdkj8dfq2c90qtqtv0zougpwp1f5zm8zmat33d5vwud',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '6q4vui7zf7dly7p538vmj7uq3i9lncheomak3zgta2ps5t20716umr4wg8ror0bmvyn76xuu9oyzgi5brvya2wqekgv3rbkk88kaxwc9oceebj6uzy186hyx31kh5mdkceiy32y4t5v320iu5ikeeaqspu55xwre',
                flowComponent: '8ukmy522ug393k9nf6ibt89p07gqh3xth50lhb64lj7nm2fby03g1rva3v4jfglol3vsj8wd9l6c2dhm6np9cmtle8y99x5apc5t9z4dwz57czoeiu3c2axr1zz8tpc87ruxwmzxnlwsls1wn4ne1nr53zrvww4l',
                flowInterfaceName: '5ad0jzjog79e6t3o2caqqcnsvq45n056gq39eunjyds2rdh28pugdksrurn7m3g0isuxur4qg8kct3np4p238j8iqepzkxssj42pv0futt00li7f4hb2vcz5r9qzy7p4isnx4p6ilk2baibf2q2bktqwpv4zczz9',
                flowInterfaceNamespace: '0mswj5dn4tjjl2gxwjoozmgmx28609lmej73ng3bukui0vin908ffec58ukmsw2y2luqjpefxtrg6x823ksntoj9zmc6wvziwuh4ldhssfshuqtf261pvsmathc8pk9sbtq1kdxy96z52vi6d40llaq9cfyy4280',
                version: '12gl6c3gp494fkc6runh',
                adapterType: 'qoffr7ngh0e7rkksqbpfqp9djzt8ruww48dbh9cc3usgoxokqwdwdl190uyg',
                
                transportProtocol: '7gphmhmn7nbv2smxx64y8yznyj3f4czcflm8azea52b9esmxhxal5r9f7ctn',
                messageProtocol: 'b242pl23bl55aqjv05wup5f8wav087dci7nrvzzw4gw48ruvbqg02trwkibv',
                adapterEngineName: 'pc5kol4ag82p09bqv3uwghb77yjkk4hjm90tf9e0yq22k3uft6sqab6ia5594n3niqaxow8puwjw2xubre646l60cctk12kbf1yl02o5c1479d9w5gox2nmow37989iavibwfk8erpci6fpfmd99z348iku3zi1n',
                url: 'tfptwzzxf7drp8f2k5lkm77sjj7dnjlvu11gkwp5pz64nd461vy17hys0qvdipiuvlvr6abz7t3ruqi5klae6vax40ak16jzqwy67h6znwufhtumkpy0jvfit8ylvkwu37oqpten3n7a3078vq1gzgd36vdo1isjhseqgiwyo85lwoo6aw8b2ws2294is91notj4dk0qqxsefxnl4erckg9nipnwm37c2ifwto2gv4jkmhk2ikf9lw4yvj01nih35dfgelu4qi5tm5jt6ypf0d2oz82ospdygnyq5rat4219kqx1okwha6nul7l2uj6v',
                username: 'i530ovprajx6ifjeghmf7jvwfoqaau2kis67gsw0j17hxf087x8o6y1y0th1',
                remoteHost: '96wt86naxqh0u7vcfc78xrhsgbhmwogt4g91hg33h07768ic4mw3fnht8bzdh31mfp6llo2i51uugze1jfy7dod3q7cnyq7kqp0ep5g771fci3m5fqdyxrscez7sx3elf1bcecbe7hnt4reeg7xnejdpr1iie12u',
                remotePort: 4027064463,
                directory: 'z7lex28ixq8wppsicjkzrjmqtebtxl3ycw255ws7ea8i75f6p4csvh1c7ht6rhkqytqwht36lt6960minytzbxnhv1sdmsi4huib9j0ix3yac2qbkuk36wbtr3tr0vcmj6pbv4wnpln6jrcvo72uj4twb65pnmomibaru5uem9z007f5xa4km4txm14s49sh99s8bj6s9u8jlns8orddudfvyatijnvs3jd276obfpviud7sb6vp3ux0sa7bt3swxg0nou2h3yrcftix15d8q1mghsody60sc2egsg90p5ijq5woshul7skbikfi3pxpw1zhi1go2qkcljg0p0s4c9llvfvfmlm1zord47mqm9yp3fgw5ctkzvcl7ascmc9765oo2pr1ke9h8wt0crtsx3xrqwkfklqb0dsw4jibhdiekuiyhzc9k3fa2amgfmhckgrjmp9qm1q5ta7abg6vaqltsmtb1a49mx5c5v1mdld4vi7i4rxa0l6w1ev6sb7k66poa9ezcv1c1p0q2eji9li3ehy27ppr41f8qwg1k7o2adg21zujzbjfusx8ahlbs2izu8e9f6o911jktsh4esp4fxo8du7obvn7lsvmkdccodbypstdll1cfnir3ddewb7ms3kcgnjjohdep9gh1onskk36ify9f05x4k7we6ar15ws5owmuw1q12nqeyrpk4cio8xams16fob82xn33vy4ccgq67ctwtpbdnd7alw2gnw6qhdnlfz4hlrs7j80wx4t9afecycpaam7yzw11vez75ve92dhhtq7x5cvz5c6jl31gyq6bfp1lsfjeay699f0ncm58mf343acpm6ysrn0z87c543stv5483mr399r7p34uq67q1drvtz0vacsvp7j22zkl47649okxpddnl8006ym0emyl9vj8w8fndxw65eeag35nvsq3431en55z9ihlyf7qlp80fiu4f68ekp4oi3g1d0wo9gjnv5semdjxpgbhr3oy0v9459bk6fd',
                fileSchema: '2v60nervpeq01352mot7rv0dypsbixz748y4vo3f25zmnvsmbald33ub3a5dmaosdiq2d0srfue6h0pe8o9r8o5avak8qp2i200pqs7gtz1rrfzywa48g8qdg4pcczsv2fxargi0zvyuurc89vfti6r6kkmcmftu4mbe4qpepa6j755ozq8lezc77fso5qv95hlvp2ugilqoys29r1f89siovmvcv1i5raewlf98901w9b683oymwnabmntp1tvmuyuxu5p062zf6sjhzmgrf2m1m211xfltahgkxszwjhuv3ltnca0l53c008xstt8t93daa1h40wlqmxwk3qtmie9aacixpkskuzfk6sh35on1sqtkjjpnraegj1r89pduvlhy94zrdlq4cr59hec0xzzmt2qytop3vgvj097k9mua6484x6hfvlw9weuxi6yw6r21028f9f0ki8y00n1sze0dpwqbpfnjd4b8q4vic9tyjqy735v645was76ifbu65sflsisjqh2e4eh9bs8a8s670bjvzu0q0cgt92wixvkdkyl7m3x4c1qjxsom4fsr9zk3wyjp9n6smyl56znwwbhsw8avo19btgosjev7rx9zli1tcpy44rpcp8g74kq102sfdi6yunj83m7nnn5vbwwdpzshu0acaui32e9areoofdx2uvpwk99anxpvijlk2ae4v2ipjlqg8o3ssxiec8zehrwly3juxc6g38czaapypz7c0xsy5asvjmx3xh80d0z4g7dagroazposznuqhq1so0qj8e6domn6quu8dxxz4851a0opdhjurlfzpqpdzrp9qzh0wp0i2xqx5c4d3im212m6z90attg2ampb96wzm1b3zumgqtfa4ncpph6dlwztp9jqnmp3m509s0i3ro7afh7aolvrvgyr39mar24ypku5uk6g8kr52mmh06rzyfcalt8dln2zsbpd0bk0bnyv6dr3qvt2bywnucr2mqq36vgk2wx19nvyv94ly5yn',
                proxyHost: '65h7d0xaebx2g21q05xjp5yp7fgjbk1zhbuon7pn01yv4vbtie9p97khnqwb',
                proxyPort: 6154127647,
                destination: '5iclz8y66ji4dwsogb5n6qmx0ajq1o4x7yitu8xwbund64u86smrdk9ape8r63azfzjd6ro897pof9ux3xjua3cf3qv0h7penb8qxxmo8yn2c92jie9axoqzv9rli2k8d3a2qk89ze23fr4d2h86cm52cw27tbm1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'lvjb145vw1j1p2arun9iavfjwjdocx3w2g4crarsbey0wuv4saex8zz2mk0wztwp7p8yyxsyj2vzr2fhwvo9kyzbp8h09xk5uucxpswy65t4jt7qgluzlkxjvg4bnjz97jl8yy0ia1xfx3pwm2xky2682p4k5o3q',
                responsibleUserAccountName: 'cbo7bd3vyx8bzosjefs8',
                lastChangeUserAccount: '434vd8x5uwcwq3ovk0za',
                lastChangedAt: '2020-07-28 17:19:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'uywd5jjzm6xko6drz5eh1vdx5h1naga4kbnodhcw',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '4cyv8s34co5o03qjl5u6ul25pf4qso3b0bx39h4j9oc7im1nro',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'jcc2hzsnptwrbuomtggt',
                party: 'vivqv7erg6z593rmgr1o24u1qgjghp09qqxwiegt9sr2ftxjqoqygto4vvahm6q4ed5zeys9j8z15mpx5vzfwcbcoolpbuuq2z43gzzwbbv0szl9x3j8m21rl3jpp6njh4ifx1qeopg400berv1avnrijbr9be2c',
                component: '2l23dxys60uoigps7quf7bqx9hp0jdmc3ifa0vtizrcyi4sl72hh8fj20d9yncxko64ze0qnb6ozepou45ikymbkcgwiaeujslikpocws1q9k93vrr1hcjj6onl0jpd61zq13c1grxgcmdhs0i6mllh9jb1a5kpt',
                name: '1jbmrxfz5zj7dazb77ti08rn7kpjmuyoatya6v64swv7ojspdm4au0roup899y7ato3e2cs9ok9oce3j402hbl4l4kvjops82uvhdhdq8nhlnhp3vz996r3gj634loq2owvzhylpyb43ibur5g79tvp4nwadg3nt',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'u0603ca2kx7d74hv9voqvgxdx3wdb6k4dzrgx26wqh2nh4wtgrky4uyhr3tkt8w9we3tlhfvz0kbfkvdb4ltxdgbf6maeztomeszokvqoashphobnpfi7r6lbau11v98apdb1wim3u4qzp5m47tc7lq2ml7nb15l',
                flowComponent: 'wg8idb41dsxhu3fu6zzwdbr4z7w5gntefxkcnmty16rdvqx1xtskqhu9s5h42o1q9s9jasp734qpdrj0ui7twf0yws6jcrbsvvzhlys5f41emqvf3g35nwmpfsjomwp8t3utzbtevsgsatx4pkst8ohho5up9ys0',
                flowInterfaceName: 'eig03pp0ou87dlwm2u1pmnki2uatrop9i9omquf6zayjqlknl7k5a400t4racyzi3aclfx45q91ftfyrpgib8et9tqulfse3qbt3xapp38eot47ieplv6zj7khsn6nsoui9lpsv02f3w7lm08r2lx5bje0fk6ety',
                flowInterfaceNamespace: 'r4w5b1rfu8mfouac24cb6jf7blb7el1pm165i3exbao8xilrlnxlt5jvdpwes9ctxdq3v1r053m70sj59ey3n1gelvt8bq50lxbsoknbfb8fwemb0z66dwukmvef45ly4oi73mpmihigs4bzqv77o7wdiwpzhubp',
                version: 'xdfggoo9mhki4gg14szs',
                adapterType: 'aj427wyq772o8zi2v6118bsk52kp7ne6o2goldem227y59wp3x4hu8ss8ecq',
                direction: 'RECEIVER',
                transportProtocol: 'ofa8mnt8jb0v905ehsvw6h3f51ylotdmjfgj8d7fxmojaclfciy1obzu8qgu',
                messageProtocol: 'd8495utiyuxsj66kl02kic5clo90lls145v5qxm7byzbdbykytb5am9726kk',
                adapterEngineName: '8p0wdlox12ztmpmiynf2l9emy8xy5uv7p44pigqjwb5l2ybqd9grgjtfpirarzgrt8yffw6ngmkpdr87s90ujyvxb1qd67g7qhaixmjh70asvd00d3ps9f1k2zmkjhq010ibryk4acyd41w9txu5kiseu26242of',
                url: 'kekm8b5oocw2maqkxmxqgsotb5dlsctbzmyu9i3eafonycb6zyoiorglvv5246rgsxynr5kjp6bglrwtrdf5jv1an2g92h8o18pkzmk25wdrjbhupsgbfn48ljrj6cug6huj2tb4p8i2z19ijcbxlhkwx3i4zr4lxa4m4bhenfwy9vmvm2lzqixts0jeko69k8qdowxpaumpb5hhnr55op384fujktp96hsz0jauo3yurskrk11ozst7uj0eflnfcwtq8lnbkqy8pus7r7t5no5ni0jdo2cdvzjbjyh6xdare8vlq8wu669r0a2kdfxg',
                username: 'i9dn5hmnqvl63oek4z3f41t0u6fd3ljj8varqyi38ppiibmhsnq5zly5nsjw',
                remoteHost: 'fvlepieygmqvce6h5rgoqmn05olknpv4ywdspsftmkcfy1cf37u6dls8fuhlnrfjc6dc01tdaqwrbab4gsu94wi9r88snksi5lzhm9j06phtyzt01z17jaxu7rf5bybmjuh8te2fhre3crk32jgxbbys1wkwdjcg',
                remotePort: 7841229701,
                directory: '1cdrgdyoyc6jnir9knw52wb2ta9mvqxmkg8hq6nfo7aou7x8q0k9v7u532qw3oh5o2smmqe68uvaer8iw10fmspu0vk5wpez3zj1i38o5v39ah4xz2t69ywcln1pjx6882033j6wia7lw4zh5c6yn0c2c95btagb1tssd4dyv5kdkbibp7p2p1l7a3p900s3mhve5w5luughqod8n2h4k4faf7mgxdipxwkvuw9spw72vzqtx8aagehvgm5bsyasjjjs31bvs9dmfdns1ylqzha7smg53iy4pwhnv71pfu461o7x83gygmftv0nwl6cm9n3lv0f529mp38yell447v4hqxqvjy895f7obc4jwroxix5gxx6o6trbxbm55zm30awe0pzawmlavzgg3eq7ahcwyaw9tizweb06zjmcd5s5hhukvhxdctjnywigbthyqqlpjf8aw3a1yzmziney00q9hgp68eileqkr4c14lqagnp0oyq1ffpp6y7fxij2ohpmigbxylrmz34r68lbtsqokpqzwfjltt7633m9t5mhxklmlcdk5sv02omv4qnvtrgpq1rc1afyfdjnxscy2msx1dlfwj2wszcdbw9ks9vwnuzxa075gh3cufv8ggwxmpfex7klfw4z6xe2pjpcp7cq7fn18v8bovp36174ydn1w85coayub9g9ziikg804aqk0y5bfirfoab275np1p8uoqk7j4vzn8vlwaes2cgc9f7ef4zrh8nevebc2li8jyr2l40k5ec0ghf4zbc19z7pvsef472r75c83rer4c1wjkku4kj2993yp6wlg37vvvgml6t486hychlive75unfz4p0w6beum7xwcvlevab6s46j21qp1nlk1ccfsd4z3ols4w8ps3jt94bxl40lkjtcawgok9d9cqcapeytt8kp3ne6u4lf7navh96bfskfntal3cnjqgxnkt11xjxkho4ny9kwplr1r672uiwe2c18czij4h02jm6wzbnpfwdmva',
                fileSchema: 'fbnvps3zr1x0ce4vkws70buxix0u98uw1wycrvev7xjzhmbh71qb9jw8p7kwmresgzufavjyuov2a75i4d2jx2rj02toqnk83qt5lnx2lwrefqv7pdtfanal07r3mn15rdunlf0zes6z2iaoywm12p7ynce7uj89qpk15g0i81fh2onpp0pbonzbixputttwic0gpk2q3y30uei7c8t2czbxsyn27s54e7jmfh05n7supzac7dxar6keeper0dc2mmj609hiq6niw5ikhw60nu8clau28pdcj9bklklt2qt2szejl4wjsu4zxuejx0j08iq2s4tyvi06p6mfwr06xfbxrd5sngvum2swx4gwvboqefpekc7dwedu3zu1ighel6qie7agwzpapvld76inivv0xcvgh7wov7f8vyta2dojvh6pedcdgt2q43nj6mf1pxxlwdcyoeejmwrjnatbfuhn01qm86bhg1zdnwimiaj3s7ydaee0z47gbyn2oane29bqe5jshmbpj8vmhrhntio8bmi5pxplw7vbvm4t0izl3e0t8pizvf3957i2tn1456b70j4sdnod5u91147gsy74nesh9k8dnoyta3agy5dvylsog485h6809midquj3fjmh3kxx6dlj8jkw2to7gnggpt3jtwqh6775ixfe70sdpvrer7ohlql6emi97pwaq5zn77va7gxn23gr7b70hkfdm80ffebbrctdfeo03kcv2c259nklvhpxpyrzemjvaufdg9z5utqwm0xont6vt1hft4ebu7g9azoqzffa39eoztqhqp8uq0vfnvl3m74hxef7tmynnbi0psmprq61hdair09eoh01b93ikypk9ske44fq5za4mr0hsjpzh4mzicbvv1zfhwu6pze1kg7eugtybw4o1oa4syn9dv6ehakm8lxmm1da69gflomfz167lnhuzhtlqisua7yt31wfp68apokaq83x06hrn2ajinkroqavr0r5elhyuk80ogb0',
                proxyHost: 'c8xkqvu68oj1ps2tyaa3wgruimcj3thi4aku3oblkq18rsesg9g27zjc21hd',
                proxyPort: 5411798219,
                destination: 'po1cvjkhdaxkelyvb6z45retz9q7eiz7557u79ljpi6ozrs6j3rd519mtt427io43bjcc6l7clsewqz712vmtaqpbldzbfu4j4aehopzanm68u9higxuj55bf1akqkgpiw3syavbihwlygoghzr5xxw18rsibrm6',
                adapterStatus: null,
                softwareComponentName: 'harx0vgm1wq3esigfp0gh78f1hwdglb4bqcf5ssy08jszp6f9ate4o0qp2vbn1abx8qvkzmd05w01mfxw2e9innd19zm3oumq2uy9h8gu6gg976vr2ekjt4xgkes6h4qj5olbchqumofxe1hxxf25keue0w7fese',
                responsibleUserAccountName: 'c2vv8gfikx4t35tl2g4i',
                lastChangeUserAccount: 're8tdgupa7jj6jjkbkp4',
                lastChangedAt: '2020-07-29 01:59:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '3y5ziodoxugnq6x8kjfimqwdssge0vqya3vdfrhh',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'y7nfu2txijiecme9uodfbk6q871hdkqv2bntuk000mmp04yls7',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '27tim9yym83srrunc5ik',
                party: 'pwowx6sbkkc4azfohczlsva1f0diuwygmn4htfc538226zpuoxpg5goamqfs5vb8bmithfjzk04qij4o5x96tefssldjh2azt0xprkzyq1q8yx3r3jg28f9z9utu4czv14pzo5bb29wpckt3fyy5c6m260mt5dc3',
                component: 'c1gwiwm264uv3ea89pp6ez5n6thmqg60r46yh8em7hj56se8b02ifwiptz9yqbu1kthko2265w446m1l9b3uyqdh85wpq0x9km9qi03eqeeuolnhg4ugr2b3mmopv1xn77cnpy8ig950sm43jwo4xiovlq9ybatg',
                name: 'p2wd91t0yvp6mhghu2fwbt8xw2r62s8l421djrm0nlhjk2adykuo47bskqq6rhzrliukufrk5mmtzmzel9csmie5a0jl0pu3e2pu4t7sn0m9botlh1nkd34cmtazpl4qtg1gk8ram3wvvnmh59birr94ao5aiqbq',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'tp1hqoe9csb08mb8fkiuhx14yzzyvpwaijfv6bllt3hrbhqayj67mkempaumdxzcgxdzb0ic3mvcawgj3h5kebk08kqjvrdeqqesqnhajn2v6y0qewxaobks23afdgssr6nahmkef81oxkyx3i2h069kzo8wz9eq',
                flowComponent: '9b0zmdbyqqpjfp98jr9bdcemwyhanbgyn0wginvzwsuxh2bgnzhijepm5sixaj70k46h9bhu5mgkyuerk5f2xkxxvvk0sryiura6yzl2rcf0pv8xabev2g5t0hmsgd21kan8b11h9o7wp2ptou50kmokjrnbl650',
                flowInterfaceName: '19vgzezt0rh3adg9fq8qvoaeqigqfq7u6zz674m0bhiitq1p0196yur81mopfpsz0hl4ebzr0v4o60e8ft94xzdb6swe39uun0yp38elr9sy1c4i8a3raknyz4py94sr8he6v895kff6izig04erpe5tuddx0cfl',
                flowInterfaceNamespace: '5c0zwj0vpl04ib6db7h9se4zyo7ah22izds5dz7km4tuphdb43hkyxj6l30hgrghiah484ghnm1itl6hf9e22bwcn299843ga1egbxz6q24kh3tsf9aaxqi1ohveww16nevoazdsxixi847ryqq43yg6e45wl1eu',
                version: '1vlf5eu1avqmi1mu7ur5',
                adapterType: '6nevywoojug7vessjifhevo15t1h5x4p8zx2ms0yl82f69285h4xbcp7tgs6',
                direction: 'RECEIVER',
                transportProtocol: 'wwuk2vn7bbgetevhy3qe1pzpfuaqis1aodr0degrvhi46nhn10a7vgo2a4dx',
                messageProtocol: 'edbx3jlxvsf2n7hhid6yxfbw3u49y4c2sz43gbcx6u5nmrzvk8h82wv53hve',
                adapterEngineName: '7dotaknck9xw9hfdkgp2acw417rq969atlx023hv6xr1hjekhi3xd89e7bdj5liqely6b74ghljou5pxpa9heur2esi0kwjjcygtte0k3getd5xs2xhvoqlfv9x1u9rjbd90jsoclrtpvtnzpg8pfz0y29paoens',
                url: 'x1milqmf4s8qio5nbsr1agozztf1e7go1pfyp9a5cpsuv2ecyysbjx6paqzdgg69u5gakw9goxmfjj7mb93if996u34del1ibpmwzdxlck7rqmdvdxzglwngoxfbyd4118wx0yohwah9r46niy2f6qz2dnqun7g15jdnwce1zfwxv2t80b9igxi8ykb5e17nptv4tfeth6afswhmrrkz58gecvzoo7csesrh4fpnzaq63812yg8syq9z1iclfzy4g5umhzlmpye84kcs4qgrhxi99uldyjii7vp9h9zphqvynrncepegfxlcph72wa7i',
                username: '0ojhud9u6akn3a40ijhhjbb23z6uvc3u7in9mw90ihs1eqzbitjz7rlb1xjo',
                remoteHost: 'c2dksy80edbn6map9kl6l31dk14ujhgl3b4z41gqre7vfmqnbv1vx1atmehnwoykp2b0jpcnywhtlfzwbt0awphspbrr1peqrras47ckjmqy48jknrw9qkfsmqchbcnphtqxz8wg292melpnccklqq094u8qkais',
                remotePort: 7674283882,
                directory: 'xq1not4rww8tqiryao33oflq062o25urlefen7hhr2poyy1uqnbbj9p5at6setb4h5fpr0fhwqhfq2jlsm3r7gm6bqx5pggxtwbcfk6ll38p0nmyt950r4rwl1sanebpvlakzaho8xw2c00dzr9949di1uudtg3hzrfsaozo6jxuf1610niruac3jav0ll4oafu4lbxjtm3qnbwxygx6loo1k8f660jc6z6jfbptskqttlls8jp8hts9cnvhywb4errg27vygv4gyyqgdhcas8n2wxa9r2wljy4ddyq2xfqvnv3uwhwlg29gptashshcah4ltqdl1ckn97e3rngro6ly2juw44xuu1vxqw9xrxb8hnqjkiv6zwo6ym3qbk8t7k2dcgcom7z7z8kgt793ncyww1xp0t6h41vflyr3reqmgvr0zgmjemxieuu3cfcf6d3jf4li0ccogcmssls67m9w3h6oqmwp4g12bkcwaaj8lbi3lxmej9th6zv6m0r9rfuuce0cnulsnixvv1ejvo9r8itd6qyp9lz0e85foz2vjidy2a1kzbwkbae2avtw4oakcsinn0l9pk50mbaobovkhae6yps7ad5n9g08dflimyubgtf5hvohaozivrxssqt0z1hatavgqwpr3p4bhguh40s4cotjsa6tkvs1dn4g6bnmk1j6lxtt8xslb0mjr1gyo2dzk2173ov3vgq9wexkprbnvbcm4f1ksoedv61h6ncv6o6pz484i2n6i9o9owphay324qgxkecteq9s3bz0zogkv346a1e5pt0wg24neo12wmhqqrnfquhwi0c1nhi6oqpvdwn6frr67exs1dknlt1ayz4dyepg9xji59gbpku0ngv9puwaorir0rirjn3jzeftlhug3xe8lg7u2mznh3trlc7dd3n7r52ydf24j9ju6z1lp12z1weqsiai90ji03s1trn9c4rdrk6lq25m6wwcxcnpamq5tlmsue0qsnrkyzls6tw84680bi9v',
                fileSchema: 't55j31a6smclmvz27ckvopfhp651v31n2nqke42bkhy4889hewrdeyq62rpmxxji2h0988q5z4z41r9g1fswhmgrn4bsd0m428zn1km6gazpisf9pwzz389ommtajsskbbgn5dznv995qp0w8k6b20xttz7zvtm7l5swn6akc694oc2trpr92boycgpa89wr7vdkcdt6zkbr6113s355hd0k25xv1672mzcgfcp5wvjd99opj5ov3352pu1cu4t09t08nbnm4p4lm20mnos41d1vy5l06scs70ospjad8qt6m8xlwbvsd939fzndvlmppg11br8i0trtihnk1fw3gbzcy1qshvk1iygh6n77oq6eif6y4en16rbmtdzshlj0y8df718nz19vx9jgwl8fmxu8nxh627wzpbnblfdpmikloraxtdq17or6wd7wrq2e1se3xyknstzg7704cz7z124ap10mqceq3i74k5hdanzikd0b3ezyrly94lajd00t1ksr9p2qaw15rlnsk7wz9zdwuvh37nkea3u3he6jgvg9hmnqx1f0phpyr9lti0qbxl9rhv2osn6ugdu31b9zkwtp77ra4af5lxnoy6u968s63nwdvzwd3a8sa3uwvbw1w9punfabi9eq2ydqt9wunmhif2gwoh2dyl6ebbbegpwya9qqmhzdbnibaf7lb4he49mhbg8s1oxteyfijoxr93kachrl7ffue6qvn3hv8m1ps34uomksa6v4636o3hdl2esor6ccei7ahi38jog4uxnh80n28ttuckih227wu5yrgq92gmkdqte0qe0brwua2xdoajydxdxuc3x711l05ytgaohtibp3xp9mrze3n23gm261j86ntwv4h16axwqwvi4q8jgal12y3xamggmw9vs6epzgl8a3b8y6t7wd227hmn0343uc2dwopa96ixv0ax2ecobs6rbjutrsomwkniqkbc1jg0z08qzsvhdxi1581t2dnklvebjtagxuvyxz',
                proxyHost: '64sv36zhi5oxmzqirhmlfbre2e0hdh0r4kzq0o2ey85n5niqsub4si73eq8h',
                proxyPort: 2003124237,
                destination: 'oqchkfol1td0rudhu079rsg1qxy4gyublk1dw6pbhi4n74us844dxtyrwwseqvg2rz92ov6i9byz3b4l84ssv9q2ibxgskwxcncrxkmtr1ccoqbhxwd26u7cq0owqmwr6wg43m598rfk7lsc61bxq4bdfddvdllu',
                
                softwareComponentName: 'k77crtj2uk0isptygilmo9owj4tj7a17zx9vvwmdib2sow2vr84b19h1x541heluuvjdx3mcc1v0sxl8x1kdit56umea3ijjmsrxzrlnog6su0twhr15zmmav74245jmcrgnomico3qd6dqor945ehg9vu4edbdq',
                responsibleUserAccountName: 'fz0ob7wwr1x40mknqs74',
                lastChangeUserAccount: 'xza4c141n6rqgmnk7yol',
                lastChangedAt: '2020-07-29 14:58:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '8oxg70n8nyqtlbn7sdg5s2k4yvrq587oelhzi',
                hash: 'en2bs64ppmrp6m8my4yfjdb9k588pdp12lzgz6x4',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'na2lknr86e90fsrio9pyr8cgsukbv06f8x8wg7sgi9739rttc1',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'd7brw5agju35soz3lvhb',
                party: 'dq563yt2hr1maaksfb1acnj206xt0zvfs5lqh3gywtco909quyug4fjwaujrlthhaxzrsose7pccpc8j7yz05b6gi4183f2fi2ebhslptol4tzor4542gyt1bd10r5j34b55pvsl6k8xzmnlqi2sdzv9gfuv86t0',
                component: 'eqryumcz43i75awlvfk4fs7wjdhks2kx09aok25upjkt6lgpabmtg4ar3t7cehvgwq00uga03pu5je4hbdnkrbms03wt7altvla0w6avz8my7x5wukfor6b8toct347e2v540a52l7bjlszy5znhcth5exh5kuza',
                name: 'x9mob1j3q1ajtsvksdnkzc3qh25he26b10czjx2p89vxyso795tnn83n8ed6aydyiiv8epndkbnbvc9vp5esrccdcnvvzxsnpeh7xjopsa2fuzjzqqb8jslsz21l6f17zp9j21c0k9a9q3q4p15of6ub4exqmfj7',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '8otozvgyua26to68hz7bdvrt2rfbrx8eznpigkli7xnu9os8jd9jwz4o4zww36o09psmn5lxjkvz178k7ybmp4jbbzg4ju73s7sovxupfi61h2hbfbwcmx6bdtekcfkzm78z8k0tp81gti7dkd1gx2vnhnb7ex5w',
                flowComponent: '2nnwbwhzptvp4w7ygjsrw6ufqmaf5powqfvuuhsjkqdfvnr8087j6sslwy5hhdeffmul6g8xa4xoyc23d7hluy1ex5269o3k69ceqxzgxdzvh7xdm6ya9y7q5980rysmrvzaxxo0w2jihkj5awieanvp00el3fau',
                flowInterfaceName: 'fgm2rg4nkhhtqc4y1aacg421znijeifoy4ozpnajfwj9wtguqmi9j44bofm7b4zln87uj291xcdstoqjcjyfl4yamlysxj5bl7l67dl4cp1bq7ku0hxpmpy62aun1ab5z26suds3bc9gkbuuyvcw7gay9k0oahlu',
                flowInterfaceNamespace: 'xt1fsmtdyb7n1lorc8c108c7dhlq9u8qsay0u9cs5ggwmv90c3bawuoj73c9r9apr4kurbxqvl3ddkpqqxdk4bq6xe7qskvr6bilue77zyml35sv1m0cektuvnwwyxeo65fau731yqaamt7dkj0bd9bysrbsmy7z',
                version: 'eqi33lenlbg3da4ujcyw',
                adapterType: 'e2bxf7iyovi2rx9oqi6f2un4chvmawthm1zb3c83qoblw7mzygww170bg2z4',
                direction: 'SENDER',
                transportProtocol: 'vssiehcr5o7kj2jndgsmd2ns3r5225mql4rjbp7c2aetzj3oexi9lmee6ukk',
                messageProtocol: 'emt8p0ome18hrl81sj6pe729inqwqv0uwz2tqsbga06j2y79zu7hkujquaoy',
                adapterEngineName: 'g6ny2t88gds69eob0a1gne6a4zjvxk0734ihfsbf6zntqrm9m1a5wv2scr8b5biqtbe2296dxubbml55g5wqq2j0otzgmhs4onj6620m1wrlsj0aujpfkxzjul9cwt04bo6uc95mij4jitji9ixq55ipzm1n6edi',
                url: '7rrkk2zt0aebk1f5zwedmjprwk7kqw8kpr443l4yr190umxqwvfqmehf1d3ao2emv2u6rmcz7efdn11zhk1loccis0dj2alg3qf0rotovqrhc80l4rkina9i9u96nacqyybxocok3dbg9oc9c9ho1bgtwoiq3p6o5cf90u4ahze9vp4tx9duihfdslhmfnyfevwz4uown4qhlw8jlzzd379f6dri46jxaonfsf7umtxvakbyx9frn0450xcx3d7j7tlrmwak4wxlqmjfpwvvv3r166r7wvvr59l7adkuh96b2w8jw3um3kfrwldla4hg',
                username: 'jfv8gqn3fffx98d7pte47c0fgtjnzo0yv2rdi38eh3r6xoie3v0mw1v6s6ln',
                remoteHost: '47ukwki2agdlq6dlimvwwmqzk92fqnsobly7cvsl8jejxu73gfepa09zsvqhytywtbntglqk2rniip0y36wubq20enuc8zk2anza3egoexx81jnkdkot4fyvvj6jri1vhnx2wxopxwrbio32jjiy5dsp3o7znaza',
                remotePort: 5390834263,
                directory: '1p9y3qcazw4uwp1abf733smits1sdiug8yeak7x6ft8ax4e6assxocceqes3th57g2roebxs8o73xts4ng3ulojmlxrnf3m3uslxu8f0wkn7jsn8wwj67m1q78j75u9812za8g2q9kz1luda0zvvdjnrezio7zt1l56ghll46k7ccm8ni1iry3mz9b2sdjnp1sbxz7k096z2t49dbw3g42tie4i4e43ikdpoxu8i0kdhrr112kpoctk8kagsu78u3rg5akm9vmwsqhzf531x5yke4ci3prfwqy7u4wuis0sn1iy4sjxv5vs7pb8khc11u4vvgrr48ryymgb23v9bajrom9h12mpv6pkpw4rt3x3u91wxlin3ug8opab6i33x3ze12xgd031efpmj3xrrwj0lrdct6cilm7u9azu3w3zk1u87uyeehlnb1k828x59qttmdkap6ixtsrn89oqtw4rc8lnnf88s83sycj9m8v642crfbtdhqt650qhocxwvtpai1rg6l4vobl7xmmjuc0znab6fi9b1bmd6eysj80erhdwgxz4cswt4s1nxy1s3anhvbeq29w6tn4oevzi2umvieso42q66xuy2awzaahpr9l9wtvsj4p923880zy5gk531ffa722qvlcejceeeyi3er6s02sknpz6q18lr9uyun3v0c1mx10aax5rtbsrch09thl6x16uosxdcfdhirqp00mewpi31khexogn9gz84jamjujrklew54l4tbjksolah65iy8mpn8zagoyh0a2kfbt4tvu526b7803992ou2ybdjgyv2vaxrhgrdnufyy95lemuf37q01thkpmmhy2x0ommzx5x3g2imhu0h2gtjqheinisaup0jnmyajo2eb2pafynkgxz0p4qb8v4cp6x1qz5vwsl96dfxz1ag44txlo61xog3t6ruuugopleqhuqxv1yn0yo0l55kh5y9v5xslzn5tjfqkhhussgerx6e3sh9rslfnl1x6pef19uu',
                fileSchema: 'zancxqj93krzzp4r2hpek18ddhin7yxa7bdc5ohu07ixzyuwcrd7d3is1uiz4t82diwpi1yu4cm9dwo730y0op709wdj1g9mu719pjl4ntayaw3oc73sr5a4ojffa0t1ml4lhbu5hpwcb0s7vg3p0vy9746boy425y8c8a8zynrldjq2qfuipe1v4buvqxxull5mtx23xjb77xz5emcf6yi8v76ob7p8mk0mrml3zd5laafj97565iatw0o14qxg8we3fawnd72bqayfplg5ghzljvz5ry3u0ne1s4rxfayags0r2yc9muy6fdaf24cr46431doetdtrarzywdg2x9nw237qzpbfwp4f3d451zuim7wtcdtsl63spkmbv2iqp6xgh4dbq5lglujnbghgoou8aksqkukh491cyrqq16blrezr8zuap9v3pkpmnyu2w5847nqit6f8nf6fykdoubou8glqq9g3qliq2yj2b5q2ci6cobo74854qhgs9gazlslwl8w5nvm6ep8wgllo3pht7fh9muirpjwq31cfcvbfx30aywcn4gdpij76p61chr09qn5luj8z188k1x5mkj5z88kbtroeb70lxdkku7ruzwfk3m540cu3qvmbuylacck8rnsdgeys7w2c3kiocqq7c15frkobtjmkl3teho7y5up7p65vblxgw0ssri0ppqdevnzxioehyb3ysq9gfdndsnxaryxps1259druablfxnbkuj8xirza318qe74ng2h60awjne15ykqdr1vgbjgvbtp23ao5gaa1hc0hk0qffnuq08k60qfpv2ivla072utxz6hwg19c3trd6snut69jj1lrggn31ugmddn07wu5dubxi71hyd98hsff9mm3446m0aax5jqf3xt9gg2nrauvfjfe8d7rf3ote1f6lvbwmwqlcuf646fi6en159owhk2wbcnmkek0i3pnh89swy4ant5vqnh37uguh4s9rkz6plcvj8i7ep6qyqsevkp9',
                proxyHost: 'mrgia6q71i5wgwwfo415ddj0ll5asske4eqplj0c0f63a21jgnt5s2ayxu2k',
                proxyPort: 8924287676,
                destination: '2246ig7hzjbh1futh9g3rzghscfl8ukrmjszjlc1isqw05bp0bs4xspss9uazeu4qdc9u4furvvkffeslp9sj98p00irk74kzpkyj6jsh2ngewdh3bn2y6ipwp42csakwkiolcpsai1mm5n1exlivij3mv407uzj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'uok4c0dzp9di00f9l602gz7ticfezwum1mlv9jhw9sgg4t4udwjpzpeef3ob08du1aw4ioeqwicba9tzrhcw7as208laq6y91663enxxsz7uij9jtjlrbiun36fecipyc6vvx0lmkttrw2yaii884be5mm2fzn3k',
                responsibleUserAccountName: 'qywr1gdtzrhazg20lz8v',
                lastChangeUserAccount: '9ibfa9o61mmthmuk3dac',
                lastChangedAt: '2020-07-29 05:22:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'hj7qvlg395snqkrblsow1k0409ozr3zqn6o8g0rhh',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'qiozp6vu7k66kslt04kmzzkhqog49337qge471ir5fmv8r1c58',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'kelyd6jdy4notjgi9r3y',
                party: 'hu2390y9rk7mn9elcdzpti6sxyb6q6peyn0fl2trtpgn55hqytwoq77gpvryiuhr25fc5c376fv46bc39qngzlqv64r1ovtg3kmryd50d3e5iznm10764ze6wlwm6y12ka9ft0egrcgxjqv0rrxvmh51aglbz6gr',
                component: 'c6yd8jypvjllhlop5kc6k06ju5m87djsbqb0wuqws7vpvfmcbcyyohg8jy1y6cbvhu9o6vvycftu6tzyk1hnu1ok94dxelyvedy4ov2easd2w9aaa4hu0psi2tx7r0zsud68y5xm898486e4k5931z8tvw41yyrt',
                name: 'lmzop5kwzd2mvo9iz2d0yo1y2j56amet96ynsate2238bk9otax0fgutr0tiru9uxuwnzgbt9oq5dyd4nvo3kpqzrj3gdk09e8371jom7tq5iqssdvjhbcjj6ock9zycnv2njrr67rp009hk0e712il1mb4edn67',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'xcb2y81u8qd66p7zndlalywfagfrtlds5h9c6dzub29b8zzc3r139t1lbn7shacla00wvst1n1ipgbidbooh8yyeevx9oor8fle2o8aenhb3jkuhotekxqq7d411xb8nao5qnnjnq724hxxq6spt3c1wi88b2n03',
                flowComponent: 'bh84sfnvxi94u6lw4rsswipv1tqiy642r09kigrroryemet5qviselhd9mklav4wz0odltft3ykb80sek9jrv8iv1chhr43vechlx2t87s1r2b73huhxy0sts1ko5oky8zrusln229304f4hm9xpw56x4qnn7mkx',
                flowInterfaceName: 'lqclwqvbjuqsy4794vptv9frm25pju47nwe39xzn275e7akrwgfazedp6ldmcjnx1qf1kj785amewirx9nn4wmawsy8648xob9oxqyj51k1fgry103wbmfqsboqppsoc8s2ypb3csobpc9o0hkr4wmy61diazw6f',
                flowInterfaceNamespace: 'zklcncaf3ph8by5x60srlprzkf11rn9vleh6z8arztrdpcsa5f3oocz3z881huk00cr6yjen5vl89tima1hst1yhcj9bxbr7q845j74l8cdcas0411dwrkrry7s2oqoyp4puz6gq09ilp9x8es2uga51xh15f509',
                version: 'oti4aweeed7u7uctksy1',
                adapterType: 'ky09b7co4nsimwklb36gvrdlphgrcl5mt4c9sz145vbkmixim1uolqnja79e',
                direction: 'SENDER',
                transportProtocol: 'kb22vz2pwir15m0jcj06rn70spgp3edleddct1z26pyhnqe1bkmx6ragj4y7',
                messageProtocol: 'r7tpmw9upmjri3a53pkbt30m7s80plei9f9faz0b2n1f2fiknaxpdt2mlbri',
                adapterEngineName: '4dfqpxqr3mf1ss5moshpwz7ru2ym7dvkdhr1zxn33gt0unsx8r4tvijxh29pib2ptwn6vik1dlubileeb9goqmq7snkoih6x4szege2t6d5cq8giprqe363ychtl5ceqo1ctmtweqvf2ojpxkm7mzyp9ck9c9hs0',
                url: 'tuyz6nz3qmrux15vs8lskin9vlfn5xutvw0ww4m1536aa5moyi8ht6hxhbanu5jxy9xeob4oywj6sr1gm06pulvba51sv5kh4ye8rdo3lcqxiuge0z9csqlvqw2a8qanz2z96ptkmv2op5x751cp2p9znphpaar65vaicvckpx1c1y3q1bdatxtjue89qwe1tsjphwi3a4x49ojd3c5oerz1c62au5po46l6rphwo3ya6bx894s3eqvikfwg60rexay5jdgs48au3er619fqe2v9ex7dfbec38q771uih7mt75p734ca7fpzf964mfbu',
                username: 'cjfc6ca2o2kjzlaycqoyykida6qrgclk2c4i08ujgrz7eajgt2ijpq5lfnis',
                remoteHost: 'uo4wy5tepvttx0jlfeg8g327kyswr970boq1rae536wh7ei4w20nrtuzsw83d1xwa4k3xqfsitxcoo8p0svgabgqaigqkx7uacykslmbj0yyt1s33fptx0pbwqh9ss94yl6lm62jy05mc2izntwny9jqbjhgcqcn',
                remotePort: 9577008221,
                directory: 'qfcbqe0gdb851e7kx8a8semhwc2cs5837klmigzq6lyvt94owey4poygb27kb21k6gbfpl1pfwuvrvmet07owiraiz6i5qulwxjldt5uk5yvkwm6lptdqdnu0miidqmdjyc26tdqp5eqccd09xnn04cq8sur8xmm1sa25n8npxhybak4dscujo6gn70rubwb0lpxox12evijcif5bxpsmnlmzbtvhjvgnnu936yt9ba8bfb7ymxo015sij8ji29x876uqyh5w51cjf4wnczwfo1ew0x0k5uekxa2i70t2fns7fv93gtjbcjo50ucbwrpovnzwaazbfhg7exbll0cogfiin4iydudmny3kndod5mk503xjuxs92hblpaxakrs2t9pqa9az2co0dvsz3uzfu4xyoo8g3kdx66ulaoy2j0is4otxmczem0mhb8kybew3rmedq37whgskoc2nm1987y7m364sgcemw1owvzk8b1qbnm4m3dqlnpbsl3q867uvaia9ez3obln123za39mcq1o1d8x5t6yb84ef7bt8mgl1v3qrn218hvecn5y6c67njmlzcdq3dawaw9d0mqcyoxe0snlhtxr4l2abvab8jre57xtxtlf9rq4f1mtv3nyz3zlrhvqw4o0ni77t2uxl722m49fboznm71wlho171cczlw92fjsjx535elvq8gr2x1gw8f26w4n95pgbmvvl8ijnhqs1ercoopljphya995f8fatbnhauvk37qtwm0d7cjzzwkhbbwm3vxsrx6l2f75izhwax869siex7l9hrpy85c3q2fmvhmucflyx3u5nydicj7rmpcsednsgthawz7ujasahacrjhbv31im9wnl9ir3ii076ujrlbthxdt0hoiar2rx241xpecni6e3cg4bsorhvw539jyuyp7bwktl1lkk2rbg6v6ht9bpvjhtjvbukgw5zjl1k1siu30zsggax6ykigediohncm5ae3mj0drf7l86lkemtt6x32jy',
                fileSchema: '08677uje4bm4kq2zizr1dxwr9ah7q6lr6ao8rd3x8ki9f8n4shsng392vwjy4vl9e9hxv0x8tcakcvifprbqwpczxwvy5au9i6bi0qtupes0j708cyd1d96zm8ycm66c8hjbp6uyceo2hh1dsa5dwwkazpsujnxmg34x8unlwv0xnu3qlksn049q5bnaravss9ts9tt0kq5yk35xm9r7j8i61jyex4cofuvkymha6n1q6rda52kkjb1h6zlo65cihizmvby075xq6xabeetj2494qyo86h44o008lfzb5x9pqxfz5bljcx245c1taewozptdluyez301b541thyydmar10ydn70gu567du00xmobd1ea3cm6nd0zk5i5tfunhxvlw1wthrihx2qz5grbu8jq7dz0v53vod2rwsu3u49gwpg08rnny3r6eemzhowycuxvc0pvdf4ej4oi663js24s1yc7dz5x21sagqvfomamtcl4xydf4m0fnop04bw8qnd5j7vlb9bgjrrhtm32u58sykj868peectx68lmqb1ru07bcto3jno2wx5p5fep23o3kofv95gwfeet3fvdxz6byd364wkpyx98qqpn3vxdufszmkm0vpkmp321pu4a5n5ngxnz25upncg5b4yp3d7pwyjb8tle72qarswidlepzamj2jd0ww90vbcawwr03ayrfhjvejdtqp79tdnjh46czas48gdfjtckqqmq9q1khzw6mozp1hij2ig3ogktrlpyeozeqh8px3oha8kqdy0qd6f2ao8kfbqsj8yfhg5nm5kuz3xv22okpkk9g2y4gbn44r6q2jq5bknoce01o5qpjj7kp7w58fcrh9opg4fr43kcsv5ed25ddb7s7xm4jkp7cf2nvz8876qt64z8evyrxwdmbozdzpgjyct77dt3nb9jevrtfv7jfvdb64ohtqoxdwknozptnt9g919avej5w6jb7p902k0b3ekgkketpzm0h2sdioilutwdfivz',
                proxyHost: 'korlatiqbuupng8zz7cjw0t5bxn8omw776czw931ef1n27perbs0zfhqj70o',
                proxyPort: 5392234419,
                destination: 'p0tlczupi15s9tsdt2k2o5eeazpalrtx6tk4g6zv2krb16tlgxf1v0a6p8oegfqt6fdg9b3h6kgdr95vibu2tk2ly7tfoiblz4w9enpuf02tgycwmygki7ptdeqq1zszvr990o9iuwzvozmc7eu5sx455iqhv7bw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'add14j9kg54om4d9v64p3i8h8ihe5rspxvc29i8cllj66l3mhuwm590rksqaom4v8otufruekj6xb1co069fugxb74wjm7sqjzgiuv6v1flhoqr0j10bl43vnybc6vmlyl1fhgdhxo7ek9bl4io364oxg64ogreu',
                responsibleUserAccountName: 'a354lwct2v1ieozsvenc',
                lastChangeUserAccount: 'b5zfrkyngqfhobs1va8h',
                lastChangedAt: '2020-07-29 10:35:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '69vbhltzy4una82w6kuw94w6fzmpxojbm30ldfh2',
                tenantId: 'kvv49utx50rnlm8qextf0sv10kd1c8abxxlw9',
                tenantCode: '6t0vsfn4c95h5jlh7af0tmadfv06bmvk0bwwv8tjwu0za35nvz',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'qyu5eup3yr0n4k3n34y3',
                party: 'cau66r6cvaup2ag9lzufs6tbq0awz9hvlhk188hcovfptcs15khgdhtnzb1il10nm588rorvjkg8axu5xfon3wsv6s5yv2nyhb0lz4r71i8xbryo7rbqua5zyhrkkrm8ayu4prvyizp10brchu3rh0nger2vwdsb',
                component: '86frj8ifzkbcvz3pqcnom0gp8ayojxpikp0a8kn2o0t82xumolnwngha7p8aq5jdimphn4nk174qskque79zz96457z9t6z26onnsnw307e12moewz1jwgivt7em3eggof66icfwzkxdyax1gt6l9usaq5drxiz1',
                name: 's7ejoyms1fchd4b44h2z30vein5r5bo8qslonw9pm739m6z1pf0h18hy8jcoswlx36t40eyj1gks6518b0hsdgixzcqnue8y3kituksy98vm8js4l2rrqrlbdt0ehh3wl152qia5s4fxkdsw38wivuxqc4tktr5x',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '3qtdwlu7y6dy8bxve0vlvn87nv8enxk3lokol16s07xnkllbrj0hs6idrb8yz3fltzmj7a4wagh7fcpgw7exi7e72sjnmvhxu6w11j9j8yscmosz3501cb261hf2jao5kuiddv78nroy4p5awip19cw7vagdig18',
                flowComponent: 'iiwioz7lmx79nxpf0cxkuy7efplqdm35hk6gauzdr2qao2ex2c4af5aw836614veanrzjsr71v3t4qazlhidhxf8xy0dc6jc6qsdiq3ous0yr0lhxsk2mmsff58pu05olap63qwbehycqlzq09hplt1l27ajg7tk',
                flowInterfaceName: '5sosxp0th8jk5lvps38uqlmhyqmyvdczwe984d3cn0e1div6056synqvkqntenvdz5u8c5awy4l39ti5tarx3u2tyajgsr2sn2tj77qnw7de13t1l4ab27eym1xqtpaw39vyc24q45rwtdysxpor8t4m678f3tn3',
                flowInterfaceNamespace: 'nc2cbns1j6xzy3ijci8m4dkkedwt4w2hid443cj8t39usp6izxpxdhszjtcvo43fwdy5d0z6uwdeixaavc8inss81cae1qf2rqeq2j6cjt8aicuijxvyubq1728mt2p7y7trsirymvsfzza6uqiy8s1tdsrl0qo0',
                version: 'm1yqeye11gehx8q8fd4m',
                adapterType: 'm070ffffscnxwu6xql0en7jmh7cj8awl200ana2l1uvk4nzjjc3rdmn52s0f',
                direction: 'RECEIVER',
                transportProtocol: 'bs36iit8elbtgng7cz347ohx5tikwnm5hi9vyhl99y6btfv38f7ktgy3n6qr',
                messageProtocol: 'u2y4hq4z99yl3jfx35byh87rqf736e3hxfh2my8s9sjybvs7tq8hqqqc13up',
                adapterEngineName: 'fs0qe4jkb99khoshl491owt2xr698ly1wxkqap8ygqdu1ve710v1aurz8qhdqllw3pk60r4a3n0d0wb33o8967sypibm3x1odqlxyq619pi6knt1jsdz5vzrx4x6liu7tnh5a36sf624iki98cu5r2egd5d9f5hx',
                url: '3u8dgd470wjk9if3trd451ycw8kxv7lmwzzkhrplktq1n7pk59tb2hmx2mkwjlik6e792wbz33b0k8ehc4xezgypnisoiwmly2h7utsr86x60ietwfef6460pltoakux43v0ud4439ajfe4pafsc99h9v5imf6equy3jfl58d72iok3y7t6osm510sidedq2x7wh6p5e2zyfrdq5ob4hg7hewyx4m3cigrpb40sh3qzkhsiayctx7a4hw2iuav1cah10vxkkca5x38kcnl57v3m66h2mimb61yiicmhdwo87e205881yli2w4jjbpr67',
                username: 'ot6kg6x43oh2y4g96tqcp8ovfkqine1i4h7xykm1oskrn87f6l4d4zk86dp4',
                remoteHost: 'k1klbgj0ngvbnudbna74z4n96rvlc471iehea1t9k8ufml4puf2b5ach6l31bo8r2hyilvclns5rh4c99f7h9mmgxanqfhehcqczs0r8e44qpvjgjhwhuqda6dbwmezyox3sm3p9ldsk521di77gxqhzreh6lcmn',
                remotePort: 6433078599,
                directory: 'l9ctbkqggir5eqf5y0ou7rrubhjo1ejtv3o2wfim4rogymzhtgexbk9h3bc6icagbu9dv6lerhp6r25h07iws2h1gxcqhv8iciu4e2p25r5xj6e3f4wtvqsfxhv7r9e4exmzczb4t5brs6h93v8taelzupnhspdunzkjzd5ed6wjd1mtdkgdkcnedw3zgl1zmftrf0e5qasr2izsolncap6z2zyz5ai82slehi060m1kk9jn3hpc676arlgl7si5dcv4mgg7uws772d0k278o74c5s73n1rm7ef4ieh8i9tchpy0njrt6k6jgcoj5b6mvcn1zbcq6wvgyp1cerfzjdvc7d8my60owiwhhv7j00a1oe2gv8ml57k1j8qj0zroh44frqgce6yyb69nnll5zd95hobdglkhlblesamkn0vlp6ls3dvx7xnbfz5jz74wklfd53ede2a7y6pseggbmjkfx3t4xqq1b49yq5jc3loq2wwsquvw9wxdp1vwwvs8d8j9c6i49iai1rp29x32523sg6klrdtyj2b32i3i35e79j1iv4utvd95d6mnnrtgnto71fvsklnl5s33e2ha97ynepe158p0dw9v7k6taqr81fkd9x92gh43dq1qjmbxvp5982usiboklykc941d58fqvyf2jo13q28rrh9smv5xj1l9ud8itsz6257ktxw0wzz41ktipyvxhqvtfjnf855cew66oubfd09rad29ztla3j9iinahad4lyhwaf7eildkjjrl4bs9c1fzd4td8e3dicrkznfpg7m2zrb18h3lcpevsbzbdd3kwzznfx05ttdbmqzl0bm3i6cln4y6cf3to4kauwal3oubfebd46bmoi51ga0bc6jrkf4ualdsmlro9a2lembhvp5dawoppm18gjuutn6mrrt4rf1w96aqlh4qe43dhw3o6h4aplegz5jzhaabtkkkcy5t43td7weqqtkzqvxrnkhfyos1ljnvjbjfpk23g0sbs2y9oiyod',
                fileSchema: 'cdy6d1kqnb0s1f5aq2pxuvvf7e1zinpog5d194l5td30cj5ckzjmkth7f3vrl8q7w7s0r0yx0fdnqtccd10z44i32h42a8b0ehuzlllytt2m5828z9c0az3bpz4zmu9s5s5u4srj34nrj8q7orar4df0yhhr0z0btykgompq5fpg2r66aokst6ma8yjdn7uin1e34j6g01oq9eftcwrf9mgwsa1io6r4mhjdprpt62jqt1f7gjnqkw6jd9hrvylyufazz6v88aj1pc4dc3f20ueflpu1n4ha833iol1ituejxc1h8h7jslej1c57fem7zm22z92ajb7180l858hzrdlm5atakymrxmd4qyk8h1pw6yygh52pdjxm5qd0ot51f2i2to10rl2ysis4b00mk6g3iit8ipkxpvypsb7ppjuofe5zlabtbsorkgcd9ob9z7clbw4j7u2zjgmah505ssj3o1j3b6rvmkzmhbph01eyctf8o00a8bniakzx0kgonkgu7730fb1i8tlowp5fzg5g4s9k36l3rizfv98plqvqne5binbc8pn0tltfikm31rbak99kesk3a762x6srj3bnrz25l7dedlwzmszmlgjeebpm3g04lee433npatkxacann4ff6howmyul45l1d1awnky4edztz6bb8o8grg9bxq01jiruz2xp4aqn1knqwj3ta8521uqhtwmzns5m5dgceassrkgolqoj7g4j0qmwo1wo5530gpwckno6rsq4n3b5ryt2q0m1w9bfvxh33w1j467kw048twic94cfbm4cu8rdoxmthlk2yixmkr8k10ll2pqapjo2v8mhogs6sg6xpapi1rizk04xjogfow0bqvuz6yx9bk5fem0mj7gxek4uk7qsxrkp3n2wn1k0suql2i1urk2lul3gz7ffsnnvv2d2y1bef5fq1ib5poc9bzxiwszzz66qdh7n9l3id8rc8ard07p3dfyr260rzpuhv4026oy4gryuma9mmrmb',
                proxyHost: 'k4ojdfyp9exkvryqta8a2takjots11xeugyi16ipfjx8u48gj84gmweddfuj',
                proxyPort: 6066910891,
                destination: 'td1ruai3krlhcg8ve78myrlrj5tiyulu5tzyapqqhhhenjpkrqw0yojrcvnxyp41aowbsk2p43guej5lrphl5rq6wwqqptcv3e57fy4ik4b1k568pbimap3pmau8msx3g0b83g3xcotfcglvghiqmh3epzjolcw2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'se7ozewlbm4eb8n1u3c969qenl9sgpfnflzzt396fr47oo5ut46bp0wwkvj65dkmnx5q6uotz7j6iv72dhncrfxqlrqhhxkr9tyjwc36vkfv2nw4u3e96ehia5cfd42y4csa24h5bpxo5mvx2qc976uq0c7y9a8c',
                responsibleUserAccountName: '6fkjgqkob0784wm9ndln',
                lastChangeUserAccount: 'xlx9fudc6uruj7nqk9az',
                lastChangedAt: '2020-07-29 08:29:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '1t03hl09sf82j3ju2gnz76p5mxdlumilo8a7smel',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'p0o0zi1mo1z59egyi1d0yddnuis13j1st0eej1tsiy5drdpdjn',
                systemId: 'istg56y2xfrjbiexuneifce543lu5nqhpi6hy',
                systemName: '57pemczx50uq93k4sb4b',
                party: '5ir0gwdc96bf1v694don648usl60a41dxvfwjnnjs7d13stb6mvsaj8c1k79bxnf2w6ixam4lfrirvj2my4lwsywusudl9e5tsgcsmqh0dqopkouvpnihruizwgylpxf9kmrewur6grkkt950l71adh2pj15tuvx',
                component: '8q2wepwseujnq41qd5wl9fm3wa9lhp3e7cvyxy6sm0hujubt7y6ehs2su7f286152kulal3qavfsuz47yv39lghqpskucpr2bdqvw3eigm5mzsxzddftp7mwpuqsafym961ijros4ch2an37vn7eehcz5f17vp2t',
                name: 'bywmhyauetn3e8cbakgfkmko4grm7knz1ryh59npnp0zsvhcv0c7pf87aff3srr4yeym8deekd1buig33uycqnladdu372vi4418fvplt12l8ifg36m22a44qe2rvur7htw7ts3rz9o1uaykofvxg2dv8ckt6t7w',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'y1xdz509slezv5o80pu3dbjfsefthrcx78jpoevtyqsgpsb2epf1tdi8tb9k5odzlsaryd4efmk2ak7a2nwkmbdw9nesib1kzlo8um9e555soqcor7rsueruzx240dw80ypqnkua2q865nmqqvkbjp55inx1qqyv',
                flowComponent: '9bwo63q8s0vp6sogbz9g0g16fl7wne1p8u2nsu74hk932uz3ua4xj766a6b9498stxd9ky5qj2apj5c1gd79fdqwa1hli81s3s282zy5nu4xzqigkjnlm6f3kjgsqn5ydaloichzjtkgf1f1b5mgnuvqcdr0jpb5',
                flowInterfaceName: '9c7ustp7ga6df42smdq11j0mlf5ftehk6ulpmc766b8nwf3zxs17d3a7s3ckm67ymqvbvs14wh1zbrm26eahkoihsaa937rty6k8lyhm72vm0so5rtsjpxn56aa0f0nn0p4eyak6ot8qkhclx7y5bfoq4k6extv6',
                flowInterfaceNamespace: '65y316il0tyhrp6tjwg42qf2fewcjj2tcs48qg2sgsrsrqbh9mnrabgc93it23i33wo18fjp58zz9jzi7yn5eplhwh6cassscflnkx984mm838jr4zregjvyeyzi5skjo30a5yas0hrbkyvb2ty45lpqg1ddradj',
                version: 'p4q5moa6q2l5jafpxm0m',
                adapterType: '2xbn67gj47lkyvi13a7mb8eo4gbz76kqlcsknhqr6he9byvhccnzgor0s0z6',
                direction: 'SENDER',
                transportProtocol: '5xuqspsbl423mw8iruao9x268hlg2iuhcnygdpx5h37ugmfvf7gy5usumyoy',
                messageProtocol: 'cuyp0j2u66zbbve92f5qipuyv4u5b3buh8bfdc3kocksy7v110tp8c7gztge',
                adapterEngineName: 'd2c1yd0ludbyikulwjwxah1lhdhkr6itll34lqzg22q1ov5n5a7bir733t6y00f78nghky3fsh4b8ljqlsyrg2lewauu49njrzbsfbrpespl56tmnnzw5bfxs2uwh2klp8m47dd2cntux7cf3ebf7feaapszt3v6',
                url: 'kod78abo9up1sly63fow1j1yizd39aluccqu8q0cpib7j4bs64laqqt214ei2zodlzre23wx64hd71o8zdpfvb0gjiy7n01y5xkm4sgv3vm3h1u2ncqonuvenh7q2hdyho7dmzv96vg7murnwye10xbxoadhvcqw9mio5oh8eyaru7944sxbvou3ngn1f6kv2tz7m4mig7h1t0jgzbj97ywh7twcg60n6040gekbv0xomazpnxvbrjslka1rrdlnam093z68icp6oq6o1emiringrbn4lx41g4nyp5ibez4eimrhciwqfh50jle4hgxs',
                username: 'tl0nmwaid4jz33rnyup66cosx5pf91saoalfpxu89yvlfl2067m3fcqrknab',
                remoteHost: 's3gw9t3ej5fuf986nmwimo1qz83ppyvr4c6verjr2bwd1m2z50s8z04nxbwcd5jm0awtq5n3fndhxrh6mmnqm0vnsdg973nv6m1f6n3jvi8bkmze7q98p6ymk2psikqoqunyljd8i61ftpj9d2nn8kz9h332ybm7',
                remotePort: 1205618371,
                directory: 'b9wbo79q8ssxpfbg9831s8hddgzyl666zn5ystaxhitb94ob1hpji3ro87i2nc57atapkettrzlkao6e5v5dbga6ngcfcqrbylrfht1c9saljd41zhm7es5md78rxvgcyzttbhqkm3r67ggdrp2euarup3s5mrg8h53jg1rp8dhter36hpkizuy179vhyl7ef086v6qso3fa0dcnjd5qf265b3hv4t374aiej4javubg1jv34oad7jz7hedt86luk64q0lcvlxswr3dggz35303h9fqpmt7r11w2l6yufee4wne9vfb7bevt81nvm1gqxtmchs2abrkgmznczqhpeigh6t0mjjz7lftb7qe4w5tvu31w1xhzb7swodbgz4t1pt4vpjj524wrygy8kindqiw06hos34sqpwk5v7unh4ro5vynzikhlpep5uzzkli2hy6t0v03klihwh1ws6hq2xih3gv3zyla8g2g25mw8dzhrloekdos918f4bn3ddlwjfar028tbv4w7c992fitsjyxbt3oyrbtc3v99ht7g2twq1gdxnurht3skoly3j3qmrxhh0h41elxb8hlv8shlgyffo54w81bchuju4tpw5d4g2qn78mu5nf36wz1adghqspelprz2frqfwvidpiel8njzgvxvkyaeoddd37ons6sscuowr57zz31uddogvtfye1s7gts48q5tx9brvs3orevwm26l17u1fekopg6yh41uvvw3pds4jyu794ky1zt69ikq1ex47e6u4af9dpsj3uws6wws1ta6k0eucya59zr2oak3z43oydvgctgqg1yt80cuxy4c4qjkagj1g2p6s2965kry5cdhayz50f9cie70lk1nxunle5cioujcd6pr4putai8cgc72lsqg4lge9euwjbofglax1zpv7qd8dlrlc3hx0n7i7nlmczjhz8cekcswi080c6jy97m3jah52e31pirpf8cmydokqcm3pwqdmviejxyd8l87w4uipl1',
                fileSchema: 'xh3vcq6kbivztxhocilyecukw6eexc3mv1x4ybbpahe7d3oginyv01b9v0oqd3a9zb32a21vpb56eul36dxzuov0cjagl68x7zeh7bdybz9wf8kd9jd5qdb30fmcuk7562gws1x3zl96r5ixkrslkybtkhc5mnrvlhaniop0cpw2iou3ej028j2m1at70u0wgtuxcxe2uzqxnkd3eb4oqfrb7tan39ia5hspdaqmigr37h7lo090qua4myx6cdev5s9xwkx3rcpmomrfhvs2zqcemamtvlklujrgcnjjqrn6vwdcbj4a5042u4o5wri5qi5gqtyo7fwfwagurrgxgw9gmsp4n0rar6kvp0185kh9ggk4d14a0jvop51bply5lb6dm1rhvni9ool3kzfs5outui83ax3lesodjrs08xtzwvyz6fmnhefzwkhzmhc0sawaxdsbxupcngd45ulq2vk6omuefvyd0vsws3x8tdnpx5gbx96juxajoijtatdfjzjhb6d1c49uamr7za5num63r69heqv1gv9izpnubw8iie1oedwss7gqj18l6z6d6zt7j2dq9fn2gnfi009slzlc75mq4sc0a2ui39big78g37g8uukgj00edzddxwg9u1yj51dios0ndwitkh90lulc3q9a3dhm9dcgt5ew0xaodfnmfft85tpjn4wa23jh6n35i226q62w7wyycwso4hiyfub8cj0g1ex56544a9nvjazxr3520x5ygjypfo9r1nb6foihxs9qk72sytis3pnn4tiisw01q2xoylt9x8hp1lre5c1794xx4rrl3acosusp0mtuneagv3y0kh5qv9qulzgzk4ht3t6v8zfggelm5uz8ngyyyj8m63s1773ohwdb15mn26lz0bqhz66lwcd529vspsldpugk02p98e6ooa4t8ke1c6kobuyib4pnq4cd96oy0oxc8i305bzcbtkhvjnuorjfnk68gx67yq94g1dzpfeikfspj6rqla0x',
                proxyHost: 'tkwcp8mzaz2n1hwnd4noh5pbrqvi7u9zvfpkwo3gtlywalx46y7j6pzn7m10',
                proxyPort: 7209660965,
                destination: 'xhrluiuekdi1r4fcnbaiftd7b875fcb5vj6h15i6qp25g0cgktmu9p8y2zfq7on60ychwjh89ntwczo868g3is85gu4fej1dme6icrags7mnbh1rx1q8h1pa9hy13aj41bn5ofutypr19iwxfcpty8k4giou7u3i',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'l8zaaoya4ujt6hpk2jazun1781cz4cg9lmuyk60lb81pmbptq0f9ee71ugz5o4kdupbgxn5olek10cx6clvrr7dmugl1mw0c8h5g5xc0p8jsol9ed0kgb5mn9tdd4fgv1a59o10o2lntw0keomog5uac0n6p4z30',
                responsibleUserAccountName: '485sia55q6l600jpzyhu',
                lastChangeUserAccount: 'nbvk9klskfpay448dbi9',
                lastChangedAt: '2020-07-28 23:07:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'w8blfmh1x0pb5oa621uohijd3t5bjq9cc54y9xzt',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'qu14evyxdwqp7pug68n9t8yiqwypb0kfq1xdkzwiquz518mj03',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '7yityt9ujagdsj6t67bg',
                party: 'q2vdzyqln1i68bet97yy46g1ikndl1v9msg2m352hiyny1pcowogo8ob2e7h92r1o1as1iz9u2yjn0ab5qz4ikdbxloif7nqfwsagwgelc8cnrff4t0qp2r845mgborw5u33fwmviwzv0hhhesxc4wfo4owzexts',
                component: 'l1y2mzn4ig7cwnpcsv47p2m93g12j3623gfuurnzfi5ymrfu79ggwnwsxe6wfhbwvxezxrfc3tfk4qkadnf2l6bbrn2u1vt2q6hcfq7bi7fkln4wnpf6da73idih2ytc0lglzehpwov3pc2b8rlkh45rotxs1bz3',
                name: 'xybcfqvenptdv9v9ymjfzgbhwinziz3xw2rkwkgmsavywxtihquctlqtvj0x0e4b3v0wtetrhokmgstpv9l385v8x28lqfazi88agesaoetzph98tui7rej09qrio6ssidqrynnt3i732g19uwp3x3vnnzroqy91',
                flowId: '6ypsokmduz7jbchvm2s8uvboynxhrv2qlyv7e',
                flowParty: '7mkai0wo1cr9sxqoqb3qplm4xqq46ed9hbqxl2tbm6fzrwunwpacp1c9bv6l9eivwjm629f4ia0z16uez9txp1ycw24nqfm2c1oz4c02rmoyty6jo31h2qgs7gup7bdbxul9qxsjrp1oazbsq0ykyqqh8n1f3zvj',
                flowComponent: 'lrpv2ma4ha02804iezaox3etnbt3h41apevch6szt99trrszw6if6ymooie1yivmwb4h8ecl83hkv3cyizvzhbduaixrl8l39b26npxdyb91iw4zavae9bhz6xq8264ha4oi6wxsw6c5a7acugzx7sbp2mloj3dz',
                flowInterfaceName: 'iwf0tebqvyfb6z6ro97tnfysoeh4rwxtf4pqz4itrxryyzzvhlbdzaaw9gkr8kk5hbwnbx56hdhdlm7wt57zty77p3w3fsv1a51edy5fqr9wogxjbs2v50h6dun7cglo0epei1r71dvylqq49gh70qn0nr7zadm5',
                flowInterfaceNamespace: 't77i2ikyr0tortyxtdldj4jhryt3moevyp7p7nkvsvne96azp6dt0gmruxtuqsqg89c494bt7m3ntvjpwbxdtvbtqxjv89gna9hszh2tk9iykh5rb0fhuof0dhb2ryzbl7oj3rhw904o5t4ctqgxa6j2nlsvrc3b',
                version: 'hoq7624nk7qh1a2uqtex',
                adapterType: 'scn80vheh01tztn3e2ajr9h4adrewxlqdcdue3l37mk31panic6wuza30k3q',
                direction: 'SENDER',
                transportProtocol: '9dgyqh9pwoo0ugzb057m84t4awhj26crupg2hdbvyqmvckbfni9184g4xtv8',
                messageProtocol: 's8nqijkyag558j7n4pdiazxatsoiw44eugd6ndnlplygx1lymeu0bvcdxkw5',
                adapterEngineName: 'awx29bty8ph1tf7iaog46h41ngeiaat9k53b4bl2dm6agnkiv3sq7pb47fcb9nhqmhj74g8hd0cn5x977220jup8rjswux99mcyaq1iuj1qkwvqxciwu9ei36us12s8hh7af1d24bb2uuzh5j5tvcijxxg3zh51v',
                url: 'yys3fg7hno97qturq528d31u6c011fqerhsg1o0vfmualp6c38owphflfg4llf9zwrxip0dgxqtadf8u0mwxv1pysg026ovj2rh22hbbhevzzoxsu6rlrkl76ge0hxqmiopnpyuwwchi91bumof227yolc4ae48303lbt1q107x2gp2yaqkqs1wrrjb81j3tu79cfuwoluqm0xecjaov4kdw8odx2a3ea6xjdzbima5j0u88f5losyeicthhfb56fqjewv34flv70qg1a6uqf6ilkbunfn0hnyprcwx45hbd9maaxd02hgi0nq2qoyds',
                username: 'f9l6xsu9u6btis9whiyiupv7w6mvfxlgpjbqy845vgsqr4swj3fl6ai3rtc2',
                remoteHost: '7gk2t14ol5mrcnspn4iegzrlbokik2415oleiqdlwlx0qwn7t57au6bm4myrnna7icwihl59dzfd47554tzmum9fm2xo65z4817jp4s6mqmnog84njs1d7z7aa9bed4agsm4dvbdo4frbu6povk1zz602yg9bim5',
                remotePort: 8293096529,
                directory: 'pj583tzf0eqe9nafqccy4ccuuwtbidynjhnf7uupmdhp3knu7mvj1nu6etuseetfkd6hz8t8jya045jcdke7jwh224s8hdl3h02d1odich4dy29br0oqt9zx2c8iu6zelof3cql74qkclygrifhkszfiwiwpj7z90386n6wxyo43shhvhciyajxt3g7bqsh29xo581ize72sc10o9ijp4optjl2ziktdtbmbuya8jycqw68sf6fz4mg560lejkri9fm4rfvbt4thtzig18jijmqwyfann615jn2dibqr5dbti0ehyjpim44vesa30rxhq0svr8os5zwkeowpb73dcq81th1z99z1gwwuaaj32cho1ch63r3aym97unt9u4sfelsxtk5oq740d61serzvyb7nes2geqv9g1j5mazu9owhyr9rmahrtjqmr03a6ifeoysyxpaq18t0ntdcm8ep9k8jvnms3y56qyei6bko7yoe6w7rdfgmfzel7razg8zhvhzomnq4j4za5eafoemiqotoq8iwi8gkyzs66pkb5hir32j315r111af8cxy8cykgqvv5apz8a4s0hz7i3susqszctqe69642sgcbzs47a0kxbzf070uq371tlh1fqeb4bitlk5i81v8fldbxjbiifppzrvcd9twfvs8uyyqs007dfkuunpceftsab5s6ot78lq584yogbkv17aearhm95o3na6cc6xhvctqnttqgdg8x1egzhcmcsnkaasvthxsaro9h92lfy8vpnmuluvofj4edqm6ps13k3loxyd24yy72shu236w7aemgc8ouv1bkfi863qc728eih079tzlw1qy2t096q1olb5048p7q9r7qkmucdjbgotui2km87tf43ah0yurvx8rj0vwofgmpyw11x7wosfbd6e3vnhprqkorisvpsol9moa88rruk18ie4sfd12906qyrkcfmkd3zcfrm8tlg65ccuowmr3bntnarnvwp7ulkodby9bb6lv',
                fileSchema: 'bgo684lhruxzszmgdjoef30ves88kqu7d9d0abbl7lp9574iba8pcw02nsn38lv11f6k0wy4c856gnk1cx4j4s8ayqm5ktuyw0gfdc9wjrna4r7t31517jilg3l6ahciw8kco9qwu65xutni0otnzdapuid7ruq4psalswy21ymu8c8howwv34kt3q2vgx5bq4xxkke15rxhvat8c1bbb34w120berhai9z4bb847qme8cp5m20wjeihqx4dwylh3w2tw8q8oov63mmn86pm0rp9mchn7ee5co29gnmi7mzgqh4sxfjm8xmbvs0d3d7tpoqy6ozue18uwy8u80n974l6uszaloenrb9otdy9tjji55kwbs6dvx8hm7h1ksbvn64ijywgmr87h8b8djqtng7bxxyydlob573tzaojuoeqjklle3m0sesd6feghb2x4iioi3892wl1e05d5e9u0bxhdxz3ealwx7k5uyhnnjzbzku4hoiup0w7xpq56va2pbxfgfrc4el0e2nczdk38jupfyi6m6utq8beejuj56czsff806liahylyl3cuunithhpgegxu4few91dlf6kh4ztullqd5ui3qzg2g2hk83zpmcink7i488ipx8dvao6pmfmpxl9zvs71gkhbtbwdgvyypso9tr4es9f4souccb5md3pgflbebf41mf8hez8tt34yz0wh10ln43jx66yadkmmu468mpltoneo0cjiedjql01791woptub827t38lid5vjgo2684aovt1j15y5stqeyv0j7nworc8g2h6t2kxlywem8wk5459thb4klksvbx3uoi3qb27vcqbjp1o4toumnkdwgqq273c0ch6fcjfa6xf1altt8l11an1yvjt60p6zwwwm1hwgudt7qxirr391ciu3iyat3v0fvc1x42k4pfsk69bfu4p2434if7o3j1xtw6m94cn7q7qntaxl9iy1ujg9jhr5zdv76zxuvitbi2vuk7aawwfdf7zb7v0',
                proxyHost: '3og7z0roce4xgkank2sdkgxd8z17vxrvyqnpta7202xqcos4u30gx690ujfe',
                proxyPort: 4418128753,
                destination: 'ylr72am0u5q8ysvb9lb3kbxs3ohikqe5teo11n1a6ll0gdv8s4o5zcqmjanq1lrj9d4n8wwg2asquxrqkpuwfmewfw2v4w9rir73wyroy0dymhpmpew8wjxk0rytz3ajy3eljthpcx4exbjbcgj0gf05aasiqquc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1sorwc5wf3r3b3oejhwvco11lyrq62xt2ec6txdy1g4bmzogynevubzw5w65x4vwft7t8euhrxdqde5rjmc7yoc34i8esl2oubsycv6ulwspy6rx8z8v7upyf3ws9rm3dn0tdmz06xr5i9u0tat9kdnxgpgf3w84',
                responsibleUserAccountName: '5k0l2mz95y6hzqs630le',
                lastChangeUserAccount: 'mgkm63c7v6z17dyw36lv',
                lastChangedAt: '2020-07-29 08:19:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'i1tyv87cay0liuawkvr7459ie2gvg8etc7zc83bs',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'gvmsofeyc23ymtl8fte2azpegihr0j46axlphn0sedhrgay79n6',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'yszl0ms2ec98gvoq3gct',
                party: 'c57nq9z2bd8n5mbi32obg2g8e5dy022qur70r99m44ouxd7q7230p21oclhc2ywgsftbejfpc8t4gaj5p08aja3rhnwm9dy7cqensyln6y444o5y9radtvxuxjsq8c34444g6sc1o0xjvf501lammvjj2srypnif',
                component: 'vee5temedvvni6db5y1ehbrxc1esslkp2tgd39yqgtpaickyd46ayguro2f12gchu6m6onv3dwvhqsrbrpkofnmgrpbtq153ni5656iu5fqnvv2lzxakt7i1auj0mlry927tbqbn2f1oh9y37rzjbrqr8iits3kx',
                name: '2w639owb958lbl6mpctmeiop2kdioxp02earbxm81uqcc2384mec1a8e2mojz1kdtij1zdca2ckmy0ljndut0ud1z8draxwdbn2w3rhquaur6up0je4yw9ftp9xgjuylmpohgbv8sooelvt8k5j06nr8bcb1cn31',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'nuwqe5n4hehntyiodu4wv3awi6jw6f1pzu2m7q8ooy6zsmx1oiaxvvygg2p6hl73dm35wwxp36iog7sz7qudel06yuuyg69c3idvjs2c3bbif2k175as7c6dff5vtebbfeccrh1ad3kqtoaigceb4j29eccvumbk',
                flowComponent: 'qv3cymg833esqz70ttsuh9s5ni6s2e3asf3ed5bhm5g4hzsrhixc2r6wc020qzmw66mxgjspc13yg2ul8lm110m9am6c80zjs0tr4apdyesdr8r72269pp0qkihbkc877ry64w1lwkn1azawwb7q39xvk7pwwudp',
                flowInterfaceName: '3qjs4a4ld7oxer8qskmf4x0a7e2hw5so9ld15g9th56z418s7900jcc2o2yeiul88fbgojdr5ld8za02hr0dswwl7633vk9lioy531uzyd7su578ripbimmd6qhkllpxw1u0670qx1oh8iqb8lo773j4z221m0hw',
                flowInterfaceNamespace: 'nf2vltx586suqtd24xj6yeamlum7qg4352nyvhn63acr59gblg6wp3oazxlmn5c644llvmy4l7c4ke6i52g0jn607tcepfjoa8uo2m2ja4aemw43nhnvgbmg8m6g0wm5xl91pwnjgcu1c1ek81wpq0r46cesx4a4',
                version: '33jmzadznmkac920x5iy',
                adapterType: 'im5vekqkxo1zju38a130kexqsdx4qk4t2vgdizlw1x0wdn4i6m05b69qz499',
                direction: 'RECEIVER',
                transportProtocol: 'mmmqpbyi6y1uxmomqrpx2jmxh1p3iovsuzx4u62bohjb70vy46x7rsfav640',
                messageProtocol: 'sfvqaxg86c07clwc5rsun1c8ckj03yaxlhch42ncbnmps7tmzrwp9209xnxz',
                adapterEngineName: 'iz27hffyj34xrin5wopyt5lwz5ix5nvpj9sfuuyydqdfvi07xq7df5b39r0ocmg1gleupprqwncw2g2b9sd7d9rcq6v5zmkaou23uuajv5llp4x8q58tmswlplsfr6m1shuzj8h99qk314tq2i4855qysctj8aej',
                url: 'n4os2qnydm3fnnzcnwgseregtqu01n3sxipx1rr877q882u6du3p5lmdyswefp2m2erepxs6lwvbg8bpf3dohkqfi8vz3n0hq8hvky78xcu47jolwnn13ldhzxrekxdsehp0dku7e4c31otggj4ivdwnssqchl7ce09zsnbw02l6uuwu21dhnx0009mwyz0uhz6arnqfk8kt9fl6l5c0nddeh4jyhi0c432jyyeyccoklxxuppds2pmnvxg175qdr6kdnt98zf7hp17k7unxw1trrl4so5k1sj0px20xa6zg89n35pjkfpaa6tt308bq',
                username: 'hme3vjklvr82yokj0u6lnfnkabbs8lfoo0mctr025yb9ckk03z23xydjrkgi',
                remoteHost: 'y9fafaazp1ns16jalag7ehyk388gscwfq2fei8n4n7w389y78twzwc4vt7rhalndhjj2bzx83vvwqiw96n89pg4b6sd3x8hc7wcg3b401z66393lzv3kb73aedkg6xf1pgukue4oeo1b4bjzhmrqz30cctph1117',
                remotePort: 1679843392,
                directory: 'ynq86ld2gggv0xq6rdndj9y8l1t1mr4wjdqexml0i47i88yn3e3inhvk9b0dtvp3ib5kport4u25huh2d0ox48caliiucsld4bow0l4t9hhbhlao1jq4j50zu25o4mqfz0ts2rru6djin9rsl7omtzu6lqsxsbjde8e06gp2jfh145w7ods00v9rl3ko0yr2cvbfbfhqp1ddcs8lp0rgwia0yekj31jhx6dh54he78a88n7q70bd6gkb5chd13dnkfuylgscggqz1p9hgsnw9i3uoxe216lnw8zm9hdhxjvunb1fcdo85lmv8tbqt3kyb15stlsdv2dfmrdxngeyr0gkeafu0jswdak8r9yvptqn606j6soa2zz6t6fv5l9b0rzkjdj3djcexkf98boq5xjf9kgi5ilnbydv5f7cr5riffxno1ikesnutiy2cvx1frcwrgg1jou6bkv11rxx9nxxe51k3rrwp3uvhlfg2q4em0gyzd04w6jztjtl1feg6ddbeo1nbaj67ud45beikxr8vj4w90tdiwhgw89kknqu1lvhxic2dxmfa4l4epbild7jq7juraf7m6mjqshz7wjbfwmymii9gb5cf820kc2mw26bvvgvl06h4qwpfmglp8opcavn3fpnex9x45789b0i76076yzmc1yhzcrcp8yt7s5x5z52w45w6xshpxn2mstty3nd0lptvakrv4uvd0wzu01tvl0jx9t2tlrevrnx5kvr9qu41tpw6kmkvhu4z5dmqi6ksvh4qsjdlep6nurfvbv7hu80u75zfum69qm46k2y240x4di3o22ouecwazavynsihy3hyi8v0evoajvj1bapxdk2xiac6jbs9ixs05w71mvrg3dpcvhduscfwbw0peesrce94r668j502vsbhg95blo9kerch94mnldm61yawf46lcywr3u3eas14j0eu5fcrev1ggts4gzpu695lffg5nhgcw3pzocxbycbeg70vfybs97k3hz2wcw5',
                fileSchema: 'efemdeksfsdh4ps9eqq2opv54w1lfsywbx9huzg4dsnkfe0eipssfm2u90z7y1dna7kje5zfypj29kr6zt3kxd2w4dyi34yu3llyh4hathoe2rbl2pq4f9lofouyd6jxa9fl5qt65p9riwhpxcxwe33afey589la1sed3pvy4boncvycs8ipziry2vvq7lhwpf13kq8r5ejbdtavogk6q9f2t1ou0lx883ccq1oofwt4nqqtwvtinn5z8l2sdbt8x1t19t75dyng23f847v7bzbudmo5va2i92wwi6lcuj5sfnweqzhlx4aw0783d5fi0pu0kab3q56e3j271dbch3uwik4udwf1w7d3gxb01ha88zetfwe8q481t8i2a0ar9ovbtcx16j3swdtmc7i65hisgupbuq3dtf5ufa3s08tssyn5psn6e2ld2n0e7ql75u4dx0v3qdnrt7ewublbed9a4sq61m5u2b1dvs832ga495tj13phatt7bxa5glav1obbf63pbotbvk6yiuygtnipnhb0qn1602z7h9qlmk0aj88moletwmwfplfx5rvix4e6ipy4tpfkg5ly5zjvqp6kqdtrqidw3282wac7k1b84rk4tlgy2jnzdoibbr5z6mnxkdpsz687l6u2mtcw9p7w8euacnoyb5jw46eml3wifvi6nny43sd4sxqlsx5pwn8h57fbz3336nkgkw8rp08pakgmqeadudgrax9pdk0fl0p7jmmur82mbadfoiz74vevbvbywc5zypiwxukot3u7bj5mojh5ma6jkwrpqo5798f0r4rmia7sbi0k7t2jsjeyjay27cwe91phnxqjcuegb6343jnehjq5q2c2zx9o9g5ye1ga3rq6nnyiayq6obpuy3gsah3lw9s1imbq3x9151qebuiej1a3i75gco05mcbywxp6xbnep9a9h35q2z0vdrh5c7m2jbfc6m9k9xm7ffpecmz1lj51yy9pas7lgfrhg7bjdrfwdd47bczd',
                proxyHost: 'ahak81ov8ux4dpobo9qw4hg5du0fgl5r7uxqif6wy0a6vpcgqd6uarrmn2rp',
                proxyPort: 7317025767,
                destination: 'cuarygkoxuycpzstxppqxeupihp8pgli5r70783z2outjx23wctgqm0kjli0dbrjs970nd7uwxhy14av5r4070xdkrngwias9y7i4jedlbzn5vg3a8kev3fdo5spffekebn5mjuy64c03ur7q2grv7fh8ask2utn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'kay4ym091hmdlzabbny0divs0fko0y8299jh2oh40az1bjcte5mbge7fe80lzg4vejwa9jqgmi408t7de9slie9abhauap4ygh8ozfms11rjyikjcm8k1doobo7t8swzr94ya08pdywsob7yxqypokyq2bemdxuv',
                responsibleUserAccountName: 'ui9efkttol66ljamytqa',
                lastChangeUserAccount: '0wy669vk7wh3no848j2l',
                lastChangedAt: '2020-07-28 21:23:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'x39ltfof7uv247l194qf5gsgh71b1n2c315j0img',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'hcfyrhuxbmu0bkgk92iv8yhtbz6gz6bj7n91pihylq86uck675',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'oxir3gevgywxx8ve5qtl4',
                party: 'yf5z434ed4pkc1zijqrxhdnee3u6liy0v9df5ubv8e2g7bp67sa18t874luu3sjjoidy5r03fz4p19my860cqswfgmdo09ud13c01510ply6xl24otc7yi2ek9b5qp200iyimggg62qk55qyi1qqcgppxepgs2i3',
                component: 'ay7bgelq62ei4617lpafnlc5kn79vahzev8t835h0ysj1ym9xsb35b0elzc5b0cnyr8j4zvv307mhzvwdfddd6fo5fx07jc82cqkfjotuwxyrpzv52w19barlf8cnsr4x4f2qu1g6sisld3rckh9397w871ftgm3',
                name: 'lvzt87we0o0flropj6yfoxribqqnknr9nobpqpkl5nlulog0ii1jex98f6337zgftlct262sr4v472rla2ql67purafd4qi0nc4obzkifrvv27lj9yxhkhs1itr94lloz3u842bptzb79ahmw0kbszxy0ybq78y4',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '2l8tveay06tcipwuz9qnk2mfpz1fef2me2pr07kx7i4o6dhxyh6mymvqgq0sxwf44uz2n8vbdpyatfzntep2nt2d87b77tkugwqk1of1jb9t4gwau36b612f3c329qb7ip8mxgy0jhonl74i6uryksu1msnjwwkl',
                flowComponent: 'c1lxn4gt4wb2ruwj2q0iv7fhb2kjfrls9zfq4xmt10vsk5zev0d3u24vo3enfpz1rehk77j4ingggbr8jbhzieyhmcjj623dny30shnimazlqpj9zwcoz1sn10mzryodcel1iozs0mwtwofyysmu2t0fb9x2cb5w',
                flowInterfaceName: 'jufbwo2jla4057acci3wzk47111j3wxysoy13w336g9my3zp2wz8s5jcni4u1w5j8y6djyk2sv79mqzesi88r9yspmm61a2lcfatukre8wwwdqwh3st96bbse187doa43nisklgxld86nniyc03221rylh9iv0eh',
                flowInterfaceNamespace: 'raw6eaqaymveksh1metlsssol8ufzt5j99wcets84nvlm07tl2xqcbsva9h8llpctgfp1l7fcbx8hbwibpig75miaalhxzxa0kb6rhsaqrl9n6ennqv91nxvecpa47mqamkpvdrxj1mdxv5la95spmo3b5lpwmnn',
                version: 'aw8zvqi9foxwq7q4oo1p',
                adapterType: 'f2tbse57igegxexl68sxkuq2svgsecvpxp5y8u7vtdutm6h6qlsuxduo46l5',
                direction: 'SENDER',
                transportProtocol: 'aj1ru0rqs4ped0bvxk0xfuhtcnq4mbsmnpyg0wa2vwonn4vl8jrfb6zlzbpg',
                messageProtocol: 'wycx9soz7hs2umc6lf9qvvdfgjq2z1qtpn0b2uum3hxj6baz109bles7ofeb',
                adapterEngineName: 's8kc4x2zm8nnotfdinzs59nkd0j53jb0syc30pqyq2votvn8yn8ywxs0254tvkop00tfkfr0rvr298tb4jzhnbiv24s9djqbwkti3i3qcmjloonusts9vpdcafdrsjeyl1cl9qklnzqru0o25m39hj9cbfmxarzx',
                url: '47zdilthez5m626vxx0wvb33oiplpe3gzim6n6i61aba859kal9k9dwqd58u3765hm8uj8j0nfxhl8rnws595j2tpbgdqdneeitvrwyipqh0gd239gi1t1coye8iaoo5o38wxaie2skqv7rf50tljvq27j8glh80x0n07vba5tzaf7iyj81wqe3vwmjtbsbxcgdw4vzh05iqydhu3niz448b47h1jpzs2oadrnr0dcptchqd88slr31ayklc8q4cg8rdeo5pzvqysg08xqvw39hya6acy826biaxci8pivvvqh7c6f64b8lmxhawqh54',
                username: 'ao86v13rfjh4fksn8zv0z9q27qjj5s0a0o9o0scx49mljqs8y4t0h8khmlu3',
                remoteHost: 'n7v6db93c6fa840hcifwghl5lcdbw2yt7iuxfvi1ilu5i1aiijgob2yc1n1nmdzr08ge9t0cclqxafr0avrsbt1u5g8igghlko1n16ww1ccm0geyp444n2iow7edcapqdv6p5wp3rfq61vzks2wx2w2ygnya0d48',
                remotePort: 5575468991,
                directory: 'ry7an760k1tpu4iyg6t4esp3wgcltdqfbhddkqenffp7yqn121wy2m5z2ljbmvpnmrg4st6ojn4jhuf91pqn59ys40adno1ki3axvtsy09f2deg6tfhkj379f8nm8yq44r3yny3jbkjuvgew32yebabapyr4xr3pgb9vonn5vkof0ayrzjrclvsb6me5aq1x2rkms080ung38r2i5ck7s9t3janhmcv9d2l93rffxcs3bym3ldhaeli7iwn5bek5sxzf9pdb8u5mx800os63qbneq6woxawfzbmbqjw12k0aa9nuf60p2rorklqxq9yeojivpmtnkit4s2jqjhkmgvjk1b1yp971l7t1f0c0yajv4y6vyu5lg94vg3c4mkkx50cxcg9d372sc7z4cinz9nxs40yddk2z7ae50nj90tdxjg6i6scw4aif10k9mmbxtubg16sz48vs3qs60xju2odudpi2e95oo055ajdstvf1syl4bl1kraytlxuzzzkvnh3x3iodva2sp4w3ecvwndm1xxtad2trtqkl6vig497ieydbcfys8g0f46eix5kebx3nji7f14ks795hd9hwb8v8npa44dy61kwkgkst7s63lpmspbsup59p4epv7qbzuhwwjpy8dqa7po3334zaxolriiod1gez5w2cba0k4ujdam68oudmguc97o58bxor8ad9ia3bszad1bqmts0kwtpoxrwvtvbz72zfwhn8g9odzsgw8gszuf3rhdh696h09ks3zrgn17vu2zv39zuuldd928vf53evk3fcm3zgq84d15z9ble5k7xy6kwwctimhup5m4x1khuimoqvc7bteboh6n6q2j9g25pd7wcqzirjinboyl3qhszs0gnyu8wwi2afvkj5zjiwlwtimjxvl3i2g3hh3ezu4b3ghgkevxtmt8i2w9vl1g7dp1p08kl688lwncc7sorzdgamdysm9flata8osqs6xj9o01yq9th0poeywxhukfp692gmfjv3',
                fileSchema: 'zrn6059ls8yj6p2rc20z3s5tjfcmdiyxcygv9vndm2vnjoue3mk0vw7ko5k0ra78x86mx0mmj4u8sq5cwusc2ab0mjg4aryb6b1bt8zyn8whuoabrkefhrrrgdygqz5esdcobg5mi4yq7a5mw2kafrsrqd8nh1by3sr54tflun2ou4n79m9r1h7am89uqnf0ufxo2i74kb3koneb9oydrx4t2s5g4vnshbehfg2pqw67caxr4he74eq3tc8rg59fv65s21zsbstqs9inf24v8k2w396rw2xpaylnd8gnqs39z0l3nruogecvmofalbbzxyww3qs3f16u43n6vh50vrjjrgsz80xn177sfz7445bd6dre8zu5bzzxt52vyj3wen7csuj2b8zlacc5ja94xv69bxxdm68d2nm682rz9dxjal8sqnzzglw7ivu1lmpyljsq7380r2eef3daiixbd74wt9viipr3fhrz7gw8zz94chq8p8mra4x048tfchly4p4gqsrytdmaeltdicbof7d9ffqq1gxvoivlo4niqg8n1ugrr5af14p7h3e4ihsqd7sp1zsdov6oqt3jpattsw7p8btdgd6yqdrs16wxzhjnfbtrs2w1q7rqpyu0teatkal5h2r9re4c1x0mk2dnamllsi5oygcamp329j4kedx8fqcslrcmo206kt012w0morw7j752pzfnov511nxbm1jrnw4swsmircp5rnjmssi6worspk6yogkypgvy41u9ya3ut83b03b5yx6w3lkxkl1v3c141pn35gec3x2ezlq29ipmc3v6eiii0t5zw2wqahi1eejs7k3hjjuifrjwvn8kjmwgk61uv954lbiv8ipn46rj9h8cie0gammclp5p04azwyslqjni6jve94r1g5px4j6gwqu2if5u462qbtbjiu4npwxu11b5zahsbs8rt02qspyid10tq9aftzae5d1e0obina6p6mthdx1chxiuy4cfpzpkwv3x2dnah6rd',
                proxyHost: '3qufnip0gepiuj7ofctvqh6pa73r8hvtoaz90ncnmg1hekmrq4luyix204sg',
                proxyPort: 8597919107,
                destination: 'eguubh55tn6nxjtqp0iabn3ifzu1g0v1xvjolmwpgnyfgh8lzjnneml2thlsw8fpbiwepxuky6k2xg02ybfhpb947g8vreje2jluy9skfgcggb9zrbisgpa4ejcwya99k0wbc35uipec7t2kohe45jfa43ezv3l9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'sq7r0ql71hhm9z59eg060p9y6w1sua76zrz74w1unhrkq890exnb1cfyomwu16fg3fvsnkh5mz6z3z9rf1c8k8w77o6a7lm5qjmcy0ve8lelqfzg97eherpx47xx3w9bs00cq69ihrgpv4t6vzt53d63ihnw88el',
                responsibleUserAccountName: 'ozasp1z8hosx2oz3922p',
                lastChangeUserAccount: 'i1pjb2gkleddc2mhwmap',
                lastChangedAt: '2020-07-28 17:21:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'uksewol0jq2c9s15lbmddssd7rawjpiupfacyxgk',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '3c3wfxk69nw8f8ig982egx38y5hxqsequc480hr9b4cxbgvr3y',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'zuk01wdzowjlfo272uee',
                party: 'yogti449ioh1u1hfui1kq7tjzunu88l1byiyxr8flgrv6chfuapggrdkjpsv31e9xmmal9shllfzb8fnvw8onxj6p6lj3lrehuip3yed9def15rhtcwg1sdibxnv02976xvptnfuph5ubtgp09po6jhm5cy61zj4j',
                component: 'ysu0ql6i6xcwij1s1ghqrh9n8o7fr9zu7h5l3vm3slc51dhchp2ins623stpu6sw4n5ift7175sfqu52sfn72njjoqgvqi7n8imevm1vj7su6ua3257g7f2kclnb0qvuyce9otdy0jtjasn83kwskeq76bndlp93',
                name: 'fv9ju6441aoogpmv355s1j2q0d72j5rh93581lpw9r6jse8cw4n4mv51bq6w9l8n0hwg4pkqxax722abllizrvl8vv8hmpjmdy0w9uls54if8q4xavfu1799pzczhvkj4wqkxu9wtwh5dp68ewb9u8ebz8o8318v',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '75ys1rpknko2gpqk6uihk3rnmphhzyxohxetqoub39lsudx675c5eyoa9onv6tw7m7smmtxcsoruart3pgx2pnxoxuvgpkisyheqia2trpyoqbi9b11mk6aazn3oytz9yf2xfehe4u4e5z4b9f8cksu7v35in958',
                flowComponent: 'i9ekrbnqhkpdb5wr89j4p43hgp4mhualdp1iewx2w27lrqphzf88ky7rf68ow62nqok7n61m5iv6inak1u3yhqxoji8nsqv0h0zo79fz8c1lw0fqmnhasvf3w5sbr427a2o0i8eq7vimobm3o72k5i6y1b6bfit3',
                flowInterfaceName: 't8dq4vbwgbrtprykte3z0gs2rlw7q8mabtuo0bqlbf53iz4ty5hw7bqvqs9x5c1jhxx3026t4qvt8dmfsal3p1qcvbll3f4pggvoulcv8zusuwfn6xo97yexnf4z4ekimdiumo6exb8w1m44fron0uf6zi9emk9s',
                flowInterfaceNamespace: '2gi32z6j4uzjs5azzt9etvd5u2z0erbxoxehe2upo3zeg4g0qof2vgh1ojas4ilna100ftm5zzx75ftgm1euw9o882cd1spk0dgw6sn7eis771okeu3ea8v476xz61daepazfqv51qhnitoc2x5dq9qx3hz2p20t',
                version: '8hsfxlx70941a53n4jm6',
                adapterType: 'c0onl9fp6ch00gw27rgxr37q1c0x4wz49ubxjfzhwu2gor930nsx444etzs3',
                direction: 'SENDER',
                transportProtocol: '3b3w6i576goaon5uwj402rrdmj8cdvzjtn8f8tetwes9d8xlzcebx0gxlbbp',
                messageProtocol: 'y5hf4ij0lu75f1f2k7psyltr7tj8mh6vy1olajw2xdgehkf0xb8tnf1swqti',
                adapterEngineName: '7erxq3ek08oov3ud4liegd4tjjvkz6t1zac47yppqvu9ltih15z1tp0c6cb8wbbs68d7zgyxvgxjia1dvcjnkb72biv9imtsfsvyu3ekx47jyv119clo5bmxwojl72xzbrfvqgrwp78zsmk5ui58klar0p4d85sc',
                url: 'cxtpp370mjf40ueeh02coa4bpfl9kxdik52lf7zgnj97eqfo1k0o8micm17x14i9w3bp66sugehaa23zw42faatr5t2cr2xcufr20y6a2mgga06z3zxugy7k8t2hc07tnnx77aclguycm1u4xa7u1hb133x5ocsl1qm928kbfjog06hac77gbcq5f6mlllwnt1ttfsw0n4ke5bo4xh0i1qqaa4wszd2b5sqy316o05h5yawji5bdah4l8kcap8tmbncrp6ap153xzv1n57llecnu7a4bj6utslmf11cq9mpuhl3rxzwa6gcltv8q0qip',
                username: 'zf83q61flm339qjutxfi9ndyvt4h4v078c79mwrfxh6zug6lotrii12itmqn',
                remoteHost: '8wwtggehxuqgxhsce1yx94p3g83p6wtbq6h8rshen26q8rweaoyxu9y4cn3epaq8nhyr4k0wpstku3fylqw2e90v2zpuivqs12tlor28f6ww1icnztg2q5l2z16eufy7adwh6pe87bncselxtovxtuf5vdzt41gi',
                remotePort: 5328128339,
                directory: '426r6g83b9xwafho48c4c8hhra3azzymz0bulgmv0z18zuoaaup4n6y68c9q3neocve1g010j5vrnev078e7g56sg5i7nb9ms3rfq9m0btg6f8qe1z6q3krkffjvj076ic3k7293lilnjuwa4dxr1p1q0s8x2gqm5ealdhagexjhx12snxm6wi6ilqdgmwdfgmegis0h43j2b7p152zf29dlslnxwj9r7md2oel4i3gio9qicw2tunyt5vrzx5c8wacm07dci51mz7mn6vu94v3vr77xs0857oicp0ig6mcucfj2taun5o6f5ebpoapulqdwbgpr1zjzptwcvyuciepfzo05k9y2mr6djnygd53t7b9zbz2xg7jww317v3k42yxg0xfgc4pj9h7gg8n145ut7i1vs4ryde53hhzyv25qtqhjo3xjuu0c4orj2twnooahhxawfo0l9wm8nr17vfiizpv9wqa75mvxipvkuv5ame267a5tthdbre9xqr962uqrjsy4k097stu4zrwz399xt8c4n0qxuha4k3hlwxw8ctzp9bga28i69hb68b4z5534o70vzaulg2xnkb3u8uymtdf07n9441d7v4cyk7srsuesvyp46us4fbtpjre7i7nruvhcj8xo5gds3t3ejpq2jpod61c1mrbpqtwxnwg9km4am68wbunsm8tzibfgenwv7ji2pw5xo4fhb7z2dyv5yg5rhhduuu7keiui3hvm1zye78pwbfe34h4f4j1g9pazkm0gcsumnvc627e6gml648aj1a9rcldb6nl76zhgfaid6q7b1wssbyk7bbetpn7qte49nvzw169gwgh6atyz3eq1rt4rmrhx1l3ror5jojggufineex1j5bwqgwa4ca0haydd8zg1av5t21f6aimak5w5t0m8kumh5a7mmgs1a070m1nd31rzoq7pjz0s5x6dr0sq8fpn7su645swkw3caoemgybas1r16v70i8n5z7ksrufepogygpv3hqu',
                fileSchema: 'f9kk8f8gt5rxln261nosdp9esq2pm53zzwu4597nbw3hg3bo99ngk9km3ds2jc4fc121mu4z2vtceqwsaeqf8xgmkhqwdygfw3pwr4f8hr3clod0ydlfbfagmtw9vc76vjbqnyrjihn4r9xutd340f5f9ts2p8o9glm6990c4btakxpdh7myy488pm7ual5dfi6jdwu3ijr9vn2q5n0baabti0ze4ky4mmboud99cee5yc2i85v8w5q7t9tvo7ornhzp1b5th7l4hvcvx6c79yq3rkud2pjtz6e9ol84n912iklmmavu4cy60koxsvzlq0668309ajmx1i26tpd1azj69gu4w0ib1oqjh3ekhzvzan96snla31e5z62vm468rsamwn8i7q9ycxbff6cx6zelqta4qtop7qjx0blaxjpsott2tuhzhxvtpumuhoybgivwlzgzkwxqxx17ue25idbyz6pg1mbd713nbfpgca3qi528wm23olgp5i2ud4fh8xdg6szqgpit3xa8fjq4tphyfdqp1vnkga7g0oe8bvw5872usg5mm670xs0jdcv3o4lcv8c4j2pw8elam52zjsvr7avkevf7300ozd0kyqgmp2ixykt0sxtmv4t0li7xqcz90pk2xi7ak8qzp6oz3kryymxvuhl9rhokb49iqmt4nk2nrxls7paqjyut66ar5c2xn8dfepeglknnqimk4crxspnl7x5e7ahd7iapg8aimukqoyyk5lxttpnqjw94bdo7pc4kcg9v7qw9ldsnelod88op3j83fwy2un1mekxvvsbo5qx9p05hr9u7tc7azxk7ige1gz6xwfajbb4risb1fscsomrk5sefzzkc8g08ok19q3ox76l4wem9hu3f3etxgj70mtzc2lbuze9alsu5dv9v8v1264whm7qksfxfgr38d9rvc236l4q3afpsp2pcbpu1e02pkovf7bpt4a14cmfbxql7vsz2iqhb7jf2cupkoc43qn6hw36o07ga',
                proxyHost: 'xyi77ji80ht26lskooh7gqze7uqbime0kv0r9pll55x813jemf4aapa0g114',
                proxyPort: 7979617269,
                destination: '75227se1ztj1tjt5tk7ujrm5r1rl986gkh69ms40s9et2x3e60dqohslry8lps71ttcjqqfqoo5murba2ba39e3m0sozatetxeucql0m24zlttefvfctisq7qf9576rnugh2hcnrckbv82dfb6oulkzf0r8dj12a',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qu4vg59342r7dk9yf30lyly7uexqlpmh67hmov0qmmyhi69nrjezc5mdrok54ohoy8fu3kr10r961dusdm8h8jeuo73pszftlcizvapd4263qe96s21abhprpqei719lojbnvty9jdrm6umryykz6whorb2plgq2',
                responsibleUserAccountName: 'm8nojqe2d42yismha0b5',
                lastChangeUserAccount: 'kl5rhgjmir60yw3qednc',
                lastChangedAt: '2020-07-28 22:53:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'ibfj3pk9drjl51c3d0w3lljolk1qwgqr17d8exut',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'up7cm9rzsl499uc2ldhiubcwbf0q4whe8fin7s0xms2dyg50tv',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'e64lvy4xa9ywmxoww7xn',
                party: '4tn3dv4zq0cxgymwi1otr16642bw2oacr8xtcvek9tdwcgwg7dq4r88u85npdw3pu2enyra0o9kk3z3ip33t8chrt2lo4isl1opit3tnyg4lvmrg5ijhiv0z3829c5v9adqwm8uerc3uympy7smjqp1ezcxj2i32',
                component: 'afn3vs11cwkzcbfvhmn4wq2pn2nytk630lfecq4u9jskrc1kbgiychxczmtg43khyiiz07c04gwxugebgjiutoziw2jnfeimgkfg9iw07tcstt2r40uazrtbn2610hr8qfdc28vfzki1yi9pnihzqqyr1t5e52zhq',
                name: 'bbjfg565kmthck1s5w8qdjso61werdjfsgl2ike1iqir6zjvjvtsxjoltc8axnks5y5a957lxd0zg2x2swg1kk4naj9a0lzj0368slz7lxca8kv5iotnogoqxhdq5k6sz99nfng49i5vmbcqxxbj4ctvua60o1a0',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'evso2k49k46cvw39xh5tixxs7kt0ysplw1jgu7me5f16ckd35g5arl124zsodmy85mql80y4rbsbc0uq59o73d0ee3xkk934zjuydtv8rn39hn5knk6uh55ncngdcp57y1xydigunmj3cnbmk2tbmzmm8dx4c45d',
                flowComponent: '16lh9lownvpfr415bds2ax0fr0iirn2kildbdvobphs5jfcp7skgmjl79zr7vpzipdpiafs8a1l84gxme9rn7k06k13ata4rd8vtaziwnsh70exiwv2gdj9nvlh5sirq0cwsyovneju7248gufmkf2fpf6l9q5fx',
                flowInterfaceName: '4p7hw2dlq5wtlk2iksjlhk8ooo58iwmj6tl5qh9js7ga3x125f7hn7kp69v55asd0j8tspj5hbm4d66e8u0hbeuv6faw06a2dbwg54kw5dujjimv83ojogjavppbzua0ihlu8q1ga65gk4pkwv4dwbl5jbcg5k6u',
                flowInterfaceNamespace: '9k7n8yvgdtaesvt79x5jkplecpycpxzoel4wduovlj24xt6wvumxcrrv93xcpm569dc8jcgk4z8j3h4timdmf7fdie9ywm9vteyysy4jkdj5ju4bqi8wyiz62sifg17quej9w0sxpr8fdla8l9x9iedhkadi05pn',
                version: 'gupqshtm4eddau6jug45',
                adapterType: '3kzgpwa3v2ukrnxn5o56m6e9aeb8kemgbvo7weaj52xxjt1lbshfmfy2bnui',
                direction: 'SENDER',
                transportProtocol: 'nqeqene4zoozfnwnwiyxq3yl2p8ctiwc5y6cfdxv6tslr1e4s63bmnfb9q67',
                messageProtocol: 'jn1u0z0qgiddmrdpk752ljyjzgjbqmp9ulgrmcqkq3oxa977p4kumy2ccxw7',
                adapterEngineName: 't5asl5ugf2nk5bitr4car6pxzz6yqs2zp7g2xoh5y2q15s72vhgkumndw2o65tw5i4ifmb831di44h8b5kipt1r2753yibsulpw14o0514unysyjlbgabt1s3v1ljl0apomm55jsc2rurnsw0ikn9ung6qt2gxmq',
                url: 'ym2yr8tomhttd2q0ukaofh1ftblkzyn6fxetz78xp6kvm9max2j7av7n37czbqlqcwnjol5ayl0x0hiixo52ssoq5ypf0omh83lnmume8ra5mbzqdnw3eoqb7m8jvuaegzdvb56d4rprupcmx6f5gvvpualrnzrtcvqexn0dhw08ftlluknzy2c8kjbc8atgu545y5sgpvn5lc2uou7bxequhdv2bdpuyyv0t25u19e3h7svzx1l2vfmb7yj8fj71xa4dfp0otdwv0lts4l6dcm0vys6sn815rjee2oekdqwaho7p5t3wlbp7er0qh39',
                username: '4y412or203ci0mt6pqmb0h5y7w3hsmfrpebewjc75e8uj16byrfa27e7aql9',
                remoteHost: 'amfi77bovj4gj73t0cyv3b173ia0pex40x7xlcgypzm5a9c4uxqdfp0sk7ztfueydmrlg8gw66087iad6vlfzn8j60h12a7b27nwee97aacxsljd6cmljim36b2g82s4y596i41idr63r0z5hm64kb4p0znsmgul',
                remotePort: 9103543212,
                directory: 'io1w112l74qb3ntf98thy9erc8g9srpm706sf1puvymv3hz7zmn3f6ga4mi53ew5jguzmivo6mccwsl9fs971hr58fgeji6p02jnlbt6nan3fhw8hhfu7lx1xxu54g9byy2j41ebgbiuf8uk3xgncdlwkyu5j14naqzimwqpyyc3fpqseu22zskprp50hvcs5olichw6mr35cmeklzj5ajyka6o3mzl0hid6lb1uds0v5aid5mcktbajbreek6bp8t6dfy9x95axtygrfsm9eu7fhug7bgmgfs9njqw0c95tccmbky4tdv3o5fbmwfvj7wjql3fs6dk4b8th9n87rrtqpkijrkjymau8lbzs1a3a8r7nlu7jdpu8pvm5i0tj051l0ufdnuimxwf22rsk8ir7n0tgs2yvkynvhgsz6wy28cjyedi68mm8k3agwvujsy0nhiyj821kuvdmry7hjzulyodpb7e12iyhvss49kxctlag8wz0p0i0rjroyqq00dr29av6t9nhsy6tj1zz06lz3o65daul41ifosmumqx4jr3miim3reqovebsf9lenj375b6ctop2yc537xxnlo3cq6huvgtbzdfuv5ylg1wke5b5ehxab14snz4ul9kxvgpf6bkhwswkmhh8171z3yhvnyv449iug61p258sjqokfq8c3i1qjp08ervqv07mnwubie9zwog8i8iiplkad6gz62t8fmtqojyl0oc86ha6ruiukpcnbv35q2wh0rfl64sfsm7i930ks8w3m7t4df1ii9cp8o4kipi2owxak8exkblzz78rhjkyt334rbynpgr63cdn1tubd9pxguq3xkgkdczaoz6os5r6c7q4zy4cfwzk3vzgtd5hfyp1hyr6xw5w5fi7dfprffcrq1qov0al777772gurl0ziw6nuk68pd6wkepcmvs6n06f4vnya7fwx4wam6t3zxd80vuwo6s7sdamueq374038smckv0oop0zko47cso8kqlzdqop',
                fileSchema: 'dnh8oheplc6vm7s9xuofeeoomhalu22rjr0ecje2ylx2wm6y1n510iy97dx0sd89vz1cmg5289hkc7g4scu4ey1dzy9je9iwstwxwam4xsq7h5vecfpt6n775hgsjzz8bztkrn37jpscoj15p36htckzcg45ej4s02tfes09hh12jaw4t6frty8y1a2ai4v2bmymokz4iyg0r6vn4wordaasl3lf4h6lohixdgxbm8wpe0pve6kbekfyzek6lh7nsd8mxn5cm5c61yf816je873mlf683qfpzmou7qk3ekmp0h8uqxggrx6ltutyo7i7qtworhqx4kwf6kj45eg19xhei5n5y6efecgfnw7v32t1uxshyq5ja67mcbfdd5mnpzi0vt3pqb17tyoes0gnj88se8juc8u1xah22ykis941ylp5kb5kzkjau43h1wcjdt3ku8fg2tc0lnfaemyny8zhxjyahq3sv77mqxlxx62oob89xmkdipkwbhap4u1r66g5naqvh1kcskrm8s4ccys71y8340oite1glutsk961zahp6arm7l4964me2227msgielqno1ld086ohqjzar94csyc42339z2ilhsasfmzh5oqkxc84ryfyoxpjkt726iuau3dhgini3zp8d133ki79kksj47lmfyx09cyaw12b28u68j83pkiat9ceq46szcejqgmqjtl67qd0kuc47x2a0xt85wjpux4ouwol4c1e29zqtpr420a9pq517yfswv1mb9fvysebuhvdivsacwbu52pucl3y1mcludr9n03hzk3qzbrqf4jshvyo4bq0fsr4lvo2d4cont0clwwiizkw6ufyyx9e9i0if8oti6tymoly8jjezw9xwfxf46aoffyia7lzk0jdczrhg6rxl4eg7lggi3wdslxxvswksi4pno6tbmufw5hrdw7qoykmsmqskjtyrzb49525chh0yh33wg16ni6dewn0hiwoqyhqjmqd7hmhiu73xsw6l39',
                proxyHost: '6h3cbomii5i7g3pnwhxpk5n0mi4luscf23lzr7ah08cuo7whmlitlavvyk79',
                proxyPort: 3924754598,
                destination: 'vd2ql9yhqluxhdgokst1dgyf4wi19hshwwj6ig4t2ywyh6rlv4ddbs5p5qrusd1zf8bhmtf9pt229fxunogqz71v0d9m39rmstnvyv756atihdxxr4786hk22wesr3a98txmch9uqvw1clqpij35u57g1ah5gh56',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4pmmrqv8tmk4yk104qp8m09erd7s3yys61q9ojdu8c7qzywjf0j8u3axj3s5mkvak2zhyw8ujrs9y9kni24o8v4fekzeh9vwxw43y261ruq2sqpkng54c2scswsss78jcmjkknu1in6cekgtk2lu9z6fswhh8hmz',
                responsibleUserAccountName: 'kshftpfxtpjzhphehfho',
                lastChangeUserAccount: 'wxkayvjz9su6y0jy070k',
                lastChangedAt: '2020-07-28 19:50:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'nmkejiw63jryvjsq104xi9z97x0rf6xxnkxldrh9',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '3ux8w7if7ghx7cl815caamctby01ctt8ifmvg6tt3q9kuxrzvh',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '29k7hecak7rj56m9l8u0',
                party: 'vqjqeywe8610wg8g61wrpjt9x4irt5b6pyapf44v3dgt14yihoinpy56fx6sbvvrdh7f3g4l417wzqzuxpq4ba22lypa5zkgm5qx78g86eclsjbzqhnlix525v5sn3rkugl9cy62144wkk82j299w5n055bdiaa6',
                component: 'epch1zksc5m83656k96x7xnj957hfx93m9m6tiuoydbsvqitgzu9al1a51qlea0zv5xe9d0fjd93k1ya6qejfkcmz1iphi2rhr9mb4f447wz4kor5p7578ecyk7kjbbkt0ylbatfd626h28ks34wd0ezalv6aeaw',
                name: 'ggtth4w9bmbtiuhiycmt7hn2x3lnq39uoojkjqd1yh6mzkh3b32z2etnpgyk8e3pd468mc0fc384o3ktoyl7q7eqdaz7aollif5cw3vugycpuy4ps84bkvi9f5ey7ag3zeki61kfwhrwo2etk846vid38s897vron',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '6nt6dx8yl8760l0xmedw10irzfw4r58fw4m9zhx3cbfbeyenqchbju0owbknhmfnd77nvmnd2l7hdo63ni07334nbo0fmozlhfpg3br0txpkv0ffsym8khadd5djzoyn4md2hg5s12wwgsrj9ke8tz784snqtmff',
                flowComponent: 'al4eg2eudfgqrpy5btqmpsmur7yvg1p6hxzl8k0nudzkasooder8665b98aagmmbowfobo1hwnors5pgaexo3zade8pnjo2dymf3y7mjgsko39dstvap2poresbx5u4k8hm96cfl0rh3dbcyhnq96gkx3cc418c0',
                flowInterfaceName: 'iz32p3y4fygjz7p99ug1g7p6kkrk6rzgupj487ozke4rkqv4raqxlkj7a3q26k9ebrzea4yqoevl8dujry43oprwsdgnrl8g5u6jm5ij19agrbe3115hfskdypgmq0dctpyh3vq9lpwsxrhdn8dfttuo63z7uak3',
                flowInterfaceNamespace: '578uoabcqrtagfivr539ocp1728vc08h6twvtcp1dnpb4ddymez3ubfsy9rzz7jgt0uiktm9olaav5imqj49znehfbre3zx4xcetqxi0duht6wpj32d5ilfhnq5tao8vbzy8jz6g9cd1d9lcnxyldqh4bqke9l89',
                version: 'j0wiuxbl3akhmgpecyq8',
                adapterType: '3rupvb9t6kxjqr49q21kc936dmf0uiq9iecnxipfy1klymaj1l3na801qwh9',
                direction: 'SENDER',
                transportProtocol: '8oqd5ctgq3z7t8ulqhcst2nbmbcs7fhh7xpjia0y5438g4do05ywzps4jlub',
                messageProtocol: 'j3p8m6g8s8nmoi5pfvpr97tadfmu31oihloyub15zefvroodd8a3lz4nqqpn',
                adapterEngineName: 'q91m2buhc4nhb0oppdrhvhqf2m9mcdcynp2w7lt590v112i26exiewwp9uc0j8xug1flbr8iboecmqli73lsgtqbzugucnk9fsslbalhipm2z3suxi4jdfcvmrh9rspfjjcxmq5ahy3ic54r01u9027q61435wzc',
                url: 'imfn1lsd78dupzp8tqwt1i289s8sqod5noz1d9yn9uulv68r05lsam3gfhhfpghx7aa7dwa1umod89fywh6k5zljo2hzydwxhdwovcari7f5adikkywfy5p7kqi9rze1is0wxlux6vc5lj8p1bts48ipweuvyxv7nfp7oxl7o813w1xfnkjjsmd7u6i9dhcn7j4howyjfuumz823fmo42jzeo7frkkeva4nuajqvn0798q1l3krz99ovp06fwprayutq14obvlt3bc7pbaucy45iwwlyv1urp273odx5xdh7p9nnedt1o00nonizf1f1',
                username: '7grb1scg6d7s04vm8u1g1uhdea0lrrj8f3ne3i4jcge3mjyjhkv7xw1qvce9',
                remoteHost: 'u56rolvbltwwzmob9nh27591y1pyplxa9sknbjlc7p9m2qv9opyp72nz7h1nxkewridmwgaxzwq3w762pzoifipehczpnc86cbj1hk51lgr9huwg4936w92vb93wa5bmk6cge11rz2eosjqa51y16u169ah802sn',
                remotePort: 7441024284,
                directory: 'a6pg32x5uoaa29y491twh52l496akn4syzz80lhibg25d8w3nk6zi9j80b645eliyq9864xcm85wnouv10qisa7prx16ug4nfkbp34fm4acm34wo60jmcr1g3u6no7jtp5ngc8kkhco7s1u6kl7ooffwsn5e445rc1c0ao8rlim6cp371m8vghkkgotipsmf04y06huweaadphf9a5qeyyzp5s6kwfaieyhh4sd158lsj7q67o1mckx57wfk3ng9yk0g98udmmv9wuqx717c6p6ma40m4foqgqy21e4bbh5qnbjq2p2ppg2u2l5ddrw8jx8musmf7sm3eimj21mxt9inis2arhg6lowd5zfr5dfoubej15ot8sk2w003guq8oion2p2p3rdgi9lvdbd988m2dg2gzvey5ggp2ao98nlswmalnrlfxsx2lrb995fqf03syolvtxczuyyw1grbzjuykw6967wy9tclzhgx67thbev0808ii22pkqtjhqev4qgb26uo5zcwm4lltgrpvjnio7q6bqfrb38muxnf3qleoxb42kawdr4p4fca8qi9dlthraikyqbub2a20w8pqooba3yqj8sn9uk9fxxn9t5myxe331t4pyurtm82bjelbdy32duyartfprny671oeusmayjiggdisk7p00blm60dvbhdgr1nzqbeu2rv79v6x4nw3qajd9e6qr4i4o3v0lm3eclz55cx9u2up8b1xar474p41zid97jm15hhmhq9jdiariee2n71ek9e7j10a9hh38s71npcrno85kmgs8ftzk5ndddii2bmqk4kqftcmzi0d5wvt9b01sb0hsxm5cwnqk97bj0ifmse2q868wtskwrmkvxjueaj7rlzjcinzbp89rkc2sqtz4x9y1fkiadsjvlr4igdrlc7v0anqwm21vcc3c3q8id4lp2ut47a73f1dx2n0kjcbepm2lvht1600q0mq0il4fxeok4yqskaieqmo0veyc0yido3qmb4',
                fileSchema: '54zyu24ue371mgva5ig5uudljz2nszh0cc9fy9pga2swaqqveqasom0022f1ib7vflo4uc8ibwikmbv6c77yd3w425vn7mcxutokgcvh3xuczt6ys4t5dg8th6fute50disvcv5zb3euhk1p6c6q0t2g3oeyp2gjwv4sdj1di9z9l8uuvf1wf54l6bm8jyukmjldemyw318gljkr2enyrunn5awpivg1cxnasrircq26neae57c0f4lafuivdx6x8s37yyzal6ogbzykkv7885038vzwhf49l2hfrw6y2ha7gjwppwy9jjzk9sbzfkzqgeypvbx3n2zhf3gric1lzqm59xvdtzb5phxcexp1ng9phqcd974mpqsakz6tap3ust1nihsuch0mg7kkk5v3zyh55pa8wltsgf67rt2i0a6m6khntpxqdjbenefov62smhrxkvxiarlqm7ldhljzgnxhj4xskyf1dfdf88wvmyae0l8y9jl9q9akrfmza8tnddaqlqjd23e891knmsnpy3kxkiz588munpa799p5k6q12hlu0de26umhzqexnolmt528uadtxwhlqgrhrxirbjehb4zvwairreh7zmrahevasf14k5byb9xk2h7ktvymts432nbp7lqf5xgr8jp5f9zyiw1y7ybqzk2ppqbp94j1h8lvcv8qfv0nakd0xv8tj47kg8s4bpuduldsre8ka7d0d5fi4ri8n3fhsk1l4m4me3uz9plgx019j9nzcdqcx0i0z4r6o7dmhq37y616a0g73xhapr9nrxa2n2cbw92wccn8zi9p6s3cha7mw1css9p6lz88g3rl1wi189le2x9xz6b06hrefjf81udclcheobmmi7jidolx5vcd8dcjq6pvglddyvtpwf0t7v9x4d0pievb7tuf4rgi35841ejhwmilui4jczk7symld0i4xkck1bxvx3rgtlc0j4yrjma87cs3z4tq8xuby49bu2tyxp5hjelac7yye4um60kv',
                proxyHost: '941bkppj4z96xtpjosim49nrmvj7ojecanhmiel0j6w6obekp5wncf5twpta',
                proxyPort: 8990219123,
                destination: 'yx3l85yrbz6yl6k81mkxr69rf437iqji8qjorbc39i1pe4qoofoje8unl4ieo1gaw3hidt9fg35ykg3dz5s5cxucl673degd4r220xag74fz5u18q4y27kua6rq0nkzts1aaazn1yqkl1qo0e2tpr6hje9epe2w3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'fkka3oq0nncv3e2zvyz9qbzrdwfg5wfchttyb82ion3fy8i80xosdvf02yb3p72pp9iq9zrleb8f8d2327c482unrkgh2qpmos5e258ba5nrheepnd6zdyvbldwpd278b2gxdhx9chedvsjsikzbezv14noexdn0',
                responsibleUserAccountName: 'jt7k5kxet5a75t65z4al',
                lastChangeUserAccount: '6cvm3y7u860d5ud7mbhe',
                lastChangedAt: '2020-07-28 18:27:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'kt5wyixaig7oij59w566jl1iz8mcvv8k4lggvs4a',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '9vg41cpqngwpdeg9kof1gz709k6h5g6rq9eudkx8m03fga82s0',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'dqpjkqof53fanvp7l8ck',
                party: '27kc2wtkvdy58b2gl4sojq5wzrt1i5po1rcw5tut96ktz89yyh67m18gh977hd4v54std3jgm35aec5nin76efhk17bnvhsw2f5hgtuosicbhlskdglne3x1uw4yutlygfy3f12kj4dzzu331netbvxb07yc4dr7',
                component: 'lqos1e4zdbgorlkworx4jj33pngo6ehdfxvchi8qig3h7p71g69e2oe2c8vrumwqjfh4akx5yok0o8c8u507t2d7z4qknvd6wwdabod1ss1k9e8iqytgwied4869h783lge6clqh6md9z56mubmcawyj3iyb4yly',
                name: 'sdcpy4dnz84r9rfd369nv4128kgfqts5947b3t8ohzusf6oipfktcfpidntssdkr0t8zeb062g9opdw8i2z2h7gazpwn91zzwx2qv3dkvtmoxhzh13cmuzcvjzzwcf2ejo5z1em7c3rwj8ebbipw2eyu7i1x90i2',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'mej7typfk7zk7jzoqkhfukylww52r2f5w0hpe1gu3394lnkojxpmk6llowxzsey38xwdw3l8105lxhhr1sm9wj25bf0e250vsk5nqtajlmwbgq7rrnvq9lsi9f8wpqis0q418m7196zi88mlgx5i85rtfl3249fqc',
                flowComponent: '5mbnt0e85r229eaaiz7540835l58vla7en3qu0fbln7p1pybnbiqbwhm07bmv7ax9j4pil0g2ugmvozijj81yayajjxrjf9k8ieyb6npvszfyj1hs7wfbmyolujekftfljwsyk8atk5y0xw9rr2w9j87hwihx6rn',
                flowInterfaceName: 'deuyj6hvaze6z3wxsclhpnz05oof0djlnn4vw0pph5u3hprw5iazpa4slwxks5aekzl2hau0gw8feapl94a669ovfc8pgazsi20wn18pjnymohupr231r7020p1ow3o3e28cqm0fkztpv6mns3587v5i3bd9hxk6',
                flowInterfaceNamespace: 'xxb3cl2y18towbgtm09qr1kfzwsk8n8003uc7iuhu2n6vgs712zcxmcv8d5m2ktp12y5u85bancwsg32ivglhv6wdi8108jk2d900joa9fbi7nwizs3ogksjaob7e3zsuns0d9f5zqifhjsjoirotjmxiitprsy4',
                version: '1q9qsyzsiakj5fcfvbnm',
                adapterType: 'av8huhgoqgm6m51lqootgf94ntacwy8taenbc12l5hnioonr7li66vpyzx7f',
                direction: 'SENDER',
                transportProtocol: 'whu84vg3302rfeg7lqbdidbiol9zahx9euh9i0tbc5a8m0m75k5ixw2pv83s',
                messageProtocol: '1wtil4yq56wiyj8vaty1uzw96eqdx5w747p9kvdxz2dtasm8a5vkmnq4jttz',
                adapterEngineName: 'yz3ptak8sp1at3j2t1100xx8qnyo0gzxag9megzp102qc9jn1xgxaw6x6jaqxgodk44uc6mq9i5zwxxsfoogvn3o1k1jjh3j988llum16ccmnct8fqswgx32zor8kuj4ydm0bbq7c17sstj560xhkyvek8za3key',
                url: '0t94hck9x56lf992a3e80puz3tyd6lhiesi9tcu62nln0o6c0b4s823azuxhzf84km7ooirunmuwfatg496jd5ekcw6grx06kqrk4w0uiftnq70tsks7mepnqq7gsstx6ukrxzmhb3c4f9n4ub8tcr6ntjxtav2uxgwwr6i6g3hbu0qtgli7t2jayerjbw6gl9l6vulwwb4qi57niy71d8jgmc3x8vaj8rlk6regm507quz4ykwxe2y3lyy4r8tznyfyokt1wdbt49gq0bku7ozbli6gmriihxfrzqj1lexks40uxcvg38u6lspezo4k',
                username: 'nkhu1qlwk1opoz1ffqfqj08tgts5wn2heo4eavkvv61bczqsc7yllcn24nmt',
                remoteHost: 'kp2i4sknbfj50j1613wo2hlhshhx0j5z5imzp8bpirs9e4rpb44wzlv3y4zfjozjydvubhuxqcu4t8xgs6cgiqsgemsw6dq5au1n7mcyctgsmnjxck44vds7tjabovnu078oe5n1bkfqxtid79jt10ggokime6tz',
                remotePort: 5940746357,
                directory: 'xoh86fqme4ajdt3nnyagsyl2gkw3gg6v4d7advyesgxz6e608qxjhhdfx8t9n8457ml1onere9vpu2g1t8mzhak0tf6w3k8flyrd62ihb7xdsbx1pcb0wqlr77c7bkpz64uaofvp11v0v5kpdgyuk2ihhq9b9q6ebj3hoqhxecvyldzpjxmfmyp3p3bgx7swowiwuy00ql4p9qap5berjqcz98tdg7e1nl9hwwghpd35rs9qtmkne0r81b9ivkrshvb6610oz3ywsda07xkw18cvhflm3qta0dxgfsjc5hratp23b0pj4iq759zupbreq928o2400ozdudcamec2evrst00c75hxpxnwmtv2stmkqhew594rk59m2kye81btqq40cdurzg2regq2i2ahu7eflomvo7s6xflad99enkqqouy2xhki8ufk6yom4ufika4arnzcxl6jpggaqj66uzccp8k3e7csr08ls79wufwap9uradozfdz3dv3ad4bgx562mc90t0mejkqe2zbeq4furi8mmj9g5alb9klsyy1cld0gergb2j92juodsij9zfhxfgdsqpq8ttgaai4spmzbbsnvowjmvf7w28dx8xfqs9anz2r54tptyqegeelkkteo2q5v73rxrettf4ij1wcv6habmdy5crvwotadav0ker20rps2xb3lhfzjkge54ipzdk0khk7p9saqxkrztj0f15vxi183zdlxkqmldinh1j0pk9jeo51mr9j5rqrugov3zrlq9kw91vzbc9qapkr2ptewjprrvunw627x9j6pz4yaq7pp2jqq4dxrioybcmm1f9i3tyoz81xtaulblawj07z1g3bo5wsm5he5zr9tcpxak1rd7pzyzwhkayr02zzwnmsynbz289vfwqx4g4szffca34ewmj1d7hxbwkzlc9f3dwr2l9xr1fhut7krutxh69ug2yfjyy43fp2i9eqqjnfan7gbdfpmnxekweok7h8oh20lwhpiveljomni',
                fileSchema: 'hxa1777bnhg5yxg6oc6uqwptkt7n784u5q6c2l5vh33bfrh2pnpnkl1d96e3zpiuwuvukz7lr01m3zyhlptqxkkp2f795jtpo1xgl1zmm1iug3nyk3txj8704x2b6sdhgckfebckbim1h6f1ai7c8g0urc07kun0lom2msa4y8k9adezog49gn0wqi5dxu81ncsnqq1zaqlrtiqxkosbqmonf5xqlzuzov56qphbneiqne7sdixive79tcn8b23x0zqdt2ebylci4kcsupq2iij3g9dolez9y7ba3s488z2ic0qmq45atprr4vqnwnq83m46rpdpsauj1h9t1pwbe5o4tova8niwb6204z8je16clp0r9yh0dlayynolcnp8c5e822kfgl55hsthpu2ycziycvldzxgyredcxw3ph2igrno1zvo629zyae6z9a2aqd8dyyokc19isv8sesxon7ilh3p3ytd81q4k04p0m98x3suajisxxp3bp8pcek045olbz1gdec7m6ffft4olc8d2g96osjvnahs4izkcj75ze8rmy1zxq3sfy3ianwfxok7n4nx52uvgqx5ht7kopr297xug2eorrs4dlqr9ezoewxtsinft657l67ih2f9y9tndx6xgsquh22nxhj4urk7zg9l3dr7y3y096bqzr0v5ik5krb1gbjaqp73n3wbqxb744hbdc7hauiusjkmh3katv3ojlqlwopb6o5l16brv9gyu8fyxdvktoguy4tqzvjhepvasumgi7tv6i1vel042f21ukti4vd62xm41tepugve3cj425lyvp0s8kw4zdla5jrmblpku36xkk90zmgc4fhzss2e2srp3ed7hg8azx605rf6w36001d8yidm8xou4b8739dxw7y7buvhvq5gtb7g38s5ud2rdvvk34x4u2wq6qltmwc6f2c9i367h9ase79a7u7z478kvyetd4z8i8pe5b4hzgiiqdgjsadm67fpxuha8ayka92nbgxfa',
                proxyHost: 'ys825fg06uejv4dskgtdhpyfahmv5r0kcww8r652c4c89u2fc632tleyvwce',
                proxyPort: 6727803496,
                destination: 'r3mdsl6ng37d6uyt08p73xa17fkcwzts9yke59err4126wnatg56hpwbmaudog8a7fa8wr8r60sk4xoixqybaczgznf06a5fim9737e8rnsbpr44axo4vgyydh4rf4fals6onh00qlngm2lz4gl6ueaeiteahx8a',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jl36062ng0xf96rirq26unr9whsz12s8ubi06sbjnbaou3hrvmj620xiicvigrzbvov4ot2jxq3usuuv7ua379qqn4i78jjzkgwd6ineenphm0wkf8b17guiv9lkoy0bxrdazp4yc5olcxrdqrqdc2ldzfb4orru',
                responsibleUserAccountName: 'bxbn351lueabuopmnc0g',
                lastChangeUserAccount: 'kwhym2r2u9yaskzja0bf',
                lastChangedAt: '2020-07-29 10:00:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'm4ryrwnt7m57mtr8df0xkjbkx8jrnssidboou5tk',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '4j0hq1ocen95g8j02p06oegjtscwtzx13cyj6ujx0xmjewtnm1',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'f0hv5crbmvybcleq8cll',
                party: 'npqlfztugyma9nykgs0428peonnxkyawminvvhursql6y4g8195x9vcjby9iu5x1yp8fxafg9zzbw0ol11fnwqxizuscuj23ih79a4nzpff7c3vb2e96m9lqqxsnq8aqlnzyxopo5q4v1bdsorebzdsdh82j5ox6',
                component: 'efpneeorl9134wm20pacr3jyu9mznsk74jxmjjupz5vp2om68susqegcz06zuryw7ezsxkdni2ckrp9v2uw8bftrp77nzqbaky5dl38a97rp8ox1cfpeu810wjmhiut0shtg8aw0k2f7m6xdhw9smh6r1jigsxec',
                name: '0thhvg3rm1jbgoe2t00mgdfoi4sju3k8fmy2dgg6cspjnciqgik21je2s2103l2pgghkecx76fn8u2wohwt0rnh4kk3gq9jcrx5qgst2dknlx41h0szubgpnyjyozrua2afvtba497vees7ujbk4k62br9xkt5fg',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'lppxd8xu58kiqijxlav9121d5gd3d2ds6omi37box4ab42evh8e7ylkaij1yexc8dorpcyk263jk5zvriqrkl3bjhz7ux8o194hvb4oebhz05px7q5g59xgia2t1p10g1u2togn5gen7djxf4iddsq2d3dhfh6tc',
                flowComponent: '5ep75vvj68nbd9fqlsn2u1w8enqbh6uqt03pxuolki29y62rik95kgqhfrmhwgwbq90gb8fekoasmcvz9ckjt248v9p5evn4d0h7ofbl4ckcwy56v3jtr7ciqvndbotkk5ka1ke25vszbnlgxz0if42bh0y2jce6q',
                flowInterfaceName: 'ofgi3fl0a564tvju06m4d6w47425bqh51f6vo2zac227ac4i3vk67noqv4izhpnagy4l1qisw5276668ee4bu9ewz0ke9rhwvb0jnci0s1kykd7oefxp4zn2uasza9o8bxkve9ao3jq82b2qkqonmso901tz0aio',
                flowInterfaceNamespace: '01zkw1qxlavd358cp7vpb13f4yniq7rzhd8hllfl8vzn3vjw74cqe86tw6tfx8mb6qia31oalbb1p3nuln9amghk4z0xs216bxjwotssew5ilz4yj8gwc0l0bj11nx0qdh51zz3lf5c1f0h9lbq6rsqtcmjfdl0d',
                version: 'ptgdvq7vz0g4yj9a3mlu',
                adapterType: 'canhorv6u6oaqw4tgqxnrl5mogyou6k6r8gn884azxw6ka71gux870de972n',
                direction: 'RECEIVER',
                transportProtocol: '57t6zeen2456ggvw6hmek7yqswi9wn0axazigjtilp1mfhlqts26e5zol5v2',
                messageProtocol: 'jmp4z1ahz8w6zpei9coe418vnivo6kdutvdte9whet43fa5pklihfrtzi2f5',
                adapterEngineName: '1iamwgoxhq0558rijp4wymh3gvca7ktlmiqw9gtcrcqqhfhs5my0lwepw6781aufjby08k6ucj554gipzk36b9epapwduiqq6pee2gupwniim6emy04t77qeyek3pznawd96qd7gbcru47z1797jrihvpig5xhq3',
                url: 'eygtc4xntfv9i6x5bd4vtt63gj0c1gli1m7m8j5r021hf6u7p4ttrmjyf01h5suriz9jp10fcoti9aoatnslyndrq4cvopr3ellnxldonc4xh77qtshklyjf116bwg48hkhhta2y2yf0tjfznngsx0dpbznmoo122cdfhwuaoisesj9mifaon6ecipm3u65afij2vr4yrgvw578wq25n6qaibt3vh5mxgl76h191uniwqfqrwnumho7pvm3keldqf7gf06us81v7vxpytd8k1g97gw9ipfy29zwc1un0cacsnr01hg52z6umo8a0uwsu',
                username: 'r0jvf5ae5flx2ow5wvlt9fazmghh0yag2789zoe192b67q8a811566j9n2k1',
                remoteHost: 'wnjpu8503mciunycdfkqnbvu2h60hobsg0uuh31qcogmzz53fm1vqmnzdoz4i7r4cshewtbqfi8uznoxx57lljgyw8ritm71btueud9ne476n7ua3bgwjj3cnm4y6hfpvn1ga3ajt0ddnh1rumaeqknlij91l2zl',
                remotePort: 8027108715,
                directory: '58vduuwpk00hc6t2j2qo70pp6flvtz3f071mu7zdllaft70jzbjviezuchfw0f6fuu7s9bgv8hqewu3iptzdiwcuef1ckd916850yp300t0rdyl3resmkdf8zeabfoknrhbqur2ticlrj2g8z9nz3xamzdq4w7f8qo489eqbk1byir0jpev0a8jycz5rzrvazd2cypkjjdgbov358ymyqwlofrj82rc1wjdm5mfjge918ispmuw2xttiqh5sal44wt1ppjbo7leo63zhklemr9xsmjfez3quha4deiagam1uotq5iyjb9t9ijp96o31tpqxm2twyw2n6urgzw69yopyqv84oyjo9qzz4huipqfq7sxetco1i1z8eqsrhudq31jt5qged7b4splbet2m8yo0ly2qq8rdq9h3ihwz5kbrc9m2a9d5vaoksqpdi4wckfxg0kcirdrg3rc7q69xfi170g25xl88nouj33mlcld3h3br9ers3goqm3ossvbefob39uv6cbg9o42njxd8rh5lweajnuhthfuzabcf1g6gu2pi51as6vkfakkan2vlah7l7ylurnmjkobigrnhsmmvjrrxwd2e582lke66puihwr6ldrx4wj1lyis2eekv1b203hpr0jh8cfr9gbbxswz6yfhtav8ygjgt6ce3jpr3ulgvnvpd20ngx84wv566f84d3l6t476bu2n3ymetpslxw6czqi79qc6afz6iitqiez6pqeflx2fwh9naj1h8624hs736wt417p1y7xgh8kr6w1qwfz9qgseeyy4ui5xkm3iew51uotyk6mdw4p44le60oh69y26gxd7dn05k5q8tgnnxicf5uhlr8gijc527s5d14rfsr6c30aense706wjq24i72dwsw6dnfm9r9l2umpzohjvc7s0gbnxr2v0scddt92wfd1v962dw77soa9c2gqnul322tsxtq4sdg7y1jt93aao0tddm7qaz00wsdsbrno5ygmovwjtz98z2w',
                fileSchema: '7ntu6rchiakmls672pxayr856ur7mhshpbq440la0tjvue02w0ayjsob5s5uj0a5i9pk66gutt6z4wwvqbctf2n53y2zziadxnsp4uas4f2ryk9apvt4qonstj4m2tvrg33tzpm1mdefad0kjxpjq0onefj2cjlqjhei3941pj9kdilfru44nm57pqgox5ek0u1w9cyue0xbakynxaa8tp3qwzentu9w72t97kx452qoa74tpwiteh0ms86gddxhtbldh4an9eg52sromruj37iu4l4gol1j44fu7lxhj2vs1l37w48ch1k3o9cq90s6bytbhz819s03e9la9qv2ufn723d2or4qplf2ex9kparrvsxmniked4mn5dpsvwuc1tzms009c94g5qpx6y7kz8lah1jq9brvgg09fqpn9q20x402gsn6fkzg9a7x6aiuta9degt07ht7q7nhl2lgg9uu98u5i64lmcuaowx77re7uow6mhfcplcfsuej44xv106ohgiqqbrbkiymcp5j21yvw6l4m6ugzwj1a36kaasxh9g7x36y0k2da78ahrbtwyotlqpvartd73g8hqyljvm6sxs3x82wi1apxp7l98h4hmuvsoafyrr9xam64lrsnr1dndjb923froth9pg3vrtthys5cdbxxvb9ozt1q4vdpe8qija6hu82gzavpzo58xn2uyt1nqw6sxu5jmkt35c1un1f496338bse2om0ac4whdfqspem7x40ny09rvhcigqcjax13qks697yp42c06zpy1jnz7tlkw577cs3rf7k8s2gtic09wroumhexpspmzehmrupgpcmpa3599jxait75pncvimcyagsxjptm02uqwux3x2gle1w4cs7h8ld4n4tluvelapodyrh6rdpo00kblvaxggk96pinkuf4vpn2fnltdkoaiwkad8o2ngrdsepbmq0gq20t1udf9egz314ldq0734v2g1jac06gr3n2puf5i1wdqo01yza4q1',
                proxyHost: '5c3fe9h5hzhit50u2jnifc4qlqt2ulem3lceg7h4cpbr95qosn1bsaidhk3q',
                proxyPort: 1983517256,
                destination: 'v7axn4x1qgozewtq2uuvg3qm24p5nb7bm1aphi5e0tg8yk7riyretxh8kvl4gru7e0sggw6ymim2uqewcz4eor55yiw26lxvueb6zy3xkclrbn75tjp4noxkkwv55j0arl0drdk3dag6lpzsy7i9qm1cpjj2y1au',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '68nhyz7h06rng3t6jos3aoffe6grwin0phshpy68pydg5jqbbwovmttbcglnp1gpb1272q2nw6m5svp49ea55kfj12d17le4vhvuwy8dm3oaqvfxlflk5mo30sqbztl94l15o7zqwhn4luj0sxoag6vpaofrmx4p',
                responsibleUserAccountName: 'lt4811nbodko0l088tvm',
                lastChangeUserAccount: 'bgnrk0dmbfrskfpewx2m',
                lastChangedAt: '2020-07-29 09:03:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'dedxg89rqygatum43v6hue2xdndat1o1mccb6ui2',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '1v73905y4ga2axjgm4bbrgujhxhz5r35z9ph3c97nc0ld0kdvc',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '5rl7sv134z2atrzkc8dp',
                party: 'e9u11fi3zg0szhakhmgpx2424s9xqobgn2zjgqhoylo4fdin70zjgpsj09z9ykbbbrn3vqqo88d9l8z236jv94xzs71zim1itc6jhzl0nuqosep7jry3ojp6wj3d3a79r8diqnubal0n9jy60oo13gxnkp8ntdan',
                component: 'uth7gxjseckvewkvowv6pp8xi1wyjl1m310ryttw5iyq378ifwwqmhgkvga72j98bcqpctkoaq7nuyk2v7cm3hnu6sagmb6a56kdk3hl1kkwswifpt0rh0hwau7gvfyyixdcs45ahbwghfr667u8p9p2rj9q84lx',
                name: 'vxc40ymn17583fv6mtpud6vipuo97wk8npgkjb60337zq07p5ab1gd88np7b45rtjig9od9cy50nql8kcj5mk6wb8m45wdc7jrdyhf7z7wqd8xbb8avg75g9qk0q3s0pp4osbsq5kadvyn9rbz3khnsq6g9r23pe',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'usqvzeyixyzwhky96t24e7gw12oakwtwrr9szkrc43528l3f9mn5s3djtfcx2w1weqspb43g23qteqytdnmf4jpffueeuah969b02rgsxwj6j5sxw0wfdqu46vgxuknof7xpyqtjhc8hsjlmvmnby13jxk3phyw7',
                flowComponent: 'i1g8uvp4udp7g7m72k4067c4o90q5fn69kwffyra2oyp9b0vz3qdkihaqr8xqucejwzb6yurrkf69gtec48lfyzz19dvvfrwvtrihlipcyqq8v9ylx7yjz4479hupsxllek93489u65af4dgefr6o21925lxcalu',
                flowInterfaceName: 'bifjyhzdlflu99h3d43w4vx5tjyko94lbhx4x1vl7q73ruwdlw56rk4mcl0t6bkmtwuxbkci4ra0yjznwggnuzxa6r11ga5zviu44c07sfgrzz83nhkz75zyypne3erzzkzv4ophg3zvm11ahmlz68ucm4ht0e5yq',
                flowInterfaceNamespace: 'h6quolvrf3zsigkvt82mhsj3c6sx2qfidpbydj5gd3osevw1nodkvr4nvf68owxo4fhojc9hrsd7cq7hafkdrmzz9d7nh68zpg61j36qoqf5fdi21hyoll3onqzwlpcuyw81s8tdabkon2ko7ruqzluwsparohcl',
                version: 'zj9anrxhd94h5ksbbs6q',
                adapterType: 'yxbe3ybrylxyp0aqp45a6jkdiyyhlw84ic9xnl9ztwpvr30mg3762mev0wvh',
                direction: 'SENDER',
                transportProtocol: 'llfyk0tfhs51xffzr64n89mlhizr7hprguxitcrefieh1504k4t0wfazzv6x',
                messageProtocol: '5aowxpmwvthaofdfvi25wkxzczjuo52smf8vjupeoaet8i9tu8dbu2sak4sz',
                adapterEngineName: 'mkl283aawfvf9xrysiqtlxj0uclqyljmdwly1ex1yr81tufu66psrl8y8r48r8ywn9zxuxlof7a58x1wjd4njtcsy86rpa0pc90tyst2794h2q6ntrlsvfrx6kjywypntsh93efzom5lp7tnju9yik7rtqom86ca',
                url: 'po0cchmkzhzsw7229kf0r80j9r2tnun66of3up9vkmpgn0mgujdwocknzdi5tasiskbyj2e7n8t0ed5nucy2ynldgxo2jm8kkngi6625r3iety1suymjwsh50znjrsn18kwio17h47zorlp5ugfcrv34ubdllt12we10xb6fn0wo320bdg66t2d1oq585hi8r35rf0e3d88hy269v8la801qqbnhuvzee6m63djxsjq9q112m0wylfbvuvepa847gx9abs5yaexk1no4shffw7bqsxbqes9fuaq9gk2rlh98m9p9wuyryov441u1bbjh',
                username: '5ugaeysfp9a8pa2slu68jj3rpec3wfqgh9gfyrtdypwp1u1h0sg416rut4sq',
                remoteHost: 'co5eh1601xdpsrdudipi6k27zio7es5dd6q79xj5e7jvmk7xiwstbf81pchnzns96pwfvudhyg02jbfq2dywh417ckwwrbzkw3jajb703l2l7hjgmlq1bi9rp1epzr54yp5wo4wqfe6265gu5pqg6k62tx9ir6lc',
                remotePort: 4337790262,
                directory: 'kmgdfcglmlp1teg8b185l8nrc06jghmcperz413akbcohtgabdw8y2iikpelclg1y4j2r1j37t29jwhq9yntvr21svarjw0nvaowp731tob85ngcvluuqvupmhk5cl71aebzdsq6rf4oxlhss8hlp1jsi7702j0behivb2603m45s97idqpx8yfo1s54r7ijetj0texbngipxbh4oe1o5tfur429p21gt05tonwlwmqyzmkug73kvugqnyq2iswqsb8amnbwh6ruhh4ayk6k8errhvtc7bl9m8mis0rrrcmoykgk3fa3cz1l9giq3mh8wvu2vxbfqiyc0brutshk64cbib2ttuwebeb1roi0if7kg8qz9in6vao716qgogm7hzptwmxjaitwhv9737manahalfvw4njonhp3gek54un51t0jk10pl0rnxzbu6w3ivr03fi0fxvfphmiyc34pzqfblmv2dqiydhtfp4ijcfck2wz4tjilk5gmnjxlkm1ugdh7lux9fhci5cl9qgi7b8z086y386vf2gjijx8euq6nels1vt02oop6zcljqdq24uymbdhztkds7j4l2x8wyv2b8umht2mx5dn3hgc834tu4fdec0ah97r58hiasr8eugd6w1357myeyct8r8i77qvbpyih3med33ezt9sy8f89h2ws2c9of4i3i5i2ey8i056uak5qmynszgl9ik310bevm126nivvi0eqyhnp5zvjrzrm5h2zton70orjd52ytu5bbinl3wbxiq4djil38giq9u5m3ggns7prffyfhlhskd1593q920ixaokwvh3t2bx9ltsbz59eaeoxfuc0x0pufblrcign8hve7c1rfjpc4n638u1ewq4t2lfwqmrx04hab5qfarb4fy4xfbao5ddw3g7zcyw3d2fa0ohjh1ojs33sr4s1x3zhltf55eemtdumebrwvhfeiekeo0kfswk3ma6qvpaf5j5xpw30b35wg4hx5hvym4qm0zpcd3i7',
                fileSchema: 'vga2e2v3k6qaxkxf62t52zsyoxf7m5scpr0spaslavqviziyk14k7xfm7ig0vz4xeigbbswllikobt5eetsmgo3k23jfrnvs9j2q868xvtm9q034rr3oyolans6os11v3yjhl5dgzpgtkc24d0vfxdsa0m3kf578roae1yqavmzy5hei32ilk07k4p2g9xxkhnx2c95dzsfplyk28elfp5ylaa7gm5hkp1y42e5sjrzjeeil7ja9muomn6ndbf5ouigibc32i4zaavcxcvi3sydbjo732a2i7pekd4n41samzc3r74smbtkurizl7ckfcp6vpplw4jwq4h0ku9dskp8rkisvdysmmef5un4u7gt5z0s0pad57zcjwy8v6begh6u5vlpajbll0r1o3zmjcq73vfwjuaxonw6vr4uh8u3w25h3g6p2by0xojzea0ivrbccd8jezyocotj7025jqvs549holc0t1o4ku7a41q8e8jxa7hpdic2oxo4aba1hcdmu1vc952lgtqmgu3z5zz0bg10lfg8nyehyoqppf474obhedo5w7mxzhfsgp23v1rn141cosrwszg3yhfmvjt2qj3wows241qbwnde842s06rgywqywzwkffhk3xole3vanjic7x68rkshll5enz0gb1cbhkjg58psshkmc3oqowsvg4mzb8iw6roaawibjepbaez1ouwh3x3hx1k20sohlj2c4b4427h9kold8wpkumkbe79fzo5lp2rggjqdc5ywtcnofk981y7cypb8lwmfs013or1zuqqkcpu2teiwm6w6bd71pmobha2rhhudkt4zsuei0nf377la19bv41evu7gjkekseg80tbfzvh96wcd755ykrrphwutfpips44888vyeiu1unsfgf7amq7lh5qrpu5jtgae92laalegutnxbt4l7sjz9mg5jo1qfxmmmvlmjexxgql3i3qh1mcfko3k4hs5z7tcqc44vx7llkkm0gre7w397ou4l2puzn',
                proxyHost: 'vp5i7gah28zkbfx781x7k3j45p6qvt58fghaye09evvwkp8jepg7dxd3eqch',
                proxyPort: 6238237169,
                destination: 'nh00bjvbj100apg3vk2qvudya27qc49dm7tvn4nd840lp0vpwrhb7d63ekcs9oc6fgb7p71kt4juc7nettz54fop8opxb85lxzfjz1rrvxy3fx2k6ckxxufurbltlocv9c8maxh0f6xyts9um67xgbbdmzin98zf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2ehnmtzak9kxo5eejihmkouzro0sm4yyrybvg5zt1sfzmytf8y8fylvgvlpx2g4rdyhjxpotgwah2120mwq3zqa5s1hyh93z4uwiyh5qu9w5xr120xr1mipcc2vig999lkwznm552c6n283roedxirnstsk95kud',
                responsibleUserAccountName: 'sq017bkrcpzvscjqrucz',
                lastChangeUserAccount: 'pfl7owfrlpks43dldlvz',
                lastChangedAt: '2020-07-28 20:42:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '69ponptt75r8d2b7k6qo6htof20yyhnsgy0zhlsf',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'rzczihvhc6a9i0b25jy2s6a29fu0x2jxzu9kobbzglaq1fkpio',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'j5hf9ldlh1xgphibhjhe',
                party: 'cyaoe5faf39on6wuvit0pu3i90h6wygtkdp014csepmimw98icx1c6ub2gwdghmexdwejdvepicvgklm7i6oe1wwvomsbbq8cr1tcrni5rie4mltd2xtv0wjknp1tmjywtq53uugxfibn0m92mrt0b9rg59edzhn',
                component: '1yan32i342042a48twhasna9m7pki4jtsxdb5ed5ypx5hrnsp8hlpiv7x2dwoypddfkero0arm6ud3e9dpqdmeg1yk6o0i8x7v4j76eaxg8tgehzwyu1c1tv9fbuagwt0m271lh3i47g0ynpbppstxqo38qzqkjy',
                name: 's81muqdy2sc5vpcr3qohxgerqvf69we1bplcq7lfipzl8dkgo6085sezrdgdcql126dwgqc2q2hdley1uznf5weygesdl1fjs1ayh89yniupae2gya3dbs76hvdrrboe6jwtxjdy1dsqnlkal88jzuyulgtp32gb',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '6nw2r8hksyhzq0x5bnqvdd2x06aljjdvt24h96bjgdud3igxemgap2gywc0eyhavx5aob0ot20xt7pzee9anxrarr49vkks2gddbux4ltg1sarrxd4o9w33f5rqgts2w5gs393hnyvx7gdfjs85u8pr04uyqbukj',
                flowComponent: 'dntdt75cp18pnsyvdvhbyj90n1sar1aolnapcwout66tvn4un88maeypwri51kmt26ds8u0k3ckd27xzniixx2x2x03erq8uqtp5xy73zyodqd7py42pk17baendzgax1nirnsmci29b6kynu9f90bwt4uvxn1q8',
                flowInterfaceName: 'mx9vkebexeavo5ov55xg5bvceafe9de14upzkld0c1vlveeeepttajsr8b5btoo19nv8ocpboo2xr2vhiloa7zhgg9dy3lk1xrhtptkcped4939wfnkjb4mvicx2ehfqapt3slhzqih8b0kgphl0atm8b6mvv277',
                flowInterfaceNamespace: 'qqxurs4cxsxgricz0y8tqc7ueaqpcfi4d22yrze9bjfmkbzm8dde5hq9w6n3jfnf1eiqvzenwp5t6zvl75qgrdsvd5pfnozmt4c5ays2xopjwvatuvl7hm24evtpbr0kb0lyjgcuq2ek2kbn8j5752ndyoolllbj0',
                version: '4am1cxd1357dkhwu0dbi',
                adapterType: 'wm3ccfpgkkf3zenzug00ubbe14uumdwrhcctw4y4ln091aeba72pnmnokrkt',
                direction: 'RECEIVER',
                transportProtocol: '56ko8fb6ajkoer3wf8jidbnihe4vtwh5oordbsm8m1abz4stqrqj254829gr',
                messageProtocol: 'kafl9zp36942b9kkzbvtiaiw887q487j8lehsbghfq2409kiy6yc7tm34tyc',
                adapterEngineName: 'ern4bue4hnpwwqnw45bur3vita95xm0odls8iw45b5jaecl04w4gh3v3rebislshmymz2vx0rje6l6ud02tgrlaw3k4w1hdjemoeuusta3w8qmdcbqm3nujo8n0ae5qo5397ztl2z3lh2ch67y3tiz5rmw2lk1pc',
                url: 's71hj003v2ghvdqkx6e306wiw14mysbe6tts3fcd8qddh6dpjjla9jf58eug51hirggrraral6p2vces2lvfu6sbe0uls4xfeld4zz21bp0h3mztxsubt74dh30gjx3iewbvjngqyva0ezm1avo41hjyxus2n87pabkldq82q1au1t1fk48rt35p4qq419gzg0smezav7ctit5jazibmtvwwl0s1485jjcwhapfuz4692wgqk9ipd3jg8on0pduf1v7kgbafo3ts91dj1fwvq07v8hspyuk9uvur1d83b5ovpl3g439ky9011lrg855n',
                username: 'may6t19omkgn3g0ov1xep05j3jfd8f0i0ns8iaaowxl6133gmrn950ay4nqo',
                remoteHost: 'v4i9j9v3nx10y7rupmqai8chdqlemxzbjidx71otnz4f66jppha2445bvoqlwjyz7qrnv1kxfzg5jxwf0yjhh7zcjdpiz7kcxkkj70jgmfeawrhjjsm42iohagwqwwsx8wjh9rcpmnublea8jsziyileb9jmoix3',
                remotePort: 5772435917,
                directory: 'kks2oyovxq2smij9wf1o1vkez8z6o4fklphg58ayxu95ey8r4ldxd7v4rp7sa91gnchbsupc97nthfcshiktp7fhv96qpmscam0qnaztqb6xw2erk0jqein69v01ez86b7hhnlizme67fkz54hw98woopkwl3him4y8yocrkhj1ejl4auox2syye3kvqc3en9guz43ycl7puip9u807qzdf832yd8d86kz84zfog6f62f4oxuxb4o531x863mloiq8fb726uf4urytx7yi2b5jxyvk7nghp485f24gggacowy2t85ca9x99tjd8j40xh4nbxybs7ox549t1tr5hv5jwhnq845gh64hqxuv3krzi3tkehda1kw81bsq2st83dryecoaluefpja56rin19nkfb86y78185689wf3gm54hqtv8judsmws9jstjv7anwwtt4kewg4wha2db3389vlcpzmgjum80y44rxbon44sys1afs02v1fqvb00n0aoc3g9qsr12a1h6inzkkqnht6sokrm6ynzmupv3j6dn1g65nr6qs07nxbh4er1bkd2490ch1c44tm3g9tyim3akj2a42qbqa0ob9t98sa5f6t4rhdpxh4bwb4fksvr8t3oeen4y29oxk30ela9qlw3nu4lf6trkeoz8qa1368hu6hyg8xea8g7xji2leq8fcs0jhqqapf36loob0gcu62w96ms36wht3z0xk5jnm7xngy9iqaseuckcmbgi7csfjeultixm478cfqt9mwuotopi2o9qmbtwsi3ol16q7gb9zynpfyebo02ykb54zu46glse7fy2u22svxpcdio5yetxr7tqvb0yaw93eclhimgq45y9o0e4n7482tar1izb19cubgeqpthzhb5h7y7zy8ioehivyhvxtvhvau9pt5nygpw016zh3oe5z9gj56afdg98d8ns90z95qmiaivdho3cminueghhnicots3jjxpnvisqt3d0bgy9kdf7m8yg2n7u5',
                fileSchema: 'm34hc7vmiipqmetutwjnmf4thrmnx7ehqj7nhdgqoficmjpq8kxupbsy4ellsqtwaku1l7wx867kqoj46it1z5eucijzw2na05jyxreytl08sq8me44kdbwq6o8g90ucfweioa864d0510pdk6y89yy18tgwj2rbxzs6ar0ie1i8rnxfo562wuhfv6vn8hffz69mnb0wn1b6sswrd7olhw665k78otb1shntjbsz5u5y14n1ap6a402gxk3w7vokgy9ahcix2dgi7w6hxtuapozb5tocp5eauhfi9a2upiav5mjw7vohddc4vc2u3ya204zv6vd15rm2uiigq6dh8qgwvgrakwrsbvj3s725g0qqnbphm1u6z39ay2uu6zn67i17tn7ghjuflo3vyy4io3lh6e4ajggdpcs7p4kq5ijsqbh41d688mo92f3sdwheho8brh7m5fm5w3qi9m0b51355lfdopggnv1ivocdu1eueas9vlxle2qsmb11ygdxsl1oak78v14x1d2tvwfn41rcgfozi8fjp5f8fl1gfnz6d8ffz4bzczw64hk20ryiq5skc5suydmufhb6k92r0zgl1vofmuzg5128tgltpmt3szxb42h6lkzyff2pjtstple2zm8hlu678xb0lu3ignfgoh0yzds1937gloxpc211g7al9x3ye0a744anw7vfz8tlwp0lna2ikbk9e1wwsy8x5h82gvmcmzvvi5f0rfh6016naxbgxgquw2o4hfwcccbe8808jna9yb65w7nwkydcgpsxv207vkm4wmnyc8wa2gooyxypbwzkjl7ugmuoebi2rdkospu1of1ckewdb945jxyf90bw92qmva07r9m120h5nkska1mdxpsuzyfsvykj3k5qeijaych9003nsjsgnmajz8sz1dr8xo3q5x8rpl04b1w6an5al4q6pvsc56wmpoz5b0gididc25n8mj6h11mi33ll3opuhiu3atu19j8yplcafdog2rttf2f7',
                proxyHost: 'pwyj3yrun5n2js5u0yetjbd3xj7k82ul6qbjmy0tvr5kaktze4218yxphn56',
                proxyPort: 9527218571,
                destination: 'r90o7mvl466bit7n1bfi0hqfdd109esk48xd5964mz2z7x8thuthdpox32fgsrjm3my1aan7sf1ozvjjyt4paoycdbd4qtsh02r84kazq0dqmyp5k5kiiogrqymh6d32v3xbuanxn3fg98tfvigiad9bit853wdm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8b0p04tox28213fi7kf2z3xm8ywk1k4pigf4bdi4hb2gh4kln6stchsg1otvq83it4yzk1uvlyr2hihgin4abba32f003nudjrovrkqtqstw4odo6zxagghjp36cr7661mg2hwt2oqxmjm2ftwalxktwle7e7eom',
                responsibleUserAccountName: 'i4bm9wddrv6fcx27k6pm',
                lastChangeUserAccount: 'glq2c64j7mwy4ezgpg6b',
                lastChangedAt: '2020-07-28 16:43:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'egacw4x79zl7vg71k5475dixw4yqpfttvlp2zbjy',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'kkx40ld7u6zgwyrbq1u4o18cekwb5bh40ddbqk42leydh18itr',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'nlk9yocd30l6ph6p9xdf',
                party: '49btce4pbzw0heauykobe9d42cbw03yup57p0shn7rzb257suhqqecl89cwf4ex4xa07lyt7oiu4dqq235yozd76buc24qexqpab0mexukvgzzsj2bqteiqezcfk2f8ywhlt6rp3qsuke95d2htnowjaz2z0wfbv',
                component: 'kx9uvf3hse6sk0z1lqhrjcid8sft07dsih9qbqroj2qxtwaobobrp4btkg1jnvlho713g4tt3t3odybqd8voyy2tytu4ifnic0wavarngxg5ia5tugasr03r3t1uox1ls5c9qk00kb9wdcjxf871p493yhns3es1',
                name: '63je70lt66geb45tt0lgvr758wmc44pol36dp1evwhouh06qpxr77c2lqaqu6kdystx4gl5iowsmuz8gowa4c9arqabsonaiwytsxh64qwqrzxb5hchcnmnpk4qrzuzewuzwmuu21kb8a0k6nn8th7p1bjvbuf4e',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'wkykp7j7dqxgqwzmshabztb8qirq336p8r1jkai6lg1un72qb57hbihfp7ae2zf0760398elnfvaild4dtdelmc2cipdioka48yomrj7812mer54izna7hc9xy7nxndx6sx955er58xh9jty41z5rvcdqk7mt6lj',
                flowComponent: 'ajolq5zqirotwrczx7ximesltlljit4xji2dvvt6cyxiv20v8nl7e8lg8rp0jg64vyef74yrp29ci6vfg174tur0lffhvky9ansxlx0qt96e21ya63dru3hgj5odir5ux4redvmeyledevteurkkr9l3eeiwh3sd',
                flowInterfaceName: '204dm4rofrxgfk7hni9og8m5b3q77r9kivup8r4dmjz0waclm9neujrqavy38s8zf1b1g5lf90u36l3j3cg6oke78oscrjpui8visgh3ihqjtmgff7cpff2rmdhykbeti4gho8rjd0avpqhtye7s320noq1luaex',
                flowInterfaceNamespace: 'tngtpfzwow4sh96tvptfn1h3tb4qcbyje8lm9gqstaq5gsi42g1duzjmyu3xt05eqwuycta8dr0r6jgwvdhywdro63o6mnhbfihjfi4byginbqm396lo7qmquep66veglx2n4pb0ufj8yv7o78vzrgrnsf6k0k5u',
                version: 'c7gigmkbk2a1jsjbixl8e',
                adapterType: 'lfxsd0p75io73ll99omk9lsoyard4e6c13sgk7ngfjpdtyie18cky8if509p',
                direction: 'RECEIVER',
                transportProtocol: '2t5t3mbo4zdrscp0ah266vq531kjvvaep9zkapvriz7pwc4qdbcmgw52mjts',
                messageProtocol: 'hts1zam4cdipne9d6otj13h751a8t5agb8r6jfwtazdve3o2nlaspiggi8cy',
                adapterEngineName: 'a0vdvprj13rvxezq1k3csnb8giaaroihj5qlqhyiwdfwrrwbpvubrjgtuewkeuvlqxiryvkd9do0vqqwgwlv42gyzv0ygefteke2aza5udrpozcbmccnvm349wve1b45jldy3vn53t38zqpsrffw8gmvhy3y07wd',
                url: '4ckgy2oe7065ax1cb8ud6qoxc6ob5b7w4vq01dgivnfc9dyxxewbzmwbrny1331ud3nalyrry97tk92cu4yvi3imwwj7o9avkg859co8ko2nijx1iz66oggsozfbn63u5y7z463dumlkjmlgw3339sqik7mqrx674h9rxvo9fiww2ji94rd4lfmhae31wlnpjp8j2z93chl8tivkw25asps286fj6xi80iyzh0m92aysq04lh4y11pve7ka2z7eoe5j18wofnxo3h7aycjudwkvwhask4eiwzqzh8o42j9zxicvfy4m3aldszuybqbhw',
                username: 'uiwz73btecv6u3mjqeqbidsae5g6e3lsdicscwazdk3j9vpvjgvtmzqqf8tr',
                remoteHost: 'ei3prak65le5pqek6ogi46v8ifcq7bltcxyy79hhmbgkqr9ttufi5x1w61zbjclta650bjczyjjrb617p4d0zwhhjb4w0uptvt4gwtrilo73ppgbfakpqze54s3uftn7ng2apidak0uw57iifguy9787puj4nfps',
                remotePort: 5163283704,
                directory: 'jt2g4bwm29gboz3dz6pz2jeb7iylz2kpxdujs9ptvee4vcp1clxvqs58aezr82fejxbn5ilxg5cqhe9nyqq3uxu4iwnd8gpoldby0kpyb1k8ngkujiuvm6afti6e4v79sesi3giafo34zrukft7euy20p25o61deexrczvdi5opj3vkktuzrnbnzkoy5f1wmt18ld454qzcl5kf4qd2f1gmu82yynbnje11g1ygyox7kscmn26888n1uuwpvffc6q9jyw8gnsinhplr1myzrf6x0ihtf0pcf3bwlnwi0qw54apur9445jvnwg2lsddz8oznujuzu06gaf68e1geulnjmv7vs3p8uqrpczrkekeepabf3kae4i6hhlvyu25vso92pigb64k1wo3dl7a02je9ep4ksgf9pl5kdcjo8rwea2u48j27cqzx9ywmi2swfqjro36vnsxcq9755qfju7m1vxiwmw0mt2f7zszrqmxvhxczc0grc0n5ybperqs12w5ps6uldckunytkqrwf25quxotex4f7c69z9i0h23vor4eyvtv1ka64mw1nodjjs2c2hr2yqnv54z5ukhzwrl8wu8ajo9zwyxtxzr0q0jzstk40vpxxyamow28jb5ve6uhley5p4985oof54nww37hujdccc7k44n61gvr9j5buj61vjqplj0d72gdj6eab20khx24zjtuihrffqbiqmlzfke1iq2grxmevaierhg2w3ornbta3w4svvgpip64pjccktiectmc2um7iydjgheppptkt0el7nqun8tbue249mtzrwrsaud6zyvzt6gpn0lnioiotsbftdsd3d4qndeg596isbw3jx2c7cl9ug4h1ejyvd60iad3tm1l4h5a26c3dns7e5jmmguquxntjeto6sfgm0u6atpcgkplrdaip5genzqdy5h6s2d375e8yque2bxu11shsxx6gn8dj5j6ukmuf7xgzi0ws77j06kjsglasdi1hpo7uymmm19y0l',
                fileSchema: 'fmbmbyhvblu0w69ntha9jm4ayzmvof2dyez965elu8zphmiawl6xk8w7b99a4wlxav8xq68su26msne12ws5896b9g6u36e60qgr1uib27m1xpwtvbcwke1zoedskktkgmwl5mc5l9k56xq432bg7nxh8xuc519sba7snw528ehv8w9vhsn9p5lb3s7avf881l372e9bikuo0n29xek8us3h281crfbr4wshlm68wjnl4z4hfslkyshstr3g8s5c420ep68x60c7njl6hviz0p2xzkn715mv2hokajyme1msr9nyrfxn5rzz8u18tqip4oy4jwscef9ww28fzo19xtoilhufwl1vttqplvrfek5sep76xk4ag9sbtr2n3xsz6ggww9jq67ea64c58on2pr78s9i8femtrjudblr99zswzojj32mhhl7xiy65pzm28s5wqwv8p7er5fc30v1qa2bjkxb34tg3fx5ofgy2ve7qkbp6e6lih0zve4lh82lujxqhst84qs6qb4623gpjx0j2u8ael9436svemh6bh3oxir3bq04dulwe7n65w1zwgj3kauvzkni6vghhc4md41kmtllr8v4fmc9a8qc0tyna8sy40puuklg3q8xelf5azkw7fg2ztxoed2omcrmwxmluflyttxmueqyarp12a6wiamtt8u9wiv292v4z5w9qim20ckj4vm3gk70ju1vq1j5yxr84iapad95u9pov9vxds2xfq66n7v7662gb9q1flqn03l28j2rkix8q2jdhd4avo7koln3vquoagw6kk31pa17n3h0vbq33pv1zfm2jdhuefly3djhug7lb8ngmo5z3gu325qegy2b2hn2ifemz1ji5bl93im4efxi6ni2njnhljwx3zm1hly095a7aro69yhz0y66yjhs39a2ezz8jrm9mkp8ollru488c7gmg146tykyx12tmhwzg2642r2rv7mabin4xugafh9yzo5afidp70diuj6yararrbt6j',
                proxyHost: 'zebapoqctgrmb8kez2786igf5rqq6q9wy41uoorjxk0zgqe1fecu8dv07b1j',
                proxyPort: 1603266657,
                destination: 'e3r9b7lcc9qk6zfu1fekmn14gqv4rgx8empdt5k7v015jw2va5yt514yl5unctualb9zatwsb01ubcvas08ym6euk9jp86tl48dx5l522o92mwbgy2aj7bqkq71baj8h3jkvqwm050gfiszzeu779t121gtzwxc0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'b1fp2ingrq0z3nj9z1nmqztybzncusgzmg7kpvwhtc3xn6ngukwm6yoyb67offamcxbjyra6jtjm6dvmb2cp80rzllc5zinxmrdspygc8ulkct5nlwxsgczo5smuqr13q8zgvi1ee3ed0ggfchi932f7rt8aep7e',
                responsibleUserAccountName: 'fm5ceacc7oe2rpzc7y6a',
                lastChangeUserAccount: 'eeo0w5vmxd9uynjuccfp',
                lastChangedAt: '2020-07-29 05:07:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'giv3w8dj080gu8f4n5jgjehw347rwux7aqy6xrw3',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '5hlhj2c9fqfs3l6ea1ioappsm44j0w95fcs145op9py6ehy1rs',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'f6tm5pana1ifafa1rxl4',
                party: '139wbczlhgsjj4zfqt2opsgj6n4wpqiio3vd112w9wer2gnckyppgtu8uvjikyo3vosiipe0zqhpd68c0kycwha8h0ahujguen2oo2s4lb99aepmp1akxnpqdi3g2cimpbtobzn4nl24t7cr0gcc5z8ysoubdxj5',
                component: 't71exfzll72fnjvamqog5s5hmaz8thctp6rj77opx5yhpxux2ievjw6n2zdeg6gho8ccrk8kahrx1dtnqu8mw4smj79wry9e1zj6wk840ldmz83n1rmiz5yeiigjll3zrtahe8civ9schp9742403xrz8cqeahqm',
                name: 'fwzugwmjjlkyevklj0m0sfzppcjyz807mn06l0kvg5qwezyl8lre1ff8wyj3cglvbzvqj6mcfx89ffiva1ccp3gvhu78ofkdwhxkppu20yiy9k25cgoah4vfk7z0h5dvjzxz9hx9po6x2qe9ygg4whndtfe0cy5c',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'm5wjuzwugqs5twipfa2l8uqujoolbeyq393fwxppyqgzpcfhqwm1hdki5m6is3p43b3f728rlecyob3ukjn7552fgnom05m6vol425rt0g46hoyxpvjow920dpg6yzh3lh1opfhu5b5jtt9zuayxsstu1hcwaxt9',
                flowComponent: 'slwtfl0p1z5ib7pp55qf6yph22f7vinyocnz5t1yj3zneru53eznthuic4n5n359dq9rzvhc54l9avucxtl3fiz6y7u3icc0wwpxrhcx8s9z1itp4zq8mzuykrolslh2xsiwnhsuwa70tnofqhyc3kxng7pqr2cy',
                flowInterfaceName: 'u48q2vdos3mk299uyw0v7qv7vim1mgukifjtcp41zl503i66nco03f1bxnzwjxmmdjxwpime6wcqouwx5vyfmr0kp9vf4uzatavhvdbjo99zo2kfjej6j5jv1cqfutl1hodrfjou9o7bsh014mta1k13r83ryq1t',
                flowInterfaceNamespace: 'n707m5udbxzyk24msj67p1p7fmm16pqvz3rc5us0xr8lg9b4qe1jc72u64ruosmjp0g8zv20ukpbuw0jph9w1n60mak7n4jndfrgomhqjc032zvsy5wsm3f2re4jrh94s4cq7u539yfcpqw4iyqgzew4nz161f1a',
                version: 'lr49wbkfzy6olu92ue70',
                adapterType: 'lxmracmszb1sbu1605xy2m2szrcpydnecsvuhgu398ssrns8tkimb1vfcdn0s',
                direction: 'SENDER',
                transportProtocol: 'c8drqgssw9g3llyc2dnr3zvuitik5y0lkuguwesy283h9l8giw9io0vzt4qj',
                messageProtocol: 't0ac179uabgb7bg2k8vk3apmv691npd0x88mtkndnb5fyrlhoj1ino1ijiqt',
                adapterEngineName: '5ynnm2m6jli85gdmmft8p0xrqaxt0ppu12ujgmuqt1pa58hxdwmxdxt1biuv9y6to84pxww8c3acm75da9o4zj51eqsgafcndnx2hoqw0ib5pfs9v2ylfjdeoft44h29zfqhv9abuh38z3bspptw895fywb6pchs',
                url: 'dblkapsfb38bysxxa0g2q31ogt2i9z9ud6hcfqt5sh2vnyzf80uoggr1jhom7u6kv2m5klivotj61h6t6vd5gu7twghf46l1r53doq6e7386hrs7goh3e0gevk7tqhuajkhys5to1w9ooqs44wodkdegzyhxuhnvpb27ccxuzomkvci1npw9bs41v8x2zonwqis5h1wjlw7vhg71t17xz63yioq5f7jc0nvi8spwz1bz2f0e5jfnlnw3w3wigk09exkg81ju9eequ9rf3mfdyto4w1tykak5y8mn9iuxge1elmawljeq6k6zoo8zkfc2',
                username: '3lpyxna75i2uc3b3dink5d2y520x4gewrjhdcvc2u9zz5097uxlscx74qu6e',
                remoteHost: '1zzv0efdqnml1zciivvw0yco960wqrjyxbrzpj64om6wd29wb8b0zmdtdmwxogu6gllqbm80tir9umbd88gj9xt4f1vn2rtmtqqo6zh8rnkyn7xu9ornoys8wz6kjacmha7m44xxyhjp5qblsbb70lxcf881eqne',
                remotePort: 9600874550,
                directory: 'p42yi1gbkqguxkrv679dvwbdvvmtc4twwox7qs86x625gfp9qw7d8u1euznipkdhb9o61pj501ley818zmp8w2vdo0zurcoqp1e9ysirfji2cisnb5guzvjpyz5l9zrf1vm5mrco840k2n3mtz7sztoq93rbpz64mu77u2dba8fuvq957pluvlsavrc8a3xw7okesj0d91wl78svgifzgiccy73rsyik3t2ahkhufg17n6nfyc26dc8irhaciih7pzt4l1kh0zpjp1m7yqz789suxaogw76acvaybaom1d83wfna263dy2yso849e6fs6bdv00431xooclitwbsi7ltwtfz4sn26e1isu1y0b1ko6gymdgzqa3ft7ntb088wseg2d2cuor95w1bm8ohjxdvoxdws30itqba4zs6720ywu1qb1rm7wtgvn82353r8t6zt51ar84qbjycm7lqaiqw7jile739t842y4cfb2qkod5obiqkfs5b5kf01n7yi4inle9rgb2o51fw745eejdkzxj8r0jbi6uuzl3xbe6qhft9q4vf9ymzaavb4drbnu0kw3rn8reyfzl8nkk31wwly8giov5vemu35xra7m7suyavxzzv1kts4k49a5r6l2nlngz5zcpw92px8js7q40xg96uh7s1fne11ooodaj2111t03t4le1sxlu5xlfjae9hq6atgblfc8gp01vhwq2oy2xkjj31qi8l4p5tnuobeu5bg4nkhi61izk911zuw1n1r8tzo2yaj0797f3a05x74h6zsrtsxf7o56brtgw3n2j18rvt55tek35ziuarnjt9a5kinsr983ishy5r1vljpz3vhqhj19s103z7kmjyvlub96vard1agys5ao53d9g62u8lp36prlpwlf2dhc42hs4gtkmo4oh0ql64zuttxrzhwizg3dtpxh5dik2npe9htuudix2pmn0kv4bteqa8d1w6hrw68rq55g3mmo9stkdru3jlsfrsrz7o02fbf',
                fileSchema: 'u7pnafvf6l3ry2fffofzwhk5nka3lxd6lx2hrr43bogo8i4kexfpao7fjrlq6c7zxxczb2nscqt98sxck4cqy0z4dd9qhokf99et191e8yaw9gv7acqwie8t314g3s20h1xyzzgaso1nmdkuu4qwxhd7yf7uq98nl6eljs7b901ew4fqq5crzjj4ivowfj4wzszk8ktm7arwh5ww5odcwfzc4ump3ro6twdheivps4bzut517dkncdvv5kj43spm9wkezymhcvdwa690p3d28fexwvu5kcedjqh804otum7sfigeanw5cre58uiefepoab5jue8kccp3427gb1wzzp30fibqoy9a11d25g1r0ii89shpvzcdlu1uunj5qvcu370q1tsp6q5l8m9yurtwmriy5eqf5v5xkb9553ipph893jwpsjpbxq08yic73hruz2xrnlk8cnesff9511uymc9zixq3eki9cgpxb58rd2yt3pggokx522dx8y2guofi29t27fmt9doyf7li78ffiaqxyi1um97lqq0tfnqqxssjvzds6sa8498sh9xrmddwcfa1o9qm7nmygvuwq2tbosfvcxs3jwl0na1s3k520xkeiwpr9p8xlsqrllzjou1wuko1ujfo566l5z5cryxw31bz7t3y8zwbmrjhb55t5djeo7ab92gkz57wqg2rh8fj9w7bgb5f0r997mvk3v4auntprt7edpe1ozwxxtjsjxzfia0frfry59fa47p9jp4pmrkryv8jbzvde0xotm8w2w419qzjg4z4rhgqbg8aihjzhv5s7qgl1s7kzjh4zez75d1ikt5sntjia0p8iq0wnaba4tmijdhqr9hw9uiquh33i2u2r9t9i37e7nj4gxrco19gheec2z8t82f3aapuyhedm9f2lyg89xoo62h5s1yvh312lhxldxuf2dfwwbjw5ew89fiiog6o2wp0rhwbi4bmvd0u7fp6claplzbcpake0ms2dbwc2x3gt0n2umv7',
                proxyHost: '2b3kbok2zqkvrmi2cggkv8n1q6jv1v5aj42z6ctxcbyyzdxp796l8xt04959',
                proxyPort: 1931180485,
                destination: 'xbti4ufr2g5ujufsdvwee02g9rkalogxmj9t3pcpfos0qhzebgejhmyj3jkbsnfpx8jyq1sox6nqmkiijrhq3qq3a4xo6i2kn1r8q49uistrufpojzp7nf3pm1ts32jfnqurzg7y6o28ughu1xjjecq1d24cienh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'rp4h6stqkaairunqbw5ozpva19u723ncrm7wx1pdzbm5o84wp9o40qmrqe0yype4l0k4klx4vlwbibsownsr3028fkllmerqcuyek7ba8vfxsczg7r1026e0a0f743agv16ajje30qto7ivfk5esodncag6alsfb',
                responsibleUserAccountName: 'srfzqqowzrduau4uvn0f',
                lastChangeUserAccount: 'raxv68di6tgahc7bnitq',
                lastChangedAt: '2020-07-29 03:28:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'uy4764ovjr7oren24imrp47pvawlsivm9mcwc9sf',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'y3onhfke0chb6mn5p304o730uvprkzrt6yh8uqt63yedokd7od',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'gv2kri5k9byqj1lqsopo',
                party: '1vtkx3u9rae8pzlxszexcy1ok4hxdd9r7mdvsq9ax06bu63swnize58dmndaeq2042repcrrltq3hs8batcwsqvi84u24cgvklez7c98a3k3x0wieppj3pwz6qaicly6xoe3occtvarnist0k5n7x9yaqxmt1rko',
                component: 'va92qmw410rrfjh0w49br2gdcezv8didnja7bsk1kh2xfs3mnubl6ucfl0wyc3xbe4rbg1ndk5yswkklm2o3tttpqxqr186kk1az2wtfwe7b9s6qdw0k3fwrdkh7eysv3sgy2hr4f2k60bzz3q4jbc899nxyjafu',
                name: 'bwbqbye1aaf4b4odq0wrvdpluzblrzc7tpqv48becd4zjbnhtedpxvj6bka1isekb006sqsf8d6993kc3q4tdt8dvw8mt9oipkd4tiqgwv3x4uww9qln2rf7nn2a9z3zrgnljkgjm0i06nlojiyw4nrc549wqtha',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'rgik7nay2xy13dbhqajkb10cmaduhspgneb1ptp4xtl8s66tdvnyxfmdm2rtfxf1bjclrkjaz8nauhky4798j0ce9unz83toa8qz25j47namqpxnclw366plyuyke7cfk6t26a7r365t63fwa7bbvjeon1r7dk1y',
                flowComponent: '3fkg8540d660qyh518werjo8yufevef50609dyj7psb4njd70t33n3poodr49irkx5rgxm338r1d5vdfgo9up0bt047uju6mot4wukrwiqhfzk4vrutu0fcuneow2e0xihss4fehsvk3frcj03lxxzccxpq7cosf',
                flowInterfaceName: '59rjop8qqutprtfyk3qk4ee8k6c57wnqskek22gsa1zh2qd7dvz9y8gngpyf82vvjxymr3alw803xwf1tcy28co5df0iicv0htunyjv2obi5kudczctdra8ozco88be8qm5cevnoz63wzrwiwt6emwh4zvtk1sd4',
                flowInterfaceNamespace: '2jp0s9ug31iigsbhprpz7jof7jli2vsey7kdgh76exbvez1uw3b78d3zwveijaesc56ti75x0ttugtvcojp4ocjv4wv8c9ctro839325cqv0v1gfp0yvpn8lsjhbtr7x41arcfflc3bp2cwbzfxhbo2z3mseai71',
                version: 'qxs495lvi2vj6nini4k7',
                adapterType: 'vcrmx6qntej3hg3bothnrrvosiu8q11jr688uufcrkb262kkrfukq121ujxa',
                direction: 'SENDER',
                transportProtocol: '3lyw4yj66tpwz2j0s4iq2sy70tacqknl68j5ub39zntugr20tv1sz6ak5aatm',
                messageProtocol: '28jckjcultrac5mhv0yh1e65gw3hk8dgw8n6b34eurgm7dibzcjplqz3tjqy',
                adapterEngineName: '4mht9hd8egzkksyt58bkgeojfybodhzskmj9lkmk210gt9jjptajxv1epr15iz33oypcif4s1weoz3etdklujhbx2tkxp65rwttr7zqhiciimzl6vfreyi2i86s7a7omi95c94jcdrre9wcw2v4jfcccjyo4eazx',
                url: 'lb734fzfd0wrpol8om3xjk32l1wqkyps3zpw5bjdy7dssdqnktx2svwt6dsweron1tiyvv4c4erah6lri848oxmuustsvb7v2qdimil7fnqqvszsw3bfxle4grp3928stniripsp06g1ax3ystdx0vfyvh5qtt98iunj6pwrysdj9sbgrmyix4m5r2sv1x1zai5p0ajy4zgfkrrrw48xmsgtmlpjmi2k8nnfuxwh0gn1spduwvkiuhz8wyxren1qb0d1kd9ie1fvvh1h5ii3p4h8midqto74weiznovv1ecjq88zz8dombyh8t7cpiz7',
                username: 'eqp7de3qo95pa7ff4tzior6lqe3ttwej3vj39e0q779lr0nebemtlvlyzqqz',
                remoteHost: 'uk8k9p6ptuq4ncl6obnt1l2xvitp1flqe5v7749qnmmv8xlz7uk2lv1x15wk8mykokeb1edmmm0dfvrpctv5gjdmad5ju0tq561f8xxe43pqe4zk407ozb4v3vy7gdmbd13zaxbdmnm6gy2bcgotz9twogwdc2od',
                remotePort: 1584408236,
                directory: 'xsj5kbaokil0b7gglpawmxkueowy6vtqvicnf77rqek45fvujgztrh5wdmwdqhz562id16se0tyk18u29b0dumyq7j01y6f0iob4pmhovv504pepignf7o86k9k1gr07g06tnzsix884ozdi5oau6trskaj8jjtmz5tkgtlrzw9544dzznqpmoivcw0gbpsvyg2cckguk1n0smk3nuuwfx4bhad44aobelt8or4sm3n0by29bvhqigjkjpbhgu842p9iki58q7npy2tbwqlit8zbu7x9r344xkx8it4j3jlaok5n1065yrbupz4d3xhjeur8b0uk1hknme6t045va4rqnbp6du6od9qoo6c9vj5z92bjzep871z599cxul00tqh8981o3tdqn0jgh8gbsgen90kgxxmc0rsxlpkojuo3hi10t3cv2x73sf4ue2y1tc2m2inyijy03h8twkm6lsd7q0sghgfughz2grp9wm8nl7ahrv65wv5vm31ltbisrdgpu3lvrkl6m2rvc7twh4yz0n9csv6fp4b9z6o0vr3u6y88112a9c3z7vimm1fp2gkbi1dx4irejgjrg874genll92ekc60wy21ueatekocc2ijv8hhbh4u4vl30hze2xcr634m2s72mjagsj1xpr1lan0y0els2oqfmrj9jkwajxblxk8klba79vk0bfsh4z2i8ttnq673cqfvh3p3y92paakv6v2ibume0lo6a3ghpigcaorzt7eekfq9x65ki8uvubne1k9oqxkzki3j1azcrvexxpxvi1x9ldmi08x9fpka8f5kb9aqtye2y6crnkb11fmvctt7mn0mgn0orooqu4r1mnrdtk9lxlrpibr2md5g4e8eyoyhgckovl4u0cih8ajixgj4nippetmxpmle7u6c54gg2j249kfdjddsc9f9id7gbh7fng5mdfd9yjohv0lq7k7dr7muq0sgcghegy1w6zlos9qy13v93j341rmb98qhzc0jvxqlyyer',
                fileSchema: 'bnnwlyrmuvx2g9h304szeot7lyq3ovumd565ke7gz2fypbyi5g6gr43d4ccget5hg79p5jx5zvl7w943uvrqtix0j4wa7o7ewfc5e6o9y0y18yure8ty1ls1w42uc8wqnox0bchh3abkyugw4h5mn9m5r2zppnusx2luflefk618wtok49mmntvchxatad56za8ooq8m9w530xkw437o7qhutbhym1vpanp4f1pgouismw71yr2me8gqz4652nwvp8l9iffg4yq9rgpvpaaobxtam6qu8qyl1dug3hdug9ccw67gfe42ihb1xvy75w6lk5du7cgws038sh5g4yau4k7zchpr8mnqc6is7xekjzeq73y8j2xaes2izds6ugvux59kc6r9gv69r3iaxehepi6l52ajw6p6day9rnxio5auovgdkajjlbtm31p25knoaof6ktof37mubydo5gfu0aklmoc5hjzl90ez5hbhw0b820u7h7e24x1ywvlk3b2i1k3plmii9c16w60rovmyr8h6gaxifvplhxpfbaajxpno228asba4gyzit2ct0ge2pdo7e22plkobmy6zpdmq89jl2zpfvhnsffrd65quhv90azpzuimczz3tmuz3cpxtotvbmqhrj9jksvv8wgnef74baajnig32rx4uwgy0vhfksd5oww0ilgmb2uvmxz74adr2nad0u1d3ph1byc0lzg3w37am9o2c31kzhfhuf2qhy4n0o4a6sdq00vuw73y1cm9ccqqk0huepp6vqymngw1uz8tb56oneqqy1jho7ziz23dpxaclopdukvctwo9t18e9ocmcajvc4bsa35pwhky53mcapf0vu7m1jdlwg6ljhxmq2yuj37n56jgq6g6h2ofp7c8jfyoopqfigilgfnvw8vyxg66bvvs6cpyupavl451xnkshwfne2lj97262oifd9103taq3epv0jpnxjrlb1cv7iej0szr62lj6779q1xlj4lk2idj8t5byoxa3',
                proxyHost: 'qaee9xdp6kyty8ngg8w9uwvbo79d180izyvsg2u6m4amyqj0ll4olyop25ht',
                proxyPort: 3461963762,
                destination: 'wqqwqr8eb4du5r2wewsj808jc5evku0rb0kli5zuvxm5inivcao6w5zk2eiw6vaxv4m4afzgtic6t8cj2pms7aronftbmn4uqdlomhk555obtytdf4g2u8i3jm27ifdxjyer0ruugjod66e4ipsi6521fsl8l6bb',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'lkix81exctwf96t6c876jj44xbem88808jad7lbiri5w4vmb0jy3lqqp6p28zij37cvkci78qi6ifxucrlpkog4675oloh2iq5qej10sd38dk1oy30qsfdvkbnthgnzrp6eo7if2la1pc0k70o9kvkyyijfm3bhr',
                responsibleUserAccountName: '9i77sc33eolq182lc9yg',
                lastChangeUserAccount: 'vpc3m72no52sozenl0f5',
                lastChangedAt: '2020-07-29 09:18:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '2f54mfrzw4o5ivdt9kduq1f3txziat4ygthc0ukg',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'stfl1os1ineu6c5olhfs7c7dtwusi8zksjc88fjkxeqfy5004d',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'y3p4p4n3v1rmpa3wbnlu',
                party: '8ehceb2mdqcejwe7eqw3d35crgojilnyd5orgsfqrnd862rcpcu42afo99z1dyyvqmq1fy10ws2bpqyapw15wlt81xea3a224cyyfyngms1q18ngxnrd2z8l4oflj5zgqqtwndsor4s01gjz6cxjdiy92v7i4p8k',
                component: 'dfyibwq4aenwe9ts547rmsslh5u7q5grmsm8ykas1sv1btlh0be6jv0619gsxj9f0llf6wa2h2i49rbov2wq4eeawvi8sl6sjtkkvzquapqgnez37oaay2aj8y9mkny9vcuf4bs81rr46uori1da0vmtln8l886w',
                name: 'wbc6lbwkm2cxk1vf9as5d3osi6x284pzu1vtmmzvmyl12rqnizj5kiypq0m1jdkx7soyimrtns82yo03qeyunghp4nxxlg7yj2n1gtcfkkqsm6modzs97yavvfuxvk0v1hrq5qk18ar5x8j74rcu1f3jihuad5je',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '0i95th6esf2v0xvx47z00rghak0t8vn1wrcys7g3xeko9hc7nps4np2uof26gnd5k7xghjq1xwn1ykg3xv4diuhpi99ej74jozrb6zyrlicc46mfa6kakilwf4v3p9n5u6xujjqsruw1m7b9lni1ccbr3zbq1x1a',
                flowComponent: 'aoo5gbrqrzzdu11eseqxr4ua5an7syfsbu7fq45q6hqmf3un9pticmgkkgosnbemcmfj66dxdwry6ajqu96z9fzghaqhgi64wnz3ppawbnr74vt10euo48g66x5haerprlzjc00j2osrwtuiy7n7holf10kudeem',
                flowInterfaceName: '1i8zfv5mbdaesu7v8mm3vziv35wlkpmd91ft1zbdhnunjkzcdq95ky58nrm9dnb4ep6cfxo9dkohqrm2uo9pr4h8tj2u7bp2l8fw4d1ezngzg53pwjnpzn9wfkqkw1f1v25rij80pbnuf0drzzqjyli0b55rnnaa',
                flowInterfaceNamespace: 'yn13nn21wha86tsrxttiyhx8f8ugzshkhxggu149jt2dr2vrdqdp2iiwb5efcpj89y19mvd2tuj2nswwi149mbdfghd97qob1w6aur3yjw8y7y72x15y0ach5xzi1z8gj3gluj8git88knvi2gsgvrtmjjyoxyyp',
                version: 'x7gi12hq6ps5a78siaoz',
                adapterType: '3vjihh8w9vs2h8cnwq3exksdufvjtd8vacg1bw8k89p9swawtxqhm7ciyb3q',
                direction: 'RECEIVER',
                transportProtocol: 'rq2cdeaq8sxioayw3lztt80eydo5l3wnhgs6zqb2ue1i6016iwdc1oi7tt50',
                messageProtocol: 'z2de63z8hjdcdnuwzn1lewl45u5afub9mky1fo44lwmnsrngf7qvavw2tsugw',
                adapterEngineName: 'e8ha0of1ao3uujdftkskmjmey874yoqqie0m3ml8njtzffq702l705mx6guvvxdp7mmhe2qe85kqhu24lbz6b3b3z6jkfcjp1tp78u3rkyetsd9dtan3qlfo8ise9kz3vaorogosmd158xtrc9u4vvr9ps3t2119',
                url: 'aypz9be0lhjsp1eave146zmfhju8a1f7u24on6d59vo8sbvyk758fbmnylujatchkpm229xvno5i2qsmwym3hslc5zcdnac0huf7i6j49d03l4j5jnw4exyirnptfye0b533hyz1zq8bmw2priwcezrpgcnqczpy3c8sqbf0lu2zq6op95z048isux6x9gz98przwgupf8v8fm7k50m2r0f9ngwrwpdnf6i64yka8s3rhcz4xw6xeqvoc2mmdrvtj48h0b4qmbb4khze69g3kmr5ygyfbfzqr3fhyxpv9ocxfrcdaybbrxq5u4iqhhqw',
                username: 'v9aflcjgeaakw5ky0sz52tq8bobltoswlgt37s3gcj7u4pap8yv7qs0pg7uq',
                remoteHost: 'irsy0pa0pwi3rp6dvq84bv2duc7ny3fwsqcb7emtb7wrgrfjiu8esdsdnnqyb4d8o24lonpaytboyp8y8ym966tt2xctnvc1le815h0ur4fpk5yby78fwxgpnpenfxugmi4xpmdcw0e37zkramcp2e79ujs0avll',
                remotePort: 7612876257,
                directory: 'ij1uk5mtv0y7a2uab6eftjjpbw5jm10l4ijpawnkma1m1g76y9e5toz9w832gtkddbq4fzshixrk9v9zu74j19rztlfmktwum18a2llutgs913ll7tbdfv55bj6nzxcenfbbjt6trhv86alavdgjzj74z3du3yc3z4y6xp92afyzlkwdqpeo52n2gpxfvpckqmwxrqend97k9i0tkbz1l6upq6b4ko48t1hbndeo2imikjdaqh1rf5v532q6fn1rpv6msz96otqzcgj82n6xw9blqfi5d5mdxb2h810aenbjkrbfcxaq5oy253t5vwf69e3ne5kd5a8s7fno1rlzwwewfhfe4y4ssudqstll9ktzuqh8len1jz6f43yhufyk52doow6b67m27vifz6ng9zs7vmulzh5slkbivbco0q4op308pfbdwz4gjcq0lmu077vdgi1cr6wa43lw4gztee8ezwx3861wo288fazdpnzby9ts2i5jrsvzm7a9lu476ib8pf1pb4bojrwdvudttauenm3xtvfhtfhv9at9oetbhj8pt8vqjsq7aur6apv2li9uf7jnvwa1irpcbq83xg9h9u4zl6ff97w4rdnpcez67lfbg6yf5p3d29xfjmxzbiwpf9nyme8lj0pfe57iw6ub6f8451nhhu194ninnapqcxi5bl3rvilv1lelv76m4xpjwh9c3kzjcjqzerclae6ls5nqghk0n4r3qhpomez32gpseuqgvp6pua1eixjvjq9hds2m5ylsaqt9w2mhaumhakz7zf6zh9hi2t0lpvb9dqgry3upra0dyc43czeob85pw57lwj2vtsacetmj734qijc2b1bbp5q8hjh7t2a39mclzazrue8btf1epuwq6ljdgms5v5djyuw88p55xf2b2nn89jl9f6l53fodt8xlh2sbdrjv5qm36eklkcv30nhuovzdz7n7lgxp76i8jw3xt90tcu428bogb450806be787uci9mnluarcetkry',
                fileSchema: 'p8rjjufoq2lh0vdwevqdcyuurtlw8917uq4pvyx9yv3a5shaupjx8ipm7rkc02ieiy9jdqvw5i7267x2xdrf7851gm9uxagbbnh4nhaqku4irqpv5zjpacpei5mqk3v4lld95ksodhw7upqxuglv8wjq6eddpfufgqrrc8wpq9ytj0tjwxn8asp33ahyen0xxfiz702yxipquvs1mu1zkoo2aug9c7rhr3hk4b2a5ixfhqixgw9m5qw4pgoqclr4f1ru2udrlezxm1r1bulsesgz13ki0vuxhpp8sdt8oz6ymdvy44ygs44ww9st6vwk49vuf09yzhba8q2v6l0nzo5iig14fkoaxkb8vn7rzwjsz4pcpbv9afkvml0ma8c6spuau8sxu18sh2dvthx3orn8249qt50y4igifaufvaa4hkexe2f68g22x3egda5b1uc7qlcjq2z84ppi8a958uiev5nyttyiwy1k54d2wlonz7t8rqovork9rgbrt4ywhs9thl115s4qxnbw3aetrbcwb5ewubcbcw8dj85jxo9lvdfa2m1rvffqaq7v84xwper48rofx4livujy1h3jeqgaiv6oa65jna90vvjozj9npbwbmunnlyvwaovusl3su7hbnsvdvql1a38y879qcnrljysr14gik5hwl5b7ywyxy06ldwgv4b6mdpj9kd6ulgy86uufjiewzcexh3c6d6kpug7u0qujvfsr0qlfss5phlvkcce221ucfnhwpwofmoxzwei12gd6qkar4tsviqdls8tug35veo2noiac4bo3fwwtlni5dnxdxy6rqr1sz1etpnws4n3gufxarib5giltscyjazqafhhdmmc0mrpessf1pyqo6acjv3z7aorfvyo50fj0e3py4xzntt1ocs342dy4ter6x6hysxnda6y6k3lyzscnusuhfd7b94oi2o79iebh61ro9zjji1um81o72xuo0edlmf7betl0clk1l5bkwy6ulxtm77z5qcul',
                proxyHost: 'vv3ytzsxfiow3c5o8m56cuqdfwio4xl0oqgg2i2tn7l0avr9c5jop4gcl37t',
                proxyPort: 2966209227,
                destination: 'nj90ow00abs5avxyd272spdcvaqo0yz4t8f6ny3lmodyyuc1zhqiczpqgqmoa1689pckjk5csojhw3dftbt72navqfq8wopfvo0kmevjqvtfaxhlvurx27mwqpmdkcgb0amdfbwwp02w92e71ndtyy0z9ry5ibv4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'uipvg8utc97awoyayywyk9yb51j5yfik8nmz1wzzhj7ehl0fa7tgoapb6dh2rjme7f61sfby3k2qja35e5pzlr7z1xznbpaxpox28xwglin1bsuufimoni368a4ncghmg7ve1up7o4369gjplb5sja370ivpbbfk',
                responsibleUserAccountName: '7ue8ses2hjxew9f1zcpe',
                lastChangeUserAccount: 'iu3bcaj311ll7xuw8bfi',
                lastChangedAt: '2020-07-29 14:20:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'j6y1yklcz5hsnpxjnkknthaew7avdenk7lf9rrrb',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'xp2r5j9wclzl6tzr0j17bu4afhwvff1gapjygvxr8lohq7m9n1',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '29gysh5ixdxdpkjmc6r3',
                party: '1nnjzl7iuv87j6k6fe5kalshtor8vh0pk3rt0gic99adz5kjkhrq94si93vf9u74xb1ucvjivtalgga71sjq7yy4r6opzfjdaao05gkv5g2eeanas374gk2rrup6to4hjxbuiuopsdaf94eqblv7yjmty2tqp8ha',
                component: 'ws4vt0ns9qungia0nhh919wcen2n9yq9fep6uooq9hxwgfpwpvu2c5o8ajmqqjb1i1mjocibft1a4l8ia1v6fflbydpqbyld63x83sgebmss7o85hzdzkmpolf8p9ya4m4pcd6deahw34f03xylc3ivjmgobdcj9',
                name: '58e6utfh7e2i3ag0tu2vnyog7jirrojec6heq01u31q58opgx8ckfcvqc01a2pn7co9ybiopw4k5e02tcgt74ibw9oq7cvd3edjom8csinwmfriijgvjpa6kgbdj8nmrrlz1i2h994y80c0370bepti3klw99mmu',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'ejv3g1lp89kma2gimc2uhmctxl5yrwg50xbuh9begj3523bdywje3nl13aypx5denttfoja1lygg4ccxpuqz5rikt7gpthc8zwthhrp7m2sdogncyre0hptc7x06fvn87mg7plfqil4npiejngzb49s1icuzgu7a',
                flowComponent: 'b4cqy5jmwjnirlvy22qtephdg8bxuw2cybyplwaphkjmyksl7xaawh309g14vzv5ot2i54y8aes2hz20expc4iqtm6gfipnzvldwejzn5qsphwyqo0xolokhqgyg9f35o6kc87nbhhu4bngoeiarrzyzeiwe5d3l',
                flowInterfaceName: 's5zu3mhf5e55tdpx9u97hppdxehqjqjoqkh8p90nzqdhjtzmwniqpuvka8fed15bkk280vs4ibwajs96y3damk1r6fsvmgw5jccv7qwxmat8s3m674jmqhrvyzbirz0cw0if6td6fw5txdxsgz0ll02t80oaodi7',
                flowInterfaceNamespace: 'dlym37507ivipdor2n9lmnnf5ncpy71uh9v9t847krpuzfw68qnrtjwo3u3kymxcyu1vrk2td8mu3cgiu0x45gq3lphfhsvw451f7ks6mbxyzydn06q7gg528o0gvirw5rtswo9to5oodirosn5eoll4taglbtla',
                version: 'tnlms6jfujqyd9hjimq3',
                adapterType: '2uy7w2a8y46e59vjmrgrly53pb2anb5viei9sodw7hhsjdjbbimvrrda4m1r',
                direction: 'RECEIVER',
                transportProtocol: 'p65o8h1j4gma1t7wcrnh2ifw9f7uyr6my9qonuan7h3hjo68u0zqbee9sn2u',
                messageProtocol: 'vrbh3zxpo0r40d53ksxz32den37trfdle0lew043wzb73qvskjziq933jjmx',
                adapterEngineName: '8hk33fg7e67qe163tjfo5wcfx67abaw4r2ag4cw0jztqsqtsgsntp5wzun5lpjuosnvk9jtufmqbq5si9gzx4mhzpd2xkr4ltqwowqusts5n8zfqxt9r5mohlqe02y9c5iw9hv5cy3633wdlhbq8ifbemd0vfkun8',
                url: 'weld0fmnnz2zdtg5qkyf641aqefh5otu9x4euphjn6bf4tsok3exhiptbyk1a2jqoi18xscgpn0n2tadhmhzdjh4xuu21xfevjidroslqd8b4eoctk9otre6kbo8r9vyknmmxbcjxiu0yl7m8uo5vy26lduxksxxxvf5x7420hqwc217kjb45iyhe0ud2nq5zbmues0uobsyh6b06q7bqhulssvykdxghu4hcy7fvp6hf56mi4k9zt20g3zy869qw9emfp0rba020f9efviceod45t8k8onm9n15xawv0eap0o6coh83ktwd8i3d5wdz',
                username: 'olkfv7tu1t8w0kvub27x6j5fo2hlfpv5he69xrbg0zb4ytufrary6zyhlveq',
                remoteHost: 'kpk67qshoo6tliasjx69wmc4hp968u4mn2as4se3puqr5fb8zwf026s1lc0pvu1u9kcdtkkdftpgw3bdp2rcuieiswpzsh0eusgpso2f2j0d41dt2ucoxn6u0gblwrlvyvmweit9e2hwrtxirceubl99cdii9mch',
                remotePort: 1704605257,
                directory: '9h76xj2bf1v0jxtntiqp16s13ipgekokxj45iyo2w8njluawz50wcofd7q5tqas73gxbkgfsx4q1ekhpjhf0ir1uh6lpxf70hkwtqtslhx6q2lxjllrszt96yfg9yl5ah0dp2besk4z4cp2o23045e5pxmiphl8jt4g5d5xs9ok4emnxlsopa5pe5q705pl7mnycnxknaxgdtkyys01fvkgc549d62o0n94znlv9xmqrpxamoo0wlrou6oyseunu41aqusp6kgw45g5ky7kgqkp0oa1vz7cdvru0gwm9i2ese5n54prss1fwjlm3j7ovyfrs0d9tamttmjld25mbtrmwp5bwqwzoug9vpu9b0yvg4g0utrdngserz46b5qj6bpkoyd2l6hmcyq1wwutfq444munonlknmmg684d0e9rf2jtqqbkacgqd1cbofs4b0ckcqku2ywa0nv7k57a1thhv8b8mdzvoypq60dgbapltwcte5ewc87sg0xrr77fd1gqcz2j2bdpar7dfppt9si5h7zrkr6qi6l76vh2jizhut81ivgxx3syvo8q0wprzgaoi4jgibyeo9vwz4sgrrz75jyy0r9xdpiad64fxc7s9bug46ljlg9f1iszsfl1vb00com7hjgvqdnmoy5ykykaom7bngbmtmgsp28p1viawkutbrlcr8gjtdfx4adwys3lfun8pwjlghrnazb573irjwxl6110axsjayh943wfltb2zq8ugp7qokevs5gfbtjg37bmxbw9znnek26czr1hx34jv805tld38sba9783jw6ft3wud4ul7qhqz1wbtraec9jleg37ghi6nk4itbtj9dngdhi8nepajehmudtyfi006j5aei0rgs0r138l26uckxom2rtm3g14ymadpfa4zsxww1fgjd6s8mcfb9bbclt21wfqebwpj455b2wuzf44olggilqldzdv0ibxhwz186kl45zlgledchklzx36v4hp1zxk3ewkqsbct6hpj',
                fileSchema: 'tzxf5pp4xfh74q2f51vaicx25mo4q0ynmmf3ritwyy5nqz2szsicmf6u0kr3hkdo2hvfszst3sbps7sty4wach7hg3shxpin3m5ijnmd61vz57mqa1kbt4dl5viywioxhq0ypa5klvj6rtmgm621w58pejupwipo2ibdznl6kxkgh5ighw1of3uxeahial1xfs90xuj6qc5cyzd6o2j358t3qsfp7isehimdr48xekmusvmlvrpzq43hk5rbliielfaoj1uprxzph9ad5z150r1nfnjj7bxy1eqa80gt5578fo9rwto9r6s8z99pun2a19a58zpoi55ksc6xvkux45y73882bv6yr3rz5uaih5k17olnfrbc579swd4853w6tggge34hatfhffqo1a9or8n0bmyo1fsz54c9cg8tzbkhpotcti3e9p2gb6ugq6yhddexz7v4dlj2ul2mmhl9a53xnrtjtj7gdt3y53xrnjv9k0pr16rqgc59o3pvcry9j3b9mkc493uftlfhow4i4v75fnfeo2atqs8d7vt06hlpmqgx1f6cd3z191p1y3vog9fmiw4r80hqipgkeitwjr7mfuyx4bje2jj987zsf3mkmmqvgfjrb21bd6twathq1bkyipyj72ga0yf4t3owfn6gv4hg2ujsl9d3uf5wuawfrnop127yza4xvuyykldnc0o2rph49nlpa1tipjasvscaxuizw1tc8a9wm32ai7b9myq5zxkoki5kb4x1ij29jepocg1cyc3jdx423hur4yq6892gyx5ql1wa83uysrjxlcysm8edcpzed9a7qj673z8wkvhbmq7wvmufdednb1p0fx0fx6zzpz8al2e8xieek8j9qetj7bw192m1a8hkvp4rui448wxrjb34pbvfjhswd77huihcfgfju0hvpsbq3v08h8hr9flzqyd2r809i4lx5f3jpcy01zx2jr5wy4tnw46udq9gspmxpvo2a02jpy502xdt0m96zye23w5u',
                proxyHost: 'ogemenng8763vb49b726lr2t25410sth305ma2ndgjtedksigoo8sufq1apb',
                proxyPort: 8269105657,
                destination: 'emw9ypmboy7tdifesxh3618j7sv7btil4647vfmf5vfxt12jnfgv3od21q3boatpg6bi6ihg1ztszf15oufonuvuincux4wvjjvtknqbhli46jvb8xfrrive4iml0jdeml6r0p429j3sd0xeko2m09sq5365m9i3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'll6wo3u664wl6ulzth5kqh4p4dna7nnfxlisy2j3k9xck7nceryy392vr1k7typtakijlv3y1v5imsgx5rw6owwwht49wbkf7xagf55qew8mubjm6mggevlil1yf1cwa3h3o6gm0h061q75frhs0d5amdhji3mqt',
                responsibleUserAccountName: 'uu5ubn50xcxyh77ic8wb',
                lastChangeUserAccount: 'h6p9w59tnbkw4nz3fwdf',
                lastChangedAt: '2020-07-29 14:21:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'zcxibe9jjt4b16d2dfzlcoip7ygjamnj9fim057e',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'a9ggsgh7x4l4pmhwax976fszc20a609eh8kht7i7emuyniok9k',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '1vzddd81c67x547b50bv',
                party: 'uylvzi9dwd2ger62nof8qio2ottc3wskhc3xv0gefj7agwn9r4mcnheexmlky10zgoycnd3qq5ja9tnjy5otl2qw6367n556coz8t5zqilys8t51ly9m0m7o26qp3016k4f182s5ehyy4mecwgbrlw6x9llofota',
                component: 'got8olcarfkvzs3tc1sdxrkm998dwthw2byem22tqowqdbxvxbws0nnktmc5zy0540r4zlg5xtkeoqjrglzvtsmaelqvf57u5epxi48zbbr6ii9h4nwu0683hu3v59g0mgiofql9v7pof6nc1kewm7quazf57f3n',
                name: '5qx9pnon3vdugy5rq7ratb7dqwvp784wmfjgrikws39lglwe3z5aqbo0tss0h064j8mgq3olyqu8mzb3v4xt5hvzow6iqu9sm2yw3q8zg8m7wy3zxtwl768z5r7fcdvk1l3tulvq31fdjk0053xdeg7xi2krbypb',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'xa5ieaqim3g6gon9s0p204r38yvhcsxngmmu7j3ctx6yba21gnvh9myfy37j6twioazhgore9xqa3s3fhgyzi3txyha4mom6pjkzee5psjgqnezqnyn0652ko1lgp92fzar2xlfbbxc3snl1inxgecfogc9ay4ey',
                flowComponent: 'akhc0zssgkreo82472tz3bvvmx2wpnvpeippmdttq1wfa2cufbh5uubzii3jrs264k4qaodaqu2sjibbyz12e7n1546we4gethb9vtxz6gx0bjy8clpip00zz0uyrirnmmezjjhkv31em2me8bfh1fv2jg2do0g7',
                flowInterfaceName: 'jkjvtietrjd457aw9gujlmr3on39jn1gebc88otaijac2481dkv0xb37q7j9wk3irsimyjmbxdcxj94725uub70jaolbwrz8tajcj0i1q6ersn2a9cxh502bqlg86py9u7vu1wov34o2b8p4ehe1rq17qamarttg',
                flowInterfaceNamespace: '63cc3sw01nuqcp65xe0jcwr70lu0zfsd7rq8z7o93bvkelfe2gn3h1bdtgwepbhz70z87qwyvodj1qzb1a73f4g3lm8md3z89fd2q0jfycseowgm13193nf70kn3ldnfh14sj3xzqomktqxazuljmhj9e5beemwn',
                version: 'ry73xnrot9sum5rbk8ta',
                adapterType: '0ypmz5hz4a3av0mvghnsi0wz0s7hlh5ix9ld02fq2cts4yle1dc6o1i0xecp',
                direction: 'RECEIVER',
                transportProtocol: 'tiqtgei0q96j3edpsh36sl1tpluvt7wysi8pb6iq4rxvdtwcnmobsnobsj9h',
                messageProtocol: 'yiyt5nlp9h3hzyytxf0wavjckawfct8p70zr76ujbvn49ghq10fqb4w5mc1q',
                adapterEngineName: 'd1acodxc6ccxf9g8k1hygrf7cci63olq2vbazphyv0xtcr8izsbrissi0ea4iv339a7osd0ssyu2mhox9834bsoxmpg5njw854hdc1n87mjquqt16r0lgkav1upyieg0f71fuo3fobjkd1xoheeqelek9an9lo4u',
                url: '2z9um8s50wxzngm387jh23uhix8cqdbxen3okvd5mf5s7grpb3u6nqob2t6gurpxmv9spfeb3igglxqzorgio1c2loe7p37a0h3zzygjsnpdc1vjj2mj4z9gzkx0z1352d0wg8ok2q52svo8h6m4rmu5ta0fivgeznx1lwfjqp9wcrho4kz17v2vngw2kduxwsaltg94gn5jzjc2kcremsx1kejcz1ygk93y89fswtswqgd69kzcla1ms59dsur09cfrezizcz43vvtwx71unsozlqz7wi6z3w47kcqwq9zem1eczy2ap9hn7dv2yh9bh',
                username: 'ooc4x4bojor82auytdhe520g0gyk3rwjrhxnarvyu5ej9u9fzt1w3u0cp01y',
                remoteHost: 'qs74h59pbid7tqrban5f6op9o43byrdwlvrcatu59l878tr7e0ke2k78ons29snzi63d9uqaxq5xuwj170xp194wkqwxgmz4656gfsu14348okkd7hjyoe66ve6rzealb01izsn1v5v5v1kjpp1bya6gb5a24dat',
                remotePort: 7769266683,
                directory: 'd9meus8kws27xmglyxdfrd746gil422rlxupvobq8h93s41trzp2wt0ycseyvm3xcuf82n6xfj39dxrawum51m05pj9eph4dvh2mzn974ad7pzpl7z9u70f9qyhbiosggudcaolsbzvhciilco78g1dqb4xi6od2tmpj9dq11dmk71zgt2a28kphls3iswrimxqo7w0ulvmkk1i2obl1sqkq8rhp570up4luj2q7m3ln6llymj2oudgi0989jz00d0wamddl7fbui0lmuucxkw74lm6emvlko3nu1yoj5nnycohb1xkhlo49e2ym7ngzdqxln9tei4euojpbyxx4cklbxv4ziu0x0w6nyydc2zkjjp7vir53udrnrkksmsfg8qvvrborbijh9l13krdjzdvv5m5iznoekex0990065eelflvhswtbohbegb29cwxt3ekmnifbdni5nf0s67waz87ec47pxt5xx6i2cn5d57chr9fh7bl3dcesgjnqnbhszsubl1dtznz26nnm00afa4xu8ptzzjeb3rntthc474p7tt74smhuly7waf3jtgi6f22iaconkdnasbv97n90usnzop691aawsgiw2ra0kuqdfwp82hrc1ox61vrpvbm4xncgoz9w2in3pef7odumfjflf2odeuhyc0fd1mo75hhqes93z6yqtkh7zer9ghi4e0midn7pjl3we212hiauweflyv4wxgf83gdufumyaxktkdazrurnv5w9gsdc4u8yjk2lov16u83gp0z42um367dm3jxz8fpgy2e46l9a2myslxcszxlbc7j086224viq6eek2f5cl7kgu0e8o3a87hzjqbgqisa8lculjpuqp2j3au88v5u5w47tlmltsed7xcwadc4yr4vrk5f07x3473kuchgfokapr3o8e8hbhu1hjku9676lgm1s1azkd53xeup0pw32gwr4mz7mgyefmrzb7ic8ddmqdjo3rdl6ltpz1kyni18e1fm79qjabo1',
                fileSchema: '6b7jpx8cdyy1f9j6gj5q20ymznhyy7q6ywe1uuimr3iv9rkuu97uqbyvl7mb2ty8h9b2efiyxhazv6yxd9xhsx55wemorcxw7vln5dqtxc0el5jnvuqg3j29a59vzkhg41qvdp1809ocohrqqld9rhgm9cqo192i17kgx2zqmjuifw7yh7dhsavaw86h7lrwnguifk6w844qpcduajvfy4s6rsjamt17pbi3f5ftfe5t6f05ou09gd6cdyb2ilrs88rojct7jk5n7zc1yvr5bmpj8dxx2j0umj2f2cftvfor8j8wvdn24d1bu3dvtfy51e8i8e39jrralihktycdv5t9n99fz4a1d4vrsnnbm4an5wnylcasdxvor636eoa6h933lruq9aj785eq6hyrn97th8ofsmpzlzrioo7e2n2hix8ixxjctgl0l1k6iku4ua94ub6rpvdz061v5x00q2srbmrjzk2k82quzr8pumm1ybn26p29pxdky8njkx0knnlkqzock17yatx0p5cvj1beq4kn9f32n3ndult0gry0qutemnjufsk0j3677zizhxn06r7j6sg5zugsnznfzc3xgo5si0jo5q8x6k4rhsbsi017bgw4yvn4q20hbc64zagwrl4zieexpib5hjem165a1trp2s211zbf4mv0rnvs3mlyz988qpu5jpzgmjklz8ezrxry2egwh7lgqei7afite4ketm3k1pzpz7qy299etye3mvfi4ex9oevatzvjf7gqpx8f3woszsja3rjhzktghnfisi0mcpwpovoo9x64m9c68ngwr4bt5zlvt4mdihk71wy1ab89fjfjyk7klf0fc39skefit5axd12gybhzltqcvuuv7ww0x289orhoma35s4inu8ubxqt3w3q6nyssrfyxe0a2wmnqjp1vo193w65ct4yat1ol57v3ezp7pyfhn4hk8upfg05wgxxc6vo0d0bxd4gjx2b6p5jusju43idvlrd88o45k2ft244z',
                proxyHost: '8eluu39ppdzenxjyb4uuylikcw3885bmonijtfbynnerdw8wspaz6ue7r7qr',
                proxyPort: 4853605154,
                destination: 'jpvr05bql3409vwkjchpfyal4ogufslzi59n2lg9sy8x5zrgn3ommr3dxm97f83s3ko8oovd25nylco3vp4g3rtlimc98893e6r6fig2slf1g7o4aglsohna7e9tsxg0h41eb7kieytavrrphtyuj9wkghe8763a',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'demlnojnjjf7e3dwjbd43iiw4v6bm1d0fxq8dxq6xldly00hhyroxqys34wtgvdsxfa60wfc0wub8lbgamuukbtmedidzawwfnsjm61o3dfdj7q98p9si80s4ixy0pzz8nyqotfxi955b8rsz3v5qld79deerxx6',
                responsibleUserAccountName: '6iamjk1hpqhwe8svsv0v',
                lastChangeUserAccount: 'wohzjqz655im2djg4h89',
                lastChangedAt: '2020-07-28 20:17:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'nqx4yryjy10e0cbeyeinzud4shyna0cagarlciyd',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'zaaw6rew0h65lumsaots1biabj83vadoh0hwgwb6rgn781vtk9',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'be5g359p0c1jgmusvpc4',
                party: '5y77lgdmxgog8ji1rz4e6j0owtxssiu0iwisggew1kdacxhq126wzjocuzta4r94ee3kcfkf2oy51xtkf986his0i6g79hfbtasd8is1surukvczlgfeioxfifulq5ry8p9yzd35951e4sfzj0r1unie0s79mq2n',
                component: 'urf9mdsse0se4xia5duqnwl6y9rnzrytonvur64yequsxquf2ydnaotx8gbx2xtmhpmbn4x5igehzxjvxxykkf1sxql5xbj8tm2btt4tzfqp3k3183k4v94hhln1nicr828vobdh2gq2bx8uezx3pzznmhhppvo1',
                name: 'xvmx0bcaqdbcx4u0jcabanq30s7k6l113pq6n34w87jgbcghbtbohed8fq5sjw59mm9n7g7heov9h9qb1dyy41yyk9b7w25zs98q4pekbwtkm006kpsxoo9owfeet58ankugv0ko6ab15fexlc6xb01v57lmved0',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '1aipum9kbvq4cf1w4cqrdafi5ku7jonmls7uvpt733itjaz8jhy32zso0enatom201ypr0ul8oigdqmwj262jmzvnum60mgstm1fpuoxg5h8zjq2zp51erx0fzxdfeg0ajipycsu0olu7w567gguq8jkd95ozoso',
                flowComponent: '42qcf0jr00xki0m7l2wmzrwbnb3as0bci2o0v858nzmu4n1ffzo2frgv5oqk1qfsky20z276q8i7op3h808oog5oebdjx1bpkjocwlrrxwanif1fu6fp9oxp6dcxembjthnmn928i9q1tbscel2rm0upoxt2frsn',
                flowInterfaceName: 'vm3mk1gcevo2bkbx7z4b55lqfbe93dupb0wl0lleyf7l4kq94w0riye0k22z14kgsnjk55ve2f5vfjreoy575wck620opjducou8gci9nrpa6s3ayvp4pun7w5dhy4p8t4tgdznbsyilgul811admlsh1w33zzu8',
                flowInterfaceNamespace: '4mq2i564s3e1y10ih4v8w6pvu361nh0cd4fhti6d9h9qd89rqodfy39ol7ojp0j1nqxl48uhcueind5ooro7plqzqbg5c6pc0cc32315qrnd0p0wfcg9wz58cu9v3zxzuun5nrgh79137ogmxr1zta40hs8efp5w',
                version: '4opqkrgkc73xxsa8unuh',
                adapterType: 's2897gvahmy5ehx4fg189bqpqgtfooti580hox55um2o953yok9j6qu1yj4g',
                direction: 'SENDER',
                transportProtocol: 'n7pl0avn5wzmj17ijy31wpdmht7tb7srd3bf63qbgsi43c7d4u8hhgglmu5n',
                messageProtocol: '781k3nume0msp8tr2tjn8bp1o8wrbvxt760j8aa8d93a7n6gpkc9ws7mic5y',
                adapterEngineName: 'wfk8vj2rowz8izk9pm92uw381yfej6ucn0nbrxie11vlihc9fkfsmu3stfwxat1t77tzfvl33t85eqo3cyivy77s9cmrr4ukk0i4jlizzw4pmwxjybag28av783hw0p96vy1c975rqynm7vzf3mz72zcnov7b3vg',
                url: 'wn4lbvyls8naq253599i52yx93uvj4vljiay6cj2h0fn3n1c98nk851ll018egzfbdfyyplm70av9mlzmb7r6nslb0e1xv7vgd1nhjcnh2gow91a81bgsbtbfbzizjqgj7n1slmbe1454g6vq30btch71xhgy6sti55v9sznfwco7454q6u4yqghkmzotfpbjo4csnqj0dpzq0mfy52eg71rbk1465u2hs1v6eoichd4iwa1u0ki59yx95fp1kc6xdic2f74v2g4xelv1c5nc8g5uh57hlgx2mzveh8n00n0k241luk11m971fmrdym3',
                username: 'xcas40ivqjlixk05muq1yo0k4clhx07oonptr2x8tu5xozud2nb33yqolaqr6',
                remoteHost: '96fd4gmu6vnwttc285sy7xdx63b3ld7dfmmsdctshfzh3j8dt4i5n94igtns336h5tf5x2mmstzumw40fiutoliegih02jk94if3mpqeutew3h2u4yfsdmudt4qjhokqthpjnfubw9ymg8nixcukdqm0cir97ock',
                remotePort: 7035322976,
                directory: 'ge85zvsci3tyngenff3qobjpzuieum7o0z5czoeo53m7mqsoc1lodsmm49jkad3tkkd5sh52suis2nrcc94vf0tgtkwmcm3ys2iocd50194ruy86j0t5qpks8wndstcm5ipuc7z3y17mjjkljbsap0atlzz39px2c5a12ja69bo2ox8yuf6sk0tzay2gefkhmnv0zjb1esd6n0r29hfml87emxvqv5oziu2om9zs8cmcoq36vj4wspsivakqfwduow9fmdaq6ba2tilkmqucqr7avsz63mz1iuat1izngxl3pieza8lp2nwbab55uyxac3npucqk2v3feb2b2t3hjvma7kwlchqfjhtcactw1zsr2zm9rfra0vu9tzlqo8lsr8oy1gt7fw61e47mgj0fjeubibgvop6am0vp8ko3nwafagzg8njk1y57fdxg4izvnu87ev940xi6f29rocd4ujtp2g367jft43qdxh0temppb2ne7yrc2qecawpsrfo5kf927evun6pdog70te4srqe95aj14piyazu60nbi5sty3p3d0wtmrgqai7po5una1ao8vlqdadhlzqwnu9wxhcu81flivjv0nq7bfmr610gmgpkmyfmz5aqitw3za63ti8ck31o5ihfztlx3m308kbu0zsfr8m2zlut7wnb48dmqimb6s5wphkwduhi4dtgj243zzhd1dvtby0i24m2h72h16uocj3v2hhvlc5xxbcbwpf33l5d5jbnb9kpjgdzcle70e6rg2bgbtu06hdu0gbeoa47szj4jie979a7ybvke5nbrrj7it7nz9dracz6l6kzw64bui5e7qm5xxv76gmmxwmrzmb0apqes2ogoqnq0b13xffy7nrxw54v5j6exrn5goekmhq5h0hl1iddpqsj9qyy6w29762fb8f05huq6cn9txjdz9kfx5a804nmfolvu9xq2395nwxblr10s6e6jtx2oty9ql1w41hq5sntif88rimdtw1anxp6pyzv8',
                fileSchema: 'xy0hx174jqu72m34sbq0n9pr4mma1xbilb9zjr4rhao58wg09w7ux6s3tyzx5k2f0rm7e6q61qpq947sq47bkrk9zlaq0oen71qsn54omm29f5725ltl9wdac5s5tuw8ziklraqw0iecnuyrstinqm8u5ymrwh4d50nqx08f2y00bf9x4u0j8wj61ijwovti8035en5umlvs49xu2shc18qy35ascdaef6zfir62cxqp4bim8v67tyeb8jx1trl48nyrm555oa6ps9v9wd9gqujkhyv3gsn2ncpoat45ahawexb49sbap5acxoey6sbu8a2ptlemo3xfy1kuetqu78m9f1rc0two2r7qt29hwpvtwxbezke902cj8zutwj69ujcsrtc1kivp3n141mwdv9q1vw91oufmmix15e7cqw3fiykphwxsj50s1nqu5rvxy02vs2ktylq5y898q8g16zso42ewiul1cq0y5p0zbokgqxp7u1rnk681m8ect2clrc3u5veoa2et009fucz0732lt9hs268c2jlnhb627ungu2o18xud83eq9br4sekofqelo09p4b5vgn571633f2b4g2rruxu18tayf700nw2nji2sblouj9dnt7omrtnsd9vi6je0hp2odk3gigg771qgd06r6ejmwcmhhd8p8hh3hl81okuccsewz56htzd6kynfohuuc5wyq9oc4y9hfb0gzd48y2e4qhd2737bab86ch0tcttenz7cxuyvv23rfs9l5ba2xlwq0nxx39fxra9nxo6omjvoo0bjq1jo0ycipdyd4osf1u2p4cd5rglc4t5r47h53mjgsf1dy1la71xfvjvfmovuu9bumtsoohs8b46wh9m00s9yoe4vjzkqvm33cd8l3z3nd3yk4lugrynioujwra8hvb3pdf5l3lmdewkbist5hbd247ouy5qv3tdg4psf61uipqlcr0wz7trzw55ory8o2l7tvdb04u6ou8d1xejs9xl486e6eh7a',
                proxyHost: 'rko9o94rahrd1ha4j4hp7v52q4000qrgzlvjzmvip4dtqo2nzhgnt52dp7hk',
                proxyPort: 6760947503,
                destination: '4d0k1zk9ggt3fvl8oyod3iwididyzs1xs65ppsqgx5lxf1ml882qontam1wok9bl8moobc303a9hqyl1naaf6t3pryatjx45r39jb7v36kizyfo6b7lk5i8d61ecf74vwfrxaztx8lnd5s1zpb4q4mbvciqpbels',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cqsbkahbznc4thxrgz4hrxtcq8zv3687gxjhq632ii1le3g1zz6cfkaubas6hxl59p2eda818ju0zxcudi7s5fl0gj3fm5yaye1utoa3pbs7sq50faefljhx2dzltw1frcvjv5efef7c9c4cqwyszu499mmmbg9v',
                responsibleUserAccountName: 'oawvnwed4cm7cz1upzcz',
                lastChangeUserAccount: 'nw9smbqw56lezz7789sj',
                lastChangedAt: '2020-07-28 16:02:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'wmklggnx8w8rgqo67bng8s72giuznc8adrpv58qh',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'e7plrefh7flhoboq96ixgobq61qqvup21pulaqcm2im379rkri',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '97zoz515y5zq8z2vcl4y',
                party: 's8u3l3105gisdk3d7ro3n9k8qi0ro4ngcg8gbr1i6v71sastuk4gunne1p2zwd3iaovyhfgido7vglacfdsutgrapat8v7tshal34fzu22g6xavynh2dj4jv4mvz3ysqdu47zh5d9v5listlwnhko9c46roslngh',
                component: '6d73ogbyb9c1j0nir0qwbxigeg9ln7ksa4pobcboq6oh6w29lpaswbxf37yge4hd8fxlko6wradmw2mc2hnjmmt2zj1mbbl8i0u3tc6sm4vlzwqn0p75d5dkho2v4f9np3vmnx05s0sjh6dixajj5jrakueemdut',
                name: '2iqdkds61v0qrx5pwd2cfib0lp0snwviubsnfrfh0e6zzgqzrve3i67tg5pf40dhzr39i84b541o1go5cicipsf4ciaqfrwypk6kad7flpj4kf4ucowevv90n1dp4sm3r9qielo04jz92tjks2w3cd0ahgejydy5',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'awcg96pyl3cp0vh9i7cooa5hj1zsboyrstyznc3z09iiu2r3isvr5qh8xq8tim7olz9xz404xxc72q2v1meem54mmyf3jlkav7zuey1ejr1yzit7g9wg5bb4tmoirs0o3k797juihztkmr7qq7eri1fisu1sr3ia',
                flowComponent: 'vs60jwkkes97wlgw9xm770xu4o3gfpxsq8g8i4r5q6udxnkz5bfso1kqetb7wj1zhlbmsjkvbd6bp3cmi38gb3bwiwyd0kd96a16v35h5nee6mzca3somx9d3dmq7r20skvxm9fduyfbnz1f2d3v9q0kh2x93phx',
                flowInterfaceName: 'gqsa3jty37wycuriq387n9rwcrbypedfdvt4qp72qu3ayyt6dnlc316u2pqusj1wujvewvuwhe7a3yvoccna1yqdj3cpzqxpk4qcl4r4fq5s4u0krhqxor97jtnuw7xqybmw2x5loj65r3gdtv09waoxvv0fau5e',
                flowInterfaceNamespace: 'peolsh20ui67socvc58a7q0a5dmfu7sdj2ev7mziruas8p5lkz8rp2u8bn9ltwd1z4002h1kwosvru0njuv1n495zocg7yllidtf14ojhpjgmtxqzqqnepe0x4d4g3j2esqred1elqamom8dniwik2fryrioquql',
                version: 'ajny2v5r85v594dl735u',
                adapterType: 'egv5l5b8k1o2ipka2lpsaq3liztxqsy1ra4wqr6qadzowyepis5c54pvo9yo',
                direction: 'RECEIVER',
                transportProtocol: '4vlthugt3hmuvk8lhnq00f3vwtya3huovzswz73yb3bm0rb46q1ldu7i70x1',
                messageProtocol: '15hk8na65bvk7wcoh1u9yb6nk2pra0t8rrm7lpbi8b4r6oa100hyle569ke5',
                adapterEngineName: 'cjjsjcd852plp95pufmr20xym9ws0040sqxz9zng8e9hvsni5pe4hbetcziivufsvk77su3t6m73intudbd57vj8n247posrnviyhq7e91lfto982houknd2ixapg1m1o9nbk4495p9sehdzotpqlmfbxp9xxnf7',
                url: 'zre8ms0s8fybbf870vprq85b6mt9ntne1i2ochneyzt686ee4gwivgqri3ptnu8x7pwyy3n79gya7655b9ezdav8c4ivaneq6mqpu9u1dtew9vfxepx4k8q62vbt0601ovfc525mkl5oagmj9z7s59u1k547ma456ymo8z5og8ep761nv97y8odns2f7prxwscr0428lozspblf10wz5vzp0wym6xu60jfwah9429mmw4nciyo78xd5sjl7sqgh1z0mjg56ddfwnwh9gndua4jff3d4t1r0m2f2yikxcl1xgpvaib7t2o6kpnzjz3b6c',
                username: 'ly609ubh3wugxtccw8ajlfqv4bx5cmv8qr0c6g7f0b06v1ctiemswvezust5',
                remoteHost: 'z8mx3wlmzb4e9fvb5jdp53tqzwdnr4i4uuuex9id71ldfdg0l4wpoc4rz2br1oa3d4uzs4ufn0aiewu50skl54o9j3dc2bu3s8lkjhjxmn76vstbv4a3inniwixo2vp0nu5bhc21yv3ho98ks76bq3591o2nf8854',
                remotePort: 7472261358,
                directory: 'x541a093kt73v2wefvelqf9vkj8uh76y0hcsws9odxa0s59z9gexlh18w2qw2jrc2ily54toy0skxvren9u9easas972phn6h3gw5qrh9oy7yjzzr4h1gjaswqb5z2udyqtxwcftbuohojk6ye4l9ecyy6zcckjokt527kpy56vex1ay31mqhmormnui4y8mgzxvh9xixj9ebvdww1x0ps67oa9xk75b5xx3aicvgfl22ung8a63igcfcai1qkcs09ofe04x9z6sgy9tkwlpt9ce6qg8fqlpq57vbs5fuoo5j5cbjq0owh7bipu9m62p2mytpa3t1wvmaz5vvl5bq5ybwr11k7wyvqmnawsbagp192axzhe0q8e3upn6nrx3qj8l10gaaxymdlzdd00o2f9gk56535alo202t97wuygr6fj1zb11jqy0njz3ay8qrz7t7uvemrsl5evi1vky367o2hi24tnx7xahei18yorpum55ptuxi2aibx7jff7ke9qfoxch2yh4rqxan963doxjmsm0v5ggbh92gkpmwle4scpjnqn7wmay8ytef73y0bs7oaod80mpd75n72ved7y1gc09a5rpudnm10dlgd8kyj09u37t3f42orj6vp26hqow61z9hbryri5vasdwz0qgj2ss5z26k6bjshg2ydajey66b87cncyvv51j2ydwgcafheljl3na738qoas8htqtgnt31dx3hwglv9siw81ntalpjytrhd8e1uqi550lmkja5wdxdb5cw01j69d4ozhm25qegsk3casm9g6d24viiii9k9o9echiwckkrhrjbfevutjvz7cz4ggpp4hv4s5pdc8teuhzhakxs4cpjlskmey9xy49zixkgwpnix4lh2q2oj6l97m1mjlnd6wm68djuqqd6ya5e1fne7ql3uobh18p4fqq5dstzzqd6plbovcxfkrlz55h4f77wovk5ylfotky9oihk0qh90mtct79526fv233m6bxrqi2a9zx',
                fileSchema: 'bgvvahlkt2cat7nx7m3w5eea7gud0bir2w0ynfpeg0rimn2hriohszmrraysy5c46skhdl4i6br3kolru9k2evuzb2tc4caafqifbqtifjlxsd0ry7v514fswfwogc10w2p4riof02dp4f5p0vbh0i0fuczvj2msd16vjl0pe1q6pexe6x2ft41bqjrz3r6uuuss0qs1n43qaqzp2eca15j3t4iwrwnd9j05m6l3kkwsilm6qbi8ekxq0vjuvv8naqs2iqk68ap3d7odkym2fjzv9uy1hw2ntlvgdw3lbh1gt8307disyfb3u25uqxvqgoscb1qdpri5s5093xecmdwhhtg5ga6471obbaotoe4f3rczgdfcvym0ho3b8fu0fy4if5kbx9366qwvflljsu0hvj39pb04rmsgt6r0m7tcjjiwyjerhsm1foqvbuhmncz59vbjsit62gost4dxixnxhnukyqqso10r5kh6gh3ng6g0htghmqyfyd29vp3j4cani22xye7ti6u0vk193yow5szyo7uliims65dsqs8w3lkxgwfi933atr8qolo10m4f0x5abwtgl5aecy309ryhgix3li68uooemfs83mp3a7mqg6r55jkloz3ow0fics38tahs9lpa5nnrzkxyk4ypd93vcxttbgat1urwuh6jdkix4wbxjs9k5za33ctluv13leluzbnvs96zav5g5dm32y48cwyuy700vw7o52jllpnaip58oznnhygtalkdmuyk1ip12ab5oxv5vf25an8amnygxhn7kmcqe03y0ff1a6yjnzqf4e9wehcdm1tddwxpq6743ea6d0ra29k6nhfsobhudkkigx9kvnsmq2lh4lp2253vrwwefniwoha2s1l0ofrifa9ti8whow0nsnle6o2whl8l9vf5k81ifn4zxxvop30xusoezfwununbbxbfm1r9t4035yu2q89zpunb3ld2qj1l8hq7rhpvtxork3fs79nkaicigetgou44',
                proxyHost: 'f3wpj85ydc9747ypu1rwu9thzz6f6xy7kf1ayzsjnvh5nstjbuw4b10gv5p3',
                proxyPort: 1467822713,
                destination: 'tpj6bq8w3zmdzq79chgqr2c5zu2xza3pi28bcsxkmwflt3n7617zsdw3zbjh95pfba0or26ey9lfd7whbusvoa5eiajk0ik7myyp29zusmemc27tq9am99ruc8vtb541cj2nk9g3m9u6f6sq83u5u280urc6umfq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'n3pdxdv2hu2ef95eyqp1dr0r184xqyaqvasl8meniufk51wzv1czqiref8yvxk3is3z56lztbn5ui7xqhajjun567460lj17f10zpp97w1f20hkuuqyaj7rpw7bdcss9soj63icwl2p5nlh7qnbeb75dpg9hctoy',
                responsibleUserAccountName: 'bc9qfg4e5z5ukbdyda8i',
                lastChangeUserAccount: '4sbam3hjy9kbro3uodtl',
                lastChangedAt: '2020-07-29 13:04:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '7kozowncnml039i46n3i0bugs8yyttcsbelskhz9',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'macm1ypmpkd5q74pz59wnxi2b0664la29qrgra9wotr2vr7h60',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'renybwztkvzpe40zu1jt',
                party: 'bjzq3bqcdm6qcdbjmyugm0jfsy9i8b0uqpknw6qa8sgzoomjamgndkqgek68ck6isnx9vibcj4ip2xh8gyrlpnoefhbdf7o7ki1asb0aebbhrrd5hpwbtstedue6yf21vxzq7ursna2tpgpe3y6ps13o06hdgkgr',
                component: '6qvyl1bhgjz73s8ioj2wgq0i1z25hl549ntdmjg5q1kvi9lrnezbpuxdqmj21dqtpjjc1y36dzdzeue83ytkxpjgkcnahlw1y0w3jkq1jsy8xyoumg0zhkidcofw9vy6hovevzx15tnkd7tcw9vrqohh5fupb3dn',
                name: '29wrjqei3mv56iw0kix284x5lkzv3ttc4gn76ygdcntquusl1052jz3vik6qocwh3c1r8415yr3bz3kn5f02a9uz3tkczzxdsaw3wszt1zwxb3hu1fu8zdgfg5ft1ro6e1jm63dpuj1tfg21htmk2m0o51u61qy8',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'fbifaoz74l9h5nzr8zh9lc42x8z345fau719lrgie6z7gfews7es42ink0cugar3qhqe3c9jug1cdas5639b5zhnv4kvtpsfifl9kxp5g4r3cvk27i0zdc1f6rw1o6ozyof9nbu0niz2nww4xd9ukj2939mtanuf',
                flowComponent: 'j8w7ma6122cej8uclb7i5lfz4ktw7ivabk0tl8th1ysqywrym42u2wo7eiv10hdi5eunga2zua0l7trs2xasknvjdn8tokxy416gknds5bk2hd0lkivg57uwmf3zpbxkhk7m0f2nu9we4fgwlo3mftkdytspxr2r',
                flowInterfaceName: 'gk44cmyj4m34nt2d5kbfcaznd39l4lfo43usif7vvzc0v8qvmlh7ishdr8xghxglb7ggfy7phtv7nrwtee0fp4wm158xqekjsfckvthgjxoau8nccf4ypwzav7bmq4u4mgyjjdf5xbd5dt8l5ux8l2jvmxcmt64i',
                flowInterfaceNamespace: 'pdl88ohf6zwklaxhi6tdd7thhauiahabc4nmw75o4dhltw2ml0fg9hoyqqfld519mghauk5dfoj4pdmx6txnrb6d5ob96yznmw2q8rimut1u8ao5mh6qaas5euf4831u0cqwkfxpcc0kp0de09qu870fx7iblf9k',
                version: 'uznictfireh3zjs2xbi1',
                adapterType: 'z1qmsvjae933wf40bydkndkf6gd8b6oqd9s8rlfxlnip1tzr7yqx0dug2wm4',
                direction: 'SENDER',
                transportProtocol: '8s25crcih49e23dtuwjompfkxy5ksaxmvz3ekvxiy3ypjvzlzpcsoa7ep95q',
                messageProtocol: 'g5s6ytwwh9dimvbsmowmcy8kdqzw4xfsxlegkkw8eqx2thtc6fyeho62k3xb',
                adapterEngineName: 'h47rk2sxnisy4tcdlfz1i4lul5dh8fwpob6aw6oqcnhe259lmptqi5vareudx4t03hivvt02r2mf5vxu5h9phfo19sqmi04fe9pa406xsl48fpycaa8czf5h7p35aba8m0216pdxucdplmaouqi5lgfgfbrtag45',
                url: 'xe58qo01j73a0awbiikwwa2tsjqfceow39q2z7k7hx9ac2ooy2v0me4203fpg4gv0e5vday1904y9vlxf98jt2cxz7oy3sstbpupc3qmmdjvt0ps33r8w0voiyqv7qb4d58palonqli8piqpavsuddbfm615zom4nv8pvqlpwi3qcw6ti7ve52ef8bpbxpjq1qj9bovxp91xkydvj46ivbud6dtchbqxihlxcd480tn894fl3s9nxq1hfchnlp1qtuwyk1i2iyw2dfm2baayonyjudmgsgx8i0dnlmaord8tzzfh6kasieu8irw7c4sz',
                username: 'tecemvwykkjof55v9erz002a4m86a2yv4w773vug0aobalrexhtnxytgfzun',
                remoteHost: 'vh1d142bvkja0dxxhcbpo5tn3ztf2fbydfndmego3jj7znteu25qbismg1ctv24ektkb3pzbi5tweqfnmknkx7obqyjqrscz43sp9m76hh1uv55fg5v03x514ipjkiqoq1kenxdv98by3kaqsf989yulx42hnazw',
                remotePort: 57868536982,
                directory: 'xgdo8vrv3gsq6kvhe2smyhzqrbtkzj9ykry0kc7nt2frtw5hzyvkfme75og9ccht4zfqcermv7twhp1t90bdpxjgkghh87xxf2544qtjqp04ul9nqxeqxamfbiglp9kblicoc0yyt1qbqnkfk8ibwsv8j8407i1fnw3w3t4fdv9hlbh41kxqnhcx3uj42g4hga44nexmetmt5u4jfnu152xy8jr2lrcuf3f5m1pd56s6hc5tgqqdvax4qnp08v0ds59ziz4b67yqi0axobk3v3abrbb4u1t6hb024ig308psxjzmf68s4kgwpct3nl1l9akj2b07qx3s04p5mtitenqhy4eh9gab0tlet9lz7niw1ld63atyckwy7gt6igrl2nw7b98x2uxt9yqhorc47ko6xfcnh4gc29o6o01vwrmhgh7guas47mr93zc96d8g5au24y4erugk84xocq24569q7sn32k6ee9khrddevbev6acg4lvgguqhemelmu3q4rmvrkoqrhfwx1qj6gkz95az56yl2wwe7n2dwgy6y54m9wy8zeqbww8nskie897bqaca8qlgq6kewb8gmaxq2syqpp9hum8m0r2okntq84a7lrqfnj55ne7qza8gfd6pmdjqztjy22j17edt3348gztt2qaghvgzfcvd45c3lmn4nwrsv67zilrsdx4ug9hk6pzaz43mrw3qshqzwnc6oiugzstomifg72xo128z6uldn30b0mpwocamypcj5zgvqvobc6r3y5y82otqas8kyr1d5w97ot91xyoeo9i6w93ljh4hp6ilnj6y2lx1m5aebhgfhlt3cykc87rj9eq84i5nhh2hvrwp96z3ndj2g71jgkxuq6no1b5silr2hh6tr91wbywy7ttct718hyqtlaxw969s6641jfb4hp1xwqealjv2jefb0076qlgkspq8x157w84z54h9mechrjjcuvjk06646qaknxojmeka9hgeakscl6fieznakm9q455b',
                fileSchema: 'vgn8rx1u77qfw6ob3bdrvrumr1800y12vs3m8o4hg41mymd2vm6o6avzr2xdzjskuc43hv59agvcss2uotledv133t4ogydikgzhyjvxnu6r58ex362y3aqlh1zwp0w6x9ak7e7x59gf1sxyno9z4zf5sc6ne5js32qyby7o2l0pa5p89eydu5df8wu2ljdugyh0mx1p97zuat6clq7g7ro7ucjev39t7hrll9wrnfptcw35iaypdqdw94sek5uc1gpu3rr41ikw59f158nhypwm07luolugr98a0f9y3rrcf6pugt3r5wdlu9fm201ougzzzldlnllwy84ua3tglusrnqqcvwuf4p6npelydz3092kzy402z6zyuzgkph5i7padck61dikv7uldjkvif7zk9wzq24f1gq4e8jmdcliojfn4mhz7xznscy6kth6nkf0k9hxyt8evux98n8tkuvhbwfvpq03vc4frlxbudbw9rbz2ui1heu4ux4zmv83kobnleuj9gq0g88op4gmjurqundvo944iit0ihnx0i4iheu4sya5q97d79jwknfxl1v3wmnk1u6rsmnabkcofeby0mnd60ju0k65p11zqqodfelebnwmnhi8l4gu3lclexh2ntj1lj3j0trwfj58h0a41bm3qm656nci3copglxziawanblrmrp5hjloj1w1nw4ncnbmjwo48tqsgpeyp31chxyypbc8kpsnya88yqi8b0b7ykpd3e0tx5wrmn0xtvwa6zudig7hh35nlkeb1gkuucwlllbdwhp5we2kkc4kvu3l5krrlh4x66ahqin4j7cakofn2ej4irjplumxezgvsnk5a3sh258l4ea9ruk6sl1yclqf8de2h3qq1wis85nr3jmjew7usr1c87bxqtgazx8g94tk39n3za5sg4trdzwyb59bjkngb9frfi8fhogbazmvpg8ykryhkb6gyqkuu6kn7s4xyx2hdtje9yb3dny53m539bhkroswup467',
                proxyHost: 'j2xjitm5gcxvlfhinz1t36pn7sp98ehx50g2p26y8vjcuuj7py04ojzwzjn9',
                proxyPort: 1183256353,
                destination: 'soujldz3txknc0g7lxjvq20py491eymn2tqdo6h1q0op7wvhnnic35j3r9gc7nwtcq21l555olcubahz6q5xqqqa8iff602ja83chlmo473py6w2x7bkjnnxwskdesbjjix5e7xttbupm4js1lmxlmhztzf4j5uq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ycaxw8fyjihcm7tyi701y32ujbcigjxhos0jncuogwmgz0j24ht3sbqjfwrd4ssue7zj9pwijz04ypgd39965aygjyfjpwu68yboqsbn3lwm9l1njhmma3809luz3y8kjw2trc0k5lla62p6vxpj0d02ehg6xnmb',
                responsibleUserAccountName: 'whp2n4xbhjsbmotgjn58',
                lastChangeUserAccount: 'pp14e3fjwb0cvqcj89vi',
                lastChangedAt: '2020-07-29 03:33:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'fuuos38602bqct2iq80864yvzkrjgel473x9cepx',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'srt09gete1ggm8a9581rm1mnu38nfbqsriar3jzbdzw518ph8e',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '6a1495v0bo7bjuokjlfc',
                party: 'ld3axmydd1njnl92y6n2e72svatil0whmqfgj55ty4ibgosay13waiz79yth5rcj7zstc4slrntgtqzdxr1alr6x8cboml2gnvjr32vs5ci0sgjixlzihu7ebh3cvundzbqofmeggwd7lnfh08qwf29xu1m3nb7s',
                component: 'mlnztsefus3qfpxhukjcgqav7urb80rwmxh5u6lt2k1i6sk6h3ygm69550qqs6oikzf0xyzbic3903pr6ynkzicwbvsu30gawslgnph5ydqan5dps7m0226oedhby8gnl9l7qwpnlviq63jtn4gpuxrulj37d4xk',
                name: 'f4s47tp3imkzvw80su5qydffymfnun5fm7s20kjbn6cxwgz711w5gsf4c4ohhzjzfaqsg7zqhtevns3roi5lly60d1bnbynw3449sxsuv6tkybg5esjd8jb2s21xqu7z32zdikbamxx2twwxef0ioorikxj50oo2',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'ick4mb0o6b2gh44fm1hgqzwfm4ho33muzotvpu2zdgl34j5sm9gayhk1gs8has3mti3ln6l8zt91fl8ox5he8pejj42t7l5yj9dyla6u0jmuihtt28a2t6uep6rtbjokb0jnubqi38yj0n0b0g6cgc6o6olhggc0',
                flowComponent: 'do7t9i292c995p6oms03drizwys086oim5y1cqtal7qvv70r7odauybtjr6bdzj2yztxldavdrihm2f7mipgsphvi9if6r7w7dmwn3x3su5av6l5ji47qrfi8i2uzq37hrvec542oplqekpf9bxi4iqlka1qs9to',
                flowInterfaceName: '71j0dfz1pzn929b42c1duno7vtqhxq0oo0vqsrtuq2n52jc82bn1bwkwrwisc6t18qu6wuzq91u6i4hvj2ls6lfavo6b6c5dkaglnwd7r858sykk140jc0c8eo3fchegou4qpl1ze39kglw9ywyxjr6n76s5tkqt',
                flowInterfaceNamespace: '7mnxsaukc9dfxam1qbq80c0enl7vw7tlydwzxxuk17gg4n5cohj00g4q958x1b21i5m0qi97inwakfnvsy5690y2ix8fv5v46ad0f9al1976hqysucna4wigituiz0w0kjl58a4uedjb5d6xvc68b3a3z9n78tr6',
                version: 'kx8u5pimz1w5cjwxhwv5',
                adapterType: 'y8wt5yo46qrccz82tjfwl62c17eqqohlbxiv8nxhlnem68v2tvb9l38j7bcf',
                direction: 'RECEIVER',
                transportProtocol: '1unn0evd1lkepoj1xxn3iion18az0v8qmglzhs1a6vshlfnzkw24gdwf9sfq',
                messageProtocol: '3kzpwcb39b4zhtuk9nmpf106vwate8fqgqbhyv40owtyxu4dqhxpxn1d6xtu',
                adapterEngineName: 'v9y7xkem0n5p0jupy8s5e4ish9mkkifi2sj8armvgxp1pjyksd8q8enr1j3srihbxno6yp2p6t82ue39xkp7ohfmxfw4osnpj3tgctfv70c9ctp917zk26ge65n208o7osjepr8ni7hgnf1g82s3krj1xz79dct2',
                url: 'mmt3jcmo1pto5l0g6lwry7suyz6sjfqrplcynrmgfu7f9oa2txhyskbrhuywp440e51rbl7y54i9kcdc1m277n0ee3ak7s5m3esjsfxy3cjvf6blrenadt9sudwuh2eojhzubaiplcfxdqhf2zm8trm10whshlzwrd6mr53yypnmtl7adq766mtak31t3nhx9a72qkhcufx6tuiej93kvg9qsyixkj1e7idpsxxd51yygkv4mb016uwyr8ulshja0ic38b2yk3elobxo6h8umoc8j7ulaj23ri1pmioe8oajxzvhlng7x8joyrced0oy',
                username: '1naiu72tpb0wus3eyd45v1wliwj6jggtxzfg0g3pbde14t4dhwns09kjy6el',
                remoteHost: 'v34wxwxei75ryvh92yt2c2j8mgk9odk8lnr2iforaesvd2qhob5jyolzytjgk1jrh4m5rynkzrauhx2sqsm7mx23qr7omn8juhn6cjfi6wy7ki3x8i95c4hpci3u3pu1pjesvmlxh1iptu3bmbm1saj3qqrd1vuu',
                remotePort: 3946932361,
                directory: 'v7cp286cpaf770t5yj2li4yj5xqdl9zobatpiq58fj6etmmtaxg13oauplzailbkr8iz65e48uadocagle62275hhnt7iqfj34ea9afg9rvpxn26baqnkxcldt6h0uwaj0jlbvz2q28cyd3fpc2quvdazhg7e4gu8ppx017rdxxd8fju9bldysprnl11m1q8z2p5xg5hq97bwc7zl8w2hqk3hz7jh37crqo1g1z2jd7zpc6z5sfuia2zobx9ri0y7iqxpae4bplbpmjxuwbdni9tq7mjjs3ew0wxi8f3hnj6ejf7bmx47zrv4i7oxd1xfu8rrnsl02kcfpnhkcghvpl5e3rtnuwqtm1ox8j5zseoqijcz33kvfon4iruxs77onzbvh3j83g50a7yfekcddyxwvfvk5if56a3f0toyr1lpg0y7xfzcj17iptyhgyulrmjmnvucy8ogq22v4qd72q5m46i6uic0xu62cjfdrfl1ciehf3e5xcysvm6fd51htfd81n8rg1akektnz2m1o29w8jvecajcmvxq376fljq3omiijxolz10uh1hvxuaqqhy3b2jq04gn568jh20yev2knbzqo1unw2v8f912vw4tnnwsj4ig90nfir9zepu756e584gr8j0ggnctywb33ww5nodpmjp1trce3edalm6btfw1ynue6uaj1onq3vostmwx53n0mblyjva63dhpzjgdenn45v9z6xeg5ucavnfz06xrop2tva3mc1919wmu5yrq2vaj3krst4oxewmgjhvsxwwfzep95qhosq3qg9a60rcngrrtil5qchh3tei40wwvogrgqj7qgsvwdttsha9nwsf70th6wav0jt4xbp01dclujl2fmae2zg6byil6vusfxyg7cij8ynx9u2cj5s7qpjp9col6erl9mv8s6wvbtpwur4qvhhlhc25oh4pk0ssudpm50yeygod721ii1hbfnx6e6i0aeg6jq999ozusgcc153vvjir037ootz28',
                fileSchema: '98t697o9wv7dicfz0ui8xex8ebqbll54u9lknrllx8zsbyoq5uy77zqk84qq90495z74huqxjyrbo6dnd33b01pdk3zfzhm6dqcsfwqqwggy4gj0ri54xn9n3i9h4zivwkabj45p661s3k4l5vl31bmuxq24qw9j61a004f1k6nwcdv07s5eptdo1q77gbihhf7z6xxxbq7r1uqn7dsgpgehz5sskd4pbmpqzb1xe29w1k93i2i803x0ncqno5fp9it4wkhxn15j791xczrrf8hilenlbcjkfignok7tmx6tmx4qignf5o8pofyjq39ezxf6zkq5eh17aa62te8e5nuiwnha9aym2h9lj4gmrypu3r11v1hpoe2ic3422keuvf8wzo4ks4i9zvgrgo4ozag54h9tk2qbofzg6iflv68g6frpa7eb3yuuw4sydmebtrtsmsordvu14fc8wlu3jkyrk740il8gal5f75zd6wo0woxd502qta06lj5g31q9e734w9ulz2zyaz4rofa93owwabppzi9w2pubkqy6nec43sjlalg0mxc81p72o8efaxyo7wgjwooyjaqgs84gveim8l2heb6l3b0yiavkbq5a7tlm344i1zgtz3e9t4tz1je9x23e2wcl1gsshvbjzhhewpfoee6o449e586ofuzmzm2tuwusyqisuald1bpzdys7aand4hcn1ubosi2oaup88hfybwp5ymgwdsp69n9mzuothnijh2onppvfw76a5xyticxj0sklvq54360xztrulge1m4msv43vn4bgyb8tqelrug2qee3hhwrm5xm8teyt9uasoplfna180a2gms7ycq1i6hp0485m5z7sxnug0bfmhx8iqokkpaw1kzsunl2yhgghok7az13o1lu29wjqv3o7c4pf11262afbqth7s14zgon66shyat80ec5cqqm3c0keqsopb2el29allow4x807k4gupu7dcr4eb2emb16tnfz3histzdivn1za',
                proxyHost: '01w7hyv7z9gco0d0b0qd47qvof8px2afsqvawipdgsscyjouy9fvv067nn3i',
                proxyPort: 2530809517,
                destination: '9h5e9455qpcm45tafpv2ry0cc9nqblmt5rrta4db1tsvdjdu5s9o6wz15lew1gy5grviwtjzit9ttk1v142hxq2ozok1wrreuf4mxskqgwzapxpd4hhd9rjj9z5xsh55qzbujcfi5x8oru0wv1y15fzoo64ggr4c',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jpfnm2ewkx2gxxm1xb4yy3ra2mwoary85u6g146hiyl1viegxh3wb8rd51v0kxobeiy31v7o9ammsatfnuqhkkh02v222v2zg2u23b2zv5dtznwgny17iiama41x5kn07xwxm2mxl7mufogv5db6jg6bknrr9xgf',
                responsibleUserAccountName: 'kt5ds08alc9j8jvhav0a',
                lastChangeUserAccount: 'tqe03c7r8otucy5zxavr',
                lastChangedAt: '2020-07-29 08:16:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'cwhjtwlojlyoabedu0yfoa7cktujhcy8cgzptzbl',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '5jmfezn3jrdu69ykl11zojg3v8diwa7oi8tjlpdtul1xz7ekei',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'am236umb2o73uiqx1mzo',
                party: 'vrepelmfbhxvmy9e3cgb5ytdxx13jpr7dkkj25rwr9uouzynvn89nhbmd8640fplqawcsei3yeczh0vkblf1q3v5yxufe2dn45whdrgdh5uf3ux839i6xc2czwgxpy28nmoejai1sugjtjvqgoumquhza6ddmwgc',
                component: 'kf0ns7ui73po6i8kuwozd949ififipbpo5gw456u0m2spplfv45f7pvtnh713mvf2umebqjs3b95p0ozvb7umsf8xj75ufyxfatk16rjhws2c9usfyzglvc54aivz479kda3efym4d47kfe0sp8usqgzfezylizh',
                name: '5cgysjble0kijtcxdt0iluc2vh3bon5lfvubbd9ue85ju35ac82kbltp0oh23p46wcs2wpe9ebnh1czfredp4j7xqpdrqvwlp98g5vt6wqxrtdadjkvtnw80nf4yhngonnp21ory18wyjyb49yrybo8961sq3zel',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'i2560t9f208vjzrysjpx3dzoau2190h17iwt9u0rivt0erhc7euypv7fnf98cx56gu01myl9vw7mci9r6bl7wgy4xoja80ehm1ryvb1juixqmzl9fbksnk33chkmfhxk8l5oqpfj3azhq957c3dofzc9razu4fp7',
                flowComponent: 'f49ap3j82i2tu8k9oxuncaf3gvebz316dkjrnvemvh499nogulk8pu82wui4xjlh36h1k2nacn9pl0ikvj90rrwmvrvzdvwg2srntgvvd182yxu8uozao5yodo7rocgqkievmudakt39wvmppmf8gokk6maq5bwp',
                flowInterfaceName: 'wedhqo8r2e1zwvjxdcez02sjgo1pwxlpiq3z2hq9w6jrgckogdc18kztn3lp2s7gokshq3hu8mrl9ml72vgw2k414s8j4yps4kqkpht8bqm28qz06vhwpdn3s4kaw1upusfrkmhmur4vk65krn6xf28mt4yz50ch',
                flowInterfaceNamespace: '4zujmo754pd7kg1oax230cndjfbpvlthsaf6yeyns0wuwz73f50kxw56abjw0lk2t4xrnycx93xp43sgukirj0oieerllh8394os6oj0ynum75ciwx8lavh0lyf6f28aborko74lk34kg8akyscitk9dcd14atbf',
                version: 'fb6smmaypo9iuv6522ci',
                adapterType: 'cdxwsnx2bu42kdkdw0e8sgya3i07kqsimthy1ga5l1rch70p8x384rku9tpd',
                direction: 'SENDER',
                transportProtocol: 'jyijngy37vzaerkhye0v8laqndngw3rtdd5fhdiby6i69bwyd3tss8ki1uu5',
                messageProtocol: 'yb0vnsie68ygmh777ema2p4e3cpfsy7r4gdbk9kqrllspuw5l2kgf6q4m6e0',
                adapterEngineName: 'irphn7zxzy6dy1d45snf0y5k8r02bxnomdzfwxazw7nk7rlq256ymqtrd6g3sr2wxznszfuldhn2puy3pqgnog9xahz10nvcpe1k06aprfv8rof2cyn9zm9xp0ape2bd4zohasvn2mzb3vly9kfkd9jhqk27gqcp',
                url: '35bv92sfgzg1rislbm3s0dtmi61q9a71ojvxt0uqwaq3ztixoaykos7ri7bnv2wmbbdrzm5fy04j48jn8hei5eoui5qp4dc3y6ntt31iyvumvxj98n4iee29hflqnwysigdv8c687e4jac9w8acm7v4193608lxoau0jfcwabsv35b1zf5q0n4h0vru3o03hc298ih6jj7i0nxyd54fmspr81ns9d8dhg10gwqpk60y5xwv0bnek4ndaifsio480w0ny01vtbnbev4qydtd9tfttj0rdz2z05voou53p1bwdtgy39k5e3ni31xqg9g1n',
                username: 'jq26moy82z3iq64ap55xuimirtav65f8n0w35y18o0n5cjddaeqcapsy5n1c',
                remoteHost: 'h0fimlqgsm07sd4pbhzsksk4ttrgkzqhfi8qyu0zah8lw9gxblf3kjfd9kur313bu4y94m9rdlcsq6kg1t1heebfmeso7pj27288566g712v8o6e9cji4i5mhrzdkgf0ll5ih1nnwg2t10os2koonk6pt0kd6hos',
                remotePort: 6688752075,
                directory: '9fheq8e52hltuz0qd0shappzzrtvc00tmk1quj46tul0rie7lsgb6l7g2c6nx1ggo6sbwn8joeydnrllz0l4vkrj6eaqboozf2u1pwjap33bzp44wyq58zam7kp3roxcfnxqev3mh1roxj4evdctrainlzao6idsadz8m7no7a3ijv6caa6vc2v7s55hadnag28yjhc922pmpphql68ssjmaxq3w0mkj4hhxmrg5wg9sxld6b7clrsjkfy2zctk3fsufmte3lyta94xwfjivs7kcq5nr22fn0hlwm1ro5alt014x56adwb5o9dpx4v1r063btou4z1ednomlb6a0zsxxh6c958ppt93uigf60ks9ex9n3i1rewfilz3gql198z7t3myeqwpoqloh5dnj6ialy09zy2bqoag5wul4bbv16tgmr92m1r267fem8rtydiie2xh6l3iwuaaem0ljkhv1mi0cuh8swvmp0t33zwj7ip7of7wotimrc8fpci5w5o7sw1lo1284vdl2msjcxsz9anr8vo56aoxmto4h97eixt4us4gq3kq4yf2spshhtg2knv7pa14crapxpt35k3erat6n0z4tshrj603lxofo32vghdumo8nm5yr0d5hwp7skchd9nehsm0kcnwoc3691j63bm1fhvhc95bdctx6inlcgcmgd7yrj7mwyigos2br68idm2j124va1j13b7xktsy6tr0dct1rniufygw1n9qbhaex083kity0hvdbt67mzil03s4mjdg729fuv1y722y7aiqh0p7kdqv03kxg2vqhkvfeet9n7zq9dg4h1zkq98y91xp77r8br6sncoe2b1dpdce7xiphnr2hqjla0c975pf2zt8a4oltrxg2hcr3bgdtq5m1u9vaohw64c0gvqyt3nem3m277d7czqra2ucsu7i9kepa9yjd18xj8f3yegffveo14t3onrhgwrf7k2dsdvcb0ja8tkwpr72p4gpo4xpshvxhrtnkgiqxq',
                fileSchema: 'soqe2ffitz87ablpiwjf604i5xu9cs0c3b9vaneaec4nd8dnfwv9n1sthx9th9dzrd13lgo0u50x0gooeijfni4zp6gbh70lx1kk8aooqo7k21uhp3b9fvfdm7vdt4k0jukzega8ctqnfw0kw36p89k49rjua11toeevk07a5rggy659grta37frg58s0xs2fnd5odkzuk8z6f2h2q88ma4z84zy4eiohxth18zaiu6r5iwbafuigrigvxdz6nqcakajuoy8fthc75k74s9akh5f2hk5a6ab5l4faq3jwobo25is8h3pilhkwmyzn22nsf0ql5l2mfz3aw38dw3ucujt6dyffo67negqia95p3u4cr7mjbh8tmc7h8s9w6t55alkmrlmfu71qjgvby2zr6bz00iczc56pqiun2w1uqbjubn35ctljooz4h5m39x0p3yj662gzz25ik8ki7atnolyqhb8lyfk5gkcu7p0kz288weqiujpmquk29yn4st78qciuc9qjlbe1kd5j8wf3m1fopf0p6tiymbgu6fhktlvxlpbma5xkz18xkr0bqk36dcd99040j8pjfe923xbxcsvst4d6jcnwq88txge3sxb8p1gilnzla84kw5vpt6gltnisf59jpbejhhf8v88ncz2gprilsavuhl0w5y9c9n9bkvw72wlehka2ehy6mevopm7sfquozmrs0vzont30h2g9f1gawsztlh8xx27ns1qtj4vyk4ah0w7uu9w5iu78jiz43peqjxzwip4qzggqsuf8bsopvdzcvloz7mrpipltwez73l3e6z0aoiegzlyf7um390bpnnqbzong1euq65hhfrj29mre541cqps2d86c2qgf7z48r56119ymwqlx8k5dn8c6issesec5i8cjkrfguopxjf1qjcrvz1f9jvshsw9shg9474cgg6kvx2r1l15jqhp5w952uwud203jh4erz21kh7p828h2gml0zf63lxvbozmy39uc3rae4hpo',
                proxyHost: 'iajbkfqtoz8mtl8m37lgvmxe4ur1i6gmm41f3mtier3yqtdp2ydfd4ofut7p',
                proxyPort: 9450391446,
                destination: 'jh8r6gxmvtthlqj4b9aa9w5lzlc4plyjvr41bhfpzu1zm7iz7xiko1io7ef7egfwy4yfq86lcsgg87gj17o5r8h0uxklnex890sx9o5hu4lz9o4a1sgpuj4o3zr0kjac8rqna37ef0dm1xyeggp04djw9d3mlm18',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ojfyblnlnnxfsh75lawwc1msg6wczkgtefs6t09n3z3jjipao6aeskffdioxrmj6dw3h4mtnb72cspzvgbfugh22pd7kp44t2sogz3w5a7bjrnotonvrwv1vd5zu2fjh9fumim3s93k686sj6re5hnh79xxw880e',
                responsibleUserAccountName: 'hunvs0nsv2m1qrepagnv',
                lastChangeUserAccount: 'nw5tgpnv1tpo9nyw6b98',
                lastChangedAt: '2020-07-29 06:15:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '2lrso8hk8eqlx8rfi77bp2w0swvlh3mxbnc84yll',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '7szrz8qc1088d1wa9udp6zutg7swp6o3cpv8vo6x5cug1s7bhs',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '7iez6zi6h4vl0vb1iyx2',
                party: 'j2flf1035xhy59v7a92z4zqvhujcnpwzegufrhiuzzve8iql7wikc282r2hsjcpuj5q5whd36xyww0qs7xrcvjica4mtd5nftiohd9goxkocd50i89au7b0p9sy43j9509pe9erxia1rr752suzdf9mwuz3xy7nb',
                component: 'tqrnmdgx222jpsrkruhkcry2gznqd7vv46o3jvm9ybxr69g4uyviqy4v5tjjf6xed6wuby4nn41p8m8bbem9kfivkeenqn1l4idap64fawszpnnqchkkjbyvin68iy3eyceuz68p3vve9kamt3qy3436gla47xf6',
                name: 'wvcqz4fiz98q5xd1cobare6tggcmwimj0907fph2zzxhelwhhx6hhtsuctp0z18mzsxmookz72bp747wfjhm83cvaeb6z95inp5lw5zawlxlyqaua7ulij4y2prceemzmid182tcknx14oejxzctizouvixpyiuv',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'j5aqo11tz2wzvle3qv8lxc54dqew5cdzkyuupls7sanchjapyfs5gfpd75peihqauf15waebjo5dv9bqqkrt4vtu1gl15wk6j5w3cl4ikdio74i45nfa02j323ebxdjjicqk6pyoq0mbnfziq77p55xt0jhxu64t',
                flowComponent: 'ti82w2famuz3a64osqjfizqo44ljz4wwa94wrvqeffypef03c3paiju7c5cb6iqugrr6tbncyspukoht4w0lhrs9obgmpljetkwbrl6zxwz72o56oq94w8ldqcscqjiuxmzdmj5j6hoyqt3u6186952ajfsyalev',
                flowInterfaceName: 'kbo94um8b0ako4dr9kh9csk9b80jfqnbtd3anvk03pxhj8iea5kvxomw731adx31nbta2450e6ku9gpvignnr3zlcnf3kydaocwqd2uvamyeqjtkvcg5ovt7jphrvn6u9czwjfu7p1vks4dyeaayxhch9dwjppc9',
                flowInterfaceNamespace: '48da2wi1tj9ulzrfvueyzqmzr0154jcve3ui062bx20sika8s73cgohhhcqkzdfo5acofp4xc7niagcxr2nakv2a8yzhaebsah284x9uvc0rwjrd890a2owvkxpyiw6l0b41eom5msdnmn2d9700vwsiilub6x8n',
                version: 'mahmg4to6rq6t8dfy4ur',
                adapterType: 'vlg7mw6vy1g0mstcg5q1q52i8x14m8y1lcl8nljvyaxno98cujfcxpdsm02u',
                direction: 'RECEIVER',
                transportProtocol: 'ed5uu5p80049il2ra6asvc8536mdgglofclklygr77ecwmvxrvo7xk15aarl',
                messageProtocol: 'xr771ptqyljjwn4iivcsp53uz1zk5sqlc3f4rdsz7zut9w79ba17arc5ofbl',
                adapterEngineName: 'm2wr7iziqjyfhe3yppm26le6s6xfpq7lw0tf5bilbyfq812d12keu53yfondrr50x16htypnkwv32lsi0e41ilu1pvalu2crap2bnnlk0b7lh3nlsxg1vodhj1s7h73j4fm81kspifq3oied65ekwa64pli29tw1',
                url: 'l1h0ljma7dks256r47w3bi274hb8mw13mvclt184l1vwiyl555y9a8kej9urm3wz0cdx1xggfp3csdpzztyxsos885zepibid5qps99yyhi6ifil8anan039b76s7zv9m68lv10cptv44jn389bpxbrcoo9henywnj0tmlz6s0h5h7ax07t4at2e0yapktyzxswh7j7l6impwoetzh41pr3wglrnm2145bq9pngxbuoxbxt3eku3wxpd8v1kwifulgxihpmiculee7vxmquo45sbo38jxcbr9e3hhkxceeh0wggbcn6zbks3mld6gg16',
                username: 'dhmg360wuc1fshuwlpemy1j2n0pmydptpld2qnl85f3o870mlocowzkqi19p',
                remoteHost: '8n2iy5379o49tcxyzoq0xpik6llgcegxi5fy6o4jjcio0jlngs0avaoptlnyz5ewvzkazyvm4z73p477bfehlpbhtr8dxicvfn54kfcq5ant5l7dkjw72avl70c9iicddqr68eg5sbtdui0q971ei9onpqsfy5v6',
                remotePort: 6490311485,
                directory: 'yaobtlxw7t6k1yahmr0m0o59n726gf7jndfwgcdza4s50oedebwdsq5ytg0zms57m8ff1uqj1auooui8v1gvrgv9nyxg54bg2waq31dnovn3y0okjzk388pmpz0oemqj1ibzt75ho0tyyxju42twl425omnrv1wgfoi91d40pmuvke9q9lg8jf8edwairn18rycytxse7qt15l8ex4sv8bwwf1whs31ch162vz8197u01429ql2fxtpa5g78fty7ioxrz8m8bukivx9hzwf19s0h08o80zmgrmjyb12cehg0n2d7l310k8570y7uoih7vi6vl43957vo5dhibx6xvg4qi91oqergu5x73p5y9sj87fojgi01v7cgmhwbkdc6phvsi5ir9aij2x79xesfsc3g8qbb2s2m5chh1fpuemi51djw69yhq3cea9oxsh9jtfq099048hiqbp50p74cxvg5ulz7kgaj7c4hdsdthryubpzta8m5zxz40f7ax3okg10dy5g9cable1yo6mlmko6d2qpz3ds6c0wnrpgozmrzn35pcv8vx936fgr0fndgtatadeulz0wnel2yv39cjabhgnr5xi01duss03xv8hjcmt4gdfuyxcik4gzi7ijrt89vp1s3zddn7bpcqgvw08dh5jkmazmdmivpchbq99z2r9erlqyl4as72p1dmhpj39g5qurguq4cy7ippn3gyjlgil229u48qksr6frvm25fnjtnc9snonv0nyidiwel7tfslcofcodczar14vm8cwd2amhzbpwcts0a5cmktwqe9yozaumjrgcbt8zv7rq90gk8icw4deqjo4f3ffkf0btdd5ob2ppfv27a8xe7vp4mbgbucttm8ozn9d091xr6g3gz7ndd4sf61w9nzzs6wk6mulq16ou5rh8tgkjx8ikysubcpzpl7g91tybecc0605qhuzd7q80yl95connd6w6dumuoulqgrrtc5cexez5h6see7vvj3bj0whpmln6j',
                fileSchema: 'ub1267w1wkh6slleb5al1w2q9ehfmh07ddkfgkbds8ehiehaa1xwnbu0lfymngur7s7h0y2ko2fiw5wvqcylxorbis4a3h06i4l8yfqunn1gjpju2vkmohhvx9t1ydr8zd5wl5rd5ta61yx5ccwlgu3dz20n4a9ngljil6xht7qhsjwjlvi7z0cx0ubpbwcw16t5xcfshf3oa94ys3ctg3m2xkmktxgrwmyqukfxhzl0bvp0i4pc4uwb7v4zpt8g96tj14ei6v6oh644k6m2oil21y8vzo3lm3t4iz5u53fzhbz7sqc8ew25x51g6youqhew9eo4kfv30e8a7vct8chyk86h79xf0rbdh79dxaf27libzr0narqstq9qwjvqlq8l4oo33xw7yoi0vxekieyc4zc7hhm0im0wbvp8j5ray107almdgrvit65dd2zfjlk011816r2zr9ttx4kkbb5j7beolnomzphtudhj2fa9941tyxmj4ymuy1thxkn9cxtqyznsi52wnsab4t2w9nwy4fhqgs0dhxk6jbr5pnrts4ml5hygvaypwavcjb302fdu37fle5l6117te5z7fn0yp3k0b3h0ohclvoytkl56iq6c5kxl548gac11tottf7ifkzx5e71dvk5ou6bcbvs2scis6fqapx5tra2uk297thk3wcaf0wvcnaa65fourprta4upigeb7yircq80zh8uyok5s0rbkzwsyapts442p6a0u4ptyct2pe28oglvee1kgfink7104kqmshqqnjmr52yf25bibakznjdd4f0vxjvxjl0r42j5wvc9yy00d4jls70vlb19w6rdwjll2ml1xvagfh1w21pllp19guefpg5ovdkkhrjaoh8q5535noa13i1k7jgrf24d04oxmbn612evbjt1g1sfcig6ellydl28eqhq91lhrsep80abqz88lzwdv4qjd1r2qbgx05iqlxedpwtq8enignrlb5s24f4go607p3lz3nh5o5nf',
                proxyHost: 'jt46qbgg4ba9i54tx7hylu2geraxsdbbokotpz0sj4tdfqj5tlswtf3a8fg75',
                proxyPort: 1369338743,
                destination: 'u3dxyuo5atb8k5syq5wz7bmg0gzs75bwfkcrgxrbten239nwdkibuewi3dz6l050cudl50drw8qgbtvkkpgpr6hw3i5r7nf32617wseh5y75sg0i40835wmd19cwca3azng3884o823sj1nj18xown0cmb17ucoy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jo8an2ztzbzrx0178dn94vsvbwwdrrlwdkjfu51bs1wl6k4z4ukshexrg6676fy10tarshcl1s06d53wz5aq6ppsrkcmzjs2f8r7mhk8w4y72ax2d8mk39rso9nrf761znq0naepmkwfllso51owdqlq9fvwm3vp',
                responsibleUserAccountName: '1c0vcj0jx470ggnetwm4',
                lastChangeUserAccount: 'l9qciw7cm9mns8m9dii6',
                lastChangedAt: '2020-07-28 19:50:32',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '2qrf412m8k6iejscqcbhggm11zcjvpai2azc8a06',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '9if4j4hxdx3a4jatelzyx8yutbb2mfz5bex2fd55upftibpoyt',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'q2vf80r9s00rj098w8p1',
                party: 'cs7rbg6c3t4acv6kjekfhes7emt98mvv1b28umta9emw5yxx8uy58ur0kh8lschtw2gxcioacmq5faz174pktifnjp7evjkmliryktyvv8wo46h0yp66rzap4q4ffohj6g9rz07e290dpoufxavj5jxtuk4v5m97',
                component: 'z7vnhz8jgy2kk7dby2mhk4v1fj21w7lqqb1wnfhomj9ghdbposqilpj2965kunn7q6kfgoj2xhh9394pt63eyp1ecz32h3rt5qpfbs18l7ayw3kx21qbi4cw7pgqzcfijueouljnczk6z9akx1eeyuuvk1q8l1vr',
                name: 'o5zzxjnydxphqr7l448mkn678ozw3pliyl0kh0lv3mxluwc616gyecv6al05fp5hpzawbea3qskrzf59uxa9c7tsolo6cazlyl44iegi84ytb7h7nkdxmeunovmi0zmd1325mfqj7x9v6lz8mc1s7m6by1mzoctm',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '452fcr4nsf9vfyxskjqupsecgblqedjcgkvntap1dfigl1kvaxgka1sel0w9ylu6su834hju0x72zckj9plci02mx7aymyvwhsrsvodoe0nbf4v3k6wux7visr77bx0suq6hz15u9qah7sjw1hp847tqg2m61mb4',
                flowComponent: '8e9s06o56rhxtspg82xa714r0u4r1wh7b8w7hmhtt5741yphs0wjuh27hsovi0iyxvctwgo8jzos260jyryarw0h9xu0r41dqkipafjyopfsvvqbkl4v5153nr5zwjx2gdiq8lham98w1iny25g1jybb7v32yvwr',
                flowInterfaceName: 'bs0kheqwjroq0rdxdz283vw7woimazgja24mwnkkmr8l16funu3m5hy6786zevu0hytc1tzxsfssvlj6dwgkkc2bmhca4n2ht44ux3f25g7j9jl9pay42sivnp7fzrsfqhzwo3icjp2no4jhk80drkc6n54m58ix',
                flowInterfaceNamespace: 'y2zj8n439xzmkz3q69pm7dxper5g1eny9skwmke7rxyxp1n9dvp6x8ojvz9e6cwhdgdx5xwp3i938ti21ixwcgso2nv4hiw6eulcla6dddaiyb8aoyl5jocto9ysop9f0vjw5ph1keqb2tbhoa9tnvkk8wgyssba',
                version: 'fc4w4tn4rfhulkprtat6',
                adapterType: 'r9l3voxddp26tjqugh6ek3c91poicu7fk1mdzjiscqpl9d6a5anv673e5suj',
                direction: 'SENDER',
                transportProtocol: '5eteioak3uzgzdzi60cvd4sj39kp3z6khynhc25f15ohgrdtrxfu9cycyzzp',
                messageProtocol: 'dd02kis0cpfkx3k1frs05s64qkxrwxadvd3pe17sbve2jm4akpbvmqyi1mv0',
                adapterEngineName: 'vu2wqicvbctssd0bpebcaxs23gdfmdmvjkxtgpx757yzdz9q5x24v2t6ql9pqq3ipdk393akm8u9ys4zln33x1cgm7dsojgfd2cw0d9y43ijrzgoqagkyrwxsxtke3ws44fpaaz6r825h7b0584lobbr9q28zify',
                url: 'veiann30znlo6vg7t2r26i1iqx4fr9lhoq7su53s0rts6epkt4n5nlua141ncthwxvvmqbkkbt6n2yzvd7kgm6oxqg6tug9lf4aexqwi71pzy5onf6bln68nsdkz7boagwjdz2raj07s2aj2kw05e4il7ed9rav0s2v3hlwze1dannifogrwi8yu2y4yx3r73828ulrqycjq73gjnq3x6avypse0t6r7d3r5y1a6037xc5v30kihwrn76myuh431s9q84v8oplb5acbs5yw5at9iwb0y4pq0dc03ozh1bvap0hptnjd7gprnwe5dsxux',
                username: 'l5qkxglo7bl44y8lt3w8pzdyd9w86dx82j4js6c6hf57k7a35u7oomwbwkby',
                remoteHost: 'fvhe49fos2w2stylrk4fc7gpyx7o9hwz3y1veava509qcu94kg4tg2cm8htj5247cpd2i8zmt3kp7c3e258x24l19cg8sw56rhtbawb9ofwv72jnbehmhe55vzn7soen3rbd1l2ysg07mj0a1cit98aor5l66gjl',
                remotePort: 2725656807,
                directory: 'd6ps3m2iuvwbex8sujfuajba6pvmz6roa4ndz61esjxzwe5o3560drwqpic6o0z5xl8uh233m6nhjwyvk2sr0pckjd9n6gv48dsjrprmy1y7tsn0sds63tqazsg7o8tqrv03que2mvha38auswexvogp7bkuiaakr0x61d00zycp9jymi0cljs993y6prjerjtn6l2k95frlc5jm2ery5w1rzkeepsrfuia7wnwyi6bm49jpr1dhp0p1lonfi8dj8nkge51x1idyuqtpe6qr7h5q7g4tvjwmnl12e2y6yiettb2f8j9u8ltzsjvvpr66g2li5dlbzbiqdpxrngvlcfbo9sepwq3mkyug6rp4d6zurcjkpr8zng4k7cjqtq6le563xw2o5mvmjs5umwa1x5rp54ww0jzzxe5jwh361b14wts01fhtxdc8021mtb0n1mmjbgek70wxrsaw62j3dgs8q84pz0va00bmzb3c424euqcuh7ffdz43zwbfgtdbzvp0be7jjpzv2lka2ggtb96x36n7cue9raisaj1or7sa0nfnzui4fgh98bwjkq7evddu59g2006w6r0y0akpnif1chigqrf59fxe3yuxc5il1y4g640r6iprp53bexd72l362dcbee3zsfblofjhro3wtrs3q2isqd29jt00vm1ufxy606kyrddefbybqepfh6od61jzc0iyflpee37gaxyswa49xyupntgrrrjejleonfhdg4452a9er3ntn8w1imn2lbsdbfmuko921o21dpublmvpownhcpw2xjkf9j5xgjabq1ey1y5qwttiza5tfxmrkgbl6l69lftcpl9pjmf7qh2rkfnslg5ewuc6v9jydpq77jh73rztlpen068k6odoy1bwdx03c2z7a44gate81vfikkazd4iu733t6y9c0x20ct4dcnz4u0am1otd0qn5qjhgcr85sedp20y007zrh4t3ilii0xjiwhftqdfuzs511d893sb2akp3l97z',
                fileSchema: '26iadf3nzmbrrt7lrv7eq0lwfnnta07fht4q4dekjlyphy91ja3iviv09xxpuvsv5oln99l8no947demugg53qen44yad7ez8jnb460usfetwm0s51oxgygvcwv0nwalbufvx1p0igb0hfwf15r55vqg0pt0ttwq5sdm02n5rir9g9y3igzefst92aox75tyycgzbopph2m13y9k5uqi8py5ajzrvdy48wirr5t9kntsnc0ohcpiibn3jw8cvu57asg5vw30kx6qybym5qn4w92abt5kgp5w45z0l6jhzt4bh6dhppbdkojt9h0vi05td1tbsoz8ea8vv1xbbf0wq5sezsy3z1hemgoyt7xfimgicjk3mejrkkqbwurk850524f6nufoh524clnijtqn5vvn0wjo38l345fi8nsldsm3u9dp2tm4yk4krdoagcmcq6xhgofsq42vigb4dxdnqlx0cd9qbyq01aaq4ymkjekfleblvozdhmm9g5qgarp7iwiu477re9te29vds97rlozocb5ocavc1zmir7q7whiakl5b8h8mvsyajggr6px5qw0a2xrawh5ta56ya7adf0sjbdsf8fddoon80zz9pfnk4mgcio2bahh0ksisa9c5te1rrbye5g38utu8ukhf69p71y2xdrjgy1drd5rwqqjdvt840eetgk92073dnm032conyb40croodg0kol0ycta3wn37rzu2iu56kloouo0lnrayzvqta2h4g4287at9l3eo2r814irzdzj0dcwdudbu2zsjxrieccg7pn71kd8psec5e4esickbga8nssapmohz2ewefpww7z4ch0opedzl0v5tjikq2ypdvwldr0acaf00s1zfanypenwitf5retgl4wzowiit0zgus7ti9gsnksopswxyip1w2mntauhu5xs1ssr7hppz69dgi591wyn3y0wtdq16v006m6sswrqw4kaj2in4aq4kpj7fod8h1v8ubw3hgcomy20qpyo3',
                proxyHost: 'jfdfxf2g8eo1x3bp9jlmkwfq3bql5k3nvkdo8ixmpghygp87bl1fsudawk3v',
                proxyPort: 21198539889,
                destination: 'xp5adh081babe2ehtnkt77jet2qth2w0ph3d7solw13ia2jlbboda84mbzq6kjvrjihfjjqqq18afdwken1chk2shzzrxbrdae31k3zgemvoem443nkqzem9ofneswqrqoy3bfzjsc7gnjvaj6akefl1mnlhu26u',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'sleykipoxr594py334ficmku2y8iletjpq0gkzz3w5mqz60die8auy06nit4tsighgdltj9jeqn68cmtjpjwi1wmcxcswjjzitakshbbw2t7xabk7eixpca78ypm0ka9ykn4m4yv81vnyvvo44wiou5lzsfvraut',
                responsibleUserAccountName: '2hhqr0hmq3vy9gbcj30i',
                lastChangeUserAccount: 'khhz5vuro8ehh4vv8xkx',
                lastChangedAt: '2020-07-28 22:51:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '6fs9tnk3rjax7gm3bqifhldmk3ol87mbpym9ayf2',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '3sooees83hs5h9z27zx9von98e8c06xhldl57e253th3glryy0',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'ww14dptc937riswbd6rt',
                party: 'kioyltchdmvkw4vm85msn1z4mfpsrohchxg5phz92ynvpit4hhifjyoc13ldu8ki1bg8j619h6lvkhsrwvof11pyxxtkpbfqudbxvs6d3etdknxf8m6cpae75qyggqg3rao8pk90ihbd0f3pnxlaie6l5we9avmg',
                component: 'dxprxrc04asx0s52t5ohre7rdzmigxiebvom97nz03lhyoqrqyd303806sxqldrx4xuemflhjqxbvqeb2fvi12gz4c1jsiycd49ci8qz9episqmuz1bb8mwry7ekgg17eathigtujjpmk7uhia90l4vyom85xd6a',
                name: 'bjomwpuuerf9anp33a9en1ofxq9vr31qun22wqtyth7moekjg1iv91bjl8l7n5pv1s9yiaw38lywsx7htzj9jd7a45yxgopxwpwntqqkgpggly0sv1pax1zx0nio7ezb5jy5rn1uvvjfzga6ffhlhbsj75qm27jy',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'vmaejoavz1ktf4m9ssbm6tw0ktb2u7hgfen1cxa4kzj3nvlal25azltsybko0syfaa2yufpdveca6zco6sgigaja9fi6lvcsrtpy7urm945f705fk18i8qtgfc4v1mxsdha74wzfdutkk41ytpim1ri3v8e29u2c',
                flowComponent: 'ilju43ne2zytgmn827k89s89rzvlffxbut24vojcknvs9fbxtj7z3ezdyr50e06xkz5h4kzdoixlnpc4r9iqrr6wpe0rooudd0boq09326gfud457gcwq65e8jea4jbxmf8awaogi4h5lptm4438h7wg9jo7t4lj',
                flowInterfaceName: '8ilo4ei316skcwzsjl73nisoabmx4c216udp5mkk3frlhc8yqz7w0codvimon5dwryi6tjkbetlidir2at3dyd8d86zg04t3uu2o2jixot905m9k7rb3cddkhlsozm5ompb7bvzwvm65tjyhz2opnd8it0rmjb0a',
                flowInterfaceNamespace: '6ga94f4g5a0myevk0bv5i5wuga5afn1xlfyd06hm5qq5cxmwe230upuv44vimwvxuvu94f0xbjp8w5pu1ix062nmneu3h6jqvcn38rp68cog9x9qkhi8qpec7ky2jdpn2re8chtkrgu1wkawc1su2djba0g90rrj',
                version: 'rf0nqo68dwhm1ii2118z',
                adapterType: '6mlwjrxxoaoljkjw4jc0ygl71dvhejek7yhnraovoax9yko8au49i1ku40cs',
                direction: 'RECEIVER',
                transportProtocol: 'bvl9qucwe46xnkddc6eyogvy5qplae6i2intjbu022fbupxsqt4e3fl68wo2',
                messageProtocol: 'xo37fza4byyw3m6iiozpbgdyxj0qqq76wlistklqy7s0pl78x94bt04ch3pc',
                adapterEngineName: 'xuimc01p7ho9jr2h2n08iw5eiw0bd51z0woi2lt2qqduoie15i44df50t4laqa6ubpitkfwxp7fmmhwp8kupocglxa9mogbudi0fxscxdbgmwz1af3oquooogp7nw7y8o4nornc21lhbrel4fm4bf6tlh7s9g53z',
                url: 'ndf5aq44ix1yv96kefudo6dq3w0nvgci59mhsuy251dfhlv9av5cidx6hj48zgftqooa5c5qx499rvp36en6dmshevi1rkehh9s0jgga3062pvge94hv6wxv1b4qri2t4q0u0h2yocl16z972lz0kn2cp55ha2ndn98n0o9x7lhndgs65x1vv8v5m7e4xqeg53sds8e8eo79ntvhymkt8t2z3lw9fv4dpb79682cwhzvdzeyuo5m7ztrwlpp9rox4342ll4ueaow76e32on2akqdkuwdph3fftr85lbsxwp1x3813ub1j792np02iyrg',
                username: 'k456ehrr4lq2nqziqoi09tn46xwxvryfj4z1gx49fxynl59v0eegd67lheh1',
                remoteHost: '94qk3766z8o9afwj38d3b4pgofntx8jotxr43xm8cb4ab3arfooqp732hrhhpayo4tbu79lkajih3oopjx0olksu0jyuzw8dhdbbooyk5zjyq6qdycl8zuu45th1dq6vkkdx1zg2xhdeh8qylsacsin6mebz2lfq',
                remotePort: 5262915707,
                directory: '2y2hxhglzusp76jmqf7ml27u48zamqwpcbpjggydp1yszia1xb5u40hawgv2hviqvc100xppy6y68ijk046tynyqzm98d83qsx209cb987p1v0dfc3d4q3ztxah4gcizv6tqdks4bloc19pcfvylwk8e6r2rgzzsm4e77lffpadekpa4tev8bhrywvgnfxyupsp6avai7aj1ozglh8yzjpxy2ri1oxqjartg2m1flcozis4usc0m75l206rik9rrl018z3bilhdffnlindouqko1vuzpf7vs328tno098b7qzlkyqa4qc0s7hwh4wjd8hfu4deochv9mnwxsr251bm2vzw5powi972e3zregsmyeu0f825h0b5a5huufx57rzad9495ookbdbh5yj0rvdmi7h3d9f64lsyoedj0a49fzizzalbqhgi449wv8dzmuymrikfhlhx3nnfqublc4cfzp8w1lxgu8b6ml72ilttvay908hp5fmxm9syk5lqtq2l3mdpx0eeskmfd5fjg1oyqmp8k35x7075xkxu0de808tq51r4jegojxxin5c3k9wfcu6ttxk4rf8zvh56vz3zo84ooyjqsxlg198me0qi4l1l74ktonhzs3xuj3neoc7v94yiegnot5qeegvdhff6i0ksmk1ls1uwr8hmuubl9mfebm975wmkontnem27iugzeetoos4gqxe7fj701la5cbrpk7qlk51f4brie01e4vmw4j6dr0kgpfhyvrbvfbpnrp8esy0xnht1ms1bgo6k1h85uyp8lq1yu46bbp8k4q9lvq2o56j4m9oeemz5viw0ht023proc34l05p551zytuvwqh8zn6o5qeiu4nqbt0yo5jz7yob2grz1lnjx4dykys1nmw659jkpzup485kazm7gyfc6onyq0v3prhri2cd58gt3uk7bvdw1p4ed32b7107rbzz1syj4f9h4eot3o2m66tggqtqpyuix5qf2v64biuow4ptx5qprvvvcr0',
                fileSchema: 'jiy8aoy9i7q0sgjm62jr9wpo83hhplwdnx7smr8jis2a1fx35zvs9bp47g3vtll20uifw6jvkl2aj1qj9ul669c6vd23f30n5d94fl6d64vlbk8qf8mn52i62wluvo9shey7rn9qgkl18eqthwxnbg8svy3m71yzxewr3e96b4q6fkj5xxjh3ytioprvk43uyeo4yg77rv5fuv8mu83oclxze39hkc21vh5sw2cie6qrzz9gn8vn9jsgkhc9633j2dcv18g2asxj0oji7mxb8ieqz61vsxecnjvkuwhrgqvml9te1kcl94w0zomud0g50is1wis11hrb1xdk9d4rvs2u7cx1i216n9dofjikegu5ydbcebqk4o2kb0cx2g2uw9jnjs80e546xi826ni0wzwtbvqfy4art3gyog4748bn0ng35qd9smgy8cwtin2dura44ezayu57qracdh5g3o7l5kvndyu5d3e6b79vn68kj7k6d3vg17zo5f8lr7huiae1vqt1078pj3yz2p3m86pkzs2aiyw4pdpxmexhihesr8n6jjqw3jj4huexb3s5fu0k42zdit8amqe3e5m6rni2jsochn2vk3mzpgy9101t6adhhov60hczf4yall8xwbn913jqyh0b5k6p7qz160bn0pahwecc8ph670yw57vewelhpbj576intgv6g6wfznp7jr9pxfd03u9cvuy2zjdde4y372ekn6xc1qfrlm8qduav8xc6fdhi4gqkan28srhbxwvzv4cup1ws1jz4czapwm82dstdmtm7fbzwryfxrc5h79v8fty0wner8u6mvvv0jhf7b7zpuwkp66k15zwdx3ntqa23c9i9rapg3vfuy1b3jsx5s9l8poi4h11e7t5yo3xhgs9ly48bc1czupaerontlwzfie0cliiumjwnxswnutxux5r4rbzj0evoztcxs7x4do7uc950asjnhgn3k35dsj5qln1emex21qchqwwjb85cvnj8qlx3stdd',
                proxyHost: '9bejkxh3tr038b172vom3s6r5kt3tlu3rikghrsxb8dj5ehmmp3hx2s24a3j',
                proxyPort: 2900384653,
                destination: 'tqi6q2s1ygjb3xxtyg4so6odyyr8d4as952orsk4y6p6jupqbuz5cjz7dvklw48ca6oexvxg5hs6hf2mzashaaeqf39ed1v4wsew35s0w1e70gluyq1w223i0e0zao76qui1m57jtedk38rd4m2hnzf1xgwamwd1c',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ryau1juo0ptl1ivdhj30qa5mrfahbgr7ja7znepwnf64jjnoskx9sgwrd3ftqq1ihdo8wrvik2i5fsuevlr37ljxk3b8ls5zboyo321ptds3gfamavygs0scrg4yk6e3u8mhctpht6qjd207c3d1ogtag5qv4x05',
                responsibleUserAccountName: '20arwz8cz82qi5ajmfxh',
                lastChangeUserAccount: 'gci40pglb4c5hpmfoz43',
                lastChangedAt: '2020-07-29 06:44:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'nbit2c9qojyx118cdtgbkfpnl7alb9d603hk7xql',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '70k7cca8stvac3pgn24mi86idnsd4fqglnji8f1zu31miih6f2',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'ux6psfdtaj8djkgka6od',
                party: 'z0poakmoyaq3s6daurahpvyoo2r58ybyk5dljxjbier3gbakzmm2tamp3rz6zq95y7qx1hxj6bb0e9j80u8fjylzh7ndhcnd0j0psm2yhngajz3rlt7mvcaw0eq3tcrjp8vr3ew79qx8ufctxrrktwqnj6zpkur3',
                component: '2vu2v61bhsyx7czpbt2faupmrfhvy9hslb8ibc634pszt6axcjckh5lcjclq0r3kebek9412u0q05ws5iaamz11adews3zg9z2zme9vgkquomissaxsfk8ioj9t0hn6nirtn6vgxay0n8vx3dlral0uyjnqwj50d',
                name: 'zplw7hob86sm88h0cvrtdkrmo1dy3bd5ley2k08c5yfc9hn63suvm2mjsdfs5r6jwhefd2vlmu6cj3vpwbd426jx9gfjt2bvx61fwd86flq71uzclukdmks6lqlv053245bbki9d30x18drv8v7za3heqxuy3w1q',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'y5x44cg7oue5ux2bq1kenhh4le7l6bcef3omorck1bjye6e18kt1bdndh4nt6qa501xbqrig3ie8dwe1oqepos0lq4dlwi5b1yko1tibr2v77xbr1ep4yuimugwx8e4zqnj0k5nxxpydpqs5e3xeammg3p1hprvn',
                flowComponent: 'zjxekdx4frbxeqcg72vwd280bsag2waavt1b69wed39xe9lfikuncvl9hvuhyjpjcdpl7yebe5zce4bn2jhtpph2bjg0r0im1cjkqbv34r6xs8ur91acysz6ngaj493b3pdw9pkwej94s4jz68lcnxvlgzpqae63',
                flowInterfaceName: 'ibyne4jyryyr4q993jw8zh6pzo273h382w9mhz9ew9cvpzmsaep81zreo7iygbl0pjgwvjyqng1qwswps366i6bq78pg83s6d82njh946nsf8m9nl1lzdtlhknqpjlelx9vchj3k5lm0fr8s6hsou3petparg1gx',
                flowInterfaceNamespace: 'kf8rhe2i1elk37sa7dod120qkpi72lm4yvhm0wp5ovjgm9fxpebrnm7w5ou6yg0t26zu57ukvqnl4qmlup92k3dpszmk73x4tsc15xrj0zuw6rgefcuiqtodrd18jsmcmkovx58mnjsu0mowe2wgrffx4p47850t',
                version: '85tg0raca8grtfovo2qk',
                adapterType: '9psc93ueeqg0lucd43jathya2qb8b8755syynv70jfshic793v1w9gx6ocbm',
                direction: 'SENDER',
                transportProtocol: 'g9nrswj45z31ha39vxtzgre0b7gfxjifjv5rmptns30cgbq565wej9qqkz6b',
                messageProtocol: 'xcmmmvuf7fyjm4mp62zs2tim9769zylvhqr2yvx1qr07kqgurzpoaq5l41gl',
                adapterEngineName: 't8fwf4skq17cpnaiuqbwb7rgljv1ttfdknqomzdfkv4eij9hvqfdax2p5e9by4miw5qxd2wzf31qi3wcwt4jbbf9fgh5lmc884589e0thqtht3izf0axzijyh1iehupkc0xb7giofuqepm2owpjaqqmu5hvzmpeb',
                url: 'lhndmp17bsoh85p5e7z28fqjtumhaa70fwrsvomnfu4mw87axierfld3um0l3vhv8213jofmuqq56l7olbcva7yit0220ho5cg5mk0lrrnmi80b1hngrgeskxzpmwrotsarj2bd3k5u77g9fpj0pl37y2n33v0a2o9kuhrecn2u7lygeaclc0765tnnucr82368o96l9ut7kw8p1enjd3z7gnxviv8of6cno76lts4vktf4d6gk0sn0zj9d6ighmxfdduqimweal7xna8eojuj81cqq9m35udb3l1x2h24bfr1jb5waqy2tjk9at54pe',
                username: 'krbqt1fjx0ravrgn2uxs2gsfmno1t8bhv1rynlrwo6qlz7nlcfyrhssi9t6m',
                remoteHost: '8qhvkgxlxo06xpw01tqz2jb3455vi4yw5e77q7vxv8bx7794zhbk8jqzuurezf5n9dh8r8cpb0oimmjgi88yriarwarq1krm0zpx2rwoogugh55tm09knxyirf021isy15ppo8up1e3udirsavkmiqe55uq63i9h',
                remotePort: 9867248292,
                directory: 'd3ti76nltb7pshzhpor1iff8bgl3e4lmjyxcds07jyhc2bz6pdm8h1lk4qq943403rfejb9h3132sgt88hx4bcsncqkzc7nvkkxy4rwyo6vz670700vg5u3jpsjh1enqkt5qyv56o4lyhwq3y3236z6mc3cik8zvjbofx3f5x6gh9p0ks3qfgym2ji3so96jgmlj07b97ooq79azuqnd3msjbp0zlr64gsggtm75wpzklvwpk2bcxd7jt9667tk617gz5vot6uy5o8emrhc2rqhzzl7znkju6mqnu05jtcosp3gxl0uhurxtn88n0p8uailwpjkvdbitikj3xa1ol10spo6n9mphgr8ngq5p44hg7eyf1n7wykib7kc53cx2mygb8kjij78gpbsw3jwtnu9zosod4zdhb91g029qnuzz6vvfes8t6p45qig9mek2uk6b2s373zz7emaeoi1dsr34g5jj1xh2o9hn2mdpocv8rbzmpcldxxah93sv7rzyilona9uk5rbhset2y6viasitm75d8ebawulxltrubl9m5gm5zzgrx0j0oknwv6pgrw4uc3jzw89mqrq4ragerfwk0bmhhpe6d5aqahzoljt9kpmumn5mw8jx4psftpv0zb0uwi7gyl4shieue2e2wtgkzr06x61sfillet054rkpzbk0tk45ojk9h6yemjzu9075pib3ajfb4e9i5rhk4c5l5at7r34du8l7clf2cbpxjst9eoi9y2sozs3dwzjgqwt2y61giwovctaonnxat9nnfb95mv1z43my97unniy626xeq7a6xnzuyko8ygot2uxkxce0ktawasiw7h3aurphh1z3f1xr3aga7cbusndh1dulqwi9thk88f1bf1wk9la0on9ng00z1fjeatwaffaj81tebolb2wwywvxwvfpbmjmgfxafk6s8i1tk544wlvnlzdel0qcahdsxtb49z41y9g9a6p25w732dpyj3rh1iwnhi1iaoofof8q706nj',
                fileSchema: 'n0lqvy4xm6q6gxqvcb5m552np1awbhzjaid7k2nb3f6dpehk1gjnla0q1bj2ko00nswsfx9vc1vnpnhsszf16sex1p4g6qltemywu7ije6drdicrm6yqvfgnnivx5x06eut7m5etgl43w7665lmwemlhys0b3prt58mfjlluyp8u5gnp266x5p9vmknx4u9zk4bwv5hc3t0x7ynpnufpy0w8oqyn5ko5tt0dp4en8l6je5z5x0ipz8rofjxj6vivsoq5ica57r5p4kt5qkl1il9i39pdgwv1f2w5m2xd4ywzt3yd7l1w2lxhslkzxx9wlux4s0sya4xn88q4jdy7agrm3lni7avhh1rhiebrhjyuwd3lm6wx1pjurwnw3ij1ltuxn2vb205s7zkvhhhilmui0t5yfv8wrk5g32fezu32fpd475j6u2rftafuun0pjjeucob532wjxiyhbxb2zea4d5wz5r973okbxhlm209owezdn6ry24elh09czo3wc5y63jrxq5fdhqt5n3vd6jfo9v2187mr1vpzsjvmxeyl6m7irw24nxo7ed47vu99090pfg78qkvdqhazq1jupabf61ex9uv68jb64ma7y0pxh7g02gso8a2odjlrghxchomo5h9prjngi8s5gzjau342jo10v7ysotmy5lukjcm1ps5xam2bd9ri2b6ymnnjocv514unxgy9a82kfiisitvp7zr98b7ggjag7eyio5avt26co8poniap4k5iqbqkl78qe7u24pmj53enlwmygwdiudfqv3fcrmt7voboqb5l6kl44pw7x4xfnggluoc5kn0t88x5th3e0biq3vlac42dyplvn7tcox8mave9y27pmhv7fzs4wd3h19ocg7x6apbzrn4ka0z4hshpkh8h2itaq4af1dvoy9pyz66jn0j1ef9qxh8jdwyhbinj7jaa3m737u2c5m09uubgqrr4ko4x438mf3c3voboqqkfuqnnenc1qrpkyi40fs9y17wf',
                proxyHost: 'cg9rtxyf9q3z6mqrpkfnok1yxesuqcbigi78eqj2cusqb1dy78o8nk6v4elf',
                proxyPort: 2322622405,
                destination: 'fhi22k965njmmx5tsdlykfpjejt96qei4a5rl3as6wbachabi2czkbxtbn123gatgezst2utq6kyh1fajmlnbm7pstr24kt9qhb65szhljw6lcbunhp8f5sw5k0jpm551sxlez6ybo4eljsr2g5b0b6lpah07bno',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'd1a026zcofidw7qyfpymfwl77gxpcojdbnt7r1p3byvilcnb2diviw1535khnwj2e3agdukocr3faegt09142jds0v9ffjgql9w9t7rr200jn0impqi42cescskh1ihiejeowjx6ctq4cb639mvgulpghnv7bqp91',
                responsibleUserAccountName: '2aalpm6er3o358vsrpyx',
                lastChangeUserAccount: '1kdnwvsz7njohpucyuhx',
                lastChangedAt: '2020-07-29 04:24:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'vlx1f5t6cfy1lltqmuiu1958f3dmhkhfoluhr5u1',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'zqecvvx6qjgyidai5398f7btcshcp6peosk7t2zqd6kkqfgooc',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'y2wr2zru895p9mk3apvz',
                party: '71xstc3qedctay0l6zdc8jkos7qq3ca35e8erl3sqjolkpd9wg1d9aazdy5xlpdwbmqwvkkfhmyo63eg20s7jsvlxoyrhdzy6php6lrhqrr1ysuyhbtbvd74k6t4r764qbxygxjinacsdgzvy4g5k1qvbbaiub5v',
                component: '2s068dfqf0zhdq9167lm2t69c9yyb42gvsuno93gjh0up81n0hd9e607u9tmi8uirqloajpgjfb238l3g7709qe4cznsx60tci0jv3y1ui6um4d84wtns5jek7fmu97zh529ah2krlly0k26tvogqh8yioicqz0m',
                name: 'oxhrazew75htlqllzl5lmo0g77qmwjtumui8h99mmho717ga91uibb4abuiyca7lxap229r52d6hug84xvclwpqnefwi76yx6akieg23w9c30lf749dijq8zbpeje0om790wwp9mqpfde18l5gnwz8rr2dm5ljas',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'ky26jt4izhvlkpv0koypimpo4bmvx9io3co4nru60yzvd09hvsij04fzf32dnkli460fbmd4y9gq4jkcopf0wpkmfh3d5s18rmd9i9ayhas136mlb6q1zy1mav2o1mgo723mdlzor5pn7gt9rsuffqj1d72btzdp',
                flowComponent: 'i67fq0duunqqx4kyxjdfc9ysxjurs7vip1ni49qzhs6yraizvcbni49fg0vmgb4mz9xf2i6wyuyxqkhctdvohkijn71qfvbfgpzta8927nrh8k0tj7rd5trtvgfm300j5zpy1mw2neicl7bu7icvwcbsi71otegq',
                flowInterfaceName: 'wukadp9ez6gc0v35y925so771bdheircnqdu6taq776f4s73a3ex6rxwcb0ivpmpvqgaxnuhgt7fted2857442495c1v4bfv5ss5ecp7yutyjsvqh2ci73aj0e5w527pxj6li0j4e4bd7jvm5a5yj0ywyjed07u4',
                flowInterfaceNamespace: '588gb1mdy7pzgda56t2rfevxi9qf5l5lp72f4wuej67503j79k120uuyjhop1hnn12wp1ia0w8l5vbolc9d9xq5v95mwblu3kh63o6jyxole5ctuhdpj766m2okb7uwr4qqgdhgmy3ewlqpl0bl2iyfwmo0kuou4',
                version: '5ha64izws6r8iofmpixc',
                adapterType: 'dlqccltd2fanux2pya94tumglzy5vy5h51wu23b8kh9a3ymylqkepkvqbzix',
                direction: 'SENDER',
                transportProtocol: 't834udjnmxmj9as1f1o924hiwtzrzp4w7h5apsid9bkf0yolmhc8y3wc5ozg',
                messageProtocol: 'yp26odv54vkfandxds1may69ikt8dqimmc8wmbu9o99berle484w5l4h6hnz',
                adapterEngineName: 'cgwnqx4mcgchtwdeu38df4ci2mvm9clh1g2jwlczl9a3a3cyyoxkd4ccbmks6trgb7wbbet0h7yfjnmnxlhu8i4jths400d8etci2x4957gn2xmg9txxe4ivanflx1pmwfnsdkjotvva7l9u7g8ix1x89dgqgi4n',
                url: 'vwqr1ecx2abdg3oikfb8h6kpa0oi25ecds7caum8kpuge5sm3to1ovtzlzs3d43asn53j3pr49j1gls02g2m2vt5fdbv47bx6ydykuu6d2e07k3bpj30c3jz4qfdxtfni28rdtj10ysiat6ps8y40uxmuofks4hq3qbgit0dbv6l7y5ihq6jxn9inytgfc1l6zu3eh1ix48ra89qfa83x3nc8ssymaaymztpn5ouhmf7xdw9ga1jy1s9os9bfhk72c1f4jo4be9ztr1q5fanjfdt56pr92cu0vmk1qwonfivybxh85gmh3r755abnhqk',
                username: 'aj6flq3q62nkgmj3lsroz2xbexxewqodutsbg5dqxkwyjjmlaubflpzigmwr',
                remoteHost: '8iypbj622g9q0thde6kaody9ngwv3vfd9mjcofry1nu9buj6r604kxvfxqznqkaurt757f40i3l45ehtxlj6utv87n9j60ttbk5t1g3zzxdkhhp8omquybbrq3pqd6sqgxv27r3b2iac5kzcochlg52q47qbwq4j',
                remotePort: 4969949096,
                directory: 'kd8vqwjwjs6i8kcomdpdtbu97o2bucx71tt34wfa4pbkwk8465c64rt4ye9uxkbhf9v09aryj0s5efb9lmd8w5nelzyko9cx7ggop7bb7q53w4cpxg64q4hcnzgsoasxuwem5jhi6bnkf4tj5ylbbsevmyn0ykcict73yu814myuo9yy3xmbetv1hlmdoxub31t37ojcsu7chnp0nnuo7fnuopkq1cq2vcbkbuwfslt8z9mveg4jdu1hzpei9og8u4csghpodxnmufyri6ns39itk4ghick2nfdhf9hqrenze2vzed6jthhxxud1tz82l90m0gjnmir3qcmbszfasbshw6jh37dics2kqrt91s4k02peo0bbcutgc85bydsd8w4s7rzn09glzewzx913ua99jekhsnw4n8q9j8xsxfzy97tzag519hhlx2cm0ew67zwp6sh5h1wzlp9ef796ws5d1cgqcgeqjwt3809mg33ntwj3md6yp3vvp3qw3jwkqoba4joc0n27bmcz440ifv2np8m9jw9uwql24duykb7r4q1vhtj1sntmtptaomm0h0rbjh94khdacjf8xil4wwzknahjuk76h8v86j6b65ict0udj564v34i8njdmvgodvbz3zi2589wgvkvl54hwla8d8fhjusjluzaug5wo7i3zeg2v11wr2w9f9do6lp2xr6pih30ikhhop1uymtlauvuxp2vsyh6alg8efa1kr311eafcme8smze44g07g8zalvtieh8z3bc4augm77oy9gek78x5wvaisa7l9m2118brvibbf7fp070gfa3gn3u1fd03maxslxus785ae7lbu4feimltynllqdcwgfglz80u9wemjdch99a89khtym5kpjo7ino51sxlqzt1eqv7fu2vu7b57ehkr710aid9xqhvoth3lpnnathwzkd21fy6no62678fyqb4r65taxsb389rv4ytydn3u2ljwetav5nupvkt2zhv4wi2718rrby',
                fileSchema: 'hpg79xov0xyt4kz960pgkx9s01pyo3128ccwsf76aakisn364f7w2mnjwa3739cceqgz2lswjszbqgdxuxwty2taa2bdrurckpeq6l2gqq1o4p7b5zyk415b5z9t9ei2lqi9pcbwzx65mt117q2ay0713s0m1ei650kg6d8qoji14vo1apzjgwrz24rlaco81ev4up1o7vcvj11eix79lnanz5wx3v9chf807h0ydtxj4igr336sk68ueyjafbk5dbatvted2dfu7q0o87so6lsdzi3psoifzjo1zrdr4tnf2gg8i8jeuped4z7ak7arratj6wjgmqk9a0ia7cp8fuyw91i5myxjn2g4fkzo7tyt6ec51avqs8vjz912zke2kq3o3n9yxmouji43vso365ulfaq851kbkvf3bnuzp2y50wmod176u617h9c1vvnp39pjzhv0za6n4vtri3t2pquyc6nrmua5tfvlbe6lbdiycwqyrkpqovv0atf3qsnphecbislksdhqihnr6asqgkax8egqwp739qkq11d8najqo3urdpl4vhqx131s1artu6az88v0rnuy4d2x3kel5818sbre5xes7gzc9f22d84owrceguv1gu8p93fba5qcjptsr4qo76rueot4q8gohzreiejzcwirmfs7g0e9q5tten3w1y8jqvpqbkuaurjur418lfhxsrmnzj33tss010cvbmjvxt5lbfou5junv136x8kfiizpfrez3clkb6dixfh6kh2zb6f5w6ixyyqwvncfbwclke18res8xze4ehdzhoa13hqztp920ueylsmjim5c9hc2ec1ebr7ogujvb746vfkudq99xhapnlvxhqypoaite36b2t6vudbwapcfpglkgxe84crzox9ywgnw3skx92k5y4vaofpkljqlyhl4jcssp9moff156pyz8k80uoim1jsxasi9af1w03ow80weh3pj1tzjmbyhywr7hxqaadjg3i8a88a41q7742ld',
                proxyHost: 'nuyoh4bf5dbixopwqvzugq6rjcdmqsr7buiqcw7z9f2b9dbz3rgqurvrzm3j',
                proxyPort: 9067490419,
                destination: 'gni4qfdz1qe9rxz4ojzaus1ghg5gsy3zpbughj8zqry41fkyuoeeot19kd45cv35mz1dak6b82r0d4pi5hq9pxn7necim5r81r0yd3xwqu9g493tw4kacttsr4a22vqy4fbllqxjq1xo9i2xsly23fr7pdtd1ndw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xfpugg49yw0w1i62vv1mqm8a6blhof8sf2imsv1d3qam4j63iwmbogxv9n8xii06gap51py6q8ixvbfdgn1na4l25ffw3ammc3mp911cq98v90mo9jkir3j3jn5xkx2aslmjvgfzizwd64y8ymgq6jyn57y50sxb',
                responsibleUserAccountName: '7lwe3d5eq7onnm4ajj1j3',
                lastChangeUserAccount: 'q5d1qbsaqlj6y5oswx5s',
                lastChangedAt: '2020-07-29 02:43:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'ojrpxzw05msh84940rwu98cxftszcqt59jzmyw4y',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'amqdc4o9o5d0n8wa0hkjf54wpexlz379xlfpe0gw9ryfsplhbn',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'iz6p8j3eykxp1ch29zau',
                party: 'w5xrfjfbfi9s3xa0s4rohglmdlk3o26szd3wf3wbmjpenyff03ux87uxuf1qhv0ti3rkfj3iwg6xqagkwv84sse4it3xe3f7dadfj7acuofethr2wznj6mfmuq6f8xbquhzf1mvfubhz9b771yfeqykgp02jzh76',
                component: '8ju81j8mklkgtz7uzg2orvawiu13zfil1db0prxqy8t51tnjufkr7ruykouy6uuo7gcrbe7gvchnbedv0oeoyojy5tyezavqwzmgqd3kdo1lm9g8w5swbxlwqbvc77rjgas6d600dev1dz16m1nhojwimlcpoxdi',
                name: 'h4e80o184s2cz607ld0twdvrxhkubqnpxg1cvohzriq9abigr38a9yw7e3ejpfd2n9fqrjy2s16fsfkocqmrc65sikiqh8i3ditc81w8istjzsqmselfll1lv9bospo16s4ra84w4j3dky5z2mgixzgqcadjejhp',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'owhxtabp6gh9r5q5n5k2nhlpk6gspn72xnf2dmvta13hbtvrmg82r7jwxsg3xgszt9li765ez6xltyifsiioxx7brvt9ldaxpvhal5jmgakms3cusvv5xsfsxsk7bcd3wcrll3ku15opzw5omylcnndf5ews7v7q',
                flowComponent: '2fndbs55rqeqcelmhxifqm2yiqypabc2620guijbffu1qfu1kakzi0bpxn80nzwr1g02lmh94nkt2rqgpm0p4oemq6a9ji57b63dk2foo4i5u13lm1ow7itnjzy487tx6x4how6milf53poi2mjaymn3kw1co94i',
                flowInterfaceName: '85eplehensippkp07as6e85eehy27myq72x7od4tpykqwk1053u63podou6nnhggbimfkp8z1ob6qp166cjfhcw8mwhfd0wt9eh8rh55c1r2irwmmv1vc919yltjgw3ifml3z9tq8vbgdgswmv1g7u9kil54ytqj',
                flowInterfaceNamespace: 'xd74fvlh4phxpx92k9obwlg5ecxtzv0pgers1mjnunfbqdowtmtayqsq1eqhonjax0vf0bkwdz6schjwsshy4g9jxhasr7oe8iqobylikwnmw4an7r58u71uxgmph7onff2z7xs3nu7qknan4a6o4yc3tby4kpkr',
                version: 'mlxmhsv6akzs3tu5pdqi',
                adapterType: 'un1dv3i7xq8fhs2o5kqizt5jrzwr9h8ug5o4j06hzw863eukln88j87whayv',
                direction: 'RECEIVER',
                transportProtocol: 'ziv75xs1o5vg0brj2f98pbhirnwbhhrvh1onx6kcisiamxq6nnl7fycbg9yf',
                messageProtocol: '9kj0adnpm9emv4xvk7o1kjq9nu7j6pbsv43usrio0awfwsswvmv4e7do3cyy',
                adapterEngineName: 'jatcpx6r7f3nd55lpxlakbqmfvotmf2y7xnjtltb0clcodvgisl6m4nolhgf7tv1b2brej5hw2j0bk57g1f77qpsg55c97gna9d7i20lupmb93923vfx2weqmq15dluvzbdo6i0kec7l389orfwffkt4qfcu9i6w',
                url: 'plkf2agy7q15udnp5gtdb27uwtqapvri3ogsx2esav8tjl43wnvwdrcrer7d9xdvlggielqy7ynhrqspb762t4w6x96oy1lowda451hb7u583ih7oacub1qb05z1sxxyyd9m83uuimd2d23vourthyqtkolfuym2ccudkvq2dor920pspv894fk75wugng89a3skb56kot8w32ngx6ksgqnuf2kaztr9fi592fcfkqiarl469240ixatumu71rqzq82fnwndckkqrn6camycxn27uqt74youwzvk3428mk89o06xnkdhtpm6n1xw1ug0',
                username: '9iuwe0wqw108w7hwqc4taf84wylvl73eyhgoid36vemb3iri66oqedf6wglq',
                remoteHost: 'ul56tss7we36ufm22555j6i8jn5k3zsonlc7n60u19qhu5z232xa91wppfrkfjx5n43eg9376exbnncavuej2641utmsua733p73mnsz06d4ldvpqvhlf0pu3q2z53rj6e4gwpgyqcn0acvwpd3tzqkami8xcz1h',
                remotePort: 2934315001,
                directory: '7f00oxo3bejbb5z3i2ie4sbaa2fy43mump8qav6jjsgnqt3gzcqjkc0bznz9spl4hwzvgkzokjnou759alk90e29496bh922ww8dtbw8sknzm9tvgfsbfap6bor2v9v7qbtkbwkrj32upo4clzyltkd5xkk7cntab31zn8frzn2xeaxnr0hk19pzo8uw77gwe5asfgj09tz270tdw61jnv59tt5pbbmqagp41ue5jst5znnuevka30cqai2423v3rdzvk94ng6hlwn4xrx2c725xveaygqc2xkbqwj4scxsb4pvpm3li0ul1ielx1pskpzzpo0yyhzpi53yzn526jbyhaw42fdlbtcmp6mevm4g56mqq0y4mfcyxx72qa9sph5spehxku68ri25jqw2k310og7na03pduexoy0218fifvwd2zodg42p2luwb02n3bo83lldn7tx3bknwmufoa0atfl85yzucu4p0qf57ww9s8uqz81toxlus1pcxdt79hgb6j3jc6kamydhnbjr4qlagmlb9tav4sypfs44jo5aw8718q6yn6vhpk22ejpyv4ym5b0tzhwrdp9y05ctdjk3jm9bzytn51qe55r92ezabatyp64i1s73um563qalmc7fmxtzw7gaufap2i8vsrzneehlpvvlk1mdyjf0z3rqhhtuu958mm151ltx7qec22fd20axt04phzgcmjfk9sv5ezdr1btu3a1q6neemjo05q8uvc5go9vr0sfx6dri7xirzmv8fxhvnyyfd7vbetzvoyavm8078m059xnl62n3kat9gsoxqlhi5joejhz33rxajv8l7e61k8cpga72bh4jilpblp6vfz5xihdsz62rsyujwdorkv0f8icpd1zdx21acgo4770f4ofnqxhbd8ero0xs27m75z7y5rddchrypmwdyj7xz5m06202zgvob42nl380dnsk3t4tzeofbyyymxkdtdvo81ndytvohx3atcrviex7ll8u19ofqrf2n',
                fileSchema: 'go7luolu1yz45s1whcfvetiw107k5in7uqlz45gn8lkxk1b2tnupl9sctqugc3bgjv2rdg3khv082g7ta1gdq8c7f0aubrtdoxf4ml5p7o1ym5dvxkosa2fyo5nyb633aln2flfrpz00gi7507yqzx1rkdjuwofpfwp42vfvop3pumyhqu9gpvq7cynugsulzmb1l7v1yn4a3xr60bkudgpmdi2lot4shhpo52iew8rdsn0bzuveowyuk8w7gbpm01z59rew0cg5y75hbnqi2worcqqjtrfritcsau94dckdgbkx9oaemmki7p01qle7f9djd5tvrxw95n2ddvtlz0iyt45zb3zakpx45fpi38hhpdxawanwvreu5abvpe3934otisdbluvczxpmylx27oe3ib2m4y9wmsxm0bx86pacoodde2tsyo1xyu7sx66z7o3l4oicivrhs0169zxzpwvncpnjmueh6d7y9p4shq0zpddrdo3qfhn58in9qhjc1kv8ifi1xbefh0re7kgwv89jp9gkvj12xfhdk72hioegxc622e9jj462s557kveuh5jjghl3g5mw324eqdkmwdns5t8fgbmab07ven1pfkq8uu2bkk79il25t1vewnr2vb2dayvsr34pb70uzx8jkztx5excdg6o4pdyaa5d67uyen74u2owuahqpylt4xpq05idfgh25el5dhgtz7iibhcb8ebfysxm4ehzy4wtsy9ul3yylk7umg62vut53g36jtxxgntymjd2qq8ptyf4570b9cp4vvldq8w81cfuh6x7tloez95g8azscql662ch9lk28d03ydkp63m0t6of0hezxleevoo27q478h6brit4kszbjchtf4538349hp6p1jyj1cudiatupsubwofwr5vuh7e8zs3b6a7khasrxbjdzzm93cg3nunr6ay36c7l2ompfbbm8abc7oi43x21uw984o0362712ps4xrikcnulpvk9u12usrhrw6n0s89y',
                proxyHost: 'p002xo6jvtjpg5ghr2zt56cbbi0rb4qpix3q57a8r3gc1eiflk9d3b1yrxd4',
                proxyPort: 6384534848,
                destination: 'g1088wihyre06c47gpoyw8u46bi73zxvedwh8ran7wmeke3f9am5vzaj3ajpfhbk6me1yum4xfofb6lnwcznhykbq9rks87474an9rd92hd44r1ichyrdkxyqtp8u3k3jwj6zk6gim0qz0bw09ihav0l91tk35c0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zr5fufryhlm3p9nb5n4phxg8nhxlkfg3ppupnm14dkdp3tjwnlmgvz7oupj5vfir1jumi1y6bqr4mur56igt9wh8blndg4dgo8iuxbob13rjsklzi21kfxhhnkjtonhfvha0mfml7r53eqiur3rax7edny139dcx',
                responsibleUserAccountName: 'b42aai7vba8k4m8q1amc',
                lastChangeUserAccount: '8dudvot4yuoyyu8wr1k7f',
                lastChangedAt: '2020-07-29 02:48:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'sdcyscvb4ivfsrcl26przzt1b857jrzy3wn1r9iy',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'gbr9ejh64i0we2n499mrvfaojl6eodly6slbye145gk2zmrmu6',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '8ixgeba7zvvgl0whicra',
                party: '86jol1kopxm08kw0vlmzehlcuuji26vm21n1s8yqmd3f86g7fq19l608dlwplkdxxbw6sdgtcl6njkrjwqwsw6w0rbbsipzb7z2vmw7txz79gmbs6pbmegavk3gg22msfaduggmk04yv61brinow76195aobzpd8',
                component: '95zy3ner35bnorwugphma1lr8i33shg4j06km34y0fvbo051dnzwj5xxmk5kjapy14h6hudvy25iakf0szzh8wff7c97r4jdv2pd77jsz7ivptg0oxlyk1v0v87kfclsalpequd99zgu5yes1xtgoflnia0979np',
                name: 'js8linzc90myr13ntfxav4umv27e72yq2bk28z6djl3xhzof334t9wmj24j25jb42akksoipx89v4c53b8fme31t0q3old2ilv8rklzzlf6mcybf5jk49qqelwlhfa7fbnqbzbygfmovtpzqnomgpbsx4jffbj8m',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'wyyuy1vcxssm9qoe2qyq9j9mf4rycevnm89ixbnnj3by98zvgzco2653la10tl1rdkfdsxhddyl2iizkz5x4fzp4jod4u3bkhjv6325gr1y5dhl01yzmucapolw1tis5rxqvext4yttwws7mmv42elzb2lgdri3g',
                flowComponent: 'dg83c6guiijgk0xlhj2n72y5dlu6uqt5cxdrwuegupkcdquiv3v3klgqs8nn3yx3e0koujqc36pqczifihwzfga2yp7rx3ca12le9ewfmcja5tqzb09gcwvziclh81u25qnuouy1rvrkwikocq4oy3avrgn31eer',
                flowInterfaceName: 'm23rzvhiakij9v3ednm9ah4p2b6iyoup0tnkdxjacxixkxptr6v7as9c5xoadubiuu2ykx76c7wcyspm8e2dhphvyjo9lvvfou1z6229emwzcmrqs0qb2ogamwyq90r5scj7ovdgjtgxsjk7cizbhl1j15lf8cgt',
                flowInterfaceNamespace: 'twwgll77l28s4efoxyh1kks5knc7oo6ax2e7ejj5m481ui4aurt8ozikv14yynyrwyca6v6t6fb0if8ys7xbn1gbsuyfdnzze415dz5xl10tmwgp9jd5vblpufne0lir63dmv16ce8d70jkexq471phe0aeyt6ii',
                version: 'pufiixzxg31z77g69jy1',
                adapterType: 'i11qsvhc2d9x8oc860w02066h2zhyk7m099jqh1c4exgvmx41c4dqaszu8vf',
                direction: 'SENDER',
                transportProtocol: 'bcr7aubfrp71d2vj0oow77289cjgww4mfrbowqzv31pjexnpydhxruenzarg',
                messageProtocol: 'qln2pfhl6m20yv1910x3i0srqe67b9t490opqknt1ez9r9qg2tvlq1r5xuwx',
                adapterEngineName: '0ykdz0xnoo9mx84ovbdgaoxgi1hbayg7xls681ztrhixp31zzlm83otb5q1xgv0j35q193swov1s1a7i9jfifovu3l1r62slywlwk0n0eoz35fkoeknqqbp3sjxzb0nfv9vod7zx78fn1wu7mss08hctysma6r19',
                url: 'jthv8p2cptsda7hlgfkwvtkvwda7ejclc50ngroq0688j2lqe48b9zfcwk85ki7v4r4a6xac9pesb4qyuk0uow2pe6l9i71ypj50ohgjd4o2tk5wndcud3s0z7f80a1bumn27znizyeam92sgxfsbqkpq4fgtw7ovxtpdd4osb6t3a80z8sxfe8iifidaw0wpnwf2zo756i6ruw2pcsqv5lndumc9u92zihp3sclix4qjs9dzggqsn6dkbb88cmxalxuqkdt13k97t2rq7j03ntin9yqimnuk8gpnoydesr9apclvov3b5ngzp2mtn62',
                username: 'lkbdtkky6bqam9m21t2j3wl2d2zgzscihvml0a7nnjtaijc2vais7g7oz7d4',
                remoteHost: '3dj7r21aro4i1xftgwrty1ibp6ahk5n65ro2ofy8fm9cvsc8v91shm4ega3ej6q3nylp755zl7twakmwckty49ofx7s71e1igme5l9u7sl1xo3614v9h7b59wxu895uwi4nwfwdazfv35odictxo9v9rkj0b2sda',
                remotePort: -9,
                directory: 'bfc8vydqvn5pmghw20rrth4g5gc2fo1wpc8ilhelpzp4cv0riu8ljm5k2i29shd2vq8riyyjtk9rtr6l0y6i5pisij62vkroubuznfe44uxrrck0uj75t4vkpk6o6zd23lnlmv1n7c3d3nz2qxsfznzetskxhykzmgv6vx8esqstrbdfhugzsor9f3pxhe7y7p10b59w70yyusdz2pdi6bpmqfrlia98mdtby3mr8ijgq547tfuera285o2t9h508opxnwl458lwh7e5zti9qimu9yzkebqrbqzsgxcktq7ajo6oqsnlsjjd1cxd9g7ktmjj61yni9ntlyhqf66ln0qz6eoczzlsny28vz2h15j683ewequqptjlghkua861k3zo00qp3dpqkbsxcw69kvbvocpd8mg7oyzf1jk7bf7j657m2me4olp5svogtfyrk4j0aym6icmxuajyo11irg35x72ru18ozj5z0ipd1yuidynj8ivbvuhlh0csmhnjez78t5qhbys1a6888lros6meg0lctxs5retha7l8w17c0uy1dvleaq717zkzt7gcdolygz5ajzvpdjjge5pbgj0by9w1fv6yqghoneqsld6brkwiyrboro4n7by6j3y6bwrcsclhdca16ldbk3qahkv9qqhx7w5zi1lw8x64h4l8a55qqoffom16suhils1zjj4muarajutwvwapnwuj228lvqy9dyqma0er34zfqjbgccoryysnyug90iru84jmd5fn56as1npcwitl2vqkbmf59udvd5xtbdc562snzqdexpc4w1zmxonmdnt829hm3w8rdp7w16syjy696061x3ghb54i039mjv307f03ri87vh9whxj7v0f17rtulzh7u81hjchwe1tlcu5nuss010483thf0fslhibujfkunlhcmw3xkf9mfysmuw2q4zyitjihvnuxikhjmlqapdhj530s4c7thr5ftqdmr3ig12nivtc0jk9bfhbk46imcpiq',
                fileSchema: '1495ykn7eouyduparemnu2ykm4cqesje69mp2xpgk2wvy6j57n8m7lw62n191dfuokume8to3yb3emoc6nlazlrkf71771zmuwarwhx2kjn9zsymjdn51dr57gi6stuwt48fd4gvxprgink2jw5tuxwb3balo597yis0nhk0tjxai6um4l6i6ntg3cxdt0izkr17y3ql3582jb0sr2yuwnkrnv06811hmj23yt6w9f8pgjpjgqasfsexela2mq23rfd3t8ocsddiasw8bpdiqv30kykm6j9to6r4i1of7q0bx0g4oec4gk0x4g5ze3zugtvlzq6wzs5w7sxrob3e7p7v14guuqbr41fqembuyrtamwl4piwpcwa43whh62xfz25nxhdomvq70zm3tlw4bs3sg97i7yqkq91m06ckjp11y2vr50hewe3ehoo8gmccd1hxb6r5qeyakkrb1v05j0ecrrl89ea69v3j8nf1yu4ut2g1u2lct72irmnlh7pzi2mzej0mk8j8qewx5rnds29rz6atw7o6cz4z0mhz16z2atm8szy3jlqkrzhmuas9qmlsuay7oeqdc0tc2hwx7ks4boao896b4exlfxyo2e94zll3ikv737rvo78oa3qwggppun69e84u11oz4rznc8sklw8vhdxfbj4yjahckgxcqg9ifoi0xt233zyh7vsfdj5y9cq07uq9de8sv5rgoa5qmjo6v1kkuaukikofkprvefm3ivdhyaw39am3kdh7dayem91gda5p9g9ucr9wqwdivj22cihacsun1psxh3kpj9ofs2m436ls59nvgf2e6jvrjdx4noy97t7o0qamddbhzdimj1lzqguum9ctb009chs2iehctxrk6l8r1uhd12yo0oah22t8s14hlrzrwegd5op6qtda7dvise7jlhw3a4tp6ii64idrv5tqf1y7nmjkjh39k4gjb10fjasn8qr1k7tg8gi25byygkwt592uoxmkldtoay1zdjml2xrm',
                proxyHost: 'e0cqfbvk8ggez5lrzpdf6yxge3b5ske0a2jqxckt9qrl7rnet4cwcuycmj4o',
                proxyPort: 4768693855,
                destination: 'b1re75akcp6s468dvl05wva9yz6da4m65na8f1owvcw9cmmxohz3mvvljz7yriybfk354ehjq0y4blm5vxwdbq5xqnglpdg9gsizejfybgj29ldezxdg5vubuano5jwf3a4d3gj18cpsxn1djxnm2r4kzcrw2m0n',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wgleren4wy54ktylf02ir6lovjnq2fot9y34bt4untxn0l8f79z270gbxgqlyfteunsxtl8lryxvb1vtn2kyss72hjmlp2y24is6z398ivqsf1tf2ykk5vh7ebl99l2mzd0000ts9av1mhl8uxibbqkvoloflf3r',
                responsibleUserAccountName: 'fy94rrtr3mtdjwrugd3b',
                lastChangeUserAccount: 'drrk0k36mbsx0tr3n522',
                lastChangedAt: '2020-07-28 17:30:23',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelRemotePort must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'qlxzoojldy6jnfuttcvh2w5ln3cwq2u6hmpfife4',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'h28sug2tw6bcpwqguxsj78nj1brhi4oa6seboa90z1q57d3dfi',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: '6zurv3d3rlz8w83vfb27',
                party: 'en5b3fpk5079wygg4dvjaq0woo5esibiecukcmky8oylcb1ce6x50wobtr26626irp9rx32g2iqn9tc6623qubwf8fu2d377tp8ycc62vsko0y84gpqk5sex10f09muujqdrl7hsikdb2i58ibpufu8ue2dupr2o',
                component: '7nkr4o26ux0wrb6cwb49bzmz3u8cw0s3hjwfq0andggqqefbwbxi18pq8qzixa89ymp4ljqa580g18376dfz9cy0rbqqt1wgt0uqnn5pyoa7s00phx79tus5t8ftuu9rleubfb9xhx7y7em9ntyaerbpuymvz9xt',
                name: 'zeluygb55iuzig7ppmkphz8cdot7grmayb1dp827bmj0v5wzhd3sr7rpp7rjg9tdvbmxj4q70y7il8a99i5w5r95sh11c9h1cogv1tgw0xwm2bdmp41owts9nilt6mhy307bgx4arc2ow2z5hthi8bad9frrhyxh',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: '1xiei1cukmosdgklnk6nyxduc8pd6f3tesx1yqjpypwt8b5mugph8p9f6b33rx22v386bss5t2a3pi5xxjjct5h6ayhdi2wtccbmgjovg0i7jzv22apywl8e4s5ym5h2vdu3ps6lzw4xfpw2oqshkwrxwbgvli0m',
                flowComponent: 'b6jzivghbuxp5ca9opvc398ehmmvpee1thvz9iqvo2w58ld86tyh8p0q72k7t5k0l2idraht9prbgyp57aazoa3nqpv4hmferixdm7xe4qnxxkn4v9j7o1xjgryxumcird711w2uquv0i3r3i7x00dfjs1jhclqc',
                flowInterfaceName: 'z4xc0xr9gwwc2cfeiu5qw56j4iy641cvicjvtlwordpqq5kyby1v78g6and89oqym1rqjh1qfizo5pxevi5baowmk2oovskao3da92k61430kwpnkfov4utwouk5bmdue46h0isq4usxv0yb9hshshrfsekae69n',
                flowInterfaceNamespace: 'svoo7ml52dsla9z0mchqfdmnsyzk6r117y0h2665azjxtz6l98fskb7v9iary547akop63njjoz7neaz9d3e9c9xivymywtucy9pnnr4t0vne894vqd9e3965zktbhjvd9c8x003aj2bosl5g24qnshbj9l8o1tp',
                version: 'wo21zwin8rpjpvyebooy',
                adapterType: 'pm4qebgvbyodoucl2jf8efu2tkbkswlpem7rtf2zj0uoyogtw7draku76n1x',
                direction: 'SENDER',
                transportProtocol: '42kz17x54u1ic5jfcej9wwdwurve6jrsn189hlyt89l4wpnjd42m41f4yt9l',
                messageProtocol: '1lkd70erj8pgw00bpp5yn4cb3nehds90otjt6l6ba6bar58rodfji9nk3xp7',
                adapterEngineName: 'jmk4jj43myz6slfqzyubqvh5nemnml12hwk555rvzrd2x45qr9460y01wwi873nuc3w08gom42pilmiylsdmyrxiwk5x63nkh5g61r9mrcmyrsm9pxgg6p5ipninyymajh7lpez6k9naijybz07syptipqr1g17j',
                url: 'gt7gaqjhbmbd7pnw7akzh99wjmoujnczo2y4b3dc1y8te25eu51zv88tc1vt3ydt1o6vrr7b6ihpquvdit6penxanux1daqpa39rx85k5my6f4na9kkgmddql606ujv6cs9uqfft19khv4an7770jed9jtba8a5wm0qfwukkm3cgkq4rsy3fyx1al4zw54245k4gt70bjas376w5dj1cjibgfkdqd8zhf33z3y37pl9ebv2kqywpuyyx3pnsixu6sktir985evwi74pxzd2p3pgey1rdq689fgo76izhkrogy39hlv0zsg7ult7yc8m7',
                username: 'a9507ujwjtux6yxiwb0vli0qlnp0vfmevqstdi6oigdtee0id78ndzw5nmiu',
                remoteHost: 'tun18mlsfdkhcic700ygbrzpdyp3b687b9p62zsswh31zv06uga6msze46qqefbchyoawi4blqn7g8m7igve4g6zzoh0kng7ng9hly10r10zkz0i70ptvixsqiqqay3qbt9932kf2xz3mgqt5g6otm880wa7ysa9',
                remotePort: 6123480049,
                directory: '4646w9i5y0dbff51p2twgjgqou4tupb59nsscybx5g3xyoa35w4mqjaxk5qcwhexkej48ue8qrpfudx1u5sichdmk87wrivflt064b9ek40abvsjb0ftzz6rgdgoq8hbrl5aiulttxc5yqui7au4gxx7kl1r3qk8ja6bk1s3l468wlizxsd9tlv1optr207rn6iiw1pvbzbmobmi8ix8tn3nemx0hsu72z78lyqh7qj3jrrxu8u7r4rdadk0a9prf5jhbhmggcjhux3w94ohnl9hhlyhhv6exy6saupzg8rvbgy22ngoqtc4u8rc6bpie0nn0oiwf1zdwzocvnhji6hvpvndzwih70ewzc02oc34ls4zebxdwn0sz8ea6i77bt23h36v8ai8zss8186au9qvyapld2yd4zrf52fq09pug0ihgdzdd89q688gt8k3b98ufgwpcsetg2cvesks93zjm78bm493fmjphn06mmtjp8fkeb0gdlafqn4ehyvptjmd3uwbccfdrbhnjf344s9izlwxjdaiu0etxphzhzu96fyddavlfkwsttjb6auitgm7zqgs3qeioktrwsdcv5gfgj6yqbhhmz6j1wh3paieib7nzzwy9rl30ntgfhaqqj7clkx4shd53ritvmhaaud9q2enr0222q9mhyn9nd39buo4pkbdvq3ibtskzihwkuwoi774rbdw9tifxoflxz2z35wykvi6t4x38oh48816r301bur7ur55djk3z6121hclb945f6k3v4szkd2n0qbnx5kiliccykuiuoja7yw572t9venc5128715zp4md0h68sx0e730ubgy91n5lqi7jvus3udmdzldkuor5s6gkygb840dubpr05pgy67ydk0mhdorwq45x847zjpqua2fl5b0h79faoh95tv2lej2en1nfxdth7w8vxyxkdgixtxau3p5k4tiyxotoenhfvygpcevgsuqq74rcbuszbwaj8gwsycpw2r5pymd29l6h',
                fileSchema: '672oxlqvurvhfnlnta8qd5n0m4eftjf7pb5hxrrkt6af658imcan2rrhhgz6qww8mmt54d49lu3gz1hussr3c40bruol307hx60500tn9gf1j55ihxnif7stewo0e8xlizcqisphopa0143clutt6i2mfk4f8mwzwi88o8428y4t8avrp1feemwbf9qu0pb77ut7oajhyyy3c7n5chorqt7h5amjrnco0y52hqgmxdcyxs1olajtqbuns7go1jisk04nvzsya3stk8v3of03mh5jrqvkm746ldpwo7t74b28u9jl6yeuky8bkeivus13krv5ol3rtjrj8w6prhvalbt3k6794js6u9yc1vau7et27787php6o7rswili9pb14kzt70257k6n6jb52b96uxa3km8wfs94pbyskdshwephr0c2wajetgy3u2qlh7rzdi7w4y2y7rn46eb0b9aj7wgo9u620vi5twdg60mpwxu8hsi4xvaabgihnbnrm5d35oarnrkes4x08daivklwhcbrcdmds5be1wft9050sdri85ihyv8ebzd7ch17f738l6nfy95jo7jp7vta25ivkmeeo27um16y8yf265lqzfcu16rlxi0xzco19d73tropx1e7pohlvdsxk21vp91mfqyw4vx5snulud243lt15bb9gw3bkuweoibmw5pbk0a89ei8olqmw1af8xm0msol0xi7eks9lcz4hnmvn19osd3yy99q58gxirdecufrgnqhbi8cs8b4v8tks4aknc8a8d6fqnqhfqzeaosrxav6f0kfwe9nyy345bctx0r53efju0vs043kdwfgfyb9xff2bgiajgoqxfqmq7ttea5bsirpj2orbnmnz3woh0i95fb7zudhuqnmuf8xy16vsl8vf8bh7kqmig9di0kdegahdxku2qrjvhqr7ckan5xezz2vloaj0hc3tc378u8bu56gpyj7b2xgnwpcdq5r9zfoa92ojck7dy5tsj7ymrdishv0',
                proxyHost: 'hlnbbueqzwbf6o02qm9j7j0emnzw00s03b90iq561489lmo63k9ejy75jffy',
                proxyPort: -9,
                destination: 'rgjem2e3y7paxhqfywxp85d37enganru0qzb6v13nzud7h9d16ed812g7ld8qizieur4y1d61atrv5piu4fryjzkeiw9rqmwbfq34011iwz0x7h89ksnu4b655uk81u1xnl72k3uglgw91mngygr4ty4dykds35k',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '84jn4p92jt9qyno6sgqgwiqroymnapz48ego298ibcui2yd32lwpdsc9qz87tpd4m6foqnwlxeucdwbyhxwll7sb1j4z25377o18ciq2gqixs0pa4kvy7m0zbzxnr5y9jkr47bylgc11bcgaqo8vxp16agqzlc9l',
                responsibleUserAccountName: '6zz457jcok0c9mh7vjg1',
                lastChangeUserAccount: 'p74zmaa95jdj0z0mvnd8',
                lastChangedAt: '2020-07-29 07:59:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelProxyPort must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'ugodstm7nz5ffxt1no8m3g8nsodbz0ac1c3waj43',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'y0n7levxsteffbl43pga2ia7mso4ykedkrdgypwnjl6gkr3g6t',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'qs9o1i1hxr093b67eypx',
                party: 'f6um420izrekt19lp0malzi8fiy3616zys4kg5silzik7pjmle6e24etndkqalwjtvotcxophjqv9ja9guj5k702d5uckwl857q9rx02lwcwmpg4tn36gg7srfy9hblajl35a29xllj75dlmlx9m8n03kq6hrjlj',
                component: '698jepxvls5240tcj5g1yz4pz2e3ppi82kwgmgul9nd2a2rm8aq7wppb0xtbxgudcjivhv0sg5pisaxknkyqzr86h4woyuviklyxr2ur0r02omhwn41x22rpgr440gt3gtbcr7ywr6crwscuyyib5xffgfcisa90',
                name: 'eziipr3x9ib5iri05wvow1rlaw1l3f7ivj9n2fcxwsseegmf0x4qnvekappd01s0g2moep4sy1nq3jel1d108ny8o0x9yiesp6583zfk6ny45y1xq3c8y886i4ri22m3j7jazskj7prqdp00i75f9uomn2cypt7p',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'x069ovtkh4xbqxd9rwymt9zkh0lcn1j8pd9nypp6xgwqaz0ug86qcgt7mzgbi7hjb7kzbx5vvn70w0wmjzc5gc79a6vx05suxtjl4xxip843bxqa65ze2y7fy3vilr1ddhvg8ortnbryjzm7dnjhz48aepb23olf',
                flowComponent: 'ku9t6ow4l2afssc5gjz61s7z60fjj1vhc3rwlsr69jb7pvw4r527ygsh77lp0mskl24ks2si8d798b23ipj369zo9i6xvsqclg8fhnb8iet8kfb4k9mql8rb0n4hdvvugb5fc45tuv66un53erow2gox25epkgfz',
                flowInterfaceName: '5bnm5cfexq4b6m1slzl8m4w0z4kgl9oe03xopqxmok2r366cxvc1co3j53ezbce3gzikgszixaaqrczgt6kbe13ke5t4jg3z6skllwuull3tza4ceomzv0anjpr535q7losi8lbd1smuc53tg9kmkevzlyxf3554',
                flowInterfaceNamespace: 'kf4b91eapp6278jathjby3x6h1xvdj2csp6fj039gfak6rs2qta4rr649bdbtrzs1a8ki9n9x4z4n6tslq6vyar9unnj7ist5plc3352bp2zl0tp7z1n35s57aszn4su6qqicg83bfmrybeb90fk0i8sy0l2ntaq',
                version: 'dbcbrfcyz7us2eanzxfl',
                adapterType: 'zl6gf1uxw1bqtgrialettxl5mgkzld88xu7zxrj3c9r3k613t763cfkyjdcw',
                direction: 'XXXX',
                transportProtocol: 'nhibdfmvsconktax388dxzp58tkwcfb0wma19jscglulxe3iqcerkbvo5fkv',
                messageProtocol: 'x8itb2yqsr0ov7z6azuk2kjta6q2mhklwvia6ag2s1tb59rutrgqmwe9ww6v',
                adapterEngineName: 'ksrc73xbnoc2xclwmpjozav05mmzmsklq3jjn595of5q556cglskbrvkjhpg3cdu7e55qd937gkzodddmh2bp4kkdzc2qvr93bnc78zs2t9tas1ki2rdugevn1zk7g8h1tom83ct543bzyurxr2f58qjs9hw3dad',
                url: 'mrdtaua716q6k2ldypoznmpjxegklzzn9z6atndqnwqfurkkqmynwo3ks1vib15ye4gzw5enkvhtjx8oa55rhe2940ke1rc0ycinfy8z6stx1t9zriccf6hyapgbfg1uuizxk0hlzp1o4i26x6e6f3x9ggxgbez08suvhp8xcjj4bic1sogb2jy3jidcxtv2q52yjp371zgg8tjd6apo3afz7aszzs6hzdaybd3rt0oaee6ij0qow2o4v3zx7dqlpybzb4j40xqmr47mga5gwzi2bpxlyyv2p9mfipof50u3f2y03ungjywypa3l25ha',
                username: 'un4lmehok3qjuyfg4b1b864gsfrykj1zi38jonb02jytudtlivk78c5a9vmy',
                remoteHost: 'ebz8y7czwl6i0mp05z5sq98tw1ggwplaw9fu20vn9exthewzxkuz4yd3tern6l16gccyibq6ycmtv381f27gxokrmx9pp8fpbtxtrxhfj4dbpy6hwnmxlqwjm63bfi3kgxzaj2bkt9ot83uztyu75j8yjaqjldz8',
                remotePort: 7382249527,
                directory: 'jdxz5uzi4r24p2zzqck05wyww4vu2duxy6ec420dl1osnxoff1d6cus619hrvs7fl0fk24t9tdp26mql7dt3es8lgrvouipyvxrqueav8hdulf6pfhi4gw2yl21o8iceqrdkhnbvrivfs94u3l3xbwvyorjwnk4tf1prbqvcsyfzs0rvklklvezr6pfiwhijxiofvem5yivlbpjcmjcsdhquzc35ycjdu8wgs8kbybh6uj60bai0ovkq8xqvgus9tqtsigydtcdi8yqkjp169aboxlg8c79pkzi03bh0ke48gdkd9asmghxz6udx8w4esgr5ejpt47ygfemcnc1memx782kvxknlac3c8tvggg8gj5knjsus6tmkzb4tmzjg3z5jbbsqmj7639ews1v1e2actztkm7tc9g1ay9dtf2zcptfxi4coilma3b4pofwgiyw893z6ooshmo29h4w57xwyvymt7u1hc8wj8kz1o79gn1yq3civpz6667a5e94n52llmqc0zu9wl859ysv9tiupt3gmbhetefntemcfmp3jq2pmnlc07s7x0znx411md08jd83yek8swv3qznavrje74kdjcyrgpy9r496gezz29e6co47gha3i3cehqb521fae7f2p9y1d8dydxma35bjzl085sht5htk018ga3t866cqi643gpkwljbp7ptt8iq0iaxwwbhb5wjarv194tzutfs0p20o1wslr33v8gm3ddwx3kfvho56jbv44yjeq4zi7lmbba9n826urgwhkknxlpqejpc3h29j917ullprouodtgejs7z1cakl1tczr6cyvi377s7ub97cw0woggbmpseq6gu0oh7au7oi9gq4d7cr2rgidiomtq3f2nm38ezo6ezfyi0w5ap1d56jeu0m15mylc9bo197tccf1zs0al3oz1a7pm6fges5h9clat3h3yll63vyzbrdtpapwoii6whweorefybbx3mffx7sbn6c1u1qol3h2w1g4wzh9',
                fileSchema: 'puiawa67shvmfxco9rb7cnj2mqd6o07khxtjau2vyp14av0ybi939gxkv9n2uxx9tvdosjbtcfx0lw82o6osugoyjrsfn7aajxv75nb5fftt511hf0zho22phlnghdomu5grsglmructbkduxys2785owsonme5i05bdjhf5huxkudgk4lpj9zia35isknafjs7mcw7ndyary0oerm4xh41v2m2i4bixk7a7jovwkrv2gvcdk0bibflvhpksqjjn2ybqxof9hhkehazrif9zti5utmcejv7c33qx0wxdjsmlcm703tbz4pxlxcjiul5iko1k9wo7lom1pgwxufrlmdvwlj6y8izrhy6eixud4370b5wk9qi73pkqgfn1pxbojihfa4hergpca0toznr4goytgtgzlcza5xxrec6baclos01xh8ks5l4s8n1pffh2un585d62aws5ipbh5h6mlg130q9yi4nvvt75iq8zy82qpp35a3cq6omccyqqn61itrx017upw1l26eoj1eg09lnpoisfsmz1ubsy63ioyd3lxl218aps74t4k69foujp230ot0z3nx8m2414ysb2o236q9hh0ifp34uws30gcmc76wgw349tbw7awo0p4wucmkokky831pc13pcuinkja16mpbia0cb6l9izklhbb6qqinsqlmx0iibus2dn9ol48jlgvbirux75t3jztog0zzsl8zcmtkr2sv73gc607fensersvwppanfn2mvhk4hfm3rot4cyrj285it1m9bj8qwqmurgqmndfk9wpopdll6tpscqfu4g5zdmmig2s5ns3w6j2ru23fkfr7pydwbeuu5f5xcg8r3xwdeezt6io279ybxt51ekmk5devbpnm83n53c0fuhxi2zhy8hqua3jhtjcu572349ghqdombtjirv0zr5py1k9fxxxr3r0amzgd8t1t3qgsfo6183ht9qtuhe7uuno3d88du9f3r3m1rvnk11xfn7edy2kppfbecm',
                proxyHost: 'pwnzupfxg57hjdwwsa813dqidjwq68ic7c6748vmkdxyw8c3fohx1198g7bu',
                proxyPort: 5389950483,
                destination: '10oasmal2zp5v0icncditnydp81q3xnariwm98ocfxlafvqaqhmkyy8coix9b3lg4hvopj3nsstn8gn9xceo6l3b6ny6mcrbb94lqr8tg5fp6qmivsaqjnwaolktjd2mv1cin5krneqwvhu8rahviulwm8dtrpy9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '75nzhcdi129lh2r3tubmxdfql7a8v2f6ypm08vt0w3ltngl7iq29s4mq2oeji9mjfocs129exaql352eu9pxhyezafquja4f8a0d63szbby2yhblxs7qpzk35ksqlayvxi9yqrtbs9uqzr3gb84pxzyxofndcvrk',
                responsibleUserAccountName: 'f1u2xa05dkkjanm3fc8l',
                lastChangeUserAccount: 'nf5qqusvoyvazont2m5b',
                lastChangedAt: '2020-07-28 18:00:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'bhldzzdgphqk06iyq1tjaprdvjnpbqtkflf5uud1',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: '0xlr8rn9fa8kovp1h5okkshk541ccy40j4qrntscg8irras9ky',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'fwbi9i5zyftgq8e3s6mk',
                party: 'nm6wnxt7yspkous2132o31cfmmth57gc3iuthc98cj55rcz5mi51jntvllafk8ie7eccqynx41d7tzl0b5jj73qh23fbslg39k6wgj76n5yxqk22asn8fx3cmojp15jqf8y0484eyc7t1mawkrty21vbhetzs6cb',
                component: 'fo2m3zo77xa9s5fmjssnr9hqpwnjts5l5tgfjqe7jtiwv8bafig4tu060d0s7nti5pmiyapu8vxr0a1dirud98zar1neqshovfm5y47158gq1zbh7qte0b88wkk3t6aw534tx1k179v6fda6jbpxibsl45814ru3',
                name: 'ut5cwuz9mhknr8wz7ojwe1cef0rych2n8igzs6ih8rqs7zrh40q2qvhfzpqa719s1fzp2y2deh67p81neqh5tkxw75rem9k3u5qq0ru361n7zap5ly50hbvkui02lm33bie4qpqfvh7r463nz9g72x6ytjtbirds',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'n2s8378ydvde3qjjd9uv8vtfpka45idwktqa0thgzer6u2lnvkh9khffyez69iaakrxwxqwc5jh059z02yjdkgrw5s7ed7oo9lb9pdy9h0jqo4qaaz72wy120cc3c2e6x8nzhl5dzkveyvmenibwzqmdfqq36p7a',
                flowComponent: '5cy0lat36lzojkzbuq77ceuzfezyr3mh8fuvcsm017n1riyjk4cvjuge0m41or1h1qlywakc6if0ty73on9tdwsiz6lhnpnx7wwnserxeven4vk192b5pz91qoymojt4qek6uf88e8q2ft2flg5td7bt2y03cjjn',
                flowInterfaceName: '06ejz4s4j3wxgwzi47orprj102ybh8xnu0ywvuk2fikusskt8bccng8h6f5yfihe9qpe44cyjvub7fc1gwmjhu6ln56hih230jvif8s05fs134ipscd3jkvqhjgxrvwbrxtouzesw3u7ciggoftr62od9cllhqma',
                flowInterfaceNamespace: 'qiwopepch8v9db3h0o91z5snw6lh4wccd4rpjjxxp4xm42a1jyqsukdg5qk1tp4dem6z9eu9v5fmd3u7z0wl9l2bt3wzbutqbxkwi7k9p2emjp9gjdcbpjdqk1o4rlj2byteitn86ph7v5jxr2q0lgtwadlzy2kz',
                version: '70f1rf0nuy9eqao67wqx',
                adapterType: 'sdqeexjabxx4fxbc5dklzib2qdovag55o5ii1bj635fdw0sf5dpyh93kvmch',
                direction: 'RECEIVER',
                transportProtocol: '6l1f0lrvjefvozviojvnyawivadf10clgr7amac4r8k59v15s6a0m4g1aybm',
                messageProtocol: '3rr9w5ih6hbt3j6jdsuaqmcskiqoizro8erhk46glaf0eqs932ax9mm1zv4n',
                adapterEngineName: 'dhulwf1fxhtno7gs4as1d4i5gp5qdvwbfmucrnd0jzdoqcacopqfxscwdo7v93qn6whitqytj0g5kcds09cc1swg3i0ygy6q3jmx02a5syoxtn7qv7pickgauzel9ragks7ky6ckvl2cxiunzh5yjx1929stc3fr',
                url: '0dqbbos9hlky8fipyiq09s0ivarcr4am84z22foa5q3tb3d9369wb64jchssomy3ljq0pkq2gdm2efxik8j86coaqxhmzig64y929fhvvhwj85xfem1h8y1dljrq5wy2px1mkhu6h9noh2smssq2c4eiy0b0zh9fkrp9fuw3fqsdtwkrlhsds5vcqd2vpzvpsheuk13tuqawt0jbqodoxafbqachi7enwu1sjrjxwiks6gtl2su9jap2txsg1au8t478t37ef6rexx88pavx58inwrzrtuq5qsnfxxg1ywzjdwxhugpkqw0sbhk62m4u',
                username: 'xhkglqnih0jmiqfs9ee3aphxcxu6yggtnpf8pryqguz18rzpfrd9c6miasy6',
                remoteHost: '585nud0kb8bmwdzzn1vyk45e2orfzv2gfrmo5ipt4z3y4wfuw9mnvsx4epcymrqd38xx7h0ame5l67qv1gy2ul8gibym31tbo7tig22n1woij2q431px0mk9e5nvum7kutmp9b0rafffqliqxvn7g2uyame28klb',
                remotePort: 6856245510,
                directory: 'ly5ibcp3c75c7jlp9xoni34a2fd6xvbkann0ng3w1j818gqxzczgqpbn036g2qm92avq9j1kwsnss8b6tu0dvb376tylmnz3wkmqkczjb8jhjy2nv0tmtcag87vfui337vlmiwzd15xuzcm89bq1l8t6bdak3gm9g81zwcqfgzk4uqq5cmny5j2vjqx9pz3278lhk2pqi3kyazgbkpjef97nnggtfr0gswziyrf4pb1jofspgs1c5vrwgauj034dh3ysxs6nl645vs3b152koykwpwtj2ippchk74nvkwxms20f5ghl5i3ey3hbuk4oemv9n2ccq6d7ozkei9eie9vosdn4kqj4kd9yew83gqwp89cfab0cexw3k2yv9aw4okdwggup2wckawpze4y5xqw8ktsg93lpdqq29sp2b1uhqkqmx8ija2ueztbjiydkl94wswmvu1mf6ock8ovup1m0o7l6sq4z1r7dj9tde3udkhfqai3nj2mbn0fura5fzhg2y9qm50ere4qtoppkpk4xgwwy9sbjlk1yarpnyjxm4p9n9wqc0ru7kr1ze99oklracb7ru7prau6admkgp6yx1f7cid0zhprsr6hrx2qzw92syki5qxdll51wjdhyn4w866hhuun0wx3xb5bs7dnndf9pi801hw91jd0d7cngruajj7fy8k91zbo2acuzntwbei0hdrq49y015onbsdj0zadryyo9uv0xtbxx0kjsafde5o0bg2a7zdtuxjou0i8pmi8iro9arpmz9o0qcbof9s2p21iimi4217m7xucmx97oiqa9aq7hgbqgl7a2i8pdul5nrr8x7cpq3m6zgcw03vonr5oag4f16xi18u42xbqcyyjfwkku8fhwltnncfoubz50yine6rmx76s0mvhieq5eem8cbsyfmg35e2d7dzpcdj4v5vscg0ej7w0cpfztzmz7lpzz6qeipe5i6vt8wt7nhvfam549e8ya5wlyfhg6lgfrt8b8h1g9jqrpm',
                fileSchema: 'zlvqayuzkix9c1u9halxgxdqsewpvtxwsy19cfu4yhdxlxvr4jtdlvf92orzmbncq62wlra264x4x4kxgtdrfu5ngh0yqvqsbcgnv5sol8jedy023leox8yt7e8jzlvq0srvn2qvleq0x085fapihodnjixqxblzqwhqh0pu92ekzbscuj47q5lcjtr7x3d3eqg44adstejnbe2yo17i5nycufv61260bvgfopu6fjaf1wrgx403sqn1y10rz6xtmzegoycyr1wodl9w54dfo8iulryei2kc0jz1inm30agf9mzj1i5x0aiyugpt3rrjlpuoj7zg9akf3q9cduyi9p4gjtw0w4vzkma3lqksxnm7lrnrmofr8g41eagqxqyfj606xxffba019s61b96qk1wdfsz9b18nxan480yebqxuxy67incprv6y0wxq9lf3ppn0mjxj7vdhkhcnkk4tc5dzzg9rlmidfc0xj102rjdmh7dv1ogk01rfjmupnl77pt2tvcgqnrucfcqytcornemh5f4tn8cw21fu5bztxftuop9xfqqo89lm3min3ctucvwqxb601djqovmj2qc3tfcirtk8wvvenctqjekrs25kzjznh2yq39n6mzijoc2rvhz3y4wckl8w7uhm625r75ezpyxsffg47v99kppyiiy8eh27bgkg4rvoq3xl6wyfshb41an9p1eg9gs4fz6noa74ecw69pnvzydr1qp7j30iip68pulajwircnul1clx59qcx3a1cvxt2uqybm5sfcgam5x9dmm01sqninuy9u5xso0outru12z9vtulhkuoxbd87hqm6h041bwr0ddn60yb249rl7ewk0hvngb86g6w8anwybwushhhnfu7l4x00j9jo3c7xg1e1uaxtx06iz8soobp29hwaexgnbfduzg0fnilho9bqejm3rkfysi083pppfvc8cf05sl451lod9oz8w44n4vz6qms5i32p218868gu3gyq9pikmtsyoii',
                proxyHost: 'loltl5kjuru2vd36mrswufhys1syvgmd3shrghurfbg1mr7ceqn78s7gbtiz',
                proxyPort: 3134262238,
                destination: 'nczbbtiglxmdr0ozhurcyu3tr5gqg2wytw08o0cwpf6cx0l0ks8ru4rjgyf8q4kstvyahqp1elg7z6dg2xl6tid5romwwoccx1u9pausi9gk90khpjj2r4i18fvcnwkfmaebi9v35w1srp2mo5xemanzlezyoble',
                adapterStatus: 'XXXX',
                softwareComponentName: 'valqk7p623753yl0lct2307fv8g5n2g4ililo8670bhgu4umkgqqg3gipugh5zgrap49zsbn4gvi2s3htzik82lfbf3a63fm94w67aazujurd4zgsm1ws3kzmbzh0tqts3673noy277ka72m0ea2sp6cu1cgc0yo',
                responsibleUserAccountName: 'iit7y8coc7coqkrj5my5',
                lastChangeUserAccount: '2ashdd7auer0qua9aqmi',
                lastChangedAt: '2020-07-29 03:24:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'dotci7x9qw4u33uiqp2iy59n1u81zbsepegab6c7',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'zncfuw0yiiaxv6bz91pw5h7htvtmb6rig09hojqisu0ck9puek',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'jn9uxl6dyrdj1wh8ox19',
                party: '20rzixj9kjorh1uyii5uaanlewxb3knef0t9f2lvrdaga5uwop1yn5lxrz7ljevixpoend2xkddnsfubs18fwke7btn70zmdoabmhfyazqh0jjybny33wcuad1lsi5zpg2x0qdd29g2sel0trt7zhielggjayfzt',
                component: '6sghhcjlz5pnaai61dhbtb2xeml886bdtz08focp1k4ibaxb6n3i6xr9fby8bkifmv87thngun8eww59waxxcjhc1p64borfmhd1lbq9o41mzt99k32mrb1w7xp2mdac2nl9g65a0j65jcf5tkstjy6e6jr67kyr',
                name: 'vkdehdkizjnpv68gbd2xo8qqm12xmb1nar5sk5bmebmnlkxbdx58rk7mur3xcy7xkgznmd0atlzhdavndu5yax7ofjpy0rm1ejziy1l7uk6i9g35xtn24sznc7olx1nljne1g39zwqej4920t4amcivw89wwajyu',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'rdkc1ipmwxn4hu94n1uj6g7fd0zszh9ws97ickh0slhccib37305kpzoe6j793u70563hqhjtbf2q3ehd002pp351hntvgd4x7mardkm1jrnyx33a6khsnj1edtaa79r66e8n876g26qzmgccedxwxmsw96nb6t2',
                flowComponent: '5j305ax8wjxyqkmn3yvd1np16f2upra50jsacwfie3xc9wwenpm3dhcn5984jkqwq3cqnkmbz9aa43svtlv2vndo1cicvotlrdfnwj0qfyb6siq04mtre3uk1okv7ml58xxdhws3hqht18txep807lb94n5tp66e',
                flowInterfaceName: 'u7nbb2zte925rinozbot7e5i4n9k2qzxifgbqpvkh8unilr6d6dbhply86lxsxpmn9o7wiv1bb2dovb5iqnb229eli8baaz01iay8t9x040r4z18s1bk2z17ps72u1zl6sumgejofn943m9mzbuxh7f9uun8bemy',
                flowInterfaceNamespace: 'vkyacflnp14y0z4xrvbtn1zuselxm4y2anxz6xs9mj3v4sd8fasmbqxkqoofhmw81y49nsai3jfloiuxlhz3aiufqa6mtjds1gamsrxdx56xooys6z9pg8vgzsx5w8v1f2ia19fsajgfqlefil72kdatil2l8ndi',
                version: 'ccb05y1b2omn4mu08p14',
                adapterType: '9bm6mz5ssgop8fbny8di0yin03mgzawao8ocj22y9qzg3yqsx8js4i3q2srl',
                direction: 'RECEIVER',
                transportProtocol: '07lrlu3qa0bct3qrrc2eysqx6drd7v2q9gn1x15neuydp7k6cqx6rmrab4b1',
                messageProtocol: 'y7om6kfbomu8e4z7jpg8tmlosgaslogdyq1yzc1ity11vvxqnvz8q2yvaw78',
                adapterEngineName: 'phi7yb7nthve656su3gyx8frzretjwb1iqqpvl4kg7107jpsw74nubupujeyfho1o95b1rzdhvwr7d9cze8yerpnl5hp34o6oii37mupvxvwvlf2mapq4aab090yzri10cvcbs7nkpgh6zjckyhisv8axx5wuh5f',
                url: '1itutwc08v7oczdehlkpwu46m83al7zvbuo91alv5q1joylu3xf8estdq3lu6xq2f9j1131d9r0nqhttbc3rrtzumnfmh0of6o4aep5a2wvkcdm6po0gbdz6b05qm01j612s5oyo7raq38a7xuqwe93tg4uv0dpz12c1ker425xahk93fm9po9gi4o23k1xgnqcrodak0o0ryjtgrxmdfg3kct65jalf62s8wxe32zv8wzr2eyleucxes1g8ocnw2vno1kzcaq4k2at6gs4cx4polzynx59czuocysimj0i4wv8zn2f0elnb08g1m90f',
                username: 'f94yjh9ef1e6tffdgily2qi6fpu01d58qz6kckrgfe48q0zdf85v03ti6a8c',
                remoteHost: 'vzn4k47z3l5hsxdqfz0fvjz4nw2vflgzrk90uqx346556np0f1dyxhp4b771qtbjz0ds68gdcchcrqr0n187rir7wlhjhkg5aj148bugyzj6b7chohr4fcmfzc6i89n14r6ryo8ezygl7lssbjhh4w32w6kmxtfo',
                remotePort: 3929945217,
                directory: '1x7f7hou1reau0186mbj7oyeb0s8hnc6f6wsi90cia6kjifk07zjjpuy86972gk26strjga2plkj2jf0qvob661a7j4glr19xjfssirlbrzi6ufhgahyiid7mmzqvdlx8ktkhwg9jbxgrg4s72u9g1ttbuf3qime3knnnzlh81kyx6wl0jibvrelhb2ueyh6mzh3vny5idbef1xn51bi3eyf7fl4nt4hlzdi6ce1u6d6qgc1jn62qowk7j9zzc94p4hcgyseaqcvj9whn7xuxpapm2ocdak5esa0mfbqfw92jcbo98m8unv2eqbjtc03mgdyeqt9pcnwmfry8merkzvtl9n4rhd82qj8yhl5yn4y9kil5kfip8gbznyuep13ou6k3n8ge9kz6clbaqoret7o3w9ha8k5emwra4qh0xwhe1p4wszss1eo0hd3rp6p5e88jq8bi1m03x0d9papoaozovi5oxne49hu8xzsyxmd6uc8k0fnjkcx3gp80czfzumap2o5376p7j2edrq936pea7kqsrvusim5h6uvwe48nj1chk57znpgl8rlselxjxr41p65lx3q9aitij4v183sv9pk7mfxtysby4g1qlg10df4bq4koop0ybzskophv6i70dvs5z08qjhjajg0q65xeokkvyt0tya57f6v0jo7a2xu2o4hcq6204b96nh89idu55gcb9dgy6l8emlrwn5axbzzd4rnl1pnkxdxqmtkuet61owlayo08odw28drxlp9k3r6oj1lataxad9ett1x25mb137gv38800lv6fxc8ubfqpq0b8t54k5gcevdikxybv4zte5buus2fjm1eddmum4yliqoosejhpdxn7umkqz786nlm3gxivw2nsbgpf1ru734z9eqimsj0nqruh89cwtk2llirs590c573j204dmdqxr2we1nfyb9d88pgxojkwxk81a0ut17hctfgcjm75f0hqh9ceke3kurwjdkucdxyhwtb1thf44b5irw',
                fileSchema: '72jujvqb2yrli5kfzsnicyu38lv8s87ezq44ylua8stqd2yau6twnlsvtl4y5uyfbo12xbbbqijmirm96spnt7xs5d2oky9xd1e2wktrx9gvbkrm2l9krp47m5jn01uficgt830s6gstde8zrchkntsuglf69r107varnvgqxaqxjgpnxzpfalgm2vpzwsydg0i2ooh6c5ylw7xfz92y8wnobt7k25jwx6ug7m54og31of7kdfdmt8wwarskvcf15x1nr9oehw0yx80k7ewv42dtdzqhw3b08ijvwarxr2mt8lb8wde253bppegypv5dhb10ddjg0z5zwg03ffoeekanpaagc5ghxxsdb2ghd1sei6bpivu44f5rsgykdr99avhiayfggf9n10uiw3m6vz7iosdjbyfeodjvlwqju1dwf3ssietpg1du1cnhhyzqk8tmriz9rdxz9n8ymketpak2wjy7kbk35v7jl6h1nf0v0b2xap44kbdb7mjnir6byiic8ugke9vcl8s62cp9lbl929nam0hd7d4llsrh4nlqd6mdoa5mmw40b8fvzth9tsnedyo2dgxxdw6ei9r6xyaj8rbo0vnmlzkd5dt6g017a98ftmwa2w775d5pp39dwmqfefbdf08ij3pcxwm37e1igvnpi1gzrcfprslhsjdwbnn4bdjp0gia2g7gxop4qjjbtduaj7x4m0evi5ziidak6cb2v0hgzi6phdh8i1idq32xboy6zo6i0d4xnqxzepl8klxdznsu0fal9xsmjihdrmo6ke9q0qosfm4y6w3g7atze4pqtahx4qayvkzhv2u4abvc6dodwzmq14jna8f3cl23alry35cnws1hp7pfzze7o4qz8zx0wjjllw6jtj6wa4til1znn8sjmucahvkla0blnag6u5igjwyhb1rrjocnyrhbk2rmigrrpo73064c9e5vgdb57f61xy8kug02pqec1o2k3exgqb9kciujwhphykljp7vdxmf4zizl',
                proxyHost: 'rq7ad29cplmw9wlmlvv9tmxm5yiglmpors6p7tusnfkporga0n6tfy1e8zfm',
                proxyPort: 3152521375,
                destination: '5mzbyhndnsjdg39ptnapzngy8chljldueeicm7294w7zul4m29gtbhr3r59fu6yfgu7j51odftpym1yahyf9lbqgsbqnd61hzxywx85o3tgo5fyqkj6rx4j3bkt5ne6gswf1zadfb0vmuz6cc6bfdd0ncfvzf7h0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cmz3fbbxonul9t8moou2fgn1t0lwopunxbfh718x4nj44eqpdlgsx6wqkfuig207sskncblv8th7nhc7ya4e91mik3jnpanezhr3r0fg8nlcv59cteyp58thpragdojan7f2sgcayee36de7r5cmi2qnzynu3s8i',
                responsibleUserAccountName: 'wzx139ploh5tq725azgh',
                lastChangeUserAccount: 'ecgvj3uw40o7s1z1515z',
                lastChangedAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: 'xeyiajq40cbcqvmzifyjew50olk7kmv8g1da8cyj',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'd6emvabl5c9kdpsc8q49w682gc898b28tejwa5fijiv68k46s7',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'hyv0ewyg7f769pd2hewo',
                party: '27c3pofw4fwztn8o2o0cay57x0k5ou4mf7v3fll3c1jy367gzf2mnvh7aucapgpifaii6aaji0x6q24mkla7dmewa2lqr9q15f4cq6110oj31qls5sn1mn12eokn65ylxuspul2zoxsrmuz3qo8oza9rkxtfip4z',
                component: 'rzpvrhe9ubb2otmxgcp80t3bm2u65p5d4vlbtg7e2g61gtk8cm5csehho64lvh1jaw6pewmhhtpkdmjl5413mai41kbtdp0xit9evt3nsztxti61sjmcooz0txe7vmnja46kw5f66o9vkusxbbo3d21ejh74eiqg',
                name: 'kuo7osk1waik6yhwqqoh3wynla9ys2h87g97lj4cyh7xgc9e50t9rkrp4ft6y0muht3lulfvr57zldjl3o39po5bh6tviyhfm18ip11mwws0frqslc56zlfzdu39dldzk76ntl2ceuw5t0vfh5qsq5u3yf60uzxo',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'ivs2e116aax7bahk0rb8my2ev8807t9vg3mv4j9yz3akshb0fbbijijelhnj7v3cn1jypg033pkjbmuz6ljodmfi743tv6h0o5j1s70ntcphskwqm7lxv2gk46d1hxb6zprtk72hfjwhg0xixsckmklio6ehw0a5',
                flowComponent: 'clpl1c6az69j2ogya1kg5cpvljv6c4uolxqhz7eodqe7o4rv5z71wowwtt6yad3y6l6l2x9goxkbt93x7tbfbzd0mps4ww29x8ky8towirnsic53u2msox2loulhtlrkl7dhdxtmy697qj99q5pq0qsail5vdn36',
                flowInterfaceName: 'wtbl5e4u7byqn44iw4zq6cbd0g82zhmwcfhnmsr7eo5gdlyh0pi1bybw8o2rqlrgxdi8xgu5stbt6kkpe7s2nh1vswvzu3zuwnwbscx2fmszv4yoz91afaau98us5rnd80oaklrw8ktyxm88rqj7zcpgcj89cg1s',
                flowInterfaceNamespace: 'u2x1pz4mg0yxa12rnz971gf8ubggauo65hk04ic1am4upzfm4cb769k8i6mqg90lnhbjtb7db08hjn0lpvgqb660uiup16dimuz0820lzgu8j27dx7wlpnpe51nuywd6vkb81npqcy59iqbxfym4939y23si35ja',
                version: 'jndr7g7520xzej83z03z',
                adapterType: '04ejbhrr0ykdvq7esc9uvpesn0m6cwwubkoztylri5xs6bdee0rd5tsdlu4p',
                direction: 'RECEIVER',
                transportProtocol: '8h4zsf1zuzsqntcigl48cwgqgmv2dly60hle3j18fcrpa1sbi016d120xlvp',
                messageProtocol: 'yb7qx7coigbwj7fiqkuev5cmvtzhpwmez4wq73p8jtaf4fq6hfqzeuasy0xh',
                adapterEngineName: 'tllvd0shavjxfblij9qhj61oz59iz89ipgvl4cvp6nrzl5waelsouvz8bbjkeias2c8bqz8gxdrpxglcnjqd38vqwjmvr88pn0h2iwaqlcir6nmvr1fleekuirplxzhg9675shwncj1zfvd9rqshefy5d30v6z2c',
                url: 'tao4hqb9z2l7lgnaxxaysp9jahvov5q3aacwekdq214kq9o7o1t5q9eft92nljpqvej9jc264t0xfmwb56h6zc6brcj5nybzb1zngan7dhi1ocl59p4rxroscnff5c8rm2xyjoa3fl4mz4bcncckjsw47lm9lgwh1ahn5rgyqs4oaidwk8g10sv8zz1hugie9jtv6q1magjo91n5uxjrcvdnnc55ot5b445e7ttl15rfvog5c9rk9uowtqdx4pvqpg12az9hqf3nk6ujhgbw3bn50x1mqnw180ow4frlwnje7ouzss50e02qa3axfi7z',
                username: '5x5myvi92i0xwpd026j84d4hdpgp9lrp3utbqjuric3lwfxoim5mqfyur24y',
                remoteHost: '9qrrygzlitjmaxl1o0pnmf0miw4e0mjn9vk1fzh2am4ufaip08wwjlcnd4qlm5iv7r1h33us539p61zuz8b0c807mcoa4p4dgo4581chd65pe71fc6lf2btsjwiojcjojw4jfso120b9jotrihd7iwh93hbcc6xt',
                remotePort: 8929955067,
                directory: 'n7345vevta0qicxpkarpx863ck1fg4m6kp8v4zoubgmgx8fc8cqgle4y0zmdyuqfevr2ol7qbfhwja9nytgra0xz6lgqnlkqeq60u4hcc3lq205ahbu5pdle36vvzvn202c9oap18v9zoqh7q06z8hp1x0akek8q8tuxi7okkz3n7nouc1vlxgctxu30ksfk7cj6p5j1dvtiktsore0gvqrt1ugu73437uswbkoykbjx3f9293ealvt6makefvhzcpxa1glcsdnj1hc20rpl9h7qm6a877w4fqk79msnprqofcltzhq4ubp43m6szqm8gegxblkciovk7kedw3r3bi4ao5iix5t18timx4frdbtsywo1b0izdrj1xnwdnu5korbkp0edv5w52bqbrcwkpp7nrypnkrrfzehgt9oyoj0v0qzzwc9hfyvm0ezivg6ocm5e0ncvgnrjubl12e34yevzs3ff0heb597w7u8jg1awz4u2kpl0hng2tkniy4jg2oydipq15z3u0627d1a1oiqe9kxlaa4iuu4x0cnxopm3sj0dbjim2qhkjt4ecaxzizajkfe67c9konksl8ckhtnxgojqj0y6oxrt1t1xqdf3bzoudzo3c3ignn8ald6tfwnd1qs9rkd5o2w6g321blimj95e0i12vmewt9jxat0sfjsoqvaaee9pe2vh2ub6d9z3apdbaulj13fq1u4u00y69qp2jijtfvuwmfslt4qmbh6zlpb42jbn15jl7xh1zfmg065v5vjkvknzbvdhscjlfbbc9slkt7wynxvguaxn1mmatqzosbfabqlcnbzknn175bm2wy5b8pmg68xolv4n516p3m6rivf0vy3609d5d3so7062n5jt3g6ozbfejatsu1sl5qd6gp7h0vsyktjscerse9wyg4601ai69928qvx5n5gvcyg0rndfprs7o14hlfcymv4ul30q4ung5qr0cxfqn3n8gzfrns86azdvebi5ppmz8awm0po2skjg',
                fileSchema: 'jr2ryhwwasdojsyuuwfmfg2afk8yu4sb6iqosccxqnxajnk3coe6xbrio9d7kea4wamsbjvozzu5hr9ov0og5odrtp4pw8yodv6cjdl9kjughp3d3g1zajsenlgve3rt3jw5ptr5xl5asj1cgtl0f36ykpx5be3es0gp3affrk40x9ldmltaohfbp1i6ucuuthdcq5hqsjj0jcuhysu1jg81zuqcpvhc7ail54j0pfgqblp5sb8ro8vav576t865di7hsjkab25o6oaf4zlluttzv7yncafg4pfah9dppvbbrodhvfxwh9171gacpewyrwys27zaxmykcd9accw2h991tmlaq5upfoj1zwh3zek7ecni2c785q8ygum7cjtx1xrxabrykplj6kdvi23i03wkjn8ewfaa1fwh93dmdd5so9ifnypzrq0ik00oatahdzukc1kdu85afkhb5ly3gs92c8w4wr2pq6ms260ticompgjtpvqeuw2hnbcpukuk3l0pu5ysjcrlboela00u2kkpksiu0osmizuuq8n2zae66ghgr0pj92886dwrkmp0162zd53cxq2hwf7gdleq4di2q5ur83vdhi2v406dn104uq8oe93arz77bw8kvplwaqucs56pib8c3va05mwxkhkkfytq7uva9qtj31kazoh2esojekzikamdl1jvia6736rkf20kjvlcmfdopzhk5mpbp6weh4b5jca25mrpqwcf56m1z23bhjby9xhe726mlu2j780lywteo3s0fhbl7ej2163eg7zo8zmccetwjprxwtemeqcxhkzzfe6fj2n353zycc7wv3jbmoznrjilxeje5qzbpdhrpi8jz0r5i89jkw2ysdw3p7o42gav5o9uymbuiiwnx2sfwopkgq9buihfdbj6nva5vq8wiiwnvf6vlevgosj29r5iouwuj0bj9hyhjpgfnzeog629wbbxdg5ck47anqsibtabr7g3gv9qymvrs3ybe3bx0bgo0po5',
                proxyHost: 'u4gxh9zyflf6jrixumopstume0rg4eqkepd0rskbvr2cbjlggtdlbfpyd6py',
                proxyPort: 8363126833,
                destination: 'z0p5fwzngu8vqbldzjojprmxa4drotww5wpfmunyfkfagx05jbyj1kdruooi0l0rji0kl5teoenebpum4c5mb8uwduvy6fjw2f952kynp75ev18ffwed554za7rv7gahpvci5gbb7jl67nqxf86pfhj31wesba5r',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '31k2ih6ixylvu41drh1z1v0o98fm3k7absmh4x0ao14tvexdf49im95arsatjr85l54gh6zi7o3ofih80cl8sgysdqn5zfnxppg7traq32azk0loczzx6uflixb53ivn3dsa1o0xnxf1xsqa7pdcm4xizljjmfsh',
                responsibleUserAccountName: 'fzdks9qfbsn4uqzem3z4',
                lastChangeUserAccount: 'lsax8ihpkqc1ooij93tu',
                lastChangedAt: '2020-07-29 13:15:14',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/channels/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels/paginate')
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

    test(`/REST:GET bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel')
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

    test(`/REST:GET bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '9f5e68fb-933a-4154-9173-ab92121320df'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9f5e68fb-933a-4154-9173-ab92121320df'));
    });

    test(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/9f5e68fb-933a-4154-9173-ab92121320df')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9f5e68fb-933a-4154-9173-ab92121320df'));
    });

    test(`/REST:GET bplus-it-sappi/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e793f635-685b-4237-b1bd-b6f22a01e5d5',
                hash: 'yaslmfxr7dzhk0n0jjk4m9mezzjrx3yvv3rhrm2a',
                tenantId: 'df79e602-bb21-4a32-8a61-52741caea6ac',
                tenantCode: 'exx2ch1nhz0fudpeev5zxr20be1kl7tlet2drml7ho7eafb2ql',
                systemId: '51fe2bb5-89c0-4239-9aee-d0e5342e111d',
                systemName: '3zru1b47lzcco88axbmw',
                party: 'wot6b5lxos9tr0bn2kajygx2gsmnrkrv276t4oemmjytcyhufwjt2joz92t9fmgh0oxletind5dix753l3tabpgaacwr02hroh6nykw65ngd2bs7l7pzdy6rna04b5z89os5jbp5874hvo8qatkojnfc9edbsxx9',
                component: '63glge00ry76j4v99vemsfqc4xi2rvym61fu2og9nq2gpv4bzpi0sl5vj0dlrk47zxgircbi7atcuio9gekm47im1r3w5lbevoqeko9g0zxrbzbi05y4waztacoj33yk77bu0hg2yqx8rwn7f19o7png1o4ae4ph',
                name: 'kvghivx2weox99fc6quz7aqxlakfxtv7phmsv2kk3eqxfqjhpyu183vdxvj78eg0x2i2n4empr8d9csk8o64og6w5cvu878bes4p9b2197dd48l57xdv97kvc9h35hip9zqnaf0m9pw1uzck22u9iixembi0xlxw',
                flowId: '41bb41d0-c77e-4e86-b6b0-f280d9611f7a',
                flowParty: 'h3fizfdfwigz5u99b1to09y7r4nqtttd9rsjg3u2bgz5ohea7ihh0yybclkfod71080edkzk2qzhc6ai68yn72qh6of1ejxxf4c35pm1nznbfzbl2cz0bfpf0xpy22drm9loi7xnjqqzwa0f76jaontggit4tfda',
                flowComponent: '663cyu7fuv37vwsswdrz9vwfaa8az0y5y9c865mdrijis6j4ceqb125axa7ae2yb66vvnrtuyhxuqdyc9m61i3wp34w6ltz8u565ya4t1ml41a8pc9my5oq18kf1l67p4kxgfhchd5kaqxnq9vm6a3xkmgv1p2lh',
                flowInterfaceName: '5yzfe0ru9nycu6vhg2ckhbvq4bqqv4p26k060xq4tke3a6t8lll0s2171bnr1s1yn9ojwnmut6vabxfcg6tcb8kbubiua4c65thx1yhg5etlor30dvyezf0t1tug52emk3hn9ltnn42fdmkd65ckqopdt660xhtq',
                flowInterfaceNamespace: 'cuumw1mn0w2qznqlcekdyiutohz7saoyr4tqo3rgyqq0rds0jr5vmvfjbv15a10n5v7ghw0nqhnaysxrl9oru8wqos5sbkhg9okiurr7ibtw8cjjtljc2hydgzwu30csgeztdrshq9d8b8yhzjy4fu53pfq3mmtr',
                version: '910gepqypmyu4x6t9slf',
                adapterType: '7euk2bsyyzfd215y40ojk7cszj84s2zs5td7g2lvqlld246u2qpyyafewf3k',
                direction: 'RECEIVER',
                transportProtocol: 'p8pzxas8kj6eg01rp4j1glehxkynwkdufls78wcoj6f77smqfwz5klqxb0q4',
                messageProtocol: 'lytxelvud7kgg1yy6lgqufouv79g7l42giurebdosju4i9zdpprkdmaxryxi',
                adapterEngineName: '1nranln1pjhwv5b2iangcjo2wpr2xnbnpzji4cis2erh9hak2j53zcxob2qvgmpiung2kgt8neqeev780mb8t6yv1nr78ptlgqsj9wrkejmymlyblbznznoil4b99k1enhl105ekqodebcevpj1eknw7yslhnvpq',
                url: 'd7lfi301ogq9zp6a785r9wdwkj1cc5btfpun5tendd7q9kmkntwwt3gzl9p5hlv2aksjn57aabku9mxfrb01femuqzy494wnpxjb10id795gvqr8fkss8ydyxji4ent7pegmu0yk3e9u25tc0wwhwkz36sibipas9yrj254q01t4duadnczgs39topuqp5ybodbavjesbflqd2bpe4tyimwbumi1t1fxl8pu312tn1mokpldf8hjuautxkd80zz9gyzuasz0400898mt1wh1k75cg5c9jc263bl5n7hycnjjn727hkxm3xr89pjpgziw',
                username: '1ndzqfvc1801sxa1j2l2yktvk0emq65mjnrcszpvflzfc3vbay7q24ydcadi',
                remoteHost: 'ai7of1eoyn0yucxl64dmpoelnvnrayfmv88jmr0d18w4uy0nsn4cjvoplt7m3uwppga7xnhm4wvfahmozg14e0jwv76krzbbmfjaew9wcithegs85phfuu8egh8fvnhj5e8w1v0n241y41ll7hy7qjm55sjvnc1q',
                remotePort: 7307241136,
                directory: 'ozc4peie07h63ci3ehkmwjxyg3i3m6ad1tb2lwwspapam4dzvljw8urxulcmx8ojdx3ut3la30gowfg8oh11fj5dj8owt6ajja5oetg3x152owg2ssz0a567c25goaubnds4gaknwfghpe9j4eyfkiin77f78qflizzqodtn1od5g8t4nrjhk05an78t510whm1l8goxbhl9aeuy8dfjuj7redrbv05xwo6qb278f3rpjog5z64pnuf3p9u7frstj06pd780c71uqos19pt6c3fc63fw4fvaqzwyvkcvejsny10ujcpvcb7s3cmm6snmyne94e4kxz416qw3r822e3gasqm9gqk8zgk7zax8qeo8j4ra3x6kj7r1jaes1k9n2mw6ttg62i7or03720v2o2vz5iykmy5nxjxy1f64a2ddu90afdcineeickn8aw2p23e0kp9euorc5lv7sjatwrgdtfl5o3n2v934ti0dxd7pusbklc5qe607pmgssfb8lqiqnscot00m2mo0jvlblyugj33t9mfz1dpier82s2iyulecdv6j6uvdrqhxb91b54eqvk9m6ull0anvhg4ruj6ta1wgm7ujuc8tmqy72bn6tmkypifp6455067sryiiqarz4fqrs1xn7cycuwb6h7qvmrblkzjsj2nxoazxbrz1vouyqnm6br8vdmgylwxto3jv74g4onk92pqyi77ur7ifhmakz16tv0ovdahlbchk5hyp9ly5xfpphy5k9usr5w39cinnwkvk5bckfwwqb6sw50z2zw08823wye92vm6j731s4qe1wbuh4ehkfjt3mzmrq408kwrvrp27l0z6hsvpqp1wwnl14u90ew0z2g0nq54ppfy8n5m7f2v85xh9mbumd7vo4z6qbsb4dmrv03v4il0sqy3p4mq2wetuifvsmjc87qujfd7qveb5ayrm2s9gcbepddu760741jkhn1fg9p3tl7pzsuw80r2ak0c8zx903bosd239uo137bvi',
                fileSchema: 'xar47tf32l79sms48uy7e3qwm1u6ccqm6m1dt1i2s59h7c9j19dv1atfc3xldwoiioaupusshd4fcneid9ehgb7qlkdy26k4fnvbxtuimea264lf3niqasgs7z7kwg1c6ne8dxjec0i4trh6brtk19rw1aql5t6z2c51eahx3x4nkwkmutu5l9uqm56rili3bfx0tyqi4httpxofenq2p8zaw22bdleia3vrp6zlky7zslqkk8m6u5ce1zc3ophgsbvftybh7eqwehlwma2udaddck90t8pl0v2vprks5d8up83isrh0tv1h2tfj5hry99gy4g4ro0cqqqxnvupigzvtjhtvu17rtgghjsop76l01l0cippey27hz3vshko39svvq7dl4jua28b0gvgeyqdwisz3eu43spblrulshrcyk7axzjih2b68kgqhxs6t0zyfti0a3tosaxrpu8070hylcaea0z1iufth5rtyqt30m9z0bnsgmatc72akdbv48cnd88sqc1eoitpvb1kb47dlyx4yq0rthbo0ojv8skllrnr6lfkx9kxte97qwx9mi94lhshyu40na8oyf2utn7s1ctx8niqwxztw81lif5ozxgoagku99xp7wi76y7hpfisckdo0hursnpakwhib0ytv6mqiv3llx7xqjcbkmkwo7mq4qqa2eexyg31g0kf9elo6wxsf60vnp3t3m3d56kbzwsu7fav9xlvhcbjyiyo9tnfqx2838rmjbsq50fmyp53xswjzdn36ys9cckoi4dqttywhqv5g8i5echjb47rov33mqo5i5fin2x89ktuxiosthhaop79ive13h4gm32we3w9b61vvtduneocj298igj7t4q2b1vdawfxzrstafdfp1bb03h3zzxck5f2bq62g0dd0epk1evewuo8ev1rpacfbr6dovjje5bu8yh0rs8vq39qwt5i7chmo9gcvdkugmj4jdg1uo6nkuk52ganv13sjcwbz01dyggocil68',
                proxyHost: '8frkjd2919pg87inbupkx1pk3vebt3dwuuj0wnh7b7fqzlat7i61lo2c0lld',
                proxyPort: 8528859488,
                destination: 'h12ruzu34udroyiztvvsh217o9a4qzyz38utn48r67umafl3tcus8tcxtni195ia2nikamemgv24o7mucce6nfv9w9r729ynggyhezhnli93rklms2nwi4oerh1vldkbagugp42zpizwhoctc079mesh0zaw69fo',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1mah79sb6svwua30c3m772niirz4dnzfdngemmcblz1a0vt3mau6ddd55gwkxojeno17iwgiqdtgu9oj2x44aq55odooum8alv96k6scygoul6z4pvkq1itgulkm77udc69tuhihacya77fgzh5ingbtzhyi5fkg',
                responsibleUserAccountName: '03wd454osnkgy51b9r2i',
                lastChangeUserAccount: 'bv21xnjd5i9aa0hg6tkv',
                lastChangedAt: '2020-07-29 04:31:54',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '9f5e68fb-933a-4154-9173-ab92121320df',
                hash: '6sxnnnh9wbsl7096g2tdbuiekjjhm66tu3kc8t14',
                tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                tenantCode: 'k4lp2y4pfa79ma8725hde95l4i17nm3nmakh9wp9uf32nxdwu5',
                systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                systemName: 'qlgahclg0lh0zdc8s5z0',
                party: '835ec394yux476w5wwkkfditg4b8vad6op69e9s1xkemkm88bchgithi8198kjrr0kuqfem1k3vo0o6hzkao9szw2sr0597yybu43xsdtike27fjyb0ystl7por7jj0ztgzwxx6mmjw9p8xm272icnbxojjxmim2',
                component: 'u2asbhzf47cznoz3vyrcwz8o6oqllqsamec1k2jti8fnrb7tjy4ihicgb4et9n4eclfq3r3efyjbwjmxk2uwxorshs1jp2rym7ulbyq2eeh8gbjnptsyhn76ahfh42twhpud9ikd1km9bcxvnwcrxk61peuukfsk',
                name: 'enuju2xtvotrwa7r3mt46cyii9qr70w8agklhfdt0n7fvasg7l3m6mtttsaerdd42j9eux0n4qcwmzk2velcrubi1htvqytdzh9ubyz6fcdplqybdeiw3ivjgm4g8zfz1tdcm407zqsizfml7medg31g0zs9tf0p',
                flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                flowParty: 'g6oij6g4m010u4eyy33002hi034cxvn8v7bogk08yo8hgi8apmxm7c0foij8v2evt2opp9wkgusgixiz8c8lr5jawrwox4c0j2neprf1igh1fnhraayuuez72pcorkpy3g5g2nldrhe0n0853x80zxt08mpvqb74',
                flowComponent: 'z5izkw89sh7frhg5u4psfmaec6y32pmv7wkx8zl0maqgzwgurejgn9tbx7oaaulkl6un77w190k4ju4yh96m6u2tv1sxc6pdavtiy6yhg6j1v7djld1mgr1hp0sidgkblb26jm2ytx7m7dvc6wkru0ns4n6h1lqz',
                flowInterfaceName: 'cjmhx0s5jcwhsx93tw7t69xmrmwqgtea321c9q6x05gremunwxt603bg13frw8v0wwn8fq1y53fhc1r9ytuh7pc5y1cwvpyljt6chn3tua4xfht9r3ybxlxleshvn3x9z1cubiumvvpfgiujryamskpsccksh4p3',
                flowInterfaceNamespace: '1azhh8hrh5dkwfiwouk0x42lhn7jgbaz63hyjlri8gizzwhuspv9zzam5obioibfx6u2jt0qv2akrvfd9f7smoubzb027ns0qryvze1z7cuw7vrm5zgzwzmkuio3tr3urvnp16angh81p0t7m8jm1r1imxet6uei',
                version: 'efapd4nm5niqmvyjh4b5',
                adapterType: '8n7dbew76cc9gx3tne44qvy41rtryozl3v8h58lmf19feat1zao2g01cw3lb',
                direction: 'SENDER',
                transportProtocol: 'q2h1eueaaygcp7nwpj9sbclj1wslmsu51zamhtry5jrwj6nvssqji0hy64vw',
                messageProtocol: 'os7yak31soi57585h3d38iw4jjce3sye8tdy4j90aekwgnu3ux7kkli84yzj',
                adapterEngineName: '7ns95v6118056i00qrx26a4w2kg3kwv6gpfd18x9qff4lzy636o90k7pzv67x3efp4500rsjkamjcgndfn761m9bf3dhoduoc2ainb2pv1ty5vs6wtxpzy1el528s3w83by8tqqcbwb9rajnxv2r7t4geeg3cnus',
                url: 'ughhm7c8fqi92l7xbk7uhi4ff384ihsvn6y1pyisu96kwb2tjw2l1qw5wyuqzey51b1gdzjrenngq1t0czpyrm436e3j0pzttv0vmlsjvp1xwxx0xr4est2nuw0lwg78h68plti987vsvkj2zrinc4547xrp186gi4wab67tpncycton8gi51kkibi4q5p8yil0amcjgfjh45ealei1cwn6sem6kjxnqjg7k7n031ainied5k3ot3uhemb6zi0gr956sy8er1oq4jeh9ef8atrbzqbnee90639phim4bgf5r5bwq4bk1nc60fc42uijz',
                username: 'iyr51e9cj9bbpsv5up8vk23475qmojsu5v15jcmur5ed6ot5vawn243uo147',
                remoteHost: 'moqombowx7adl8a7kp14j4usbcw6d5hm4balyrs1nzy2n4ctklqqcwtpok88didpqnog53kvmvyfj9tnbbfsfoei6m1vasshb3uq3ff1ufnm08lhfxsn2m5f1b4474msvqi6se3d5zpg2qebnohn559jpqmbjm3p',
                remotePort: 1114596533,
                directory: 'dycqu43di2h9iq8cex86sedk4oreamfnhl9ec5l6vfbj4c43xfp6m1s9f3e125o3e7pkk84r44kcymab75966lk6ba4y70a7qflb4z6eukptun24zwf3oeb7oqnkkdkbec5st33mw3bf5uiv4358b3vcal0filkfvwuodp12dz47rng34b0q9dyp9dj488m1ytv92er6g96k4nkiuu267funobbpcu1l5mijr6r885z0w8j9lzdkid15rr3uj9h96l3gxb168ugyygt6wcvki5hypllssbik9t5cjsjee4aacfbj271wjyvawcq488of3ikit7uegahlgqwtd1ihhkshnk0fp8g2cu1e6gxkpad58obr4ujhbkofd9g0zaxrkn3rfi8sc581aznqrnfj02o75prjehsce2cy9wt0vqt5ydka3qjrb5nud7lbkixjh0mm63up5galw0mdv93a7wnpzczf0oosingvk9otigs3skhdf6cil7t2kcqrqqtxpvkyngdltl5eq3rfbbusvoka74rm4m40q7uupct6alx8fzttuzj22r4d84q6iiseg0syw6r98dkyeu3m3ufe2p7hn5neg46jw5a2zhenhlth2q6ckb99ln5nzyiuvdi0v6otnx9mc4xphf3d59ll9mwcvpvy95z0zyk8105cwka3w19frixonff2wstmr5kt3434cue7eib3txys73zysy4x2b4riojmt8oc6my4g3y6fqo4ovnx0uhoxgows2tvmjt6o6vs5zjkeud8qvf5awo2elk1epa8mx4o9hl2pl2ytdqblomiqdn5x9l55qfrmd546qr1wu9o29mc4nekuie5hptvdvl9ki46cb6bkseozgs46egr6jyqoneczr5tb2145irzud7dih5oshr0e4vnx0bl6n8toj314unw5qqv78tdhoq24r8htu0afls0ve8729cw3gfc8ovsu4aeg7sgpfdcz340fvlp4bka56dqe7jw6c4rfn8lhvviygtl',
                fileSchema: 'wiwstmik7w283fbslmffy944l8c85y77yhau7osalutaia079wq4y2me91n1j8c66s985ce6ecqiu2fbyb8t29i9v0mpduhb7xtg7425f97i7x16eptogqu13zxx5db096bjp1oc9zhj13mml96jt2hbdk8d670flxbb7av7j803fovnxe81jdzywbv3j3bpffevl3uzbx6z7a3nl8zjnotuo4plc7oseh4anh0f74bjcgyxv3fumxlo7lmagrqqo1eyx3g8t55a14jlnbh4f8kderyru4k2ilj96uutxiwa63nk1qklqe8jf01kzi4432qt8x1o050tzov40zmu2jxldjlnpeluk4lgwvmu7jdqicxkavuwmf1162orhucnw1y2ud8cctp1jdpf4fsip2hvq5hdvzegc4e071y6byrhsanrvbwo8mnodfnrg0rrlpjul659kcv61gq5gq6t680akkznpjaf4i66evam72zfntsn73dvemme620ibqckpb5v1ip3oivx3ps8nyr7hlyrtb2icc05ixmi3sqcxasik35oa39j3cd64uj5z12f6vbdfum0bm82elq8o4u6tfgo5ab7k5isw911pigak6u25d2uow6gzvfsob5enw8ykw13ui0zll49kw8jw6mubeulbch5l7zwhl8m7cmsiq9ka1fewhzqseg27n32n5kvhvlqakc9mxftxyl5vlxn19f90lod9khbu5visc82zgbobu7acbsafnazoio17ecnv1em8hvot9e8vqgb3jbitlf6uambj6v478cel5kbmuzfnfnrp8sulmtptgtg0f475fifjnikuwgtis0dm9gcmgo4r66hrvay7ks22cs6clvhc5exp9di5qxy9xaga01bhnwg5fwt5eu8bhdjawbhkrq1jb49opik8rdki2812nh2vayw36a29xw7mllv4qqmzfl1e34keyst2xxuzacj3ax1yz0imt0w0uji4b5hvnol5r7xcbcya5m1ocpu3kvb',
                proxyHost: 'n3ns3e2verntx8p1pishujg78vh42ygv8g9rptedlbmzajln7ycneevb2108',
                proxyPort: 7146006435,
                destination: 'i6chkc956zbp1crrrxo9xh9yuwlqtjmujuopeflcj6at4tflmk2kr2kzcmuozdgo3x1wigkfwggfyz6ioobh01hwuhot4u4a8ji2vx9h7d1m6v6x1vkxtukw4zsux3m4n53enb0es1ge1pwzou5odhu5fc3d8u0n',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'n8u1c38q39v6nvupqtt2xs75j2poe9rhg37p09p67atr2mxoqiymzw5brpxv41c91rjc0ar5bwpup3fb4v9bm3nlhdf0cyec4o0rappnpqktrjqy3n6jtgitwc20kb7y2amfrbpbelqwfxq3xy5c2wzvojlq1wxj',
                responsibleUserAccountName: 'e8c9sjxa84pzd7ftwqh4',
                lastChangeUserAccount: 'r21cmee8kb836n7ushq5',
                lastChangedAt: '2020-07-28 22:40:57',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9f5e68fb-933a-4154-9173-ab92121320df'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/9f5e68fb-933a-4154-9173-ab92121320df')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateChannel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelInput!)
                    {
                        bplusItSappiCreateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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

    test(`/GraphQL bplusItSappiCreateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelInput!)
                    {
                        bplusItSappiCreateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '1579142e-b110-4cc2-8f9c-b506732b8ab1',
                        hash: 'q1v7smhlysl0cjyraqkhm4nduyamlyagtw525h9j',
                        tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                        tenantCode: '3y2wcfxggvqjhvc97friig6ipuo8e4yo5zp0v2b34c2ee02p4j',
                        systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                        systemName: 'syuz4liif1c71rrkm3kc',
                        party: '8nbl48ioahjgecx17elqy6otn1ji3znli2vs77n8drlzydwnpgq9gr5ug6qvqjwvzw34ijeqk0wi9fkrupy43gbn6n1d2ibgafmltmlhku8erb4ksn1z782usqhrvoi3b47y79knz4pqmbl6gto0a6t041355dno',
                        component: 'fqgr6p3rzirby772xfaxd5fwz2mjbaxwuvptyzu9c8rmaog4vgs151rfp4hxlbc6m1ooeyahntnjnylizwaa4fdkkkbvhegeko74dad3p05c5w6jpocimu3h6g8q4qb06hgfnwww12tiga0q8dwho6874okxsvz8',
                        name: 'cifjk4b2v01mpj2cjgep0dr6h1msqrpu6d1gseol0874zdy6yia3uhlhmmr4ide3ufea9n304tqjfgetvtfckha1i1jujg0k9asaktkcdro3fjtx8xxej0sl9g7jbsow23k8aq3j5qidlcc988oezqpt6r90ob8b',
                        flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                        flowParty: '5vpqi6elrpt06qgjzihkx6ou8uyeh2clss8fazj8w847tkqwasjz4899zngqpxril0ovissctkr23efkdij2iy4pzz3leexm73vh60fgr7ts8fy123jqsw06aovvrmf99mk3redtkheljadxdeapwvvcnlq9u0d8',
                        flowComponent: 'ky4wjivrx4kltezpdi94vk9xv3haqv46x6n0bqgl7bqap8367qanbfooa1s90woyq211qgu12o5gwk9nzdxczozvi7cj2zqkf8ocwcohyqemfeqcyopedx4eml88ql0sgp2mjvgqw0axnjpz8uz396be6t4sidu1',
                        flowInterfaceName: 'd5qma2ivj7qlgbufp5k4lfje66y1u1e28g6zpdz04ia8mvyxq0r13vkffcfo61rzy0y53t8mxr2672xj6qqn09gba783fgzv1apawr85awfwhu25r4ybubc4gglke5q7epolorwrp4mbzatehshus6m3g1duvtm3',
                        flowInterfaceNamespace: 'qa5s93ovlfn3rkowvc7nglxb55a1dftvtcmllz3zu01jxio3u0uw4hlmnnhlf0yo54x48x2b7fg587c0kqiumslu3wp5pabxiuij8559alrutgk799z5axaiv2qdp55u37xa227m8p2c58297hdiqukqwyrov8im',
                        version: 'rbbxfyruug1xge6p5lfy',
                        adapterType: '5mktf76f5v4bhm824haan4c87h41taxtnnns60xnkv6miy8vypxie1u7crl4',
                        direction: 'RECEIVER',
                        transportProtocol: 'tbx73sv3nipj7eg4nc7xmu9g3rxo69k2n3ssxqs9z98wfeeuwjler7e6cmwl',
                        messageProtocol: 'z18o4d6cc2z8jwpy1nhivjxvs3e7cfb9rh9hnqtrj6zjbyr5smxrer6rivxp',
                        adapterEngineName: 'rkdb71hi96v3cxqrsiglis7j5zp25p2i7054b1kxz4zbdx758z7plcgpobako9ag7qrm2o30q81ayj946q45fb0x1w3k0s3zzz71aeamx0wryb2ryb6qcissl1lok40mj89fnpq7rbh4f83ht00z38ckgkg6e5px',
                        url: '3vq1y4uyzxkewiryo2om80qri8it0a9if0qz3nzdff8tugs8vwqiq275wg8i27n4kgmp5fm5b6her4xmcci30d11d34mqdwucdv1p7wpton3tymblv0wvol8cq0few9ld9bi0xz29v8j6nq8qsa7gdx3jrq2wvhveoopcxapexwg6kvho1pyskjla7ck7g54s0dszox79s3yvrwny7gnl0v18gjzv7ex6sx4hujb8r3nstydao5adsrk4ruzkneo299s02upnpnb6qqqb5q39iboopzbsgxyl53di46v0iebyshqczk7zl9k2kms1id6',
                        username: 'oqbyi2iw12as8ckgif0gezsmyot2w6ubwpf34lrt75a40o6itwjce6vo82zv',
                        remoteHost: 'ezd90vvs14cb61wcasp6r9sja4xuww2eqwi6iz7om869dcqqpj0cb9an9kr7ajhhcjq8zdq6uduycgdei96ww4npsda7bxzcjc9zigm8t2rh64tuboyyrqvrbcv5ub0wktx13429zn06ab7thrql6qe12elrt1rg',
                        remotePort: 7552007998,
                        directory: '8qaxk66wtefzfhet6jy56eym58x41ay948hhkvy1dmineybroav0j1w7vn7tjb5pagczutuu0xr59zg1lf94lwb3fjdra3p9rlrqhl80slq852jhqmr3pqh966o1qfto8bj4puj5wpbuubvlxvh66qnrc4x1fskymbtoiahdufjvykk5ofx68t6gybguiusg100tlpm6jdg7lkgk07t0kutj4ganjjtyjkc3mharl8tf3oomunh75tazzqr8w6yvifil3alnzigvtizjv6r6pohqbfcrc2f0icks98g7iu9t3vqr8tc0n1o6wsqbpbipp8scax12jwgneb8vbke4l7togx4tgedgjplzuukw2no9ds12d0t2mgt0mf8gk6ddb04fa9b7kbhj48x0g7lk80v6jn0cipfg3x4fjkeg7fq98se8brqoazl8ayyof3mrclf8n4agebc3rv2vdx3bj2410u3vhfmsw7q4z2x9jawb0qa8izf3cl8o92vcl8err4zqn5newb9ln8n4arrfw17dk6ase3f64mj411jo27ttaiv021mha6k1ungkh194e6ejrq20kppqaajw00j4xl4y3kdb5531suxv8ae0t4awhph6rvcbpbcskak1r9vqpwgltn83c56uhm1x9zux3eurlkwrmlqkro5sf5nuoork7kcpm1m927gvftjkqhd5vnx1bo05846oidks7gcdrrc6fmh6zhm751ty0cs8nzb0rotw9ovpayxfo41azaredkb50nfzn9t10iu2a6m2pcvrea0vouyohgqxtwdxxlik4ymrcy15nf3a8d14g0qlrklxkcvca0gcsgx6au1bglstq3rwhr1dh0amp4ofblwnf2xvf4d204d26j8bq5tqcnvldc05kolvufdqeuu90jrfoz7hqpnhsq1z21uxbmfy0nkukzyck6jugj4ii1rusypfidcgybrfvqbc1qqsdh6th5xvaqolpvjtpa15gvf6cktt1a9e2752d21hczv3',
                        fileSchema: 'hwpljjy9assrbq207z1t052umta8m4ox0d96kzg3jdaeo20c33wxywckgqv7m734dk79bv5g8eb1tt2we3kghopldef23ggomf2r8xsh973vnp6njhpsc4xhfcw71d5ypybclqs09enlejz7txl3choowjz5ry9aimyexkur9n8ynrto7n6gaurjdakyk1dxgaiktbdvd5u1lag9jzrskctjzcl1l19tberi5fjx29i9ikskuf50qngjtjwakvjs20ly5s3xasffe61d5b9guv2d1jyc4fh6sjdvgohn4ibvvrhbquk7es7lmzqwceisg11gaybvsxf3z5ef6x9xo3jh7jkt8actflzygj9w2z7h98917bwsqe08olctsusfuu91uwb1kgxv0pngh15jkq4j54d1ge4stlxwtmxze25god3zdy2kcnmipxyj4u9jemhh60gjp8n9s92tknt9jzr8nhtqvqquralg0rack2gwq41akxexysz9yk5glc7txdgt4i6ich7y1ja2ufpyfkflablzcl5g1nll7m7di4nimbsig9na8773wqnsvc3phgn0k9be7rre5mt7dc0f1jhhf969qt5b0yg7adqtqt5jl6hz3hsftjpg098wu39ujsi4v514qedgi1bzg4c7640uxroxsmn5jixue2vw4r89xyb801re4nl5li1zov1gt786mcxinvegf24mq9x8o59dvawj68bm997jhrq5mnex1v8ypi6uevmnntimdloo0h3qotvmutktrzumwwolycv48ksrgb4ioby4rs0fiznheslyamkqefdeq4yctfeufk7v5lf0d3zqaua5n932qwb25hdizn0l459rjbgo1x215hj50of32ml072c8kqlu12tavu3umpsdhtnkga6gmubaqvej7cizz5jbmq4z6lokiitai2g4y6m47d7nth7jkz4qgqygrby6z1qb8vztvzayqhk00275xfgh2r43kv4g1zq59b8jnpor0lw05310',
                        proxyHost: 'ehx0jans10f64283iwt357dcw8930a64lrrp5gghglnq5k5zhyjp31pjb1s5',
                        proxyPort: 5136905051,
                        destination: 'lx211111m3wcyom7hp1qrc942603ofxaik0pvongwvicsw6e67sr5htv5mukg9e2vzr32pne7foloqijesloy6dyitl4jcc8o995yebxzhpnv3tcp6uy29f6gl0f0el3f77p9zabeippkcvpjc6amsyr2lfz0ixw',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'rk7a156sorayi1p7toaby829u8y6kg0bja7z5bw7v9b6t5upv6sfuso0esuv498zrb1w5rn3kkdndxo2f103abncw3rheimo5trtgzhim0kdbdkm8prbfu4ixw7h936inhszjzfv6aom5dojqaq5e8ctkkg9s3fw',
                        responsibleUserAccountName: 'b03obwwf7ub7ji6yv4pf',
                        lastChangeUserAccount: 'eem56j2fo704kg43lrs8',
                        lastChangedAt: '2020-07-29 10:04:51',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', '1579142e-b110-4cc2-8f9c-b506732b8ab1');
            });
    });

    test(`/GraphQL bplusItSappiPaginateChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateChannels (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateChannels.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannels.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannels.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannel (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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

    test(`/GraphQL bplusItSappiFindChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannel (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            value   : '9f5e68fb-933a-4154-9173-ab92121320df'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('9f5e68fb-933a-4154-9173-ab92121320df');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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

    test(`/GraphQL bplusItSappiFindChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9f5e68fb-933a-4154-9173-ab92121320df'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('9f5e68fb-933a-4154-9173-ab92121320df');
            });
    });

    test(`/GraphQL bplusItSappiGetChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetChannels (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetChannels.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelInput!)
                    {
                        bplusItSappiUpdateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '98823cd7-dd06-4902-a6c2-e311f9bc1f31',
                        hash: 'o5odpzcwmj14f1k2fisajqjkc7pelbzdktj3ld25',
                        tenantId: '9ea8c382-8d1e-4094-9a7c-1fdeb01f799a',
                        tenantCode: 'dmq1xr1vnzmlp2hgczrf2gf0rd5qq7v8gvfaqlelohquy2uu0v',
                        systemId: '18868c46-3265-4a96-8099-a5127040e746',
                        systemName: '9zabmmbmekiu168fpqow',
                        party: 'ooao0fs8cts3gaz9hntnb8suqxxwbv4uqrkrgdpe0uaekysdqfxa38aqiwhswzz49nldr256vdsok7ge4h6sjg6nssa9vbqob21uwwd2stem0pf40h5sjx0ke57gfa5m1bq99sd7ks81dh2jzazcvvi4jxub9g89',
                        component: '1kzdpstpj98keqkyizlfkpsraif4haxd525mo3jrswi7v526hc21nc8y1jhmql6cska7z3ngtakxdgb8bu31fl3hfitgjliztam3tgg0s9t23ixy42t8x0i1wwdatn4qdljofxh7f86a0ylt9pv4urh2mbtxjuk2',
                        name: 'cwdp5xdsk59c36sdflltz5xu24r0uno5nczp978274343i20ii1b02b8kvmvird7ph5cfgsm7csk85mpbakrpstcu7lwnzpfvu6cfock2qdmohfcsepahglxz413zglquhc672eboi96zbemo0t427xjt8x5rwjz',
                        flowId: '86cca1d2-1cf7-468b-b354-02b347d8957f',
                        flowParty: 'epgj9at66069z8m19fbw5m9r3849xpnl3mrmkome72huygdr2p4p3or2iov3h1q5xpwt6q7sc4p87ybyske2j9w5zjw4u16obrcgwiq598hyi1vyalap030qbwzm4k7shglt74okdgshjd99tfhrzozvct3m2ucu',
                        flowComponent: 'bll3qj8kiv17fmg0xsccol4i998je3sywml4f9ygz7wzvj6dv5tqp4me2f641l6jxrf01i6j5tx5pfg74d3langbe9rb5ui1j6fzjm493mean8tvdp5zt09rgojamxax3nk9jpubb7j4eo5ukwyccthamqoh4akf',
                        flowInterfaceName: '59nt0awf6e2t0e67rntlecf8hfpa893o61183uemf8ra27x0q8xepd67eyhm7umdpi8ltk4593cjknm71a769k7utrjlec6wlcxu1gx5nr095b3m9p8pn4xjdbmuenyuagv706hbzig76rsynmvfey2zyjkzpkk4',
                        flowInterfaceNamespace: 'r25hcwirc4al46zv7frvz7n99yg6h2sqiguubc4vg0x16icecde0hzap9dom6w31aoalzm1j84hmescvmnybpme93mbqnez4aynol9ejdht66k5ybt3ntuecm0v6dsaxrx520o6ucwhu1r0xgvguxjta3jyaso6w',
                        version: 'xv4n2of1q9f0femn2x83',
                        adapterType: 'bx61wnsfi9b00inro783gmc5ad3ut1xdhq7qr6gzggczmwncnladnn6vvhvs',
                        direction: 'SENDER',
                        transportProtocol: 't8ptoqjxd33k2uxlvua2nzrx1z1lqncwyzpu1cet9nw8ubzn7y2f17xmb9lx',
                        messageProtocol: 'z57dc8h371ke70vusb5cykkqb6rcf8dvsggx9evmisceumc19fj8p99y4bcz',
                        adapterEngineName: 'ep4koj0jopxvrgvkqr6xzjahzd9pn1wj6s9jdeglxkv9b80gv7x1b1u5agjzjozmkw98ecewh5pzhij8ivjqvtmkuz5cu000oe0d38tkx7s2ghgvur60xdt2ivqcqbqb39f50zdkzysftrfivfeycjj2xl71ci9x',
                        url: '5amf0wt8ruuqehrno1x763ipo4ihz60beb49ha7z3z5w2w5a5m5uh91o9822rqmzfw7g3e6co7se7q9qt1fl0jhqb8t3aovk2w4kifslavu5tngn0qjd0rn20o5h19pnrezkugytmc8mw6vmrqyh2ympdc0mhkpo957f7wxvt7p4b3wykbxjt9yjrv31chqgnkxbmdxp53cttpvg4ipfaxkblp0t0zjutlx85vyll21pc1uqxjhads3fakg2midryhj81yj0zvp5ijnjq06kwii6ac691qlrs814dmpzfs168d9b1zn00zauq10n2usm',
                        username: '21zlx7tdgtgr6f8ox6m3vleozqs3t787ryklj7xpmi0ugolkastkxrhqvea6',
                        remoteHost: 'ak1szu5hkes38vpjyop5xkc3y55wtdkd8djxo0qevktj13pz9oyf11jlmvya1l9pkg0hcgap0t0c3i2tjsc0rv94lcilihcrhavn371jx9jpr1sudbw68j7jj077vdu3ik3dtifd6a6exv9q9wxngifanzlsao2o',
                        remotePort: 3446009886,
                        directory: '7wdclw0l8kbyqbexgbg9kk4pctzz8b4t44d1fybos1ihh18x8lmztyu939gn2tefenmiajcgabx8rcr4epru453b3ntygithe10kqcf7vkt264hrg6md7pw42tt7aibyuig8mo0mpsrw7tu1dsp8m6wkg7xjre165n09mtp7vs4lw9rnm31zumjv080x3d8lp5aj78p5fyvqabm8rmgyihqmam7xnqnw0caty3bbrcyo9x90v02hl3kyhc3mja4a39jzhy2bwr1gqyoomt14a1fzfqowwpo6z82lt51ky9wwuxk87b3odnb75hvfv7eksz89nnwr1z0tprk0bzk6d0fqzhpcogz6jz6maqg7ad3of00m71m96ypparuu141lxecft4wljiuylctlv53uqihfy4gltynm6pk4bg0f4fwylc91n2a1c58wvm4hh7lubahpt1h6bfr0i7e3wnafo6sxoio0jan77orkooqs7azltdg2db45enmkme2xzjtf4w6qw57nfvru5c8ww3n4yiu19hf41evc4699jym2r1ax9bzqzc9fkzvwg52q4m1h8p76r2wt23r2vb3wp5pwfxhlzrk1xno86wulbm44uprjxb7rqlx9cm4mnobie29vraw39ba5zbidvu6nxfpbuikbvhx8lkz10wip4do5mgikwzqf9f4ma73mpwjmu9ipbjs1pelzg86295txmb4di6ccez00bfg4x0v4rrgda0sjpakq1fpyseztub485un3ljldmhqoybo9msbxebhyb4xg52mev2v30agxk47ni7gk8d146ey8mvifuyrdkbyw22070qh2myl4axyneukakdebjy5o1vdatm3ekzv6fz7ya2c65lmmwo46r70rwcvmqdppxf6tkq75f0i9rdp2xlzxyqr20n27x3ma3qfisznmvvl1le2insz8cr7udnqvyzgbhlhht12afxq5zx7zid0wh8qxe0e9fresx6ah80w4q7orjyh0upfbps8een4z',
                        fileSchema: '75z1zgh669fzvjw5q0s4o93d0wwburkfl8l1e08wsfr6iut3kwpa6p7v9dsfa9zsu4ft6q29imwsndxrpxeo87pu4bcy5xuktiv3rp3x2c3w7clkpw6t48j0injlv9iu2q13i7rgtsw4h297j6n720rr3jvih37otr4krxti69s9eyhgqm8eg65vbj61yvtyo63xdzlm8wbrt2t57fxpjeijjkrlmgfkcfdkd3ckv7xh9i581t9f03mstznrnj35aazavfd59d3w9xezo04gyotdcm1gqgm7q7v5lkhygajmdcz3jepjt39vkfokzz3w0v9j50d4lu8zathvo3fx58q3ar1a4nd2y2feqygcg18rja6007r2q479xu0esw5e7sq5n83c034tye48zqyjyqdw1sxdbl6xyax8r05yhhtryazjad2w6r7vfxqhcqy9zirpxop0xb0pebyz2f2ln62lqnddejwovrepqeppt0teoxzy3phg9761sy98ak4ihmqlha6d1nr8q1cayfkbiunxgir8j5p94eua9dk1kdxyeejnlurz8rzv48zawebkyds00f2a896ympze4wgm67eyr1gy42gtq90shhhldc03rizmzizzilsakwrapcim8428wtv8hzopg3u2zz4fzj6fy6xl48a1bol9l0c45hhp3wyn2p4cvgdub8hyjqi2yzn218f7qglomm6oeursk9hklej9z4bwbshz80qzwirec4ca2sdrbyki80y2lr3m02ohtxilik3x4kguuzpri98rdhbl4r5jk4brne23mdrps5ox0ecfec05sf9gx54lq9tbk5n3fnvwytcx6qrihzs85rifwqyop3ntfu19v8f0749wmm27vyf4o93t22grsks6p0t7htygf7ef2ksa97msmr6fzo2mpps6qir7zdqjqcv0uyoffvkjrvftbco0137zq0jq5j8avoizb3myik4wkxoxplkp21k1zw4ovkkpsahmtujy7fkvndkazq9i',
                        proxyHost: '9a85nbolx9ksmvs48z7d0aj6unzsfvz56y8lohb9oaxbfg12dprdmrycgh0w',
                        proxyPort: 1924285365,
                        destination: 'lz2l0yradsdskhi1i2s9a3bf83korbobeesm86jnn7eksip812wsgk0i750tgodkdzwsz0dasd8tprnxo61jf8xbd9myqo7cf772v5d5hfyx00h96lpbqczaj375kidssys2wrgnb6cdk289rs7m0fa45jp444d4',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'fewt720f8yratl2yzy15x4b3k588mxnm8p0278t357inv54dve2buq1dpwz29nbwvzquxe601vy9eqvdgw755thkssh0bfrswmaekc1vhvy0z3qjmklp18rpatyepux23376w7n9ckeyrnx2thdo7jx5azzk0f02',
                        responsibleUserAccountName: 'g5fq5d74h19ch4rxayy9',
                        lastChangeUserAccount: '9kzente9morayhjute1w',
                        lastChangedAt: '2020-07-28 17:22:26',
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

    test(`/GraphQL bplusItSappiUpdateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelInput!)
                    {
                        bplusItSappiUpdateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '9f5e68fb-933a-4154-9173-ab92121320df',
                        hash: '32c5lucuzi4ymwy0kq5whfoaj4569cu8pmcn3hu0',
                        tenantId: 'f15f1df0-54d9-4b60-b607-eca015049cd6',
                        tenantCode: '46iqupdzcqllz8ddod7x5yakkqwo9qpldiioygffzebyg224c3',
                        systemId: '2fab7672-6276-4b3f-ad9e-15af490846e8',
                        systemName: 'whxocm8heojzoivn67uf',
                        party: 'goog5pftkjnpt0314v2ho9jwmrdbdthbeea3rm1uvzpt7xaw72khp4ce5deqmto4lumuvfgzf6fcv684byvungqfdtqy197dxgf52w9uumvv366ncjw1j4bgu78f9x1jjls0yiw16shxiahv24yixygk6c3ojo8o',
                        component: 'limh8wfp152ujj788j86utrpcm54kwtpvrzx7kzmd8nm744dddwpxth36z67az023009mnjrriftzawwdz4k5z7qbj5jh7864n09d4c5fk70hh63u86lar0ejuam54gnodlzy2sksg853eqmfls9nn26210pn0ws',
                        name: '9xmhugtmuvn1xxkzaqc6ztly7ngs54e5fmy49a7adtsuioydfq2nb6l3mc76jr4l7pnjk04prfwro6i1lgv7cbp9n19zuvlx7cf38hqwxg0s8q0pn2mcuh1d3ctxzb77c2mcbz8fujnpxyhfgqwf62khbd8vt2do',
                        flowId: '1fe511c1-b25c-4937-97fe-e56d441688de',
                        flowParty: 'ktbib3jfpn6nq7mhw9qaaeqan2090541xp21o84hecv7m25tb2o7g28r85m0133me2oyklqm3we4zral8rf9c22ztsbl9flufjcyssfkjr51i3u1uiyi79zlusuqg7gstuuw3ia2ujixs99yz7th102uafd6ze3c',
                        flowComponent: '7ssdo743xi3cr4aic8cnm5648qer734966caqvi0jrfq8kqluibcnul6lw76boep52x7vnpghueowl4yftako29ebeswwv8afe4bea8pfmyvrm2gxix7v6cc8jgq5jvsbvtmel4vzjstawr88al7o6rasuae0yod',
                        flowInterfaceName: '0isi4yj3seuwabb65ievsj7u3pdhm8qify2o0kmrksqguqal0a25gorefroi4ml6x5zsial5brngnpty7k0oud7wq7gpjp6aj4h2zf7oyxotmj47njjipwdj5a8s2d3aazrtk1yw6he9t90huh2z0s0qrer337b9',
                        flowInterfaceNamespace: '6p5afxs8dksqostcnvzgi6f1ibn2gl8qsmofc8gkys5ypd230ghhh9klm48kepitmnart83ww071lhepeol6udx6vbicy6upcxdxwko2swoj68wxb3zyuhsl9mrsqun9wyo0eywzs02xr6wl7exa733l6l01pv4f',
                        version: 'qv261p0zxjn6dt3wjfwl',
                        adapterType: 'ygjlyv33ze13245frsubdxq76wtg69e09qqhfrmeqk8nfte7zx8znnkbiprf',
                        direction: 'RECEIVER',
                        transportProtocol: '7zen9e2afdx0v5i0e0yxf3s7ml7u6534chpnk7jac7tm4nghe3l929b97qx5',
                        messageProtocol: 'd3vfiew09oix8x6025l8kfoyf9gxqa2cvrsltuvs58jiuh2a6l9a0fz36ow3',
                        adapterEngineName: 'e0ljjg4jvgjxz6erijfh31vgic62l15qrn1t9fzbafpx8d62r2rn2091l2a5yam6ker1x0rg3gdahdij5divxd1mpjg9y5q1ez62trulb6t9u59g1xnqtptvpjop0f5lnz18wy4ruqn1mmp3mhr58jbr09hlsonb',
                        url: 'xg0c7pr1d1l5mzfrr5y66jbbad44aga80ug8sbytsfyn2fn9m7kqjlvu44j70qm1t7t74n364tjvskmlc97jov70xaf8euar3pd98dcwn7eemgevyjcyawqm3mfssnuqnqi0989ovl326mgzkybdj7xtnrq740qdjdo97dfx74tpr4eukkkpm3mk0e7yo3c59qlauwyrauoa6l3j57vet2pfx1xbspj8mmi9le8e4oddaa6u2rxnf1de72x3n4tecr070r7814ze3q9wibe0grgi9hrc6t324j5i1wbhyyeyl4p6yvpjbywtmfkgvadh',
                        username: 'x5ubz67w3g24xvmh0sebm5g10wi68gpxym4fi0159pg4xvzvl4epezfxavhz',
                        remoteHost: 'f5m72q3hnxhws9hy4cs0ibogy480zrjlomx98gjurvnh31nbnadwu2n9v4str0qygzo541rwu7o55e1zqlm0xg284p2slgcie92h5lvlcs0ojm2ms9gfj21t0mzaxg8xa26drfd5zidne0d5to6uqe9lc7jrwmfj',
                        remotePort: 7773606432,
                        directory: 'hm7v2vcq500nheswagki1s3gtq7scksb6zywa09vfbd7241wklinalhf9krf0iv91f9rb3ure6h9wdve54n8lvpae4rad8fh9c78hf3kqzys9exb2cf6w7ujmvd7u0gnvjjfipm5m89mpmd0i5npb64lrx8a7cskil6m7wkmsbtyk03omcxk33gujqtsklbmpvzvsiae37uycrh8bjh603nemew09c31qawmd00zk9uc0tnbmaoebvsffbpkiloxhqiz72gao6e1063srifpopowkwnfrbn8ynppi3j8pl0cmi5qt8zo9ycmo9x3dg8flmidi9cs8fss8yw4w5qw2aymf0e0qw2orn58jcplfepetuy7go5bswv5mkww4ifrl5hhe3c8fpt8p6cw33db35lgg0ustesfk0onk6nux1tn3ep5tqdjv0wbb6jq9x3gaje7iz3z950cnovo56nivhhuav7u1zberzx9m1fipcbv5t9gjxs4k6h9955adezauypqfh4jkxof8dyqa0yxtatybsrbyih12a3ace8y11zakaepi8dz47ccfymcigckk51so8k76drbedcpqdr08nu8fxdd5vybui05qf4xnt43lu3pewt3xwbupl4grsn6odyo2j2uqo71vg11bs3xvinhmsfwaonkosuxq94pojhi1v5yd7pbmh02z1zyc6yamacs15dtp9l1pcuv8ztrmip6e1t0yu953ed314ocx2xp1h3hn1kvqo0xu6za2q1tikzt5m5mgq9xlh7mfw6ibtz9258fmof44ee5wjvrykw4eceswjvxk8dsrvychcxguoy264xppyo2unlq71zowg8j7ifpq4gp8ufnfpbzqmeskzavj14x0jz4vcv5fjnv5eaj2a8qrp937xeu8ob232zfd5cdpo50h5x2ppy90kk5i1bh9igszowf8ejt3iu8wteuhzd3u76f14dkvcbgyjmqer8w9e9knfqky78no3fbndef2rggap4y94oddfgq',
                        fileSchema: '4ti2f0js8mgyi4g4b2mhhxmhjjj10wemd4gayx9pblnk7a7frd717piyoe16n7wg2azd0hx354emhqlac3ckjpptfr7z5dt8v7rqitiasrr6ec8pim7toa4l6la1ri1dxibygl81irabiz17gxfexk1gb79wk4768tcv8609sadr0fyzyhlybh8lru8wonsljlae145r8jiuqmljf963dxah8hgnuosu2dhg2cgz7j9zr2ynxb7x8h3vtf5b9ub3vhy5okapu6igzf0cxi0ehr8dgeee3qepnill6xyx854tx1b881wvv9v7oist3nfxk0cykz7zv5hrl7wosiv02ex0wfop2jgwkahczapilk2gok18el8qai7jlov1cklwz9ukhnv4damx5qmqzggiqjhcczkt0tc1g9dgsly80bf4v4numwarqw3upnw6r0ta1w0bgfle9gnale3w1c33z3p6jhow2w3zkeuqrzrdmhxvviuzfk348vpb0941k95nst7xldmz6vd2608hau9n774pgsnos8sozfysy6qxoyndjr1sn213nu783hju6eei17diwqfr0jknlg2vb51iodl4vawpv36uoflm3ystedif15chec9b6lvpunt435d33344u29klwxqkb1mtwvod2c9pcqiqf9cvq98tnk68t2ctpe7vsuj1d17jobt21mntk3nyvvwjv8bge6s8ww34cx5mktyf9cfqmt820wyat1sf272kndg449ca2e80hjnbhywh3o1gvbxzso080fpj9o06k6elf4xrdqqf0m5tdmm3g6mzf0qv0n31flw8getd0ik2eo49q0bfj56e71ilu2rv500uejku48evq0869qcz855abjtv9xo9ghv7crduys4vusovmkq778j8hveligdbl6a5cef8yqv7halghxa0ka9hfvjlbydwpsjq9a22puq9vqgred5kwep6b26v1m2i0wisvgi6alj1smzm9tyxvo0n1f1e1wl44evkm0b',
                        proxyHost: '7nabae4w8ujwpfetm5ffannfzwz27vu5z03u3q9xoegn54eevre1d0gqoots',
                        proxyPort: 6444523310,
                        destination: 'akcgco6b4rk6chpwi6bkzyztfbzegcyqxp61r1y5tngur6klsxblyce7xlgwvhfa7y444szlewbuhyykbhl0mimz9f5k2bd2tfxuz78cmuatgpwwav1bfewo13lycrpkmetrvqa8sbiscg8u6rigrjvufp468u9y',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'rw6ynvxlvwolxxk4e146tdqqfghjlrojq2nwfemdyvmy3s7ml2fgij6caxmj6ge5f68xtpfa7bcujtygv6dedpbpkwvzzijlzm1p1c85u80meilyhvxzxfoy7elatmn6z17dxc2fdsqahnuyh6qedeejezgkqm5v',
                        responsibleUserAccountName: '5g0fackhxp15gak6cc6o',
                        lastChangeUserAccount: '5jg7pp2djyp7zl621dbb',
                        lastChangedAt: '2020-07-29 08:01:48',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('9f5e68fb-933a-4154-9173-ab92121320df');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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

    test(`/GraphQL bplusItSappiDeleteChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9f5e68fb-933a-4154-9173-ab92121320df'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('9f5e68fb-933a-4154-9173-ab92121320df');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});