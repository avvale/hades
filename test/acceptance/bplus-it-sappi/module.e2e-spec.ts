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

    it(`/REST:POST bplus-it-sappi/module - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'k5a06orjfrp72unqizrw',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'lg92n873fg7oov1fdetui010t2lnchsiybuthmo9ci8bkyey2u86fb3209qkhu6zjhz8kh2qi14kin894ur69r3k60wja8w02bpxtcpu6x2c91pmwxndhw5gn3qqsug6ki1tar04ub1ktsozjexsztq9w1ugu9g3',
                channelComponent: 'xtm8fwbonqataonp8dhd5s1pzwdvmjcxdz37dgsyqzh3i9lv1o6irmq9d0nn9kwzf0rgep6ekr3gw6mjpp81crc12csmv0wmct1c8vno9fw37f85dt52998inwjkryw5nto0gldmgl0073hkhmtfczpmfrpl8dwu',
                channelName: 'im903no8x5l0xntjloml5g0vbzgho5c4i338ieurn6873fici9l3fzoc4ehhlt9d5sk9exsrq1ztdg19p49on0eox1pnk1mrybkado8fmvk6ubr5ojle9t2hi7z65kkzjng0hvugkmlu3m0po34c0mbpc1vijnrw',
                flowParty: 'l4z0fedms8vtqyk07u32vba2r9j1ddrbs468oc7pfu8vvn1j7i8nwpnqrsayi9r6s2aiyli19swedisovphu7yyj12doxu8difq1dfqn0jxs5u3i4uw1h839xwhii89ecyuo2b1e5ejdl3aoxhu9bnd191fkmukd',
                flowComponent: 'sfje96x9kl2s36ugnyfgiiufl1gofi0docmtsfzit71dre0ls1tiftffzap6mx85qwnqvyjxfjhm6vr8z9dq7u2ocjh8u5e4f35o8lahscqjnjs94caugk21211whq5emayjwjihkml3ezszw6hhc61nci9fqnuk',
                flowInterfaceName: 'h2dxeci67gyepcw1t5ybe7jm3inoaym89tmbgtos293kkssf4womoeek1rgodzwtbvelttl6hpjwz9nixkv5otv5jzb5fc56sjddrd0ct6mzejwxb9eo7pkvn25oxmhpjkst0ayer7xbho4or6sv3gy44s61z50u',
                flowInterfaceNamespace: 'po4h43wgeef7xx09ycgx1ivh1ofcbydt5r43v4jkibgo2z4uu92o77bxqaje73pd39z4j7e2ttlm7er8fu7qrx1rjxd1dhd3v9o4k8d92z8959tuuw4cx9t7hb2ye29mn2eawww8cc0amryy6bwjo9nlcbhm1tzz',
                parameterGroup: 'a8t4kmjoou2n84uc5za29mfdc8f33qoipbq4r6s9s0uuaw8864ha9hrz1oyr9ka5y1aobpy24e4prdhm34l12o3o8yrinpqmhuk15p4mpntjddrr2zblhll4mn0n8fk72my4ifcq3jec0vf7slr15c8d7vvfbfzcnx86xz5kazhe1tiq0yu98t2414oqp7hwkk77a1t5jezd3noewnmhfdbxw66i8kms0n7ou1gw31du3t27b6rvlbjneg6eqck',
                name: 'h122bgo8h89n0c85k5cynmy80ye9pt6jgrxf72q6gxy8f8d0vpzgztywr1rzvgzh91z9we6zzwdq3lgyopu3e2vq3427r6t985b6qmeldf4kjxozwqmygnl1j82s00558uggqui7oln8djqic6kqhk8pqeaz81vua7i5xo7kjb1xrxk1nfbs7ykf0fa3dg4eulimbu852lxhocypzfigt0nae8vaa24esie6er5t7mdpgnwysjv25ma03isz98t005citz28vd2qnv3oxvh60ysqrbctfgiiap2cr1amecfh9oos8005ijuug6sombre',
                parameterName: 'lpv842f4srxf6rifosws10g5p3p3inq8sxt2j7y5ucj5fazv2bvkaqbv01rbu287fje1z8ooy13gme5dcydlm8q0erksvlys0wosv0l7q3ueiwq3i03isu74frjy6jmd3p6aah3yvqrcc4obst3cw5v6747ly6s13vpcl4ob8lvi9ji0pyqqzakghzub192w4b8v5mhfaviu6ly6dxnghae8p808qr8gcgfpod7mlghfp995ynu1iis7keridsp37w2ysrqotg8gq0iiawcmua4xuzxqicwqaqwwzjn6qs8m4nwfk9gsw7qmol6hoaj3',
                parameterValue: 'aadvxq9jgfhurfadhcgmnct1lcu777gpplgpl03d4w4qpezb802xuid89yef7r6e5b7l1y1og0eyj3bgnz415mdkcn4h9yny861q0pb2y0sjmzt12ytmvsri6whq6xhe613t7485w4cv1lywjkrgy3018nkvm336mwj1vufcecind4jdex7hq5xnap2nct1idjhsjmnyzg7hxjmu5upf3hvrln0ysy0asywfx9nm5o98pzlv3uybyl5u7nhgi9vq4zlnbl9q3beaynd79xyer06c3l8hi2319tv09uew1uinmygasgfwayfx2hj1w72bdc5wk98zm1fkvnmzuwub9w6j97yleoozxq086nfqm7vjuoglp51af6wlb0fv62gs5c88e2jsxt151nima0bivloia65xfnyyze7jubebxrmzrlngnm0sxy9m1w59udg40j6ujm4lkhi8o43ynvrlnx34yjgwzviastvbhgh3nqi2gjnbycp2nxk3nwffsotos51q8zjhgi8wv74p21go7ondlloo6tsmmzan4k66hbypm7ts3cwk4ur5fl74avcn1e9j7jpmty23lgvckxevz893sqc9kye69jmsn4uc9ybr6rrdzkllqowx5q0dyv7ninjgrcs389ktdk05o2wrgi6ph32c690nm3wnpw5ponsdudrviey4qo9jjddfj03v2u0mb20slyf1ribpb4gedtfu6hqhd478nxfrf13anj667lmbnevymqn0x1tggep27fhcjks04drdr9nctpxu2uymepo9r712djgs5wfhdcmod0hp6u63hgykd27vsyhmix1in6v3bcdj6j3z7gprzr0tw9c60irpw4kuasreoch7k4xqe6ofx26einyda8f14qaclfeqcu9qc2buc7ealwhr82a273y1kfl8o3jkt9imu458nvg5ixohydbjjsbv1qbenoqrobbrhrnxuqd4tfqii14r7obeqocnir6ocm0lb8btj46bty2w7hhtdwwy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'wceomkl36vxyvmwvbd5v',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: '237984f2ipnkvoir32on7lxiz6hmcwsrraqpbdb0fwisdorao3iw1v6m31dms2f8yy2tyheqv8o6b5cqsg7lrtfhwl1zmipha2r99lbrc2uq3jqf5irdbaf4al8pk9m9uavyxw23dwfv94mzl081hqsj78rtzqns',
                channelComponent: 'wbkk8ld5w2yrrxwi42tfnyjzzmixpa23v44kw4tugtscnlxdncrdakilda8e7b5velkdqshx4kzfm3hs7140iytqmoheqdqisvhniz5n1v86jgrphar5c5k6yzfvtyd6d8a6bnqr6g545u4ae9yyhnefjg1sj0cy',
                channelName: '8ujojm8vqngdq6iq6faog10j10bq7k3f493rxaq8mo9br5gab043w4cqdnswojfo7nb6ltcor4tn4c1v266pcxdtw046mfq43v3602hro18kssyhsohhkoa3xqy9uq2xrots3l3cto14uo4wxd4cff79qkr3dmtx',
                flowParty: 'avdgm6hyg2umnj0c8y7u2gb30ebw4t2p5svcb2tra49sf7l5f9mdeunmg42arzc0ucej7du2scam6trbrzcb0nows1yhx5xlwz5vkb7iqrevdopb82tmot4d8ixkl0z879eue808eom3albgmwyuamvv95g95gy9',
                flowComponent: 'mnil18h1k3njb6uwv7xn571b09bpfrz6v2lw1o6fsd18bj3kvppzpo8ujmq8l7gmca2ad98kglobk0masbzm8sy2kbm7oao1nyguyr29r665aq0qc8h6gpcm14jp14nb6huhq4k0gamh6ki37cmc92ucpiwq2upk',
                flowInterfaceName: '6rbpayo4561eu678gbx0o6fky15lk4od162sjp7tg53onrehn7m72vcjk3kmx53vn9qkrcbifevajl5ebodwctpva0dhd82wqwothps276do6q2n4sj94zh6l4y37dbifxfvt4y7gyvhwrnlo8q0xux107wppnuh',
                flowInterfaceNamespace: 'zslya5odxalh2zkxdyack1k8f7yv7bd7pq8e1aoiefkk0b1157mh8psqaik27a5b0kbm19keloyynsq3e6esyhjtk8iyz19dflk3698vwye12ods6upog1uklxumubb43q1pi6ssq7px26nj2r1vrzazkc9mxrwc',
                parameterGroup: '2e2ubw3pasqycrhsyfkatylqn1u5obaszduf9c6juip6cjkfgo2uf5rzmrnzhfcbw9yj1ef4dijggs9c9w59fi8pmi7hzhn8l7b21n4kuzc8u359xqndx0nhn7m3u5d13h1ysim7cimu9qy4mykmspavjpgf4u8gmsgnrdtxwj75nd8qhrdgdix84e5egac0stohlxfvsxvh42yuq47rlyntg72xjub87c6hjp362vzblmths6w6ndiasnlkw19',
                name: 'lp2ujj0gvfv0en4fyp88xcvpmewo3m44gk2borabzz7tijtlyhk1bqo14r4o6mi0gu45w9ierve8nv5ro7hlkto8el3ara7tbci2e43vtm923a47it69uo4bkxpb31qqm9vt8sgh8m5x7p9trvsc2vzxofiivhiu8lyshb26nbhtk4u0slvdxxlq5hm9uz1xyzv4x03jnceh7pyn15ih47xqonchlhmnxpcq9d0bqe5ua1jovwjtayrjdgh96b0sscqb405dzdvjbpv8mzfyhdt3pc9ga6enope0rsf5p5tcsjvg99iex7q7vkvmuh8c',
                parameterName: '2yvfpwx4aymcozcrx3qpyqm4yatix8y23925lnc43rscks4g3vh4are092ppps6a41na7ihyyp0dr5kn1qopnalfda7g8k2jcb8lzj2knjli73iye1tvc03v92uftge0x2aa1a7a3i0pud8i8g7aw6kf7ou0hmkd4ks5jyh4vhabbdiafa8xzgg5k3s3i4844uuyosepvi7hmaiwzt9ra53wd89clbsvas9zlev3e5p9byaglqvpp8q2crwugx78ludaxtb47y3jllxb7ecmz3ip1aoqhlsw07kzqz7pe1qyu44gymj2lz064t2enqmw',
                parameterValue: 'clidkdxrgrs897c12rjfgz0fq3c1n86o8g9rnrckaa8wjgrh8er569mf8nnea3vvvd4c9ilk8yh5gbz1vuls4w0ozap1w96t5lsy445p4hb06xgvb4swqjifwdsptskcena508v7z8raginpmad2lez0svlmcahrho2r05kqe676q8npzkdnx5h2168n9l2fbtuo2kjs59uy4c7msu1p7hqw8wnyizxw89v5o6fe97saktla86elo4hfdarvpr4wugsj0vk9groa9w9w9511or4knibo6zr2lttf6vr6zb8j9a28q147u4p7w2ofzje0m11sgqszasvf4yjb33qvikf5raj2q6y78yimvsllxf0zvxt036pzgpid7y2xvsd54pqwlf4u7qoksppxpgjdxw0qpmnsra00yl16x0mn3h08wlrv9onp4wbolui4wpuuskdyicxwwghi4vogrszo36nxzaqpk4vq88m8h5hlo2k9ds2pp5w13chb4q1w6c4onjwtmxhlypm7rr8t8dnmqmx2yy1409d8f5gi3wvt95ont35cz89mz4i8296byegdzwj1xi6mp5n95njomj74kd59yjeub2s67fmkzkda71m5vpr4a8d2i2gkoma80lwolrcxjde6ir4zsv2lrav904fnkc9c8fhcfhwdpm14312vdeyrz71pu40nunjk7o1a8sppaqkr0sfi1b9da2crv9vtxsw2ksra43dwz3n344u7h5lrn6gytmk55w7j3eo6wbiii5bvw2whkp4qdnyup2ulnapc2yit14paig1ifxfprsuplu7jkwxfe6wdpuj1cbv7phtodl760m3ev96x1om5zhlj4iusoo1ep0i8170gdo8vlolsbrnmzai9n5rmnfligyfh7jtyyxckgowmwlxrzfvvsp6dwv2vd2s4hnjnzbibybct0oni0d8v8bh1g853c1s88owdjb229x8zerocfqk0bx2cribm8d8req8cpyvhfy51qqi0tye33qzb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: null,
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'fed613h86r8y8267adjp',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'u9kvwd45rvj5iisdjv20byot62kq4oetzkbxr92g8rsj390nhfl06pan4y8ho51mpowjbghdak11fohvhmem5av85gwk2mpcxwbeuyb57jdcvo5rfq36wecoz2bpbo7du16fxqvg3vti2gw40lh554octesg1iyq',
                channelComponent: 'jy92mv0dzelifwm0u51l1oa8vsy3vho63ixd78eqx0dcchmf1p9kl9u333jba6g532f0s315k2h8zsfion2iqqgvqv21tdamb2jus7xb8d3nixuchq43eypzrbamkal9wi6ccu2zjbt6xk4kwu9z4qsmv7yuy83l',
                channelName: 'u52nsm8wvbovw1von3ipk357cw8kms7h3dhtp51bruxiypj5er67uvkq9c0uy1rtl7qs27qcsic72ryu5elgdu6elu1z723s4t68t2ohrdqx1vfpm3ns6mg8j0i936p1f2ko43r9wmv2fleku2qg4md3642rfnf4',
                flowParty: 'knsqasgcjqa6bok8zt3wq92h86yyskxyynpcsl0fkbqtt5i9w081quwh887qfm48oj92p3kar2t1spt0owl9v60osui9xrnv899pj4oiixwor811ax50td5fz59ejjpz7u2beoo618n4u3yzcavl7kwzvbgzvr7r',
                flowComponent: '8pnavrnskhi018ovlr63tkgsvqui6kjkzvkudhi4rgszbdz432753ts8b6hogwb8n325tsabcq56et7wk1srrg564tikzkcz524cwo2shgeblnic9c5wvj4t1a7cx0pxgmgivznbt6c4h05y7vsf8g49evlvbw4i',
                flowInterfaceName: 'e8k6ngfi6ygcxuqi91syi25l5u4t19yz3lwllw7x4tkhnx5bsnznc3fzwtwbsd9mdgmtrohurnqvoz0o4rh76mgsm1eodr05chhzmz9u2tv3t7lmsbi23180fdrpo6jq86p5gd8zboe8x1snocgjhmx4mfu0bl8w',
                flowInterfaceNamespace: 'sl5xp6fo2yru24q8q9cofu8gtpst88kt7cnyezdirqpjhl48pw8qc7mi91dgayucgtqp2gqthk3l02ixf87zi5axn2tel3m2jfgf0j7detvhzj7hq6ns4tpfwpl9wjkjqpeticudtspeo66td2ohzv8d43401pmf',
                parameterGroup: 'g74t48c4i4bf6byceazvx0siiowu7ca1qwnrfab1imq9mcuuor9fzazlzqkvmu67dn3vvg7o0sq2hdcng9dq76skdr39q4m9kj91357vuncvbuokj2n8hfyj0rmqayhyuc09pmliasywjk02vu0lildlvvuec5aoc8dt8ai6imoytfo7eqc74q2tdc25yem0kbmjvbf9uzjq3emk8lxjshksk5x621g35xmubbbaw07vy7wq0exc5sejyvfxlo2',
                name: 'v4aebo4lexptjlkig12q20qw8v1tsn5izislkjnqzdmvmdtwjl25zb6gudtmnot9aldry5mj6ynl8ktajjtx1vzu02sj6xutwvoj66htkijsp3w8q4ig5zl7wc1w5w16wablui7lbtir6lnxuvgppalcpfr4lfe1pudynfoiarmvta57lz1jombrq8p0k7uro8zagpenyf3e48szru9ebzzawx6onpfj852lpy5l5dv6ler6624iqq9ewf83277s95shgmwynxkze2hscqqze8eprpwfvlm5dn7rzrud6mgskzrno239la23ex01x0zc',
                parameterName: 'rxy9rl28jke910y5xdues82nlp6cwtxjxklce1hamoekby7q4jrqffmih2izl4vvksb5sn2salqaonzzwgkhord43evqhu4m2ybpmp6mffawciejwhjpxciu0098zpe2nj5rit7q7gamwbxjakf428909jzhpzzqndvbbgh0ysynezj2sah4uwv622xnl2o78z1w4k7wjld836o63it10k366wrluhnp0mxrexgc8pzb95oaayyu1m2gt4s4jlyhdj1n74a1g8dsbn1rctdk8krj587mu69gi0k0vb25mdbbhbdurjrwrzc2mmm7ggcf',
                parameterValue: '7hvgacu6un7dgwcolb3nx70osm3ew2rfxbq5ahteb7qltbjrv9g6o8126jdbthffsec5np93y0gaxc1qdjdvtpqlrre1r9ipd64dkpkapg3sdvi7n5a32ju87drny38trbojtkou7w89mh5wnxaoni9e1a8xzrty6am0jfjvngopoog1ytfunbgqvnalh3izu9y66026v6xirar52eydh7bgg5ix0twc2jx03bfc3xkq993bs8ix38qjj7n3vjfvug16n9u2mrc0afp5thdz4gi4n09k48wa9v2hg8kl1zlrl61jss8828ogku1hi9dxj05r8y1m5syzrzq3pxmxjdzceahn6doo42da7dkrkf0k8g5t0pv8vdxnvlbmx52f2mfr1fj7gmb7hifooi1iiq9ca5fq48sf682ag8lfqa7b8eec66hn9rhhcest5exf2hmmmxl7x3vuabupxn8we6iu7yl3wwocuohk8ktbwo037ghm2q4926fnhfgu492zd5eywhk9d5bst8cl6knrwzea71mnzz0svz637371sl9nc58k8riti0eovabaqh0pc5017zo0cbbkgo8kfv7qfbdgfoo1i6lepy1cj4on8g2c9xe0gl8n93525a3j10mg6vpd3clq25iiptdjj8drbwhnrr3x9sq7ne38jyyi8hynghf32y7t8xbsgm2lf8l0yv3pkoa0pwtnr6x26di8pxbycx8qlniphhmw3yv1pj0fccrjtwbiuisqyp1f02xkgedev0qkff8q4yl79pxoywtrjs68m59rr4z8nrmtyglrtkq00ieu03ey8q85dx5ka21gcmfzo6ce4sblgr3iggckt8awtw2mfhkvv2h4yj9tkdk24bpa1dy6j5b7zh8kyot1ivv53rsj3yc7gzn69ki9b9ss2ozco722grs17gb032dxugr8a2qwxu1q9wajr4hfrcp70asemqld9ha7mnc70iyxmad04yfa9l088ver67o1rwjz51v9ahsypzo7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'xqpzg7b48k2ndaef1zcu',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'ph8we57i06ve2jg330kf41j3ujf6nyuobcgryrmgcfl3wpfhmbortqlu1habsiqjukon3rfsnaa5pc1b29lit4ykjpbwnqtvwop9wkdow8zsezwpuk648k5jpwmo0mih6ua27a7te2sj902ayq7sguhwe51qs5m0',
                channelComponent: 'b26x9zdb9amliozuzvspe7l7adtnnwsyeahqyx2fxnxc0xj0qdvo1p93vhojq8bau8yt8u7tnzzmhbeg37e8d0sk88m218k0gvfoiy4f9xum3uklsd0h37fz8udjtxq9rtu1182cch6k1yzmbz32bsws17ksr673',
                channelName: '7hmmuthnabc9ll7tsvt5k9i3necuityg6azwfz1dqspq2mpwittnj90zocny5j7qkjqs1d1gcg7widpfbqxzljqheqn06q9tmpg23lyad2uia0icpaw18jgk9y0iaidcdp5iwrtlbsf0dh7sthic9o20l0rpyj2s',
                flowParty: '83ql39e8w12x8b98z3b96szto6lv4zycb88ryx4dbgslit4yqlopo0quwz81jb212i9ujibamnokdckqs92rbwntxntvuk0lzg5ivu6iftc1y0k6uk60aiuonikqj45ejppcukygz96szkhf7lzxy79or69rbj1u',
                flowComponent: 'fybsyy9y5p2avv1ms1eglgabmxd23yplzd8lgy8xl5q7ctp11ij29mor2tz6migswdui3nf2hdotw71v2mjdnp5sf27pg4otxmhc2u6r744v2rgtcov8azwasw8u50ezzxq1p4uh4zum9lsqzudjk31nobj4lf9f',
                flowInterfaceName: 'qg5be7xqettbxgjx0yvpvz6g7sbsebvqdz1j0b3jcafid6wuzy84lbgyz2exs964njk5h1bc0bylyhngu63whbg3yviits51xloxpf46x4ppp2jhlyl4mcbrvvkor5kl9w82wh9zyjwqhoq5lbgmjc5iuvoc85jx',
                flowInterfaceNamespace: 'frsfl8uif9dm3sr88h02d9r4o40iun1xmh8mhzcs7z32rbm4vudd7x7ytfay9wmrcyxj6f6uhwzv2fefnb12rs4yuw0qr91ct3h6u15l8xo61c9pufcix8f3agw2ov8nntvpv2u3d5qejpwyomb8pnnp3samjnuo',
                parameterGroup: '8rf1lfdzdoczki4v2yay9u9oras4p7p43eb1pasw3zh6otdrqhac8bxcejto1kppvtm4p7to0fvoaells2l01ii8wrcoz2cjq5art8ljxdocoz9tfelu1zph0lpj1gw68mmxz01tvcdeg8a9orwws17k83pbbod3t1wwukc8gybnpxv7mi8o01ifydeqvr6e8q01qf4mn86c1vhbfdf2p436ar181djp7t1epbl3td62ttt3cy9z23h1l316n9h',
                name: 'ky91abpceoklr2ovzv1ztt4sctl1lr0ze1my75uawi7kseiv5ddpcf5oiret2li61gvgszzxkalpzikholpzhqeqqhschua45kkdh7qqvzklcdhec5o54vaazolzdnfjgu5avod4wgas4ifggey2uo4125jxjm9ira6fruv4bxm5hpf6guft7vwmk1rclc0ptwe5wkzyi3jn5stnrxdce9766tpwqxa1nxfqscih6n7p9nt8cc37jrp2gbqetrwspkpdvfp1gjko1sapv0fcxois36i0uojgv8s0vyptixx9jpatq20pzp2c0nodfvca',
                parameterName: 'jsyuxdd1lyczai3w3hgn2b0fpddgbs9grtbx1z3cpjrz422zmuuvzl7rcspvue6wyhxtcvpkiv81pqjgu2s6xggj9tkw1mdr7hst194uzthrb5g3or8vu49mid6mqixr0twcrba05jodacypm8hrx54pbtre7kkye73aksr6q6ousdu2vpto5v52a65r05bf1kdcjnfqfzgdrbpxdy2zr5qm5hqnoofn5d5p4d59gqxyrdyscr4wr3zrukrecit8igkd3xsih94g8hnpjryrnwdweir21ngoblhtk17bo24qx1y6k2l5l81otrbysxlh',
                parameterValue: 'k9369wtmjy3m0o5f4lgagq9ug8x1avqce7jtsmthwkvfs4saq57mduui81e0y9egvwjmbd251t7cpjc4ckpqwuigytc7ayzlujnbogdaqdkd0ax4snstxub0krj57whgvuox8d78aevp80w9antsvnmy4zu6sz9dtp0l5anjctkb58xrelfrhmdjeet35sbqgirynizzaauhq1q4nw2c3t6udoth47yheqz3dj8djrq241uwlznirvi2m6k72yvv1nunxkbm4jy7apl2b5tscgmv0wp84u4ia1fh82sa7xc6f0jkepnfb2kpcvvfuo3e76c4au6i03vu9bgb6m6h67m8ebq6ghwx43bppp9rx3ps6fk99i6jyx4lucxz9r53gd57kywshe05qxbjg1s5rx3mo28bqi48qwmisbj71e8atbqkhmagd37uz9asmsvu563b7mslvvx8xh042k2vol6bqnvxk9r3zpfb6u2tluoro987qbv67lx1e784npuinhebgt3j1ow390y8d3dm1d4v5awuxmif6xwohvds572k4c6xz92r5k4j63ypsg2qcv4xg13bqknfngovcuim7vjdxidq8d9vdarihf6nf98r5fdlhx2kezo0yzgvormluej4rs0y2tfs2fetacg742btftju5wng37xgizct3rf076lqnxhq5roujnpqji4fusz7wfsw8oje0q2bdqarsmcqmftkkf8phbval0ol3tsn24sn4k9zyg6h6t8e99twli2pj3ytyf9rwp92a35m6uw3egxb6jyvdakw41uvp4bvgerj6xagbqgzbkwo2dghoj5lgrckbut1w58vtseuv7dzy64ms4ziu42mlb8adhaeyzzycmte466eg51w6rd30txkij468grtpnk306kgieauzw8b135agg2kkkrrfxwty37ihsvzgjgof0w60r5fpuz3oaozelopduevbfavycxsj5sff8yghjmvs5dw07xyc28fugjt11g20r8tk1av',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: null,
                systemName: 'bchgq0gvri1kpcz308yo',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'km957mugesg1u9xgkipqucb269fy9972mfnvrf6lbt18uyxivedrzp7zxf10hpznzfgwwps7u75j9r8iir3o726x2pezmjorqfg1k9k4xow3ik497ji8g7n4t4ar8viroqdx4ydpwlrb2ah6hltazo8wmtrprjl5',
                channelComponent: 'kxwpsmups6lzlmioy4xpx7vrh48mkptx2ssy03egt48l7gsdw261g2nd8fbo8ec7adfv22ivvxoc9kkf50j4dthzj6hwqg5kih8nqnc7w0gtgecg8d2g2bh01eg5tm60arbdl2dgt71rbv4bwrncdzobi2mv49e1',
                channelName: 's0jl9qby98gc11gezf7nuk1amnxnumhja4weqmj7gsk3jqeqxnd80q4f0zudr1mnoo8qu14u1l4epcwqeisq1oa7hrokkzrrjm5plmyayqau5p3hyrdqpewjntiohianuymukss3hc13kh9157zwocdkap9kvep8',
                flowParty: 'r7x5k4tt1akqjdhqornyhdly3p5ptu7mni1oulv9x4p28p1hh0hz4a2di0c61j5k08zkp92f8gg3riy416rqjazeloulhzssxszdnrdenbbtr860tievk6n5xffjrpwc82nrcfsz0xfab07dknqqak09tabtdamw',
                flowComponent: 'av2fpn9uqiblzyk5oko1a13c1n5z1wk7sxo38dr2zruh0silhbvar8em8yu99g8n6vtavljs6zaotjegbkjlb2vqqp5mve5i5jus4whq05yqbtyrkb92bnyjnwqwouod2dbmqrgd1ppahzyonmmweffs6xz6xoos',
                flowInterfaceName: 'apkdcsm3dhbser51atojbzm2g5fb1oo9z8f29b3z695gkauapbrm7bqufb48mc35onzkrm8i1iz2subqf35jp49hi9mwqjja9cs7352rmalt5z3nj0knqz7cg3za8z6aqbsfy2ta2t9m5edm6u37fmxgfwmflwja',
                flowInterfaceNamespace: 'et3zcwr8v3wnaj2wbvqmge66idet26265g3604vibid8shpap9bzd503ks6j4ae23vr09rbfd01bqlc2s145i5j6fq7q49ao2grz7dvrybwz5sh9wfws5b8sq1a8i57yka7p8n7iq56dyvay0zowyte24b15sql2',
                parameterGroup: 'hyi684zozbec4dq1avehf2h4m9golxdk4s5gtl0f1l9xl4asyprtdtit3dhlqrhpjzi7zx3dm6679nbabhddpiwv4zxtysdmnp9d717v4mf1mf9dy6m2nychno8cn5o9eg5z8pbp1fhedzybdgx1mgl0brahtsk3mn7m9t28yevyypakkxg3v7u22r5r9xt9lb5j7vdnmdw2j6jm9lbqej8k528ripqcn6ubruw7vskbr4rw7brozgbi1qqqyym',
                name: 'cu8lqs536gkujsp5b8jsewe82p90cmye7gz6umxcnyruzd855pa1ok5u5c2licd8u6r6xp19rk9ze1f1a4axr216y4d8fp1q12ib07rp2ikdck2tap9d4ykpg6ujkew0dibmwzgi5r41kj3o2yjinceit72orbanqnytibt6to374o8jlmtujqcxk53hasoiea8r1ch7ttp9h1e2fjwkbla5pfktwmn5laic5a5p39wg5878l7p4t19rwjhawzs3fgod221yr87b7866ts3k30y0jeo17diy2hxp8njstxlzd09mdzxg0ub4g5vewlht',
                parameterName: 'knp8pxrt87vp53ngmfasej44aulzt9m0ww0y00mp6d13n7t9vsvyf2kizbpbcs4zuceep4r9euv6en0m0d3ires48ghehl19l3yyb40tvok6xyqdvs3un6rff8x6m3ai84ncovtbpcvpmix30dcusqc0yt7hnvak4l7958oosk233ei8p799fjzm88uytu76d2x68iexvfhktori89lr3luurltv21hz1qlps1ji09457vqpclmsuwc1xfe2xqurlx70keywou695k7innlv953ysic8f6aqbmbg868zxemlpkci6r3fc9yka2irzmj6',
                parameterValue: 'vd6z9d6psc1olzsgnhpw225xvfwy8bvsab9anuxva7t5gew576u9zmi6u8apt51k4f8gsdpe6hxvr5975foobugordw0aad78m36onrg5umofs1t3f4wpkl5bctzfttyuj6fn3dn3ytb0zt1zq22z2elv5dvi5mponb5s6xqiu3etvpc2qxjjkasmqou0oscqgic1gkyql2l8wbjeusvfiiuv6zfuukpphwdxnbh6o3l3ww62qhqup37i2518g2a31gavpugx3dlh63a9rja0d9tgpgm6veln0yyxk8in3c3erwg474egt3d5mt60tpkkcmmxct8sodc8digy8tllxvsa09z4nxnti67qy9q70jcprc8vwgunvrk22nxorlgtprmjcy8ujpcs24y9mfqndl5q74veblox99izpilz201ex2v2wb04zs3tpxn3ap8v2wo68xtp3zam9d1kmvruhbmq1yzte2n1ma9kfij47tng1yav7h2nlgaem82rgz5kmr72dkr8zk5mug94hyanh2kzmtv19yk1ry3hjs8mk587gnhh0winx0d46znfjmvkh7q7s3pq230a9dxvo5fnf7obitol3gtmq4xjqksh8k79u26q35gwzmesamzgxqctut8hyi1o37p2ji1j9huqzcjxcaf6k2gf9ly44hb84i103f4konbtdzd3ow0iqgwyey3295k2dphnlem1m31xbi25z266qhanj92bvvw0dsqyd4mwyda8yhdwwj8sgl89hwpqyo0t34gl895a9p9zsg7jteobi42688jxtwow1nt3dza9r3bhx1q0kcboywj3bnxeqngj69t5u3wbz2gys66v0ha8eh7locdi2sfh24nls8qp5ff6yxo1bp2bhkghbop6x83limxzh7z1ngu9ft8rwk82gxkqbszzwyk9s6isjipvix43meprh4wu7h4oi6wrlhtiiojz4aaef7u18g87pjc9t8i6h0lgijxce3t3lqjob6ov70hvairlhrl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                
                systemName: 'u8pnx35g1ppn8ise7z9v',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: '2ab72tdro2ygc1i928jrvs4zgqhjyn0rnho43kihghyey2knjyjpdaezv7svzkzcf7ac6b88y94vsxmutinz7iuqmaf34uho2btx4tbrucjmm6rril7zcfqa5kmqr0aucsn5but8ylz9mg8iiuejr8zs0bg2l34h',
                channelComponent: 'vun4jayx9cs6cngi2y2f7l5zr7f1q87696xj9d833wo3rix0djovkis9l46hc94mpt82vk9uhdnx9b9qmts00n1cvdg84ncp554whhkomudfus2gyhyrgj8me36c1k1lkklt8ne2v7kuui0os593qgzufuood1rp',
                channelName: 'hafdjxtqyomrho7kz548eq1tcjun6r64c6lbroyx6d52dhobcgmg0qzumynyvf3y6738rhny15spadp0rahc2l70auq3z8d50wrhiugeh7omctx4p0ciew6kg5ewpokvdvji95ak4qpujke2gvvdfw8udsspx3c6',
                flowParty: '30e747olquxuynjmv3in38l5o1zczw6cjprrjxkzhz3nrtg8vpjamm7o262m6g8f94sn8o5xzw4b4lgw9ptkdw88rha8dcg3taua8j005jm3ondef09xdtuup137runnw1jmm1j8ydo64s72acn1x9fy3gjfqmqz',
                flowComponent: 'e3gdngn5kk1hmri0hbf1pkdthnisj7m0pr1m3pyg9y4uobe06o99ytpk3dsqbgfhmulinsl1l4cuh2sp4by4nimq0e9wy6cwzut7co9zfba8bfeul711w2olnqdp07b3efeww46kc777vgb54st7qikb27t5gbbt',
                flowInterfaceName: 'o0whi4g4u1fwtjxqam8vnog9l8lpld5ooqqagw8dn8m8y1fq2bnx9lfmum0im0z2jztv2ctmco9owiedmpfqmtl40oox45k0whaouvtbwxhiszx673zq3s33szcn78q1mjyul4r20etmzxcfwoqietauzzor3m1l',
                flowInterfaceNamespace: 'hga0vc28ahrgl3x98ab8ucgnn7ruz7cs0hyc5nqprf72076yqkdfoqnpnsp3yub010w0bpaspex5j24xdaxkqsesmys7ou9vk2c2d8fmnm5kw8valpzecfyt83g3fxhaxr87d66i80rn32ismw4xexc4hpwei85z',
                parameterGroup: 'rmzwq74za02imv2n3mn9ifab77ftmp72n3wv6mx8i2or9srsjl0wfertuqfp9xh4q2k5jg8mor0mpskcj0f4658idhxega31jv68qxm7h4ntedt891bf0yfngf3r59krci7jsmrmlmx7u9ywwnrn0yhdjzd2yp299jl8jjxbmt9xrgrs5m50wpm47p7ppur0sqrjcxkjsdozmokqvifatd93tb7apc13ys44bk6uefb43nle4pk62o9l596i1fg',
                name: '2j3fr2r6kei7eybah4ft5wv802anq6vwx90kxj2fmawn8skzd4mqtgqqwi3b04ic6yfyca959cwpbzzd8s65w8ffeootf921hpggg5xiujvhen6jhie8dzhluan91prcbnv0lrtaqg7quelh89afsfgm6izl4uc6o82eebd19j1beo2nk1o6ufm3ch6wv0rqkm2ynxcwwaqob049u2rfrpiyktpy4thhztmr4p7p1a2apmyws5c0omuwr6ctsohgnh3inzytr1x7r6t2wjsloe371ctr5boch0wpuvti85c95oe63uk5499cdv2ezw3n',
                parameterName: 'qqsz9cx8i0q8wd1qa9v25k3vhys395ta10qact8biwrwcerwugzyrqklocujqu6ymkq1ur6qyjyztcd2fm7xq6w5orm2fc8qlc7phsib1pnk5f5ruvdyqfgzv2eq95jcidd0nhwmpxtuzbyu9mqckgyyeuw1u5d92a7lt3we8i3c2u3i1qum3fuwg7r2q0387vwquvpblmpbk91e0068chsj86tk2muk1ltupjk302msxb2edrg410m3t9s3930qxojvfzm2klter678yz5di50icxh7vkys0m83078acsshyhd9mjhygl5mj5znzhwt',
                parameterValue: 'ct47gcgv79g2zesoazza8p8232g0y4r0nedeqe8q6utqr7o15qm5wott5wisgbg5sbonesuymg8v6ccsqiclqzj3f1fq6gy0rrw1sh15hx6vqj17tyrh3qp8qo20yb7zmh4sy9iuo5a811cds0oj2ly4st5m7sna8bdqy2t7d82y5hy96tztixl54y7gxa7mow2lwjjiwgdp9qymwk1fwsj4k0ss2p9b5lsbvn6h1s1vo3uu7h1du5d588zdt2ufejhzkhn0yg063a5jf77fyjc5izyup2gy94ttoa3rh36s9e53t10pxh61qgkivxg5hdwppaqxxkfpcpnijdg2zin7qb5s4zot645fn8mic6r2ra6ipikjswkgrysyv53rmxvh7lc7fpmfwld58qb3obv5nvdhen4y0snu6nk8sg2d5o86xy6l43wuwqc7gnjtcq9yp4egaabuv7uszn28xth4twl8vqvq0b7tnc2xlhlq9vq3s8xtv4gmoxa3oss5fbm1scpwoh57s3f3b15uw6qrysmd42a0m3pv3zpbiqs0m06qmuo88uf6m5szexaxs4zhcwom3a65soqvfzljo9tdhr33azoiublvmr4d22ouenkq8znmdgvxi1im6leckpnooqby54r7sclqh76jd19l7c95hhc080bd2zen06sfhtfnek3k1eyqgljluwwj3ez6ysdrvkm4cmr7f8chr7lnwfiadlblkh654gsa7jpvh19jpw0ohzt05obfo32rdgdldqq0ek7nsu92qpm5ev3cdvheawet9mjtz14l59p4eepdd7qq2hnimeclx3skn6z9ooo8n0po8vw15v05z2m8np71xytsq24c40a86cq561zrfitcbttlcjcbt3cqof808q802alkrg638fxqrhrnxd4vw79z78e3b0ihbzad1as9i5fega3adp6995wtbhi0u2dyze50i49pxb9220fni99wcht0x5rv5volpr4z3t2vhy3bzi8j6tspvpax',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: null,
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'zt7fw0u6qggmtu5vvj4pylz8g2jyzmzptjojophn4gcr7lspqsv9f5sscj9jj6b5maf7yo2x4dvyuh9eavbua3ti28z3env7ar1pdgxz1jryikpbsty5jgjgb2g8i9fwqb0bhx3h6cga1l3fnjscjl7rzwstsser',
                channelComponent: '07oyc96euuwlgvh3o9imx3ny5glufvalxw5nz3o73w9ybsx28v8as5szs9l5houodzjkon043vcfr9cra4n4heq8gi70csj88526wiqrnl77e0murte0ov82o7bz6wb1i4afq6si0qkpn35zfs85sqhdtji8thl6',
                channelName: 'ef4qte1gl9g7wnge3g8b9156p3ydj58qvtg5srm8kx9zxus87cw8u6xgp496j09ltwchilqk9n10992a9x222e0qf7y58y3d4bp2wdxo1d71gpq7zvnssbcqf3jg18x4vg54swcvpsep2uygcm71e75qo09bwpeq',
                flowParty: 'mdv0xwm8x0nsxa8bu5klm2933o5bjrcwgri4okeorxnf7h9kpe1d0551tty5bh1s0qhi4bfe2oskurxwfpubxjt8t5q5lorwvd5w8p5r6skr8u3acvdtxju39oz783auw8hddglyrpztpzrfn1j30p4ogux8ib8x',
                flowComponent: 'wfexwgdbxs6819s7io1bpmyba080cb318mypikrub5xi4a3giirkdxnkmx9rr68l3t5zo9e4gx0uzdjmrmn92b2cqwa53sc8rbqbyboe0o5wnxycqrypvyu3p5yovogywyuz9et02w2mz8vpaizaen8b0w0m0ugh',
                flowInterfaceName: 's5hfq2w05p8qieblaelhooq7rihrv1m2asq58mssuxps7sfb24m3lodr3v2tug1iefu3xezeaocrb878duahcfhrx1dbg71ktvaf06x2f8htzd11x0mf5un061pxc35znrcy81gx7c1ddu9ilnwsku152gp1mt3l',
                flowInterfaceNamespace: 'tc0amgnyur8aaj2iraks14xmz36zwrte43wg66w4rd1s2nhqpifwffe24l3lipryssqoihemldes2dhxymyd1nco5yt4bhxmy8lh6unwp7zk2scdr3xhuf6inift9119znexhqw8x08s8bseodiejaprg8bj3ocx',
                parameterGroup: 'r8gd0bv9p334be9yolgue6c5x2atopmceixqypzaewz0nb5joru8i1j58n48m0e00j9szjb3chl85idf1suyccixzjrml4xgi8zmo9spm7rg8aj4klnid93o309c69enz2nau1q97c8x6tltowwcdrbjb1r0r6mcipckhj48t0yplssudgxc0jnzwtab1422z3kxmsrngd5y9w8ubswyhbypy1cp1euyi3r6xh5eaq6urph1g40i2pharsq75aq',
                name: 'o2bfsf1zvi9p8h2ru8g0ztu264qoxx4xsxvc2zztope3o5imizbq9blwp6mj71xh4mo0tmsk1ujq8qp1si7ldzrrb0g8igbekjnr5e00ih8oxr7mmb5hhfwc1xoig9vgz5pzdi8lfi75zjyf5b1bs3w3xe19li07ol07c0dvvr8fh5kj713pf9u71t7z1m6eng5eypvb0knx9gft79iq0jk84bon6oilr2ft2qds6ni0fjijwsjczog1t30rxy2f7iw8lxbjbn6bywg1cu1rh09vrv2wdvixmqm605g7uf2hnsx03s47pfdyosu8ks6u',
                parameterName: '3f1771h9hiio43c3rbkxrepuca80v6xtpzynsj9xkrgcufqfs5c643rcdx4jih4bl0xj31806eoezmwzw5qitansmf8y4146i5l9gm30to0owq9bfszqybciowtb4qtnj92egbp0o9zuludog92vlugv5912mm4unyvklqjfamluw8acjf6c4q2u9ff45xuggod2lcwg2cx38le9y7rtzto8xf6pg5wo5lvipbqwdo4fog1jff6xi3hqdn4u2i78fjwj2evicaxay43brsmn2icz0uros72upkl6qd8twlb8tfgsldrg6s3jqu9qjitj',
                parameterValue: '68dpqvk33rpm0au4mvmvovhpqvtvpqffywo52v8111vgezw6ngb35tesk1uafc7rmh01zci7asrhgh8zkt069p5zr1s3rwjkmwynlx2lvzu5sauwb5p6w5g7nke79cyc6qcnnzvzg69lt2zrtem378xk3nze4gibbqrnlxdoqsw4hdbi53j6ijxbwum9u02bu36c4zx1tpuphc6w9j3ubzhkw67khiopfc7hagwu8mmxy2k6ushg8rf3bli6tqhqjrz7ap82hx74r5mvdx9wgirk9lwfxy47pmjibuo5m808c4it86akju2avt5gomuysbc2gexos9p5nmoz5s17vdujvlrwlxs7dvldgt2auhs76zyvfditsvv5j1c8qoz77qgfow4b8r32h8m05zdh1llf8ylh9yownpdvjcjocye6v4tnnl40wrtfonmsbivecjr2p85cebxs1mvc14s2xi61gy80t68y4spqawdcu2ztck0okq5c2r53ui7dhx9k2q43tbwdok0b1j907yws2f9fy12a132218eznn606m19fxoxplfruqp2vvw6r2w9i9zkbfl4b2wqnuwbbjvuwbkrq9vteaw4r5hlvehvgj8p23544p46uip82r1ymz9hiwx1v6kxl8h3p7dqcqjrbg6mnk01wpled3px8pjl9cjbiadjjxbschmap5h7up3dmpy04a8zdnzor8eam5rnlhxk5dztyi4mrk51vu0nv45cwdduel95yk2dnl6zoqynpfg43junkqcq4pja553lbwwz9p0ug0p3y8ceohumhj4em5ych5r8n30qxuttp2k288uv43idnjdqd48kvfzkc804r9o84kgf2wjhgap9m3prc5hpzyg92rvs30gdw1cabfq2zdwpmc4u7wd3fue4n8mmhk163xjezbdcerjpwghudqzdyuwnswvtxwi8bidbkv909nq18swbqfcfpaaesbzpol5s898mpewlhw52i7ezziu395n5xvuoxos8tt36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'mqbasgmrxhk2y35mmzv8wjpsg0vqgjpyp85l4h2f6wjjm55p5wrs96gmv7492eh6rtqb9xjdnp4rsubhwz0ycl6as14wgy79qz9drjwbhl71gsgahecz76kdfwd56pg18gwpvgvjeu7zax0verebtkznem88lexj',
                channelComponent: 'm9i1zfk7zxcylokbdvkrr1wdhvsv8werq9deik8leed95jt2on62smso9meg2ofwncsyya6hw06n4cnpphgrrhca9i3v82twafvvskneu00b3u8opcm935bqy26v598nuwnwliizi0ocjmzdk8q376kw3uyrizwr',
                channelName: 't89nix2mn8jlwutdd8rsnx6oonjrxvjvinakb7munpcfslhjvjufianels6rjuqw6gggjbxtwfmwiy60xxbjzik36wzqdwqzzyba3gk7tsjgg0shiqsmhvfxk8nxylu32vmpodpsqofyrrfgr8kkbeqxx3yur52l',
                flowParty: 'kmowrytowr9plttjwf99cs8z9kf9zd1m4q1izhrun0a3i1h2coylzpcvllu0hif0c9gh316yd7iv0uqv966pfowqukwxb5j9lkj4wqxgn056tw4r2lsqhxg27d86fezdb9aioyw2kq4dpey2za1yxsd2kfvzttsc',
                flowComponent: '990h1c7zc82rcdb4zg0bd55h0p72glc085ogj94b9imk6obzfjminktlgfytozeetsvdaobr1yw45p8xie4qhipc9o720ggm97l79313yyb70etn7wyhxxfczuzx1aj7e73vu83fph0bae1ffyzl9r8e8nx2j130',
                flowInterfaceName: 't5khynu0l2t77glisazcnlwl2nf6orh9drn3tt0gde4t2cfkgfmvjrd2dsui5ovuhf89id7xu53v6g4vhsf54aueujq0t5wezl0729ouopzawpbqjalhatyo0nxh29oo6sze4zu921g997uy5qf2pfxpraqddrab',
                flowInterfaceNamespace: 'meao6i6a6dzb7ai4c99h9v33uhrmpuxmctwmavmyhc9pqdx9jldbha2syhd5q3yhwjebbxwih11o6f774tquyhlzksli64jeatetwdgn3g2shkxqy1onb3qglwspn8qg39povlyj03o8y4f9j71swf0xhfbchv8z',
                parameterGroup: '28nxclqpurj4g4lnrxiwveojczoif5gylri170dkwxqlxt8nr6ptnjlbd98r2k7ndqf00d5va3b04yfrx2oun9dof1hmitx1mh3hi4q7g69urqx7d0oujif40wvq71nrglcefd6mj115hmiuri6u5lq3b6f80n6vo40dq0uaiw19bi3islydpvsac31nto4834e2ds9iyq50n9lepv4so4x0ve2ndamq3ko6107el1iowy3ziebebtu5wwu4yns',
                name: 'iovu49jkowf3jjtjhhqnmw7w0dgrke01uj7qwdj8hbm6zdui5c1ovbkkl5p85d0z9hlwq8bi0rgcd2kwbjlmcj1oi3ppl5wbs7cdx3qyqo038l0yc9w4spgtx1rujyikwg5v7sfbjysvvdx6mqutumh6x3fetfpq89wx05nus0u8hze0m8wasvlqge0d21w8k17skw3f6awdsf7z0zdayhde2h5tyg6yhh6fs1uxh33umaq8dpd1e80l2uucb565fibwjg2qxtkkhlxigchdevra3xqtuo1hkte2xkfvetn8s6bkaiu4pl3nelj6k351',
                parameterName: 'l9znuq6yt2i25xkeke19f2j7lxb69t898q72n6il60ql9y5uz5vb217mwwxdze2n1dl1r3d1e990td0rjs0emw9imnobsvz8omgeh6y0m2rx5ewkdl8hl2ulxd9fruu4s1wkxxntfbjmen7usqmk3t8411cnwb6dw02vsbezbl185kcvshohnx9hb1qjc62gbi4zgf1lnul7xumwv4szogrx3v0u0ud2g30w8rw5yzutoqp427r31n71wevrgmqjv5z606cunrqy5dgl07p3u7lk8y6mpf7iz3on02ub0nmdp25956d48jn2v3r0ssun',
                parameterValue: 'pdpjwiftzfe6qenvr0c5rs898i0wtffynhf9bjyq2gaectdc1w591qrk451e1nve88uvxlr6da1v78er68kzzwthk909mt6ugefe8gs3oycu7nm6wpunl2vgk7jh2fcb36yzvor2ancmvjq2uqicr7mp6eoehov2ylin3udeb8to05cwhsh5a0fk80dffydz27zuf1fglhie3riv9tp4jvx9srnthdj1gar12l5u2wdg9egh140iml67vowhwkjestkvfbx1gc6f1fj6dok9rh3srxko82h4s0u4e3tqrw4kyeww3jixis3737zsjie9n8ygu1pm5ybj52483h3hkuplbxbmvstausz21w1wbo509bqyqackjcetmvodbc6j4antssxpsv6eysdotyxch7w6sbakz6all8mdqgtbxdyk3vkl7341xbuxqylczndj75wpt5fdunyacgova74q3vgke2iv6ofqz3bawryc25ox38j0iwzlnmmat20fmp8u2tp4r3h4m43qyuo7o338t9m7uomla16vidw2w4zpw7fuiuem04xpy0uclrjjwtkts6wl5b2lwwou4pgiw7leueow4lhc923ffwr4p1ex04pyc5v9p8h4g0q0jf4y9bf1zyqc9y1uzj9txf7h1ofs07h4kztqjuplwd4w65yjy69qwjrjxrtnzk6ukedtu01w9j6q0za2hbrev5ihvcsz0bz1qu2tev10coolqcllab6xihl5idf47fh9ztjpg51rvgspbn8ygtux648jenvbjrjdjsy8cipfsytgk1olaqdy5wuqbic1cr4aalpykfesjm2jdrpe9zmwnvplr4ako02c60dsvqtittzjop6efcvtpfw0giio1w7sfykjw4fku0ku7swfybemdppzu8d8ujq7nb8xe4owvo6xrl1749cl6tmh6wdwot6k59pbugorn0xapv0turwow9mvxprg2zltfq08yu4945i5hv6j0x1d3exwspa36w99wsucy2zj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'l56zubpzkamuq4zds4hr',
                channelId: null,
                channelParty: 'fyvz123v647q5io3j8pi4uicjsye9f91lwylvdmnfuerhh6i4bkhip11w75ms2woou5e2twury83u342sueu3ay9nlgvun00d706dfmo3ahin2hnnz4e9bpsjkdaocvng5vhcfw9hidmxgn53uo35nmnla8cnugj',
                channelComponent: 'i5zwh33xa2r9o43udq9ddll5hfno35knywvwq2h7ribdyed8nmf9itvhu9ap6yhgfk737zu5sz2cnn6irchlkn69p3efpdjkv46vtqd01dcnyx5onujs3y7qqu2x9939kgd6pq9tvzfek4jymscbz5pq2oadc79d',
                channelName: 'ipgyjeo2z1cur8pg45ssbi874wqa26m98nkazd4zj150zsv6ryd6jjz2blda1oy99hvrrw61y9m28t4zgwdcpbjpi9f3fqhoaamab42gjj8v5goc5pjgp3232eprdaykwom9xhg5pwkdq0ug4ididfo4swx84tyo',
                flowParty: '4kk5bxci26o2z9mp29qrvw9j2z6t3bz1gbf82mxvyfrtfppt6x7cjc7udqe0g5s0y7v0j9vr22teu2pp7my27exz6c3g90ntclnjfl3uqk37tqoukwbitzsn9ei6sup8zjslltvsmint81nkd9h5mv7hp994zfvu',
                flowComponent: 'ye1opmjt9y5ln2x5z0t0rtj2nw9ftbsosc117lh8zad0xx6bswgb4y4fahg1hq4f08ghj4xgag71k7d5yajro5w17fl1po8850rgbt1xwfe79wweehzvv31d4xvtuk1wnzz2dwc0dgo9dnocgvv56ywmka1zxlsp',
                flowInterfaceName: 'ys8mxjnnuzaifxfarw48dhfn4edzj1bmz5l3wgwsd6r8vch46rcm9ryi316sjrqxe0kg63d2zhmet9zbqimbpi8p31q0cdzkj5k4f2dlivi1p0cly2da09q9cxtklefqccbl6gcj5g12eumyauctjrb6qwep6kj0',
                flowInterfaceNamespace: 'wql52zrujmtx7xjzx4umem36r4g9ybi1x4qily8h2r8knbtbtoyzyl3ocue66314zxpoj1ox4tebw7cen00l294t329xvophhdgxwbf8k8epsy2ic8aggly5waqyyq7ppbmx6ltmdz1xrmvxsvmt2kqsbspqup1z',
                parameterGroup: '1df0bkuqlny8n4oblm59tmmldup5633hwbvmwj7ght99x0yxn81nwkqfr12bk15fh7jex9u6qtv1e478kcadj2memtthjqdi9yzkeondatc7lurr1j3uvq5ezx25fv7r5fh501cudmqvf1jvcsewttrjoivb7hojbd6wk4waqq534leiyfl94z8650n6n0h9z4hjoqr6a1muttw2446a2qbcwvqaiy4g90exm3g5ff71va68zyc7xvz0bi8h53q',
                name: 'opvki936w4bkru44z218jvyh8aav676pfbd0lwfr0byue2vkwx9oigr8ahjid0afiivjwc3mjqxeviiecjlxfhsueqbs8j9tk5k7nigy8zb8ahcflnbyqd7wwzf068ayhu2jyjri47kstgr3kskdrrsapcjm7ou4epkw10gzo8a3wc4h5mmi1lvh7wqvtrb8k6unrhs5u0ybe8infnqhoycvw7ff91gir27x2wrr4m5ij72bqvgdbuvze2hba8bnj9167bbwsrvw6akfdy849wp4ey0eskoefb6xevqyfez7sau0rzaovgcp1d731r18',
                parameterName: 'un80bz7yoqxb1is3h4ze29gfukse73eul24lmbywkh0sscfiffighzjezhb17ba5ao9c0e4yz0j8fheypxm5ca7vg7hif122or39j0gm2rmb6otlwkbapn1ydjmybrhkgy83q143l4cg8c994dkl6oqk6cartaehl0skl39lrk95vjqa1kixekd1lbaw2mndnjj8oseb19kg3ad41neyc6tzhs0ufl3wnj767hn8v111qxo5nw6e3blm6spgygik4nqrszzxmnp3qgrkoatycwjr4g3dg0b2y188cfneoif8ylc8wvgu30ydch2544tu',
                parameterValue: 'wf5p1pzl6qkqu8alptnxvsemk5hxypndrepc3eq1ugqcm549dhmzkosbxesdqe8ebz887xzdogtodttpfarfla63if2dbvmk361v0k177o44hpdq8pbnrn090mg2n3x9mukn53khaaucchzzc33hbbr133ofzfrqzxd70h9bphhbhooappjfdcwc4wqfjedtr02p1rasmj466qnurobj27qabev1o72qoh8vcinh7oenw16isr6fe8bxef4i15qekexdddt402gy0couraj24u810nvrwnwlao5y8rsas77bfqpt3wk92kgxwz4xga6skwr77s11n3l6bz999umhw3mx7xiyemrd182tqi6r4h1o04ik9381n5f24kenj3bvu8d5jnv8bhxcjokp8iit72vnwbjriae1hpmtkx7domtg1w3bnksblxmodenr51rfxg5e0d79b9kt3dksgpirmjn7r65gombzcykbijnknz9zr0d4erwmngx8g7a6qufatahmfku4jcg7q7k33vw06dpwemeb0j1oie04s3mtstf70j2gdqmo64vyw7i0ibzddnnqv7pdwyib2b3tazxevwo376rdi10k0tbv6tmvvgbf5yexb49vkvolj730rshee3ja5w8c0ovi9x8yg0gfbr6zf08wc3bng1p53it4fkgbq8e3pcpq5uyy69ld5unndrjwfchmcbt4nkaujcvakcw3lygwhddv61et5gq6doxg49k688je6d08rq519ik3t4m919ghgz5gcky5ehh10hywut9ab2h4bpasiw0mpt70vdqmqvzb435bpemnsn92ytrbj2rpn8wlgehibbtge27i754y62evo0hprqgglb00h158a263hieqw9s1sjx90pzhrwt4ars26k6u5y728jx5r9u066isrd37nuilfoiz9vm7xvoblc8dahtad0crkmbz2c6jbhjza3nmy8b5os6foslfval1cbn8bfdttifj5ql2oxkt274ppwt5p1sq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'g3g88ikitgnt0abs1i5d',
                
                channelParty: 'hhtpzbng6n7a7wc597gioqeimyvia2totgnzhnabnbmzyvzwvbgpsk278lopbtjeolw4q7vlqt6zt2735qk9jamjb529nt16cil44vzdqhnwkks51ggpn1ne5x6kk5w7czfxopg50vyfnukqyoycpgb19708im1w',
                channelComponent: 'qwi0depe1vl6qrckyfz3w6ru9lxhw26ugdxwostgs4l97s8nwjztzxmh4rbq0jtsh4l92rn3ixg26tj125dv666hh3ggyt4lxiqq03lz9vqj3e6qehdyc077tv1ei0vz6rzwm9t2lvtf3wad7ayyhz00r7twu20v',
                channelName: 'u7aqyk7rk9pj8ia3ygrcnfb5zok6d6laousf2xcdw16336o2g5pdlyxjbfbwouwlqybn1skpyrzr26qdby2xt79t6y45270xwbtxa1kjaklll9vtygln8iid24rn152e4c9b31whygjiedf3n7enqbfjucv83u9x',
                flowParty: 'uoy7c2hzq149hviiyv3t0wh7em12nkx8bxb573tvncx2j9q51j9yymdoqme6ytwcdn4olz6hkbuiqpfw2yffmoipxl7vfpm05agz47wy6hu2v5yvqle5qwblgyk3w78ekfcvv71os3haax8hb0vk9lqh527119j4',
                flowComponent: '10dapcbgnhcwg34vsds9qy0rs9s3s82youm0lz5mw5tcp0jkrojhww4p9ltg16ahgkmc1zgdcqyx6ebpalp25i960dkyfxtror0d2f7jx0a3176qzno93sr0bbzsmdamluimytp1c7jpo11rj3cbj3y3zmueetq7',
                flowInterfaceName: '8w6lpn1s9qcuc88l02t5ewi4k87zx4ddbbqu8fjpt2hjn3nlsuakvt4dhp1fz8joz43qglkjh05qcdpyyraimb73fbvncw5lkmhsoipebiu45cwbwjlkomej62kmdjlv2pmkck8qkhobp2iiwrlvpf3eqcjqa3md',
                flowInterfaceNamespace: 'a0arz0gr251pthkzkzc8wi5ng3isum8o0zz2cyeaxyassghcsihhxtf7fv376b0pppzu08ubmk4xpfiju0kpjluy84ep3pqcz18cz0rx0mn9v071iznfrb8zc7wolvmh5bbu7xt8a0pwwbc4sn1ztopl6m7batjk',
                parameterGroup: 'znvdphwafobyplua8jv0vwb8pgth3vhh8m6yfsgv6p3w0lvhype4pu65gib4nv2lm6io7xvfmjri7002szkafd8ylx75k0pb75zrj5mmrajgctqrtal475ule5vjwy1tyca1o9d3qtgo8vz3ybfdzli2sfrn40qp6gj1rllkg8lufvn8zd621miabt8vs5r3wclns561cm1c0yi1y3ybmoc7tufet580rl8l8d29vuc1x8zzzeg94ko616ap656',
                name: 'vc3stestydbu87oeh4zz0j5m2pxpzfzd92l22t0xrvixy7wsrp5qoojfi1j7d59k9rdlpb4wclyfmkie0ek8nguz56fjrlvdldu64sok32zkokrpvin7gsprgrn1kb2rx9zfnryedepiswwri66gykovpihtwy56kgvacn3n6j0e94o0wku1qhahg4vw8cz8aqcqhrqkosgmxu42vpm2w433nghxn42fijbry10togublkp151o0ysj9iyyqsli6ur6x92grob5bgc2s1scxjlkrnm5coe0nixbhkj5eefis67apsqh01xl1plhc2v4u',
                parameterName: 'fwq677qivj3324knck75rr7qc83djduwlfbszjtu7youfjkmnfg3ju8qlhyjzno0gnjuqvduq9ljfrizc9kkqsoisvnorjr6qbzay1nbgvzqn8kkc343fu8k9temkggzq1r7ntj2chxdfo7ktgi4nkyyaafuhzy3umgdexq595dj12nnlu6u840grhg3dpa1fmlmt8osw6vl6y2jfn0eurqzkwfjt0rd42hin1qfz29k0m8hml9r3dx8h26r2u7rwxg29jz617iec4jyzsbrm12vxxmdqqo5s4blia7a61g6r3b1935lkaf3em1ct3jl',
                parameterValue: 'r937v7af7tbq61wkmut1ljhmhl1bczd1hahxa8txhgiw025f8bf6jmhatcgekomllj9b72phrp7mayegk7t7j8cyzraktbleh11n54ssudt3tv7umlwatrwsoo91irxibvcs6lssck9v8rlcemw4zg1h4i55wf5l26bx3aq9tby4fyoroncgmpydd6z0ow6fi5adab9zsnz06zxd6lf77ugbis49r5k2p9w11uz56m8sc0qfr26el6xsj5zwt1mmm8n07q89x743sju0xjmjnws164r4wrkng9bsoolnna2x7vq7map6pzdo6r25zmqjuzxcdxphphxpzgnm2dbbgohhz1x2phlqx6x04wf26to456mzsehz8cqdp0jtmm0n4grzurieo9e1rjx0innjnnfop9vrh9rdonegqs46tk86v58vsmitijh2eagrp15b55grh5837j1txqx5fdgcvejd5ckwvaukozqbsa8a7aqnu606mlbb94h3fis9ixo9xupz6g3mzxxr6bwdev6idh4skyn81x4nre6o3hzqo6k93den1w8f7ocacfd6vh1b6qk4xtsvypicrkwjeev76sgbqepfafv1bko9le55lpyyjmouipj6nzsrl23wneoo0iglv5vcfmrl7j43s2e8affnkutd26on7f7h9cr4b5to4ilv8fxmf5d0ogshg1xqd2cojyvkyvyqnp9ozeznlm5jwn3g1t0171l2xh10f4vofc483iohh1g4b4r3hebsrggwwmodp6eqmrzx0stlb28z1rjw7vjtfg56w68nu7mj440f70o29ymztcp8dg5wbt84c65y1onbuxyp1ko3rs90dzfua217j1vi274kpth3rd498son0rikiotgx4qobocpmcbm3yecsn68i0djgl6ebqaz03859r8iueo56dr6mdsb0mm8sm1q4xsjgaqpyycpwweitanskzp176qhibwmygapj2wqplruxga0lli4fjbyz3vsn7l5qx6mwqes',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: '1bfm8j4yb07dwqtlu53j',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'jwwa3ghc58n3teihlks1yu9fytfhjm12bknu4psnmy8168svvexw52tdnsjd3pq2nx1o301y9xgg3xbnokb5thcdka23qmq7tmyljuxu9foyu051878n0ci5n5sn20dczz1txzgjn9wo04sll59cfi11wxs5mu67',
                channelComponent: null,
                channelName: '8qphb6il3qn0el4q6wkh4f6mzysl3usisqt1lu7xe89f0ov332hssfbaji7cq7px5svxuf79e56kmxyvofqyiv6gkog9wijuvu79i5kwx9gui26h0ns7yqil1e7sv7n9sei9ubd2kegq2l6sm0x1drhytgfamzrs',
                flowParty: 'xpyf0j1ayy737bgkf1hwg80nfnatfocudnxg1omid4tj02c3fwc044dmvvv3rnbk6bod8sg0h8uonr51yqa7wmd5li0t2y6vg07w0n2mactx17jjkkqnc1b1j0kftoqmc1n2r5owc4r1upmg74jvfmt61jvetirz',
                flowComponent: 'yc1cchox7tzugkvcw3ltgzhni8pm1ueqx1gjrvx4ysly6kacgchvfcrvbx6wmwyvj4cbqu6bq457vfwwmty6dyqp6sobddkhcjaidzqggi6j2va0fh1ga3o6nfmwg6fi0mpu4tb2geev75434mhe3pkt35t1l7rl',
                flowInterfaceName: 'fx43141n4seh77rqxvau2gvq1yj4qlcohvvy3y0uznvfbmmj6ntes3mk6tvqzd58tcyy8pra4g33noggj3rkghiu9fabkb7t4eu4nwdew6ucnn1unfv2bgthvqhy0i87r0xbi8tzbwc2m98c7ikqyb5wjm09myto',
                flowInterfaceNamespace: '1oby0uq7as7g1m2wlw4eakky5kf4z4zirp9aco5d2mpd751dz1agep7g06zo9vk4tavi2cqpg93acxdc4r2vg4293th111k5lq8wvkaxxo2z2qfzyf2kpgg0hkcuc2w1w305kj9t271ryp00lp9w751pn6rpody4',
                parameterGroup: 'jshc04ssxk962esk0k0dfjmvc5603jv5slf5u4bbg8cq0se3h40j0jyv11a59wuvn2twj0xxmzwy41shoyphxxwkx97a628l3yqajzr6ie3xnqvkefmpx8v3pmr3cgttu5yy3ojupbatuc1nbsjylouynmedr2a356t0jt6ub792wshukw8jpgn1ok4gh53qnajv1skdb5gon6mu4mmlso9uqvn7xppqpd13x4gp83m1zvqtospcyoifuvurado',
                name: 'gwoa6ytymkf0o3we00h3r64wd43mqeag9iy2lmj4wtkhukn85dphj2gkpw2ac3h5tj6va11bvxs6wjmzd2wm7xohahb6e4toz1di79zeyrsvz25lbugbd77b09vawd4i7nsel6v72gqdle1mao9jllzv9u2ozzve4sgyvza527jnltk1nq9vqysdxf8blc4v84o4gmh6cs8c0iqbm3rycbwgv2a292usal23iitlexsbn0bxk97esjxznuwvyquym8amp2ygpsy7izbohf9op02pfgsaeq7nkludh4rv2o12dqtjin0ybf098vjtxdu3',
                parameterName: 'dqikiwxfw6wbjwk19048uqmcrfba937jep6mji1lv3yfqkln2rsfklzpz20mgkxv8tn8hw76j7ga82fh4p13p7zjap1l0gspumfzn04skphf3hct9yen89t1ug4uww5htgnqxzwzb1ihl2fpgeos8bhecrcejr6n1pmk05z074na6ye3e175ohjw8t1pm5tto64dnswaklpzz6k0cqpy5su2heaw7h18kez96dokbvg6yo0afpkhm51yfdk71btf1ghb40vi0bnr9si2svklupxxsjj8dhjql3glhfm9solad8930zrikhqtoojqi94f',
                parameterValue: 'uhf4qqf4jwzp3c4go8ui46mt8koqn7cfi1dx4232urqksfzg0hmo6ln2rbosf8s76juld774sv47hjetdtz3uundy0jauqytxeeyob9hu485gvdnuqjqcr8opqfbdic3f5qhz75aa3gcs7yl0g4fku1fotzjisl0h9vm4vts7jg64s4tzmcbr2juo9a02kyxdwd3tz4ua07wo7umav5ceqn77k2c4i6m3karlmxibs5nb4gch00y4o4uluvxvwfa0kml1w9517ycw9onxpdm463y6jiyjy6ptdj9e4lgk00koxr6rbmga8w0pqilmg0ohukcoru9687fmjsyhyosas9xszgzv0hv57y7ydfpvhbt22vn3kfsrt3f5kqs9mz83bq8lt88g11mjfjyv0xwlqzsm8gpm23iveathw5zoxs8xogb0v6j06gzh53jaz8m9i1f6f22tv47h1b1zc78a6rh7kdqp65wowdmgcmbvpwntr4gxachlgiuy3l8cl8vlarn9k3ofx0r4z8swe96ir8bql89m7tw6er1c3dwwwr53w1uemshcpntdoso3vtj5ui29u2cw2ip6kwutwjtctxlpafo8s3e5q8oj9sfzxrofjtytc3gb941b9qxd6iyvj6y7asr27woag0lofuz80ghqet8y384cpjgvxxtofm3gxsx1tv277pcr20zjp8wg5dmts3vt7j3u1xq7qrb4elko3wfv8k5vdx81zev7c4uccr134pvmpbkxjaj1esip94kpeke5si6u006vn4h4b1yg40mulu1u2tfz3wyla55py44jnjg1p8gf5om929ua23br8noqbt1pha2xs9i84b7077ba14f7chov057fvi4epqwv2sgor298wtj7vny1u5aybd2tcd3reptrj7jqny3b4snono66wfjd8ke3urgaao9m5dftsf379oejjpowmlpir28ou5vwxxel6wt721j8yrkkhf7okn2dkbut3as2lm4bktys6vh4lgutqo3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'b66hc3txk1h4lta6vy19',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'vrhwk33xhjs41uzo9bysjp4klhfm0m8g80nxaifsna9tbryh59ngck5iipi6kjitxxubw23owojqe9fdnyy4nuckqtf5rzjdt52woq49b1a6sii0t2tx2y2y44qokftx5qkvvdfk3m11kegcp6p8s7abf19cnrcu',
                
                channelName: '0syjjt2z5qrpsxdzba5zn9bkzaizzkopnhzepqumfeertbryi7qlkg7b3qjhesvfkf5fgx9aqvdcg6794l0wja4bkbpxm0nrhz3g5962hsutkury82m3pfy8q3wcyx7lurljtni9ok3o8ferwjbn7qumqyd9nz36',
                flowParty: 'vjr44jz0rzgb22442qhfsc5a6s1q8vaug4zf85zazx78awludh9vqqfwulkrmgbrrsge6f637m1cnydjnd81o8nenu4tpt9uare5efmcm410aomshb4jxvlznpxycrtcsent1pkv63cq3jnyoss1h21shoj4qxg9',
                flowComponent: '74dqc9r9d7oc5c3hzaekkolejpmgxm599wub89kk4jg3zamxgs6z7v6kzs515mcn4q5fztxfhc45yytqliws808lf3k84krhhunrabu0306yokofs0sfkh9w284tpd3y256x3mlu1pdj148jh6n3epwu6n6zbwq1',
                flowInterfaceName: 'nuw8ezo5z4xwu8k8mvf9lo2qt4pxp4ihaw5z5lsqpuvw6qxk5tl3yy60hrkukwd4vxuxxoi62mmzy1dc046a87gki5efeuufat0jcpzl0ybsc9n3zuz87hpjtun35wcvplcgfdpqsy1uxw6hkj53iqfa15v75py4',
                flowInterfaceNamespace: '43aphiw0rpmryiu3fm6fvubw5uxm0pp4t2upza6zcoaknw7rxoxihp1mo2rcbgzum00l3vh3r31s2cvjd9im6u5n215a4yfie66nuof2d520ln0y4ka3mqg9mm2twpl851jr09rx9oj297bw0tqbiqa5kmv4n5ob',
                parameterGroup: 'duphc8hp56fk0mngbv7pm6n3cv7ztkbpneftaevbg2ak67wmt864lnee3n8a9aezp00lg30stc3lmzcghlpbaue5bobhai7vl4g27urk3zudleuprrum40u4etrukrrwgznecvge8hk3ez69fc7gxbmnq12vihcy5y1m7zw11luxr6u48dbntibxqcj90rw3hfql9tyqf29qb91y1eip2sz4uypgceijfersoy3tgv7k9rdyerwgjugbeg7ttct',
                name: 'sfvfkda5uoic17nvqvl0xeealqo5fja0svs104gdywrindtx15osd8p3v3fdfiwlhlu1tsdwn71moqwawhpz5ntb4099s0249m4rsfjjizoca1h4p61m7f62t6vqcv6w086am6ocnfr3qzqe1wv7ear2ed7fh659u3zjxssycy7gqmgw2udkl3444qsoohv06mty18p8n73gzeubluj7xqh41vtjazfwtboqlvdtitt86hrxcty7n9f3sjd0ua6oo3bahbycd4rszythz83plkr5dddsc15isshusslhg5pmjs9kmx2vagzrtkk0lj7j',
                parameterName: 'ni3m1mjh9jxmi33cf3pvdsze7cmq43fsazzwehigutuxtkjuprmwy7311dv6ud4otp6t6wzfdh5jyd5ilnbm0zma53isnkq1l35e7th9ycg3ll993g2p2wx5m5intjcqganybarmgqd4emnyv8a28n8rp3rjdnjefybrndv1qqfnowtj9996vutwongop1k57b1xgx8b1cg89gif1lai0da7ovazw6f2gqdm5brrqkh6dr6vaemx6fjrl42o4e7p6d5klh8acrq5mwurbzs60xau3sfr0fox2ryllvmcudebfkpug3b3gp3y8vg21oem',
                parameterValue: 'mdfof8d0d44ydwlj5ctntq131j9auyi0g1hvx3k78war69o4hf4igf560ltjma486fel101w11ssjh55u2dw74lqxr3f07wfxt3rk95exeqc51uggkx4wll8d1hj67bph9tpaebu8xy8g9mvsg95wvfmuyt0mumjgzgtm2q5hrrs53vh69yimtl2e6albm6amxwfd1qt4ljuyb73itot91q78xb72wgq9oobhxsnhlcq29fgyzxwj3hoaxfjcikpulhx2uobhmyuljqpfnvq7jrwdtd5tr48w2y69lt7mwz98epi93xzdrep27jmspy8teg7lb5q9s6wbw6rtdddjd3id7xx875tpb4as8s88qj30qa6wc3zv64qt04m0rprcxp4yc4pubt0n9ydoytrcys39oy9qzrlx4gdnpb558hrdvupomtel6yixw57jpc2yvi37jalkdq76q2bnobsu6qiud56q87v2kjvgxy70mjjmkb21ttia1th1lve6s72glsdeff8tzy090pie2ico4dp9mzzx07m7slzwkp0cz9tzid8shveipancxoecmdcqary1xm50fdc3381a3ssk7cmidhvjzxvpdf2lk2quffo5yyaq9mz9bopkhfwiy5322bkn4oe426tzj6gi6rw2ngqgsdqdemovny46xrcklbr9d810nceuiaa4tua774romjmcdkts2q3bnsjap8ggezqfyziwbrsizpwrexu047el44za9harxstvouf9byqb4psjo3p65v4nfsluhijm40wsorojmp9je1xqnrfwfzrbfgu6umyubl2gqcuz44f3nx6xd3wswjdg26kc9u55mc9w1ghyj8srzo6hpfnh913c96dr39v7ilridgjj1ibhe9m9witp568vsq6xdi5yn3vh3moc28e3dss2n6t6mztjt012x29mfmbrgo973ypqmu9kt1kdjl1reasnzp6u8y52k8mxulz920iunda0934njx6ysjxflj9n4o6qtel',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'pu57ayjxgiel3ot0csys',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: '98i084sl0xknbparbm51yrwuufdtfei9h4nafqu35gdocps4t7mt0bhm341dtbhdn9htcubde3hy4gmk2dyk9lxmltohqu98kx9m4j5kbw0ii7dwwem95xykg1hf40fijg4apka8jv0y52zi4vluijhck8dg4uo4',
                channelComponent: 'd3vjkc9gh0oyaolv9aqb5oqxx5f0kc3db11vacg21s15fzipl8oebkdm38xzpnb8xo8361xe69tm12c51iq2jwa2sv2pkjsbzs7t2zwhx5cogjowrh2gnkr8ntmabpn76i32fwc4m5xhrozmen4t9n0yxo9sohlj',
                channelName: null,
                flowParty: 'ivxphwz7erp4hrbflv8l44l0poz4rjme5sjkqx665a09rumlwwjlv9vuxi9uwwy56qrxkf1i935pw8vtmzx4qju164b9gq7iq6un8jd6a4xv463m8d8imskd74d3uwbopn5apdfjo5u7xxoidrlckzdw5oi9xz3d',
                flowComponent: 'fmhytpsllbo1hwuh8p6gpjqrvspu1w2x6zmqz7d5hai30kzggnj4tt8zq1oprq5ra2r1o7ybbmhhfg1sxhc9rggbd6rap40z5bhtof7yg68w8culfvlzlyz9pb6pm7s9cxs5cjfmg0nxayyhuqzpzmwwjex7mxdj',
                flowInterfaceName: 'rqwghhjrglc0spfdxzs0tqbxe0nq0veb5pjcxy6futw2c8j4o9mdroc8ufabxdnu6yuaj5bmy69qxc9k92nz9hnjqhqnza738lgekw33ilahcul5tkqxt48rk1hkla5y04pq9lzmyztcdtu5c9hfd2xludttn8e6',
                flowInterfaceNamespace: 'b54il8mcv6aztoo0vhtsu0asg11plsgcp781e23sfl6zbvta6gey7jc3lxtrl2vjxa345litiaaq0d8w5rxhvdwx8ggi4bonzz0y2ye2p6n8mkxi1o4m6m6peg9nt5tyvyy60ysfym19fuvmpg9g1rq3xvj801p3',
                parameterGroup: '4pgwgyzdrdiz3qn0lrz6o40y0zms802i0ppysqu7x6sqbo0jf05b3g7uzay3wwpr0t5g6fg1kafkfvh8llsjvhszq57qshmiem7wim7l3tl0228ekhs9pst3r0dbyozo8o3iil2hq2g1rk4zp896be5nhf1nykr56jimhe5aj3lfdbae7hplhd8rkitwxbhmakch9fto02gu800s2hrdt39y6ywr5kbt926r0ys6c59k193q1gycpyjjtoo59sc',
                name: 'rmv5cbyar9hybjvi1bq7m1xfz95u6idp7ppzzmwkefizlf3jhycyxfdkxgmxtn29jkb4qb5ca5nhl60zcpc0gct8e85ngwvz2843255ky5ccfv2ey8lnizv2fmp7mwrkz1mg7uf51lu2l36ndenhcywp0zdx2j4038fe7ac7xd8aadmibhwnvqytbjwiwxxejvy0r7g0lsq67sccjcwbd16wtruh2esvjg8dakd7ds8y7ew2o7coqux10hbwrbwa67az2mkjjy6phvt0jz8vid6cnhzohc0dagnn6r3126brdi6al7lcyx0ulegmsweb',
                parameterName: '5trdhcxblz575xb77q5ewtoe4hule76wq7r800hu9tzv4bu859ddui3jkzg92mh8fjpuecgtz2yn7f4fyrsh0bwscsbz5jq0dz9ksqq2sx713d7mr9cmvw1we90m9n2wa9v28pubaihbug54mw4epme58cmbol3lz90jhqjthgbfxqeukf4yggsptrxjblxbuhz9g7abfcc2sr10wb2lqrvm458vljloyl0udfujvv7za9hvt6fkk3drxc2tn6wzpkp5on1xdndy1rc8nryubao2yw5h4qbhy3p3whkzs3oubcjustqmj1a1a2h15bfy',
                parameterValue: '0ceatridfma6feynnygqg4j4lz6ma2xbq7me25uychuo84lnhygl1rjbkuuf7kyfe8xuc935mvsqm01228xqbkj04coa8sj3rb1c7mz1gllixbdyeiszcc0qu5r9k7ctp2039atnds0ouyd57ob9dp34mhyqjlebd5zon70p1lixc9pxe4xgzvkvcyevy5b9thjldjcubvzmeuhbfo6x45gfk4lt8v9f3v5kb96g4iwuupnvkxlste89k6mo895gq84gwc4bwrssgfb8jh2vkni2v02msudqjezzxum2vry5w7x9ns4t4iuass5k0qa9e64bf78pdxu9x9r4x0twx5mf2ckqx3oj2w6to4yomk37jxwxmip188ofj9emgpb3jrj1gawkqvvq0aqo9fdyxxsrwzxcjqzpdqnfe96jxv4pf5cpw02vj89f4vpk9jys7rys7hrt2o1gx7ak3vuploxrwr6zfgfu8jkuzp5t29twyihcwm47rluoiv6wtwo42w69drjgtuocbtlpfzsg19gdfzev7eu56rut88c2o23mipzgez8cq5cthz6q0c8ij78bl11ku3pgmnvkkst8ginmdo6k948tiza3pj4oqejimcnpo1h0xf04gepm080nyv1mo9s7yt9q4ok65738dpbvc6tvbrp1m44smxg0gwje3cq89j5hi3m54br6hrtxmfm12t9q03qhkxx2axc9bwcaacufyfhoxuzvgqvzkhbhr8zotpbprvtfk7qiq3s7e1aa2ri89i9s1rblx9y0y8e137svjgx46rfckzb1o5pu47qrfbq7kj91n9bqh9oikvr0wbcr2nba9z667j43t908rkieughraf3stjpnjigsmzbiqbzm9tdnqf4orpyyn2o3n8dg9qv7gcwlmcqd3j3tnzy08pmigp2cycjrhb4o0t5jgci7f95pm91gc75ac9xv6z9s5jkij0twn4jl45gen7ctt2t9837cg0a4exxmqu22jsp6y9edh7g63j6k',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: '0pjkerm908jo336zibc2',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'uocuh98l2h685n97n83kldm094b6rn0obdx4fqf6gyr4z1gdbgxyr2r4n1mhgrmgjmya6xspkeffghooq6hbmf55g1dhaghmbmfihk9h5oz6zlhkq5k7u7c7eyglp65gddz94iq3x14zxrrmjn716q5851cs0nlo',
                channelComponent: '6j94xz0aqqtfofdbh125i7m92n2rnixsm1wfyof8s270zc7la2or2x1cap9dwdunsompi25azmli9n7l9xk5vtcixfjfrkdo203fw00ejoolcidqhe8w3wxy9t0ufniusli1s60d8u7ei2ihmzhwvtf36up3yetb',
                
                flowParty: '0piiasw0egsym71q3pwmh7x51t7i887ekfaphrv9fin18ji0todts3qa9ttkoq1uda8i4n419p9hdjg6ryrnkfm3n0u778mzpo906eco9anythiiyav11noyxvdod6832av975q5zsske90cob1mar32j9jq0q9z',
                flowComponent: 'yi4aajm9g7uloggvq28rtdszr55gz9y5zvdx3rth8ae7vscmu2nauxxgqfuia7dajol7nkmumoc7od6wa790ycatjjq11b9x2vjwh1gio6hhcfyuvpy9a6iwuh9pj9vp0kvk2pxb0t876otn2kpxtbs9ah6d1hah',
                flowInterfaceName: '137kymb79csbdosextx9v41ukid8h2u2h47318fcn4cvmx45vknti6ki3nkvo883c6rngnq19j46wx4ufkyh3pmkjo799ax1r6q1dqaern76mc9fskad2cgbjfp6vi364x9c03auqe3w69ttz60elgmhf4s32zb1',
                flowInterfaceNamespace: 'q97t4otmld9swq7m91f2d6zvcapb6g6pq130j4gfu32oxuc7xycww68he87tv4pfh31pdk33xya1g924057d1qzjb6m3wmz7mr11rdcx8o8urpyzjar3s77g0exoipukiuosst3gcdv9ks5s86rw78i6jd9a5817',
                parameterGroup: 'tmjranje0681lgikmddgogdd2jjo0a3ntin7g3rp93ls1v1fzmgge4cgipo9sd7eiqdzxlqb0gcippenjk593xxqxn0dkfrg9vt2sw2kn3crux3wu0b80rmu060z1d0wz6cu5n6pfumy3wlyed2zqpy2aiv8e3c6bk7pyaojwegkwg5d207mtkjoid0ws19sd2acbigwwei82kifuu0lp1qbfq21sz1799cc16lrtzkutkagktwo4dw0fq22tnx',
                name: 'gjwdk8a5fov6rq8zu85c4vpjj08foyhv522f2o4dd6p5ks8hyvak8j1pgsawy3wynnkhjcquw152g38yarth2yh4rklcitnztlokhv9ik7fzphpuf33ci4r3ig1vq6pdvylsg8q7q10kb1igaslsavn58qcjv3zw1mp2vqk0yfgsf01mjb7p30w9xv328zh4l872ayfgtrs93wwqrzmbux88w1z187uhsmf34bu75iy43gogyyt6vniugt722rmwkosuu3l01pfxv7i8acye15mr28ba5cr6v4q55d54a865i1ishrub8avxiwhwhpto',
                parameterName: 'fxau1d6usps3yn314lny40eqtsc6iy5lq9xgeimlfam0goqdwh5xwwrpeqqhncmam484r59dbj9xudnlns9owvbezrag8j380szro69raszaw2z9zwruh95ik5ocbonna8olue1bmejywczpfsppludxjgzdmqbyvhzy9ss9o3d5d0mmfyxd0k7fu1cbowp094d6eynh9zi1cl9nst4j264qqf9hmrm9v9n9meuiv0ek3dzfgelqmxeu7jk22q0cw201emsv5q57tap621t08czvvzt476impj1gq23uks0lz2ycyv06j5yeijqitsw3',
                parameterValue: 'vdv4jbhuk9susnadhg1s8dxv9xl0rk5dfiwhh5ugndfuxejzg35wqc9o7tqwmacv2o5bh2jy5ycjqsqtnx77wt6alns8nzuox3tnwht6xiuun0433uu13sjvraeb016trgvi2567ijvoh4h701vkr1pcjnv1kewxin44kib2o6rwmqdu9nn1uechp51g6rnotfmw94w73463havkg5blnyjsv2hpcv014trx0qt3lizzg4hxdh1cm15bjq9jdjkr80grb97oiutiaodmw3b9d5blwpjr8j42b2ocmknicwq6c7xodxzlozv8q4dtqniak8hlh2n81jsxbv1mzjydaygrzfo84gcakpjwvgc7juusyqinbwakbtleqs8krp6qm07jcv1qto2z6r02vrnf2zv9yt7zroch4oixte3zrmvgzkj6d30wke3iw9krzkwp3zgplalr91gea386jrrv3rejzxyuux9tygihclqquupi6nw7dnlf1oy5ixqm99j5kxl5cx1a52hlyivlthugyeqfpfjwb0nzcgmuoima4c6krjdmbdj2mvst5bebds3vbv42jr6l1p4eo03k275bvq9ffdqra3kveaxscrjsceu3fn669rd3iyjwdk0b0mg8tg0qjlipitwp6la79oof5xtmsso19sb8hd3rlas8pexeu1eb8w3nqsd8bglizcz4htxjyujed6ldop166vqmtwn0s4tejtuumtdxes6u899vgcjhxnpw6rh4kx4gp361ewsfj6h0zpi7vgn2ueqbb1v50f1woglv66vhl46g07xapn74k19bzn9kssfhmsr4osqs5tyy6gn4et56vxtfxmold1w66p6n2qy3unjcoom020p5xe0yp1zohnzt7r3rn6ngpvfghamb6k497e0f68o84nn3u4tpu5w8j4zielxgjsyk9lbby8to0mmef8utn23y8ndpaa0wdj1p6rmp0h4ig575bposl5zpzo97mc5i42ow5v5po4hevwi7120p',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'dl2bkh7ppib1qme199lm',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'q5x4jijhtpu1exlcrs7ccwwrfy2t0grhbkvxxymq4qpmcofayoqi3w31gx3z5icbslpk1fo8ueh2h6qaosg4jon66rxwi53j85009xt5r3x0smae1klkf514ya2rem8f6hcrwmijkf7625mrqx300pcq8r1kqm1b',
                channelComponent: 'equ5c030664dz2a3k4bn5v6y8bzpbx4eoymm6v7hptik8djxn99u7exltgm32hmy1to7089yyzs1g6zhykuilyz5yvnsxqsctxjxxoci748r1kb15vntnf82wqdtm2xwugnwfdowc9544yy4i1nst0i25172my0a',
                channelName: 'ksfqf31uxkdg69cmx39b4pm4g5r0hk8j8h8q7z4x3vp0zxlj592nf2vpolpk6vtnv9ltgqu62kshzpmwbrm4vx0mk4wcctd1dbn1r9ndo6fktnjryqgjtwi2iqrhdm9m6zpp0ig8idurtk21nt70t2ta919yzqld',
                flowParty: '7cs9vt5mtzsg1auiguhr5jhtv5p3l12y5awnxtuqozud9zq62hp6oq2yqobdnabv8yj2j4kfxiii4yt6nq8yc0vlh16pc94nrcn0p1qtb06frma7f4h567i6rhth66vh6mqa9u56pe6ru7ltf3dzotxq0of0lb20',
                flowComponent: null,
                flowInterfaceName: 'l38h73niuh452ikbwuyax47pbn64ohbpac6ej1pj0e8pl3u2vwibj07l1k2s6z8v6wvu0gsi43z6ce2enadh5lwlgckbbmvoslqser6zvqpn6m34h8icckjdw1evojm5jdwuz3j541ltm5n544xh4gszb4y8g185',
                flowInterfaceNamespace: 'n0th2tm18xsbvzrpba3gv1uvwhufd1thnvp8buyh7jaqi39ouha6c9014t34c5lp86yga5nyktylp3w2hyizaldcy3rpdj2erpbkzptbaqgkmlyj2n6rbpc55i5gbxg7gapmu59o5x2ocueleyuuvny14zzkr2ds',
                parameterGroup: 'qiy0mhw3o25mssfgb9knksp0o6rkjbdx56x1fxr6usjk78pl0qd8lzoovj4p8re66x35ikxpj5fo50f3qs3edu8l3r5dkc5jq2uh90lghsssxqz9nolfjogpzw50dnnmnngmqa078uoxunctisi966evsifydikheku6tyx0aimohnt4ijqzxwa5nxulb22fiads5439cnf7uekouuzjgkdkc5eka45sichppomzo4dmwdlwkv86p9nvhovbsm5',
                name: 't7dpj7a5kwara2esuqoyq41ymw8tkkn4iqyhg3egx1y2a7bhx8cd2p2d6v4vm1a5qp6gmdnfqj5vkm1wrz7oshkax4rhyzn0ht1i9aetlh6xgii3tc5g7yx3g5em1dc3j2weqr45tybow91mfzkml7m9lkhhjprmjqdu0mie786mkqe30z1w0hfjnpcxvo115db3n3l99c5n029wyj6ulcv04cnxcdauyaa6qzihz23n8tz5s8n42e0mlnuifjjz3aar2plyealbxjb1rpb4nxlr9d8wy5kqti9i3956qf5sxzotcbc7pfq7jw2y7a5y',
                parameterName: 'p361mn7x7thh1ks8zwdy9h80hd34blovnqxfjrjla7zijqbeqys2tbi5n1yk75c4rnkf1xprrwxu3223vr0yelavtom7d19f0pq8hd2guayzlygp66ne1h83ktp6v5bm2uk7zu9kevmrrszqfcr7ha5rjnf590hcv1r08ah75c0bmmsi4o3unfegft3q634596fhmodxvc8tgodpr03lwxc8agsmcsodfe55q1xaq2e4cfzyx9mk7ls4ysowpvu3xjecmf3hs4tk15cwqfn4drh5u70j5kwapqce61rkf66fmdqpbda8eefxhyxw553q',
                parameterValue: 's194bqhlt65febz21j0b9jvjl8abfrp5eniklvoan3svdbsgi5dhd6mjpd9o0yd999hozsac98illmno3m3jybzuu88l7qhcid1wk0crjelpgkaqk7urhznfzpw6bfh06tnrhgmj8veb4jxxdmjsgx7brydtwrjex2u4qokhsc69xuajffcxy75fu2s6lilwfpf8v5y6x83w1x5imptrjmcauac7abpxe7nzpira3vz2mvgxpjsz0y7i6xeo8gt2cu3gla65q81qni8yxnor9r4gmnp3yfk1znov4gun6mayi8eqjvhygsoi0nvk8kmuifeddzd5thyyn52udot9zv1jk7qp1kui2ophmvesb1l7wlhldz6586rrsfurxf7sq69iwbgjylxc45l4p9zzefe0yh6vj5iea5vf9o36fk0667eo86lv6iyzv05800bl07j3urfk32o70d88q207zk8fmwmturtvgg4rovq59dppelkwhdr5awkaz79ubdrtkp2js1pgamy8uorcfwzrtwxk6cqeha5ray5086sx4n9jfmwkgh3rpahd0vjym63a1lbn2e4g5hmntu1yhc6h8v7alkte3efa41z1nhlf76pitvs4j4kw18lckgzaec9pkiy7ljr1rw4ca8otgu4ib01dm88c5sr9cj26uknv088cesvctda4me6237bq8g05xzxfxjd84scw3fnwab8648ceeknwbcceif3am1ts23mjixlfjup98i661h162j5t8fc9qwpxne9pd37o2u9nvvmkekk9q5a4cylf82o2wwwsenknyuuup5psli30exerst54av6zldffs86w7wzwmij8q3ndvs5nt6f1x0lr0wxslbqf364vw1l836iy6vwunfpkfhk11o2gp8y28mnga0aj6tf0czxi8ehloyaukhw2kmwrs52gbgm9sf3ebntbhhsz3terxe2pdavl6a2vmx6a4ajohaaqh1ntrc4bwjf5udxa8cp3hjliqei98y19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: '6tg65ijw7zu0ch4jiu7d',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'g19h5dg0rf9adi6bgffkogmkybrkmdgr9rn1tz6f4vs3sm6bt5qw051j6tfh6i1fwpvmwmnxbzp06if67yglqquaepf49xzetvhc8roguweli2ig726biykm6vrcmse3wxp2jhrynvi37ivk52ohu4tnztj8zij5',
                channelComponent: '2qyryupsc1p5c7of1jugev37wd9uhrb5mfx4s0iw6l3j8elu52hq72gtc7d3u22c6bce3jxufw6a2t7g8oonaqquw6tr37uu8hushjt2dkz11s81cx4ps9wkgadgiqyjq34qtjymhbicbdtf9qempyx1zvzmj5gm',
                channelName: 'd6pgrb51nzuels3sxf05y1ffwirc4rabjdc2fk1inhiohtsvrh8co68r90tp0wzuvqio9bk9q1gg1o9065ye0hubynxgn49uxmb7g10srm8r1bq20pepza215u9cmwofye0cjfaf93x9z3jocs1d3crdtsmp8j8u',
                flowParty: 'nere4d7k4m3fabaj9pxue5k0m9l6mhzk69bks3al9btvnc5ri7pljfcd0hrmj6y7vcrv07j92c4f0ke62mugkyqwz7t9neqn6pxbj5m0mrobc502se2fgqegs7585413p7ahvgak6c3a0nhsjm1xb2axdayvkxo5',
                
                flowInterfaceName: 'nrav39j90senc5w2bw6e3dxij2yob1lxxd129k74j9i1hk4iagfruklcuu47pdt06feydj0twtbtifrju8jsxv89u9ih6v78e8hcxr6ix0ekj5v71w0c2sy4nce7ds7n18synmp9herhwocctu330zvvxfm53ynu',
                flowInterfaceNamespace: 'pqfhj4xqwgiuv0s54843y0b5c8zpk0gct3fnrhqfzvc209tlsl0bmca94sk398v7znak4i34o44dwzbeir3uzgtit1tiqcymhx2jhbvyq3p0lubcz35q5h25bgqi11hw2q5rizf6d2a00jeqxedgsp501o3y29jh',
                parameterGroup: 'lxjs1k2dduqfk24f3ksg5ony3hfmwj3dcbvhyqyznipo84srr7b5wpwfqp9hdtg7v3qrg1tsnv6dmch69xdmldudswsm1jrgom88mk4nik1w063pjivqsfvz9fstrzcxr7kjfcjs9figtscmdgf0kj7ys4wgxhnauzogukjv3y1p1kl2iagit6fflfouxbekrib2q775fidphmvfl6wct2w3ozkg3fc5d5sj7d45artic3okmwcdichp8u2favl',
                name: 't92r6apdbbmy4ujbwoji39wtm57o57744kalyt4nceysjlz9e58jpiv57kgesmqwv7o0wuvaheidsg6o5j81c2hxuz9msm8i9b0icykdsh95ygvoydj19u8z5b8mzeo8csmdwbxt6578qofv9nxrcxp6z3rwv57rykj9iwa2a4jc2hkg5gn8mbc2qfkoraieo5gn6x11h2i8k8zmy4g52ubdqkf16a4zgvdjupguewk6227tgw89sqrtl8fmp618sf2dqmykvuelzitekgye565klkgsp4teteo453o9ohw20ei6xg873jcnxlcna08p',
                parameterName: 'sb59b654b0mzobwnpnli6tg732dz1iqphj5ydg9lwtofa07twpa1ybejaoyt01pf8sl6hij9uq7enktbv2mimdmu00evim6f9ufj0ra3n2dw74cin35kjwq0me7av1vzphx4dk5opesbqhz1ff596fr4aimux2ige7frfttvgdsqr2qjq4pvbyvf77042bm50urt4g3qjexev40b27trjm1egpbh1oxa4fca2w0qqw22bh4g0j7u58ukw38xqzb8jsrrhdwysf75d6k0ewfq1fmkhhmw0l2l5sxjuntdhxfebhrw2vdllcea2iz1h1xi',
                parameterValue: 'tg91eet7hg4smf5jpjcia0bvm8hvkzcfekqle7moq72iv4qrda5ltji5aqily4cwjxnrufg2luflov02zb178fnztybdjck6npflq490fooph904b44unzgg8v51y9lp41dt9hjlzgamlfgsoqcbon8bt1s7vablve3ww7v3paoztkf2ua313shyszstjaxuqjh2kwbuz9s0ijac8pacs9mu31iangxn1oqnrrxwpup7a4rgx6u8szfznafbi66xo9ecm8xjlpu80i5ndq1lnc5mfrnfh8is5qwe4fq1pivi2oad1rzv683ra5xohogueaubvn790gev9eupivv4qmib1awy86jdbx41rnciiqnmcqie9v8i7j0uorqlb5ontapvmnlrgko6fmskx2jalb60pu0d1gchwynn30nvjupo475vaphmxf7hhdzw26cw8ctbdh1oif8ee3v7bn2f86be9yzic5yf2ewzzzldvdvvwm8ai509hhx8yn6tfbdijpp5sm2vzbo5qmed4x5zq6kd6u3p9k9sfn6ytec7hbzm3720dw83oqwjikt162vly7c4l8n2o5g8bkn6oe143w6btyfot7lbw9vm4ezv9egnt6tz27kdr4n65or2zsorj532q8zjkjaesikbjxbzkd87ndtpsew3hsg74y5r5d6nne3pp8et1vhfg6pf6yvjpr2ackclvof9m00g8ziwqe4qyde5vlm79kcz1hd46dmerggc5f99eo107vmkkdfs4gc0oi5t2oba1d9a3gn18jckrr4gfs8v6sijbhfi4c7pohadauq975jrv76z8zx9jt8re1osagozd5cbdm3tgzi5atq86zd2errgl0uiwff555u2vdi4eptry846try93g7ob6lkq9mzv9tsguacsxrs5rkf8gyoosp3ogh25huica9mlasebkyhlyzibytrekragbo83kxa7968ds2gywjkvvfqdx02ddd1laj35w3evjnppvq3mg6afkzq99nw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'ytqa276jp0kztbi4muzv',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'lldyovfhlqkyqcftrgz46vfypxjdwhu2x8mk6tsw231t6fvsl7ofib1wesein9yitckq54j8ygayr2yq8ef9de2qh3dzuy2a1avnqex9b0o2z1971mgntuq20gw63fx9b53bkj1qnsps7k5wmlm7j3nlwb5jgwr9',
                channelComponent: 'j0r66szdmy19p0b02b2lbpatkem54towcix6jg720mhyzllzlztjkvdoczxr5fyuwbhb0qqlc5iwz3jmzkx7f19yjq1v5xgp5vwy43nxt02ohp0hwktfpfhkvt65o6n9gaffeldopezt5j5dreptcpm1a2a2b8ki',
                channelName: '2pcl2ymsxxjeszaxzf64ahg6qz3xcy0sfhx0zbjbzigwkw66hprz2adr8dtqxc41suxoz2png0ynrm60aa6dxylmc8mcnpp32hz9aq5arrjv3p0kija7wra6zluql1l3fk33xfqna2hloa1yx1sd3rdkc14l35a1',
                flowParty: '3opdxpt0uepjxf45fvz08gkiv664hpbdw8xv3de8b0lzyxpmehhbzaci3prllcksjfp94yxe9um95jxg3tqfej2ukzrfh2afbnrvw5kahiggsc4htnmfv2hn2j0b3kqnxpb24u7bv34bocbd94z9hbi66nk7whlv',
                flowComponent: 'u1khljj4zvtq1xpozm78gey97ms4vs8shfuh18hfhpvdrbrr5q9xu6etm5usrzj1znls64nfixwv2vzpgwxj7sfwrswmhdc7z3y4lz6ahlmoxusauw7jni6vt34tuz09thvu6utvmgqltasoq798881btdnq99uf',
                flowInterfaceName: null,
                flowInterfaceNamespace: '3r8g0uxoy183ktqq11n9od9boxql9ztc4s38xnng1g7u1urldni0i03r3vete0comvl1p2roaq2bkrcxd19qnveockecb9q04go7va8htayd2hoo89kovqdivseygxcmyao72dr17ls0x15ryd8jq3xkbrqbhbbf',
                parameterGroup: 'dwh4znhkzh9cihq71n6sjae0l7tgb3wgpujnja2gkn4xu6u3t555x3x9lp78n5ga994updns7lr9fo0ljd1f7ebnn3p6mly4ameeu6700mbg79v35j1wzm3jlj5r8uqwrynyqfwou3xvfp1sp9vpb2k4isji67w9ynh2l7awlk889fb8rvt42amjdugh5b1u7rzokcu460t13aznt8jysikbt5fa27f7aoerkmiia1qg57by0r8pb99iiyp15p0',
                name: 'ld8c5kowb4vsjlj0kygxsxz4rjb5mb2ivijbjr0s7ru0bauwuc4hdscprz6km0eldzlr1pnh8z9stj410ph0qxo646yh5y0awwbazlv6loi98h0wl6mbrqphheltqg0xsulg1gm1ct7gwc5za605nm30p8rp9aqcw5ezh1g6ov31athkwv8vatjpairtsogtkp8tgibn35m75rkydohdd2mmcaa9zcwoosmmwp137i6uw8d8o44jtkhqtiyryklygkvb77pxpecx0dlnyzcpier9mf9q7x14awwanpf5wcf331u73gptalov9qnhdkkr',
                parameterName: 'qkmboy0gg13x6gfm9mcoh2n89bnrn7r89963qzss9jc4a1575cwg19slrmxe34esz7fcad3qw7l71nq7sg346fb5195k5zyg3hedwxxhgovl92t12k33yc7plo01nrwo8gqjou2p9ko088gl5nyisxtli8eejdlf22xffldg5uzor54ayiuz1e9g5fkr00blsu7do5r4p8i9qrtswp6jjp9qb8n6imniou6qlhyiwecnezeqyminq1n7mrmsrr8jz22r1ewog3apf92ryo85vra4igauuw8wd28v073y5ka7le9l6ani938mhng0ar5k',
                parameterValue: 'qkxcmsjyxbtxem9ys810pzdx6jzs5f9yeg3x2zqquy1yuur6ecjrcqikwbh9hqh6ci4s8864m9va0lf9qpug4eq4piceqd5bk02hrutfbyeh12bec3qu4quou0b0umj8ck1vu0o4zbasa6ddfaetcyiiw89ahtael5j65wt5j1mbbe3zohvmunygabwbfe5551ryuybllk1mjpuhp8kzfbdyyl5h4w8apurkypryy4k6k77kpd8intw6lqy6afj3p37ket5l2pxxcohio91hc807v3d8snldw91z6cc2gfmayw0zr47x56gxs0vtoh4dqyio4khl2zt6olv3ibpx9478ewt8baa5tlhjphgfspraaqbzomssz0m95ai4xnbr1u7gcn0ibj57jfao7nxe0beoks3ip906ue5hln0m184kfbgwc1f8n5lew12rxy3adzdyklohwbsxkry8x6ymwkn4kg6dvjuc9q6lg7ralv01zus3otk279bv3hb1xmuy313447aijm0q7wol2wyj3dfxy2dy69m73g4p5s9x7n82jsi09f40b34rufhhd2i9etgxphajopjg6wl76vy7mhphal9933scgok1v5dpecjc1ubi9uhzdab1dmypiwtq5u7sf74n2n45a3iumrp1oc4t9j8v6xf23fkmba2ma7cwvkubz0zvboro5kvxqravtke8pf9cb4e1i136f62l091k0kwlzvvk7oaabpuw235po19sldcy6pglhc4l0ae6mur7ok9stgu6edldhum7byp29z0abdb4p87x5sznniaj8m0kzum8430zkmou2gmi0ufosy6yvlczgzvoo6n9qsc8gq6w00uf5m02hfponzx3rtwxmd2kz1fl7qzdudsvvt8n9ohco4c3hiqiud7x0z0ds6wqb5snxr6pgetwuoo235gsubsuxrr1qmpptfitusyizhdg2hvhvrp836f98yplti40ikvwrbotlla2oulb5xlwe7cmghntai97yf0j',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'fuh3fjdf3ttof1uf53fn',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'q8avluxj543fe3m5ei76md3nhzf9poe9fz0q8o23e00j0j47dml2sdkqupnabhj0lapt72owx7i5piu44jqvackqkkytfhq35l6azhm74ngdujr29ebxfgkklz1f1qn9kel7cihn1g8d84v1nn8fyi5sboantn4d',
                channelComponent: 'qi56s48imk0jai98bs0wqt41iki7hy2dz7rb2z5oov4pdq5zq3fvnyl9p2grroi93e1e2x4lbz79wtqqd914svsafl38c9v3s5migc2oa52bnzbksughp7p7lcxfud9jreal6kl300q7nkg3j3si92jdo0kg3ev9',
                channelName: 'u15p4xqbh9zcavaxwjh1z3swdazxhofyvnjosmcj3txpw9q51q4b1fq4w9bfvsexd490dyefuygfkyikvmreuu5l6qbtriceoi3vnbvhagxqsibmfffvimhbm833lqtlg0ihfpn4vk9cbwkyem3g0046dlnsx5z6',
                flowParty: '3koktj6mvesewurcsrcmwogxe49yxnomjkknjkx0kx04qiabna29a0e8qsl6vxqndv9m9a64054vrwobbzywv1awkab3m203128r7qrbobiutybjrw8yk5alkwvnu2y1nmxbngiugifeu0a6kfpycdypfd2lic61',
                flowComponent: 'ah9dweextzl4o5c854o4gjl1hedh17ce1acvahvcizdqxwiffyoylnxk4605bysdjporaen4t7uk2r0xnbf8pfb9t4e3lhej1srb8qkw6stlyrm7yylq8zeuiocoy6x5o009fr8x0my3vg7ricpw1avsvy61n4he',
                
                flowInterfaceNamespace: '4bd88ii4kyy4w8mn2mvx0ueac73upa394mwkq9ygiz45alez5a0bqrwu7velc9ibpc54nmmjbzn01fs1ue8jux5juv8zegrl4apy9wlxemd9vizf9wo32a7knwdgn1twx3y6v1jhb2w1pg3yfhwmq6crqxr16rmn',
                parameterGroup: 'behfiajrlbwzpn8gr0e6h9b8xz1lcofa7he3bn5ijyanlbdg8l9od6qz56go3k97madm8bml24yqqwr9bcffxyy5emooqu1hk5pn5f4hjzo0uixxew1iytgh8korjlh5y5oteph58v7cdp4bhs01f326btcgl5dcayoohxajlx7jweax0508e4j0vv42m6sdi7f2p9zzoold18sx16umkq4rq2jwnsga49qjafj6r6g3nxx93157i3c6zn3a5mw',
                name: '8d4mucr4buco5f8ocjrs3a4ebfi1doiltdzq9qj2qgjeltlc9f1i509zof3qyw421685pbh16n76pym1ujpdlmlfkw3x4rso0ty7xyncjb9r5bdu6nknselgersqb6ul34rwtbsva5ko284g0gu9s5xmotpkdydft5evyljung9ewpmohqozdoz2lwsvdiwigc9cl3ns98nlcah9gy7sfk99m4ucjw9kdq5vbq6aamkxhzl4y0i798xdg44fulgblswqi74qt6o8t6d6eiq3z86d8ledkiw9dy1zm77ouwc7un6txlzwpppasfpdysk9',
                parameterName: 'zivt0w9wxx28w1gq4u65dpexd9jh2afgdrlib38ftufgqlo1lujjl83hu7hhv80iwdcm2y0kv840kycd7x530fcjhi2fw324k3vv3es0xt8tzpzcb0hhskka169faj5khp3csy3aqvhh5tjvy6pn248x6jh7amztj4nyr98n23m5ayx3x46arx85aco1b92rw0k87qnenrdgejaqvco4n8etwws8ckphxlraqa2gkvnwk56z4h590hekneskkeqaqseqdk31w1vbscfmuqj72wr4ykz4sr9kd4hr1yzqga9p1w5z85mi7mwomxq3sbl3',
                parameterValue: 'pez2nhq2uxre9vzg7mkkjf585y8bkhxgzfmx87a4zl8xq0pvp4pg1scs2t80s3rr95d9ldzbv7kc4ixaq2nwewgo0eqj68gluqe15kvhae986fac0j4hdozovcknvr0748et11hrl2aa78uzm03jsqmewpkgmyyjfz1uciuwzruu7hsqsbqt8uzylmz65f4962jx1did09niz507oa5e8egbgwsd8g8g1p1dy3bo4e6sr5u72lk2hbcwdthpwd7yyk6efcmsefk27i0deflvitlq16mqvxmly6g6maflq09gvu02vxrklx7xphk087o270py3mhxi2anr247zn1z771zy6cup30o3up9vcwgr5s61d4lgdbyyd6fge7logghtz0s6gcikkrlqojztnxwjmtfyb9z2sd6t27prp7lnlvlrdgp6nogsp1gfs7ba9l98ptqz2mbcq5m8p1qoocy4m26fcw9ssj33ia82kcb5gd62asov8du28e2vr5k8lv7eteaz73red6td7okbng2rgw3dd5g8jcvfs3uuhr9dtppk4pgpfg5u660ivi39x2g7rc8b735a2y4ywe3082v0qhp532kowd5lt8i0757lofffijqnlo6edwdqakcxkslkaq6q0lve6j1hr9fykz65hg4d2r2dlfyov21qt6ypronagwc6sf9nduxh1telqgrdhpeovwlkzd757dw9lyvu8pu6g2ovcniscm6bjesnrf0qa5dqxaxw1qxzvzpqfsufk5lj2c2nac5tdfy6j9wrsy7ytp13dsxri6dwn9sq1pnejbs2i66b91dcax9sdrjrl665fymf3p13ncwnhzf4pndopg7zgwuf215y11hb5tbmp0x3huv9o559m8t77vrcxjmvvdpxozf7bph05jxhp24cbg15jpjzcciej5a5z3sf2t906xaa7ejf2nz2zglmm0op9ygfoo8d6gebiznty4j39o3edps5pdvzy7r5x9it4q6jbs827w8lx41g6ec',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'bg6dshugxmxgehjd9x5b',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'ye3kaywrttjt8yu2ub0qs28a54ichjxqv69j21iqo2ld3jhekuh50t2f17vr8lphv4pzd5cig8alykt78ei74nd3wgloavvd627r0evpdybcma510pj4qd4zuixaqiubthht3a32c7xh2qrfrpu31dho1g3hh5hb',
                channelComponent: 'ldf0hs9yhq8foj5ovqdueaal7tpegenf4vaep2pw2uwthzyreamn9j7cbdu2734fj20s86xy2dmqt71izm6usalinboqjmt5izngwrgjre7t6hauuy7dhv5xq79dqo8ga5m4uqpomafdbda90spvh4v4qzwvmh9y',
                channelName: '0hovnwumtyrjo56slbepxpe4bielzitfp7iq6b84108dlnkdjnd9qr9f4g5yds7g2ogvgz9vra9cbocq2di1ei73ra7cav5n4e9uke5luin5psr7vei64yahwxwfkgj42gso1ja4vf6ekpyawhc42tr67zwmcppv',
                flowParty: '08yftthhv14ti15pbgguubo7za8uxnux0hx6fkoeeurzr5v334b72hap0nsl9osbwm3hz9lib17q51ycqk0g3hz56hnw9493bu13t57qbkww6m0xg398boujfqu0fnphbthu0gx3lxjfidy64t4sdck4phlx1gbo',
                flowComponent: '14kil7k7gq8a23izhqf8wih3ez98tq5a9uzweyabhqllghatlpyj192qn704u89brhrwaslk92653wuy2hal2e9rx4pj5ng67oqp6k041otolmw9c6b0vtxsp9gjlq9gvlo01dutp8iov7h8gy9xcvbfigljdi1a',
                flowInterfaceName: 'd4yvacr6ernuey4g564lmi1kovd37nqtx7o9k15qpy2p78f2uqpeu9o3nrdarr1wxb1pubmhetkzaagirkjfsi2r2z3cauecieyr4g101kxmga98tgxtujsm6h5zi1p1knkk6hktz3t3o0bz7zb74qwvdw5mcdza',
                flowInterfaceNamespace: null,
                parameterGroup: 't82643u4j15gs0mkwuacvsgdjbqltder30jjioijsspij59lbrsg7k4jt0dhceclxs6zvplqfaa5m8w42ibw6fx1sryjrwhadn7i0i7vndjhce8pltreejcg0veg68o9vg1x411hpqkpp0axii7ke662by6lqz7um2ouaqbm9e1jxm2boxqa6mxhm9zvb73env5mm658f2kxg3kkejfj94ia1on6a1j7rwcyhirjwkdwjo4g7qouusy9ngujnms',
                name: 'tv9bmwx1napuwa2jtwydpiy633zf6f3qz7nd1shda2tu8o6olqvbyivbed6jergxd8ggq8ijbvjfw5odgi9wd9cv10wff3j5xjp9f448znfoctruq4dsgchvk3ify56zck7rmcpxwjoeldcky4ka7h09lmjrsmtqrzquzjrakwm4b2yu10erziggpjtgwqf0e3wbyug8zwa5klzh0t8nqrj12esveuatzz054k9pugs9gk2d4k3v743jgycd6rrtmz6ie1i38a3aicai79usq2wx7zy6s5tsnrds7jvkz8bfg25f9bpk6om0awvmks7m',
                parameterName: 'k5in7feaijbm5d26lli6iqvnfqj15j3ifcbv6nbmqo49lscwt4zlpal72j8x8w7lk75pouwlzwbzgrts3stukk0bduc98umvi4qym4xun69dpx5lwhk0jgp1ai1mrgx463fwt30g82lqf8gyys6dshwtz00qgq4kcuvmb8i33tajle9wp06z3e906vh1p66iioi3qrnp7389dx1ogmlurnrbbk7sbuqk9v1v256wpmie35t7j5s4ol2gsnqjcsbw460elvgjt5si4vem1bka9otdy2k12v2uef8yb44kefrlrtz1gm3o2oc48oah6dxs',
                parameterValue: 'vqrc8khyuljyvnp644r4stdb9xkuhla54ocd08cxvf9ngobhgi0b4cuxg6l0i742imja9es1vwsi3b52pwtmkr9riq3mvi7o877kqkkxkfa3jkn8wkgof6dr857i2f16gyl8520msskeqcxr7yhotzx86pukkqgy1gymxgs4qumkdzoy7c9bri2l9dpg6pqxmkzd2m6ynryibo5leuzxxew9zw71v6sdkn1y21zpro4d1vdax1875imonwi4hims84rv9dc12q0am0mcjhlruoxg1opdpwxjil65xwr8ygarvze4p84ec4kweupfjffdf363xs2jgwsbubgkrelowpzyutd99vy0x0bmfdbsw86fi6750b4m7ger01mwdw3hdvrx8p3qq4ka5r7hq1ml9u2gmszthmjvruvbkkmy0udcnoj2zvagc9em4f8er7fjn9ixcbtahstjg84cjt626i7zmemf7ho2dvuig27q6g3f3cwyvdu00aft42m1bjp1uqcog30s0q34vvjtpy8x3dow0ph45yomh90scalk8vkikhxs2edhzegxrinumbgxcscvcqlhwfiefp50fmrs744melj9fwv23exgogsmpvkeg100fxpeerd3y5iconaz5mx6k77ktvv4119gmf1ozb7mg9bhsdd7y3mj6p5mwv5oht95iqilja2orde56lnzzmczwdwjy17g2x7cy8nerqvwqz985kvw4vzrt3vmb0i00bqbnejgdmfsnfncb724l65plf47hz5trp19a3p17fdscr8q311i2hizq475713u6v3smkv2efchiv1qwqiz8nfbnbku71u7g157ymj9i4uhb1wljsy77k0y06o14pp3zwxmgkkjoccesbrsbr5jmkhs3yhtnb5ym1zi5n0l3uwog2nguixnwc80wumlq7efd0rp1p2pzz0ynsf6n753hx7bp17xqrjcnylaz6i07coogma37dsuvafq071f4a4oesb0r7vlluifl15f9j21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: '0aqog3yvtafrir34wcz0',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'mbejmcr6vdltql8l4w2cp9s5hvry3iypq11u0l3821725yo4m8h3xvxevbf2bysauwefmxx0g3tzwrn5rstr4xbtfv7mq9epxqgih4yfueo1gmxwnnfwl6jkiwnl1aib4ogx7yqx9lpiou9rj2la7beckchof0ko',
                channelComponent: '1tasth7p90s8zme4jfrqwnd8e28ihrv5pdagi9s14cuzto95i57dnfre5obbwt0hg60aeqwudpflat0230cn44b5pj10f5adtkgtzoh71uwjb3f7irv4pqk0v9c3lxx8jut1mu16mgr7o06esxuny6rp24r7ae3g',
                channelName: '5zeggk0g9y5p4vaflr44gkbl0forwtijqm9wbwjpla3ok42l66z7feh9ct6sni7hkcjh74jxfkdwjv49r4xfw6btqp63tn020t35u8fzot4zq9s6c8hc1i5p44jisfo3ptb86hn7inzq44xh2ff709jnm46xrmph',
                flowParty: '5debjgpvh1e4eb6yvx6287k1ihzyjkx0tn710tytw033fh0jk9fb4d050197z3wwtdgfq7wqbne5j49jcap9qpakm1dk3h58u9bl4t7szia6g3n1p3n63p7y6ek3d1a5xjiy6lyaxlprh0f0lf0sxans1ydc8p3k',
                flowComponent: 'debohq1py01m9chcx2i4fxyhkigbu00a4k1artysyl700pm9854winfe5hw0548vt9r8xkoafmg06ve3zdes9fe79hxtxn7ma970xcx9yf163zrg8ow4fai0s8usc7t87rrr527f9iy47v3ndqltpfikba3j7z9g',
                flowInterfaceName: 'xdcb2fzm0t4wr693smotwov0sfca1dwtgxq0m073xz45vm68w7hv081oagkn0qs68071tv4e1sksqji6bzh6sd9vzesmg8eb5vehqc7v1fgdqe542etuag6pf2hbvrzm656nzvlvr0inax61nsviidw546444mjt',
                
                parameterGroup: 'euo4w0gu6mghlc4xyp34g57jrk2l9jnr2du7q0cmdgrw4ayb7v7di0jrkgjd5exs4pylpoxz4y3f2boqfq8xqi5ko4x2emmkgvjmo7rn6higdq9lqr1b7xu52narnxdrsb2y5l3kyueerdl61ullvhwqq0f1vi55h8b44hwhebergjjbswsc533mo6cniwvaquge51xtgnt9ah1siu3ij0648khjof82wxj0ptnv2ir1lqc2hjdf985mg4iusx1',
                name: 'dxgs9q06zzffa6dr0e8umszjrsbtdlo6ct76clxrvrgl831baqu70aj6v10bhwkdsteg90rvwp89n4fizjqmbl0nkz25af82zcoazj83dw7eu96uqvmvkhlk1y0ymg70573k1tktg674kaaf4zybx5q2h1nx4cpc0nidcheid6533a8kd2nkr76xuutjp2dhowowfm9t54m8jb7eqvw564n13dnxhm0jpgvfgg4ktcmk7sdc5jgvjfdn501qzk3ncq9xpiu0p9rf4xxlq1mdob0okrzyizas1pp2w6tuqhtpsba0w0pg0xa410r0ri0d',
                parameterName: 'q549yvs9nmlan8dew8n6jecynrsikcvb6w5vz9ug8llm4alc7t9wqwrq3n957dvxtgdgm1tjumwskdgvav4qv6gvedx2n8aec2r4lcio04clg63icv352zzcz3bwzqr1lj5ebsh7wjinbehzbrfuwyc1eh0kpl4xtvq1hj3phd5qqx9pb41hssij0bdzhih29qlqa56p6plj7b7rltru5yb87r7e5wf2uoya5e7a8t5y8ruo9435v5ek775q0eeb4c1cz3qc94b6egvpid1ynbm9kbh96q7ccgoa39lo8qgh4kn4ql7kc3g9gchhm2gk',
                parameterValue: 'ndk4mzq7eqrrd7stgvqvpyj0xn01evffyrrd8l8zy4qlmq5b4cotozo910w6v06h76swtxe81k0kono8l7kk1prgcy5umwmcrye10yb7dx8c8ie4apklj76bqbonqk28ehro1rhdpuouh22hmfa6cz0a6z49m9px4fyl3kkbmw3i9z3gzdvdpc7ni4dd5n0hoagpdhab0uplixanz9buzsxfv93eh3yr5dzvwopzkeh6mcf4siinl2f5wxl4kdzrycttym3l0it2zcmp5vay2th6pcivnwkidx0riyzue0w0ebuksmiwowfw8odu2h1qj01do5g69qcx7pfbe3th15pa3b5weid8eegoqtk7v1uw9usme2cfm7fccgu63508tvslgcaa8su9wp9kqkjr704kjkce4rxt3pzd6a40wijgjtqs86yp16bp57pit827ovwi4tct7du1v9f0jvdoalegcp7wstmnmh0fn1rqqyi1gm4wlyt0fwqn4shl065n4nvhcmy5ermjbtmechp30ip7nfrsimjkaqosscjwkfeuwq2nb8mlb91n7pz0hsz21cq1t1ehcrtta4icedjv4emqzv402hldzzztxve5qbvwbge9cwppgkn0scumjyv1mkxy54tz5ghut3dfvy8vvokdjg5mdu22wlmquj2ghrzdscgwen0cmxdhps4bpwasaaxr7l2lunu44akz7e9u6ot30jf38osz46mnv2bblnvmpb1b6p49345e786plflrl24x3s38wt1u99j59mzjqe8g535aof7vlmjjiums8qvt85akwml4re689kfj58t74initgvh6x48bagra80f6omm0k4u8zdcif8nvoohl4vr70isk697ds2icoo5zv1vm8qxsbvp5xke5k8uuxyf2nutzv41ajease5xa66l9bz30jaenut81rkcysjwdcydll78gf555hlqstc7x2auk61o9rqey4rg4e9maev8qj66gxm2omwlz40np6nqhdzg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'lxzw1ndbgr2b2von5c4swftcwygm96bwx4d88',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: '4duvyeszm03c3gk2k080',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'qlk3pv5uu7svplwrd4wcdsqkz7d7bfoa1eq10ceds09b0pif0pdbeunhmka736bzy40hk9pf3blstoqmv8d2qpwla8m0k1hycu3cwm45rfifjhzke1wfpso9zypojk0qjbd078om27xehbwbmab6psyji6dvfdfu',
                channelComponent: 'b49q3qlwc2qswhla1ou07g5jb2em2cwg7ictqyia0dkj34ovikjnbpjbyto9jsvjqvc6nbpiqp0fhqujzvsn6chhghddfq7k7x8x7qav0dqbslqjt1fcl0n5cw6d8l6giimzaqzdh9kk0eehn83g3n6n5tp2xu6q',
                channelName: 'wh3dkpy34pe7snmv0ss1z1ldhtjl1d69k1exgn2e51omgu70a0uatkx7hespkxf5nmuhbvt03iw4ys6oq2gtmaraui2lpyud58jzjirjrgi3ulibffj3waqoxgmqxcwzm3piid2n7uw18acuip3wjnziqg1ziriu',
                flowParty: 'gjlpq6yjpt4yt33ee0cb87lmuprafk0o6ta9t1ixb9hth2gs9sv8nm7bjw4jixumqiamiu4enf906dhzli91p00bf1u8mp762w6jktbtk2cckf3kis7e51n24q6hapopjsdd06sj6z47aq06it23yxj6csgcarzv',
                flowComponent: '9kaygk3scbili8iqfp92skdi77i5gcb29s8983h9a8n9m2yxabqo48h3jd8qpappyyos9g3iifbhmkghhi3h19orz0k2kixihentro2alum4zbluvyrpiqzsus1b9gub21ifzqga9f64eusr3c4hla0lzand7v6c',
                flowInterfaceName: 'lspwg8e2p78a4v8e9f7gch5i7tbc3lwxa8e1dd2yoszzbxa57olbut9trc17ki8f17tvf70tbwilslt8nwnelbivvak05adydv1g5zl61skyjr2lh2t3olbuq28moveaio9jhkyp6mdn5s4tq30if8kr0i1fzw34',
                flowInterfaceNamespace: '1fhrr34bkh8pc32kcgxekkjx6rk5bd0xe1tmsek67jjhwgdvech5t0b5lg28lxpi7i0tzki87vua2ro60qt3z6t1vqenk2wrcto9ln9vtqhv5jm376b3z5yhq689ga77zonphi8jp2p4npiloqap65f15hpn8vb8',
                parameterGroup: '7wz44dxi0z9o112bwj6rzbhr1oqq3p7eccnnzr4hy6j2ys8il6p5bc848le5ayu39qx6l4mjbztpuyjbxifr6ievtxximr1l2yf8qc09yawlii0yma69a5yzdrfoht0apdq9yeksrte6pi1c11rprnhtu8xlkzq9qzb6elm5rcev7rr02lqv8pstikdzcqk9pvnq5gc18ac1hsoxzm782pmmd2pnxao353gejblvswoexssfm9xlx33dpd6dmyi',
                name: 'zp91sssivr5bozbfscb7xlmvqi4jtihr4695zgx80hc4pt18k0kjja1p2m91ym8s3ymtk9aps4wtbmbvzvj30j03e8fc9rtje9ce6fknip7ewhb0eh761zeo6638izymegruyyrsh2w8o2grsixmsfnqjexeioevxm2xg8xmxuw9bmxnhz8orv6m05i6dvltcsegv9pdzkphlmg942rkdmjor2ai2xbo7n3mhbp2s8npe4vpni1llmrg31j4efc6tjhh10r29m4jcjb0t9kes2spqxx977aeroxjbo2z23vkobpw5sjryrnfyp1dfci4',
                parameterName: 'fe770r53yv8z5qgs0em99fpi2urgynpsznwf532vn6naio1t1dnea9cgb0cuiqinkb4f92b12883rzr612pph2hl79xn5uumvb02wr62y5v2n7fxvxffejg3hccp21fw3gbnrd2ue65ias0npdvg81cuaouu3uul7rwrlj7e6by85n7dh8l5xdigk9fjby5h2tmkkvj6lijp276o333rynk6vqejt1ie75ulzy576l7o9jccivx49adf3qz1k8utfq5mbscio1dqgqehre2ypih9am660kp77t4m0q8vftchn3qpumd0q5h54bmqbv1j',
                parameterValue: 'lw5b0b2ygeq30e17b233n4ae9tzgon5f1y4ds7i1o9d8bkuf00vi8ja8k1l7eb6pzxb1nmuyot67n5lel8vy4e9myuhjllh1xbfjaryh9lpffccbwvrbceuvrxz9ca3rl84xqz4x7j79lvjm776f3giin41wui2z1mq9skmiwzi1q3flhcqx3h200stj8x525a9eyp7ifkmosby5tht8n4mvf993bjdxwudoee1jr62gus7f9t2kqvv51ulb39yjf59zlyk7lhaxibdba2jxza0f1ayaldt57hqbwon5ei1sab7s0u52plbb2anf1hd4d2pl0penzndnbh9wtasxxc8mtblhtw330uimznzw1nyxm7zy4roe0agtfh6efaxf6kn09fdokep7kbk3j6huc81gwlr0uvfkbz37551lm3m8urrp15r1om78hqoxi30zh72847nuiuzrwbbgcf0t9bdb25uxeqw26ix36ssnqp31z6r3pixqxym2q08kitw9mr8ei3tmj0xh5gxo6thc3gelcukukjs6libkfzgh7vlo53nbausfylrlox4p9g685pn97qy9q4mwffydthrwpps8804qgxdieh1mvmo2p8bokx3tx3bdzkiks6gjvpqlyf82kw5pq4dfa5x1jly3eabvc52e7rn94tyr03atxvo89ml84iw1p28nli6835rd792it5du46afbc5863m1wn4xvmglkj0fgibq72cr186rt0yj2n5qf3flqqnlxf9nk2nulc30rgbh2tpbw3ilu93r2jtnb26hc7vil4b1bpfofhgo068n15cfccoiy28c072f7t1tzhmiadzr98pq1a24pmwqqlhnp5micano9ep8dbgntenl2f7352sh3dvvxvh93bxe0kvwjgeg5s1gataispwcz8ix05h90wv11zbw0owqnd6tlnam6ozwt4yzn3f4rwpwnxb80qcl1m0t9uunvh950l25jb9qqrwri9b0ligumeogsantxdqyid34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: 'jqk0t3wlr5mkxpari0xv42uj7cjm02pioomfn',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: '59ajyut7kqsxjgi8lqgz',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: '8vfupny539fv7ow0zeba5y6zsxt7xpjo1s0ar4glh8kz1s03bhhowj8edwnmy85satrowtupk6nyju8l3xrn9wrzkvh94jenmou7bhq9c4v3gic5whx5t16e9f1v87m8j42yfcrcc6qm4yqun7xgbklysagzstp5',
                channelComponent: 'ybxraz6jc60b4fxamo55pvcqjldhzw3yig36ugr2sbogyfvg3ra1dition111baxa5zstdyy2palsc0q17clhm8abngrlgep9iqkutc6d70eqyu15fe8uoa80vxdibmr03x8qqnrxl33lk88o2u5532ikt7q5yjl',
                channelName: 'skbzotvrh5yzscro12a67eaxfwzwuycb3p2ex8nt5docdx5hwhlcayd7o182xp44pt6ual21lm7w4oie3guowkjbylx7h69lctgyiejfvcj39nkm7vg7yhpsingwahroi00t1yxfl0vk3h6vwegac0j5uymrgd03',
                flowParty: 'qraz9otfnw4z4hwp1e06hsevhvfw0sfw1ydxry6swaci2amnbrvddrqk5m911hiwtzs4nhnvo1whk6cljwccyi3qwwfuql7hoibhtmj4dkxu9osdo5b23iphh97oeiyte2ywq9rt0pyr6bpr6ll8qe4syf4nx42l',
                flowComponent: 'e0fql8kpdg6clldcnu58pwcailzlf2ufvsepm3xzd129remg4adpl5cgfa46r76r33q68tq2fmfai2r3l4lthmi0r0uk15n9dkwk7pjht9zlxccx5qg4h806iy8bkzqdggn91rpaebi9jbwd54gupynf6p96bcqh',
                flowInterfaceName: 'vrka7104hhjp92smoe5agwzk9sir0e1n1asl1lphgcs2ii6oe8gkv6c3jsb0mmjh5jijbbmkwedqiawun72kt29xp6l7fb29un62eu5x66dfibaqwtcr8ag6iwsy1h83mmmehxl473j985sd35ogz329fj954nj6',
                flowInterfaceNamespace: '1kbjgs42uptzffuevx7v4mqp5qe1zwachzvvcea9enzf3tiawod6tvcqywxccve0ig61mr8n295lapmyxl7y84gl78liitot04hhzptpve0vk4tbakcmtj59d5bsfrvges0v46agm5kc3buq2nnsequ2lyjv4ow3',
                parameterGroup: 'ux4i3prpggrzaj079yi61acearblmr0icdffwrsj50fl37ph12gpjw7niz93fjlo83fxx61952rpgusssqngy8hc4u3mwclenlfr94uyawgiubeqwrltvasi4dpbpqcfyqsr8r2ac5z7arkj62jbd2z5efx7t7uy6yyjif1qukcsls2kudr2mxoc03pcaxbt02f52j41w01uc33z2rlt981kjn0v5htsmg76l05g42i75cpzrz8mcvw6j76jzhk',
                name: 'ca4vom9mjct1y5zu5nmyv6oua3jpgaymex3uhzikq1hy25nuxxzxtgyquyhxue3meystnopzvru074oydmpycureze3b7jrs6yf585cbweqanejzx3nqufljl7b7kgvame56yose9qdqasyvxhvq0eqz1hv7yt0763mo77tr4wco1xhwvllci29uksf7tto25fiawmjpttuqxpuzmcedd8xnluh739znr7asz60l3yde40a0ammy54eewf1nj6qg6hp1zjj59ewgelehuwiyto5kx3vlf61dk09g6bt0uuayur3vrkeh4vmnu9qlcvkd',
                parameterName: 'jv3k445n91pphfkyqtft34gy0sa1w3m2is70dam7ruf8svl6mzd9qkshe4u6reb9k2wq93nwnqs7trby35nof0tl8mluchrarvim7f70csci9390i5wevhttsbmvfh40p7yzormqxheo6okqbe3nn1hc7532m13skc7bf6kvu2broay95xc6krsiws0yqutxneahgxrl48zvpidya7l0n9jxoyapbv7jvepzlkmnri7lfm78u2tuins1i7y0zwvez6f005nelwp7joyi5gl13s2615vtmvhpaq1pvir4ic9wiulruau3rskhf1dncuqc',
                parameterValue: '9iar90i9crhfamv95nl972yrh9bdp99ku1nzmg0seb9w5kh9phzh1l93itbwpsiglo2kyrrjyntex6zaza2lg7wrwee274h5y5s8yb99x7j0gi7fcjg82m8vckmrmd16revb5qepgi6e04zig73iozu15rwuktes4xyrhwn14zwzzo028sepizfpcmk9dbm5nai7bjs7hm0ct4oc870w68j278elvpptxab6w9dg1mhddnp1x7in0npu6l908rp5ouzsjzl8bjh7ybbes6tx5z4w8ug9smcgohl4hgmwptwpqy79aymxtq9lji1yi27s4emscq9zqg2lwof0anxmsb90zl64g9f8lpv0o8ie200mev1nwk1unsn0x1uufguo29w7jwwuap0ewr3imol9ef9f4ssrhk8mkui6l98jbzk2lnv92ad21zyschjltx4vfy9icbf0ewaewf4pwe9iovscsphappaq78k0xzd883jegpi0302cleweo1vcnad5750myarqabnhsd46kedr94ohbwjepmr0harcshq64cm4yu9fsaa2sc505v4sv3icxq7mb7gse2v6pvq49w4kxvls4gr1jl7psk96ftak7y3j7zwsqskoas3vbgwrg2bkhe95cxyti1tzwjawauf9cwdgbcavz1itrv979v6mfdrcd2e54klxgjbs42i70fb1le7aoaw8smol5b3z4xze7cb89gmp0g4n2v0tbqtfpe0ko4fauu97lpzxr6gqx0rk3dotxw9ikgp21vpjtk2hq2wtokvhzyz56nmp73xtxuwd5jbe3z2zz16z19nzktvu9o44ovbw5c9rcb8b5jfuhm7hmw2mnntg0io2u2pm07w2zlc2xrnwl11wg6mb4eabz8cr8wedguzojlsn8yaexg5s3dzp31c41ubbgsfdx0pjm7hviok2g5zfz2m70osrua8rbw6msgxjiw5d6b91f5txbql1m4byodsnp3klhoftzda9w950n1zm6ffk464r',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'wke2wxobymttz55umx61s7lq0w0a9eqk01sh6',
                systemName: '4mmg2pmxt4lqqmukk7vx',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'mfeskr5qhpo2s5eyhv7x7ymelsf6eywvym46q6ofn94qwsz00t90b6c1u2kqeo72ynzd76pehqo6wxtugcsx5cr9rfcypk8y9bmg4b4tzzkyit9ywnln20c1mym8n2rs4be8dzz2xqpz7glpa2ipa0xpl58k7gad',
                channelComponent: 'mj1ook21y79mpcmojjs650gfhywd72sg5qbns87qp1vonyb91kkpjo6ok85o6u6vr99m5ptusf1jznr0a2jya565w09cn4h6mxfeksmd1qc0i9atbvtxccvc2vv49oypovfv6u4inkzwrmtf2a5g3v3rpyd3sekh',
                channelName: '79l9g9lvai9ilyztk5rt1luex8b2m72r7xonhl7vdnlu7n5js06zb1wbvsiucfgqxo5cbvkmg3q2ed33k90un5z61n8v7gvb85cqhrz79g9t1vz6nz7lgy3hbd8cqe1zck1ymsqd7ocozls6rogxnjo9bzidcbmo',
                flowParty: '1snzl8qlzc0mqqthnklmaomborg3zjwwil6rj3ctrpl03vkic14awwoks1968b9d3s36sdy2i6magg6t5hvhl7i761ixk0bqan361pl6s8yjmt5whl6u33e4n5zbg7s609vlo5adqlxb1pkbb12439qj98t5h1cg',
                flowComponent: 'a45j20l17yypxl80jzeqnqh6xyjbsjd47pmvjmzbicxzki81bite8rurjfapskg49jq1dq7sa05bgc4myqvih5ef2mkpxc83fusi360qvjk396gvhvldu44xzhed47ln1b2a0eov6d0w37mdzjho9vi2glad1z1d',
                flowInterfaceName: 'opo7dlj2x6a7ueumc2c81qexvpwd4t7kgi9acsupxy50u3wu6o585bt32ts6fzoksebov5wrixodn4chkaedibriizxsay4iondkx5ph7gejlfnzjwmr4dcepalloqebxrcj7vjseyaw7zyf2fo5iykhkbwsgl8v',
                flowInterfaceNamespace: '22qyhhrhnu5hlr41hnnuloinwq9sp0j7u0vyxx361zjhmdoybgu58ceyxfhrgv3ual24xgbplne4wlo8q8co7eojcr7au3aeidomsngkwnl5b87ytx1274q2qx04q724yz67gkgnci3dn09yji5d2etlnvtzz1xl',
                parameterGroup: 'mhcw0re2mbyeich2ot1i7iesvxkyqnog311l71nhjf3ukqbw1vyaqczrzztcc2bz4dfhpwc2vp9po0aymdi3u1f2ujcqkmowi3slhg0xsny3052um0vv9h127f5lvhmg2zg9lp4dtumr5zx09erkwwicn3pwf1lw8qrib9vb4hiv7mx5o190xewwm1w0qpyue7w5xjk1vb2p1shh1knuh32ay63q6i9yzwvljaxmi7zixes2ptr0w83tgcehvef',
                name: '99jtpace5mqkidarp950r26pnkj4c8h86n6ukv7emh9z2pexrmddygaul8guutjwgrrwmvmt3nnysk73c5o6obwyzu7y3k9fe1svqod90m2zgw28azk0zpnbovuwib2nu6ybrclass70btkky87cojexj6haq1rg3rtbav21igbaj85uuyxwh94lwd39q2o8qj188uznv6ao7l13iiub4b84df5pl78j03jq40sbhyzq33zq6g1fhs3gnb7jhldyj74gsgap1hbx8zltim960ysxh19d7srgtf2gxqdoye3l9rabycg7qlg6d6duzu81',
                parameterName: 'jzhva7r7sdrimoj02ba9m0jtjs5hlyd3jozqyaj8m31uhuzrpbnh0ghca2aqbtn8iakm1nycp7i3h2naaupght6ioetiucjxa49rb93gkacludmfvfonb4dm7rqrdw1ar00zlncn2jgwaxjwndbej2miofho7hx8a56a8dzl1q3uiymr4qf80umi0e8erjuaw7zab5lgk9fchliwdxv9nu2nvotk8dq0lbaum8m0h3htlb8chzsa93mfmlboiveq4r7dzht2ocutsf1kvhyps3e6puk5i6n4ekge6k6bhshpywntadjfh8yk2l5rbnob',
                parameterValue: '78eu7ehj1ae3qrxjgpy2joombd7l94rj8gzix42nzv7a4muey1123s7w1t7b8jmllbd9na1wd09hgqd3ma4t8zxmsqby1ka6u1repe2fyw1ihi2o25s34r1qj4t9ra2zllslokgfdi5v7pbz2xh3ggd1zn976wsnrlh76pgpzhmh613fi1l0keuilt19a549tvt8t7p141a7f0ng31gst6hosrswawk9ny1hbjj9f3r2flx2r0e29ldtesd0i8lv6kj75brdy9ori3chtoa2kny5w0v145s6bnphpilj6f1svzjoixkmy8wzlb5na6o1p4tgfhkeshwrgd1fc2oof4xyfpqwsoght7oqtkyjm3vho0eu58jrl2gsjzs77aj4dzb0qzeco9k28mofd0yjrg5kmr36d59d0d03yra6dt42ol8y0w53ew1dkfo18lu78z3olp5zzebpc10zm0jm5o93ci3os5uff86mdw8eubwz006ez6uw3tz49ul2r592bykz1txtjx3fngwoloro2s1kmmqbyem8xmckd2ncfuxlt9bbdxufgyn88q1o582tktqhp5cq7otvuyguw6pn0qjbwwwnitcktx2v06bc0qzin05ccfapqz4fkyz2hucmstzeajxxg1699wbnf11n3wptm88km4bykps2osavvhv9iseo95uzwqe1muczcumn97kny9oczc705zwbnutpp2rmd55ugdar7iuch0e2laf2t7ewsc3iewr5oucj31vv77ywpdpypkb6uy4nivsj39t7y17kwjzuplofgprg3gez0eqt1ahnb83b54hp838c3knf2pjnc4ezbsphpzbsvm2xasqj0kq99hvftwu58cgaydmw1o8fffqpxribkckw7jurrnfz9minxuk0wque62y9tw7v5utkda0nmmjm789guretlar4stfxa54kislu8zk3n9eafu2azjcerle7xjbyc47x4ajno27uzf6s0tbsa04s539v1ebgvlef4k1s',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: '96ku312c2n91decx3zu2',
                channelId: '9yockkzo4rndd7xx5iuhn1wdgktcaa3uguh5n',
                channelParty: 'o5fb6fbxqslcg0d0o9nck6fstus3519o7v3n93rppg3odvaky7qr67dnnyb7hcr0ov08lxgjtdyafb0binrd8qgv8x2j4iyy0fch1688l9cugjywfscija3uc7eo75ch2k2ccdgn5wrlxveickdlxdtsj3w1yvd8',
                channelComponent: 'k6602q4820wh35tq9oeybqsb7pgsctqxszryvskty1d8y1plhtgw4eym0vxao2mfj3bojr7ggbrcxte7aphrmflveopius547sim4ayk7l4killxj98h71d4ix7zbptlqgz1zhic82fy5pyhfp225yqg7dg4v4sm',
                channelName: 'umvqjcmyqkv4g7pj73ds3wbp4a4k199x1mnnu63gjxvyuwhk14482lnor0h34pouhycrv765mnmu46qmggnbxhahqcctqpwbrkoo79iuh4mrrhq4ou24n3peeud4kfgoklus9g7sapv1qtwkqiexfyjcbnq6s37v',
                flowParty: '8e9hbuoxwx29c0fd01a4wr6spanju5el6radtrlx1anclfxf92xtk8nxhp7h9sunoxs9ncfgsvvscmkickam18mdn6tensadudtecatre2rywrxqcxwf6oukzaajsafgl1nafp53o2sgithh9csf5trw0fdudpln',
                flowComponent: 'n8pvyopx7iqee3dq2bmvs30e8btp3o7g7gnmrv10gq9vpi2f02fdimlt71hzgd4etumc54gfyl3a3pyxxw19mfiw4686k0dcz90fg0lol3vkgjw1oht8vkyyjgi9qh3w29snnjitjyje6n0452ex0rqlxgr65690',
                flowInterfaceName: 'f5hkuehay4zmbvzxl8q9i376rvhef7y6jn7q9kjuisfh35gaq291xwnbc1k9cgf03wqifik0ws36q9f9mwq75lyb0pht1rn5lqz0njtwzxnqgcmuam6lar5pgsvs6ud0lc1qxesjnkl61atj36umqz5ljv5yg9le',
                flowInterfaceNamespace: '216ptp5k8pvdvb9qplkic6wrml525u0jryozbl942sx3cqvhdv1f3dtn2c4hmfx2u81ggay0jobtnsdlngyncxct1hntahmnwb9f7ciwy09qxu86ivv27t724m4gl6l5y1nujxxncpnbq55t4buyhgjkvykzit1v',
                parameterGroup: 'utazr5vil382yhy1jp9nnpeoam6h5gso59q29yo9vw9stx94ili5n6m32g4dcfmy90mol1lzcf1pupnrr4ho0lbbxpxvnohn8o60d5pcfqesp98omibu478uodx76fqmwz7juz4xdvzl4y3m97je72s95a00ypvx0ldx8f0w4dfrk7220aqejeb3aq7uhclnvhzw3gpk7i8xqnprwlyam11kvggk8gilkt679x9exu8h86pk1en4zwhqot8bwwf',
                name: 'ayztw96at4j6rdz5b2acx4660prhzq11vbgshq88nj1xcwmrnqhcklwk4m13fgntk9ttdulrj8wrtdf83jfnn0161ogwpocrhhgoyrjlksg0b934pym5ewfu22ezzefmki39cdyt4b07ouf9rpropwbd2d27pf69voqz30qbq7z8g64rky1ifftkcdu2ei5kals6jf3t5e3bzx60wxzx7l2q88qu3kkdm9znmp783tgnm69xud5i0zw55hbayilchdamqgxxa0gcpy739djtn6nrxvic8x38eozd3lceuyqlb5e180vbo9gsah015wxu',
                parameterName: '9ikccf3odu1690mwz2wmqsm68fcrt5s2e0e8a62wap3wzqevmu0aull5wec66guv9d2neafk49i6qoonb3kjgl3n0r17eafm3jyclp9r7r7m2hjr9oienr6urdlp6kg92t64nh9ymyoxbjdlof3emjn6jzjf6hb3qv98d1oind072mavqshjp7zafo5v271xevrmohh2itnercq1ldimj0ccx9cuiepdmnuvybhuue6b9iy1wkru8fqh6abfbsf9l35xce0mdke9hueu3d1l01ti7lzerq5odqqz5ha3j4hqh5ot8o76sg7jhjmciy7i',
                parameterValue: '2qzhdup381z05jmvrdzlaaerz66k8n1sgv1sji3wx1enh8rmfi4ag84ypdauvhpu4gi42cbngzuwtyuhen7dx2vvz0dkezubu8g7bgcbnkzuaidk3oproox7bfjou71l7841vat1owhq7nnyl9n2tgq9idq60hq5tf9kqv2q3mvufgxdk7qaxsdmaeu9tv2wfzprh77b20b5v21jjec68g2752iqqzhzvgfw23sw97j93vwwca36oqd7qohyo88s3e0xm9ts697brnan9jnrr2qozaxh55xuf80yx4whznujmlt97l13dtbftje6ckz6ko5njocbu1ql3lagrl1kz48qyzjxwxpyjsj9ljdf2fmcph8ckhw2gkpilckxiz03gmtamiipxqshsv2bez9tcghwy35qhtlastih3doporludbr6hq2cfoxzk4v0r6acc5cvcidyg08s33ttuhac6561366tqwksy304adezbrg2qu7tmefdozeu889bze7k50jzm06l0iqkpddrsw493977nq0hu0p81w53mn05rjri8t0gyryl31fxf0ifpgrytiurhbrvz8jfm7szn83cfim9erwkdunt7gl2zegj6acldhg7s3pyjivzjcndn7ft874vyj5chv08tnrjhey0tp45lab2ti8qgmwh8yo4iv5f42fg3ckpx2si4q1kvriagxzslalngg4a3jfktqb1h636k0g6mmnajlu6nfekr3hwolsmg3reklnjd7qpx3urq4a6mlpd08jedp27bm1g00s22ozxse8vfome2upit0fvjk1vnub0btxgp77gjl46vv12inojfz2q31sbgjp1mdrcyf7i7ai6n2ed5dxy60o9j8f6zwose85ku3geyk19pa3p05siy6h22yfbtymsukgn7mb64e4l60bt0ijga9ubt7sy1jrcbbg752r44gx2r3csw96piyprjdd3f1awq9uv76it0th7yqwqvadxptu1pyaox8nmkgcbln0k05m7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'i2xnhb31tdui0rr2nofqo',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'd9tbrltlmj2p8z2aqwp4ylvus44b2mmx37jpmb51audqpfo7wken3euu4hwlj8m4d5z7i4hz7frwmu7ruk4lxkwoqa5jz064nk49ndmcojlb0qkcp37r6f043e5qydmqwq1txgd6cd3c0zbwqmhd6ibpi8b6rp4e',
                channelComponent: 'o16j0tnxueceup5m29xnbw0z5a0sizn3xrwa2lr7oscdgf5ign372qekbzp87c7621j7xypvxsoams8928k9zs37za0nek767rg3dyzm9izz4h9vtawqy6hs4lqbln0boh56vlo76tjmhav0m6qxmdnq0ijffjed',
                channelName: '0td180k41ov1dljejrx1k34g3lt9kye1xpz94q08pns5u4ugmvhn8mmhxdvdik69kikzyfbl4hsnf7trmaby77b3zfcrk73qevif4jvfamss2q20v7f7j8claf7hkz0o7ko1m1u8u1yca0a8fnrd16xl1dbd3ip4',
                flowParty: 'bbukne6a0tj0i6s847c8nebqsa1884vo6elx1x25gmeyzv7om4ffj3mtrkzbeolzc5tggcu1n8x6s0k3klh53fqxypceenne8erg0hlel9pxrd3yy805j5s7oybgxshf228g7gpg9h9tq8arjvkcal2mttbnv1eg',
                flowComponent: '00y0ibyb31h4ez3bfdo0vrwypgy8xpqde1gp1cp6wz6d4iit50ebzc0huxl3h2n4caj31d9tr6gkvuac9awaaf5c539t7cbfw2hl864klblkwb5f0g740x6j95x779zari90oppkh1sbufg3hk1wcs6n149q9jab',
                flowInterfaceName: '5kn76bequo1baalggf6njvysd89vmxus6gkarxrzqj2fu0wvwbwsbhq0lvloxa4b87xxt7i7wxkl4jv0qd26q0uemsadpphda0j3ktfuo1pl86tlbheh15s9wlg1xe0xmb3jqmw230xekxfg5fpodul61gq82q6j',
                flowInterfaceNamespace: 'i1j3pzc0m3fc7xcqut257mu4g1uogwvmcf5116hs4qkzy8xj21dqueiin94i1xb5om3inc74m991e8m3t6w7k7ked5bla2f2h1tpdwng0fdvvk9dd2pfbyfqq8zxzod1qslc1ww9jx2b87yldradi7cujvvbito7',
                parameterGroup: 'xotkmnmr94upu5ffmxlmctno5anl7uymem0jfdupv76lngvr938e8tvandnnox4sw42ywtkgzbszznfovzo2ijmq212wwg9ylh0sasd59g54iv96k21a67voro5wjqaqjsehh9dimp94u2d9fuewrq02za7749p14uk6l30rnxnu6723nc8l5ky73d028w2ook6v82xy6x3v64u36wtdsx5tt0vic09kosyrgfn9le9cwjs7mt4r16pe644kinc',
                name: '978edvk6p9osot8jnacgcqsvs5hawivaplc3ihbr20tt5y4jl4onnj23k7wrmge8l3j08w6vlwictbjyrd9m2xlj7p7p8phvdspenytf249ok7wwugw6jkd12igemg4dccxv3yis3bza6c9ykcn6spradv4b4frzi4k0vc766zw28pjx78wz9qvt4qi52jcw89s3xros8fpdem7avtcqfym516qbyxbh17tdtqwfodlnnjdcnvje9viu79mr5ymeoyhitqsf7o0gkxwi19p1dfeebsvx9utw3hft4xq8mjwzctekzs62cto7ftu0f7tu',
                parameterName: 'i0hygwcnuv1pv61h99s3gasuhx4wmknfwedht06mrm5nc82gsqaw5442ekpfr68d493pjo8q8eagi24bj8ml5socgniupc3rtiodnf5ufgi07u9hjo31u27cf0smq820hyb460u85mu7eykhd8sjaerrn4mvqus835flq7behyvlohdspma7jshpovo9fu03dxjdhya6dbskrts3irbj8xdhbyb8qe7vcauqgtb81vbj89jup50rp0ewifwfpqdtb7j1cnow53zqth6sxyurw36lspz39vqijr8ydoexob9dryqewa9oal9xxe2e08oh',
                parameterValue: '543vbqx46ulonzc1lgjs2dtwg7fele4udzfg9phwqnw62jiup8qktumryx0iqzpbv5zyi2p7sqbksrvf0x0w7np3csakb48g29de7i42yhyoep7mlb5vfve0ecezqc0fwczsid5mx2moyduim3zoez31c7ah39peycxkawudrfm2udbwa80bci76lrxbfe6od35mqf4mdj341r0oatjqwwgef2itegp0bp10khrmh5e80mb1jvjj457ezt8oqdvemwefgul1rbgxn8adkhpvysod9snh93q7wq37kchuqvk4o3l1j7qcqqe4nvw6xaou4gxhos6hpbt66c3zwu7yua3a3azschc0pa6hu6iyxf166uwvdzypje1vtg9wn9xpizfuauaop7bk36l1iywnx68fimh9te3lbsbhrst067ra9nhpiq26fho5ku7jasa9mmh2c2ul7vfoxtftdhgxa8j6vxrdlwso33dyqw5akh0s8tnjlv7gwo4l00zj0dsib3fojuegpp5muebm6kqn0jdljoj33guppcjjm2l4dlqv6blzvfbg3speucudpub5wbti2mnmrdkbjivoyyhsrnqyj4a9nn1crun78as2r14ezoes1g6nnc4rk9ctyqx81cj7e34ubt81fbkskygmkevelsm6mlju2txw4w3hxbkv4d97jvx6lrk0htg1p7xf4p0qc896zg9p4dqm5ta93jtuaq7jfkm7mi7mqd8una05b8wzks00jd3gzo5qgem0on81q2ybmdjyohxqioa0z1qtt15f5pb7xxzsikk2ytmhakb9oj4lkducfdo7bvhir5aqk3gbnyk7rodcafggwpvw66tcsfabb4lzx1d1qnren6mdkxwgm0vjqstevqx4axmtl65jj7aen4rinewb9iwk6jshrtje9hdy25fz731hd5z544brebv4v1rswgr246twmst1zkbm0or61zp7n101ydg38neoncdjbjly3faho5zr84drwkdngax2ti1r',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'l9xjyzvbadv2f7t6cibh',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'mgycna7azx7phbvtngneyksuefdoz02ew8bbf6va7sslszlkimaq7423q9d34g2l5zshhmjyz37ymwuo99auruk8n64nv5lmsd3gkwzmjjhjdkz41k4nrzfmyuj01v75hmfgnhlpse5df5yhlwo2usk727b7btzgj',
                channelComponent: 'e5reh5to8bshs1j69dwtzonvsmebhhmtfohgu7t519s4nd0zacyr3cq6mm42s5rk1ckzqfyfhfhw6eevg10szri4k5kzlu17jd9wzfuru5xubcmzpfo1ywwb33ebx44cu59vl0mw2luj4yk6ei5o2tehtto6zmmy',
                channelName: 'qvzi9l8frxl83b3trjvcjuww8miks0l5ttj3tzhqgf6cxaoa60wkfs24l3eckwaya41bb9t8ozel0k7qob5ydfxfv3bsodngb0pfta29cpom3ck1kpqqfj7o853s8za9kj8bxl40phz43xmq3vv8n0n7qy637rr2',
                flowParty: '4kwk7u60bqkoz9fm9mjssjds5ia5jpdis6ec5ae8dnef82yfz16ybnsj1q64bjqyt5ma5q72hr4rfbojk3ru5coww7xydkum9yvcrb3urtxssods2qy9txtzwfenshvcl0416p9uqxft1oajvwcv2t9vk1ba9nsh',
                flowComponent: 'pb2lsev09s377e3prnkjzik8d0c8vytjq5wve45o3nl7rf4m9vx4ob2o02nozcc64e9ncvc88oko711w9m6ftb1jv6rpaify52z4cthdm0l0275275d0ibh9hegn4y6rzmu33grzse04z3gwecshqbjvy0oklt8d',
                flowInterfaceName: '1z9csiirbccyt8kfee9refbo1rcjudey7cjudnpvrxmhsrfuwn5b2vx71zl2dsx6ingyhpacrl470eq6vho3bu6vm4ocpyy07eg5spispjhyvtne6bcsvsxj3dasdchgr5q7qy7lopyh835hzy0p1wweocfn4am8',
                flowInterfaceNamespace: '4opcifzhr8aj1g0ii72wwhbl6hz3i8d8qtpkkhm8xewbqjromlcijyu3pdzbtrqgea1uo9p42ed53t9h5d0ftcamxwdp28srslbpstcupu2bi5l201ua8m0ss15agc3h6q2hepaz9u0nq029ihdiylv263gqi3vw',
                parameterGroup: '8gkdm0lo3kair5xxo1iao3hlro8bn9vu9cjavq11dx2fs8cnxgv29ahsczh7abvev2r21r6ftaf01xd402qc06vvm3ietxeqjehvid0vpsc7cph9s5trp889u3lpkzkuvn7jeix3jz749anvaytgtds5fj4iqehrf7gavebjmgomx3q4fpu32s92egrzxm4grq0fg1b3mvpqra1tqp1lc7gjh3hmbig4511j67uemf7rho27ijus3hydihpuuwd',
                name: 't1q4uub3udjrwfpn82ffrj5miehq8zxhqwdsp184zpua74jxpk8i4vi1oqrx6ipijekbk69r0fwpc0kqv09uyub60kemhay58ja849qa3jwndmdjwl4ohobkobvixx46meic4v4bjrls0d2rmcijs2toqu3ua4z3bw8l676hcp0hz4ym1an6ecm86kbfmrj4skxi7mejtx0whfglozrbk7znyvuzj4u1p8jzffsbg7497z4g8q1e7dorb9ba5c4fd2wck9r9w1ce7wmgdjlcz3mxw6gh24nmxzvelp4fes9k6xvlulcpz2ahnp6r5ve5',
                parameterName: '8sq65qg96l92i5jwq8ambq94jab4onnmypbuyl4xv0tojedfuuxm7t9e8fnavqd8rba7gu5l95vwd35haethfotqwww80ipmwqyzyhmuiu5o4689s64tp11xiopdqzir8snp714g8kn5t0yn41a6hn4u9wy2t91sajsh76uvngf4y24sssbrh6m7vwu1jlf9hszyncxg6xqn1udrtcepc82q8zprneqqvv5z9hce9ft8vuoj1yzy6qx5sdlz0nxot57ovqrqiune4m7z1k3ki9uxio5nfj5flbee5uc2h2opq8otnt73wv2cgcazec7a',
                parameterValue: 'eig106mmsh5neipdhzwstoe92sfi4yz2ygw2xwjv70j76rubwtkw7ud2m2t6mmyoow1ggsfb6js25tc6qozpb9ipp5vexiqq80iv9ylppkh95bm2u447rnxy056p1nj1kicr64ncue24vuh36m1j0idrvpgi7uxae11fpdypvuz6gy2t53yrdpzsji6yka7xwg9qztv6o037bko271kmi2rdymqq53dkjyvopay3lfz3lv5pno80fjad0cdgm3xal1otc4vz1bj5y6n6xdali2eyy5ahcpdkrqffxsshn208wit3knjplpky4jwvz5b1yj55l40iindbgcb37rleqeybvertftgyu9x09peym4xp8gluudcoz7xjgadp8j4q7t8jv724mbvpmzwfp6db9ve96kx6ing1t1aqd0s96jmbxvnrzva501u704u7vh0bao3tcppjkx59oc4zjrg8nkekamuw0ayz6iv3jn886wx5id3ja2hm0htad2nri7uzf7w400zh3ca4x52chaquua5z8tgkv6feosm5ser4psbqwrz8kp9isx6chw5exbde2m0hd9lwqlosn83mmstpsw1x3zc3glci8619jr1mcsqooa9ioy2z8tgh1klti2g8oo7bjx2shkgtrlcb4wva5o7lhyuagdh3al85f82dvip1w7jb34dvg3sxwdcxwxj9jvlj7yg5cs7rki8wkezqtsnydttw9jxod58wdog24a9dt6xnd7dua8kzoyoum6movz1yxeuovpu14gwt8pzt22a0ssqhr7uelsnxr92pf0v8ukwhr5yf9tr79shhki45d7q1iqi65me0vnz7nqdwvgnyb9yh7wa0jwi9xm43gn1wgv77zirxazw6313ex327fj4qi2ubaxwfm2955bd5o4se38hgwqrro0edo9wz17ox2sy9j8w8mzkuy6iqrmm4mvnn29x6p3mf1z2kzhuo1ihosf1hpxgol2kfydtjl154tag0zm2r2aao03n33sha',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: '3m68zq0t2sp1ekosb4k1',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 's79e0rls5rue5mwho27fdkvvjnlydioakdjam14rgzuv4m8erc6eed7s0mwu3zfuesn7v4q5zxmm61w0r3cnfp407w86l6bq47vkvj4t71kvantzvi6wh556r1devu1ykz5cml39sgewb2xlyffwppfu4xi1xacx',
                channelComponent: 'iot0jqfzbp3b4bo4wlsjqdeiqjm4zso4nozhcjpbjrn2lntyldsayvf9mbkuxd9oev41m8czuh6k71nq3wsqlj2pdruljjekwd0vbgxh3gd7f5tw013vgxa070ixmy04dxgknsb5a2fkwdvv8v81xcpq1oga4isgg',
                channelName: 'e4dutqc8sl7rs8tn0ajgu97uqgd2wyfnsvqfwmx756sd5lc0v0auc3v8f8o2jb2nfhebiww91fv5seqm0wly0bqg1vmdlwthrxtcpf7tc56e5sca8uzp47elpqy185oyqxm7ngsifyn1vqm2r2xj1yf8hl31bloe',
                flowParty: 'p26ktg7hseh88mzv6fwutukubk66dba0elxczbcdkmojpge5vip54usicdxstjegll2vwjumyl46cg3dlxr2lni8ntkv1asuvg80e3vws74yxy7cupqs3tqbiqactw1lunhprdmdjcw6s7in7b7a7ty3oy8jas46',
                flowComponent: '54t7wxmkqzex866lq7fw7v075ejc4h7xem527c0npnfh9j3hj5vwv0kysaogpyxskjogpgi80an14lx9w4g9v8uzsmvqk5drvgag0pffv1jrle2ig0sio29w3lkx4sexqnbcd1t96osljfyg6jio0421ybssnbaz',
                flowInterfaceName: '2n98m79rftystsdxdz1gbqcmlgi4d0rl6d9fmihatje3kky87ea2vicw4fb7f9868rrredymfue47zy1o6jlr3yda0cx9ey64332rq3yxta5n52133xfkixyxsv70f7q53loj7jkl249rix9a6dt4xvggbs18dhu',
                flowInterfaceNamespace: 'efk9g6mnrrv0q4kma8gwdf16ivy2krriavgogvdlm0ndk80r37tpgeeg9h8mqononj6egkf3qqbyyr88hc71do97kugfi4zkyoweddtsh2t6e1n8ona0pfa5sjx46wv41mr3t2u6ldzkq4qbvd37v3icy043tdmk',
                parameterGroup: 'q7vvn4sb4y6mooj9wshs9wvz0dkks2d86l4ud10lymtzzjz0dg7yidfpe9ksyuv12aro0bk718esfht10rzcj0hxqwjvtzcnukh0bu6miaw3zee2jfz14lruuysps89hglynwgptpbde5nizvra2rv2if3yybdhqa4ajprfo56zqvxdzle5wnofn2e4cox426jt61beyxz7z82bate044prbbx7z6azy5kokotb799a58amzuwput4m8b99md3v',
                name: '9wc2tc3tj5626yp6uszo4uefy4iflbz6fr2vvp158bd7s7u8s0ijxczum4nwcowjgp6iuj5v5bv5v8xg9zfkioncagfnlhiwiyi7mj6477nklpfgay37ecrfznoo1zh209swxbaq9x7j0yvbhsnopjho2xebgyoij3hqcw1yj6ly1eb22gz0tuv5zf7mgyuuwxfg7jc70y5ch0tdp8jd0rdk77fm2el9pu4azprbaskqwt1146z9t9bb0vi71ob1zkgyvs498zxac545xesk0o5qxgqsrwgnoep6pu4tdbiixhkdd4hbh0qo15yytgrw',
                parameterName: 'g1uwxbfqhrpsbgyprqju2bvp94duqigblpfx9lo5nqp1sc36fd5q27yayye4oerhce27l6if7d9av4gtqn9k3zzn4c5k1i5d6euo9g1djz6y0ttpuob9dojicnv0hg9n9rr7l0ra6egdhiwgeysma0pslkcgj54cbsagmv5x7n0jhoxpvds4ukffzlx1mku57s5aqrbs529cendj56ydxpaokxyh8zlkndjtypdlnmkoszn8s3biv26qaigoaig9s0rj76ssfkllyvy4yy8in9qmmonvk5ghccdzo09f34pprmno12lehl9a3g4h901e',
                parameterValue: 's96qnupfbtus6bj78g42nybdzvmfxbvaecchcqryw5az4auig7iibily76qic9pwh2gn8gyolis25sgyyfwspwk5e8iy0u6o6m7bcsqtvcbuoi01eexibn7g43lk3jchb0ocgfkanrzovskg6nezkvzro8td9ontrsicoj9vbltdtlf96o5o9web0kbbm0nify8ostl3l29ydxygmta7620id5r0zl0jdptxosbkodn86y7fbp0bysm98algg7pr09m5vwwa827aqw56h2144wt9k0myn0ta9cddqhbyy6wzpgdu2vdzld3mvc2wqmujq7ifqvmip857skdutw7cegqxcnhqw5n8jc1fis3mh3skcsxt02twxxgajka3ipz317o9bhe39g7o6yrnrrzigda0ronx453u0m5s4j7xckysg7nmob46w63woufrnpgeczypvze5t9w5lyvghnxn2gjnfuet1d79ml1xhuuarrom8z3eo56f9fxw7cli2geexicglirkpftjrxapc8b1z13glwukxnz7tyo14foopd8cijixg3ieo24x4v8iqi91fcqhqfsu0l42j3z3mq0v69i0v8fahmrznv07214xb38n9e2aj534vmvha1rpu30sjywl7ktow5dwn45u5oy6pj44ylnu1ut630knsebikeipj0b1nv5ysk2el57syoozvzag6n6zgde9o1sc0j99n9q2jcv5p6viqcyadgylgzkn865e6kfc0aqp1yhlx4ocu3d5x3a02wb7gmzyl3w8oqe2sgebuf2b9cc95q8qj2kg2cwiovafi9im2xeyap0pta9h7uxg18g6cfaeqp8a3qo8lch42dsqbn5zepliuz2olls79tvxqfa4sie7kztuoxpza4cgpf6l4ilwy9enldf53aclmwqro0crehbgx0371ur4nosw59sao1zklsbambs9rbef99eaccffy4fx9vynfsw40c0p19iwbl9uqqe1mcpw1c7wuov6q6o4fsav',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'q9u3bd8brnkg17mjg6ww',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'dzbd6m1zrkuv4gf7mv4a25hkudl7jivc237huszqh2ix8ixx6sii7obliekvdqnwhbd5twqfbkcw08k4hwpn1tc729dhax2iksjwhbll8w9qy3ydq1k3n1xzjn4pljrqf6r5wkpdxyljhbql33xm7skmk9udjqdd',
                channelComponent: 'z2t3wwits3dz959eq32wj5co39ew3ae6bgrw3yw1m1dgm3d2n0ewzvk5jcvg9afmmsme3f8pw1oykel0ysozmmg59dtc2zcx0n7ef8cemy757quy822enjxnq1y3imaxj69cm5ip6yvj9iwv6riavmrfvcr1s5f1',
                channelName: 'ksna3w42fshxi9gjhezzl46scsjdsxkrml2wha4vy24epen496p2p3wn4v3ybcm0zlq994uiav9w407fkykjgt7758koli1r1lzc38zv8b8ro3a53nsx0mo8gnq5n0nuk13i2j2dyt03mk6cq2jt2bm9d4kk4fbgk',
                flowParty: 'wypsaqbsoomrvy88f10r8zlsebmjay3e9uzsdmy8wpv4dbqqr1tzlvng393oiv30a9bg6gbtnx58uc8k20ij5d1nx4ohsv0kkz0gundvibx2tbj9nobjyg1kjkgxk243ldwieadjpkk9efkuz2gwbue83n0w7gf0',
                flowComponent: 'fl7zuvv8g03wyoay1xbd8lqrm1gswn6fxqxlp7zkna9s0kqyg77h74q1yp2g2yn2b867865pe0c1z9q4b91cxyr2mt9hvcluzabh7ieymbmgph846r5x91rn2wbt9l9nfzo5n1314dyvbbjvn7koskefqlidhs36',
                flowInterfaceName: 's0bltxm1cdse31hfmsdpex0gjhsv2m5g96peqn59mr8ea5ffth7ynkp5x7zg2vbnxwg0l20sgoi8j52wosi22h3n1iah8maqo5fb9dwqayvdqq3yyxch5y1u0w3hhhctnfbafkp4bbi4lmntqdo5u04dof3a10ie',
                flowInterfaceNamespace: '41y1smwi9ncyr3z910u8gfvybzllmfv5mxl13xv9d9c4yhunehte6nhpg8auxleg57cjfcncwzq1gsdpwhvuv9eqhmhqlbbmzfur3tpia2f1zz4acdq2594ygwjkq1nizp7ha42shzxkz1h84rheosfklbye6nqb',
                parameterGroup: 'kblcjhg063jgi0cqc015vgh7q24dy5mgaz5i92amff99rfpf5bnx6axyfk68xy51zs4ehblvwaplhys2u9kaw8n3lb2bpyzqj1m3owh1nnpjtadfcqgf24i4bdnb4zcrt5vhl63ao7ndbbfd5lxgwt5b2s0pdp34logztllgpdkxo3u2ecxzwx6lhq3k5fuo61pzthjtvlv4qq7p5v6j00gcxqu950mvdzrwaioauyiuy5d1vh2f3l19qpb84yd',
                name: 'd57otpvs4istcxfv058d5q951p3l3f45ew6hjzc442lynl50ooxvog6m81nuqplx31fda10fc6o4i5udmcml94fwnth2j06o1t9xwlo6v88o88vz3yyyn65dbjdotn9sls18d2n6xckrmt9kq1niric4c9cmbg51z9qo8e29gdarzgq0o59yju412dgm7yfiu3gjmcctryjlats5d2kb6t69v9ipstl7ryskcenq89wz4qat4xldxc0bv04d3mutxtd6za0penhz2o4qyrmr8se5lmmd7e6f3eqpwez8ol3trt7rtqgbbybnbl1box3f',
                parameterName: 'py0px1mrxra6ya64rvfkzpeqn6yi09fh0i21nhvfx8ucxwwmf5kplwe1rfudo5wzaqkw4vp5tr0plsio023000kbcjv85boak5u5ydb96ri7pus3quci87qta9ohahw7v77h18la9xuqqw42usxxg5g6p5bd9q398e6gert6zujx8b0i82yzkmn4csfslatax5s3l5ksrl3g56zjscq4i4lvlpg809yq04ewid3rtaaqruyfr1g50i9ndenysli5hanxqezpcxmwtsuhjbfaffbigrvcp4klbfiay8smgwgp61lsw0zkorthiptzrzfm',
                parameterValue: 'zdgzee16j4pgd4kkw0n4l45jgt3dfv7r5lgrqlcl3tcs5q1ghxfebhsmnvtf562pftdhnj10bnqok56uxhep0uf4r5bs3c1tqbm3tqwiqqygtpfvq0wargzz8qsgj3tn5sdscfck08jghvqpplks3o4inig0plwh47shbez0hg0j2mg7njtf5h0fgh2go40twipib45nds5ki6vcmd0cuoquhdexyxhopn377wks6g7nmf74087ensuv33r0u67268aw4ot9f95rqaehxt5s7zo0zgypyw2p96c4tik5n4zbj87obmu6vuy1e2c6ysk08dmlzmxprrx38zje57rmntiq5342xcd61uglw4p7hgm7csgkolgf5o5mlumpp859kbrb4vdmd19msx9moyx4wo40yfcc0fv5id8oy8ii8yitfw2l3m2tj5mv4b2q8zsf4tn8lj4q6l4kyftbae90sixog25vgdv73nz94usobceddbkbgg1m6bbnowaq3za2ilc4n7hpm9wky1fiabeyizlvsa4kkbgf4m3wbkrb2xlaowo7180fmeo6mvhizwynjihcnzcambe1evxde3142htjnjlotx97us898m3h9pseou7jdldwnfdsyd3y3lisqhcoanker7o4ndtci5nqvhcof0nxnwankioa4cvk6brt6knq4ui46dbcgi2qp8b2w8bc92zo3ajg2ayjnkd62p221eu808lvbs58n1l4cb0mzbt7qb6qhhts5v7jmvxeuazg7dc40jeiy7ag2pscmhhz867v71493ts2bmcrlylhclc9gpodztmup2ph2tb37pedsxgrk2qg1f457xk7w1ihn2ow9miqzosptousbth6k8kkkqxn9efsivyern9sol9onphv08oiv4k6jgjp0eue9gjkhtbtpr39klxc2wa6e5fuign9ccmdu7ikvx1lvdp2phxhoq1u7uwtzozswsfcn8orzdr3mha47ow4u1kzajk8yek5u6d0sa2wtzci',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'ku2mto6i0me2ljp4xqrw',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'zo65oay47lxbicr1rdcihocyan2qqgu6spxv64x5qw3fajxk257wsjrdg2geyt9nf8psoef0l28ojrptpcrftl4xg8gqzq6fbmznp8emprfrxfeoa8u326ou2l5w5ahbc8oeo6u4f1opd2c9x3wolpdj4xuvse8a',
                channelComponent: 'j0rfmr6so19nwg6fsv0whhe1qnwsv6l24qin1t2dvap7fcvcivdwovjbgp3txr6425v56qrbon05rm3m24761l2ya9qzqlvci2px5tyl40b1kgktp2zgi8s9m5qjuc428ftifandwe2vwqmwrhi2pdm3zpmxz8pp',
                channelName: '01v8iiqfcqlppjq9xgw30007ao11xuoiv7qpkt7mxf4k0ksirl4xvdhmwhwxxcdcd1dn26rbjq1gmmi4iwn6c40g48xf2ajg0yw0yiwqt285frv7h3ziojqo6jy8pondt6ihoi4ak2i1e6urit81d6knlutr0sok',
                flowParty: 'c58xs0nhqawflsy0g36xmx0zom0wwujrlvmo9itxixbpf8y77si35gytxv94q2zsqg2t67z4vnpendncco866x0dwf1qmou3j08cav95bv4ivq1umu2jsgj676s10rsyhu9rk2gq8t9kkpla782e12g4mo587dxc2',
                flowComponent: 'taeoybr2cb2qbb7l9e13v9pk371a06i1hk1hbjxun834oetqguhbm6vbuw239a2x3mvnd61bolbe3xxa4alujsrvqvkdm0phi42773n6bhoyopjxi25s41wvcwrknlkc5uwa6kabks5fxlxy987y8so4qz5ubc3x',
                flowInterfaceName: '6bf0yr08n7fce3ftocbv3l9ck726gsx660tqyp0h3bcnpg1p4rc0a7ctr8q7l9cpmvnb0d9nfohl108urf8gg9gfrth5h39ffpm8kyj8kgsb4bl1r41xwvdw6ft09i2qj0yh6of8sr0jnkikt9k5e124fdvcm4n9',
                flowInterfaceNamespace: '14il7kwo2v27a2vjno218d2c3g8kyavt9r09tos9u27xd3k9t9rpjfxrkprcj2ecl8a50j48ezwsnzwegqb2tyuqwf6dsjjaaa0bsphxxbdjy1jpv2kxeptunykfvf80k4cbgvvk9sjuosft7aj03b0rinrz2yug',
                parameterGroup: 'q1kr76mxvl0wqea3cybop0482if6hnib0a5zdyzdtejrtycjd8fxvowmoglmyyp2jezc71wn3kxx5fuv4766ctj3bhi5m7k0img4d3xe61jfyqsm6go6dzo9qyzo3xnrgkw8c4o2fo4mg7v415osp4vhxkqjgi5sppme67xe3h8450w776rgyzveiox0f7ezvtfw15ozugmbbfnzlgmxexyz93mlfm8jdyfmardjrlfwqv9noyh3n0fzm9gqc88',
                name: 'td6a2u147rx65rrgvdzv7tx0ufsenorzf7y4huhjyc81tgxhz75bqge93lnvjua1k9k83flah2xr55jqzv6x2htvjk47q62c820dn8djui83v98ywwkro5hnk3ihjuxx46jlufktyitlyhoo3remwjym0jhlyvkp8v3p05qshztgoatx0e0ipx00ls1jdlypdqf2of6ke328e9m7zd0m5pd21scz2fny4tkbl3iks1m4nxpbsqqrm0lw4qkrl8mk92rm88pmd7ucmn2q2io3awberz48uie4bx3mpv4k5j20p504zpu4v96fpcnpz0vb',
                parameterName: 'if4u43qte5jdc052f1moh4gwnrzugv8779xvt4g286rn4rij5ngmy6lzdxhlfgh3c0afzw550tk0qvarnqvpk6zr9zoq3dkkh7glgat3s2eq6wu4nb7lzltuznlq0veoha615bopuqz4m5xl1b2is8mb9nlyzannniewty9tiof9zwavrqat7d0ub727d8wx1lvsthxbu2qijwjpg298ijrcrjb0x9qx4w61rbh06yaia8fa1gpcn252hhkk78povsne7wk81mfv62q5pgc515s6p6ehh8xp7a12p3461jshd8ylerc77eqrxxrrdiei',
                parameterValue: 'dpobajb6kr6mqd98rtw1ow50h3kioqda0sw8e2x5boc1vrdokwr96sliult8ysnf026tjgm7pnjbizb6tga21xx8lz3dwb7bb4k6qf341dy5hp2plirvzrtqh82h1uiu6ze8w46l1yiy9segzcgkwa259ktubbka7bbc1v8pl04nfqah2yr2w6jad0vathrc60tscqhs74n7g08x75ea0n07o0giojzuel99pyw54drtjaphj54g5ie2xzxwdg2fkn787gdusgg4g7cn0gu215lo7w074aawltep569b176eci71ah6yh5wehta3rat74wrmuish4da7ou4zouw3zhw0up4aek1i1wj8yp8ad3oi3zmm5krz5ytm4vepfy4maijkacm9p93yfr40rvkhgvfo4yt9nbbg0epgty9a2ioa3loeqemzzrxobxw2g3qx61rnd2fvo7pz7qvpbdn9p26qepk2a017lwis0n22b7vc0nhqgikm12432x5jfj3190j3s6xw7wce7ynl71lapgss5su3d04r6tdk6mogocw80zpwj2ivgy2p0s9i8eqrv8mm3ajnxwsoxuvpbp8t6ac25klj5o2iw91lf53mmzp7iip9vd3ok412ewwcwqe6ft6qtpkgv9eyqfdkt1ogd7czrgxvk411qv8dcwi8lpxjqu0hfmfs910r75je9pjkj7r7b871l0m8i1x1bw477kif0fmfl4w5t4dvhlly51dqujqjgm20zizzh8uhv8v700cesrw1yamdhlvy6nz4qd66mzbev3tvt3ggh3ag0v1z7djcho4syocneiftdr1qvwbtg0pvf63y1vy3hh4ww3rwceuqaztokirwyrwivxgelcdmp6as1dvu11p1jy21gk6iqiwqsdbez1sm672yfxfst8z5tccgjnqpdcfda9yhdsbeqwy4d7ncaeqa9zvdi2l0gbjn7jdfknshykescev0v3x8tqfhor5yevkp616fr5th0mnvyn5mqz8kuv9i',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'vkn86r781v2fuog8n37q',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: '8h0qrqovzuvpvz3d6uxfvxtyr3uvwjre9y4bg62o6ete8yhk0q63o4ypt2c5vg2l3y2rrr9h6v9rnfmwgqzzuatw2o2dwbnz7uuouqpl1cyfvjlqrgiawl858p1t680cehqcfnui6xsxsbze8gckhuyi6vrjnnh1',
                channelComponent: 'unxmmejsdtzby7609ioq50f4lrqu0fdq80xy79avcn22u0st3zwsn6ydz3dowuwnktj2bo7o4d22l15z555nipofwunytslex3b6xwrd0dqd6a486msv7ncwgl2fcljjwrbx7b0819vqaxgx3i1fkdeddy7e1wfo',
                channelName: '4ubasglea1qke41juojb2otz45i1rf500nmen4jlhfwtv1r1y6sfekmjn3b42qg7t9uqbh8nvy6o2p44oqi4cgnnybgjgoebaashzs427ghf4th7uj6m9zoyvzx23121brz1sutde8gqnktcmrz6kf00cwkon2dr',
                flowParty: '9i2czac81qci7yw8cf3pyvi0ccayxy28gzrruy8j9ds26mn1ulb2pjr30ywh3csz9qzzo5ww04hxhxuxtpcdntot910tliiukg5819n3b80qm21737rj6vb3u1bwb7k6681mzq2taoyo5oz52zr4a3t915akoyyq',
                flowComponent: 'ihy7r20bout0ij6rzicvb4bqhfk44s2snx8sp259xx2z2g31rluq9gu4g7fnvdgoptl9mk45jbxeedz8mtsqk2yf0llrop2sf5ode62ufpplo0w65djjz2qzmdle2az4apvo5r0815ataokwyor5l8liw0litisap',
                flowInterfaceName: 'qms42xa2uo2x8162smz5dygc2610q9qls26r7ngnggt6woe5di8vpq8wu28gaky2ix4aq8fkfzgv5c8x4c135gvuedqmgf02qr7uza0u3xin5vrkzb8ayxfcx7mo3nik4ombwut3j062aby611qhzi3l1axbbgrs',
                flowInterfaceNamespace: 'yymsl5lyype35zx2wddn81ltzvcd4r2nbgw7u9l1e33fo289f5hbwoy6nmr6gnr63psellv395rq280s0ifrpvm2tb6pkk5ohszcs6tqn6yboa196ll18l3ocv44t2arkesu3j28ak4pvjj1w0ex2zkeymlgzfx4',
                parameterGroup: 'pkm90rs6xij942ul81gh8byqahvs4xoa561i19qer0v1io9h1frlta8fo0yu23n5o1nhm6xgct117rxgq1alavdxxym9pq4tt7ymak4slokiumrzmlrdx8hlb6wqr9fxokxdn8p1tyo88klksfz4dzcgbdc9whr9mu30q7571i7sjqdh225met30cs3e0adiw2seh03ale8n8waeaw70d8g2o4hn2bvera1bm9v0s7cvz3sqw0sg79g28mn0vol',
                name: 'veairscgkb37pp9bthi8gux8qzwo87lhbtqxh1laoo0ad0z9kgz1kqqet8zcg8bp1oto6oyrx04s3d3o9si7wv7skp7rfwvtyct6aw4kowvgm5k6if7p9slb95a6wqjoctkkitm9fsvpya66s8wse1deoxtuuqe4ru9o861jpb6taf053jjjfj0uus5v82gtbrjqk42g42fucjyq7bv8fyx157d8gu74bn3zsq7196n6ref1a0yrkub0bah9cc7k8dodvejcmviia485l7xadens4f4mkaio2jv2irhls85pwwt3ndc8hvd8fhnlxbur',
                parameterName: 'cniqvzkr3isk5wf0dnagydwfjp3yx5o5ndt1okpau4v83nhyzyfd2ynvlo4y8q3e94ciuljt6a3v9boda1z1k3hnisaunsalxou0tmi0p6833twff7b1domohl6uxo4cghms5u7l90nmpz3g3lf45swgxs21jh9x92dzxhq86ocso06krhdwraietv0lfpru1005ra1ylnzuv2hmq5nwat69mchh9mmhv9objp1yse3a76uepd72fj0mfdhwgqpp8fenlkzp4n37gqtljc7gdbr9mk4o9w9rwrfncqqnvrvdk3mz8gijdl4ul14cll5b',
                parameterValue: 'iuy7p9oy0abmsvsqsrwnpbcj68nyeqpbuw9qpq53xaez5q6pzal8lgd78wrb94r8ysf6iid96kmuh2l5iap2npa5nsjuxur0jkz7zjif97yxya165ex4jqe06dhhz8q4t7ywc82jh94dqiuxj9lrq1iwnp3haf61dgsxpt9btlmqfaf3bs34sle3750q0y1uuu11wyd66ge7eea5u88un52ztfpj7p3arrkvd8rlh48aar42dwz2glad4x9lt5b8na35w3ffe907zh6i39mf7sswqs35fev3xscnlj7tcusjgf6k9pjufiylx8sfldp91oinq19d0stun276tnzpmujwy7pr3jbd7vgscln9y1vlhdqwbjsbcnavxjxughxzboepoqacrxp7cz51cnts6wnij9vuf7fo0o1slrt5byho80uj78mkmbfx9zn2m2cuakxljxed2xcftme1k01igcy40nzim9fp25m6javveqocmmfjx51pckm1yd2mi64k48clm9tflp1gncjigqzzuix460s3gge0y1fdmykkl5dy6yg1ydnjugazzarijrct7ihn5v73h7lbqp1ua4q4fxb14rniip7eh5c995arvfd30femjdo5escv5fowzb02qf0cj0x3icuozpaw646cd9wwg74p18y4izqb7qcxp8wq1bf5c7na11m60ybb53j8j0prz4ua4i8wl88lak2h5r6n76forzqj7njrxv4c3ocebv44efvtxqxow0qxsaxff75vdkut9tp2gnwdya3zese7qsizbj8l295d1l7gdnh2s355hu0hig6sgqb8pga2wyega1demzbot2nv0sptuzb3que5x2c45dmkykukzpyu3thq0rbetb109d8t4vgr9uym81m53q6lbn5grofu3fq9wv97yi1smsb4yun6kn7tos2tjpks3op34g7us1mvbktrndazlnshhv8gr83d5lto45it6tb1tpx1tc9d8x3n63ml8m38ff33wqpy2ps6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'ni53r9ch5ss6kp24zsft',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: '48cd7adoa4div41btma1a478tcbgcmfmvcmlu4clb6wujp1vl06srpkfl493z8f50971ah2amw7mgz0h79su9xipfnk3jsgp4n6p6p6d27goienjzt4rzfw1q17r9vzma9mwc3qq2c7fqe7hpxrspwd3h3y9ipg1',
                channelComponent: 'fd19pwnfwpx5ifpyuew7o96hji7392cnspbv9vg294qxv9ij255oqujhyz6l07zeteovgv7kw3nyvoq82sc7otkwi8ve39p1yvijivr407c6208004an7dwclk8boqgin5x5vsabub37us1kafjh11ifyilasibs',
                channelName: 'pof3afobfzbeltjjgwtclv6owf2jdkskw3pfozk1794dfkfb7wducgo6ulny6xpemw3ahhs9dgf7903e6ne5z4vnob0a6itvpq6lrnzgtv8gj89nk58d4w4b6jc6cgx2wfkj4lon5hq1z5ry6prp46idt56ls9s4',
                flowParty: 'sut9nj3kmo78cl92ama17tzj1sqm7nexbb5awd0s8l9o8yd5aptv71b5j39bbwzoneh4oysw55l1s6u8i094akbxqfakag1wejp7cg1qe3mky999ki3llfctmqn6qn2imkl8x7lcu16h1j072aj7369x8zcv4xnf',
                flowComponent: 'sdloxzw2lnengf9idnt9gdnaxtelbafprgvpmskjh3ucnyhy3nfqsjx7v1prndmubgd8lxy2xtj6sdlv41e8va7xhwx0wim2o1a0qmqdwkq7shvs3sk5ov5ceiq9i263g2bh3q4yr4k2gau9tk2j6uvjrb39ktk4',
                flowInterfaceName: 'g22czsdwypq0jjpnyvx75rcfws9z5wib0au828r6em8r85rx0t3co7p3u9y0dse74t1gdldidift1qvzsspw413yyxiu5mj0kn4cvmctylszufz6tom2ugh66vy8ogsvr9t15eq3ni9nlkwbh3sb9378g8txj9maf',
                flowInterfaceNamespace: 'tzsp4u0o7qwczzdgcbmcwp384fhx5qr7662dhhzezr08laxozk09dy0hgsfratfepb2lv85a9ozd8uwcsscy75qmfslvazqwcsznrs451h95kk1zvs8bdsn1qgani0sj30gy9a6e5d7ts9g6hts7ka85omc8vxn3',
                parameterGroup: '8m25d192f9y1f35ax534hh7tvkfbg3zbn1gqmk9eg1js11tvlzyr7zpk1pu7f4tbzcrero2jzb8ig34mec0o0ro1s4v1dzb9x8ep6n5ylpm0fwdg02ulnobv1b7iq8yff4h3b2j2rolzfdr9iigvmq3zjl7dlkop1ykzqi13tbgyv1uhkjakbwlsg5aa0nxpshigy7v4d8ztmvnpkw3isnsz4fmkyynnpc0n93ma8umud2kbsy8x4hf9z5uaz67',
                name: 'inv04ic69vq6xehpcnzi6v651jl05xvnvfhz3a3oijw5jueqnxjyy33lqsi1l5yhdxgnenqqthkvkn9w1733cpd9fpg5rzf73s4uesxz6r8gewg9atd10fiu6yley125mmzqw49tanww75uljxf4ntx1n8thn54rh48u1iamfv7tsb7n85hmj0zl0o5xtu0j5712ajzi3iswsmmxagjhpen8klitcwk53u8xizv89cqvhhrknl20ny0zsg5lbylzpxixc2c12k7mn22wr6rnqabdp2fpk1cnvnrj2qeit3qo8q7zseochhwckcdstmqj',
                parameterName: 'x1cre944euo4fdz6shkw604ipbxaaxt5oialidhufbao76se3iwvajv8mfc9kkkco5rgrp3pzh39c6yi3akguplz5aainenodou7uvsfx1g5h36c85xy0ogjnb6tgmf0md946up5rff7g9ua7wbpetfdpivmkmq3m9vwdtwdjgpubfkvc17ci56gilrykvaki2ysxon323lrt9ljbgah4diimnhoi9g52vh1nf3mal4oe62c6flngzbk78ud3doct1fbcs4xzq6bdu08tew4eroyu61ssmlsl1rke5m88sbs2a9ii4m7ai93oo0xmzj2',
                parameterValue: 'zq6snld6nmir6xyhbr11jhjwdpp9gprge08c2sznc9hgabwfro0cwn694hwwezng5y6nt03kyf2b89pi9pi4e4m7ms92bz63pl03tj87wzgpnb171kx2ryvf3juwsky721gqy91bsmwk91b008oub14wsn8eqk85596lwgfrla3rrtv3yxu3ultnh3otx5m34vfk6lk4lvzil2ie0sptcxxz6q0h12pzwr060aw5zm4ipyrlyb45h0auwumx7v4xx4wxnd2jn2odwjcjlgeprofbytaogmlgmbpsbg2t77pz7na5eukvh0zcoc13jj0j2y1i6n72ed1c3x9lrah9o0e93l3qk7da0y7acaeu7j3me06897dsu4jpy7dz9ecvsiek4mjo62mh4usoi6x1bwstpsgzuug6tsu69fk9g774h7d85tnaa6u8dfqu0q9s8av07v3mt67uc4igeown7zkpij7cfzwp1fqlimrjo0kreluaae97xq6rvnj8g7gamdle2os27m1h6933zo2fbhbertzet0zvkrltghhifkrstattybjh6bu8e1qwl8vdf6du9vsseph4gq2hc27qr3s9c0buy0qjcm8d392uj2r4ik70f0z9de57nokro2s40zek6old7084jq3wrmd5wnrtstoimq25qazruhgl6vfdsg23ttgwvchsnu92l7o9wyf034ryccicbe2sconr0mxrd8k8rvqdq3kk2svon32emjpbs5ocucdp5d6ms24aub3pesbxt5ubjb9co2bkug7tqwnrepsyhldnzwmnhce1uyhl99kp7cgh0utjr5fzh3iqd2bulkabw5y9cgfcfd88kxgax1pezzeh472subc051cbmgkza185jrf1kq2exccqrfehhoexg85n254qeqp5s8ct5xcykyzvwh1zydakc2m2xqebckk9i50ypzbzuocwk2o06qld2q3a4mirgqdiesr6xh4wqru6klse8617bl51ewd01y7uzbcv4al0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'z4k0r1upsennrf626t0s',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 't76kuzu114y52xp6464m5133meex4x5qo7yyoserzugtidtpyxi0g5hdj1kg5z1bkih9gbmf2xixudtyqqd39hsnwv5smm1c8qhehpdyoqht9d6vojeugunwcusuz248cm7zuz0ih623raif9w4ppgvaliaji6zs',
                channelComponent: 'y8qkqaet3kyuwdx1ux2glbz52a7o92z2gcb37z9dxjqdpn3tqot9f1mvun4ufd318kj0jkxp3xmanu3erhaa190tbh8hh5l91zm97j3sn2fb9pyqlt84aq1ayuqhpoer31apmxtq5ww5jnypms89wufumtjwmoaa',
                channelName: '5qbkweri8s3ycizz153yacmz6cklp2litrhrwo95nj09dmqmvjfz6lpac2v699s6dw4p528p5wygputllyr5y8reqc2208lgfx30zavzn5fs6dgilw6uygr9ahyurvif4wnndmj3fseo5rws49n6lb2g92nhlapv',
                flowParty: 'pspab1uh130tkkd665ri4kxv48r0zf3t7hmdygnlqaclvwd3xpv8t74e0wvb2ls5ittyj430y7bcdc618nmil1kdw87bcj9utus1vagl6k0ckvfcodtwiavf6c2dcaaxax2q9i8gq2ja7dribbi1cltdwe51090t',
                flowComponent: 'i5ifa8j3aw1ivc6dn4mqjdhoxy5x8ctngwvs2v8xzf7is0dunp1rim3594ixii1284r57xmli70d08r3i6uxmqznqxiemqq7r8lnoff53q8op7eypyo26kz84wh1dsfybotdvqlu02cqqqfevjxd45tomtvys8k3',
                flowInterfaceName: 'qo5fng7bmesvdcidfblnmtszfj781vy0u4a1hw74coi0sce9g3gv0gad4rnv178bxcyttchgyuby1e3s7qses2tm0lp6tmjs23zowc33eh0mul17b2i01nvh8m2raex84f6uqcmqoh9saf6nr6e6pesq9l5biu0r',
                flowInterfaceNamespace: 'jvzyhjv36y4k1q074eoqibvkcyj5ht3q28ql0y065evw2pvli8x2q071nmkuczzrybidiwu04lnfikudzkbg74h4soyoyo4w11vlbglwttzw1axkbs0e7i7lw6prikeyw7z1e2brziln2d7mh74spu6p7d6l3c8ps',
                parameterGroup: 'f2zec19ohyx0yxozaff1dr7fsyl7gmync6xavuzjsbjni7l9w4u39dcejkdn5nfabj93smhrfk6or44m95vqd8kkjx5cy2u2yco6ynsgpowa1u8kj6qt5yb2opr51ense6dp9as0nig4szwp6b6tnjlo3hb78390m40fbd4alk3bgr4p77tkbeb9nvwh37ksukd4jnktaxvvet2ois7o31pyijrmuz5gbib0sobz9uq57dtl8p1zgg8i48zltqd',
                name: 'pvu463kdrpi9v9tqpaifavylyqeu27yi0bx4b9j0nrbxb4t0qnq4u36529im4na5j7lpszpsko57j0lsjwghuqaet9it077zw2d5d5bob9s4a4dmymhdwdgwm2z71m65fcsb0g2ryw2cxwuw2vw9futivf0fsd1fp3hm36apqrj7efu1n3f383b5zfzrc4i0a84u5b8ln9g88qc9y3exy9enmi30pid8hzt435x9qefqve8wzmwamc3622mvckkg42ut0o0ed8hlnzhqsqnecrqin041510zka0yq879jyttyiy4yh0okupc0kvocw1i',
                parameterName: '5k6uv04dfgswjisuxmupw621wq5nxbyyxsav7pdkpk1jo9hajrr1umhfolx9to9l9ig6zjnyhrdc7bqhv0ocv3jrcy42qj5ucxeb9fed1siqgiqzbk49f7wac7z1psr8glq1fu8c09thc2fzl9fpmmzphova9248hxrdmef1sfwzhnbka0hw71w1pbogjfuqzmbpjjnljdaseo0c909hdf35v11isicospz64giva9cqxt3bsg7mdkk6e4dhzvoks57fxob9ztnv9d25ag6t715c6dcumt01cwp5o5ithhy9wpimp78z4koylqsrfetj',
                parameterValue: 'vhbk3r0amox0cyl37aslsqjte0zin8q2wp0hrfmd1106nlz4q2sqqlcegpny308g9214iw8a92h061zafphwzk0rf8d2c5p2wsy5g6di8srb921ys2scqdpb0xaxt0ucnxu0zr43w8cam7jibiuv6y5grbeoj5hxwrc4j4eq0rt6833bifs0zj4x4gv51rlgb3k88as6d2lqrdrn76l8wkwihytsla6zxa0t01rqag2qodeav7a74it17g9vlhkvplr2cvvq7zpjpor9nf9a83johgmjvzyyf9kqrv8lun31w09ow6d1f7phr2ypvpdkfbj26z96lgjaf4hvp2vpo7cgz2dawth3ziqlofi0va599splxxpa8r48v75bkqdc0xr3x3z4u8goptw40h2q2kxbnw56gotsqzbq7pcn0kp5w0x6k5tqbwnm51owwx7uwkirs1ozayz2jrr8zif7vrvkh8fie16jyxusail62agoxogchp8nrsntiw95f3r6nypjnzz0ac56zf1sfk2rxr6r3j98veoed7tvk5gar61h200d17acexbnidyckdn822i3t2j0g3mwebw34is986fjx56sj7o17lf76um0atksz4smscovlrtmlm8p7osws3iamzps1kmtdc67ona3yb1t5r2l3aksf4odl9ssh75tf7ninmvri48ibpj1lshm9vxn1estnx67wnay6iacxbuk3tuurl2jy5iuatyvk7z9lxb7h0wieny1n4fdc1kxt66srnk092n1mlas5k323aia5h3cu235zbzj1b85aibvlahe57xc09cle9xxox39o860bdzhkp315qizl52s2enf9ug845i07dpppcsdvi39c578o2dk32aggudz0a9yvwndbrfktfzjwghv64y9jdavome2dsjszjdstv59o2gzfxbo9j1l12uhrrmwqjetjhj2y0pnjxa98russ596w6gxeo59yzvjrstlxfmqfkukgszmlvwqt7yoejhz6179',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: '7wo8k2ckjq6pxlp1i1ty',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: '496zjlb1q6un80y3t7bh9cvsttuazqtyihlrfxdwdn58dcve137avjxja5dk4olyeszd5meb5kfify19ywj90r6xclgov0rku3elty1iopolbiupxy7378r4vakh1cr1r5jodbs9mrt4rt3i4zxx43tij1k6snmw',
                channelComponent: 'o0i11yeln538d3z5fpbzk0846ifxu3hocyr537rjjup8lzzdacfcf8juf2yk4b11c07gyitlc5sofqtpm0vsyzqhoycaj6g5h9b8aty5xs8mfsl3lde6hjqkmzbyu0hmgttlsbwoxu0hpvpxzyk3eol52xk1lgru',
                channelName: 'qwfbke2j6szvaxuvn9zf3w6x8zaf0pthvss39euzahzlpgukygm4prrhfhg5z78bo8jg5ai85w1cod3bfkftu7jvmj4kd4n5xb3ufk0epqp4xoeecn7qtxb53hvvyxs9i89f4m7bpvs4z1usuek7j6ao472q6uex',
                flowParty: 'ly3yi9xqttf39s3h3s4bell97o5h94uxwc5ymkuwmdly7nqal8eb0lqmk8u6ilo4sj6gi7efbca9fkdk4n6rgsl0ofp68zsvq3f6ffyteybsbf2tr7ge0h8jp4d2a9s80553ckjx8fxd5wsgu9aft7b87geawv4k',
                flowComponent: 'hy4g4otg74g5g7xz1d0l6optz4b71zxreo0c7281pg6n0m7hsf4vhekz01o5nl9dn4jxcaw4yel9jgj19idzwvrxa71lutmg5mkjcaaopno95oz61eiz5a518h1qqlhmk344g2mchufqgdi9m3mwtjahatfto67d',
                flowInterfaceName: 'lkpxo0me08dgstk0ryi1xj8z80tgn5tb63eooh2k43ivofn327xry93rfo2zdf5d1yipogjss2az3ugw3ssk3zorjmtgwm6nqei27xdn1o45r10ow46fvecvm8n9vo2akkl12enulx4piwuvh0x4r4i3f4rpsgge',
                flowInterfaceNamespace: 'sil4sj1xg7qtmx9xrr2ghe6cjx4l8d258zw9juit1h4xxbzewt14un2ov3nf03xk5npduhqi3kna8kcg7ewvoai7wzw9rtlof7qej7bdu649xbeqazciumm28ubejw3zj0d9fm6x30o8bxpfzluhvcp18x8tie9s',
                parameterGroup: 'wzya88hq9vmvfr5z85rljpr6qvtdttx5cmbuf2pkqqq1edkopj2dnvrh4249y9h4ysd5lrbivfrgggmzxfaozjh9ye911lqgt8ltxayqfn8lkblm3g64edojzi47c6nadr2wwu83rra0ljvf6xaoeoywekbjxub43jdvkxkcd706kl4h1mfbjwcrqvseu7gbrl1yvr8lpt1cayoftat4c46im6o9seq1vjqdngmn50gpxrcljwju6k61un8py2qw',
                name: 'ic8nhw7pgrtzlhd8p68i6wa3mxzjd9oo07io40k8k8tczxmrdadpoohqb2pch4fl14gz5kina64vbri3vlnnaki9nzvdipd51t026jbkp8m4wszbahejhcbmavxu009hxvdu6zmr54lviomo8179aal29x9qq0101ch0dzmhvh2qfv2y6ppaln5vu9kidsk58wxyekk7i0wdavvskge2z35t4108k8e20618698ypqdziq3e7wsc6fnotbatp7a9wkf44lkbehpnb1d7nxh7py9990ddsjxnuqskb2qf29q6bbhmf9twuumscgnq1p5k',
                parameterName: 'cjuj77z46sjihoffyh0q2gd4oe1zi14ku7xpi77jje0ldzlz6qcd1wasv9kejclfvcthe2vq1el3tczfcoislivu1x1qku3813s2elavd4ty2o28zeryqflkk3de97wssi1w8rj6hwp0v0fqq98y96jm9mtdqe14x8xxiupbh21bn2ug6gav0vf5jry7j77a0slaomasp6fuprf0i4wsiqm7krww0jlqbrcwk2is64x8akh1zy1dmjm7uucefodksm7u7bq0s4te3kurezvtxkh5trm2annvzu8c8iqnpuiec6p74mb296lyul2m8fm8',
                parameterValue: 'jc4hms1wq44hdvvjjj3hnc9qv16hsgcl1p2oygev4lxqqdgl5axclpyeh5uda7oyucvgrah755hhgjm55wbthqbfkqq751ayo5ij7iv9wcrwmmznjnkckg2oa2xjf7qpetg9htn81yheq4se1rk58kn4rp7ky7n8qsgix2vba4yk6eba1ape9kbvdvgnfm67y46u7c240lfr7ragt0p2txp6xfh7e2sexl58ddfcbgpccihh8zngf0rgz4uyweq0bxu7mc2enas1x91s7hkz3aw3pehrvvhy3450yji6dadvpvrwu8d5z48p77q6jjq940ylts90yqgjuuzetybapfpftz5fej3gss4xsfh3kkx74j3sr6kfutnusly51d2uooja4njoseh6uzcxq43s7s4fo5lqb49z7illtp1y54nhb9chsh2dx368ynyffqil88k03ik00h1x3o8do9njyie4qiinjzp8w13fjrn87v8kd1zptjqm70hpkz2kkpgcibb44cbd28pnsem3vqoy020w45mq4z6nstqb7q78o7k6yjirx36xgb2hnxsiawbcabkhi06vpkki9wcpzvysn7vk1e9g6ujwzbgvmilgrjzo6e95rpbgmdmfzrrhjouxoj75hyhnzu6nukiffsywsfhbeow4jjixfrt4q7ofjgalslo7uwvx1evo6azszvxo3n5cg63mhe31yi21mb90lljqwydxgz71429gxvo17ngnto9jmv2ei6qzumoezgostiiwhyiq380j4flfpdr4ltkoid0somvh7bbh68kbmb543h3ba4yug80t8gr8v9vma8hbwspxewraq5n61xswaop8s93meqdn8tt0n4dccubikwkfqx0h2mctcik0g7ag5r6yt6f1nni8vymiawo6vs2mi9relt8aml5ftd25sunbqkpqgauota0lo3mkmjdrtbslkg97f680xex0z0ql8wtvosagr2y8ftn3203x155xqwku2t6dsoe73ufbmnwn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterGroup is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'wc1519tcts1razydi2m2',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'imtvqsrgsck7no9xv3l78z206m9i5fb3is1nak1ck1co8ozvn4phcx8bf3ha8y40chif3v99cnrpyrm1r77icl40omp0ss6di2aymsprs7ic1jmgl9xdaouuvyjrnrevpob974vwfqkcms4aoqy8m28p8u723prl',
                channelComponent: 'p104030sae0x474oebviiudj8ukbv0y823eys3mdy5okdlpvzo5k3w5nsffs5yx5vmckeejn9iy62qg9yw81mw7xxbk7yqgu4fic7bt43c83fw0wacofecwo5g89ptow02bzx28cwoxpzvotqf82dd1xy0sazosd',
                channelName: 'sdnq7ewkg29208so3juy6o5q73j19xsek0rsv5q5m69o41mukq29kue5efdxg37k8gsv3dusqlokjhvjefg8dcdoosq75ixdhd56j4voqctk375j5z7x6jhb7o4yx6ay9iui5kfk5oem14yfoercwznaayrno6l5',
                flowParty: 'h13cf9fi6llx5nvip3rai10474uun450hsh303kowwuth78prqxr3dhs2lgczmzo2yykyixmixr3cbtk92zwgzvcp2ynbzs55qrmivh9amjjzgql9iy8wxid06iyttfwan6svjiotaj0zte6yzcimqwc6spfg0hl',
                flowComponent: 'hywkrvj50cbs9fgh0ki4v0yvg2ardm709mkt7xssdzn3r3ffe7glmmy744ipw2867f9ud4ezfvwvr3lj189lhoc2ns4zhng9wbbtncgm9nswgcfaljt3dsalsd3sj3ym4wkfo0c9hz04nm29pwmnkcirfo699cjl',
                flowInterfaceName: 'ofvy0f9s8gy9rr1ynauiowlahjfm2rsf962za8ucbf51zqg68hpbhnhzzom92rip6aa2rxduki117pdseogr1ykxp5hh6u92kcvyiivmo0zohyv38dqfem254wzuuu0sswruwkvb8rzk0wehlb57nqxv42ni5lfi',
                flowInterfaceNamespace: 'h5cf9w0yzc560cbn3k0qzqc30ke3rn5j4gdex54vk0406dnylphygkfb9h2mlzs8uppkt02gbin1koa4l20985blzxzywawmoopcg2fzrrd80opicnl5fqvperl3845iketkct84m78qcjxv4tmn6x46min35i53',
                parameterGroup: 'p5iqxpw9lv5cu9ygrmmvhq3ld2t8gubtbpcg0r3x5ws7iguldk3330espmla8upekqinibah33z4q2bcysmb6tw1dpo2txdb33flhq57cze06iy8a2vswewylreo72bp76eienl6jwhy6miwhqjw58eoy52wbslhihcflnzai0yfgif01969bnwe9diguq6z6c5appr1pub6uvtne071tkw2ssyb1890ttgiljvoi075oatbr29cu9t4xa350ff',
                name: '7jakh7shv6pq086r3id3czcjc4phxwpeceh2iaar3u88pnz5jx7ijwtk2nygbs3x52hqf237n4shmy6745wd7hzp1nx606ezy7vrpbplylztm1ay589ser2pyfhozvpxd73hd8kfi4pfv42537fqe8a3di9rn6f98h96i626q4psgio0nnisujkd8zso1nksgd7krnal8461kvj4nvc5pdhtbmgzrg1xhfu9zqz49ce1n5vyh75wtspvoei7o8netuxwvrq3drcwslhkx81sl75d6zxeyprrsi2pxedjr3f864gu6hn8otr6x1l4hqp08',
                parameterName: '14qmchubg573qdu6nqh8uwcinsdz57wjfomv84altf8te1umq4zrimf7cqfgakytpc306luz6oslhca3gvf8xf5iytpksvy3urwi6lvthss9kaqekg3h92sg5l5xqwu75ukf1po9jv1u0ovh5k6gusxeq8tbg0p52180qr12kz31auex68ftk3gl79gx4mp6jq7oiv3k0g4uubasbf2wedlxtxlkvs69h6bahcvl400gx9e8e2zfztafvzwvx3rxy0z101btdjan41yb3lol1udljw9qoqx86of9c7uvp4a4etjxoj3x8lbb57qesxr8',
                parameterValue: 'x2tqoyleachbiqghh1app1byb2uvqrsnxgi3b3yinf0t8m5yd62fe13fpgmmipd8i5d11pbs8qanb1qvc5eaf5uq6zq4zjg2pcagrv5tj3dqd1p7ucvqepy8fm69dn14v8fyvf52d105v8utinz4snh76a6sci32fsesfu4f9vbvxw45r4fsuojldndiarql8vg0ujmtyzt5lg48ztqic00vyi7i5flap31zf1v4b923a63l0xjw37w62pj60j39rz4zu5tagmadcfeisi8bnzeurqe42ly5xot5i3dhsjgxaiz0sfigikrt9h2b5osxxkfe62kzubpwslmp4cxkteey6tu82n50kwurpd4x91iq6pja3zqoh7co5s5ruspovdawrlvi587genml0u2p4gugglint8vw2aat2qpknidos8d0y98ay09w3t9lg69zb969msntuo6ucrepv36d4d0la092jj4fsjz2uiqkw7iage8ws5zzw2izhck5ggb8s7ty7k5i5e8fyjz08lctbsnzkyctnusqys1ft4b825ekq4g2wo7r4m5s9z7dplh56pjgrkremu1tv0kn2osvr1ljkien7q88u02lsgc8nwk8wnloqxtqsm659gg5m553aureonznrm0q1qeur49ed2rvfjmt0lk3kz2og0eujoie07jrw20aokcrhdjkvl4c8wffcl8rhea9nbqxglczi1r9zktef29iaxjnb6y72i286xsaze1nmhsrrs9ufsdyuul6mvydhgtxem56cbyzeo6i35xr2a8hpv6u19nahk6ctsch04djpkh46nhaveiywofgla4rg370kbp5db63qe4oep8e47pwsy04stpo4bctey1qmp8n4wtzpasiwgrxrvcsw2ff7qwfguhjhgsg4pl1v3vvowmigpvhdkmqh5kraohexsgb86oxnc0bjuv7f5q0akf9df5mnci4ve8ayf1q5puoycubqj25olkg1las339bb4rl4c3tictb34nh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 320');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'vlg65fekmk603rm5o4o1',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'gw0a75b6x8fzvc2dexi41iixztmzwie6c6nm4nligdkacusews393sjbb3wbdj1fkk1vwomq26l5cjr366x64eqdim4i4sj4rjdf03n3cwp264zol0xc164e3oy3qeg68h198uqrsvptb46h13i63d5oqmgc194z',
                channelComponent: 'g3rrtem41n9u5s26x9hlggfxx8j6qqyxc8sikk779r62ok5v5lt7v4yyl06b0wwzx9l1cad4x17y07gxrbfdsh929p0ws6ssto5p6wkysvi49k33dffrkdri2jm1cqu4yx4o4siiqouw1dyvcb1rps4mwkldgamg',
                channelName: '6qzdbosw6vr5hkxxqk2pxhu7dfterlz0f3c9uzczgozunpq9hwobczk339dpb4qw8yq99niywpn5lclby7dsieaviiovnuf2ln03drosk4sllrtlgaa5qmtztgomkxn454glh0c73e0c3aggpdmaxg36ocke7y1c',
                flowParty: 'v27vaktd6ov2udwnwxbhnf4cpl9jnug1s65eglsp1z9jo83ljf6yywr0ow2dyxy47gi588cqa9o2idjp2ijh7a2lzzr9v8dnjh7j71vsat5qw431rwsiz3jg2uatfbu2we32r01nuolg34esllxdfcq1q4zyu843',
                flowComponent: 'czozx34f1bvo0mb51e4cx9ddsbas7kt9yevpp3qwd5fan9q9g7ywh2o4cfmni1i0vr0fzfajgta407nqpfabn1p7d9qzi7wfnkrs5hgc8xnk2f8fn2kdp85145nhoi703mgxig42sfsfonbdzl6qbaa77324ujtd',
                flowInterfaceName: 'x3f8vq8tixoiev2xob1rkin2ybd7x234rqgxe83f3v5ij4yn7mygpct1vyq0r13kgsk2qe80cuhv6oqsr723v3pw662l388krptd8msjlsp2dt52pwwcxugz3jf02o489s4icwpbxcuunl1133km9yp6h79fcab4',
                flowInterfaceNamespace: 'bpeqnloe1bqie2mx149fzziktpfxqtitgwzmnvzo775irpiajxce0jg172oes9v4my9pjd90zdbwvew57on9ls1rdpq23datwqz3ch04ovlxqmq5wyfx76ekvzjahfd64pj9otfqhqe6dsqn5hmmau51u48pevkb',
                parameterGroup: 'u42fcri55xwsglqslhutrnhaeh5ivqmcnp817ucqfcg8xtprpjxxyoc9sfluu40uvmwitxo5vuy7l9dmq2n4hu16k16bfegbk9sj5nxnatsps6l6fwuio30k37603aj9ev6k9dbotmeocopnntcuasg88zc8j1mt6o37c622q7d8ehyvmkr586j22se1rf0temem45asnk5a0zf8tf5p8z612ydvl6dgp71shx8y6xbc3fr9vq9crl5vm32hn58',
                name: 'inmrz7m8ubdb7oimov4n5268mjifqq6rt78rsp7lrgje0ltj6zdguelyrfpyc5htl9i6o9lgcz4zzy6qz8ohqcxcz29kd60q7c9cn1ob9jp8bvgiy9s5i72elgzcvkc4st6n1uens5x5h6xknk0uqs9qn5jglrxqjlonb24b2pcv66axz26lmp0gip61exkh7ri5galrm5aqtyw106hrpdxkaopylyr21m12cw8t0u80rthvbzkmzir4evwbp6qc86a0seydh1y4e6b64hkezxa30xug6rhbrn4beypgstgrl3im8tlq10iwxj9vx4q1',
                parameterName: 'pkkxwzulph6khhqkeh40bt6e13c834uviaubwmlchsep64jrr9884p4p8a2pm5qc7gmfkfeuplklkinbv2ojqx3cgxvjhrxojb9ozdz9n1okfircnnjm7s749ayp2psq240lpo2g08j7vx8k2lhduo26eq5us3ncfb9n79hu4pcyz2dljrc5zgbqzbzv71t7dtuz8ph37fnleeblaeqcwwwy2j293rv0kmwikfhc62jnzmgga8jcm0wf0awtc5pz5kcrj5sxz1v5if321v8a6obbreifk3gyb1li2h2xk6akf2fmiemdiryrulfli7qih',
                parameterValue: 'gnqzry95sh16c3iqk28zhu09pk4nwud13z0qlrztiy4lk6ipy2wkml34md8kuuesd93tsb28ddsikh9w594977i2f1h7bjosrwq8it41i3da8k3o5fxts4h4w8a7pxn7hhbe7r3x0pyisy4ybj2qve2qxb1dcqtqlgjutemrw7s8no332qjuf9hj13hsn2do2dkynwnd5go6saem0zibwjp2lz2d94b6vdnpqqer5ka1i5bczysdnpnorlsqft5oprt1xz3iwyiy23x1djd4kewe9p5jyrll52acxykugwzth5x1d86xouziz5066qbrww3xqg1gwqa8ptnswcwqr4s1292w1q12tw27k9ulod492mdzlu3e091e28utd04tkfiergfptux30lnj5tru64d1wgmg26oyj91ipjtl84g565ewp2wgrv7243l2p7sytqjdcwkbtlnw1xik94cq78krmklfkpx34s79kz1htimnhazdol2nv72rou48xyunmodokwdwe11uhlpdz90ka5lqw2z8l4g563r0d13s3tu3bsrl8aym3z6wmy4srjg019a9lgal0yi02vmqz12jil76cwpyegyhfbcd8gcami9dssgtqyheppwqngs37cx0343cdmn108jvy7l08n41r5rt8puqn7qt83010ywy94uxzpojynnebl2e9t4apwjv1e303xmhno6fak8au7utl1hj3frjwlvurk3dl61x5hpgn9ix4aqej38m3wdmoslfhh84s8egz5wezvd16v24zc06yojmaui0u38ycnf7rw5f97i1r596z56nips8fn6wk44q1omcis7xuigh4r9goq04h1mofugp8a9faj6a408t369pwp3qn4zf36orengi25p05jdzth2gx0dfmm37v5l4j5h49l2kar1kklghykv3xp8vrj3nj27kpf8418ad8v70470mirs9qi7t9t61o06elqii0y9e8bn08hdeyd87nrgf0yeo8frtx59zsm3k',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'okjfkq2lfpj2ioaae707',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'cgre1n1v72q4ir68bjryt6k0arpbjafjb0bdjhqv13q85vqw9f9hn2aeg8zeoq4i7hcew3yabljkpj03f1vcvsrkamfhbb6l1cdvnr3mgdn7zyo26zcjk1ew9wsneggn8s62iqs5utd6qrj2m1k5l5pu142hv6mm',
                channelComponent: 'jw3as0nsypmx80b19nw91lrg3vudlxf1p2dcly7iybqkd7z5b9cuz4wufs81y4an2je56atc9ok4dgp3opruxfwa2ml504g1lv9h123qa99c7hflww78do2kjm13tsirjitlmjsax80nqd791l9hjak910lyoxm3',
                channelName: '172bu723tk8hiut1gvyjiktylzhjycsmzal8iv4imng2b8n5f9kx58qrx2s0tk3btmbsw8hz82m38bte8uughbz7stro5sz1j8fqogtfheizdz8v3679v4raz3xnwbmakjsdfxokximhy79t1zcoyot5uwh70tp1',
                flowParty: '98inkcfcivqfmpyarhuj1bpwiqvjtdzh0a4pfcv5zobiqwrl8n9axzrupfdww4u3lxvghh30kdcrq5wnwgpk1e0ihrrdcgb1utnbn5a0hti22y3wwlc8ev5vemkb572qweoss6pt2t8yfzcxtsoioi4mwe38ymfa',
                flowComponent: '1vwya09ppz5bgi6fm2pm4oqrkx0np256icyxhzin7b4srezpcjh5x0l82tenoaxf37211s620iefpv0k2haplnqd8uqpihuq90v8cvbhzqkb2dyfvhjmjms2pgs6ldg7d0q9j5r5uuuk3l1gxsblyw6c9i0aa37r',
                flowInterfaceName: 'ej0lxqlu2s4wpqz9uyyr42mr3puw8e6a6spej9bhrwgrhq4tr8aqss3dsqs055ox6t7656c4udd9jfi5uknyfi906k60ua9gkwqlmpyeykods88xn0jxymsh7349bwak8ba5cynzv69sgb9nvt9h8ckxioegsaas',
                flowInterfaceNamespace: 'jd246s4bix3d2vdantfshmhiknkloh2n3xf6bztzzunsakl5g1exeah7cwaspktnyalaul6gu78reexuqbhdcv0lfbq9zbhnn01q15vdqorcgf6xzcclnp9h5s694afxu9t8i2wn5i6fp3ett2hcry67ycjyd996',
                parameterGroup: 'tu88psvp749suffmrioslsoaw6dgckl2omro8ub0ag7rns4x2cysijco105jyj0yl07dvh7yfkt3f0xz595pgfkxoys3mensywmzsqpzltrjv548fxgy29v2dcc6pzihzxkjhavx88ux4zgj6slgy9z6tfrz6a9d8w6p3wy18o2i6ffzj07m2g5mm5ab6huu8ro46v7ap7lqjlo6aj9hyrg4uxei5t334xwjc1agqeze0f12wiks5y3vohehp9z',
                name: 'o9ws7far89p1o05o3jpmpuualncs7m1cpifjnez6ibfnhfqnftvcqilws56us5p1v5xnte56fetm7c5wwcdelfscvsa8tvp3hizdd2uw8f25x4rdweig6xi233uhxahmu2rwbmx3thvrj2k5pu9ka2a07ihk8mps9o4zd0pxinm3ewmz4298az82zquetpagcdjtorcfxcs09mfmmkyd2rhudcalf52ny589famnjntqb9453p5opmrksvidotaifmw3n43rivyv2nqhgl4tbz45nez99tlgsknbq7af7g2dkp4rogpz5fk8qs41h133',
                parameterName: '8wc0dkynppv63mdk3we6i9hfuj6nkthkq66o04402l8g0mlcabrmne8v4eu6k44y2gvgv4ob0zz2ht8h5qjnrhwjos6pebfy29vtgjgvftpyxpghx4c876kztluj4ybwp64ij5bahqrz1oej5u1ue8wx1hk7zxf6a3332346vj7tpfm5jko8cwt384s3a7yha4w79ouz7r2u5si9e2gc9yegh96e7k8tjih2wqmru8gzt9t5hgn80bifswzbz5liqlt8filwpobv3jkpbcpx2c1lm8yy9kgsfvdfuxdw8c34zzog96bwl5xuw0rkzh1h',
                parameterValue: 'cff5dsp70xo3nj1ls5e3fcpes7pm2teevishdmqk84ulk8k437x9oen3z26m38hqcd6jv3amukdimu8zed5xmfjt2kq81bigar0ntg3kzc45of1cn8ap2iywqdqaszsmxeb35bm80yguzkwlxjjmptj9p15q97guym8ct51wxgo0iyaqn99wvu1te7o4a6r3ot9tc89xhkqcaf1zovzzg04na26dpxs2ir7300uts91y67zucpsh2sdixvpkbumwipvn8xqy7lml4slrjymsr6nuygynvtph7s9ensg9n06pb51xsstdvqby69i3sqsg5ws7jb9mq4a7ljbhrwzvgfzu0vsqz5ycgwpwyvsxxl3cgupk87b2g97zgkfp0ewrcssarmv20emxd2p1zs7a7zgg6bhgwi8p5lgy8b5vrll34ezgkclidhruseoecjphlqh53nw8wxqqm1ub7kmtzsqwr8yyes6lzkzdhwm8vw025o5f4zy486066san33surpp9r2mjaicyxaremyh7jjekor62shczsuy4svqao8g40ksbt73vlyn41nrmbat9wwuuptoz6teevu73ol7zsayj2kus3y2754l49kvqzmtyvuadlxwg3lvpwerqrd4u3q6li9yym2er7b0nzx86bs67ybt8ywcrzz60i1595u3ae5wo1ld0jkz1eacfc59e50uzcq60vp0ni8419mklu8ycfkco63qji2zy9tyn6tgq1ya49m41ary61q50j21fgpuw6ydmzdcpo9obgr3osp07wphf0nkpme90uoh1ikgdjor47sqi94bpze5e2ba0ymiojeq1ouereoj55i3h2pmnn3rt8m0f4dyk4kxs67ymh9zzpfsxd2tskfzpr1y1wxj3jdyn4w6o2y4tk6lttlqvtd9h7xsvhyf93ce3e9ipzlekokjh5eqpl7mkkaq2v8y08n1s7oruuimvn2halden0rmf2blutzk4x0xv3zmt4a6xw15m1u5kjdbggiwvd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 1024');
            });
    });
    

    

    
    
    

    

    

    

    it(`/REST:POST bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: 'xqwl54s3ba1041vn7pzh',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'i390zbi3m0l5mx3xd61k6dfhs7rmm976otmwsoyf2il427wgu92qjtgvije1zyzjo4qaejzpl3k6nliuh2waxu0e1jvifqtqban5krt6lfw9wbf9y08x295uifxczc6wusjzzy085bbwwriy5hv232mqsd0b92qb',
                channelComponent: '6hie14duu4r5ijsmwpavowgf5myc5vdv3r7caj1immi2twgdz0v2yfh0bewxbs89vqax9ao2ghrz8h0hh21q8mcnoi06bjw3hm0gpxhriw87i9835c2css33t0k2afecyile6mb7455l4zkdrp56vpw5ub18zvvh',
                channelName: 'u58eaoa7quxdvai4ojtoqqhxcaxvzcq5o6kui3i42yh8dp8s3hx7vsmgp2n8u9h8cajlnegjxbiqhros5u0fvjg9xfscyecsw3dqwkly730d4s0lc8pzgp7n6uo139cgwy2ur3oe3r34mhec31hudism3wbz5449',
                flowParty: 'z39rrjytt2gi1rwlbzzi3r4e7x2x1lmd07nh96gxypctsdymi2k722v908324nsk9z5n2uplofvwi4cmqe3ctz0du8rubynm8ygs0dnsouz73tqt5ts7esi9cordcqd5wc7a474loehm7z3p83unzsj0yhc31pw1',
                flowComponent: 'wt1qtpvjufdnjqiks719acpnzqxi0ycpddgywszwrpo3jva2nv0s04vsci6zutjeoja5ng7qdbr8y6y5yqzox87w73lie8bw2pfwkv4uoxut8guuf10gp229w9ycbr5ri5hryt0j6ydzezonvuuw6zh5zb15j49n',
                flowInterfaceName: 'ko68zvy368jzr7gzl6nbkexqeqyunmqrfk2eyi6udra0hzdx1l3orap4l4oqkx2gaz3znfi6g6nagpuerx7ctvb6or8kejv0p4p2i5y7ae6ff86e53uff0r6kn8n80bbsqdbf9gkg5901hkq8pgffrlp27fx690j',
                flowInterfaceNamespace: '6tbgq2wmm1cadwaifcdhcyibftwiv6d4pk4trfdypf7xaz0l77wdhimxjc14pontso9trpxfsfcnbc8razk7zc59rsmurrmdf10tz8x42cjeseolsbmd84sxqmio9bqsab5xld0ajoajwfept35icnbhfbmbftq8',
                parameterGroup: 'oziozo67jia6a31x3vr1f35d2hhno083u70byo1ff9s0tfqjjkqo96hvp2loellxohjw1g8irupcg7vd464iqjcgobx5mdf3fk6xu5oydf2py9f0cqax22vf2fjfiam2w7f02gaqugrh88eo3ta38hsnawtux6vk7p7a0vpsw55tx86m6p6u4pr2sdpo30g93vf4ereohlbeoicw2fzs94wqj1t4594dq8un8g0xkdlv5zadf27twb1nf6jmkq8',
                name: 'c7kln15g7m3y25afo6nd314cj3gr4vzrh39jivvt83yig3zkxid7fvaw8bx3qrebk3fvt0ivm7hbb06vza792rycaxna0559ck5vw96hxcs5xiitp6fccs3w2qm825b5hrgwd4s31v8ra93v61xpq18dg3dxbxnchit43lie0s8xd11mxbphan9fysruib2l3plpcdp46stzgeu1gu5757f33fvru1ev25ur9p1e3goq1ebuccr2xblw45xiw8rqhmrgole1i2qwq6dpf707neelzs8gcuiuhzv2txwv0mkczx88jrbve1q5r9nu2ks0',
                parameterName: 'c7cm5abuizmf95jrsvk9lung5kfywbfo5w1400na5g1z3uqdprhtkygb6k8az9ogqbb77j07yzes55z24u83mtk071wad41z9d8fbwtrdxci2qx1ipryp2ue1748yrotas16unxj7807ch6mgysre0wlyv2hxti8fylrngxrh7dkl3zw58ekxr9xq2lst1m82iiqxstq26uq908d6vbc9lwk708r5ybb8e56xn757m726m3ejwxa8qis7i168v6x7wdxdmmvh3s6r0xvn4wc792kr0npqeu9qc9swqtjbcpfgoeu61wrmk8iedks2zeg',
                parameterValue: 'j5uc2wccp1sylz5nb25gzhnnr0pwzvgx7t42w9kqk6n3jtsv338ot97zpsu41p6r03ijf0sg6bxsopotwco05akkk9hj0y3l9jobt06o0tofe6rw05pb6udfxzzglwujflhyemsry4y8p1p6jvh0zgx2oefnb3htdndwjtfz5byjxgsif49gpr4kjypzmnscy4un32hka8i6u9qe6xqrgl0aouwb4jkb4gruio5csws87s42x5scrj5o7793do548cauvzd3audkwasxw41gp9g2sj5t90ca6q8rh40t7pitww52fcv0sno5fvf5kqg6zu1dfuqcv43wl1bbh6wyu31oztkuf4tkhix9n25cgn4fxkm98q5qx4l8sddnyelgbvgi874bwqrt1q3pkha9a3x5818dxn3dtgua019n1i84rz91oks0sd5y0gucedzo8585d3rfwwauh93o11ofvzj2v6o2m30zcu2uh56b6dyvqnptrj4cv345jogp75o9m1lfj7z9mc7pf7je2peu7sqm55h1yjwxz30zuiz6i4e0ll2cnihzxsuzrgz5fb3to9jjgdu9aq42pri017qjkt4l565je4rrgkfjbswspha6gstn5yr1vlmf88vddpzy9q1rne1j1vu51nuyfyldqq17nyqp00895f0kcw5v4g46btth0h46983kn9hfbsigktwbz9dxd4wxyszz9wh52pr4b6eff3cphohk1w0rqllri3y7qg5tghnf3sjiomp5ne3rl2lkxny6qjoaxq4q7ikpf3owugbglof20ij4dn2hozzp4zyj6dvypsz2nb8nceli4vqz5umgfd464f67jsonky65m999yxawtxfgokmlvjgwjndrxs3rl64s3i8y2iblueokirely3ay3srobpayf5vr50yyq4wobxf8rwufb4jhed9jtck22r3qe02tqne7njxe03en58qw1s6poyg099z5okb0i6bujsfuflway8o04uazn4gur593t0zi',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/modules/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/module - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/module`, () => 
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
                        value   : '0f674ca1-3cdb-4a61-807b-919d863d4c0f'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '0f674ca1-3cdb-4a61-807b-919d863d4c0f'));
    });

    it(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/0f674ca1-3cdb-4a61-807b-919d863d4c0f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0f674ca1-3cdb-4a61-807b-919d863d4c0f'));
    });

    it(`/REST:GET bplus-it-sappi/modules`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '089c4241-2d15-4659-afa8-ff242c7b4d39',
                tenantId: '3b9b7ed1-4d70-48cd-a2f1-e4dd29b9d770',
                systemId: '2906ee18-0438-4dc6-8297-aef910f00573',
                systemName: 'b4c9hsrmpz4ihg5r5gkd',
                channelId: 'f0414932-1d74-4a97-8bd8-b81150a518df',
                channelParty: '75yiqfliftic537zt9qxunnazc4f6xcbfcz9ks654b7xv8trhkvzclqhpgh1cwf8n3hb8ng4n9grb0fbgcwf4b0n21i2ompykcza4lfslmxzauca1s2yxgvqmzhdpq2jkn4n7ka4882s5vqo69p2bpnucta8z5yt',
                channelComponent: 'mx726fmh1x07b0241v1dinnmgqqq0r1pe1jkb260uwtsnn3bx9d16824dpwejv95bsz4fhp3u1c7p0cvzpqxpb71xblv3nhqx4tsqvdpcovojhbv2uf6baj6lifyur2ypfq0a5yh9jcgg53rpigofrfono6791y7',
                channelName: '4vfiltxsjbxnpu583xs00eb1m6wxbthx36ztsbkinnaokhw64yuacs5ktmgzp84cwhso2hlagtq8til0u6aw6s6tdsisk939k3vbws5id2q90v8tajw6xjn1ueilahikn8rvxrqo6cbd39x2sxi8ldjmr52bc941',
                flowParty: 'iesn7vc7jxyjgpo3pb15tg8mi849djyi0v42mnem0o2fza5wapbv8rtyfx5jjdxf3m0k0a92sczqj2obyj8rf8z0xsylt8n8owddb3zva0bx231m5hpuzdnpb0exdhutnenqyui94bdpvk661senojepk118ynzd',
                flowComponent: 'omcigbrjvkxi1d8r3y6tx3unqf75n30dtpzpx0gok8ya87eysylsf3dm24exe2sp2hucage7m7aywm6h3ma4gzma3yis405hxq49mtv9nrzjqc0pcbscfboqajmxc1wsx7wev4qordzovc8ja4dwlp8s893b7tg3',
                flowInterfaceName: '6sjb8rs2w5tp1da8d43nj8k7u6f4s9d7ibnu0xl1rnivz3b0usdszk6vpo48v505zfec4qwx00ugliaxw2noq35bdzza25phaoqdz8htdt4qa0iptmtb0548g21o9aitmceajvrbzkrfsigu0gun5u1dwvy8r338',
                flowInterfaceNamespace: 'ekohyzr3xv1gug7hc839sv5257yxkgkkezndjg4ydzi2rumzjzyg8i5i58ywn5f382560iygqn2klxydgj54mb2lryb7fep4qoyqlyojifp205zuj8jvf375vxedmryg2vp4swksfkz53aa9gzcpnmb77kolf2fg',
                parameterGroup: 'wnsoct78frhi60wwxiyi3en2qccs6109ncj5jp6czxyhx33gbmtghhtklw0izli2gzhebf693blldy1faoa1ieekrmsree78mbjnygpt55u6suz1hg1p42qin2z7o7bvks0fgir8lqc0evkc8homijow7ww2fe3nm512uq5tiiv69ehew8q57ehcr3w0juakjwd6zp0gzzlpw6brvqob4iw2nrdpnrucz2sy2ums64cvk9fu09f9sguyo7fm6ux',
                name: 'q7qf64bj3j2u5x4h3qs81ev43vz1gm5tizuczhzg3cugkgipnhpei7ppyyb6qgtd1irl83nxx620733wytuowt1ftkp26g3nziygb9xotzee6t2dmio7lp541ddzx9yxe7wz8ky2py8fdek5gmywg47ud1e6w1dok4otrowv4fzxdjzjvkx2u3q5kkr7x81taokeexic0gqtcfanec0wmmrlpnxsncgqko2hh232rerf1ghf52dzju2jpkrjie9ogp1w71r0i3u2z7k7n4n29k5nunxjn270vsd84up7zhbyyb6hilsgzprpbv8djxmg',
                parameterName: '5ap4c13mve5shmievph9vok1ndwhgbja778faekm6p3kdoeb63cy0tlsdg7wkgnasp9pzfuo1ums55ngds64zssztg775ta6eo2w04e548l26bfj4oojgtvfjofxfcxkxzf4rdy8ioa2nugx7f8avrrllin4vireuq4xw1zti2izn83dre1a7z8dpdhuqowrxvweue26k4ujjbnjnbvnpfis3lotun5yyum17b33vqpa1jnsqrilrlqqrnv1clgurnt9mh53drq6696ewxb7r8iol48o3kal9yzbpufb3qjrqzymsehkhsgceb0wpr8j',
                parameterValue: '828q6k9kmw2hxu0yebqhpotg3hxqalbth15ippgnlwy6pt44m14apz7qmu7l0cj064m4vqymqc3b0cw7b968ib4nkcm0nf18h5gfbo2rkgemj593t4r3ctnvmaa8p0v8t4jhdx3fenbxk33cotc171nwuuknowp2i19dnuhy0po2tk41pmu9gj3xco3u81zxgai2tu683dpxu65gsijb4vdzjc6kzc2j2xzmqsw5ia4y6sqkuol0t65on8z9qx33vdvo9l3193ixwkzhpwt7qi0fxj53nj75f9rntpiflmeer8j4twnee0b6r1o4j1wqwb049i1gnq97lra1aw0mkh9xxgfhe4dqfeys67m32c2seujzyb012jko3n2ohry9ozj6ofpk8gnbt99jzmosv4igz701meqe7ipjqhfnzqdbbu7itbfdwhe07nsskojydtztiiptkipe273bxdqf9va131qkuhqf8k2wuyx2icoxgs18coibz3d61lp9udwq9faa6042a3pf32m410wsl1lssdrnj68sidmuntwdhas8xf9r1fk0sdx9lkcyjojg0vnclyt9kvaz2by4msup26cik5oajtnqc9ju3bfyw5i1fnj8o9npyzjqefoeqj1t1k4qggqpqv4cf5gldisc00u4mzxhl2w5h1muayka7u0c3tj5zmbw2f5lu70ndxdmnehcipf2x6oms8nem04p95qbgbe9vy7wmn04bbmsxxxhgvzcsuqyb9ko66kmzkykhgupot9iumh642yicixwbbajv3t03gcu7ypf4o5dpu5a1i7fql8r4u6kuilq6hv8r3hc310uree616yie9fmi167df25p4qs0bzjuafxtnqao40izomufjf27z6p2bkzj75cntydnq481mjhn108gu87abww052uiqdou7rypjo5dhafb7c4exudx5hieys3hmcwnwmt5468d0jdknmv0o49yobxnjkvjxmsk3fcsbhfzref282ff9lpmocey06h',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                systemName: '5vbawjzndos2k2u23xiz',
                channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                channelParty: 'tkcscj6897orcheh0cu5cgb0w5bxmtbboh95426wsioklysu9qrjdgnhs1el1ewzfj5dzj0miwmfbeb1p12zi1feeyjz5ds2wheo31r5l891ran8cb31ypwa0cuo7bwi60ex22kuxy6722vuv8rdosq3pofy3nn4',
                channelComponent: 'am9x79gprt1p8d9f5hd56qyak6ph17xeyidzgja85x4mp27hrqs6qgxqna9u5bdpec845y5241bmul41mwdx2ijuj7gh9vl1xqamifb9vghfasser6zk0cvitfiru4d8shi5h9tfmio7x10z65rhfio5psm1apbp',
                channelName: 'wrq5vq19yr6mpib9kyw2b9mm8unayvrx82vz361rul5l4sgsnq66vmt8qyoldapsckpi8otn4i737c7w86wihhtc0k4jzu3nenc6mfown5c5sbv9ohjhwk79j8rkeoymf1epxs607clgkwtzweld3hgzqrxy9wgw',
                flowParty: 'nvwp9jc3fmjzw53nptcae42ihedqa8doxjml0rsbj2kcwalyyykxpx2eajj888sqk8466g2r52gckeg4xsfxz7jbf7c0e93n6966pbvp1mec2bmu09uv8w9w0op0m9jix0l22s0o4mc9w9wlfglne9n2bg4jzg3b',
                flowComponent: 'r3nswbjhqj3sfkxwznn6dte8daypq3w72mcetge3k1d0a3po3bdfsc19teaxruen8hw9n3ewrcyj6rjhqz12z370jga6mntpe7s1lueyv16v3xn6xe25wcd929rvotfdvm8r3owozx363fde715ux6gcz7v1it2e',
                flowInterfaceName: 'usbs8jx5g6n1f1zo0tsr48gx90si8xwb97lf8uzmlj8ade715mt5pmg0uh5v27fxsrvwgpywszdjxns1fm4013f7acii67grmaaftvymcoh86sb5g78ulmy5ez9jttzku8iyqkdfggnavu48txmjqg15mix2xvp1',
                flowInterfaceNamespace: 'jcgfwm26ozaklku1s635byk13tfp0kdhv32912kdh6nisb0eayy7aefmbikv4u8apw34harjwur09eanqj0gsoihusaxs5265j3djeu3q5a8oyps2mq0xrd5h7r0jzk4qv9vzbgzz6fyufstxkojjfalh85nw2c6',
                parameterGroup: 'i55jjiza71fl5jh96gklyxpg756xlo927k4ll0soryzopbca20gw5rfnxsresiycxhojpu8h1mkm2czrx4qvh5yny2rlrgcdntw3k1o09cyae4e2bp68u1dm5jrnmcwpl83i6zljgkq7do6a0m6qjtlzrw5s3xlxhqkdvtiezpqyam708rkr8wkscyj5blp8fqm3w2wpu84g2k5fdcfsfu7wwndea1xrf3kh4ib9z8ahek9hpreyvjj94uci0x0',
                name: '5fdng2pyt7un7fpt4g4ydtxojb8omkn8hl5y7t5rwthwuo4o64g4mndu6zf7no1d8hclffv4lb1iwu4x12e6d62tiakxojvdvazvx0pjt8wob8dbiq8efrc17e1yu44prs61mi02o3fpvi3xstm9z41lcggdrtw3bao2kn500b9emgzeyw9bq6eam6trckkhvwgf7ktlhaowfcyk5jj4uhxx8sjuzko3vtjxcq8xlu78842xm5tc15n9o6am8w6oejze7umi0yyze1swa5x7hzlsxbyx7dl554btqrwmcccpubdz6tf4huqa7bydyx6q',
                parameterName: '7w7jr37011wre0vyohrln38uddq89wcmu98w9ocubip6uvrcaw9rhh05f5pkljq4344kdk10s6rp9dyb8zg9wnydoncbctcer2jlue7tfl0n5y3h3nkpsghve5j6jdk7o8wxjylnw72ket251l95dbkqr97vmlq7y0abydah5u1h90ztxzog7xh2hj725nf8wh05r0btr44auuandvr7xzrdrvin0pae9nb4vx1qa6jmxuccbh4p6wlad7dsj23bfp3itfb9sdenaca09jbgz8qn6e9nynkn43vkf2wb2kmhmhx1pso1suwyww16g3p2',
                parameterValue: '8lewkhb1b3982qjtkpwalbypvulkfkpfpzkcabtnv3hm62lux9ez3lumwj1zyul7l6f4mn3821v7fqjb2k677sdozumrj9kvajyx2gnu3hiulx90f7rkfficohw6ipisj1nlg1uv0a041xo508mwkncs018tf35vubi979iu9j1mzwh5gaa1tgupc1stajotbhankoawweuwpc8x09n5pt98kli6d4812werwfw4zuh9entcqi8seiksotvvxd66snv34efy4tct6iixieexsc8lrfws2wrpyn4yvtpbd5z6thp6mdxvbx25ye11lo3ibwln4tmgn56d4bqkv58wph38xosthikgbgedfae0jsk6v41ndc1pkth6ysh27mqztj29dbg4fagt8z3tgb7ed1eyq551g60ge9ncv14r6laocq2m1e6m90o3rn7wsuyhvpobarawaz277h07qe7myd0rfpuzjyvr6df5w6t2cjqlsuy5campujuhbobfouxfm7l9hvcjzew2fvhs16igex1y033ewtqubltb5z1h16x6y2v2ry0x9y83z9bafst2f9cklobu45ewfuq1uz07b3wqt3q8yjz7p7l8y0esdqvg2ekcmbpr65t3flgyavhmi019bn08c72w6fid1dyk89cxgtnl3oe19owtxkzihda8tjcwj7qmh45q2c3cvouk2ehk4wlr89kygih3kgs1106rzhx9s03uglfybd8tvm74qzexa7peakzr2ol71kpm7uraexjsfu0l89dtd75t1dph372kwaf7oxbshetbewq2tq1xr7axxkl2vo3aky550znajpn4h9ris3bczv99d10hwngkhdehmfpslaqektabnmdbm4yjil6hzx5gpdi6jtyz3l5u97la0vtdv5fvgc3q9v5crmxtibp2hoeugk19jtm3lhnr3kmw5ntfd97sepasz1r9qt5ldrwbsddauiefpzeagn2rpitkhma0c4pwp9yph7m7alzseu43ii8i',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0f674ca1-3cdb-4a61-807b-919d863d4c0f'));
    });

    it(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/0f674ca1-3cdb-4a61-807b-919d863d4c0f')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateModule - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateModule`, () => 
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
                        id: '656517b0-e13c-4f48-9e73-673f78c40ca6',
                        tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                        systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                        systemName: '43o3yhfi6ogk7e6b8n7v',
                        channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                        channelParty: 'a8kofld3hacenata82j8imi1pxotmukme1bcl8gvg1rgqnkx1a7ob8gg0vigfntt2uszv7ckhk9yrndtnqlnjpu1eotzkilwmznsfytzzu4yajoqtvdhyojgrp66ct05ksid7pq93z6b2ilja2t7dw64w6ynfntm',
                        channelComponent: '150bxjph5wsh3aq0rsfdep5qc29767wt7thl2agoyayo8kgmrts99rnm7g6q5l0dpn7pmgok8gcu7trag7yatsjoa4b4twvgohcixg1eoczp9kradk06tt43w2h32pm82y5ygqorezdf34pnp0cvv1swn1ioac49',
                        channelName: 'tduah49qudzx2djp2vm9h29li9j2of9j8789jtg5vqr9lguaczhg1ty2oesdawz9j8w877geof00pcrmk6g328j5sqz99orm7j4zuq151yvpif1nvnwmbpfbc7wdrxvq8bgsduc9zmzwfr0c8bn8nys5i6kh97mu',
                        flowParty: 'x21bn9e0m3map1ogo2ayox72ict2bcyvqbzophwl9lkqcsatpfmuzz21t7deqrkg9s07fq8wkzg4sdmdstvpwy86ckhsx14hhmk3um8a1l9u6n75yd03rj169jcirlgjb3h5kiozvyoxjzly761kgatdfuuaqxyp',
                        flowComponent: 'uknanx0bauq8vw1ava38g5lqj0ywooyxsvk4qnigbfefo9jtgtdz342l5f6pbeh32jvkn0tloz3z57iwanur3r45peyah0caz66fxlh0ul6izuqxfl3u4nc2r21as38ybjwyrj9ic66cfhr8sf7fkzh0b8a39xeh',
                        flowInterfaceName: 'dtnsxab8sea4k7l61j96qmddgxk25kj2jxu7sxzvif7gnbjpdzvj825rd12otlk91f590d0mp414mi7er9zd7dz8hwqdrxytrg0pq3uwsovakpb8yiz6bzbs5bb9v4sp8jaorjpbjbkqktiavpe14p8t2ly84pdx',
                        flowInterfaceNamespace: 'oyelxjlvzmm7knvvmmraaz25cxyz47e0sx9zvw6wnoge2xo4da9vscxo6td68csj53iqcuft58bhblb8u08or0psx9zvemdft8nfzn8df7yvg6kqr1e55sgvvc11ccihulxpfovintcyzb5hahj4fxft66m0baml',
                        parameterGroup: '9ln191lz4do9pphg9j2o3qbokui259mgouzs5fa7lsdbnpc8jotrr8cpf2notfmori55tk345hhdn62y6oj3crlgm1ng4n5dn2zx43hiogji43mukb6keklma4ksz65q43nonc4c9sn4gdqune23dr4j7mgatll3l0ghf38usa9t5wvwzdx6xsyxkzqqe82f5cndcd319ojbj0o3v6kdfctgz55kotrjz7vmverflsab9lvamx2gh776ym9cmry',
                        name: 'kyc6jyg4vhrw573eflm8pibvro82pa50j5xeb0f644rt2i691kef05v8fmyoc1wz9od6tdy0y3ee08o27ye7liykrmwclyajwi76ss8hksm1xa2srelwordkvxdv9mgr916xatn8dmtgxd40xbfm1cx88vgzcdwq22zn0wyaf8oggtqvxnic3u8keky59n34bax98vvnoawmlqy9p5tfaopa86p41mqhk2ynsft3wayzg4370rr6vhn0u2s2ujexjr5z3djqee2tjnh0wqwuoz6jv5fc8uvvmv5swov6ihondoqywgce3by200wk7xvt',
                        parameterName: 'skuu08ojsnxk3rcji45fqd01vq2kq3lks1hmwrcfep98q8ydhi6uv3jb2kuzcpgt0ivjox78ghou67vg3av92pcinr4snjrmhzt146o5prtld3uv5ex3tnvdlernqbbo20g37902jg9tzcg4eqc3yk3r83lc6ex6znul4dpjum1pyvppz5ua43xzo49k6bm6lt7sy62xiq7dt43k7qvcuxq5162dqoopm085qf3p3pkkc5udkabvvcvnhxyvvcepba5vhuhxsu8xp7q10paf8kmlm71s0v54qhw8kmklvgfo3zfbu2b34oxlfsgsrpix',
                        parameterValue: 'etecnqlu5mtaam65t584t8hhap1l09rn7ts5aqb1joyqvfh838wgki443o4247z56sqmmgtfx6hkw87d8dao3in7ainxi5chypibi1fm9ahsnn5cu1t2ubge98b9pzd9cloinhig4exzrrzpppy6b5wd2900nb9wf5043jdqy1dw7uisbcf67dxcayz2c5y98ropp1o8kgynpsx9w2kl2gctmcby83hv4b1trccmz5y26jrgtovqshg60wkj68jryk0rx8uyzjthrexfl6h1ydzfvq3khlm46rmd3dp8nhseipue5szmlob5nu543kf34wbafay4elwe4xvf2ms5wr1yrdfz0b6fwto9yqeebtjmwy78xfo6oeosrkjrk61ltkag71kgu6hcvyu9pe2c7ui4gel2oavkwywyd2071haet9j04jyehf1ubatgsc7gi7q2888tqxjhd3c25hc8nmix481eos3xlykk97t8vs3zn345pjzb4mjd7xca7hap7czyz3hajkmxmiunkfuvs7zzx40lnlari7ig0i59owvcmnunzmr4ahyfgmdk5gaq3v82m68xx7gzd6pan0zfvy762x1t9gmzdhquzlj8lywg0dimur3gzt34r6gp53kh08f53s3uztc0lmkruvmsnpoa22ripjw2vom0tw8sy8tyn5tw4m7mu0e0to3daa939yp8tlqp7511bfo59w6u7l7alkpaagj4czqf01r5l38oeklgjhkje3h0818mzlqs78aqqbzfosia2pnj24ih2vjvssqo0c9ji2ypq73ekzk89x104v7pqfabk882b1ly2uenlhkyu2wawnz4z5dbi5ovjyjdiztuysyv6dub9cj7bbn419twvgt47mmjuzm6iwnhy0tssw6tve1p9v6t6l8e7pfvi08l8n8bp8jzvvpt9ye26087idxvtsif5dmgmhu2iqfe4eqr1w23xj8qnek95qd2dmbnc3b3w7ltzbb88jb5ja4n3lzp2o0fxv10',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '656517b0-e13c-4f48-9e73-673f78c40ca6');
            });
    });

    it(`/GraphQL bplusItSappiPaginateModules`, () => 
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

    it(`/GraphQL bplusItSappiFindModule - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindModule`, () => 
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
                            value   : '0f674ca1-3cdb-4a61-807b-919d863d4c0f'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('0f674ca1-3cdb-4a61-807b-919d863d4c0f');
            });
    });

    it(`/GraphQL bplusItSappiFindModuleById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindModuleById`, () => 
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
                    id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('0f674ca1-3cdb-4a61-807b-919d863d4c0f');
            });
    });

    it(`/GraphQL bplusItSappiGetModules`, () => 
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

    it(`/GraphQL bplusItSappiUpdateModule - Got 404 Not Found`, () => 
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
                        
                        id: '5f92626e-a454-470b-b993-634b1ddc7f3b',
                        tenantId: '75059435-0c6e-46be-9149-8b0023ebd674',
                        systemId: '2e582937-fe0f-4d03-8919-cbc4091a2371',
                        systemName: '83bhu8s1jl1shvtmp6ah',
                        channelId: '629f662a-9dfb-4e12-852a-6605e78b7b78',
                        channelParty: 'zhwd9fyltldhlmsti625k52lgjugxan9o5gjr66s4tjb2hipptm8qx27oigplc25xotcritcd769l3gq8z1uufxnalbv7r061sk82z8ned7m3wxbez0zt3wxzkff1238y8sknj6ra6ti52gkbee76mhna3r36wnd',
                        channelComponent: 'uzqoeorrnknkdr38q79aqxqwelg5jpi1xhdycwobybqsevptnpungx2x5vrsiu5qkl59tlakm5cz545wn3m6jvxyzacf3kjc3zj1n4us93f6j7v0ob6vfpihdnt5chwonlomvgcc3d6zkwlx2i7ikiojojo3gffw',
                        channelName: 'b2ddhemsmd297ep73gdzo6fht5o34z8loxkys8d2d7ms7cfl26hayr8bc0dwo7zo8ss5qmli8ma79gsu9x7x5ebowwagg86sg6lplxm4jceo6xq5xtg9vnlsb0vhhg4xl17asxw4wyd7hoicv5kw2121vu089mlk',
                        flowParty: 'o3ktq32v6d3gqo46wbdazypa0n3ol03nm6cmq8icjgc4u7lvcvhzmg4ihu8fxp1y03xk6e6xdp92auim8uz6yjbjpvkvbckl3dxnaxiym0evhuca2w4805fyenoeg51cccqo3k1xraiifxdhon6ydpcsu999ifd3',
                        flowComponent: '5lga82x2glgsme5r3awefz4gjjxi8t7n0ppzbm71ipjqh96923gugksafhxwaduxhmrat6ajotj9oyyj41778ce5d034od4zx8umpnvkel0jqvybpb96vz852qrqcv33ffdi1xus7h490fybyzzboas8rn05b7ia',
                        flowInterfaceName: 'qpzkfa5drj1t3x47szwy4gaqvtl4h2uywm5hw5xtq1pm4xv3937c0r7ro5fq9isq2lwtrsjngs3n2j5prxjaooaqau23xnnopk2wa8kdsdypadzycowa9g0bpj5509zr4ewj4s4x9euvnaghuh3086naa2ikjrit',
                        flowInterfaceNamespace: 'da0kbrg3wnc4ddv166jo9as9khllkvmok3vfmuwxbv4m15joukfvkqw6r3iw8yc2rtgt0b4jxka7fzctsc5eeoql46a6txml0aheqqa2uozcrtofovx4qyaaipv2jvpfqo0k6pturx8y9k96jrgvqinxa0upul6d',
                        parameterGroup: '2t3ktvhuxhi86k2puofwt1tf5onfjjkt2v6lo7nyh9m6ll6fdmjaxafjewtkb7o5anvwqjddjd1ark1gan9lgcna2mj70npv4noo8gjvovpgqa5oao0i1gsbwpwq4qj98xh7o5jz550f2k6alvgdm4dmqhpafg0z9gwrdqcxwt5414qvwqnoavyjba4qnklxmwsphcrfl6y4whop9no2n0av6snipyr2cvgjjyy6xoe0n8zmnk4r42k4wgzg71t',
                        name: 't8rhefm8q5b30vgay3yn0z8clbxlry1ny7jm3li5tnafk9jrvw93701c9zzpkhw56uqqv3evazn93wpks23od328745gz2y91loouu603ufyowccrfp5hpltm3ceg2xi01e7iqtom50p7x5j7qaceff1t460hlnkekhc22hednwgfrnf9trv8m3rvlwucn685yo9fl4quj2wejlo6k2ntzk3qg8fniwsjwa567pt3vr2x6xesvstzq68eiydx0se83dgr0328ofq2jd43hjuh4yym6zgyj0p48mqz9nndb427kfhxclewunxmuqdmb3w',
                        parameterName: '6kd0rfbinwkhpfoqfh2ti33t0alpswvfewc04r84k19y5a2u9lloe9ozhxldnddxdq9q2cz633qvebmntrtou2dvchv6iffgvchy4ndj17tgqhi9rgpat7tzokpzlfqfbjlts928yv8oztofzppehtgkxkndwb0rxyu5ygtbm83htt4cy0asz2ru0hi3qec6et6oqczb0i2r4cn2igca2c719ezicta8yxiuw222jhh0cv2pfwjhul8rv1h9v5fu1golhq2cxce7d9ytxs1cp7qh5kit2db33eui4g4mgvngn9v4zt0gxrxrz8da82oq',
                        parameterValue: 'bh66qx1i85vgdzgtlx5guvluutg2g1tzfu792pfzal6vl3x25z1nef1nqwk296kq5zmqw9pilr5uas14im3awaa1l5tcey8zqjtxad94cznp2hztg4rt57392usyidwjuqh4oa2x0xgqg7201i6aakwqrencl3o7ngnejj7is7cg8m91be18jfat8pkto3qj8504lo6m6jh9n4q45tuk1nk1smimeocq4jx9cvg5kc7xns3eoadrge0lces2h8iyu0mtduumddw6i8pdip43bcanl0djn8ti7tohfe4htrxt6t15lcjxoyiam0pcf87a90utd901wkq4dfg22ujiy5c31lvw5o9fcpegolzsky3398viavhpacvofuhwa9uw6wjo7gt9ml5cnn7l25wnom17564dwrr8jlo75pnwulw57o64f79ok9xrvv3k1g4gg7gs3si4tmzn9bo70v6onhbave0fx7wvudwt52j5zimqpe1lhc2g55hugj1kseui9blh902pr47al20jwko70cbgdfekjzenxrlantdm428rggkfjvpz0ao1usug1ytmuhl815zkq6brj5e9ut5yungxyruxe1gowjkvb2k37bhgcfscz7m3vy30vk7og55vl1b0ytxnfe42bqv7gm1ftvy78akbfmi1ggltjj8whbju7zw4t1t5e0mnl6plzc36g5nh9h7gwbkt54f6ji4zuuvtssas1wgbu9hpdhcvky732opkpin5d2roxx0xicnx887d711lemti86oh8bai2apqgq7gwnt39f4s007kl64k4nc3kzxbqx5ijix1chhpzrcldxqsegqlpa83p8cs9vdrqhaygjxpo28ag6n14d8yfau1g7i8jwo6mowhj2qsncvfvgg4catsg3acmzl1ddnqch1urkc2khqzf370hyjhfo7gsif9pgak4p1jzmxn4i7q6admsuzqv27rhc32f9zszv8v761it17m9v2fv69pa5det20egvigfjhyvl0v',
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

    it(`/GraphQL bplusItSappiUpdateModule`, () => 
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
                        
                        id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
                        tenantId: '436770c4-6933-4d1b-ac26-537708dcc61e',
                        systemId: 'f9988556-2131-4373-84cd-e987a0b26999',
                        systemName: '4tqwbymyf4rpai0wntyx',
                        channelId: '02e94267-39d2-4a9c-a6ab-de074832770a',
                        channelParty: '59yqhy5wur8cmu2z5bh491ennc91921xkko86adxuognppz2prvaylu40a6t7dcmbefaoxplvbey9jamugg5nuxxbdmhzfedfusjt27fdsu4rzettzchu9izpwvn5vc8zzq35imszqbzrvltwh2p3oh1g3dg73bs',
                        channelComponent: 'yctzuogmai0h07ycqvrjy0fjtk2fwxm8kul6zglc3jwxaiii0ldqat41jvcpkc37b7rdji1ablgkk7cyluppno2jshqic4v9pzz02illd51gtgtv4c54ijqifxj54ws2lb8mi3t0q5thlndlj4yxs5s8mzlz3361',
                        channelName: 'k90ngzec2x8uifnnjvtj4pg3r3j8wc4f2we09eymti6mo1gaoe9jdt3p563lg96z7ngof38z187u573qad3k3wjciforja6f3tj4jd60qvbp2yqh7a5gx1c9pvek8imtbdckjg5ujr42kthol0wy02zwmb2l5p8h',
                        flowParty: 'sgp0hzfvx5umvvx4beg8yi0g9u36qzr59p7d7e608d3ij7yin4hvrgwe34mcgo6x9siqr8a2r17fu5s5qg0vwikrywrkjfakrqemxllvu3r9s0ojvbpxp8azcab2yfjny8pqisgkwhtptptwer5jj3h8yg17ur78',
                        flowComponent: 'd3mkfzyn2pgq19z2kkseezm3rzez8s9zwk8w8blm3q9ye5ac1tbxzrdyjpx6pk7sbrxjgz4uwwt8kjstki0kftgc70wp8ncxohw6qzarsn0i9ablz08n7zohdz0b0fxbsnobrc32yitzr6bx5sr4z6r33goe9jc8',
                        flowInterfaceName: '79fw0neb6tmyw145krjk6bcwkjvb3pyvin61pe1g6juwbhnyw1br1eculpl3rv01gad5ktw4l6h4l0qbghbh8aps59hnfe6se0mebkg99w3srits02ixrliz9a8eoqmlg4xj089a541443oo2g6xnj0zdsotelzz',
                        flowInterfaceNamespace: 'hzifgzdexhtecg22vsuibixai9975k9dkykxalr2imdepizs02nhsfpbq7fti25755m5k0ik1iz3vxuxtjollxsdjr08im0ewaxisjw1a78r2bnr8go9mpk75zo8w54uacqr8fpvd3r5ladsdpkdoz53e9yx8xl2',
                        parameterGroup: 'lq31g0x4cr4neintfhjhz3su0za348b2nk7w5m35m321dum7qdrmkdg1jvluouy01whzfkqbx0f7lkf3pra33xmqbst0n7ipb4662ve3lfwl7eznj68lwi8qe9vlvcrok82lueo7n3mjhpp738syg4ywesn7iv702zorikxs4u4pj8x44kqs9jl4dbrk28z2vqpdrafp7zlrvfgfx56dqq2xvaojw8acmugp4vypokmaow20n4vkczo92pbgtfa',
                        name: 'ug353ghn8pnl04g7lr65r1j9ud9ajv55qiaaxwcjn0fnuhz3qzsam7ikcs7q711hkjpt7zqahrdwacrnn4qcfco9w7i0c1u1jh28i50rk5xs9bqfky20j523obrm026ifhs1kojp3wa8gfndsfqogq7z2x72hpwh66uy6o371l381s4dhihn53ibf3e13zfbzyrwu2ca603y398vlggv7nft7jqosbtokm1tbyedtn4zwwjhsobcpksqxkd5oyca9lb3obhqkpexb3kreak6x1cf0k4fao1k4j0fm3lqr93bm4xy27lwbp2uep2xib9v',
                        parameterName: 'lz58yohuotwsus2ugejvmffdb3uhorx80t0isr6ihp5bqh49dpgwko5mc5ruvqxp3yloaf6gt0f9mb9is3h60lfg4hzsnqwtob9alwcj30rb5c97u7dtv8wj5yxrlssx9v154vzpuqdtqqlx74upixrv5ve6kt6cxr1paic9vbuug5151nyxht0tuq6kcl1vbgm4ydu2ulc5x11bmywk5tuecpzjum4lwnuctvtw91fxfoe9evwr8qom2c9qpea6piuo608nhhw1qiftfgn3erdseza7x5y0fd8wq7w2gsbtfrxmyey5lgywxinit1cr',
                        parameterValue: '98gwjsz5nlynp3snhgibtfo288y4o3wkau7vnoiu7r274dzyvtu5uofo3922715aiyq233yoijg2lyty5tyyibn1vnop364sruilq0cayojswzdl7bd4cq2lahfp7lhasnwq9ylaiskgvsn7ku3er8jrwf5x77wwf3hwvkzkmpxlimhot8pc0mo6u2dl8f07t1ho8rpexsgcocaw1mphvzuyv1dz5mmbg7j3bk9n1jizp7yx3d9xygkqrpdk2u0c1g18jno3rumztfx8kuhobtz2zsjebnlhspi73foinewae3t21rrq4c6uo53bm11ro908vz1dx9t37a1lt7ep5ebiq01t9y63vyrj4xmq737w4i9umbbuvc2n0uvmqdga79z9m3laubioad10lszxla2kxvfwgh6k2pffh6lcib6x4szdtmgs21zuvrel9q9ddzemxwtbjoeuod7jjd0gafox759o0oatnot7zkauma0imle8dtl3bzjr22iuihdrh8ms18n0hfo1xus2cznpp0opcgsdkyjlvfwd2dr7tbhzad7cc900wdqlbamva4ve5kkcw24j69po3lf364nmg83bervlhdeoqff9kp2j3wqrkjrlu2viwhcc10ic7tis9g59ijvfyppb4eqcdtgahlpy0hzrpoiozo6wio7am8ar6vhljmrd1fbp8aifzqclplh6sks4xx7lgpkvpebdw8qeua31gqq0nnxxlzs1hwhu535nhe0zdic1rt7nwwml10qo53l9w5b7zgjtxn6pvflhgobin75pg56bnknzgweilt0nczgll0c4s099eshr4pywxx2gnd5m1hskxqp0nipnmig4fco6dwo87p0xb4b47s8h6y0eijb56tdds9rlq2ltwqm9u4sc7kfdk03ea8soq9le896gyz6eghe671q58rjt2htds5nqg4m8xjkblzrdwlosxq0okdqi59wtuqzaz0lt13hu3d5rniw3rlwnet1loprowujc1q74nh7h',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('0f674ca1-3cdb-4a61-807b-919d863d4c0f');
            });
    });

    it(`/GraphQL bplusItSappiDeleteModuleById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteModuleById`, () => 
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
                    id: '0f674ca1-3cdb-4a61-807b-919d863d4c0f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('0f674ca1-3cdb-4a61-807b-919d863d4c0f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});