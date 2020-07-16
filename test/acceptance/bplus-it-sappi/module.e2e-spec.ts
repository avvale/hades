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

describe('module', () => 
{
    let app: INestApplication;
    let repository: MockModuleRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
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
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: '0056qpoh86jx0adldnf6',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'aww3r5yp5i7gteuo1il3yh8o0u2gpl8haqs21ec6lw9q1wuaut5hf85d6pqjze9t1pvo352um7qpaapyuvtqzf72wnkbfyqzvoww4m7uaejxdd6lfzgdma4rqc9k0j33ag36h7o4fd0qjrz4l5kulff11kl7xkkr',
                channelComponent: 'rgs11t7jc9ixb40bdhoq9cnrbzijqzcah18238jqanjv1iutp9px1g76zvod8ffsr2lxki2ve6laeweh5znap1w371rgfyotlh85jdmxpsjb8tqzdgzy5db9jecgm63txzemrpvihl2u8eiwlseyw39c9r5ounid',
                channelName: 'phuyp8uiac9f82ui0go0lqf5bqkttp0bjr9gnwtpa1ebdby7j98a9dal9ka2q10a68sxyoiwy2aw8lt9vln35jsp00n94ndzz3pitifyo9xue3i4w1s02p7bteemybhz9kn47puofb0fd702k6f4c0vwpa7yug55',
                flowParty: 'o8b0b4tf4j49xbaoezl87myd38zn4hwqgk7hu6orfytlp5tc7w0a59o9n98hflw62t7hwnstg0fr5m6k6138c3jz3iwifp04o5c1h9sx9jcq4vbrx2ie1ntwsuz3375ttlmhiiadtmuasehf0huj0anza8tqdfko',
                flowComponent: 'ke2m9zq931je1orpg0gub6s1r90q3s5vd1x99tf5albdt3tyel48a6v1xd1u2uenv4fmup4qu633m4rbpvnv7nrtcalp8q8bit9umyajm0x8roi8ym6lgf1ap9wuh7j0jd9rfgjc3reboipo9qcunvl1mj6wy9mf',
                flowInterfaceName: 'a8px34p227enmg2g7utuzjg5twe8722s5hv1n1ymp3zwqmu69xu1bcaijealyu80d2yyj3lr7a1gwybg6yiqf9pfwre4o125twtfkql7vematalk776wn9d4zk3cu0svyy0sg0rbus7hnzr89cf1wyvrqutpcqcm',
                flowInterfaceNamespace: 'plhd89spm7s31ut2r1bvoa3uwhax16bf09ro6za4ma40iq6jozlyppk6yr1vr6wwcb1st8zdr0g2modfemwc8lnf5shytn1p128io0as0xdd2ljxloq2hf55qktew77xmncm3bxf76o8oc81zuwhnfdbjz55o7nx',
                parameterGroup: 'db292ocr1kw8u85d6uispqhe0oo1jamsyzq86kd1cb065ypub8ngco8vh5wm4yhzbb1r8db924d311wk5b7nldfzuc2gr7w21oge0zw5u45vyjwkwisqhjzcjzj8i2lyfdgt1iiicckaz7ig6x1zqw1y4i8zzcjgtzrpngh0ho1dlacrrxw509plkql04j0ydel74y9wb6n5k09zi04g55atgg6vgnbmpayoaelwsmmfrg6ltbivs1iqi9ug7es',
                name: 'brpwha0gcmloto8m6h53fqih6ilkned7yl1ybukxoqw9a89knhvcp2jsfi5exu15e8dlxsrazgl3ifew1ed41hb31x7pzm8zijdn71nlcgimnqmy0kddeaxfgx1ioog99uz0htgk5pw79iqzoxn40a0k1zkykoa61kzlih149iqhogjuk7s7yoz7e3jbdiku8kk2tbegw14uwvglno9wmbfsantkfk8xub8vcx2024o354bxn5yzjb3mkl90tedgt4bvtmcthxjp3op6uh6w2voma0spjgmeo855q3m9dpbr23c543bulo28kk69ia29',
                parameterName: 'sgnq11khnunxlsro9mxfh2z96cn66zwsntztogs2ssjkqtc2720obg8avjj19d03kf8iijcn0vdnudzt3tuocav7ziqkewxbhosqk6g0cwu4o6qcgezoq5mvvmwh3u7qyc6vxn9eqkkzqf9v636omlxxeax967i5f7u718x9sbumfmfxyhw88yuwxf1vexpgbyv7virpttfcslehgeuiuwyhr9pyt1dloiui6bip10devxhilwb9wtot0b3hxibo3z1kjw224i7hxunsrbo3duq7giidkql1gcpw3oparsir7xfy23oxfg5vb9m0s7i2',
                parameterValue: 'wel24kzzz2jfz15xn0rt4it0zxoij6blifwyazqm1sfen6aai5xx4fqptg5r2un4z2dyys362nihq823y5fmzls31dwfhdchghg78v4hefo0wuzc0wfjx1nxail6l636t6w0xxe2lwpyz9xnk27nw3ytl5howwayvy3ugwz25c3rl6wwok5te7xnabfuqzs4rsihbjoqfpmz1pljlqgm1itjit62r891lgborfw7v45sjbpod1xuzgchxlu274ah50bpzgiyiiakvzkhyptmv29senodvd4x6nlbhu4biydwqkjl1qi8jhgf92hhw25jt8vk6c8s26jt9d56hh4a9le1hmu3x0cgpljskpy9ozm2ilnecqv79x2i6z7iw9bdokof50aknfixl3qyl48gp1fee3xvuxq1zsxv24dpordces6t6i2xe7ckpqci4w7g223963vod3rb08hiqzhfmi4x1mf3t7dyszbc65bkhri2ip2th0eh3dkl93dxqspzij1f9qrcu41yfgoh9lmmfoc0rlzdii1wge5t16s5kdl7xw72a1f040c6hocu1likauw2yfkathqisnmcu6hpuut6lgpn3hjxwtobo2aylwhgvvw0i8po3i5jgo3ms2bytp18agmg3jvjfe9fl2xz32m1pf28x73hy8rkc3mjnbnms6dqr7hqrx9micqeserif4tx7i3rf9vlzkkjg02covbb8gdiyqwf2a2xhodc35e2pfpknuagmezik2hppb3w9l9th3qn3jagj2cb3oeo0xitaw0xb7icyn7ys29ujzwtvmcxd1m2by4vr6ewqzsyy6r8cie88cclsrbib42q1k2ynewhf93if39d8ych24ktsz56s3a5omy5spctcc6lcdk6hyhiwwv6zjla7cvim1mpll18t7tjgio63p2hlfav82wd3bgttt19jt9sgi0wjsjahrcak8j2wyto4gkolya7090remy7rtw8rwcia7utk61mx306mysmrbzw0mqd',
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
                
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'jio9wzet3x1y443mo4td',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'n2zty58qplrp40uebvur5kwe1k0qidbixwk8e8edp7o0ld1wn9ro7odmtyw9068xo7njv9ks7suigcpnpdmfb2cbik6w61umqa5auciqbimwdtcamitmxz8gdcywjvrhv5urvy14ak9h17t1pxxh188302lckwfo',
                channelComponent: 'xkzuc1rhlni1l0z3aouq1srcov75hsqjn1kqhiro3z4rcexu1ia4iurnr8rovmisl64c650lfxn8861yd0xq4cfcam6bn1lxu3xnrqh8q84le8wa3mi4n6zt897w2ocwrgjy6npxk6djcccph4nha2stsaq0drfk',
                channelName: 'j7pamru8geik76ow8c0o3q8jobk019ova4vfbystvs8c52kkxska1zapxz9z18pc57by15n974ho1bzq1tgnhgt82cqly7fzbtvuv8nix2kqr6i0z1xsusixidc35eawnzb1dgqvwwhlsxa6e0679o3iwzxdq28p',
                flowParty: '069asoo68bsa4bg4uoru2l97gyi9jf3d9p6914aggsv9274vljeusnnw03jo4gj6qibye2qpr2iflqwq030jvvdiv0lfskit1q3kkogu9olxg0zy431ifbpdt8rywf06k0ewgtccdhnuvojy6ge0d03t5n5m1nbb',
                flowComponent: 'jog7vxyj04vn7ndh2uh3zlwa007oxi2gevc53kn2xfqqlvdwkwp9tzzkx7sgoo3p45t415xkmqtb0jkfdhsqa0x4gplvf9puzacdnwq35h208h68vt5lcyntqcj765ckem79x94u78436cq86ey2co1d2ggez7j0',
                flowInterfaceName: '5cpcsogac8bz716g8etb66ottk89lhxyo34vaefwat7wb4csw6chuidqkxez38nmuw8cmod6hl4uxwdmpoaydgpii9xvto9fbdglxws96lh8zrk31iw0nb28exmc2tu9jvakwaz7fplfzuzpfr732k5pfgzekcwz',
                flowInterfaceNamespace: 'wyahqunyo2dm0d1pbsidbbprfor7xx99shyw5t6aqqenp8rf6nt2ae6htmoqpzf9qxe8zv8cxsx52kmrxea7dd2bkkoxeoidn2e1xl6c0dlgm9ev5mrcht4egecu9ub6126kyvzendi2hkf9p3o162utbtejx7kb',
                parameterGroup: 'vjg0rhjnmwutngy9wfzv0s7nuaz4eqh0n48lxerufn1jr9nznejn2kc6v7o8z28ndxlglqkc1qgsnszm0yvsq9oa8zms0hyfknk9ry4o3up2teoey1kdbxukqhxsww32i8n78u5101q1obr2wtvv7vscock3zpiecpdi77zwjlxjsl8ix8zxidp1a5nh5ri1ez6htzsy1eute7lcqxukyxo3gyfuaz8auw2rfh028sprqmahz70xv0omjnr3ir1',
                name: 'h505550gfq6j10wb56xqhly3mky4k1zb3ergwz1jhgi7hbz4t3ea8gy79rsm6ghu4smsjjztdv95uflmd0swklw4qt5aq7dnfa0q9h26hjwjwck0ycxzxikd0ypn0sni8lhqjqhtpmjld4d6sql7w4fs82oonw0npfmci7y89tm01b457079z7f8nzx0iqmgpxl58az1dcg3lm2s4f8ywxjehvuyjtd2cc4xrn8vx5oxykc9plzukbp70isoka9udh8t0w5m9dpcdtlpuvgdxy6akehnyqap3n42s42qvb0wlq4y6rvel5m417o6mp2u',
                parameterName: 'ejir4nfefghl0ewad4v69r5302zwuyasy43xh5ygn1u47gkzsn6rvkx498vq2095udoam3k6v5q2trevtiht9d371kh8ndf1htwlc52xkw2qmoajnma6o0tjfrksafbnd8vuip3ioveq7qolaknidkvmsh2cram4b1gztfhdjlo53u2uli4rbnegri9bgwyu63712fjwa5id34ddgcm3ia4gb7jzm1tqgkgpfzx3m9ibsb5o26znggab3hhslzqvj6a7ecbewqr2b105pxooprrr73fo2fe9ync1bzl7pl9iavv3macbkkl28d96xiek',
                parameterValue: '55dqkck753bv5gygjvnfik91rl9k1qwg61sw75vjtobp3vznjaerjmsc9fp115e64txo7w6q4uxsz7bem6d0nuul9ixhk2xpkwaj2euuyojwgavel36w2m6ixqjpq6pmpr4vfinuf3k5j0plj6gw9njsdhes4hkpi35dd7yozeyuyxmdes0mg9qzninor7mo7bk3l1u0jbzzttp1oy20n0cwap9cqr6gb6ol2di8d0zrjjdrf708ydzex4us9gqbitgj1snyodohqvexev2ftfkyo4l4xeka7wl1l88rl3ggzcmpo7qi1e11a5a5odz1it7cqt5ubw8vim1dafw8ohjzs6g9y154jni18w6kqlnj1dil5t4fv4gu5o6c5ow1bwwbwtmcqeq0r7u1lbbqhj9kyv88j0a8p1i1xx1q8mxb55cmsqzc9z0u6r7u0qy6dnyr1q00nua99f7rj7hc1dsx7dcslakxsedkn87r5go9vjvvslhxhwz468r9pdmnsl4g0kwhnhj6pk96t2uqhcvfh58z4kradc8zng2zf00mb12pdqlcc90c9r3ks9saywv6k6wmsqk4to03ue3nhycoxpikb7vt2nfyxukf4gewa6tr8f9yqzute20ldvjuw7mub8ep18cqaofjndxdhuvie4mvoj3b6g3280jkesdwnfr0s3r5yreekno4vzm19wpdkd53sekldio3lqfdsou4dhv3251ptyim5kdo5r2fuj5f0d2fm9zveptp5ks98o77lyll49fuzaz60wjnegdj0ag2crl1c9uaar0jl5kjl5735k9zjglmoh1jf09eyy2897738ydf2r8g3q4ss2au6853yx5urait91g8f3jlvwb7wsddn8ykxorrawr7dt1hcfj0dzeldf7r17fdu008ihb49tu5vfwkfxpgnmfx9egvjvt0ock684e2b0zo0egvdqbb7977q6sgtueth0k5hzdlwb5fp35ua1lk03edduy64nidp0a5l2nyfkm7',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: null,
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: '5emnuo58lq23b8bqnc54',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'ebevp7tqada5uz90yjgw96igt2qbk7rykjk4p6924xgvqmoxv26yup24782p1nw4gzfmothzanh5yxsi9kb97o0p90rd7j8q4957zui81743jrdu53m56ndaz8013xllo2q4mpvai284dne4xolihhsqipiyypkt',
                channelComponent: 'oued0uondc2bzmb1g6y6nmzbnsk4wzq7v7w3mfw3xau4oegxyy3cixv6j9drmliju16x0ykrxllw8z8trzo5w01zo3bhqusl0y8zfmrg2fmw77tbwx3o6yez50obr6n3de31yy1fd1bf02juxrei3dm5mz0b9aa0',
                channelName: 'fq86egep324wh61otx0ix33si24gzlevf9jn7bmn6xx41pf7zjcmpc9v49n1ycaedfhl1r60zkniutxoee0kjnikmafv3835y651qbdq17oin8wy5nbr17ernyyi5059k6ed2zye1zjuvszl5wn1tridvcbj5zi7',
                flowParty: 'm5lq8vrxpzg9dfznnmmdwqnffe4hmv7xxwfyvtmdnzn84aa1hec2v7w8f1gr1kback4a777whstq18hjwya0z6gypeob56m6xixgz76e2u2543sjo2w69pir3s10lkp2uzsiyttlva4jvr95g2b0drpsc5cxa0bk',
                flowComponent: '6d5emz8h7t9gqqsjjk4yobrcrgmp0la7pe3paulxqgyloakuvsi1ko2zz1y0ekwp8x92308993lm79m4hl1gdb9qa468ywdk21mzlh0j6a23m29va0p22v6qhtavdx87753j6l1vtcsgwkrmw64veu5z92jvoxft',
                flowInterfaceName: '0ri2xpmlv9ka6w77zwreog9vk6v4pojq2w0af4dj7rkl8h0rslxs5vx2vbp01ctooqcsodlgji0fhotor1qhaf5uzcbeylmiqhp106pml007y11eyzzwxnsbp7bpx1r15jl1c83q7t9sk8j2jzbgb8cklub5e5fu',
                flowInterfaceNamespace: '5w64yoyi1fgz0g7d9dx5a5b6p611g4nxdcu9k2kfv7ymx5pq1d0myycwosqrir122he057xfwxszsqlgtuzs6tk3s6d2j91d7w9ky8g2pvhduqm1tsxtymk02likkycm659v9cdp75gz5up6ucu0hkcgxs0ixnf0',
                parameterGroup: 'nl94z6sw4g8kujizv2ef0grytdu284gejtwyb49rxgart9mqiu7imwirghfl4c3myopq5x6lnc4r95pus0aj71ik9cgzscikou5npp2bu6fn741fwvbwmm940z7bzzjjdvenp956j80cwclt8mveockr43b5x65zhjbdd806sv0836bmga78bhuflgyknx4pgylnyf0m8zp1y13cgik2azg15bvew1sflnr75pbgqkhdhf0178qsk8o3zxa7net',
                name: '8uftjr9b11j4zs1s1ibmpwrx4g9tffy0va3serl66tpoeywytup3mdzgg4zfsneg2113gecz36rguv78xsojotc6tfz1vlebeu1l54b2q9t8q6e7brspt40wb2h85tvg740g7by9eefsxv6uekldxkmk6s4p9ujim8pag4e9k73co0o1t6qvlqleu70l4nzlgv9erttz6cx5bi325r9wlpoy1uta5tud660s5us2eb91gdp7yqdo4nkq27tr7jaf575vmwzxqcmc52ta1839cx2pd6qv1hfzxa6j6hpzx2ktcrge7uoth1k7bp59djbn',
                parameterName: '8n2w984sjmqcwrrxp2nj2nud1odlybhda7854mnr66ro3991r4hrxzxv31ei8o2gbega3nqf7jejtdw5ef7gzafj7qz8wlcrh53i2natw2yskolqq60j4y1u4yu5n9zysi3kgx10hi7w0lcvnzw306pd1sffrej5z9mhglpmzpu8qkqgsr9qgmib7ohuvy9gxzkef542ic9ifzxab2tw5jjov1bke5vgpmnz83boolafwe0kygtzyetbxrehction6z59jujm619grgttkwt751ryxmccqje5jrh38pe51zo124l9praq9yupwlpgshv',
                parameterValue: 'qbdljbi1cqwrsvtr40zw7y9f34ps4x8mk5ysg5ij3w2gqv1q2mg1ss518lmjtaxqk3scbl14esima2x7jp3vsj4vwcpm3q7wwyy36g1uvpckga2sdjak0dtguu1hdspskm8141q7e239x2z6kobf5c0yhd6dy0tjd40dt2q28rak1h1k90ie6tfb8xdmkm6ku1n621f0vw2dr44kh11qcinea7hx32q2s9zulg00ke1caf78tzn838im06ny4wk7qfh9kfs5qo55vgchy7by475a00n5j5wqq53f616k31nut9lqisxmalc5fppblj0dgonofjqba84i84v93utcv1w6l43v1dfgx767ffzong7xzo60mgmsfzlcg305mtnzo0c0rbg9032f3pj04q41mhrawxngw7jq3g329fg1ilnmzu8kba799m4wzenq1weflmryg7xfn09u8pl2qmr5jx2unbyhfo2vmpyqtgck8to2uznbxjacxg3e8c99oh1664bkdd1ozmsz3mo1r7ckhhrcj7sxpflkg7avlcckzik1tjxkalc3bz71mlqnzujhd8ly2wvkns4dedd4uxgqhg0e4wjgqu7pvmv1pqfth4bqnlrhhj81t80i4y102f3rnjc13kcu4xtp61zt0jfm7uyfc95r1l93c3mkb0ez1b6ah6t4wooodn0jer2tb15tucwrxlzq86v69ijtd4pwv5fr40c3cslhjhqzsphqfly7r9idqbau1ov70vioh68x9jmw7h49sq741hddau1ul4jn7e6jxs5yvrh6z2lvc9t6nhzy1dc7p2pss6u92c3cjyvi4lefob3bzn3xlfb2s21lnzv0ahf0tejj281zfdvsi2so44rinqvlqmg523hoaqu8aouf81bvldiyb74hzx0y2xa701p8n8fvyyi04yigi4d2ykej40zdd1cvtzh0f95q4bn3e53fazmrr855juk4eq2xhy9bhll1x4tecx7ylenesfcrrlqq19bb9xuk',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'eroc2u63lj1149927a6p',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: '7yn7hf22yj9r6b2yq565ulo75fjzxlz0m1zf2bo9qfrxphia6mqfki7uraphsgmgsrruqryfalq52nw9887dfgjr7zyejoyvyu6bdgvfn9f44mx0225s7wx13q3an2hp2pk0fsxc0inuf0fwrbd7fns2flgllgfp',
                channelComponent: 'hk6pezv5ry4vo45niq7edzeh7kd5den9qsdwqiv200g9zo6j25u7uihdkgvxkn4thgkoga12jda7rgpi531wzolhwdeg5zypbbhko5u30mbtue99mdtxb5uxx6urkwet8tfqxoow49krn3rgnmtw18k6lo7deya6',
                channelName: 'o50isxjp2k7l30w07bu8ksayj8a5vzj8ytedhvm7uri3viqs6f19gjq5e3f2xgoaikwaax1bxpbox5tslsfg0iacwpzof423oxl1ustmf9jgtmokxj49pypghh0caguvpcdchjx6dziidy37fe4lo399dtljhu51',
                flowParty: 'uev2h2mtperr986pay390ix533isxyxtkobeh9ybj1ithycal636ck1a5qm1esmt02jupqqkyr6c8dpm2fvsbq2t39jupy1ukgc9ivflrvsd925umleqhmlm6ngc7jdqx1w65286h72l82hs09qix9psbrxdau2r',
                flowComponent: 'rkm1qhp7k5qnfroospuo9i5aay2eksv0r34g71i7hahrkw964b8ulrptl0y16me92h09wj8umthlsrpzmb90cwlaysrcz35r973oo70p7rs23tqi5xj60zxerwq5okkanyt8ozkencgj3wgcv050x9mf11iq4rxa',
                flowInterfaceName: 'zoyryziwrnh01y29ngqjz8ve3aiyd7juqqaznyzk3oy5yzhliq5c4e5e1r7gm0djcetip5u8s2zts8fd0kzi7jxiyy7vpi5iplv2li4mj430eikeefjsaxlbbdupl1bqjqh0tlpmdrg7u0rtc1239u99bhpekaof',
                flowInterfaceNamespace: 'pmz6oiiufcq4d1shetknioy80ujwfcevm8awtxka5swgx3nvj9d0ayzr94vwtmt77tqlihzju737o49q8ujr1i743su2lw8g889r3itxrmcterefka024d3lcal1i836jovb8ve52wkj69yoowsknspdikuaikmv',
                parameterGroup: 'yi29js3796ybfkmokckehzlv2nliqqwm906vjke92d83xs4twlsu5sluy3ip7kzzfw7pgvw0176wbd5m2svk5fxcwur4icsr6id2nsbh6woc58aq2z48zr4tl5gm7ijzgf0j3wiv313nti3dbk9oz91dkn4shqsjyiu3j7b2sqvwda37f616d1lgf4zv5rq4hpt3m6840n3i5hsyfj3hztebnf0bixsuiu2odfhfl77s3r5mp67mpkwxgkcdavb',
                name: 'gl26mxiup297b1bet3bltjmq4weh5mqlvw4f8r7qmnhbwqz65e0quafuptofd3n6jaxb2ak6zik1eazi034dl3hv4n0xqbmgiw9h6h4xe3okcrfpn1rtgilznw7su5l0yvdbs82kmqbn8qr3xx25bmkwz4iyydy7yrxd4ruc9368j2ca2pkqyckzqt3ciju6qojv03bm6ppy2fw6bsbntsjynv0o9e4gj3tukbzx98ur5p3y4vzdvt6wvf6no3plimeslfgeddnqqzeqief9g6my4uzg99g62b467u7wz7f0tbhj0e01k7mh97ya3xc2',
                parameterName: '7c10tuw2p5yh64uxgze4nhfyh16t8s3i0hq7yjuj5smkf1x70uwyfj7npsrbsrpvap1uxuf73uvpokp37o1wh83x78yjsm0w12va5y77y9xcxoy9dg3b6bd82928omyjv8rsmuvwd6hc9u1zhgwwpi7gdmash1jehjrsa1ui38rskpkkrtydx93vtiwv0jk5xqjv8fc50ct2ngeneszq3uq914e836u2mon0h3ktdmjiltalxmv2cxtyoanvbk48a8bk2lmro2194lm23s2b6wl9m4uzsoo36pbsx3offw7rbpsyqqoigei1gjw9e8ww',
                parameterValue: '4q5l2ehfado50r63f5amobtdavo5ngo5nvw9ugecrh3wr1h0og8up7x9hov0musyvgio4ta3l2bnjflyu622b7qs0hs9ui65wusmqqx9pmbm9z53f218wtq7egjyzob71dl6bzwd2nqb2nr89vg8dq1kwcq6dlzctg3gbjnkkuazgif0vwgnx9n34dndo6dhwc5v97atc0x9m9t1llip254z21itjfsm07edd55bztompct3n2m1wzwcwxm5bw9remiw1t7i0hip2b0neaup8jse4tvjr4wgri3xxebp1g2nr1lcrzh9bki3tdb4mv258gkbvqlty4h45twiyl9u9ljvvscq840gzfornu0lozgghy2thrpokhjmf4telji91t02t7k4wkpfopkgff10mp2zkxqjccn8sawottj4mht36605vbizw6uquz66ooo46tfikghtjbwqf37mebyq1bfn07jbhylp1k8at3nhpg77c8xtzfdyrlu1a5eut1lrlxbn1hm0ycngsogpkhoj03f4v0bq8a2vvypzoukxnnh0xgxcpj4bn5rqsm7svomlh5jlcwl63qn58yb5bxc5t96g3byq5yb3fdp32dmarop5dvrfnps734ufvmx59i5o3swe4qg3njfaj9yabasukt2lyao7ph63pnx6nswepqrm4zjrq0qe1p1scde14kydobuykc0movk6d17785ot7daazw3y7iz47f7msbmfkuh7sa0q33qcuizpa4aj5lpl8rztvlyegi9hnboy4d7nvz7kox0i5ntdx9r803ok1pwnmkx4p9i62vxndc440fhb2440l4dqam66ms9eo4m0gd3xfb2kmpf3tclsznddqi8o2f2xi18uvizwx5dwj6dxp57ruohexsz2xgr6zvbycz9kdnq581y3zj2t53t8mudik2edcnv55yqjbi9jwiw0c1kmehksoviytbllwi761m8la8aae3v5voz2m38h9a9id7tqqx6faty1azw63z9y',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: null,
                systemName: '4258xcdhdc5z6w62786i',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'ryy3ctlfcyw3lhja379jan7994pmacs6jqcaf7llz2zgiq1fj7ab7ozuwnzltual9p5dlex3q4243dbhu5w36o2yeyfxrnm5wrzdhg22ftpks6bs8ehuk7yq719vrd1gts5tsoa67t4vhb48wisxlj7eaa9v9wfb',
                channelComponent: 'jamcbcahd162uyyw6fkzl1cygy66wng8g212nye5ujzb4aa18w7xm8qcnzjik94y5c9osriobnxvdw6n5dxa8775g1antmipw4c1zuxxoski8yjxxw7ea3377yzr5y1b5w24ntco0sidncnaradh2isc3laxadhj',
                channelName: 'ap1y0g6qsb05lwyzome5wauaturwa5tvlh219c0smn3zh8ixfnogyx8wx2njmln8icf1wqf214pe6eaaa5muot29fy54t0tkq0q05giv5z9mijqc87w1cggxonr6qblx9jv86x1mgob5zjqa25dg9lsfuxcapa7k',
                flowParty: 'twtasita1mizve0rbh2p1y0gdx8rywzfxzj5xsy0siw8zfse2o7wnug88u716fe4npinp1akhuz4wjjrh23d0yotdzskq4cgzao6ewn0279imvc6ssc2c22j97xlcpbnf6zkdgq2wh47otl519omif6q7oxvm8o2',
                flowComponent: 'v0awkexf4tbtcn5alyb8yfrpsuop5ye5l17e5g058lw1thbd9djftfgqa2r6h0ns5aurgn10pbcu5rzh54x856k094s2pgt2qyofhhp75gidbv9yuqgfbavoj3zfte0dcm5cookvfzuwj80csm2vple8f2bnf3zv',
                flowInterfaceName: 'onqj17u1ahwo7p5o8llp6ugqac1hjdz9welhrwmsl3bplrpg181wkn382ljtnq25ltif5v36e72rdaa5sizl3x0ldhvizxc3y4xirhhvq0okprb9jb6xg2ra8wnili63scbytx0tdzq7fllx6b6mqx20arli7hwe',
                flowInterfaceNamespace: '7cdtg73onhslgt2xld29ivucw00sbnib63nksci0h89yyj4lzrtx8sx3hmx4fgn35ntdezp220a0w095eht5m9s9l2qrm3p0tga1eeuwsfamvycerf587yty9245y5kuuy8f8b0yxgvnd7w4cg7ccv7ro7beqyef',
                parameterGroup: 'vabvnjbuqtrfpfzxwf589jd95e53umjpnubcw8h7h16uiue23jeapj8zi1hnq31gaug8ekb85wip50qw71ynoz5tolz2gc1p9tmw9ftd5u7cklh5hoauavhtxuppzf8cnoiwdhh9t8hol7ku1721mxbfx81a13psnmrksl3vamo0i06hxf2mn1jcysuli0nhzwgoijgaytf4sh7yoeve95xotakh9l5pytbfxslqxhuu1456vpqtowq4vpg1vas',
                name: '9ezhi7c0lghmg3vnbqn4y8gq3bu0fhtxueiz2o07i44l8vs4cdkra0snl7kfjyi0ycqmr6sdru9k1ot0ho6adn61xaiefna6u6opevytyeenl4ve3tlf6libzmeb6qxp2gkcdux5q06u81q7a3h0b4jia8hxsur10kkpoxvbijxw78dqq2cmsyb7h07vv34lhfb18tvf60mkotoyerxm6ov8v6osxbeas7j0ydk7r0jfspfv1gdt59j9cinmdi77klvcvfjhqva0py5mqpp06734ibjcrmqs9n56tcy714jakfppvri66evlpv3xy8wj',
                parameterName: 'b4c20fn1ifiosr43bmbye2hp2j3bj62p9g1qp7pzdrbmmtprwep2b7vxnc4kc5efrf1hzepxg8u5omuyizksmx46uqkv1jdvh1hrmcpe5o21f2xltu2pc5fe7bw0cw1ymc8na8fz07t99d57lyfffvxmor9yjzy296276hdv99bwri6z2aj97f0n5w9doh091twpatf6syfqli9w9qedhaemetdig8inb0ujkq8rurb091nkc2m2lr13mcpvews1yps6eml52b6ctpdjw9obtrsq9po9r07am95w7caw1d9agki74qi8skvq9maj5snr',
                parameterValue: 'kxr51qr645wq3j4ktr4lo0fks9oyg03kafx6slt4u9yd0kldpo4jjduy7e6jmur4mrfg058zx9ytr71ohohyr2aidb4ggos7zmuy2bt0qzt5w0lx4fx9kljgoxzv7ql6n2qcmiivokyre2rsycmi8nm6ckl4w02juc2fkm946sbas45u8j1t5pkrmw7m97ycyokifuqw4919hvzb469vvn5f0vfim8i1ztmovnka026c2qyi7kmou1k9839itaymo9f990iafjc9n97hkvqhk7mmrdlw24zysjw2hh2f630onpnmod720qgdbb483h4tp5fccq5mob9t331fk2kro3wl63f8apnoylevt193qy0dmppv5ifyiacig3v55jqaf9pi4oeh4r03q476qk9d9hiviagjw9kk63wttt29ligkhm8z98vu15zoqu26mbs8qm71p3k4ofcubwjuul4pu04bwxigoghp284rtvwykxtus24n8jgzwdsw8yv1y8ncdp3h56787al42cxnv9b96jzo3yrlt7x2n00tfy59zvd2zrd6zuqrvh8dfekqi299c50u03rhejo34qyb2firqxn4edzwhiijws1di9bfdshyyymeeu4g4b3egg1dr2yc6ehatfb1ov264t6jqfg4u254omoetkextyg0j5owioxwnfrzjhybjjxdfqr3mvgxp1bhrlkju8vdb5gl26wtzt27adpl4eo1dnattcbmo4lilczgzyoke2vn49qov80wk8f6s9h7l0uwzmynwju4rb4jb2d37svrq2jj8ycjcjpca6zkcpouunx404fxdngvy81t1oh0otqmuf8f7zos3i8vlc6t4iy6pd6cizaytjtk3qgvvrfmxi2mexn68bg1mkqpfbgn62y73vhuchiav97w6yrbyqv6oaf7aantug3v3wnmqd937iyhhzmi88gb5kbk608as0moht3xsi98w7tud3v8u8d4j6fbnz6ivdydv6oeeyud3vb2z5ipqx6z',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                
                systemName: '144y384e6r0ivi4qopyk',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'vosap5t05x4ud2xf851e7cb4wp8qq0zdenv0g6axoe759wv1fts2jjiq4ojdvpkjug9rm128vxvwx0axeikq37vgo1psb0afjs3xenlq2f43fhhxznyzn9nlj5bhprpf75mjtl9mylfa1iqop69fkfjzvtvogavt',
                channelComponent: 'tqu58arnr8l9ucf6zoe8zx8gkywv6fujpsnjbc080r9h2djiet01ipxudsu479ub7y8mjqpj63vi6b8bmy43vnyg5rhwd8repkb2t1h6kion4z6w8lxgn2vbzvmnbf0k29b0lonm9yyzd1yxuu0vrek1nw280pzb',
                channelName: 'hgzuerjcclbv5713kmtxx9i0r8s2j3p6oc3qlitzq30p8ma4w5pitcp45yzap5z2b8yda9dlq3llktt5024pu82e1qhtx2tipgt18mmlvym3c8date45osmgzn9y4p0ab0tze2tjaq158ogwc4t5kk7755fpho5b',
                flowParty: 'n6dw3cfr1h1b5uhs9qjt25fh77kffz2rs9wxc4z7mb0q2ykyj37w4cp4ua1a9q1r3d8o13uew9cfqkncs1tz2ssak81uihjnmtilzea53ytvys0tf52dlu71xwkoiei0yzawkntrs12x94agoit8r5x6wg3pkzpf',
                flowComponent: 'rcdmqwt0yotlxh5vw1ba65kio6ogdxicv8fuxdcjc01i2u01xildk7nt508e89bsym2y4zqvnj12yc4sn17qb7uemly3ym28lv650tfxr0j8s4hh8prgbm4xz5gqentqildzos63dfyskzsybp9nz0wra9py8f5q',
                flowInterfaceName: '58jp3zvgor37wr2n65rdudhtmk9ub7rg2txondp2hx28t4i66h4rsqjp9mpiita93tyjdp7q2k1gogcsbmv1xw087z22irh0b1gjid57h5816rao713puwuqt9gn6swzrgxeoqpyl6wg9bq5masti8fngnaavsvt',
                flowInterfaceNamespace: '1hznocfnpnqakqfqwwupe6q3p3uvtlv75ialof9c0jkuy2ugeil4ijfc1fkripeec64vuxf4e4onj040dfq3mr04zpp1b87pj5eo9wpospdq4fac60jhl2lspfu2yphp4tsb2nivw4qfycporhodtn149n1opvjm',
                parameterGroup: 'i2gkazw2pk1rxcqbjhu0pkdyjmp4xgf8bsni7exadsetpwhv9p51b8ylm2zpsh0uj9d0e9tppnls92sdh4miynweevdfhzi5vl2w1amees1j67rdw0cpfg1vledthw5jvuku7x3bwett2z69i3mzqtxbvv67xd70rzh99c6qxdm4slkcf9trczm1v3lptzgou19yuy1w74r1fzc8bd78ype4x29pzil48ul3ytf64rj1m0y24be02ou435bidpy',
                name: 'nxlag26lxkicj8evx4qf113w30522c7qjn4hu2lyqpc73hye9vgzz676638n92vgdfwf4qwshpr59f0xptzc1fokep98dcxrwzb9ccjer50t0rtmd93tqvqzcev0vbrqd2hir3fwyphq3zcvbb5akn85mxu5gew47qagd2lsqk08h9pl28hol8eslsy39y6ntezx9yvdqunlce4gw3m2rqrdao5peyfsswmh80koq59g0e4pbiwx6r7iqfzepuczi1e56qwmesrsckeagj2x730nkhtcr57ff648drne80sahjwrd5vpwfk6ap7qasvs',
                parameterName: '4nfzjc2b9y71p815rwlhmjy11g3off6n767m4tnivuh7fo9xco0etlb6ozscwtza3xz211z9xgyt8m8fthz9co8vyrd267soktcho2vfqt5mcabnm9e5fh1nzx5utn5malwthmy14jgla979rfbho20izg5wpap0y5t64yvnsznjcz0xwjrjhfku4pj8emcbyyhbavr7j3f71rchclt3u09vw9hh7wdbgdqnqx4bocpfhdyb8ia1wk95j3fbagwpct1dt3ogf8sp2xosh0q9nc86fgg93r9mcybocssmn7pdmda62eenvul41dfh8rbs',
                parameterValue: 'k57g7j7dau3r5sy8c6kpdlys15v4neyzpgmnuc1s6y7m9r9jfxd3a8byvommt59lb1adaj8y78ns2qb8fgnrban4dtz32sb6y6rsm8piuvarde2mqrf6h4ir0iaahlej6mnd53w5wkbic5drso9buokym75xthtuq8e848iznxibln69tqfdd0z7ncr7r0fpusnshze7ckypyfmjnwvnqehs4zoguuu060npwq3y1tech01vr44gsp16ln206mudaljgop92iwa9purda4fbbjvs4x2kk7fhnfwkxuuy34vbcuninbeepfd0s4etiacp3rfab4awhvyyo284pssk3juc1s9bnxe4qt9qj2co4y80skmzjl3o59qi3k2vw47rntwxcop38s46eveozkl3to3bs1etox4y2n5hlc5ptxwpau2p97h16ld9ubt240po3afhokgzarxfq18sv39458tehe7fw0k3ksiu7e8v1m17j7icd3zdvxlee11ouw6uxbf65n93jkidiz1zqiboc0v4fyko4ptr29ipiyqzxs9r42m0ztwwwow8bsj37ypfdnfptnspn9kdsi6m1s99f7kkasm4nb91u0q3drn1npw4dklxh8i1nirg34xx0ug7ygqqngodc00q2d42k6i7ezy657ikz66bo2myfej6vpctdjwwcmjyw7iazp6kgoiu5f65o87jsrt7d86icgxkyy211nh5nxr1q2d842zhv6h3j0uodsc9is90x3vcotvgx6cvcdtpb2qlilsxnbdbejjsvcm68ffcj6sv85o1knnwlwwy86vfke2duv3xlcge104vhp9vq7stz0rw9g089puimz83lp0afayj9dt23g2lmxttcukh3u0rpkqe72slbb0wz579gzzos9ylyvp7q2np4orjpwhyqhagf870lrsdsnlnm5ffwhv74yk6l6jdpvt0qfhxz4ecwtyr0732liap3bwv6lrtixjnckdzyzpx8nqoqbodx74djsvcblka',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: null,
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'fhon0s7khj0qqkxsrdwy6qjjabnam7rrw85rp0lrzvhw7m6f9jctlfy2m1gimtet64f0yyfqis93l4x05bdam6pf4tu8bhbrvigugid0jm900vdo795td867jeyohnemxt9rwy63gnj32gtz8zn4vyv6hv2gv0sa',
                channelComponent: 'n886dascdm0685idezgpjk91r8jsox6tfkaqxiqdp99kg53e4hli39zie2kg9x4r5wsepxm55tjjo4kr29e1g7dc5yapi23simfftw325w4kubfvnz5bogd5ylat3q6tm3cmbrr6iv29d3ne98lu45jpcjvbh488',
                channelName: 'fa7kym4d70r67yx0hk8cb4h831fsme96wic75g5w1dkhxmj56qm0sipb8n6031p4j7sgzploafwah3vunbb20kxmuy70bot70bacucr7x7i7qgxc2bnrc6u6g4rtvydbzsda9oa6nqdkwzv871s3oxvy355ehs0c',
                flowParty: '7wh3fylvbb3lbb0qu6up40lg2pp716u8tw2mtyjk8794ad8mm50hvra85h7fgpd7heq10nrmnj4mjnk4d4zvau18sab07flrl5rk6zcfblm5qk1b8s6wwlbvkgnzxv6uzytnbwxpqwpq7zdwv0hyim2sqtpqtaet',
                flowComponent: 'vbg58ljujqinecqqqgs2xv4a1j93y631i4izq3wu02p0eopvv7gs29tx502yjqa6asyspb3oce92fhw1w2gs4axhv7zwuxi1yxi3vfsjw9xrpwmh46xvlbilfj8jrmxe18xiadsi605sv8tgx0ddq0pitnbanrfb',
                flowInterfaceName: '3r3mqqba7z55nvnmezon1li6c7pjsc8sip419cqodvslujf1mzjw9njoo8nr18o0h24lldo6dz2r9j7tvd4u8bfyoi2t9p54y9qvbi13ao9b3kpno29cgmmv5ukv3af4gpbhykjvv0acqs6tzhts17nk2kl7cz4c',
                flowInterfaceNamespace: 'rgj65q1e6mblaqtxs1h5gntd8xijisqy801xe10pemdd33ic7bxmlxfdm8i4e5bmtqxxyf7clrh16xfl1lzalx86rqwb5yubp3vb1b3agknknuhulswb6toxpvk2to19gdrhzf1wp0qk3q88wopbduylwe4qu2z8',
                parameterGroup: 'sedpwybiwpcc8jtendeniwa4hekhx59xc4oymeby7octzf8fkp7vtqriczh1x2q3np3ylyi87c29t0n4r8d67kvaxkk2mdu946od55e2j166rx7ek7ko02ppasl9a3y8slo5zy9hno5jl8bod7q7l52gjt2vuymroao69mo15pyqhi9mscxmrkbp00k6t8305veluf4zc9ljfhdbud7n4lgdr8aye2obifc9vcmk58oy4wa8xm1gmy7acjlwye2',
                name: '80q6l1j9035jpp7mhfvmr8j74swdbpwalkjuho75ldcrtr6v4ria3h3ltwcz8qrokjpyj5f6vegf1sg2r97edmdm863lwgcj5fcpyx3epo25x84uj6fyj1lj0mz24jfkx1g1l22s26h9sp9akzouu5h33sq600yh5vq2a31ce9b1h6ra6t8bx0x7y2fdo8b34drlmkfgjsoxp6m4j3vumfqp5rksb52x9715l74xkq1qxlll0mxoc2fa436r9qt5yvfpkj8bh3bfcpf5464tgrm8yqx7aw44jjkz3g7mqdzdffqwdfhquvnryh2cvr5b',
                parameterName: 'umpy47hr4twvbyxhsytgx0quwipsu21romt9d65q92005y5r4jsjebpkikk22os25shw46hws685793c7euip4q9aw06ds4g4nn306ok77j5jzg1rz5mwtpb5d2yhqod0vtk02llrjemgd4nq9bsvys5o4zkksndrmesfrk57vy57xztfzcotz3f9shrzh0h4icvps0hfh8uqwmirpe801o8k7psfqpsmrgg18n60dfke7dnlg123sz2jv3tqu7ehrfx4cqsg0pk3ozkygnqv00gmy8iygm8w0vovi41azndfwvrb3rlah6n1yvzn2zu',
                parameterValue: 'vibquz7s8sz3o8coxffhqdbe7vx8bde5azob3s72n4vew0ej2c3otcxx3ujnqzchtoe9zwl4jozxu6yuq1512xzr7aoa1oin9p3qxqecplczvcva53ghhv74vz91hcm5fhhct2yum4v982fliw2rly1u3pjxhwxu212cvboa8w3ik5f6akukkjfwcndsq6hhxgrmfw7oo97halnk5m5rocm3av0ey8jcvboqee4orp19frmv4r464qau8i9coc8neiap556euryw1arh5cegbyk0r55er1vlayf0l2qowfyjrm105iki93twgtup9q90kxyn1s6bi8awadza73rxurwwewcuj3cirurue3z4d1e8pkr4zwo7lxhkddf8j793a9j7j54qp9d457pd31g5adaaq90rd49n5yv7ymyk2duahiieie88h9e4d82t1dxlsstesestfbbhyh32zu86n19tq7lh7ee3b3h1n4fxz1qlsvkz7gpalwd8zlh1oic4mqatjg7cdcfcbzf2r9vgimofiu5l5fivmf5znwrf6xc8ptkp7h19pnagbqv2d88vrc3m2qr1f2d9t8239u0sl6bnnyl4eeb09zkrko8xeosnm3dy00eej8h979x5srnld0o14zpvwb6unxw8whkbnq8wynyheko3ul9wv75jh63rbtr6rwulpmcqv66cam9w31bx55dnlc8xwxysbvk2ph76f8imj6cheo75uqbq0dbtj7kpooylcoix3zv5mvi840i3jvnrzbszyheyrsi5dcfqz1544rppexcwclb5amlsfyz5vqtcmzhmhh35ytbqhvox4ekfedsvc0porc79lbdx4lhk1mkp36xt5hhsf55lzuabc78xk536ha1771dycg0ih1anvf4vtncibjf3bs8nkboes9z8htofftbqcpu12r9fhb166hhu4kk79e729qu2wrpd9qdo7tdawuwlvlmv3ovb6kvrclv5xxb6196sx5nmztu1g9qw4hlqb5jp',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: '3n6w257rl7iy5boz70dox9ss667iibapzudymhxhq8xrkmw9jr5ei5ttccrx4bhf27nl3ufh5hgkzup0ms90nscjx10pkqpx2xyvz0n7jeqcdjig46u2770d54qg7sxovxdleqmdlt2824y7rd25am10h9om0jm1',
                channelComponent: 'v600n5lgz9qfelepwdwve5wvzw82kotesy2z2ak313u8guo8iwi909ngum4zidnnkl2makd03xtq1c33v34jwxnrkxkcddpuq2r4xmnt9yalk7uzcheinwfw9klg97efnkov400p5y6vpdhl8qmuya68f1aanptp',
                channelName: 'afacx8ilwzpvij25gu3rf7dqm09hi7mchf82lv75zyqldyyal2wn25iy5f151wccgxld23qns1d84v7j555q2usf5owyztheeg0963ihnfgynp9ta0guoysvvlwz73z6tqrhdn4eacd6z1fhsfyh3gjgz3nifhb5',
                flowParty: 'kv4y8r302c93scibqoix4hc23m5aix9k47p26dhs64d62byi4dwhgq0aass7g9ivkp10y7avjd9b3m1k19ftn37yr5k25z27ioxydsmngrnyqfwlup4ivbdbmp00rzke5gosfqjfglygegozkpxocu9sg78atn8c',
                flowComponent: 'wr7yqcj8gy94xtx9hubqm8czmtd48z5oao2po3rxvfgxs4ymvqik0p07bxwnua7sd71whi8oy57ql0smwefzc8zux9i2hxo4da3ny3wavn9dtu8c4661ed6pnis6orcijwlajbozwnkidt7k5njivb9mhr9ewkzg',
                flowInterfaceName: 'iyxu08edrmv451qkzqlxw5xnno1ahyjawytlryg0bzgxvfeybktpevpkfyhp3r8yel3onrysmgn625w2scnwr70xofyoy0u2ws32488q9qy02i52td0n4ab3noktcr90okijenrj0y3jshlvif4tb169djq18sjo',
                flowInterfaceNamespace: 'n6m2j96awxaotu9egulipw9dlcex7wswjf62ndzwjqgg4w0aaox8d5xr0bl816hj50g2ca5d84mpmqpwzq88w8gzjk7gz0iwvyfssyv6151pyd050h4wr4gcsyhm7cymoimqzse6p4irqc2mu6rq5dv290xbfjx5',
                parameterGroup: 'yiyskhfvxmk2zx4y57l9vr8djgouu79aa7ly3eso5eia71y5edi5vjyiz78w3lq5r20vziazo3c61cd5s8pexawbvpu7dlolxrc5zrxmw2ip8u051orm3xuqpambxu56gnbr0jlf1dahd7l1e4fhe6tim4j8j5dzkfllc7uwfsvic8cqsvaf12zbzv0p325y8wnkfhdmdpw3p07uosjhtsiw67x4npxti28nesa28c2f9o4vagqg2syeecu13q9',
                name: '8ugc5zumwfd6qri3iot2tgym5tqcgxfwyrjdzq9g6shozs46zq84tc49lf7xhekhxsbcmete9vg5072urgcvuizkeb813iw0ft0ai87bjrjz5fbmp1fivziqmaptg3zmj8ws5tun6ylml8qjtk4r9ces2yq0ogp9372oeuk9m5kgy4e1wgi4jfose4e6lqmjlws36pdj17t3h22xbxdn3ahalfeux1sngvgxyxk4emtuc2d8erk5tkuo47tvs0ctbxjyfzqlivga1ac2ymcjdk8ma83bkmvpoa1wk7yzvc8csblq4rc5uuie7f4r2a3z',
                parameterName: 'k2jy1ph334g1bhxhh8kmcm0x2faefgaud9mankb5bpf1zzjephxln72it71c32cwrelooc8aky3kn7eeurfdta9irpmv6nwlfdi3vj3zmfj8nnplbntta2qjeacek5es10emzbbgqa6i4w1suy9wvs16pqlq5c6304a2eqv56kjfj3ycrzy8p6uuawbjl0epaxhqwqjaoclf0udckj3j4n387wl2xw4rt7ac7637xi7de0ynhyc3tel2c7hcxuyvpqpb7dixugmvpw1bvs30h8dr4e305gclfbgukbagaljc15ry7wfzsbu4cizrbw2s',
                parameterValue: 'ooft3uctg7qnic3xru16e80szl10qsv2xf2ypwgs1qjcvqss5curw2bxhu3vo2dx54mmeevzwwk258vqm87a58gpgwepzv20nuckv5u6p9ejeswm0r02h56h3dc9m3gjdekm9hnb506yhb286mhvr3voiyzkpfvbabyolwtk34yd6coe09vpewmyt041gs2imhq2eem7s108ojxt8sp04dkd0cikwd7rdn8ajjggtzd537rt7r6ns80z9isyq8p1n7wihi78ltywcib8d5bbpvulqd1cy8k4068ijmdybsvid10ke7bm39v542io0cgs0w5doqqmj3uuwmfew990t1gwwviz22k3ahxdp6mjssikb6ojydfnxrm0qh8nsj2yipcolaa5yzjpm2wdmsl2e6vox9o7ndfjw71cv7zsmgatqfzv0zbixw8ruwb2ys2dvmu3lyyuy6e7htl18gv12ng91f54rxm9unaaj6d630vu7g86qx96y7dxuxfynx03efgbdx7yfcj1h1hexbatqzvmoprz1eyp1ncbuqhgc7tswz3fcyri29jwhce25saxy27w9yc87o2p98l9m3roj66wlko0kuajxsrhvcfq0n0t7ezdnr3eahf973myay6srldvvoeg6aj6zovw2oyd3sw1pm56rrun9e3tlzzprsny6bt4eowhldw37w00fxq1hc6bcj08zo0pjd79qqhn4dhw4imatd6j6h2dpsezqgha23vvjwzdlpd7vpz7wknef2swvylbfxz3nruk7ivarnm6pc48452i5xdh523f1r4z19u1x5m02d91ztlmtcqagoqt9lv8rpkeuxdxs89co4bkd45m6cc05oplbkeozv9xvw51l100p5ppb7v9r2nwkzdz9g9jhxt4dm4tzx4zq0l5f94i8osql5ksvxux9egp4m9sfcpoz9xttt6j2sixgxs4oazwax2xywxsird8mkezpt4xmvj5x7gzb8qgbzv1cow69vejjhblrvypfeom',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'xnjdgkhgf780ms5hwrxf',
                channelId: null,
                channelParty: 'ualryj23b0ge0aaizuqj2bwb4yqt5owj339frytnjtq6p9yszl0rwb6z4861f9d2b74xjcctws9kwm57wt3alwbbodpeo32sjneuagafm6oj5161upibflhascwwzhtq8j0dfsaio3jjrdy5ucndbh44fbrog4sd',
                channelComponent: 'u7vb876fsla8a4b5ktll7cp72gh09jx2jf8vosv8ssk1dwvfq46j95x2euu6rciczk22rel1e20hlxuodxzfq3mk619htckfedrqfycba80eq00sihum6idmriv82k8dtvy2ij4fy5fse43m4he3fani9jpvoa5j',
                channelName: 'tflexzcwdfhj8a9jodwkriozcesa2h5bxdrnlmn5qyac73ajd7s4kr5lbs0a2mvw7rq947fca6mq432s8s37xg3azxtwauv8wr46bynxfe7sh13xs9zbyjfj7ujnthtmravim8wigi9ga4qy6t0h4pg1fvuisdl4',
                flowParty: 'o8hmqouujmma78upg6z6467pm6r40z02zqb5mcfeb9a6hoiusujky8g7u86exvfujtbi2v7eu8wgz9gav7q1u2fkf8yf2gl57mn56h04jpdd7ecwedlawtbctgugyexhbtrurqw4j5lmub8mcbsiz912o2vw3h1a',
                flowComponent: 'antsh076t79d7m6bnqxcdackoxmi04snjerd0qzyuvg2b2vharlxqbr6iksz4f4a7x2lekck4bdzdwpzm1bzeal3qi5e6t5vutseuca6a6ucsa2sa3h39ltnmozzz93g57fzheafbzy6e9pdh9b6rudaf3eyg137',
                flowInterfaceName: 'hl6d5qu3bwv20t38oy0u1aztz0a4lzdafhp00l0zebno6vfyjm1m24kjrjzo3woyxp5fyighh7m58z4nuez3l1couys7f737f0rypr5salnf3uq57ti7q8tlmfu6goajb0eed868gnbrtvgyp2qym99lc0xtvzu8',
                flowInterfaceNamespace: 'i5lsrhwy9csz3rel2jj1wudesc9ng50jyxrcwlpv5h4hvdzily46nrinz4z3ypj8jf2l2y6uzp823o002ant5iyvhb5ikyy5bq8iey8rn7sd5ya6c5be5g6ybupyhzfo9orz2ohaj9xo4okhomxref5rqspno2wo',
                parameterGroup: 'v87iqh8jllsje2mk4qovle99vxfwir5sf9xcagiqh4uhxxcjwc9fzaasti3e1ib6px8ezvnakyrzwsxnv56pqfczpv3t6tav7ofo33bk9d9liik1cyy4l578z473ge7cttnz7ybfq8c57he8uddj7nxc5rejqws4l68ajk4g57r2hbv2lbk9vjvoocj45238qzerp7zkaz623vc7ncxgke3wd6as5sv34zyysaz30mtci3mofgpiyayiwcpfyzl',
                name: '317inon9ky2r5qxm5tm5cacgmuvenrebzmwl96tyxipvahhtq17d611mtow7mpzr6t3hndqysqkuj6sn6d7koik7lxx2u9xwvfhy3hnsbfvjkq9zt3tnothmwacmogy3e1pa0qgqn5258trq4195qtw2j9zkigu4vcrjmvkc9hivkuworw7q0l1qehxmcw6rar11gkb1wslve06lvhee21vxsr9g3zu8ka1mxsmo9zqhos95fpmon7yw3zvro3xh8hjn2yjvdcdnvp3k1p9oho3jnmieford17oqzhsk562zto1zuyjttqvng1drmhra',
                parameterName: 'iicnpic1ku60qj6l7spf9x5gylscpxkgdyun33zggp7j81tngzxeozzz5977vs2ugiphtp6c7vvii59q0kq1sez2kxr8egua30q97pa99gev5zetky45u0kjcbgky1favvkt2l9yk0n61v9500vvuvfc2893rszu22mjfrzw69n731zl2775ibo127j7b4pwpvwkzcdtxyj5dg7bcevpr7upowp5lzbcmdiqo7d0ny2rh5odnqeosedkjo4c84ornf94tozujxxsopslkfsubze9ic0v0nlo0k4m70x8fnrikau8kj9lhdrvfgjskzp3',
                parameterValue: 'ofw6mi5jc4k1kjvg1cnci53zm30ox2lqp7ov9sddasgvwdq8bcylhhrvegnd013j2z6ts1l3frvp0x4fvtnm1noxfu3c3lsb5c27pin883btq0o52lvx3fgthzevcokl2psidlnkemf43chs6dpljok1elibgbujzs999qhpfi5wfnu172muzjd1uo724esi72fx061qforfgpokh09eq27zxlr71hit4rhuy7feynz0lu2gvvzgdkl6i0ofrov6m0jycl63t4c8yk6lc75lvcx9yr7wngn929mkr97uce63xemc6prdwx7udaobfgmhhkdgib0ljw11t4fatz0gz2r6ni7cqva9hv9pf2qecttnp1wnup8r9v4uqhn290y5p7pmni36361o815oa6u4v4xjcp6ms61sqdetb09ek4as1413uxlpt8h2457m7luyiaq33ao6xxw2gsf9m5c66zng45pzd9kx3ken9ibm2paz269hwofirk31uma0t8u7c2cpj1tlgx7955kawyewni9ghs1hfq90x8dh7k9ecmomfyxa2q2khehrw3ucd4w8u0xt8n3modt5c1cq76llphigrs8e3bmxj999y3twp3su9kxkip0d4smojalup7zj7yd89pnpq476yw8gauzavn3j7p5wz2nvdpui1yusg6t3bs7l5iqlfpb64k5l28nrf75pdtwtkunccclliueafdy5r26qkz7uqrzbsjyeoa4f7r3mcqi79mppk99tfcd27ybeto6aiytp1k766c5ernlpixrmxp3to03xnqtfat66i20zunc68u4c4jfqrm05w6eyh79ra5m7sgzc0hnbyhq9ce0yf5b0io8qb2ip93z13esmrwotlljrii5rzt9gouf3mq5wa6e4vh8co4qcds58nhv181832dojnunaa7y176uq8gbm1yv82tc7uwnueatm3fs5iu0yqphgf0ex0digro72rd7x2bb7qr3vvpnk0bb1p3jl8p4mh0hrb9yw',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'jgpq8eavdmt1v2zd5qdf',
                
                channelParty: '1p9bkqsfvgmxmj110ou1fi5s8mchjnwl5a1rfjqipvy3p8cey2wf9skke35vjyy6zinslfz1ytx80h4nitzkxtpofxnryydsmzo5fdnjh8ah4rpgt2wkjfu5pd7tghemzdnp6a39snxdmozfvi8ipx2xcm1rmpnj',
                channelComponent: '4bt6oyllxos6sol2ql60rvmyyzigzrig57767expiszabp7byvftrmj6jce4ogxlch28yqcpc5ot3pybcju1a3g3qjqrezpsdrgf0h06u9o9u77m1gclup1xspptpmzl8gz6q8kpcz3rf434bgpcos9u0pxohsh7',
                channelName: 'q1sgzhht8yoscdblcnj155vmc3od8crtrciyd30yzoy89pvlgyue2rr0a9b9la9q48qbtt2stb8xga4qptvh4tdiadlq4qnacrf3i1dss0ml3miaa3rsy4nqp76g0e9qeszine9etwk4h432d1mu85rebz81qy09',
                flowParty: '7qcj9ckzqhm1dvm47aoe0jf7ej6oniitsk47wbck93rk3wf656kaalcisurmm8dyt3jtedurwfj30f02v2na62mwswm44hpsan765243o6ti6ufgw09ouyk8nigkdr3f5gixrvz78qkegzb4rtszhu5ssqhruhqn',
                flowComponent: 'yx0fml0zm7n5fee0bsehb2q4146uvtbqbtjz4dnpetm7z4ez58anraf53sd35hyhrq4lz1i1rbod7azfoq0clkkutgkd4v2lyxjicd5oap9185kt6rllb7spgxonqwhtw4qkt7swy1emqlh5nklp4r5hmfvwj4dz',
                flowInterfaceName: 'zp4vjdb8herjgshkqcef07cizmhbax0gayc65e7qkq8osem5s9iw3seqrlkhbi1uw5ybxtroxmt5yj936w9xkz76d03c7rtw1uydriwn6jpeoa7ki9cou3z2i9wja7z61l6wxftbirsj64hxxc24cmcnikvvfpey',
                flowInterfaceNamespace: 'rygofokusa0k7pxktkiu13pbn2wlr0jxfsc7awiqb6b9atr3gzlhynhbmea5vpjc8cmi0stw77njwjy3d6u21y1i2b0xv6v24tjwh1hf9rafqzwfypg5d0q8m9x0jahe539cvwgxr9159wu4rm0e628vyvlyvokm',
                parameterGroup: 'twwj3xogww71md742a4w2xg6727ju7j0hgnyubzkeay04ouuph1o8e5bcjr6zttsx78d6bvihvsmir52rahlteqy8aw4djtoevyglh53nuwetgddevmvka760n1qoe4inzvvd0zbjkqur3g3ggoxxeizr39qrvi95wbmiufb5xowi38eaupkmp4qt62oxawr26wunqk921qbjns1p4yzvne5uq58krlb3soy4iw57h36bqa3d6adhxlqm2to9su',
                name: 'cfuwpsdg8t3l4e7mr5pge6o6c687k9kbsb1vvev5ugbmikht3yehw89sztwpgf2es7iwp59dfqootn1jmky095d4yvzankfzliid63kon357nykogt6alzy254e9vxd5wi7j1su8vrrg5hy7i1y6r9yf230bl65fbs7o7nsng2r6jlkxte8e0fhhbjn56nnqtmvk25zirqgmtgpvk9u5su44tit4bkutn091ut1e0t6rb13vyewwoa0itkxk7ur4ucmoyq299gsjrjwfvnc7zmwss97w6fb4y54u555c8ldfat4kd6ofgn5gk5tjzyd0',
                parameterName: 'psigo8dvk88dslqvtsrtpih31qdtdxy5bf7i5vgiwkrxe9s1m7oxa34wkizpadi1nkc858c4qjhtnjejdwgqv8c0v4dbbkw5cqqxxefpu96rkjmzzffze0aegy1gutxd9jgx6xxbyltavhghdsxtcaip339318khtlr4qfmadcv5kbb7wydmw393dgtctid7rsu7z8pl1mj4yzucyz0tumtfaxr5q9wf4mmv24qd6qw9ik31k3ys2fid1qssnop69w5d5am6h6hkhc1b7z0y4x5dkifitoha2cfuklwdehgki3k8ty55d5xt3k4yhrif',
                parameterValue: 'cwaneluftpzls0t3oy87ihylfkv81zeee3f7wtsgoc3fzn18coy1jb2zdx8d0fknroviqig21ps95xa3pw6r005ex2fm2vqal4y7xyiifeg1wftm2tce3c9bxn9w97w69cl2z8gtb73aqg9rolc7p0pkm2iylkasi69z3f2igkvwdxgxipl3ce8r6rdblvippp2r83wzwnhsu1zzcija6flkbvjc1kbfz3casijlpeblnew4rate2zatc2l3beidtrwvcbt1ejqritm277bygka3ievli0xgxsuuzn4grdgk3aatobmbijdg8r9tyn5y4lx1e9fcwf073iuugyhko56cnk1vmcf2i9944zde3qabiw5lqwhqq2w02r9539x76ck44akqko4wfzrgr5xpxebkfd1b8agrgwcij6fppgamtktbf3g6fiegfgzsaxdjjhguzh3a551t5aooi1ebhggxamsui5h14k386epx5mf5sgy3ipsa0zv9omerhmnbyrb6hrfbhtk05fccm1w5m48yrn0edmrk4fffgxyz10ugmwzbtwi2aosbfmw8g0u6qrkzo65di7vaw968dz1zkytn9hw93odasbfoon16f91k66zejqfdko84vc77mblsua8f068ypg116y6m05ggge5zuo4kdr60yg0jsgbupyu4whyzdtbs13e1ahrdeeqoy9jw6b3u490urv20p00as2hwqe70xhna9tws2feqkcc47k4hjhyz1lupj2xn0k26i2048dd7nliy4izoc6n9p5k55xtu4kysq2s60rnenpa64nb77jfunsvdt6hmxqxad1e0wqx2mntcn5bybw4rgqau9zxhctjgdtd7qulye2qgexbyzf16nd7y2axnbyqeq06asf64mxlrjvkdeb8upywhbtuw9sjk0r6irpnuxmwdbrtv1v6ys4jry0n0iemngt6xv3gg6szehe0ggjvza51twwtzrbia28pcx918bh08g9or6kx0il2v8mlc05bu',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'gi832k3isb4hxtqj6hre',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: '0wcsv6auucj2hwka678tnz2nyez98u5pj3mbfe8lyo89nze5licjn1sn40o67jbxirolhfo4p9ruju03asi6c90ubz1i29c700z7416gth5tgfnuxwx1diyebuhy0x9of6qdjpufl541xi2siyp60ho32zu8fqkf',
                channelComponent: null,
                channelName: 'k3husznhgxybhqrj0wig55fkxrkpv1dks9e7h4vt8dzxeq9s4v5fjozfaetzomb4mnkqq7lc6061l3b8imss1o1fyopjhuhyybznry5f66egt0d3sfli0bzgjxdsr00acks7i68m49s6cfi0gnbngrszbyob0mr2',
                flowParty: 'l2p543ntnieq652wieaeynxv9ys4acr8eg6if9vrwgofghypzy9tb4j699jj4ffwas9741iksbycj7i1vnsb3uar0lzl7vfr5jqxwrlo5nzaexlapum4pvjk810kc7h5672n0qugllwaw4gwdpic28no0xjdq3p3',
                flowComponent: 'dsirunb00uxqzdz795bzgdgsr7d8w74iurryqqzuzkxrz1l2sr5eqj3omqqom0odvxeww2g4pjkxy5od7s5wfqsbfvk0lhjsywh7gll14jd89qf1plzz74b401lzzxs2ddwl5hna694rl7yhp05jjfikektglhgk',
                flowInterfaceName: '7iq93ys20c45yyg7kwbtydvql0qb4nyyzceieo70qd0a9k32ve7r1bnakdpfo3eat3sz4hiksadl4dttdto32u05l5v660x7fw2t4pqttxg0sea6z7w0r42ywvbla06i136a7ym9666vbkeamr1u00b3iyp353qo',
                flowInterfaceNamespace: 'k0lsjtwp9cdckth6tm4vx42hc26dje98bl75xa20vwymp7520xuv63ryr251hj37nu6s8c548tqv7gwil9p98krebimydr3j2xhudwzybv1e4qkzr3ncw0gni0by148ifuyrpza587iuaynp0f2s6u7e2skb9tn4',
                parameterGroup: 'i36pd25h1ddcvqota3ii2hse8v2ftxc9053hmknojfbkfdcsdsvn7bmsq085mn3gdf7gmrthcp5nvh3t28m1xo4g4i1km3lve65wmraxlkp5dy20cq5t60ce4k7xufc4k5f5zrn8m29noa5nt0kefl0zehg6ncqhn0ix0cvzh9mitcrih9710xqt4k14jtjzikk5s19mw2xo6f65nixc1ptx01lxzg5puy12ogly7duvg9egca6dk7tyweiyivd',
                name: '17kzm2lgp4g0o3e2p82e7ktztnkvwl5nh4fnuj5jmgg5kab4xisomxfrztxbjytvyee36qxtdn276mvrfzg162h5gk8gs4vtz6sq95y84c6vkyh141h9jsov698x1jqu4t50rvegm70flqeoqwjru22mq1vpt961dvspj7wr0rgi1an9m7b8la432jkx9whul0ufqropvkolss1bk71zyea2x01heuf342ank1j9lbkl0xab7of6jeyqggjmnlbcj0sosyax1wkji233em9txzqxwu3q89z15j1pdcsbhwgzrpqswdg2v8kuprf1uxk4',
                parameterName: 'jv9n13esv914236ly12419ku3e76l7kwmyat4ltwfgo2xh9v86axmbkwqa75t59g93a9aiss52u8xiiixhf2ooljzjpwxueh8dghmkfr982ne88frqixy2oq48lr7pfrdx6lrn1xg34yrqsp26hdjnd7iougqjcylappnn5ftr1xyfypqyfcux4143rotlwux7nbpcb7oak8iee5qe9o7jmyq3gvc7lh0gxbvzwvvjrvh45rw9amgpht298jh7xlmhhqhh1urssrkuyo50vbd797j6f14bc2r1bj8ivj0w1ieejb1j94rvfi1e4skjd2',
                parameterValue: 'ilp1tivkw76yxp7gkot2yc83jgfljlkxc4ngclfrlsmv6m4t22mxt7m1f50ila0hecgt8f89lg125u7au0525z2izin9yh9l2ywxmfxtfmzq0drzts4xy6bzqhzbxjxbgrkw0tqaglhv7g1opf68lrbliq1qsw9j6kldj2rwerg708siygfbqhd692msuqtk14bifs6vz5xbztxhlgfb1mbeh1kj8q7jpkr4revgrvc286ld6fxcqgujwivevstdgj1r3fshhm7thsiawrs17rsinev89cqh75i1a0r6vtxvx7kh1s5r38sdntqfjk29sy7jd5c932fo44ex1hnwza9jecutk2gb11822t2kdapqtglgv22mvx1uavwwkh7rjh6m3ean4lig3m2hvzqa9jf0mjncmicncu3lzihnolyhdq61icvn0e4hd909yvm4fvu44hnx4io9i8p1vj84fv3swlh98f9pjtsskq16984sloz8fbcmjjjiummpjtrcgyq555hn0fzig44jt37oodi45ss728fc8xi2k6hhshvitdwtwygoxd43lo8226y2wf6kf69bnc4def64hyvau076h29umbbny80ozzsxd15mq8gtafliaf53dafeu861u5z2fgtl69hd2qzcd37rioy5lmz7dokanq4mj2e8nz2ehrsf9g81wsjmfxsajfsq7uc76j7ehzvpsjllp3jg8zbwkqehl1hp4753hyg5r2olfow4e6zfe2x9sbaduuhfutd5k12jbn4mra49959eg54mrpl9n7jqdru7a6exhncdeu9epj8gpwn6yzkjxwzr894gj30xlq94s22641mr4zn9s127vrbqecyhzsi0v256nvg501k23rsz95cb4schul24s1ao205i6poxwaiud9x3ecv9clvimladulqe8ef60vxq3qw45323taa6i0gek4ifvx1er5pwgygv0qh5ivwbysr37nj91ncx197q17vvpk1lp9cgnmpmflg1whib',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: '93yeubuhu31oj1n0oaeg',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'ri51o60uwxcn25vcv34ty55udddjf8k7valcahi1r1zqdr93035fyw3xzjiui5nl9d7asdos42nrm2ycu4tzn169s8uocr1pqqfldi5sdy3w2uly06o8zzfbkgesyymtw1jsk7uuqqswxl02bicwfoyh14u6jbn9',
                
                channelName: 't3nhveiv80vws7e8bpz8kd4iwzkmlbzki5wqola0eu2d5g10ydn9w92psjlu4co5c743di7x704gmv9xuf91vsbbrkjcba7r91gn8mnyeelsmucs6jat57x9nrbfaxfwcvzpayii03cr17ec7kyhelmpgse87u5n',
                flowParty: 'n4k6rzljjgsh65nl4efe5aljffyrrtfbg26smci1dwq4ky9mhfdud1lcjji5ob9ozzysdfw6eq99nn59160bqwt51p4j69rj44zqn2v0od06zllfanb5ylasbhx77cazlqq4f5dipnr072kk63ejpxd9uymeumxg',
                flowComponent: '5fweh6hdenez737rrdtkeiuif8sbmz6bw17nbbrscni8vrobxanry4ribr7kj78ouuy4pu70um6gvt50ekkfnzenhy8c1fhmwabyga28zl9ofik39a1yq5kfzf5jx0bzjccir1apvyc4u9iok6azmxj00hm14q3h',
                flowInterfaceName: 'dp3qx26nithwfcdsw0e1fao73k07bneiltxmsxus0x2as2p3gxu2lpe4y7motutkolq05dptn0xczirrwr953neqj32zxsgnlg96l9cyri0fzgkkaw43eaap9dyvwmk3afcn4kemgulild4couwjs8y5rinkkmi3',
                flowInterfaceNamespace: '0x5t6y47kjj6gw4vehinp22b9paobizglugiq9ydoasa1csnr5d8ravglb1cubmorydcckrsqqy1vnm432ycqawxrrykozh3qv7xdwah8mwi9bz8nbd7wu0aaq2k1tiyxgezfthd2481llfi6aokflq11cfidugr',
                parameterGroup: 'rt0h2tone32dsipjejz6o78v540dkz26znxemfcw0g58qbzbkecr196t9z7rbqq2svago1o0yqj4zbbjdj1u7mjnyw5jntf4686unjng1a14g9f9emhtmhq6bustx69vw3vhmxmfgfwgdo0n3h5l24dzdpdww5eib3g8s1u92s49rempvqikw3j0wwgaqyr6e4q05rln5rng47sv4w532kdgww5kkv16vg4ds493csjnnbtlwpvam12meokux5p',
                name: '54ngbzk0l66nk8eg21juwo6nmqzmwp5nd66ezmtmu5s3nvaavcvnu8ny9zcbf67oj3p7688m6q4ortdkwigbp9i5b502dx8k6todgohubj59mbmi8cb4rf2amm95xq4j1fovodksmr199gr7y6wvf7njt619ytpend368ysm1vtn5w5xlvzgiztjrrbi0ne9juydmk0dke6dc3b5o6u6zygxjrhppx2cp4wtdgpxlgf8uibf3jr269uzgzozroyf2p5t85ukn5smbzy12ud7tr420fodvr5hjnzfo0hm8wty78xii4gdeujinm97o0zq',
                parameterName: 'v82d4l25xlapi0ye5bxx1jsn3ksgu0tglkoywk8pxgkuzndiplnlfpr1v62yd6jfhcrbhtyqhdo6uwlp31tl79pghpz3xxibsj1n77udbwfak206y3jf3vxrbmc7mft75284wslrz4lpyccvsjy2ldbcxd0c8lsizq7gwjp1xhudk2skm70r4zpp831mnvp12wep6zuzk49xgo837cpepwbhg6e5rs0ntx0ydvl4jx9xgw5q7q6njx98df1jpq91iq0boow36tvewggkqwm28tlhlv93o4oy94wlaye1o9p4b4wwovhmycx914cwymxi',
                parameterValue: 'nceiu9soug9jcliegrn0jk38zf7hloshkr7eet2rvicpo59kui4lewfodkgg0twxxul03g2espnrsiw85k583ru6u4d2kdfuxpc6spwdpnmiz8rvbzwqdij7wv9bfmplxkn1jr64ayj897cuwcoj1yluafcide5zx2eacby4pvzbodhs0v9kzpzy8e8h3zpi61os3ek2luocgg9pujicpftfuj3vtl52mw5or676teonztzzz2wstxa9rub71ok4bm2r7af6tw88mc0xq3ks0mxeqherjq0wzr33vc57y7g6t4u5z89zptgxf33dm595kq36or2wjiktacx1r0r0gorvs2oupnutx7l189lbwenok793xjzolhtkbwk9qiy1jt8j438m3oxqkazdgofsmzzjz9ddhoksqkeuh7xiv559ydnp45o806fvfr0z3uu4k2unoh0479xm1l41j031xuhltdy5viwqpbhri6fyesap0punhy5klxqu24tsnpcsr41r241o1i23yd8pzxqcvftl5aeksl8ifqn0tm65pq3buzp8gaklcf5j5jrm5ws0zh8m31h64oc2lucffo2uepkpqwpu5g7zwplyc1ali7fusrtyzf61on1mo4x85kt71kvw48qhf9e8sa3jd8ctnoft4etjljmzr06w95zslqhzaoqw803tsrw8yt56lscljrxoomg4xbecb6599htu5kgpt30g5bbjbggdzvhzkm2x4gwwzc1hrrdfr7npkkmm9g9jb35tt9ld4vk2gdcw6oci1fb88v9ykh4uctoeoyo1e49hc562d0cpcxh8spxq2nawx8swui1tljpz7zldimqxiw1nmlw7e5t2it7jkj9x39nlivu94gsc8jhf8wihi904at69nq9eaqo6jft8ghbnsc9asf3phjqz1uu33aewl9n7yqtnlmj7zye48h7r7wnygazl3q8o76bzyd35i54w9i8yu3etmre6lx5za63nfyvy24rqam26k8nuyy48',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'f7qfnpe53b75c1ms4c7t',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'y1qum5updwfjuibnyiuha67bjqalxpz60s84d00u5qf2qld3mh0zwkrg64qaidmcv03yl2x091kb83yevw7pj6z1uss1s0z962nxpy0fv6ip8gg0y1y9hwfzz0doqavsavmy7ai5del3xtdem2qt7gi403oqhroe',
                channelComponent: '09nmip6fd7j5couqw4zq8kh1q0x0ygfvvy7qum0p0bknigf65gx8oa4v8gk6prntbcflb9yo7ot1uwcgpchoxu19qehc7gx31aful2h18xu4kyiz0rsm33fx9obvg80xvn26tyi4b7ovktfxpaq49six35e4pt8b',
                channelName: null,
                flowParty: 'gdii1xw2sb1exgwmzzv7evi6ou9zc7r9o78ofrvtmxfsn0wz7vweqi830b4e58ldjldyl6s5wb70ndlbvenk93t9d8ldgv6w9lkf0oepmel2wiuttnln9cwa6k3vjvp4hs2qq9l5geoqk437au1p38oxt6rbhriw',
                flowComponent: '25s7aapcxu9f19sau7zmv7bz56but1o5zkun0irlmaf6mxbcqq2gywfetcze9u021kkhnxwy0lu4ekcyztogc0tdybqds1bal8g39akw9zfo0bxochkid88r69cpinsuzumdbyogorf2jn0w34xn2ylvgefkaivd',
                flowInterfaceName: 'dpdvmctx912042e38s6tgu11cx7oqaqdubah7yuck1a6bjepl5xvhr5ujt47uzm24tmml75ck7oz9odli7paosdwrk7b9jxz6dyogjxokuuaohcaff351g851c374afn8hapofswl2os39mz7cqjk6jhtuvtam1s',
                flowInterfaceNamespace: '6j8iqczi2ssllngne9u4mtc4yz88dvvmrtqs8cg0cp3bqok0mb7ejgv3ezrjryl5dbstfm4iuyeo6hivkpwjehavjrs66jzidrftjqst4z60b831fu6m0ain2bj8p5h8yqh8g2mb9zy6l86r2aq2gy6aoal6uaf7',
                parameterGroup: 'goam0ksxisp9csv05yd7eluzlywfh06r2fw44aso0twnem5z91929j9jkaryhdn0ikdov5unuyyj96spndj7ieipbvw3jmozmo8ohi8erv3fwlem5rxwavc1zqayb1v66lb1rvi7thzov5hej0fiohu89g2qfopwnf2ranjh7f8qvai68bqnspg8wk828brxxo0tzrasspwvil1nlg7w93o30qsgmz0uzstci1xayniy6kmmss7yng2fdghbznp',
                name: 'i942n0wygya8noyh40uj6ey360w8261fvkzgjx7py9mvc87eu4n000ok52ww4i913nn9m1mv1o6wwn1t2v60409p0uzatze7py3w33dprpezoc899w60rgq2dlqdpb9hddqvk20ai1kzwhra5eyhr6urpv6sx9dm0fz0homrr7dck3d5uue0krssorud825lerhanaij70hv54q7wbsfj6n1gda7msgoqlaishyqgq46xhimcmzxvjc7jra1n17igskf019m4jkzaz3mrbkzcgigcxi1clejj8kowhds36tm5s0jglrd45hj6zv2n7ab',
                parameterName: '7j9gqe2zohm1vxqpnnyd7ohiwpts5vueq21fyhxgge4gc55hailkbuezczqrjvff39l8u8bz06w33tnp6kgi6v5jxafpqr3cup7zolhtkqt226axj70wwdz44h2nqg7wk971rg7651ib4771axlfgbkuc6udgfvk2wgubif8tufqkga7zat47h0ubht9k947gjo2zm15w1elcgti7gy853txzdi7c39uo17fo9uyi55c338tezuo9u0zdz6h027qte0gkjlh0wnndnuwg2wzsjcsj9w2jsmmjv26ctiwwv7liez4jqqgaxpr95l4blb2',
                parameterValue: 'rs3h1kyy2al86ejht0o1lbzb24z0k9727e6yw4lqoa1lx2enm52vsbl6i5i04ihyv5tjnrs3wtkma3lxxpo070iu8xv9yijfzsiym8vg0b4269oq9gbpv1pm73amd05m5d8il7lqma0evu0mflxuccj69ztnqpnqd7hqryryiisb2svf6wbhrgkxzx7akqm3cs5jgauusvwq6sofj2hwl3mr14kuj3s2we2b7w97dcjbw53mc42munl4xq7ftveoclgzvhrg84rtpdrngskwhf81vfqkqskuieohnachvbftlbtvy3z31avn1isla5p80ybtp3bi441w32pzj91cwgpty1gqvha3octji0tu8jj0lgmd68zrfjhl89c381efnb6mfda0rd24d0yebnpwgc8lkxb2q0u1vekaf1h76t77a90odlwe8u9b31tdgbzjs1gud81bb14lb3y8kgvp0zwhlbtw2ikxs4dqmubpbhgmt9bw1bt64z2n3sxkt0d92yi4qs2b2p2zxu2wybzf1sa3kyndqek8yrswjimkni2qx3itbkh3jl0l3ck8muwxjz1d12ae9rkr89ywoyx1wycfo2mv0utoang538nwxema1g0kyb8pmx4z03t9vkbn2mcqwaelwmpygqbjnnimdrhlv1isa6ap4zljl1pyv4628wz7gfz81ekcmvx7919ic60dxhwgxmngbn91rnp5kr6y3hy7w3b90vclmc1iseon6f4hdqe4wfchvv3rsunfx271rvvaaek1xt866wcoglfe6np38y5xkbiu7259jitqdqi281cguppfp8uz16xspo27eq90f2vwec6ewbdqrt41jr05ipydh87kp9gj4k83fzo94lzgdrw0z3z0z95fy3q91qudor2yq8oz1bfgiilr4u4zam9uvaetcdfib15qejno6hip4bwo7m8fz98zzp8duezsz1zko3zogckbow47mqoevqmxfq09eqj3hvx8u0ppea5ptaogeafo644n',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'wusfcsshuy2jzex9ifzs',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: '5fi8x7pzrwhv37xg50kf02a5mwtj0loymq2fpia0hw2xw6p4mj68q7pl5o7j5c999byboznrsmn3w6ync67d8ngypd8os9vfggewgroseq84yrgr1eim0d30i5r5bu8e7uj56t4o6rrgedszhwhcqdvsrpmoooyk',
                channelComponent: 'pk9oobexl951de4xogf0uskls2qb5htbqnbtdknyleeud9g5kq46asnnlwipv68zdo326v8bf0iyavqi8adaxpoo3wrshlrpyx3hdr66ul3ntmd3wnn5zfn4kiook9utxs8zekb0wkbm3k23p28eis2d82w2nlxc',
                
                flowParty: 'nf1yv1wek11hyadunyydevpgxq7a739edniue221p7j2xqdzv717jmk9e9rfgoyzf002lipz4zahd53s4417jhdml76xnedq9uacrv34xjvjt9vc2fgof28zixincgxtzkdmakw1g25o31ym3hpgyf8hbgg2tny6',
                flowComponent: '1b0erqun7bx51tetqg3dxjypcb62jz2qwvlb3a7zd4yle19n8ubsk1grwq8xnjms92fbm79mb3rcreph3i79tn9lhjf6qlwuajjele6jz2fbbkjpuno4z1i8ntfm0a86l8sn3vkf90nzqelx2w5ebn8xsb7vp62m',
                flowInterfaceName: '5ot7p27t6e6etx7m87i27vr3tbrdbtgkchb3xhge3s43j62i220kan0tl3tu0l8tdkfi8wieoci5tpwuf5urp35g0e3x9byab06ep7klrtk0ehyaslx5dkeb5mft5j3bzj0afe2hvq1s46v8lseiicksg8fvzz99',
                flowInterfaceNamespace: 'jam65e07ro7jpqygj97jolxt2k6tg2r0onkysotuw0u7sgvrkk2ix7d1waria32h3gtbgvvwb740ukvgymojd8xbhqizosxclx34lknsrw3ntieakb5z4o4j06cduq70diwjrd20fv5n7t6eo4tur7ry8717ldhb',
                parameterGroup: 'ffjhay5r7j7eqidn9w62kiqfq5f4trwpat6bi5ar2f0pcqc7rwoezq89famyn16judpo60kionuf0snbs6r9th77nw8tzy4f8shghvd3vn2i2lsehpmqi12qjv8ygcrfqgxkrbd0swgr6ia0zc66pk16qg3eg5amyiue0m0v7vdjwl3408dwz5eqne53xzao87sazb859ddwo7wb3be0qz2x29jevmo50bksl17i6x1184k2sq0fnl8ykokl06f',
                name: '0h7llrpe9u9fghsnbq0nl3n4h1o5ga4rihi6wcuyka8g7bju0bs6i0qlwivyxi61xhq3ij01hvrqblj61baihjitd3ii6p00xo3v7xjch18h8bq7xyept8fuuri3cf7k61olg490gohmwp4ahrr5qty21c3ukqlg9l6mik4sqwvowxy3haj6do5zzr8n6tv09d82pcai6nl9e200mwxw3j0v33mdc9g9u7tphb7vqtw27x7287n364sxva0fbwnk76tkrtiflqnbwxhkafzsfrw1w8tgci0xhoxunvw4f2hlpa4jbui0hnn0iscxju63',
                parameterName: 'e1qy9l0smfzx6otcglibrgdwditl5j5aqfhm63nc57zw2zkrunc72lujt388su1g0ipn2x6p1eecn3zb2strmmhb80worp8v564is07arb6lxe040mmxi1ea9cxysuyrjrs03gg7r14m8006nr03049oj6x37fbm140y5aizpnumkzbt7agmxm6utcvqzjyn2xttrzbnii0rxmwpz9wb2552bgpklj8clpk579ugd8d9pv6pf8178yazy4sdyutgt3z0ktv3xmy8o3iyoozumyt1g4n60z8nusg0op8ylwxrusxyrxr6c7l9h2mjcfvv',
                parameterValue: '4fxmym1rjk6h9nh5fs3gacsi2qbm267ru1fgfkax7p45yolyb1wvghopp6mk2iw4mx0pxljbniwnpkzil6rhy8z3tf0kn6jlwynpbv0p3y5jce0q2t1nl0dzd51g9xodpqoxmdrhg53vp8p03m6ekm1jljyqpdeb7ibuux1qy016j4elizk9w40odl2qnexdfharm0ytrjfmmcj10e5o0kjzg4gcoa6087itqejztfhgsxzf6tlvlqitt1qk2sd6fmn1m5d5y0f4u2zdcr84r5u5nuh62mv6jp9m1hknuqwse06mi0ldtkrkvxn1vjo5iuoec4u4nxd0x06y66gqsp6g8a2ffnteyhwjj5iwxcavh2qubg7ow5zl5mfqpa91jwqxfc4ar4ho9tt939imxy47bw9cnn6cfrqxjpxp03gwyfvio79z0pdf61b3j9pvuaxz18wkoacqjtbijhpvx9x7s59xflv2mghevcrlilzjf0xrskjzfuibcjn7ie1s7kj9xbpawzlfmq1v1z47wv4yx1ioaiujhiwqh18oein2taeza5b3ydepe3b0pgpjv5qm7hy1mmq61ycfudxvh539gf18tlqjm3jdivyvvgrwcyw6h9qi8lhw3dvqzurclxflcsqyectyxzo086mmw4ihmg4ccvxjvb0s0wa2q5tkdzs4qpcxuo4qlyeu6qna6ph0wfs5umagoj8veabys3y50xbk5wnd41o3rz84ksssax5ijgur6hjzt2x17qn3ufvvl8hzg7kw6qow9cgnxmdig4h97jkqs2vc0ijbtrujvf3s6fiz8ytaw9xdiqdq0yd6v4azr6wc6pb0yf30ff55aqejhwcnz3n04ovqse6s6vc334csffv43vnrldmr2fhrff74go2i0sf2u2mlzgxes4ipd2a39z1e6mst0qa1trkbrk6zoycxif1mxi5zcdxkes9lyrfvzjcvub51czdzqegl0bgjjr9g89g02zytb45pwxg45j26a0jtfwt8',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'n1am956kbiqz675f374j',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: '0q1hykgmpptyuo4lkm5l11saclz6kjecn1nw6o0rmw5vv2wcnhfmoi9h065cqb0exp2k0984juf89lq0ms98r2pg9obqszc4a2hfb4pyt0dbuyipwldsibt41v38i2jmlb913g2apvrv7cgl4u4ivcsgcupxmjo1',
                channelComponent: 'jclf5nfhm8rswu3t6qkmdszmrl18vrli6krd68h4bqsbwflcotmecko828g4lolrx7iqqx8zi6d10s4jbijbkemfea8c0nq4wekutjq0h7q0lqbhczh0ni5n5r1px0pa9bhr9hoamf0ftnqk30u22e9cn4bhep3k',
                channelName: 'ci10eyoia1l9jz2b6gum6aph7aiinbg2fq8k56yuryl7u6m55hd041rliihc39c3b484kcnw2m5zi06oor36wh3yzd51886if490m3wjhgn33hp1e4ca1ybxbknobhwmaqhfbfoaqbd399p2qld68spcrtpxhog7',
                flowParty: '7k8ihaeowbkkws40vbqv4nw2d98gd4h6g6n9j7c0yze7qtthswsf7os5kwn7j01wrugpp561xo6do49jv22bk2dk6sw97zca7h909y1go73aejfk69x94oppo5wrxavwk6xbeyqet49x7wjoqpcsh2ni2sjzwmlq',
                flowComponent: null,
                flowInterfaceName: 'ukd8fsp8hj22iz66e9mib4s1keatg8c51x7s55e7ph442ll876zv70jnj4nhg1oy510waz1tmyirtjsan8tpvydve10ofrr4h92edmvwtzupjnpls9r37k2qudunmw8z734yib709u8g5zy0wi2t3mf8gd4oddbb',
                flowInterfaceNamespace: 'm91bbqelita56jtlwqyuw8md0bu9ksg33rr595pyzscus3pzmnch2zge3dbmhijwyui6odsmem3siot9ntt3nn9ewa7rr90did6t0hf20jdmq7egal8efgb9zfu27fcp90xfrgqjcn65xmvolg0ocy4jmp8snjg5',
                parameterGroup: '68b4bra21a0r3xycx290rf322y890jikaa8i0gf5nv6oi92hbsgwygy0d00y0opi3qjmloiq6ms9tza9ekvaw11iwgotg7n0unke8tskxzy14i5fn3z6egtggsq53ile0av4xfd9862lhytw3r3wiqiic7fws4uyxq2hhtjo516krdpihipus767tezzk7d1fiu8jlce57lv5ssa16azh9v4py9c2ratxxjh0zxjaocudfdc687xwjkfb593ufw',
                name: 'uo42zgh2o0oahjvbbtc8xapwa3pd393zsfk595amue17ut4hm1hne7r269cxblkncwyvdfafu4ywr99ot1dhz0ekbov5ycxi3ujhcgs9e08lkhsmg2y9sl0rir8v9p0st7q97i6ajz0fru2kql2mzk9fi2n9954ekq0z6756nbszzpvgibx20dp6ktyrfjefkg74bg9zgkr6hrf6ae3hyzlgcu9nsycf1kr6t5jojh0vtdjts7qd9exovpc2y0rebtd2certpt2vct8ynoxdbko43zp5i5yjwgjqz47ml55ba8g82q8vr9vcdun08xhs',
                parameterName: 'a29f7ibulcrb8e77s0qvm6fdywbnpyz3f24mmswq8bmqnn78rtfql77tzgdxowvd3z7n99e4c9pc0k8orcmlqbnaclgz6v8o8yowiwmdfx9yfqmtvvqxoi284tobpq27k2qa6ps6u90xxll2ll48tmpq7jrkn9bz0mgen9ncgxe9fjplqd5lon43scghbq4ghklskq385fqbkce086n88fuqam41rco4hoab1o3t0vvt8mjg7dp9uqobursn6wyg7l5asef7or6gxckutem25k2lkdveg9axciptil1hyc8dv4r4uwb8tofdhh12nh9q',
                parameterValue: 'fff4rxf8xpgp24r38ai5094z53m5wf5l5nvslpat5l243q6kkgeawt0tvh5bondhug6yjphchjf0gg0c6mbub2c45a9ymiqpigcql88hyvohsf4fes26znmwely7imtmxlo0pro5s47oi63wrch9846nb2tyy7lof6d2j6zxlvk07v6mzcorldoe6fwtiz119ijtdq38jrdu4xumd01gzlygyv69hx3oubk5vfnux45rwyrbvqx4n54occg0yqyft2nm2fsie37xmv6ekilri3yzga65duhnmogipdsfa7orese9wefx11sq0z59c8l7hxrpx59fkq7clznu1rw30w8v16mg3isvfaqn0rs8h8pkb7ai1y37dlfzd2zg9x2ieie7l8wedlyu9ajyt8t5d50lpt60nuz5ugcbkz4mrrx4ob4uc21441w8p3g8mei6qiibr17nbm72g7dcr344afcurtqzr6oyixnu447a85z2xokmtkibuee0ymmzhhesw2ujb8aybrk72w0x31ukhqilz5qu5gttg0dps2w5gut6xirb82hw4198awofghku1y8jkw8x0abvz93p0z86yuefjoq5qx1n2msyjm762w5mv1ms5z3pbkg2tb5gywuzw2l3648xb7xi6if3jbsgi4lba1wojy99kox29rgsdsme5o8hz3mfw6o670ceblcuczujwd37zqmje2rjj1dnmtflwodqa9ec4pkbgt9uw4idhj8d0hvob8q3aglw9k0nh5g8wgz2skrf2cal9tkzsvuxcz5off2i7ovfegvime8dfgcgx28ktxqxbrsrmyllvllye37j3mfjx6fivrhygru37zg6qg2lk8vtsta991b6k60d87m5tu29x7p7wgdkx2fiqjex9ywb9u2tr7jgkh9gaje52p2obt131tty49nj6bbpdnd09pu6y3upk5fjz7qsqq2bl67ho8p5nnt96kqbp4dqqj6p3pwlr62zzllz123ll1d9sg7u9gxrpb16',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'yndt4f6hw471r2oa65gz',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: '46jjk2ugzjdynz884zapx1rfijj7o0hx4ukt2k7hznmphhzggewhn7tt5l4pslqe3dx24zhj6cytgljepezrts4t2b14uryas9ytmeti4wgtoi4iw90fxz4u1jth3tlnpjal2buxdficqp1zbv0msj6ufiaad1vn',
                channelComponent: 'hj8r6ygs4u6b7hmp4bju2dxewm0ztoi852giu5hjfxdsn6glxpx0fr0qmfhk5zmbhxaildhaeh8snqvj6im5iiwlm3hukzpqqrw80h1g23sfjp0po0c1ejevowhhl1lflymxj52usfu3n0fs6ussxujz90hvseza',
                channelName: '9dc5u8qyzq71gid0q10f078u5jg667r8m610n73usoway1dpye8m06sfb3z5riaoj4ul69qk4h6xuc1qgvhw21gb3v66h62wqn7q0o4xhv0f1usnrzw59jwzigsbpu059t2032pv7fcl1gm7ha00hx0pxkb5lyar',
                flowParty: 'wljlv2xnecrabqfukga2af6p5jbu0qv6k9gaeh3r0ro703gtpqubex0uekn5du4cz0qw11pjs3rhu9m481x0oxbwq12owe4f1w2705gcuvlaruc3irb0m03ewqfkbx4wseeh8z2622o0falt4zbkklat4wlc8q7q',
                
                flowInterfaceName: 'xn1n6bwgfl1ky64ag428nnm9uuyqwb2clanls7faa4ofzl80uru0t02yq0pilybp34r5zk0y0k44fkquhy0bfk6tncazpnc0s53oeondzstng5aixo2nlsayen3jaf3nn5ojmbcefjma033jk97gnanouv8s5vyj',
                flowInterfaceNamespace: 'lneja8coukt1w9m6t1lf6qzin0w96f98mjapa3gd4xi4ilpfz0qzp3y8d669l7jox8zxt5se1eonz6kctedfdnw9w8vk5ws8eekprppaxl9lk4tv605n4sbaos981ssr1fsv2sw5mjt4h7hccwjugqyxwoz44jqt',
                parameterGroup: '8byv49sqxuhpxoi0206l335wotgguajl15wcnqax9ev2tqhha3fvyyr6la7cp99bt4py3whzqadttsp6cplch1rgi669edq6959tofjumuedttoc0iteaq8u74ttf7u7ucxwovqev9kpuxjk3l6xhukrff3cn77qv7upyd94a5hu8ryoag5p0etdc2ki83vt7xm4fkciqvrc2brhwd6ybuzgfym11u5glk615mdenhtefsngvd2c5pkqvxec4k1',
                name: '27xpv37twd3nhiuxe9fgvwxgumgw8913zns3do58icmzyj3k5uyr4hkv132pr7uivwc90pfbzp4y840c03nkz5e2ivm6e1u05p359vkd5bh1o7dbqrqmvsgapd1vqym83n2hvpjvs6uavjmycvbuy592uzrlqxiyow0dy4yti702rki77evqmz8mabnqx2ybu57b4xs3jeu391ogr538cil3x30i4hqllnafz11vefwlqvudxjxvbfi6wxqzbk85bvvi9anli1kw8tfmnwhlfrek4v515aazyu2gresy4z2hds0xzgejrsukxr262vx4',
                parameterName: 'hjemsdxkvw0rgj0pv23dt4q56ccsedg3ebt990ztkfgtsx1kttk3r46qy4fqgxjlq5grzio4j7b7tm478djtc77wddre8lueiyk0hyugwsvonpzi8s5e8d5p2mks50y9qxto2f7trf0webwwln7y0mzwqnukcbdcyexi7ey677hgejhb6id4ul1crv42f7ogf6d0g2p0rwje1elndzchn33ckhfpmmvfrdb411nnvazu82s31sgh9pyuhi57ae54gca3i9iztlka9rm4qo1jkyvuhhrlg67gnubmd0lgkbb17bwaszbpkewwpkhs4ncg',
                parameterValue: '1ymr1d2dp8ktvoh19qe12tvujzv03bl9hbvj7z2vjqu2b2d49yfj5etiyimobgfjmym5oaj2k9g1iwfyuex2iplmmwpr8lpotp1vqrvgcn6ncoy21oev98hthlq5tc60qpjnmp1w6zjn6ll97bg01daiy2fkxa1k7i5ob82eshgnsay6i8sf0b8qb5dnye7jzs9tahlgd66f7yurx8akwdi4w82sdbqnj46bpe1jfufwzi3l5qadm029p7nbxodj361s7p7locfjgn7edles179ntru2hy3tavd5mqwq51gttaozut329f8w8p3kijzxpmsepf7pav2c5fn599bhfhwzhtbvxktqrmc9rovagr17qc2k0ddo7ibvofp1dsevwj78wehgk9ql63y8x88phc5hr7wmuid327p6myu28mzvqivtlloy6ma9y2e3y45y14armmult7q1ixh9n4esa6ewmvgcewftvbp2uxc7sox2suhurq5iriracjb1fj0m0cb486h83fjfm5ok7c4x3c04vjezarx6ioyvzc94tfc2c679uldthg22ujyl5ynaxg0nr24gd4u2rcdxjvfikmvfu0e01r0taw6i51ihnm5gbkyli6z3kpfvndy5uc2e5jpynx64fby480dqdxs2ty6polsisgnpbzpwzv58qn0f7e41bdc8ocua6h76sma4xikv0ecd0w9mmcfe21q77nfclb9mfvjotssmj67dzdbew1rtzsfi19s3kuf47yiaff12t0js4clgk0vdf1dh57m3are8qge00tb1lt2seg938mjo6ekat8t1hkn80xz1nglgrf5p0v8so9lrfhb0dsq96dvlj4mechhu66ruwx1mpfli5cva11a3ursb7x8hg8fvesme5robshpi5uk5rn9bfpy67mvvi3qcu5v3p60esmj3etwd0tr2l4ptnt0w51keljezdf1dzqx3da6qudctvfxkiynhrmvf7vwftiqorzsxm5fnjp0es149cipg',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'd4fsw8rxm1nganhtzqj3',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'tcwfwlb5k3a2ylewwsf0s7693851r0uuro0cjidmqn9t15dnqklh9q3oi62t7aj5asrkl2lgb5e3pyw5bjbg9jwo4lkjtrsoy798ntng18rr1sh9ql4lemilotmj4akidkr9lr99wbtwx5zoh7yboztka1eet3xu',
                channelComponent: '582aq7a7f1ilq7b8enubr4mpkdt9goenajrfbii1r0dkd7whiredkwk30gh0hrwgo7pkut21nmgu358ajmwtrfpalxc6tyt54dpyhxo0hm7ade5u6xbj113nmsgj9alf4e420w9ldqveh9a6f6kmaxrwm2pal6ws',
                channelName: '94gobzla0lftd9n5nuwdpmxqjboknneirv98ourch38ozgbbok3eky27bw7kbc2awjanc06omhy7dmixk56lwj03xm4q139o343lrvt67emvu0zg06hdd66lnhavo2ei39ch1nwvpzvgz5375ymtnkkyr4ty869g',
                flowParty: 'zma1e8ht2j7gzxs8ah40zgzoqp41fla75k1su6i84p3sl6j28pb5qjmy0sficzvafsjeu9hoykdkt6isd311839dopwm6wq8thqbctqjzhp9lcig4kq16tw0vfnr6sz2ckppgi7vtbwi9z6lb0s0uv72hddyubxr',
                flowComponent: 'tmuprbvtmjsbqcbzzp8vo8iyb402172utqdf6z7j89mj5avr525je9og07k1ureupixzkqehth1axios2sdm0cnrke118szo2e49yfa6l9bsac8syusbo1iuy8r1xzm6h35gph338uz138sbf18siyg66aukibnz',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'nu0f2saxiodmbzkwfb0zgeihh4uxxnk1jh868l2nrso05qm7dw9nhouh216c2me0jq92krmf61idwyqfht2th73jw79hp9c6qp0wf91p026jy8c07z80cptoelomxmu68y1sjsuwpy4gd95yg90j1gkfir4ltmyb',
                parameterGroup: '05mdmscmmw4phw6fbued34hrymatxfum0cqa3tuajyc3q941qd2ujc6vn51st9h7dzzstnlre9ftap6wp27bedbj604cwraoq8225ywwty0my43c8h95t9dk9lt3jdhgrwovhxhiqdnfna8b40ky5prlwmo4bz6r7pvh9t8indr4k945e0kwtv0lyeki2nd7de544m8y03rnxjbln8uxdqbsbnk9fz5iymyvlwiuolwow53c7obfgcel36fkjiz',
                name: 'xn3kbf5eql3sudirtif50hh12qwm1x6bqzrcqu9sr8ayfx6wprok8z9u1fnmc5kai7mljrwiftfpm0pr0opbk0ldvdvlka7nc2df87251nf8wjefc8jl9mru47nv75zzg1kzb8pe8eo083pz65m7z1qgw9h3xfk752rltxmktmd40bn98cecypul8hfclyn8j968unmlqde0bw1ix5auqtl14qwqy0dtht6fmgz3w7v16b5ulskncstg19ubzz0sa87bxa0yqf4ry13oa4jqdkuotgfz2u173mx8j6ndf5vylm4e0kg9oxdgkcnyd8yy',
                parameterName: 'puyyhl0y6ssn1dnazhlh0yu7brwfmouhnlo4l0uamqm1cs7p058dizjwozf3e0bo96igs2xzj3csx2ieb1rb9fbukos6gofwi7g2pe39phue78lb75x3z7czcfvzbh06ak6o0tbwrxu2qb5ea8aa00sacs9ctpn8vulur8l75pcysjviyy4gcqqgi43y6rhvrahcg63yr8xx2v6pu46t0ht0hmzh4l8afeiym5qewe3ld76iz0yiv93j22zm71e10z1i0y3r6xbeqbe25sd4rrph4ez8co80jskl4nlb0sd3ziy1wrk0vbe1ejv0f74h',
                parameterValue: 'xkwz4ubdzcytn50wvh6ojjqfsnso5ko0wlvnnzrm2nsl88h74htojtbyc9x88b1a54negtfocubgl2yifzaek8jlgzn25frqhjltojxuirtbdlpk4qnle0jruyu42dn9ocqodzi05ei4n6q2agwny86237rwg9dfe1l5kjn1sw71e7xij0qco00c9tu7cpvb223nkspchhq7im3xripwtjxqx4083gpbskuk3oznrbtk99bhuvofqw5pnra8d9dlykwoy7yp7h1dn77btbkhul2hud4g1kw95tht6kd4th80mxv54dqqvcbejxix97g8hfune5ic9am497lq2il5aolw08lrgnya2jj85ste8fy8p5elbpst07qecsfgpvbqnqrzs4n91yq3gukyhj09mbrm8akni5yy1r406krsfm1a1c1j9jgar7ziybqxg9hwaa89xmxz2bwngzaywoqfodr6njbvt3cowd9dnryi0igthgvqp5gwfwtikmk233ryipqqlt52x3zhhifrdlnlyst1n9l2rwnmrrjwb04hrjd4uim174gyw60t7hku6bwgy3djpiv5d2aghqaxrmqo4zofuysgheg66gh2no9ntax9odjvk12jj33q3z4mh1spsor0ngv9vgv9hqnrafw03e4lr13vykfdgqu1i3aonkv76fp94b712uebxiz0qw7onrynyw6n0xxiz3sh6t6p1grl506q4srni67jgv4v8lvr5bjwvvxymt7gj145zp039rl9n8gjh6urtjksl98nxsavpmg714pss6kp7w131mxfgm6dn2bc87mr5c76334utmppoq8udai94dz59wxo94r1e807m61l5szikda3uvs802jnwud949oy0rdcpx9pk80a6j58726vxz3chg7w2k2jej1utvxx1efn17upwcd0zvtge3d060s7oid59x7l7ehn5p3ir1576v3wkiw3z7o7kzdw2v5h1qyqdqmq3o7hnicw7q7esehzcrzm9sqc',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: '3ilsnoakwk8z4c1xbyp8',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'mns8e6his6kpsw8btqnt6a8l8gmmib5rc5zik21oy3d3ngmkzs0qonp1gm7ynvnzxk4p14n9hzioes2a5yck9t3da6r830y2r0c2qip7k2sxk834xio2pbc7lpg3oimxvxttjmlwnw63cskqgz9wrgug2bwhxwg3',
                channelComponent: '9zazk5ul5kyxjwxrdprz69c9x5p0u2umqum7o8vir0y7gitj8cdi7mrmt2vr4i3kuek6ct8cz01dsfo7x0m3hg9ivf2lzx7qslik9qahq4yt427u84rr3qrwy0lbpz2s4m3tmgg651ctcomi39ls75j88fowk20z',
                channelName: '1fq7if6c405hv9ord9vx2mm7ixa5ri2x78e7wgeu1im41d34mq5xoao89mvunpmjt1n6z5tn8cevrasdoxyl3lfwz2w1cjbd9wn2777awl068k2jh5mkgb4toei73hh9lbcwhi0qlep893lxrfrnv1kjy1wbloc9',
                flowParty: 'v9e7xkbob7a6smxt6j1fec5lno8akdxaowkbm4qa63fbneq1vqzolayrw3nf7758mvom7l8ng8j8rn3v4x8c9vrjt2pc73vxzu1hgb3gxe7d25emsquyspbska13l0wulre56mor74h2l414ndcejq9g149zud8u',
                flowComponent: 'd4qswg0gxy1si30mu1lvolddc6e37ucbnhggm1gcmodw9ebo7yk4993794iu3hv5coqr5l3d6js7205vi1wi6co9ixy3cm5wjm73d8vr6ncap0vguuw4ruh8hzzyup67l6eoexjkbqg34m16eqij0gnq0ay30uj4',
                
                flowInterfaceNamespace: '6874jeadjee6inpxus16xfjzxvlioblj0u09dzmuqc4b9pkh8jqj0y39p625wvq1cfz7mcsh8mxnavwruydqwpl8507687vt27ccas6ay3hnpzjrxwl3kxg2vrpf2wu599joqfk8iyusyjcui1s94f8iwuo5wqoi',
                parameterGroup: 'eln3tzmfb9beam7t1k4eqss5f5u9r9z250juc4osyq4c4wsx9qj2pmvdl5i6pfq0f65r6hle773xjeassvkohzf81u3a7nmttcc8up5abgma29q2kwndjj1jh7oapup46udg1m6w7pu2b0oxnn15qanjz0h1qd5vhgykabefezheaqqt298tk9fo0xit7439dv1cy6kpyocmlebpwfstme3e8h5kxmwha345gymhfuxsiga2x2pgyepy8qadfmv',
                name: 'zfquhuh3sl0dl7435xfjdfg12vnzox50ssm2noq0zqvqnz25qjian2ywoee3mxfx98pc10k9j5gl0ogp6beaw516wkkeqi6p8gtac95bb9wpniuie9a87zj2k76pycioxqw472ilckxt2x02ma1bbpbmj82ob650i2osifh9zzwtkua8y9y85ojtx8jv8eewc9890xm7qj1fpoq6v1rxzl9fnvrx5u2y7jcukf2zuwanck83ybjbgdzddmwqewshny8j2uee61cz3lp2wztlclwmn1qn0m2dhokdfnhtxbq9hiyn8oc91x91mcwa2dlv',
                parameterName: 'smyzlhjbn1vozdmlokpysmmse9sg3mqw0sq7ofbawh44xjqq9f4vmsiubnnfb34zwn6eioyxz4wmhdnehmk58ryyzc12zyavcphq9ydhgqf1qek6afosshfaa2aedej4dzfqdu81bqqnnxg3sygmxia8xntdrtg54wynvsk8jaqyv9rfi1kmypyhqq2xl0wlqk4nchop1h69n3v3dsj06cv0d2f1fo3vqcq47zzy386sc8jzs5ods7yv3o20et3tvq8dhp3r8e0a1y57l7e4894n4lmd209hsntet8hibxstlad800q5sr0beupa0lf2',
                parameterValue: 'gw80l7cy6zn8wgqyq0q4bf14zr1ipg11tj4c30irgzmam2j2egflxcslrvrdnruu3xa00twt6cmj5o0tkhn7srcs1ituvkixwno1cvaf17755bl7xfulu3tmhao8cfuj31nm0zr3nklwjgw8fmtxsz4d032r533z22ad56nqbvfgwf9ixxk45swmzs7xuna2a72byymxmd5mniwn7erl5hoq9scuwh9w63d67cg7lnxquib6322299jo94l6w8hvtbha2ivehay3eca0x7htd4x3x03dje5zjicsfo7oyo8h3k5v33pypgyu7rva0sjul0370cwxr9t3wwr5i3ds59lz9mjaah0lvpuazbmtn5icee3i7mlsadxlqpid2bwxye2959g56o2eeh4swkx2xlr4cwo11k4by3uv8hnousrluvf6zwfk4e2t5ivh00enj55wsrsycy41g0hrqwpoikuko112n36a0g87bt7458zvrx3qom1mto2ls8wt3j52fim9ee38ls3knun0j4sq0x4t4593rr5626i36zfprrq3v9ikpqu46xbz1mk2jlvmpf104byv13lv39zvixj0oklvrdmmbjmvikec7nyobadaspn7mgphpfnb7nz3o953ww6aeoh7ocyk4zqon88tar8dnshj2cqlw4vjkmz8coyqrpz2lf2g7cckgk53j3kmwisop24bgxb34s160bcd5d1hh64p4hxyrsii2e2geoqkiz3hbe6uxac7r8801csvj1bk0isqdqt1e7ds995jvcsb9uvw8mv7u01i8xjri0zqzpm768lf6dsxk9ged53wfhuh0yh7vlzbb0899jgnoq3ytwegm8nazurcedbx0fwqjpd70fz9xyl5ep6zk6e30edzkrxv1cj26d69oycqsjj3ju0ruebkdzi9zykb2h21uut928bb6x3caxnfwj6eke6jf0l5k8a7pma9kr1htqru3fyf6i0tkmwciz3tvquggmmy7cn6q8h2blksqnaa',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'e6wj33utsd4rxk4jjfi0',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: '42gxrpzih935w6y0d4veac2b9qukaay3nxu698r7pe8wn8xindedlc2udnfi278j8whdi77px5a2f8cw9j4ds5j6pzkonknqit9v5wq3gne1lgmtrv6ag2a7pxjvd1s56evzaj9d4l9la1k8tlqcc5dxhgdz3lgh',
                channelComponent: 'tjqmvjjk935qexz6uxq680khnypeepr0n1ssqef7ataf1q7msw33dvjcpn6s8yys1amd08wwm5jqy71vdz7hfk8vkbago2oa9ymjodnd22gnb5mkupk9h3piifiuwzfbntc6ejk3jj7jtmcnffzfxctutz0y883i',
                channelName: 'p2vfo2kxm1geuum1g95vs1cywroglm66mbltfjqp75jv6xdqutdri2aqdl1nd1zgv3sw972q4hd69fwkpk6scr41mn873gmvem486epuu84nkn9su5kgybow0v5smus0v2fcksiq4bm6ihg9hfuj7s7i11zr74x5',
                flowParty: '86ssst6pc5npujqhvzngrx46q8ys4wh797wrpcm3xs0jtn8hjqn4gvnnlhbqz25sogbbovuu6dx1qlb0uwwxsthub1uinxd60ij98gnnpsvs5y61pq3450be3ov717pixge7xlvoavbcz3tmu4obhp89gjfq6aqx',
                flowComponent: '3zsk8aqx5vkz1w34jsd36g9ogta5ul4533bu9sw2j342zwlwpvanw746mu1f6l1882wrcxr6i9ida1f8t679poaxfde2p7surx87fk6mjlv1qul83bt15dl7oz6d3t6uep7l8ob3ksuzah4end528hkbj0yi1v46',
                flowInterfaceName: 'ai3q7kwhsmxplh0m8gn63rovzy5k3ddf22j0qbtbtpu4u6qrye3h64d81pini9acqljl8yghii0qc2ex21vzmz4dnep1wkp952ptmdxw5kldn9rcw3s5s6o60pw6ij6dznp5p2risdgv6x5mxws3fniw5ussbzhy',
                flowInterfaceNamespace: null,
                parameterGroup: 'uglgeup9czrep8q3c8a2i31sa9p5d3iw62fvxy5t5skmg6q28s7xi13mpr6398skbb2c9js8u1d8v1ih0ortm61g4wqn1aeyn8jc3mtobaxrha4dwnj2d59ef7oq40oo31adj472fap2k50s648lm0dkj2m565f7xwvs8jdcosziqxguervbee6otjugrqpoepl2mvllc1u2xzwjl4b7n8ozrchl4777yn3mlws5mwwrxsf7lcnl6yljeyre29e',
                name: '22igaaz65t5hu4qixziosv7qo02eiaj50o0n63iuphe2jlhywre6zgivlxkbppnuuu4b7f06btd92g0hd90xx50ioanjcx35byvwnawynzsf1xb9xf3wljet22dpaany437bpnq113i2tq9lcfgk4ofqimnlejt5ikpo7e7j2zqv47i4nnn0kyi9yme4orfnl9gmba9fd3xrdm7v1h43omrzmcg0f2ib2ca9hb7oj1j8bwi1imzfp25owyir4q5022j7l8ykd3gizsykc9my5n3q82rgx30lg5eqrbjov9mj384m9zk4ado0kj4eyq6l',
                parameterName: '3scpxvz9ix281y18tdc5yo3j71236bugw3nban05ehbpkml37yy6m3owq1a2ssrbukam25w35jt05e7a6nil2xfjkwffzm90pqa35gjrubn45jnxukr3dcv86c5bq42l1ngmgvihpqkg36wvtjrv9kkw5hwj3hdcpws5u4ga3ypnzo2jcrp42z5nx7vpsg9ooa8tds6h416cntint5nj62ozf2m4hbgp1jks1h3e5jlkj318efvejdmr3lywar5tw5h1mzozlmb60sfnscfrvf891x5fwmk13l72tftpuodrfkbxg2mwplo3qr8x3fo3',
                parameterValue: 'lyyxvy0johdfmma85c5hj2122twaoqmceddwdfo0qse1hd825rkzbwi0jm95n22evkfxqjzajf72b66i608fgwsnt5k2n16mgy4mb61m437x2rm6qcva1bb5sc1toahr2vbxo4k8644863gmbh10j44iqzq8rtv7ufzc176z5cl36gt88xx8z0xdpk0yxfw9e95pklc806svkrl0qr5ra523jj1mefcqgufye2ext2ymua8st9hpduiju46jfvjnsqjzgogrejc9zb8l6eufepxshsajssivhj674tpmats2774awny7g705ss68oqal8kiby8ygy7s7m6niqsbt21u3n1bdn1138h1kg6jvlwq87iz0kqxnec0r8b4hlqxglnua1oiyung5q9cd59u9q629x9kztvnshplqbd63narm48tiz5yuk1di8s96fotaix28nybtd3et8d9j30gdc3qb814aqb3e08parq41bio9dndlpcwobe5vfp6v5d5u826ezfjbcvqu3xj9c82pjha8lef8no7w2ijqgkaln4tub4qzydgzn6155w6qwonszd7m8hfhn1fdxo3rc3m45oyjegznd0rq2h5rxu5b89x1wsrbp9ngbkq9pi1oi293jduq489u7e8ziynuwkfb2p7bbcuunv9owpep4x627jc8lmgfpsibabikw7yepg3i2xr15vpbaieyp0gz0mpijf3xrfnmubh9x5w8i1uiix33ns3pexogf01rx6bhurxcaupamfh8rjjqfjg8v0bha1v87qqj4kjbzzuqj4etldm8x48cpem0l6tgcrchhdpann12pu878yi6ur9epesa9ydd3tfttgqua3k793ih0h2jcy4mybufof2hg4dmj78xd583j75dh7396nb2dtcakdmubowtzdsev5qts2a5dk7fyefiz2og34gugr5phsai5lt1l3ky9wefh9myql9vatau2i4ku4btce1pie1cgbd26rri77etea30p29k0z0h',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'awmlc4nenmwn0dwg1mzg',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: '83x8wirxsj8oj5pmq9qzbrrcfj09qnw7ecft9wfefdoif2mwdnssgiaqdm6ukcduo3cchbde7a5c0uanq6tgq1b1221uzhsacbronzv9zlqcdrykyumdln7hkre9cs7aohv7uvejhyrda4fibfqvolp4f5w8mxtg',
                channelComponent: 'qgdicgme5ckeliq6dcm02otgjr11npjzdr378ymj89vsocmqnchqmft7sqn33453unb1wpyzvf073chpe46d28w0cuaa6ch4dyohj7wcjektizm8gysbvsivhr9xc6sddcs09vfj0ts3q4gbw4bwdeeta23dkn9h',
                channelName: 'hcl7n7hia4c7wpepgzghndnu9ejzi1e6se8rxjxx6hybyxtqimzaqf8e7x7lic3b9nuhkonk7idmrdq1h4ktikdejorwfr9r8no59uke8i863cko3ty15p8vgvb8dfowya00wwcn77871v94vj183uflu97u14an',
                flowParty: '5obkx2lbw1785ntzpwp47lc6ur6sbfypu36h262pyp51ho8dlwe5jev8yop6kgagm5ehoword4vjgr9eqbb4vu1abva4r4plpwyabncmlwd60gna2t20k3qm15tyydu97ey9i7wahklpkmrf5x70c464lh4tk8en',
                flowComponent: 'kumri4qbx23clp8706osoeh3hr8uj2gv0zavrr6tocfilfjvlq85p92lfjkjzfjm8ida6wf2mfvnbekehz836yfeiy39g2rhq49r3hsgyz3e71d3fcvoaegfu9xqgidqo1cqz8wznw93dduwe5mq1zhl6kfit2wh',
                flowInterfaceName: 'ufdiurbrxf3wgtrsoafsolt86kihmbpujc5trf4suenbc07o286nvsq37jf12fdran9hztxyxj6rzpqh3l3hwp2ir43n0al5644p8up55item42q664htnovmc6xfbu1w3pckev7j4khy2sx34bt7o3ahk7q4c4i',
                
                parameterGroup: '0uixdyvtw4twvy2lpc4lsyhza6uqpnhnbygbvtw3mggjt9wstntm69f9uta6rxlz5kx6vf9vdcvrevp49cgyy1ndpi5vjxzsb6cki94kcuzjcy3zitvtqrrtxyfhnppw4awq6v9l5jmat2t28u0srkm30c2hokiwhahe8pqtyo33okhb2ha7lo277cumc5l6esnmq0szmbobqlazq771pw4j7wyng9ft4lpmuawkvmd0qyzallhp58738a8qs81',
                name: 'im90jtwzrp2o5rut9smb905mxxds0osqpp9btexv0sip5sb1nq1kspxvm8jcjsm5aywsifxnjx6s8vkunbwyajlyiexo75kuy4cprmangv8uc9trb02liqfh0hxg4ucmt2esauofi063prb0bz39j8q4tjijc9kjjq5wo84mrfomsugn0ity9rs4kzq4ily989xt4uul3drfkipsss7n5s1rc9mehk87s06tl2omn8a031up7ksawvqd9o9wk3zxcnv3fmt7qdksyy2ptge6ibjd1677zr264kcp1ncslcrjk1ag954y6q6ia522hfeo',
                parameterName: 'iwtokjm14g1r59s2jizwqxj5wrcbelz9rvv5qqhp84bjeyw1m48knbadp3xfdm64390t1o059kp7ciw9koetuboh8sh3qlyit1q9t1yhe7kqcxubj60jtds9xt7dc8ehpuvly8dw5v7w445bstk2nn92dwmj5nheols3obf9f2xo1n0fdw1qzjda1ty1ss6r6nf72sg2iz516s84gtgk8x9gsswv3hynz3iqgfl23qm54lx5zyn11tvgsb698m0fgvl4if4byvad5yli34q0mwrsrkiohfksmkn9zmaaibahk291ra86xq854ho0vhxi',
                parameterValue: 'ajhz4qepmltcg874lg89a33v0n0s8gfoo23jmkz1hw76z0kqv3m2grfcz0u2bnsxkdemdptajxhk2o51qo7febv139i86eovdjtxmc3f0fl39u5a4rk64bb1fa7nhzrh3v5z6w54fs7g5hlpsyzsgvto3okad0dhoysoghwyzhihx2f5x5smnyxlnkh5rgeu2zo3l3id4gvj6b6t87qbxfcuw74l6bmvie9lk94t3ncv11bs4biecsjx2jdq80rplu62n6qv5swj59ec1smauo3yayzfbk5egzx3jhh7yjh9ez90rl3du5qt6l58mzjswy06f5ufyp5kwcav1g2lkwho529do1l034x2ps21nfhftewzlhnf0s13ue3t80099uxauzunj4bq5c329rqo3q8nyafq2ouucvza93kfo55p863euaub0wjxfhqdd0nex170dt28hbo32knn5qjsh68ypp2mwg79y84eb920o36yv8w3f8uevu1unzlzj935rxkcfcsp7chulylnamuljgpqe66fxjp7hdgk673wrpuhyhk9qtb8bk7906kwt9yn9b29hv8u8ixxwsigztcx5cicw8ydm4ju1iqkgu7cfqgrxs9bn4h40kd76xzc0l8osw4mvzawveziu2v66kyxrrul2tcoddljfi4ac5a594zhehsklxyxw8xgzrbm8sxefxqar72fsfevi6l2z2bi2ligtkdx1bnm7bte7gwatbfob75q1f4hs8pgdhsevsluzlsb8v28gc7awg43rlf7yor4k5j5ljky8xhp4wkjbmqp5vc0neb0oj2trsn2cz1xk548hljcd9qjd11w2qcxw7uakiebqfvzwbntb9wwattrk09a7xunftasubrn1rcw60u27u0t0k9i4psjgebb6l54z6kgpzjre0jpwfw3w47mnhmvfklucxu82fck5avnw6yl0c3n2l136h8r4a2fp4qquubxtcyuz5xvxyagf5gckl5ytrnyebo3487otjtu',
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
                id: 's6xsjc78khwzjp2xxpa4ihf9l9bnm55c5j0jn',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'iqc7owcp2tk668vmoedn',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'ytq4k8vr61eckg0eckm9zwbdkhiu70xqhel9k4a4kxvt5nfq0tvglm91zpp2uyow4nnl6lqhb0jf2h604x9hvalrut295os7j4tpuh5ehzfans40fqjvsa85x25lracol81byojywdg4bfe3oex031zataaavdlv',
                channelComponent: 'o1gqxqv18k2vy1lo2yhsj0ssw5o9vve71ucn6e9rwx8ryt10atvqysuyiwlw2k857gd4wdkft6s8fybqp9hnuy8tynlgmgzy9wkfi4v6n79gmnhftdz37nc44jfn3p9fjhsib6ops85bsxqj3abvnoouvrapcrsg',
                channelName: '6cbpo145e8mlc2zq2usu1tfa9bk4m2uumqbpegr7cltd6rv58zgcofdwn2pjsfwvc3b8v4ycbyh8qi5im2455d4d39nq84wxe5qparzj76bfl019v4euhlirq0d93w6t7x6iq91hexb1a8h85j52y6l2nq5bqufp',
                flowParty: '0mhcds7noyw8iwbh8uy8nbmvc38vjng6a9th9cxa65yrb67p4lrvzohn5mutlk7vxvtie9l00qovr29g9ay4mu4irpcnkra1s9xqxo1tsusztupghvi5n28ek63aw1tf2uuxbxqcqden08w65ulfczjklwqgp8jh',
                flowComponent: '72knx6rab3au71b2yh508p4qefbeltlnrb11qieski2bz5dk3ajmr20ypujch7he4iayvuilz1b0ibw8zati2vn05on3qoxx8e1n24dqlfebyxpq0y8zgykfiee1xhdlngfsjnlqx11mkiq19qmk911m3gqyk70l',
                flowInterfaceName: 'co1zqd3c1u78398nao33gjv9f5dd7c2lhepa0mdybaqzvi1nwrqipk6jnpx5ua4u0jjx94o5tj40qd3w6xzaguki6rlb2efxw1l5k0hqyloz3qan0efallnnh6d17xmqf3fzso5a2zl09g6yh6y7g5ipw22opu3b',
                flowInterfaceNamespace: 'opweg4a35d5v4x59znldc6nt2viuw5xnayj42sgvoogkycsphdm5mpr4tr9jrloapfmyl5d33kmnwwrmjkflhtdto054c124r2i8ju1hphmq818dg5guens0z2ubgrv2d8pb50ii7ki5ek9088zsauzqmb7utr05',
                parameterGroup: '1ljwzkz2l9zs5ko09lyrln7q1i23h1pcp9qooq9w00r9b50vk1jjs8gg1m193dvpmc2zxqls5awntzzui3enc5m3fpabddlny3enn4hkxxbfu33cajxd2mwzq4nouyjd225lbgygbnuxteo8vgkk43eh7rqgz7snw5its9b3nergguokufewfs94bakd98ebarczj41te0rhg7q1f0aokisgzkepcpdvvj2jf0hz381ejl4np0rslpofntpgbfm',
                name: 'vo81thbbm61tbww6d59auvpp1chgpqrq3wz6jxu8xdebbw94qs275mufwpi9n7zufdgplyh2uo5l5wp96em9tzuwws770nfiyqxsg3ak4xn0nn4c5rdv49rvt43zr2megju012rnlvfe3ka0mm6hngb8ni7po6g6vvvte630wx932bejcn26tx59l0j59ek8blakcpjrhv6plqcq02utgechhsqwiqac8xp2y4v6nrbishujj3ib53t1ftkqqto98haf550mcaxyazzdr2d76ahgbx4dxapj2wu4w9s4yx2wo6gadue23rbeiiyb1s3o',
                parameterName: 'eododymevi1rp2akdqgaq9zbiwfarog174lqlscj7rkd8n5xee8wkee9yqhqae4pbsmbislybay0vtcansyd2ql65fos8eqv6d92g67rds4vt6n1m69jpm9o0fro1o31n14vhuz447wee58c8f1qiyxyaei8h1zhwheycicglxqk7norz41810ei8yymzgr579id6llaag5tiigcpjki1t4gpypsvwelfjeq39cijiueyroj5w65ve68uuz3mkza1kqgc1m7xaz6jseb6anpizaow81a89np3ebvmavtrmtjud1r5rn8fmuuw692uu4p',
                parameterValue: '8ft94o6wauez50ynudb7qk0rjsw576crfr3dhek6la1sq0wza8y6pnepwe8kbs3dagtqqvahe1k1rlher0tg4c5ebtnbtmr8s9jexn7g6uvuegnab8sbsz5ep1d2blnl0z27u0f2fgdq1h999qu1f400g03xxsul9gv3njcd6ft6wsj1kt193wb2w6hp4t7sa8cmix0g6j0f2d1sjfkwlyv8aczrmn95k0ehbh6a9d58nfa1p7b3cfsnofi0m0u0v8wuxv7vnnqzybdj8z45pmwhzh0kjal5temqtoujpojahfm42o885d0z69boyq7jqjouq22rtlhzax2bnr1tdeuztt6h794fq39kukjqyu2acvp71l3d0ucw20ru7w6g1nf1qp5vhzn4l4ychy3bdib1zwrrmz7cddrvo30or1ubd7ha3lin7r1p2lr250tcn1qvvbrlvs3coertl94ujymb4wwbaun8680g9hgso75p37jyg6ng6wxtt1vbvjw4bsbcdoacjr6tmt7zqhe3qc5wc7k5ilhi3ft58dtid8dz356bffqlhhvpxdmz264kay012nof0g16tnaqa6oc12jqe97gpjtitfkck80ace8qmpwnd9y6j3yzfctdx6d9bkj10b3za89skhh8961wcb8jcgaivm48e1cuoclb5ek6847l196ajq5f0ptui377nlbbmcwzbvx5eplymz65pw9czupntsvbhwxm081grokdt9jqkk9jq37di6af8q7au7sehl2nr24ogdf8hl0xj0jr1f44r177xx5neyl7f1n6zsp721ftm1q3pdgatg72hgg90jkryd8jeygofeau91lo5fr98smxa779ws3aeu19p6abliyinpm1dn6ky024iiivpntlia2lb19pomdzlk7yakg2isw7l1mnbvs57465p4g02w0a9tzukijxgqzd8z35x06liz5mjgmh8j58am7et7u5wjo33xpg6vq55bdua1jlor5lgj53eobai604',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '6jwdwvel3pg1kmj6dohl3oqsgy1kava6ahajk',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'g2we1q291b9uoawqhmfx',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'o6u1tvcwaeyuqjt36mdalraxjlrobkkhsvp00idwf9qkop1ywhfildidgzwsax5kso0rcdttryqt9cv4fezllqja9lptikh7x6wq5pbywwgtxy98iwrcw5vptczymbz950ca7hozdh4ijviqh18uajaccmjr25ys',
                channelComponent: 'sw8mnx5k2wx40d4nid72noip64io898mu3ht7h3pcl45lda3xxmppbc401d3if260ukm5zpude604dkzse0qyntk3hs2n2ej4qkypl9jldbzdxtlw0yxk3ynhjrkb98tc2ntwx1al8h22ey6otu5drf0r81t3cne',
                channelName: '78cix7avsalrfvsoue4np59dkdodn24xxmwnxagyadvvvj4nrtoexr3iz54giafgac3n7fota32qkvolj2sy7dmktt1dcboco0bjvv4vqx2mbu3wneuy0vp41gi8acgyqqhr3xdr9w4nxc4t74ww101rv8e67f9r',
                flowParty: '8cmjgv00izn6ftvn5uaxmykqhplfmk7pzmg76ijy8a9flam0sqvste9dvpfqm4aqe7490jl9jzvc626ttw88hsw154lthaddkamfg4y2dlvgdhzma7r0fxqj9rmmpfxen2y90do6pspwk95tnts4eho4y2rm47fu',
                flowComponent: 's6jls2w2ps2dwfkuka02q8o9bboh0ptcqhm7prahupfhlph386sb7ki264ler3vibzc7sq6v6y631e4r80fa521s6lt1exh4jxw7zvirvp9ksyywqzngy8kk5w1vqih1xpv3arujmi9pnddpp24uogb7glb98caq',
                flowInterfaceName: 't8afvdatmgkndhwm9j2lp6rlozb1fw1blotuorv00yiwhkjc23bziwupxdaut60k6zy7gjlj272obm5t8sf82s4wvzoj3kcwp56ul6lr51p5gx2klhn81mknrtwww7sbelyi0h7a74nk1tvfzaj5j21pn5en62pm',
                flowInterfaceNamespace: '5ktsrht6zurc3wjldcyzaozf2gumnjzzezrkfk4mz1hsr3xbp9cmu4v0w6xv9wa2upaepm344f9gub3v448ysynzjxuhg2vdwo9bzvyy4fbxusugpw8csagxmegagklmhi6qwvalwohcodyw6jh9wcti5cfjx139',
                parameterGroup: 'dvken0yn64g5w5yzrgv6caxsx1t61zair7yyvnomig4ty0ysu99fmbemm2wdwv7zam9gysec3lxs1q9jdtugmnmlp2ocx9nk3b301hocgfg2nfubm56vy4thjhkggp0eewhl8faexda7tdwa8g5tu0of805visnr1ds9qmvbx9dsr4r8m8nb02bh9iea57cvuiv4ty24ujt3o5ev0s94bw2spdseyr6o6g2107efmeekgeo4ui945p11adg9ylx',
                name: 'zbvux2b8ic6h686vz83xtaqy80vqxa2bc3abghaszihi1p8alg77kqghmgjxaf8mgnoxk7adsayp5gjgvci81hcbf9wkdzaag8vo7h3evuas39in5niz224y4pr5ir47rm8kj6uyvsl0y5fyem3e0lbiylpwkz10ggt6rwp918nag2z6jzjd5chst8f2rq733hpvwuesjuzsbpordebnwj5y04dzf7eseiom513gysm4xdx78bxrn0wes76ckotsdp409i6mpgl3fqb1evnl11j26kah6aao5knq8vhc3mlffuoidkddh2i181gc99cb',
                parameterName: 'vthn349qjkiepnxb2d4eb54de326c3xdn8jnty3fums30qdpc0r8zqde4os2po1g9f9j9dd5mrqy1ot7iol2rww3svz7gxey97i7ybt4t0jd5a4fe5ltg7nsvp8t30ancnw7mkyf3ah8u3sofntsyzlrxvr25xyoy9lo9l1ks1fqc7tultdles21m9rilww320oervelvobghcgv631mtk9pm659599615i1qd7azbwnzkwb417xvdphfhder0gi7ij8b2yshpm4xhrexewohww5vh9tz6jeivrhqh2p8zsylzc17v21adb0qodtv4mm',
                parameterValue: 'a993nswx2zhxul0nfycy48nlgsph4jv1j47ibr66robg1f69mot7eygqy7poqnbronls6cvr68nptigc3ypna636023u558i5qxeejd150blxp6qxpmz3mdu3mmcc862we9s3s7jfn2jnin3hvngrwszv995y3lvlyjzl8vifsqawakokk7zas1gc67i9g84rgbn4jpmimvrbi19impex3dyaql3jqyqljbdb7mwb84bij0thtz7qh35vryphyxgcci8sk4l4esve921hsnpoi49a5adc80gt3rupx871s9ni1wj6eswqii48klx9esos1nx96379p7tvslspc43ds365a7jk4sctbx4rofpiewhcywsrkq74kf64mopqwbaiyff7famim54ipr6hrp4ud91c7h6nhx9f9el3w79ko28ayav2txfrh98pdkmibagld7yyi2fgmvo6j6ey85bo94i26qul6j9zno4dd59eugs7oiemo2ausitau2nc2irdgf35bsfj0twclfe99lvykust88pvfnufb6ubsp9kya7wbiu7c0n78m613aoq4v2k3dc6tdgrwtz46sc0onh0o1s1pnekdpxruq1fy9yy3m6qonc7tp32jccczp7wlo6323bh8le8shcjfnv0ufr41muqysnnktfwozb2omb4ty1bv0qw3ennht052jv5hrsricdm24j2gb8vlm1ejo8oizxf6xsktdnbcnz50yvk2bdorbp0tj5p49gmt43o7bpkx0gcolp730zg432feamwxpnxp2oofzlnvh1u6bp0b8kxb85xep40n3wzd4slqmwbttcxzpc69tlugrp5v0vef6vsn9qnj48y0i2sd7z8fbyl9magem9gfncioqsn5pgwr6ssec71a1rqru3kcug2xyo246gxgmlxwnrh1suins240adk17ywvzwtrozidopzmd5zpp28w7y7qnhtlkgre8fumgw8jzza80ah9scnrfzvnmlsw1hwvwzakjssxc5',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'e9vr220jgkxwj5pr0ib4g3m86eyqabgwwti87',
                systemName: 'ymwevismmp603yytwmhv',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'yezramiaucma1kwyn1fkc0piakgznyg3ovkjdvtg2n8iaikjrixmb97bdzpsun8afqdd0n80ymqnie4jrn5pd36db0jvt0v6jpvtxpvm6yz3k3o7ayio5ktstldqexx7z206iu1ent87zntm2uzj5yrkorl98f0o',
                channelComponent: 'f56pqre82d98d2zuxxiylfc41an6w8l08xru96z406tkv6f7sgcyw693igm478tv7664hr6esleaosrywzrbk2qavdoquk7ynfuzteh5dyk2yuuwelbo6rko91z9frorhu50piaqixxioo5iw70cinppya2ev5r1',
                channelName: 'ngtpqyauhtl4c7ojiwz3pofvmi24khh1ho3pql9d3ysqp2ffzuocbri1d8rmdw2hof1w9xgevsnshcnn6bat700ylsatye5i96iasbz3ptnq035o9ps1mps0wf9tu2dmsopsv4t6jfvrlmy7b4arumixw7zgvcft',
                flowParty: '4hhlsw9f6yz7at2sa13xp45yrpe809nqh70w1jzad7lr18a2c0rwf87sqk3gnyyms35g66am3kgbfoeewselo1n4q2i7za76ucjyc2d13wj3ki7ypquxft9a5wnzgrj2ub4gk9r9zkbob7y7j5wc2t05g4kdq37c',
                flowComponent: '0g0541cdiqvmdzry0jj7yy64sua44wdg2tnn4eokrziyxsv4uflqrwrmm11e388m9az47aankr7hhirpyb2tzefqjuh955oiujnt1on0wkxfjdy79f2obcud4gwhv8n7j6bv1dqbqor9i3in2uf6jnj5jowy5j2z',
                flowInterfaceName: 'uwyb1z75v29og9qf6kllwj93saprkm5ft4xcrblp3dgkdb07kludcle055ilymajp1mggayu448eppn3ixuhuaqy8v3r03g7izksvol2y2xxcapzfszksr8vs0bv77m05fjv6l0udwuzzk5uw1y46jk8039mdptk',
                flowInterfaceNamespace: '2dqrof1evlnys58t6sy7b5m4dt8eb9wlrldzeee7u1tpquyqtndgs40d7lj0oquwk2p3e2ru2fanadsjeeoeddh9fqshb4ty9vjoag2ori8ykxiy7qlpdvu4g3x6zk6zbi47qrq8j8bqi0idz1cfx44d5skitxan',
                parameterGroup: 'f18euu4vvootzq833814yrwl993bpv2zd1r60exhqdcyor7qirekoouagqjgfklsgyt3f7g9nomgipx0a07pw6kuqc1e5xwc5kerfrnzjb1jtvgo0huhmy4fodbm2u80qe0dz7k2pj5a6x13kwpkrhebwhox8gkhmzp9113guy9dvki3emqvo0lsmo481ktxf5r5x6ne56lpokylljs0cyv7n6938z5h0pvbcx8g9q0ionb8gqbabc22f71hnql',
                name: 'hvknhdu12eyfv4uypk3lhw5pvduudywgrphklih14ahgw6eceghqte9xye2frwy3jtywe8evhpg7l883mlbyqykzpa964ry1life4isdfuqtswtidpuebbqazx9fb2b3cko10r5sggzu47uw46csfmaixunr12mtpynmwojlp6cann2rnwbntykhww0n5l32fnkn9bqffn37q40mm0ihvyl9mqo5k42qafuw2ywzd2zgnc2hvagmohb73ttcujzns9mta1yrowyy38bdifefd4efp5g73atl7whnw9w5b6a2fbwupfc8zhjx6g7sln3g',
                parameterName: '3t2gle1fcsbn77owu6fh1qoqz1okjeftryby221inoivq2gj0dp2xmmulprn032m9d5vw125z7e00bo53t0a7y8q5hedn3wphrosplqcktolzgqxhr86irtd0a9cex1ogvguloo4vz1wumjjcsumuwu2bi1rizi3gsv1j9y3l5c4050z9b8zoa3zkf8t2njnrywgjcu427dru7tnz8vzid8ghwyqy4kx095yakhioqy9hbpcnzujp0lvkigzclxnsqdm4dsxvc3pn0b0ai75cuqpsxheilx1zej8ox40n0oc8wtwsjkf3nke7dpv3jhm',
                parameterValue: 'bs190j50rb3vycv9z95i29x017qa3qdy8c31mmgcijdsmlw49vvl1ffob7rrcg18uftq8y8j3m4a3pflnqj4g8tc7u6uq9p01cq5y5qepahsyk9p0xd5cr1ur402g8elmjgcrig18tvxe2gdlg6zjvin86qmjibnj3r9y6rt9aj3lf7eb0qgbgxe3hjtlymb54iyml09futi36e4mx7otyr3kn7aau3nsgl38m4q5pbosk73gxrr3cu7togfn1sayr7buph4z00rwu221cjowzsbi6lom5lvv18ubhtqsklza4wq9zstwv2fjj4yv9fjp58kvbn799kzubdbhh379m1y5yc8f654uqr23nb9vm1btd4m75a72hn9tnjtbgy523yad4hwlykkjhd7ps9tlpw337jtwz30y0i2p7rgbyap8vnv85j9brvvn7udfjl6g1p2w73seluvo13g1z8ajs89d1a4tu41pg69snxmwu7g8613uop78z8is5b6516zzqdhty5ecqjjzjttoq83czpu976v3zt87z9i28kt2z1n4ya6iir1lc7g9uz4yn0d9y6jdrm493tdguxvcmc6fuk1xmis3jrvuz1d5ux8amn3rtvqpdu2gljqqqrvmsbd17vf4rbeh7jr2qm1nw4xd6i08vyh1lvhnek4rbtwwbuuj9mbg6wccj1se00axxad44f8x0rq26o53hw1qx6q4aj8a0mmimhrz6uydxp23ogfhzx91e7ibk2j3wqbpdvupt7jtjpkoo4ozqpipun5nhz3zqsoyewwz52675h959nbrkyik3y6h16uxppl1mwjy7g1ra3dudn18ngypu4th08kp8ljfccxewy3m18ssv2dm4yi1terzkfluknkamuvogo1nrpui58mlqdvst0y6auzsema01jiqjyzo0uojvx3ogsgxdixbz6gnsgrjsg3eu1p5nchnsiuov745092c456fcpna4nd71vn6pakcmd4t2j8lwqlhbucje74ke0y',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'i9lv3wxswcqsbqzvjp9t',
                channelId: 'd1s6i69p94ssd09nor20mrap0ooler7y08apn',
                channelParty: 'thojebwtcwxvujk1cpro3wu4hbhcv0hwcz7wmqlnuaa4qfx63ab0zib9vp6r1nciq3g4ayxveiq94mdwhasbc026hbfjkuyxo3t2g0dsv86l5ni8wpdfnim04m7r87wq269juxkxwqooo24n12cbhqb73w4is7jr',
                channelComponent: '44u0rd03e7q3sqrxkhnow7iilxnnjekx2k3j7y24jiiyk9smqjpui10uq2hmvieqcpj2ftqbi9mghz9x3iq5zucd688poqxrk3sz6e2drd4egl2w3zsuwjxfmih17s2i3qs6b468l3ngu69qa26l5wxd12f8f4v1',
                channelName: 'hig51ea0qa03kw0fsy9xk5016nut3ozylweekjczyraevhawj0i5p9g48rmbeofpifzfgpnk9yrpgsq3146o1ry0f86icch0fbhi7pzq7r2va8eukjealnd55tbhycdm23cfq271ju3sext9bo5yis34xvfbju7h',
                flowParty: '3d5fx51jftke365hz5n6kwcmjkidgfotsq3qnxszp3oxhu38ngpksoctnaovdb7xkngqkiqaai16rcsd4k8htufhmlaurhiwxqg3rnuguuxu6z5vua3n19mu1zmxx19pbmgf37ilw9zapxnv0x2ptuofzmnndtqe',
                flowComponent: 'wk4yenlh64y49wpe4dsfryxlo3hdg7h9utqzhbyieuc8lrwkldf4ar37kg55cu1suyd6dtmj9g4xs8ibc30pavks8ujt88gznq00spfjqn0pp7bgmrjvyv6sd4m1a8m99smog7z9sotnb779kb631s4fozehb68g',
                flowInterfaceName: '77o427l1hph0tj47xb8vlds5lo2uq91nniob44clzle2kf9kvrlsi5o3ay4o2hf0ityqc9pmdwc5gi6trin51ftpzkvfddida7kmf3iajfeul4d46gigzkez8e28eqf2jjkhdjiqxrq11wc0qslh8nnfn3yo7mmr',
                flowInterfaceNamespace: 'kanmmlbdqf8h3cu528alirz5uh4x3izsa8yo55i9ke7119o575u3lsp968nv3tro1ehokarzaq9b88m37npejhjs9xq9cyyze1m3v31lectr9944j2d1xswvl4ljyhdbletcba4bgcp667qlckefvqrqeyqybmuv',
                parameterGroup: '9t0ciq2nmh2h2jmmh9vvkfjc4uuh07i3hnlysvc4jabtbs64ohe7nyamuvt6ss9jx9e3g0jrz5cpiawi72yhhwjkhj2gb44vjj6fk634zke7lrcywwkdu53mfkfbkw3ww5wisp1yasfvtxq4x6fioldpri9kf2inooaak2ukx2i8jppcvvawu23ndilk1tdfk0d2sl6dohq47x571plj0glnjrsofrg9ncng2nlhitwtp6ibb0n3kmp4rk7fnpr',
                name: '7pviw0vxmyztgre0at3ttl54u6galq4ezd1arv8xsxs02lmp1n8p5l33iagulsuln5371w8j6aqunnppwo0m9tdew93eictdy5jvrtlvvvrw9gldci0xwwdaoj92elwhkzs11qzvcpq4v9ov0vrtumcmh1jeqcjhagquful485s28kp1v89qtw6ty2bic5gdyh1lxlpoa89hd8jmhsulls7xdfhm7oi0jtgg5khupqpdxdix8xb3zget1gyl6zqvr1lgdrmnwgrbaclyhh6rcjm81ua94pfg6xi73h2f1d0x2a9nr34czk58k2b3rtbt',
                parameterName: 'csnnxtbm7l1oqthwruhctekn99maj5myllw2vm2055iecu3g4xcbvsmrb42edzib2hkxdetvg3nuy4rb3tksl9z7z1qwtnv7xfq4bfwpd3qvwlc9h7vpbzfmrfhq4iwrjkxj0txdt06aogyle3gkowv1cvwdf45n4wnwvk3bookk9wkesp22tsvwhwzwui285fsz9cvwyidnqcg6ygy94yjtgg9j8mu85age3i05bsnz68gwd1nx65xmc2egsx8ymyy7x758s50y68wj3xngv97cxnz70t34yeopv6b7lz7iy7t5p70d7qmwfmch4e7e',
                parameterValue: 'ndjvci3gb37y2veqez85wxrjnlo4w82xilqz3628o81rpixx7z6bkr8ljhx7pz40q3z2i7iqw4cqmjemzgwf20h7dirsv0pr9fcsdoa4a981uz4bwm58b8m8j5rlw7av7x5xoi2azfkpsyfo2365twux9kqpw8rbupaox3pkqylujx5cev5t274jo8gwywx6p1bljq0g8qsrm1zx7qdwz6shcwnz3myzdpge2bx9w5g40t84fg3xzfyctd0yy7aempxhrfvu64ro79lkmepz1zpc1rvb66npo00o7sq2mqy1f0f47lt1wnw89cb15eiw7lly3x3xpq6835bwkvaob0xpshok2pluwn2wjxfok8hy8g11w9fcuiio8as8kbpf2i3uebu6x2sqqnaf9y3xmbudy2zlr4wf72q1kk629euvmztxjyfnt3ewev5g2n168q551q8qi64m4cbomyb1iat5ys9qewq72onq5m38y1qh34tcf35hnns34ud1n1hu7g5r6k2oxhcqssdudoc1y17tufmjm7jg0cmgmisyhvj6atg8h42twczeuc0ck2883vlz0j8gkmdygmbvoj4ozdq1k8ed4yo59mp1ukjvlh1odyf1k8xgtjt4s0l5uuvrcrplfv0mb5xizsrnkf0azx2603t9mlnmni8k2felyibz6f6yxfxxsmii39yuw0hzjeg0ls57nsyc5147ij0nbdqcw5nuzr2beaosebynghcjo1trt7hikemxbsnoq46y9ui1uitap3lwdl726gbyqhe5ycqp3t1y6lqctsvitij721dgntyl39zw2gksz3y347r8xobxze0t7y7nmba3w9p1nw39p2cjs7xb02reb004pysnmwzq7ohp7aiexnlq62py9wwiv7tjlkdtwcwmdsp4rb9u3dpvnnhlsq2ngwevdkyqtryb6dwiz03wa4yrn1qr676n7f1hddqfitykv19upunhyyfm67wg1hh3mtqhgn789mgef511ykrifrhb',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: '6sl308g49v4jwo7fqppil',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'nl7hskazvgowulfj5hl30qg3h27d0lrdvu8awplcz70vp7t6pb7fg73hdeqtyg65zsjndkr79sntyoqbxxl5vhuv9mhpei0q4p5ssxgij7i3ynoaemzjaqdyssm6bd5ldxrog4dolqzq35i6kx03g8bexdum7jux',
                channelComponent: 'a9xuh5kic71pep0j0ya9fnml7gn4z6bpwgp27xqd3pxstqbuacz75vafegiax9astn3ik2j92pjyw0k8ro33frf8xxovzbupmj9m0y12yyfte0in4v4i0rlg0cqcgmrjogb034c28d866fu23ac0e8csl4jk48i6',
                channelName: '5gwhgu5doja0dkun28tit83vl2qndoacs1wrr62jt4i16ub56lmq2gmc62md30duzn7w16qvohg20rfxhkbrkky4afjo8z3k5i3h134ewodho97xp0oex547pheqh2mlb66z8te6p7c4zxzez4i17e93nrf5imcl',
                flowParty: 'zlt2oo36srwhuyg7frw18xwnbq56gk6g7l6t3f7a2d8kwtuhe5ie3dze570vxqqtdg0mwqj7jl270rwdg6dnskp5stpjyww264db8lq5n617w5yhna4j1n6a7ymzzv18zeb1d6k4m775z6tsqe35j8zsqutaet1i',
                flowComponent: '68c5brinuctvnaqs5rjnjz0fvxeb1b3f76w6bxjs2efont07obrk5l6s7t152vo9t8zkfbm8bq7p91o1iz3mrrpn3wdfl2och4h5vg0g5ckzb8sloq2rwve2tbpxcgwgt7zh3t18rdsxwgi4co0xjwu5pcdrbry1',
                flowInterfaceName: 'gasz36ckpsho7nwkp1544ff6akwtu9mjr9wft79eqycp2zszdaderhqmsad8ojzibmcwntihdjpwnj12z50nctd37kehx36se3dc2tg83hza08r041onfg0s49ormusrueny3txfy98uflgzzchi9wdfqfrfypgb',
                flowInterfaceNamespace: '6jpemmk65amulwx9t8q5b6mt2otsvtwowxuppl2vasyy7b9pj6ahv5viyuugfst413newuauc77k5yxjwxn3wcharpseq2zeazewbblicba9yh1xl4h8zlsszvvz8jzjc8joi6abem0ayoq9e9ik5id3j8r81wls',
                parameterGroup: 'nyt7okftsevjwbf3mm7z6tkjphdhnwpry2rjvvv5duuctii9hug6cs5zvh5qek17w69qq9d9tr14v1h670wcnkrvvhmz17l4fkvomlb5y8zzcac7lbnexwlhmtq5527uh1atkgsow6j9lnnnn5wzg1n5en66srpqgrp0tcj3fpbf0ykp4p07tn4mzos4ya02i3ws14jaijbq3651zpzl52d9iv6ddpqzlabkha68zccucp0r9xmrw7acdoeodsu',
                name: 'w0p8ljz0ejqmplzr7d15gmpfedfhe0djf7hlm6kf79ag1ubb3a21wjxdzkgsu6x8q2vee1y7qqdchd5831idq8vq8fije5fwnmcyn3iicl2vuhy073llspdqjpnqqpwsvdf98f9oyrzlkgf4g05ghflcy1haqrk8f4d55xh6ifpxvq6m71nftcf0gm7zdcwjgw7l6qwk1piio4weudf8judj7nfvt71cw4hi47fb5jhlo9x7khtqo6h22k2qjqwi6ox3lra3pxi9ww6n7i8xykxaqt5vz1yts5nlojy7stljf6cx7f0kygii7y2n7to3',
                parameterName: 'h1f70g2tbd5waabz7u8gm78ymu43yp9toqhxz6dnr88wwg2ft328jp0hgbxf3ani8wm94hzhdo16xn3wwfjv8ag7tqk3ilfxv5xrzp4rmkfthv6v6fsns8g3ne6yscajoz5bjj4xlwe8wgin9l1pr5wfztowl7kxoe5lvq1411rxsmqgdij3nb7v07um6o21zb6l06fkr8qkypuii66j60k3ve75m3o3acp5cugjckh9njua37t8cxpxm60i8eu7atra4on85kg2c4eujwdgzpzzyvhh9s74omcji9stm0ojerbd1fw9cxwhn7rse5cu',
                parameterValue: '5hjoigys4kt5fh707yymb1wxbi1sgnma0p37eh795yesw5nruygwyxa9invhdyt3e8cjmgxdfcme4ok8706lme9de8i1dx5l5e4toqahhgez5smo9vibyvtmbxbncqzkdex0uo4j9zsstq894teth4nj8hjvbhgb906pl9kpqhmf15tjuwm8ktk5gg12f4fccelauof8wtd8gb86uyxbtinwctpggwy7r2qh35fl316vpb8p20cenrri7pgzuicwzjf0n3rd43djapocit3cfmfovds0qts48u2ithadw1vcwpw2zcr0py0wyd6gwmjpg66oo1bftksmtoidd2mbdurg4svi4vz9gjiw8zk7gfsn99eobyvmm01jjypdenq99qolzx75rxpwtj8wckedz0ytttofhpdjgqeyidlxw2cjrdem8fegmjic29khy0r169rs02c8mqwmejiiltkcah7bz49nj78y8qmbnfyszrspx8xdmr03h4i1xmj2n8pn5g5obgz6pl0dkuudiy4csg9vmbcp75z0ptth8018vi63zfds3wa97152sorkza17ogl0j9mv7uctbje0du8hno1xp788qmqgmm897zbe8zcl7eoeoaw4n7d4g2irv70d5fh8j7ik5mclaq0kv37k7de0shxwa3ri4h1a613t1qwvh4ije924wttgp1qv57k9n23euv4au272g4arb1su502hzjcjdbir5zrm5lmtpkep1b1ylsnxmz2akgo7kcnazjwkpff298gkxo314n3iv2x9adko55plih3n6kepxwzpa6cg0xjaazm3eayn2zx0hdztcttxhafse7hvjqgzwzhrekyztfz97h4g06857w5563mkrde2q10gn9u6jlbt63811agx0bprn7kg29bd8z0jgn3ikw8h8flff6nm6jyvfouo1avlfxavk5pf93vilsanbizdm0x8w4687nmicisnzirwsstkhjg0hazix2ic7mle8gjcesqhle0jagfr',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'm981lchdczjgsr7h6zii',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'taa84m6xdzx5u1azp60031gj884kdayi55pumatol35gisonjl3ysa55qwfuta4q06cijdbv3yhr61cloq6iv7rjn43wxxz9ggcptq1pzenjqpp1hen4b0ywbty5f9cr74gugwc5w4x67vymaeu50mdphvqantwhy',
                channelComponent: 'ggsfz371rxoycje98n14vjlj48lrjpfdjqgt9dzdk5xety8vep8gf6clmu8pte70iblhi7jskniay2lfsmiwdv2azha69tndqjvpp10s0jy3nt1xq598zzhj2mkq9eucs9l6f65lontsgrllp9t2g54fqx82pw2o',
                channelName: 'yerv8vspwxrylw8e0sr1y95ndazt06ukemp1exc4d60xfermrzne2dwahax8h22wrvsx76tszt5xsp9menpox8ko4xcdp9wjm5hsv0fb627hz27hhj2swtkipwlgn9yokyalsmm2utxavm6saoy9hkpuim83n0wp',
                flowParty: 's3i1l5rvjhw2libr69784z4tmxs9pplyyl95ahmuyfr49v5efp3kbn8p90ypxgr51illdc6rokp9g31tpl24spvzi2htd8uviyqjv4ca6uotjke02w84nwl5a7c1qyoypx3esavehk7bzdo1yj5g0a811qhxm133',
                flowComponent: 'plzvvhzxajoikwoab97xp32ck244rcmbecngks83pob71i72pnd4zcto7tw5fqfylh57x1b51e41zw1w14oz0ju79ptmew6vbsusl27hd0q9jabl6ku7oi5ht8ea86wfe7bhr9r1cdkac40p6zfu34wnqlhekvi2',
                flowInterfaceName: 'ntifm9elmaquq2iylprpupc22k832wsf001yr6cvc9heh7h3srttijynn6psypqr3f5jgf6dyd6pucb0z2xx1saf4lfdrlu75cgw1b1i9nenfdpbmnaf4ipq5egw2bnduj4j1mgy189ejfotvo644f9noishdvgk',
                flowInterfaceNamespace: '4a7763r7s0269qt4ncy3d72ejnhzcbsos5vjuptpo8xnmsbj7h5mlrpp4qe5054bxetk5ekcra0wggu2n5gzap7d3mvbfratta6mzp1x2caxwmw3z3l8hkbbakr2f87i2mmc4ju7ye5hdujncxq13e5cpq9vpaqu',
                parameterGroup: '1erzxfohbjjcufeuboe2w5nczm6ethsvuvk5xtoytj934sdydgwk96idtoap4uo32lfiqcvk0e51ar0u91qqejc1x6i4qn4k12ctck1ioou42x99a5q9iwp2n3bjdr1s0yc6xoeeg15wqaczpyzbuwuquc712vcu91yvzpzynxtqg9scmfwwttoj9e6ifylt2fx2y9jqzkpjo5bf90jvajpn320gw469dzzl0rvhwk5ehfu2m3ccypm8inclydm',
                name: '7l63we1r73eqfyhx6i049gjl7tznprp6obif4ap5h8n2lsiq4gq7l2c8zt9yg51p4dnnc5914g47gwva2aljene3pr2bvjshvl95je7v2ol9tfubnnfs6pkk90lk7nil5q3m5hcwillgvna9utq5k8and6gl5sfz155v649p5unldk60g9m0tclkxcgns8ghdbtxv3qgnpd4gzugxq5sq26nlxpnezl4svlchbjdatxcxfu5a86gngq4yi8liig43qz8x5ruj8r8ucj3hhj459wk2ewfq71rcnn0p61zcma5cyq21nyefswvmej7t4dz',
                parameterName: 'c8lnpi3nburacw01mufspnhk4tghtimfqrujnql57hul957omueysw781m1m4pptrlamxbqk49g9cu6p0frz0hysgwrqrkb26pm5ululbvodbrmg92ateiav6nbfuwzon9ptgw95mey9ll9uemodhwbt4s70o6svqhgj7brwlvo4clv9s9stufohbvrt06dgd77qazqtsv0017ro52gltux4m7vegceyillfcezab2r8rhxms67r8dgr0elczrgayud7grwbeqolh5gy5r2w2ke7ah0nkuzit4wk22t0nsjjpoqb5gvxnia5o65ho2dz',
                parameterValue: 'ynzssk0ad7xw2flbmisn3f4awhsne942zcpmhwz1aed4j8sovojxu6q11uxt5cva27jn8y9uruelrvovbg4yalgd45ercjb5nqkmb9g6zl3h30xx7vhp4dhj3v4blxheud9io5k3s9xpw4gidiboo1fkynmrr48x3znadglbhmrpyq0iujht3z949zd9y5fl92nrhnkx9k2tuo0lv6bxt77edogybxmpwua42u12d1zphxgv3ucw04c13vp1thpke0cmo9iuzfjxhmda8h7qlq2xcya4bwkir7w4xgy80dlefb9l60am423t6s07ajvt1wim2xvgs3zbn1txh6xve4oef9jhfolbvtbg2w10195351hmnk5du4kiaqrwuj53gxzz24u6se6kk403leqabrg1u22av9d5bc6lvjfhn6t3z4h0uq8rayel0vfxuz7qbrc7jnwaods2apkwkvvitg2t77kug44j7slkyfwyfe57pgl9b38o79778w8i7iie775g0lnw4fav7nh0vgaw17vggjgkiy13y59jhjrhafjk60n3b940dxosfcrhky4vfqfuvmff2gzyecjy1r63yuc40ny4438c1eenr0dp9ps81vn6kzt806ur6kqy87itilvd2ug5v7z4026h55lgegypfpecma4yclzbdhnlsqiw5sz9jyf822rkio5nliu28rzd296dqexoxbk79yj4jwu37g8n6393h8dkd9ijlk60g9d3fz5cqcil5prm7ysty3a2mvjy0p61od3utfxi9gcw4vlsp2dxvzz8524ci8ojhvdn92zf6122boknm4qo283s7bfqjgr7ullmskcpxw8272ugslyorh9taanv5pmmgfl016pd3km5o9pn8habqe4pl6ydseco1gfg43l9k0qmkpad7in9qfkogpnfmje9xox6nuglk96ky4zeqxzbjo0b0m9df784kmte97lws6r1xphturzs8t0uwwtzqn77i0472h0m27tlcc963rzj',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: '61bj46s9ry8ikyekbz4o',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: '7vo6qu9r1i2xlydrssuur9261ic538g2brjk1iglcfjlpat3jr0dlngfaev1r6llta4f8wuxjqk4a12k09b8907x36ifw88ujwelh1v9igxboitdce5om8o47acj25ru31ynlkne98t1apn4jlopa2myt07tu5jw',
                channelComponent: 'bebvbc15adqosucatjy413nu94nhzmkf0o610bijidaaiazpz8e0xc01qvmy9jxd0exhgeu4xdj27pu6ym91wbjl2hmkohhu2w16fdzw2jansfxl8b4nn66kwc7ilyiy342yluxprsyupjj6n4lz01nhq5cki6exe',
                channelName: '25yl5xkak0xgds154t9gmf2pc16cooh7tmsx3981kool8573dx9z3b71iw3rpe1g20nsd9lb0a3bitxv86yk7ibrpgueouufql0u4c4zm2k3k8s3vqe43bv2og70c4jrlvd680y5v7zy6s0sju09ga8p8u1ygc5e',
                flowParty: 'eur36izxyotrgm4ygr5x5wkft43zc3fac9n32g420qs6zcu3f7isvyqvanll1xnoualkhbqs9y62vcigsdcfh6le1rj9tmvjhhrwfheg4gmy294q1lb4hj20x09gvolqsucl479dpf70djym3kvz99rdvqy423tj',
                flowComponent: 'yu11m12rywvrs6n1hdl0ghvhmgumevrtflkgyzw5u1lm872m2ennyyxlgd5k5gijrtlqa8lnv0ompnnt2929rf7qbqgsemycvh48r61xaqnkqhyllepmlx6u29livjzy74wua7aacqbsdrzypyk0mf2gajzqlgep',
                flowInterfaceName: 'mdg6gdz6g7hqnq04l5t0f3s3bq8e37274zsmlb2r1xi1s2jjurwpyihqnfx208goqai1c76u3ad0qdkts1mc7p5ujqcnone474ondebyyz1asw5jjnc6eo31wh01b4sl1h9lu5atujvfv7dsdzc5dgggx77lrmao',
                flowInterfaceNamespace: 'j8bl83z7j8rng745z9jy0u53pue3hsmxe0cjwtbmebgb3f9rd6vo7z0g3gf1983wqtoecwkd74n97q5wc39gtz26qa2v6qs7kqjm41rm4tdeh8q8ffhsci2w5qddies2derm434rqg2jiclk1c7h69zl8q35r00n',
                parameterGroup: 'g1eb07jn9bydtqbp2y8e1k2wjyq26tavsdtn6sltgkmakl9vmkbcfe8oo27v5893sjcgsd65muhi9tghoidb876y8bw6z0w1r1t46dy9ztcr7k8ksma734kgm5cxbmlaeryjy8x3140xvlutttnskvu57whprs4b2wbnusoov4wwrnl39yhqq27n99iu1hxg6oauzv56p3tej5skvdzt2qtckzx8gclbev2pi09e6kmwmttpiiwekvhf6vwc4rd',
                name: 'l0x9qp7kt8eymgsuc9r2luwc2qt3z71vc0fao5m7m85g299hp0fo4hv0wjzler63h2h28bpr8isbmvxfm16shq8bmicxmzphmwmrpanwytcyu08xpgm629lnxnydc94aygjaqv1hfew12ybnr6yvt10hfbcgb0n1e0f0t636obn7jn0y6yna10g4qqjlly83nticlnso90wpyuf56nlbblpid7ec02zkie8cbpf1fu8qpfbwmf9m8noldj9t82f7yyshxntzsp8h1kanzyphss53ku40okj01u6wtlx2mfscvisvja38h6l04k5yg2vd',
                parameterName: 'w7ykh2mfijj3wwk8kuo4xij2016wt3de3xrwqmqziolsk8r7w9ezxvslki6ym2zcoppiq9mvo0w3esh9mw19lw6ij046rxpipr2v6nhh4di8ani8b3a2gx85idaem15s25pq0qinzgxom29m9jcrh5cmacyt5g23dbxz29lompzwnm45gd3tr9anp2mrsasd4uyit3khj9kpqyngmp03ncb6h1gtb2zq8lpn2vczrjv8pt95u2deob7yiempzxhdfpivxj35ltd50orp536r5auo31jobo6o86jrjauew498umztrja2j7v7cusjxroy',
                parameterValue: 'lrgvzj49nsta8142ro9lcb2ssqoy4a3eq4al8a4zakaw26ah8x87xyxnaenaprmq2ue8991p7qpkmsc5vqjxs4elk5f302x40yiudypk6m87t7jxoax5gai1dpq7jqvpez2cw9t1x18qxibb8kg2vcwutahlgpife2ln2jdqwk9gvs6whsdy9iihz8mkbrfkaflvgwhj50ewptrpr4lwqe1osk24lbf9i0pxwwedoikll4gegaz3nruddb98vukv93vftlbq8h96v0pbi6ot322urlyds5h7lg6p8mkhjs87gwiucr7vxkwovqwsstfybqkxoym4thlnzp5uzdjfgdb9irma7pg8uh0660vzgq2ari1570crnm83hegnbt4xc8sauclm0qugmgq5ykwin70iub98jlhry5jxnn52ffcqgaj6mrgbghcvz16vdiqwo103w3xzeu81v5viqrsiuyzjtt871uqbewwo88qwxisqlko5ir1xu334oj91cci1u592lt1v97rk5lp56tw05kgw1i9azs3yhcguhs3kjbfdbmsmnh10pps4bduohazadskxfzy1iirc51x6ekqo0qidb3mz4a2essb2ka8c25wafsix6eph6mkdnm55tb8lvkqewghaxudja3f7fjp1s70snpc99dqbkq6xlnnxqv2bwh7wxp8afjxp2mrrdjhgvc0wm8s9p5mxzlflapkpncho708fmy24c3nnukrgdg5rtfkpmorvfjlb7t5ehzjewoqhi7vq8sjkzdqy4dieczeceddort5el6prt2yexg6vgkzfd1czn6r6utz20dmab09nv1wylkdlq2jy8amiztbqvu0ts9egvcv04h868d0fr4sm8cpop2w0zbkaqz0d1f4oynl0mu2wdc80fcw51xcbgyrqx6vbqxf1ars6jgjtvfdw2p1oe7e4dj5kyfthg4r0nqo8767wbhly7h3kkmg2be9j6n76gj47qijjhkp4ruzbmgh0ucfl8myk8396',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'bqnkeo2g5h65i4vt1s4p',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'rnsj6jmlpyd27swl8eh1w06023o944gls3lc97p8ah74xdxju22h3c2kzfvm9ent0xq7hqiwir9w3sjo5pfq0ohyj33so2iylklrtw4wh5bbjlg4i72ot4uxm1yh3us6d0b7hj04ny7ue3cyqforayf311m4950i',
                channelComponent: 'z8nv3hckulp3qefp3wq3n59f171zuxykoit1boz34vlipb8wg92ub5dysjlirlhpm3dgqc3mmxhdo8phvuun822nugk7hu462gyxid66lyvzf2h95qr5b5q6k88sx8m9qkyo1eggalwrt497jj3a7txelgxwavwm',
                channelName: '7fgdy357yzm2udzcb1d3vyu7xzl0zawh0npodu4jx7py895w47hfkh52cy9qg5i15epe47dscmt6ariugbppntl19b76k91ziip2dwrnacoa305ynkphwce5o4gqkfnwl409aewztf1q89kgbj6d240sce4z45338',
                flowParty: 'yyr71e4ev6hthuqt03pikv5ab89tbrsfhwovkmm4qla9ue1rav2djffjzlgtj4179p3rczaaz4nlfv4xaexjh2pbxqbbtfmvph46bbanctez42zqy6vplwqr1f0o8wf3mhupb99zg1gor0hyrs0ntsii9jlpuu7a',
                flowComponent: 'i4asquzz6spetbygb0xgzt3td3pnwym1gnw4gwroe43ctffkbh6k7zitck17fqa4yberaepcx25m05zkrja9hg1qwpxwwzbt1kr8oqzc26k664fmnrvldoutlkrrol484lyskrp301xltmthim44u2wvmsb3iwkd',
                flowInterfaceName: 'hd5a5g4pul4qil1fodgkxpf1kuov63y2fqo1lyt5tch7vh8ekjma6njwxzc745j1fsbpkgmfdfh45be0z5vpkl22c9dhpcvy579aexudsc9gewgvq3mgwb1aceii739iwy772qp1gwltrt06gl4w0zcze3rmt4m5',
                flowInterfaceNamespace: '4u46r16b7cqbx8bshoaqcdpwr9nerpg4pl17xx1tdwd2az8kzeqh83ozz7t3cwfijgi313yvgrbd53gr47znx9umni8oxq2blurcra34o927mesnqpr93dgejqcosyqlnu4vbk2hkxjx5utzd9wjvob2kuuji3c7',
                parameterGroup: 'd4hza1cq4f8gk8q800smy34fan0pai3k4hvgvz9hi7c6fr6see5v7ks2x77n8ijosizpp94ldtngtio963kjhgc7q4s59jq98vdf36tlz7n8w1jk08tahha17kcyd0hvx1i8ojfzx9sp203sexynk3y939p0svhgkej6upvmx8p82n94kt1ewihc6zi6utdjao8g45h1vg7akbp8hq9brs8r4elynuabt2ssyjrz9pwpk5kevboz62ca0hrj23g',
                name: 'qjwz7pha3a6zgza4w8iu46tzl0lcpvv5kxbmn0ubqotqt5zrbi6wpi0cx8ma0kkb45yhbvxa2qjjw2sdyznh385udmsyhmvkzk21z5yjbw1jk2xichhxon6iz9cj74s2i4cdifytcilxf58fbdk8nbg0jbv2cqkb9pc83uc26hfaf637aah014bqi9ro25n1a277g3zyri0t142korwk5vy69y7yh94fxlr1fbvbzci06yn8f0lpielnwsmai4eztvchklxu62hgzsf8yv3nycj8jould45v5ku4pr0mbnrvvlljhztepsbbpd98zb6u',
                parameterName: 'vu7clnmruxhczzllsxkre4om5o3fsfdgzh7hha4p0crlp0x3gzjnpd23qtsiap0j2pymim5lwasqnigocxwb07cbs4z7qf98wjk9j38pfrg4xx2pg13k47cdfdhvn3c7kmwqbqwefaeb479s10c2wys9zhwhrqahvbvf0qu6e8olcuhvs10qqv2omryg1umnibnpuu71km6oskqfn9o503yqz5h1achmqciwc9uu5rxpd2irisro2qul6fmcfwhniqiafp2z2qiojkzzrc4h08bw8bsc70q1wcdd4abt09sw36tlybmfcspxrnlvpriu',
                parameterValue: '043srfcpp6kjm8oya5orh3g1e7vsvk60f9lc40f2gv5onzs3e33y0c5cxeuhtp02c80lbed38slyb8st6hzplzkxdt5xfixewoqqqmuebfy21x93bx579l9p5zp0nit2xm90q7vv1f4dckqilgseb0ida71pruzrxuc7j3k4txngi8bmu5icetb9bonr5f3tt15awcjx4qcoauecxj32hqplwhbtrab3do6qblp9w0cjqbfnnm69ntbd85wffqr3alvrm7jvx05q2zig5hx47z7ejlng51u8yeh7v3h0wzi6fqgeb89atp6g7zpu6kg5tc8gq51pyzvzwb5dseazwmliuv67qbicbov2c40ackynhx3rtrazc6fhn7ghvewh8a797gdhzbtlvm3mqoexfy2e46lwktqpssr1rbairvwqy4kyz6g8qko7xc6jpqprfhdzm14r99xbmgv7tj6v945mq58nhwvspbmugb4012jlatxvxutlvyxd3lhg8uzgmolpzy8hfm1egm98u1ps69li80uxofiy7a0h794nvq7hhzy2zwhbuwmzwreqm5r4pds11lzvf4f15nbs0wgbechjotd2yyguf42uv656e4eppzgwcc7acgfgo2fg4dtnx1qo106rdzfqc30vnl0m8xbt4unccp174pj5rumhxef6zt18arhzrov7osidqwwsl0y00sstnht7mly43s27rjpu7vsb3dj82aczro6t9wre8zc79b4idvwdgszz1y1my8x0wmwuwezi7tko9aw1venwcyaaa1v98s3raupzm2dhj1k21kqbzp8uakny310bmm58r7s8ynvrdu4q7sfdehyrhh2tl51brfcjyp43vastd6pw48zv2ycmp9885ja4cu54knt5utfhebebhyvtqhk9dfueabw7cgsmj2opfsp26xuh9t7xcwk3icvzyrm2al7j752ohgp85e1j4ix5lh6i9o372ot42v7kbtw6se0h2drzu3un7yks7nqxl1nb',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'x2amu5z87ru1e2vte3sh',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'qrmedsi62xb0gjsc7ax52o6e2awgfn6gsznkb2yhwzhuvmwk0r9ldkc8u0207dgva8jvb7y3qatqhzvcqnkd18brd1g2p39evxu9w75c0eaj05r1lgucuuulxnmz70bs1i3vmocwpewrbsgnkht7ybht9iwewgqm',
                channelComponent: '3on22f6fc79c2tj22k26gufeop45c84s81sh4e68ymyj81xt52ab6cl9alh96afyobdljhs4wvdizuy4gu0l8jrd96t4xzxxyz7w0c7kuk8y17439c1fiqugy1t851ljmw22vr9cysymki8n9hnulwscpgqdsqex',
                channelName: '27z5ut9bgijo3lo3l2q4p8y4nqhn5c6schjrl1c2s0na4e549uv21aejamb410k9d9fj48w9ix46oeezzfb0p9yuc0fb79j3h0l9rd6hstrvcpoxl5iamucz9v3x0zq6urmzxmmukbbf8x8hxmckm8ffyblpuvua',
                flowParty: 'ssgg46gp8g4cdvzziy8ulw4ht4uudjoou0a2uy7ouzco5jrxce9w4aelgep3amo55xgowmlnnuq9pai7rmvp68qmunbn50pe27ljdxzzj75zthczbenrmg8mtde90kgetnv7fvfd6foca4k4kyghx2rz6mfy6dlkj',
                flowComponent: 'frhqij0fxhf83e2wfagecw7o69t7plbkkysxn45dwe4p4bmxswpal0tyo1dt5kf6pu9ylws4krrm414x14sbq2i0i97tl1t41s5qfd752mcipvqzu1emyiq0dxb5ye2oui1kvuw7b14isxkspxg6yc9q1itjyyqe',
                flowInterfaceName: 'sbbgbync2fuehixe5l20tkun8qed2prbe7xxrbq6n815qgqdxlhuttv0tf5a01qmddznazugzdoujwvxhvebp0s3nna5glc6277uqmv43c55hlwmofntvpm6pd3yuynld6aa501jy03nkvrc5rkup3oiet8f8a3c',
                flowInterfaceNamespace: 'ntc4gkn4b9c8sr29qmakbuakwi7ptvkwoddqxmyuiscijigdzdb5h9ov2tqixif4g88cp64kbl699tksuxu6vxvu5ztdlq4hf3bi8zywe4qldvwsodwrw7pzhmey2jt8dj4w5p4d7jnr3r50uk5foqkvyi5jxazj',
                parameterGroup: 'khprv0hyo59dpr17qlygoscpb6uss1wiqrf3oilm4vx8ppqdmwqpb4hh7ie246q5kxx1pz21naeblnpxna0vcvkulfz5zrypz8a7c2lwgnk8iz41yrahnn3imnbf6fprwxj81uvgebfw14k33z4ppy039ol577r9rgaoorzw2py206namlu84ij8kaci1rgewrfd1wsqtgb9yagv1rsc0kf7okxzul15sva73s9ty697kj4jzmrkgy9iy13j1dr',
                name: '03bvyrd2btzo0ea7wqgjzkfbbxijngjqi18alax9znzop408v0akyzw0korxblwzn6uhpdfi7q4kdgtk2i169ksfl1y1jkg13sl0jo9d07r6u4znxx6narykpx47m8xso4coa426v61gehfgm40wn6peukmhdf3vrigaoehwkyoppp7e1wt2yer2aauu8u3vtodq95aqiw60ad6pjzprula4iavv9avawz82pi5e1jnr7l69gwttykzhs7eg160pp28b6tybkqhye1i3q44t6syrnhentszw425g5hz9yu88lohea99ldwhsxpkn8zlo',
                parameterName: '30onm562ftul03nteaee07lt81vvi8y9htle9a486epsk8ho0ap9x41ensdbma3o9g4sld0gueptv0p1gf2d9o97ky9sban3y916pr7p7ejrc8akhjtxx98hh8tbxcdzhtrc3px2v5jarxh820k0adzomjs9aq7odpv5joth6fuxepxyryps9el6rwrhgdlwdwkqnnnam9975eed5dkum7djgwu8lhgysz5zlgo7pv0m359inrxnp140lmcci70wsg1mxpvose1ymcmunjmxl2ugqjppapo3d5ptohppf357q260t8ifnzopv6sm3qot',
                parameterValue: '5zxzj9104khngk3nar5tw05y23khga68u47rh4robm0v6omkrci0uwnmg3koneq3bmttqoksujo4kleymqurdhw45vjz3aumncf2u4x34gwy6xz2ju009q02n5yddmbqi7jj7ktc77vf2kt41q8k1vilprg796efe3u8gh1e5c5yuowgrw0xk0q19hx7so6xcoi6sqw89hc6no6es1gauoemyl67igtcbjimhz9pnsmf0si438wdrdinscycgyxjhh7107ntk3djbho11m0ryzg5mihtihjeo2q8lj5mldks7ipg3qnx81tadw9v7uht2sjc8dbihz6f67u374rrbp6iyge0dmvldjiwnc7h5k38a0r213m12h0hmrc6c2eiitsil79zo2vvmp05vhm7z9m3yxkj82ekk3a9d88yum82zhqgqapn67g97tjftvkplncq511fkzpayckcom9ml2mjyr0jfdi9xu0vxk7yp0zyxwgdu1y01aw9thfma1bahqwy4aro0vqot7f7nsis2aq496ipgverkingp8b19pf8m5vblqrvwp217lrhkcj5r0ziho90wxkj9dyesg7mn1h29fio3l4kb07qewer50qm95a1wnv40cq0mhs1iak3zrlbex8pyryctfeuwqtiljq3wjs6jgcv05l07jvd4z2cgui762j2m9o8cky1ja32sczhrxglnywr542ihhmf4fljzee4epnhbousqafgxfuy5lptb5e90z17gb7xk6uq5yl168egvvtu71cgg040z3x5wf7c7srj9ds2ifln8hrs8zn0ep8tnty8wzsb7wq8g0lnaz6ats88l5lcdmi1742en6rrupnr9c4ge5u62nn69wb9ikg06kdw6z9osfsbvdwyiqc5bhbgpn3z5uumjttjxkxiu6s3n63nj088kh4jvw0wi7dnmiw6m836cowugz7tccf4xaaj5gwiitx2lpuaawhj8kvmn7sedul80dfs5xgszmszinvzx62vgp0x',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'bzz2xokac2phhn6gqsqw',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'pl6jne1tzufek90qyoya4wb5z84gsq9a3chonco1dje9gstmtkbjdh1qfmiflza2j75yvq25q49r0snnr6bad66ws6xc1w4ko1t1455vraqv9f306qlb4ax8isdnfhvb9yj8xtkvn3l9ccm56x2lc67fggwpremr',
                channelComponent: 'ypkemhxiqldfeofg1cxnvgppsfvmijy3p5dtpq3ccp3g9yoyhbm2hi401tm9j5g01acecaj1v4n9y7q5d0jvuc9kvhrvfl6p8j68p7c1oi7dmqw8jgh08y6sd11bjzaoy4qhlhfdgyg918xye5cc73x1wfntwqtn',
                channelName: 'g8uxx4r20k58h9oaqx8mmoo4p16obo3t11t6n10y4kfxmxi8gx80yu1v7s0cw7otzvzw44q223abmczupy8l9bvh11qrroyf1vcwg4jkleb2hxe7nj8fgrzjvjynmcoq4otw7ee6243p2wls8z3hcf9znkil7bzp',
                flowParty: 'z443e3ics5gxvhbp6v81tg9cibn0j4e4xybp90x7zsvph4ifccest5tk35gu6ix4g89ozhebmelz230ini8hu4ei48pboj5ujbpih4n7cpbovvjb5mc55o9lsa36n8rssla3e2jwoh5c7bdwwjfsg9oqualsa49i',
                flowComponent: 'nd4dn9v8eisqagydc9qjd2njczmfma96b5x8hzsnswqnljxezuokhktl49qtgh8m4e65pmfnqxk2nnbxwpvvucsie3670l4rvh8aknjfi7a04vbl5dwofr4x44azoliseytoithv6a6uc9mnnxs95xtsm5v3gcksk',
                flowInterfaceName: '0bcpyavo5ntzt6vhkylpb23cyd9gx9fvwg4dfnaf5r1ac3cmp4brg3o7gzkc8ue14frwhiagurin4o14uqv3otfk3t3bbbawy4jqb1wed1yf5k3m636r6a9rdd4sa5zsio5s48mz2mfpoi9w6o54oh0u1q048x5q',
                flowInterfaceNamespace: 'b5fq7qec4cvcwhlhsnxdvpvdsn9thxninj5jqvgktkiur4v3dx6lc58oyup0ujn4tktk27iyex3z33m3vttzmbdzk75ee47upidh57nsspnq7vasg1i2y4bw25pctw3yzg85s9t8rrp4goanci5umsj5pswblkcj',
                parameterGroup: 'thwo7a2qmgurhn6vx3ufea13jn58coaxb709k9id3af750c3ov6y4pctuxfazxmmtzf4e24rp0tg6g7zmqvx1yal68jcq0qwf9xq2vb1dva513lsxb35xpxopimu4uud7pdhn6x70d4dfkz90ysnresgkqfch08l476xcoia2esxl0cgse02s77l41a6bqtgf7y4nembr6xt8w91yszuddn74ad1ou8sxmqrkzktl6f4u7lcaldnwoos0wqd0o7',
                name: 'lvesuwvucrxul7f4gq3tsxb1ldox9ov9150g8aimol3zsfxd5h9eupxbs07ecl8eo4mhmv5nmpekyho6j4ybjanxxmk9kyiqu4l3hi75l7uzl5gs39yyacvut615k33xmh5s2c2zpeu0netp4is2qj3541jzx56fvi1okty05zy08izhirtqrojqce0jla3dsibi0gq7fua1hhxpfv41hostiiod92i5s6nrwgcwf7pthzcdsc2jsbnd8rh7q7iaw9i0572mop3fe5ogsouxn6n1ilg78umc8tb13oyc9jslq99l5jiv253zvhoe1q1t',
                parameterName: 't0sao7oa4y2t3otct7hbpt83sclchsuda5z9mc3w3lanaj35j6w1848j8mz2ebyh3o29u5a4b4hw0xknakpb0qhgc45gx9ee0mwb0xyud82xn2yv4lhcydr00ozxppd1b9yhsmcfa8g1t5ejdotwx1cgbf3lxu4do1vuc5d87t2lyzanwmq7gaelws97a15bz4rqtqipijdmq4t5ht3wc8dgdbkx6v7eorzw4jzz5bcz9lzoy6lk4ltq1vgdvogz8d79s2dlw80ia73e492r0dlfngroqzy7nxalogy8acu5lcisth2fzcgvs4meqel0',
                parameterValue: '4tc4asyvxcfuychjbilnuy59rqza0rpbjorluqon17rira33aaa50y1ec20gqemls4ke1hr0ane4cb6ahtklm7xwfb69z49ddxmi08ign3ruqe7qiu7a6cfgqjheyq89drjcwcmjgqw0ptmhaydfbfkdcihd7280ra0yygqp41jhxdg4hxss8159bj49s851vjbn532as7sa505692muktv6c6s4vkqfuh6lnxlzym1tql9effbn3t707l1wq0pn0pihgxsbu3a3efyd6o9c4epl0ird920ijgm8wcfvd3xssz5zdd95zkffn3bgit1dpg5kt3mno7xi3wisophkny0uqst3zq4shmxr9apvo6g5z87ylch4nwzvvykb2otev543nxfrn1aq3d8thoexee71xx6j3is83wih2ljck4y86alwp7wm4hf3nsuspqb0swl29695289ta6ptrsm6hdnmvj1gi438alclbmqnnn4ooboprafgprq9mf3ww684db6909lhdm4wgfs5uw6ta100jdhzp0hfmibz6mi0wts8vipw5ni9l07gi2384bxdem5big26au5rgp9uns69xg4e7u2uf23yki5jz7sxllp4rxxtu1tz2eqbyx7ejsx45lz33cs3qn54a4o9ecdoszj77kuc2ij4xj6y6opax9g4biqpq98utuj19lli69hepexvqs2a1uef0xktu1ogs5g52f40e02rn7a0r6bjp5dr3g48k5rulaoy4wl5i7b2o279f7waf1l41e5i67efzmuytyf1j2jqxo7ruy29gfaluqkijf0snahga9o3xi2w1q7hu37j29ddf73qqsd6bhmal88gb4d61b3zfupgekbuv47iptyvo5vig6fy0wwv3b69b1og99y412tw81tvgjzy4be5v013d42akfhs3fhdi42k5b4pyu8izbjwu0gxkdk0e8i7asharftui0lwguf20xs44r2nmy1c74l7cjpxh1kmo3tcr2uxz2co6u2w',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'wyv8av8m2v67ryk2dmu4',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: '3ae2otrd6pk258sk883zskfae22grj8w9fgufas4xg9m9xrpqbgbynaxl35m7anem2401acq2ixx5zem7jis9w1wye1hr0fc5czeq8o5wqd1mtptctr7ryrd5k8sja3hhsg0fvv5zd677ikq4k980m86skxfjy72',
                channelComponent: 'hhiz1ydpvyrz064sj3r58wgv8apm4eonkowz9kipwkqxovpw8wt2flrvdql88qx445m6ir2asotb143dv7zo5nq7ymqa5f2n6d86dmufs6d2h0jbgaueqqv070ojlgr2fnfabj9mckotwvi9nfs0oz3bbv1f4jad',
                channelName: 'eig8248w1lwquktclhy7bx21de8amo5q5jcn7p8sed7mjelpx16w16rxcx538za679plgj9icnr0twu3dzy1hj5hjbe5rxswa1bto1ucwj865vk3p34z1ha7t9011wpufsfx14715u3y9v68jox1nc971rwlhg5o',
                flowParty: 'ur3vt5dsqvefwdvdapxlxrjwaleh81tebi3byouomb94jie7gyt7ursuhzu70jsua521senj43a0g3c07v0vr9t4pj840qplmog00yp31eu7h8bt3g83q71y62oxx38t5bajol6jiueswq7sxpp2wdwemxflmzqa',
                flowComponent: 'krc0g1tzmlaxjcuo6dgwiy1a9sfgcfvj0d02q3y0mrtv06jwmz7ben0251vumvpue48i4mpku2pjj0t0lgji51v208mir4glk04upiafty42e3c868cj8jakqagzh9u8zko6chysh3c7af70mktkowccp0ye0x2l',
                flowInterfaceName: '018p306kb0vvt66m3bwpr5xsy2gl5yxqlcpjud227llc37s4tb4ww3rg6bu5tvl02ydyl39wcyp3yw8470dsxyt8yemeriu07v3jbtj4uexyxq4rgq6yfvwhq24nztuz52xz9ycodmkmfbcqknlq0j8krxzdodf53',
                flowInterfaceNamespace: '8cbm1c6uvhy7eb2wivr2nvu8iag823w4ezcge8ivaqbs74mwqbljiv2idn5adspo9hex9gbpdf9rrxzyf2ogdgq39pd9ujba5hgu7on6n538uh379g5ny882ykspn8677l2bxmztgijdxxr4jq129ngr358akxmx',
                parameterGroup: 'ldf17pswae7b72stbwmfz8139mvvy0h392isuhpcgo95nxhneuo9f2329bksbbzwd7g64mx19iwm9qnoak0xfqkbgpt8sprsmaf9q820s4l3s1950ecdor68dwofb9kgs4friavlku0scq0yjhxuxxg43wwx6wpp2qcnuf8r3uku7pzkhpfugpu1so65c1x7gvr9j3g4gzv0gilbij17y2p5ibm67rlqyco9q4gsi9jtstc5ir3eu2y6c22xili',
                name: 'bag1fiq3ykorqszgl5en32jf7wy4xbvmhgcc8pgoyqafjkdivkg5ciefe9rwuyj7iqflln2aqib42f2k8ukfr2krx56gycrkebzqhi92fipi7dtz6c9se7cfphg82ru2d7skw1srysnfyy7recz2clkj4jzhha5071h3iq82d75r6wyk21tsz7n1ls9yxznz3acwgeo3cw4wnt4mv2qid0yfxltwkfpru9akodhlbpm7l6v9mqsiwis0sodd16fbei7jmljjms8x4bfumaaatqg262tkm6mnjcvo9ut0dgkjjg0e1v5ronbbov3pzfnn',
                parameterName: 'sevxgt1t9xi1m65qi0lwv5wu7oe9w05ze1dwyq0hb5lw6ctle1arp0sr7o0ml1oxuhyg8zoxahon4qf4bewb7zmtlb8zizn7xmo3fhihxpbjdifydyo3y9tqtv01919jo4p4aunlz92rkxamcmezrz7w8radogbnb16m0vjhjc9v9co02yvtva9vrwybm6y7v1tdzu0j8inbwa3alrvv2635qhg0hmxs6xbn9nmvqcoa01184mig6ppskgmg2wql02wl6n3k1ix68srrbwuz1ms4iiv8x5iw4ej8xzn5xn21qpr1i6jzipwe4e7b5mrq',
                parameterValue: '1nzjn6xy4eatxy6djz465hoxb3dtr20pkyxgdrkmwjgmmm54j1fmzej777ancxk3a7e6nqpob7hdk9yakuljec7p0zglkttl2bxsw14fhcla0mcrvxkbi95l4nurw50xhkhmpy2jy8kpzjs6juidiheaao72e1dbv1t2dyku2jz8oom0v07fy7ogmbfmq77kgqb7iz5upi0z3tsuuz0ae2g5cox89mc3abufvijzrkea5em0pvsmek5seg4qt1wx6ybumd2qzdh24kioqxlwcjz2qrxmky74fb8wyo42lfi4fok8lbufy8o5geollp3w0umma5mu4yxy48ddg92eqjjpcyydnvmb4ta9kneqfkviz8x58cieg18y15s4dkmtuhv8sk3a25whkq4q5gkqckhnil47hi45iw60m0rda8ykv13ibo8hfwjndjr9pixqqwt8nk9sbigpz2pfgzj2mfovcei3gueuaf3yzf7zxfx47kkkksdpb30x5am0wp35htfviqvv82qia22ypk728spkjw991jy4h2dkhr06z4erhpy5bp8doiwebkhe9t5j8pt89x3zoqtc85dml2ekbkyxe5wiw2puuv59thp46frvtomze6g7mw8imzljwznxupm3fj5ujjys5akthcb4rnolmg0dup5mp9z7vwhvlehph0hox11uk0es1lyznddhxvl1ne5gd8amr5dfx3oq8h5tlfxqftjkab2v2480m0ytc9blkg4dzi0658oopvjufa5tgwts1et8fzacvburvar0cnvn5a70xa4yftx75uvqaajsdm35gcpnc3s2i9y2xp3mw1e1jj6873k4ass985eld8x1k5z95rioostgrex9q5jtbhyfw01147h8b994ictswbms1vga4hb472sewkhlfvbqd0k2gj9sihwvpgh3crpfhcpzxg5krudwf82172bb1go2po1f37qiwm3bpvl0lvg533pz7tci9f7zuigwrcqglka320bzh8x5dzhe',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'j3kqwodbkg34h0dyj75n',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'lth8k3gt8jrjrcfbh52dixrapq3vi5crlobf5zj3cu5xdu1ble6z1f6wi7trb9wfl10lx3enwt5jeggl8a16p9tx8pdt567i4s5yf7qx6yq1n4yieo2y2wl3snn19wodn8nt49zkul4j9m2marhm25ekoxgji4yw',
                channelComponent: '03y3370p1ujqwfkx52j4iquphbzpc9lxyhmcc8tfutb6tluv8sumuio4eq7v2sxox1z1flz9wm8pwnhokmvszt3qsk9bw1nwhngapufps76tqmc3mi553anaffnqusdk86dbu8423ni1ra7ps82dp3n45f1q3tak',
                channelName: 'ouf0b8clf3hlxm4dngb4oms46bub0zz4ft41bfc6dsxy4jrhogidq1a730l62f761mvut1p0chx7vmyrxju9p91gr8rxeoa0i0va35lo6qz47rcsa17d5fc1p1fcnogyqmwlngxdjd19ajwh30pajt8qdizv6tv7',
                flowParty: 'u02i89m2i9pa4ubcaixrf74jpvnqwq2j2jbrzhuatqe27hr2vebwr2rl4cdiva62d8m6zu36uxugonmbvzmtu4cdqypskbjve9rbg23jdp0n0okagwzq5t5wbbrp0d0m319qohvl4lm2766y771jrjx76qaez52h',
                flowComponent: 'o999h01h14pz8cy0a8y4bouenxmt5ddve5nr6rnlxf0ji3ujkyggieby0jrlip66h3s2k8cxer9zl6o6pty22ccf0np4km7robmk6lgqkbc6scndi4377r6721xvjvuud7daujb9i5ek4fmkw1yppe42hko3g4h7',
                flowInterfaceName: 'zeg3ojjit3v2vk4kb3jss5p9rjxy58lof0oep7ts3jdklajh1i7ighdsei2qcoaupvgggljvo1bqto3faemg4e8yakmhe3f19gbx95qr5sr54edrr3fmc6nmzw4sxthy7p0oi92330ffr53fb8lwxa5ew372smj7',
                flowInterfaceNamespace: 'omodnuy3kltlf8i8oy75dbap5hadvtgwj0a5p2ffki29f6bpo2os7v8putgjex3xxyquurxb9mxxpt2hfrfo6x06x7q5s44hlupp623rm66uyjd47y9ct9xbizcu8tk9a4vownqckh5jws0840tdmgd7ff8sxch8x',
                parameterGroup: '1fflm5517koa3gakgo26jgdsy0nmdwtwogg77cygt1vt2ytzuq9sktwoucub02oau94i0h7razmjwr3gk564p8t2acr5drmda24x5w97bo3m18g6uwtwaocjvyqbj2t78ez6n9e53m32fxqwfkj34qs4xj1lkyi49kblqp1m4ee4y6hw2ihghbm99npmdi4d9dbmvzdo7avzvarz9vulfkkvnjngkjuenjw42sp83d7jbnge9e9e5abjs086xs2',
                name: 'zaz02aw28bjgvzcblxb7jlkg0y0kua678e2u2bu20t04d4ex4qm3iv1lqiuyg4ccf1yy4kw0t31wxd327xsf8r25rvbv1x7nr47ii0pgyidgmc2aiq5wgi35fnsf8l5n2vrosehls4fz2vgwcnedjijvzymqu81j98demwiuyvmrc6iny85lqluzkimplye8v2mb9nk7fphya87kzznwbdhxiqsmsleu2j5qs2fwxfnxcvg9zlevibsov78650vg717nfmbiodbbpsj3t0n30bneopp80xbw8zbvhexedtz7x6zwy5kg3g77sv2uap1i',
                parameterName: '5dq20xltkprhg7orzgdclf139iqhb57ew2u83urn0fujsk4etxqorvdbdkk4bvsicpz0p7csso8zdsf0jv4x5qve66e8jcbx7dxhjiui3h1ptj8dk4wme761lpy1irgnzww0sdrl6fds9ed1k4jx2z6g4i1f0cj9qn4qap13zcecjo3rmd1p8y9rvuo3yay1umeqsmutsc9bw3ftq9ygnhyrgpkfgl2211uwramsr456h4nadusvad3dbttkn4g55qee4it5xmedauetiq4dtr7qu877pupu84b7v58jgl6m7rlyd5canf1mct1finky',
                parameterValue: 'aqfplhu5ax3sav4g9yc7aduai25autuwrsq9rntx10v37dildqfrqixk0sboym6suqo0y7zbe3eaeu8s3h891e3qtcaj5ysc3c4s7jzx51lorb0n5hvhnh270pl90ulnu54dd103qvv70wrcadplbpfpo0kqla267mpeedygjwvimnf3v6a95rqjlrh9rczrwphf7ql66fdl5al3vyowcupbue1u0h13r3drq1kf9jkldn8dh3oeuyhx0k67ikbitgmu6v6d5twi8oa8a7emyqwi2z7st0zh1ps33b4uvm1y1hbl3664in5mn713gwxlx00eufiacfdkdrchrqq7kdte77sur5as8l6710vzyc2sct1vg6euhl2ieq8fsy3nrchtq25ssojx4vysjrz5zoqrgra7y993z1ch869dk76okkohg616g1z0mhmfdavnl4exvp26agr84qpb50thcty56fas2qn5vf6u5gmphzdm75bo976n9ybggf45hlyg49l2cj9chu6eubqp7761xpcn0diismcwsvo3t4tacp3n4t2hx0yxjtmcg16xzbbgvymfcyw0lxql66xaps2zuoncaqh3it37k8cevj0gq706vtf4lnllka514w2zo491cut0qsguvoxj5078w6kie1jf6goi3bunjjtaislaa5jy9h41xt54wbken3oz0ttyqzm6ntoarqe6z1z8y53yevrkem845unu2xtd6j9jmk1957ao4id0hv62592c6868nbb0zecfrg09tbf4j2h5fktyra5s3nxokvk843lrf2w59ig9mtkafvqfhilzn8pbh4dv4hl8m34372jnp9x4pe73ynro704acxrfy8stwvifh9rc4kd6exl84kj43afw5ss0q6ixl0s5066y19kerko837q4wdot6wcrvyib7vi33x6xoh8pd4vv0zlsw8xe2zbuw3mwyhq3trnq2ygay5a3q1skl14y3ffq6jxe9h4cdg5mfb1qf2548xc3jl5l',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'l7s8jv3xv3hq80xylong',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: '2u2vniuy93ivrt47l3mhk3uzmd3idknulvflmqy2ba5dbjeho4e17v0ee76rmihbvp5cb7iifzpclrd0276llythppnge42x2i6dkysnnpctqg0fw8545b69bh0g8crhp01tsvo7ekprbzun9e2mu46fdoigs6a9',
                channelComponent: '4rp26nctg1t011zr7ygp0i6gizteodef759j59o6ey9zd5c6bdjriygijczrsa891dpba98knb8com5qlpfuxuog1mrf8qf12oyrp1h9sa4xs99vzbd3sqwlrqwaurxn3fvnbasqysct4n20m9vy3bdcwwd1rdhw',
                channelName: 'qsk3b6ox8tbw44ml6l5dwm5eagycjqmvot55gzd5pl6y66w8mgic40pua1z3h8rdo98pslkmen7ux8x06ypqc2ao7yo950rmtoillogky0xvbef8na2tu0538rj9stcfc9vwcmv869h5kv1mormy8w7i537quklx',
                flowParty: 'w55ezqqqcgw11pwqsru20jx7bevooyoties3c510ed33728b12hrutc7it57irg9ixextwo92al77uz4o31q79a92ztysqiyjwz2x36z9ozmt90p94bfozbq9j5ccih35aj8uu5yqa7dnle6jrocp6puynfxzbz4',
                flowComponent: 'jnfuk9gtzkzqe6shizmpv5a4ktrprbd056hhnu6vi4zcrxujvodvzbsm9akj6h4uvsq5rnxvi1l7hhvsi6ed2b8sdeb22ourdqi9c642r5l23tnrcy6zl3l5yd1to4mpmrn6kh0f19w9ht4w7qnm842c4v9cbwt3',
                flowInterfaceName: 'fazlx97au7fp0yjxn71jxl4uuuzf3ifrzv0tw78biet33wl4u4n64v96f3biwuzjytloobmlky0kz2v629u3ckbd13nvkz9hkgeh01929zcej9a8b1gn7zwso4fwcql09niabhdh8qo55iu1co949zu2lsk6xpae',
                flowInterfaceNamespace: '1gqigz7nrgaghan0l1jjbvpw1inr26b4r20pdgz2tj6wq66aae1micfnz6p482mm19igdy40ar8kw7sohuvz8gv2fk4sqvueeszwyrm7sgzkgw55bv873de7lmqdv0xv6zjg9926lp8gxougbfxgoxd4n7lpctyf',
                parameterGroup: '4akp4okybertcappm3627fi4px2velekw8klkcptd6o50q7n753pio0iyfm5owt7agcz19kd3zsewgdwualsqi3niomjgrhwomf0hwrxbjcosdso96hie4808iq9gjzxz5svgjj3so6wd74f61zit20g7y41gr8pbdpf19y5i2ngwmgao4rr1598je50q8rxdxwv20ds6z3nc00z6dqtcfn4bbghzlr804d2kyy84kevpgont0imw3hojd5ttz0d',
                name: '1nilhezjnsdpkjw3wvd0yl1yvxu4jcny7miuar43ncnokb6jlzxkaekwyf0nlsoijqjqtt7mhhiby2apth5pboag5uyr08qo3xmm3qmyu0xhgtemx6czvemki68g7433xsq7o49p7eg0kqh6r65i75c4d5jo4ozxdz00k380duxyau22d9rpiiblj0iy7ey3hsu74stcsj2qu616s5zggnwmr7usb6v9sw50kv9n9yae9pue3i04wie1udkw5mbmtbi3rlmie1k4wwr8pv8ieqw658owqrjx4sjwvumn8cb0x66ntwf3aufk6urwk1me',
                parameterName: 'y8k9p5e48hin8tt5tujvwxvkq6p3f80xd74gsw7r59oc1gdbmld1vbr8o7sl0kr7w0sdbdm46mwq5utqknlsaot2a2oc211o58vr554izkblebqrqgrizjd9hvw7i6hmvl8b8s6gms1ybllud6raz1313gvnjj1ln1ilkycqfxh6hogimy0c4myrjekwu0hakxf4zv6mtbce0lbp4e0ium3i4rwaoeoqqppt619gevujacrtynhthy5x96mn4zrakgtwtfi0eoy2bgcnsqfn52n3msciqqutduxv1zprvbfnsh4ksl2a85ra1sgtb6br',
                parameterValue: 'qeknqekja9fxh0cowzex82wyxa21mp046rmj1r74e0tkqpk9ppbywerahvudbb8wa2qeq6ieskth7q5dlbb9zmqxwig66k6vil1g05gn0p6dtw0xgruxg395qvpxchv1k3jfvgaodesnd5lz9b1is4onnsvx1lvrqglt7e3puyy7d6ndjuyfdozd6x57a33n0w7mz20msj1mi3ovxn4qolw3lic5e4alzb88ijxrzwjdnn2cucsmns2u3pxnqaxi8lervdp7pnig4zmcqgczljo6erwm7wiv4gafzwf8qsrrno0uog89xqasiz7g4xkt5bgmjt8z61gj4br9d0ij6ioyahnkxm7taq9pppg7fm2upymg3j0xc19z4t7rllb4oydh286rpruvc9e47ju3lhay45nlhe9tbgto60z5cmfy49foawrwp2a6rv03a4hz2c7mb2py740ifuduaajhq5uout6bomrf6xllsx8e92qjpy23dwsnmjg6cpnndtgzs397ivn3qfmax7kwgnl3jfkcfz4dww9k8ngdoji8f96sbp8su0g6se1rgt5qbdqdd02tnfdh8vv29avravhuodumqiaqqr93pdwy99rcfjjbevjw1ayvr2y70jq64vmprvb26h9xie7rz1arystbhdrlq27ejtjz7ea0ui7q81wt0guzf4388qe1v7s0e4y1y7unnizjoijqjymmlv7oyhrmn3pj4fbrqsmjtfs6fk78wyorejmg0yr0rdvbsxagc5vjgfpmuiw37c0w20qiozai4tt5m500wt80gcgrt7qpw02bmyhtwtp9syxpgwpdumvlzwntis91u3aim68xfzkhgyid5wl1o3hegainjpl3c76eid1y591tmi63jx57igbhj8frnmjr13o7z8rzywuc65xhtefziljxkrwzleow8ubkn92dlzgg71puisqfuw60pugkrgkhrmtghsf27afav7w9m73tmx6fw3qxsd8c1jgqij41oy9vabjhe09j',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'q727tgl1f05k433j04ul',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'dnw9f219lea9dua6302rzeisqnl3u4wa2huxevdvt2297gez9ysobva7ucd0aiytr9gt2yrjr0xaajvqb9xwzteq8xnngrxb00865axjwlh238w37qdaa2vkpackdfg14umxfet7vg1sazx72xxoznr2yaeh33u1',
                channelComponent: 'wgqdr9wrfjc3ppmv2fuchqetmrcxfiuikm1s6s4ou0w9xklxhoirdhtule1481a9qr6nxozy4s80dulzqn54fc8ccoqwmjfqddnieql14c35vngiwblud1qo3s64h7xzuvj70khdlh71vz78r5ubwmsyrxmp4dz1',
                channelName: 'ecg4f2t8dpoupf2x0cgh14zhb5q9yob0l36e4j95vpiu5bxpcsoiotrsd00f7spvjkpu7p4wdcb5nl4f8w4mg309ehbz7ackbkz746dypsd1lfy4bl86epijrom2ih1k9vwd58ht7s5y6lyjctiqljr27omiup6s',
                flowParty: 'pxowfe0csgbb76ey8u2s1xkqeyirqra5m3qwa9z1ch9rcs38wyqxve6i940ivgaewpsfafdd90t4wb1j49485loksy4c0sj3cj350edh6u9ixhfwgysryf6syz1nntp4zi4gvgl15oggjwyuzkevkmtq6nhu1401',
                flowComponent: '6j3gehnot5r1usgv1wc2cp715gpakhxxa5j997r49yp94vjglpmeuk8tzdr2muf611rbt76xthuafjvtobu2ig45tvkoloqkv2dktgxc52hsv6mwms33073rke9o95zcuysli9lma23sbp6ow4s6jtydm1mikusj',
                flowInterfaceName: '144vuuudhc83it3m2trgqkc1kd1vb7hljz8dyh3t2p0agbsucuw8lzsudyd5wa8q6dv8tfq8dwdj0suhtzj69x6buqeymx7kwoq6s0mcw3jc0iaoayeedjarqhwxls8x8svv9xvkg3dt6ig2kvj2o5cispxq34y2',
                flowInterfaceNamespace: 'zfs8mje6ro480yj7cluvzmvho7to9rf0wcri3mewol2qa5bt9ronb5s8zp3ae1n1jx78ond5jjtvrm2v76rl2wrpv7azlo0ti7oqyq8digdgw6711nhi4gfrwuysjc25mysj2ngif3bjoymc0bouw6edv9j1s041',
                parameterGroup: '80utsx2o6w75yigw9a14pzfsghwbba4j3sri0egtdyk3avib3tsrhf96f8tti2f1880tlf7h1r9yteq4j1h8m4jl33w3vsukltyd3pumlf10c67pq99vys6z4ay79wq93z93uu67jyav3ammbsa1emq8odyrrvpqgkli5i6gdzgj6lvwmwwye0nebf7s7k56q3r3tml9ia2me0ppddcum4vwaetvtiph2k0wg9opi4osgax6678hqjl81fr8rvi',
                name: 'lai6r4crin3d22zizcnfp3cf0tum4g0xsvg8rp24m0bbdqx1x89rfv09diofto3rhbi2qgjsgjhzx8prcq4fmkgo2m8cf74nak6mhatn93znl1rlp8gexf7htvfi90x5zl93rk68dzat7y9hqmg5leosq7vnnl13tjvs4uc52mk31a6icptji0c18al58huhxibor5g0k7a2kgbj7gzae6kgzhstvhyacqrc5kipvni11d7lxet6ivmn7a4p74odiucskini9rjf5k4yzvkmods80dc8fdxjx1ojy167u9iik7hda7gkldmud3ni2j008',
                parameterName: 'lloieziefm5yy2jy6e4nnw9nh0q6tyf0rogzdhpoix2na7iunq5ov3fwlb0nihxszt8uyh26tzdbimy5z78j3leu7s6zhii726muqib2cuaoggvxi0nhiacxhj8wn7z4y1xapt36s4e51jrkvwtk6gg071os5q4q4bspcrhqs5ngxrsfp3k98g5u9v0c8bkym09lwag43rjslynj30wjsaexvt2k2p9ez97vw5ojjqs1jdjon1aofxrcd33dlkciw76c1do0k6ifw618gp9bvbudlfatcbholcik6hrc2n1jaujx6kpg3r3qrt9914a8',
                parameterValue: 'ug33yuaf276gv8neyu177lf6qvq3wwy59fte9hh9l503in9pp48lonox8jwbt8o4ijhz11vj2417jymtlbjh1km46rnbkcgk7poc5c65euiy06r9j8ywwgnpwnrvg1ykz64yhtjytszpznyid0r20iuxzfzqkmtl9fupd5u1fg8kvefz8t1fbtc9yn2sci2sbp5xgz93sq5pfz50mtvh0jvnxa1syo0rfh64nbszrtuerbkyxxplkxnh5jl3wmy9vvhr8c121o5wj9wjtwnl1lg6k19ik0kiob9i041huh0aj1krvwrpdsxz9dyjeo6wlcexioqdr3jw8oo4pj1fkydadmjgwoidsh6tifd4x1od4yctzmhsuj0w2so4vd4z08lpk6nhem0g9cm7x2jiwum9no1ncn3qjid5i1nbuf00vp3l6fp01gx64m7hjnqq6mky7gd4xjenktpyn2ymcc4wtc1s3dvokdq42zwn9701jdzbh68hj32len70j8wkr8mjsda8tbx0x9ca4387dk79u740uuxjoxzqp7kvkzoz0lk39tk2xcvvufapdyp9o1a73otap1ynpb0ozsm5s5sp01fwkjywycojjr39mp7lucxavunq4j20347tol09xyco32er5x45w79labmkdmgx1akqnzc3coou9mxpybvcw2unpslln5omonlaxkbl8p7tio8m8hqegkx73d3a6y9ota0nheou0qvqzwpx607qu5icsodbx6w6ghpyk0j9n85rofpmwsxya06unt51u5vtcgzpp14gtdbjuu1b7jebki0gmqkfcip43mpqq6j9d6jrli0tuhb3yli4uafg3obx0f29dp8io25esidf03lbc4kuz45u7vv9nv8gtyolah6wzc5y5v66rmmt2p0gr0sz0ifwp38vl6x1ol34ew05557rm5ieev86u3oc78z76fw3osykqpawlpis6hyoj3ghtuwd60sk4of7qvcqytk2jgvwh1jzhmsqle2tokx3',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: '1n41c365sditqwj8qxal',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'rk1ddrnyqtmlceknuy4v0d2sqhlh6tan9cgpbzmkolxs4d50bs06hplkq0d8xq5ybxze3qkihjv468paq3stgnz750jezsyv7smayvb361udwyuuog59pgb0pnb753h4ye0c79vm7f2mk2dsrpr8ox6o7gb5fd45',
                channelComponent: '7d4ztsa2jvkgfn11nykjitiyixxjps112sneukc1f07fx9ueakcnzstvagl9i7w9paif6sl38g7qeyw1ka38zuj7bi4as83i7unj5621hiur7ckcqed1aur36oxp9vcwq6ktg6xtc8msg6aknup2xl0863449n8a',
                channelName: 'qbn14d85n2chxpfwfip4uyuey6y5o0ypxtg57zyyht4bfse8ui4hbiw436rjzvgdondwuccu4rhovp2y67z7ve6fklxgq6qhff2g6hjubw2enmkuag9dtchyedoc6psdjvd5p5hehaif6r21cnma2kqvlhso8287',
                flowParty: 'sfbfxvhcxnbfux3gkgd32fr8z78ztxmyr7z8n3lll5yjznu7a0xgv3dmpe48hcrbbqt5shqvxodgt13ps3jolx5wvpyqjugazy5k4fcp7q5kvcs5qllb2sw538i15fkcd4j4cd4a794mmttnthfrtv9gz1d49zbq',
                flowComponent: 'et3uxygybp7qb137gjks8apun77qfyoz76n2q4od0i9yu3naq58fej2ar524fkmc6mxv1u7q6xu84xqro07hjn5fxxywks8qcr3n023xhn25i031x1h62y4jmt8avz6r1dwf8uxjscpyyoxrr7widldpwgyqhcym',
                flowInterfaceName: '78h9hiuyinsczxfkzv8c2u4dpj1wk1kny32xb3sbvmziszcxf9nuefkiz1ntshdnzbyv6mmwfsbrjay2a998hnqko6r0yw9jw8kmeplvv2egrb4sduilfic4ar3yac154yyz4vvr3nf1ubgeod20xgqag6fluzio',
                flowInterfaceNamespace: 'uiud9lpqraolu0dwthn14cif30mvl46omhhfzcr1f4lsdmzus35z9e5caxisteubyd9ea4sq9yf7zifodnv37pxxwscwrfz04yw19nzw2n1kf5zqz4cpl2gotopbn9e5vocieb6wv5bmblj74b5x5ye7oyu3g1vv',
                parameterGroup: 'lq5v2jqmvdt6gwhfca256eezlttjrqewks0g89fzfny0xbolmjc5zcqwep8j4cmsfovm2z9iybna2xxusf3alwch216d5dcdthvrd0073ngmfz7o2zv8fr6rzje89785cixtowuk87i7a22hfg4c3e42zhy0cmw1sxylez78chro1ibaib1ityeeahhobbxsm5nh1czwaiq82ulviqz97f4fp2z71l059p1ccjq3ssvotxb2617ruas0eyfwl5k',
                name: 'pn2eoxu89hp4b2ayq2itr1kju21nywq1i8wobe4do1e93050i73yajaq9a4kl72amfp4d5orxjmur50zbvn2uirxt4fav9wcirma4plq9a7pqv26k4ifr8f29675ld1ha2k95hl3k6rvpyr18e8055k7wlgvzt70r7br07bul8pctd7xgty79k0iluhymgd9qy6uhwxh3r09c0udlwuvvemr85bktobmfeewjbpikwi5i3fpx7bhw9wuzn521eym0rzdd850m33vw0i1uhdycm943jx6gbm674c7scvmvy1u0sl5v5s4ba6tqqaicl35',
                parameterName: 'hnm0c58gruwijnlu4xlufpsm41emu3rm8k38t39i5vdyatqcfh4rdpem1h3k3woewu2t2q23rfsz7qizbdkqk5rcg02hrm6sgyv9gl45clg3wyqtvqcqf19rq2eyuzl027kt5ojpxil3rupnjrtwfjnp5fxpqwtefgtpicayi0sf41iq94dbqsozljmj5jrikbcuu218pg8x2qhp0rw65rd4s1logi65lm5s2pqt015weepcnj32sl1onmicnktnpt6b64bazz67d00guu4un0mw62i72ufhxdtd7kqy5kq0lxpeuayvbb96b5oj9b66q',
                parameterValue: 'd4dyg7vnr3nw9945d598uilkujp4vwtf48d8ch641abm7ai5k0epkihvw82tn6n0uu4fim17v5dfcbrynjg1qnweukmimgegfsdgyjb5tmblxplejuv24icwgj80478sk3625l0v6u1x6vu0tru2e4p6de7972rxgbsrcra59lzmuoi3hwzczuqnn88js9ahgekmsy8tsitloluofeimhied1jb6n42t0lkamye8bduwhs9m283dl4xbeovapgkfvz2r7hoqfpvzq0kdwrbzi7vr6pikbblmduifg37beacwfzdwezmhnclbq221a2k28cfw9tgvqtym494avth9x3g1rhbx9wcjd3rgcg1gmmj9y66idqtvy0s5wb1que5re6jp75amv7fu4sob012qokz2zukcyi27ko61nmt9cnaayqw3ee6hx1bmvdhoua9ogqcztlxactdb3au35q3qfn1ti094ywls51j1q6umqncrksw8zo40tdwe7au4jqind5kntw465fkdj01ukbk5g2ba26hlcpt8qaozt3blr9jgx66z67c52zf6aa6cj63xil4w4z9y4001osq05e6fb1j2z3q15e2ebg7514uokuv5861m5jf9q5uolbuogwzzb5qkid6lguytrvs3bpj6tf9vmee12ekfwqnq8nvq6m5oj1tpjkdl0aw6w831it0xols4tz853s7gg0ds8dfexhhmu3fl7qee17h52x5ds71z0qwsukkdnnkangw11h5p66pg9jscfzp725j5sxkosjp2twv4gzdc2wqir727cu2qgo1zuhp0rnws34o14urizioess4m5c8xf4jdg7cfifbt7sbtj34o85p2dzlfno76c27scu8227veoj3y1a5yank8r9n6amxx15x29ksjz5pf9n63t8995t41retuulk7f0cvvngrhr8prvo7js5eim33wab6filve7tlogs11bux5mbrlk9jyvjk239qrqxh5tzgscubqrwu3gf45wby',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'oabezghju72l8iovf9ki',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'lf1lto02dt1crlf4lw1iswhyhlvk0nf0b0hhfcu6ob6xo3tu08bfj3kt8pgs72k60gy2eogrxsgrval0u0gz6no6czam9mfnl4q908hyept1fxms7tga6gb1m9ibjqvqmyajh9jsg6f9iq4ju8s94x8h5e9jn0bq',
                channelComponent: 'epulm2tdv1wmpg4rb2b012pcyfe3lbvcgy7x1tctnxuuhhmb7vs6b512j0kts4uzzgiko5w3643nyzdazb4hne13k4qju9zk14zr24qml6xti3yo6mr1zlphtbwc4mdmt6x5pskkrc034u899kszqxxn5wg8gr3r',
                channelName: 'krh6itgmh5b14gug5d3u9hpfvgmdxqxv8q8yegwsz60je1yle6pbhmn7m107pxbuxhiakmql7xkcpqv0fui387lcrmu5fdltvs1b81ocbgtbxg1pmd6mme8twv6e2xtpl9vsu1taq18txkl54l8veq6enibu0xm6',
                flowParty: 'y3l6e7b01jcj4h3jzzwfnap2vjm13j7vccp5szgt27x35qispb9n72728wdp3dyy2c7uib5ksvxaawaqffdqz6j130rq3e48n6uvmsbyfvy0matvaf3y9ahlall0av71wlce4gs2fvcx2d9htor8qfnl4z7p8qnt',
                flowComponent: 'qxok6p3eecpoj3jnhx4z8mwkntyvc0vqjoqgt4zaawetse7oc4pkfitx6hn3fi4mm8qm2tllswjt0ka1gxjmej00mleo1hoxtk9rq5phluydt67fv0f5g5wakayarf6t2br7i9dzudeso718g5evaniexwaffirs',
                flowInterfaceName: '6g0u4x0r6n9gih1wsqz9h5usib73scmdrhcjss5n36cjdzr2v4g25dsv5wiqhbcsd3ea17k8qmyvc6atwv8u2dyl2v8849dbbed54w33jef2lxv4m3kcli9hy6onsdnfj3r4qe2xkhzbnng77b0n9zsy8657gobu',
                flowInterfaceNamespace: 'j4bgyhps5wotheahjhrpid7vk4ag4302at20mqltsdo88ncpmdipixqpk33mo2i5vpsigaxi90uymqfv1zq2ckwwv5w9b9avyuc4sbebdlsk6drslu2o0rq277m732s5ixh44la9fzbtszy0rx1djyryr4dzuic6',
                parameterGroup: 'ejthif0274ys2ja5wy3tun9a58qhuo402m1temq4i3wi2rmk2jimc08lym0ar2lmsqfks7ks8a5u4qs1jvj71ikhkb9k3hvlnsu0g0h8b0csgz5n5thygjszczvkjysstx5iz06ppp4qmoqztt9o16pqp9nidvuep5yx4hgkksfdt8a7mmqa9khw71pwi7kxrdp079epl5pzh0tt4w78d0o5iu7euwvjrnnhru37qdfvfu2o5nzfsygt1y8vl5l',
                name: '3unokgxhxz0vf26j1n26oxvul3bkrziomhiubzjn9a011y976mydnjljz25thwxrm8mzm6iikd3u4cn9m12700cwty6qvk4wj8ta852upggiqxp57z46157wrjc0yfvmnk6qtzkmmdwa6y7n21347ng1dzxpl74xkzvua8dc2311e0nilpiwkcfytmpd93dk3nv4ayhwjchu3jnxwawrwcs50amopw9h7a2j5lf6gw60y0p3o7dg0621mygmup60n0v7nhg5axu7fc10ruq8wgbkplv3scgwx9pkqmbki2nxaoym98yjmptx1ac8dmtr',
                parameterName: 'rmktjozztpwcoca72bp7nl3nmxpc7nwj86iwyue94q7wmdlx60abwr7tsymgxjm1w41lkwg2f43r1rgs2vwugon0u4qzs64jna3xryup8oz3zeablfrql44wc15ielrebnqka0yc8spctdn3blnez1pax377apg48nw3kchfvojmrzc8ou13uef82plr1vowgcirhigp6ohrcgd4oxyfdose6ghjzbcvl7ztruhecaug5mt5njmlbhbzxxqoc0jwgzpzwxirzpm0njfap7kpbugvozgl0bc3nqt361t5hpp9r3m4vrdrq16q0r82yx6c',
                parameterValue: '42b22g5zqxmntab247vplp59jziozv3scoppdj5au23fq45oj40izg3jp6dosw8o003ym1697a7w6y7oe8dan22de87vwly601mhpgvujlppbcwewylcj1epjrein1meq9lj0s42rwdlitn46dmxlgqtrm17ccrdipvwlo1om8jqvzkjvfj6xpk27ep94y19n45w0prkl8ii61pl23nwc2son0ip4nliymqhtv1pf1l0v5lt5gzqljlfbc2om3rdir6xn2vzijwhxt1omn0rxumeu65mkl4swjhei49hv2wkps1xn8lpkpbcrmhgigiu8gktt01pd6vpkvrfwlxwca4u0lusg8br3gkh4azxxiqfbvh5udbewgouqiugl724i82dpbu81r7ror8bfhuge4b1r18k693h502voiwaotb4gqbkxoor2nj5i2uh2rsiyn2hfjui0n84let4j0z7tlci3bofomacz8waoxqsklmtw9gnjj3c6s9vy1t2hngqzqenyctj16azvg5xk44801d1fjfeooyyyt8jv3eq991zu1flacbil77swk2r9oc3cdjio4dz87ztv2or0wirymdwirelzo0bl1beua5qux90b818gh651gly6qc4f8f7xicd8kbxn0t4ik1j03d3mpvhmogeno7sn5ov0rfyfqsvmvwgn36oyanulnc6qazyln7hpcg0vjlnbaij836tb9ddwp69mnnadlfaulnxbxcufz0a5p5ea9ksyvtb010h5f4nogthw03830fobj96h7jjb34rkovmxiqlo6htmihxac2hhe00pmaumg046zmba10vfjgcqu3caegujvm178r4j2k1kig8dk06lglbvcz3lumnqk7kti859ql6sqh7gcengd2s6fw5c7rg0vlwjbbrog2vucdfawgvsiuwm3wb2jc41dkwyu7iqzech3n3uzzxd8himljy66tfwy8ys6shnjxjz1e1smqywu1gpgnucdly4jce8hho6sto0p980',
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
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'hkkccecmdmadm8tg33vu',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'z56uau06ik1d14w4mgzhexo7suzvzilk121x61s3iic2riov9039lbdehl6483cp4kphblj1mb02808ea8y6vafbpcwv1vrliwojh8jlybxe65otj68pgc5ib9dn2w9p938pc29kj2vnqrvmwqa55qotfy9ujshh',
                channelComponent: 'b0e8rsy1jyws7aomznpnw1vq1vd7ern72hrvil8l169hsm632k54b38te2jnrhl9tuws3i08uiys516m7f2arbrqi9r62effqvh7iac0csjlcd4srlw517xixfbn32cpmrmkt8l0k511o73wfvnd4mggw7gwjac4',
                channelName: '1cd7di8yibzudl45ysugads50ahwbatxryisaklsqd9dy62zzvx2i4pyqquf1i3nmfze4ujojwaqz63kmy435gz8tx6bzbj2iqabjgx3p1hvuqvpczomay3rv89bqizngoewew0646oib8ygkul4kgppdfm6vw2b',
                flowParty: 'yzc90ne7jxjpw4zcbe61znwbnm1b1yujotmkmez4iv8yrq1cbsghsi411vyg4uqu2u5825mmec300ut4gs60vmjsoe6sy3gic4ken6dsdlb7oogez74j6qczel0fa9ltjhjuhfgh0jzu4e394miguznrz9gubq12',
                flowComponent: 'zhb9ijhf2pc46xv91iq79fhvw27immr08b09vdqfwyqewjo2ycx22i3n78p7nl9wafy2sdxmimmymfy8h1s6x8lmzg047butf2rzt3kldq4m6kbnhrmhxhqlmqok13g26rd8pp46mi2v18o31116u0z2ov1l8i84',
                flowInterfaceName: '55ijdmvj0rzct2ftg87qnflsqxltkca0p7avwsuzxx4f6xyla297r2qy61os3fdee0mf7sc3zkqhn3k1r04drhhpw8e901wwwnd7jzqe7h53ri84rrkhfk3d5xnmdvrtkn3dokcpa9fr41rc6znls194m1u3e2hr',
                flowInterfaceNamespace: 'w2tcjc7zcurt3gfodo810eyqtxcj94v01w0t5h6fttz07dcdya8jzqhf8z2vjc059oifloaptqt366jz128ifvoio7r8b8cwmjw9epwb7udjsvyhbaysly3f4u0akfce2ygx6a8o9xk5xavzgooeya7lnc1yomva',
                parameterGroup: 'cy07ozhamfacj0hm4vwfsf806ea4prpga2zw1ibzewxop8gkn9s1px6jw9x104oft3wt8q2sw5p9ci8p84tsl62negw04pv9g90h55s96dpulhorvcvjf6jajs3i5dv8fz4neqawrb0wvikghkmx2o6l8bl1ykukykrpzbk6d5w5tbrxekxx0tgzy18dcle4qikkzvmw3dplento6pghw4fhtznj2ivqbima5167h39uvjbx6xj877hkgyf11br',
                name: 'aqohjfvhs35xeixz64sdwoty3wgg281bkn1asg37hc568r45juzpflo7jmwijd0i274v6xzvkmwj3e9qa76mr97ueqrbghjjc0v8e7sj8pcgl570ss6s1wj4jl12dt3u9prh57py9kuwub5wovbmh5e5v93dkjqh9zntdk3vi5wwp5aldl3gan3oqi56jqqrj6rzl28ghh1z29odrjdzmlfz89q4c8tagkbneitppnsqywtc1enu5fczklo2222or99clj5kud0zdjl6z0r6cvsq1lj7nx1wmaj9f1kkzp42h3rpm7umt95hx7sqttij',
                parameterName: '4b0xz7b4ty504s2jklihhzn8pdhyrjw3qcza4nm1u57alw0rfzqw9f38tjhqg2761bs1xp2abq86pi5cu2me1ibro2zukviyml929kkld7ohb68qvwh8qqqa672v06t7ayrs823daql3m6rcp8p49klmi7s9n1k2mlaldcqijnn9r99msqlixs4oa4y39ozv11aibdv7fp6azu5ipkdit1hd4ttct5w2x0audo1mwfvn4qag6psd0mf82v0qocwpy8l7hjjwlw8tp4ywezz69s5wsmfpise402ecelp21a8qubttxdint658k41yelm4',
                parameterValue: '4dpra4f4mge12lwset8jbsrjt6vaaw0xs9jolnjtl4m4swqdveye63ezrbh0wyrbxzvuodbfxuktadbdszpl8l6ly0msz8dpsep7jdphkvoi3u6arbs8unxbfdw0rt9regde1x49q6w8qwplc4ujioj214funwfyhow0xh7ug3uklwh72ogjkph90thee59rjg0z404l6hbhdae0vriuuc3zgsjq14ud6fwg7og7arnpe0yrpdnhkzjy9faxs06m172mnam96me68aypt2nd7yy4vilykt3jgmdo3ml83t8b8tbiczn7b26ta7ast2e17lj8mf5elq8uk5otc11xosx9ukfxp3sz7pm0n3sk5dl1n5ytknrqe5mi422r1l10qeh78jjbuwsecsxzl8xfx6b29jswl84qfrasa8pauokpk8fa3tw53ttpc4olyycv5lkk4tlqgn3co4s0cz8psm2nszup31oput6x2xttfm9nbw47l46fci3hcstea3rdmkj374arpmfxwnbm6shtw0ce7ksercizmbh8mur61exlye5fbf8wqvcnhcfhgmh9o1707r7cz8dbl925gsmkrtvnwlwj7nip5d574kvidftw6qjbrt5sh2flhfr2rn49yhtpgbpjdrzxgchsc9v60muyl0wjvrwdp7s1raaznxd6gp426mz0awalonvkt5cz1nhnppvp93pdiaj673kslrirmeonzlx13srrd70bjx2e2dyk7hp45aiirpqfnxvx7yjziuak7i9uop1rbn6uhi2yje8cejp5bycntzzd4o89nyab9u6l85xxt4dqwejejdx06sddd10xyc4tjlwmn33ej1kr4thy2hsuebv7y37w9es4cblya59xhe2wa51ex4mmgdrh5sm3k00qeji3ynp7qcnw0w85od6ei42mimm1jfd2g3sgl8snvu5g5qb0cr21q4ae6y1z7n12nwv7edg5g3pizq5rkzanxsmzl62k13hc96nx65v3xiwbl93s',
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
                        value   : '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc'));
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
            .get('/bplus-it-sappi/module/5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc'));
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
                
                id: '6ec52a43-a67e-4227-b141-71d7505c638e',
                tenantId: '0bcbfb5b-b0f0-4705-b00b-e8e3e3d7de37',
                systemId: 'ac8a2f30-aa22-471d-986e-986472e628be',
                systemName: '0aom34q4k3h2zjwvteyc',
                channelId: '5181ef30-ecaf-48d2-bf05-af0b3f2434ff',
                channelParty: 'axi8ci95bpneyxadzhccqap6tieburizsbkbswteimp2dcjftihm6k17h7zmq3tn4bfo9r6ehlmx1b5cp6wsr3sfm8m0z8kvgrz9py16wqva6976h12f52g6aro0hzf49qdkok680np32zbaoznvop0ur3sduwui',
                channelComponent: '1nkb923ztj3owp3icgrxleh8q82i849jbjilnv7pngsiflx909zi8xibqq4wlaif5kd6mmoarxwr77l4kqeej8lls6ef04beyqglajmqamchjneyfn1zdvcs0x6n4wokf3lsq7100vmphvlbx7avzona5aqe6glp',
                channelName: 'a4xcc219xif1l22vfa95cokk0psysxk0zxwwygr8jdb7iazpz6ogzg7yqbdislh3wiavluy19sncbmj9gsidqjudgl6xaw8nxb49c5syw1k0vzeow2iu5ulgu7yzxvmmkfif61153ks1hacsk432ry22haqhs51l',
                flowParty: 'yzvfj70t08ydjvopcoplz9aef50cuahayfkbdh8tg8ows9qvb4423s00wkbsiqkcwpmf21dwkr4u7e82cfw8k9hxp9bqnrmixyuzsfrfa3ned9po60f6ro7l2v79d190relnlrnbam94jwtip6g5hfi6k1wk3bdi',
                flowComponent: 'w07v16pu8ge1h3wf11a8ichd5dtcu2ltfl5kguoqgaubobp9jjsil6jl7md266wgjq1xv06cy0k7s8n6wcpv06jh9lsvg2bnw11eyk3t6jz6jcit66fjkxplgl8ailawam99zbj4loxg3ic1w5gyocp6l2veoupd',
                flowInterfaceName: 'vibt5t15ktd7p55939q25m7d52ybtsisticivqxr7vpoadianxcsosel63hvspto2v38guudpdq7gp8z8euxk5d34pp6nn05rwlhcakszvt64qjtg2hqg8pju8ct0bbkfylwk39i91e3kqeotmqtbf9yl7e4aezo',
                flowInterfaceNamespace: 'gpw0rdqitpws77cwwaq0rvg3hh2nzswtz4xjvha8aazkt9ndds0nev9fauyiijpecuksbvjf458rx7ixuca74j8tb7ukqg1r8766t1ow2fglrtizelng76bdjc26k3h0fplohrnvj3ex27z9134191funyo3bsjh',
                parameterGroup: 'poapvocmznkpc0mtsjme8tvb4qj8m5ibm667z13dxjyfpqbpu8zpy3t83u2hbljwdmefs9irg8w7h0cbywhrrjkrrpu66c3a6st7lygydy35jhkei5wtadyt4maal4xgtsrwxagi0z9wtm7ws3luspmrsyswhh1d94aqpz7y5etebwwg7963uisph1oyh7mcwmec78xmguvxim7yh1m18jxotkbxj9stqqfo31czfvh4tfo7g8fgs9hgthjkkfj',
                name: 'jcs5hz4nicyrjalqqrenq6u7rx58082zo7dlbtv0hd7l17czdllx32bvyoladxnokqxd91bbteulrfy5munwmhwbp3omgj8yczt7e5s2hphc1pajv8p2tt3fepgd8w5x3lp4axmsrves4ixu3rem8mx89fcp6gljuky0gs9d3vvcwdgxykuu8uddpe9a8kfyiuww636nqakmu9a46w1mo74mkrmg3mf5xgejzhclmroyvf5ruisgqgm56ittkys2jr1f4cp5xik1lynkxm36mtisnrr5e2x937qys0zot01j981rnv9mll88mhpamqqi',
                parameterName: '3sjgkh2ls8eh116up7cr1et2mdmyjstg2af8wypo9jvt5imbkscppwwxfxj6mqpdys93wz3v81mewsr09wj1ig57p9zks8skl7dctg3jxur929ecznu463qclx65q6jeyyne3hkvlwfny9m1l2uolpi0p1z13f7rpys3y1xhru5vj0iy3q91kvl6jcq1ji2602uzzl5zpxztmcnf7x43s8qt80ymu3cl0aen5d5gok91uvpaale76uo49list5b76heqlzs8pe1co3bnag2hb4lc4zcqdwa67qmzwxhz8kak3qayu3q765cifoicroq0',
                parameterValue: '4yxk19q0ntfd6v8vfft31y5ap0wtpo87zw8o09af6rpa7mcjgsatnmxoipcsdys7jpzmnc340g9m81rwenvzflt6vmepic40qfwl3x193iwpsq8fn94lseaw5hxteqhaq0d70lhwqq23mmwfclpcyy6ooz5eficgj7qxp0ezyzyfn4zp9a15q8orfxwjy1qdjz511otgj2gohx5zcjm7dqkppccemnbpw2fxhwvrsrghnh3daythe6b7lhgh5ol9pgjbgev6bbw06934dahvghs7zu6llrr8v4mh7ebg6h9rwnjnyku4v9amq17cqe8zqx8n1zon30ave7jca3plo8drk1qy9nhl2fmt5j2fr3uiqt6kh3ph3nd1qaeytun5c6p3kf8zz74sy3jw326ve8q99kuk4wigzl0f4f08m7vtq2tyza5nkfsbxruejavheao02xxnsemo5tuw92fqf5dyphxir4ijadw8bi03aoblq0ghjd9ubos12428nwo9ywwaxnerlfi4n0t4ezo57s3r720p4el21ehccvbrg0t222icmksbwn7k076d2tsb6gpvtk4ivok3v7jvy377g2snd2hz6kqxwwr7adudfpsd398i8keotfnpbr2zedke05xjlkwu0xmn9l89fysfe5ausmblw0xdgna76ef97k9ilfewsnh58x0lu4pbom81ntxb49r7usltaz123basmiesh2qw0muv3cmt02s7e0c0gslfrz2btcg67ceesc3viz0ixf9rmwiz0tm25485ubnjbc36othp8yotsxc78k6oi0yiaxiobwetby45wz6eiezcs3heuqog5i0930xc4i1ixntbsxpt9tekro28rmpzog37o4t4ap99x9zzflq8oclocd9o6yy4nfwh7lalwjmf32s2eisphhifb2lp9tktnv7hel109uxirxm9jukg6axq44fl0iynbfy0hojxwja7n02ju3ukpjmeyucpnduk8qrgbair8f2bruxg486m',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                systemName: 'pp0zojl1yeh3l9myuvrk',
                channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                channelParty: 'nevcpdlopt3ezxvsmqfb787jqfmgop4d84xvbbqzyblrvabe19qygmohud57ep61it61zw9mo1yc7oms5whe1xc8uvcjy7w12g2st0etr7c0k9rst4udo0ki62txhgfm49nluhrgb8b4qe8qkxjfngwc3c222cr6',
                channelComponent: 'n4uemgvxtx5cbjs8fqiwr08hwb574hlov3m8xhfkx1uloqdm6lqd96feh9dftgb3ch487s777x5vlts0n3e2pklwbosv83ynx6yieer24au3hqo1m7e8hx6frktye7ytla3lf4hynusy33jtf6mfznu06vhc31xb',
                channelName: 't2s1o1xlcrqp7hq25sccxdr85rqxvc20mohm4k7dyfvhstgkxd8aa4nw0r85rbtagwjpah0ynxxgjfvt2605hb4mnqxdknf4hop33w10ej438s8w532otmkgrv6qbh4k5o7w7ar8395lmtmgzyqxmwpixjykxy54',
                flowParty: 'cyka74ir2rm8qhl8b752aqi94bva1ihknhn5nlxlwu4mgh4qjfau82nrlbl4otwu5lcs4ez8el2e4a5tteewqygnt9o7e29kw9wuw0tkf4cqajaxc4uo6edm2xq4mmy3o0edgh81holffbmhoay5osh27dxetyk1',
                flowComponent: 'jtv7ajvhvvznbr42kcx9ubbfpvflh7rcplrsn54j40xqqg96y5v1y53rnuo8ra01mslpr33mhyqagq1ye7ibk5bdaf2ltrwdusiqzihlqpbiyy8vi6hys5lp165ffhibe6vr11lriyq4boyw27hlkwcka5fn95j6',
                flowInterfaceName: 'geu34z5xzvmgpch7i3ccpwvl4ql2g0o6b777v93tgq0n8vept4si4k9rtdibahrjhejze7u3334860vdyai1eahz5raukc7xs3gbxfv5dmk88tunc5eyb1spxqa299n2pzemf816ar5e9s34qjsjtn30m9099q3x',
                flowInterfaceNamespace: 'fyuktfrjuyv8e9dm8fw51jt1lvhitqtu41agw7wk73gkr493c5f28mfgmsbzgt74yns3hke1sc9l2n2zktw003gvp1c1ixyt2t73labrmrnm6l93xr31o65ogtl27vtvqa8d9wagy8u2f7gmtu0bt7btxafebwkt',
                parameterGroup: 'hvsvfap4k0p7yv9tequkht4xydd9657iu30obaas5tj0l1sym9u15245iw9s9u07jq18xslz97fdc4zkgeeadyjzuhacohca3wk8r80hu3t5x5tlaruddwac2icdzk569ue3kul51qb2doqrkn2bn1tpq70e22fbt0r50un5vz6uodrtyuwj3vkbff80kjlndu5zakb70zmkx2t8l8eifchxpmp6mvg6c616kpsyx3xjynvqscqdadmj2zt80xl',
                name: 'cgc4ns1vzbisqucqjxnuu6rnx1llet71d7chu2buq3rnkfl0gt84cz48ee4yxvpytt0kzzptt0qij0wbh0imlfq04jk48pb1mq184begnqtoxd67divqce6245lz35c4e3wnto1nrkbof6nyagh5q1bac3c3upkn7x9f99l1rm59ox5xqqka51cqlws6m4zlo1x7bmv75x90y4hf73y3vy73inrvvr01vrllb1aboxi7q97qiplbf1mjxcjw6qsyw9cawwfvlz9pzie3k9v52t7ci7ruc292m9hif0w51swuronekkhms9tss4p0dn16',
                parameterName: 'uj9xmcea1tsoe5pb2flzvo0c4j4tjpbl6swnsbetmn73urm2dxp1nfvad3oq9fonh1xtoq1lf8wx8eb518sw18fdqifar589a2b3fhatq907f195vvi82k2uex4ozhyerxof62chx2itam6e74hg0wlw81fx9jx54e1qrrpohkt5zrp6fe3aggmjojd37i1k5dcvxlapebke810i7upfwonc91ykn1rbcfqg6fynsmmo72s28n5dg8cxt2pfcq1bsx27nhqzcjico4v2x0mwcgr6o0ynt1ocf771c7o3qt0w96fz2gq425dyx1ohipeu',
                parameterValue: 'tx4bref85tcj7yjxns9ikssvqdcos9inx2t3vitwypmnxqopnxl560i1ydchowcyqkdoj7rkcuibu6mssii8sk5ue7tr2g96zb47gseypyt50zto6590vt07c4t2rix88un3s7sq737pis5ce8mx37zhnfv25p1dt75amoxa1y9e08juspenf894twh0bkdxrhonvhejxxwad04bzuxlq31k4tyb60f367kc8rxjb245joe2or40al6vh5m0kvbkf5x94hctd9rb4td283nrc21pd629lxjp26goaii26gv4csn90t39xxibmrkitjw0h2133u6w4ehgrl6qimxp0qy2fnb5j1xxf4yrvb77w2zbdf400l38buqzhxq2au4cxe5se3th25azqaxtap1r0lz97osy3q7vtcig8uvzhv9eu5mfp0hoqsylcrj14jpn7ayuhreg63e9wu8957mcei088xtjvmhe2ok4bq6s46veij3910xrlepmlxz0ojnleslpf3flh186gmrg4sbnufy2pinwdg58t0v2o4e8jrshiwakplkvesyuexzqr08ll5se501afq10q8l5a9d5egr546o4yd5vo15aclh3otir0t7pvchd6trtw2ez9b1jhg052r1e9iurbtn4hpp82tg7wk5rw0n67ta92oddihhoign1i5hri6r0i39ok56ngrykvmkfs4g166jlza1cicaqef2pxr7e6hc4dgbwoiepnhhslgyl2n6ktn0qgst4i4wh5luu48z755lxntdeg9q1syi5pl728tihgenr31ub69ohf9avya34zi53wh6xi2zkrp7fnckph7oj1mlgbevy0dd37tpf5y0bc7ydgnwm5da690llbivyfhr1kxhy134wwftkt38vqxqoo8bgg9mr0j6b60l2coihoe1w5vpz1i4zv87ycq6326p9qeik0sdotp48kvk98s0v6z10ndy8iep04hum8xh43q4vgbyyxsedtfi8uhgdjhoehtxf',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc'));
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
            .delete('/bplus-it-sappi/module/5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc')
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
                        id: '4985e4d5-8f13-4a6d-9b85-0670076951f0',
                        tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                        systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                        systemName: '44a0ym11iynpl0p3z05k',
                        channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                        channelParty: 'jcy5k9dssozd6502d0e5m6tj6ln3yd6jz9gok4g44wv9n9ye6s1sg2itckjd9cwilne1slbjnql8w47ql0sugj2dhx59rtj762z4r7t47hoi65rd2z7cwu5vcnhri53u78kwefjnski0vye3euqutoux4xuvqzj2',
                        channelComponent: 'ynul7we1q4x1dfxt8ye7fqpzx6eranporp4yntth4cojeleg0cheg4h1xor0bqi27sw9pmg9qdzr18i37nlnswbvbofsoruzubbpug17cz6qjljuh3vxw2q969poj1tfq9gu8a24n5lvahncxxaqf44100xypq3u',
                        channelName: 'wrainmevf58zcwnt0oooyqyjxv4tck4zi2t2bptoxjhwqrlfw5r9i0zcy85y18x2bnsjcnf6xchob4dv2pxcjg8d5x7aucbltk60uu9e5dn6fmcjet6crnrd21yi5nm8g52fqd69mrisfupkzezkz8alu91lhn8m',
                        flowParty: 'p1kj3rvvamo0clqy2pd4fcudvwuvpjp2iwem8p6xyra4h0si1fvoistghcv7ml89laty05zg12tzj1ers9nxhf756ibwfp1ruxofu7i2xd3fk53qz7osa390v1r0xfegui26bz2lmndofleueycvl4yt8gtqj8t4',
                        flowComponent: 'qbmqjaw1fqz3bhjt14dqkg22wbof2yxivmopgz7q84pi4484kbqlkga3gyl6j888obbmugk566u6ut7300pd6xjepptdgeairni24osjf10n2fm01t6hlezi9yxnvqetndwiu3svegghls9402yi76tsivznxz1k',
                        flowInterfaceName: 'ebh74yxavruvri1304hnxur0f2tztv6bz239yccezcghghk0cbyb46pdow997nzehii53ki0rivzis62bf4b6etf5mj2br16hguy18nvslgqmzp75i0p4urtuu54ndxuqbhrljhy753uvo0d5sf6syktd4f5s3k3',
                        flowInterfaceNamespace: 'jj41jq531h6rk9d4418tpawzjv0qjxclqpnfhu4dxfvbqw9oy3xt8jqw172lz958q1h0l5pn2yspuhlyafbo3gzsel15z7ae0uw2xhn2ym68ir3f4ftjabe2fnapfoe002z09xbfqkgc7bk2rfc8tqsm9gc2x048',
                        parameterGroup: 'crt056rn2axphyy5492mzzeo2zbj5rtp42yinj61s2t1ghmbygjp65ddv7frfyyz9xl4fm8l6pjg0sn3al5pg7d0hxttbfe9sckyhaqfiny60zgcw5tzhofgz7t6xseutuy0loqphugg68u0evzjbbs0jexgjcofzhuas827f5iaj5pi4i4gpo4wbkam229y5lpzdooki9x5wx7bov7ebwpt347z9z7osa9kv7r8461e9kzhw8hld7bdm4wvua9',
                        name: 'ctdgl6vhp2d87i51cqxla2qogx1mkn4scuhgyj5ny8mch9n77kgwj3sirguldbsaqjpfqn27sgsb4a59w67berar9aeai9svj10akaodnr0rrcxwln1ejrlqt3b3rizh4jop7iwbi3y17ltcmzzelrdgnl1ji5v4pkdjbnjg7czxr5osmtzfvsggc3a762r4h58jlm1sb8rzxrscha6vlojf87z5gdx56rfl1myrfge2va4nhyc37h7w8joguq1o46zgiyvl7hm3vicfl9sxdzqz2wf1k2bn0i1fb1idarwjo62hpe5famspdfwwda7m',
                        parameterName: 'ujrtd4bk39gm8dnoql09cu0gc95yvmcghwmlqvx30fwbfj4uekdt7bc4q8o0pyedsj3pe7z3evx4rnri2m7ctnal48hou19tjwdy6i4i3m2x8x8s8oxoiyh5qlq4mpfbjjwilthvbjacj7i8bdu19aybghge2y3wssr792hge8cj7focioijxld31bxof5jdp3ilcphk856b5jw1eq8023v6m3s8y36z11q4b9xehdvk0t8x7bls5riu9x6j97t1hejy8qh3s0txici8qoyiino5go85riaq81087bfo4zmwfgsrb4tqcs6rogwquq0g',
                        parameterValue: 'th2jr6x0six8rlg9iuksceff5h7rdcqtrqk3hf6r9j3n2qopk43mtn3bpzf37otwe3djq1dad8jf6j296dlc1tbhwbzhlr1k5c5120n0w7n8ojrvw5mzp7ovu5q23bfkhvv4bxr2x7v43dnj6t9l5r0cxvcp5kbk5pv08kv8mas29onqdeqkdj9lxdrlnn0qwtowb49qx93stmp7qah8nzpfd6xs3a882rayngwlizwiyw2nxcuirtkepwv8zr8adpgbews6vu78zhuambeuva16mnhf2y6r1i8j9738jss8ejkevk10cpk70a4o8ni076ghc4maq3n8iwhklkgcdk2t114guf2gmzmvd1aft5m7unmqfu98o2ysh9r4cfy8f4ezlist8jeije9bpg916arlsy6bggaxnuqxo3cuegzfdk5wjrlaw26zv3t67l94pd1jb56e8quupj0fxcttvvnz7bltigcys5di44986k97s4ucmwb3tp3gk5gv1qatw2y7vr360dow7dglmkt1prayp5ct91bdmez9k2cwgqlf9ua6u8gm6m9tagqd975efugi6o7j82p5pz3wsq0hqfqygp6b3ncd1c3h4yyvujkqk74we9iqb0vjffnhqdm2hm6a0hcxy7igqnz9ewf9opvour02a4b516nrg39pmgka6ziw0tkq3gtjwo2i9u0n654suty15hx5u8p058tf0whydjdmvvbnqi5hfb9fmodbkoxdfsb3drh5soio9y347q3fjdulkbkeh0gj22f9ysbgy5fi9ut7gifrttevd407n5urqvwwwcu7nmqxyaydd6s2tv5xbr5r9q33tb4ahjf3ffpoyx6hwsfn176y57rk0jm5b162ip1j7wa20gb6dtbqyffrbrwzhubvqju7k80x88r0uu2v69leev73had67xo0ubath2j2bg5k2yepghutk4806hvpbj6q98782cchnq5xm16bpf1szu4e630eo89lku66rbxv2b6dsr3w',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '4985e4d5-8f13-4a6d-9b85-0670076951f0');
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
                            value   : '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc');
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
                    id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc');
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
                        
                        id: '258f7e0a-acae-4a1f-bdd6-d807f39e56c8',
                        tenantId: 'a077255d-14b1-46a6-9b57-5c87cf772b05',
                        systemId: 'c9d0928f-fea2-4d59-bb5f-33ec3d5aea08',
                        systemName: 'k39py054gmqsdwkdj0gq',
                        channelId: '8356c584-8c66-4818-b3ce-ac6697af2483',
                        channelParty: 'ly26zey204wmanhlg2ss8mkavjwc0iu2guaipusezr8g4ku7xss99wl6o78er3h3tvh66q0xbop4atuo9pmwu00pmvqtqr8et0y7wqnitau6pu3qag96isdn5i9yjt3rfmm96z0djbshxm8gx8wxt919e035bsut',
                        channelComponent: 'p3huro5wgpwolsxuv0prxzoh4n25ry7p6gqn34obmoih5opahf6s8yvm7l4g96fw16llb1j5efluwoniqvg8a8ofbokxymktkup34szae6io6teog97bmthtaxgu7ztacxmaumwy1bjfdsdis31cf91yv55sm7hr',
                        channelName: 'tb4g8lt9sjl7d5efja6ydqqnzhec6err2cmp7ieq44thqs847hw4e1i0ao7tvpf9cq4edatibllkheaxqsqq0vxkd1tpw26d91mf6nibbv97am24rexa1bh6vsnvfc68q5qetppcsf6h9szvlukgeqc3fben25jo',
                        flowParty: 'nzjmjp49dlco0ubbc4sdcsom105sp9d4blwxtqaub2rfxgqauwi8qi0lpqv1qginbsubbpfqn0tw6npxlup0hr4ywfc4uxf7gw4cb919qr94cm4p2mqsumci32tt2c9yu8ne26wwz6ltb5fa83zpgo18senkfyki',
                        flowComponent: 't3dy2jf70rkdvxzriyqkkq8ypf6dhqw6t5ixl0rud5bi8cwixpgtlbt4ur0wy8tv4qbbrrpmoh85ix09y98p1gshi1e47vg8ndoy0on4zx6k8iqjl385vh0pwnjsq8mi9upp0oyuzt9dc8687m3j7jxsffr0z9u3',
                        flowInterfaceName: 'jyosnllukw2i0lvo4pqns7ml7y9wy1p82quuujdqye2jx48rzjgg6z8w6os4ffrc3m6cdi0bgg99o133qomghg67no9teqm3zd68a169ajo5krf3xvwmrs3zmf4qbsoxji3sgtprnt2ndv4jdkd7c9181bxnz23r',
                        flowInterfaceNamespace: 'jlw9s8rr18rxrcixnv5fy3ulbo7d985s7e4alkgukm5eop4xc6xjzsvvqjk25ti4j8k89t2dtskbe79kapdm3c9g08j6y1xdbchqqjh5s9vh84hhk829g2l4u94ockrit4jdzabnw62q5s142wxr77z5nykfm0qb',
                        parameterGroup: '9u02dhn0ygwzwe7g66u7n4dwyzzxok3cfg4z0z83bqs9tcjksib7n6sa8lqh5cdok5xyqpglzg32rcxgb9ktjmq3v4h7g1cw2tq7sgmw4egnkd6itxhtket47yjoohwuwt6l05gc9atil8q0h53en06w0rks6aauwm9wjtoeb7ry4u2d9p9vgy8huxb0ierwozccesdlaa4cadu4gzi4hxv2377z71z1m3k4dunn47tjj97s89n8ob16z4o4olo',
                        name: 'hwj7dz18m8p1pvf6e0cstjtnmb2nn458iuphuw0a9d4o0x95lkmkjmchao95r3g0jzxfeke4zlaf6vrc7xif0p0jjbo3d3qaz9ktl5f4l7iuzpovvw9qpz0p5pw73dvbgccieyhslp514cztbee1fjdzbnb5uqchv62m0qfp0ua0elpfw3ezi2hh1orufmlffo5ch1blwb1x1vorwrod5pfuyqt6s7p6fj0ei2stxtxsxebff9l69yf745wbd56ic6lzr7sbeootuf5fbm9o4vd547hfj0fik1fpoega169h4evblh5tmelk0ies7o4g',
                        parameterName: 'ny6p6unexefc4y9fw11qswhwkntik3jwl7imhjwgjfdfvii1btn10adt2m6flpjt8ldbkehrp05pmbllxiooq0lb6vf9no4vrsiv15i9cncw45pkgqrdc5ckqky5lc1b1h64sf0tohw5n7fbotr5zcthoog2bi7m2n2u66xa077k2x456xsryoi88js3lsvtcpgm4dn4li05r9pirihj8yklsvzwh5katje8i8hzfrhdlh38096s27goepshgih2tu7sp559fa0qtznmx0keipky6e326xd88nwq0q1c8ly3ih6vei04glxsnps0pvcs',
                        parameterValue: 'jn196vjy8adlafw0yfli23ddo7d0zeh1owfq2u4nfapu7rmvwcefkghhdfyhiohjhieiywhv4u2rf9yieouy4eers0bu9oh4q9ezi12csndu7mg50flo7cgurzngj1bwf6u77fu58o36ri8m64mmbtd5rpfhijqxl2av7wv4q1zby3gibqmzuv4tv1c29j866s49zkslq3fbf1gqnni9xwauj1illfj86p91xjx7fqshaba8nhokfgl4pmtwzmecgwxvano833vjo2z0ef9vmbrqajdg3bfa86n3rw817lrij4bdcn85e4d55gp5udxsqt5q64b0ypp8wz49wo1ate38ljax6qbxlnx5iitxma7jp4yxgyw3z6990ybarujex7ox7ak8tjwlt4zq0bmas9c0d5wcso6jhcokgyz4xna7tj2wum55bpf4cc95t0jvw0gg4ispdh0orfsrc8cof9s7wdiopkj5bnmknqp9s3qg0w4e5lmmtiyegs7mm4g46dqi0fck6kw146b14exzh7nqy8mt6omyp7k7vpbt1lz9y4czcrhedsg4fl7lyxo9yyd30ydfvflz82kswk491yk42m68dtr6lqdo5xbip5ajc82o4q4ox4zd3j7cglpaw9059loj9krh6hwf3h4b87d5v4fxa6sgf9lr1u9dvom1krtxtcqe45phy7u09wyhk6c6pjhlmugboc2qu41ss28lfbhhmtplassi9opnxcvxasj40ut9yxf6a0rvv4hz0xd8igiuo0hpnezqnto7yon7f0rgr3v2mlchbk9kub6zcoswwvq6pwmmahly4kh1yq6jxklisjwg23drar0wywjlxnbfi80qmii86ltefl0rtne0mp53atj90so6gyl7bfrlitm8351iije1x6rybh7pu55kuz2n4nk2om2jwsmjqtrnj4i3dm2twck9f3gtrrptb02jqiqnxg8w5mpbqvevwdghefmwoj01nstnq161czqe93j9cyjzuph3ybhx',
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
                        
                        id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
                        tenantId: '78cd6508-25a8-4a36-98ef-6fb6429f61df',
                        systemId: 'a772b249-2ff4-4223-b032-06f3fadff071',
                        systemName: '368ju8ywmpt9gxskk65i',
                        channelId: '403e3583-6131-44f3-b629-f66eef36176b',
                        channelParty: 'ggp5nnjpcgo625wtu1rwfv9bt2omwekpgtnwwdbawzilje8jud9l8ncldrkmykmhh7o3wcq3ogjv9argyxpijma1ofwt41jt5d3ftmjkw5hznyylsa5ti4foku6dic2xf01cmbhid1pkkfwn8bmvzlugd4jh4ltp',
                        channelComponent: 'vep35xqu2harns302jaf6cglh0cxyen42f3zu75vrzdlauzldfrsr1poxkp2gkgucf20ldd1wjpshwj7ld3knormfeo5vlqzssugk4qd22rkf1gxp908wrvmdbhgkrwlobr1no60m38bdz1hw55riuwwbp4djv9q',
                        channelName: 'u5w1kpmb2ppx98f0nq0cvync420dbnfgydql79d5xz8cj5xybqy1d5p87ck61ickeor32tdkp84z33o1e3bzpg52g7obr3uay4xrs3birzffd4w3tr04xw5s2d4vprtfcy6tn9yqlp2bsr8d1oi8wjeb0nu8kjpz',
                        flowParty: 'eo2mox46y11av84vg7l39pr3egw466upxlr7ntl9onnnjbgznz7wjpw3528xq5zbce8a0jkvwpb9eagj9tcteg0np12ujy4fnokvenry51bfqzwfx8panwmya7ccx9skygofhsti2u2zbqnzs29i5uaw8nh05vr9',
                        flowComponent: 'nxpy6f0ivybns7tjm947vvqxj4td8b4btgcsn439yxe4bn22ize8qzti27xexd4wat4xm8d7bu85lvgddzbqzsmrrbqoiag0p8osxeu7oejfpjqto91wauir644b7l9o4ywo572agij3u7r69n6ufw33dbus88rl',
                        flowInterfaceName: 'an19qh714h3udr5k4kcnp5zri36sbabqu85exqwudadd865b0qi7df9d52kjv52mg9xl3xs7ytk50gmpwfl6xowd4v13137wwbvhs5fdsjb8j9abhi3tjqk1egbf69vbp07tibno0hkequ3w7l15e8h3phasm2wn',
                        flowInterfaceNamespace: 'rs6wez6e6cxrn7e023o81bjfq82lagsad51lcwu0ezwynoc299jd03slth8xiw5c5zncs83so6tv0twiozx4d2a245cmfklcbkukl4rdxdz9pb50fu7c9zokv4mecz8qf5bgmyjos7dvozx14ypdalnlktv7kp78',
                        parameterGroup: 'zmvifqodhqpdw074jvg8d2ri02oy6uelkyu6e6nboyz1358anuonh22eegz1a865ey7a0eztpkk6bvdm5c1m41ww4vbxa0irmdqycna0oh82673mufzxano9r1bmpvi94i82rmp8308yjfsll5yvor1g69vvrpotu9f8zolcui6vhl83sb68mdol7vnl1p7vo1l1spkj0w0c3pzum4lxqd98f29u7szbxc97qhcqugm2kxdhjnxejegf9lgssmq',
                        name: 'beard5ej69s0lp7wczo2ztu9nleslkln5wrdnqq5axybxqquek25tmsf0dubjc1fp786hg6hfyg5gl9auohmbd5stb7cp7p5iv27sn1m2shy40pg819kzswxzc6bfi8g14avdktyfg1gthe88w4qiuefo46w1b1p7q0uyvnohsfzjk8a5va4yoc2obqxx7fwmv7mdgjztc58ujebstchb3e01f5qpwq3yp1233yymtbigja9yue925yx4uu5fh2bhnrirjpi4amgobl9jrrdex8dhemcig5lh4q9f54zx1zayulj4zrg9z2z9pck3fk0',
                        parameterName: 'wb3uuf3egbyxp9bx5zsorauyqg5pf2nvwgenlw4pzh2p3ck0gsb3kv8mhs8ua6pp20c1a65s2citfr10xp0e5dqpp8ii2a1gauosykmibywywzocjxujz04p5q8969e3gvgykk9upbct70ys5duwhvb1rgdf94vhbgdxochjy71ox77zwdm6d5un2ko1krfsw8395h58n8o0qmo2lo65mjm7sffb27tbojt8ouhobdsnvp005fvcez1lsw8h3ltcgazv695n8uiis5fqjtly1bkd7tfq756a273lyzit2jokyiq2sauno48etas9l0q0',
                        parameterValue: 'm407varb7qf0xsbegb8qrhwlhdez1jz9x4yxhuggbfmlz162onot9pani16eaybvdoq54j93kr147fuqmie2qrdvpx16k3oo0hdb8foo9s6cxvz1nntx9n5q9rrlkipwmn161wdokuvx99ip0wjvt12gz9uqryxvftie4yu3trpagwba8htlc87vn2nmzquty8c9za8tbcp13vk5668zu1tkzh4tl79tac4213raz5pf832g1608fvcs4pqz8bqrhmylslsbel9k9o57buoowicr1ufejhf6vp72pwxwa5kr5z7xay4jaju40hqc9ztoahrxsaxa91da203ltgv6q5o1yq48gkohzpzix73xevwnvomspkz4obgeo5sr49vuv01wvx8zmclg2u8bapsrz16q1yqufkxp9asgcmar1kzfyccczs627c32ovn55jhwjnul5si1u4cycs68a4klf9ih5wuy6lpelzh6a5n0987v9nxkpr3x9c1zcdbkjcm6iazuuyned9jmd127gmkxsv7c0o2i3hl12ketwfzs1j41370oilsz2ypscv5wm2b7tclo5jkwkrbq8qpzkeecpr4s59ww281e8rfuluhaor6i2xrzvuxr7l0qg0v4d60yfyugalma9l8zczux28az816pefpd03h6ewioqr5omac7tce56auods6ulzlwhqjz0pzf822hd1irtbeya3dpn7bhk7hi5j2kb2abqllutmrxuz3pl1odmhqymhr7riug56xrysev9gsvs8cltdi9xg2qqr8fgo65zxit01trbq5or5gnecpz13gammvq4sx49k0aebdgumyjlrk316btp9fagaddje9ep904sdrfurb0hlv64wyvkjhpfpn123lhv1b5zvirxpje8eda3bwvavhv26xkjfohnsm0l1sz2s4dl811v3msxfaxtpq3u3oi13fiyf4jaakznzzr51fk0tgtqoyhk70v7ujdix5r85r0wqukgi9pgcjzvufcb2it',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc');
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
                    id: '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});