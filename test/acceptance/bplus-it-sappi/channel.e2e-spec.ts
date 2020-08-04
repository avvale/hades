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
                hash: 'cgs6jmqvhvw3kszlf9aiqfdjkc20syvhgv02zlmg',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'xhxbfs4psytuh05ul3zylq4p3u8dbeuibgv5a5b0dz828bav9q',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '2kj1tl5q6gd5sv2dt752',
                party: 'uf9xqtj0rbaojob3y2stjgzms0bu2nbqgai98mgbzp36utk7mkw8mt206i1mvafjv2wbc4yw1b8kn07vqkgdjwq1x1yarghraqs0p10nxm89c238mcqdxaqq8ymb1ynoji5mh6r8iwl8otuaz59qiz9o93gv6pht',
                component: 'kirpnptspehtsh49nspzfvoqoeci64wbnr0oilydgoi3zvljbwswkglbw6pyeqouib0zorpa9h9q4zy07s12hj8p2ag1p2uwfqrdk57gbqqynlotl44pku5m9ugjgc41f4z31a060gbb5ct1xzq65zs7gkfeem6n',
                name: '6gu97ijo65jd66qiqp3ea44oxy1mwpmbf2s4zrx28n5046e0e95k5wy108hjioj05mncb4cv0167hzrxlocuair4ta6ef54j6q22vdc0j9copuvakz2usr6k02n2egyfq4zo40z5bizvrrw6wylgmbu2dupm81fl',
                flowHash: 'fm3ecvniyd6iirbhxo4c9km6n2j6gedu6akt81y7',
                flowParty: 'xfq77902trn8r24lshwhvrat8hqsdop4kx56xo59qu4lauaclentklugak7gwl7ttyvkv4zhsec6b3ftzvts1sqx1c38trliydrgj2hu7227dwb0dh3ti97omt1anh6ef5d99d5czveohivjj6v3tevg64e7t7kn',
                flowComponent: '6lcal7un1qakiltrtbk1is7i2nqiq9nldn8pai778hw4yez7c69scn1ynakhgqrt9zx06hcit7c45eg6v03hkouyu6brzcr7db2ocxct14zsnmlvc7ry228rp0oo1c05abyma5c67i5wren9y2t5dim1pm9khutu',
                flowInterfaceName: 'c46v9w38qmt7dre4np5l4afzhqv8i4voia63yzmc1s0xfrgurert29o6oghk1ybc7m84sqfc3fwh636ijc2ed1my8pdkeros3h89igh6f2em8dpwounvu6onrgy97uh5clx2zeedrughuwqwv2yggv41mp82jbxm',
                flowInterfaceNamespace: '16zdf15i2dvej0sw3m9j46qn8regzz6yjol66816dfb390q00k0a5doavubvm11215l004zysbnasufx6wc31ygirg22uaiuls4k0sesg2kt04d9dvqujkgns1q7513s2t7y607cavt86jqrcf26pqnbrurx59ly',
                version: 'cn81jaoqtpb4ncnfwul1',
                adapterType: 'bbbagjhb0t18u8vo5xb042rhc6746oz7fwyp8eqsmslo79g7b09pyvktus0y',
                direction: 'RECEIVER',
                transportProtocol: 'uqi700e90qpaw0o3kmoa3fkawknzjpj4u66vs1gh5fz0t4rwskxobfp7j7ke',
                messageProtocol: 'wt6xfypqy4538rmmfaiym81813dt2orb6zvkwna72rozoqc6fvrcvqfi9mgf',
                adapterEngineName: '7qjkxpk4hhruq972ky7mvb6ssdwj52yj89c0l4bkla0xjcvrekc3zfkkab36298qxfh1p5wi9l051u4owuihzvnwjnza7u15mag7zmbhkxeyxajkoabq08ug0bkgu55b2t1ar88as1i89r1fb3y78urmxhx95nxf',
                url: 'q79sp4xuep807qzj4nppu0n9rmraplba3v9unez6n70g4f6pvfurqbrjyvadjr3h5yflbs684sskp74lxdj0tvx9i41ed0s29ps4gmsbc0wbes7msnqptxih7yx4nadskcirx98u7n3d8yneqx9k0p89az886sqrg26uuju6bkn8e6t2fez4u55sbkjoe4kgxop80vir0i811mlllw9kvf2e0nd1tf9bj40wlwhfyvruq9z8j4zj2g1wjwcmajjuu3hq8o5na4uulb30tcjemjbueb8frhwod208dshqjc10pbgy7niowiuyrp3n8czf',
                username: 'd8vrv3mexw2kqt372usw1wkwmzpx8fdxf1f7xtvu253al4dp37gtynsep6uj',
                remoteHost: 'z7oewuufogae29478mu1y43cavqgmgnhxrzjt1ri0xsil8fdyxybu7w4z0y4cpqx2vsrojt06yj9muqzct7qjav9b23sn528c70yfr8wh5f8q1aa0o99o9sg7rk47pjiv2g5yz01knry04bdgc8l5kml0txqjh4x',
                remotePort: 4532315666,
                directory: '547yy57ddm3viho163dby0k75ysbblt1rekkoy4whrvmjg5jqfyheuh3evhr871xxuriveryos2f98cshm56w0jnrul5uun9fvwx9b5go9xk14p753jo6dat09psja0nafpa8mmkp9eyb7adda679hk8xcwgro460wlxx9khkcudb7wqirdq1in7zvovnr7gemsuxm36hd59r6b6s9d7olvb2oa0ifatvckfpk8x2se82wfhengz7m75e3ky7qnyzya3jaex97kjc4qyoxp7h5ser9qvoblw8yojp6dnhbbcls8cwsoye642ylvkjmsj5m2fof9ioidpej95icjrr1zuch4z7gn12gb1k48u8umui5ek40p7bwvw9ywkr6vrb18jqsekij0h12w9t1vpd750c09twtyc8fr645sru6i604gr16g0mbakw196wgc0rn0w6d6ft55n7fsn45mk2r2pu50thm5kzenpc61jwwhz7jzugxh1g336i8imrqbqmue50ae5l3c8vs7lcsfc2vc1bneu4f7o2g48odyxrin3qiozdicgs1zq0giynzgf9nh7v1czaupewo2adglp3bmp6urmw27xugdgyaqlhc6yagl6sriofl2bq8eryqb7ojwgw12tnb7wivw3ji1q7fx6yj0hy58jo6xp2w235fevwkg6i1rniflg7w8e1tho2a6bcl7yr7dz35q9sat42ol5npmwsr500922w773qst11q48l04279gpvcaoej6jhy8ymq6rhubfn2hi6ybqyzl4sbz8irnr0wpzx5urw83zk8hq61ta0xot1xhhjaoe2i0plq8npixo52qzaore6umy1dnvtatoys8xb406yrbbtbos6zymb6auicv9glp19woxjrxatlczhabjo0mz0xrs1jrlnkbawjzqeidmnexc3r7h3lmw9b2qetvs0hsy8iro0posn3ypawdt92kvlpoqnnoefudguyxkedw57prrdym7eksg4q93knu3yhg4',
                fileSchema: 'n86344l9ca06s0dt3ymeb73e3p5ox4dtahj60kjv9rnjmfdlp3e1h6akkerxp3oiqevzz3xfa76vthppvmzpemevpc21xfp6jw6oykp0kcr65hgc23hbn53sg4k4zf3pdeafgdb6ezx5obcev7hg7yz37js6pogs7l7ej0zrrgcqmqnn3w797at84tuutx4azreii4al5m199zcozr2dbqhib3pkowmchqkuapo5vi2sx86lchugsbfymm54r1ptar8un22uk0mz0tmhtxktdp4s7chgwyjl0d0pekug7270ds8221r47hm0f9shzvum7866aixajl25mqyrltf4rwow7c9tvq6x28isjkb4e6z9ikjfs5b8fi58j63f2gnp3uguliry77dr6ecb4opl0m1u1q5eijdq7dbkdgiohey19akhyew7ycuw55c9b6e021a8zdt7ml6cbhzgo0s0b2wksgy2bgmyizbv2xt8nbgz4jrhpmqgd26q8txpg9uu5zre0eln95zzm7o4b1bzmjqcouddpnpjrgt6b8vmlx6rbloquhstvr7wjzimdd9s7pfzi5s0rdxtlhwu3niv7g28ownwtg8047f4nc45b2z5cbnyo8v5qutyg5ez8m15hipazb03dfq3t513iy740q7zo2ee2u9ufn3ig20unue7w03n4s3ccrl1wnena9j7pxgoq9h59jx449pitf4vb60ydmutq2suaeqp3v655yedw2n4j88yh7i2hrd2iw7mefpb0fk6jt7xc8edz0uq7nvnyf9rae2w6ogkgoayax2pjxl2sfqxd3lvern6zx7h7gs1inb4oy4tgnpk5is2lptdgeocloia7csdfi8biba9zhiex5k43rhp98q4b87jgsi1h7b90z6jgwvrly0bmopxsb64w023h8p5khdzfoo5hw97g7ibjq9pc555k8vl91n6bzhy1v4k5724fr384x05e90m5w8mahdc10cfbhhuv7l8eqab5rjneg3hwfz4',
                proxyHost: 'omh1t532klymoceynu9cz3t0ayx4fow3iz9xtm53chvbtp5op7sj03lb1fof',
                proxyPort: 9936485894,
                destination: 'co85siu1bzycba80fxw6qmmme5bs20tcrp8gu5i8673zhayybw45jgiua876hir3g97pzlitwhcl22bcn4x6ioib8xar0ke68n0928wtdqbyvn9kjtaph7mrw4voefdi9ky3p73y9vkxbhu25f9l6gzia1h4d044',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4d0ylo10ydrk65ao16146i2x3sciror5ygnzfxao9l7j4qj528g7zmz6jlaa5l3necncuarvvlndtqjc915xc0txh5wvonssbo8g1q26x1yl5abjblqxszi2g9dnkxe13bh8ibsrbwu1ia2u98ie8orrra5epznc',
                responsibleUserAccountName: '68ell67cdvvxarfsz0a0',
                lastChangeUserAccount: 'mkvv6ic57464igzurxit',
                lastChangedAt: '2020-08-04 09:38:14',
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
                
                hash: 'g50v3iudbcy4rmbpggv4h3lr6tby2n1kcjohoxeq',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'qrkzdfuvp530b8mivlu5ye377khavrz2bwa8jupxs61n14xp58',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'rgfszb51a4k1degomuhj',
                party: 'x23gz6pj96ssjq93sct2doos920488xjyya2od64g2ct8fxllphclqol2lpyyovh4stwc1xs1th2d4hzit590w5v1ulsryt9lx0tawgrhrikxwcjvnaf4pkynm8zk1pre03byxt7smpjnhkbxwvoe1dud8qmqamc',
                component: 'usxk77v253ptv0475npwrevkr0mf9fmfetwmdw49b4jzrnff6padjpt9mgtlm750g4b4m1vglm3e08fyj5uwuq47z248sqcw0jv7b6nl75rdhb6d4dzi590u5vanv91igtosgkk6n0v45wy7sloh2eosov078g8y',
                name: '8djyba7m0ueyp7aivdmheai3notbiv2lqg6keplw4is3oxv6nhm7ad6rr0uhb6pkilb14pvxljut997uahooiijcg5e5o0daswhmue35u12lc6ahiod8bt5fbovi7szcirv1dyvd6egh0za45vubnggo0popc694',
                flowHash: '59785ueufg4rfrn53pbgnzt8bd7f5302k0sbvsqu',
                flowParty: '74wk923oon3nfvdbafrg55e9c7rieqdif98j30y4qq4ig18di9vligw43onx40q33bzxwqu7y2vdclxz5w6ha01qq08x8uio1b7dis8nouqa8fhkesldatcmkgeig47dq5jc4rwebtwgn99u4k4muz93v4abmlxq',
                flowComponent: 'zm4tdbez0237v21lazprstizqujkmt4aw7i6hemsxow6com14lmjxv4q1lkq8vgdneou89i0hj9fhhucjcn0zj5icmn5l8at10qs5x48t2abzwxc30n0zerj2fcdxg6xm7gk7txq0kwx3fuosy420fxfavxpyoof',
                flowInterfaceName: 'zh946vqwmwwshnsx5byuxzjnq3bo4xurjka8908bj9cxg7y159a8a4xn9mgz34flj14fk314dk2pep3ejsweekfu8nlb06ci45csxeajh4kxi0jrcmhrfre4cg7sxeyiq47393fm4kuyw9eiks3jp4y89rqcycah',
                flowInterfaceNamespace: '6pe318oaibc5wtn91xrhhoh961eyy6jb2d94hcxbtxf13c3jtzm8yxlpvmw84auvcn0debvyng8qs4uew8jb4ollnb6t9w7l372nyb32p2pnem7ruhvdanijwr035kd8bfid757fof2c3utigk7repxh1ks2o4ci',
                version: '9puot61r88ssu8ps8r2g',
                adapterType: 'tra1swmvvgg3g6ba5mkkzzi8x66vhyuw4vj11jc3ovl0b31vlht1gqwumtm7',
                direction: 'SENDER',
                transportProtocol: 'nst0tsua749k9l8ioue8wt2kxacdu02jxwxmc4ccflzc905xgn8vtx8orgtl',
                messageProtocol: 'x4h5y9fbd7wn1a551x801uzml4h3qgyk3882o7r6yro30h9dkikqjzwogpgj',
                adapterEngineName: 'ha2hbspknofxpnvtkxi1ntvyxja70t2grz4yifedikxyr3kk3wyduf10zs6vwhjqzdethfc6aqcl7nbwwen6q8edcr39putg4ovbnhsczyhdbkd85cbd63hq89956td74ikurqx7kwo3wu2ico6wtm3pwzw5hffj',
                url: 'es4az4asv4vj479tau9rg5fnjm1obl0ptlfs0n3y581fzkhcs5bo8z8qiocmpzbt09nov1hm92oog2ex9e0mw6gc54z31h22ht9u2sr2js8de2m5lcwg1k0ierkivzrgn65rj3g0jc201lxreuf10ugp5n7nslq9xpvrg1ezhn1m7nsavuz7sxsyk4u8rpi0i3tw28upn00iu7j5nld0fz98veqvvkfmpu8uu5v8jcw07p136j1mnem5644vjx4vy9cxdlvmhpp2i4f9wxoc9l58ucolkei42tx22xe6nsx2iw85w183yifxm098majh',
                username: 'cfnk8a996mtx8r8d58xm78vs89sfqa8gzcft2q3td480zs79d4o72lquidyf',
                remoteHost: 'yy1e4826cu0t3x3u3lrek4xci8voa0dbvvvrgll4w6zxfc03gv8jfdn0i237jfmozyy94n8xp1fr86d57hu2t1in3kbimz4qai5vje6yi4qlnekez2yxvogt4d1j6jmvq58a5ith30urr4t1ridq1mmjnrvn5fcr',
                remotePort: 3018429084,
                directory: 'm1f35v417f51fl4b0djwei7lsj21snjh7usb7rv2ohsng8z37mhmu7azyuwvmp3cj1vd64g89zobv0buh1q7m61etwaa2nsq1dzdspolch33xpyyey3xiw6ogzin7f3f4l30i9zig30e3k4jkk4h5g1o1oy74714elx33e0oagrlfpjvmezohzrxznznbczlan4wqja6yz4ua6mpdysjw831cl2zp3yea4c0gf4l1g8bampxjr4mogumclwv52q7p2qz901mvd860wgm60pmczl6bvh7oezcbcslyxzir5vm5d8jxpjcwfp60cxkgx0aw3hl1g4ao16ve0wukj9p85x2h5qyqq5wev2k9mcx80l7la2q0chs4t0rmu7f7nhpdfwk19pfp5h3xa5mi7cigvi356uu9d0ydh9u8kmqsk21zorkn8gi4y55cj4qazkarcd8d1qwpyehsaqwcolz4ii0vshok7c4eob2d11xk3sy42o98hrp4xqzb3faajygb39tigp833vzvftzo5ddo007lwgrxv2o16znu5zn9o1jzh166w9ldizl5ok96u6s8y9gdkgqy70oa42g252korl17oc9ksva7rtil0pzegdku2toeqpezrm8k4r3kuvm6gjb5m3jmtogp2hdr5t7r2gytbii9uekhanmimcdjuid20lmja1n90l8mv32r25mdthvdkwv1gjiavwdjvaxf3fevsttbnr7sdm2bm1d5fyejtj96fsmzacqhucps1j5a1d64z3v40yyqftgp8rqjesburcio1l760z9m1p2huikk1gels6sbmozcxocb2rifi7dgy8y08vl4xo9twnfchsgfwqr2t5ikqgunxz9xmrbgb86cryuxq2v8d55jqkf6y9s9hd9xex8vun71ab96cz6tc0widw6snr5i3biz5ghcitfje99cwuy6jc67duzrqyhjjxbmsgp5z251njgvqo780rsl8qnnu6z3dtgpbwh97w4iep7pgdgsigvc5pk',
                fileSchema: 'q1crg7837qs31q6hvl0r1un3ry68boz05u991qm1eq9er4upjblhcd58k7a8dayn9g3f2666b0hj3n0w8fpl9afhxfv59kbdemxyrak1e3u3st92mzam8rpns49sx26kcnru2iyx694e9zmmahqcqeociaav26rq1klshiblhkklcr83posk43caq6scu0ukqx02rvkxemfaxykrbt19sgk21pazqn7v8yokdn3ccpuei9cpgz6s25j7ro1aink6y6zpny0m4tc7wm5gob28z7xupv4g53xd90knt719fskjft3p9wjqc9k4zfgpzxn5cdf144aqxtckxucthctwifm77c3qe705x5coqxrsmixjb6b3u0pjh7sm6c9756k1djy3foyh83y7fjddpltsnehhfqbiab9ppdqy2ads0w8en2kc8j5jklzanio8v8u74zduzp6wbapz4w8mkvxpww0nalp4kba1vjbmr8h2qqtvfoyltkjfc00heh1oujbe7brb0yc26n88a94pn8vm6k4ru3ok4sck3826tyujw7u5pc4ewwbt3pfn2x2oha3tyr0h7wmbzycn6j79a3dq2x5kmrlaienm1bzvpojvhkrudvrump99fgwb384jf579xk6ww27o9z6us5lbf92iwizllnm1ms7o06zezwysv3a1juxb211i1s74xh4rhp9cpko0jq6rfg37mrye573c60jyi6dqsne63628k1v9zev24vwb6b9dqvd975j6rso9961g5pqrqf06nvi1mqnjeibfql6e9prh9p004ak82p7zerp4gik3ytvs2vuvu1qdgwwupwxguw9fhrkf02gkenit029pua0yh3q6amfa3qdq3mt0jrr6rcm0i0lcywtaxpgj8vwvikclklmpm76nqulad03uecvmmf4pgu3tsa6jk4oi2m9flybwpnt3la3t96140akb1seywqbma2ondsrfboec7s4hktdktfb1hck44iogrro31nkcvhll26vp',
                proxyHost: 'v9xzt36utjga9siw2ffdt2xtuqybllyvq0lh57hhhtr75el9wq9bi3i5njwe',
                proxyPort: 8249899058,
                destination: 'fy75tv6l6jbk5dcgyt8wjui2gjz9b1sltqebuwzbfj6u4z1silqo3nl1ne1yoxs6qdql3slolszdho4lq9i5bsxrc23y8nw1whalnbqliopj42b7wlv5ylvp5poywgr4c9vs5b86s87en972np4v2ngxviwej3g0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'n3338obp4x6fzz6px42hh8pjadncxr6dw5jxqhb8rlb51pve1vdleknvj1n3jqbl2wsuupvcvtevrqjin9n5s8kmw3pf1ey7j9nah7v93uyn8wgop4lcbmi995am9j3hd626upv2urymym0av6mc2do5jnczlsbz',
                responsibleUserAccountName: 'k4dx2h46wq6xd9sx3u2x',
                lastChangeUserAccount: 'uf6rcj6j4xnzzh6zqcgz',
                lastChangedAt: '2020-08-04 08:33:26',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: null,
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: '7ujrewyuhmnehphyk2m1x9j8zb0pg7qf6brjt976fwzbt3khew',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '355gyyno8uxp9b46gdxv',
                party: 'tjh8ps5abo7as9uri96h4om0da4zf1mm5mh1tuivdwu17lnk82nglh1ul0knarjqspmvdmxh43cm259sdko8695hqv5g4sm9r8ilqvaiqka760ag10li2zabqs5llaep0u5zhnjsjagew19xe4eku2zvuq1p5rvr',
                component: 'wcad1lvn4vvd9cqn8pkxgnlwwvd8lcqzq2285pknsrt7nxt07dnt367rtaml1dsb8j1rc0dn7cxo5qgzpvwbb61a69zpl8fh8avr6ho312xtxxrhcwodr5hdmjatfzw8fja5dz7hg2gwdpl4s39nge38rkraqnjo',
                name: 'm2lv8yn1lksuqy2dagbizbvxq3ctykafic98dw15txaeb1og4c6w3l04zvftzbuhppyqwi2m7w3r5uicdm5rcass35zg23pes884zkcu1ncwxcfki8314wohf2zshbx69uivyn6t2fnpps58w87qvdr9jzb945xq',
                flowHash: 'gh4optozvbxcebntaso4n6y4q1qfa78je0eb5n9v',
                flowParty: '0dp1fldpxkvn8dje09mt17homi234btzsgi0252tkrkp4mhbo4pvz70pnbby4zsz2y48q03iigevmz5vh6qxiaj2szot8p5abvn10isqncgfy1qn7uw2lxkelhm21p604r1g81yp94lzzsc8fn4xadaycuq8iaj7',
                flowComponent: 'pj5zl55timdpbwrav5kjk6c1aw9pxorigaoz2nu08ic0y4gce6f3zoywzp1hhl8ygcx9flstia8kqqh6f2ttbcz17g68b7dyhp8dm598m7gy6hxoix035tccgzm4xxtytm2bprz32u3n5rc8ktpydwgh1ggyiudi',
                flowInterfaceName: 'jumuugra1sqaqacsa6rz206xuoynr4m7a8kjs860mi88343jdwxxxuny0f032l4w8zr4keyidb1k5luzvniunso9cbhxnq64zmahknsld4jzzg23tp9qcdf6m507e7d5dgg9lxf62bnx6o8m28y10vbvvb99rj21',
                flowInterfaceNamespace: 'u607sm75t5lv35zm93ktgbvmdafztjaeenv0uh5dyndu5441lbug0aqwtpi8yeu59hg1n270nqlfiwyxxpkhglokickbxn33mj41l34m23v2ury7atm2m43tcy4wtuktxribjson3z76arf2pd0ospae5n2ww4rt',
                version: '2dooa07giazn1hztsctv',
                adapterType: 'ofuuuf0i6ihf946s1tib7gysy1exjop0tlm6cscf02yr1bmiytin9ccc0yta',
                direction: 'RECEIVER',
                transportProtocol: 'l0ww6gt113fn8vyv6uj0el205gsfapycqen9fg7fx2vnpak1vvnbeqrqdi8h',
                messageProtocol: 'rsnkwoxkh15elrpn4tdyfr9zlj2mrm92ifai5gq7gvkvaljdki6enkmk453i',
                adapterEngineName: 'ch59pg1fysa7qzyc31m95jnu0ye4jx0yo6ond02m0qvjf18tacja2rjxvxjq1bwxnfm3yrbzjum6txrgp8tloa0ki4frp0td85wp0vdpw1v499dt3ozbmsijt2sdmnizfskt553txxm5pr3uilsp7zon8duhdemh',
                url: 'xlvsd8tkpw45qclwyl2u9nyuggcfw1sdx5gt4kiumu7bpkvn4oy7qzbk5ij8sf3to3esj2ut2mavtu50i13vli323w8bpjgy9javn0t4gvvgrvl8poazhn9l9h5mkykqlh3gjpatq8hbkze88dw714irxatm1rysq24crz6lmljk8cw1cz7970faroecwoxpjycrwndoeom9sz3je4fybv11ngnw042hnd7epea455t0kqu8lgbard3xfk6p2mabzqh7qt2okgt5eexk2cv6deydcz5r1dhkd7bfzx47u1e7d1rebwb0vaqx76ambb20',
                username: 'cmrgq9029ayhqt21t6i4hlf00w2fkq65xrtjdgvelcapssurmo7wptg6narm',
                remoteHost: 'hkrgwqkdm5srzzfsd937mevoxav4dabtu6joneiqrgsyw0eu2vi4s9ejl7y251f1rtmc5g9hosq8gfo8l9hdnpkqb80dgga59jldae22aemjpgus8jfr3cmkgz0e5r44rx0uvo24ficum4edbmu4uz57xcfwjoe7',
                remotePort: 7386030416,
                directory: 'gioev3mq4o17z2z2sgnknv0hnpelwt0q6qz95619a8fjjs8d0rouxjiver1vg6ylu3af2nsfkl3wc0scguc85mhsf3h7kmyiq6acqszc1pgfmxgehilamthxn923xjdarxkqxfrjzbdt3gzngk726x91ja4efmcara9fz3dv1fvk4rsyp5e9tamjzwvwh0crzvu0t28gorsxd85rk01egy8j4rkpp4q7zcbbivk95du5ggq72fz97c9b21jgijcys7qdaktfzqt7p4htuvhepnljbzlchkmvz7qpex7xdx3oq2340wzitnttix2mh4vgvu22h7dcslco7ctt5xil3dkyymhaaknlya9qcpctx3hlfslo5zl56pnefko1b74zvyg6hfhfym5o1y7psl993oid4g7frfcftd412wrs97m6detqb51zl7zo3plxlteenukpq7mrjrkq2vrx5m54jnravlh6xqlccjkcvohfab8syrru07hk3e9nv4ijjcdhep9q9tgr4c59xpb0zd62wfw421zsownltb9w7obp3w9di8n5gejom36zu1pxtntz8g9ff7v2qnfczy8ux5i9ccnfrch1mkcg0tjcv7cw6zxlkptnvou3f221fsps3d23t7unt6o448thha98dm9rqk9vw4swj8ecjjescocf59lsg6dp3q4m8wlex6onk1h3iqdqsf6lyn93jvtt4a5tv1qcofyh9rhj27dxnwgldxucr23u7q46k7q6j6i4et2h002nuqooau7i028qb3zu48whgrtq5ffollxfhdxkoq8a6cs3c6awghat0ckmo1ym2is0c0ah4ubt7d04gjez7ccfvsjyl179dkctfo3basymun0eyv73nqmjdhu08vbsa6j8vsplnql76by1ref9tvswd4eozfy8rmcofjo8mq68d6r3sz7wgjixg0aznqbrlklcmguvleqpkgc25e0uuvlve65exws2fyjgtr5f96nnd019w3uj9qzdd3bg0jkh',
                fileSchema: 'ccsgfup4f44ss01e5l0oxrm0a2bovdl4ukin1kdcq6ui52zcncp38mdund6b27re6k9ey3virkzenoq13o3if9kdbw0rcoy43s4uvp25459nckt816clfftkm0oxz406uv1ypwx13ccm4t3rhw8wy3c9ylnp489wwepj95m39ytm74pdw4a2fjyab3qjsogyuq1uc7mqbu8h3djnealsmzs8gn6b6y75b9hnofvs1kycus90x5ltvqekx4bfdnh59iswhndm5q1p5v04uxottyrnz0ql4k3hvhsvukjj3nr1di10xs0jd6ccpmydg15ui7wg6yfpxsea6wagwhyoellfr42w4fjtz8vifog77db07bww39ogfmbmos2o5zt53hjtoqltb22xfyyihtnunklyjwqcqqukk1l0g1tf8rgvp3u2imokrraple4almnufgbzmxu81sgcj4ko53mgahhfvqu77n6ihg0sn3lv7jxujrp3yo3bp0nh98rpwfj81koocwgl19ydwp7142izlp83z8tat17lcyvd6fyj558ryxru5n0t74hl9kqwjrxn299o5wkwjuboaadcldo2ifkw4qei2jd3eqr1m53cg4tw7bcsn99mnc8xngdbg5xmac7cgy2kmji0wj5zr1ydce2qx85d78viklxk35vc35vkevsnsmwi5ngqusjbotmhk7plpwkthl15dttr4scesud7wt8jsyzjij5p2i7a8fazajq06w85utl82xcqjzq94clsdw2hgvqhrrxnoflk3wmttgreofdeq9o7gvmjqbetyyciogudq3g2tfw5qb2669aakvsaqaectu1jwmt0sjxnaolpfwy6vyhvq52v95wha5ovxu3ajyvtmiimddj433essoofbeafpngfa4ce43kfjwl92g2f44o2xolwe4fd6g19vy0oa1hmqyxdyzaoug7mghtg9if118bhbso3muctlux9ph43xd7ld9dgu7ougel3v5lj7cglcblotkb4',
                proxyHost: 'pxoe0jndjf3vkmwftbth1mz6knjzlzb3l37aj1j8tvy5b3r2zu8rpmnmmwga',
                proxyPort: 3436371804,
                destination: 'psylajof80d1of4gdkr8ubsuntvzzyqgje8kiwmx5gmf7kk9tj2jq5gj70xur3yqz83fwcgrdn53cg2zbs0o3mocuemcajinpemj3ocq5hjdq2nm7awei37pcv24do1gozthya9s8yxelk62p9g9hwhcx9maweyz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ilis62sujh5n8fgu0193n3cy1pltpphm5u1jp9xj667pwimck9jnvlz3r9wkgyxrubga2cpze2co9rkzxcw00snc9boveffkzvkb153gnkzainrfknpkfvvlnxw07utgx41bd02v3hnz2ckepw6p95qcqkdp010e',
                responsibleUserAccountName: 'l7bgsi4ucu6xdosuhfuu',
                lastChangeUserAccount: 'ysfb1xgwdxmb816y6nih',
                lastChangedAt: '2020-08-04 00:29:44',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'heqqxrsrg7tgy1a9sarl10uqv9w83uos2d2mdmx8hsxnwpemm4',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'yfqgamby7506sjptdxhh',
                party: 'tqjc3ax58vqm4xskr1c7e21lgf30ipf6o56a7uzu1q9zw29bcirw4pdnpt9r64ahbv0uvdz2o8weq7e7rv4nj3pi0ih896h5146k3fb0i92szm7qk0oevx1hkvv7zbexg5awx92muw5b9cjx9w46y9sjdcwylihk',
                component: '3xnyc0oskjm6wqbf5rxkmoekrqiq3sskl07mhfzjvsb8vsdy2zpi7nzlspsuwvfzkcj3o1hcr6qm14koz3n8olw4jb8nxq3jfcs2r4qwe80yak4iiod1ipmwieffruhjxq1b6yi8l6uxisluehd8bvqp7dn8ujte',
                name: '7g1v3dwk86ezlbt2mvjhvxjnuywyvtzp4wdh5zsoynclxsin6215ijck4fwctelezygj4ewz96qsiee9w4e6rgyhey1ar2x1j41brl2i4yt8ffhwslwfs3hg09c2kj1dcf7cbx31rsy60fqva42752tndjyaoq3u',
                flowHash: 'glhxb36m80grxy5gsvu1pinxry72398yqtj29esl',
                flowParty: 'xih7q8yhqg6sxfnorkvuv0jlnyq29l8cf2v009aq9kojehq00yp5eqkc2gwn6tfzwl8z8w1aa0afb16xfydujxj2patewsirff4kmgtxjklaobjyi1uqfnxpnsubo4329kk39nigo1mmufabn5i76w93zb371zyp',
                flowComponent: 'o9zviktra3tbvwn2mmsup4ddxg56n00q34prxy6daxlqvrxonf4c8kn3n8ej94y0gxktzypz0tehgigng3nesy6kxb3bjygjxnmw774t9e03mrq85422hn03sxorxig4st6moleh4gtyc3l6jjre8469zgnapizn',
                flowInterfaceName: 'rfk0b6k629v1zui9w9fdl55wkblm9pn2r43ghr7rqn5oiwo2b7tklss4jjsxjzt8v0kye7f5i1jm49uch68bv6f2kd6h3sjgv45y5oxqru2vdkvxgax937hop7xny2k0aj3yd3pcx01hj33e0socwtagkgrj7re9',
                flowInterfaceNamespace: '59xo5twgn3qsm7fxexcxn0qdjm9hqo0o1tmx8gpevwdodubxkottwg2x9ngi368lquazph5af271ac2s1cyjlphq8qp2mojp94osvnp8ff0rh4tyrjmyjwrir03aemd9c76cyp38w1przz1mjl0sahxfzj3dybni',
                version: 'f5ouyb97omhqujw0gkg1',
                adapterType: 'bqrm1auurkwfbkx54f95glh338kp45xet0l6vnxc92h2yq2zf2u275hg32c7',
                direction: 'RECEIVER',
                transportProtocol: 'jt75allsaidqoltjmoa0iwzqccus8vcqn605p1zybgazhbotm0f0lkxix1jg',
                messageProtocol: '04thlmccpzi3pf24hjrxby4823m8ft7dgmobpv8a6jx5qs618e17umye6ty7',
                adapterEngineName: 'cba3hof3pmbgsd6dbljt65drd0m09ruuc83clo8fgsmc3jbk9ofyyyyo72ixdqarlj6ye0va7v1qa19xhhxhfhj4lmarfijet5lsj022yvrac9t2ohdwz5sm0ojflgsg7wk66g34tgrz7z6yoxjbc4jzj3omlg5o',
                url: '17520s4xwqr1xywfe1megi8p0syzwdioz6eqrmczsvqlqksg29879cwwqipzhlcevtu79aozyid73l4u0utwytbfbw1qmq8v8fnehbil0srb0huchf45tq31o0o2jorn7xkhexkniq5pavlk4ucubpdahjd4ahgjls4zmitcmvqedyxby65g67rkfqr78z6fxtxtbi1pnvrc4m7u8z9ambu14l3pfyudhhne82kzrn0wd3x9t8265uc0rlfohggag7a75sd7j6zqvwrfmd4b3cj1n34dipuuwdm4dkj9pjc7hikqpxg8n83gl5rjkoxu',
                username: 'dj87iq49naxknvg12xmv0zkvutqlvbwqjxfx88ynejx3vhjz4rxpvpu8pnsg',
                remoteHost: 'q8t2bnasz5prqftp6li672e3d070imqmtypf7sjus5zhhwlkjau4gnpp3lxiuvxglohytp8102vzi1cjdarkxkhxytk54vy5j6xtqzxj04bjh27gmztvk0njzkgue0905bjn8geckc0s2row28g4cm7k5gpbpmou',
                remotePort: 9275219589,
                directory: '1chpjd0a8qjz50rz64f6z008p9ymsknaycv6t1y9dencuipgvluwa3p3s3r01hepfzsby8mr13u032tf85exhrrq8p4b8m5be5z63smgfj4zb6oi2jv7799ap9tk9sf2unww6trbt1f7088nzsvijcii4c9jytlp7kuriru5gmswi2hu2g1haapfcgh8aemu8kxbjefv6cwm2r5d9jj1q9k8bzpqmge1lwkulv17jtfsqgwit8kx80v8wuhvhxebk1ut25vloq8ibxc3443uel2x5bf8wqkfrv636v9hrge2bp2vpmv7su5ngiowxh4pbfyyy1b8ntqcvcjkzi9gmj3jb9uq6fbhuj7q25515xzn8ut33n87ue0hzx5exhclsxkjbgtd4xd5uhd2j6l91uukponq8appuoc2tdl52rd15jwkrtmfv1qj5y7adk3voki80qvtdwdkqahwevsvsrz5h0ufhe5vndxpmxgerrppeto1qtp3hgs1avf9y0ue9ehhcf55004enmmsazu9mdey33swcr791h8s9u7aztz407m559s78lykp408uho1po7u2n8j9lk3kyaia0ojv06gh9stzwnmpmj4me5vb81ue6l18jwf4g9lq6uhyvz83pobg5hc87yi8dd0n25d9txt34gfsx733sjitbyudedstl9q2cyu0hx2flc0xv6f91n2mlahxeoqr5plycw0abu8w8l7ozvewzrg9b2lrd5pnus42ovebfgunnple3o2yocqolmg5md9f2qe9bk7uyqudkq9bmhk7fv17m6v71i4mdekxhx6dbn3xu1tdoomd24aynm46cosv3u3swe5nh1zv2orh4ncszbd5va076k5px2u9dxeungi7mqtzbvo5bsbko1bv93ioq83u0ii8w96ie65f7pz0l2krp5kga3avw5ta6agk4avoq8gja574u44jlbmpitni6pccjnxli7jbsje6r0a9kyo1d5yujbd22dvqfyt7u148h3h0qew',
                fileSchema: 'pllvp6e3n0l85vd7fgfdxi5ocn1394mr26vm0w6zn6djk44y7x452tbs1hr2gxm3zt2xp6esk46alm8hv1lkw3sxdmgpce2h98hyfl95z3aq5rmjttf4hc8fs7uy40rrbikgk3hvau51qwxndi4otxs7b3alw91beyj6hpkk7lfunm3pi13fum6rcud7s46sin9b0u6stcnmmemkgzbnsv1ykfdwrepkgle0ml9aredx1x4nu2m65ofkh09xcjv8nlj8jywv8fbq4sv4a1bge3u72ayzphyhdxozma2e4183yg43lc8vjfgozx6jtecmpdlit3d2ocglc4gh8u16opidqd7bemag5l9460zzswqtt7s8svzz6j8qwkgofhpvvxhbyblt6vr8zx9hp68msgqgrrmd0i0rkef1hlefiq0082f9fftp9lj15au4iybggf5isr23prold9y6idijgng4u3hzdiityqsid1ec4mzgi0m4xmp2t2nmwgtaybogwsdakowtc3e2qvfrgtj7093d64w4pnhkx50emkui9k8tfh1ruf6pshrx4gvt2gqsva6uyxqdbytmyye9vy9lk8lmo3ztds8fludg1s9grz208pazcjj6ukxe9qnhi2r6ap7phe995zl9hpfaoi7w5uvs8djbf9x3ka3b7wfza845tz7aafrk096ccq0m5txsqx9f936ctfy9mo6x0rcgdg3qem6fae3hhhixdxxi2xmcs3jm5c0xu0fdthz1jnzqhm74cuhtqmxbaox5bqxpd0zy3hrpy1adeooo969zndqru4s4ozx37xtsb6jt4sivcii1pssygsgaz7yabw9t4hpj8dzqxb2ngmtxf10frfzxqmjo2j8j79t6brk7r7m7f33rw5inql14yvlp5wdapmbb8zo4abs1dnudxwfyetgzrzpxfiqyw5eewisjmndxfuseos4el3k1i63a6gyw9exwein89v98iy91i4p1nrylvhl5crzyiwp6qxl81e24',
                proxyHost: 'cbykqonr5nkgrio6sijfup04j5r5npeixbdobttggs1itctwrytqd1asj0e4',
                proxyPort: 8387953262,
                destination: '8jgbdnek5djv1gmmbrp8y726tx5mnc6lksq2e62qk5jdos3kctyhn7yl0i8vuepafpieswsby2vev61pnxhdfe93k7wdm82n8mmxez593fub4psme56dizrdwq44ffs1kecayt75vaer0rrlgqxxte0rs66gfqvp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'nd7ey1510vd2owmfeibze3f23jx75lw5ek4nu6xuu5hy9jqzae4c69cg0whygab2y59ajt3auicv6axzt7tt7vw15k8o04f8idarj3g7fczake0v8bcgvad9mrcaab83oglqcvygmp8jtphsq3ld87omvo3ln1b4',
                responsibleUserAccountName: 'u2h066q1nubt669bmvvx',
                lastChangeUserAccount: 'drugs6iu8ja4z4rlf0a7',
                lastChangedAt: '2020-08-04 10:19:13',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'c2hx5lvv02v74mli4k7trvmhm8wzc7iou0f0kbux',
                tenantId: null,
                tenantCode: '36jnrt58jmyofeqoad7vrkclu4ss0lx1i8h0nolw157zaje8uc',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'v9x6dgw7n88hsb0qc9qt',
                party: '9b7dzhpkk6iqhxc71m10l58l8i3l0f6oel1i07cn4eqyket0ltw8cmqpy13nz4sxtlxg6ayr4odweofah6uuhhuvf6ez1bn5tyswjlmheksvu8z7s8o3f3rhjoz1531rmer6kg6b7srws2i9ogp0sppkcnj2pb39',
                component: 'jvuyis4pd1wvwx39kqcjg57ewhebhrst7yri3zst706rqr57mldyz283zhttkf2dh9ysfzwfhwzw30ts7s45sim8z065i04o7kaoyuiv96634dqnue7le2p0w2x086hmn918zqt4dy0qae2a1aspbsd8enu3qu2z',
                name: 'rzand4vryoj3m8m0k8jl2zxva6or2qsbphghko3slmsebivedvgvgou1f8fbza5vn879l5rlzh58aui79qys50ycbkju3oihao6cwwpxwz7g5kob3cnj9ke73oo429onmxmq9zpwkqwlek12mtg7sbaw0cxjxpc9',
                flowHash: 'tx4hrsb4fibwyd9ca29kgefoiqoiurprc90b76d4',
                flowParty: 'vin5cpcb8yto95elxlbpmu7f2tvq7o4e0kxyn074bbp566ug9sqy4iai1gqy09danbsky38smp8n5ggipc9ocixzdmaqx0wagw1hfbq2jn96acl3lkxkarb8bf3pfi0897du4mhvlcu8fuuu8d99k21f39r096za',
                flowComponent: '5v2f7mj2ys0wvvv6cdn4n02rp605f58nmofkatdaejr9jdjze9wt3jub3ubwyy6ocjooa32h3kn1hkgazjgc5rbyl9douk7fxxn9ai9w8jnn36ii5m0wlhgzjyz1y53jt25egxkv25nnc88nzah7oetycy79znby',
                flowInterfaceName: 'gmaez1msznotusdk85uyv5j0i8j7tnzny27yzyay07qjro349qg5us4hljvk91i676ys8qx2v36lo2to9dqdpwc4dckx25no4tmuguo58uxpco0lsmj67eiw9jryidcytph2ddgl6t481q1pmi51b6fstnklk68c',
                flowInterfaceNamespace: 'tfarc7215vom9odug85l7xnukpljbsh20cxrgbij5ulbn6drkgjbwzg9efthg8heoq225rmpblrjo6lzlwbijbq51rchlqxhtfam1dwo9939tlvxc4rq5neebhkiok41p3a0r2uslip3e1qxqia1vnf5s6lhc7cj',
                version: '0c7tfwdkm0ig3aowkr3e',
                adapterType: 'lg0zegb8dy0igzadk8negncavrcuw3mmqn67urqjg9zvce996qvw2red7abh',
                direction: 'RECEIVER',
                transportProtocol: 'yb61f5i6egwc0a3htfue82u8yz39181ns3l787nrahsji9o9s8dgsy25wsub',
                messageProtocol: 'bl8svhd33jdkhlkb61sz07kkj0fmahwm3e9u7z0a32cef07ghqvng433bei5',
                adapterEngineName: '7eqbt0mbz0mx0rp6nkk2z8g3fv8xy6j9u3zosruqnf2uzy4dk6khgyey665klj9q1t1mdpevohimw9u5fmz6f3453mjnmwjorue3pgfv97ol9fy7bl0vze3yngv8yjib53iogy5olcu7h9iaui2p2yn79yprau03',
                url: 'k01ngl748987hr22lcfiba85t7fxe15om8trh28vrgl5g3rzfpgax9n4nj4onjnl8uxymh4wda0rbmqlt7myxg1quuh5kzz2ykpiewhcu2jvrfw29k63e0oa80ltvro21vfu0n0jpopmcag2p6slul74ephcd3itv3e28g6vj0ebxykhr37sa2dfoortoimndf2iffsf7bruxyi1cu7f1t88ep483loa3zdak7ps9hqbo6t2x5d9eyb1rrs1uaa2hsk9b6lxjllpqtj3eqos7inmnandi6ails3lpyeyex9x0jr9ji8vtej455eto2d8',
                username: 'yaynyuqnqmkcbc7au7uabrni70f6ruo5392qgtu8jao4j05yptf6yr9g10kg',
                remoteHost: 'ndugpaq6oiecsv4gb73tjjxggrbfnw5ppex02df664svl6ospohn9k2y6jpwr0l3bb90ip0x78cqkm2i3dfxt0u8wnbok5kl30r7r3m85hs1kvbtpb4r6t1gnq5i3mkei1v9stuemfavnb0qr6lxh38nv7a4obpl',
                remotePort: 8690898866,
                directory: '9c0mg2lbfrw90rd1v2nwlw2sxir7i4pd6oyrfviag9jdy2n90zmyba51nj5fwkyls0yq6stn36s7rx3k96h8byod0239ke9becsd7xnwdal45ph0otd5mc7xa6fbb2ivpm32t6mhqllnxrns1fjpx4pz506f3zhm2sd3w110s1yupx7sbvzz9i6ucr0jc4zj1h72tx4n9te04au595ngliigq8t85aneioqfs7462hjon9vdj88a2gwuuinooorp6ox5k8m9ksww2muc1xs4uyk70x3zo2tiyqwvz0fefudlj8x09qu9jrm3z2rl1ewt2jbtyhbb1c5l6t7v7ay364bidputtiuspey0vhq54djydnc0f1lgtj8vzkqg12xlnem3uswf03309vh2db2tburn89jg0qsqg7v7o2tm479d4t025qfz9na5t0eylo12mlixd20xv1a24nlxobh20ufghyuvamw5ywt0w2eo91jq0w1h3jh9pu0vmxlzk0zloar7fketesl9p8kdrv56ftu03jav3cfyubfc4rzq9h4f6ab75lcfbjadc42jnz8t1f0jnvhs02qfkt5ieezu9ac0kgn52vvlajqin452slnk2zl97hzoaegnu11k1kj45j77coz26fqhc6cl6yppn6gvc0l8vh2nsb44uraoe6pppvap2mui150z0fm5sw3qxuxathh7m837ii9ew50k0s9uqcfqyhervb5ywv8atd0zneqjyn8zvl9tpgosys2l1nj4x9jeatgqxt58389egszekfbcyj3e3kf88rujjuwrt6tb98uyvrwojsf09nk0yh0nh054x730j48n12plcpv19d9rl6h2frtpztue3or3w2oagipmoithau3uqvjx7d81x98748t7g34b7368zqd7yyndmo8emtcm55kcza6skbgsth7c5gmszqud91o1u03kf6k9vhhyiubchxevcl3t5e89ibwci320j5eqbqe3xqdz09qc11jssrcnp3br',
                fileSchema: 'sa6k6h1xdfk9avg5oasbq1wt1vl6bieh939ikd5di8tlkk5qbsfqbvkh5xo0fray34rytjzhe8c88ylke7ztzshlv0672nv5qt72tsmoznpsi1f6ust2ourx9vpcppz4846377fnsgyotk8asdcit422wxnshfpkqmnkywteb4c2uiqty2ob1nlewo5d0mjkcg1otocgf73s7zt4mudr3g2olaani1slpqqlw81wg7ak1aj4dlrerohvrzvh64zsqnbgnr31u02a4fon62px0txf5p63fh914t7k9clvm0rp2okumaq875qywmhkir8ucsrjkwlxvek0crqjlgt38wwr0242b8wx2wpah7r4pjb68dp4njegnjn6iynprsoz5i1308olw2lvszf61y33j9gl5jbpc42s2hn0i2ndooim9g7wiyzf11l2pyjxqxsq0b09fnxwxvybrcqyakdw6277jz5z4q34t3971lhqoamx5ugs1d9bt2windhqevd35xqy9c632pb4tygbsurgy2rijyjh5pobz5gb4ok8r5taxdbrxxa0g1xuz7oqetc0010ajv5fq2lpkrm3ot62aa2qwncqsawujdy1fc7veuqeoh3i96h7sy6w06uefsv63j7i7tot1nzibfaz3yv16vhgwu23b43b1gi4ph6drj49pdnfmfjd2hennttjslhfij4xazmvmneq6f76o0cko0cwy07fp9jqnwzyn2u9cg9etroi1fmwnt3w0xob33dpz7bz4ljw2h9s1j22bbqjbp8emahkd4rqu1xok1omqh6h6qfsii0eidgv788gdc7hhuptnpadx9s7hj02vi1zuja5qkzv7k69mv6ujcnpm5eovkoxpldkixekf5olommdyi0nxycbwawzezyidao74hn0nwc55es821ldkjtz9fdsfw8qinxic5tybxmyc9ilq6ychr5utoei2b7dhu8g6mz8kxdvm6isryfxquwlstihjy4482b9f3dyg1d47wyo',
                proxyHost: 'l5lyce60ykbzxnh1gmyjfibug7tv4ufrkcg39p7l3pkuio6p5duboix0en7i',
                proxyPort: 7547454017,
                destination: 'njxhmwz0qgp2gimq3v7q9nuv4h67aiupovzh62ec81l3b417wvqhqe6yhqha7b0tl0fepf4gilcneu98mj6fn9y0a8igfvpe1xbky2ob6farkbveah7o1bdd2p4u6tqotxq1lkc7bi03fqh9v6bgf9rmq2ohjdrz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wqr1fxxodhh2fmfobhjn46vhkins2q7b461qsm10gic0825q87x1smrd5rw42udjsigb5f8qitzh5qu1z9fif1l3jvnhlak43t661ezm4oehr1nzqgf3yyfu9ui253b8mt7vys0ez5edzfcbrixqbn7zn9t4g6ci',
                responsibleUserAccountName: '9wl7ecz6b94506dijms9',
                lastChangeUserAccount: 'ng56ffvvwstujdmwh974',
                lastChangedAt: '2020-08-04 13:05:52',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '0jhw9m8zjz4lgzzb5asrsjyuv7wxgc4hj8c125p2',
                
                tenantCode: '9lbqh23temlk9p851h4z0o5slfakz5ooz0otqvfl1kpzueysvw',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '7vmjq7qougpsjbu6yczd',
                party: 'wknxcy6q5vhnmm1hwsy0xr0owqbg7a3pggpj93vdhi8qvzjykql4p0pazkt0e8ryi63n9sjkdvlxyrlw4p267rj5cuc3icnma36twb1aof4gnpouer050js7lq7hofg1h1x05b35yqauouwmsmr8zrkwd8ksnr1l',
                component: 'd5pv2qk927zp9njthcz63i6y4w7ltk7zelvh18ybwyuqsmox1w72rrb2thnkvj0nnnrxdforq718a5rbcn4eapxgfrg9oth63t60tz772jyql6xv88dg14lr7dtwa2mn7p9acco3rqz9ldyfgcenhq0qcqtben09',
                name: '6yl053w146r4merdaiag9re351glwi24hcgzbq95h3pnme1hsv1d0id88c1n63w8031kya67omhribk8scj66hi4l6ed97xg9dqk4yv9bnnbxx8r2i8j4u36vu1gq7fxtqgae0r0puqcy0kr250zij28gtuvke6x',
                flowHash: '974ro7zvldwiczhekgcokpl7wpgkrx8blhfaload',
                flowParty: 'lspl5xfnjtr94ltog4ei039bp1sl6qibmmt1nbsh9u37krnjngwgco299b3qgg1m7udvyaxi0nmqecir38n4aowlj64ch0zpocev2syhseacgmw3goqe4kwj3emnunxbwgd6zzdu5mi76gl2bd44ruo02pmua9zv',
                flowComponent: 'uyph98txhuyt6pnyr0ftjbvfvt6c1ebiumys0h5calpr9tqyvb9hghq8fgsf25pgz6ws1gy4xe0pzb3mu1ho3yjcy3hnky8x7wmnqndyugcofat7vhdehk5jtidzpufdkntoqwwrub2mstqauae0ad0oipq6ifyz',
                flowInterfaceName: '7rokzo0gea0ncx3de86esqv7ruze5pyontjfa01ceaudes1km9fg8309yzyzqzoltp1aofi8eyqw1i7fbkzaeubamwtzc658fzxs2mw942jp37bh4ngapyenfu0w7y71rm9c85vaijc0bmecbcsmli03hn9mk2dj',
                flowInterfaceNamespace: '8m571ofx46rhh2hht9o83lm8e647t2u9lpxpx23ll3kxj9ye9zfozjqrq90cgqd15vtvtai6w86214x1jxilppk78k0kyoapenp3cpntls0l712ep3akkj8176w5g9vnuc2lct0q24ty9ashafsp8rdd9rh7o7gk',
                version: 'bik7x7agmx2a1t04zpr3',
                adapterType: '9pemo12ewtv2mmst7n348j851biptnm1pqbe3rdrrww0u3z11h1md48bkffz',
                direction: 'SENDER',
                transportProtocol: '52k0lpfx1b0k3k197nsuvnuo27wy64c365moqcdbzgy8l3jissj1y54gd80m',
                messageProtocol: '31dd9muakqxkoezz01y9xpi98mxebt2gxikiklicj503tj62md50z9dx60bk',
                adapterEngineName: 'kw5ij7b42tokzlhnwc9m4m99kjsvwkxjmwieou2u7buqpbyxmanfj3iun8eotw1ifd1zauj8hjlklbk74tx6jxfjb5xjeowu42008qb1vg6ax8935chedueu1s1ee29x9vrz9ajnv57h81ckbcmbwqpwa6qwg0ex',
                url: 'cgi526l58od88ft7xlynop4qfvcv56izvebd72h410ptcdflqb8k4qnso4hlj0ivz6snu4fne0h0yrdhvnz9nv0r9ni1ylopm78dqrwe9vnqrtoo42u0665xag6lpr2t8upn6cla0ipbffovowzauatsv2rkqksh0sqqk7jdpfx87ucobdht32zp1n5xgprqlkx18bkq2kmdnj59j9fwq7b2ayaaa67ks3qtcghtybrg6q8co9l6e67cds29fjf9re6ye6aztjwmx2vt9x60hkzlibqh112ev3lysve0p3cv1fw3y7o1zeuz7dfxth4h',
                username: '62xrc9mf50lphog7nja09woyk5a8bcca5lo2ns9i1dq5kg9zo04diw89a2mq',
                remoteHost: 'r6wrbf0a7pojckdwfgwlw0agdbkawudmueedl4fuxeeskmcrmw5ptc8oiqldeq4hyftc8goe1u4biol9c0lapom9lvsfreovag8o4ej08rihp9axd26t8omcaprlfflrtaquazuw1uo4uivu3mxa7llk2sdjew0f',
                remotePort: 1728938309,
                directory: '34iak2hcwwucotyel6wbdesq92y2lej6wm9lbjdht96fj6opxvkihznaneew3pgj7q4gbvydzgwm2ffne9u86f7b3ep3zu58z1me2nl3c99tlinj29semznn6t4zpahef73jxaq5uu1ggbmxq1ankxgy7lp9qkctnc7m3lbcnyq6y9v0tolg06giv2n9tzt61e2z676p0xnsyun2ogbep0c958t803vdvgtltmpo9hz4ccei6r4px2xc46ldj12gm8fa52ijqebp1oqo28xqcvagpmz514u2g8scws9lddu735qe9x1p5ol33o79x66k6vg0bg2s91nwt1m791k0geh41tkqes0kd7sc4cfhkf90dw3si2mpw7bk8jg90ax3ut6id77xuhet0io2g0d79uq8apfync5x6stv4swuofa1o7r0q3prguzserrq19nutnj37tzqd43lq837k5egiz7dlhc7wok8wf2mn6pnmc4qdp10wgpjdr7vesefn6t7szmdhdbj1xhco3us6ck9ses075q0slletvqzd5m3tjt4zr1qmpyhyegpg8eqcuftl8lzcujg5izfutrul6uzp3yfpzmdrt1v1cgtdlb119cnjkk29yquocbgndue54vp2qt59i7k11i0dvn3ow993ofnetj15nh6wkghtj4ei5ghzhaz8l3lmthcec4tam0jv87n98m2bjza9rnepvf3ddcuxu59gllyfv1tcgnpqswp1h3vh6lak5c85bgy21mlx96vyslklesfdxv1k8v1fggfa4sxu0rykcsbis8niwwmzxo1tjhroasd1c59ceeaf6zgqi5edzasbkdjx7pnuhkfmuejgw70f3us52q3ph6rqf00s1vqrczc6mr7dmv3td4tfsooiswlinrllfpuwpdhfvpuftl6u6osdv5uddc4bd780zr9fr10wxd5hy78578vqnq0v46j4m9rmu5dm1efp1bjvn9lpxxjl50zdoa8oixw4rdjrkgzq26atnc8',
                fileSchema: 'w2w943fg8sh83ogm3skcsnjmz4vtbepsf205q9ksgetvxn4sc9nk1m6r1wo3fjiyl9girwbbs5hjyqnh79z174w1ejbx9kxmmwz05jie4abfvdo4uvskqno2gchnbprb8mekhwuv3zb2com3c4kw3t7jflcess2ys6k3ksqxyjw06uq6t11ogc3k0cbm6n8e655f7u7gatoor6033kz9xq9jr2zokxq4s333dj3j3w60klnhn3o8esjad123zfxbwc2doerhrjdogkazy9gvur68wivx5gqjuo4f5e1dd7ff4jdt78lua1frku171czmrmal33v0prfvszf2ax2066dp6w0yim19pd1vsrbskqhmspiwikylxy9hzmzb9566ckwxtwu4o630tj0kudoagwjkvamw0a1uyhrnc43bpy94vcv40hzfqz64ldm0xk9z4kj8tywabce64zazolzli72weyeo7vcahqtqnd3rwzmc1a9brhc9gxtk2yf9fcjmb4678ka2eouhqmzukrpv5mqtnipbnw1960egx0kbx20lmvtlfd6bizfswqk3m2fpmims9fryx6ufrqfp73l1q4xx7icaco0up4t52577k9m7bsxc8ao6jrkyksde63j6so2np3kfmnksr7rlt3yd06p31smirmrw44nh15f7o2wmbx076v5y7uw5k7y8jqkoiws6xz350m0q352fw0ybxstm3d4hw3a9vui8l572yqta1jbzlnoshejfy09wrn3af77m7bfck8scv1gl2w2s2uwxm1tttrscmyyefpg3tf9je9131n0tizm1b0qsjmz464h8wj8o4wzjwzzitcaepbj19dfeq7epuogeqbtieuhm3fz5qjasf1ybftss32ope2zrqtp0z7msxa91g4ioiwquk54gn5trww4tuowtncoqk6yt5x3r18mmcp28buw4tunrws9z21zoe58gix77gtu7b9g0lzxd8gvd5o7on5swecee9ymbvaq99efqi26x',
                proxyHost: 'h0kvthzh6b5ncvsrd09re8fks1sm2gproqan7e2gh9bus8ucuz1x5cztiufp',
                proxyPort: 6641485367,
                destination: 'qhx6x38cicgf1s9xm2v8dl4xc2y6jj9oe5jnxhhmne7f62oill1tvyo0uuaje7b5a87b1oesyszvzv70dxvrey2lafdjzwy6ymt2tjdxq260vwpuy9gcrcfkhgtg3jzhswckl5vbg69f7wp6w9xi7b9y9rbm84pj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'rqcmf8g0gcekdgma17i025g9bsahxy66gu16ee3qppkk0yb64pzqwereh4zi58p52tv7pq1yypr01w514kf9v7yuc4ruhum74z2skbkpb9lfzhhdo0yn5m3zgtc9vqkqilgs1jd5bvd4g9eec8kdh5td5zdv2s0q',
                responsibleUserAccountName: '8g6tf42nankb0u02v0p6',
                lastChangeUserAccount: 'azgbi5gliuyplho3w6q1',
                lastChangedAt: '2020-08-03 15:31:56',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'klxtc9xqy2ar9b39o5ezksluv022t1g4oi2ebdg0',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: null,
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'dl38i9g7igm9vppn0wfj',
                party: 'joewhsjpji2oegfntwjd3pmc4yv6trdrocfbjk5xn4879lhopmbywgigopbdw6nds5402tpsr3r3sadjqz3jg0lrq0pj37xw02tp8b7ceyglnz6n7vs3dk72blp23pojetso0yt1bdo0mkueil9billb9g7j9tgc',
                component: '2bqiu565714m1udzma1mly0vshqqn5ln1j5d6pspd9lcytj1yzn9obqlcr4ue2bnppze7ugzhlkxl9obfmq3lvsk0j9iaft24c23im2iqhz9nv6a3el2culo1nutxc4alry3p41h59saq9ik4ofr62h9zftjn6m1',
                name: '1ca6ormglul9tqx4vwstoidqjbuvc31h77o3j5969tv0eaizit1dguhutt9vq4ik1eiifm7ssly2eq1tc7muevn07c4ijwkluzoo5zuuuot541qptlb8kr5nkyqvw66q93ijqmn2yei2c5djk0roiwzugk3lfwt9',
                flowHash: 'x1o4zsqcr6hi7paef62g4sngldlc5ngql0wxqltb',
                flowParty: 'ahg3w53nz7kdxxcq25az0jmtm7mo2czg6b4j27x18sgmyc6li2r3dmvqydmffqphr4at2j4wzqwjf3kuzsvw0hxrnjoh4xfq22s4g4strzmwu9xz1c1af71ypktv4vi0icmjvv3au4qs226e70d3syvxt9qi1ko9',
                flowComponent: 'fqx5vkcn68sisdazyknd5axttiddrqeq5nk10ucf9u3epdqv7t8vfprdnl8trhlmf2pjh55mwlpfybwjvfowci3od154ol13vi0zulsdvjy33ud4mv88o8adkolcx47oosstr4dradz705hzwboldoyah25cmt1b',
                flowInterfaceName: '05n8a5jtm598bazra3s0qsblccc3ui1boksoix6dkhjlzgkficiqse595jm4hn9lrwmibcepxoahdapr1b833k1ul05a0vm6gmhv5hpv6gevp57r4iinicj019a0r69pt9atku6b5c5xagjbf7107nn733n620xq',
                flowInterfaceNamespace: 'ei5760uib0vxwip2sdt3sqimrv9fqjdx0ctj68flr089kxekk39vpegrwusrifco9g9b68alc69fyoh1vdnmztye91j7she6huh7ni2ul3gwnkxo4mmwscmyl2a94bnqh8jiv6sf66q66h2l32xmdffqoml78mfg',
                version: '4e0pgbe2gjwqb51j40fd',
                adapterType: 'jwdt2lxxlmzwe13ozft75a8ln5mpq37uq37pq2ydykicps69l4ay3sbp22t9',
                direction: 'RECEIVER',
                transportProtocol: 'tqye0ypuh10hlgjbmaa0rz1zsgyoo59cu78va4256edaeye0eadupvddw87v',
                messageProtocol: '7nc4vnwnl2w09gt030sgilb1111k2l38xo0nvz4mf2nuku33qsdjmpdh8crs',
                adapterEngineName: '9c2meubnnlm0s1n9coc63c32nvepsrnghkzdaenbzx2ugf52lqgz7f5jyewzg9vmuikbdxrs8r9sc4ulkqmzfzalegdvm732rn7ww8ax3mleu4ysef3xys3d1w49va7mg3r9ud5kws3dqznf6lqdozqazq1d3p6s',
                url: 'fcscza6t0kxumzabidczmr1ys7zxmb066lv4tloi24k8z3invlr9j6l17dtkiyy31xcx34satgotm9l3okpjmhoe813xyeabsot6r8dh39n3a10oq8trmd30crtkw0prl2rmgrs827t5c0nd7hmx1rote5vdxtr78n0yhhnb0645v6ulsta1z852lvvm9xr7bb7p4pw3fmt69eoup4m4rqn8aqs5ovf34xtmq09sbyq7g6x4bamsjei5cbmapdhr1b4a9x0sbvecdsbraiz3e1ghbypfjpfs4ewrri75rdjh9jkz9rl7x2iusmib4ym6',
                username: '7q3253bgj2n4gr5y4ni9z0zcyzdypqp716ovs7sldmh3w8lh3pnivrsz4cbo',
                remoteHost: '43fs9trvd3zkig7epe2pykkntl9qn1lilqnjhtujd5168effnak1ohgo10d7hn93bnjxfupp71m91hrm5h5d9b0ytfgt2snb2cjypm820vjq76up1au03t0grix115dvszws0syorpjed5fiobytcnztwesnljaj',
                remotePort: 1623114060,
                directory: '4qgxkuqfetaxlm7o897flwsp43l5p4hedx1189rbe7brzug7vv6m2bnzj5knmbb73l2lnqipgkp6moh72u7zdjx7rwgmess70qnd67tepd7n2gtl3haj49ergagekxl5847tgw87t91hxehyl6m8n6qkgrtswknxvbtj07w3tvkd73kufyjnxajt5jrnk3yoxb27v2j79t6ncfjubdn85jl3zsqm60zch98jhugt2n239u7pe0xaviamaf6xb2ght8zu3gbm8cym9v8tmrzwxnmfdvik0dbzonjm2m5vtnn7b7hjxf49syqr09ppdq2r14w1ywcncoo8sj76xzf2dt9bziy5oe6i6xmeox3vdctdu3m9rb3lcbh6ft8hhnggkqulesqcjdm3ldpev5kqskl9zc46mi92tq14gjkc4cbx3qgb9lk9z60ox9cuk1mo1wda47pkxf3ca6w6sfzhzctkvzhzv49g421tz8n52siehkjbub5j4xwv246d8t71rrjxu8qp3u29c17nztfbpqagspl6ia5d9kj4w4saztwh6en3bmzclh9i1zsgf8v44j6ioxtu3ffrjynmtdpp1z1lesaffuj993dlut76qtjxf8ev8ok91lp06328omz6wubm7bfx8qvz95wqars6ugfp4h7a0629yuor63qtrxm5vlx60cyrcwfllbp0y4xfh8lku9vbqm3qda3hj48zilak6kz4e1xgdyzdyyh6ur7e2129nj8mg2cvu6mrni3r8sc736o1dhyhyqpt62wn2eolrphfwxv9ijecrccc9t107yzv63ahukizp9qdwgw0s6rvj2kzwzkmh24vshigh8lty10e3cazewptli4dghbp13akaoxmjt0cj2vwh17ssp7s1hbr7z2dytoiw7ve6h6pe0avhgpn70htrmertw798hibnzeup8td4gisj4dloh5wh7h1jopw669as8ppkuj7xh08l4jiiuk3jr0l2zuge1t75s7cl0bfrq5iiukq',
                fileSchema: 'ek0gai6qa0eu0uyhub56i3jpsyu58pvlcaq8vu2my8bn566vqxjl11hinmg1gzoj36o6uv55c0lskgfn1owbj040y5iqhvil90jyclbc75m0f8l52x4hb9taj9bquzi9xpvius1vouyjb3wfb2b7c7fqlj5e0jw4kiwb3sbit2e9lkfp392dotpz04yam0pywrbfu8id2f4f3e8jwt9wuxlhrw3higca7kb043vswurkvqwqtmgeqwguw4l7e35bdgbyw6mps4cl0gnlqj25yye8764xll88celgu3s1oa0yhi5uxflkg3ayxuozw6xlqhxmcso13igw97yuov75egmkm0pxtdqsxvek3zs3uz20kpdkvs5225spb9xf4qtmnxrot1ivf55n1g3g18tql6ft5yu5g9pnu1qwnc1wiwdasnz4z6gl3t9v242gtsea3p94zjvm74r1ldgjzchmjhaps6i5vo6iwlfw7gwc38cvoqy1r3dhyuxcrln7u60w0lxyvtln9v8g8p8zovpst5yy3jsdwqf9dy958xdz2vze6z82ygbuxa0qhmoog35t4pke6hzlastvime0lz36qzx4jkay4ubfnjkxnvoqq2hzsq3jvmc9jgov9zw10v33uiizh4a5nq9k0l9ks3p7kj9wfkg3rctyridowvlxn6rihilnrznylwutv6qitt7cvuhqrw4i4rgvbv53ezlkiqdt0lmu6lns9xvgqf8r7h3m2l9cj0u5ycsacgtlnf9dl2idyrke4nzui674u6h5x8r5px59tq8bfuxh5hclph0ijbwxxbb2jb1vef37abdi233e4mmhttwgjrfer3ti16k632f1w1gxw85yj534nm0q8kqbjy4qxfsxhrxtmjj35nnhflwl4zsiekr61im8wdzbfxivx88lbtiswb0x8xeznapg3ic6jkiy9v7e4xkvdpgt06vt5y28s4y0e8gw8gyx84tkwa3kbrgwaxx1fcemsuidb8ziur5jmy9l9ofp',
                proxyHost: 'rfi0ehn8atkr48j0iojlnl3e4vs9h1fiwydhuzmo0hd58puwqmkvydejbfab',
                proxyPort: 3142968896,
                destination: 'gcl7r5gyoyrfjp7jndunpgw8peao72t3bpvxbunkst0r3jzuig34ubxumt00r6mgrrgfvfxsyvvwnh1xasc425n16jkmejwu077zpyk39f3xda2q6mh7z9h1iu4p3hvtwh2gzysejfsfphtc75tal7us16os5h59',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'oqvpqjsju6bt8hb3r21pvp9f82ltikyzjlknf259x90njmxx9y7p9ln4z4wj74z3jcab0v98yal9cw3lk403v00oqvwdudd5r7f7nskefifetg9ppjfgj06frxlqf1bfpdqibolsghtfox4px0yy978xihd0dqa4',
                responsibleUserAccountName: '4jm60mtjdeicja5r6f7u',
                lastChangeUserAccount: 'l1s4i2w0fvpc2r7js1ks',
                lastChangedAt: '2020-08-03 20:28:38',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'uvtqonf39gz829937enh8sok3bfvkoe64qoewlb2',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '2u1crbfqolsyl2f0u4lv',
                party: '2ovvzb5f1qjlq2a4whymk5cgy2z9lwm8nss2cvckyzb4cwi92aag9esxhwj6bz5pt46psft6i6x0ocdrnv921agaeagekzysoi5crysjqagy70sbl06118j7aaxspjspbm20oqtygtbr3gm76s16arro9zhr3uis',
                component: '96d78d8bnr0rkyjnlnvv6g93e3cmc0rfe14jzzgh7wflzgc72w239331nxieok263paexindfc8j13eje76w6vt51s49h4g6hxinr2b0t495h95glyewvemlm9bgxist2abhpgxbviryc199qcyr30gzq9eygk5m',
                name: 'n6q2ero7mfsttmtf0k4f1api3blvb9vwbtw95f44lndbj6nkm96p1mb2v8mg2431uhjwih6ood72kwf9g82j67er7wf4y605zd0kur43hp0ifcoynvif9e31q96riooet04h0a6i4oc30j2chybfgw1d9trnhsax',
                flowHash: 'x5l0rll7idl5nipxxhxuvu0tci69y5iyx4as7oqe',
                flowParty: '7gysao5467uvd19zspp5swhtbk19w5zhvjlbelg8p51j6vtkr7munu53a9b83k648ljfd767ls9a99tzq3oepn5vuzxw8e79a7n95atz252iwhqn56kwaq5qdmgpgzvx9i5829u2l4jqmbh52eu2bafwvxl2zzlg',
                flowComponent: 'h880cgqkfzhakn6bhcywz9yzg2sxhx9dvwbd7nv51wdb5xw14aucikw1844bne4jfv4zms3x4noqrzm9ze0gwu8ythehwqh8ixfbr3pd35mvq54dtxqjenghahuy8e6rxl1svprtza8y6rqho40kpl36x4lr9ywl',
                flowInterfaceName: '2dv7f4t8in4w7uf7zwgs1b9i8jtqjzdgfg3zd8z1lnntuqvm9isumtunf3uc4cs863hzexa3ek2ej17hat1qoyavajin933n5k0k3qu5fpsc73yt51i7zblnxd253kqax8caq796dc43e3adcrlxpe58vafq0hmi',
                flowInterfaceNamespace: 'grsg32ikpz00li6blpm6al63z4g5kashwu92cw7xckeapya6nmpgkp1jy87vdm2jqd4n5qrzs8x5tqk3dki0pml4m8qnrgdcket13wak3i32it0c1qlgah9kb5lt5gs8mm9aicllwxzy688fzpybb57pnqgnua9m',
                version: 'zw2fi917s5pj9cy5s01t',
                adapterType: '4v57w7jyp67ax843nfeef1iq0bubfmkyp0egepo6bpgmsry4dildeiv5ddza',
                direction: 'SENDER',
                transportProtocol: 'uaufne7h8ro2r1cskz244c44pqk62d8jjj6indwmocprq04n1h123xtskzvf',
                messageProtocol: 'dd1z3g437q5ahepmpw5br86gqby3p3d75cyv7kmnm9gcpdpcbkcduvgwqm8i',
                adapterEngineName: '45eblvh4h43l7mv1eujerd0my7cnhnwhnfu0ysxkzypaol8tdw77h4fxsa3vxgcjc5978m2cgl0ckh4a54d8wmsh5yncq1f9whz6eeawuu1n18it82dn0p0l92gdev81wqlfx9v1f3a7r69q1qmey8q530z8ui6y',
                url: '2mouvj6p09o9jzu2m7do6hu6tsyyviw34xwzy4741r37o9wjul9brfdh0x3lw8k1c2f09nn83twu8cyto0x9xb65gx0on4rc7y0tlji8rsuc4zyviprcx3ym8fu8tehwgjxp37flmtpwac2961hex7xf28wtpb7lnoqtgdnezbkyog9l4u08r8798im7y23ioui9nvvpin8wfd68ivr44skx2fqwuboenad9ggv5bzuyq58v8kgic97j8wipdstnj5ab7ybv2uvnifg2cdpe1b5eqj9o632om2l3cpura2gq1f8j02k6x3077xtoe4ef',
                username: 'jk1t5tsza3ut3l5umi2q8sn973ta8s5xj10nl3ah43z9cihbkho8dgqwvqpd',
                remoteHost: 'xogigd3nd44puj3bknd894uwpcwleewcigp1luv8kunwtjekbw0g0pqlsyq0uzu7vvqb7rx5q29vtaeoa5e11ubfh94dejwtqttlb6z79a7ixt9kebl522fi0yflkqpxo908dcqv4ub31uc4lkbmpf5r7au9qroq',
                remotePort: 4097987897,
                directory: 'mey2lhyjig7t5dszrfatwlya2y4j7l6e6mhbbcuqddcq72idghrdpkzc16a4xouvpfhxr0rjlezn0t4crepxevf5luh9uom1oq5ex1fdzplfmxcahsmjdxypnu4lrkppfhf0h3dh47t6tymekhyg5jo6rhuulwvp04f05lkgea3d6xbsuphhj9dia4sqjodm9vnyzu56p8lw5pzwumm8kxzdz4c597e5l3mknlg6u04uhxrhd06z0yb1s31xvphxfzrs7a6vda69yw2zu3npv82q9a3b9xpzprqilicyn9fyu15v988in254kmjtqdg8hvfjji3u8w1vvo9alkx8jh3s5u7qc485biyx6pcyr5b5yj0izsgixezzcihy3a3ekqabmsueic9w5eywp7xxt6pvsl8gkcu1q24kn9f5mun3j2sy6njsoo05dbvneyh30cp8hl2c0vkuf3dh06q65g2yczugftkruafec0c522xu6f8j36xh7f9lbgx9z1ctp78npgk0oa751b77lqcsruiky5qorz7p8lzamcwcuwhojdic7pvn3im1oofvbxhoi11fhuoz1x1n7ubqimhwp70ad4zrf3fo7hf9zy40czdh1pktz7j1qzd5mp0oaedqo5txxporc5vt2l302pr26bqjrglyb707cqzv1ikiqrt7s7r6q81tvbglfu7bvey7exsrtxyg04quobzfwhcjsyxdbh8xang55hwubo0w08us87nxxtmmojr314wj600o80wwhp698wroppk4gkbos5lmyl2bxkvyzsrm9kiazbycdeff73chk1polsor90atz5xrypsx44xm8ud5tu3wi0p42gpyv2wgjsbpg41ni18uuvr940gl9yyxtd34r4pa11vm1eik18gcx54m6ojs4x4qgkid1982zs3ghu36z0kgh4yfiijyzoes5jkqp5y00gxpxgcif1xazbhchuofcu39aueiif5rcc90w4m94omj6e3djiwgan5fsqfl64wb',
                fileSchema: 'gsgkbypg1yjdzejesbeps51kocon24aiqvi2512sbxf4uaeddyt3l324hx938ctmikyetx2jum5jyilt1wvxy997w43sn296yjhh7ko90dken9kqocda8ykoutcjh9587npyzfug6hxp1wflbn1to1h3ec7v5k5mh3ot167vrq8z8co4k7ys6w6u3dta3kzq6ndwf85gsvyw4ifqo49lzhor41an9lx3rznss0azyxffyokmsifwtr3ejel4hzru7a59ash85lz6hgr4vswps9xmrnpd7vp6rcl460v9rcvn14worlvo425uclxwl189lbxd69o2tmxnonrlgkbdq667tui5fr5gyrzwj3qssm24hlq6vx7cohldqfs2lt60dgc2e5s0gr4keikkxw0iked04frhxdexd1v3pw2s4gmiio90j6ouoiljbeg70ixhhis6nam7p9x3zzpqof0erq77550ul4k6b3u2d9hk59e3jtr1kqeezqw9h3zopbgg0i2kk6911h8gk35nhtdfmac4ggcycevm2tq9qs1d8ruue4sc8cjspueqjw0z9czdmhg1dxtwopmfbw84u0pdu7v31w4y2c86z9hqx72o9il04e3whp4zqcm3hysk54ysavlmn8ry13od0kc6hk4oiv2b7jq7u81oopiem5mcf3qei2a97s0ut5rok9uu7o0rpxpi0iwgq35evlb4rvj5dppyt8zu790w0s0pgq0omfm0nls0a21ezp8ppr1jybs4vtu34t846ifozotwrqy9k40cnzvdoigk1kktyqh0pvuza0u104a5jhgfrn92f7ty6phvedee1gwjmzn7ie9zsrdew8v662ul3ff96olb6ggs77vjystvdzf3gfn4a28imrej6zipugbzqgnmreae9kiumrmjg5esweeonxi9unli6h3wx1j195quij7yuub37dqbq76dekp97vbpw80n9hwdgc4sngp9ghqtupx4a6rk105pofyd9geldyei2gqn',
                proxyHost: '4y00azjuksj4n6vx50qpub51lzyvurmxw3315thhchlflmgg1tabmfblv2ch',
                proxyPort: 3924753758,
                destination: 'lqofwo0ypl06dsjj4jwhz3wzfpaowacwv7a36srhmbnef21oehy2v3j0h3apknlli17vtu0g1kg7y766ftx1kjlsm20yaky8f1unzlk6ruar7cgazsxu9mj0dkfxl89ynvbzk63xuy2y7bjj113a0cdznz2ianod',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ul79jmur5m2henqvwr8o4fqqceofn0x1jjant7dcxc4j0i2etv20tee9bhzczrw82539sbynwpa3igztfx8q854mllylaxrbmgxte4jb9wdi9fbqp8s8ep0yd1o64g4vg4md2l72uo9qpdqsh461d9or3nodf3y5',
                responsibleUserAccountName: 'xypdq6nx45j1onaru8im',
                lastChangeUserAccount: '0sd2ojd1em0rusos8a3i',
                lastChangedAt: '2020-08-04 13:29:03',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'akm4xqojwak5hmyuvbwwhe822xxi3iqw44u8ul3m',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'gg7kjw7pwq8y1aiunsr2mxvjdv43exvnxpub52ed6otq0nfwc3',
                systemId: null,
                systemName: 'az4v7rlx78o7hf1kw2nu',
                party: 'cxe6n9uvmp0d47rx1c1sovzjay5bjsg8vzccckldrcgyvsvn9txlxmxkdet7aug8aqpye40m7cofowoqgiuprgl2khcms7amzf0xkva8933bkz45ur26e91r7rtwz2uet0lhm53bjt2lqpvgwc55ays7gezzp66o',
                component: 'cfvbra2fpwy898i7m27tm1xyo30y5ephv9vf55pw4drf3dqb18wgraoltxjgxay9ss9rjulo7lyrq4bikekdgtthkrrps59rqpwmli5dw2gi6gg2mw1yvgo1rfsyeh84lhyq5ip6hv0442dc0qk1bpbuextri2zn',
                name: 'fu6ohpf3uq1a436zynivh7euah2weksbn5qejdxkczes65v68rhwbrv7edekbnbae5gcuh4j78udlqt43hdwt1v21si74y5fgy1th5mst1h6zm4266a77wvqi8cci4rh4ib69pi68sdf682oaljaxni1fiigq1qj',
                flowHash: '4jqlplxmob6o6nc79pvkvo0xik6bp2e3ltf434re',
                flowParty: '6muugy3k1cp1n1retcs3nnzerts4qcttasqvnr7bqt1unlq457oqddovzpl14fgfmcyy4pjch1bm7td0ucxkwaductbydvyzslbzcwj94msjxqeeongxwypbjampjz468spp3h3a1r4o1bm7qwwozc8800895r98',
                flowComponent: '62p6cl7q7pww8jye5m5ki61sv3iejw1othn2he6oabpocb517azb87r5q7n3yfxlwzhy5jf5js7gmfg5wq4jrxiun4kndpmdtvay29gs0fxuiln7drf2moufe4hv8iq9jluuv93qjnph0nj2xlxojdmw3uojueu3',
                flowInterfaceName: '3e6nc023q0yo84vnj6s9lz9p1qak8ujeusl8td08k1slxvawv40bmst8nzyofs7756bnkr6tm2x10jebd3pwggyxtth5vqjm5ivbzp9g8kgy944ci6qy04bpakwvl17b3rrn72s7w6yjdf76tg1mks7h4t96a4x5',
                flowInterfaceNamespace: '8ey9xll2x16ap24e9u5l3qymci85buuf1zwwzo5n6ibnv65szm2u0xe823vmui1pc0jo48s91aaaqj64cslzwjkywbls1al7n26ghh3hqokx0ordj3sui070lk671t6wwhzr89j8nksjbzs0hy9tbowy09cca9r0',
                version: '2guocz3u3fd5hge20ueq',
                adapterType: 'd2zlbffzk0ehqmj4ku9qzuvqirfq6swj1xnkxmyuoai9k2ferjj7jni3iypb',
                direction: 'SENDER',
                transportProtocol: 'hmg3u0pkepdlfks04uyre9obbpjifuyhrgjfszjf5fl2e0n5sywzffzvz877',
                messageProtocol: 'cmyy1zp8cvf0cpnfy5oooo0mdigsdiwfk055btni4x381oga43b1jgh4pubz',
                adapterEngineName: '7rhz7iob1r13u8gphq925kx9vv0vdvwbtokcp5unacfdqq26dfw98yc2ctk2vjcrs0bnpebfrb7izglseoeokadffphhgcsd2f608cwrpara2r8w3c6cchsnb09q8nji4bfjlvc2d9kivt3g3l0if69xe6xntbe1',
                url: '61jxsv5zdcy63qdu8l9gcqznzbmr7xrkc8ie7dlqxel6q2h8g9zc0er3ts8nil2m351i1zcy8h4je2i7b7v9kuo22bf2ph7qq5ixe9fssm41rmbbvf6vshmitx9uqe3fgnlpepz7bde979q6kqldi64ngt7pvjeqjm95rvnvdbbqg7k9f1cxd04ycq081yg7s3tw3sob4gylua43claw3zoh431nmmoz87x9iwr15tei9gm9bzqodi0yxy381c10368i3vh9qhaxl309cpyvjckxfj5kn3oewvzr071d4m9cvtckv1ix0qcf8ps21kan',
                username: '77yixs48rqtjog4ezwq7nzjf2nhl8n7tn6uinhjst162x0m48y89xfnyfyj9',
                remoteHost: 'h25rt7tcu2dh7z9ydjnapezwy98s4l2g46oj8mkfensl5ldcb7tm09ir5omks8i19da9vvxcjl9mrtg4g6406hrsb5quutuutplchtdgr8bk6w21acllalcbkiws30wvw7pshx922w4fune5q907enf6rzmf55rw',
                remotePort: 4958829273,
                directory: 'vvpmsb4ugum7rjvfkbrx3d0vhargrtqvmujr1drs9wx1njflv9odf8ro3hf986rin1a0mzmb29c9k5nj4t93gqr0k37h1w9m0o8arel6pymcjs4hrkyrn9d58cs2zqxmb565ehyemxqu0zq5rlwd32ol7u59da1lihyy5n5iq6unh5d2hkxtulhmpiyv3fj57echsaman4h8q1buyti00ndmx1s8hp0fh1iw12l51nv23ujlsvkzopq2hgse1hpigc1n76bush0fyv0dk45rkk7xiqcytbis1l8myny04zyltj2dqykerghhuxqusdq75rel65ejehxbkpj6lgbwvq5h4n3j52aivucts4k6nyljll5wicz4qv5br35mphayhvhxqs65m23svjaivz5bwb26vb1r6xks52a696y34bghs9rklzt806kus6jp0393ywntoie1xsvvbgshbolyfllhaju8ey7y1678415bmq76jwrjbpkdl6vwo1qft6ixtrdjx2qzo5kzs2fo27msbkwyp88bv9lm8i4st7p5q2gs8eqklk1sj3an5c205ic6thez796hiwmkuor8oa656onz543e9pjuepyymgfc54qt7mo9yf1bl08dkguijgaggc06fo2xk0fbhda3ort5fbrwydb24rl7cwyxj6g88eeduzjdweth0pmcwdwrqajqbkv60dpdd4fp1zajqsgce07zsqh37its1p9j65u32gvaj8f8efdoieidvafs1vq6lsv0430w8q3c8zwoysmcuya9rez9kvln139xypdzrqecvm0q1aerh6qrsjmwo8nir7m7rtzp5fhk8b69j3w2h0nl43ijdq138kfz3thp6latpgkk0nlxefrkoah4oiqho6sdqsw5r8wz9utfm10weqi11l69bnp1age1ap5zkjh54dcdx7jhbsl9g9vue5hbxllxlyrku8zm684pt4jo671qyeobn96drs9274kwzn5zxowm8f2s8dn8d6xyp8iw',
                fileSchema: 'yaso85tw9mg8zo38s5351my8ge5rvpvhs25ocbocebvssu2isno0pdi37az5092t00kdu69kvkd1gycilk89twvfo2zje5wmg8kymkx6ezb4rckuocbtip2pfdjzkorj2a6g5xy28wda2mrxgzyjopr8jvlul3h0638rk6y5tncqloiw0tja03nnm60cl4svtwkwor3mwu7pvhufjujt9yxz1m1j3z93osp19tlccklrj7kx5krqw0ngt3qgr11zfw0t63rgt78he5pzhqi4oofu6llw1s6334z2vkkkz2idr51gqw876otqc6dx9cadz5j9rqiuthwdihx1qalzwnhrq7wmxzumoxhu7v1u1afbqzgi8tyfchnk9shns2mb85wjm9conp3h0q1nx3jktxf0dm0lsnvg7u5fv6jbs1i8vfzo5jmvfeg53r0hesmf6ke5qt2nsb4llav6ye5z50mv0nvweahty241kmebwzo2f41pla8k7yt89365aq50m7fwd2fegb5djkeik0qnx02nmz4sbbpdp7a4zzgbffyv158aff132gx2wvxmeagiqnujc9szo4vl0lv5amwzqolb7wyrlo4f6pnysqamx49hhzbijk76wh53h892wrzfydip5pxyq1wc3odzg2c3v7hh4hfc03a444s47cvxf2tzcudgrd93azpzt7uigbyiylnpkgpe98y1krlwtc24a64mrxg7jmy7r5103l7fimjkj27p8bjyuqszcknhcyiflnv85l2blkco4jgjkiv7baqm1s0ojc0pvq15amw38s2pah97sfnxpey8hq3ewktbod91cx2nb5lzg042sld67wkejs9bxm4sm6ghh1hu4o6q0l550qk5lpjv5ka37y60n2v66nrrskid9ttsr281auq0a4d1x6t0vqdkhbmhovja33931dzpnjst93t38t348j1l92o1etzvlfgfdejckx2j6nqvmhw1tljc1gwliqbove52pqemz006f1qe0u02',
                proxyHost: 'oaun5l1gylivealdx7fwbtsgqbr29fppdqwheosnio88fjbm11h07af1itsm',
                proxyPort: 3147221003,
                destination: '6hw0jl6qxxsl8lf7ba24cvvd11fbo2w964cgdxbb4nu35tgptqco15gwiag3g0ok36u5bwn975vjs2e059hwhpb10vrdj2ldeo2x38zqd7d9d90d77eiqktqdp2is91lk7jghvm9xt1uvzgwjpq4j7ztern84dug',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '73kcrjol153nrugyo490gdlttahyu1e66imlph2jzrzzpxvk5j3zyrceqdt73jerb6ayllgjs6uq75ymfu3xoy9ki3e61swrwaw1e8emn8so7hm5iwwuozjzpd7z0v35mvmotezat6a8rkdghvlf11oipiqmekey',
                responsibleUserAccountName: '11manlqjz6n4l7lg2g5s',
                lastChangeUserAccount: 'xyzkijsyx9ax4zyq13co',
                lastChangedAt: '2020-08-03 15:09:07',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '85669eb9lvvnwo58nq6r3h0hthcgpzhugb70yyvu',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'r0hs48fvxypsj7qdt8f2hzf3bahrymflb8gcpcx988yhiq9xuh',
                
                systemName: '9t7af82f9ge1a6owhsq6',
                party: 'wsek69mwgts43nkavejw7uts142n6cqc9j5omgws0hwv648rnxrs1fmgcyepyrt66r5btcdsw9c2nyrxj1b71fuuq8gf468o95t4a59e6f2yo4f3yp2udptbbpkiyx8p8jxss2amw4ps00pefalt49lr2az3e6ln',
                component: 'mc75jhy7cdsg7x5cywgk3ubcb2bm5gi8ay78zha3vjrwvx4gfzcz0ruj15dgzq3nvrbh6fii04wmbj7lgd9fyj27tn4uzjheyoosljxbre5a6961yj1dqdv0g5sk7wdtqrpao3wnyqr73y8uck53y91xv0o4bekr',
                name: 'cl1lqrs8jfpdcd1issek8fs7i6uw9cgvj9vt5z99yj9f7frzzuc1tgb3475ok8swvy4yflosqbt5z168z41anfk58mm7tfqrwauovxh2iuxp12rs1keggvbxea9hvwkkfuyjzxy1asixltz6d901t6qao4uz22gl',
                flowHash: 'ybxmc60dq6cdex9ka5liqwb1l6ai4rvm2xdev3aj',
                flowParty: 'p0y9sqs7hw3j05eb1jz29dwgn1n4fkumvlzzc7go34x1ubh2s1uodbhwm4xrh1cpolcchnzs8x7zwhy4wjoew0ryhta4ar61qbegmxr0mfhsfc6znva94vjv2splmvhv7dc2nk9hxr6o3ag9wind4xqyrea2gsz6',
                flowComponent: '5xzg18ui4critw9k6j5j1rgl3gwlpab6md750el8qfl366rcmzrcgwfhzvnan2ewktpfe3kqfjnqe3d38ksgcv0ylhwkzg23oocamnol7gw1nn3huns8zxhuchoa11eajzi9s5wqgvx0ydbzym6zjkn60mt0gk4q',
                flowInterfaceName: 'oe7swq6p0gx5eaqbuppt1g0e83uozkbenmb7tkwj2syggcqvuw6p8d5aidz3939cbe0ngyud8lds7jftx7vo7qds7x1lzdc9ktvu7zorwdmirvu0079zudkdgb4a7a1wdhsbag4r9cldalsgefr8dmyh4s0fufrl',
                flowInterfaceNamespace: '5kmkp6v09ws21gztqs229fuo6immwywwilb4q13zpvu2052omz9s1kkabcb915wgw7af9a7uvzdp9pi3ctz721c5txlgoty6wvamgm05l687834hiiu2vzv23fwb18hpcxrylw3qkre4w5h1r0tyjdj94y2qspyq',
                version: 'o6lp80ocu90dxy1l3j52',
                adapterType: '5eesy3x4opotqy689425xxn5e9nhuh4vpg56zgja3n0l17dy39l8hg7au8xu',
                direction: 'SENDER',
                transportProtocol: 'rrqpe113zs5xxvfcvd78j2bmj0fzbrgv7mbz6z6sio6daoyutvdf8wovwlwx',
                messageProtocol: 'yy8ibpsz7cs7000usqvzer3mpism2cv6cts6u07vrlb1wmp0pg09ly09amaz',
                adapterEngineName: 'rdb7jlbugaxgcdyzd4j2dkksnf3ntlivy6o4rlitp1anb9vvupwbfjis4vxxu2wmbg3foubq5g85m05ljmxzljv93r0dqy3ozmxikubhyapv08mbsubq54d3grdtwt4ijepjbsfzj8fc38axuqwddtq6479m6qf3',
                url: 'ruz5zhz0aydu5zfxd274c9kpb38eljfddmzy2lictpfruxhagfn3szk0l729ne5l0t02y35xjinh9pdwbsi45rcd21jvs2cdywmd20yx48izxpeacngz1xqehv22j3sakw38k2n61uy1tfkrfwr6rr057mdigtr1ouyhhe2zcfcu9qjpgm4o5ferk44v78rspjuq96c7blofrg0pvg0fyc0f6x1v51rw0ojpnzcjtmmpqgna0bis30xyng6mikja4nhmm291s4qppiedmigz88akxsctyg1un9lt65y4ls84ufgnj5o7tjleywjrv3vf',
                username: 'dzw0wacelatuqf3dvm883emjw8oyqulhy86ir0yww9qkz2b1pgp9mnnrqqy0',
                remoteHost: 'zxebf2nbpvncm88ngf1u1lljn3hfb2ddj5pjd2c2dqdn5bx8m2sx0mab5eovtm0k0fuuaqdxgbbwxox5utl3oabax6nidctd3dw8mkzvqhdxf0vpdf4d1t0szhutp5efoyeyf46ac6ugubcwchqmt54l8wkm34yl',
                remotePort: 9770368201,
                directory: 'fm1n9zkkjb6zxb8h6txp412zfcxrpk4pwfan1ebaxkkq8od2c8y46v5v1a11e67dnsz70odf7k6fgb90amfbrat305k858d8xbu2xxgsyysq7x8oogifmpv7tvq08qqxxluhgoyp6p08kwfxeiu0js1do7ar3k6asxuyo5j6s7wb7ef4ai892sg826hrg3wgsiudvyy05tmy2n9nh1aoa9gzhhosdcirmoltmq5a4qdnzz0j1w37x7qhve0w02lhot9e7fwzm1npsph8zyqxigxfwums8nlopr2pkucvi7g9z2n3w41ky8ymkowu945ixlhr323xoemq9smekvpa43whm9iw3tc9dh180ym7accstnlbivqz5ysyr8soax0x6ji9hck4wqpinq0ufjvljaq9z1ze2wu7p3diwu32l0fkcyrry5zkzqmkuvm095in425ds4mdlq5fthhcjyokfciwpmalkjp39zph7fbpvwjnumd9mvsk338l1j4uyo065r07xm2yz6dkg1bqwtu95w3s3jgbe2ehh3sdqdjuhjrq5n46gpjhduonh6oawsn2az0l66q25vtg3xizk8rpsyal58mmxlfjooi718spy9bhs78txn3weimgv591x3zb0h6t5mpxpdmu3pgtmwuyud46qovll9k9ss5xfmufg1dr63yz80dhbuxi0ys0cp0d0qy63sv51zesggi0rq6ax86mve1r818vk1uu39j3d0wh3gpq2r5tekjv7jqb5lesq7mm1zh8zygovmrcgx0aty2q3o9vbgbnwjvpi6tlw30hf8p0spesn7un9jg26n0y84crz22mbjcgbfb90w5zj8vc94jy0fahtb0uateeqoffhiqr90qgr6c7ar57z8239x2ljc14hvxz39ytmglrh2clavaqehj32tufny2uqpgu71z39mqiwjifarkctn9mgqb1ioeo8i1qa4dox5dzxkzjalufgsfzlcvno274bp0zvc4ljnhbe28z4tsmauez',
                fileSchema: 'nyvdpzqre2bvmq3xoz8pfve5d1gtykz75lofgaosarkwjghp9e0vflaj2d7j462y7n4d41rtuj1ee1k2x9s5y5tqbzxv5ckur8okj28cjz3qwgaiqqdlljkxvmf0zm3w9j408mre9caamvujehrvxoba2l7k1yl91cbodyxrc3q5cjlk5lux8zg0c4s55w6o0p8cioo6rd3itl78c225t2u8pxlk5o87j8q6phrdnh5np1biczg3887mqhcs6i2jlb2cu53z0tsihux9czbh5257s44aib7oexxfuye6b54wgvvfocso16rdc0ppgxqimr04jqtx3h4a2l4fiypvl5qhvxi0u2sfrsc84v7dc0yzgdqdq9eb6myqde5zt5v9ps746aq5jo005qwxqqnmyufwj3numw6jmywneo3argnrxoybi3wh99ihepwu6bkecs08l3ziueuk521o5orl6l7pj29awdm96rympya15ocq6395zj2hm0b0ocnqltomm2kuwtgdwcf7e2nus27ejwsbr8irf0prbzb0lic7zl8kikl3e8ygv3qag4w8rlk31to33he7tgcyere43w6jh6uqcl9lblth2e24l0dko7p57wm9zpoxmzh4zl6ycgyhjwixq7j7cuu2lb753lwadhe49rsn4q2ncpgbmz634tenjk0yvznjat6bel38p8kdw4ztjeqtkyj8gnfsxnf32pp54dx6ul69rx449bifmd0npu8xgvnv70sj70rw90ko8z8pg78zizuvdtbm4tkeqfwu9qqqvw0h3mz14jnfe08kwkc40en6jc8qct5fqhl72jfdbd9ttx2x7gfpm6yds78eigquxa2odbxzfii7cthnv34kn216s0b1sltgv9klssm06w9teigturkg3t85y26mz944kjezi5fdkgspmc4f2wk4cvqvzktgeyyrfwjijhyi7oa5zw0k5dlxqw3sjjrc56d296bkvjrp65s9qz8mrogexd7mtakbmupyna8i',
                proxyHost: 'qk9xszg1kjylf1e4k2a2d8lpgqiwfgcwr1bthukga6nsxooz1vvxx2nckb3b',
                proxyPort: 6708489732,
                destination: '4jh3oexnwt9vw8wyuzv95nb21zvdd8kvebmahc12ndmrdbvt6daf1yivi5krkv6guj5b6ho2hqgbo0g5aqlus55d8dwwiypbkixb10x3ko72yi6hgdi8lo44ke5ubd4vae2ue5qqs002y2rpvhtkyqce55sntvzt',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6cwz7ngo1g6kiw4yaztnr1hodyldvpa8jfixffve9fe11l1vema9lqm3fvpwk51bgpfy3lqfj2pns83fmlxjwlszsxbdkpi9xvkgi74lemcdo28c7z3nyig63fbs60zlbt0bm2ywh8x8rgkt9l23oxgofmunimch',
                responsibleUserAccountName: 't2s7nogg2nfzwe16e7fx',
                lastChangeUserAccount: 'eg7a4hhzlvoha1yty42h',
                lastChangedAt: '2020-08-03 16:44:12',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '4r3voqmrvg2colwafd67ekxmk6rjhrjjqxllg4b0',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'a6kms48fzruv5fuo3p08yp3hi9yp5rwzx16molu6a3zitmtj5v',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: null,
                party: 'iebr3troq3adwh7ggxo9fah6mpa5bcdezawtamxhib110m9vurxf0nby8cb4q0sjumn36vc3nbjemauw54jpc5op56yl1387tgxo8v8vih003paoywhhak9h7cx4vp7iuljz0yb2jpc2whn652gvj7okt44o1g4a',
                component: 'lz93lql5nl6wnnnvag5foaw3qgwl0uigzc5o1lj19wsydk11i9esuekq226deh3nasymc7927fdag4fjtuaw60uif8mpxaj2ceke0fqe12fvbce4r89omhwh9b9g8zk5oo0f88kmt0r3gqz4o009kdreplim7yua',
                name: '8la1yj1h5pz5iwl3p9mlt26zuu61bq9tn1plqjsz4jduk7fwvgws5qjvbkw9yyb0wuuvbt2u61jki3mtpg7vfav65zdbta7vgqmms8yifvok46x8kiya7hrr737jr9alu7v5i3tqe7ed1bni4xi0xd03yne0zsgt',
                flowHash: 'r4ehwdeftxy1x8oflbw0jkqb1fgtpv3p595hp85l',
                flowParty: 'beu9j0ci9uwm3tu9luk9qtgjaw65pzjxslgbauxfkp6wndhfgdd05ewalrmk0mn2pgmgjzrjmi5vvhuzs3avzudjhdx6lkyxgd8u0qyj04yth62kvsa5m4mgvapyifihmhrughwjjjic2bledql8278892yg1npg',
                flowComponent: '754hnoqrg0ay7r6jhfertszclgedlld6xw5fycrxtb5573hxd09e77xs7s4q6twt6lxfj26zuklwiob2uu3p91c6sabftti5mf962tl12qq9dz0mumbdnesj72xm289pmjxlrk5xwy0245p402c337najhchwql6',
                flowInterfaceName: 'pbv8tsoaemx6gvfw4okiw7qs59serpx5f51vxa4iwemx2z8a8wjkuo3sebob1nx7985rfmdhcy7np06j1hnm01r6izkjcubakiy6z05gb3u0h9avg40b3g37lpd52lm8uddzksnjf1ljl1lvpaehfstvb31m78em',
                flowInterfaceNamespace: 'kmrf3lxr3jfepb2luhl7rhr9txtvccaclsxzs7pl4uqqkxnddxtgsh3k3vkdb8jqvxavyq3jxlxyabrcalpjhseg7fi3unxvsr9v54n78xnhkzzk6s645mx5t4jhxk0dbqa6wp357a8qvnm6ppo8ugfg2a8w0tns',
                version: 'zysui7nulctndrd2lvj4',
                adapterType: 'zz2axumskjg3mkyyxojve6vierehnmb2nsg7a6fcj6swn04su3zcn2xw837w',
                direction: 'SENDER',
                transportProtocol: 'b7gc0ir31frksgqw578wqq6b16nqdubzfjvomfaayc9s2oixqy4xvxrgo414',
                messageProtocol: 'wudfn5yek7e8n018qr5pqki7bedfa4n27nuc4ddgg114ihngemv7ya83kk45',
                adapterEngineName: '79gq6c3f0ey2ttx422utfyx144fw2lxxeieecp8m2wemk6ecveslro50dko7m0rziz5u2a6fum5u31jv8d7knotu0f6osruqwwpek4xmgpw4wxe84pf7ul4c06qpi8swgqa1a0nurr9u57t7v979jex1jeozde9y',
                url: '51fgqdvbm82zfxh7fiwk9cq81dqtmw0rueffvtia0midhyd5nkndgajj4m4u1efgk2khy5b7vwpwo25xmvsra2vha2iudun3ffi8wobnjw3u9p3f3ro8vrcu9kni3ih8gu1k9ouo6niq0m4m2mv3q588fidqtpdlmr9gz6pr89i1dzh4g5u15hwxcivy1ixrsuv9z5ymo9n2ed1nr1nr5mcn4xz5o2sgxh4tudbtcc93mxvyhjligpetp3zrpekuszfrdl4vcdkwzl31ul7hdk8b9h8b8owvj3kzx4171j9vcxhc9vtneb5vjf6ot60k',
                username: 'g1gm59t6t9orcaviqj3fd9uiw1plhsierihp5xmalpjyz09mbxvpjztmqjg3',
                remoteHost: 'theeim4pox3q25g7us5y4vevydr7hj2ly5hjbn9cx5cvhfozdmb8027bvrirbx7lsj2pz6zv3rm00qn4u315bqps3xvh7y8rtha6qsg55g8b7f6tlay9h77130lctikyp9dogzikdgc8v4h7l6quekfnecjb0ftq',
                remotePort: 4269050226,
                directory: 'y8urzckxg413scrqjzpm05zxk8i63yo1hbt7l8gv5lu50u6poe896de33jre6dg5z3kkwmfq1kmfwkdulua7vxo2tuczune3028ayl3xbda5befljmqc3qr0c1yxp27kbyekx6td2crflwbjz2tnn86mgmzffvr2i6xznf86q90fvhbm5csefwbuydvq9qzfsmrs79su1ws5gwyvmppnjxd40dwhpbzn1zx4sk4ro2znmy6sf5d4kw0jm832c2ebwj7skkfzk3uemyust12wa5yabqiel140dwj13dfgbieck5wcuizmupkza3rybkn6cy1365h7fe2tvy2c42tdmlhww3p2eqm2zg9qw1m0geh8zxyvqnzmv6ryftsubvsbr1ccm8rmtqc2ffrvurjulzj2yt9jn9en679caxafhq05maqjnpptksiavefg8dkaa1wnu0v2wwfca0qitahzoq34fpu5yqvslmnk1b34fkr5wrv432e0004qo6mx8wxm7mdwxn1s3eptv1kgqb7ly2a1ssm6b6h2nvyrnc9unllkvn928iivb19t7a22t453it4b81unevi85ag16hxp4mendxsgr5zki444w8n47xf7qw4pmfl738zchvq0vlplchqi56tc2ueldhxxndj2tf2lpvwepvkx61tifdjikqmeixfo39lasgt7j4vjudrmu94vpauvo4jmy3x72hh2bxzntrk31tm7gsz8ujexj977yanfp22nmaox2dch0g7ysynxx7bohgvx26gl4bh8spu6qj97ou7xgx9f4aqu8zyievigstlocfxmoglz1pok3dzfvqpn9owqtjzmo8gld1i9q2e8kj1sr9nu5qd1oqaeg0n0hxin0o2n5sfxdswlmmo4j4hdmzos82qww0ihe75e9i393rqzfkx0ojxor4yupzdc3x8dia6r565ptywj6lufmkoqdntvqilslgzjv2fo8ff5j0kq9k5pxsagvak4mbuhtab151m1nki7vrz6',
                fileSchema: 'djkonas4z3qcq93xg8136e3hd0k3cab49m5ft9u4glygt4gmgdwgwctt3mlm98la2m07em85phaupan5l7pehrdnukmwaszdh3gf3405q6h6hohxxfe3q82p0xke7jm7a3bamtpvz3rypnedh8it8b9trel8dcay8v4c6agbnmlgr9pxzzx2pdputqajwioo6h8pxgybwi3vbgevzoyfsh9osyfjijq9pueytbh8x1qkv06ifyvu874iiorqae8r54y45jb59l8979woh5zpce6csetr316r6u7cavtgdmk6t77tb6s9yukdybuid6rp0bbzb6h3n7fedfpj1actjo82n4yduufi3t5od604bfpoizs07tcpxev7hxpv1h85q1dj7oeegy40ot0lhigfb7e3uc04ucsdajb34evfmxfm0ne39as9buphc80pyyld0e9qeljpziv3yios6d77untnymfg18thzui9200mpoq02lk8jfopeqtvt7xcg4cd4w600zyx0hxu7p5tjwd64h45tuc5y9gkml2zsew785zkr0213pb5i7v6xd6w0qn86vctnca9posp2ii8xz04mfrbhgzgw89rhl1lz1gbwbjnk9z8mm1z6h8w7d8lo54jw66mzt2cbnlp5lxzaqymajtcaw1ua7hhkl9uyliip4eba7v7me0u8uh438t3m817dtnz3j370spz8fqzte9rkssx5yzlcf387uvjjuhw0vz0lngsf922wxtxs14tbiafi2g0mk5ppg24to6q2psx9vy3tbszi1cjkd3jof5v4vvnnqanreziji01ucul7vtagjdvbukwj5a9gosx7ci3tp159vt6otbjla9pg38nkznrlmq3bj6w89rver3l5akrfceknd06u1qebb0v7rs8oy2xpurxckbecszpspcjdqqou7rbj2tt8pd09b5vapqyfgre87hquli0o2lc30fnp3p104w97lh8je20d0q5w0j6ulpmdnscszjocfqbejwv',
                proxyHost: '81i8rqc7lv0g7prnu2ct626vid2qe6ahx2mmu7va3ur97dgu88c4bj8w6nn4',
                proxyPort: 6474483427,
                destination: 'flssk2glcuea9plh9p83m9y9rcxa2deeoje9ynd2ssac8sc25nc880lbewn4lrg7rpq9bzuhhs90p16srv1sija0gc3nrbbvvmo8f6oemv7kolvlogj24c0u6fogac8ghp44j0g72pxkuepxs35h2iwhw247br94',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2ueyjeg29bap3t5n9bntru2h8uwtdybbh27pp1yj1mmpd4szybnqcc42mvko88gnnznmqegbig54srh2c8hr468060ca2oiyw66tcbr0hwc9bfib6ufdz3h897jw7dv9yhz9tle8c0cuqmihir6q4aodmnclpxkv',
                responsibleUserAccountName: '3qm2fqn614uawpl6vf69',
                lastChangeUserAccount: 'cdbj9gdywntnuuh8dra9',
                lastChangedAt: '2020-08-04 05:54:59',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '5v9dzsmy50uf5tvc7hp21qkcyycn06acpjinvljx',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'fyjgfa9gi17th03yultigj6h82cqmyrjjktoy48rl77glwj46r',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                
                party: 'vr7vcw2t6p4ftddrqan2btk8eiozsa1sy9no4nalxlq2wvdrhzpepn0dl8fygemgdj6mtjjparwecfcqt5xagj35cdl8kzmczf2eepbkasot82tuu3peavjk8qmx5e4akem3t4b3gnu8devoftg1bxve9216k2l7',
                component: 'rbfh8rrb60htmjl1irvf0165hlg91pbrpqctg1vthr6a6r8c65zx7qeww12j1jh9zyo627rsrg00w9baq609bzcpve7p5ow8j754xhritd7e9h65ht495humcimfs2asqq118yupceqlcu68bvzyt31tau5eoo0p',
                name: 'lizf7fm1f55m00wjoginrtkafb0lwbozb08tcdoxazzu58xdz2nt9kgqb8eo75vsl096gc64bc4ybonjbz8mkcc62708s3ootr960uoxmu3s62v5rls44pboydaet7tqy24f9mkxv18ezcpv0nllsx3rg9ziqggl',
                flowHash: 'pbrp18xqfht4uluzh74sdl24ddlmbie3ke5p135s',
                flowParty: '7c4kmf8nwub3qnez4l2frb9zxd2hllx26nsobucwrs2rrrhq1dlzqxhq0fnqga3nuogay6rmk98vk8r25rvxlwhow819ut9hkon8l4lfnm55xmc2yllq83c6q93zj4il05oy47nqq0dyhh72c64zup30e2xpgt1x',
                flowComponent: 'kxwl0cm6y6tub9jimp4gg070r3z61vt602ey4a317p112zkjqetzwg4uyxkb1jieia6sdmveruizlbrmxso6k2ag11vt1cau3w0aa4jdmvoouf1zvazeq6fhr1movnoyqzx5ykcsr5hbw9ebgcsmqr8rr2mma37i',
                flowInterfaceName: 's2pawha78w2ft3txe9en2xetzxwewqv4mnhlegbito9x0l4oa5k21k09eh57kdnod8k7vnrk7q1zzw9wwd0ava7fpr0zx2uz1m1er6tpsooqh89t8syf1krjsi9xykqzvqlejezz5a0abfalmukc16jzq9npuy3h',
                flowInterfaceNamespace: 'nc2dqcydb9ja5l1p8mzcqoeejjtcxusqf9wlkoyzwp9eatmrbblyoei7q36ilh5vlnlar0vpzt9zn8zqxgbivh7tu0hki04ixm9o5inlgsmmwsemqih5isuvfrl6g329q4x0re5s2pwoe3wnf0zqyw0dkuj3semb',
                version: 'bl4xnuyd6bhtj9zz8nb4',
                adapterType: 'imlga73a4h5pb4iy88yse74vphihidncgx0c9rp6t1itjyqqkak3xjk09rvb',
                direction: 'RECEIVER',
                transportProtocol: 'wmrf5hwwmd02b8212ymdmt10er2buscdv63ghw9wo70t0j1vzlkmwmc7hae0',
                messageProtocol: 'vkfnrg7i49wrq0kklvoc35c5l58yqo6cl71kq0vhqh43sgypplkrolkyepez',
                adapterEngineName: 'gkm5vgadpflyrdave9zr9ontc7hygfohvtk2mn3ruotdldtfxlnu00nbvw2l72rgqlnh77c0k0sugjcsleh6um2kfqvyttpn27n7jt7lr65wievryaxvfcnkll13spgrla2dcn8bf3ici2xorf9fawk9kz6wjlpo',
                url: 'wc4h6thspkms1x4thza7jq311essaog2kqacgowacx2g3g6psxwvnm39828gaxelhbz9fiiri4bzfxdyb2h0j56foxs33ry0qu6fml4f6tly0ecmekxlm5zp5wpn1fs89tk9xiljzxpn1ll44gy6ux9jxwgkb3pxfg1e2qlnoi2bm5jw19lzy2dsryperj14gnorkousi4stwguqlwxhfmodiv476l03dqhdoj9yeayzwv3kewjl4jdan062jppy41v2u4ovwy9401qr9b5tssk7e1ar10hmyl21wrqk23vniyqpd4y8xbir0j6qhn0o',
                username: '37zwr42d7xcssi2y9cprzis3l40wg33018o379vml6d1vfb2fou7n23tzn8w',
                remoteHost: '1p53jt9d0kgd6wugym1iow2e3ig0gi9k42b3qr3yrwzwy0jixb2k64dngb3b2oftniadrv41ma0zptw768371w4oqzih6qgaphasl4am0otatphg7itqactbhoyy6yslo0zsjc1sty50g5fqprpafl20a122vt2v',
                remotePort: 5753417956,
                directory: 'agbttrnfc9e95e9eqlhypl3t1qk1h1qof2yybiguq5m0ect9q47wd5a5tpcp9ftavs4e0z1ulnyuujhd2x72f91pm86kluahz945cmcuwyfgoroo2jblwpd7or5ck68j9y8ypxk71bg85pyo2b77y3ga8gfvmyk4u0gb48ol6c1m9rx8wdpk27k5shup7ebtiikejowh3hrn6y0zo5a0ccm0p0vbyjvn5fbc9sevjhwvclj6u11qogoybcqhq3lwl1et6x4imzwt2i19ulj6imame1d7h6btk6i9pyd75qks1plw2n20jv1ver1zmeme0zsr8xbiv0j1a7wh2e1qt41vwfu3g4eh2w33y81bdzrsij2w4o5yddn66d7bko2h9lkkumpriy5azw2c3xabjvxx5y9niltp8ht08x3rjndj0edf1usb1w0ifaxram30n73cqwefnycle1mvyfhatvlu4u68o9k0d3f5kptjhiqjt5m9bx3844xn10fa1lwso9iq9tqn2bw664mftov7rkh6qvlrgpi6sqz1k1o45jqdy63ajqsg04c8t9ou4t23ekv8hkx8cbrvkdo8bdcchra6nq8wnzf4dcx0m1a6rvl3kok5omrpi31mxhky2delrvf2xg8f50szobwrhh3zkwdo0y2de9h9bxct8itydzy9pt24hfhath2fzhp74irrx602gyj19lt1y15egkkw5mj5tamhrwvpyfynui7zmdf0er9d5nd9ue3jwp04wop1w77r1pkl1nzpxhjx21sll4ja0er2sy7u25ws9d9a5zuoaz251n137fbsyptizt1mf2z19r1ufng8jgb7fwl3vspnie0yoxx7pc7z14dlshbh3zbjttgrnm83vn2x8i1zj9eox08jnw81kypup1knwag05joyhcgwxmdb088sdfii47pu8lb8l5wnfeb6x0cb9jbt6416ulish5y2h008kozf7m9bp0wv8aycpjalug6fk03ahpfq0py6nbmvpxdo',
                fileSchema: 'stjkhwgq7jj9zrgmg6xky80baormtjt38fqxy6ybeesuq6k37bx7pfoh3k2hcrw7kxmjishiq78opa1n5fwj33xb5d9iaqo28jt1epifiqc5xrtttty3gu2qewwmq51hctiemnkvse8lmfw1yvbb8ktmzlq7xu1hcs7qca3o6pyx6jaibmyl7bjd1oep8reey3shlb81jpfz30qil3e9vfncaaai6lufrqng219js2ps23c6bqng9zn7wdptlo3t5ohl1ocykk2vywgitbep54bgjvtz44a3bstzkjzkq82o0uanzp8iyf24ooteqfdypiaffy84qbjp19n391uzj7cqrhklr8fun4v3pxiniydwllhw9fe68wcr0jeacwps9x523lp4hkyepdumawgahl9zhjfuccful5bu8vv7szusrj27chsf3k1e8rgo2cnrra9ubcc8fmlqke73evzdvxsrz5p3g08byzbkgt5xvkmi6p5pc42kj9hdfi2swd5gsvvac9bo06cv01kaq48021goo1ud51o360y9s8ajonnqbzyus26ifik1ggc7uiiypy8wbum1vruys2nhjgz9dpivx59fzps4c6669koyrw0xyd8wf3rvpfbeeqrqvszoqx67ecoma0szsw9ictvooqfopw802ukus1jqkv94chy7xuq6ri0cozvlnd5azpxqngmmapt6jcrytkc2d2h512a1vpxp5xpnqs67oe99pvn5d1r3i9zehju3sjsgmhgenro6kew1cyfboz16wkuugcl9mcawlagr1yb8qkbyyo4uz27fmxelbx3m4pbhi4kqnblrjxcdr7yn45l2sb93x5nn0xlo8hgvpquqizjbgaql3pwiqtrxydbgkez3d5p6t37puzaxieimwzcm9jcj27ww3ltd6ykcngi17cwayqvhouspz1e75yw62ibb738ev9otwc5pw5dmvautm0nb1kxafvum4fxl7shfbsmik1tiimjn5ys0ot2tmx56nwsu',
                proxyHost: 'zacx9efl1r66iv39owayrwyitk7ikyxwxpgc7d2ubhon7syn8u9v13ji3oxe',
                proxyPort: 6740334962,
                destination: 'dmfne3g830lz8e4m8rj30gxnazn75qyzi4vz4oj5trleqn1xvvp90qlk8fct6cht8qhwg5jaww75u9w2xero8q00smz1vl13hychdawvkefyc27coa5skkadulfybcwktizi6052z7gx2bsvqccsp908ggqpvvs9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'foayimt6ne3id9mhqw6ff7e3cp5mdxvrxafxanoom0olswyzpn68wbqbluygmgzw3iybkbe97j005d042153zo186meio47kivk5wt3miadkfat30zr7waqgjemm14a7p7gej4ae9t4h0mftq7fp6vg5hzns7c7z',
                responsibleUserAccountName: '1jt993o8an2viow3l314',
                lastChangeUserAccount: 'n2liz8ci46dt1lc3m8xr',
                lastChangedAt: '2020-08-03 22:34:34',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '105rdrir0uufiop8iltckiv4dbn15ytyu7ayidi3',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'y02oopdxdvd0f6fzgb7z8qft4yjd2nnzxdatrgnrcvjovu6751',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '0s7ln59o5g113h1eptlu',
                party: 'jqs09xx4qq7x6is4nv266490e5kxbzy8u1st2b83zgljck2p5jop19yh7fm2o5d5jzqqkrak3nhp04kjnpfo6fxv8vtexoyjtboic23xk92g8vqr4joa3puay9udns92huklutv57khuifieepeaz255t8ep6ak0',
                component: null,
                name: '5qjydzkja8nkzl6plaz9949orr97gwq8nfpyhd8agmidjmovpyjm8blert0yj58nle9p4agqf5wmwwrl56vkn0263den49rt42ssvi49grf111oj8bvrxw9bz1193na4nvn0yhqvoj78oy1tjpwurgd8t9hhftgh',
                flowHash: 'dhfycflijwpdtydvhyj57hbkjbitqtfk6jm7dwxh',
                flowParty: 'g0cv215l1xq6myo32yjhz2pgoqqrdawt88pkyzf1l8c1ypjabvtb80mf9ca5xjw238fz6d0rbrsm5y8emc8be7jv8xxsdhvrinjsgwo5xkrp34wc58xp0vh7xly75g13o5hi5ojjcyptc40f9cei2rcy74vwu0pe',
                flowComponent: 'su0x3oyi2p76v5piea1jldtkpqg3aoikff2gucxer8z3pwsrs0aorvx8p4a08fh3ilhj60qj4oni45jsb74sx2ucdhrpld5ku9dzsf9hm5g1xkb5bgg78oam2ks9wmrdcrk1gxpiy9y5jrifqgaz9c00ovq3rwxt',
                flowInterfaceName: 'g3ufch7cs882h4auux9cstd493lw46g77wcfbdp0uile4uak4mzq9hkr72boeakuxm6z5qjjttum9aelvhlff578s0d2yxmmb1f1rezovcwt6fd9sgvedqy134tc9qtgnr37sxo3kd7bu63x3q0a97e59ry3eds2',
                flowInterfaceNamespace: '4ws0woh49alk5wfg4e05clfxnvjxrijoc7vsfu2w7zwtx7oe2nyhzidt98b4pj86awytow2z71p2v2pm1c7d722dl9nxannhkhk0ty8vm29arxmujoahaez4qr1k8p31437s7zyt4kdabwsetb3ruvj7u6yn4l0x',
                version: '89oj1z4q6o6dmacuus94',
                adapterType: 'ha1htefszopajohmlxfppyrijlfeg260er2vg4pu1xrekjj1qm50jlf2b1xq',
                direction: 'SENDER',
                transportProtocol: 'vj4lzt3i5siwmlzfg4s0youcm04pcw7rl4mmqcu6as8vemsfo1nup28wrj3s',
                messageProtocol: '02rean32o8tl4nhaci6lqcdlfk78288i4y3h6alyau1u8s1hhb72cjjvszsa',
                adapterEngineName: '1f6bpdh1k37wcg6vp1wni3mzwgyho95plppnplxxk2a2v9qm96z6nizl22ht5pjyno6sht0c6xpf6gliov9thi0eskurpse2haqqtdh95ve11c4bmljjw86xwudzzvzo2ofw1udt2sedykw0u2s2xj3947zogu2w',
                url: 'cg3emn7h2xolipfj3hzwudug0qmxlyepolh4mq4kl9igoot5i8sxhd9kck533lb9dvv8f8oqado3812yp5rujckabd3zrrwn4du2s0qd02tf4nvt80wnzupb8a32585sef9bty80o2proef31de9or8a3vj7g9onxbv2vt39wx4h56fz6b42kgab8hhib0d6rav5eyepn6lr0fmz76906wop3511pzm821gbt5su6cvkx8rf6m0fadzr61lwbm9ndvbrttkxogzohlx6nhcpkea5pnj1wogndxgietxrs4myewh2ijwwlq60mmny4hyj',
                username: 'dii5fn20qz6wzfchmewqeykk10nf84t8jm7wfmoblv01j6h3iw2dz0e0svl9',
                remoteHost: '3fbhtnm6cxrf9ywfs57bs1a467vvwcodyydaulsvw0o86pq4wfzcclv2g98y94b6sq83tztra1nah8zsmts32nglmp5safeoaopusqs0d39cj8p3i9vhwk9yprtqkv08foej1dm6ls2zoudfmkrlrb7hd4ub38rw',
                remotePort: 8836606441,
                directory: 'ex19y843tb5m5n7nqkqnjqeamlhprnbbvvkd666nkoaae1ty2cst47pzr33nxbkegcldekl454x8s4ehkq647y3sysh6nvv8wcf12e8apv2r5mbp2qv165vzhszzqal64xibigo5d2gu8ge7v3dfj7ftthrx1nowms8ipyydfky7dir9lxe5cme24pyz7ow7tsdm0yfddnim5m3qr25wvufmk2b3usqj8yp6po1q9ltgbtmqvmnju8ignsf4izjcewuwy03a94cx0rkwd27kc0zobr2minol7lqbwx09cq5mu4gognc4slu0bspijhmn1cftai0nrqjre7yla0dkettmzs08g51x3k3mosan2zdwvj2dkomoypg0s3o9qo9ug5k9b9ynzln82zqtvxe4zqo2lkcb1i2soohl2f3f3l7kxqkujkra84emj51msaa4iuw63h16ff9t7tbp5wp30cv04s5dqada1ufbmeqskw09q2kvrng9lmdqp6wq8lf5sw23tbvelb3id53hivg2l8x0q9a9r2ppbef58qdbp6wq78yesgqav5phxp6peuduxes2k5hdml46qubp9zdzt5c0zhtidxlew5bwrgl5dr19paj9wzh95nn484r2eq8utms6w9z8gmhl5yqf9l4kazfz2g87hu1n10l1fzhfbaav6tmon0h41jkyuu2qluz34z0wkyx54g21opedldu4gcx8xly0ozs6flxgxtpopjg59gkwr40vuh7cu9gmz6gs4ouznlm2zjbes79tsv162k28nizu1wisuj0yuay2jcetmqcqbp05q03o4oz64mh21mxb3760cjlo6ntvyn6imfumos4k4xbkgiw4jufffincqzq0ismr7cqf882ehrjpqel06k47duzj8x8lpqjcbp04lsox2u38ysfrjzk4b082jb7t2eocub895mf2gfg8sqag7jpz9j6cq8telei7q16czthnipcvyqh7rqeo2u08njsoi9uzystho0ybwhza',
                fileSchema: 'ws03w60fe1k2wd6v87jivb4l2esr5ulbt408lz2rf7yvfi35y0k9xkwafnmi01u6rqha5hwjg6w5lv10mylse5abrd6qcuhyd9phb69qytmxctm976ql3ghnynnaft89yrvahafhn4m332txim9yj59b8k8whqnh8ui33klwecsw4hd96qwqsaxuk8sq25lk6wm3nd519rdghxmk5fspk2qfqe48w4m16uyrxkmodadg89l2kzx4xm2tmkvfbtttqi2ydcc6gso08gi2miffju5xjo1vuoo9l65opwu8cs9e91cll27rvimp9vwnt9qy92xcazdlbnwstvwcvlmt3a7ar068j0xoswscucn05jjw7jfjp5f7gvqmbntwzm55altnhv7eucqvn6h4xas1c90tfmsf0qsxldfrxn3wgvjg5chvm29lrsw2t88ot1lij7tfmakiyel5wkduv45oyj5bwt6az88owwicmdw66ycngr24p0pkdkzqq7ha4k3yt7nw8kboaxohme46c8zqyi1l3div9apwro39ua34h3jzawq3f2dhgltrzy2f3noqtvn287txqg15kt9z3ki34m7nihtecs1w7oitv16f3usa0ad2n13vspj1ageroc7fqozugftfob3mxlzziuwnokynupr40sxtuhmgopysm53yo4myk16gqcyinaoz0lskvuna733l800kfyk7pgqcdah65vob798doez29g42qbtk8xdoaciq8tdxb7y4wbuejj9br3p4x735ak46yqeebf2noq09j699jxgeg6gzsoyzkuoony3iofls0prle0fud6ies54cbyeabcuw79yh4khcy0qosy6ivtx639nzbj5nqaqjgglsie5i91olpkzj67i5lpf8xo2x4tc38bv67r855uwz4gmlxa9jun71fmwpylkx9fdmonxtzrqi0r32n99qv5fateg4acrycuhaespa1c1reqzihxl0lp1pmifdfrnl11nm5xq3og8gnyxv',
                proxyHost: '0tgeeic67a744h2rhwvlbqa97ru6yb0kvys0qmg03dwab4a6rl3sstxvqpbf',
                proxyPort: 5349983861,
                destination: 'i97ip6hrmdwi6lfhysau1t8h2zte0o34cgpjcmkkgq7evvyhai9zq9qpnuwemn0xw1wdb8nyzmd9ubjo4bp13xj320w4elw5sm59bkvcwp2zpvxpis4amy8trm9f15sdj7nyv1fvt0adx9dihqx63kb1akpm6a8w',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tu8si4jtaz897ue9ljkh38i4xl7qo77pu9r1aefxbifo0y1qjnh50v9beqnyn7pnm3ixhnwnl3dprkcxewys12pa99sxd0rdn2ed4nfwbsazafihyqangiern9jt10a7g4wjscwf3czbtjcumaipd9ff555k9itv',
                responsibleUserAccountName: '5pghkfcyc20dd6e0e58z',
                lastChangeUserAccount: 'l59yvac2o3i7pq7w0eh7',
                lastChangedAt: '2020-08-03 18:01:55',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '0g5txhduep6glzvc6hu76q8j5it614811lawtedu',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: '31s8vxtwwparfn4s5q2syp1ukdtzkzep7lcs473fm39ird7fme',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'wfmg3w14cazme5dphrgd',
                party: 'lqyozfvj778e6w4np6jhe9jso0lcuzdwikvyjylr5r78u0ka658wt2sf5dtwr22hr5w3xugylvn3z65e1tyks4rl2ziiuvw6toqs2ds7cg46z45xwcww9y7ngpo44340yx43mko2uby5gtjyyd7mayrvfkv7ildp',
                
                name: 'itd4ul6mp902zkl8qbhpsh0rcasz9oixymj5zfbw15t5kbm2sw0zb5uox5mreklytnpdfol4q8nl7sizwhcckgd4l22iix6kd85m4tqchmc88yt83bejs294lav7l53lwjagqpjz7q0h9evrm2aerkve60odp06x',
                flowHash: 'kgytqhqkrjpxxr57gdb0wfqzh3ranpwhvzmfqypn',
                flowParty: 'whtcz1b440kewyyaxc25btzx79tq31v9d46hqqnvooqqk5xukmzovhzf2u89tbm38m56n5vlwckb49m41wck0eiotptydwgecns0nw5uuqyme9stgtfdg7eya0d6im0csu2nfu3q58di8wmfl1uggiasmoygls55',
                flowComponent: '4vf0rh6oradnqebw61hplxrhx0br1u51usy5dw48v696m6whgib1dqn4rxgnrmy264hd971driipsih7psbtxcnnbg3lrqoln54l99fuzzppg9pegdtpsh5bw07c0kxl9ys4hb55wqmzxs1t11zp853zjin9au4p',
                flowInterfaceName: 'up0mdj04nmb4vmw83fp8rgdmnr3xoxuu7ywls5t3dbabvctv8o3qypprdkut8wcpzefymks4hddqb4vgij5jfz9f7wy47o4h7v0c2epng9grcxbh3patlxqs3tbjsz65qnuzubb8ob0x7x0awawxgifpcpf5beln',
                flowInterfaceNamespace: 'iobooej87lnuj2lc2zn7bcjrl13y0wxakhb6kwtjd6qbaip1zhiw4uxasj2w5bg2r3auhvyi9iiplehssyk5qw8kvw63lwrev2x1my8rykyh13jp5ldmxbo96wsr88xxfys1zzjnxqhlaqfyhgik4e1knyj9vqfe',
                version: 'tm61xpcdb2feswz4di6u',
                adapterType: '4qexlvj2oxinss8kz3bh9y57msjw0db5wdmlgedcgfj9i878s3th7944qj2q',
                direction: 'SENDER',
                transportProtocol: 'rrj3m6s0gu1y1pjp3kfto2fboehursurlpd7bgvyozixw53n3wxlfden9q23',
                messageProtocol: 'wf3a9dv9ycviaknklpky01f5kus7yzh7cinw8drcmcytm8dbyfzy63uqrnye',
                adapterEngineName: '1e9gzc5v3na9zyig2d7kpokji8jelxiaxvan671b6e3ach7dh9ouc6df4ip1sc05impb0pipwql96qt13hl38pt1q3x3qnk456tgn8bavj913oewyly5uoyno83y8d2srxvqato0yb51og6nnsbym4sen3pk36ut',
                url: 'rl17ixik0ywtefk8chkoqa61vlx3jlz2vk46e5fya3igca08zsan8n3e93j5me4q0ft5g2ctd19g0knfy1sm5522h53j5tajf8fdwm5r79m8ueisq4li1se0oc5xfbgyat69a2eydjkkmi0avwq7nianw0l9z523a2loauxpzavvrpogy4deytvjaokga5zncvrgha1lkiquiqggud60nzjcsde75i82m39n51ne43omh6og6t713xbuww9stx0p3s8pmi1z2t1m2d2xs49u71vrhf7sfse6ye2agvz4fdzu77ldxwarhqatrdhginny',
                username: 'ppou1gfj1gimehykwu76rubmgafirs75k3h9kiokzhcgykvcc6lhfm969w4f',
                remoteHost: '5wiq5f0lkyh22zabp0ldrzr8skkye6ibgogt9sfumv5tjoqdtjlkp8bbjnxf4so4vd28ic1hzttiifbal1ql13j8u0ncumwfjdyx1zgkagvd0uapus0w7sm9ghdhnimomc3pvmenoqxif8alw6o5jl8favnoa4jt',
                remotePort: 1185322703,
                directory: 'cbsxz9juk32p9itpxrdg2tjb69n8jpwugzfcihc22qzfcfpopkpl8nghz7z2jl8b5vrxx628rd6yh9mtwfd16u30moxmwvcqwousuhawnh1grfxyt5jel6cqd9bmlxxs73jrrk2vuzgg9xuv457rqs0nzat1rvxcs1w2lig22jj45fe5cwzj6k4j0dbhvwo9wajaumcwjlfupio05a5nqll20ap56oq5vne5l24my8zbotl21ss2xbz0m9qqv1yu3eetnyafje9pxsvtafcj00fxxb5afc46hzpxktkgoyxgjwj9vpq7dq6688qaykd8yt5o06123c2ip8nm8tr4lw8p32j0bqzku23s6iz4es285tagg7zhk10gln0qamcxlavub89eifwipxlod8izbmwdhu6vi1z40dnc6kz4g4hextcbnmfn7nzft1k5jjeenm49nic8q3aoqf44fo4ey4xlm7ng9zz05lqh2stb1j9w3rtxorepaxnzqughiy0cssauftrg1lsu03oqixrjp2n3g6egak5prkdl9hycl9hgg0ztwcvl738krel1dfmyeqeiscm27mc1drjkvnj1o37pckzyh92skbvbmfh9fbzmj33tvq6jbtcb1a1qva2i7nzlvslxf4ttlxjqs742j1rlnty91ta3882w5o9im7eyeqhmna7ipvcadttwaggcu6ejsa3tx7pgorjvqbngdhg5p6i63qg3qoveexerge32528ln0vmdmoho42xg8oqbccmgx3u7ca5xfb26h15702w4a9atgrc73b7og9b5o4m1153tjecp8j95mfj4zmtbnao32x3kdym4pajdjrd96u8r4t2igw8r0muj45q6s4ebiiuadniv7symvnzzercoqmay8xa53wthpuc0oeyzng591hy1cvohih095clz0h5iuabm0aezxds1qxalh8appqbv4y5ig3wdhcyxc04rfvt35yfcta0h39pk30f46d4k33ehsir4vveetvvasxa',
                fileSchema: '1b63cwsckt06e2q80l49iixeo3povjjbbiqqolqu7nuuijylcmmxuanabnknxdbb3zxprapdp5wxpsjm303khqmwxcxm0y7btewfsc2w7qvvb788ftd38sglf5q35a3iti3gqyyqeyab256e2td2pxwptd3ab7fav4z6tdydpcy10umasqjabxm6ph625976pamiiyuz5mdwy39nfvj918afdv6s6lnfbrhn1jfvlis82v3g2wep3wz7wmc93rmv9lv4y9f4eyx4990rr2soshsmm6e94pkw3kfws2nf83cm3u6wzpbavszv0tjdy4hdqq01dz3980qebtnz95lgf1rppq8q7nz4je5ipmicj5usyt2idymrmbchoahb3pdt26gozqt813414lkzmsflhwpv1obd3v0zmjwrwxku3ecdc2nzegsq14eitq0g1g5qjwpvixo8dzrp06rw8sxzscu4clsbln0932hov7mx7gi5ept0mpmtlwt3rzxl1ki9ax2632ql4v4zqj0e66qhs4kk720giz1y0hpnheiqyjnbnvfmx6h9sz4l25yn7ch738o8u1cskseqxv1is5v3f7zf67p0pkeubmk4zhw5ugaiqoqqxsqlpddgsf7n0q67or7rnjis6vtyier6rmybe5cltce8jmrn4ykb0dj9lk8b84igocz1c2hmf3ii8kv92z3dqhjf46m7zrjfp2rty6zr5zercg131dmxj87otgmmu2jcx1ngg2o2b7i4ikih4q4bzoz5o3g0itf6ryd5h1eii64pmgkunba1ksnabzvedbczb5h7d3ffepg5q3z3xaz1uti5vf4q647ns389wkpu45lu78o8ncnsbaunspifnpwtd6d5k900cg2xzlysm1f5at8v0rpsie6gdz0c85o00fw7h18r89i6gptrbes687d74050rkfmb3olkbo8x2hqr7ba53fx2bosslqrfdu0ko2x81blx0wur2j0offfijds6xhy026cq4ak6r6z',
                proxyHost: 'kfj1ijva9bq6pne4git2khxb86eqv8cobk2b3b0g9g6wl6mgninl2ghpko5r',
                proxyPort: 1999120050,
                destination: 'ey7cvkx1swm69z98jrjyhgqihboxxgqj2fpxinebbwh2hfy2103pan5ldxd94dh1wfnhdvs0lucrolyygbzlivc4n57en6fi2hj6c9p51fwu2ysbwm10cdhoo17jag4hnbxw565qkywope5tpafa3jb6m2ykujzv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pclqembyl6njc3mbo0zdqitf4ybym8n9klirtbuq3mqkoj4l3szf4lti5x9p72cps8bigt49ickwiazkziaj1po6resgo3qdwp8d66gko5mijwshphg59qp09ha525phnm2j460yfg0uz88xfir5f11abfny4tcc',
                responsibleUserAccountName: 'r2df1o70dphioylxvr1t',
                lastChangeUserAccount: 'g4bqndj0ary4qjfvlrn3',
                lastChangedAt: '2020-08-04 07:26:38',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'v0cophwqx9gss0kv9ehkwgv94yzz1p0kmk80ial0',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'zmzveravba8uc5dri3lstdbi0ngj2biwegtryy8x4mgjy2msvy',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'ctfcy1t8qgma6z7f0uj7',
                party: 'szqcq8hij44hfoe7xajta1rdqjqrgzc17vp5r86okq63g6inw610vh0y7stscpdyyksw1jjey40p18nt5dthsl4aful003yw9qv0io53bslzflwl4hbfzgl1uyxojiybnmu9zvzm26f29u42rc4f9lqk7le2s3p1',
                component: '6y1y3m538mgqvrm5pitg7pb4qton9tiu8sw296z295owe6fj1rqoxx6dc7nokgpxbssoi5keyvd9nheg3azoeti640x07e9fwnffkk0thbn6ajo877uo50liie3x5omiutfnyr31g7vtqzu8c27ldequpe67ltha',
                name: null,
                flowHash: 'aiih5498ntboaymrda3gql8hen6rsrpih12ggunv',
                flowParty: 'fdmrcpxiy981u83v4w76trb946pw49c99moxasg3g6vg3o3smkomr2lme917uz025879c12nyhqxw57lr9ayytj0vkiixsoem141u0hs22xnrls8evar1ynac9gotr51dm2zrjg5e6skjutlot5zlsh9c5tny5d4',
                flowComponent: 'vktmggwpt65j2d9tq44dpoa4jpif84l9tv8x2ut74bhruj1rc87d4vwhfuxl5q2c8amlcoh5v2jtvt6jyg3j81mbui452zax8aex0cja96joix9x04xs2cmtcvl15tz1q8clg0iq79n0vzwlxdeh0i7zq8wxso9n',
                flowInterfaceName: 'fh1syoks08i2pjihnjjywi7x435050h8fo4em6mtpku5zl4oxul6bl9rboru5btkxbcu8t0drwo7mkwilj3i02323r6njoglei1707z1kk19yyad5ntyzbpuh114bq92q2bbkeg0s6n0700dxbbc9qbl1343y7cm',
                flowInterfaceNamespace: '1tkdlyag697mle7uryi0n14afskjwnwdza50qvx5gyjptu0a12k8z3tw0d3mtf36nsw8qnrdb1921wrer3u3pig3kflztixupyoo8l0we3rzhkr3edw1jv26f7pk4kx8e6b2ce619d3wthx1ybsob2fs8fq47kuy',
                version: '00gpgr0b1h9upcfo4vtb',
                adapterType: '0xllbue8tcdld05omkcxusi8sme57p8q3tjv86nd8w1s36y8hgih8nb7ms5i',
                direction: 'RECEIVER',
                transportProtocol: 's2z940p9e54nde2kbst6o3ku5l8g8zs5kgh74gb18qgkuxh3osar26ppb51r',
                messageProtocol: 'mjc2ad70lbewfny5sfeko80r88bzr2uxnxt1tswcai6l4kujrbyhmwo152gk',
                adapterEngineName: 'gdbwhbugj54lurtjn921imt5kr8aev0e0cd3nc0kmtmi7wcuubnira8oy2ys7e09eeu78fq4u4jrpf2zhd4y45f1yq0toc6tqznry4ph4fnnosgbsby31tqzmu7cbjp1xbr2ry150woip4q4qqgi9xu0rtiw0yy3',
                url: 'ko7bis6mwqnzwefhuk9iww1xaa9querfn65aobblr23qj80dz5lno72whv5wod7himveow1mpbttetyrpy2v6y03ti2zblelbx0vwv1womvqlzgsdlpqfeecrrrgi4aouhkv56lhd6bxjvkgu3h72kybbhr6djmqmepzc2aed78qr2k5mbgmujwprzon6fo6578g1i1qvt8mdkt4xj2uf5z8t3acp6g209afx6j46g3w0b0b1su2adw1wyf1h9i19htc538v6w8a7xcagrwr0t9dsaoa6pqb3szbsw12l7vji22ulp63n3cbn2jxct4r',
                username: 'xybbm39qgxcol8h3p7lm7gkwr4bhh3i6vygkz14lwvzxlhjht185aa0fq41e',
                remoteHost: 'dmr63y4ue10apve31c5axur9ykw8h2e0mhoc9ahi70m8c25r1m31a4l6rb2ult68ak5m3mpol4mj8h3gozovz7m286751jwoaxkby46bb6xhpeu58pwwvbwkr7pah75b703jea02cedaqj1cbn6kk7g5rfdo0pra',
                remotePort: 4365531298,
                directory: 'lpskf5lrfsmwhf55k6nd6dwgpkg8g25j3zaomlmgpffcdb1zfsyxdtakjph01gpp2crdf3kaiee9gjr9w1dzulr3byln9n8zr5zew1rmexav4cq7mitmvhg9yh1d7y162g97nkwn66yazxpxzk1a4q07vboo3an8dikam2fdjsk7ypoj7iyw7uvdgmgnjmeakpghcya0cq1n5aruauw74tzdusspdl1uuygytbt5vduq7yxx6uwoyvj63nlqxbuw77y43t4jdgyj2wkkz465b44xipx0uhlgi7i08baimua9v0n4aztn7varis0myzml4sviw6fv8uatevfhu7h57i8ha94h8uq27hbaec60ydwlddh9t6h4tbdnpog92cfgfsp8v8mj9j9of0bzjn645ygikx046kvn9t60zm1b47ghlbmngem7tdtb10rr48eru665fpkjduipc0sv5uzkpw9yavqqawhi6gkgs89r0d7y572fv8tkqgu1sjgya61snxi2m1cei47vz1t48m3jule2033uylwsubtnn23gignhgry8zn7wot3p88udx7r45t4emm2h013vc6b5lje776v06fzfff1kpakdczw9rrek9pzar0jfnn7oihnugdrkx5hyp7htqqljzp83dgpeu2v0n87ukjswc41wrtg6ts4brs97xkdohlh8row6kuaijymcs2a5u73xq9hzi5ga0gfky6p0qqigm5ai98urd92xgtzvs4tfreq8o3d2j5if6wg6trnnlafcdanh0fjf50yw9alx6kht8b2f2xbxh71iejoktiejqdl0moemm9zo6xkspgz1c9aivjo3hefuh3nooi9lfrt5ggssy52dhh6b6s7cbm77r939nqjpx7a5xpedshei8tx5i1spypcq7xshe4p1uf4dtrj4tilm6zpekf1if62k38xjb18v9k6onyqovtvniht7t94m1i5r4jgmwershnp7ehkwntbyo82ehgb2612veo38xcx5r2b6',
                fileSchema: 's7q142luwko7qp1bc0mgu5fncql317i29gojj1y3p74cmybnfej8khlj6fo1mxtoixekop328xl1chv5use72tpg70ulvmztsdagp4u1zslz3sb43efm883vxcvp7iq5bsmj6p6f38t0gqm3dub4zeswvvggij2mv28168knz1dsh9z8qi6q0pqosv5bnozjuzufoy0p66glw5w187cr72l88qroae3x95708u0agk7ipq4r5d8aw2rfllps9gt6k5l7f36xpbsxr7jgxfhbkxcy7s2njbpokpo9v0z1l3v6cajjcuszlwgofca880vjfpttl0w5xf1efps8p5ifesjfesj90xc7w07mgp01a6hkjb0fxazam9yleyifblds9zim710c51r8bw9o79ll7ekotqww19g583k3221vbm3rd4idir2ntd3bbpybdy6zuiqag0jeh8go0ezy50l01uzvslu42dy3jdvu1mlap9qrahhs2tff75xs3c35gzb1ex3cxayp0mhr0zw2dl4tbdhlqktoplbbs3nyd8y32mwhre4hxtcm4ibaiw0h0r8zrdty6yl33lu01z2zd86pb5zosd53e2z1hu16f6e85i1ozyjpmp8ygijz0u8xfb10mg0g51n1j7ixvwnm254ifplj3van0pnvxm9emiy75kynf7kpyhay5xl6de1nqbpvqxzf1q7ya9pxvlggs1j2ojyqhkqhqtf5daifj7bli5687fs9cxx6u514gdaj533h6kat3d1mbxyaewfzhtc4p5kuvwkymdh4v1h4yskjsdu2ec44qege14yr9mo97ibg9il4bbv3y2j4w43ktld5gsav0pt6xe2fcvc4y2a0btonvjydnxd45hq2r7hd00b9voif3vp2h225ua86zvt5ouuxkb6umhpkhno1g86hjyasne9taclvzf0lobknkxsl4ilg1emvtupj4gtwmea1dvqou7774ntz06vxe4qx7dvf99xlizcry6gprk6ktvpn',
                proxyHost: 'hztcrbva0olqgn7t2hmv23yz7g699qnfikfd4imv87ivtxfu4nfcslvh9k54',
                proxyPort: 2869339277,
                destination: 'lm133srjci54k1a8076cqq3iyau2mo9wibq9e0dm4kcmro9lae72gfo4x057eouvebjlyw0uiu0dqu7011q6q3ep0ujrkyvry6nv32ps7d8h0hxwvhe4e3z9oriusnud7fwgaog4y0c6t4a61odncxzesorm58n1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'o4wdumcbiqbp8mjxeoaz2cgiuhkcg9egypzrbo1mb8zx0jwrlucl10f0huot9k5jz9ahcfruxvt24wx4ftjdx4i2k1zxgrnc7678vqahgpa97yxyak8p0jpjkdwyymmsg5qia5yk66n1ik1yt6rbhte1kal36aqw',
                responsibleUserAccountName: 'w5kvqal6lcx5cqkvm0rg',
                lastChangeUserAccount: 'gf764f92l073ctte31xk',
                lastChangedAt: '2020-08-04 06:18:59',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'rwz99okoh9vgtcfylx6wj0xecfspk2k059gng47z',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'h8yaatababitxlfsydq2c5kecq1ieo43ng16o8k4lsa3kyb66r',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'pdnpaiib7nyf2hz7p6fn',
                party: 'oicp902zf6r8oxtcmz5rac55r3vy8kk63x0g8t4n6h9l5p3nvm7om40jonqjr01j9rfzg5s3ujpzib63rqton73l1n5kutjc2huuwlfexbjv8uaeo1sxos3nxjzl22afru9r5y6yzn12yh9shxylx0cyzhhtmxdn',
                component: '2pun9es3oqw0530zuecdu6yz9eek4xmmk3j3yssrq80dhv2e3a3foibe6pr2w3v6hqh4yev9hurltzvh8n9er10c49bs0h7vkvd193lph512mql7dd1azm3jajo86omgipp5zabdz122c2t1ail3leugsxlxl31h',
                
                flowHash: 'qr90lw3irh8kpgkmwj5kx7673vawdypliyp4bn3j',
                flowParty: '15gqvcrscawaw8ypudzbvzdyr1z2hxk351alc4td2fjxsvo1k40w1ibj1b565gggnqb7bnj9m68n0trclh6z5wgvkazzu3zf1ygp2a9ljxub0g72xxb4lvensv3kfkjqhf2tw58a3wxf2yf6byg1oaewe5kgypan',
                flowComponent: '9b1fajuqiwiu7ixr1nvaauwgjzst954kt66qq1abmuco0v2y6sdy40kl7o7aouvnznhbmzhakp2aaws2cgt1bt7n3wkyznqb0ug68xn3p16wmyp6311uxvv2e6mhkx6qxk9wwe0blyaqg36pwyivj2fcdneof4tn',
                flowInterfaceName: 'n21vi68sf1nkeesqakykzqcw78ccp32efyn61ltz6jemhk4c77y6kzhh5wkckr9nwlsnw22e34opu1ynelr4oj7zr3sdey18e7qdfsoqejvbbz9l3jktt6ho81eiewnar260cm0ndj0ezjg8dacodt04xfonmg48',
                flowInterfaceNamespace: '7hdllvevg6b9l65u1b1kti3287xdfwr9p9sg8kuijm0f5oeuc2p48wrly7kujmzm4zsve56qkeeecv40assgcdpw1717fmtgyki37uv6pcua5ugxgoi7be24p1t21ihjv8c9wtgu7v5nu61btzv3oo19do8hobf2',
                version: 'ip0gn9x7e3n7ys7hgmc7',
                adapterType: 'jetvomjkbiaw8rfa8yo79wk8pie1ew5y4mu6lno01hv8atob86ne5u7epb94',
                direction: 'SENDER',
                transportProtocol: 'zoubb504o6mogiswqnp5yp2dslzjvba7m42glnyfxhant4qdu4e3h681b0pr',
                messageProtocol: 'giimix6e72inwpb9dk3cj12gg258dxrmdqnb2kv1rgpzsguhoilp1itzj0w9',
                adapterEngineName: '8mqfmtqred7t37b8geguz1uabt28d8w2vxg0sdhblrfmc24abvl0ccfxes4odjeu5k6hynktwf2j80y36s8op2bosog2e7u2el4jvrtir80nwtdtmcigwzy4jz80ka8zqwmur9gufremsu0375hqbtt2y45bhc8i',
                url: 'zu9k2zfwnpul4pz59os5x09nlxz5ga4yfv6wdqyik0s87ujaytv6v3fp97gsrufac8chygrvahjssn2hu8a1h5uuiruiu0lzxdu6i6cum25ac7nuv3p8p143v5bmuwlyurfsi5769eybetolamyhzv5dl53elrz9f47a8p0n14h8r3385r58z9lbz7y5gzq1qjyo24vdg946pjo7u5n4qhqncug59wugtz7achxle270d0qyq7rrhy8e8prgobk7tga4n8xz8c72b1x1cp6uhpv22k766fry3r4g5puj4rytpbekmeizfm65ft68vd21',
                username: 'lzinqy0zp3liuqgo76pg2iaow0r7v4btl68x8dlrygqktn03fb9bzjn5e1as',
                remoteHost: '87ocaohl3nl7u27g8nnym07td92gsy0vj2h6i10ffraj24hirc88n6n7bo2pmgtt8h7fs21tm9runieitk98j6fzfkwfgynjsj6dq7k8rxxbm9bxhpqpz0xt32l2qxfirx9belswwr9koz1kouzrq2ux5sbxppmx',
                remotePort: 9967480577,
                directory: 'yd6hnzyjt2601agmzepiazzptr6tx97vflsv5k5lr967873uu91dtwe1ok11m5dfdq0bnybx8r6mmr70gndurjqvugzupp0x46ftgqt8o4bjninh2kvrqi1fd1wd22gx3mc5yqvmmxxvqw2ld1px4ho06dk5kdklafhyevebbi8rco80bjw482a2of0rm0sco2ylsoaqj7yt0nbgzcd598mtnh4ndcbhhh6w5wfur3d6qbktb9o72duxx6y8pmn7nbq49vlfwm7yg5llvos7wubz68klseer2ok7plkn4plvcn9ja5xrfadvjs3unvu6u4owzrzpan6i6nltf5gz3rmg1qb33zeqts0x4ib5eize9t5ss4xnx9b28gsordor5lfeuqipagxlekry9kuo4595k64b7lua1q230l6yaky2aam65ah2x9svqtxif4p3pwxsebd7lj95o2h58t55n83vl6a84mol5wx65rqdn5wkaewefehq2oolmmcbpywixebabmczsu5raq7syhgueua76v02z0e50al71iwayowmqisles82q6a9z41q8lihzcxf2p56ash44ayyo14hg94urejs3u5i736bbmg91kplzupkr6fchw9uwbll9lmbfpo02gclvn8rznvl036psv98it8mwcyk2l3velxe9v70xlb0udsdmtg17jd15pe106lwh1s1gxbw2kh0m7674z0mdhautyxyrebr6f82bc2q1tktgzmx8dkho5isblz6z70kighfbfqj3u0mdt5cn63a56rs9u4wekuh441jijpke8smg65f7n8yngtsip7vokssdliq86ci13vlpswamgnlethgog7ssogqepqcq6l6q7idatjimb18aiskruiiz9pwvxlf0h4udacmud18zvisv6ya7t33pe6de3xajm24i172x1pmytidrnvh32lwb6p8yf02b16h18xeofo0if2b5yhbd44k3nga9uj94316sag7q9xyki8t58kfndya',
                fileSchema: 's6rc9amfv7k8bpzrnsorjoaww60r0sxvfw4lcao7pq8v116ddbj98e6tvp7zuxl0i7xyuw8ji712g5g5venswpjcnirsoslml6kjt95tbf9tjfxiwk9v2ivny0nny1qaodjkz5c5t2xjlgi6b5wdjhppiqzrvhgi9iouvzg461cbf8e31ppj4uxl849z3zmfygnem1jrp2m7efvmj9kd9tssuahbdy45yznmoy339sk1nm8e69sf9ifd4mqpfrbpcdf9sfm69tyfh2bu0fej8kte66shcg4i9tgrcqod2td9vg0rr2baiuda7en1aftt2t12ggtstpa6jo3bo6iye876lf4kc6su4hsn1mphi51x7vynduomcv3cskdi4vmazc3ftd5mzhhuvwuk7voe71ilhmhr4k4fyda04j31duj1n7basacqqod4wy9xd9n3hju3d6kdelquo1ha48euzia73txtiniqn880uzpa5bmx44pfpa9rd089f4jgyb20egfmsvanomlmuvjlyg5sip7mmmam00kmb1kq8nmtrnkt4sih29none7xkrg5401jwu6p1m6mi2z5hk7rc7wd5kyldmftxhnz2rewvrdwoz1vs3uomul1lgcei856pgj4dawoc1mhdywy0rejd1rb5fvwb401kbgqdo2dzg5d0ys1h5rsra60y0o67czd4hz4ozm76yrey3kgdwan7tqqgqhmx6h896v0tm9jbms420xz4giyck44ayq1r0xe8k9ocve9na0itj9sv5hy50p5g5iuqtd1z1q2s2r1orqokgb074jju3oy4iv4a39rrip987ga0ijzovuk9rarop3xchv2rd3nh2h2uj98dr5gkevxc84kphc5ftlb9oy2tj0u9eq7cn053jfbsxf9eku9iex0nmd0e7zbxx44zyp2eo7ipt91dx8eaad909qrgydttq2uxetauj0c7eh3foc8y6b446igxoa7wwgv4jnf5cla7kiurbrf02o2v0m24e3m',
                proxyHost: 'pdzmw6yncjrtpdygua5l4xqtjdjrnu18dhgiei7zbppseibxeewy4a39w4z1',
                proxyPort: 5601647194,
                destination: 'pceur1vsfxis6kxgw9wdb2upna1sk9ozkrdezmocknwg9kbqoc1as76gi71xy1fkdl5prmrg3a9bua7cca8ykwhtdqubukdee4tm5la2xaws9kuqvswab8ln5ytondaq1acm0xbyz1oypcbd28960czudxgv5jmh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9ppqkgonmpwzdl2cdlacbgiicrroqdrwb2l8fgrr0t9vcp2185da3shnfqprt9a41orjzp07vqttyskflcwleclk3z75sop0vmurzkms0t6zejkivosb7cnme87lbdld88bn2x1lgbiz2uckq39t8m2xqqu1zaot',
                responsibleUserAccountName: 'yb97zba3lyrdsj8geplk',
                lastChangeUserAccount: 'ewtqcbx2ke8xl33gmeq1',
                lastChangedAt: '2020-08-03 18:25:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '9ubabjbaapd04d2cieorjex67282elj3f5ed2wmu',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'mzkva168ab9wdpifkdwouz7ilwpnlymgvsc5xde6v5d9ai6ylz',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'soom7hfppwzj6q67izi6',
                party: '8hzyidqdjshir8iioc4s1rnzas6q58onh7n9661hqqe7t9o9mh4cl2b84jhhqcsruea6h05q1ukloyucxymfbgd38c56jvod589uh1a1pkzxcg27et23dc3gdu53ofqpibdmlowka7wd6w31o41pt791gr6pl0ib',
                component: 'tk5rumzypfbcpfwrnd1eghgcy7stf5z017ppl2t9sttuxhqi4y9ziau12nkgzr6c8qle1b1lt5evcfrzqs3runauwwfrh7cw66do3llj0p6ji41mhh9x5pwpvfgiy47l0mbszuzfoh0y9qs1w9r16bjwadrd0kdt',
                name: 'uigot6zydgk6wyd24hi6rtx8fr74pjsesdl23st2m7s672tn3kk4isnkms6gtnqqqyc03du9fzxdlnz4qnp9op8he08to8ezmc533q5byuaz6cu1a4371k5duvnu2swhybv3x02mqdcj6uw3sh7u8tw6s0w3dsch',
                flowHash: null,
                flowParty: 'psqrukt6x8zfzaz8dmgugse7bs54l2gashtc0vyzzbzhgqu2l1h92lpxqbc8v9uy0aatjjgyfg36rs5r1x2f8w4s1561irchudbzpo6mpd80qzm0hnzrqlp003j5qmcez0myyp5doy0ztddhkbo5oq0y5q9hlnwm',
                flowComponent: '17gysu2efjwdn2ivw8coenai910crjo3kj9xan9w3le4umjl2v9f9yewrc1shg5z6n7h9lidyku4dhi11tw7mvy9tsph2pdvwkiid4foultlexaubnl9gkcxp8j2gbz41397q1tdou9p0qjhvi5lkes1dvy3xlju',
                flowInterfaceName: 'hmfwnz4meljyfakqqyf88ekifcrqf0gkjg9tq2nacg1dlxax74foham6tlrwgoxg196w46tddcx69dmz3ag5k5f779gx9tz3f1gd5gkxz4dh9uszd782nsqow4gbkg8o2fdwi1btnm9xw7xe8o2dwgce08lvsv4b',
                flowInterfaceNamespace: '47n0m6b3nkhsal59nbnrnqecrw7j5f7u2za9p5s7wh9vpof3oerhpqsjyc9ghwldke84ou5u55j8z2ye9zzit9e0xfmzi53ddpfyfkq8efijsm27ndq4ukc00xpdpgxxme8by3z0byr18d4nw8ravdgw85184vwv',
                version: 'a7zy5hf7dhiqosq9w2aq',
                adapterType: '9cu9kh3h88ay5nit4zpt99ubjbpcb0yyg8xkbptfpgiwg9t50tz63mn6xo9w',
                direction: 'SENDER',
                transportProtocol: '826ows96m2xvq3g2fsm7uikptg76mdmm6zyqoavljcmnetutk0haqvhdeke1',
                messageProtocol: 'jtwtf5fzqameog3rmpelo24p8wj4qdgm4bm199w42tkmifsu4rho0z5rmq90',
                adapterEngineName: 'u4s2iidm18j5lg4pwamojn2gcb0hzqx2mbx2yhq99va6qkqid4xlitlu1jstzvmhmv141ko91islc38hkfzhdg0bgxei5f7zt7hagy4ka86pgrnfip9zmzw5k0p88nnfe2ol80ors15khlz6g0b7wwjbmumvea2f',
                url: 'rs7akqg767hlmopzvzjraare0m67wue1hz6zy6d3x4w3p6fafew8v5foages1ilylpjngi1o7nuyuu1em0p4pjub4voj4vy9graltopprxiscw185gqrti9lkwgcuvc85n0ufol1n6j3plx6msf0wd55t60eeonayhf9c4kylpy83ajplwsk41wwofxn26khgnju91nualru8lbar7l0pqltglbjm1gdlp1om88w61qyfnkz6a4ffp8ejqio6xqntrlssfa4s24bazdyv4scr6w65jd1w2eved2mwvtzznqfa5u68a1xvtv01dzrox87',
                username: '1pkd61k7ijd6anmmtlfped5a74nuv3n8g5lmrfien6i6jugaog1mfr005xdo',
                remoteHost: 'bpe642jh87z1296yjqelpl290nxw9n1jguzacwcxzw5hajluxsk1v6ztz3fkybxxx0fq2rkljkevy9wx3u716yql2gprrlv3xqzixrkqcye8vekutocfc49jxk72kmym5mnhecal2dlp5rihrc0ttn2nprz4qg5i',
                remotePort: 1768643534,
                directory: '6527k5hbllwnhhn8l7ew195js9o7larcefyq2bn70njc2007rks63slcmk9o9h9n2950v9on97lvy9mfc5zpkr7hq8azq2vicbrnwv5215u0xlhkxdegaue4rax9uksf5q1hs168e8438huwk0sdtyr2zx5ejgdighy6wib4l4hkflyjapomy4ndnihuygd7wjiuuioe5jjxx5uhbq9pzy8ippvn6cwijbdzpaj1oldr02warrnl60mqqthxkmabozd29hu1vrhgs6t7gvvoqjfr61mu4pacokq3tnh7fllz9oso40or5h1mb7wgiqjq37cxpssolvvp1q7ezxuihf4p9opoyahb06nnvaghhyf80y603xneikmtgwuchoe4vtak0kuy3isvt2dk7af022gxsd2g9fyl8p0oj7act4ti6vxr97tlk0jmwlztfee1n31w8e1wxu5buvhkd4joo0uf08830y6li1qa6fvv75l6m5xkvsu7o18pm03axefzxhpoh0mvhy6yeabjh7joq2wrdv9p98w66gtegcktjzuhku4gxy16piwtthsx4q57x2zj8skhvkkehclkhehaqkgqk89kyg9xsg6dl53s9ict5s82wm96zbblh77j5nbvreoidiotutat7w1q1rvuu9qbvszritp2tusyo3wz2ojnq2c51yjd93qk7fmtmc9uf2cfq1wfb8mgvjk1n5nthuw9xfa0z1r9hmtsofu1x7ymthojda0wxk9pcdnufli7sm0xxz6nts3u8dj46rf7jpeyw7xpmz5epad8pl70o7mxlx439llfyq4r7s24rp17rcpn1vja4619z47nwknhatqy47xvsx25bye819wsi2vdq1ntbb0q68t6su70wia01l1zkciym038xy5w2hqxmovbaylh57hh9m8ereu6w0gdnl0rc6dmk0qhc1f6tt3msme1joqmxc2shk3ci6ixeq3ukew33133lg0l3ot8go08a8wktwh1jcidwpf98584',
                fileSchema: 'awtegz16smhae81lu0kop0gsopan3b1o91a0c5xscyekyvsr8f9l21u8vtasm92j1871bv9fqp748tbnm0r7g8j4qnbbtn1pyzii1tw17omrs1qgy7863gmkj2mw0al01yojfmovjv1odmrjuhj82eg2kvjui05p8dmjxq6xri4is3jfwhf2x01hrhhp70jkrgv2xngiha5bj6lp9y2kihawl16q4h7r2ys6570rthhmqb7hraynxhtn44zrrvvd0sxxwzun0ovrs3ejedofh6sowqgymkbzj0w7brspr0v0t0uewvcq78u5xyg50jisvqb9hiesjhyuh0xpkrmlil39zqyxwno1glzsv9ey2gm0tucgfiseiyw0bcp7fxu1rew08hsoldmt1rfcux0gdtgeue9a7ng2lxtbuy60akydc0p3bcsgrnlwff492yfo92fs5dkjiz2vxdxomg1qfodqs55rsxugbiai5p8w6xmqbpo6cxvbvavj2ivtybm99c9qamkc7m56jaotz8png05ah25iw69g54dtowogpmy3me07s9ww7g3gud9cdts0j1dicnkcisn12o6ghsadhggn9j8ai15c8tr35l4q9yol7l1crwej3t3cs3c701s5elnfsr3zem121wqunhs4pdb56cjjt53yo522uvw2nlqx9pt2oh54u16ig2mytz4gg934dw88d29q7wcgj28euuzavxpeq2a2bgtg49h4j8psjaqji7kv8xxttre93qs58zea0c8kgxjh1vf5ekaktrrdsdyra3mcytr9epv2apaz1ivq0rlwo22vf1jakg5krgzyshkxsel2lz9vzw07yb2cw7i9qswn7tk87siu6oylmm89hjmh6hzbzr4i59dk4e5wwi813xxlg21zwzeb9xjz4dj5w4x73vobq3pdp00b3marzzvpq5hrkcuwvr5edl0r11iscm5k0b8r2w4rya16fs7dh1czqj6j27y939cj8mlvesm318g8qr7rh849',
                proxyHost: 'cldtt12umupbb3uuk1du2bcelraclekewh7vr1xrtyl3nzn1f7npfz0cqjm6',
                proxyPort: 6057192934,
                destination: 'lleit3l6rf7d4nt88nyzrz1msvbvmu57zmljfa96vy1c3kosord6b7a97dbvkwyvymr9wk59tzzsluzxvj6s1wcbnjzy1v4rjqqoixccdmuaffb46cnk73sw52g3ivqmjo2y3q1nyjqc3wx0r2n7hqc36ratepu0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'h88ikon6gayu9qks0kmo1cugonu5aaxxz3nqm5b0sl5wgetvi6gn6zblpttaehtg96kxg0m6f17f3tp5kjd9vtkmab992hjdceiopmf9y8v5zv7m0jvmgxxra933mrbv1v70r1rqsa4gjyy6clqr5j2wlcejiwly',
                responsibleUserAccountName: 'ksaefyhpvjel7p8j6ebe',
                lastChangeUserAccount: '3sy3pvogcavpt9wysv3v',
                lastChangedAt: '2020-08-03 15:51:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'td2k5esgw6n0plkqoz6xc1sva6mpvu8xvir56oyq',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'n97rxgf4oqw4vzsd55jbbdge06qg3y5d2b4ou450ox47pb46ze',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'v1p09zmyq3yoq0i8uoir',
                party: 'z6qna1tkfcjsh8rdrs86n8i87nesfkv5ol1qyzfnaw6mbyc37qrjxdqp1jtty5f7cu1kc1mfp4m5pnc9a2a2xgcppjx01vuh8u3enfjeu5ms963ykzmibz9bbdgvfmt87s8yfishtab9kti7mo59293z6bl5gywr',
                component: 'uwx7mkzfhp9x22g6j845xhkfgmujbq6wwpgi5g6jbe0si5vik08kwfgi1dyhxszu42w940sjwyp5unaae31a90x7fcu4mx4c1i3cr2jilzbso1o6le0d7vs3nwgd3m3u8nlmrtr6nzi6jsuokhd03dk8zlmjgsr6',
                name: 'h80k3pj2yqdq1a3mkx5emv8y76oy7vuiut2wqj1nnamp0vn043nvlrbs8my70chms7hn3sasyat93bgg5sqqhbw4p5lqwamodnu4oyt8h5gfbtq2ocen6mnywspjqlo7p9yo83f5jqupnd3cfwodfqzbqkyw75hp',
                
                flowParty: 'hcyx7usp8w6ixrg3f46d798z953b68aqyar6l7m82qnbzonkiju22vih6o1nalmsse7wye01piyty74cqdojbtzpmh38n9y2s1wf1ydyartz7u9h4t3sys7dz6ifvlo5242lkktv8h6pmu7plraintzavd1fzfmg',
                flowComponent: 'ls6fchsxtjmozpd4nxxgaunfx2o5asencp1hsfkvnm18n1od3y0z05shp5tcz8itkhi5rsd0qznvgofqjddx151ev2bh4rmokebon80mzrtbvn1xuocydu2s5sp1c076639j8uqv7m0hrsvq1va7e9ebq49f9u4c',
                flowInterfaceName: 'zzlwxxhw2st0fn7a03zb3km0flj7kiybtiwwgws2dwb518vi0faaczgvcqwe8uucgmbsgn7r5qeyx3obm6pjnd09em3ivn6cfjv9cb5ljv9998mbzdief0wcp7skaijpl2ucuvxc7hr385vwpb0kolkgvim4r57o',
                flowInterfaceNamespace: '01r9wck0npbiiukvep9qlh5kkob1pdnyvmkje05157lx282tkslisshi6fjizt8pgssrl4l8m25x8ddh0dpi3xdjug4d0vovk4ra6zwqol4aawfeyjcn7npje084m7pnhdur0as0z34bzlk3t1fho1bgi5m3w7n6',
                version: '7ygmzwzzy5f7g67q3gak',
                adapterType: 'gj8u5uc8unsud5gp831r0dzmixjlh8irolfzf7wktgijcykmyxmihyhj2xpl',
                direction: 'SENDER',
                transportProtocol: '41af8oh2q8pkv3apvt6ruvseam375jjfatvzf4tpmultwlmtriljc4rpq0np',
                messageProtocol: 'keqddw4o90rk0jm97no4hqoun4cmcqku8ct1ruoixp34zjcw6x0bq7swhplc',
                adapterEngineName: '8jrub897se8tbv0ihcfuyhygxnjdhkgcenabgy4bj6yo0zgacnhyi8gucax2zpj8qy1ywx21no18l5dfb02qrymm0buducl2xqh64cvvl6d8gdru8udsgq8az2ri8amith1o3jvy2wgff0yex70gkgzfdvyne6tn',
                url: '8yjhaopiknybwihm4cvf3ywmxbrmhoy1hslmdb1n2cb7y11dv9rs7fj9th7r2vis643bnl4wwbukxtmlubmc5jhc4qxxucrptbrndbouwuhow4mokv9j4ickoicsrvc2lub4ea2fxci749hv9cbz5we2rvlthboycz5vu2k99gbi04oaxxhma7ntjjku2ib8qem7uryyosx4qhncy4udnjiaz4q186bj8wvq9n23bg5nsfkvzia4vv3yn7x2skvnd2zy2hq736c6z4cs5m3ntanym8aokk25no4ehmdaltb16t4vsol1qm9ttfiteb7r',
                username: 'klvopjwxyorl66b6ndgnnlu34v4d54ljt5cxcuv2rec78c7wel8lu4ryroqm',
                remoteHost: 'y7zu3tiewsus894k5bbiqp3xqfnr0uh89qz0msx0vzto5rzylj7kzkhk8bzahftp4d6mgff5qdvk5r9pr8kcn4mdeqt1q6vnzd5jgo40vfdaa6clivd0x0cvrukv6btqvn1w30wmu0lwe5fkogamet0tufpz3zpa',
                remotePort: 3699524771,
                directory: 'iy0aj33aq4o0koaslycyy8a9nqyt4uhn9mor1o66c3oijnwirp0imp6ylmus5jm1wyzsflotfrhb389urktrmsjq0vwbyb3z06zuqkvi5vgaybtbewwm3e8w8sw79aqdkfzu725hytndgqki72nzupigjgluur7zp0ec4taj5r03yx2hhi4da167m3lfd4fypmwu11jljkb4tdhgsqgxsbinhxnsmp024f9xwj4cpx41a06mbefp5ciribj6tpk4kqkcv72e8kes0eg2gkslt3mjs24pyn1ad6o1tqd72ccrltj6krhkv4z5yns27lidyu9cfyc6xs1y2xk8qy9ik8s4uqx9nhgk4p063i3w3hcsa0olh79dfn2ktsam0rz4t9tlrs025gckmou0eijv0270jkyy3reo755k764p47puabl86qexb5cjgk3i017zpvntwnp01glz3vcmb5tr8qiqdmou06ztwqzl72qgwq0d8gydgi5jr860evltrrszdivpvzcxdadun9pdqciacjl5ho84hu1qd7r1rloiqcw7wz1olwvfhimzadp7190o0sng5olwmk9hs1ujdsgpgv9m5s51qi0h3tvckvwouez6s4rnhe6xbbbg5wyk1c5caw0j6nmt1bl9u9kq2flkfkuuq1pc38zyeykbbosjk93j88xrf65hhw3l6t4ss2m6g3qawar62zja35ofayzo01t7w8mh3e4o77lhggci6um5k2fe9ccohec8ch5jp8xyw0pcaitvj08oimgx0xv9xt145vnewnm8utiu5ndpm5fagbup4esxphaar7y9md9yxt18ephjc9pp472kekrkolm9xivv9pgwgq1ygaik8f61wo6vspexbaups9jwvbsj2n4f6dlxe60gpnlgt5j93a3tizqpv1ab0bgkp446dzwq0dvwy4plc7k4luc71re3zp7yfwm4kvtl0gx7htjf5chsakj9ro7yc7jwjnuq0bimpddjw8plkg5dzo936br6',
                fileSchema: 'd2uwjzcp0ymolej94beransxuq0gsq314on5xj3eqsl4knuxertop9mz93ca77gm6vumegd3c6jxiqoct58uwp5inlt18tq61ap8z1lfp3uh1l3frmcd1gv94ll6kobl02waigqxszm4lito8x8l9psq2fz3cpdnylploxfbimag41hsb5xox5a7ojrl8zy4sl2tsokugvgfmqz4uu7mft00z80nxlf44jbgjnfapcmxaahny3bg11d5k402knr8reyjrdl72onlv0xqq0728n1rb6k35c33a0j78g7c5s3c9u05lpy7xqmieb4dvpbe9pohfbp9czege0j23clok7ou41d5v8tevlggu5qmbnwlogkkvr4dfh7pwplq5yfbp37c4o1vjo4bpdpytggv0x3v08qflh074yp2l1jrvyuqtbsrjtd9m8ig09cilvoekwq0wlaagaj3qlpf14q15o2g6al2bq4slz85mk36nejwdz70z8hv30d13k7oou073rj181c6gyzb77fdg6ei1tk4e1svvnezufggyz9uehpcp5g7pdqlymdq5vd1us2cpqle09h9vjjz4mn29xb3l9lxlaagr53netq8eg2lyw5mlxkx5my8k3g5bhyzwov6v0rlgc62nr11wd3913u0hqswhtr76ensuiz1290nm76o4ij8lqd1wpnc1clhsw08ahkrhdq3iszqzyd6ydhqe3zy2guz6wiwobf1p0eq6noar0e6a78qmlo8u2wmekeurpxygsphbx61dtqk3r7qvxn94k8xbp5ncozelfpccu6gfm838aa6alh18112148c4vmtd1mkg5p7fxd3p8pf3xwpcrw8gzlbmm87nov03aqed3y67jdkkt5aqlx1wg8ph5stmg4jjtru8kr1cblk2p2lcvx1qrwildc85mx46zdq93309jo0txcqj0kbdv0rpegt5hdpws42cly746i4hemxbiol6cq35bregbejmirnzbjbl2h6qi84ikaa6t0d',
                proxyHost: 'djsmkrsxn0lrvoeicxpr0ixlqs5o50967zl14up6zq45pt21lu99hzxht9sv',
                proxyPort: 4720410870,
                destination: '5e4ka5cufjqsw1vnj4wdltrbxvu7hitzjqaayz916au1e5v2hhmkj7lpo3hbpdhtr8pmgtxfbgx4gmzxo0ca7nqnwt056q52sgk7xsm8gcmi3o4j8vi9ltd6u4j97wghxewol8ljmjswd123z2ff5c0d85vi8icl',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1p5lcpzdcp41wl3gnymmb2zikc9pwle7u6322dmzdutvdwj066113ubqb84dyj6ykgq92oooypw59fkqkgomq4up0k1tsgzuwcbgcpv3e0ng58q09ur4i8nfm82h4na8wwmpkfegy3y8cmjekghhgr8rpa6jly0c',
                responsibleUserAccountName: 'zmn0m6cfow3gh3qtpp3v',
                lastChangeUserAccount: 'dfemn3zin35epizigkew',
                lastChangedAt: '2020-08-04 01:55:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'uwhaaz5sb88groe572b715tt16grg8zwa8keibvq',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'cz5v1uo77w1zoqtd71dzvlzn1f33xcq798mzzorudjv3qgsnsi',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '7zyqzkyao8m4vte1zji9',
                party: 'v5tyi5nb7vtqq8rocfp1tjqo2gvi2y8lybstjjm26a8b92krakesyv32i29nw9cuddvqr2jyxxqqwfetoy61rmz9t69jr69pum0xskurmyaf0x51sja0eh2hnrd984hhqnj9y0wkyhtwmj33n66ihd3alx93si4o',
                component: 'tm09i0usltytohmlthr7ok6wjup0d28k191xx8h6sgorv8rjz9khpmlt9gy00ebkt1j8y85nkr4cgwsp8et6273u1e6e39qil6fkt5geqo2pilre2o116o6ldzorvcd3fn1rczjdk3t59mxh8z09vyywapxq5zn9',
                name: 'psyddl3zo7f01wdfngb8tctuac2eo41ol6l53vgvr3vzbvzyma0hdcglyansslilqvn1r0a2u5gn5zvua8l6pjmzp5ltjppnamj47c4m1grjg6de3u1xbxaof0nca4be4l41clm9w8tabbi74v940uivroy0amjt',
                flowHash: '9391ffmkfmnv9yzhjmahngfk03vkn9tyghsymura',
                flowParty: null,
                flowComponent: 'lf3iqkx4efhy8t396zcyoz7liickkl749998cdolg0i1iycfonsss2o66pew69g36occ93ahno1l4uawc13j7yzh6nbaqhjoi9xv0i54lrtfxd1c67b1m1dpc4vi2sie2uexd7eib0x0khzirx2yzkly4s1en7n5',
                flowInterfaceName: 'lodegk300z4lkvg14qq5hmx2taflaymy7fq0s9z8l889yn6cu9rrk8photj6he1lk5wqal7f6gbuhcuvz4y7rz8v0qy5natleow6qrjzobxl5z003iqcn58cg1td1dyhqxgec9nmtgzvyw9c70ag4p8n7wzc6yvo',
                flowInterfaceNamespace: 'h75ua5s889dhw0vepxy8755yeqj6c7hsa13c7xia3gb0wz52yjsnff61fjhi7g6y70fs21mgjnqaczmr6m2nzaqoqn9f3wqbdf1npg78qpmnhm90dfvx0qamwbqzanbz7w0wz8ttkqxli3wslktp7isjbe0w0fsm',
                version: 'onwrxhyexg0nku8crofl',
                adapterType: 'h8asj68igdfl8wbfhyydei352es8z0iuz6akpdjae1me58xqbgfj3sxhugc9',
                direction: 'SENDER',
                transportProtocol: 'h5cqkluvjgung8rykpvjjr4vkwdmx46pi7xqf384y0ckmmgmkq1hmujkio03',
                messageProtocol: 'kthowwopo0ezchqz3cuvwf5yw2k0lvzygkbupf6fyew16ypv4yhvugv0bhug',
                adapterEngineName: 'r60wycaxeryqfan7yf4aptf8h3ecyywuglppvcxjlbx1quisouh1lzdulm0g6hasycbl40emx2x3cqtkfk9uf3tumlwdcb4ehybwes5mnp7cpnh14rr9yeohyuqfsjwiknn1fi4vtbc6hjfsyetuv5194i4olfiz',
                url: 'jkjh387as9dg43tfa6hu4glvmraj6pl4w1mus2ev4cf915wyqub6xsmuinfgowwq8jvzi5x4r86ukzs67y7552imxfqwttjq1u2pcbh0tp96wi8izbphhvmjmvhj7zmr4dhtegssxu48el1w8y3zbjcb3lol676u77hw23dfr27eqcs7egihh3c7vb6swr0g023hwyl6sprdm274xz2ddsn29oxcxn8zs27avkp1ly3ounm0fa20t07etgtw7qujenosh2ccuj8c7f6sf6uzn3yieo26bw3djssi2zt539xd6njz25q6n7xq9qbyw5lp',
                username: 'xjqesqhaknk2h8eqg98pbjl7duz11h69i9qr3eu77y6abpaygckzb3njkfk5',
                remoteHost: 'fw5l0xljp5rfq4gyv0kctif7xuhjfsauwr01e3j7gn6rzuv20gjdxwrbbzn7u6ze8bsq2n3b516y0mo8k5lqjgisrz53fm059cvtrmu8ox6bjy2tboacu6v540j1736flva46t6ipa2dd22yko9t1my891vwfxip',
                remotePort: 4363425484,
                directory: 'ajitrs38jcxb3ptzqcaslmkldx898gk93f0y1byw3c2w50i4jpdtua4fvnn5q487m21h2xc5n33yshv7bogb7kquuwidceg5m4ndp62dnoug7oufbqba0b1gqk884aeutmnyvbqdzmmolkesyqildsa04aguxry1ib4g607clr08tqxunqn6w32pln6wilgneub7lh3cdtfwj1h6m5jkdygldo5e81ytroo4onkj0yaw2zxndvfktaqdw7qt5fgz9w2r4nfepq1qzyvt2r94ssk2n2hbbbyof4xx97ve42yky0ues91gf98q5et1ixktw2un9bx0zriphl0xlm2wdb352teuo1q688lwdh907jo5pjnbyzpz7p9qm194garp56811b8x3wjy6c1kczs17b864x8poupz6857nq0xcxev6cgjmr8uem1xt3eiwc2ti4fwp8prckfj7v66abdxeebz09qju4asswujz5ec1032fhz9lwt3dw1fjozyhjv3s9o6amvej3f5mbql88umn2nsv4ox83beo2hd20udgcpaagj8cqd62st7yn7o6k20vlznwm3ru19fczk1nolgw7n80myenje3vsssfqwttr66nct3b0o2wlu9elaldel2ndlnbjw35fow2ex0gxp51f3r79kgzjqgah58ciafquvirj1g85umvrgocnmn6z1x07xcfnkvim5o6fl79nt9eluajbya6el3kt67bd6bno3gnc987hh9v0300xxxixfqz4oamc39f5cjg66j5ihuybgc6b89wu9fn246fb271o65ftrny6qttf2sz3noruwmntr5gvw8orja7orure54b2hmgbp1vi1h4esm2qwaiffgsfagtmd8w2koekhjuelhkcafjoyuy3pl8i7eojk6tknvthcemtttv0ccmxou7rgiufw4rkc66a4qypnss03re20qyxmluh204q9nfuj11wfbc1bu4fe5ph9rz83nabs22o8tonrib8yyu4to314k',
                fileSchema: 'ue3v4xlapd2qa91r493m6e93ubyq4a9lhlwtn8wgrohxhpznqip0sz0sgx9hbtrpls7p58ve3c0x33m2yol7202e8o2i3309z08s53uj46so8mipd0puvmnmdhd7420ydailff4h3ywm8wnwdchuur025k9ybjy0qsswe0w1et1r5hdpo46pke743yxjk5mwhhizm7l6lmyxdrbkfmyuyirfkypw4wfoepd7iar60fofgqpmh3ha61elb0llo3brdsadpivarx76ethxhfgnex1ew3udfheq6wyfpeo13eft1g7w712q065yoai1794sxe2m1tjvimgol7lyudb7oldwek94z5trzwu806yw9t5477oqysitc79kmfz3yxcs2rpelw7zksvkbmveg6n8l5zqkimpefo7943cv8fssxt9x6nh8xd345ypdr761a4b37xmtkwe8th4nhvf5o0mi2w4zvpnkwbbxum9n3plfau0edki0tlwnct39tgs38aq4ajt1x4n2e9ovteryf5wc4w8e7r7a29z0s94zraqrde4piwslsxestesxlfenn7dkgi5wytrrl5nlkp0gol69d1hdxz0i4sehyaf6zjkxsmokmn6vb7220npoi9npkg7u7gv0t6okatmit69wn3uf1kjdpksl9sn9j8ndjhx33sjjei16sxgirx1fj1fykolvvsw9bio9nyg733r6512op8v7upj0ay0cmjdcbh4hrais4g0h77jze3lvissuylr4d1p1cbmxuaeqrnhz14kgtaysc8t333hbrg8nq9xre3y14qbd47vo7qajpxgd4elgffvmmya3vp8086lg4m2b4fpqqjrt55e93w5kiln1m2bk1he3i09an921k7ttinnmh6ima3zuixumadlpao2t3peo776vvfhbvcfwe2kr3p48d0fmu7ai6j16csqz7pb027itt85obzbffkorhfosfm86qcts30lmck67jogh0nsx8yx3zwmlbzsmd8ez8dz',
                proxyHost: 'kxswl93h3p4qbatf12cldvv7o76kzxi78rebemz3397y2liiame9xebwzzdc',
                proxyPort: 1403365458,
                destination: '2dz2sdnf5kavrqmg1zbrowkuujgcomungxqyiuzzx38p0veq7lnxfwengdd1kx6h9j3upx4555yvlh0se7swuke0qfvw6hwqcj0xb7t5rrt8uwomqds8lhahpne2o5ipsrcbrtzds3ulsugcspgprl57ge95x4f9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'zx0gf5gsa3iisrjhfuoy96v8042y56yq25cn0jukfo7n9elnddyyzb8f7idu7k3yq1iocmgqaikj0lj0gereybuxpohjrdj4wn8jdwmzrxm8nzll5ohejayc8q8dibzvhl7x04pnim5hkg1zk0ftd5weyyhqbocd',
                responsibleUserAccountName: 'fwn6lrak6n79i0njgo62',
                lastChangeUserAccount: 'klqhfm0cgjvlf6ifdy7a',
                lastChangedAt: '2020-08-04 12:12:07',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'dt7z6gh0s0hrdz9c9da48lc8wsq6xhcwu32vavo3',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'p5thrmmnvnk2a0magl6emo5i4vjsiu8at7cpxkf1etpxgnk9hi',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '3nkm0sck1oqk20wkchvv',
                party: 'c8v3t7fn8t8hredz49chxahl2hj7oaui1sxtbcl55dt15c7gl2nzpfzvba9vqxcrltevbp7ds1m90e4n47yo1ydxikiwqrqns11g50mehnrfsbx8waw7fplyu0ilm7iz1cfs2cekloper9zo75hhv2wd3k94hvtg',
                component: 'e3p3f0qq7mzkl0hukpkgnnz454dyd9mtdjyg1ywvewnlztha878l18e463bsvabqq349ferrjpgnk2efv4k10rkiizxiqg6lleff9hmn3hkduuxw6xy4wcplk10ihhnpvfnhkgmqk2p8kcjafs97pbw6z1r0iucq',
                name: 'fe8sf195wgokly0iqt76iqwdspbzlkn1lymw6c0ykl7i2glzzn86t7xawmvqzfa7p2l435eviqvkjl9x6m9f87dgxqb0w0iehmwyobynadlyo4b2dyha0pqgmqyzfexe835jy1ik0d8vw74ah8slga9k4mnrzrp0',
                flowHash: 'mryqzjiptc2m5jnnsl8dau46jznp4t14y1xn3ry4',
                
                flowComponent: '6neiehmacj5ab5mge5r1mqjlfz5yi86bbjcb38r184cople1g5f2x581pbo564v2c0810453ghk7bkb2le8zba64yc44a8u1y3kp1bnl2dfvubtmhjcgxfdl2gibnkb6t7osypbz6i85n4gdzbmtfrv6r7f78d8m',
                flowInterfaceName: '8wow4hqf31vcg6ncb2qz1959nlbnykecsur44q1s62ri14fon2n11wb1hltqks6q57vpcs9z2njgewykhmt076fqgsnui12p4h7pie1tn52jhy65fy6sf6slsouzh52y0x3zq7bujz50b80jjhprioeynn5c9e4l',
                flowInterfaceNamespace: 'f9ga1wbx9boky4ileuti38oyohebr0wgysk78ehrbeoeea3raj3ljojf2l0djdy37sce7vf3b1p5ykm7l535mia3k1blgwu0vjob9fhf6qn8oucz5k2wd826k49xdp5nhhyfsawmch5qvx5h255i6zh6e4p13r7e',
                version: 'axc3futha8k1v2m8xg50',
                adapterType: 'v5cqplvxm6vzl015eixw3y5qyjzbw5q176g383xkkgnxegz5v2o41b4l2xy3',
                direction: 'SENDER',
                transportProtocol: 'bt7akd2ungzet8tz9e334uiunfj39ydhj93x7tyrqkpwswh62u9py67u6v2l',
                messageProtocol: 'nynb6rdwugufiqq3f5drvhnrjqo4w0ugcyvl602rhtjpq0oiwz3bca7ixdlm',
                adapterEngineName: 'ehzdg1depyfg3378iaa20xo8861lo50lrjrqbulr62b7yyac3biwrtui1d1kjhpdgh3ncl9n0md28khdfnmajwqez2jhx5m7ufgz8lh47t3u05kvwlotx7k22cizov8kns9brv9s373lb6vhso1me3s4i6kopocw',
                url: 'dn7difsrofj5i852v13bf7gsb391o2xlr61m7xlni0e91lyam93s5t5j4nk7jrabk9qirf74ki0mnualy5jz7c1llr9hrfatqp4gai3hmer53efuo3gl7lp85j3m9d3bsdvlkx642mkxsb5sgztxj1n5dxib3dgxwgva51p7lfbl6o9o44tvoh4ynwln3s41luxnfj44m4qbp71xokviu4oogwsvfi9j1se305wjyupr621u3r1kgo0n3awr7xas31itqwhsd3aodnnz2fmmpfdm6fzbojsvro7v7opm8sfs6u5op7pi3903r8xjjpvn',
                username: 'c9hrmsf2svf1gjmmiarjllhjbyl6euk5qy37bfzrm2jq6sea3bu5omrlqpls',
                remoteHost: 'ny7tlvf5rceheumzbb510v354gzdz7quok4x9i7pcjujpje6zbmhscws3pr9anu7yruuvw4t367hhaxw9ap29dmjct3x4z1l5q8picvfmed459t01bga8duzaxfdqskgde5f4zs09o3lrs5x9b0of25ja2vj1mr1',
                remotePort: 2539896326,
                directory: 'za6m6r3yct6g3s1aj47ifa1rgq5zqmx5vm0foxc937hg8df07z5z4km2r2qd93sw7hmb8tnbgh4kjaghbh4hx3mstqxstwpr3upetg3llxexh07xcoxr7jqm12ktrf9yg6zj4gwmpllg6uq3dre7b0i2af6ht5k287klgd3ndvhm5qyd033dptlharfr7q9n8lu1gcslvi4cxnumke0ofylmwovd8dyj2lfgsmvpv0m8koqhbb4jb88myp0h7r6it256pd3zfeec4wut5e4v5bzp1t6a4sph4rybc8i1aqxfkbepy8y0oyxwj7odaw9eymchozyvj90z8pszw98vdya5p3dpg4hs2y04zld2g37hjeng55i1dwnjcl8xo1u73vofe5ekuq61jqi957c2s1mkqzs7kdh69fxqs1bt56mykvob2uvqu1vvv5exqofsx0mhtcwzty296h3016mw4iov4bd8kk3264zvj0va8q47k2xyzani0km1pwijmnx0p92jqkvtikrjh5no1r9h46m3l2g7k087zzdunt9iqlnroikuouurf8lxgasy4071j1shaw0nohvu4bt3lzy0u5tfqtu0v5auf1z7ivrn5djv0ju7rdtes92sjfhat0mr7ccy4po5jpew39tsznrbmxnwajdtd7jxgtiwz7a3l75lrkhjsue54i625usz7sxn4may52qm8y412thqa42wwhjar8mmq76c69gbq6p6wpv5zdrbp21asg0w14g8x1fz5zs0tpwz5de614mx24sqmri2wvfcod9acbcjmqzo3d0f8kvx6p73uwq7mzdj4a29msab2pdzu9jy6uo7d62uac2wn5fvuac14i9d5kl07nmsietez4mufqed696kllfngdrs01tskqi7l9bd0bjr7ughahzzhyoraxu41fs2s3oriffw7f3v11bdd1ukhxvaj51gs24ratvox8e27s485w6qii15h57y1u2p5dhmedzgs0nsszy8njd91n272emd',
                fileSchema: 'wv78797kst4yweml11wanph1nf9x0oh2ecltvyt94lqnbvlgtus9oyv5nvtxx3m4id8kqviu2zmqjjvs52bai47lcxhoei6kjcm4tzt7xl1uq5xclu0me38c2v1prfuwjtagwy5u4xbb1ysr4kcjdyji3jreua9v680cdam92ur7z4n1rv4qascxyu4zqzfhccxk8stc9v4bchk39bgqrwzcufeuvujwjs3fv4ucwm1vxgpciu8vlqtohpudvs6iv3owkfkyqe130tmh8negcakefunovskpivh8y6qnzmgroixs63cxrohu62q7pw14x1f6bq4e564c6af4111m78vfx7stqmvorw8y8mnson1hd866dxo8iiw93gu2qtgjaw2yciynhzpd30xa3r2u3rytrc8mdtocg9bobh36edcypdd2o3wjht5mt3htrv371yqla7rgidgyfyyx8fj0mclnxeh111u5lf9tymtuhjxkixl18h63h78l9nkygn6nz9a7ctogmu6dhpjn11uduug7oesppe0rm789p3hypuu4tts1emucq845ik280v6chf6oq3no68hnuvjx3tnn7vauk27ne22s6xpmsm9dhw4cj8xh8dg8flivhh2i31wewyt9z4zgg7f1y7axkeo08tfes56bz62qi7j059ut9qc5m95n0hnbfvjlx0rnshymj73mt7rpii842r0u7h9tmzbpx7y1lj98o08p8174uowsa5cq7xbdlwy552siq67tdc6rxfpbsvgamzonldugq3j0h04vt3lk9fqjzhdydyxwtklmb9uw3xt5rwl7l0zhz287wvg2aquuwh50ic73o1lmd2vg5rpo0bnta6b3c0kw8uigmaaag7tqx05ku0glz2tpy48voqvplhxpax2gt6hptds53jy74jj8wx6dremdhw19gacsgutpahvbd869nuxob9zt5ao0mkeu8c529msfwb9ioh8fabkpl09y27sa5gg3suw5yuwxe7ef6j6n',
                proxyHost: '7o7ouvjgbsn3t4ln17xqlvk22bf35tb9nvz8bporu3atbcxat5tbf88zpjfr',
                proxyPort: 6168902111,
                destination: '0o76kd8xujkfkjelbmhknt8oc30yif3x0kubw8ia0ac30tnwt3lmyw5on9si72aefdhh0fos3xdtj309w3lovam7gblbz5yq8ber98winjos6wrry0rtx9a6vrqzuqvymgfo93gl9bma60m0sbygdd68pvwfwl4k',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hhfs0n2iizds9vfurp92xuf44k7f8gyu8blyc2adwn7bsw02smosp0sozxvwvp7kv6fnydwkh8qfvqiiw6kca1b95bg2ls77anutsc5qn1uzub3vtmeb9yoi712a50owatzg63462dwxvv2jro2bj8o5gqjhvjj6',
                responsibleUserAccountName: '4g1xx9zanxhed6fx6lir',
                lastChangeUserAccount: 'o9lptv8sk68x1ojcbw8z',
                lastChangedAt: '2020-08-04 11:41:19',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '7crgkvl5c4x651p2vy76l250amj271ewjh3lfcf0',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'mtt2waesd1nwea47f5i36r4uu48kcyjx4sl0swt5ynh7hlpr8s',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'now3zyuf7zw773xxij8b',
                party: 'zymjcbtp4zln46jpy91hf5wl4f62ed47fh7kq23xn3xp7p5pr16c6v2y7ptpj4z9zepl7gtp40u9n5dpc8xijjbfq059bzio4bplbe7ygm8rxaphcmd96ca43gwguaoh5xy2gu7l4o3mytjyetsf8q9j00swmvn6',
                component: '3rtk4d6b8n1stpbg8o57snd46gp5nxyoivas0v8gm6qaq7ffm12n10vzpum7jqmo0d7j5zrkg1p3f0253rvz30zrtywyyyhkiof2xobcfn3hjzjrlkydcbpqzpz9xs12l9zwy48kci4rtflklyq0l70ih3u90e3m',
                name: '7m6d7dq8shz7h1eq8mq2lcrfsaju9t01rl715stk6yggimq16w6ikiyloqzxvl929vhj1dvk38m5rnmifewxh7c9mu6szenscj9uya8sws6qij4338fwcwd2crgbbbnpzpbplz01d21huay1o8l57izhwdpl28u6',
                flowHash: 'vywcfbvdnphj75slb7xf6jxit9thsmc7yqsoixc7',
                flowParty: 'u8ah2c1gc9ae6m817l4g0e2xr7dxw50oepb39p0avbdyerahid07g7gvw9jul3uj995cnn0chhncdckaeurmf08rfuyl6bltochraq2bn4pg9z7an0qafelrm8upacwes9t223g06cq995jxo7a4f21i5d58rdo8',
                flowComponent: null,
                flowInterfaceName: 'axltzp6qz9txtcklvl6zxjd0n07m4ylanaiw0nm27qvgwgd1g61gppcde6tsh6uc1hvnxcq7slsdmgl5269ra54os3wg5i7hm1zy449p5j95q79esf03n528xacgnfvm8z39nw1ki9u32n62xy8kud2fv2ipi7jm',
                flowInterfaceNamespace: 'veb9k3qn47580raesn7cfl6gzwsh6msmbx8xxa974qvo6du44ymleo9tqme3h8ni3u3oh7yvsu456r0csf4rlckappou2hxsdk8sr002x17t21taez9v5p8li0kyw1es7l84ox6dobwotns7joyvj8ljiwr8va5h',
                version: 'rfi1jg0et02d74v5wd3n',
                adapterType: '0w6t5227m66tv42q81le8emoyww6g6tf1cervepc7dva97oe3snuhifsr29p',
                direction: 'RECEIVER',
                transportProtocol: 'x1bzusml4lvo50h1p7jikn4gsjgrug2vq0z4sm134kdclkho5fk5h5l32doe',
                messageProtocol: 'n1xpkjcy7kh18cfga80a3tn3pcp8kkca6u3cnmfwns6tjuvxe4ld5wnj8g46',
                adapterEngineName: '196rxq0okv97i2z5kkxb1pdiowtnz2lf5pzjboo1ez5xewi40mrci3jtptmznmixzgl0h1mnkix7ic7b1nxa6qheylvdygqox7cnq5v43bbq75mvt6phz5e475ij3uxexfs4uxrpy6g7z2f2ni736rkdw87t1v7t',
                url: 'cqceb7agxqscvrd9llf8loitswnjh2retk3yi4fhh1c5jfw6y934e6zd3lbgt53xczx95i7hrpfat1h35bpsn1t9fkudxwqify84246fks9kmz4wyddoccuyudidum6kkwhq8gxxmwa20x7rlrwlxrz8bhb4oev8v541waxm1cla1e9hfhphqewc2otkfxh96aagv54991xdnol1ixi166jf8duvtpwoi60or1rk65fa2minwe6eqvhl8244llt0hhc8gg3gs7q4v7bn8477afk17n6o9gn7u1xwkwxsoxwttcfl39rv6vchqezd07dm',
                username: 'tigiz9sv9952yl35o9y5ohb5z75id52z1t62os8jnlmii3x4epxz01iqruby',
                remoteHost: 'vh0bieq7cukm9h3l4wvxhv9e6wtb8kh8kd0uagnkyp5yzj7lttxxv5417idiezjacg5zlsknumlk8k7nc0ifzkz4noerh8dxq1qz391p4hcsf0dw3tkpyifluyxcpwpora6208i3g94uyxh6v953hgeo677kwiol',
                remotePort: 1071203689,
                directory: 'doe2b60w2vuepv396ytsxqjyspzk1qsty5y7sh8k8cv9plle79vtxk43rh397ynchxjtc9unzsxfvza47hw9q9jonoyqink68eszr9636emvp8nntvu278sjd48vqnb2colyyczpzpblk48wttuyf9di051hwkfrrtyuzbiut1453v43bo5vn8ytrdm8uj4882khsu76rcxcmtj00h8l50o71i6rbb18ussds00af1shd2cadx02xurax6toufh2dn3m7hy7jd0xalstvildjj5qlv4o6k7tivjr9r538bgpto3kx86a3zgj4ii2ul0e8fh88utwy25l1gide5ss7vlix0cmvjg0oqmsdhudmds6d0c2e4t7gmk9m7jbjl3x8e144akuvlswr2b37zjmyv6mghkswq1ar4jwsoy3rl7ump41x4fu41ixhqxu925918k6sum8503ig77xad9htci0vaz5zhva3vv4x44qf12ir7v5op79gdh7yru2o4q9ssto4neik6t3p08rpqj6exq8pdfmiufbjzk64apv82gvu7for8jo7ow84fxkohxhtb77c9ipopqku1lpgqt6q79v93g2rfg3xhvwkxu747rc1eva0utf1t18ax2tzdfrkk8j1w3rhq73ihsi573f48syyncd58p3v1vmpyds0fs4i5rtqly3yue23z30d3epu93cplynm8kunzr6p8gxa1jdqnin026ix2g1kci4cy8ufkekc4k6fp0a8rzii5n59o0kxdpeixi12g9fop1nw0maajqa72uymfd7q5yggjyvhgwj0cuz7707rxw6gy26iu494wxf31ti50exxxgbpy348cvxj89ujgu8eg6fi8pd3bd7folp5dg7gxnbwco5gfdca4g13q9pw2eu5n3231fke3yewmokfixvi5bxzkw44o2m44qfjp9jdhtza0zyw91es3s2sfvxxc7qfrmf4v5ru6ub7f43xdl59mpctalue86epx0ky9njzobfwsgk',
                fileSchema: 'verrj5s0icugegkz050kh999nosf4iiirqx778ab31s1ddpbi100suo0ieu3f961om7bq3fv2twe7jmji0yzj6xefvbxn0gmkk9mrh86mlkc0ykejphpb5xs9t477weid9cu4i92tuf1r2nra9vn2hdt53c9el95t69cglfa0j00x7m37pjcg472h6rd4ab5m2chpap2oycat79ogvhrsaveejna96uqlcygxjupb5ryv6pu3odlw1qltz65apoir1d6hwjjv9kw57p05mhdzh8byc75slsfbyclvpiwl9gzl4136l7nzlbyxz7ghwmrelf2rsgrky5mcnpszw7pouozsy3hfu3xy1mhssup8g7njmcnxw9tosqb7379wupiyblfcvlwa4val879mmsgb8j9x0lmmc9jd2cswfm0089d8lfbq8g0af7umwab885z51z7r3lvwhe6pfllopcr19ql36bxnjxzc62fp04l9y71vk8nszki63kuazic1ag39jiom292cc6pggn2j73c25j45lyqa8bz45pw10i7ci5ufwiqcqbmdff42x7hkssa047qj82f8jgddf0pxhf7mxqkhd43twzkrmjt74w0rl7x53jk2u3pyphji8clv77lrrdrbpekhp2ljp1yc95t37v75wiy4ggdrll65c44k3gnf0nfu21g91aipujoejgarq6c5la8jjy1kj3n2gst2qcyl6nzqmnao2y0uwk9z6xgvxk5ewv7hwjbb263js5rsume4ns9c01492j0abroub98nnhz34udzoa56qm1nm3eng0sbhfyla1zmy4d4lnk0kdsh3vz0va8runxdegor1nejm110in8muulalictumkukgtr4gqaojjerdgkgr31h8ss9cjsjiz5vhnoerpru8ltpzj2g9kvfxsnb9tesrdt52ide6iru0vzvumf31jm4l5xezfeppvwcrufz37wveiubwylwrlhh3evmxew165jhu34nbrnmvgc26hohp5',
                proxyHost: '78sxwnm11n1tvj5hna96c410uexwl8qm25nzlp57c8yrfbcq9aey3f3vjvaa',
                proxyPort: 4545386225,
                destination: '7b1bevlrzkfg8hzmvsutmmco89dqkp7366522euklgvt697yraer13fzbjiy1sxqf6v949kpfmqprsea87bzvk8kccjjjl1qhej1vita6y42fdgy9ls01lujd3p4oxngf1o1yeyajm8ka5hs685ymtrbd7pfc9kb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '3spyvnz03pcqgz9z56mcrxsjro72ajks9trsq3bxqwg2s59u0x0zpg70utl16r0ylhh0sqdghhofc1yzguppdr39dzmbzvjxosasuvp9wtwki4ud1uu75p1241tbcks466vkblwrtdov7ie8plfcni3j9gnmkhcx',
                responsibleUserAccountName: '3w1a2viww0z1z4z3yyuz',
                lastChangeUserAccount: 'enkdhra5bypuzx6iz7zm',
                lastChangedAt: '2020-08-03 20:02:53',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'fatgz8gq8ewwtvg7of5qb3dj2uzt80u788yc5b2b',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'qqi3c91nzmkzxqay3l7vujlqgbu4kj15r97wegb694w3706nd6',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'utjf98h21awj4wg67rlm',
                party: 'pc6oe2idgozlu0v3q6dzidjbzup9i1iloky33qm0cwcom3qg6j8fw90oyjlrle9qz009ny7bb6t0ivf6wfo2i6ali4q5gsy020qzxrspo113qdixsxp4dp7j54dgy353bdgawkggflhsze94a970plelf0i1loy0',
                component: 'wkxgcjeh19ogc7b49ungp34baekajr842apk35210teitvx3ilkyqql137e4llee7nt6fotbhmrsc5vvcbcwfl47ja8vf6fcwh14qclpvxvga1ho4aev7wbr6vrsrhwu41cp9lzwg23pc3c0advfrz6s7tnuqbwr',
                name: '9xoee5a0naf70fb3merpzos8zdg00m18j7x44gubvbbsk0c522262ahp9qbwpg7tlz7im86rok1h1fsio04jezokry1ghc89hf4etsm8diszshprmmih025q67yod4ukwv015nf818zn0kmgy9urg8wrxnu7ggt8',
                flowHash: 'vmqyfei1iyajh2ds4fiul5qlqh1ihyxvjdhz644k',
                flowParty: 'yry56kmsjummv7okrv8dnf5l9ob4jxertew99li5u8ubl0t1383muhkjhsdyuhp1h995r6e6fe8u9jwamnn7sg6s906ujm5i68h0wxltk29flywqzwy5l31lyssqqgqpgas2ntm9b9b1tgx01c28k2n5vvpcxalu',
                
                flowInterfaceName: 'mhl7t8m8729i6rjc1rzxje57ryqnzmh38wryll6rzlg6klikkrcysna65bcp9wlgl0pbe7amsvbzpv5cpuuc02roboezdfn4f3ia2l8ahiexxdhlu9ob2yqs067ir5a07awsurnt2exqtbawzampg9ynq7fkafg3',
                flowInterfaceNamespace: 'ms61yfha1o32i4eo03jo7m0dp79wfbu09m5rfy54cugp97jnkopf2rypd08f47cuc2ybgv86aj4y211a3a2ihzg1ynnvxmuzzjvrbijlox5b6bocu9trh66nbbwy8pvwmgdwfzerj9ihwl0kymq3kgfn60xjs4pb',
                version: '2j7i62iinthl8swptwxd',
                adapterType: '9n248geqxqqunhh7pfvqamwhp53qe2fwb52hv420yzh20w7gnazmwbzihzdm',
                direction: 'SENDER',
                transportProtocol: 'yoieny66orm3c2go1c9n2sudt3hqnlywol9xgtoivasdmg6mdmmbahffaiu1',
                messageProtocol: '9n0a2yyebnlp8pa5tw4d6qi6efj8lmt5jqar0lls42v1wjhoktwvb6203dyl',
                adapterEngineName: 'q1cxik3bfycrff6bw440gre2bf8sauoipbfd8o3ezxtkeblcjodng9jidmo4zc0wl1rscz5bu10mxkvtt09vcn63m6d8us93skh8d603ibbm6snc24fqwbz11qysom1j0x7iv0u1cqis9d876wlbe193o5n58m4u',
                url: '906xxrgb0ctbwdjzzen5jhwztb2mzzdxnf39u11daew80j9l5j5vqb3z3e4ui3h56trrphx8mop17c8m8burzyj9hncn7r3hkqjn5z4x05iizoj81l6mmtbl0ecffihlhkfujvz1eicqmgsqx0qqonipejproqnowzso4ayzq52yzqqu0ho5nt7jxvbboo4p1zcib468esz5br0mb0ru392ejj0jmy1ae0nr8smh4220ufl3is9u7kjxuu7zn8yiwzkw9407mjwhr5m1uqcltg2m34kxvaq7s4tz7t1t5bf4zn257voou9yovcu83bug',
                username: 'wygbmcm44dozxv1f9worpf597i9c5udmd1kagg5h10q5cumns0wqsrsh216h',
                remoteHost: 'e3fg94dtb0qwmincd2h8zgznvwvzww408liy13w6qjb1w743ud4lvrq6zzsgr3pdf5mjw0jog8omfx85mputfr78ave07tgcmn2e0o4633m6ddih4uan5rmucdc39oflt5i1c5woupiuzqnx0roj9fn9nx4g90ph',
                remotePort: 4212711124,
                directory: '8qrzf7datyrvgmjndmwpss07rbthl4aaghxoq7jsfzdcg21tzl7ukr76v86yxk7iqqaj0v74cpyvsjatygotgvgdvd9p7far6u0ynihij9sd3xfz0hzidzhmmkqs95cd9dpanpvjav6ya5z1lckncn5z1ka8lxh7dntkjn64ghor545fqlo0pofcr2r5lsosdm0xtb1267vx8e1qlo6cks4kn7eaksbuq6jb8nlfue7t1b3dks0u2lrymvzrs7al5hyjnjk4w5un9vycfxglnzkh868itkfmr7cucaxskq2gqp15milele5lc27qs429zni3o8q7oa1676od08z1dlynlzho05vid0u1td27998aw5ie8bgsk8ub1bz45bhrfncb2wabq4w1xzqhcm4eyswj5lny82s20fxcmz796y75lhgyhv0k3efcrkyj6qhxcaaideemznh0xl6i6w3c4m5ud6iig6u43l4jmjl0yzhn418aqknvp7i0skb0txh4t5adwdq9vzh7p6faqtk4geaugcxae1rfmpf5n9hinvlpwpg999llh0s6gz6f6fi4dl5yppct24vm8mahla6n8794q11dlyi7t258wnyhnednwqvpcimliu2h5aaih5ot84pwbcdjf21mw3o2qjye2e7th7yr5mv3sjtm81sawm4rkgp7fgbkdh232gsxwa6sk0t8mq1znlaoohjffdovfiowsattiihjgycj3nt8vjhxsim6rjrdzl04cc23gmo15u8n488zexdf7ei3jkbmuaaedb6ecmo3yxlqe4iqx7tkc9dv55abqnbn1n0l63htx238czyjfvq8l58j0wdtlow5hqw5fq9bx00k0jz45ibkrx7dm3lr5of40adxporrnaf9p34oeoc3yqj4wl0qxuju7jv23cxp91w5rqdblnisgd9b5he0j9k5rlydnob12voci3ts50fo1cdkqh4z9qarus8q5qhe51u7r6uyduymx5943e5u4tnak56ix8r9',
                fileSchema: 'u857rf0bw9c0rxzfgw96q6acyv6g29mp2ugpewc4yj302gyj4dl4bpghg5de05y98uqholk8f2c4pz85216qgwhqbgzb0ql49zn43a3m2tu5qv5zeacieeotx8z3kead05pqf4f9anoj9q0o534d1i91pmx6mdn3v3vsgfowqvwtafhjxwufy9x4cn0hb6bpk3ir93f2u1mghpkkso5glpfjg8b67cxk9hbsvyrrh64ydhkbjynw3qf79eux5hdoa4vuy8vik385otsx1ql0nuy6uxci9a9ws3akxc05pwzemexkqst917r97afp7d94y5sq9uqh9ike18ku3bzta8b9237jo7m5q8ixj9ckbv67lzmihic5qnx974r9vt7xkew6mbpv9f9om1hguialu81pfbg9r8l7jg483astefoy43amxrtcaxyj9qehekfp5anms2bbukkr1jc1q9hp1o4xbd3p0v7c5uchnzb8surfx2x7jlq7iqkr11yeywer4ecds3h1i91lqx1faxsfrl3fn23gpddc13eniwbcb2qzptbrtzgvwf3m0kdjx3oknr17pd35fvb2gb59tlzyclvbtt7xdss8afxprngp8legesy460iy3o2pbdsmsnp9dbrqq8paa5k94ga2o5s9o323w9y3nuwxxiqfcb6u8f4e05n7h1m4ynofbu9dpcp39aqk69s57d0nbvd6p8kxgp29e4mpc65etqih41tmvp5fe24d05x954p6wk8gmwblr1jl4mz4sx2ksx4v3xwigzi4vqmtuo3d2aiccv3920885bvx9v09jbwxf63d73kzevsn89vw5v8mreezrkgplndcpfs72bjcazit70eurtuq3281pbofyhay431k7i8dan9ovgebmot6ddheu9ifxn6bdri9xaz91cakfv97kklkte7f0j73fdc3tyyn2vxyv5zvw8dgvh8sjrpy4s9gh9thb6noew1utw2gb5bjmd227io9psxkd6kyv65wedx1',
                proxyHost: 'gqjzx1ef301wkfzu6nmmh9nhrt7scr9u2jodcelydqupp632wh5lgh431sy7',
                proxyPort: 5625589873,
                destination: 'iq6rh1g0bi1ltswirxfdnrn6refa2clpr2wykhmok5l5wdlmp81fv6onc20br0hylyaexpuut3wqoyo2lwat6ud07tb5al34q5ycs4l64jh93os97t6kdkxfqpmq2t51ibnjpcsrndhvuvovdx0y242ixveowtkk',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2w0hwnqvyx2ckdz0ab6rxyagccdejb3wv5gm8w6byoo9rgjz13z09sbhlhgha73p69qeh1wbmj4ddgwm184a3lu9cw0ufo7q4otjuot6v8lye9qwjeefoy66bpqghy9eodqhn5zsr7edp0s8bh5sknuc284jdnhi',
                responsibleUserAccountName: 'm657ym7ekczm4624e2tx',
                lastChangeUserAccount: '99sxtq4t8cywwxe5r88d',
                lastChangedAt: '2020-08-04 14:24:04',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'efqtwv8n6nrtrj6s62fj40rkp3bkw1zhs0rv939i',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'plwkmmprrb4kgo51swsl0destj8fcpq89wrgy4bu7gq9sg2f4k',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'd5is92g6uhqqyqbs4jji',
                party: '26qqvn7vpacnndojc32fntcr8ah65one987nxh8s035lgxxrt5r3ktebrq3dcu49nb7wafzjfk91nnve2skmd1agtyjn07qq4dqrbc8qg689fm05ek5lsgukjr9p5dzdgh40hsuv59kxnzz4pdh69759c86qazg2',
                component: 'h6isrcpkjxleyhnx13yh2fyqtz853i4ly4i0vz4gdae4fpmnnfjei94gycue9cpbrqmaprrvnf1gba2ambqprglxc672w2wdxto9k6awyhar70pevpf8k37dol07yl87nvww8asf9j3t7c6xqyih5ej6aurckmkq',
                name: 'ir8a5huw01qe4qxwpxn8z4uincosu7qr5dyuo9w4ht2v6qixb80iqq9kbj9tos5dy2170n46czyy3xnpvpf3kgpaq469ni5hjfeqvlbzln86ypn6frcwv7vxr07pf0lool2hau6vx7og2ze6gdd0b7mw2pritmme',
                flowHash: 'wlemn9cdmo7yl7agudhdeu7ogsjycm5v4s3xrp2z',
                flowParty: 'u28khw7rx62hkky845r5hvfw7cwlp4qz9a703ilmd6xrda6ko5qr4uuxit15jc01gfvygi1dq9zcaxcpyx8ev7htw563gixaj991pbngrd62oiea3uuh0srl0x30gsuh34tskn90fni6lsuevemv969g8rj0ujqi',
                flowComponent: 'm4e1zz586znkluxcz4j7a13sb9pe79bkg2ffwxv4smuy5jb0k0lerg5wkvxywt839a26jmyg7v5op4vwtzb8yqtkxbrsncx8fl8c4kd9nac7wwijuzv5sfj340fnwk2cfu9lf26u1q2xxb2cbko4gguk9kbgfuub',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'l0znt6hoih6k5n8vkr52paxw94j256n3gse3xdhj3ml6jy9v8bo18cezlgmmdrkj9jjxaaxwmlwv2cazuh55xlg97jp7ox0cz9rr8zke1lovubkuagf3vf0vr2suzzdm0bug7zze35ioae4wzu75y7e6m3h17ei0',
                version: '00szwwlpjvhvbjt758vq',
                adapterType: 'zj8wsv40i3vh3a62enqwrydi3vlf4fgrwmwsvrc0k3g7nirbx0bh6l9kkodf',
                direction: 'SENDER',
                transportProtocol: '3oxg70yobjo6bqmvmn8kkxob577dvwk8bx6lmup2rljtt1sc9ofnel4qt4le',
                messageProtocol: 'gymt9hny2r15mn0j6ul0j4ts7pu5hqlmq94nl3si1jkbhjlg3jgkrsq3kyl5',
                adapterEngineName: 'vu9av8qqn2n72odw8pyo7wgwjr4sbcjfnkx9mnrh4i0hqqed9l62siocl3o14f8pm0h3g0f0nv4iq4y3iudsomta5245wu5sqg8teu5jhykhwfip27hre3gypdj9e53hrwzv9g9nv8s47v7ne79cogn9rblwu03v',
                url: '03hkzc5vjer743dtmlwsr416riq21f4sypq4lzp0x9lo1mdubfgolyfnkriiopc0ckwqb9udw5ky5bmw48wmwf1da4ysyd214ul2rdtd3d0e2eye5dswtyypl2xf8o3rpi2zuj1a9zababluzdwy14ied75lrqmcit49kyjuwe475kytx5569z7hg9j5aq72iugojqym00svd6jkemkefspmkuxddae4gsxby1i6padcljnnrmyyr0l8ecgjjx5smc6w0i9ygsycwdwalyt9zjuv7kwpvilrduf4km5nfm5bek7hqcf89lj2zb8967ra',
                username: 't1vp85e2gj6kret9kpqa556z3mu00370uprd6i3f2bh5ea393encphls38jl',
                remoteHost: '16qdjuu6af132vs7igwh9erko554qa1ph5v38hjb2stikuyuopc2jiaxo2lo8giux0t463gfs397spq2dfxz3kgia7qpx5fe301bm4tjzly03dgu2186y8cqj3szijs74depwk4jg94oz2f1hgserot7bmj1mgw6',
                remotePort: 9566522687,
                directory: '0abeohaygdr0vuwfam5m6fjx9npmhgdxet1jancudq55edj1ah4uc6imt6aj7rr0t1xssrv5xzsbvj0kuwuwxupy4sjec88rin8d2dl591zkwim31hko333rypf2xc8m9kixmwwbhj5ixf8ztfdlss9d80uj3dyfpaaca33e7vjvacfpmojshvowlbbyli94404tjehu916f8eqio6y8m94haud8l7a95efzq5x4x2a7nqswq2kdbraj5jvewcafqaucvcf1hkjmk49tgqgd2lk6fw1mu7aq95ddvmcedmhovn9llgygqhpzfu6fpdl2wzn7kqhx8tcait9yexrxnhurftsnrh14uzih9mnz9rxbtjpw88zv8ofyheopb1gjuv05xwcm0oxsr201x699bk19l4cdjcybjlqfslgvlfizx4d0jhtusm5517mloz1i1oq2zkx3hxvok84pm1z0hnvpll9s0l4eqni9zlon1rlg6kvep4vakvgy84b5emvcj9zlkvllxdmerkqejar0rrxjjt8qmxdpbk8dsjpwy0k0xvje6zy3m152lz4iic8jswsaaul9cley69jlkkr0vb0ro9pzckhg76mjqwygm1svx4i7b5vx83g4ykjnrp3o3jiosix9vp1b1h2oxd9g98oxnqjyn1vo5houdegnjntxx8bsavjvttjyp1y6b1dqckerkloa7pry1pgvah5glnd449xw4kuum6uohs3qm5v0hntpji3rk92frpsqm8wuzt4lnp47iwn1c5qw7jjmd3sdn3obuqhr5t7jp8emysdsbtgheotyrdlj4lg0hktx1gnpcqb4e2aemaq5jsx4anu1bwihhbhysmhscr05571t6ms313y3rjdj8feloqzszr7bd2eosdc3vp6lim1y2lwt8wk0e3tpv1347hwb1io33iq8eho3e9tdvtf5m5ipk928dn7it5if5mhuxp4i2rhclxs2o8ej6bok6zkd892pmikm7m5rl7yu44gxfe1e',
                fileSchema: 'lmlqn2unz3he0ee0d7ljz9wzrbttfaxhukkr7p9zb109vh8sc2y0m0t89bi5ikwiiae2a113nyerxedpgyqvrswbo7t2gbqqgqejkbsoz2v37tcbm9824eauywef7b7zhgyy6u1mhshoh5i640mq8rglr4bwp30kjrqq8er6y7slivv9td04w4je16ts0f6c8jtqmd951as8dip7f5hsef0p86pxkxkwdbratrc14ahkc44tz6evh6gpup4awbdmygovijs6qrcmswhwmp71mzgp469axplqdju7m66dryv5hkj47pujcxtedm66k7p6j1x0ivgp4bwjk3in5rjo9zq1ol7i3ewcid6amdla16ojvuexe8my6zk1gr1ae41y350ymoit591luh8x6v96dsc9ctz5q6c2zflb6ywdsbjkj6no2srxeaxoosko1ai235a0pfo6gqieflw2o964ajo2e1d9rf2df3mkfrel7o6ky5mhixp00vftoqterr3iunzom69ze56jq2hfcy8igg88hhkf1ig9ivtksm534axvs68cdoxbw0xdnh6t7ccdmllwt64pukqtlyl8lz3urrbw6jxwjyodjeqx160vcyjh6umkrvygcsa6a478j709zgeaapbkqal1s0czx4m8l772nz01zn6sd86opxxa0a4sdz5fs7oi9184cyvzg8ijuyiv363nkjmtzj7q71xsdmwum8m59gaisi4ftu9in4754mj0qstnjluapve2tlwh72y8k86vi3awmq5ndalv79ocwtj48d7w3s837em53u37goxhst7s5x0kjo8kvbapuctf4m5ali9zjcrplhexttj2p9krnxul3gmynjfxzxbdxzlwuoywkm3v9ucrjwtyqj2wnn5z9ks2v9q4qm0c81k2a1wrgmpb62ucuoz37dnn3npk2zccft9qsjy9z6ec4h7inxz6ti4lwfgpdxlyyajb7qdj5nj273lq6oppgocf4heyomjit7rf3rv6ldsm',
                proxyHost: '51fetmun1dkqubebm6bse17npjdez3ncuv5bztb47vzqkqi27l7jfyx0ioeo',
                proxyPort: 7866115083,
                destination: 'jql0o9tzlo94e5ynq6561tgh85skr4f75j1wz08xngwi31kx02jxa5fylwrpi51f9b1pmdu2p3op35bgidgb4eifavtgp22yftlccyr4flle33f1zo5uzpdf3uy7bklryh3uzqakbvru0ziuljbqfkbd5amawn4h',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wkthou1pxwsrodt6nyzxkq7jcnsz2o42tozgkrdzzwvs6xtqgmfhex00fsddm2qyo4zyz31q4axxppl4lbp9hq3slresr149httax3gsu7vb78iwakwnmh9j2260y1edu617ix26p7zsrhh09rli9d000pwoceu9',
                responsibleUserAccountName: '4famf6nmbfz625xkj58n',
                lastChangeUserAccount: '7hoxk8e48p9b9ojg2euc',
                lastChangedAt: '2020-08-04 02:41:49',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'zoit1hldvzeacorvlcx5p8lfiomkx70a4rworp8w',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'ifqfwre6fszhzvvoqiid3tmmdl8fbkx2jjofoswtww84q0dv50',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'ncd2j99m4dh0i4fken0q',
                party: 'mk0kxd7cjh7qqlaeef5eb6v6epdfmqky2o0l4p2peruyboj11sfy58x2exqmtv7jw0m5yyyp6y13byvap0zwwm1t2mvh6x1n8smria3bycfkvqhk7xxsltzw4p2qjbcq7ezf745dwk84q5463uic3qfbbtaflow0',
                component: '5l5fa6d0g6xxbfawv9y1oubhwv7jv3fmnsantutdbsu0hjbr76c3zofk91cnih8fket8v5dops8s19r7r81ll8qconolnh766mf8azsc7zgfpkg7dsfjganucyelxe1qbucdobwn0j9j6c5lmmue8g40vnijahqy',
                name: '7skobnukzptrm87sawgbx7lv1phswwtch7js0d1e9o3axks6rhd01qpi27gkeh054alixe54d9j6lphphtsn4u0mpivzpfteyeemksoxwnv07wicpmywma6gopge9cu1v9qtsqr43x82ukejimrv2ftlgsh5yeet',
                flowHash: 'dssj2musrw4vz2brr8899joaqeexwm038a8id5v5',
                flowParty: '01qg9rdf01fqmxr834swf52c6l3ylqr8pv730spfbnpp59h4sx1fx8cra68cdzurl3fth8rwyylh69zi3obz2jr8vmwx8d2gihs6d84frgqc0cm6l5w1fmvz8efxqotka74kpn5wrv2y70one1n5rkzxdp6xou6t',
                flowComponent: 'i8yre3n9eme7x9d8ar8mipqldgib1ckiiateuee4a2lfb2sspeyilu0udfk5obdkd7hhrgjq1cw5zyutgam62vj424osd1lqgozjixel7o54s2f7l48b4o4dt6kgvmcdqq45p7c4glv6udd2dn5blx3j1obrv7sj',
                
                flowInterfaceNamespace: 'gceuvauzqv3zsr977529690n5sbasudyqp3j4h5vz74rgnmoa1ke3pp3s2o74xym8kopqvia9zendhxu378snxo6amxg5xh2y6prrapcw0pherwbybrieosd6rrqlwyrqusgjl1a52keyuv6wmxskn0w88a83r5o',
                version: 'hlrf8dyk9k9ou4qsarp8',
                adapterType: 'ekmph802e0rqxieuh2btds1vqc2bvwwx54hynnefvffk23odt0krp9arr5xi',
                direction: 'RECEIVER',
                transportProtocol: '6o5tz298ykvxon2zxaat97t99tljb1xzcginml1k0e10i86jo6vtd3cmty27',
                messageProtocol: 'bn6sqn6fs5zq5dwjvyzuhs1nl64p7rosf79mliz9jn7sdktnzdge7mp4od94',
                adapterEngineName: 'zuqwnag6jzce95rehw59gqea2iualqg4uv02qcxvf95i9akgo66cwmp04c6hna9jxl5pi05j6i3k69zri07p5quvmqfnex1birif7whtxgrevle4edjp3gjxjte20kpscivw6x7n1lccgz0xe3srmx1la4ygll8c',
                url: 'e2zrjsr0hjemiy2ur3jb2s4n4n7z9m0qxj0g7rits2gdc18us368c9to69hussyios593okl4k5m4rxjsqfq7egr258g82iz9amen1oq2xfl054egrq6ripseggoirb8npa4poq6rr0hvoyqa5gbwp8pkwwlg25fhgsv1c0wr8tr7p9a4ro07sfjbwwuj075wm8xuujzmtk7kjpmxu4be1pz5evo0u4omnm52c96p5iqnrc8eowvgiqm52tr2dwjcqha7i5rqf0zd3aui200lrfg28l0r03dwrdgxb9r2m6nmr5p8rg4b3fpisd3hz6s',
                username: '4t34bdfeotsd4dz18e8ab02cuyi9uis3qaxzar1s8z5yd96rqt4o8d9a63sp',
                remoteHost: '5ju128zz8eje5f2rt2z94ovgnxl3ie45b8ei8avf75bwbtznvkg5ohusywtmm5r8fkcj48yzcs82iopwu62hsmagm75op1vosdzy8xdzla5xsrbqrv0lz1kn5xqurqaafdexanq22owra5q4u5fleissxtiu2a91',
                remotePort: 6409786465,
                directory: '5m6587qwkxk68puls1l6un6zzp10hqtznn9u93rw6k3vzf83kx08mm3xjcqkvz2fcpd1bw0e4m98esjwrgc9zl054pxfaoj6k2p6cp1mugtafdxn2xnajtl7jajty38pfzd14i8d7yndutzp7nrjtyy40943i138jbxjzbg1vtjkijv4gjqtfbe23gsmqa1rclmk1l61fipcjxt9xntcpyltq7k355hrasq468b8wywaznc7hqmxkbl1l61yhw9au13uo8dxgpt9yp64lspukkd3tlrow4069ad04mi517ao8uxy1g9ote3lenj69mtr589bpj1f4rkvzhr77g52ex8s4yhba0mptnubhw5to9gq9e3c9t9qhp1qidvtonal266vj1caj8s5zahl0monrrseke70up8nooo2ovuh2rp3ne4vdlls1x56ut385ujmxawz4ezwrr2bannorh585f6j1me71olfi6bpn72zyiaeywaag47axjqpsph3x4duzfj58mlpm27nyw8llgu81ri8q2qjwyfvvxxxmp5fj8vgfa6jdicu0fbckgxvz7gk1mb10sli4n5wh6jusmdlzqkspymqt8rfg4i8ib3h16uwt69xfztlgg4yrijj90l7zvtgfr8db2tmskj818jblmxioztp5ivn3y0xjzy44dzx0pnck8nnc16zicj1k1pm7tyvjjfa95swu42ncie4an2w2gewz2f8b6r2ju3ljniy25ojaxx5eo68qvwtm88vr9i3wyk2dxly9psag1ggrav9sm9at8gkrk0qkkcs219a1lr0e2h0tzy8qufjkpjrlyvzngufcju4ch6as7lujzf53bbi36vr369d00iea1xzww99o5oskvadpo6h13gstmnw1lrj2qhljww0vbo62s516pge2xzqvoxfp8ypkib7cumydemoc5dotwuu6pla8hd90dir2hs0723ymih3bzmfkz7wibkzl7g8yxpkk87fxw5m6n5akhh77g6hjsjo',
                fileSchema: 'qfjfr8016l3335v3zjx5ln5n93i8nzi1vknrbjxcvi4u57fi5xxb2iuviv6mj5ro8on9o43bu3yynlhg1b0io35elbfbhep6e7o4tek53wztfrl0ekgopyudvtwar1z0gli15anl76ani1ilh7upwsaq5otep4hj68g82p3n6ga15yffvjeuner6v4n046ljvgrfrmta86ok9goe2nxsquwyogaj48xjzsqb7erfosq7og81nfnx3gxz9hpwfl4ip42782rbnnnd0ahremtplffqyxf4scb06zoc7gvcymw4o5vfpdnaks2ad25dkr1j5ijwssreplzwo4mwiwya7vxd6frnpb5zee7l49p8jgre892bi6pv89wqou3dj2gapqo482hpgxbw8x5aeyngjqd0i5vcco3k9ac37iqaii7ovrr0kzxujeuumdukl2ops4ezl2o3yeeicbzgpyokq94urcw5onnw2rgxujthv5np5mj4j0x025129e36akidtdtqat44ln7q30ctsqm4v1zvw9qkra839k6wyf1leheok36xuot529j1fxg07h390doxhj4kfnhkruomdxbldkcd1eqknkkh9xkb4xuv0hux18hkleaj1gmhrfo3uzlvficpqqy3x7mt735bexi999bqyckswswls6p2o6mbf77gsv44si1dim6rgkw0y6i0uny2yhf40c1q4rujgvrai1wpomo25oft9k6hgihq6vcm7kz42wmn7kz0cv87eje4g8mw5kbmsz6am76ta6st3q9o29tnx1jvlafz65lgp2rz0bt0onyd9wca0o2gyhtwmgtfeaqv5si327bau59yq46kjhxqsyk8khusbdoy80h2961bf01cclvr5aqz4a037mfwst9jes6lgulimfv96eq6fbkjd5dkeyb70g3cp8s62nq25zfmz906l5lqlzocm2fm8s4prxihy1y2c6fyplb34xyggfgir2o46gmkmymrns9ackftefxuza1gmf30',
                proxyHost: 'mc80k90948s51dxmkcc3w2bdf81d528kr6udjrvswg1ks9cdf68hm98lmant',
                proxyPort: 3190955578,
                destination: 'l9dec0qcujmqnsyllga1p0joo2tmwjqc1ivybvrhavj32cav6yghyx07t8ti84r082b0pj1ri34e9q1tyrd07z9d550gwdni2z33um2feb02xr1f7vi048n43yab0naadkfufipa7st1ohhbz9a7b4ezxgrnd4vm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '43k4c08gkv1ce2l9hpfmano05u486yet27by2k257oswhartx5j00r0y3duv7oqsmag5fixeauq1ag7jnokftzfdvy4ll25kc14xr2pijem5de3zaz833rkkyn60lw0nuyy5hsgdmiiy2ke75cf35dgxw0y7g9n3',
                responsibleUserAccountName: '1qln4tf57cbflmzg9045',
                lastChangeUserAccount: '6n7xzjao7mwalffuzosi',
                lastChangedAt: '2020-08-03 16:50:48',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'zbtqvmwm8fg2qbj7ut1q5tc5l0rd29qlyyxdzrp3',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: '0w5r0dtuncquk3gstenf6yahi1v3hthoprvn1i4gy8sd1uooaj',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'kvopjpwu6vtac4wjxt7q',
                party: 'kid37deyo8ii2v4gvot62joi6zygenylpf7m61w9kbap1jpzj528ey77yrmdliofulvr9zz98szxcs0wal5h4tf4amw8yk5ek0zox9pdykc61zo7nkkb53nqlhclp2fbtursbn7rqhx3lmi3rhj03oh30wd3ycm0',
                component: 'iscyygto25t4hq5iapaf9rba9z5co8dosnmpn6lt1niqb9p9xyclfor8e52no3g7g4q1amh1ek87be2haiugiv83p35o63thmf62236qotinxaly6b7ahix7r2pbjxueai29pu038rkli8jw31344ovsyrsc9842',
                name: 'gkhlqat5vuoxxkrkj1gklyd7j54xs357evbprd5l7a9woh3bq0smq1phg3zrbftd9lsjhv2xz4iidelfqdskdu746jkz1vhvmmryw88bajv751tsy29tl5bx78a0ix5b5belq6syed4oi6u8gqmimxtlxuemu2fr',
                flowHash: '7ur5zngefh620t2tsuj56f2daltdamcik3dajwaj',
                flowParty: '70lbtoxzbd64euvrziocqf5ccgvr80l4wl1b5cbknuazpm2o0oujn7hijowexjvsdskbgqnhsit5docohtof9xy8507wnwdp1sc217dffhlc9c3z2q0qjj1b78pizbksga9kw41y15626e1uuc304ccoxesr6tpg',
                flowComponent: 'woerlsg2oc6a75qdnr1zpdic6hostqd21q5tnt81t5rel221xawdaal4maob2b0l3gc24wiqxhytq2pto1udqzusy5h4ilp7svau43k4pvqsgu1qplw3jy2sy5ko0xh2jsqndhq4e72snhddnjhm5wv1lejd1tol',
                flowInterfaceName: '7qv5526lv9krfz5p6fibay3iv5llqb45888jvct3m9wa3dr0lyhd392xpnh26wj65t1ml503kku8hqlzw3wtasl174oj8v7gnnntjck32ubj2l9nq1b0mjh5auon4l0muzw2djuhcdieumzgm8bv89p7txtsptk5',
                flowInterfaceNamespace: null,
                version: '6vuba0y38i01b98jzmmz',
                adapterType: '8ftjbbjwzlfky17ht3yw1x0p1zb6werniyfsyrszduoquxzed5cey28vzawk',
                direction: 'RECEIVER',
                transportProtocol: '9o0n4uvcwzw4118b5cq6yh89buw0vsylsidtityil3hygxxparttk6k795m5',
                messageProtocol: 'rjydzkdfivsh3x7d8uop3xkubxxz5vazih0amz9flc9wu4k7u2c80izr5l06',
                adapterEngineName: 'jqtn07zgedrmgm2p52v3kk5f0al8d9r4t8gdy08yilk2uk75yjlx7q8q9q2ycwm04krygdr1w3v2d6ueg0ibiopvkybm81timlk3bjsjx7n6b7bx065n19l0sf4ajzz78dvrec6nnnovm1mf2xavmrl0uzl233em',
                url: 'o7kvjspfrwzfkzxrfuysenkr2pv37n4gdg8eazeiertwl4l7ph94qv757b2iagxix8vftaa4t11a94zo0bna7wo47vc6xgeq663tenyx7rrmxddfwr5dhorr1l6nsfvjfn5a1aep3tfulxsyzec8tifd4rdcczzlvt1w83g205hv3vd2hnmq6o8glc62m6782fgurg74q2eajdwgggii0eejqzu5hz5dw6clpji3utq6zlefc0io6s0hdfwrkfvu0my6buysjppm5i12ye6vjjoksat8sneidjgc4t2mh95t9tzc9d2i2mw8iljr3brk',
                username: 'fzdd7mwtnn3e3nyes8ngu7aqeqefc79qmhj5zhgpgaeqhb8qbip42lyhe0qu',
                remoteHost: 'vib2zfktwnl2kvwcrwy4g6j3ly9b5o763zm6cmtbow22ad32ml5phi0ggoiwngu0bnz6z4pj54rycwc39x8m9q89if37kb3y2jjivsj6n2yhp0picpg4jr96xgpxaorcjhx8lywlo4k4glquncncl20hu5skjvh0',
                remotePort: 2337045785,
                directory: 'c4iq8i2eu2lv3nxb7yks8neartpnu8wh37uu5s7j5b5pedy9drzjkap55xu05y7a9wozt8pryonznhdsyhv4qm61vz7a95io8v10owmlam4gy7ks057bs0q6an2x7cfo80ztcg3qqscu7wmwsmh199xgrsfpupp2su6fivrv4ee79gcdkdo1cm7qgvb5p5vnm83zb6czpto2t8qjg5wh37o2nt37ijks6ki4b7lvxilw66517cq3zg1qg5poenzs4osvy904f3ftbkod4wnmkf0rjo5ssfn6oi43dhuczj7boqs1wyalt5qsh2b8ov9lvrmds5prqp38555aquad3ocut6k04fdq68wfpni5k5rtqbzitqm0pw5knh76912nhhmb565antxpdwi0mdbryt7bqrmbbzazozej0fkt49xax2lfj48ovs1o3jsh030gw8vwkhf7vysz353enfpkjg89r2kzanf7ascd0cbn0mdur5r1mrtp8agy7h80gpaqtexbg5ttqjkyn49dtgeif88gwagjf7qh8u9om24k59683se81kzgilyt8v8m1v6uljhs7ry981ctkycnp56ikguawpi261o3550aia7l5ov15eyybyf1ei9ff6ovg219cmv0mlaorafottd2kvsep4l2mt3634yi11bfrqlinws6c1ak2z38panaz6endaoncxjoz519q15y62z81h3c05lco14miyfzsvescxhp8zbpyxm864qfcfu61s87taht6icogs5g2i2t1jdbh7wa320oz0go6j0vacfb6fm9w33h4yi87sot2s70pip3v8yxx8c41e62ll753o5rgkwdq2vp6fpcyzpg614dre2zkpslr53th1ybitkoa4513uhe4l38t9qc1v990yudq1b16y473pgzodkzu5sbg8gt30f9wul9370aq8muhu0kg6r8045da3v4ciiggqv48pu8n6c32yn9qdg91gij2j8pvudmvll6yxgtg3vj94flsq5o',
                fileSchema: 'oas9ohqhl3oxcw351bzm65nburbatekju2m66c3dkdjq4q9t0gifcnp906nrxat7ckze4n3m3a3hi7hnhz8ohnanxqqky4cx2fbj30xuvc3rgzsd05vyvgoy59qpym5k6fpu1miwmobaraqufrs4yodeh69tw3a8lxsbvim0ukgbt4mvnx4gji7grmlawbk0hnf4wp964yi17upfmnlgyg2ws7bju6menghnjh5no801xgyw1sgragfdvlaocxp0bk7vwbwbbeqqkgt4ng7ztvub0h3wp2zpxyrraorg3rcbeq9kxybionnwj9anpybksfucx5kos47onvm324btcjmdhgl44m7tos0jwc110z7zq1fqhmaq4ur82cr9f20upk5yfcfqap08an80prcdw9chi32knnsorpqxg0b41of844fp85lw40obamvnthsl3oatqcawj5z5x28t64k15888l5hgsp83pztlwylpzdwnlo8g5q03gbomsf3jroxq2uiz5m51bi7hkt52s4gywj7nil6rjtkr7dswp0h2hk3xo0tbqvpqsh96n5fz8ln536oxu6nvkvn5zh68qumrb4a2da14l3kpnq2ucxvkoquww2ver6ue5eqovmfbkb7lfgqy0cqzd9xkq4b2q61xr9l4aqvytfxhbn5psc9csozpj84sbyfuadmavxiypneclfxgymq93k1jidorm5k63gwkb4vx4fihvui36oaxopqnasu2onfupb82w32no8npdimrigzwlaz3gv1zi3xk9tb121bhzug1nwa4zgpu98jkdarjlz8n53o62u0caolhd5gha5wq3dflajr0mxalvcvk253x6u5cnpsyhs21kkuaja1iua4m54ssx7g45h7w1204pk2kjc2gm8zm5m7n9bsviebrhlhma8xvph01vvn5i6eu5pico87oh6unf6ieuyukmaeta3lqjwzcr0jx4xbp671ddmbz14gysku8z19mgtlmgzc3z1g1vxz7ax5d',
                proxyHost: 'yo0vb4ds914p19r7nvye0x36wm8yluz7a5ei9e2lt3dl5zi4tdbwj8dcr3kh',
                proxyPort: 7630377258,
                destination: 'ppmvrtbbqgnvt1i7csutpo26wqcwpklzgekeqrk9y4yr4d476os4gcv4oimyx5t7yhqbwh1yuvgc7r9451765fpl7ib9cz6yku1g7v0h7uv4dbvezab2pf47zidchqb8ts1bnitzput4s9qwi8ytgcrm5yp49ccs',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rjbw8kzm285pb3anz0k6ockpo35987k7prk06fzrlw1v7b78q03huljxyys1nz0kot45tsedrl4iizblx09w8g8b4zb6wsd9pcr7pasbf1xkezkah3e8ikrl25pqa4dxb9ecsys6mnms3gxw7g957wvynz9mbtjl',
                responsibleUserAccountName: '94j65oyc6yd00fna4e42',
                lastChangeUserAccount: 'l892hjxtpiovqt7zkvy7',
                lastChangedAt: '2020-08-04 07:15:08',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '3caufgu0mdkmr3szwf4b5ps68j31cnljxl18ps1m',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'kmutrmg8f9mjnlf1jqlbcdb2ag9df8p4wiqo0yr7wiakdl2uly',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'rcai89qgzkyf0uii31be',
                party: 'q34d2257x62u81u07dal2aj5nnkv2fa0ya1fcw1va9c9lrwsr74gaxtwq94rpp72jasyjs2wous6mxoxchzv7cou6izph3nypdkr9ric91awvtt1akypitj93nt59vd3tfs4ome6mezplees88nkbvowsc7n520a',
                component: 'jm9l9iot5ikiynnv9t4xqggyp4mb9xd5v52pist0fjcky0uc8rj2wo6090z2xetsyjm8qkb1hqaqir4vk6qsbcz9br7c36nj3b3eiucx2ijcwkivou3339ut4cwm6fh5r9znkqgh7h8z60n1sayhqle2z5l099s6',
                name: 'ms0k8kphwvlbsmlcxs6ofbkrlmkg1wxhfmqt8nj2mto9w2t7taznv0dbt9aasw6huhkbss5ouahkn733uu65ldfg7kij7v1bdumhxyn77lthneataftt7fwiqt01x7h9etalne9pf1wqbeboq7e74oq85jd7t4xy',
                flowHash: 'zb2lux2178cednbb65ctzevtmaxslkbmjb6czl7z',
                flowParty: 'orunzre2duhm3vag6uifbn3a22w0jqqyi4c0xqmra2b8vhj53dka3y7vmqxzhyd79ddlma0lxmu1c8p151avhc8pxps5pdjbejladyk9hn80jo253neug3rphadmhekzv4tsjsd0y16omdaed1xqba0a7wil8s08',
                flowComponent: 'e06qzo9e1spp35cpztrtd21pgg4rj4yky39qr76zhbh3yked4jbq9bknp2os2zp05x8e2aj887squ4bp1s1vnyui2gapslsv2otr86znmeni4t7jf8icnt7m63u01oqn1toroj7howsvif5cks2wcze6m3n6604e',
                flowInterfaceName: '5nscnfvrdcm4plivreu4q64e5gootqeqatq2xljq9lbioq65wucxrrpl396uwtx39ffbra02alqac555zpf30fe81nj361mccu8kkaegnpj6vrrh8n32rxy1esnh2i1fh7usqbt7957gfluxdxbnoi4168o9gif0',
                
                version: 'sjhdh38r43rkxo7qegd2',
                adapterType: 'x7hk6d4fuw83sxrubvnkdky8y9gq4ljm7ybuye8hw8cn3olcsbz1b0wwnqkd',
                direction: 'RECEIVER',
                transportProtocol: 'ktynoarqvw9vdqw0vjjtak0aqkk717w6xj5v63f887tkduaat9ybpqdplpj7',
                messageProtocol: 'oxoe3c4juj2p9nj32fy50adc379gosrcwub5hdxuy03qky5ky63kcc8grswt',
                adapterEngineName: 'f3x7r79n5uvjy13r2fqfmfsy8i5rxb9agz6esqvhmm69e86rksdxv3mc3srmc53apc3n6dfffuqmngpra3tdkbkdyxkoxezer07hgw1fvfz9cmrysz0c5ollmiieyog51dlrd27jhen65xikasptn9ayjuxs81be',
                url: 'z44e9qfsghfeaiafqb1omzkzziwt7kwdg0fvflefjru34akod8tf40if95qa3v6ukuz62j70s1wh9cgh08maeyfk7gv9jz8lvq8gx7rdphksqcemoqv6zk82zcr47woutdrzkn5amfrwtwcv2mtrsa21jfy0ovu792c78uuhwwhyqak31hsyp1el1ubbi45cyuzex38ik4b9bsxif0jks1m0m3nrgd2bw3sd5whlkm3wr27d73yk3ilazd5z9t9tpv0z7txzu4meuadc4qmd8v9h1rjhlrku65sroq64tqq1uy46wx440bqpgqtacsxz',
                username: 'tdew3oi3p2vvul5wzd2ulmy3zpsddnv9plhusr3haz8w6vr94drx4z98neu0',
                remoteHost: '20y576lr79wjthp7qbyntfk07na84wuozdzznpnl20ptqwr1lm4nv2l6znliusitrayib9dt0yxtxc6ugz9vrcwui892udae5wnme1oc8llom4gg0111vyh7fpuwx0v59gxkbetryyeh4bgt5sfqsaq5kyig76hi',
                remotePort: 8995504013,
                directory: 'k20fpig7wwbzrb2n96rhp4ayhss2lbj34jzvyd83vq5d7uorigljufm414t2bf2xwmqe23n1bwqxouhpqy8oywhs4bggp8mgh1zlmnke3w48xwmgna5qjqridfwmjeha45eytbhxv8eo7x6harqpekn2hocx67e3syeyhl8k4cj7uote5df81kcd7dwn5c96doi9wkfu5ul401isf9lggex9wnykt436siw2u6bf7xv4qyomv47jkdndbg3gpikvdo93zd11o6x8kge916vdv6umksb8rdb7h60aehomzq5rvlsw1otu0ciqz1sncv11jee5xkud3yrf9mftr3ncue8kgchytfj6ag2ujvaynvgxh2gtb8fo0335uywnc40x94re4rus87328zdq16ahclkd5ieuuz90mvh9s0d4ntelp8vzdy39p4a9y01n4dgs285w4a63oecdol5gej669xwts9kaciuzyvrlzmchz4noej3a3an842502iwm6www8ccgpuwikr3z5jotk48c3mto8qol1upszarja7jv00gi3vv4f1f8fwpx3f7vo4gqpbqh42yge96305u9jk7l6olajoaabis1q2whje7v6e8f8j0c9setlbg8r6jcuqkhicdxdvh2hlvnt93vrqxl13kmnmek5bfa2vjcuni5xv2wqfncr4c3sja3p7pwk7k33uvnvxqqm3xcool2a0eb6lxbhn1zb80xfrk42fdf36qpitvms8jcyheoks2a6j97qhlm5j0uo1zrldl4057ckxt6bi1bw15skphhtfyp6lszhex44vq0potftjzmzydfvtvcz88p2y6p8ga21ia5tjm33ailqifzs0viv0cwn11cnwt1f7rvjca0fnpo6miha7bp6g8bnu3xg3dybzlx8kbjajjivjafqfb3tr4aaaturtlyobh2ti9u9q63yob1k77n9qd4q8f6rflucc2ch5prze74x12ew88lvzt2xe8lrrw1w15iv1bdwmjlwzcf',
                fileSchema: 'k8zl2axu2glyj17zu39f371449qaxzm67hc410nisoc8blidmdw0ssufv6mh1lzhc474j4f7na9vihjvd79mcx26anfzfw29es106iyq572i4y1imcusi5m0dn6a4q4buvbcm5dl4rgki8cbo5gu1m9hy6u7ns4r4hrpeuwdpw2y0jo9tf49zno6wh008ovse5aim17lh9ixuautvmks9gtux3xhup21rwb0agfkya8i65ag2spd3x9hg1uw853a59m4k30ppmduo914v4g0x1auko8mjco17g345figicfp2kqaz6wntuu0nzkdudporxujasgq89291xw1n65r51a7cxn0mrj6zcrk5yxs01rqy1tvyfp99l9aais5kxanns5veti5exjdgax7f2d6o9pc9ysef1j5oy4fvptxlyh2zllntg6hzn1vyl5m86b9hihqeombo9ahmutzruuzcbtk7xqay3gyjn8qzemuc54gnefsf62iuh6n0wa9lp8avz6dz829rjazv6p49lbusq3g28kzjy0z4lm40xtv44f7remsd2f7acfhbb8d7owf23ng80csgyhk3z0qhtuc1ttws1tpz417n5n04djjvd7ad20bksmr8es34vys9i6e71jr3y313xi0milo6hlc96dmh9ecqbxh6bz7to0qrxtqr7wj4gom95ng6g15rmcmvxt9bkh1gpbtm715vopo5j4sr8k6p3q7zfxq17ra5hxqz0t4v71lez2magrc0qvdyrtcxmpslwup2zbrln95fwzv0o2d0dwclgx96o0w5t39yaqc2e0dq54vmbhry8bgearn4ds4edxopl8zm5gqj43jdk5o7eywo73xm5bxur4y067gjov62s414sb0rx3ixpeg0twnmuqzhvpvmqjs84gp0xrjof3nbd96ealqlqqqsgywjqou6mwwdzs8snz6oslx01hqc574uquqyvpk4g1sy4afwzy8dlmyrxbcqjtgztjw0ppf7g2q174ab2zs',
                proxyHost: 'giebjse96esg4x7yzcplxv2czju13khiorvsaxeu6221t2auglzx5tszderm',
                proxyPort: 7689278859,
                destination: 'qdhun3ljjna7etf0txgp7tikl53zuof5dgy9ff0hlmc07r8mtyjsludsd4d5kx3z6likyy0cidgyx4tb206xcrp06k1mt2trx5npw2cs2fdy71114skocllivkrs3ct632by06bgbnbgub5o21lk5ce94zfqnznh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2zm3makcou5mdasa1s7s9khx3ry6v40u8y34g5ngn8j560vc25krgpdh1x6pqr1qq873xa4d7n4vcq0e95d38d4x1vi8kkt9iq70ncr704ctpnvzk9f7vhgp5xzj84l67a5x26uglsx3babho65ypinezm5nzhvn',
                responsibleUserAccountName: 'li7grzf37tkyoo2rggtn',
                lastChangeUserAccount: '8fr2zwl2jfuu3lcdn7qq',
                lastChangedAt: '2020-08-04 08:38:37',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'uvp7uw0duzejv8onbkvlf2i54ybvj6rt4pxapui4',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: '64npfvsu7dfnd25q1oub0tn0mr98gbou3yrwbb9wo20ly35ohc',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'l4vzcl2eu8ohun3t47p8',
                party: 'dilp1dj7kfck9kbnmem4f81q8ptwrf7b15zji3c5q7eqt2oyhltzp3b4cv7i82yuuuobujka2sngndhsaluleeiximqa5l9vu12am813yixh5r2vm3t7t9qo0xhh5v2ei6hykpars7oz9dphls9yaim5g8zpxeew',
                component: '0qst2tdqzdpi5jr32kkpfjypw9dt98xjum3uam9j2mii5wtvy4wvkap9er72wg31v0omyirjo3qwc6gr7dwvp4fj4tpi6moqxapxs8l443bkarv35njbbwsg5m0w7mxyog8a02swct0fzw8a881kft3hhfv4oibo',
                name: '4pa7gnxlatdve6q7i542o61w3tlf29ffeqy0rn606aa4ydtohj3l5rhqzsxwguhaunoc2uq72vjf2di2687ceg0t3xweiter4491ok9qqtaetujbem901hdvvyfe4olwh73pi8ja24aqlt1nn5jtbq0sxh4gu3s3',
                flowHash: 'g082hvrlj0grhaugkzrk2vy799h6mxeujvg1kl86',
                flowParty: '8fq3f785269t45e7f3adzcbx3oc2829t7grvo24dbckrn2aa6io0b5j4bcfk4363dp0exymg4zsz3x9x910ptnekkbu8bp5oesryxaob75lmzsmfars0gxxfzph1x6q0mx4ulcjb6g5c8oy5joya4z642a7e8cxn',
                flowComponent: '5ua302gd5ts1jfeegoariapugpx9kqp1pou2ctjmyr2ckx3o9ylqbb8sjs0qke18aollje1levrndj2305uv99ca2gmk6xyt2vmt30xz035u8mqjpskx809mj7n94demwmvdy12zk6qhcnmfv3r85v4i94v3r386',
                flowInterfaceName: 'oawuu3cqkw67t3eeitjn5zf1wy0rgv2j8t3iss6p1e1if50g34siej26godo1rwp6h1lnofxq2uc3th3k53kh8di6h88hmbetwpmxpu36xl5istcom2ucz1ss0ljtuomwwkle78k3g16s1i57avu5gst6bupalx0',
                flowInterfaceNamespace: 'zqqtq8jenohb2p4m70ktbgr98wk95hfvzqgnikhkuznlnp0zcw7x2eaevn4wril4oxtg6wm1il4wl6fiiqcqurhd4vcqun15hjixa3lj7wwslp9035jzrkldr0h87v412ch42sb3fdebj4mt7a7jz2exbnjct8a9',
                version: null,
                adapterType: '7rxzyf7gslx7lw4npewkxcx5zsue4wj82w7kkojgcbrjqa8xiztptoggmeq2',
                direction: 'RECEIVER',
                transportProtocol: '5dovkpqhug6c7fkkw394t7ifb3x2ez3sb1j3gadd88ktgca3gv3bushr9n5d',
                messageProtocol: 'axm5c5wcdoeme57836z0zf5atga56q9lsdyf72maoedd9gey1p3dggn68s9i',
                adapterEngineName: '5nhk845anls0e23j2nnbx8u1nh3gb6mghtficdopzzllv22osaj2a2mcse4mwpnnbxk27x93efwtef33edvfo711tivlyc1a5jfy076xgszful9f101im44bai0qy36x5uwlp48a0m5m09ta46qmuytj8t3jq9i4',
                url: 'hciv020skrv5tdunkhp4uxzgix7m51duu56hkyyas84lhdguq09wgqt3kjko0bvksoivr0axqbss8dib1lais2fw4cud0p5jxeipe8pp2zmtvkh52279ajmt8w344ia0rpkmnxvguir3lbrfknebaz36h29560bo3wrnt0jx8k57vqvr695dbatvlvh98fe91tyhj2eibisqjbcjo4vk7sdzz0pm99lumenprwkr15oazjm2gg2mgmbq453b548zie7fqw6j9sj33ox4179ov86fdzpj9ag3n5i9v5fywbta12crgn4rep98boplbvrn',
                username: '9wdjcpyaxlu06r00t6b7lnnl4wlzp81mv8wut6e8a0tr4yfg3yvv4hzlg7t4',
                remoteHost: '8a47ypf55ip0kc6vx6a3yh5gbadvh7vu0grg3czbc98ww8cgmkfvc9pc9lvba7440inj8mnu5j9fpij42jyb7mn91ysfb6tvpkp5vli06tsq7fe4n7y5mfepxfkjpruy2m20g59wbog7qctw0yod0oswdbx6c1i7',
                remotePort: 2923388895,
                directory: 'cplwaxjh5fdeuybuvzy4795vf785werpyukhsgq17jgqlnjn4lzv2c0whjf2wz77qdftmuy7ho703k3qevw5fwmdqndj1xubwk43pohomwr0tpgssyd8r6s8p49p807qypj1t54f7ypgkugdqbnxhnr0nqkbc2cvjuyhefwa2z7cr0gf29eyu5rbwbnh0t5kxjsxov1klg3udkudoo3x1qy7za37yefo0g82pnkvo3wxjycxw6pk8tqlsrlaqqn6twazq57mxr0if0cyv22ygbfoo4pc850f1qqnj5yma0wgz0cij7wneaqg4rsre40wh7okfa9liu8e8ut0ny3c99w24q6777c3h06myvnjebgq7urt4es0i2z5qu7rcikpevkusoa9eu9g5pd300trkv9b06ygxufvz8tmcy1k3qgszy5p3km9wt3rqnfldkx3a8en0zqinwtbkga56l1qwurqzsxglv81obwb28rjtyt3jw8i61kmdxeujc9qln26pqkx9den33y0lym004l7y8ezqh18ntjhcgg5m5nc35elp57kkwj39ppq1k7i5d9fl3wll71gzglkzy6pjbnptcy44cpnsmjv55c1u1lb4gcy2qr9gyjn99cvb0l9p92jhhsw7divo4f9gp5m8tjpnrvqhad3ricv9n4ahvnqd4j8w1yhr5z21w5e6oc7cz6u8ryu4ik8kcryveexdjht7q08jqgaip3sq6sc0thum9kg21c6sv7kxs1im8sqtwwmqf8pni5xdoosqz4col0e5oy7aw4o7iqwdshb9nsbndw11t1vlj2yto47aklclvgehkkgomyzmmc92dqpnvd3z98ra8fjya2nqs2mtgz60f8oboiiht1fshk2r90cr2aj8xlqhyi9ue146unt8jio5hq3m09ekehbh0v6xio51a12jkukzoza1v66iioxn0u1djv1sa2hgzom4onl3kbm96phr567eszlqugjihh931enfv964mkem8z2o5al0pdr',
                fileSchema: 'yzr6sucgxq1c7n0qki613lfvabrf52uanjra3fhuwdu8mkjhxwtsu6o4hzx4fol4kih2vob0bmx1ux57abvy8e0mvn7g5136bspru5nv1t31jatnl8yen2f156wl02mjqv42gh9k9koyi25hqewscgdzt0d5m01mp9yxc12py0ehft3zuy2bwxgicq51gflvjn6zu84n6kry4uvn0w139q5w55f77ty04hh5gfn0m8fvv8gfe5v15w73fcrzh7gb2hhud48uegp621pl1oqislslta5m8tz3ho551l8b52rc1m9yizbz0ll0imp7rrs75piwmlbgh0zpyor3abww9fnjgdh60h145c898wsgerv0fgkbi2f5xf61gbyi7mm3vrn6v38hrzyz0ja8x4ar9ucff3h538ns16gcz6ilsskuq997i8c0k5bhxoypmp17gytyh5sefgxl7crg5n1su0jgxdgfz77ndw6bd7t8o6n1tn3q9pt4ceyddw1y9hp7j6u5t47m02n1j49ngy2pv69mjzgstpcd47pybmdh951tq4k4o764xb5kliw9jg626vnxbzot2b7zuaf1w6ej0n7nng4d0h4b7961v8lp2aii1683m6vsxw1a1kaneah54isy8gg0vte2vbomg2pf9x6wle3wp75aqdqq5abcug91mrtpst1leiike5fk3yacxklalavgi56t1xaswuwmetkcx92tuwakbpw95wn7x1fqk8qy2uifymqsindlhf0etwgcqaqytd9vgql8a6tig629dt6utgibm40vs8hf3chkup1gy8cywgor5ypc9kyft7bvaa2uroaogvegc11ge8osjx3vwz9m99dnjqwitzxjwxzdhp22ogxorn5zzuebuhgyus1s0n11fq908385zacmx5glfmiatbkmdyis5nj76q0prftgqwvzzkdeqts2jv6dkzc8m7uptinx2wpsd12f196ifufb8nanx5qwrfdar5m5hih3fl4z6gsulrcw',
                proxyHost: 'df4u8or0dfu73sxq4qhxwkm88zo1buqo2sz4fgs9kail9st2seql1zedx1vo',
                proxyPort: 8465428852,
                destination: '31ylps0k56dd2341djcw1oypfp784jok3kbu8ihklijw27a8wodt4pub6f7md3504x0p8sy16a782ucdazyhtn6aoxad32fflmqak03puzmc78d6hqn3opm414ltx4qcfcmnme84ysjulv24ja4jokt8nfyb8ns0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ktkoqph47oxrskrw7y4bksq9ihrynv5hz45ngy1lqpjc6jlu49qocfunfxbgqhws2hk49fa810h3sjmro8x4vry2pu8wlc724y752ubukwxz6qg4ah767td6x1a067gr8dut8305d53ac6udpc9wnaf1l6pl0m6y',
                responsibleUserAccountName: '7d0pws42d8n58fg7shgz',
                lastChangeUserAccount: 'n5wclh14tu9qm0d1kpre',
                lastChangedAt: '2020-08-04 12:41:59',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'y3mtem8tea6jtyf0t9i7gpej1w68camuy6ih97g3',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'oc6r9i34q7ca4p28zx002jpy6y2jxjg1rb3l9y8h887m8c4nad',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '7qlgm04pta12k3o2784d',
                party: 'otbxj6mwob00v5kj0ztexwtrfewo673o1f1fmpiv88g29iu1g3saz4675wkiz1tgt49rd7w3qjiutaybq4x3v0l8dyc08z954gwjvazl6ln2tgq62ptnh026f1kizba20k2x2ump5voyvy1j7g4an995tdm3r80g',
                component: '13n0unxxsaezaw69worba7nsj8ug2rlfj6yxgmxw8358opiuxyh3vdozpavno1753zcwe3959dla3vnx4cs5uqu592pjctl8vuqf2l3qd5ido68fqlsognui144j96zplsx0y0rumwy3z1v5351v1qksubbuwt5s',
                name: '2yxx1w4pzcgc7ekkjxn92vdis4r46tswxpadqc8wnu3gkautqv5xpr1etcpclcml4rcrcwriyvx3k62vdlnb1gl8blyhn6du6cuw3mj2ebvjzvxsab6zs73yivs75miz00brkpznt8i84x4lfo97037u2j41767r',
                flowHash: 'bwbsco1d6809qfmlzgd5hvd5gss3lyyb88c3vu4u',
                flowParty: 'csy3dcecbe6vtrjse6letzt3j94x0jj4ycxyw4173md623hz1kilbxflks23i55ytuxfm8c5o0lza1witxmty00idoc1j1cgukw50vd9rk9bm8nf3yr13c2c13qsikw7nqc5u1yh6ybmcjyy3w486scy5w3n79b7',
                flowComponent: 'esb0o00zq7zzc9v6bypmiov0oecxnkf4543s8a895kl15i9a4ts15r5cx9gi8h93sq8qqghkpnvs788j7ij2oe69lqzgl1dmwakrfxcfd5rg878iubf2itd1e1shau5o1fdymmzvt9qqdwv7t9blzgw51cf9k7lr',
                flowInterfaceName: 'yav5wsu3lk34vlote8sn2o35dzebbvy8gptac0r1xiq997sx9xpeecm8idnxg8ul3jjd6s97lgekkv32wx23c6bc972wm1l3r1v6qpwdr5u1bsagncrrlwkzmidga0da43nvy5ugenq7f92mmyyerwvgo98uu747',
                flowInterfaceNamespace: '466kfkne39luz8pk6x5y0mno2z51oucdtpylb1iefnm63qc8982zwui9m7d82h5ao76vlqq60d17e0eau005yv9vsxtcrco42do5fm5e99putrd1y7gdn51p9qqm3z3m3a3sa2bbs8c4yf79umw1wcptzoup7l3h',
                
                adapterType: '1p9zxihmghpod4ompz3zy8orfdhkhpszbz6igpvs3564rmzwxsnctg3wc1jv',
                direction: 'SENDER',
                transportProtocol: 'mir3281esc77b40eya9966hd80yr7ecrbp4ld2n2sxsxbtoskmyqu7k08vet',
                messageProtocol: 'ltouuxeao0bfnt0a9f3zeraqogcoujjd3v05xqreejr32xykpmvlomp3jx4g',
                adapterEngineName: 'g9n88o9f0tovqll1zr6aqs6ms79kzeexd3pq4b81j06pkq60pjx5m0amwzkjxk4a0yptl6yvsrqbmwvrazk2qu8qexk3pl2428s4s923gra0vxxdvu680hrl8a8mvnmw0262x7rp2m0hpzp46rchfjif4k1cxy1x',
                url: 'eu06osb8zg5lql96kk52kmq648tqof7stsbhqadavfp6nnohtw7guq1r7718raf6dwvxcydgwufugtmmwtbsd7l9c62a38olw93fm5abmh1kb1sa384ah3l36yshonl0yznwnbayddkhu0x1nqj6prpi5ro9rwo83s29acw2xcig83ms2n22oey84c1qwpzjp5tp1kd4wflceqj0f8gxk2x6kuzeis19rjbo1oxhvu78tyyaffaurrvfwdmtlo3ekupdebvjiydxz1g4wcgqz0noxcz1lvvcb83r2ws4fdb2vl1ae6nieaqmik2pqw9g',
                username: 'cc011peosxn0x4xn7r4b1yota10ro3amjhv2v7ex0svnxbahbxqthjedahjf',
                remoteHost: 'f77qovj6z4v08he5rzrviiniuhdz73g0m1dnm7l5h1wa216s0od6savv7mmx42zha2k8nueblnuq8x4w5ye5an316zdjlbxkk2n6o9ifqm24lg4raxyp98wutzb9ynq9wyz24l01kemscji8rfkg8gph628659dx',
                remotePort: 9371017532,
                directory: '4cz9yhdfnr74a09pgvyifvmmrvhnz0976s3v1lyhtuh0ndb2llyn99nh1myh7672u8d08ozwewy3t73wl9s7g6ij4ltk3zi2y2r1mzqcghho6x42582vtzuwxidaf847xf3nk3zhh8oocke41i01h4tnsor67gehunu0g37lu0ea99ylg0ilppezf5sn9uq593i0hcpg5w7n7tb3v0qy0aq48stykxzmxuj4jnuln2drw6rd32wjbro4vvbt1rvvftxs48no4rtr9bhgokf27bmgxhoyr7zxino56qtcvcxmxdgf3v0jee2gshpvfjbvk67qmxozwnhr7zdvk51cfl40lsionw91tks9xzmbxofpre1uwbv2nz0m8jzipawc3jdct6ap12cvjd89cv2j5q4lvtyu6eagrkfu671y1znlnv8fh3c1qyqs0lng6hssioh8ac2eva2perqmfnc1izelko6iifzja9aqtpvxk55ucqs5y63vdax443cvib8nmxp4lsi9p5a0m8mlm50g0ch7bpmnlw62i0halksi3vu8jtmumc0lqfpri2nm9t1uhlicl7fki5yzrgjb7z82rnr1b1lwpcyvkei0gkg0xdrrwvbywo0e6xzm9bo53ula4b0a2qes3seqbunbsjsdckgepbrzo8cu8582wnz9jqd3z1dk95sou6mfn9kk8snra9efuvx6vllykvd3qnspz1g1tu48igemzd4w9xwtiue9tiu5oqa0lmmpwlrymvyl14990lc53x2tbwo126tnrd04ps02yf1syanfx5r3in05nrbh93hgujr7vfgc2dcdikbltb5x216q2q52pgwrph381r11mibx9spdhypq8s430b9wtc7slfns7fy28nztkjgvf84kbafnbssanjxigj1sef73hhegedzllv22l2xg5is7ia7rkd2m5kyn25v7j4x2dzor6fxxzeli0s5v0zcbyi9cb4o7x88xn3h7oqokumis8ijbynzyvsfto4mz',
                fileSchema: '4yv0v3rml864yr0j6wt8oopmnxrxf8n15vyt0g305riow5cxh12qpx238yulhf4wtqdnuysid8jcsq5868sdnbaoiesj1algk5ho9z9qp72l24294c0driedbdjy5q7dqikmmm36demhj41dzl8dcdli4uug300k1m5bodle6gys3nwqp16wi4rswpfq0qll0y2o45z042jhnperc781qtdj6msxz2w7ohpbr3smeuqy9920iyxlp5i5pzne3ojdeesag5bz9pbmbw3z7lmtcmciphmp2d9hfxin0bw2a1dlcmzzb4icip6prionmd7gpqqi3iig6h45kdaa81pfwaw3fad9vy5gsigv82vz0wkn8mpunlicwz8mirvucy5ickxdwn13glinpu7ujss3atkwe2o0l2h6goyp1yqjkn6h2fo69b4ptoxqwk6cr7axno7ghxpvqtiaqqq4bwk4i1l78ab4ncbvpesx2iptl1owj2eubl7bv6glgzrsq5zg3woqfdlrlbh7fpagrs77htc8medhubmiojxi2qpxyobw1pmmyg4cyclmpuvusgt5mdfbcb69ftsf6l9ves4rlbjy51m7gnsqzamap9izxuhpddo51yp4z5drqqs5uizsp0qy9bd49x5x9sk7p8zrv59thptx0etzeo9gbfucu8qmr8ezh7gslgumvfjetat23nxku4uf2z9cq1b78y72x9osmlnqdfqhpoj40dkzpxjsw19ewvz90jd0jbu2psfxcg42dgpa17jpmdfmmsmx4lqq44hhapz4qgxdtuorm94rb89flrmpzsim48awtruqhiucop3l3ksgcnf4qhusr30tm5b8tsoyhrrhrlju6h6c1wnl9i6af3o91xjpa8sig8n5qlpf4ubcihe2ce33icvmkt2qlc3kbc78cl9smsidt93chonbewt6pqsri5h3kbevq8difsn49ixgr7hgmailnutf99042ysajux4hull1jx4xumgyppy6yh8r4it',
                proxyHost: 'rnbtflc1ius68pskl983bm9v2vlefamxfr8fwcq0otrrmu0qn218341ofrm5',
                proxyPort: 3933286224,
                destination: 'flab9jmyr1q3ml5bjy35dq2xx6is5xjslhq1yp5bxxf4jbc482xu7534h27rv53i48tw2r0h6quikcg0n9uaghkkyccp5tlhz0v056jjt77p3lnujvmtu95b0mfbm15mft9mj9ojl7asgy9yk0f2asi6xgbrzkfx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'k1dnvtpxqb9b6vnx1tpncuaumi29et86p70ke5a8dw9p6uqr6ri42nfsx8a4qj35q3vkya5uydwfakprefzhkghycp9k6wz1hrjztj9wazoiw5s65c7nksfmzmfs29mjm7ryvw0rv87fwf7lu4zmn0iy02n0583e',
                responsibleUserAccountName: 'eiqwx8jeux7przc6ussb',
                lastChangeUserAccount: '2e5dbf1lvfu2dfpef5k8',
                lastChangedAt: '2020-08-03 19:42:51',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '5k16uhl9boac56dkpdjcsiulb8954s1nz3al5dhq',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: '393pl2v6xxidv960onqmkqxcq87dgu3dukagfk4o2805165kna',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '8pdq96z80e10kfcipobd',
                party: 'oqwho4gq90tq5spznlmwfwsfgtdnh12e0k9qoqmmlhm299vt43ria87a5tluxekxezydcnk8mt0n5yfow477hgg7kn1cv7314qookhmz5852t1s4csso8kmdezvr7jdsac4c5kw2wsh9ikcdbw62t70qtxmrsx9c',
                component: '6lu0qrzwuqb1j0kwlqxzntaxv1cuxuq3kmis82fx2lw9ckhzwo7mfsar9tio7dbxju1355eif7vj3qcuuhazzdqxt1snwl2oyorpg13od03f2hunkuxnp1hymvnwgn70v3flll9zk8h20z3k1zc6duzt2sggaqbw',
                name: '2306ijb3spnt8tzgmyknv7txpc8s31qdoxq47eb57tzg5unwss7eq84phrm4dkzj4s1cmm4e5axi0yvb7kfle0oz5ln79uefevfnv2symy8ndg98cg7jyjh434pscg6jvc3goguaktc2oi1cvt6hyp78nvs9rqx4',
                flowHash: 'rjumcz2b6by4tkic9m15az6hgoz8sbbplqwspfug',
                flowParty: '708e7yjr71z4ji9tbw3vztlu025h8e9o12pqrunnas9s1cs02whq58wwkh1vnhm6sexcwg6jbx5i3gg33kt8ffykajf5wbv32dufetm74chy9kx0f4ytpsnxa9h7b0kgxeb6hbose2rphqnkzjovp22958o3mb3q',
                flowComponent: 'nj127dyb5pwennmpd0hst8h1mmxste9ngcxviyt6d6tja9b7tm5k8174ibiclevzoczf96j6g6x1nyltucyhtlzwa6kahbn9xvwzwz6lby49ckzisu58d0fk5butyophd5er2nyjrjwptld1z80440jf3anmffdf',
                flowInterfaceName: 'ktcosir35g7nxd2wgze4t6ny31plxpn0wissk25uref36yrgos28bb4u1f1hyc53cw0qdnd05rzymppxprarnnbnptbrvcux8rfl69nesl0qu5x3kjchc93qdwp55y3hmcj8gatlmcuzsxb63tic8nerhxjrcgmp',
                flowInterfaceNamespace: 'wjoipjzzxsczmeovmfwi9rzl7z0ar1m4b3r1jefoqbjpsww8je8fyhlsncd01i8dcnrhy5v1e8j1lhyzjxlo2em37nm7pkjbq6ct6hlwvoepzpozjwdqk7z83zlisj8yu5b5sotsl3mnwiyz9xt9e8vnkv4t390z',
                version: '0dunvm9lp069acezsfv8',
                adapterType: 'yqv1k56i30kzzjdnzc76m04a761rzk1qcs3x6pu3e6564ojbf7ciz7febok9',
                direction: null,
                transportProtocol: 'wfxfc7816xx5tzel0a3n8txudt7cber1icrn0jbaecll6eoa8r427q29ol32',
                messageProtocol: 'ozh0gwwdvxr7k29jvl7m4b9auaxqdjaxvjvca6kewlou0yv4zc8hy34h014r',
                adapterEngineName: 'gpjbguizsaxd2i8qzaz6ajwa6qrfswau09ds5m371k5bwu72hv4en037yyz7w2povar6d8l54jdh5gp477um7l852vsc7jrepx6s7rqtnt6uoid39fa7zzw6cewvfi3ar8kex4g68copcu5em6laqym7ifmexx1l',
                url: 'zfc1o1rgoibuwbe2absfc6omqs4j4nkuz8ixlz1d9i9jwac94xie604zdas969gii861dgqm8sgwbbiq0hfi55o8afmkqqcsv32lwks2pd0vg59f0i2hamr3rzalu5mar8a0gsarkzqq9g0879ofo4rxtjkswhoj7obx0qkxhf98x9qp1m7um4sfrrcdbgf8qrujanmu5wpihtdzjvlqxkqp2gvzvy69hjixr09u1pioy7hqrgok86lc4kp04xryathkadi0q603ykgt72raxcugiahuh5jdk98pxv35uiz6906gq2jyd5lkgtubmxyh',
                username: 'n54lddun07sy4085vhd0dm8kcrwcxelk5lb2bb6mxcxrynq5lexyk84tumfx',
                remoteHost: 'j5kfjs2m84kmswcc4p3u1ato9205tgqrle4j6cayiew6zqo41q4002hr09i3l1uvb27yfcws4rkafblj8ua29ixm2i6gkztulsa3epox0oaj6y4g12r4q8vrte78o30wu1nozfu3pnjzkf9z4rbm5v81i2hvtoli',
                remotePort: 2807522899,
                directory: 'kykejbstowzlf0c5wnus9xnsdmfvmllvoxzg8jwly2fz3hrmoqaswyw0dt33x1xdbgt4lneke4gxg2fi0dpfxzoy8qmbbkeiu2zrx7809541944n6k9fbzs7u35uzbmk1g1xaxm5bwk9m0krzsy7yahll0kvkmsbn28dsrh01fi079ngvb5ibzs2g434e76tvg0wijvvqivnwbdapzn8xjfpjf4wqnrlx01lcwileg03fgkeg2jwmjf0t30eyo88bnbkcczz9lebg6qxp562kmsieu78xzj5awlk1gebcxolhg5523p5g5or3b6ad7obrldf0k6uii8hh12ykcpwiu7di3g5bnhl0zwae6t4h28qgko323vg9ji1ykdvy64qcixnxzgpxsamdaipaslh79ag3arcow0nvj7e5tqqxewmgxbrm9r8vj8oz0xk41tot81ab0a6emqj38wxq72lzm1njak2avqz8e43xjebo99a4vq0c37wqsow2c4b3unr8n2co2ysqyd4dvo637b0prlzfzl23tqni4gpsmfz2oz9b8miwquzr21t8ovb8tkwe3wgx6xxfvt6n4luj6iw9k3kdyrmtbwbbszl9fyt2iqd4dufmbsrj9mrxjcilfe783pqr6l3vath5t07cw87q8azbz8ufe869e2rrb9x42t6osw8sxvpv4bn3rrhx2au2qgg3oy0pcx9wbgyhplppq3j0q6l82hoqdspg0f5v7eqoarcqxnrkd6j05afpknm9m0b105xyit786s186gt3qwi5md5nzdks4nvf7pfzbk3cbz2o4nzlli2y6n8cwrux5xog4zfbspr5v0169vh5g7ncsza7gvsrhhnaxz2ceszolxdnsv44dxbhnpt5zcp2wnh6pyga3kc4uhar4syertk2usae60cgxuy6nb4essikcr5arwyiv58ogso96329obyqdnneeb5v6yha3dpzvr4k86j14l0ufrjdlpkbykh3gz9o049ziaf1ug9nx8r',
                fileSchema: '9fgz1s8z7g38a9yzsvz2q5qtmgqvxq2x35sbn4wvc0hlzyem6q9dj21xoj6scei99yo5da4agwapbq75ypflfth43u4mjoacqr4qaabn0h3a7s7laoyc66fcw6pza57f848wa4ojs1fd4bbujbw8dezsctjob9rhufacqad5529hfed5idycepwtie4avlt9pra35514tv3v9z1i9mmeggpim5cfznei2j87nmhuq072tw5n5wzynztr98rz1tj6m5kfp48qtr1ze7vfk70qmckk560ca74g0jrtl0ihe0mwzn1irodltvq49je0sx829lpixv3s7igzfyipmxm83kegwwhgjyqxljl7ou4x9i2z0cq5izdx2llg2a703jy4zerghiee8vz7stfbp3kmsuhd22cgky8tnxhghlsj75dz1eqfn7wipyq2crkjhhqls3btw8rzay31dd1pxx7g0g56a9ndxlixp8ii3rvz4qixpwld8eo7ribyxmzmvqrh566yjd0r42542kovailmxikqueq8gjs0xkrck0izkjflqxzrwr8h8wfljg36qohdu53ufxgskkkxhjpal2i77dcr1ksujwvwp8ir6uv9j7gwvu02g53jaxpvfkdm4yqyrmcywpnlkuxitv9sg9wg3giayfqav7xlr7tjpcrdqkoznmvczaql878iir5pm4q5le9k5usvq7mrinwloe9of7s4mtywg0orb9xbj8odxbftcfb0ebvewvemdkaw2j5e55n9m82xoenw426zwmt2bww8xh9w75zlpqiwb02gl49swxezlyzo3rmakc4m62lftvb7snrxrip4w9hatnlpt8pe4fkd5ij6xihpqsbbv0md15k546wzy0ps3wzfytxi0nmv0b90qkjgfjeoco1rrkfklf3knvdmr6wk067iuqh2dbxowqy6poke8pr029p9a4kufxp3a46bh0eooxp9i1c3ntngf4hzs4l7w63uql05cjmi4yhockfnfu3p8hwy',
                proxyHost: '9hnf02xfpital1kforf8hvpr41biytt9x0xrfjjzumzck0n368gum1mubdlh',
                proxyPort: 2403405303,
                destination: 'bvxrmibv9ajjso66974xtrjmxdp4qhpjvyndsj7iebpxzllu31kbkp4irrae4zxuvvsiuchtubwhypugne2nw6w5p01ixuz28quhl0piama656r5239d9s7shvvv85mhscquf7ocvy9iezj4pzglmfeqxnjg1eif',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xz4d995rn0jvwkyccqut3yyuvtp6ubkxwqo28llo9ko51p25ew8rbwzce2x9k4rclxzdw26jd3uus53p8ah13ci0fdtrg8ys4pxtmex0wj1f3rkxg5pbnsnzpalyuarc1vgkexv9exqjzsrc3gz2lp6q6n26ikms',
                responsibleUserAccountName: '5ugcq59ysjx9a0scqghu',
                lastChangeUserAccount: '6kpssc5xejc3x2fvrzga',
                lastChangedAt: '2020-08-04 01:10:31',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '70tx1765mno44fi5ac3uibg2jdv71vlzmrkp6zib',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'lyp63jnzwcvytg16hd8n9oilc0gl9b90wduvgym1b9f9u6r274',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'bcsgewy4x9fdoi7fbqwf',
                party: 'a8cadbedoat63ymxq50xmyth8jnhpu7oja5b8t45aq76k64l0qy3wi82aqwb3yp9zkkxzkwjcewu8o71pc2sjpfzn21u00lc67hj01limici47525379k77kcywa36beasm70xzra251s7te2qww8kuuy9ppt1y2',
                component: 'dcuxpie9g86459tadz82gtuqzroflmq1ckkzmqgkvfnxfy3vszrqhfn14fk87ot5d6qebol9c7tzu64bqlbdy4qkvaja8u4l88o0fqgza5nv86u5yasvvh9jt36gvtsxb9whdfles28rrmoby5w2537h6tenhszj',
                name: 'h158b1zhql0lrkrxflbhgkqqkbdte7uxwzn4yesaauyzhlm7r9p73ie6pco3d6s55wwlsyklwswu8ygrvkuah0f4ks15bbs91sn11y2g991crxmsoths7vyqdgcgvkozzoyfeydwhgqg7tn87yf60ivnc13e80h8',
                flowHash: 'bjy37vwace6vh0rgoq1659mg2i7tuot7ilgh4dss',
                flowParty: 'ux17t69q7rl61sipj5w7mrqdey809u5sceetr600en9lhn2fb9mu5z4je5ogfdb1v094t2fk6gbpqd8pm5xma7dabkbvdtwb7lwlawwy5k1j1uwo2qyckqynd9duy0tsha0nls56uhvxdaj6y9px6b3v5cth376q',
                flowComponent: 'lz4az7pwh7qt2voxu2bfe5endcotna59td407scmlrpnetq9b9y2b5igis7z4kpo42ny8g603g2yyr1do2qegs1259awwsr19r0320s9bruxyeirrbuhobq4lmgar0gptqrvulquwrfmm2cxsbqgfgm64k47mv66',
                flowInterfaceName: 'kdpwum2u6zoxgsyv6wig1hplqrigwcypvxxpr82covwdyy5ng9e46lx5q3h04xvknf2oz7c9yaqmtldasp3kivvv3gbolrhxa4dv7om9zdi7zrt6ds0obx3obskmn99sqr30v6rkvvrrmgoseymmpkdw9uzen1ka',
                flowInterfaceNamespace: 'gqw7p8eq2juz3u952rhqpp5ydejvnriaoa8tnv2buqxlsnmirhhdwyjzazi91mgk2q3iee94rm54u29evpal6ru3mxpixx7wf6pado0wj9zgk3i1rkugikxgk66bi2av2deapuun3dur1pgw337gjhywrhysqr09',
                version: 'cg4gm8o523k5lss5go5z',
                adapterType: 'x810a05rlk6qe512arqsq173o7na17nw1ru9gx03r2q2kpkzn7r69mnl3sc5',
                
                transportProtocol: 'hhtjqdumc6qwh6cb2qbi2fqzkzwi82xgxkxx5eoxcty4k5dnybgvu28g9jd6',
                messageProtocol: 'krr2232v265k7n3ue8xgmky9kc119c5ep6n2qxx2177ycgztn4qhc24jjuh8',
                adapterEngineName: 'phwtif4j80kohxhkbl0j2qox2x4m25p0kljeb1p9byli4552yvmyekx8r59cyageu6cu5ocveny0b2koz2zbnee7fsqr8tm3u9idsj8of7eo026z0ofhhmel64qs7tkaxqwdai9x22i8mxzuoggds28gwkvqccip',
                url: 'sjzkt0nful2p2y3gyz8kwnh4c1wn49wnm7nre18i7kiixdgc6skf2xkbls3k2749o9ker8jrfh0d3doby9qp7gyrxjr5trcvfx4wghiq0z415oyvbzrcscasolqb3ufz9if2w17sgnjwhyifzrsqpxfk6j09f7j5ehmt3zwt7htpnr4qwye9xn4fkg8my1gzan5pxzm29lx4n6lkqoos4v3y2lkbpsq8zvosv62o9hmo5tcfomtx3uuf8mflpsx3orzroonpogcw2e6niflc03sautadj7d7usopgau52u5p1hbuyva7e5xj3gaz8q5r',
                username: 'ohmls455zzoqhr9yb6iq4sbo3bi7ba15d5yyr0woeoolutzdig5onrjaq806',
                remoteHost: 'bkhnb3qxqrvwtp4no6e52r8vu1z90nbib8g6liaezhn7rfycz6e8gbdpo6npe2r99jt5jml52aplt16l9v5cqpuf4ydlbvt48vlwm4djrip48801hhcf8lymcnlxb8ryhs4zn0gb1vh2vc8xu13rmg56iz70tu2m',
                remotePort: 1357877799,
                directory: 'wko4h6i2izn2xg1h7ffke0tmcn48crlgf60z4ctleh2v2af1j12a80m2p7akzcqcm2cxty45as6ved9wkd8yn4xsturl7et7ik7fslngxrl64kvnxegevwe6wgf2x1hu1d5l48j3euw3plr52ewjofxsh40xpxxdt1zff5o83ka730sv02mgermz7w9cwoaikpdza7aid9tl5l5uskn5qinemgir1sg90aydh6i7zw95vjdewyzly01t9ieil18args9pigxxnj0c0cc5kcek5dru0up9fsumitks2yrjeayt2zc1v2s3kkcvmq1fh3otbq6rntf6ljnrvzt00vstw8fm2tyzcoas80b4wtphs8zmz01tfh8a47wlm3px1ssq55pnwxayqttc6fifniz7g773cb6sk9ohesamxjm3596hs2mikh1gz3n1wwwii711ssuto4y3kaqfd9360inv2zy5pkda95ql1qagxkn2cbly3dzz5p3upur1zk137dpq18wx9kmq3dv9okr8yvj570eun7azwe2s1f6g5p2y1zo8wwyruo1pt0fjxh03akkg4fzthrzyjeb45nb33llz9il5u8pgpxv14fp6i8k8hhr5ayblgfew2tqyhibjjjtttxcybu5l2htskovlmtazc4jsegaribd45f4320eyrjziph5o8z6hnt9vjcem17zrpua1mfky7ye5p4b8kglf9mhuedafkq8r4pgebba9hepe5v2x24qowagms3skukt26vwjrjf9et3tjw4cnuo9idsznol5q67tzrp1ka1aacold0dt5gurtkwbdxitxetl9bq2cfy8bkq8myn8x8piwuvhsc5exb29e5sgdunbqpsjjpnc49sbrc3bmoob99ib97wa0oxn3kvag3xeibet9t8ltbvbu3kojd9s92973rlqwrzszn3ooix66cdewpupliw0v8hy1ip860l3jvrj8v18t36ehszltdk9ylhi26ddhah4pqhos934qczy4ix',
                fileSchema: '7gw3ke8eyh8yd36n212fnec3k2dp21kbun65wsm072xxyb23eqilrj34z4b87vsecjrfd6islq0v40pma2tijomd8ca60jm8rw5ceqlg0xohx2723ik0r1rft46tlji51tws5vzr5jxwk9ba39eu8pjwl9shvebxuomxcj6d2yu76hnqcne36wrm56jgrfgju3f5m2a5xddrl367b1nuuv89oznthbhpy962vckwcj3lcnvz1xh49m3upuugyt52cg7heanhwbr5cmvfe0q989p6j8m04yqhbe3tnwklaa16amjyyh3b45o2eeg2gi9cmqfn227mqnzfquvm2i9ev69stv1s388qk3lie29tyfby3162rzzfx96oh6d2a9lz2x8osjbofpf84ocx0z15qlpheo1xl66bizatg38qybom4unrfepchrg0lpfpabwlrc8w6y7hadhjp4zez119v5wafpkx8x4sakyjvfqlsn6s22y5pk3anbh4rcxnyzvkvls1us8ohafwwy6ry2vpm4ii81yk1cnf9f3j0d14rfcxpr54728ueog4gyrhvdmoo1dqi43t168y14qi4ud6hpw88gvxqlrfcoxsuv5qkprwzxyai1mtlm97ubqpfih70pi6sfj2o99uk3pkf8uo2c3s9z9usxhfiy2ohydi84jxlzb2kj2hqj6rhoqtcl0o5qxm9gryagxpewq4ansefa38mv214bz2olaw2b1spnfg1l1zo3o17rdjld5vt1bbon6418vw7zrm2yaiqr2l78id0l7z7xluvcye6mvenryat7rmi2hal7t795jzxftpyqlpnrdhie46zu0smzzhti71xus13weju4m6isnk6w612qzjfpu388ntl62p1na5hr07a3m314rsppmqsq14ryievq2xd5mvc9fr2l7i3sy6gskvh7l2j1elj0jc0vwp2wmqolktw6hrwn12wivptp9rbeih753a6uj3ro4dfcbgjw6odb285aoy8qasdque',
                proxyHost: 'qpe74s84o9mcr40buqkoafq01t1o9n0uqnwcvk5odlzo7d3tadgj0m9rx3sz',
                proxyPort: 5159459943,
                destination: 'b0abkqfftrkk3ctaphp7lq8tp06lqu730v3xr2m5lmetpwxpsx8vy8zt8z09b6zjx7s09jj7jozhuzd1984zcf7b3odebep8wubzuijkhbubm00sswa4oflmim2za27tie76mx6r5b98b0scisgylp3ch1sjty6r',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ho0go6qz96xp1bptovmgf83qru3wd92d15i4ozhcw7e4orw1c9w8q57u2xvwl2qtc2rtz75ohcb287vz9s6ha9ning29p8fsflrq5h2sij75ybvf7lw2qzl0xsc5rwkx7w47owfcew8sg5thna6ld3web9r6t4lx',
                responsibleUserAccountName: '9gu1vlzkf4770f0aydd3',
                lastChangeUserAccount: '8gohd426jk82qidarbde',
                lastChangedAt: '2020-08-04 02:33:20',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'bhh6zgfp83w4zcizpksnld2ybayqukfn146ickz4',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'atp8ii3h0gwal2euelbqs6whvsyyznm395738fafsrme8ao87a',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '0iua3d6u1un1egfjdqhc',
                party: '74n8hsivwdl45eve46327pfucsc3io8swxs6pmpawprezotilt6rb5i9vvu840v1tfyj5e7wssplht95o4hkcntko92emaih3ihfsoq4ipb19jsf9tyj6mw4zni8j6lzqam6izwg7gd6o96hvzeiqfejhaevyndn',
                component: '5d750pym76rhqmomc0o0gkv8fmvdsk4kdj0py7s92f6hgrtip04jectbk9g7evgjvfu30aantp4hokec0w0o5olf5yv9526ue3fa261ecy4278okc4rqw316xxywq0lz4r3htomtu204cpadz7h7tne8lr73d5ma',
                name: '4qi4cshjvd6q92a76cl8skh6eak9d84l9j92lv0c39yslwdg4oq9nbgxmamqqjwd084ffrr7f9rvmszu0xn9m293h3clrxcu7720c8a2s6lf4rv247o51mfqf9flk9xdu0mvfcpl5pai594neu5x9okrdr2xauzb',
                flowHash: 'bs837yrvu8p3hseqhbnrgplger1ujmh1wqwz35ys',
                flowParty: 'nz4xqhh7rf7gucvo62nvc9ra9n0lzc3xjnxvr3lf78nih2ibthab11fed26cg3muwrfs1fy6m6p52pvo2y5mrb9yydbt7y8ebxadtfkxhrng3vj6m69ug260g2z1ztbnp5zpys967b4nwmvmd3d027nnq5qtw1ky',
                flowComponent: '2qp8g0cbaxykjerudlnsflv6l3b5i2uv6z2btatt247ivbgpxq3vxiu7cdchv2z1hk6zsm0f6ewcfpux8giq03d2n527hryxiugyjn7io9yymlbc6dutk0elru73lotk78vrb3r1ciw54dg4fg9ahvb7mej4pggw',
                flowInterfaceName: 'n4ui45qvi5d8q7axcaudnw60sit7wdde6ccpaggs6b2deq1e5jf8l865mx2xwezry2dube75uxlnncksgh9oy2vumflrwnou0ea8dsipjgh258bjvani92110aj0nn4a24c0nifanjn9rky7a25y5seh0npeuxnx',
                flowInterfaceNamespace: '8rq7zv844tx2v3y7ujziamzy05xue98n66ztzoxv5u2ppwo3wt9t1wbm2qin5mq4khfnts3up4fc6wwoxplrzujxclcdwwxcity1e4vvh4umrcci7divb9c1fvpbx6c8apr0r8gocrfb5n10xu9ym2zkgvy4mp7w',
                version: 'mfdxh20yoipozbaoz2ow',
                adapterType: 's3c7cbwyg5xpnqyd84c7wvj0o626l6ueyxx9h62mvjdqzbhqted33ejsu4g7',
                direction: 'SENDER',
                transportProtocol: 'plzdrs5s58csp4rox45vu0qlchi8c86pzdsd718yyozqxvz4ybwuj4sjtku5',
                messageProtocol: 'nz2reh43r6ubafvtnco1cqlolp8xqwk96h7dnsp2eq6euzmsbahe9hstu4xh',
                adapterEngineName: 'yo98foqsuk8ao3stz5vnfqzdyk9oi0fuw0jfq2xmhdlsge6umvz9m6dmqvnpasqqy27cepanqroai2gz35xc6z47ppcdwj8zody298hmxnd2t4ch8xhcnptoyblxlva8naxebe023a63jlkflbt6cindmz3u8c14',
                url: 'uqmpe1h4nk440r6522o7elt361v3db5qja0wzsaxychyiq4rh5dop8zl8nhjyclhav7el12aagblgge7ocktaxxwoi9mrvn8wbyj9pz3r8p7jtnghfzu7s4sowziikz3b7ozxmir2vz1ir08wht3svz466jk1g3wbkdsmyfydnmw5zvwkfm5sbp8nbpc20qexch169ysy6aptnxpclbbqdvbehne2mtvi7cwlmisl3sz9qbfh3nm8ek4773u4uw0mhpy5b6x3g34f82j0pi646zzm6wpchu3rd0gxlx8e4rtd2ed18xnq2u5uye1x6yo',
                username: '2r2we6l55uyjiw1bk3fwct9dketxvq8pf6huy8ggjjlt5820i8suthml8gfa',
                remoteHost: 'z31ilmxtsqehysoc5geatzbuwsbh7ddz82fe1ifqai6luk4o91cc2knof03x7er9u7d7paqnioiu252e88ltl4g6kp79x2ashkfyaulpe5pc6h8y7eiey3ug5leoa4fycpi4nym1oggwdugmad6ib1gek5kt03hs',
                remotePort: 2519169806,
                directory: '7o5x2yhfcwl5fvfdjzii6wbhcijh289evts7x3kpkq5fx827l8a4rsxi1omkkj3bfwqn331s824mnukp17icq8gw90fho0oi10zxq48qahqciqinp1vozkccvymyui07u8f0e8xa2pwtga0evjflggnydv39ooq7hh0oz1eqng2jyd8zur8br3bv8avq2p73b5mlw99eft5qsf0zxfcpvipac5uxq10o9j8ey6znfs7teg23mpmvpes7qsvexuk08t214aztcbxj9ly7uqy89wmydtav5ldyvdn6e60qtus27ntxeplz4so6reo2mf41pbskz6tew98cl5dzftumc9exuol6ggs43vlklneeugcxe56zs00k9c63kvnmfumkznq6dp3d922l9wrlzr1vtq51tel3djlxdak129bkck3pu4bwnoq2d6e7euacm24a5r6ulnddie9m8q1qb2vdfpiexjyo15t001co80nnrd4qvpmfa4igb0o3oamjw14glbigbn9k1b4gumjus98x3z19pexgfyhdhevq9zl3a2owayvdpz7ey6e7et3kbioe4cofud5gghhh9ud14i9au4up530nxrxh3q9o76lldll2dgaapdbph7f5yp1euij0t1oorc5iu3913xpvnnug76ytx1tgwqldptqzcq0jw7clk8g80e1riejv6ma30exmacb158p9nud6gg00esv1frk9pkpeooo9us8zp4sgnd182zcb7w0p837f25a089az7dtd9cek1v6c4qqclaqgxwlli3raeqdec8l76xqq8cb6wocb58u1u20gzpxe8ppwj6opg244th4bqajau5an9kyxl238aohx25z7pko8abzb5kiilgq91daqn0b8tf0shfimipxfm1s9322lz6akudllbjzfe7vqpdrqe1tw5h8nzr7rvo1ic5hyhqoyc4auqaaxzxbgy4q7xgsq5qvq9siay1ju8pj4odvn7auyqlweuoqjtua7oatdt2zrf2dc',
                fileSchema: 'r955glbryzngbk8issau8qbjtvnxwuj78ynufpij79ry3et7509zdbahktokz5d3fyi2i6nf1uwsiojicz3855f1qi0q2ynsigcksjrj98eit05e98enb6ktamz8z9p1bi5fpvrohxmdqbnv7qhly5ke1r3dgqvf7eywpsd1ro07x7scxa5qheysokgrwqxzbff8s9zvolrwdky9xt9jftog66jkchpekfqgdlnav7ri8wydkxytdzoe0hn51m7rm5fmn62vue87tzksgu95bcybchon0rvzvmjeigzzq8jp0u7ijreeti8u5zwvvwg2t9wvgwlnb396ze4d1yqn5hl3kxez9w7jj9u4b5ic3xlmy80i7py7q27kev2624ccfcmluc1diucxt1xqkb3754928j7exmlbzwdxacwu53fd3ic4179ez6b2580383t73d9e0kew651t9v9q2s9u20iuvuzw8nn5h014ffx5hh8w4bfavhw88t5yz2x3e05nivsac4kq3diqzd1jp8r3vwbfp0mmh8fbiwhes2bcwhlx2bsxbevoqj21cm39c858ox8tzzydv8f4b7ibzioklpo4h1qu3p7r2dla91mb94kcxeiok931vueqxudnsqrckpuf0q1le1a846d7lnxddix7ixx36k0qt98o97y3gh1mz9tqoszru0ngyaqnhiey4xwt3lasg8e717aa6ez4vuqf9a55e5ixp6obnlgd46jxe3gb4raatl1k2wwydfu32rvu4v14ajbxka6gv4qy43d12qesljgrmri64bcwmbjh2arsq28q1tl9swaw05ugmq2ccgjsq0wtdsyynayju3p50r0x9s221maw0hpbxm43mtt9uato6rnpvm4l7e02wsdoyhcvz98myqv4iqk4b1roukjlatq9w122ewhqoils0o7eluhc63aa04vltmsi6rops4jcok0k4sv1maaubp3lnuno9m5drpz101r0ebm4uudjslct9ztmf70u4hly',
                proxyHost: 's497ah0fyltsel0tu2shfmhwo93ykw0vjtupdiyc5nbzzu4vnqtxd1i1n69b',
                proxyPort: 1244309279,
                destination: 'xx08y31g884pf5r7dqgsg82x9rq1u0rzdq8p6zxr8z37cb7o05mv29ob5wmczksa1l7evpqf4ubg7wkw8m0pqvgfgx1x2xctd8u0cck1jt1m60zea1ikeauv8cw5tn6hmhsyrz2p9m5jlsc6vsa5jill3a92tzkl',
                adapterStatus: null,
                softwareComponentName: 't2vymcvu1ena98cqj5tabyfo0s2twrlkj31x81ui31ugwu3968t0yuq4c9wkvj2uhj6i30bm5a035df84z2wv5hs52sphp1ayilp2yq53oy7656jt9qmtokkcfwrvw6s7ndaqg5kcp9i31r3857i97pdzcpl7flk',
                responsibleUserAccountName: 'sn4ov6r2hmg238f69xae',
                lastChangeUserAccount: 'nojs9c6ecd4vp2ra390o',
                lastChangedAt: '2020-08-03 17:40:27',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '58j8yn5y5o26p6qox4oo7m6bjz4eyjyioohvisub',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: '399rvitfief0dkckf7wym9jfqomlo2l9fwvf993slwzzz4x5bs',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '8tte8r2obdgbwbf1mvh4',
                party: 'x5gyylikdzgbjlg3vsa86vc2wido9on22n8gjm5ymij7sq8sc3q3e1lvqfuvxht4x3hfarehcr4kbvqc105bqrrch6jsxle4t1ls41odstxx0l6ekz02vewsjk726juk6hyzbvt0laha4j92tz4cnnezgxln2k56',
                component: 'm9r1kwx0us4jf74irc3l7see6eqcnqfuhu9l850l29yjlx3m1uffly3ssuyrnvlm5pvw53rmg9d75ihs7ddncv2qx9ihrgx74zh1eeuad2f76b4sky4mbg91kaeethiculqo16uwkqm8or8mqwt9hpqkffk3sk7y',
                name: '9sm2755p6zqv0jkjtz37du00mqlfbae19b5224lz6x90v5nl1z2h5645vg29ue72c69wut0mgthr0jzvka4xyh5aqvf4l9zussqu81ijdpu44qiv5vnn44402sg73jfkrdzdu5kl2tvd4cznw34fzj52rj10wwz3',
                flowHash: 'g3x9m0wehem18hqd05iymyrmssz7hu1g3eb16h5n',
                flowParty: 'hh8k0313ktslqml185jo0xk3eamj12bxx53fz6nfxz2ystzppu8rln82bh6bcb13iq88mf6apildp62m5bswcu42uk4o54tmx833uu5gvvk75fq1y0a1vcmjbn2hf7ln8jsh76uk0uqxlhokxth3gjfu0bfvror4',
                flowComponent: 'or8bj8ggvip3d4xys0rw08j6s0vr4dswwio5zh2oi5jy8feq63ioqan9bx5ipb0f64drzjprqbamk34nu9oygu6kj994lxey91iwj655g159uw0itzdmfvoshfniulggtxx24mah53fip90gcl8zikuyzpwc8kay',
                flowInterfaceName: 'dv975iw1qcfliz0l4wwgkiklegowa8idqmqyt1hjkvcb15gtdodwnu4ytcxd9a2o95dvd5dlz467yi8jml88fbl2otm7h3w21fnqmwuvmqj64k32sg1obnjdqulyzcnrq0fjyk8j5bikq00mj03ynekuz47gkdkw',
                flowInterfaceNamespace: 'zm29zhusr5bkfwwuj042ma4y5z8298gncvt30zvvtm4fq2pnop3n38svnewy7arjpjudtqo5lgpnpl2saae2jro589iyjw49bu2pt9xy6vzm9j0bu45ozle9lwpdsfqqzhb0ksas9d4hgc79568boycugovad3ws',
                version: 'a70lnd0d9tmjtzej5r6x',
                adapterType: '0tm8rn0zoy3jrhwqn0ay0fw251s4047x3ogbtwoqau54c6cdhttoip1lq18u',
                direction: 'RECEIVER',
                transportProtocol: 'wudvnqnp7gbfn2jmgscwza4yy3av4tmmgxyfz31y3bjfv1je6tbgf43muodc',
                messageProtocol: '5qfthis225ygbfrvfl8d6do9g8ry0di2xsq7yryngu9jh68nieoji6gcd3nv',
                adapterEngineName: '1vjpdu85bmi91dcjalt5q32cju661kq9c553rt6f9wxlgqdsmq3g05t4af7g2mg1i974ie5n4lxixbwjclc9a2mpam1z7jgdnaq599bbzaw0a8txcceirti6ogrwjoj17mz7ee80z18y8aiw44avcm6d9x1yq43c',
                url: 'eregim8ofu7zo1x4yu3lrqumuy1dm85hppjvn0d5pzgaajz9szxn3oyaerlkjnut3vcnp30st70ijwxlbjue8r8ua2odotinkfptzysm1o3q02d6rlmcr91u4gytjlxpizo6wgmf73l1za10wgtgp9j8pu3klptz3rq7uysvo59u34kjuqwelk8ptpvbucibg1xvkcj26fj2c136y3o4rulghswkea8gtpcpk76s8pox2qlunjysbclfj6ozxwhx3078xlwnl6tv8cl1sm1hawdeqng7xllvi9zyf0cv9p6wncjw6tm8pi63oyq9qoj4',
                username: 'ma3yhe4l7rbp3b2x0idjnuinraym3f7q4hmo6xbhnzarq0251sh040q4pyqk',
                remoteHost: 'epjua3fe453czaqff184vm8zoxu8tie64mhryvpd29w3aubfyvj7wqvto5aexoknunoc5wxk1t8fs90pj5cujwwk7yk9vp32n7ivjg7w3g0i4p1v7r8kpj3n0ow4u1nenatk9g4cdqmmlv4z084g5jyc8kmn3lrd',
                remotePort: 7528059142,
                directory: 'fxskqju0eokgdliw1l7ivyy1cjy5nqejv4juztrqmm66vq1gjgftcbsk56ajj1u071pvip5neci7iqi4lafilgpmfem0bqhnxlre3k3eqnykcsc1lx6qb2dykakknbycr6xi2mn78v12kiw7c96ua0hsto03im6yah31z5rdse9e9zyzf60u6p9u5btam6mjpg1g8vjrm1iwufcrvmjvtfmczqgi8l3ca4g13jm8ruqqgkqzk803ykcq13so40h031adx8nnfrxkxvn55n3190evm87ofzfxmty3as8o9qyq7fddt7uru2gsvmzg0di7avdiew9jt704isggbs5cstax9x6qg5c1nws378ai427f8ng5ijtohtppse2xkty7xppf91uwcigs9vs8vcfsylbg59zwwe1rzspyom7z8av1uanb4gre3jidn0imchagpjj1lhamviqyqgs9f4g13fvrynj3oo68ir4v0xcfwcsqy5snbtmmz79rz13m5ed8shtpwmjotugd0ovjz91mnt70elomxg2iv2044ud9fetttihg2n0t1wj7yoy7ocy68xth40arfkve5q0o8hn23swgaz5y2e0kcrtxm23x8m957d2a5bmkscs79ubey15wjblekr9rzor6aay2mbu96yey6w989i9nh235hbq1kyjzzbhfme4omsdempgqg9txr7xddlknz6gzun1c9kmiclq7hm0kramv6uu2j6dpszvbg724m2z22vyek03m5yhyahsuq9s871d37ov0uod81tnsopes2v7escivxagdc8q5bmdqkzgyuhpbwmu0qenhd96dnststbwdsb81wkjfhvf63nu9moctelqnz8felywt0jbtg2ve525igcizzrmre6bpalzp8opftv1ad1kxz2jvo3neesk3ip43qy1n3h8au5i9cqhb180ga4xb8sw256tnh5xbvz43b6581aagodr5mxw7sss2p7x5r8tbq6xt2elx65fk1ak8346enoc3',
                fileSchema: 'v52os6r53t35e53tyhwdo8s9mgrl9o653r0xjjbzu9rzrv1p7qea6u0iw53o7xwu3jrmnov17wtzce3gqwt03pnc0yd9mj5tvkovvqcu73x7u9lb1i2ger6jo2wbspnd28tip7cqfrxtrr9fh1l3fhjmaaytqdluvzuy7qv734m08qfbn7xd0ougdhat2b3ko1je0j2w4nl7e1vx25jpw63eub0io1nshmmh9gfjw8l4khdili075c3pgfx57p434k86ua63q4fqsgvx9xpj8mkyx8xkwbqc5ntv6wjz53imjlk7i55ni01eoe8iyf2mtvhp3qlvivh25el5w5auzenzbos4hjmmsdni6clui6fuqwfzjrn7wqc5619fwbjb9k4puples70f6fhheiktxagk3h4smemmppmqtji2krq9zerxzufyu3fuza9chy2g4tnkaejw5dr6lpkvzwvrh2ereee8p7g5y7n7bea97m89om99t0r81qz2labd1ybv75s0vkolddennguki2ftf1eoj952v54cu6dsz34qf6aa7ephzy5zn54ngx1sszx6jpbtc5vskzm37yol1y0meapr6ol0g7i70hylj29pmex69vrfyevt04u5vt9ifq5sjd73o0rb7fzj06pnvcxhxofgzu5enb70zudl7711a950iql5p4nwwpgxbn9pgr9zcm63hnax7bd1j6gv8irz5uuxpvgpqiuoag31ynv0aoljkkwgaqpq5a1zxkwz89ruxiw0cjc9yyml44mxwmutmip0svz4zhz571r47dpg0eoss6mffl1szp5do7cqdenof8qegavvivq7w780qyn43wgikwf9v4e182p3umhwwd8dxyz7wefxo72hue7l0t3g2ow004liesx5x9pohxkdu6n1fvaqnaq6m2pme1xuxa4d02wt9ysubkhcmyh66e2180iqa0bz49ng0y3u9wxssbxt1rkuc6awklsqjykqou65kk3q3mst9tk5tjcarzhv',
                proxyHost: 'bw90q5uaj445n35q1w0z21llueimpfcvgnewvk410pgyntxm6lcmfunow32y',
                proxyPort: 8610551474,
                destination: '94757icz3i0tvh69zdjv7k4wx403hhhzequxkj0qu441hxmz7yoj3ct0qm48jm4kzayh1iltgf6wx3f6s2wpdw511cpzrxpixi7bqeye9fk7wmiyx07znm40v8q4sgozfoks2vzylg8jfjtzpoj2jqkei0cs0ksn',
                
                softwareComponentName: '90vdlgqrist5z1iakrprddog918vhsadferadjtz5zlljahwg09hdsbdnyy0the2ky3f1czexbdp1k137kxd5nmcxnn69y724chwdx3elcjvvsrzzajcp144rvr018un5jgu5ttjuqu2eo19mqgxswctvtwhc4y6',
                responsibleUserAccountName: 'jb3dkjm5xx3m8nu4cot8',
                lastChangeUserAccount: 'b94xvckd8x41mzqf4gzc',
                lastChangedAt: '2020-08-03 23:07:18',
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
                id: 'yrdm2hgdkdw7uv76fljcz6z31pbi9ldhfq5ed',
                hash: '54fndp3kce3fxzc5b1jugr4pjevft5xsmrwk7245',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'sfxyrwsq6wwl4zqfi9fka0y6umrkayw290hwebr43jq5h2m9ja',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '335f4wy48xqgxf7gr6f6',
                party: 'qn58ktdksyjd8nhq0lycssuuadsbmrl4pzc0jdr8p01urygjnpoa6cszzsidrmomz0cpkx925bam5g59ocg4wi9qj0rqopyfttcqa42wxm9e33o5wj9k8c1knmnvzqs9meco4zzqsyxr7hqeo0k3nip23v1c38av',
                component: 'uri4ep4sw18w1hka1g4xh1s007craaq3e4jurt8qw81sdisgzabcxcnxbzb57wyzflcq22um261a59z6uabxon82k8ghafulviw6xr1s507mshhm21asi6e5j5gp6oo0oa4z7kr5emvomms3l13q7oywxlwl95id',
                name: 'zhydoz5jvy17cm81t9z3e4mhcchfp4qpcs76e67nol9m6gsfkzsta99r2zwe3qb6xgk1s16z9cla1mh5ryg41dqe3tke11jh2sddovb1s4jsomruiqsmyq10yg00r6rxsf906ht1dpbsz3jjg445qknm728t0unh',
                flowHash: 'h695h9f7t2c4ovx9s0k99s6sz18h1evjm23xub8h',
                flowParty: 'c2f83ra18mexvc1gxgx692l2uyi9iquxdnujpihavbce7u8ko4duyio3d7h7ka7kqlv806aj78mhe5e7mlxh3y3byqlztfha496wsflbnaz4jgidec0msunyb2bqtytf0ahv1miw540du9n5gujarrk5wkx74b0n',
                flowComponent: 'd5ymvq7gbmipok0kp9fzo8zv1vcmnvivo3wo7dx92biu51cfjr028t7vx7kmiz47xve9rv0z8os08x13mj1n06duwwc3lwm20n2hjkzupdg9ctq02i0rhz5qnls8h6zccftbql26bk2of6e9hw43049o0weeoyzo',
                flowInterfaceName: 'jq2vxtvbbuchxknrf74tdpe8gmpgc3mf248ej7xit0ouky962lo4ayyg9vl9zfujewh4cmjudv9s9rkh00hn1d0j8ed9jzuufz07y0l1nuca0d76y268ecivkjkydpnxicrel2pgzxwd4uf4ux7jgz3glb84sixn',
                flowInterfaceNamespace: 'qo131j6pht75x04p872rbkmgki5uoznzupexnzd4eu2hfhrbkotb2sqw64aou0k66ikqkmp6hbx6421rbd7r6due62i0isexyrhrxtwqm2m4dzodfz6earzmchdzroij2247ziro62t18lrqq67a33v8k54jnocs',
                version: '105d6sexca711mpf3f39',
                adapterType: 'p31my0dk7wvv3krnq00im7a2ck8jtfk18lrxrmi6z5l52xvj6jn22670utkq',
                direction: 'RECEIVER',
                transportProtocol: '2nbb9680u9zgunmvnwnau8w2xi9ejigcnbynkiyy057qkt664f5g7jxzyusd',
                messageProtocol: 'g8egff1zmc4ds4tu91js7z94xr5g3i35ve5wwyfmow0p9gbu42fb7r3ihqic',
                adapterEngineName: 'zs854dg0icsndcj8hg8hf2bssf2w064m2u8i9q9e8z4b0i8l83cedp1f180fwrh4u6zh8vumy7jx56lfk5v0ydi14saloxq75k8d438cfieg8ieq5kj27hm6jl35i4oaubbkfbq0bm6wbhttdhsd4ouz3xva1mvz',
                url: 'maenov3w72wzsvgllshm87bo5urr3j34hjq3v456vkbjzfa4czgi6q8wxtjz2o45kgopei9qawy0fd3tg5snews3vl90rj6j8vj10qivtcy1f0qbuk6v29bbrzcxgmrmmrrfpjmx70dbyz75utp718ciyozxvhkvhdb7i221wfv266zmaq3061jfa9d16bqpk32wi1bwaipo0youl7o6u2gyabumaqd746emwnbqh57btn8jltz417gfd0fw9etb602seniabvimg32qrgl5b75m1dqhg1qt26tsj09zo4kzri46rskvo63jwfxqlzxf',
                username: 'iad7jxcbb0wr9jqv2m0ut1xt7o932wfi61a7d9v7i2b0r3n9orlle2tswbgf',
                remoteHost: 'kfu598tocz2imnic3x3n1leq3pawo0ktiet9cnt7w6jj3ivdc19auruzlsdi1hd7h60i9x6iusaxzt556oi069dk1dxmpoj51lyq7q97360wrrdtvv9rsaruefyebouzn29qszkxvzmcg8i9g1c50h0x04uhmw5t',
                remotePort: 9805132236,
                directory: 'fbw1m8woqhgo85s35o6nr1jieccsa0ckj3twbs99lbpw7xtb45zwyqul0v9tf4jxj7su3nu2htkjkl5rx61y949p3zfgg51fzt3f5wdxwos15of7nhw86317bo2ub05ooxxtx7s73hj6qhd59ibllrtthuhodqautmfyseik8kb2wkgua41t1guyy3x9480r6qa3s7vojdiqbvz3zgerxkhhooma2wkdul8qwvrlratkja0zqw0gwgvh3rw5c68ki1extcwf4hmio37bq0qv3jcqktvdminugtv05ydp5wm22z0fn0uqucjl6kpq0nyecfj1zx9rquuieeajp6nqo28nn160ysad24b23s793h3ys039el48ezklcdqzrk6ryg4vfyyauci4xvbshohwbbx1dzzsz62dlp3el117ks6jbj1jz3k2y89c70sf8fn5tckohutr21gmqxp98gulzefu8k11wsffavdp4w7k1bq6k74gd85j79sj0qxgou7p2zb2k5z0bplg4wto1cekh6vofzaf79x7u7kwjle2dftkdyle68kgu9hg81qrmh3ewh5qvyz90sp7yvkotghxqdl9at9k9aaqecx140xygvy91lz4fxuf6e883mrl5xwezb99c1sawkphmthdzzzldaii4arckbr329htezhvqqql4phkahad39csiro94wo1kta6i6c2vy7o3sixwiuf1bu9nwenhlw7yd7wnaqr29bjsf6uvr9hd5klanu71crijoyh3xvor9uvoso9shmvw29cglbzyq9ec33dxmf8k2xh4y5ifs59md4om9l4sesoapghnpbx05vvklodle1sw3btf1ppacvhfkrzr7pp8imy5dzot8mohf5sonbtm19re4d92275sd2adi7jugkfl2v0sbqud5dfewvba1cpmieeeui4vsh48rpc6rdwrcd9io0bpvh02tkntx04qaf90yksae69722ze4aw9wb7xfdsi3u258fppgl4u0xo4g4e',
                fileSchema: '43p2lqs10sv1oi2pe9ab8sv5ntnzznbyh3b6499xo9l6xo8h2igx6mocu68qvgbsdwixxxud5fkbgicsh94r2ob7cwlffs5vtwwu1aiyzdek211bpj1i00rsegrek5anm3q75mhgt0j84cnjyxwomox5yvi3em6xbrgl0lz04o67v3pe4rtov903v51rt1w8owgxeo0njv8rfml8hb4lp3llg1jg6c4sxwpv1eqlpa4f077pa6pvj20864fki6rmml518yy8do1g0ccwawxt8sof05f2vsxl1za212so8gr1g4v5pnkoy7qcexf35gznv9tc5s8i05o9spbzldbcfrzihuqcp7eosvs8ygjk197hcja4tvhbjrmju0n2tfq7qfroe2u0jegvogmvoll3cf84vd2pnn03sqnjd1qj4kv1ksrmcjvck1i2hmautrljc5z715t4a3tn6w3k16jefmkwiz4sn54dvbno76851gke4kwf3s5vyg9nal610h1vt6m4xjytnn0dmps4o7er5ha91un94b46nafoernq3d9mw8f5avke2czte44y3uldkqx3rjumgrjrqu2qob112te5ph55euuppwefv8umnbbyywu70d8s93i822m77t9tgr8oosh34zhv7ofxos16smrwsrhwd0aqs3k00gr7arsac27fxge7o9o9nzzhzstmvjdhxyf3kywwqweicxg4ijo890hs3pcyqic5dfyl2e30co312fegbx1t6alzcp3iiwmlb2arc4v8rip47au30zumt27u1nc89m0kx9870fq4bo08vzktectwspsd2jwp0hpevk52982i1gj443kznh4bjh01rozzrh047ruxrtor50p0gmkcouhhhhebcch847znyx24vku04le7109jkenbrrlch4b3oa1xcn85t99at67yo89i42jtun62dufgnr14bsfi04ueerukirj4u2qrcd6ukij4mrt67yujwt5amyw83dcp97dl025oasbu',
                proxyHost: 'foa4rw2obdglagj5d8fu92p2svnx9c7xukk6xibnuw2xl21153nimdqk01vg',
                proxyPort: 4869908239,
                destination: '4l4kyj6aom8357knp3tkxbpruis2ftfduxax34tm7p2vvskk978i74pz3kl9yebe2fidgda0y5ta1vqq0k9ejyvl3rtxsetinjyodd49uxxnkmych11gp9l2fwfeeqcarzh2ih3b4kq3o1j0cug90zhy5e0fdk1x',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '0vmgd7dmgi1jhy91o5in5vhu7je4bqbc8lllwtpt2s6v7eplnz8fzsd9o7ixzi8rhtf3qa4h1wtzyof66otzdz77znc727l5yfvzejl0ycedaz5uac46p1lcrreq16eysrfrhklg7q9fvtjh0k4gb5j2dames723',
                responsibleUserAccountName: '1gwqetn1u6egcg3j0imi',
                lastChangeUserAccount: 'vjo6qws7x88ymafl0ldb',
                lastChangedAt: '2020-08-04 10:55:52',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'trdl6nnr3kt3oivoal8dswror2gx66vnsrgndqj56',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'mfzunev9msi3vp2mfdfd2x94czkqykzl0k7tsmo9o04z8ggphj',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '3m0rvemocbapbqlpg1cp',
                party: 'fmfmkdh614qk219xx6b1uvq587nhmc4kxlvngntfsuhq2fcimrj6r1xfhkohcse0sqr7sbnwbij3h2gio9z0d2p9zl1xlwuurp2lad79jdf3emuw86zke19rdkn0a8cxb7xpav4m7pbsypxacbg8guilin26l94t',
                component: '4q1w9s28tnrhfm652buzdh4os09xh9ayf68n1clx6d2aqwca9r8v19sy8t3imcyq7zr3u71spy70qdskoz12p1l00jeny0zaqgc7uaqar7pq63b9uv3z4opcw5qv8l6ywpeqlpikitnfp0wsh81ijtuthi23go6r',
                name: 'zj6l06co3mht3n8ta6oxcemydgfnbsaub3fwxym3c90x67rmkonj1r8256s8emsshmljkx882if44gd4oe04x0ilvpxh1gn6fktj50e52xrfwwmhagjakz8kec2efldcw12treavpwi4bm4itdev3c5rts6msx1x',
                flowHash: '8tmp0jkohlm33utfpcft57vlhdncxhcb9nzc9iln',
                flowParty: 'g16kwk9nosgm0coqmrk0j5znytb4h6dwc6b053qft2tp4lv5dkw5j4f1ju1nss9ei1rvxd7rrbhi3mcddfphg5bnu75qvhs6e84rnqifkr68y1f0rs2xojvstuyru41n5wusonilcvaf0j8p4g0y7lxafthzpqed',
                flowComponent: '7cll63iiswt75wb9pz9cyqz3lupdy3vf5abs4wun3zjii33oyh5etjc69nl98y0uy0c7ikogexotubwmywzzpg5mgqg4l05lt6g9z3hy8y8q7oolldb6xw4mea02hh9ieh13ch5o6tszbsrvijaayl62fnllty6m',
                flowInterfaceName: 'gkjub5lbrwy8xbhzrw43rhpgvy44qtulnmrhbn55vpmj4y1g7zv1t8mxo8yfawcoe5hh29pwe21hglaahpwqm9j266ekn2divmf0nhdp4jhwk4b3zrs8ext9krt2mfo7sam8s81mrc07fb0cgljs34bdyuh6pe6l',
                flowInterfaceNamespace: '5ulh1he9rvdil2654yichghkzm77xyts728tojudge8m9xfxqof9bq6nhqa352blqit2g02566pf8j7odth3qb499l6lhjr7g7247ga6gjvl9jkc2gta0dl1ug7q6vixjq6lbky3qwxwtbqez02wskm6hbaq3543',
                version: 'nu0kyo0m0pjxieb8lltw',
                adapterType: '1lh2e3cr9fmkb10ezr3vs0gzwt6u7d8c046azkwmv19sxxvwkhgjpbx78iwn',
                direction: 'SENDER',
                transportProtocol: '5zlziulasxoa30ayhf7lclmx76fx5dgkz0tgbnvqbx633fb1yoliztr2nixk',
                messageProtocol: 't9mkb9upc9nn4j90a0xr31p3uz7o5zsj4vlzb46jjr5p2ow6ogrxtizgc7gn',
                adapterEngineName: '6lqokxxdjw197h40o70738kihiknshb45yb5xv1udrtz6tax39qadxi3jpucamowfdgg11hiz36rt1aevweyw2qcpdo5gfqsjveu69ou7bzmvubdc63dd1trpbabdngrvwl51gb8pxcnv16blrb4oj2h992uzwl0',
                url: '6nb74czrtnprhva5fo58seial1e1tse9zroxx03lsevzz9ilq30oh3qdxq33mj0vxomyiybm2boqs9i7lpf3j1n5r6xh0pghsrdodwzvmo0euc3ctmhp75cjovqolfcbm0nk8p1kaqoi8prun0gehu4kmcuxfyupsb0clqqz7svsz4dky39xj4b7tssc3me2jh8e4mxgp09qqr3ln2eh0ztm5s60cq3qbv0sd2l4ydz3vu1sd5h2fbv4ct5h1oy0k17eytsbldg6usgdkp1g17qdmnaaj13x135x8de2srcnrckqv3or5bwoo88bg9fp',
                username: 'w6nbiuwwc8cjekkt365ha769ms1ywph43z27lg6gkbayh0lp4vabwrltkmq3',
                remoteHost: '782szirg89j9s1u4ksq2p9akcdul6ixn292sp2e205iplm86s48fnclr5gtcakljv1xuoc8jmzumqgwyj97sq7e1y6alk5939y94uynddynyzuac7yjdhc28za4naq6x8bxi60lth5oi60aet17w2ux1eivikdls',
                remotePort: 6014510443,
                directory: '4qnvkcp4zq18rtdaqdvdem3bhg5qn10ol2orkopwqrr6xcnps7qh5sgl2080mwbrpnyfa3d4gi72kljebxsnigw97a133p9o6esim2mkaukvppi6dijulv1gufedlmd7mcybty3wlhnx01248w5736i5i1gfwfy4ih9179xz104ks2x81hozlp2wrbpg96pcpven5z99vw7ss82v20atzvlj87vcov1md0rg0k9h9s3d8dpqgdnr8rb6w0f5fyradxk5gil0qbgue1og48wr0m54ftp48wfxh80z78otybxkjzx9rnbwh0gdpvlyq7bvunkyzifqi6jml0iz2ey42xauyi9re4f10dq8v7tqf8wauk6rohito9r14afx9npr4g4uvfgbfmik5xn23wcujvkdhotnqgk6kd70remg4404nd78b9jxkipugbcf8odxipseex7v336zlimunmn12g7yp9fmmrsak52robtuk1q98cmnvv31o3lr2ala82agfizesunvjceuwo2nziqk43dvnr7fm70s55d62501r5kqu6z0rel4d5lwddbldtaxias6a1j73mqa2xptoublh6vdph0ywes6k6wovemcl8rhk55j8mc87f60oe3tei0gs9xsg8fft6d3aixcpib9tbwqwffcq368m1sifqtilfdxhvof8qjklz9ovo0g21ugkn989ysyezn61ge5rprtlc1id6l5iarxwzve7boe1uh81doch9n8x2djyoafmnwnv27wnpwvw5v5j5ou87n30hgoircusuxbkzo0vi1cnpy4qdildkivs424y753hl6nuh65hz4j0y8so0ct4v7r4bik5fh31zgvaicamv2bkq0uosvhzdk30hjz8z59ss6tj80cky34vssec6ngq91s1tcxgxlncwju6s5tvuwclt0oggombvmlot9mdhkcbxqoa0elqwk2gzortvkkth5nye1tm1afo36k5reb9r9xe6vfy6olib1boa6xmrnxma13',
                fileSchema: '17aj8ijqfiiom7e43vzhdctp86w9cwf652ct3pvgncxanr2ru2aou83mfqfnkyn8hzcykhhoyrrau5v8nfj3x223ks2ysrj5jlkuieoucbd02hb38ltxgvjaks8vjpat8f6g83qgd4bho66uddi83zicb05emf5exdfb04l2t9hsr6oel5w7ict8btjsn8m36c8hec88pssiz2ozgkvd8a8yrpskth52tdjmld7xzo8qoujvjxcr8igv2cilzp48t4hwt3lzm4em34b53z45gzc0slga1op3mszhabk1bfp52iul90stfqqwj9h5vsn15yxq98q75rgj338y0xzbq9l7m6es08i8a1vrpyranc3vg9jvqivsjh6mbruv02zdjm5euvszuedqz4j0cp50gu5rho5w8t2j4jfqyuorl89qifxjn26abw0icy62ua4usnija41dhjs6h4hn7dnqt3zl8m934ch06at57j6kwwbozm9xbkwn1xriyb7alrib97z7n8aeg6yox7vdx7pcibbld16dciexsp2b577fpd9e4owh8b4k6o5x6dzij5plzrebkl900qwbjjdswdjfm6b8bwd8wlwct39v71nert9xff0uz7g9qvnuqe5nr5x17mivv3rqh6a2txd9rq524zjl8xen0d9vr799xpz432rr8718go4dttrwbygg8ybj2lbppvym0brom6eu3nmzkp90s6r05lq9j2lbhuzvlqydaropcjttahffxneaubm2l9844s5ntgx42486gjvg8ny8eo5nis6ih6svyefacbshi6bdjns20j4604dwaprx1ncbf5p0thc3o21j7r93t3ej5sklpfi43wbd2p5wkz3oljhjaeokyu3t6czaq6f8islba78vtgbmpm50aw40w1n0em4q7ash43tw43ivhvc8h9y0zitbux9wsd0nwwhosoc5q6sp58arw4rwhbuo4cdn4r3fmv3mzmu42zdjg2ku9gefhl8kc77a0h00a0ob',
                proxyHost: 'ptpbivc2kai2653i1c3udbrz85mwit4f1tirachl6vjy7g8wbdexfarm8nhc',
                proxyPort: 6105706888,
                destination: 'ms9e77m408o119ilrmm3brvw9bzxy3cy0j9kvomhtgv7a1yxm382shtxatnrb4a1ni7s484v3e03nwdw42anp0gfd4cijhn7anxzfx4ji7om7au6wnsuoudoihvj7vxfdkp3602qz1fnaw1cmcd8ucipylib0fjs',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4mz45zvcu88va784ag7nuz46erppc3f6xqg128wy6ptetzz0gf18a9ylwrendypyd75bd6gjidlnat1i7fuiyxkzrr922aqyniqwlg6ukve5yww6g0vct63o7uvzc0088m9ux046b99454ou756j41bddbisx6py',
                responsibleUserAccountName: 'k2pj5m95gefjkenh8tu2',
                lastChangeUserAccount: '9i2igob2j0ydqlqhomnx',
                lastChangedAt: '2020-08-04 12:00:10',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '6k5idy0tww5ls5q1mnovgtu0yzqyd52bfknn32mf',
                tenantId: '8xmu9bwevj3qsacaylqqsu7duby9237nb06sq',
                tenantCode: 'i98um2ivrrz2x7isifog2jyslyamd0ovnw9gefx0sz4o08avfw',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'rn6ca16osy31aigs37o9',
                party: '7184c6qagoa4ad72n7c4arx8ecrsy7mu0xh8e3u0a91mjo1rpzh5fb7w79w2578cgpwxd8e953b254mjzxew95gbl253yo3elxbo6jap0j5dvwl3f9xrrqimwwgetwgonprsvhbhhqcoglg5ayfg2556pt1uclb9',
                component: 'kkzv9asflw57u293wng7nzbbeurk3qsylwmwsb83oz2pj1cqejyrhe98qd4qb4vxa4rrg3ugslck4lkhxd476jfh40ofaynbnjq5fw0q84q67g92yqejq6lrwx2121wh788wwz8d20ktfgm115m5hvpdhv5m0lt4',
                name: 'nabar8svzamlaayj72mc4r8coa0cckcqxuenfau56kjfqjg8v2609zovjr9lwe0ezkm8z7w3qj1ciw0xyvwy2bjndyvazobg95baa1nrmznoq2sv4z25y4wqjxicsu7pxws62xcbkrpbh42plph3xfwt51sh82mi',
                flowHash: 'j0tgk8ls8jdv91kkx59eownqxg15m4ihdrdddvl6',
                flowParty: 'thynoqjo3tjaktnhekes6il40fkkv4vdq7jvbk997k5rp3trjiuqaunuc940nlkvaltjanrzk4bwt3tm3ccgnr46aep80827xl9erm3r1pki6coyaqvm3lpo76xb850a51ibpuqpk6z05ye7a3agx6uf82j49hi9',
                flowComponent: 'aur74ld7dro9xch3y89b7f7tfw2cn4s6by6cw1v196drzj55kh2z8csfpow3135pzsk9iazsrtxm7dgrqgzvf57bxcq7rfm1wybzmvz4vfq4c25jprae5w04746w79lp1efhenvnmc85tlffx68bti8qdg3fg5qw',
                flowInterfaceName: '9g5jjha0xw2qr5visg6obetgco69d2wxpeaj5l5qa7cn1syi96v4a9i7bk2i43zvs2qpo5ikgdquz3gqqu58m0u36cytke7tmfdw11vrnediqgqo0rw96t3btxpdm9tz0ewlgnnhtwis5or4yc7tf54p6q7sp34k',
                flowInterfaceNamespace: '4nc89ja0mgevf83j60vdcvufsmrfpxnl569qtlzgm22rjycqd8cfss9fjtw87yoa38n36662shiytwcm1etfuv0cybia060f9nyl7zobet9c07d19tyuywx4irpdok8bhpyaby49b1lpdnkgvl6ck4jexmu9zwjx',
                version: 'wcjeaajgfc6pgsltk8od',
                adapterType: 'n8chomw0zngxsc7u912so35wn3ytl8h8pnun9vhpmuoku6yw0aub10gvj9c9',
                direction: 'SENDER',
                transportProtocol: 'cvi4dgsc0xmnk52hkn8tnvk175jkk1sv5j0nssgztzn5b80nogepv37fioh3',
                messageProtocol: '0gc83afeiou1rw47532pl2k1qkbuflyn40x88kkkpditraqju6yhyswvt17g',
                adapterEngineName: 'la7dy464iof489onhda71escol64dlocxuov0e62gxw2bk9nxk1yfohor39j5gjay1zt2vh4lvg3pygggvt4ybqppncjx7jko7906na8d6qsem6evagedo3j2dguycb28yyc9fndnlx9z7mqn4daf9q6ea1ays3b',
                url: 'adbhn0bddu99tp4hmaugpls752aylyw150636otdj0c8ozdxayqpy8y9c2sh17el0u8a5t3ddkhva54lur2se90iml26ul3ff1wby1xuv17jauh4qal5iw65k5syi7yzpil7b8q6f4uc4ww1wng7uawzjlqaoflgnq79tr1nykbcdtafxih3z1psp66p0ynjiya78s5g6i9qxsrhrmxicibreq7d8z612enhc7gv4gddb5k0uhgjufyozflsxawtkdk12mljh4gaqenozn1g60cjsmwjbz87dz58ugiv15yuonoxe45vjaqbcldmgbvn',
                username: 'hduv6bu8y83svj9kx4yfgtrxq1mdqxhmazb67mku2ou3w3xlgfxt62yesat5',
                remoteHost: '0j37o2qdyu96ztj622e0sdhe0oa3q1aqx11v3u1bchr836dvsba63ae91ha33cr05txa7f57irmaltogef8hdl41ln3n3qsle36jf7j7lcqvyk72ocfeul5b3nstubecyy1ulf7pnkdy3g4sychg4kfqz64priws',
                remotePort: 6927175862,
                directory: 'ypy4en44mes3fj73q70jd213e9x5izm32jjkjjzdq4rdelzbrfnwzby50d6b8azbse9lm1sxbydhnkaoxnxx3aoqrf6clc8vxxmpdyabns96foxrky6stec2rye0yi4b2hlmydc7e8x5gwg0onbmdc9ce6o1o2uvtc45816oesbverentpnw6rv3jc9yqgz5y11rcu1b37u3701w1a1uzmfq0sig2ma3bgxxb296d4dbwsnmyg6xqkrfitg3nh6nqm68z6qr2wzc4qwrys19qre5tugts1pe951hjlkvxmm17upjglh7z65kni67diq0f25jmjt9nx1n90d7vupe8aiysi6dm7aa4uqjttawry2s5951ssk2zmwzaauby9mmfqc5zluxx6y52e5tla5bj9nhpu3fwefhbw0628bz6lt6mlbu6ecott6fncj7xyq9rysbmzsrzq4krw6y7e4zpjfnek1h9rdx2ume4vm7bh7gvvuqkbv8uu0cjf27k9g8rnwvaqwiutaa9jsv84531bn4zfv0inzs42w7dthukemdzrfinr5sfnqg8a1shudyeeeigjlmtbrqsy0m71i412g4mpp7xp1n1dnx9a1nd9ovw48hngojkfwxklm9d661jw2yaz47yd7f5z5ctuuqz2rpg66puunw2xbfjj1dk7csmy4gw275r8mfatnq5p1n67x4lhz46pfqpuz1fkz7166siyglgqaxrimc67qemn8x7e1oyw8ub4pdnjsjxrui84rmzwwrvag13vt4zgbxchmxr4e0w64577g7zpyc3prhsm8z2udfavtlq7trwlp1d6dfdentohdl7rb8vrtadye838l0d3ydsb4bvn3jhx496puz535sea57jmtnv8tnyu20m8evhncec7wsxgjxogpj94t47ba74bh44hwci1l0x4vd44883ujxv80t6efhgp8aba13osjtr5ooc64ik0zyll2pfmskcfvwl3vio4dk0z90kh1259rmsrcb0uhu',
                fileSchema: 'xw8pi1felobd55cf2gsu7ovhbpcijszcuz19rg5fudycgj2m0fcjomtmrw66jwvp0ky78pxi2wuvjt7h05yqjgw2tlie7uvc4k366js8kyobx6l6pj8rm2y0wgsdsq5achu17il54916s4b7zkciw6vfcs4t0za78qq2lk3tfian1byczv2ovo2tuctzr1pr7j8mq3hoszio1r9t58q3e8e108jsttn22wrink989oto5x7l6e3eatfiuj9fmtkchuk0pgdjhgq21e27fs4mykhic7k1fylfjqei33al9av4p3iublatnu97js6a0m03srsgxq7dq1n49qojvo7fkjmssvymfd3evrds9812q0o9ru9btmhusn373gkkpwykvi5h9vvdbznfdcggo167scr2b2d29cc0mubdtg56ophls7t3xatqg20x024bkixrwke5vmnk5f061qe57kvbnvfd1sjzzz8mzyarlp406pn58532azcw9omd29djg9enhjktqrx115p4auci7gzphmfubs73eg35i1znogekus38p0fbi2j2jyd6mttm1pcp9jzrem8gqwnhlz0b8cq8meavctfgtqqgqr0a8h5uvw25aj6hg6khcxx7duqdzaasv9qe44lvkquwg9djikvzve8m4ypy4nt5aobu8gemo05ntsdu2kmhhoon0idw2xfn10isows23p02mtpzg00tjckdjhesrdeex2xq2q9a477k6gx6rb1mzx1ar4gbheakx0jxmt48qvm31135oluukdedsf12267a33teg3ax85kz40ifye4qkmvl90jmd1cces6vjanjypb0vjckdemyuow5q6xmuxrix6kf2mrfz03rxng2idn96iwemyntwpvvi3nntld63u5r9jid3h4z9ihezlz9wx393kn85yuarepv5z7hvguqoityhy4etixe5achkg5ipgjsnenv8fe757ohsscg1399jcvxpi6qu2lreoed8ytx5ktpk1k2iu3b',
                proxyHost: '341xtqa1fjkfox10xkj9hxxm70nwc2e1xj8s9xhyp871ujr3ugnh90oxgw30',
                proxyPort: 5053276347,
                destination: 'tzgwsrysvvyyv64q83d4gaifmscj3fw17vai2td3w1fhzmch4y68tc349gsshu9usaa873s3ag3oupje1k6i7br6ytiduf246llk36uakbpsb8jj1fsuogecqg67id6ljbd8tr75yyuiwdve8u2t3jzpx7nnvz47',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wfnv9a0plgrthqnnxs5cwv19u7lyev5vwoyyi42voswg13iblsvsh05ayw7x2lz8tmgb9l8r9w7nqf6l8kjcnc8oi5p7loqtthpksl5j5xm3gypwdjhddr1pfoe8ou62l4cpyoom9eeezrkeutsnh9tw8j3wkrcc',
                responsibleUserAccountName: '3gfhb9934s6obeq9yhtr',
                lastChangeUserAccount: 'rj4pbtc7mq7dgo04b9d0',
                lastChangedAt: '2020-08-04 02:27:20',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'mhjqngiyndlao69615be739w46ouvkm70kz4lpvq',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: '1yjngwsni4ixnq6y4qg929xqaag9ez1pv9yiu9jzsoe74lkm5w',
                systemId: 'olc2et6u7azc87h0ka301ic9gyu8hv6gsdizs',
                systemName: 'ugsrjiqjglgrdbgodsqt',
                party: 'eox0n7qpaum1q6mp5x5pp9uqxh250rrzzm65f6mdbfvib7tblmgel1m802e66gr5otk4l783g5cv9xxm1pliqedntru1k6t7l888ski65e12y7k24utr4pw27gqv6alnnx9jwsnvm5viworscpb1ix6sivu7wcr9',
                component: 'pcya6rt6u1rrmqdsfftzov2hpq4cnnyoivvjovobg69tymjiickl4wkudxfd8gtrrjm0msvqekkg9lvc3d4agbuok9xt9c6vb7l367sehurmu0xy98t8stpmh8dk4ejdejym4mrwp0sldc23z2j78agtulm97k74',
                name: 'omnu4qoij1aa2o8lqznrkf3swaqrhte6lccwbmaejqyrbx3en6ddve7ex9wq1tnz3ap1i7wpidki38534h7l9w69l3iukhp4ouex8ea8lujx748i9ecvad1gyjt5ddi3ltpk2568dha5lghika5fkte2b3qw0sfr',
                flowHash: '9lvdkmt65gsu1pghv7tgfbwyaq4gahuobq6ygl0o',
                flowParty: 'v6dhpwb9h4mtj6ngxgrrzlzxyqgcgv7nj9ueieokhnifjd12ckhjovlkve1sr5ix4o5xf8c9nbeq5jqd3syu0b46rl5zenp1a5vbz5e2hrugiz32r0anan5tu1gldz2odxc4jjueklb4jn72u8wc25eqobvzxb6a',
                flowComponent: 'qv86yvaswx8tma3txaynajaqgkrn6uplos3afpxw8yxuwdadpupqopetm2m2khn8qp3qtdfuyth5a1pqksjgbzuomli2yi6zmm1e2e7gux2kpbb51brhoq5f2z3fdyfzjvfrqj71d3f5o24qkzbtbv6oqktghdgr',
                flowInterfaceName: 'pk6xecdsvs4xoqkl4nd5kuvlo3l9jcu6x6pgshgry02ceu6c9qmixv6axjf3qcvehrog54b33fphk59t7b4juoh6gwv0efqqnrqeun70ejsjt3q6crsi0kmod0xxkogjvu2ccp0sjyx22m08rrnt3xm46ighim9x',
                flowInterfaceNamespace: 'lnsghpv49ozzohlevigqkjz9ud2wl2r8kbo7x0yors9qes7ks6azfr9qt3ld7rzsu68zdut6qnhjb27qa19u8f5hd65s2dz2l0r3vk17xpt8wkrbeli1zxl5s08ez14pdshj8misu50o5yqeplmaghxooivqtxgr',
                version: '7awinwa7e7zd9vkb34xs',
                adapterType: 'g0i9rumq82xslyr6bl7dbzdpoc8n8rv142m8brjryo8v7te22kn02v00apb5',
                direction: 'RECEIVER',
                transportProtocol: 'tgx9t3x4upl44jzqq7m5emwvzgqe631e1lpbmf63z2j60vk09108ncs3uhr1',
                messageProtocol: 'llm4gl74jopddkqhgu98a8lspxcycxm0sll0jsn7fd5vqnojylyvx6z3lh56',
                adapterEngineName: '2ugirbkwqqnjnnz578sbs1c1xlv0fa5wiuky0lsywx9th7yqq12gyd8932q20mwij14dohia5f490zxprsy8zpc63l3gduhwa1pity98zs8ym0gdkq9llww1jja8sk64zm37zu3zp1m0lvu9di0yrlq2iv81brsk',
                url: 'yves7s408a7dlkcjxxmjjjglqszqchoovqywuuqcloxc84lbui3kkf24j6oju3ocordy7ix2errqowlhakhw8rz8ju8a0m9ylidbv1n3i6dtdcrptybkg3o385zuj0mygmqo1irrqzl8v62dhihwhwxdbo078su2ux1q55vrys14ta6n431pjwpthe15gv96fy47lc0pq4l8qxtels43jxrhon2s65vqauew4kezc9axglirb7gvrx2gqnvbwfl066ot6v6sjhua2751xpjqkt9saoefvyqtuyvwxg3h86uhtj1di2b2qrqttbtzjuj3',
                username: 'nqffsluoosql998vvbdr9r4wtt9ovhdulng3w5dz1eg9dr05f4wckbtkvmia',
                remoteHost: 'iih4ys62a41b63e7r3lt88vrroti8h8w740htbh6wjwexqysnk1mwefexg426u7em29i6vmpnvd77pxbxnroczfn3jm9lbsb4os5xzzlja63kb2fc55w3mqbpk7ozxn33imvtgm0mncmeubfmdbwgjhnk537tntu',
                remotePort: 5582485699,
                directory: 'b4wtaewyrcn30p547bnan4a3sin50y1d0dbe2vmpqkh0t06hiqcclek303p40t9pxb0g7onq2y2zu8gjxmamndqz7rshjhmhrnpfi2gxtqbjwjbrtyh6rdjw5fr1lr8jrtoi0vszvkt5dw4frgqj8z4wxxwvuptava152mlbyp0darkajcyezicjwom6s07ihtxu1jr917medit3fjcz8h8aumuv18kglf86kivkhqunc8t43lyttikalzwpalwrlev4dbguue2rqt7brecsnwn6qbnio5twemv3jnq91a80792wz3nrjbz1t63cciwdn3hu7esln475262hnkfnawkvbjpbrpflr189ipa88pgg3pqqpb4xo6i6d4q3k3fq58995m8h3u2dhrcp01uq807h9hkaklxzu3oo6p2tp584bu6c3vm0q2i91984qy35dlps0w4878fcob04xwoatezlqrpte5rqclo0bv40goo4q5ej0i3zoa69cbifodx0clmxx6kr279uf8axab8lwb1x0nlin9dos4zihxw1ge210xlhm13ihrbvowpwjtqreis3zvhy24q426kbyyqv1lccwwuzjt2xewc48vaoakn9x4ho41hfe0u5prh27n2ykqghm73ig6it47j7mo7t924ua0ufiwb5nzxn561twsmauyon02l3uyj188j80njxnoehlqkugv0spg1b7aeat3jxz6gk9km9pxiywcdk4fjdxrg6iotkcmtlbmhamhu57wug68xj8jo42kz0zv7pud9yd25688ecvtz7sfqoc35ax1e8wmq0k2f8jz92y7zy16qm75h68zp5428vtsr7cjw30cxbbd4cwtoit3512y7isevzh9s4d85s9dktvywrlxjvrdlxbrdqsjgqswy2s9u1rn8te887f99ew3gu96a3bjbtsynls4dik1q53d909srs8znil9zxt2y64neuwlml5u7u914uclg1wo47tmrgb0np2mcjzc2hwwtgeo0o',
                fileSchema: 'lrygtc3sj6os0jqww2vp0e4kl6cf9vir2jun7lo4toru582ffui159fynel4bdk9eo89w7s6ngg7jjzb8yd5se9qam6b76uh2ydribal8ie94cqndrnd6kazatoz1u120fzpl60jil480ykvz48mnl69ckq1a29kjvsb80wbof8spnou3nyba4xauaetnft0r9bfpd6q3qvd392yiibw8hu8oy0g8fibarfufc7ioqrs1jk8qiz0ghkpua2n1e3553zxaxeqv7ijuyp8hkfbuqek1sw0ivo4ewbnczmzlnqd7pr4oabvyvd8hm3dldvemlhxlo1t26iy7hbqab209jlfr0hax9bzdl91dowpl34brwrvbvgu6ndnqcruv9l2buckhfqz3982ju8uwqeflujq1n4hdnjaa7hpxp5tfqp3ms9qe5kr5ff19kvr1uqtanrr5j2nognlwcwpdlzt25306rascq8z2r7ohurt9bonh2u8e81l75nnqr6ky3qqgvw5hbvusv9lxv8zl8ry9li5nijqcgeonq4mcdq32oaba917rt634ue0est8sx5dxpq9b9b8oeh2vl5mhrqijw3ibxkacdwmv8dzhnsdlu06it23pha446ilgib6g7u5rmj6ak4sy00jtbfwknhbjdce0lczispur57mc7avtaju22khmpvwoldkevm13aqrd9q256wjvym1dtxg6csy6uqtx9as9enj34b6lhmb1pobrjd4z4oanyu1hetcy0v3rrlyh8asz5xci78af7shiqm748hfsux5kz7xsid7f4ouyzu94kwzkem5bn4nrt1nyhohfg2b7j1mrjc6woiepy4p77v253068xpye2rldpvdculxnks5u1wmyurk9aixd44wdgd8cn7pgcbzatqaipimi8xjjm191lzbi9juoiwmenxiauvxc7t3axeeq1am66rsy63sv7epohmogj8vmjllinm77zv3x0jsbc1zav0va8py5i3hl5jkp4gkcy6w',
                proxyHost: 'x3jnco72in2hrxaf2pf7fhbrid0xjadh7ba1w6xv7vikajtrwu21ttkr0qew',
                proxyPort: 3539824359,
                destination: 'ww3887cm2vdrhnrrm7ooa5t4orbge3jrbalzqnysc1vov6992rrrgntwmvagmin9tjf86j21pzhb53otcak1n5x6ghbq8bypme7zqkqewy18grus1rnrdu92i48q659yoadybkyjdyzyyzvtpcgsjzby48xtbucj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mj3zpu3c5eqinrajab0u87qv6hfrr9x10w9whkol7h26yc5845quiv3z4tctl2t0zk730dci55gp5j2jv184kmb11r05xnhne2mfa6a8dplkuao1046aeogfi8cw7pnel5rd7d0sriffx54ldkr3c20sd9rti40d',
                responsibleUserAccountName: 'yrmngqwkxg9twbihra0a',
                lastChangeUserAccount: '0agoi1rtqhvrucebs7kv',
                lastChangedAt: '2020-08-04 02:49:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'ow36i98wvmr10fhchfut4ig2i7tdsm3fw3h7qifp',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: '6ttuyrabw7resjcmih1dut0u5ut1s9v6jax96dewu4vb4f5fw6',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'kjtvrxy4ewqts354170i',
                party: 'n7hye88fql10xrsgrfmn15alb905g1fuw9m0wkswdnut3n5d0wqj3bkf5sc5e336msdqs9sznig5tc21q4hlm6rtjbzmsobpo3tf97hsm0mgg883zqr6u2acbv1h6xazux9i45syo1pgyotomtl3nd8jaib13a6w',
                component: 'cgkq48ce67onclqa3aeh6nfjr739mc4yp85ufh2louxf7xawc5blib5sdzi00ok6sbs5790c7ctnoveih83kyhej36olg2cyux5kw915gn7d1z49krz3qusdc3gacqb4bom4glv4ekl510zswpm5j7b53926o839',
                name: 'gl6e69k6fuk2gx8kdfcql3eh7vv8orp7tbl42hcpyp95j7c0yen5hc0ss3jzb23apu02vvqeg3nt0ks4fxlvo17bu87pqku0zmre725klwicjrjz20buxhi04zk4ekcna25wr5rjsf0numohlt9kqpydu3f6697g',
                flowHash: 'm0l29kytoee3jqycqueagai6kcocrdo3z7j9vfu40',
                flowParty: 'tav9u1gjivn9xw7p6dvd6yr437hz16fd05s5lid94y1lek1tga34sn25fvtllkmwadl0w0x8uddktlkvn5l1wdu2b1jnveeg9e8tyirw9wslkbc78gqxgquu63y2pfb49t5xjfynd45952knfzhp42bocpaljx4t',
                flowComponent: 'qh2x9m0mk652rl6cwm2gtl6xb5lxc0eb04hvmjrtlij4mm2sf0rkwp3an91taf6jcgtur4ssqyqejnsgpdctq0my0mcj8r93im5852g3b14evy3ip937aigrmytx024w7xrijffnlqocn5lansey7xr0vuly3axt',
                flowInterfaceName: 'jbvvg3rse1n1ih1p5mksjicmstm8ar2m6d7cl95qmoh6xufl9edegttk47jea4haoqju9lh9bs3zapio1h85zdl42q88slnyegtoh6lv8v4u1h7e8txdbx8bkt85jvgcza8zd8fd6ottfw1buhudufi7kuzh6fb8',
                flowInterfaceNamespace: '4j6dhky5of1gpiarrf4936uhmd7pjnr5ejvzmutbvp97p8g6gnxhno4dw0i9cmjaecpvq9x976r83l9eo3m9c7wg8t24q8q759etvrbfjzq8ump2xf4qk084pdcw7t68glqf53kdct7pcef79ydoj49bb1ixf0il',
                version: 'md62rhfldcroghhmifkj',
                adapterType: 'kmk9z9phfayvbnhw2q7mmdk9876wofcl4ywwe6bns12idk40ural3j3dqb2o',
                direction: 'RECEIVER',
                transportProtocol: 'f3s6hkepp2biyn9pt69im4b5x1byikwmsj9wrfol7ifgc5v9j4lbri0jaxy5',
                messageProtocol: 'icwra6bj5wf2hj4kdjcvkp940gwva47h80v7rt3vucpyin1nmbcoix27h0id',
                adapterEngineName: 'n45ueb7df0f79shz9orxmxhpi82x4sbdl9r3wpxjjlqjhrjismq965k074shlhhtoo39p7256tvqzq1d5u6zn3vcw3zp5o1aq0e80nx8db30y72517puxgnzxpqyuqq8l5k9m5rddv62vculeveub0zc5hb26dqv',
                url: '55xfooh1zquylbjwj3qrsyh99psz0okdh3n30oz0bt1hg9l5eglp1ii6ewcchwwqfapfo5watco56n76ugiat54fla8wo4n6o65xhwbdpcfvtpkq7y0s23e63m4tzcll8als41wku93krsow7l3bpcduaf0pp26lzjde801ha690vocwpru3onn4sh97ibp2z2fr3dto5ampodg3mhyj6f7oxo7fn21niwikr6i4bfcmrv7adwrlqoiskeode4qmqabdycxc3e6uy6aiqv1endiw69r74j4bmqrqrxkfxl7prq91bzj1xryj51amk8wo',
                username: 'h21b66x71lukm922d86dw47kes8rfq6gqk1s1mrcpa93q83c36wbu503x20o',
                remoteHost: '4inbuynu2f7nvaitzrdypx5fq1th4mu96chi1rdb0idyba6df4ur991l8bs9gu1g2xbmm4eisb6uz3o2sgafpoqmjifdypw3e2ct84da3ddg1p5snfep5ldjzuygkq0hfbhdwskj04851b944905txz2wx1d88n8',
                remotePort: 1773486179,
                directory: 'pca9p6ed1e6bopr23rg72feqjlpf4bpp8maqq2vkli73p56mo6ajih01bqnj2wc12fl3o2s7zgbcshkia81nten6arv08ybdbt6q6dkgjhmz3nhklwywq9dfjxvhvevnpqcmnxfeep9w5p169uc1fbmesefagyc2r9s9e1gt2zxzlpkonz512bc7s1spyrdh5bpv48fjrucijloesv2k2zvr9ngvf4ad1bh8xcd5tl7x2iajaurtseucmdtfn4bmpi14w6wll6bmgaobj8ev8dmsh0vnc07v7p4xi62ha4vklkcbq2ckouqewoc64o732gbdzn1cs2q6tfxy0n12lrulrlb6lvo8fxt6pxwr44ro95phr7t46cir0ok1h6hf0vjhihn0ssb700ogxvzopmzv0o17h6qubq0holzx3r6sueno3z4n0o32jfbo750od9we0cmcxrvlh5gxs9p89lkoixa4v2o3bauk69nlj3jseytqwzy9h8gjb9wi4gk67q72ome50ysygs9w6iayg1qihzbs1e993hinqbpwi6fx196pcijj9ediqo5ebuzxktzlztilrwcoltclxp1fgtcj02m7rcayctpkh3d4ji06wwq4jhi2bfbp5i80aohfgvp8x9il3wlcte3t9rnsofrqxbjegkdw92ft5yxz8bnyd1r3uddhuvbvdvftkovikctz3ic9alcas53r02wkh980xbfk0ay6jvyzw07b2mzto6tvui0yv1jjr1qinodk1dv1q29qzte29kaa39m4ft3swimgqcb5s6111l3matm1xadft5r1kxzxrb6nu87lasamytf20r16jc2yg4nw54hipi1klakamvwyqht2w0uczsuhbsmm7xoy0pi5conz73kvm6z802j5x0w8iqxgo57lwud8e0a527s0unchlmi88o3kyeap9unjf597cc9l7hxbuwwbihfv8rqtqk28vptpuhrols8b70e4jt3gmlo5stpr2x9743sc74em5r1y',
                fileSchema: '1hkdgqvceqwmh0t5hprnsxv004ewmsxpfg4ych7tlmcek7raxisn4vf5q3kym8dahh8u4x3y2chb71zdenl0m3vkzuhu961rpzx8zcjythqdvdp1t9hj1ynhl0q2oc8q1gklsxh1ei3y5brw21zpo4i4ymqqya5sad8imk3x6sle6ig9tncmi09nqa5foz0hbf90nprrdyin033macu739crjmhed5scho6e0wbdcpay4vtl142mc58gc58iidcqewq0ri553mvsedlo6464xizlu09r34awis8ahy7fhfbcaaqswjon4nhnx6tnnfie3l6oblprypw1d8tdnciycped6xl0muygel6cz8qr56p6p0zhaj46gwkc3ze7094hqgdhzdknmbpj05lgymavpoo0uu9280j7pydtmk89yopby4gyzttpwn64655dnqv3a4nqud3qmrq3t6nvnb7bjtjqvmo0rp5m5jay2iys1h8ff1d2ti4zthydvwphl5shqmvk1tp5drn04wrya43zqg2roa86pwtytb1tagap013xps5alfv4d2zd5blc2yasgh8p9faitlb5ek3w4lnhsq94dyfbn2xphmj3umjyqu1d0509pk45p2sl8ozleft2q9yd2ohxche0psp5xi9iwkn4lxwcnbo58pm9rspdlf6nv20dtr4vtgajy6jn513dqzovci52e2d0d4t9cjuj3qal9hpj25z8swboe4ozdlmognxnrq8cyx9xbsmg48g8ld32ibbk92ye9rp8g4x6zn7ukbphgqbutqc64nds23tjjbwi0ltzmk45dz0oecjbs2setndritjfpxxyrqdqx13pyul9lup2c45ek8mlu8s6uqj5tjovbpsfynh5933nmmhgv9w9uz97be3tk7vb9rhc9sz6gpqmm7irfl8dyirc9maxt1rob5kogvt4q2xk8tyljoongxk5kbp6owyd6i7rlut8jikz36s4zu0uf1rsa3oeku5x8b990c190zj9',
                proxyHost: 'ptky6dbnv6r8u4upftczvf7sks0up3wxed34g6tu2pypzmuil9c8cw4h0eue',
                proxyPort: 7869716697,
                destination: 'lbpqdqu54ovj27eqijdev9g0u02j8bpy8yacbkaihytj81r2p7lw2swp4hvi87a3xxid0wrxluuyaoa2bs07ajug6e2fnrijiw2aams3ng398k5fft3eaycp1y3vcogxpvrque0v7ll8pndrng31gb5c2c9dzv4r',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'l6k5conm0imkh5vjyn49cz98e2jsc0vtedcx0stwrsxetx526m74t3rda4qov6dj3qwcmk4w3pcdl1e462nizrhs8yko5e0pqtckw97cn503edery1q0puh97o9jmuc6reg99p8lsy0vz1zacibjitqo05lkl033',
                responsibleUserAccountName: '2magtz5vbperwt0jxlhy',
                lastChangeUserAccount: '01fwt2tz5y7xec1ahtna',
                lastChangedAt: '2020-08-03 17:40:32',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'j0q3nu5gb520j1g9hqejrfgkba0wfig40kgth5m2',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: '34mwgje4iejh7x0khi23f0fjytpiim8whihd05v0gcfh8zowshk',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'm85jw12rnwe53cu48hw3',
                party: 'm906a46fe436c8d6q02v0vi3w14vm0fi1chmls4vpe25i7t9l0xvrulj5wztczvgrzrt0jna7ycso083rklw001grt9ic0lrlh3p6tczv3rzi9s7m0cq1s70515uirrg8397quah1j58d4tnocn3laops5j0gi9b',
                component: '72ca7yde0llsqdh6gmkpwk6llkguw2zmc12ndyqht8cjbrom84yt6a8bj6k0n1zl6kt4eio5dz09pkuhxnnj54ybquvneb67oiwvxvlmz84ha114omqz7getasp06qzujod6o5nts272pfpl8iepnsy569ja6uv0',
                name: 'elz8kndtjfqvmiyloopweawsupmxb2a4rv5aayuof2yjx3ccwyle2urtl4u8z92lafb227fmxdzwxvsvcsf1bta3j8x4ta3mh67tc4z3baigku0hlipdlyjqxg0k5fm385x8idmu89ya0kjai1o0ql5o635ogjxr',
                flowHash: '6rgonjozufsfaaddu1odrwx4ccf71jmtjy739sf2',
                flowParty: 'zfola8hvihn4lea1uol4joqt978p8ve7g658o6vw7us597a2gy08fohtjayw7ato855cnwjabp0t9twdbjhxs9px5pj2rzl541ow04nwd49dgqaddmrjggyp3587j2gd10bllg05661oa9pg7udubc5rngv7zqss',
                flowComponent: '2woxzd7kymhzx7io579d2kttto293tjoyn7cqtj7fsvltur4wi03r5k7dr79ivj1le31gcvu2czatvslyc6229sv6tgi9sncq35xjcub0a678v9du630tlvgeaz2dti50i4qau5pjwi8tgy4m8h1bnvem9kp1713',
                flowInterfaceName: 'btp1k5a3ti53c7h3pucdefec0znpe0maw19clyq5d2qvoje0he9zndm52p9vibv26iqxfonuez4bxpoxzl7yvh676rcinhny7vheto64zqus6w8dtq8fs3ydtmhz7hwwkbzte4pvz050iiwp91f8b4plh3zxkrbg',
                flowInterfaceNamespace: 'szc8d7htd7nuvh619omsisc4gwu2tg2co5eyy9d5mxk1iirw4f2r56k2iy9c59stbcokz7smpl2x2e3o0vjw2t0ev62nxkpj0jw5apc04omu25p5iv69scykg6mddjqszy9gwpct4mrtzruw4wd75r5h5k4fpeul',
                version: 'icbmsc32dbmolv0jm2z6',
                adapterType: '5toqzn6fkz39c1l0ztex0ba3ylznp3citcg0qmc7ey25brx4vnzbm9607xbe',
                direction: 'SENDER',
                transportProtocol: 'wzxrpphk2tqj0bafgy73wel2rve7kqiafxi9dinnalulb6act5lj25qesloq',
                messageProtocol: '6ziywg1qve8qfw32f9x54wqlrp7uj8dx73ckv5pf6p93yy13zc3bbzdfll8a',
                adapterEngineName: '68bfhkvp9e2c6zsammrahb2s2q5h0mptr2q1wcywzb77ju4qoqubaywol15j69ep7q9if2s1tyy4pinou97gs8djc8pdk2ubucw67j3tmiao3tebv6swedrc3wqr8f8x1v5cx3bgwibq3q7nsn34uoep5fajakgj',
                url: 'b0n0dlsssef9izrjn9tzz1l5fi89fw7j8d02kbx4ma10ddi5v0fn1mtvl7pu97sqqqgb7sdzgj6z51okkk7073lhsn8l6m7rra44wlby5x5tfcfsexl09ve5j634igov3bwhqeuugtzgeekr93iakl2xn4kdv5r0tm9yzzlpc9g5oka9ssb9ljnd7qq2xtiy5phn0ssgn5eilsmk0okbup0s7i1q9buyxquer1riu88d3t12zevdh9503v8rktne1lo1qo5boowck48uqasfsrbnxd6oevz70s08xwj8zs492820xayceepetvjcb2uv',
                username: 'ifl6x0ui9ox9e0wmpb0zuxrbj4kr5ppeiz2b83fi4n3jj7oochhpkw7rskvo',
                remoteHost: 'm0cgqy7grnxek3mvrig3pz44hu2iqifjouz9xpzj0kxr1kdgbphc8p6pn8l6sxztqzs9qeydhyvhareax5dcxmpvyyqgs73efq335hf98pa9a9pbtxms8slmqqvcrqdsa910c7myubsowci8pw6i1q26bd0blpfn',
                remotePort: 6348588782,
                directory: '5tljlynmvgrdlqnw2d5gj0ahh18aejhwez67lmwllq0mguhaymuy6lwbz8rzrxtp6kx3zevq01i014ki60j7lnxrqyx19g3pq0i2q21o1l9b37sha2syg7g0tr0k02plennpj4fy9mlubt9q7l50gtf65dad0il2i452ip1tjoemdooovex8ew7dcqcx9fpn5vd9ympso7f18vncetlpkg0qtyucdskxj78r7q1e3hs6lrypofrggimqg10bvk9q0ix6pil2mqeybqhoiy487mg1opfwv0ghdtt4q8ttlf534xemxdlwjonz68t73riya1si84h44ieplxo38qq3l3abkmta7r3lf28gqlavwyzluwid7npkeqyntav7f71ev3cezzjv6u0g0ifdnqjnjs9dfwefyub8y6ibmsfpu93qjh3cr6pimzn93aueb4jj29hhoi92hn10cbrfn3nvu7xityfqi1vtvvqhjvz7sh18sjg3b41yr1woh9lexuqu3jyhee530nwxym63r2t7i7jja4yrym40fudp6urk5xmabzn3ato2vohb1da7eys18mw4mu5eaq5wdvfubwrb6lbagmktg7xzo4r2edzn7zefk70ox7ltqer3qrzg7kru28yb85wwgyp2nxxnyjoi4nn13maqdkf6bh9msj6q30gy0nvjy8t01yw7ib3gel9ox5r88mdd391i8sea6tyl78wujc0lzs4wgxd6y1kbgctk2tu3h7qvyj11p5tv2tirzwhqsze0326ogza0xj6mft04u5533sb8ca7anmkld1bpmnqqwes6bfyrv4pew3txdl944p44u85gs6apzzp187wtuy7dd7rm5tm3iuuxl0rarttniem5vlnvuli7kazi9vb3ncird851dagd8xy8vbeylvapgi8s6enw8us0a3yhxgubfmiyhic8nisas7dth2qzd0cz8dei5n53heeqm3riphaobnokt1u7sjnlxb4szrxhwicnnsthf9m3zqqd',
                fileSchema: 'ctx4c4qag83whex380p4vgs6spnybuwfl1n9jryyrc73y0162s51am4paw3oajgxdqvrgca497ca56u9o3kcy74q2onytgywf3sx8c4fmn1qle474mxkzmfhsby96ycn8093y43o07v9bl95jj0utbqa7zxazcfd55uowphk47z49cp9y71vs5gvfchlva0v9nlqytn95h4ufaj8o3wc2r901gacvayjx9mgqv1usth7dzcihgkp6awdvrih3e6a90922b7u4vqyr6gb5a9osr2eu89gz6rqo7nrnimd19kgg2hatqlqr66okp4ljhzhfpv8tzd2i0ovlyovbu4voq2icabhkln9f982z7vrt0ryahuozqyi7kac1p2fx0p4t69jg6yccg1tzaniz7yhd08jgsbc4hyzh37p2llcs3ya9j1n474l9bj62wqqgu10c3a0u9jun5hr2h8l3v0xjc6e4zw14f1shonxq0sykenk9q918nv4lbaqk4k9dz7wn8fjvigty1erttuzy6tr9fczbppqpgy9r870id3xih826fwgux8w4ah45b5vbcwpt0iqgmmc383z91r1hhnvr0qqq0canjme74lpgenq8fymp9rea7ux5xnq38idxw54kz27oo63tabgoplv82p531s4vhx2lurvuz4gizpdfb4fb7tmun34ig0xt2u7l1icc2kt97th1mysgzbh1py0du81o28789ln38tyo4dq9liz4y7kkao1rafgv9ph88cvgffzbo9e12b7klnr3ybwggrjlnbwey103fstxytp8k3dedc1xif9buc4ghda1qxxdftqlhlivrngs0xd45rouy7nd8mgh2cp6r0om4bdhtpa9x7hdc8sc1pvl0zltcal2641tlhev3xoj3uf962vmpis4jvq8xpsqpoegad8etr48gfq0qfsu143xd087x6hmrjanhysuwb24w4ptc8n0s6clq9c1y3jlp6nr9f0wm6l5thk8rmcqdes3pki3qf8',
                proxyHost: 'n35t2eha3v1kjon5n6w39qzgr8dt0zvee6lc11aodjztw333zjffcszlmy48',
                proxyPort: 9947931518,
                destination: 'ov9gtkdnc26t8l71ogjqlxif9bgbry1ojcn2e5o3huslyaryr7zmii8kp4kx7xbaiel9bdqa6ilieagu041xj4nkoneriaxvc92rhr6t8cxqpt1qmtvmslmrpim1e3fzkqvfuqx758ccc4amn99vh374icngrvna',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4es0dz1sv6wyte9qanx9cowpnnex5nuq5stja4gntwxnsl8hskte1awwyex17ywbbjze75l3d261jg0jtaawnm28t2lhoy0hw4j8h25kppwc1cqksq15yd279mw2nag5dcm3nlbdgu3mivku7t050npeh6gw2fxk',
                responsibleUserAccountName: 'cv96aq5phiivqfvrqpgd',
                lastChangeUserAccount: 'xci0xekmq44t4f1xlw6m',
                lastChangedAt: '2020-08-03 17:52:06',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'v5cpzsuxb0fw7r4crrkkf407qu2gpklhjr6nk9uu',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'di1kh02g3cr7bxgr4lz1bhhgvgluml7dae48cir7ldxkd5dgxf',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'odsf96te5zgi5jivnwq0v',
                party: '0bjr6ebr77hqe7oqytyh1a7g4vxlltq5hjmuekdrvzsqvez6nqxirly4ul0o3bd8eqkt9r6wsgpz3auoc7uv309of6i4i6bwr0i9pwxtu0imoyb6azpnydrnayfqu8helndzzzy9duopgplap7jvpixojdlug1f3',
                component: 'rh72kztup7m0c6kstr55zreu33pjlwysrlgrgtupijsb2zhsw1f1fzkteqp785omy1irtu58dd1p8mxqe3wzqtnqd9pdi4scdq8he95jy7w164bozt3799qi0scfdb0pckxw82z80pdjl2s5g662k2ucj32bkc5i',
                name: 'ucfuh3sf7wyls9ek819hq8ccbca5k0s5gsey6idd9lfi04oqxjabmtsqmp1fm7lu82qul1ixn3hsrkxc6g4zp54wqip2at9pmfq7t9gftt4d1qnno5t2j33d3xihtasf83hmwfz4k7zgjjha3op79t9j804q5w3q',
                flowHash: 'xyptimi6tbs4zlkqoe9w0dmbz6c8qrhqcpa2z7ky',
                flowParty: 'ykqd0fcq91adbsnopwlk1q2tduieyhs51e8u698iweexo40qf71zoxc7kii8kvbc21v7cv3t3vf39slcazhy9gt3x3lx4567liuosc0nscqlu047100w903lviydgpyaypo8r67wty7bm2vdhte0rzg8ehiyyzks',
                flowComponent: '2960i8dtou26mprlsdtjwb5n7xeu1qn8qwsgplqswxfai0mfuz1468a2svbhrqn832fq6aymlbrpcfpjk7iaanro32hmhytoa05tyvbtnv9ie7ssmlnvf0jufdu1h1pn0yknovnt4max6gwt5n6gmvef26dwlapt',
                flowInterfaceName: '0twr0q3tjg2fsc9f3o275lgwmdh59nys9hnhtpcagzh0lg3hts8v2vn0km7sshxobanvijhl25mvndzetmjrsqgc2q0t1g8hh08ld0u55a29l9e67npzpvouixaqlvw7023qck4z6wtabf4uqb6hiakhgjermy7s',
                flowInterfaceNamespace: 'vuh2o7xzai5zd57ndrm8hqbqej2ymvp15qbkcz9ew789nz6fbh2lgrffmx8eddi36zawarlknj28qcapjcbw99iw9n4be4zsiqhcn0oswje43f2s7xo5thy4klh0qfm1n79daz9zfg156to81kl1wapjvyj9awrn',
                version: '5uymru2w6ut5m3ykzudy',
                adapterType: 'jwz3opayjefryvo0p2v3ltkocsznhp7di6d3qve472ncmw4chs9mmadvpp6t',
                direction: 'SENDER',
                transportProtocol: 'lhp1shkzqvee1fi00ojfhdd6sihh0rozsn4u9wg2p6ed54eg6lvj3t2jje4w',
                messageProtocol: '89pxk1r1kb2h4e2urmdi27iwh32tsfdyi8h3riwrhkyml0g514mhph5asqxk',
                adapterEngineName: 'fdk0904soegjglxvt3ymub2ex7ni3kf62nsxy6ljehzhu5qgdtkuqqp26rsaigu7jfbr74ygfpzsogux11yhvelulmq7izip0fdwq00q6bgrv4lyu25q11za37dz3z25r39vncg4sz4tionqbpsr0fs7udm6zsq3',
                url: '6zna2vpa348qno37j28bmn84usfiyu7dixa7jdfco57h12zahov2qrred7773p607dvzc54scai896reec8y7ee6cxcqaublb31951q0dpz4ejv24k0nrlwtsgsk12y3lufkytob60glf8c4fx5mgrucbfvedf73vx49b97cm7u3c8h4eqk0raw2lmfhzpgr0ol6p4su5gvya72vcthbgn2evpeeokd2t669ox3tnb6d2x9rvwvekngpukyjkan4mhtd4lh5zzrvnaynchxjsusk2a8km1f6cbhon0cj30pj2stbspb3yqu3dnfwxsfr',
                username: 'bsokpwxkh1fb5t9b3av7t29xrdwqqnykemrbyaqzc5omkni29y9nz4f8ht6y',
                remoteHost: 'aunvzddmjcd7auo6cch2a571mw0hr4qaftszb87i4x7qhwua9cb0i6fc4lzy5hgmlczijkl6gtc5ucmx9qja77pz1gjqwbzqdw9ikwr7jwpcz6ud2yigjhi9klxiial2r8vuj4wutgjtuxdbgdmeo0kl6u50ieqj',
                remotePort: 5539128375,
                directory: 'cati7hs148dntpb3h6w1ekzg9vs3sgwwz93ak56fxch2ft21jttgotwvs7wnumr3ry4of4uettsdnkoh4boz6c46l083enhkjy6lphaxkbd7apvmarc7xq57rdspedmyv4ldc53c1fdeiol06ck7aa4ngp5au99mon6087nhg63qsz6lj95ilfpw4vo6n64plcsm3jb0dw1pbnm89r6t3n79tlbc41md15o3nywp205u0p734z9ah4p7dwy79m8olg4muq44ejynbhit66068ndmm2cpdfzeaihzoxefg5nlf0qm3q1zdf7sjjirj4d8a4zouw58huh1kpnr620az0fskic4rlojrowrlkugaqnmkashjrm1kv6appi5crj9ioh54rpsoaeaytdsgma8ra2n10o2hynb0abxumjb25ux0x3uo4kpoal2g46dhnpqsvwixhs9tnfvqtpbvfghvazcqeeash4125de1ss31l7whiidkqkzfypklgo5y93pal6m8nd8y2o7nmh8tgjfi80fi0go9qupdwg3y7oxv3pa3nj1vxopzk1q2fjh93aq83o6f2c1z5pufx0pv09ors5z8i4m6iak29hontvlb3tgu6u03cfxkddm876s5l7o6zgl5jpebdaknp6cputb8kzf5z283fakgbh8tpaqafgtzd7e56mdc56w1uu7wrcfpp7i8ltmn2jf47grfjyrkbrh9ru86h18craitme440q4thtpuzfhlf7bdt3p865466bzu75svqkz4e7h85g492pa8by0k6j2y5p24rtetif72yx1u7304dgcibkgzwpvcu6zjg0uxr4zxy5aksubpxi0d1wn2f5c7p31ohxxiru2wlgoeu89hfhzfyzdkgqnjn6n9e9w7fwde4delnzahz81fxdifllpn5kf878p6kcq92eji8q02hj4w3v0s54c8ibrz0e1nfdoo88i989xhdfugl29efl3se0cyab3ce4nxpgcgyewn1f0gj45ujwt',
                fileSchema: 'jzu6rxmr392dnmj1fh7f382xrfnmrj9oweghuee9g4o8y6htxumnjzi2q83d5skx393zq80zw03uidvgqms6fod471qxed7t81ydgq6t5hqfye7gdy4wh8mppd2tyyhjmcqcgilh1dumqrpou1stzy7b90b8bg8lrqbl151qz2uzl03011ks3zjw6t3l6jmdu7h9xgc23xewpn1lmamkk7kns08x5cfstgti9vxw7gisz7casbumvpxb94jjj2djvm2gcllh7an6ijjylnijqtfgm27h95t22ihsl65g0rvpnbi8xowr9k69io0n9um1uvkhmtp2qe5hona0fx9uqudwzwej76m0y874i0k3ezonmbalcjhqdwfyl2611jcit1a0pcfuf4rvstd4bk38ypqk5g4hnqi81whuvi064pr6s6oaeetgshgdroyeawccio2k4bblkdp8by0cxjawiu4mlzusk0rf9nvt3fg08vpldn3scb6nk1htkkafkugukgf9w1kgjar6dm4qr4uzhw02zjmiut0y5vxazprrjhx2gltfn3qh0ubfk9wjn7hulpeao2byb8fv14kbggahofwjap37pwv83czi9xw8nkfxmzq34bokebyuece7o8a563imgm3l2998l7cw0gyqsbeo7uzi6k9htqkmt2tyj0lvy70luogjuifrk0pdi1ezmpamsq1g9dqijjw42z0aqq0lfn3fbye9qkxsq417azmy9cbsyxakta0prs3q2ba8lnltw13ztwmhbn8r8izus7ccaazc9qyl1ipkskloi783dlekdhswfvyq34bljvrkdegmcshce9u4o4tlt8ju82zwvakc3dmdlcznsujjrp1wjxfzulcnfydd14bv0fuan8r5ep27w3hcdhb7n5uitufu9y6cpkxneeisbryjwqfc0ucj6ipx646tdhrittxgrkmr1aa0dzry42btyryn8htq3sz6j0q79ukz7jmasut80o0z4ntg460f8hucfzid',
                proxyHost: 'lmm5wqwmt8orkacytd8hqap20mvrly07u1gt91uglu8jm2xi7awtuj2joy0i',
                proxyPort: 2680420231,
                destination: 'r9p0xj91rbbq1fhkjgpd1sav5xykuphmbed5ki5dxn775g7a4lg9vfgkly0uj3um5128oulh8qe2t2z9a5qkpa6courdpxfqax2lynu9yo7cr42t2ztaqo3z3f4v2x71da5fmrhnxedl8ggai0tr4c80384h8qs9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zckdmzqwn0415efldt01eaeoptxy61qs93x0gum7bbn96xxi6n6vjz5kindr7iql7cja5ip9tbao35z3ybo3fyp216ukzb8p3v7nti6ckuxa1ukrn81qttwtkwfdrvnqeoh6dz2vrz5zdjrghbjkspcu4anjtp21',
                responsibleUserAccountName: 'd9rkh0pbr5bx29bm89dv',
                lastChangeUserAccount: '8jtr6s92t1n4wrgy0esq',
                lastChangedAt: '2020-08-04 08:39:31',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '4mlaz5p5w6txp59om37lnca62dunei2hbcctrg3t',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: '857h3q33fut2tovwxm4rw8awan4tlmz29uqkjkwb7judzr0y58',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '7wcjqfu0wnwzw6jf8rxm',
                party: '2c5uih16neu1ynop7iq49nuw2jqzt3mhces20j003yg2j30sm67nofzeflgt0k7xvbem0pxe8u2ug9m0kfx7rofkywagjz239d9e3s0ltm2ykylghivrvukfy3t7r469889lxhg2gld83jghpwoen3af4o9fpz451',
                component: 'rdhxhy2iw7z1kxulq4ox2z9spujs103sxun7kkoxl9879iiqli17m29ekk66lp7zq6bm4p5hl1rdvotvej1iecfk9qb45eb9cqb5024clw28n4f9k0tdktcvme3yl4mt0t2xtvmrvq4vuk0twl37tgmlg93yxytz',
                name: 'vwxzrw8ghlv5mc2bop0heh0gsx1kc9tmu3f07ni20czvl585unevjwp5rq1u9dlbieikbz6p1kub5dhv07qphg1mxiobuw0wnst0sk42ufvdl0nw7epbur76eq9h8591u1scszpigiorsnmy76fg2jrwzobvf5ip',
                flowHash: 'fv0qtdmw2o7ucxhe4ym8il7c7jvvf4t2sjbm9gkt',
                flowParty: 'rneuqj0z5fffvs9jjpe3fp7854cl76jmgfpiajq70djshluaje9ti8oiks5zcrfu7n0bcbqvkxx7vwgspykgtb0s7se37vnil28yzx41hvnh19tjkzznqcpeuqz8npfrehtmrojm386x44iktyg49q5xd94ifsns',
                flowComponent: 'l68k77tkqhbf4b1psirt0bxf90zjcfbce0y2pednn1zj36hgsipmusdpfkad9iig5wsxfg55a04v4tpzaqi9pczsggyqcosgku0w4glg6c9ef2rkif6h29llbd0zh2mglo56qpwcauqbolbgizynepulv0xoubya',
                flowInterfaceName: 'ag1842jce2cuxhdumgw0jvbdykjdl35cz8o6lwlfiki3mx981zdimsyj2bgt27q8zzxcwnlx0od030sqyeqi7rmb4gyz7ngg3a8omqxcp57euga3s2o52rhk5j0ww70ye6ermdhpxppsr89kar8zg6p6sh1d06ro',
                flowInterfaceNamespace: 'f82dm6tz9x4up20r5s6r3j7lslz8ahxinzezu97n6nhsynn7pzbtcm0wp2738l10gp7y9n7cam4k1h0gljukexva9qt0d85o4rywrirxur0ibkaf09v6nx2nhi3m0w4lc5iplzn84k1l4mmyes7ztak8m4fuhshc',
                version: 'jukxd80yt5r3j90tu6y6',
                adapterType: 'j930t0opga6182bgkg3afi4i6ls8u6r4813rsv1sf70vgmf2u59hv5af1o3u',
                direction: 'RECEIVER',
                transportProtocol: 'tyncy4p2n5lyfilcr3ccu786yd7tncub84026eh4qiyx8kn16271v0vnwdaf',
                messageProtocol: '200o10rpu7jsqs4jvswchk3kfl8cg2nl7zcaywf9ls2xwhtm8bbghwbxm2ij',
                adapterEngineName: 'co0j4z5mvxyapxcy1xf1g8rms6j6ebrfhwn8stv22rp2q3rp39ywcbuz30rc1m3p6q55lk3x66m6g5iwbpblv86mnbcaapv2c1z41j7ig4sxqqvcp9x8yrmd8yf880ykkzku7xuf9xg7sbsqxp952klz8jkgnqtm',
                url: 'a82v4dtsgcefcxkpbgu75quj6kvjqlf58x8kuyeacr31edvq9eqtsfr2zpis3nh5co4nibkjm4bw5l2zl4wu8sp4qdhjjh0wrno6ugd0wuixp8jajuwfym0fvw1ldwnu3kwkeim6kfzzh0j922wshvyp9s1pjsbuiwb39jlkk2pebsx3bnw5nh3nsmchdob8l3trxsvxnpyf0te3episje9nh74sgrcen8d25c4wg66bbb9aibxfb4am0k9tgavuxyqj0pxoxmwbb423e8n5tuyqqakp0l2n8yuq7kwj31qepyt6t1s8iacrn7v6emls',
                username: 'ma1godj4s6z3o94i4yqddab0rpqaiuz89ivzhovimhgt03na3uoqp7l5lrd2',
                remoteHost: 'ap6wkgtsvdwhb58v297t9tmbjzu0kt2dvnzia073vh1401p5ze4whotjlzfkkf4w08v7xwssb6ad4oxhvd0efa3749j57qvtv97edwphcw1t6nwdf729mgb5tm5v1gp4gj6782mqc0e4d8tvogfntnp9nvszi1db',
                remotePort: 2452460500,
                directory: 'c0dka3ty8kskl43xwr26fercxp458ozcl7je17915zb9esru3pkkigvgdtpyluzjvbw5e3zkny17idiz3ub30j5uad5rpibg7f3uve5v0mkqz3xe8gvvr3dblcbcgyqnz5os5g0p5okqvcqhcyclu9cx9nffp0wtydny8iivqrp96qn4vlxj287yb3rlpio6ut2f12xuzgf5wdu02kxfuk4qcnx0dwet31e8s2y68fozgsswme6208tprux4gabtiev6qq1kl2uisjpr4f5oc06y6zxkcqm9vglgvb0m6qhun1i4cu9hngqucqw4ljuiek97vtqcvt6piyxbbgycqxpjq52sjjvzb4spr5y4zyvwnui7xyj6vqsghin5lnpcwkwf7r1cyfw30tiy8414y4bnm4px3cj1l3cme7ow3u0rct85ughu65znbyww4x6l1n16aomb1qqhwgekgzc1xbilnktqnjtrdfa4ogxzby2tctl9qwckojstvbqmjpj56fncz76mr3glc46cug58b1w5mnieql6nh3k2dq1aoou26dfub8f5teignbmg6418ois8hwpiyjgqpiety95gm624kggl4kgr8ddeurlnlei0ozojhhqftddja87t1zoxkj9bejdj9h1ifeq0o40cn1u2qphsjvmxybmy1fkd9jhqxieknqxk6q127txp07zwpzzdpczmx2tr4ph05cogegzxcfcrx8fmaw39uwu8ikr85uuqj9ha160gvvw8jbh9klspav0ktz7j774mm8tesie45xeaoei1rp78eitwfxfgxkmd8jj8mnv3cxr04gywc7illl8t0wik5cnt6sqdlnpt5ge1pdofvc95ow1h2a0yf9zugsvub5tc932rmgz52j6rcte51ryfqp2wf5pvbn01f1du2bis6o2n9myhk091zq6wt393mgeftp0a36zcl958shnrcpk17wkcq7nhegxv0m6h28qq6pgjil310necdgtug3hmwsrfne7h2lbm',
                fileSchema: 'm139ga2ogte3hzp8emq9wr9rj5s77hklaukw62bzfl6byup6cjen5pkc6gppg5wtwb16pr3d0sha1ramjd1hfwqlw49f13td2ufte5xbramc5ku36s1i3ram57kurbs3bxx5utcg0lu0wblugq3aioz6j0vsjp5o71qeo47ap2xpme4ieh313berck9ukwo706jkw0t1jfpoyewk0u4bui8fnymz813dtdmgj07xy1ltimjzf71q1ahp0pgj4jzqgth597b7f59qxhz1b03moagzx1ja4zvkqmjqkeq2i4r4cs7yoqsstc62xcooumk08bf64bdral9hs7jlrjc4ynr9zudxip2wrp4x2lhhctlw04vszxa7obaqijnib87ey5y8en68ht4fjbvo1l9f6gwgg35vxew5hiwukinpksu024c7jwmhlvlx2cvdbjbogpb84ommv8k92pga362r4yg0e4vry6ee8x1fb8gjs1xdlr90yvue7menbawmu2k4dc97vkuc6zk70pyuc7k9s8fekckx10s4e457b3yk9pnldkkd0c66kj9ass5ork54ed1oyvpijo2sbtiojtiuh9rpy99bp8lsgrij08dzcohf4pxnvr91gexggxkqhmjr5zvxkzsq6m3r9bl7ugzsyzhjk64azjsqva55986fq696avrtd5h7icthovzy1cyj838728dv7m9byhjidy2pduabsj8dho4x0h1okpt5k5icz2xec1k1z2nqnt5g0iem54du5sq81awlaj3mbm39yr7ys7g70qi5s4nnocw4xn8qi7gteciizqyrd51smcn22eb6gxv4r4lc2gvvlcwpxjw8chth0z0ki8xlkw2839xcqvd8alwfwpokdv91369vgy9z73g8m5n67vvait1da0h94v3y851pvwtih1g1l4kym8sddriyqxrkb9i4nnjrptu06l9gfeqnlwgzaw9kbo0r97eyxykgj74fh01zjcvma7h5q0irfttx6t45k3at',
                proxyHost: 's3ju1oeprl5c9glgeb3smt984mo3eqx2mknixsij0d7an3z53693mpd0zltl',
                proxyPort: 3379305687,
                destination: 'mheapbhblqa5yyk50ytmgf4pzwf29tt2ikvaobt09ltgoe2426fepdkp7zj8h1ndxzrkabmn9rx3c0cgaj8sj0e69g3tgpfk3yalhbfi2h03580gdnmng8qukh0qxqgeqr5e0pcdsw15zzjv8ridr9dvme21ef0r',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qzwzl230az73pbnk2at1hvt82jpr4qrw1i34a84thy9nopgy56bc4lnsj7byob6ebvepyi8a9jyhkcje9qy3nbd2t83whict80lvd1sbld37ubaa8qlpnzjw4lwat169j7pwll9buqw7j2jyfnfspd70miy5dtrz',
                responsibleUserAccountName: 'qj6zbm67jya53coldgam',
                lastChangeUserAccount: 'f4oawr2u3inbxbwwukxw',
                lastChangedAt: '2020-08-03 15:51:08',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'fusixd529r7v5pvticcvv25vjgnea7428js5jspb',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'cecrj7f10dmbniro4q1ddn1nb06t992qtl2f73eioest1krrms',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'joen98fgno7sbmcprbig',
                party: 'c3t6feucbecsq5fhw7qoumv73n6lq7t3y2s47mpw16hjzd9e5wn76rs9g78c5uvonmbieo9pi1osof4aa8j05qnylug5ldfshly84mwhpxxqv3s0djmb1ghn03ut5sqoz6h02uzgq6v5pbk3jxdh7zzrxidtu344',
                component: '0niw38bogu0mwd1ft0ugozyq188n4o5uwwm29mgv13xjzbkz6u525zihg0irzrci1eoln26uo2yka2qyvqdjjof033fk4w9gmtbm2c91pism3jsx7el7yuon3a16cozx948pdd9ga0ixlanl5z0air5b39m71z43f',
                name: 'jo980bucx9fz9u4iejqsm579nmiea4a5y2xwvkfx97w8trxtwy02csfcpk7dyjgnwam1xn9khs7eh2ylpbjydx2rpqegnd9nuaibdjwfuosaa694kexfcwwa2ujbqpucjv27wtj980pvgmriffdt5q6u07rxjor2',
                flowHash: '40qvxcyrjlswiewlrcmved8eicafsyjkliiixbhm',
                flowParty: 'lojvmb4crnstucj2jghk022rcbs7g995g284l92s5gwqxrp4q55w30x003q1xajvh39slr0az9xl1a4npxpzp3vr8kmjccpfzrwr0bj2c27pwkek53tlt9mp25nk9qqawyfl422v0jyide7fxxl7j3i6x65cticq',
                flowComponent: 'zv328ehva9kwu6i8solbeuw6eohtmg277psad5szoywa6yq90fofgpjmjcw6ysmc42ejhrq3rrn2iwvq4n3cq6gpt8uenb6rfeu2g50j6t8t9kjqytnjsd1urxp5dci85hilut2dott4fl6m30bx1cybqqcbs0l1',
                flowInterfaceName: 'kmvgxd4lsneo98nxx7eqiwyquvu2vhb1op06pr35zdpiretoic49cqxd8lo3aan69mtqch3bcqhkav6ebsyq902zyc4p62ukgdt54fy34uilcsa7eajqvzdm37qzbst285ucchlc66thx6uho7tjbk8wmt37hhzx',
                flowInterfaceNamespace: 'a678g4q2wvjdrrdkvrie99dktf0he5hpwbjs9v39obmgcprizpldda6t9jfn7mppem5d5tdwwfbim9hghiscw9l44lncxv036a4u7fbz33yp3onf0b2p3x448rxjlrskuds5ax8jsbq3chf3puaojdcpk4msvdk8',
                version: 'wredw2ruv3uohnd21ruh',
                adapterType: 'f5qewu634uiyey6zu5f1none7je2f2txdqwwk2edz9wqlmri3igxd7r8w1y7',
                direction: 'RECEIVER',
                transportProtocol: 'p68ori41dfwxrdqioi339djxdmp407l4n3utjalyh0fs1awtsl06an4mqzaw',
                messageProtocol: '6zspig1rwhvjo4y5oans3xi4gje4phlae0fbtpppthkmobxd4tl4oq1m9ss3',
                adapterEngineName: '3fya5cdfgds0bdours66x6iia30aa0qe6r4uck1gtxybn9zjceiu4wmc7pmyrjawrwg1sicsfwg13phvk2g2d50bw6z1rv2y4pqa2ofiopidba6sji03cl7bd224ib140co8n4r6qoq0vhgwps3v0lrvbjv44ua1',
                url: 'twhlqu3na0rjt20dko8bzqcbrqtyzrdpe526ia2yq3za86kibgnqg7gyxu0mfj0dx2v5l5mi1a6dd22ucuw7c7m9bwodckfn2sn0n82fcrmkt5n3mniv3inzz3y0yt5bhe2fp0b8p55qu9musepve0jnnhrr7cdl3m0ocipwyie0px5yiauflxexjav3vqyv8pz46s016r1hkofq8y0sc9qyb05l8cqskhpu3fjjrxqpedjerosser6mgh4997kavda488z0dk8u7r1wyb0o307efy3iixyfrv8b8a95nzfteq9567h26744vfjw5gx3',
                username: 'hqwy3e4ym24qnckjrlmn6vxjpasfmehvqmx2viynagcknhcoq6yuswwus0h0',
                remoteHost: 'b5tlufrobnild8a8lhykuzpq7jcmeum8e4exfrhhhkiluto8f41jxwquysb33vt0star25ep91p55v849w7ejalbs45o2a7bc5aw5bmjfvgensyyceldjyyjxby2lmnd739461n8d6n3ao7azrlguiw7rlyup8bd',
                remotePort: 7283046291,
                directory: 'cnm7grezokuuh1801slupz30737q3zuquqevfdasc9imshckl8d65qvmd9h1j8hh4m809h7tmc0s9y3p5jzijw27aymt5ixfk3g40auxj06k1oxz23ln8jfdas45dygsmgkgn1u7t4gwvmku45uis4giuitdfiosk6lka91p6j0dkqoj5kt82opjlpygad2hkkziy4xmfbncoh2bnetoua61m7tnkkft0jrxud0cobbtsa2mm06p38p9t57k7dresus9urmnrb9g9dolrhgrxc9mvshjgyb8pod8q81bplbha2w1a9fmzr6ht17lplnyvgersgnfn9rj1k897n0bau67y2yz0vqmw0n7ftevnbe3nmigyrkergszjk2wufhkr0m73jomwt3s5ftjarn4ln9also5gjyub26k00kr3bxtwvcfit1qf5nfsa1crghc1qn626z6fnaw8chgvd16ooa8xave9pud14fdxw363zgez0ycluoa7j87r7b1c1wh78x2pb8fn0sv4w1ruz21gk5zsmnzoxnx8vvstatrmg4i2rb0f5vv5584uzvnnmzp62m3zovb22lpq2yobfu84vfsok2bbifft76tsx54y2r86x0zwtc6c82fuo2qujj9gvwagb2dtpbm3ibu9zol68n32vyehysv469zvluy09gu3sr6vaql9dk9ndh2b8tp2b6aiivej3w3f8ib88moothre0ugjy3ns1itp6dxc659uclc5nc35873zca51of1ukdvp4mjny1y1l2dfpxv4novcbzm122uwon57x3i3pt9v4htbidvwht72h6npg7p7sd6fcojc7nrrcx8e6urcbk9oa2d3jqzsrgog85tjban1zwjavuqlg7mjsliu1pl28hu9d21t7xpnne9o2xtbw8gwudr2j86z5rk604ivwdr7t8ew3i8uzsia2arxfu44e8yya660kp3dk322e1h76q94eeipehl9ov9elks8rfvyodd3clgdk65sg46k4di',
                fileSchema: 'xx7rkwhkrcx97nadv9orjocd7t4jfrb1va5eqljpz7819ws5x7gvpqv2whyexipw0iy8ixsquu8fmalqmptpdmbedrvzzjaoha5erygxfhukuoye50yrv7bt4v12amf1y0rbtvfq43jk8is02z8o4wo9qtwgg2kyaf5l0pyz89ogv4q7ktn6af8mk1rp77kub7tnovfbvzokuntbzcx9dsyyrtiqgqwy25xarl16ejmgyby25841mpf90d9l6plyv2acmfvc3gr708g0ocjdz57z9sudxiprq8mnqmbnhek68fgfaeql3q8vk8g02764gzj8897jm6s99872xywi4dbl315obp32ood71whrb3z5zsocdytq1x9im977553isohj3514h6yh0ztl11cueab3yku1vmk676iwbiaj0sw6uv5c8e7qmrutzp5ojmjbgcj861m66ttahgerp14ifb6si5zbcxqpldwleaap86wno2ew9if1dtezcep9e5xrx8otipgidwqb43iwi34f9826azld9nvadyduw9uokg3udm4exn5bsnml875xbtm7s74gn81pwzpx414o2agbsdemdi7wo5ymxnza3pxz7174km6z8dun3fg0zaevcj4canmfqei6z39e59gs4jzyzay4r69qw0lol76iscijnqsr1sgq87ut4yjdvukw2pe1q8teq0v9vuywh3xn57fl1okm7cdl1l3quudhf396c1s2sjy0re86rrn55c5tf04n79te74qcvmtcqe3og0eimztok22ofmwu0u8pdfrlnybzjctl8sotaff2wfgnibhyos8kef5m8ahoi3qsr3bt87udiesd9e9k2fe0dwibt23ezf4y4s92ei1eiowf8gpqoxtfmhk3i12hqdly9f0vjo6cz4a0ynol18hthw6segl98zenpe448krjp0czlro8u7uyqjn3kyjuew75efgysyrpfi21skpbhoprj6fgpifxy33poy1gtnjkglubfqzm',
                proxyHost: '6kapeginn6cfa6r8jmryxtonnp0k9iodnjua4wlkeeqef8ettvhgh0vn7uf2',
                proxyPort: 3196783192,
                destination: 'dchuau46xmq86rphv9iu3mlja9zs5t159kemqo2hvcqu99bbjcjzdmsz1cq5g3rrhjz2p4pkeo5q3vgwsh2grlg0umjwkrs89xwuronzft0isk6en03ursj31n8vp1kc7o3v2w3337imm7grbpgj0yvoqc40t7ui',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rqpmhe6t15c8h2mmp89nqhlx12bsse9ootmmt793njccod8051mezoux5zco5lgkegibokem4r86biba8duvnoq4cg53impbnojyj5q2q43t40ab16tr0ptlm6t8b31uwvtrynrk43b1uob3rzulotikwisfugsl',
                responsibleUserAccountName: 'izb0wlgagsjjoo9avlfy',
                lastChangeUserAccount: 'q3ox6hvlrtz5ebvmop9x',
                lastChangedAt: '2020-08-04 00:42:06',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'b37kyxecbsil71a86edk3cxjs4b8jtabhet4fc12',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'zwn2346lqol80ev7a1hagw5iofr5n3lfhr42ue5107d944ehpx',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '9sjlhx0ni25msoo4f7bp',
                party: '38l3q4cs6vifsc8cdq37nl15fkgrrd59ynfczvapub2nj2coj4virgkvh28h1juh1bs7grprg1zxivlvgqugxbg4qldochakkne0d22scv56yuas57ucvledn9gqop38tnxwauk694kwb2tm11ugbju5tqhavhvj',
                component: 'c6dmk5kghrvqs9ndnkofgrgpkmwcn7smbuy3tjwsikaivzn1pmri0ubjk68nl8lascqthz2b3xo74gv3xrvcra75y3yngaz9oqp9jxw4d0ef2c1rvliqo410qwjq8agkhwr5m5xl90phg95pr2hldtsaevkp3kwi',
                name: '8q6zh0wvtjook8xe8md52uualuf8st7olptue7npk4tciywvarhcwo9f4ab166mmf687sinkp9bwcnnlf1sytgotydw1smv5rzouzdcxxosh4xy196wpc5o46rsabg7xj8yyc34ubbx0s7e1m784mkpgwaju8wth0',
                flowHash: 'suwj8jxupwuw9v65cjdhehnhiikqpxw8ekgpkdco',
                flowParty: 'hbeeu10ig7wnc0q0woj1oofqt8m2ien98h79sgxvkf727xqozk3jvnk6jhxmjplksvfrbdhzxu2sweuis7h4fyd4d2nc8lieg4la46jkovd7o044f1cucujjop11a5kdltonajgmr3k6fwo94we3hkwky9o6xxv4',
                flowComponent: 'ubb27zh4irqhpe3dfnhna1e03iwbv3t9tnywbbss250jxmytii4el0fe9iecw36re6f057si64vawm8bh4q8zvkfvrfnadaz130vw81pss8w21vxotz0kgfb8hu0r3neze2um1gngpf8qlseo4kpakhy5aqjdce9',
                flowInterfaceName: '19arwl8ggknzxaks7r6ffcssddbqsjr1gq7lmwfm8g22t8a6ible7sa30kl6vbxc3uzdqrz7aglmyesgkja3czq23eorpc1yah49v6givfj1fhj11lcy0a1th6kp58xl0hm1pu0wu5rh6i9p8ve16sfjwvostbim',
                flowInterfaceNamespace: 'bi7bzzt664ogx6oonvht8u16rzla4gjarb9k28893omgwp4wgy5f5keybqg8ihj5k3ef94zctz76prbikymatxktsuvl75zxduamw5s475knm2e7apwokss1e5qom5rz12e7yy3kn9jl38thpdlsjqlugl4j0n8q',
                version: 'qtdoxx9kris65j641i6w',
                adapterType: '6fzlxcc028tu1hss9o3nljs3qtps40xvtdtzugakucfcx4s06djtkcaclzgu',
                direction: 'SENDER',
                transportProtocol: 'oguiia8uxgrttik1pkv1m1lhyuxfl44ns6zysa7lbbhmwuq74fut4gamnqmg',
                messageProtocol: 'lkjzk82p01jlnepnvc0eag0szyqs67xppdv85n2wud8l8n7d11qg9638itzn',
                adapterEngineName: 'q3onfyenxc4yqhmoqa3jysm9wcbj8oos0e19h7k8eizzr5wwl2x5shky6uj75mv95q3cj95oz1ynhu6w44kug72qoff9sw57jh38l87rdjq6fc71566bs71pkag9vhhyx5t1kj9brsll68jh8p6dopaf84q7eh91',
                url: '8fydfx0r8e774pqorigl2ge22ufdcb78r16q7ockjbx6eo1tohrydg8aj7jv7wk47ujd2u8zm9w2ns5yvwqrx8as9hy8guufor4exjnhboi61faltgk91e83ue0zaorsld2aaa3kfbh0twgfqi8dfshbi6x3iavyrv0g49tjkztjn6jsqpx1b404flykb37q4i556fhm6f0frbjou9m7akr6l7w702h7ho9zzyfovlcv4d678v7ds43rz3zuv9snquk83zqoxidmwx46xco2ucnni2jkblf4r6doj9nrp3ocykbg9g63fzxgcu7v2ths',
                username: 'bnf7773ipjf468wr9nh0lcxlqsznkdjn6i5m7i5q8648l5juwlvsd5clfwtb',
                remoteHost: '8bhm5hofxajdo8jyz10k5q7bdehf23av03u2kclwk0r3sdjjs3bm384kts7rnobkx1mn9gxa5i2esbk6lv2co1yam39vtdexojqzxvg1laf1jikspsfu2gvgcuodb5vf8408ceb8b8ul6o4h8fbpep3ywk44l94t',
                remotePort: 5481779388,
                directory: '234us2vyycrs1ylyp2ht9bdi5074jnq81ssqcof8km8g61kphoalq8c9mx3gfrvu022esntu4jxzv2pvjczybhn4w7jt5xbrgkhe8790p8lfqchlic8fkqloehyr2212efvkgsphmc6us8hjngcrwv82b52vo8fw8fwqwsr3icz164xgzy3a2vah73g7q0srlbuxo5mx7prntutoviqmbpqf94gduie977pt1osqsascdhgb56ux5q6dmm1n1o2bma53n22lwdo05uw6y4qd02xoxkuxrqc4gvs2wqwpq64igau218xmerrhftaglbc4nabalyn6c80803bcjcelbvovcapuz793z12vbpx0d5e4lt7uycpi4zl72lh50n7946k15kgtwxxjdcab3trf9c5esx0np5jhuehmnt8hbjgybl543zgd0sj90c0yvwdqvrcfytif5o5ppeul15hfyoxs1y9s0i5f92y0o2lpa97rmxswu5yk1zkzpjx92614pgyyncs7q8tafwgv2n456d730wwh4u9kfj27yqh5itbuetbu6vyz10ye5kxf0wyyshjtmqs5zhsbfo1frocenchxic54wpv0fkwmgzcg3pye6yx5f1y6vfgxaazsx097ftokqds6mcncs6jpryomtrl0kaq37mt3wxj9oh5n2ll9elb0tt8rbd7ri2ah1ozoqa1snkqiny7w3vpi15auqc058yjtf1fnafiydcnt0tzwxro8xvl8anzwerlodi6yp40escjve5to8r0nqnxnvqcvx4bysiatve93kg9q5alduzrn7ter5vyqg0s2hfgdpquqz2p0zm4k87op7jr0bjdopxqtzi22cx7i3k6lqfmbps1yrjc6eucpj5g2249tjmpgycz7c2fuxrn94mz1km1mz9aqpow1c523uc4u34x40ljq7zz11p90ixpyhgkeh7le61j297of1q8v87shg9ewlo2zq1yfp0ckjawg719shu7zg696gnxo5vp9jpri',
                fileSchema: '4lrf57ucvkjz819qv8ic1c9ynv2wngdbrjovhypymfywq8osdb4i0twsgipc72b68281d4coyhc8ym14k1lwwyy38918tw1xpiwl7bqx1oj7evkzds82nij9lvnwrqak9c95qh8kburba1fvmiye1w8cf9f1z37wrg7ye13fy5dmsbbag4uq80q6w68wc9nfu8ozbnkgjzeje5zw3jmsedeeuxx419itdldzrm0xi0hkmzmj5il1nvfcvhwe0jfzuloujn38cyjh0jhixfheqsewdhptaopsiam1qqsq6f0ik0sk7212gjpadhq9f5tfupu9vjtr8i7v6m2covqx093nq0wh9w7ouj6rhhjbr4ymqpl5ps5q42rz3d4kwxcj96zgbhynxfcuhnetbamtz9sv4sucwq700sya2x3y8enfph2eu207m8w7di1yxqbcydnxt31oy39sw33ozgxqk5sw7m5t3ni9akkiue73cqfkwfekw8ohgy08xgbghti0o8wr1wjqvys9r27a38h094baz8hu5tm4g8yb87zt9c7x05hp3empt3jk0y5hxfebt36gm165znh7zl2khpzbwaze1vypb17roc4e5kyeeqj7gzjxu1g49x4exkvbvi9rpa9fmzar116dudzd2ulush9ysumwe1nh3x5lq0zlhqaxmyia7z204q87jmi0gtcmc2k01bwanugo7lxrmgppk8w26c59fsrzq4rcokts1wnvalkiacqsht7c32ktvbz3pr63iifxpkn7amw2w0cwfpqprmbdoczvnqzrtwh3lrpqiflscfntvxe92pmcmjkgz8yhovc77o961x19xylob9zdrg28lz2cjmt3mgmxxl2dultpchgoiuh9t7422737tushd5bnyaixgtxft22mekxjr8pudc8p1vtpmx09moj3goh0bomah2w6vamhppqniegxn1o8429nhmy70l1cllbquphq5ov4v5a6g6ejijjd0nr378akdgi5ky49va7c',
                proxyHost: 'bg5ormlyvzudlwokyri11sknnc43zsodukx8hnb4phpj31q9fkptdl09iuqh',
                proxyPort: 5990745372,
                destination: '1thsi9punno4jhvpkgn7acyy1sa4hzoew03im7fgrm6bvm0nwk8taw2chc3m5mhe8tcg5skmgixiu5tsxesl0m19ir0xx84j69rbgzaqvy6387pu21pe8ztna2w2y0gavh5e96nka2czmb05jc7hksl4pa8d8bk0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rp9e7rf30n5d3jg69r6or7jkm1ciicw8zu7sm2p7oxl5lxqqbplk2tm5lbc9eje1p97t9fz84p60i7j2xik0epaapbcmuya59v9rn2br62v2vaec1y7t76qxrmtz10e1dnjtfwzgd157qktg3rzuzw1zwh5aj7dd',
                responsibleUserAccountName: 'm5k7ne09frl7c9g6hq0g',
                lastChangeUserAccount: '2gpmo77x69hrh9xauyzr',
                lastChangedAt: '2020-08-03 20:05:23',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '8hw1jn6x62d7k9ijr92ppyu7zbqtilxbfb6xrpjf',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'jfhwyrbacd9wdnd6d55iqfhtseqkzmhwao8j2frav3cgsyav6f',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'fg9ww385jfdtv5pdmp02',
                party: '57oiifx3u0lsgz24o4jfj12jhtchb9e00ruzttn02ag8mfonebo89it2z7k26wkqjd2s2j74bjv1v352h4f3bp8yp4d7knx5plxmormhj7qpdrc3t79h5znw63cjfddy9cf4113z8f9denjle4izaj75cjvaiyh3',
                component: 'fb0nzpgaso7rqy8ay6a1vlms0mtrx4f5h9uaoftk6jli40sldhfd9fwg42az7h4pclavbso72m6aqkp28qeartwtja2lplkqf0eq0m3mb5pszasg5gst6jzsua5pvm95vg2wakh57pn5tuuampj6mfde7pgumuvs',
                name: 'i45mawpxurwnkd0h9eeuh53bjlaklll9leaig3i8cqmgw7upcukjpr9uc4r3fx9iehwqcopr6996c7haafe8n2vg5rqwldgj5eqjs222p43l1rmqkpkj3zm121umui0s3eliz53o5hjc85qw0eb4tl03zg9m2h2b',
                flowHash: 'z8u3weivwpvawt4yzslaxlifompvih5aw6gze07l',
                flowParty: '93ld95emn5exaspo7karl1trox9krhsehb600p7h9705p96o8q3u22kqixqck3g3ddp7kyyxvxverpz6i5rlkgkngvtuk6kfj39gx2sb7nlolka1o98rahfhmg7qi5y4phf9sctsrkp56fc500mtvs2bjll0o2tnt',
                flowComponent: 'pri3a4w38de1kudlyzryl81yifff104t9zlaj2qt6t5apkdbmzhnudthdfrj3crpqfoy79n5818jzmhb5ez0kei020cdbm6nboqwpxuyrpd1xxw2sc6elw7pwpbtxkeboveg80rukpy0toa8acn3yee6prbhgpup',
                flowInterfaceName: 'ozxsdpy4d54ifk5m8wn9uxxm5l50793p253mwi6lg42k862m2l4ru6y04l9ccrxskh41kcfyraaofhfuj7lpscbckxkusely7s6647zye3b644106z6lz876ft0agz34x2qeq1z9b9ep2q5jq4lp9ty8fo2uqwc3',
                flowInterfaceNamespace: 'dcrq4wlto01fmetfb9dgx5gb3sxkjb55qygmdhxt75z4gta3nfr2vc0ift3p3jrzhi0vug1u4s2olr8st3x3vvv7rc2uzdji7dra26m8x980fih80mn9gr677v0zs1xu4o2n0h9nj750a0b5uf2kxdx0ds2gg7s9',
                version: 'w3tu3dfqvv6zrwnu6ikc',
                adapterType: 'pz4gagn37agys3j9w9s2s9c05e21egwc4w1gz85vymtpomylolof1okvbgsx',
                direction: 'SENDER',
                transportProtocol: '8bdtn6wk5bthsq82qwph4xcq3heh0qdlh7gxjrg8gkje1n33y1kcbc6to4jx',
                messageProtocol: 'czq7j3b5bk915qwmnhexe55dai5s7vznohoufnfmzqezn4uab36fk35bh6lh',
                adapterEngineName: 'kd3hbxvafgad7zfrhj0w6bxsj2p6m6eslh4jgyousbt0w70dvaue37uemd8ob3v7wgnxmjpfhrgzib8ekv5wrk99bdh0u2tozuv5pfv1law3st05b2w88pvncsg7qo1bu4soig98212oe9wj3awx9jbw7f50p0ee',
                url: 'c1qmpushwrhx0yp5alettq8ocfqxae16v23bgnmp1hx7fyh3saziwq9a2sn7wvocqtlg8k1d8n34r4g9phj91vuj7e0m3r21kvqqzs3xtf8wjho3wsda5hks5m5rhr4u8d19k8rfpsleym3uyxlsmqr4uos3h1uph9f5tr4oy4tr8a7t4s0mq1dwzm9mp7644vbr511tzt9k8ahumvabihws0i92fbsv7irz294sarv59syulomwa0igtbe11jgnk62431b1598wkkmt39na5rl20vpnytcwff97vazc4ewfpc9rqwtlr7km2wn0k8q8',
                username: '3k764o0byrko3f9z00ikw8xze1s0n57v0x02ybqvl7ecxi9a0osnvpg4z37m',
                remoteHost: 'sgrekz24fayl5g732m12nkpijmh6drw09fj24zahgjtka0pk8p2n2j7bciz3rhv7us8y28bw6c4bpyzxphfaj1lnw4xh24nadrcx3jjj3s3nb4acvl8yh5s5x6w8z3fktg5lt3zekarxw6x4eelldgxc3djd9t9s',
                remotePort: 7651425634,
                directory: 'kpmkx3tfj9wo99nk3rlg7iflxvqr86big6hn4219rn5tovfx5b4ucahw1qvcwkjtvfr3temw35pg5r2pm1fklfhcn7q0kx4su32u367t6cba3nneuhn37ucqdbsk0pf4fjyt2ft33l9f9u5u5frbfz8oaxxlq735h3p09o3o9g7r7ndxt3wh5fkvc518f19kj9e8c8qrith5r6b0luljfpy1esjrphf0zwi3u9k8vpgozqd8q1ao5js2lxplgc6crvt7qvdc2pzine8iuwqhyod2dn8plyp2jyi0u6wg412foujmikvtbeoq0a72ypi2gp4o8b1mzvmzhjxdiopczn8cvjextbp7dxan2oeu8pd24xen61ztllims9vhqw67meb7eabv7k49etnfjq6p6772g6cfqa87oeddzc7pa5xy9u0sc3j7xu72hdx6rxsdlzteqjcitzm14j8c5os2no4y33nqj7sl5j3jk80bke8b9j3jcevo4kg46kk1s06db8rewna88alzbjeduqzhlw93l19lejgwt2meachpyzga5h6wh466rcmuo4nortbuul07erlon0alsrn4ftf0ujnyicx20vsc383a9yd8u1z0v1t07vzskkttik1budvhsvj9phmpj5etiaq29lpyzi4i3kzfyx4z7qw8500mo5xj5qgnx79vjzir0f7fr5hnq01wtud3suclz1jqgpjnb9lrrdhezyxy7fwdzhfar50ww0pypmyo4ujq3e3eem7xcqmggddcf0z65s54mnu1i56cf2gj8gupzt6dyv9rx747l8c8ehjovqu29q4wxa3wht4qjmp1jq2b5nfvyogj59g67gvn8nyb7vf7ebeg6tc0q4lpgr0ow9ah3n25pj6bdlvkjc472rv746y16sjk0pell20ytjpjou5ey1rks92mtt1g96g1p72nbn1ubkvnwt9ujlh77z74tcgf5sprunsxuqiwgbrm4ri1b8xq1f7ucvrmtztc89083m4jtt66',
                fileSchema: 'h77v7hrjkfnpj1rmh1f7lxm9416yya5zur1dliltec908awi2x3j892cv6dqs30fdd5mi9oy9bssng1txg7o9fxs54beb4fjkwxqc59m1p62gk27i68qj6rj0jq21zgtz8xrwpmaiit1i9do7gxt34r0tjdp003aujqxbwy3fjmf71wq9b0aw0a52l5hxvv6aee1jj0hm2zezx9lvrzbage3794zajdtaathl82k48lxiiaqupza5bsojcjsxw1rlnduntslm782ebwzfrzgbj5kydyk2lwwzhycaqw5lpocsrh2jnk1wgw60s6hzelbovu32355z95akhqzcukllkr8u3hgbmmpn6pshikjxt51e36b3i60c41478sgt7ufc51k7q37zly1lp3assfn6sgp0h7btnl7y68ujbvmm311l832qsm49i4voo1t556x95tt2agoge2qvx2o6wp3v57c89cx2we1vfqdps188e0e6am9nk9b7b4aec7lfs28u9rbzugj12i3baycgy94nvtyras8b4a7hrro7ur9raayf9fbm8xgr1te29a3xa58fwg9rtipr0dxa4ou0x6nt7xas893t3lmceraaqz5ybnids2y3o2boelvvx3ddd1pex1y5ahzg5zbqmydxtinsm2ei20wm0t9i3si9gkenzdmpiyekyw2lbt5zp5zj8bawk8qndpoyzij55x2exo4oem1l39h0m94k6rml7z8p1qm3bw5t2weg06wlraxq041j1ep7o6hbcgllitrrq871gben05l934cn4zrbnkmjf0yuvzyswo71zjslmp4wp3assgyu2ohq9a59odmh1vexoqwp0nzkxvr8bfof3xle7kyil31g8w9xxniqr32jajq3no3ui9l26bi5ivkm1kfqee67ldszemt1d6xihayt2bleo6gbvms21mxh0q4jb8y0r99opqh76wo781n1ajov29t5z5kfl6flkam6yg8eep6q3vep0pltwyowgmojllt',
                proxyHost: 'msd9e42s6s5po52akdbnm5nzami5gidoee66yus3v9rc7vft3ji6p3asue8l',
                proxyPort: 1092793107,
                destination: 'ekus7yvdi619jfdvxkkgm6ftkxzh198q2bpt5qoeghsp6x3lh4qi98owx8keacv8un56zywhx16cfunnzef8i4r2xwrg28vh4zqvskbsj2xt51b5tai0zsdllvqw3y39p77xpmrhczgwphg0w9upatvuu3lrje0v',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'c09nz1tx8ubv89fpitxhcrz8g0glhae4fo090zbxyfd9xee8ai67ygmytiqn00dfltxvy2v2y74i9j39thlxk3zttab34fdj91oet5q2ept2bhyuzpkx874n2gwgq118evz1o539ch36piub542x6qj65r2b78wk',
                responsibleUserAccountName: 'rdarc8u32p5m32yi9qad',
                lastChangeUserAccount: 'w03ocw8rdcagahejk3hz',
                lastChangedAt: '2020-08-03 20:35:50',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '9a5nznfqk7xkw9f4d9odbu4febsbmq5vouw4cyu2',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'glyhf7brq20dfgrhp0yldc6vw1u5tiwhbjjzkrf87afbf7itb6',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'kyl8mo6xpovx1z1rdjcy',
                party: 'zr2n75q2zi7mulbu9ydbxc5gi21qrbyjhf7uaxabiix8zr1ti1p0ew3ue1m63601rj2xjzr0i9url6bg03jugor3pv34ev33d4b1wam9s620zrzvssemsjihk47d91w4x87fkmvl4qx9rz4807tvylu5tac7d6hc',
                component: 'eqv3590yoaw3tcinn5oxm8e0vei1x60ir35fguu93zxtssbtu10wbhcruhcyxf4kftzrbec181f3lklpabdhacl5mo7w0iir9tpi7qxbsndurslbzzxdxylr5wt0jpeymohj6m3kqmdiqybp3ycv0nazupg6bbzq',
                name: '31if2f4ouclelo6ez0szwwqfrw4tj7cpskkurzo02vbs8f1fy6um3iwkoqmvi5myfxjrvahnhgcy8igav06klo9a04sl1nm50lk21ydvhjk0mkiwsr5mviir01mve1vbdv9yrh5v7ib8h0z54xjfs5qki9pg2es2',
                flowHash: 'pfrm5gih4yob9ugymtdozir449xwuzt0d2g5urf4',
                flowParty: 'o286cw1b7cxkxb8hu1andypk0psy34xrh6dyu32szo1ue7refadygixsee57v7u02q7s4pymvc7pkiv6xy2iosw19ribg2djcu00cmsknykruemsrqh2fs1mdwe9htr7ymsfqex06eki0uj2bg3x5025uwste08b',
                flowComponent: 'qag9r9gaer5jzkx889rfc5wee32vu1gc9bi0u1uff8807accfp78gtvu053eyp7res8mmf5vqk0mlp6q4mxmumryj27xv1xhyjm85ql47ogqor2xp7ctf9hslahko4klb4i78g5ne502f3f77y8v44r3dr27njw20',
                flowInterfaceName: 'acfo8cqcfpvs6s2mvo3deola7rqi4g1cm87v8ocmjrjxseak479gn119y3e0bhhmuxf0y5zoxep4tw6hsoyrf5mvdhg9gg9uaj2u5bb1wv087ki58u74pgo2mcv7u1ungnd1yf0c7kcannlfgrglzx5x1q4fnv0o',
                flowInterfaceNamespace: 'zz6h5t8cc2jpma6z5uq6nszt3g9ea0hibc3i386bmyxn0yytukx4v1mut64flzn3c5ic7hrt6i7cca7hllbx6autudo03fxxsxwf78tsozg6e5tqwavpg27tx2l5spa92jdn91x47ot0g68erlfrsl2surohs1l2',
                version: '493u1v2d44jr9ciggd7k',
                adapterType: 'zylmcoy54htmvll8h3etvr9q9330oue5yh150zkgclxicbqmg6ilsfkng57b',
                direction: 'RECEIVER',
                transportProtocol: 'sig0ivycm9ha92c9k4n985yr53vss7h6e8k86ua4qeaweujahqjz5buunxc5',
                messageProtocol: 'px0h18o1p2oafay6ytglhmi8q2gqv8s48ciuxpc7ob6eg6dn6u69tqrg7ngq',
                adapterEngineName: 'qhwfqh7f7pa29x8j9va38ohqeikw7lbbmahjuhbje0oh8bops4no7hbkpdraih90k14w9lwywb0pshms04hms6ql0thpxkpem33uw33r15p89b3ayzdxbmim2lz9iki79qlrtjnhxbjwftbhetdvlymnxd4mh9jo',
                url: '40baitxjg5hv5fntl1fpzvq99pus5nup5hor8tqkb0pel6850jgpyy17nof85dwpymrbh2korbasf5kvx4my1wmltata5pe0uoq5cra44i4ra0vxlkmouhiarp2s0hmx4jm41l8rcbf6r3cnye0q9duyao8f9pkzwhwq0kxm1gh1byb6ycfup36fymi0vfpojhqrabllp1oaz0akrcogdzq1owv15c5zmeoppwudgr61qb3i3ivia0jp4qda5itqlgl7paubkad5ry379eh5cv4r4otgcx8rcav7uumjcp6cnc6lu53mvd83ilz7nj3z',
                username: 'hzxyunju99wyorr9e2cn6v48l8315vvfrio4k7jcbcuoh3vz4vqevbq2uxje',
                remoteHost: 'faq5jxzuxwzon6smh91ar6gwmm5q413eiasrk12t2kpv8sp81xgnr5g1ozkzsqbcv0tg0f2scohx3evh7xl3jp2rtzjf21lbo8x611m63xlw1q0lmqxnmow538tz1yyl3zwj2hid5po3o7qpveyax49gqyuzkj0v',
                remotePort: 3986434007,
                directory: 'r5bkqh4ou57nh3nx6ajexq7hxe99hxopspeue4g1p9kk6s9ugontsdp73nuyl1c528cntyy2fejp2wm41vbt4ldkqz3o0cfocr1augco3he3upe01usr75i2wrogi4wkkuqvwbcp1adyzywxhix89xd2v13ud0c4sm98ouluixxngyue060u0vnrvd0buin8xn99bh4ewdaq8cltc5c9ivhx1bhnkwyern6emrktucgulu99hcroys0pfzmpcfqsh7wrx4867nsjs4uynni5r5mm3j0a9rkageb5xegaua6u5ddukrm5wa72injkpd9jgfye00g0mhxm8g3l2ikcv2kaska9pe21f0480lnm1ssdwnuaeofh7d4jpvwlv6kgmxckvxe7rdbw2cv6bldcba2jwnljws7ik2oh9vgw0q6r8t3bciln5ce3yrrh2ej6qxqeqyhyq8fb5st6kdfhw45jgo343w6cijfjaifo0tzf9yscpbl62cm1khdy8vzfdz13avo07gqb897pef1g2v7rjhb6d3p73xfmqh36wled4om087qk1pnixxgaqpyzn2xumh8hq6i2qyzwafh296y0lvojgkgva9bzut9dc1csumfjsn0ru8vztrnggfgb51iv01iy3xuvyiaioun28o59k8b3lwb8co7tq11769d563s8lnrzhz5ldevqtohrq734beov20uw55a7y7j2wuma0jyq2v3rv89dxfjen2g9z092bmp694kle4fcz250uwidxkfzl515b7njturqumsd98uvxiruq4o9ia0pgn2ug4j2s29dj27i9qtc8gvmnfe4sferavlzlunj5itqjpns1xx6m30h1wvv7g3la3y4zmo7y5kqzt1h4f8c1sw8osga1s2r7e9ux5r2efuhruxd20pye3y8yf8pqrx2uuvbxy4j38gn6o63tfpwd2nhvp1t0inusoxi3r9qjl6l0owj0wglz6d1tum8h2l4cpn3h1ehtsf946llvlep1brk',
                fileSchema: 'bjn5rpb11kungn9lkbedpfwpeiu8eiup6y75hx8419au8m715k55xexdh48100e0ucd6qcryg1l3tor9mam0zfzghuo7snimam6q2df1ex56s8j8s7cdqzoauwkm43lprf7z8k42b65b9d0iiwly44wpico2ffgitsxor5xeujwhu325pu2jy83a2mf5kiz5trmrc77s7c2bofwj0hrmjwrttug69g0nn3ewrobjz6pm5r675u786bwfj8agbz7xyq537qubfmufzsi2qwxh1lcxednk0lvxzdk7oylz6rl8mfssh4153ijdj7lkqxbu10625c69ysc9z8wg67dqv64cb76cqnwegeuwd0125r0ota8al71jvdwhbvhp0knbfxf4m23vooq3vkz4frfxce1yxeiv5ejjdiqm1sepwzjraqtc9ti6pvnxl7f8p5ow0mrc55w1brt8pz0498gwlf9hw8apy0jvc54ck9mlt098l28miyy7rh45tgtl3cz60gkrnao5pwuivexac8m5q6dm7cd704mll3r2jw43qsfzw4ofels8zz1h3f4rxg0olgh21fjbqw48f5iqs1enoptq7wp6ra16yi3z8rx6hguvnd4stjlq85y7jmjj0fing1wt4jwxnpigzq56aqnx8azfmmnn9bm2f2oudw4936bw8yw52whebjogle2hx00m2lzlsgfsjmjmjozd9ocrggr6jznbyao7g1gm5krkptthq7q5cma1anuqx3n2g74s0ryu4d75m450r503zwskrqeqh5tmd7vwv8scltqjyaoulrykbwuqbzn94vcyyt52nntxfupqoj5d2evmfsxjk5j3jbd4j17otcazpew4dg2q20gf7raohkxxmf44frxjoglvbeet0prcb1mso4g0jpsbcdgft8o7568osjrw4qv5qbp0h89ytc5ro5z58n412esoxur7adluift8ku6pqskycjl9r56p387snr9biv8bljewvuvfbq7f2stqkdz4',
                proxyHost: '5flpuu93qa3l8fzv6z4qbdideyvichrdn196f05inwx7qp08iz9pc83u353q',
                proxyPort: 5080839208,
                destination: 'g1vdgk2i7fhlmeldvt7rlgk7xc5bgxjc1c1igxps82wepuagp76dvll0bunyf7oeh3xzna5rlq8xedy8e9mtep9aks5hdmngp82aqxmdyvqf4jtg3ptwjzkm7txkm1afvss4g940o6j1yoayvibxnkx79dcahsf9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'zzw0uewlcx8hq4lxk1fdrb6t063lldszh5kdwg906477x6guvnqt3rl2o7e3uullzvz8xnq5d6u0ffmypecq26hmux54bddbnq8juj2a2xrmaajwc0r3elzov1hrvnwvtf8w27o7qi9cewbrn7s8nqxv28eqk9a7',
                responsibleUserAccountName: 'zn097vsjt756q1q1o63m',
                lastChangeUserAccount: 't5axbii2iqpitvd55r65',
                lastChangedAt: '2020-08-04 08:57:41',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'rcicy0bnrefrxtdsb47h0lo8dv97qwkqr818kalc',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'e3gr47bgmv0csqp10wwwtvch3nuu24yparzfogff2050pzb4om',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'y1dskip7jyxlwxkqt6w9',
                party: 'ijw8wv92eb5kmubn50qp60rq9gpc4nnvrpb870zoijorei58bdpg10hzuxq7ew3ejmk6u8v4huqd9i9vvzi5ekv2llk965fku33pjfhfori0slkd9izbvivsaurxlopw03wlyl240f6b7vg4dr24wpvua6ustghd',
                component: 'u4rtps7gsiyqknq2lzvix4o9o35cja0qf02ztitdgalqq41rz46i3xwkb9v8nzdeq717hcxs5s41laebemivd3563ctv6tynkn8l001zy60942ngiff8w3g1scgh195j9y1o9hwwouc539mqnm46qdghug1rhavq',
                name: 'zdkas79360a7b85ywfsgkdfd4t7dpdgfyg4w3muff2bo27n1tme3gfnwzqsgcnykm4mm6ujh9fwu0ql2aixlhriekf0amgsxz6s4hj2xk47szv09oqganvc0zjqjoz9qe7r3z0gf4crsnvy0m3n5cxlnorekxh7u',
                flowHash: 'y58ll9lc8hp8v6mih38zruo19ul4yu29r5lzfk72',
                flowParty: 'd89nrwqxew3ia25h3g7zwioe7aq5m0krc6yoc2kuus0tyaidus45bkwkjkjzaima9vb1wwz6ck4af4iojpy1vxq3b8lxf5xa9cny7u5f5zvdelouas4jc1qqd57352c12wpfy392bjdoriygcsi9aktg5m62yz7p',
                flowComponent: 'tud5l52cioasf9lwbvyg0qlx5tpo7q7sps6cuyec33pjx54ltgy96mav62lnf2u4x87ipaqpgr62q7a1hwv97g5569r3zx2z9tzgvulnw38jbz60pzsmqj7gvnbubqhebrfpl8yicwtj0ey5aupuygcskto16lxw',
                flowInterfaceName: 'wfkdjl3j62lsfj7wqpd7zr3or57oak76m0pcegg2zobahjrpie9a3u9j4sheds04onuo7z3myux75vw32watzmuyeratnxtuf4vx7eiqulv6b42kohkkti5yt9415fp7fu05k7lc27rzi9hmgj2h1foud56k1187d',
                flowInterfaceNamespace: 'o70qzflpnt85gmgdsj7k1htzu5iwp5eerxboj7tfuuzdvh1anxf3nbepwcw6p66llavfcmberljnfutxi7sef2805hi3tzovyxnghur4v9dl5hzxvqwdr6i9vni2d42u5oy4hyejhlxevr3885vgpooxf07pnw04',
                version: 'qy4opw2u23krubdqd5yc',
                adapterType: 'nw2rskhqo1dav30adpltmpk8fv8p651osbgetltsgozcs2vlu5sv4ucm2xm2',
                direction: 'RECEIVER',
                transportProtocol: 'bfjl4lvb349bdtntf20dgzym03jjog3grgyhzc2sw0b8p8b51cgug2tfufcr',
                messageProtocol: '78p99xw3crbfc7rntdahcn7fqike64cs3zt18ht98owzmdi7mghysxlmcx4w',
                adapterEngineName: 'sphnakx759amgmp9lhmumfdgd9rtwo8wuh85qe15mo6ca3gxm1mvwtsr02b3ms9hngm0sljit3b8656csoxro9bss21eyvq1ichry85229a55j7zoprhnasmzudkl7k4f2qkhiio4q3hh2ibl61gli73u5gim0z7',
                url: 'zse3u1b8nbsi1dc2lku1dkmisvurspzmkufxirn7etqqp9nqu3h6bztkgoicyzpn7o5hkxeszwh8x551lx99mvrx0o6awoszmqc39ocq58bxkze9d6baxr0q0623f63l10qh151ezqttkvpfwqhh735fkjcqtjz9e9x9931ywzp0p6w19bcha1epk0mc2nbmubsbto6uokj2805561ef9ltreb4zd59mhu5zhc3vkrc7825t5umfr2fvypk6p0z17uybovnmi9gz3mfcp2lmytbvwrk0nfak3d7kxeatjsfw4x8epo3esyajoaxt4kd1',
                username: 'ucwa0hj8ggezdthys7ggjux0aavneiltty3micfteagao9nu4zi175j8pavs',
                remoteHost: 'ez0d6zlr8u7xpz4o1mkilamj5dobqdjom33h0uogkb93bz3g3kgkiq237ktrf88h9r4c8omhc1ooui4ao2hb28d6pt5ls2mhvh8sh278s2ip4wj59g5yf37ujegqab31zfa1llaskabrfhp1j4isiviz4qvcucsn',
                remotePort: 3657240626,
                directory: '5i3jg2vgl7un3w5dfmedi4b3xjgu0s7kl6myckhbpqijn0iawiqial4nbmgahr2939e62a51fhsg7wswz5i7iwadezik2kf53i8set7o5m47a41icfcsrtwn54y98cgfic85emf1rinoxm7dv7geyw9efhplo1xpbm7r0tbm55bgpi4xvgdmqd33yraznxk8s2nf5aaebzknabzi1nvlsv9alfe8ghhespo5w1z1wcherbvfpx97kru9jgdkdravajd9llcj6k04fupra0pfwsblvvv009ziqbv6740dgou5oaxb0we15t0rsbuy4twywnmouuvd1nwpa0i15dt9aytpoj4txfebyl3smvcbcfvjeodsnpy031se6zjj5xf362y8ospodag3w44jb5fxqg7fssxrw95gu1ysqqx8cc7ib2tljln0smwxbr3ulqbcbl7sko4cws2bbv7l7guwscepq765rt8wyiaoyxmydsdcg7v6o10md49yh6iffhl38ym85t4eh5aly0lwg3wbkwod0nlkp4takiiqd6zqqomyqlkpzy5md8efb9nhk8euxkmgywc2zm8fy122rati38bekzpw2xtkub8u444mk6xv5jsw2uclhohaysm9psjyec62mkaqbw334vjxpcj6uqys0yin6nhlz99js13ciw6fc2magprqlnovuf6qumhfrdbw2pn3edb435o0tx3s6q6tx79gj699gxuy3bh2inj86zod2e7555u0bxorh8uhy9zw6gq6y64iihmxaj3u92ovdyxqmxvw7d2gctzl0hhe7ld4rpxyo9sqkhh3hloqdgqrosnww1k97ztx1my9ow5ap6854fsyo4ixq7idiod0f140m00x04ap12v1z77djrh7k8h5ar62hz0nzjfrrgtqgvjak2t4s1ng19wf4n1xcdkoysttltwpvjzjp60zhiuagfjgcjd1bzyi6pc1bqfm8avsqclswpmjcsj8wh2bd0xswqdu0nmarwx2ikum',
                fileSchema: 'f5w4qvk0u5w2vfaag897ke5wavncyeofxrjki9726cglv5gs4uuoc2hh25d2diuxru73tq557w9leyp9n3afpatce96ndoqgmv57aj3h2crfjqp8r0damwcypt1tb3q52yvzanv2pxitn9kzorc7vlo77q41w8680yj6zxflefuvbk7gwj2qgzhijjzsf8kpwi01uyuab9mpt79xbwjosded86hwsd8f50ibla8fq47645q8fykcltvwkyn1p8bsyg6gl9ke87exgtc65bduy9kcfpeu9wq0ovm0y6wkiq4gw1yit0tv9ioj33z9tcaayjumsgp7olgauolhmemkwtj887to96fd5yeu6oihw0wox2ht6zyfd4lt690y9r14y40oazau52wy36qyovjo5rn4t95yhyl12m55xvyl8bl39osdsabfk4wh8tdt4lc1mqkvvkk67pzv98zwc52gk6uv8k4ls9mj2apnuhr9830e6rm0gc9qwl1r3hh5ox4l7h3jngs5wzu8325nkaeryqz2esfrrykjaojejib5jhwhtx2rzf83u7h382kyouc50ho1eogp39dollyar0kzh9i3bz4u7ie540l7n31wpgknqdhyiqqp4x80gsknfcjv1edry24qdf98h863fzevfh04fqre27mbpgrgmczg3q61oy14psw4wn8x8ynci9r1aoq2nkzlgpk3beoxwixin87nb1is3qgvu9ynq87lwba2nhdus85t0ptsfqzfw4swdfjpu1ofhjmtc343ws4pl18zv4uksy95tkxld7j90tvs3uuw2af31ptu43mymyke3hmlk0r08oigyrh4915vt6899tdvjrdlv8qjal8w0r1317gjc9dgl1626bxf4mb7v0yb3x2mr58ioyh4wc64pde1tiyz2egttjtkr4yw1lbdlgo6pesc72n1te6p5eksvvfc9zcyfzop3rq6xraio2p0w2kx1io3ia7wsxx8n6yqklcu8v3u4oxza7sz9pcy',
                proxyHost: '404pc2plvokz0cy836ux1fd93ltcpxreqzhf3dn8z2wyblj1vabpb00o6aua',
                proxyPort: 5517485383,
                destination: '7a5lw10r75o4a22qtbmeizd5yz5zvdangj7qwjztk4gppagdcu732m30c9ugle3hgxycjue79gpc5ixrxqitt1gziulfr2888wi3sfvabd7qjc7hufohvsysvxbacfjv61yrp3otsexn5sumwtsi29n3zq0086db',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8euktbpsccq0qob42nl8evdhc63tn2x7c15ald30jsa2sb5161x0ude511m1mjje2me8g516gh3gvf70y7u7a85elh0281barqz3yj2cv4e0w8gr3yc3wh8d11k1yc9wfdj2plp4s33c5u9uous3pgrx5zmj4dh4',
                responsibleUserAccountName: 'px67avxol4uozhy498nb',
                lastChangeUserAccount: '3sqpnwu2md4d97uv4mw6',
                lastChangedAt: '2020-08-03 20:46:47',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'zg1ruue34pwy0zqiqidxe4mc29m5jmtjx82hq24x',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: '1xuzf1njwtm56hochq0c9djcmakx3dr53bhvamn31tp5bjzhaq',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'azm1b4okznc8288d9wjl',
                party: 'aem117gb3hes7mk53t84qj2ks62nla9738l0199ditn20u6r5tcpjxprhyc8kc7pkeg1vg6l1v5wk7xmok27q395y16mmkuf0azhbwsl9dzwa18gnrvefxuv494pg673dshkxftd0y4zd46bij4kg55n887il1ms',
                component: 'hofep7ohvzlw2a1t37rp6uj12ro9qygtq9wtmsvu7b5hn70tc1gm0xvqjqgcpfxde6urlrran54l9242hyxg5ehdws2m78mfnkhu4ch6x1vq3v99uybunm4cv3tatdg27afwyurq8gxjev1jodggx5tojhh52axa',
                name: '0dp2mzkbs2v24p04efyaek1zx9tb3pxx6rw8j3zqb2uefdngnqzvwpo8n3nvkviko30rgjd7k6jmpfi8g3i03ilt2men300v6btlx5bk4uth1hjgzo55gz575a91apzkoqsga47ebiplg95lsn3rwwbhcm9gde7g',
                flowHash: 'abd2wbohptjv2hpavtahh5hb42cuoj81ed9zm3f1',
                flowParty: '5ovar1ir52aiugclc41znkmooir44fui1ee6lkih0oiehnd7sjov32i4f5t8glqvxm7u68z6gx9e5bxik6jmsj5jv08s69rgo20h3iyaixa7rykvr8sl5dys9oqvxxbfzakuz0h6jqhc91edt3ho1ql61kl9de9p',
                flowComponent: '69uz7mhjg4u6g1hb67lwtmmctdw7s8h8qaegb5fqdrfkpwu2kh99usg9xs6pni1g5aaq0vkflsxq88zpn8eazacfmu0ww3anbz5g08kzq7xjnio37amkc68ayxqnet60ewz1gaon6rh929a6w7vb093yy1tnom26',
                flowInterfaceName: 'wused8e99hxplq9mx219bmhf5skypf34cj8c0cx6o6b03x4et10qww8lwjusm3gzhcw5pmh7s5eor6owwf057x4yhuj1284ykvsje7uwgq1ttar0iqdga1w6lqxz5h2nac52r38z5bi7sabmk14yc19m80nf8kdn',
                flowInterfaceNamespace: 'zbw71m1nw50yvtzbhbxbtct8rdho0ubk9yst338r32dvi8m1ufegttkdkzhlj2rc7r676youbqs1bef500l8fcr9oh5gxewampy7chxzufgf1d4n6znqgb9mhbiate1sa9il4r16ji2wwb0l80y23zem8o1jcuirp',
                version: '6nly58vfhquxan18yrgs',
                adapterType: '3bnoh9zo4kssztbygf53tcctc8rc9feffphcmmggrpfa39ix6127587wrdi0',
                direction: 'SENDER',
                transportProtocol: 'gzttupr09nsg92d1a53ddr7xan04rblvwcwagnvwl58b8302atnnc1ekqrlc',
                messageProtocol: 'o5wzh1ahsl4339u3g7uslq82acq6pghuj8uicsn3ujcgz5xcs566yghak7i0',
                adapterEngineName: 'qlf975olnmjt6kyaivocikg8zjjwkgbouqj1uayzr57pfewlirdx405bxg2b8s6axmnp8s449gs4u08c88hoi6ii3dzgenbbn6bp2e58p8rgznnr5bfln35e0tvj4gxsdkn05p3elqthz74hta8s6gid4qw1w4td',
                url: 'mhrr6v2xr4bhsyi7l0flrkgog6srkd7ijtsb6jirfhv9sn77ya8orl8p8t3cgekp9vz3a1c2zyiw6wzvmjmfudd178choldtkybmwqydwbv4w119depbmmrgzzbkgzlijldmh4mqe1vuausucaurbj4p68y7jyllui4pmmirwtms42vhh0fts6vr69wdwjdw3224sa85743hkhszalifu4habv6awdvxoonu94y7l2xjf15xxmccf8v7d3qu7pgupl2j6rn3tekbfu6djdinfj4nxp39o6u07o8e7o68s6kh8ud7x3vuhfxx0noslswo',
                username: 'pmlu8bpcqig0h1tlstzqgux9t8in7v81luymng6mr6vfopaut5iyssetsaky',
                remoteHost: 'l1d3v3r9r10phlkbm694m02o5u81tsdpjzc7oalg2fdhrsi88vwlonnrzebptkopyn9ee1izme4axe0qj4hxsbwyx8rao9uqzqz3we77btrgv8ro0psn0405ni8xwm6i1cbzy54g5pmipspoi4pb64b1j0v5u7rq',
                remotePort: 8741330790,
                directory: 'lunb12a305tjt8askpgyciz8266f9atwaf8tduart4n697ttr099lpcscj3sqeif8ljtg7qpf2d858pvbxq9emfhfewrwl7cd9atzi500q4hkqyqg5nrgg1cazd7zj6fuq9lv6zlxuwkdp2rb6mjbuhbps8ug7yg2d5qrbfy1uhp3czqdztl306mb8raxm9pnthg9dwy5sz2hqe9xvk9djm9hupanc65ykxs2t2am6w9dh2rj5rjyj8lpu78woaoykftjij549obkg0gsloswwcfdu9hz2ya3qpfcrb771yac6zrrm8zdr2clcfn5hlggcn35nxzhg674emee692gmuwn4blb60y1hjra786826bnx2nawdj11xod1mzrjaykdbyz31mdhyy0c8xfm1shaoz017li3xhedizfzet3j9ez0t1hgl7asq7dudoe1vk1woos22snrr4by1j4kdhm0pqjet019df9pizf13x19x0kilc5tkrdkqhd8yijh4045iy2febbfht9ume7vw1900jhtn6yejz2ylmj9yu000afqmszk20csysrlezmuzhmrst4kgg0uxkqq2egqqy19ml3d0vu3hyqsvvtpsmknvb4oukcncljqu16lhmff3ghrrogrxs4slu4gtnuq7cyqnf03pja1o4wnsp0p76cph2gjt2idbudfduxowsipab9dol78bwv65gldli4bvey7phpql9bd31c307zyudcopwj6udsaepydwnn6u7y9lq1n6addx2kfd3898f4mgrbj0ryumav3khfo3jbllf534b41cdih5tf08c0nxts8z2dfocbdq6o4n6b1khu5dxjqmhc5t6wvhvd3pmlfql9psin8t4pj6i52kau6mdqvohu6xr2hajkvmk7f4orvccvjzeswoyz339ickavifmurbtkx8la9z9upr62u3rp5vsg7l0mleuydaazrqoozkazbidkkejbir6a25a9ru824qnyl3a40rvmuqtceevj3e0',
                fileSchema: '3bfv8wjc8jxjcr45gjwup3ercd0g9mg23gx5rv8tdhz5zr1wbenfece3786cdzng30k7msjul7xh1dj11rxiydg3ayabr74g573f6b956tbs1kp5j8wrsedk5nljngvs02qzp9ntmivgyhynrpxdmnfepm51pqglgavknj9dya8fkyp2u8i7s7oi1xuy135h2npo31puuqsp0n7ynyrrmdcl1unv2cvr7svoceycl3ns86efm2n33ocyuj9289p9kp8p3lwsumjpkqpsfqveva8kzb6v2q1mmj7pl7dmno0exsetlep5w9mwdc3fgz97dlvd42mtrnqfe3gx1ckx8mbvwzl6fdrgfltt4vomgvwx33kd8j391yj9iu53zngg44w9h5e1oaqg6115l0h6yjov30gyv9hyg5u0pize3d0n65rway0lpjnhao8c54hi9k5nud8ttktpgshrqjwkipumtyx5jqcsot796w76htrioqeed1p5bto1firrxxwu4b7o2npsz78arqaob32i8z25qc9twdjccky1d4tqgs3urrlr7wd7tct36slszaw8p1t541du0tyz34av6oazfcom3e9gkaj4jlzzixnnmhw9mxgi0or7xcnwbezmj6h4rap9vpmf9ytljdgbiwtx8pgpu8wy52g8ynhca3krhsr9dlck5w6rbvv9tm8zc54m3pol1w3l0m33st0l18smuimziqeecmr52or09r13be0m5u3renth1t0136pp6jhknxe57u3dfsr9ctisst57xp4oumtq1mprtv7wz8lginwst2xjujw8nqci7j6lgewmr8eyrmuleab7yw0ipx0hm55w871w9w3r1xnz8cbv8l5rbyehaylcn9heohds4co5vcm4u4fhkrqy04pbtdjn42wmysy8k608dka54lqeggosoutuobhgnwwuuiqd7bw065h2tb95pouty0uc0i8zs2poawm02qjtvxk9e0k2nr53ffs0iwoxqovbdwtw350l',
                proxyHost: 'cx03v793lkmvdjflfo3s6sfz7hkjd3iv83are7r54v18m4md74ish15ez95z',
                proxyPort: 8283070474,
                destination: '4wilmcpgsn7xv4iilxcrlyrp7zxvm6slga6ekb2seevil5b6zyw98a4e5auvk88qwxv7wce8g6s38sedpf52ath8b21l7q80vven726448eccuwr1y2wslvl82gqjz8ue6qaf2ee430urlzohsrxlziac1jp6c2j',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hgxmccqaod03p84k46dl7m3um232jh4r3q4hih0bk4haq2mx9k134hs1puugkvx5bestmex74tr5n87jy76sj1o8288bp7f65iqjvt8h2m25fci0705j56l24p54xtq8hvd00wqbpoxxgob9s6f1p67mwpi7irov',
                responsibleUserAccountName: 'kt0b0owoav4gxxdqauz6',
                lastChangeUserAccount: 'b0wvby8ta6ppkxc858dc',
                lastChangedAt: '2020-08-03 18:36:09',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '23zccdpat7aggg8m3ebhc6b4leo4vog4x7mrk4ep',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 't54eo192h9iz647fbytbj99ak96802wjetmdqbpgbd9qk2catq',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '31g962n5iijugkazxyjo',
                party: 'psdop2rrwq82c9yqqhbrkhpgg4g3xm3jlixct8hmtntgqpr6jg9remrorf7m4vean3tr0l6pn33lvpxiq1npzq1acmh13vge961yas05zii3h4rujxkigy4n26evlyx8kj3bxiy6h0p4c4kf1jbf0tvchva7wrb8',
                component: 'eut95qr329f8i69kgk08ovm9uaq7cvvna25kuqe2q0f1e7l1se8elhirs4ii6r7ai0jvku8zu67qqxya31oj832bcvkxtie7zgmt3uvqpynoq6mc0nch8sm1w3z4o7p8ot4cinin46m32a6nprx7dy5ppkrp7kr5',
                name: '31anzxkvp0ticayrl057658ewhep8i2vpqk0cek2v7d75bh7shjybfubbawhu7pejvqbuz2ygw5i6v815b1i9j4ghoanpgugp611skwburw5zwzojgxng31lf564fl4y1guxaopxnw1yx7w782kaa7j99uboemt6',
                flowHash: 'sd3nsg6moygn4lfe9zypempp34s68vv1wx4dwaej',
                flowParty: '7pv5fhrubq8n397yb8c2btxuspyhp317x9zzjbkm80662alaciwb7lij3aj8y261p5qno5w6z1n7gx56dhfbmzvmand3yr4upkta09yu4ntrf2e246tx7e8njyeo829v4dzelcakup1o345bjkwsdrg6h0n9mqb3',
                flowComponent: 'aysxjuddglkqo2f5ovue5ckp49gdnt5us4ygvkxrb8f8imdxmrr0nddm9hsd2p0ysb5ucgsz7fsf1t7ecsxmc49ebo19y6ha0pgfs5nwlrms46rh8hnkj3sm0umf2jeqmw04zcl2hfjy7uyl0o0rbt3un2n6hyjk',
                flowInterfaceName: 'c7tadary930jvci3oh9abuxg79gw0e9d9edtofxq44vvwwujptbnqv0jjzcoodo698puels7yvpt4spp4gdn2zzdg8pazo8funebug7dy72uuh9c5yx5pjpint2cp7slzb11cf2xn41ffsqd9513kbmmr0e4xhmr',
                flowInterfaceNamespace: 'tw0khmgza3y54k974i5n79w63ttkio2lvqfswzi5x22n8qijh2odkx5rghc15kjckhl0gwpdx9mw6zi2h5dv01jf2fakxngl4y5j6dege5hiptceys3ftrobwdey3rqrqyd679gtc0bwf5c3ziatweubqe6fx0vt',
                version: 'psazracnnc8rqstxiv8zz',
                adapterType: '658ffph9gph709pvo3gnmo1exmpm784rog36ipvzorgxp0pev9v8u87oh8cf',
                direction: 'RECEIVER',
                transportProtocol: 'xgzglg54ie0tgedfwx5in8jcwwsdl9rk44elznf41b4ry1b9hxhvovbhcrao',
                messageProtocol: 'eeyxf02vpfdfxq0qk410rs5xkbjgshgtv5kq109rtz8jivx629h6km865dp1',
                adapterEngineName: '4e70q5xxhew1d8tpi12yhrjqpcx5g766ft6nm1eldrbg1g3syquejfkpu62jv4zihjk0e2918m72nf38hx74are9jo7gtcchrwldd3oo8034ta6ziv7svc3ucarlgldlxh3p1mak96v542gpu2vuuqs1v4emwk50',
                url: 'i6m8vngsjowlkm8y6gym480n1vrwii2dteijqscudphfq1qzepotf38tiq3ghhifj94onrynpuv346kjfuf5nwki8wnlfyj4m9z1bm5noi38f88qtlshake3p9c46cyeszzp9k65zn5geelj2tv7ugfbj8c268ge0ocrybazwy36vt0yev0gkss6emrinfd2ailw3op0gkgna308sqzsigaz100yd5fau7k6lt77ex7ukzyl8g4ojq95jmm4aioa0z3feumnen6z0rhzdbvtnwk1m99g1k7dgzzsph5dtfewa2pv652348myqlgktuag',
                username: '2jaqg9043xf3t3o46p95fe22lckchi2mwaa43r0yf2ssjms5x09b3rh5jdxh',
                remoteHost: '8j5sdy5pcooefop0mluneubo5uqqja0s74uv6w1hd6itonchwa3phl4e1f49uufa9te5efj7m7e53e477svc97hc1yv24wzoetjc26nz7kltijy0qaxupaly7v89we8j528feuqxufkjp4tan0w3hgbtizm1i4dv',
                remotePort: 5026399785,
                directory: 'f5rusaj3u2uj3ejeb2db7ocnfh7g84qyzvw2tiwkgopqvt8tnwrpfpt747p5z7ekaohqsq0zno0x4yn02la1bj2tzsra8zae6ad70xkueg1emp58i6ztshxg3bo10dwy9ywzl98lybcasmry94kvdnik8yqlk0fiwuk1cwbys9bwsjjrr7r9wbe6scx3zk8cpftccg4edvihk2xvi658e8jt9beghrsm2d6123dp5q2kesq5aybm8vub1m1gbc6qu47ou9r9zy6lopmaaid5b843l6v49sutehcfb2a42p5iy7b00x9ds7ck5w9mjyyzzawvusunugs0s4qiyuje9lxvajng9kyqj528rjv649bdd5m597i7ho1w410tbsq0vauf46v2quthzz9e30q3e44fevbb10qu4gxkcebz2xfv2va0j004ix7rnxc2gu6jexcek5tb30kte9112166v1obbn2cnodkfti6imk2ws5361sgt84qwp8f4cii23yboln6fvbx90j4dx5jggnqecxxrtt7t8u945rw5d903ns3sp3y6e9xot0zdrle64bpv62m5zekh4oow9uf7md0o87i4a47zf1qtozjxmzxt2m3tulcqqvgs6l0oi3okmuobu6e67xuq1mxj3jdr786wbndbbsov918z8sj5v3z8wwqzxc8mti2d05z2nx67zhgh3yq4c2jd0h5uzbqnw1a67xg7ltfroumm2tuks897lfcpbgm4mcn4pl0n8pbvaopfxyqdiagh1t39cbqdyih31hzwneeyd9ng0tqsdj02ht5inimjf35t8ynirzquiieidxwyq51c29dxo0hjzx30pgr4ukgapee1d0wa4x43dkibx64fy5oko4ezh67ppee1ws76tvzgsphig3b5c21peoz1il56c9d2saezu1vrm10s4mzlln8xefq9jdnv44lscwqpi4o0mt5uy1cxzgw2domt7c3cantfn1fmtw661y6cs9i5gyx26m5p888065v',
                fileSchema: '5yz9glk3fvmo2mblpgyiwoyfp6thlp8yh684vdhjd9wuydm37qsfbxsb2yczonwuicrp7v3nttf9tg9dj6okobqmklz20vzzwmmur41rdtmlfde6txiucya6e0m9x4al24ka6ht6soiu415vet2rsojexdhzngj1k0lwl448oxx9vgdeglmqiedcxdobyt89ka5rhm9ammidvicag0r712bxady8uh40gh0f8kidwquga4nyzin429sshewv7wgre2o0ozgfzlmo3ek8zex4pbkeu5qt94sj7rwjprm0gwoejg7bl3re69dsq46zq2tpxlgfylfrg07rxclxx9jrst7gigh3ytprpt7jaavhszv204fwyxibxpywlprnquqffzo40t5ses0vub902wklex526lj3gbbuxwa4e0b14107eglx4u2umsz76omnv2g3jsqjpjgg83u5gsztmer8fxz8kmjygl4f2ks3273233mtc8chkb7rrr8cnpiezpny5crt73e2pjuxt23fxzj3pwzlgw3pzk243tf9ooazi6vvf5fiv7bsqjrw4g5s3awyts1af18f3rgp4yt6ay1zowfkqqwmknv719tjdt6unlawk8df70ywr8uc7bx2ce2baqsy68nas30oopwsxe4qt0fnwk4ehjpvi3nx6wm2qjxnmyoc4xwdshb0urihnax5fkh438p2ta9f8ax4g5mh3w6217f2vrzjcpxa8wj8irmepldqiwcm7npk2kfiyikio44oxai52yqo8hd227254wqk2b8g338ixznrsanvyxrwl60mxz86iz2l90fwvgf147h3q94lm9hoxynpskhajugy5z9h9o8itzk67tsyflzzerhwygu8wc0gdsf0vg6c2aeo0ejghudcz9bb37w7g7125hw8uikkgvgbhlsjwnm25fnouzj458towblaxhbwzcgsw03qyirseg7yvxa0w6oel54n2qgt5sxs3u0uuw4il18yx9m619kxb6vu1h72',
                proxyHost: 'kjquultiqfziy10bq4n76e0tky41u4296ywcya1nxtjhmep1qh94qr30ktez',
                proxyPort: 8491519130,
                destination: '3ec16b5pnze7o74i8jlvpwxfslfrci4sdayr4t7hs4tgf4exkzjmxhyoiy4ca48xpn6qzw9cioygneciy2je5mc5zwatj0zszgsor9a31fm7rxqiqwmxrr8vbpy425akpbiskx9gse8d5aws32onhkoqxuy8xe4w',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6hwfpqzx1iw9067qmmlkcofh7ufzufdkjzrt0m9dxcezu0ojjs6vo61m0cqpfec9bqd9szubrcgdc12vzgmo3mew3su3bw8ou5up0o4ogidtfm1lua4b14qave79jbys5h6rt1g8d7mdrljaxaov6upvws6y6pxg',
                responsibleUserAccountName: '9g5kumvjqdva1s8ov2zf',
                lastChangeUserAccount: '02x5fmupz2shaz7zbgp7',
                lastChangedAt: '2020-08-04 09:17:55',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'ccrwg8poxjt4szkgz1ax2pkj8j88rc9v7nngqinv',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'lkb110mlqr487q7xofau5lvyo7au9voey1z90n8rl20w9zyd5h',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '0nzu666ykcwbjtv1ce2b',
                party: '1abnpea8zp69649xmailtfl7d88ptx8r1e2xb0bcb6wfu5vwhrzibrlieecmtjuejjayme4wwabnk3avmz0eub5u1oewkxxwhie125dz9i7tnm9iizqablp9io5j92kj3wpqjeveyx9okiiizf2wr31ltlvrq31k',
                component: 'hc39ju6pohsqciqw53td4m0vulrg8k17z4q0amtazwbwg9jlmzxl5pn4tsu7mawgeahznrccs77xev5nsz18xb1w61z0yaatvm29dx6b8t1jsze8waffxzt11ivasvqyx6vkuc1lm9vb7n706uzb31vzopahfk7n',
                name: 'dii6lormx1cp55rupa25jh71s8z4nz45x597sct9ycsmd5zx9wal65c92zteqe55jle3jyu6jwrlmn6wj24hk3dyt9h04c31ubqx8takcceax6mc7j6c29ovu84xswrz4nj1drtzthepe28x4azoyn3ml2jxa44u',
                flowHash: 'zy7ivdb253wr924jfrjddsts3csfn4crefp3pjtg',
                flowParty: 'w3b7cvpthz0xqfoteu0to4xxqlbwrdmnmhye1ql27yqn8gr1awk476ns500vvnl3sh7mfj58uwyb0fii3lfwlmjtejit99on1cevllv6mwa6ccd0b0q59ye9lvl9nsxlonabuoicduaq3hl15hmqo8frwg0qoc4f',
                flowComponent: 'v9faiwfay0d001221i3tcwqdq278gag9yswiwylk5td7vlrdsk6837ka7o3c2ipr3hs9e97n96upgt8d7g1me4sl7in2uzvnqtcgwq1as35npbqvtmdfi61c6gxs7alszyw30j4zdd8cpe5c20oresqdvh1sbzr0',
                flowInterfaceName: 'gkb1t7anv5p2zcayscah92uqegymowewkhj74knbcgk32b7lh3twh088gvc48n71ag0rmhm5idca3obt4z09wku9qwiewdlhfusoerkhg55kf5cbb2damwgnc3wsscpqy2xy6fu54l9sifr614jvaq7m3n6unbqr',
                flowInterfaceNamespace: 'vq7r7ogcvdyiftwnfk1ak9rjk4rvbaktqs4s7d3k35x6zcr0qza2yana0la93l2vd2bco1r3iki7u71qfnyxgluql17nf2c14qmnxgm04uzd1rkfhsm3bd231sw4yhwov06o57fnz46o73ke9s92quwaubh5ycok',
                version: 'xdww9jus6uhrqfaf0xb3',
                adapterType: '2p9awx6894da003jxbloa7d5c3uhuws45mmpkgfitwtbw6te3819dnevah197',
                direction: 'RECEIVER',
                transportProtocol: 'la8ag3499i7hkobmixagc739y1chc3yaz9vgc07k4ldgjodztp3uu82mvy6d',
                messageProtocol: 'xr7iov42a0ccu5uc2rmy3qt7g4rkeuzwqrw8lmr60phfkp6ur344jaloorg0',
                adapterEngineName: 'dn0bfmf7rmo2549ps0y22k2518fh53hnpmr6ap2fmnmlk8k41s6cthqvnvaa3tl9yllvmnfot0b80tglvunbeaycaci2umopuvg6dyodonyj23ik6mx68r9u30cz8br8tfd0bnmgmaasl1sr0j9j4s7oa1r8y481',
                url: 'vn5qxkmoejtfpmq0g9qjewuvhyt3cac7ozrntynmvuv28rku5rvts3gmlhvhju17ickdund6tsrbdamaxthgxnkqx3u4yk8ulqrvniwvcscs1igrqcc014eox4l4ym8u0g41j3bltomejvadjro1zjtah631muyumcw1k2d5vxcsnuf8xc5d20l118i3c8pm6xhuqvs8j7v22fexhex7582fuvi1p4ba15s0yrw6f237l0xq0s9kixzpi4tmhskpzdlkdttj0czb53clw6i3pgz2m2jkn6zepjlde9e5804s3dk31t1b47j7r77ib67r',
                username: '8mkjzfso0zlbsgg4ndx4ro7xxu3tk5ajrycfoj15ggby9kewdoy88ouswflw',
                remoteHost: 'r80znzlxj3gvjbhgd2q02p4yytxarcaz0kfz0c1op37hm8zmvgjapt4pgxf27cgcscnqb4r8vnx77xveqkofyfvmtu328w89j45ni56z5cigp72t5a62j2booyhbk9lwa1ogxe1gtc6sgyk3idltrwb8ei2wzzqa',
                remotePort: 4969874661,
                directory: '6bpyiltf097hcllrf8y5siaryphp06t53936m88m3pf0ec050c1bih02x45frv4qfbicfbzfcgzfaivvpmcd7scydounit3vsg3josryom641idmv9epqraqsicv8whbjpzj5dzugxmv5174q1d95foxsusiarizv0tej8m3i90xxv1fzccfu2lpcitvovywbwaal0v8fbsma7dp62ybdqwjax9q1tlspnc3wrzg9ppm7hv3o155u8hs4eogb3d05d84p6b2tp56ao986itqqlr0r6pd5qdsn6d9memszg2gg3dfc7mkx10n4wgmcdb35ng8wm53v88be6im9ahv38tsd5q016gb0292qsl5k0tybvuvsjhkqas1gy2r26ul2wv0e3a1086phplrymf0smv1a007c9n9rakr05sb6pfyiwq3axhcmt9e1l0i01t8w9qxhag0yof6vl4i9eoctwy7gtcofcszt8rbaekf8yfi57rvx4llqq1pttt27isdguqeimuke3qk3tln9der62qqzfes8rfjj8fixeuq07yh1ilz59xoy7xc7an76w7nj9xcxcf4oyuqx1557riff99okuxkqfg4hd76ffh2ag5opg45mj86dj2rp4vcz6kos338rc4x6n5l40viaem27urtk1h5mi7e4vesj929jprjffgj8gnvssbqofelcx3dmqurqsvv68xcg1l9dg9fi93z98ph7q1t9d41chzn9t819m3lxigh87jh8byabh7daw175r2z477eypkb1x9o6wrepx9via1ua1y16zrqelwucovrbc4zdgz78nk8ujletsc919ezp0p90wtnxk9ozk45mkvyghq6ps07o2f5piaqjm5uzqb7jz6pvidau3fni9g579pidk2trjm5jbx0hja8z6qbbzfa8eqsqsrahl6x2vgb6csjtep8epwi2ny7xhahab3hy18pemyr4u0tyhp06tz5nj5ehcnqbj3eeah5n22hs51ky8jw8wy1hmsf',
                fileSchema: 'xzp4rnfmy78v3m25fohj77z5r3yjbok64bm3jiagf4ocoh42jpcy5okzw6c46jqptihcqh9kdyfj3jfmmn2rlkzfxght8x66trevvci071oxn1judkujivka7hakranb3ek2pa56y8u0g7f2zn8je3emjiotitompb1bnl17fntjb0r9t9eu6mj1xki06pkloswbp1vxzoh6o5i2pv12lvbehvv0gf6gv7vlyjmhyzupf41mol7ur682w2lcgzx9bwv4162eykrblemq6c35q7fk2o64uuob4a463f7xk98pzpkfqrvkckqmcurv7t5tvulkk85z3f3ycq3rn07o33q41q5vmpyokfssa0xp3tebcrapdth26ez3hkstp93ks2xkyu80dj4h5f7h1b32hunnrkebw5a4g4rpzlwsuto796w4p1sz4gix5itgoqiryiz4ymuaqug78ukhr9xb1y8vigtr0nhwjy5otlgea6yx8sqhhk14237rxarerxo3be0h270l6oig6x8b2o3mwe4anl1col5fw0vhzxscjmz1zn5g3i36ribbyzzwzz5mry94uvxrm0poccw57bmgcusr0sjci4jsltapaza0wtsp6lxgg9jua1yepcl4phxzjjaisviri2m2e62zgkppw5kcc1ri7coh094j80mbd5m65c7g1iqnyq4dls7ctlgutfwql5sxic1x8zwn5l10cavsy7bgwu8yfo23afx53uaga9q6qtq9g7h6yppkt0kwyai4knjhh2isj7k53es3aju1pburwnsrp60u93a3fc5lq1noredh4k4uo3bs5qlyd3wra53eihwde3ttizfjhrliwxfnlsi66xkkj7hejs6gt05ytso7l1y3xxxwhon556owz1axz166r40tfuhneqoxc5zwqraarl4144dltexkv4k3qakuyni85fxvc2emrco1xrd9ejy7wf8umv4odwn4yykkxlmgcast9voc864yzcqyu6zgviyp82w10ad3',
                proxyHost: 'b2tobemabods6vousd10v6kqez0iigpzmgm1gz1c3k0wd1i3a27p5qn8luzd',
                proxyPort: 9389825485,
                destination: '0gh3r15c45vsc7899y8xp5ecx6c26ogif4b71wazsn73e9ylyj991llnpgwzqo0y5zxjsq42rothfry0gwju3vfx6ch6fst0uuv8qg0ntpmtk5jqf3vy2m726iiu7y3w20wwatot01mvmx6jqney1afgref84jp7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'im7nwdnibuad98jfrzu7gfwwzvk8sf6y19h7vbpfncdusi5xfp10l12j7sxle50hy56vv1wndo9knz6n4zn5ha0aotbhbagkm6rrkib6ivlvln4kljxnudrhlyswyf3taidpzhnhg43vpv8i77f1shv7jrgawzl0',
                responsibleUserAccountName: '3gz03zl0utzdwpbb4n1u',
                lastChangeUserAccount: 'ej18oolsevy57qgtqbmw',
                lastChangedAt: '2020-08-04 07:11:18',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '12iiqmare08tdron7yuxx0am9hea6k1kwshbhidm',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'x7kxqftb6z4ahgauj0pa7d8m3rhp02zdhsi5axa696otfrjsgy',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '3kvrvom9pv3uuze0ikkp',
                party: 'xhixu9oo6idn953skqc4b414n7v9qieg4rwy7byft33vq0xblcyqsdfzap0gfyshrg6s14jv6hjgkwuy9hhqn2coan09bx67e89m0i8nvleen72j8x4jvlu1ruhpxdlqsdj53n3hyl88qf7wvg9f9xt529lsnbvq',
                component: 'qfqzl7denpfajk8ve4qsr8b6j16j0twzn32bxbipoj00ls22wjce6n32pywhvce7of2fye0vqwr37jjjkj95172gxfiko9w56zln9ilr334u7tbmef88ixdyhcf5e8cu5w7qjmjg95aegabpmutn0q4mn95md8j9',
                name: 'tojheanisujub2yq5m5faculqwjoq3c0cyomfa4r5jn1atc7gg0kkdu9v0df93159fqrxuvq89eysqytqjv8sv3dyt1suyk5ajotiebeqftvbx9n2h4ckv8b4kx1uy8cf7bucggs2moejen0e6wx6rvf9qh9qfi9',
                flowHash: 'h2tih6fzht2b1ksdmcxb4884gh1k1mmrxwm0lbmg',
                flowParty: 't3gs12ykjibswjuskejglez4unzx2bzdy78q9xmdj5kplxtg5hodkbur72wxt7jrduic9xrsibaaouaua629bpcvvhrpkgz5ftb74gs2adxv3gq8ybx092zqfhdrqhfbd9gze02yf49hubisar2yntbm6eb6p9gf',
                flowComponent: '3o7pucwdxcpyc26ve5cqmbym0p1hkyljc2hslls4vf6vdk3y8jzdfzi5biyekguvs1bft7e35vsfr8852z28vtt6o4fhvcnex3q7p4tuizgwvxyrod5ygrkiky1fi315073kzdbtgfk7br9jk8xj9ngjhfee3m4f',
                flowInterfaceName: '7r5waztx16ij43qkoq3inw3cab45pnx444et2ump9fvfgh34ybf1zf8byj90zo24ohpmp58bu4lxxvxqw8abf5h6sttmt893ae9mo74r3eg2mmu0bng134pm7xi8lhkt6v9bqbhrmd790c0pshmikcllkochlac1',
                flowInterfaceNamespace: '02d5i3bujsv3h4b4dpszyqt7l4qmv58xd3orha30p44ku7m5p21j443brc8abz30g3a14py7tan9qch8pxqf09cgc4u5xoplc1lcx5dbtmo2csvcme30eoe8u22nps23j49caocngkgpbpztktrmos2vq1ocit5y',
                version: 'ga66epudiodo9coep31b',
                adapterType: 'usjkm5fj3tsp63pvnf3wf27am3g6gl8xvlpystcn1muobcejf516m4yud91v',
                direction: 'RECEIVER',
                transportProtocol: 'gwaf4ladwqjqs78s8orlqs5tecg36e2q7gjx1cumahgheef5138ga18a2i5ae',
                messageProtocol: 'cpgc0wa6s9rh4uwvstkjfvyx45b26v9n81bfgajr40hddcvxz694110jkywn',
                adapterEngineName: 'woksw365xwk3axavomszv0076der3zsg0w2vylcon10gzs806kn2ludkj2cathn8ctw2xwoxdjha829jkxd9jwv41oab7knsubgefeypqus91c8647qftmqy50i721l5v1txrwe65rkahkw37pr3gn5lhz92v5mu',
                url: 'j8pnw4l2rfkzxmsigbrwcphpxbgdvnac1g89eev10nbgzrvnm5lnjvnn13w7sy2esrw6ncfyq3pvhaba1rwhyt2endpu1mbmmo3ar81fdfdqbh2rvewiwnz17o9n0n85nmxdbuj0dqb6c5wy0a4gib4xbpqzhug9huu2mussglyw4pliu6ulat7uxvw5i3wmrbxshuqqs7gb8ren0ke187dzojrzeh0eydlh6vyvdgaop15dgrh6xvac9tj1g5djc1thav97bti8p1nrhhakir3sq730lsmt4bvpvksixbb2ykex2afp5a3z0oedb631',
                username: 'hxbaiig1bu6ajvfjmhztetp22hh4848jnbeiw7gcriwpxeh308ipncnqslwr',
                remoteHost: '7vua5mr7ujwuvdutrb8dromrgr4z85hoale5q7byf17s74nws3lrxqso6sf5opveuucy5g3389rwppqvg3dv0c9x42iwm3jz206kufhbui0t3lbj2iqssio20wcil3z9ylmce21jqb8teh7cb6s8abkkbf42dvwk',
                remotePort: 2065735142,
                directory: 'qmjrpx5xj5oqinz982lrrjdcxvnwerc0q5kxyf4lwwrw3zd07nyhw2eo0tpvxhpbx02dvmubah1ie65hog4jcitdzzin37nvqut18phvcm17zz2catxtxn1lt4ypxyl6g6x0dyw55x1ftbgsnm3lqo3loyesxc1rcewh4kckxjbk8lhunk9goz0kale3376dm046jcn9dohjk7tvglg771qcdup4lbnmtcnicz361yv0b038jr8stzsjsg1pv665b8el8x63b4hv03k7hd4gkdy3iop4wb9n0e5r63dcvj3c3prbqh9ye2nqj32rehr7qb024oeysat5cfgd3gjk0v6344257lm3uj57hru37a0cszflbsqfymms1uhup227iof5o3iboav7farxpwn6j8zwhbld6fltz8ir12e0iqq5hss548q72v01q06ihh3vo6p758v4cq2ti1ps1782hmgptm5fl4x6bexi4adyiydueen0z0tdtfj8jrg6i7iuhs29xx9tarabss2kp23ni4brhcaz9y0gh7myyhptguh2w0jhr8ewnh23jpb9twor2t8zqpdb06okf3iwsvq2cnibobh6x622iglwcpsgqzy01kmwhfp9cw76zm8ocfwfskexb3dckan7ta7ur761igwk1zjp4ouctvg109qflxp6zudiobwwskvkdbf08k3fqelp9nvkol2ka584naddqiqxfoh1ofvlp92bn4agt9znreeavv12we93fwcgxsyi4i5jout0w3aat51q0yuwdlocof0qz2pp56zjo4bomvvhuxsymyi0fb856reyzwt7qg7opsndef9r8gq6m7wf102l28i214kz120v7rxkzcv7w81x1fp6jdhossaffyufv4f3ji4tweneu86ub2v3ys2eehip9ke2mwygddhxhgirjvvoqh3m6ibjhu1cyo1jlbapvlwl58svtxuyq6atmxwfen614cwz2kcwfzhor0nk6ljpfspgu1lzv129t68l',
                fileSchema: '28hsws7flvx0i50e0zzao4rtcodfz7o250rltiwq149n29yvfwmq1b28atpujcjaup458ka1yqoe8tlc8i9ubznwn6wnl72tx4he7hqnqq631lyftrfgjeubk3g7omrsjz5f8q5e4biworhpz9qgtm3xt3216xr5pfaphl70yk0jvm2jyvb6eo54umoozts278sf3ui5d4mhiwaqj0kwt0cxan3ycm8ir1xdn6yho2bid8g6zuqwh34qdf9ushfpvwehrd23ef3fy27sqf9cinm1lt39jinq47g06v8ing4la7iid67afgkg6okk2n2fdb31pds4q1pvy5k1dpmojf8ctaf3lib6ydo8idvsb2jlfq77y7xqqb8xnbodvvnv9lp5hild8de16q1flb0qry3fsve2bdh7qov25ptm8gtz369f4fddjlcjgajnnvrzt3hb45440eh0beoowj0e0fnj22f0ogheikj5768c1lszafithxm8fo623lky9aibqtio1wj33mii6me472oj2s6bbj2kf1zrodrlxdskl6yruu5oga5418cmfl2no1x1o67zjpsbl7eznoup9b408ikfl33sk8p1srak6tkr36n0yk055lwdjlhcyd1d20hr0dal8ijllvddhyzpu401jl6in41vkwab1v4hzvpa3frgi98hoptcwzjjxzgcmtg59mmifbsv5e157knuhwk5ikxvm5kf80bmiliwh0tnieu0yf15poyn2jl2f3l23gff1792otli9t27aw475kho65uvzce9cbebdz0168l3sgmw4bfxx32vccocep6f0oo1abo5lnx8s2mqy2yk5kdypq58akzwqyto9wm0r11up761w0fsx2s9lfj83awys4du9mrd004c2thddzctsvsryy660nfhmdkpoll60r62fbimrm8degjlo0o3une6h7ewc40zj7vhyq32mvl9jtioq88ugmlvi2omq68tql56cdkzvh8vmt9vp5drpfa8d2b9',
                proxyHost: '857lc6g7z7cl63i3864lml3s55a379vw1ndox2cy62rmqep4whupga1gkd45',
                proxyPort: 2588651992,
                destination: 'p4kh0xtw4rhrn79crzrpvkry3tgy852fyfke8sojfnynx54yr0tqbz7ybu7tkn0u77x0tqljuv3f1d9r5udt1uzunw9j5ucbzp99vzlkmbbk31awxinxpqgdiki2sh9t1nftitsnfkwy3o5di4ykut5d1pn7e404',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4nsbkt5rrx8jy5iuutmb4fyzdeoz3ynkl9jicek6tpzf577l73roiu33rckw2uzf0d3nqaign7xt3r8te1lbi0m4w2qrwkb3b4z61vftabihyhc10l46xy8zvgtbnolsy5xfj92vf1upmq1i8kag7qtdjgj8lqmu',
                responsibleUserAccountName: 'hnkc3sva50gvde2dt28x',
                lastChangeUserAccount: 'b5hla98r9dbcdnh1gpoo',
                lastChangedAt: '2020-08-03 17:53:53',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'mjp8n1oeocjzm1pqn341k3a990cw6zwxl2mdsnr2',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'nxtzz82p5tag4356t6cntuxmff1k56nj27h5sgztazzzfv3quz',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '156u8m676391az0sgy1i',
                party: '5w92526vidm3r6b17cr8ovnywhtzgjht8ab7ns5yc2z351uhv1sedunzl8ysdeath2ufyb6s8u6hhubnwwzcehrvs9499fbih5r46w3mht9cj759dd99f903pq2khd7q8l3mnmwkciot96j5ep6p1pspmgz5yxid',
                component: '1u7kh7ieo016alu2cut2k7yzmv9la65hd5ller1ap1y11fgst8ymv0yx7dbcwh2eltz7pst331hkrm3a1txo4ks4a48xi5m0a4odcmfjcvae1obdhosm4qnv223ki86cia18v7i24udf391lzqwk71253uxooodu',
                name: 'x68wy8mc04qm21xt9rf3mch2xcq64c47vs47kxaimt5amsvdpyowhq0j3ibrxvvfepzk2vbogkqx0axyx8jwoq00raa3jmdarj14q0x91rx4mmilx7e579mucv63uruiw6gu8ijhfv6rvtr6nj6zhr3n0yiz1l7g',
                flowHash: '02vnohxqgr9ft69hodpat6cwsdb92axfxa5mv7mb',
                flowParty: 'wj8j1akklmphs9hlh4er1815ojjnur6wod2j46alylpwri0tgun2s0h66qivassx221r9zyz9x933tvpzvid6nnila8l8s3yvz3zah5l9ou3yo0xy1zaumuk4e6g1a6729sq6rb0jey2xbh3tthlzjwy5a9vizs9',
                flowComponent: 'wadstwxd1hv09oe7q30dan6crspb57zgyr2gn1qsu0dmoubekx9f3nmwolkulha9pvs6wt4kwddt1z80txfv6atdcnrpeybortgs663j6mm7k2czlm0uydd0bupjzqy5ge3quz49db49f52d8gom2c3xhcpw7760',
                flowInterfaceName: 'ioavivqra5v6fhekjtec2a2h5smac6ezrr9ijlkqdtcon1wpo8qel47tx4i7uo050l33nbmh27rmdwyom7hkhjgo19eunoci01730f9fatpv3lma57jnkej760523lck1fk2z6yu50rh121isqtlk5yvenb6y5eg',
                flowInterfaceNamespace: 'rew3kp0wf62kn17bggzcdj2qi12j3jdy833moh97jfmwyvwsf1ip1uyn1k9txctub1kx2jsmcctafyjb8wqa1pu4mcaol1v9wk0k78wzq0im9x0sfkrpas99ev5u40jmsrpgxw0wetap0baykajqwvz6te15ye4t',
                version: '2ojguxy6x4br4yna4z7y',
                adapterType: 'xbl3s1g66xppvsoja48iiwx5rrrsmnrhpekiheinqr4x5mmj50d4ozpacbcv',
                direction: 'SENDER',
                transportProtocol: 'znabkxtnbela1crw1helo5xhu16iyihslyvurl5htjiggc92wwd5xrwci3sc',
                messageProtocol: 'hgkqp1zr0i8x79dlegzuma6cku2b0uatx3scswous7t1isunwypytkf1vbald',
                adapterEngineName: 'scuqkf0oqzk2ozwvv4kcjsx881zsc73k55q8ff0ju53m7gchmwmvyyjvns2o6jlczc177rpzvfywe6tdqygkdo05pyzxe9w898zt43ioh17v5w8hak8b6ubnw1xh0g548jtss8snbkxcdrjorszs5qgbky6gi0gh',
                url: '9wq7m2mmpu32uc3ys2vijc0sr0ckm2ryys4r38dn5d9cnafttkw9nu0i96tnpmkkhyusoc0zp4a220w998f8doiqgv7c5e3eeofbail4zyfksyshqsy1vb65w8wtxu3yej74e1gwop6grauoak8svxnmdgljyrxxiq6e0nrjxjuippbfa1yome0tbv7kctbbt4pki2oqzr9wcgh85222lmpfx2p8witrz7q6g0oh29e9ciq17jnagkawxnnr6uf5na3f7dhcgqrqjtg0tpuma23f5aoi88143kt596xl4h839qz5lkggtsyw1m6d9amz',
                username: 'bq36ou84r3hkzdxstzbt0f6piucilprpx1kowatyq71i1zu82t16td33e7ye',
                remoteHost: 'ucsubjr0pz40cwbt719c54lh583owygbdzxwwy4pwtat8mocgbanpzmtwv3mczishze55efb4hc7nkhkyx3esapmkin9sjn6fxfljy4mdek7hea35xiwxkdvie417nlzyje35xcsgoctrvhkj4352fy4hwb9x86g',
                remotePort: 7891284191,
                directory: '9456rdjqj70dj5niwxc4in2ok7v7dn55dnseuu44vx3602nl3n9rw4vr63tr68q6zurwav1p6m4d1lf0issszzyfohwjizwb34yobnx07gxdex3tzt3lmpxzrrs2s81wj0szj24vg6vwydrtn3g5kk057vuodjactarvxe2thz4jk2rxemvnk7qujc9vcztvba4jk8xz9u3be0udjq9lp2r3nl6t25lozfmakdxsn4l0h05s0ill5pwtaws2dqqt34o8ffpjuex61zi7xs4995acckpk5ifwn6ikftj12s4pcg329eb70oxr7fricwlrvvee0glpo9kvhpvp79vqo1oh0mmgfuc2q27lkgxz434s1icz93o5u4u5ugy6w77w11qr4872y7fgwabrznxmj970tv3yof5j9hldksk3tlvwyiwqfh8ebk6c4b0ofgbw6y9l3bltwdbhdhwffuzbk6bjof1hs54ll2u4qapjzxtqam73at6oeljf44fenap1qv2xe81bnlz0vp5zuajcjo7s4l7vnx6ao8tovh0m6ok55fei9uws6zwmffqslnmm98f8xnk2gc1af4c3jati6aeuzth59m3zbhqipaowe34bb5xo601y93ty7t69523j1tll1uraey9ywi7ordyakaerxs1h3qalm38huymtxrbgql43hec96l2sg028dbov2iswmvgef6uipkfy5nvmk74sz24xz58ifjtqxgrgeyi3el6nb259xysv1eg65qiycciq4lt1ffyh8kd6zedi0vwrr2cd8r5s00561m3leisckf5zg7a77hk4j2porl3q999zla96urlb6ekhvmbybcqfk024eqbwge00po2aefgrpms9ohsdp3cfovtewipithipfrno08u2jiarq3ft8q5h61ng7e6dbtyh8wu7v0lwwbwnmm304js0gi38chh9oobrn83hektx6vsgshv48aky1i92hixtgi6vzz8rctjg3d62dsyidmgw74q0f2dh',
                fileSchema: 'ns8bfi7bnyjczw949b0iec8av0khw3virxm7yr510ma1miq2mv8ba5rllvz9ht1x0xm2xaoxac66ri5uscsgh43ern1i0vca1fp37f26i72c1xz5zgdy216b2v78ghdoocw4zd4dbqyreft26zvyow7zhvrj1uldz3ljm5vhvxp33lwj48clllt505gyg6ql2i1hi5p0ua7eh0xsjfr641j4bk4my573azz7cakvbbzcuq88eckkdm9eeg32yyy496x1bm7xz7azn5wvi3o9gao9u72dheagw7vflwdiv1mdp6v14wrvqjqtpg4hgfipiedz51oxhczyfwpqxw5wcer179duqkrq34npwft46kljm547831tjysjz41zlji1g0wntoho56iaqwlq3oc3qwq8qy9h0sypvpx3iq6j9a2s5nvgrhc7muedbe7c5emf62h2hx4re42fk352vlykln5ulg8y942ircmd8lblrz44a8dd2lokc24cbadpdfxivkhz253pa37qow53dzc9atklpgexj8z5gph45i9sng7un13xdi20629ae9ncw34hzi8gi288xfrqi8z23m7eotdzaz4rqe3smwjbqg0m7zcivzp3jb98x8g67xxoiajwi5pq1aptkmmbl1xmo5k6dqhh6gwdlra3xrr5b37r79k30gf1ox79dqmmggadmlbj88k4veaspjaphx7g7vjjxe4dpy7mm9tpvtl12burvgnkq8ij8a55k2wn756g8k2uoppwol61m6nj2yeyb2ds2v1azef0rjeurde7gh090sgll98mnoj28aj5302kxfxlbfjtc0fqbuc7vz4hww9jocmlg46bjpy6kys8l8wdaov8s5725f1qntqo0468sf9egyastvyk08ip44am7lug9dp7s8epp5euq8k9wq7iywl1bfrxefol189ozvycyg59xy26sjpkyq3yeawkty469lci3osrng5ij0jzdrviv37jpc6b448q59qnbys7b8n7',
                proxyHost: '3gs0jd3pqrq0tinno18ew7qomcb6lzpc87137fkj6glqs5parf68se8k1qax',
                proxyPort: 1824471843,
                destination: 'zb7lehbw9mo95gz881y00vnbowf9tfalkwd0hyxb1pzn3wk579c8bgg6qoffebc8qtrjypyb7rcg42nr5up8c00687waqo7jxm4vd7x6k1jdmq9nlv4zrlgudimfsqs46zauw2gto7h89yczg1hufdi2doxgv6d6',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nely3opccmcsxvxtmd55ysg8wm753u7vn6gu4tvdheibu4l13o50hy8kn8gzxr3hvj2x1wd2tknpwd6dlmox6smgydfyrk96hj9d8z1n879f5mi1liz7z8kvn0poxq3qww2yx8udq2asw5b2cqwejf6z77as9zsp',
                responsibleUserAccountName: '1r45f4in4vbvjvl9o47r',
                lastChangeUserAccount: 'uk44vqnihi3pamt2l8b9',
                lastChangedAt: '2020-08-04 09:53:53',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'aeu5vauei0ojront9m7g3mlpduvgl5udw3ua625s',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'fqz1a38nv1p7t2wf2pzb0xq9mrtzuvfp8ofxjfatcg4reidtzz',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'yhc52zqj2w6ar7ubihcb',
                party: 'fe15tah0y8cld04n4gpoqxreao0cnyi7xruohswq2ugxchmg74x8uzjfn9h9qd4loyu6q76mgicfyaken6g5rlhhh508w75rt9ojsadz54crmp6qbfm4h7l5kd682b6r8o2a35ob5bszbmdg9315mv7jdctul0vc',
                component: 'ckmjeckx9pxgq7ajf91bar45v5h3ntgkorc688ay6ptl4hql8q40nf2tngf7nsk0kmo49jot8k4la6dlryiacm8rz78ndc8k8uit4f2hsyt9veljgdb9kep4kr9nhp3wmgg3kep3ysw2flc1vnbh8d7mjg7fbj6h',
                name: 'i8bbt34lk5xud8dh0wzdes5rwohrt4vxm42b09h2wo1yxpveyvn66gtri0pv7yb6aqep8t41nd4zxmbscymhtojsd7zil6s0ywtgumgit4jry1zvp9up10f597zqv9eepkph8ejw55qg8q82qgx72jdc4p7mq9j7',
                flowHash: '626als0sd5m5cos1d0ib7ufoupcbbztmm4s0gyvi',
                flowParty: 'fmcip6nv5hg258yrgtgrx16len73aiwpycuohs5pqxxfxg4ph9gcxd5qbmoqsjngjmerb71pmvk8yrar9tvsgvti3j9q32tvac0noqb6r9bnmgvx03r45wb8jcltruwthx1sd0qlb1w0xd5yd4xt9xp7iaxr8vle',
                flowComponent: 'oryxw0w9k7c4p6ayd1balqs6m71g7w9ma4gl8clve82g8i38xs7jlqlb6tfp48tp1ump7sn7zysqwtvqpuva7eqhp6pvkg5aem8ckur5b5ogjo175833ilo0l8ce77mi9cblrq1vzaooul0ezlnem2s6ptkq9bqs',
                flowInterfaceName: '1k2u0y7x8d3e0bkpybmudi6d7nuy1er4hfvb4njfcknskhzbp5fzkd12q20i6r2jquh490mvpk0w0bnf5yi776t2fievx1f4tg11zzi9noyraqw7g97zs9teyf7lc5z7d1czttq76ekfc3gj6ejsfnspjwe2r3q5',
                flowInterfaceNamespace: '5vjc7ad5xdxl62bh0u233mowp0laaz34qbvq1s2fzku2tj8hond3mp9ufmztwfuww1krq0mv82wepfrdhg62cg57xtpi1dz8n1owl3c5uyoy109rafibkh6c9o8zwzqzxix4ab4kwsegf7l6f405v8ty5n406sti',
                version: '1i846sbd5jche3xv0ihj',
                adapterType: 'o1pvgjzrc1zaa0uzcr6pcazlsu5w6d4eidtoqdo0lgqy1oravehgvnx5a34u',
                direction: 'SENDER',
                transportProtocol: 'trd2pdbb4dghu3rkkz0c1ypgpgkwg97hjy2detcpn2vem7m9ocs25sldsxv0',
                messageProtocol: 'hb0aqmh4mdrfmc2i5kghoqwpv2cso3gimk139kf2h9j6kpyp0ipd16mtcx1r',
                adapterEngineName: 'p7zjnxi55m6zys771wlhouav48w0xypu5u54y5nfbydovxvjq9ek8wo8259baswba2hmqz7uapf5axctoz5vc11vzdf8ruv89rinsg29zhaje5591iylvnpngtbwjkwzcdpeqsptu9c38znvx6abqxpganwzzufa0',
                url: 'r772y4e8x1667uxevsbw4i16bli13m6bfe3uveej5jjmfx197b14bs9m8v0tksuok20o76gcq3zfpfvlwx2ws1zc4rbi2h2hsd1nc24srukubca2wxendbltsdlpit7g6fscu6asf6wamruo8ltiyn2oipi7xjlhen6x7cepql4coxsvvncwp8otuisf9toefrys4x0aflhz7rafeyvkid6rou21khafq0fdo3avwcu14ejc9ovbfzalj8y4sogja8kva1w331mrgkpi336w5gp24fwubh8xisrg88ymvb9o07akk5jw6nt4pv7ordgi',
                username: '6jpbu0cg23ncducpydea6bka4pwv0xzemxz1tyxg4l4lxy1lsa0wbapqisa4',
                remoteHost: 'z5vungwrl8ecskge3yjo3xbcrgkk4j3cr1kpgsbc07grg750vaqnbstavq5sa28cqwcm110e3r530ub6rmfsqrq4qzydvo9cvs40mwgs5v5zzlujrci1ncmpc5gci9mwl31rtwp54lpbw3wlug5yueqznpf5mc3p',
                remotePort: 5959959706,
                directory: 'prfzphvsm0rnxa0v3bfvyl6ds8p95y7uao3p9932uiz68ijxlc0mzkxk8hw866iakqrgb4w982nudkvew30jqfk5h18dek76906zkrnd1nazkz290pad0r517h21kjh5t7ou50i81itr68fpfqe2rt8t6j7asobo1ywhk83flvyfrjcedk8qdm860hmzna4rl1h9k16u7ouavl4kcpyvo6pxu3w44i706spxyc2eloey0hrcbvnvs683sznc43f7xaic5ucoglh8qwsz6jlih7ployfef5jjb7getdkht1m0roch6tsxxx70zmp9x8n7v8yx3n4zgk8fpidlv6ndw2eyif690o5dptrcabukklu2lf3yg6d4sc4xanw8xp1xlqiwsdem13t59y0lqpno9llu8gu73y8den27lu6kldwkg1z4e65a7c05bniiva1o65vupb0m1yoylrzkl4m4m9r4yf8x06l3752jgqudnmx178gkw3911ukh6buh64io6q66bkns61a4v8cgwf3cvjz25u6qvntx3nfwkqckrgha0bambipsf18ufiy4eibofhadzwe63b718zni3n9ztrlblkinvd6e42img0z34h5o5hgbrun1fnlq40qtljn92wy91fbk0kyfonun5x0h4h5l8yf7sxupin180c36zqnhiqzs6inz91nqzdq0zipdj5gxxrh6qtmp4kkdk00nswbxo02hsb50eou7mwawaicjrhqxde8u8bd8g5cjkpkqaqmpxb29pb19my42jylnrxx2d182wqzolyheeu5edn2qk2crgfvxigydyyxb0qxaki6wq7qs1ya5dyxa45d9gbza4f51j2pcqn25shytfr6dfu50dem66cg5vc84kpeqfda20xnhz2k36tr2sd0bdwazvne8mdhelkzf34l49div904z7eze2rp90hrv6hjtsvnl9n3eyt3oevr3ig9rtz92p90cvzrhad7kgkge8vcm2tw2mqz5yr8kd3agwsfh',
                fileSchema: 'vjqhhlvglnn6pt0ftmvvsl3rx5171ejctd2a918vwwxcd1wlajzqivmrp7fvbf1qymzqkr7nmleiyr9o0n0h1asg6p02nqc6wv76xhmqq4qndvoyi6fic5bgjrwgtjrlsfbx89z4e1vi54oeq4h7lw79am97sp52idhispixabuz43dc6w747qrc5kw2ld9vzqwjkaso4zx0bdrowx70wtiw6z7ru6aqt67nsegf1qeojuux8hkry54cy9qde59iclhjqif7hhd9d9rvc90lya6e9tcuvdqmi403bf64quh5nkvd85juquh94lsazo1phug9zs1cle0thblzi4957f0xeazax2mjkgfg09rod4ww31ix8kf3xgd6umhkh6ljlbscvgfye94227htdprccdpabb6bges0bdnyoddit4uvlmpvn2ald225quh8pcswnje7qsf7ea1lnhnjl12lt4odag2rrw9wke2hsskqqqizxst0n3ypyu788vzkj4iwy98n8dd3s58n8fs4b81wyu58dqzqgu38pkzs3birpf355oqeapbqqe6qhme2fsdq1vwuxjcmwatfik2lv1bckv6l4ma0wm7s2bz9xdf232odmpjou6u7u6azd6kw21lwmx6qw19ajgqakqxc358pxqpaxnje433e2gr6rdg63ccw1j6nxmj3j0sccah6q7dv5rjuy4vb1kwv5kkhaciuzyaefaswfh5qfqpjwtg0cvoao9w5zlepc8dv6d7aphek74rc0nkhgqdd3lrvy31ap85hdzab5h46hufrwunn5nss2u1o9btmekqriwz4t9cent4k9yxflqrxt20649hb16oqdzsm0k6lc2mzte9xaubd0x0f9vh7jg4e3b37k0k8gxepeh9s5ztbovveq3bm6zw2bd1sfww1sfddoxf1885wwnbfquagbdvg58j1kzt7f6dvlgghnpghwt65omh1r61rotllngm70r1gc91yle625k5658032k1plfiaproy',
                proxyHost: '5l1ed0k8edkyff7wtbdcfqj12qujgbbr4bg2djudoirlx7czi63qkdwos0nt',
                proxyPort: 7898749953,
                destination: 'hb6ladwpsluxm50fo4us6sl6l8szwybw4csuugy1jb9fl86t7cmx8e3p2g24qjlih3ph2myyr64osb83cgrt1zsd119l0enmnawxcyxrn3smmtxcbn297sh20y9z7pur8jbwlcbp1vey8klmsj5i8fdjdsbh82hp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wgef0kydkl9sul0p5wz0pchtp9zkuosie1csriw8rxy2f5zso36ya7av0zaz0lojljf1u33ar7wqxppo8kx1dcj9kgiic0p0f9oe7wq49nyvndrzbjucd0bqg1rkot2k3sutoi919g8h8d9ed03q48nhtcos55oj',
                responsibleUserAccountName: '8ry99y2povgj4t8b4127',
                lastChangeUserAccount: 'iqr545iyndr9cfoxzv76',
                lastChangedAt: '2020-08-04 11:45:53',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '0z47b9vjzpfvz8zr1f8aix2mcxr4lljjej99jhcb',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'mu7jfli22csw37360i2aay90kburfxs2mom19y95qfsev2yqaz',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'etnjrt0cvaddhmcrvokb',
                party: '3mn8w7ax2nbgrlrm8aisyu84xxza8xqc0pac04gu0v5jj2phvptpqayog7c1rwrow9o8z18qr1m5nud5vy5rx0cs4vn5d7vnfncy7yzaptbquc6y024ojlcgban134hczu8cov3jxkjggmpg37romdi5khlwg7v6',
                component: 'k3e253owfvonwas4wiych1ijg16s533zdd07k5v7eykc0ezz3dxk3adokfzyfjxo5x17qze0bu187jkwh0gegf33pt8ogw4nms7dfadcxd5ohyhwua3c574umxo69i55wfhfavzo2gkndohtu2now9cpx4jh3yg3',
                name: 'gfuhyc916wegbf6b82tjzvjb9hl9rgpda9o2lw07or76y16puftrbacuxgg8z0jauzsnvyf0b737v899r2vrr9k71ic5zjn3wjmtlp119vuwrttkidked56nmrl3y5hx16ptsor4o1thzinxrcnc4g91hybs1n96',
                flowHash: 'giwjq94q5uelzqvu75zfwhhzjblvechhvy0me035',
                flowParty: 'phc1j6d6vem72tknx8h9fyjra2qzms1txvozf12wloryw5fh4d4m6u7spbklgbbig5dobdej38gzi90yd5y8kcr5gjjc8l6hs4npd32gumoj27ckhehk2gwwo8vadr2e6lkhuroove1x2dbsri73qsrnbbhdaj9e',
                flowComponent: 'y8yzcnpqy3338rssrlakw31z0jmn9bohrvrflp9am4lha744kz24bji3l96jv31044560wjo3r6s3lt0la5n9onacvhdy0iq0ln06qmgwyobnydp010woe14crjq01ib7quq1u4qrx2orsa92e7jkd5bhje4ukh2',
                flowInterfaceName: 'ui4rpbw71wcrpxrhon6vy43vcgjppaaftjx7mm6suoirjztr1tkkoyao9ubjxyo0s2kcox5qrsz65fhlt1gw56t5yy4c7ouqcsli1v99g87k0lhx65i7qykzby8lcl3bp3u1551sm5hdnabwh3zvsqsj3bx4f966',
                flowInterfaceNamespace: '06e1l03t61salzxkaz4z5deumz98nn5d77jxi2tfgpkzx8wrq2gmzmx3r4qof0lyemgoicuu495jplycmrl41we289s20nqw7r2slpqv334tzqorrk4mg7ybda7jec7mufk6h8ipei1je7z7c3zlkhpzlvgbmvua',
                version: 'bk913oju8cc1mh3bgf0f',
                adapterType: '6ayoza625rx0b66tvq0djqfrdl1iw7cpvpz82o30cx6c11545gmenah8uv32',
                direction: 'RECEIVER',
                transportProtocol: 'tpm6zlk2rd8s2tjzgonpkxmultq289faekw4lj7944aw8bj0g0o5ahbxrqgr',
                messageProtocol: 'olvtwzbyiygnm1lwzcpzne2hytyci5xl53y36ewcycxvjz8o4lwazyhe5bh7',
                adapterEngineName: 'g21v1kqnq061nea0ga7g24gbklmhe7qmsij1ex5fx7vwxvhvdscg8mok6v6isgsnbqkhtcrjkv79wxreakt4xh5wofd65amyghka13fi7sftfazkdnlx43t3f4vopisc6b14akatikj0i5iedqp25rw1t7wlnng8',
                url: 'dkwr6ctfz93jm1uc6c6tebmryqdve2ul7hqwsdm63xs0bwtymzmzbkvq96l8h9hj0ozxh7ei19vzprk04n8qwvkltd4xpajesl6krbmyxnuh48bd863fu14ea9zeup9i6qcznr6g4lyzmtk1x7wcb0501r2416e5za2cb1v80gnqwwahetpsbph3x08lhd4bg59fwtn0wiqu4mqbtttwso2furtr646aj9f7zqou7putumn15z1ng5qtnyl83pl2j5eurjte7u27lrb19bannblikpavotr4j4m2p3p77bqua2lubjquu8ni3laqost7r',
                username: 'ne3vkb2woo0rwyn8wevdquxed5st7pd3iaf6l7c7kcpsudjgobzcp603dqxy',
                remoteHost: '9zfcs925c57zg51qtbolixzs4eu5hvj6vt9oo5z613h7h1m4foy0sfo52yjxicy6iea8v9xx7hz0m49m8ggxpgp8clr69xvewh1g1fg5l75xalcnjuxi2goivxt836hbgzu5rz927zkw13q4a3jc8kdwegue5g9s',
                remotePort: 2286156292,
                directory: 'wn5a3ay5b64hq01b1rs9k7x2xqkslyyqxeiqvqd5bsi5drqd5y419f0ffzd41aca7n3d2dwwdy3j573627w8nds4qxmuurg1b7cy89xs6lis5aahjbn7g18uladpdec533af01oxmjpbpht065qqucg9jz1oct1a7mweg8v93ti4bi53g9win3br69ykrqydvrrk9t0bfty9x8cg38ckp3920yl7zx2sychq0yb9a3tu4igs3l2jieb3ixutgaj4i3j38qoj93u0cbe4fupn4b59h6ysf0pos568ln5am7390z562bfojjeijev2h5690349n46r83emfqodqh2h4i5ga4r3krkiujmesb04r8mm03nn86by4ybfh3wuehwzhfihat9r539xtrtjg6k7057hcqzk495kt20dlcfwqtmh1e3r4q6mymiwcuya0j347c7v6mepej8w4xb3epj2xc7aok891nddbgtiukcne0xr21twbpzbeh0un873qi8pul7aznx6zq4qjuncp41ivorsvbzi8wf7zqwr5v3ktfk8z8uirzoomitanjj9jwps8sxa97l2sgcc0mmvxsj501a31m1d663hp5a1uu7x1u74pxpt2bstxcn6lqsic65p6gfzr3mhmdop4tz2s6i7fh34ykkj46y0shev2dzme656o5o79ahrfh11dj2sn9k9zw402qsiwid401e2rxp0zcv72i4q8xzvxl2k81gj4vg4dl3wsi8i0q3cqpmps5gkt91100bgy8rm75ydx7nrqwuhpp7q0h7sz67xffe5lhdp40c2sd39c9eiiv96ve2k6sruzs0k6jtiz5p4v9h25hty4rhjec701jdhd10lducgexpo4k0iukaw0t5qge76q2907tchdam7h1gbmw1zyltr8dnne4uho6oypntorgfbh0c86k4s1opxvf02cs15w0m7z0ukaddxj2gma0ffuc3cusr7hlr18d3q9pvwf0w2u3rakk3h3r0xnoqw1dqy',
                fileSchema: 'qei1ub3xd6ml2bbnwikjlq78wg0pulz3hpocx6on9qqkohkwpwgvp47qey7im6mun1xhv0vlyjr95kezcsam0vg7zx2igq4x8pg7aqkqxtab4doc7gxyahvl2cl18vvjwfclqsagkfu0xrg9374up8q9jv9b38kellggqrqljlu66zx4yfp627o7xkjzawtnawbn9qsc6tyc497japk8lovaa8y9uswo79nhra7jk623kbohw3pgdninbhj3qizdku6fh4ypt87n35j16kk0d3ezqnxpf6tjufbhcdqe8z4ba0gkhuh9vlg6tk3hrab5qs89pyh82mbrxhqv7dw19q3f311evy85dprbitpf2nsefonpfqyxo1fh5f598nhr5m3crj00j18qojd3es4yz9bas791vku6ycsjje8fhxm2f806v7s2abdje4bo05ryje7wk71tdrwzfsugpv6vq1tlrm7ea7mztmak8zxwqqhmc7jdnub3teqg7dmcjx36x2255gc7bb9tp317kw1a9tueqq0z0wlk7qxxnikpor0a9vxs866z6bcqjjzm0869xft0qnatfqykke1s6g4wwyyizns840xogoyp52zuphojxe6gzymr1cot5erjpokb563hmyel98aas7og8vahynaohf3gh5wmtuuluuqdffqpthcdv706nkhk4kfvrj7kv2sniqzdgbfsjfetf1mucz8wjvkmomisjl4d4ze0ssp03kx7dbr33pc1z6jyl2ee0g2akc3yfplre8mdpxcmqqsvzj5ztjpbkuwbulkt3t12omglc6w2ok6j52kftohr8sd84gby9t4lir2a2z04mp59624m9e307wboxu6d3ojloey9dt57xku2kzy9l9rh9gfylyvm0o3kgdyqzbfvous955l1951vmvah4mup4bdqvmmztpbgr9oe2l7h5oahq9uegeml7kfnziig03ewujdenwgk9ofn687ey8ghzcd2r7dww0ht4gjjk2f2d297',
                proxyHost: 'olx1oy7o55jaawghjm52vwtlmjs24famcjikv7g4cw5zrcr2gw8fewd2csk3',
                proxyPort: 1768440530,
                destination: '3lgxg4r2igkjjpmwqhwsieawhgjoqooknzk45h735irprw7t147gr0nak4y3ifa8ewpn7sxo6y157ovcutdhk6vj1ic4xfjn0k7zvhzv0u3r5c2frzyys6znau2xwjw3w68it0ujwhwc0ox96lm3r9hjrgx7x56c',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'n04c1jdd8br2rbmsc4v0iscpnzcgkj6qbeoh9zgbgfhnfislha0q6agksbbn2t0qayr7kz4u5bjq7q1vzv6ibpduu08k5cldz93zkobjx7wy1hmc2ej15s8vf0csgzcajm1v26yq4doy4h2ep9kr4q0e2y1jnlq1',
                responsibleUserAccountName: 'rzhcf9uj5tu7ky7ocfl3',
                lastChangeUserAccount: 'n86pwa96rdjj7a8knoog',
                lastChangedAt: '2020-08-04 09:38:30',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'pcoodu6mzde46w6w8wjv8q56y985ugb6wpky90rb',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: '4551ybvgal1xc7eaepnkakmszowb82xwoyj2ua4pxh54bn2i8n',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '2py5p1kcwc6495udttk9',
                party: 'iddpru662vn6ghlhu0oz38dlkg1oxg1jw76jxr7755h6rx2egg0ai8ve09k2s14wa12l5t2h4rc7dhfvto9js3k2est1ex7ievy3vcejgcaaqo6lkgo8wqyyvsd1qbhbl7ggzx5p0x4p6i5r3im4zvfa3keuylmi',
                component: '3d8o9vo9tde1d7qpd4xuyhs9x7tdwqzadluvbacbvv7p5j5ojw7x573deyczzwpahlevupmp89v7d2iqzql6qhqjrrqpksd7mffwqigodijs4jccg6h1du8oiliqspui9ed5yzziik01hsvxd3dwy8p1yyy4sfd3',
                name: 'bnoh01snnfrd3ocrnncyqiyrahvm17xtqpq8plb87mtuojqad2g7eubrxadc8emppxzw3wvcnikdbix0lw9jw4o3jelswc382z8oij0qyaj6prvffg7md5cpxvoxzthk1nni06aflux7d0fuxjopz4b76tfprzkx',
                flowHash: '4qf98wobcld5pvmo4x101375iguk0yiiu25fxlpb',
                flowParty: 'lhzex0ut507pyunn1omck49yrnf41m5qko4usz3obyyp0gxak1qs2y2r9rbql6alva4v685a9g4um9qf7d956mdrn5qarnqnuqonmo41emhxnwhdc7jflc1jjwgn25j0uwzie7nz0iatsrh8ir2k1rkldhnoxa9a',
                flowComponent: 'rtvuc3xw7jc2ksq78t52od9opu87vey92npaer5y393xsb5oi8jz365n237vil6vjr0rdcfv5kfigfhkmtgplfxvgs8fw53j5sutxm13jfxmgj4hxq6823849jm2e47ypb3vtugp0ja7v7ay8i855avw10y190tt',
                flowInterfaceName: 'ty4t5xh45rdxs70lcoshkin1puhqm1339n4df2jegoibpcewqeq8ttowkmhuoehvgpc0qorcunhhblk6aevzx7gkxo13wh3d6tzul0mbriepjpsrkmb41r5r1h5xza6k054giwni6r6jskohtbhppr6jbheaer8s',
                flowInterfaceNamespace: '1bkmqj7tnj3pv26t3rv88gtjg8rl9v297hvu2b5na202acbm37x2bv0ex2igamge6qt37s16yzoze4jpobfbicialj9273ghli4tbwkazuafubkhgdumakq8bejw10wx9nygodxr37ml68me9thjxwxi7fnoubqv',
                version: 'yh5abky4btdmh1q4d4jp',
                adapterType: 'qqg20mr7dccwunk749acnetlyplyrot3acvrjx7kqvm2gxg4vznkv8s4ev7s',
                direction: 'SENDER',
                transportProtocol: 'a8ueybgv8w8rl5xs5qpghnqy6286eadllp6rvnbiwenn2hs7xxrilo1v37oj',
                messageProtocol: '4yjfdh50n6pwbazte4vqinls807c8zk3kzenw63zmjjs1lz0klcgz7v6qxq7',
                adapterEngineName: 'sup8bx6htg5wh1eigiif48away89jih4zaait5uladjy56ugch9v95r1hx3ef2x2f3th698xo6bofj9km2vpnbo6xf41gtbuo6g8j7v0wyhy60tglqfl1t13g9wrnoe8lqgila3otrc7i0d496uru18dtwvv1fa8',
                url: 'i4wbdc10w0qi609to93f9utuf51s5uwbn7fzj0raumps7zolc30gtrcv1e4nwl3po1x8l6xh0vvgdj6nxt37hwzuhhsxm3x2akcfp64x284921l8jw2d2nnjscnexrlmvelcuqob35iiu30szdhnsnbm73uk9z12w74f92lr23z7s49sry25530t63oy7122jgv5ub3rjflahnz8rc9aay21f1998z3kcxhxe2h34aqw7ou51mso1cwqkpjhrcsznogaul999758f14vmhbvutopd1v1lcjd3931bxw02wb1frmpr3y0gjvk469lhhy2',
                username: '0j9ubbjw7klzz95uzuud1tur5zjui12stgpmnl2vlqdqkc5lmt9fpwatqg1i6',
                remoteHost: '4yrp1tgvu37yf28dbnb0hmh7y84mzavdyeg342f5hihen9idjm168vask585all1g5a3y06z3xo60semu777azcxy7j0mb6ym5udlelzitkt6du7kvnkga4h2xoj9a0jzui0dr3vwb7jimq79966qe0xrwnevslf',
                remotePort: 5468149391,
                directory: 'aktmew1enjrcrizj0wofki5q2zzlex7vdkj4i42r86ot3ehl53qvpne35owahvwpoh8owpxol2h5fh2rlh0ippm0siwanf4ute88gp5k9ka4gq7s4fpksn90bnmty79hd6hequ61315fh3xo5mqe611obxeuu3vp1ly0w45spkup3pudqoz5swpebxsc7nh2yltiojqsyksgo0mjztknh29o9gys380w40r755enb8cgw1z1iafnx7ayq5vt5j5fkh5vnkqs986srxsl70edqwgiex2cqsdvjbll22ckb1stqsnmkgv6gg1z7hqz5h6ercwlof63fc6qsse78run74m59fzle012udi3mate37wpymfgbrone1w786rhlczq5wb7dgx3ss9kkljslqkr6fpwomsdhj3hp646aecfc0znyicwnyr55t991ccp4hqu81r47el5eeowecxjvmlu0qtu874hm1l36w8cl8fqjj3v97gm8uvftzzyqw4icc5x8ko2kh3cn9ja2lyx9dcwjby9o4xg01ds60oc1i92jjibx0h09ch8cdis6wfq19kk0bozpv9urogzvovh0m207bmp4f2ih7lnab1euf6f03ijmbyhlhluszz5y4n127ijsjlep6nytkwufgb1ggth783i5dkk88d3we5begjh5e4xovff195dkllnyzmzbzkwem971ornik1fqye6otsjd91z7iwl7oe74bicj257hvtvmp84i1x4j4z0iikom0f8m3447cl99pa9pw35msjsgii133nkpr4fbv4oxwzx16y45atnmxy7xdpqsrn3vec7801lfwfwd9o2ty9cz4ph17sw0k0o9tfwagc9hno2f62jynnyhdulf31wd1mr7814bs18hv858cbe8tme1uo4du9vg7ewtp54f47o0h51iqycb43h6zuglx3luyrcgm2b69q9404g0g6la5g5x7rj8351pibagwmj2cnxlsmdk4qgj47b9doj3vqey3352yvz',
                fileSchema: '52mdx28wen3hvkcr3qd8mp9npj43f494l28unfpx2o5bb58flxecp56oz9gdf5l99pop7yoj8a5gtsybusxwu0rlq97nelbufihoolde0f9k5msrdxk9fr7itli5avnd13s1qu3gabjf4ffvfvu48uwvb1tprjt1ct7oquob2ootog0735dujapodwlbh0z79qinp5e8fjeefcqvq8eebhphdyguxrhsba24nho04b6n6qara96hjnb9fyti0florpvcob7t359lu8mxx9zd1nx578djuvb8hmbajuri1qzv0akln42qa79oy7m1t0do03sefkf44akb5jjjk2cofjrpdelvvm23df4ym071j4epixte9iootvepsptctunrxip0iapr5pif149b3hxeuylb7mdqc1f14f2cqkt7o8qs6exds7y5nvpdvm1jpwlxmk0kgwyr3dr74w9da6za4mikggpk0987q0514x187kyliaid0ck951v6gdajc2f2smyubz97ks7mu2pljolu518yrz4ts9mdihbsw9nhsehyearlh84u1t8p1f9mar71qrdqbjq0jeoffjwryl1sfiv5dqk8kghh2z45m2ejmq3r6z1edjijrhxw20djwoz5jr8a2gw8xzt0somnghxdx4ep7w8nf8xg87uxdov5sncixreiuwmeuvmc9x3l6efit1w1o1a8bm3t7wsvhf6cm7n1shd9dg839df82ouqr6bso09h50oulgqgyhdnmyqrzcgl01bmgmnag2i86i8rcld3g0kcdpch7vwyoja9t60a0kh9o5vy7mmniti6pbmj3tkzejm9c12kjww0sgkczxhbaov3jpuif6p1gbtyty1fjkqpsn6mvhk2ejv6oo0xz3ku4sod9sbs14t7n2ypiev04uaagwxebh33ru9ukfs22thstdvr0nxbt8y7wgmxgt1u2nzddj8swomskjvi3szjjywixzp624cnb68xnz2dosdmzfzz4pkjio1ntvfc',
                proxyHost: '56ykoleoi1li9x1ouaeqfxogj3we7r9jell5hklu4qs84b8ks3a12dpoajmg',
                proxyPort: 7800569228,
                destination: 'dxobwnfvq3qegfzosg4s6c8omfwlkhrw9gxie55rx3rwlz47a9hirc4s00n4pxi8c5l9smx1e4e6urhpegh6y69in4ldg6qwoc5cpx76u7nee28itgfp3cyzmudmrxnp9i12h55mxw1z550vxi0fqo1h8yxnyhw6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xawp2q1rallqok7lt5wx8gp7hnomnkvbqezxe1lo0avfrycixifkcj5l5jf887qeeg3prwdshofv0r0l0jxn26rzjr8yevme3b7cgbgph7fj4wllhvjxnizfkajmjmjdhxqyvkb0vjgdcv276s15n2svt9ripnrj',
                responsibleUserAccountName: 'lxzgrv5toay6n1hat98d',
                lastChangeUserAccount: 'ghauqheszno0f0192ad9',
                lastChangedAt: '2020-08-04 00:46:20',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'zn1o9udaq4qvleoa6jy4vgm3payu313b9y9xbsui',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'af4675o0oc27tds3tjxm5beqni833s5cwx6du9bwnd2neq90yp',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'ckxmosu353pa02vu4zd5',
                party: '1j4wmztjrujap9pi7fqc1iyh4g2ifbwrgb21noptebozdbvmztq21p2qox7oe49c1zfchowumjd55xd14nbb17ni52pd8cpm779cgu29xhogufsij12p7xbxofbzv8gtg4yuntcychh8zd19b71an9n15yjr3qgy',
                component: '8nnusgfwjbkvz6mgvwqpo7jz52hojnob0ezxyowp5vae7dq4zzc72eholwhimkmnaqbf4bivzwsmieu7nujkvbn0difofnh0q5ir4itwoiwawqixq5vx4e7mw7ly36kmm9i0y83oy0iydew5lz44v4cvm56sgkiy',
                name: 'axas2qud193m9op2n3vz7zbjhesysx3s1rm4f9a3bxxnz4wagxzelsj2vwy08o6w80pvhec7344yem88envs5rpk2dkfbn0iq7dj28u0o40f39igswx5e0z5bxibjbsnmg7thw5pi0a50s3lhe3qatpr1qt3xm74',
                flowHash: 'i521uhpumlpikoix2yjegygnmamsxg8s4njykhtg',
                flowParty: 'fgv7bzer9bizxxu3wq0iu4rvl3ucx6ra96z0095jrzgw9cjt8bcs7wue15x91e9n5j3h3dksdw8cu0zg2nnvwebvgtm39cg8jgo9dsmerkdsqzwiy3bmybaugh4w0ojjwuqbmzlntg8itvv9ksbvs5odl1f5kh0u',
                flowComponent: 'fcrl2uw8gzecorkif4lsfpyj0qcm7k14dwasvxn384o6q21qqwy68y013orlrd3w6qag6eiyhtf12p827w997aj6646z9jidx0rp0g8sd9a6q55dj3vw6nfalh3qudiffuze5dy8besi6beg3oyeq9v19mk9nx1j',
                flowInterfaceName: 'pilols50jh2hp0ghcgugp19ro9ds41xuzfmp0xz14tpwdy0ea83ukcu0825lhvs9ieldj5djvfp4ctu5syoqgjtzqx8v5zj0y36weejcy015loti7fhi7bilplelv631ovp5wxvhiemqeglrv7kyn5zgg3utoted',
                flowInterfaceNamespace: 'orz3b1zeutpci4bx2urqqcvl75c6kjm39289jvu7rr99p9o2z1hhbpudygtgr8kkz6uvkal8bvfoermhyl5dvr8xv23xdtzphz764usrul4xvm94fxry7d929tnai6n8tdf607nwqw6k1q7rwpn4xn09hjtopf14',
                version: '2g9fqz3k8m96dfxlys7e',
                adapterType: 'cefdbi26k9zu5do336issn8w6rhwe89pkew3bdupm9j8hcq98hlddcs73tm3',
                direction: 'RECEIVER',
                transportProtocol: 'f9003ft3qyge1794530fwzivply26pt8jor6m0zr5er8yppst7gw0e9rgnnh',
                messageProtocol: 'jfia8h85eb0lroysqcyyonjeag0zf2lu874y1z7m6qg75phy656na8535098',
                adapterEngineName: 'i6504xs6u624kw4zdkyltha4s8qiggjcvcpw6cudxnkhf0om8imizn7xvf2s0y4q2359eukp5au3vw0jjt6ec96chnhezuwcl9hfgnrbmekgmnm3b6emamieqckb743u552ypgyddox2hbfem7nb2ieistxgwhyl',
                url: 'y74o6kvda3dsao84dnlp5pg3yx90x8ir6wlq1lw6ycdl78f6qw77ju9gc9zjfuv1hnawpcvby3ejdw8ypy5lcmg6yfgg1tt295ug3a8fxbssr7usg2kwctw1as1v7dcpfmz7v2ydugi9tk5nvr0fwrfosgarezzamvbxe1e51805ojihf5ctiap9lp7e5tckw95vlsf4sp06wguqt82sw2zyvkgcikkuepotgd3uc72fggnvf21bcrnqjlp30wynjzvsllmigcp59vrywl0ju3vcgd5fxtfnh0bzozqg6cfc6s8dkb7354zrkbopuw2x',
                username: 'oqoyhzfeyqd2arxkw361sfsd7zu0cei73bpwuymqgvpwe4mfno9bwebos2ky',
                remoteHost: 'z27kf8bn45yr8s6f1ixnzuedtpdaslsjh237ouqlousg3isiwk3dsv3htmuwgm2sss7drl96egn07zp5pxwpctxx1czjoqzlv1tnh0bvvxap05xr5j6h96hvsnt7sffwxpi62izkl9vbmc4llre83tk3on3lbmjme',
                remotePort: 7623396739,
                directory: '4z3p1g5ptlg83nrl8tc1ci973qjlhc706rhafz3w5cxz32p9s47434u7ws8fihpk39s5ez4c8c1ye335wngxmpifvct9e5zm1xoa24jw9jdiw62ant53siq26hoqlhe3s50pksevnnc75q7mhmle4wzax7wwsy8eijswoneajmsw3qrx1h9jkg9ukcvdctg35fhvikqffpxs7qef6beiia620uw143iatnwaapk17n5o5k4skn7sug6vut94c6cum04eamev82php89n48qrfvynxg3nnu5vkz5u8ojqjkndkmq6fvhgxhgcisz50icf708itm0tu1ssah7f2wegzdo16k3and2suacoh9p6a9i2ozzroncunsxwp1zh7m0trx2u0qy3ep4mriny55gvbqdh5fpf11m9lap2ev6t46be5bkv2ug0fmiejqvmn0imn90l5xmcl5oonbt7cuhdqq3tgjl1jtyarez0dpikrkltl9mx88bmn981eh8l1uza9jci1tmsv89280x9aenwxu7bpta0gom4x8be23bhuhby6urpvsin7uwmjfb3pdf4f03nbsbtj4oi81o4gqncsyb2e66lcnippjmn8rhs4g37o5vmkgjyg5d965gy6xel2wudn9dhgenfj0k70h7m0d7zu3uifm26z3g6b7d2u4fnkwzs1bmgr351h44ybfbmm823vsgnh8phzqze8zqob7c50apybmlylnmz529wj0iqxfc27abw4orrw8meag3p4v9wyztscz2grskjciv2ipk4x1gytgrs5x20w7x3fichpd7eom1nfqe8gvxtm9hjg52g62bfl1ve6g2htf6wb2ktb3ojq7gypbl6xxzrinafndztqk5gt9kmr28cyfxpuszjckxcpkojwa0y4jdx1j1xs54pconpz1znt07enduq7b351xzdrussjxqyqrme054vkd25h1usu3gc93i96t8lkfr0xht96yu0e31gbp1sf1reitq3dh0mr2jlt8vf',
                fileSchema: '8xtu1dbq3cuc0ujrwwtcjjcaucwosaig4p2v66lkh2csuanxghup85aburhhf4bvcd8yt4zk2ycks26z4bkzxahopjbb2r47ht693crdzogidz1bf02ncoxz9n4nlywuhcdssy606kl96gkxliakhp647t4oi2wuav3ta8ctt9rnu2vdnfgqnox8ngs1xbjd5zf4pabyw5g273dthrajn3oqirxwi5x1jgradp06h5weei6hpu8c92bwz6tvjnumpzr9srv0gi1wa6hf8diu6w451yi6iaxdoy3u1usaklwlupt8rmzxuskhhhico6mqal0mibfx46t3szlvkqzw7oaij893ddqf7layo5b1usmk7c5dvdbiqb7g4m2po4pt0m5wywwkhkxg8damxxu66fehsl51hliw9kphfl0hcfq9r69fbw1tv41dh1pbey1v2jc8r731nnbhdrp9ish40tg3nh6e446c38shiv6un6saqlzj0c6deg9w9cs35lcq4njo8k20vp9eb2e1pd5tuhchg4duitwtxp9xvqm46rfthq5unwprw926euci6l4shm6boha0fcvsibnflkz5e8iv76yirfhq6r6pzztocm9e0gytvmx0bwckhio8i9ohut2knmon4kmgc62babiwaiyme6go94i76sso80m359nuz68jn3b8h4y4mmxapf2z9grs0i4tuclb6iy9l275zf84czot7kvtzkpsd88rhfu00h0nfbxgvmp3m8i3vb3jaylux7hcerjj2opbh5xh4dtun34n1d0bl8icw5as5codnx4reemsn06ma2s7ejrdn27vngdf9lisnotoohvripd5n5yrubaidy8bamspxuppal5vgxizt43or5xqts33bhuhjamfixonya7d80i2zzciwyn82is8ujgzf13amyd88oon5q7qe8v1615e13kkth8ujud9tt9b7tuahjdxrbm1h6l1h9lgy1qq8dww5122xejah3o5f442n2jg13c8',
                proxyHost: 'my2xx8eicip3mf7xuqhtpp426nifz5i30nvitk6n1tzhb72eu1hflgef8mg0',
                proxyPort: 4963927925,
                destination: 'oria486uarno1q1vprpqtohn6viywgrl2ojeivz3dk1mra19hz07qxqosxjt8xcoh44rqc8radj8inbhwxkaonx8fnfjnx9ab1mt0h3pwhkkzz2wdqxpdzccv1001304xacrl8773g2tqn2tqkaub0mfp3my3tfc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3g06urkl2516dq7ifgtcdwnngdun4fe3xbtpasyqicd5rzglkpvg1xwclg75fpgynpwakj0cqz6769t35mdzwj63bvqgtqk2vnv5qkuef3ius2vnd9da0x49pu2sd64cy1yh98orow3ekulqyume1k2dqn96bzk9',
                responsibleUserAccountName: 'w26qmqqqny8vrwid326k',
                lastChangeUserAccount: 't654txqyq1juz1wt9hgj',
                lastChangedAt: '2020-08-04 06:25:15',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'v4kvhrifmnry0ljqkeeh6hezfqqei8qixby9tf2t',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'nk1ggeh1ciqz10dqlesmu1sxumf1n9ymxulw6a824w2bzi2p3p',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'tjz0k5nlvia46su8eul6',
                party: 'ub0i89csnietuyb23z7bb0b7ectycctrgsq9m76uylkolh8ak5xh13r7agx3mlskwh48pj3acs0p6ffpazhxe6o8dz6hvfv0zatpbx3v3mw7l1ui0c69r0m5ukc16wetdlcvp4pj81elrrgndf43f7fji81j26nj',
                component: 'qcc6jc6xxsty6tdu7lhsw7ebk60fh3pm8cfk9ddgxq438b3luw8tnyh64z3uu6ryxfz5qj8wk7bkg1aw3st5rlovff2zgqd7al5d93j5fru6l1am49gdbecf3qjdthzwx0ajpjf92hxecjq5mcpmtw39wk87m0za',
                name: '3x7y6h3lzt7lfuhog6hu31olfe6gswuvpmvmf4p82dvkz32evnpb1r7pg3euxb93ch4qas0sfd0jfzh9dvm2fkrp0hwn7i4vys7bbamzaxrv139i3ta2fccaa0x3miclbq874cp4iko6ws9deoo85xjrm2mpd7ma',
                flowHash: 'n7ercjlcg9rsaosbi919dxnmho90aln43ejlntej',
                flowParty: 'qocoetza5lmbklk0l76twi0bqyeh3382qrozo7v49yp7ssgxsey6jywjxk2fttywo9n3vfucxtu0nm0nwr8gq8rc6kra4p7n8upvhxadqw1xkn0t3g33nj2kvoxc9vvzg4w4aklcgmrm0n8vo0epba9en7azguun',
                flowComponent: 'vhsvrpep5zewtdjykifxi2kimqpimo0eslivftdxxlbfnqfe6znx4v6l5p68v2gsg6xecp3otyecsfgcwvrs3qib91h75d4zig2n9dxkj8svkp7wp03v6ntjv3dg7pjumf31aol1jq9ldvn27tr3nab5lu8ak23t',
                flowInterfaceName: 'yrh6g7psnmvpe0jk58dp2c4kty93wguciortz7dbezaleqqemas6oy9uy3i8nhbcyy01bv32c9ntn477pvyrozhf7nzuqhoqf77idwetkll6tgwz0xp5uqngzqyia322wxng6zf18i8z6i91crxxttg16adi7fkm',
                flowInterfaceNamespace: 'e1ch6e22u1tbe74vu3evkgml101v4udkyigz3whsjhwn4ld9s6ahm59l7zv1u63heuw1y5e560sv5udr7kf0i8k1bvzi97p7m45paxot5bbye7fvsikztsdqtkpyrnprd5pyuzm1hvpfa6kl9hmpy37407p50b0t',
                version: 'z195cssaqz05el6cdcar',
                adapterType: 'ndzfq4xuj7gubhxxrdgrmqcntcmgs7bcryn1wpc4rz9s7ldeg5hkehy8idcg',
                direction: 'SENDER',
                transportProtocol: 'xif5w3e62ra2y4ww8bpx47tr27gf8acewovp3cn1nu5egba6tis1xzrtk1hc',
                messageProtocol: 'iftbr7hv4ovq51o34elquwn0nlmmmpjfcl9uqm22k7fwjs967tg0m6p5ii1b',
                adapterEngineName: 'deurjhp8ndwjqfv45uymx60c2hihebq3n8yvc32di0i58sq676eu655zmx6158pesyfdujyl9jpmu04y68szulmwvwtvkznyzhdh9umm7h6ffksaq4472zo2wilkirn7e6nbs2lmor46hhw7ljieylgworuuzwfm',
                url: 'p9y3qoyyio030dggk2d52s7bmv8kw0ovh6bcvlryvkvknekb8tz94mi5t24gi8xeggwz0inbr9h18pybr9tj97r6jbbb2dcotdw1gq8nnfe091r8ivd871gowblru9np35rq45fwlahjpmw8nngzv6vpv7qua2m1zzr0089k27k8ekfrlh82en7vnya6bt6x9l88b9lj4rdvh7g6eehxb5rdyfl7rfdcn08gtw2v2o5yrkn9evto1yueo3lcvto730dwg0r4fww371vlbss74ljft6i76lrctf8qfpm3jf4v6okstfvaf6cc3k9arvi7',
                username: 'r956dt9tvy6m35s1wcrctcuujiu2nf69l1iipgknb4xx043viidct7z1sr95',
                remoteHost: 'hxvtf3t3ri8qhz5hkgwhtdmuijewlx8sdip3xmgjxp4bjf5genp3h11zf7xjhx5uqe0vus80jbyc0mo9e213mgoob7wql4fthe1rs1pid069vy8tp09goos1zleq2q91dx4hi141prlemz7atb8f27vnvki4omo1',
                remotePort: 86839918752,
                directory: 'lnnfrkabvdimtrwz6z7iqqufjw6ur6hy52njzsthc0lfermnbut9myzsoc2iddga01qnz21qoj2crswvvnd93xcmd0hdc6non6vwt6mmkb3r8w0wusi7vwhnawiri32xjgtzbz9dblq0ygdijtbrqdusdrzztpr3nxla0zxny6viml1wuwseqivnf6j1905dg1a9izbuv0ctvidbeq317k19bsj7mspdsulz9ls5nmfvf3uugcjnj6q9zp7xit84zqz84fuvwgqze5ud16qb9c5etwjgw4rc4uf0b3nlz0md5vu1yhofmlnrhgyvtqisfu2b0hutldv7qj30r90nyhigccet5bph7nqh1dfb2ykhumgrl0c18jcdtrkc3rudh5e2cdwrrpnbic1o77yitiilnz9rmk93pxq703ez3bg2w3mqrhs8t4r8d8l8556093pd8arf8v2543k52g9qj1hdo94ycb5sbytkwrutpg0pdze8v04bj3zefhto2lqkza9m2901ftjcv8deb41zotgzsfz394n1149i19shfv9rhoaae1ddsoqgwkipd1s24ya1uh8quteskpnhxt51v15i84g7cr1124nqcz78pxerht6htg3ukfkgcona8v8m33ct4xo5gzogdlwtfoab0m7si2rqph2ll27bulxnnus3zfu064ihnyw8asby0qe948jelwsdm9yf5vfagx55z52w7q63n9yeawb8j3v0ola64l8vtpkm6uojwvzptzh5ku1wsk6h8hwpzwgqrh0r9ud028l545yqhapta584km5r9jx1gxahrtgqq9pvu4tiguwnhvocdgyhn10em3cm38qvuowmplxw4337za5iew8h91ce9gec7l1v4w0opi4heqqp76cf2j2mjag6gkeaaq02yj4c99mtogj6uuuccnjkhyylaa0bugrwbigke8jwsf0t8psrm3yxul1jsrhp7kxvdtojoa791shlqnx8yvtmo2lpf0k243reqlscovnl',
                fileSchema: '7ojfzd7a2g3vrx53mty87p6j3qfoouxk33m8rb3sct2am9cz8kv7s89iegih5gzttiu1j8nsx9nh49jlf13z7dwtba2o3vuept5yf883yuyj4y3xdb3vghqnyep34l15i4gnwgas2y3h4l2vrit0w2ctbw6zwaljo1yu58x390f52l29xoytdfybkjk2uwosh5an2ej0n4kwfznx23yjndhqq5d8eid1sr61eu81di7rynfia7xlhzhq49sc0ymezvpo8vipgttajw03gxmztukkwnyysz0z0ftohwf5bytop026lgh2v9b2efvmwss9jt4px6vpmiyyj0hec995mgk160snwz53xsygipgdqpj1ckrmqy5heztlwvw0uhjimj4r7prusdr72d3p4qn5w1jlsnvrpyizdgrjygq7t203iysdsx54fjechrhjoq530qogrlivlqsya298she2txf641sop1wa9lj53pfwbtdlxvltnkn3p7izv8mlxhfhj6h9prlnmhrjtuyqbr6gcloftd06nxscup5p5xrsoyus3sck0biyguj41w2q46msrvasgutms746edlphy8c3yfmyx1j45i242924xt3kcldu826x7zzd5iz7yfomlh65dcajtctbsn64xy2nsu1ajsvrrfpyol1uvatcaqqsswc32al5iqi7ba2ir71yijfpcj7ikwspvdh74foawgte9nlw5ing5gnw457ryuzppaakcqf7fde7msd59d1uf81io43rx779igwus64q50auhxmfrnuktrsxho6orm8vlmda9q8a4k77l0ey0gt039l8wx9qcsqtuovt518efn17lsqddhtpigc7sk1hd7afd6l43e4r8yj5ltbstewi3i92tya80ve4nsa5v8k6uot01nf70zl81vf215j6hikae2dhpuy700h9s5idqf4v3ekke9wvpf6pxthtgrh3rymw81zmneuvvrkucp3ts7nqrvh5t4fr6g1tr7n0cw5upk7',
                proxyHost: 'yfaufuilzvqkbhi5x2vx5qp0t9hyudn3wuwx2ktxv9iihf39kbh9dtg8ab1h',
                proxyPort: 8979200722,
                destination: '9ur3ol5nhid5ah7fks3so3vod8gv9cchlcmc1jxjw4sk8xa4tyvutu12b8blz2azuuzk6gjtyc8roov579k5cvcsbq9dyyatl366ogy3kkwvvz1eapktnrdyt62l0740zrltzkxisua9doazj7y78q9hjghqchv6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hhofpsqnbmd5mu6wb5gzb91lktus3n66mzfo1u2m3bjcc5riqs1qip0ivc36r3on397m13d1l0yu2ak8kesm0xdiffta0fj09fxw636yujysbcikksnztjmdynhudwmbs7v35o3i90d263cja4iqq0cjgjthy3l4',
                responsibleUserAccountName: 'yfvznyeimpg5wlw8t10p',
                lastChangeUserAccount: 'ypk7eznjiupll379xi1y',
                lastChangedAt: '2020-08-04 11:50:59',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'oqmq8xz6n98cebntiwsxtqe5cqx1f0bzdxcmjaqm',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'wk6gtw7q3bbshfof2bo6tfksf2rbinahao0usd6app3km9twhm',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '2q82je2hc3381unn69t3',
                party: '3rxk89dp6tmx4pi1b7t9cbf0filljh691rciys86czrm2v194wigvzye817g7j6ff80jdbgrrzgiw884s4e6gbfnoe4a4rhlijq226fqm5imw4sp3ftip9wnwjliqp0ssysf51cm0lhwmjjb6ja6ksbe1lbc5lcd',
                component: 'okrb4zp3u1ht8vtr9p3i8wdzu4ups1srixzpjjdk8x7j54738dvm8dn5kep54q3syv1544qtxnio2lea4qdjc8nozk29of5w7coti25ma4mj07lxjgv5ue5h7sf92fvc1m3ufolubv5cuw29ir7n1hxcykngl5k1',
                name: 'uwe579h7lgtro5jmng97uqy77ev3nrgip8pd2fwji7ejs2xd2elq59c17567tt2abqu9x2wltdiwnca8w38a9jk9oa9olra98kcmsnd37v7eoarmzr3ea2i2xil9lr341533cllw58myz28jq70etza5kv80xgsq',
                flowHash: 'mq8biny992xldr846b3lo2ehnw51dgx3kd39r45j',
                flowParty: 'pna8ldrpkrp3ktd17ap54cciwkrspnucjqppb78i11lenh20ru1hjvxx1yo54ajztkomsof81bzo8ci4q41oeuaurlp61gtssj0ipyqdc4gyiohoh9pn3wupe21et74h87r04e516d1rp9cmyuw5hs5237y92rrx',
                flowComponent: '3rwbg47uom59c7u33knie5el1itrwhl1sbqs62dd5hui0zazgjta95agco2x99b0qosfaw8bgt83ubomim42s3lrmk0hlmfp710ptilcce3uo96milv7ubqukawj1x9zc6xx4puxfs6z00crtt0faj45p1kpp2x3',
                flowInterfaceName: '1tn0d73jijx85qqz85y8k7sb0kb575vpxjtvp7jueo2e1txl5cgbhcmdsaz6xyundqr239598fptu72to7vs3zjnn2q53qfn7sg3c3g80xa1d8hmfc4sx5xuzh1r8f7c000e5i6hjngnr6djdjfhfjfuxcsjbapl',
                flowInterfaceNamespace: 'playfjtsx20utq15pgz9r5g37hg2rkd68a6jepr4ptge5ux3pg9fh825qi3ypcjm3bg3f09ujp4e94xu7nzcqxeiq8cpkf2izq305tn91zad62xo7x65ilk9uly95609h9xfhu9l895iwzhwo14t6xh6lybj14dz',
                version: 'g68xbyn5575tt8f20iaz',
                adapterType: '48z1tx55cnd6g9gtctry3cfyersb2d1kfpuptgfm21h43i6o2dy0m52uonjo',
                direction: 'RECEIVER',
                transportProtocol: 'ha54pi9kcve3hp19vo4x3vj97uxj3zuq698qu3seti7cvfvpobn7cb8nx6an',
                messageProtocol: '6fft5q7pzbvqax2btusknimeyweag3k7tkn467gk1uwtj2q6ldmsbbr8zigc',
                adapterEngineName: 'whqbmcg875qxe0mfnhwag6o53pq8z4d1sgql4zuvq271skogsegxbl2bl41m19p4hjg0gip0yiwfhuksc4sotogdgsx2z2m0m10ztcrifr4p667i1er5oo6xn2rkkxueqlvaxi9iqek22ierz0zmutm55zeygc0o',
                url: 'q1gy1p5ybjncd2c4nwk1xrvp7euriprxmslzqvjglwtakt7jdwkw38spok3sq5o5ek48sjt1yha41sgpxfnfpdtjf82n4utixsrr8n8sgsyt4gur0gptlj2vp4n81310bymljrtcg66tc7ifac9jaqqbc2t9imnzt1jeb0wsr6bcknmhtapt30bqye16rd1uyjqucvuc2inqf2kl2554weld5urw77f2lpdujdi6ssbv15njmt7p0uth1wtxqbh7wfup8bj20bh7u53mqy6kpu8sjft10p8t207q28ewdt8p5d39xm5wu2w8tzrosdgi',
                username: 'xuvar94vgyzaoossdvkgbm53hokcov4er7t0fc5bbpq09ytii0pcq34fk8u0',
                remoteHost: '2xkm1nwhr40d7gdyg29fh5tkps3o0s544zage5jyxscqph9ct7gvt10dp9sww9xlrl4efpkwk0o8cdk2lylfk2lm5xqnbjjjbteyn0jghj9o7icc5uxuhje9nio22v06ai6f9ycoy2c0clcg4vzxlw85n5khxj8f',
                remotePort: 8690331240,
                directory: 'mwhragf0yahh7k99ch95lgkcq2nkqv0cyggklxdh5a2encqv13oe1t16wkug99nfu4bitlg2aq5qr00ikma40jx75txfnmeef42bzfq3xnyixyoxjxij2u6k91j8td69ehi7c8ffyytd7vljyj994hz2niio2mg853qg4z6hb6paips8phtvco40k3syx8sa5yfsekz999dd5x6jbjfaj7qg61eqbi94ivnv6nma7klkdf723b8jdbslk91fg7lcoc2oy6iviwj1v7cxlhw5idtzca1e9u7p597nnmtdyr09qwpgpk27hnkr7qpb8pl6ydhh7d2ynu0sm0s294oynygv24xm5jnh5l4vb84iy1es3ibliv26vu3lmpxnabr7x9tynrnuj0fupkp3abk4xy3tfa47v45kecpqlm03bbsweyxk90b3xfvvpn7yx9a97iqn3jsrly3d8vlsa6ddvh4f05ka0if8pk7d1yxwlavk5dolf7gff56n60qgnx16x0fvhpm5yghiuq2ivdq4slotyzqrx9dhpe7gf8jltaxw4x0yoo8ffnljhgoxn6znq5kagig9r0kmt87xia5r0z7hyri607taowug5kgnwdt0v1xxlshfeaxgm4n98y8zl44sllpgr4hbaz1kc3gs2fc9q2r1wysklzys9b3gveqbz3t6a8opwlp7o4wh2ese4w7fhjizy5y2m6u1sqhq298iyctazr52fnqgref39o1d39z3ro19ezfnzdq9mwttshpqf67jszyickfvfvkcb4xmzgri1akzkhw86na7lj4u21m1m9gcpsw73fmykb07u0gs7ts0c1zpt33c2j9nc9cxb2xgc69dsw1giddg03a74wo35atizjohxapomcrjums0q3c4lbetp0ec1qloorkyuaqpi1iw0x2a33ra0qpqixzno7j2n01bymhgk05hwk4o0mfa0c1939hitmj08ekltyzygm20rct5gr8fibxafayxy9ump74p8a2gagzjt',
                fileSchema: 'bf6xk7p7szf79qc7u4jsg2x6u6aldqvvh556mr88e2flu18rdh9xscsv3zstrf1g9nfw069amughshj9xxtmtaxpxcaiy64mm10905w2fifodv0jrc4qb9gbcxazqrh4k1cp20kh7k4x189jnlj2tegankltqp19n7umdnuozqmq16662q4fsno0eb33kffm3r30yyjpsnyxf2pk1d1xfcyk3q3uokkbepf0iy3hlqbfco2ap3bdk85gdg3gfxqd35kq5ie5gz4q6ux49v81u7o3qgwwum2i6ohpkrj53k3mr2sf9ij56l545whpmy7fb4u19k24rbdo4ksj8ajivuviao1nwuu10ikf1vgfgqdgd6u2limn1awe2wojnoy8zqsqhmk86coqyr8r2rdjoua0frefcxgxltapu4m0udgcslsic9fjwbxh36d6n252ymib6juyfnovx1unra55e09l31llw03hiuk7da35j9nc1crh9ecircqpwynl45kwdyp6ji0zfyvk0rju68i5lznz3zu92czigpewue5qlnnslwfjwh57u5w9dx5sf9olvir2s0ag42y8e56k3j7441o2eor2s80j1obm3mjdsllgkq4u9jun35leh1ndotki36p0n2kqds5kajkn25zwknew96oa9s6mii1o7yolmgx16p0ftns68oxhxfpt92mo1oss5i87x2ii2qsto8kaqppilvpav74lnumtk7dxvoeumvrdxp0ynnen4duva4l60ao6odoedzu3r1bqxfr072gtiqtx9rkzcrkhoehjt83zmburh6tffnmulmqxqo89tafhhe8y5tt94pob2phbgrng1lwnxi17lnbvdul3mqsxl0rxv1ha22km84rez99no8gaz141ei2k6bmajyl56dw3px11oq000bab2jbikmcyfuds3qxszg3a23mukw9l2iiity3jmjtmvgjybfpn013a2vt5lb6m2tf6zc1rgckcrp0t168sj6pin8z6td9d',
                proxyHost: 'ayr0if57q884wrzhewmejpoauiwhylioyz8h7w6j6l1q576gc0avfneubj6e',
                proxyPort: 9295781034,
                destination: 'ddre6nc3xsqvegoy4jfgjotlc8zi0g4mkx2e10z6uvox0chm2q058gxqyrkrm453f1409aswmbkgvz664qifxxp2mp3wkuvx63jsy040t3ngenrhxjobbdaqvg19ngfh0yzeehatrvmfx74wl5yi45lpx1x2k4jm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'flcpn65i50rt5ojtj2n6bifift1nn2zvqmyyll88n8ulv0nxlu9wnkac23smx52r8nju56kbfaq2qare2n0cgtk4w8evbkh1efi86t3vaxv6wpaxkc6u55b3fh6m0z8xie27qqwv8ivrzkd5nb4t3hould7t6d8s',
                responsibleUserAccountName: '1mhte64misoknliez8ch',
                lastChangeUserAccount: 'dqr3vuozyn978xjueleq',
                lastChangedAt: '2020-08-04 00:51:35',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'ps8abl1y32vf6v17ak46crmuyllnqm0turcvcdr7',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'k0xfglrnb8a44d9lx01ccwn5v6ncksnhxx2knwo32zkyx3k84y',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 's0t74774zgs3bs6pbkpp',
                party: 'kag24k0bno49x2kl9cryu6nt6gck2ovkrltgi1ibdy2jg8smh09zx78rbhyj2hdxtitl43e5pzgxvue62iqhja8lj3dmzlghblhfwjab2d1vpw2nk0fxk6yk22cjzqyy2mt4zzuig5tgrgprxb99mahn71oiuzyu',
                component: 'iw2rkmciapi624vvhw0iw8dqmzw7mvsa4r5dqbcsgta42jvtky69sw4mx6xrcugzmkf5jatt0qlbkereiaqpowpigwutstsck701t3ujgeudke3c1qhn01kgw1yvwk66fup2arj5cd44bdmdg3rpt4wewzpiu6j4',
                name: 'lky2g5o2lf49j6kty5dx0voe8mpfq2i1xbaemod9vz26he51m82tjxng2e21q0vzo30p1ia9g8952c8c2or0xsce0ulc4pb32sffytqf8vidi48dzt9xaq66i9vt32yhbpg60mxeahljaxyvdhvof03nlrayphvd',
                flowHash: 'ydoq60citbixxw9egu9kzu7h45si0oi4gie07d2g',
                flowParty: 'bky6djgrnbl2lyy7matb94dc8g5jxicg8147zb7e8lwm37fbrs8986crn4vyjs3h2e5x6yd76sb9hawzsr7njqwlfcchbjdocprosmooubd7mh1eylipwnwubb1v8azhogq5vvlj4txot9g6qzx46igpfp67iueb',
                flowComponent: 'pgg0wx8mk3w6k5cwxuvbrh3ehez2zbfejkd5rt9s892lbtsil4g7kkgjnlhescunwatdgzscpq1vfd14jlqbavjws8604j8p2l2k5zc3ck9nhoxcy7atdsmrsc12qtghtwjvwh4ne3in79opspu73xspdycitq0p',
                flowInterfaceName: 'ybqk5ivv1rrqqqhqys3wp3e2xvyhu7fl5ovz07bemtx38y5zkcra4qslxayveu5l34s2zw2bvbdlh3ps2g99x86723fp6qmf5omvp4makxeat3md27p3by9e5rt2nircwpeq3aa9e4nll7fhax8enigfkow69gip',
                flowInterfaceNamespace: 'gppi3dzhi3sgx2teo6yhq712i6t8bpoaxzx9r7t1tx1m3cl9cottorci0zi2qgzec6my0p993dpjfgxvr7f0pjq2xznq5y0p5y6da6goct9n6ahd292qez6ohifkik9y43qwutxb5buamuiwz2om3lpdw1rgkk1m',
                version: 'yv55dbwcwwgrtfeupxc5',
                adapterType: '2ejoexzkisiofi6go7x1rtu6m2vridmdrdie94vwi7uaqpdt9yxmykw8fp6l',
                direction: 'RECEIVER',
                transportProtocol: '8r5wftm4pwtxxat5d9dw21jj2fjvyjgqua3belhhg20smffohiv7w3cogbs8',
                messageProtocol: 'zqu3kuhp2bcltjvdh7j9dg5zhe3njb8kdgsrfkcv52hmbcw2c5fmq7gkhbf0',
                adapterEngineName: 'k3l04gnvcgmsexxi8w83e33wxuqbsaav5dgkhel721ghksozjic9srwt691nucj9qb78yybp5piuid4s1ozbv1ui4yqtzhfumzy4azwokwupms0g5m127nsre2pw9c6pctl85xx2lp2clk69ybr35lu0jxfb7o80',
                url: 'meidf9fn5ytmp3mdqvrmlg9zt44lfl8dzed05ugzltak3yx7l9nmj50rcspu67lkahp35lnevm669ep6vpao756i8zdjw77fqmnff69rmigso6yyxohq62bues1xwojz2lx1851dnfp02am844vjl5rofjpgs5qxsb7dksbg6d2md0oj8vmmyya58gmbgb82e5lnbhjmz02tmvial2od7bgvk87mmzkzchv73aj9xkyuariyk33919tf8px191k7sb26sj4btt3y7nrszkci5gbdd7fnifrpnypux4428sv0i6eey3btrrcg6056hygb',
                username: 'd77ou0om6uewhbozjqqwddmcrlp9nf7cuxdz3oca6l596a4fpeqqsmnxtmn5',
                remoteHost: '7rjq6i4mxrdx1ew6ogfrh925xmt51vlnbhfmb008nbol5l0d0tto4jxvsnn3oue6tcs8teijfh18yr87fisa2h2rwyp3sui5fuzch1gvmv4331bh2mztc3ob7lp3b9zcng77hkgufgck11y4kwnmyot1fe7jow1j',
                remotePort: 9195363179,
                directory: 'qnikpx9jx6b4eoor2w5g4aij3xec5ktptctwk2q3x4x8jj3v2uphokkvp16jia8ezrpyiso5uhprz6y7hksvf1ym9328c5vk2p257v6ghfi7wl5saywtlb47h9dncxjbvpeauy6m6q8gqat9f65n3io8829bjgnlvi7wo9s425y30wry7m7hy7qssfk9h165f4jgkj1vc0a8cyyia5r8g239h3kzsn5jbunvfulsego4yy3kheusbxu8vk2o95lrta3zase1zirmxogajx966adyjavx9x7auko0pqwwk9csagrrun5xwprcspuf4ecg6qihm19vin9vv3o9z4z4io44axwvvggfa4354vesufp2tzcr9rr0xmxeelzezjze6wpiv2eooio0u3lxe4697zjldy3ufu8f0obu3ledemd7ciqdxljqa6ns5a9bl5ooy665huoq5j4whivvftdbbcp8b3v5osc22kq3adjgme06epv3xeq7p160o3fu320rvws9aueedj5q9tz42nz74l7krhtunb2czglwyefvw7bet7a7ng76uweuzexrw1wjdxkle1mx5a7gb03i64dl5p4u2r10yxned40ksw8u1ute4l5crb5hx99eiinxgs2u0wf0pudxfsxgprm4m8ppnm9xg2maju9z73qcvahvus7e97w8k2xd1z59x570rrttszl8ugrwh55jiellv0ae1edjer2h19qrzkhltyq9ciirsb3gwqreb1dsvafx1apsvmkoc0wihg95bv8w7oljcws95sdnnd3wxf7rydgrjfvy39beuueyq9wgf6bb4f2tr13losnxnnnai3pf3ob699oyaaaiuk72z240cw87q8p4qh8nsuzykn3pcw7s9ardkray2vouyd7kjqid2lq41c1m0tb96c2s736l882l1f1oks32mrhslku76fxk9gbzgn6zg0242bcf0zms2hwf4ukeqp6gwgr9q7r17np7108t3lasu4j6ddex8af2plyj',
                fileSchema: '4cgiyx9rxf8o454ktuzayzhanwgij5jd8ifemzspgyw2t273dcdrrklcnmpqg274jrggocwkqpwt75f3wzapc6sktmqhtzeij504k7p2hy9hzhykju9kmzd8eas812rr1rcyp0we8or6an6heu4munkonhjurx1ffp1tro194j8jfle8wtw8uay390b5e0oruhbkili6frobcrq4hb9y4jlyiwbrwnc42a8gj3gq292nkryo5ljo11iwjzqe4vdni2glw5a3i3iudai86sct12j3b2co9o8leovl9qxa0eps39u3z74kcvez5rr0lavqopikq8hlc3urxn4cf75xsugaq3cq400nny5cmp4qmsbga7knzgyak6etpne4t5w8s2yma8re5tn3j92h86jvyfl92wh140jeb2sblptbot2psge82xdsokgkdtkw4vvhk92a0byh46bsz7tbq5bui9lgofl682t8zlv36hzeg9g81eredu531kjg2tc52y4x5qqxcjr40zvlm21l3hlwlc2ali259f2cgd7ec7vz5azw3n1wy7tekgckwutak5oj2hg55iokisxrdrv5ytmyhbl4xjsy9iljv2p20k60d6u8e0ivwm7842mwil7yphhh5w4jj5raeura4vgqc39h66r3jtedmmoc2ois3d7jrjconc8rsqc22bjg1m2ho8ms1nhpbqhmsot2hww0exox3m59chevpgjf7c2zz6thhdsfhgzezniew62ytgtfimmn0k1rzttxii0a99gwf0mlgwxp2x53qw61t4rn975rybzmsr4kmaphfpldlig2x6vd085mx5im0sgx6vb1r08ao8y7o1sxfjpfdfrbko70i2058vnngotek2ko4o4q11u14vrhkw4uxnpk25pajfpsdujfwtnit53xig7v3pfhcn4ajsihfmd3svtp6lefefj34v4l4ublirw3jq122ly7eul968ggr2tie6neii6rw05fmh7ur51eclj3v9x1t9w6c',
                proxyHost: '3dd0m4br1jcypsbgaomxyz4xx364piuvbdluyasrsv9uxeatedbdov1cifnd',
                proxyPort: 2282381906,
                destination: 'a3eb9k823mws71mxtq350b0pufl02gbdkcst1afcebhaev3t73v1tqr6dbu8v0ec7ugseljp8vrz1s76zz4ntsmoix2h3uvi0wmv5lcxkds6ppfww61uzmkx0zm58zkkn6z177jza3mxigmuefujsllfzk86h5rd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'z71ehrb7r8steyr01r9l3yyzxifs7ewn2nkrx1g4zqon88xbg3ogrx246nu5ntr9ka4srpqs5b6x8xgbbuqsq43jee84q175d2jtwqew27b03elocvj00dp9ods19rddjmjtx6z8pxt75fefo1h16brgz48y9sxe',
                responsibleUserAccountName: 'o7h56s6vobe6gvzq08bi',
                lastChangeUserAccount: '3u2ujfziwb3no7k1rw5o',
                lastChangedAt: '2020-08-04 05:54:07',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'zpd9nsg38ztmrx12ahws3o9d84s7nujr9laf2wjx',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'bj7yrq30q8hyj8k6pgytqb820uv111erzd1run3ynw34xoaqq9',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '00pm7nucn3pz6a2xdn56',
                party: 'opv0w4ivcuu776cul1lebknud4nba0xkqcit6mmgr6w3km8qtoq3l73oqr8s5hzt98u7hrn73uft73xljtg274vzp5dab1jce6qy5b71ij3ks3sajx2yhoyh9jw21nih3a3esgreei7wpfflgaj7cwabm9f133cq',
                component: 'htccsf7j8nvcg0a46me2eol73iu2tz2mjlc6f261zf3q7qlkfknpau9uubx0321ff6h7zzhsc1z69dngtmn4w4ukb3tixtfr032mhjdurqoq8on0v41a13ps45l0t3hlg2e8c55sfiw3vc80q3busav94e7wzmn3',
                name: 'g53b5ao0kbmhge81icddyqearg31y8c13gmuj14q2rtmdjhyzguj093k3i67x1ix52i1lzk34tym519bc0tbw8r2eqnq0xjt54bd6qppsti91lu0hgt4f5frkh7g38maydkyrple4wkhi3cx8mhld5cv2kdu4q71',
                flowHash: '17esyzr6vn32i6tg21k3061vtdtv9btnz8fy458z',
                flowParty: 'gnb8z3w6she9q8ix6ak6xqjok210k9pmvoeh2c9kd0i3qya5o8p4zsrlhh1apem4o3eetticqh3e5odk1x76wsmusnazijpineevetx0hnuf1iy2meeg4hxxkt6an2gsnelhazdc92pkzehywbqr0b2nqmceexem',
                flowComponent: '24qpi3w300tp6qane7nk4tyzp6x49qggegfcit9zzkzwhzs3lh1vy9a6o5ad48bo353flzon237iq8n3vxkx3mfoa7an58o6ztxd7iidq75qk07mpzkyqgomcq8te6nix1pm71xt2jru0hahfrz7yw6hugbbmpce',
                flowInterfaceName: 'ry042hgprv4l9wm7cxmt6oou2693qm8jylk9s7gbxzgq8gwp77myy69z2t8okoc7ih41srvthlz18fa5rcnwj1srw2n7u3a9l78er6i0wg8hiosicwr4wm3tvc2wnrg1a11v58ddwl2expmy1q33e84jyubpwxak',
                flowInterfaceNamespace: 'edzxax05bntembjtb2dspg1gonxh22d6lvovj5pl52ogcl05svjs2kl6v8sv15lplqemsd2qpia67agh5bmp77axg2q4ake699nn68z0m482mzo3qnrzrp3or26p74e0e25ekw5xfbtv3lti4spxkkpl1z930ad1',
                version: 'qhgf57ns2btrrdpdp35j',
                adapterType: 'tvya3dernim2y3o140zk6hlqxpwpml2fgwifv37fdu54xzyfocmvlk1rnnyi',
                direction: 'RECEIVER',
                transportProtocol: '9gkyxxxgvt1d4x5mjre4zjg9ia0yjnb8kwc1tul2knlal1b32sjksguet03z',
                messageProtocol: 'jxojrljzh9vx1s3z3tn5nkj0r8ahrrjht3mpgruu6c9jmfv3m3ri15evff9x',
                adapterEngineName: 'zp45xtxaxhwvkq35ccm6n6nvrjp5ca8w0fa2j4md3q44jxpszqe6pp3uljc4svr5tbzo5a1tyru8bpr2ewo054m6mmwlfvlsovpeobg0jrx3y76durffrqrbbh045copymbla27tql2pkrz9uw28dqtupnuqcja8',
                url: 'afbvruvjkzbpw03xh42mdikgu1r3ekkv44eb9j8wmqi289v1n8fay1vqbhjklhpy6xckfvs7p9c7ku6esc3bs9ueo9m6cpfih3pnm8bm2ryev48q5j1texuxzi7n4q16j20lm8og4akpy0zdk2oztbc1ioa7wzbg6fgelq5ug8bh4ocxxtxhhilz3nv2du3elg6c2zfaopybbpy6bxtfy3kgqii9rrev910nry9tz82otnodr4j74rmz4rh7lqxqcsgswubfk5xu472e5floh3gxhh0o07c1xaj6v489zikcy1r9i1octn4mv3nlc47w',
                username: 'scmhhc4pknjklfl4jbhsku04o2lvnnen3jj181raw7belhxh1wcmn9vau2da',
                remoteHost: 'pc8zgrfedl504yvcl5kd8dtgw24mqfn8qq7l6p5rtynftl2hh204c4666pa1lyfvuy346ggm9yjefdb6qjre7u5y6nplpugaedixuew8chehi7ii88tqfath5bulgjl7o3y2q0dzbcv7bkv13qpskqdotjub9lbo',
                remotePort: 7869847074,
                directory: '3k133lovtftgehrzakidgbaxfistsh6k0zzt5j5n5ql4ch32b6u2edqgnskhgrxm70enp86bvxowlpqp6wzezre4zwuje2pe1ohjinwzztylp3fz4h979h4ytzv7wsv6zs8iixdu49sxy2uc8gme8ns87nw9jfw6ytxg3nya9oofucv1b8v3yk89s2zm7gn9unjrveflhs3wlnpqmb2atxqplsehk7rii0rnww0g7eov1snpc2ma8xobqlvgranodb43jcss18qnqmqqj1xhgiahy3umr0ndg9n04l7bqdd3knqfyrlt2ejii2gswevno9u0fzaprpsg8w3cmx4a25rjnf2idjva7zywq32xxeooryevutk0tnfb9ay5u5m3uoxhj4vfafy8v2g2dx834dpjtqot35u50k8uanv9atvs1tbwejslllhtkdi1scq2lbg8e2occc571lnok0qxij4e05up01hrfciflpbmuy0571idqjphdrn3vc2zyv46z7v58pst4wj8g7a11rgxf91bo0ir2dkvkfj5urex4zopvqgln0sglwf0iui05gdcz5cqa7qnmykgd191ct13e9zl37uul37bm0smaw9tkczk9ysjqbf8jg9t72hzr05xvuls3a9xupm001p4r72kmpfimnt9cd6lvoxeyzkl8922wv3detr23c0veg0z3ew0k7i3pfaa3trffrkoz2ak527x3hawr6l5dj0pnguqe44wvpmqx95a9lo21duzbn4n1dzysytj9zijd40a2tylzyapiyqgjvlyil1c1b40fmqrudwuez13nlmk1hc3cuy0nzy1tcrsl1efms1qpoky4g0704xwwcsakk2jcge5s0hofc51r36q6riashn890n7vkrup36ialgs4oqyg6zspye8fczw92hyjw997halunh50178gn1pxpibyf9ewvx575iwn0jf4uwh05806x0agubo15xs2pqfd8xexnvbfbrhencly9w207mol46uheb3',
                fileSchema: '0nlvw6wtik98oqpm9gdgwr0fz0figparygloy0ekgj2u0k3hs3x0ilb0qrvceexeb2fy6zsanuaz0fb0emuyhwm54xnh9zscd9s4yevvud842nuf9roc37cnbjiimitdslnqzuiw7nsxe9u3zif4dvbqkldhhnyrihwd3h172uy7g4yj87th4rjytnv35owoh6rk3dztgqoesh6mytraob5333rzvhcks47eqnsp7xkw52qrpj1jebbvck17na8rql8mc80rudqtuf2zcrza71m8bm4u0wgtlu4pjzxvsiinum9tfa367y2iduvl65hq27ehlxb5j5jv1ha1jewxgie1eaxrdlqlfgtm3k4rgxhfmha0m8f85qsm0equt6ohr13wr4q4tw8ntj716yg5kw2g4nvfixle3ub54zw5c94rzt270xe0g7fq5fo8e43pdxqp6xe2peq8qwadypjvdnln3u3f9q044mjsys6ujb3oawnlfx7hofsbhzab9nbklh7cxidofuffxp8mrdzw2cf5pty9g0cz0ohwzauzsh7kbgs8jbzyitlc48q7m39imphd4eeas6rno2touq3nlq6ims8ypet8edxgycauisn19itr9b3z7pmo3ztpr6uyznd5iv9tgx5l6sgdm4v8xphot282n6b4sklh8begr260x5y1t5n3xo3mi3y3jhblvhjpaavgqgqnbui3ldayrq68klplvgcjedv04jiq83x7qlvaafyhjfzc397cqupthxj4d4kanvsrljx9myp9tl449w6aecyu21ceomflztu14ywilx26o0w7y9mszm2p12nilkl5opuncwzyxnqbrrog5dwcur6vcv0kagp413o14hzb9mulsslrqu2sfazbqeh48nu4dc4zmw47ok2jmdk6xlnszl6awk8ntsynm82u08d4ane275vhdl3ia592wzb48230vqmsmysdjgllexk1xnrw0jk00aymn2sxf8opeezjdu4logrhko7jh3sf',
                proxyHost: 'cweg8fvpvis45gs3b5edpww0luchl37q7coz2znjvhjyeuytr457pj7ql6j6b',
                proxyPort: 9633555265,
                destination: 'f4rhtqebp4qihqdg0bed9uefo0iiwr4fsyehpslwbeei60cpuq5ruoqnj8yi1f6g493ftbs6zbdhsjbkzr2lv7vu2f1d5qotaei5och8xa1bfcyv3w6s32kpng66irmltag1svwb72dytj19z0osdav6mo2c6vov',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '48u98ng4446qaol62ihwh085xfy24bexo7p2np4fq0gyvpj93gk2dm4xkbb4qzkrspqn205ghzxyg3c6qpib336uglo4vzt61m18bzdqzm1n3922oxsvkdzeeplvuu01nzw6ujjysg2cbh52285zeks2senbylvx',
                responsibleUserAccountName: 'fe0ncrgqaymdagfrwl6f',
                lastChangeUserAccount: '7a5a7dtk1xbs9xyduiw2',
                lastChangedAt: '2020-08-03 21:14:26',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'b55rrw3el94irufk5cx0xkap71mqsxwduahp3a3u',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: '3oheuy9c93pzbjlr1ggh51g0iduuoipd8p36ph7kksq9v8f2ce',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'mi44wzbtorad0f50le9d',
                party: '8ghdtco037d4vssgti5w7fpfjokamrssgceiocjnfuwabddwbtthexwo8s7em426di5cty9osk3ekxerazn1dn2kzz3t0r1pooroymsiq4ppigdvdqit3pfqlbpom809if1l02ia8fwxigtdq7m4vz7mzzsdowjy',
                component: 'nciy5pc7r7ew3vcrfyv3057f08rhadgp5kzifkqm02lb4xoujpj2kle2lerq7za0tvmsydh71rgjjf56rw3r33vub2ztsiwj8p6upuvoqwva1b3kpnqpm0vkcvu56oxmm7zjhrfor9jzvszcs7u29ix5m6t7rp51',
                name: 'ct5stty36o6qy8mwbpvr8nf03hs0gp4rxlw1a9i0756m18ki9ragedju65qy0rkof0vkt9849chitr3wbot2buly8pjzv4l1pz07b4pcg6o4oir7zfw2ul0zjynjgsewwaiyhxyidxca5jxpcigk9g98yo9etks6',
                flowHash: 'pca50upu0vfme6q84kaj1j1lvh7sd1wxj6m17f7p',
                flowParty: '7dlikmf4khv154jw9ebgx08v232zv63482r0hh0p06odsmi3rf138x76abfn5zwncfcxc5ywrviceze83a7inhjppvoqrj4tgop36gtwvy5u7s5g8e586r9vdhuevq97rdb1pnd7crcssngvid843pdprhvha6vb',
                flowComponent: '2ekda9feiou5mxxi87txc89ac8zqspuae8o8vzaammodjkeupfsqrd5gopodv061ch72qkkjnz0qlnzt7q7p8wox862i7awwz5yeinss916zsr0qsomxtwlholea6rz7bgx536nvj7ahly5j7ulb7ixtd3r3akqa',
                flowInterfaceName: 'nzt6vr1bdx019r1k8lttqvpchbh84b4br7mswic4vi9klih4tylh6bg9iguj7bnke6nobvcnp5kqneq8fabj9xvhu3fg6fktgeus9ex1feg2b7fqcmjfssu5coosvqhwwfkrce2nk9p8d4mykm2zyqegh4rtjfhd',
                flowInterfaceNamespace: 'wc4sooudzmy0jf4qz35seds524nbkdl1n3z7p22iwmpn3axlwfd0cm5bweg6b8au3z63thtrh7foagz15kho95sbzkvlhk0hnh206k0bfrdv9e7usy5bwqsmg1ue4q22oe3pzlpo9ic7ymtmninm9goqsk3zfro1',
                version: 'y21vfsp58hblo5j3g47d',
                adapterType: '5uj746cnb2ib8i80xmy5mle5cc30troz29v0fgihxj67wezd33yc5kxnvkp1',
                direction: 'SENDER',
                transportProtocol: '53koxrddpvjtshu1241nahc4gm1w02g2xevph08fbsklwxbr5pcqqyicj88l',
                messageProtocol: 'mws7u5lvs6ausskeoe2o6gt8w193o9ohwdhwnl34hgpm9uu978ikklc7bc76',
                adapterEngineName: 'lhvu60vuawmf6uivsgpfn6jmupo4bcs3szts8iu060d85yohm8yws1dnl7sx7fv99rodghtk4ss5rtwu4jhzvkbv0hnwjq7bpe8v1rbvs20xs05ptmw7wvxiitwgfvj2x86e8rm5ceu55b0znvsi6xr8uvepoijt',
                url: 'ryx9bba20q40f5umxnhi08jxpbw2zekgp55ouffqqnzxzlwmjfio1pcq1fp6zpprp40wnp8mdqsvtj6g8ce05bg5j5rax6yd91u6bvjejoulfryhab5qly3anc2dpb7hac0pz21pr3jawzoo6ci9b6qzqbjkyrb75hadddhimnz9p9qnpsom3sp2qchy0m4vweloape87gxuneltscbqvzpz6qgs6kazpthkd327u00uekikd429eca2ow05592hekrrk288bojcx570bwcer3cwb7nyvvdbenr8p4fxmsa3qb2zmc695w1vqlrd9si8',
                username: 'q0affbsjylu3gq1utz5960cw83cd8da0aoq8wy3xi4fczak7amuezaivwqts',
                remoteHost: '5p31o0lu1r0b4srovqy1ckucm5drztpkd1g7olf2som83v6dsljonp9jsng7eeu1zcrd2diivir94keegzowwtwezu3o69uld5xb2j8ecl7fdvpze1bwuih5e738iwc7l9jqfsdzpsv48ufihg1aeb1sda53swf6',
                remotePort: 3402657260,
                directory: 'rqhhk0kw5lwjjosyijobv93spszwoblxsmvhoysqytndf7okyftmrde3zlt4afx8jvf2dxn7r9z6iaw087gm20d8tv95th5oy5smp6oerzv9y9kp0ylahae74gw2vj3j4emzx9rxcq7a22x91ljj3ghdu089n7npz0tt0wd86lupfrc3oqx24plwow234ez1fjlaeybdo53ujug619i6wcajgh776018mvan0x45sdjulgdmc9scdyyvff9g42i5dy5xfohgl3s0dgvv2z3wnwuu96boqx0t5voahbul3p8xr5pgrncsu3z0rbsj2ea53ng6j7sj58naezv5tjywub1lzfujapa9w2z2w2qeuihdgmxkfohuaheisk683xjjhfvfljmijtkm0wkhqx1jcvu42bdu7n10fd1ckvlq1w8kg19jdmb31w0k4fkhf3pstl847n532oxpk6najnycn1bsw2pw8uw17w9p7cwtnqwgtogb6l74stdfvlcsk38rxk6v5t2ay72ck499gnllpex3v8twzf6cxunxefb8e20gmwb2b8447zepxk8h5renkcu230foxfhz0h84ugmfpgkdjzzv44wh20s3gwg1quc3bitfovxj1xg4dflj0dql9137xwe7dsictk7jhwkh5du6o840wpjjncfwtmdnztz8i3v1ii5tvs5ukjoqyp4uymgs1glsqr9c5zk6r83il4od6nspe901iqr90zhx6jst76t3tzmn0kztpu08zcantwavw27zbnyl78rke9b532h8kdvbd4y3qvbucn19qfyg7atdqfrkx6dafpdn4kjpgv2bl2h4rb3ex4vuj79ohxomoasergwignqd1psixsjacqf4fx91mypfuj7ibmku32xf3u8zb4bjxpalqa0wpw7lyg6pnkxtmzmua5n7dfzbjzof66ly824ebsaaru2boytwagzk2husb80ovex78nhum8heg48mx7ptwoxjuo44zj0975effs285rcn08lj',
                fileSchema: 'a7wg0usfygutbvpb28jnty0q6gxmt4b9yz8ismi7hdgomml53r24lrvyajfgrocafs2s2s52lfyie09q0er7x2kmyhlmrrwo3sxfc9wno040wol31x050meqy5k931vuzx9i4kpd5g4gkaucrup5w0280e2o7vhvjjwjk4py7o6zznsqlfzx44i0nyrj4bw5nfl435d78hz2p2c41rc9najpik2r3hewmwws9sbbzg1mfnot9n9p7hz6rbb7zm5g9tuxcx5pvrs6sa05mlfx96ayrtmcuwcgsfnrpbvyaflueehj6kvgg5s2ba7sdryf8cdzopwqqubtob4osfefbxlset3gfi8agfc7ncs80g2zjqbpbbqck8i9l5sc9eucoo1jic48dwv8m3fygsaoh8swqyl81anm2j0kpi7yqtx5pz2x0q8dvplmcm1zo3xs3bjkkcutes7x0rtc8dkk6yrkk5pwlgmeswik3inu45o3zfvad5yrksu6uqdlhsswdeuiir218isspkeq0nra96x0rt0llrd2a1h79njnasdzpfxh273a5o5noxkvkjxa4ljc3oj5w72z1rthge5mjakn9tiulw3rix61j9e8irkrkv0d6infjmfigzi8cjqkhwcb6np7mrex9y5x2226bjn5ytfrylpypzwhrkiqpvvdsv1v6k60ycn9728iahcozt8c7ek8kjxn4l686jd8wslekcpwje3zi5aztsuj70paekz6a359wlk93qd5onvx9sprmb1v7xd1pyusdrambpelphsgj3kk6gu8so447v6df7grevovfbiwyvn4uvj6j3e3xhq1t8df9lept9ntkex856hcx40jmmv0nryhpkabxk9szmepo512mxin1bjy9lnawr66dp24fcrbx5pcfq7v21expk3cpi6v0d766veacw3a96j9c7gst632yxhb2jfu6ey9xlqr3ib126ovu5t4fu7hep5odtzid8dmn6wjhsj7s1hon3feupv7ptvv',
                proxyHost: '2tgaz00d0n5n1mpgsm1t5chilw4tk42np2hfph6egcrx97lh8k41196zy5xn',
                proxyPort: 44671207599,
                destination: 'kcpsz54ogp3cvd41eaz7y7l92ltqbisaij33hvnac4cwhw6gmnvezo5wsppccovpex2vnyjejuoc09mc6z9ged82a150b7gdtk4y2cs9r7ujhc7aen2ch4nuf9ssf72fy8kkikgjo7q9pyoqmc7rdfjipi019r9u',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0tj7lbtu2j0ccbkv18ry2a67dvhw42f064qcb3ra7h3wnd7teesf8cci1jdbg68wjdzphv2hna9fzc5slr9ghc34lh5b1rfk73q13o14o1bny4djc7h2n053xnkb204xe0kpflnmeb2sb7cb34ir4qwz2k2fnowe',
                responsibleUserAccountName: 'vpoaa85gc47ag3vzczlm',
                lastChangeUserAccount: 'jf96l5xpi70pom12vc4l',
                lastChangedAt: '2020-08-04 11:12:19',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'b4watbooya6n90lvn1v2mluu5sqaei5evrbtyriw',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'bpqeqxqx23bdpphfdnxcqjlb6lhgtdjdrwnqqgei2lkhdxekno',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'qkm390vlu28khh2ypivf',
                party: 'jz4281k4lkkdx5tpcwchz43ms84wbz4oadz0rvdyin42xk6gitqxpxw1ujwe99wwelvzoz2m4nqflxhmhkf45nw5hlp43hsowopfydt6k26eixkyfzx4679pvge65n18zdzsx8i82ntwn9qayvaelkqvnee4ptio',
                component: '1p2nnbfk8tddo7hpcpenj8w9gnv8v14rv085hz6t27rcub2ejqrr5l90jfgaredru8rudyo1lhxjq14oeewqe0rf0iqd0w2lhta8i8kcrmn87j6mf6qab32xr6m59dxv0wx2x7klaycwzicrjusrwux7xki3xjo8',
                name: 'llboo51mzxfenouib7qnohgmdbvzcwpwya9vmuaf6lftszm241yjjls3hqrkcsb4ji37g6liwd4vq9oyd6m9i7f7wwkgl4w0v4jcz4ti1hwg49qlzgdee275pa3vyx2qw8tb3dt8duriu334dd1mieyu0tu63e2l',
                flowHash: 'olo8shbqtkyuxhm60euw0qpnusqlnhxu9d520qh3',
                flowParty: 'bkvif4znkchs2x54jdr36geeu1lgczqc1a0zwb61tn535iboesrk8w7cu4j0gsn0533penke91tnu0cr691dgvx7xgd2fqiw1f3n4yys7m746lvwg04xyratxx5obm1qqorgl3x14k3qne71ape0d3m8wj031gr3',
                flowComponent: 'wr4xgn4b9yl3ui220olhtz60eak00ne97pjt5um1d6qrwrzgj3tis5kngeot7ydxk92iuycarmnsdzzp2jz6aikcfa2intvz6fny1j1upj7ed2cuvnluzsms5z9j1e9iwykoses7qjtgizeyda89l300pjg02w3j',
                flowInterfaceName: '8ca2skgvn131qt7z2xz1mbofgqipingslnuggx0z20vh4jjcepekpy4ro66dgdcihaph8yt5kyygrijv0g1qi60yn3vbl166dvoo9y7yexxeh6ewkhmcye723pwuxp97d4uf14cdevs4q04txxtm3gh0xhpg4j7o',
                flowInterfaceNamespace: 'xkr2zhr8ww2n8ybkh8sb7uq0jijmoirc5392iu9dlko02wk4y4crwvzw3wwdor1r5hcmd4md63e18p548nqx9y46n0xsqrjuzlg51dgro7ptck3bph4zl87xapjs07wxln9lr0txps2fmlzmtxfpbqhg0hrylnuw',
                version: 'n1hymvkeqqt8z6hpcj1q',
                adapterType: 'ktvp1mnlw59ewlozogj08ekk394agq0kmw68wk5tya7b66r34u07qiuryo6o',
                direction: 'SENDER',
                transportProtocol: 'qrn6k57mrrtp940v04fy6e5sdxevpy5irws7aeitcujhf84l9abachex3zgf',
                messageProtocol: 'tfo1pez5ydw7atkyaopko0wzf1i0thqjf3t6wu5s31d75k1iku3o9om8u0t6',
                adapterEngineName: 'izjir8en0jl9ns7zwsks6zi86ek6ohay8b5tz2u4aufj9h4t0zcx3mqjulcfq944fkaligqc339zrcsemcebv3p9u0tta6tqjgbp6w94xhkrb3o987no5581k2l0ujltceodszh3ftzyvq4bk91hmq2v9wd6mlh4',
                url: '8y7ftaz71hwkky5newdzhknyrhga5kaphjd8secttz8or53qqjnj9qlkj9mixuvy8t67w6w3gthrkyaetqno1c00sklfepx2i1h05iglcn5i7g5x84wm1y1g59s6e2ojsm59i1ykwl0b3m6pd5gvoki1f356qiybw51b89d3b16u2hoysks2ij9635nlgjs5pl31c9dfz42ibhg28v727jq8nyp7bg88cfliiff7xlpm8ao85auk9w3fa9snkvrqio5yeji6q8axrwmixpnhbyfso12w37e06ixymh59pj81e7gpm600cqzk00gsanaq',
                username: 'go5ux8yumo444z3eiortryioil9jjtnc4eivhtbqngechb1wyfj292olq9dt',
                remoteHost: 'zo557c3sdybga421feq9puk57z7z4ita15iu5lhvbozeee65wijt4avffxzu7qdgvlgbt22mxgm216302whoohmx0d5mtxqqdp5levs8cr737dnqivu30yj51cnih7051tsqfisiznudp3supxpuk79n5250576w',
                remotePort: 9110225271,
                directory: '5w8zuc3jh683juo6f6af4uxz3uly826dgyk4oantckp19xc9v34yugq1fbq8mtmly5kgn0lbl8eoipwexjzl4kt3mp47joysfuhmvfll1wkbr8b1ewa7v8nobv6l3ayq0jmhop3yrdxskruju9odvi7l6y0p8qtwbtm5f3v8lcg8jwxlkdpljv2qt0vbpxxg0qr4hy70girapfvla55gxjnaw08c1eagwg867etmosfzi7nif0cbcqiqfk5oy82hpvwc48xonz12jw8vbd59pi4oi0ixtn7w3ebjss9uf5mcpo0okzrynyse7qoz3rny0zlplgp9w7epl5i1wu7upd0q63gpcswoz4kwv3gfvmwcl5nvq9ajon976eky8f1yaiymksdbzllgdam0bxee11e1bbpehfny8agyh6gcarmvosul0qzyc1cemir821ij9ld1f3t7u4hhlf96ghtshwhvq6uia1huzabjd0mey2iflb21wh6wtmwxcnmkuxjzpyv2f6show4stwwh5mndzuciyumo3wd26lc5wrjeq2hy5ocyic199vucbtvp098cj2kgb4v4dehnulhdi3bx8ty5p7s8n1tc3esfd95e8s9xm4b96o3dxzz8p5qc8ddjcvcxmk63j0h3txyf0mjg6ljazhx2q2fxehx527pntupmu8ou1cf7q96i9pdsghkxkdvbnzi31qjoiesr1h8km9c8yn5c1zg4alaaiji3y4ikyqysmvayo5zpsj3zbhfrucbt0xj7po8l7suqefsyzdf8q6g6986jbxg2sb6x6dvgzg3tsaer4rjj7f1ihry1xb9b6s1u23usqfwhcts9kdsleh04wb5svw17la1uq6ki29z8u8qpfgvydqia8tw381kqq0ecbwk5teqj3irzakkzd8owvrh1gpokkzqjp1v4o9bm52dscjwu47if508mey62zm84vxnpb3zdty9yk16vjkdikblfay3itmjhldlw103f6j9ir2eqjyhgnmw3',
                fileSchema: '0m60kkvb7j8lkjoef36gcbttt607lche6rx3v4g4y8urzb9n4r3octf7nw7oucy9urdep2w8xx99j3mh1rnrm2um7a59505j86guhd42b0aomr3asjh89x7lotjjrsbt0x4nik7fi8rc0rxeq1xgg609cxbn4uv3nl3cquuvyfw4nlgip8f99q50hq0ontj0rzn3hotpe08hq5r29o9y3lgnyh6s3c6rxu6kg912vrzah2nlhmmig92sll72uelrd3petikxez3e12wfcxqxp5cgu1pg8uw19y8xu3qw671t4r7q5lneiodt9f12fsd9cs3z315c6d7pn4tvdj24nc78n63wxrcnytktejigavv59r3wd3kkmc4y3nxmj0ebxvhgtj778zavop9vof2aooebpk2w2rc68mcxstsw76fq1ggzunc4fikaxxz6tqnhxptum7k3f4atuesv6gqaw77jsdsvhulcfzdc1q8o5dxurhl8rv1rb4wvhgx44i0jp0lks0r6rc5iyxl6p3kvozp5tszrn0duyuftjtbrspugkcw8wo0917zgqo3xqi6j4mhpstk7ksr39gdy378sbnw7513kqg6dwe13j5gystgj0ief6uy1p0tuxmhoflnva55j797y9jagvkm10294gtlmf1l9eiyhjns9zzg04b189v5gxbysvfd5wd2mhnpchtjos76iq3ebf5ug9al83it38jgo7aepn0we8jstbnb91w5x7hi24ybi5hzof2cw0l5l7z2mcgw1y5tftub4pai4kp4zqwl4ilq0ufuvcole8d6qkux4f023u6a1guz15o6vrvqloxqd7xn0zg54vi9rkq8fqq5ovasr3tyh2gsrnfcav2rhzgp2t3lmv8g8c3i60ew1bkt7dplaobloabm4fmwhdf7mxr6yqvkevln7k1mqyrzoszyftcrg54pn0a342hpriln9zbat0uxqjx57z9e57k93li8x3ev0kgh7r87ho04ay5qgqb2piolj',
                proxyHost: '5c7xn1cjsz8brdiou8wvf83s0t7dp19bkb5rcuxhavskthfmphegvdvlgsmd',
                proxyPort: 9718869192,
                destination: 'unkmfxukyjvilkne47qzntd8h370o9dfi52ysm3dpf5kzve9nyr3enukjm542b8dz594wiguia367ilt4zlwoznl4cfujdr6oza3ufvjnqjfeifogzpaam4n3fj1uf5ajg23arsi6v5sbl37jbrodlo0f0o0d3pla',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'k0j6f4ji2gxg5l5pd6p8vlbfpx0imxj5lickq6mm8r616x1an33kf8wkxp7zvj8t5hm2m4a0w90ifnxckz7swonm6qep5440x02guem70kmbitk6gd61jqyqy71sb3882yuwb67e4uv5a70ciyqjz2h98oa7fm8v',
                responsibleUserAccountName: 'wkqgjbmnpjt6043yi3r8',
                lastChangeUserAccount: 'px2tgg7t9j7iol4sp990',
                lastChangedAt: '2020-08-04 05:30:54',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '1bneohtcd6cm86an3l2afchii0a6rf2vtnq5vrxw',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'fu9m8m7t5r612ujqk27o62pdxiuhgqsu3n4snhsrxzzvy3xhf6',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'giajjcloi9t96yew89n5',
                party: '85xm3463nn5yudoim2lox6mnl39gw9o4wegb5byrirztk7fzknnb4uio00ww1piuvyxqsqqhv7vljel4z0nwcmfxefnd5h23rl77nr8ibm4sa5s2utkgtfnjmpgk3trj0cvhzqwiczkr4plq8usr8b8uhq2k55pi',
                component: 'i7k9efrthu0fn17ceoldo1nznom76syew93in5s6rvm2d23nss0vxa7m2g6ikrxoe32oraab1fcnlhpschke2itj3u9q2kd7lcrk2r00l1ncr6lerupeewjatk4d825jyy22bx3n4mixcrrwac383dtszuvb8989',
                name: 'g4k0lkbp1gc9pp7p15i73nj5av1dtoonlu73aik531v4doplydnzd7qq6abkshon3vnjxc4ny4ajb5icxhtuwrwzpm7scpnjef18h1wd9huz64uzwnazzhhj4auhd6dij6y5pjfnahkeumphsf31e75elkq27dcg',
                flowHash: 'rdpyu09ahetwgwr3e9jp7tspugktnjef1qn2j2nw',
                flowParty: 'zhlru8unj83yr17kuwc9njzfffxy03qqsyb15edjk29ifsxs9lnvsvvxcm5mmhxchsvt30dh43ifhrydbyfkb3o1lsdne7eu5hxq0dclgwcyzxqavxlf82fkq429gq654ea3roi45ekfwin7ysjeafig0eeclo17',
                flowComponent: 'd3s97s8je4ankfgfnyi0dss4z198w0dvb6tk13xchm45rsv63bue9es64tm0fffien8lwh7of2kdym2x2tsdxg5x700em0wea795uthgq15dr84ctm6gks9xxcw5qmpjck37eiuinigjxa7yxnk4icv6fipg57sx',
                flowInterfaceName: 'ww9ar8jfdvj7uflt26w9tzbt4ryvdi5trc92tpkkbi5kiodnsq7slsz4zxwcken4lix68c0erbqh2jwgos2hgyaq6684fylfnaf0lvo72wfn25021ionzpjj2iksx7xuiw6yapqh8cxpuvtin3zzbjs5ua0rchp6',
                flowInterfaceNamespace: 'xck9dks40k5c8jw9wtodmub195w58xjzqxe3ixgzi2axjj2xgyy6yd8lilgndukn0mwwfewhs0ssgcwcbf1n44wqz2w0t4i7gqho7h4kcgq56k4p8mm2jyb6qyk2lccu4upp7kklje484bo19p162623lqk179ge',
                version: 'sxl5i8ayz5w2msosswj9',
                adapterType: 'vlg2m4r0720b2zl2fs04fl92jopcmm5fh8rbxdl978l7q0t1sn7fqka9jjgt',
                direction: 'SENDER',
                transportProtocol: 'pubpkvz7k3jycbvq45dg1p7bq2lg0gftukpjz9zkb2282140szumfncmv05f',
                messageProtocol: 'lh4opc0ic9047ztqims1acqr49yco4tx0498qmy5zn147i5l7myuue267i65',
                adapterEngineName: 'ud24hag307uhw5j5o9276y8d9m0ht8mqjub0e3mf4f45a9tjrarpqtz3qsrg49l3fo7901n89fvq882dyt6543i86wmqzuvj9c4rnb74h54gvnqu3817fczwokriik4aikkoz0eit3c3l5ae3j5u5yg5fvtr2gjc',
                url: 'mh7sbnjk7gizkxpsuf7hx4o2ka1ohof81f0zpsp8z4lw8pd7fs32equzyde72793ehwy0tx3r551we02rloj63prjgcsfflcw9xtgopo72e32o5mzygjoule95s7ezw5ezh5z1knql6rjxbboigcntyejtxgj6y4tpq0ui22qqv5vt6dwkfwfdy7geskyskz5yvtcl7cn4bfvypkrn61b4bod2zvpojua0deli53h1q7mhq6m60hw9brneracssp4ikyzn5ov6uom4rir1382o37hmntf98sb4w1qfz3i8ys4fzy0ulflwydu8wh6cja',
                username: 'iup96gwpehp2xwa0jggdta2j8ifjsb69tf2s35cd261ha2mrecovugeawj9v',
                remoteHost: 'b3favh8metf74twc0veppitapgtrih66wnovx0pga3l4n5c3rwflefxdkf4lmagvpyu2l592sy2nu2j64r6sptvvufgosq7w8g52rr6abg4m7k0nduai5z4vvmfetvn47jfd9js5tpobagepz98rt4lj5q606t2j',
                remotePort: 2207834891,
                directory: 'dpf4uudbid1j0ts94jjuolk9ad4vf7jv0c6j422iz635mrdr9i2f1fbw3m0qq0h1znwhwrgo5lewbjo2imrgsu5av38ytn7631kkijtrfzmmr4tqhom6czrqvxa3bylm0umwmerhji06oo9hey8cd6w9qtq7cu5hfjm76xov9cvky35jysiyl6qdedfwxl2y0g9egg7secchnnx7w64nwg4rwe5q1lu5wr9uh14q8ldxykp9ip3rd3a41mi8qyokfpuou85xjkkj1xbsk0tax51glzlt1fokt5jg10d1p9c8mqpkvz8fg6l2smbmpgsosvjz0zjz4lm8t09c6uc0muke4en6rjhwrcpfy533f3almyqa7xetmhc4ukvcsju9ma9u3wxo538cpb88v7wjroqgt3fvib6lseem6kg7rs9uls7hy1ie3dcc49yidmz0ayas5dqkflfd5plenibxm8tzlcla6i6bqfi5ofh2ncuen73eq8lu4kyd8mj5e5rmmb87gfrpvam4uityk453sb6x5pbjj8j89n2yx039jw563fow5xb1v8qhdg4at2j4kyyhnddx0tc61khw3308ei9vqqy6y35dwrvyi2qepytlrte7lbg8t3790w3oljval2ya5pkem9ur23erpn2cwhjqf3cqapf82n8dvno63l7wm7psp7edwcr0ysj94dbhuv3rr8m4j50asjiiy2i3rwyfm4eqlqlsuj9c258hefnv0h0yeykx6ib4w89hkyd2fvxx969joafslt9j7mi86u5krjo768hax8k6a1f1ciea2gsoqyo2hg0g86uycd52ctgt2myf4unlx7ka5158a0oz8bh7u47uvpizm98nb8dwdivjjdhop225odyguqaa9sw5h22hggbso2kwrvvazzf66p3w5k1i4mnwuu5or3m9runfz2w195wj8zxsaib6bf82mwj9r7i1i6ggiry1mwx4lvq3zevmywjfsatql5t4jpgrhdz2zywous8fpmyk',
                fileSchema: 'kw76tfvkqqnnp5zgxgyv4wkgsyr3u8hfmv6zdrrgcfxb26u1snxwp8iw96jcd4jtnvphqfqcl5sqlcfj2pfxkc2ua2uund7m8eoxp9e7nfn4g7vcm0qhwbkh51vp9pf5iiaefsk8rcs5y922ibbgcth4py6fnxwjpcywe58mp3c8gqry5gnjbv5ynthfum3ntbptpz0af1scik330uz6uzkmsqp0onivnfluia0zqefavihrq074x7ncqu3m4qt9vqlp1vmgk1zed8zslikp5vugl3cyd362g9tqhgz5qy727mns7edaljatvqp74ijpabjobu9ltwlqqiurd0jrbtr2eiz59wrumwd8721wwaen30t7jr9siqr5h1pnl37u4eacjkt3jihp0lw3dwwuywj8bqifkui9aj03j8gvanyfbg9s4jeyb0o212b673ivlhohvaoiloh4hn06e9ru585ocnhp6gbw2ainqgmqk27w1pbqqg9ejp0zebjxt73gurmnp1tsnxh11qixy6m6ynv1809oow1dcizh0krj3nyvva4one745o9h1e8yl1sgkfaz6yv8ymfqpeol929ctgh963sqvq6g3cguzff2md1uvpp7q8hi4i6gxefq7zmntuo94iyu3i45u13jb684hm1n8i089ec8iobq90qfwkhkr15l0e7vd8tvgplmq9hxriezcgfvf4xom8ljfhs7bi91f90dxzm5x88bh4ms02adbpzyg45og1nlh8enfca5f0l5javjre1z8oi6jcuxjac6mqcxdoxiewj65hhuknprky6e45diwaytwnlz9cf8l6xs632dmxcvyyg5yqgjyvaubzpz00j6rwtscreu12vjj7w3et7v75r01vnet16lbme69uvmrkzdu5e9rameb4isy01qxqn89dey4dlgjsjfoowlvkqtvwc16czhhad8kbiu4lgsuw5w6r72r3ixtqizyhaf0v69yg7aiuat9g7tfdthycsjmgwjhr6kv9mz',
                proxyHost: 'o27pcbl08h8ytov7i43b6y6cdu3aggynq0hm4szocnpbj95gidklecjq72sg',
                proxyPort: 3362310247,
                destination: 'kquz8ay193vlee38y3a766ohb6thv72mbmv5ihdqmedv0y8hlu11cqbzkf2tcyh5wz8j9yf8gm6mijqd0ag5i75jb7m9bga5paac06ed2qfuf891nb778cbn903uy4eo2p9lq3g3dyisthkw1pyti99g5mb1ozhl',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0bey1jm7po4zhxf128a3horuubl2hqdcbyp7tuvqcdba3az6wpzo2d6ta2ixumv71a5rgi5ejlfnnshf1512ecpq0y5x8tcdpyzg7fxk05r9aeqdmvu5oehpjqqtexwe5famsvzljkmymby5vzor8vqm1zo531377',
                responsibleUserAccountName: 'a4zmni6v12wbnr1drx3t',
                lastChangeUserAccount: '6loh9y1yrsunal5bfe4q',
                lastChangedAt: '2020-08-04 13:04:08',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '9tnemc7h93oudy8szxrxmgnobacn6unm5rzv4svy',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'k747qpbkq7hsl08vq2szgdb8jelt970i51ubntuj1bzzuxa4pg',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '87riwx08p5vo4qx24ib6',
                party: 'p30sjbnemp5wxwadlioiy29jrbhg6z31yga57i3box0oqt8kmx0ro4m5ffcxaglml6g0134dbbrgzjf81k0bp7n6vedaijevkv3011yrlbfd9360s327ycbb77jwyxz54vp76tw489bfa22cg5i053ru6bt971jo',
                component: '0ymgh7ygb3200qeizmds3kl5un77cqdjfmxfupr0ap562jh8i76ni403luong5o1ex94hm8xhpmo5glnmyculck37ohovk6nrkt7h7louvy0gpx9iwgw7yf5vdsxq8wqnlo69luozodjc5rjhgixz2g5krlahfzf',
                name: '0ke8u8plgibp7d329pmrq8c3m0kefpag6lk771ykwf1l4cvg9bkojo0cqs0lgi9cjuer0xz9h0bft7b0jlpwpmfm9nutipz1h3bqr9kgyfzsdq0agcj5xbjw9e8tggxo5vihxzx3227ku3sr911k2b8niz57638o',
                flowHash: 'gdkwo4d8ra88jzv9e5eucy1dckjt7w9ktxi97gmu',
                flowParty: 'mvowp4w01dh0mhh7t34vwee6fk5nvhuechho5r8rpv1vfsfge71ssstvmnjpr27jajvqm9mxmn5jhdcoe2hi2kcd69rvih1al942tr43mtxvf1lp1wotodc04rtyi71pq8w89y58lm7be8hex226c7nkycp7zl1o',
                flowComponent: '5iwqthimujgq03kvqlygmr21zi108dhertpspwlo1esq6q6kjkjeyitqqsiee90w4uofyuwidnzok72quhnv4wx0e79ay5feflmpsc7jlzfh9i3ia4my5o2uuejkaylazhl83yghnmgs0iv6pdrvl7se3rz3jq8j',
                flowInterfaceName: '6m5l3989q5538a9uhi98w4tzluc1ka48ukvua3doym3zna7jrggbovszl3bhnvjc3r0zglw5h725vhiqfavzn8v44j53xmoeiefs1ax8f6fecgsl02ck14q29c29llytamrtslwk7tiziwyrvrzyoyz0ohnsxxia',
                flowInterfaceNamespace: 'wx8gtfwziglswp7yytg8qvpbxt5l1aqslsvwrxffa9tphwheq1t23fs8xvbn7c3imk9nh6ccwsv7dqryar5r0380e2pq79fd6zrnv2zkg9u14q32xpq1sgn7vdifg7ego1oesi0a5cwgascj0t9t2hddgupnkdey',
                version: '22mokpom4668kil517ku',
                adapterType: 'w6cyujtflgj2ca4pkr88af6qaiebfondi21cedq8jg2kdf6d75qjzejdyxbx',
                direction: 'RECEIVER',
                transportProtocol: 'n0ew0z8wirv9biyfbjiwit9qv6llzdj4fk4vt9eerp32ks4fqj35y4zfcsyc',
                messageProtocol: 'k5l3t9i0soxijh0kin5cxwlfn65y4b97ualo6v1gd21p340vn0yhq8fyr30s',
                adapterEngineName: 'vtef16w0eximorruthqimj7k54gl7k8z83gq9kvizkr521t1d7bzgoymqlgp8nfiujrifzzh0uwn6e9u9eug7z0kjwvghoblyju5o4n41h887ljdd82pyq7okkakn1zch2zy9eq7vqcbz4dfr1h0egjngxrin854',
                url: 'xr6ci5o2teavmomuijgquf0j6lhkvldrj3su7lvh6fpdygxe2qi534a2xt94bix5h9gjzrm6tvb8yps72gt4c8i5aiib1jbd52s820ryeqst2s4szkqqrkhxynpwbqgvsc3e1kia90prvh4wr6s7hanyab1wuz40jpu4rvnicymfhfpowh1i8h5lbjshejl0zym81jhoaaznl3to8m1xepkgzmhbzp74l1acrj4ltjm2we78b9fqi79vnrnn2umgblr4yb4l9ccb8st3jvcifld8h712xhp7y0xjpocpyjme3cfn8xtrvmd964wtzzjd',
                username: '7fzmulkx7ce00gyz8tyuyncxzuxpqy0aeczg03pq8m1rto3wtieryjsqo80z',
                remoteHost: 'p07iudo3r1ppw84kg3i34twu9ir4b5p6sn7uqf4ggctcblmveup2d9apxezjbyxto3bv17vr46n8lpoawqbk43pgs6kf0bd0vm6y6x0u563o10jjxj94i7aufulye4pcg342zp9ruuku8zt7tzhlu1jko76q13li',
                remotePort: 1295132979,
                directory: 'qmag10viscb9gu3wtlu2y808mxswwbunbtrd764if5u6wfg5q1evpxo8vxtpsre6q6d8t3e6q866rt9c1uk6noexozoo4t69zztpneq4xc36o2hsc0ghzg1g3x2w2slau8prd3rcxj7z5nqsv2v1352h16akukw5msufvf081p83tb7jxytywh2ecphyvwtqky5lpqde2npypqqwdimx64dejby11qgcesqha2z7g9qi9jo61ly3uemnp8rmj18dyongfsvmn006qahgy8hzxfwzuu4jwm2i3fk9rj0h1k3pt5ca8rpx5wfvusjol90bn6bgymojcb3mjuhrhhi87ftwotlirg9bxhyx5l08rowa9xcbap42ijxc3unggkk22yd0lu9dw3ch1lizz03mtfj715s6go3ig5nlpml8wddsnwwsfxlptbiep3f5qypihkwyzi11x2s3sf8qkozzpeezkwfq7r84ueqnj4li54sjmrz7n7gvmzvmmful79tz60mvqlailalp3g11d5mbrp9hf1pq17b3rlpu7hovcze8xapgg9aqktdhkbgfcx0p3w8ox118omth49wgj3gdr03zo02v4stocxv7vzu8963hyhph9g4keb3hcmoylb7ityjln39vjq815sajzs48qpkw0g0m830jxcbt7f9w19dztk6c8948ablvlrb083b97p3sghoytz9h76xqa0eg60qpumhr1quxrjdllwfiguk4d5iznfweberouaw49rs14airilizl1r2g95j5w4b62nbx091r1d866rh31k03b9fqx4du9efjo0j34mrga51tz8j80n0muge9wcnnuk6nb46ra80m2i62wrr7tgqfglxvdlx093aikiiklbjrkq6j5tpxwb7hj37i116948q1zs2dmdk1kcrpjr2g4ahq82p7ytheosto9r5qcss78dwrtosrhpo2nvm49kgp3puoard8wsuk5jb2kfpu9w7w57bvyuvcqhl30vjz9fg83jw',
                fileSchema: 'haawpewzn8olgy0a5664o70m28dqlp6awvbme7q8r2vpfm2okjf6ms0moc8jlqz0tvg9s3qvtf9q9dbclj2wz71uvqtnoe6frthlv2erdq61b1qfrhibboo3e8zo7a81kduh4l1vlflynbaxxab8s5dieq0ykauhg77hvtg69bakyirojvspx2cd9p2q8nuew4xu0oas8hz5k5hmko2l3jtzodit28kmo05dx4gqcg6f8r7u4pxhit7lqvd84xija5q7me1x4fio2hqlijycfvxbsejlxu072pu60237gteenkrh91fnt2hd7akp80c6hqjlmobh9w7x395aypk6njzkifg6owesk2sbw1x252mlnlifie4e5t9lc67eylbjgpa8p84kh3k88zpjqnpx1v9r83cxv7ynresrmjkv909nwbds7efxkvhp6hcbtr5kofligksagswu2mq57c1juoiua43h6z503sulw4rdhrnmxfgmil4deh0ho20f8ofzx21onfj8tz5g2vi0b0bfbfmn3pa6pj47u05wzfhmk2rziy77mcdb2cc01bw43xvstroshxiftpyi1g9lsch701u3tzorrqcbuw9i3or3fii9td8evqt7wzeim8qair9l3n0vqyuhgd664a7i796u4kvw3j408xmlygwrsaywq6mqcdj8ipf1m8n2vbgmwkjel9qf991aa1bsixrg3fcmz75jui6hwiw183ayefwu14e58rxinvoc6t6zxhjk2qg9h0k57ab6fdklnm3fiowxa5ys0lwct9sh86bn2cz5ryzi3f865iw4y48td7cux16fbgl7jkjogmr2ig41iw8q6m7dj8vz5ilmt1p0d00l0779y1t0xrierxljn6qbkndnoeq7wjq9u4m81jd1jfk9a66yqbx6dwyld42jbyjhuuh4ijqahza41at2cfghfws8dhv2cwsp5p58c4t02e675rx1dlpbmszgkhja8c7zqpde9sqqcuvozzi2e0ii0fka',
                proxyHost: 'f07fzvbclc4h1fppii7fxcyfc29xsvzph6qtydy1k5j0a1pi0apn0stic1hc',
                proxyPort: 1130342721,
                destination: '0fz5ww0sf7f90q05qv2zjg6hz48pz5ibe5sxnc29qur78sk71rzueq3ho8dc2l1c12lehzvysutk75e5vegk5exr7efbz9xkmzzsftqctuccxdgg4f91hew8uuoka3vdhteb7lo6r956tii9w1hvny5b1gll8clz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'eweyc3qnl18xnnnyx088lqfdvh5o56ydy41vf8cyo394uw5d3n6po9yxfeoqqpqizgzn4invd027845kq0k0dddrrbutuk8hd2oxm35wcr7gqv2x5wngfpronanlcyor0diwranety29ppos8efm7ns6mrjgnidj',
                responsibleUserAccountName: 'e2aru6gxbjw3zh7p44qfu',
                lastChangeUserAccount: 'xy7vpdntwjzd11rpboo1',
                lastChangedAt: '2020-08-04 05:59:35',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'sjfxmu6tk45op23ow9pmosl4322ac4myr5zt4sp2',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'zxa7u76ghk1jxukttaf1l9wh3o3eihzy9qsg18ki6ekjwbe8bj',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'nvnug7l73wdqqrssv8wb',
                party: 'jjin1hmhhpf001ztnherhm785nlsb5gwpqioytr55722uao6yrt71t0chi7py93lzsl94i9585l9gwptkk4hxrypbzejvizkofxey7fqfxycrwokvix3nqkyjbtjfdp9lku8e8ae2ian77e7w7aqtanap3ra8562',
                component: 'pobq7t5raovkbkh8bqv6xbdev7pc0zl1bj56egngfnu167bm4ut6xakgreeah6fnifigkhc3cxhp3b3dohkochyh4gtl6q2g3wbby719w2ubjk9gjues9oc4ecr7ack1gigsxvngdyoobik80d13wpgs2j30htak',
                name: 'njyj0p6zc6nsn9c77ujbcl2fmfvllf6sqm08uwn6r1gqplgr1qzehktinw76mr4eo1gcrgvwbgkyjszjwgfj3tjbn50v0sfculhx9em0jnnsw87fynn77krp72klfmaab79kythtd0tgake0r17ubghkop09tuo1',
                flowHash: 'pe6dsuenpnmriihc7orp336li4u123ibcvmkqtww',
                flowParty: 'jsc0yl2ywlxg81agt7245ghajqf3dz2tvyx9evinn2m4c6lk4knrni4mu6dpb2xs3bv32vbxn6u0rzvxmqin3ol4l4o686etswq53dmvjkd1pkg4jpvqprhg87elyg2xoyuyxrnr3srvf4szko71itlt3j78l1xu',
                flowComponent: 'bmyywpcpgw9bqua73c71xyamdxyzdbl24j4afdbayu1dxsyfj3o07ctc8fnj0j7o1dnrnwoo47nubgzlvombtq2ir4jc1wigbaxshgfues3iapgi74eyynv4w588ithdm8xigsl7uxbyu7ewfngb8z743mfj5sgu',
                flowInterfaceName: '1nhnpfe6ly7jwdv6a2jggkov9y72lid2lrg0lc5a6zjndt02180zj3sas33mhs4zga3033nk5n1v11ny6qjqzdyx7ruun115btl0y2ckg6f635lsuk1kd5gtka52j7fosbqe6zas9zed4vi9wv6z8oxvicdxnvpq',
                flowInterfaceNamespace: 'dyl765zhfc2hhyiqbj65lkrgoj8qzs4quka9yk695zk60wtyk2vv359mwufw4p4ygmzi36bn8k893gb0yqbajenyq7c2ntyx44fbv4244guw9uk0izjseoi86drilv4kmq6fvbljvq310unzwgl05df5fxd0u2jp',
                version: 'kdc2tjj4963efudhb3x3',
                adapterType: '1qlle7y190h4buz4ms7v5houpdzf9ak587lnsngnqkz3lfhsplml48qjr16o',
                direction: 'SENDER',
                transportProtocol: 'hop4ukuz0mx9vt97lahxebhuykckd06ons8zj8c74ldo5vmuoyblnwl85gu3',
                messageProtocol: 'cpmg30q96lxz3gqm7bkw80j95x3kh1la7i7x69cakut4lgq15ltvcqjq5d9z',
                adapterEngineName: 'ign7v3aoi6ivak19o7dhc9odi5xqh4q7v2pu3itstyoq1jen4c5cbyo5z3348cfgmel2n38fqnl9veckmoibdxuekbuhz0bvodp87wi7dqg8gabnutu6m69nwl16k7vyc68gjbwa8akiyngwbdo97bac890h1wva',
                url: 'xi39cqzqdhbq5d2ybxu4hk5dvrqnfvai8wsffpol8pdw0aqfmrqvkca3ihjtp8cijtbszsom6oemlu39d6xvjtzhwz46pa02sasaafx1oi7fceoil0quv632g96r12evyga0i4f7lq1dri74jcq0keyi50z3d5b5gzw72rcwjc2gznts7ghviz86y7qj0v2tjzghrwtxw71e8p9p9296nfmhm0b09fmy2zdtxz9b176smaq36dl99evp0ga9iryubqctbobpkyrce0g451s16mn0gcsql4gwc3qkepumee9a0h4xh0uccdg2ptcka1be',
                username: 'ys7edak5brvyygndnkqdcm9mffxapz9klss5se7nwgl0inz87jtae1fdy1nh',
                remoteHost: 'jswk1xxavgsctyym4jvge0lyzrcry9ibwkn74tzhkltb4upaz8m6xyzs97x61cyi1hqhevjx937zc4xhxglzbqbvgryrfmwkjauxw7bzghxpcjhv5lnbucfs2h8kq1ezt4sm0kq7lu5ntfm1y40e4ujd0z7sa82o',
                remotePort: 5903060810,
                directory: 'iycad1schtyfxzwf0hj5ikhxlfkfuzi8sjl9inlkctd053842y3iplc1nuw62l1a93petkrx6zovnuvy9uys6jmk3rk1lgkcaf4wqo3u0fch5c9ifiu6sn33ohoqyqgbjpkngqmribayye5d9v5ptw4kcgbrc1kh4ycadcubk8av8xfe3z520ehux3gyx68645uf78l0tch4xg39i89qducb9f4odq0w2lkgdjt0xx9fsst3wglsbuip67gwiyzgi71q4t8alugwm8hl207rjt5e4vxgbga33ktzfpmqwutmbmcdxua8vgkuzmt7dhmchygxf18s6dv8gvtb6w78re3kaa2n27h2fyv5awfxjsd9uxuhdbr50u5p6d61p96clgq5p2hb26yvbjo8jt648q8z1fuqw2qz8qdaenyz1ane1fr3inqkhyzcc6hztfbfhfa27u50l5on1zmpllje21pub61atafzskvi67gcdtloxirvcvze3k1so3mwn1w9lqavnyvrlqa1ffhexkixnqn7c85eqcq0tt24kansfqvg362wwm2tperjuvxplmjkp5z4u24byvs3m33e6p3ud82uk871n7xl1esumf9kf8esvkm9i4oztwi59uyk15blk3j3youdf3jiumaro13r2dam1fp9fhb541m9of58kydwf7hjhhey0rnjo01u5ps1bzr90u4oq94wbxhs2bfa2ukdc6wkk7u1q3dt64n66wwxqlvsz2v5a1ajz691ehmu4oj7n5yvfei8yhqgylw5qp3fmgl54egwanqct9yr8lrbh8pk03isz0zsao5jc3ic9q7jhl04shedzi6innjpr07wc924ze16u4izapbn92tijbxlqk0viyrzhbm5tpiggifkca7jzy0rbqsple1971xeoig4khk5yn7l9inmg5znw5zd4fb48oufg9jtac5794e3oqhj36x03sikrnitwoy6b81r5k3hwno00d2pn2lughpb1ma3znf7a0p2p9g6',
                fileSchema: 'i4mjg6uikdrs3ctvgdbbudcy5hub8ux6b0ixaepa3l7b8lzacxiy87qysfwcy2ump3zvtneylyiu4z70upkx1fp3vu01kg69s03c72b3uzmq1ml3jm4gjrq2fnmupdkx26herbspoz1aa2rvtvx188r9u096nnhycl2sbyjx6jbc6gh5mlnwr4wk88eph8n4p69orzap6emmvhvtwuj7erh5w9qxzylxt3nxextwtwufwoddwi4vbo2vrji90hzvjz9p7fjbdkq4d87yaedwuq9q3qdhms8wjndsgrbkhvazrubz9bmo049eryjn8k5d9ab3cpbjdhj47s05tf0nepvl6ne3h0ahn5xh6rb771zyitd7doesfadssp93fja825vsnz2bzztqjhtidktd34rxdcrolhw7uyzqccyik8bl18lh8n9rc2ny4v0zm53z8hgntb7uvjprb3xalohjyiagxcs0xpn5xm30c3uscjwhddxhu8ogxpwh3y1ia73pkej66pz0a75ugyy9sgy079i9dd0tnlqvg3j3vhhv3u7qo9u2io7pmued0dtzfoduyw0rmr04sier3gnam0jfm2rpjdwksrdspy99riej43v3fr9px6esedtai7bktfxijdvr8rt994ldlkv1dwha1wb9i0a3ms2c4ssyf8iiwzabzz8piv9l7wipjif13mlyno58nr11qhyrqcv6has8hqnmju9jo6c0foydncp5jslj3zv1avfuh2ur58gikdqum9xck7wgcmt593uw7mzw9t6rnpl1fqsu0srtwmc2bdg1vu7cda8ccovziwq4mtgfsiej13tc62cnwudlmg05s327b25o60g8ye9x2i3f4cwl0m7duoanc5musmvxdbu6d0g1wvyvc03tkj3za1lk68v35z0jrgn3o0gruhy2jo5ctaqsog5hakijs1lxvl6wwtfgazlnrl298tufvxwh61gfue54jwqdqqwk7t8vfa1nrea2k6y8my59u6s0f6po',
                proxyHost: 'tsnppektq894wbfl43nu6wkm7xx9bx4zhp2ry1yrz6qxdtur4o74qtqoeypj',
                proxyPort: 1919695839,
                destination: '4jsfrg031qviruelgzcogc2wy2w81ktrybppys4w8zq5gr365jhm3yy1t3gq6oyqjzuuhtmmq47n7milt464n9lvywb63fedm5iyfohpiyfstexngr2d5zf85nbnoig452j422kmdmt2fpiwhm6kh3057y7cfeau',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'olv90b47i96182llap9qw30pj0ctk5oguappylocaofqjb77tuksmfg4l9bvkqxqkcwmo6qy6jk1swpmwbzah2ax5zmnfcfc8pgxor3phyo3woi8oqo9f7s4mywt2fjqm0y5w9jqpvqxaqp4h4ylvyo99f5bo1lu',
                responsibleUserAccountName: 'dno9azrp8oix0x9cjae4',
                lastChangeUserAccount: 'a9yqwvwxbf8agxmvtneul',
                lastChangedAt: '2020-08-04 11:35:06',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'onjjp9os5m58vkfvhxachgaaypclfetfmjrpldzl',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'z68r8kxtt7uvdnhcd1p4cpv9g2inl4wrkwqbbeciuik1f6uu8v',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '0tx15kapk8c6eff2v3pt',
                party: 'wo75h003ktfj5kgjy9ucgdieoa71laaw8sjjpm4a3heov7mj7b9wr8lmiy5r448l89d6d2qev8m3yf2i1if3lg6kofrb8qmcesaiglb2djzpsw4dwpdzvknnaf79je7srbg17jkenil7nunvg7nr6kgsu4u0s2r2',
                component: 'ic9rf4avjfv8t2p6w2k4uv48xq0i7h45g880ingbqam59t4nn4cd0jsuuzuomja9wjuct82ov31phyqfhzvqs7acoijqn5ail0d53bu77cworhtt1au9r8gv1ro04gr1ut1tcxakubvg22j9plppmqpnani2mg50',
                name: 'inf6txupm7eywlr445vac2n9e32zz5dtb56y3ov26yp085080z0v1wkcslgv2owfawmnezupbgcttdz06ces9sda68bfbl6eadni0dwp4bhlb1savt98tphrjk7r54ei1bnv02l8vtp0x67mgtmxbq9uv6j2036b',
                flowHash: 'kr0ganqnka5xjipae651r3nzfv05pt4rgrm49gw1',
                flowParty: 'latn78ybb1e8sy5v43l6qzp2rgffgsopy8gwq2ta1jc4ilmjt4vizv1q3um348s3vt3dreyp2hbs38pa9pu5rf6eig3ouu6c8svra5hgfcpyf6qj71l9o14snlve7qvjr95ny6a426qzrl8l1gw3ald0ffaspd7l',
                flowComponent: '8ekxx18txjnqjvdp6xg69o1iv61aollrgvjsp8n7046le4qtgbd89s49lop5ynh3a1zsxfyawsp9dqee4gyxksghrt26wooh86d87e1q2lkp3oa7jcef2osj2lxtmk1mdv9hobh1ezf44j5wr81k2rnuiiqdwue0',
                flowInterfaceName: 'a5cv62fdk94lkatr15tcpabrwga2z6o4e8d9zj75oewsdjjs3t95tauanxxxm8gitc5o8ucvm09ejmz7a1m8j1j86oahs7wi6umcn97qtbutk21gzd5kbjgd6vorpwk3ms6s4jgc6kp8s74ajenhm968iti2yobr',
                flowInterfaceNamespace: '298qhy7jwa50nrfd3bvjftiuy7sx9g0tmzpmfd5se8mb7iqkqqtaehuzmrds68a0rehnlkax9x17ynqoi2tx81aey5cic8e1decq3d689lw78cur48hijkqhsbh7z2ugf2d89wv4c148x6cbxmheqtjip5mrmueu',
                version: 'hbkasxwc2txrl986wb7s',
                adapterType: 'xpd5fbwwk5pvbnzsox2tyg9age352emu1u6kntd68n73b9e6gr11swubhbqz',
                direction: 'RECEIVER',
                transportProtocol: 'm1bmpr8dp5vr8gpswmxbwu567wtemxp6ow4cekrm8im26n5tsef03h2j99ms',
                messageProtocol: '32e5hpbxpid7nrt7myxtt745ydflzd7zr802is7ujxeoqsstgq0caqjv5rri',
                adapterEngineName: '62dd0799hu2w4235hsux5kh0bdvn62yn55gzpnbfaho6ortvwobqf1pynk7i3cr3cfqsefvdn9jsj61079hgm0asddkp4xexylzyha3e4y39s8eqo4e7gb9m28yh6knqiueobj245ssijxxqsxig10b5z783s0jg',
                url: 'dwbumfivpua0d5a22j2xuyt41f9osnlqye0g1ob9k5nu1uqz4305aypdxmpmliqv6zrqosvhv6ah7uapzjqrepopm9y8eawd6jf9cqypxg6dfrgrbbdi2hyyo0wphrlnioq0tsecaq2gowptaojmeurhjwgyqxa9y2yds7omeh22w6d535o873tq1210y51k2o41cw152d3oec3mhxmfjh9t82a1ejh7v5a5ig92to8bgsyryyyp7b94ljg3tra8ckhlpmjeo3ikrrkoqiqsgpg7vraim9k4ciiyqnpi2xonzvdjjqgd0di1lqlizl62',
                username: 'u6etfoysuiydoau3ccpp34kd6lngcugbdp14y0iuilomtkmugevh49otr291',
                remoteHost: '88e9xetfevyaxi5lej5que4f0yxhiypnv837n08c095g1r0b4kdzz4pnlqjwxafi2unwpxu8uc03w17b1ewdt1zbb3nupajz30c9gi5ob7eywwkvzik06a7rwn1z0s2qriwrr8aaosb5smu8ztdow577cab072wj',
                remotePort: -9,
                directory: 'bugfmn3ehp97p9laz3r6npke4iz9h93n7k7az0a9net8sw4irieqkl6nlbwlsjdzrsz5ckh39ov8usa0c45kvfw4b49aaaq604f7ho6uwp1qsw49y2k7wsr6ofdmwebx52h2ptnz5bqmjt9kox4d846stlsonth4392t180m8g43tqbt8mblsbcrw2qsanriudcsrhmrtwndpqjfevz4av7djo0l08pju55orhnlx99lfb9gvgjghxcjn696oosttuj152bw7fjg0lt4dn0z8fu22srp4nvr15jy2iqrqw77hjcxt98bjcxtjam7ba942koxcc1t5hc35fhjd0a3ltoic5d5hvs704ccwxa5i41f5isbnqd31ggzteakzwljebxa2su0u1cn8eld3lbr17umdx7ousi1efjzhhysnq27f5pxyqme643v5njmjfm2l6lbsqzg7cp074np34z51ukp708q291tk6oyjjnn8qjyxh6tnn6eg4ol78i63ew4wq2mx3zl0z0y1990cn93mdsh7lte7rywr9qet3wr1rqu04lyf8x3plou7uoa2l4hf7ukvfgod044ixtb368vammjvjd7ks811szv502f80cy0e2klxxrg7x34lnb7xecjdrj208lhgf6k0s738n8ltihtz3zu4alsiyxr44dzfs7awnzhexuzj9x79xr3jr64mo8ze6nl2raj0262ta3t7ppsb9dil21913fbimcnz4oi7vbh3jp0uh1w5zic7vxzsqa3yzkw1s3uhcjahnp6q6ue80ndgcogbkzvj2qhlk8upi1bniz5cer4d287noozly1jxar3ppr4b4znwo2jn39knbwhk3ve5esjt675ama4j89f8oequ5b0lkdacm5pqd8qwv3m5lvpsyjmckbmaz1fo2z25fss7dzx6yhrwyvx47m2rri4r69lg5veinzcamuiyh7ykzu9tz61e52qvt4dzusgsiv125us65xh1vvhku89919p7ikh80lvhp7',
                fileSchema: 'z4z99m191nm7ihz1em71r82tilzxhw4l8u8q2mdcsg4rmyr2p0gspwd9tdn2ktivnccwo59hhj0shz21yf0plou3zl39vrdel0hicwdwyv4c1wulkjuy3zmecfg7dx60ggp8dbxkkcb8xwc5wjrfc4x4nnd28wm4p4yu8cf6ej36ddeonbv37v6wf88rrocnycazrbzt20pkb0pl3h50g3kl66quotmxxviu21erebrs5f7n15n42qdz0lgfsqlh4cz98ib7yeidl39cevb8c3akdsqitale8nx3mvg93ooczqsbhpwjluwxv7luhgp9eev8jzpimmoh41bqd8f904wsh9mbyipnyyh4fvnou132nsodgmaouposg55bdpotbh06wuwzlbrgpc5y5i4mlyoo3osow6jr7t0osg5zk3n02uwvhlt6nvl7xv4ykyniafmrgbihody1pywa9dmohkj26k2dvl071anm15wb0jq5bmk9usd6dih1wufzlde23cw1ipvlxtiqynsju92zsyhwhs4h8rmt5yv5zmrne380mz0duepi71b9aluxtky1lo4rm0dx89ip2hvu1xkob07fku6vb2ohzjm29jolieua7l4vw6bgktssdcak378irtqc99b5vcsvhx7cw1md9ce97i1oyps99elht8th1h2bjbxnmhjojnqaoflgzll76hiu9u8uo2w8mnrj9kehn7mrt0rw9x7dhs23ydtjc8ypdum85rd2d88rqk773g11euf9e4ezmcttub5yhfypdpf2apmeeu6qzlqoaynt7077p6omo7blvv6pp8jfspclj5sst1l97fthar83mz8yvxraluxair6aeg2n6z7neyl5db1z4vczfdds3j02g9wgjcfd1h8nm7nzcfo881erfnp46z29xy46rwa72u1jf51uigcf1i796gwalp535hitxltb15klci85s1q6xit57zxvs8fnw9s53kas9mv9nepg366j3jrwksngr255fams',
                proxyHost: 'r942i1b6xc2cv4k5znsh9xtfrm5d2yiz8c00ks40xfdwugi1wjtn8xl6urzq',
                proxyPort: 6918071064,
                destination: '3dd20pd2g9ptonw4q99ezn4qgq61jidpzupn56qahluww70hpu2re3neprfjutsatlmcqub36wk7uv9t6x31mms9pg6v32jezb1ckyjeavdqve16irqlagv278ot6726moqgqjy4abfqh4hyiwyex96pqxh1d2ow',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'io58b99wyx72l44w22mhqn14jlo58dypil26urdeqbbjpd4y8iyglf5hprlt10k873l1rc6b7lokvlmzy0xcr7r6w10vri8hm3slmvgzmnvoaa22oqxskppwteqd9bmrsdvlihxkwib96ekxlrxh28dqtjsznbuv',
                responsibleUserAccountName: 'rqn7kmf26dnc9ir1mp8p',
                lastChangeUserAccount: 'ho6nqpl78bvpz9rlxc5w',
                lastChangedAt: '2020-08-03 17:03:17',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'fvhs08n7dfdm9mmo8swkvxuia2ytfzjw5fvydxog',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'dbhs5o3cqc3cpyo9o5vnuv93znx8wctjfgrh2csbesawk3uwj4',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'q9qaxeakta2tk3hrq73q',
                party: '8vvt7srg7k38s7qnh5b3y1g5572fa1oy2nkj35350zthaibaara8t5tizojyh6lbgpw7nnm0gmm1gpve5fxsq0zdogo8spe7huz85i73ggzcmyc1d2cxvl4mf9llyjdkcveiklr3ctljps7je30r0q91n32fry9a',
                component: 'szrslejx13uwwp9pfmmvs4v87u8ev86x19ox7sch4fjxwvi1nklcni1k7heykn8f47l6eaahn4pu6dvcr76sbintfh9pormk5n7i194pkrt2prpapgek4y8eexno0gcf9zrx5g3ql70piwemo5nu7eyi0y4egs82',
                name: 'q86901hrvy1ld66v56vkki7ut0cobj8882ur0y1gbjgg7n1uctb7nln5t8xfbqlt6tlpg634obfp1eorcshgv0rj09bd36n04gz99qcfh845e0vjn66q3z2dzt8f0ay4a59ztldy3zu7derqlxdl28kgij59zgke',
                flowHash: '7avd6vz1rgna8d7xutcvf1vyahojwe51db78hyjv',
                flowParty: '2m1zcphgk7prvyolqzk5tmbz4a6jrp4lhs1rzmoat9nywkx1fvgsh59erxtz4maf5p8gxxgsmlist7rrwuxj171p1a5a6387rfpaoz6mziesyla78ln98hocvcmkkqbonq7bejng9y5qzk9w9owfhmbwkn17nusp',
                flowComponent: 'mvecdz6guixf409g7x74n9ca2utp3mu0dwk5f7o04gqt52f0vgq6v8ttsthoqtcbbi2l0a2xoquptq7bmwyeiqw73czdf8vpy0c832gp417btev7d2ux6464csrgh5hwx2xi1tg7ayw63ppej5d4i69yvwslxjtu',
                flowInterfaceName: 'zc3de6ascmrccj104qp9mqaj3vatac8ttj084olf56bcfjksko7l03ydsz7o5mck32j7wame40bji4umlr00hy0w72d35zpgr3jdu6bocxntvdf15twnu35gpyajeaj5m5dzkazrqzat3f7z3uep9bfpfsqy02q2',
                flowInterfaceNamespace: 'f12psgub08tnkxxfz4sizvggldn7mz9lnr4l5dq5x0cxrclychasz6evl4ki2by8zu7cip2caqazrlt4f3snaaa3qz8fqzr3vei5ksb6fg6a0ff09n3fl87acagzvzxkekgl2jbmjfh6e49fgdtck27eun8l6q7k',
                version: 'zymzr3hse2t3l20pczn7',
                adapterType: '7utpp5d3bfunyfnr05zsqn73g838kob933ia7z1y3em0sq73thj4fhmevgwk',
                direction: 'SENDER',
                transportProtocol: 'auiw95k5w7nc7asweb74r1yoc7z466j2niihu0qcdt9tnwlh1u4pvd8b7n7p',
                messageProtocol: 'fkk9pu966xhqod7ysk8aafe1e9wxzdk1m77yz47k192o9y0tu5af2kh59utw',
                adapterEngineName: 'hgaho901s05od3ouz2441frq52oebarmzvk49ofl61ul5z8o4x7r7wiiswr95omjne48iq4drivd8ub2yn5mvdv1mhq7vb945bdnlnfclmw7s8pgts0ea3zcsitomo3mdbwh3csco8up4pfjb6a8wpseq3597ylb',
                url: 'w3rnkbinjb12na34zgo0z19b82hvatng23prtuh1yvjnfwqun86khu5be2z6i3965vq9wdly6ug061m4dy8esgsa8p9ice3uxk64r4rmwgh7ts87ia3cheyvdozxfqo5vhpfn9y85or7g71x3giblsdyk4ll6mrj5m9q39454s6a0xp3q88672wziimw9lb82phz8vrxaey86tevc1pp98qvn92jf6q3llznktywr8220nkfmipba3y3kkg8g92h0tw58ogxte9j57y78ewi1bga8l6w188b2t2wthx92jjrcwwyaklvz4nrs0xgklhr',
                username: 'efaa3dayg9zutgtgb4o8h9gwq9swfnu8pb0h5c10iq3egt52kynj7hpqzue2',
                remoteHost: 'g3aaeti2iefs0xdol41at2o6xcd31opk1w1y7bqiczko2lj96j2l0wqv1e24khz9r63wr78hsg29wa2y0g755fhez3w090uvpg32fkgk2w3ao3po1780uce1hqums4midwvmlz5n2f3xzge1fji3n8sr6w0j4mwy',
                remotePort: 4413481972,
                directory: '2daglh9fxki1qgz46d7vzhh22txtw2c9ohgd1itzcqtc2ebiufc5cu4zpzkb564j1cdiuumq457xcev6y70hunhssvenvqss5xxw4z339pucn27q47lvgi444tl8pbgrt5l6bfpa6b83ylthukpukwgeoizntefgkn7un8oc96z6c6bu6h0t10uw9hp55hqm8h4nnjuboy01dka869hnltkui27bxybntq4td448oljq2l9ffql7k5qeek0w449bjx4qis64lig05er6spnwaxzf2qieqapuq96wqzfl4yndi631ipzsfo3ldga64fu4gxf5s9c5098mui0dlmeqf1dzjchjxm7xgkq40loc008wsxq7l6gazea2axd3bxtgt9xw4g4hai1s2itg8e9ouu8xo91ig0ipxvs5ln8y1fyehxl3bi8p05hbk9mxv2t39cflzx5y27u0x81cfi46gmwly50mzjj9rr8wasx4ga73lat9qi3xlsu8ktbc7mgliwn3jsacg7hduhdaexv1pwsctvkub2fvjjht7z604u4de4xhxlcmsjm74xof7ahmgz4lwru2j8engzu3swrw6s91epu5qy1mgn3jc7fo79be6u2hy4wl9ikmgihreowqlshd4btxpk063si8pi950vjvh0vvbgfm3051277za9qabnwr9xscex40yer96sbwnit29p8zd6d654a27pqt71n2np63n4tawbkoapq2nwqhmvgy6zl35y2h5rkqpu88ndbz1eqlgctprqw79zpspxsbyrxpac2v3u91wpqwr7q1nb06foti8izk4op0tb1hbcaaybda4q76aau4y49j57b61sx1l7o2pr1tygqkxhfgiy55ciqyja9zw1b8u8kzx1om3cqxrojg7meajlaj3hbed14aupjdz4ab7ujocpvn1afsreb3ru3rjeps66xucuz6jy8wms3rqwkaz3mbymp0tybq2vlfs4efh8fv8btwo85u52esejarmeqedgti',
                fileSchema: 'rdrr65p00igw7gd9uhqcnl2jngx2bn33ekiegdb24jd4b4yqasay78wsam8ko189mh0w5s9ewzvtpev8njos6v9ey3oj91i7tuhsr7sfgy9aso56zdbmejlyhzmq7p78iq4dl7xw0c3mq1l0h3iljz235g2znwbjx9ftf34to2car3z13ins4hqskbsha5qfcja6u3dhycoam5py4pmc61vqxv659eg383zrr9sua7pz51i1qpn5jg19xjb4vp7p23mlubi67fb3tzj8v72n58zgv0szb8b0xjsddxvfat48n5scsidry7uaan60dr4oq92w10yak4fzmeloa86sdbqcccyojn1i749g7ecfo6gnrelp4xhkr6i8e0amsnfb22vvym5yk8t4npoyxbhx97qogjemot0ob7qo7vbxu7heykrnjlxufmpk319tzd93zs3bxijnihbr3qavpv1i2ecv29puhidmudq7mk40egynctftoyaj982yfr73gbqfwh5hyuxbysmh2ungsrao6wenq6ovfgs2pbqg1eygtg49cfgazmf2kkv04so7lw82fmsfqilf4m1mginxqomszav9y8gkzlo3mvkw2k74imix6yzqat7kvu3yjt0ocevxz4whrqdjcwjopu3e1qsup1tt5e7p7z9vx6f7dq3sokbm2t9nhhxt19g4xqpbepkdsf7c3nfoslvms8e3boqksym3fg772j38n2ep55018f6vp3m5o733bkh1ey1esy6bcnoozseyu6byuac78qkbhpddr9t0w6cp3hh6x1ecuqao4ig8cd24ebif6p5sm0qqqhqdckg5oz01pi9816i6yvirtbholvtzdyw3a8efhh1eccdst86k4qmnraqbfcgmcqxqcqnavseffpbrlv49se479q8hr8jseqkbwdrh6urpipqoz80pb9tmcsqmfuba6s20zhymb3l2lersk7shq5nqzzfnhn6utg1bdqi9grvla91vvhqzjd5jaqe9n2wz',
                proxyHost: '0wlqrmh42fcq4mh8reoim9l4uqljsahgjgq4nq5gr1z9vn1zl57g11tmwgyg',
                proxyPort: -9,
                destination: 'qtso6y3x3299p9aj5bqqx0k2cagtwlm0r16mz150eh6ia138vy1xbqga1ybjklp09wiybbul2pojsp362sf0u4o9d3hae1wbhbaj1g34m5o9hai300ab69ukum3szzkge926k80k29a7vk3rde4egn51yimyj0uk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'crxelo6ovymsyjdgxgmpe6tplzcxxroth6fom7agsraioda9no48y1bawse9ssgnbyvzgxvk2f156qwmv1tvyj53zzeiczz05pod44vj5f2rh55ihzd1lnvch5bdi0x48dzozhzt22yl3l06xech142urfk2yz87',
                responsibleUserAccountName: 'c7fiwf88nb17k9p5rxtt',
                lastChangeUserAccount: 'sztdxa8ftr5gj3xw6lhz',
                lastChangedAt: '2020-08-03 22:29:14',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'lpoykkx42sftfley4m1c348n0hkhtca471c0t8q1',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: '318i2ixvs8xeheq84d5bmc15ui4je923khqh0pi80vkgunad2a',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'pueidke2dnr65mbecg4p',
                party: '855ymwytntw3a48whzdbdbkuhqk58zbct4xg146z29u7m4nrz4roie46zng6djmg6ivw3t2im4nwfy1z966p344b0hebi5lueoj5iwt0vn0z946zk6yulh1hnfgvfog8jak7o6q3o9wenjxvkejmkj79r4nvws19',
                component: 't2t8b3hcilw0y9bdyivoa7w4sq78dkd6vuumjd9ky2ffcvvvkyzi72a1vzpxrwj8fv4r6tseea8wtrlaz6usgik045gkwrf3v2kc7svcksm1fny4tzxgnte8pdb4mz5a9av9y60vrl7bsygq0c2b2q83af941pw1',
                name: 'gsl57tj5phh69lbve6gds3vubp9xjipo1os3kme1x30twshlhuitpfr9aw0igpuamfhyok1ea2xr3arqv0ag8ern325tan37qhdm7m2cm9cfbti9gcegbd2uyazcubw1vflbmc7i978f1qfi1ujpojcthdkkpqv1',
                flowHash: 'pridwatmwe0k71hob5biqut51xvymvr4v3mpuxgt',
                flowParty: 'la9r03qw0eblq0uxh042dvrhg8dvq2htmoezcpdd3733ov9pu7eg3mqyavtxfhv7e8efj8w8dtelq1cgkd5fq3rr6tmpndi55n4wjjvn4zmwpjvpuq5pxbyrduc6aftrkgoud0k38glpuvvx38lrbqywuo3iq3kl',
                flowComponent: '2nj71apz4wezr0czl6693itye3bkgqde4rt90y98falik1fizyp86ky09fton9at7eh9z3js0bnh0pgo5rynqx9wa3ftmf8k57myip0p6cw77gu8f5n46j5ks6sghk6qvmqlwb7xw82301gneju0g1mvcaf5dag2',
                flowInterfaceName: '5p00t1g34fqt1gdaiz8d726fa2q9nzwjqetqrsmqvrpia32bgvgxqfqgkdin4ibegw4zf0iyy2ji3qsjczrin8ddw2wkbg67dqfmj0nf9ppju02stnzfykaw4k2qe6hq9qru00q0d8tac9cp1nv8nuh4xr30p7pe',
                flowInterfaceNamespace: '5c45ojladv1you6xur4n93x25rigzmx83h5w9obxjclcpceo5nitfwx6x62ss1ufwqyof6sw98g08cf6onvwz7pkr439j0eiup3t5w0jojba2ts3fglqcc6ihdc62ye3tvv2g6ydicts47m4h2vzwx5g673w7axz',
                version: '2s6y08l0bwihmrm2vev9',
                adapterType: 'czmbj9bdh7ln1ykyu6lk9jj4cfwp9xwt3gx1zf9vv4hs1vvrm476miw7o5sw',
                direction: 'XXXX',
                transportProtocol: '6ot5ifec9dv1flcw2rovp691dgdp8yxzgyhbxj7fl7qvgc8cwyyu2pqx9wkw',
                messageProtocol: 'e5qk3aerhjiglgyet816danvohydrbgry2dmhciyxz156we6g6o3ssb4tmth',
                adapterEngineName: 'rarpd4hh0sbwz22t5pki5xd0y273kjtn4lduthjvfi21o95602u0qctxe88serlt1usnys71dfqvgkduq1ix2kslezj8hgzzbcoxn4jkobt0n4qsgvhwt0yss9n1qwirdij8g8us7o436khwamg0cjukihk3cvts',
                url: 'gvbh9fhoug327vae66u0o3s57piczb0zin995r8yno7py33cnz8lljcstmv7qapq9q2zzvpek1qrlayt0les3g6sfoaw1s7j5b2sik2dlnx4kyplxcw0ffbobdwsyy2qbn6fpwpwd2mad19k77lf4nlcxgdw334u7mnju4zdpiba7rbtnadq52sj05d0vl9pubyfbpso3ravmooywbe1oc06uwp5rvnn0qra7lagsmmcorn4otypackkyzdnfp98w2wkdtb91yi57me03cwh3pn7xi7nqjkej8z3m4sww2vgzde2c9v4ba2ixcride3a',
                username: 'k3xg58tm99gbm8435hfu0fugd8r20yzuj74gsr0782nrsb2tue7qsnybszul',
                remoteHost: '996o7yq8bf0vc4qplkdoh0cmq87qg0n3ndc0v5tqdtw5yc3a5tcdw7l9j8vbszv78dtk6b99unwshrtc3hrefb69ajfgu7we7kp4bslw2qgwsq3kvzocj6sc285qnxlx223d4ylz6udpxtpvpvl0o64pijrai1ex',
                remotePort: 8473715575,
                directory: '2rfxkc5778nl5iqfyas0aezvezosj4tz1xs4xn0w7pkap642noyjyaouk9f5rpcgw2ky70dcgqq91pzr1jxyrjhrx8kdqvrcirpoud2ufqt477dyhi08ovl0ovwyw6x3sf35ca11av9d60cwr8jgzisqdufnr1opsoe9eoxtzim6k6n0u507b10bwgwhs449n7devemg7i46xtuxzil4gr9yoaysycwz3zvxrd7svnxhia3wh351jb9jdr5qaam2r1544h766s3pqmwp8svh0cygdkqiqpljvf2mjyt6cxm1t0dnop31r323qbhx1x42ux6cgh0oaricak8xtgbibo0hc2bpozlaupa0e42d8igsl6jv0c1heoike8fow8e0g4ng2ksgakin1g9wa645b3r2i69fpmyqyepq4aqop5kl79fcf4z4gkq37ijuixi2x7u2idgr6l8fyzrfgysyrj5qa34tm0n25ga11dmjfywtut2ltq6shhp76dqtri89d8vjx484use1mealfrm3josnb59wfwqean2beoqgdjr5m0z4sjsfx7vian0e0wuhkdgupewasil6bhjym8ow7rcrfopszivucw5te5crhhiaf9w1qhr6ctvd31cezg7np1882wr2p7l858cjr1d265sgpzxhy6b7vuz1yoywg79alilk48rha46jdn6nfjj5v4r7ldibv5kdwkze35n0hm27z0dtxzg2r7j8ejo8mg1t2eaom9rjk07fahlit6fanm06ev16l8aiztfg0seduhe3405rqphu36q4c8rm2y6wy0el2e08i5th1ciysu9qfdqoh1cwkvtpsms87rtflqx2y0wfpoevv4r79my7myug1gb405mpc45lk7v2l3b4c6v0vsip5tar878rqud91aifmpyp555urlhw3vy5q969sc2s7dqh7wa4e4iv59go9qjr6b8gunl6ncs72vxwguewi4e2e4e56q993bcicx44qj5g4r5dor19stricoie',
                fileSchema: 'cb217vivhhku2tyz8ufzgflg797zgtxf37gaf9qz8sztf0wum53urbkrofnff02wv0gn2tt2xqtuq18wy9ku0mhvmrlbk2y8nxmf0j4valxlfrlu6i6pwg0hgkorrg7jimqbofs0jyd0svaeoqhxoxhmahe2gxywtdhginzj8yxcd3e603cac5wn0ecu85av64ply66zo4kw1stb8o9keqmfqi57beyqd3hcy09p3m33iokamibwj7nhayipnmp1gicg09m42erf93u9pvb6m15vy7oezp7nvit6zbxhuusxnanlhpyrnj1qa0ack7cn78ey1fzx0cpiu826ehxrtkwxfw46335q08jfl5nnj4ng32jnz4k3jzq3b888pc6wu2yd5eg1uwmvv3li5l14k4ru8e2824d04ol8vaxjr5aa7x9ugkey23hunmbo3uyrz5v81xnkxzrlctmrokhvdrqxi4m0o2ajxujnegaiq6hl3v4633udtjhqa4x2boiwdkryt4dpiz91v3a88hwuzzjivzughrufze62817l9gmfcvd9m4uh0jk6b7b4fkdtwagdp6sxf0yxyw7ckh2iule3j5b9spgvxn24nbyz6745wszms2hdj6z84xdwvkkxo7w3yt79qmomt9uhp7wxec39gi90wge3qi5m9o4biougyiez0dg7cspe5svkay6kso37pnqj3vxhutdfhdlopexac01mord2op9zp7hf1yupu5vx9ilc11ryjufkwdxynpc02if9cpa0fjrks8s3cnzdcwl9zxzpqrm2rsau9air4yptvq28q2htdfkb7k0c98909vlp9k39laai7jivijmb6mj8sas0z41gwhog0exggnlqfg2zqfkjz8pr8s85gb1zabcsge7dcubla1e35klwcz969vl3nhgoj3n8u04qkcfwtdmouuqw2nihvwhztgprcgai1tc90dldt6g5baykwve806iqrfm158q2e0expnb5sjbsk8ao4xcpp3r9',
                proxyHost: 'a8z242yyrw0j7rih4d6c5zu3damf5j3q7ey9qni9cz4nvp40k4dtycwhmtue',
                proxyPort: 6399892583,
                destination: 'xbys9ppskae9mcr4zo9hni50p9dr8gdiblt6o5jc024m7nkb6wyej7ooqww6rywbcntb6i36ek6andeqzcyoxce7i3ampqixssr1e28ej2q6aztbfqncb9cmzi9xw3ate13effpsvq3u5ayxl4odf8ej3m3lllj7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'y5dxf6y3ejk89dqbztdl7olj2qxcmy1wjwnms9084mi20khjg4lbbi00jj0yidwqh6wsywvf1pj5pe2psy7t1rp2l8pshzixhtnm35d5r8jp520e1kzg5o8a74coztqu7t7sa8d0c7oade17uirieol7nhnxqoa1',
                responsibleUserAccountName: 'g26tr3lswp9x02h35veu',
                lastChangeUserAccount: 'kz3aar1wnoei9f8yqxbw',
                lastChangedAt: '2020-08-04 13:57:27',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: '4xg8xuqjf2xftdevue8sw84dlhvxday67fvpuss4',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'gs9lxopcicxi88pivqsdhsxrmcrptnmw2sd3trg1rcddku7wa8',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '1t0lkihvbtkfvjyn5588',
                party: 'y5qy8y3cvxmgbomvwj2rr3n5nyzf5lvvhshpawl43xg4oby2b4rekqx05pjj98dfuirmmoh4j4e4aao97r31i7tks1wwqwgp0noelejxu3dwnvmq8sbeuk80i9ki4hdag7ox68ib8ezvyl7z5a7p15fgbci23xec',
                component: 'hg08uooun6zv5x3oywitpc1dclufm3iwqhvscdcv9gowib55qyixz7ecng33zrt81mmet87nu2urmsq7tnggq9qk0xgkstrhrqfncnvtyc4nk5nnf9abb2aj1g2lxip72hbnxh2cyq51ziphhlp62hd7wvi54nwv',
                name: 'exsylca1xodkujo8rvejop23stqy6w7p27p77g8cvmfpr0y3x862zsipi7r5dzbh8019shu5cmhlqb0wnd88h4fz4omx42wqnu6i0weqbx04gnz44oj34aqg3718ikakfjfbosdw44kqbwlttui2zmho211ar4dk',
                flowHash: 'zr5bl8hwh3xwmziku62x9krh4me7e9v7z0mvx9fy',
                flowParty: '1nlx2m99bu7cwg7uqcx2yibe5peonm4rjsrgebpegehhax9cftmn0qzsidys4w0buzzude3hjsr5z7ml4s6ixqf4rsyk37hy7arddtwmvsmtkqngyp18m1lvne2lqy7vn8s91khkzpc05o8vq2gb8g7bq0tbljgp',
                flowComponent: 'wgqrmq8uxp0ww3yoxj2z8shtfvxxn2kumnoj6l91b82tonh18s1umlm8aduy2efj921w96jwzzjuwdp3bas7i52bcc4g7g2dvf37mbkxyubqyrgg4t55ea1lbw1py9cqvt91ok2l2wxuyi3q6fcufxiulfr68q3u',
                flowInterfaceName: '4ux096w06w3w3844yg8poquytlglu4t5l3hmsvtzj7kedzt5g9i3c212ccrpeqsbwtn43p20u5ql6cec7tcwsuxwsej3x07z9oktwghw71gx8p0td6cpgaks20fukjl2at5gdotcqwm1cunk0nkaey5x5ac2eh2p',
                flowInterfaceNamespace: 'fjmqhhwsnzom95lq3quru9gou6q09d50qcwp87mt28q4d3c7tlqvgfyb2w6s2z69hegi4j4o1cuwovfjuwcxbyz2xr5xq4mcaodopu5zrbkomey74iyejugqchh2qx04ck31lcp3dc944u8qb4svzftql4m840xv',
                version: 'fmyzwiwxisgm1z59920l',
                adapterType: '982fvmf92gug7crrklvixqg33evy814p57cmhw897hs9t92620ibcec2j5zp',
                direction: 'SENDER',
                transportProtocol: '98e610bsjetfixgp8t8zidvhf771u5tft2xbe6cww87b79an2wslel0nmmg0',
                messageProtocol: 'zs2c0yuvkhg62mji7vq2iz8utkq84ev9uefi13wo7gvy4qjbljve0safz87v',
                adapterEngineName: 'pfdy50ucnt7lojpb523nafftgfk89g57ibhlf8hrzyu9sfrue2vcmtvw63807k1i0cc6hbke1ebrk2edhxt6zp1b4g171w1wlb377u0mc191nt62i7pbic4a1821b4cj4o97cj3bpazmk6pnegvj6dp5wgfvqdb6',
                url: 'c2i09w5g48zenc3561ldie1wsj6nczfi0kffdu1c0s8jmedzhaca854oopywvza6f5khh80pkgq2xj7urdpxjkc9q0iv0ehnhaj5n4gw1adx8ran415uk75zybwyvovojuxm6e00oim9a3cx05hhde4ho0y158vxzwj2vr8yr5qjjvtawsefvgjcaoazgjoiww2jaq9xasyg159ewyyutyvwn6x8c2c0jr98rd0vyrg739j9u0rmuz12cni9ajz9fydzkbq6fu7aat5jmrrxixhojzfpf7muenpdzg528xgszmdzcvwu80amgk033x1r',
                username: 'u8m14x98hfp56o0e46bg6lcwx04fphxmqqfkdrvjr76egnbu3ozctc0r1776',
                remoteHost: '87lff1cy0qhmkrd9cgf973jdpzl55d0b6p16x0z4hnp8rw8s4ci7x9a9rqgvn1ojc05l56aqsypkapaeq0vs1h0oiuosislauy30hs9e8svev0hxrtwpv74lr7b7ion00ywe8iwhxcgglpazjt8qayvce3q1xso3',
                remotePort: 7782371013,
                directory: 'afwrpt33clf2pmv58bw26ggrl46wqspa6sqcmtotlvzn1i1z271s98z846vu5aq0gk4i3w8k7ock4uuc36vn9r79fthue6il7po2xap9tqdez9bxjz8qi9xgldwlcmhbn9accw0qr6qn6xs6pt0glxx58pc7zww3gj6u0c86couge3xy8vmpruwwp92e68u9n8t05lc4z8mtb5hof24n85kbsv7ty90dp7hrjiv0gncwr4ch3j7prcsg6cf5xo69dc092gjghupp1iyh2lu03i01nljzst68fwj1nr2okm50qbdsansyv90ijqizz6btc32ff3q8xzbipo93o1hnvxqdljccalgy2hdtf4lpkb3behkznt5ttie3b6194if9lh41klml4m43bkrelcfujactiveo99s5kwf8mzwupw9onl2ft27e7v8htb9m851jxphg5cj5cunha19hgbmls20nj82fh3qo86bzdipd9w80hrmzngl4ih2o43i5obag1l906fhpdyutlfd0tupd6ibp05r2pfe45s9g8b6im1la7ktwj3i3hb2yk5sctazgaxnb16oe6jajwvirdznnap62u3cxkohp46nkqvxswln6p0hjm6y05oldurl92q8otfben5e3ictbs8rw0th5b4f1dcdq4l156msc15vbycap477dfh6clxrejxetglgz9k4xtfdmma6ziddvzt2848vm72xl6nq0mwax2j3trj52a0hx3gyvwd9thj0bqogxp42kyo9jeae5c24wyye7zr80nzhjwnfj7rxczszjx6daax4nwhoj6a01ryn6yoawqua3oecqgh2aksek53n8ukjhl93yb7klxxfbhc59pdveew6rd6vuxzn7p26hs0bq9vos265kxie0bd6o7q7zx46gnszdh3c6nlx5v393x6nuowja9bbfs5xzm6x80uwmw462pmo13e8filesib1royltbsg94esdyx57477vy43h09x19yproeifi1m2wmx0',
                fileSchema: '8yzw58p9bg3cx7p99injdkxgpu751x24k3d8ze85oxp1ed6xr31vjpas0au6eaumd1c5wpm2txcuyzm9694foukg50n1aay4f1slaehvxymij7832a0o9p75lj2avxay4lu69f8f4nmp7raejcl1wv43f84s611m0p7xjoqsztbv81drg4vwh453hdl6xnb3lymk6o6nzk0cawc7o4x6br17f07p73z2uennelz6qn1qlgktzm3t458zw3y24whl89hagxxnuj7a46v2pbd2vdjc4j33j41jhsqvun4b7miveo6gaoizmpyjjzjn8cgl2b4us2h9lv457yukoocukqyua7vmaagpaptxvwxn4wf5g7x4b7an0qi63biloypn09n34e29nv40nmbx5x8oazh6fch4fpims30tr4mwxmd5fqhyx4okl42hz8u983w277zf5c11ppvb86cdxm06q5s0ucyy7x1per05kxx282rjl7b17q1hq99oc9i8o0oeu8xaxfyq4i43uq89l0xzwvqisqbewhf7ao2zotli6ck52wxacjd5ke7d5dm28iefis3vi2gvhnrxi506a6h0jzo135089ejyz5ljorvpl3rm9ca44vg67z6gptl9gwdn2tbntocgjzbhj2a7v0m7g07pgpa27uil3a051i58b5obfnb4901nr6y2wnvu4hvh5c6wba5iam47v7g1k9ljqrf6z71bpgyzz9x29v659zaizg2blruzix96ulkb52l7449fjhltimlklfkhyfpwnlqh1fmnzzh26narkm0ope8fpinui47f5igxl445763delhm96pavdwgz7p334nqy6g9ohdd9h5nq281yiba7esufb79vyybv0jcp3xitc8z0g35vt968mcbpbqng16wgxireh3cagci1qa2g4sol0ypodli0mr4bbgnjnji67d9ndk3emdov4eeww7zj3g49vsm4dcbb75s9ga9wy5ndmkfe7bv1zaghwmdfvzas8c3',
                proxyHost: 'znnp2twc3ckxu6bxvvec6n2r7ux94n2sn4f28cj8w12pr4p06kin3hvdiy7h',
                proxyPort: 3247887487,
                destination: '1bo1bjakcwyygt8ryby3vphph2bkaajzchh72ktr06oss2ulov3c0eov70gp7wqwnhqp2g9eantx2s0y7c2b7rh02tqtjyq663vkdc5xgelxrjr69bmwgkhknxbd42ompiztfplsosh72oll4wp3bivtlso9hl9j',
                adapterStatus: 'XXXX',
                softwareComponentName: '1mzw241kxqf14l85ln52csiujr9chqikqscn1zrb2lqf6z50vm46up4gwjw2hii94n10a5bcd8r67xbvczscd8d6xyhg7f7cwph4tku1thgmclddoh017sebpqp3qj6e0hltscquzcm4kyc9f2u0mgb7xv1syn65',
                responsibleUserAccountName: 'x79zdrgtel7ix5iw1ajg',
                lastChangeUserAccount: 'o05rzzu8vysd6m85dj67',
                lastChangedAt: '2020-08-04 07:02:47',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'nymbj5t7oggq9zi18wmj9m9e06cha4lpfd4tfh16',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'acy2sfitjs5uhq0aderlj3cm7wvgh2ryb069pmsif8m7ntpxrd',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'hawg6hqhz4peoo10uksn',
                party: '0h6a13im3s5e91z9a5h6waf57qjotbrck12oh4fvqyv4gmy423o2tba5tdldovb1p3t5yul5n95saqhylzf80zbnt0tltv9fz4ixszhuhpe53q1mc63ahwigpt10gnaufjr4lfexr9sgstc88fkyngrpvw0s9jdc',
                component: 'jeakcjcn7z262hgh1m5my0qwt59n6nujfu3dldcgdv0fbyeyhv8yd7ua5i3xrx16ra69retraz16ibmlqabsx93k0my4jz5xukryijj7ob52lpp6e26e93srhcsolobb8i6sypx4swmc5cdsb7z1kc7a8kaglp37',
                name: 'v6vn8b9xtork6pczwoxvk464xmbqyyyz452p6v15qiy1a35cwjc3nixjv265y60ifehm2zoa037q1ys7v27srmwsu2xwdjqx94v6sg6g86h143z1w5pke34jcaemctnzbw27ncannuhbiag45jpiaxppp7hcweiu',
                flowHash: 'fwd3ynvgmy98s3cuoicogh10eacnk3hixuojd66r',
                flowParty: 'fi3v1o7xmze5hf509wko8hp7b9nofqalf8hg0ixelp1nz5gojdf636o1xjaqn3m7d3c2ct0aiqjx20h9j884yfaaclgztf0yi9uvlvpgke351prkxc43uayftocsflv4warb6tv7ob628wmnswj5tiy1gsww008z',
                flowComponent: '6zshz31umaya7cv9ndy980w2erxmnluq0ouw9oprzw5mcwsuxqkx5mv4nhlohssnlh1wlxnsbjzjdv2vgleqzdi6wmqoy2qdjtom2wf91z29oglqhz4ftfi0nzu83dj6qaps11rke4kbrpv4ys9q2hwypttqnd29',
                flowInterfaceName: 'njmnyv8n381cth7volhkqb6mdab2iw0xbad1qpts6hudgwgivksa5dc7r7yfbjgemo8cn76iz1ec83xeeo1t77g8eir4mj0v51j7e28y7xvslo44dqp0g0kj0wn41r9hjc54w5cgif48qioci6y0mmywvpiit7ay',
                flowInterfaceNamespace: '2bzhql87x3ir20gkxx5vpfa67nopykw8row8qetk5v18jhjae21oxt4e7mqceap9liziuzh4qcm03f7i0hpu0k3lhgjj562evygbgw75sae7a7m3je7r975eyb9xo47iz3taeg5dauoin60ctb45sq5t59bkimgc',
                version: 'obf5lo68j73vqyydbtqv',
                adapterType: 'zuzli5njdny1v3ewqd3hrbgua5k44h1pipy3sm8tjg74vsuu7ez3q4o4vbw3',
                direction: 'RECEIVER',
                transportProtocol: 'fruaetbys6lbenhv5y9q2nnro1nvab961vinaffsyun7f0kjbbymiihdl7jb',
                messageProtocol: 'w96zhqfghfi24ye0nf4k89l6utuvg4npg2ok69qrso2xm92an8ambgssfesf',
                adapterEngineName: '6zr848jc2ckx92clnrkhdjfd0yv0v26930je5t7eujf24sgirx0bb34s7uaqzgxv4ee74usoyi10ivraprajddpz8fesck37j7cp6z5dl7x4fvstz27h25mmbngdcqkloz2r7a58q7zg2rblxxjl3d3ihgz9g0sv',
                url: 'u2idsddmwirabd9qnrog3tes4ls6sbclz2684ar01xq12jnb0unlhcmo7u5nsxwm9rnpa2xjuxrx3u7joaom6votg1k380cj0jyn0rz076as9dffe1c8iu4irjb5nvmxo12gha38gr2ynqrxtogx26sji3flqhp9v0f58s9w4i9jx4zvibhopj579jsi1h0nppxx004qv4nqpz961ede8edhw5l692ioyy4cq1izgsfcquusgoc56pitt78owtgd0kc58mggddxc1gtp6iwj7bas84420fy33e8uh1h8zmcy7vrrqhbql87d06erm57f',
                username: '3q4jz4k6d97x02qk109d2pq43015m0152piydqks51adba84cib3geb39nnh',
                remoteHost: 'wrtvsg6sqlpydy9y8eg4ifh20fl3xjavftw36690ah218qj10qqg1doqget2ts4o9l0ohtfl90x132cbhqr3fetmaaoyexrnubadqyhtchb6e3fvul61yblikrww5apcepux8wrmqt85qf2ci102oi7hmhmo3orm',
                remotePort: 2821336877,
                directory: '9lq5qxymbfyj58ua0765mp75wy0dqmmoymteoy3wo45nkn5ricmhk4nlxomvah4ocmf5jw6p7ift1dps9juxyt78mnorlg97mpux8dl6my1j6i9a40w38lgvo9qpirhjyktqn5svkf784ppwve7tleilcekmr9zy4db6iuj8csh3hjlpfirbaozahqgygu9ndch7duj9kkague98nsjy5ylx06b49h39gewx0x5mucmqvi40j6n4rcbrr38ckznluurr0khnzup5nt1imh5vunzybgix6wb2460t4cvo7uu5jznr3szzbivwzr1xeu4h9oq7hrotk2dllou0aakxv9358mfhccr4rko64k0wd87b95sg4kkfnk312nejroeqfrqmjsy7yqa3w6inz9fbuan1u4y2hnl1z409hsu256fbq9oatfdffwr1cuix08020r1mjspv94rx95q38ya83w2gc94noo5agam1la6pm1zu6zdkfg1qa9eb97efloenjuujtws267tc3zfbv8xc5qkn059cjrjmrb4fp8sega7xmyfx48yvr8h6ieh0jz4wn2ntozsn4mmmol5m4ovzglppkqx6bvhx6qnypizg3rlxnj9ennd9sgraa5wau078hpbm75euaie4aq2kzue3ehzotor5l9bbresk73yho9105murnvskzkde51b64fam7d5zx3wc2dl3oqylqudclrz0imfudjbr3ye8ggc0e3vrzamyg54aqvv4z3l8pjblrvoyxtyahqhqopvk1br71vfkgj7lc7usdwhmrn7lj9buwb2hv2rmxns0rwbwy1fw6vt71evqt6lssaxh0haw28oe65gmq0sly7060ei7j4eszzk8jv78x26lw518jjxrvgmur9fqc4nb2l5p53jh63u0rmwzi7yek0j6yaro0cj4cdkbxsqduzedovtcip06leoo0uqvj32590esrr97wskcao5ut4331gcly1pjdxuaj2uqvfbku0vmr6jvolo2',
                fileSchema: '228npnldk6pgf8knawjyhfyvrfo18sytl10558virg3ax3e0rnpko3s32dmxmawk8ue13uru9dwiqe29gohltxxkj9otqtsslc41jcoj24ajpe8adibyrq3fhkbxak0zponbtcxh6gf40l5733seu82agrrzcn60fbtlntf1fnr29yehtmtkiz6lnb0fu5v8ez4u8p6k5zdzcywjkmg98mkit5bbb5pz3c5mo9n4s9u8k0a5626zm2fr9ks1g93ncqrnegpl4cbak9zcto25f4glrazal15pg9285h6avvz1m68nav54zr5mmymaa0b46eu6xdr0jbjf3abdmk638efjvmx6hxdna7j84x8d60qqlfcz1mkccqt33kmue39ukyr1svajg6vgkty8je0rarmogduhvaq4ctw2py93o48kgg4bxcr1wgs3id928g07iyar3ur3533ijiqh7z1q48es5vd1w9d4yd5fajwvpjbflgp0z0ybm2dyzjcg2bewhzjqzh30t0er17f89y5c266ppjwdtld1dlc68tcasxhou3sif09anq0davsf7z0uqyxg8sgjreaw75ldrxonqxeal7q3qnlscmonapenl2r5k6yjsrugity617rfnh20t0ytd8n93sr770s86ygl4pthul2z86264eu20co5i4ool9o124lmluwy3sko64wli5oyarxljz4s8suk0nahi98eykgmt9w5ql9wrrvlx6wehkdscdrg5z9aqn5mhiaky11i2ak4y4hh67g5k0z6g96x5zd8z7ctszwarfsbc079r117phrmfz2uggqlm9g62y2nlqtfpcansgeolrgdy2n7ldzanuui3zf524lgnpdg3aukgqbn1sb96y7wt5qqpmvoi1eo2h435s8vg1rcsovdqcgsjmz822q8i5378beqb4f71f73q64kq9t1eseoz6345tkilbr2jnc8ub7yedi18ps4u5mbfr15y1aej71hxvj7cjkm1mygufwi2eem',
                proxyHost: '6r2fmqyu5it8j0rc75g51uesmqxwhjxhici4tsccbou3p1i0fumn3uvcmuji',
                proxyPort: 2039686300,
                destination: 'cx51loef9kf1nfbui3yuqpqlqrrxlgx8efdvpv3qabcoy7gq1y9xqiztbet7xfeyjugtpsniprugukvd0s6uvwi17zweq6qn3b8ww0z5b4ks9hnr1qp83tpbkcy16jek9o22ouf5iqpisz9h0on8rtczulst7srg',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '86l3iscez7gdc384j3mtsl302lzw89snf0pj2b3h67r5658bhkns51ctsferva1v8y89fia7p2yc8cdr9fmxwkgbywfqbubbhqrksx8l2tky5zf28izirzlnimz9ns6vbcs7a5cy21mdpakc35wj5cmr69agr3ks',
                responsibleUserAccountName: '1rm3bcbuh5cw5jxj6fbp',
                lastChangeUserAccount: 'm76z61lllugp56c3990w',
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
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'yxup3lbb5a28d3sxj7j4t3ygt5hbconkntelbj10',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'pc5gmis525c0o2kvq0xeaqyc2g7yxqg6f6kc9wgpqfuven3cc1',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: 'b0g2i2vqqtm1l44k33h7',
                party: 'sc5irovvp21nslghenkkv3pnevvdxgv01siojnej3hp7ft7wzk5zkd8fcoyf6j9dsdzitza84mezaws3j3suge1muv3t5whitxjiorfef8r829s2ag1lgpmzdx69ovzfcxzcp4a4dxfey4wo94b5w96t3yxqj5s2',
                component: 'ue8w2psa7e2pgaiekxzzpatnbnlnimyxam8vdyg3fd5dkbbvhcq9vbkh75wu9w14vkifuu2r5jonuqigt2b891fewqka73phjtxa67mbsaodxyc1fzqvhgijnkxz9al4m5ezrc2rdlnhs6c33dlknh3dyeawbzf6',
                name: '3ezd1m1deu1vhpe5m66w5nlkqe0a2o2hoigmq3tqb8bzaefz6g9czp7tixry4io5ubzgkx0uabs7fy1m2xpshkkpxbnweczqikp4xks1pfdd52ll6dkf1i55quxtogcdqrupd72dzub7mf5e4z8s2keaubn5avn6',
                flowHash: 'sxlleop5ti02rgkl16g490bb18v1in8fjzwqg0zp',
                flowParty: 'pgynwltz9cgpzb6berm17ls225fnas1lp18st1g59tlm5oxlsrvsf7lmzsilednjf0myoqrkhw3qv9mdpazevu8yaqo3q1k3917yvmbdtl3ayu7m9z84w8q8o5pjj4k7w7fp86h8ibnaql7v3stxv2x5azq1kurd',
                flowComponent: '4eiv5e5etgofc6f265zvao09t4nxu56ekdyfep13zsrz23qlqq3u0xsizpjjfqpal37ij13mwlkkviktman491c7rm6leo07y07dcf5bmaux7r646ugluihkqynf4ne3dvzjt6lwgxkw6max41ozjeejjg65axhq',
                flowInterfaceName: 'cdkji6s3nbmolpxik76p3ft7wsyaf3tm77skrn10z4t4r10ii1nkk34t46g58iy0nk4n14dgedytpfwvosvwevtz00k0hxei2kc3rnitfcmpruvbtyvqsxivnytlbzo0zz5ct2jc1dvkpj93v4eokcwa8jaa0wiy',
                flowInterfaceNamespace: 'lv2n5wbnyuy1kdrvzu0ecu27cfvdii8q07ntixwqatdj4ieb5nvpi2ult35kmi88bqoyxygzstenfymah2dyt76dscn1e1gg36kvi07xwawby2pmf9w6ny0wqvmgv21l8aoht02hvhg98ep8scojbra2vp85xlfk',
                version: 'o3srbw1sxmheqq47ixt0',
                adapterType: 'cyzkmf2kt1311ynqp8o1plagf7t1200fomvplp6ke352e2i5ltfl6jtpd04k',
                direction: 'SENDER',
                transportProtocol: 'vi8t5o1jxkejjt7cg4rlrdotytiv8tcymm3a2d50xp51r0vyrpddzmlpamqy',
                messageProtocol: 'ts21t8hyoart3rwfjt9lg92xkov43sjpde5el23thj5iusp7ezzadrromshs',
                adapterEngineName: '3fcjcuoclcvdjpj8983m31d7dn0hnyx6x0mrp7qf2ylc192rbnbpdo37sdxm28q2gbl8jpvj5xwmxao3jurlhpy4yxlfzvw7xzqz0b6i2d8dynhlk3mhkiez0j0tnrvtlfxw0q1kmx9gptjplrr6hrgj7cqvqkvl',
                url: 'dpa2bqpgs6rzpsyrj43fbu252ye6z9xcanr5jv175gomtovswrf4635yqcbmld357jfzowwyn6wou2uwzcumkh05xxt4ams2n2084ouksy6blysdbu483xis4okysvbdoiqyprvbnl0dgngqyxu6uexysp2lplym7khhgjoxryhq2k8925qzopi2f0qq3k0top4syb4tf6v6i5d5qoar9ekpmuvkn6cakgsw64f8fdc92o7ldgezvjqyxlw0cxl1e3mib2qgld8tmjzuxjc0fvje9vkztcijucvj3acnhqbjmvp0onluwtd2qi6oib44',
                username: 'waj358s19l5ues7263v2soft37m500v9wtgq793y02j1vz43xt8z6m54nrqw',
                remoteHost: 'dtvqkdctergfjhnv6snfjye03k50wrh76pwln7of3c6q9r4t81hiqxa272aft999ci4xmex08t95grcle9iyt8pz7a6b5p3jmpmj7yj10y904h0idiwgn78iqr4z60rrg7qt1dm37ud0kz81ymyz5u0iewcsyq3r',
                remotePort: 6255424547,
                directory: 'dkvgko9q3pmjzypgmmrdpl7znzqwzmwar7phugylzr73wcoadw5kiapg4op3vop2q8yteyu7eysyecxg0qciop8q9wpcqjzbw58yl65u58asuytivwq52k1dgfc46v0l8wsel3k85v2c2f5ibwyopnc1r9cvtd2uatfqsyk1s60ufo7lqqi5779g4azx24ukcsgh71jy1vzkxqo97a003fakmps1l3efkvgli9yvn8pr3knfkp5dp7ikbiw4o0p7c79n8oi8kt3h1zru2sox9zvinhtna1g6zdbr3q18b2o5g0c26wlq8kps0r4diqjcacw2mzqovf8xa232j023y8q6nh5937v1aa9i5wbbytav5c7k3g7ysbbuomr2chcflsnubbn29kyitkvf4d5pqpwvzsu0uwnz9t3aiap4o3ox3ogrfv26v8sq97gba2yvtl52cxdmwwcimw0me2h3hs2jfs9adlovuze04wa8riplm30ltu28flcg2lqf246c2a2cyxu94hrx8gsu08gzx7yj0nm6993wq2b0ohsj71yi576fompyddqvwxzckkd86ajyks1pleas6i424ns84kl2mom6nac5416cy1mfz7sbl2va2955irx2dbesaaj9qoi88gdtwc7a8rx6ivr5x81vxmfbkdcm1nz5qs8dab4chhhbnxac246eplqickh7vj6d2tr2fst91hsu3no59rgqi4h60dpqjhwf3kfee8ing30yxj0iu6foifobtalguz3pc36uckp1opkbtg5v6opsr5rv0s9egit4qb4ebhns3yn1bxtjg55gk3vesnetdpyri5qd2dvs3d2ekfvdzv1jb8pwb38vvqrgzs74f35kih7k9sfj3ri03yy40aqx1pg4j2wn0hybxwv7gb8j78ltv5j5lh7wpdhzjuglwuzqpoq90qyphyyut2izljm4amgi9yvolh5rnpfah5gfzfj8xaqzx8f24f7ssrajx630citwe9fuj56ndkctzqfj',
                fileSchema: '720kj5vimn2jjzireqqbe6emtucligerifyx3gm4txcn0us5082sji9nl0davs14vzeu4f465mweod3w1tg4eqi66y2cthj38mymz14de1py5b65jskxwt8o0bfutfesi5k4z1u8op6iv06r8a3t5tij2sfuwwcxx8dhu22a4tg7q2k1jwgjff8mzbnrud9yeewsiw6ia05ykqqfdzec2glw87tbvjeg5hn4vy6hqzjbs3r6rhbao1jbzbezd8ce512duv63zm433g7s34uhzdn7ymfbdrj9nn80gc983k4xvw6956wf5ne5flota8hpumvutfl7ihbnm5qu060nn0gc8k02f4g5j53vf36bd8aabzjiosd6815dp1jymuemf45km5bsplyq3nywex9rizwxcs6dlw5qy7i9wnp2of4ci90k0hkibz32f4sjbnx0yarv7ny1tzirhe2lmr1l56sfj6jv1p73ug5mzxf9lds5i8ohdltxlxw8i2ou4lliwr7gy1fijwjkzl0qjndlvkbym1z9z55sdqag9xxl6c2vfhdig8e0l30ui74qcb9iv0pl8linm0ysoudqqe3jwiskeiiey2qfxmhd6i1iy4e14cywz48ily2w8e9mjxkefutymv7pnpz8n9ssda8rskleawj9aelnta5t8xojn4585ybxkvjvh1qmtapt8bv741n3el264ygrb2nfbvesoi1ewzlw9h32uczds8wf80ktc134to863iev62p5byqysy9mysvskc0njptlslm5zkpq3kjfop6ng3xp5rs4whf4w4g3dc2r67nt9h7z8us77xyer6xmov98zeh39xksgrtsy76kfs9aqtfk3wddvtia9tcjch9gujesx9ec187h924fxte23ftsciiau4klxwmfo3cog75qlf937adsiy9cycceh9dh0myyvsbdfi2o4tm7nd9kdowf2b2rxzg7nmunwxrdsye2wmopfxth80apedjqzar0tthyg9mnw1vy',
                proxyHost: 'qgn9i9kaw42illpgzzgsdjeb32u83vcwwnd5j9sqfdixjbujgz5x0dlkuzzi',
                proxyPort: 1833841692,
                destination: '1ga8cs4mnxnq5ncec20wqjairfrkjqczq8aubq59m15rhy9f5cl9du6nwawhdyiswvbm1lombopd5uxekn2lwuwkbtmjrmhp05il9k7g9fvc8r3cbrhqk68b808z47rr7gr8d51lmh1us5kck30ldvx061a4zj8i',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wr4nml37k0nkryvwfr548krrwiwe8qmgects1ukvab1av0hkva5z0unftkakwfit1pl7rdfk9tlrygrzbd32d9s8wiqwgpe5lia3lkkhf69e30yejzbfc18m4b7h58nrlph7iqpwp711msxvv4swxty7542uj1dh',
                responsibleUserAccountName: 'fjfbc3pcf75bfjiksstg',
                lastChangeUserAccount: 'vkgewztt43nasrmpnyr5',
                lastChangedAt: '2020-08-04 14:03:56',
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
                        value   : 'f798545c-0fc5-4bf8-8a27-d1209786584f'
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
                        value   : '9343c62a-8471-4c7f-b50a-684143360b12'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9343c62a-8471-4c7f-b50a-684143360b12'));
    });

    test(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/e194911d-6c5a-46f7-a1a8-223a282673b9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/9343c62a-8471-4c7f-b50a-684143360b12')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9343c62a-8471-4c7f-b50a-684143360b12'));
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
                
                id: 'e75df49b-3a37-4e80-b57a-69dc23776a52',
                hash: 'mf5suscm32hf5katv7fo9x1xkxb7t1rr52b7ntpq',
                tenantId: 'd09bfed6-d842-4ef5-93dc-485269a59b7d',
                tenantCode: 'ehvx5vs7vx8wjlp1dzmdrs1wgcyflxehi5vuxk6srgu6wy3h2u',
                systemId: '86c52fb6-8aa0-4073-932a-8770def3cc2e',
                systemName: 'jbptycymlyl6kh6kxcgg',
                party: 's8o790l0jnobmu6plptrwj0ndsvhesk37i4213jpp4q0dwybhz9v5ehvd4oko5tupc5h909h14705aeh25lp2owi3y5w89dpi2zeol0jniwxb6lj1l2g6l87bn1hqrbddj8t5rbbk9m2h0harisu38cgqmtg1i00',
                component: 'ijjcl5hwp6x6jixzl0u9tzplt30d3qkm87mqfuggxwos9xzs17izq9xbx3pbg7unjuune57rpm9d1dx2xiid6yonhhamzs6uyyytw2bkldsaxaw5tdb1u6r7g85kocfcc41cn7elcekap3qgq4s0k5veih6lz02p',
                name: 'nn45foswh55jf9t6k4t8oblafp4lvzzl8bgyvds86qjk9rekte2obni9xybqsr15y387i78npw7xpx11eb3n3rkuyoin6cdknmv5culy6gzwzjuao7b2bdim2beifd7ydz9gy6jhz0vhlzwo4l54lt4iou581vfq',
                flowHash: '4ryfeilj678b3bib3n228v0ngy236f7ipkm39noy',
                flowParty: '024iy6ndjqd1d4ltg1cqhi4mns75z21vlof38e8ec751tsthjo889ha05uzxyoke3h79gafd0lx0ui4td6vmmmxvksaiig46jq990ljelwic4tycecycrqvhk4cd56q5gxfitfkw3j4hcaxt3nkxp4hme8r274ts',
                flowComponent: 'cwlumhe2pjjn7cuevace03wzj4rff3z6u8upa1vifp60rl31at1qz539mvegpkmqfmqejx570e5kicbvsu0edxlegcffi96h8aa3z9gc5uemvw0nci9t5xe8tmlov94gk526x4so7bwucff0974ir2jygard85sx',
                flowInterfaceName: 'i59as1yp9zl68kudpe3jct2m55w11mz2xwr3ye8m7g1v29odinp4o5gh0cr4qdtztyhmpspt7xxrokej0s7xci3poqzl87v1rfv8ef2gbwytfo4fdu1lwyjv8ah2hy7t644mslqt8hw3gdy7f6svgkpez90wzd24',
                flowInterfaceNamespace: 'vxnh8w6u9xhbwec835zelc842pdfnq542vwfhhqyppalmq733563lzmqz42l8d1o5rzn74rpjn0o7eumpxnls10qc46cgd3zu6h21pgooc0kqtssmi2mh4381nj5j2f6leuyje7z5d9uhy5d1bhdsqecsshg6gmv',
                version: 'jeabdr64losb7antf86b',
                adapterType: 'dny3ftzgdfo9qx72vq1xfeunhf6sor0ixij3114ckoa8w4h1qjz7bj8pct1a',
                direction: 'RECEIVER',
                transportProtocol: 'yi55toysu5gksy00294ramfy1ybys1o9ktkzlruyh98h24cjha4sp564q3v1',
                messageProtocol: 'zrnvlp6guc7zc41t8k9157qouruph1rbldeg9nj7cunbtilvsoyg03tpm9u2',
                adapterEngineName: 'id302ja7sz4jk8tl4mzkkn3o11ivsxm0k2ihrgucm42jlm5ecfrhhl419uljynpvn5vmugozetpr8u3xhw8vdr6efqzy0r91up9knyrj0g7x9kem76ixu16q2yyrm3qglrnfu2961xa3om3gddvg256gmzi3p6vd',
                url: 'c93haejv5gsmvpxbjww20a1cmm6byxtui3kcfqv3pisuf8tx2bzf3fcrmvpte46af1cw8pczcj01g93rvu50wa47wwpem5k2jabxfunod21l5wk4z9qq4h4p30juw6j36i3k62iiysvmocy8v88jqnmur72brv52igmivmzj2qbnu86kjetssboj310utez3kpcj99vfy0hhqli2az27pt58wnxxyvvya3tiskbrnimt5wtdjichixawhlsqsx50bay0fjy71k36eehajep9zm7kub74r9bajwljmonagcn7vqfttgee6i2mqr3ea3j7',
                username: 'tduy946lej6xq38w3j4s8kmgup5zevmfq2l2zga28by6ncidduyo81nx4gsy',
                remoteHost: 'n56lcmsh0rxb8alee3z8nziy3xws118ztvuxhbxmhkysbaegl8tht4avnaxfealbyr26msh9q4uzgrh4kqfep7f5vfpawyd46pc84usdeig49yoq746uizrgkfjbp8080n17lhyu2f8ka64e5hvspy35b6amq8bx',
                remotePort: 9695734359,
                directory: 'i9cwb3qvik3tw1mjxwhrfmcisx3v1cw2wdspbos7hqwc1y0r8ecm6xjtenj8lhhk7ruxc8wnli9ttp21e7edu3p7zpou8wlof9rl1bvg49lgqvtoijqsmter2maqtzobnv9ugds0gtw4si3r5eef66imjl2x518zuurcgabbu7nx8h4s6d6oob9mjvkyhngfjposdywyz5dytgltdlzs0r98iy695hxevvn3byi7qiedefobpn1stv1xoy7i5myw9xfc22hjluj4r7z9a5a8a56x6p8rtghu9l67obgu0bhje2he8vog9u3q0zqevoc9qom0h1dpopqc34u4facxi6sh16vvkpfohuavy0uf08vpdp5p36ak9nbabpfmb719kswm38weru8soqpfoy53bigth7b0pci498tw842alzernsxnntzdfwkc7jwlsyvb03wodbodidzqqorea07bkn5asix4mbk0qjyufuwmlhbwyavixaj4luz3auyt4iiodwuh0elfnw7gv0rftpg0gml19u6v10n3feggpxvlstbz1baw6za9k3n95fbjovnf0kmntg0ijff2666k5rkfbdkyytzqsuctrfiqsoie415zb34550p8qe9x3w0zgdejfwo6zhaag7e3b4ylsii22e7z0gy1rncjudd0mekeifprxvtc3mf45kkuho3k5qhwdplhbonhk8tbn8v9qcii4fi2bg2grigjj5qtlrnjlx87opzkkf5b0je5jb0q2vhi6s061xczw8n9fydd5iwvwpgbmbw3b6ksbvoq2le33p1moe37bf790jspi8ap1h7ikiyqcj8b81lw9ltbauq6ueazjvay7761tx8imw39j7ahym0o8830w3fiangukfdxgwo20rigtg06xkf6cp6d1kuuxt01ymr0qsg1vm39c5wf8uwt5nqacrzw7pfs0k0ncfc1vh15dn7m3udkvya0qzy3ptj53kqbj81cka83snxx77v13theyy3dwi2pyo4j',
                fileSchema: 'zp1l7voxrjwe3wsi2744ts0p920yf3myyi1ohhrjmv7stekkpp4oscg9e037bpah2von5t34mw0epbj404xfpcno2tulcpi22b7g79q8hq3w7mazw4a2m8y3e01orobl3nlqgxaelsbjacwv9yyyn3dkx1d8i9su2a7ob26i84w4llfuo5hdi25h876609due6jnr9z4hugnzjffrufwbcq08pjgdpwn2fv5aklkdt50cazxp2f7wsgja2agwzgp40mf0c9uzxp06fu8w9lqt0xxz3quw9lee9k91z5qlyrv30cr2a8946kxlz4ywmtykyfctr6cn40lhincy4z4ezl9gxe714frf772x962hrx2z0fui1a8q3idietzb9wsd7obxei71ujj9zppqel6bkvx7owaiu2r3wcw18yql1oee7ijrae1jof5r8ebnzli4soau8ekb4pz87hj7qqxuxzn093zgvbrp5fajoxlgtq3tgls5xycmfcg9e23y4195xjvvvo7kx4ug8chuzbwen7ig72336w3rquc30dq7fjob0mz8ko2tnr13slsdovfqsdl5atohzidiuld06ra8rvg6uj7c0r45m7mui5xmg5c5099cj47qh498m9wkpjbmj7xnj3mvjitbzwydfvrv5as8xidxxi8c25kz0i88lzzmadweqkkwcixypky6oejuado0m8mgqwhmskcz6kg754a1v4b59n2fmqodc9fyyadyt5g6mxzzmg0w4195gg6a636cm5fcrh463utsnrl7yny9onmg2jkw0irzdim60m9uzipo8d1hbtnzgxgrhdfvmmbk422xub9idqw0qpjhe8woczfh1dq2g8ldkxgaaxhs4zuqi7t1wylgy5ouzwoc2cvspvy75qoq92hif7718j34ccr61p8xgdgnzd3wud92nf45ksq58jhs8cn7td9ltgnn39zo22wk546ctgkwd2lty1vmtg6y45e6bd2mmbssrn0jc04dmyo90rz7tfi',
                proxyHost: 'p0wvivhpqmi85wt7166t0hloq443sph9c19a5pmvmq4s8fza95og4g9nsigj',
                proxyPort: 8356678671,
                destination: 'gjlebfh9ah2b3v37y5qo3cbe1zey7uxyef952gdz9rd343kk1xfdl1xumekvp0s0s0n58mvbkraf6xdc66vpc2xnkqyr62na3z4htlzhic8yt73a5pfvoq30bj6dvk3tytckzqkzod3g2eah3jw5tu2zholm2tep',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6w0fbx5549b0o03so6wo1p4erlsh568u2c2tau65s2hb3wigvyx0vuhi4t5dd5fqjcqvhx8a5wtebt43vh5ca6bi3moemo2fpj6xc9878dmgmd8idzhgvin92ba7c13v16e64zlr1dacfq973tz7drhlc1mhpydw',
                responsibleUserAccountName: '6pjzzpbhtd37zc9u5mto',
                lastChangeUserAccount: '5xgjs3mtvt5903hxwir8',
                lastChangedAt: '2020-08-04 02:25:54',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '9343c62a-8471-4c7f-b50a-684143360b12',
                hash: 'xo5oywtl3txryub3b8jd0eggnp5hckg1co1bg9nf',
                tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                tenantCode: 'giugw5sys0e5f0mf9m2jjxve28ltstxi7ryrjqkb5ortl02epy',
                systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                systemName: '49k4ph9o6yilkoz7tmqk',
                party: 'yyb01aktagmsluhqvsxw2sh76iygo9qdm1qh2001nh6lr212jdutmikgy34tveoy5tib5hcbvithsituqvqfwzkxpkiex54llw2wbsysgud2dv8isld4uwmpy8anjng1daw9s17mb74tk9kpn3xdlk3pxfq5ve96',
                component: '079oko7qy08di59wvyosaxqa6cim1k4p31owvwqftxntc2fskdgp4sv297557nl4jvx82vn53dx3s1b56k4u1c0tay649wrvszre81o9piqdd2l2qjzvtibvzeo7pxwr40bfjfwtx9a973ftcvauy9wz5y8dt1qf',
                name: 'ud5kowy3vrkblxx0wrfj2nnf2091os68pvwlxyh0gvtlsuozcluhss5bfp8bhrxfkyx7mzkt1swjhlrreich6g1mlooaf7yyv1351mod4v4iswt6k4q6ax6lfubyyjrsojp23ohc07dimjf2178ifaoc6urzd9a3',
                flowHash: '32u8l0jbogxzqgb12olr6vj0h1863q0ok3v2oadi',
                flowParty: '9wi1piggdi0visi8magai9pobkbdbc89hyz41seab0u6y84y4ouultfajzzef8iqw5i2levw4mhi3nd3xsi1ppwyosepjdjsw37p7zw2i9rvu2axd3v7vqubfnscmbr6nkmsk9gmbl61hvwwsfigdrp5y4fjz4z2',
                flowComponent: 'fn9jg9pl8wxteocc9u0rrljizkhji383h6mherpgbw0q2pf0nha4d3eyju0y7hirqt22im8epo03ena489hnj6s6p8nadd7rbbxvb0vx6ny79q49np0tw6xbnfpjp46mcbl1pb0pppwr1n43eodrlsfbliktfxn0',
                flowInterfaceName: 't9286oq5341wrbjys2motghmvtlcgp1rkilkvc5ttgm4xu2xeeoaxyolr6pkbfnrxutdd74fo8yq7x3oy6iffaik8sscej7sjqwoctp1fytx3eskcqi3lzw526nljbct02683jhr02yvhw5fjz216afvjwa7r0ki',
                flowInterfaceNamespace: 'rvnku01jqt46gyvtpiy1c4mksygfj737pezo2wo5jg6hxumytyu4qgp7hxki76l9krl9iausrzipw7c60ibheu5h9mm9tghkaf2rv31qenwrhgad9vl67pvrbjxa6tkxad6frajpfsdmpmj9papv93mqc9evkvi4',
                version: 'q9hjo2yjhu2guwrstwcl',
                adapterType: 'r7092vqc5uwzwky2ebr1r396zsxtduts0audb3fbl12rtmwjrsdeyl4x4ff0',
                direction: 'SENDER',
                transportProtocol: 'iuucyd75xsg8u14c35tlo3ga8mtcua8i7yrim6u26a941sl2bchrs7i00l8n',
                messageProtocol: 'iembo0vprkhiaj07k1f9g9513cfyem4sgy3cpznb7al86c0oxgbkj9ygw11y',
                adapterEngineName: 'ul2sw7sn9ta1p7nhj3col0orfjrbi59a1ujzlwaxw0lwui7mornhp41tq3dk8hgi5qjel6tjr5knrz0uh5gvuyj6l07gghtlnh1p6osa6pfbcbu15vytlr1hmk7rco4wb6taub0s3wsoq72ruflq8ci87vwp6zxc',
                url: 'x6ukr540ls4iwgcah8gcar26tsblfu4fyg1gce21ccdtekgsu49w17emwcfunnsz1in667xnpsi13afsa52qj3g1mrld9e1h16hf5j4nsaiaex5vic4ruu8ew39xbyma8jgcty4c1rk2jyq2tj2jsj4al27b032a8nk9gstx5t77zqabvxzqj536gz1gnre2pwjvy4ny9ruvl7u9xzos61ffe1dy0kjo9ckfsduiqsr68sho2pgn224na2psgwa9iv49elc1abwqo44i5o4xjgfdpjzhkcz953telu991312xzcjbm9u1r3xj8y6x4qs',
                username: 'quvpqub8v84s2c6o3zylm6jpqdz6576s2ep3pgeml3xoxmqvjtmcu32qs8kt',
                remoteHost: '21ftv3bpaxqkdzhq9s6ce287o1p0ss7q3bjtz1m6nnfhpus3ricjg9y7d4kai95wpy330zojxoaal9q5slioyzthw2tg1vpmrvrcps5jbmet1jawxwyqwb9nhqlmmwuakbjhn6sf4jbpf87f9ew0bbwgmx1q7vki',
                remotePort: 3934796400,
                directory: '8td7m2922g3y5ayf957wfdm752b54ev170jivvebq6pbf61owtp6uk9ua0e0mta2cykwhfpc8bgah7evoppjujp3tabrb9n70sk96ukgrysu0i8nldde59raskuzy329ysmt4akxc8cqiqnwt1jaxlvtsgizg56g0r18z9w8s678ezpzqmamgh3lterc0fpv37snbkk9w7ayygn8297ztv4yqtnuvt0khhftck222ssthvdhhszcv7zgv0n0eef7vra0wj2zmf7eccalk5cs21g5cr9ysclge6t1dv2cx9c79527d22cvaf4fsqztzg4lobctpb51idt5wqymwngr4wgdfwotx2zuy3utviwkvfek1n806lammojpvj0767kckpxwyhs48lpay8vg3sf5w9pxjypa4pgu44g6qynnepl2yfhponkjtwzwv37ck52vim1m6qamrz73ctozanm035y28tf4nl112o0m3bkggfhtgz885gbkhq6qqvwqv6wvs1fgtmg1gmf4xm7qoxidxblueq0zsesto313pslot5cparbrhvrpr449g3yn1bnnaupji8r5ssbkgv5qo3bdx99uvkggrjjixvqbeitrf0vbxf1xe3kq9rjslgcw9wzbnafkmn30ssjt21wxi3l1w542pcl9ctezqa755eadid1lymanud38pfm3is3hr1lvhlvscbao5nyamqu18ahi0b94c7wj1i9x9txk1lqci2gnyen62nrdgesveg4kehsyyzlcbmkk8g61t2d7naf5n2jah61c9bxe38qiis47pzsc9xjktjqeos1s728l2170sp0er2wvsloo4c11f0wy0r9zvoeccxevel4xmvsiw14mq8y4y6221v75dixnsbx2rbssvgpb465on7lzsga7z2obl8ltcu25crk5botu3hcdtmvmlhn3vy32zr0k87mvsjn8p5s5a2iomad1ewvpaxin6jwmk5utfg23pumwl8isq31odre4f0tevpnfoin',
                fileSchema: '46d9pdxsjgu2hligk2mjmib64dxk24yl5ybmqwwrfw777os5r9nz78u0gn72ck2kb903y72qbzsnw3ipy6p1vcpw3woqd48ns3sg5otd87qm385dq8gajfqj4bx9ji95a4t9pvce63yybk9pyyfukk1c0e2nvugjtdhp2d9ko68evy3zkhcpherftzh09l4kzp0j28myh9gcbtmwresxzapal0fzg4oet3bk16etvhx4ifzt8i8efb8c1tkdso0z1fsp7ohfjmxnvhg4d9wiezizjs2yrtkrs29paw6ltra3vaf1ozukmkwd22ylbidvfs1f4ppd9jmimnpy8h4itzcnrhtr2c8rb3255nql57mdyefkselpmkxoj7m5zj0g0fuovcm0lk0b6og5ghovy9cn3iw0f9iemi2bvjidibe9z83yhi2cn07dccfgvatv3su0et2q0icghwon634mg8dj451rjr252drbgxpf41fgzqqolu97vqo4w2cm98kn7309ptkhad4overpibxkyrwcssjmhm5wy8qm7gko0n22feeyewc6lb9cpgasii5ifweubhct89znpchdgd87ue8bovbgpe4fu3cq8575jdxafod4bfu30f38jpf1lu0cjsi1ai5stphne1uii1oeiqos949b8z9ui6gd8ubqjp0fbel8vmf7hgyg0c5ab7a4c67oq6ewc3ec65rrai8xgf1ff2ln8kvb3gozti90ravgoc2g9f2kyeptkivz81spsmd1npe8e3xsgzovmnhdmsutr1pfdra8rrxthjp2rtmezvjmvd7wr9ztp260puv9qdfrxhzub0lrr5guumgmabck32fml6nuv7k16lupcxm5qd8kc7xkn7zcq5rni96r4sucyqqma2hd4y25sfpwc98dpko26xfdum1sh1o42kyvi6clf5ms0t1g4agcin1nbhe2pnwv5npzxel8j4pohdjetwsqa8qjxl6bfqftt4qpyhhy9yupc31yuck0iz0c',
                proxyHost: 'b3z2dknin42lvs6luw7zuuxvs0sdjapz0xq309krffkmsdwyoe339dmui7re',
                proxyPort: 5384242832,
                destination: 'h2i6jhvgts5z9c7lt1snrg7dunk080tbxemz2e8fyll98g5od05unonjc6e73xfdzr1u3wbe4kf95h8lnyagskic80v0hebqq4hrrasxj95gc6bat8bu6fwc2hq7ej2uv3ubn17ynkyxj3ltkmfwd6avjm8ybrif',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'lurffkb2z6is54o4ex8qvccz7v0rsm5fat5ehupeh65ojo8w2tmo3jeciwickrlvgr9jkuon9c7hvg2fm2rwlzgugkik05d1hjkuauid4rpacxt3z8jypf9m2jwvcrooy1gwzjx3q6vr6xg87gxj9n8tgusjb8rq',
                responsibleUserAccountName: 'g3drjgoa7nf0henfd93b',
                lastChangeUserAccount: 'x4kqr5g0ooxvpsf247yz',
                lastChangedAt: '2020-08-03 15:07:28',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9343c62a-8471-4c7f-b50a-684143360b12'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/331ea98c-4e3f-42fe-9fd0-35e1b9341c6d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/9343c62a-8471-4c7f-b50a-684143360b12')
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
                            flowHash
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
                            flowHash
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
                        id: '0aa99338-ebf6-45d7-904d-c37fa76365c2',
                        hash: 'grrksxzf185wrzog7ljmh7g2nanztpxdxx6g2m0t',
                        tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                        tenantCode: 'i81bbmz2cinl8qb0z73if5przayx48r4w9l652lgrbgedp2g7b',
                        systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                        systemName: 'du3tq392a8lune71t14w',
                        party: 'mbr95zaj8wn3bsaszkk0jdu0ot3tu36dglbmscy3b8lel52nhfrrf4mch9p0mi9tfm03if17zzvll6awyqm1eihused9j5fcv3qazbs98rl84g1bphi7pnd4tm702pwae6snz5isj1jzx9nczf3622ce52dsd07x',
                        component: 'o5it8h8oxclssvowhoieq1ur8k0i4e9o78fg3k4bvmul8zv6jyq6jkj56kc7hcxpa4srzlb1407jv6rrh0ui84vwqp0zbhdclpxbuwcofd3lobvj1zhggv2mdt61e6dm4fgaefh2npdjr1wzqq1h8sy0zth6uxv6',
                        name: '27wfs4oh6ys4abg71v3ugw5l296hb6xetvfn8cf4wl3lax0huxilga7svqxdywx00lj7u03ywlorplchqd5m5umn0d2fu1pvp3uxmdi4r1e0a768r92epdcajy7vzogjx88p5gqsyz1rnztklfhxdc3v5yt8xq5a',
                        flowHash: 'wkl4dptfqfabn3fr2gqzuoa9ntwabtxaowsafy1k',
                        flowParty: 'eflbir3zhgu8167nyi143pd7oj6c6x86om7fpjq80jif2a9stozatkh3sxxdgaxukjbkcsgq12umenkaz80iqgkkwmkybhyqpm95baxyqr47hrd2xrowhnkv8bcvqbdtjkfdkjca8bbhfszcoj5wv8tyhlz4uvo1',
                        flowComponent: '1igpnwe6p17y1b82oqvmjmcfrrv14d8lbro2my0oiwi8y1gr9b8i6zf6hl9boikgqik3qgmbxu6c30mwmgnrcr34txdv3guyjxfqg5rlvehs9lvvl01k89zponbbcyp53qdizs322w53z2qndh36mfyc8a5ionjw',
                        flowInterfaceName: 'knnubk26eradwbhz5zle55i1npfa4p4jlhqnfbfrlrrfsf686r8w9009oakz6onrkvkgkd0j8w1lu70tl8wfjj785hvuq57hijhzyy5y1ku7wobqtgnavf1peciq4olo0k3fm26onm9m30icgf3qkjnlnx7jxfn6',
                        flowInterfaceNamespace: '59lix68jnx08em8j0kayzmknvnup5gbttmg0s9f8bd1vnul0dhexbyvzj0dwhic7p7h22ha5ex5ggcz03vz94kkvkp6i1ss63d4gnconjbn5a09yoco955n36aa22bta3xlnnan8fepmbmunzd8h1mjq0bnc4b9i',
                        version: 'clm07xt834yhfp43n3ei',
                        adapterType: '715ywxu5zzupv8ue14pkacyozczxnn7tsyaej9m9kpntd1v0zh1esr5fmmc1',
                        direction: 'SENDER',
                        transportProtocol: 'uu2swstw9qfoazq91vvbctpuid7za53ato0no0mz1sfu8ctxe21bx07s8992',
                        messageProtocol: 'bays8ybhvzprl0gxi94jcl4m6efq403eyk9v70k2j1ql5z5ic82gb890vn1z',
                        adapterEngineName: 'ers68a00eiynwuqdtdhv9twa7dh7m35qrfi7dtznemrhad78rl991cex7dmzia9y9orb08by2v9aorypah34bq0b6hob94fcmhuujo1a5qm8jkaya3ys8aoebrsgfkw1ferdn1atgsb205oad8zh57puvrrp0plv',
                        url: 'wncqw8wrsx0abjtp0a0okdelep4vdveq2rrlvrq99wphs55lixnuvkd5y3psmgy9ej00u1p9c4q7sj2pauw9y1er2p1apn8r0y98afq2a098cbx2ilpvirro8amlb2ov3f7fscvaov19pybeky54bnw6vk6jmu3hzb5kiewabc2cvmr2g91mpnwza3gquc6qvchjcegbndixkfyp5w6mu10zekbc9vax7k8gi1krqlcw1us5rvqtzdv1y043ei6ahqyho553ajcqrqwiukf0dngbyet3gng2dcwwf8h9a251wabbl5ix1bs7ypvc5v0p',
                        username: '5kmznnpg3tid01g6wa8q1jibae4lt7b0hwljnfxr0h9d39ds6700klwluppp',
                        remoteHost: 'oa3o1ynmvbexzmzmn95m0mb8pf1z2zv0hueqa1b1yyy7j7cekabfsduinusn7fq7f0n86a4ft9zh68ebpyd3qa855zn615h911f0a5nzqh6k0n5ch9ozj0fdgohq03nf4vj921hgdfbt6ffobtnn1uchdaxjm7ea',
                        remotePort: 2545773334,
                        directory: 'ayg1tfpothm0nnpiklqsrt36mp9j1yviauvzpv4z2nc25lql9nukot4tpk2lh98wqozl8atuvmsunbhlxaspt0kpt7cu2g84mvatnkgxupip8t93q47v3sc4z9pse5i5om0ddz5w79gtckov7pyyj9uhgfyiap34p2gwavix7izlv58y4behy3gdw1t4mhocg343d6q04kh0o8nytqu1ghdvsbrcd5ypkive5ufdgb20vdpga5suoh8xxk9qmzqso75b1wd1tr203xgv75iiig6z22j6lvecdyghldbzs4r6t9rxtytmwa10ttycdni9oqwbdqmbyo7b7k6mli2h3pfy3qtautkk0hc34pfb9zt4r55pdr5qfcgi9okxk7ywdwt8xgzcoto97uqac4109g6yeyx6lpemtw27cuwot7u6poqewt22itl6eiytoi5eqobx4necxt6042xiloyczvngvqs8fgegzba2owsy18fajhm3wa2bc3xf3f0gylfid6hner2h502yfetvizv7mxr3j14yrmi7mcac4f3ck811ry6bjbqm9xxomp2viyf5sgze3ssacoet62ig6nbhi409wgyjw841b9bxr469ogljl414889flc74z8u24eb7960a5zq5gzdpd0yktsorptlljt0umhole9ucrg56bq4vfcn058kkls0q0f7fgy1l5mqa9cy2xy30ou5okwndac54zhzmzu58n7e2flstb1qufrronbv6s9wnpe3x3jb7ubcrkjhw17yguz0i2le8v7y3n7zn0treq92uqdu99m3h87wwuqcv82i13h7p2ea1hbs6js22skzkxnzcv5eur61latts6akefbdvb5wupwuieuul6nj8vctipflx6067zzwmksa3zkdf4kcvshieps4492f1bdulq6xde3n600qeq3o2jsodje0euvlg62bt8eivcna8pvqwfclb7oz0h1lk0afioc3f3lij7kf64khqwuf6ptyyj62evp4odaqj',
                        fileSchema: 'zulwg0mrkto5g5daevi4hkqgx1g2bx4yz8vjiout7ipzvzf08f8y12u34aciw18vj1sfezh2tbkzdzbdqxo19a7b9j3e82fnrqh5brfgbmiilzmarsv7le2kiyezseuu6md86rrafuriy9z7smsl50ntee4b88tcoahlftdy25rodb81c7ruczox81u09ga1fpdqaq90enys78ae9iqoj7h6okuz1x0110pq14egeynp856jlggk69d7sx485c932foeovexykxbr813qq3x8h0c07hv0n2esugif55zqbhqxvumxba2k4qcgx3fchk1vcgpe64khb2t663cnt7qzfm3qq33l9y3utgdbn2fbl2nb8rd44owwioo2wybmp1sm61v4hxss2qjfidpitt7jhcd9ct62kjyy7rbr695778c471nm9i0hbfnffefuimhv88dl0p2p31m5zx0fjiz3usd43mxqkvdwce5e8ooxnm552g8znbxdptteoqw5ourferuxkghgwf8mvhrj29zabz0h4xo9e4kv96xb129rtb5gg4v2pcg4ap2prld8xnde1up996kgw60a28kq07rjzb2u4ly9pqdk6lm8n2de01dez7s4mpl6dxeky4tp2e483mwky9vhl84w59yepvb0cnjbr9bjygxxxsf3s9gvsfvjxks1npjau7kzrffwr7ji90qz5cf9eauzn18h6k8st520v98xjjgcsf0iu46tohu52akdq0qb3us8zlv7fa9vcl4kfpfxy7ehwokvf4jpmnff85ge9piepdn1e45ykq9uxbh4duzpe6ioa4txzp8w7oj50ynu9h461agi7lo6nbj2kd84nkkh66oh5663vmz9nfozdjx14z8cczo99xkp6phzbjty05xe0yuwt50wjjdlyk596cyu3d30fl7kuo807p3vd18rebylfba15ao84rpenydy7gih5tbtn6osg1abxyqflmwiga7yfwqrrwy3iobt12vk4nyjch9y748',
                        proxyHost: '31a71z1ircc33kgv9y51r4cn6am4vqq383qe52lknf5axvz7m1sd20r5q7az',
                        proxyPort: 3844512019,
                        destination: 'rklqoce7auupgl76aigl50tx5zv9cyp3ygixh1bpqvuruptll20ioflx2q6vxoswjk4fn0jqzsi34q548s3qpyf7ouqxy6w670j4ctb73211383jedgguq33mqsilr3aodq2d6g8d4iiewc2jrodm49swb127jhg',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '6d7ygf88tqktyoe422u36rx3a57dhqzgbig80cy4j9e5y6ek7gcwf7r1hc266b891qegoykxf2c8oh3cyf80r3pw3yc1sh695n63uhdadakna2eloixgbz196oh3dx2tpl4u27kxfgj4mtvwzvf7b5jwzqpawc4p',
                        responsibleUserAccountName: 'ni85e57tw7jsl3daokdl',
                        lastChangeUserAccount: '17n4a7h0d27vaha6781u',
                        lastChangedAt: '2020-08-04 00:33:32',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', '0aa99338-ebf6-45d7-904d-c37fa76365c2');
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
                            flowHash
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
                            value   : '0561a720-2b65-4a43-8c84-ad8cbf3b6aee'
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
                            flowHash
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
                            value   : '9343c62a-8471-4c7f-b50a-684143360b12'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('9343c62a-8471-4c7f-b50a-684143360b12');
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
                            flowHash
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
                    id: '3c06a36a-1702-43cb-87f2-4ada25c2da46'
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
                            flowHash
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
                    id: '9343c62a-8471-4c7f-b50a-684143360b12'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('9343c62a-8471-4c7f-b50a-684143360b12');
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
                            flowHash
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
                            flowHash
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
                        
                        id: '9256dc88-dcce-4a76-9891-1967ecfb3891',
                        hash: '6d86qo3gyzt4llwszrpsq5yyl8a8p9acmhtsfv6g',
                        tenantId: 'adf59e89-e2c9-49ed-9b75-a2092f479e35',
                        tenantCode: '8ommub0l2lb2f93blptui91r3jb0m3edsn8o86wl57kut5ff35',
                        systemId: '81e0439d-6948-4c28-b553-dbee4fcb3e03',
                        systemName: 'sg5bsl0g04ouj1gbp6di',
                        party: 'b98c6y40gdrezppk9nklaghl2gphmv0wa1z537ycpcvev3dxlxriox03quozkr8o33hn8ulfdxljqh3tjyjlki5qxxtit96tkh9u7hyqiufh1oocizbjqzp6a5pyar5pgzx5312mtn39iqilz81bsuyt7vnx17ot',
                        component: '44ylxjoyblbnhyxcplps280t72ztuft7e315g8arhxsn1e2xf7cdjt0mba3x9ue34jbs3ec72iic6873srsn2t0apwinugqbj8w1dhaotu7ixs8l5pcs1j3fm2tfuuwjtszll0gfyo8fvk88audh7nu0c9qfwcxa',
                        name: '2u3ddj5n1eygemg43bbhn3p88qzv2i77oq0vvakbs07bu9ltlcz9mmlw9lkefdjvbz7ol7o7wu6wt3rj70ykir56klxvfpjzoogpn6k8x5g282i58t8jc5hq1qts7xpd2gqum5gm7t78idtl3srk8h7r7e1s1h6p',
                        flowHash: 'ytnli4uruuu0j0i6qjs73enidbnjir6p9ankrdx5',
                        flowParty: '47xh0do5pegzaemg487eiphosx9rkh4uemr1ilf34gblruexltbe9t0mx4kpwxgh3egpunszl7tk527xyosugxu4pjiorte455s6u88v3ixuw8xs1p2m6lxn01nfogdztqzll5p8nfpl6xzv4xqae0qrztlmxnun',
                        flowComponent: 'ogaemfxumltzs9n30kdv9mxinfvmb1ljn5say6umkio5t018u57bxl3glnwr3cz385cv26ih6yl5ze1xnrd3kbibidixesy7fgrv3d9biyts3wh303hk9sfcki8xkexew2p7u0da0pkcid8ix6y6n0xdhegbziyl',
                        flowInterfaceName: 'tb4hc1cveet7vj7jfuxersk8vv7el8h5a84it19o0snj04n1wuoquy6yq0np10wksa4twgv0yhs3oq2tdb9kb47tavdy8nzg7g8sllvj08hr01k01bfeg4i83lz13w2nsycxh9i9k5cc3yjb3d87yt4iez2ogc82',
                        flowInterfaceNamespace: '5k0r2i05motl9gikcn0lr4v5wpqugc61yqjxycywg9bmwk94s8h804hewje30lb5wqwe3xxie5bf2siudg1u0z1r9pqe3z5r4t6ppy4oeqong34wj2vo2bw6zpskt6qkgqo0v0f4yk3dqootsrkgz10rx7pcvpwk',
                        version: 'jyo3xqzll1suzcfkaqgm',
                        adapterType: '09ywor28oltvmitgg6t8su7h293b9jd4gkuhm1oxifgjv7ukzestfnmgyfhu',
                        direction: 'RECEIVER',
                        transportProtocol: 'uy62smb7vb71tbg854utdd492nyjjupzy76y2rex4tsfo5l2uyht134y3o4f',
                        messageProtocol: '8xek3koja28p59tszarmeoe2vjcfw606z0uqej8y9grkm4tr0g754o78b4g8',
                        adapterEngineName: '8irjfk08p6c88jbliinzn8i54wt0ph4x2a5x5cosaq7ytavmdv3vwtntjwakpj8i7hhrq0n14z7zunhhx9xisljvd85p8txw3lvyi90wdir99hjn28ci4b2oqrdvpxqqomu2povmi5gs7mrtscnake1km3vkmvua',
                        url: '6678cs7w50637mt7jeee4ctx6u8oi7inq2t9rp398wa98sha1xiyjfhs3ghuhcftjyxsmsdk7ni8nzmbt8qqtqb89fqirlb69u2nmcwrkc1e4ieqljnf7in1plyq7b85xh2ss1v9qjdts5awc85kcdyiliomrtpixmeka4satv8xm33gtp4b459qcphkeqlsjfb5t9rfog8pw79l0q8bwzw2u3ejc6dkct3ybxqb2qk8mqz056xyk5lz785m0cmq4lljri3onz8rx2bpmtnuldxhttic1q9fif4wsb1pa5xmf8iciqwj9fhqrz71fp2b',
                        username: 'djlehinnlcfzw4wi9cb6llkj2t40mln21gwkadv2snr6zlbpzs9y9ywqo9j6',
                        remoteHost: 'dvl2l5xlcfbi9ghoeu245f1bp0w5xd6honsn50vr7pxyah1qihppmjz7a9do1fx11ytmrngsx61985f9k8x8pd52admo8alk4uvjif9zzigprbtw16dxa9hfg5esv3rf32do422n30y9m1qqkfpnacm9maj7q6yh',
                        remotePort: 5373018288,
                        directory: 'vhzcnwrpcljedkiykb6qjv7i72yhjzlg5z7cn3owexcc8xuuo9khs73qarp4fez0dgdrmrr33onqwpftonqp3xr5v3uor1gd34sgxdjrt9h01l46ae1ipm2x7ti3hm4ptq9he626c7bq9s0hl0y7ag8y2xspamoymtb5axb0f7ug7u46goy4ipi035k3kko2mq7qmogldkp7ouyvmsqd3x0ccww2syud8el9z41qodhpqyz1eenv77mmyu9rdsk4btoogb22ac4tkp1kd9v3afxd9dndo036dbnbcpk2t92p7ksshpvkadskrupenbhlzgas2ki29piu9a4vaydc67xdn2s7r3bwbsn9522d3ml9rhi26yf68dvn08g2olhilh2y3ly2g2o2x1xdy08ivnanahegwk4p718je1fnskrhlmnr14jd5hatc1zbvgzzfvmtt747xiyrgk3nos5p084p5idxl72n939t6xofb5thiigg5wzvjyym4qjyl6vlq77xqme6o2kw8jfvy82zxh2l51irj4w6cuqzlb3xklxvie03dgiw7c34mzob9wmscjldxh7gzcwom7qrqrtiga2m1tf962qxfosxphrp6utvct9m8inbjf0kdhm844zcqt86sboprbxo0wnvhzrriqxn6uyb1vnesas1uwwhbfosmf7wc0bi08dzn8fkch3117fc94mtptn1cltxn9n9xyd4kf6mvfz4ck4z0rrllbbv0gyww9yf1q3g6ib45h2tam0odye5on63iii6gxafiz9nhxd897gkbofx11tcmud5dovqjk33zt29xyb6wgsp5tzater5v58dyprsa7y8hy8he8hxzy98ix6vg2fj82utnxiad73da3o18bp991gklssq7o5ksx4ik6rje4tszyv76pbapvggxewtbencybv31bkrv009qdn39mgelloe4r51zh2c51byuykj1p3fw6wzexbveyurrdbmjm2ysbl9j5vwejk6j0fviamw0v0u',
                        fileSchema: 'b1bny8ycxe0yej25zq44vmgd7eaprmpuwvh5n90y1f99n0mk47xeruj5swalzfaprzf89hv6alnrimzz3ws73ltjgj8xficwywnfc8wp226rs55h5cs4am1kfb85t02w5brfiu6brukgf4anheb6a4982qihewpjqj0ar67y9d35n5b6xarfwc140vcg55sp4j1l7nr09t8k52lg3cxxqo1uuv1wo9l546ay3xj508de61dura70dnn13tldert2psyof88zxolmfy0ud4verna4dm6m7la561fafz3x3e6y8d2yv0h1jrc118y5m2fv5b068t2vwsg9c9a2m7upj9c6tzqhjkcgz1c66o83j2rtd8wg5pw01o8kga9ltab0rql64p5rjn65fbg0exn9p4xneob9qh87jf3ex6enn0d1p5jbxlqbe5wmrgm3bv6rigqa2sblftxj1whtvyoxnhf2aueeynn29yredh4a20gb7yaatziz5nlqipz9xvuvcincrw6yxmynklesp2fvyfuj0sms9rvmt3pxios2t9if4o1vba4l3xdblwl7ufzlmsvdfn06xnivpg8pk8klshxfce2c9827quxd362e2qs3ygq1n9jzmujz1z5tb60hhbti1hxj6f277bgbiy5m0n9jr4x6u3hcxc30g4b0xlj9tpp6lh79pi60w2az3csxrvpi0yud4rwzozwz62uki5obhmyxuy77y2ypon9bkrbhid05dnu8zhspacs8zj6kog13osdbm1tzyzwg70n9ttt2x4min500l1ic7nupmf6k8i7hdg313xrwora36y8opnrb2rmjaqj49imhop3tzq01m71ebzt00dgwv0ap0ebq8vg7y7si0kb4b2v64twdvk2ly12emtrh0e46op1rc2rdjg6v4fbini71x2ibc1zqyyt2zfusi6m9zdcbbt660jpn0nu49exajyffmpd98ycdhhre97i7ou7p7nk6r6ptad90u1t5s8788pbrt9ky',
                        proxyHost: '23cox98u7sbnepua01li66sd07r21aaacm4d64vv7e5lin6yyd2vo9ddq2ul',
                        proxyPort: 4580126487,
                        destination: 'r3v82r72zvie6bfzz1uj2f0myxcu03pkpq0ky0imvii2rpz7zhhsb27d9nu85rav62r4fjsj1i65an5krc71egx91o5eefgfqvpjjafoucy4j1vuv2vysopd64bm5fz22ohy62a0ti8ctdknow4xde8ifsrnimfc',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'vq76e94q5gazq9jcruo5ggy1jy02s780mrxsz9f4vh36v8a201x3cami2nxj15qjszaica93bdvq6o48wv2wwf79vsf08reg4up97m0do44gpz7dj20cqun2sqmahrwbeb146cenzzhr921t9fvn2rhfhqxdpape',
                        responsibleUserAccountName: '9blvu7r48hwd91jyqciv',
                        lastChangeUserAccount: '2yw0a9qqcwig4m6omchk',
                        lastChangedAt: '2020-08-04 06:23:01',
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
                            flowHash
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
                        
                        id: '9343c62a-8471-4c7f-b50a-684143360b12',
                        hash: 'a6ozz34sewtpxf54t1eqysog78y432rrmy7me0mg',
                        tenantId: 'ee1eab2b-897b-4450-9475-b9702c3d35c5',
                        tenantCode: '775clo82vig3a651w4qme8t3frwyhdljr2l8srr1v3bwhdx8nr',
                        systemId: 'ed4acf7c-f224-4408-bfe4-408375cfd2fa',
                        systemName: 'evz8bsdaac3h24h1wi04',
                        party: '7s8a0me51tycxwdbd677u2wwcxrndyhzmcuj9mwrf4y85nmwv1tg07aqftboxd1d1tnik2s66nctxps81lvtarp2s1laws007m6mvgt253c7mwlbg5sgvoh1eqag02k3ecsjcn1ulsfiybf4cqqjdgpxrnmg5bj7',
                        component: 'zuxkaevohawguztqrqgi3nny2irmw1r1yivu4y157iqkcc1ejrbhqynnaevie0q4u6wce9rjuyulgq0e0uocg90cg6swdnxzsopgxdsfpdyfkahykcbzz5bs6pyf67quvgbif9g6eyhdsz8svzpticlp6xqpcm5j',
                        name: 'ozmco3qcbyroz73k2eo418jn4ip3f3is15pw573mjujhdv7aqpk20srgu2yy64hfdydpptqygzv037225iaqkdsa9waam54gqnzsmsgu0wcvjdflukfpuqrch46by66bzk1tmgb84j44vvrllbsf1qpd7eji697y',
                        flowHash: 'imbohm6kgu8xvtbzb2hsjolrz47ooldlnxy4von6',
                        flowParty: 'qykq04pvuam0pzfkvazvk2fif5ypktkcn59bgx26uvtv1nqevphrrop62svf7qpcv6e36bhxyprdtjr5kzie2bgoju1nr6gc7rty3x0s3l557tsozu1e0bv57qikhatvdc5jyw69dwfvshkvio4rwes7dogef3yy',
                        flowComponent: 'vaqcyefukix9a4bubjgya43q047kmr2o6pxbzuj6ejpakb3z387vi63x7qcljd3uf086mkp0xsi5eqgolr1n9c7f09swy32cqeouvxzxbjap26tek2cofj701370l1nl2qpjpjdr5p6k5zbmus43sgar78pv3j4f',
                        flowInterfaceName: 'emi6xsf51kb7k8cw78lt1yrlt8kiy5s58098lm3vld4hixprwigcj62gn9u0wnfzyuzr0pyeu7is3y2bsb0f0ec7n1xteblyyb1fqcqqmi56ah5tfja4exbaq0negi55jxg01iuwwg4nuaqv6o0umtii4hvfa7fu',
                        flowInterfaceNamespace: 'yww2jkwyyvjjbdnbcmzx1boiwnpc4qmkv5ll41ejm49t8qra7r7vtpnv5s5swccox5j80uyrlfna2fcf295wtjwymusfz5dbgtna9j9wkwplj93k284mevo7ng6u8qemxcoeaie8dx90zrgdy9ceq7obiuomxqin',
                        version: '35puta3g8smojdvjv0f4',
                        adapterType: 'wdshaetwfmfu7k5x651huh9bgbfjq1bx5jiwjis7kkubblzs580cn33mdcga',
                        direction: 'RECEIVER',
                        transportProtocol: 'vq9thrf69zfqjhelmz672w7l8fkcc5q7e6e27od7o9882k5quz5s27s8ny54',
                        messageProtocol: '1jmo5zl7ayvsgv9mot1667h860qt5vte4maow3ekk1dr4jbxlslzg1l9os56',
                        adapterEngineName: '0jqnr9w6azo3fc9ui737knpbrc6m8dgx2331k8br40aumr9h1awwdinlb0fyend74898ol5ch7dzosy897nbjg1qmvht5um2hfctoooedplthl7hyq5ilrl8ybgv7xydir7z83u5njnf83ji1lqmzn36ugc0n070',
                        url: 'fmsh0omng2arr1ljb2meh485u6ra50cvp9ipc9g88l4appor9n4jxb0gp48b6kqe6vd2hcxi96dfyelxfna38rog1b04ibnu89q92zu7pipw7ztfe78wzv68aof1hu5h7tr273qbc12uljtxj5k5vwf6daa49s43tex049cyz2zmrx3ce09zrwkyn6cigfnt3zcxzldnw3d6p3sg6tckpgb9k0uhqwwcbiui3x98dez5sd9hgmlbpndzzo0iefqlursho1r3muilyalb5sfde85zhbioubb6lxc6ipvgtf0c40xf6mdbfvt5no43raqz',
                        username: '67wcvnut6zzhapofjy3mxpxndl0suhxxaywwxv82bgju4pdvrmz4jbdnhdeg',
                        remoteHost: '2qq210pok6tvzvwuw6036b3g1oznorjh63e84q6012298lpg4ni25nxofd1ytybb3i7l2gxfs61wwxmeu5vjivwhsiaygqx2scjykef2rpes32sggud71fpgt1p8xnm4ruchbauc4ckrk6hsugogr61bs10z6vul',
                        remotePort: 7239937959,
                        directory: '94y1xqs00ly652uk6ceevzyaqxw15m92pgqimbltw8anijivufzrpaca2bzjwk09dfcy9wopwyd2ultiyyyeuor9qzneiajcpi16kkkhq3btbxp4b5m229w2pktc4fvjygh6lhz83amh462e1fuqs63owpvuae8d4o307xu54g6sjjdwpglex83ecv0u3fq18313fk6bfeuzoq5yj1205zr70berb7gfjjsszkobryp146gvrzwvhyrcwkjpzanz7arb49x1c5g5nivqgk6o2dn1ojycota2lgz9fdjli9i174izkxa0yumu1fjro95ycfdl4yq5t1zy5aiyzf5qe6h0g6942wjhqvukeeerbf1u6xf18edl5t8gyrdidq797njvjm46e6er82owh24xua1l69u17xmlpyu6hv8l9zgixmd9xt9l6sjglvom6hwz3qj0lve6npncanrix3v6ddff4nce8gc11bm94c8y92bebbdqz7it30i794k8im0db708jahfmwhew9s95pq3i3q4zq9wc6i1m2wskcekwwmlvf9d2ywy51sz7sdw9xoz8zvyfbup015xq0y1epahm7u1fy5exdtll91augw67tkfxiwzjv60hmad2qlzqgaiu7l0959hsmb6ea2xccmofm73tj0i93xw17nualu4g9bkinnlrsmrkp0wqk5gpvtjvj8i3iu638zmq9czvlsd26ieg17uz3xuuzc66pxv929v090s9pe0c1bzb9v5lj0yijqan8ow3ge72iv9lcxrotrkpvpzlyerokvol3lx3nwmxq6b65cfc7s9mssj5ggjgr49d4pq9lnzlwps0564x2dr37ch8lmavw8f4qx1gy4aepnjzun5k1716c6kw5stnr87intmirriwof3ou5bpmma27v7udxmeodaxgq11d75onwtj8zffpxprzv3w1flozflucinv6qs65kiqpiwp41rl4vp2sthege3sgcu12ntg1pvo6a9w0btedgcofb6',
                        fileSchema: 'qvyvq97a577i8fy16w9ggy3dv2gg2x9h4cu8cgidgwyvmo23lugr0xfpjbso3fc0pll8s0affr0glzudapcpr556d9y269z2hbjmca6r0dbc1h9pbww1i5emwv5s94gd3xn2ak3vf6m2y4cscjlmm9orttnjjbs14wsabzfiejppgdaeg6jk2oem85xhaf7zylccvb79n94w9d9lmoxyg8jz3gjfil7pi0m40qtpm4npjut420rb33tcarissh0cb56j7yfje9y2xwqxx7192c6y97fc900jjmt0whkn9nwos047vcmcqjvckz22uwdx0lspoljlm9xy47nr392qk2gsdxz84ntfakv2iwqgrsgl11y7s65l3ljq6lbcvnhy5wjop7t4whfpk6pnzmi8a4h4f018577k14yb3fsyto0edewn9tm01blpdggs6q0rxbph72brgp5gowrhhdjpqu1ql2ao2nzaxxtd9mymzrjk2lu8az1sy9efwg8qvm3iyh7k6akoz0d5rvol4rpvlyepsfx71mvod6teqlkjr7exj2npe2u4h3jvfz3fhgo0r72e8f13g0nwygcw8rda8w6r1tw78omjde0p8dpbinbh52qzc56z5xlvc6d2xak6ggep0clal4lqmi8m14bsfc1l8f0jsjpv2cj6t7hgaftpeidw64nmzy92hlqws4wi2tej0gosyvrlf1qk364qxiwiwyo9o2ajx1b1lssvr7m8ot3azminkbfn7rjx4imtj4wusfyeg6njm5llowuodd6rnzysj9hn1c78qwati9qucnxve8ej9j2ojom1x959nr6i02ao6mojlhm7mt3ha01se6fitympbbv1fhs6hld058tunii15zfdw7ul1nc5l2owso4n3mr8tk7a76oopvb64hk12s8jis3fuw2r88m9cmrdefxdggs67m9i84jdgoe8go4xqvof8uuf8uq3ur7w9xd2g2v0zby7r75mzr0z05h81dv2lfwqu6pv3z92',
                        proxyHost: 'frnaklsgqvxost34wbxsg4e8uub7x2nr19taiicm4gj15gpe8je9q5kj48m3',
                        proxyPort: 7680026091,
                        destination: 'bft5vj3xj87qdff0lrljqji20g9pov07jd8dsryr47lferxqcr8vdnd7m2wbh134vk17tii1499lxkl53545fjsbzmsnk2tl4wrj72n7tyxvdq9txamy0hbgxinjoahk3cqo9s8sr0v61nxd7e58jimb5a7iu6ht',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'z3xf510wwoga81obvkmemin9bavods23ku8k9avkrviomkplgte33lrz97r2ktdpulocpjckhcyzix8f6cl4uxomq1ak5pfs6v0ppjm4uoua1umaxk8oozjmm1lj8lydyzi1lttm840gyp0vgyvb056jfeiuhugg',
                        responsibleUserAccountName: '6ty160w3vekk743to1of',
                        lastChangeUserAccount: '9nxkjfcevd960qyaurlq',
                        lastChangedAt: '2020-08-03 14:51:18',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('9343c62a-8471-4c7f-b50a-684143360b12');
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
                            flowHash
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
                    id: 'ade799fe-24cb-4a9c-971c-04414fbdc0fd'
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
                            flowHash
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
                    id: '9343c62a-8471-4c7f-b50a-684143360b12'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('9343c62a-8471-4c7f-b50a-684143360b12');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});