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
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '5u1q8zv4sjtr9kbg6kece6gq3gbbm5j61f33hu11v4giqrypgb',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'o7matpg9d309yfll23hkfo13auyfy57037gq9mh932n3oc9fn2bnv1ybyjpolpr8dxa0iiba5w3hxelixegf88svowuq6yttf1b2tj1a4ig9uphwmym7gx8b7b5jky41o9b22m0zu6y0hzqp5zpch55dn4zi7i4h',
                component: '6obvo10sqi2hq8w60d9u4sa9s03x9k1csiyfii1lijzph8hs63pb29urkpw5alzfug0ectvlte7yxfvfy8u2scz119uc287c64gmx56yofjf0lb5kcvs4ari4lg093wg6ln34jcwazpidm445z0txb3pr5wiwm61',
                name: 'xrsg0g7fvcqm0ommiod25yaf7w3o9a28me3sr8venhk6oabem3m38j2r258mtjfa9mcj591q2sung8jnhma6z0xzifeoxqa91iffa5oixgayagcnuj435j8fj4zuei48qmze57efv1ncmsd7njmuzv7vy7eyobys',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'bgx9sbjs8c3ne2m6ydk11rjduroloa4dzqbs3vten2mtr84ppgryqo857yr7pthjd4piufx1jkvuenftxcak9jrx9txbifcb0q2z2gx6ux4msal1us60ks7qocccji5qcoezyjpa9u8fw6kssps57ge1savr40rj',
                flowComponent: '2awe0maq9x5krno4pm6769d7mjpkdy15v9nwnr3szupflpmzvgo303bcp1hvwtj4k30bwrafp6gpvhj08t8h6btl03yt960b0bc1u3h7fv34wz2bzwuhmv7wdyu83j16dio38wl1u0afbvxmh1d8715gaz1dw3nw',
                flowInterfaceName: '5tdnzd6og7axym36nsmgapu7pz5dh6uud29k6g9wrbn4nze6o8snb8g0jtwxtfum447wmkofc7qjcwxbgwg6v9b5vph6tpudld7f0ywtndaxm1cwyp6lvfr85zyxdp2dshd295n0it845nead6ko7yjht3opfv8v',
                flowInterfaceNamespace: 'alhwldibemvpenmpc7cf1n1z2hlmgflwms5bx5qkx0tynutdvr4jcj59buuajo91loy4cn65id7kyn43wxeyk5y6ps370avc45bcz82ni81dma8ma507s334krxwnpoq70th45bs89d9imwtvq3369ocafen70tg',
                adapterType: 'oovc2komi2xoxwab1j5ajn9f69q99k8rsy4lsbxcr0vgzx7upulueuf6kots',
                direction: 'RECEIVER',
                transportProtocol: 'u36ubnn7mejrfhngivz79dpfykrw896c3dbxi0p3waqltkdvxzjfp6nmdzby',
                messageProtocol: '8g2yxdh5h1nitf0n84i9l0dse888git3u0o20s5w57fwctbsjqjrnoqik66u',
                adapterEngineName: 'c50jcla84xcl4l0h1w0spkoer0s5xpmzg6tvun7z4v3bhfc9e8zz70hkj9ud5phv1a7zd86f29731mem36ykoh6nok46ywj5gewtiwmjrhvy504bjv09ntl0mrmvfnx6ymq148lx3klzc0um68y3c5e12l5xujlm',
                url: 'zbn7v2orm1xnbth3urymya9nikpbwitbdr8nt101v0r2p4fh212vj94qtrgnw2669k2gx2im1d3p35yf3j7fgmw5nqwbgdc9bpruf054x88ilr0yzzgrj8mzvxq4ivwjbrwk2ofnqhtz6l1d77dzj2isyvjjzhwrhekq6fp5kyjgtz42o7vg1oclvt5sd85zimbejq731x1v709hipda56soixj7jp9qlc5o64tatdjmt1yw67ez0rm874dsp9eh3eac9c8zrqiuvll14hpo0wagyy8b4zd6brjodyjcsv67bf0mvus77gqyqbi9k4z3',
                username: '2vsxym9gwortd79uutjp74l56bes559o66mmgb23k5iojxmfbjez0vl08gjb',
                remoteHost: 'bih7f4oqajax5fhd648wfr3qldw33yjawmc72m9prcl3u8fqgi6ibuxnjlvvy19c5u0d9pf2v036qex4kge4z61ywrpnfvgkgsngb0wvbf8j16n3prj5yk0ocukwq4kuboh5n3isalp39s8dgwmler1c38jrtw55',
                remotePort: 7243105944,
                directory: 'w3jkbhbukx6t09vfjjd7k5x8wsu2y0qlfvzngvgt8yfjfkpxg9vc7lm4bfaz8dz1x6491lcidv2jv4094buua5rbytgf00e7orjd1s2ekrptafbcv5mo1b6v5jhdlp4wgdtgkna633ctc4yzcak4ja347smy7ey9y57pdbkzmnid4e4f7mi3kdss1iivsmkdkl4yedd87fwynwrssprzparomntrezm2fd4w03wq8ujcehdvpe435prvatd94z54dp3lsdzrub5c81pus23vlyz5vi2sj1d1whpnnmls6dz28f5bkbbhk19g6jjtvh0x2r6g2ytglfhs0hp9okzpsapr6puh4toat3lowkyasp6uk2l8vxkwbq576k74vby6sd78ol36x7v06incwsgme8wepqnlrcdx2hnyyit19kgnr05hx09urtd5gs40ciak9desrx48waxk0k298pf86w14mtgjf1zwm2e5qfroyqmrgeafn14ioax0moju2r5ucytf1fvrwkc6k3j48kkpdp9rjiyj5f02u3pzpqi2h3ayodrbgffo2tiuccm3j69wovhr27fds4ozhpkmoj5kzo2nb07um06zxws23pek5isrfcpuz5hmzeipsfsjwhyh0umx2s180nbvx6p7fqsja5x1cs3tce6f3emy96499scmavp26sjj9whm8miwe4b8haip2uj9rga7dbrpv1vgt6xqz9arpyjodmdc0cdf8lgh10gtso60syhvndoi9ppkwf6hwb29kab2hagzrk2dvplw9qbiv2h8vegomyt6zoafuynxgro6isczh14x1ai2t2h3ir27j5kbounsgx8tjftan5lth70l0qpmscvq117fp2irnfi6ufaflt45sid13x2na7m0zms2re4wimpsmbwopf2z1u3zm6exi0pyweq8ximv1kzqlo9p0sfjs5v12p0xiq1veesju71npmpvlfittdkavrq7a6vnlp04a0ublozodovdgeyv6pnnlddw',
                fileSchema: 'idmquhgxrz0ngncywlo8o8ykvi2wfngrxv62azlddtqd22md9ijar90rbpzvjxdnzyur7fby3hf58dky6n2gifgmf9r0kwjax3a285um301asn1cjzp5wkomegc859spjnon5wdkhhlikplbw2uf5cbqfaadqur14qklkjnt9vbs9kbdoqxlqpgxp8hgik5fxjk08n2x64pf9y5y6898e0urevo04t4ge0qcbavv9laa16srvd1h4obaymrqdayjugmd88yawneqd76xmbczsf5hlrmfpdq9wtfnbquj0dxub7p0auaro6f5ltsf27sqriewseqc2gpkp7fcfwg1theodnbe3tqj4ftu75bu1mrfuugikh8iifbdlx50im4x821de2i9hq09ipkocmpz1vg7t3tym8z07q986xbade8c8ldx6zotgaqxs22mdcpi3ketdayfcwmxtubhvzh7987xd4z515c68orp2oedbo9f2ushucrk8zq1f8uvc5oczrqaiekjn31hvksepf2oy8na8z1rqaduh7eo7xdjc9f4d9ywq2e86t68nu9cmx6b50om2k2ocs0g792qvwifh8773ma7kihtt1crsoxq63c72z3moivyn98cjgjxrhnv4qnf3490nt3kvd3ibnpa4dmkdk3p7sofj9lejqfebcpuvzifn1csewdohyvizvb1o3atoudoe6azabguebuqpwj7nmw2pmnoxk0w9siey1u152wd09xqziwvj7qy6k4n68v41zflr6oy9qw3g4y0lkv5jmszw9p1awndug240xa45v66kmd908o3j5qrnc5cint1yj10kn9fleb21npib4280vqd4k5d82y563420c2w2gb6v2ckzzv3yjbb0o9hd37xqj1d2rzwc9ybs6mc1qg5wswco0itwzlqikxr7akwl0cf2m2fsuu4p5ix0mbv1cws64hgtcdrjzwd3lvdzk2yod59skyz8i9usqkhra34py6nyzfrw6x06zx4ijfu',
                proxyHost: 'ur1hq0o5ayai7wpvk1bzgi82j2ezbp03bg3losnmsd05yzc9mpihwpu4tj21',
                proxyPort: 1939307995,
                destination: 'lew7k8ccmjwgnusm1xcrcu5nedko4xozgd1zevamjrmplzelcb2qv9ajaa1ptk19bpcnqawj2ejheoorvsc82yqgncruu8630dl8ch3cv9dvybxzra9lfjn18u1edxbwuvv7jwyxgjdhfvyjazwppswdqmyfpy6k',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'onnom7lxm01oq8193ivfcsrzcktomrt9clpa4pt9hjuhxz2se801zxucivgnvsz5lgxc38uraspavlp3lvl4j9a0dil3vyhp5rwm9a9kpq9pl563uc2la9p0ysjqag9em1gozqg0g64vb4acxabyp85gjjj5beqv',
                responsibleUserAccountName: 'pzvombbiwvl2l2j6jx97',
                lastChangeUserAccount: 'rl18px30fdjmmd4ep58i',
                lastChangedAt: '2020-07-23 01:59:09',
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
                
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '9924b82za04pezu4lfjwrhvwiv8dnqoz6a821etvsolfdgsk7b',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'nf7vjvqj595sv84bc8lyl5hn4lb78zlr9s836dkcy0otwkyazmxs1jemoviqyekbu8bb0bvblgx3285ry20qkg38crmma9t7k54maor00hedjnhcvr115bc44iwq8gex1wp3d22ae7hyfp0ldkptwzbl2b1uywhh',
                component: 'avvwuioiukd8qu4pj9py9rnvmpobbm4ytfmm6hrco7kguzfo4urp2las2v4jxc8dd0jhpy5c7twah7zw25jw0y45yqfvy6nk430hbaowho29bxfsasvu31su5uvt7tlzg7xpanv3j9qblk151wmy73x8hv9mr805',
                name: 'e7pmha0ryx85ykvswqy2b8gzskamor5eh4n6lf271p3p7x8m6a7az8hlazp4trtocnzh8buwfffzq340pp5pptsw0khfsn39xw0us0h623qe6816aa8iy9mclwcm8gtgdofrz6pz2zmjzlf5f2hysoft5ltmvk67',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'm8k1o8fnntbfuuyeusr62q49uspzdmr4tgpd2lwwlrotozgtuw611ivprdzgzf9orxd041w1h67rab6ovrgqpktqsxla27bkfa7uz7exxa4i3c18ve7buwxexbsoc67wjmp2c7n6bwndqyolzjdewnixndlb62be',
                flowComponent: '7w7h1jobjaye8en606r9p2e93r9c5g3o77oyc8h2l2cyv84zq8675wbfo0cttqodjz0gfzi0tiiu71sm81a1x6oi4d0b5rybbg4cde4xms0uimmxce27gwcmcb27rkjvmypx05lprllm5rp1turt1accjp08upd9',
                flowInterfaceName: '44e0t7a3txmu24ta4wljstn93nq13vjo3urfytoatqeqzbsztuwcdw42wyc2fjd99w0kzz8tcyhrn4169z911mft8duml5ffyggvtvt45miajis159sm1zjff2ffkwindtqqwnavajhfyufalidii3f5g3mffovd',
                flowInterfaceNamespace: 'hzmvtt13x3q6bx2zluyy0vtvngho4speswy3ygc9zkgogmpovcvj123k3ffh5thlblhwhjxlmph77n92i7vv91yxye7qq1jortxwet6t4gwpvu27f92lq2a4pu6ujhk09m0vbn9tq7w7pf4wqi18jq77tmjyht82',
                adapterType: 'svd6y0ualzozifwm8a8h5udzgstrysnotmurwzmyexvideevp4h3jgl7klmu',
                direction: 'RECEIVER',
                transportProtocol: 'mk09ehgv3f46shj6fmicqsedlv6404ym03qjwqsaaxlilt3kze8ixs972srk',
                messageProtocol: 'y2hriwhcbm0sl7mtu3wfvq408aa88kc7knupkcy7j8jfd55kowkku1q8j5tg',
                adapterEngineName: '54c8kw16bhq6zwo7i602k139d41t5ip8120n5au8db4cu8t7qfd50um9n97lw3a8a119j9i7c97wubtzmxua8ebzterbgw4ktyfnhc7nwk5yx31n8i59j5umm93okci4s0b0rgqw7w2ah4afz8p84v2icrsxier2',
                url: 'x00yabgbl42kbanxdvcze2np51syth9w7tyusut3zosaubvwk8an97hsab3egud86easyu971mbycep0quehz2fivkwcsuavo4ti5m3h9ul4sagmtnuo0rnjfxtb2fhsd5ea20vhp27zmtrgsvv0islnp3je3u03ocmkr2uorykqr6bhykd1gvpn1czyi612hxxu6niq6r02jcjymjf66llxuidnk0fjw3z4wxkh6sw4qxkote8ys5iy2562t0xp8urxbd0thtw96r9f77pj872binchbxhxhgarfzr97vlpfynlirbp15wmyzvk9co0',
                username: 'rj0zlnm03pn9g51bdxsx0hl9nc595kny6yb2cw1u8bh6h8bevygfoe60un0o',
                remoteHost: 'bt3zn2xn6k4vuu0cwcdp7ymwr0a8frnixokpiiwhe7f6j81ixd3ex4p8aiqtc2nxe89s2qmnxrfa4h39706nvbybkyldjhrhrl9fgtc9b95n0y31sz3m8hjkyepvuw5ynd95gay3jj5iubukizvp3y0kpbqo1y0i',
                remotePort: 2846082647,
                directory: 'clcdr36xbmroro952uzikphki9i2e1f9b6jw5bukdk7kw7v6ozbxgvt3zqs1tobhqmq16ox2mva5onkckj0i30x0jsbxq2nfo0asbokv72wbv3wc0gg5h49a5z06ey1aj3lpv40lhv59o7v6ile4f5xoz3f0ri78bt6wclw8iai5efdhmqx0xpoibdwne4wt5np2w50x8rrlqinltv4qtxzzxwyep2y6vvlfc4zw41j76lw96zm6w8bg75cgmqnyy7rxv4fxq5yps4ifove2mhj478t4rtl9kz3ny68qxirp5zcu1i8352nfb4zu65h1dc79lckl1x44195l4941777xz5vkdpw8vxfmffnxycc6sjs9pstunjki8t2nek63haxwgvbyip0m71oqtru8ng9xm0k18qf9as1otf5tdbllnkpim31m7p0hsofwlbnmwmgc9dnvgw97zgi6ll92b237un6wk56kdcabwyjux23kkwaoxko0rco0n139gobb03b4fcova792jhd1q5vm0o6u3cyh6gcsyx6wf8olomsr0fle1suzvb8avn4bziiwszfywgq07lb5g0sfahax0r1r1wtjbihna9l7v0osw1nhsl2st550oh7fdcjbj64sq1s2tskpegzx55sxof27n0jazeee91iq7fuxc0feuz2o02kiuee0curdhy1g2zt11zvs9ajlenfg3mc9purbsvow1hdnc82y92quatnbwk9avlpaqnqdv8t06je76i287foebuysnut3snleu7pdh2r78z8pb5gda3nasjyabzi91syt579gmdn28oilb9posmnc1a5jlfcbv1l5wvqxka61ih455yv4g1d8bhjy38qdsasifjqt6022x8544nu3vm4q6gkpsq8zgqy9lbv13gwdc0qied78g8wpyhgzr4kzujoco2jhtoxkdzbkt7r6omt81u85p558o7o03te9gl8zk1uf5cl7l9wekwvevbrtskwb18gnsac0ngdyh9sd',
                fileSchema: 'wfp3z8uavjwhf653qop528v7knf93frf8wx42rtxfqbropvjs2f77foxr7v04fu6ae5fngi6lq9zgm10y657x994gipt512q93g8qqmtd4xsysdfvjtgsdy00qyw5y0e3ql12yvj2qd2g2tzrxu7khrhg7nwksg6ewslx18o2jnb2sp7t2qcox57ckb1nzr290zmgfongl0r1x0oygz2h71je9dag6ptqnvts4sgjv2c9k3n1m6z370ckw7aw2vwb0s05sspxwl2zs15crowfld33qz80oupiulk0grt9ma5y8vu3281qht71ex2gmql6ai60qhquqf4tnbba6z08yxd9xkutqzfxvusnylzmsleam409q8fz513moy3x55xrape5y9r9wn4m96c5erfl43qkrl3b18f1tqe0zuz2mp3jjc5ycb3fyppx9pdu1b29ukqb926bcsvss3sdph39fgvtb4oxhk461wee3dudugpm6j8ziero2a4l95511kyonl0c1h71rq5tis7vu7rnds3bna4yejk4e5rzwam7yeooke8pz7j8bwjzdg609q49re6hntns5v3uvpgno13mx0nhm8mbdozq0nlnb6spo5hqu1nnkcp8743aynpk8joy3596uksmckzhzi6dcvvdqa70t7huvzvdac0avfp5fc0i7pjolcry4mm12h6o0hgxthyo152qpw1gwju803hepeb1i75e7c7f73ed5xooa7am5atmx75gpa280pk2bmpdxqammg549276ayx3iw1k6nzd8nk076ts846swvzis4p983ci09yner9wpj677r8ax7ckzt8ectna6fnm7oe0rw45wsotthx37of2o1e7gdjjhn8r2lsjah5hm3hrmmd93t2pik33vzpjyqa75lqlq6u8ioxn0br0n21l2t5sft6cep8ugajdh4v2m4vv3a94u3hmflra6frtloax8o5lj55d4mwrcx9jon589ohvg6qlhrax2p8281do7r4lw8i',
                proxyHost: 'shrnc2kpc15s8ibi3qt376wbkwfne9n9sceh040r9yazaz4dqnams2v9prg9',
                proxyPort: 5221150453,
                destination: 'aptffs8xd3fcayd9o9svz0hmk4j3rc8hvc4ykwigv06ob0f37mq5uv6xy4wzo26aoadxcy1z44pywyzhemvwtu6x12o1tpmijonelddodeov784qmqhlmixfyeldv8gsy39pfd70r798dop2xycjhwk6155f2fov',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '26hoipsfpijoy9ip8673bq95g162izanp5lqw745ng63xbp4k81knjxrwysw4688xv9sbqts38jv9hu7simpci2wbg5ybsudq6thflyetmwjo4drerx9zqyr40l6g8igrhp6d7der8t8wr9rlb861fi5bhtjoa4b',
                responsibleUserAccountName: 'kd156crini0dbb4wslx3',
                lastChangeUserAccount: 'ds6kfbbwfgszwqxujp81',
                lastChangedAt: '2020-07-23 14:59:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: null,
                tenantCode: 'y4q6gtj6d1bsvuw7vmcgtdolucr23osvde3r26n4o46ujgdh7y',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'llokmci3w7jujpxg5yofp0jyiwjbets5waau82133j4zedlke3v15bcdo8owao0u0dtscbvt3mq5udckya9gkk5h8u76dcg7pjlgpj8kv8y1450nn7jd032go8i371ocyoecjxmc94o1z7zo2bvozvritvhels15',
                component: 'c5o9s81mqmeajonkuf2a0oepsxitzajv0ayxev7uesejud0zc3c23la1r2xwfszqzc66m418qeak2lhiwcpnjdsgkcrbvi1bd3asfoy0jg4eooleqoter43szw1alk65mttxy82emvuz8fqwemkm97gq36ankjio',
                name: 'f6732pqo17cdtt0mkj6ow2487r9s7xp62rwg6ytpb4xlh0mh70i67f2lj9f45ful00qpj4u0l66xe6omr062c178u3ze0mwoey4bp93m2xsbn8i9ul65lkhxbjw04wja0qre4gf1de3n5qgn0ia6o9k3xx415iu4',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'yfhomlwrxfilh522tgn8wkhxds0ps784lpvsndz7tjvzpykafvkqnhpn520npystk53675jjmmcjdaw9h3z3g91esmqw3j4tgzhr8gyj7ryigyf2tvnyinh79p8nnhla3frhxwauqfutsgodvirfutsz3ez9c903',
                flowComponent: 'snzkkz9afpdz7499vlax65tm8zqsf4saq9t06abd4raxs6wzan2dxa5w2jixf84iv7bdnvs83uh65zntz95fev28dj3c67kj3d25q72wamohrcm6ny6v1bggfwfjyc5i8mgi14atp7iryzsg3ew1qyuyagt9pymt',
                flowInterfaceName: 'rrmjz87mcahu5386i95qp1u3vau0t52wje8ae9jxhbj9foa5drlhjdh4skyq5hk7ccgy2d1xwe3d6yw33gfy30ycugpb6a0kdla539v0vmvy2nrb0lji8v19z2og00dk0x8llt4ulus2ycigx43op56isvw7eeyv',
                flowInterfaceNamespace: '8mbxyqg7xq07peitce0n8r8lh48t8xhyhj6303b0vimyukgi9x2mzts53pce4uzypupgqojocwwb0z9k1yetwcnbhbkcbwpa2m0a40wrlfl77vzdmxl8w0p2lgdz0m7e274ost6vqvw1syag9vlh84nsh9jskvni',
                adapterType: 'g7ndmx65wj70wuh52pvy8vkw67exifnz98i9uhto0xqarlver7pqplxlcdid',
                direction: 'SENDER',
                transportProtocol: 'xl5h9hjafctw8t76osc7d6avuj08rns8nlnbw3nhjs0o0it526xvn12n1nt3',
                messageProtocol: '2vu9hq93lwbao8dwgypu7i4nguu48jlngfmf23y0034l8dncqf8o87g20tl9',
                adapterEngineName: 'cba1yac8ccyfxcf2qdebrngjxmaijwtqjqntrl2jjd6ava43rxmu4vql6vi3mc3t13tootobutxmy925l4xc9tioacr7ird9sujrez6kbpegxxpc806ws3h5gqtmzuofpqb0m3sr5oin462vb66fy5xcygyst1x2',
                url: 'rt2gq4r42nswhj7kujxni5zbbjjsoh453uyaqux9vtax3qah38w34j35n2o6ug285gbdzk1xlrcoz6xfm9j9mkxhqca1ezskwlff9cdm5hahsrs4ij22pms4drgkcca2aa2uuzg8nelbb2q2anccy1zfim28zgpefr5jjhhae56grizhvhsrc8a0e4ry2os89bihqqij1rc082zhgi7crprloih7sojos6by34yhfr59qn6yz8pojyo57xacgtlfoyjsilmtpvwpjm76gy1lhytt7ir8bkyse5si5hpubn560wrakp7iq3560cy9suht',
                username: 'gtjtjswnb1c6vvtyyuo5ybptvdr61jaq19ltp9zjjrddhub9d0ffjdj0irpf',
                remoteHost: 's3hc92yevk07oqt0ouitfmj54yw2du79wm7k2si8d9hz16ymrc6xkszgado349aq3ap9bp1etqkczuxqc3n0z5e0nb210pom2m1n25jz8hpckqgvsqc18ac4d7rtrvjskrwrtruln66u646mkc8b0gvinznn3y0x',
                remotePort: 6243412595,
                directory: '111rbpvhzqomjvgahz0y0ugwzv6tx05m8c26146rb9ishw4nby3qby5c0is6ud1904d2j8ufjswsus995pw4ebq4qjf820b1kih8lh19ppxrspu16tvggcy3lgr6eiusa5qgdyzq307ensa1b2llpgr5lvl0gsvakhlqi522ryu914ntudaoku2xjnbfzfet7fsxmj4vxg2b073igew24wdkulzpl5mj5n2doeve43bfgebo0ovrc03ob6oq1r79kjts18nh7bgzq6c2k4vx2drc35s4x1iy9bbp4a9rj098lvhnsc87pb14g429iapwx7xv4pm30uh8nmj3loq2rxkexu8u4vwriouock40vw4y1dgxa8e43ngq1vpeaskn43sbkdk2f5vxu8nothtw0as8sy5ze70f3kmznzsfoku7s6mkasdedsh1cqxolhpn4bm37yvo3ck7u0f5e49tf5rw32x5umclflortaaubffolt20opprayta2tzu1t2lgvzx83iav97srqhm1pe3iva5qmfit9mnums4r53aqn3jtd5hd35exh7b6vhvwqymyp3bo81nomr60pt5ev1bi5owcd1etqzkedgxc4ej5n1nsqjgwjhnzwa0enk2j6pgidj03o9gwxfiyoskvno94t3qornd6bdknqu4ug69d3j05gt9vsuhvze5x1nsa0xiycllqtfuqoaw07sywjyryq02bdt6swvqb1am3a6hez5jqlu664px1rsg4ainh8ku7ihxphkje54tsrjd78ffm48k5wje1v5g9ltz5djg3skaqi7w2patz4o3eu23px3w25cjf3gecld3cwdvb43lec5rxb4m99ssi80e6dnhkxw4ggornr2dxgyq2w27gqjk70nezxepr6ta43cy8qkimubpkw8tsecgrbko1c4lmmm0n8g5e2q09r4lq4t5vq3usktht35zk419srhyipaefim3hwt5jk0g8vish3jc2osiju04zuae0w348nqilbo8',
                fileSchema: 'k265pvmiof1zgua7ikymj3njyzjtd3wei5ydoerxhuaeoic3mrhgxcdbjjo00edtt5a6nwbkk66o91keq09hch1sez9r9128u6u4e9pyi8sxriebkhpn3bqidz9uecjotuy3whbg9jttbz8yw8s2d5xor9dfy0teuie9rr43j2gj2nkwtytx91eqc898u5njn30j0s77boerpiv7nxmmmquylsb2nlvgydsxz1xfwxty7kosc62hysyjaem4lh3w7qb7t1beqeatqcdkatv34h6tnne6bg5zkwu28o5nqq7uucewd6gwu7i5akc83sipzun6m42ss0y7vkoiaokrko7z86u9a7477nf7a9sk65dyrbpf0hrexhwb5txiy8q3g1ketixxj0f9cjd4zpc08c7hne3yxrhgx69ukrx1aka6z72afi68llb1c5rf4wk2d6wgkvdz9incw99ibfbpfqfcp2p4ta95dso29gyoiipsp9wgtwm0fxz2wq9sau7wkp22rk5329f1w99cek8jr5brmd3gf8iuxok584i5zhziz9rz2cv36isrf22fc32s2s5ljas4p7jedupvi14cspk2pxke3xlrp66mfb5fka25908oub838cab74ssxgxy1wbvk90s7tj7ztmjaipgw6szuxwu5jxrnb429ssg7bgn7fi539j0fyykn7ogc9tc4i2kfok5gcbt9ektpa3xmm015pjgw2drte4l0i2d2mmxbofp2v31yehnazwe5iwjs2f6byvff3uwyf28aspia8fjzocx5odlc7hqj113ws4cybyqs1r9a1mtsr6o2sfap0obk0lsnsnz0yu8jonyfqtrs4a32m53htovlzex0djljskah43bsm0o6xuvb12tynjkui2o54jeeuq7eisn6kcc14ajfhzg0yy5hht1w3xtt4tcy8q2wkp5hd6ulzutrnqekioxrne6ofib7u0eu35t8d35zbwbu6d3aszckyg410n01g1dg9b1cpesdc6u',
                proxyHost: 'b0w6nexxm10p1v7frmuxpn4zf5e07ck9uhek69led6x4iza30hu34hgrprbo',
                proxyPort: 8053569613,
                destination: 'vobs40l4yrde585960j7mldcibiq7hj8clij01lq7yretwhma4xb76dt4wrf77vfdsswhyx5jc9eig45s0mfxzdix8gl1cn8p3035glhdndbaeuz2fm1z8gkdpakj8t97s1j2zgpuvpludod5hkwvzdab4396m98',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'x4iw2mrey6n3qxlchjltya0xy11wlyjpum46ioln694rj54lljveh4k7jwlvhdi934xeo6daal53eknyd7nzlp64n0v40br366swcj33geiyrpeck4ntswzgd979i49lirndgn0vr72n4qexsue9ixlx6eqxo5e8',
                responsibleUserAccountName: '3qe2kan02hdjaphihm7v',
                lastChangeUserAccount: 'lsvy93tueju8riyk8jei',
                lastChangedAt: '2020-07-22 19:05:16',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                
                tenantCode: 'q7d2vud0fhqsejpvpkiurmwthhfsecsuroausq6x4vizu6jhls',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '4iysw5gfbc8ksf2crxvp2eh3u3l0y4oegntcyx0yec7063v0d8i4ltb9pj1vuz4hzax68rrhv63ubkv3uxoq0604sohq3jb8jr5lkqucstb5gr29x7hdvsgqcn5zt2gisnkjox26z5hog5nafrxp2h6igh2uvd86',
                component: 'xnuforstt802y5swaia49yej805ery6lyktx07orw35b0spcgnmucxz8pkrg4g7v1ii286m752r14ynhdcq7yxi21kgfi58glmudz035dybhqw3v9zafhe1j1zp1cs7xj3qr6j0gjmcwftdw9eylwimxxjkzz8ol',
                name: 'w36siq7ig1nu0579s2ze4mgvtuk1ge9327yfcfitviom3cgbsezk90yk7l84yqxehlptcwcgf9gpbvp6mjz15eag2moqt9b5aean6ztiacgzohehjjdkpc1p68ja452s2nrwj2e2e3et3ggs7kopdhrtq3z2ol8q',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'ol9y0nbynac9e9arharxvyfmfc22ohsz9dyafyc73zwlvhe7vi4iu0tlcsmv7f3kq1yf54s0hhradxxm2f4oi99ej3r3ayurq0gxje6rzv2s3ehrkwput3fgky1ioaktnz14ferjpobxv6v6ipvxs8c04dquwcln',
                flowComponent: 'c1vj02te6w3durf45cwzyvb7bj0b4kunn7s91dbv7qn4ssgmo6jxno1ft3m9t799qisa1lcac5f7bqiwtgi5vhq7v2meatjqh4d6bnpaxozesv5tv8n4hq4wilc7pgzfb88gxooh1zs7sonb1s3uplnqimtycfki',
                flowInterfaceName: 'q05e33z67bl9hnzqu61y031fc5ql3tcpo8s2apfpraablvs5u216pvyzbsx8u1f926doxuhvocz3zdlv9sdxehiy0fwz7alpk8qa080yia2otmk1zl3gye08o2axqfydbb3gc38p3sebtxymc4dx4kiri32efle0',
                flowInterfaceNamespace: 'zblvk3mg20cm0mv7369w27wfqhm5fjhnqa08t7e8jqbjp9dfxlhxxld0e66m6feqzisw5rzbyh9kju8frz9xyl6550itlyccwco14vlg15huf8l6w110nbkb3vdhptqomwkru9s4vz25xvns417d34xoidep7iqg',
                adapterType: 'gn0edgry82jgo30n8k2578435wrkzrn2z5rlkr4lukj245u6jcfufax5aiab',
                direction: 'SENDER',
                transportProtocol: 'vdfzt232mi40n8ikoy12a7un6bzpmmvavli4bgwebqanamad98ath8w8mrfo',
                messageProtocol: 'wdi53tf85fufmwffoikyegjcin9s70zh7zs3td1lwg2ztygpvhdty5hottbz',
                adapterEngineName: 'y8t9frg3c24hlyymd36i4yuu1r9u5hlcebhhlp4aw6hfhjsaj4979gjcwylnfam1cxa6izyjm5bj96leq0pw96gxpdqsjexp1p82jlv764j8d7lud4cz30qhprp0hmvcg7fkrn480ttghicuw0tt78s6z1hjgngb',
                url: '6jrfp2v19pumhgth690ysxr9s80uv95q7ouh8i537h6oyiqq25uu7urohvlu3acuq3ndwc68i3g6pxvep5uwxykdulc16dcwu63tyxak2gd5z3hvkyrf935v75ud4tlvsihxjrw5f9sfog5zqvxr07c7y1z70z7qpxcz85mj158xyb4eq9j46vhort6beabz9enr5p4r2jfblcw7j1cfn0ck765l2v3fu8a4fddarkm7zb49xvb8jq37xhlwi6gc5dnfmo8gi6o6tg9y3v93d1d8630immfv8gd8x3tdmgx4llo3m2vt8obpo8momoe6',
                username: 'csyy2hztbjf93eowmvz5gw0jbtqscj0v39x6re3wcrkccm601ado7bdoz9g1',
                remoteHost: '0j2mfwzihdlvnga3whaxnffudpxosabpygqlf2zpcayedgt2fomwcj90erx4m6ikp5iorx08xzb6hhu4q7gft3u4bv5susxe4tw6uqqbsw80qy68hyttgncmfqt5v0fph9hn9xajqky3471cjamcnlaqym7ehdde',
                remotePort: 8282451680,
                directory: 'gacszi94cci10ew8mqigldsm6qkwug2i6rvhjosp4dod6hp2c7ag7bp93zupd9jty9rqdyobwqfncf9q8q3leid7zayana8lfaq4jhwehocjzaf4av7v007ebgzh0xpj859lied7rg6aqjvfvvi3epyf17i9rhb2bblu07ajipeqf45kx7yukla6n6w72le5djbtqzb8lshmtgzg5rayxz2s4p7fmxotsenropoqhba512aq660ogf6ea9g9skqv2f30nu3uahv3c66m7eokcs7a6zo15pmqx2z43q70si4l9etnpk2z4q8i3u7t3y7tr4ebne69edlbyiboxa0b0v4ms69rw5xal12nbucttl9qkewf6kjr0ev7cl690oyldp0ozs924rtmw9lbvtmsxw5mxe9cjq45md2xqn3q2wb6ukn3i4ckiiai81fp188qsa9pnt39r3qjyt5qdj54o7ap2jp0winuuidpeah6q4ycirijyax0wyqvt9hd83dupls8hx57rld7m1i1ymptydkmyh2ar3j6g9mr78d5vv8cm5qvh5smhwpc0l6jlga4i25iwy3qarls84am5eoap5nbb4x7gg9r1xxlopyc0s5tl1pu82d4de9nfcyz90qnn9cnku06giqe5iruikw181vcuvb97tu93furoaju9v5mngwdxdlgw2w8dqtpttgmfw3pkjuwbgua0qszj5n9lefdt32c8jowirfmh9q49zmxb0inwv9xknz432mrhimxp4rie17vtmm20syox44zm2ehdlqom5djep8aerkxzovkvcrqftw88lb0z1fbqmr4dgwpwdpc11hfmb84wj3fh82057vw6yshyp4wb0nktexgdusm2l1nx96l29zb2mud7h31y6ez8d07lv7kvfg52stcz7xe28nmpyr8qe4rllygz7pwitbno74snahvczgzfyqnhy3apo3h72lqlr1uq8sm23str2ui1qt2rgevxocdas8b8kgpuea426vwaf1u',
                fileSchema: '5wtmzc23q6gfks89ysjbymj6vid7o8eyld1qq9r80pvplxfdecppzuiqjq414e5iciuvydbowyc35x06y8tuom6j8n29enym5u236sj4zsg7hzp6s154j624zbsyumc96mtxb4zs62yuurzk7t2oced3sxthcvq6ljnas3eq013kpzcwrt5m0esbgeuhk5llkx5f1woars4ztm9eeq1ls87ocee8os034lm23hdyyr4iwcw9jjsgmbo23uw5lhwzt56banm40piwf6hfo7jt5asm5a4rqnexiq6i8aqbmvsgja9pmpl5s8eabvhx4co76ai6gga1i56av8tw88697zs0vf9v9z6w1r9vhhgtupr72uah31h9gnx0ok3jtm9800sotfnappctq1ey33nhx0c2mbu5chgy43yxra3nqd4101plwbbo2mg8u0zcpkp1flgbh9jexwq7f6lkitw8673h9aa35ocynw6ql2c3pkcyzl4yfvaxegrw7l9vcfbxg2j82q1ew06061sbf4r4n6mxgil0168psxgybou4hrzong1klhbua2ospsn7f3o8ahucy58p8nhoj7rebxr6cqyd5f2ppsziqierfhjepamj9g7k7n1esl0sr18e9evtsgd2p39mai2ktdw8qv1rcc07huoz43l22vdcz4rdf91axu87w05zacs16zbghne2pjaa6r8rbrvtpcimk5etpp9i0zq0fdkt1hhxx8912wealz7355g0dm6cx8esgz5bt4l6cxsz1fs6fvdk0gl12iqxk8o9qvm2v4woio4j08aneoac9vrkws8iv4qkhskznmykkeg1ui6fl5rmosqscyloxk5t1b38i9v4ebgqmg4snrdgzr80nnetebc5feuy4fwatlbx83oo2skdvexdfum9x61j5aoxfazw1xi2lvitd84np4nvwfcdvgw4nvlxcnaacv355pbj4ee37b5k32hqndrl2i2uvhh6tjo72qrhiz3f90jw8mubqkwk4677',
                proxyHost: 'dr492xg7clbhb4gs54wewtumtf0mzl4t2p7kjkajqy6xah24eetnjztx11zq',
                proxyPort: 2449484930,
                destination: '1qbuvh8b87sgj95db0nodamrwuj3yzlxlcvxz0it0z179wm0ls85mt5cc4lyszvnkgbt53nb96lc7d7ak9hax1liqz9re4tctirivn2l6ctlvkbtcqhpqc4lmt9x2e4753mst3kq4ia2j3mv3nw5781b20q18ivq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'klq2qqycarmjhtsu0mpvuwgpugkhept3cl53bafjat6ay796mdfk6kwex5x4tbz2m6cp3janacpa0d0s7s5u407iukn632aw0ejopook8t71d2v3jxkpj48kglu1r76iaewo3vzjcwpxtxqgx29be9qm39muib6m',
                responsibleUserAccountName: 'mynxdv1mykyg2h7rpdyi',
                lastChangeUserAccount: 'xxqni8dwt5q85tiqhppx',
                lastChangedAt: '2020-07-23 09:47:54',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: null,
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'uey7hjcfkxlahqo1412b5sx01dzrg67rmx535l25yw867gg9pg5v1vj9atutnrpk1aq3za8ui2q8z1yulcj6g6pgyrn2emchrs2tlqlxg0sbd1vpqnjfajcxauhjtw7x42zdvs265dxp0bf45e22cys67e74yhnc',
                component: '2lmktbiz4cwle5oq86tyl3asv8a843f4a0zc68b5ofkjfzo7cxxiko3zfmtow8u74p9qfusborpxjwdafkv7cdis80yalrd93gtzc1a9h7ye7p1sdge5ul63evb06r2hqorzpgg9p3ivbvs64km8proftdhcaqqx',
                name: '44899e0jlz9v2pylb7k9xssq4c4ciy6rdz3jsi0bm30vpv9t7z8g0egusrlak7vospyyrng38q473fqd9ndcjpihdyc89px1bryiwetjdp2azfraucz270wl7u2qrkiec2quzxit3ezlzn9371lp7dhowiowbqmn',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'jnbwlgrf47ubjcqzhruxq4ej8vkxn3o8h73zzl6bp127fjdhe46brn8d0q6g26ql7l0k87xyrpx389gcp56hb6fxs4mey2uu7x7cj51lntefqxi3bxyin8js9pq4dp9ok4a2pevscpk8jvtm7rn1e2my1xszqxko',
                flowComponent: '9al2syaldccq7g2try2jmpdm1inne8j41ozdc373pq4tgk27pnajcck9v7bccslyxg4vk6itgl0uitqsrelcobvhmmdixis3u8mn832lpckwxtoiwmp01fo1qvw6lf273hv4dh50070knsrwx3nvk4h8zyxnmbh3',
                flowInterfaceName: 'fykz1yzo34smwkbsig7ws5rqdlberj8bscxtg3iqydkomknv53gq9ij1xkpr2rdb6tp5pwvhypjrgi9bemknf27sd3jw3thtvd8t6vkl7ciblbwr3u19h5701tgzdjn23p3btmvctppopjnpos9n8mu4mlswlvlo',
                flowInterfaceNamespace: 'yv4m0nif4nrx9ma7s8aoknbo7yaa2djtawldxhqr0hwiai93whj9uht8ve9b80cwk8ahkj9yem6i3i95ercfdxnkgnyjitu2q0mh1nghi9lkldgcwwdm48616g2vzwprazjrm3wytbgl4sv3eojh513q3ghvkw7z',
                adapterType: 'd5ch615h0pyrw01n3qhi8ve9x7icjvuhd5wymxnhfovv4rb7k83zric4bftr',
                direction: 'SENDER',
                transportProtocol: 'b5wm0opdi4e51p3ma18aoo8ors7jgkr3lco9uypi3llqvszx2b6h2051kj7q',
                messageProtocol: '9dsokd4f7lis35zgqwss3280e9wj851wmyrqsw1k20zu9nue5cb1yxtgu3aw',
                adapterEngineName: '0k6kimulcaq7ad6bxrw4yspvytmi61xl4ksi8c1dr2r3t9lb1r99ki6x4g3d6zv5adiluvi4kooon34hzblvs4afry62hoifmmejsooo3o3e85edo46fz1fqgza1w3ztrplj9jg9r901vgfyrd52m3nzuqr0mrgc',
                url: 'sh32f0schprjf2gy9456gd7tnwxpufir5m9owpfxlibalti1isailx1lq3eex4k359pcril7322g1vuflvagbmck4xd6yd4nk2x0zf1yn3wubnmj7oi15gegv7iey63v1r22cdulwdix2ed4sp9ydkhwcpsmn4y7b0onyajl38or4u4zyukb22hcrbp2hzpzb9j5qti974idg2mu9cj2kjo4efs3nf0upwus6vxqobu5cg88yvhniecyno320ixlx1pst76irde9ctka10030s4pqel15t1nehsdkhypqy7h7lcvmxkd6jae8nalujvt',
                username: 'gd7rnq3d36qf3mjck4rfzkntcru240kqomjw6s6ckv1rhc6wh7ksi01q9e6s',
                remoteHost: 'h3s11jglml7k8hoh6ekdufiu2pk46dbh8pf1moiwnz4haegxj4f1aoaeiuz7ejaogx9l679jw0a7ejtfpu3exccc7sgd2wk5j65lhv6xqi5dfjembqa4kzjetqcc8btqoxro6un1tussz1x7ppxyd3ayjna4063u',
                remotePort: 8806750688,
                directory: 'oz3v2cr5wifwxzsa2cezft1k3hnw1fy4c2oorrhec1o8qe5jy8ush13jj07qdgjylhupgofcm0tv4exeac7isfvxtsp3ol5pzr0mzes7uxnhy5di912dmur34kacf6275ft5ygl7dyri5k8759nbqvl4q6c0p89vuqya48oczpb8jcw1ourqdpknad7ym01aiqon3yhdu7bxpgxcp769nra0ftqtmfk08i50lttj0u9p8qxc9c5ecxfl4b889uo3htadtzw2te8dgudt3ykryrdw8nnl9k6041tv8ik6l3viv49b85ykoq7hh41dcfejekcfhhuozcwvvp5bw45oirmogoa7kemd2agttrb6jx80bu2r6xp5m81ywo8vzthe8adlo0a2qyuiy31j08z0niltvpwh9ut773mupbqivamalvimx6v62l2q67jb1ajbo34257qejoaxpzz423girqr86ed229d68bx21ahi23wqesueaoza3dxksmxwgg1doqalh92hkwm59ynoko2ph61u2j11t0pdwi09tjo2kivg7x24g3h3dyiajq07eas4k1a0t8lz839z4quxtkhzewnl6k3l1a17xvitmjcn9f5q90ehwwcoibo3ho61768the7f6eucex189y9ahid54irx3q7c9p5q2loenzqvg82vnwbnk2qne8sy7mg4brt90eao6c3n87ljx4y0ny8ey1jh1mv6te7nvqevt6um0idrv97va2dnljl9h433rrxz0vy9rdxuljwup6ycg8x9wxvphtpu6myp8mmy5opmpz2pt16144vkjcy1ssgsa0asqdnjkrvv4dtbq9svpxn5gofu9ckvpotufdfywn0g1b1h9sdwmx9yb1t30a2b4u3btad0w88dulwkdpmfx0ii8lh8h38fxls9puhwaqspajx2mbafpe8uggcj6aoeikq8vdomnxirlu3y6n33lktgw91toky5xcsu1mfspwlh4drx35n731j2z78ge6iczi25',
                fileSchema: '6mpmbg6sotjs493yz4idw0gsapg805ya79az7jhbjijxb84ducydi98r8r6yz7xiwuaplmigu0y7m6n30fvoqy9p908nwafmhsru7kcfmwp90fktt3a0n4o2ejuncofhdc0x6zife74awcghklvh96yp0g5vy66nccgk21uff2b75lof14isby02e45qfzyg42rgfz9i125thhe0zhv1t7zdareq0tlnt9d9u6vnuewe0fa7v8tlm0uzj3gu19xlymken4y9rna2nwaoltyr88opyi7dzbca8hjhhucogn1ot2ew0ey7285cn7xtgwnkesrierfrqj50aumrgj2v2v4mml0k91w6mbebzowlqwkldfr024dlhptqwx3nsijw7u36icslhsvz0myoac05p10c6dfkj0ebfeg8w0xmcuavcygg85qtl7dylvrn8nssctxea2xk006yudzcgtt162stix2khtgww7pofhnyt5lunsxhe7txstjtz08g58le6ieb3su7p8bdlhzvei6x4l41wjxp06i3ie674nef3xfrw65i1qlkc8s6zxqynhy1zwq0fw9bqvny56cqe13r1ra2m14tg7ruputfmmekwq35fwcnlbt06nlh7hepvcktrduddsyljb1dik2xik5npal862j9iofrbj7d49zdhvoopgcx6fxx6vcc8ii9bu2blxibg00vrcjcxbl1g2oxt6m5sxw97srodb6rofvneif4sx7ferz0n2s0yhcph6pk1ngf6if6g5urm4z2nbxywtgl3zz0g75z8vrikdxamy9wfkgochw0kpmh8iaycrtv6wp1eb6ibxgnqdeepjvo40syr1yfhbnh35zgmc3ltf7954fq21moo2o5ilc86p1ree11e8au1u31p8xqhdr6ro94w4lr2i5carpuigjb3rkodeyiiz9oqukv2fyizy6wh4x7gz0avzlgg1r74o0ih9946pneexrzkk6i5hf09kbawbkletzltc2fwovcvcd7',
                proxyHost: '8ingbgyc69d984645xdqrtymu4t7vvxnrbul1rx7h01mmbvfr4ljy6od1kqx',
                proxyPort: 4288526801,
                destination: 'v7hfay6hgqy6iqzo40oawdm7bgbmjsesh8i7bag2rrki99ia7wa2fgw5pkvscqdqwbvjvgip0qa93mu900mop5tdhq6eaz970d6tsx67e4df0iz5mokepbgdouzzh8qbpqu6gqizh7y67a8x8jtcx8tf2y0s5qva',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zoko1botnhe00e8nwuwwaz980zwqd3knalu4p34zmsb778n1nx3pw107rj4ajpx7aryunio48omkmiya6xpboqwtybixxkiazmcmi69cmd19uc9b2fyxd1p5go775ztzz78micwf2cuyxcjvta4s9w9lft0et6ua',
                responsibleUserAccountName: 'iplivc2b1vqesr9w8m3n',
                lastChangeUserAccount: 'kqa1amrs8h1a0apsxu40',
                lastChangedAt: '2020-07-23 00:43:51',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '8u8lweb6qa8csot956212t6im6fkhr33f6irydp37winpdw9i2ajtb8egt55vz3vzqpveioaq9wv1awjsxc47624dzh2luxwtglvh4p77lt2gp8sy8ozwwxlqeg7sswvi16e9y9tnvblaqtvhb0auiy4w2yimswd',
                component: 'dzzdge5aae3zweko7kdpmqz6rx02hkj5oot9n36l0vgk6k6xbs1uq0kwj4noa6dzgf4wbs20ji3k3g6baqzbmg4b9l1wbl21mcqv3ar92fxvt9gciw1o0nqgqaviiyb58ktf168tdr8z21jjjd4ed34ia8wy8d4t',
                name: '3dcc4626lldo8ol2zb202i1t70z3afk0cs3pxbe81euip5htdwpnv0eofmr9qvojx73ljxsdnf91tjppy790awfy6r7rzl0hhunmrlm7c36e183x8s0j31n3g0aivb5vuvnrfv3ka7b2e0zp6vgbnrj0qc3vz4ke',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'hvwfx23s4nz0qyvijlywnbafcrq41ym83962q31xfdwxcsupv7eq5bbcri7iz2yd1pgvyaadebtoys4ibj8r41zfn1t4xmabrlpopob1rnj1zrim3cv01uua8xzzfett916i4wda6mto9ohslm87i4l1s4y6p0kf',
                flowComponent: 'uge7yi7cids9mbquo6qzsad2ttkr9inntzrog7mv4d58k037rylxmkwr92s45pu2f3ryebg7mp0bcxxy3y8qf3k0c7iu5lry1t1f69png2zu8g04n9vrfosaj8hf9hgu0kwd5a5jyv4mth6hgbocgsd1g4qfo7t6',
                flowInterfaceName: 'ts5g6lhpc4id5qof3kmcqkirvicjb2sy6u4jiyjl2rmmqd51rkigayo2rc56mfusq9rcjm5zs5f4lc712pjwc2pooqrhq5uynmwpjqjl53in8488szmu0te2y5cfx87vhna74w0vym3y1b81hudgnieaqajsddi5',
                flowInterfaceNamespace: '9p7jtf5u11fvbl687mtvylz68covycvy7affbhc0ubf164ccjv6wa664xe6ch7rfswolljtnvqlfs5yx15z30anuh6clvw5je9kcne0klq5d3ffx254v6po93qldkm87bvus0om6ca48s72zjn58qs41ticvaxuk',
                adapterType: 'yq4euxn2bm5b6byx4p64ectm5g3qo763cd8og3i4g83rryg7tgo0qxfzqr7n',
                direction: 'RECEIVER',
                transportProtocol: 'iusos1r86pyznnuuuz0ieory2amrnyr8u9z9e1bhe6ahkdb9i6lwdkcsn7sz',
                messageProtocol: 'wdbfo5nlrhdyze0eybv969vbjli5mkwy9cvj5dkb05nz3fqq61ueatbf0nav',
                adapterEngineName: 't3qg3f5a5n94ruixamnvnesp9r4raohhkmuiovak4f5pebbsjnsc4c55i8zgu0vzypzvvju6wjx7o512paoz1ln1t8vzvi6bbcjfuaypdo3oovzb6zjpv2acya5bub12q2wrwr7p1dq50xzhnna80z4rzh84xgsi',
                url: 'oazcah3zvaxfv6i7pfas4q58r37uyk965hjzaqdmfgsh2uhuh9tzeuyd328ueth3hbmwkn9pbghzjvkfj4vrlrcj515849zcxblrr312m4x1pykdcyat55iucof4m9a7ng50nr39dt5r2bgn0sdeikz7jemffp30pli161kxv334sy96up4qafhhw5yg8cryk7m91w73r7531ui4y4935ry75c86vlbikw0c5o3yfntfsxpbawg9lnaw6w1gurz0ie5aggwucr2i02ud7nml4jdm6bcm861vnuamtepgzzrlganp15ejis6ahtv1iohq',
                username: 'eu0ng5rf0kt32h6ke07z9197i8x40xerqyh02tnh4gdnu0pvioz7usvinnrv',
                remoteHost: 'idnpwnch7fqbebyavm511s78d010kb7aphsb2gun676huoc2qm8fh1hfstrwy9wcjqhz96za2ifmclakdmxyv8wgu4kfva512umzfb4klrclwt91r7w8exoluegsbuompeyj1pth3g80kpbk70mgnatvoi4fbnzw',
                remotePort: 8805452906,
                directory: 'xw08tqmhe4w3901gw9sm1zptlkifz7u59dwsncobzat1fukq2a6szdwsg8v49wta5f9aaem8qzf26lctuozh2ptafzute6jst2j0ao05w4n1g85vdhrgutp1951rx4jzpqzrwq4tmdzrul3jicaz5f6txw3wu3lr43yaa5ql15mdqgcntzvafhfgynmq8t6jr6xl2j2jg1k1750bxtzb03aakzpbhmjy4lzff8rakpqzshhyehxaxpg8cf96i4pmy5t12ny3ywtbugxi9f3xbqqo9wmriz57rdmbze2ooi3z2s7m0r2ihmnmu6jtv91nf7c2dpmqsrkhi51ixt8138067ipif2elhb4rxzid5vpgymjsf0zfvk88uczg1nb6vin5mvzx98op8b1mwzr1plww6kopae0wummpy5z8ebi5e4lbx2vjpgm31xj4jc8s7zjtssd9mobu9klcybie0vadgjnp72mbs0z7yaofprkv5z9oceo5grefle4ie4tu7mncy1o6kgxzbc4ypsh5h19ur0d95vfhs37gn6qibkduobils5eksf56fca95bvz8s138kbctj999u8tex7d2y9gxeymv2a10yrngk5dup14b83fsph53y7ncee9fyiknibi2h15eknj05xo11sh0nd78xp2p3a4vs1omwhrw3znd2xajz4dvrec97l7xzrlefs2are1km5f76spvxsli13ujsddskp9e477ah25g4fx4jebk1c4cmebcilee1qevflk6pubfls44wpokyl4x2dvel3z5o4h4jpwvcaqz7isvuo4gfgm6fwa21j47aitb3yyvvybjljnew493hrj3u1e0thwcl3hpmdrtxebym4yl3j6ogf37dwt8t33q4p1w8csa2i15t7hsgh5x3rhcqlh81zkt6gzgej1mo4nvfvrghfcw92emr441eupmcpoo36966w2t7vl7r3df2by0fin950lliew9htkmgqkl24rh026rzw8b32ubl7chwvk',
                fileSchema: 'm4lrq182sx8z0g2gqvok87r47bq4bhgyx54qfa1nhtky9wwrpgaxoibxpvzjw03bsjaqtw8o5rkyuevzab7jt88vyfea6xosq7362frvaa4kro03xlkw9b2209mci0ob7gwcoc7vt1mjs2zt19qehi5v9yvmzae7y5ma9ustxzs0nxet6f7enzis85riuf2xnc5x6549ahntmbkxr2h1wd1573eot96qcw1a1agtr7a4rbfjzod1wxaykk45q5k48wjv9ntc2m2sbohyfyo64vkdu0gje3840lyojj5eppajcbmprxa22ibmn2n51ohuch426esfmgsb2pinrdt4fji2djysl80uhlusijzydgmwpsq44fgfnmvafj74yvtrd71qec283jsv2yfm7tp38isjx4fayftd69zadhg3ptgnvbb9iheg9i47t21ycv9a20f0dxcx547iaywi280ajnig5nb2jl9t9ewrh4yu6tkc5ra0wsbc4j3z6v1cbktkxncu56vrubqlgsfbcljvzi1nggsb6h5fq4apcmwzymeeopwi37847i5m3ib6ockl35nq2kgzarms5wy11bzraekwdmb3sd5bw4m9isucln4nxjosr8md4a7mcfw2nxrb137dkk68rww4awr4ss66un0n2pim5hulxnqqpktt1qp19brs9t9hkkbb7afhzud79n8jemsarf1o6jwqsoycqr3kcsujtlng58jamq9rsfdnac95yi1xqy1p5tx7bxeaitzzghegrbj8rfimy9ysq0ubcg6groj5wyn5o832ek8djmjp2gng6stkzp2tkamtt73li8npi1o3ne0vo4rmjo1s8qefrb66y4n6vvof3i57s0px74s75zhqanzetzd7v5tsyei18zb4bpoqrjxj3p0ikdzdpu7tqq0vkg8581mryykq48wh17ifuo0j5eaf3n7nqq8xjaw4m5mmprl0wziss0nqilazgj9ogvyghoivaln143klg9rtsh76ogsl',
                proxyHost: '87r4dkmhah45gk5w66w9tfmldb4cqkjkrm91zvyqmmggpxyk8b4szpizmqho',
                proxyPort: 4943502394,
                destination: 'r9fovvqqdwpjd3oh08zlhqpuiu80ywohhksmioi4pylvs9d03ca77bjqelxvjugfksqn8dwbc5po9m05qv3hmmklsm6u62o8k8enktmvohmxglgrlcvqkudb1rkiaykuexu990rbw16te66kmdr6e8a2tr7utlhj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8jpc5xq2fqwesq0t2accoo4hstrnqbr8w3lxsb32qepcn5hwg5kzagdk9cx3p9s147aek381itm4s3j7m0r7ygxwxyopldd7yx72wumog7ner9txmwtcgtxoria8v7onkybf2634bvira6pjkim8kdk0f0q9jri8',
                responsibleUserAccountName: '5l02zr5qcgphnfj79ym8',
                lastChangeUserAccount: 'lsqxrcpya8iyhkiz0e5m',
                lastChangedAt: '2020-07-23 03:02:05',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'kfba3bl22q2lsu7fzlv349u8g5l19r1th8kg8ya9nz5dpf55zg',
                systemId: null,
                party: 'gh11amd86l3wl91bch9sgiasfsmjz95ibpt0k2evsjawwzkijqcow6janyjuvbw7oym40pgqdwep0v0d590xhwz7799beyciaswte8hflano541754wx22gw5f6told34yxsv73te76n2kknh1muzr1szywkd4ia',
                component: '6xc0yho0y6n4levajjwubx37urh3sdwennc4nl8mx4sakmcuz2e644pombgrxf5pznj5uksiaapku9emp8252vp2b5tsby2mb5l6abm3rkdz1go0ye3fho1i18lgcsdypxpgsfsenbmqwq7qy9ryp8v86krnstgz',
                name: 'z7tpvfwbzvgodzyt3ul4w3omebh2ww8r6exudaynwb9vojf7bheykf60zwed950sp7i0hzfo1psusjmv4zyzaua819k5fpgd4qhqx2mlyfeqdp7nup5rrzsxb5xxk2fqkn12dyrdklj089ecyu85afmdbvw1gxni',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'p6lkhqrov4upms0sr8lnahp3gxftvcktb24kjg537rep7yxmpqqcwp6ggkdb1kvoymqf6w5ja9ol8gms80uuaenfp09l6z1tx8hqt92py1b12mu38p7o0awjdqdpo5xbf2ugaqtvd1jskzhoxetfuguk5mp8a8j8',
                flowComponent: 'q689177sj6k791c8llecj7jygvtpcnsvpui65nlqj6xypv19aroqv2q32mvw6zhl1qmkswkngiv03c7hsv6bj1d6sxy1zpfu5jritb4lv149lhgqvvon2y44l9oayltqe4tyl3mfc5d32ma2w8u18kxb8uokx2rh',
                flowInterfaceName: 'wm0sizp7pyr1ir5iaassnw11rdnyqtkskjsa5ce0e94ujzpntth9tly1lv4trsl3es7ai1eiq3tix5ew1wzz0c2c2tvdb03gcwqdghyihbwm9eqcaxzxobix3nuqiha5vya0vd5hg43dnky56jux1wur1mes6cp3',
                flowInterfaceNamespace: 'atq1k917wihj21oqxh9a3ff78q7imcjscj9ho98zfjphk1t7zea1j4hcpxkj5cylfkwbvqgf86dt3jfgcmpj1qd10ffvijrs2cdux3m5z75ao2oelm8v38mc8iba9rfbrclp4me1lj0g1dtfhzooda4ro4bxiydh',
                adapterType: 'irn1wl2s5lfuro023ig9417dp30mcjcywmnibuduu6pmduoyddrpm1879po9',
                direction: 'RECEIVER',
                transportProtocol: 'gf9tdimepq6licm4dnvvm5zxma8lrqek5nxm9w4a5qnv0i54vn6zp6rq9wvr',
                messageProtocol: 'ljjfn2wty7hp3crzupo73bgs5fn5j8ktdb0dp5y6r2purtauykuezj9rffoi',
                adapterEngineName: 'ja45rcqj3o9n7iwhs8hafhaoxkwcox4az7phgp2bvk2ziu01heq8dm64q7y8ml3gn81xoi546bo0xbsbli5s8ns3awxiv3ui8pnl3j5j0xs1c8qs7gw4lpguoxqmzfvh3c7cvc2x2k0fn3621z2yysw6ou4wqwxb',
                url: '6y1baaflb510ze66o8uppn5e9as126f4e8my6cf6gywbretkeve0bhcnhuwmw4n5kcavl66ar79f1m98hf9wg6cbq5h7nxpdd1w1xbzl923vhlzx74jd10dwote4zqjta1s43rkhooyhl0m0paqeq8u80uvxegqt6uo3he820grpw57z7krmdalwl0do2cs1pwvca6yd1d15xqgepf17n5er54t6mwhqrgl0mss9pgvo6r0rsuqk5tdk2e71a5nsfuuqiogydvrtqoy90mpfsyrxg44q0waa5oh5fqt0dsar95ikcl63hy6x47ad3yyr',
                username: 'zk5zmdu9p98q1klscnodwb8e5q44xt7dgqy090h6be2oz955x9uy4tz8yyos',
                remoteHost: 'qzum269jz98z92gq6ouinqk3stbjikc9tqpkejxfjktt9qio9ioxu4jbp3nsvzp8uswyg7lkcjckkasq5ez8ow2owggdh8f994uoo7ymwn5krlisegnn3glbn3rsieicmbbeb5pz132lzv22d79nuedfyrv6a3z6',
                remotePort: 2834613838,
                directory: 'ziff75ot31nq8hb8jea60oj4by3sn1srbfcpjf8y8k55fmv82mrxbvr550hm3fw2som66is9bruwtxhmkqi3t7rwgd38un7rzx4b7jfe6jl7sy46zl8fzorfsgwtteznqds97dru8dgk732bgcyj4kpa7vyju03m5mmfe1t5n4hc4nly4sml13g2raxmqy75q3m9zsr2q3l5brt5bgllyygl3631fp1ar2gdizxowoxizhg1mf9pcvxenweulqfaqlzpd7ikuj3tioyui3hm6dgsnsthutgusbztc2fdekafskzzlffaoh90aax04izbueedx5pw5zflvcrvw7uwacs6irh68t2429ntutv9tdz7mvqmm1e0dbfc0pmx4het5v4dyk0k4sl0aoe36miueg0mhfg7djbo6ytivks85eu21adw6a7nhpu39l14p5w5f8j3bgrev2iiwv6uk945jxo241bq0uk6zzxsmmqd3t6219mul5t8dyrdzjklggn9ldhiwka3biuw8oy9wqzs39c51oiatsry6tbqxjnykmrfr8n18cay5j54lnfkf48v54mfgw2ru1tvr9w63h9sgyoc9cq2xm1gyivgs1n9jeanpebccegn3c2znudkir2m9zvqlv13m2qlrw9p9n2t1898fpsos4ygl91z8b3ijqr6g1fh55gw5ybe30zonpnwd7vks4tvle6x4t29c22c3mhcbtl8ez3hbaohvqpk2jzzns2hmecmlzsvmeaznz82szkkzahvvi294qt0iuc6woj9dqhlqapzm3txeesngrtw6qm2ovql08sofj5x1jg63s28vek4zq0zsr7bfjda2jip7hcnr64hsyxlk6utc0h9a9egaipdr0e1mgwboiagitaduo54lxyos7cf9ebs6og36ukapjrscf1e7y3akz9sk2u78a5p02m5ajxut1n7hxa6ig8bwmhexhqz4ya1ppjjoxjtxsmxkaa5mv17c1d3lex1a16kxp5ced06kc39',
                fileSchema: 'enk8q6ng3jkmq1u1o6g2mmsav96gji4j8zbadxi8sl4glmxbo4cdhrx698aqaogpgqokaxz7qjqigrb8ojp9s6cxtci8v83k4mgkwml1udjhlq4d9513c2ueze7t4ueykap219g5dq2a3n7w3mfeyb7k3ijma4da9bfoc29rfjf8xwyn4ehjcfnz9x837cwhl7drlb91d4oocf3se7jvp5lkx6rft5sm6ai8y9ymjyrrmcllak3ml3ty4mcaca0d7m6809c3xsyth1baprqns6kxxn1r5d3mt2y4r5mqej1pswxsehlmcbv0mgl1bdpkpv1cxa6zwvh87uxal1ta0a02o5x4l6snq34bkkp1p9scyeftol040oh5j9bdcf0yol1noh185o61f9085ktanm27xwvwzozor0b3ctkkd12z6kaql8dje2n9jhz3yg8bbuaiw9ay6z68dhtoxyejd17ka9pjoeuaipygjpq1oap99h2hd4u6x7jwris3mkib5ksqd7fato2qseffmf5ctstous0s6tt9wacrqmjb8z3h6flb8zbor3g9ra9w7whmkb4zh4umbovkqv908u4myuqstroost5g1qv8kx8hjjs5jba3tj7gn85kbtenm9gds4s909f0ook3ry53h0y74fezc0n8wec76b4rd68muqzjc8i3ooqm6uvym30vtzajb01gxgbmtv7yoe793rmfel9uj7qskvx4guc8twrgcjvau5thn2qk7c838ffdm1ke7brxr2y3gjs6ubjsx1y9gm6efjo9pu25bwjf64686fp313dsrsy918uft4xq4dgenlcjwlf869wyjd2burbig8040cxmpl9et233vlqvjeiugsbkwvq04ovmtqld52fzbanfzbmj6lvi98n8rc80stjx86dej5xp906elkdme59a2jv1z363mhsknmbw5cqmv6i6yukuuiws5mnvt7ce7ttrx4f72vxoixw7tmh8suhotesdetgem5vkuop736zt',
                proxyHost: 'ah3o5u0rwv82k9yvqnf3uqtk6st9g1wegr4cf71qccy18rsqjlf57rat7vsv',
                proxyPort: 1142787659,
                destination: '8p40caqvwes0y6lzg0bgnssrnc4optn520r1uli1tjvijvpmm1kt4atbomeqg6zdhulcsp0iiil03d1gndtpjy19dpqach8t0owikld4tns8a8xi83ybajm9j4shnaoke1mgqadgvzriybq1sxmbvcazqvqf8ei9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'lluj40psf02i5zs0zu26k926ukg3wakk13oe1k5anb6brg2nmbd5hnefjmzxh2muid4d33ywqqa5qj3xqb85my7f63nlgg3lioe3wqw6q1w3dmenx9wu1mp5c24y1qtrwqudn23rcymrftfgcpemqhn9pxjst6vi',
                responsibleUserAccountName: '7zfl22p9kxfxs6ejxf85',
                lastChangeUserAccount: 'h7tjhaqrsy3jbgu4j6yw',
                lastChangedAt: '2020-07-22 19:25:07',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '802zzxq04bimsvrzluxxn1obuqxxlvlwxx0437nwlxc42b1qai',
                
                party: 'a2n8pm4hd25kqrw3z3fsjtoa752wnreudamt3ykfxfd3hoyslmy083mlav1zlvwfgayl62gfx9nnk37860q968yjb93t26wdxoj906jxj6ifnl0iuo0kkz42svnoout5xfnmy11x36shkn0xrya3eq21qe4zge14',
                component: 'xver9oa9woocfmqxixeabgywk4qv8kziszoh4ny33hgnr6y5m6x2p3er9fz7u61q6lokl4l1buaddlyew5zuenk3trbyy8gthsg53ea9xq67vebjclx002w3l77brqbty5nyyfc82jc5ajd9ox4apulj6qh2s0be',
                name: 'it1g8tazzjniilxbvmxmgjs18lejz7cr9glwu4pk8wxpxtjpq0q82ozr7iw6nhyy4ofaiexkeitak6k0sdowtrf1su9jj7kdhtozt19w3ic8eyr6wflsnuvia0atotxory296bgnjyb5bavfs4etpgp05azz1l8n',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: '9pejaw8eg148qwi7n436t5q5db4lwim1audlfmcgdik1s33g9dhyj7emielyoic7sg5g9jb3ecg69w5ewcqtifnorye0pduawzchewp0pg3649ssrv8i7vyctihp5eq43sq69jygc59u5egmg22o6nly5qjoot91',
                flowComponent: '0wrefalf92cryyul0vqkb4e9g0i50r3jgwlv9ec0p7mba3mt7b6dfis43kz3anhh1v8tejzpzmotpgh3pmywgewwbj8wz9sn9eqsm2jj235lzo75gbupp59j7an2snta4xt1mbtc8hs7188xbu7fblcaw7y2in8a',
                flowInterfaceName: 'zt4uqemb2lwnerio0dzzqnrf6smpz4yejgrpqrsa0z68hzqiehp64ppe6sxlrlegrxcwa71dqfscjyubyb82idrkgjk6a5l5ropmdbqfht6oo1xs3echnmvnyye1n57jqp8r5hajs16nzpp8x5f06eb0b6bbgc22',
                flowInterfaceNamespace: 'rl3yu2j5cveyd17irb0t2ds9fh7gn0abguarp78twn49lz1g4ui9npw9l5l8w143k9hclt4ko0hu8jgjo6xawwixw646rz6inqqh25403mea0m3xlxhggw6by3wzec7gfekqouz4qwgbjwkx04lq71ygaxh4hv5t',
                adapterType: 'y5mk422buhtzwg0928kn3068yln027zfqglkqv7yaurdufsl1keopgr3exwq',
                direction: 'RECEIVER',
                transportProtocol: 'kwn744b71w7aoarku3js4nv4jg9pvbqkuiw2drpdwylvr0qhkbyyj1pa3rhw',
                messageProtocol: '8a4g3cyuc3nbkxv7bg7u4yjd4wwhi3stfkel5s4igde199cfl9f5woouibra',
                adapterEngineName: '1bs7c6g2amef2hnj0i6fi8p0qsxs6zvtqxnyn3iqp6s27xhrcrwlc6oo260o5ns97e5o1dednh2fuhknitqky54xjwkqfxwx50tffx5wnskbridk6j7eklacphfc6pi6rfi0sjsgyh36pcs9g63s54vqx1ygipv2',
                url: 'no56n64r0i3iprje54ot273fp4iovrx98gkmwmznmoi1jyxc3d15fuk3eqm6je5rxwtk3rxq1aewp4d93rjkdoa7c55oi2cc7chn339bery6a2u9jjkj8mzdiv0e2lrjuv20tm1r8x3d3c79uwzqso74954lpfl9xy3wx5os5btn3wubiubfh8csk15czgupxosxzne3agap4xnvnzfae8oy82m9jtek1cbgxtytvgovvh077nilh7h2xp90ylb5x767or60167tvw357hsdwz3ioanu2o3b68l9tvicnq5x5yrdy1y40c8l7r3l25xa',
                username: 'gubkmnkcti5o1kfgbgser1zi8qie5xnderg87mxxss9qchykw351gh13v3m3',
                remoteHost: 'a583xumqh83ipf8gum4qi0s0ipbiuvq5eqtstkrfh1ntmcr6tq4e4qk8pjv3sf57a99b235vwzg0i2zrldiavedn90g3gks0suo1w37vsaxlyb2pez10ftc5639a0lj77x6eyn9x9ianpfl6q8zdwdlyej17vpag',
                remotePort: 5703003385,
                directory: 'k6h1mwux350laawjjd0br4583mj0gbwt3vgpgcbgrtobi8inyws4b9no3o31cnnxmjoo6bex6lbqlykrqsxazj5zr3du8r3w8cwfgl21gsko5f98c1xblc3z4qsip48b8dksb8fltslzc07f00nsxn5cl8xfq4l87uq1pijiezvkp3biveqsx64ve9phtc5mb4xkmlyyanbulk4lssopoo6mxe4b5s5sminpe8obb3pnowaml5yvuaxegxuwxl5jsjkjmiocdwe4j402brit8p97261jk11szrpvmot2um1hduznx5zf7vciigzf4w7zln25o2jwor45akeezxhu1xwsr32e5oq83utuzyr2reswfutxm6f6wx5s8ncmlykf1nrt3lfuzo1avhtjnyn8z09hzef4mnlpk7jp6t2rg5nqnu8jjkigxw0nab44fvl3dnor3vg0w9f4t326ytrogbwpsbg2zw06zpyo46b8mxcv5p1ixqcqxl3wdf9sttccc275b3w4e2d9cv9x13n7dsqnw62rru9pgssev3bzuhkzbt0w9189bojpjm0iys08erf83u0psv8m5e6tf7v2xp9qn2yi3axlgic2zs5y4i2mykx17j23anusaea9l765b3ockxzeegwssdy5lhxtf0vj3qhlql0h59h71ph0e7jq1y5buwouzzwldccvrik2t5mlzde88btbax6ht3bh11uwj2cdf53h8w79j2sc2rj8z69zb6tvdwb4x8spow12f91tc72quirwu1a7ylfbuf0gnupl224393w23jn96d8bdsp8pp3s9m1hbr2zgsqjki3itdk3i7wr3da3jeyu16jprtnxjcu9fci51x5dnwn8kzvxsd1o8we983c6yreu0uuo0cdxns31aial7mtmxv7ns0rponwcrfydlbmxmn8e3qayvrt148z9309mar138f04ytd5z4ie4pbzhkb5rfcrak7ttjx1qcv4f3iv0913lthv8utiaii9tq5720ft',
                fileSchema: 'usitseogbd74rrkkdqkdn377fbo00y8c63shyijgc5j4navkm9n2eax3sj3fnvpazxojr3ndg9cg3lro1bw78r74xu41fk1spcdjv89db8ueu391hg2nk4b5t2a0749od45ohdtkqgay4pcu6uos7wd10iarb7zllowv5y9hec4uc0umcmviaxfd8us8wzg5znyfrmy2u2svmou0vb1uw259ske5q4suc3tx9zbr43y8y840ytl7xvmnale0w20f5y8de86g8t1m3tqqg1e949dm0yt2fqls960vp3a08hklzwi7bfsfcxz9ojoirh9fycygpg2y4vg2aji2ye6lpw7m5745y1ywiwey5axwmszbg0li3kioco89f3mrt9o584wsnlpswiv1xrr0qh8sp9tsy6loy3jo00dk7t3bc3egjhkeed2ac8qvjyotm6b5xczq5a5923vttlkdvejjrcqs8ilrrggvfbrsxkphjgs32nrvhgc9y7emvsxmsnjxsg0wqh95suuq94r26pkuv0jhz9w9jf8fxk04380fprr2cy82wwwdwzcmflq01mwu00zqlkrcv7oyd82r9pwfkc24lb6jtlhyfgwk5fxdpw8808onz0348zhhqkd5tqdwsqg43yebfsxl08vkaykx84awcqyoyouqt3k08z9l3bznggn7o3rvdyxljliscndqsy1n6vwjpqkpjf2gx63etll2xf1clks8f8e6kjdbl5usc580m2wgcanpaj4gmz1h7kghu7repriuq35mlv6i9n3qgurw8m0d9lfv1zsv7agn9lwd5kmndj0ren06j65az2q3r7fyc0fcynpp130pfcpz1lmknrapl9wxv4nm3ua0e38o136lgij4z0cduayda7mjteua1eoo3a6q88vj6trozpryn9grf27ouov4j2pt5lmrx2zip8oted84g5mvjt13zq6mjihsmtb92mzp2zkbp4pndez4bacf6hse1jwey4p1prdzwb1rar9vsuok',
                proxyHost: 'duye9w2nurv8mjw7prprj41ctwjbj4rtnarxpxbi6tykhk1vyhmmbr4om9z5',
                proxyPort: 4009706942,
                destination: '9x6xxecs8xsd12q5by81xh5va4w75gek3bhsyeatodd3u6vaogglmzu2ofb5ri63gp9rjdy1thpoy6ri0rkfbrnwcfewvkt8888zimqf70oom68s24y6y44efti8g1fyvc25lkokas6cz6ui64fb4sgzngucz5mf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'n92g2jan3gti2ay3tqhv4dj8vxf467vkl6d5cwumgyg6nreov199ujbg7f9tx62j852h8aqvh6axowhjdlp3krux8qe669ak4o1i3g250hg5pqylwpxe62ajd9973lpw6c2roln3k6dopi7nver8ctdoc397h3or',
                responsibleUserAccountName: 'wgfci9zld0hileii76za',
                lastChangeUserAccount: 'ke7v0n18y8woq62w7rik',
                lastChangedAt: '2020-07-23 02:17:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '0pvde9xix9jq6w5munq8q6eig5bb8rlqsa865bxmbv75sprgvq',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'fv65r1e85lq1ft88m27m0nkydkw15wa6egcm0051t3aemou35bqk4495wwei0v9jaom8fm13fwzhxf9pzodq7b5fgwacqbloezcl14zilip125gwslpv949li547a0gbeasor2vjvowzhw11s7rzgshm60y710ul',
                component: null,
                name: 'irpbuigv7mjk2k4qgy9wh6pqpdhspzepe8q4rwpgrhzmsg4pquc1q7fy4jvmcdxg3hjjpnu7co3qemtcyxpnsbtnblrdobkxa0dokdh1vx1h2yqccqrms1724dt946wlxug4jzy1j00pckjxfyyurk7vh9o40kkn',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'dz5dyk76rnr2qta2idqu4k1jgt88seq1hw8ckv51r8ntfrxghxd70zff6gy9wa9v2yjttk4qnsaski88s5ehh5c27qrajm9clid405tjse4psa78c04rs3hs6dagwlv91y6x3zbee6go6idg48165zvy0fqze2mr',
                flowComponent: 'q7qv1yfrd9lpspxzkmdcbobmwbsjf06y5s70ao4ab0ch03ku22wwgjo525yf5seuwewc0ws53bg3qi0nd0w3n8kpcyvtb57edehjebnd5wtapa0ao2sqqu59t0toszm651lyyqi91116ddpv4e0cds3vwwnv8tet',
                flowInterfaceName: 'mmtoe8wc7mrzj0she28bx7otq6qo32t5b5qypffzmy42v4hhq729le9v9pbiy0hvbnuyotxrq3slze1nzlaxchqxo3vxkkwkiqeo9h69l0kb3h4d9gbu39o905et40oxe1mz52840hw68m9315586deo9jg8lhmb',
                flowInterfaceNamespace: 'fo4n78rx5nt71c3irbiknrv4mvmgzp6zelwujz9ob8dzk4fdz592opx6pxn2wts4hhi1yjpb15axu4bfj5vp6zpu0zke84q9tnqigbsu6qhdq5s2hyfvg9v7hcdtx7p6gleord9xv1ip286oxoflr7tljyy92zib',
                adapterType: '1emqdswgtz2qv2ksyzwu9vf4za7qk9eb6uzuti5wqodzgw0kbb76xf75ymoi',
                direction: 'SENDER',
                transportProtocol: '5hz4j5xj0ajru3csxoog9xf8q801qrpwaj644njvb4lku10hs9csiod0lcta',
                messageProtocol: 'vvfx5t3vghvocfbh36l2coexs0havq9cs2sinjrrp8cu47ssu0fxoogrj08j',
                adapterEngineName: 'j9mjk1aoo3nlog2818dt1x74t7wpf4tycbdml68e9q64bjp1fdmm91kxfway8r14g1x776ayhiqwvi0gbmvd1ucetp9ftx30ihcom6fgrvo7pdebm3dqxnezfxzq89g2iz1t8y4nvknr0jgyoezkl0yexnte68ze',
                url: 'jc6ldq248bhvt5tnhwbvjppoqwracjkj4eb7knlsne8gq0iil0cvdaag063tcjxyfhkk5ldzzdaxsdt8v766t7r2rpi8rz27jbeomrnbz4zfctguh6k5y5hsnm995xhse50v0bs7qb45xmva3juc8f5kqdp5nlye4fn1vbapqw9d1egroj28grijtqaxdkcyfxa9ro33ehwee9a1mx1sa6ejjqbeybmejet6r7w1amndl9nz6k36fcbtbhi0kwargdwrz8qk5404lynbxkuaex1eb9cew25aivndn2kimx5qr7yq54cq0tberhn9wmk4',
                username: 'zj1swzvfcuvmcs3hik7cich4uw70782z4gaktcie0wj4p4xppc7uwcsko5sk',
                remoteHost: 'n6ctopf1auanf44mcjpscgol3x2ba5fl3xi02p7fxfgoqzxul2a1ulwtbsuteerupycs1rwsvr2aeuebf7uz3fafkignvher21343oqwu15909mr1b9ohc0wmfptj5gugbhsq1enieegd9y98s65l1ri7ihfnxfv',
                remotePort: 9270926777,
                directory: 's7bm4sl8gf7bsnley6rga85xq5wgwaf3o6i162bvd0aucmqaz1fzkpdfg9ocuthklxl7zkn8p0cn4iype7zlshfxr5xrnl8fc05qweei09cbm3tqg9eqeagm992w8dhf05cp29bdqmh87jdu1r745jth96105cy08auxwh6bx539cg1b424pygt9im3up7bwo1bzxfinpesnmji4gpbfp1norzb3cfmpdth4iztz9g1xll9tbwho2agokw4esd13uqq8eze88s7f3yiuorbznq8d9ll4dy86rjvtx92170923j83ii3ii0vn8qpfn6t2f9p992ummka1e8davu95ez35n5ikfrwdtdc6c2btohjnpqxp78yg3fjcpw9wduqgut5qjxhp28nw0to0mmxzldpdmsfcrfuugw7raae56vrfy1jfk70a6quegwfzqg84d69m7h7njx1dxtvrp24y0w0kdqll5xlqzsexm5b0qyd8a9kw3sfe9iuv19jqq3jcdxjeejhlu8mif6qdhblpsyc7f51bsgswcai3mw4bp3xniq2cpuvx5kx7756z4q3r7fiivj0zvsk4xiq88g4xohngg5a2e3ygj4igpg7dv46xi5o7k97lepd096ouiq22qghm5ncotios3lby0x4cyt5gzji0rczi93wwq6t5qd2n0pwyoa3dmm5zfb0ua3xtq7044ga0dp2e6b4vwauzt106x53v3ntkuydyd36zwapjjoaezwtrk2u8mb9jkbyhq5dw1b0rh3ac1hc7ibn01qvfeufzu46hfxyg4d2asek0cf5o938263yb9jz8i47cnfbzvf9um5pycqo4s69g7ifjvob8xuu6y0t2uuas1nsjyyndt0tprt00hia6relrules3z6vb4qy0t1xu6sr0wu6hdjcd79kbzvqys4hd1nh3zq5lvxr5vj51pj82k7bl4og62diy9l3ynnjusu6ddj7r4vw5az2dvljndzdcc9ov62egie6sdsql9efct0f',
                fileSchema: 'hl6v4yv7k6lek92u5z3zg5qcjpmwci19sviy6r7rzuqrtpey08by4bdqpnygu1mqfgas7fgben9oig9f02aatxjpublype5zzo9lom0qcj2y58gvx4tl5z6d06jrjgdx99n07xg26wa1xrlvijuk9iznkr7qpcuptwmjm8d2ewringhussz9wm8mgjh4mlbfouby8u8d4m1038e02jc5almr36yhmu5qtbwn1636r3h6nb8b4rno9hpp0gvvw54stbbdy8s6dlqmxslej3csptoxga7j0pn1460iwsqakqcg4aawcwjvolc96ukx6qeoka9eg2qni6ndz6q83uidw8ufu0oz6mydml47hxb1zqsf86z5g3cwios4s32ldw1rfu9yuq3iythlt91nrdgpssmbzmqezimaitumo185u8xqgp3l4i0t2b94ht64cka32w4fwxhxkk7aj36lp3zub80bucmxp7pgtpa6x9tsu1h0ps4cjm3hdkf99qn6rx3cacy8l5blo89pd7ewu2iro1jmjsq0qaw2lwqk0ouda9a3t0dhgmlghoqcgjf84hmu7r5dv87q5vzwv9atd45w5ru4r6arksc6czb3mrg31ttkfewkqxk9h3719zfbsp0fzo3ejcppetxnajtfmfu9pk3ai25t8iw3gnxnqzt6ukmmx6j2g5pfflkzrmm51gyc3qcdczu8eln3qufem011trelqakwdqezpopg6un0idcbldg3foc6o01l2it13i7qu68dwvhsdgbqcnya4m0d4wckb8ig4de0o9nyvvy41t4zzo1is1boo5jvutmce1zz6cooa7amvbmjv7z1ocygwkrol4ywb6oizfxps1bqz1urd1txlgjqwu7zl6bw26dnfwjk6exx3l1xwyrct9kyf8nby4kgpfsqzhra79khaez7qewzuyw2zgah4sr3ns3zimz6fcgrxvfta1b8f13oc0c5nkdoup6ybg5sxbf1vo27asmbzgctdee60p2mtks2',
                proxyHost: 'awg3cqwznzl3plf7p5ift996i1w8hrfw9qfmtfbdc9p6j5du1v7wx70bcvji',
                proxyPort: 1026901001,
                destination: '4cs0vxibrl8ks1exanihqg6mh9n6jsxxj6393nd0cqjytkj5lnjwtz3s7xjr1yyuap3w6rlu4uve0pf5a3npnekq37k6f6wel59nrm71nygvx1vqlb2gmewdgkwt6c4l5pvfcg606wzpsow4xgnodkoggdwn8348',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'o9637m9ynojnz5p9hnrtzxoboz8c04qxi52unq4mgn7m4o2jgdgwmzpntjnxlamnhx0y88rhxh1bh76wfyi0iw465xb676faldcxc97g0fqf2pto7mpn7aa231ffjqqinvp9c8vpemyc980za3ehbq16mffuj2vf',
                responsibleUserAccountName: '67a2ufrpa4cfxwaksjw7',
                lastChangeUserAccount: 'kfe17z59gpym0h8fkalp',
                lastChangedAt: '2020-07-23 01:00:45',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'pqthm5klfmxauao6wnblvqfs9ekxli3k4q0cgxy0e24bcyoj4k',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'yfkmmikmavn1uapu4illxq6tz6qhztas1xpm1gqy7pahiqvfvwjgd1x6lsuosj5f20drira1n7ykyd3u28p5q3squpk2b5q545r6uvg52fy523up51kvh16e5u2u96qs2fub5hvosiih098k1ijphxm4r5qi99o9',
                
                name: 'a213812z800yjcsr7ub2ush7r6wk4gw6ko4ey6apbx9iq87nr6ajwjjr561wpmao5ab97gvw88tz97o57njwwpoca4hdkrjxm5d264l1rx0zuawec643j6w2t6no8pjur353t9s828y643ebswe1qu1bvdsfnlyq',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'd12ihek5nrn1k8xyg8c18u9avhelta3e4vunjhe237ddlwzdi6sz5tlpbyyszqa1k3ns3eahcyxwvcrcjmnmxqpe18vfa737wpymxzpq77znkcod37d45ji1keu9wn9v6fsfavn0wllbsn24j15k1ljk9g02lnwg',
                flowComponent: 'dlbyccexulylyjdhb686gjlj59m8a03k6fvqz34vi6za1i4gz152esr1bgqujr8wksdnlk5dy4npj39i7yb8q6uuyjwoiprewxdv6v24a2xpws5tzr6lcj2svengb6e6fd12wt7dtzyixpzphevm53zmt74239iz',
                flowInterfaceName: 'nocjrfuvewokc7fgg3ddp2sct7qmaarxspimg8vxr7l5saw577hn7pdjc7l7lgf8dwish2m17sbqgbw6xd02vn5l7gncotrpomx287niqp36qn7jew70ly38c91ux7lxhtpb8l0bujbhkwsfm27zthf0lewd6nso',
                flowInterfaceNamespace: '24xhhirfec726tzheyt1jjb93m13rmwo75w3216vqd9spdlqvo2t6x9aj44lzc0peue7wfl6cq70lbp80znf4f9xfbhgp2i48dwydigk0zy8w4cei2g5rc50yp37u88prlsz5rr40e6vt6zgxeowb2tzpe7o5hk0',
                adapterType: '8j9k8ihgwwfylfieqd6iruj4hieugub8gpm68e7zi1dshy70tpgb8f4wmzwz',
                direction: 'RECEIVER',
                transportProtocol: 'cax1kpv9llsmyd7yt7nzkxqqeyfv9xf60q5a9n4jnk5kj7oasydgi2r6t32d',
                messageProtocol: 'znmxzcjqhcw75cmoocpxs3bkubdhej2ltt9wsife20tsp46vtr1ai8mzeobo',
                adapterEngineName: 'ujq59h4n3t3oow40jgl19sv5ogu2q6amiy0jzvos1qyqzukxd6nbpgwg6u2r9t2kvkktyyaa3a6a79pwypwwbe1knqar1xh9rm4xbm38sz3d4h8rxeyof42l6uzmshczm5hbmjusv351rw8541o95l7khsgq1wbj',
                url: '5lh44k9vb8e2mpdb6avgu4soqa74x1f9uibn7tj6sbedj35jezs2g768rcbizkpps0w3ncmju3l650zt6w5kpkjnc0b4vajbje11yjog6xdu15l7ukxcbc2shsq8a4kc40n3t6efx704bnr3wevrhc26m1zo5qexk4647gphjunm8qjl5r4173j1ie1fjr5bnj57ek7gat3z5kmzq3xt3fa49fovgzyv4ksu3y5erv4ip9xsn91t95qm9eyjy9wbzel8j5t68k50g0p1u03uqf341pkliqfsl7qdu135cmn4mf39l5y1i690tii7xr8x',
                username: 'fnlx02uqaol24ki9jvneym3n9prf8wyautk5e0k4adh29hw7rcaopwpnboxu',
                remoteHost: 'umlqq8hnwato891kxdqnh78s2v1ral2sknnz3xfr04h385jpmeni2211nggj49gey8ro25vrm8szixashmwrmvtqxjvdz61soe05igdypiqjdzen6sewawa89bljol67gkl8ypcw62kp68wwwyf3f9pa5i21atpl',
                remotePort: 5184490286,
                directory: '83u6oq9u819bz7n1yick9i6k8l76ohlhx8ydavupyp12tv7qve2ycyybc1hb3miabqtjw94tnzlrd2to2iaiz50us0fe2s6348agoeqw7dg9mszzx6zhazoetynteltcmsxnmlyniyyzlcgeea17mvq6s61l6fm4vwa9pbk5e31a824ulbjdz15c41rbukb2e1puv5qqwbv036ntngo8g8dj6h0zfcwzqo85scsaex7jpcogk5ljlhnoq3a4beire2chvnjvl01shsf5qj18bg45k3w0zs7lpz2zselsry2k5smhnmn0fipgiqbnoepooxz4pcza7qkb3dnx7nlt9ntn5m3mbvtsvdiv9uc2qml9d5ymjd50x3iftnn4xy0jy33ukxyp7w9x01sby3t14s9pk1tawm4urph8j1pkwitnl4m5hd6d4ed9moibdkov53xrw2webi2j1xfl8qjtbm8xaebe1l6mgz1t9wt218nypnzusmceru0qhjvzjqa7qaexd5mmoeq0jxzfmom5wcz33zd5hegba8vtvpxqx6ocljcb6yldgdk7esy6bwy4t5z0dem3fosa4p1vdu6z9jdfgwza0nkm3nl3x3bou63svp2gtbkpbx8ugvwm3ujdvytp2z3rmsmemkxhikji40j9skt136n6ntj02r0zh4djt1o3wjmaxk10oqfqkalcm6ccbl5xt3wug3t79o6sghumtc9daong9mlbf8md9elnykb05pq5177gvaglvcbw1tahjseoosr8wy0kj3ycq3btfv87wvj9mtsl5ap4y5wdxsx8r0zfpyaboybhv2omo5q3y5inpe9sbid8rkxnv82cbbj9wed5f4ni7keefi2s70j7dwy3ojl4002lsnjtdcn6n3whknaufsiws6ucuvsg3f38n4jnowddqgdk6nhhuoad2cilsfmf9topdcm1swxws0uu8ogde1bg3cwvuf7fznt48w0qormfj2to2brpw3c31xqatxvuhfxrsmho',
                fileSchema: 'sotbh386kq7gq5pbnc8oyko9sc1vsvn9lele0svnlk6sp9ncni8uo9qyfntl8h97jgdj717pxyl5jh6bhflv2mkuyv0lj19aid4bxz5r9rkzrvy3nzv174xriyl564azjga0ffv2eactkbrb3etnpduejlc82swfvl8kh5vr83cxrstvzj63asdlb6saxqhblkhac3wwna6rd2a12x3lwspy6p70s6u3yy2n7s80la9pa7mc9mnhj54wdp89nxcwd00sw7yhi1kf7gzt6yqged2n10r1vjisjnvt6yyj1rmvi3f4rhwpshkv65xfol33dsn9ifzgetpz7h3c5ummxfqv3kwzbrk4vupw2r7rht7zhhpkq2wptkmvowxvsil9o9dkynxhfaak5dqpogqfrm3aj8110j43y0sr2no4gmhme6gipqfea2g71iay5f39z7n0oqo8bfu1zyq98yke6ov8der8xb64vigoov2pduj5wev778atqvjdqdbu5ojuaocx6bbuppb1e1ks26qk089gly2h01scvljq12bp6pszyorvc3y35b4qd68xqyp6joeax9zbsia3thbkts6eo0ohll8fpczkeacxj5ob8m0esznjirpcrwb6tiil9cj1mexjpv3rsa6z6ugatw6ayrd9fofwjzv5mcq5d3b3xznwanzuhjzojk4nfxtohncrkrv37r17t7st9znioebqv064ccxo1is59uzhx0mxe9kwx2ibt6hfpamdeft35n1kt87ndn6yezde4g4p5po8q4rhnml5994deeqv4dhvo6ekgarhh3004zzkam7jzxd50xurab6l88y2alanllzacoq141y47w7y02g6w78yediqr1f7c94ub36hee95vhh02vly535rlji7f9yd3wihl0auy7volbt3u7s1ckw1vsn0g082css10mqbyn732efwblafotgtotyz1n7pnqqttro1zb7y31avu0qd8yymw75y756h2r6f5pb45h8shcxi',
                proxyHost: 'hajtkc1bchnadrigyjhkhhmjesq0b7t9h1migax4qlbazscwcdn2z96x06o2',
                proxyPort: 6944104094,
                destination: '1jj9q8hkfricby2lsa8myc6zkp1jsl9gtcmlb8k7fu50gpae2n5jzcyg3v071uy68clcobbkd60b1hfeloxyf8ym7xr8od56iv0pjwfwxqzeefqfg6dah8th0680bq9gcysweqatkg8bf8pcsai19753dqwfuoot',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'b9r6gzmok019lmot40ksq0bluxow2s57pq6qp78l4r7m9hw4ce3i79u1yijqvyi78qzirm4y8ch4sq839dn7d3cro3h38s5ihx2dxwly1xq1gnum9y92ya509ngel4robwcr50qzj7gwbu2ptxdlvlg6r3v5lose',
                responsibleUserAccountName: '7khgyepfjty9v7qfps7v',
                lastChangeUserAccount: '2e8q6jpfjdzjoqn3ey4t',
                lastChangedAt: '2020-07-23 18:25:14',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'kukcixr6i0qg8e8epxaezi434xd2ycoku0qs1xq8u35t445ay1',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 't7ife6pdju7ji2o7dem9ip5ijbnjkld7e0l0y2hjvyk9frjo4klscz2c9zs9whrw8r556qrwhkpve9e1i2i72hwgaq6r3zp4f58s4m43yp8142c4yjex8mheymc3hv1uyfe09xlim1atnkfk7ejtlmdjx1tmla11',
                component: 'ipjzkqksf7jluyrmd4nr9xxcgjts1btd7ect8k3ctz8xbnwwg6st0nxn6jvsqdtyx57akdopfylci03x5ohnvm46lrislug5t9uz9t622csz7vzov03aufnbe7bc1c4xh77oa20th93x6k748tjmuc0r5ta3ky32',
                name: null,
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'qtor2amn8r0kpdajdgg2gnh9z3rt5lo4ec8c3bqyihmd1q1t5x6s633urzci5u0durj07wkj1vfu9sxavcl18m74arnsspkwp20v204hrj38di9m957dugtrkvwdbwi2y44wywrzrzfnyd7e7s55utekahmh6vev',
                flowComponent: '7rjzsb554x5bix4wgid4yt3x5n7q2lcdpzhgtl52wezzeegdwf4gnofmwrfad2279e26wa63xli3iiou0rg60nsxz2597o93p3hhtgfy3nlbkb6sll0ia23h2mepf5akupxutp25qi725qitjfr61pwdbu2misms',
                flowInterfaceName: 'l6ni9xdytvj09kqsgj94mo9isi5wjojxlvtbr9rqnp02smabvja71l3o4p7uleevjea2h5bkygqndo2ji7c7fay6ivyty9m4zdn0y795kflql6kig6m62yb9flxfxacm3f30sncy4qtse6nmdglj6krd7iuen0c1',
                flowInterfaceNamespace: '3u83yzdv47fsgfn1td69x6pkxg5yikbnk8kyj6l0t4w1leqtbuv5bf9hf0du7kofmet0g482h02py6dbbcyqz1b0epab7v9ce4ybu2b7iwokp4hv0akw5ss2tgale7mtp02kuh1h6u9rt25nb3bgrjhe9zkk098x',
                adapterType: '4vmrye6gqgzr6db3a0j37dupsvt14148tniqzfp1c5p2lor93s3u23150v5a',
                direction: 'RECEIVER',
                transportProtocol: 'usce10oedf70gs4feztu8iybfa99c9bse4q8kjhy7j75gjzbjlura8rg5pjw',
                messageProtocol: 'jg9atxnectlc5wxa45x2z1a6ca9miqmj4qe7jsvxpdogavv92gmagprruld9',
                adapterEngineName: '2x41ybpe0ntypravylgd3a91ipad9uv34vk5ewiqoqxfaamxjrb7mehck1gi7cl8bn44g2y3wy2tnfmz9kx0chijukxhys83a8zrkqdfg6kbzzgnq5rps3hazq5r3gs8bzco1pxayasrdg47nmnsjdxkwsb35okd',
                url: 'ihnm3hjdxkphhkbkdsk5ngnqu9vpyohb741my7urlx3e4hiyla56opvvbm70i4ivmv4z4gxz4tfqqnqx6v8voeosnu34e3kxgx84zwlfxspfwv43p1yo5120ut0kcsx4gxiau42oze9ctyohjnunl0iuq7jwfsfqahfojel0xagnu1mhoikrk1nleingd3goadf8dfz9pih4qidp22q884y73sy0o1fh2kfvlmp0qe2ucwo0pipgvjvvlnr7s51mjp4jf4fnczqg280g1ezhjodzfp2ybc9ye3te2wauexv8ekghd6xwldep9xejprsw',
                username: 'so5dpkgpwo8dzpq9012x7llt76pjnz9abm5tu43uj3xelqoikvckqp7htab4',
                remoteHost: 'cl9x1exyk9y82ahxtsxmboilxh9l28ptsqlzlqpfb7k243iv7hkfxn1k5j7ji106ynkiqqnsv8aywogatm0xjpkgn65wk7zvz9tjo9eg3othw2iymxjb8vxr9wozrqc9vskp63ta969zjvpcbtxr3ookp1k53sm0',
                remotePort: 8996197133,
                directory: 'qmf378d6rc4u5fu9e18ia6cnty5bnuu6jsvetijhpdffqlsx60oo00l0p14j20hg7uyfxliyss8eu2p7ek5d7km60nki1n3zs1a5ounis5ufe9hf977wi6j7yf26ao7svwqbcvw1kz5y4gdtj0xnddp4vivmji5xuhfp2495s2hnbm5qhrdizqag72rxmefpjl9h0fn6vc8rwuymv9aolr9kh30j8sscw4d9snksy2ye6gz14g6sbafc1gkof2yl8d6q5qgr28wdzr57a7lpes7y2v39diagnjirl9ty3wkj6ee9mp4zc430jg6mse2r22610yjp2qe6245nsha75011m7wl8n1nigb5pdysqkyj5wkpp38bvpqsuvj99psh66r4wfif4rwbm1y2lbveuz322y8c2lp2ikzdjqq47hayk8sa6cvvwoft2htdo2cvxfwf6psecxtpkirbumcb0k7nqpzc7gkrx82m0r9p5f520m00c98wd0pagz6yf3jbrpcc0vvo672ze23uaar2ktm2rhrja8986c5e2hua1cigygkj4l3m235wv1egbyqml298n1z0moyn8g39pn5v8cbi7e23d79gog7vmzhrjefkgjldejooyanfy7362zog0lukhv09qn1fhrohzwbzeoy2lgalgvpx595z98mztd0qp8cxq37lpvzzeyr6ccbnen7trsla031ogqu26mygxt8rtsvs0sxwt9c7s3spenfa5l8zma2p5diqmgv6boc7uvcpq4x0956wpqaq7knrno08f60c0ytp8ztuwpp58zxcguovi4vah470ocbizpwxa4sq0maz5n29n1ifamscmfz7dgyjhjrryqg8e4ihij1v4r21r9nd791ipo40rb2w465hlgp1dux3zt064j0t2fvfbhca05jcscy0lu2qtkcfq12o2axs471jgvzhba2nkw2l94g1xrtdrmjvvnbzl0hxkbwzaslgjkr94ia56ne6ofpezbiq8hcbv8zximct',
                fileSchema: '8mb71q19emcjsgo18mr3m68q3vvyybdzwqes8nktlfikdclsc3w2akg4vznogvx3hihfkd2g4rj2e3x3c6grqfwiwt1vhk5q8cd4waw9yipup0skf88ollim42z05j3kxvwb4i4kzbt2i6h9s8r26umugo44k9b9pe5hvawx6gff03xcoovcyupixh526bkuufw3fnomoqq8ilp2qmmsf5tj8h8xcgoj0qwlesahkgcvxk5ty6a0uiqi76aspc6q8ezcdxk6ak8k17llokt538d0kvlr5lalmhayqot4fpfo96enzig9hj38mwq3jvz3iv77rgvr6nalj846ukiah8yvuo4hzyj71jaz4cbnu9b21dmaecgl0u0oa6mqkpid2dihj9tnysycqsigprulrzaksukywqa3ikmpf0mtwfocg8bo564nr26gn0zifzq3wg6ecycs0ovj1q997zxvxneor8gs1a7gsx84agtprxxlmmuuv0ul3rxjtirnm80nkc9nbpp5hpm7meheevcb7d5w6xinsx5mlkqkhqdoijooavzvw0fzkums5r89rpeya28cj3qx9neo1fxfvzt33mvugm8egdxp2s8k8b9thgqxvim9x4dgvvyucy78zx8fj1g9htmqmzb1oqavb7gt0bbqswdzyq46krs9lad8etr0nm85q7pq7md6hykmhxynih0duqqqpt9gv7x6nzam84nwcwthf3eeqnirpryfxxm9mbvldfe1ehjzpwnnyvmov4unthojs3a1mzo8j2amw8nec0xaz7f1ldmkwoxd0zeyplj134e4s5o6bckfovkzqfupllp1kbjzng1fr4mrufpigzko12yzj8c8g7evv0lbo4hverxo6tonykuvm6i2ufzlfara7plqickd7eeqar6civ8ty5wb86ushspwew2hzschbdo31qgfihwthg5svfg99g8fthdj2ga17qrl2a3zlli16mxdgq78wd49hi8sd8bf9tc6lpo8n4n1cofj',
                proxyHost: '6fh1k91ti2wb68p6ft3isohasipznrharc5pfxgdrj6e1i48l0kc3jgn7p9i',
                proxyPort: 9305772134,
                destination: 'a4g75cemipu0blbsgoe1d7ov6x8vskhigkztj8qfjg9mxd3ovr2nb1vwq2s5z2a0gg6q8cgh38oq9mpqwf0cn44jkneip2ejfeyi8vp77gmor6axlu4hvncbktzxc3r0r5pekraqo5o0amdnxb3f1to5lfzgdpt9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5bxzak7xdn3iu326otbhsmellgals4vgt8xpndauvuttznadyv0erq87rgzti1xz6614vpae5zve7jaailjwflzklads4t2nb5u2166zbsclhy31x1qzg4mugoklpk9yqzidktx70hkhvriifk3n0dx1udiovbf0',
                responsibleUserAccountName: 'syrio7pntw76zf98wt9e',
                lastChangeUserAccount: '6w42rqxrbboqccsnspwi',
                lastChangedAt: '2020-07-23 08:57:29',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'nmbf5pwoz4j09wym7swijfdkw4kraaz9s26oow9uhoxlh28pjk',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'sh3sfsz0na3zvru4t8r9aellabmdrz1n438rttggnqhs3od846tjxmo4dxpn3hh82xby8l66q887zo37y2boy6uc6k1mwbhv3k5k9yedkqs53or2lkxavzeqtysdmjs10y95ufid5pcuc0fvc0dvojxa1h0922jk',
                component: 'a2vkbioa3t8q4qhghud4pjhk82bnfpniaxe3q87kbqcfjruq5p5ek7j6e1aewagrg6vztjbdxey57ngbrdir2pbvk7fut0obstqmb9l2r1uurjfi2a5w0iy6ykhpv35tka45ta8qbywp62u3xdqznwmuxhzsvcpw',
                
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'vvoedpxziwchmd18rube74ksc3ijc0lbzt2u9zjr25t5c80rtl36acnl64z9r78e4m87hl9jn26ora21eu1x1kt8783xn517djqk2s68pnmrimi88ht1t6vujpy3in7yv0yj4wictjs7essk5u1e1ak7x7vy4lgm',
                flowComponent: '31sc4586nwscw6f3vopg90b2tcsye905vg7udor6i2bbmp7811y90g0v5um9m31b0sumjv26evzitbrig1sjdmkqosm4kh26gouzz7g1v8q4xv68zyhqhm474tuw9zc0s9e2oonpavs63c55q7se286tga2ywa5l',
                flowInterfaceName: 'wu1lrg0vmusv7w1m0mluvlbllxcqyn8ikhyncd3s3uu8tavd1dht6upjjxqqzs75746m0q87e46161hguok367mkuctlxncqjp5ozqalnsac3hjsf3ap8uatagzboucvnbwp29g7q7ecxwsmqs5k8r7p52ubopmg',
                flowInterfaceNamespace: 'cybjfspmwdikvsnzksxj7ig4qhywl05pvwgktet4vtw57q3x4hgctcfev59m4isait5l1uq6jghn2c2y53fhgn3zcmoaremq76uls0dfwz6rrffgt7resmqn0j2cjgpxsha22leqiqdtko68nozaj8dlihz1izkm',
                adapterType: 'vjsyq56g4t970b2750d2cwixycjo1rg94mww5l4km5ylgbbrllcyu5yy7zaz',
                direction: 'RECEIVER',
                transportProtocol: 'bozar6akqssmk4b6xafhsbzbz62ccodo0ribuem1cv4axjaurra4dw5qvuj0',
                messageProtocol: 'h8drtw779ypbyq12q6bx3tycr6osrucd90ivac4wbbrjusa0xlryofb72wst',
                adapterEngineName: 'itfv91f6za1yr0xhkxyr0lgmwh1naxcpxi6noy1iav7o3g58ekkupmgsydqhw812gqk8i0zutvu7qie6if9dcllfy7inexd45pod2xwft6d26jv5lqi16tyj73el2sgte904f6cga3ef4bqon6guyb3svih99raa',
                url: 'xy1tz2p2wzdc3xrps3ah2whantwfn72fksc33y8kqpxpjiuv6p631h4zdj76ksa6p50mdy9nkq6ubnd0uudkc5c1gejq6vuv7xgeqoxr5bmv6e3r21r4dz33qfvkdpbikbbfqvb41uladjzu11e22mzm1q2ycuwhkqcwc0p4qnb02c4luq7d57kilwlofg5r4y258frx627eh7yr2jahk32lsrclljl3hrnuy04v2ilh78rvm2b5gt1c4p6hfzraujukv3psf3726nzraio6cn76xxod8z9n1n0o7a00ch6bddqg4mgc1uvcsev2mtgc',
                username: 'ecrgjg68zsok15te6oawtoxolex5ybbq8wioeg4c56etlr1iek2gaqyzhz08',
                remoteHost: 'b2supw3zprvfc4tsf1chnnvumcr8hkexu77511u80brb2hl79ewffibze8l6x7bnblrcvyww7zolhzdlenn5mkhp27oprt00uj5906r7b0533by8u5q1n2tej5ejxnzds2nj7gakvhxz8mq31sfcb2v6kfaz9d5r',
                remotePort: 2565217068,
                directory: 'r2omxsx4ifntgzgmfiwf9p583j3upuujw9afzrj3dquez3hgsy5ijuxv1ldybtf32fl6wsdh45goynixfukh1qeoz8nyt3vhoi3neng4g0u4izm0fsrmi4z3eg6xnonq14af6cy12l4pl96pn5piaiqzjr8m6qiz8yp53r0zq0fy7bulzg1stkszyfu8rpzf3x8dceklpaeyvl609rfpc062m256c85vzt2pzsaabc0w7qdidmwhn2qez9n4s3cvd2250jd8tm9m50lv8kckt7txjb9biql33296j0sg1iwwfn7f1um9hwq3mqaanmaovndarf0pvmwvwvpii3xxa2065yu4i7kc85w0tl6um8wih8jpw21b7dj7ptn4ozfzrqjgj6wtyzayt4kqza2o6oaltfmk2lwjw5pyp0bj07dhtu2tg24y5hle8nqh7fevyz588yihwq7flsb7e4gkc7b9i8ni0ekphy11ple6u307htwi9p8l7c1fvgieynud72fstjdlneqqok6fb2714zymaz9qeyl8e02dz9g3i3q01yhlspytepqgnon1d0zkcbp153ukhoff70no1sdlanwrgxt61qar4uifqtyy1wm6zvyz24ntyqimh5d6s28xdodgzcsk2mdd4kq3zh3k1r9d3wgqhwmlcxwaerqhza5l3gznsp2ewoxov6qqktowtce6wrf63dyxhpwxzhq5bx2d3zh3fbshienp4r0ibq6xbjdcb9qzqevx0yvjaezv3iyx1s5i9zk5b1auqw09xyruct57bz9fsk13iwyccwdkbnae3a8qugp13a4frmsi1xpfi2gg3vbk4drafk9a45nrivgowvfja9pv6eyn2tkpjdeaau9vzim0uianjjfsks298fvt27er4qre2ly32r5uljckilk6mckzex0doufs5jsbsd6vavuvdsnfsiwfonb7ghvnxq3clmeq0r1dlnw7y0nytzrm7gidnx5g98y6wtage5qvokk733fmig03',
                fileSchema: 'v2byg3x3pmgq9ue56lhdfutyagkgk346lfkx6e69qw2p2s2yhsa1i94ljcdo12xf8cqidbgueykxlxdadmuqi85axq8u7cmow5hc0jr5ryboxhb512l5zd2sprmxqhhpzhfdfaoxee6d8egh1zs2otnu8gjkydokytfkczk6fuhupildqlc58dabgyan7xr3liy7af75dy8kecgemen5rfso2rcmtjetuzy8lvys9qd1xnp0zbcbtqso1mh7tlpus3ol4xdhx4jmrjyckqn419en1vmz2cia7s9omhyon482ajpjsov8g90alsmpt131dylq6i0i804wck2olqigudov0czd53y6jg7ya5ut5klffrt8bmjef7mc6x4eh54nihefk6vcgtk4566untvrqmbynvxzomqzykgihnvlt6gxol48chjpim4ez40lls514jjhj0nhxcd62721jy9cj5hq7dqvd2z8qy7yk20134uitka08dtfhmsshw5150tgil2v13rind0exsj4xemrpy6rxsbguzznyo7jk4b74k5y3bedba3olpsoxbsz02z4anszi9c2oe0zqavzqijzbnyjnyk7swppxr4kqm9qaq8ria8pf7qic01ie0kntjjprjy59vn6lzxwt9ws2t7cxegz2jxnzswbxtrv7bubjmojcbmjqyuw1a85r7mvrpaszq71kflvs6bdl80qxfsmp5lpnyrg20zhyp6p1wcmafmp364tqj2z5v9sl3kj0nic21arsrl0zy7niwqpqphk93xhc5ni3ksdnrqrb4mwmvlqb89ep04mmzss44leo40vmsfgv2nu7mj36mq79a5og3l4rk8ghxhx0uss5akt66bfwqj6tr4on97iusq65seulkzdsz6hw1oc0fhwauveavywhsfcp4658904cg2pp3ei7sjxhn5z1nq5msvl235ra9zm31k977gwhw95zzacr3wbh810d7c1sjv4ehzk37r6x81knyn6dnhtf1juapy0',
                proxyHost: 'azyg2s44a2sz68yfit4s0q15sjmwzj9pn5b985cggupauvjrcm48kfm8gde9',
                proxyPort: 6910066767,
                destination: 'a6gmb8gwhj2fdp5fiu3a38dhqbupr60rca2hi6dmk8m0ecqxpo8qzs768f43h7l9kmjdon8cuiyvf0bmjbgoebusfcraya5pu1c3poeg9mocgztnmhfpzvftqacizzl5rsp03phl8ahlq8ve5d306ota03m9q09e',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yoqhrvehvevbp088kbebpsh0a9dst4j3k585maehfga2m36ttp5hjgvrb60phsyi85sezt8uy0qmsd8p1shp1za9pqv2a009eou7c5jpca52xdedlg3alcwhzfylyklpinnzpb3c55b3z0bxqunughb4th7untuc',
                responsibleUserAccountName: '9ikcdttfe6yn8y4qbgus',
                lastChangeUserAccount: 'v0tlpb65krahf3z04ana',
                lastChangedAt: '2020-07-23 14:35:22',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '3okpje47kfh9kqkmyinrdfkjzo8d4mwvq6iyk4kmoi75ofkx0z',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 't40oopcidph36pvl52ebzmbnhcp64n3qcvvrs3fo48h7tnsy0v0w76pzaupd56ngatc6au6re5q9fd0sq548zjulc6xyfe26w1ai5z5x9r7e2dx980mfvt1vhx2tkjgd8f9vy02airjbxtykzuqh3iq5ohmdzj4r',
                component: 'u99eghmvlzg1h9uj3rl5izi6rhyqozs9vmzh9ojmxgfc6uvidbumtukxrjv0ro96c36bdmorj0v4h5hcydaddvojfrce8lbfnqz2qclbud35avbtvhs9klqtwc7gyi12k3fvb0zel3plr9n40isp8ejhal7jacth',
                name: '5ywwse29t6ju5eutrcthxxdfv6tcovol2g51e4vced111d4yj5hq9r8gvm0uyesosdeqfepik576s26nx6sl3n456qsqpxk74uq1qm0urob8a1jwf8pl5fu60ko2z72bpkmqw6tcdtteift52u8mp8cp8n05u9om',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: null,
                flowComponent: 'fp7oo868pit2wl6fjlnrvfh1ceo9yaxh54l4bidkr3mv07hfmt9nzrfqhgn50jqcdr9jbcje8nnal56h72yh3bmjdfowllbf6dx5by4ml4wv7lim4byqlpawa839eem5oba5ghtn6nf8bxdjzrjf7c7purj7xj5r',
                flowInterfaceName: 'bdmi6wlsxc3z0oa91xm8gemdmvh3w70qxzuzngxym0nyle679mntlbj103uo0fs7id1flgahopzntdbfbaqoxit32d4xhyd9mrj35qikhco5bv01johi8pqt5wv3vmaftcvnzjf8n4i2xbjtcw12u4co0ntah1mt',
                flowInterfaceNamespace: 'yh2isl6kkyocdgm1gvw7b3l95swcl606e7sx37zftfrpjbo8yabmdv8cyrz88gba39qwl7zdv04813fz0xkz3sp6dw4010nnjinie8pyfu0nzathoavydmvjsujc6qtqsnfub0x2mxi1gqtj2yzdazva89oma1r3',
                adapterType: 'pl2x220sz2802rr7kl5zbftwrmjoch8gd4dk01mae62mfwfebq1tbj1g0aes',
                direction: 'RECEIVER',
                transportProtocol: 'ofifjrag85vgsrxqgu0untt1i4hnee57wcmyy5jhjr735f6yitz1c5glj0ns',
                messageProtocol: 'vcbjw96sim12xrfy8vlblvhy35n1aaynzfen3sss3dnzjxv54fkhsidlh1p8',
                adapterEngineName: 'o4io14g2ll3half0qway1q753skrzk3lc8603tomvnqdkdakstsg0ree9742hbx0pw1pdaxlkf7qs6skarlkbkd38t32obb326bum1a8ad0s4r9geofuej9s0fh15wxhjwr880h3h20e20vdg64vhmphxiehhi58',
                url: 'tme38i145nx4gp8bgkddyxcrnc5sm6wiwsx5fwoypl6c4s608unoew64yiquvu3pajvhth8unilk6dam6fgho4suz1in920ztvtadgxeh4t7hn19zh2o8o1991qunrksm51jgtxdkyq81sggyuw9gvsxmdn6tohq8gi6k43qlsonbovwbzz47w1aup8uzt53l278kz71eszlxxvysjs1agfponqggyhzmzoh8u0t95uczbdqvdc1aigk5eq195o7edzi1it8vetah1z8wkqqhg5z5s71yj105teax36wxn03rtwkcauns6m4jni6e2js',
                username: 'vn3f4h631bhwg8lk4e1kf1z9f2jq2rs617r1yfm9d120axbowjhthloxkgne',
                remoteHost: 'nfkuhp1uptasurbfl42042u24pgeemagbba3e7rq291iycwld0bf5zlbkrz89gi59ib6smunca8c30en7pd3gwma54j1b3900ust9ci5xao98j12j7onwsxo63duc49a11u0k1dpygvpgp88jrqn2rxzwi8aypku',
                remotePort: 7062057494,
                directory: 'mix8halmaowlhmldbic9ipkyygdi1e403r9kdgyx93eb4tvhfagr6st4z0bgzhad9orskgrdm9rnia9sqjehvp0if17r4l9jot1tgl0rgbvexjmdf3d0mzl0n3kdqwuhedkx06b4htb51szmavnxcpu7k8o1dezpnonz9pommgcoun8c9gyryrgw2g0eulig2d2g1qbuv3jhw9wkgdogeybswy2wclrxnagxikj6jqrwid8h3c0tw7n8c24q9l8n10qgferex4089v1ifsxyt0hqueglw87hri9v8pjlzjx89g5iincsz0ry5l0ovs96qc48g0b4s8kqim1wlxop293gyuo4eg7ijqxfpxbq0hkq0a21cklllxip9xbnk01oyom5eguzlkw4gpaebpq0gssjd7e0sjeoy43pema07t188kne40hcp3mymlqxgkqdx0p9skre5yvft9uu6qzwau1slk3ng2tlh7ejjkw4mh1bizxrzoaw9jhu2sqwz5fcfzfy1jmjvg7er4ip59hyv9odn1tbduw14y7qsh0z10n4ldbzqpi860nef4mp03x7udsxjenmcpner8b1l0i8tz0sq8m8lll8tltax88fbjpylpezen958lctfp8qjdwegs2wc5ljrys0o4a36uh9e2udgdmf0rugwjkjrasn7oc1ttj7tpfvdsfc528mz6oaxtnn5x8krfs4ytafdqcnu9mg24kpnxdojsawof2wvf1c72o6mpz5yc0aedu0gpiix8ky5txsnev3n2t1t4lpcrfa5ded7m9l04icvsr3gu44xcduxyh7l1yt4a3jrbnxugkrd46c5wfj5eh3z70zmitc8kmaeypsamnckq5zux9v2uh6vos4yesy12qho7t4yk0j9r5ceaz5pb8s3fjawbwchqeqynbx1nt40evt82xf8l0kq7fwx7cfquzoofu8ti6jfvky42n95kvw4hepyt6jtzswt592qvmms2vfu21f7jkgtb0y9m5mri7p76r5',
                fileSchema: 'bpyxwxel7k2viwd7jqiqepnhdii4qluapflb22tgzfqcis2cloegigyqnaz24ixiosqj0jc9vlyjonua5h524fp7hod72g84ltou8l246t5bf16yzoxl6n3d4rl62vfnk2kqa4seufzgzhjvo0oa36996x6iztfjspbg3h7zi9sscnko8y7g6fbmqmu45uqsiz8t8gnkvwn8r7vkximnndfxp0fk67zwckk4j78i0m8th2imjmyemtzz8cyyzgffbi6qeg8iez3dqrm5dmz4ag2bh09e7sqsz9oxjkhj7ybr21bwd5h0xkxsxf3a612f09nylnsq9c31xs8cxnlnkmpeiedocayack6ggpuzisfont5cnfop47z0ibj65nvtyxyd1mhdwhvz3vnaipdmobtz61m8efr2k6nw5qgah0wegj05sqkl2mb730dvfcncaa2uj1q9nr0kji9q3we7chs484b73dgc7z2syjv2grt5td2f1hwmtc3kar3z35jef2urlvt1enfpki3hkji8o7qoboyft2wprx2ajsf5q1iw5qf7bhvlvb5ndltd3ag4va46212yq1nv2ev2z2d0up20gtbd8ng7j3chh2zukp4e55j66xomkberxb5ix0ut139ab3ongl81c1rk9tlmxa6b14m26f20k6grxzupwe2g3kct00hd5qhqa6wc9j591p9k58l16wddhwvcrm49yfgvfekamx11jagt075rvgg7l5xy6pneb295e6z30s058ar9htic0ui0zf6v32iw1nbe4p44axz9m96bql2zmcu0kc122q2hfu6mvms2ujwi5qnk0zxznqjg6qdxn8qyl03u2h67fj7w7ivc5q3r5seu5qndp5yk0g6mlnsmufrj9w6vyfjlgur32k1fd9p8fn8s9vnfnthsgwosgwbby52bzenmp9skt9nfy763pgo1iqwcv1fa0fry1eqrh32dxp3vm644pcb5uv5yt8aipnmhcr1s9e59l88w50ugfpc8',
                proxyHost: 'cl39iyuo3eu77l33dpoxb82ab174u95mcc108mp23knsosb9i31fbbv4wad1',
                proxyPort: 1572608414,
                destination: 'k997xmp26ghxk82wtp5uirlley7aeemg5i01jjtmvx8ew8n96w1qq6ipzch7rwinni36ub061c3duc097yk22fxq4uetm13wqjxvj6mmywds6gz1danyepf2btej4cl372vf3c00dv2q4rux3w6yylqhk6h04mui',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9w4sbyvx0a2yl5u3rf0o2jfruassf7uqadvezcmf6lhtrjfmdfsqtxlan7aq2fmwideubbwg2g233ndwirezp7jrbslqpikblkypdxu859lrjcfvmiemtcf6sh9wcdu56w9gsbm9l11l94w2o5261rssvk7hzpuk',
                responsibleUserAccountName: 'm1t7sjukh28w6bk45lp2',
                lastChangeUserAccount: '9qb3g17t045sn65tl4yw',
                lastChangedAt: '2020-07-22 19:37:38',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '9zo3gii2wa47g4eulojs47uhss36o0h0bcggoo7yrewspw8zuy',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'vq67u051y01xca950bsayor7eb9029a7f1x4q8m4lvwf8ljqqsdjze7yvnxhovgyxxm2k963ru440em0wkttcqesboux8ravth7w1te91vq72zo3db4fuwfdkfzoj0zgaxc0uojuqf2hz3d83qf07gbmj0lxc0oj',
                component: 'j3so0kkmr4tjsgiyopdsejrg3jl0ewyryowelidht62najaipyrehfb4l68yh2vbt3fjqxjy45jik9ag15penl4lejtzmsqdhvwhdyolnksvh47zmld7cs2vwr561wmxg3jj2nivjfl2yzdhascb01vpkq60tfc9',
                name: 'aeqrlxy8v7ko7f0vod55uv4g3d3kbzzxi19jfamuuu1s2cdom6k01o1pdgkjvlcxoo14698sqkypvjdwzgnhfvwbv0ndtvqhtxtdl4btezb1kogkljyewx1h56dvr60qdvvsw4e9r6aykqe0qk38c7prrh68ip9y',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                
                flowComponent: 'rocrdovyrzyx5tm57qo0hh3w4hf6zddb701ytnh32t8jtwdj7z9hfopf8e68d29zp1mbnxaxkqhwzyf5q63mfd8jzv40st6e867rymjfadhu20o0333hb54vbdg8r7mz8kynb018tr9ywchg4hev6bdoknpidy7o',
                flowInterfaceName: '9ipzx8qqzrxj01piyzegn88ddzfet4890s9eucko3ktz9svb4c6gdne0s1idg3mu94pb3c6l1jnneo2uw6hyecy509gb6e305btnyvgm7ui4ezrcn9bpdll1tubudqe386x8xeeje39ykrqny5qpza6rmt8218v2',
                flowInterfaceNamespace: '6arkebbfbmv0h7o4wcncofymflj0yyw5it9ef0rfjugwebthayhxqj85x3oqg7mbsnh8kyy7pevi6j1eoodao2maymgozgqr277qo3kpypwufycagz7erh6amez81zrnk14srdvuzg8mf5zlexfwsrfcfqil6on0',
                adapterType: '7qvhx6rciskmd0uul3x4k2189z9zk591ws4sjc1kpd33q0zdk3jrlrymoruj',
                direction: 'RECEIVER',
                transportProtocol: '81jazqzkhqwfux9gek9xqihdcyxwa4lfm8svx1b20bjiysga6lnwkgn4qu9y',
                messageProtocol: 'gwhn5cvy2eq3aoakeiwbg6yptzq85w1hqsj9f5axdhkxyroq1zg1dxtkm21l',
                adapterEngineName: '1d55p6fzch7d0hi14aiqm86rtzuzbo9kw4hcpw09mdcs9seya2m29r2q33bcz7dg5hklv0oetbdrnqxx0ly9kn6i0j597g59fkt1ldc1mvgjiksntw4k7djzu4tongjr0u3d8v879sn6fbj2la0zq8qmv2fw6s1d',
                url: 'vtcl8qa2zfgliv0ito6i9y3w3j383inp7lisbm0gzrpv25o0ot5bsjvu39l4wqd5x2tqe6jrrnhh0fpp17zxp9hl8rkh8gwy54l6878djo7gpvz2gpu96ulw0p666l3cc2axsggol1qk3ubsch5l5gjwuzmcfpmmda3y0ic95lbizcegz6f7axv4anmzlaswxufin4ykmnpq9w1dkw9q02s8v13a9k6wflekcdsenjxcmrs0teymymz3l1ruxkflsvhjwmx1hq8ut6t7czkrxme4sukx6sw0hs29vb9t4jprzux5glactpez0cp46kyx',
                username: 'c2l33huhk6b0loi1elmiuqgo6lyi7wxc0tygxxmauyxcw209drpe62vp2yn0',
                remoteHost: 'v8goaa5ggg07xn3bqfoauaermen2xcgpj4fyir6bvm9ummxa7elmzst46kat9q884b1g9hymma2x5upq3bqlgzuuzpdm6szgi74s1ucb92g2cthrv1ke7pb4j24qwfs3bbpo4461xccp4ksil5ncz8yhq6zy9r3c',
                remotePort: 4003045354,
                directory: '245e01ut9l5kx0ujlq3vhlcfjc0qffqm3m18qsbawn3gzgakae9a1g281r8exnm5fznpmo2vwedrgw84h588x0fbqc7o7bvlc38koa8uyflexcxon4vnb6gqx6sy9d26hryj5pemlly4w4qfqjhtinbkcaobkudfmxizah37v39wingvvutj7y9viw3e8mzq8v1lyp0q7tsd1tjz6r4w5d2sbesp7xuquusvvzbbnkvcxi0u7a1gz3zx7bsvy7zcv5vel5u2ic2kmq0rz5qs3dqx118jqqwtnav3n110dkakiuzyfju3cfviiiw1aah4j1kso71n4qzsrb09cq27s9so2lrt14prwk3mihvl3szfj2o9yrg8tgtlon8r4hpyinnxka44k5q7tznu6o7poskbksuwavzhsa0mluziewq5fjt4wnyc6txdmzhevbdu8hy5cw1orwplke8qqxdgczv6tk7cauzg8dhzm7dj0zilte2r4fph9xe791b2rexenkvof12wpgfmrtkvp79tfyoft0adimi0nt4jk9hljfi8ogjrisenvbtcfopa68zym7zd4xjer8epxfviolo19zgn4iuh9iwuxncsqdubgqdjj7js5teizjtkx1cbo25exy6m78oytff9y83giqg783b5osj6hfgt5q9eeyoac0xm9eqi45piczej8myyjz22mdeb687ffha0hev7srz65sxt0j7329c4bg3f3etp0xrcgva33qxn9416v66fbr4o1cmak9e1utz11xkl73k3x2i9nd59ikd094l92i9yjbawdrv48tc1o27fbqrj65vudvufb4ibzjbfh0tog4z7l9ffh3yane4s1p5fqnpvscm0h7476y5qe4eey84myxtk85pvrc5nffhhl5yjg7kppfp6eu8kpaeu25umizevuus26bejoeo5myloo9d3av77s1y9bo3o9uq6vrbdrpcq44uhjj5qtxax6i55n1whpg7vmm8fp86z183p5yasypi7',
                fileSchema: 'ktx8rnvgw21ee2jm98h63hwc3edyqexsd3jvd8z4upm6rjmjn3978er94940bcpzc9mbhqlf4td04igj8hgd81bqunydvxss08bx6e402hpfsphyexaup5mp9be9zcs9fevh7vqjrdt5pyzopg2lg7asqdzvy70ar3x1ypayordokkbawb3h9rogcd4cyw6dl8jx7nc41wnvjr47x5x3hl3f35lugpkifyjpn4sq6zrjf7yjrr13i84pdsgkzndpbhhvmdf39aycafyx9ehuwwbmtntd9hlepnkkzs7d5con2eckhr2o0fbqfeu7t60jyavk95bbwk757g0fatrarvrw6ui4pw8efbh7af1v6ry890vumvh6zl3vaue1cwrwjk4qqqmyepwnnk2uvgrqt1x5ph6x4go3yzxn7e2g1vp9wjgmwcrb9abrtkflh9f7ijulxatapbh64tnjiy6iryrzhop9regmxc34l1amypbirkrabhlf3vhdiontbu3k0439yqvpz1skcowurv9lfz6z7nk6vk3esyccu0ub9ma56u7c49ptrkw0opeq2thfzwu9db1ttwnq5gi6lqbto8fofroyta6iv536j40tq77akrt2dzpsfmqthwu4i0uypjzsagc4apzdkfs9ebgw9tubr0ouuc6fbzt6gwibwzhkfpnxugt31edhdjkiokz92ypax9a22fgo11pblyk5nebksun9ce2hjqop3u2kzkuwt1c7roztykuv8gr65td3wh117y2f8kolcziwd0n2b02rmqfcoezrmeuyrxh9ybefsrgq9shea0qcrryb6ziw8m5mh47wbfykp801y2yry3r4sri4kn2r71gg9whc40qk24ocoxjt1e8cqvzch05tqmn80osjy0uug4q2k9ap9xmsqri8kciib1aroks0li0wpl0hs4912i246vcujtgkdp3ors982z6r8pna8cep2zxx5si0oj8somkcrer6hi20kabzk5b5uwfm46cxvt2l',
                proxyHost: 'zg49urvoiu1ta303p7rt5us3wrrrkydhycguw6pqkta2icwf2geltijpeomq',
                proxyPort: 1325255114,
                destination: '9wf46od23ha3phxnpayhvjww1nppmp07iagu5tfe0638doeqksz4bo0l4or38oc2wrzyr2igtz5hupqa48mvqlamt3irx9oa6ofzozsnbklojtlvfxlnr8kup8w239c7qdn1eyeo2j1duq3aeqhf73e1ty4hb3ls',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'mt8jwyfs3jwsiekmrqeqn9krjttkg92umlaw70op27co3l6q2o96radwkvvqoezm004alan6zrli5jbvf8lf1xlujubxkcbdirg2ejlg5y9km8tzdrm1bjfqabvodoytbphb2skax2xhql5mddgqpmgvf8nylker',
                responsibleUserAccountName: '28h370x2cqh49ias7dn8',
                lastChangeUserAccount: 'g4shm537aamauzkmt9dk',
                lastChangedAt: '2020-07-23 07:21:12',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'khuw0p9ihnleaxl9mpznmzlpyqthmme8hvrcvjjg2p9qq091fe',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '3f9clx6xszc3x08pf2hvvuzex0zh7fy0elnfgxg0kpppupgzawffvx7zzhb46clf10qsuitondaphi3biof640opdwa4o5yut07a4mro74lopsi0b2hpjsdl46bd1165bezn5h1slsqyhpp9tcwji1b990byi6n5',
                component: 'x4d9ejqrw2yvwnpftv0ytcayal7t4rwim2wfwikertp4isu249n95gqhyr1skk8hz9nf1v1x9hbhfob273m3k2dap1e5t0kcygnyjbtc814w9yyvho7t7yhrnhzdxsbq8u9fco709f0n2ze7davgj8es6ylrdrhd',
                name: 'nugxzf4pr7rlteayvvm29xtbcia2i3rc2lkwv7ptbdp1kijx9w6376x8526zpd20zaxvg7jg0qlp7rdd6rkjllimnvq4enkslh74vpe7ye0owlg1kj1nmzalkj7freqyik0qmkbt6nmool0f41i9bh3udrrb5b62',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'xh8b9mczywl320v3tdhry73v2ty1ipl72dd4y8suozu9yebd0vvx5qbf5zlolqwfomj2lf3grnb62fptaop5335vvt8y6u8py7bmlyzl4quqohdowv2piz6vuudkd5lteaamaq71xdeermavvp0jn474gavgxq2q',
                flowComponent: null,
                flowInterfaceName: 'of5jv6u04x8ihxmtig8iyj6nf16wnzhnybz4835y38r8arm7swd6sn18bbw96jfnx4jdw4s5lhki2hvn6cqv93r5ooihghuvhgaak9h28klpelvpwosuzwlgtmy0vbgb0mj3x99386of5nluu2t5bync0lfspyua',
                flowInterfaceNamespace: 'qtf0mancmeo32yc0axqmc7acbfxdk47t6yom7uk02u940m6hreixg5ffvvp94o4aa1kadh9kbnghmvswwgy94965ygj3jpid7go7tx1jhxi7360h4a3w3q3c9jc3opngyvkzehi58z7n6otdrt4mjmaq6crwbv2k',
                adapterType: '3bdxmopvzfedwpybz1i2hbdk5xqewqh5r1mj0kbooivvrqc079weg57hzoba',
                direction: 'RECEIVER',
                transportProtocol: '1vwpzfjkzhtwezwq8y94lhtdzknpkdqm12valv5fbtutzgrt1c9gwd5k6imp',
                messageProtocol: 'it97er07ghie7ifrel6ldqahqa9vhtd42jwhw9dmigj4xl6xcqsywxp4fcqd',
                adapterEngineName: 'wyaqiftn2x18evuctqhh1bvqiq1e3eeg5eybb8q3lhagr7wv5hooeech81jfix76q87yl8no0xnn3q54dgl16gw4s0aahx4nw1kjzn3s1stqz68sth6bxb2ha8qnlnkwr7j1nfo7gc0hfw6wf5yzemv0t23k0sm6',
                url: '27dz2c13d2ekugqzf3ndtd52iviwqihhatk1ghobutce1cm9kbcpi0m51o12ziv85hm0eqrzvanh1flapgx64p2cgnnv37yteiqjq0pllfrmzfv93tbskxkbndlzoiam2rt9ammll6cs89y6wewojdztv5yrqpv9src3qze7kvdjez9emum5d2qoc2lnhhh1iqdut02ohowiwusoy7s8r60kj5612wvcz5p4jwa6lnxhqeaodgig5a24natscm06q3ix738pzxz65qzdt81z3eqesst0is7mcpr655xseaf2o8f4rxufn4y449ixj6nl',
                username: 'oyv7pjfmlp0hiw60ftoeme3jg7dgr485zm7swmmkpb3utak6tirsgiz57l9r',
                remoteHost: '8bje11hrx0c5ihxz4uuqeio6nwxp94m19mhjjr3r79ih8lv0ukiuuhjvzgyrdo9zhrtrgl63wds94bizfu4ba630wka5zmnb3cr7cumtyplhduuoiu82eriyed7d551dpz1xmxv3ap5gp3cxkaevko5ojqqoazbo',
                remotePort: 4478110916,
                directory: 'i6wxhq4r0y4favhk52735q2u8zuia9s7n01bc52ler96cg2k59bekha8epkazsk7lkh7y8hgzagpllsw1isu0fzybnl5hdywgy8afgorr0w2suzbxfq833dhmp7hx73e69vjsi68gpzdtahjay65f6m2vjno5u5rr0zeqca2fb30f08rg1y0syg9zh411jzej8k16kc7vpqtvsm10vp7lfu1zuyhggs6o4nrhevwrtfign6kgjazypnwll8jyebwbilu5vsk3j9fnm7iis13a0fkoyu26fxnshk5qe3nlm1fv6ot6u4kqw8tjpoe2a84zfr2gyochoqd6x31y73a51xxhwsiij1rfcwwkmj7vzne55rs35ve7trxrx9u3zgzpfr48wwgg7oj9k0c9kfwaqgqaxxv9f3jmdu5fdaw0zehg1pf0qwccgytnhrg07h0qznckmys8rzwzydef4lt67snvynmzcsiajwqdibklii2yhync5z6zi9sgqmx4ix88v8jzde96tiisg7384n8sdw97qrni38lsz2med07wydr7pwmwczehaghxhy5g8tr5xclp5n38q46wnbn41cf0g1y196ygf2io2resnx691px0rrfbmptjvahd5qbk2h5o81vjf05z4sx0i0hl9mxkad7y61ote4idu7nj3stow4ov336z0cm8jn2wrq345rg24k7meyzkqx9r1yvqilzhlv03lesa63kao8dufiges9wg8ncyf6fvfzngx59a3uwecxbpw5l9lulceqn4w24imfj81yrkv9prmek8cjuhodwmfdlzutz496ztzhxobwqllxpb8h4tuxsme52okbl1fo6i5zrzneiyqaa5utboab6ejv3nquo3vxksnb9svoexssqfoykzud4856pcz4020v9zxt3iu4g44ooyj7ma2qvbmxan7p68kd03bab5y3xvxyei8sfr6djx9qi248gwe4nzhe0yzdvgqhq6pv2qxo03c7im0d7pmvbu7me1pk4',
                fileSchema: 'o2ooxrz9swnf1o0nggu1g4dgj3i2vjosivu4ev76858t1dokwo66khn8s1zze613sc15jyczw86n2ef9t9jyvhknfuoncjiiquhbnka4gt35l2rq9xirpurv0sdzi8g4gysgk3puon1qiv8e38boaqlthkacvq7zv843hx7tztcffkml9eczldxhtol34lkp1ea73ztf5cpd7a2ofncywup8qcjw5bu9on4k139xxqelbsz0t59to3d8fy7o480qegnhcll0mttli5nwp7uvu8752amujzccoqml2wnqv4vz426pep1gshjypl8y3idlhh3t26ydhumvk50hhsc8qvwqsjg02hn3o52i9kn9klu9sedb7bfmtq4p6evfpt9fjn5ccbtv5dtj4efejqgn3i0azns4t1db9m5gebtzqhc8t00jbch96lr3gva1c9jiq7kmyyapig5k7jbv3pa9h7dgn3be50jdwv7oi7yqxrp5rk07wr8jniivis5d8cg8g347nm12wk725m5iyrqejk2fy2tnphi7iueunaf7q24gmatn6vp9ckrog8162fz06spm2gtz4jdita7870gtryxuavirq4pywywhae6bk0yrc1d2txvoni5eoi5ost64lxo7fy245ru422qdsfqi6pogjn1ljruof2832xh6zcbd2cblvl6zuzh44lmsjlmtnq4o31c3pexxzts1wlpi0rnevtfzcglaa4ljl6dkcxr47iyrkdl4iz9j8dokw2lhshiussdj16oma4cv034bpamr1tqeuewo1m6ibth1yxwej8zmc563voo2jrq0qtdukiqrto7huy114dplgm2xolbbryld2difkbnd65gxi8euj7hjaonl42zurklo99ftr2h5sixuej8rg0aigyaianf6rh4mqeo79rv12opz5bkyyjkx9fgikocngqn5xw5t1si88s9yhw6mwvdcc3qbjd1gmtfv8a5hbhqw451haazt5cezqbrw9ohd05s8019r',
                proxyHost: 'oev3kml11duqn9qhsifeyyolks39n33p8q00pjf7wmejdtqs6q241e9g32al',
                proxyPort: 3861504677,
                destination: 'lbcfl9wg5lm7j9j2dljyxaszvftvnrigs5lt9ekwg0nv8jysmqqn7rvyy5z6t7sk89a4kvqdsm064kv27t1d4kr6cii3o024wi80cq4ov0la53uvxmr3o25zh4sxjvv6w6gdck74o8kt4kx0i5bcp4686a9x3i15',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'g89pbh5fp9v7b0rwj4168usblqd64g5twaet7jyhc9mmm1b7mm5o8neajl3utdpxgj5v6lsyaojh2oph2s9b53zvej9j1w4gxl4po0bff6fnzeqw1bicvwgror2fukkv89yuhkefbd5kdmawsie8d19isrygisku',
                responsibleUserAccountName: '46c3zgazug12ue606j7q',
                lastChangeUserAccount: '5ro24wgkpmrhcywla9ng',
                lastChangedAt: '2020-07-22 22:43:31',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'md2roag83ngrdf5jc5mkv1rxtfsxmkziur3gt1thqb2xmze7lr',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'g7tvvgacvr1rwdhsrb5lqvuob6ajvc6zx7744kyo2ja5xbrjtt9lgyd765omcatbnk5rr19j3xy3uoiiefncg17wthy2h496yuynoxianler1s3nv54lmdj833q45khewdifi2f6jus8yik0j17wmyoxghgrbbek',
                component: '7dalymh4g8gj7w0jrsefb1ra8xb33z365wpxwx2vm7m36uxau2jgaw1lwvut4a63s97sygv7yshvism67ztbar0ls8cypz9krmpb2b2ivapclz0raxwqymnhxdclch7canwj1c28onuw1904r8jdd7mux1vjhd75',
                name: '35vb01brywyu2vnduummvnwk9vtdxod5vbr0y8122yb00e6n3xpr33j1f7pzqw5nut1rhlmcoumo97og2pte971wboy0r451zraqnx2wlkylosco6xue98lwu1ns4v9znd2t8o3m4el5hifanfwjwd0hsbxrfbyt',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'kvc4eo33j8jewhlfpny0lo9mkkpipx02oj0tgwjhht6s4uf28v41x08vbwk8y5x3jyyx2y0zuekgfyc0jndpoqcn20bq3wwtul1ee33prn8t0qpo7l4xnqi3ssoszhjnvhahz1ubpgsy8yz7tyczqzz3d85umdnt',
                
                flowInterfaceName: 'kkh0sug1ikdj34mlc69va0kl7xumglqactoj6nmx7h0v85341plo19fec2ta0ml0exozu6pydurxuulsjwz08u3nem9fb20hqb5m1n7fnu49yel8eu4jem77465q7otsdnj5iu8m8neubijwfzne3pxpsbo3oxnk',
                flowInterfaceNamespace: 'as9p7ug9a72ti0rfxd6dap1dv76br9ote3tce7u1nxyts9e39cc1z7sp410wsk3wzo3xis6w2gr5w5tsn4z2xwiw3js5qhvc1mjn4v0vfplchknysdobm7ea4h5zlydt265bzutplgkf4nqmzd5jqiqwifwwmy22',
                adapterType: '1lbkyn07fjuhcafw1ynt93gvkritvc3wnebczwie2b0edy24wlvtz0xkgi7x',
                direction: 'SENDER',
                transportProtocol: '6d6er6m0o3yzq3b2blaxyxboye6y3ieeu73p966axgswf1ywb3cuo8gn56sf',
                messageProtocol: 'gmmk5mjqcr4b84rca6ff9xh4aa8fbl0m4nuvd5tup5n8zcxylb94ay1wf2ct',
                adapterEngineName: 'u3kywp6mwphzl8avq18rxk45apfxk104a344ncbxgrixnddlwgbtximpdg0qolchzd0zs5hn8magucw2isufd2v5pzv4rt69rerac67h9hyg6euij8jbirs5qg8xu50e7qn6odhmvrspci6ziaa6zzixsr1yf8xv',
                url: '3eb415pp7u7p98tnaftt5cpq9fs2guw5mffc3f1ih5741ijrevf3kh2bsgbspm3s6dbi3qcqsy4cf9pb1nrqtgn6o3cyj1wamq10bud42y0ocdtgor4fd41d9rthu4ejs90rglxxui73zixzzl8v8c9c6e3wlzrc8wrnfhymv36hzqnzjotjg2edlbjtpei551ucdxs5d1tux009miyhoyx08si9dc944ncpcc2dxwzkhcivr9xpkjvsemp1gon89fhn8z6oq9y5wv1mlx38d80q5d2yxj6i4oftrirvg3zct1d2b0mpw0iz4y91ztyn',
                username: '8zrjqcskqz7poslrfsxmubqd37944spxf15ak63c4mdkxopn9c3x2s0cn55n',
                remoteHost: 'dix504kt17nqwpk89eoeb0wj1ni149deydj4if6s02c5fzx8wypecp0mdxd6lhpnigmy67slj8fbt0yt4xw1yli6ps2u5m0var1rpmunhtpufmi853o3ara0xq02ocz5eeicojgnjnx1xswf6dclxpeuanrf0uga',
                remotePort: 5374840389,
                directory: 'pjwg0wa0ql0mma7365fqewfeerltbpucw1mnzqwz4m0kp7s70zoyipsww0ioxhgy4zc99r0aea8rhvmjy6gyh17e5h5o87ib5z92g6tc39gva6zo5vvndy0ng0hngnuucsl0e2059367xthwypwqoan9u54opkqjg0j0d0xf91grs5n14xz9rspj5iqo4tmijp9p623zb261qnqiju00jsu0qcjshtchiquw1tmk73vtm4n93vb960eoi9y5alfdgl3fdioqe9h00s3mnke62tpdq7bcfqgswjrpg2l4xz8p26hmonhym921nel8ppuza03qqna5drvixse9v5xra7ckpedys1p5vi3zp0x3e635g85a0oi73jj1naa9pl6xb908qgqo16pfycwkoscs0p4lhvdoavy5sovxsviz83w53mtc77vst1al4eo6xqmghjrewf1k7aeruwxsltexb2cziqm8nzofeaiocfjcj0derihvea0xgrrjrz4mvk73g9eghibuxa5e55ofgbdfzzhakpp8zuv3ndls8mayt2z9pvhste6hce4xuketikq9s14q458w75xfl9avfdl5gme6aafa3rtqg3rb233t302uv571scy0bps08yah03wqgfg70af89xd7blt9q30qyzt7iuq6p2hr7v1jj5ikxya3po6fozjr2yfzjauhpwavyho278jicm7bot2m5soc212qob0ahm1f8sm13w2yrwkuvku9oulepz7ksh9yxorzc8pn8co1s7irbitnl3mlc8wqxrnxf880xlciz5llugyx484g76yoyr4gaitzq6lfbxfdsup02b9swlopppf4k3jyf8do2f50o9mzbpk0dslxxz5nrgq0j69mldqn6cc1lxxdp6l9h6mkqfy96riqeznjfnjvt82uzcj3mi7oinotkalwpxob080njejubygf75t2bu5tiv6alb56xktzcuc90em969gz9im5ujlm5vcspry3yj525eq4o6iemlo6',
                fileSchema: 't9lbf5fehw1bzwna74pwked8nhqjq2vd2uush3ca6ttwmzoq0adl0qcwd5n9iaeqxrbr5cranr3srknyrep8fghwv5y5oliozzic43fubowj999fq60n6rqts2csdnwkl5x2f2x4fovnqsb69ilwo962njgeilh07wbyup93pzcubvcif8slk8ikn8zhggwymwits06fm213uuvsifsz1y2qdbr70wgvf4o5a3r3ak133sshl9vbxxbuqsgu5z3ohbnb46sqa73b6ow261m4wpqhml4mlkaieh2e0jbvwviujqcdhg3pf10htiq3k4m51mb80m1i4tv72zhxww11w5ptqfeulai893f5ejk5mev5dfvv5ydzvwhn9wi1wxzpqnvc04a5x3zkrvsg7dxx8plchik3d064et7zv69vwktte0us8bd8cvjjv7airgy0ykvfxcdf4spmrxns4zou9tm5zh5jatyi712nc8hdjlpqot5o92mczwjqkgtkpc14blrci5mj0sz6gw1u8gn32ilzcrg2ov9yy75r8s0ghhrgpqsoevtlkldq48xs404xefsxd8mqmt15zpmsrl773iqp6bljffcglkfphoo5pilhfh9i23br5vcmnhl2ahlk2iylbaapjebwmegzxuc9trxfftcw19ngiz29bo1vzhj0fosgzn23m710t4r8ntorzyntommrvbr905pe10whhradrx2uuei6iygbzv24zrf7as444vgdc9ffy2z7sj51v4kd5izm780ejmk6qpi7i1pimnlwitwkjtrznery6dnr8zmujf7ob46at89ar2zmqbif5gcqvas85ffjx6rdths551vq4op06vwyoyzts0jfbzz2fo0wmovs28oesfrq6psquas1vvka9faj5e8a0lmumcsweuoyhnrdmu1ysycwmcpa3m1r2khzmzavmtykia07vi02n8gwt3h3vdi1v9c96lf8bcdhhfej4cvwyh41w90981kagxhytd708a9s',
                proxyHost: 'it8q136vx5mz7udi1wmduwij4lvszw2fswbti5b5jqrqgcrx6vam73m15w9w',
                proxyPort: 1087026785,
                destination: '8l6ruau8jzkfy110vf9kxah4bqvz66eq9zzy5mvuqi3gf6n957vm7ny6al1semrd0u0q4p20ekwl8uaqjwnlal99ttov29fmzmb260rhlh7rs2288umkdhj2dl7unxe9bhrpvdy7g92i94iinpa0gpw9v1nja4ce',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'z1nje7iyyt1n24pqevi6djrxyyu8yc2zypvugmp7auk9gh0wguovhouo0m3nqm2w2jebh6564fxc75bqlb4npjgwxpa828c4jmtaf5gdg8x3rp7dtflrukii8u4k7z5fc2pohp37v93zo8po94sw1k1bsbjcdd3w',
                responsibleUserAccountName: 'jz7kicgazb0r2jj71eij',
                lastChangeUserAccount: 'v569mqn3jgxfw5cvstrj',
                lastChangedAt: '2020-07-23 06:36:05',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '300aezsgn9xzdy923oqhwj9ahnhu1x667xqqmmuivm9w29pt2p',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '6i58i6m890g53z7usy2d96j9vo251xo8er5lzndpbeerq82r30biddy9p4i9lcchlt301wwmr97tsk5ftj42t6vz8f557nictqmf8kfleytuwjr1rq36ufarav4opbr20tz9hsul54nr3b07ae7ouwxfariuwzz1',
                component: 'j2evzkme45xj5cpmwy3t024s7gi5v4co1waxyqfd82umgohjwdfee9r3fnm5f4ck3igs40vc1pdj0dei39i229zjof3p7s8l8hawb96wjetwf5ah0iiu8q4p48lqlxhtlnji43l855nnd8g294fcvn2o5k9mmesc',
                name: 'g8acny5h0ul8e6o2fuq9db4say51uavevrmdcol6skcl5dhrrhhydc2d52i0adtm5r4swxty0ojaa0p2gvhj17y0315cyhi1lnvirjbr7r1b5qgm25niqn5ipwho0zj2f8z8u6hq17pto6ofhmc3rndmjg7xkgz0',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'lu7dcc17ygpxzv9iti5l8bcc13mlvm7ym7p4s1guxi9jpyh6551mz4ti98gvjjkv0j6pkusvmpigxo7zfu70vkek15pse2m7y5qyyr1546g7ti0699dadn2jhpzop12l76if3vyukqgomid662p4rnpwxf2nnpq8',
                flowComponent: 'lk7jsu4c4cq62becwzd4u149thsfc7l2r1ozrwfmf8qs118ida02dzer4z3na1ousm9nclh6iyo79mx10anwrvwyhjyjdr7b9rdaec3rd1zzlgvd6ytfac0fmhiyzp6n42pb92i672uvpcdp7frggnd1f3xfg9oa',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'e1hvfutecj8awqt7sc8n82rvn3b57ef33dgre3k4ooglox3xoy6bfsxg97jtyzl7bknvkdpark84e8te92rpuanex9qjf3941dfqtfo6rpwc5habxz8ypg9bngksa0upb2s738c4ohbsqb97vnf4jw4adf5m0wr4',
                adapterType: '0pczewelaq9jnsqb1xczepj71oav4i61evqqv48nzbccfple3vq7dn8z9xhc',
                direction: 'RECEIVER',
                transportProtocol: 'a5hbwfobi9hqjqaulk0k7owni1cg8dd4o4vrhwjafgcxuzct27x23e8dkfsi',
                messageProtocol: '1z6ocw646u8t2ky1ulpjupooe11buglwzgddz6esinqa74k40m4b3f4kemce',
                adapterEngineName: 'hlb2w5kg45n6uha4ixwy5l0yv2tqmiy04t1mt90xqeapjx5dl4utf29yfgwcxwma91wn8r070z8fs72viyysxp5rijcualq3mojrzyeo0x2yv2rn75a7i8pyx2uezv1xgx970t0mxaqhdhix87jk84bznuph5n74',
                url: 'iobqhcmruxl8ooidr596rtgdwhph6eltivg96ovrj5ha618ofeu88f98wxbmqd0m1y4wfn7puizuzu0up4txz5y30fozxelpe1gb4wdsrf0e2wa7w77pyjqbkokhaq1xk4x25kfeitiy8okgsxwlu9h4t5289fkmi4ed61c3zwgbt57itakafrtswhjsbm61fuvm6fkqqxr8q1tnuyze2ab2sg1vipxa0jjun4nvjz8d957h7jd6apxf14u2ifhcsdnsqvhbnv70wie5c86n8ltl5qabdrsns49tse1f3woksrxhakqc91klpvftb6z7',
                username: 'w9hp9sjz73om78c86fmm0m5wqd3bk8zop6msm0ewx921e6zaplxi9uo79c29',
                remoteHost: 'vhmls1j0bn0paff6pi6veikiqvrd52ja23kzbl9iz2hn8qemjkeaysib0y4so266rop2d4062ak3egw399zdov39l4ic15aimyxmbdj1szo7r602shyd07c8y3gim2rideb9e621tcytvzkiyhn7tp7lafjuqo0a',
                remotePort: 1082848761,
                directory: 'qmftninq3jw0po6uywqbgnqd6iqymm6q4k25s3jr37ziwxvdnyuvv3vqrwlr32g1l401p3advfeeerrkhbd99f9m07l8zuhbuo3de2uo6v5zz2fub4xay49rm5otzxkwdb88aa8ddmxq61201pzbtvcx635j0z1rrfo2lvmckw9woo8culw17to2flzsehmkwigcpvsahjafa86pbgf1mr16bz1vc673x4dlpjqemc1xtuxnzve9ggk0ebywvcidoigkxwv26jlqr261010cfhup5egqu1z718thv9br8wozh4lj5jkd9vdatjxjj9em9as2xbo2kn6mjmjfbbx4f5qt2zrc581oc5b4puaaeivx7xv46aowud8o5yfx4y1lhpgqb3k4l2bvnt87zrcqqf54twm24re533sv5sgbb3m4fzmoewpdheplgtgz21s480netolnjir249y4v4xn9q8a0ppoajhn6p122702t99l77ayo37g0wmho1h9il7ykld1k2epms2p6qh4ejymhtjbjux3yso5p0jxgvnf8d5of02s56ds28ylotdfmpb7bh6tpfu39qjy8rn66xxapxfg35egc536ocyos6xx80uyygujrqlj2y8dvt0n8wq0ss5ly2jhysrtowd0gapbtiz6d0rzy15svnef59v1awmvqkacmc4z4t4zzm3aarp85woyyqepkazipkhq4k4nioo509lvd9c4jwkolmxuy1qod7fheczg1nzs2w1s97i50w6u53fcweav1tpmgnlgf1r0sgbmtbxqgv33jolkoegkohpkqwpykpskf57xzd6khex52t1qluwvbbkl2nrvx0l5f3bywtgn5efbfl9ynkdidf722k2xg676m6wbof98lchyr24g4ciw65aa37eod57jfn1htg16hx3kb2pjl4pdbdydjcl3gpptq5za4c5apr1uvz3awkqpqphomuc8vzvw7quo5vknji8lr7tsino26hmpqt5s6s07x3t5lvdb',
                fileSchema: 'zn3mp84nusmt9wdmbfq6d6o14tweysdu6dss0dimvq1oouhwubeh4s5rt12u2sj3bt6c58y0260kfu7njy74o4971ujk2rudqgo9kjrq4rk9idcy1potb087udlmipp8k496zkljwnguiwdox23y4lulp6ea67f9ygtv7m55mvsfphvum67r5qgqg37ikvj0ohf8o1s3rc7e1uf85ehpukwdndznykxnx5sfxoorrsjl0tdqd7fcdu6x1i2lakxj4mghyz4m6wwpq9p8c1plc6frwmmnnfn45swnsndmv2xe6lwy2ng0i17snsz31frpppmb3l4zmefrxh2556rksrbiwd6cvx8a6nrpow5m93swi5ji2y8e9jw56t68yrxs20c0wu07bghz1ut2mp2txkj73bguyu3t42km0pq2lviwclui0uevcvi9oy0h5mxsljsulufmlsttdstmiauiz7y6xwgfbkml5poil733qoovyskw8213jpdbaufpgac8u2do931003fe6obpyfcv3e48q2g5ffivx2rwcb4mvjfrcuzqc3dzze7r41xpq47qgdriuaczf3ldsrzhqly6utqig63d4kn8mrose2ik5da36vwgg4mcetygpfa190vg1rtqak8oeptxs5866z1e6zwzlvv2w9dns17yvy1gpbkmqsm4hfaf9qjigplqvvi4ubo9479402gicj0tcz563nvn7pw216pu2qplhred3d3brhj56ywerp00o65sj516nx6t9zq3ljtqn7mq8f4a11c8xz4ngjc9sqjkpjbx4uq8fo7m2vtp1sh7276181p87huf2d8rn9jb86yv9db3zszp1p3rl2kzj5m5hakqwa59ue33v60884xygy2i5hsu0src5f1w7g8y8beezyu6mlxllokxoo4lbqnwkpqh520by9gxo2atjlapcfsq6opmbb19qgkqv9e8wdq28iod2bsvtv563cth8ii9eyuj3e2x3af53o5p7w176l4w0xw8',
                proxyHost: '953ijw50acn5m4emco9qgbh1qcsg1bvlpo9hglcrktz3ap64zezyzrxdcr4x',
                proxyPort: 8368280537,
                destination: '0p8c1j8dedsp1rbnzrcs1u3pvrrvpiz4hqwi8kzr5bjljuxbr7wr0d9y4rc3tonasa39b0lq5kgtugoa89wuswj7rgwu9a67pfmnu527z3776galdt4l698ieyye2w22s91r0ri5yol1g0khzodrcgyce4gv3jnx',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qrel4i6yar0yqbhwegeuvn225gxrqi1o7l06266et2xx6y2vzy05h05w786a7hkvhz0vvfn6mgqo4xnzz4f2tmjjsscpxdk3xm6l652yvda0x7gk1rh0bb161ott565h2f3ceup3kqj0l5eq8sp39cs9x0wvgab2',
                responsibleUserAccountName: '0gzfqh6b0pstsmyzaujr',
                lastChangeUserAccount: 'r3gf9xwdct1h42o15snd',
                lastChangedAt: '2020-07-23 03:28:51',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '2grro0jbcoh6vpc0yzs3fq8d7n8yxo4pq9gq0i7xooxaxar0d6',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '00utuwbdjlqnpddrgbgyo1no3p9zfvdtp19ggtbrj4npro66ldnofh7kzhz39yac6rz4wmnerqfsgol6033s1omm70n6jaiqh4ci71hrzrczzkly9obge5tbcq4tzq0jiqond5xn7qcnbydjcwqtmjmgenc28wx7',
                component: 'guyk6bf24wn36immj0l39fh6ysg5mv50blqzjco9qchq5a2nz36ausbwu1ljzqffd5xfy0q0l0hdsethp8mqaekm26d4sczjfxv3eldpf4kjjz9qpqsu1r26legk7eu1xh1fbjoxzu6vbqpytz3lg633crs06kwn',
                name: 'b74a9gipcmi7ixpc864toj7imni5j4va5yqics0gwo4mhkjl5qjqs9zpwu82zffpysmi2633514snmvtzm25lsjv9bmaix5tmjbiqd22y34eyvjd6auo1iiy8kr7u9lmyero27k9n99rxm9d4ze31aglq1m9fbmh',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'nhxvzvpevwvk18j3hrqhzw1f5q08bc6thl7etxhztx2jzpr7lh9evoa394kuug0drhmkyougmp6d26j7x66p8m8g1wnyf4nnvn1tk68524c14iis9w69inkbmfkf2y4sd1gnvbw0v6t3olfjfvnnkvnm92fn4d4j',
                flowComponent: 'ql568to8xai9s6dskhzvko1whznl8mpj7iqfzowzhxn5sig9teie3d1m61gzhx84cq2inbt6c2k965bzhprrq38aa0b1kmk1tfi5lpx4t1zelt9st2bq2cp2mtheymp8z25jocpv83o4zanaa4c0eqmzhx1z2slf',
                
                flowInterfaceNamespace: 'ygrz9b7j3fxsq0c9t2p9w7n2e7l0y7927pq62puerzdzg14ekehcy455r48f9vd6zgfwxa4m9xlz5jvr5u2qp3q8pbt6fef0ime5wgdanec63p6a8gjdicnwapsnwfjs3j3imracfmbfykm63pbwrbkvqd89ifwu',
                adapterType: '1mdds9wegspsrfvutp2zudgk1lri8v6u903w9umbau5r8pc4djgkwhg0c4t6',
                direction: 'RECEIVER',
                transportProtocol: 'klk01cgy255wxtwtqiiex27nk44dy0ofayni4iyynu7f81tsr59cqrb7lqqa',
                messageProtocol: 'bu12u17oiu9r22xzmhhwt1io3dmtmlarxuugrsfr9dd7xw424x0mgd1t9m14',
                adapterEngineName: '8mlq7xiwdeh9o2gj85nu79d2ylzp0p5b76jmuolyygqzzuzc4v7zentv9q4g9ny2c1k2d9tl25zyx1so0hsy5z2atdjmng6avwypfa10tfp4ec7f5o91btb5y84m0rsg18lhuvet8bv7ow7latm8j6l4q88draeg',
                url: 'sv7ss4b9lal604w6swp82i5tjcp622ewoq332arlxke8njgbc9xp2wsc5fz2ecbsbmmjdxzl4cig8xw5odzqehqvlem82im9zufqp4semkdynqvbj0pv1mz0d4icj7s2gx9tzbbwygtk3nexwv6l3rkt0otf3ligv8yftx764qvl05p6fpgoe4lqsew6rm4lloislis79m11ifqd086dv8mitntta91lz9n6lnc8dtwisybwicabnsv4my1cmqnysltiftj4x7mqh0p4p0dga5slbfob8yxuyqrecivoweuxj4nwd6s5filtv3gosh3f',
                username: '12bqrpd337xb78hv4xds0cchzjj0njvyelk2h7r0bo7r3bjwbqfh1kjhyhu3',
                remoteHost: '63bw7i62roi4o1d2oxhlyjb3yjkfl99516dh3bwxi03d2x8j1ra4ue57r9gnlb3bokvv4xqrcbe78e7wa64fq3s363sck0lj3alfa8yp8ronyq0uxtd5ez92ycws14fe21hck31uen4c7nynllg2v7a3p7vncsjh',
                remotePort: 9002749375,
                directory: 'do5y568wsp9vhymi8i90wjq7uy0hw2fppvox1sr14i6biumigz794iv3kzdc5s1mw94l5l76b3j01z07t8jxm03mdg9oenoe4o8tfotz6c8byxniv180sc2xo1valob5jkjrpp3qqj78rvp17b93hgv7amuoeoninod2x9r83vgvy8xx8mwi0ib4o29whqeo2gosogtuw2aulukb7synaccnx4be292t63hh4a8y8untimmmoiq95fnhkkvhz7obt0glklodcd59gs6zzyvxluuupadeux88c219iwd7l3mwg436o8xzsixj1omg7dm91qfk9jieemylfwqii7k3xmv7y073bipb8xyjh289k6bkka15ifmijodacasy28g1mpbifgtbj07vfspk4tdbhsrcw6ouf3p3aqw4zrws4ahnmfh92qe5mgft0jtov0ii1uoa0qr3p9qp7q3flp0r90gt5g2mn9t1fqe38fermirvvcqatdmhxd96s8fqvruhaan71gulbebydcahsc9i0lz74lqna73xoqct6cx507wddgm7bpps2d9x7toym22j3t6cx049jt82e17wmmurov0po1i91vholotk7xm4t3dnkp9i2n7svlahepexnmtxtyg6fkvjp6xmwlt0xmm1g2uwt8apz3w7d7axknmrrejawl8lip79bsr2o4dl5jouut93jt52p4exo5r0mld1xjl6t9gc8wocicbz866pb0usyjkfp4841ktccbr5i0r1ldrd2ysfw7v1howmotgglzf4w7seea4ici1tfy1xksv6kf5b9ja9fby1ko5hh9ld9crxhldnhqctx7rznapyt5urvo8dt0xl1r3pm4ww2v3c19r7wwonndj12wfr8h8wwdqdzhu0fmpjsfaxdvgdxxe5pex181mmkzxqsjuwnjiyu4g6lpvc7r8eomxf0r4risx9s4cdzrgdlo8gswi3h1blu27bcqwl2vdl9d034as3ekotmn3x1emqxfs7x4yq',
                fileSchema: 'm33e149reddqt4z8xc5sdspqrluee71widy0rgbi34712xe0nc2p02kbclt68i7dni2rxy7v5u4v3ohzz72hbbt9x2lcij64imy83lsgimpr6aiiz1torcc1786hezxas7ay4459lv5rmw7rqmcqhehzy2z83kmq2ltswo2inzc50h6b082bjnszd347633ywernqy6pvbzx057ctho9u77ge5ss1g7ex3z42o52d7lka773ngsu1qsnmxkozhxwbcln3kc0l0akl9pkti1z6fltw70hbu3ymqs0iffrcvyd9oigk0ctyxml2i6kxn1iwibpn26b245qwcttjnieonoo0fqy33quqvg9h5623e133do5rmpdc572lsstyji54z7x5eyhxtlz9bexumx98h36gydpfn840hnb1gvt5xdlb1qw0i6b5zquvhjbk0vn2vo3x9qk0t1v9zjplw4x2y6flz2pnarh1tmw63lowkc8vtosjttpw169cs46zig1bx03p4w1v9yu8pplypd38k4i0iz7i76i1scz7dbvfr3yd0bf6ecq1kbmk9pghwjbwbvffn6yr2d1he2d61mm7vv1mitprhcaymolwf4yopsfoj0dpxmgwmnz2ezlc631aajum6tz0o0ih44dhirnxybxe33nn33s1qevz16xpc7hudepnxrscxlo0zf5m033er0ertue84t4bl42f9riuwn5n4wwzkoqlis02qyxyjiemmg7wuscx1wg9mttxf47ea153en0b2bao80yxbtdbz706e5wdokn4bfbwudcz6l1tsx8f0md7moftn31z5askb0r9l7i0iqlhoihb9tdvt5g0l3w75rnp9awxdgq8l051og51mtesfpdltscou9r4eguq0mp2txty7l5ti4gsrwm8xzt8npcqq7pwxj819a4eqlmkgyfs6v5k62bcipi2axpkl8nuyf5wniao12q2nfr40nmb1iqxgciovcf93q0mb220zyhgx0inm7twk5p',
                proxyHost: '1ir55rwclax8tcs3800db89hspiy223mpa9p7vxdyphpzieek0ssifrvtd9c',
                proxyPort: 3346907722,
                destination: 'emgjt4o7km67ycjq7b81za9u2woof2s63kcownso8kncodltt50c10ji1kndxg6he13cirkfez9572j11hsqspa0tsw862l08j294c010rard3fxuu00omc880iqj4xjbvyn9lwzwz1q046qxsn015mnxkbkw7ua',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'rfj3t87gm15ytu5g1jrppvbpi24m1oj7cyamhe02dupahd0isuu1wf036dlafoxm4yg4x4rzpgbrz7ykv5e4lnpawizuop3888o4406kg7ltz52uo2h4jph7w8pdtpjk6eofpgnzq5s7calns39omr0wmawnirw8',
                responsibleUserAccountName: '4pfkm5chuxolpbrobsyj',
                lastChangeUserAccount: 'rrtw3z2db9jksln2wl8m',
                lastChangedAt: '2020-07-23 11:09:41',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'dzpek5kstpsw298yj5k1aayemwax27tqg1ri9kjnepp67efojp',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'mxjmmqvp9jyx4sgs2n8dzj835d9eozsazc24vtbege6ugzcjd7ler3j7id756itnxlwed1gfrb4ou2cukuzauw6szwmlr9o3uxmmsmv05yj80r69eqqczyyj4fpvc30ti3j95kjvulzar8f1ysk67t59zt0me9p8',
                component: 'ahw6ldndkm3ve05ot2a57qqpt894tdg6xsgvj5aayexf9grsktv6hj5kf1j8fq2wz24b6qobsbig41azowbx198icphoii6scmzvcdlkwcmq72iepiye93hc5dp47n6ey45g6bb7v3wuxxdd6atw6t2itek3i420',
                name: '80aud5dp2bmfmi342hzatxa6hm3fep49565yqp25g4hymvzqnhssgeo2qy6p89edoj49c22ss4u0fofb3m8jm2y6cyspg4rqs9j7reqxamz8n11bxncqk02k5mqxmbtq3kjhgby4b6w3icqrhtg1r2qbvuk0wqjx',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'psliwj4bv3hdum70ewqjnkao25ax6m5fpouo5xk9b8abeyq2ck3fhb7a8637dogbijo1yyguzw55r5l4c8249kefjtrkuf0gxba7olg8jrjfc3bxwoeylgw6alfv3gwyeiclfucfquzv8dqyueaezv9v73ktxfb3',
                flowComponent: '965fgxfy8i25w42qb2dh5jy6d4ja251wzlw5906jflrw90dlrxyj9mhdj5onqh5xsgfbx6b5an0bfl4uaenouief11koma7z0jcl36izd0vkgt9e4q99jji6wl3vx8ge3sxgnsil446u4j8z34x5296kb50u0p3i',
                flowInterfaceName: '56sgesvzju8d2vxhkyquw4ib9x4g7w7zex5magb632a5hmb5isevp5rz5o1puzcle1567t98ssp4ycum3y61npkmllnc7f8gmtzidec2eo0knhpnzjib4kygwqwrayyr35vxxi39sr65xkt2yaj0q684i3145xg2',
                flowInterfaceNamespace: null,
                adapterType: 'es4y6edh3rth9a5xvuh3fx3umn5uxopsw87w5muibrn1khf5gsoohn0buw70',
                direction: 'RECEIVER',
                transportProtocol: 'r1u4z2kmhwcknj4v36x3l6z1f9ue398qb9zmcy415pucf3t74shdro73ktz0',
                messageProtocol: 'brfahqzscoj1vpgslul0jz90ogsdzv38gdamzk8op47lgw3xpasl6zeyvtoz',
                adapterEngineName: 'ikuq9rx4x0ulwbusxfmnip3m4u342wes282w1gyiy4c7ocqpr80h1xvwnn84i6m5wc85894m5keasvrwi4r339tllhwuvy34eg0gk90xaqrmxwprbd04lovchgavzxmxvt9ycobnuokgjxiydmupmtehlv7pxy90',
                url: '43pmq9xcbk24c35c24sg1n2dlw9xhn34ey9fofizuqummmvtyub1ewylzfai0ghgsbhmboet035efvbwxnnqs5wpe8zj5qyng2zan5m9qu0aj2119f9g3m56tmxxwlzuu25y7m5p4gp47gbipouspoy2jasw51t6h66e0i5kk7nemrrx1y2djq83jbokjideabxwh82at6tpwchv2c8ifa6i6ca26gxi39my5y0jv5cx0m2zkuhsowvbmxaisejw2fnhtut6u7r2rsztvki4q62pcilxi1uyrgxudjp9fg6uw5arh44mqk61hpypeaee',
                username: 'olfwla1843251crxovb8xaw95epwvqbg6arobi2p9zwa8qfbr33z1ss85yxq',
                remoteHost: '7den8q9ft4p1r6g6ea4fc199yjn231r6gj5iurpitoteyvjid7crcyo0yfxfl2y18vek4gkgcj16os59w41qsou5vuploy3hmar4j20f6lfy5hm8iusjqgna06u6bnbtq3onwf0mtf9z0nrpdetntqo8n271mw7v',
                remotePort: 5828423940,
                directory: 'qg0fcwn0qj96bbi9lb75nw1g7byuzpdjnytkdccq88eaifnp55vhwf4n43zefel13jszxh16npmhngozlgan3s7lj4s3i5ojglslf4m0110ndx1tteihyzq0px03wx9pxx5xsvsmevim3wat8flipzqipp7074k32rffiqkdsdsmc6u9p8oyzxwa1mork2l8ditc4yeu7nc9svmot48au0gkhl2t6brb8x2eqqciez6apjj74nvc68mg2x75h0cq4kcjlv82929xtcjiohl9t9jo1eaq5690mu663adqxrxbaf8rt7qyaqm800yeh03mcimba2qh3lg2w5yxxhglivj0kc7ze0ve0sb1yxd2gd5ndgc5kkz136h7hyg9n2r67x1svuzruata4ft8jcholxsjc217f70yyf0f151kaiopz0aftn5l4teu6qiu4dkoi5umds6t1xvkt1tqxfnaxq4vzlwp75x8f7r63o6ic8ruzj2xj57ufodz8mckyygz45hfmik0193voo1yftjarxjfxq9nw223lmac7ftqi5h83s8rulneg1j3xqyld1zdswb5vzhvdhefd1tuy0xghpamjeq0ti8nzaofj5l6345os0x87c78270znc3hnjep4titvx9e4bgsl45mu5vzym4utuu0z86gexd5e2pkudv4t78skvpjg7038lsl1w2gx5kzd3is2jpuiw1327p2l7ghoi6vyr497klqrk6t3i2aqzcvwtevshdx5znq9zwyg4cj9qgh4ft52vi135nmevxfr15yb243f72tlqwwnpidn8gh963r6ro77j3eyntcq756txryyii5hjidaf5s847lpn6g5uyk3rn3yq1zs5u86verigvuxjupq3hjkicvhwfesf9h5a2n80fs7qno2u8c7twhn3mj09bxkvfbv81x7f9f5bz3t1ixsw7pfvel0rmaqf0wf4kbrgin762c2mjo8qifws0tl7ulyc8m3mpp75f3o11m36183rbmbe24',
                fileSchema: 'rlp0b6u2nqgmve5x6nf8wj6srxe4owovlzwo2nmsih1vom61el5w5o9lmad2cpov4qz0iwbszl687ztl4biztcw6wcgho0d2fmqa3kyhx2uzfkybairo9jay9v1w9dfl76j900lnojzni7wyndvwn8pmhcqzyr3qzdk7h5hij9seevchlcc3grxcuu7bd53mqpzklk4hj1e6kmoandna8219qdpvi31nclo7c0l6n9e3g7te455clogemihm1id1inuk4vsk8hsxzaafywwi6j38h7230ehxfx5x0ce6p3rm03idq7xkbyyq55a130db4ejq4gdztzhio1j96bz4p8h1gly3iv0n6w31vo2ejb5kpinylndzol2e3af3rbhl0ow9813jlutf4nykwaqcvcajty1ujih0gj8wxgklyhr3l96xqttbg7opadqq1zc9q8gzqhonv5887eowlwdqqtebyhyunwv5v05l25sip8fdem5v1rcowvok5goadm45ffdj10g0k15eatiky8wj6o5x03iycbe9qej07qd654nl9n4tj9ef7gn4nzztat5psfwxwfhk7rk7w5dvbc0ejkmzkswamd3y3rf8pkbhrkkl4l1q5vi8l8337j42cwrfdnqre88gnd3svrd9ni28ykts4ud54ha2t635nujjk7eevljunuidn8cty5sxcwte77ke2q7tuuzxl1wb6zyfb5zxug6hnreazxwlu6n0ruqtziahjoibg8y2hsy28ldjsdhtb2m5eh69eie7bfn51cf350tccszrdkc6ly1devcazycm59hp7lxfzjf5ye1cenu59n3tli3up4xfa5oiw8duxsjre74vujuc97rqxlvixao16ee76kw5aohkcxq7lhkhh69cmyt3jauymtmznko1649aeneqqwtwy5y59lqyvq8evps8gu7ca6r1pwcrxhln9zktj95my63aox9hp6ya927h8bia6sq8cjp6co50o4zztkgjyxn1oh7d31d7',
                proxyHost: 'gbigysxr4ru0x3hjmwhlknvdnlxgbp8gk779ov6rjcfdnroineea8jkx9goe',
                proxyPort: 4105467540,
                destination: '6h2auoddbwj2xsgrzw64y5g7dguziv4qst5s6f6xqanimh7icwo81p5mod830giid2lg1r2h5r1n5p5x2dj76lkwrlyyg4vvzhcb4pwvqagcjzi72u2j8lsfxxnlbg5gvjeehn9zveqyxiixum2edfetl2255vg7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ilkt5e66gi0ojgo5y8r3cpxw36jeh3wuwwy7nqe173v3xj9ypuxsgsitntwstlyd65n9kvn21zrv410qliuvbsrc765smclscd4yyyae5a6gzqikv5ftyl9982st24t7394xc5vxfbftri85rs56owqs5guljaaq',
                responsibleUserAccountName: 'mvhyw0up9g2ex0tbr3cy',
                lastChangeUserAccount: '1lkkmj05c9dexrdskuzo',
                lastChangedAt: '2020-07-23 14:11:35',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'mh1fr17ww6c5zur4hu7dem94hvqm5cyu17avssnbe0k36glw3x',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'oex5vdb1u7tzpmgw87fkvk639fkaw5vtjd1be19sfmsn4mac7y18463wfqm8qrjfmr8122dgpyl0eqf1606yucno92709lwy31po41l0yjhtrmopvu18tg0ilh9tmmbmnjqbku4mond6w8c8btubfc3asmdmy60a',
                component: 'tiq1mu5xzpo38oe0h5cn9b4rfcpxh5iee0lcyv8laa9tx2ds4av7fb9gyc51xnkpmkx1zo8ca1agpkx7au5p11iiwqnnia9gt16uqxoqcl2tgybpj2gskzbwhnsseyp97z68ug0ibt70wjop3p7lfcp0z92btfb4',
                name: 'mie4n1yv4mstl5rz2x4qtike2wiphpkx9tkm55b7tjlsnzdssthuzvlf12gjjzxr4hvrqmquy80apl94uldpvc434kdfqta75lkw9jangy5p70usyhbb6jaqkywkksosl3ytw94hh2t1ydrbky5bg7okbxyeu7hr',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: '1qm2wb70uvgo3ukwkv77cbneela2w5rmyppppikt8u6595rni5jjig1mjppzfhi84jb1uglnluxq9ybs2s0siy06pmb9apw79afai1nzib35d42zqkxzjl7pg3atbuex6wxekaogfi8o4cz3ti0xvcnvq0soel7w',
                flowComponent: '97ts61po2egzzlqbp37v9jo8xnxvhq713bwdopbspco62pmhtk1v8sq8cy57riqxbfzejwzd7nh8qjqpn8m06m5nrhtq5avgm8nvl0ks0iapktqtevs11k6tjsf25xu74mwepkri3xikhpk0plnbipx3knsz4i5x',
                flowInterfaceName: 'ml2pm89exgqskhb9quqx3g83dkis3o7qsun0yu45i971mbv5o4eqh1mabsxo9dupvqql8rb28aycxdonynbl3vnyphte7g9oquamva8p7efwgwra6grfq1rx4zplt94yvbkcp6rt1mixmeu5owj626gzsixxeo8b',
                
                adapterType: 'kncjuezza90q5pivt1oi4wra4eoh1ofsg1p5jdm904qjas0am8ia1f8gloc4',
                direction: 'SENDER',
                transportProtocol: 'fbk6p7sewv8h0xgs37g0mx6xgx66n2d1z6p1usqj2tj08kv1epjo8bs5mns2',
                messageProtocol: 'pyrxsf95t9q4jys0dpm4jv64asjzws9gwj2nrzbvpo1sri9cy9dwzh5od2pv',
                adapterEngineName: 'esub3rjgu40g3hxjfnyi4y0xwddoz2nrirrzxwrx407o6yc0fs6gjsjthtifno0oyb1j99dmmcte3nv7dg6krcgu9ijf9l2yctqojsm41xmmu4qbtki087eoubg181o1hxl53epbkp8qtcl2nv3we71gqquqgpf5',
                url: 'q5kqjxbfkxo0tb2pi209f4bqlircsztklep54xrk064gxes1cxlfyxrgwfyjqcam27o15x9pvhh5spbtwe6jjxpqom4qzxcgeebnryfp0jk9tu7gqwnj924tjx1r90hs696nhbe7fmqp1r946ug1fokoxq2fes1z2rot2ub4cr5krb1eah9gq07rhg9ol6a09ii18xlsfgovj6zcs0il1bnhcszharkvgqg1xp4tddobl1cqb7us1gwtckm838oypwibihnlmz4d2tkr023pdfk2eitilarqhhzxvrwxwoflomktwtz5m3ilkpvt4s4i',
                username: '309mjcvlji5yz46gstc0b4y5w6j11fnntazl75cnlpolydxp0rsfmcs5dasb',
                remoteHost: 'ytvqiiznx7sjwz8t3kd19fhfr3ebtfa3h62jddddy9jh92rptuyi3njuq85o1snwmhkfc790ukqut98vhf5ji2yz6aubh0akeu2zxikdw1i3w4mmr63mstworxa8tjou7ehpls0ubj1z19nlxt4av7pehkkhvo8x',
                remotePort: 3790656631,
                directory: 'xvz1z6yeu83ezi56z6hawn4y7w1hrt9u1lmz54q3v9flt7kfvwz5rsji65l3p4wt4foq5xuht9dudoai4h7zb1drrz65bbiwo1o6loefqq93p30fvjk0jwavob5ftg6i8qpcehahgssagjt7zoedxx90sk7gm3kid0rau99b8sn98wppxvsg8f5ib8yhsl4ln6dns87powaipa8tox6ot0qv7upimd8k2udj9bambk36zb6zkt7ofypvd9hpkxs3kcrenrifmbfa00034xvk6nwrt58c0cp5ijzwmv5bnvc4bqo0hd7z3gjdv1iyzdngy60gehbk7jbtw96421rhaf2aqey8iq8u9guz7ibnf7flrlib1whg5k1pusterc05n2wuyp97934dzzq67u8ypp37t8636josazgktm01hg8qqripc2huemusgflu0auvs1xpvy74a73rj02blph2b1kbfqw53izn5hvbvld00ufl9qfrx226u9afgm9hbbyqj8dz1ctrvnrqtlyjgpkpjipnc4k49mlxrgkb6ohidva9nu1417bozv3bz4nh9jlqwbxii4qis6e9juv66o7z7x1f10zvgiuyf96p09eqeqpgwuo5ti43ensmeo7hoqgj5mxm9xiopi12zqp2xrtw83v4t8459j0iw6ls5leuz0pi3hahrz6louomc201mb4re4hujikq3oaycfll2xpq8awvhammwjdqz9iqrfld6ve4sx4uxzzb289gy4vpj7fqk90k6ob7yrq7mu2ducvnolhjxpltc53oqhd3bpjrw5cpm3xdtvv53hsuq89squdmzu918ncu9mb2a68rrr7mcg98vurxfdpj7ucc7x8s8gr2xdavqt214tt9ouex7pzca6fq851rml194e3m4ko8cxay7bkup5i6yibks5rzj03d6a5znbi8wlfc1yi57uwqgnubgrcldgtbweq53pevii6fgmxxpsx2lvudfe8j6s6njpg2erc2s6bp0wejtyly',
                fileSchema: 'ff6ouvji31gvzankiywynlcf7udpn7i6el32o876ulpu9zcrxn5hfyls2g1rdshv6q0lv7lttio8jbg0flm73u553kl4dlp84z9uwjlbdev4hx33ih1saupthcivmmv57m5ltdepofssbuvhjmzfn4d3jlng0cf30d9965j8ikofgouh1f02pido9lge7da5g1wxjp51q8zo3rrshd3ffu39w900ycwhpwwexgo8l878958lmfesliw8frm1lyv4dpo8lc8qlpjq9cs2raupk6ya8jcd9lxn50t07n5kkjuenma4uc8z9d56y00ovmd25btf27oursqworsfvq06yd5yvu56u4w0u7nhfxd3ku6m1gzx5j3iorm6bmk3mwu38m4ccl1s7y7367bap8ank4diogv1b521sf3dmixytz6v888pwr3x9a1uq0i7nfobg9l82qbcuqwxctmi3onzxizy9ng2pbd8kr31y57pgbcy1w75hh29nee23sm7rctawp2m63pvcj8d4hrb0oc25dcgcutx24w7xa03gbo4i3tep6gimrqhxe7ury68fdzvosa11ucsbv75u62p5p2x99u857zu12n7uwjp2gy9p34hz761dnqbr9uuvrqatt4omp0cx9qkfmnu1k3ce7gd8rx7ppssgmsqg4orp8sk0izuwueobqsc51gtstiq3effk7rjwbkl7ms0105drswdnnf13cbpcnqqcs2g2vjef7zehzy8a8zyuo4csteigj3c61ciwh6r7xy6rnzl6wpbpstcs6cwjn9k8n5cgrrzzodvrtp3j1rnw8862hpt2gsyt57j0fiym0ap1n4qg3k8gyqhm039qyhrmyf75pcalt9rmbe8z1nhp0lk27033h2ow298kn1nogwkwev0lgudktnpycijueps01mji9skcehji72i734466h37dwd63w8sb9srfqyyax91zl75pjv4sbsxhhi8l5lt47pmqr4gcio5d54733nlu47cpxhvkny',
                proxyHost: 'pwotb0163uoz9amzdy8bg5yp1tqy50nxnldx7z513q9oo43wfwmjp940izfx',
                proxyPort: 2872527980,
                destination: 'zi45010260qdz3tanjz9rezao97d63cbp5erxsbm891iwuxn4yshxvq1p68sq02q3l13t9t6uqtiovzifxwe4ntdkyd322svwkvyygvommiqs49pkb5x37sc22gy19fq2jcvvf4k2yfqwhvzteqf8zccy92kntw4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ndburbuu9s09wl25r81nsvh0foefkbnb0w400lqfd684txtafjxrp2k0oe5rr2pz5kkxqndljcw2yo52ol9w6ttowh96egsjks1y8s4yg34r112jiouhmjnng0lfhn3z9wbpggk0jgsx0wkcjrsppopbny02wuec',
                responsibleUserAccountName: 'aff70s3u8ecput77r58n',
                lastChangeUserAccount: 'tz4h45kw2netxwwxlbnr',
                lastChangedAt: '2020-07-22 18:40:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'kc0d4ltmo0ce1li21y8ed3p0cnobgti40nr64958zahp1ixou1',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '8j4y6zsle9ut6bciwc91bpo6mx6yvw21xf7z9tijrn3q0x56udcvfj89pumdvxa7nxdau87hu2zp5g3ssskbxg7bzd2h5r4i5rqb2dwoqi8o6lpvw4quth7cnymwroxucrfr94ygo8h982x4s2ahl4le4izb6qoc',
                component: '0wdkc004uonddl6xo191zxryevgfy1lbemb52u02nnxnm85cf37ia4lp0x0wfpf324gfu6ttt8gcphw19bb53n4nlvfzbcg8taeznhdkn37m1utuk0ritrjpnn1o4c4vhg32m6qk1y4hk2q7acwcwnbpnjr3io6x',
                name: 'vhrqnu6rqsiolbw6x41dxz404mdhy3htnmqs6sarz3m4c0t1ztw4byv1g7s6z90p86b9tjx4uzxn9i9bj5fdryg0u8i4thesfdlnt7xz5imolm3mg4tc7cmuirlw5u5d1qqwz2yto0pbet0xo5i5k3imdt31tv9q',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'xzaub7mgl2cv275lki9ha1e5z8vx5nfmvxlqe4br8r0hm19gf66vlnfb0o6dr062kkosv9128j1jlx6ur555joya4zvj6bd9jcer20lwj0swb0cjybvd8a1ydpe28ccycplcuzf50ox66wf23a6xgk9fpczujye7',
                flowComponent: '31cpbzx9lglahrofj5ltbbkyoibrkpacs7a6wa3p1r45o5lgpztehb3g4f4f3jllr4souasmvm8x2224qrx5k5c71t5ouw6kjw6yrgpf4r7k31panu36aaqip8cwgrv3ltza9fmipx8c0fmckx5y82jf69qkbzud',
                flowInterfaceName: 'lci0jk9mkukhquqtqx1v5tr37gmtrg1qcnsp0dp6n8lc0xfva8lc6tmuyimml6yx69m0dotu6z4nme56444h8hq8m9ar2xmq6p7o3n1vaa2kgr9dzcl60iexowusnnrq9gkk655f69jib6xkwd8uthnbm5h289jz',
                flowInterfaceNamespace: 'z9q92imhar56rv6ad3arqhpww9cnchr4e5xsmub4ttsxnw8een55jfxna6bbcgyz1t3k8w684a2d2t2xjppjy1flkq9th9zthx71s6v7osl1jj28gwiozt5mnyzrh5hf36d04qmwq4nibmsgr3l4a7fys8bheo3e',
                adapterType: 'jakhvd2qfl4wa9x38isbgr4iskbyn48y7xwc1ujf0g39acze48hiikxm6hsb',
                direction: null,
                transportProtocol: 'ov0gpnprnmh5iuqhzw8jzsj8e3dbl3oy5eex48hsn9h4jifhnx4g1djjihlx',
                messageProtocol: '9grqmvb5p9ekombalc37171k3var5jtam4nq6742ugv3u3habt5z3sikliwq',
                adapterEngineName: 'p1nqxd6z4vlv6g2jkqp8mhv2iiybhdm380zudoq3f6qxgbcot1duu5jjx3fn5vrh3u3cn91isjp07wu5jhnv7mwyhfb12ink7bir12kezmo65j3w6rnvm9fmgdhaqom3kgzw1rom4rd4ojfapzff4pv2e89i1el5',
                url: 'f97ui9g6xrxjjz2v87kfrv815l01tcbrjpx0rpkjd8cjncrsequj574ykpuvdvv024ikp08nbfgi3rkabmxjj7ekjay6cx9p7gt6sdvw1okd1fn0ctkp4iw83tkl1ypbkf9ykac0fphosoz5rwoo90ghrr8e9khzxdwl4qqslddagjb8s9hzn5m9tdpw1smgtv998ojsw08mi0p9wrvjg49jl1e77f1rvoscbmt3hvz36hjppbiktd8amg1mt2cj2pfpfxz9cai8d2czq7ijhtrv7ltb7k2ottxyw2zjn8iz5lg88kqqxn76cfz0rtud',
                username: 'e4zptbtsdyvsynlfxmibp5sac8kiqqx7i9tzdc90keu3ggbk5bngf0uj0tyl',
                remoteHost: '7daw04k9dlk0v1t2mwmb7lnnwvk6cgx5k2c0nlf4xasiarzigbjgzvj6c7mv5nrfebuokm3dthf10tb9nko0h8j7gxybx6i8b40ady8i8mmrpzwthpew3wdjvg50ofwca4chvvbeyr09nahynr6b4ikrl9v3top3',
                remotePort: 3204915980,
                directory: 'hh8k4gjv8r3hqucvqh8ytjfwcqmuqr4dqt0hmzncmdjww2uca5iqtgulli0ajgmdw5zmcf5xs2w0iqxfaprrw2bwp1q8d4o06dd4ud27mzw76ej1xftyem07bqhnrkqk17ywhgixvsy18yrm5sxorwblx2r3h5t5vsqs6r6zbn3a4c3ydeci7rotrnh6phj97iynq58tft6n2u98zv3x93dkkv0lfwooxhhnnq6j9a5aovhytikgu13wfpqbs08nv8v2nzmgjw61z0f2g3plo6okijfdr2gopul4g870v6xutvs0qy5vjes7zerje5r2zkdzh9444720mk2os1a2csikkouf7v6x02llvyal6vr4e3x5k1dwgnamni4t2qo6i2kafwwz625kssc9ijpobnxb00room52pzg4rvouz96h2lghzat4kiayg4t1hh5d42f03ycl78xxtfpmvs4d2i27wv85kvv3n0xu199kmqo3tod0p9pn0naxf43ftaeevzcwiol384b3lidip5sgxk1x49brl9u76530dy272p1tuk7q2f87pggraut31h3niissduureavldcrltjsz97yqv99eu7h50628ll66zxxd2oimsuu45ve91iwekeanjptmvp2etgortik42i51t8h5u9h6fzpduz0334gtpamodvpnqaezd6yxgipuzbsf2bgoh41b8n0dxsf23g5xrlfpub2ua4kkdzp8mp0qt30420urbvdarlpsl5x1k6ocstsr1au5w01muaet49gg2ck4iyeq1vaa0ldc7vnwrlyksu4tiyomeyq4gbr8vgztmybfnajtjusgzhw15ijwddmkymxw1klj3r365o2emxqkd7tj9t43gu26a5kk6hlhhzz9p7bkhtjo7hm7w3l4ycbm89x5mjtyvjhx5omu72rs4fmd20bnp057a1xkye8sd6mgzc2lqcen6wvq12ue4hs44aka6v7hl7eavo9fmtmob0b21ped86vkjeo3hgkd',
                fileSchema: 'odcv3fywqic44ad08y6crstwzd0dao1smezzu2swrjfis86vrabfsj7kfu452918igor0eh7wqtr9348lc8ffbm5wcl54lukwdfgp2mfk2v2las5vhiq6m7jek5frr0kfllfn2r7dgfwnvoz96tqsa9zh4363me9k4mioep8rg5kn616x3i12e7j4nis1wzxzy2ljuoogiso4um475ueb4qo6f90d18idafppdpvka1lg0478r66rku2vbwdrf08e83mwln70st4wg4v8n654sxyjb771pz34q78fhkzukxtvzfjjek6trjepax3ff1155xy1oj9b1rcxeur95ycpnikpo1v1rnu8ivuq7keytwrsxiaq8qzikdaxp20rxyerdjqjh559bo2q5xm59val2qg2nkt2qefow24rnld6ys2y9va727kviuf9yol0zuvbwo2knvz5yoo872glammlheapplr5of2d4dao17e0wt9xqg68ovbug8cwz3s6d1xhb3dchgjo2tnfmj6qqfm4y8fradpfzazpkfjl0fxfqwpy4upe8p5l77vtlw403gkx9egqlho9dmsbtsmx7oa2afh79gprcorua3pbmjyfwlbg7tuld1wv6rzhjlo9fdah39qqrtlfuqrhg8gu6mdsorv14nwihk371f1c1al17pab1aqsw12kjutdfp4oospi6o9xlg34rslppojcqm1g83pw9eojv9vgxztmxqwmk4tp45j899mtto6jziihlddait8mb020dmeioldidhi2zdf4ctdhf2qn28j9aa49dc33es488ol23dc91fw38qvqslizbvlex6lu17zdqdbmg1hm5vmp97gbnaaqelc4tx4u19n0l4yavmjdm648bmnce5bxf0v65fng791hikq2omw42aymempvmze8m53jx1a58sk03vxegbdjxmnu2rlxkl2u5fx0fzmq3f12jmfcq1j9rqfi56d301klft2zv2e8g46ps13jhh6fyb32dvt',
                proxyHost: 's06ivyd0ovoya2w2cx9jd00yuc351ar9umfz3r34davlqp7p4ym9kkyr2yel',
                proxyPort: 9179311713,
                destination: '26uyefb0w2xwc2fc2oa73oztwwlbgszps49vzywsi4g5haqney4w5uicun6ea8dfgvsgndhr0icaprsvqe9t44k6qy4tyd5f54hi3i10rzl481u8tkt3mdiy93gcpdyo6pf31jpggkroy9fvxede7f4j9x9kcfy8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7fw0edev77hr8lh321azkjakt4ome578tf2ska01f5qw3b5lxbj0exq29qlw9q9it4fj3shse5uot6we7ppun49cj9c5tsuhui8l567jvj10ii27gis1luwt7ih6te95bntouyey1qe9zz90ky8ix7r4pcsul8j1',
                responsibleUserAccountName: 'd3xl5u6v223wwusq30wx',
                lastChangeUserAccount: 'fb0e5hznizew10cm9or4',
                lastChangedAt: '2020-07-22 18:48:11',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '2fzgc9w23x4int548r75nlgon0u7stt381f63wun0ak7wfgehe',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'uujvp1bbiijc7qm0vkx853lei2at1gszvdcaq6ehyhs6lvnmcp94tfi02lb8leiasrm9n0mffo4yes030rxianbj6ty0lmp2ijeflm0flr6lft3lz10fihtnz6bqzuz9ff21a4ithl66uwptz85k120u8xkskj9o',
                component: 's3s0wjz70euv2jrz6oeej1r85yb7aqdtdczbzvf786yfgpskbc7gnjdqamxk6oullicianyspurg14ryi1webn1ci3x2bn39zh5r8hfwp0wzbjvtflxjg71315xvzgfqmcnzmm4wiqcpe0xpztw2lhlh9lsg41a3',
                name: '2zkwtwg3z2y8aldlvll6v5b7qdcobvcm4c6s5e65a7jq9fibz3zm1e90t3d0zclwi98ntwbrxv4olm9s3jb5yrya5ahi4nj5pvwqzv5vawpnn6h99st8eniyigzavrw8uqocmrvrizjy1u0p81mbwjgtwbtgcw0c',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'u2tg0xg9floyki4cy542t32v3qlsnh70z17l41zs8gmbrke0tbqk1wpkg075z7k3xb653dcaw13rfig61wozob7wopbf9tds7b9255mm28pmvtilq2jmfal2z64ay0ve75cjlmn07jp5kyc2pmb1iydzssnb21a4',
                flowComponent: 'n2cbga1j144itucnmxp9x2y95dxbxq9x4jzxtfsob12byh801agmx3a783tk13p17jz7shkx7lz95qk100usp14rk05dq48hggbop6toz15x0mtn8knea9azkxn5vigfr7mg1hrfv45c6qf7sr2q1id24k74zt6e',
                flowInterfaceName: '567vj81lriubeahyj3et9xai7vok3wtd0ova68ycjxikzto5lh4yzld0ats33kkt7hses7f3yuo8lokrapnl65nrnlsfprymkoxfapl6ry7b14v28etiq4rtnudmaizh4n3srz3x9oi4a9fa5dsaupzmqnjg8hb8',
                flowInterfaceNamespace: 'wvjvgsr7vvt3gq1apkt71260sjup37zmksgn61r1k6qk96egggksx1tm21cfl3vzhzs30dwpybzd7un7wl12hs2ik6mafh6b0akvm7b4xwrr0438spft9sb9by5fp1xtqy64rqph3s277u4pi2r88uixqpau3pmu',
                adapterType: '5bk58xmqog6navz2mirjq73wv1r6vv05wka26zrutl6edkwqkdnrz90iv82d',
                
                transportProtocol: 'g8d8vngvnoij246bmzx7x7mdm1v2wkyj7i5gsud0b4ojim5f24zd3ohbu9xg',
                messageProtocol: 'mquwabsfna1b7ilr9xgrdppw3aob6notdb15zr00vxfjv62wno9x9cr3oibs',
                adapterEngineName: 'k75zslsj3apec43n4hvzby7xxe5geotm2v3mtisjozeg2xfd9hi34udp2zwqygdtmqp76xcaufhwrkl3s7gmggml7mhbxaelxxddifha278xb66zrdoj1gduiaa19mccu0cxivuw00kq9zb50ui0gkcbnm0serna',
                url: '8eiti4im6fzs72lgl3j1rgd6oc3palmdp6ebizimtnha2ujsnw7pho7jdciv2ky87918mn8ehh16kuvia3mosy7ydm69q6rnnpny5p2knlqdyh0q75omt9h88y0g4tczym5u3cqqsu9yckpdmkmmgalu7apqcxn0i3mmz7wfn9466j7d5rwrd391gjdrythn4t0w7ajx6z1lsdtm5r403k5p5p0jck9e32fc0ipgiw3uvh6nrom62fl6csd7d5w0l6eciso1comqic8916liaybzkk0ygloda9vfp3g72teers3m7auohwaueqm5qcp1',
                username: 'ey341acoshs3pzx2rhvlpddsb7p6d3cwyj9krqvzhihmwh03sxj7u0t26uid',
                remoteHost: '7x2ax2qi674u1pllwzu8i9wwb1zvyhaekaf2y0p0qib93r329nvp6qduzqgkt4qe7h4852jzlq9vvk56zp3h87ss4d2qmo61wzd3i4ht6was6nw6q899sfmt5uokwlid10tgr77xfbhqcemm0fowl6verntiaixx',
                remotePort: 4578275788,
                directory: 'ypyymi7id1vwo00s10opbismuifrt5827zkkbky4kiokqptufxz4fx1wbh7cyomfhufrq3fwydgspcw0g5jfxsmxy9lqh47p9sf0xy7u5f9buodkmb0qz3k9sri4ibv0d9kfgxvavcxzsqt7ian3mbbm4f4tfo314hcf4dipce3ljb3chyulifjot3lx1l2b4lwxjqtzrrgspu0ksca1q1v5rrpyq8w15cv00utxqaiwlc0yqypifbqatrcanhmd19c830lzgoa5tos93ht0pulo1inz6wttrgm7j41wycff7mabmcywl6th34fdwyngror9vr99408kk98ofub0xyitow7kw48k001fbp5l7p9f4tla9ynud5pwr09vfjufuy3de4pdvorkupgsk5zfd723oomukjzl4bmr656a66wb0bzg4lckro48snnhn9epkhff80rs0rreodxvoi6l36yp7jceq3ptwxb5kkr3qkhttpvqwt4k26ca4e0gcrm1oqqd0d39ca1accyrkudba9sa2qo8v30wyye5kq4uyubgx25bzoxteedh2n9yqjqx5tm2ugj9oc7m8mzkgbo2ve8hn6758xfcdg3iidok5xkgtih08idc6hnybvsdzpxmprgr524teivytc7c0ye5jymio5quftyqsox5hmbhbzz88y5wjn354vpcfjbr6ikawi8jmnsumd7kmpjqpy4wdy90z4tojf42w99aynpguves5ter504tiw3p5wq5arf9p47hkqoxnqy49hz5plye6bzd6wm1myww87vb8g7ltgclfpagul7y3lc1f88bg5oxc1cbgom26qb4anypunocuhtsrdb9gxtutqibxyoguy6r7hlh49t1lrf6fnv98nxfdzbafrzlcpeg2rws7kiz5udhot3iofs1urq7mp4czzlot6ba0mo3vogmts3l5c1p95tpeh5kgeywbux42w8lkyl557kws6f7at46kyh3s76knbnqg0adpeqouqc7fjx2',
                fileSchema: 'bmgjt72ld858beoqw68qd56ya1pdl2291bypg1ngmjwo7680mnjo7ri79w3imd6m60yjfm1ekcmdy6oyy4sk36236ufwk3u5scbjn64nkses17taw2kuv25fx6qoaqcit2k9tdnk6n9vifread6x0xpjvqo11b8zgq2yai0ot6n95q0iv1g5es4macsipwe8sbmioi4aixco3u6j5ar8eodfegomdwa87iu8qktyl80j4dck7e12hd2o6q0wimkzefidvlpf74wy3yww5edwwycmuhy6ryplrts92v64m5r73clu1fh29jz9zsipw5xokddsynf1bl7g7x2o0e7m18c4b92q775tsgbisper2fbd228os935tgvmejl7coxrn5gau38ex4l9q7edt88ytkb8hknwdvuzyqdxv3frtmoommjweldku0pzf42u5rrtr0i48p660dm5q3e8lhwnh54raojmw26d1wq9mk0avz83p753emmwsxqbos5udmqriym82lg519472z0pnk0ks9a35qboroh6uml7oryiuh3gcf86qfreh1nj290b1xmj9m4p7ryiwtx8ryijhwbuwhzntbgkoiap9vljps6bvv6l2qpanwh0vt5x72dp61tor1zbqkr4osoodz2vx5qs974ts2aqvt6g2qkkz7lrbc8q3h3bsntrgf2kwflcylsjkwurkkoukmsveitrgkrytv0k6r8l9zsshne07cjss4u1c7jesj2o2vfpgi12vrfeph1euemt84xho9mw6d45dkftmfa24e9p9mlikwsj9vp4rm0bm4sw42ud09f4dhn8fw4iby5rfd5l5qyfi8gqnnbjkrgvn8ztebcjdvq5dnpxf7etda4ajfyka02rxivxn94xijv5zsrw8sdl7itmawfonkm4f7dvd7s2r9de72af3wiy9omto4sbefm5scwdrjemmwlsdgskkda8etq8be3scjn876cfjsbszkay6oeg24x5o3vssuygm3e7vx1x',
                proxyHost: 'qhe6s7nhl8crtb8f1uyym288lqbjpeuk7hcjli32tan505e6l16zz74jpyne',
                proxyPort: 6630044251,
                destination: '0wlh6uaf7gb2x4hl6jqiow7kyaphl5yxs58tnve70hji729c4kh1tyni383dpiz3o7qw0v4hl9n5xa745sie0m51m1xxtemrcpu682abo0s4fzt47z0gptjq52fjhnxg3d7ns3y62px7qewad5i0xw1tr9ihyfw8',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'lj6gzee6s2t364iy6yhgmfswn5ecl27lhm15hgl9op6x4dlsnaxnqxjowkbmt10w6zis488skp57dz9bq2kyj5a9vo0fpe1y1aznhsmc7qdxyz02fpjewku45yau09f9oblj61i0o9lmvl48w8o7jle80i4aeq7f',
                responsibleUserAccountName: '9xzofy5itxqypsvpmoaz',
                lastChangeUserAccount: 'nixfnowq7881evqnt2a9',
                lastChangedAt: '2020-07-23 07:18:35',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'wn43bd3fk5jnjofw7iupaqvmxcsb8zhbqct8l71afm1rdi86x6',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '28jqpq8bf84dc35u8oiafx41x4974xlq1okbr4tw0uejbmop1id1r7ndswbqt5bkomsmm81uka4q7zkh547wwkvw7wviwrele9am562k3h0ggweu53s87jej1azu5unmnpkcwq88u5yggzrzz2kkar8i7sa84cia',
                component: '2on2kk4bd1td8rfklhlo456emmx1ucoq10e2w4vskpje40nfaajoa7x3xn5w9jnel65wipnbcimk41q4v2x770adq0pbljewgn2vh6zoyqkenltp6xeh0gzj3ean5z8t9mkn4bu3x1ol6pfwtyj73q9uuewkybv2',
                name: '7rb3a74228ixzluybwcjhk5bhqfgmvr6gkoaup8k38zpm15grs7j281w4xdf4qkclt1bb5xalyxj6rxgu41uji8z8qecn4uo0u5ya1beng5zcsx20hi3igcgzyn9i56gziwzjwtamrwxabnzh69yit3k68qfqolp',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'zwp0fnscq6porob3ib8kyx9y691czbhltufqx5v04j5jtosx2q0zky0hej80lus3a4ng598j54syjokmpbkobspoygewfksbwxm13pshag5qif1l472idxr84wx0kiqrjcsi63qp0iennz9rcjiujo19r1dtwm6l',
                flowComponent: '7olbk9exkrdgllwjkyw88rcbesy9f9g8blorqwwjbes22lhuawfc6dg88n1lrit32gvt0ow4wat5ra7r6mm2envcvrh02u8peuyzohfhwa84ls51gcetger8ojlv1d9xyg167g8cf7ntfqdlnfeqr7s2m1wy62to',
                flowInterfaceName: 'nimohh5buta2j9u1hqokxsi6kha54lf3hkvpuu40rvdhkp8fk1k6rq30yllutfm6j6nj98xe0v8qy38fecbac4cispbe46tveqdqh4pl1qavvfpsenj1stzay1z3uhvnfs560wvjn4u2v6mjpbtnbjfttjg81gka',
                flowInterfaceNamespace: '7ha99zecyvi2vxvy7c03l5a8nxvrdie8obpe1spgie14mboqp29lrphx8k4lz0stvdultmwob7rda4d9mw3sep4hrkto3s765394rob5o9jd713eamv6f1vrpjj58ssxdricefcp7fkfd1plhhofs74oz1vrelac',
                adapterType: 'zhbmc1ptgg1i4khozisokh3h2zar65lgmvgvfhtg7adffu1t6yin0t4kdu4k',
                direction: 'SENDER',
                transportProtocol: 'zvbpb4d54t6t1usthhaul0f6s6f6fw4shcnzq5mwbgrry9hgg0b79rf8t5dc',
                messageProtocol: 'x4ci3tjf0h06ujiwcjnjitorw3126rczn6vqvgduoaazmssuf8qgjgcwr3n0',
                adapterEngineName: 'moo1bn59zzzmhg6gwwnb6bm5wie4xjinkw1gdrlj4ym4x134naoz4vzs360dfz9m43t2geu45wl7ukq39j3kbvmntr56wruxllahf3ha305lh6lg24d4jtpjj555aoe9fevxkpm2xdotkf65uy9eribwzavresek',
                url: '2lrwczf24e2dl2njs05yr9xyoufqgmqcfzgbvdnnw2onhwgdkfol6fgx4djz78pqavt6uc142bwgjol61so1aougvsp7r0rb253m1xlxkt2gcwzfvqqkki5inuhbnbozhtzrib5852g0t5thz7nat8eqsvynejo4r8s25rcr413a9u32uyx5ewncr4o9vac6tdogqyjxz3cd3rn0g4om0san3j04z8d1phtuxqh4mi9azr870cwryb3xxztst666wg752osglejskg136zvw5zflsmyfyb28z3jtpk87hs9pgp0yat5l92pq7iojpxak',
                username: 'wj5acydyzhmqhypwmhsfw7e28x37tdd96vipqlz7appv851nj1l487fiagi8',
                remoteHost: 'oknetxeirufeu9y0be98urfqcrr2w4l3m4uj9jilpgsc9l01ytrcil8px3d2x4ntusjrdn15wgyvkv0myn7pokwwpdnamk2mps95ew47c7ulomm2m86ozpqdm8wkain5usskogbezsmp6k5a6z01vhe70kx1zj2y',
                remotePort: 4741246252,
                directory: 'vu890o6mmg7ks1q7vbzf08t3tu2jdrge42qdldfatwn4v8s4f05q72xbz7s1un62et1u4yy0lpatuzcew9tsyjafa97ngkqp9vcnt9ga1reme1iv3cnrrmuupllj0qt47q0meenoz6apwcjwuux5jm4ggwv8jekb81gumpome7vsqoon2kcqno2zb7ezrxr59y1fyu4a9a7uib1pzuqldorrhnjdjtqjllwo06g6naiw2pdj7uriz14xmsvm3tjw2ro121drtfiq1u7sm8xjdaejha2mpox7b5ljdn66n4w00i6wkjis5ytvi26vv0yszmcu009m5s9lbi1nr40jumoj2vew3tssgbnmzzx1esahwpjszepu17nv6os203qlizl4941bv58d3at0p67p0s5e0srncxh0eftxubut3rekznxaidsx3tpzqdqzatbjs7hn2fhqhax2z8hik56p7v98895cq0kcuc1d3s5625xywl70eppyrtp3t1k6jybfy7s8vuh5441vkb82zg88y9vldo8jjxd1b26gbuckz0tqd944xmrg5p2svlpwpcuphgww41ryt7uugvkueqjyti5a7v0zx11fd97uywluzyhbi7t7jzj3sjwxykb841vz4vyqp9vouu7nh6t8khk870th47j04ozyuelrfycd7n7h5lv0iairfw1t4puqgj5orbkz9prb8eo93or0zq2udnx6zxfkzw2o69d1kzfody9skjfe5tlktvsxtvb3cfhle8ot74g0s15ytsbmai51ajg62d44afeo13mho23psobgnwi5dvywwvskl0mkvpab3j1nbhs6p1p0z0acvptka2nf1quljd3mxm06xozd95x3qlfxc4htaf77p44bsyzqksik6oh4qdiicq4pxqiuc1cgda2jl969x53lz1ktc2k3oh62auybym2jxam4ek7qj0wz6ynmkfeq389b22mudeypolfncs1zsf9e2ljj5y8y201nnkm5sw9ojn9n7n9u',
                fileSchema: 'apx3119ojpofluu2cjkrmdyfe7dqq5bc0q13ea20hp3mhi048hlhio350a215on88jihruvqbhz0th5ixecx9p0cvth0pbkdmzwfc6396faahzbfbhtqer1xqhnigwd98oydf40xb5b7jw14njiss2gmugx2yor6fl8g0waqh96icm2sd194ovlb4be4rnyxofvwbi5q89pjqpc8e77iekhb176t8eq3x6g20swkao6der8537vyvbtnlzjl4wr61ea8aiqe5hoa7m0n932uxdd2u20qx7d9hoszuu0xan8z28ibpgghs2wgiqctohnhw9prcmzmurxaypvfs3acpjadhy4d8wrod7shr2a9ot1nuqg8kw8glg01nr2jxf9owb4uwv7f576fo23s1g9yc8p69lpjwz5vq4r3ty6w5ski84morz9q6dbnzzruvjjah57a5xf0d4g5tig4ga5jwf8z772uk7mqmte2fwi8usnczv5dott3dfu44m8j3f4grs3rrlt3jeqmsba11xf7c69fqqbowyafeehessd6fb9irujo36t8a403rr0fxaoduumyu89vxa887c9ugmrbz2sc06o5mm5kr5l2omug9j6qvife2m5qf4uo9k9rq2lbsfkomjqdw4fwxet54sivwlbssssyvclcihr9xqueli0c1qcj1hciue9uoy7339c5qvs2suiduasm0evtoboy6x90q0tgnw8phya6ncztqx9rny35rtdk3ssfljfl969g5p2ljury7lnv6x1kcxvirodwosg0szx9q7d8wfdghz1tndgofs3s6us6iasf49cwkzbhgcmg2tyffrti8se0gq2y7hqmjwqdhh1cwtw9dydgb1qpv1ej324zpltqessjapzmreq2r2bpzfsic9oxsvms3ykkztu6xim6zssoo6lekackss0trht93ulovdkxf05dpp2plt9ghhjg7l29siq1d9u38iccrifmpn228dwfqczokttu18p2hs0mn17o',
                proxyHost: '16pqben1o1u6mw81hsp076rndsk8xzx2y89s33230xg7powucrajb00vuo1g',
                proxyPort: 4048994970,
                destination: 'g0ebzfos3xobdvuv9s1ydc8zw710okmbihxjntykkp7oudizj89qnvknd4ignyy99zumtscl4f8sw5mvfse397lwbyiaz98wip78i8fk24km953zwkarr5gn67t8e4aqrz0rsygf784msu05lj3xkdlj8gxtq30s',
                adapterStatus: null,
                softwareComponentName: 'ftulyky1nhc61c6jz3smo7us6e970cto6lrwivnhkttar5v5ukq34qp4msslhgeu9zv8c2llochw7q8qw6x2ot2775uz9609wdlkif29dpgqssrqy9p2l14iif265797yudx06tlkgsdp6m9ac5j0fu9ucldwk01',
                responsibleUserAccountName: 'keobtnyztlz3cvon8xf2',
                lastChangeUserAccount: 'du2jypzd8gxcrc9czw3x',
                lastChangedAt: '2020-07-23 06:19:48',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'f7d9kf846pnxruwj9hl62zcblvahts9xjvvm2z16jnidgtcdq3',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'hnptrdyw6k5z5rmttwbdj75adifmvo087ob6vlynmwu25fqvjn6n9cdioe8hwcmoqp7t0occnkf3jrxdzj9739motjkjlz2mm68hvnm2xople1tx0n8dqo3atawboo182mqvq4igew9tpct6zddj2rzwx9s2bsqu',
                component: 's2gp1n9lbzsq6hezpxq6aj729rsm5f6wgd1mpqd0fa6e1hay7lqs0lrvysc0so6999xi3mmr0awjosasnrh21hn1mq6themejjiat08knosvcct0pm1c96r5tv59g94t9mri73gvahlcwbjgkrz69nom72ufhz2d',
                name: 's1flw3vipdizmhr57ut0a0qof5kjib265oot1d4gtout7v4lmzgvnfqads4gh0fi0k20w0tmqx4ud8dg2956csrgb5krpijkz06wdv354w0uypi0ia08y6qdmwbhtsti2xrywdt8b4em4d39om5mhp0qcj98p681',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'sl6x6ajxlyzc34wa8b5eksogxjuwbowe5qxuxqgfyiv5ei7nf6a1f28ipws1es20m0i5yd7h243nu24bopm8bqzd11lpfq62fnguqid7148s7gwyrxac404uqnbgws68n3t06zvfo7oc3f559c0ffamft76rzn92',
                flowComponent: 'c41m0ony9il0ko3r89l5s1ujdpdqzn4zsqg5g46f42ht15ula6bdm0wde1mrtzxou1upjosrzvbw0gcdtzk5qgug2lbhh9wdb8nsvuwpx8kt2yegr3ha7vnc9ut106eddostd343k6ofxsoq558mb2codlwvllqt',
                flowInterfaceName: 'eupt8tz1qxdnrhz3xlxmwiks2twi149xzk3gppqg3vqgx40egmcgkhrml1lyw3h9vrx3zqouwc8og40w3x6lcc2zkbiuo2zzam6mwd26etnd3uia9ogmifpv1njvtujsoji84t8rn8b9zyknba07v2mprmndpccf',
                flowInterfaceNamespace: 'sm4g0oy7r761vtb7j90vljkopbomxbsmvrluejfdrmeo5hioh5utqqto4i5er2ie2oz0vr27r0ewudegwl6jwpg13yasfvo6f06vl7epbpl0huaplighp5bivy82qn2ykhssimftphsecmxi8254geb9it2s7llu',
                adapterType: 'oi7xjsoe7oxz8iv636hna1hev8qdkhv2dabe59u0sfxkbyg817jafdmyowmt',
                direction: 'SENDER',
                transportProtocol: '8ybbnet9e4tmcabrov7d6ztkc2gq272zsv2785hyr3119yku00kg7c76f27k',
                messageProtocol: '3pqfxqyy1ogdyii4i8rx4f5p3vqjojgrheh4p7bzcjgja8z37914ezen104m',
                adapterEngineName: '7k9icsakrdna0vfnmbygwm7s09uizzosd3pm1hyxrkzx4rrtzfdl7srhkdgqwc8y454ka5chu19f1lp0ojee5plxxqdm9vc3ghm2vfj6r2gyk89kbjc7uvrpw7vnl50g5xwog9wzfymsxd8lp25465nnsuh7pbpl',
                url: '8acp9mnjie72m4bgxmqokxj6ixwkgweh35cq0n3vghn5nzyxdo5u7n6byu1acb4k0225zmiv6jy3b3dlqw1lhsytxqkt3egusrqy169n9nf5fsryngyphldo20hc90ov9ndt12jlcxmpn8jakxr65kqj601k4yzd6v0p242st02p6oojlisekynec00d9vmjqhawdr23be0nnq89byvlvequ2v6wkttxyyqwk7jrljn78qdrcm8dewlxruhxhdlmf9kdm2rjue34ygzqlimv3o1qy3m6pimo759zym810r8x4uf328r9oj0jibn7cfs5',
                username: 'glpxt4vbumgtzhavlcabo3m97y4pa5xtlo44n0c2ramxgcjnahlc9qr1x2er',
                remoteHost: 'nk2sjve6ipbvyaohqlv1p59ys2pi8ub46t612hz9heppqt1lwedbhojvqeoyltsz5mb1lbg1j9k4duldphlll360q38y114u74tr7vy6znfwo08hsc1da632k5k7yfaf7lrseb4g9o8ukzxhrt9cz2uydzi8lqbv',
                remotePort: 1209217733,
                directory: 'q0xmdpjtd50g2utnmesn13rimuxy1csi66snpjhpecjh4u4wmpwtpxgfk09d4s9zufa5n6oy9hy3mm9qhkh438t4e3uy28p3ctoysffrylnym1kyq3dpnyp2c90zm6d7n3kgh7xjen2us5nilaituimizj9o65q72htbz0strcua8pnbl7jy4qbzq7e1biiwmoakrktyru5sv1y6a81djomoxkool8qw2rphimy4hsm8iqfvabhpjeittdnaciiafq9pe22u7kxkrfdxqf38gq5leuvngbn4uxlw554djmsm64nlpb37wmfx3ihrz8f973ci05f50isf0hnrkm2nmv9c33znp96hlm12wm9m8z1p40fgn1epte4bdm2wfn5lr9yfdzuraye2ixej063e1qldlpgid0chgfrhm1u6ed5g6k7ozu7t8ylb3wkg077ig4iyh6j3ymvnghfi5hiyofka00h0j7vun5dphs5wfcq3gzfjhrnuw1aqr4ivptgw2gzhn8qglzjfrfkuoxj63fjlx5piyfjm2vncwd062g0xeea2519d5cq1tcv90tvvcgjvepnvz9hwsomq3ucrenogxqnekvqg9ezafu9ggfclh573tut1op0xoc47kecr0edwhwzupl54agy82vh548aq99tp2icidp76gini65eyhskxl5r9i1jnobz4yfh2w1tkg8d5lwk2wx04a02s8e81cc781it00nt1mbjty6att7x21ddmhsqok2ajhl4qqq0uwiredbeazql72urvsgrijdk1fne9rwm97r5ucxbrazboaeq8bmxukppfuptyenpddl3shvkgwbgp8ual2hrstuiacu3cmyud1v9zvd3sx2pe7wt6j9v4dcvcx7jywusneszf036ycd9k343bcm2r7xrmnxov1ktnaf2yjosyiy5myphebz6h85f83952bcz8k099vpg9mykdbf9aowrk57vyul1co22y56dof4nhp9mvb88k7sj2wgdkov3e',
                fileSchema: 'q20rjqy4o36fdya1e4ukzhcxg153n56bcax1ndkr02mww5r6xtwavzebw7fxidpecvyuwiy2zoonk1i5adu0etvuo0k2v42uuiiyp4cmiq8dplswlrf7i5ynqghthfkxyp3bblluqkbqmf6od0u1gsx4pzr3y1xyi9y2ts7hgccdy2year4zdip21kchnhz4nmam66idxlsv8irwthlgxsr3vndvg48d37j4dd4fa9lahq78hlxt7sf4ymwbnla14nmt14p94cxny19l4yxhzv23yw6qqgubonxf84lhq5s61q7tzoaljrpwxc24iaadtk2boz4pare1n6riize3zuhl662kkfliwsz7kwcq9y1wvg0gxio7l2szg7q24278on1svwp5mdj2thzp7dd3cx0oeow3cfzkmuj26hcqdzyqjeybgz7sdg8zxmkqp2cokdbcveulekm6bnbe8gx1ggof7n93t3rk6neaciczkslefn4r3gyoas289drwtvpfqxmwvmlt1bnlj75tl9gavz9ccehvgn8xd4h39xi7o6hnwe24h18lu5qwxtqu3dmwax0gjo1c16n0qr0rmwyqrdjiqbvsobfrld80ojks4jwor5q5kl9qslz6hbrar4co0r6x6k7c0rv7mimfgh63zpkud4678i13scziamn7rz84yqqjlyejapnhct6u6abodp5u8wdo4l8pyfq69hswnn0zg93gkjonqupopo34fzpaxavkjorcpq8ssmrtxu1od0hlqwnbwq6554rjn9iabiy8ot8s00xf58erczh3rzvrgvoneoz7iyw7wber5j52wkkobljtbiel4yhe4uscpq8cnzgr5hxa1k21k197ptn13m97xfcgnsletrg7fvysmrlhu7u0sucxx03thg13wk0tpe42kal8xgerru0pc9ee3ukpnfmmgdx0bou1rbe7pi0ui5vveksb4729u646pujs8yft0w2kjw1pdl6596i9i4l78pjq6ejtuyc9s59z',
                proxyHost: 'lk23ewsotcozts9ldrd85mz87piwg1sffv135aajcv4htjlwl373bgyqh3t1',
                proxyPort: 3731866499,
                destination: '90y3lssux38odnj0rryugojek7sb0s1i1kat9qb5s7e6x26jlm2b2kybobggawn7ng8ltgd4d9apmnvnyeldb4z7ovtpu8j4tzhid76k24xt5749sx723hjwm3vxqexv5qimjo5mhdt28lx8jd149j5as13ei0n8',
                
                softwareComponentName: 'stlde86dyps2466hirf0iygbbmlrvkztiormdlpzfn62g7rnpz7kwn1lo4tvtv2hs56tnhmxfowvxjbj3lbkuim4miq08ba29m6m209m6476ppgc346ol0oarallyklnct9klb92nh8w68g635bfo4w9ns2exa5l',
                responsibleUserAccountName: '8b62d105tf8fw8guqccb',
                lastChangeUserAccount: 'ft5ogd5n69ca92l94ald',
                lastChangedAt: '2020-07-23 04:35:19',
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
                id: '8tvpm5ou4unl5vro72hn727lqu5yat1v1khjk',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '2qouz23iuzm3mh5un1r2p4toa76bsjjbfnaax5sd18af4oo37y',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'mytunfois1dxovev9g01b11d0eot13527hu6xiyqc2cjqlagw53lm9fec0nunrdl8dxoz9k5kdi500600c9nqkyvvp0i4x6znwx16pzf5j7htw06gz94y01mbtkhjnoi60k04to8aqwcsrta16s4rfjqdmaweomq',
                component: 'tan5zwjk3m8a9yr4wuvqtx5608im8r03v6aozwq59umeqddbq0sua8zb16q0cev3kt6xyun4aeyu6ghx24b8nzinoyj91cyf6e8ik7icp65jezo7yztuy6xlo6p5yh997m7527oxixff8szcdlkmk2c77bx7kv2u',
                name: 'sk7p7dxwxs2mp6cc6oq0bj6abdkihyuzwvjjl9vp5x8m2df0jz6agvwuhp247524275396nto1szrjgl3doq6a25t4ck4l9dcw1cqwcjca7boyvmiwcicdxpqotbdrebvtp61r69oby75fpboqj3juae7bwv05dk',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'ibn7vquk0dk5c1spmrjz5ep4zzzsld0h2fp63zu3my4zxr3yui5e5s4a35of4p0p7uahg0xdsr9cbh3gxqt9o84i5yibpgts7acveop6zuue51uzvaofx6mg0693vazzd6xokwgnfuz9njm4kcw101334uk7wqal',
                flowComponent: '6s01tdv14yt6zsj61qiy9m869mh0o5321r5roof8adnbehupfqe8xny0zkbj70zdmnkauenbrvjvl7ydfnn7jkjtn1uqfxsvi1q262zy371fgln749h4iznuk1zuy2dzq3iu63w8cj28b2cbfzlsaav6gpiotn03',
                flowInterfaceName: '2hmnpq1u28i1lcrt146s9835zzsz141mf6uysh6zv85dkscdqdg29ttxtbk5k41o5j2rcj8ccdpnxz26v2860utr6pfwhr1j1srtsdxlmpl4kdfyf5uubplrgfrgzppifj4xbzislldlilgw0ms1mj76i4qbmwdc',
                flowInterfaceNamespace: 'qji2aytbkfzjg1a8evi8d1ygh4ae7gjd6syd4m0inkh77dyf0bm7on1zr3kqmlnrq6s9odybg2th3oc671r1tm0fijlgcfmgkns3cehssf274sdgo851bixjs4cvosqw7w3nsg4ujeunxftjpjjmcziknc3xu4ct',
                adapterType: 'u3ne6yr1svi3l5zqi396b327ooovae67gc9nr397krf02qpfpwj4328zzjp0',
                direction: 'RECEIVER',
                transportProtocol: 'ejmn8abir1wp404xrkhv9hp8ded3lppka38a2w5bzs6s42x6s0mejdelrcch',
                messageProtocol: 'tlnn3duoncvb8ln68drxdkfn8p7qx6xyagvzsjib05jsgdafbpk4gdxg5zrj',
                adapterEngineName: '6qthxsan6gb797sd5x6oaf6efp8mieneu6jhna6s9ibowmw6p1gdpsryzkp62r3cwfqhto06or8ps0p3kyj9lv4j21t1hja6mtmk5u9bwdrs5fq5sexsswe6ii9liyn15i85kuc51d7hysrfc9er1yvfjxaf9xle',
                url: '4faaqy1v67n1frtxyc5nh726go3w9lpd41gb7xt1bdjf15vv5lkm2b908en6qggsijtiqezqt3znjsrpunx71n9ttlrr3fuaub6te2rl10k5h2cedh4slwuqj0lgx4hiaeza3p8ny6icl94n88immdn03uis75958shqtmhfggqb3nw4bqf9b3zzbi8kks6vveu43ymj8k0o7zsg27l5j252r4axk5yqqo2xwheedat00wutuw7nk4l3p7q8hyaphjtb5tch78sdcs59mqvh9qg3y31s6g5fippaykrn9fgqqwpya8tcbhbveinzkxjk',
                username: 'z42n2mecgxaznjti80cpxql9h89mlwdeyzywqf68mtv9gkq3w2o5dbnxgw42',
                remoteHost: 'pp2i3ofeko73z4k8fbgkpjtxmjpc898xi2n06lr5m988vkl8ziitmabp384l7jel2dzl3iwqnxy2jv11gxdlzqwop3zctokapjoktnnezdd77d8khhf5kzenesp7u1rf9sx8krjn3glyq0xv9kxjl127s9lh98x9',
                remotePort: 3639045313,
                directory: 'u7lp0caqkwsgpa1ackmlrz2izpez85csn1do0pn2h8lz6dwkdg5k7tfhznjm4q376tp9uksevvakce3sf8nue5ozqk4g28s1vlxkz9894chzs06z1fbu8sfmzeh6b6dkymlq7xuekqbpuh0x53zeghx1f00833rdpwp50vsm4yrcg2o4fu72axaw6ygna1i186dduddwld0d438mcuazavl9j4mmgl22p637ze53kgjf45fbsl5tduq6z5gfles7ikc40nohk15z5turqc6fhb5d8lb5fyw8fg9pswvjun1a4h3opb8cwlocrct1klzg2ixe1qhlur87wu5uvza2opg3e0ccfdjqddwbwqxmf1j3rx5yev1hbzkh2ivud4c3p06as521ve3t0bgswluj7snapxq5vx9q6t7449m3wg81alrdmu4q1h113jmic8znkhogpodx20zl5fskh3tz4cs3zrr7d14s49ah580f4rmi8mr5cnlq1bq8v1taqsfpsnylnro9r4lw8wsw47mfzhauedst12d6agyn1jufyv0p6s937e4q9wwc9t6ygaua914pm1q74x0v3hyfkgnp2t52s0197w9mehoa97o1vqbtxr2xvyx0lrswsbct7lc76ba2bfz704aqm4u6pbw843ekvhkyp1sxpjbb41nnaxlh7ov09ipvs8ncfzyxj0tifvojmpcijxelrbp23osovkc7rnaawn70sbp5seq49yvlibqe8lu7htb2qjihmjc226cd56d51gldgj2zvjam5zt1xvy4pndazrfb4wdvyq2x9xl2ebfab72dp78m9cifjnf2e9ffhw69w5zkbnhacw1nyksyn8v627ite7p58d04rl6syaoxd9g5u703sfdz6e4u3lz0ers4ieea6yr2z3swq1dgwu2w7dj3tkq39hfcpg4lerbomf2qnwbbkw9sfsf5705ybwh46xb4l3qcjz7d6iwjpfhhy2e3njiv5fgk7k9qoixdvu0z79bjs6vn',
                fileSchema: 'u1e96l2mxkoyx6w6jsck6lej1aeupcjnffmpzjyvzv6upblaxisfmh24quw2oht20ew8c14o58x9ds315m4m32odv3k8ka5p0u67rwmijbka0jaculmtbohd48jp31jhkvjm3o8yz60aus5mkr8hjjhklxqg5su7ixtexcufoz2tg2j4nr2l1h46sw9g9ez9tw4ld0go3vzm5vqo7wrn45fknnibnixsxzyvmb4cawh3h6ns8m6a84ic1nm3momn2awuxgzaq8m13d1iajd98s7aol2jajdrb3q6id5pemv9v56dwbhi15ocb6xencc4x001cuo6fnr8mdkud2bwgunjod4u4o9g6t5klqgef3403ttyjfzc7484fzsshzcrdo4dhrdfqxo7p8oq0wsre7mo9idweqbhslhlcsdj47uobzuzrz1krgmyrbbysb8busqwyrsc2zap7zz0zzvu5szjtr3zn8c1afszilo7192eid4tpy9o7r3r8rj22efhtnuhvrgrg0k68leiqix4lvahw22xao17shytz2kxatpdewwml4ioxfvwgpl3h5tlc8xeik5u1a8c4y7uq6yle147dlcvedugdygfgmf02h66rqihc5l8iw6oaqj44vlynrwwrummcbmcj5pcnt5tdgl6ngi214f2mkys7io85zo1d4yjtglb19llvu07weaojgv17mz3jdmrimqivn955eyknahuw6esimpld6zjk58tk23l75bvhtsp6y8sli7218y60ye00e9ugj5f3u7jgq4kc380zd81ld42j39gfarsmu4006erxt9mfzxh8sw0nxmeyazb72tva3c9u8f30t8weyis3uxy3ipj3nj39paok6pgyus2rdcoa1mp80oq6pwajs2as1ua6zepn0v1ioplrmfbw4zs6cudvuv5qhg798myonniag3erchdawyr032x9qkgzacgz6z9lqhkmeraotcioyc9xd3sn4kw3ertat3yt50v9gg1ne1800lj',
                proxyHost: 'et2aga97776rftf1qflion0bc625eru9x1w0kbsljw29yf5glkos1952kp5v',
                proxyPort: 1157257958,
                destination: '2b8cdosyfho91f3ibzuxeo6nlisl1z9xuqn0ntym5m0iqljf4glasmcbrhnyuaxjvrpy4he8n2klsc327jyfw8m7xujq4403lvgoo3xtt1dfasyef0z0fzjx96lp6kn2j3up1nbkakhnddtnbvfogha6o3oxwjhp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9owc6gd0bsjio3g89rk6kvgp3mpekn3vhsfq4xi5h4xdf06wh1pnz2txkgukqtedzsswknsjopaxaxds7ud93o6e2ahx6qyfz1qekk12s978z3jujlir9dgv1n7nkkojb7itja3l0o1b3rb4x2cklowerfvt7rmd',
                responsibleUserAccountName: 'ogfi5goierq98sgxui8h',
                lastChangeUserAccount: 'oxhmddiv6yvfju5huojd',
                lastChangedAt: '2020-07-22 22:14:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'ius3byvnthp2r8icgtznh9qrl8625dqmkz040',
                tenantCode: 'yd2318bbip0bgai51uz9amg7l2o7jj1w9q91q1wyhumb25nwp8',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '157lwf8ixsa10qq1h454wjntcpwhpa9ncxx6mseensg0xsljcwqyky2nklvso2rue8uvjc7x1rcgud976dylxzrkdrljyfyghqr83bxe1g906b18c1vdrrbrjcq6cpck1tueed8dfmpigqwgwcu3jxe84p27zs9x',
                component: '8zpnkd2g884v9y1y70wocmosc9juwwkq34rsqj1eeozmufk7mx177ne34zaveiecmah3jvobqu7cdtco9lt911ed5w7884ijin2v4tx00bdb996aiy2ydxodxreehhhdnadfwz82d4snhld5f4bedupeoippx09g',
                name: 'fxhkrsduwbqrxlugflbuxf2tx9vjc7r9ipdfh720tm41hrxsnljb2ytma9km98i22wjx38w6indn93mwk19u9my9vbxp55btrp2ur8pu8eff75gb87sxykshms58fcxad5c8bmuprop9njhy4d7fywjzr1andv0c',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'yvdazojm8ve66nhu2sb5ksd49g0rnevn3lfq7x1lugx8a0zegaoo1f6ban5fjgs8ceh1ux26iuxejmsli9y8rfc5e3itr2s6vw0iw544m87nxckeno4e25s8maa8ti67kgyb450gzmv288eqi6gmclk0xgn6y401',
                flowComponent: 'l4osvfsfrwlv2h549n303vgc11mao4q9y13kp279gim7ca96tglu8i7k2t92pa22ynncydz1sncnpm7n3znrrusjut1ma2dec9tegowvixmagri32g4jdo7qwb6oysro0z260q5jkhk6ee0j1b8yx5xqaag3bzwp',
                flowInterfaceName: '13b56xjbuu3bqtkt9tp4tv8ae6pn36pcj40fjer3r0ti2c633fq1v7keijadxfymcbj1j657iiu98jkjnuji34dhyxrctcmiu7yhyv9cdazl0uf70boim1tg0zgzhixh6ee2axtmu7pfb1y808hhhwnxdwzbr2s3',
                flowInterfaceNamespace: '3f5dgcn72lpslro8hhcbo1fzpsue6ez590j3xpayjlz7zhfsljis1f8ej10rwmcz6146952pnq4qi1rii7z49d15zn6117bonh19mast5laqq4zlv59gn02iqfzvg14idt0v5w9x3i97l41shsatl5h5m5me5bp9',
                adapterType: '7osny3kyi3rvz66zgeed4atfrtfmx6p338sz27tq5lkjumal1km5ieofkq1u',
                direction: 'RECEIVER',
                transportProtocol: '8srf77d1semu60gcopmj69xnto1eklbicbzj1eyh9uk5o1syu4ldmek1wo87',
                messageProtocol: '6s2jjf3k8bp7322o6y6uj0m9ytfxz1hqfghuub19oozogmv5ua9a0sk35ev9',
                adapterEngineName: 'rprwgqqf6bph1qp8s8ouvy429ycg0556v6kworh8ol4vsvbmil0ah00fnzb2ckpc2qsoiz67j41cqkiuy0x9hj0bx7z23tsxvw5798ufrt3168cvr2qp2iz72utewcuuc99nn4lnps9nkfe9h666ztwqjlpg1vda',
                url: 'ejwjdhfgo4ic30v7oskvyl6nvuhdeumscczr8c3a1748j1mn9v4bndgcvnm2awfrlh5ojgvbjkf5nv97rusqr52eq6fypoh94160d8edrdv82cr5f4z5v6dad5mhc4ocrnqft597kqreyfzni8pxvifxcuyuz0d4leuey479jeev5pwk5we8f07iupainqgucmog2xx6b2dximyin6u3n48wvctzvrgek2rhaqjknoij1suvocrgxwm0b9fsxya3xcv5m43no2mleiu1817ca7bchyogcyyck41ounpkgzcdba4y5fnf10wgm9g0aere',
                username: 'l0x50tfdpf86vesm464pa9qmjdsz9yrlyy7zicrw4599u1k47vw7hti5l9z5',
                remoteHost: 'xzmqr48zgphn8pbr0ta9hpfelbpeim4v1jvbrl7fswazypgwcy8gbsytxcz4p76kh7adxv3bgizmvt2wr8jihjprmcitdefi14uxao661bl8fwymkaaxlkipw6l0nucdkkqyv54maxvjk7btcsvvrpvpsvc6l3ov',
                remotePort: 6199378623,
                directory: 'a5cch66fwru3lmkf06th3djqwn8fn2a7jsn3yhpw991kh0ljctklywwe5vx70wcnxtel8nq73d5cjsoyh153ln2hazv8z0iefhn0ln1be87uvbfy90iemjnsp7xapr0qhyva448kxaabfynq4rwns9e7sfswauz0elfr5ave7vcu59ap1d60lfirlcofkdgziaj0ouful5w9c2wkkwdvtedyl05k17lp0hky0ueo46ppvgxq148nhy8ulh0f4vbqce3lfdgz6ubh47umam6irxf18icft5vq1o8bck02ahaj5fb6a4z5grm59eeljwo0b0xugomkoqu5f1k9i4cuzwil7iqdhrlcl64o3md1wowikfgwhulgv5l7mzy7w14qtfrkumg6qpko2mtssekcmszzt8in519ter29912h1endwge3ves8r4c1mloh6tywah7aldslp2ajt74kq9eio03pv21br75at0otjzgt8lbz3nxi334vejlgwl6lw84mdq35usbmoss8h5hpd3g7m3vhyencr0nzol00r3omqo5vhe08p6cxpilyn3b9g58x08swi15o9blkrv364qizmu6gx2oicogvl7kre7hq4i515n4d80wa59pxeal8u8we9acjfpkzxf8txs6ory5xvsc59lq2i7q9qb64pahdpjowq5odifiw35ur1q7b5n72vv3le4osrjh68vkhih9r7uohzdxiog68014y2pd8wsn6xy2hnd1nqy1k6whgvjhd56opoh8hg1n7df52ajlop3aeifemvd0pr3uldpf3qp0y3kzpxmgl1e7k7wjh2ysfuokqw3e3fq51cmk820od9l1ksz3xiwwm6350ssdam9gupurv6cdyb5lq5wkpiifvoavdhb0dv3vza60sa9ssrlf7vm19csfmuz7ij9e9mx887pmu842s3nzcbfie7t0xihoicjwkj20uqumnhaaboqsv0vnd82dtfz0zvpd26e13ui0vkix9yyblhsjxouad',
                fileSchema: 'bzxc5q8t4957dn477lm62vb7jirwna4p3vqn8xf774pk7wm75417j3c6toi0zw4x9cdkh83mmb8rnn91s6lzsari4yrfn6e6ikdna4xpfmysjfaj07drswmfy1x6y2f1o08jpon59ohs17bsyj1zavaul90h43ly5tns13x1cd7vdl3pie6sa2kn66yuhwjygmc030a59nzxiht4bzdyoe0l87mbgtnllrav2dpoo110br2h5wqcbwnsqjoxogpa6yzrhowp8zro8pcc8v6kbq6htadav5ap6lf8918f8ml88suq0ahjlqvi34i862viju2wexhuexuuhuphe7ndsecc4lbas81sma3n4r1vvogg8b5zymj485c5i1bcy04x323di379f5q377b38kygxdjgfsk6kobmlsfxawwcpdwv1arz3zrjnreygx97liwfm2q8ymj17f088t8s3myx4hsep0x36jz5pdxfqkuj73blu1kbib20s9vt4jhsaud7ls3evt6z8e3teglmp55rw2s2tvi4u6tzm60ckm0gh6uskpny35dmaz00xiwrfyginn773wj5lp0emhkqd8n21806yb9trudhqun27qz5b74fdw21wz3ppqb4g7ej2wpwc7a2suk0zhzphxix6hcif1tim82n51ohhsmw0sc9znkpsttzblaz3err7oazu66hsvxu1yvw85eigbu5mt71yd912g9pqzwrierzjylpo8lqx5kt5pfnkz3ubb04cv36sxvg69vxwbd63eb4utkfsda190vu4vzk12w5dojc1vqjz79xf0qx1dl0mwqopgkzbh3aqtq350sbx8ronn1d2d6wxcaon30az8hqdzlv1eeeqcknx18wku4iomrlxc560gk75ivcz9ur8dfkqgsodqwce4k2t9wvu8y3fe29fz7y0u6ob6f8wiqefczpz9s4ddv1ny5ax6nk7i5pan6ajve890e4pge376bi1epucydjkzda15cljbw1yydsmx8z',
                proxyHost: 'hnwl66hh4e2wekvk4uedmb1vodhed1oos4gg17xexko0omwu5u6ylwrio6z6',
                proxyPort: 6866142686,
                destination: 'lzknbkxlxvzen0cpciv1d1g60usxavaglpm6t5iyzhw8onm0lzwi12v3j1ylv4p2tufgfd57fc1dwmzi2w3tpeynyj5jvt99wmjodbu51ekc778qw60kvrk2lmhtm6j3iuzghk0w8xdwwjiv2hjh6akivot49rlp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'txtfbkdsatg010g7wsslubbseybjc0m8ty4l4azbafff7t85hs45lo4jl90vi7jnd9x1nbk6nvpgon4i019tjn4az6czemcj6e770xs3dhbxeaxmv2kz3jc90o3804qgr0n0e7isoam5c03ehzhy3m9n4kqifvw8',
                responsibleUserAccountName: 'zpf44dlbci522dvmzwgo',
                lastChangeUserAccount: 'y88v1bbslcepncg2uxrs',
                lastChangedAt: '2020-07-23 12:40:55',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '7rzplysfr1h9stqiu7605sno56e2cleg69l3ao6hrb7zhxfkxa',
                systemId: '6570avmm3qexfabmriy45vwjb3j7h9ngs8vs0',
                party: '4vsxfrtii9kx0h1ini6joi9qnfyu3pqkclhao7uo77pcegborfwx1mxjek999aiqgvj468s3h7qual4syrj6p4hu8h7mzb0mnxr1jqc3jrb8k1g2eynbmz8jfhb86ogqs7rf1xs8crtb7nvypvhtyb7iqwef3ino',
                component: 'itwvcareaovm0vkslbmjl4ecgmzhnoie3mc4u2wq9dlrm0u3opv53dy8w179nxcbwkqq8889avyk0dw1bphkyp4841z63c99z9458r50hgv0aokh95nqrmnk1a3n876vp9qf86cc5wizovwuxlgivh7mnnz45o1x',
                name: 'rfnbem95ibr14d3pabm1zql6yop48oswjuo9g8cfgemrablaot9hvsxaezqj8e9mzmzabauv0a97sku88zgdu2qv7w9w9msb0stdf1vj0mu6bm1n486uxl2m647la5fskn8q12mdok8g80g08m3vn7rg2nh3dlbc',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'kd1s1lr4v47gr2gkm3ktu29ss3mnh51uxsqw9ego2qtv4511qxe5hj53d4hqpuqfdosubtfzi3g453gqlho8fxzzleyfidlyxd2lzit5j8mmrwqetywx18qutd79biqig1hqkoaw39drnqp4qif64r0ibylk0tde',
                flowComponent: 'no2i1ph6sshk9p4x06nv47dnt2dmqp645y41gvz3emqr0sb63ksqpsypgb3hsvjotks6p6iuzm1jtjowjtp55r60yi7x2197crr8zvw8r4cmgipouu6uz0grexytw1ccrtoeekflklowr7uore3n1rjgqb4uaoyq',
                flowInterfaceName: 'jvyhty99q20afhmm8nv402h19a3po26gkn6vdyn64rqkxpaoeibjbkdxvxx9m524tbhdjso7bnrp7mkoj8prbh9vvh1mvy72a9a0ej9xibjpxirw47ne8vmb028e6440uln3h09cqz83xcymiag0qi7gjzfaj258',
                flowInterfaceNamespace: 'p1plnh4rftw4v3p4g88yqttrchhe05iihg66u282kmzxuilme0jz8y2fbi14doabf8sufniif1zmoscstaopa60g0hhk8a0pr6sjgf9jtnlwj2k5unregg9tpjkvi2hgks0d4nfyrljekyc4ui3d7ei1hmit1a8j',
                adapterType: 'nnaa56zf2z1f5xq4v2qwvak7tt82ldz2iwbtqd44lbfzrdm6lgykq8id3u09',
                direction: 'RECEIVER',
                transportProtocol: 'evay5eptaeq8gt7h6ycxo1c9isv9n3u1sf7aboj2roqb0ra09qpvxdnzejsa',
                messageProtocol: '6kgrvkbh6m09xljaj5vjj7q4cz8ts15l21kqh3m4cilh48um5xu2ul6jt4w8',
                adapterEngineName: 'omnrkygy6p6wsxwobi89dl3qerdf3fd3d0py9cm4ftr9zgif92vdkafqjh8hrk03rw71dpsyws93d386s8tdj1bsegmokzbj4yimwxjutxc4cqmqwl1p1bkpbo7i24acveizchejpj3wrvyxvhcl60ooeigovmsx',
                url: 'htks3o6voggrx9t0wtcs5jdyhlvldgpirk43w2wgqw9nqlj1z13nykcqif90szc41mo7s173bmx2hr3m89i1p7u9wblbyfbq9esubqwtbbynhbeodue9ghqjsltneawm75vra9npszkm5xh74rk3tv69jtq2m7uzm4ztun34b5p2x8p595gvl13vtkzn0t6pid4vd46pktlhkipdq779pn0kv8o82widjdl6kyr4v7pm5h7gew7fzvyi19zvby482erx9zm436ud2rd68qiyv4l9tyjk6bqni6mefv3ufzjjt9tkyndy1l8mc1ke516o',
                username: 'g5b51ygviujr6nwepbelxhy4xrqewd0u4w0d69gm8w8pzseks4kcxk02k02x',
                remoteHost: '9sv8171xdxy4uvx8z4d6t3v87nc51mki03odgbisbtzpblqmkt55e2goqmniv7hdffjv012w2nxhxonycsvaez95z0gpmbcnv77vx9dt71a24jy8zg0a08m4f5tz9n4c6k1s092g9khbzfqm3ek8x3d72vebtx1o',
                remotePort: 7674741654,
                directory: '18aejby7arrd30ws3fr0r7akvhy79phj1q4sy56fwag8743ag9jutl424cw4dnwee1xu1r93ta9mg130muz5o183p32iuem7spsxpw005iduzq6gfl9scqy2inhntkphhgz71qqjdket5rwb5sipdf7tibravrhhazfg6oktqimn60qx1ddeu6frk33ujscebpsbbmzpofxip2myrj9ye2nctmslvv9qfzco0419cno0kwdrnv6qk1ztgbv4c78r7t6h1eexv50uqkwv3dkhtcqpafept0hilgms2onbg8cnvtlayluledkjbcjnadqwizj13znfcl7y50marve1daoc3z15y3a9tclvcbhrr2b4cjnheon1jkxwo644ajkncfom5ou016ylst4prnu50my8tfewwkp87boeq58azww2yvfife2ez10senv0uslz499imt1ffbst4nmmdxuu7qpev5f30ocs25jhszuhq7ztnsbacma6io0vqox0qe1j683nmchhvuixgou0p0tv0w0wee0e7ixwqjag6jcn9vb59uxxqh7ae64ovtcu4xepfbpm9ays2kbdq56qvrb2kx4prvilqf5szhcugzqiizwcoosqjchkf9r87ou7h5u8z7tm3sq2qums3cl55vbfsr02uofar23p7hu6affm0ftditxfq2g548n5zsxxk6m9cq6lhgnfiij3tj4v06u6zph1d506v0c1p2997r1cpd5alk2b3aqnxh5alg1t43spit6zhmucn5n7imgean84ftf299a0qq8uwilba925ccye6nxaleezfhglss9tpgzqfdg33dfcspmaysjy4chia5p3ak77k251613f6f2oujeqxoyad43r5w5y0g3v3jcmf8dzllrd42v3oyqmy2hdl3duu0nc5ktxspmf5uxvas8zsefrjkcc0p2rcgg7m7cq1vb4siuhegxychttao8t4o0ljs0sd5csjm12jonutol2hmio8ss7sh6avxu28pqs',
                fileSchema: '3743gqgyaob3xn8ypv7fgxdw36ra2tifjz9q9xnj3pwb7at8wjcah7jtba4uanvrymc0z18bjyh3gktu7mggtg7rdlahbfare9kmyehdytgy6bakxn94kx7miovoe66yory53sfyzjm7rpmc9flgkyse46waurzezm16l0rz39godkwr4i0u9t280e5hajpc0ygvizjg0xuomltz8rhf8asswxkn9fb4b50owv6g8s2gdrpdu36jm8krgzdmwu8ywgcsnikf24dn0r4plfqaky6wj4hlb5raptk9l9bx9lberjrdjjdnj5iebq9gykwg7ojtdoujxbikz6vh1afkbh1e96y37imd2v9gs92oo2hg8436sczm3qeut51ox0d83vhpp8wg86vzsy7zv42o7fn21w8nf3whky6il0hitaxf0xv4sbrg7ycp7fz2jxnrxle7cphes2ej3squev0npzu0rw0q3ddo4w1fpjwao0rj6uh92kwt25zf0wajplpqb86jvmiecpz71t2588ph55puy96vkzuy7dji7lesazhjw4scf1k8gclka599e4oys2topk2g1s6by35p3gpqcqkri3wy24gwp13ofz0yf4wj1ul4albu2z44g3klwuwct9ww0rv5ovvp5alnbthdu21u7i5zezf92c9tvv3lx2foj39bkfq7ajijxmlumap5vpfnpr91m0bh50lx93the9tvjia6o71fnxqqbklzoaurd6q1n2wexqgox9sfnbc3je1vgx48cxf8zi58h6142h9mcxh5qf63ldefvmtm06ycznz4mh11ltf9tlxqoj64z4xr72g3ck5vsv1jmj48d6mpedkcuo11lv5vlecffl22aotspbjlspotq0o1o9gxazvr5ke6hds06kiby6lenjq51gnfp5g95vs88kg8116nc3hj66t2nvaips8qus6wmwy446246m9wfkn4wq06uqrdbaaaqmklysw1v0178pauh60w6h1d9w5oii3bicm8',
                proxyHost: 'qm022uknkborowh4cxs04xnd7a437zf968xfh1yncyvfji9dzhj8a7p05cqc',
                proxyPort: 2131034516,
                destination: '8vx6yix4ioo79xx18u1k7fjn7g22u70lgivkri7luk01opfwq9hujgot7shdkq9j2ox5z3qqzo6f64euymsh0bdv7xhzh36lw3q87vhmxaganojw09hxm5wwebjws5gzoyqvb721rvpzodri9df32fg7xr36rhyh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'y0pdtfswmax3bi90x0z9j2oeyezx04lnbrxqttp6pm1bhjfbh6b9xekz6qa6dba41an7kg75x8pr5evbg0ejv2ppcorhf35khwto2u0khbzon432ohvy60y3nzlcf5h5kl0bh8uq6z8s46c6v8yrgy1qzofa5q9y',
                responsibleUserAccountName: '531a10r099rxdflqrr31',
                lastChangeUserAccount: 'p92y6591dkblzhc9rxc5',
                lastChangedAt: '2020-07-23 03:09:39',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'ez41kbg707owmza02tx4m700wo3lxww9puj6o9xwnxtts5qpg9',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '6p11v6sqz7i30mxafq11qsj9e5dai1uxxkgcr95c5cxaftqxu0pwhfjiu1rptc3vg2rwba555gj9ntalvxe92ks229ypjuhc7a0vkte6x47x1v4b51e5i35k2eua8gnwar43o22ejqejsbgb7zo21w30376yop0l',
                component: '6331273tbz4w3ma4r6qzy8q87i1fctt7wa11qal1nfu9pnggilfaz7nwbf5e0ewcz42ac2it406b8se9qeclphw601xu97l2q2cvkal7r7p3x8zpg2vu0pv2wofxyrf74srn6jxgl9mi4ahbofp2ibgrxns3jd80',
                name: 'b7vzr8zu2iq59sz27h2ois32bzvq62u1vz3qw46yb7biiqt9mt8ri1n1jq6w9bl2eqiymmk9ssl59af27ijkgzmuv9r0kmxig28vyryrjimc1e3chcu69u1q71a2kmc2xpeik9abp05s6nu97c5trcduxdthwh79',
                flowId: '54nums9nwj61zyku93virykme2y294jrqdrgi',
                flowParty: '4cayx9fw05wu1ktmu4ijk0gieyzxv4hp65sj2pvxogg24n3tk68xcczss999ox1z73qp8ps7pa7yfszh0hohz42754uvbxh9tp384gxkzeiryasv8ygro8ln9l1wbplz1akpgblaeixhi30iw85aupz4v97bw8og',
                flowComponent: 'ewpmkmrj43brtnv85xj3ds07z7c9tpo33cjpcb6u2hcrfjcfhk6ekacl6qblizmduz1mu5s7jzbgykbmf0asfa5436ox9o57t0osgvt8trrhkhma4ci5an78t76xnglek4rulr36uo3tmc4qwm0ebz66c5pjdey5',
                flowInterfaceName: 'cnsaxidr560req6bupavv9stp754j6tqh90c8ex763q3bejkms59umrlt5b619zkdn214ojicpn88doio4gs34ntq3585ggpwuzmwqywmsdv6xw4fnwss4ux5w45zg3ymw9iisl1wd80wemjaijtv2nfont4z944',
                flowInterfaceNamespace: 'g84rb780a4baqw0h11uj9xdjh73qotnj83x5i504esu9x3xx5fdvu9m489ke04ksnp7m4bs47gh1mdfy57jfru13lh6dhgahl800o0n6l4my5lvgivl3n1odcj52bs2v4n6t97925nmofa41wgdb05w74qqjssyx',
                adapterType: 'udacjurzh3d356ec2odxtnvz2ldy21p80u619wliu3k0vg2dsdeev0o0v295',
                direction: 'RECEIVER',
                transportProtocol: 'b8yj4ybo5u1dyhudjawgfqfbjg1bwyoio2pnq6ljyn7kt127qy9zn2klm9jx',
                messageProtocol: '7h54mqmi0h26l0s8ttzlyyjt3o35lyichl1mv9wspo8aeat92ckwkj3haeyk',
                adapterEngineName: '1uwrdvqe0fw9ta8hdpu52k3fgr36nqsa7u744tusbp85m2vcndtxw42vz6j6z7y058pm58lt3uyf1wc9wxl6c12w8qwjyi51pk4t1mit6i3pxj9qs4y4nk9y7bwj2bvk4c5kozwmzggnxoowhwm3r1cg39lq9lb8',
                url: 'gnx3kd4g4z0glxf48e4c4vazrdrbkbc8cah3s4sa6e6kfcypbruy8072zncr1dsxxdf9ed9kiarboppco8rippbz8gc67ddhh8fcn44lwbjaqojh9np15udco3w6nxrw5mz7v6xfk4ukrzphn64cbk94eam91c99fczpum7ernzrco5x2xzqzm9hy5izahcut4356n435gysr8zq8drppd83igjpo4boixenwcodimruc5mbg0imytq4r0osoc9uw5fd3z0vw19tee4q0y7wxaszma9zgdl6nosv71xzcjghmwu3h7o0uaaij8mfjuy8',
                username: 'sb0vaz0ak2gqkd6p4c2adp6sn3m3nwthz405e0cwf279y8i8a4y09jh5zps9',
                remoteHost: '55lfynwapw7p9sj27j35yrpz2mo88xhu1hg68gll81uki2hu96hrbcqnp8t9q9pt16kkjvdv456npbpyoltv6j8qes0tnzm1k5gz3ziwtdhf0qvhjjebfn7zw06920togykcfvz02bc3mr673mb8tuqiwih6v65g',
                remotePort: 2911196163,
                directory: 'jyx5av24fmnivfau0kjisj8in6szodtp50vf9p2r6kb7l01ga1h12kpzyht61sj3mlpuvi5z5lab0xykyd5lukey2v226q5gb1k5db82n0p4elhoglaw7ihvwxsrvv0gnss24p0stv3tmavsmmpcwx1rdnreybyewmifj4dty47d4i8boeohb7va240p9tyfhyolkgo0ayru4k9l2175ae34ohvlwckoarj0x0rzk6qjxc4k7fip7uqkc4dsdvn7is83tben06o1amb9sk5yi6x26mwuouegfx6ncajxxu2md6fww1nrfw5i26cod5smh9c3705mkoq0c2ndgashuk6eueguzz8bvcgq4fc1egchxp5u23tewbty5hh4d9szeh2s5bpbm658xl4l8hg6cnt3qkmx4h358rlummd52jcifxwcnwl8hwg1gfsi7cak753dhr0rdj73x8bsft089zkyh1bcmkdrszzqcpcamw34h69s4a2n6ywu4tgik43wjn4q0kyp9fm0wgf1q7tbcnqa1dcj82f61w6lej0xvcz0snwcl3sslniwkb36l4f65q5osn4qs2or9fxwzrc0907hnugom1yf5bc6cgj0xujezdaafz1k2xpt8fhejc2lefx49ljmn5ikol3kpyapfnbu0ojakji6q6sahma0ushxkt5lpxgthkbh0v6tag8536ml1hcp5v16qc7jhja5i7vtq3w8hjdeui4deau95oyuuchwzk80mhp7yr5n2w8w4odnh5dbgziz4ogswzyvn3a77v42e1mh6l41l89p4d62ae04ymcca4y08v698wyqzsoxjyj9o4ryi3bs99bpscbxw5vkysxs4kvplhmgf3p5jvtaos3nxeodz3qzusfdw7brduwi5kd56bpc0nib7b04y8np7vo9271erwnb9k7iu83n0j35u8qa0pmqd2aa9buoae5u24vhi6lhczlxuok9hc8ghs7fk6r79jj13y0lw7r5h9laq99jx5y3fzw3',
                fileSchema: '3dvh4lskilhg42uwearljwx997ua8bozjj297mc354usg51hkudcx0jimfbi0frg4z291gc0mw8ksjr37kz6s265bag8tcne6t6yg1ivf2p6pltj053w8tuzf7n3v3tt0bfwx4g15lzqo6y01t9erfm7xy0fuwy0cbrbq8o0iwiznwu8ymbvm4a22dwoydw9ewvuem023cgf9weobbvnqmyym3d213e5bzm3rmjwmenaby7r9s19l5aovr2yw4nd3binfcj7hnm01s37wqhix015dkgdv696c2x9tu750mg1it0ox06fgjopzmfyqfuob8mwsj9tc8z7u0kg1iq3b73xa2lbsv11s1ezevhvzci3lecsu4miov05pbpk4m26oq6uvivyev8luz9jzt44dxyv43dd3f6m56e6dz22jyhn1528easkd09vywy4nzvge4ct9c8g6m1yb9q6f0a912m8aw6in5ka94q1k5uj0t1fyrgdwvtv71vk8oaj6yce1g9yhhbmita8569n4ejvzwb9hcrn1yb7on8028mh92wd219fhn72ld8gaxj2uxlul1rrdcz4c4yiindnuqj0gzmg7igg7tg6p9sgrr3jmfy48k5my33g18vu5puf0i8dvqy0gorw9afna5v6dwqjbj46ak31ozdt7bpcm591i8wi65v4l8wn4fsjnqwrrw6aejzb2sabbk0cju5sbcu10hky30qikfi03s4dis9iy8vyzxokw06drjlaoz9evra58zhdaaxyfc2c843rvroikhpb6gj7yan3ec5zr47eiy4540l6ij3oobg2a4ce2zxu6svcobwojainxk4jl442s521ngo4q1dsh64j7prcc63f11f0hc0j62m3t4omytubagyevl65623h8iayg49wsckjakcmht2u9ki7zntui6x4bzys2gvx3y1mtu1ik8uckng46zjvsx6lp5u1ty0cr8wgk0k2tjxhq5hvp5pfmvxaizbjio6azksuiowxwgg3',
                proxyHost: 'oec29tevdzgui9ee3zzadbyuppht5yb87x159h6fy40k4rmoyup1ukcrlsyj',
                proxyPort: 3580027824,
                destination: 'yhl2miju5552lvnn3xri40j6qer4ymjsmt24x7rd2rhcmmfib4aiq13yz6f1dc6qvas09z8jb129ycxsuw5uwfuas9hxf3vun1dl899vs054wjpgmp33scdum7ct1692swtmpj59l3wl55t6fxsayd87o40d774c',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'j0l3s5rzxsoq65d3jiy8w89o4e57qrw15ibuelxsiqprmpoyhsznvd7ik91gmcfq64kvht4uj69o87dcqkrsreml5lp4vpfrwb3ew9w6xgg67ys2pflgy6tpcjs5g1pklwo5qelobybftj4opj9rmusczm4frw8d',
                responsibleUserAccountName: 'yynestlkj35trcj5w8t3',
                lastChangeUserAccount: 'gkp3rsyh26wzq9pahpzn',
                lastChangedAt: '2020-07-23 04:14:51',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 't8ri9di0m9jnuli0a3aiqqoe8j283dkpdmysnm7yg67xex3skti',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'bwlvett2dzely4lro8pzzxg4zomesxf53ferlzrkeebs79709rdlwl8rarb4972699mg121drp6fqc4lg3pu9thlkxhsiyzzxl9szzyox3vooit1i3xrubrft3ssbi9rhk06ewltvqis65linds3sr2ojyoku7n7',
                component: '5sgs7r94wgxo70es1ciy7p2zi2bns02d213mtjk0uwju5dn19393790o2r5dg3djg6uybmy7lmctagvmbxsbpf6uckejib42xjulw179792nxwbxeag07d5eea9migwkbipasoduv2pyish6z6rbj34pg4ug56rs',
                name: 'b5cki7x21q5nap8htapummuyg9hkfdwdrhq91w3w4du24twu6fhorngr45a4czwpi8hyn5tca73espeow5am8tjqdzljmd9c6hqtt5jvqsiys23ojmdyl49doukp3youdbo2e3pxxokmb88u08j4ubfocekpp1s3',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'tasjwfcm8i1onq5doc6ax7ytzgrsw1der1t2ne8nfh7i1io9tzjgfufr77k2za9m85fy3ogl4ea72cdph36qadwoxw5hh6yrp1tz8mnz9zufehcgyo39b6qnbkv1hyjatrrythnqecbqq68gndfagtcztuqh8hzc',
                flowComponent: 'dtpfd2vs7xwl8r75csuysfxf2qjonhfj2tmncky9dcmbvmj8o8v283ewblx30qaf1or10oye7yd7i8s29rd0h9j1ip2j1a7nkcbe9qhda4uu44z3320enhxqnnwsni9l92wqzoevwuyq784606h6dxt1ihtrl9iu',
                flowInterfaceName: '8oemkbfsswyf3fz14q03d2z0dliwfhw73641mvtfu50wnu4jrjo288b4evhxauqdwkymfthqi55kp48yvuu2ta3whd802gedmmqfplsf8m9211x1kopd6m0w64spkryszszornaztyr34nekz14gvt0o4ono5o8l',
                flowInterfaceNamespace: 'yh0xqcfv18utrkpin1v9dhqhzhjz4fnq0cfohqexaqhqgtdsttud1kbda33545p35e2lh94cmrba5fzm8yodkks6zir56d30zdp6nrhuhef7am7hfeq6fxy135dprylfok4ogxxuoch2yr2lf0friowvmmxjr08n',
                adapterType: 'uzf9yhom0rukqmixkecnzhhelov6i3s7a8rcvn48wf8wrc3tnsqide2un2k3',
                direction: 'SENDER',
                transportProtocol: 'lvsfvh6v68rhe7y1p5k3sgmgt92ishq5cyjn7lw4rtzocbftphy2nqdjcn0i',
                messageProtocol: '7g584y19255i4zuxdxur6ey6n05sawiufdsgf4ehqy00cxqvxb6vksprlbe7',
                adapterEngineName: '0r54kgmrq7todlu3w26xrlut1ig3l109wykreofse94fg0wvdyioupt2wxvweyaf060a5i7a52cs3i09w0tyaj89pt5fr88eihs3stjdxsqdazi3hprh6euhpf7vots95sbne8zo1qzgsancg3bjjbss5cm88ttt',
                url: 'fmwwipwloqbxomrhv9f2lrrr7q5lagxgb4r1l7ureqlzuth7qev70nri6dqys3s4qe1twr7ubkghuame3t13bkuifxioiil9kt1uo4gl0abwxhlhx3tbz7xwiepjgqr85tsm2ni8iaef0kza6qnmrfnch048xvvp33soc25sd49gpdo8oigbvtj21a2tmze6kkw2bq18ux9cblg00csgmjbpuiry3yefygxyq8uwt0lgp5p3ebpve5na3r721g95z6gyxot3p2kq2sukm15kc3zxc1p3qup5vj3iy898c8bbhc8pp8073729llzww82u',
                username: 'nroxnazynalbdhzhican24n34yeltj9jgznf936jewoticojh45sxg82j591',
                remoteHost: 'cisyn4w0ptdwmp6qt3v7uaj1j3rao50zzagmq8w49yur0g4lhtct46folxwiaibf5w9cfrdibvqy8afk0p3kwq0pun3cfygixd6eysfi6w64ujc0ybsqy72f9j5bljv3pbf58otfx06wcbct5ia7y7q9vv48nsi4',
                remotePort: 7894318887,
                directory: 'p784i1z6onu0yhxrgm1s67klpc53gbfjhyy51n02lhrce40ux35dtyeocx1jl51zbiamcriqpjddclvifea7usdcr914njzgd75b2wiiodao8gnqhx9ejfajrqzc6cnkrvucavrlsxt0v8uh8wsdjmte9qggbsdej3k0hq379gx2crywtykowks4iya3wihta0ijg8f6qlf752yuw2oh0lj3lfdu1wbz7s4ue12a1gghw9wic2kh7nkp8yv5ufeurjy03b34z3xlqlqwxmzapvmn3uc92jzfdbmgkwxauhn18sknej1tjnxloyknpbxwe070cuu4tergsse7eha3u286matoho7vsw0xwyema1rg2ypyo5cgb3xs61a7hznp5wh7jk8553kml1xkkktqhspn9tv51ymaws4123pm2ifstf4yvhsz2tng3rn4y9yto5bqda31w9mpzdcabcc81dbcpmzen8yiaaoygx07u1e4p65giywze2w66b3dmwa4wog4imptbtyy3m0hnnq7j50yty307pjzdzixsplejtgpqgpay1hwmvop6km1zjaorp53k5642tuh6i7jc0hqth3slp8evtfdvkcx35ejm2u1wj5wn8u9gx3u89bhdz4z7tg4ldjkm2qtpgzyv4fnrb4dm2jrd91dv3euhh6n2iwmd4gthjgp5bjmyapd68ovv0ennnvpktfionwlc3iw2awxfy5idkzxh4kep2rlry51ltbfzerlated43rku34bjsfetur3ufjijj3npbmt6hakf3ainms9mqv21mbme8ut24j70lmznap7kaipz0q7kuw3idzd6zyw5zjj0k6iq46m13e91zozh2wuubphq3bw685tz9yhqt9kriygjc1s650gusjd3fct66ezk1su2e9e81cjrd43d03ocpp21wrc5warr6knp751v2ovfhz6ohwrb0is3myb7klmnn07ccm8hw87u8hikdqf3wrpvhtzf0h1lpt1rq47dbtwtpna',
                fileSchema: 'kv9w23d0u1k45yxkocrmipqn6gnm5p9f5wnv0d13qze6ix28lxnrwo2ni9ozy1uf2wb3p1bmbznk9wqy3e1dnj1y5uocuwmalte2jjatww21i6l2qh9w5ffphzq4jwq0ck9it46q5paxdm37o433pmacbrcqul0c6rue6sj49xmfodcq0lxfrr3nl8w73zpr3y9zgmqkc3z9dlwj9wen1kv7paim4ezmxyl4qhzfjsnwq02n4x4todqjr531jjm1dsodruqh126k5dwjzqj4zc0fomnl1hlx2laoxyc9ulaacg403f19d4r4hirux27wgf47flk3mz5mjrr307jqvfadollvhtfplje4ovl9iux6l2h1zn0ipv3oc28e3te71hsva8fl5zk5m4suciiskb3h6r84utfsbquhfptwuplz2bmn6bhkiijugnq4f5j9eqoymvgbb4686wv3455scbgt7tz5mzl98dc7dgo7pfk0kp6pa8kmtyes2kycncdhkthglhqfd8pce90dyulmxu3qj3dme2fbzlbjyouumrrle8vu1jcllamfimdojpvilwoe856icmegea9vooihxe76salus88ywr6y1bbcd1grd11dczsmm2uic2w11ilasum9luajdorqdosbjkvpl8jyr226240dwe7bcdtf1ka3hbygj6fsmikndu6ars7o49ahyj1ruxd8lo7zqj5ljl60u9c3nh7132sg2rqdira7zjukz7uu1kf6fejv4ujlhm8yicof6unoak5tgr1wyxq08vhzyqo9oik0xcmhmpyna29w7lsofe7g3f2u5stnoseu0pw8naxsmpz99mf2bw450jnrqdaa59dd3sgfnoshuuaq3plye49shvsv04ovtfi0uhse80cpd3ne2stgap15s9skhlxxhvhxzhq5lreniyqdmcv9378yjf1lzfcfwn6xlvtkxo6pybdwhy4eipz87uqhho379caj2f9njivzly5gwmukcsyz247o5zs6',
                proxyHost: 'ccmrxjqnytsism8gqdio5yzknc7fah02zitpf566s0azdp5e8cx2pmqjvpxu',
                proxyPort: 1313232563,
                destination: 'ylo1vqbrmvr34uingwjm7065wsjo8yqg1ov285qnltut1623mgjhdvmwl647aovscuvhg5v21unbmxz9ksvaokh0w40n6agqv9tbu6x8n642m78d72r7vgxm9c5rfd8e4epeakmjrb7nvdbjzvqym971vatdo13l',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8q8j09kq4u8o666xc8vyvvo8dvs3kngkh7wi0oi9ebqvsd697msvj6479x5rtwwjbxz7ool1qtzpdqwd1l62uc8tkgw93u8ve8w7rcxyce4wi19cd0sshpfyh4vsnuunq46162hnwk9ha1ru0v7zfj6qyj7x831a',
                responsibleUserAccountName: 'fy1xq2j3jhg07ha2hshw',
                lastChangeUserAccount: 'jyc9bs5u2uqsccvg39s3',
                lastChangedAt: '2020-07-23 02:04:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'u5fs52rug2pvr13sa3l37t6zjoh9ztk5810l6iesh5vq0wophi',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '1cb2puoaqfr5ue8feit779zf5thhuee5ytyuuagku0uvrv2x1kibztodcnikhbu4n5t6f8g4uylalb2lgqul6re7nxq5jnjjs243ls6aau8htvi09h4pz3o12iygneaok866xq6yz99ainn0yk077qsmny0d29zx8',
                component: 'wzef2gtjmvaf64wdez62tgehmbhejy1rzz5nzhbgaqru2fnmh90xobtmn47vz4ggzgq9tah50hz0pcntos5fg8xinwksijv1yv6gom2lyhqz0x0kssc6cnw3uzn8z1mrvhyn6a4ndlzwoy6r9gbmexbyvaqkjple',
                name: '1x2sbdl05wj0yb0jdxkd75al0u51gr908g49rzr66todxt7yp1nj8ctpgyt1tqd4c8za8ovdyh417zq39b1n9wvm6m2r3d71z8yrkbft7srsbwzynft6l1rk2dhbz77nteqswaamoto07beo4a5ss4zmzdirekps',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'lu4c9a1q4csf6769moxhcsx7qqg44k35ze5or3cw8tyrypjkmpnxmkpe4l0z6rwac8vt279x671d4yr5kb6lxawwsv8pvrxf7mjh4ephudu51ndl01to5tudkck6h6qb4mrlvdjjee92qb4y6mnohb3ociohxuqp',
                flowComponent: 'j65wr9vs5qo5njor1szmsee37l9704nsw2f8sj0r2v0c4nwsc1wu8trmdoqedg6m56zfzvgufj9qz71z8fcd39tad1ij4sjpdqxjz5ozv2ca86ba2ctltkgkyiw16r690o0klwa9odztgwvjymn4sgmwsmdy74aj',
                flowInterfaceName: 'myayqsffgs15zcdg9akyf4yyfxwhj0yzcbyh3tcwpeey2f4e526tesznebmffkgcro1f4e55ca38th8dncp4nq15f742gkgjj8mqelonoznh3ogzhh0alk8c48r100lisjdp33u79rkgas7c5hd2tw8v7tp4qhka',
                flowInterfaceNamespace: 'f0sqsep5q2jzxmrx9787g94vfs9vesvwe10khyu73lpo7bxszft9rpibqsqv2il7z1xfvptezl9fk9mm3zgiqend9e2db8wohde5ny4rl0qoo28tmov4f1r0zwd5k53nbtcb3w1o4ohul8brfo6k5wlodd7mlrba',
                adapterType: 'g1n7xoy11utmw4hu8edh5frmlnl5u4nuqq945ha9isuz9wk95zw8n4rjvsll',
                direction: 'SENDER',
                transportProtocol: 'tl78fogfdls9fmw41hv5vpxfxlar9efgmi9cnd5m4gmol988f2m8x9zibkl5',
                messageProtocol: 'w9qnh0fiywhgpuda13u39zqsq0wimry5t3y9kl4d441me934x97q37jlbigi',
                adapterEngineName: '9r0zzaq51rn5b0nbz60nntb83vo8xbexfh0s2e3488t2w58w3rwqizyd6leubbxfd6y3girtg7jtpj1m54nozuhda2an1od3fqhiknziz8q3vqml057di9tfq38wptrbvudtfeizxcr5nhc68xq77r4fltk5qa5h',
                url: '5lfa375egqe3h48v9oyoydjdhtqxcj4fz8oarhbr2dthfzvxohcgfuvxedakncoxeorlye0ecqtdzj343g7a6mwtttntrk0309nub9rywi7tfe6uifb33rpl8gj53edbt96zjpkohu47yvwd1b9pkhi68h9ve8nhm4rqopmvtz5b1rr6tfwauus6acp1ea1v4us03qihkjehzlnv9iq9yd89ixkt5otrw6ulivswn8mbiv33m1bxmqgvfly6xjiqgma55z5kdyr58rdmeloiqbgdhuf1pnqdt4i1l4he1a8p2ceaxl0weebdwv5ob8gx',
                username: 'fjt9nay218oqxyayet10dkg43pnr9rrd47bdklnp248khvt0qckgzfw6etug',
                remoteHost: 'hzfxpvjl5e07c4zsbykug4iybjglag1rjxt3dqwnndfw7a7kq1zq0usg6b81kt1ywnmxa9ovb99cj7l8c0i44u6ofmjfestagi5dncv441de3r3nql8i2mueybcg81bwjrorv0j44z4mw7zlsk9ckr9sb7bduuh8',
                remotePort: 9105558821,
                directory: 'ilqzdet3h6ypcgm68a9cs32mbhknndy69njj7jlpbqry55jrdcun82eqc3ulcvit12ztn67efc498n7on3v48bicric7g90xosmoxk2dz6w4un6emmnpk0fw7l1yw3rdpyu1b1hpna0n4q7q6xixv2tz5a0hkmjpwryhgv8dhlnwanqv32aspj8p13bqhmierw8e9s4m6953178ci85h1gbs97oeobefbjl8817t0k9bdt5v1af5m19ortgfl7748yh7ufba97yx0v2svvb4w4b6x6xrr9mib21bk0j72fgng9a44786q2dpncox96qect44f0z59cj1a50kute0rykcbdo2mjqsg4jf6q77tmpv20z276gs78166ecgzcnjtau3arpmzupqs9c9pp2jsxjmyd34yb4bfycaorch6va6g3ppbnpy2wbg4a1yp0fcp4jum1b5g7iev5pubem5lcnaas09k0rhhzqq3dpb3ke6lr8u2hzupupe059pz6wlvgzfwdlrm5a0y3gxechnrv6oh6ghoixusxg3lvkmvnn4x0nnolzm2nyspeqh3a235su81ezv1x6hc0iwr03uq94c0adz3h852sw4kbm3xsndzt6tmjv8lcn40gt3jyva9u488urrji8n6inh50ch8xxv2sh3xhp486452cl46zew72ka7i24qz919q8j3n9o5i2tt01dmaxu6vumx0pb3j1751knjqn0nxsconwhugqs8xcg6p5tlj1i18bfvbon7vd0zyeg9xoixwkrz2hw0y4z1zeu2l8gtljmudwwza0n99l9ee6snvznoo7atlh85kuzzmk43vn2kndn8fom70fv3vj5czmlnk1329upcvfe4tdx70pbj4n6ibesrxe6a8rm7nesoi38a7fhu0262ln6gk0yznmlkz0sddcwhoafo5de7bmcsp9ywtz2ugf5gcic0i0wx1mavr6dqhybzklbcsgn3n5f9gqi7gc5viapcwbtv9vlpacdvd4hlqfs',
                fileSchema: '67mcesvjm6koeqeotxwvew0ck7302mxp6maa6ntwwk4ov5gpzbqlonuir9yikja28tb1ul8g6gv3r20ejulk32v843c70vxy8lpg86ay7rcvpf2jasnsa7l590n75lih87pzzir212gfqax8gjfg3qjn35lqzir40baoati2qug6zo7axam65fyse4gdqoy1uq3f5qm6yixromr7if182r5kzj5aaywv7n3q68lj7xn40r9p8d8k76gkjg5isenhf0sn6f1mephd60u6ri2g2scwhyq61jpyvsyso4e78xjn628ioccb5v4jo6s0bh9vlpbezu4l6e2vm8ojcxng7s8b4eqxl93tnnznrohawqmszsx3aisqgbf4eich5lqjix9j6u52kv429ryc4mu008yum4muhtd9j4mj5nww6zibhpgarjsq9xgnndn5iqp7pqccpi6428ggr0lpuljaio3hru5oyotploglu5brvktdtv8e1ausfo5l41cc9txgqsst2op2tcsppgumys2mt2oh9hxt4q8aok2vk54elhfp3ukv0r68ixyy5i9k05tus4xygynvecvnc0rve1sc5p7458ke43w5ym4ufx33atnt08mbn65nr5grqsbf5dhx3tse0665s67wl2hznbar70iunkuat4efmk474uokvqakiuq3b4wm6vn3fdv6pe6q19r7bi6pgi1iov3t9469zxda9bpcyjtoe806naufn97i8l8l6l8vek1l8htexxwqzi06iaj4iziisce1z7umy3t6n7ctlepaib12o4s4y6m1octwr643ljcw7h3hq5z3tcuwxdkpvfmv2uq06m09gztsr4mhr25dvlqpoqvf8o46un4zzzewl0swvvngvyk26wkk2ao58tmbwfbt6xot4twfalkrm9afiu4f5c143hn1f6wmt9o63wfk589n2v8ecod935lrldew3r0n4qwvrs8uoanrg0nw96p8uijt2e3vtysgketc6i6htkspde3t',
                proxyHost: 'yzh9u07q4xd6qisz7obq3bzi6ogjv1sm3avwqpx6h55ijfh2qrjtgfuizj83',
                proxyPort: 1914304377,
                destination: 'zwc6ljeljoqhu4686qv975v1a3lsmo2uk9ba89elnpplnxvmei53dc2q7rtpb95902siisp4tfqsilg5gmxmyh02bwri7zo9ue2zaizyqwl03gwlqpb6oiwxhxqqwluh222h25wcp089ethfmcb125ehghwrvq3i',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5zdtx8s660gs20gzo6cf11cs0ebgelmmg7lvbb2a0aa9ad58khnliv0vwdknsxdbwenekp6dxc8zltrnkhwi20nfysxew5epwh2qzuv2tcsswjdhnwguw6uu7tdosc1jlj09n5bcav48pofj1mte9p3bmanzrtmd',
                responsibleUserAccountName: 'wsvhw9x70yh685lxp2fv',
                lastChangeUserAccount: 'bcxzefl44peupy8qaanv',
                lastChangedAt: '2020-07-23 00:59:02',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'ccqt7f4b2v2bg4ua4e28qw65hl2wod16stpnpj7fmix84ggk5n',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '74t6bf1gnayfzb99910r2a86h07ws837vk5c0552ifcfj7d62p985np6v56q34bq2o5dqtje5w8npo4aclmte0yqq0is33hc4h3kztbz8rvh08hzbnhz91kigkmbclnp85uytzo3axk8rndtoeo3jwvbwp0dukp2',
                component: '45vcinnp0e1cw31tfz1cbdecevdugppv0mojq7qqqcpmy9abuss57yz0tcv6bcuqbrkky1bmvqtja7rgx3o1vygh64wlp9uxn2ycn3bq81qymj60pcihingt9gfx283pb7jd1htisx69itccfc3lm8df6elp2onvn',
                name: '4ynkitq5zxsll6h6ewtgrhi6po0lh2q7ue1qhd0ie8kncu2bkf9j5maxnlxpjxvlwhgdwlo35jj38jod3j2sl7kq1blbap8ds35juk1zvbdak0jopkpifgrc24l8rseye1pth1r308hyzbedmnq2jd6m3mm8dhir',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'pf8h8dkf8042y5ldw56655cgkeqcou0veqjwffv9c4xrcyotojjlhgl2cpws58bjd7kw6kj3amszk22et774e8futw6i7e2n25nxvcr5aeypaahc7kh4u9cd5s44genn0k16by6bbuiyjtvoq9e3u47oq2aipvqy',
                flowComponent: 'jppswl9h2dftjb80hx7xkyejl81pmm98ww48yk0tk75mjtg8kpl51dbk1pcrk7roixj3v3wxq4jt0c2y1acid8k4mn01vsjfzpkm65a5rrayilabrodn47uwjk3qemz2ub6e72a3dg4znks9ois687mifl927vp9',
                flowInterfaceName: '1a2iudx628l1d38d1ul9c620lcaed9jdevyy4ujo8ikr3xf8l7f4o4jorcvlbve2l5ktdpbdaj6z17sqozxyiqejcc0skofsgfhk9heqm09v8oizwdcz8xcg9udz715dbfk663yjbamscb26d4f4xz1fl4xx7kvc',
                flowInterfaceNamespace: 'v16t7ijtndbkz9wkl5andqbaein8ust2t1rpvuhz0x3r4w38neaa1kkni99z940f996ngctv40581viicr1yw2241zqrhj22di0rvbxjbmj7gfl4ogkhpplj3abnk6o95faj1g8iof1ghi0kws0tq69epohbmpdo',
                adapterType: 'lmuafh0e5tjgkjyqkl5sycelfzyzpywbt4j0o638hwnt1xrwe6rxzwfrprmx',
                direction: 'RECEIVER',
                transportProtocol: 'llh246gtygapqsnjxw8cvczqva39fm1gfirxc3y87fe4bbwr6ow5k7qy3ihn',
                messageProtocol: 'qz34w0gvimxqwdr94dl6cwmd5uvp2ipgulzldg9tatkrnxoi26lun3cpwku5',
                adapterEngineName: '16mo0xl8h98ca14amqv2nscnwz631u77swuq25desa4tqxqwlux8u0f0stvfa6nzix832d1w7cnoibtoa0pcvlw5mti0kvvepnsgcgvox36z389z4ad9k3shrmzvxzh5ocmrenarhgivvmskgqwbjnz500n59q98',
                url: 'o22wcich0q0eat8yx5xhqxlid8g0ah8408siw46bo46rbqyqbct8v0euqvp71mlvi8k2y0vxrmtgihhp7ntxsrcywg0s84qkfgqbhxafov4dsfnvzq1spnjtcwksmb278d46nleqlhez4lthni2dpbcdp4le6f8tf799jfyy49z0sx5ped6msnrka0t8xotfm3pmiz9p4dzkq7d7vyqfm4cqh5qtwuwydhkjekoiscsu2gpkyf3stbrszjjgevf3ugnyp6f7bi90tfyzhmhvd9cyr4axps5kzwpdz4l1qshndpcziqt2krmyvkz9ph92',
                username: '9nv0vnpy6mnak120srnndk7pfqbizjltrqh07hrizid7qac3kscxnui7x56f',
                remoteHost: 'uz8cw2mli28toycy9t9yzkduwldfaexfv0jl0dmy2zorfenb8q59uo0h4gsbgb2x2056g16ffzr2ves15063lqvsdu4cd3js104mhve5y2k4qomyi2lyvydyr318mthlxv55bu1n6ewrnxqgp6zd3jgwkx9v6kge',
                remotePort: 3345988059,
                directory: 'q8z909ec63cknsk3av5upxav3nr9yeqakzq7mcxqzw4rkyhgqf3kob21qn2t02x63e4jjxwe239p2n845nat68qzu82kxhyvrmkby857ovr1i129y0t1oix45dkf8n95mrawf9uocajcta3gdq5vx39r61qox7okdzqn76ra1fth2pe1nqixqpuj37ptaodhusavmswls8qg649pbtgxq5gagrcngd67x4bhodbrio37sfsxpip22diofaxkp71b1gmnk5wpq3kt23q30v5b95g941i2ei3c713gcoisb0ja6bfoypxdhqgj43zdxbperqip5xbkwcqojkri8oqaobh3uwzqqf54c1qvh120sl3do9c0mwev8x8scoegd9rtx7qh4bou4ruk66uzs5ra7m3yqn79012axertl2lo1a8oxb3g3wdeyk3au3o4pmalasinzcakuoxpr9693i1bnlddoz9mr0x5cjudnb2mt4xnlvp2ghtpiwde4xqtcbwnv3v1kuro9ab05rw2e5l1dt64ampjxpnuu8euscd695fhdxc0oz71miedy0jzhvvzdd5iljq6s9owtzqzxsow5jjt0i3pqg6ghg2u42r300wpg6pfed0yy2ip2tvkm2xdgjnzh4hdpg3h5s2r5svnytrrjfgbwpgu9zwp9cbfdk8sfaeqd9f5sbtjhr6jlwtbicl2gt0e8ny7zlxedspduxnkk1pilv9n0ctqjhbqhqy3gktdaj5u4548bbykzz0c1umc83x5v81x5sz15t26qwa8pyimbelyzfiqmkpl2fl0tnkhd6jvowt1nnoxs98j2j87y4sj564e7kqr09zpbv898dmfu1o4tm6ws2ndekpiun2x6dayz3oossjwry8806ureucphjyat709ak3isvcamusr064zmdum0kotel1smhda4tsvh8o00659xz6cqmjsfqi8kpqjtf42b4mtldnhhnpvqk709dy5i6tx080vf4sjv4s6wb6qvlp58bmq',
                fileSchema: 'mztn3hta29wvrde50k0t4foib81z1cofg08cj5f8m4uuiy42c0kwa84cp4laubbem39vz7eyj2ya122z64ll7mrbmrq9jt2fe086r26ompc2ppjzqb271utqq9xwz0go8xlt8aq0sxuxpnb005exvpyzvus0mfr480omwlaadzapaopf8z3thmr0ox5ed47yep4e143jpe1ilos6p30pwpc13fg3huwxxvbxyvu20lhmwbmgoka0lopbqxzjxr8on5v617zpczp4kitfw8htgv30b7j41fhbsikpgbqewittrwgxwn16pr84e7wr21n2qssd20s1bawejejp44cxmkej699p8sncec9qq2yysf7egrrbse8ntxzcr1n1j661to686uc6hqwswdi2filkcpj8ydwzukcjzf54flihex15oc3bb5d65jctrs13mmsr85fi5zu95iddmg8xhohhkneji3jahhdc8gt37aopnkmbta4vz0le9hcx64x69lewyswz60b4a5psf2mtf4zq1dtlyl0wt8rmbj60v8qcitmeq30waey1r881q0jujq48dpceotmb85hu1aanjj8f9svzpoop62nqavw4z7w8t6ag9kovq03afbu023twtfm4tux1g5lpt9if9cp5vsvpt1l3160brpmbcbkisxug5ibchdg0ffc81lisdu0qp6cxasdrhfkji5bf9glz8spda9btq3i8wcamzi701s1bbqlkqj868cwd5bkzsk0wkt0up5ku5kogfdo4l7puevcvipdiclqs0hrn8zx7h8ylu8gyt7h91nlpyuu65t6cdfty90x7ht90pjzeeudtwg9pyca6to04etir2x2507neqq6fmd75wq62wycqe5heq3bn16jgc0tec3cff87odpu6g80ratadys56wilcb7cxly3z8ni6roqcd41zxufpn2hmh35wtys2qvajnapuvq43o58kyqbaaf4f6xnumki9okw9j2r529ijw03tl9pfymgz',
                proxyHost: '8xpq17ujmbl4p3ygi1tqca2w5oj0p82nj676o0vidxef8g621pl5kgadqifr',
                proxyPort: 2196764891,
                destination: 'w8s54elew5po7sd237hj8ij7k7ihpw8zx4vzuenxo3qk2gbbxfcg5lc3tmu2w12y3kxjcun9s25uxy7h31wis7gm6zgqco5adcwvjosjvkip2v2evbzl6lxmwhsbpa52xyws7kb6d3aeacp2eequwrbxy0lrjuve',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'dc67oily99r1l718fpu5wl6a78p4bd323t42soan1gj8x58u8pyxjaqmh8gh5z7wf1twn95t0s1wqrltdl5439vpewxv4nhkkartsbihvgp9mtd146q2e9wy85gngudilw9zrfr6m32gbe9kbj1vfe9r8vralv1i',
                responsibleUserAccountName: '6ctq4ps0yphunv32uhf2',
                lastChangeUserAccount: 'abfwljlh2k5tvv7u81gt',
                lastChangedAt: '2020-07-23 06:16:26',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '1qlrlciplks7vfi8cxc877xkpheyvqk6qpebqnydcksigz2xo0',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '0iokhc9wyn2ds7zmsu4nat5rbiz47b44wauvre6lkd2i26zr7q09zwrhx6tfske7zawngkn62nacizuwr9aiobjqjgp62vpblul3g2132ckrk05msoclxhjif5xrxlpybmr78y79s383jjn2byoo04v3tu0w492c',
                component: 'gn68u0h8skf64zwzedpv3u641okbgdi3do5w2g6xkxenx7rzd2c5gjz5sefmz203vpxia9lt0fza7gto9jfd5lgm0drunpxnze054gf4xsauomvjq9i6qtvayj7g6470joe1ec4gx3ja9jn2muf17sqpco07s7v6',
                name: 'myy17ggsetryh4c3yinaoarpog9rqcshu573w60xzmjxvjugglzee0c1rtexabxdzbnkdtejedipg7swv4mdqko9rf52jj9k3mowc5sbw82va5nyi8ybtv4hyr6jyfb1eii66vb6kqv8yn292jyug5g7tgd35oshs',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'r2msgutfnyn3s0iowm00svy6g62khrct37xptm2jvmw7jadhf0xdtiuwgv2fgaoukts3djqsnew6hjkq9uaxn6zt5kdm4apzd627vceflyb56r8uaa4ahu44bgega56asfrvr8pestu827gvrt8z3436krtdy2yp',
                flowComponent: 'y6qn7t9dvelx74wkl2tkhtqaz1w9je3biityvkptv3jjsdp0489f0oc7an58hg20ve5t0t4ifgcqdudxm57lj8hv5vlxovtpqw0vvbhctmxw3dn7rvij6ycxbbhwt81520kd2rwxodh8y0nuv8i9aa9c3bxw121a',
                flowInterfaceName: '8fyzz51kkg3vydqsrrtpj88dmb5dv6hva22nldnvval1shtbqrp2rosujqnjfe5lanub4gkvn6z1zr9aecnmdx998xd9simrjbnsmkkspfn5or085mte7ruvi8t0ox0uvx5rz1lm9ou8f23zmxj0ukqjoztmemh3',
                flowInterfaceNamespace: 'k7hk27272afjtnbeov3p1log3pjaeqxtv9egsfog7m6rqwr0in547po3uytq23c6kw6w83w8jnf8nh4so6k35an79v24wawzkuwljqz6su67pu7oo8berbl6ov3utvnwxtqt6o0g5jisq1n96hat4basvv896a3p',
                adapterType: 'lvsi218kovxbrh1ixm04fbzash8eao13ghcq0vhque2nv5idrnjejh1oyrse',
                direction: 'RECEIVER',
                transportProtocol: 'rwg5dlur0c5czhg9nu2sk443soxzcx4ggsj9cm0zpiqfb4ua63mldes68thx',
                messageProtocol: 'cq3u236ur6i7s8kxdm033s10tn3exrj0o4nfr8nxrx5p7rpxk274h9l5jt2h',
                adapterEngineName: '2bkp70hl67qnb3kqmxawesa5vuw2mhdikgdpo10b04ssimh6l6kq7cihosb2eryn6mf60xw3vl02bf823rat4sowrs7ku1ik5ws9pr39adg6g97zkngtuqzanh3lkbhijcfgqh73zoyihbhip6ovssrzja4s2n6l',
                url: '4cysq30et438pxe51fwcfhcadddsm6gkty51yedw85m341j2agaoppp36ttf7xlevj9ieuqs1erc4hcwhdytfvip5rv1y21i70wzaio22wi7qtadqp8l22cfzq3q187hwzx41paryccebrvs3woziwufg2iqjcq2qqmve3a0hl6f0a32ku90fn1sioighvamt3dfcl6wyzi6uwniu6q9jsxfkfwjs1lsx9047uk5ilria25g5k94beghosnrky7oyvq7n0ai3bc5zgflm7aqrvswotwm87ctp52n7zbk1m5cta2gjjw1epdr3kcogzy0',
                username: 'x0qp89itl7q6chbsj8ngaew1gcjutvl96akg84onzayfigri5ng70m2d29cc',
                remoteHost: 'f12be1n5l9r9d3nhcbxtb7hrl2v91dyheptd5lirtg8rmtav54v0k6d2wbagfrlahrfjid830txg7qm9pt4jl9vx7a1680x9qz3tg6pqs2ccqgk9hmeky72bwt0k8yt6lmht6lgwprbtvrliadt40ys0e8v8dk63',
                remotePort: 9095903992,
                directory: 'btjp7et2k4ws4toiblqvi08t8zklro5hz8j6lf4z2s6jh7br1gyrjay3xfjighjsxrm83b6hvb3vjlh5lqt3cm7aalbap07qeuk2t5f1l2z3my8e3hzs1w9djagxti5pniuvdn4sewlctvb5wsk0tqz5m0vv7aqdu79nqi8ek1nvzqeps20fsdmys5z1oaja4ls9pv6erf3gtyeylk8x52en7z2v0x7j40k2hreeh3v0y09o03z5s4gmnh8omx56ixggm2zhij1keg7eoy4ntx6jxnyovstd4qf9ym7nx0bs5sk8kmq5zcbmvsqz7taaiix1hdagkwuzmftg2o5gvselzpq0brnwh4fexlp19btws6sxklb8bda28eh2to4rwtsdss60swh9l4ppgdyqoyr9ksmkn89ch0isx4adv5dxnzztw4zod0wa5li4jwgcf8v8b441c51dzpz8vx08unypiw0dv0i3sx3t5bclzm1x8kkazuhtwbd6ulhov0d092hz7p2brfzmhp5di4j2xfbnv2sgfhwkq2544no6c3ccdipspfzhlvroazk6fvtsgjeds5c0yd80xri6n5trxd210xxfppo53pywzlkkx52b2jq7hw9rosboeqyzi2n2ch0luh4oi81nzbmin7v926cf04win87r3kynakogtl1z4uud3wdg3698cy40uwqr1ewa9o65bdyid4hfxd7jb9ofq9tbxsvs1c83g405klry6inrfplwbko6son67ttzyq3naaqep8p331a09etujbcnech73urdfewefpele8jg96qqc2yswmdiiuubnmu5qsr5z5en20ff0lgfk87fgmfvgk32mddfjs9zj6stb8dgfucu13ld2m5hadxqhlksxewq6z4iw70vwh3w28c3ttixlvr4l2d6e4fodpi2cjvu5ibma2l80t77lb9ndukl36jq62gnwgdy7aoat5uxn7ux25mei8by9g6wrqfsyrg1t7j89f63jwofgd5x6fz9',
                fileSchema: 'n323ehd611otebvcu8r8tm3oilzc784xmlrtnl3nfyuaizlz415w5uk4vjttf4uu14yjb3n3wi1sl1aw4ckmilxovfo7w436665t8c57b34li09d8mxiswssbos93k1v2138d8w126ynnoi4rohegur11cvegm3iip8d2pgjsa7l9pdjyt7wtb37hkgjbubqd9s8usqckxzrbo4xqm237160dtotsux1mwse86m167lnyz3wjxbztkhx3pqrbwahledlu2x0icyvr96qr7381ej4nqiizwh8ppnff9luky8tx3isczxzyxpwm6xixto240p5i3u0es2g7g3g8itrooqjpkzk2dozitrybx9fj6qv3ffd1p2unq87thnaz7q2dj38ke2pj4vrxyxq7z31wr1219h66zzsp1jm4869g4plqhitgkx62lj9pkqf0z447tcufvmh9r2pjby7536u8qmhgp3i5onrlwipbyrlys14pgje18bd1wklww59icuofb4yhf2ewvg62q6at4nzredjkf8b2d3c271lr5kg2dft1dltqjdc11g1xz3wzfhe2utojyhlm0wkh9yyij9l18ku7t61rp890b5ha4chkk0qo5o5ey017uqevov8hj0fue5ikj78tfpq6evxuwlma0ni7zyqa9vws3yv9sw075vrur74aupdsogjv0elr7cvueo35bjs2wdhkyl2jbilodjkhbchtyk2gtld0v4h15fnxze9c2y3go8ueibuhpreoi6lxd5lziyrhgwkwh62gmkm2f1xkh5hgyu7efgz17yh5xrcjr4zwnxbdlb83880bv67geygt7vnzl0eqv1mrouu2p0i1ioql7zoa6pl9r8ox6j8c020zsv97aadmwkvape3551u2velr9786v1qvfqvycgqyxekelyfba5vnk2wr8cgnw1v10rvg2e95jpx3k6qt7njqlsnxys9kpv9f68pgxwqvr4b6wa5itozd5i4rhg3w2i04mzn4eliuefr',
                proxyHost: 'fwxss2cgd1mnx4z9hwsb1vjzl5lla66aq15csue9ed2cvjqxfsd24atzpyx0',
                proxyPort: 8775023579,
                destination: '9nmjq0brqx82710mj5qlpu54yw074bt4wyjbbv2s88ilmueu0oj43j44vu748g99370828ydep2esb3cwbqatzj21vz4x1zpuw8s584kstm6n84glviqq1h7j1szwfkuidewmp5e9m52aq5cdc2zoogf7g1wc0z8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '75ox0e6pmivuh1ay6v7bvndtx2wxapzvwenk9mid1sirdd0x2p62tjrvhppcswlit2vymjbitgzxpdy94orhy3yw01nfke70l8hm4ijj79cl5jl4az80znhd34byp7e1ictsz5n1go8y4jns6br2xk0eiwu30ezu',
                responsibleUserAccountName: 'ikexgwr8v9t8pxz0h19b',
                lastChangeUserAccount: 'zo1vtxv8ucdxu0ejpeeg',
                lastChangedAt: '2020-07-23 15:53:41',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'dkdiak3fxedm7emnsm5rac14x5nh21f17m5epdgmuv15d1w2hy',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'bem31in27w2oss6sgzh0z5ddcp51kiveo2ze9un4zbirq2h9ftid7cwvfkp1mvbrpdgblvpdkqr8q51n2amfyrzsbgnmpxljdnvky42ns2r0ix4gzlqvnp0ckvaj502ebiq6wwjb6biv1svbj4u0u5bqsgux2lek',
                component: 'n47o8t6lbwfo0c5jrw64ekw6c5xz6b5tnu7flzovvky9fqy4khs32pd5bv4sob3onk12yapyov8oh2tgk7u79a2bmb30ro0khndlf7ukox11t4ocfp9rc4l5k3xhseqhfgoywnjo6ztn6her2qhwcw04apbwm26v',
                name: '1ka3ax7aynvsjvxjkul9m5rfefcakwvhrsd4r7u0m4degutb2fq0c7w04vfv6yi0k1ra0164yppzdurfgxug421cha8wrv220yk0at4s9tjo810y85axph55fxnt0haeyqkdgdhwwggq0fvrkd203hfyq9yojdnj',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: '2q9iz07t38un809o088ov5mg2nl9haeo6sir77k96he5o5hmkuhcx6cf4bz349075jr6yey1kwh2d2gufy6u4us8ergyf2x765jzi1vkmbu5s9w7f8aja2sqntjmmge76t4usmix4v07wmi5mbf3qrm4o2gus5fek',
                flowComponent: '6vc8zpvwy6z2tasssuzdzlxk2hodn91vhla2tngkqvhto4juil4l3ndy2zoh1bbblkw3ux1v83hq6k0pnmql1u7crx308eozu2jsts1oefwi66eey0l9ytfz7ktlc9ptmaf68u5kqcn1s9x6zu8oi52daiw0flux',
                flowInterfaceName: 'f7jcazkqfr0dje0o6zbt8o56qffazks783ii6tfre6b9gh28fbu1qh1a4i90x9hvzevdpntpq9p5mqomzdvnpi53iauxuzln9pnotw9w7xbls2540cw0pg8qdnqlj9rlhf850sj7ngm4no4iqbgwh9bt0lxwexum',
                flowInterfaceNamespace: '4s7g483o7myp2vd90inw80ptdvwsye0ibh0vnmw0vatkz4xsoznv1jb5mmygjixewoasywjyqldcy28e1n8mlrfjsgw3uj3a6zgae3f44xb7qzz4u9hmykmums2t1j34d7u3nmsws249hycwqgsa3sv6hwacm36z',
                adapterType: 'm1eo6z6x26a5eru1fvi2qxbbmdgsvmw5qr60spnb5r2ocagagcmtwlq6q0tg',
                direction: 'RECEIVER',
                transportProtocol: 'udf7ls6hzomv6hg3ec6s31u4dxykfyh497g8pob0loml7aevxkq8st201dra',
                messageProtocol: '7r0o99ffw5ie8kveas9kpxv7twoznn5k5qwnsm7j7w3n1sd8uj681q4g6vcc',
                adapterEngineName: 'y8841cibe4autcv8pxq7q1cdr8oe1uyfrrh3gyxhf2l3ns59hiayyi990wqvs8aa5diqr196uwzrr6irgkomrgp6iwmprgt7vqfr91jg5ka8tezm3dr1ztl78r3lulxxc4d273m0iwpczkdlxiqsrxngzm3ovxzt',
                url: 'vgq924qwvnyfi9vtauo7y2fidp6qxdabhuy5bjanyirvrt2wkra3gd2ismahyme6okl8o0uo5h0cg2mgynv6m1dg7gbasoopnyawf7whir3rm5d0kudh82nz9f7rjqxhk7ray6lhc2nw1bjv1t1m2ksatfgz6v0npcp42um7cw06axgw33rx66zc84n4t1i97ldsrgerjehzju9pv6aurni6ojvoiylrsyfq547pvz7g9bj87y3c5ugcocps1pcehoa3mvdux23pzeh4hldsrsg1elbk1hhyggk6lktm6h5f37hhok8trmdqxqaofn7e',
                username: 'ahddmdgxnu5aoy1pvmegb4rlhfrzjd64si2y0z3swzvlhrtwi4oi28pttji7',
                remoteHost: 'nhzjkqw4nermacfkdej6zczl320yb4wdfirr4c5rydr0aa2a1nax334bs9gz7jh9nek7w5xwwdzkzlzfr60msr91mf8jcsrdb3tmgds0kmqhjwzfvp2kb9i3nd131c1z7ee0pvbxv9hiqm39ltxdo1mgi3w3cxd7',
                remotePort: 6899544405,
                directory: 'onvpuzaurzfidv85lmxjq0rpu49v95gal6uxwi28emhe3mtly7qiaskfdeq07tltnz9if64lf91ulfuv9lphhnary0aq15y0avrj1d15bqpe0urpd89yrx95k264mbyxe8d3sixcmf2lwzpew4d74rxrjjhtnpyw10bjwe73g4ufd3tzcx56z5avqzorms6vmb66d58k70wl14j3u5bboepqbh3xwyvyv2pygh5uqiwxjp8grd7be4tetxqoq882aua7s2jnxk73ck5nedaaibw3rvszt3mrq9fy69f7emnjl5tssecemmy8x95h3h2xtq01silt705wktbevbpgscrlexals8akl03ztpvcjt0we3hf4a1g6vfckihp4is0gl0qyt4ad01i1mnp988n7ltdjhxlviolngl45411g0irntktqcnvrgncfkld1071a6i9up62e9lhjn5tk2uzbcoflpiiwy8sf8kxqbptdxgl9byl0rd0l2ap517seelcpcz0t3tn9r3itbfn305ymwyyffykxdavkhmtmui9ajganrtn9pn5omj30z2xzbgeg2rd0nty1hg177r4va4m3ymv54nkogtm122b3ozn5q8dm10gv611vehw7fdv1qwtul7dqw613r2trzklf2suoc73i6ettl7aaa4qm563r8rw4xp6qm6ljnrax1caenarak5m51k4z32m5sx4q4g1i6gdbsqsfsbxbs68ssuhgy3hwi8uzos8odnb13bvpxxuo9pualt1e9d0e0s7hj4xq2p339u9kyob2xfkiuyjp7anre51mz9iqhde3ag2nsgm5qy80wdlf6bb2v13lg8zictar5mdc5e4qrh7p1wentej1n0oktccnp1js9k9ymq5d0pa05y3cs92j9866bpl906pjm3wrow1z83fsleu1n2b818423lbht46lyjktve9oee1egh5t103qagkzkc2632rjphf60s3ssnzlpay2f3h1319xhok6sen5134x6xa',
                fileSchema: 'iyrq6b5pszil4k0joks84fj0acj85nyt4wv2xlzw72ly8fjiaw7jm66uzgpnawkveyvb9mlbto3eke9ct55elfpr0f9sefzju0gt0rqzq76j442nz68oholungzvh4nkax7lht8l0qch4rc0w80ujpsaulbpexchpsp9fsvfndisfw2fos2xdtq9z0wwvxwij2g8v7vu08y7k3ekwnby4yqije3011jch8qtx55k34ksqo0n3p5b2keuv76io9xmtt04mx6txvc8acydsg12qfz4dmn0aoupj4p5ljdtso2hguzl19ept7554pocs2p7za096rzn2vajwe335a5od0djpfephk2ukn5odubza80ybmd0gsg9pzg7173d41k6daaylz98z1pp041xvyvboz1t3rnweigi9sn02q9ys76f0nzqpo0zv87ewg1u3rw5e3d1o4ltf0clx7qdc3ymtce3vbczh2x6nj26kqyjxqvp8evoh2vgmyx2bl8mjb7ymppb6bakh8mkvvl01vnnpwflsyx7yicyyhdw7ogv0e76d7266zsw1rq30jx35pbejfgotifj829zuxtwfbeurlm9s0jcyuyijuq697hbpl1hhq8fxiul537rlcyf4fctaz222ese6f3oklis8xgacse9pclwp1kdw0munmxqasw4te6g0gnk0rrg0vhlbwhtdd05rtaxtuukeen6ls65s6c3mvxraatv0itlwxlc19j6bf4c054px9xxxhx0payhw3fspbboyccwmzw3q062tj3l8i2elx716876bbxe2u0er5yquzpp1fsjrmumktktkyxhluzsrt8bqe0doqfxvqx7ucavn68gx4c1iruqr0jt574ija8ojtt3ee5bvxokuullclhxnv2zea7vm51ugfx7zle3txintt9twlih8zb4fumbadjh3qm1hl59yzcgsvyqarxovenrzw4cwclxfhstultuo6k2ocfdxf8d5eqa7ivdmyhh2ci8ytykaqx1',
                proxyHost: 'psn940lrs0ftir7h3lwj685qyqs7s7aw4pv7au23es3yv830vmd3lviufbta',
                proxyPort: 8368815513,
                destination: '20v9r8lp5hyzbk2dimenwylumbyxxt5ithwxz80aeij0slj8wiotmeh4b55kavogccazfzian4der3a8ch01tfewjlv2biz80b6v6lw2pssspd0gkh7cy4w37a96o0av3gcq8k0k7l8q5t4xpcqzdmksegtkv8qo',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1yicbl0pm0u2v6zz3d988l8m3dk15nfyxolmbmwowplo946ha4a65jq7wsaxlx3o4787tw9cu84xyyfdzua2cekkc36i2lq9xnqlm3p2z60po030e43c3jer22423qlnr47ap7mqgs6yrcdt6i712ru6bfw0x89g',
                responsibleUserAccountName: 'tvdokqk0urlwsr4mgr2c',
                lastChangeUserAccount: '7emorrwosg0w03hpzm1m',
                lastChangedAt: '2020-07-22 23:31:54',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'a1nieburnj0a9b4krav8t8salk6eeywjwp86ms45rhkaqgjuda',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '8nfbdao59bg6bhiy8qw78i870iv1o30lp7l0ehk0i92akc42sbximxkegeggjasb7qsyjmiu2kixd3hs8rdomowkb8fb4mavzlzeyyh93qh85jae4msrgtbn2e4phnv0s660diz3x2tdptxbypnh8dxluw3rxan9',
                component: 'lhviul9h1qc7cefk0e7f67tc6gp8sqvznfp8w3y0qtpa8yz1g1nhqvoab50g9vqtsj5qhqiu2qaslj50yhbqpu7z76yhf0uljhqx6zhs6yi75q77o0wh933t89ua7es59xelwj3zatyn56unznlcqh65qytwuzbc',
                name: 'bvq97lip7me880ed11r9kdt0381evw22on9mczftknuczvktb9vw1rdb4oqrhdlbbtdm94u6v3ukn5klbwi4tj11zkcot5bnkwjb0uqt0faku9galtke7qqw01ccx4oxyvxi0vubth6j7lhtiit4vmycv0lnl9pg',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'hivcu2bywuu0q0o0l2vjifqedt2j5fr025i20bj4yupimn7o2uux3tpdjk9rg72e6wrpve3u27l3ytyb5ng2n08z9qyf3b3r6twllrjylm0q8dgozhq590v9tiqo23mun5uuw51ack6tzyzr7ow8mlqsobeqpbdk',
                flowComponent: 'dmrwvegeqnkobkubm73upf1h2q98li9jyz4z44srvd062t3pm003appq8fe2314xoebj0hwi7u6qep1ha0h74hvz93exrjt4an3vyq2c1f469i4l9x6ryav7lrjd05uhfcpv1jbqblpiegcpevn1nzzdbypx0dmkg',
                flowInterfaceName: 'o7s9fr1m7ifuq6uk77ck1vas9aco53bbzczhpii4w1w583kvptuw7gkojn0bbyv9bzo59zhfukrd6b0rdccspgn2ov7apg00m3b2kr9bxiq6imn7m6jscic11hj2m2y1eo0k18g2tl2160ziwgwm3uwgkhztrg7a',
                flowInterfaceNamespace: 'lwb3z21u2d8m7856qcacn86a4wmgehwx941dxc2b7prue4dl4g32s4ovsz1gexawr8d7hrsqn72tl6fuyde4rfrfnjf4k5ffmvq7gr7mabp5rz7p1pfuqsi6w2awctmi9t7n3oo77dwctx9ngo9eql915ma7uyot',
                adapterType: 'ye4mkwyn50qhtthd7994xcbrijwo4xcsoi51qqczt67onjrobtv9kvnrm9tr',
                direction: 'RECEIVER',
                transportProtocol: '8693ly7hzwzdeq01izq4o8ozvzios9lyb4mtjbyc9cpmm907ludx1iw0f54t',
                messageProtocol: '0b1ff9jhmonctedj781ho6pp6sohfr64oip2pggxwnyfpnpqwe6ciofqduhu',
                adapterEngineName: 'vr85sto9706rzdh21i960pnc3rdf2aadxq1teh51vmcaz7yykmjv19btgsxiixhqc4m0pqphgzgab8ce9zg6wkl0vl2ededeqozeb5i1ukvgwutksrv3yt9frxlhllim2dr2xivepqrhj2nkn51pfbt1nb93yfpy',
                url: 'ivony772cq62q9sinr5tkfaz4a6dd95d2on8tcewwmwflcvpyx9ogl1ascq7jb8becg8vlhbejz8vusdptj5wfbiiump7xy1cu0t32ye7053dxxeuqsiniyyr8hjyaoue5il7dxtmgvxya30earcsu92diui5sg2l0w8f4lab2ew7v6bb5tqso3xpnd15cuhz1yfihvrnmz0e5luf94rcvi2h3hxnbn9euongcyuel2tk068swl251otteuv2strydbwnd9ddvcm3dcs07h5rn63d5xgx3j1xp75z4o6163cgces600ef37z7y8bn2zm',
                username: '2vst39ebptmzd23sgqe8prvq9ho3uxuyr8e7peo3iuqca7dmfv55mrr7e7w9',
                remoteHost: '9o1xs8d0nqp973drezn7wvln0t7vokzlrl2kggac095ztrlacir48c79jymflqztv1pnpgqnepfeg469x0v0iosvfwkkc475bz3yhwruml3nbkcqpxw86u62d76tgfgwug4srmmya92vqt8wlcdja9qg3a27tgfx',
                remotePort: 5670501028,
                directory: '2pj1s9v0d5pfuns9p95gs1sf34s54tqz07uct7u2gcuvo7feiry0qbaxb642w14661153cyvogjlv4tz4pwhzg07my27uio7pxjsgr0dhk2tc9ig7agqqwijmy8yakgso9rxhkqx1z4dwcq2hnufnxqh5qoura37l0c7o1gaqzjs0wfkgo1jfno99exnn8hlqk3tf67osxh0vl3dytj3wm6wluaxbklf6d0e5gcssz4ughjym2oefnvc6z0ipypwegg16ts513a0r9l3fnhq1imh8qragtii9m56fibppc8p9pbnyqodivwxpk98htkb0lfmq3erh044bms921jwekwv4i9lokigs0mrvfq3fuciyfj6cidevt2z6zh8qmd1c2fui0zhwmlw2wcbisjggoatjcbtx6aot9x9zxdbszle7hyhdk64yfd9j5piiwj2r9094nk845zruucucvbq6h7x51h5gs3jjbpadkylwcuit73s7wt2ru5uthax939ebq9vf48lgau0ncvowawry7pjpzhuxcrg9huz760ps3vx4irmnfts1e9fmds94khr4wict4mrl0j8jagbuedb0rih3dgvtvv3esyl626n9lb1abodsnawg518r14opra5a5gzx9ex15cfoqixep2qd8bpofkim8qw94aci5we3r97c793xzz1wbk1jv03vuwnohpt8twx7bqclq1kokxp19hs0u1l2vj0lmvme2h8kqospokqr5oyed894zodo9i1o5rr2p17nsn7jml7c19qaerd0k98sfwsvh5sjk66yjyjievc8jplun2y0lo2gvpz7p2k1p6fbun17j1j15xzub95emcjovew2s8gwanjc1xr0msyo70z9z5lgagswcn4b85s25j5ud4l8w5eit6k9oxfyl88hls5rnxyi0tteubsux6drm9q1zfnt5pi0fefb8xzbnvibj78s6fujcf3tgjanrkjt9gm16ugblk7smlla7szfuygs45gfptx8p23',
                fileSchema: 'xpb13ogr8pxhdpdzw5x5krr6guq02hn7dk3tacrzq9gsxi0b4umw0i6yhwimty68939apha4cxmqs07q4i09w259g0wjvbtxuz0l3znf0w1dvkkfckp4o9kschxknz7cxou9quik54tp9nnnuywqqlamoocmtt0ggcj93t0tm6gkg37zh1go9yd0w14mqfqlmx7micfcc34te2r9bwporj0u9de1ptn75nmgke5trsqylyluk0uw1n1c1epp5g0i4pdy5tyzg8pd5g3rwkwyw2bkb4ljvp0rpuhdbvryokr17ar2o61am7atna0lwqpmweyogi5nmpcecpm58dxbtlxmp66lsy8uuhquh2q7j8d9lbmrwyr5zo0nolfbonk9smv21xxk3jgk31dvz4pz75mh4steaaz2dysomi8uvbnaf7pdun58a3zd4agfuemo1frofuov81q5qgvx4v0nxn1iank2rkj79ec3t146gp13r2gr2v2amjj1rxdlhjrb940zimr5ct8ju9sjt4jex7vy45nw109j9rlpks9hbbyanxowp0o14wpv0uaqbyuwso42jr23pbr542opoja7tpbxn3gk8azhq8m6o07q6pc6upa3doda55cz8dmbiptn9dv4lsbcfhp446n0thgxut3wmt3voui8389vjwtf5twcs5o6d3g0qy3rjvyrx4a9b7fjc9bqv7o38kyf6lllsaqca0t58211y02zc7v9lyomlpec8qr731i131c2ktqvwarjtjd7n5pkiw46z6outwcvjkpdhf2g8pwebpsucjd3pzkvnvayqam5p1agxuazjfllyl8bxhctd5234ti40tqba1s2owxhbw0g9wzu20hhh6vfzcdhpvtvwu8vvvupbcbe3098wreggjnk3l8plrc232pj5n188wnbw96ddtxevuqjpq3ws4cvacztlcg1y95ajlfavrc0xty7qrfqrjdxqvz08ysiz5l9991vracp52scfmxvpftu9b65eugl',
                proxyHost: '35u9zwndgw8ebgfxag6b4isdhjgugoaw9gj61xaaeuhzl5lg70ioloal634g',
                proxyPort: 4737385581,
                destination: '5xxyjcvgzcx9vmpiewwvzhqguocupe0m2ydl5bx481bkkfo4bqy215wzivkyt4r6ixkkgz9lt3h17u3eb6m8rw951q3r29n4fmidackqqmim8aih61g4hqrhk245g1y8mmzf40hfwlal8scxcuq1u9k4525rqvp7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dca81vtf8v7yecgn5qvo1lhla0lmex9tqdpkxzwymfkepm8zllr3fon7y92hp9fh0mj902c929s7aqd1mjnah872lia0pif3e7bgv3ub7dtrqkzkv1gh0c2ibajdfrl9zp9q60azl1dxmi99xjqrls5b9awegmg3',
                responsibleUserAccountName: 'zpgyqfocqbrbmwv51fsd',
                lastChangeUserAccount: 'so6ye5y9c8cuz3i9pu4x',
                lastChangedAt: '2020-07-22 20:31:19',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '6ot7jq3ucs7lwrwjnggetetf4e1aek4y5n8p5xlpml0tcsph2y',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'csz6ezzc4n8fiq46eaufuhpe6j4rg52rf8p20ueqjkl3ip4ysaqpseca45348eezcgiwjjuzwdr5cxlrkg0rxo33wtac47ahv91bjg0d9xy02jrwn0a47bpqnkkdy0q02po6zk29m7qp0guxt3c3clm6lkvzb89k',
                component: 'cfhy1nrr46o9nqsm1euqub1nm1upa9h7zi3yiyz46zeip1hszk065s13917c1r2zj8lb2sjqwrs9f59yqcyj019l1k171ciybkv7zx2qmld5hlfzem24qwvswlnhmfeakjx7m5mnlxmx6zydu55t437p14fztzva',
                name: 'mixd5szco698mutvyywtpy2a8n73rgeof1td7fdk2d08h5fhkl64n7i42kxqw69ev61wqcvez98z4815fs688qpc7tt5tnwperg54dd393hfdv2nil645flghgaw4wye149mkdo9q7xhmtv0fgdbmfm8gwdjil1t',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'sau92sxtpuizqgfpumz6j6ulpa0yc2m0ldkqpmhiq0cjtmmw8d4dl6gspsx0tb8f4aqc1pen363nk630a76fsao4vbfc2u62w3o0nwomsn2pwf63r3u59ck50qkq5uy80mydqffnlnd1unourrjp48nhqa5d29g1',
                flowComponent: 'o06j41w2zpj9a7eelxro20udicrpymgryjwr4muf4szjtbzsanduomg1j8j8an6dimto6oqsek2ymb5n4ezd3tsokxi2vt4lwhzll6pwcho8na4h21yq7q1cr8wz6r0l6s8l3d2i54hu42n1f473gdvdw7egel7q',
                flowInterfaceName: 'pp7w8qropbb9b7dlzylvhcyqit99cxqyv9e755mld399ym05qauhi69h8u06widf3ejxc61cr5a24f5wkqg4sba41fhn901ou0k29cp0roxpjr9dxnyn3sehqbv0xsfr8721newy41q14g6qi9sh3t4zt047jxma6',
                flowInterfaceNamespace: 'fgi4ix5un3hae7eh1j1pc3rap4spnnsgs4edgvr5mi6er4vigbybnqpiu1brqsaiydlytdnr6hogo162sfzldht3ffobylm90n0gig83qw42tc5fu80hf183vdr4zxbxf232rkkgxcabftycybhgm3tggxchajx0',
                adapterType: 'mcmyc0529k8dif36hkdxy2kao4zc559xd8u4mowymmi149eyheaerb3b5nt2',
                direction: 'RECEIVER',
                transportProtocol: 'ox6d1skomu0w5xqaymj7xhzgep5d6w1yz7n17gz4wjzjwgc45x0rvni3kzla',
                messageProtocol: '5ytl5vs13dyt3fu88i7634xi4ktlsnylk7eysgqybpaezl6qqg39frgl5hny',
                adapterEngineName: 'dmbluotjlecqabor0wx3x52nrny9qmwnt1oxqdwz7npmt7c5lbt933q34uj0t7y1sbjn5a74hggd6vnrlocsxqo3ulvsyh92skcsa5kvs30jessn4l4iyrl0do023c0oaukbt3xeiu2t2s2x3skpi0l3vbks9lis',
                url: 'wb5cuvi5xe7c7ph56982ivvdw54m601q726fsq86dl4j4ebbx6r2xndbqdo8ot0ngyywv5zhmx3c62d00ibuea0mwxniivhcgqlebipt0nhkjdfffz4ocbgrf6241rucnzz8qbzi7350f4jehww1xt542nlpdu7tnynqf3rlmbbpo5gmdr6mmmju7r8keew98hac8u04cm7wdsoqrw5omdqdwcqmdbjicdf4amzwlfj4hgmvfopsun152aiovgoi9wsfoxfie7n1loobeb9uskxnfq8ita472hma83dg12h11xtxsveg0hc3v30lba60',
                username: 'gjrzy0w80mcl8yxym8mkoby7zu3veu0i5nggjlietc50pq5uh7sdh5m05iry',
                remoteHost: 'btcmnxi04m0xeejsd1b35t5z13wb1la1jjbt1g8lxqgyevjcvctwi3qlviximr4dfppmxrg56gxf1j7hzzgi9y3e3dp3e6v4fp0yt4x0pqvls4mryte52bf1y6oiiovrlncnvu0q3klxrc0d8ws6zbdzzt0wrymz',
                remotePort: 9179004651,
                directory: '1qu26esrhwdixf0dxem15rhh0tcdz2ijkeicqh17qbb6tmin1sr7faanhm8z9471exthl5beld112x2qjjfflmh45jh8on9i7tmj4sm8px9sctbwrshdphg4rn2pv6j3d9lids4zcfnhwszae81p28boqfgtr3qmn3jtnpepv45rjmt5ekyj07nr43m75938uhmhzf950231um3no392g6s8x8alzyhcqyhwmyhy0zydwif8ry2epp4qrmia8lsici83qw0k6f3skntw184wq4q224f2rhxt8lauggxh1vv5oy2hjkqlbpka1my0251oilsqmc9rvvlcf3vqga23xrlrvze169jw1hfq0azubqlmv6or50ep43fo9ms5u9hn8bn472iml2awki9vgxcuo7dw4kmi9dlmh7k5ubz0342fokfu037aip5rmab56pdlqa35pgw88l41f2lqoa8onwixmkujzn2ito7r09joaqrwxjol38n715excq17ma6xohs4gl0cu7ztopev0abnr1rhdjqcltlk35yqjyayi0rlmqmgaynhqropabupcl3rx4pk0lx4zqj7exra9wpap4ueyofb2yccmycw1lfnr6drzgilq8ojgqwjqsl286jv1uta2pw34v3zo0v0hzakdjxs76312o2t5muhas0aj8y08ffs5ypklktia0qm4zha397gptfygpljk5b184d9okzhb8mj231kzdx7cgf2w8k2sr3w6ycge6lb0dtxmz2gdca5e8rj5k2typr5lfvfn1k72wmbnv6t7jbknjvf7qs77hqt91t0obymwyedfmod2cgdj6shwcunvt9e5d5d782n885zf2j04t1ex651cacq6oiqyv0zu56bbsvpcrcd0nhrtg1neq76x263247zcv22jcjxbgij3mt106p8c6iq0dyhotq32x18h7bxyshqzfap4ga8c7q45sv3c0tn8f618ao575lepjdkp8ak6uazhc44sadvk6u71hpr6b46',
                fileSchema: '6tymyrpix9jhkb6re0zptbopbkn4n4qn8vnjfofc98alke5m1ucbs8qhrv7wjqhquroxo9fwxzgg832l0maj6z2x78nbaqi5b3zgijfsdwropu2bgllqsmqlplq3xaslkzah8s0zdefxszivpsst3pb8km0hyuxim2t8zfe6u6m2l1dtm25cw0iyydf0btzlbgk8x2qfdk2h3t95h7097q47rcq54799q5agd1o3gryq4uiniccvyqtbke3796zi9wr6d4v6ijipylcv7xtl5865ef0ukrbdft90524pms91rmi5nsznd4agsrtzg3s5spvqrmqhfgd10f6lp8fiknrf1u38zh6t2h1lavn5xfqssyl37n1b6je66uliwmkg7fybqmg9i5azbgyhe9d6elnibthprpfrdzui3gfil73is4xhfq4o336m5uubjkf6ltx5kvsckqixaa5besvrt08qsju0cbagcn7vdxkfxpqnibqp4ixgjz3xef6a4p3nchesdvaoetydn3m1suh1rjcrgf29vodz9vi6408zsuxpbtno9zqxdb9bf146xpgxfv6l2poatoied3joyhfdqobllvhu90x4mgl1zle972s4d1fy8lgzp21iu18f6oy3jt72ps2m0vxq4p01y8an416uytqdmgtm3yovqszu5o0mzqr5nm65h9h9ai5uokmqrkuq3edurk57aivx2pnjhyof6aws4ktuovs94uc931nzauk191ud9ztl46li0edp6yt7cy4qhdz5hrne22rrt8r98horgbl95orm1cjg812962cyjyndni5weyidkqarq4bykc3zo6vfeyyywm8zyj8hxdn537aekfxj5mqxuy3rrtzvrm0f0mtpi87h5uje4046k7bxah2z4w0vb01djkiusi503sjggqxpvugx8wztcycw3tuxog5x5bxbdvyisji23qvkgy1fn7jgyxlr3giwr2adrb33gjkdgxm5jdx6zk5cdqhdkuozazlf7fwq',
                proxyHost: 'yd6o5zjgwmqe8lni9n1ifyktq65emhqh21358py46nrxnktvzsycpz0vy73f',
                proxyPort: 6204094559,
                destination: 'ulli2dopfdsc9b2rsccu3btaa46big2jpz8tvxplhzcujk13tmvz9pvy2lhk3czbsm4fxxmihb8k8mpn0e8sz4vx9t1umvgjmi00cipus82hyh5bcjnaexh5yx82fl1w6z9pze3354a0ywmxpo8trhlbhm3fip2a',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'trlnyipj4lafvllrg1cd2lbeo0g84depsml9uxz38u2oykkoob6ur788bkdwloipejpk2ldvm3j57gqsq96ba2g79dz81qfrrhf417yfjwhv01hxslpae1yk77yp4c8ix8c8w4kbmig7p631n0khm2azaq3lw1xv',
                responsibleUserAccountName: 'kgffwdm1jd84r0547raf',
                lastChangeUserAccount: 'rhlaarbcsnrace1h7fiv',
                lastChangedAt: '2020-07-23 08:20:39',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'xrtsx5rnmqkxus4oe5v4fbwgvt05zodil09rw1zbk57adhgkpr',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'b11684go8udz2hhrt9pjso8omkozxqk8evj15wirvdzgwzlgl9wsh6sx6b6wb3h5fttrybb6yg5yqkvrobbylwnktov36x4tul0b3sz3dyoucbyp9v2el3vrddqfig4so7u0c55txaf9bwwf3rriwx54jtsdybfe',
                component: '82gtmzjksigjccskj6k47j13zgpz55z5l2bf4iy4p0v8n54hzgy8ncewnbf7nnhvdn8x1tnscwmdvdeh9xnal502eyzo1fgfj7q6j8tuxgw7nkn6b6d1wiuid8sqs5o4suxy8lqqr22wfkmhakpmh94s5yevz5dm',
                name: 'w8x7bvr2jlqtxzsot8tgx5uibwu3f87emh50y726teo959dw3jov4gj2rrmdmen7n9b7hd5l1tvz8egum4qhsqcodazsy5mvfrc04vmuw9ud6cw9fg4kj60gkayhm9lhuvshc02co0cv6vkyebki6rvcdg6oyfw6',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'm506m82hvos8875dzu6edqcayl5g646t9nqfd42vsn6mjnpdokhlkielp23wts1qs1lbsc6lcunq1kcldklpzn4kr6i6mmh2j2fu7bu29jexz6kg5enydu9xkdg1kixoql0lhgw7fnw2h1un14wxfnwd135x2f6j',
                flowComponent: '4hbx3nioi2nbi88lwmphj8oldb4foina5p05eaxvhvjuqlj1pgafkvfcvpcasmofzuy46yfg8vjo2gwftthod6j693pj5kf3z0s0t7nhqk1rbd0knjk4ml9urkopwii60thb2ob5xgs5kuzhaj5yh3ltw0umxrri',
                flowInterfaceName: 'rp3tfkun7vyzjzlhh6u7bird8pw1c7nsx9boqmyoonmcl85krxyzuiq0h8vzqt8zihurkdnw10wqlwg511254gnhc5y7ddx1eja78qhfzzmxwnlhpgbb5q3thyd7wlq447bgu6xdtplc7dculjf9ep5725deuawn',
                flowInterfaceNamespace: 'sw0omp8fom7uec506eitpusarts2xq9j37b86u8m797on85r4idg2v0ibze5g80tz51thwp8zpca6ydvsgapl3b9aa33i4tx6vc30cbm3fq53nltu90cudgcf1o0lhgw95knkfcgqm3kx4tu6yqlg7wbctk3tpg1m',
                adapterType: '2691cmy0sip8aiv0onubzxg0zcqf5w0ua9y4do3bfe7abrxg3qio8e0mfafp',
                direction: 'SENDER',
                transportProtocol: 'dg4v50ajym22vvwyi8bk28sxwv915gl2aq4vnp70iucdlw5196pqvetl0vxi',
                messageProtocol: '8lq9x1zzuuzg2o3reqw90ufqo9qfkncdw2vu2bmy0syi3prj1y0d9lk17gop',
                adapterEngineName: 'nq67f2ccr49hzezh1rk86iayjozuzlox42haiiuyv7w0380h2dg5hp5hpg39n2biye4asad7qw6yr7ijimc0t1bi4ybo00cn792b01kugex8qed1i9k1o189yrdw0mx6o8ri51fmsxkgspbwio4n7euf4v9h2d42',
                url: 'p0gvqj6gnqk0786li4f9y7unkxisjtj14n4gx4tb5mhlyh54q6105w3lt7p5myuqkw8tpvb1ikazyhnmw4ir6456zd1sx6i8fmzbykatlcn4il6dz32qz685dwkk8o24dyxmfhhi9gikp8fslhb6f3zxkife03n51as7gmh0pvkc6z0p2a9a7av6kylucwhyeu8i98qzqqwrqlecb8fscph9gfr6z4fttqs28urctygz3yqtj122h7pzlhnnt9zui6g7b64mp7dtfiskyxpsh6u6e27yqxzphwrin4raonpxzt0xm6h6rz4x4xi17ijl',
                username: 'khuaho97i6qiso8yxpo656p4dk0ew6n4u17eofdcsg1jk08uplou7sr0lqkk',
                remoteHost: 'l90x6ka2i4zrfw9nndzkrvn1hk9upn343cf05ewo4x5ou3df1wv7ygpnunrvjbh7honegk4z404yexk6pel8phaffqajdjoserpn9k11xrgf7hmmn2wbcm13s6r5xhd0ppam9u82qg2fk3x7a9k5itro31utq3rs',
                remotePort: 2849611666,
                directory: 'g9py3qm89aavvhj8drc7tpra3m7a5anm3be2hjoz9mvxh2jfefyg38tfl9zobotwovrhw9prwm6jsvmmn0aqys9a5v16xekdh1wc95t9qhqdue2dwezzdm8455yimtd418gqj6bdf8h0nclohrfn9ssmf041vovucgqyzyge5aezeo6rmm410q5o9ibad6ywj2pz7svies9b9197804k4cz5sd8qbu07xwep9k952omrczbzu3tsr0v5h05jrd2p7nogoybiu9equ9705mac0dl8uyy2aoratoimnrbgjk3exsiht7688sxc0km9qu4f971bmfdyx711r4immpb1m38tqi4fsi5jlm860blhi9z2zw9nqctvntm8p2gpz3mj7olpzsxbal1slmoa9195mbpluz0dqq0fmd0scm2nrvfthl7g442ponj4bltsq0dlbjqm7cbn2m3bf7tcbxk17f15vtsnfcipizc4z76mjaamgebjwp739bgn0nhsx77jkk5eejzd7o14oi727jzpcvsr7z7x7vz94n3iih2yul60iws0rdudp568lvppzdnj3gy6t8lm3b0l2se78b9003iolxv0ci64kp5y7puwypqvar4ntzri5l8ps2pfiuwzj30mo1jarnygr1h6ijpl1a874edexm1bq5fwvkzi38818a7hc98r4h3ck21owjaduzzqtmdfj07qjajeqkmc7n4p2k0gu62b26emnw8ycpgzs6ahaexhdz24yvid0s43cckab6gvs2l43sv7jgpge86ku9g6lvkuict20y3uulg9d9lim3oruh0h8i7ac5r5x6hy15gfcpa956j5j9n65w6dxdfu9qjxuf30j91gdxvf7bvlp3nmptpofny1g0o5ei18dmq66q526369wmvrb0busixx8d78xpa4k6u4p8vta5vxrkgcas6j7w1hyrfmh8culi6nx3ltp9njmo93t1kx0v8zcb1c406fot8ouhwizcxd5bw855d5gvizt3m5',
                fileSchema: '1th0vy96j1uyyvc7x1vl6r0q407wd3d7n67xx3mq5tmyo818qa3qzkbjvsqnp7w9vzjcmn0rumep588c065a3qayihfr3cuwgdjnivsg1b0xlwmg1u65lbp9pxd3qfki2d1njr3hkgd0x64b8q4t94dhcqbgqreuq7qg8w0wc0yrb1nearmxelibzp3pz2kitq0zfkuvrqb8hj8fxe0aqofxqfesbntnxualf0yk5w4rexsiimsqk25q8bng4xcpl8bo0j08p25cn46qjr2hba32ptun7azsjdh56kwjnlfggqeybrk3wwdwgxh3py2nin7c5jdf6x3ynq3kg2y26sb2k5dyjvietj9rxpzt4dobaolo4x09sl0j3y2gxskk12bb7hmh0odzl3tspzwgal1vaqdksomx4ixud0bxli4z489v092izp63we333p8vwbx8wf19bver9qmmcv7aqrymb6nucwm66ahkuh65e46u2zlqzs2dw1clc2jystgxfcu2c5gt2ag2gos4pcbi7m55tp48yr57mn6658zw08wlfkfqdmwcc798cnjqwjpn5nhfp1f306ewzm1sfoziu9j0e6f6d68c1qr9xl9kmmgzrdz96ubdpu0txn9ln07bihv28x3cvc7ne100r3gswxrme5bsy5kdkfshbrfagr30zjq7b33lr6bt1msf94sdh359kmyb5qqvrw35dkzsrn1nj83vhh9ebjkz2buqzx7bj6vtyybnciq8zi3s8npgbml783l5r40g9bndyh35jyhinf705s3j56lek85oj4yowezxhef6dpwone9y1ixfl42jpxbef402xe0fq51brpvtxrrftxgeailbg44r9quj1abdhu1ydh1sf5rn1k6hqi34cnhavphbw73qi0y034w8db7pbnp9qdzuh4qkeueabc95mwud3ckhujbg5y0v4vbxw4pj7h0z9d3j1tiih66klip1ykl6zyw1hyf7y5g74besx35q3geevi7kc9ab',
                proxyHost: 'sliewiap9ecx67jnovieb3det2j5xkz48v1dun4r2lwr1nxuaqjuj5bah760',
                proxyPort: 2816688077,
                destination: 'lm3yplnl8os4n5duwlxuykyatmn8rehf83m5sn37tsafz3tehmx7j5hslmtwhre001hy6q81zfmqmrpgc2kv69lqcdjaiyzxd8znm4a0cfb3vfc0xpsrhqrl38oprv4122pflkw7auy4firnxg0ixmynfgjr8uwh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qfd67r1klf5m5j9fprf2z1nkwn09z4ctjbxzat9gbhb5gpljkkfpcmc6464b8a9sx3ordkzpj91hc1t1peckq749gcb0gumtqzkft06tb5v8pny2cnbn07vvifzr55sa2is5q8qe2ftuqem7rdjlmhvwtxlo615i',
                responsibleUserAccountName: 'nlnjaf17sm2uyholod0b',
                lastChangeUserAccount: 'rtef12lcng0nmb01s1v3',
                lastChangedAt: '2020-07-22 21:15:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'jotceovadbf3z42r6eco6q1pstatxychlipjxuyxc0xjm8po0n',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '4ad5n6pkt6up80parj2a5zxb2bro4zwstqpdsn95252skjnrrr9sxixatakewbplykho6ahiy4753j7grxqaki4l64q5vjkj9btbe53staq58nz1divgniwf5lf7hevj9p05b0fir26nq7j194h4t0u3zwmfhhpu',
                component: 'p1eml0m4vb82fff37ojuvraquax3coqjb6ju61nx8cqgxvlrsh1584mw7ri2mrumkvxf3qnyp3nnv16vwqbte676k2853jkxyccywnfrol4hwzld7bz22c4vbbelyvxeg6ajz7r73dsep5ua76co9fq3g8bgu21y',
                name: '6hicp7mdl8emvl0gizbk8mv3za4muzu2prc5qmxfd2l1uzbh259q06qs3bue8sxrcw6tsrydotr6shrbhmalik1uo62ioljxgwffiv2ugpx5sba7prbfjww720xu778jzrncd4jna2feeysxy0su46ve6gu2dgb2',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'aazvljzw8i29mhabdweurrgcqxa7uxae043tzfjau6malocog2ki50vrvmz9pcwj3nv9ya89ktmuffjw40qdchfgpyf9evbzxr8mr0vnry6sk7vjpvaxkoty81ojieogdvp570q3ncwtniawvik2lsbz8zcdgn13',
                flowComponent: 'qe0cuf2tk7qq83jl70y9a41lgvtin0tuihpyt22rgiczg3j0vbum30e183ae80vxufppskjp8k017i1hgsql3dj6xkw300g4u9ao9muziaaarmcusiy1j9pv0dnq36w29wz9yp45rav22wxkvz1c8r6e9iutxxam',
                flowInterfaceName: 'ecau1sk4csa24q5sm95xzbcapdmmqko7o49j0d2y7xpd0qn3kus7cn22glp4f11lo08h8asds4bdufzbj9snen1d6ji7brrga8kj7lg8ytj71gzkv678xk8503i044rf1ysujzk1cp4tpvh4i2a6czkh6tapqj5h',
                flowInterfaceNamespace: 'f1ckz3vur9btgl4mtq7umd2j8jc52qzohdw0qjn1sj7oxdwpryfqbjmrra22ipz0rqj7pxqpygef67owy1to9qypi0mp2l4g4bdmngwzdt299paq879vvtuegj34jholit9mg5p245i1645xce3dlii8qwnqwmw4',
                adapterType: 'kjp1ca25o6isctjlsl0rm1jc4eu1e2tls948n9uwwwrvl412mle6352k2qqhb',
                direction: 'RECEIVER',
                transportProtocol: 'myazdyh6kfgc1u0k7svz50uj4m47639sumvawwbpb97wlazxotfpoe73fgyz',
                messageProtocol: 'fo9rc5icpag5yu7m3yww3n1d3k11mwp4gns2pnoobtz3qhuz15svvwdy63ja',
                adapterEngineName: 'o3musq1dxyx3jbtpapenb24cl3hexf24buycyp5jcfi4770d0kk8aiwi03787wobamb9z91wlr1f4mps33kyefsdyg7nwp7vpjyzw01kf1peoupt2ojcoow4i4m1ivjnqwandbq09ok3dek8t2anv1ctgsuu8udu',
                url: 'id1ajh86k7k9zi48gyv5q6tk4qjawxjwtq00rup7t27sjp36yb35rfqj6kx9b22lq70nga044rz2cygd1f68vbmoqi7xnl0qu2slo0ct0gi6pg87mwhihdy866h6rx691s8oll8l7p30ykmmqsagtzazgye7gsauh47xvqzbhx8aliki47e5eyn3j95snjzrjjt3hs89egsutzo2v5e0iwibkyhirlagj8ppiyktbcbq1saltm76e6yjm8jwslktkrttt0yerfgzrdpcllsr7dgfq946brgiecf2hq65c3ajf08nehswyf7s7pioy47c',
                username: '70gnzd9dhi11yq8n4l304ulssp40uazkhdq7o1uw9vvkb3o7s7b6jk6j06t2',
                remoteHost: 'c4sg0rsobdpprzelpfi10zcpmgo5dndebzlxceynhq7utgis57cznq38okkexfxifq4scy9ezc6vbz427f0usse0ezrp0bh0oszbpnhsg4k846fui7pf9cp8vwipyb2hiyahqo145m3utbh7xg72vnjsqzzh5o5u',
                remotePort: 9980543350,
                directory: '4e2vdscynepoizc2181l7q61z35zkzrd9udb8jo00ws0sak3wdt9cfhpuya4lakofk8qsa3po1i4miw8m890xufnknlas35o3nbq3aireyd364jg5h4uuoqo0p47ohmdoa85zu9v4ikjjnbahnr4gspkpeshkluamtqr4qlepc4rgsfrv5j2luf1jpm56ingzflsa2wb2sndd2t2e2uo29zlz9vl71myetwdbc8k51od9ouqu97ub3gsqtnu5242fmnzpa4lm1rus1u7sfi0hm38xlpp1dmfl9jtn3swxwpwptw43bqe4tzv3zet8ey94f682vshztf6get58drjgsnd4aju38hy0lhyme2wdzd58bdhtmq0fdr9jjqh35l6nbg0t5dp2pvkc9qwcdufi12inpym9qn6ew92w0hbxn44ppc35hg4ge05kax489zi725x4tetzn0shh9b0hwh6255tp9uei0pii05ejg8ljpoc0773yjvujlmv1xqh9eueec8ovyhjynhg0at7a0xtppc8rxvv9kr8erhfz5i21c3sxv6d0njofhndjonxcsquo4ks6nu62mw6z480wqttpwerr3czy4phjtgvv865puj0cay6pocwgvi5zcgemdc7ji3miz0gvol1674zkcobsthibbccxal6zf1tk4f64gdiyk23adw6nbn7igkmkth2ylaub756yar71r87zyznud7opoqobbz2hd4qmt36ybqxzsglwyll4r0mddr1tececyeodadmjvuuohh89nk41lenaaehg0w037p5dgqp8k95n529dq9t503vaj6763fizk7hdrlrx0vo98a0md3g4hrtesu8qerg97azih8513kl1qs7au2kmwsgbh366kxelccyp7zikxwlmo6p2a7fyknict47fmunmlcib7s53ta4gavf7ljau9vj06194h9z1gk8zp6g1uu4e4rtx9ificbmijfr9r67dzx4aqvl2tin9uqfzd9pz6vmvrgo46g',
                fileSchema: 'avh9xswtaoh9ctoxgedtkjtkcdobg0w9wj2wkz0m3rykk558k4zckv9zfeoaqxfnh1c2mylp30zx6lecbaq78wploljeu9v6ju9ml84n71494m1z5fypg9viugrxcwr7ilznytprq4jyfqswnrzkl47k26trwsuxxjv8p6x0opqt9e004hw8lbj71jt69sm84uajuxbqwzjbfw0wy75qgkpq1ouwgta2kz5je6rgu9rtaeavxzoe2adhwoifnws1rtwpr6zd06p7pctefe9aikvkzfgzeumjtpgfhrz5db0w9uezwin21yl6v5xgxcx8dckl87xdhdf20jz0bmxqz2imahx8hx3iy53ntv17bejk71gfcx423jc0136127xro9k6wzma676px8n6g247xndbcd4c0g279owd40io4r4ccqeq7vzteuq6ae6uuel2p9j6zhhceldrttr7sruab0b9352x7ubarje4cl578xtkqcgd611iv0rt7pi6b82qak7onl8rme2s4asvu9fbey932wyakt01bp5aouk3dtcv8utg514jyovyb2cb7h5uy6uk599cmk73u9m2nihc9ld203nq5yhx8k1u3od99likydi4l5s7bqngicfd48ijpa1gnt62u3kj5e68n98a82lr1ihsztoxpryamche7rh79twg15qitrci5e6bojvp1oet9a51mhh4nehfs6tnsghxn0jk5g6n8a7h9kz6ssekpq1zvzd43tnqfzyrs63obde5d007chowc9u13ml2lxdh4kx0wz15g782b5vw8rqwvna05w0chfwoberja4yy31107kjshko7zkyfhtkz7kpuvaj28ggog9kjesartnenchqaag9dge6ys7pr25cfhoqad9i7x46owup2wqwro53xm4kuquem5cogc51mcb2bjgfb1t57zlynd2yr3a42u74bdd4w5lpkb89drn5z5vtwv7q3sx548z9ayq81wqmyawkdw7a0x0ih6l8i4u2s',
                proxyHost: '2e1fvssfj8bhoyiad4r0605pnkrzzflcgj0gg74l32q8uxjpsv9u307w9mad',
                proxyPort: 8490177371,
                destination: 'njyt96sipchy1uxfhhqg6i63s3904xm6hznbf3fd4nffystnol6vt8mgd5rzv1ctczza7no4thdx248q7de3cx676om9t4h1jgfamz7u2zznkgqn13wghgeoqga29nmcv5xms6l4irs819ch2u2y92g04bqbss32',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'h8q6b9mhox9jvmie3v1uafffs8yyazahcs9bfv0a7z54isi3nbzcngekhk4l8ctgqy768kl5mtpx2d5vxspsdx83d21v7iqvewspmzwsg7nsa3glfclc6r508mc8oja8lngrv2l3r4pdt9dhzxeoveqvaf03qzsd',
                responsibleUserAccountName: 'j14buv8ocu561m0v8e3j',
                lastChangeUserAccount: 'l3zi4z8q3imwe1ublhaq',
                lastChangedAt: '2020-07-22 21:09:55',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'vs8tuchns04fk2mwuvr84m3wjgxmzgoial4vdjc0kcqliynhji',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '9c55in3qkuqodm7edyf3vbppo5sa2vo0zjt58xy4hj4rt5d6xdx1yh9c5sc69f3jx5422z82j6414yxl87axm1fkyh4m6s75abk3zk30cw81xigeusagvbtdkh01fcq5l3lkr7csm3k6kfb41io0rwdih1vqcdt7',
                component: 'ex2d1tttwx3mtbp0frau00umg72ta1pr3lrep02c4ah8m3pcb191uqlj65vhn3xdytgpaagqcurch7rxz057w6iyx8nljr4a6idcbnog4reo1wt1jcgdft0dl4ezj2h0l2i9xbholsblh9gawxzdgdgceu4qm5hl',
                name: 'ptvpkz8pmvsoi3a58a1my5dzqw6q1kq81nvp5mbbnlix6sfs6zihsbpw3rqur1jbmpfznr2uttr1j8rmoxetejfd7llhiez5xv9d56dzvmvygf67p08an9hwyu7yxo240cqycp62vdl35heetojkuf0h9c8z6n7n',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: '6kfz9sc0sra6iujmc3dib8t3890fmtmqt3xspzri4pa9opfnw3vbky4c3a8zypd23htohls7slpf63wfrxgu4jznnwuupugjou7ksqf7cza4591jtk78db4jjbg9m1rae79e8xeuf6a9cr5fux7aa6zl20z8fhik',
                flowComponent: '3u9ndn28kxa23xv6eknyju36d5oz7ftfll5pnu4wyt4c8t37hjm0znelss7caq0a4m6kxti7do7wz8jr6zo6on5i52o1c7upgt57n6zbgt1gdeh1ldtxq69jqy4q99d8tg7hqhpqccfhxtmcwlfo9uxboi6177u7',
                flowInterfaceName: 'r3bhevil9o0f9gxjffuv0i5rzpxz8ndfd26092juo3t3ytwytm79hwmnv2qhq1mnv3zmsy0v506k0cs1d5iyxvkwxpek3dq12h251wg76pojyf1iw33xg99fnwb5z1nu3bfadw7pkjbapwjjexscaa2nl5ulgqee',
                flowInterfaceNamespace: 'al219a04itm49faq0x21qc7vqpayll3krcrblu6cn1281jfitua1827me0cx3rynt5ea47sxfbfbifgc1a3uq5w6ui3sqdoaawkmfgnb2r8mh648ir0v8797usqkla1cryipuk9e8v5003qvofyxwt0n1hdmwmfi',
                adapterType: '81njh2pawyie4ud91ig07r1581ppzumjzlp60xdfwbflz1j8vozpp7vdk55n',
                direction: 'SENDER',
                transportProtocol: 'yw1x8cmy2tnv1fllh7klov34y0war9hryfkiujubexo0m4od535mzsoa7qy5d',
                messageProtocol: 'r9rh18h7d9i7lhyer3fn0wjcxjqukufcydl288pfhj0s6bpa4t4moyzagpp3',
                adapterEngineName: 'uzujjz972tueks2te604c0mktyblqe28ippbpewqlh8vg6q0cgvnwj7bdd53diyr3vjkmlnnm326czumy4mrt772ii73wex9gzdekjx1xilt8jpot4z5tdc2wttpes403ey6wfsnhs9vlna2x30kolmw3s8oouaz',
                url: '3rm5oem6iuctsszy28d2twmyvmqusu6n4v14gi5rnzadskyneoyjvh3sv9wzkp2e9b93v0qepzu9zpq9eab95iqcl8a2s9ndom5jx9ek7nl0gn2d7qyryqif7pbdoh3l091wxqpebhjh9xajvx4oh6rt0spvhs3tn94v0khklcpq92kfte4mvb3dzp5lg49sne2fuwfjmz2p4ltn2bn8hjusgz57p2y5fkvtcn6wv2vc3yubelqj8bn9p0wudeyhrjnlo9erk2kxfgpl6xh1o84y57031bqnc6mzmibcc0o2dix0r9m9x2w9g384k2jd',
                username: 'vwn9ezgb56b2djlclrukyrc37q85vmr8zgllr5xybyq9y9hwb2utvdk8y3p9',
                remoteHost: 'n2fk6nr09aksp8iirvnp81q1f10y2o30vcce7qnaxdmmtrazufvwuhff6epfi9b0ex7kp4xkmhebfsyalce2x9yde32b4vncw6av6299tgwhqfaqwd0j7t0phutntsih6pzvv6ixcjflqyc365bdwitdmgiy5p2c',
                remotePort: 3853264252,
                directory: 'j8atwnw22oouu36kqsn4s70o98t41nh6h6wiy34kcv34x4zs1x7g4jp3pgvwczcgdvpgc63z8qi93d7k3s08sxawqobhvkkfanxfdmnrm0sz8i7rscq2o2sjh7qppfge6bg5jly4pue9klxqvdcr424oh4mfggi7a95mpwhp1wow8luiz3z6qn9f7wa7yvwbee79bxtbfjult5srcwfamvu0kwuazgbp1womutlzm1zr8fgb39dedfiwpolfpjwvswemtic3xxkjarb0q6rjv1jf7ywiutnb8qhkya0ebb5esv9m71zusg71ll5yflaa945kx2sdrxhojhg6m6lqdav1w652tw45lsmpvmyg7zkcyfpj2dsh8h0altzsn6abrre64ffwy18czsndlyjtid000awutn50mv0e3n0teof2tf45b3suqd0ffd6enj8ufbcoiw9o3tylpegt9e51h371p4pli8s6r7yzb4j6qwi7kl3f766gqg5w20tg11251vh2akwj4ouie83on9tkjmaant2iocbz5nkqyg2npuc20h2v3mneljx8rl2lwuwqzjuovoitfs3hocp055fdukafc3qrnkniskz3p0zc5lhiysv7u0bxewn8urit5fs5kgdl9e9e87xo20dsdfxvj89h8ksl0635tz7uvsulc2dbepfj0d001278ha75abp9xa0l40m693rzcoqtqlqkdhexo70kcirhvorrg7dum4k61k6nohld1ik37g2v72po6g5cnctx6l7aetszkb8wu56uxk9jvzdd5m4jek6m77w204808bgszuhsz83nluejk37ur8xvfu9mhxreadvvul9llcgoya670zqfvgyjuig48wnt34fc7f5dkhb4i28ikor0f1vvl5z3faaaqcjr3nsjzs982e1c6yppjcula6x359g083kj6ilcyhfkgu0todyhhfaltzwqj40toz3mxlm5a7uoqhm53oavvu77x7ur3mfrjyp2a5e0zqvedorx',
                fileSchema: '84qk1q4dtvogl3ewcwffrwfl86xrhatbc0jprjqrkraeq6hjkddedylhegwc2ti41eixr32pvg6nylkicsolxs9owkqiaj5yyiqkja0w4y266qqo4o0zqo45tn5s13zt5a4xgyx93xxdb4v4q54sj2qyareasz6yw6lm0jaj1y6c0hj0ogg8tmz3ynraiwtw06qx002i9ttiw0ibxv2jwephl5phx71ue0jvd5fp5lta87axt2we0rupsq2cs25i66xveps75qwie1m859b85mbgaojhtfh5d4j1zjocffuxy5ivvxxel0zwzei02bwyvcw0zy93232ukloe4cy2ok07a345hhgxbi4hkxkzk6qm61n0pvdatl3eyx0l0ilm1nogvoinz8npkrbq0phjz2v8sr6jnkzpe13z2tisjge73uhwh3kp0iychyt4xc7bnpww5me8ce6vr7vk3yppm0avxryudcud5yzk412bfn55aq3juwdg38p8tymn14rwdt76u6128mb7s768r3mau7ohhysf60foog8zkala5r6veobp1oiqz9brt52szvtoaquajo4rm09m6vttqpxltucah7l6hnsrosr8p6cmakmpi9jkc9uvlp4vownhxettdxi6mtfr7f9a4opk96lifpp59y1shxjzv3i0knf1xhk8j9k6s1d8xzv9ug9nnbw0jio81fw6s811x8mcl4vz23zatf5setyns1uue6xsqn9ck5uga8zsi2pybpxt7n76tl4ekp1a5kydzjwfocotd9y3uotn5e5b8z2n34r393mvclpw6eszgtew6vmq94rsrukkqxuhikuzr2sund321th0vufx755uf9nros6bjskd4v1ww9uhfy3c3t89vbvdxaed4oza610lgjx8opchxn3sxqnrddfz28qsbw9gfvch7ieph6gdsllv0t77r4ttrl6x5admp6qxywlygvzvq2y8ialb8257t3b19p895fzsw1f2qmsrd7afhotwow5a',
                proxyHost: 'chte2ve7z9xgrbzdk1sw40jrsnpucfv463w5emuwau4pqm0xldyerl1uttm7',
                proxyPort: 3011941302,
                destination: 'qp0o0lvwut8qw92jlbm3ee7ihbh5hcq3m3ihvnpcr36vzxklfm40upbujliey0m0tpog1pfadqlebcg75ig3ym5smtiwmhnvv4k16csbc81pec2v39kt9tb5a7d35b6q11c5782guo1l6czgvn23fkuklbvptf98',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'pp2tamhvtpanv5ko5t3dchpjqzcm4ble45gznbpyfgdv0y8e6jikjr4kfna3aqj9y3bzxb15u16kb8n6t1fnyj56pweqmdsj13y1xf2c90g78vuekjvn5pht9lvhllxs0w3zdge2dbg0hcgzzkl0bwqp1ej7t5xc',
                responsibleUserAccountName: 'x2gj840i3314r7qk9l03',
                lastChangeUserAccount: 'xjy851syq4vz4po2r1og',
                lastChangedAt: '2020-07-23 02:11:59',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'of9ppg7xw3vah3gmk3kjvuecehojre4in4sav9imvg6wd7zrx3',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 't8h9t7k36nwvz35mk059coefciu11kqqbayfa5kpw56wclb646nwzepqnhp2xmxpxvvio5xv7qi3td7ddpr5yuvb9hlonvggmnf1i2wrh6a3g2w4fi75c2reawv5frzjw91kev8qb9xjss5xwll6ojhnujrgux76',
                component: 'zobyr6729man8enpdq0xynsxpeyz8dn5ve20upwmun27yjckmdogtyo2zoxgoj5vn46f96rwhmfdbc8rvx3xq34pdhmlz5g8a6thcjm4qvlpjkp2sm63x4ewl11jyjkr1thqh4v54umyw6opetamvf0vx0wpddsk',
                name: 'mamrhfpk9wau3mhrg6715cbiaxvrs6dmyrj9rdlm6tnub5e76rmeoblz5xepqerv1hf3ui6meyl0lu30aqmah33trojoimboxahyv7sd02f08ngr5sek3c2ponxpf2kk226szu7bgr1a6kul860wrq0eh5d6r53d',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'btpfnm5sp8d6jjalwe01hx68fi73z5m6yh7psddoiggz0lctyjoqtei2kdaqsdpeqz08rd0u1oe0cvnsf8sb6b86zid041i45ljc9bcqc6rmvxonnn2nwsuje2i5o9cotlj1x7ju8aqfd5g68brtktcykhdof8r9',
                flowComponent: 'mnwzt9ulm6m3qslw5gmqbqpriyqahjv8avrlo0ajt5jx6y8n2vzi8pggodgvd54kvjvfl3a61rqr6vp0qavo0vcahmygi89wlsy4n1e69q1a2k5ftrncnvdxi9q7smjxgpynlh2y1xb6nhrixe33ivmmo3n0aoxa',
                flowInterfaceName: '7a65xtcvwxvlrbeyl117pjcreykf40xd6kjw7ett0857ofessuidp7z3e4un2li4kpvbha1xg2dt342cgajk9ajtyzvtsvaoxckk4mh94c59k5pw2849wdepsze3r4dh9leewkev96w3kify0r0y9c6x03kaf9ko',
                flowInterfaceNamespace: 'nh7tnbhqy6l126y41kpsb09l7zh2g1jvzdpslvpy85xt7a2s1rsc4hxprhlulhw0cha587dgopqkicjmrt43zplro0yv040l1i452th8gfxrypyqeeln7tjtepz4pt2vhknhzqqpy4kzkmdszlwt84ylltilm4j2',
                adapterType: '4yy3j6t0y55cv4mvg9p9g80d7a56h0djayp96p0ywl8ap7yw88qwxyea0ekh',
                direction: 'RECEIVER',
                transportProtocol: 'y312oqlhiezz72ahp08ip06n912xfec19vqf7krv8qe25u8m1nloyg3gnifa',
                messageProtocol: 'zwtsq4plvmzs8yoamce0dyqq6vszb3kv0h07ohli2w1selyoo5k1t0j7ca28h',
                adapterEngineName: 'a64hb9cv9kiq7l6gnzqewfhp8udg4ftk7dcjzsbfna2wk3z1vrfd19oqwl9ipbpp0o9b3g0lmqp6ljtzhjgil5t8iyt1xzumisgwo2f3ccas505nzhygzshzw8fpvsay9r4g2l66cxk1aazo69zuq5z63b7az09i',
                url: 'obouoki3u313dbooyjx3tvpnbyn5c1lzukgr96wrgdj90p0wchql99u3by28tu1z53t5xu1fkmzjs39f8bcqon7je873uvaa3cl1ymg1b1kfoapehu1re6eyzapkzscj4erlo0xarblr1dfj4gmkgi3mdhbojadfcjijpupqse2uvtsz1mjyfnn7piohjwvqv7r0nig5793qrqgpjns3jhanueo7n3x2n7353f3g9dtg7r29kicx1tr2nkfgx2h4go3x1140y5gwtzec447vrnwe3th7dkt3mi0qqt0upgvcrx52bozdvqanvk4m0nov',
                username: 'y8vamqk2bm8rjauf8s935cly69jr1bdrxry9u421yse70h5mt6qqfbktsh2f',
                remoteHost: 'ilp116auvz3j0mp2t06wr9lt7pr1qo37eyh0qk6wkmaghvr2f63vyh49x36ekc16qmftknc4txlxzgw8xcj0fzit5f6yt30rupyx77rgjbytrf06nphb5bh86tjc3l8heuqqnilz7e1wzlnvo8yaczlzq4mf7bfs',
                remotePort: 7464508693,
                directory: '3josjx73s3rwif07xe10a31bdnispd7g5u8sik5cw8zpdq6hm12r5r5n1wjmxt1ncnzinhicln6bdvt2r7nxvop1rtd82pwi62g78hc42mpk6d5dn2tl7nxs4oq9q5lkwq1s49vj5qs9mox1dt4qutqaqlueec72uy8n1azc9kzid320ejztmsvyymbdsw0iwwwdc7yegtro4r8ac1zv4anpkrglsb0czwhsfzgpgfrxem4tzi93ojn5eofafymny2antlcdbikbdqoksoqvka7roohhj34t4i3im91we6pmaq77xijtrmgd2c6q7my2bnzq5qvgrv3shwgqtrukxf6x50sp86kihpx3pa6dhjgq2l6ke372cnmwkjd92k282yse39dooi01qq4c5pzt94ainskq5vpxmi7y4q67wpsipcr5gs9g8scjbp8ncxdbl06pi1dst81qtopniv8upfwh4wvzwzsp7loyqqupl2wuy8gur4s2okkgxkwwpyf8s2gwr6zjy66ev65h5z90hhx71celgza7814uytb2789so88ejzpjq04s26pt2ktq10ml2co3w5aqs8om9el73ffskwemp1ze4pyco0vvdn9lm31l5tml9ngsjz24vjq05gn1g1vjn8xssps9ltt1q9qcr55rwjrfmyvpfvslehyriaf0gk7s9z4kw8urlsciquvzgfxdq12n9pi2jkfegnkktaupkpbb91l0gdihwbpak98xztdfckmufe8uw7nbbr19a39ch9xj1u0p45a7d8hlqnijnh04ntd78a6rxvar6omu9a0y2261lqqf139bnqtmatq8yeng7fwzmm7s79fr556kitu2y0yq6hbubssutysa48889693lnrgjn0330c3sjb56j1q802pnfe7fdmjydcyhkafpklig6yunz41g50s5dpayus8qq2525wwaejgoarbvwf0hyvqofqvduz895l39aroqx23b3bk2ycpmqo6yilpdjkmcxflcua0',
                fileSchema: 'ld2vwpopi23w5hyzw71dw8iaxtisn94wy814idv2q8wrv2mh5dmxkfwmzl20x46l8q40h6v1qnlgjn1vioowr1y65zqn5abh6tvfo3fldq7ixdtl2nas8ru8wox6jnnp707on0klmmmjcg6hxateuagvyw6krpn6ium9245eugvyme49xx9zryno0cndzmrau9bjxyjravldqtr16l963nmf10edrf4nmrbuct3409c3lcaducpzt9yf5467lbw43q94i8xhf0ddhrkxq7affvgeqd72893e9iqcu2d5fh4m4f0yqer6dp5ce5kpjot6nrkgax1q6mttt4lgpra8phzhmwcznvy8uagyu87r7a7ujtilj2pc7ub5okbbaavh3m2c3ti0woo69e16w8rlls6b1nx0zf5snp30g1au4ad6zihvvpl6esai3p0uze5hvbuejqs3u53jvkh1u226anll1unpydf71tfa7zdrw5txynuxvoz8qk7sircfs15hk56xe2heu66t2t6ka7ix9dlskphhvoekff6h3g2h3cpx6y4hdvg9e4y5nzz8h0h4a7ceaqll2tjn9yqfcy56qcwxvti1jer8lf59yab0hp2c9yforcrnuu80duche7fii82q7vttqp7ui7e7ouwi9qezwtlki4mekxtmf33ty4tsn1x4sz2tkgdxr6y8e4629g0u8v4bvjomjt2sy46tcvhqsjrvbuo9t75xbc0gro8128d6x1vld36p119q8de14v8pq3qtzujk09s5w6p9pdkv7gu82kfrjfzr2cjmjqveyed6x6uhxe6vvu71ynlzd0wulzp1tmpwnecazg82rfzq8mcqoo0amxoxm4gvhofzlgewzvks70otm9cr4mq6wj29447o9jofbpxsa5p2k5i7201htf6quqiz9pqc67hezbhk3qntrn528nys3p1xjjf4oyvlvc8da80dkfvsngetap195dnda97uq3dhpo54h2bf4s5o49grxkwqu3f5',
                proxyHost: '8jwsidvxr0inayn6pqclxu068r5rdz5aydy9afv9hgbu9xte76vng4y1zn93',
                proxyPort: 9255082875,
                destination: 'hfrw0c8uuts4py6mam5xmk75xbzkc3fqqtg1u2tchia4h0tz08zoz8ytju3m3yt5qthkan5tim2d3k8cgix2k6odfkmhqfdmf4gm2eotvmv4c1x7mfgfnkk7s0f1cfvebdsnbge5fbuphvwe4pu37a07ysy5aplf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3htxn2cn99j4yajkmmc2lu3obq61q7eurtxgmys7i6mqbkve2asitxyiwjbnzthcd3rbonktbggls3l9bj58h1573hwyg7r88kwg14awe773tkt7vm4laj43mecl012k18j8kq0x2t7ru8fuw9v0zlp5tsumskm7',
                responsibleUserAccountName: '81t3h4avcfejd3vkocr2',
                lastChangeUserAccount: 'rrgakd0vki0rcd3o7qwo',
                lastChangedAt: '2020-07-23 13:24:23',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'l3pt71o05pd24ijazco6p13hacvuiias56xk7ngbndeu1azmdm',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'tnnrdetem7v8ns5kz7klgqhtwxp62njxctywjr8e1ze7jne9z0zvu92wtohu69vqnmm4ll7emfzbhxcvk5b5gz6tjnbty4nrkx4wm1rye1nxbitu5xxu4la9xnlbuzk9b25sdr6z4ufps6hg3vu2fentse9m9k8r',
                component: '9lcf1fjfvgcz17qrh8oqs216cl3fs6g86a0lk9snkzrrw9nnap1lnn78njtlihf88y31wjv9r4boauktkxfroa0kmx5oil1gnokjh8doarprd0qgogwqbe7kih86hjdjj46c6xbfyewps31iii5wyzrk3h9tis6k',
                name: 'dq1j65acfgomnjqqtlq4uk4kpsifflf2lp4vrmmorvwq5lu157e7ya08iq26q0yvhthnhs7s1cigj9ezx6tszimmt961q26dynqnfi37gh245bolwqhdimrsr4cmo6g9unbonz9vc0wzyg6i7f5taecbv3u6twui',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'rmaoy14chr60m675m0nb258w8h9vlpqe7bjzjey0nyvoiej4n5sc2vqes63od4yhyv015n8ii4iia7kfibw8jj6nlx0o61x8dnf8scyhphc09yxob329p87t3g2b7xrp8022dh80y4o4ajr069ajn4jp3e48im4y',
                flowComponent: '4y2mzxfw0js4nxi5jcs0uodgg9mvw4pdgw0uvrc756v7rwhzc3lq5bmuwgzumsi6ahtt6m0x32e5laxkvdl4wwwsz1n1h04l1ssdvy0vdepau0e3wib6lcb60glo8xy9tmup2t0rio753a9dukfrvb071ntzborl',
                flowInterfaceName: '3mucbzecajany8k2tjx7w91zvmsv4vwa0az7icvyvbtdf2zptyazi5sdc6rietytq4leghl5ng2onyelby4oeaavy1mxu8u8pd5mgan22p4ml5ew1urvt9afvm68h40gex51evu6yilxegersqgim9di5vz24ipv',
                flowInterfaceNamespace: 'bl6ys1grk3611k9bew3onekdjw2tk0tq0nmiqkele6473786xk3q5biu3xn4jjt4a8489zy71pmgvvxwz2sm354yjhjsy0e3jft6oad2t8oy84bvhwpxm5esx04tsri9fd00uc19i7qsjh3dzzwx8dx1i8jujzzy',
                adapterType: '6rxgfd0ww9735wdst6u2cq2hjq5z2q0g8a378b33tzv1g9stjnwtaak7g1sq',
                direction: 'RECEIVER',
                transportProtocol: '2x69qpkdrsl91yv4ko832eiauaee2yje3k4y73pnc0iv7bn7hcuxs4gcx91b',
                messageProtocol: 'r4wvrpkilhk34x4s49jpake71re89zkln5oj58fwdfkeq1f0qjibxwq7bem4',
                adapterEngineName: 'd3w8a1wllblv04uq2no0chico12s5ifot0etoafvh48ao34sq1osb3jqjn1q8at4v13igg68yqgotjtdoccfn2skfo6dobhsudu9ml0i6s03homp19hae3q6xtl48tids35d3zvtanku4cscsr53occa70veqorjl',
                url: '4lq3y563vif0bxb9wxnzra2ho7rcj620q341onfcbtuif84atme54ppbb073o49jmdg80a3zuibalc9v7y037eb215iwfpm78gt6b2l2g41ogm62b207qbt1hci2slc3ctx8mvlummyc2eo0a2xhmy446wtnhv9md05fx3j9ixkkz4ppxj69vec4x9q7zpjrzpnletrzg5vc1eskm9fknr4bdzjubzz9m8obg4idgnz6p1km68xr9s14jufhf6gmnal9234asll2fmtssnnpd0en94wt9dhwl3x0hnjly97k9h90k3qrptpfgg01rjtv',
                username: '8wz2o2o462w6ukayionq3ksn15m6tidc8oaof6oydey9qn8qht5u65zzpowp',
                remoteHost: '1q3a5hs7w15enogbu0wnp2ldx1t4mdhe5qr0dui01xsg1zdc9quyof0hgvpyb6i31mowr627t3dfm8dj8lq9qfr7aox5ps3790pd7f8eexwq4wi18f1n4mmrc8mxwx6npu3pei2rrcclpze8r69qhtu9ag61wkmj',
                remotePort: 2832914833,
                directory: 'yqt3oadj8qaovabz1zjqo7g1gh32hyz7b5oeiekejjew3klm8a3d59vgd70lh20fc0p3a0svmxmmp1ny84myo4qagzv5ip3dpuxbda1ce8qkuipaw10228cgbya80d6m5lmljvdxxf6a7bds5yvhx10xsio3mj74m4ggusjfe0ea88agaltksazfvh3jm1d2aq9xqpyb3qwfdvm2cwgpyn4q1405nqlrrcxesh4sl70dxyby0j9h53mdxbghr4utbshgo97i0eqglflmjv01ctgqn49g7594j8zhw82ogaqi14wrj4tut9355shqz4vdw5t9yqo38p6l8l733yaa0prnphmkoor9t4htl3owuduvwij343qbaq7tiod8zrg4s8plj75hgreks9y4idcd212mcdxtgt31aqjn1dtw4v8qde8ncvu5nehexv9kghi3u2by3bimfmghsrf1n1v64hbanqy4p6f5xj0uvnvofuytwf1vdvac41k1cbe2h26p2vr13e5f3olba88csvmei58jnz4vv5p6cx2de33wmgf40xi7552hscq262y4uuzkabt39ki9weezsyipngqdydmije7wcqzjiyg8sgi0w3mx548ca52bkekne5vn9zfel8ktd9rtikqlge4p2eacelc2tnf4ikem6t3qm5itmj5ukol8mqijo973ch2mdq77zhtqwhbypa027gemtiwlh7meb1sdpi53vd6pjcm9xv1u2o40io6feuer2kbdysc3tz2w5v0da6m1tbj8ffgjnfp5w2uyky693g1mo2xnxllzyx0tkenaibcep6xbmtq4lsgtny7yectxheo60u53pq72wntuxwbjidnko5jvu10eqtnk3ppmevpmj85l37rvdedwpv34133bx7rhh8wui6lr72cbhydos2b0sg2wtbgzjaiha8yacmvt6wl5903rpc2p42kat8b2p8dfwer0lcw2oyfu9ekng6zg9i3l8562sj0ccvly7ubwbrpq2dy4',
                fileSchema: 'm3bm4qo1qd40s6eo7e8e6yw1dern1ysh599w40ohghkee0hv9pdlvfsb8spuk99k92te8spexzfi9wethc6vni396fqorw9aprno63q95wo5lkqzx220e3yat4vapvncjidezcpzl1dedfecrf8nessl8rjmib06y6hz2pqqgu4hidwkjimqggd361vm9tgy77xrhyt8i7ea8fq7tfkjou2a61wiu3ks0hwpmx8mah3ff9s0l78v96zm2q28jtpf38o8hs9zp61l1sq3nd3d2p5p0sgziwa0pugcjmk4l8m4p45ixl7xg5b6yq1617h2f8ki99ysifnya8fpaelkoh37id8am5rugnvyu3d290sncudh8qwddz34r87exu3ti90vmk4l9dbxw6p5v0nwzvmcesmtrwqy1ndvr31uz8dvpky3q8xs5m07on71iltvkl64qtrj0z48rfa9lbt48imol84sidzgy2su5w7zyr0qhzpwr89tskiw0a28apmq4kyw5opiyhv0qbs54s0x1wmkb64t8jw8uzho81we8d79ykg3qzkjplr1kr30dp5s8i4o6qj9ud82t4op7r5jrrn9kobdufv0v9fvktkexih20ufkmtt7dyjksr11bwbl0kyzr3tc7n1k5ohzjz2685qzmm2mghmzfb5fumivbb8spd06rfne6g921ncmblvn80wuktia1sughi8qv7lt3kt2fxvpxgmzmq6ucwhw8rqyfr1f7z0jge7r00v7p2a5jl2zdx82szoa56r4jt3axsxlcahkqef73xot75zyopiy73h8x0d9azvbnkq67ypmfxbqa6foegxje7mgxj1hqgcykk9f5jyk9f0u8bjku0tegewk19qdw3o1ngo9p8bkql1gjaasrw28fvfylbxraw1cxn0e5n8bd3zr1i5vgfsq791irhvrmvwfoeaagyln781c6io9bu08p7tr9pxz1vscdbg2u3t3283wh4qyhyntdqvhhc3kdh9uizv0pfys',
                proxyHost: 'g0rvh3jcztnfyb685vjs3v14y8ejrl5e2lkjo2a0tc8rp2tk4a6o3gddiy7x',
                proxyPort: 6892134743,
                destination: 'tpx0co51r2syxmqzt62goavs3ap32mkcet1gtvsg0pj3fwo6rawp31qwsiwlyrudi5kj5ejr1p91vbqpqtdczi2u82a2lwftposobd3ovif9bdlorcgvt626azh7qi6t1t7lsi460g44nxjz4mpbwnavvbx9fpxp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'lsxigq772xfw6zmd6thdji8shkhrm019jmbf7m73e9fpzo21sji0x98cmsdv6th1nm45z5n4pbx2fd5y11aqxgd0tm6ohvpwgs24anvkaynkyntmxt21zm7xx1c95wp7glmbsdnzh3btszsmbmev8d3r34jvugql',
                responsibleUserAccountName: '7pzn2yy2xcytra0zs1kj',
                lastChangeUserAccount: 'zmz0k4arsejviqrn7o5u',
                lastChangedAt: '2020-07-23 07:46:51',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '4r2ohd70e7ngtbreod3fcqvc7w1dhutt6b9y3cbcrqcph1eibc',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'g9kpxi2k73xdtkkt1m4fs7sswuwsxuvmvdxaboy5lh25guvx9ol7rnuzgdrkdlnrynil1zi8xkc1sg9i0yipec8d8pjh82382bzkz2f6iulf6gh46xuta57xu8vfvjv2iv5z0bdhrs72m24sc1t2gdjkjmbe2x0u',
                component: 'pu29exz4d4uhuud41dvz4917ft86hw3vx1hzstyzri46rne6zhdx5e4i2p3j8vcnvo6pdcoczwxy2f3tcgamxph4kpbalg643aqp2uxrhma7cl8729huw5ngdr4g7pnqueic11tftqyuhxwjhmllf4wi56g1jyze',
                name: '2i3yxhf2v4ychu1teohrypq9z9x86t3xzgz3yte3827bdfehu8bl0i4dss7fdupp53vfshvo8ge83vzz2j7xvm6mmb0844zu3vfe77kminy5zsqmdiqnjeewy4miqzonf4yszwwzyue4e2xjx3sbxbuompsqzrpg',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'ydzzabbs9me7f0vxadjk48q93c80sto7z8v8ab2fxd2w3p8wo1cjzgoh5qgao4dotzp9fjri4svx65bheo1d43j276i9abtv4a48e8fd19zi7cp975cmbavmi02hcl9sig8ngep67ejnf3p68q1al6rtarmppwox',
                flowComponent: 'nzt98fsukq42ifsqkqd6nhtl0s6oy1iaarxbzks0jiznejqfxlr8nuwyxznr4o3c9hkpojucnxpotlgzmkbvi8kslfhmcfladeh9jbece598jtezmprcnyde6zhkg2r7zltcrx09o448wpvgpo4yttonygh7fdfm',
                flowInterfaceName: '2iifv8f5rsozrnrcunsuljqe6q2j8jijcspoghs2dbkqzo5sev8z85lxt1zlvjuv3v0uyxwy1bxatja1i49i64bmqpk2llqp81kgzgtgjcz495wvd4unp5buwau8cmriolle1e49ot307p7xyvopl58mx4o8dhcx',
                flowInterfaceNamespace: '2g0pbectk558u2gf0jadcxt58dobd29v8k4juaqecp3q3nvhuyu1l8ttp6ujtdjvxpqcm7nnte2r3ubjcqgsktsawhlg7a7ghvnj5ct5x7ke1odq81dvnqnr0jg9f1a5h1nrbsycwviusjasl91j7s6v119kh4fo',
                adapterType: 'hi9q1m8sv402dmsa7l3ivmxp8sniejwt1gpm805hppir6dwoojzeyenhp4l7',
                direction: 'SENDER',
                transportProtocol: 'uuua1nx3tjvw0iyzshsrgtl4iwku0y0n5g8b16rzpll34m1i4o2ycxd5e5qq',
                messageProtocol: 'mbb2ixrc6vlhwj92pymwcz4eruj74qgumfcbqxi6ljlqcjc1o65xkzz85kr1',
                adapterEngineName: 'xfp8kjn8jm0tc6p4z6g41up0kkj2ktl7oj2leujl72eohdaq7pi3w0sg6xozwxohmv73fzt0yszi8ohpyaevealska5tvfsgk53ri3hysy86aajf2d19jztxvq2txzw2asmulymwuavkuntk978inwyofunaoqi6',
                url: 'eptxx5klwabm3onx1coupjluu21qlwsabxivzh3ejqafn3hk32dp0i0qu10qo2tgan8zhkbookqsk8ppkr2kb2yf15x6sbjf7fp1q9qq7cqu1o5k4ld8s7hbud0qugcj0yed3fam43mwig6t2aixbt53k8pvouop9p2kek5dqccd7hp8bjptn17997vn2vxm9tpw1zcmgeuk6791mxgm1ijff6et6xje9rc2cvpgf8opxf95q6zt5egualh5j2he49djtg4pxmlu82u8j37zbvs3ffw28fghebuun96jrkp4eqx2yev5sllco15b8rpcc',
                username: 'ezkbf6tvt75q7sqhbi5wytvvbn37btg7adggb9qac3wld3pqe33qasg18fos',
                remoteHost: 'c2ptlw97kmyrqc9l6qttt2pfg2qypdrfhnb7hvwyopwxnko44xubute4vm8d1zk45b8ekwdowjwmemnevd1c1upmjq8m1zwdmoolbayx4j86dlakt19g7udyi31p18vxwz7st49g7938bn9z1zmhfvomoba1h0y4',
                remotePort: 5684620400,
                directory: 'd1al7wbak798b8ywlavhkebfv5o9zxc6zacr7j5i8chxqxenukohie7dkara05lewvgbm6oyzqi8fu6mjpf9uqn08mnr5x0q4k9kxlh1negawpxbfh9wzoez1rakf8it50xkihdzilbuwmx3rqoup0syfyv4rps1ck12bprj7jbmiyixtgtyh54ca8hg9hbrk84mh2guqvhar3yp4s5v4zc2uwmloailqdso5p8lp3n1udsd4r9ptoqs4eexfyoorooh5ikrh143is2rd1jrpv4r6ww4oszz6cb7p4mfn9y7wv55f8lr2gx9cxv4skuszimuhxn3uv8cn7yibt75nvmpwo0oyhs047o4vvr6wswhk1x11qljzpy5gyuqf7sd0zveesxk02vmam0jg11bbxvqihe70rr303t2yyu092gg9yrm61cug3o6xvvwj0p5csdcw1445isnqwj8uth5fbyq7o86gvbms6h9fn3glkk6zu77erxlef0shha2ek58l6c8sozv8qxs6pq8zpd465j6s75sggnvvr8kxdj209cavtinu5rr25i5kpgki8tga51063qz5oag77twooubddkf0if3yxkdgyitg1m2eekfnro0tr5f6fzipht5p0xkp2d7vsajh86qug69ooxp6xxpzpr2pqa9vty9es3ellwydi36dkzzgc17wg3fua8tnfhumksksn9x7wr3k39yr4i0f4nys1u2o792n54zgxc3uwqghs7s0etw2ddrtgmsmkb87zghd3qipi90nen6mz8le6vigva816f14v6d97qjlvmlnnx6bsyh3tposew4pv4l7pypqt529tcx8mqkxudre2tjk3j6tcf4cj42elygngb1zythxhkedwn2qiq5oxpqiea48ss6rry9h1u7hriei23msttxg7do49zaj62sl0131y5u45tq86w8geh9pn01w21rndzbyq19cootbl7930la3vxqsa2ra3erzjk4ffybw2qfj2vj7kgifrrs',
                fileSchema: 'v3ctv2nazmat8yxalz1ev81asxb8m4j1k1apq0g67wgp76ptc9a0du8y3g8922cq44p5xrsiunr7dbb6ycn9utvuyvyppxr8niq5cs0urexp5l8ng1alycddiw2nqkolalxe5hu4l94fkcq2yrqf7zdvjaw67a6235ppjlan2gwop5jkyyt50tcc3i70lce80y12mzxi9u47c3om1j3rx8ikefq9lpgz9u8r23tzgg1avsy6pp2m0yua2xvw89jzkjik67i9lzps0sgdpweqn7t43tstiew6cewz6bq7fhw23f0m5q1mfwnxh0znblg8gb5soxbhumqb4uzgzwww6g3wycz1h4rm8lgzdutq672wu0ehno0al0f015dmfadc2ng2zibc4d3wnuo3sp44jhz6qptplqz2q96hwb4aa7bcd39tn93zp23f9roniv0zs5ashwfiib2r3yvnv4biw2xxftpe6uf8o65z8hsm84krckb8sgxp8rizjrc32yxb9k6neaj1xf4oodgdw5bvda6h8qerq0x538a8xow3rbvpvibtkhzq9smyes1exqe3041um5wz4gcznb16b1syul2woketzq07s7cvwb41wgfj0jvstwyegof18upyrb2ils3s8r9pvuwcvao0rks6ax43vz2z6aauku3c328h28b8zaevswiubfpf35qhzdko6dizly5vsjaj8k1mle1ypmr7wn8c2qfc7nzyfaab6k85ufmdu2m90len2h7druyj6qpbsgt0fzib46xkcxyb5tl23pmo7ok6ggq3udggwbsr9og9w213ivc9bl9w2nuqwo05l059tgf5eg5a1236tdescxhmtfgk5zsg7vxn4qybtqtu0cngf5oy3u47j3o4t145m2ce0j0fy0vufbt93nee0d67iqyp04q0aat2bywrpyefdb648pmubg2hch8rl43bzs8vq8wanxmsd2vbthlb0yy9155larh6r1deadvb30h418u6aqzy4x71vb5a',
                proxyHost: 'v4yxupzuzon2qr0xzbpych8xr138kf7z0f6nf0ihej8d8zob37vn5f44sc44',
                proxyPort: 7797911217,
                destination: 'akedt0mdbr7x3osawhazk9zqm59bzz2467bu9xgv372tqzngq89mteeddfrtm878sf31cr8q9yu3y3hpmn0cewahlve69f33xbj9f8i9gqee234fm3qnlsb6fqgn023fds6cxeu31b4arxf9nfzefseqhfwev7vy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mzj69hr83b13tc3vjygg0i3icozqpwr34t1vuvlu6i3dbm3bzps9ujejnnszzuglo6bmhwkj3q8vtrqf1r3pbyue6w55150hm7hyikpx34103fqw6ee46kz9kdz9lvaw0ks5mjhutf36xj1zqtxgimp4awmdv7jc',
                responsibleUserAccountName: 'zoxis0wsw8dfyoqc5iey',
                lastChangeUserAccount: 'sfymk7p7ps49pnlkl81o',
                lastChangedAt: '2020-07-23 16:23:29',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'ufteyxdflfoj6f7kcgl5m31in4hs1nf0qlwmogzqhm0yetbhbq',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'xov47vvq7q9cz0h8yxn3zqq1vxhn6jw5ndemms6b4bzxmhleabb53mbs0oxn0ddz5i6flogr09gwhzufbxzysu3n4dubb88mc8xipact3gy4hs8oi8ktjqsxojf4qohfgp10u7hi4al77anduyzfbgi9vbf88qpj',
                component: 'c8kja41u2rzgqiy7ut0c1fqgaj78985hiwsg1zi8t02liylbsanr3rfc4f7rvnos6len2sdge5r0urvizyh57abxng57otuy0whxmz93fmwld6dvrxx4ljpmaw6bgymdar6k53c820ry8r0cxyplpyhngbd0h0ny',
                name: 'ws3lhwtoz19eoxmeg23bw1qwehe63quaebfqh7uzam04ppy1jqelfzr4ibvr0k7jgx6kjz2kw37z1n7j4xl51su2cvumb5f4ns5bkln08im2s5im3apervcne6gyhejb99or7qhw0zxe8v9zdqcx9kkd7g27cvgy',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'du1v69v94b0fsvbi3cajdq3qlxzfhn5na54cmsy05dveihzel22izwvu074jp75vusqkz99f5yizvtnvxmeiviqu4am7k7i726mefhp8seq95ljtyxymcjak0sch4fdobpt92fpj6ym9egw8hfcxff8nmzhosbpt',
                flowComponent: 'piazihdw0ogot1k3cp7876e7h17srz99n4aclz64jrsc042qeyk5rfk0vnk2ncb7qmdy3zgvgj2bexjwn2rm9hlg6gmjey1t87mrcu00utwifjzxiycmqhj4ydfjf6sd8ddy51gjvtouwvgln7z2osn1yerqjgkv',
                flowInterfaceName: 'tj8udntzilmd3p55f4xvly69ouolr8my7fa9thqgolnhvo88e5slt5nlq8bxuch5ozu1eu62prpunn5cfsiud30iu5wyy6mlj4429ckahn2olsd07wt3arknvq7kh3w5o9jm960bk1vqd8x2g5sqxr9xqi34n9ff',
                flowInterfaceNamespace: 'fqfp4tc59kf2bjg84su2h24xysyshh70zkc1xbdq0wxqd3ztxx470syz19in6frxgni4inpz26ydskevqspe2qrmrzgwa9oa5jjb69kwjm5sbc1p1abf27exo5bub634fmfemekd61fxgsep72omv4phn43o122j',
                adapterType: 'cus0rjln4f8i1jca27wxurkycd7ckc4opl0u25a2vlqv6h4dsaq19fhfsy3j',
                direction: 'RECEIVER',
                transportProtocol: 'p83bj4y2jijbu7dnyyxe0uf2bxb3icvuc7v1k1m98dy3usjls0k0eea088ji',
                messageProtocol: 'rpj9zul4qla3h653ru32pdwj9i5xtfvbnpv5tf0kaucz3ivx82vvt23u4p2h',
                adapterEngineName: '8jpyygdxjgshsag5n71m0kg9xbj2ieio28q9drcatneq3sl3z5fjco37x8ia60l2zzzpvtgmu5hsfzhk4rjnfamw0u8enk39ak1hiwfleorb0o9lqfm7wnqkl70l6pphwqvgficdmnfjvs9869oaxdw5stwhlbek',
                url: 'avz1r2mz67d99mnfv95pm4y4c8ex0vhd9orhf0tzcr4jnlls6ipfv4feadjdrfngvf7d7ry4ta2lyj8e6083bi0wbw35iy3qlal91xxmzm4wjbl5g3f9vjkt04i5x1dc15360hgnfzzolhn8j8wk4al97urtbnrq1p1nbiw102p13d61d1fqq5wplihabwe1oskrux3wr9ufseskbu80b5dpyt5l6bofv96y7tdjfmniilx4qurz2rsw0q44t15fjdlq4szmpvxfyyiet95xnftk2r3rna5lugx308yvzwsqejpjt9yifpm0f5s3iz0g',
                username: '1n8ngaa8hbomy4f1vbmrtnk5akipmvoola95s8wiserf3ojnmtpqs8y00nhsl',
                remoteHost: '49o6g5vq0lnwpumsjvad0xn09rvih21v54r387b0bge5wfup8l5mcq077v8yzezl0f34hlvx7fyjkp0146rjhr340nrs7o9hhu8cl0wiqg717yhjv1130w98p0186wegid407uuskxtu7ezqgrj5yotxhvxpbqrp',
                remotePort: 4039657830,
                directory: 'k80iag0syqsxm79wsxsa72sqw4j2i69o8hu0ubwifdlvrgttvu042s3qw7vzwjwiv2racyrth87ybu6n9laa3skfvfrfosflr2565bvq820175lzxt9lrncgc3hnslqect0bidhx1vierqkha2gm1j6nc78qxw1ohqd013lwjqhi7ia5qna0iu73bz5vetjcotoe0hiklgfqk4q5x8653v3088vjbz592l9e9er1ud13ajdnw3wz0wtqlr95seykycjuifaetglodzndzut6hgj8818haaxo8ukuwilm6eol7tz4yil1adh4l8csb9942u3qe8i4vm5675utaa7o4qjgwrevcpz5hhub2pwtntmj9ejqg59ajoyvbqf8khsqbicoyms18wuk3pt5pgfla16v35g9807vo2198voh039t5p3fgn8s9wjdqmuwijh68l30rcvdcrhw9iud0ogoqbchz7sxx7ffdxq13hlh7y9yya1bgncidgy2xhoqlsvqsf7e56451wzheterjnqcbycty4ckp8rj8vfupacbxwb25j7qjlupnyh9c99qs887bhax1ddspnq7735tq1eqqlqxg4h9gatxuqovupevf35lw6ga9crezloj20rz0eh7fyozfsow5svj6ocqa69hjyvhiujzep8740d4banbms7h4rohwl9sy07ak9pwofwl5x566e78mgel5bwmqoayqm7znt3dmqy7fjfubwkb5iknduxybkrkfw7xj4pvyfwx8uhr0pvfddqicyidivl9dlvwc7iufw05gutqs96jvnagzgkmx9ah6c61zx3wzokjwc0v9nwgw15fdoxzd0prta3pbznoqvz391mn1hhsk8q5r5bugh0ymus29lqbqkf631w3ahgiad0ku974e1igd97yvnpa10nv3okvxb86g5snaxiijpzqmxjnuolwze8wekn3mu3eox5auuwg34sycpfs0bmy9sxirlzwvmirg64imwt319nk6a3fwk0lc40n',
                fileSchema: 'duf315yhos1jw5k97um5am5xsgls7f9gwtyxttdyfh332o8opqpx6stut65stvdjq5hziu90ftpkq24ufu7b4056hwtf0w9f5tpa5aqu48ginrlcac0d59ze3c49enuwnyl787trjqsi3h9w1elbugpw8lsn8z6zqj9o06ojryki5wf88ymx1rwwo3t7pyrx3er0y8yey3vydcb82dr62kl9za7vh60cbcqpz332igy7mymupr8ojb4bi6sa5z1xdad03w230wdld2e90r4mnhdfs3g7on0kpn8nv1zn4omldqnh27x0kq2t0rj329ujhvvnzfgc5sw2b3314c18be82d1hp9gyjr01esbpo7fwd7botbowsqp8rjbisum96481zx7gy6c2sl8zq3zgi1olke4pds0ejx3hq979xk311isk5yi8glo95tgq11sg7th2ywsf0o0mzoynw8qhov8ieq32jwkgeqc15jyh8nrej8qv43869d72jfbhc3cttvagfen4octiqgtyuhigv1cbck4kkrnk9fs3te93moir6l9hjx6s820duur0o74n0d91nnligpxfqq47vjto4cow6vplxbt95y38cu3wi0w20584fur703tf5m590ufq2z78jry5le8of93loegyqxljxar4l79wp2epkxhcis5cwak4wqaxy2joyw53acdbr7k0roit1kucdf9oopj9s8q8f9mf65k0hrnd94qyprtvav28r510icqafshtoxzjfi4mr6k6xfahpds6zogmdbgjo8tb5xgxp272dmoa3qnbc8muywamqs0u4keb7x3le9qjz7g5srzm9m3gt8rizqoob847lroo424dez9kkjzhj6fk03okjsg2th11f9dx1neal4yn9d4sgfxremz3b9sgdcxqpceb3qsp15mu6geaia3lpsu8bkqs4luxaff5jw6cwm22i13oeb24gls4hre328cjidl5ecr9eabsxir5w0ph4jrr0hzvk8jo0rl6m',
                proxyHost: '78qlmmh4obcw17hulihm0w30oxll3p0sd4ckk40b71jbezo8h2nyybnvou1b',
                proxyPort: 3401639816,
                destination: 'su0on0hbas7dy31c2am6xz8rt6e23isuujgwb05bk7jodcpkresewgsqe0077p1gt0heufvc32tm5e4rrfrjmf6u0u8ksmmhqx3qljya8n3dy4ubv2rgsrprig6wwgk9qfktm0idyyc87y2xqquju0smu4b4a7ja',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'g3bn2eslsa9gk186fihd3nauwr5nl0x06g6tgizootcshaa4fnmx3jcv3xmgnh54h9py2hhijam1o6q1yw87sj0tsu9qqo4w8ove6t1e9on6msab0l80fkufrks8g8vh3k1f25k2eu8z6nt7ec7oj58cx25reanv',
                responsibleUserAccountName: 'xhudb24z97ohewrl9rwu',
                lastChangeUserAccount: 'dfx6mp19gjeusnqkzihg',
                lastChangedAt: '2020-07-23 09:52:43',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'y48dx0j5a5rl7uy8k4q06fcwh8mqvekg0g53im06obaki1mp3u',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'vumc5jywhvp07tfrgtzud0bwlhqxepsagmmtxmjyalj8wps07w3zc6h5na74684ju2q84hluy1re8gbb93b2eifho14nw9ce2jeczpcjnktghvmt0xz8tgw78ovdlh12kyvjipoboiwjso3nfg8n6u1x20z74iwx',
                component: '570mut1rjs1r09jsk4rbsbrv38gd21oi2c6j62mra7qzn79xlmql693sg590hx898i2wy3mhduwcpnihrehnh5mc5bjc34q7v18azfy78suizs3d7d9u9omn6y2dqzudtx7q74e27qjum33lazgijgau7yldg2bb',
                name: '8ookvvgp7t1kmdoj997k4xw7e4b62coq98u97u7hrzg8wh54cghb04yo0m3pp8nzad7q8td7yw2rbcshsm5wwilib73bix6bbsa87plab01t3ezavdoaxltkb7d6rq4vxynlizhixogaczgz5esybnqa6sr7e09t',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'utvc3tvqy6pkvsc33t72i9uvlikz78gjv0okd8o142p8er4inqh82qqjql57hue8j80zialm63ue413pa978vl1zysm2eshf2c48hncl2vctz8matpj0fela40pvqsb4a370mztzk114qw502qsgxfzbxbmv21ly',
                flowComponent: '8ahql61ozxp01n3apx9pi2zwojqmm68mr1s2n5wb6fuow5al76co1mh3b5oat25r0qxsoec7dd484bexthl8etsqp7awpns30gho6w2rws0pehv1dzy7hejqc6ad9qr2fu5xcvgv2hlu3bfhodyt8w539gaf8jec',
                flowInterfaceName: 'hxol7ox7z1hlk3m7k3sgwf4qujcmo2ekfs1hrhu4cnpw294gor5qj5dwlfve5jkv8rwvqidhme2fm2arvldqo3zxip3kx1exzhize7h4v9f4cfmmolt7n9s0snjb2xp9v3biykj9uvmmnchoq4u3zjjvwayalaug',
                flowInterfaceNamespace: '2lgez404w3whhgmqiv2o1qje7iwkuk3zh8jbfsnoavumm8xcs1kdnx481o73dsypq4ilqbnsbkuawr6q403es0d26tw2ss0dmrtullazqgyps3qqsvd1xevmj5cnqm6yh2ju8whilll813hyaw7vozww378bz5u4',
                adapterType: 'ov9nawvcvqqpjul8czfe59m1ln0p96h46llho1f333w6x0t662zm78o4lgj0',
                direction: 'SENDER',
                transportProtocol: '3mdrpx3hf4i9b11k6flnt92mik4z735ydaqzgi612jppv79o57rq9zr1t9si',
                messageProtocol: 'q2yl491w4a3t3h8sol4ymt2jv5nc9iei0tmbzjwfq77aazm33da2lhqvgpiu',
                adapterEngineName: 'p8r3h59s1z0eejhdcwumo4h1woyl7f4xg8nxuhjl3iql5h2nigohpf7scxt6puwpvl4ng09ph6eoirrlevweehmi8u1q9kraz8e50ava7q8vu7ref97cpudq4tpi42kizcjjmx6c6awtyw1tght43osfdm78awqm',
                url: 'nhu3uiwmrg3phpfvfhrvqxd1icj258w37rhjr1wdw96av8d814wo53nukopj13ajajp7o2hr43hflcygm3yjmmyctp3lanij8891083x7swoh5qe7jo7nt083sfh9eqjolazng54b6flnohd2ndeatts05jl630c8xu49gfksgtjymuzb8lrdibkp747nh2xe4v5mv2zp08bccfpej7jd62mkfsd9znrgapemhtt1ftwn94jaqtsf4xt4uwsg6gartzau92d31nmkud4dcxevn98mrcxepl8iksoo9exv83nkrykrap4y1wuiqxh3ldo',
                username: '3ukesr7ob0e1enu617j1wet2n7fgr977vynl6fv8zjy8xq781ssn8gezgl01',
                remoteHost: 'r8x7dxg80lyevx2e4yyiyhqv6zqlbeofw25wjtnx1o6k8tzv1shptjebxrk5wf39w0rmqxkv3ydfe4vwtxhmh3c75e7y9vw3rv7i9cdvy6h4y86eh5bmq1p1qb1wltw7bz170t8j8mm5tx9eg54ers7708fprf95z',
                remotePort: 7183673299,
                directory: '24mk4rhb9wtxqyvpzqbou8lzm1nf24oawpe70eookfxu6xra71i0qpe265onjraf5ft1e545vc2o0oduoux5x8t99nhbredr3jwnvj3p7crxiita81hg377af6u73diqoiaumshacu0bb2dr8ya1gx1vpf65sh8m9iuzd73rqn5ywha11sekoi7utuxpk7wk6b18623rp7354hyonp39gtjnmlx3mnqqi0gbqeyeg9io1wkp8svcxvt3femrco3qqxayy12nb9k96384tma7kigsj5fk5vfu5ezr5jblad7ni8b7a8kwkc5z6sy7gm36nxqn4iz0vm1rz5r7j2xtm8n8elx842u6kxvip5mbbcpu6nucx8f8rumroktkpkinnylap4pbpjeg7pt9s3e8es6k61eowewad4bt80gnjbv1doyass1iowuw1jdp4eyxtf2sbfai042hwewcbn0ojpbqp50gdacc7ewrbp2l735vrv3wf469rc55e9dt3y9wzstexa02d891mtj0as8yhtbf45tljf1j0rs35o57ft4iccnlefvq8aw3nubj4t5xfznsjmgcczvfirt3o548czfg84oglt89mfppsp24jkho3fiohepo6g00n6ylkdk0bf6a0r7b0sqhbgujro04iaa2sksobksud7c9cq0hake2taih0n2cieej228d7tnwhm6qvqqhpn0fyaxrsk5ri1ie7p1tjnhi57hy6ruxyndnvep1ozjnb41kxmvret94h36z7ciwvs9b81ex4sioq9bp9r7o7j6xnex6yurzn6ahqqlcd4xwzehiu4e1bkmtl8k3uu4dygv8439jafnp7z5yhrd3ifikpjuy3ji0wuh6hovjkgy8qr3iy1n7g8nytv0it51mi9o3ktupghjq66uyhe9ajjqschkj7ubahfmp5rn09zg3b4ya6piqwhtc11h0g7nl6lbpnwp1q0nkewwioy8mz0z9nfuln67lpsmxr09zbyaa1i8aj9tdjmfr',
                fileSchema: 'ioowkpdieh1d0inr7h4tsuak725tyo6d1xt60swkk8zpq5556lxne598su8c3rna8rcbzczfzmrnfn47k3t62fb4y9rrwguehft6m6k2u9i4kcw37q01pglon1g5m21cxv07ocfxuhmhlgkc7o0f956folgylo5j94vlkg9ajmyx7bv71skrxmkn3v63pbp79vosmieg100c569zj9sx59x57h5usjz5phxl8opfujm6mibzsygvrp5ix9rewgmj6zc0f366pnfjg2zkzp5v16mkg9tdzmmmwsvn8tstds64ad88q4pp85f61dvwz8hdlbd2pwcs0nnvtdbqz1rihatm7a2yikyc76kauuqnysze71h0gvg0vxgbu8e56zre81ij088zi0polmx8kxzu7qaam3euh7ww2r8uka3rxittod380vxxbezfg6rfkq1vl2z4tckhg8saw5yb1fp2j424nnlo9a730kfrt6luv2d6uqbkhnbkv2wxs263o58sfbn8chmebhf1w547jmk6wsn2ip7fggxsexjfwnjpg3q8jkhe1st5qee5hopqgplbhgrmsx5fx369fl7dil1hvhi17odnwzaafzpvmtr1qng6t16qh14fxv68uk4iyrphlppyn11ojelqblhovgvo11emfu3z9mdqdl34ka62zbp27qdge3r3iburall1f2smbef3ss3zc4gg4n1rqbfhtjk4kgacty2fpvgc5jt5edl6n17qgtpx0yada2f1zam3blwz2prtl72ybt6tbksg8fecz1k7zjtyoey2jtrlbswjlz4b7rp8bt04pv7zocculgoio3jkavky4x6t5o31e3r79zgwjs2mnen6phrgqt50zqr4i8miokbtqzpx5fgylnsdtewn4fqpwp04lctmdve49kk85vns68s93cp9mv5xs805wdostteyzu1uwvboz4q0ak1dx677d84g127bfva7siqn53ei47irv5bfhcxw6jw19lypjwq6v6dfblo3',
                proxyHost: 'yis0wz7k79r3gdv7f2jye63apgt8bh78zks5j5fecafdet8wyhmagkehgpt1',
                proxyPort: 5266730673,
                destination: '11sbrkd6geowfahzkfqlyo85v1733ggz22rh16ohm1ax7uq376vnt8srfsxazuixu0gmtchmq5eiskwsx6j948oom33n6l6nls50o6911f7h3r1hvxmhdehiujdy3uo0bsbfi4b8tyfzasx88cb34p4t9ymxfahf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bcyo84gxcxj9c4ceuztsdd9d0rb3b1sngjmtm6u2p7si3c9zixi2flw19ryihrf0bblfhmg7ydl3l7witd2crv0feppnkyi1byxtu2661izse1j2njm4pvif0ih0yha6d3x8ljozep9o1sv49bafe38lahq56po8',
                responsibleUserAccountName: '6kucpov7d4xfcrhcry4c',
                lastChangeUserAccount: 'js411xyvxdglez7kphvq',
                lastChangedAt: '2020-07-23 07:17:52',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'uoagjhv1y6ss7bkgsshgatqnr9mfhjgnplfb2tl7vgtob7oijt',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'bcwq5bjzx22z4nd36sw24w4e6mf0gn9qs7cz3q75n8d30h8ex0fnxpojjxblwf9yxpk85rytdc5kl9ngrq72aotzkf5oxvsdt3dwbzjg1u8xltj4gicwzkfh95e3y1kpvfwjycwywpdjymb4avm48t3falqqzpxo',
                component: 'rz489mcauhrpqfp4kuhlczdgp2nl761frhlcxnjshkkf6s857b12hr8wfutx52elbb5sl9go9rbpj72o7qzuxnkhfifsl1yufi5b2m5i1kn7behoj4m74n7rbb3gpdmecfp1uc90ho73b0bdclne9zp9viq1v5jw',
                name: 'emjfs7l2t9p1gj89z3vtwfbw5nmm4t1xy091dp2fu3n9rzf61j460gzy6f8iague6910pd3xrgv8vszmwbkpxn5zdpwsvsu5383xlxzncbwaj7dkjwmfqkvln9e7a0isxau596zvxpq908t7a40tl2qafjtvs6yx',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'gcbchnpzzq0knpnt32v24ia7kbc7ljhk2nlosbh2g1rkbxr06apj4dnp7gz80stu5f10cc3b3bbve2gzigdga7x3avn1877l2g7m2sbkprtapd53pfugix6n9jyi4pccraw2pjul18su3yn8z897umr73mm374ys',
                flowComponent: '6ee2ktxj6fh8gaglyts52fx8jfsx59fc2bkyp6x3ykapqus47bfmje1x6s377azi039anrhmgkdrdl7qhss78ui33nqml1gb6rlhlnn3y6u66bhsrq3g8bvr73j3oqvvpzey5b3wl8xor9ija2dt9imp4ng2kaa2',
                flowInterfaceName: '9jvn45j99pub6z30bg9dwnuzekjuxy8gso4c1dfb8kqchkb0243pbhq2yaulk53nd4nt3p2wmxhi5g9h6skhygpy22muecfykhr1p8yepod75ycqd2n8kf74kbaqt3ot4a4o6fqnjrf2nwras676ll7bi6e6gfwa',
                flowInterfaceNamespace: 'jnfrd99vjpjqz7eyxuq1gx308d6zho4tyqny0ocmoow1e0wnymaxm4rvdzuim8xdnxo9g5uiydpm523x9t2za7qsyv1btk1vu91tzje38znn53ag22mp24ca129rh4wmkkrsd2zncr0sdgtzdnmjtty1niiim4dl',
                adapterType: 'ssdxze1bni3xnfjjydltq88v88l9vj05s7gr5k9j30y38grcu05xziw6c8l7',
                direction: 'RECEIVER',
                transportProtocol: 'vjggzao2gyc9mqe3ubrjlt2nbgyyzj9j9l5ho3ms09jbka22nyqlorlwri82',
                messageProtocol: '5x0ehfhv2ahflwlpgndsbuypbcg7rnfs8qko1oh1i43uei6a74l6xn1jewav',
                adapterEngineName: 'b6p3ygaef1yt29wcl4k155qlhiyakcoj3bwg32i2mf0xe49oxv4j4eaq3mxhhnoyoihs6qc5i6pvemjf6z9lzyw5rs5lr1h99s75b8uyo648xmpj0sbn04o3udxeb57zebdmdva0tzc9kxk18hib6iviayni493y',
                url: '1a36irsrr0hzxvre3fr8gxipprtv6jo66o7lucjwm0p2spdi0xuwfusrq6ja2zmkzku5fuhnxo65n5dj89lo64j2di10kd6sj2xqpljnhpgmferte5vz9t093ejy3qbixjg6xjpp37qcedlgxjud18hkc8knl8lhtre2t8cet4w6pdjnn3cwf5kwupr2ln9bywbwqhhqp70tugt42z5r4bzedxms9d0ar9uci5y1oscn9ebb4ig51sjgcedquh4w7vbhlpa31tq828f3u9rjl6w2xreuuo3l3bkkxbgd6rcjfdvzre7sftt2av6les62',
                username: '7abjnanv1ia1k81rkjws31s1s2fo68i8cxpcmc0m29i813329a85ukyrn420',
                remoteHost: '5ddh10xuikfpwglblv3uxugevul0jy6c1h0xwx4iohbc7rz4clk851cdkw69b2jjdp24oq5fxm4799juvlt4mu46xekrrcmc9ybhtap1mjeh80eawtrzfawnlzbel9v8lse2ptsthgnefndvmjys237jons7pzdt',
                remotePort: 44951245159,
                directory: 'h65xryg7a2iz2nzdwf36uisofv7am0hoj42jhvs8rm80ohd0ei58hbjcx7pgn8pe3x3wphe7x1m8fh18k3fi4fksdq0o4pbsamlylng3jozra2jgd9dyeyja23u4nl6az67czdflj7d3gz3ropbiw84eko9nf0v3ook6n0pnwez6hsyoiz2ak7cn2eg7jiwj282qvjhnylqfsk7n7ryqglva6sh9orykn0v1fwurulsua7iog0euelp32s405bfhtj5q2c5qs8mhgts1mqxzfmbn6fdn3jujxuzi2hgrwava3xs9nlkgpvwj9sjtnf1f25kj2yzc7z79on43htjlgwiw743k05010koamw6nc63qqatnpfxoc1hofzqqf0opea4v456n70s0znswdwirfkms5f8as54td7vg45ombfwesj9oq2mjwxfa7gk5ycb6e9549e5z7bdrhvdbxgm28l79hmpqxsdrm6yb7lrjcawce4957fsgz6ygradwxapteh5ciwdd4yr9j31r6eimzf4es4cjohqeqgckatojl3rp7g7usixutekqjbsd83n4osw04qpqo514dmeeaafjujk15ustyrtwm9ocjc9xzc68f4acozptkved9oblo2mqathzpbvjb80v4jts2k0nv9dbpd67ec8z4aoc1ywjcpitkx0865va4hg67wer5x08qhxxi60lzn529w9rwtxmjsd2haru4kcmn8teteaz6h00c4zqb5ej26xioege9fy36y0n6hxryrjlj66m8ll5fp3pnyu6wfg85lr9hy6xpz2iyak3c5rfjhyhjumvs6158so53asn7ovhh0zc5l0kratvqpvtxcwdcru0uvv934vyn14oekcz3f0vq2ue4l0tukora6768fezlpo56c5umv4ljuchy6m5k0mrt9g491w8fex4hx4r85xem9hp4l3d2bd2dkbl1bhnjyqg1fq96yy23jgiepzdyggw2kti02vx9mkyjwv74g0e34hw95j6',
                fileSchema: 'i01ev9pwrsesk1pbsdxi1t32wnxetor7fke877bkiupbzh6zj7zhp9vjjpmdf1mgbdqkwk8gas4wyt7ymtqvg83b41vo97wq0w9ugz4l15lzrw4aoe593z5oeztwl8ag1l6wyv14avwuzb7v3ofw8n80kmq0xw4qmqvmu2aikme5p877qfj6os28le7nta09d8ab7vt7u7c8tquxqgis0yk7rhmrbqztweiejg5puajteqb17np4bc9x5ka5605o978nq14w854hiiabf9ziigdszb1k5j0f2w3h6wvuynkl5zpo1e2xajgzk2i6z6ica69fe80jeiigpl94ki7922kxhj67ip7z3nrls4qj03wqu8ffzs05uecbmxa9b7pp6zu846vmmavl5ds5t4z8twrmvtd4rcyr2woq7x9o4t3qy05a31x4a6ax1xyhwhey0t1zew9g41oth28vl5v33wjrsmyq5h0w06clyn817km4affnnts2i2hiviifudaq8t02mutg3mvu22m15iz78lf35mjkt6lr5xx95r2q9zzpsz9ewp55hepcq03lbqgk95pl60vitqa5swqxfzg1fwj44527mmuthotbimlhnlqxptyqz0vevzy9qdjonlcf5gpndsi13aj8wo34yf3aotj6d9giohov4tz3pn5066fxnyw058mbi3lp9zxhv7t6syqe7w9wd513fpit58wsmr26zaxcwn74kun292b2e1daw6sipzsjbkbapkax1gxeex4ew7vqffwesz8848pn4pghhezalqqtplhtvm6ydicdevglj3x18to7teba0tu0eblotltekw35t9upzok44wjy0c2r70ojdg5c7cyzrc8iusbpz7i6lgink6ggo6jsrc1mr3cxjj74tss4nxglynq1g2p18xkzwpuga58l6y01vsxe6ej590838nwhrwilttvka0q2x19aa635s2jyds2ay0mhig2deaf6u4bug8d4v97rrnc7nsshh4mk5wga',
                proxyHost: '6h35zw69u90um790954nm4dljglb6lyhx4m6dmeo5lr5el5lu9s11cd6t80j',
                proxyPort: 6677768124,
                destination: 'okc4ds1uwmg1fcptc3gf6pqr1mvnw3zklo54fi2azd3yc5midzzq9v465fw2qkf56m2x7jdj4m9wonnyz6u34n9yezpwaaae5h9jcxlaxrgqcvyi4eqmr71e1fqv70hkyrf25csfgqda1xtufj0h0panxkeqmo70',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'j4arfc4pdm5s43mp9lndujbs2stq6nebbhne04t9qbti5i3aqc83qguhz1hononogubgcifxpk09l1ktijc1n0u76k8k1twabvo03v39w18mnhb9xjo08qzvm19kcp97tkbja1ir6qzobu9i178aj6alfacw4ln9',
                responsibleUserAccountName: 'ypllyf46ju3tcvq2n3od',
                lastChangeUserAccount: 'i9hfm1er5ettotpp7shg',
                lastChangedAt: '2020-07-23 05:43:02',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '49q1valaman5xw29ht26k5evvsgztgodwgegxagey2qvkh1kk1',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'umpt8ixevopu4tmon1igb8wvq7p7h69gfv90uajof0p33w0t181go71cbtgsph0x7ux5wbawcciyubac5depyxbvlgkbnki0m5igic5vzem6qxsxrzigdpn00nr05pv8eiibkjrealcfgr5uh7i4u9abkvscmldy',
                component: '7hn8f65bxh9dk5vzrssghjlji105c77xz6wd8rdrceux6f0dtc6rzbwpre8ermslzawryjh77fevagq768x73iivrxped63sf4v3o8iostlpgxi71e4s1fg8g0vyb6qamk0smirulgmmbrnv24qqtf8z3b3rlryf',
                name: 'w77xy3nq576gfsjtqw4y083u99o0qs3w8bzw5p2uujkmk1uxc4xvvoo7jh8iox7z66nj2ejm72rn5ec2ftna6mc1673elhiu0wqgitx4fgnlthoflbz0ol8i2ta2xrlv3mrhxtjxgnwl5nbdp2tqpwz2lwnuq59z',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'iupo7zc5gew7ppc561r49k018vtriqo9fwqwfilleuafo2whhcu7xt0o5qmxr95rv7sotwbb4w92akvh3ve2r4oq6zd6gzdqgvy83yo52vqlvsz81zpyvxdz1jjajo07v0toiagqcok47xv6wwez4gi1gnfybptb',
                flowComponent: 'd5gbfwncuf676h258mmsll669f8n3fp0pki8ak4xq98gkhbusawbwyu2yufgkg28bzehwtitmdleizxs5vgzrt9bl8mol6r9lon5mw3z61ju011hbhva3ogmgv4xn7ctl1nkje6tsk0c3uulmk7pzsp18h6vst98',
                flowInterfaceName: '8y8wtg83kniqy81czov76k6e2l04wf6byyca8pasb2rkjvb1rb1goafkrdsa6y4ifna1ak73u8evonhdx21wvssgdw06acd1ek66x8scdyto1jehjp2prqvfx5c0kij662og4251gtgb98vqvire3wzrc75jg9xl',
                flowInterfaceNamespace: '3vx50uoyaz8bdrwbc174l1qzchve7ed1el1bs8caxgcfv18prkeh5g4778gz0toxmi2fde192325mfnc32w7bqy6wmrzh4iovki9cen0pcvthi70o4wvefd9mrl39g900ff5w0c4prt2gypj9jy0rtwgnoac9osh',
                adapterType: 'z2nnku7yc2m383aqrt8gguw5scky0z7q7dmp125cyndjfa8dmicsoeb794ck',
                direction: 'RECEIVER',
                transportProtocol: 'x80ygdg4y1a7gf7t58h08bmavcxl497xh0rpq427yr03nhy1ymvb0qvns6u4',
                messageProtocol: '2sza3rx6aqwnvqaorgi5tepiwxwtnios1qsazns5qd9qx5rna2eqpf9k216k',
                adapterEngineName: 'e5exgt8mmc4sf2bcx1gfsat07xjn2r1cyods5xn8nt6q6e1z2r7ghd5rcwq7vobldorn90dvmw7uixxnx9ts7zwnwntkxiintu4mkh35t7taso1ycnvvyxn7vlbz61lvpnsr2gfykiuhk84hi1f9ogumwnrcap9u',
                url: 'nae9b395tk8q7xmxm2dam69qapavsdp6zhb1v717qiqmr8dtykljf0u24of36g5l8c2hw2ty09x14aszaiea520jvwxgmgbjww4c0txsfwl88nds0sw4vjpfbqqo56fjfa0zj9kg5o4cmoelfhtpw30q49fe1ats9tfvmmii2vntv6o6zhgup7rfc9ghfcwu6667fobm4ev05fhr8qza1pea5hhbtwjggkb05nlbmy4vhnfec0ia6bmydrd113fu7674jgvzndq1aqwhmbf0penl2jr8k9j5gzz56kumg0p8mp6g5ghpn9brszlnlpbh',
                username: 'glqc7e1mkvbbqiiy3yrc20ezt5yulj40iiwoauel2yfwipoitahzldezz29n',
                remoteHost: 'p3cx7kaugtw9r7gq8f94ryeu5380lc5m8fxsdix065jphs29qw0et17lgp2bkvpeb00jg40lnohx3ishr48lpbkc2kdin14w76jf83x5vsfe7pe1pzbwxk66ms5ozyjjripkb9xbdeu1uqldsn8lw1s7qlfrdglo',
                remotePort: 2585699275,
                directory: 'bpy7hv5cr1pyvhgifp243skdyvg0oywvblrlsgxed7lfz0z42r9a772i7aycjrzpyf36b1zubl7nyprqmf49nqabv2wvblgc4i44b3okcumeg3aksok2pzlemmwdbm8evv88tihuisbarxwxyy6fi7f5e8p9tch88p3g2cwxdj8eg6hnyvngotybuguhb86oo8nbudpytuqjxthmfworgp26wao20n5evy7agaew7h2hipy9zyge1ogd5hw4bnn0qco145ahjpsq7ytu2crbo3k58d0p1r0e56t381kic6fyntw215huwqjvu4uwdk8g7bv6lkz6ijiv9idox1we5k73opi5p0iep6qx4uj1wnabc14z546gnv5xtm0d3rrjc8g3fy8yh60pyde2p1dlknqjc2qpp5p367q4lnfkd8sy2lsf891ah2fakdwa7iuigf6ljp1xlnjza7a015k7t68ye7gkfv1dski26jh5e8103eti0b46q9gednfh98hfmxxnczkv2t67ljb3oj026luc6w3uh6m66nr5d66u7n33navtq6dv8zwtg4f3bbnzboqptt71y97t3oxy1jhx8p56bh45qxiinkavkf32va7jembh33i3q2ohtcmn6h0xea3f8bfs982bbjeyeesl4ivtuebsoytp8j3bkkr4uvs7j64cvehh9hn640jr7r1cnfrgthf06dv71xaoyx4gdkswrnhqdxojd3sv4rk8g0hbozxrjk4y6mvj7vmdroqeruw4mc0je12an7x5foeqbgflflwaxgm5n4gy1qlzqqpvl4na4k1aute3nyxmuulfmoajrngtv360x77tcgvzoalnyce8jp4o8dbyorbxj6493qms8dqjf0kddqkx5s8nw31pef94i03xc1rowhnw74lupew9i1smzu9g05i71hndeglc4lo0nm7s866zzrvit24z64c1yf568oelc9ur51gikrpfgosafo4n5d66wv1mm291wb5f5hskrsu6u12yc',
                fileSchema: 'fy8lrl43u05ynw971bn162o3i9kmk77kqtoghy9r7uwh06l9eopou4nl4iyb8nakl51760twv556o651np40u7rwgjyjhpkpl1tx4d3lsz4qed0c23pph1ypngm6nxtkpcgdiz1y2kdknrvwf77fkdascubvzlxkx6fvqhrsgt4q4ai2iprqyu5um4ofkhpa2x88mxpp63t1nqlhveltvjeasxgdd38gj07j30dg6s91wzjnhwmfurzzfu74guc66gpmj4vc37s4vhn6hmpy9jkoh0e50laamp8i5ww1oyx34ka4zd8pnwx98uhr4bxzphos1skhytuukccjlp6wz6vaq0aer16kmkkuzt31mew0c7rw026idg6cwghj86fvfopq1uzz7o1vkggn0aw6ez1gghgjt3blm67a5gtjbgfnc8978wi68sl6544gru8l0eg2ca8l4kwry3msu58xmoabh1puhbtb4kit42hkziz95d7vsl9xuu61kf3cxuvm7o22b4geu9g6ca1l1zsr1ywr2a6kz9g8ll47q0z5uariqiwcakhf5vo5qns88d6749pgk33b7693q8blvbz31xarq2ss1m4eibuqk3vwk5o7xrrak07wn7p1rj7zyat0lzlapszd3qu2cr3jad7tpygczrwywpzcvfuekmkucdc6eh1fp7vlrocr7l5orq3quc6veprb6kl21yuyr9jimluwax1dnt0pwdx2qbu2y3awsbb4a091x1rlwuyjxbu818z0ht3qxyt4x85247xgmr2g8hi2y00pmklwxa01g3y7qljygiwslosnxb02i9ih0vnauakpydbc9pz3ns1quuwa1uyy5nilo26o13wtmeb75jc7vmhs6xuxe7js7za5xofuyg71anwolv1sku7zra4bjiuu24q0fxnn0bj9thilysrlwi6mr4ukrr19izm1f1ltvcp1r2qmrn4vlaiejjzum56wi9c1hwcv5s0s8o0uln6pek48vhv7kp4eujyk',
                proxyHost: 'd1go8pibpmn8of0noa6nhfda17uvx48h6rews5t98jsgz282k6mewvl5zirf',
                proxyPort: 5526092074,
                destination: 'd6rh8kpqjj4uvirq164d7d201ef5tlot9muqrc26eox71r25cv5wydqnzczbr7uq8pcz8m3y6nuddmjdcho9bds2i2p9bsnu37q7ce290ookk0pck81v8dupqxck91zokwdboe6mbpjjmo5au0txehk92y6uuew4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ble42vwc5tl9w5nwcktadbmcbi4niz1bi4co41p887cenyyadj3s295dtirey2j1qeenvaaxmbafp51laen9cc1fqavhha8cl4fhcacncs3hhq6fk6h83qomrcq2c93baja553ajebotjy8hh7j7d8bcq9zalrla',
                responsibleUserAccountName: '58f5eue46q1hmi4i942h',
                lastChangeUserAccount: 'kmhjx6kkfp1ydts98cn0',
                lastChangedAt: '2020-07-23 01:30:49',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'jdvhpij63smo84gbypgq9ecoj7xi63v0du4atjj9pid6z69gw8',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 's0lwfdv942gvh9txbufyrm1knt904obmj46w58i86yhyobd0lnps83xb9ky30c1ehvj82o4caz9uyd2fvi854tgvd81urkfqqeuyuv9tr3pafgs74yezxhdjo950tmf9nnpkifdi1bkiinmb5ef0ehutzsqfyvzm',
                component: 'isklrwr3b29rshkqkpg4a81suhi9cx8xhnpfrcodzsl1gaeqcah19570egrhflek6diftv1p14igyjzr5xxkfp1xd4jupw6qn67ch5so7ia5g6ngdp9v4i4udolv4zrvaju1qmhgyuf7l65kweezbs28i3agplmm',
                name: 'qqvsyxj9fm413wss2lt505rjn1s1jg0rmmud18pucirughf2k7n7stslnso4hea89bllz4abiqvt8memfyzflcxr60waff7g7tsyxf5rlhwehert3v21zcyql4bth07z29fe72d6ueh9pzzgmg19gyjik1xe3edt',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'hh07t3dc24s8it110c2kqc169v5x8xypgpx4oakmylxteammu9k1dme171u1nrr2h6bh4v6u4fglf26960qruenudhwwab15kyvs7xpiypisjavgdzaixpnt3aer5dt7214ds6xzq9zb5eau915847o5rkuwi9pq',
                flowComponent: 'z9sry0440mat3fzfy8j8ihknzw5lkj6n50pyxqt1uqqmj1rxtl56ojh8ckhmt623ytodmmh8muidwlqmwwfnkfh3qk8ys3teavkumjsnhn9n3oy35zg9p8xelp1s40ngkp4coclg22rmih15tfrfx8ar9ljm3eb5',
                flowInterfaceName: 'tj878v20tqjuxoewxexlvv3xw2e35bofdql034gt47dojdgasjt3g1d5d9591lwp0amv2hznxif2wg7f0f7q04s0rsu17r42xxfzg4cve55ugtbwy7gcbu2pf8vr5ocvkv8ovu50rhnsm0x200bbd611grcve6ny',
                flowInterfaceNamespace: 'f1scylk0hwt1vt3v03h374uyfw1i4kssqnvodgciya2gpxphzmyuytd6j28k2lqjkaoptbnz3czyaavkir8kwcokhsd9iy25pf5owav68pw5bfaokyzazn5z5a0l2h3g1lnypu7ob98vmxlsqjapgen63eqvot9i',
                adapterType: 'y30hzcgshqy3fw7n6vgvw93r7g2lt5rz23vrr4e5k3znhzgnb1y00a1gmhe4',
                direction: 'SENDER',
                transportProtocol: 'hm4v63joajxuvfiidxi7allue8lxdmu44ps3hh9hypks92ltphmrzyrtzv8e',
                messageProtocol: '3ymxqxm4lfkc75z5r35ersbnjysa0i6am1ymwr2t126olf2y87l5vv1iplee',
                adapterEngineName: '7htlizw94wzmwctkp3t2vd2w0dba0c3y6wzg2ygqarodw76bgtf0oibuv0jsg5jtir4bzpclg4m58t72xv1qpufzerbhzxqutjw2bgflv0fjc9hsa5et6h2nkstgkcezkqe1rs4ztu3cx6uxcdesiq7l30nu6402',
                url: '45dp3faxez2ohhyptntslb9ieacbxjii3o0131btpgs8q8w5u4sq02oaee7tvz9i377jjgh4qwsa2zc3lvlo1ox8o3cnz8tuetd0at85sdjc0prtzbfklbgra1oouwi218ofl5llew1nwcm8xsxkgg14y0094lxvt2usn23d9aax53ir0ipf10fkdxeu4abiu1ys8ivyfzfwrw7hy7v3ntcaescr76beks2kbynsk8r12ye41dwxwn4ymro3y41tsu02ht4nlyvs7mob9uo0z3o61zronas5mlt9rk4v9bit8ejj8wmqj07fzht4rdl1',
                username: 'xvz1eo27p1yafcpvktmkfssihofl8ae06ic32js0gk8yhl9zvuap8tgof4vg',
                remoteHost: 'mgcm5njqhib1b7iuo97qqgwalhroxcb9hwewjc6rcsejcdz24etwbn6zsgemu5goi9gb29c40ri82iuquehtio6p80f2prrqgn54u4184iq7lrzfw3rjellhae2kw8i5kirkagmaczco5yqnb3u23nk0dxm6bpok',
                remotePort: 9180661695,
                directory: 'zl6uba5ooeh8mz1b7gabxql2fsb1to8j86eej9v2umkgwfrn4wg5t7igxegowadruknpkvjmzjmwnzooyhx7035y2ll8s9ku5sxdw6li8ld2w25kzawdazuw7vext2y8o2m5lmdofcom3igcloa0f4izuj25vrn0lxo6o3nxynwjnv0rddd5siqaqeuhvx75zfus9pwgi4xgooa0t43lxszlqxpkasft8pvxi7pfgnjz5uq1rc6sl9apm1o514qsrey0gc7ltph4qvmkm8pfxptltu3gdi7k8g804udpk6ieog1a8qbv81ail798awipvc38d8ny1ujx90vkyrhyjbvj9hhfv44e9mteiidajw3k3lfi222duxeqnw5s89r4d6f1wpm2oxub8o2n42u0s2ubqy0gyf78xc2sgcfugxn84gwqzb1aor7zistyqx2u017swrepfle5sem6xrhf6ompddw5uld2hkhtobc6ubeonrcglnerpffdhas7w9jhl089iacu8b1gf2qmzp365z4g1zlkxpjiooxe3kpvkit7v0uysvomzqh4svw4kjkrkrppgfgrlh0zi7828gn2vxldgmy2y1hd331pzcenuuxr1b7wl2e33elvqocv6spnylpqzbi6dve7wj2tvmxb6306b43bf8aod0d3o4za8gj08wjklv6ja26m3z8way440knoap1mchmp1tdew6110f6ew41as7vh1q52jslvisys9gjclen3mwc1g41sbim56tzjuzstnlf04dlx6te0vbmzjtfpthg9qt50cfohgbaua2p0n0dvh34jij5wd7ewej4b1rj3l8ei9jxyu5cg0u6ljfli2dglxfpu2t73302z8lz2i3abb8684ivxc7zzb28rpuf37bp2mrrmb73r5g7u67obcekdoook5m10iblof4btavnl93kkbue5psz5jw8flkry6tz5psqx6odsmm573xuoelvnvtb28hy8in6fvkvrttb13q41kkbgcqvz',
                fileSchema: '9culdgdwx4jg10oa3da8m78w8wa1oyk15cvpzg2gujy4lucb77wku6hik82xeojs5lxe5s16zr6zf87b0i717g8x2ec82fh2kbkx0wkbycdhdo4ahc9fgu9r5n1fujc4kx55cqxwa71k23iwvtm9puvath8ke2137b1y71ynrl1dtk9tea4n702sazmr61vducefe8lwwmimyp0pvuw3146hwcxyoiyz0ogspo2n2excflzdaibjn5p33mq669smfr1tyodjmjtxnz52kvyeco8oq7omn4ksobnnlxcri8un2kfwf20jvrkf6wqrwhfbp9jmftmvgagxrxxpave7va0xdwb40v5z8fjwzv6mrsn9nemmb9o6qjfxbunutpedc0ck9hdvpw1m8s9253446riviyhccyhdzyjerqhvvixr2uumvtl6n6p6rrebhw28m8yzkjjo9w7zewmztetb54tzaxlod27pycwtltg395jrbrx6w61unmmq83mulycasp75mouxmy1stm4y8raqlp9rn2dlud3e7jj0lcsrwgj29hc7f8a4q3jkd0hhuja0ywnsrpl7w77z0q5zwi4jchwpxpdwr9mamp0t79ujoe6l31gfdjtxhhmy1tx4od98rp7gln9r6w389tppp98lifgieuhvpx4tr5kxaqvxxl2xmp61tamxzmdq8lb3ascw9ijtub0ommbk5nqidkx6oi6s5b3n8miplh0hrqghj0vmctw9xx6t12cbr70l9swks9wezn0203egds2ab9h1qf90ly6r8qlvg2mwr6la40t6y589ug2hvn23vktrp4w8ogzjzchgpp1ju1ywi7osb0rjh0th7kxc5h44jjr8pij2ghe1mjwwzirzvd5nn36h9n24cllaubhn7rqc1h957yqbvwaiz83j103q3teax9c298nzkrvgk9fu0z3selsdywqgo5dmi0avabyhx8q3ixp10ws1hueyvzf925r8o26jyjpnn395x5e6zn3b2uoxc',
                proxyHost: 'j567avotdnbvd7jmj1uomua67875pu79szqjj8n7n2b4a7oa5suds6h0m53p',
                proxyPort: 6146792943,
                destination: 'vxot6xlpjcn9i7goeyo4osuqdq110i2xplhnwtlbj5dkpg8ufy573vxswexaqxy76f8x9zactsw5n8v36se1bc3pi3ex923td2gjy2k2dmjom36cipl15v8heh2fybh0d7hql2pljqu0459vp2p89xgfcp4hoasc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'eeongworqdrme5jnk5pkh2rl1xdgpjtkvre9lr1nxj3f105rqs5zvia4fahp6rd7frbobpix1ru4cou3jov1iezh1e2c9y979w0n8lqjyq0wv7cgiiboq8at6lfcjjlvg6daqqgtpgeeag3zdzkibt5y99w95mld',
                responsibleUserAccountName: '7sklsfsetgi0pqtofe7c',
                lastChangeUserAccount: 'iu4djqsjlfylznxf3gzv',
                lastChangedAt: '2020-07-23 09:06:55',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'l7s2qtojw5cou5j6yli3cyaww7ga92voskl0rt0oalatv9m2pj',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'z7022vv3ldtvs7u1pfgxgcub84gc4ohu6rcz1t3gxs9u584wbicndojq07d5bpbksu40z9x6mvw9h4xum3zcci4vgpu6bb6ghjisf0cnrarixfgu5zss8wxjc57l3o91rqd7fdv0fmej63r0zjrz6d0yxjb6zuxl',
                component: 'd8cx9gifu3ovmfr7u30wjnldlynwrru2o47uko21y8a0w6ut52gxqtuwhpzqaf0cphcfjewxsjv1jrhncvrwo2t9mj5e9ju3oh793dd36m3hmj23xcb9k98g1s32j8z445lm2trnvj7sjtp8iur4ahdy7ytx4107',
                name: 'eswfckkkppg8xdnijrbog79xuooifyzztbmmrdu9l0ngf83j6fblt3di9w0ealfatqj081dtuskzgc64sszqvn9dsbpopy9izz60yydiekiha9sq8880wayaiibxnvef9gqeizkdb5btqvs4jg20z7x52kvdyey5',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'khdt33k87w4ogmwk5s0vbjq69q4p77hhz46upj212bqqxaabjyr1wexjgenacjhrdiellnddn9eybghs1yiwn2cmi4q9d49bt9d6gapu0yw3lgojfhmdaaz4lyc83b035pguig118f8r2jbd5y83rhpa0knh7q7t',
                flowComponent: 'dehhytenxd2q991a25px2xz5oro21n9nl2fg1hbyriw5t0x6kkj4ivv8agbi00yq1xqracgu0xx7oq1bpd92d58rertidnrj4k6mspg7f54btluknk9q9hgiyf1hbz07c2yprt6uugxgw6fsegm1xkov8z2ne8ep',
                flowInterfaceName: '9eup1pqiaplfbkzaqeqe897ks7spau4j75yyjtur3us5nqzapnrh6yvkqpeyxytv4f0d44owsckhzwj5kwk9n048opxv2kllebkgmrv89b3vuf3rqwu12vsc4c73m8xkudllnj80s51ncefxnku7y7eo4a03qzeh',
                flowInterfaceNamespace: 'ad3417zs3wa09d4kryipaz6f40hu0d6u5huxizrycf314l00vcoxyz22gl0c9ek9in9wrmn2selhwgwtthblrlvse1fo15n602cd7fc0d05af2qfau277d2k0mc8dl830wcy7lbcjes6zwsa2m3llf052us2r7qw',
                adapterType: 'bg08178yqovo090qnc8z3dtfgzpedtdmw6apasf80arv8kuwde14ep207e59',
                direction: 'SENDER',
                transportProtocol: 'zyc4e560o0iiqrdhv3z3puzfp0i7b99tticgrfk88h6muedky14p5cp0snk5',
                messageProtocol: 'a5ijgf4xhetu1txcrcc0ttjoztz4dv3rlrn33sizwk0v2oq9404s87dyhvjc',
                adapterEngineName: 'avabz8mrby35fcob68molc8hu77wxurafuazsdhs2ng1tvhystbqk6qtzvmbxbwod5tms6rlk3h0onrrtdk4ru394ftaiaatq54xatu2pdtvxzznl8km7ijol4dnmpwjpiygsp2oom9klas1hxuz703pebkrk1cz',
                url: 'v8kuokw7pt1nml1lu29xwjhkebhxzinx20rxyvl1zxk2lsnlgtk8s5vni7z7tur9fsxmq26x8c2fdh879udnxk1hzfqe0dxg32dc13ekl80p1yxvjiw94znimjr6d0wqtk6kyg2mzfewzq3efcqbux3wh93ty4sb9dbqd5sv1tplwfw6jil2si7ocyl784f5yed7xeg19v8or6th3te0le9qyr6yqaf23o2wywhlk0vmdw6bqwarztpy6wkf8x72cy8qjmv624pjj3p8u1b66ff4id07a2wg95un0r66xmsr87pk7mxzc6d1sb6gblmd',
                username: 'rilwpqrk4tbib1riv0s50w53h6g7yd387dovbo6uktdono7d47gkc3fr48wd',
                remoteHost: '7tg21q35th46rfcfq8dmpq45tx0799zfmidn8neoollnmmlrcg55imz3us6p54f7ddvove9ifb3qabwsn8ttozw86k88r66eh4dwl4cbllb0hbdly1buammm60r4zu41rzhdftyg1uza4vb58kelh0nbfwjv14gb',
                remotePort: 5477103224,
                directory: '9ew9awajxernvhx24ga0nm3r71kxdrjimydy318oc3nfc7e51r59fyiekupbi70hd3ezfvohyprl8jpl92pydk65f0p59ys1dfynl5rth43wdmt70yn6z0njrnd3q3pxc5qrdjfjksm94czi7s3cwar1nc8j7relnlq0gufuqb33wspiusgcsd5artl2uvw854duhzc3opy181j6up2k74ofvchf64froizyf2u7qbhyl550834lgh7xhpt70hns15iaersjr0kx7bdwxxm7v7altc4zof76iv4mfy31la50kqxx4miuhn1xt71tz0o9uozlrfi9h90rsystiw15wsgdcoq45h53kigbt1axxp057jabwlaye7gjluerdg7a6ribhbta47hbgoert4oqdu5halmzmyv33q0fog7dr8dq331gq7uq9ynvlqwhe88v88erveyf3nv0vc0hyiaddmcufccz8yv1my10oby5j9gz0y01ezax2pa7dxsdet8se5bbj395mjuxgos1bnt9rax59uycrkrh7mm1xsz0ap39hbdvbqmvi9oshelthfo0rf3rc98atf8oe2vf4x55zto0gv9mbo8i7puf7q68wifas1hvoskou1m9uwwdlaopece17gdas83ap6doanzkcdacbhh05r8z5iufq79engkue4lcvq30yzsnh18zyzdowa0khd6iouj7w2wmgalh5znrcm0wa4oe3jull75asdb1621onss7vlgqpwr3l8zawn7j8yx3xay5a0928w036ujqhk7crj3wwu8dguhnucqs34xd2z7jcvj32pprcwvfraogqq0uc5bn4w9uyezrpwcze619to3mooa3felncc9311l0a2lnc9yn018t3iiwjmq6pmg7ecwmp7hdrccet59hr4py6g485prmocgpam7ixagvr8e9wdzfox42tltzdzyhiluz2pqmtmxvf2ohb00r3pvk0b0hgfja7i95zx5tl79cpb7nkvyqpra8xw3b',
                fileSchema: 'qfp64rjj1nl0dju7c6295fsc0nsmn2khgihkeqz3d2a1fscdtlouqq0cjapht46r93h264ks92c8j5l3qp44m7d0hyji2hsfph55vjkvqu1lcz3c09aqwnbjki2o1jss12u84qkin3habxgdwns7cu03stod6046q12gcounxkmibf5rlhxq6s52rlye0q4rj5zfqa61jnfsq2grea8k2vpk60n5vud9fgwffrd1udl165hyhsv0rrxn3n8l68r8p8ri686sf716typ7emgmz5q1cegtrseh362no173kv3xtarrh0r7yiadlawfy144krd339lphw351svfzuot43ummx4knpfzcv3qw4uugb9q3ti5zuimnizf46s9mbznd66vwaju5hsfzzezsytyozj6fo7y5riiyd80e85e8ivqvqhxkmuxw8xedzh4tc2ro7f3g35uv3i4zcloav2wnvxkga0irwx5a5l4k07d1un3tpfylxuaj8k9k6g7ymoxchvxs7mymxhqi5htjv10mromccyxrzwkwa67ttq953rlsosqv0bna4dntn2tr3j46slnxrgducdc5izidqehcxwttu5i03bq9baq9pwtixbdbuzlvjkjerli7htqd09yuc1ehnaxby19steqrauwa0z2dvv3nhfi29bc1fahp345gpxa1ojuxknxgupvjmlfzk1vka1kit49oguqwkrv8odmtichkubox820ci2uqcsje8gd9f2zo30i6z97kk2npc0xcvcbk4zdm6jexv6cp5gwqjay5i11ye10uvmexpeci4ywaf4rm0u5duqr0kohra56kbptx87zc7d3lv5l4c01tyg6f74j45ftqazt3cu4f4d1xwcrnmyhsbzmcqwg1nw5v5fujvdsb9tk0ajqmsbo8l63p41v21vcrctz3l1xbdibktunbarwn80c7enx3sn7cmy95t4j9cw9qgu5tsj47yhnjz164cdkqg5rltvzazqo841gdg2jgnugjdtb',
                proxyHost: 'xqlo50kqly08q164zfhu1c4k7qxpptcwvuhges3p6agdv5nviparu3hj06atv',
                proxyPort: 7427983044,
                destination: 'gw65vh2num3e6aqdxjee9keiebwco2ecb69zwhqbir2i4jkxtfg659w24u4psgxca3coxnx3bi4l5avlgyq36lhfoif7pph138yhg0117f7ihmqtkq8wx1tz4610un21yx32hw8an8uh8edlcmomct70jav7oov1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6d1zqkml4casmznsbwc75mc87mu57hukgs7kkq3gts495kxvsmqfrdl75kn9d0p7ic0qq5me0eoa9xxakqgbheu0u681lxpro736q56aancqtfwsjs2r0sgqcxn2bhtvwh6qc7foiat4h3pevsu5lxe0xz7x3205',
                responsibleUserAccountName: '0hufr07camgo8khnlme1',
                lastChangeUserAccount: 'm18ph71m5bf3tpla99x0',
                lastChangedAt: '2020-07-23 10:12:00',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '59gz10urmfwxh9qbd0j1fu9zkan2bfuj8sdytyt2vuh4nqjce5',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '079jl4x32ag1d3knpeh2pnddujonxo7w9ua12h0xfi0h1priexle6ako7nphgcjun8e0b58i5f6z4ca639m8w3fomlxynj2x89vvyropwq40cjc7cghpxv6otq7p8yu970dbpva01lt5uknxdt0dbhvwj5qa88fl',
                component: 's3vvro603hgqysr777lw8t4gkd7vu5zyavy2v5y978d8cvzpjbdhdyok9a8mm1qm47sg1k3arqr7d949tscvo1q7v1w09he10vmzsbsegj62hvgw941u2w1yex6ohm2es8u02y0upzgdv5ikbzprjt7lzeh9v58j',
                name: 'ygntx0t91xwf4gmwf812gjvc1n35wbzrelmccw8wvytb3mldnr69i8syfh88g12zvj0bxtlv8lfepegvm3yw8ftw8zpmfqlmfxr5lmqk1783u8kig4vatjelj57m9gt92q7ovda0h5v95qdftmbl56vmxwh9acv1',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: '3jg78qdu9oieqkx4hwmcok5fymzah0rq9vp5zdfq998lwlqr84nhk2qt8p4oz80ba1x26kfeparbl50o4ui2ffv6luhuf6urginx1oroxv6h27d5bwmnetl2dls42ooj2p0ryglrb0od21y7okuh08sobc47az35',
                flowComponent: 'dqydkz7o0vt4c5mzf0aizgcwx219cb66k200gpp2n2ymrcxcrxyemz09i62aa77hlrlcva4kjd32aqe3uhgvtnwqq1zfv51ymimzv5tws6gzjun1jc0exlowoy1hmmn87jcqtmpnroybldkvj7pg7p0wkk4qwcv2',
                flowInterfaceName: '5exub8h152cxqcu2djxsfpciiwbobayzg482qw1jeatnuvm5tef8n0t3koxhvkmwrrbyz2ak3lso69d3b7yj3mwislrd6xqefp9aeqorpanzyqr8j6rtqfy1twzudaiek8u0un2ascya303mmc1ixxv5pfvns5yh',
                flowInterfaceNamespace: 'bol8lhtrvwk875aty6vusnh4wu94t0nge2t1ki8arramp7kwojfbal424f3v51la8xyonhwgudvjxa52pe7v0t5crhrdtyi5gh91h1nbbvwxpx7fuk3gvgekqajb92z0qen7evc7qmk51zpoze581v9nidsenj1q',
                adapterType: '09kabjy8o1bfyklilmpbxx9berd73ye73wimaphrk5ywg99acm8twrd09x9m',
                direction: 'SENDER',
                transportProtocol: 'u1mrsmpxo2h26k1in4fue29eabb8omt9ggagurlv5mlem1g60f32dx525fvp',
                messageProtocol: '8ofv9jczukmfib8kwje2agnh1d71p7dsrj42i8119xterpb2gtewwxugfhvc',
                adapterEngineName: 'jyxl3u6fvyvi4u2v9t42a49n6gelykh2agv1wfjufd1yi2sw3xyjvzewseodyespufdvjw5is3oywcqghub4hbm28h9f7rcmb2di0193ldkllffiuojau5yee9ryplykkdyqtf7tm9hzkx9asdduffnw5bs2arld',
                url: 's2qc64i0r3no8cioofmdjty77y6zmtmts6mgrvwqs6jcgcyqv6tuizvbetsb2jsrzih6dznoajbmoebxhmx286lkqcx2thx00j8273tdf6wmk87klvbwgoxzodf9j393tet2zf5015toool49j5150jxgttpgoyvwooqtoyzgbmpona79r0poe4levmsqan83tu516qy0qavt4tqq0q8jf2l75svyil4m34yso5hko9ova7e1c4xazaa6e6j7vf245rxapkr75bb3p611mc03jdc3xyyas7o4p5ktbqnint2x1bup01kwl1pdom7ojh7',
                username: 'u55e170t8jaopjd85r8x9fgk7e93ihs9aug19pbx954lg03tr77vshn78hjp',
                remoteHost: 'vvokt756oy5o31dkc77zm29bmnf581vtkf3teeqov5atnkxye4u15lpdqxnymyhp1r7qoawhslv68rtggju97k0supcnxoa9lge5t37zlmvmpygh9slclq3ddvxn52uvr4bc24h9pw3ubhl04ixqvyvazjxfq3eb',
                remotePort: 9511697878,
                directory: 'f2l1w5gwubj6qp1co9nqk9o12exk538s1n9bo0eefzauanpgq1vpphh0bhygdxccxnpfar1r52m2vecuq9p1m8xhk1ddbi88ieotmwezgbl47syo7papnsyk8q5tkkrrgthf6rgf462znaa256fbl11y5pxj6vma3p2hizacfq6n865pntingbksjbej2nqg5nlp5v9hg3yjdb0k4w4sol22k49m2iof5a8hf46lr8peu0nok418j389u5hx67is5nd2vvdev7005a473udqqdfjnw6vu9aefhfzzg3mcy6zwha8n9gzoxcx4sh6ouxinyykr5hbw312l37vc9n69ylfi9p56uq6h8xkss5hm6snz72lhkdusbq67dulvm43fggdtnplki4fk710aq17tvy35hockxaszn9scogk5fjfu648oka88o9i9fqf5y037xa2urdxk7h9rdb97c7ski9saep01ojmwmszpadfv4iiv9zz333wezpavyc5ohq5me2dlg2s864n80j56pd5j5cwlyn5116hib0ob9r56g1lrf722dyk20uo1zac9qflnddwwxg1dg1d2v350grwb2hcl9sgpfdmnqb2hpaiqrc3vzq34mb3ixoj6e829fnl0hal4l2mjpvpz7xy52gnbh0db8chhag40r9gkzob4ibtqcmee6stojh83b1teaaswyirwkinqadhsittvqi26ymsavapmt2zp6xq4u97xpa0tvvc435nsfa35k24s6thtfrhw4m10uwz3l3e3f7kkcoccdnj500jzqrygx8rvxeqvfg3mg9tmhmztztodo4dptdzuxk19bdtk800xuh910d1px9q71knfpli2ndkdfxi665zfcjrz2t8o0h091fue64cbgh4r8ne5eaoi95yjxk8tnz9t44454zxla8h7bli9nedlt6i92fphl6ssz82iwmfy5e1g3pd4cnl2x3pxpn43va46tm9w14bwpa6c9rpg7uokg9aibpu4zasadsp',
                fileSchema: '39str38bi9bean6a2q7ef0nodsyhg4vbcpmfivtel1cbmpzpofaegiajsqyykohbajonqayzwnq9l36z2zidv7cdgs7ojr4ia5q4gjimka5j904y9bq45bmvdgo05kvqlh6ahai5zefejw198r6ewqex51tjqpwqfcvcslmunitls00bl7vkpl2zw31opzax43g4g9alh3m1d332y2momd6oxeg96x4fulwfsu099voyupxbq12xyrbvzuphd93ei0nmyp7v1s6xwqd7zo12llj5el8urx6is8bvhdq3txpch5pybichz3e8r9otey4z4dn2303nq8awi89bhnj5f9ahduw36ekuepo3xxwitc23rdmouel2yzz8j64jhjmi3roivdi5x6g9q69eadkbbn4reullg8eiak066vmzziwhxje7jks6vb2njzu49xn9q0xuv6njxvdcdtgshixpvh90im49vc6yzlclkrw494ox9pwglemjfzlq7oiiztybnaz09cnhdsww7et26oj8v00545vt41bhggmztu11w97z812g54ycc5m12ca72ks2gguvbnpbhrjwwkcpu16rucua18oiqkwk3nb6k20n2pbv8urf1ct3sdqtwlid5rnkwcg66aiolc35ima48s1sjxi23k87aj6r2tvg91vet6k8yn7swmetgf21m3t94yjypvry8usw4q85bkspz6lpmw1iv6za9k930m9mhgm9wl6m1qhowikqwqj0wmddc2kkyagxnp7atmxkys4hx8xth9eq2z061s49jh0n2g3u773y3m6ze52a5h2yokcz8kq6juonjzhvc2gl71uliw3bpjknziyqsheaepc0yve8ileiihbdz97qgro7rvyo02iyvjw9a4yubf5twwttpe4rgtxdp5mzls4rwprs3e6olipk32ppcqijqi12svco9ekvop61rbjjbn9o1ms4ez2bthsgjymrqcjcut9q7fyjelccgt2r4qazijsbedu7ucew',
                proxyHost: '0pkpoo2brklokb8l2hew1ut0jqbbn2p0uavzfngbgtg1486ayo9p12pzxfk1',
                proxyPort: 34183838085,
                destination: 'zocfa4g6hid51bbftps5n1y6imx4skcu1mgiakpkye78ro9cbc0ii5l81j5bjjmi7g6mjfqu9g2p8sn5z9innzyebb3etxv9uen1oq9fdh4bheuwesgxwg2xza73fu0pzorllfm2a09uan9asyzfup37yw1xxbfn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'l1gr32tmrpf3oybgpo6cb0p0175vvu6ivbnyxxf1bwovqv0omk1vh55bgh5r00jws1z4hpjtwvr0iqoj5r5yq54ofafanl2y3mdcbhr2dnnpou1d28a0h8mb4khmmzrd29v379u79omwd20cg07ctxbb76n0zy95',
                responsibleUserAccountName: '3kljnu3c4x39vrylsq69',
                lastChangeUserAccount: '04a9lvdxqdlzkitet9tx',
                lastChangedAt: '2020-07-23 06:26:42',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'n6q6emzvvecfpyhdm1fdqta96rm0c80enn2xoardn02nkw7j5j',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '69nludsemiu93y1u6ju1c7pjww37secgp15dr24a6oojbt4z7x8yohfc4jrfrunnodbn9x37oho69uvjwzrw8ichnaov88akpgqst7qom389siwolop9q0s3pa1rhylyaep1bzcgxp0ii3w79ubncpmvzq14252m',
                component: '4547eax8yelexaueg1kfz7sryuop2l5jj630n970fnmzzozd3xsjhw848j18zagcbeavi29q4gxw1d703pzuubqqw6ab6fk4ydzqatc2ddj828o6kixt10ped5c91eumflhrw63fbx9sujrwdku4471m2dpw7x02',
                name: 'czqiaud5ozur9esw2dm99plgwx5z175vrvcqskywv1vgg1ir12e0rex10lyjl2gva0j0lh98g1qcpq41jd021p6y33u6d1vsp71gbzz6qq3te493txyqdw26mbo5fzfgmtt8q1btqt7og8x84ih3rdo4an6ah8za',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'hr2buxf4plp1qiul9vzsk5uokwhnia4sidzgvqntdnynxlmc0ajbd6vkei7lo0qkkj2x1tpw77o99ih3m13yyf8njutkdu74zuz3grptpzn74swt0z1w079islvuhmz61p7r9gbjyfz9qij3z9j881o6ok04z62k',
                flowComponent: '41o9ua5h2msa0uh2skbwok7kbu2x3enuw8dhnb68w6oxilxvu30o1wp256momzwnuwj7ixmf6ozsxj5klvtw0pvkkw8mxyavjn6208g5rk4ss1yiq7ole7iz5hsipsfh95obq360iz5e6x1ujmjagmlokjpyzysk',
                flowInterfaceName: 've9z7h3ngy50iavgvm0en0oiv0a5p5sx6vi8pyeszhj27w7gs6tlqmzjkqzvnug9bvpf7nzoq4y6k3zse849ynrnmkb3j2zi6c96tj66uein18579jb396pjh6j7zjft2lnxtyh2kkk6ps594n6ief2ldqlzbnr0',
                flowInterfaceNamespace: 'pgqhbs29lr7yv9r34ssbigrfa2cpubik1z4vp38clori5ekpij7d5k0okyx26c5geqcknpxzxd8xhz157nw9g3m2ekxggyw4ud293ugno25hqnrx6vvxtdz5ifrsgfueec3r35a3d17pw71s6n9zxqg5wr5u8ksf',
                adapterType: 'w470vvxn7vt4zzws9y96kze40rcp1c5lxkpzcho9svfrq6er1utiy9y605s0',
                direction: 'RECEIVER',
                transportProtocol: '61hpih7rvjhsedrtykywfynjqogg651tp8bsoksj6nl89o69c1vizzhv4wsn',
                messageProtocol: 'jrsvrr4v42q9avp7eqvmnaefo96c53nwc4bewgn223bu94wz8fz5oggt0pyp',
                adapterEngineName: 'emyr1h8zjpx1l5qbq4x2g0n9s83yxoabht5j6or8zfh4mordmw58sbxhnipm2ts7zwnsbm15ft9wsa3foy58sayuovj64ebymeucoz1oogbzyfmu0vcbuvn1jn3ntxaczop5xcf9q2vr9jwcx1pxzt5v24d92vfi',
                url: 'gddg2a04s758kv38hk16hw3j8u6f6rh7yingwnfatw19p5m76v7i0n8kimnqweydrkvzqkmebgyzgb5d4nxsojs9jdvl8y70rl3j3rxm41qv12we6uqa3720hvfkq371sfu8wree2o080tvw982eahp54r690kf5uteydpgj9jxb8810fw56v0v8dvodvr5t3q5im9lysbhgsuyi3b9hb7wjjr5x2w7a8siswcs0wrp0kf8kcsdeztwzx7t752cvwv8imlx8iretgjj43s2d09x3gpe5t6foeoto6btpv5fyuz02bxegxqk9d1do7iyi',
                username: 'oony8dx6nsvv0wj7s2ba50lhor3zvihcqkbgch17yypfb5sq6nj9alc3vzpk',
                remoteHost: 'r4q5ismi4xq0t2ge44qzss3sphd057jq4e3lw4oewxtbi71a9qlv5dhlbp1m06n5wcn5117x3p99f7zjbeuopsc5ek22o6vowk60yfjr6tzvbddvfa60v50yswjrwfrupxxrxm3icecou6fyky8atcqbpt2h44ka',
                remotePort: 4981659442,
                directory: 'tis8rxgbbkjrz5junig3oe2jv1o8lta8mxc608ejtuz7sc7qirbf0lcoteqo68o3yhr1ky6wkgtuimww74828xumtmyjk51bsovg2qudvwtqo8936anvqrod0tjuffotbd6hmb7tom4rochpv8t7bw0gpqefyla945il2zzt56d89bm1y18all6o30zvmyddrehy5xdu6ya5vjmvm2qt0787fm3ihsci3k9wy3gvbxtvngzip1slxlsgxa9wdcx80n1vzk4zbbyniwdt6fda9qvhhj6py4cdtboqcl3ojewvov8kb09eg3u75bhjrcnpobesvq0zmfr04whfjvx447xj32u3h9euhkqvntdzibzjpbi84596s85wl7zb6k971xbedopr38is7mueer48latjwmme6me2rxphfvvyn1hdp3i0a58numce9ni5dkl573qlka3f97nrggmtwb8t2un7elqsydgr66ufeflj4txyk5pn8l72wi8gjejn0f0t28k1fsqgmwyrwttd2lk3s8w06bxre9ke786gx1s5tiszvopt7d16zf79lwsod46jjmf55ii8fvyszrh6or3qfgnn5ap31ln2f5sp5mhf9x4xj4khgujlo094v4an82kqc5g6wxix0tt1mgt2u6unz6s0wdq3sck0vos2asyjv0j7eydywsqvg3o9rgzz8udnz76vrbat925ons05mr1d0jtvf0qb635viyq369cqdye1jjikb48p5v1alcw1y88kdtb0naqhu68l88hhozd2esv3mfuhp95hkx8pz6qbkq256h3z56yq02mrg0newwtavn8p8u2u87pq8m9ccch6j7s2zwznl8vkmfj6j32w11h3iy5i0n4i6e2p2wo2s35htjrly8q49bcn9n964qc865ope9omc4dplxomtag56d4nfaclenfmlalxo6nh1tn2p825ipizt7j96v21msxl7e6geytgahwnb41ev3njmh6hapi78pk7mnhzh2spqeb6',
                fileSchema: 'zea4o5hlfr1etbfr64nj15dm6s5l5v7fb9ki560t1mutr69rlt1z492w3wd30tp8pnqnmxpkpz9ytarplqmvmqthj0ls4ekfip66qgvwgfw9uyzt3c8xfj1eqia7rdy70gauuomht2dovrjywcjs6exxo7b1nxumh4kwjqo9kkag25oj0b2qha3h05n1e3li72y20k33ua8rblgppyu49sj29qpswe4zjxs0qh3egkh2lxeoj5bprxt5heezb2ycfmvfsd9g81wyddryh0ces2gqoeqb8mm6xla9u7u96f6bcryyjqg2vzzcytk5j6r3t6hk8r8k1vjsl6qs25et2emlrteja3davg41k7djfsg2pdl8gbgtf7744qtro7yqpqfayarsdumjm929udcz9fhsfci1oq9u2vpjccx2zfo6xwevr41vb3wao1ljwt29ui4crjdj6okds6qndlkheizto8a32rg6y0sej8v7zb099x6g2t0765400ovdbrghcwugicih66cb8ymeebgpzcujxfwn2uab5orc957yrju3ue5t4brsaltboatc4bny7ik5lpl45l32y7hnuz6rjghltw2ylep0ce51uzpg84vy6utb026emc5f7z1yzmsncgjfnf2x2giwsfmwxcngexv8gfbzgvf5p9whi786jtatv9ap6isj4f94urwd9rb08g1cn47frbkqp0tapxjgg0mbpt5dfil1a1nrjwol8iar9ts9l1ix07qrlxo9xxn2l96mvxakon4fclc282tt9241fboypss2sbqbtic2v7rbyursckx44otkbv8d9ucgeq8ii7bx3h2vagnlnhiultr684w7gxev36nagiz5qm13rjrmted32q0bkosxs4u7g7c9hlz8sz7091xd2quulq4mna565nzgbzgw25lt3xj8efgijxvh16nkq1evcc5f0ewwedvuszijqrnp4239ycs2hnzvj76sh5kkgza4ghx6gndd16gpgmmr331dswjx',
                proxyHost: 'm7dq3f0m0qnbfdk200alp83r6y25py8apddx6ghcct1uuxaerks093ceotra',
                proxyPort: 8870452781,
                destination: '7x7j9evsc8vxksxmj6fpgybi7duzov8hcyn6sdep03c1u14mxeoxgx3ugrju8ouzdkl8h4kbg77iam3zoubakaolkmlbs9p2rhcentvmtp533czof5hzmp3muve1y8rx1qttgaaqlbjddfo9m7a8xpmo3pqvrvisl',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9ayyk2gydf56jowfq4qavhrmpx6a2dkd8ipiu4x6i3lwha31k5eoiftbkkm9yl6z3ltynkzlo7i12dprqpms3567flf5czbgm0ytcthenwelz34i3k6jbm4ntsq5jo0tjk21sj6ihb3x2shtq0sgekan3gcy2xsu',
                responsibleUserAccountName: 't1tw0nqig1ha43fy5zqo',
                lastChangeUserAccount: 't2ei0pnya5zb3fxqtfaz',
                lastChangedAt: '2020-07-23 04:23:41',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '51lwi4c5q270h9qdx8ymsxxdmui9gmx6cqz0ej8tgws3oa1oi9',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'vkkkfxrojo2fyn0tztklwa18jqg37xjyei9fc53swnhtdvh5c4zsbwkh41voqc3swngblgpntga6delqzijsf2aqy9djr0pafs2a1q9xzmthdnpr2dqy37cq0yjssnegoyu3r4myhpqw79013vxj2up2x8si6wf6',
                component: 'y3mvawuvy51gm7n5vvxx8pls527pfjoa8u1kyb27apnpzjgtbo5cgf77e3oxx7g0mftcai59dn5fn1ie7m7fsqmtb6jcscgh3k7nby2027zofx8b3crdph9sa64jdkavljftp0yrtvrwxxlrykwiai65i5azg33b',
                name: '0zgu42l0z5e65qfgam5wxcesehdyntfeit52iql8t31vi5boxkwgw7nm73ar7508hb0rjvknysszvbg9e94e73mamkwt6knm2lqgt979zh3j4ttw4fysg7wka41ht5guoctp0fgwe97504scwg2ei1a6zg9mnn8h',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'gk6rf58gmsdn0qyq707iz8wj1r4smfp6rvq5rhl8mqn9rvwk2v7tems89wmhnndrivsm1jhvjvy3wobltwmd8n0brgkc835h1qzp34x4mxq5coyh69wsw8nhouloevycok5j3viybtwvqo3zvn4425frsamnqboe',
                flowComponent: '23co1214665fiankt47tzn55lf3w41nekfbj5nq365cvakjzbs5mkv9n9km7o244ubx465imxg6vfmjcos9r5qmri38mda7nqdizv441s05i6okxp6giu41jij1t6fqu715btjwpvmw48eisere74o6lldceeqvq',
                flowInterfaceName: 'e4xt22dojcrpufvvwlxtc65orsfjexulwgyly2x38zjyqaez7wh1q20pcfu2kcpuks3ou4tk46285gd36r7ned5fj79v700m2bk1b0p7hur5byxnsiblfpo9c1o10dt3ppik9x3bifziaarti1paxe70a1b4ijij',
                flowInterfaceNamespace: 'nvqu8l02y1ud7oezfybcxrp33p36eowoi872nk4ca0yu43qmni815bwk1dyf81t9uwqi7a5jzvpry94dukplv3gev0i1f007rirvxlyrjwluw05dl34e8og8pm8zj39p8jvso6t346h7j4jdcq107febo9qrqfs9',
                adapterType: 'gg1d72i8a2ful6q86kvh5b6qotgfxf86viwm4zbxu09o31b4fjy00bgtvjb8',
                direction: 'RECEIVER',
                transportProtocol: 'z2b51i0akw8s73hixltn61b53ygfag2mqsvdwzli3yhzgdwzdzs1xt95r9c9',
                messageProtocol: 'w62fcsas0wk7c1y4jwi659x62jh5ripr18m8f266qsnq521hklgaoj1tamie',
                adapterEngineName: 'zvwtbiqkosnazyg2w84ep67ub51pzgnyvs8p1omnj4i2ltjloun2oau7bvb7dtcbt70j2n1v8xwpbjjye9y7n5cn9anxxvxvxefxxyrwe8nhkrzd0k1hpnquj0md0g83ipqrf87rh6w67wqjk2l8869bynh4u38b',
                url: 'pm2btqqpi6etmb1q0mfkh9dnfhlkmksr4qpvk9twflmm35g3zvns4enk23vg46tpkuthbx3jzfxfp2qcjk9y1dsf5ahnwuwyqzlifd01r9abqxthnk2uof6b91n1v1pqrde71e09qh4qlp9e7q0oumfck7yq7f6zoafnbygki2ufbsx9c2zujxji51g4gjucue49hds5cwhanelrxzf5rj8uza80il1z0bzirn3jcbv6fkwt1omgcjimvf6lelfw14mj4a31ca7qg1sfu3eweb8csbtefwc6zharmf9hpvpr2cgjb29r6jfzt6xn5xus',
                username: 'rvmfgymrrbj6y1t8aw6lkoam1ypq2af4if2x6wg0nzp0qo1wjswol431c0n7',
                remoteHost: 'ufhh8hr1jlqv4dw6hnphvtfx0rw8cyvuqq4dcly3gbzafzao1rnf6rcrfc3f7t0of3sa0plwmy3ghf37kaa89y1hbmny1b7gyi96x8kq6cdbtpipoyaf19xa4ic4ps1ycve76gbuzq5vib0okybd4rqqdicqdfs4',
                remotePort: 5068393994,
                directory: 'xjsllxphdc57p5bjpyh6n8oe2tbiz4rhllgnbrq3wjr8kjf5je188l23fh35mozk7laj12ouzkwx99xaqcnfixfmjgz5pd7t6258ywesn6sgtny2njvhr7u3mj9uubfi4mcv867jat1r8y31eqgri8y7p5qj54arc23p2s376oiv64x6cry4akwewbaynhd11qvrzxq0r04fmpxqb7hsh0o9qiw4afuv6uwcm6pdwvndgyb4qdzcqowsyfpa735rzb8fshbi06bw6vy38r9ec1l7hfxgunai8xfw7tugvih79qmcncvtcm9funkwg5cr2bonfr2tpg6qbqnw9ok4c0n6t9ja1zk47f90luq8is54wei3fih3gjgks6f6mracngiquyg14qtv30plt5ibzcyvksmopr8ehqcmppwc063lbkxcshuqojri60wuvczb8ukk45tn9l7bssectug8lbh76suy224hibzlz03lsjevv8zglnrij3zeynjpxls346zvg4lsaer1choe7liu5pftl6zmltu7ojsi3lnd566gk45qofnd71wnv34ipeki1ks632x1okahjd9z8t77le3xfmknrsmxch5mv969zvpwnky7uv96f8um5oly9f7rntm46qknr4hpci6dlprgd29r37td2yn348atuicsptnl0qstl63oq4sj4f5qr5fh33elwtxxbrh2l2vzhso7exzpib5n1306atdhynqz02iv0uaeptlnv5s2fgj10qnh9jodeq1w7ezqfgqdfptq1shuissf03rbqnvrnxxcrs3fitbyjbpnoq3i6k9glwl2sh1b9y6bmi8jqub4lopyuzwipxiysurhormwknzfizjgxknjt4s63hwf6p562me14afdllmhrgoy83extiu1h7qqju9m57nwjyukvvt0arfm8c8178lsz3x7czjlfk49bl7q95tkosi98linyct3os64bzcw504h9d0bueov02wi2lx65oxboyfri99geynn',
                fileSchema: '0b08lxtu2tg920i3sxftr8o2biz69cpnkq9xozhssktyjs38il5wdejjo337h2nczc8921mipocelv7wohbpbhgg0rwhwpv51ndyqu74pnu7q1msj1f1m466zxw57y3cs0jor77vw9zmlz29wndk6m7kvyhx2q9tv5lr8l5is1at6o2cbnh3awsezuq5w8lpipjaij7boudgjz6wyacr4r5rlc6flyk3ynbfe510v8oujncrlginmxaadlyp52y267muycqmrwrr0wyuv9sth3dsdt2rwjjswh790ej9ji2zj18euq0w0ey6vpe49h484i65s28jxunsms30skqi4v4yv6v28sgvcitigrg8x92n08262yxaej51c9c211q5stajbl94kz6msdag4tke9bowk4mqc73eu4dlu9hbk8a6vc9j0f3631nv885zl545cnnqnftx1wmpkn1dt74ypjpthr2zrq70ctt4utnf522qh7sirwmxy9gyart1itidj60m89i80xwmnvynjguzdyzc2zotdw5xl8shedcjvyl4fi4sbgnvq0pv8h06dg41utkdqde2g71vvxg8jzi6pb3ujf7r1yblmmyqsifrig288txagyaifinh1lxetcp8wb4oil4wni0hd14mef4bzn6ih1gx2q8xgv5l6xyxedrmsx0kcrfudbs0v8fghan7me2hbew40r6x4e71qebpmzwvr3enxd1y1ytabs7w7cfskwxzal7mko0m46njl8prol0xp28roy16uc4cs92a8blq61t134u4sof4h3xgrujax3qh1ocek4xzy8zhy1l6qhcs30clw1hv5qvkbnypgrb38qmxll5xremu9oghzj6lwp5q9vsi0pnfnxhbp2hxbahsryrlcryc5sw9bmfmk1jgefggnhrfo57ntxkcimuvspxt9ql047cytnjztj9w1zdotpqoekbq8d8p2wbaqpt0sa1u0b4o5o7v3g39prjgf3p9x8h19jnh77ise609',
                proxyHost: '51hzrlazv94okqt74vvghaesn1j6i07099cinx39zini4qdypm2309zkkep0',
                proxyPort: 3542287786,
                destination: '1zh87r5879b2xrlj9fbzxbugfzuv9s006q5lalafdifveis3ydwrw9eolno9td2b23dknphjl9b9hq4cv7mx0xddld2vgajbnxpx5n77rca4fnq7exr9p9d5w6ty1rsyln60p0lb8zk4hmzvgs8gca0sq05bvsoi',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ulaeev5978opmt68dffu1rp5tj26v41x35a8vco59gz92w3laknww6v6lwhgqdvoeey13efdci7z81drs1scd0snx1drlhogyzkwuctgkxw11uzwrdpt7niw96jzk9wrycvmp4y8gti0ab3l2z1qubuk24us3jqer',
                responsibleUserAccountName: 'sotqdvn8iofw5506kt00',
                lastChangeUserAccount: 'b5feky47y5i9dwowaez0',
                lastChangedAt: '2020-07-23 14:02:48',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'mvyo3tjan34z9znmfr52sv7z426svhblk23m2ofhbk2mhzue5o',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'jkrzczcxoe6mbmmn1iuvmga53fk8pn92p5daxfi5bn31v0nf9qidp55ypcke1cchulie23c4cpf3vophi11omvznetxuia3cgnow4ea8ks1wmf2ioque46wq95099ot2cfsn4oht8vujnv6v4ywi4bo0er4tkw0v',
                component: 'm2aidgon03gnuzsaftzld9a9zsoossf4kfa7w3tnolx0tpzqw3w8zywzolwbams6dyfexchp3kv81gip4yfm7wlsjqfap8seg2rmicux5us26ll18kkrqvfuxb67u20rqpf15xmrvkhxsexxjsnijx7hfncnz8rz',
                name: 'emdof86hm675h0gxnyjaxlirls30er2579njuvqvmb7mdqgqzi4k6dnzxbkmzyvo1ktfmfcq86x84z7foc8futdgt63cj4fh0z5m312p8szcd2lt3wfjwsaz3cy2o98yn66sb9rjsvkcakxck3jsvp0o80favhhf',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 's2aithyfjorvru8xip7v0gamssf1sw838gmh22m8vta4lmuvqflrfoh9ctyewot8hsmj92mjkiztz7gmcg6olhla75xl32igs5fhza71iki85q03hpdfbrpdc3fszgqg9dhjsivuro0i7wb6apabqfxdnx11phb1',
                flowComponent: '48zzphmz99sfnbrv1lvra1po7jvjyf6r36v6pdj7idrnd8bsclcbz4cfid7gn5c5qkr9g76574c9nn80cnxe1d6zwxpyzxe39zip35embnbs2mvidlhqwxrpjwxu1ru3x77u4ihms87tfsf28edyvedohnpnes53',
                flowInterfaceName: '72gft5wv7sb4ylfeb13d7uvjd80nbjawxsto5c72j14sq7pfzsswln2ufd0p1uzw60dl7up3s0mgqfswkp0udtnsbd8zzb42nk7b5hozdzid74q64374koku8vl961y5kg67vi94tnaxag2ze2onkww7axoi2baq',
                flowInterfaceNamespace: 'svaxvad3x48eszsz4rk2cq8b2mrds274f32ibpuqpkkj1ujqezlxaro7znw1er32w2x2axzqv5u1puuzxnpe7gxld0sv14nrw55jlpdgoj4nb1tp9lauwum1ok97e9x7uv6xbb48xsz712boo4qjukt08iwkegpn',
                adapterType: '2iovy14b465xfw17wx89lyjhnfd0dzspp482tt4cypehybdtxwfrnivqqq4p',
                direction: 'SENDER',
                transportProtocol: 'ygiqh7m28of5nim3of9rx5yms4t45cn4hfy1z5eihsz2kuqeg1joiysstsoo',
                messageProtocol: 'nqyu5d3pfx49577ghq3acfifagipuwnuw65w34560z1vweck42gfbfdm1018',
                adapterEngineName: 'qq6lj09vqhcgepmctjc44o2fuckrczxijgqailo4i8qd8lt5gxn35zzwy88g5g9bcu10gltudsaj7fxbki5z64ud8wj84eb680mh26alei955t307uzmsre5meee9r694j2qqx1ak04ijjy2a6z8mtkj67qew7ql',
                url: 'xtc7lbbcab50e9m600usfi5xmuqkzcvbs2s3l1u9yydg15yfcp3l6q4k7rqtw6es64ytmyqnwbuft47rjc8btwj6iknhpmbqw8oxy79sq9fgmhiel440pbouhudc271l501xjfexdc8usyhob6f3imbmhqp5g08f66zmwkgj0u65z851hsw7lnrfh9gw9qbwb1fw99klml427ivv6edyzv4mcdcpd44zutbhirmz4ksh5z1hmylrroptb5kqk2ckqrtcixt2b784myj3xpmurj606xzkh9zludjgj31kk6jxos9tqyjyttrkopl0djff',
                username: '6dxc27yjvavxyvmyxvoo89mvu9xoo6muvvyaptf9wb7lque10uabxj6jvn84',
                remoteHost: 'bbo8467flymql3acxvsmzmfeksxkb9mamvn7t4krhfd8flzvsq4ltlbhn1doverm7upstxmvzpv4hhgzphyypz3j548gawc9r3rydwd7bluu1ggcf5v07juhy6qunvkeq0x11psqj23oxgn2exo2j2hcn1h1jvz8',
                remotePort: 3156217298,
                directory: 'tezpzbbhsz54obetwp1evknso6b8cqnezjgw09xu73h9ufzgeuearnf2he1c5psvj5v09wyzaabdzws20q6j55oyhz2two38b9nnqpe6ez5q9ya6mld3b9qunk7kty82qpygz51ewf5h5y92r8yjruwc3vj2uuo9s9gsc7sqhjfakt66ngtwdldg7ppd5rd52bdokenaktpfacqvdm2bc9coorxibvd2yk7damuiv1vkpz6kerf2r2sau23xno3ds5hc5fplbllpmk023xno2q9eml7247camx4s3bk9f1ighhhtvnljqjtv4kg7lg8iff16de8ae335nvx39guobhoaf8zpi2ogjaaltqwi7z68fbhb4h6bmlll1jxlq2j2m5zjh8wy0m86s5crpu2y5hl3yd80p4437dym00hvm5liytd6bgbupnlexw4vfnfgcn6e4zrs9evacg3qxp0cshwd59n3dpiopic2mvjaf6bi1rsugdivx3h3xg1hmrmqmxq14jlrrfw1391buq6xc2y1lxampg694kmcdfkgka3o5e37ajln5r1ukqzrh2v2yan2fwtrnx2oiu7lokfsol0r70hx0c4kdwokh9v3ne4jqrdoe1wtyhh2es7sr0809hfn4w6v14pyda1au1xwg73kms1hrt1mbacy9b0exhop4oead5ukozo9ce0e97dasjbqlcx81txdssekpwir1q5pgv6d2keylwy6l5mpele9zjh5udvsxj9racvf8kzvqcqnvvv960el5wuf6ww8g1x2508xszbxjiezrrgd6t7h0ekjsf7f95ll1bn5k4vwcs6b807czkw7j6voj2vgq13hi36y707zk69ov9oncy89bmrdrsjikp6liyflpcn55qdq7n119u3ag021nak8qs27ufd5hvavvr4ogk5ado6gwirhgaqa3dyof380ej5ff6p2w5sl70z1z3bzz7a2cjdvk3vm52u1ldpuk6uuek0o1q0hh0kc4jznrokrlrsa',
                fileSchema: '56mgycid2cvhw4qzyyx1n8mul1vuuooa2bnk5jkbtin0fkhd5o5rpmv4saw00djl4wxa2lqz99swu5ncxtus840kxaceicbx3h7kuxp9wejglzx18u1wm7rvglx3f3pn2igtbs0wgqutbhlvuzbo63m47u2b1y6hef1ohj0d937w1ihpmgw378hctwfp1cadbjxxb4xz3luf8umv2qhyiqxja2byjgultmuhcvk15l3l61uob5xvktdyf0acdmehfr9poaodf1zwnghmb1f10o6xlcc5yxv43y4wm4r2mavhk7nzsx6f93eon82gln530gedso86p77kluzhcrxosaaenrgblm90hz8ad6vb9ppynmgtw5mj8asjdfbjevrle9d7iube0vyvo1g0c1iaxhtx1ghxd9rfx448jj9dbl7yqjxyyb63z7kev078wypev1bkbedlx9t4w7syzf1xqcynxt7c1bou9jymh8r3us9gkt48k4saf7oyfje2cksm9vh0i8t4u3lzj41yxmj3aryn66ryrmn4nz95s7a8a46jtc5ykt81gjehqmw2tm31tihaguaikfxv07xquc8gf4gftrdv7be09eu07s2y4f8faeaebk4nzm4ru56jg5qjd7mw7806mvh6y5yrp40cxg1nyswrcekzbo2spr6mzprmdsakkrg3zbk5o232s32gtl86v7jsm1rlhs555n5eos58y0a3jwx07dxna3h7mj8lq3r79wt8qpm217lowxl5bctd5b6voeqd2ok4vwgc4qtrq5f7nhvb529vwx6rfsa7oip6lzc2j11ti22v97h6y7hs31tur7xr6pcb2qf90hu2xvuc6ah8h1s07o9r5icx8zgzwljhdh4mka143zeci5jzv66gd2g82ld6fuhyqsb0p3und4nxaf7bqfxmks9nc8biqjt3pgtdcbrzjm65rtmtnhxjclpms20tw35bu4vlo5uyf0pnaqyqoroxwpoe3a8cquo1fszztmsag03f',
                proxyHost: 'e3uvurvwd3y2wpfoocuhgwsgk7ze7yj2hb72an2s5fejnpu9zi44h1srhdv0',
                proxyPort: 9225913235,
                destination: 'jr4033nrdwhisborjvsphj23kyg597i87j9ximth7xrfh2ssdn9x2zhppyt1ekxcozcp6lqob9gmlmb07e70dolrddu75k82dq3b98ji35kblcuifonstdvjp3gcg8fj9emnl6vu4fl2itrkpsvmkmw5bygm8ra6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9i71tmtbe3ntrdzm2fzd2n8h3yx2nt8m5ek833sn34cmtozbuqazed75cn6e6rpp2uhg8ot0bpo300crki8f4z7f9ti4hltsae3d90pddgz7byn7ejcddt38jhtgd2tecygj7t0c2p2mfw4981sfwgb2f8hhdzb8',
                responsibleUserAccountName: 'yvx1r1p6seimmk0jb3y8f',
                lastChangeUserAccount: 'om2yy6vfzcgdverxdkin',
                lastChangedAt: '2020-07-23 10:55:11',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '0v4013enxw8zennqi91lwoch85ijgk7tgwr67cysep565eyz3m',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'pu8uk9svrmlayyut0ag79g7v9vyx0hrgfovjvgdb38b4xvzhfxdw00u73a8c6vhaby967nnsdjnjcmlofg802kdrp5vwoxvcldq0xltkk9r71qzkqyv1jt2xc2jach8ci2nv5c7f48hrsj4yr3i2q58usm0emf8l',
                component: 'wpapt81eoxpwlbrh302vv30sx4bay0atvr5z6l2qbmbu8isivgm6o2tjlilbrmaj9lkhm22k3zrvr4l2res3w6r3iqw4fpnbxl7knqtpbh1pu3uhtgto4c89ygipixywbgivuoyon87lxhsb4vk9gvv3hbn8mk6y',
                name: 'uepl09rqu48xctr7qfqeubbjb2x4zzpozw67sf1vp19wo2wxp78exub8bku6e7e1or1jqikym1laav4v100pqqlq4yzfiyxw958u6pyw8ah89sg2ioxr6o8h5z2l9l6f08fvgc5fmxbz1t2ct4iiwqi764marjj1',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'pk82y81ey4qg3rpp15edve2wd0vsnwfve2qmhftfa9kt3htfputfkvr8w58z0i5pgoxpqb9f1w69qfkg3r6qwfmfcwvqmevqlz30em1ba76pd8fjigwyelcgvaoyhdrb8r53czfu98nqrhut53eppj1lirojw6mg',
                flowComponent: 'mdqkqfbljzi4alz4jabm00wk92pjy7df3t6x2riah25f5v59n6tjqfotj5yyy2tvfxhs1j4z48jla8emarx9t0pwy4yep2ixebp6rawdnwyxfq8fj25hga4aceupg9ohetuzbj47hqchy0gssmolzf4uoilqx9i0',
                flowInterfaceName: 'nc79858raug8cm72d8ecc9z1g0h2a7nb1voxau86ngd21st6t1aixpq6qm34m5ledpwsjhsis1wz43kactr9lounj880xq58fenylwvob0q89i16ah1xvhewqz65rjyznbutb6ouf7febxd4j674c6kvi9s5kxlm',
                flowInterfaceNamespace: 'fv30f58y2yxvqihx0sitf8q5uqgl4rs3tv2iqdwyjf8q8tmc5cyexo9vs3i9yr9uhk6nu3ixu8sfbfk06ovo76ogatt06thx5l4lm65ov41uxc33vayq8vyrpdac4enx49xu6mdljhcb0vyodd9jnypstpa72tsx',
                adapterType: '7aqjl658pgzf3m7emguom607diyrs0n5l1r4t13wxx5x1fmzvnsklr78odni',
                direction: 'RECEIVER',
                transportProtocol: 'xnjnd22omk5sjemhyem30ka850smou368w2kiwtx9rnitpnngekyfqh49nii',
                messageProtocol: 'c1j2hamoiionlcc1dplfyuq1kqk7hjui79fu6rjenvapn6ofqupulf5rfqjh',
                adapterEngineName: 'oczgjqzzonn2z53eah3dvad2rpt1xghgtg2cjt9752790gbsfmzxwrbmd8x9bjyq3zoqkwpzbqs95aii47musnui928hertxp2figprwxp23q85up5pb7pfiee776xgxudxdcluit259s5xrw27dd8lea9qhzxbx',
                url: 'cbp4vr5nkcvtsi07txjv0jtcd6j7xna5s5faxgydwbi0ohpsb99ag6h5h60py5ipuqiqwdpg1tm233t8q6wft69pf4agp29z9boh5xe7nrto5xq7bbfxs7cx3hszq8n2gs7old3xrqwq96dg1a7eg5i62ilflb1doremic0tkfz0q1xbh5y2hg3yfwo61mkwl6wt4rnwqfohq2j32jr5iw6dah9zc8k89txf9xophihdw0qs1dfhbgmnxyl1wchholbhfwhcrtu0n58kq59vrr1bhhj6kx3jv7xbyhvtmc2z0tqp98g68ovvjy4gf26z',
                username: 'cc7ix5r6t0t6756aqw0tcqq5akoggoestoabxamgd20yf23uybf6jmucp028',
                remoteHost: '1y2wd4p642yt401x1nev8dqbmiuepklnzi3zg45d9i6d1qfjgm1k4jnpipbr26i3tm8zqpi12prre4y5apahv1p0vhvsdsry8llsaznhmss8tcly5x6ag4d15hmhkz6yyz5z8zuxawq5d2d3d62u172hp8j4cnb2',
                remotePort: 5654016179,
                directory: '4hu04ip9px7fyjhod6hpkqaj6m6q61g0etfb4m739xnza23voje2sw3uv1hbigw92jz60imauso2p2xyxhuptxwwa8p6gqcw6jn07xyo2wolmmmwegqy4vlmtwb4eku8c5mgpgg7e03z0kvv7h21twoyt7cqctludpz0xpzyuifjx5ctybq4mtawns5346521qdb5oftmgu05sxbep5g5syme5fzk8e3j64ihyunxrbx0d0oawpk1dppypbarlxbg0dsher3vbcr5k3espdwocsb5jqprp32izvu4g8abcz47mzwqgc1up43two5yu5l1rv0xi3nhg2l007mkogzhtw4bx8cqgs129vlwojqvtm3wdzk1avfkm61pyiqwtcomy9s4cl9c0qa5ls628pcs55lkaevbwrg9resoghtiterw0jqj4h50nec948n3y54a9dam5f7p378si21f7vpqd5cnten65pwwhm50p34y4ya0dxmeg8h9ql9i8e0wnjdyu1iu31mh7x2j1ynb6fpwnrt3qxrbbi52gq9kk2oncp14jvk07auka12yp7amkaemiytrd77nay51gyrxlxizjfouofc6e0aq26kqeo72zwt8iemuwv369sy2dxf9a840jzz722slx3l86uptvvgrxn3v3vlzq9cq5myqq35z2rrgn45a5q0h0tm8rw31x8jmplv5ztuetiynwigdl4dd3ibm8xdtqe3n2mow8694hkaulujxg3kh3l5pa07x0v78biuo2tc7nx2kt0bqmzskl3gsw4z8lrqlyoxsocvlyihh2sb6yip0x0m6yh5i7rp5r0t8hrkpvoz9nzrbatwecjwcelx9dglj8a73om554xpxlpeixmolmy92qogkw0ijwn27qd1m2rpn99cuqohhzhoa4dgd01c10bg4xiym3j3dnkcluwchzz7prvw4czy69ihucgdwh9arlu538ntgtcf8a3lx48qmlmbu66ylmm8b3skr0ur7l07mqu6933f',
                fileSchema: 'kwf72964faspnf5b8gco3utqqe9ef188czp1gak3jzh589tkw9wcran5cg8g7ruufunnh6tck4qclh8sxxelp5dhdsu1ikipatffnza95h9nakwct91xmbbhr8b4bh91a9vckom27xn7l5m23jc53zyqioc1wddg5e35n50uc61zoru0oxloj0oqy9xdtipmvoglstqfwiqc5ib0q6kvxigu1u6jx9lfo1hv14gvrmth15ozu0p7vubjag70nnenncb69w4u5lp422rjf07m928e1sx36368ewo3x9ozxitw97ja7ah7ai57t3phpplhaa2owjdryaoqzz8jn7pnoxilwvk0xulcwykwlpmo6yzbc16xbtosm7t4oza6qs279lmv3dbmp7ymk3x38py40rmjylz2zd0mhe4ezph7jd7l22l8k2v8pg5t2ynrzjmen28hgssd1xlsbvm26d5k4ff3z6qouah0snmak8ziy5o1wfyydvr30rvdh0zmwsz7l7z7t1l2yx5mykaba8qu6c1fr5tdk230vnhjuo1i044qwqaymtr12x60af5nn2ddwqfc688devsrlw42sflab764r1cy33i0hfv5mron3v96knk2xdmrok88zxfxtttkwnqs4fdhw3oxo43q3n33jtmwtut19ut9lz9lvibl6av7g35h47gggqik9bymwih504xjxhewbomaa3mtdkw47tw15lmkvwy2vortrjo1ya8725orfpizv6d05qa3cqlpxo6wpvk16mh2japjwwpjqkqbxxnmffflyogarpqdsyjnpg9001bugztk4gstjtzmfa3g63wj8jkgpy6p1hvgg06uxs77lktpjyk4crjf3a06e17l7mb9d05mp7n3ptpkq9hahrfqwn54q8pdilvzs4w4qt0x48rqsgzalkf2qsywilsb24sbo5ftafbbldsbk0kv2v8gfu68qbylbj1t0jnc444hdrebl7miq13yqmmx81vh78chqcd301sn5yjr',
                proxyHost: '4brln61xozn2rfq7txqqypn5192ox5f6jd7k2et7c3cqgu8qxpn8vs43kqsv',
                proxyPort: 2054469392,
                destination: 'n6i9rj7aeiu10stf4dqsisq9bqgw5nrxcky3fhbzt24rkfjg9k1j6fd6fxpxk7vp0w300rljwpfs4fw58spm2xlaav68we6nke21owbsbliv9bignfw1r0szcbh78zm226vnj3thayf7imimdt1cal9wd0flcz6p',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1d7wctys0cb4h5bo4mxesq6ji8rumdq6f65z9l5n6f5s8gjoti2ck1afqf1f1w3bwfj25g48pw6eq982bns4kffpi5c86fyxkxg2r03qg5r63zhe9tgzj04dhd57e71hey6ota9xcchd71i6wox28ab2ccx0042x',
                responsibleUserAccountName: 'magrhkcyhfcfklwmrfe3',
                lastChangeUserAccount: 'u4k3yf2yvukayex3qby5b',
                lastChangedAt: '2020-07-23 00:32:03',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'g70sz3c9v6bjglio2cewjqk76k08op1b5skhqx9u4gwy6xa95n',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '40lz3fvyuvd79s1pqoiqrmnq42yqhzffshv4qavmtbjn7tp7x6e1lcebpwx2zvdkmy95rewg5x5022dvd4f4dik1pcq1cqq74yuziytqos9hjfz6fxh35zdy7t6c2lsh8u8syqmopfjmw1eg1yhtqx9b42tf16gc',
                component: 'xtc6ymni9gepwjnhfhl1hkvqrpod3yuk7xgvbdb8o7o3qihuqe3qqecdv1k59cwfy92iw4jcqlqcuwy4zznc6swyzyg3d1ioi5dyrzssdwtbbbjcllbkkpd94co9649tqkk9ukh3yrs0l0ywk1hos8n5viv55cb7',
                name: '4ec8mj283coumibx8798koc7jm7hl75idzkaivam5jc4dhug1md9ejixiaccq28i8n47xvdmbft51wyqhdzws3le7vfe3qfiusnr7v8g892uwpj5sqfk5bxwu8zzdxf7e5z80mata0waai440c9yxv858mockpvd',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'rexr9jvt4yxxii7jzt8lm0xn2khol7e9f2n9mkxt0c6a7ax5jkfm1gld02tna3wnii9wciq0kedpdu5q9thr7afbuv2ztx40oi6xneiu3w3ij743s6va9xix3jxacqroiyp8280yaafzb33zl81fbg7r5kep75vr',
                flowComponent: 'k4hm8f18zklq3shgn8yo8sj8g5m6q536tsi86m0bsvvqzkg5e8nd4gzsk371uxz3wxcghsvza0hu0insf6lm8slqia2fw5hs7wa8yav3eeg5xs8c1azk18gffx88l0e39dg3cjpmnt0e6clsyfzfwtobj100jf20',
                flowInterfaceName: 'yz6471bs53ejqmkb9vw1twxyc79vh9rq6o4nfij4hgrfwmsx78cze0ovg63qln72s1z00mi3snwke7qf08w1p1kvqe5h5gqet2g9b1t3pgdr9wwbphuvo9dncmd8fn1vnekzx6q8fj258v11e5g1gbzi1nwioj3g',
                flowInterfaceNamespace: 'zvq52wlz7bt77xemptw19hmgq7q6x2zisfltzijxljv4ufch01z3b2oy4j6hzyjjmjmm73mdkaani509zshrtrs0k60o40avzp7185xkybd35wtakb7kmxy99ispb36vntsolyuqan8hfko1uxcwbpcgtxzvzqw0',
                adapterType: 'vjzk2ifks9gaa3ifvwnw3zcdpimqlzxdfv0p7jgkxbblwimc5z0zm1fq6l60',
                direction: 'RECEIVER',
                transportProtocol: 'f66jg5erei3fhorn05mewycrgs0en71c5cxzli928u1wxgl6582bkuvi646u',
                messageProtocol: '5jct5f1jnwwqnq4t176ttca59tsmznmxjgmvbjaugufjk0hgkn9jhydplkmc',
                adapterEngineName: 'jfogg5eaidjljyzxil1mbnhqdyff4jhdidavofaqoz9isvd3p7navsesj00xdeaxhtecb050gimcuoml7rvpbpbt7hlzu5il3nl77ynk4z97p0nlaitqfn5t85o0aq4mu1tcy7veykyybcmcoe2g6e4tcu2ywk6m',
                url: 'ah4hgk7ll7qarvvc4mcv8r8l0pxxywe36395ygsellxko3kk1hm5wvzza6pyauia3fs0xxoswjl757don011tokgu7u7q5dkzp2q64xr2c8sualsbutz4zaosbbcg8csyqes8qqqfu15rhmna49y7m4f148b0ran46a0eldcrp1s5kfbgh31yzxxfp9pt1m3xgng5fm5746okxg5iawmq77htzkw43ol8o6hyuzbj02qppnco6dwcrbxaduacdwru67yepfsw4haz4rgfh234h685metlt96fjz3toqsnsmcnqf2ayh04wq30vouexwb',
                username: '4o8nvf0o6gs017mtd363822nnkntsdkwzlqtcjtydgonbbo2mu40056se8i2',
                remoteHost: '1o7hafaps375acehoug7n0uceh9k79m9j4clmoj1ngf1pvptspqf2b5u1m4k006eqke6m8bni726xskjqcp2jlnh2t0wv3gp1t60185kp62h73qbdye8m6rabsx2pvtp2lysebch0vjtjzzz69pvhevuko5holw7',
                remotePort: -9,
                directory: 'c3k6sx4iuibbenfqpi9c908ks3jblpv8x7uk2ka0dxxoty4hnv2r27bo9u2i8j44xo9pxo4kwx1vpp65zphzhb0eqli9turi24nc0mr32ats0qszn2qfqg94yuylou84m4u0kuy6ur0r0b0peu5v1sm2rbksgqev00shwg2zv20bfcaxbm65lz3ly65z323brc96d2sip0tqtpm5cb82wec4nmv0upaduxf3vms0cx70njammktgcij7agthbmbh024xyo9mvj3nz2674u4zbuzdwqba3gvyeknsq1vto7tioleugxqavgl05u4hxkb8br04eolvvunzajy5ocpd6067hm8g1w090ekojt9l3xbdzgs6xgc7qbs60chttepuqp64l9561xade3lwipymwop3t5lk100jb1ptohi5v83tdyc7o139ldkt5z3pymb8sjjul120n96qkgc8t8qthye7nacfxd2q5ia06ou9gso5h04chnb6jr5a62x4asdl29sfmfw3fyttdza7z55l7sbtb8y9b5sdmnir0kl6c0ufzeizject7wpahgh76i1lav8qkstjow2wutjap2c4a1rkwzvde1vct4wbvymcdk4ne0ziz0a3b2rw7y96lqxevmzpqeoufdmkigaeus70a0a66agqg9846ipq7zoqhjcbjgx8pvlrw8x7tg61lmze9o93yearqwt532wuu2f3ojhsq4o8y93ikvkmo3uucz7q7ui5xssp85lj5kwk4n22cq4r9o4otpo71q3yqp9q4pomsoxze44hj6pgopf1yby9ts1hg3eozse9tir0bfhyqhnvtik35f6wegn5tj5ssarra6fzdof770uqpzvbm6e0vr489mkjp0t8n74civz5dk72rqkrp9ekdqkeyi0qpi5avprv6e80mgdm0bxq7jils6pubvgac4ui5fofgcdblfc1wi0lnpz1351i86kivefhz7spocqtercs2k5mfutrsu8xgc3y4sn4aqftgxeb',
                fileSchema: 's4kh1jdjm017accj3d0g69folk4biiog4j3dtvm0ep407p8cag653hvtdmb3oeyj39uqdvqoneejxudzrn8zf2m46xpea1cu310vqm5ioqv4agm5u0ax6co7t4lwdew076sybmho1f3mthv1sw49p03ggs7z7de9kmmlmkaf6pi7lwsdn2cksbemxdbv52248cg025sjtkiy5es3ykgngkyri5c39y66ol1iublnwpbw0dijyf4fs86pdegye8ez6hkebz5x92876qussb0amexhcp4qqea3b910ajexqa652h3own8nz02mqi1xhw0ad6feolqvn1kor4xy7ql88kzs1w7eooko016y2vcj6ol2c1vjk5n8q5ma1kpa9gz2eim63s3e006fyqx4ovx20uzpudldg9m16ax2fjtkkcfbnd4kmc325szalq9l19btaxdcole2a43o9kru1gryj7ahrccweljh1hr348vox3bq1w423ivcx7l42zq4dh6kbxyjude9vacajiauqomeq8zkv0saxv8quurvkwh3lcxe0xde4inuv5pa0nvtfdw1mgcjdimf5bxl9bjxfdtprusflihx76egacfduo5z0kc0zxtitwpnhw0trhjzbahydajdt45abhjfjf42ylziyptl0db1l4fmtrtp25mkcxib23ngna40g3s2gt64cyfhhp05tzbr8746tzoftjzaffya1jc6w7o9f77bkvy8tw4si7v42g05yvny4lls4ylemirn4mjbjqrrtd10t3pczyak97xfuqnx1p96ba0u6dad6mc565h8wdsx72z0xshqma4vc8k0cleu21fkdrv2uczx0en6xhyafdmgkphy65iedtjao16g3z3q7j1ofeah1gx8hzid2maif65164u38fq6mk7yywqtdpathltepflnlb581lyby9x74uvf6f1hbaitxwktspxxzxt3h9htvkgnv0fm9lwt0vdpzls4jjf397w3997v718j1c9nstfi',
                proxyHost: '3q58dx50e46amcy5dz3rqrnngal0i4kn5jfyevimtru62jjx7yo37gugsl1u',
                proxyPort: 8111237207,
                destination: 'wtgr5ftey6u31nlhuamre8qt90l2y8yz0bibjglrx7e2t8vqw8ay5qarjtiklvt5v2ue9ev1d48rpe9t638q2vxcz0m7snivcslg0jbcqcbe97y2ol5clrnctap5otz1xagwcoulw8sy53199bospm0wokn22eus',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'okblcyztbta40i3lpjxo5aptz1fpnwu1ceu8pv2h97y9qoquodca9sbieybo7d37x9lvf7k49w198nbpd1t9nuoj75g4qkf8objrcl2h9cjz3i1elepmpsl17t3x9jcnbg1m96fvuf8fw7qmxda4p12raviu93mc',
                responsibleUserAccountName: 'tu0cf9so02hocu5hfqcb',
                lastChangeUserAccount: '05juhdw5mjodq04xv0ir',
                lastChangedAt: '2020-07-23 07:01:33',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'drzt5qm4vgld9pf733cuu317odadcxidmzdwte20rw6pulksbm',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'odftntlezkmctr9n0j1600yaeyqq3ennwvn0x0g0s9ses5rtxn7vcng4d8alj9l5nhnfu5q2l7o6mwqricxk8nkig815joi9egedpltl74yz5zl6132ppmj6lnhnioh19ov78apce200y2yc6lumdejb88igd870',
                component: '0ztm2jg505itqp9c9hd5oug30fl4xcrfocw0onl4mpeyst4zgz851ohba8sksibjny0ywyg0dkqj47flc426sysguqncgp1zealtsdljno41v9bp1l6w8d150fkmyh714jyxjlmzrfkic4s0b3t7iftzmzegrmpq',
                name: 'hksvjtnmp5c8wo1ke4l230u1tsl9ht4tyvh7m8sgyu2uvdm2ni6k28q565g7q7147gabod2xpvl2fvqt4qlacrx5gvukjqj3tqh3rgdithtozyrzbkfsksu7ejaxqqh91ev9v2ubfos5gtq6kdqxvnhkb9trftse',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'cha0ixd8sfpqyf8hkdyovyw5qvsvoiw22p66n5ort43vvhbflqm1gcd6xt3awz879xm98xcl4eohuzlr9olwtc5d3sknb59qfzix9wx0x5yldjm04qg9p8f1rulbm2b8f8rdyacq38isxlpj8j8hdxz2b2a2iqxz',
                flowComponent: 's7tz4f649vkv8dtnhvl00eeuyvki1ormst0apf0dnprxep52ehi4elh4u6lcrbtrleqr58ktxerhljdq5zi1fckb5edwu5w6gpck3uthfryny22zlf6jvq2gmcgs122sh4bjii2tvf4f70czbrterrbgdac1jhbv',
                flowInterfaceName: 'p8a7f7q77jnjf9s69d0y0rfg8b04wkyq8lln7zr9vii9s91q9172dl6ugzex6v69srn5aa265aioa7q6df7dd14h691e5nrh3c1mb6ouohdyusywwulo7vgswqw95r1c52dr9ig0c6kmmzh3rdsbm3hckix6rsuo',
                flowInterfaceNamespace: 'fpgnp5pfbesx2ett24lc4p3e5q9yses8c6ez5l5pf9qud0ueqaftgw22s8ar59b2zsopu4n9qf3368s9lee894xahcqsw2kfyq40utpnxrbae1hd3k7dw6cayqsgvi4kfnx7ehh4vqcgc6hlwacskjpkzxl4u6op',
                adapterType: 'yj1lxvx5ztciews2qss6emucv9lfswkt4748i1lef4scmlvzsxov7p39omci',
                direction: 'RECEIVER',
                transportProtocol: 't517c0zs8nthuw46acmg81qitochxrwcpmmjuos6wy5gkjs605ed1fitwghp',
                messageProtocol: '1a1c71kj43bdng4npb81ylcxjfkul7mw5lllsphrhyyi885r066tcajqw2wu',
                adapterEngineName: '51ph40lre4wnk0pib1d6v51x3vwxifkpz3mwerrr0zky7pd6ysav94e25ypai2nhbf1mpmkymq0caqb8eksphbn9lf2g2pok16voh64md7arbtk0tw5lj4ehsyau56qmepk7f1ozbxqxdjlbsc0ajkr6b032w6vd',
                url: 'qero2vpsf4pe675xvbu3m4arerflnkhwz1gshlt7uv64ut64i08r5slrhurfbqz7kohx7yphywv4jq0cc7xdqiieasb8dji4mshk94erttqnoqjdmh2867kf6e051t1gex0fz83nno1f2mqrhd87av8mglk629hnashv9xdgd7ay57czq5e9wcsfqgycoqz2n9beol6fp1nul2niku0grhagp6weydi01n9ll26yhgg6vv5yt3lz81p2a5cobhsrxn2zlo50h5md0sjl96zi8yquqmiglge7j3i58uof0pglu7ub5khxxh5p6o7bcn4c',
                username: '6zyxduko5ycfp6myqm5iarmg17nqi93nk7a5prz1brj1jq4px00v9hyxg5vc',
                remoteHost: 'rws6kfckjo1kfl4r2ydaxen0l23ap5ghl6lmpi12nq9ci1lvfb3zi0g8pvrri55koqise0zk9me25fsr4kdtq01ond1emqtu9qtc25e6cd6130nwh2se13hw7eavw14dgojln3pc9037teayrun4ng3nh0g35fa5',
                remotePort: 9826060398,
                directory: '4vlaxp22o0w0mddkn8r47itqqi6ojq4rsq6llis0g1hdfdf29h0mfiv6h1j3chonmlxai83ktzxhg245x196pg1qagf8r9rcd7iylbglo7t3sb0f8w1b0zre8w64cfwrp4uvcq2hj4qto59jf4trkuyj5rm3p2fp23ts42o1w8gnldcx3rh8d2delh77aztu1h45ktrvfearzwv3pxr20bqsnmsr0hmnvw97e981b3y59pxtm9z716ed1dhhi3d5qhxcfuhtqdfh7l75ooapi2463haynad0xpl0txxl6njbpzrnzi2kdezgiu7ywerg4cb8h0j8t4lcb2d5vgi7til7gm1i7ugoeotxipcfhscpmpbtbi0j605utccea4qr7jtpqvrkdz6o9kmn0jgnmkyomonppkktsp8pkp0ckb09wtltithnyqgknvf3s4264to10j0mql9qm9gkzlliljanr0aahbjh9dll0bjqwv3e1m4p7vj3pioiru3jmgr6yp0fd4qaiifr3vwg3jb305su5vytrnwxh2lemp2o4hwwokf316wvmmx6e0e87ljcnkfhfr1hip3mjp75no5lceoaexuw3u8l28avyh5r5h355iu0wdw46q09aganyae031n5t2bdwp8xr2736qpo1y25wwdirqy3gj8rh4ne2izstcqz8dmhu63u21i8pxquqz8yrg91fq1j9vo73ib1opnl7i8qkkoplm4tda0gm5g78czbu56ilrgaindayhwgjnrewju66eior8gzwol4ulp2kv0ajycpdfgq4rzq68uoq2au8lc4hfayi1ggowdiqia024edveofczrohq3owunj8mtal88dn00vwcvlnzhqjjxtp16qiqjwo0sdzv1g1n9e1bns7erm1jpj8mouevmcglb7evkur5makdzuj328s3ge89to43xoib6drz5tsajdlk8ujz6avabbhqc1pgu27097n4sv93x9xkb6ojrcmb504g4x4c6oc4jotdqd',
                fileSchema: '7heatz87fxqu55sr4vmkfgy8m91ikwjnebupva7vs0t1aqr5hfdqrkda43rclth0a26l82mcr75almu7gh69q934hhtm4gcudzwqc1yhkaf1p6p414qtst6bo1s8ypwbano9som5zek8p63tcejfbwcp1uh1yjq5cj7nzgtwijdarflx0fn3y68w65y12p5p4tpgr3be16pmr33eiim5so40ljh5c3udxgu84m0dbqno3e0byzt32cy3s1feplg3jgi67b29bnj3rz1hzf0uzl0vek9sfn2zx7guc3gqdasbjqu0x2fi8b1fkwuwyozzh2ds6k5mne7j53wybekt20tcccayo8694xaojssv6g8tpgckdf5z2ff6vjlx8v8x3sfb8psr5covh8vf7c2qay88isdio9zirazyciafjd5j2aucfy5q1flwsdzsogub9r0omwe30dkykmkf7pxg1872jdqg7wv23gfv4tcwy4g4b31t81cfxn0f48i9zytybxad3ktl72amghy9xaky2mi26nrhh516566mvi2lkfr5cvy8s7tnui4ogeqmk2w52rl01nv669p287wlrutnh0pnd4b67duv0hwyefk3byaff7o1xwmg2z9vi5067w9im5q4240y5e8mgl23j5x16aju53goo855d4lhrcywho2lntkxcejwajd5onnkbgsgkmzlvtue025amtfdk0sekmewh0zc3pi7cc6wd8tlq9w9otsrv5dzmnc98s45gg07i2d7p0m3wjis7xll62yq0g1q5ztkefesuar8sh2i31orq62q02s45edhusb715p8h909bc807gj4x96jz8i1bkl6lj7rc931quy6fh4bjn2r71hcp95z1nrtg18vex6a3y1h2ak3noktb25l1247jbajym2dftc94y6ycwqzyw703jljrvaa7h4hbb4xbr470d17w6kvpgc71xjh1sykd3wdlfvc9f13mlftly7wzq0ioqudklxirujrg3w2tvpe',
                proxyHost: 'bm9p1undhawiz0els5q50mnd2qwewhkhjovdm6ji7mqke8sjf9myj2uo885x',
                proxyPort: -9,
                destination: 'f0hnwshs1h2gof7wbu1x1bzj2nmtwj5edbdq144ry1lu6jh4ydyeh90fsjwuhj2y2jxjly90z3w58zl08jmphjkoksikki0umsvg251anagfrhjndhnen9qq0osov08kv47asfvps2ialp2ozyu53mkgg5qjopik',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'n7sv1yizhqc8o0bjgaq0zjffofk02iihbs1er9e81ibo5gpe6gvrt6q43d7dxyu3rmg7cytg7u6rlptytr8vc3vtjx761iphfc0pil5fuzsfuh4s378nwwwji2z2t1362fr02aiphgzmzi1221jbbxl8pwlz24u7',
                responsibleUserAccountName: '2i05ybhp34y0wbfigiwe',
                lastChangeUserAccount: 'fhfr8o2u2u5p3kgf4am9',
                lastChangedAt: '2020-07-23 00:05:24',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '2sx0k55dz6x5cxnqp1iqvv7u803pdrnnns5l300onyiaebv2mr',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'oz4claqihsd5754el69wnexulr4ve663z2fiboe4zdrmgghpgm7tzjirzffv38sxt9dwn7c6l0qi7e7tzudatsllm5l3tksufu3md0qeg3g1e2v760u7r4bwgvtfxw03ocpgpud4zh6npo9wwoi4mndrdos42662',
                component: 'bje38drbn2856n98i01qhnce057ay6vcnufumsu5a4j8vgk5e7g4ojskoa63xnznrkegnxyfmr9vz4ctstvd6ys3prgle5xpk2vrunyh3dq5f0dm02wyc0njgfrlg68vk8z6pk3hqt7jz070xpya9r7v7aq8jg7o',
                name: 'o0jafyk1eduhdll1mkdcgq4ihdznzm2zkpfn92w3w9pla3zzwnnwp1ddatfew9r4qmto3rxlv5clj1aah21dhtyhbyuz8szh1wgdogccbto63k7gzkcdj3k1ao084j6ntq1d9gqnikgr19eb5v1kbpbhaavquuqt',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'jfsnhju2ziymu97j2gfavfxjvcmxwht1atjjkdl8vuccam85h9jdpevqn0kah03b96pvcps5mceop6yyndurqwtahn8mv7h7zp8fhp1dzxfj0k3xorhhnz07e6qpb3tlq8u63b84sbr4di7gxk1gvc837iio5olk',
                flowComponent: 'wn2z5s3drmlmeyox6b9u3oz3387ov6cbnd4f28jvibhk061ajd1de9xvatw2o0nsldarzuoa2tgxgekux999fboa5zsc0m3ncpjqywjx0wrwstb12s5enck9xhj4vlext1e9g74yho5wqoapo85kldd50jziqzeo',
                flowInterfaceName: 'dlp6d6tvobaiyurnttsfeuqcag82bvmz50togpc8rrw1iewq1l8cvlcyqine7uh7txzi5fpylr1z6q9cazm1zo3qdf5df4qa8d62pdlv6ao2k5z8gkyh5tx2w029qcrmupxejokl7jbjdfltuvrxpt6htiikjqtz',
                flowInterfaceNamespace: '3qn4xh713773ua9sdko4uiovmp52ywz5n2php6nq6i9mths3cf7na8hgbdmbrxiflat6n2atjlk866391rlpz37oghxrp2o4y4wd58cdulchpxsfsld8sz57c748uxj5vqbswsq8a1e0gf9tj4qlgddbli7hqmpd',
                adapterType: 'jdoymosv96v3u7jprsdee7p3lvmj0nf37d7ue8gs2t5k08chknim188cp1ik',
                direction: 'XXXX',
                transportProtocol: 'lqqtv3eeclsczozbtwlqity9l3jwfcg3am43gp63gy2qcf4xurer8a6y0hs5',
                messageProtocol: 'ubdi11r0la8b9qq4a9h6u0vyi2bfmcn4vcfwbml9e11llfj2ok03rvexxh9l',
                adapterEngineName: 'lg2shuy6n3hbvps561lc20b1kvn6drxqm81kuqfzzr6vk254n5d25gp2g0aglhwh4r8f67efheycs1crk70ifzusolqc98g5c03tpint77rlgm0vswsv9jeb77htj1t2d36fczpn0vftezj3igai0r5ovxcfau4z',
                url: '7p1vygfb9q7fkh7dwia6bw243k2n5s9735wrsaozq7kknouqbs0pwsqmglrre9teas77ajiw39vzdexkaizbtdk8l8yg1yftznmgy6y4t3ajpnhpyh51h5pb3g358dffzd4fkz7kv56sdgaynhcr38ignezy9rnd3ml5i1pfx0sl28y2rrmcls7o799kr6o8uxrj9d6w2y8m9bxa61awdl3pplbyz3sxweh900im9my930ugbw6bbvx1k4jdqmfka8ghsop2mk96mpvzgab307kfuf3ds5oh6z8fr0fmotqculxpfxwgoyvo40wdc6lh',
                username: 'c85v8i2zcm4lpu197d9czxz6aj6prnje7v82y4f181vsmsz6g62u0uh9by9e',
                remoteHost: 'xzk6aqef74zz1xbp67h69es25hxr0v6qhs826on2n4l6n3ez4r8zf8l9329q2m6rlgn7qdf7vtpxixvgnd25w2h1xgsx2oa0kph24s01beeaeo3qbtgg3rl1retel0qeqev6p1x4jgg4agxnvdqe4tl57apofb8x',
                remotePort: 9933302076,
                directory: 'i0l364uy7fu7bdm33zmo0urzvhgsttrq3lg3bjehzbxzkbu4awq1fa550h4y9fgzajk87pzrf6evhfdoss6popog6hl1xub83dbjw5p4ne6azgrjlyy40s93dth2koub2q1md08vp3sioipd334enk6h5ih1i0s6m5qgo7kpmtjhi1hdy0rafnafg9ikql0y7sv3kmic8tkgmnjcxuf62qn3n8qf2v4yrqn6l0o5bjs2frdufagk4w644vz346g1yb1shhvhjvj0v6sjbvjvyodv7hy9f3pfipvlg3keiy388qfz5o1ux9ub1la74jsy9b2zpkdcbnaospjxiqglsumbjq9z1u3yv8qe2o0nq5yyl07340ouue8k6i8025srrua2715wz3fjw6m1qqtfr1yrgvgxf2w69bdrnxqin8sjspd8srxrfswons7f1vtpbfcw358ug2vvq89mog8d4vtp90wswgjdsuqy7eahjz7utuzc08d5rw52wr1zgqzo47spdboet87as1fx9g815vy4sl3057sh92zbb1ew9axzp7bq7xtkiv1b9kvw81tyt6jsw24usx3g99ozeq18734tqr3wgzc36bghrkm18m1rnrx405pdg1a18tvmsyz4htk4dislnvxryk5vjdgbmcvj8yc1v6n9cdr78xxox8nnieoxn8xu9ufnu96puldkhkfy875a99s3mt107mcb46ab37sgytl16ezr00lfob6qu290gj2wo887kzwjl8v0ul3ikgd8nlbwyj38j9pk30z6106icsd5h6kfotqlfz22i6oqez8o2amsqt10n17asiwxunt3mswije7ysudo7nc0cnssxgk26cfafjne6243brcj0eulz0gf1snwkf4t12t2pklrs263sqg2nl53ymq5vr69bqcr7vrrqg8soeyg7w3s8gftreamus32v0fnxwi0rfpha86pvxyc6u65q29u81n219cylpz818ixnfxlv62dke11qktr4g2jihun',
                fileSchema: '1bhw5ptdef5i40429mtarhnzvsk5n429p6murw6er83hfljmm3b2qkq5599c2vgvy9nfl2noido9mhb43cz3d93pn1ivjmsja5fj5uokfsmvh4e9ynwt4jmipkghgxyo6kd370w1pcfhpkiliw5pa96078q3qsyrkr9z000usowhze8a3aibo40dfq23z7evvfqfzbqnogxrmqfhtl82h68mi8oeepy98iycn4tsc8hty8lhop8kcfp950fbymh07yuqtftfzb0nn09uix58nnbalaxg0r1lsh8zditf01mhple742xqqi6asz1xno1gkcbi462dfo048akx2t8s0sxfy5hy928y1r216h1er9fz5v2tvno9asku4d5njw2wa5v9gh20kehcukmyspic74yuug10yik4nkv03sh3nf4zh0vqllpngxgvv8yf327bs75lsyu9g60okaioo5mkgha7v4ovjvjhqk3we5flu74kt6l5k2eorj9tm6svjqkom8nc84paml7q02wh5wrmtd7ggx3199c1yq4czhuywj67xdpqkd4ntk64i0g5mzyxwyn3oofs4gx536yt4hyloa2l70nsh6mpqdjtoxd2lqk5gzqkhbn4rctkijl6q4u339q3qepwqxy9aaxnruu5obfrd6f70j1n2d9w0e0ebnbkqiw95npuz3eetopyjriyx6k9pzyl3y1w6en01m83s1htek8x7n0d7keluzui42575wne9dswydxi11g19sihiu1096g17dkeor0ucdq07b9h67jqx6tnk4hju578sh44c0tfs5u5wkgu28ltict45z7wamrffjs076b442yg5pay7aypsnspkm9j1v9sl3vaj5t7dic9kurgzl2nk4hrooz1lk3xg44qlihc8rdd6j80or44tcxglt3wpau1z5qews157a2exo7d7gh0n4un6heboa40pz1fi7qvtssqujc7n6qqko35kxa00xbyg3acp6dx0xd1bn247tcrn73k',
                proxyHost: 'exug30x6u91313j3ctvnsqzxvpebbl4ppe51rn9ihx65tysya9ze6j2jb6uc',
                proxyPort: 2262644045,
                destination: 'mgkpeq3v8bx4h8f9n4bbvr2j7g149wee9i9jzaornm8ktei1yva5zmrrltoul93nu2hs00may27gh3cx3milew8a8b7dlnhxze2ylsth2rd0h2owqhutr682vuvlxqe13z0niu2wbxfx58qlpvf1rvqplghzy60n',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ibns084ju3nvb2fqje2d1i16ljtq4ds40mm89fn1h3tl59dfhpbdk2s1iz4n7vpp42hsdqlfv6wtjxorcb3urb4qfw9xybqpt0n8v640k5di2i77de3rv36qfkxcg5arfrtajs9q0mghhcgn0agt4w1alm21f5sq',
                responsibleUserAccountName: '0a09i4rcmibju1ubpauv',
                lastChangeUserAccount: 'lqbdwxaj0bpx7kcychoa',
                lastChangedAt: '2020-07-23 18:14:30',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '537jd1fk5524hcngli54gt33xkm8b0klj9al5wx669ux3vj7i5',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'rje64ihv9vrurp9v702w56z9sln540xkhzybk9phiqpfhjfcegi6pmzv3s40nnry5o5o8d83n4c59du19tlrdgjih0u2xmsh6desnleacng09eqjt1kts73ipdaf05ska29psm6r0vmov26hlx79p9x4dtwkd5cz',
                component: 'ohy9j9gt5v8y2m64l5pu2qrbrcy3ioehuysnsgzgzn6f5ax0ysnfbez1a78wx0mqnucms9m1emsv6mg7qruvc48dviw5cineq1c303zk4ypoxyjioqvrett5k2qa7x7wp909xsb1z64xj6o3mj8g7r9z31ukdbbo',
                name: '6oib940jv4ph6o2vp0ubiz0ly6uta7udtw2r0x439b7fvmsmq54iwg7s0c0r6r40wuosa9zae0ae6y5ifmhsysg56h6nuavazzn8v13b3ei0t1h0xsuh3fuu3z0zgzsxfs6opqom5dfmxcci2n0r8wnpkzdg5lix',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'iccy0pfuhum1btqox4thopgir8n609glzxwmkfdjnccpja53ane5spv69z49w9xjc3ny0j529ii46sftguznz0rrd4dzcdaeg2hd8zz492h4fml03zmh6ssif67dqp78m7ju1rxupxmg6dlf0whf94nz413llaiy',
                flowComponent: 'qy87q9sxcx080s31zn566ldx7pjvt57aquhzkarfdu9w6sclv2nss9tonhdne63zvd6uuo40qf87n9cpxsnj1l87e3x706xjp6usi8ykehmpe92eoiu6ktzg6lx6k18hoi53pg7hv7l3pmvy36layipa0vcb571j',
                flowInterfaceName: '3a8z69ayz7s32xi092jzb7sfnvtmd34zmko17xadp1b6kpzv5l3l3nz57v0iudie1sxcoegnx0qp1qcmhv2s470twx12g7saf8ndqo94k5a8k42gmbtod4atrmfqgw1m91aauc1p6dxhvpymeomstwm03e1n1ch5',
                flowInterfaceNamespace: 'bffrternjn06oj32kn4r33x9emq2mrex1bgj2y7qfjpokssj8j2dnu66cub6bz0gpl0b9zzfn0oh14d1egvkfxc94eovqf97yxq0kpiqqbnm0vyv2ymt8h10u32m6x05v8yu41oeaoinhujaytqda3vt5cxm60sp',
                adapterType: '4bl5pl03kerq106cy3cg61vor3tipptp99ng3rb3e58h3apbc4vj2a3rzfdh',
                direction: 'RECEIVER',
                transportProtocol: 'vmeblkg1n2nt5c7w9rnltbywyo5vkijg2on2268chxftvkyq33a7g8bc1uk7',
                messageProtocol: 'z4qzc7z8sjaxcx34f14b4adf7xisexahb1d3cg9d7lb2bzsi327lsws0rddt',
                adapterEngineName: 'myc2tew7w6xmdqgmm058lh56y2cuybrxsll2f00utu3xiqtzmo0xb5o8lrv5eg0vj801hieykp8uki3udeb8daq5irat7ad7le8sclmdobtkzie0oprboychfmjy18xwltqnkgemrn796yunloskzbsww9bfv11x',
                url: 'a8jjb4vb8fk4d7b99jk4npvgqno0g71pk21nv5nk4j1cicr0kjnmemd9yxpxsiyftrrfdqbzwcknrgr6up7ubwyyn18o8tch3rxeiwxgv85j4yf4xjf5inr2mxkb4g72t745a3mu8qbsm7wqa7v1e13w8cfuq5q2whshme0usaka6zdsa9r464iuak8xyawhojmxaeykfm9tyqbnn6unyw21px4fwr6arq1j8lqqcla20d6zhcu2jd2zy6gilj0jqs634l359nwyrhp2sp443j90ft98g6u0gyazyen89ekjgucp09z9utuc22uia4fn',
                username: 'f11sx1nzoy1dul51fzzqfvjeodu1let5v01gctdxnmgxwvx3evnnmcr38c7y',
                remoteHost: 'la5edhz18dte40ly6puon3aakk6get8eor8ru25l65eo9wir0e12mplm3bwzncyem6zy67uol56bpvc0ihuurvw9walgn06t60f4ir8xl2wkmfucibwp8i3lyg1pbadmhi9dobxrz3o7r4muw8vsei3c6gew77qg',
                remotePort: 4098851768,
                directory: 'maxq9qk8qbua0s772wvi5rk9ci7adngblpryhp2h4m9yoksjagbase5evwoz902gyuv7in0o9zlsndjsl3mklpese2hr4iria7ahch5oks9zy2583ruvtc7vlbdydt7oks821bljcrdni5haek4eickyzcyy985yj1glaogqo83q0mrkjjm865hcbel1gt6dop0ngz7ice31plt87ahwqnaximskgyycyjgexyx87g0zvtheq3g2cokpugc2juddfkpjccm762u5bciq8bc4yyvmptyc2aebgz3z7o5eep7vrf4yeh6rfoxekk1yd2j5fx4ejnq1yf4hxxi6l7rwfb7b4shfwewjl3wmwsnkx1mejdnc4pp9rbluvdaiqktel2205is144riddlwaff9fuk7wfvjlr8wk67uwfqa61qxuhtrrme0ezp9xho12v02ozj86y0huh5i0ahpll97iqxmdfcg9ientod7vj593dyipkn4wbq2fvet3wrtux8e5nwk8ns6ggcf0faaaerbclj440zqc0zydn5irbimbwpp4wqnptz99i2wchx8vn8e0olcd7lumtutbqzuzo33hw23l2kzcb999qbin9h3wlig4iwgwfxqyr6k8l0zk3lmarecxh2qrrld7x0qnf4gbpjshrskh72sage7n8li2fgt42hnzfzw00qyliublr60qaiual11xo0vab1v0udp04bw7ge0r903g4iopjtpkhugbipgr8sq50z83ommnt216ae3j0pgc4bmlrm0dnahtgapliziyzvdahx7vdy5s0v0oamhp3v7hsbnjk063jwpbjh4xiprb089zu523ab20bnho4jjumfl3e36g0fgycr8u2lwp59a8osiombhbuszlf1htq2nnkzbibc059llkxc0ige25v9pn3c7qm22spx1t94rz8mddg30vkveps5rohkj3nijofo5voq8ke3vhq0s5047781uzqavk9gv173cvieso1vyigpmgaf8agnz',
                fileSchema: '2zcp01bzrnwwq7szadzxxdmmyjnuigmpzq4hacm85r81gp5dmzctqwflgncggmm1w1ou4l24wb39r1s684h9vlgrdvomkr4bzbierwl3p2q7qudr7had6v9yzfi704iajluj7n1m3kpitci1hvqfk2d0cht2i51g3b2o3k9bt3ss2s8ozlcsppfl5pw03ekbtqf2wjesh12g874ie2yplvm65ho59jtzsb340bsnjgqwrjq0yct1dm16sqg2eshmfj52agkjtrebzg7wyjyq1ylnewpq0r7l7m5sib3qpepdczholplcrettiuxu5tcwhaz4kdryybktjcuj8kgo3tdpm76ooskpwfpazfs059fulbi5kse9cyypp2kc9zf5yc4li3t1e3qcy87aqw28tsz7duq19cedjdck7zyz0hfjbpunb7b5hah7586mdnilqh6o9gkly8vxwgyes010slc2xuw433gahgjdcikqfu43fi7wnmr1yc5smmc82gxz44hh2irezpgnt1840lde91trrwbkxteug8lvwyv4lwsy2h8gkk7kfvz11kjpi520qc2uofjp1tphd1he3xc05xtl9mmndeco8tmrme8bdttraveohqmqawebsw2yo45yhpgmo8lrj30nj97sqjyzdtupt5yu0bj55ttosymxrpts42sk38kp804346qe2v7t042tbgkjyo88ginprfh32kl8s705hd3k7z5ude7fiankdkoz5pdt4cbakkw2y2r26tb768a9a86vq5nzaufddvwbebif3ywyrg8kmltjnpms273v217k0rgibrjmnom7ypy84jx6rk7ubc21cdy74j06z6fcadolvlta2u4oj9fvzjvd538vanwl1yfu4tf517akig112gispb0wt8fehh3x80onr7e6710hrwm42aybvntmzq2id1xe213150yj00ywbcngo99m0n8tcsmb2wtwi25xwuhaos5zlm7ws40wo9xyfc1veou1esmyx6zm',
                proxyHost: 'gwvo10m5n5y42f7cux3bx0qtor5lcfa1xayr0fajjba4r6s5i7gqr0w3kszi',
                proxyPort: 7552956399,
                destination: 'oy8ff9zbyxuic69p37v9pv7x381762u0ckj5qwe1w526fsnoxz7tz4kg8vhhh1o0wmqkbu04fxwm068tr2p6nceazypso2fyypxuuc5ducqxwyq33qqs1quxv2xwma5a5vltm1v9s9xow9zfuka9g7exuz2zbesg',
                adapterStatus: 'XXXX',
                softwareComponentName: 'a0fpcl5yk9vvv1iaa81h9abybxuntmg4q2mume4ekf9n66h298gov414t19lm11q7jj9im6vdmb62fqkh5bnnlb6zfckgtfq4oo3uh82dhgwy4uh6464vhewrhk0oc3rcawrflocwugk83of6zo7gi6o5ehyb10p',
                responsibleUserAccountName: '0f7onpzenv9vi7t7xsm8',
                lastChangeUserAccount: 'adp852da4yxfv8x7evmt',
                lastChangedAt: '2020-07-23 05:37:49',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: '3x5g1ymygd6hqc0c546bx88s0pu4wxzldvkyw4oyieb1tu4ovk',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'yzrdes9iloaota5np0ckc8oohs6ik4eedbegrrz80efh0szx35txxhl9xbc0psfbgtnnszk1uj6cu3edvl6qg93qp726hp8y84yelj9pvidhaq82cdc83yohi1qcl0r8w9lxk6lpmy5nqaexljt0okktytdecz8p',
                component: '0a0ndvye5ucodicybrdnlnntqwp5ngiadcme602x7goi0wl2lhv9bs04ezerbf06t41266sh6mhthb1gph8ypgt6wu8oas4plkmgkjw1rao0upgye125p74xs505fxseh7my8nbljgo4u2mq6ksulypeafuuwvr2',
                name: 'bo3yivz8zny4tero310md4676m7h2845t3irld4izdvap639qmi473d1ipki35njgnzcyqylhjgml8xc89m3ymbvw64j5v86m6w3v0jy6pqdvtjwhm42sy15f8ue393aslwkkaiv7kj0vinh651g33o8l8zayu0r',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: '8hnegd5w63gpgjkfhma8corw0rwv3ifjwxtv3t8ow2h04ndmobmzd9uhj3bydxea0j5mi7s6tfr1l4v1m2yymfogy5gqid58qedfrql39tb4lpeanlw973bquw89z9wkvcts8ezhgauofijtrlgjx38vthnc1gif',
                flowComponent: '72ow2gdvbs53q27zoiqh17pifche0ylxv8knwa7vc61orrfjx08lsbufx26zj90zzuu2b8jhuzd7urvmkwr39j2ae5xmhlmfesn29w05qku3lqo5fbtc6uuhcaero6yokslkdfteju6ln81pyp8jchcy5zr8ue2h',
                flowInterfaceName: '4453osc4dw35men70shf6zo9gkti01j3w6kxl0em6r5m2s66snjnmuiz29sv0ttw76h7bv09bspd7xkhlba3u3dbr2fy5sejrjwkmbl03gf4ww1yf47clybg5tuc8tye0sk4xt3jcnkv28z4xmll80alttj35l4p',
                flowInterfaceNamespace: 'n7dhv3q3byvnordw1mfnv1auzirqjtolgu8h03m834bvlup2k83xcjeooixxdynko8pt4rfdddklhqi662s9nzr8v361fha3cqkbq8br1v94cca8a5dfil8fwrp8nm79l6d4ybbt0g4a0sdzu9qjnrlop9fpsau6',
                adapterType: 'rzsymwonnil3tqb1v2wn03je17t174wwxw7r366pyrytzsb6fy6lqvrjue2y',
                direction: 'RECEIVER',
                transportProtocol: 'jhsblzdik8zyoek23c3q80c2p6ya8zbzx73fur606nzvbn8ob0skda1dqk3d',
                messageProtocol: 'zh1owe6wwzzom5mzctypxmyjld99lhiy0rzxrnt9e0rbihp4fqd6jrp89cna',
                adapterEngineName: '4gq7wlyw31bd1s0oa6y7g25r9rnjua5k80g8sq5c8fbpsu55q0i2sp0zvjn2njgx7upe5sflvtpe69labetv67oky57ec47oqdnkgeg225uya7hypq65fncnp6gon694gm3n63ouliez208y7vkpxm1tklz37gx5',
                url: 'cd4to8cexyx41xlhsx9oo4m53vla8xsyb3qnyp79dsmyjpbclfzxjwk8h7zk7avopl5wn7rrhmauoavxe772rzdh5b8p5rn1ha0utvawxrz31ens8ppg1jotyd60qhuoxc9lulw5z1n8qm52a1r66nsxosqwkwycgc9c6yl8zfgxbn5w1howlglzjgup9o1e1hux3nije0obmlxz7md2erbbobng58l5uwwdeuw1508ouyjz9i5uvxz3wj2d16yymo47trgpx9cb5cfchnh0yasa8xe17h9ymtlo3uecwf5bf9dztwl1yq2gjhlz4nel',
                username: '4ggrrhpzm0svn1k7jq4k1hs58fshussanqxwnicjb5net1zvaplbgp82mwn9',
                remoteHost: 'qkui9il7ezgyku00q3doojes23guslp2rzc3442rtaoajg0w6gsekckb19hxvfc40amrvol8w7wfkix83ur49itox1lx3syzkezkhqmwwgu2ypcttx69roydm9tc61pov685pl8uo0931vpi0w3jbfq7lbow0z7l',
                remotePort: 5192978273,
                directory: 'jkfgzlqjvq71biu4wp4bnj262v36ktpv1utkapylnamvfkhkcxsr40g3iwnew7qy6svaf0gkms8ye04dt3mqbcvhcy6ic9ktekjfl8rds5kjthtpdkgkdv5ujonptt3j3hmnt39e65w1cgcp6jdi69pu30mw9jaoyegzo9r0sgyx0xbic3qldf7376gzma22vsr35ev7j4oiqf8yd7q8fmfoiop9cw76ntqp68fahfpt5fl5y6esp1exl77jskviu4ix77gxxauaqxy7awsnnw0sjcjpduie66u69ve4x8cr4iqlotakinzkp1ec1t2z26hkhq9ottyo37g07lui1f95eqhcj2m961t3aay0tm2rqjp2jt677e2p1z5rnq8ozkwrxgxoq5ea43owtbpokdf1swdw3rcjtb9lw6xpjxljhf13js30l6bkwtgqbw091r5qzzzg0mvjlnkourwwj1dwwzinlh5ayl6ia7kbsbgez3rdbqi9d32ti9gvlno1fvinc4npfdblb1eeptie9n5pj6pig15cctgb7g5uel4747pxl70o6zeth6bjq12opyffcktsfyl4jjjvvsfz8thc7ou4m7fkoyyx44hrqawddwmx7pgnuex012r4ffdfx4tc94vzuimnxaz8yo7l7nnke44dv9jkmwwdxg1yqu7kgts9g3mlq4yaaea6u0ayctffgmnrwpg5xd6ntsstu14avbfsmzeropm5tcmqrgbzxcra9qxv8b622czont3oty4glvuh1ga901c0rfr5lulzhutdmzu6se93mghz5iif9awqp6crynefvyc8eou5u95v9saeufyt39mvrnnyz3h5o54xnzwkgy0yoibrc7lv6y4n8wnpdpa9mq40yojn699l52u9722c46wzgf6mthf8kfmks54lqkgi028ktwywmyoi25u92r1wul7c1bilf9e64ccfi8ruj0euar6rtz1dm03eix2znh2zy6x80en6zjq07554y5ch6pq4w1mv',
                fileSchema: '7o4tf5e9pw8xixtyjkmpdz91vvllnkvlfnii48viatq4r96bafbjwvdadrjb573o8dsssmmkpou49d8ssixc0aj63cinmbxp0lr9v7pqvt0rsxd56qh5z0prd906qiqh6ypte3pfwokqo6p6axddw5fq1es5nr0v4tb694iiq308eutmpbg1wjt2jebks73nbc3xg9e7oud8w4to0gxni8sm9qxehr9xi8ooakr49wzmsc2ghzb31c6fun8f5yspl3ngixgudm3e7dag4tmjot5neyf12sopbi95rbe6tmua8b39096aaikso1hh2ugcnbn25ysaxnm5ozobp61bplzzfl5vq52mc1u5x8gc4omyl1g08ikmni70gej1h29uv9qywdq8i5zwmuam34e5xxqjrcbocjewayeh3et874zur0lwfv4uy7zjdyhycxnqm4w6cj6y4f61eql2l3kmavdxcjhs1q9za802i8zvmq72rpdk0fmhwutf31i4wfgr5hmh5o9jfo2x584rn86uonylartx50stt8rjmnxhmjag4ufzp0xdixfczamk7kjsql7pwqgh4i8vs5zplmqdr5z2hcfqgzebymd3pxtxfv7k8f2xz9az6tp15eklloloy9hzhm1w3w0hm6tj799lxph2vj245e2hju0wc302z3nhm3ioc0wicq5awgrms19c0tz2p7n2ya2ypw36s06gr3cn8jwhbqholyh3zumzx0x3dcdblgppergwpxt32tv7u3phcy8u4j0gjx42gh7zrxrh8fvoghyq93cxozu8jjbptr8na0ifzj025fuhee8rflx0ynuvxnzrzqvkvjtx1k0g0pt09sodj2h9mj7vwckvmr2xgin1keeh5fgq7gdcebms06rl79k7o83kv4sdkjlccoaceykhj708vbdo8d5n7556i6qplr4ry76tdz3hvlrrfk678lzuz1p85kxei662yueo36vo5szad2tw02xw511n2z88lgh2a3e33vlz',
                proxyHost: 'i6wg6usrqfkqgt3023oky7kqpan79sxc45ojlbatzoahpv2r6h88c6mmnwwd',
                proxyPort: 5568724754,
                destination: 'emr2nlz68znzvut5ps2od9chrysdol3yczrwoit7r3ra42keca5e0d1ewzi3wqwl6vj61a549hea1wf20gjs33q9gw68zm2astn3njwpbsuo147vw38snwzi2jx0vqf766v1pxn02fejyoe3mq769ev078euuvyg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'f57kg1rbwuwmkupibej52jjzik9bqnvwogaia8zhbtq5x5mzway3gfbz275xnn41pkq6u7t2bfgju1y3ukp14js2hfscrsy85tc3ivj0fkprtmbfllamikk2u1qrg8ct2ypy7ev7wz19acknpv9qqf9d5w1iz9xy',
                responsibleUserAccountName: 'x4ix4gp7s2w0uxxfnttw',
                lastChangeUserAccount: 'ue1aa0fsw6q0cs79uakr',
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
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'vg7r8xpy8q6g025rnkdcbhdmx5kbol1qq116oetnv9kj5t6slz',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: '6esylt01a4ck02abxjipn3xe65w4luelytfnicdbmfzx0n1zp8o3zs18q7vu7n925zloz0tw5119a0t7jn5b5s2b83xc2zozkgo5dx2civsupldanmgyywbk1t4dqstc6egzjbpo8td8y3uju6kco7pa3rdsc0i4',
                component: '4286wfuwkyynkjk0l1kcfnp01a0c701ot197h1wvqbhqyylzarutshvwzzo25wuv32nidmb357wqay41edpuhy55xoocn9pi6g8v5ifxvdz3gx1c65mcov6pw9gzlgnv0ecnh00f9kfmft86ssh9xwar6ggl9ww4',
                name: 'lrf0f61so2tkehki01fbrgipxq6b34bwy1tcsl9ckt4ymv1c4z4wgceojqohea5z785ypp9virvc8hymcox8td0n9z0i9ydd3ad78mc3hq9vl8s09ck4yq6c4a4p94mbj3ogp3wawc3sx36e4iqyly80szm7q7xd',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'l4m1gnjiy7kyl4n897dt8ucyi9xfmgdprd4touc50twod8ftso67eb1a4f6ol35ctj4s3tjlmpu5k8xws6m4o3jqluwsxi9bf3b2tvyevhpeht6emv81gv5kd1306ip8fyljre5925ki4n003cazfekpnce17eg7',
                flowComponent: 'cyssjuue7fpjhvxwol2z9cb31o68et0jkncpxxz0vqqo00qxkh8d81qs51o90ouklzatszn1f916eqi1hw9809qs8ugvvz7v9v8e2ghdqqt0km83m9oc4qu3wcybjaajgscr6hq5j67alnh3d358ctloezhf2911',
                flowInterfaceName: 'h6k7odv7txv343cinelw967f3yz6vw5007liap74cql1tgj910jvuyk7v70mtffav95yiqc5ytmxqppn1xdkmvjigsq9gf2ci5ipfg40ta5fza7vqb4n67xr4xrqlyhdeovjk7bams3q0k0p4jy7nny9adumug90',
                flowInterfaceNamespace: '044275506jis8uqjrwa3rtfhahrvbx2v63i4hkxixo5r5m4e4pg11u1zrw51tsjh6ewdh01hieq3nx2l3eu8s8jg3ysb29ghanr4aglgtjfzaucgf0jblbj5lfh9ybgbibulnel6jtplosifkxahqqrg04cr4rng',
                adapterType: 'he14hyeyzaa7cxs420c22lhejdcttjheobook49s760tm5aohsso8o07l2gn',
                direction: 'RECEIVER',
                transportProtocol: 'oiibqplesgptmuql71sriy7v8cjrr8g9bfkp9u4jmgzxbj0poi8nl2r5ubgd',
                messageProtocol: 'wlzyshgefrxm8r1mamoij0bgwbvuh7h6x91zezieirokzuge8gt5tc9gk1ek',
                adapterEngineName: '5jo0uskjk3sfbieh31otxj9ziiw46cjtm2d5q3tje7qiz5tugwm5lbi0ztel18vhtg1kyqda0grdofoehn4gcotjmvog9cjaie7oc069l6vcs3gdfewp1nwdnb2ygvpgtyi3y7vwc1wqzp9wme6hfkuwfd11uo8s',
                url: '4zi30z1e0xbs7t5ncy2hio3rk5tz2ciqinllu3kgyt2xd2a9dwsu9q32x4pk59b6rf7t9c42irccbh3ditk8l4yqj9pv2s9fpxqt4z78jh29ehl7mb2eqotr0iha0nzu9g92oj3q02w74xkl153e2duq6lilga25j2xexwoniwsd3eqldf9rn5r3y9ceawup9bh6i80vvvu8lyw49p95htmv1ouryodlr66ui5hxdebtddfkdmmk8ujl6kx55uworoqlcgky3otkrumdyv0a1l68dk3l5mubz8p22dipz0fo4tovbq1ykmo0md5n44gu',
                username: 'h9xblqaxu9ait1sc69xkz9r8k028c4exg6qsbxhwjuf8m1j7kffn2qwy9rgc',
                remoteHost: '63uk8iy8uyg8jolv4sr1jx54hrnd6l2zcgjc0lpzyhngw2yodecs1epzy654uqtupd2qgqbp7v6sy1ubi5ric0hcu2but5f8frx2k5pps50s50rh8e9730yba86i9tlulrp48ywhldfjqs2q6inrivhggy3hvsrj',
                remotePort: 5183479758,
                directory: '31ocv8cqyyqxs6inn3svqz5g19gzeh5il4qx97z1853fk6oeqnumpdbn312ge9akf4f15on5igy9g33gxuetacg8fp7ot3urw35lcukvkvqvbfror7lpq4b05ibp8rjkbbn9k8ohjavgh8gzbm864nofkp3ee0329b8f32yoo9dxvflva1wes5sqlf7uvdiij7tqmnsixh8bnnxcgtlryasb7eiusmolmget997rtdh1vek7yx9zssemn8d6828au5sbipjrnau46cdcnenny01reph291opr3shlzyhffs7y33wpkun7dctoup28sh2skk4t3avyyoyhfiyqbcm2r3nhab4jmk9ojil5o2pnblilc81nqc3ymobamu9gify7m7mg2weid6ecpxkae8io8176hm8laccot3y95wcugz8dt1gmco89xtay5224zfplvkdmnclzzt5ipdq1nnboybn7yl1w7broqc9ufpkwldftlgbmtcz9vclue94a4ihn3th9mdz6d5w2h38vfnpdoaao92t3yxsauxpovidv3ziarxjh6gllol0mmc2z2mpayvxkapfw4k5f759ywpkifwbqq3c2o0w1culd6971b59uzdt1dfj5vfww7vk19futay722dupmujhubpqm54twaxevxg0zb10dgv12bjdvxj4kdvuwvjv39nppnk9wrxwubdange5qd393tf872dg0p9vhpwfzmd3e4fgiv9wii7e19v80sbnlvxj9nv42gvmqh3cfrdwpsrqrhq3t6zofe199tzztascs5a3vcktwvhb1ec4gk632j95btg3cm4xbsqrjq9m567guqrxhxl32c6do9qktcwpvgg29krm8g6wib5rry7frkxzdj76ycba9a9gl5gg6tl1jyd8k7c3s4n5flhww2yqka9dpxt0omwoa2fsv0mcarir0ymq8zfhejf0jugre5lqvabc597ip4ynudml7akqb4mf2ji8s08t81raaf3t96dpem5ccdf',
                fileSchema: 'g7ryr6iq61r40ar9puxxptrydy2vnj4bgqfigzx9bpk78xdcm5em0nmm4874ollf9purtc03h7q090ksftgucl1h119fz9hpe6pg36lge3lsjph03jmfxj85k3icwwdwkngdquq6vrpn2vkvn67p6p73sqg439fk18ykhgg2zwl1ojglecusji5b7px6l1ua8atjf5r127ulyb5em52ds8ew24s0ejptn4v20n3tn5tbf5p58jmeal4g017i5wh9zzz8m4rfzo4kxmly5rcuawhsg0ccfzovvxq3zext0thpei06dep62yksaopahydx11nh0bwjk313tzamo99057fqjmrnm4o21566336vtgmqs1en6nxke3gq8vz08iq4vq5a1v2ec2smemto3x7lvjokzh86h15beilxbdgks5zsmt1pweyc2y00ub6ps0hda4hc831dasn03kbeekv571o7qpm1y04fgvbg65og1mucw3h8x9bt7ahxqeylnsvkbjah4vtgvqxtinxnxf07h12vwgwi3e0okd0319j0r0vi71gpg096bpu6hhwbgyc0nsvy03kskb9tzvvb8cipmhmgoaj9472ciuge3pmg0fezunu2n3d1bmmgl867tehtlj2p4tqyomi44syooljc1pudq1kjck884o5pfiznic2xcmqkmiedn1kvotz5gr9sfwzqw1fpv1jj5rxtxqsnwqayohjp80tyatzjb1pxo6i647oectbijp3h36nng4po28gb0uh9vdtjbdz3kdaadbba8581ibo3bhnom30u4d720meywgm20n85v9bqcsw537o4lqymn5dot3hmr8pp2cct9pk1yked97grr19rrw41oso643gkym16iamt8bsr6u6dzoei3oy6mjesi04rpyzijme6euozjnn6mf2pwxpod3uof8ocjln963m79q0qryqqp7k77j9d3ra6o58eepagdtsrvv310kmmu4kaa8w4xjagemdwem8u0mig9fhx',
                proxyHost: 'dmrnn0khhl6kybfyh5cfgtis456xrpi46711nwiwrfvved8as3of3o8cmnel',
                proxyPort: 6541423024,
                destination: '7xazmg1q9pajficp2gr9abb0qgj9gr5chh5ni4wc29uzmgoatiwtfnbyzex9iv49t0d99ohee900rgw41fxzzzibgpaspdkbivt4mqtpkec328kmqv89o69rp969umy0l21utyhgqvjeja858n8asi8qsv3sobo7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pep8n2pttdle9ijco96ddehgruro70gidg9a3rrylzma9tzcbqeun6yvalqwg7jjs3ag2cm3ex2dx1eseue8rh4hbpwr1x7y5ao0x11dgotmk5tddw5sr2kakk952oynbc5p7jdrbwgyfozxddpl79bkiw2xe38p',
                responsibleUserAccountName: 'zrnxmz8uqo210gk1s3r6',
                lastChangeUserAccount: 'o0qc99l21jekulu5u09j',
                lastChangedAt: '2020-07-23 03:57:36',
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
                        value   : '92d781fe-5dff-45a1-a3d9-59fab62885c4'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '92d781fe-5dff-45a1-a3d9-59fab62885c4'));
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
            .get('/bplus-it-sappi/channel/92d781fe-5dff-45a1-a3d9-59fab62885c4')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '92d781fe-5dff-45a1-a3d9-59fab62885c4'));
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
                
                id: '0d9e396a-6f0c-4626-8961-b522db6d12f7',
                tenantId: '69d394f7-34f8-4597-87ff-18cc720517bd',
                tenantCode: 'r2kkkivaebqs14bnk463x56ksyrlhog1mkgpyxhda9sb9th3s0',
                systemId: '237301e6-2828-49cc-aebb-dc295c0d3c5e',
                party: 'f8oammn2yh42gak75j85ov9qfvgk3ms0oq3k2yctqou1maua3yifv2gus1i0xwylmz6m7yqk6irjmkyfjxw9g9ewd3m49wkyxz2zu3ffl3xk1smbqq232fpb803wtryr5unas3zg8969e0l2oc483475ty87y5ca',
                component: 'nhymb2pheppnkudrsg28coqq9gfc1xn35f8rbrlnwky175xpbeh5oz2hlxb3n5uqcyw8z2xr2u2g934sw9gdrfapu3nbs6rwwungulplm6va4rx3423d3362mpsojzv2wk2wvgpv30f6kumc7mhmotrr1008bemy',
                name: 'cjr8b3og8ygg3o8i3z48dw4ehel8ajy5c6xos9g7q39e1dflbdbuphziy9wu8ggwdy2131gatm14x7y33k854jahugev8l2qxzn2md68p2j525jnum6nap37qqhmal64brp2es78gckgpj6vpk66j99dk0ntp1gl',
                flowId: '5c4c0513-0e03-4f87-970d-4c6aee304537',
                flowParty: 'kqm7edltosu34duwfkxkur074mqlu874v4zzjkfxg10djuds8ehp18ybjxei8549jkd1ukdwjht7f6ktx52ejo7cl1rnki66pneikzxd3hyig2q8wuo8wos3muvnes7k2jcys9jsr49t56qvd6s93kh46517iafc',
                flowComponent: 'ao4pdz1f4qif9mksqhqfjq1l5a5j7ee7yuyqjn67suctt4adhk1gh13kismdov7vsyj3qulqritov0j4dgr5t8gryu8nj91m89kplajniykzhpkdxm5fp57cf6ecbsonthbo3ykdc8f6y16okvdqh4o35bvh8ixq',
                flowInterfaceName: 'alioe33l6u2jwaioa0jfajbudfichzxhepdllbr8o22x46vg7o2ivohnba9v2mh2v7ybqpmhsmvekd59xqsck9w3ui23skeuabsthn1ysx5tl4gpwozjvhugxt4styrnb7xccse71movoixdywy3d5xuhl4bv3z6',
                flowInterfaceNamespace: 'cdfg70qds41b3n0rnhiwgwvjolgoel1f0ttmter4v75egdlgeile4ozhdd2yhv9tmuru3r1c0cc7llau114oxbq0bg01yt84nqppayaqt92e26vitjr6idfui9000frc9ct5gwe7nepwpsibn4rdxuj706nw9z4r',
                adapterType: 'eo64ean10mmq8ty6i41moikyvm1t9nc56a1xe1t893o6oaglckzsoureoouh',
                direction: 'SENDER',
                transportProtocol: '411iqm65o6v4hufsyumzjgr5b13gv2mj57r83v3vph2ifx29qgvj2rqypegj',
                messageProtocol: 'ns4s21v468h55n8wgffz1g6rtibknby5hb95jlthngdfqf34ufpqe85xkcns',
                adapterEngineName: '9vy54x4ve92ijm408zwcrw6v3sj8oju86vuet6dxe91qeipkkwcdmhcqxwc6ockv8k2gxdv97uibuxjxohfjoyn1f2153acthhsrdvwj6ks80eshus4ild13i4fh87tjo6p10ks18x49gg52i8qw8lm7jzptlfyg',
                url: '98dz1fg8tku6mggwswj3isc27tl2mn06j2oaseezfw5twze6v1n48ttyzu5kgqqs9q4vdtflj0xz4i2i4m7pdtlo09vgfe2cvckk5x33ytb5gj75ym2c3ltvisw45d88oex7ill5aj964eue4nl20qyjcwst1ep7foidbkzpo2vsy53356e7bn1k41eivynoxw4xp4e65p4f3sdnp9c7dv7yebl2xtaw534bqyvly2idsryogwqhajxp8qhmqkezbll0vd9bs99gmiszd1ttjxbkxv5148pdhm9td8ag7duzeldzivyooqx2eff0klmf',
                username: 'eir50gadyeub19spgrfbf2brzyj7g85d6fp3i9k6irg2hesyjj12a17oznjb',
                remoteHost: 'ltzyrfa01ajdzbn3yzgstt5g3lmeviegxz4zuvrdeeub5c148lywzti00gko89vsw6jjl7dol2ai9gwxw7ifol5s7jir66t13ifh120zct1fiv4mw3ypd9hb9ozmzd7oziv70rl0q4vcdmsxr5apq59y4z4yf474',
                remotePort: 9533345293,
                directory: 'yt2g2jdaen69gifl41ug8spys684o3tkn6frzmvypw2lz29lct7ihmjizfcupg4fexlr8kntwliu1xytamb601wiuae52dk2n37x62uhajlhq16mqp3vj0osfmzd0s9x8xk8zg6ce10ynols0n7j087xw1qum5b9pz26kgefxj07nxjd8slap2u00n1sc8a2xmxragau4xfwfdpp830314xxzayfvli8ck7w56b3paz8on041d686pgqctmlqftcpzr40labk80r3jd47c04ri91gxirruu7v6las3v9nivx68olorv8z04u6zjfknvrcqn5ijebbiqwlgcm8tqftj0yid23j7obdcc6shatz617wgsj699r7r39x7gyfae7t7qm0q2bjdr41scty7foqh25aqmj6ugblxzaizokrh5wu1eqho0l2p70jee9upgl3l6t9j7jngdyhzo8cbeefqzzilnfwfkuejy4tief6om1rwqr3x081gmf06ydncqe4qnblcrv75doa0ra8naobnq40klwmfegms9b2svhxtoy9q575435hs0o4mwbx1l65mgozk9a0cmlyqj6dn8peas9yldbxytz8mr6let7guodhwizm2gjjkfl9xprx9nkqxwav8eg1ivtsodzk697xo6j69vg12jvr87zgdzvap0cti2149rnmil0oxc3um0tlnfc5gx0ohqpd861tpvd6t9r279e60p3navlcopw6lo3mdv08pzocgsusznt7q9gs4dfltenxqk4pa83iimjcidvd92tcddxj6qgnqplzd07186tdn589mfbmbtdnz8t9yzdis2azd4yo9xho9g1bezac6twk9rwjak7lafyvg0kg1x2ulr5262ovutymje8hjewk59nqsxmpzqgcogaea61yufs4gc71m8gu0szu91xoaj1up5hw4niqmz64tqf2yh0s5h4565ufufnz447nollfb8hzatin7x4bwp0aeroj92oz44rhyomnotsef57',
                fileSchema: 'nb7gfdfpizdh03sa9ltoh833unqiwo1txplkxmkcfm6k3pkskcask3gc8rgkkli6q10gnxmlqmcxfd881o30af7gqti68atsg84d2bljjuh9og5yujpl8u74j6hlwy002hr665aa8qaf686vsqqxp3tj51psgf2m6ygazdizgcfwck265ftwn67f2k8cyjf3gyoere1ixxh96la8x3xz9zb4j0robmdy1ji1bn0tdqwzancud4gqxab0v0n4l4gg965tispqd7dzd1pi2f6pimwykbigir7wpwh5uu36vgvlt8yx4x820olu4wmjh9037pjhkd4nosuw3hv58uztdardlrbq5xdm2efn5ef2n4b7jvs65v8tzv53g9mrsuol85lqthxk11lqmyknih7hrum3aa55rhu3gxtx3lt6dlhep9g4xvra5yjy8t7muz21ruhxcututuc9hhbox4ei50gu37lx7wytqajiosve7rtrzt03hyjygwk9a972uy3agpbqgyzj49hkvkhyjp2x0vcr22r7e0f1u5470mviw6a0z9lgpyywnalvpb5jvqvepvwljzxy2efahnqunz8zhe7h01naewrnqezrthprfe02f22ptzj54gdk1t53xzec5kox01t7u8xact978jh32hf1w4yxx8ndbb5zqmkafa6teba9rii7pjk73fnrata344r4gksv5z9d3qsvxn4b7n00x0g7p83ewl9m35gfqssrgqzsuciq81myn05uugl2ozr31sl3u774rta45glaefokw1fptwn9jw5pbacv9l5mdfsz6blatdy5f98pugd3bjbs13fa4kp2udwb2exj0y8piaqlv2a4zavw2lg5krmz9cou7u11jpy6yecfnjw2lhofgqubk7zw0dfckzdngx8jvksiykrycjkg6lcftt4bz5yyzqagtxnqmgd77e0y13rg2hndfmm17h7wah1tpp8ocm0b9e5fv2a9efgo7ueree208o8pfkws1swjscxn',
                proxyHost: 'tctutdp3ufj528v986jvldiegq2tc8jkfcvi8aor6c10ry9qznyiri7cac89',
                proxyPort: 7988913513,
                destination: '55jv6xbr3meztybh5nqvuxddv07fxz3qgbcdkj7l629sqr8vqhrmoq2p5wrzfnmvqtidaqyy3qqlbzbnapo34jni0crtzvxvhssk2aul5gfjstj2p9q7qtw45bs7jvxtlqq50form979rd3gdjvakmr4an47c3ts',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'sxik8q6hqggtdv6bv97zb10ksypex2op3cr5138novxryit5o4wnzmmorulxxmvl7eda4gkrxw2cidhv5q1hga59xr63qoerf9zv0zc80xo63wjqzmjfqt7o4fdj6gabh4als4dhvmamhtv3bi6uocr2dj0o613h',
                responsibleUserAccountName: 'jbm24wow4762zlyqt4tc',
                lastChangeUserAccount: 'u6pmrqnvsrv2p0z10z8h',
                lastChangedAt: '2020-07-23 07:48:02',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                tenantCode: 'hgb8ay5veg5wi40f4x563890bpqfxqj20gfqg7ah3bjl3tnwnx',
                systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                party: 'rhedhbomyz3teuykhssuit4nn0comndr91ku52hz2amrinc3yqkxk4tdu1jafyh0hyk561nalvrn5zm3zmce6qk257kcnesud1l2qdcd0f4gaejkcdqljztxqkm9jqdtiyt39eko4edidiw6ht9etlli7y307x5r',
                component: 'wfh93awlx101s3t3ra1vdf6gtjc9gcj2j4wtt09joza4wr5wc8cvn8i6m4e3ou2o4t1kjc1qfj0igu1nqguhuxd1lsvfofsaxjg2qcckjzgu2k0drl9u7prrafb021awjeensqmdeap1svqbz38lkmk4bvenrjyn',
                name: 'kb4jnybnoo5bgbfd4k7ool9ii9gaogqma91m6dxeeje6qr9z3ugbqkzapsjx8gi7g0i435k3pexfzedjefio8h9c6bzqk1930aokpvojyuxwwljc9nrhzltgfyoqh6kgruy8nt0nojva4h6u6xhghci6i5ku70un',
                flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                flowParty: 'ma50kap7xgoim70l64x4dy7cz2icd0bybxq4lf3brdchiviurjzs6el1z6xka8y6n2nlrdcq6ttzs91m89dsxics9psbtgkymrplj0s1oxl8qkkhi87r4v08k4impncpomccbtlgsg8ql4ao4pgrz2lks6zibbib',
                flowComponent: 'kk8uflpf3zcldx88o9mxfhouxqrq5cpdah09ygrd17prb8q5uxzepc7tldwn40fb6kv3h35udqnerzmh6bbg2aq3e6q8ectt8k8vxv5k6gxmcqfq85jt8x0vjymjwvuml75a7vl490gg7y06slhzsla2qtk6ipf4',
                flowInterfaceName: 'qp07hc1sbmlttrprlp0nevwnmfyd5420cdfe0v6xm3nlmaqo6b1pmmlwlwah5sfyiszyy6b0ezumihu8je8991snz1n4rb51rr8zna1j7besz8a0y70r67xh6yhch3rqg425e1iikj8zab27w78b2jbh3ggesmof',
                flowInterfaceNamespace: 't0vo6ykqx81ietm21oxve107vsmhv65d7h26p2aocl7pjwxuj4nvvy16h6hno0puwwe5q7c2f3dse1ugb4lxbwav7qpkn6i7uv5m3d2nw6dq85ror8lie8jmc0lvir1uag00vtkkcz7tt6pn0ok4lvcy6fbahdd5',
                adapterType: 'egl24i3aw4j4ldckgzpmfsjvxfeigrl1xs1j24i9pf63b9ur2s0pyemtz29s',
                direction: 'SENDER',
                transportProtocol: 'f8pupdbzthmv3lv4h9p06h4jtjxjltpnsajg6w8br0g8kksaw2jickdp73o5',
                messageProtocol: '3s9bzt4exy55h9a6pxg9jytm1yyjhn6l8uv7ayw8ipj3n61ymodmswvszbl4',
                adapterEngineName: 'mlis9xpav0zvkw40mh4tflcrbracym109l9gc573kk0kdit7vzepud6zkbxwt9vn2la2wd1dlhvo732nr09a7ztkba1ayjcs1g5cdn9ffg7en1skxz5kptysn92snhkvmnozvqrojy25teidoug2mb3ftdt4hj9a',
                url: '7ool4na9mqkr6c9s9wc09l9idfc6ikjea95wviaoj5ct7s9ml0hrzyhoy2d3ah82zlf47fdbby1euepcef63qo2dr4ke47xh18mth5ob0hs5xj6c1gwvkeikwrii1bb9xxmdcj77yet8hcnm568153591stoo1pdaexuevxzifabjku7qojb0vde09m71qlgwecwt7h0fo2aaxbrf58cpdyvu780tkqnabu5zk9v5lnrucdcgp0qvabzghr0orhpq164zubcq71z6x0rlneur350xp7h9hdxnqjbvk4h1i2xmfb22a4502uaqz328fmy',
                username: '7pazrbbcbq4fa1abi0avpz5zax6vos6t9z59wrbnqtbdlmribzji5bvphsr2',
                remoteHost: 'vpckgag8kc4miiste5cj4en8av59k0g9l28z5uslafelue4jg9kq9660cl8d1cgy905n46z6dm2c0ftzj53brens5ocwj6cbzx4mf45ih5mdl63nikowykf13mkmgeb5pr419mg71goio7bx9kt2uz7mahx953pj',
                remotePort: 3197023767,
                directory: 'cxc3luu5zg3n1l42pqc7ij1xi4ofuu43e9spfvzdu9kpjygc86g6rs98uvjgf3u0ove93gltai3sn7cxnqtsjuw7eu26z4fdavsbaujj7idr6b0o5jjoq9kduglccds52pjr3thdhfuzacqkk4bz9cfnu6fhpf72n61mx2kmss9084eqqmi64zqm480mr68a7h5h23ryuwtff6g6r4j1vryeskrxmt7kggo8hj4ocn7c55rhktd54vlefxi9cp7r19dnl145h675yf9p3b0rxypz8xdrbwc8ay8d5lewva4v94wo090ore6tedbp829qvxtl5mpfv3ssunx21vjhtd2dkali10cg2ohqxjf9xtqswdi3g0fpgj5e407hp5os4qlpfguzzrlrtf8sz6nz091hkmmlxdhsdg1dlvycmlzwz0dqk2lw71a9yc484msbjmocbfsgmploip7qfl8a0mkmpieues22j1om0hpuqxpir60xol22kwrmf4y0xucamj7ibrjvmdw7jrm1hi1qob50lel345eh6pmled8otefpyk5c0825w56s0ikme3ea6si1z1ln0vqes9ff0emj9rmsm5fehjl76qb7j0nrjr5s8kcjdkf5yex4a0tmzhu3zjwtbkgd4tq1l4anrd4ntpoqqecrz8frw2g2c2bb3w4nl7wsxnhi7fakjf2jwp67hoeuautv0bchm0r1iojyjs0lsinm50dyxxiatk9btlcvme7hcdpkrsjpbie8hwsjjq4t4zf519b37r5bjlhbxasmh0m79z09onx684q8fpnfc5ht6n1bdbbgrmm8zl9pyu1qn4l59d9x0avci8iwhmye37lfzjfql6m7ntsp67ighg961f9ezi6qsiipc37zyn09ehpbqv2fb4wj05ey66khs7ly4s0pdin7lvs57emd0wqzza3rvgad9m3abuxmno19hhwdt9sul3mapycp6ggngki9tfgqi1bvmlrmgebdrx0v8js1z2nk2zvtd6tf',
                fileSchema: 'yolt8uo82gunz62xz18lz55hzungz3f7rih7t3me6tu3cysvjbk549lhzbmpq5svvmovq0px0nzspgkpmbx62t8l8z70ec4qng6mfb0uy5a44g83pjnpklaxf0irddij44fp8vttjkl2wr3ji1c6mgn24lsgwkp5fk3lu4v73lsq3sb3wjtl5bo61dxusdsmxioak03wixaqfnvkjnjc1b1pwzp002fb7evw1d60rnfqod3i1plozjih9zy8enh4fw9off6jcz42bz9gp4ocwx8su6isbarhc11grad33mfztmoaagb7qonls5z4l6j2jdiu1ivr4sdvdzwhys4e2qmvf9t4mgssgueah03n487evx90kuwfgmk06d9qbey4705yin2ea3pk4gd3vq9l7qme279w0f07t5p4zq9pt0jybo0874y6wo7dt8xwf9hc8p65wkjjom5dhj1tldlqqkzf0ccbva8wzgl2bg1no2zpn0l8d2n1uap1umjzucxq8621xytho9l0u3mq4i96wjrmvbwhfu8myqhcpsvp6v39omcz1v3k44rgn9zfnjyfp2cz16boldjuglrycxxf8634hycd1oz9ze4r8c2d4hvfff3t5gajmor9267pjuzjwu8283cjnzwkyh9rvew21o6hl1ax65e9xl6ess7bafqdefzvn9gssel4movecz4z2rbxgcx3ky9t6iqnlfytujc68zblnry8cg7eb7fasnl17qvc02ouxkumx743v5vwtwd1n20d5ear7u8iu12x2dzy86eu1ortkaakfmhneb39wxadceq9ml121k84z3pvbv3wt9rhe1p8ncp02a9nvwogw09kx1z0972i3hdykaq0siijbiuyuf24q519fkfy4g3a72hzbypmc3znqf2ka04gztarutefljzau5vxn2b5a8bme1jssv59aknscztrq99oobl3gl5nulz47fmvi9awgr7aisw9ypquvz011ippj3ould0ylj3brs7uqt8z',
                proxyHost: 'z36yotlpyerh09wf0t7717frf5l6hxmotbwot7uhp99tx11reim9p1d68f67',
                proxyPort: 7957229717,
                destination: '1csgbfqlbr6ug77tdr6zseda3mdl25dqjlz3yd1ejawmzkjn9a7k76roctkg2gtnvutkv33rbeipmrp0qf8dqoucudy4nmtekjct7cxebm1hn6ozgf8219c1ph6pf4tbiasaju3k460g70wjepkzyh7a4r67kxa4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'kzqdbhcj7sef9hjtffaqpiwft1wv7tee7gvkdqnmrntcb3y4229bmk80sq43w8nvsweb6pbzfb1fosfc6zcdelivukfv47kf3hzrsa9yai6i04yldwhymtcdrz2vnxgprsxfjpg38914v9ctc85qod79vs68md9n',
                responsibleUserAccountName: 'tle666jq4hhos2q0w2ea',
                lastChangeUserAccount: 'vybyzx2gob8osom1wur7',
                lastChangedAt: '2020-07-23 11:52:36',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '92d781fe-5dff-45a1-a3d9-59fab62885c4'));
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
            .delete('/bplus-it-sappi/channel/92d781fe-5dff-45a1-a3d9-59fab62885c4')
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
                            tenantId
                            tenantCode
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            tenantId
                            tenantCode
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                        id: 'ed1141de-278b-4993-aa29-cd29f5aa820e',
                        tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                        tenantCode: 'cn9fa6nbwa57kmg6624zyzcts76dsguxtnukwbsd0ahco6kphc',
                        systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                        party: 'kf5sebcla8l2epoqos9vt9o7odhi09f7bdpcs04r1vdjt0naqdta9y1raizs4f43sx0k81u1z02rj8we7hq9r47pt3f0ad63g63pcf4pgi2kxl4t2u4zqpy2ni3k36w12e2948f7dg3qa3z1bd975zhb4iqqcywx',
                        component: 'xz2lk5bul3f29x7zr22y0xav0gmtghz3gerp3gaoygnwi8emp2tzgsmnngkb2vvbk81szc3o7x4yf0xw6xhzp3bsmne2l81k45ujamthlcr882fo0n1x9jgdwhukscc7qpasfstsd9d1s3ni0j67l36t9sniig6o',
                        name: 'qvzlf0kmdtbj1rpgjz9qjs50bg26dfptudx145embo8ev24ksx1ftfiywriv5n2cu20tfc3fe0arlvqbkygmwu5stzi4plq2vaufwyw9lxu8bdod82cexhxt6ahc2ada66kc9ioube32x9dhkcbuz5qx0qu46peq',
                        flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                        flowParty: 'l7ypircdtl2r8crmavbpbzv263eu0fnpogzdyuz4y2h0nhtceqel4zllpp3l9jnfo2c20z17dfa8nn0qnw2xo1gyogqm9v6edb5w2swy97nu2wa5ncu7lhn247pnr781t3yp46vhfmd10x5pjv3vpbp55b04mznn',
                        flowComponent: '2zp96pc3o3ewpe4tkfcqym3ba29m7lf09u3n5nrzf1ef8xquk8j3ukdcstjawvn5so9llbvhqmomexnteprwnefvq2tizpcekfdvuh0eba1o4sy1vndfrivix43hqzy65xgykwzhbaz97drunwvuykpowq9up4um',
                        flowInterfaceName: '6hpx3bjvjfu5lfl1w8of0o96iudd89yrcuft1heit727jojb3awlscsv6c20usim60g2mz4a7he8ri71tesq3gwox685gtoci9na0ff8r2ci1qsa5rnkpztxxikfnrild7wrehf532cjumrhhxoyxhht64k1aqrq',
                        flowInterfaceNamespace: 'frxb8plng7wob7g8efz4708guavxucwroahktysvaz8cegk88arwao4xc6qbxneoqkqv4yxdbgp6lxhuz6dmzctvifsj0xkh53p2bk8wrvuu2a03otozhhi2csi9g5ovrrrgslpwnfcpcsst55euv6kn2rsqpwso',
                        adapterType: 'jgzedcpjo1smqho80yrdjj5n9y4r25rlz4al68cl44s1rx9k0614ltgoo0y8',
                        direction: 'RECEIVER',
                        transportProtocol: 'w0hartw6sb5lr4qtr5wh5me9o9zt71f13vn2zmzlypm1cpci8si6lwarur16',
                        messageProtocol: 'ala61p2uz8joh7e3jhreey56uysillzwsg9az9d6oeydm9cbvkjq8t2q9mtz',
                        adapterEngineName: 'd4x7kysmgjztcd27rhnh2u1batlvbdoqjojgejjbxz7pdjwbt4thwr25ud3q6xoc7bssga2a8bxln1k3yxhmrrgqniuqmttsn04qr7g6fmi84yzgl5bgtl7eoelv5z703a1em6sbuk7dfpms0ry91uu72n2ur4ih',
                        url: '0ub5tx8728oae9jil54kt6w7o2i551uudaul02k4z52cyk9i356ctqct89vjjmgoi8limm0bdpva7wto1985wk6rlrhusoe6ftljy4c5mlhy474nbfdplxd8yooynhz0shhyeb9xzxyrs4jrnnouz1w2sx0whddtmbh0t7u7453vtkqwg8dxml9th6za91ls8xe9ue5m1fr3zn8zy51v49czrqynrcvklx0gd96leblvetuos6y4s2c21bm96zb8nxgidtx33lmnk2s5684tbu62hmclgwppsdeo4z2zduki36rg2zu6fgmiu59tfztr',
                        username: 'x0fblh4ioa7b9jsr57vcxpyls3a9251j05qgxoscwkhgsav9ar38dn2tqsgw',
                        remoteHost: 'h98io6vgk9oq4j7mtauo32qjejqhbzxkqqa9dmbgfpq04dc01savn7i2mizr9281rpitumjepjfc9vt6mjhnv7jvk6f9arlk5kcjspqc2l2aapg08xm7q5vkdy53ya09d2ghmju2z2n2d16og1z277nzre0ktbxs',
                        remotePort: 1017838493,
                        directory: '875n59ro58zdzynixsy8bb6jjjjl0sxze24xjsfwe2cm2jxj69tw5r4guv87qn4o94a4ro2m328xay3o6nzjgxgi6uxj9e2qnn2k7q7pae1emn4murfdd68hsblf48j8la5yx0gbg96ih9ersmuprh4infcc2f2jqlvyeg1y5t9ghxozgpab42jrltly7gmfup56d3kzr25wcg2vywaa7hjmhvz0ap3u8zkxzgy4xcgfk6dqu3r0vrqjsirn1fijobv8mv4rclecunhgqm81xgloyhws9e8shawgmayzi5jrju6oisgve83akl89lsjdsikgktrcdapaf2wlt4adlui744zzz6pzrjrtkao30iynuatrz6s0w812qrzaginj8ybu2x5bwsrpolu1h3af95dw72drskz1myt6l04ik5yuyj0z79n4o0c5atlk6znz2rr2t3u530t4bohnzo3ru1be38ervv3hjxadd2kyh3l6gdw7f1olup3fbb5p38b3z3a0vyuk9r6geh6r8xlqq8c6jz84rs60kbg4opijrp2me3zjyeuwagg0owmf4sb8frb4z9gpn77ujgkvjw1v6xej2qybrstupjf47h895yezsesgnuq8qdc3nqbfptakv5lujo47qr5b5awaoj79vs093tnhxvmxsvhmgxutnag555i78868ncgmdm13e4o7viobdvg5a7f3gbmf86zas32a358tgbjmz46s9vnfms1ocmk6dtqyuymafzwk9tlqxjwn5i5yza7lckcz0m5okizwojh05kddl5bb2ki3kz84i318mjsm3soozf6hzowe4l04xf52lwlosn96ypkr3x2ecynvcl90hz6wkpb8575d6bdwqq1ojx5rx91s7v57128eqi81nncvwte3oz1srmagnaxw7shlb9db3ze2jqh59n5t6r2kzddfia6tzauqll8atvzcbzsjp44a0f2xa4gode815dq201i68p643247e2kaotnsi3kc8sqbtmea',
                        fileSchema: '2l9btdr6q2jfqgj7b825ffj45asjt6csqfxodngfbbyijyf2bc6vnnkdnp3jdvi0z6t79a4j0uon0n89cd4az9ijwfiw0fhchy27j6ng89y14p9ji57c83zvyq3h8tgybj8xqxu6iw7izlsm2p4ssg33l3rdbzi2gba7mozay21ornyuen8wcu74yp5cj8wm8b3w2qmszg8kew3cp7uvy1w281fk68i2dojfpnux2k3iqvpvmla2yb1509mzf8j85muyag9aiad7m6osajs8eumv8fw2s5x5r8he0bw6luhr1vqts95irhtnw2c9z91fnmsf4vi7ona589aorz2chxldl44xhu0in35vuryrp2qkjvcuay9dzcoxa52rfkn2gctfdtsxof48lvfnkmi3u9sfp81uo4pgx44nk80sktjuxuw1xhn00jo3tvnhhbb2xpxpj5qafynvpd8xwh1vqjkwep6xih01pdi15dfhlg34f1ka2cc823bxxdcir3j7ipbu9z8hxhphnqoz8ownkddupfdbjpa3o9p8e6txdhfhtjffwggeq6pomvqf5fzdbgeiwbg6qgst825dfv16ay5hqyhmglv3xl6wb1iqf5qek4oemibd300565g7a5q7uu39i3n59fqgrj4v4ah9lk18yflje6xoniyfwxocby5dp4uvgr4gtoeglzrn7odk2wucr45woqggcjd8w9v4c2l59xftpl5nspswy46t7iilvy8kxax2xlh3cph9hgmi06xxbl299gd00mzq59gr9ccjz8g1k7klfiqccabtwykz0sxdotkik8s0zhwkbtaclll37wn7blqa6w0fsbwidnm9cv133oup166oobgqho6ap11gikuzun92j7w87e8k81v67wgcoz7oqxbncoqy5h0wel7tvpzrqol631ynzozfy7n4sx96ukzfvc5ajpxmma0mmt4hh4oekuq6a30uganb8ovppnxzpzl7ejuu1tm1z5w9yvipayyqqig5p1ms',
                        proxyHost: 'vct32a6sf8k7fahnnzajz4eonnw3uvil7dix5h06j566rhp3t2ch7deyzh3b',
                        proxyPort: 9868648496,
                        destination: '42b1ml7jvp2c5xw35fynukmng1p0xqrpob3rw0gflv9mm6ghrla8t0geokp5x6ivjzwtx6adjr87u408wctx691ooqbxmczn0tk3ittba4fdq3ihtkx5i0busekxba844qk9oh7z0fwkxcpjo0wvlrtbwaknffi1',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '9wpnsd4oge7t0in27bjzcttsxtrou5ywi58vcin7ysftyjkqy6d0c6jib878k82fd2nde3c2itd478muix8tkb8q23y80d0h2uxdmjwcf9zy85zkq5fm2eyuf22791c56kxrvumg018rg75xrd0xtt5y56hw1etz',
                        responsibleUserAccountName: 'l7nm4a7n6fww67emgcrz',
                        lastChangeUserAccount: '9ezfvyokiw5lhielfbg7',
                        lastChangedAt: '2020-07-23 09:57:19',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', 'ed1141de-278b-4993-aa29-cd29f5aa820e');
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
                            tenantId
                            tenantCode
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            tenantId
                            tenantCode
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            value   : '92d781fe-5dff-45a1-a3d9-59fab62885c4'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('92d781fe-5dff-45a1-a3d9-59fab62885c4');
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
                            tenantId
                            tenantCode
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            tenantId
                            tenantCode
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                    id: '92d781fe-5dff-45a1-a3d9-59fab62885c4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('92d781fe-5dff-45a1-a3d9-59fab62885c4');
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
                            tenantId
                            tenantCode
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            tenantId
                            tenantCode
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                        
                        id: '603c957d-3a8a-4675-af30-26d31e2d2d43',
                        tenantId: '9900051d-a7eb-41e4-96d6-f9db8cf366c9',
                        tenantCode: 'qj0kbno9fcj6dm6va00h4x6t4s2uef7rnhop5ius4r9kxrmeo2',
                        systemId: '27ec39cd-8da4-49fb-8fee-bfcd5f9d1ad8',
                        party: 'vl0komw1si4vpvoormfi54an5t51d9t5xpkce5o6pl4ecn1d25i6c61hbydx3unmf9cydjn8d2x6mjjqc9xuqiic0n0zpvanlb43dogaeopazzgr4uh6lhdvswmg84oyv9gild71pxymco9wvcnn7w37rfkk8tbv',
                        component: 'whg9mnhbzqi19ov2ixouoa617q0s844htz5yjcz4wgxe5ez41y6htyvng0tf51k2k9hteu650ycbzruoio2mt21ilz7iq9m0d23ebayhwfrmz3eb938l3pdp4mvf7ul8p1otlgo7xf38ijdyjhmrchck49iwytb7',
                        name: 'wgfnolcrd5132mvw596nt9pwwbyx8xs4mn8t55oh0ablmknds7naifp82rtq2berua4eid95szic0wfqgcpybed6yz4q1wlinsxbd1lcksxq700zioilzektu23am0pa9aqy9mw6nhq1p8in8gqks0tfxjoasdb2',
                        flowId: 'ce00ccef-501e-45e6-a4b7-39ab55f7c626',
                        flowParty: 'mtr0o7y0mrg1gr4v2800lnin47kknqynp2k9bznngafo8zmgb5btuc06dfo8zccehj0stvm6u6qtr25ho5atnh4dawv17bjhfodsnzb41h2xbatm1oysvzn9340uchndwtc5l3b6eljol961hbdv6e79yljwunlq',
                        flowComponent: 'ecgnh2ybht74szrjbbuu63nuom5c2bpwj67kcezoefm7k5ku27p0p3cufaz5wsh6kciti5guuro7j0xg4bqnb14d4ev999btcr0wdsyn4y2hto7lky7s3iff3c88sfr726vhf13ybzqv9h0n67jj917rrl5ucrwj',
                        flowInterfaceName: 'd7b888ywv9zbhccic1ri1mc9le49h25zdnf4wxzdemws01gq1snes8hft91gsxd2iw5cz2lv1islihgca86d1l7cjtg5qx62b2uyiixmkpwlzep9wzkwxumxmqfzxgfa4adfl3lbg0237vqq4pgyyr1gdo3t3izy',
                        flowInterfaceNamespace: 'afhrma4ebvfbea2x7o0moo4gf6zf353tuyrlsignfixvcwc0t1vaksd8vixrzf16jp65j8pcrwo2qakxmax0cuebn9iwi7hu8w7zp06v4l0b0j4q7kjj0kuxnxr2v20is5tdug5wmgfghpjx6olna3xux2m3dzw4',
                        adapterType: 'ilul59uvc3488kgxi9z5i2nfa6a41zfrxj5bdw1bs4wk316nv67asshhbmyk',
                        direction: 'RECEIVER',
                        transportProtocol: '3hqjhlw589j3i2uv7tspfu5m1ts3kt14cpxggw64nookqv6glmshhtac3ksh',
                        messageProtocol: '7sa4v75uby45rmmrxziq7lmukd8rr1f8udtdr76ten4eskn4k594w0fehf92',
                        adapterEngineName: 'm97f5m9x84f7h8ur14jxqvp5qbooolfbe9cfkv3ao4yz1gxkfr9jd9dl1mlumsv5tm4blzy0hnknlxkk9oshswn10312lqzwu2c3pn5xytlqxc1y6h4uf3w481bj97qizz85qwyvqjsm15kpjzgm0y2v4cqmc2hs',
                        url: 'd3k62zjug83na439iw2hxslha20mgwwursn8t38o622i3zwis3nnofsupp7jjveazhqingzy2esusa833yzt7i0uhma962buwaaxktxdtz4knx87xbqoxseof3i6q9rhzvia24u5rbv6zfmkkw4wbog99r5jxdvdgjxtdzdqxiqw64qp7fe4vzaeyxh7mzbbb0ww9h0v4o2mrtyi64rs7ye9c5ycacn6zqegu36285nmlezfydqlagz8dod6pgak6rzxq8wsh81asuf5t5uzofoi03hshzgg4achmqx9sbcx1q5vzd4c17n40m6ywbdl',
                        username: 'c70lj0qmvypt390om2vhs0vqfcyrpm01xg22p0x3b8qlv98bii97u1zfkq4a',
                        remoteHost: 't8dq8xc233va6cygifmfbhl34mvhj1qmwh8sz0gaoyqvgdb67tfyli6ne4b3bgt65vdre6icske0h96m2esanax2h3qtthtnqca9bg5k8k2fk3r4743a9bqi85iylide2f6hed1h7ghiblowaidlig9lnmi6r5c5',
                        remotePort: 5139422086,
                        directory: 'k1jsmofi9k9263jzaf6m67qwncrntku91ako2idudhzpc509beqk6f6ifyet6apykf58l2frx2qxwywqq3r3mbjmyjfva5otzn4wikn6qlxw35hezylvr2eiuzw3rpu6andy55r85hc9ng9xzf4p8mniz92nzb6a3qbtf2c3n4c55lfyhlgxvgp5wrbv2jpeaxcxm4rcuuwrc653wzk60ckhtw23ln331ib6r9r3r8os8vffcgzonwxqbe8llsnfekzp2rj9x3ri1ny6gux5caxqrvoanwhfumbj7ncm7dpvluc0eosazky7exm26qh7bz82rn1r2c0yzupn9m96bncsoai26449h8c8bw5men1b7dzgk2hepeyaqxb7v7sk3t6961ckj9j4at5qonzkq5olt7ee7sdnpa81eu2gd58rx9ezql9kbzpl7fqolif7lmaw656zievouhq1kti1q1hn4vx1jwwvf3u6gm57kbpp0hdkfnm9x3kz6fw8vsep74rz19d94maj4z2iika87cv0yy0n4hrldkj7lhax3bkjja06b6sgdwdmf7j36pdrqnuo0rfxoxmpwi4284w4rivp2mom9bj5tfa7a0r4w7pqgvunsr72wgshur6qjmnz0pq1kgtt9iu96avlhqcwkrb3qur4kdm51b8z2zb01y047c6az5ptcht6uq3e1q3o8f8ibm6lvjbmpjgiafu9husigzqxqy4r83m5mmuels9ovxcvnkx20xtt3c8uxq4ix0jye5v17o17d1wdmgiookly66x54hqopg09qpkczgtdbpcxdl2xbpyvwa69yuz4vwcrss60mc5ti6ugyvs7is4r94jxiuakn8kmwm0s412ntigo7xj2msksc0ybbggt80epwi399n5e00fqvyoaub5pydvndgxkjx30eat7m12cktv4du2qvq4lgomtzn8tn0f6xfgzhdsikv6eeea0ilk4sfjj0ut3io2mpauu4urggqrhyh0voaxy62hmnhj4',
                        fileSchema: 'kpg7f01d01em0nq74ze6pe9zf2oxxz74ogyzz9ongb761qrsjgvzxfbysl5o5s8k1hdvwbu957xignascdaudxoav8e90429el1rfqc5ub7fqctlxv4pr8t139zu1da4vo1psc7pxwcp72laoo41ldk214t665h8sf0wb9zc674leqmqtahnof3e5zl7tb011r9226e1eeqtwj9yz7vwx3wbnbcof8hdssgstr4pm7eafi11666zlu4cdb63d6xh1ykuei8p53x94c4m6brpg44swy3isn3gw2sw6im2antpwyi0340x9vx4zt2e3385ddeu4xtkhlfd12hhu6lh4hzrqll7kbs6xgdahvj12kuy97ec8l4k1eaewcx4yib15cphzdfqedxsikshfxfqied93qh28fx3jvxsdrp1zqjg28xb76id4ebkxlkrqhh5vgp7btkepcwsvivqo1c3d96vhylm6wmkpxp3dp3lto1y2o7mv8guw8gsyr3m48q34fyxpj4eyj257vxf63z0n3gu04fzl0kqezr7q6yjoq6dz1033i305lynixmq4l2tynkq0tanab15p0y9ej2yeftjt92sjioki9wvjoeb4ixwrqhtbqy2j5ad7yu5riq8jyoyzsll9y30ri1f7bvwz2l4dd0pwjw26tz5cohgbiznds95y3j4gi82wq7jbgw15pqogmjnqo8m0z8jycwwpov4l3y1tio2nk23sjh45m34kasmloh6g5usbvekgnu6o0lsjzt6s88167z8tyn5nj7pmz97gpy12bo7ye1zwxnla6cfx3uzbfhb0y6fpiiwxsjnv8s9f1zgqg81wnoh17z9rpl4de28gp7yous0nm8vbcji0lgliddmmqtacpm16tl0k2tjbjq00pqsoclttcsk22ngdj5gi2dhcdax11w0ljobqtty3fybdeccok2m6ydvl2f9otfufswylsnwfkj77gmq4jweokqz0v9cl5kovmbjjj8idfisql07jx0n',
                        proxyHost: '7dpk56mnp7p2zmgwxwilwb0eqowv9zt9ux6xqjagcj2l4uiy3z3ac42djbzg',
                        proxyPort: 3265922543,
                        destination: 'g0d3xltc4hdqtqcrajhauinznqcsaros5citi72uszqifungz0w2my71wd1y6xq7d7dnfsz9vfbbgj7eubqkizfty0kpqaz2csqke4hqc03d4t07iruhxq57gpkvxdr37v5iyddf7c91bs966fp46axv6nklv93w',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'bmwsww1hwjs9iasudmi5jzp7t66ohgdhm8o8h72q6xv7ion18umqz3xiqxxxcv322fm9b5e9lxfqreifxk6cqodaxis1598ultdbjhobvek1wmoeoumcbx0xzmigkihab59wwh5qfb9c1ckgquuih6es5f6yabcb',
                        responsibleUserAccountName: 'h8j76k2e6ouksa0joywu',
                        lastChangeUserAccount: 'vahupx5p8eg0spawfrhi',
                        lastChangedAt: '2020-07-23 06:24:01',
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
                            tenantId
                            tenantCode
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                        
                        id: '92d781fe-5dff-45a1-a3d9-59fab62885c4',
                        tenantId: 'b107a288-9138-47e7-bdef-4256be7b1262',
                        tenantCode: 'kza6t6mj8u8tdkx5ekpkl60yoeunpv3wr99mn75r47alv64l7u',
                        systemId: '612b7549-36b2-4d13-822c-f6f1b68a37fe',
                        party: 'dajob0l3c4aaxv7pg0as0994wuay54c09ribd62r5qhqp9k1fflvdzo1kxmeateapmunri84jut1z1j7imxu16xdskswtvmtk3hktwm5xarsab2w5hpujegmqr7is1hslgebflbk89jykecwtdflcrv4jbxyc0hi',
                        component: 'gjakfuoogh5hr3lkfk18fsgk4ixzbgye3exqrnenopq7gsgx93afp8r4dy33ou0rawdrh8pisiz1ikk3figmrq0hheefo4qb3xikonvhql3gd3xgqmkenio5lrz7fnhm488qwot2mirxjeyze20yno7p9w7qaz6k',
                        name: '2abxplflopa7r2kcxvlg4hxru92tl71898raax8pepzo5zqjkanmbtdyp1i9srles62i2ik7cc3kxinlimf1dn3adq9s6vrkrthrvzbxe9juviv8i5o3d0dn1tv49tn9z3ffu7l7bxj2j8q0rm407tqqtuii7xal',
                        flowId: '46a7729e-8058-4b17-ac43-b7f2a6a1696e',
                        flowParty: 'exl9b8zbypn0huuv4yluotszrjl62e9bqrrnh9wb5i8gnuauokxdvy28cq3n90hs6bavati889zn7ug0wykyhrhe06ogv70sego7rcrdeoqj1qtpivm219e4ojcqbjg1q3kudl6bbjadyi92oz66sp011sfadjgx',
                        flowComponent: 'wv3nbk3lry8v0ga7xa4hnp15iqronvkm7t6ztin1nrimvplqor1asqtw3ldgt3zqqt1e6yd6x5zyeiopy0ibn91tgmi6mvnfvztgwqt9dnz4iozll7odd0mqin8olnxhzu192b3kdttkfdtgc4p3kt9bm02e0sf2',
                        flowInterfaceName: '9ffn3ynqg9lxq0is2rxre305giienpcuiov53ypjsn7p78fvxkdzbh19ra2sh3k7zzuay7z2wr1wl12bsuqy5ud4xoakks24mjfn3unf2ekbx75bvj0llzguvzjnbfkpra3k7hrjiy73tjs897df60jwktu5se75',
                        flowInterfaceNamespace: 'irvrr79zii5tzch1dhr7ofdbflun5280qvw6n7wmqri6nw9hfwen0i43pit1bl5taj7vqpq469cvi3wjv53o17xy5127ggjm0axy52k1jqvt5xilkugulegmkhmhr660sudoaltmgouw1709n5efx6nhttnaf5rb',
                        adapterType: '81sulkbsyx7nyzvlj02k4udpfydc84b3vyzygc96fii5ojbxsgm2gv4ida5c',
                        direction: 'SENDER',
                        transportProtocol: 'xji6qja1k0wsi4qbbqydtoc356duryp0yziosl7j8c2ku5pz6tsn5nqsce32',
                        messageProtocol: 'nze46owu8hypxc6y2a4vg31dko42kfl3qo1xc4yow5rfe4qibpivrlxtnuzp',
                        adapterEngineName: '6ji3nd0jdrtkpf6gh549k47b4r7hxpxcedb2hem5o29rm92n3dmj69wtb7uayyozwfdhl3hhqilmqko3jep0jwg0lnbkgqu4p77izqnjerwlpldlnopvj0obngejuvrjgnlrkltm0vep4okitvy8j87733hgui27',
                        url: '9nqnoqj1grczpbot336cwa60z1szof19kf4enf8mxpqcxz2ud9vlquirla7j8e8u6cl9cp3cpg7d1rizer4nbfx394caj0ngrcmonk39w54qydczonpl4alsb345irmkrmi0zarqc54fdomhpmw94mm8pwjlvt1jz9d5htjr82x5zk1e2idgv1pawuavn4lhtgd74q9qgxlq4srq3jjlvo7n6ncwvtz3sk8fbp2gaf0ajzjawjtf5quf0h42j9fl6r9zdypz7zuk87lq4xj6vgkr45udhenc2v1zobqtdkdfiu5linnhfgdc69kk2wzv',
                        username: 'qmlpn2ajw1ytuoo6wde4h82jknqalub5sy5oj8au56ec3qv2p3r0reo2cbsj',
                        remoteHost: 'hvnjm0p3kiks0d0sn9kesyr5w602l46ge994iqx9ru03keujfsfil8ernvb2m971lzntwhyokdscz26587xm1bjx4lu91l040xh1n7s01xz2fti3b5689up3yhz8057edfd88sfehxuo3pr0ylj2pb00gzeq8z4l',
                        remotePort: 7692633706,
                        directory: 'e8fs5ep48ns7pppsm3vdx0tezwqexv28dcrujp6mcdru5xvhif4r6u4hu8046ng1b4g6a5y8a2dukbbtjgzmi9jjbd5iylh33suvsgzmwk945nsakl1it9v6rw9j388cvfry6bzc1vqrgasoj4u2l72a5lesjcb1afmmat6sh9qez96meldlp3mn5vleh1wf8q6lsk44h2qz7xx1d79gjsspf0pyyz5xaj2nk4ngowzx5mevl0qp5ho06ka7w3d2qtk8jgaadx31510u1d6d4fcbzip2gf0z0bpw8m3u60o0vt0ma5n6960eze0ynyuo01kdpe7yxojerrl9y595dkyun9mmuwltdgp13xsijzzsooqfp5es2x2go479f353i9rcx5bv87wdmcnjhjdm8o40dl2bk1nc7u7ccuhhi892pdapmkimqzz4ayr5rbo77h8brqeug3ns5tf7krp3yxf2862dp8w821zm0jmo8alrh6k67i6mniiiu13kw1x6smtle3lntqrt25nd04txv2dk9jd682m4vwoytblx98ra3lshx8l4x6o212nuflrg3zty44rv7186pt8xg0bej43xkhbp9xi3rpb0n8lo8rsrxgk4sua31jongns0t8uay3xtcgwmh2xqctaqfvwvnm8vetjd7fs3dvof13v83953dca7uj80emv52lui57nhz2ug0g0uppizjfa49h2e6td9b3ar2t8w4033u4psezansea2e9a15x56wkrn0jvi53lyngllwz7leaubzf9l39gf7qo8qtmb4fa9inkb5utnjy6g2zjca9m5kvy7eohf47rg2muo628ke2igx483x0zdn71jcgohznyrtqo190lww3fzyk4vetqsxewptv2t67p6j5llttoqz0t6qf67wba3h9g50oek6i5r6de8f0f49jh6qezmc79y6g6egwe7q05d9zuzgsg3ibqbgmdvij22gy1ovcid89hegsrirp7lt68gaf2ysr6i8qksbuwr',
                        fileSchema: 'lml09nupmow9qgvhfzmtaj9qnflxy1yksk365atuiopxtrsu35zg2h24mor3rabx23vh0kz7hhvnwd81rzp4rofrqimxlj731pifjp650wnrnctsuxzkao2uxbw81gm4rcqw3ma059fnxs1pyjmi1mekl7gxt1jvuj2uayyztkf8luj1s3nixvphby9ukudf1trzr8ypechq403oqlq5wsg08akpoggheunzct57gckber8b3m0nv0yk1ausv1kax8bl536orak3dqw2ac1wc5nb88izxkdkzfscd7teimzj4i3cqjx3ze5xomxw3pih0hck3y0sxo894yk7cmm4hwfbjpnita760csf8brpwmpz7r3964ah2rfiyyoe0goew3thu8qomsi9vwfyp64qynhldx03tpmm8k53y2lkl0omrdmkqhb6sdbiov9fpjrmafye95zxvvng6aod2g52s48etusy3kyw0qk2v946bihyh9dchuymk5pafxvw6i6qf1uvbe6bbso6uox3i2aeo7402riglm44jlsshz9m2d736woro5idktkailyijh07rf5vbl1gvoxsbspis05egib54h9wfv60yh9qx7tplsfteijkmew64tbmhxc82xzmqnp4esn2lrss7qltt3o96igaf6uwp05367rj5jje2wpd7hikhypxovy6fx6itzyskh6wkr91i5260obal0nhegiyimw08s6b8a93kba9jr1qi74jbwor0jdyrnzbjg6p1xiokqsq7c2vk6zknyai5rlv7yhi410jzomo32nrbsnuj6xttemcmisrxp8b4buf731322jwftvq58hpoq79ux6333lshk2ix7350g4bz1exa41i40ajj6ards9nwnyux9tvx8mburrr52c4jw66aswzdv38qo0plrg3y2t4m7zsdj66yjai630b3erjmh7gqgsx7htgjn5y4fep8i61fa02y0vptb807njyyj1fv0cgm3ys49eypuqjo854z3ht',
                        proxyHost: 'tokedmewgi5dazwgibwvmigcf0wbkfv070swap73zx46yju4fv03l463ffvv',
                        proxyPort: 7191021464,
                        destination: 'zzxcw76v9iuogsqppqyh6g96wdx3x107lmzvtfm23v5g0lo8yvzb6v87vif7hirrfd52f4q707ycb8f3i8r53c1ena16oltam2g1e7i4jh5afiixv95g4v009vn8m1ru3716320zcy0k7ia48t3ckfup9334zsp1',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'igciphb7sud08hrellp9yf4nq553lpd3t4xvcwcvu5ceq42bgw4g37xab3m0fljbgzqewuecc6ecnutpnsmcij6cura2pajjx22kw505eam571tuvcihp96ieuzv0dcm6ixg8uwrmwc20oabbwuvlmkv6ikdqbon',
                        responsibleUserAccountName: 'wh9v1qd8ccuu0ahuit45',
                        lastChangeUserAccount: '9f2tajcnjzbq4kymnf6y',
                        lastChangedAt: '2020-07-22 21:30:35',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('92d781fe-5dff-45a1-a3d9-59fab62885c4');
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
                            tenantId
                            tenantCode
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            tenantId
                            tenantCode
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                    id: '92d781fe-5dff-45a1-a3d9-59fab62885c4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('92d781fe-5dff-45a1-a3d9-59fab62885c4');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});