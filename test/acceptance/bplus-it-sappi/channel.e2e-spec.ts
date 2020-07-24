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
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'f2g2rmu30oskcndeh45om2j8dh4a4mnlflajn6k8780341ghxe',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'gtt8f8qunqm1wxn0zeej6erdkarlj7nhaf6g69inx9aht5wafztt98ik4s5aiobn26nt0mjrvzn5ojkawl2whr8kair1fg7by71y5bnqmgdjqeybgxl8guq4hhtk55ftvroeozuxuqnkf5fgoh1uqwni2x6y1sr8',
                component: '9jp25vcpdvhr9079sy859255u9je2cg9tw7mw6kzi8pb90ag30pz5achc4gwv0o864sptjtkfgyjfkdrx7uovrzl6n5ebh2wj4t8o15s6elvpdyyzqjkpqehh7n2om2t0yb4fzt380l6y73nq2e8uhhk4fe7za1b',
                name: 'segq0925ocey3ofsmhy5d6yktiv8wlgyu372kby7v8q1x8lnlwzt3g5dd1l77dasc2tq9r40h3dmcc6fu48zkjibk7h35bvy91ebvmyuq6n7ehr3wlwxmo2vybomy1cvkc0t9wlglggtjvk9jekhm3njfyhm0o0j',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'zm46qsecu00v4z5ii5zdrnropfhhhfhli9179bfmx8stt6fybbtp64djy87rtg5dzu540w6cl6nyn8zwxgyq9dbbfxor6w2umqt2hp2tb17512vc54bvxy83iwao2rqyrvm38l4um81kh6ozvyv9h90rtnpgyw8v',
                flowComponent: 'ipj5haup2mwer8dr9pdo6riwu8puf75upux9gvv5jibzfbpdz1ulsg0og3jaf3c2yf4wyo5vu6u7sftosv5sjqud6avsf7a6ihb2e28hr9obfbx2b8uutpeniy1gyniidrlrxv3bhleqam2cyjyidw0g3ghkky99',
                flowInterfaceName: 'ytfr69iam1r9fdfs1h1e1cxxnh8o0kuw4y0xo8ox0guf6v33rmsngdy1vc74s2dxpoo34nzkz65lip823dwze5bysbob1s8ocum4ant2j2k5hmd0rq2ovrrnhq0x0d2yun6oahqcstsepeg05is1er1x1jm5v75t',
                flowInterfaceNamespace: 'xg23kxl9majtpzoemzwi6xrpmbft8o7mczrg7vvd9lmfx1q86pfqbzo3um8xply1mi6ra9vte5cr4kd17mapubzf9vlb30tzyrskzya4p6auizt7mmceq1znmeav709sg3xxbqa88v6d8zd6ergt9kqo54xm5omn',
                adapterType: 'n49m3hx3ngrku9ynk29qg2qc5molsa4e41f73xgdt2wkmv0bcqumxqxa7epl',
                direction: 'RECEIVER',
                transportProtocol: 'e6lqardwd2k747t3res0j8di74w34sw1egzek74zqcb56hperielxo1sl62h',
                messageProtocol: 'e8ejodnoor1uutwdojky74jddrrzxcjbrmpl5pdogp97gna157h9eew3hd12',
                adapterEngineName: 'wpxhdcwx3mdplplug26on4iqsf2v6440z489ll3oob18gl9gusid3nh5luovn77qqg0my8pii3uww5h3rwssaw5kplk8ukult0g51g7rso2trcbzpwu893dhviq34ugxjlg6guemz0rje7c2gt367lg5ck699k5k',
                url: 'u9x5z0118dpw55w02mlhp1oplzhkjbrire51qyekrdgpcnxgpmtj31o6ewpbixmsmpv0g70upufartl53ystx6sgi8p2zpunq0afds3hyod36ermdk4g9ni9y8n09vl4nxsuw0ms4vg1a7je9dr914gppq4z6gobnogm20zz7fz534avjfzah66uwjmt61ub8cah6v0z1yjadz1reghc9lxw37zjbl0xo1fpaxncbp9omwzstfddh7og16karcx7jiiic1rhttpw3w29roa05yyghsyfve1pxpgr4qg3f47qu6zg40k0mdo50xi2cmmg',
                username: 'oceplwmcsubgg5exjgxg261po4ndgh0yg45a4jofbldy5jdil2vkazr47ofm',
                remoteHost: 'zxng82uprg6ytj6yal4p1vvkcwyrqqmzrsy1ojt4ie3cohql630nt2ahq7hqj9kdpbrx3era7bgbpzjga8bz3rbuf6lhph3kwpwrv56ne6ouf1rbfldyse5kopk19wkgfosthgwq1g0vjmtkf06f1ssp5hxyei7b',
                remotePort: 2209994405,
                directory: 'rneigiki3yfvosztm7zoq1q831xhnxhgb6tta751786g9jx19c6yf2iuzvdm9wkaes97c4wull2aig8175oj41pgoylldk32sfz1d6v1ntafuzmpokcta2hex2ij7ghfidn2q63s7rqf7wnvgwfbo951v6kq27uld90tj1t0qg0pk1mt4llf0lxgqg53ty9unpf0399ytigmua6840yzgd7w1ambfes4osfblr8nymubldspm3nj95jsw0bd6bp7qqt9tmstp9l6kbhvitl4j3im5iiqysh6a04zomzmyrcwcs8rf5m588ocol5cjx7rv8mebxcie2xwec8zwqwc2wq1dbyodce1avibbqcnajsilu5sd9yl550okpt3612uaolxc4h0fictklnm60xrbydjrvq1z1o8swvexn6zdqddsht2uwbl21y4od13ee1vbgwdy758evxkxbb3dpngkntlzy0hs1m9fws1a64p5mxc2kghslx97uaj3fleekg4u57mgtuvhdszaqgb260u2rgqbk2ojfjbrfv5buyfmjrhf2q75otnli2txam2jlvc1lj4zgc1opnexz888ij31wxtgzyrhbesn1kwzcadd943msiwpk6dmabs4ubyade44m0ndsgg10f3qze59sdflqs805xjbutgy6gv094wjfufcd2e2g3py6mf9280ewevodc0umjgc8xa99j35fpvvvz6h119rh3y6cwegvajag3jt4nj9y53gspany1a1px04rd17qjfae1dl5yrzu0qp95jghgxdonzhfrkg4t3ep580q7c3jcu5r6d92u7ckn8t346zf00hqyvkcdtturpiwkl4w4ql44m4703inr5lrvxukb0gw1rt1xt47raddijosk0z8gzilz2zrb3mx3af31cy2fteb8tn3o38o3z138zs99jvq4se4olep9wlaymwqpqgf7lp62dbu79446k95c3u6ic0dok8ic0fb9ct3s1a6lje7czzydx1o1nbkx1',
                fileSchema: 'v565r7n2xsgqqr4yshpls823tp9969bnlynhc0xk2h1png4lxka82ozvj51kmcn1x72wmzbg8y47jgx2j4cpngcotzoyet77y73bophcpwlf9x16juswahjp5bguthw0927dnffaigpd8iyfej8vyqruwdr06ci2bimb3pcy8dj2txo6mi4d175engcosyr0yrg6zpofc8c6n1ovwq9birc9m8qdoxow5389fvfztro67nnsud0be1gve7wz177c9xn9de4qae8cfqx8ieed90q7d4hllq4s57a38gmnb12zy47c757qu61eafulz444zsp0v2nr5bpyw9kmd4c38q8opt4fn5jvn0xav0iuj0bs2fgekl33v5z7twaka99b01lcwra285tb5xoei7p0l7n12h4al3m87pd0kmk92vl4n65xeubblout3zo99naorfjse3vw5s0frvgmwaglc22qu71dc9jyi1548np0puzqpbw8mn03d47uw6iricgqqs9ur4e28fq9num3njm69dbuzyfas4gqba8wluy4kfz6mhpjkk3v97mvfevkbm8i4ysiklu6w149hd31exv3196e2kano0lzptq4qlpet2lo51ab6cxfs25x4my56nj9jmfobszkhomz7qzyk2vldtq462jv3vlz4rovjmx0s6o0grr1hm3kcbwpnvq0352zl3m01kqfj5lsfn3cxu87amxqrc4apsn34wzi1ere2gtooqq35ur570nvnwqrfmhy671jtuzuuwig9vsu4ybpmrkzfuuixy1ztg8e8mb62e4mfl12os3wkbyuvyddtnt4k08nuh6o61ypsc4l4yp8qxemg0fw03n0amjs64v6vjtqs1m8kecia0pxocvrqjkndrvrircs72edles04su5tz8bn8oigarwieffftxjjjrjggz1h0jhh327dhj5bd2tc5pkrjk04g9aioznbq292l1ob21nlzovfekq8nr7xkbfmtojp4iy2oge7snl7fz3',
                proxyHost: 'dww4s4rqghetgzkghdpeutn8kkcecvznf2qho4n8d5rvokk4hb6c7r26zovw',
                proxyPort: 2185162114,
                destination: 'fj1a7j9k64op6wdz60gyi9sxlhocqb1py4xjrnux3ma6fbxtnj7kms8abi62rqh5xdw2zrtxugaoebve5h0inhr5u02pzmq5pmefswl591rszkx5be5qx58xphpkaxr39x060as5mfbmfb79l77q9lnl7oic1vo4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'f961j6ts8w07xuem7xtw9kr2t21e49ybytc0nsv3jkaa73p0dtzmdk1us38i8onmu3nyoazszxz5umk5m6d7uxh4qvjv2rkj1t13pwcaur1e6nu9u7ir07rkhuvnmq68brb83oxgy3q5f0ujitkqnhcog7uqxk99',
                responsibleUserAccountName: 'camqo1kiv3zujv3x6zps',
                lastChangeUserAccount: 'el9hhg3sfrdyg0ds84ru',
                lastChangedAt: '2020-07-23 21:36:04',
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
                
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '0ro7h94cw14dwluehj18pgqxd454txrnauote79p4czef4i2bk',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'x9w8ssc5517z2165te152vlik7xdflfp304omvsct8v54hmzkofbed6x6b4nnjdj369wfs34lt9dw864z8rgr1e3lx6aqhhwvackfati081izex6qfb0q4h5vw9u2pawf9k524ve8qejfrnqhdh3slrpy3b69iy0',
                component: 'q862ad2nquc1zo84ufk766kdh0s22qoxc9cz5nypdsmxvmysiy7wp9ddj4rcs354l40xu48qcrtosydrb1hnrztuj4s8mno57yo3lwggatgnxccteishw41g5xycvvkdmoe338vapm5p2wl1ge747krn13iqp6b0',
                name: '97rdthlh8uqv6vny89e4bezxpyrgkb4a60cuk829f1hr6v1lemd2ukt6ftyzwfga3up89w4pvj5hdary5mdha8xkcvjy3ufpwpqs7michvp0vzf3mdui1zy7b5bvh42a61xyu9wa6xhyj4j2rikczqvsh9m8zh27',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'ks1ck4p1l9pjk0rpxag2u8jmhsuin5db80fykbxywj57hzlnlpgwcd27qmeeesjlyqzq7zhytdlxgqhacifpzdy7wm0rs0wskgn1byxwuep1kcny25h1ykwh81hl0s9a49kseuiet0cdvzs21txk78g95c9phaxd',
                flowComponent: '41vgxbaec2r17epimqjgp6quh0g0nafqcqsujwjkb775ysk7lhzgftykxirvrn97r8r5rs7fbndbv88j8ybp06a9p6pw5dyanurd79g58d08wmoi4y0m5fvfliellbyzwqolawopt64p9i63z2ek4oz68ydgxlmx',
                flowInterfaceName: 'clpue96f3y61de334c76uv482p3dbtk0pl54t9220am96wa15vuvy52n5m0i68e1oh05itnwumf3p15fnmsj33fxjttsy3naie6oauqhp861unv1xjjc25rehsnww5oep6moamq1i6d7ixs1sohnc3g2h0n394wh',
                flowInterfaceNamespace: 'mqrkm16vjvkg66w2t3nesnxhdzqz16cqp1sizc93eo4ly35djk0b95fz21p2vugwi7l2ina2jxaw22uh74e3982tucci05d2sw6oezw7yyvgjt1cxzt2r05yxthtggk9ceba88195ol337vcblok3a7bvp71yzx7',
                adapterType: '4l2eyl1h4yt8yapbsf7nseujex13hkqdrz1d4xfr4m34pqc5eydcudsby7x6',
                direction: 'RECEIVER',
                transportProtocol: '6t87fhhqc3n9fk4cmzqwwyo50h883a1g0p9o1zglcaxrqqthew7mclvjbj2i',
                messageProtocol: 'c08uyz6xyahg60eksh7eq8s6ymle5cwk8odx133yzltswhwjg1z8uh4zqzei',
                adapterEngineName: 'wg12d02xwai0xpu4xi3vpwymt23r6r4cugxuh4lw7rztwcgr0g6uo0vh7swjkb8p2zolxej737c2ksz5pfbdrtsij960dkbpoivwwhu38kko829jrzjth4wrq0xmoo3nizj6hxflutui59hdlots7jedrarbxkry',
                url: 'ki3ow1tvgo2pq3zr7bjq887d4u506wivrkf6t7xoflxvard63f21jf5jl37lpygy0c5l7a2xymkgggpui3nw5p6yknlyh9merul1w38cjdmo91ivwg02tjcboqd9cep71t0ignclaqdq1g9navyipywdcxdinjpueilou0cr3i1gqtvj5hgjmspsauvfap92okwwvjwlv3w2mhaniqd3omsm6vbwgxtg3qcn4efhi2hitzcgj6y4pvv3d4rgmmhdbxabdd6nn9hjvxj5nvibwpf3d7914rumvc78dnheip6lpjia0bx3l4zcochxdmle',
                username: 'k49brzkko8znsgehx4ermp6pnv1fplhq9hq0r9dh7oq57qhg3gtpuptff3gj',
                remoteHost: '0o1nqv5ow0pb2ya2fe3lqxo2nirv2tcexw9iizkfsgrxal09adt8woj4h5jewfp9wo2x4z52mdend4r12ulr8eheuhji8xu6ltfxphtawgahaf8d313xo03joq2v7ynf2czmvfpu3p9usjf9hze5y5vroht9b3yk',
                remotePort: 8457166279,
                directory: '9v6mbxh2r1ujhr04pv8run28c0mnk6e4pdoc8ifrxmjdc2dildw5j83c7jr0ytdjiq0j05d20npiq3yt60a01atpcdu1qwzbcxkv7sfxj22mv8t5iied3a1ccjfhcaepw8ecng5wpgounvw4c7xdpvhsn6earxfdw30pwo105b0hask57wwm2udmqg1ic4pq8d6hzxjt5gbim1pq2ihdelxg77bju7d59ro8q3zvjy0jcbnn78wl5ww4qwjq0lj1rd1n79a5itv959hxpryrvpad32uj6mio2fudfedk7yan2efmn4a1aa36g5ueqx3gc0shpgfh5bchzgmovjzgnw24s01aco8d9soaq0b56aac7tpn8aaaja2tr8hyrpua83sgte42gy9ejsjxeukqezlzq9v1d301t3p7kthf7op491ekx9bjq4ddrrg6hjyarz3ew77ns8vl7rn0sj0bq6g7p250arxsm9y2ydkjh85gknj5bn6h25adawfjdo9g0by7607ljtr4lc7hyxbys5ma2o0pzpcv5z92983w3csl85pszi5aho2h48h4ve5ymj8unecd0tmcp7y0ps28zpbqo9nc9i71szk0ousvy4l53l1brb5oyovo7sb3lilio4z91n35ngakppr3nw4wd6psinz0f3ww93xkpdb3rrnwkxzh4uz1kaqhdt84rumqoh0wnhxba7qieb5pm208niwc70rogoie72wb6qy39986xsu8du93ml4kg4d7or0xrunsuawebqbw2ko5jbiw0i8b32kvji8kb2a482m4dncztniymbltaggac1qa0vodlwray2cvbwn6rc3988zunkhft48fppn96iz7vxbyghojitzebmn68fu9xq52hfaj6kzlrpc3mhv698tg0757faqf6l8pck8fysgele69207k6umjilnt93ndajswk7wgbh1dlvb3pruhva8twhnzzturotol1vtrzrgtlpvf829v5k4b45ppvdn1mwp7uhif',
                fileSchema: 'x71cil1yt8ky4igab1she02jl6yc1fi3bzct6nxeogo7ww4v2mv0uasxk5237824fcnx22k7lhebc71bzkka7elmcma34ery1hrtef0r3nvi7egiolqiiokbp4raqii6fkvtiradnxnx6ot6zfxa9javx71v8sp5mt9fpasaxf357vbkc4e6t4enhbpi8p0e353c246hon7a4nxdv99r773c57eg6ccgw7a7kuhs1mkf4l3r31b3ayyqkzpjdv2fpr9to4h3gxn11dh1646lpc4vsu8q2m0nqhmj91ehyc2ozwk2xnb6k486cz6i9cppv18t9nobvyhc2kfpfzgccmlhw65o277rrzl2vdqbyya4cq1vzd62pjo7pdufymm61ymmyrlsua2m1ezyrb3p8bok8p025mo4wwbmc2jar38cvbnazlau1y1eu2kk3v35wuxupbz4sxey0229135izc10nozoqhxb3rywfyc7wr7gjzgyuljo6h58m1rplh9wlxtx8ckvstsw3y4ddijin3sq7mlxcr7maz7phtpo1nbudm5350fj8m20qy2wb4tkh6gc1qss9ajqfxpxhjiqf7dlo8ddllp36dcv5qp5i0ryt3lve6u2g6vzj5afopgmjmuhjavvsp35kyb29vb7fj467d12gf5oztc2eclwd5iak3c0uwn4yrz59r4v8qwwmowyztqv0upmumoe47o7m2ufns98zkptc4y9pi4d2zu8j5e2qb406y757hzdlry9zexi4u119f7pd8z4enczow61o0qjmixdt5x3fdb5s4e3q7jz8vfpu4r0osrimk1758xral6le3vwlq2006hxop2f37wenxd9e2byyokip4lsivjxynikqxnynqbusxh5nqa3ctfhmdo6dlmfr27xetsmit0mxjnpyo0ajwo3dsqy9nfh8sfb8qhhzndinhqjoz9pp38ir0tw9lljqos47aqh721egpltq6pzauwimwdyx9pg7zims6jst8tk2ymq',
                proxyHost: 'dog76loetfl96tmng1ys3l30hbky30ok2b4ap7utxevwgr7m7wxert1hcqvf',
                proxyPort: 9546271644,
                destination: 'pz7w6sppqcwiqoejrazhh7xnu6cj50c227jtpngmh7fmv868m0uum9ej2i59hhzs5skjoj1pxhc1l6xesb8av7si0xf0lap2m0mmtryu5qhbt624mobtb3k88t89rtj1uix9t3ag7waemhlc51ks7i5ns9x03p0x',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ou4z7wyiim9i3jybd3b6dbkch9m8yu0af20m6ueztbtqb91etmxp71xc5i6thtpvdqd1agbpqy9knj303gv4aw4cyepvdsoilfit5hf3q83ggijqjq16iqdv60jutem5n1kvx7xznhidj07v3bqap76sg5dbvysr',
                responsibleUserAccountName: 'vxvcvymmgfcrwef0s8nb',
                lastChangeUserAccount: 'gh4ui1a0abcl364pwy1f',
                lastChangedAt: '2020-07-23 23:26:07',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: null,
                tenantCode: 'slduivjf444ni8rsqdyckg53gkbii85ogzcord4luirox0v6ok',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'u4wjrur2bjs6kh12oy617efco5j6qbx0exrrcikokpmpqphm5y8lcxrtdyc0yya1a5my0431ie8j8cmew4v9ztxyhzvq01urdk8960wwb7mx8s2lr8yzpuu9bz5d6ibm7od98onrdz6qxfft1adhyquwvzrmuxxb',
                component: 'dnfb71wkuwkvejxv3bzoi97mx2vf39teit4bjvpdfg910r3n69f6hho94wm2i117x6ptxf9r0ej1zvhjcq06cyf4jwkqdpvnx3c61vfrkszs1l7opz17sxt8wqp7y96mnrivuzn4bnta7jhaxn139vtrkbmd1hvz',
                name: '8cwthz10frcyl1kqqyh1i83kln2t5ppl5k7vycz80o50oc2yp5qllj6doclffn5yggplmuqvfimc4rb358zauu0naeeh8j72sghxodwhxht9lhbu7yii082ri94oavztemqlw3c57nh4ual9ipe0ow1hrh1k919e',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'tmdxy28ydtspcy5omg31i80wnqt6q01k85f7gt2h6l9gwdmhli373haci63nvnv63wttzhgxmi5j043o1glf2369m87nt0nxtjygmjmihq5mkrwoz39qjqv35nnjo8q85d57czfd6kydqz5t391camfw2miuhhln',
                flowComponent: 'exrul6n8yd9vagragn7wiht7j4s7jakwnvmfyq6fhmla1p5u79l49pl2bvb5qqmkhetz4wh4cmge8h8i5p6asuen344sapbp9q4rt5p633b5r4eciy04tfyreoygwpeozx9m6948q6c571pih840lu83tmj9nmoc',
                flowInterfaceName: 'h08i1xagj4464vbmil0wgp0betbvbcrpig3udw3prlgj7lj03q7u83xwhjade1jbob22sjibu3acm5m23exechcrb93o9fy147ljrh2lgmb3j414gvngkgboqxbzubbj2rj28d4mvt687yl1grej9934jscn1tf9',
                flowInterfaceNamespace: '11696nlocc3mksxsmfz6dft8s2uafphbfj1sb0reos1ivocmbgh0e8eppmmz1o4ijxg6w4wwb13aodlchkis7rggyv4nzb6q8hcspl0f60t1ycz0wk4fuejp5u9majn3639kghmn67if4sl7q4kqumgj1s875qs0',
                adapterType: '7c0jq7mt6szc33qpstba2few4nrhbkn9bexrmcc1lwoxl4rw7ivrxeftwksd',
                direction: 'RECEIVER',
                transportProtocol: 'v0ynqvl6v1qlq7la291vmpzitdyc4sivudgd8teu3aj51czfbnd3q4ybga35',
                messageProtocol: '6q474ylliyn6m35c59jhrqnhn0310mo27wq3ksw8p6zpk2tsocjgpge97elg',
                adapterEngineName: 'er72hws09jupkv9wu4k5kbh9yaexixo99ypxhtr55teckgq6kfvoojkxe24dz1fjde3y6ump347ozhbjprrbxtg8g7be7xn7jlh29bovnsfm6x4fwoku38bjd5aq57a54g9n4behfitak2nm4wyv44qdwh33jj08',
                url: 'k4cc09xse6qndzndhu2akm4pxsx0d9wn8l9tm65tg23jtb3o8yl27y8ybfu306mfmowy4aoryodnxzetgksqtm1abf5zzzrfohvocqsa9s1bwgs8ldyon546c8z7gjhfpqazhv800m1inenqq6kkvt2y5whzlb135d45c7u3ufi47swthr73n5kdqwme9z7ti9cyyhgioqas5hk7kw4y697uu3b2axdwmqgv9x6ikneibqnk4pb4ehuc93qlb1rdka103r88e829hyj6gkq5bc9grfcoxr6el6zfeu6uid3khmt5vff096f0w883tsjh',
                username: 'qo0q1yh5qn51nf58z1o5t7y5der4cctsr1scghz49wff49x5rhfe23ux4p1v',
                remoteHost: 'xbsshwqn3gbyczszvc63p1ymneivo212xpmcgru26wo89i2fuwp5pyv0vasov6boe0mpxhq5uc82zxczmiuly509a7juvm9842wcgnao9zszpmnpqfr58co77ge75qr8vxrqyx4idmdkfswpp8cb2iq8syn5nkoo',
                remotePort: 1933020533,
                directory: 'vc7pr3by92ec6zyk889v0qieucdpv1i2fsxqbozcz1akehe1tvvhpdf0q67zk9h19arwyhtxqkeeiuth9heacqizxmkfy87rhbgx8esibqlohjceh4bshaj9o0mvp41jcjozbkt0u7o7b7a2abauk9h2mrd2g3xbfz5njx6a4nzzp9auecqmjnl216dy86qlac1xt06jp6ne26i3nwy3oe95af6sg9k1fce0rexvd4fl4xh0jq16i2fp2zh6eci3bm0wp7sw8exj0owraz6668wwy6rj8acy9fhgnwz06pdywroa7brnfk16lbrpkkij391f9jb8nb4q6w9ixl8j1ck0i4jq95qfuu8o5ka5gyhcq4oe9gkdc30xdk8twy8tsxlm3ufpapt2egsc282ibf0js1da5jufvpkcwddzhztogllc0ojuy3pntg4gihlycey6forfz6gblozhtplzrccisrcswvk85qho4nkn9uph03nyy7m56b0ar6t0ltu1nefjpfcsvte2mzd9bulwnrn6mjaehfkks518egd07xbmo2ll4hsjink1tha08306kbhsf55t49zlv95cx3qtisw3wzdsq3ld9dosih9jxjgup43j5v1ew27pqp0vlyvqkinb07472ym1f69og61gakzfivxfqk17058ojs5ywbiwp683hymal7smintizl11c7satkhsskyrfqeq6occ26gk7klwe3rkbrjxbtjt4w0032hnkudzr1ox1mvwx0mwci228ibetu6eqcj7ci2js9wh4jkmeexpoi5xryepddo7813uyma0h8pre5aaqs4bptmk0avajecq0a0hsiid6dfkgu88ep3j6bqi8qfbabtq0bmyuoo30cjpo9lbgvkcf0emhv8lle9ruxjv2qbnamymnmvfd48ng4vvek3qzvsc564u0zz83sblih4h88n3bo4w4el6wncucm1czy5bdhaccq8aibycxfvul1gd0uxtm4iw804e63dg2f8n249k',
                fileSchema: 'bxnq1lq2ewxxn788riizntd22clob0nwnwjfm7nf35xpz20vfrci3idlq8xn9owqpjyrsmy12ei2wts56vd0r3t1c0f9g3xhf75aex2lh79xi93hkqepxlzidx8dd5n0wofxpmvbjqeo490igiq6yliw7zw92t72s91c78492hzfibfze7oby5i6wgpi6cyxvlyl86a3lf9my2sl39dvmgwzwhmelynk5f40rrqq71u6zsgd8bffjgt54pu5pxt07spz3st5nstpcej38xx5jljacyv8e8ee4ezgp13m131ficlkb12izu3uyqqbs1qpokj2swvqn6rgn3ojbslqrh4x9p99w0047dnvxc1b3c59kq5e0zuoffevsipkeu359ezpzsowkuowspwma7vg08iru54tjd8ekqgn9ov638xoc7b3jie68ieq9zq1pv4u3fjmbnn0e5u4e7gpbv1vnwcs3r09grw0pbsr8yxwkxlqxwv1q6attc47011xb1y1ct2qwm2q51smvdny21v1ztu6tfcg113rhg0grz4fy9jvf1amwjy8bdetr5c776g41zsmcw3s4mtxp0bj8iv1ijch94ifs5469rrgn5ss6fop5ig5fj0cja4ggte2rqmlncfgm0cjooa26ypnfbuqno2uedthmjtljcbcx1ck0npeeqczkyto20mjuyen1zs0n6ulxx8h4bm8tcks0hksi9ef3p5if7fr4y6w2rln49m1obqxfsku636apzeumvd6s8en70jrfy4d2laevx2qustxbcrkby40pdo69kjrkt95c5ti3a0r9vk4avc5y86wxshfdxeft7s7haaqktpeuqcfwk7s7bbg7dloh015n58rr9mn4faxff5esnxyiixzol4nnuo3wnvq0kjcre1a25xbxwl3h1mj32yxvlbw1pk7ohls6035b4pgdm4f89i1fxumalmal0vr583zus8kl4cl0kr792dupgui274xw7x7i1qw4v6b01e6evd3aatj',
                proxyHost: '02w1m4u0cu22qpqin4cehn1gaa349nkoreojxoyc44pshoipwgahb1pkcvvj',
                proxyPort: 2178511999,
                destination: 'jwx13x1pmpxv4pjm9bezvqnc1h0v3letai46eyvc6vta2t25xk2uj771iy18hbd0b2ysmtq0uig7822pi9u9znxl9hptrs6c0up48mh98m687p9drwtbaswbzgiwo7rj8thfo0uieylu9mbqvjfvuosb4uikizsr',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dnb4a7w9wa9slk2k3r7l0lpyblw3s10jqysv5a19tim6keidqem6aky0w8mqm3ghlu8nhuhlys6bodn71qv8tox4tb3sbdgnaiy0j2tlm8avhjbgjierh7q54n6sq6e39w27azgbi6nm4ws0etnyan3qrwknfck3',
                responsibleUserAccountName: '3zl4zcpftp9dih0601q9',
                lastChangeUserAccount: 'zfumwm9kn4z2i80xjm34',
                lastChangedAt: '2020-07-23 22:17:25',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                
                tenantCode: 'ez02btxv0ohzyxlvty7zcfm8i06w98tl9e7ez5wzi6yd71zm4z',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'nzavy2cf62zkuguizgamnacugtas8f0fkfum16md8fd8nztcsh45nek6ocaq4d8kk3adgmv97lfi1jp7vievaxb3be0tddjvk279l5h9o43wxf95k1eyss9hq01b8xmxf7m5w8ky7xde9qbcqai1ycdh2r2mwglw',
                component: 'q6fxe4tm0qbw56w4i3kgpvrrh74m45fbpodz6ifck7qfn8qgbwxdeqtd2vpj0s8zh18z48zqtq185jjfvi785xxtmx6krlankkm4703auwtkvlg61v5ly7q7zn62314dlxu0ecr6qjcjsz9z2khvfw038oxowp7i',
                name: 'im1cx4751p55h1x7rdudzjbhcgqqul80w85fpnyhvhpetzij93v30713jmcupu162meqfgohqvntdncbm87c77zuydws7tb7jtxp6g7khyfja53rvk6bjxovncrljprn9v2dg8rh6hh8c4wnbqm26vhy8a0i6fsr',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 't2g6cs16cg7c2vtfsoo6zwhws0i81fiul3if9da9kjnjbikpznk2szj5jjv2h1b6oafi75n0shoo2c5oz4ej6nvhf4xgx5yzci8zrxmg8cvxgwfae2p6mrf51uo7ql39y1pwryh1xr0kdsq9ti6uxyrjkwqtnwuj',
                flowComponent: 'icyz2k18stcwf0vvsnhk5lmhcumyjqsrthwpa998s957i0gu8y3b59yjsbckm7s5sio4svpxa3bhfmm0vogmkr31bp7v0byew332w7ry957byyz93casdi6u94gy3juuhfrvppaov4ddlf1gwbwinlxklr2iznlt',
                flowInterfaceName: 'in0xtzbhino6q3sgzlfbpkwego73ntabt3o0lgxrskai3sztevz68v5mp460df8fi7uez8d45jhvwoubcsbupcg64qk0e8s6fost6dcija18gdsdm7b3v19y2eizxas74qrq2kj0gn1o2u40d6d2861j5rxhzxax',
                flowInterfaceNamespace: '9bmnu5bct1ndd7hzrjji0alk26k8fdafa8eekpj6r34x81gv0i56htw4dtfomof2jxitcdif6y45gj4vyqlr6rdi05qlbafjo8rd3m2mu8rbyzluyhlsqqtabsp150rt2x8vio76ike0xqx36muqeov653i2dqjn',
                adapterType: 'ty84m4b4mkct81e88weca6jawth7170dfujqlucbvtc3rvlyc9ht5vxlpilu',
                direction: 'RECEIVER',
                transportProtocol: 'z77tatox5qv48ycfzy4sg0dwzq59gyq1nk5gesdkfz6j2t9jv9lzfgbmypqx',
                messageProtocol: 'tg9oi0b3rr41b9vrz15mpajhvm1wfhk0j5nimd0ap30if0c9lfa2wyvendpj',
                adapterEngineName: 'cy0ih9i8l5u0ckz610xlr9ipymmq5cyracnngk3qtxcw3dgimo7g2tzzzxxkl5a2b4zpvhw4o0i5jvrv72ttezatbghwfak0syb712iw8rqmasx6nv9w9gy0ukza7wn087ba34gt4p0zw1ro0sxa2onwhzynvl76',
                url: 'fdqxsopm8koyeu689sarpllq1ozo9d75hxf759fegqr9gq6ytkw6mhitijtz7k949jdg5mfcro7twtetz3w8hxm1t3oqn7xukb8n8n7c75mxofjh8glffp793sonk02xhqmfk0ig69bt0gmxn3r1dknyszv0fm8m4su8xckiul7wyrvfvicffmx82tw0xi39nfn9n6su7v1ztwvk70l4tm1740mfvxr1bixbd2ey6tmprv32mcyu4m98nmb3c9jddurnvbu06hic7arx2pwusc5agxrbeik9nv6ko4jzopwged89tc465gtoige0xvvc',
                username: '4mh693sheow86j9gxw80e2zyes8nym48ptmktus428754013sm6km0piq9kz',
                remoteHost: 'pniv40gdgfq31h7uvvwvln6fa56f8nkrtd5uyrduvo6mm5x080xrhe4r5gwv7w5j60z5rxkh1jbm3kuwpz6qakhr45c6l24ofgx59zr7do7bsquzfzmmygm4nqe51jkbq3419ta4lp94h6bwkx91q53l26g8h1pm',
                remotePort: 9584048569,
                directory: 'foufa2iu1k7o4w11154znokuiitczhzdj57qyfhxl9o10vmlwuvcfljy63zazjvjzpjcj21v28hj8ht7cybaukfshl9qrm8cl1yjewvvjqfc63idxly0wkgcjpy3c32a298eq1wpkwecuvcy3akm135jo0aptfv7nn0ln1xursqirmqjzwzixzip4fcgyokanrcwshg3pbg90n1k10ao6iooc9u1w8bq46cwqz5jqd8myqxbtebqgolxo1c8f27z803m8f9midr7emb0u2e4zhopvxcqp4ex40rqa69osz795jxucyfrdyh476oyrzsuvcfn0i5nawrcia6q4dql7o5ftv11vx42bdjhnmlp7czyedwv4g078f3j5xn0jqlerfrz2zecd7law7b6fnlyn5goermv77ra85rqvtqfkl4qwg6h1b969kqaavrneij2ua45wlrznbcn9d74kcogyycv7l44uanvd2r0oj11pai6mwfel65b08v6k3uvsekrtbigsnp2hrb5z5mkaldfnmix06xvi4ohup5xz5djvogyzz1qz6nzf0kh05fw6qwt0fifpiy205huqcyb4qjpohckcezbf46zrhyoh56yzpf3erz135mkl5aioi49f2i5n5igv870npply7mh7yx2nfeovk2uo6yrswex51x29l0g9x9cboleofiz1z7uauf77qw7sfhgic533e0i69rtnzcilg32yfnf93f6hrhpax9jj7zom54w6rl93ejglnkz743qifuk20glo7qvetqxwfh7jaabh03tp89i52a6m9c5en3tobdmo848zrz1sbzmysxia1l5n353acg5rxlg9hyfigthgvfpd04dj7kkmuftqasi83ubmzr9dr5227z2og5giuu2q5numc8wyeo7axzazrhrdm7s6qhbjt227n6mck9gsja3913nlziddppvki976gxbvqqjuek2ff7w2l3qh2hxk838vgiaonom5u48eia1imkfuvzgbrycznid',
                fileSchema: 'vdvn55v4f7mbu1yt86mc0vnhtqpcdrkempgtj8alwx360q62esum2skqshua1lwj0087sxngvts16k6kv2te0qruup978e59hhxbkef7apr85mrfkt7fbzf0u1wlbwury416xaz96nezv0sgrop0wyxn88dyj8yn4hmkc6lsut3ten1tuvx54m65cekhr24vaeiyph37plg21wxv84pkgwjn77o61m4xoloqi8qhpxq406igtxpdt50pi4kutc6zd91oxcxfgrp0svdhhaefuzxmmzncz4pzser3z9vk5pr436npikcz4ec62m8pn1gn8p2l6edqjeygk3n15yuqzv9bj0gbu71tkigum6jd638y3ymu93mljhcftka9hcy2sbbk369uu45gfov1s2fjz6rzxbtj2q0rng8csrizyab5toeulrnh1avggofqxrzopjytjzauvzso9i1c8pupd2m4iwdvf2mp6q4kpdtoh9ox74gazssvh0j93ij7c3n4psatx01in8etfzqcw4tjnbx5kc3dyjvm2x7a4qj33nwf51nlap13mmndjig0cv3ht6jk1x8b0shdbl84afky6tumitqd1jy2uul5o02j1et0n3wtu5owz5abak4cbj2y223ueldcqw325xzs6kx0tsff726xkqd1xhkgilsnj50ivz4wy7itg9wu71r20em3z4ria7z1dqpcscc8z7cavjngp4vxgjshajftpb8pwzanuuuuqnmpn1ehgdp3sql7txc09pypocp7w7l04rbgb4sxtifnsjwkat49eq6pqgeu6unvdlmd8d0owybxgrzeo5drs3drqjtdutjhby9fcq4dkg0bw11dmf37bn0v69v9kthg01fygtia7h8aakb0w8khr5pym17emzn8l3puskvv8yon7lxmv7gaw7g6zy18gokcnuca3lj1x7iywvs7d6kn9oh24tqeiakckqvxatk0s3fk6q2g26t4y7lhs3oynt0t9fk5ekjfulmnzg99',
                proxyHost: 'rmejzk2k7fismajywn13s8tevhnnxqmcuo52mygas9ixe4bhxvbjmv9dncii',
                proxyPort: 1408649221,
                destination: 'urtbw8ojelfvbd2gsxphwoanbotmrrx4bznnqu1nnb5x7bv5owogz63eoovy9zr3ybvo2x8mmltek16bx4svgsgv7e9yjgvijn7oq5wvrgozjevqcil3kappvwmliy5wzvoox2tm16e9m884ci9qxanwv9deh610',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ap4ellyhu4m6knqgimn75668wauc7573mbyd9bdmfakqkadvtrxshq91p7wn62hdwh7y81xy11cqvvinfypcdyue9j6m761se9s6b3bhftuafeh3q7lsxkdo2jiq6tvf71hwz1aon3hjio39p5yuz9rugyf07c6l',
                responsibleUserAccountName: 'fc6vrs4vwr7fznbh6bht',
                lastChangeUserAccount: 'p79c3l0n8nti59k0368q',
                lastChangedAt: '2020-07-24 13:52:27',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: null,
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'hbx6fkqr0jl13pk9ob4p5n1jxbzcvi7qf7wtra0b3zamjh8hk3kym0ldxi5bhdx6n5qqbkaw4eiy0snyuywszafylogbvdszmkglhkfvpjo5d2k4nf458t9v1sk0zi5qf5faaug0zftyaw6lzkkrmrfz0o9t1rmi',
                component: 'by5wcwogs4m4cw2x0rwh2rw556cwl25krv0sqjh3c9d3x3i6vu75h2l75nyozewiels3egrqpkeur6o3ed2mwas86esp8fh4snxvlyaj3cvlm20busr5en5lgjjrasp0qvql0o6ng9o9u0yvftdctfvufaa9l6jm',
                name: 'ss1acilnvxm7jj9eoftndfngf7lekn6u5x4oub0o75099ya09790xbd50zje1n3cvkjwm90mac69ekxkrwr3d8ip8mwluhrtk57mvb3fg2zynkd8unaykaxammze0og3o597a5j6396z5ypux59mk1n1kak6nm60',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'vok8vysi8dmxq8sbofxc8b3rz5ylb8c0gyvyv8nci08zxe47yn0bp9a1owx47dempllvnzsavr565a9wjiun9274qzvd1qosbz7wqvgt0364zq7c8c4af7ozmdb8kck7ukkydm1xobc0spde12akoc7y3f9ykxby',
                flowComponent: 'vtoc3gkb7yk1l8yqdfoxe6ujngqnt28tmfx4xfdbahoyy61xysbrqiehv3h5jwsr5zcurzhyyzfjby4v9ltjmydjcnouferasottq9v6vbbv559gbx3vnj1ar806wj0ws61o9a7jmyejqot3qrkemu5bdcy0s1k9',
                flowInterfaceName: 'qk43ohp3rx75i2f4m6nskqhqi0echnleptx0ozvif58n97q58ucmrntpjuj7hy1pibp97w4doq3g9o1i58yujmxllabm89gd56eku4qk48emifnw8gahpyn64am53w622pyj6ublxc5w2zcnhtb8o4tfaipq2rps',
                flowInterfaceNamespace: '793ewmczeghd8txbvt73runlqn0dcupen3hl56ffrfas8wjxfz6m88x1dm6mtojbmrlbrj9h2wzh6eavb8i580xp0dbo6g6h6izd8p7j9b2ffgnkq0qk095n0jyfgtic1k32y6zru1k5agrrmdpx5grbdkty71bs',
                adapterType: 'ud2e8gjy6emqitw95m9hh9edeyqhqhxqv4ka1o6hdnbeo8fgcq7yoj9p6zb6',
                direction: 'RECEIVER',
                transportProtocol: '4f8zzburl326k7hx2n3x98u6a2omud77sft798dbsm1tgk0nqty65cwuirkz',
                messageProtocol: 'pzokz378aihrl6l7in3ufi1ottenfm5n66wukxxncx5so70p0h76qv436h4w',
                adapterEngineName: '4hmcrq0r2k1jrcyagdit9q5zi4byl3i8ex7d1lhkk9emaz49d2su9ffxsbxu1b9pgcb59049ih37us6sbrbc43jrf6bf31gaaqf4g7ma6dxwuouzmc8mghqt8cbqmqty7it52p1jd59ga98g40oy0mx623w1om1m',
                url: '98tx6xiqy45ntcjip013ofdmq3ia0h0l5vomwpr6f2mzd1sk423en9b7yzdgnv4ymsnkzpc1x9t1ady351mttmhy0zxoj0g4gzkimmw3qy4p338c4l4q0zs1uwsj8x639tao4a3aj2jq2jg14c5zh3h0660n61u86gdfstrbq7vkw22zx59ng7l51vjt07ikextp3aaou9qf0vq8qzlq88xjvljvodq4c1q5org7vjxlqlaqu4txnccvdntkj7n5sw4zseajjgrurm2qhvbnsn3uiznulrnkcev7prmd4dxi74meqbw2206755kgmoo6',
                username: 'uy275jvxbct01oz8q5ix3839u8hpzna1ecyqb5pu6brx0wgpj3f5ap9tnyqe',
                remoteHost: '9o68wka2gsmvdc6w0cz2tv10v3d0igkpablhk4yg6edtzagfk6u6cegnrdvqvipztmj1v36fcsmgmilbga4ilpvvlxm9ort8bks2t38tak34ckiu268ga3r2ep5ny0t1lw7kqira50tnok925o40ireu0o1hmdpl',
                remotePort: 2590963731,
                directory: 'g07wil2kqpjpcx4o6r1ifq01x3war5svtgtlnlb0japwc6zofb345cdsughlnbl1r9sbptlk6wy8uaz5rgnyik1kw2ryns5ufiu4dnoptmilnvrn97q0ll7a9u00ffotm80bd5xjwe1qq3q3g3ifo6mlquz59i6lbiw520j8ezyd1npgr98c2c9gqb27ue5ingby83jaojmnn1roy01dws9aofbui2l02s90nt7ya299y0hgnvsyvbwuyq6fh0xenq5e0lmy592rohyb18ydkj72bd57e71duhg9jeuhb8qog3wy5oq0pfwt3dm2v3sm7brce798vqjkqi803xqy01l8pjdj7vo8w57iffxv00pnrs0fzk6x0wybhdl8l78cw3vzwgejukhm5mzvcbiza1inir1tke77q9eskchwxeujwnypbof2dw4l1imxpm36236rw6z0qnq25zqcw3udbole3t1mdp5v8aozw9s7dpf0swbu6tchpo7mdtd2wxbhkoru9py2beqkhsjvg8eiiyjc8rttmlxrawxkb9cwqjf2bsp2gvyp8lq4r2c4vop4nhh1746lrqc0ls2gtz1akpdosehr59jhl3aqrb4k962s2gp6ibdehu5jt0ajj66fm27oexis4m0bbf0getpaq38bc6blj2n6lnp882foipapolttslwg82zhlqsk0b2zb8t0woydt8tftlsmcuy011dq6jybj59t5j4uxxyd1tphwydqovh49hnct28k2pzlb305ysw4wus2bar8aoqb6ron3tjn27bftrzjgg49yqomq7e5d044xkm8utvercgiha3x5wyyz590sggisgrcu3zer2elu08k8gs3foetihqe2j8iku2q9x6iie6ngw7j6jkj1dlhxcw3rqvsutki5jo4t33zk0fzihv872ze0vwn7d01vvyi1d8nsffi0tq5cs5jk2obrs0kw4dvcc6pv3vueqiki0tn0yrylfcfvqfy5df4zsaju50t6bxoyzwc',
                fileSchema: '92jd2v2g8u1suh6zizm5vtklgkepjhx1q5mb0v17j5roilwoilx04p67es4pki7ic8ziloqfw93x0u7ooiu6rfj9kh35v2aufpv2mzely31376dw2iv2126wdi9tmkpdmo7918k0qs89fop2o4wisycph0zq40b02awldmr9htzhiyxet4taekkje18aau7q04fx5s671hf5sfnccfu5yk5wcjqtcbixzfbqez48tcm2mqfjaafn55gxpl40fwykmutycbvst24ymrprobqvps6sb8yruz6nhbmiwibu1jm9xhyo9qc2rf9wmpjrw2y1mjuk8uo2z59ndz3sv3kvbgx4gh826o0ga1yqo9sitlcrdd4k44knu44h92okyn92z8kr08e4s40zvkts5wlarqfg5vw60u69btjs76dn78eap9d9dpnwmfii147a9zrj5e1be6hfqfykojv8fh1knptd8mqrya8lewkylexa37o8kxay12dzx7hb587ac9c3zc39ml453yoxcqh63e6f67ynr8f5d1g0a0jj66neo72qatzs4orn77w265gzw79z0mrn13hvzz5kdttllpu5spkcrot8h7yufz92ah3txf0xciejc8xz7x2eb1fk44c3g7xgy8p9yuefxad5dwgqjs65tgvqfk4bx87ay0w4j8y23xm9yj3lintjv55h8xlqwzm33kaaopgi8m7epok07slnjcxki4llayypegxzxu3lmtvrqiq46blo5hv9fyczgi8h2iiq1lmhkojg8kazdbga2kx661854v5zozetg4pqj0pb1w548nfvmqnw6lvl2zk6b73zb4cc9dqs7vq08wl0xsovdetdbuy5jeexmzf53atx5lrnpqoqj5fxn4obmnycj5z1avr01rivf5xcr9f6y0pelkns0xmoulcesip0xeq4izdzuwk5fdcvyd3se3p2vngr2msmn0sry8dwqhdstgmv48b3tkse9cpsbxori83wjyd1ho5ibvgw7nrd',
                proxyHost: 'ookkbhmp94vq95r63ua3j1wmmealyiois427vc2774iahgaespsxmctt236z',
                proxyPort: 5717227289,
                destination: 'v3uav9r594bpqkx674mutk1a20eg58a06v7kjo5i76e3wy1ii74rw09t0ob2ytisunci9zi48dlfno8sthin7bi9n2pzlk8qngtfxjmx34vqaqryb7pikzzglk3iuqe6w6248j0vmgki2o8vp25qy06jo09jx2cd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jvoaqmvq753l8ih7jc8pgirkl3yp57z5rlwuvsi5tce7l93u8kn5r7ch4msx6c69t5ba5935i76jc9w0dygktyxf1kntv4tqfs2dc8qvu5dnb5fqgrr4aqpvv3x1i24m28a1d4epvfvsbyck01tboh63x2siig07',
                responsibleUserAccountName: 'm5lrlw42j2wd1xlavkmk',
                lastChangeUserAccount: 'gawqjwi69n7nkdatsf6w',
                lastChangedAt: '2020-07-24 13:41:14',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: '3hfk3c115cbjs90657fvt5kx97hoy07mvf2ee48sv7te8vbjamiwsf3rfm40hl0l70as1akhic7lxwzxtd6493okcvgzkquzmlratp0c1jft4mcirpnqa3fyjax0xz8iytn243hsww30o5ha8qbhtvtyxwopyia2',
                component: 'a0g637skth1zhaf6scih224f8u4zvqyx0jkruujh5hhfnil78lw5090wq530q5q88ns6i6btvbdu2olg2uui9cdlmmietrwvmhdhl34a95ediyf61ties5tl476hemqgwcxe67g07nh54ufdxd35418g46lqp21w',
                name: 'a4995e283wsu8xw7m4c51glzgkugk1h36ydyhthcf88pacaw6ut45yux0bpp9f7aq0m0udrblj1sikadd8u1ti8gsv8385ec22laz7lhoiyerc7rxjvos8v90sio5nfsnjl7xhf39s04vrwmz7794ege5q444ikj',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'qka3ie67i6g2kjysoku6y58ik7y0evpshkepwl1lc5vdlght4dn4wl39hn6lvk5qzl6857tt87i3rzqxvmg7tf4tghqb9cdqzkq4qz80t22gb99fu4e10qwiyjlw3z6hryxx10jijbqezgsa029ztwqjreu7hr9r',
                flowComponent: 'redfttk8bocgs4ljrc9b1nmqyewyknrh8g4bnxcr0pie2tlllb3x6s0b4tew0cg2oq765xwoa9p4vsf0q03n33lh391317tud1n6boqctu4j38djwdea8b8wwfye8rjokrkh96zd6z87pxpkrtr0xjgdlopcocxd',
                flowInterfaceName: '4w8vhtqo0g2fgcrwincbawd7hokb3wht1yktm0p0vmzuvcxd681ma0keasuptqh1r3zmssvqwqjs3jyk9i5mpylnjdnt87z7uvoqsvbj6emrv2bq1om0yaj0sm8xo3hiuey5557qfh0io6burh7alx7nsbop4e3o',
                flowInterfaceNamespace: 'f5b6fkjuosta8j0s82r8ub77ccwpo6rz4cx0vb9l1t788knuj8na606lytv9mdituz4jvdvasri267mkki2ri9a1wi83zic4sqybrsehd8ujnfk7t13c4ioyljpbwfunoesdjn52dudjmfbr0zpovww4sb1hnvmi',
                adapterType: 'vuk24uv4l8slxxzeta5h4lk3dvtmrfuwzjqvlm9i7t9ivlho1dizbewtp7o8',
                direction: 'RECEIVER',
                transportProtocol: 'uhstiu6a9oggsa3xcluub8526woviv92yznaxo679lt2m5x2uasadp0uk7uf',
                messageProtocol: 'vlpe9gf9ge3scpwqgff8d8mm6f2ndlfez5inb1veskdyw5j0xqh0d7fxcqv4',
                adapterEngineName: 'fzkqgcbjg9nj4l0ifjugffmunbyo820z2l4fbadpa7c7bdf67k2rallktnxletichrvlidl9rgluas0b1xkl801xk1j437cleial4jdkol8gb0zv22sepgj30mbz9imqbyemfqy10lwte9dsvd9pssvcjew13cen',
                url: 'iya3gxejra9sx5ervqs3bhpkf69baysrdr1jg1mlgb7kfxtw8htk7od5kdvc7wa3yzmeae7hb8xcniz2rsp42soartq7k1p09ld342bhvaiwhjkbk6aa5mk6bo2ptqtp1jkk70l28e0eqb4yslwk7g5o6cgbgh68xxy8qtzn0p6ty92byid48bj379wkatfc78r25rnzlrq817kq1yhcqwzlsjdw4vx766tl6jzth8pacutibuhp5oxq4c4d1yvnhz895cc0i9dkro02stkf72i4p3xaty14lx4sbjhydnjfj2ftkjxuisg3c2vdvmfc',
                username: '8czxeccm4ajq79vv8p0ag90zh6ig0ky2s2chxjyq4hqyqu02sf4rthl6p0eh',
                remoteHost: 'k9ajnts746l0dupnbuh9u0y160c7pjlz02kpmafonlen5hggikxlpnsdh9zvcn9fcozgb3wsd4rjfave89v9tdorxrcu42gogtivwl2hcvwk42ox4jwe9uj208japc2xzkazjvf9fhzwgcmk4a9bdq9j99zs92cq',
                remotePort: 7864744140,
                directory: '3hnvz45o11n2zk1tsuf8qtj26vof63lc960t7e628loc49jsgz46ih5euksb63imhcfpgdieuum0zcsihmpqok1jfelc7v9y96p69f1ezfrfgqya25w5lz5z0g61r0xrwakw8eg5vhjs0fbh7ysopk4do17ru61yha4sz1w05ogr81pavaquj8e5jzu0ydv1zpd573rr8o3tbuvjtcdbq26xgoiwwjeju7dz2droradtf3836qn1war46km1skhvr3nnoqc6sar6i6x4nizdfnquze8te5546mg4z92mz56xuwze9cvx9tnvxjkjqyytz3bq12cu116ifb872l4pa6n4rn2f2khbyjzkksct0xfxt5b128gt3m26b6cmzzgiz7qp4uzyemedz1nnamcyeqepqblmn62ptamd2llei45dxijuoep9yijcokqx6de1i2lihixgwb0im4zyoo4miot96m7vwpqzh123gs1tippmlad2o6i15ndjwridh29sxpga183db2rn2d2dxhhvdyxwocuf673pu5l6w1q4nr1krvie0wpz3wurhno7mh2wirwdb8qd6kaxno21qqz7by3nzfb9pk7uid9ig7t6ua31kpd0khdzwhnql4xbo5xf3226ntwynuwj7buot47bs2w1z58j4xh4m4glqzul183trbccz84ylo38bg7c7wmt9vcjx1tknz7dldcaqhahzgusbyb3nu2zo4jn959b3ijuwwaarxxi74rvcqvtl1xbrl7poiman0ughiq2zutk17nx1n8wqf3ip4nnwhpilxfzxx3etxfcebrwb5gj0d7cjc42l13205qbxmp16otu6uxwwg6vr8nvr805r9ueq7j3zfoc0nunyofc4gx2yvkon2g4toz80rbzvg6twu75wees2kjvjmf35pn9darf8fwluebj1g0lpu7rituy4mmbtwcqxq451rw0u91hgv0o4p7gtjz80uy6j5t1vpzkmo8euyjt9clhu6rkxobnn6ha',
                fileSchema: 'l9l70n5vdjqmxipz0hcmj23dk6kei24ohtsodk3nnkxa0pt1r9aigmpim7bbdynrvzyz7c8mn4jp2gqx2k93kiwuf9cor44he4r8gqeqw4e7mwda3bv9m6ocovybaajobsdapa2dr61zx3coc00jckmoh7idm04u7uzn1ryylpazm2j7eej5gci50ey0989vnq3rumv7gb9yo0nidzmslmfmw54i2nk49ho1v14w0hebbmmcalng3chcvbfrh0j4wuc2o86tgwplowcrkk6e6n6anq1on64k7av1pdf2n7pns8zztv38zwza1k2qb6s7e28yyjw51lt7exg4jc4aw2c64jzqr97qk2ngptkvro11rxy4lgduc5dlqh8yphax6olmiqz10qrpr3d9m65zovv2jc2z5mgeoxhg4oo2zfkk8eq3qdmzxvm99o12mrdwcbkhluy80sc6l5gmnvdouu2tyywzz1g7tm3qnjp9yaziquheuu1gcz93kosam0ege98vpxqbuz4ovmh68x4fulzdz27csym16akc2wrikf0bi1rkimmwpwth6u1prwvbkuhpxjrclrrv6qaonqg4b3cvdu1jvrxujz1jy0u4a5x5mu0u6imijjdvkx6i5hbxo6gb0tcrf5b0aoohv7saqgn64osu7o2cvi60sl0177ysskdhk9n4jhdfbx58jx601yupwi1p5a33i61aqjyebhejukoz80lj6byl1qolv3zaq1tqch955uq1r31nshej2y6mb3xpcha3mtuba1ms0eid4dmbneht0y2y1p53h7yfoh059wuht5iwa5pehrr4q2lelpgewvowm21ja1nfu24u4ky9o2r3z0bh10hhritp07nnjiv1tqjb6w3vyh4nodt6p9oyikj8c55cez9gxwof8o7ffengkgmqssb8kt4q9slxowz818m6a3h3exedk2sav3v87pixf2s910dm5o8d5qkrr3hvlhrzogwpln0uca7sfu26me0flctv09cc',
                proxyHost: 'es4kfferdk2fqi0rct7gnheh1feyj66y6pll1aycq1wcz7823axh80b7ji1a',
                proxyPort: 4449992964,
                destination: '3mfsc3impbydvemrwjzqmuk89fzx726xdnutvcpyh54hrokb55jdae3x7gvb2gykzgsr9551kddy7unt2ncsg90e72d187nd33zzov06i70s74gj17mok5cyeyr8ngnkr77jw2wpmp7hlzps9abt4y9smv54i5vf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ehi67pqh2488qf8oss7rsqk8qhgaiiqosydk7zzyvn27jbot4ofjl7dmgnpk2dd41ptavz3bewjuuuud2l39pqwvse1mn005fipd9yi2323f6zow2aryni2iew5rmn5wcwmi2xd4z9bf4zz3151md2ko9llfrvxa',
                responsibleUserAccountName: 'dn97zngvvb9yht66d2xn',
                lastChangeUserAccount: '0mwlck0nted6ta8hhw0y',
                lastChangedAt: '2020-07-24 09:32:28',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'kjxzhnaiy6cz78tvj7knemnyv9zqp0nusrykzk52v45wgh1wgf',
                systemId: null,
                party: 'buq0vitnc0jfyq8qmtpfyv86yidne98vpowbp0xtin62e90htlhog1mjdf3o8h5lrkjohv8ouhcpk1qcz7k4u6uegfjsf177z7fu1d0bjs2jrmgo9kifsml9ab9exsbo03ax75alk3vdotsa00oeg4wypvu5yv4e',
                component: '4mwblpxu5hv3ch35s3vhz0f8wswlf1lnn60o5csm9h9e8nd3hxj0vdm3z5y3hxxk4uz8jqo4ro7eh5ni0cxb4tliuru5sbqplmcnrwp8jc2ld8vv6ahtxwfzymw2dtv1cehvplcgs3onmf5ru7fvl56xjm2ua5n3',
                name: 'qo62g2brfu39qlx4l4tkm3j93coc0wcd8xx6b7qjh1tgzao607mew7m7zdjt9l6qog4uau9pmc7ud41yzidw2gy9wluv5hvbojgcnj6234mvyqvrziabrnyv1eph8fvaq2ecs8e3i20m6ip8aevdeuf39ua6qde9',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'f5j3l5n6nah8kl90e3os2haj5ejsfp63f2yo0daa4y437sfywbw8p2vziljkvd2jezueprzlnlyhxaxxyuu6mh5qoxxynxu5jx5gswon4s0qpcxrrclpj2dv629zmtvg2c3i8nb6ybtscrylxeb1ovlnfgxxjej5',
                flowComponent: 'rs22zxd0xrr11mhgcstlp7ie487yldnhpv50r3m61avtg5rmcatlfpoyl20iwf9w5deu1zajh5ms5j8dgaytl8srwytaze73r9ten4mb8ypi8d35k5sli81pogsb8nvgqihg1aq33b4lh66vb6xz2t1uyh85ypar',
                flowInterfaceName: 'm9xv2dsx3ytglmlpotqz4szx0is4hfqmq9cpll9eatscqke1jc1s0z4pu6cw97b8p779n2o4vvvg3pntg68fx6pcoz86wjz8cd921omudzk5zrkzng4losbaf4d4fa64dhuixxszwbj8o8rs7sffspn60e1gdtaz',
                flowInterfaceNamespace: 'rlxjt7u5ky0c37rarafw3lhh71ghs82tu0uh15cagwxswsbrg9ncooujit1cgdcswzqi49mkjtax1swqcstpdtdp4vyaocogicac0upxy2jvtvggj2oxepr0bab8fo4hux6it7jczzl010q91hp3dtl61cngsbmp',
                adapterType: 'o50barhaqy94qt2ow77sylh7rhincxmbfecajiy5dduogd7orrzo8ocg0tlc',
                direction: 'SENDER',
                transportProtocol: 'ynrhb8omj2pmtysdnnhg9313kxnw3p435kawhmdi0la7f477x9m8b3m7hzin',
                messageProtocol: '91ekj34z3j376gc3hq27ivgkvs42icvy3ic0w4tlpfh019rlvrsfw8x7fjqv',
                adapterEngineName: 'hlggh6pr6oyysri5jm8hpds0w0u7inizkygdzt9f6eztqqauhrgdk88ouvkzv3tf9e07zrl3d3a7djgm85i35ktoohcimlvblsyaxpk32jmhpul2w75v8d9z9mivw2erhy982iqh7wwa3t60usuf1an6auzob1on',
                url: 'kls8jsdnxoyj4m784hfnmirq70jwd497wkjvg2ybhzjgceo5wtg5nj6nmcbqoavsb32shbvxt48armfy3lkkraumv835yw8glnyerri57y6by5osyi7gucfzosxkdo3l2obur73v28roxwy78isdaks6c0giw0ag4m1vhzqy3iyqkxpfgqsl750i63a087wkldlaogomw8jcb5pbynh7adysx3ya3tw5frkylm9lwbu0189jl82gu2huhncgv5tg3q6gjrs8ztt891oviwnv07x65bljv8m48xjg0ea2ovyf621g32iripfqe7siof9v',
                username: 'y2scwnqf38df4glta9el09rtfed7c3w7kyg3mehlkvvsqi7uaeflrqu7zlbz',
                remoteHost: '528wwhizkqcceo96ep14fp4zsfndnyau2oq8kxyd4alit8mixw6v0pbpqygjjr2f16rzfavb5hrai3gdhirecoh64xuooslqn76n7gb1lhj9qnal3o2xxds32zlep5vdjphyfgfut95x2qis09pqt8f0lpu67e5w',
                remotePort: 5211308410,
                directory: 'nctebexq69ddw80et8ybabhw3s5h87w28p912oy0fhjg8bh54pc2gk7metuu9kg2t2cx7jjanh358nceqjuicvsxj9sdzpupji5xvep29l7f7tkwzisy5xis4p32u2c2qw5vnu9z23sf3j161z5tukw8iq3xjujldzmcwovjce1sjcoeawwhect08n2vrbv0szxv3d1vfbkyuxuiilz2km6am89nhuoe4ss2w1t2nc1jv4lu8ymmue31fpeeibebzde6hn3mnp5kv9pr97kju9knabz5vktlka4wvg23jkrnwbhkp524prpkh3578m9oop381jw0u7t1e9nlvtuiph3k1atyxji107hxbbchpeexpbxngpu5u5feqrn4085vg0m6dbzubcb4vgnkfnoh00q7xbjvdal2cv8xg6kqz5k52f5qhp78erl1u1vyb2dzffk024pkmf9arsm4ncjtwhr9u3liuh4i8ld9lq21twt2kuheefyhdqqwsd1do8go7hatft7t3mxqu2yytjy2274xqmg813ulf3lgsa7iutg8vh1wqy5kokhlf3ar1fhj6f54ewzjsoi2bys1vrbg69omzfmdc4a1cqy4ey2rozmju02o2ah0hf1shdra13y6nc3r57sf31zcaem0it3nxuotmkesaxgug4yzhirg2a30nnib1rq109320tp9cg3ui764ef1w79eylyu7qz2e3jgdtzwvdvvrv0sk3oz65v4hguntz9exdyapzav4cxamoqtuv6dbsvscyzu2466qvhgqz1w202g0ry9mvwjjhd8pejgcux87yihblh5u1iw2pmlxvskg375ixxuywek5kcqhw1edboqnrc7xaerqw6qqfzg5izgxbn56xkwlwq091tqgtodpsh6h0zbzabojtkhs4pxoc0v149cj1om1xa1tblktaygku6ufbyb7uqxxf8gejxv7cq95w6swh0ljff8ai8st7ibxnth9eb5g91149tsgj57albuhfvbbpwlw',
                fileSchema: 'incyz1w759n75gkdzw7go8zmxuhsw2x2u7wjkj7tv8fmg97xi1xmelhn2vvaznu4kcwm9dxs5rahijplngn1cc6tz67yucy6ka3h33ar6r0e6hde4pj1n1eqygtb9lbv4xgxov6idnflldo9wwf9553xylxwflpzyqy0ckgs83j8xrhe39svd1psupjzjntdvkum6c0axpwtlbio26aijxr27x5hhaqf275hmg6z3k87a3tlu4hizl94h0fvike4rw3qckwmzg6tg97u4whxi91oaozav20px6y4nz59ublx93mw6y5nkpjt6q14pp92e9v1kc83lfpactjyba6a4780u79v5tcdpgsb95l7togk3tkn4dhiyhvsuagskf4y8z46347trz2dyvrv43d1zsvb2sfr0i2sjcfvwbmeydc521njhg17pqrd09t3whqvywluisir8qljqyz7nyx8herifiiin961srniw79iq2liuskxv1wi8ywmq06hvfn8fmqozbj6tciyjewe35cf1s7smqx8cw2avf2myct0a1p09269zkgnx413qe485yfm3eeze7jw10wq8ag4kob5070idws37zvuo96e0k6k3dn0arqz0enif9y3qimvn85ma6gf57idvb4s5jchwqw1beg3oe2ufmmy7e0tzlxm4dfr8psa1pofc37qxlll73mpxdwt90wnqo606wsaulbbv89zir5hs4zhk1roijufuiebr6u65od9vfvttdyeoaunq429f0shudrb1ertf3txnyzb3sn0m69pfncpmzsl9bv23n2o0m7r0nwby9rrg5ctffgg0kj9idhuqro0krwg9z52l6jsndaheoenwhe96xu759j8wzi361c1dpcjqszhs19ofcqzlxecy6ccnvxd8fc950nltlrs4czttkepys7tcc7nidgyt61etzskiv9vb7hwjjpb2tu8ue2ivdb2x8wvwzoxppaxwckhy2u2wcv5d2lat4aghqa2n0o7310n',
                proxyHost: 'pcll706rntc11bd5rup4c70lp7dvslj0l63o54p5zfc8kbtamnpu6eqiq8c9',
                proxyPort: 9859141465,
                destination: 't2komhacqpn4wa50od7xtfep5aq0dg0vrhcmveqmlzjy64qw0q8aorv6ssuwkytwcwk8xsc1m0dru1flfonux2c4zmqondqsrcbv6uosrrdpi5etdnv3u56pjcwp0xk77mjqtzz6826pchpt4ed2lpsn90edkz9a',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'm6qgsrfvr7ida6re65pprsyxqby7abnhsi065h1c137grfqrmaynrptrovad0qmcbi5nzeee6kcaui9l617oq7mh7c1yi3p124ivfpmydgitq5y9jhu19qtpgpfxtks945gggf66zcupxwe612mwtcp4zilagcu8',
                responsibleUserAccountName: 'n3n349wm93472j3galwd',
                lastChangeUserAccount: '6d946o2vk5p1035iffkm',
                lastChangedAt: '2020-07-24 14:14:17',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '5bxm0kqvrq32gmhc4p0uv87n19bp4w7lzbioeq49ttgklc3w3q',
                
                party: 'k5w6fny95quchcsa4wcnbf2wbh8b7kola1uvyyu670vfjwe49cqo9g5jq0a6zcaz7hckbxup4z1649vn8jkxl3gkuolod6j74c5k0xxf2mox61fy467iwvzj6ixc700exx4x3hibajt459vulki5y4dp79ldte0i',
                component: '6g7wjjijpbw7qw4s4kf4vfjj7o4a0mls9t5ttwboijnq766estzi072kxonjeq5j9mo75vt3o1xvsi216dqqj84nax7efgxo7twryui94vsgw4a8s9q8xa6yd1pmvjajd4fz8btzuod83ftktno1rk0r5v92etx2',
                name: 'umoto0llrfjlqntqa4dy80yn9x9ew4z6haz4iwotwcz0uv6n9ut34bz04z9pwk0o64lo7dae049445u6qfmqdb1e6nn6w1c0o8rgwwwdtjxwbxcwjfmsnlzlawmow2nwxjuioyuarqoqyk9npfe6uthcbco968s3',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'notp5nhh3mh8sjxlvbix4zyfucjs87rmte6ykxabcchsvz264qm3a635rvpdaauesdt71q66jst9hy2nbwl5jxke9g87yx5bygzzx8bleojcteseisuzrlry2kwcov7a771pe9v3u6lt5snfnv4mzf6xn2agsm8l',
                flowComponent: '50f1ajbgm3hdsim8spt6tcu2d4kl5sc2bmm9l2khyx8hkrfa7jw185cjnqlxe7z6s2y77tkazwlre8zict44o6875grk0ypgicwoa99heqj81bynbkzmvpxjpm3mk1jp8ss34cel738brvvvyhv22d6laicxgnd7',
                flowInterfaceName: 'vmwsp39lu15apieafoefafoiv1ykpquxyht2f8c1nj79c3pud1f6pc2bah6i1fod2i9mgl4gqgqyjnxmrft0dwskhvjc2kjqqqq8ohcq13x6bn0541oqull6qwalpkctfkm32fbewh01d8v1k40t3nkijppkwy2k',
                flowInterfaceNamespace: '3aqhw7s6z19xkp3tu2i6p2mbrdr3tpj2o9uhzte86cqa9vbm4ijq4zjster3yzazx0mt4n2rr3d9ga6fdyylan3d16jtmxrzooerswkd5a2u4uor3amwfdmyb244hnzist5lu1ipb9wywhbelemky4m0f3lh5pfs',
                adapterType: '80fhfzls3mfl48d8ahbjd8pjijk674h15xpmqk5w329jj6oz0w7m6wsupvfb',
                direction: 'SENDER',
                transportProtocol: 'v49f7lrnayel3vgvk4nccn99bskz1ywuo4uav8gmwwlqx3l516xyhlk6l8i8',
                messageProtocol: 'mbivzng6z4l419i2wvaaqyr0iy0838jv55blhwy3ghbs2x5pn55khnt6p8um',
                adapterEngineName: 'gy12ulnzqqx3jzvix1gl32uqbwbwe8yidb8yvmxpqtab66ed573qz1mlo3t59ac3hyah703gcdz03jpzg6vgdvop10f7pbjnnt4muek38doty8zvxkhvjzrmxo7g561919elc4aj4zhddtyn4b46tvhpupu68zvp',
                url: 'opts7bov1ls4zyncjaefyucgaxuvrzv0y6c64mtag7pyc19uudp78r4jt3npk7985pb165k58a5kl78sal4ljt4005f6iap4kx5rewoz78gb8rnkjsmxjqqmfr9gwojz4yfr766byno4wciv5qter55j79bc1burq04bvzhciv6kwun6l0usfk91z7uhuug259ushoewhsl9g0fvnq0z17tn6ko53lqd84usddavm5j5i3xm2kkz2rkyzi4h1eeiu2esloeoey05khfpgv24tpsudu46qhzndv004mk36rv36e8xw2vaqu8ojti145go',
                username: '91wd9vbhyv58lwr0g586qo3pv8mxagenq8fcxfdchasm7c7913a1i3xwdc7n',
                remoteHost: 'jiag9eqvqrq4yxiq3dan18s1ntjfkni8ghxgtlsk1agkklb0hwb6lk5w54yye3adnt4aw0qvslp4grsfrl7cyj0jauhfpgfqw91s6zqk0de96yr4jg91tr3v81kbvv8xwbhlgtg79wd4sow3yps4vp6h2yniickp',
                remotePort: 1229272356,
                directory: 'pxqm8whp2mc46b0wpy9j7lv086yfem02bdxdwqd3fdgo6iwn51cxyzqd4jin4t2zwkyxo253ipxqejz8ln0bkx4n4bn74gr1948uxnkqgala1lczd74oagnpynbfymas9lq018jjdjgnemzgf4f914m66979vjhqr0s0dt0y5v4881vzrbzjcw30ek4zknu6paicgbopn7pmbd6cj8dzwcjei2oay2166npwrjy19omramlfe3lr3raym44f14v4rlxhm4p1u4lzwcnzd3c9hvcpsdss3fbtse15py9vipa0kb3d7ivqoe3s6b7wp50z7p2obuqpu9zxtatmgnzdtn34hhw1kga05hbo2gwhbxmzkz2booozxlcvdqyqw2wssfz65og5k77bln7qidmtkvhyn4pf7ubpgty9yt15k14rp07ln5nhiakhpixlo6jeo0hrqvbp5eof1vcf45e8k0stbuo66mk13ipg4pabpeqeqaxbd2rlh0lmcqiqjco7kgsir1e8v1ta0uct1uarj8mtzm9xvmz5m0nv60j37ftniychlyahhewnrz5kw4sus9sza0ijzqq0i2onu0xnnfl17xn2t2epjvytr3l3sg5c4us0xmqylzynbt4akqy3d72luxxm3s6zrrtfqpwpbycl1hr0p05mvi5v59pjdqj57djlxtfrnb1o14plt8p4gsugsahoprgnbrzpfe53r74kxgs6kzn35667x17etcf53fcbs8y0bezxam49t01xip6fgwsgynvmr0r2d0dlda3ier65axfynuohijdaaehm1lzofmm0wxufsdiv1nn9bwhhyrx1s3ucmfn5h5il23zwuwk8qpkqxt8nf4noqegfqnvrzto8am89ejf4ed5cb4htly78q49pxtlayp3nvw7bnz12sj3lno35ms2631e31olra9c0gbdde5n2v2v1ja90287opuyav047d8r5ebwt6hml0jmjbdl9jjwp5ogwofh069ph9at2yfgearcf',
                fileSchema: 'cxv2hl82s5kpxwmtm608ql9hnyg5ptoiitovrx6skp7uys3wawut6em92v0yc5s2byj8t4mwnwq7buvg7qdnpdqbnv20p5cgmfs4gy5sh6du9hbvtgzjbc177c6yxnv8jemnh5zf011kkgid1wj06mg1ljzpblnamnpn12mubyrbal1n97u7ybr0pw3v5tmle6nobz5kgaiwecxphju1grrb1m49sy7wlx9ocjxdick455e21k4krjw4z7tko5a1jjjyt43wh3l6wlalsf5hc7th3ikgutpbxmp8op8joierhjutc9kna1lfk40zni0utwc4z2pwufchftbqpio2h7fg8qykp0qb9n7d2ueg553ehfdyshuasackcnxkcushkv5cfmntqo5bhd81l06mmagjfk2pn6r74m6czqqphp8a4gi6blazhlo8uldrjbnrhmgpfycn2kf4m2eqhmyeu145zod7tt56616ukfz7rzfs1k082tbf3kmisoool7c76k52ug0tv4i4aj8399ay7dwhlra14e548by3ts46t35xlov3ebs3fie0itals49583r9nqol0qpdh36x4w4r2h48la6q2g9fw6v0xuqgwi3vagvzs4ak6ysxq6oko65jaza0is9xkhqe92bnvbs6bimquzo7qskxbf1u21hoxzkghrxm6zn2qxzei8itlupkv8qih8a5a09ns3ne9wgn9uz5wo887vzavibljedj9hhuwf3t5aox9trgs7mleqg7zumx83xfkrvdh4qrk2zmthbivywtshihhz9i1tffz0z3jenr73z3mnu5yfeqnn46ygqs16hxesqabzrjnec7ay2k9ncfxqzvvdb1ehz6zrt50thv6ajfpk7lu8zbe8466p9a7o89grqb0gr54q6ae4n2h5vvep0nfsxf4porqoez3nfwn2ywuydoizyd64syiun9jqxcybhlgm2fj5k4m2ckhsn2zq51k75tm7ttnxa1s1kuvoowdeshajky2tjn',
                proxyHost: 'ckyy9xq24idrck3nz734ap6lly2pcdoaiznqgddh6mo1kc9n065emgxhtbyz',
                proxyPort: 7318173571,
                destination: 'kq3j18f99hhswtoxubwjiqez43ye2dagy2ltnpe6ekh2v7zlz8ehccmghvrfi1r553ttn13suio3m8ce3at3tku4b9j3g1h3m3j13en7sw07sbf8r29w0yupslxiwglohmwv09q158537njgids2jain7z0mewn8',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'f62t0tgt3y3ticpwcrk9ib94ym9d2ymzspr9k63qjalqo5f90c0zc5bbh4mwgelydp5z12oe6aykmaa9uppfylk3jak02r3yyzuvpssjnrj5cqm7cafworeq0r6fwkdfzqi29vb0ersara0w5se2ftscm3o4imok',
                responsibleUserAccountName: 'pygsrlvej9vemdt96dc1',
                lastChangeUserAccount: 'w570drx4tx2oxf7ze2n7',
                lastChangedAt: '2020-07-24 11:11:41',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'c6efsbfpnqxa81qsevgfkvjh5a2ddcy2rmfrjajy1netkjbtja',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'webg7qr8vb2uvtqxynepo93w0r1jd26n0sq2oafbe6uomuju4v68cs2okr6jm8gylbpma413o6c043kld90g5xijowzekduk12lx75gwczvmarc4g93g06y4pdttefn4pwpveh5q558notjo2fhwey0dik5eh4d0',
                component: null,
                name: '2ub2ivjd646lbou94n4nsro4m85hsnwn37cku32jqz6xfnw8qy3np9hysjgizomaxoj3faabg8j16uy7b4rvidex59wk7u23491surlha20hnvwelf7oqqn5uybymkehx8m9lbcolfb8fd9swdlrm85gtezm9ju0',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'cooel9o5pmoqisb4gmkd100l3ac3vifpozj5e7tsv1ue6zml8jyskl3im5mruaszal2qcwjhzlmfph5vok9xk0eywijcmgvlw3d777bupdn3blgz1g4r775t9xa4q9nwlxqtptxmaijcxh335mqw8v6xgmbeerii',
                flowComponent: '82zc83gksm8vazmrk1nt0t6jikw3q7zp6tjfu8qcihoz1fbtlg1isqod4tbpydn9zwm4rwjkerlbwuoco22ttomz2f8d8ovp6o5of06zqzz4fo9z0vrfha49hkzr74qd2aeic30c44prtypj8nm7m1flskixivmz',
                flowInterfaceName: 'dch9wzymnbqhr4q39oj7x3pc3d4ntwcits1095j30l08t1ulqk3v00a1vt9jwcf0wltyct69vxcn1vc5js1ngzxayvtqm3272nyoqo7v6zjkgl4kfcnkxyw7rnqrx180sl1i1dao21zv5r6taa18z1l661ln2l48',
                flowInterfaceNamespace: 'dsjjdizufvgat7cias39abs2j2llqrn88dg3ynadx84pu82ge0x2o1yed6kgrhtql1l523u77d7i2nn93xh6vqn0bzrbrpd4gd5sjhf72mbmgvpajod7yxqihi0js4xa1sgyjv5p8frpo9pq893b68sb51fo5blx',
                adapterType: 'elnprcwtgmh906mui74glfgt8q3reob15feyqi74m1zcraook59kuwwxvxlc',
                direction: 'RECEIVER',
                transportProtocol: 'pd7uccbyr5uqf5us2v9ryg8s9idcf8smactrfeubud1jzb5iy5k8p6qz42br',
                messageProtocol: 'orfs1yzto6de1rbrrakmamp6j089mst3bgqr1o4bzwo5knrhz0x3h644bmjs',
                adapterEngineName: 'sme35ubmu57y6qqhxu15wx7ex9b0hvwgg9kq7yxqeplam50u519mdcp95feqx1c4nkpswstq0ohaaum4e1eeni6ej41sbr4mal2sgr3tu3xaymajgohn8jsqlxcrp8p3ylgjp78huz7p2g5fvyham17ib9mhbw4w',
                url: 'jeeqy6i0njhdrr6y3tnq2mn4qfxc1iar53j3sonfb3e0os4lwvt5rux2zbsy59on9jzwtjaqpoy7y69xk3zln69aq4lxhgyf6y3vnc6inulow3pfvzuu3uilghbwrnjgse9zt60dfg1wxfxpzjuvmzcnq005529zg3cqhrn50sji37gx2xzcs10m6485gg75gldkg7w2arz7gnm277f0vlv3nvessp2u4j9768gdlhz320gikaz9m9dk0h663f02i6nt18b23he13ajrkxdgysnhsgedua6ocnfj4wvj8o00z5kxmbb5m0bmb6kc6qmr',
                username: 'jfx317ul6qcc5g5fopdgq6tetrg52c4p63m4l0oydbhltc7l44725l5xa6ob',
                remoteHost: 'nxawiun6gvnvgzlk6znu8bop0gbmwk970fkwqcxp26eex9pfr1470zp1spnruxgapptid93hkej6e5eoir03y0x1d9nmg5kykw878aeguopj6xemptvlogr2oimuw0frch7hsmxehmnfvao7w3z44smh9ptmwe9h',
                remotePort: 3102593055,
                directory: '1gecufkbkkwr2hh677txd9ixzwa2dowc2xn5051qzx8qypeb0rnyak6ag5vwcy79fa7jzu5ax28rkijy0coetu9p4vyr0rrtxpzzce580z46viy9fn2hyrbxneau0cztzq2d9rygnfcb18rztwgbq22l9l7mt29rdyojetvp5vax0vdkucmtw40wsl28oz86pub2t8dmg0sj9k1g0vq4dbb4ouf01u6nn8i7vu1rbje2bzub2ham9lb8p2i6p9bh61ga2utk719qro0qm559ab2va4zz4vsoogr2mstyaouisd5q05a95jk2drrbbcgyrokvoh7xnb26qecmxok8w6fscwrdnd1horczhyqizg4fr7xoorqrtnzh6th9t35uitre9z9p4ducjghnz7fxqj1k8sqjqc51nc0dupeio58km6x4tzcxiv0n2j1jzo9a4k7lujx1e6tmwtiihdrpfm4wv5rolqxwub8tsonkyinjlsbsd8hmnkkd9rpfx0lw6qjb9dqayubumvk0j08tehaos3q44kfegyuy4qekpqjuobdez65g3uagrznosmcwho5oh0j7eny9zc7zdsm9q46vx7dopmi6304d21b6fjy2uco08rpx8vk30wowyeqw3h8ndhkr5pzp10at9twfqpnhc10nodshlxmzjznc79e2pjddunxg014164t1gxl4vx5lj9ugxkc6k4p0oxxqv86i6590sv81cgynhkdgwowq8fs299l3ar9v9obba4t54hofhjyoq9m0qh8pbc2k7emgihnolw2x673bwso5c4ldk9u6cqhvh4nbc68boymnnw9hwx29r634rldcu8p0zivwdhiztyiubvyv1s00nzqbet6p0ns0prblpn1560sqkg3wygvukl9tzbr3vb85ajdiee9hc4mdxwqig5jt9wj5c8zsoqflmkaecfp7ko5sd6ez8fthyioiiwgwtidv8vciqv2b5p33spehvyxz6phosc1y74yp0n0vxttc7m4m',
                fileSchema: 'pja2xm5s7d06mrnmwup2znk6qml1hay5paxn2y37vo2z2tltc63nd33y8btnwj6vpeohb5vhcjf8fcicogwpv9wkw7l7eblfse80j28mzslbhab1scd6tdzo7qf6m9hz91ex41goacg1cru8ls4bw2hsbx5dz12kzlecjmfr6x23wluc6aa6wyh59n035swf3znzu9jclhi5pk3geul2rk5y7fhrjv6ug9cp2jlvl4cql18f8q6d73e08gm0b7iurau3lolppbso8i7lyh2ptc2p2x2ht8lqvyz3zawzu5seu4j4sdb83au8zklrkd9c4esguc6vi2hf5pt0h7lyy7iv42dq71vx5dbw67u2tq8c17esxkqcj5bblfs9u2ic4irx25gcyb7djqo6z0b6tfhgliyrb8d805h3jjn57zjas85012w4e16pnax1m176k5uts30b06sniwj6fhf1rm229po2f94kcb72idvnjv3xim5wdg0ke3idl1bkfhbyt1345515jywz903v4hmafkyfjay9c83ojee4zi67n7utjrkw9n1fwb505jngboxd2wo76r2mejk5115hmxgbp6lvp5bk9qashcr5jypwxk9rig4uellqdozxh25nxl7mi43lmz68zqmi3pbgigcayeedbdkrjwge5mkk6cmaanvv801wea6yljwryacc1leykuhs8lq8bkwsdmsj8rdlb22ywc930n2w8fix6ak0vguy626ivt4qqrm9s7blyn5ona6q14aanh174ksjloretnn95nspi25st3iyqg59ks6v880myt52wzt4enny32or8p0k1maxahqx55lquntpldz0brps0t1m3zvub4nhv6j46p3z1dkm58i9byq86yt9yvyp3g8j1oexbp40u18of530m5zk55f3vmlme3b4r2k4ocw2fyl6du4cehjlspz1vestxdyomolb8kkjtsa7szuc6fcv8cobjngfqbvo01nl25s5flteybu0c9wl1r8n',
                proxyHost: 't6zucd2ow48iao0ec6vuo9q37uehh1wsddbszkug4q4mmn2ud8qlqqo2zvoe',
                proxyPort: 7119061583,
                destination: '7ndl59ycflzuxgbkskj6vndglv6cb3dlpxmwyhw54zomxh7fqkgrz8q9wq0imvuzpc7scp1ov5xqmeectvdx37q5q737b99j7d1yis6hipx1hdagyea6f5tgjm5mr1ksqwlrk8thix8gqwcyzr8dgxzs0hajqb0f',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ow4gr0ge6zicdsjcbv86woz2i8f7yltl2gzsseqfptuss6b3djxdrt6fy515hrnht7n0xru06wxdrht26ueauvxljbnyl8swsyiwvbx0om126who6aobc07uev6zduzuijonvvrczupzgp3hq7kiu8972jfe1h2a',
                responsibleUserAccountName: 'z5lpcx0ans8brwfxcd9e',
                lastChangeUserAccount: 'iltk4ct6f30sjv764yu6',
                lastChangedAt: '2020-07-23 18:42:55',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '3ikpy5ayzvl5p36uyqqnajpqn8oqaayxgxc4igreguoulnvxbw',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'e725cphattprd03an0qhqb6ahtmhepezkqixib32dw99g785z1cwd85jg83w26kjhrhuwaplrex83p2p7jcqnofkn1os23b0lf24sx325tn3opwzbzdxlw8uz8fso52m89a3yuwcemnkncnfmm55d3wj36qi6xc9',
                
                name: 'tfoeh0uue9cw2mrntnpu2o32b88wucugn3ym8au9p4n7zjg99sm2jsub88u6kkuk019a4d6rhn8lzwtqkebjlrtzsjbox27e10035yjnza8lcajkg0d7pk4x8no71psehpofqeg7br02yq72ms0evbjq1uifb9t6',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'o8jpp320km4ncbxkxwpcepn6q6b50d9sxnui6l5w7kjqbfgw7dpxbnsnw0kihu4hv0eba6v06xxxf7kbr3y0r3h5i64f0l1dkeust3aj410qmbugvatl679j4nbdex29d4ajeh39zufjaj3j97w24p8unu36hayq',
                flowComponent: '29bqat8oar7jd6nmkbaoqlov8jgfdrhmaygyd7fal5qje83r1idgijqvvvd3aauf98vho02tlwb69em0ajgn4tebh7pgny9ecy6x51znhsmlhv04nqmhw3qvpin9t6687xyno2ktrs6m4g9rg3gc6use1thlv191',
                flowInterfaceName: 'wga9ugnn6twz7ninxd5r1pmcepcih8kfp0rzbuh94csqiw298pww1tcs2ek1ltwyjrj59rjxp5ip3fxfi8tjrztl3pq9vct8mqrwnqi06jzs2lnb0b2hvkjocbuebn0ejqtwqcmi4tiieoyjn7rkwx9a49094gg6',
                flowInterfaceNamespace: 'ssl810qmhvccj5jdrng4wujy4s71mdx33gnk70dyne0a9906j5hvtm1g33618h3ztg4yrca5qmh03psv052nh1wt44r0jmtrlm5obcrbjgkh0qxl8yu6m4l6vxz53js61akk25e3jnzdqqjb5gt6wqzoa6irnj5w',
                adapterType: 'bzt7g7x50hlb42s8553gojwqv8g49j0x7flcq1xw6fg0z894smqbrlkq1fbv',
                direction: 'RECEIVER',
                transportProtocol: 'zzkil0od47fr1jzcsc4n1hhcl07c0qoapbhrgazaxmijdtipcepqqiq1pdz9',
                messageProtocol: 'os9sgwb0xq2v6tq5r342fs9p6fjuzhuypuvqt1jn6ur9m29b3yzi9se77ibj',
                adapterEngineName: '4f3g2tttieqmgqur04ucuqy1fdpfkozdyv7o8dlpg8hjsok2r2h921w35228x2mcqhrz9kwtc7arkaqbj2zstfl47tm3dbkyb02bodbwmwrpcletm6m2fbftwo4afclrurnr59g2n4magu037glkitq5h9hxceto',
                url: 'q6lgptyhl7uatnxrlen5b7z0f456pumn5xo3ku7zkp02guh58psy33x44oumza5uajc7zq2ad13vljrwj3omz7iu0k3028f95qwzxfrlgh0atuevn1euff1j74dz14sqleh1uyzrb7xnxjh5of7bizcrbf2dqfqj7usepii99stcddz78m8f79fmbc8mr4ohtxkyi080uo5wvkz95dmtr39rkvan7klzwbi0q88iej3sm84frm2bdyjb55di6kuezk0jm080tq25whaz58a8tymf7mfajpkj172ill38u97iuz4s53msz3dauqzlis2g',
                username: 'gl3qnaso17ka72vur7kevwdzxxds2gwt3gsf2ubqeziegsnm8rkya3yotrjy',
                remoteHost: 'nyra60rzf95xct8hbaepj2hygwx43zvxfgwhyo4ved5lshe0qnojrjfu86oa26z6fdat8nvh3fp0uwd5xlg3kcz636evqyplch5m4jjv5hhfll0g7219uve3kfc430dsusu8h51ukwb648yntugp0iykialluyyw',
                remotePort: 2049183667,
                directory: 'ans4gydmnkbs11r91h3i2kpjfmtmaurh33sddljn4h32zedftm5k2vuytlmtws23pi7z4e5xvxwjzqv44c4fctlbpm0uyahhy9zfge8m7v7oqdit150sfc784czagmyx5l2p5zry58r6d50prhr6he4mi8jgr3cqg91o5zh84kesy3563zdx7n58fdbh05dhwamrwz5j5j1d2xomxqg7t0qu1vns5ivaddy4gnlone2af7apde9bl8iia776q39s3tq6mxpeom87gjcsi13ufdzy5e6kcdp06sbelh9pu5b59d9dot9ouog9adtjxlr8wppmkstbjr24txaibjifrd3p4s7vd28x7grwgriaccs0khs6vjr1vdy0syc34xu7s61bj7wrhn4lty3mtbuokdczq295m9cfj9qj3m1p6xyzne0e251m0e89j606ouopkgaegvfuccvrvjx31iqnrxtdqq2ufd66jeno9nep111o9a0diatqxkn5kax6042kan5r8xwh0n7eshrm729ip81co994fllueelx9l43fs22nkec9ozqbvnnj0k47l5efclxtue7kpqnnvchqkgxwtelniowqnfhabb00yrznov22miq2tiqtku16ur03mb5skpezp806yxghjr3ntqx2ncqqy6a8q7hn66l7n32bfwjpqrrkb8dgy37n4axj0h5ohvk36dk4u5t1dobovkrouwjdiugmorj59g38ook7251trzbjs1kpymboytg0poxlmbayk6j0ef4drox1az5fmvgrfgv2pp25ifcmdc2npjkbcogphh7iu7974bv8xegunb5zm8to3v6qsr92mnm4d5i0ogay0g9rffrsmcuth5sl03htugbupfgwyaza1r32dftq3o66u2zgaqyscf1ekmxj0c1mh7w13wxoiit7rwutqmmy8jm3b2ejx8qo7bckcgau41ucyc4kkivkakj3naj5bdevfl9qp11j7pf542h8f0n60trct957v91xfl5',
                fileSchema: 'zyn49p34jabn6lrly1miwc20492jylgy6w12u1me82709dwvjf5l2sgjb71cl3uqjqbezy9m9k6qoyafe4ajs912ewxnldu4fkbz4lsarqx557clg8wsckgcwmlohslyphya184mn53pqbnd1d0evqx6r63xd3tfy0xw5et1j6jer7imwid1bdheqa43isdct1t721g9bzi3o9gzzqly9qo8529gutwpp3zmavt5xqmpd914l8cwrbj2ees2wupdvrswbrttulldomw4m5248edc3jnzx3lh2pte0v9qg5ct4ubkbcl0o2sgm47t9w4h1ntn5y5hkif4rffj753zkpnepo8t56pe2fjs2bami6ezzdtdgv6h25gn94x3w7jg7sh4z1bcbqt9ekl83zn63c06y151ucke3q60sc7vg3iu1uy1qhxr3bu2p6wrnsvh76wpes1oakvgdw3ov3ecv7fgaihmhrhw8siyk55k94j15odjve9oqxaxxuj50ga00fsotcgvni8lk1njshjphz0mmxhldt0kn0deql5b573sb2unve98elauasu46tq0pi374uqx3w92pgshm7dok6x5qebohc3csk1m8spu6wfv3dj0jvrhz3f4c7tmpxuhj39ja5kp7nuor92rss96e9xsasafgz3eowffspma1ra4pkh63t6ww5ecwivlj32tvlm7y13hspeofh7gw4rox5lhnfkfjvvguonxk3qybl8um758dnuaeby2165yx65oszmrnzhllmno11b8pzacwwmv1fkpie38hwkus0qm7nlv1fc7y2kvdo9b3kqao8rhm7tgalxxavelb663vcarw6pa0by7nmfhi1te6rlxpfy9093qpr6z1ehz3y8x3lgem3cve9kr83lqulxjpbbe4v9pkuslz129xvkon4ze61lldtqhkwsgt0wbnnrp1kswmp3ids3tghnc241nyg1gzrikwwxrsllol0n0i0s83zfx6zk311m5vikv0s5m4qzb',
                proxyHost: '5qi9ce5zpxkefn1ihslqeugkdvum9ga2stjah9lmf7t8ml1g09k7qwtbvxt6',
                proxyPort: 5440273108,
                destination: 'jljft8x2stuq3ltr25kd1nvxlemectwv10xbpginh2qzzhva2o7h9kp76ybrny1b8rsin5mdtg94yby4jekomj5nvlzceinnk23qbl61fdjqgbjn985grdr4xlwubw3drvpinf54johuw3fdeakmb4uobiukfbn7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'g6qbeb9fr34se0ttykp9qu6dvuv3w1mbel84e4urkzkrzav30xnqygkpadmcz29yhzz31mhu7d75q2yawh1s1hgrpsfwkd8fhsqtcka7e5gwqad6j26rijrzu3vh9q9u24y94zwji61ag59q5svir4rqddbhri7g',
                responsibleUserAccountName: 'neuiyi104ubvu838dnel',
                lastChangeUserAccount: 'j865rxyx8j4o580c5tvd',
                lastChangedAt: '2020-07-24 11:19:50',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 's8ro3oi85n03i0g6rhcoz6nn7idvxyio6ies00vg59qt26v5d8',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'k4kkw0pqdphzbn7cij9i6k5yagsdyifuk7o762z5kkeixhkr53qpfuyvqg50ivhrtmn4tusmapty2x90wtzvx7vhu54yx946yucd8ypeahk0j7dlpvnp1tnmm79ytia7ceadm08dqozl2bve8ejja6fcouj249jk',
                component: 'bgcnc5j85u0lc44s5ntdpu506y60yyrhyz0wx0x4ip0egvcds7vrxw3eqm7qdys465qku5vrv5dlxhfewznzjngk0np4o659zkala3k4pw1irrd1vrhm6psqm2q69pqc8l5crtg42ux7hvwtpk7ssvil4kvxe5uz',
                name: null,
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'lpjsanz5r05z66xn4ra0gl3urxy4cfwj7txri3fh7rvxch0ewp2vpr5fywhbmfwhlncit3kpxjc3dqrql7avymc2lamq28y4uec8erlc4102bk01z4h77wl8nqedrnr5o8szx56se3ljgqpogx0i0wl19nyatidt',
                flowComponent: 'awmfbhd1ipf199b4kt6k6fwbxu7hnd8s2e07v2f2s4c5ftza8ggyxd0pk1rstjqkawyoq43qyspqrt71qwnh3a8z4ezg9gutlwalnt5jkz1cv7vtsgwjkfv9r0llu88q3ct1xv6rgxg6sz9n95i0k0195ee2ukak',
                flowInterfaceName: 'kqfn1ta9ddqjxpbpvkxrj2hitjwjo6koy2wxbh46dgp2bkqin6w8e22ffp1jeeaksu746dr2v30aelw3bflmfvncy4z5qhalcfc3hwaz88k0j3l2t3x9vyb0r4emr5r2r7h83gp2vfwrkjjenqezdv6ckg69oofs',
                flowInterfaceNamespace: '017sj0pvpq3x7uslhyb33udpbtknl1q43v6h3s2o0w9pky4e1zzve3a7vvveq1zaff8xsml8fc9ztdnnfj8irw7jnsvdutrrmls0k4txa6f1a1ufngydtsi0ihm6xo0nd53i688tcl889ban8vje0gkf4wcx68yq',
                adapterType: 'p5f0d2jhhzaip5p9n3gtp7w60l8qhruqnt4phi9hrlv6yhthedqy7o5ozjj4',
                direction: 'RECEIVER',
                transportProtocol: 'ku7caj7ehnmcb2w329hvchji695nae3u84ka4y8lj9d56eufnnd7vaxlw181',
                messageProtocol: 'c2ae5zk32xcpk7ydkf14b4ob5b3zokziomohvqe5zsdtuqdrxaw67js8guq7',
                adapterEngineName: '5dc364cbs49ohfoalfj4ygq98b9iv6abifchtyv7iga2dxxgy60ytcu8yvxsyve3o54e0l9zb5ouwf468rqf5p1m5ycgyt8d51vx7plstpydew1j5lua6hym8u2501wwvu8u2lg51641uwymaovsd9xn9x55s30z',
                url: 'i9djtd6oaubsvexollmw84wi11fkefla1gr88aoe6jhvmxy7ssn1vhqvk6g9lm6xrrzbnc8jx9b0tvcagffgh661d8jwz49odgcjylffmqnolkv3ren7v2jj7tvevpn595apyv7jxpr9q8f8qhoxjf85dljrxnt0pmh4oat96c8u3w75aycx8mbgskn0flsr1kdlvn3pdgwgykrbldl1m0o42ytvn1bosy8rvthxyd1uqfk3d2871efkrgh39raglmaq2q701ye99mcwf5xykc6ewxvtrtca9p8aykjh9ykb8ho95gwckvnswcgkvpow',
                username: 'u38y77hx5fynx4gd224n182quxbe4mmcbbc8fvjq106k8czd790q2iylu08g',
                remoteHost: '9dd9owkx3yixu0trbj13pvqgsnmycp72s0176ock8fryya1haq3lcvy01x4gz5zb8o5tijl8uubqdqa6uhcg3w59lbijj34jlbulrb0ckov4iwn28zrvdu26o7f0bintpp9gya02yyxhf12t85lzzqpg02plw41e',
                remotePort: 1715991322,
                directory: 'h62fxswj6f8etjuble3dqmjclpparqz8108v57caqi0re3mmorp3pxmpsravcrmrd5g0p3wspqqrm3koq33jchccnbdd2trvxwydi7n4349j4u0p9tp710z7janm32lquh26fm9ejkncaj43z5m2b8lebntljkkreeco6xxg1xzyqarbya6cqoegbrws7wdtnar90bte46nax9r7o3r503ime72r6tqdwaf6rhrqgavwdukhhw25krvc9vtkb07lyju8k5pl0rvfkrffs4kxugaxr2zl0s5x2q8ah46znmpt2909mgpro16z0jgzvu3cb483cuv6tuivfafxqagw84utqgjr7wm2jytph0q76hxcdi0jedqlh0j4ym8xn21q6pk8kd2yz66e97zglevcwo3x06hq6rvfixlytjiv6n51x566873hovl0vhdj3cb9a7libekls9uztzutx7ezytp1llh66r0osk02e4fyo4n84a0i4rw0qexf7pky1dbhkpptx6cypbqbtbyjgz4nbqo6dt2uor0nd0t637uq8ogb68nxvp2j5xnmz9i03ce9wah6fkikntvtuqoy0grhfjjvjjqkoibo78201cnznf0ytj6lxdt2w746d73eo31r6ae473h4g1k83f3lxe684lzpmeqs7mdpbn133m8pimcjriub3c2ydk1yqmv2uhpzqctn78055tanstlgy8c0si547rs9zgbzap71y3arb4x6ie67y9lgjagdifk6hdpdvky3ftxhnqouwwvugf5wz4y4meooeuw3s3svjrda8qqxdwq4bjvu37xt6xm8k5ftshty0r30x4ge57ufjq6p5w4osozo1vwca1lqo0fs58fkcckkxczav7vhtnnoma11d3vqb88kxyud0225h1ww0xj8sagr9e125g9o2mefn8vm7iq0twt9jzgn3d1jlgzd011rig7q83mxayio0ra3jqs0awhiult7qu3bsftacg4byyo5ct81q1f2d1qdi6hu',
                fileSchema: 'shisq9zpufl4ebadupguqxoukk0mwi1r8t1kq8f6uhfwfprmg1cruvvqg07iwp0ban2yeh35khrisriqz2wo91xqzpfgwkwvlokgr168893o0y4mmznb00xhe5dvgjf9k02og0u7i8q4f7y9cdj4ju8enwi1zhmq78jv0echuevarp6u9xg9fjkxwbnrpofe95lfkanqcpkmumpakksxget8zvb766yd79se7zrfncc1r2ttb7flmkh9r3x6263t3vp1urg74qs0xqp9f8bum3qrow0wuv8cq6wmynmkmhs4fh49rora09b9rdevgkifovsgau6vk92vullebgo9ec4m2b1j05bq42l3zzvq3k101l4z6bacxaoo5ev287uyk9aflua3wn94zu44hbl10tvslprr2kjsm2e6twvk22emajvf5shnrsw9mhe9wjj89dn9vhvwy60n794bznixk5gm5kks7xzbro2hidhn3wke9lb3gs8qkmyyqkvzb4upmyp6ab4i80mkcma2utgbixnzluzs5xxqdkjsz5pztcj4l2754mm7cgb7y0uwm2wiguufuv4du9hbyuais51nd01189be3jk0nh3onw3emmk2l4ounfz8xw86s8vki2qm2jc4x7wlgwyc86bzp8m1kzaqvp6ydo6qmu3z2kt2dscrst3zfsp6qnjjo5lx7mvl317998owpvqj2poofpnr6a4hf62ydzfskcp5mobsz4my7xu6u8qqciot85a37k0vptaiq0amsp51qqkd2bmm6w930jn5berleepv9bkk7sg50szc12yo0okmj1ol72inyt650ammv6f2g7yy1hzlazk7u0iww3mogqe5t7x7yqcb8xpwtntyz6v7wb6uetq01bvd8m20qvypzzz89s7e4cemhyto6dya2w6iyvja2mvmjnbxu0w3yopxriq935tt03k6y3d7bsxdrfhz1lnvt273u11t4xh1omu3x3pgm5lu3e509pvumledwe9w5mdc',
                proxyHost: 'u377mcwiz4zc0pm9ezrca97tgv0gezlbk946k0t1meyobb6fgofyk37rjydv',
                proxyPort: 7398313399,
                destination: 'amyyfmwaaknpazft69g9nqyv8t7wx4v31eeemkx9s1bg2vy5lju1xbnlyaa8i1uul3diz32sdu5gw473b13pkht0utqb20hseovdxbcuym960xbrix8ohhrottm2q81b3glmixpx9h7k4wicx63jrmqh30ndw1d1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ohwupjcjna0nds4vjyalru83024hdj51e0ue0q66z5a0v3xj8ndbjaev2q0opjc1hjqo0x0f8je4ueetdo2qdebctlyu5ipgixwt7a5ne251cmpjvaitkt5khrsp67f7alit510e31xhuf9o5ih0e6stgl2ufrfe',
                responsibleUserAccountName: '17djynj2xcrsxyjwu3k5',
                lastChangeUserAccount: 'k8eirbiw6h5riuceqoe3',
                lastChangedAt: '2020-07-23 19:44:24',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'jyivlvw4moofz0s6hf6jm9wvihiqc4l3xeoodh6staeikdllb7',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'cjvdkxj722m9uwy10xs9jneqbnevn5u5uevdw3f8kw3ctxmpr13bthg0icqyv7igrcy06c3cs0rz4com3akzxwazcg8ngd95p5azpbojirv5vohdqk5me3gksesppaji2zx2yoq3nb219idwrpa78z3y4vxmfjto',
                component: 'mok96p1vak3mkg9iolweekhor3gdjrw5g35xr0r3zcxi07jta342hlc8u1b28susjuxhjouyospu7yglvkswx96zg1p5dvkpvkrf6jxgaigx3j5mwr7ebhovwru9jaooue6xrprvyszxzruovw9oprxrvzjqvrpt',
                
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'ntpbgoqlq3isderflw9ku543uchc7j32smqgsvcf7xxxornaird98sggsb6h2o24hppcazegp6o711kba11ak7sg2i7hxnotlnje111wbadwfe8ev1pxiutdz2dhdrde3r54p4rrpzs2irhvotptgo7okhl866h1',
                flowComponent: 'srk4iybwi5gvro7qybjvqk92g6ps9kck5bwqcpust41gx7fb79ufjpzt0hqv5infidssbsihcvxjhgabocnm7qlt2isdltbkc9n6dn448hg275pqnyj25bgzs88cohufpzknd6uxx4gs6hczl9j1j44mmkzqre3u',
                flowInterfaceName: 'bb92csrc4ihvo9tedhk539zvuc2w9i17jhr28n2pz3l8smo7tbci53srrklvc3fdc8um95553guwlicadly41rw34m8liqsn79r65y6luo1uvuq0ib7a91mskzxh53odbkdu7cku7vuqmug2ci5n9yhmteyeq1fu',
                flowInterfaceNamespace: 'c2grc6bnum9ddnjjhbjdi2s3tlagvrynn0su384mudxpq1uxof1aynnfrwn4rci2t688v1o2k20gm2g55gsntbmupku6j4skzzz0c28ax4kni3ctbfzlpt5bumzq8uvmpqeq1cco6bmg4qsk37v76eshgsu28s4q',
                adapterType: '3yixsjmjgjomjg1wa16kd5d388o53wb4iodzume6ms13twm4tasss6p9x7ht',
                direction: 'SENDER',
                transportProtocol: 'hqy6qzlpqr654w88u73fivi4a78comuagaql6sjj3dkqde3ix2x3tufq3bgm',
                messageProtocol: 'mp2u3xx2qpwsnz6ed4hdktm7xy07ptykl2g8y2c71inega36f2jl33pzwezt',
                adapterEngineName: 'ng2737w4d7mlgi1iitnvdguy4hmpz7e9gy91o06wfca14cixz6in394m7wrykymbgw35qm9z9eju1prrn93xi92cakaylah3btals4g6kf8cgkueafh6mqfn4a40awnm4u9lxkp4dg5cg7pa6tvc46mmpz95nhkl',
                url: '0zob2auajcir98rh00on0de33h276faesx9ahaw4yacmipcaxxg691hwkz73dhs2uv7ci1ig306g68lnp3htwbkj8zl6odox6b0wiku4mvh3xismovzp3zulwpx5n2uetzjs8ecdonkxmf2h6yq9871wi2od3kxmnl7x0l40scilbq6xwh52sj5jp5w4a49x7ycm2e9v5p1p8nmtjgkgz1mz8i0qkmu508be9p7avofaevbhqm324odyhx3shj7jelure9s4tkseiriodavyl6emt9yydyudlkd171jqzrpks5h9mwadiw274tjcljkk',
                username: 'wko0nnzszbxr2iai4yrei4573201ag1o470fpqnbl0rrdokx99a03sn99wlr',
                remoteHost: '2yjne29uze1td4v0a71oj9wneco160med2vtg3adyd3bi6y4mx8612r8jkywqkal3yc1ogh57iju4q7kig7asrl1a5kxb9jp2x0gxdjz8t8kmje46tgl0f1zwytrm94730z70f8zl5vy2ixycjza0j4y9xcfck2z',
                remotePort: 1169542057,
                directory: 'csf5vjaog9ohnwdfyew8nn8ue7hwk1jfoww7f36h5473717jw1364915afwo2uw8fn12wfzfjr01npk6b97a0n1suq29kla7nnromt07mdfm71vvy5sxr4nd5sgkzs94tygo669asakm894ff9cfptvu6x6s3er9a7v5494tkluhzpzc3yaupoxxw3ngujylq6l8ulkl2gdbu2ylefg7vtcikmyinfkbzq037imugr76q9duhvzf7lchxustkqhlvaes64rdkh5sqnlp51ontisha7wt9c77bw6bh60v7thqn8d2b2me4tctct9lppf963kfmgkh7sd2ksevwbjfd03w6iiaqmsngylsat4lgvskm878w9ro2px8p38bqlv1wondlb94k9xyy9kh6prg5xjlsi8docf9k3ibrcof7nbo0ctlyc0gjt7o2waqifjbb1xctyn5ssyg72ihdd5c8wq53iqa5vit4uoqt22416ubzwglb0ny5g9eod0s1amvv9i7dj6jret89jq1btbxai78cppm8w0o1xx0xw5l3r0cxai5rjvtxdl513lgrhmyjfhea5gurw3ko4ef1daih4rnhd3crzbajlcl0x5nywdrpftb0lkfebgfk4wrtmoy03bovdys9yf2myrmv0uw17bo8dikh1iwl7rocpemqdywfa95mkpf2gxrsvj6dcciofl7y779mjhki7nw8wzlooym2d2a5gyoex4lo6x4ruzq6zvqa0lsja9m0tm05g74prhfrk956ud9om3wu47lghafjus1mrj6aix1v0fwhdwzkx21011sx3umyzb8szp5s88ohwufy303g3yhztqv0ahr7vsur88ip85l47i1yafflrmj3twxq147bagys1k30mn1ll1pru4u6pos5aw0lga6p5wjsd9z729c5qjczskd3y7r1pebrrtikg3e5mbtoyxrducwwh8m955jgl6krywk7mx0rcvrw87bk7xru2wsvx7zdnxo3if3ov0qmnxr',
                fileSchema: '77qhl3oe5ckqyxms2waride3f8v7acdpxnrfq0dfy6d7jiqw2bwwyefdoj6b3bn48rwwgtugyv67za9edgc4j0blpqdks3pzubnxn67h2sj7s3b4p56u4clh6tcrv2ohi092amtcfl55mc1jdrcsl5xw4nd6bi28606zpsn63wmbjpy2mnfk6y8l4gs4ihdavqys11ftmpi0ldlsg84okacjp7mtnl8itelhrh3ed99r1nybjo35q1kfpt6pfgkwm9x5y17jvff6ifam8d5v2wkwfib8wcoe4s2qd5dzwc40zf2kd7xc13h33ln455t3xag30y2xgeo2xnmd7ebtxnzsvgxokg2w8q4cnclnabnkeha2kweuvt4255df8ml4x4t3h8jek7m952o1iwrx01io3ua4gdd8izgg0gu40zsa7nr6p28ey99o7z18zvi254utobzy8enw33d7dbxdcf41mrbvnsycdi0w09jdquh52nyb62a6bmel2rnem8xdyts9wnmflr3hyquxp79vdrsj8x506clztpt8pd956p64s7aozmtd8hzzc3l6ualg3a5zgkgubwd8j99wllrwy56cs98rmzwg7s1y3lbl1f9t7vla2744plbkpu3wewoq31191p8b6yu37gsyaxucwk8b6ank6t9ihb2be4bku8x5wz3m3e18wi3dweh2wyi2jpspvbnn8kw89xsfwx8jgzy7u1rxs4vey4b44krhfvy1x0cl5g0yc9ntzma9x5pqe6ucpvv1tm02m2jta8ud5bjwydy5vrvhcnwqca33c1t2xhm7zu2jgyozgj0c21o2e1brvoz7jvtgkwuj31qm5uszryhoweyt0q0vmrr9bfvq5j12toh7nmolwcggfu9t4f22ue9mchy0wknnyw76q4owqeb9fccu2j3plx8nyijgtzgi2pystlmo7hyl1wuv398h0hl8gf0qu9ewxd51a8xfni50jzsf8rl5jxu4bi9js6f8sm8kqbg82ix85bv6',
                proxyHost: 'q04it00efcynlxydtt135wr4zz8pcwn50tj4ik2q669apyu5cu7ht7we56i8',
                proxyPort: 4545492913,
                destination: 'jhv96pccsfmhs4abhl8szrdny1k742ra2odueyjs56hqznndiezi1etqaak5uukwwwdy2yuoddjzsh495nhw65ywoiae57flyhxi9vo2wiq6vs2ndlu4v2qh25u9foxptgy9vsit1etnrw88a4k1f4nuvno8m4vu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'utm9wo4lsjqv5ir28n6ix63bhn2f2qs22ldrl7cenlt4tjod158m9o0fpl97grtis2csqo8faud3mgfmiyy01xfmq5ifflyay2mocrqjq3xyprslld44zby2pn84668iilrmhodzn3yhbngurpg12npnnaor0x3x',
                responsibleUserAccountName: '4hducfgvot3reiaicetn',
                lastChangeUserAccount: 'vlhzykvx2kfxsfva3p2r',
                lastChangedAt: '2020-07-23 19:04:39',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'q2ocmxexwms6rpt66dwzqsb7l7jvxdw499x3gdv5mxxzhgo1hl',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: '4ai92alpijctzigz2y0xsdsbcq57zaf9idpm8uvfob2j58qsn81k77mml73dcd50qshxcg6n3twq7m3ykpmfqnx4hcikbwevi8yd67scfujrl3offdb0gbhc6infc73hsj0npkkijwabijl5rxzdmqplq7wf4bgc',
                component: 'sqmgpl2vmanv0wqcb4h2g3go2zfintqugojl8n3gyq55ecju9zvbkqbjc1p144gtrb64fvknmbmq21xrnn7vipehjjikwml3l1tg3pu280oeem6cveksz8h4xzk3nez3s4n58rfwcygq2n2s48j9actauudfuxa9',
                name: 'lf1vb1r18vfmk5xpvcmh25yulkmrpc903cr58inx6v8sl50mypl6coe6r1xml6dq97pq3yr56sv52wlrq61cuaknj1ed7gl0h0o581p5oq4svfuugqt7gfi6y2e7mffklivrkcyb5bp7ls2z8hq9zda658wjynfw',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: null,
                flowComponent: '4by7q0hdd4tgfnjtz3jf20dg2sl4btusl1enu42vetb76c2n32tb50ndd4p82on9y4dy5lnlw44kiclobkc7bpw9po5yy10rv19ukg82xf3kfsxu5fg0jlc63x00jxo4qw00e4e6v122lj9ej8xefjg8i453mvm7',
                flowInterfaceName: 'z5jyybluejm2vlhri42nrzomb31euccxk5kz4b5dld3d105at387clrn3wor82m68nhvvl4u2a14o6biaam1lhbzbmdysi8nadj1d2ng691xwcn000umehtj5di0o388oz7xycvrpr3pfp9dqdr871had5b02yff',
                flowInterfaceNamespace: '3qzi835ppkiqj2rh1ch7wef5x96s4s6ps5by7njpk1xx3cdch5sk21sya1ri1qwonet8unfq1hhqhknk121tjnycunnob5u1ziyw42dpahgevt1pssjp0ly7eweo87vzgs1su8fdzft4ilbv7dxkb4dsieesfmpv',
                adapterType: 'kmau20ixvi60el14f9k28wnuf49a6lgsunol73pxewrmdggqx6ayzfdllxlh',
                direction: 'RECEIVER',
                transportProtocol: 'pdyj8ne3uqj7xa4nb831dinkioakqfpo803t3b8696jntkatrlq7003w1jeg',
                messageProtocol: 'xl9bu37gddcqczn9gzye0n467auya1c0xlfnqmp05vqtnzblfijt6nb63a3q',
                adapterEngineName: '4kyutk2ro4h52dps81konth2emxnnc7ful306xkh0l3lf7l4zejohmr5ajpfobloo7m64yiyfneg9cjbjou7yybe6sc142yv6ye807dcqijntl7wnpsalb955zb3ips4l28iqg8jgfnyceh0c6vbqqx812w9mhm5',
                url: 'lxssxo8ph5sqo2c50h2771yt0mw3r1ypaj1dvdai5h1cqja8aeb06hzdaskx3pemht9nskbiixn1r3q1a3aa0edtzkustkjv2zxs13x6xk5bv22gigs8dviqsx49hjnjpmpa91zqd2o6lp37zb2cyjqazyqoj06v0uf2zkvgjyyy5i707p1o678ymqtfhw5oqgm1epefe3x6gejxvkaz5xrh2v4uu2zcukss35r3jdhpbcyjenat1nowjhg48c3u65quu1aoawcwu4crhedl46vo7km1camhb1sl2t5akfnp4zwbzfih7aozkf8mh1il',
                username: 'gvqjwfo6dik7n2lt0e2634b7nbbsrnykmtceybfhioj3dbzwv6bsthx9mgi2',
                remoteHost: 'j4iywy2ulp7vlknacao5vcf3uat7zjng8gugiro3iidebfc3ntbpt81x02kpb1chjz0vawxri4ixt778rylbyayrvys3xhoxtv6x8dp5m53cdckpkzhcbji8144gomfx20339hh0kuil34x9ur2vqnscn0jw3y2f',
                remotePort: 3678007014,
                directory: 'vqx0fxz1gdu4zlp51g0yzj0fvifcjuk86z2tg7rtsv081u3xerkgnqf4ni92dspss9mo8pg89fgtvds7ap6hx4teb4t0wm9qbdbpvcgd151l8zo8c1r5v6xmaqshzltl6gldzx8r2xfcijzwb387hex9gnvegcwcf9k69grtfmvns0uftpo9nmq8rkx3rj0pkrvjrk78nx85xildovj6s9pp0mq7ycaevodvjf7j314b5kawmpxtoa2i1xu1kjxswkjag3ghj98bxwnjhm8nzt1eiim6hwur9k33fbb7tav1qr3nmfo0yflgw3z2l8gszbq0qxmlio4liv6yxqw96p7fpcb0ognyzjvzfbxk2b37bxl1hniei8wioj2m9h4ihzhp0z2kx4vfz9boobyfa9mdvi6xonq4oj05c003hjo7xbcoo4jmxp236cyvbam8kq16s3tj4yfnphtppvc6z7sns13cryutzlfb1bam8j1pq5uin6v9be5w8bzmkflrx0mtojtv2d7sqah43p02ik339jku9c0opcsxoiq6ybpy25z88j5b5ud39ucf94f9g2sboxvx02t3nt7tchh2wiwnefz5t7uexbgvvjo7nzzp956td0a4gww9x9bipgu37atfwra14n4kvuh4lzqzqun1yv3d6npwo7g5qs68lv5aqt5y76inc723othnne1vaj8d07l6furi5tgf0uq4e91zqpomy1xe740meqawhiysqrpfwz7nlfa0z2yvzgjtfx31jjsqxttgc0fjuocy3bsnvjpauabponhzxm6ig2ssgrgw0isczf5pw63xtc1szgpg2hsaj5nik6sv9sx5h3ckyipk0ht15qqww45hobya3hyk9tojx7ghh21ja076y3skpds5vvf4bwc9cusl766qjh86v8pu9q0u6df86xpwd238xe9agnepe9o4eg2si6tjvtflitfhdyjlzmnf4w3ia75b2ba64m8qxp7vsh9lpo4m654ys9my6xvf7j0z',
                fileSchema: 'rrcjttyn3pz9itjpc7j7jn7nya8oby63h6x82a00lhjnan1vf9se5comwihrrb07c9pp6l3du3hxtcpsusaab2czfnj2wpzh3a8uxf8f1r37bynp0i5vueiiqibhl7mum9wadiapsyzk1tgw56klgnahh6mg7s9w8dd3fuhmrkfohwdarag0n7ymuwon2lzhjp6q83il1zkpfjy7j8ovgsxa9kuycggs9nxdemjj0qyubquog5b0a03opluqvv0u3x30oz2v7zqo3lv69fl8qaax2rfcyrhiwfngjkbfbohorc1w96a4t8i9kkmvqhdaacnmodmiaij99ubrh2hts7y2jifbg9n18252zzx2uacjbl8djryezowf2rcr23rp16hhvv07xgwyopatvxs1nnw89mmvkz51g31ozad9tuudaw1otnz88q0un5w9ojwstwtimiqc3oozxip9439nbl5d4ud30eonspx0c2ov2hzg21ootge2aygbi328gaauuzbb8eht3q7z2zxhqncb7ph93bww0gva19dr7t34wzzywqn3aj3ewz3roy76290rrhgrkm3barxdmh6lm3d5j8r0zhozdpeeq8rsfrftenegfbwovm1357r1td3imtedkhdg62cy3ykdkjthpiq0uknaqoagg28rsvlld4vvxmkj89vr1iljyqij5bhp4f6kiy2l4nkiiqnj1v9fkdxedvgxdevehqkhkzql553494jtu7pwd0jqexpha6aw7p4uq1gnaq4n1tr68xlweoqgz6uvc6puap5c1xsjohwhyk7zop39tz3a8dhkhvq6hubxv7eqybdpb8k06aq2bacyjz80tlcpew52getutdnch7s3i90f1jkwinlx6sy3kkugwbu6mb9lr5sxjj811j6afm0r45k9sdot7fukrmp640j5dl0lsrl6c8jicieg3odb7upcozcn2lpar8rot42l9ys90t311yzgoaqhoproxa9lgm8cinrqt58ai9lp5eny',
                proxyHost: 'r9ylf47w3gjhs65belob005qhzloy62idtuu655mjahttsjzt15d9xmkamfv',
                proxyPort: 9063179734,
                destination: 'ldaw1vi3n9qx17o5atzg9tkz7zj4v5z7jbvgmdj1oem97ol6cknmljc0hpxz69lmbvj07134b1cs1s0f8szkwintw9rlknim225s278zp5fqt8hbhgr7bxheksfs02y96ivsbxats4hiix6p2c4d87dx41za8pbk',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'q1p7q6fp901ruyxlbgv9ceh2u6tesqbr6r84rh153udpf5qamuyygwcq9k73eca13j17e07gylc5wzcxszhr2ucms5rm2nsyb8x7vje6eo8g3k0n0hfdbzyedkl4ns6q6hgiy4g2762ay8nfatefm2r5kueuqixs',
                responsibleUserAccountName: 'hqd2ziersxmqkuhjvx1c',
                lastChangeUserAccount: '2lxpn2u5ylb65kt1ousp',
                lastChangedAt: '2020-07-24 07:17:50',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '3jikvxjh8h4s3oz2wa77zndnv79bn7ben5emin565nbj45zrf2',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'lmaxpvhn46ov1m3nhgzyb00hricl8qmou6kyot13bxkvbagkb28tv5vno1rdlapr3rdkgf65sva7tw91g54jpsmkdrs4nk0sp5uig2nargix29msfbai18ruk9ywldfbcoufuyik7io5zds7y6u8ftpm2fyu06ls',
                component: 'dmb8ukjc0ckx7o1wknwl6h4tij7dbevibfwz8l24uws575sgdqlpd05a2fl8xvrvburva8g7cc6cglwvkte85l8oftjahgx8q82ibdr0b7278sty4hc20iezns2jz7qidk2jmr4humud7r49bjzrwibgt7i7l7i2',
                name: 'xp0rbct8ez1hrs698t3209kl3d6e6xy0x9zqnx2vilyotx6orjx37lrfmwrj8i4avyfqzfu3cp2ito1avyhf71hwt3ppiipx51rg1o65pzg4o59uws61axuj0dg825mhaa6n824g2ehp9ryqxhrumzpritb1e297',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                
                flowComponent: '5a56fgsua4lldhmrlv7yl00lvns0ac8odhldaqe3i5gha70lvswxpb1jz1ice21p6o60tqe1gwxagnxptmoha89kl20cwtkb0bc57xqrwpi44hyyeo7676rwv04ggyxveaazqi1od7rjxuubnrcpvqvcls2l7qa9',
                flowInterfaceName: 'x57tt1b6aiqseq8vz7ld3toj6xo8c87zcq7xqq0qfusqvvy9ujuolva4q2ud7l1al7p6fnfwix66dq14ipd3zei7yj3badpht3r73ql23607jndnvztvfm5iqe53p9ve1tnq4x2y2y0rc6of3xy22jo7owns5xdg',
                flowInterfaceNamespace: 'v5y6lzi5z76ncjpxtxsbrj4up3fomukrk0p89yawn3jl3brrkb4axstr5zkwkas7r6t27byj0q92zzlczu5egfyfgojp6hdea1d1dtkvai5jdfaa32gp6mroegt2jqrvwsof5rnxryfvy4zgflvr0ypit47yoift',
                adapterType: '8eld059c43uu489bcqzdpzt4iktrxn38cwdekbr6km5bruhmzkejpyel7zch',
                direction: 'SENDER',
                transportProtocol: 'sqln1uhwk3eof93ke8abtkj9nbudmygocvg0u8bf2366x7i9i0vk6envdx3l',
                messageProtocol: 'n5ar558vtlf4sjpgsyvx43wwlergwogzkl0eu1plufathgq4cmw7zng4kpo7',
                adapterEngineName: 'uudfwkfs6lw6a0ggr9bekjcztfznfj68a5xgc8dsopvy34zjybehf506iwk2kjh7bq6wxcwpi1x0uvq5qwlvb0kh6yebfq284wqkxw7qkrhacsyh8a5tuqhmr01me80nckw3axfqvj6drps699x9s1rdbgsbxe1l',
                url: '6bgmueeenk7jo07ame1gjtqxlsvhdesbqqgehp3g1ozliwtxpkx52nyyb4lunbvbwzvsv7ou0ru2uim5r920q0vpxfoa416dzmz8qln1oea2nw5czz5ga9jv47w4kmg2jv8oirgje4fv2tp6zdakpk0npxtydm8osjvlsjvhurow3uiyi3724x4pz8yxl7goqe59x35fokcyfb5srco61x44xecfl76ww3yedpjs9dnvm4q1qwdvg7jmzc3ytxzeqku310fxjcj23imu094cr9whmsrcdp1s3sqr3h4bdktvgf85pjr0ms1c50ktq7w9',
                username: 'q7lk77y84sac1e5mos5gi9mck68fkcybjww2l4l2gg0to38byftde83witiz',
                remoteHost: 'a856l7cathtobvv4pd7bucuheeuoi0fnsj8speu1dqbdmbiqzzj9vsxfk0k1qhw5purzgr8jc9sjgj1019omc5rdu2o5oiyhixp6mh7hsqf522d5vuddymmmqvpl24r67jwomt4zzq3pbs5p6rk41bsmsyutx9ic',
                remotePort: 6193880823,
                directory: '9yaoarr3zvlxhrsta7mhyionz5ec2qw55rk0vf9q6unywjyad3n4ah0ha2kwgwiqv95j0xx78617bwxbuk8h3b0rynmian3tdo9lbz8yge85orgp170ghaepcqad3lhnrw5pfow8wav6iwvzy068iid9tylv8ll1wwuskigjo1386oo6zbeo56lmlbap0km7g2vq4j9djpe4cr9ao6whdfkb5uewhdwfe80pevi11ey5444u4q45hap26a07q8u3w6w6vooj4eho2qozv8sdf2r9w1fz04yv6iam3lp4rg2tljcnnrp4z5xfzgyr0yr1f0d0cceoj4h8bveh18acuawyk3o8tnanu1eh0n7tqtamijnve29fckyrr54q4r3h4uyxfsrwz5bhb59ptfg3tvi9nbe6lv0wt1incebifl6xrxuxmckepy5gaawmdcatszmjk04vfsqpsy1e29xkedhkxjeo9s9vu3ye9qfq51631en7lx8i4wchih0e507lirue867ldnnl6g8z2x5wmdsz1tjvtcf8cv51eif6vwc58qzhpfq0g0kvnntpd327oa2h766t3dd9hq1sb92uqatcwmlrju2xm4uzu4uyq99gckvbzh5g97vt8jz65zb9neokln3i3lfj3bzxkkjz3iy7ad68pdudjilglsbwt9ngslrf30brcrtlunqrqye15odmppnfup9upvwsu1ic1ly6e4xmz7myqsepqxts4hkj2avfzrwsp7nijdqwpoz2ygmqoz3ne4e71yutcue78qbxixej33jwe88iri57moeptbipdndnzhi1ugxu8j7m5zi6cwwav4as0qcgzjjf5z0p2a9va8y9jeer8qwcysyw4ib3d82rh2ueuu26koiavqy30dvc74qxa682m22dgl33ew4fykjuweb4ewohqqdkjeuxfveo3bk7pk6cpc72po4v2y69wu2orxc5dvl3gc2q3if89q9bokmf7w8bsb7gosyz7hljukhx0q83avgq',
                fileSchema: 'bpfau7cdwagjs8305taeu6iqqdi73ngva37z1hltpj8zb2xz0ohxnumrmbtxzmr9dqotlhl4y3nsvx5t1wy6z5ohfljkn0uhvjw8eidf7q6dxegl5cr60hxtr3xwbju5lfxcr4eoztd8eef4so8n88plp1kjx9729v8kdfv3sh5zejukmfzodb240ura91wx78n6xt5qiih14bjsvg1i4ruzka65ze4p3m84a70jgedcornb35rf7oz2q4jzfjr0rrb3mh49p725f1afqxac6cc1mr3potvqf4mxd0jubty43e8d1bqwtabb97fu3c8ehh4dx7m2xe64cbsv3y9926kta9h0nwuc7nguu96k39k3rlk78bsc1iez1i15n5dx8nwn137jrz4h45r69bpefn2l3sut2ecrsr5e20dwv3fsa3cif7rj73hlfj1t7twvo792e60ajyscm0d9q8ek87xhmq4qh3dxfgzrv19errnwcgirtvl9d4hzcuhujhh01jhrmb6m2qdo0tdyc1198po56kskvs6khuz1m853mnnk0osfkbljhrolvzh7j2nzw10dvsdg8o6yi4udek8i1fqd30gc06rmbhmssgls1ie17g85jdvzxpnsinr0lgwm60jez7j99215ixbudpyv01l18fotmdsdg97idmstnrshi8y2e3zo4a9un0w9tmx17xbjixhmzk2t4icsa9fgsb5gq54nuw89e31b9k3pie25acx2yqrux7npb4pmoea5iixyslnh29vxjr01icijvvlqkdjms8juirdmhujjw4ixf194pxscxscejp31howm2uxkhxw1fjsx8ms6htqrxv1xl7up91uny727ehq5f4vxo25hpcaj9anqwl6teodrpehez0eqjs46gwx9yjepib7328qrsanw3jpedah9jj5c2a8skv6h4l3g3wpry4eyu49dyqmo9xyfn52p9jxr6oq1w0a4s15tx1vjz9wrwqc9651w12o019669j4n8bbu',
                proxyHost: 'm0d4ueo4dkc7pcjzlcr0wfxzmy1cstxw7j0jhtuxgoke5cjcbakejg0zh0zk',
                proxyPort: 1595943501,
                destination: 'pic3hsmr9enk345zk8kzwbeqmwelhcq8e402rsnuz6cmzplnas6tydxosvppsxk2469xs5dce046wzlknm6dd742opgwo71z2u6dsq2uxa8u7xpjr0t0prvt9c9ikcpnkr6hjey0xs4nrmob72ac0hqr2rptldsf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0dut40r2w2xlf6mjrnlcxifx7h5jbt1ws0m53bt8ocazaw8nxd58poh0iwa4d1ed0ld1eapr3m582au4vt4cgi3w0gj1wt7fv71hat9sx1dfl32nh8rmg7u646h5z5ukrieovfigjexcrd2si7doi2su81yljcsa',
                responsibleUserAccountName: 'g6v2hvqsvklgz8sqg8xn',
                lastChangeUserAccount: '0wrshmlj2lllwmn9sbhm',
                lastChangedAt: '2020-07-24 13:35:06',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'b11nagh87xzm8k2v7g63vzvc7v4vd7e3cqw0cb7txruez8qqhs',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: '7j6pilzppvvkluwgonj6wcr8as383fn3tm3odliybtoulvpf1ktnoqm709jrrbfzh8vu1m24w25p8y1k7u2gbuf8jege03y1ujnfb408r7hsm2ank4cgh0fsl8rwm2k6xz2z1tusfb4ovic3astibb5t7jbbqijb',
                component: 'se5mbp56gfjbulvpkse6cpw21iuwuf2r8vc86aun6x8izop0br6gs34ogikcuynig9wgafksvwhwos5ewukmz4t666s455gj1rs4e8fi9w2qgmkyzhsazz8rn5u04ls3ut86g5a8zcbzg61yzjdhibmkcj92eg8v',
                name: 'gyay3rzzwjk6jzzsdp3q3s66pcqbz84gle55qfhpoie5v4kuwi2piowcem22h8gooalja5yj0tkuhm1s9itc6t1mfxgj4qp5ruin93yur8emqf3769czxdztr1nhgkft28pm5dz0smq8zwrbku96d9ewdc0x89pc',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'hw757ytugyifmc2ku2txoq5eqztpuls2ns4188k49jrj30hosjgk6lecgudopn919f6sl73ltbheqjbp0jv6fctwx5mynlaj7q5agrggoqtd5rhhvtxnxcu66sn6sa104lnf6vhx8v0geaq9kyr8xu2yjg257dx5',
                flowComponent: null,
                flowInterfaceName: '8ct0jpfzb9l1ezhfl5ttk9atxlt7tunbdv2txqw0xcdxe8k7e1qzhmw25vuno3zo3rh9jq7eswnbbxemuymc5h75j8kbjs3fi2bi4n70inu2d8swevekhtsp81w0h68m7mls6gv2j94fog1hx7a7ey585xz2rzen',
                flowInterfaceNamespace: '6hwyuulkmtbjirnbygrc1hnuxzblc2f6jkn9d02wz8kqir4smuoscx9yyu1nuklf9l5m6b2i95n8fm75f9pa8ttlf2b0rvqoxylc891up6ppo9231f20ylq5kog0s5aag6owpynasfh7ynk8nlryfhb6k95q16i6',
                adapterType: 'xwkjlc3sv3we4pz879por7ntmn2vcrkl3d5pfigkl4tu357ttl5eg9qynual',
                direction: 'SENDER',
                transportProtocol: 'u1m9kedllj94fdgyv3qro8if2hnt1neaxg4klqf5kcyjnhcyzntqrbwkfdwv',
                messageProtocol: '2da8g70rk23wt2rsahzwwkovlrphnknrxq5zaxpd4s3m8ixhhpu4k8a59u5n',
                adapterEngineName: 'tbsym3boz38hn9fwn21z540hchr39rit3b0824d220aum2kibxys87cs9nyyvamklj04u0m7blh7oezgnzwrmcigpo36i3v000upkh213shawmnot3j8cfad6n4g82ffaqwkf4esxlwq2t3mepykk4ry0bcca281',
                url: 'brge5y3j18mx4wfuhijnqsg127k5wnpwr87l8funbndssalwqkcuyjmo6b7wvr0m6da8eorh575w22auxtnp0kg4n0utk6w9xun8ga50bfqqxq6hnd928gt02u0db2w99x7e41mk4o4r8a5qbfd8foydm3az0p4wfduyp7jz5y0eo92pep2t6t8hp8bb4yl2z7smig0gdz7zch9eq3nyf0l7s1x8yxg8xvjwzo9kceyr5mxsm3xz2s5gq5g7gsolpirdu6rquc1tj0n8tddzaf1jwpojic15imwgrr8s7ps5fpr9k66t57x221nmftzz',
                username: '7y39p3x617k6nuj2jwjaw6583yj4et547t1g4myx2b0bf73egforjg9oybd9',
                remoteHost: 'r3l0wn28ck0p0iaz9wj8paccai7ozttd5g4rj9rynvllzm09aaym8khimyua31qruzo7114a2l91vsvhmhc2tn5b05zmh8x2v8lvzokoprsfxomb3cu60rzaasbgyqdq9c97jrabo4iwnxgjzkcp33vh40dxr71n',
                remotePort: 3559478763,
                directory: 'cy4jvkot79z9hnwdws1yb1c91l253gepz745ij9p7anz29y91hl2otdu8xu7o84njatnxg7nx0klxiknkr2azjwd7f4r247cechsbvf9unjcmi0fhudm8copj2fn469dmjd2y47lkltewyiyruelli4kp5whg6p7194k428j8yn3k20o7ehg1qnd6xzlzsx2g8h6ywcwwd424mhs3p8n5sjr73ohk90qh0mj8euk7f1ydbcenatm09tbo8eqdj86jg58lrx6q48kis17c1ynx85bgupi7vk47sh3yf85rx5qz156bfc6nycudduq045dvg0dq1hvmmu8pnqkgbnn8gn9yf4o2wmn8ai4ojqc39ptcyigtg6jyhpwc8msfv6ak5tf5i22yks7w6szhetzdbpg0geylb37dx3183ajcxykdpsa2h8xaih7dx75ndvdzmhy26ppw5mn5m97kosnzlc11722l9sh06n9i44oldnb0dzwxwemywewgpduvx3zaq2bdmervxje2vm3q3vgz633b0cq6jdnr6k5h77iuqgfkckqm98bdd2roxs8lz4lzo2f061ns5cvhvm9o5mvdel1xnxneizlabzxaraj6v7k6krxdb281ilfnq484ntuoq5bukiqci9bh0kd9qn9ngly409pi33n2qk2qkvi2a9vrxz84lftrt9ix9h93wp7rqzqnz8m82or5ihnvyjxzi0kt5ca4szzkqhuwx52jan880to7i1kfbj2pn5ivephoczfoluky3987xadbf3cuctceqrxbqf4mqwl65uk43kbuc4jtwf8oof9meydfefdshpn6qtcpi7ab9djf7k6bz6qeswy3kpu7ayaw0l4kd07j12m4oc4mbgtegnytaxb4m9ux9rbpglyf5y0ikiqj1v74mwvf1ob23ohnkd16e46n8bcpqb69mdzuo2ue2nu2qdb5vodtyde5wfer0d4oy0aylytkfn1c2w8o19nqd5birfgwrilac8ewaydopok',
                fileSchema: 'amqpo8dz3el3sjsbhpyh9ntt1djr2j1ka27v62iiabj8eniw1oboyab800ha9y9vez8ca9xkl89b36nkk9nfejlu5sm3u2iadoasd3lw5yvnzsj2ds21niyshwppcp11fa0qb6m6o9m0dd4j5wsxiglwhwzzcbpnee98h4d9dv3te7qtg51mwtm1ma5glcl4cutpbpgu0xmkyyktsghq9uqvn9yt4wlns36geyyh6lorc323x3exztuinkm2i51quqkkug5qipfhia9w59d8mgawsnn062227tojrawmfdcbz9nm5tqiwdqmwczufguy8r0zll7rynybwmbvrhqogo43ep6g88fpunbr1d3u9yq5lgz36wb6ppbpx0h34cmqcys1jxlvp6kqbk5o31dqu1aj4zvv46t43433dr7lo1aimoc1ehj8kcq6sftsxnciaivtftjup77om40fy21yde1uktn1stpjf1kw4ktrkel3gqw4xh262xosxih35b0immnsz56n3d8xxmljaks9kcwp1dfbks4vp90g7ajoixkqqdo3ctkt1ic7nz1xhrydjudqb8xsj9muyhgpl24rld9drxaecgn85wevjv8abkycphekxf14dxwz49qorne06g42c9utxb36ribk401mtt4uiykeyw7pkc2gly65ov6lstansfrb4nckvneeslrvip5q0mvoq2968gdtkqdohuj3ghxhvwvjqz2kbted15mthnhdl6f9l673u98qnjws59o5vzor7um8m0420a9fk2vx3v0cmtqu45pxvlvzyewwfrnshyg9la906a21njbjn3f57somm66pj9zhetdix4jdpuqgb1nu303aba799cb8f3d3r1je8gzq2c16cb9vi7cv6v9dygzhygpmvfydyrr0uo4jxc96zq3b9fxc2caow1n3g5r3dat5oq3b3vfm8slady67ikv39hfac5qijldub59iu3gbeaagxpjtjqnk26fia9e8y8uffc51ntlg',
                proxyHost: 'cugjbfnmpkwjp2u1jzom4tg5hw37xsfmynzsd487ji7d8b57qdt33kpbqs2b',
                proxyPort: 5316109029,
                destination: '88ecn2054rxa885wvlva0oa3om4m81xuor6ynx1hwiyurk91pb1anbefw6nw17i6jbfut0knld634j0iu6ggjtzl6alcuxxtlvef6kwzdvejjwwt63l2ri9u5oejqbh6tea1pdwcwcyc46otudc5te8yvndabh1h',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xecsjhh0c3ejvbwfeccz44ehvfgnbfmloilplj2vnx1h1ps0cj9p0nmzljfgwrryfqeaazve7eoe1mh8kgf4p4mcvw7z09tyyi9s1qy330ad3p30kr4z40jar30se67tscef1xwsqnwvroigwqzwp7u63onobguk',
                responsibleUserAccountName: 'o5rq1r0hw9efq34ivk1p',
                lastChangeUserAccount: 'mefp36lh1w5eo17n3kk3',
                lastChangedAt: '2020-07-24 10:09:32',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '46ilg07bdod5wiqvoxe6qh4ddc8trvxx3uebhrwkk46fk78k1r',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'xu1nvcjttdscollyyp1zgd1nbgr73e2z9h24ilnsk3snesaso1rx0z4c1hz0zxqorxhooe96x7b0aopwq6tmqljem0j8nsoxdsum7u1stsbb32ak3gcklja37z9ergpl7izzjnvpd834ikjmtc3cb4a86ej8abyk',
                component: 'c6cnq1vufv520dfgqgaiixstdc4kdc6x1ddkjm0f76hzysjsyv9tfpo5nr3di036tpf9puwg9a1jqb7z09bk0bvc6vmsy57tq0mt1r0ddesyfs3a47l82gcrz5124w3oe3l80nqinuffe9cc55hoqgmdoppai8u8',
                name: 'lci3u2qfvjxwf48mci38n1yzh77iv254knp0kp10jsizs0jdxf7wp3w7bm911m6vxb16zd91mdoy4la15d4jxljy2n5vnv1g7ipjlwmh3b2mxydrodqpj9wp6ll3jcsdktgbc5ea5q8xmgfqt33nt56h46i0o9mg',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'tado86sbh9lv1ksz61za05yscyit3ah0x28ljwm1dquerrlcuod8krlq1sjfc293hm0nrxfx29d51sqkh2q4w3t9im6ssf742lmrovqt4snp4vbyb4s0f4rucvznew2shdxfe92l0t2sslg9vy83mq4fbj2e45zs',
                
                flowInterfaceName: '923836om1kubdsdsvb1n6gs2q6kwugz72ca1j0lpc97vcdh1sdz9n743he8961r842g4u7g1o5wbvvlc5xflzzxtya7dajcg93dcua6vm2k3rsg6lduchlayvez8zt84565b10xvtkow7n0pk5wk2m5xj06uzec0',
                flowInterfaceNamespace: 'zntw3gnlri3o9lc434b0el3qpd8kdj7dkyiyhs6385i975432ff767t3hqaxghwjjm6379fs3zegrcll73imtxpbpvvsgsc2y3mw1hvb15zysggfu8v4ziqbulks9t36qw6frve7uv0x19roqrc3kib6xvarkllq',
                adapterType: '35snmqh8ax781x9d33n666lx91fjc48b06pkgwe5ykr43vrh1k6ydi3t39iy',
                direction: 'SENDER',
                transportProtocol: '77lhwczmq3p4f686uuc0hioodkk3ehss85orcr4glvozstgnsvbdnamy38kv',
                messageProtocol: 'wqe0p5j4ygzulosxeeatqpj0d2yqz1jessp1sb0bipwgqp5nvbka9jasu5m4',
                adapterEngineName: '0nr20856k1l8p826xdg85mpkxg5u5g6heobqbsf5cnachny5ua5rqjf61vpjllpl475j9lr1b9kyp1xnv2jjsur85tgm21r6ptv88lqvjogphab376bdlbmjs3dxnoi2rsugxn5vyqpi4rxjm2dn1eiorkcae8sm',
                url: 'uznzi7i50lpicabptqkibfapjc53wwahas80rztpsxh9no5w8rujzgjnry6ndwhm1hnjpuhs14ce7fsrgo2jbx8crywnk879ego0zg7vivdmc54j54xn5ol2nmnbpb0yjsxn3vqksk5htaqli7efa4mab5q7l4eo1qk7pyczyqvky6a1i1easkvbwaf6frtqh7b4a0p73lozlcmu38qlo2qmn2sec3iqddcob0vne4f1ky76vt48tinl5l4ssjfh68r6hvom3954o71s5i6hfh2c4onj1iwo052gm1hzflul425o0un1xr1g62zjsww9',
                username: 'jzstyv6t15o4q729ynm3zncm2zcdq9q5llxm8fj16qfqu1mhmyg85ajrskba',
                remoteHost: 'o4rd19a7bqykyp66rekqb1w2qbffzxzrv79z3r6fcg75qwmetrxyf4qbcxhfo2e0odzcsbyl2ci3kjxnmehkkbq1d7l0200fm777ys1wlyfkxnl1f9xmgn7hafwftex3pd6ssrtx4w82wrh5cgygrzrahwlh3iiq',
                remotePort: 1203317712,
                directory: 'c7edynj4wjuask633rsrilyd64qp9xdjbroq70esoxx4m4dqomb0atzafkwvuhl7om8wwg0v36ctnm67y6zsd1thwq6mi5wbwxb39rh87zv0mmuv5g3qnha5wtz8nz85qwc6ktukfpm6xsbouhed6iq99yi2wvl6o9d8u1w1ma7bnf9psexe82g2ru5nj2itewnuph2tjkrjjtyr36dhksg56ozuyedd4d5arztfqg14xca5mxi5aaopp6x8901npnzjwdzf84buvujg51gxcdjhoe6g4ek8jh4kdrrx63ij1qmjbgeolq5n6x5pvsmwtvpjfsznmkt8axfrxxbcvi5ndjlhrxz0o5lr474y5kx1tjvpn9617koin3l7yzw35c6icgwlpfocyl31lpwa47e36eeht63ymq9v4d3vya3wie25ud7l7fnfmbhj6k71ym8bcx34ve6h3kh2ruge3aszgzq4cz0cd1g8ab0br0el3q4xffbcodgnmajfl3n06on75vh43psqwblxalpefga54wyn00vmakg1lh5e57v24wp8kdj5m5i85awgc41pum05wdpj8avtz2v8xrght1ozdsgqpmqwn2qb5tfpr09z4h70ujp9xh9fh71cn519ubx51lk5vep373v1rrgk015l6fovitmxmn00m3fkm03matnqfr5r6cdb6k9ob61wzna8nohamau3chbx8tlrh19e6txe64ps4e3p4caqqgnj9dy6mfp8mza2k4iuqjxfzbmdydwg5eicab4rtsar2xkiy5sul3hwh4t05oaxdhliw3w5atbgnu0oalbs9ewbtdyvh3dgfcyaw1zhr469w21d00ye9nis9cm2xvml5t67txddk3v1npskiensy8efp588fual72do8h3hkw3v7tiy9ds0v1vcc1kcuhh6owdbeoy0guhs15kakv9hsw0562vgbs3qo9nh3lixrsipo61osfp8apipe4a1npcdt4vs7y8m4tfixmjhy5tck70v',
                fileSchema: 'mga3hm5sum2bwwsyjfdfvalb3uuupjm883nuh0spyo2otej54kdw86bgnfuxf47r7eayyc1t4z2e0inlwkodbvvwreccqr6m8g8dfn8xfj10jbn22ns4sr6tzbx7e9i7lb89pnopgkewtbjeh2w5ze6487qqawv0lm9iqruc0mp40k9cx4pz1xmq4ovy7odhees7um2e3fimlt7g77muhozf0fyud3jm28mbb0z6lyoad2my9nwywezry7nlvsvz4cacyuuyfahenrdbvunkbbld4wjgbhlt0fc71qkczaa1rwzoqbwx9pd5se6f5iwt49zot7veae5ut0asv7uopx3gkxgtyxtj6hct7dmpdo6vx78jca9wi9l1armqi9gc5ttc8rsguzqt3j2odj8nsdakoxo82e5prnjl2ms0ehksrh8m90joaqgg9idedl8x2clhu9oyedf2a2thom6m2xj3h02r9c5ld0qxt7q9nrmhvn29w15wck9n36ydsjuc2q6f6dzu7fj0hq2fsg7qdjgtr493uxwqhclbnbq4xkh41c0gjh6tn7ffugkegbtbibp3bqipcd5w4szmhs5yb5gw0q0zkot16bi3bpua1be8p7atfr5a2vdpoammx4ex7drt2ty1zc5qpp59fkswiai7fu29a694guyb97h143x586yh5idrjp53amf8ztre6g30gl18rv7qkmea409r37nmeu61nmufswhck7hnzu98j7bn3yfqv4ulmt9rvyzalysbgn026e0ys8fkdv8pupfr99p2a3t4di4td658g6f9y140idmtjxmrxzsjv7kmrk9rng9xsllhpsllaapt3hu2zz3e73x8c2bnus2aki6ftpme7uu5lyexle0srrsdoiys7jtcyeemar2y4uvaaqm87nlqknism2o3t792ynzqwb166q7m92n5lhez7knxnzpnjcdzpiaxfjt8pgpm2kwqj153e2f2o7u6bu38y50pf11t8qsosxxib14v3sk2',
                proxyHost: 'pdhn463c4h1575j7wj6c2zz8mi8zm8nvzludozcz32vdkklnc851dcvfz3c9',
                proxyPort: 2867914888,
                destination: '51ang88ivsnpbrg50ikbwvfwugt3n3w2ubepd7xxp6ijuqivrlty9sa4vx4y3qdat0ueu1agz1zo45spodqed2qu762f1kyqxhaztdhbbtwoskqauwficoov4ik6hq9o7gau4wt90327xu28v3hsn6laa0vr827j',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'aob4o7nnii5vygqm4ieg5o0xrp1ggkgzjuufdp730j1jswgd2axnqm05jwjru5lvhv10csqrrt01ydksccw8o0b361a8lfj9w15sd2tntjp0830511y1vjhiyw2jb3m6kreydanfp4tc3466p6vvj7v2g40rlwl7',
                responsibleUserAccountName: '7tqj1rvwd5g49ralmh1k',
                lastChangeUserAccount: '9l86gadhfupqfdmqijda',
                lastChangedAt: '2020-07-23 23:33:48',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '6se3g36oqw2ttnxc2sjvy8468nou6l5qskpfrnlwgv7y0d2t8j',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'db6mso3842m0rs2y8jbc9frmvz5uyrkplocimpwao3of5xz1ueqm6m5t83147sygjti64765hcb1y4358vhn43zykc3ctrnzsodfuo7p78d5m3578s6h241t13cqc3j2yl336kttlmrllwu0ed8mqvg1o4izyo14',
                component: 'ggpwyic5t74wvlh6ud29h11hx2egr662fku55v5qdzjfyadowc1fdsquv72u2wlvio7u7l9y6cv4cjjigz3hewzodxtdcp5n3c85t477ur0mywmjfulmqhxoiwi838ewi1j5jwfkl0zb3vaz9fkn0nbyxq4xe9f3',
                name: 'jvrms1vfc1rfxqi13pm3v52mrec50fx0km889p935ktrvi4dzgas0wcfnoyjlun4o5oc6q3zh27o2ticfn6r205akc96t4u0vyk00m04qun6uxp63yhikbpqo9gdcohdeb3ddiw8civ76kmkcqm9d8pnjn6u3bvr',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'zau4cnehejfi3lvyxh8kzmspst7mt3ct6lzn8w1xjjy6p9bvcuksl4ttqpkspew8r5kdi42054yicarxi31nqsghzz67pvkm9lw4xkkavqzx22xh54prm5y7h8ti1dsviwjhuv15ohfp5euwe4r5d6q79h0fra1n',
                flowComponent: '9uasabsptadq2xybsnimrsz97uw60tby4v3keefle7yy6d67aczuhxvq0ks0m1n3u0fyb0ivgicetwpgcnhmyvi9s8akz333fsmfv0u2mz4sgffhv6ik7tgiyrun0gov1c2lt8chzjpl69n0k8u2sqsojr5sq3ue',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'd6ydtcn746exdht4rc2wirmyvd0e9dh62ez0css7mg48cu0b42ma7vwc5l1cetjj5e7m3z4slbjnbt3da3e7v428ewc4tv4ahzikfz7jn6f5we6fqkqxwv9aw2xmjkwkytwx909u3a8cz3kfltihnij8jsx003fw',
                adapterType: 'ecfh2rjabxmtkoawn0i4ywrevmjynw00v8zls2mowyjrwr9h0m22na1zc77q',
                direction: 'RECEIVER',
                transportProtocol: 'jrlo9306ldp7wh9lnozyk756fs7971u1ilytg41obbev3rr53ntjs8wfkrqg',
                messageProtocol: '1s5f97rh6c5kw4cuiap6vmfxc2eecgeb1q7eqei71vx4089eanrd6y0c92e0',
                adapterEngineName: 'f1lkyv1nkmjof32cjqt13t7hitosrpj55rew8gx7janla737uhpl4zcpigdrwlud1w5uyv9f5sagbfc9jnjh1a2u9ttawmxk1rmq25fock8bz0j7fboc4oe7douma1v91vqq9i9i3rtvyfmhpzqjnn4kdoiegvt9',
                url: '7rdfb642yp7ljot55ay0rkfgo3rvep2518p0q81tuo38hiij3ac4slkxz7uwsmqfc5q6nvwxfxtu3wzimj2afj1b8y1sktotwr3yes9vz5o17bh840uh4581kikkb07c1z5y9w01hn5cble9pzoap0pqcqf3emmcsr6gg8t255ifrzmvj45plz0q2g045spza7n1hk514o9q6gxbnslklirrvk3s7j6v9h1pyy8odj1hfdibuq9zccblq9syn6qawvx0ierr52rkamo1yb91r2m3s4cbsssmbhaxse17fkglrhl6xetz320hg5hriwue',
                username: 'o0mgmnixp0w55irszgyd8rrs47l9goh4iajdvuekh82lch2vc1pavdmm5pp4',
                remoteHost: 'kb147gntj9m8iw2j7bhj9frd9y4nqp4c7v28u7htk951t3q7fur7w4gbhah16t9xs6e9mjspqcejrtq6xvkhhptxwql34ee0h13i8v5wkth6zq0rio5wtslyz4pz23vh083vq76a9eqhluo8i5v36n7k231hxkks',
                remotePort: 3485547702,
                directory: 'mwg4gf9s3q9ymis56xsx86vazw8cirioepcpc8d0f95try3n4uys3422yyci7qrsq8dfadxhnu7sud50zgosfuht5hidcfearlrpo2y7bkx1sp2insy4bhcjxmnbbekj0byt0gkjsktxrfngza0czaw2m5g7ilem9vnpa7row8jqpmrxx44v3ai230wawl8ogljw36qcvxqk3patoytsskmtrl5080gg98u8jpq9r2lf03lbxoh8th3zwdimrrm4pnyvcsjlppg2dni7chr21tezfr236f1m5fqb5angpl3m4la582o86gcdj3d68ve4jzpp3jzkzv7g81lzoecjya5a1bq6b0l6wl5tqj7r2fkvy5jpte5zf96prgfs7d24gd3q6lhuxjajucmqjyqt93dwxf6lq1uu77vsueb76yrtpb4xhtvvv7g3zt9ttpvrxtik6ta3d4trb6ho5i45sdfzdtoj3wlmi3xlwvbj247rhn171ka7mcsr06rg7ri3idfbu3ihqesg1s2fjt8lab63bguv3s9o9ikyfeegyx1aj6cf4bsek64z8x9ag9d6g0paf1vx7lac2o0rw5u7xhr2ajvxnbzva640oawznk86c0g25olrh0ersi84i6t3apaz7ubnpsowvd8fc920tuviie4v5hg735l731e9glj04w9w7u81051eis34aqxf3jkvloh1f98ib458w5qto1klojzkmum8lxv5vm6mcxj0nh38rru3ps6idcqj9ue9yfyij5thohngkrb8pgx38955s1mzioyz0xavgewek5aul2bt7yfh80k5dyyqw35mvo07iplzyel0x1amivp6qri1p4wh45i2hyoquwoiuw3udgyva3tco0qubbzih15rv20y0ooibheqgzgkj0mfuf0i1eo5mlf8b0gn2643mkfc5udggwapocz4uf32lzyceytyu3szf4p8rnqyggs203zhh39hlu49kf0xwz3ugmj09lpntl7zjkzh6ehf9yy0',
                fileSchema: '2191ukn69a26vtxcjxiwq6lnoatmom0pwaqllwxcxrh9f056r52q1fr867fpgqdy2o9cwv8dudvn0rwcqqpkt25a941fyy3ap90nujedkd7t8i3j0wbui9lm5eyjjmj43v4hh111n1to2ug3lhvdrgcnaqmaqpcjg82zzpqptlmytklfanuu7hn1lrhw07gagbwhf6kyar4kw4ja105b1wwfzrxd3ckq0e54hgiq8xyxrwdk1t09wvtaxdqsqvd5jeix2ltygt23vudnrdl2zx0y6yym0aqzmuo2c51izwbzvmuqkzkrdirpltgwua589fj3sq7wsig42eu12j5v1lafilmnrqu6hh5bjltuzxd9fi1wtd20664ig92jku0ozqxqaxxkbo62s6su45z3ytq7aofpw4du5ftsgepcfs4w9m8dvzakra9oy0asnyywjo51yqn368qap0xet584yb90g2ph9dhk21xbv1cmfjbihgzv6rkdhabilgpebm0xpxgpsv5gsu94dt95xf816grkzy51jjhn3i15wmazib0oradvp0u7qziyuxyld329im2g6hlfwzzbewmmkwquxd7ymmzk4rie0x35q3wmq2s610zuxh1t7dk8oox13zak9s9rta495bfvvp8uj0af0jzy39b12df1nga4mfsrx7axhl3zuqc8z9s40e0fu0iwhk7lenn3xzda23y99l8wfdapdqd6d5tgzwmuwwuqwzy9p4gukxvi8f1g3z689r98zskimhf505v20eo8nn685h0mr9jg3c4izb8z9so1zr14k17taj7bs1sfm9jcd9vhut578xllmx5r1qbr5uy1wg4jksmu3qqa0adm16gkllvktgtrpmx6alcjs11v0rpu48ea7d2ashoctjtkbmytt844wianph7zdaxa5iuuw0xv7uq68vy8r0d47qfdsw6hawpjzco5qp5p1jpj8fqdq33anrbrqsqkdvsq0rjukmqa2a3qi2z72fiog566toxh',
                proxyHost: 'hljvfnrrb1aqbv5sagxp5wn95pv83w99ov3qh6iv50t7uzofdb9idsz07bvo',
                proxyPort: 2478038522,
                destination: 'jeytb7fa9sc3up9yuz0eaezpos70etcyb5hmylynps35p5b9400h5bywr123nn9j5r2r4oyymzik53dlfmkapdjtys15nnstnhl41eonyz3xllze678x4vlolereasfgu6jqj7u4gsffquhud2olrv5zmbb1me1k',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'mbs5ejxzw1bajqcxhp4t4sbru9i7stai0xle8w4j9cn7fnvinh9gjzk9g28b1swqsmyc37mqp90jz3p2wzfdub5a2elxxtsox358i698se9bwlg2bsce1wad45g4wlaxku6d2rhv71nuoa7oxgc2effyt1hbkr86',
                responsibleUserAccountName: 'dqjmqxllopj1p2bmf6df',
                lastChangeUserAccount: '80xx5b39xtludzdkn2ol',
                lastChangedAt: '2020-07-24 12:14:43',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '9j3akwl46f25b5s8fye3hxb6j9y0xp20vmvtynzh87clkbikic',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'fq3jkgdthhcqnetmtsuftbp343olbo8d19148ap7emb44kqcj1yvlqd3tcj6ebpunrqbhc07g52qc6mc6eyo0tx5meuoizlmqxfsi54g1d4wc0fkcudljy5gzy4i40v7fbydm7n8s3113gaj9onu4e031ujl7suj',
                component: 'inicxxgzmm8yanyitn7ysiazmfw926rrc2jw5vkdi6arnok8h3sofpazra6bv1r95upuujoountr4aa34bku9qley2ksms4qnc5qmhao1x863t5yuwadjeb21x1nzpy0tw2430asxboirjtszowwkysg47wlrl4o',
                name: 'pu15qoz8tjrw4nz5w6ey6mqynpa09nnioyxgg0txfsb19nzjvqhs28wmc2352p8iii1jnhjqbtz9gbhxkb5q8hr4fr5iwye08dtd1bm3fxcznraybwevwtn9o386ex2oyq7aebinql7dcalupha5xu5kmqielxms',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: '8r594lzwwp68lnesfh648r7ol8sbkdltqpjvjnbhcd6t1hfoy4je4xktpro62jndopi03v2cp7lkoqz3q1s5tgajapajonmdj6ftq7u4lyhr0pqa5twcv9hkwwm384jlntwspg813q4oray528bv89wb1tc0nbbt',
                flowComponent: '86bmq69s0ip7v1bda7p8vkxaee7mvm0qmq3083zok6ie7c025tjfvsryn7bfonng98kglkmwu9718w3rudz9vgktezit88xnt734gqxg5s8iflhn11hvrkzfyj1u55uq7fw4traedoaro7yg97rigk1ah4lww6uz',
                
                flowInterfaceNamespace: 'ap4gkrofmckot1azmm3eakhxh2lt1kkif5r7imyevmh7zajoxyaoaah8qzct8m3eebg47ntkcm85oxeod05xkjjm26d58rsh89mhtl3ao8r9z01ylq3livnsqzlsgj4gv8ur7kd0e8jsmlqwgec7l4fp3v3r55ye',
                adapterType: 'nm5njlxxc1odmhu8k8qfpsgjh7m7geba8xop6zzubg37xotq5g4bvieij25g',
                direction: 'SENDER',
                transportProtocol: 'q1dhov3vmak1jhrc0ugcmgi28kje0xqxh92ydf4hx92ob1oqux5y6qbu9egn',
                messageProtocol: 'tysodpa4ygjnvt9iuc1fvht33eap9z4hxnyxoy6yww3nujrmsljx6dvzt819',
                adapterEngineName: 'skieeydf1vnhafb0li5q6j84dqenwb3k60wopldu6vgo84vyjv6rhig4lf3ya9f2l6rhz3rrtmawmyy5w7sxzqvxj79rksyq3n49l9ax28uzlos2mguhl06f9yuthheyfq433yhz743ert0qx3d6um9j4iqh0jrr',
                url: 'zw3l52xwgp995sb3a35fz10qhjyp6k5cfa1f7wxo03otyp6v849ysbmljdsqbput57bqg5lt7dfb8u2hhblevz4d6bswf4m0ydcszizgtxdif1p0l99o92f4q1lvcmut4h2f1at1sari0sbzcpk63iza5oyck6scno14ys3nw3n0pwtzrvd89ihhe40h3gx4ma3fe8accux6bqnyb09ccioupfmqxqvz9hpen7bck1kcc6bpqele0nq0cfggt8e30o0kovwfk3ymrt7x9guof22t1x2e3et3rlj27deqh2mv8wwl2fg31qtduat1835d',
                username: 'xn7udvjwwlx49dxexh6w4ahtvigcx30uvv26jnky9lrn5uop30a3rgjufki3',
                remoteHost: 'kqlu9zwgmp5egj8sksloixmcvzxu039ytffejvzwbubuqyjoz7l3yu9qjwuq1cuiy87ssqtegzc1807x0lcfr2u0rwuu0j6sijq6adndxb075v96c3ebqpd90wrbpo0aija7tcuk52esqyscaq8mcglga1cp3iby',
                remotePort: 2449877437,
                directory: '72didhcejgmlupxq6kpn4mxsf88e4x2tj5kwjn95fcm7hlmzt29ci3n0du98p87klrvn22lcp4p4pfpc718dqfs8rfwz528bksvex3errittf6ir01rvfvffuoxy1ajwm97zyu96w03c0qlfvj61lsrx8i6ai0wozuuqaprxythcswkqhoe1yta9noebbnpz8her020x49n1j8vzp8cpnrpm6wq19k2oye5tyr5kffkbdnqvt0omrw9fqug50ykwhkxwwnffdy9zwvmiu21pfuh4fhme3vwww6f3zmrv191ls7sl6zhn8se3kqioawr1ipx1skwadar12riogg4hed4s6n014wiev0kbcnzvekd27qltnmxeis5pux3rpj3de5kc6ah2ejbo4nnej8tgd59gatmgc0r6a7qt2x4cxfjip9xzic9zz3ptczgf8tqu1khsjuf58uc382ddxolp5yce9okod4h8vrm2nc8e1e09gx6f3lvlxkewyj9ls9oovl9e0z5m0w4j1zgjxypfayy88sucmghbr1uymadrtlo15xxth17gkj4z0iw5vv4y9cgb7weoyrv6tan4phpsr7jv95wtvcsj92mpfpcre38xyuey920976cr3hlcco3afnw7z8c2sf01gxv2mdw0sy4gecducwjz7ohqteobt6mzwvuqd742w1rh84x3md2kv668n2t3kdksowpr7oms53wgamioalra1knmmkfod3b6w1fsr61beyatkycp55h93q3ypeljwaj403pygo69kd0cpejxhxhh33176mv4n9i1n47th9ohqute1xrxryo405fvowfh2m8nz2w98za25vn3ijs6u3i9drpa1r49jfbbi848nbdd5pwgjlyhdi0qk4jug5cqfktoprhbpzups4fx1cr0frupdrzc2qu7533i9c9mhb6edr2r65yod8q67h40094b5antulj8zu97c9lyiutm4p97idxwa7qblj1155vk1u7ln1eke9tg0mq6',
                fileSchema: 'beuksmllwussgl0cvvd46d9onq0wgm2hx4um9dcb7wr6vck0bu5aif1tc1m3l8lmtv7dg1nfbmmpcctjyog3dh6cwdp9ac0cubnrlz2fwgu2mkcsuicksbe11027xmwdwc79kwyes3oyvcnwutsj4e0pqb2e58l32twdqao23259cxjo9l8316e2he57yn0bnz9kryvkrzj6atyhgvsbeexjrubeclzhrg9qrc21u5lvno2670qsvtvr8zivhuuirg7m4zug5ap6pw6qhciwmnt7kvg4bocvnwpxmtvbevs05n8603ze1lsct8ke1fyut0871bepfbxkosg2bk6lh0vf03cl4ybub5qcr07h7in1o66fsdoer7ssjqds1o188zi8g0ojg2oy9k0oz4c5o4x76nhmici7r6krd0g9hwosexftv2d0pxo9skyjoapwg0iervkkcss82cumm15fsri3m24rh3htic60zs7rron0et3gnqb4702p7faqyqbgdsfslmgxeacnmb1ebvh97a3t5ggoyifeey5t03t818zvz1ddrcbg9xam3isyrghjnjor715dfyqo7julocetd9svf18aa6vam5mmoc0d5y6j2o3emmg8ogcs4823hqoxs1udigc5bx17hqw3h7kd0qf9kxmg9up7s0vacye0korb0o0bhowfgvo3oirqlpomnyu5pw0t9s3es0zyla3o1egutvu2521olgpt9ro36y706aocooh7sgdrgogusqvzix24zufe4xcl82xne7kf53f1a7vzfda8k8gut7cq60fv4b3245mvdgmsw0p3td8vb15l1lbrmyjsf7h2c2pkeyaq1uq8ng6bjgw52vfxe8bm3c73pnrwp4tukvl76xuv0ubpb1zytwgh7hbfcb79bv1hdfetj6t28dsy0ur2p5rt2om6dep4m2scrbqqijl3ue67vcs59iorurtea4m18ykvqog6ohngxcqf0rp2inhvj8i8u5b6k9w71vzcvnxh',
                proxyHost: '2mqqgj0l1f5706x09c34mp0md0rkvgl7cxn9ot5v25t4vjha3li3pkfpxzhg',
                proxyPort: 8471942418,
                destination: 'tj5s8qn0qh44dxhdtxjmo879gcyyus49nseqzzyyllfyudbozmwy0s5bdw2v7bo4n535pv7wqwqzomkjajha1h2rjb5k8b0o9a8uuplrc6pirml04ea11rtve4r9zb574s20ziyraioqe2akeiw60klz43ju5kt4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'lhewve21yzmrgrwswkn9qqm0amqdjixqua1d23s1f92izxm52vymehbc7twrq53a3m7a5vc6aslo5nyk14saiqcz3i2licmytjfmir1ctwwo8s20w434w8b44dsml4t731ghjmryblekmlx2uu9i5ygl12wuwgcb',
                responsibleUserAccountName: 'b64q465ldeqs8nse7nle',
                lastChangeUserAccount: '3kkqoy2y9nf1fn00kkxe',
                lastChangedAt: '2020-07-24 02:26:50',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'yzypqc71ltac64cxtnn4b7bufn86luj6v1f6nx1j3mko6u82ge',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: '5m1u0jmfzu148hfh3wqeub4j98cwjnim6z0pplv7zq7cs6apxbtnlqphfqhodyomscax4grklzwi9ihkvl85sbd37av98eveht4h1x4amgesaudkoeasjahry3zpipudne6ryshswt3eiv04k2jvngixwlehz7so',
                component: '1vxark7eahu7bb9y4qem2msde6fnvnksgh90xfm5c9mff34ii9qdqggdktd9any1ce063zb573rplmfxibu6s9ashabqii5xwe3vfdyflf9547hkuhngcsot7xsjv27r65fkbb2k5gbg8ft82yrv9lfkc8w9hnuq',
                name: 'jyabn9wck45be3cza3donf587uadg2i8t09vqwyfhr5ire6uqpywqtlwyek9x73uuyqgj2m2sjtjyhoxyux548oo58yodcff0w5fftqnn6nszfbdg3mdhyxo3b8iwr8gx4xmqopzezjidlnyeqqu1prnvaervehb',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'euqtnfz605uuleu2ga0ojlv84y6mdzzpfkuv1qfj1g65iona71vbln4czaloq71sctn2wwz2ktigwq14r4radtqp6rjov7kxp54cwnh4b7cwpuofg4oei4sk1tu585vu78bnt3876xi8ddwdt15riazsx4kkorf9',
                flowComponent: 's23m9hic6nsg0blna9inzrp5d73u3pqmwmstbeos7j59yjbtb2gx3em9ohekgph9p2alzruce31tvn0ixxp82y1jx0re44bx4eakl7glfqja10z985z0z9ywuach321580bo9mqkkrr17lj9zyfpv8rb7z1itss8',
                flowInterfaceName: '5sm9sjcgzf4i1tj36vmogsuz83hsd7rpr53ls1xmr3eub6ep77k6b31nt1rxjjhvxj8n944e0t5604mxm6w347qcj7zftbhyzpsmf633wfsnkc4lgb19e1xdzlf2zddalq9qoks7qvvcon4qtlcp02vc108l7cny',
                flowInterfaceNamespace: null,
                adapterType: '4sb421mfocjjvxv1z7kystuv4nd1jujvj8u8fow657wqoy1jlfx7duqma8ck',
                direction: 'RECEIVER',
                transportProtocol: 'hgxhcvkk1mfgglaguyfy3di6by461lizqvyhc6ukm9405s7rv0xvslk28525',
                messageProtocol: '6jo51usod3a9vdg4z5gbz2xmcouag5mfnpingyv9uqdrz4hrhb29poxv58xr',
                adapterEngineName: '2jzqg1d6e9zbnw0o2lpznntwfxrwmk38n4qchi5fjfx4cw7eyh0rd54aaso8v67uklf73l1qso11hsfqdorr29kfd1fcoa4gg3isx4mvc16c6fr56kvucu0qu94ida6f6iycwzg9l1rndftr5nom07u2s4bhz3pt',
                url: '3h98oi8xb7ol4fls1gz9zyw6b91py3876c6fvnb1xqdc8j05kg5pviiq9dppir3fnxnmtjp9nh1br38hzyai50ak1w2po3b06liisvjjusczwdu15a0e8wbaqfe50ygfq1ui3304byeua6f254e1tgr346sdoqqxhhs9bbunui3hwz01xhwsh90oisp71ms4312qwflkz1jmlw35454g7negg1ljqugvgg7r9poff9ghwpe42k6pz49h3y4yr37dqfu32y5ou1aof2gm2kuoqpmafjo2y3rca0miw9pyucn9ewrn9qo1hqaemkxbci85',
                username: 'w2i4dozc3mi6h6lwjxr617re3y4c1longogdi9ha6cxkfm9mgctmh8zuz9h9',
                remoteHost: 'sfms3v5r9cw5ht0juz3jae7wtezt64pbc1x286s14n39xzzrrvz5i1fzd0plhva0u8x83hbr9bol0ba864hb0bz7aw2folzrj4x34gs0l7t9yvbj9ap0gefwub831vutklta6sso7fotpxurqhkdf622fyx7dogj',
                remotePort: 2889791620,
                directory: 'kj60sw02uwv2oiq2s15gyxjgi38yx50dsxdq1racfbzyvdnejl0vscwg5294kjgtpd87n4dn24dzjxsgp5385c1asp2urz8vungglyk89j11wskbzh1cyvcwgswr73taqxzz0p4vbkra9agtcawry56j3bp392zoycte68cr67ixo14icnc14e095zd2w93vbvpu2pw8b4p576hzfapspixd2zlr3eawkrv5e1z5k0qost6m83jo9wzdg8s2dph26hmavg7l4bpq86jes4c2pjhel3o4ieijgaf58y6venn3pn865ec1u49778k28kxwfj8f8dm72f9jjtjn6nsr748e09zk5y9suvtmvarhee8hxj23b9wyqe4zq66axj95e4y9gzs1pq8b88uxqpp2365877d2wpahdv1ntb3dea9am2e7yxru8x0f99fjt4ny6le9byrmr48vinktzq8401opbj2pju8kf7ks9tzovevbs4euzkkecegdvylpcpr36x3tu9ufn90tzfe12x04lbux8wm9cuk74awgqny41i6ut400dvvb1oxobtrbspw83ubfoly7t5r71val4q0v1han3r9nvx4imh2b7u7nd7qurkb5xlik6pezklcpu1kea9wurdvsbxy6wa6qqhbao40fz348jxsp8ncojik61470q80sfm2antjoo46jys7drltwz6cu2j1fut7ltnhuopxjo82cweciya8odwwg17dkn1j5provxvfnq13542m1phuxsidv0ftwdmgmix04elju8jbjat02qlumj44ig2fqggocwfwy5iz2t6ipcr0ozxvhupkxxy1ny7gpz702qig97u58h4yh3473jr113ies57y3dtpqyqajhb3clwcvqd2ufrxrijijnq7qih0machvx88p9uy98ygo5b4cd7a798nvnk83xg5fu9el2cx8bwnalvxdxbfj2dngmbk6vsz7clropvd3hm6uwcexpkq2ui4bv0z3trv64y4ylxrl',
                fileSchema: 'n9zagd9jna3h8u7o3r5lafi3urqetr850l7k4wr5giq230bqh14zhvuwx8zaha8xv4riye1af26vm3ecvxkmpfj1hr37fs4uj4afqafltdgaj1j3vberyaozlbp6xcmbc3y2gbsytnj3wv22qywa5c3pfu4qtnpequbsuyks0b7mb6gd3iv2mu0l91eahckun3aoeusfhy5kvlgkabl1yb5w90cgcaw6e4jxxmxuy7oci4b57ukzrpxahu6kmqebg0v0kt5tqfn7xavmiy1teko981qirbkgpzon6etl434dda2z4jwvshiyx9asqkrw22lbqqs1mdevwy7p1bziw8ahknncw9okj0beczivzijctsxk2xanthi4yhva800l9xlb9ntiwgj34w3r95kf9z32g8gfjrrzlskr7q7wqu6h2bhcu03tdkezcmldxrz7wkivhkeump2k6rha70gv2vpzbrtmowek07j4cksuw9m0hiqldl6rj9dljtukrmdcm62eynu7yeseglf87polg50oi578jhkbf8m38qm5udvoln27l9g2xozqpjfhj1u6s3yfysukpinybrniw2by7ydjny0qqt18ifddj7ny9t54qglick0c88wn1tt04c40klvybu77lqw7r790pmqm3n7tjtxiuywwz6e75w8orr7hzvxbqc0w5wjrvb17it5k3r7y23ijuv9kt88jo9k5i3ar9obqh5xwv3jjd86qleq903uz493telxtsdqe0zd0znfses8sxeavuuo94ryfkzf6cohi9ju7q5rodr5rz9vh0ooytlz4q14l66p63jn3jj6l5osb2w3prqysgg20byujh5m390a8viqj5rpti4oamvln6rab73w4i36s96ig8sasm6db9pjljeergrtdlns5zukfztmqv794qk41oohtctfw13yxs5mnzfq38kmyfgv85iokzecmxdpk4e4placb5yd8kbi3rlhua53un1bw9mie5yquinriyhp6zi86',
                proxyHost: 'rubgz8nqvh0ludu75700tr5s6t8cyc9py2n05k0819onhpmuddj155262bry',
                proxyPort: 1825562334,
                destination: 'sw57a83musu1nk6ebmnefru2qw6j9nb63g2ijenutlocmg3di1z8eyakdfuh5dyt1pxkdw6urgto5j4jp0zxm700gvousim77rh9cf007fnlqozmhek4ym8hkpd3jrjlwxbze4bcadw4oumyi8ydj0atqo2wg2v1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'sn9oq1rmffo1hggx8yputga2194yap7tm9feqbpmomyb6l6y80cjghm7gcjqrnvpv7zdrtf0nobu5zvz2ckpmvxz6n1zoja7fg03wkio97sbo1zenx9qju1otxkgwqmjn41a27cz57dtr5cf8rhmompdyoz8olfr',
                responsibleUserAccountName: 'k2bvv0vp7mpx37d288d7',
                lastChangeUserAccount: 'cnkr1th976okaqemu6ig',
                lastChangedAt: '2020-07-24 00:58:38',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'k7ty056f3dhejbcljxqhgb9dkuhucw9lw65x6vio673a0h7stq',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: '3cbignxzk27rdab2m3qfgw8b67oepg4q7jl51sty8vudipm97vzam0hib8wn3vombbah86uww8k5bxmcbc4xpazjik05ccuzw47o4w0l772yl2fl78x7dhe1bsrfavrohz8bk8zybg4nxr63vtnn8oa57xwyv3fi',
                component: 'c79cxt9i8irlbzl3wgl7ar9047rc7eutwm5i7vuqbbh0v3q2uobywm8uugf4q9efv48m8v4d5ufqm6nqvj2dteh90mrlvow117zsc3wwo96v6ch65k393vpa3vvp1em44orbepj66sqd49ko7wnp46ghnk56xoqt',
                name: 't0koysys0tyoipxks0d0tc3bwkudwn9dmgmcsdu9hrq9ner52mdwh4d0zlrtc8rcnaoufi6fd7fzrcmlldh4w1b8oljtajmexkiaiw9hg5y4j86f1f4jrdsta1cakan2inw0a9nl5vlwwooiu0oeaitsv2205z58',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'g9l4w86ohb3ki719lqagj5max6np0zzlqvx1rmbds3qsw1uhpzn9xi7tdll6kn3wilye5roz6pv3fghg4sujbglzb7hupf3ptkevqbf0ytioyz8yr7i9mwunl131epv3in1ycailx5jgnlkikqw46148i62vk0dx',
                flowComponent: '65eig2elt0wcl4rql7pzbctyuam5jvueisfic7iwi3j9tbm008yk28lg79gj8vy67lzf15a6vfsocadtvu0g624r5uvq78io77glms1xlq8izqmomquoggtm850zhir17dwhiu7n523e6sk7lzs5popf7nkzg7dd',
                flowInterfaceName: 'fvb0fvna39nr6bxjmwr87pgz82qtephncomfl7t2creq1tq5hugsgb9ky2dyx4jgsduggwilfl17tkjikv7t5j4ok89pu5tilrehn22nbj0bn5hd0rd0ccrcmxpfqhen4b5ivykyku2smfmgglr0ways91guda8d',
                
                adapterType: '6jveb3lki65x1hwbk5obe2ajwq4h61obplfq4j5020uenq6kyf8kfmotb1rj',
                direction: 'SENDER',
                transportProtocol: '1n6dfaor9qj0qg8hzy8zyzeauc3cmct9rudq82tdtk648qx5yvle93lesfme',
                messageProtocol: '1kytxcmbnov6v29puuz3fa1521v7zirujkrt6bymucprmel9ejmopitwew3z',
                adapterEngineName: 'fa0hovul77c11vf938bxuhazavel0gl6xl23qm1c5eug2m9ntb9cz21mq3wohjc1pfcqw7uc4nx915dt0e6h273o2e18essh7ax3zw9cka7x45z303936lq9vcqd8kf3s1la258bt0s4yj80vj8gm4a2cbv7nu2u',
                url: 'bkg2iwj4vjvijup53igftaknzzwqziid26frglnukn9txmomtxxzjkkn6vd7tmr13w63zw6ahp6b2e77lls58eokg90c9bl64vy5vg4hbuosk2jdkch1idpb00exh2mg6undskmw74hzq398sh3jrr4wqh8g2mxhjfq4wjzn2f6ktl4appgr7c5jhc5ry870o1gxtqm8m67q7iez217vy50plwe425fai4xkk3htuug9vc88qcupzvp51rsn3vrt21nadk20ip89mapgz9pdydmfjspgv584vf6e8qtxlzyz4vgoq9ops9zn769w04uc',
                username: 'ty0g3c857g7c5dsfnqo6tacvt26u14lez6hv0slbl5is1vd8m0m5yri99z02',
                remoteHost: 'o3qdhwtxleme0hyb9fewhzyfr8im8vnbexd5gc1ipj3ta92kpht0dmytzkptwdz4ie7jxld8a2c3r0b0scp554wtineq1byfa86lui4g9ofnsypsmu6gfpe637lxbj6q1gwcy30w8fh54bqahh4givpw0osvlr8w',
                remotePort: 3189583106,
                directory: 'rqraygzd8i256o2ts1d8b1aex9q4cc8y3hjbohk5gp8ipffr0cmq1yfg68fv2lt5m40nlh2frpwe0sl76fvgfmjjuj2i78dfi4fvo7gjjybxekjocpb55i8z0eejymx7kig0zkax102f3qye6wjcx1v28v9964a8vhg717kenncrf1lt6xju79wfqr63h70qwi3cavdjmzou4jay85klkuawqh617t16ewwxx7d5a4p0vylxbos6at4yot6d57sfcgp9czrnsscg1rmvzo1fghbm4ygciyhyklq1geexei3ii4f484w5b529gn4jye2ybioqb1elaxaogdswilx7lahpoeht4f7ttj7st4an1ciwntkwf64fniyuiiyu1crybi03mw0pplnq7hh8bxskehxsqxcsuq6k3xnmhv2y1gpxmyj99sjvpttmfa9jgbj1b753w4b2rljv2kcjj3eo0k8qhuh5g9bj25r6rhl12isp70f2n5l8u88bkmacvoq15gz3n2hafgltn1g1nbf5qcixisppqjmzkmbj7kxws81s37e1f7b9xxubrx9v245lgy5ts70fjv4bs55xx91a2efkdpalbpwxyuuj4nprkiwk3tfwwqbpy13qac457e86tuqhtu2hkq4uf55bqcul73rjreh57tt2xl8ebe3wzamnwnask4tnwfaac7uvrbiyrsuknph46dtqqm3e3wbr4ulbbvlxwf7d6znrj4f1nor08n3ykpmqcxogqvofceil6o5nmu64ovgp0g06cn1kqxy01r48y98f4737w17152v2aq6sn09i8opz6lpld4lgz0eayvaonlwfy36rfp16b8nif796mzxc2rlx0unttiflmuepimjxwlqkw2fu5wm3b6ymljnqqs69mnu3ie4xk6229zewv3svzvob6fk0zrv74ypaqbpvqwufgd8jtw014wz0vfyu9l593682dw5fvm7iy77a08tz20do7hskgqc4v9djhsgqband5nsrlkfr',
                fileSchema: 'cmwkkwpcoa4i671fxdi4j8ttiimusz2944s0jsyqzbkiqcex9aj9ojtvkp4hds0sj3bs3jtaybst8ryhowj1kj2ao5rx47keq60eihw3aqn74vabrlznk3bqxpuz47u0mvq49h1axnalj4zlu7c2wki4y9s3snsvl7rl6hdf3t7j5hetiqt6vpgl9vzybyp13w49z907htoejvl36otldu8zapj0rr10rzcxuncdtkvjukbfaqif8xgzrr4rj77v0xxyba85zsqcus2snz2jqlcer27wa7dzlf7esmoe1k5vn3k33bjyn0v0beo3znzxosoikc967c1rin2e46mwokdx1wr6924y3qyxe4bmrf0qcx5t7m49cidd03xuefdpi8c2e83d65cv2ga9cny534bmczengp8t3a2i8h5xarpaqf0xola965h0jqfa8vtnibgh6ova0ki4skxawom27gdsnpgvh6o3iof68p7kb802m8v4fw4yp11g2ooffsvjcqncryzompclnyzu5a5rhgjj37kthapsej7ia6bi4527r8jxd66nfd1ej6g6ia8wrkpazlbd76kwqekg3968g3zbi0zt26bhs5kis0yzmb0h94p0hfeyhtzbb0sh87z9wq83t77ici0rkz43qpgxy6ocijmr1l2rq8lgfdtw1n3khloixbryy15rli159qtmj1and7n71b6x4pk37njhhb5sgmhsc0o7wdwepcjh2lfyv9zz16pzn72xs42h1ooahdmuxd6cror2254onn0fgmy6kba0xrdc4808e1hm359hd5xt26qx61eonz7gpqz3gtotd65x05tg1t80xqas69fsvrudqwerxl00jg7i6fckcq6qoichvjxitii5q2h47kchfjbeol9284uto55z3kvdbt8r51da4l0uvsh19wf0ch2j8fzhd0lwo25clvn1t3uf5yw435835tf11m87u9vk15ftduh1657djm9b1k3pe1lp65ox1n41n6buwjbm',
                proxyHost: 'p7orn84y5jsgo6pgz5yfxpcn605mc6a106uenl7axg9203hb9oc7r2fd2cia',
                proxyPort: 3309548344,
                destination: 'rjn05bxbnmuecbuj8pwo401ephd7itw9jccofu5mhd7c7xy8ipc1j6ibyc38peo4gg88gzzatj30rw615dkvp3qzro03l1x3ukz8vvqt8ueqjavf6m46j8s468fw5j2x4znihspxt34b652jxn3r2em26ae52veq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gm1h7ddqi96ddfsvnlcd5z8jljrvoxm9tfc6i1pktofi8soq5xtx609w4ry5apghw4ckdl8iqd5uphhx9b98q88melff1apftf6m8fd1nhgl2b1qahz6gjffqhqkvpogegof42oj5s5077e9ffmwkejkcer0z5mq',
                responsibleUserAccountName: 'fjics9rsujgyqux1fpae',
                lastChangeUserAccount: 'htr6jh1eni7e9ul7rjra',
                lastChangedAt: '2020-07-24 09:59:37',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'qvfthx6y4pkptcl6owno9qjjwupw2b7kzz2ph8oyt06gvhas7w',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: '87pn2q6oqcgdpu9gghghcsf0m8npsntuu3r1f2hw120jswvzkyyjn1lnqsslr8wwe2htb2zrt12h0lwgae821k99ud33dbotjcvahdbfjdvgzyqzbtcbupza3sjhogcyk4g2zcpjsgsx9w60x7x3a0tur8rxpaph',
                component: '5imvnk5tuq9n7mtfgrjhvt8ws37kaqajzhcluj95v6lepzsm52pcod1o55db2uzo6hg5ynd2a5vq37flvpuli29bq5c5lu6c8wx8uio1mrbpkciw0znudx4unhsetahv685294wsoanuczajjeie9ld0qpjx9uyz',
                name: 'v621zk6izv6oc7iruxs0xtbecc55vos23qjl4dqdiuag6k52p3ikdo4q863fklx6s962fheypjy4dkjqqxezzy7fmjk9a50ayvi13f89rpxylyyydz07ebke9w74hl7hag66nh7flkmjf4k1bm6wwhokn303vq71',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'xxs1cw5mo2o99sn33nwtxr9owv59yymbwe9ygk5snnnazwn0c3oagtg9ys0y53dk5p5bqgp9deapj05x3def15vomxfzqu1u9xjqg7mq0bpv83imks9uuiwtd87c66ohnlsd7s2thj9en6azn0da5gxb8airz5yb',
                flowComponent: 'cm5y6ak2qurmp7yrq5ehk4at0xjyh2x2i1kcict7jvsbm0k34ryw3fealqy0xa04l54lu2rs9ohf10brkfw12xy877xzjl0yy794v7f4mkt9xtnm45jtwidm6yunu5yfa30yors2must7fghzdspnyhh55hsocm9',
                flowInterfaceName: 'mqrbu7udfy1rksqehkxk2p4n8dt1klk90vv56imrwquu1ul6is0wua8akognaexrh18ie47jkw6dst8oyxwtscsqe0cge1qr8s4w90z2cdwsntwbrus2065lq5rgzpctw8xdf0ap9jwd8dcbwhmknexfd9hha4ue',
                flowInterfaceNamespace: 'vek71l1gkmgt21i3jailplwun6j6j50tnsnqtdxyrfg2de1ee901uo41lh9bygy53832pnyl989w9s8hzraeamkn30u2ttdr0awfj6c98x9rjvn29mia24o1ewhyuu886esqkknk48lpkj7crklfbdhc3v3q1jbb',
                adapterType: '9si8n0967awixmdt04oia0ehhjz2dwo8t9axchj7zuz12d9lvyarb5zbnrck',
                direction: null,
                transportProtocol: 'uxetzno6hhcx0vhi0xgnpxp2xzs70y92cakt734fykb6cbf21ynoyq29zly8',
                messageProtocol: '0wkm33hoq9dnavxdi7yamcdcjh066hrkode8pxaq2a00ssb2wcagew2xczk7',
                adapterEngineName: 'c86vpbwu1t7dgrny9l552qlihpr8c1owyiirl1dj8rvpc9z1u0adtugbymqzgjy5kr5k5q27pjofz00nflo8oj4vs4tgvidedoc79kffki7w2dw0vxrsv7hvz3atp3pb3yzqt9vvg29z50u09tjj7iwpgb8clwgg',
                url: 'mnr5spj4sxb25caf5qoedsqb8no23bbj31xokf4cv5mu0vyqoj98u1p38d8iqes4z929ciuumeaohqp6wbjhf82745g0fnkd1u2nwjaeudpfqbm7gug1hu0v31mgfmz5j0v1japzn8ryrq0xu8gvmshiryg0of6zi8yvhk2178ubqc8xlcz37i8cibpa6itz9oml70hjwcnysro0hf19bwhe6y5hg782g2kwp1helxdn3tvoo4b9r76mekqmcl9t2iz4ckiwmb8204acb9jzmn4kb33ea8a4ppejmua05ch1ywyhb0zb1x5sgeezff7m',
                username: '582q0k9ssixw3sml1mc713c4ppfn0icwv38y02z266jtm2lf2dfbgk75dv12',
                remoteHost: 'fovlsjva9spm82d5k67una8jy148yoyky5wh1ejs0cgwlf83rokiswxf288rm7ikkdefsrlpzmcqsa5pvyldzmhssofuoqq3xl8uf8k6ui47da3f8l57sqmfef1v0qumaqcerex0dipvf141c63cw9rsjbrz3y3r',
                remotePort: 1734067633,
                directory: 'bgxlmqdezgjst38rb1lesnqm6j0gvwgrbb16oyh93qdcq1wy65esuxan4n16cgfrcb0qkw6dbre1z1obgt1ntsg7sopba2kp8hk85yp8l3j7jc7jtnz0dynomcfun46rlbtbap8iyvkrvqpzai8fi1fgbih7ndxnivou6pz0ru5vy7wn4qnb7l73cy9u7wqw9c4c3f717bm6t8l893c4rb0nb19jzt6i70t7av2a4n7njp4uwnv8e6n1mdm4rbal924n6hmvub7o1cn8wq4150n14tn8ttx0edxv470vn44q5zltjjpfz46vhqfs5wkn0k73gmj4vnl8eumd60vtiviwngstzv2gy271xrbn10vvmq2pb67eybti8d9m0w5eyta1amxxq8hypp3h2uqxcd58lnwuxj6ccxrtsevityl3oets4k0wthg0kj8gmbh8adlj0eh0y0nda1umg1fazvhjrd7z2o059xa2ynf0aasyyfzglahxrk7ju3zq1k6i95onppjqztz7td57ke9jou7vu2wg8yn7v6zdwe8l951lia69clv2d3lyhnfqyjkfswa7e1k8728401d9mf61ljs7ukg2m21iz888s43as6me55sachds2yg5dpynoxam4qpehpiulvzuxoszctvojlk7mz453dkckgh29dvnqmpwagr7feugnsbts1drjjcb98mx09w2ya7tsd3ou53bqevhajzavffbgy1fl70omako2okwuj29obmnu3zmpx6xy5k3heizuezbb74gbie7v877o0gof8w7izzhelei6wmx8rlhh3oq34t0hb585e5g1xilks5oqtunfv1jzc0bwb2szr7hn91xl4uwpd4q6s6gebn7ltjck4gtdyf2d5le9nzascgq44n001rmpsplq5uu1y8b7hoiow76xlrbpra2hqgmwajkz7iqktgojmarwhx5n4mhg2ni0dbgprwntf69rm2aigta040hfdfl2m06ezfvoddy6civxamgd1pj',
                fileSchema: 'b4f17aomfisuwzsvr8mb5dnupvxwccre7uv0nx2rvmbok0x50pm7vhog9bnqnzv9zl3q9lp44k1l9rfbayy3lyyxgj87yim0slz367pgsu3jpwgualawkasj3deejzs3azsz543ziy7p5r2gqcx4onzhmqc3l5wmvwx19kkyr0oqipf8z207ily02qemfgkekluzbc95ms2gamsac0u87khvvimd7k3y0pzwr447vfcel9s628wugzf1iem87zsrh3wne2md1v9fe2nmitsu43puqfwig4pefpmtz7s07igfhqzrc0en2djcd9kkdszq05zeq2dtwbgmhntm03f5dftqktgld8ygsn71t97k7kr7fsmpwcys231n5zdogarbcqpuper70r8a0lhmrh40mcallreyqb8o3chjz12shrscrj1pznqk1myn5891pw5zdmetz4415gecbotlb6ex9h7nv2440vpfwo2jywque6vr7u20bex5ysnhsjm51pvtxb4ttasl1eve2l7daacidnj70bw7gi1zgvcpuk2aqnunbq5vsojrog97z50te5vwvuy2xwbkltgoubv6ebtu5nmsrnwpbhrufuhsu15el5yh5pecxhkevxwdchxchy3s42hshpbtlhzk8vs0wi9qnnuo0ijyiymsdr9041zsmukanuq7bwcmleii9g6ebkybemcwst1g5b25hj8uy6wijloow3h3slf8mhbt1693egho6aj2xbh6n9ay8lp324fbrhjievn69md6d3x4ey1n1aydqoyho3ea6ojbrzevh5bewbramrpid1tm55atri17ti2xksucl3o4j3o6vx6o0rma1qumvo2gs820f1e0bhnymsens20n4dqg026nhn0g60ioxc3n8pgcen57ptfm8taopwx21fho0v8fcxc6k3m37j9doqtukjrvdy4e85vea8d8dvaku14ox842lypojw37m4afv14ed5czitq2sqbuqloh2jn4ize4xjgg7xkg',
                proxyHost: 'l5i5l7ieo0yfzvdurrbxfshum4jbz5f6iw7ftj7qhc3kgdje6n8j1kf78vml',
                proxyPort: 1860988376,
                destination: 'k61dphk9h27a1wsqcrkan975r9w8emi36lnuyub6rhwsd9ia1zo0j07hx00u1c1r9jk6xrmlwjqipz5xjrnw0ptdlxs4uy707uhbxkwb61469aj5xghr3jfnbnj5qm2qz0uenrivmsbgfanjhwlykb7jsp1mfk3v',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cqx3i2exr3awocgga7e26ovjarles70dwpj9897n662jvmldrlw35qejxqgytyrxa7ppwoxjl1m5z3n1qjqexswlnsow7cy3ubc19qly3ju5zrxqmo88rr95rz5sdzdhyxhjrdas7lyt1e91dy2oa89hfowtzuyb',
                responsibleUserAccountName: '0xau3zmxjvgy9wnupylu',
                lastChangeUserAccount: 'tpa4a8qdf1k8zxnga9t4',
                lastChangedAt: '2020-07-24 07:04:15',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '93cm8ybimoqbyryycvugxmdhztkiqh870s5lht4pqax1o6pywa',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: '5o8mlgvtla0egxdfayd3i309yn3x4h15vl2cff1abtru0j53ee78d0tft7c9k6v47pyqdl7oa2u8t4qp3prq15kqe69s8tljlr1zzr3da385tu4r3bv7ywq1bg2xhec1b6xcahh9mm9dhkr2z3aek6samx4y1mx7',
                component: '26ikb26t01txgs22bnakd5ti388m0jhrolo65c9g8huxpkp7d9s26mpbmqviaxkbbpiwddmih3ixqbr69s21zhtcneuhfnac3rea0jtzbmr5hr9e4d0bfzq8bg7xmhpriwxxwvib4pihbbo9a2h4pqec3zyfuycf',
                name: '3wpm0wm2mqtsc6897k73bk5d6pu0jf2gwiynsu1r0bbuzn1dffmyzgihi5hhm0yjt42so3rp1q9ebki6s3pqkc85g97ez8xynck2dibvqpd7n5g3oe2t1a2ag5q8sjd3reaymsf0f7yp0g7hi7x51fpx5auklios',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'tatsgvrxo4e1f4bmf1gdk5vmob9zxxpfhlmnir92sbtysxc3dcrraf44eyuf01kohsdl7s6hpdeax7bmhjmxo5hggz41uy0evuxpatnubroasj5fq1uyhasdbrn54gljg2ysqbdnxmwrpj3omgxsmbirdrhd0mzj',
                flowComponent: 'tzgtmmjcoeoanue0018v6huux7e472mes321cp6cx7wn1duky1vra2b19478eyrbfeuqodp36qum7o05t7mdx4x4msj3ez6tcmyfn5g8g9i64dqn4occukzv6u2ov7sxqn2h5zd1fa95ngms37p3lpwaez4xldre',
                flowInterfaceName: 'm4uekn40m3bmau1y5pbkslo8dzqlsaof77y1kcakcmqlwvtdkrkwwvuwoaxov2iqzgzmbmx0p2n6ltcwxbv6ee61nm8v0jooopszzrws0ehmb8bu496tqkuz0yqkvlanhqgoxfnzwon0mmf035c7jzzbpmj09im8',
                flowInterfaceNamespace: '4up1fb3wcd0dnyl5nr2911cb8p0y1pc3pky9qslmzo4d0z3av6p8vwa6gk6mnvfleg79f8s10g4wb6fckjugch3cwk83hwg95dd1ve1x57sh97mfxa0fnthotfru33fgyimms7pgf9gfcpaz77lggbya22vm2pbf',
                adapterType: '2qkhibw0f7i5tomlgwq34vvr6b5wg1axront9kfvq26pubedm4pv0ev5hwed',
                
                transportProtocol: 'ate0c1zoxnmu5g1kp60t1t17h934twb5tb9hm3a5tqi0p3xo2s68z4pmw7xm',
                messageProtocol: '9rdsmornbi7js2taq9fcedjyxslr6odbzr4wktik28vw9leqi7v6te5r0g52',
                adapterEngineName: 'bcww8fvrvwmm7vh9z1inhmqowf2arogly2j6hwtjdvz8nlfvx0pwa5v8bnhlmhyshj9h7y7jpe33cky2ga9lfj20cp76xw276xw4qixprw7tpqq231b1n1nt9ywzfl7cz1in7whwhvf9a2iocrtxs0xquxp6z205',
                url: 'p3b8pbadgiovma0hdqhtwxri5v7avwnzeur2ou4s6p6fk38z12mnkkexmk97vliqqypjswxrt512fykoghqskcsamzs4a8dzed9idh9zjb4wy9st4uxcemj3svpinzhcv11ms2claepc4kcgxs50vvlkry2zdct242pynzvmcdlzfzbncti8aappgq17x7mq3u81fbnpk9cfgnwjfzixszd2vyl8ytsnj0mx066gkfft0hq8xyd8xjy8aoefbzgslmggiq5dfsfz6p2j4onbb07dgu4k3af6d9dg0ceofl4ay3rut5ebmmlupqtksyi4',
                username: 'uoxj7ajfddbekarh8ojvhsabdxgafq2r3gxnpifbzba5gi520q7t66stcm34',
                remoteHost: '34whss12mmon8ewyezfsc97mn4mczhex4mkwk5epnmubpdo05iyl3sht0scr7zlhfaghhxftw3dc7tf9id34iudcbmudpkjhlnep9l7v30y000rfzuxvseo6k148kg5ud35h4lymu4ahlfuhjvkmz8q420op18ul',
                remotePort: 7755939007,
                directory: 'nh4fcybr2s3vgktshsfemhugvlc8rs3y86pfi3btya3yj3r8o2b79zwbbdahucwrismueg8yd42jzu8qlofpn8ai2om0o7h2re8ar7h8c6xgo5vp5ues4xeczbiuojtkeiv6ruifc72ra6sdm6ui8ra5a951b76iufz4pyfa0apwl358po7plfz2xm2us7xc1s5gn12hlgqudmubskhp80dr1qrshlip65ur3grrpqa39fwqu1vpz22kwj0amgw49du7kyv6eerbhqa8rjye84khuv69prfir76mxdt24irvv6izc1zov8zq0gubc7pfpyqf99d0a30iiiujtkug89xwl9mycyes5gzh9ltt4u8se0dfzklhvdrexykc1g31aay2262o8x95f7ay1p3pwxgvdzoxkapcreuh1wqaih79opnxi7zwcueuywzp7u86z4bzd9j7cfh9xt4qoko8bdgwo2sxkfifu25z353k20u0no6ite3uhpxd4ogxi5bvpfz1yr8qgg0v4hn71xu0qljidbcha20oktop716cyb27is98ik16rlmlzszv5b6w3gq5r57qco0l6o9bymlbm2jeatuczc2btxkr3qtvmrexrdfp53uweavy0m3ospwphuqoc3ubsur1xzg6xxg33qgkhxr72s3pjxxdshl6fth9sayftnstkujtlkx37560ub2q7r7o0p756stk2y5o10mxlbnfypd1itb6hsie8lgvehfhgo30fx0xlx5c47mv2cz8ht5aea5wlbaswskyyxq1ch7rz10r2j9i9ckr8e0luqckrnuxma9pzpqtabh8ukwvm4cyhy66uux426cbvetkavrehgrjfu4io4ujulz2u933sazszugss0hs3hddd0p02n3642kitnn2z01o54u0hfot1fkpcdvndofdsrhd68dvst5knesti11cbuohnmi5hj8biu2zn4ic2kx2on380jo9hc5z2nd5d7f3v7p3f8lozey6ka5y2qck1nt6',
                fileSchema: 'zgq3wor1clj589tw7rzjic2zko7qiqvc9n9iizfh9efn0n871xi4rs0tel5vcqfb03luwvwqncvlqj11udxcfq2ja7tq8idizaahvbwcn7brb6uir8m3ft9lm0v2d5pj1tix69n9jhmqndun8lf84qqepdkxyurxjci4u4lnzweoho5curyivlm0m5nd711mzpgo8fvho8uqwbrdf69b138w5jwk4rryhi4uzpua39j0hxjpcgqex4x3vqceaq7967ror4sge5j1fsjt5yghgszmblaaagrvesgzjb99a2g1ca0pjs6nr0247nxhg6ytvwcz5nw45flnvb15wpgx2y4q659ywqy89wt9lwrzj4ekga3y6cxvj5a9lu7vjx18q2gh7b7xvh6p3e71whgstnil14d6ach8aeavkaw0y15yfqv6yeybwmrqo658ytucqo1myaji624g0rfd057yucjblq7qjruomvpksrezv6n2uoiw0ioh934w6f7pve6cxn89s3h15aqhs9llyt7hz59ggyb148o834ignetjjakjc28irzif159zrr6vsggaxj19up3hexkrflwb3oo5otg9ucv816nwofmqtepord2qoj4zcoovckewk3by6bz5ef2kr0knca35fycjr3x4lc0uh6amfcwke2kzfnf525b8kna3eqsk04gswz4iq8n1d7eq99dldnfinrktrzqcud4j4oqtox0r5juz2opfnnp8es9daor8f5ab4k21m75ugjsxgow8dd63ly502mkw7g0f7ezzcvemjtrjeezsim3ltfong599w1gmb9clxqrq4xgs7p5oef6wo9o57vffjr5jrtai4kgs919gtdtg5nq9gu2z1x6bhpmdo5e3ld26zv3vrqcd7ibenq7bktp4209tmb25aobcbtefjmbchnwd59t2gf5j340h3dneoqplpggj23y8o6rxa1c4bkrkfnntzot9fhgz6puysjx7n19wfs7cjrhp9tue4a2n8njf',
                proxyHost: '5dpxvqhyebe5x88ja5dhr25hyef7ux359n6nhglk9o8ehvqjojr7eou5ht99',
                proxyPort: 9099049450,
                destination: '4oh3we3ujiwkw9tzd6rh9cg9smimon4bb4qdziodqyayppgg4ycxpegjftxyqqrzw9etosm2ykjrkuwu3gyredyyqqvrq5dqem1gw5ne9vy7bh30aaa4s3txeb2z7ct0bw1fztmaa70rmhggw54qravtpa3wx3st',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'x5gd72w16645iovz7cv0s8sdt8ij280c12sm54z7evqf473vomfecy76bkfnnmfei98nn6zgsjohyf7yms0xuw329wjbdzengkduznhoenvx8bug6gq6z5vlvooa06v2vlq4d2fa9ystbvq3piceicusj4z7alsd',
                responsibleUserAccountName: 'giotsz5zgsy9f9imy7c2',
                lastChangeUserAccount: 'u13hqpt4n0w0xbsmcarj',
                lastChangedAt: '2020-07-24 17:39:09',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '8b08pqnxrd60iphdihjeen5fmagyy12a2bbi3fq5lqjlinon48',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: '7gbjufv7dyb8j7cfqqkq1z55nzg183w2ghxbhmeie66omrrn4e8vs9c3vbecf0znbqzybrt9aflytdv3wx3faj4etnmxhkc1gxnv9dgct1whi3g34p4ro7058xsispoga3144k6r6jgptky9neg3iz59js852r38',
                component: 'oxew7oj4t0d87f7k9tjld9fwmfyt5uk3kl0bk994d93q3mi3sbtnh2xy97n8wk9eukp3fztgiytxqow6wngbduodhn1s8pn0fnx4ep24nc6p3za5cnv7lirz4a46209tby8w7l1ezs96z3ytmqy17p7cpjhtpn2x',
                name: '4n4xra5ojg2ifvrp07govcvpx7wicue562c50ei5r6ddv9yolndh3ejt66rv5gw9h5tme27lnvpma5f9jfl1aa0d03iwrf6tunmjct7h6doqe9zz20b7i014ubz74nscbc4od16c7dmku79slwgw6ceqa6z0v4ku',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'lbovq1gzcym1tts62rtyoqoxqn84ijrkj52okuqf0bfwds6vyqpqnv75usldpfn1511ivxa67407i41lslt5xh4hadh2a8eylc7k7q11s65gfsj1cha2s6y6esir4xfq74cgjtno19bkruyd3y88lw00y9b7iee5',
                flowComponent: 'bdu5ruag829bdbsssp0nqfojcytfxa5npecd6sv2t228d3jk2mwxboezhdkyy0moz20k4crp7mttols9xhgifn33gq1boujevxrvusq5tqm30tws36ypnmwhfxgw9mxfdh3yr01u5f4ds4gd29hxfderjgfw3mh8',
                flowInterfaceName: 'w4qsg8xms5efzfs5oj52iohwtb8nz5p3xndl96s78lgaem68mpcixv7b0s0umdety5sfcvrqawbx552uoa5a6ngru7e0q5s3a2jqbgc8vcws3tu222l5zwtze408t72ehrrioj7abgxyfq32qhg22a9ett89tk0g',
                flowInterfaceNamespace: 'zopou18co8hku51ixel5jdp3xoa2wz0xu4mdjxy18wwmxiqcba7n86atx6yglqhj7jj4rfwl09shk7jfjee154ak7us01un3nhrob01iorvw1q9ujfi83c1gfr2z8be263whqrpdt1lq0lk3smip727z7asjje15',
                adapterType: 'f0q5xy83nu2d26nts6mrl8ci2sqhj4pmopmlds8dk4l1znbzv7eryyzl3aoa',
                direction: 'RECEIVER',
                transportProtocol: '2e157p5wnzm0fk282eiuojwu43q1p9exfuh8ft99a5ur11796i7bg1u053up',
                messageProtocol: '7cafwaqqgtwiahifaz0pzwz090b0246k8n6god4sqb5b9stt2urshp8i0bno',
                adapterEngineName: '12gsfgh7tfc92g6jgem56mlipuls69yff8sjysmf56csvdi3evd7y2y00evw1uckt9e8t8811bzgwo3x0jmddaekdssxuqqfqnj8ndnif1posp078nryb60fsh171k7ddp3trokpvzy8p0ni1s0wse5efp9gdnd0',
                url: 'geuagx7a43qj5tvnvtp341ktjjctx29iow9xod4ih06dtlrzhrqff2884zqgegqhog9dhgdq39tncqh8ixsvrltghfo16436v8uhl5lvd3qwc8fok78tjilfap4f60pxbstdb5l3eap092loxvowin0omqptcnze13w99snfugjvt4sy3iono56uxn81wxlihzliern941sx3n9pynxuhq8nfywro8wxuzvr6jx0wfvhl57c43qfo9ku1jkhcw5bn4hw5ndi3mea145rs88dbt7qcfr9h6cz4k066hgu20ni7xk9s85a06scqh1m1qo3',
                username: 'brlxd67e3u8jtgj76blbky41urml9o28bfizf4ty4i85onc8m58md3wpyoho',
                remoteHost: 'dkuelpjniih11wbtwc0dxeofwuidtd8qpou1iziv2sfli2jedy7sssfmpu7x3ixk3bpulct6tmm8dao0ov92u4k7e3jpvsld8wm3eedbmewkb0fcgwdlio9jrf8tin21yaulwhcig1jzilfgsspptcut6ymplh7p',
                remotePort: 6403536685,
                directory: '2eiyyu6djgme1jzv5i2awzuy0ebicwwgqi8g95hpgui5relgz6tqzmzjm77gv4mcer1fm5wmb09nx197uwfroduebnh0ypr47hn8h7chjg1rdq119l4buz9h8bpa5p823bhmsmvt91tgedw9zh7mpe7376tauu5umjibpafb03mnilkmlq3z0v6j7cq9a5po3nmvrp6scsdbvnx095le8fk3crd0b6lmlxzeyz7z7slrw1qnfmhse6qh3x6twzz1h6nwrm0s5qu1kkz78he5xn48bvekv69m934ffgnotan11tcupdx1ma7k3qj7yofe6ria9mte9x0vvrmpiyrpaj7wmz24r06j7vi3hbcrdwsy4wapmycx0cip4xty2zpm8vyd3rvcf92s6g7qww8dtck6tv47ersvmmgervh1k1bb8bhyfbrl2itoyylnlajy2ggau73sa3bgvgfs5wgzt0rb5bl6c14pqnogurow10pw18ljtki56ezeb4giy0xpthbifppoq3gge0tyy06sochb1wk3ydb59i47b818eshgk45yayopxpqn4wuolt1ix9zv2k19ifvyko076szxsjwxgiried0tzq1vg31r5sggg55b7pyeaf69nksm1pnlsvcy36cc089dqmxoc2j0d5nt9e18p4ea2nzopanm3pdcgvd47tqouvrjhldq7ve3yff24i2syivmjnltmfqzseosaoux5zqe30rwnpybbbs6m8ec995c0dlb98efbzkd6hvxu3mm3gq64q90j1w1abvwn98ccgt7cv01hr6083b0i4yk83j10sjk3e8ome1ic4j8naxjvdi2m1ewob5yczer5xm6qcgxnzf0gnrrdmqgdz4i95srz4wb17lo2k57bq80nh864v2vm3nli8nzqp9w0ewom39qekr5oejplsz7mk1k24vz54na72xj8d8r90b9mongawq9q9x0kmyehjcnqb42p6j10jgxt29m7bje8lo6jvgh9hkrphx3ksap',
                fileSchema: 'idgtfye83x4huej02odj44zu5wfzz5jhrpijz7m2i6q4fpkl0iwi0et5fr93aexr0i3oo5hvv6n1gmtfl0o84kfpv4fp377zebqzmj6quk7rmpukg319v6fyv0p2puzkmon2do9pp77ktox4ckg5nk9bc6r2gmseu9owh1cbxpll4hmdnsmqprs663m0laht8e4ibm4jbzoqcbzolrvomhb2kahwpq0to4zqo3z6umaglxsi8kovc0xl50g0rlz15f7j35y2ts8tn4zqjgepefjke65x7qmdsata60g41zqkmx122mmxzxzjlyedr1ebxk1i5seta6lemcpt6l0bfsawk6o995khopo7wp5w0ux2q1cw76wme670isvs9f6ygbc9syo9x7nbxmbvyk3s4hrfv85ya0sggnur0rc9m6so4ru14ew8ar2qe52nk5t8dmqfvsjacs6j0cpizc1tylfp4t9n827hv5jks8hscjtdz2jlssos7mibwjw5907ixv1m3jofxylzjq6wuq8e9jjjcpyr4ytwb8mkr5se250o9nxy0ohu4xsheymkky04twqtujwjyhr7cecragk1n1o3xu42fwkacl1xmfdefgfchob8dlw9hk5si2e71rdc6s9fe5ph80l9c6aemkw0v2z0k0mvmtr8jr5nc55lq0d4zonzn0dc24l5tugyn1wmio6530d4bef1d615zbkghsqqyqryeks2jewheicfjwktz2rohaf2qptz80i4kou59zbdv8vcx08m4ipnzdart5b39fsta13xgt0q63dgcsjaxl2dq443vl21ul8m2e5feu1o7s3dhqyrcut0owvq4t9mnlvbr723cgwu1eon1f9k7qd9gwl71gkwhp9yhd830nwp2xogfh1vewojb7mnytmsvqt47wyi5l8i2roee4rjv1yhm73y717mdn0eqts2dnu3f9epkwnegjq4cw8gfifuc9zdfkvwptceh5v91uedm30oqlh6g0it6gcokczk',
                proxyHost: 'uh0suoo12euq28sq29inoy49j9rjmin05b0e0mta5fksh57fsplz8jv7ruvb',
                proxyPort: 9395254566,
                destination: 'qzb73wwhldm25jv96ucm11dkykqjkpjjqh72u7hp3korgmkfa8o1o7u2m289eqts7szda0cs5l5x2g9d7sqrz13w0xs2q5rammmboatwq41ezw82oz7swa88ddyzof9mlsmakn1w4a27gvfi7bbvr5m7lepe9ntd',
                adapterStatus: null,
                softwareComponentName: 'kyk0wy40uuni7zfa793k5kfa58e1y457x503pir21x4t97mal4he8zsz3nf5qdswd3u4luspb3zvi7gdde8o43fm3thbybq92fchi3993eab72l4eofwsq8r7gpbkcpj3iw3huowcs613w5g14cyb2dvedhrgm7m',
                responsibleUserAccountName: '5eu636gg7n5cbwvz9qkv',
                lastChangeUserAccount: 'przv4mr02v02m1kb1sef',
                lastChangedAt: '2020-07-24 00:13:00',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'i7zrcs9z8kow0c34rz3qzccppivdme85whzmlqexiqjorg54wg',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'h203u2064s7hb0bl2cyuazel8bq92fz8xqa0aav8k08y8did3oqiubkgjswnsx78mj881ytiktsj5ommermjzdwc61u72wnvjjtmey30shj9wuj7w5myznq0ekcxt5duh4u8phce167ml6i812o2zklwy8jcvzkz',
                component: '5cbnantp3thvt06h5nx0bici47d38kbv5j33hijrlsd1p4ycs01e5p269i297woj5eusu49rvm0sqoaxfd9pqvfstj79cpmyhsmfq6c10fhesdpfe710bykyraeywwk56bj33j9kwd2i5qc8fczetu8zjcqavuh6',
                name: 'g8kelymn2cyb5xmf5s63n86yezmg5bqy0qvmwhfb0jq7jh28w0lyh0283s1vyq5jaamwnkinujcv8tqz6w2y9kr1wpyh7iqxo4bkci26y8t42rki84a5dwfx5nujjvlzwsvba7g0pxko8q4jv8imo5e5750zr1vc',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'fnhkbrgm4dw0btzd659z6ffun8cr9w3hg5n5hrsiorm1qegojsg9b3pb9o7etzhdtbotknzlydy83mfu89dmb9moos2qaghuehb0ncehvicjiuzqqfk11l8swnris63rratb4mzji3kednkw31wh3i0414k0mpvz',
                flowComponent: '1zyhl01miiica5123m5wpuksjffknzu4elf6el6w8jznqmpqrc1pja69alxb8gessdm2xefm69laku5808kzrttxv2fikcei10av25corm29ihzj8fn8bjs0whvqzgft3b19yvybvk8jwx4lql1outzk5lofs8mt',
                flowInterfaceName: 'r1lqcrpflttuxgf2jcrluh1qvc2fuc7cjpz0t646reb36e3lropz0m1aag5rq3sbylqp6xcvuxfm5u5zcn2gknl1znfivo705h5qwu37d8388wxnkh42t3p61m84fjnkn5xhwb64e2w3vonckce7tsvhfsgt61gw',
                flowInterfaceNamespace: '5209fn0yuwskcy88nscgbauexsouox5to9g87wav2pjoyh1y5th3czng852llu0k189c1iv45oq9ho4avyglnazr5urdha4ot8wim2o85blouxhko5xlufkpd9xrple1mkbrkkahborjh41yjvlqx8dmoa8co2xt',
                adapterType: 'bdy1wqo9x5knf2lb22zkvwwbsih3udre2f4a9yxa7qjwjcrnc013falkw2vs',
                direction: 'SENDER',
                transportProtocol: 'feohol5atuqqlm4aevt9l8ohckvnk1saja4020d2iqupfv8htf9vit790gvr',
                messageProtocol: '6g32clk4tw3r4nkouaqw4jkuyye0syim7e5f5ei8g5n592nksi9d1c08i5lo',
                adapterEngineName: 'vazusv2q032dmpivyzmkr3uvghv8co8l98ixljc538bdac7ehkjnog6lri74bftchdzif816l83h0fa4yf96wf4uqvz5kroofgl0hcpkr2fca4ye5qzndsy4vw8yipb31hrqmgvrg4000h256iayouymz6w3nm9m',
                url: 'nyg2ai5uphheaq26vaskd6lussewllt5nsyykm84be4lg8of8w9ggrixnos212v3sj6pdpnkdw6o9yfwlfnfj2wrilje6bbl2gdtcwya2d43qc60gkfqj0aoqa89fv17jdmrg8np9ytxdzf14niby5ercovf3l39zz4ddj6inftbtddrrwgiskgj8jtzkws0cava5bm97d9mlx3ll1yeaiuzgj1sv56cvhl6d9uv6eipeoce8g9nfh2imva8hw1bmjp5g86sw58p3clgwp5kq69lu688xu6zr81a5eore7fgjakno5a44uu7nxp81239',
                username: '0vib1z9j3mbbvp26j87s1bq7wl2cvj36fy2hv9eg81yiln6agv5demchcfdg',
                remoteHost: '48jelvkvysgtejnszrpnco7di17uk0nqw5j2g4qfd9548whd4oxp4n0ldsr01gd4mggb0slfalultk6m6nruadteu5gk6fnzlx6ffrxbz91heh4zkap1kf9wjaf9an26slj6ikm9epihloa9mokr1w4ipfv2qym0',
                remotePort: 9951942369,
                directory: 'la66cug30z5lu4wykj0y23ag40b9djl1l309h6ur4kn0tjdl6chiap52z1gv9ilr66r7ve9g4u6emwlh2pbps3daw1v1647ydr3ymmqxxov1bm2hxaqglkc6i1r1yhg7t91umtvy2hmtlw9szzrej5jsa1n8yv3bcpr0boqjivcajjfmrcs28pxi68yu6mdwtn7orq3857zjzkuplooad9kqr0sdmlivkpqf1xwfhlh2fohfgq872uolms1gsx9vec1c21l9quw2k9gapekx5ml6tbek9qhkfgwgupaqgzyvan3xwi3hqn8yschc9fpwnf3a626lwu71b0cv793xpm20f3u0idp84xigbq8w44gqo2v24xmexgfz03ugrat5qge5qymdohqkrnver58u8i9ngmj3wzx7zuj4idwruemp3dus5rcz5fa2n636zfbuhztbtq2tur2m2sq87afp2slwn9gh4u2k916r5udkpd0pl5dde711th21r56v149jfjamxq2dob4kkq5fzsfac3r13us5tecgdvu4iw5rkgn3krm7q0ebovcv13u6evdf668p0yc0u4pjma169wku73tpes4y43cpin6t3q525av3i6c2v1bj1vhwbuud93hprvqejxyyf8bfhh6lbt3nabtcs05ufftw9c1i237c501yyn36gvs63220pgjqe60yn2bovuy2362au62kz6trlkxpw16k98bilv8ojwkqjqs51cnrienpcnvhujg21nd6qpf9l4vmlm7x3y1ufg1rijn3wfyyqat8th3loud9rndhzi5a6h8gul4hher7csx4muljnpx4re3piswk56134nz531i4osxs8a8fsomoeqv56ialabg58cqqk45dd21ix2e09lphl1to8b5o6l38mu6zrxdul43r0haro8jxl6cr1eznv9tzw1o4g20d9ieyf9fhb0037yxyjkmw44xyfqxc337tzpns0ypk98cesivzkh6l22vizup3pmkip119',
                fileSchema: 'eq2oj9dl8ylbnom9668j91dzrgn7w7pp0qr2ksqn897d4ii81ci24soglqmo2cjl29jx12wy0qd012uqpx2rn2z69ia1et6tqa4mdumpqjcds0abw6mpi2juk1p6rio8zwicmngenpp13w5r08o01yaxug4zjizhkl5g9lci622mhorbuvib548fyqe1jcm3smk75yzaaw9at4qk2e6chmpxan0g66cx91ybtw5qr2whjs0zc32vk7tqa82uns9j4p68tz1basv03le9rpex3sj8h1oo2r23838sxjynm0jhhmrvu7hitq4y6y29ao383j0z5rptb31lck90ygkbwgt6bq9360nx9xfrbcu3n04dp68sbs1l9lfhny3mdi9cmcf0qxfeqpxujzogugp7f70buolv5yep6mzr53mwu8hdfplnxl5thx94styxqwwrwg8o5h2nb7xiezx4qzhs7bjzylo3djh7tl5a1sp1ts257u6pzlp15u5uhi8w588my8vbjyo7kkxfhh18uwnss1wk3m67cp5s6ru68m9be4zpcbpg2bb01q9i5pbgqs3hwob3umqe64ky4pfyvdscjkdnhibqwctk1jlcpsgnvi6jtb2dbukliv0ete3rywt0y4enbwm2ma1y18rkibdpkgmx65boen7ie0ifj5u5vu51lr70frg1st3m2rwqpw6bcgbtl90pxu67o7eal9i034vnlg0k443lmlvxxic4lsbw0txctgmkg5hlgs7f991njny1adx8xklq7mzott2baamo793jbzmokqyla82y20vg2t09leuym77plz5xi2bmi41qtz4jpqh8zsy0pbwc3d69ylhgezs0653gvbw2lixj6oz2ox1hdpzh8lpfhfsdefkjyrggyqkl1cu4yz3n64ahn46fharjdljqgac5n4g2igm68sfhzsftsol8e1r0z1feipbjzank283j0djjssjzxfrexv6sv17cl8uzypcatoh1o9ao8ur6nqr7aaxl',
                proxyHost: '3xa0hnsjr07vcq3v8rtl2go4nees5u1uaj23fdc9bzvh0phplawbab3x7r65',
                proxyPort: 3127999244,
                destination: 'kb85a99sw9odrinzrd2wx7iswcs2tr8wdq840mxwtiqp3xzc9txcuj72e3hh36q2eexuh4ltoqlxadym538m2nm07k8bja1fzq8wanr0g7ky4cdmp28l2wnp39k88y1097kebnon2ykb8h2b85yq8ds9r4a74tut',
                
                softwareComponentName: 'd1pjtnommjkn9z9e2omb689bewf6444zttrszdqzrxrav2lth01nvgvo7yf3qm5qgt6d3wc78xjr7sgytgc27cbn4x93cwzzvc01u2jezqfxlnux03zh9i6xykwoit3zehz4ggs03zd2axvolnjtbxopnkl9h9h2',
                responsibleUserAccountName: '1458t9ysby0p6kdeg3yw',
                lastChangeUserAccount: 'vk47qdb6pkfw51p4gplz',
                lastChangedAt: '2020-07-23 20:46:39',
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
                id: 'diqr4vs2ifqoqba956qndxgzddtsnu1nbc5d1',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '4encuc4w2icsj661pmrvwame9ssx5y980u88u775o6prejtqhx',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'hzrkgzhgslltk1s4mk1evc00xfbanixyzzth1a9ogjic0uukodwp09tku0bm37wqy5sd7ljgu2oom49k9mrv54fclcndlzwpvvjt5vb1xtm3s9zybmi3003stlunt3qrv0gbx9a63gh5irhhlabr4df2mk4ivupu',
                component: '1ab3rxpk6s1k4r40y0qs2laevfzvnnytb77g7groh6hmgbfyonv4rhw8fmyctzd6tb4itmt0qyi3b2gfmm89emxhfgaemlr11lvbaj28na79su760wwf0eyynhesxii175qe3zvk7ekeen8mcn5msvkebfj6w7y1',
                name: 'pmvj059jxsl6gvc3a9yz2hs6xhx10ee8850gjwm222jg1ds70l0iqwakdov21z6mcumb00icu2zmsdtzqvmzfllttvnlxrkwx4d2cp013en2uda473547be683wi6uhfqaxyeocb68f73934j6zgoafd5ynsc3z9',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'v4wz3ugpbdoljega0j1v73v7328o04nwb2w1lwb2y5y16rimqqklckl100khq4zu65m9uducqi1khkv6aiq5bnfgymnikofjqhxaih3bh13rp6mtha67ja43t6ficg1rktjylvs4b95xgw712he37d2ywonnazr6',
                flowComponent: 'm360zgvxowems6j0sv5lmjv42gnq518dnoy6gy0i9tpwe5zlhibgf5sqlfph83itvhuykdmnjb8z6uchd59kaox6dgniadl9xlva84jp1g0uf64coe6dh9ef5qu9gg40zodrn7dx4wjsrt6xqg12wtjhzw3dpyci',
                flowInterfaceName: '3t4ayihbykkfa3bjy94i8co6zyynof5nb1vctvcptvjwahth1qwxzttrb0i9s1gezidl4dr8evr5u5euki69kqkgjmeeuwsm6t3if5sudt3gffhk13onp4tjpnboi29d4kirpy01zy8nn2wojpwz5gthydzml6wp',
                flowInterfaceNamespace: '1otpfcfmf1n37bl6gekle02vdlq1wdejzeovlhq6t3qbzsh2fb7kchhkpe8071t0gpwtar8g0pvouhij4h33z7ugb7qmrdqbtluw15b5ouk8c0e32i8yhis0fnjh9pxqbv43kmwk939sme3070weqhamq9f9u1cg',
                adapterType: '0x8xzzh95k0f8jzikiadpoa1wqhqx02y9y1ru7kn6e5p2fpq9idqi7ch68cs',
                direction: 'RECEIVER',
                transportProtocol: 'oqmp1dhp7gjvcpl4gnqfn43lm2bp8id5vuwgn6qsdx1uv600n6ff8wq0mzkh',
                messageProtocol: '849jibp23nf5nw6n6nlea02rnzybh9hx106ku2tmwczb8lcbfdplaba9p6oa',
                adapterEngineName: '76dflw6ziism4bfeqcpre32wh2vjydj6zfbyyz2vup0anlpwj1tkp3env7c9pbus0aj4yauyf2q5dq0bhnm00ibda4m3j3nltpwbiy12q5guu7fsx310apdy8p6zpc2q815y01asn2n5ozo3q44cfdlbgtz5i6y2',
                url: 'i8tqyg10znqzm38uq84j6oxg57oowszv9m8gepxv3q2gvl1m3jqocdiz63w8jq3k8367c7by4je62kutqf99vcc5bd2yaiifgvpslp7k08ebos210bar9a657ju7v3gkl11helvbsemn0rclpdiofxst00hq98qjnb68uhuzoah8ogh1xkm76bdi8bu6jxy0h3iaangm2holei1vhi5mny7shglvrpyyyhe8zh994snhh070120b0lqlp35gg6hf1sth9l32t4zof7l7bpp026myjpi4hvzaewe0a5idl1bxd2dlu3l3bghyyrc17of5',
                username: '9a0dgckqxzqrnqcgd8rhk4b12sxdlqcfurpbq388poqkgu3jcr2lrfgmegr5',
                remoteHost: 'ikd4o4q5bksohvhqgzl5fn3au74ksinyhtx2baethx9rnh9j6ued1s9syjtnr1j9elyg1ph4zkw3nh5x0ctho5d1yxt69gfgb8la3t01tr40k9nphhdjt8ai1cr1ixix65vmustilexui72t73sdnrz72m4uil3y',
                remotePort: 5444655986,
                directory: 'ovi75m3zqhzptn4kria906hqvfod1cdhtvz8nci8jwywlu4108hjt9k94kwqwecr6sk93k9bajvpdwx9cmagxynbqogg45p0y68mwbfi0tv4tz5oe7b5wib0zzo74275vmwiu7q1tm0gv936pwc5ubf8axb8st4do8rshebgfsl2olxghnpn8jry4pifa9ohtumxk6azqf6ix64hwsrdsnyg57uxnetnzobyhx4e56a7os5qv7mbwj8tdazbx6inh0pi19v8vg5juj7kylslqm4h3pzboayotrzctbzlp62g2tl9vvff30ce4u3jxnspl7jyet23oqvavl8t7wdcs9l8w6aypkkagkcwj0slm10pziv8j5talp4x90nm6prnsck3x2bzblv5yzyocjyz5ptl8b96rq5yv7akwe7ti2v0hieqchc5h2x73lc4397ixioe86o5jbrbicusci65qlcxudyvgmdathg2m75w4x44lvz3149388qbrt99sgpfa44yano26ha7ktuklsc93wrv3iqyo3g9uhtp3tq6tv8hbb6v6iatmhfysttm27jj27387xnx4btdrgl0scvvtarsc29x9xpnvz0vw37cfe81oqjcbdtxb2alql4jcuq9icccrjg57wlqxtiynoi8b2g01lvr4ev1tv2jdt0kbvwqztgvo1v1ooydj7zun91otpksks7uqn4cy5dhtyhnq66i9gtaxxv5azi08qwv103e2n973lbikxz487sg2unzpn2o4ittifrinpwi1nasi5jnzfcn9bxbc4jt984vffabmcvhger36wx6u8fdrjkjo02p7ftqghmmd7tumdfxmuubf1cvmrl6y6yo93ivf084dtewsldtq3kysxtqha5eyckhbda57u5pjrqodgn37wmz869cfk4e55p0vnidsu5mwv61omk3c5i6e7pk9z49qql4l6dbxc4mf9rxemsigalo8rqy3iegd11yier6rs0kk2ickw345s5yogbtv3b9',
                fileSchema: 'zh943eb0jfm2z00kee0aivze2zc74j8odnc99flg6xssytzyo8777ozbu0ib2xe0itt97gh3k0y5x5pl9zk9f4hhbaclqsqdxdiyb8wr2jr5umtcslq3wpk374jpp8f36tbdpi6olk4bh1h6xwu9g21gn80wyr37k5u2b31o6d5pidnnt3grnlkxnidjenxie4xtkzaw6iuypzqak6hrbsku3m3hy8q1qi06ma9ew4kwrwkbuchr530eogcc1ykof59widuxanv11b84k6xme9bjndxkvq9ylghyigiizqfzzalwhnfho29aar1r2tidkm9h54n8i6b47lo5repfxfvb8iszskre7sch86f4gst7d0tilqzhx7ofj4nniw6ry2tfnqva1bm67t0rv6ktzsgn3nxqm0vg5mkb0wb42gcx0sdu29uv7r1air8fcj3j1uirlyatola95kcquiwkdrz5ls1pqsvbeqckerxkc0myspg9r7gmagmk68yx0yjd2w869x0x8s3tx9bogo8oqc50snisbbnx0k10na4semmuqngwmnhjx45xg8v65bkybkztr24pbd4i5ltdpjtddw6uq458k7vxejhykavexarsusnars34q731n1xcy8haaqv05hkfuh8zjyz716204fui40ys7700g4vspyg7m59qodwcrt0fl2swwseu8uw09u0vf4gbsetkq5ixq5wz0baiogny213hy53m3vujvzmke41qhmrzsifdhweyzr9wmxwv8p6vhpeozjkdtu9egny0p8ttc9zcyxn9ws63skq22sqypm4ujw23gg70bwstj4iaro4er03mlpf5j6ls17u94c0qa6ww8que6tsz8jn6jzomugxap878lh34vkrhgf6ahzarzo972f0z19l9kf7lb7zzdwpa10b234sn2fneeb59iud3btywrl8q1ia87tckapwfhd3h28xs0043quhky4y8avk1b92az2xz2paqg1yoyznukvp5dvi8gh9e',
                proxyHost: '6utcraju94dmwhbe5fzfnumtzy8dp4kmodnlqy421aexlb3dbr06wuo6iz24',
                proxyPort: 4602890256,
                destination: 'v9p9zr9oifj5qzhn3fz9idpf3h3ltvztnqoind0jh9w2rs7hi003lia0gtrguncwfsg91fl5tjrsc08o9ijwcodb2ihtsfjde1j8c67tul5ky0jvyp7shy4ybfzi7y56yyldo18b9p6ybs2d63h8nakya98rvbzq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'iuhyq9n062o4fbztd46mlja50mn7nb29tuspl2ipditcx988xnvj6tqs1bq8zbnachy1vqqolgyfuu560580yy0gyqb2x0dls6ejadr2vg1ygtmbr1n9ru44aj9zo2qf69f0jdv13clfbc757bvxyaam06hbd5n9',
                responsibleUserAccountName: 'zk11pqgcfy5mflk20112',
                lastChangeUserAccount: 'm9bf8eumj82wmne2m6io',
                lastChangedAt: '2020-07-24 16:58:21',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: 'heece88jmjz2tht5b3awtj3oboxwdqdrpl1wv',
                tenantCode: 'oknbh8jymtxgg6e6dty4eztmtpj72u08gut95q8ur3i3pjd29b',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'aenz7bh4zvvtkzi0rp0asjzvmv5km2j0p19gjllc3ifkkreq73xv301mhk3jdtxyexn7sy2oyx5n1dt0o5ydx9kfclkldq8g0k27bprlm3hupci78ozt3qjk9izqc4guo8d9rumddowh5fv4pshg24fs4426b8a3',
                component: 'es24afdknt0ilzhwdkuh7e3t9crqndnr6x2go35lcw7191ua4zplx2amob425ajw46fa8tctvbxvlgqof5a0fddie5sob7po8fjodwf1j3xf67m4c2thj9texl311c8w85ws3hoskmxbbrrtkai9w6l75cl0drn1',
                name: '5zuleg1q3ziz1tff5p8v6j47z7h2szz7ddvvztknazim1aijr99uap4cioomt87yvyp5mhzzf1oipey6d7eunfthpswsxhb5p9u5cxi77pffz60qflru0pa8gdy9xjm6pnp8wvs6fkk066j7j8k166zdvlyw0vuy',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'zlib889e91ro14u7wnjeuj6s9akqbhszurfzeusmgvnwl1omz1s76erayvrs4oymzeltgb85g7ukk2vo5bsg4mtvc8d5aldvnp471lbmvofhxbxof3tjdpa9dho5ddssdj9lrr2kd98yl5r3aalg0m56ybjmq9mp',
                flowComponent: '2dybcq2px8v9et6f0j92pchpaz4rzhafb28oo5p8hvtty10jkkd6pid3s7jm0krd3buyqe4kf5nrcld5x5r63t4fl6ovr6yuegq296jcmv3qju6ruaxe1d4k6avrxyw80usw1y8d17i2k8bfoohs88dyrn85vgy1',
                flowInterfaceName: '7f6v8lp4dcdkyqa2d2smf3hdfqj7yhmmsgbm5txvwr4wdd57jluscjcfpn6bm32xkfppcwj3ko7l89etrtiw61agqp7w7j4aotjgxhtgu86exybsnmth85clbok6x1v5yzu4gst43vwo899ph28nwkg7inyywd0g',
                flowInterfaceNamespace: '8kr5v3nj8ws3p6fv06rbl9cilr8xnw2z015zw51qm3w0e0gl31bjhw4clxgufe98ht9yzjpjmxtww0mvgvzfafjd0ot1uo1v42mankfz9e8241v0x7cojfj82uuyjuudv3t1en610ezywznlqjpgi8o9y4sx7bpi',
                adapterType: '7wcsdysxjfai6y03dv2bbac8ys9l8umatzeomw1tdutnb5vfumk5eyb7ik7g',
                direction: 'RECEIVER',
                transportProtocol: 'saumu1q5wrs8d1d4pnxv3l0kpyto8h454a8827g3sxaa4as85ms4wh1t7ao9',
                messageProtocol: 'cxbtr3oq01uluagb4trkobd95l6gh6b79dht8aua8b3mlhyjwmturhpfn4np',
                adapterEngineName: 'pjs5ru2pcqfylsu6vxnvunwfcis97ltodep2fnm3l3pcox3szht24rjsknbl6051zpm4mibl2tag61am3p3hk4vl90xisvhryw9aq0004t89fd0o1qjokwrbka8hjfijwlhmgdwis0cln8diqnb24auioj8ajhy3',
                url: '5jz1qht16ffozoir0fl1khenf5kpc1yk3lw827ihhufvd2z48iecbhq7w1qsd8gvfwqibo66kc8wzu50ohxt1bpjzbt8wagboyq6erv7zkulbwn5fzp23vm7omdlxsqbzix98t51i50hvmct9vx9d9srtco8xebxxlqxizt2vulg62qrd7f1cscndsmyzhv1ewuea65bpgwfkrmetwdtiq3k3ea8ahhph2lh09sqgn9k60ni4humyqm5ricrqwhlqbtpcwyy707yg8skzcxychycd77995dsn9lymobfc1d1hfnaq5dfgu72ilhayjw7',
                username: 'vbe09epqbblb7fylllq9khiz33i7lho5tuwsseod2qs77obimzd7rvfkh63z',
                remoteHost: 'yr98zm5a9j8z3tag46nbu53y2ywehjd95lk4jpoey3e3vn93yjxxkghyvkg2une1uklufheq9ppgozip18lx6pfhygda8r3kwasu96e5alabz1lei5hyzc3xrbxsh71zst6sayel6y64m9ltujz23vggy4uegfhq',
                remotePort: 9432806398,
                directory: '9xuoya55hv8opv31ub75xpi7mj0di06pc7t9i2c4pg1w8goiint3y225lnxqpldyp9d4nwb54t2b82g8pd7ddtlphk7adce353sevb98r0dolykynapeksukk9m2e6p0fu9oca2r2z096u46sxfr0l3lei7exkkn1kwrothhmfiurtdcukw3zfaw815qbtcu7nx9tfrbzuu6yl1ohrj6kku7qlooxgagnbkzndmbltk9r8wypga9isev1v2a34yisb3ywbhucz3rh8d6um1uq38zsgx8evuwsbhskfmzy79nycjt9oq901j6xxv8dhrnbz3yj1il85txobta7jn6cbthutimdlb1m49yai9ldzaqkgepiewpii2adswkv26tdcey651p8dbalsz51q8f4iml3vs8s14mocq52gck3k1a1szgrd4t1y43275cd4kx2lhcwod4u5evjk8kj6514x9nbtc9cq9mvunb0ncchw43tx7yuuxpa5z6igwpt0p6letfpd3z4y0v2zwpaatw8s1emzmygyuqfbgd3yt64c0oo4d40sf29z23rqj1e6xt6ye5x1gp9z7ebzjivew24cu1npupwkxhbcv49p5se37wvpjw3zcaww43epurerwm4wri09hwmity45wudc6e7em2snw67rpgzq47myzdexajq769cymgtoat1c089jfd3cdd99mw13cze17zyy4t1t9dhboo5feabumumja4vfm0gho6zlra5tymuhwfhn84g3dcwoggxoipfthsmxiah407xfl9v9iq5dx1me1yu51anfc0nm3u0w6yuu1lfuysfr6tl8ntrfh99paf32uczxi9dyr4xv8xjo21n577jel1oxns57hxa2cn1qf1t6xthjwrpf4tt29kptc6b4h9lp25nfnxn5qgltuvlpvyv9ddb2igli3asggex07i90wgu9pz360kklnh9xzckjnr5ztexsu249m1vqskv7c823p0loqxp66opix07sy1yzzx',
                fileSchema: 'mbnzxng2u9hyytuqu83p7g3ampjqkt6ctseat96oq8izdkkhbc8z300j19ee019eawv1v6r398nvij81nvazdd5z8n7f3o23zorek2s4pkyalfbsu285qre6ety3p2zobo4df0zmd0nwdcift9pjuxlkdf7at460r5v6l30rh9bbdyxanmvly8lie7m5eu8dy288c9f3vn44pcpekpowwieximmtqdpm6ku4rsjh6mlwvg7f76263qb65ssew3yqiab035upuh3u2v3c6rbab3ivi5vbwwhdtfq73hnn8jgkjjsrw7sjaadaz24is28dznitew6dq2sw6uxvuj0c6fv627h094qutvmj781w1nf9ux09m4dib45cdjd5ll9cme087vnba9xmnj9vd0ljhsp6lxkn9quuejrm3c0acmg3f6y7qsd4efpu0vghtwej30pnj2t8gy961xr1vf5f4c0alrlcxlw69eca4n2ux7sal23i60bsqhr3w94x3zyxapdqhwlfnh4os2w68h8ocz6s2zugxe1qblqz7zcuvml0uq2c81bdpzga63266hlgeaucmewdz26jod6k6vupjn827lzxofgouaol5zwtgktln81kr9v7q1b9emtun7vcq6hz0fc4flfkag7nshe56xfojqh7ml9uuwplyojyrhcpnl3xs44js3p0j5nl22q4oc1kj6to8660l9wh8hh01g9hee7nlja8kj52byy15dx1i380dealo3gr0tlf9t4sfiuvufz1s0qlhkgyyfyj8qi0yvd925vl5bschebqavvi9crpec0mvdz4gsrmd5tg7onzhv0sxkl3wisb3cyuooac099dwczyhpac3gg8h6vsc3b0112ebvavjlpjb1r7yrbl8c8thr3wsggc3gjbxezqu9lbmy88ndbjs4ysvdct56ril6qhyh8z0reum1unwwwxuviv551i1nxsa1gpsm172d92rd1d1e942iq1ty8ci8cg02mzsfyzur7q1f33',
                proxyHost: 'or7q1weviay6pq93b1y9dgqxvxj7e6vmcofr0ih1n1jxi33uhbtqiisgen3y',
                proxyPort: 2669981707,
                destination: 'nzz6hb60rk34fcybhw362d39m7yo36ym93gx2j2pqiuhua8fjf00nd63wjbkzepfafobq0gbtysmc3weurrb8muv5ntb7974ladbp13decpofzxov71650blyinkgz506kpe42vl1xpebkvdwza5gbceibl2gty2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'w3i0ql9bo0b0wi4ogs9l6go8ju00ik82hrlexdqrqhvinpdudamv1ydnbqwq82tya6btwwic6a9c81bn37uxqd0w96gfl8dksvnjzn079bb90qqzh0f0fy7zij0ssv39k0nyx2es9qzeg667u9usopz7q0wbcuqa',
                responsibleUserAccountName: 'kdaf7bufew4jytpi6nyg',
                lastChangeUserAccount: 'ny3za65nsoxk264q32qo',
                lastChangedAt: '2020-07-24 03:40:12',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'zherq11hqc1gb88tzawgifgsii4vx3q1vqkuhf8tnaz0gdo0t0',
                systemId: '18bc8uo5xn3pb6ct60g831e75dyparcjuhtqb',
                party: 'yvesw1e6b8e5sy8np69wbkpmmwkq3nqy57w2dmjf36b79dkk4lv57wq6umqcs0fctscau6pzdekds5ht3o3yal23b3c1opcuxn15sbko52bd0bcqbhqaewuwy02mi0sg1nd0o2jnrt2frfzk3d9bqpkoh4kvhuli',
                component: 'ka1eq3qtxdl3i41kzuzh0ltvlkvbosmzyi7y2g04sfmlqrvu5gq4nlijo3vcfstgo7ahap7s5yrl27xn82gdpxw0snul4nncnbs29q2v1bl3q7geyfzzthiibna973tt8j7zyrwx23qc5abtz0okvqan3prgqmlq',
                name: 'p5uzuxnlladb5u0oaqa1w31bvr58repzeudpkvu5pq039ddzsd0tlqbamvewoyi71z7ufo8p4uapikeqyjpye6dhtgh7neadkws9nq2o4pak3fp42pm8e1g669qryynl5snyr2tdc1bo70lxgpg3900seol29lao',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'fac5n4nf6cm7ef1ss8k4ib9fzkrf08gsyd1z7hcja9eocehgk5it9q3tslqfqv8lj89st3vz97kbo8ekvx77r3n1oje87mdzc9dblk3do7sjh76ma0hu3de7zzbcuqbboauwnma7za71ebwx02ldt0lri5hcffv1',
                flowComponent: 'f6pv5xd1vn7y1m9znrjsn5lyd8muawhghoelh8geuewlgbds6jx0znuahqgib98mmcopd9xh8ybh8tmxv4b80pu4t1kx0t8vgij77vpeffzbrkpmqgjrl3s9uqi6i47ww3pvairgqe8agsezdqoitfitgidcjxdd',
                flowInterfaceName: 'f1kqs5r6wen486f0mpv6zrp7alt5me5t8srvsayrl8xkm12wtvwbwrdpd0jjkr47ij1pqzk013rhbos3nv29c5zjea762a9za4tvnee2e4sk3chy8a4bhrfwmef7bejjd1g2po7mngs87ac5clv7nha001mfywlr',
                flowInterfaceNamespace: 'vgesea0oc34wz6nk1mbx69c7dtet0feys0ls8ryw3fo8ee4c787hke07jg28uk57cpac8j4y6cw6cxyzd9cfua5a952i5qo6nmxg55f1lnfrocukdvugt88lf76p9b6vrerw6s64vwx66g5e4opuzzhbtp9nrsf8',
                adapterType: 'alpe6vq5go8g42tmbusnglxmqsjik5pacuz2l8iyvb86mlq7qmx2urmm0q3e',
                direction: 'SENDER',
                transportProtocol: 's5ra7jvf4e0jlr89r2k2gd6h5e38xofp4u5hn3flfp7pyuwulkss0klwv5o1',
                messageProtocol: 'tdviszqy9tfc7wuo5vhjvhhrdy7mjz214w3qf408v6w3jt0gncq6p7w3puo0',
                adapterEngineName: 'cot83bl9mcztwrb227t1d832hr75pj757pmr9nnrnbnyfy18cp9ssz0rto17ngujixcxjzruggmnycgbkwdp2s3o1d7cdgngixh1stcoh5bqaav0b5yiizpu3hywqh7pv3d0zc955t9gmzzv1v9by87j7i2ojgc0',
                url: 'acx4fkf6le4w0apnze4jrok9uumn5vinppv0xu1yuxh4r7qxeb688q8t95yn538ajc61lg07elg3pye9rx13ib682hyab24azm6qch5ls3cedkhedv9406w9bxhcu7vl7ty5nfzzgyeeudxevwv8vznd48m1vhjfah75iwzzy7301r6d6f0tlyosxez8bpgl2x3pvsxqkjxif3nywyel2wt4ptir9t51beg7gif87ylvinek6e8lqr8di2gdo78l0o83veusq7ln1acyr2jz1aawocfhkounpjlttkrj0m5opcneqveoo9p6achsrw8b',
                username: '0rgeednvbl5qy9hi5lq7ajls4gje7frrd42mz6ffue3k12evs50i1c308ad2',
                remoteHost: 'gx2qnchqy6dxcswbpsuzv4yaf445os3a5kcnplp7vrrg9pilh7jtvy6oqaq8h4e8miph7ol96vhgpfanho4oyotw7weww4q7byxb2ehoxnz01ysn0b7ig5a0f0coz5yujvr9f4wzcd84a2ekco2oneogk61kttrh',
                remotePort: 3281734361,
                directory: 'q075iracrq0sxu3oc30fuoph64k961m2g2hovxb90h3oc7iu9wrw3jkph6ioks5mma95rz8bipak0a6456nxyb68ovu69h7k3ufv3eo14u3johs8dh5ljur3hrq22e78pduqzqwxrnt32ltyilp7bymrcftb56t6i60ep3d1gjo4fwmx4j5nd52arfmogp6wephdhdai41us4hek43mhdsbsqir84xg86njh79062xm4kgzbq7u1qh00i0yferac7us8axx14jnxeqwi8volr3vlqz8upms4vgtchlq7t64rtct1h64mfehieyjc9zlfkskdq9pbgfi4i3yadvczzj2a9mky0x7mzbtal0hrlxpibhco7tpahtylz3fq19htg4qwz08ijt772fv2b4fdl2890phklm2pfmf8q03sexov4393r8boaxwqd8kbevkldpjbikd7eoy7k1m4h5mtsm6hhbdsbmmt43kwqtwsjoxl3q1felyc9y86lucijgnerq9j7bzrc8wjizkxmgv31jsq06go4oc4tbark0tw2ual8jiaw8prtuii3dvad9bqm3x9nirnjwiryrnpdobuvu13j3o0dskyjzeadkgqxrcrbuhhjpwkgymwhlxwd7f4201zu101isc134glvfiawyzkq09mu2g02a8vvzq3x77p68ik6t2ikyt3cei92zcyuw66p7n64qry5rau82pzmthxw1y1gyv8m3u8nm2ekbxl46xxsqlok45hq4wavgzfyv5l0b1pt6d90b2io3ez82q7zejl7rx4976wkowxf2lcavh3uf5jmjbqvjnsstyn5pg5wfijfdsb1exu89gl1za8cn2jh8gku2vaydjxbc3xl4rgsau3906ujrmh28nydsm4wur8hyh853hz8suggvmx2vs5sv645tjd3c3n1qdcilwjdexopor5ffaj9hpbc2gd7hoc0u673lngv0vbs0b0v06qowgx7pj6uz7bbljypgagf4gmnnmr9neomusd',
                fileSchema: 'br9zm29yki9p4ikeg1texxkoa5lmybyojrwfynjttopxv0d7jeoetky3c9rhosxztwrrdf9anoa2b45flsj7fpcte4okj13de9iom5qj6hgjgd34psst0v2i0ek4agneyz8onwk90p5y3rh6wq5z9uhrhtlge2xx04l14mz6m2e89vyi8jgf66jar059k18aib90mc4x2yax9888sackwdtelclkg0azxlti7lx1pv53cdg1s77pb5x53esr88vfjzqxe7cpyd56abc2wc6j0qy9811fh4yzq800guf3vzivl1uu33tgt8zp96xfr5umeutrigk2bhb4jyxihv01e0yr3uv82m3wohjtcanok6v3fe1kva4xo5arf1p9yczdwsronxr2awe6td8lk64wvomyl22rxgm9ec0zj8tj05fxnen42yr0nzcah5qnpzj293r65a11qknbnouwbpglyxdijhdwnyms3ppp0710ievdwc1hiv8fw48c8cj4w6kza1qp5f7hccpro6waeb9nvjdd1a48wt1jecg9v1mmwgx99qekb0ja3wu8ksk3ppfbrbui9a8zmafkaoeb452xakxvzr7f2q3dmzw5j7ic13kfrgub7esmy1uhp5v31m4znmsrq5ak5ec217aavuopjb8dma5sl8qgtp1akrqcgmdclf6cs381slad1y61p8pdn4q2qzlxlr810vrfciwesq5p9i05gczj8ck7hx32u451z6jx4be8r3kfk04rzcip20lksddcu96p8w6nxyii6ehcym309ccmvqypzo16pjajr7kru4pcfv8fa0ylj42fpk4hfzzhrrldj01tzls3nqo8kslse2h34faeclkqokw0umbuj1in5k76q34orexfkjtjp44dmxyu4xso0e1ykqpha2lrz78gnxd6hvn9th7yi3l77bpxc30ddgpffmk79yt1lprbx6sthg7qzt3enh1da417l57c9rzy8t0i07fqwlidoibbzalwji1hrtjg',
                proxyHost: 'qtyxla8ylaifbus416tc81ltm1h9nvx7gb6sv6u94mmk7n9m12punogd8tpc',
                proxyPort: 7682927876,
                destination: '5jssmdyg59p942mm2nnsg914yqezzsdqv2qpfixn9v3jyrhy9y3ivuyjcqox2nr6d7bj04iwr3ihjngzoa5ffn0hixd2gds2pk1r04kggh659qd297123usq98qaz6ddouy0vt2t2vzf5zamr2y0vcqe36e84k5w',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wl3inkj0ujpkganz87kevzek4ukwy3adzq4o6s5a3k2odqam64axbioqdhag8h6t8ulayy41w2gyi880pka13s21i3oodt07nrg11mpj0bmd1hc5pl67rojj5a2ga2avswt20jeetwurvd9pnydp8uguoso3uss0',
                responsibleUserAccountName: '82pmqhojzonp87ckltxs',
                lastChangeUserAccount: '179zy0y9okd2f9w9b2pg',
                lastChangedAt: '2020-07-24 03:09:10',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'bha6fbamnf6gh9wk7gwyzszfdowhgehpibxj7cylvod3f1prgn',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'jzdfb2g9nwx0d8pxhj05mlxjvhvcwpqmuzwa1k0hu9pe32xgoiyv46hfjt4e547u5xoao08gmop9t38llyagq8rk6gc7yfo5b6u1xevcfjfvvmx0t9kyef0tonr8yxfcvg05hb2g3hed0bq6d4ljmzisst9tz587',
                component: '70syp0rondbcrch062t8mjitijai38gdf0579ia384g33robf0oqualwhb92pdj5ger9ubmatpfkk6mxxdkp95ymodxyd1ftxss02uy1932bp4grlw9ei0cfp7ypt4tphht6p4fwv1jr2qy34ohm0lga6beltyyk',
                name: 'yvt5cvokn9mqrw5f5s9kgdld3co399pbln7lf9tjb295gwhnccy4pqp9n35ay18f1tl61u0godc09b48t58cj77x4c88iip6j3jfmejc5o13v2qxqvwhelprcgy8e4obcju83z91y4wvwo5lgxgufi4bs236lq86',
                flowId: '7m3yy4fgu2dw8cc8gri6bxxnxfjsjhqal8lwy',
                flowParty: '3t0zxcksfw4c6j8ed2zduvmuxa33bzzjooppks918yhmhvbme2l9njvq0tr84gqpc2r1j0qjilabk7ylwi5qnhv45lzesw2sm0ua18fas52in0jun890e09ims46hmgxe3ykvze36wvi097vvledqic7rfut5ucv',
                flowComponent: 'f7n3fe3r4vnfj9r02easona6duzlnj9kuct2odxkytu8u6i07jhk1lkk5axd3zf8c6pbkg6w6hf5mpml3w8bb14x733aga1qusef4qtwcsysv0wzk8ymsfgbz9c58ibut20putob8ks9qra7k9fcjwrik8053e9x',
                flowInterfaceName: '6msrexzygkzbioarv0txwx7li57rg4tbdkub69fcdodgpdw8ro26qfsdwo5fy66wbju5g9m5fam1is8k8cmtj0cj9kaj40owhd6bmwfa44przrjky51dvvt8qkelqixtn5inmjdj5y60tqbtp9kn2tiwzgm2kdb1',
                flowInterfaceNamespace: 'jikdsdextdcurelah1p44wmd8ico01mr5ll4f8lze6h6eefts4c5wj7of0rd2vk93cof1ja5pj0isssbw0aptsfqhd3g5y4k7sba7qogeg7pnmfilcv6b6uha5wmungdsrp001zk1pj76fqvmt4176jtfka3o7h9',
                adapterType: 'vfhk9tuo8z1y8jaql6j4xzwg6fq92muboeu2yneezzlkopa4ah383uk2qkt1',
                direction: 'SENDER',
                transportProtocol: 'lwsx3pc5m21sykrncqp35ks5ou2qrkxnxh4b5tc4n0ybs0qt8mfsslv63igl',
                messageProtocol: 'miagj2vq0ygdmp6ycrjy26m7ew52qptamcbxkezx344floudxk6d9dn4asuw',
                adapterEngineName: 'sqz3dkwmpo259g5h8rt7j6phcz526l7e0qx5vksz8lcvlhcq09em5i8f8316ceraanhcxdlwhrr51lputi63dt3uo9kv1ht2f8mhht4d9ednnqcoin9rhzaq81ek2rbr5ztzsqpllx0pxp6x38o9j0k43m7087yq',
                url: 'v6gk85cmm2uiqpz5d18xh4ju43wfsmusg1k6qdhiyix7uzyr3db0prwop1q7egtvob78lv675tymzo7x9z9re2x9plmn2aond6j5854er5zacc16smdfaodxai9if75l5ah71f5j6qn8fn3u68jr45duuyfbacq7o410vot9uh69tukzbrr5uecdhq7f4lc79d0d3cwy4zb8rh0sqhwglu6mi6o9rirsbadxiizgirwhb3cgxqv8s02320dcbj9wro0ff0u0k8dns0c9y73suey1xarz9d81nl1lbfj7llo5hspg04hur2sy7hy5gg6n',
                username: '95q5b8f2c5hk11b6mhapl1d35hftrdd0p3y56kwlif456coak6nuds8u4rnf',
                remoteHost: '6cdt74tec0z4abvltel1vn3p3vyxaxoloi1ecnwfhextqxqhipk9wv6hlc80yexl1qv1tpfdh2peor0o1s8zutjuckexmd50bb49we62u4ud4ez3ozbmfilfulj9tq0g4vf8f4hh6pfzvknz1wnpjy3n78wa61ya',
                remotePort: 4858246908,
                directory: 'yhnmhe4r0zuexj8hnd5bqhpgqpwk0zpgo23dnu1lfp2hdz9nycshmw0gtb64kf2jeiycmbnr0jivnbdos3knmu8tcll41z0fjr0n75otd0p4ul5vjv2pfbapla5f2pw7kswomjar8sn0iko9n2chwvz7y5tjx0nfpd8bnqcnnn7fc8520ydcfrawno79ivwy54x0zej2vcikpl0uijoxb6f4l78fq7h4nelyk7z3yfiyurl0cqj4jb9v8bvfpdh21uxkorpkfdvulxb6fhlpx7tf1c4yt9qwxk246l2m537qa39x2d392naeeidsb8q9bqi2z0rm5ddziu3j8lsf40awc12aszkee48jt454bjdt851vtncxprw63t49rg2b7bmym9pnv4gvy3jboondlw3ak103q3c2f2q1q606st6c0newpkr3fz87a0iounayhja9bvjrkuw5pnresfxa5jl9t3tcaf46ys10k8le38srxwla9t2wssbpwmpdors0bose2h4r5yylriwd5opz4fjxfhvbq7r7725xq8uiita8vyuyk06v4077b9up6b69t1maaw6rkdyw6na34f630jcd8g9a7dm80fq3a8mi54avfocrzrnop6p6y2u30bug9fur860bb8i60za6m61vk5d3gsv6atsnok6xxti33ihcnn45q68y968tdjefmcf3o31e2p1frzf32tgv8qbh4p0pcz7tad5k4i9xj3cu7dx2g97kuazcbzyqe3dasx1p75nwdsqkv8ogtr7i67ddsny13byayfk0c06gpjfzysb9ntmvaodq8b48m07yy4t3349tlirbf7wbsub1aw54hd54gcdvv41e0tx7udn7y1t7msahh2hsesogjhuls5glgclpnl6f4hio72vmw7kj0fr5riqaesejkadawm608swpkswmopvq3lmcuz26s4t4865m828je8kefn8iywduotcchd3ajff511bsi1ip1bg4chht0ohynjgxtmre64x7',
                fileSchema: '0a9flrq5rka4l96ed4t1jrssheibsup81utu0uz08gtbpa8k321mv67gnuza6krarl80v5lt5rqet3t2maau590rquqn65lst2sqnczd401tve97k6513md1usq8b1xrwy9o6ixqkbpyub2dai0i6qk6k9yh91nmrvudpux4mqaety191b9axsv908tdvtzts5o6yv781ar6mv5lx7nnap6a6tikukrksrktse0xwft468386ydto7s2rxnod2vnca523setvfgq712jn80e0b575usewkx4yjmez4wbual0n300su0686mq4o8ccs6q302gter0r6b0uc58018a8gggem00znmirdtpjs5n6mlxej60qv3vd2ojob07pwp8z5e75uczng8z41d9bs8466cz80t6z7hycasa33vp5bdsfywrj9te5a8smyedjx2vfa2elx8ewgv93wpqnfvek6dzqfwxsd17bzekt6w44l4cvkpii06ehfxd6c655o5xym0jizokow8927mw0xiqh5s1j2t0q37q5cg0ve9k0srdytkck42ajobo1qcc1j8wulzoxlmuua7v3h2z7xdjgrlieysahnky6r30lbovd6j0dab457gjuzt66h7mk4z7r89wzhayp9ts837zy9iildb2sdeokdq4a677x218z109mroqweukvvzzjqn46iqalo51cqc8j6cdt1p5j9318h4pjkdqwudn9wqsireu03tufig0rm24j44hrc3o7ibts7xyelbccolqfn5ykwnlszuvb4ywnwb7vvviimqd62fnpug0og9ognscjeinrz5vlyg388adshe0lh9unkn8568gyan0fm3eyoqvbe8oppf1ptli76fi3hqsovqsdoe023rued5qyrelej3vyd943rjujw1e774vye3mggymc3hr53a3nuxe7psks77ywuurqmi5hgiexbt63aqgibg9bnxqy0b4tcwto9s68csptj4wpr2scgvz80n87c4ol3vo',
                proxyHost: 'a8f2fluvgqyylxvyr84w1ixotpb5392edw4ik3zgfu8cw7efxah2i4fcyjn3',
                proxyPort: 3273908879,
                destination: 'ygefbi3numsqegz4zpeb524s59ztlgjegudrkww8ckwvso91xaflqjn400p88v3z08mntgoth0b4fibaxxr08y1gm18d48jcgatlx82l18wlf3qkl8rz6myfnmd9emrwu2l9yvi0uohkvwstg9p42pvzkg7918r2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ibnh4gcvpovzyyjb6dy3ydgwkmq7i674n0vwhm2ivqtnl7dkypa9du1m0phlscd86nlwd5vom4eoreg4dc8r75j5454ligixw2szewauzh4sk0fudlj4glpj1bd6kwdav2r9xm4q31ptbqs0rob1z3ev39xiz7zr',
                responsibleUserAccountName: '0u8734tewuldsc9dlid9',
                lastChangeUserAccount: 'v1qquupwe5bwfjo346ic',
                lastChangedAt: '2020-07-24 13:43:59',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'k8vymzgn6xcj25iuskmue6b3l7130uhqjgbiwxs9ulgpsxtuata',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'cykoh3efvd7szcb5naf7uofm9j2iqvtd8fekt8rd6ub0ktfolbvuby8f95tyi7relo2juudgyckhf6dr4bireth9l7xw1rf7kaolyu5fymvps8izrzb80makosxvee4epf1deu8krsrto5cr4qzv6xnw57s6xt51',
                component: 'r3boeiuzb9zn5au18mbydk27v8dthdzvrlwaghfce1wlwoad5rd6pomwgrryh9oweoadycytx9ar7ll0kr6ygn2baambqbyvg7q7utwxdq3toj5qv0vlcyyrjl536fglaj16uo12jm86c8dp06c9bvc7j2vvhllw',
                name: 'agg8ub9odfe1s0w77pcvkusrzuhu9x0utfdntiskhbt97wiughfggrfuo8hr3e839mxchvwvzb1ce4oc9tnif76r68fz7ynrts2y2ogbli7bsmxsa8s3yfsiuk66vw308af0553oxnzl5qvjk5d4dk8hzi5m08b7',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: '2fggyv6r5pnqdvoh8g9wj0ozibt1t71gtyy32z5nrmfd71es0136zskfrjfhzfhvtz5dx4pkubdghjmzf40nmzze5f8a03qmq2l21tbpxlc8wpox16h0bv3ggy2kbbhzoh0fs1syejgv0h22gbqnsqab81zfdg4j',
                flowComponent: 'djufmhto1rraivy2zm4mxkvtu7gydp045xq5rwzmvz0t829vbl7m7id3b4s2blgmnlnyi3gfj7elfe9tyue3zh7kagty0g4mnzb9fdiu8j5omrtd2fas6wowo5o55yxqfwgd2yn2p9tq3525fbqbtcf6tgz1b3wr',
                flowInterfaceName: 'e6rgimc4uzavnl3c2vgm6z7mri98wb15t3x733azzxt3ctbtvxllsp0m24pzvzhmxfllgk7fgeogptlo75zupfhceu0egvsn5upjklx93q5gkx9pge9l31hpkk122k4tln881k95yybu5tntyniszf6xb5oluiru',
                flowInterfaceNamespace: 'vqu45ondweyg0arezkvekpqss2oxg1ofnqfmtof33oecjy82ocfz4z351fxyrt51xsjkan9n09uu2bwjy2khgyzr6hgiu2dw42zp59uboc88woj7xr3y8vnbmt9lzmy44d7la24p4px2a6brfx6w352o8w0qilt8',
                adapterType: '1mkl74lng6rqz144pgb9v7v6xa14z9az50l0pcbcq8tiv0s0qsha3j52c928',
                direction: 'RECEIVER',
                transportProtocol: 'widtvr8de7730hri05rw62engewsy4f8sswqci8zy2tnyrp48xzai5wbbs50',
                messageProtocol: '4wit3x48v24qubl6o1cm7y3tqjmd23wqaxxm1bmezv87465hv67eh0n0t8xk',
                adapterEngineName: '8d5azdd2oxwkvqfvmmfuvtlgnm7id6le12xz0tvrcjh1kj8sxs607o11aqgjbb1tzkmzdq47qksmay7kjd8xjsvxue4x6z41914y5tx8xvhwk4d2407t9slpm3pj5ulds96fooffnflpnfm71smwnvahcpkoubzh',
                url: '287d3d0oqnd6aqz6jjk5g03ldkj306k2nookm9xrbz5hh1e87buoubsb5hp48gwnk5g8798ljrvgywkzf4791z2hp24tjuw4a81t4ewo0nxe8bspldb4phs3gb274jn5adk9lt5ebkeu66yspxdeqfg0h1xayvyzir1zwzu9ddhwt36ur79qcu0sru6i5y7o0q6gn5w94rgym447caham9k66dbsp6hnallyyl1ain1z6ujfnpsov58e0vp4kh8jprm1iywvtujf3ylfy0g4yg7fxvsx67ay4iffudqqluj8h7e8d5fx1jr8go8dsokp',
                username: 'ivv4xgl7poe4u4v7tshec4n16fnso6a898s4rs048v4xik4h964afiauaevz',
                remoteHost: 'fm9nuohhkvz0qajq5gngjs667bf8mm0k2jcgdme9svg27lrznvrro5b4sk7vqnhvheecpfoarpxy6twhf5g35exuou1lhwlctse7vlfk1d861lvkyp8a0qpjqgbc7zyjz4iyd4jza78vf5e7iz87yj96h6vj4l9j',
                remotePort: 8827170159,
                directory: 'jmiq9im15vb9we38rjpkbncrycaqr4yjxafsf89xugay8ppv5fk90l9vuncks3mgqddd9idtuubaij426eu810mzxzvlv4xs8s72d72wyk7mutejf5zzkx6xf62x063bynbm7rzqu4z1bzqojtnk965key3322ocoawk0v4kbl4w02vztghwf7rov2skgm978vxd9g73dt7t1xvnhsl6o4tvolqp33osdjk53q7oaphp6qo282q9zuvr4fa1r57q8xwonxdzbvd3lr9xjrqwiegajzrq9rpqs0f9du07a1mu170g1342teu3qvikqvsh77gquzdg4fjjidj8pgn9hd4apr50lgafcfw68svonf96u2i13fjvgl9op93xn3twjsg676r4yd3kiksk236hyj3epn2eei4t6d14xh40p4gqon09i8a65xvx2hwt7wcb2aon2wez4319noqsiewphn5xkk7fhdnw0g77abfgf7o9behd9c5t0rbl6i8u56ogw5p6kq90zkeihfpiwg1w4qr9ftaoy2ifolwrqbglndq9ords6ps3gieukxbslq458csm0dpv4mdmaah5ezh9ojork14kcem5m362s8xn95eu5qhwnemqnkdkwubwyj85sheimuwgobxl0xggj8a2d17ublr1ftmpbqurfcjl3ntr5wc6h14dgf7k4pyu7tnnumwy2i9e2bkw0zzv4ye17ba49bfewuiijdxgz7264iaayzwvg993v1c5wke2auxa319wbqye1dwikexyokndtj29unhugo3hffeyeti687itx5ltwnd7q1polinxnw3m3qid8mhr8dndnqnrapq2m8697bzw8yyg9o205f8ffby1hasqet1vld1ahtvo970osc4ijlghdrn7z22tdq1t1t8srkxr9rob6ojq0064g087j9jr0xlctpucysub8eqnvwi62b7nthquvuil163kyx1nd1w66b9oo5o6xnl0es7geillvts7jtba5fd4udnc',
                fileSchema: '6ryjzzh3opbjoi7xo03tq8829yxpjcmnt9gx53mo6n903ckiwjbqobf1ctivofa6ujclu2vheskhf0vi63g1lu0c9pm9dav2z9cqoodpwl2q7shljmpyv6vn9gb9pga81m8m03hun3h1v6jhgys5dxkp1szqci7jgsbqu0t33x67gkm6km5qwyr9cx9gksyyipzhtlh1bq76p0kx0ee00knj8ihzih4edvg7wcq3ysa15kdeesz7nqic431k1dbyfck4jrbysxtnu3uz2p5tjf94ucitveunpsas4uznrrtrigwr0i26uesa6t13iio5oi1b56jq8dlxf8lg8ow5f9yva66f6nbb5mwr066t6rl7ikn91dkagr5l1fpqbch5158vjrtkqx2cwwqlrp5ulxmp0grz3la6gqsr35aevx2b0gtk8lzy9w9bgsu2zc9q3kjp5oh19liqtk4ooy6l9yo6xxn5352iukqcw9zquvblskovcu22esswwxq6a0bezwe1n01wuk9d6o4r0v5mtqyye31ngnhk0po4cimdt7rl5zbw2ppefvl6uoxqgumq3ov6y1tqp7ha3hylx7pt3n8z6sdbozh54j9rx7qf18v5r8uved843c1opvaf7byd1twkbswx34zfhyro2oz7z7pq9khq5xwo9d36qbqo8rcxu2wt0fngyo9zl3kwzbpit791ncmt7xotwh7em1ymfgezkshby4ewiaivgsgsrbfnnzs8ih77yy28w3a75px6dtbh0c2ozv5dys6iwkqtlmjsi8de5p0gz49jl6vshphszxq1upo98jfux38hgv6sw6tsasm7676szj4a6pjghjh8jtlp8e7sryp26knqmuyf2h2p9gxs1wi0wo94ptjtnyu40xo0uxx39t446w4qibvyt5oh0w6z7x837ym7mev38dcez4n7zmcjk461aqg46vhibv8vcog8s0tgkeg310yd0rig0x9jys9z7a0offpdjzgkdxm9443lf7cdg709',
                proxyHost: 'vireb6vtxdaxi6jrwvi7kso6x1dr2e4uperse6mb67ar9w3uca24vinfkwh9',
                proxyPort: 2468324374,
                destination: 'stvd84km9vhe03xa5x2u0k6yvp3lcyu0jezeiqmib249nqjhcbc5zl6r7yegegrcuwhk35hinpgw5bxxq0yh9gdp97f6uantl62k8ovsrjdn3nj1zmk3zn7wkvjbc8ekqfwvsm07gh2hqnj8el8qzz0z5khll086',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '901x63xmqjhb6uxls6eoflm58mjkbzc22seb0t4ykfkljmrc9h5mp9212gq23xchf151t1seslt3dos0hv6a0c2ekjyaxh96bq72blmc6twxstt26rowezlwycmo9rmokap3tli1ufdgjquvsx70pv87my022nj3',
                responsibleUserAccountName: 'i6ujz3q6f8r6k1rejoa6',
                lastChangeUserAccount: '4js2wvjzjo4htcyzrdw8',
                lastChangedAt: '2020-07-24 00:39:51',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'dxfrkhtvkpi0cbxp8jgavklqjbv761p61mlhq22jadmic88ua9',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'flvjtnihb81hsyc5q2wzk7g57xi9r0wugpp3s97b41wjatkfsmf92rjaifyrzmr6xekhn7ps9v2jr68b8yhryt57yv4pklidnns4bqh8j3cnhj3485gmuu8620sb8nervau5v17grxwttar3ou3dokkx5odbpk7n1',
                component: 'kmcdssdi8gp6k7tj3sd1hdci4i3s9v8iku0sgpaltuz8ggpew3n16qya645ilmujuqgxfrlf3z3vinpsa0xso847lfwa8yh6uyrho2uavlqxsqt2xe2pt4dl2wx6ks28slc63lnjhr8iz83lxbyo8kbagvnhccvd',
                name: '4f440mzcq3leat4benbl6n363cw3qnb1foo30m0viojc93yrztq6mv3vy8775297s0htltf50w570xaq0ecypwbg5x2cmugf7p0s983ahbg6e25re29d3z3wurp7e7djro770owm2thk04z3ud4ir82ipbs5vnhz',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: '9ai89q0eby19zkc8kscxrb4qxznahp1pgx4aesq9bb3sdkusiekock0s7gbyd2h3n1b6ttzjo2depjryl5burc2ja2x5jzq0pd3hxyrf3v2xxlsrhqgqp58vnjj1kdkhlweqgpog1bssklo0ra6hgxt1xynuc40h',
                flowComponent: 'ky5vcndhv29k9avo6o9oyeag9ij0sqt92447e9pqyqvm2tz6p7bczzwioh61veuj9diztrfkd7qqdesu38qxyt88ljtrhkckfd83q835daz5cjbswluotvtmc5uvc51lylh8v0kqdajc4g5phswn7g9120usde02',
                flowInterfaceName: '99tk7iff5qwv21g8kcge7g68uoagogeanuhbjcyzwc26v52dwz2y8s9qx83ezl72ckquoh0oz1e518fq85yppkpe11mgc07bxj8x3zg76y6zelneuiyv5zilyi5trrw6hlex36wxvjqn5idouhuwg76ugcmqu48j',
                flowInterfaceNamespace: 'sk1hls1i2cl3chv0kila9byca9zjdyvx789fdzduj8b536o99uamdrkwm8qmna2hu7zqkj1hnpv39oxq956p6dpphnlbmbhfdlawa7lzj5c688nblhzypflmh3euxqa4sthxz1aih10er7s5fsrvqy0eehxe36o7',
                adapterType: 'bh75yft6v4vnv3to9ww9219qocxtwb4ygr78akweglpt1dgvpglo2ivtu74r',
                direction: 'RECEIVER',
                transportProtocol: 'xc7hs09hp6bodlygaxrvbxo98dkdswf84tsnhpb4n1jt6eulqotr2tdyf8t2',
                messageProtocol: '6ox5untrrjifaxva1n4zsuags2kq7ypyedux4ypcdsvy5vlps9w36vhajoa5',
                adapterEngineName: 'vtlkxj4b67fqdat9la9dc9i7qgck0o6qfsxcqgllqwd7vpj7y21rudmgvoudgf0bjyfm3aeizacxcjnl4erlx54znwthyphtwf8z3eo4n5qpz3rbe5jq5ls7smbn8izjxgfmdwunryaylbo6qdgt42dnd36122uo',
                url: 'hae4bcy0czwtegk7byodu9tg8ogjtqsotbw0b7n3dge8ahfs6nkvskwtmbv2mcqmog96p0pvlodd1fcdz6qwyksnron80euxpbmgvakhd98a5cqsu7zk0nh8q9zqxh2yg3j6sf132js5m7x6uddc9d46x3z24ug6vxczlyfpcrgol7o9rfp7ivpx6v49go5btl8ocbvpdxu7ugtcop3b1j9oxl086c6m2ge84tkyt5ckxqj36q9jm82h58jvnvefah2lwiwix64ai91gpg6n6hednfxb02yc4kfj9rvkmhdi1fj7qfkr5rlqb2smho92',
                username: '0g1vssdat4778jrjq5h215zetslrm3amixuaaxf0zjbg4xbjuxsna9r89rmm',
                remoteHost: 'zsqktsjn0ekyrb53dt36dbpnk7xby0fcbslvv4wp5oba9kgrsfi9prolka56kvixzu52b2qhf7dc62d640anxkpzlwgkkp6iafckbet467o4dggpzc7jt4o80uewi28d0vibow0dsblv9urc0fchhbins5jceusa',
                remotePort: 8993324251,
                directory: '0w3y0lfd5huxa04d2nm942pcw4kpra5jtpia46jujsmp5txbhc8eas27w3r1v0ywxebkr0o1uitv4hm11v63u15sq7cv03g9ler65huh3a565u1seyxbvlbjz5i94l3pr7chh17gv0r1hxa0g3zprciuv2hrd2fepfm6zpqk1xha5xy5jw9vx9i8fkhze5s7km01xn8l929qsve75rdn60xsj5hcuunkmfustgncawpj9t0iq1511wn9nj0615nkboilvxeijcqnoxeszsbuie5u8uphkkdymld42icbf5s3vko81hpt4vggpo8biso4pqey4134gnp33xhiktwf4an2cv3sdkxjmaadjili0azs190dtlv85hn3c5nxvowcbumcu3c7fmjn3obhvigy657jmogtdur6c6m753tz7wbsat61s5l2d6wxu4d2z5duy0t0cvxfewxojuzygwu8sd9br09j94x8ju5eupg6o90mpevmp2y31x8c7acwzip2mb6b2glpcptu6m7utgn0409p4ec5zq3xpxj5wh1twzchyssrjzn2a16kb5uj02924uba2p78jrvc1oqqlvpa9x9gm497vxxlptgma79kmykpityj7metoaxqjvd5277169b1ucvjxtw1vf84ipidp6c4ddnt80gnjc9m5seem3nx46qroiz45x2wh2ied61qkqz940800ijs0vfsa86udln9opxzqugwnvc82b7ehgs2s8b7jf2l7bl75o1jatob5j1sqi0hv6rvegjwj5eho8s6c2l7rao2i8gb5rnm0karb8uhetlxn3omgmrhy5ivv2geujza1y0tqwkmy9gq813ipqyr349naf986aoo1bm7owq3efhejq8qwlqv5aiso2xcp72y2h48ickt5zmavbxic711nmeeqizfmi5eh2z3ls5ic8l65f8bmwuu0a1f6f3dz8xkry2t6ksqecidw518g01e2z7tx36zkjeou2h968ar8taeupj35o9jfunp',
                fileSchema: 'cdwhvr255imrv7cwkpnqozcwkjbw1gn0cccwwivgrviqhyj482bp5sbklr4jlkk98g61i3rrsiok6xl1ml0xyeehqcoxfly8ron7x2v1jfhmezvvvhwvoeytwlas4jq2rr3almsbuoxg5fn0fk2zihtwf3yclofroi2saf5gdw1sgkn1s2lty5cddydxdd7l95awabxmyfthtj4040ilw70vwojhcskt5xo3lzvgi7ty78w32p7spqz134ffhr3bfartxc6g23gf7nzp9aqn2nkwrtya2m6p4l54j4v7mm8vcib9ez0fl7ih26qi12l5mtteisb32xvp5t2rtt4dbua0ok8njc4njqt876fny4dxv9c97nndetc32gchmlwn1oxhp813tpaab2tsrdx3jt5f5zbypbhxsrlvyaq5sunecdcpw2vqrw8bjgltl6t7ntmz42cywp5cs8btn17v4u983zsiyrjb2y5yc8sns61uvk4ukc29kuwik5ajcl0wu6h3m3bzhtpmxcmva60nm2rehlkpsiui80umh1hvgmrebbxds23licqi6cohytberty29chzxvix2wxlapkgwqdnh49ty74w1pklrjzzcz0m8g6akipqlcck84liguh3g6d7d0h65c1592sf7ibhoxoq1xv0oz8ld4m9z1hitab5uh1evfjn3hgcrworb78cy9hkgtt0e6tz6en76br0ztvm4l0di9opo256n4va3gnoygdd4gfzlahr17vlkt89jav3gw7uzchqixyocflcfruva1vlq7k85h2lgv2d3btsxerkaxwjkyldkgmqh2vgjefwiqi1594w3ub7pu1d4reqjul9733uptslwidheu23n1ljcxgzn70pmt56d5mcm1ov7hw2ntwvg2kdm3zzl7nna0t7dfj02ecunz4p6hnvgw7j11ay6wroj8jh253qogjpel45lstrkev7uqwjcjyryv1u4thtke99bgf47480tkxcfde8us737q6pv84k',
                proxyHost: 'njvt8o5vbefy6714o5a3s8ge5zf0kc43onrvh0a9w4zskxxuf1ao2wyp2e4a',
                proxyPort: 3830572515,
                destination: '9blxaxxdoyqw0z272rjd4bfp0pasqejtnlx3lqto8e0nlm3gdk0jz6s7idbudh3m0knxkjngp7yjwgcfixx255oabp49qjq94f9qig671ki1f5qw53f93vjba6qg2z985jzq7foa6bojwavrxgm9sty966wtggzr',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4lmwuqzd9li1o340bk502e7ug0fkw0m23g60u6voqsequbj467alnxx0bkv210hi873w2kzl9d3vvb3b7vaesz78e3q05bfyhtj23w5t4mhl6xy7hc74q444m29sbx6okjgf72m1j2bxlnki05wlbr1qmvectkcw',
                responsibleUserAccountName: 'x38hqrs0z5e8yy7kb44n',
                lastChangeUserAccount: 'jxpcs0q19rvda44tqubg',
                lastChangedAt: '2020-07-24 11:32:05',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'nun55c42td1c31ivxod2624crq1j1t1s45d3giq74p7om0i10b',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'mavzwqbqj7jtr152hnzjf5lsd7iivgdxj8mh5dfm9fe5upcdz98e7xd49rkm7oy6misouqfmf7tnev4gnu8v33ekesarapnjtjwvc5zjbdjaks520kg3qosdtszeroa3zm28u2wmcek2968hotbpzwqy9184pvik',
                component: '3kr2pkrkucorcy8um97r9xn03xj2k8czy2zhsemexmo6n6k4xs1srv8o9aizy3fb89hc3kqwqjbzkonff50jn8vuy7lj7gmb0b6n84xtoqbk2iewtedivhxb6gkyvoua0l9ldt2tdu84wvacqtdk1uretst6cpw21',
                name: 'k22flnstqjutfq3m3f7mbm7ct2te4zgq47og230nwf5ocyi5tf9tlrf5mqpg3jntb3bre01tbxx9i9ikb12miogzcvfma6qfsog2pk19fasxdw2q62sp5fva0f69eww4ev2jhpriwx62ebjawwpp4k09w9naugae',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: '0qu46pph9cfk4wloae8n0mngprx7bddn1y7r80vxx19om73i4she9lmf1fhhuicbwwvpzema6j0lgusv14yq0gwwbpofnn1015y9o5a6ppick5v76mv3739w82bsfjyujrj973sdkisg1rcea8q37eyc6otb8udp',
                flowComponent: '1yckq85a7usz91tsqm4q51ivbpslqld66smtpqm4y8rpdamrxbdc5udm36ov5qgmwronj5ynhj4eithd9tlfpjrx4bvddojamzynb9y4ymb6g41ns6mhfsc6gmzbjeivv2blsdaqcky6a421ca77erjvrfb2ohqd',
                flowInterfaceName: '553t1hhf8rltu08wiq4x5u7zau0qjv5lbc3zjbfupxjid0q29znxgiki3apeiv014enpp5pwlt7bqq1t9kslfinscvxri2nfng2a3k0gjkkjngbtj17kvzivh4mixpl419cm1abf0vt1j9u840zclgqqn5j7ppoz',
                flowInterfaceNamespace: '9y44v3z5mn5rtm4m2g73ykong3r37jbyrocifyuyv90frid22kviuthk9zcbz8xi68vr4z4wr83d4hkq04s7rbulku8ukad7gpekuxf7cskakqw7tjyy9dl8vkptne2xc6ut4v7lij51m6y9q8lkbgycxiwun8o3',
                adapterType: 'ndcyn1h90gf1xisyzgjuy1cimzf8olth1emfz7vmpopn8hpn56qqtyle90sf',
                direction: 'SENDER',
                transportProtocol: '61krg7fdj9gpjruipjsgada2tfipkfqjqmsrd7mxz6lu943l4rq183wuxbze',
                messageProtocol: 'gj7k5halenwesfr3z8ixryblgj3fznts6icfavl42xc07gpdp6kky5lzw2g2',
                adapterEngineName: 'knikoziofvciyt3mmot2nbk59l7bmzq2lm9obr3ju14iwyqewd6nt5hd9l9vzt2hbltb8953jcpok0sdd2fdif969dvmj966iduzjdmnsusejfvjlqppvw1h6z4k3aku3ytxbu9cd5xlova4mv9w41g74jd1touw',
                url: '27xm7wzdtlff7qflsbih4xuz4brukdkl0gfj2e46tgv0xkou1o073nwa44j9c70vxu3kwobu8t555tx99dkkaeny533xyqqjgn425bariiatid0sebfp2yknxqdzm942vbmjebvd49n4rhbskm7cs31ha6nlk0f9bccvhlmvvybja4nsklfbe2dbbuff3x4acp1p2dqvt7tqiogmrj86o8fqxf671j4knbj2rxilmczma6ypxowe0tivyzdyem48stqh80lh7u2gwbiexhfk7v220sjiogluaslsg9jnbz7p3wbuxoq3alzs16r9t2fj',
                username: 'fyyy0l1pqalgksjahf08ikutox1vznaoy0kqlhbab68vqskydyiqnxuli73w',
                remoteHost: 'z9arbxkdemzzb9deeyf2fmw5b3h5dt14g2zhuaooce5qfgr91wykk6d8860nxnqs295fn0gbj6iml9g0g5kmcoj791xg81cwjw1l096xd2az8ov1r55pw3j09ycjl538ih7jq34n07p07nhcslyvqo7on9enjnw7',
                remotePort: 2567567486,
                directory: '2m3eq0zq74nn5g5rur8v5fn8jpw11gul502r51kyc8n7y3ea7zsa9sliu61adt2pp8d7sxqehlul114ymykczv90fkrwbpo2wbplp2mwdsz81dsrxu0ht4q6t3g2sfcaauj0ixod9cjsjtk25eru4v47o85kc8cz2pneq1qktkcautchxj97uwoqg766t4j2xsgxcwag6cvpgjgf4gr1staj4u6s9objwvpr5162jl57g9y6v93lgliq14q81voq4ww4z3dzeqpufmbfq77fof9lgraix65q83x8qpwk1vhmowlw9jidm0jrdgnx033zzoiby82tzi5kpflw1dkj48wlapinoxmg9jufptt68i7xrw3xcw7zsxbb0gqttmotsrmszwgod4appbcotrdmcom59glik9vel8x9ey8p9t8yjt1tsx21u2lxd1hrjxan2bppntwz532uuyi3cbh7guhvxdnu4ym9pe3wrpaygr8qtj0p8vn1ed75s9hyorya5sjwkigm5trartbg7wfzh4ekuajw11nkbv8acadz2adcon32d1sw7o92cw2ahue3qqj9ibao0xb2w3ixfoi5854c3y05aqonuq65segbdiakrg1hc4nih00sg0bhqpzo7fowvzw6da4jye73x160mqhcqwzzs6ggpl52n81icj2svbh2m064dii3tfwcsjami5t5spwv5ecxy7qo8enhn7mdcl9ydzibqk7a3ltjadmb4i2mlsq1rqaxowwmjoqpug3i5s2de5lt1q84qowtx6m9k74e5acab6e3qm1emtpnfncj5ywz4mnn8eteub52bzu6nb44xfijscnuxre5uu9zh389p7p4lmah7f9yfjoecekhnysklurpcs4r010scfoil7elgkpkiq93bx6cev8nmtke1fpbfp7sy2zuwskjcgo8ng32pqydxozho4uh5fr9a8foqlcqkjb7skjc686qwysld6dt94k7pakyfjy2ce0giurovih36wvfe0m9',
                fileSchema: '5u6bhqss0lobvbv66yk29o2r47v2ogwejrumlp1duwvv677ya4axoqnzyxambmiqxmmr3yrboqa3gifuowpozzeolvl3gfdt8hvl9txjmvu19i9zk4lstkgm8yc3nn9n0z2usq6s83evanrbng8rgmum0pqf6ksbmrgqbykj431c443z0rgi1u6q9vp0k73le30rdm1764463p9x0c2e3sevwnwc2pv6vssyltsywip0e84w5fx47kbk9tpckxhqkv3kor14zebq870yyaah92jutbjzoithmmy3zj64snkhpcvpn9hah2emzu97zifxemajn2sp9gyeay3pq6e6h3l2b3neq5i2d8uuimefmuvihuum4a3ft7xcgihj6z2jy2cnqi2vlz7vbtz5k6ghoeqm27hcwwxv44s13a2fftpqmr80ozq9oe293wadx9zccsdbnp3h3onb0hjm0j7s1a9pt9rytchkeg8ep3vwphh257jdp1p25ulkoybijipw3f6mm9z15dw241ohxoji5qgos19vsc2lix6bya560atavsidrgx0x7dffyojqcpdycbf2whp81k9mguutbtccb8rklc00ruj1d4mbanua01ltoo2pmep6nw52ia97353cmq68bnlbqkxfhtw0zvaym3tylmm4kupnpfqed1k58yp79rj5cxmdimi3kww6yls5bhf0ftu9xdgwr8036210pmv76fp5zgpl11q28k52f24n5bycsxxnhjmkw8mikpfrh5kv5td64mksmfuykrf1dd63xu360vmt8z9qwepn7g3up6xei1rr7kw9st2kzsqxxr1bleat133ckipg8ga7k4k2goax6cva845wwhurqj3kcgivuomf4k1jyovm63ajw0n9hqrv7eagvtdr5our1nlbb8d4xstil9hv6yxzacx5uhei635lhbsdt519qo495skxulqaj5hp566mipe1j2ucpddkrehs3bu7sni19yhimltttyh889owdth27sj',
                proxyHost: 'oxr2jehah4ybgobt5cnaqdsxkeuqz2yeq3n2llhcign83sb9i9xhb6uxpv7x',
                proxyPort: 5408863624,
                destination: 'iko7krorvl3sghlvnysut8qo0eprehshqi9va86ufgl4rh6wiwasyjo4wj55oj6lh9phu0uu6ljfzs4p4ggmnpj4x93ao0uzjkaos2y8z4xvzd1qev7tgvuc5r726idyjmd5ytupiqs9i47gkk0l3t4mxaiwcvp9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xxnk631v67vp5vthjnt033p8ij69s56bc0psaux4biuh5jlzbsv3yy0buazroyxprsbn9nne2tp5vk0gjlbkmzfse60sfbmchn667m8vrz1813ytquo4liyy40nl6ejfcnf2877ccu50q3jkl8m9o0xosmb96ig8',
                responsibleUserAccountName: '5a4am0er04w3wvdwsvl0',
                lastChangeUserAccount: 'hiyxfds8bnh16405nbmm',
                lastChangedAt: '2020-07-24 04:31:30',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '6qccmu87e6g2iquf0g259hf3sl44h5qnf34zqrq5oqhvvjls2s',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'qutcnedh25ge9z38go2c91tqjr96ucol771edbbe2i8vtt9o7p8tuuatvkalalp6142rzy1yy7yv7ekzr9lmezp1t4yjatukp0foxr21mcs4b0zbwzik86p87usijzdk2ln8ha38pzablnafem1k4spc8wvasf9w',
                component: '3gci3v9q5pj1a8w7lb1389o3ab5r9ozuenw4z3tcnokyqarpcixfg240y3rhryxrom1gj9utz4xslhssvwplcbtr398dvi6uanxyflijlb1knkz9mnh8dtpj0tkzdwzd1pph6qd5l33a6azh8tgj3jwaniagkr0m',
                name: 'm8pbwtep699neds04y816uhwhxvd87kn1bm4y7ahgjd8cnjrofls4a2yarl3gw883a8b5pwpamk5uj8shp9a6wtkxxgr7vq6ye3oecjv7pxcwpv6sgn5mer2mcct9icn4fcp0ycxqk954jii3y8vtneotxws7bccn',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'u8rmytxtlg9cysa2qcpkzdrjid8lsjhsfn8teyps58v2i0v6elao1g5jvwf6wgigvtlbh04zq65ttllwdjh8fo946gy03o8zg100plbcwdab5hkbyn4okebki89b0kibilajlw5go262cms3roryv0jnpxqytfg3',
                flowComponent: 'e7ia92eijeq3id0kajsxt85s8huxfphenn4shjmc4tyb2yobhy6wqagpmdhvrd9bdxaeo0jdppts5mmbmj8nhypxhugxsih9sl99kbnvlnbwrilddv9xqbc30w9v030i2o3wo390ankpxqu70apdw03yh2la8u68',
                flowInterfaceName: '2hqn3ivcs7dtgl6m0k51wdtvev1w151l2tw1c8iovbmtboyetcbadvpojnkrglsmajagypixoto7w9oq1f3itd0227btq7g7hhyi582ud3z3hrvf8fizy8vxiaqw4dx65rwautxbnnvo19t1qnj8rkwdnpek9232',
                flowInterfaceNamespace: 'b3ng502rs8vm848ro475jc6nx89ktzd2ayl2nrgte7qcbvm4b21xozcjts0nuhz32yulta6uxw6dqesa2rh4b2e0z80xpwfak1er7sdwbltnjvmzs6erun8v7japok4s4bcxtmptka6zf2pn0m96i388rf93mblu',
                adapterType: 'uhm0q51nuhshk03z9hd56wkpkk0d24m3vdy55q3b3zka0mvmkg7sdtctsgov',
                direction: 'SENDER',
                transportProtocol: '7zelughhu8spcapg3yezwcxqjquetthen8ern43530atrlv8teydk16adm1q',
                messageProtocol: '06o2plb84nfl884xkaqiq496dl02hdlxsasd0lu65jc469youo8ge2x5u71n',
                adapterEngineName: 't52uswshoy8k5vd2b03gi78x7r3ehsei59ce06pgwkbaqzp8ukt18u96opo8fl6ckn5pjw74gjy83yy6jii3xizou182xwvuvh42wjekrnock04ng677roz567l9564vixnq26lyfotqqv3wk9dcdv50r1az5lty',
                url: 'y05l0k1ijqs45e0z2chr0k9g7r3xbitw9x70k4ujrefntur5hjl8r3fadhd4eorbx33h90dhoay9wsdnfr70jc1zqlxq1zf8ful9q6mmq4nprglpa8x7q08xyvqe9ohomvhhq3nj6ssbzgtrkzp3kk24cln7ajab3o3kp52rtbz71hddz2dnqq85hzfixe2pscxrx2an27rteha4ce9pzbt5wdqk17x3u6r2ya6ojb03fmyuzp0a0vbvkss8oemky1ooi346di7cfncw7f2e5bri0bx0taqvhitv2tk6lkwa4nrggl8jr8p63vhuapvd',
                username: 'ob8j2m9ipagocffncbn6pcoq9kl7l2ou5djmqfsw5sbvo55ffy3ayj8t3w69',
                remoteHost: 'yllixc8kr1nt76cifa4wfx5xrsgvn7pzmgs8mxoce5oaff9vez8a7hkxbzjyj90bxkqugv9vtp2aq8yjtmpsfd8s7a1scc7mj8buhg7j2mociobt5vkyfaztzpbwazghrcaxvagw1vt3631mnxnkl6puak5pm28g',
                remotePort: 8043532663,
                directory: 'vgt8b0aylreb9bzodd31p4zyamryt4isb2ljtk20sx7xicya5nbt063dcnaoe3zzrh1p085pyyu75mj30w1365f9fjolubvg8jlgx4uvtdn3xn4oyxth48h7bdajr3g4o7qkrpv03de6h7obfuics3daptqornz6n8x6cmbx4751oybknn2rn2kzkejvj66pqc5oiu3h9epj4h0k3j3v6dvl49ir5212hur407xszdpsfardfemo9h0detvogneonhf8jq7xdmciurx81i7rlov8f5s258yo1yecqhrp8xc1jn7t711gc7c7qhg23pmgzxk4pjjewkl9b0c0vrxhit5c4w0yaz932gmd4iifz9hjytvvlwlo03be7kdss9aq48hzl2vbz48pxs65fkzp35xx51pw9iyd0l91zt0bphdf2wgb4in1yp575mhs6cv0phlutyed637wz79kuij8ruraii8ocs1z53simxoc9t1x59t6l28we807u1kuh74p9oyxqw7bds61gs8kuf2la233nncartatncd0kou5evcxvv7i2rbwgoenqq3cb3fk9k1ciy8adt0dxdvyvgwoqdqtdnzy4l8f4hkuxk0546tbuk9g3pow8wta8pdd501q4s2vclut2milezrmbk8qhsrvtiwr8ee6yf6t1slq1lv2o9ookvgv2oq8a84gyomnsua07jj2j78ssbsyj8vxm48wscw53fm4bqqndm9n486gmy60djsq16sxi9asccw6a5f7yiu7wbqyr1ei9yephuufrx7xp4co5to6d4ojg4dxtw4wwbmughk4taad2lc1yx317vy1hy0xrv6tqof34n4m19qnanc2shzw8e3gjvfy80d5gfhfse8ai79vquz17jrxj354cipvxpjojb6non31bt1ukexs0nkh2awhtos2pfj2qylgicf991n9tqnzp5wema27grpu00dra9kk7hbd5ru88pgjqqhgp1gwuao7z2nd0grz2rlwtl3vw5rd',
                fileSchema: 'og1gvtgkuol9w60eo5e1v0jlfe60u8lrvb5kftqvwk44odr6yko41iybuq0d87ux72q3wrzkzo1fwnfple3ewa2ud3cxwde40kqdm7rmouajza2uw1dwl2gtq5lz79qjti9mdlcenthkop8nn9hqppy8r5440gzz7ukm93tty9g0q1su9h08yxho02ekagmkz15jbj2mtyrkhxjlj5347kmfjrsf3vld9yk8zfxrfo55vqnkapcks6t86d9j21ca2hb5n1h57xmwnh8i0khn0vz5u3smxz50uf7dr9qo4gt3lu5jco6kdeyouslvr4wv5rq2q06wgimt4fgrb77q18721o615bvfg52z5bjtvfy9ino0wlk9pitfu8dy68j0kratex9pwl6f8wpom8thwocgw4tiafiamllkn7ep5mbgkvdcdkvsdpqsmv6d3c7gt4o8f7nzvl3dxzg57fdfolxwvq3k3cac67nknuj2x8ffzq7njxdafxei0dz9z8mulh67mc385ydhb6dcp6pjxjxmkmzo66jr9b67648l0axnwqyxzuecqinciqngovevhjpj24lly7c67esv0fzvqd3s6snudmaes5g7bqagtbqgixaij9vtepxyjd3a6d79ph84t4sjyk3ld4cocfqxav8b54xdynn758vmf0srdi7dbjihusmlgjbkgpdywaw3e08yyqahpqnuigy1kehizdmgj7fxcuenlkdcp9mmv1qpjsa5hv31ibgpc04ft52em78a440zw1woiiuu97k6p39y0k946c2vmwj1tojdyrk9oyg1pmlluhidypxp04jlk9q4lv0uk64jtumywlkadrdgvz99sttjq3fazbp01uqeuaeb0cpgv412sfksi1duuvjc6skgbw5a3ycrj1mzvmg7psxpw608295yn3965vi10fgzg17rtkmq4dohxmo50nrgl93n8fk7q0h88cfvu0t5kwrq40pot3a1yz42wtex58v4a4zr2kicefwc038v',
                proxyHost: 'wkvef87f4t08qhjxp32w5saq3wekv2usw7v6s5xghduujpbqkrx5a3lk0ah4',
                proxyPort: 8290791203,
                destination: '98wyhuwbsegrk83ddeshz0ls6mklec0lht00irzn5gx7nrknv1nskn48czr8dmijq98d4ezbkgihkthjwvaahi35gxh62ygzrlnv4dlzrg202i69hvtj910qd46vix47jxeza6aowwc4hqqt3g79xtg4whly5sld',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'sm9v6qdr9e6nyf2ty7zvr9ltov3lh2m1aljzvpoifmddch89trl010072ayudspwzl69z0ac3p9zr7obktjk0b3zbm9ajf9yb349dm8t2cqal5nlsjn3zbpfd5fp3r70083ndx5jgcfilmppmew9yg5mtav0kpxh',
                responsibleUserAccountName: 'irx5a8c7dbl3qqyfaz5c',
                lastChangeUserAccount: 'vl5agm1z4zetrhuiwnpm',
                lastChangedAt: '2020-07-23 21:08:48',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'sqyx1abgk83pvi4opgpfnvgv3395z7nh0r2mt6lcfoh5w3rehw',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: '5bekfej1nzrl047akboaqf8w0zs33ms5v82gbtuewyyw29pbr62a7mk5x4w83986jia0vai36d9yhy0gqd1kwldhlv2ljcks7u3owrxycmlqknhc8uh1by71e8u2g5m9d8jzd5z23sywa1p82vm5kf3g1jw3sma1',
                component: '2oty4wsvn91d1r2zzde5wcds1jpwmnzszl2fu086oo8qzatkc5g8vw2m89n7cwjz07nmmm6nwkv81ldmd9xteoffazdg5xr9ud28rm83s3sbelg02mczgnul7r5wmscmxiw0xdkhdhjw47v6xjw88pe7vij9w0uq',
                name: 'y5u5uq3eiqlnivocollmptix1j9cynxdmabygm5k0ymjw21xq44gmzkhtljnm1chpdbuu9tvw6ql3fyo6r04oqvsxs2iicuwqdo9css1dgogbmisxn8xbc8ma6dtaqpl2ujf44x6kzu9uf3vthfr6ey3i28eqgin',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: '9ujlo0kqspfg5t73ou2f3vnz0bk6phi66lbpqbjlfjuw5sgnb60dg9r2dckiahdtn0t9krdbeqkb46embt1kz60ura23pxzs4ucack4ch9zs06j2vxshkvazfogd8mi313jb82jfeodi4o3um1ysn3sxy235v56f7',
                flowComponent: 'ng5by6h6lpf0zjxtxqacs4rwbsrmn0svfu12u1j6ecjtcrcee9z8ffilmcdee7p82b0zhxuj4p93p4yldhpx76al076frsnhue89qd49wuxo7a7ehdh6yz3uwanvabfbc8jxeu8qnkyfhcq7z7zcgsa3o1wribr9',
                flowInterfaceName: '0d34z20wnh9e9dt2z0g3n5580mu6vfwllkkuy6eygyypw9cqr2c9wszn8ynou6e8kz9h424z09os0lqsfj0vry0169gyk8f7b4bj967vv1o7ai10f7t3u3y9kp3i675wz00hgtfnz21vy2242ev6ymklmizpw86r',
                flowInterfaceNamespace: 'utzft0xavp6kbvk6jtmtcocb41gbxstlhbwg71bihpk8z8e689tyu9kzaxrlerc0sbw3rbfkxqiuze5k0mqpw315zlgzw5mmz9ckhkpp81k3zz6knqzhgt1jjzkmp0q5nfdt4wnwu6u4yi53aillfv1eikf234yh',
                adapterType: '6z32cv8ofz3pymmt6shur396rk0x4ui8yfxa3b8rs69dg3b61zhusqcxqgzk',
                direction: 'RECEIVER',
                transportProtocol: 'vhpnlh0f9o7vcerbj8zqu4o29qc6iyxb7jgv996zp8k5wqtmbe8pea352tyg',
                messageProtocol: 'qrmywvfpd1uoxhbac760ez92rlhcs1sdt3cfwp0z5giows3x8fw4gpi1dj83',
                adapterEngineName: 'abaqtlmvfg8xjywnvfii33xyps7mgk3cwl18u759tu733rfetb79y8t5g2fiqboo1mqvzz2on72uqfewyn2kusuytpuilmcnddacrfjfbph1igdand4soqdl34x17xmylt4zu476dtkch6dxrs11y62h6v4qazat',
                url: '74pu710moh810ntbki4rtis7x51fzj1khmb8ma62c198ux08olqt3ygcmajeay9znumno1cxtaismefd52iszlf78i9iscp0xgpuenc86z9txr8fhn005hmy21c8bqjbe0zbqgs8utf9w63bu8zttzlamhotm8c1sxnajr9oa98vq7rgwf7fqw4zf2zrxlyuqh8weq2uh5bngmqzp9ldir9c037ryka71vsbl94yphbf58508mciq3xubk0kq9v0xqebtv3u247pa2gat3v5ri1wctmi3mzg4f461visuai64gspuv5jjz1hwp6hrlgw',
                username: 'xwpbextaw65ja09w66i1qbie57cn1vordlmzqz1uebvvwu9sk6lsx73psogp',
                remoteHost: 'rs7q9wz6clvuqyhsw4o7x02r43lty9d1z0f7lkid6mvi2e9a5mkid7dijy5ioip6vr8fru2u25t4vi17ubks8xzcvlthdgrpz2ajajxxljcav1nyq934j4eg7ulnkt43kh3zw6vnfex5zdj6tab44syqzdzdqt16',
                remotePort: 9310732622,
                directory: 'uzvrqpci8i6h34q12rphvxvdfre0p80r1r21zhcp11ose0rpdrs7vuq5yxpa6yg4t0yx85gmczsfgrfji7kohnbar3ue0sdgdko2p8lpcv4g1nu9li6annbrkqlr17hv4vn4kugf7qnbk9p801va8xbx3ome2xhnlavxbhpk5qp1r3zm4akw076cwkenn3jhiolnjm7pjj2wjxb2b56jv7r0ebzhu01pdrnzwbifc7a1q52cpoh2sq39g42wt6aoc4hggehq28o7mvzli7m5hoxgts834jpymk4n3snovixg4m267jxgs29dkadeaev5s31m7uotcinx4eftmt85i9vb4i8llfdxkg8wsr5kfg33a15i6k330i893ei76l8w3ygvc5l9fbbljlgkryvdew4qumuqadllxgipur14p311z03etmfsbk0pzroxrom97473ja2a86mwsekavggbzqcehcxakfcuxr5i8xbm2nunlv09md7z8ha55qjcw1g0v8nfryngz3y9ku54o15n54xb3ovvz0i9av5fz8p1a3r6jbebpyobsbvrif5cvh6go3aavo3fov8galu8z6765i9fq18d88yuuyes48j0mqgyoi4c4lqcvbby659vu9j5qlbjsq2l0i9k8fjjsg68v7jn3o38qtvq04tleh3qsbvwngc0wprzpzx9yiag51urweq9z4n73zu1rg0c4vgwacbdpixfr8ame3orojognu8m5m8j1h83jm9zjv8si8k6q3epmhau3dl4pqp8jus26dihkfbx3mbvxsymbn41hf1unvhp946ygdjqo8gjxsmi6z31z2dusg2lygd0jkow3rldso9ld2f1zy7r0scwjevkd8wws4jhlhckv3eyrb4p5iw1va4aaan6kwjxsoi1k4ejnfmboolnymhhpqakc4gfahz3ht9hegp3d52uxvf3lvpx60g4ala24hcxoiqpcpa5ommmbadopc6oey1ds6ij9rmrgj3umtoo2sbq0mh6',
                fileSchema: '6qos08obf3tk4o3rsvri1k4xs3t7rqfg84kelkmgwomudpvw7pkkcmzba5ozmxgo7xku2tbwgy06vesao8oqcksyy265jutwpa20b9sy7v0xhuowvu6nmfvsjo25hbtwxj1nwigt17txers5d63fycq3iwbk44qh10ejaumfckhmq4j5tnpokvpccshw0xkjca44ylqraolhteh60nriktkk3ejo531apwdprhdrxql0nfc3hbffbh97u7u11f675fy6pjdkoofbnnihv4kksvsxkrwlo4r5rnd58dhv8mdf6ng76c7epjuzruabxkyxasbzwzj00er9oav8taayz16l5b9va2uy81nee8fkf80r2z6d30ug9y0q7aj84wan7kwl5tibffgt5bc6n8qlm9beoyzt4ryp62bnkyhs85arvblolemcwx3mgufgk6yk7offkkal0718tg55l2b5b48oc37ppzbp2fkc7v0kmwwkcx3r4lt3zgmv4socvox1wixqi7feuyas3nwj2s7jxulh9h8o2xcyiwqyiyzo6cew4gag3lc91oph9tizl3ojj8g4xqgg1o1zvz1n0t8re806amep27uzmixlrsxffjoaq264ogomxkc6sfdpjqn66p9exmxopc9gnkqkccb2spe7qx1xovo3g5sgz289n9p6lv0rxd4eb3zlelrp6uwy1p2uiz169ga7sccf93s73bxnl5heaevonejtwjjromi3eyoezh20b4ip60eiiso0eqo5xd3yza5pi9dvzuybr3z7e3gzxgfs45ob5zx07sagaj3a86j9vfpgjs3qmsxd7jq07u4vbvjwau7xb6ja7xi25zwyuz58sclswx0jua8cmk2wrnmxi1x34dwvfxhig2z09c7h4ck0q7s8rfaq68xigbz2jxhwvuamtixibwk6gandgq6jsab51qdw5elhgnelro782bju7xqr5nzk6uagfxcoda972uhdqpfrw6zgu7fshu417mgd87ntgr1k',
                proxyHost: '35qhfhr80u46o4mc5enh2mynxxoxxxqqieostt0zz3whznh3vem9sewrz43z',
                proxyPort: 3301776918,
                destination: 'kpl17xbx4517rd3sinl2feys72xag9jpsk91ljmyuoarqldok38scgx9de4z4dmm9y7x72hwj4f7ydu66wthgwn80g8gwj43p2mpm1yahckcsjwoyxxiyz8x6tueoj8a82ympkw2yxx6m4wcucdbo4whcc3vw9um',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wbzmxfzsi93k9s34a0j2rd6894tq63c9prspzb5c59edvnvlwmsa5rnvuo9cth7u5u2mbpmhq5h6xb396q4juz5a4oh6vrhysznv639axflvpxjy76a4txyvf85j1twrowgpfda9h80ag62n6ks1banxhd681tkp',
                responsibleUserAccountName: 'fh7mu1p7mwl9r7heuvuw',
                lastChangeUserAccount: '0i99rxscdxwoo6xpm5g3',
                lastChangedAt: '2020-07-24 06:13:44',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'vxsw7utwgaisffdslq3gjrjv7512ymx5fruwis2vyw43hame50',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: '63z0d4ydbikeaqk83lmyzm9vvyrixughbuey2pklqrvcyjxe5aqmezhivz8bv2ccsgm7w27ubkxtuw3fkp7efqlubnv8xdad4v07rnxrali9a5349ccn8d1wsfexrdusnz97uj592ctfcuu95s7zgj3ranapgtyu',
                component: 'u3y2e80sxmv5df4zdv75egp98gx39ds1w1d98yj032yqx7m1po72qlmg3ptvlq2qp0z42k2kvyzzldtgiljh80gymyj6lqryuokkbfk1orglbxocd95gvr8q4l6h7eq4pyg2ncue9bu7rr4ag1erwpbfpghsjvo3',
                name: 'q8bf86rhyll8ai72avc20fd4myysy8qiulgzmc5f2vmsw5ys7hiva6b8mktxpn7xa1mlg7nwzh7ujuc21xwohohffjqs5d55kong9odjw3psngjtvobcp096ajc4bpzvtyl36yh00uds27cp6rfbyvxd020u08br',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'flvlmefij88g1c934pw31sp2l41s2eaq9pytfclkix1ug4gcg9098oi2ar845202z1viaeoj2sz6uvvan97anc15vq42nab3w8u82jjdmlysbaanjaaynsltfots8zqeiub649e8q18i2kzudb9hn3m7jyhyqt5h',
                flowComponent: '27od9epbqum2arejqnx53vf7lem0y0m8p4dhotv3axq3661k5gydir5pf9nxl0pcnuhinf0ixjrbycg2bk7nmhkhh4cjj6sgcyrucrk3m6dt9yiyxncprkqwnucaf1u81ninevsi2pq16awiskf7nn0b3ze78f3h5',
                flowInterfaceName: 'w6n8d7mao1fm9a3si0odzottk903zgpd130pvh4u0kkfj5lcplhhg4pg8rmya9l5a85nm30xuyvgdycwc2mtvfwzp1v9rys3g49ym8p08ekzf4vjgy18rwb2q8oi5au9wav9adzxxgkuqdz6eron9rv1yxcymix7',
                flowInterfaceNamespace: 'qp83frcxv3dc3x2zccor27t69301pgqelnr972gxle73kwrc04prj47d8rw9t4z6isrdfof3yhcdu52t640begcvmiolhqsathgx1ve6v7rqjbuvje58x99uzkrjycvs8optcip1n5xysco8x8zzey8g56mg42qm',
                adapterType: 'yw662bauayhbthml2o2ovoaba3hdv5ke7w1q4jg0m4hwyb3ga913zp8zqd5l',
                direction: 'SENDER',
                transportProtocol: 'r37se0uqc3tjdgdhvy53kikux9tjhjt26w02nkt2x7s8oxrgi4ln05u53t1n',
                messageProtocol: 'dnrdffzmv0et728gv0qa92i1hre3mtgw70gawernif7uuxyip004rzbhed3w',
                adapterEngineName: 'hx5oc3mqyjzu9nqr70rrpu0i8fzksh2a2xeuels3zoyft9grlrqy46lllxxekxfq2ftjhb6389a444t52lcld9obbrdfpgit5bqt536whcvllsv261xteq0d0vte7t8znw2n9q3f8xgb34hgzs9g61kfbh1jufiw',
                url: 'qgoi6qec0u3bwalh3g5180geys85vs4st8domdswik5asb3vftuuyqctgo83wc4gdsnlil9cm4vu5we8jmx00aa6iw8i9yvc7vvkrf6pkw8l1xlmexedci68qol1ck8otsgio70xl1yv63e2bfves2i56rajv6jl970k9udpdo43khihpiewhao8mdjn4vjpdez6axk306hxvzhusqhiljbzcs8fnfdqs89us7b346yh7jljk06odhppvd0aci9i0s1saynpfijrb9ff1bbdvhqag82lb9rp46xg73wze6ifdsvky6b80ab1aqgzrfbq',
                username: '84x8k73id8dn3dn4igyyt1a4hjnglt36udfog00951kpjypl8grroqf7pry4',
                remoteHost: 'fz1v8mhaug95a77rt9ecdx7hhgdu8yh0pvikf8foytqfocn6krsa234jujhntuv69o19dv2awveqmzd2in1loe7bj96ux26gfu2ysv4vy3iljtjlq3tibfuehgv4ldh6je8w9o8l7cxnhotct2nhy1a507uf9616',
                remotePort: 8994597329,
                directory: 'oy766m4kzgu7l8r2byipx95uladxet782eixahwdizudbpu7kceig5ksd64f9qeh134ydlgqnzpefce1n652vup1jd1nnlb2djapn1u2r5am6mnijl6b4xjzjrgm160j0tcjo6m4y7karrleye9vfri9ytztywjjdsenq0onnxz5glzep4lw4ptd64tp8sbtyfrrdl9h51jflooyuq3xdx82envpva2sii9roacstwhsk6pga2d3ydlt174920wg82k8kyx3xvtpuz5vvn1hqqrs7f2yu4igx24pfenh12xl3t8j9kr4py64zkp108t35bho0hddm6mb2uzcgxpz79ir9gfj2zocbymdefjmkmsogyussaq44cgl601thoqfy62qu5dz257nw9o7dqz5rcc8r4pr6iid1b0rfzu8m7mv10h74ziszwc11y9j5emz0pr16qqxghq3bbo506mn8uctdvq6qws2f6p23kp8km14xl2jmhyz9xcsa9trnjitem4vh4lybh9rgbdnq2r7o7f4hc5da740mlo6hepbn34lcw22fsfezodw6q92sbo5bjlzdpoutkjaps5cnfli6qxfj58dx2k08d07smn23z0rawadmnafazee5eb71mc16w0q6b24kfuq4645tzesyx7bixreql1grqvyootyuscn6hhd3kyjdyyg822p0tufegzylyqrzg3vinseiubsg79ezou8arntg279wbqmkdiputog8psskp7xq7ywantdpj43gy9m0yckuv89idbhv7pl94wy6idmecuv18w3z6incu8t25lwipfcu7nn24ofz13pspr41flejhsjfcjtq2hgcbwrj70uqziov4fyeoa5du32r4x4ru2g5q800j9pcnxm2dysrb7rnmz9ga9vma5jndy7izporsmpb5tf3sv07vzgoqyz33qr77as22t65f9h6celdicus25f4hdooyhzzd1qjx6l84jsuc0y6iqdninltumcsw3rg8zpps4g',
                fileSchema: 'zg57rbiu54zga0rfifote4kftfuk012ah33wqbv7dsxcvj84xl51ec4nn7n5ljn4f0k7mex6zqmf7md6kmf1hokv9orfsued8rhnsvkvq5ypmdi1nlrkcrl41i2kr7ooc2us5pdeqffcyp2r9eotgf65j66rx2me5pvvt88b01ret4zi83y7lf9mnl26rt39cji1t29d0ompsquxi6zntyqa2uka1cagjv8wh2re7ljs9p78abqkaqb6k1xyg616g7t3aa20exopncnxocthh0ce8u2tfnw2bbqioptqbz8a4gi25sk8ny3bp9dwui986hcas6arf73b7yl93mzhr6ytbpclkdp9qwnuekp3piybn7l8ffubraqavzwy527hmcjlocf3pdth3p9pf1fa82ge12hb48g1gt03bh0pwhv0c700ljpm0ugyhfyjdmcxvnia0emioahcovxkdszuhfw8nc8da6zeodv5xrcwx44p785l915f5aivp6m3tbr643528h84zdrcf9679qs4qdpg79wxkwlvuekszh7q7mh5mlssg07ng5a046c3lmwgfb2b2j2fcqu5uo3bebiwv1lqd006orbn21ry68vwuw65zjmav1kjysp78n6aa1c8knp9awyxf98ijjk19kqccxlm5z9jgo3j34tia884w32spzdparen9km4jvv8f499ej1pv30f4tx59xyoszfrfr1i921ajzrwd58gbxi6m2jwyd7j5bxaupb4atn3tedtuj9m0lmau3xsrjlc4edy9vlm136jdkfn5b0e4vvsibvaqlryv8jnxlk3eehfkgcrmlgxc283h2zf7szaqzvto556eg0xnl47ixpv7wkib2s4gielwmc45qbnyfcopdhk22birkcvwpgoqbtew0l62s9q9v25k7pz56oyuzmg1s7ywza0aq2y8c819w6fipeqfpk2uhu9zbtmzvzmlq8les1plqfqhf13hbj42g2qggxus1mxmwkezlsrjfy9voy9',
                proxyHost: 'yi1ltp0gkceaf2yo1nmdpt95pcmpneoq4rznkt2q48jknue7neswa938f1ip',
                proxyPort: 4391171113,
                destination: 'pcoe7dzut9br4inh7axxez7ujr9untf1cfu5b5qpn3rxppjp6ulge55hqow2rxox850cnz411dxdq3d7xuaz7ouokdghatoh5me2kalpxy0rdlinm4wv5hw3lynye6lnmbjbsm45pdla8cc7wp1m9as7sbrai8zk',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ggx6c35fk0k8rp1gmxzt6t5ywl2fhvhqn6tzxofgw4xj8zsd68rwqlcqrup20v487isnygsttk3ujaiqgycosbs88l6c1ouwbmmy0t9gm3rj9tr5o1ucw72ttp7swevw3v9qs7o6orba28alll44pxhgu1pxrzwf',
                responsibleUserAccountName: 'ajt9gi5fjm40a13qv1k2',
                lastChangeUserAccount: 't505anwk50yg7ebwcnro',
                lastChangedAt: '2020-07-23 21:29:21',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'qq0lhen2fcat013uje5iohnizwhn2hiddjpj29oc7u29n8n55o',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'yv8opz7ke6sj4976mtw268vjvlnv79k2c5tfdqwof0sggpw3ezrhu5txy5ggcltz6qecfte0a0yvb61a3vyi1uy2t6lcus0majwjakb4gyfdx2pxjlm7yvjnnuyceqx1qhvl24zu5tuymcpz63qpzxb2jxcejekb',
                component: 'zigdybtxhcvay3r3eqi2fpp3kx1sg2xhnkpqij70r4vqz6c8jo0rflyy09hi72bjzuiw1cl8ubi00be0f60rg8xqwcbfo160qo8syx8w325e4k2e41nzgpd874zbvr3k4513n9qywbld6u3uxcvrym2dw5rjgc6h',
                name: 'ul4wueez75f5bfebgej9yyk01kelt3wh9qqwbjjb5wvpmyg83redka84fgo95qhuqfk0ea88mn3244nsrqvba20jv9xsrepb9nwqpgdgccl3l6lsbguh9nc54i1k3fw8ishfdyzkgzrqrdibz8jernngfgw8mgez',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: '0o8zvyxksn4silrghsy376ykzunq4ixt3e4b28sbb2olzyk2mskf2ibd0jyt8o40zicmuc70q709vib5f8nrv8m3tsrzxhki7celszedva4zcfia0v2fjv5bk8dr4sns272h1yrrp8mcuw5w9cyekxyjuxumm44f',
                flowComponent: 'mcoenzipsxfx6ar0b7gu6c9yyracrd61g46j9qdrnznoaurgskxt56qt1fkgl6329ki6k0378kr9bfod6if6xji7l075btl9x513zipnjyln7h7dlv1y4ai0wxjioq5bpvdu9b5652gf0jiw1inb895eq3k1mvzt',
                flowInterfaceName: '1q7s3eac65ost2uskti5fgtoklcs1uu4oziw5ex8osotywvaye5gd3r1uxk1kyjiiiqxeu3aobv7ofal3pxh7ee3ppsuy9haaty55qtf2p3nrgw0dk2erk9d9todw3mo7bcdugnffjx5czckgop91wdb3wvaim40x',
                flowInterfaceNamespace: 'ycw9uxcketpv5xbpynuota5ofceoctre1erug47zumxw0mjlyxnmaa5agywh3rm2yu9ao1r2q7rnak2wiu18nhxja5xpq94lxub9za4fkm91exi39jcy8m8eg6vslbxuubie6csumkgxqoxyr2lkni2dzb8mffk9',
                adapterType: 'xx5fa432gdmo5dudjuabud06o668n9x1f5gt9ai4stpofxkuxdwa0edyvbe4',
                direction: 'RECEIVER',
                transportProtocol: '28fyggp1hlze0jpmfir47zvrbk9awd4ohskhcyjjkem9jc7soc1wuorelgxs',
                messageProtocol: '7sblvjiacmnok02tmkau2ubhmxza0gjnsv5klqe81dypaax0oqkk2hg4j184',
                adapterEngineName: '9paicu2oxolify2ko6jgw211rj9t5wveid9ha653upxbr4zo9bw6kpj5eu3qsrxs7ih843p3tykuiti2ffi0l0c1lux0fayuy86xuuqtewatedy3k3u92s2fqnohj55sq8zqsyxyuiz0elq4jf21zrcotljwsmpo',
                url: '8j7dkm0c1b6le97fxmqxtkg3as7efcjsrcbnss53zhxkgzhcfmikdp9kok4mxfmj51o06gg9x2vpglq3q3emih1hsleufcegcdt9oph6qlcknfhvrlyrxu3r0q0dr5yxkp1u3o8m7o18mdreimxdnrh4x7bhxykpev8wvzrvn2myuw1aeg3yw7umxrfi47xlwzueqcrkmvhuk6yrulc4bef7r48clg05z0ty7wbs2qjy6mh0guf294gmsrm1wh09mp5pb72lzx345odygc4nmn2b0f6bldiyfmjroyz13bb3v2p3js12o5ddrtel078r',
                username: 'dhtg95lgy9imdu3m8rozmsm80ps9tzkclgjcle4rhtnhxpjvs0nijc114izq',
                remoteHost: 'v5vcyh08xv419lrr6ii0dtbulx7asqxibof49iixqsaaqhvxesffxqnlb52g89ovehubkbe8rib5o8gnvkjo4grx5t6wbd7p95lrr9z6od2is84joot1abednfroryqeeouuw7sgwbx0ilb7wm4tifcl6yms1fpv',
                remotePort: 4133569957,
                directory: 'q9zl7t49izxo6xd769gjmn1ovjhk8glo0pnod27gop274fmtf6xx8q2zgyr6t3tdnzj74zpg0hpir0dj9nko6hj5rfaa5wzaqv9unsterflqcmaoo9ybhc184o0811hvgryxkelgalvh5brolpjsqo6nosuwb359emoi2hgj0j1gwms5y06iipa46y4izxid91l6j58cge1dxslxt1zekna5l29k3h8n2k66amvoeb5txfc7zku329ubprkp16d254vw1fe8z3qc1ttrcs5qmv2fuamj408bvsa9a5kbevutqjgu6i157lz34zlrqp5u339wes6df1780f01t3u4gjorxcp9vbjjxeaa5d3awa076f5k26guykp6dwug7roc7nzcvixedp2zds7npopmyb9x7ubr68fbvbhhgbmnwxn84g0u8g7mr2lswqi4a4szcoduamjcuy6599c000yjqbno9a7z0kf09sh7tz2plivpnmhjnafrx2dqha1xgkf8kmibzgyz3xmvxqql66bott6dargc3itizhsf3bi5uvr0nbi0ykj4e150v2lvs2qxo51o4vo1843nnfnsvk7efid4323xyg4i7kj9lq3cgg6juun8aeaioe6d91izoz4i46pf764rrd2lpg36ow38m0n2u4jo2kz1482npjvou0ngcomvn8agxhoyb1htc8g1dgatwzgrklkubcvvlox09zky0wouvparlz7i21b2z279a7f4cvmdkrrr2kdo4e0pv77017gfk0v3fcs8v758xynouxy7hls6eth7jqwl6qtoynskplo88yux5xxxfa15ax3i05awrr0b3thid73o9gi2m2jghogwe8dt9k3ygvua2fz1dwea1hld82ss7txhm7zt81w9exd38upag0y8m6chjznp9vm3g4mpkfqj4wqryr7njnee13g8yqukghnf1kbqmpw4uk3tbdg3g0c8ie7c6l8w64h7c3pkitib8hkwlzo6mbok4jcmr6600rtr',
                fileSchema: 'lua55x5tl8f04wxcqt6jwlut9a1hijk8rzlag4eggo0q3aehnk19jc08g2cunyoevdnjf5f5z6ruux9xpkwv0wcnsf55fiurvc4hhvbxno9nruswwbhpayzrxqtefll1z5pxejbkekxdcehhy3w29tps2n3mdg2qx7wpzmgqpf8t9mpjtulg2c1z4mmsqemynp69uo60utrkvj3s06y1xiuegfdvkiszmw9cjhenoqu63d6saht5pu6k1dt5fkre9vc5fmxlw69fsxj1ef1nlvrm3pxxzp7vwlqz8e524u2ifn0gg58d5eicvc89jc1z2ukj4b70xksumam7vcr6rv014ha2xna2pm90u832via9n8vq9lol0135wo5sumpcrmlccisysriufieomyd0vf8d27rq6x80pcml3m2tcgon2og8t96vlugd4tz5v2e2jakott90o1fj8yko3j23x3rj2dt3ccqzh3pqfbu9f9h3l3h69zvuh4nifwwxh2a4rnem20ftb1wrqmw5m4aiy4wwbufjno0wi5fgul4honbtuhkciwdzhecgh0tot9u0b8gt6cab7m3epyqcya3j7hefnt3s2i1fvq50r7wlzrcyufyxrm9monujidfk25jkw8g0tn41ijsemr4uxz8k1vp1sm7ezreckzt886iswo4r37xn0y3vhsjp6iljbmhxkvezthmx8i4ahskq5es18yrztfa22pt9u8d25pltkw395dhvtnqzv8d4vex6k99upgud1q0iujwczgv0j5yhy0lqg7rl4ij67w2cebgvl9gix91a431thegks5mvsdx7cvds6n9b9c6fvwc8u8pqb3k61dmxu1i25c7qz44sghhfyhokltes2i8q3cxt5ink5lajvhd21xvvvj2knhkhs8dfuetjce9jl9pz9cppez47rorp7mpmu1apytu4sas87g7n31lo67krxq16y1e7c0r6z67jpuet0y6px1y0kcekxlkio25s3oofwxpl97p2',
                proxyHost: 'jpntaxlxllkszouoyxrjia5xadx1zoeyb0z3cd4k9kxoq82xrz80zbgnztc6',
                proxyPort: 7893792729,
                destination: '36gh7x6apxtyq9c0nb99rzhcx2xun2nxh7o8vb4th6nc6gv7o3uwp39rjxl1q4nw83rp9bpgbf4z6zw2brf3d6tkyyzjk93zimtlk4iku5iicuj5jdofzcpqumb113l0edv93d9wjniugm9fucxi6gl2iff2vysc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7xzjihz3zj1qj421lkxadjvkd46cbr6wg6oytu0dcwr3nzc3l15tgump9bpxrd3vqzktj0kaoyi1dem8gzcauzov00sf2hj8o0fc91v2kpqxp1osiraxezlwp91rajak5u8oh2djbuueaguca9swo04b1ewx15j5',
                responsibleUserAccountName: 'ozh984hi9tii3n5exbhp',
                lastChangeUserAccount: '9mhe80ai8u4vn6073syy',
                lastChangedAt: '2020-07-24 05:13:39',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'wsxjafi0jbnl83n9ygoneh7rt0e34globro4nb8c371jlzh6t0',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'zgqnuef2qnsonfiy226vbn5dp4pg6thf4ktwg9o7abfaavv8lfv6qloj8kpnjsqp3jig1ttkdyt5tlg6udgse1izc5eqiksonxp3zu51byr8ln7hxui2k9r2y7kr8egfx93ngbjg2hdd6wpk1gryhpzchmg8efp5',
                component: '86z0lm6er23zhik2oitueumnv2h627dchudln65x5scauejjthp2d651okxe4tk8arlrepnuq3tsjn5up3bytjrqfefewid5owffpifcyyxb9q7y4gzyfegzin00bl73r35u854pt5p8spdsqqgo5gbqptxo7cd0',
                name: 'wyvnlsuh64kw9x3i98ilgzfwrxm7ad6th9uz3sbav1e02l2tysbrmk7sxnrw9rccnuy8ekr0bx1z2gdhf653408ybf2x6kbx1a5jdni57lzx7psayyr4k1inbif2prsd23xjphzo4ka20i15zqzd1o252totdqvk',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'dhafdlrda6vhi4v5i7o169smayqtj1q5bmz7yxvpdsebzsszfgpnb2mfjp8nlhaifv13999bmbdgeq73a22ct5jplsv71ev3673i02xfk9yo0err92ohdkz52srq233x3d89wd0218qnulx9n3kbao25oiyi786f',
                flowComponent: 'a2bxwx71zjicpof2iqo3pxsonq08baimpvt23fb0edlyah4gk45m4atrvwg7jlbq8ead1ohof6q41rv1fph984nx8vquscgp4pi83pkmx4aqsoje2kg4j7dw39bocz6ogc07xsncojmipf1do5rr39dl0twlwi66',
                flowInterfaceName: 'oz74v4aj48dfc3ehp3jmn7liedph7ofgkpdqpptg7f165wpbm1nfljniirxek0u4fm67evjnivdy2su7v8revh589qe0883ywmeukoki9zas4vz35yl0j58q9htxh0etlmu0k5ooslj6t04vr1n2ejxpab68eigw',
                flowInterfaceNamespace: 's1eik2e70z4oz90xy9b55kfesuube6f4zbvmfqzbamvrbdq3vojlvb2hy4v73tf4v6h6kb1wmw08m4uqslelq730f6v66fd3qt5ddcjjj4fzqw44eh8vjxh0fturz2779tf69slnxv8rxh5qu96z6e9g6qxor4flk',
                adapterType: '0ptxnjqi4hvoxbwqnop4x3k2bd3m9s6eu1vq5wc3l03n7dffyhiay3njokfd',
                direction: 'SENDER',
                transportProtocol: '7pqe9odche2qgl2zvdo3rt00anldm9n7nxrvg0hxvmqjkd6w2vnuh9s3o8dt',
                messageProtocol: '6i8odj3whbbo8cb7ka36sbsl3jgmxr33wtv79x7e86wh8sc3ok5hjm6xfyqg',
                adapterEngineName: 'oei3t2msy7h2zs6ta60yq7dz1z1kwdml6qgdpi5707fx2i14h6jgsbbcco1o94mpw3xgfw3hohs0ge4e046uhfw9vw7z36jt79v0e2puoa27a23drew0wpfst74an0fnv14rra0pv1czr3rd0lm3uwz53lzicymv',
                url: 'i64rep0v7saxx98db7l5nm0ebrcxr3p32mrx0xpwi1vfe930k38ro52wos1wectv59mpdp9pzu7860yrmo41dsyo3o8130nzqrms1rexq584upogczyonwg06ikr14dsewicz3kiyz8nyzqpnn25fo5h2me9dte83npjsgkc3eo02tm52zviou4i0bezfe9byx8wpdwow5vj56e1xi52rg3c5kpm4arrded5bz596u0dn216d3htlzpamuy3tmrznheiu89qd50642uh57oluruqr19m2p2attg0ommeup0hp4qcrnxfgora6hgnwlin',
                username: '1n7aslnckghn1miabb7n5pl1jcvjbjux0njse5w8grbwwtg2i9ft8y3couty',
                remoteHost: 'vt27h06ri2l67vrabk8wbexk7729xn39iqcaj8si4xzt4htzf9ldm2l1f60out5c68valsydfv9t0iar16dbeg7n6w6zj3cpd0oc7svegd7eexvc2awa1scic1cdruorgxcj86d9pu1gphdg6oii6nt4cr0irq8r',
                remotePort: 1518225593,
                directory: 'ksxxpiku38y7s1z3rj0zdtym6r39o3ensh5i95seuh4oxooov3d1krgtd88z1bropahswdrt8asf2hoijvfcl23pn7mx4yaewylbb06aqocypk2bzs3x8uyt57soyp9d2gecfhgxkzxrs6ubmnr8f466gt2tb96evg9y8g1r19oevjyqg4v45wg6inf5cvarvfwh9y6kg6f4mpnaj1xybz67ov9r3slw5yh1co5rhyo7ivtpn95xzlh68ggckon7zi37x1t1bruxiewacb21mjd3fub1xqq4xw7ohm8qoejm3yhegt592vk99581suzzny8mgqdvof06tsftnjkkp92t3t8cn5fw0ur9267cvy6krnmn8fqdq6aptqmtomnmg3d5colu03tfnm3mdx4y8acs5wfcqsm7vut5g77xfuoga1sp3yfojlange8msr3zpd96e2igwhsypubomb3ktgiwn6z1k9h8768ehoo5xdfyb0oxcdw0m13qwhmcergqfw31cga58rff5962503qi9t0jnqe9b26owtishidjok085tqhku2elnva22mnkewwqj4kun7bfgi3x33maea42olxdr8soi3p3h6liza9gjrgwwxkn88umtm9ury6wsjjppqwn8k3cxe5a9loigecv78jn1hro6ukvekyba81r4a3fq8qzapgqlav8v6estnl8v34mf36snvkl4uo5rm7b4ydwwi1je7i81qb9xmufipwdxcgzz150rx68f8ybn1r77ogvqx3xwys22zqzixsw1381qozad4y905h54fjixbtgjz1l4unqvodok3utp04ds8sqmuvnwit0jrd8d8bqmjkqcice7eyv345j3hp7nzmvv0lulaeptk3tdnpya8hplyd35mb20ue359ps7cgdaxnhkre3980vj0sok2v1w6q6x62d4519xrofjylewi00ubaniypdekuudovaf7ptlmvrdm5moidov3d86onbyuamaf5z7p2gez6ygbjbbl',
                fileSchema: 'eon89ej6cuu3lwx5o4ewbgqjhqyfmfnm85szfyf8zhiumo4wvt11yqlvwxlaxqv3nsfhlh41ouz2i6crs7zaqgp4ni8qojscq8q7myo20n4byqj1rvh6ok3nhh9cfao6tjcn668dwi4zg88w6ailb32vfkv32mehn9gqt2x2b4n0ir0eou5lvghoras9iyq7lqnbvf3dx9iii8gy945g87n6yk9uugdcx60iiqzy0gp8m6vl8ju19s79hcnio9ozx1dk77qcst68x3vkqxzfr3ta4lgz63g05q327bljisxogx3ohlrw4w4z0sei4bzkmebjg65prtbi0osrbjtu45f949fskb0e46v4pn4difync34vqol4yo1c0ijnb3i39kma7bsx214ru4ooazq9ao6g3o7zf7wooaur6tnm2bv0bvlyq3s3gzchv8wc65r5qf1xb7uwrdif11w6mkx0ex3sg1l4ktj3p9ikl6p4o0hiwr1dm8v8qg9jnxccx8nkgzywhad6rjddscldhp4kh8dbijzgyqof83dk70gn3dkb27aqdjk9kye2lyh8dftni3tb8s2bo1jt7swzmreozq5ccibkpw9v6rgyqwi0lfjvq6fq2fxyrq7j1c6sf6gace49j7v72nh9nij4ibncceyp52w0447ugu6j4wiem7dnoiewi2cc7cr40w34jwuiszux402lutticigc9j5m9d8ywgx2sdm31x1jr5jydx1coecdlmf791qlffw6xy0hjercbdeodcd896f2uxqn3eoapptfpyuz9ku92e6vppjchmevwyab2j733bi2ebtbhibck376nvj81rcw1gywuoinm2h1mqx5oje6gfhismliozkc8n6xtak0hu7j6vaov7fera9j1od05435czg5bg22swbg44z8qdakgej6ymim28r7zvu0sk599kjnq1narw3ymq6h2w3i7p2g2gpyajihew92scylqwz41s11ibyg11br326xlftj91i2ctpm',
                proxyHost: '7woby27r5zblxc98iyfohyca30tucbhnde93wwyra3h7y6h461d479y2p2xe',
                proxyPort: 1231046010,
                destination: 'dw3m7ctr371cotv1lw94arp2bt9t0y6h2n2wmjf1hrvjqfzc9u9j7r0aou81bbzhv8kjg6v22jnts8bw1jz4od0wy0scals32hu3pgukdgluj2fn02h6g7p96s7poubwv9wxuaa1rds381vm2xl925otbg0l9ius',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'lmrvhpqrsr914pfag21dagl5aqm9cdpbw1bgjq6b39grxb9o4r5xlgp9jobbxmcx4mjrdli2lwhm9fixj1axxrgy87cwixcbpilm5b6q5zifno1cqzszw2dp5hvyx6q9t3bs1424omfpb0m68spwx3saoa060pqn',
                responsibleUserAccountName: 'tu0ee7f0g5rseeb4vxnq',
                lastChangeUserAccount: 'ydll9sslgxqte1onilka',
                lastChangedAt: '2020-07-24 03:30:24',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '9vmquizk9zhqh8qc87koe19q2kj0peqzejqzyyc2nc1gax2ppt',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'hdk3ipneqpcdnmrg2lr7fbbmo6ualaqo97kj3tl5z8c1bg0es1x6yovwppyszxu647gafiih7a3rvtv1yyf0degauq6dm9kflxesy252v9uesnepm33gpuykrzc4hgo1fn1hu49y9r19c21nnfnr78lsa2soso2e',
                component: 'zych23lxq6j17fja1e03ig4se5zzkl8xumysgtbe57qyjju6c5t7eb51pgp80xbdkvxztc7de8udtbjv9sak8wpvxa97xxd0576o3ex7zfy715d40gmpx7cz0g67b156x57nq7s1zokqv7wuip3e2xa7upmr6ho7',
                name: 'lenry4mcc2sjwe09kf72tzwqm5lcqyisr8c4fkvbqjngdau0c5h58j3tn281va944ekbsdaos6yoh988rtwv5ti4i5udvuob69dw79to2n2t2ek8mke2boolkaz5d98g87ms7uz4nq656adyec81sz44nval327b',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'mm2rd45u9zu7hxuiauwagzi1w0m1v9vmcqi6bq7oec4ryx3g7tw4pigexu12bzqqfovlvmnamze1mot6tfqk1oc4qxhu8yjef3ls3d4s0zbfzze14egluaac4ou4oquld60k13d3fmb9g9cs8wz9w8rmxs144iyk',
                flowComponent: 'xy6s5f4djf8kdwpbqj8wqrz07po26isvqva4r70rqin7gjl7kwy6vmb63ai7cspt7ii4mkcrmget760h115sij7hvwiypzc6otmjqygldzn7omjve0s8ou97q9l9tztdqau6pbpyqhggwlnep71ce6vfnu2259el',
                flowInterfaceName: 'o5976qrde8lc55jp2fqlq9pm0uar6j6p8jo3n88t3s2m96grcjdz7513j5tr1ebqlttoaxdpcw1flrtqdazbh0bpdgmwj3if8dov7dctdiwfla0e6vocsq1v3krngc25se987siinthftsychg4h4inepfhzeeau',
                flowInterfaceNamespace: 'kpqvd94vswcpojwtbcr8izgx5ccqn5rf8pm5zwic90m3kwc45yw8zutp9zamr66t0bxibg9a8j2o99ry0m3sko32wr5s0ohal1dutagclpjt05bwx3sbw7rjgfgkhjhwd8objxgcfol72gyb9t4sys10a6rwpb8l',
                adapterType: 'b7klvq4hijf3yczzsuanp1yc0cup3rfgpzf1265l8pe3i69qhzec9de2rkfz5',
                direction: 'RECEIVER',
                transportProtocol: 'om84s6xdrdxaslblatcep01cagum51vp5a1ccy8sfmxwfq8od6cvu6b920er',
                messageProtocol: 'v3kysgqjr4uz8ubul2f5h7a1rj4cy8ykn68kdm56kr7dlmuevxsepdd81xzx',
                adapterEngineName: 'a096rbb4xp19cwrcbryftbct0b7d51llwux85og9ee15plf8bkacq5ghubs2qwn49dewm9fd34ippcdxr88usb4hlwytxcndituvtsgiq4fpq8vuu4xrswap6oh2gwmmi5siid38xfjs4neg4cw2lnoqg8l1pi0h',
                url: 'alf7ilfr187pp4uroh3yvsvi1e4ld5r039077eth8bvjskt1cuniteu9w562pom0ul756wy69ab2h02ksewmmla3r8m1kyndz0lbusix7w6h9cglyhv976bfmlns0zt25prcl0o6lm3o841we7or550lk7n3izsrhzu8syjzpxkft38azftnds0bxkf8citf51y2xnr0cgf5g3f1k8a73ij0zxj02wdbzvc7abl4pfpgaa93qyyu7s896a36okd6kvnvui5deajxtuggfaqo8vplxb23034it5x6exgnoatpwkqmp7770e7s7ejfk3ip',
                username: 'e9didofutrbtcezfybibr0aunji0dwfbzwzlmrr21mhnzvk56ti4vohl8oh2',
                remoteHost: 'blr72df990i8gtn75msiifbbwcg73gu5h5gkzaerepda56o4ky8ifddxcq62netann3gdnilupdxtgtx2mzvaf5mh1xn0iar3i3cqi9uyt7efs2pxwxr504m3i72b97lbg1o11twgtb8lpleb0rg55eiq0w6b9wd',
                remotePort: 5836181556,
                directory: 'd75nwqqyl87eda0rjhk96lzs1x38wrdmcdu41mozwo5lre5295lurkfddrobpytfhk0irte6f4q34vbaw1ydr7axuey37zzdx3t536ywvl7vk7zws1ospvw2rcptfnb9sexrtw5dqxcw9debspy66ebs8y5p9n952hqe50w073tv7qe5q0bigw5qi047j0fd3rpgdw7bjkvpjag0gwr7u6anbq0b68wnc515zg5wxd6eagap2tbmqtlamshw1l8vpqzal1pqqziexy9lbf1vu8z3x0gmg28hagirr9k34ml5g8y9i6nycrmbv8nhwllvwj6haug7c37iq1k53mb8d7nyg4a89npf3jptns8nc4eb9h0zlnwsjcxdo581s544xaeuu6cu0u3obmi8zxrma3yghcm2m1kmw58zm718ismtyp2udocxpb7r44rcq4zz20t90q2krgvrszmm0jl3799b39cambn8gxhgnhg5xriat2qcybwf3qr2pnj1woi20z6jhpz9ibcvg1sqhhxueim62g29jj3z9n4koz5cal5qgj8pslang4h7zl176dun6xk88yehxh9o135edleo2l9wwt00116rnsmm9dkpl1n5w9j209p9r4hmuy1yunipijojzbr9vvfiracbgfothaoir1ole5nqw9jn69945u33r6qxol3krd9ujpvrqc6bsgph71vohkv4r9t3j9pudbb8t42ffuwjjt9z9qarl731zs8mrtumdard283mfw449nki9o39v6tvnaqoqxxtbmblgwrau1xx1f8zikgtx8gy1a0nxbmbwfmv7wumyb0trdvo77v0zti2i4aa1kw77xzx9thi0f5pr1gn482a56f18kwdvdhxvk18e80tqd2aopzrgol8bo7r15jmi77tt5fgzctniex1cbw6v10k4j1rdbpc7uxne375izycy0wis3qmb71xddtsmser45rba1mw68oixn6f7rhxe3f6p056h7lopwi6wl9p2th47ohz',
                fileSchema: 'c8f8b7ybtvpb68v8rqzvgfpvk5e4ywi5qscp888grrtcmcm3skreiz4ahrgcc0lovf24brnfa3gc06efeylyf1iq3s1063dzyildules7ng7updfaizgkx3urzlafr4gimfs2c1h5sy40timssx5l3afe9o0rvz5ew2rzlpul3f8ltjh3lx8rw3f3m2x8hafauqq1o285n9dw6ivvxlbluun5j6dqg1utw54rai01rzmcklncnpsncy6l9fi8e4f57bi74zo2lmqbpe6e0a09wm4rubl92nem0hodnosw1biy8zfpj4fjbojqgb2t3rqze4ssvrad2b03j6x7we73w4y4t7t5izqgx25lnapkgjnd3oi34zqz9bhxrhfif6p1rpq62ytyb5rnknu3l4fqhr7mqwhgwkd2cdt4h9c39uit6qb7cav6zmyyqgf9oa4sa2e3ovqjrgja32ef1ci5sjamxrn65owrkcwivs4i0njcr1qsbzshlobditiei00m8xzhjj1xvuuvvg74b75zbbw1gbn0kxt3nfgrygsm51nosfk41jzigusibj0d67vqgcm9j86dvohd901hh3e65h9pobmj8l8501yba275nm6t9zrq92vie4mdewr65vbtpz7cbfkes6nz7dm5jn087ftfypvd11ovv8nt7tb0lqytvsgnmyy89pjnaxjfu6e3t1sxdanxb7rbez80d2etrikx3ntzgo4qvpk441njtzpox1ger3b1t9enpj0jri735nqjsz0h0ayb8rrzalh578lyuhxl0or1b8l9hrircgfq41un00n2bq1syrcsw8uymo0ccyvs9afm76lkl5qdr2zcy9insb703nhyq9jd0rwx16eses1ddftlq2cqaurn3vxz9zjkglbys28a525s8zpxjuoxgrekt2clot1mg69lw8shvx82i41ja8gc2x3ixjfmdkfsozyn9vq5xnmqkgbmdqi9095zlb8lxd40t28dqxc1u4vlayxa39ni4uw',
                proxyHost: 'kq5idd88me08waon28n4ds11juehk7kbn5i7mjamysmch66vakt5i7wo08fy',
                proxyPort: 8286243171,
                destination: '35bp7r5768lszxqj9a9p3uo66glp829js1zagyo5axb5lfn3xaa3uwp259v1cqg8sihipnm8bcwpumno2txzpf9feyya0gq0e4rl7ganjqpa28ffs4ulnjgxpldyrsh65lin4pt2b9jc0hactw2sjracpo6bvvwl',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4jizo1m2gjflrzidpwtnd1l2jopgp0vc0stmn9vq4rhhcpj8aw6ebmidbihxm7dd9lz7tujg2tg0natpwk4j0rnn4vfh4yxfseyzx46wtr4r39sgk1wzvefijp27nydu5gbo1g6rouagkao9cjskdwrihglk9alm',
                responsibleUserAccountName: 'uqpp7mi5kyafzdg3z47o',
                lastChangeUserAccount: 'tcbjx2xb6c4hnfydav0o',
                lastChangedAt: '2020-07-24 12:59:30',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'kja30gbtd4fy6kt6g4kgn8vp0c317h913cytot2ozs5gu04d3i',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'lbml8ezm0pojjmjp8uzh2bxjyhzmniiqlrj1zw2ruk87xw5r84xq9ww5ewqt25koel0a9zbajj15hj5f3cgj5kt1m08j3xvxv0mm26ljszbzefegsf7iwgjw2jlbddnr1d4nonwthfgg5k6umoj4dlec6wr0qi0d',
                component: '9xrnf3bave470am2u740lpucr04xw9bzrbecex6ofhn8o89s1p6f0baclpp51wj4ezmk4jafmcyy0ipr0ine9joy43o5ijybqxdy2tywk1ucbzoct3lo8birik5dlhsm93c8pnbowg5g8kup7ejnpjz3ei5adu2h',
                name: 'ldteu4zkx6lkyiv22iw2owv5vecqd12eujeep6kk8n925idcocwy77nbk2k710fkzksn5lza0e256pyiafdpxyu18ik75t8ueox8s7r56mskm07jj804c4orws5gw655tfvicdxneujqq75ts499pu7jmehhpr58',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'oitjqtr7m6d78eqoyoespf4fakxj9twfvaisaqohgq1lczigwr3lx30lpn7v8219xj460i2occqzz7ans9o0082ssnvllrvjqjzu8nrhi767k030hr9ur63lk4knx7z120vrh3z7xoh1ocsxy1svsy883pqnvkb7',
                flowComponent: 'd4077myz5tgnck1cd3qsylxt21tm2p926i2xl7dfhf6me5xtervenrh1i8tkysskhdz26onzkwj6p2pn9ck7smbbuwcfv981xlb0uv21wahd1orxr03ipm0qm7sl7qt74aflis5gg6prglny18bhgwvc59onjunq',
                flowInterfaceName: 'jl84kd7chafyh0u5wzhzw5egh2irhnt4k5s7k7ahjp4ryiu4tzhq2p7dsxdtmqn10fnjzug0mbt8s0sfjwsmbcfd3ddqt6554pnod75qpva55qn7i3z345f1bv3ur0ci0zohjr16dlggixu8xlkubo9b3moiols8',
                flowInterfaceNamespace: 'm3xr08cahd9mxai6lluvnsxqwnkumjj831d9nnfwdug2hjl8519pb2v3kxqphr74i1cnbvxmb5yt2vgdxki5oqmyvaudb4wqc89qi65a6k1e7842n4puhoku7zw254f00igk1ks0oekzxy2v5tl972dmetxft16k',
                adapterType: 'gbilk194uaxvbiurf2vpsfsfkong52x9kxjjbyjuz29fzld5c9otl8h8k7ir',
                direction: 'SENDER',
                transportProtocol: '3pptpc5rpk05ee42j92t4hs11p1nirup3sk6ggbid4446yjd4lpp5p9vnvxu8',
                messageProtocol: '0ensgu6b6imia25xnzy4eer9ukz0r3an6khpa1hm13ps4e4fu9xt50edjqrd',
                adapterEngineName: 'g48ulfl44cl182yxk8hdd0ip5saji6ysxejm9jxnb4idiq2di69z906aabp49vrwhue31vovjki64pcumb28pxjvf47k359e04kc9zu65w4m2at9zpc4h6hu1pjqa4ghpipujhz0rcbj365tuf7lpuc8vyxzltsg',
                url: 'hppkzr77ag9tnbwitfsxxi18u1rabqv99fxb6arj4yhg0dmo8x07rs6tcgfy5htxw36wlz9s3xdytttul7f2wv1hb7d9id0j21nfn74xzmwsobpzax79sdzud32csog9ehg9f5eu2chjtubqjf5trdftdp9dh3cm64xftsdwr3i5jsk6apyrb225337uyiwbys4lymw7xp0mc2gnflk8q8dn9h6o4aoyubu2inrx0p9ki7b6z4j2ttewpqi8ojwsbnfse04ncdjzq3pzx0e3mnxey1f28rxismy5ybr50pqooi5733utc2vrmezy3y73',
                username: '8eum5onlgyzistvdcn9w9oix0bf0bxh215yr6bef392fvaw5na9n1fchnoxa',
                remoteHost: '79nfpg2i3itpsz6akbg3ae4t064mepb7kmm6qji8zljtq9hcild9wxm59en9qmt1lox6t7rh8ag3fdw5pyq4gks99zp9qdxr1skhbxrud3szetw43lcupkkxso11uecjq4ohbpl85lt820uuvd1wnohyulblttxe',
                remotePort: 5025548054,
                directory: 'tu5mb6wsbuvydppqt4827rp72ep7d4srt02hg0qm1tf7oi2n8hzzfaioc2gtmgwgngfm0nnhko69ft3avp48m3ijr937qui5o217w6k932b2ud1tthekmxom9jpa9hvgyjjedpr5kzi0jyus9ncz1sztx456suaz5qhjo31y4u08a2mkpswervj6yu78p69zgdfsneqr3fzu2zc4nhrbnsa8jvy1ijbp0m08jg9fprmqv5389surfaxjy0kzg0roetuabnaljcwlhq13efpxbrav2c5r151vdfl3x1ckfk3z7te1n6bli799gg4wgxuiv90dimagjvsxdobzwvhbo0ec9i2788hlj499vjiv8pbkamn2vmwe1ffsdjr4u8yawbngvti7iul9xg4el56qo968x4u3abzcavjvu1k37u4gxw54pk8g63ujxwy8ir35hbl4z2t6dtyt8zuoicc5rmn3bbeahgli5sokucehd9058ykit8t479dtb2drvyi465bfymj1gaiq93a14egp0fc3ib6ptxvb29cp2a86u0iufo9adl2o4007zblawkp0sybw6med2kis8gnlxmxb4fdyf0pyjtweexoy3ey7a39w1ndl79iax04d4hwvny66t6024eai3q11obduawcxhfs0flox4j3ncsxqkjud02ld3uziwmiblxiebs7ucc147covt7hnrwh5rwgb91ak6qegdr8l27vhnz38fxwicsmmf03w5yt9vgija99vm99ijybtwf1x791godryowi1hguzh2w463e1y7kfsc6we0n5bnfi313jz3xrzwq6qmduv84sq1kjazg2hvzc5yydisidr101g21lo6gbaan0w2whbnnjv0ssnqncrj1q0kmaf3u8frjm7s0m5ro5nzov4w6myzcy2itg7pzmbdpxapdd4z2ns0rmc66p44lxhjr2vpquapzewnt1moaid0f4dwp931qgtw9ncvbgyj1i8r1dm9cp1053vbgf5uqyrep2',
                fileSchema: '58xu6ij0ap284ft06p3s2okxzkq46a2tj5gre0mqlnwpqpmh1u1yahavuz0mpg1kdbo24o3rhrufho1g0j7g6z6ivgjf6xduuler1s6qg39i739nwyjvy8rcjj07k78g32w4kzu628j1xcen0ghf0r5pce385wo9ecjo3ih1tl4w3ywc6o69xe2k91a3f6frv2zpvdmitpvvyrhqu5dbn6fg83uc9c0s0d3vogkaz7btwyy2wqpe6iq9hri4kk9wfq98t8vig46t6oj7rfesg9938ww7zc004s3xgvhahcewx8q6cgx6rhjmbsz807wxi4tdb76kzoymikf04gqtae9vfptpik21hf5cv65szkgam01rovu21t2j5hricozi9nhv56gowga06s14mc8j5o6tod1pgywnnc8nqymybaid50t9uqlfanwe74tzbv0z6cth72vghkibpppdh20czx0t8pfjqnrfvc6szdojn0vju5q8hzzkra8dab0q97uafd2b93jl1q1iiru89tyf3lgcmuezy77jtdljmmb3kojlmoulwjrda1ynw8mnv1o3c8t0lx7kzg8kagc9rnsyzi6m87vllvqf0ejye1nxlfnfhwo0kj7qyhhiu8dqqxidz869i11i5kvrunvpzpkd930wyhlh0nz4as0o5740ho5ppk9x04ax8aev8h14zsuy4ojmyahf1e7nuel9vhodf8v48g5k4duuqsn909tgjhmci8sn1ivy74b7p8xf4482mxyxkfl4hb62qfue0rjelc5kn7sxw0a4vbm2pwibr21pnw42zwnt2nk4unbso2n5r6whsh3lbyzxfmgwa4ilaiopfmyontbg2pjwn40dcl2q2umsi4m104aixgw3dqg0l38t8kysx6obbsmzvljw1nd0ofd41ly871ineuijku2d8ebqyvw7592lv7834mcwskfp1zy6nkjnvjqdj2tezyqjhpzw8g92e84d2q5cgswu3grck1c7q6jobhrajpdt',
                proxyHost: 'j4z1f9uf0kp4q77t95pd29duwrndx7ua63npdeovggrbpcgom4r1hmebd1i2',
                proxyPort: 7276218934,
                destination: '313r0vzzb7y4xuafel1zqwxn9eg3uodmny5zplivznyfmvalxre9ukibjp2z19clzprk0mp9rlai4oqa5cefrh5goxuirqcwmv8n7hhu5dxc8jupe45iiyfzhysadkw0b3negjkn782yci1dsf695036l3sk3o18',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'k7066rk0sm1uxoklsmczwv148lb42jlt1zckuzgwhv75o3o0ia5a7w2k1vrjq7orjidtmqesvscrcnsmj950z9orn4idjes0xbd4oh6xo25jci63dyodbq23o54kd6rz8i9yp89erxww4eagw8mlkgdyss0zr7ob',
                responsibleUserAccountName: 'e5shuc67sru0cm1vamab',
                lastChangeUserAccount: 'll8itqq3j2cvx0d65r26',
                lastChangedAt: '2020-07-24 16:21:06',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'ufw10tcs85gy38obgwci4h9sfxb6axfjkfoceqm8pjlu2sihvr',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'vzlqk96pap4undqi59u1vd22d31iroletek3aymgfi45aoewflhjawhkewoq1ccxlxcqzedox2mwqxa54qxryw8o9jo0yhywqvhhniqe0ki190gr98qkx5ipfuzfz8mvuszp2eodbv0pib4peo9i10ckie864g19',
                component: 'fkre2hzhhqf4lhj2x65qfaoo4diarchxzcwkjd622094bkbdlwid7owha1etqsk7krjc1mn66lum4fdudk3i79p3z6pwyne24cg64rch843rq033ayux25l9cftxqucggn8no9qhebgfwuh4lrxek0el8pjpnjbl',
                name: 'gh7wafrpul2954a185b7wmpjxu64wf79h19688jazmn239r8wp9llf1ktih6be31735mbdc6wd74bmgc4y3crkgdktlf47mzzki1w6fion4i1aasf81t0thforpblmvwv19rj3zkboqqzegjhqwo56gnqmp6f47e',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'ggwebxmcezaba53ryvojnylf6t5uock5pmh3i5cqxaspl8mlr3264t3v1v35nsjzlhpg8cdc5tkmbp08ci6txrhbqy9513ty203l08k7c8ioz4pd3huqcgkxmaqtg15zrq2tjhruynqofin7os4hgrbnh7unc1yx',
                flowComponent: 'gzisiqkh7mb071byla44ehcd0qg7y1ozfjo4qfyl777a8ygrkwfwyeyqpza5w60an1wf5zk5a7i0vytp1ljvs3nibl1alevfvujonbeq4yvftc9eypwf12x084e8rtm0yl9kqlvp7knbq8fj1asnxuw20selk0p6',
                flowInterfaceName: '3qyz7czlb6wk68mtg8pzz6h9qffy3oqiipll1l6xdsiq2gecl5me0mbk5g6m0oc3wjbbnq9j0hds19zu0x1j03i4n6avirsmi9sfve3nydjrh0b5farpi0rkhtmg9vx1qgkgirivdbqnego874vmeny1kwazp11t',
                flowInterfaceNamespace: 'mfn0izjh2lr8xfsutm4tom9lhdfofsm6pvrhzabmhe89xud8a8d8oykrrgy5th27933eqvfx8kkc7chput5j2uq4s40jllidtr62rh7nhb1sefefiy86ciang7o801kaunoeqtxpqdc4v6ggln8r9dqsdd1jdhxn',
                adapterType: 'lebm6i7tg4pp37oel1d18yjbyktjrvshz9k4ngbbvhblx7fxbr7fj37jg2zs',
                direction: 'SENDER',
                transportProtocol: 'gw3cbpypa000242ltn0ng01rb84mg2187ai6l3bzw35391vuzph2o2gxwhcg',
                messageProtocol: 'jn7hoxjx4eu8kc24tswewtlusupoik4mq6b6efz8r74uf0l9uhdtlx172tpti',
                adapterEngineName: 'evcjrl8xw9oa40v128ii42rrvgn6kcpeij1ygiy0sxl4g9j5n2egcy2pvytaomdc8at0tlky2dfjdv8qeh67icp1bmgufh3y6i5m80wes5r02v07vw8k2sv62xdwbvze1wbj5tvp57w8mifh6tneowyus0asq5z1',
                url: 'ni3oetq7vrxwv2xkuvpnid8xt3w3e08i7trpp59e0tipugh4jav4461ubtbuyle5cpqhtadmjo1y9urubocmz9tsf54ncoa72oz4uc8nrbdgbsp1reaxy5yhjwdap2viw7r55fodn7wvkr2uqio1gbtx5n9vqpd97hh3bnj19tsduoxy620xxad8b56h9slf6t3us3aq1cukxwj9kgrmvw6v21z20mwwor75ubxlro7nvogglq30iaf2ycmjsh83qftip2unmayulsjc2jxlcz6vg9rurkh7z7tg9vm5tw38tb7g4kq17lv16ow2niq4',
                username: 'uvkyau6uo8tsrti9a75w62la84td800p1dds3e6n1c12mk34csvtz96tg98x',
                remoteHost: 'nzsbs6dy6jrbdo9bt6j0tm098yyu3albi980y2n3wkc9afnae9kwzemse8njp1robtg5rfw81dq2ozh0j0g11lu924rr5ja44cn4ypnj1p1sm00igrm9zcduv5h3d9364r82ko8et1bp28zweq3usp77de9cytz9',
                remotePort: 2480500643,
                directory: 'wz8jxgg99iuxjoyesdvg1mpw2pg43wdnh4trjmtqpcctpxapls56q46t1d3iuuq5fzkqmqg8ki4ljv5y8wyjm4tcjcyl961j60dxyu5p5o4n6y75gc48mg87xklziwresd8q2f88vq0hnpa1652r3ous63ohgpuqn6j7v89a1nq99c2n9bzz3fj4dlmqb0ybc3o0grieewoobg923w3793dmrx937trt9yw74n713twf367es9ldzk4tg068zrxjxgxxk5u018p74r5y9xp4kfjep7jkzluqiqv10hpef3678996ztcs437qp7aswq6xwq7bomkfukzh2563lnkw8uai1efbqhon2pk6lqsrskjixw5v091girvrjjqbs2yb4pbqf709dwmkiw3ium0keng0d9ejmizunfa61cs33ohf1d34n756j15zxg83x6mvuxbixj0pb06zt0z9gnndqjzngsueeqqh9a7tjybmj9jmjfdzqlj5k34jk0v28l9lln5fa01utgwjgag39x78y3qhh4s9t26vgznualbig7rc2rjwmi0szgw0732bqym7v769fbg255rq6lia1ykky7gzui944yvbjyvse5tse1eq20635spbw3kb01nxc6pdnuwtj47v9c22w7x9m23z68apqse1n8qtxf74wft6uo34rq7i4i67xb2a69frois0mmy99veine1bfaf2xe7wrb8mzxmvfvqxeyosd23tdk6iixz3q2k938da4q6p84bz5u8cdr6m4v6i098z63zgl2daqqhupkvjevtifebltgw1hi4vvjdeauwsq7sw726o5fjtggyeh60lf27irq5zaj6uc88zkby0r6df481c33v845fjctfljmpg8rji5hio1dya6ia78jiiyt0ssqwmglfhr3mwcl4is7lc425flj5w35l0ynm8p3z4e1hqc4onzbvrxvxjv3gjymerks1voaybez5ushk4cndrpzoc3mi0qoq7ltfcx4i4vpaqaej4',
                fileSchema: 'whyxqdj8oubt8y4ngsf2l3xh1fqx1mwyefka6bljsamlye9szvz48hbexzccmosz943lpieqdottuvhqqpgjtpbjqtqbt5ui8nl8twgsbp7fv28s5u0tdkowhiqvc6w52p9gx4g0qljl1xqa5c30fw9aj0k2fd3bdn04y76hgw6ri4ljjepa6kpoqvpdq6u5d9ocxbbu5hz57ww1bzbyk5oz3hazy6sgw44nly59p5ufef0eoed33as5rhxxhh3ranl5peko8hg66jndwr9svt1euozmhddro2ub7jtm3uij4gu6bjktnkna95h77ln7m0nd02qrf9d0hxrn289e43wsfalvt1mrituia6pq9v2uvycj8c5ept8p6vgi8m1fe3ptxngkxops019hua8oz1x2j07oqv8vhrbsujmqy9j6na7qjf65g1ag87ph2tav82o53ckio8dura77u0mgslck707k3i1f0qeau8ldlcbrbkl20kcvyscpjclccj2jwewiweeuc0sc2htztf8zfzyprquizb2wdu26wz4pm7513a4zqr8suyy3qas9u26b7psxvnqm78ai3cx12yd9kifekukuo5n1kjjumyhw24vc483jcmm8i2htvdp0mrp84uv89fy8wc6wisrspw82k594xowfa2iwp4tnu8jbxs8m1ni7zr7y9t3nw5dp8brhbdnv1md5f0fa3rvrgolphnqdvtw0bxwjnpqsgqka8no8dcr9iwq3idpirmyoid8n029k7rw204mu4ugywwknfkk78juk1k4tsi4wyq9fks67rj3eafipentd7js10sz45zkwpp0106250oruvnepcvbi2f2sgt0rf1mhknayg0rmjy4mm4a7iogj729xfg6rmihfupbqrr6c752e23bj3b9dvy3ub0z57j5kgz5au3cm226k8mo5m5r850q7kok710nfx710t922pqepfsgb9n7wsq0fldgwmimx162w9jmp2gnc9goosu3wo7un4nn2',
                proxyHost: 'hh3uz1ibzyw7oylayrum5mz55oo4ail0l7wlz0ueygaxe0dskewh5iknn28b',
                proxyPort: 3165377191,
                destination: 't7y75m6ooa9r18a40ueq8h5m0sy0fpzw37qk5qq1ly3gk1jex0li0is77nn13oqafpjyupy20v0zkyoymlxc011wcbi1uokwh7vx8se83ym953yctlozxk1w71s9rrzo2t5cseb4or7lpodeycjrapwlb7crne96',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '466ogk6gkst90bw23b8egppxwyz5gr4wliemg1coeccu2vulgv05qz3dmehxyenuz9eukbs7cof06nyw6wdznw57ipud1bloqp3zpn28lj64vseg2rlulu23nno0mkxhx34pzczcjzahoab15gpgxgn2goq1t9yh',
                responsibleUserAccountName: 'x9mhibrn91tkdddq9qbd',
                lastChangeUserAccount: 'puphwizsbw95jhzjnkum',
                lastChangedAt: '2020-07-24 12:40:31',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '8qrlme5wibh7b3gu39g08wx02ng675bkvref2yik30sy6mx9we',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'jmliplcnn7ibvr2yoqzp7lznzshctl3dymn2zip1qu4uo6nefnhv1lzt17w6ijvevnslfeadf44w58mtwy8fk8o29qtq5wopri49m3z09w9q5tkc47phm8fjpv78njeti9f2fjbi5rrddhd2e0lt4wnnzqyroidv',
                component: 'zwcltqviikm5jpe3e4g8rgh7m1umy7fmrxyil5ugwqsmhf1gbs9cr13bkw3aaqspzokt8ebz4pptwqj1yy9dsm65p18jr50n0dqpxf46g96tcy4tuiq1afyiamhmzwd2se60btonpk7epgw45wy20mzp2qez6fe3',
                name: 'yi3n3y34ve65ddn17mx8yegwgsxr3bjv0yasvpuhfvbmc72b7uq6le2hubk4k0nkbathsl285dxr2yy88ycb5q2eek0i72bidhpge81kqmyfrv7tlcvk7sqhzyplegx7h8ynpf7tni6xws3x2nhs6ei0ccu3zs07',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'moier4irweowiwzor8lgk0crj84z940ffm90g5sl3t3274gwrw8ndyfkbtsqpzwiz0ehkxhfh681yuyyb84nlusaiox0i3j459xpns2aw9ep8st2r3v7u9qihxh3vzwlzvklhx12u7vz9x2n71kc9owkag5g721b',
                flowComponent: 'jp7b69iu8t1wxxria1p0d3fmdus420okm7ryj8tz94jefmri2y991suq4uxhhgmahthr814k37pyhl7sy65gaf5vqs9wczbhy52izy8xjk3daja7b7zps73ppib1y02m9hq2ciuatluxcofybcdjx08k5lftk4sj',
                flowInterfaceName: 'tp0iyh8qwaqk63rbi7p7xk60ze1ohjsbj3f62gxv7a3pyw75yrhpa1e9h0bnjfodn43dg0rnb6v2z3uvq6uwtndwlkah7ojhylkd2ftp5qk5fd4i4qgmgc8994j4f0thuqj6yuafn69pt9u1fvxcup3a6yg49l19',
                flowInterfaceNamespace: 'syipv8j88gpe86odlcbuu04povbx885cnalg8kd1dr01lixfmoxv6ns7ieme4iitbpkfkwyj6e7ti391ihm3trjh58a1a75lvoeg1f0ew006pr2heggh2cjpfu7mnmnu99fldyyus52hm6hhs2sf8obs3611nsc5',
                adapterType: 'ossbfuwz9obthdj3td79dn8b7iqi1vlam0ofztf74pem5jqb9w5llt3hqal7',
                direction: 'SENDER',
                transportProtocol: 's1bl5er7tfjrtw9tal5itxqs31vq40z8f5xdi39xr2ci84tcsla8lxzotfq5',
                messageProtocol: 'mntovx8vfcybgh5ngazd0gcwjeq85uztdzwkttec06z02tufwkn5xvjjrh17',
                adapterEngineName: '13dzs05genw4hfjamkaxoonbckj8xcouhs7j49k00umge1igm1j10ov5qp4ur4qt93s31a4iod0mv5fxop2wh7o6kkizuys6ct58buh8ijmzgyl38iomli24hf9l0e5sousv66zxgxh7jlsr4o5fjwdm1jue12q24',
                url: 'b3xzsaycr4n7z49vb6ntmsecqf5atuo3stz0pzu8wtd0ekpn1nljxwzjzp371lir0cr2jln0lodsstdb1fo8xg3yhwrvpd3ofvj6id7xjjj67ep8l52ucav1q908kk8659pini22il2s481xl80nylrkbb2v8u7v24lrjksn1vt3zfsaweg1es1uvw0tl44l4bbw2g7h58gpa5n5a6azdobbctf5ooods0hodkeu3jusjq7hlt0e6aj09xyzz47pacy30p3ehlcywk0lr78vzndn5c9i4acdaxztyrw40e7kdlckbcw6lmme1dskzu4a',
                username: 'rpxkxr6b0gw3ok87youz6tz2nyf2imtpxfbbq57qqkqavh571oaffx67c4zo',
                remoteHost: '38a3938fwiegmscf5stueouzoxeq39bmht4drq2124wclojf1yc548hxzr0lrjjk5h9o5yo25kz34p2rop6r2zxpratwav8g098tnwbt9quuheyle85pyyxc4rfr6r5p4lxrvkq02j7trz90vv5s5ck5r1exqmth',
                remotePort: 9633433455,
                directory: 'zrd5atsixpmb8qt7f79cp6qdblacsn9vlkpf8oi2f253oge351wisiz09umn1rwcbhzoaai7xbzc4ucslaml9ifdcvawy8z5oywzzlfkww1yz4xlcwy0hkqmo9ehdzvyihjoui0jm3inard66m7vi4kkmt2eokcoi3fbp4ryzxk8te7618j8mze3fb48lrpo3f546hzq2qbh4zinfmbvinjp3xrzl7uwf79magehlkwnbrwczxsccid83fdxdgxqo4fkrin2w17y2psicj2167mz4mxcgbzgcput515nwwwmp9wzzd41xmnbkbluk4747o8ciz10zwapzgfhb61rrq0b4y7k0f6t3ral59s8o2yxwro8mjtjpm1vqj1h9j3j4agqcumtdv0485gle8wn8ja4vyx0eqk0aupu22x2hp00fc1fc4wfgyckilm9f9yrm0roju9gfsztdf2d3dxw9r2xqwmvnxj7fyvwis2n0p9mu28a9zeo9gbvjt8fep46pn9xk6uupyw3o77wzfmxko4v92unp46bb1gk78vhkoeo1b8iz5bs8738mjx7k2aulipysb3kgoiaenepbcu2vjk1u769fsh0ozkplz5gvkluno7uo3zo5vru62ci9sf9xfv9hzvxs051c8slzleaf4fwhydln30uhrr6bexgqv85biwd7p5j7eoymdct9axrbh53mijfwfty15038aes7rpye6ec1clvokodlr5iopptbxfz73hdlyeu1seoa6b7q7sxj6fw005ktmzjr62cr0csfhmsicq8lew9wyo9v2pmcf4obf4fnlchn1zorfncp3b85ctnouuwti3exgbcw8sbp2j1vma5171ky2enxjwfdxrafynmugigitgeo87xn2fi0x8s8wg0klxp7r2a2493kgba2lzz5eowyps5vjzlpif9kodidjyxtmebzyk3z4zjpk7q4nbx35d7f89ropiuarx1ymoxug6p960fajz6ujaal3udksqq6rm3hirx',
                fileSchema: 'jjhztkny3cvkz0xecdxf9enhg745gfgiavtzklr2l0zycqo1l4fhmxojr30luptxcu9harybn98fagwimww1h3msj7ntlnwtc97pht79pwnvftt83d8xw4xpmkpb95fbn68ap3w6a8oguzalag9l1kvv3svw7x409ql6i462yx3hdrf9ti9xgew3xseoqscu1ipkyv543yvvv7jxwm4r61kwqxas5vvjlf3kp40zjge6b1g8g8z1a3q4lo19nd8tdky3e2cw0bdrid174mgbfe2s8pkg6ksgfbzavtvxyxil275ezljx5jrahjro56872b6k90vr6qb8e1bl6l85048rviqm3t40zoax0ylqf0uqz7hlp1ru2synm2c47634iqgd339lme18zyisz6192c2v14sjouhdkfezzkeofao8brxc1xevtbzo5hxvw29ftt4oeviu7vb3ohili41lr1le46in7bdkkqxvixr7uuytb10exqwwdjrukhmlpoj9rok9ay5udn94tvpf9qynob704zgwcq1ar6dr0c9j3rarm1w5qyyrnvo1lqxq7uwl2brw897jnpqsogc1fwr2286zcemm0rli76bxax33antawi6gmtp42dfdcmbhgipzdp9wpvq1fczlxpd9a4e2vn2jw8ssnbmindvh0f1zhlulcisne5hkqt4bnuuiu46cvnvsdaya0wejxkxvc00gqtrmd4qgq3ag1h3pp2hlzjt389nvf3sun3dtwmaf0b7xx1cck3u23pb9vq9jqc6xx8vy5bbna85v6olymtq5yy0ufumltm1w44l7oqgti2xwsn7j6er8cstm0jxy4e17z4wk087ll802h4hd5v3jt7kpphluxiouwc5bsbkcxt4etkpcoe87lmd9x6erlmsuos5tifgtvedjpjudfsc2r424uu04uhk8x2txs75cu8levbcecffu5m8l85fjouuktjlwr490mtftnezn1ge36m0i4m7b6new7sk5qr5wfgps',
                proxyHost: 'ca5n2va1fh26l5t2e3nf3w72gv3544brmb26l4t4jwy0ych7o3zd03ogfy12',
                proxyPort: 5918449982,
                destination: 'l4adogkmx76byo5nwqsk953y08z5rg404urzdal70xcrrr8gbkgvyfa0wqbat6u371quowi8g4wlgovidfprembl8n7dj3sz6mjgs3q2302ikhwxxn150bv2hizsehahno81kn7xe5wqqyryucoa9cjwcztyry17',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4hsloyqssfbn73iiuben1xzqsv0x45ispyxq6lb7yxyylsyfm4azt91oyux8n9zrksnt15i3u2wsq5cu86t7nvxo8y3xuhg8l3az5601626rkucdh32otpo9s22lrot6bi8919z9kxaqss8drpzgmuxuw1itz5h7',
                responsibleUserAccountName: '0ekupm1qwzin9ybyj1r0',
                lastChangeUserAccount: 'nowye9v32j7k8g2fyf7a',
                lastChangedAt: '2020-07-24 02:24:25',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '5fdfk6aq6gribfqjsf4d65i2cp62xno3nj7neuks7lgwrgx154',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'p8qhu7asqv56m4yc7d6ldjtcd2yr97skf2sse8bg0b4f8tx3a71ojt5k78l06oqk2c4q0p0tzxzyyn63lna74mf5d1kxhw5dcvb6ie5c9vipnn3jtzrg5zgpmd5teola3q7c77lrr2vlqwuizp4gxrioqrmh0bfj',
                component: 'wspcyven83nolro8k0lwiy7h50vccw5mil95m6hp1j6568simlwaw7o47itkmiizl33ipc1t1kqh6c36nrr3g8pocfyr6ueivjsxogju35rixhwbjwfqmmt7wwxk9laha71pprtp3wctiu0vgyapq6o2f4hz11h9',
                name: '2delmwe2vl97eg6y6a9vc43b5bkrgciuzkvnqui6o7g09s7vx7cueasf4suw2td7a9j1u94vm905tm2m1hetosiywb2itcqvg6wnlmp77ftuylftg55a0xznxw64zk4qidyunrfj4pt8zgufimhe7lj16cm9u8ly',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'l800igfeauducygsr6ltf2hrem6b98tg2hkfbvjou6afokv7o706r77narbmukr6jld1nu8mmd94y6o55r386fczu51ouj8td8d87bc2ogzqle8z0yhtlqlbnoylmfxldi0q2aregm9k9eqsfukzgm05nc5npq24',
                flowComponent: 'uxv173gnxe93b9r9v6ykr2esn4k5ih7aqiv7odatpxwvt1cc8pfn1v80aq014a5zlqenhqr1ansey6coazozurrqyqjv03ftd7j7acvqpzbfa0ukqmg79qnxnitd01sitkhir9y6pajw8jqg8x4vkqejfubm3ntl',
                flowInterfaceName: 'ibg7mgh13pvktsxy8xhdremd7xzgo1xdfb2j6o6fa8ww91eaps6ywtex91rcsm7eh3amsml30qybseugbjx82lb5rnzlgy0eu08tkroyi4rt4i4bnx2e72jersd19pf00y0ajxqff82wy7jr62ivpk87pgbeekni',
                flowInterfaceNamespace: '88g775hqhl6wyhenoqkc6qz16nmojwd3u5ey9wyvsrh2gvknsaq3z4qxm17ta56ii5v5dknwhnmgf0utjwvclmuiyx94l6opwiuua7lu2663dhz3x3zi6yesf6zmt9utokqxb5fziqrv9t54mkle4qrihapozvo8',
                adapterType: '4rzdm9z49lawzooibqjbgqkfplnhkibtqdlwmbxt3y1y4r29tlmg7asc4n5u',
                direction: 'SENDER',
                transportProtocol: 'uaetrlzkx3pdbp4n5r5zfzfjge9op7xqh44vkw29nsqvzct3x0686y4l8sz3',
                messageProtocol: 'j01031nbp0jwfpoxioxeqjtz1w6xo2r628utp5cz9f3rcizld9w5and9h38i',
                adapterEngineName: '6n1hyes314buutvlsxao1mzy0xu7r7h3v6087x2rfrzmckkspqawkadzd5cb8qalmco3frhu4n8qemvnmbjigvjmqmf2czv8bov2gbhjn1d32bkwtuvz4krjtzhsxqt6hj80nksv7i9uwruc24s9dnqx8ut9gyj5',
                url: 'kzp95u0x4b4536lxyu086lx34fs11mq1dyzq0wat742xinisj48w0e8tbtyrdmoe7yeqzr2lkk5fbu1c25jkmgayjehx1p1viun17q8vqchxj2416lvow37tpoar5bvfexj6y6uxlxuy7lsszbm3jf1usuu3pm9y7ozfoxd96tndpnq88c0qup5zyhh14klvltap4awxt2ak0ufwiiduhv43m80lbtm0kxkixnpjc0fmcpqo3hjt3g0vuj291r9lbb0q98dlkixib7p5aiq4iyhs14i8ufqddyfuyibuw4vr08xqjxnuxuwbfrctx6u29',
                username: 'gu38bo70xal72mu47zqfc2amdzbt5kt4mswk16h450uq5m05cm7g1zicro7b',
                remoteHost: 'miaa34xlgd99ur413mjxcjhudx3ku0j70bndqy9nm0qhwmjyntv3be1qo1dxfmvkn1eel99yx1d1kp3xabjwsmk35hhvfy9niluxij4fwdyasqsve60y7c4jko06cm2xbmypc5jh53ywmwuflpaj5dnrjn608f8z',
                remotePort: 2104600499,
                directory: '45n4veazvgdvr1h145nhkiswtimmpvfgiza1vv9kbrcfsj1w35rev1a5botcpp93kugc5g19dzrzbeagj699d84antiujy1x2vjtm2639nhiqxwjnalvdpkhj2g9k20t28cw58milc21gcko2do2sk8f4lm85cwj0d3stsu6r7yx4z8ymxf7b3fx44xkg69qq93p3tk91u4kln5zu6sufpiwz3y93xe3ztwhrroxqzko9zyw0zthy46sig6cbmx2i5gc2u7wii82pihi8c8fd0seu70xb0itpwyd23dje3bfco0xif2sq7xgbi5gck9mpimh60219nsubdoz9rznhm5ods72qrpuf7vasvqbrzeo5zaxy7vjkynzf1fob12k2mvb02cikbm9hygvx0ny3fp31pw43g4x0l0igmvvb087zkqwyk2etgfxk50cdbleg7usjy8yeudifip64atei215mewiutp4t36alznqdo1ukhj04bipegypu4ifhltvvkjaq4jhfdkpxezpszzcwknf6ri766zl688ln2s2f9w7vihelv9iojqygvvbnyiswjb9ebrw0kr9c2n91vsmjfleo7vgfjiutoyr22l64h262wur2c4ejq54kekm898dxkvkxdaqhic3fezpjm40u3bfsw58fh5ek028omi2zqgvsgbzvbwki3znbi2a4eftznnvbho2dvurwo3dpwceetjtpj3610ddft1dfunm1f2u3ucqfasmklsjexu34g6n6usobvnhoctymqgimeu3ih4xldnk6qzt6i3sl3j7ko0fjfep8j8fxfmphp9xp2szquj2i7cgy4diovn8kqdxnksog2ky6edizfmjd3r4mkrtat8f43sw7kp7ny0i24lzeaghbk5vu15vvzrnr1gua6wuctb07nxgtx46u526j33v4xza24t0ol19gf5ercp81m8997knlu7ud9ufifas7cl6h540oe9sfzwb0zcixuhn1nj61eynp50pish9pj72',
                fileSchema: 'juqdiqn12ws7c0pf15hxiqrche90ta9i1fvvalb7jk5kw1s6iy9zj2yqe6aadmnjaaptl7fddoni5qzj55c4en1rsu6s0p9s6tlr35dghs3emwaqkb28p128pf1pbbbquqb9c51m8j3evu6v4xf0k513dq6yut9f7t04pnpcyiec946gxy1c51d7b5y6i1f0v9r5g3bfqyjie0r4tpjp9nob21vdsm3gl4xsnodvg8kfg27y3tyspo5ap54r6qav1h36gulejoij9kv9tl8vd0qay2k31s17zu8iajuvnz6vf89xwwvkmp5wyk60c4corzcr80y3u4c80c5wpqvb41bgvpzgy05hh6jkfsm5wt02q2dsd9yw6i5nrakspshart6kw1plzehlgpsd1l9q5bbjow5ufhg0yfh1rj9bym4a0997te40jc19m1gtin3w7zhv2se5ofh51nu78nbr1zdgxlqgyt9ervn9yw38y9xw9sfd8uevb7x4veyfmuhbatja0s5wydvq5fghxav7jyasfoo4325jipu0vf7golgh89h6w994816msmvfn5vs8jozscwh5btk466te0k1yn378pzuw6ean0wmr4c34xq7tw4aah4nzth32igpz5unocxlfyjhw4pf2767hpseg6guuymvhco624gxpknqsj47zi0uscztbfwckp1ohs08do015sl1cwkrdja50pm3e9khuhx21mrrxhclyengak106p0zl7fwttztv9etmfyfaw1brtktq0kigob4objmddu1ldv7zsdu6devyhzy3lqh7i51fnjbpmi0xb0k90c06k7lvoli34l8d4rna56tmt18ll9jkom89met1wha83n592t8zg4z84lip20zq3oj876gkr6lipuj5htiiais3rynumx7s4yhdhvwrocxuhssko7rn3hr4l4tax4fbv6yct862qbnymyx5tuo437shdpjggfp2a4apmt1bpwi3mei250cepc2qctfe2exty5g',
                proxyHost: 'h614yfdn8ny468yfh6br9febphzty3g5gyc77z379u80r54x301s0dtkq0qx',
                proxyPort: 4067528879,
                destination: 'djdtosif5q0s66ig5eo4kwua2ypqf3n34h5pcmpbjde9ahf1i8hrm7kjgvv8snzn99cpt2ny2jxudkvo3lr951jfstulib115uvbn6jt7zzs1fl6q5j9t93zjj62gw38mymtechwipia1senrzwqwayuayuqvavb',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'r6lcn1f6khafe5lus69ctkjghbkldmcb7chu2y9iwyaaxdjzz8nhfnmxwt9tvmyf2kab51x0o7xqet5nvidhcgo21kf7gc1nzqttuycun5mveverzofjx6ei3lnro0wxk2rivy41x50nmxc7oea0d4zpe8rja1rz',
                responsibleUserAccountName: 'mvsiwh73v7dk3antghss',
                lastChangeUserAccount: '3ny8lp8mxigvxpgp1eji',
                lastChangedAt: '2020-07-24 06:57:20',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'mrjd3306vfuiryi0zv9cm068mug1bybigxzbqm1wd49pnm7gbb',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'ys8ofo9ljdrxmb2a1fl7x0t3t5xrbf4j7c49np3u1o7qhx4tpdz85upitywzhp2qv12z9jl5wpycv64n091jcfx0ktg2rjrh9g73ut7ysqd8w7bgplmtx0fn3btzl3ykkj840wuaxp7a15jbzfujdclkconbyst2',
                component: '3p71vfn99eoelap6zqu1ws0t27ivr6nw4ucshyh3pm33g7c9pzrdh6c5yvogzcjmjzf3k0cr3sha0n0oy3it9hojsp0hosaa7sm4yv5l5v0t2ctod233v874fcobfgfs2qdaq9lbepvc8dd16xu1mpvfp82p30y2',
                name: 'a62dhtjhn9j8g537vnm4nnhqsvye356jqdru0a9811zo7malknp96yy12dpsy5codpwssy3mkbye4i8zi94wk84je1zypeua4n14kjs8kz0e4olupfsvmh9wbwzlno3h0anw1qncwbtuox1fzruoeqj7key95sjj',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'o3iwkp0vmxftfnqk0480is6ys9vswtjds8mi2m9zjf9d7mszum6yf8w30ed7xbf3p3f0mjdyvfo30ajy53zl6wy8l7o9fvokwl6a9c4bixxsry1p7ge5ss7coaruuqcfy6wc05g5haax53xqnrwolf8juuzovxr8',
                flowComponent: '3liwn8fmbp9yqypxbx1izxgcemzzfik224og0eub6ybccoyek5olveswtoqfchs5rvvbrgojfio1sj1rx62s5bt95r4g85yyoc6gdbuatesp70v4m7l3mp144annsut0hqjpu11u0ezec31f5hygnel09ro9jmtb',
                flowInterfaceName: 'v4r0omq6akcc45xt51h0opgl8g34cddcz24mf53upof1aanzwwggy9se8ukbykx4rtko697h1p9sstwv061r8gaxz5jyngctae3x699fkwczjq5enl5mq0qxtrugaldekju9o1zqtb8a7k6joac3n70ma4jmoo6f',
                flowInterfaceNamespace: 'sajtbrpmwqn3tasuxzeueqq2xvl3sx0qepx2epl2oj5nc5bsxdh65j5sdfchwvcv8tnjqjj2874t6n87hw585tyzvj67tu7guxlc0s75n06rhbmaav7l4sygre4gad6g796cwgfljvjo1o6e3nd552hmuxrbh2a2',
                adapterType: 'rohprfvbmlkfz0ifxyooty4al30o2hmp7jn6mefgakvv7xnqxs5zxccv0ygm',
                direction: 'SENDER',
                transportProtocol: 'ktndgdna9cyrfg4sab08147ky45hdbeaj7mmoxg5z0isfca913839z6gy2wv',
                messageProtocol: 'iwg2zjmzqvbnapqrnpq4tqkjj3oqk6chd6hokpuqiw75x8ikukcdvwb6n29x',
                adapterEngineName: '1x228eiiktcw1gqlxst7kdhnodjve8pwltjsjtrngai9cfbuiyzrlz4e62g6ybiy7lz0ba8hkakxetio1p592u975apc25c5rsjt60p5ptpr4ckpfx76nrp41jnbxh78bc6vvm62zuiwidz0n3ne9bv5sq3r274y',
                url: '634uprxc6oklqh3642g9yores5azxhwrfpu1q4pxrdvckxvmrrhxe0rz72eo5km0hcx5j1v6b8054jqttghzyaqrlnwin4wn6adtdln47h2rk5ahlh8qs5gpb4p594tjubms93z63i4ro0whvgdsexwnujdp69r26ao3ovcakwg2ktccanjp7rv9z0u2o3ksgp0p9n0yzaqjwgmpbxp6ukgj6ekik6h45xjbt53ez42gysn4zkre4zi2syt5ypkgrjc89v7s6ssne38ts7pcsdqhzldhynbu4xkd368n88032x443lal8i7domzru5qt',
                username: 'uufgydoliae623xb3cj9flmhsewr7vizrxpzopu6o2ywvpunk252kbvmkhvfy',
                remoteHost: 'arydhlge7pazjrdp67ungg4jotq56pfrv01wn4hlnidwg75x9dej49qvuw3vumapgn4fc9ka5g8p70ojcjhy5b518byzb02h2p1ebdtur750dvxsfmaomgfacdglbvuk7bxnjkjf0qk3g77dlmpz988f15ruwpae',
                remotePort: 8899602132,
                directory: 'wiwf3qqnmabvdr27exyzxzii0i7pwrat7scboti4j06hc6s4erwdw00ptz7lnjhu6ks9ol92gp9te7tiyrqosiv0rapnm6x9rvlhsciu22mw1hy7e7wrobquwqnd3gxxqwp0fr0qonmdafvd41p69963f1h3ny7mwb5cksxkit3yx1h0yp4aqe3umqm3bseoeclcf9m4yzr6raj9zlmap4tr79t5fhow7ge6x1n6i61jcuthbhcbojr5ay5oc5s0v7bagayhzgietiegcwx4fhwc43j2wrjqr78lctw7ofynyktkxcxy1fnbr0qjmpikcs28ux2hmr1qe0l8wors8ff2bn62uy56uubidn3legngg20z3kxza1g7lfiz6cuikscjqmczh247o5yaxltu6tk0czd92fa4xfrnf7q8uhow6agltm6ctfo7j4emzjk977r59zo0201j3w0i40olb4wks4bcxgdms0hpo3cyck40ey93mpr4w07t2huxdsstg8mwqihwawpr4puxtm8tyzpik00khtb3mhxs9lgwlncnxf7du1bff90xsoh3qr8zl205nd2urfofru3kq1m3rmrho584mldujcqhq0tpx1gusi6gqfgm275cfh57rr853qswx7uivs3bgfzz2armwu5ws5ztg3nkyqp8poal5bvqzjizgdgglx5oe8gim92i6ce3dydc0x51aox1274j7yev18rkq106njstnbnukr5dtkzyvys0y2ilj1stac0trjbq4tw4cegyv9lfngy7tmoj3xooauddi9r7882d99npwphn0sr5c9ddsmceh5jzmvh8s3nl65w7spw57tllbls54kb5d9yzrcq6uphog4e5tra1tptx3nju8quruk90kxu5wx5ohu5a03egun41dnu6z6lde8fkyx6ajl1prlirn7lbykmbvcrcmxejziz7nvpzwpfyvajob7gacdeg522z3wmjq10ktq3yb79abft61o1d7ft5hoi4njfnnd2g',
                fileSchema: '1v1yrcy8fnnkh25e7q87vetmwwjztis76m2m01hnr5rkhh6xwww066vd2xg84ydg54jgefo6d632zwcyav6hf7dsezmsu2eg79y5t61ev485bdyxrk3z39ao8yx0fjaug50xk377r26340hfhvj0xee67ko72idzwxhlnq2qmnbblpy4atk6xawtxco52frbyz3g8f1ym4bdfzbo8pzrm668xfbqxpgn6wip9z6vt24n7ot7ywvoehxhd3x93if00xo0zmc7p14y0ppui20abe2sbwiolvkblx4e55irrhbywbrfpn4blmk16mfr17viz1siipfos2fwq4isfinae5sim5a27e000opkdced3oxafxhv1jreca77f6ewt6605wriqczsrxmn9uszgj9xagizmsq8jn9tpn5oswjsxr52jvai19kx4xgpzi4zuxanp22tx2c2hf4gdyu6ru5p9e2aqnp4ulinz5qvx5mpe99r2affmq7piqr02h3smmq29n80bxpyzji9rcdm6k4iuk9301k07tsqklbho4t296scp5wk7tp7ac9ti5i70yg4kxsvtpxm6acmq66vcq5qn90ruct0j3ysbjsl6sh0xa6o8y35cpg0rvasq150x53ipl3g3ku6655x76meujn2u5spuykz4s7sj4zlebas3usb50ags8y9wjyzpwgvlz39jlo1xws6zzswfyv57iurdmzugk3ysp1jpdk560m5s7po00pik7wzo50o3uynb2tq12dvmecujxjfi11d8p4oe41sdz59f0uoly6obuefjimimzq53y59zufztrsa5l18vs7jbwwdmij99xxmw0nkxwzxm2am5hhgyq5cir48qg3vb4z68p87cr97vs72bvf3ukukxfpz7dnufdpepxrvyoznp0dqubh9v9axk05z81vi47vejz3sw1f8fz6h1smqvfb58sagb4vwja8uahh2z2rd12qgqk2da7q70h0mvjt8ua1rzt8bvqs659u9lahs',
                proxyHost: '3f87f1yemndod5vrm6kf75ddbr5f81h18fcy4d24tptl02z9aunu9pkcmnut',
                proxyPort: 5127054839,
                destination: 'i5cnzzvl86uv3pj916ywdmh3lgljmzzebirlrxvzmuwmh5sbg6n26d6imt1cbbjz3tgm52cxci7ex8jbd3jqoijtcerrmnl6d38emud3a0vatespyos717c1f42ezfuxkt56m8dpc8guvmtxgy7mfzyopzpzwmwa',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'grcbl80rb6aseuyfkvbauswsjbmenvkzyqf1fmqotobo986u76qmcgtbso23z7xj9b1nt184ucbnxyct2xoxym8n8bolstdnuxmlowksl0janvx27af6mo0g2hx46golfim7rspcuprsazefthesxx3km726xp6l',
                responsibleUserAccountName: 'b4a3iw17a1wgs8e5opxk',
                lastChangeUserAccount: '2q6t0er8ht0ft8lpe0xo',
                lastChangedAt: '2020-07-24 11:46:16',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'm8e4wbo27w84aqil8h1jhwgc1g6sfd6h66l0mvq9tk9wu9htzp',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: '8kdx5y095kbqkxqpj21a4yjhanfqkveliae1fqkwz2g5hb93q24qtakoy07kdbooj21x7xkaci6f7roy6hhgn2o5l8q7do5x7u1ubp2j8ezi4hbszqjpu2axcldwlg7mis5jkchitofnb6kf0k152mmj6x5qt4zw',
                component: 'nn6qzx9ui2lxkz0eozyac9vzhuuzrl5vcpwceoky8oflsxf66p8spiw7ehcbcrimzu14feqbtwow9vczqjpajkts7i7f70tm6vhsqqhu19t5kunz479do9mtft1k2i17f16lmw54a29h0bydz2xoafexe8vkt9ez',
                name: 'qr1y960x4yirwi35f2i9w6ayazuif3daq13mdal98xt8ph79ecu5z2fet9h124q8abks634aib1bo1qbo06311bsna64amxuf85t3hlj9b8xip52jn36fmsi2rg20hqo6ipzsdlodrsblgcbws6dazsidgi0umvm',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'ohy074kaxx06u89hd2p27djlb2eyrp6yftlz37df69si4uytupss98h250cu5aksoctfsvq27nmjhh7vkk5jpaxr0yaxoyof1vlyrfoukszl9e0ynr92cjuq3jdipo0718p1fkn6k9awsb01g551uqk5vpin47w1',
                flowComponent: 'wo6ylf2yx10axfegfvm8owehbayabts8bvgsqh8v53crfacs4jvp25kg6fx9lzpnb794zc1kwm52hfcghembvp4r8wo2sveays75h5eiyvapj1eoc8tj9ol788uwdikjhmfbz1ctqjamxs7m7q4ks89qt26xil99',
                flowInterfaceName: 'd9o3qk678q28cgdok7km5tk074ey1b0i0wbk9si7glf2jamooa5hq3rbo4ynd8x6dv4gcmp8wojykc3nrcjehc4kfe7gdq0znmek8d497kjufbhgviyaboq3hxgo7ktvbrdq7w71zkwlj3j4fcbws6rmqqfifqju',
                flowInterfaceNamespace: '6nct35e5t99nnhu7qo2d4msapeqts2w9ffnkh1f34d8t8gz2t9y23oek3blg5owjam3s074064z447sh3t3bgb66coab4nd0zfsl3f6cogzzysljry664fizy97jrsn1f3sw15owswbeeztzuhppmuop310zz4c2',
                adapterType: 'ajxrz6ws3sckyolq05gjh1qyl0jhfwidp22e3i6bq9nse85xv005dezebtef',
                direction: 'SENDER',
                transportProtocol: 'vs66cyk5nfiooig1xq9bvq2f1qzzb3vlrkzxivh42vq0m1l77glzm51watff',
                messageProtocol: '5s8hp9pq81tdf8fchrway6iyi5h96mlxrjjswp5mxzye11w38phpoo589w8e',
                adapterEngineName: 'p8kxu655ubiq97me7r9rf2rbw4q9mbf8sfyxjdjobo9j5305hqx6dpm3rvpg9xrtpol0r8sovp03ncj0pzxjczzk8mnz2ryubqwyn36ujmal0jmo3yg0puaokmxpxml48eg6hrrae6wmfmzgy39h05kdxq7e2z92',
                url: 'fwla6xoyfn365rr79n4a0apxskbv2dqtsqti4h0s0k77tpetnab06oazdim2bb6i6ja6ac0yz4geqg4nrf2xa9bl297otmfpct4mru3qwpr5hq885xln2be3bxm6co96seh4kx1soja3cmv2hlv3ss201a6ge8r2l1vra2efpehkzi8ubwypzl6ai0ychhft4b5l9kkhy6t0ilo4y68futnuemqenrb4gqc1986sjc5xc1a5pr8eneade0g5ecd6prer56skugp6avh1aihz12v21iza7br7tzqv3i2lo0f2l7ljffso9mirnf4vspfp',
                username: 'zgs0nll7hvwv7a3lpzhrzt2fcye5h7k4xv9tqtolom8h23akm0hr9kdwrwd3',
                remoteHost: 'fo9utnl6r1q9xhz1kh614qkeuv0qr55vh6mzrc51hnuys0enom4h0ow6il2v00vzysz6rdq48jo0265ygdpfby84f3lqqd0e1o1zawvgxvwrgccmokinuniun6f9p16mpjkowgcvyzwgwq8olhory9ll8x76lynxs',
                remotePort: 8590156366,
                directory: '7e43kqfuo4tou8vec77vgjvtmepk4f2thj6ves8uuou1mv1is4c31s2vr86ltsd8jy3l0d9a7z5d8elrj5pc15nidrrpuw1eos5xq7oj33skghwt7qp5c2sx2dgc0l4xjfiyfp62opwcid9v8eq76zj82og7s5x88x740a60fd1smkzvtm85s2gjpxponrzc6q48sdfyk0rjvo5hcpywwgeaqd41jm7rlr3wvyhni5ecrbtekdw6t3ousnytjgxwnrfw83h11zmd5d9yyw1h16woyne7qb4pc0ud5phr2mzq15xhnkkthmf65iwk6p3629y1debnktw3r04qms15yaal7uyycu42u8h0wfs5nhx76gyyf32sr4656btvctjmw0k2tliyoxuseif81xxqxd8lqgi3a4gqmj0u0qqn6gp4c1k8wnxsamcx4qqch89kgy5075q9mglth67vks94k125dx6rrybbtukb0oot1gou1917nmeu03c4xvlf1dxq5ig9hf3zi5iem4bpptz0x8j275ht6eo59yydkcgoiottpjzsstqhwdleex9705afqv0uey33r0cwy2rnkte0xhm991p8nzugcennvxnz8sfowzzvbyichufzf0c36v031msxgr0sad9o3tixyiaxe796box31no5863io68f9cpmtqp4v44lq314tmjpzmzg1831mjojb4s3dmawsskvl6jurt4fab3ttb8fj62zfixlvsgshgfgrz9aly7kv00ehsy4oohfkaweyn03pf515g7vbhlungcolwhmrd0gsm3fb52h67h51nh6inkuq8kmc4rqc4v1gg0dmm2ug5gvqjv58bmwcobohf0x6758j6kht9zzdjer8rffo41ufu11h1ji8yaqg531g9iq0aqujea6z6ondd2zeufg621ewmc568oz1isxv06ro40u100emvvgo67ducp3bg2a842fiqwe3xoi7ioum3nl6eo19o082wacqcly87r6wy06wet0',
                fileSchema: '47271ra8ysv4km7mgxuy0jb1j0l3vnaa5w660v68feysxhkl1cuobuvy5lt86zmkpq3o08b1etom5vfz9e1yudtwp3g80ltr3ritw2sme7995t19np72bq6e37dje9nti1hwjphhz1la7uw0ppvs55h0op8lac8fpbefzfapkxdp9g9xmxiamemebcjipo2iwqbq9gkfdct4kyjk9cukjtu0257ff7k0zkvgk4r90bl5a3q720rkc5y9isb35o4fufeefg0bnfk0gpnqep2aq8runncyp1spvmbj6vgorhu7x6ghxpa4gd0zieuj7tp54slev2un9l3z4xqik1q07sh8i3seitikmqrdb5epu9kqn43rm6v1mysjng75b2gti2mj3mm28c6tpvoh0v2in26i2fayy8ansp6si5imm2dq0sv1aah135rdgp53m61new02ca08yq703353kc3godmqzwj7x3i1m7gac03uq9jibx8e6jf34dyooyfqecciutssf447o1g4hwxgn4hw0wos5dgvzibtuy2fda9pkle36lsmat4wg2qphhalxuuufbfpk5pid9eyn1lmn3bb3hol672p65jdhnk03jhhu2gbpi1yb54kjrso53e0icef4bfjxk90qopf5pj02eopp5o57vawntqmc3had7zazq9wtjonzqs93gvw1pi278sm0p0ypkr4y06seevei6y2qc8xrginax12j97ipn4zuccbxmdfz30c1qk9asbo571qyrtmr9m5mhjim2s7q1s33558fp419as9c8daumokv1t1kqq9g47moru3ncsctwj5yj3y1n1b90bjxi9glasln0wr8ci9uhbx4sb5lg3lz5rhbkwl6srfkz8f3oj4gnzl9yhwstosgph7y99d2ua5gj5zga0tk3yrrlys1l06hhqdn7fd9d1u20cfkbmitr7rhxt3b1ht8tn0xyao71cnytue9iyy2dipq6gonpy4au1vjdze0subjxyhsyioxj4i',
                proxyHost: 'u5154mq0g8hj06s7w0etk1q8rbbzrfsmuxjkdk8ssqlxgjwigbd5t6vcw62k',
                proxyPort: 3025040376,
                destination: '0kwq326mf9nufw7ex2dxkci0yafjh9563o05nvmf8ft6vazb2602c7o264a9s1wcdi1ymdi48i1dbd0vai1xd0nlzdqwo4q0vt3kdi4t9pdjvo2v3jwk3qfm6szjtf7fbnx6vjn8u7uzbuc471v0f9nsq5k092xv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yjyesipf40h8hh9zv9mg9ex6nifzpoe1ljafndswgxafefgx6bb2rwmlqggezeqr4pj8naof96wvsslp9mpjizxdn6n30wbl8jesxes5dxtc7ev1f3fq0c8dyxmg5vabyvt4c8w8z0r3p1ncpim7mx6wcltbhugj',
                responsibleUserAccountName: '6htpegbp42ds377qhhg9',
                lastChangeUserAccount: '2u3nh1dssyolredgwuga',
                lastChangedAt: '2020-07-24 17:09:38',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'ugybqr12w1g329jbk3q0vltbjy354t2dgov8dslvsbi5qkoxdh',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'z75vw1kjwcvcv8opnmyvy6nksm7334rbi0jk6r78g09e1d6a1oeh3ssxiv3nwawj8pairm6q8w9cxwebrr8uxq76bi8wl0j5f6kxzlwodv3pg3j59y7vz78ombwihtzxed1fi94zxc6xk7ri4u2h58cofxoj0axx',
                component: 'gd4qysro4xcvvxv2ehy5gqy7hr09ty1cwxvxiw1ie0h4tobruaq6eklsfz4df03j1o9ew555iws2s78aztvr4kde334tn3p2nqdgtzqkn0ftxop5lc0aojxv2a5xwtdv3eyyhizf7jxpgcpqsgbjm2g3qz3x42jm',
                name: 'sg2dqgk0b4g740xodb8zi5ut8jyxubaar9n89g1vr963zcm67m005uqo153g5ytv56g6pdu59xuxe6x87oe466u3uewjz53yruptbmueo30pur3481iczykcd4y33hs0ioql081dnb130y654sjqko3sl7rovlkq',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'l79rbrl9bbsouzskyudk7jlm7phqh45xech61dg4kfn98hf6ego1bd3o0tgknqm3matjyldoegwh68asny5mialb4pn9pg65wbx7o41wcm5zrclnak6von1nuz6y9bkylqe5sjbclq29l5jlh615xe6ag2k9eys2',
                flowComponent: 'ziaz1i92xco7xfi4nt9a5o5o3gswkge687zshoq9s5f15mskryvkvxhn4ntf03r2hfwcqm5hf2f6jqi6z6q1947sxvywqznpxam5b4x3xqufgx5704hkhu5zh2hna000e0fwxvvinhqr5foqvc2ae5jqdups0rqc',
                flowInterfaceName: '970nuunfe14a1tmvixqbv492m5c6te0dh15sxmsmo1apiqp38v27121ffm7m03w78di4wpuos51xesd9e7nufpnszia6twp6hr480hfa6hcxgu6de1eaxszom61wyskxkyronjt5c97pm430545o83mngtl7drls',
                flowInterfaceNamespace: '5izsftg8nbso3f8yph8z7ry0695d53eyr9ouhq088om94cx0fwj3plmjmt8ybq29ejgoetogezvprt266jcguy3dkzs6l99uby7aum8nw36bsgqcmb2akfd2d45ubncdg4u9vyabk7m721b0h188tkqgspc1i91k',
                adapterType: 'gpnpamc02cye4o1jgnh9tdw6t48krn4374fbvs8p5qff1h9oimzsld500wto',
                direction: 'SENDER',
                transportProtocol: 'x1jiz9kshxbb88ie593tymggjixb0lj69f5ca0n31tout3es4nur5bqmqh2a',
                messageProtocol: 'lkcyhftu1et25av9v4rab9lybqta5smcvgievxa146ql9413o1b3sgeo2ujo',
                adapterEngineName: 'j3oreukgs1ew9ehdxi3i1hk04415ap66nvfki5dc19o4nvuivxpmmaua0icwbgmzbetp1ft0zhu4agcyg0izp3hbt52ht1xir69m3t50qgmgy6rdx50tyu59ftcckzm7w6zw0shdbgh38apaeefr9a7fgucrhpu4',
                url: 'obmvu5nelfze60ogs32q4izukre47dwr4cekde98wengtcm876m1wgv2qzgwbpg94ksc4nhk5zecczoumd9x1ookl6czwxg1higuekozhjif3oms2rcegzzogdr89nxf2culdv0vne14btdltux5vqmhc85pyrrhs84m0xg13r23mbyyp9mi4x15dj0z3f7f8qt496oikt5mgw4m9kfpuh42kjxl974xwcymd7degoucx2qcb3pr2xyy582rfpq4rrvg31feqy6wro4htxp7o8shzyhtom3q3amclphehu49m6ht26wq0a3lyt2uqd8u',
                username: 'mvtwbp5f5rnukkmpgw8mnd2u20sicspywcjdvs6ps8omcs855610eys8p83n',
                remoteHost: 'vz32qjih5hnqvftfishg98kzkmldfsiyil65nsca9klmdqdn2j4cyad0xaepwwld685swbyr3ca8rcopcp9dmv9u3g45gi1wxgdh91fe7918h5777o0e1n7yf44nydut5bbf571n738wzblgg27zk25x4jhj573r',
                remotePort: 66837394903,
                directory: '4dbuyfymjswrgsek1sjhg0cfp9a3pfa8spr84x5dxfx04kn7ihrewmwfsaelqsei5l9wbee14qgt5fxiehrg41ol7jt13jq59xulcuqzueckibskfjdnsip5ek0nkt2m9xdwsiz5dnus2ozzeq4azkb46uvhga2gyndl9lm1q21m949818ay6yr8tojc2dp1bwr70lgnfyg39x8mf4tdlpmsckhfbhqty2invsqfoc1q88y7jwp0olmhil6nmnwzlr28lmqrnxrdwjoogw1ti53pcx36vbw8sk6g66gfzb63b1s6nrw40mv80uapdiuivwmxzs6dp8wp2g25brghodkrn68l7icqgpow8dz11p3oe5onkwlb0cgsuectguw5xp32584j5niognfavq7ld78s6dj4lv1p7bwchzgfuhggnrwnhfdp7b5korwjt9sj3ug61iieqi0bt8o34ailcpfkhwr3n1kspfi5ea5xncmfh8ipzxqtscskjvx57jjm0e3x4wl3krd9icjtn0cysgatmh7crpqu5lz1zbq4xn36nu7vxx0fsvtd19634vhtpeus941fefhtvj59l3kbsehcqiwi93p2say9cdj78oah0gjtutiu6hencjn9ds9pknpfj4waombx4hgoms1mdo3208ne87vi47g1j9qwq1q10urwnwahwubp1674thipjll7vzv5037q92k2lcn6uy5pnbfrmsd7sbuejbpsz195tvj0sgvjzgc8ecbwdhmx2inthyzd0dco7absiffpg8u4694vxbm5y9eioqllw098q7f98r816ui9m2z79brikj3nw8zcovd351s0z72hfrbx4iizply4q8vny0tv5ke24v88u3wuwsz7nu5m4gnq28cl2vys520pw3gebb0mhcrrrag1yi3vl8vmt5kp6prpfjn8llea33ogyoso0bim7tkptbemesh0my8ce114quj3tp4u4iu522vfft6gea0h9w6re3mbb1i28kqzm0lm',
                fileSchema: 'tazg62n7zoaaw5as5w1vpjr4wkcicqrfjph5yba7i8ezgaqy796xstj00t8p0g1doraemqzljldnbt14yymwh3am8jwcyf6jek0268unmn8a50s1slsv35t91om4k0ibtjv8r7e1jblrgmzejvv9icwod5oy7bsomcj9c543dxyqel4k1au02zlfrmsxe778io9s9ic2z6g47sh499ssg4262am2i3a0qlea8md6qqh93mmqqa3gr065a82jt4rghxs2eie056768xr8ecuhdmk7m4u33pa0lopm04prtm0qkb3ze625qmstzesqquhecyhnzjmwwljiecf95t2zqxfmonut1r63nvlnoy1sm9ju550z97ocj9qjfu3enxnk32fgzfluhuvi3jdbkpx4hi5ifk9fx8z7ozt7xzd7u17m3zbsxij6t4p06w189f0r1km4yxs4bltb657u15b77q8ej6a9l8866yypvjdn58hswhirqsb5xfy9k0kahtqerd85pbz3pk5lxw1n51ddcgiuzw13tehm5wgtobkbq2t0nlpkb8q5qkvycvhbme46x1yxinxh3cdkh2wdnzu6y9qhzmik1veoqdr1odof2ay4l12xepvoocyqt3de3b4f6o8rt22yrkbfng5n4qk2blwc72vjz4utqwf6jdn9110kivyk80470phmf6h6ah2b1hwp8qtcm8sqk1u4f1mz7fd140l56x0fbawh7hx1oprtcjbel5oz1v81z3upifodgfpuakguogetr7n20jik0vpll4aspo7zupr8gclztqx0115bshnh8tyz4nggtz43nmzv3aomv7tev06ducyo9epn6ge2pamqmut44czqbpa59qk3mipldzmatav5zqw4w1q2wiuz81t9ttysq6ia8a6c21ct312z2b76h2u97sdct8h8rxtzy6imy2bs6pka9v11dkhsn1cxoremnaskecamtd41i3ax4i2vm2fd7pwjlkarregaqr5zaj6i9mco',
                proxyHost: '4zgxzh3isrrqldo30q18h843fmxwz3lhg12ftv2d8jhmgt0vk2a8g5c4irf4',
                proxyPort: 1729226469,
                destination: 'zfwqr27grq707n6x1hazjlzkubp04x2wmy5ea2j4j4s9l1bo5fgx2p2iv2j2tm8e6pceati3dxe2j6q821wuox2o9fcv6ukad0o3sswchx3wwwrdnvz9ik0y2o86uve5c6vglqvixs14v7py4ffiwpykcjxo40u4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7sd7azwlowt3en3vfg41mjpynzlareilypwa91ihz09ijs004i2kymfvarus0dc65uph9ddye1owz0f0ayk55u2olklq4h4jyr9kp3xvowbm12co4j1lx3c9prk8eu1uxqv3hm970cnxou31iovmtil7q8s39zyz',
                responsibleUserAccountName: 'qyythbpyb2bbn5bna8b2',
                lastChangeUserAccount: 'i3o374lz0g9yzq972b2h',
                lastChangedAt: '2020-07-23 22:06:37',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'p3hinfcw0kqmo7hccoyd3xse7baqv0gr9lszwwoywqiq9q8ri6',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'i9kzd2dpg5xnruvxsp3i9mzla69t9dck85yesk51a758pcb08618xu2hmlqtyey8olx4dluie5i0yhkpr8qykzosjucvwamyxityizx3jbbt7a3ce460ba9pcvenhjys6x82upvai86padylyb9irj9n4159f284',
                component: 'dnbmo92fy6j02b3dczpzsqmxjzwd553bsloy1o34fp6nz87dl2s6hdzt2fki0cqvgfi9xr5oas4hohsdncaisjn800uqf5rzxap5je894x26rt6q44t6oim4twz085cesu41cnhtw52rmj1dlu0139qfwtkee5t1',
                name: 'p4fnuycuf2ujmeq3a8w1gllxzpaacoq6ao28sybbi5jloci5twjicvckys80zlg7hp8fwiegg7822qk7fm86eq9fm3ormw4o4xd2f4n40v0rq58mcp48mh364hmagq5m4mjwjzq8ax1tbgfr8z4h1bd8wo62vq67',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'etf9g6ydc48bweh9rw3nxdittd6yqeygqxi4l4ytcqmf5j20sdffz255knazt1p8ecf4rqysfs8sfzvopnenh4thfaeoajkuw6zgdc7uucj02l81jixx4yxpps5ejzbz26yanw5bkjvhbmc4ymuh1sng4ss3gqlb',
                flowComponent: 'swqsohvaxb4bgaqcoibuwtcxfpb8fagsis3hntg9v132b3sfijiy8cpoecvg7njje3bnaxo2pxwzgm67mibj6sobf9muj11hmor6t2dzxqdziwfm6set8o2x9lwic1vp82972q5hj2tz8hahqusebbtay6wjw8uw',
                flowInterfaceName: '7jpwo69v6dv4d65mo7mme7of7n7a6wm2m0nsma9rvl16bjy9dloi4ccb0qwp4f3pp6renk4ok6xpr2crklnv7f3396yqvrcy1fgqzkmlh2a929hi902x6cgtptk5itvobq794u96vhqpb0975oj4swg6a2rw2sae',
                flowInterfaceNamespace: 'bitualmm1xjppo9jv2gvn9ybg9z06fsfvmjrhhws6linrwc5ezjiu3cqj0qwsjzb9bfpsl5qoad1geeevzwxrvq0kdov0lzhlz1z7w3ff70caoxa7ubqb0udnvf3y6mlckhwc20zr4qcuqn74vh5jzajy49dppxp',
                adapterType: '8c2r95rep1zxwobhdlryp9sbjf2ispjw9jahcmr6mbbi3mq614zjre3l9v2p',
                direction: 'RECEIVER',
                transportProtocol: 'v85l258sb5ffc0f6scgx33kpdrisaihelzr5w0xyez7tgrls932ds40xpzcn',
                messageProtocol: '2nu87havgj5ofair02z48d5lw2o4dsrfrfmdpw34rwlztfe4p6jbqpukl8kh',
                adapterEngineName: 'mrtjvg1z1tvq022i893xb4lm4wwbvbihfwuq458j8vr3lwvahmr96ehiqwsnno04r515hmn1ju7uzlxivhgs9b0d998sejp8k7bf7qghs2gigyg50qgmxspidtl7r1xubpfnnsgxwpdz79lgo7kcnso1z96fweiq',
                url: '1uwjf3ivhrgtk6x79is72nesc19atja856cqvagoinvkgo3f1gdtm33b2fa2h14cfk6va2lzbklo8b63e0ofzgalrofeddu9yu17dypkmqgz2oc2ww2p6utu6evnohbgpyn68pbnxlkd0q3rjmttbnef6stmk6k4cp910yxib3tdu7i5o1l8gsmusncj3jk4k5vanibfqftpo3be57mh2tt238dqxor2x4o7r1gauaj631xqx9g8r31j9kto6kyk059p3xnvm8iwk5tjsdg4vyxxlc8aoykmp8umy9fw6vjqkwueknjbxnk43c1qtb31',
                username: 'webgmz9qni8woyp3x06e1ljq2drsrhj2vufdffabcwf1322rb66fn70uq7op',
                remoteHost: 'u82jouteinvtr05g1ehtk536i4kommg6s9c05ldfvnk6vd67pab8mrnssovbc25l9fead4i66a52gyal5mft3itmynlobvphndywp7w294dgjt9ev9yka7b88cxsvlpyqi0j4wdp812sgtbuwxyyb85xrcwduidf',
                remotePort: 5482248853,
                directory: '0i4nt7p0v8meisn96ixm4c5kzxdgtmptd4uaq74ocklrrf5kpsew0a6dqxq0r2avo58avze1zi6ngkwguu94310vdhyv8k4yc0kyxsa5s235hijp3jgjq9kxqc53y1skvorr0wtipiixxbynp8if4kk4jm110i0ubymtiglvz452d6tqn5dvjt8mklt0jp64wgwz9wwzey56394nbaorexagfyp526dqnltbpesjgpmjzqcqbhmhwpo2f3322ew0ddkn51xvyzor9u4nsv0d94mt6reefz3mfvrhhgs8n32wmehk7ori6uj3dug00vq6k9dy30j49yutihwj1r38kjm8vw1tkqbo26mjkd88osmw7r6jol2td6zlwgh3343eg7bt2mwb92jo8pt2uo0zinedzjhrpcjxaws9gwsjuozzg0gp42d2faemtcaa7x3jpc4wbdur9szj9wfqnxiycsuy5bo114ysjqx20s2p47vo630plxz1bhpmdfot25t551kdot6wseknd3bbkbe7ztq6897b0ch88chn6ex6pl9dolt6ble3wtzc9751m406u0x1bow8inf8li7paoxymph4ci4ehzykjp7qp4u4ef7nczgatmtj1iyl03k07d8b74k3cxuietgyn7toh1biz9rc5v9gdmdxmogj1nv4lqt77yejo7f9sicx61dgxtftnx1gc109zcavecqqucailvbvysoabh4sgj0mrk6t32k2x30t7ydvxi10hjyu8szhxv4xw5mymmcga7yb7a0t7avnq7m15rj6yko5uew8fmcgyyxnjhhpmvxuc4nkkvhqp1xf2y3phe57l9s797l2oce9udz1q5yx5gcsjkx3v1bgtyc2qhul52cspj7sa0fepba1zi1nzqyemvdktjd9rbcilcvsqza1vucdmv89vra2dp9ongy8nihtyryqcorh9b9m060bugudee08agki1sve76vmp7x38zd2nyoinszu39ftajhb8dpq1kq29d8x5',
                fileSchema: 'vmtl44u4gvz7zh7yiiq6kzxnt89bbhu5407ibtlg4cwgr5mguwbnaftsfv2heas88fd214z6prxyhg1gkt2deeza86ty9gnm51dslqzqo59nhr19qudxu9bycg4v0lv9l0yzot484sbv07ens7118ymxncvm8ddwowxpkz6ubgcvm5pdpd7bv5u5z6g7bjbbsnajpzvc6ohn83co82mzedu48a68805jc84tmajojoe2zdq8d1vxsz2mmli71kvxzsj8nncpedfb5pm4zzhgyyu4ngzvlqdlzmhzakcea7eftocs8vtt895eztuesnatsb0kvzimenjebl7h9td3da7jeip7n8ml9za5ocpqch3myq36vy11shqnvarp1zs1gijgzdi5n2zoggsr3fgrr9np9rqnlhekdbphzxzih1bwfoc8p0csh1oxef2t766f2myx8f3duy20axwg3ahtdms8b3c5zqk5edftlh3jtfhjdvfvn10elmqg258dyr6sujx2ojpsgb9wksoyb0mupbr2yvea8d40bz3fegcjcbf89sp1oa5hrkqeojmqduhsw8mmhmz7u3jmcftr32lqw4zxunp25ar5kse96i63vdozr5vx36if7bttfsyr26bxbnl62vvskvqs4qduyfpxiyxkoktwuewto2napbig3qesdert4axks77l4m193b1vd1wc7zq9tmntkxr9gjmn6nauv8rp43axmkcbard4zomndp0n8x6fwko1gymw9i7r2y4x96kwuzypt5vslowl02ankjmfomxepnzjvqmuu5n7pybhpxf03u3h55l8nltewvdxh3ovpqd91rm9o6iqb9nfietezvyqh0bsnfty3x3a5nwlg7g1mppq1q7tsxd814px24hhxlni2zi8tjrqi5fw3q33o64i6nwfcxo27tpznv2w5hk04su41rqogawkurgxg6dvmgecsbg09wf7jwpgxlolpn16m2tb9ojuabg5vgkjzrqqo6650krh9tfy',
                proxyHost: 'hn3mn7loihiwh800xhz7nbcjjgusq4nltg41wa9uwt5p7e06fdgmnkvxqa1c',
                proxyPort: 4931505958,
                destination: 'uwcsill7j01k1eggwo5b6w0vw2az8gd61az6x2uavpvq2mj2kagj0uabovheesvebs6kqh0rzl0fwjline4u81yx26n8tgqoo27l37r4vinx3wtc1j2jwtk57d8r2zck7ntf4bwxk2lt5e5sq5wy8hqzbalyhydb',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gvbhp5s93updi5kx7etfya05z32ouqjl20x3kis96pgoneuaxs4s3tbgzzzlenpdkthrmp9gg6rdvbb7bnmfqn5n51wzyunqvvtscb1ifizas18npx0zxbnagf7q9zd3ux7fxp547opodszhhlvsrenqa1jmi0ll',
                responsibleUserAccountName: 'n7u1a4i2l8h7efp0spc3',
                lastChangeUserAccount: 'o08heqws01tpetx1x921',
                lastChangedAt: '2020-07-24 16:42:59',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'e31us2hdw8eb10x517mwuzikoom0s390l9oba7aod6zx34d9so',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'fn8p06k9u0dobgwivxagpka57vj5zohqrm44867xakpltpxwpyzspvn59z1rvq2iwxrix7jlwv4a5o8xc98pajxkqkq3d0y479uidiw6mocpao5ytjxq32yy8h1h1dtff7c644ivu56ri4uvhyuyk4xi59xg1r5n',
                component: 'jnznn244sdarfiive5ckxzchb5mfmuhtjo870klkoggbnuh8oe59tqauckm5w4xk59mpem8zqpjvf7rqv64x3icmjxqbmux8v1iqwgtdwut3fxb3elhqlph53sxn8gthrylfikqtaacpnmede5osyr85b93nmy4w',
                name: '5qop29krli15ca01ohhlel9sosfo53w6scwlbpg0l4oj1ojthkjd11n84dtjdrj5z4gsl453q6j3sv7mayr0wpqqf8mrhunmdpbekeg62ur6ltjd3jbjvv7qpae16s7yy1i8h89ofy6yfimounsxfe8dbni2asvm',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'u98gzb2fdz1afenes3257rzqimr4o3uaaoaermd038puq8lzp2x89yo9wsxt8qep742f0fh8pzbeo27kxnd483nwclqac9gn2cyv0si3yp6tq5zoj1ar2bqwah4da38fm6l6crs5c7awu9f6t8w12felwzpenrnm',
                flowComponent: 'ukfibe98wqhcot41yitrm093yc96ko60zcfbs5sl2n0setsh9nnxpckltkckeotb22zed6vagbi02x7d8uzzssx1dtebzy31rx0vel0xa4g3iftrbcepgw9glyup62tclaebulj7vcktsqlqclrf3jy57p9tgpns',
                flowInterfaceName: 't5mggdmue1egq3k0ul9z9agm51doafy2483krrz2h6pec739rgyam6xjy918u9e9ngy46943g028b6ns54dso5t2cs5535gwf1203n016rwx16goda14zu58ku2zv4y0dfk8s10pf3t95e0qysm4s7fhlof2isa2',
                flowInterfaceNamespace: 'izuchf6s7ojvnt24u2v4qh6na5w9on5hac8d4is2abv03h1eii7ivv31u6bzzyb9ssr84b4at3boghpd1kj9hkmrtfw1j7g3cyrl8urlizrg3ewnvixp6y67ifug2wa4vyv8pyhf4newnqu1lz43pt6sea05qc4v',
                adapterType: '6wuxsdyepefs48op5fyc2fyx16hvi42ir3liwdbh22bi0ckxfs0puyffsyof',
                direction: 'SENDER',
                transportProtocol: 'yr1kk5qgc0ohnex1kymga8n14tlse9rwx8fll95xo9yvld2v4hcr8dmt06xz',
                messageProtocol: 'fhlp10y6bu0o9p2z3b9fbmgebz0fgdpuryju5w7maeg6vki5ofoki9ryevfs',
                adapterEngineName: '70unu1ggu0e1gumur1zcqm7x73blfvveo1gvk7s5p8sdj9z2ixlyjjjmcb34kgi7wv282cj41r9c83zfaalddnc5aq7510xombybp4howzfukgt9pbj8yi4g2ycqnlmxjnnmle8vxkjtwzc7p57wfg4n8547adbl',
                url: 'i4fphyiio43pkujocfoug0icoqvuf3ikg6e9218icf551buu0c4se411xlpelnvutsaovdhlszkwf1d7u35cmd17j7u13koz3j8w0t3wsj5jgiso090h99uw672l3q206z7or3sgadfh0mvb3daibyfgsmalw35boc44rslk9bshrgq1i8gpyz0mzptafhk3h0m5fr2txqpcejr0z8dx5jnqsgefjkobvblgvv68jbekvehgmjf0iknve8sd1hbooj3x7atz0x6c7l5oomesth4yzo03td9h8nw67w9m45vaoc88uhkrua1say0hfad8',
                username: '53nxqwzqbk7y2wjsinuroaupjkpww86absgc2c8ssr4kg6wkv9i0gtiwj35t',
                remoteHost: '23qjwrmz77o2fz9bofj6ebw4s24zv6buab53sd9gov1zwov652uji9og394c2ge5muc4w9x2pwvuvre08pkzzqijtzxtwovr3xj01a5gd1al8suha5yuq3o8su8qtltqwy7r6g5khbx4kdwtg44t379otya8ae5c',
                remotePort: 4457699208,
                directory: 'pg1mnvp27g3ut0rmi2snz029ce38xsy67yq7lllc37db6m45ydg16t15xbrq9zevl9qs067vpkeeyf3xxl9hlg67elcqov61tyht6e4vkivhz9yktrcxsm6r3krawih12bqdjrrh1s3xgs4k88x5juf812mr6naxsqcjlt2w53flucwjzs94muy32zm21qxs9dneu0zdy29ha5mqzvap3hz8zeey7uqa7dpstghpq6my6n26355j5llwvqzzp4ur9x80vu2fwgm1xogl0z794tlu12hxei8z93581q1uo7vxhcqyj0xskprsceuyvj8e5g9o8trfqjn1s75k326ss5owmbziup62szyd9o56a1m67m9lgsgsybeyubf8vawioya8djyd363byueio65v90bz2h6l6tqlxp186atifwmlbeqh2akizfvbmw1a2gn6e5yrjrx3lehorieehqkkj34neqfwse7nlmavnrcgz4bk4laigc9o2ikfau2zjebocc6hwemotaoy3zs95a0qxb8ptymlfrmj1m8rawifj3slspo3851bmx6zsrm15lsu1l8fr5z4tm23zqxcqkfht8izurc12y8fmcw6i62mgpzp7v5q0pum16lz9ykx5eam4pwztppjercknr5j0te6ydkaf54gijfu9cz2gi1ib198w33qpcl4dyi5n2jv47i9p8tgbts0g37dfqn7wrl9p4nre7dg5j6xf1du1v3b5q4rpbf3t8porudwijm5i569nkpv8ztcw9j2xofybczu75rmt24ns9xqyo65a67akyt946pmonmhp3c7r4kt3hnhpw36s7d08trrbhvf48h96iv6jdu1ddyqzs49ron3ra2ns1mtzymghjb2ilrpz9uyxrmwkv3cr3a8hzn8a2c0znt2l8tu3hr8l58hzcgeu6dm1zsgi41gzrz482q7ghgrk8huei8srrkpc3miw5gek34bjpdhqnb35tv0bttx2ndvva2hp84cw61a3lya467l',
                fileSchema: 'reh7nz034d89aocdk9dq2hbvok46r7hzyu5b56p797k57wvooyw7za34e3upf8rje2gzgiyedcb85qg0cfv8hvnlq3fy3uzykly39sk58ic3w4uxeqg6fkcjja1k9jwotctx4xwpmtu6msciczcuoxx4jwk3xcgw6glusf26j1xktv7jsa1vsn7rbovg372bjiip8gt8b7naw4ffrrv4bfjv1ywdvnuruvkolki5gl4d7t1aczr6c0onakq2spo9gbp0eneqgraey9iu083niqm5anm0sl8jkopr7jvwjepsoaac51cwwx1c7t0c8qiflqo0i26rxngbdpm1m1hynfh67o9nzb30ha3jzna9gm30isjzas76z3tag9vgq7woqls2ennu89c0ppklzxm0l2la8dtn6xsm7watw6rmlvp2qqcmfeayx4qmtvz48i3hsp9hcrpu1eunxpr1bkxjzm0nui5v1yv3t6eqf6jwxb7jy590a0lmz4r0k9jcc6ddcmy87qkmndiaz5yx4s70ma29j9q3wr18rgu7j4zaqiw0jky7rxt18kxjv2dt8kr6bu1s8xmshzc7xi68tr4w0ahnheg99dzphpvks0shtn69g68gv70a1h8zqmbhcbpx5n5yhslqy1dbh7l5gkk61t6cgp7szsw6i4l158cciw9ckcunuuweg7kr60r4bkyh89gk0qua3vbbsb986y98olessqy9a7b8vxo2qk217d8c6qajrxjnd0dh6rszvz6drt6lzqkylewzfwfydswhyd3q1kl43ggqgkv7j6ue1snaf6wi43q9efccz20ogyn3kf4ke37q2azoq1i0aa7smy26lmhqds07s5u9lwvc164w3erxrx97xxs4utaoynopbk74qvqg6fyljva7w6pkdg2n1sqmnwebk7b8oirfq4uje7m9d6b3l6li9ba5ra10m7c8xfdmkuzzslglqei8ze57q4u6c5zn9tgc9k4ivl3pc0s6pg03vwf9ssw39gtvj',
                proxyHost: '3f2pu033prngv7s6zm7s1pgzykdivw3l2r7ltekaucc7xd65okazq0cj8ck9',
                proxyPort: 5934672919,
                destination: 'kcc0ygmzonx7iimm9zr0kggzyzffuhvc7qyga3tkdxzz7uahc8voakoo8cfobqexx02zea9h6x23cqcvc3e96sv6qeybrjvlnddzpm05n5979apbqa353xvtzwasggelgrv8hhdklyf4tli5h6l9ar4t8phzjhtn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'dejn13y07izowjrtkvzvpo1dl3okh3c7vf224jyqft1eqv33ged7e6xl9l6aoo4lj4fe9bhfw8243j6zoxkpqq93n139ulgfr08ra73th792v24j20r0enwd7819bmsiwd3dxmnwmaonawa4u7vjllmo8k009a9p',
                responsibleUserAccountName: '5lbhh8vs2vmvsb8aaa6g',
                lastChangeUserAccount: 'p3qyprvl702huzkfolyx',
                lastChangedAt: '2020-07-23 23:25:12',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'tca792unver1gsmmi597wnedskazm683q816ypurxwnxflgwwe',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: '4wl61sgceu17b6xa8fd4puzd3n3p4bc9czyn27nkugdgy10lwz4t81m4exnlny7uwbv7rqe6qbmczqh7ndtdyxpejf97l025kyfrgsbqu673ftvhzyag7bvvyxk3zj1m7v2qoyxhjf9v7q6m2kus7g6zfvg0umgn',
                component: 'trtrm29wn285w1k6nzdsdso60qj6sdkk71k8paow3vqlnlnqhhuef5bj03p188kzgh7ac4yacjoromwildagjk4mafze3xrlitjr8i3jkce1hp090lwnrmr4jdzfa4v8bfqxzr6uu32lxkhny6x788n10if1g1o6',
                name: 'tqrzq39ds4vcvmr1iy72owzfp8ahfbin72u2a1gtumiuw06px07gl1k7g73tm6xz0acoeas891whh59od2qk5yx19d9a0vsw5sk7l3eym88yl2ewl5vqvu5nbkvgd2eki5dzbzhhsndbfntbteagmbq2s6csmztk',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'nm4tkr4sr8ct99llgsejr2uss6ez30ygro8s2s3qtw6wygbp91yerx4l4hd3wrylo0rh93fhxgrlq5pw85zzmrh992hh4i849dnq5rt23dctsv6m0w0hcdjcladmv0t58j0qte7e1lrez81f4pv1pd5rifb5fm4j',
                flowComponent: 'lo6nrjvidnn7mifg48xrld94z96vaaci4fis66q1wjjjq1rvnmjgmmjx2yi7ivqew59uwzv6hmex86c12w9gd98fz83zf3x2ytzkebfhj4qfd1rw3vmj0ap1ip7jx4nutyvda4b6u74t6rtu9j4jvhm93arn6giy',
                flowInterfaceName: '79r1hg4c0307tdvlt4he80xhjbwjc8w35pbv0xpyd9h6xl8wybm48ux1j08k3a2m4hkoh27t7pekifaaktrkear5vd0m28mvoax1pk2vdswk3wur77g1kh5kjakiblwols8pscmsob34xeil8vdcnfdx1g53e01v',
                flowInterfaceNamespace: 's2tccvkyl70f1dol8goopatffvpxlp4qchxbvwao6gvp9kgz6rw1vq67bjeiodcw4er1quvqa9froegzjr42b65f0p29oybumtlb8mwk5y2tmk92w4p6klsmd7yw263p5j2yf8z1utpoc93mqw8nw2egspu02k0x',
                adapterType: 'wln0j4s0y1qljg84q95x7zs5lczxtzurczjvmnrhfs045te5feqa5y8x4zq7',
                direction: 'RECEIVER',
                transportProtocol: '8libt8428kg8dl7v55r1j5fnbva0mcex50mhlzvzvw7ruwkrqh7n8vwcargc',
                messageProtocol: '9cs3zo0jd6a8yu6abvwbmufej9kv638wkmpxcblmrnlquzdqba7xx5mxdnok',
                adapterEngineName: '2n901rcd4vtgmu1yy8rxzqs86lzxwnfl1zf52rp82o2mr5vpufe6k5wupaw4no7csrpxn744vo4igbhbteks2cmebvbmugncqzuy1df4m9qp33rohxzmpzpph74mbs7i2bgam1c5i4q82tvbyp2razjhcgk7r6t4',
                url: 'duaazoknpzbkp78sq1tmcjj57pp822gkt8p85o94pceumk8gam9t600766yf3regynq6scykw9sb8vrw5rx6p3ggkjvrggvqidjfwucpzfemzwgst6k7qtsj3r0zy93mb5c652xwecegn0n14yii9ehb4405qmo8aip3k9ti1kws4g5qdjxjl7b1kfmg0ujayeu8lyvxgvupdz97nwonepwhb6usnh87ul9lt1dy5lbdsrcqpk83gpyrllua60bm2jg26qadh1gltx5yjpvumbijqkbhza1cmehv80ayzcrp0rvrjmguqjtl0zs2z5i0',
                username: '2wr3g7dcaxsrfb44rhzphd5n1g86hkp6kbpqazrzynmpodvdmk1kmzthr2rf',
                remoteHost: 'r762ob9eqbhyxd8t67vhcv7xbw7ks3fsjllyzye4n4bd9rmg9c3uhtrvpq48si5qksa7bodc4h5j62foiv44jvlraaxcr9y9eido5whbjiaqguv89rpynx3i7vvmq66o8hdhy93d7b3pob50qthhgim9lswjrjhz',
                remotePort: 9206283888,
                directory: 'owclb2jruery7kwtwi8zactiguqag7ubx52vtj7vxkish63hs928695s3k5eoqk3dgqfsj4zjhyq8qsiacucyb8wt1u1e26bsgwxtijhpn1hug411a7xu5q9vlegbwdzj5o53jwt8bv9vpu9s5fqz5b8jogmv6nr09gd8d0cobtzm7mpeop8t3cnuxhosqc087q14l5njo70hsjoqjxapdkues3g7gik8wlopdi7y3ydz7tonwpyqo17l9k4uxlbtva01ehsownzv9n800m0aijzdvx3t0qg0hjnpohlamx1j2aaeh54svdxfrn12x3i3glmd9g8b0b6gqk4kqonvwxjdewivu0evsqqhq6m1zuxglkj2v3o0n1kw76ivnvcihao9tkbmkobb10i3gx3g7lb7oyxo9abq1jnz61w21ed89nixr7nmh3k3t7hs3l5vocz2phhuo42td22are8x0u4o5m7du4esr84zjmtoqasaqr8gubuhj2scj1jxi0wud81yrwisvmxj03rxec6hcytykvmt4264f1ym9xvnb86q2iz8cjclb2yk7u85gvbww66nddi2a1nuqgbapo0rqk6nhbl6cs7nayclu31126uspn86iw56ue0lgwlfgu9dh3bdurxz5gkmoy5j72rwl0qoxsfb1k75ma2f023tcqhaaybn04l0bs4fcir7rwn4xmnfhut3plqkeudteinfovy3q7pit11xlmzbaj0faxba96tcgr8fbvzuy15i1bo9wnzmwu2xyuaqzscjlixegxb4x7miphju3184zf7wdlulx3wt55zosogk66qhb9q5k0apx39yv6o91myyf2s2n9n351nemum8yt03l0qg0z0aiirthqcax44d3cghk4xuzia8h5vuukh27x8sks7l6z3rabzqyr9oogoxnw864cteuwhnkqpyozzr4n400gxu0wooevnny4fflrsu62m6z25gtctchz09brah5pldte410u2fh42wku5tozp8wgj',
                fileSchema: 'x5gdjqvaust4wgplfpimgy33j8nq4klj0vwt3czeicp5cmvh7dssjqziggde8ruypbids4kl1rexicx651n36uj3exgni8j9gcdpcvphl9qx67hlcyg5k5th2ihozhef6pfom2kfomhhmcse74d9s0q7dzrf008li6mdxss619acry34x2qk2vfpnj0jliviuz9qdjgvqybvrugd4sp7bcbxsz44lsyot0r7ol1cqk1dt8wynepv6y32o3mcccojzv5wvhucv4vvq3wvlxquigp948pdzj44x5ndbjl8sx5tgen6mn7qan1raxihced1squ5ffl4belfoytjgdamwkzpw6f3c5blq5f5wwxp60ankanty6qkwjzjch39rjw6p0tdxztyxtnjru1e121reo013h4aupizpdpz3yjjl4yrf4rif247vdscevclhva0n17i9g9qcf5mymkgqcwvmf4k0zlrojiqg24e6v2uhxql3cqsjcszsakyow0bqb98t9ou82iaa7frxf1ij3hpt9xmeo25yty0iqtchy9w4l4i3los0uy8d5vurqhys064gne48vf14ntxj12rdacxxoog08tmptlv6lhbyxae3kljc1z1d31357g9yfjkqyx0w7dgzjtvo18zi8z316ejcqjbsf3c7v1cd372brh6061zqjytf5qpwu1kx851j7utdr99ckkmbx9mzruo3u6me6azpgikd9yjky7knab7xd7q62mwoo5vfx4pux9a6taoyy20pmuwmh5wse3rewrmp6325rybc4h9p5lw0eg62f2wjfftgja2gsjzdomhacoigqoknk5kf80szfc2d3zdxpa2trh2b8us3s3hbxs1gjm5fkolct30ctx0amjfji1m6u7h7suduiuyt7fc5bz7ffvmtrllayjd336a3u5mv6cy2cmkxs8nfuxi64hroh0mseitngenvivk9kj5pt8d0stdrf9l0d2egtey3ooambh3volqfne8y0yaslhk4mtf',
                proxyHost: 'guigjzb4hfiw0cd13lx45tpzyunhtgbd7fc00ihvs9hgdgjs4eaz40y8slcvf',
                proxyPort: 1166341391,
                destination: 'fasjh83arrqw9mpnszi86z1rdwuf81ja02k2ikrfvo21tqkwx1dxvo7uoqxtu2jltfp2sfyaat36y48910hbbl6pqkrzdhtv6px4bma5jp5tmu9wkhzi74jeytzccg5mf2e0kkhzfc8mqw0tym8sbwdmtyulf0q3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hzn0201jb88iciidknyq4es5j7m6ye0p7pppzgay2dyycgwkhw0k8m1jblradwrahrnge7g854t00m2mg239gwcll9lr1y3udhwb6s6msdb8utzx8m8b039b1l2pvavn5qc7uh6u8p3l13v2ugkq7o7dpxdt55ue',
                responsibleUserAccountName: 'ml82pqsa0q5daq2paqro',
                lastChangeUserAccount: '8irzle3su0nqngpnfv2v',
                lastChangedAt: '2020-07-23 23:49:50',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'nggut3e233rk0o4f3yk78zjqczsixwbtpjk86p09j1kk58y8ig',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'wledullnbufz38baly1xs2bw16f2w1gkiqgnkfsa9ywqb5i8r6td0ca2dnbby364u4yngc54p2b22krzx6y8duod0ha4pb4083x486wuksbwg63okk7k44h84omhoe6tzzzvtbo0m8dunlmk0tqar6uzdu0nez40',
                component: 'qnhgby8p6ncw2eyriqxfgpyaa74nyo31rrgvlul0yb7qxzuwkfx6t6rbdjkvfsthdvynp00ii3noz440vndik7o5ck35jy6dt7inw58j7bgtecb36rvn7kqj129uob9ldbpqw45vllqn397smc43eovd9hsbe5vy',
                name: 'i6nje6z2g0romnwk0lm3ogw31ewtch2ylm3wedkkp077q52ysowhr07b4s1asxrfp1ghp1lchv6acug4egpxrde7n6z51cmnnpi5z61d7pa7vv3u5y9m8vmc0335nnd9pgpds3u14uexorxepyk3xdbhl5navj8e',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'distzwmhuoq62aivky172gwwhzo4ea2z47yy537qv5ukx567yo8akh7e1en58170373fmkyg1i01oqsxfm03173o8570ypj0335k0xc94h0c10l0cbjx0mfcs7puvna9ww83h1k0wpcwxbd1p6eb0i95kxr0n2ad',
                flowComponent: 'e4sh93y94a3kkaas0sp4uqkj8yb4xx02r67bcjxmxkuamhsr6r247rgoz4k64y9atn55f9dn09xesykumr0qtpdocvlyrkbwy6mwyneonyyz0l01q7gla400wma8fep504jzvxfla3srdym6b7u07surwww4uz1e',
                flowInterfaceName: 'tc0obk68j9gzgd46vw6u0nbg8jve5zq8tifz8ehyzm018rw9b7vh348snnmapfufplt0cl2wtssoksbr1e3gtobd6j06vlhza77ontuqknyjs3nzw8815s8d22emk32sj2uavndovbayzlranusepxs5jq3npziv',
                flowInterfaceNamespace: 'brfdgf2s6smgcyae8kp4tj8rx6lputl2zzd9fxfkluhauqfegwic4yv4z8anhfqy2jrexwy948fquwh0hna22sk7xz6uetezhxeqlepn2o4fgi05t64xd3zcbiuclsuxl0lse25mn69tkxyagif5ek2gednxvt95',
                adapterType: 'ecw1xu79z4yluz1mt6obdr7w5g3kkhohonlh0y1lpt92m8flja1gv009brus',
                direction: 'RECEIVER',
                transportProtocol: 'uo5p46oquo1l90j76twnu7y2c4tgvjhsmeuwolkyi1b8er61hazfs57ie1h5',
                messageProtocol: '3twz7l0wuo1rw6bl4vbed0cfdl65abkv540rt5hl1rlbbfo1tknie9zorj0x',
                adapterEngineName: 'r56s3q8fp8fdqumrehibk20l41e9w9fet8loy4vnxnvczm6rxqo0a7dvx931b18awskrk7a1650kykd0l884ylo2fmexta1650t9dlly6o0bb153ukvjg7puvpdv0qlklmqrrxmdtt99fsyr0h64aagluc0dvsr3',
                url: 'dwt7ywdw17zehzfmruo597gb208exv5doyqxpkkk3fu782cnwlqnlxdxzqefcqmgm36k1a54m2l8j1uckx72nwhijjqdkud31fpggi6pf445e10iuik21s87ss4exo1yywmz4butdq1sh4i2n3184txlnfi6ziowe0i8ioezu3l5qqnqvym7qouvbxg6i69t8bdcn9n0itoiik5ivzi7788jnpnsbaf3shgn7mu876q6pwtwzh6qi4beyq880hcn06jc9rv7uub5ig49tdblwb92bsuxlr7z92tfihyv7sxackikucml7f6c8j72skx6',
                username: '936ryi424pvxljzhdnl55ht4roj1r8htjz65b5m4kbx7ez3ojps5e6a5l8ya',
                remoteHost: '4rq01i9u5hasrrq95qw7zra20pxcpozczzzdaqjgh63dvkuwjw65poxm2sn1eoddi567d6fdfir6dxofli9bpdhwyt85z1ddnhwd0bgpogpaxih8p4ofkbbwoo3l2roaxmyskh7y3g5aokhpohke9vxq5voufgve',
                remotePort: 6770103084,
                directory: '2fap6f2xwwwc5h6p0q5dem050m29x2wca7yg30skrjt8dh01ctroac1agvrz1z89kdwo42umpr66med9d63iajf384n29lhpqsbgq910kv74cz5071mopdh7l43xw1j4hv76wx3zw794in1tnqmpimfw0uudbb6m0onqwj0j8vw4lw8bk7btvxmzpfz5ewnz5dpy0npw1haokske46dt2jbk9relxubr8ymm6znxd4kwv9ik7re20i5cr3w730u7mnrzk8d0lu0ox38jbme917mkf5qjgnf27xuqx08u9hqguxt5xt7t582gqn616weklqwx7wgk6bomqxlxq3jansczijfxi5vbm2fo10g1jsj3v6d4j0pf8fu0si4nr0qymab5max3wzsybxqkkq642s8s6edfolpcdx8ipmuhlhpemqgpbb3eue2sv94nswyxa9wkppl73jmoencsqi2pfmsp1r4gmsttm7pd0zc7u3xojt3zb4uuppgjnl9f0qp71wh5k86tpf82l78y3sr76en9o9rdfk07kl5n3w18kq0hpamwgkgmfhjvgaddm2xbczdegnr6gmnmkyj7484fpwvo4lx7kc58uk6osdxmcc3e7jdh1txhjt7hh388coh3i3os6utch17w89jr65z4n8kacveap29z6wv6g7l6z8h5bxo1cbjoaj9roan4fpddvg68qmwrgsturwqrxrwa44fbo11hrvmpbll6ck662fw8zathmhmye0qlg6kvg04udgp72q6c1hr4z46wr7dh295ba66k5dgnxkkg5zjl6p38ccjztmcz923zskgkgfpe4l07ctw3hxzbfmxeobj16cmgn5iusmnlpt60jflwlzsnk9q7ry3vfd2lsx8kr4e2ck8xbzdztpogfucsqngpz38gzabnfrjse1wnfz1g1oscbkirnkodgrz0fvjrs3o3azpuaw541578g23u261khkeqfdznaf1dvha0o9b63kpu3mt6u54lhhddik0pyypg',
                fileSchema: '1nqbyhr7rx7lhebdq0e0wwgqg6y0j536miqmfm510qm7zpuoduzjvhb1cwm2n96qhnc76qwjbg0i6qq7oclv0wejdvcru9pahmew4julsdrcow0u6mk2j9hq3x5dr7xia5w5qqxm7i90o12xekordz1cy27astytb8120rei1o2wqy9ka6hjdfqexlali2l93vr9x0lqbn12g9dwe9r74cfhy8ijo7azl4ochx42l3uz2y4ucb83kbtx8y2xgwzb366e5qrz5n2z1uyb8tgzx38f955941gzk8lbx2q9y3kbvsudg5n2vvze2mo9zprtxo5du1iwkmh8wk25ymo82t4q9anpjtyq1cvjhoyovfckic1edajx7qwabmhbjx4j1ar0cuk3upgigezj9jqbogzvv4a0h7aiv8uxp2t59i9h9daz3ic3gd4gxt5ik02id170fueunqlh4xgfvzyldqv0em2onpc5j55szjc5uqd8fr5kgijoxwzdnfcikyhchcxpo0pjti6rfggq5hvd2kxywjssl439pytlea74nfqzzc8htxn7u5i724x2gwlivkbuodifqi0pbconjzv68wsembp3zt7azimti8384tquw282u0mbx365h987347v5jrv3vn0dnmvmjmykdekj9yemw10uxmq7mkj9hgy9p962nhp9qaulepdshoxnldl1csqnbzp2t0y85ls68hw0vq7kzr24guo1sm9o7noo138zaz18tyd4kt9jymdh9clw6mnm4f6pguq461a4sdrhvhtjp5iji7xp5k4ados8gygsp65egnh2uvqt3ks4lc107zu1ds2rn0tzfl9icu3pfwq6g75kxi974bpr6h8tx7vsptv1jmztsjf5eojcnjmdqvg0zu2pjk8vjpigdbecisuesetyr46kipex09xwt1ifcqjmo8rb6s0b7nbmg5f23kyf1wfvvc04gbktcdrfetmmhb53bnjiupo5l17q5ourf3snqjr8dvtazu30m9g',
                proxyHost: '3g4bp183s019wakmat6u7gwzbihxeqlsutp63rbfqz1yjic84gfijrfv55g1',
                proxyPort: 80865206270,
                destination: 'ekba4ujj30n8udvlbsn98yik4gp6y39hq8oj2bc43477nwwrmnf1nkg3g5dz150cmq6ffjxuc4jndl97paii3jz3cxuwikh1m4n5gxrhx9gqnocndv5ben3w5cs47fe9ct8v7chs6aq196ivasaoosswh9ezkusl',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'z31rbxh4cougomt8sdaasl2lvly2eybk0l982nxrskc7k9n3fwkdni7moev1n81mg2szj7xvd1f7jcqnm22dnbhp39w1olf3qy8b44jp2ti8szuw8rn4tfbhmeyy53h6y3ty6t1s2yxcvmwykphdfj5rgdyfkqky',
                responsibleUserAccountName: 'ijvsmys9rr6zmnyexl4k',
                lastChangeUserAccount: 'diut7lcoq6wjk2wkmxgf',
                lastChangedAt: '2020-07-24 16:19:13',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'cdiliati6yd4krsc5hh37h98kqf0314a210nv1uhk2smnl2jzi',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'r1ucam0njk8qy3tn6n9cqd0pgf3zy581in0vnch3xdflpqemupr6fpkgdfne5wbuauyucqdguad8vabr7zew0z50porxchtuxhffz9h166d2qafbtymrxfzdh17tnu8qccwlgq0wom3itdczvnnkyb3vw4ti0ywh',
                component: 'czsl55u4ed4kauazkh5d1ye3mnt785f4u4d2h0tab9yemhj2j11x49u5yvumqql89ui12tugtmcr9ykajh11cl6zo32e98mrm18uh03vxggtzt4kqu4x06ambvp0kjwa6u0oka9srxwgug4zwqo3wd7r045w5waa',
                name: '5ahjgx5owlnaej9zaxaake6v077381o05834m3soqg0bifrx07s9trycp37frs7w7p3ihkv2wven05fc3tzrd87yhb99l02bruinwraq39rmtvnrdo2seog7bqcwhb2jx3n5c6p2y3k5aex6sczfmk6dc1p4g1gt',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 't60i7fatvy5rlqgtqz6hd69ob5uyvjy8bpe5ro8pkp8b1iciwve4i1zlamtx7lxnr39yii0zfrfnm0qin871wv9speqa4co86j25197rb4q7w97tkh9kpdxo43zah58qb7cf3ghuutw0lk3kskqh0zrh5ccyxi3k',
                flowComponent: 'cx2ecqqt6t49x0bpr2gn4sw8n1hmrqk4gj22645qqb8r0j9jkg5j2zf17lbo8uz0jnquxp6txamu8wqu2xlxyzo8aslni118q5gtygo7ht6knv8ibz1ygrontz0q9wpeelqoev51ftsa4gqtvl21f70c05qmjekb',
                flowInterfaceName: 'tj9skshyslhil4f0y1j2tkudad6kct5mfrq8otdovibrrszl91vvgftnh4w9pi4ieocebmvtq82hkkuayjgvk0j1pob9qbz3ug7014ikhpv4n8zgno5h64iv8foltl2ce83z7c71gqkhp0guux4qactvynr5z9la',
                flowInterfaceNamespace: 'ej4bo32byp383oqeagqy98qmtcw80t16tpdhyr29ab2ulzodui1t0l01ih0inas5tjhczo4bgworza23ftosoysmlgo735vk7wcezwjv8j5ikua4vev74q84unbh1iag00ktpylnfdlfzntljwmecaqofwtv1f1b',
                adapterType: 'f38lb9zq8f1rzy29pginlllts3trcs38c3pri4g7xpw7azyhwwdzzim9ls48',
                direction: 'SENDER',
                transportProtocol: 'tdibp2crzlgsevs55zmcsy09abvx7sf4e7dfxyctdwamdh76qspqsxpo0y5m',
                messageProtocol: 'x6x1hrs5dh6sacwlrr2jz5glf3du87agoq6vyyi7ib4siqhdi0cpxj8qlc70',
                adapterEngineName: 'hn0h7gpgv53lvkz10cktprxprv3i2emokqerch10n84wdvpi2l1ri1bwzmkgy2gu0foi4rklyzq62u3oewmthyckx8aj0ftyi94k96odcd03pcth2vejgom8tjl3wsfs684zatxq7zs5d695qk8xgvzrv6cijboj',
                url: 'sruxvuqrc2s4bjzaz48v8u2rkvlk8n2dbm6hgk3bzrxozfavdr81pfae5cr0nturb09bqldv9nf08qu1cf9ioty0zx81o91887db0fxmt5158la985epz971h39g3mlz7wfaxswazrkh0gvmy1wne9yd88h0kgz1kj8wkn7890b4fr1upa6l2wnn7fkx3ttwnxmuvji0uacdopc8ozodslojxn7thq8wvi144l9nte4gxppo7op8rptbnwougc83p8ymo0n47cl5gene3i1pfiut4svcfsie82jqodthm9kqu17l67d3ty9m1ypak45y',
                username: '2aqw7fqmi8uzhkavts6kydqvf0hpvo5vyrojoap77g0750ax6dl0c6qkne4q',
                remoteHost: 'rt7ul8icns37rxhsbqk2xmo6pzsp1fzsjgboobjhe4e0agkhw8i04vpp2dqr7ibrn8cwxl9czf236huvptd2acik8sz97fyf5fh337n6itq2udg3sx8k5yrejq7jw8p2g2sqgd1oyrhw5dol1n6hj9ryb306xdwz',
                remotePort: 1305508037,
                directory: '6f0ik7t37wbgkrf7t9mhylex6okqirafrfkkacmpc99yc0cvaz803ex21y3bcciugsto0tq3mub2veee63imm5zxtz8uu6vnq37j7xcvvl7uzvgsyw3umejelah9w9294g3uhpwltzdvx40opgcklq76iqgf4wgxewn13klakd5fy4n02rfumttk2qy6m4lxws2jc09g8ergvan77h0irgss4uc66npobmp6ew5mssifdnv7jjje2qvgbts6cfwpf1o5t2oz1qvldwftsatnd4zelh6k9sycsj6f2qs9bh64k188xnwl4q9a8x7hiiowzmrbvuj6f8gy9frcjaictsuzk1zp46h4y9i9vmrwzbmayx0z61o09lwt6uboxozdby0l0u12clwnndhvp8rv3u6cmupq9cu6hk2h9b7fzwpl1f9jm76cpkeyu52z6d1pk7gsffuuifp33yi143lifxllzoil6ngwm1by996tnfvwojvumrykzp467w0xdfpcm4bbkkaqq6izkkhm0udt08x9vhf2mh5tu652v7y21gxq19gswi8gl72vcey0cyb13kpx30d7uyqe4jmszr3trnsd5k3xrck5tcct3tycdcpa7iiuvzgwzoy9w8a3ud6l217e09ieh210ulu3a5inwgcgkp7titd3iqkgyay8dt5cpsh8iqrjcw63wqa5ctvjrzoaz7j7kr6pjifnwqbxglionk8ghd68n951o9o31rn49c11lec9dli5myih8423mfju51rk9hn9u1g1n7l1b7dmuyqkf516hrtvmnuekt2sc8sjcbiioptj1v34fx3nvhm7zvivs33g4idr419hospv6chouadxwjsp0okdes33bhjl5rej935b811lhslodrgyfxajyxleu0fiy00rgmgovcxcrfw466xx8dadgoy6op61oc9fqxpvmpqexivjdiiowikpnbk0vpvo2idh9jhuhl01uy1vcfegihoxp2pjneak0vjf8egi15gfhgqq',
                fileSchema: 'yynno0c75i0tedbbyow2tbq1e1u27brwyuymhqoz3nj9a0ncohpvm5o70ux5iosgbejtwl0y0ju995ywny3c49xxsc0s57fue87ire0qnhwofqlqitaqp5zjo49f0er94o393hdi8itvwv136c8ny7kovw3kyktz05u28f3n8k7t3ptmo01igpjawxsz4n4vezyklyu4tmz7rpw2rpq4h15l4ejo7yrty4rz9uof2fjpxopskib14j9srjg9s2yrv2le89vj61dfmfrkc26uaxobrhx54p01nklfthzeieme08s4mf4cknutnholh3c6w8j4ar2eikbq23jnu0y4phx4wp0qurlie20kned77aovko1rtthps14zem87q0bdbjuxq22t7kia4p20ol5umi77sk0bumf9kpqyecirmqeaxy1pj07iyam707q6k9qugp2j7m2cbnu9ofen8cnc2nj1bd0s1o8luted8718tyoeou9pbq30ojhn1djo9k8fx3as93x4lrr2vgapdw9yy9v8qustlx7krguwtphzqlkhv0vfk3z6rwd6pwxix6pl8aubsmrz448347xxm5adjje11r4ew6khejmq6a13s0kpvv3pclsxsr1a6a70paxydcfjmiuso4p2pxv82hoj8qmps8tcqt0ljpwdr9lf62u0ujt6r63dki1qf5xpdkoex2mzr1o235666mwv6dfzjtktf2xzhkg5whc1059wt8i7x3i2338ht8nl2oycczkqazfa2jmyt657q52ka2akicyy4tgv3rktm7rg13vqkwtdqgvuzvqtw3v9u29iro9jfxrbwwsut5emis0gipdtmulw1ojjafb4rbtw8yx2bng89jfbjsdpou03q2y7aoc2tod2np74xy2rz9re0642k6aw7gwireaz97tmqht2c0ncnlnose459url9ccrn0pc6k8mht6go1gl547ja471lc4uvu815az2m0haiysx2cuwed5zq228406sczfq74e4',
                proxyHost: '7z81blirjjhjfxqbf7gutwsl9xsl4vk6yp3r71jx4hp6udopej865tap1b6m',
                proxyPort: 3847674951,
                destination: 'ene4doi8lk5u8defckqaoyutkydhjc9j46hbihgqa1nyzgtwcd57zx7js19zvdxfycl67yodvyp8rofopjtc51nlevir3z43yy99zbvkoqcyv2mhfadj1f4872k5auu81zrulvj73fu5f8yheoiwylnd46j5m8b7z',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qlphrbuwsp8v08tvme7yphg8tdfp2uyfmfu8ipjxwdzl7tilrwsk9ez29n8i8u2sswn0unn5dkpww4mab1u7fxshe0n0dxhahjfhawg3ourqv357wdqv21cr4m7y7t5uoqyai7o88vjx69j0iwrw6f7jhuicmsmb',
                responsibleUserAccountName: 'h4gg9vg6uupyrs479phq',
                lastChangeUserAccount: 'hj5dfki541bvbkub9n62',
                lastChangedAt: '2020-07-23 23:01:35',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'l54h8tizu14g0fptiyvkq0i15xm3uoxh2uskr461vkz23k1lg6',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'gv9slr9rd3oks0yhezpabuvncwyo30yvr84zta4xq5nu3yix561ahxtk4tvv8k90f4jeyf4e21xybanwxu16oqxd6t0c6emgvc46pixpktrhsj4nkz2bo6yq81jnsq0wcm4m2mn8i1y7b9wofrzfet9lvr2904fg',
                component: 'hbsxb5b11mx6y4whpmf8lrzr1n7qd3fjmz4xdvkfwf6txydp74yyeh2jy2kg10xarvq8a2nmy5qyyhnaf0yo7dzrdqv8ta65lzcz8d8qrq4j3yei68d451tug9dlfd08wz8oqmy4xms6tuesflkkdlp04mo0g99a',
                name: 'b9wbtunz9xwbty5fiiwknfesybc9kuhuft0br1mh1c0x1veibsdyczbiu2anlw9nufzar2hbp21dace60ppi137hpocxcat0vcpxqu2vp1i15szu6qndg3k5coocbx2h2o9m8b6qfuqal7hk0djyl3kaevkfspiu',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'xa4be1cqtlo8xgh8e08dg9ibps27dis423fw5rldli6sfpxcrjfvrxteq30rxjzyux6htv4zeykdq9zmyocyrpz0l9665wqjxrufm87e5fmcaddyiyed5o5p7eskoqhb6gm9n0ylpub9ljhu8h6tf2wvggpxzawa',
                flowComponent: 'en5qi96vvkwof7pg5mat4xivt976v8vb3rd3vglav0saa83ty394wckpedttbv0itzs0pr0jx9wzd49g9cymlsjmc82gii0su9565mqq0acas41hp5yogrqtbbzupe94nocr4v9c7u33paiscql76zyyexcec6fw',
                flowInterfaceName: '9ujpz4w9izpib6ljttsmy9dslr6h6yio0kz35siy6dwrcr6ybcm4x2k3ojahi7intvewrf3ordewjwkin62cb0oh75olrqq35nzlnxs1d1b31c0uh65f0ph6ikn1wpoymlnl0hu4fjnzkxs5ga3wp2vphapsix45',
                flowInterfaceNamespace: 'p3eiowewlf4elqgf50nmizbt97549xc7nh9gn9fg26v8j851s65gx2x5s3cwmyc14shww727y007rn0yqoyi1jhfhgk8fu16c00zox7sp05lut52fp0tsvw7thvwgm97e06sc9sif8y86uv5yc505e13wmun03bv',
                adapterType: 'jvd99x0i4p57lku4vl99xxxeum6w6ok7qhjil4tbqjadnx098s2bnyjnuk7v',
                direction: 'SENDER',
                transportProtocol: 'o7cg82ywwn3bxratgpiycigyltjhla6by4sj5hepdzed8hocex16rmf26znc',
                messageProtocol: '147sfdnkzpjz1bye8vjh5387zcqfb0sspnhquweloh18cibf7aniyifqfh15',
                adapterEngineName: 'axsix9no84umu89647vu43udfzzwqp0b0rv70ndm3mg36qk89c9peyvc8e61hhqdsvhw5x97upakcyoaizz79vmy8aa32iw1pepjba66rxqd4beop6eajgtb8l4j1modviydnnovirk4lixwu2hbjgdptquiscq5',
                url: 'xy6j6cwpiv7fmeycvma34n8gchkvazyq5yatkswvcslaqc4xig6gla6rpq8mde4jof6qn0yu1jurjrpp8tv9vf4dpw94pfw9l3c1l89jbusmvgntgvyrzz8e7ynm8m96hr8bxef78jr36r3kymn6d8ixq8ntdn216ow6socsmmbomw0vkpsf5o6pqypcm5l82wqhkt5s649skp7uqgrx2hygxrfcifl3wanz1it3xdto8eeb5owbbj30b6j5yhjola7uhsne223ihh3uh6afq0wqrgttlcrgs4iihkivda0hwayhxzxu2dktppghc8aa',
                username: '6jr49i8q3u7lxf05ysjhpyc6hw0onzjfhpst62tobbgm0ygpyvxkdpi4f1w4',
                remoteHost: 'hevxhal4n0u5lkbjq7n4o72d5sja9tckcl2w1yhnxe6p8ipo6w2vc6ybfjvm2jfj6w8ejg7846bnv91hltnvjdfkybm2djru0rgbva5hd1ao2jp1qf1jov2arpy118w0zkq5zx9g3qsyi1kd0m27atw0mmubkj1w',
                remotePort: 5057436169,
                directory: 'zzhaaidw5ybu4wkb474wkv5is98jwltjlbjqcfxqvlrlxumdkjp8c5lb69qys9vm41jp8xlr0d1yopvchgo5hqzj7f02ivb0c8tj6xg202p49v8wvw8fkgvmwfj187t7feitsmu4lvbc0di5v3fdsmm997s3pe8flimkaq21nd26hpudpiu99tw5qnchgqar621m4g3bu14wd1vwngnqbbe08oke7aetfi2eji561goclo1ps9et7a9n6vbmzuln0t6bpqev9a2gn615oswm6r90zogwz08x0qbh5a6pncj3epcnbr8slpm7xjis020q78qwada8dkj5mi8el4v547td2fcx3mvms2uhnah3vt6l3oef7ml0xqm8s0ty1yvmejxlh14vqbujdeenvbtfo4wyhkzeyh4werdof90zzrl3q9haur0brrlolkyxv8c2axucxnhow2xn87d37szj0jc29z9q952osphh5ly6lk8nvp1mug2tvji6ccth598zuui2xkt9fm241vvbzilygl9mi3rw92uzwq44a0xk3l71g0jxlsdui8r1i1m5uptc9lf1qjeir0cy2j0xbb4vu2pd3xm4g108mmm6xsggybc56mys1od9jnfjlhyrp0ra8nd9xl2c74ebz6e2qc65vyztu42h9kpimdgusurn17ratzm71ka058w747z4i31y5eoobcd3e0dpyunqn9wilhhzca0iyt0oaichp9g0fjhte5dkyqlbn3ihm1k4byftu8y7qw2mya5uhhgge8qc0marfcz882u6vabiod60bgrtl8685i3gpcuz7yiz9zpewxku1mdk8se9gpe6b1hv3x59n4sc1mr1xbd3auyeubj256mqkhu7ls0wtge6hp8l2oqr0nun6pcm8xjcel3ny16bsg72fboeb8j750i5ep0is8qnw7v8qevav9l4ffgls9ifsjui1omjze9nj6lvdi53guv5bd88bpsn76v4q7ehju60ch4duhjrsnzw6wq5',
                fileSchema: 'zpkrv57wpfkfwo5fl6bjf03m1gjqkg7zrhfr2tbauw4xcne2ryrb55v2e2ed6p6rwcmkfm5bi6meg1o6j79hd7poaf0895dwnof87kod6f4haxljyjfm7o4qe73cp776n71palcqnf4n766mq0yqdnlgxtnh6ry91zsgkpvrlrg9v173vk3wcq5ungdoieo74p4tx2gqp3t7h0lctua7wpv8g9fmb1ei5pbyxgxzsgcyg74lnog9cyn4njzh28f3dwkegrx2jj1ad9uz0l60bwc71hvb5ytoyl94ggs2htmkdch51u0yhq9rilqzjbhcg2cau179nxovhp1nzr2jwy205sbesy4cqqlouf3cy7jz7ux6432snn1zkwe921qxidnjlwr55uvqpvvf5jwgtlrjifhybd0cklrzpvyf0vt1jvcz7gr0ib90m1lzn42v7eq3i38pmv6dtnpqfsnku557sbt6yge3j0fo2drm4uokurgaebv81fc273k3ec12hp859j9t26grzp2undm2cbzg5ohfwpigg4y9vkrg8zl4ks4u7r7eymujud1x7n2xxqj9xtfkgz0g47wj4zt2h4u4ggaohx8f9atk8rxast0r14h4hvxxaqgo81g7jc8mjsvmm19cwii5y66e2os9reglsg2rxwu6bvv2d73uhy898ahky8n191i013o3u5yzwyqzhz4b63q58vpp4crb5zaixbdp89ucmhmmikye9ic0h08zlgnz4zh7o5tw01u459ge7m70068qrmcg8td4kfrquo6ab2hezzp4a7hn8xwjzcfdbe6pjhmrux7getqzvvxdc91vj4646cmf32acihyj5iu230moyoizd2gnthpwd5i2q4ms18bfam2k22ft5y2825ckbe2yrejmccvvz43af4ch9f518orgynebxbc5iswh0u6kbyrzld4gsciqc5a1adyk15y9vb9e4cdqooj98q3b3h0afli3p301lv4f6lp7svb1hpzqwok6tuq5',
                proxyHost: 'sue21kpzdiaj6zbkhka6d2zy6inyh9qeq5trkos729ecmm18825h95vjd4rm',
                proxyPort: 9473275786,
                destination: 'v4sscreiy09fqw61v2pgs1rgm8i1cp92wc5tnvcs82fmuf0jv3o0dtfu3dqf7fe00e17ttfcmo6kheg0t8fpcv2kwnuknz74k6fr6r4ax3j7cgtp9uw23j01920b7mg15pyzwgwbayowfy2dnlgt01i0xt0sw0uj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5c9knehzcqiiu5dq9q27i4hqhciluplo5zxpteozb5k8sccdqo57sxq0ze703u2j893qtnn3u8dmq04hhhqt57c99ot4f39ss7t0k2k878d747n2mqsqzzv7h5a1noos291h6761zoap5inqajdk2f9q6hjvl178s',
                responsibleUserAccountName: 'olo2y8jlg96kbyewj6st',
                lastChangeUserAccount: 'kyv7w67949550ra9p87t',
                lastChangedAt: '2020-07-24 12:17:06',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'o8semmi92mzz82itrfis54e6044thtpwul60ooe3ejpq36c5n9',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: '5uzrdbin6bg15p4m2b794cefkr6mbc136iwmbccmszcui97fn73ah8cpfxnnfy701h2vtlrencem5vauf21erb4r3s9ttcwd6s0r95ifxhe8a6n85inf34u1why1eh7ajs41e7rm3rqraczjoabc4fsqdrc8rzzt',
                component: 'wpivljhluhheuc96kpwia4w087iclj0ky152q4gqwoolzhilsl4o37gun5fyhnp4sqqlg200ht6idclwnwzqkvp1hgjlotki027xzpsh3vuzg7m4yayw7p5rk800dao6vb86h17z6vqyk4216fwnuzizxjcoiyu7',
                name: 'guxr205513dno1ulwybzmul96b8yren4j99i2l7sqofexdoo4e45e2addxmwxgvd59kpjf1zwvqfxjhu9zz70owec0kbny5z13tylwwf8xkpddw5wb3e86m9ncp4x9vw6kcu6mgwcorbff33te3xaqtednoaly6z',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'xcbtwy9nssascjw3ovjas3pskwxmrdbferdk6o99sey758o351jnjhzo2al6w6mj547b82mes4zqcjwru20wofnbod2hyycbmxqr7aaxb2stss4ybjyec7vx933a3f8bau2k6t1gn4x4zeac3f8mrriod7m97ies',
                flowComponent: 'tvjzswv5eul6eruibb4rnxmu942u7yp39sk6k6oza6rsvo491n29nqis98nexq135vttyc6i59ulwe06s7glntg9tll6cyha8z24a3ed1s0jhxe4mweom8or9g4ui6qw5fzz53l5lo7wavr9ahddol098mo9e2fk',
                flowInterfaceName: 'zcdexvtcrqa8flv6qni3zv4fgzbe3ymo9raag0rypmxvoe2y8f2ma1u4dbzppv8k9hem2q0f3x83mg06izob2jgvc1s7j6bhyem67g46jbfk5d7r8whnd8pkt1l2wf0ixpnld4jerf06v83ir29xgp9e2kvkdd5z',
                flowInterfaceNamespace: '7g2izh2ud7xjekj2j8q4g17zfs4i4rgd2i0twzah1vhmd3cdyyu2iom7joy6sr2zgnomdsbamg6axr6p30v5prqpphe9mmu08uw3m8kcj9hi7nmql4r4epxqxk81uojkcvowhuis57sqxehp9sh71sfotvx20zch',
                adapterType: 'iynw4uqo536r9w1ueuz3rforgu4a3xnw0ae6ftqzv9x7j0dxy94gm6w8d95v',
                direction: 'RECEIVER',
                transportProtocol: '5tugftevakff1b7xmmbhydkgtk83urzhruxxalnrwbyrr349dkhkgjjshgyt',
                messageProtocol: 'e7mak385h9a2fv271hbbk75hbozyjhirmoj1hqkash6i1nzma7czl5kcm0sl',
                adapterEngineName: '9ya8pj5w8frfk3o33h4c1ieean9r8iuypk75rn0j10dsfbu3ch75nh883cbvmm0y57ci6e6sfh8oi3b4gc4jglx8ip0facj6ov440gh5tlcrenkfgqh04f4sc76nv1z5xp2cup3ifnwjyeajcg9eis3u0xom6a57',
                url: 'xcdu2ccvpper7amicfs0m3cbtdu8rkzcynvtfaqw9xjnhpgcfb2z23fvsqtggl706ufm7ov1j1xqv6xd7bajwzq5lr5x159tlaz59979lanebifpdlwx5avtwo640ejt60nrdkp5j74w8953kxqo70q7merft5bzva04ryfxa7hkkmj6dewc5aw6g0x5b88tivxi2xrmp8nra9q8cqc6bv64f2ldciyctshm1rmfp25ua4jqndb9tg5huvv9o4xcdgzlzgv4oerulnx8lpfe3ojmz1vr8310mopvwly84kzqwxii8jaara55yqrt8tqz',
                username: 'vzznhnb7npwunzykedqawkblon32368pf5k3o86yzyiw503yg4yl7yvjo01p',
                remoteHost: 'rlnjz9cxzgk8myeuxw5usedw23t9y1cb6w9iaa1talsu3cgsqs8kxs0z17huz8nwr0u28d81f4g425d7qbf3rko623t9138sij5sufcomsto6jnqf554h4htf7ewd9i5fnq401odh7wfzg3gkv6os4bapu8zzqye',
                remotePort: 2638047518,
                directory: 'dpgd893hnh8ofz494bphxlrxi11vsk7do0mfvkuic9kmtatlqyupgqxy9mkubau4qqjz1ptzp1763bu80gw2qnej8hcmzdm1vwr34hsixrnw35les48xjx9diwws96wcbh7mjxw24aqtfwc5ue7bbfz4ltp4fgyhun94tk60a4rao1k4qjye20p5jozuajpdf6o52t4uak8wo9x7ies63boym8jxp9iwr1adphibt5so6f27hv4mljf91e1s2rn21wrokn6v83klfxbvg372gef5q8w077pgh2s6tnifbeazito17osp184ug1yau50ua338cfzegq10aofpxfbum0k0c1v4d80r69canb5gp71t6jbt1f7rgmd909unb7lk5tb5t4qz8m0t24oes5r6clkg6cwas4b9w9kqxo5c61v39f9qu3hv0gcdj7l06htyod8le31xl1fxr61xtzz81epg8nqg1hitvfmwwa0te7dwrygqhajdoj4fxh4r8t5h0ehnlyiku30iv8f4qunzch90fhiz9943fxrj96pk6rdf7olwqyfzolh3k12o0q0boavawvj0pvvds0oyowmz32f85dmylrqh50yy4ij8dt9xytq7il4cqihgtpxm9stwc2f609e1tg7a7kachv3n6rd1egsn9dvmeembw00w2nh4r4pcdbzqq1dgay7nzd4hq9hl0ch4o8qp7ncm6vo7h7qmrffpna8k8avbozszcf8j6izczz5aw49ain2lf9gbt37s92i0bya0nm3i7jpr9ajbq4og2v49h0nrljihecjh5inkhgtxhlwmg53efm0b89v0iv9cx6oisex8l1cn55v1dt1i8f065k2k0ogn1t6w5zjhyoepzws103oumx6hdq65i6krwsosbusaw6gs1k1xjnyku0grn53oee1dz9rcnsl9oex90c4lfjrc9eb82hvyl5orjlc78f4533ge13oyuui68ehg7ss5bu2bsylubxd671k086uoykqir1ak',
                fileSchema: 'j4bnicezozsoifulfxjxy8le035pex1v04kfja0v7wisiazqj2xzves6uvmo4hbor1wcot8w89pllgnslbntdhay08qqulvfwh0i68zl708p4y8aidio077ihcth8rydjhsuijzyzad7kpl04vh9rb7rur7wdmqpbkrd1hur7tt3i7ohv8kfv48eg5qfbbogoj0k1e4s1euqovcs4uvr7ldhxusgpx0sqfpx4r654od4utqtt5uwsgps535ppeg6x0sfjtsf6x0opwlaqd1pg5impla18gog155n3kpno6if7mks9gs7o1hlwkpfcv9ctucj6bkub1vqx2kqtk92y1po5g6ycfxej21ots92552dz70fo3hkdsx9a69nu4h3ggj60hxgxxkt1iudhyzgfvipl99m7926xz4jpo98zf7namcuygcveykmtt2zf7nva6o8ljuve8jpg0dcrg5ujl0j1j6bwltzcv30b8659cp8fa9l7f7v1r0dutri8pixm2luhvhv60y67nh98yrdxgumgi7nysu8uxf0hgxaix30nxkxu29z40z4puj3wn7u8wr74zyip3wttgcencr5x7ggevajs5vgjqv307isnky6hlotdaqyri2i1pbvdgi38ykct9l2txe2vaijsojr8rd6nrrc32m8m7euounekok40epif8aace3g25jfg9ukqy884pdtfqwj1evmuzxnrmwez30q0vexdlk9vaee0n6kki7ra31j0ajfxymznm4nxf4v9cqzr1hfe5vqa58tc9dn8csu3tee1aks88ahvj942ddj2z8hnvs4svjgfjd9swh80hnc9ng6mwlcc86qw9huv59nv2rfbcccnsnfxuol6cs1wpob05w5h4hz05vdggscrz5qfco8jy8fdyjl27ezglsq06heqatrzw4kpi91ntqrpnt5rey9f7bb3fy0m95yzd6d52slupdftrm90smzdytnl4a981zaqt6nrcssj18cutedz1bg2vzehqv2',
                proxyHost: 'laaii8zy4ma6laxkxn7p9pcsl7otw2gheeyw7noe6g4y0jvjr8n7p9lvxplq',
                proxyPort: 2385219465,
                destination: '9sp5hsyf1jmrznxjv7t2gjm33cc48ymgyuyxknagsyr6fgu6exrzif9johfh6erk8a50cnz9xmfjvf7vk3dmcwwq1mti27p0lb7jdizui6qsuzw64d5yybdarge53bxzkcw8qkxxw3fywrimwkz7yexif7w1tj6n',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ddvo4czvpo70n6oun2v48f72nvcxzdx8uvcai7wrw2bzn56f5e2k2d6mspejzymakrsq6bqp1sa9z7jy3nzsmoa9kgs9p15k9m15terrzemyhwsvez9zbd606byel5dmcrew9tez3f0wu701zbb5x6d1gugfwnd8',
                responsibleUserAccountName: 'ra0v4o9yjb2xv8zzigumb',
                lastChangeUserAccount: '4qr3hs53slpttw0bioc1',
                lastChangedAt: '2020-07-24 17:08:30',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'zql1kkbggwsivoes6am8ybqbbb16ghyvl6l4gde5z2334jc3gz',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'p8qv0q9ymh80nkhnbgwmq6scbixqju01robs9jeqrzn3069ro4fnsunr87dx9kct3mptyw73rrhq2b8k89lfxo6nggidnsw3qajdwa22wacn0dqvb0ggvye7adqznp97h82csuodiuy7ekib6ueizhuht9lprnk7',
                component: 'vhd18zw7xizidimvr426qx2pcovpifptagrh31ic1fedfpeqxrzlxsa1fpheemtmitd36l2ivrw2apmpm07te29je9rxe8yybalxqv2n85w6ydikn32c7j12fug1gh8uzisyh00p4jv8ai7m1pvh00eo3txt9dfe',
                name: 'v3qi42wmgr38o4mgrc7spbgowrfui09pv6q48lrbb0fj84ntp1wqe7i6sjo2slnwpu7vuy8suua7dpr0lzqehexassidjq78x6w7ym8e8iumhu518w2ugzgu6gxl1mwyilrt31r16xxixi6zk60lw5c860ui82u6',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'q4fkhqkmaigu34hc89zo7n492dfoimg086vkwzatqqptq8avv4ijbr3trtbwd0pyzg9fomneap485q64a0byw6y925jso3xpaxgxexiwkok577qpd73ujm5zodme3wp8zfpcqnhbhgrh6cq2lmorvlqntzm1w19h',
                flowComponent: 'snb91oj79ie7fv55w51tuxj4oru4bjoc2y32mungw7ybrye84qhhwfemfl0rsmmwrh0zvd6wfpp755iiwpvh5pe75yhn29xgarmi54pyg70z0xkl0kuldus41bcmcypzi2djaujpcz97cbrlua36lug5tvp6auux',
                flowInterfaceName: 'whci2p2emoumcyvw837c7rchfbpu0uaiw6s8w1bek4ngf72ff3q3up413kcw1fr6118uv1hlt9wmy8a7kx8qdwiybjv9fseaon6c518q58vkt8f01rfladkmdk3g3gubawpw8bbke48g9d1jxjo8dtkvpx1b2dio',
                flowInterfaceNamespace: 'ezxbm56fhy65nalc5a90k7klr4g6sw2vkedfzq9fqxhur936fcoj4ru4ocd1aqa3zbpf2tcxz9bj0h8hzq6qkgbf6j41s6flhm48bjjqv23wrca3rg3bfl1mrslnr52bu2lw9kt2ohe292o9i8pobs6135u2e6zi',
                adapterType: 'gh7psz52rx9ape5rrwzez0gaj5vncyghp2veekx9bim6trmcffrbkcmnli7a',
                direction: 'SENDER',
                transportProtocol: 'hkdea7fcizlpble5o2qc51v7v1i5kx5inrf21mlxz56rz5vo3e4qqo5v0epa',
                messageProtocol: 'z2jqde7aqyvpiiq5uyh37n2yvbbuht84wihsonwbrdjhsf6zu5glu855n172',
                adapterEngineName: 'x8a1htw7oxn9zh6u9gfeon8om9siy85knc97h1ytgqyvgrp53dxru7msr6te0va7f8ysn24e18167d4vvmbvtlzk2l8iw06ty5bjx1810co8a2zv55s77k0kdcgsrtal66ulzqhakdo3chyoph5pad3im0aytvh8',
                url: 'oj8tn1qdkfnr9rt2hz0w0pkquxnairwjm3yplna4e7ep41sgom9lrw0a8ju8r8zdtej6lonlfxwulm6x2gtb6y1trcobdbprhb9vjahp5uoxm1gb17nmhtwp9en8d2117ofl477h3o8s8189tvk0ctxpg488pkzczk7naggf439kf2mudnz8hc4aw602hoh6mukps99up3hucs1mdwi3ae8651mkly99f8ab0c50o7dzowiia62cn4atnwqsh8kbuo6lka01yutqr5fojnlkv6ixgwiep1r9hr680alc5uotb8ub6pcong0vde7tajbw',
                username: 'ecm7gz2fpopvkc7n0by65swvt5flu5kncl69kmisfrz78pgjgm3470aebqzm',
                remoteHost: 'i4xz2pdgrobm9wny0coej9tvwxeu0ojmxab89k3j3xspqqqvb6to39nk3zynsngvojt2qe7ua222o7dc6t7uz0wdhjhvuywz1iaiwl0ffroc2rj78hvf4gnfo9weakicpfsvr6s1c1kh47cmc62y350bgsedvut4',
                remotePort: 1224926781,
                directory: 'trrhl802j205f2qxsbysgv4r8pvz8u83rwgv44cp9zlfqbete4duowgz5yigvend0gfhgow60scivr7zzjhc7pks54kmigxmfkunhjva26nb8fpyhw49rysqmixfuwhf7iyeps9p8a1c9dqna3lupkxrbajdgrc2o2c4ajzalt8175qm56dw2c0c9dps4lf2du1q5eju7yanw0si6j5btt87eq4oene7punsnlfbqklrfvhaerx1unlmuoxgbtv9fuauywwbt8alyqrj7x1marv3jp82pcugvq8jye5bbgbb80z8qc7b3v008wy3jyp3vv1w1tkz0zadjdt7cc0ezqmqbov7zjdexlaij22u2yer71q2to92zlg32pa8rsvd1vo0hftroit5vfnlye1erv41shybcdvaqn0idya5hf2p8tmhcf5xkl3ssu6q2yf4jxa94akd2dt979xklxhvfazg9sleskg3mi1oj7e0k2wloun6f7q3c7l55rvi0si4u177o23hjjmedyzgl0nshcojyl8rkfr97kk5s852d68ljzqm30nwdl6blvvijh0sruimw68pr100doql7j7n3c43sahcjcwsxs6jolmqmscv6nzruhba21w1hc1c9w1xqnp9q46x38ynt9n227o52ojkbmh6pmnqumo8czcy5w9xfv38h5btou6i1erzx5affisydprroewhggfuzt9dakx5jzerrfi5e126sqb3wgxnt3ydzfmdf4smh5r1po8si9w85v7ypddws0sg06bdj1rfkxhqt4j4w70b2j30hx5h1uzbur3aam4q9k4zb6m1jebuqz2ju4qvjzfpbnr5ylxi2ipd9bgf0q7rr8ze7n1szi65j4wy8ysm7mmzwh9ku4zrmw4456zzjawdaibwpxn9vkcqa12tvxrnvzgd4qvw7sums8prfk9n8cwric5tjvkxy4qwbicxyoqjernmotef1p6qxh7xutyw81ugra8oxhuv4xesrq64a8h7piuo',
                fileSchema: 'ick6x40u9n9lg13zihpwcxh7excpj5tt6gbxm8dc9ixnbjoseakj9z9ogug8cm370vx4t1ah8g9ky7zntyuythdkddiz0dzfd2gpzwvnltz1b0i35o209y09bzdqiy0xaxfk1f4setkhg9cbdd2eojjr632m4uf6sho49idlqmpx1fes2dn4znmv5nb83m3mw6cdg2gi3iisnqsy1z52du815kulzpt44x03h5u2ltssu526jy0ubd5prqfvodq3w2mgcfzkkzs74e8dz3118uaz48fww8k536opgnm71iuk6hxg2t4bp8qk28qvbytxcv5rolv0yz93y4zbqgci3yp97ijd22v6b5xeewni8osstg56uddn2b7ftdc5pa2sj9nugmkzuk34nyoudcj2ivb3j7yctq1kinscm9gpqbw5kseobt21y9ojohxyca5dz8ntlij2m9p322xhobg3ni5fn6nnnw9ldtxbfgw7gsi4bj9y9c2mvtyq40js5eaxgsm91bf58h6itt876d7uaujobv4kgm9inf1xvonzbeg1by2mxdlf7n7rhpl0vpt5w4av3fyoebcc7gljk6bxr2a5pzpzajr7ddcgenxs49qvp4hsy2bt7gexpps44lgq3z5idk42r8jy3pen4si9o3tj8to1jg5mml3otp84x573ruc71fbmc0uqbuv4ll8kvvk4afbv5e85a68q8vqxgm2d1de8hefnbpy9uj2tuvs3dqy74b72knxgsa0wywpw0ndv0joudyr6fl24wgkevjaxivqr75aat7jw4tspoxx1z7d27bx4dsmwy5iwy246i2pwtkbj1cj3cip5bjfl2uf40dxzinzoang2jahdweimr8hdh0bjgkx46uu3y9emxnf0s7ctcn7h11zk1gvno8a19axq3x7kxdlvvmcyu2imfyb8amryxmj9qtc4xsyulx6woo20f6q2l0hha2nez2uqbl2b9ofjur6wqnadn7onyv9a0flircyaryclxueu',
                proxyHost: 'vzqrsu1kn7fvtbwsqzmmr5k9nv4hhdm2akzw3ggjv6chnhf8tsevqtvctkvs',
                proxyPort: 1468667384,
                destination: 't7hx4n51tcv0mgi7uwvcoie8wkfie88kxdxrlia73xotty0y5ubrpym9o7bwxzszpvmix8vl2mmdhs3yfc59tokgpi5gxqo0g208p6hm3du9jxz0pjhl064vmfzfjjoukoetkjsvps667gfets2cx9a0u2ou66gb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'flqejfnzz8zefvqceg6szz4c3ruz609683dexesx1sf8cw37u7drjl735wjc29shkqz4qjn3nrm5567gsu6xsiaml1z4qesk6rlhuujozw9pgbtw7v4xn1f6g3vmubgiubvcwfgiakf7f9bqdlhkkuqumrmivo2i',
                responsibleUserAccountName: 'xk21fqoeaxv6vwcvq540',
                lastChangeUserAccount: '3pusfbjvvdb6c2tpbpy6e',
                lastChangedAt: '2020-07-24 01:46:31',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'z75y8scih2jqyhjqcf72p26ybswi1zoaogqo3ds4t3n19hgx52',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'o6on8174dav1h7e62hfv8k77xb762atult0hgson5z34m07qlten4lj6awhcrpg8jugx97vynxsegvepovoa2c6shitmzn3wxq6e6fmz1vsfbe052q1te0kpd7z3wd4ray06brcm61wm1l8yywztgvkuphrjdg0t',
                component: '4rkkup0zb3b09k6ibpp6ijtp8pk7erwztlsp7f2fft0c4q7hnc0tgj9cth6zc4h6jcqh7w0za7nlqcdck62zgpgrg34dlmdu7oz82r3nx9v7flo3bop6pcxu716oodpaktb7xbgfbdu2il5twq9g4ezrjmso7va9',
                name: 'm0ajlsaqb4hfokzemhue1k7eogrzaz0y6v5jvfuu9lohnkswuwah2kt9une5uak20s49tog23pj8b945v1ce2anw8f1f9t9tflwibu0o31o7o8ghsi7vi0hrjezsccul1jkxdk9hcy42juolff0yabns8h8fjgwc',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'yu1k0g8yrvgyvjdnklqp54bavrqunyfqvyu4dtcib11242ixls0nb6eww54k99yobnj5j0wk89u9mkozw7ra8sltl6pluu138bys9jskmzoquvc0gwcgj4rytrbggaiw22nuwhpcv5e8ht1fndnvb36gd9rihdez',
                flowComponent: 'rczv75njkdb5t25iavugo7bk56bxtw639l962pv91m4o54o42pupiyuxdekezljqgy2ftop8vqyd0ossr5efpng4kuannp100sv990f8dehfjhyeaiqfuwjfxfw3s8s67z49gcizzum702eycbhjdp6d32zvd9c4',
                flowInterfaceName: '787wmh52b2vm0imxwhdqc1c23nc8zy9rhzmfeqebk96jzg5q5f6f2m9xccwyknkncksvtiwrnew4a6k0g1udpw43ja8irlnfktbonnr38x3hzljtqvacqtadyqllot2kp4vmu7s8npi7i6dmt4y9hfopytiw4luo',
                flowInterfaceNamespace: 'o4covqt3sj39bznt2xmn10ntonficgtrz1nn8cn4siue4gvo2p9jjjgkdoewp71meu1k2vhc7b90wuqgm81l6canj9oqmoclhaue52p0hgzs6t8cfrhe8neclbslv0n6xu9x4pgopi21xo2gnz5n1k2wokhxcegp',
                adapterType: 'xl4i7zufm7p5r20fulw3cprhc511ioppk4md6fwvb4m7zk6ii1b9eunfg0p3',
                direction: 'RECEIVER',
                transportProtocol: 'jpwmxxov683cj9fjgh0g2gtejp27r0wq1a51tfic2v7nr75jttv7kudsxpfj',
                messageProtocol: '1uw7e8qnxjyfyzxc794o7lm4ur1gfodqld9s6bch8vpvm71wn8n7spvz44fm',
                adapterEngineName: 'bhvs5pbng64r9yp4gg6grw76h4z78f67xekjyqo3oq6q1k1n5voyec5v82nj0hrm8ipnransvew2m86pn61dckpxwiyoexkxpubryesosq7rz2prbpguaity6rlv5l5go9c3lvgbv678mdxc8fzj3rpm7o8aq0fb',
                url: 'mgt0e3wkswczxr52hz7kz9h3iy9e68pcl14ix12ex3z1fbr76xdqtd9x556u18z7yy2x8ufxwspz4shacz18m9bvdto78t1p2sza5xlwuz9pvdydtqitlcjnzp16mmjsz60asia2w2kdaodre1e78d93pkg4e535l46vaiunook9zx3tcq4myy78kv3pig946nihd8dumh2v75w6dbtkj5a3aqg81aom6npmknw53y1y71n9kg69r4pbybp39xirll6glvtspgjo6q1hn2sj5um6bwc95ln4s2ha3jlyy5eo0jsbmn21szcosk177c73',
                username: 'a7qhusx662iiolc1v9h5ga38vp5vvr78772g8wk8ipf61lj20zvapesk3ifm',
                remoteHost: 'gg8sfd05jkj8pcaehgzfck7dt0rg6cqpwo35ermoti0mrzoxv99whks4rsqk8ww1pox4ltdr4dc8xpjzefn3zirofxko8408sgsyzie2bnuwm48od78hsux3xrdkg0a2hd4nmy44z3i0ouwjv7s5bbghg2cvncib',
                remotePort: -9,
                directory: 'dq1f9m74k12l92jg72kvzcjr3672yt6sca9vjmzh5ud7r06uz2xk45f333x8f4p0blyjpzx6alebwxykpmss7divzzpmlsikpl9l04dr429zzrp997t58lxffpmzi55cypm25dy9qi7qhgijbqbtvt1k0oq4xqmy1d4z9pio6vz1iaojyh1739rfdeqylx1fwg4nkgp7pbm54ixsx09tk7k6zipd2vn486f1a2u29az7dsg5s7e9fnwznrgxkyst67vcdaqq3cupzl1xxlrhsa96uejc8qize8di6v4aym40wvldycq4en9bl76zx90r3hc89ebd2j0vtbp9uh552hcvzxpk1ad837w5g59xe49wsxplxrrdvbkjiobypv0d4v7pby1u6v32fms2f3blkgu45gsqptifo80w9uepo54t9j4ahsh8n8bhc4700jq0wstjvt93zd0dbdzy2s2ljut0l9b8bgt3wt7tvjacau5ke0jgqmmwhimc3ctrk401bfolgu39jnozo76fa0s8m23irhz4sikgha444281ffx8h3it59ic8i4fn53cyhexao6tecm0qcho14tx62n0d1yvu9abvr7l6dtt8vl5xqkngkw593smaw99iro4ekv6ysyokrz9v44jtjd10ql62i78xnhr9if230k4ar1h72u77y6iey4tvq10y5exmdsomehyge6dod267mfzg9zfgwi5ftwx9y86b9ahhqtvef55q68dvbzkt50kp7fz21pkfk3t99igtelnz4bfe5k76zg5od1vfr5coa4jeak87clod8mtrs63ilcbgudwta33fiqjktv5pbnyp5wdcm831m9illvv9ptzefo57sp1wudk106a1dp1vnqzdf0si3o71ha2yl1m73a491nlr2aq8vtj4p5ujx4ln169ihwc2j71rc9cgabvpm3gq3sz34bc3jbk6ksbgjn0eky6qjyyh4di1sp0oip3awszgmiaea62ohdl0q2vyyupvx144a8o',
                fileSchema: 'mwb31yxp5jiau343epcjpxivydo4lcx2a098amyawx9qvaq6dy9hxzn00vf02nbatxige2ybqxzwaz64hnmsie5pydm2cequ8kiw4ctssfkvc4ucmjwpd8ljlgh2c50j27khjnguwhq2b80jso24tg6icc4zo2cgff6cbmf1gr0r7515xk8el3zaqyjk52jux5ikpdpbi21rteogorezfnsc0j50rby3g3i8h4t564vncj937cl5jijy2saab66hkavj2oz2egnnctwt1isce7ku7u16mpn387lnaf49qrpm2y9fb8kz9pde2ptezzdu7g1ly3ig3q07om8bqhhkz2n68nltkr3bwsycz1hu82psdh6pu6913pagf6syai606bgzxahmgg8gae6oorohjj7ls6r9ckl4uaesp80t94wju5rn2f64pk8tvcqp4g74x2i4zgi9y03qy447inawb92agibgrsu8oc9dluk68inf3jh3hpa5i2t66bqaa0m6l4k6n3toq6170awp1xuhabyn31vbo6j0tpoc15tuw4xvynuhsk6xts9rtytg6f7ojkkhprx41nvvbcqpni3w3l65awed6r2k56hhg6o4deq68zbkt94hbk3rb2mbtxq0xe5i7z86zv8o7s6k7y9dj2q09j39bwxyelashutsza3z87pr3m5d0x4qcpt1ry46n0lizyog6gd61q2ml9agj0a6dqfsfyr9bl2qtcynwwtdz2zulivjcm8l8vvq6ek59dp5vmjnp2v5gamcp89xh4p0848k5687wf5pnm41vld6vfvsbaw8xp1mffja0t20vhf9a1z550tnc9rjby3ru1rclumlajs5t1wg1e9jwgzsec0slu8fyy9o32s5kkhk9ts5xqeaigo8wfyetizw0nhxy60we28tjz40j0hzt62lzvlt2q18ayknqetm2v5xucwt345em49m51wooulnp0gvdf98one4zh7ldjzwrdfbk7fo68sn7pxftgbscys2',
                proxyHost: 'sjs8xgqs7kytsnv71h26z3zc4edl1zc1sbjtk3z5q6z0wh8gdobt4pa8iuos',
                proxyPort: 9792381394,
                destination: '2utr6ff3pzzg8gad1557im7h6s0iwu9xyfpxzzisq3k84vibmc44aetno3emyk0cnch85us99qowwp5nw94qiul6dll6c7ukybpi6g2gl63u0rq047lgsfbz95bltmgta1u62vd6gzjaap20dxsasm05302yq9pu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ujo1y22cm4ei357wpta2s9ae8nf7x6lunwjugta9dtgiarhy4dm8e13yft529kl0pctvtqn0trxr7zijjpg39p3sjetv101b7id9dq79yx5ro6npwfg3h9b0a4kni7ga6uuo4odhwgjrmfzenaou893hcx6ved9p',
                responsibleUserAccountName: 'fbwnjesmtipif8z2vpji',
                lastChangeUserAccount: 'blw5ldh1bewf4a30ss67',
                lastChangedAt: '2020-07-24 14:04:55',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '34ki3t0zzn82751yaih58fdhl2sasl5x534f7cbxdp2ebs82ea',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'qo358diipvjn5pwxc5bipusncltkzrtz000b3fnn17jm4imccaglimol2v8oy6v8ufbshzl186rdx0m235mv5mrku79e9fjievg7rck4t6iwqq6rre9t7yylc2tmymonq58k5ps0p56uuvfupoycixh4mnqo31p2',
                component: 'e3f7o7dlipcy5fzvwrtuvypqbmsfps3hkgpmba463mox6is4nsa429jdpm2dn60vp67b9facn5eragfyjzmc29nxzbmcc668y1ea8kx6s8fukca3g9nkuwz8o8xp76h9ib3yrni8x5lp4fwyfccrs4alqefsnczr',
                name: 'ju1g64bor6z82oc013hohtq8g9x3n1ie594rtlopgg9fk3qymbkzo2kmf19czi1yiec1nl1akmiqwavophvgknknwqw3b5fy9vcj8kmjbzlrp96cl3djtg8whwj7tj6l2dbmpzolmdk6ahc4nv0p30l3ulwy2ef4',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'iwzqna54951pi79youx0xh6jfb9uro1umr6n0r1ezrertcvzjyi9670le86rmr0wp2cj0m9usgshtcnzp7pjyqcdp6zmitm303bc5a1ilujexzmnx309jsjbvf81dyg5w2c511xfd0rg86rr6fsml445t022x2q7',
                flowComponent: 'apohhlb7uf5fsq3fxyrpt9n8z4fjrpk2xzxs45b11i7f7aqy2txshzt0m0j1tf4uzlnq284tyagckq0fpp4yueotuz54xg5vha7i90529n5b2ax5x9wirl1124u3m56y4di04hjk4r35j10zs0bsgy0x3tgztppt',
                flowInterfaceName: 'ee1olvhg8758c3giq1sf9ffsvo1xksvsrnho4g30j4236d11kgbd16pwc0awv7r4b2i1hhh30uzbzmhtszwl0frxiss4ebm1scvlynboo6wo1jhd2tfpclrpu0e4lb4264hyqdzqotob0k2mp5iegsteqf425dx5',
                flowInterfaceNamespace: 'nv904u6doxrze4e407cxhnf0fmv8jqhjvda0gwd98zd2fp7v8y7vxydkx7qevl78bxxcoyuxks59hpie7jdcjjqpdyb71aywvpd8m18myx6ftq6x61m65m4gzkcribbrzc7q57cxwkv03xu3ksqsxpsysmm594ad',
                adapterType: 'gdm76kas9n6u3cg4m36yr0g2xbdyhoooluu9o741j23ih4zgdfxdajfyy3i8',
                direction: 'SENDER',
                transportProtocol: 't4mf9caahegua6pm0x1ot5jxjgr3vac8l1s61n2vdmq7bnebkwtrxuoryewf',
                messageProtocol: '15u84ayqcyr97bhuyt45rfe67ue5rtl1s8ag27cyp2yiq8w7mz0nbb14etro',
                adapterEngineName: 'etmbumuw6k2ly184jjevn8oym7gunm2dc0xnuggnyuoi05hxuft7n1l7q9xzmpb3tgy5b01fl0r75bbyc67f6qlq8p0iiyjmr4awa5ktlqkefqqy6i58yevxa3pyuidpd6bckynek4vul8q1c9vxjudsypmqbsm8',
                url: 'amoz82421xwb19t7tpi9odby20b1vpduwyl5c50c34djou40zeyddoxm4cj162tu0opljta0jjv1pen3ml98l7cgl4fselpq4xqbk8clxzvyip4taj95ozxitoyhqn0xbhcvorl0xj35f1uim9y7ye1rd1ip13ub01lmq16uehp6xta18hkblpihb3tm0aunq1jfcgjk36jz6cbx0jd33yfhilx650xadfuu1du7661d640a3lfahhtxfitbbges66hbe03p9lwytgwbjgikkfbg79yo1a0x7vep0zm50moh3xomx35qvkcczmf239m1',
                username: '9icdxu7zcma1xwy9piiln491hguf9bznwrg7ha5422yozsoczz33axf6nusm',
                remoteHost: '8qfgal2q1upd9r5xcbv107ur8txnqzt4k6d0fmemqzd4hbzejt74pagpcew4wpmbv6di36nitcgbmiplmq56quespq2mby7z02wexe22gdxvqkhj8b5awhaf9emnbn5780i6j8ulqzezr68rp2xqk5of0c8m1b8h',
                remotePort: 6181855082,
                directory: 'gcod3thos8302fv8vfr4cfq07sax5uctlmwvfh3ub3lym2i2wxeabov173z3crhu364j1uy19t8axrhog9ft6r83f5w7sz9qmn6lieb7ol04sstz0oe5e3y2pegb8oqehd3jwajizallwpkzta24dzcgka3igf9fzuamspiqlfsm9ui1b2nmkdkujr54db4ote5679aw0gip5dfwevh7fgs1gp0la6nn3aek9nm3x4zzh2koa84roiui6urpj5qsrx3gtdiu0wzs2iwybyrgr80d05r37wu71cx7qz2ptoxyr0x0043v6yvtihsuoa5rjlqn5qxb6jwvaw0knmabvzuxap5hic2qgmwr3zgjti5d11k0e67mk3ihic8tuodi8hocwcibrxjk5x75jbep88znmfad55981cgthjr7567d3dbwi0d9y6181fminu1axee84f0kjblpqwz7qnanljgag6j70eaw8qj5ixk6nphrqwll6mv5o5invyoa8gp5rx9q7150t7ey3c8vzg6ppnca61lvei50b8hexk5frydefd7j8ejwjyvdrskhq9htka3dsujt26z2oppp8ma664ean3j0k3w35n97egi6ni38c1rypra66tc7kchdfni0c0e119g3v1mexcpctwlsxzvbi5wvjt5l8j9f40lyhyl18zstmosghuvhf6nhn5ypj9opzhbmf5697ma0swal8e74xg8tcnpc9qx2sgou8ac1f3jqz2x9e67nzmo6w1ln2xbyuug85z04jkjtfa4a9jz24t8qs95zp2mwf000mcknwdn8j43hd2e0n67eislaiy2b4d5d51srxydio7r3cf5uq6cx62eota2mynxh8pnqukvr2e1is0tgep10ulb803xh6p5q97mqxrrm7hlt62hojd631y8pdl28b1hbtko1o4r2u4k4td895uk6pztk011aofxvskhml3p71841bnrj1q0g17x3r92mrbwngz976amgytc43sd6q5f3rzfz',
                fileSchema: 'einhoskw4fqvrcyhoym77j9ckjkbfoxo29szjn4sk6jtajgh4nnr5nx6was912coob0e5p6exlgk3rmvfevggtgmelixsach0fv4akdrlm77c804ysx6f3b8t2cbxfspout7gg2x6rjt5ncc6qlewzc09f5hchc6d34k28t06mn4be35enu5ovq4re98dv2i04nxqm7kdzx5v1fviyoshi8a9xchk7mkzibapzkfd0234whibj7embufm29ydyb4csqnl3gl5ai1so7a8vu8dzaj6pz79qru8287jsy7seyy2vlj02i7dlckunhadun6a8kg7gxdjvaefo9btmrzgf7gj3bb1lgb58x9qq2amzvtmdmlq8ig5g12zdppo0d5747fy2laeehrymlm97rqis4fnff6mlv8ei3zuf4vz9xvkf3mq9ei3p6f29p2mjgrsgwg6l6255ol4e48ave65o8f75205ccjaqhfyr652xrpacu9uupe5vlok3bc7tu12kf8vau44np7579hddac9sj712q7n4xpab6o760hbdr3415qpkm6qsqtnmynfx6u0a1v3lb05u9e37synl875ttq52lh652csmlpvo4u409jeb6dag86j0jwut091n90mj1ecc7otwi72c8i5z9tij87h1ki06v7rb4pdpmcn1fzyd5cduk3o57mir0njb73wtgw59nzaer4jkrcfb3u81wojq4wxh62drv4bgdtw0g3emrauxs5yzahdnc9as8o2eydnuz6o2o2pqqmw5b26zr380h72rpf048z949o22f14qqelkfsuaq8olwsy39kp07i8hz8hirmnr86d37cemps5dk3owoj5wei8yf2h0eiac0vcmtxvyuw7nk09ihs39379e4omm1w3pehz8hdv2h31zd9a00ce7d4tgbsc8yb4ux25sg4pkxiy4x64oyg7373e2x2i38j6hddntcr5vchx9plpipybcw78vw3mktkcgza7524v347n0n9yrxv',
                proxyHost: 'tbosz8h7t1hn3etv1zxv8inf6hmdlbiqw2xoornadj2rwwhsvjyz868j4q5h',
                proxyPort: -9,
                destination: 'f9xmuvntog5tp8efm530g7wstujxtm28vrwq03yix7zli5hfakjgunu1omhkzg9m3ihdlnzoqz956i0294e4oldp3dmw9eb8tvm0dsenmzxcfc5h62up77o98cj029gyweyvhf3ycumzhrlekuc453qp5eq44hq7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'd21zlhf1ckwp37q232olpt9xvykbrua7tz794zy60xfcado1xwsidpe6ts6g6fqm93u09d5szaq9qoqauib4zj1qu9h59w2opu4m9r4wf3a7sv4gh63mbweigx53z9wy9sdv949ejls5n4471bt18js0kwk0qdqh',
                responsibleUserAccountName: '3grznwijhpwmen0j0lss',
                lastChangeUserAccount: '90t77fzv900vbgv22e9f',
                lastChangedAt: '2020-07-24 04:24:17',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'srwmfj2e8tdrdsrnbg96ctgdobsbnijrht5ywyzdmzl9uqibbd',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'ylu08qivuzj0q82jl35q2evdu23lvdujlbikmx3256afewobnf6w2tswffndixnl1pfgvuf9gf9uyavczxfz2ue8wy0ifycvurhlwj0i8f93nfaymzs95212gbquaxwlx6lepkt16qp208kkn5rfyaoqkimu7ejf',
                component: 'nwpedi7brn09tfuodtv4otivg37al77pq411p4t649vxotfpumy4hveujdn3amiuaah4j9flmf71xtl0k1sltd7tavudaiuj0flnsm1425uy4i7jcz9y26wg5yj0lzjjoz8rk1kgqxpt1o72ha82no516mv7jbxk',
                name: 'nlinm8x15tp27hh15beuwudv7s9l5lgqkddxegb7vek5oks3x5b6rk0rzwt8pdmwi606sx0rhzmnmf1rd5b9az2vsoxjngpsjrnfzwnhyhhe9fkoubputpdipzmswphe3lbgyg5dmhgx4jo09sh555g5k3at87zt',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'xxtoq4md32cmbzglnneqvg03a7fvteyescrht4lkfh7du16k9zokomrrpnbeqjf4u8h2wwg6z4dombcwjwfy9vejyosfnis9cejmp3h5btnewyk83jc278ajkhm7ihlwooes2gb7737o69k5hqc6wx5s9jllke19',
                flowComponent: 'an0l43v7f79fu4vp4o3jg1z27g9g9x3cy6bpwcvnp6bxzoqwmyn5i7k5xiam4yn1gtpaygmjag3dlm3u49ho4n78td8ojl7dp59zr3xpo94gciaojhwu47bn6ebft03xy5hwqrd624g2hbn2w5p1ak7h8vrm7rzk',
                flowInterfaceName: 'nxon0mmdrwa82gsts93fikaobbcjg6nunbl2pxscg6hf6w47zzjhfov6aa61tibx6wggylbl7x4qsto648mzt7u6m37zjykctl8kbqvm565s5r1gmye4gg3fezucqw7kb3uwi0jm4f2c5jin0d1bmxslodvten47',
                flowInterfaceNamespace: 'q08knyii583gtu85ccfkijmwxbcxoyqfz372nj3h7sh5xsizbhnn3qjbq56817nactpiyx8f4896a5nadj84wpceqe8l7zlea4bhr2e3kdsnw4lz2fej9uuborwru0882oo86v1vknt5w6aq31v62terlsmk6m2e',
                adapterType: 'anafcemg8av99ddgdv27uzs1kde2hwjcxrk0mu4xgztjdvndik950orkxewr',
                direction: 'XXXX',
                transportProtocol: 'v47frdsd3sminmq3v90p03xwx1bd1icwtv4vztjpb1b0xfxwxidiv1vpolt5',
                messageProtocol: 'u9jb4b6i64iac9o4abn6f58d6xx7x35zevq0c0wwr4dog9ma5ccfvbnl8ed4',
                adapterEngineName: 'e4b6y8wcxon0fpin5m2o1q1012ihr4z1paju551ta6p26f9jn2cf7uino9jhcl9paszy5pwfoiswwa1noy5v3cbufkzkkrh20fh9lcqvooiqe58pphvpuw72b6bi63y0zzx58fnczfy38u049z07tep15sc0igws',
                url: 'o921yxl0jj7pjx1ihiww0yaf9j6fkkcueiqd5r02p6xtm6ol6pqr6fzifd2ks7j58j5dbyau4zzrjzybm744riw3l6hgcigrbaszyhwagi45dfjbweyssowhq9k73cd7lhwhkaib4mdckeu0ttjgge7m6lkvk8o8rs2ogakoadb9ndamab5krbkxcme74afyhfjsy8qlx2g90f4r2hw9a47219cbfbn6lhpta9v9vcarqws637bl9xx62km6zwhgxnu9oi88001dx7eckam8mwlnzlgj1p3t4yykkv1p5oq0q7isj2egbk8crisf1ohv',
                username: 'vbpyzb1qbcnmcclttzhwd644nd1tgaov9dvfd3su85b2bwu1xb00t0wf7m5e',
                remoteHost: 'pu2i9w3lcf8nijd5gw9pm3ufxfqz48q6y4hyvyb2m1yzp9o984q8oflvzcb54bvq4clc84iweqwd7u92it5ta4miyeihc925b48b7spwaxowk1x6hfc8ixi0q8mm7goma9zgm4vyhmse5sypuvyjl8ovhkwivqhc',
                remotePort: 8191889925,
                directory: 'gdi2k9ih5kqvbdmxvp3055ynnphfx7bg072iblw3mds1dbs1cfoljwgdupptluqvac5l0qoao48rb0kguwbvlgxpkceb3msid9nsurw3z0pcutayih3o2tz87mp6a8nh5o0flhtut3gmbhq63emn00agdx78mpgm9hznjp20mtpfbxxrxgkltxrpbc6jmmvq5963yugo7iodwwyu4ob96m043xm7vd0ojk8zv5ac3nt8fviy8lu2c0bh5wk2t18nk1jdltyphklbfwgk2olgdclrc4fazgnmiionifa5py4ow0ms3docabrgp72o9hoe0sths8wfykfrrw1ga24u54u9g1y012r1bgj9r5gdm7kdmi8itb04akn0lvkxnjmlhridsx2o2zxtxg6evov7icqzy8fw6u6cjty21vl0a150dospjx5shqtw0f86b6l9ulqvpxkvdt82n995ipott62u5tspol8de3red9i5enuzq4jv91idhav6fte9zc4l2eoq6ush443z726kvel0oa6xykdy6o3b3163x0rwiwnlj6j629z2a7edrf1bglrp664upiv6odtq7m2506vfwsmcbhbolx3m11a0uk4rpu8nr9dg28pd1826adsc2vilqf6yf9k7fuo7f16utsp2ndjxip27tmv1otnhpitnyuh8o1luk8e5dns24pio9fd370u4nltzfdjt1y9808cwfdg3hngw8ze3yqy2y10qkf5yq776q2dsfvch6smb8xpj8q1qzvnyx7yvs2kpeontloykjdj9cjlaf1nsk0kefk1j4nmqbhlc7zbx4s2tdoqhq7un1s5of18yfsk7eomglo64va3zyl518d3v3aqa5gj5879et527icq96w3x8qkd9t3mi74lah5y9h9yv49o72is7tedlobyd2s19p3dn3a7hvxvg8qu7mmq862pclwjjmnvy4dk3cmj5zb581mtcdg9jylhfnwvk4na9h8rfr6bnvrwipsxl9zcjqxl63pf',
                fileSchema: 'al0d1ijos1fte6vd6v9j1jm44qcduncx9e3g9jja4iwgguk424cr480j914f7vccuu5dfuhl1e1dy28fv9d1cqgmr4ucnx3f6wzwtcwl2m4pkce0m0o9l0kkq1fh7vd157jyn0kvyve04j0nvypculkddzr99mrjusjshcjcjj1mzhdaoj1kcn1c9e1eb3xttlkgwc9ig6qpl0mlypq4fgtgqhhg3oeqywcs29t9tf5fmzsz5lz1gqtw5c95c3dw9w4wrxjrmpz7svrt3f5n3ab7paw8xbp8fh2wivvz11kbokh4is0u8cy0wkbehhnsa581xqxoumb00xi8eq3exudfavjs8xgsp08cnk6qy7xu1n7k66eoafeozni3sxc071u9cl34q5m194ncogykdmfgrgk59ej1pacqeqh6cylc88cyvbe2qd4jrze50igfqht3zdsy0yruz5c82btj0pwwvd3chhdfmh7narvda2qe2qlvbsl3087ienyqav6n3q2vlgd8ic3fha80jex82nj9h60hg0qynpft834sf45h170zq18clae6tfjh7vkxo5l6gh4eigiw8kqxnbx4e5muz2pp4q9zyjllvzxif1byr7n7lt9sb5j3bwlqm5ko5tvf62whacmub2wrtt43ktq74gder5ebf2rx12sq9lily7vybynhhckrzlad0m6y6a1764cp5q55rdm1w80vk1nurox0ui5l7jiwvl8iwcp0lm9dsovw1vex3s6m1en42ui1cmpeyfaylhcgzbe7m9kiwuobgq6ebiriwr8nan89f7z0t7pb9oue40m8b8kesrt3dh4n0ro1fauvbfijrx4gquhtcw06v1ms988eskuhj7u316oeojbiesyec29kfnr4jykxxlavkf6afh6vlo45xvdyk197ywcy91qfedx3m3zx8vwmhmyw3p3mah4vypzucslly15x3rtrzqw37tzsgvctkvseg86rxrs187hzd3jg0rfpf3z1pvao8kwt',
                proxyHost: 'ycbl7hozcge193rjwgincng0jfd5t1np7xmnmb7g01jlh5ujxebugz662b8v',
                proxyPort: 4750115580,
                destination: 'ts3niovxbackqdu4na353ao1txf8w4m50eej1hcjf4yvn2fw04yujfsn7v5zat3usct8p0kugm8y2uzk5arguhutxlrcdgxyg3ardz61q2qyz1esfb8dmhjdgijageficlzl24b1cbt8t6s3y8d83ypj3w0n5u8p',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'su3ockwxwew8e49f7kbwuj8kyw6gv4iuco9fyolddstbl81ewfv7lmxtcjqquvzfc33uqy80kam1u5mp7yiskfqbr2hvnsq4b7nfkjeajes0za2malz83gfrjfivn4q38rke1dqpnebjfle5sg6b9mxcc1obxviw',
                responsibleUserAccountName: 'ty2bi2blpo5skos5jn1s',
                lastChangeUserAccount: 'dcx6a84h20q8gekn4iku',
                lastChangedAt: '2020-07-24 08:35:47',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'qj5iom80t3m8f7qwizzuiwfk9bqp0mcdq9kdwa20lhc080rddi',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'lanl0e8cz5jp4bihnq39fj4e3nnhninetpxufwuuao67q4h07dmatx6j1s2m3edea58cspkxymapwigymdcyutgd35sxxcugl6cqnppcq0jzbefbz7ypiqyhmgfmjau53uwlatdwrcl1nuzq3yi1tu00s4nfv5nj',
                component: 'dpct9sjclteug2e440e06eeywpnr2evxmsix79etgd91pb2b2nekq6x7czri68iv95gil37z4xi5mukgqncxd90s1x4cj8oyudz16olwwjigbenatxpdlsiaxf0tfq2mcohtkkskcyf9r3bpmrfg4g7hzd0so8kt',
                name: '6iowmqoci12hpcerqtrdmufnq5be4795fkro9t42hv4fktc09v7x8l4o62yflmx59wu2y5llww7h1gw8mvre202tn48sfpslgotufb391t2h3mhj7ctruk5h5r6l3lhirgt37xdtb046gznyu7jehqra59srydsm',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'fcrhoc6oahbcbpb1bmlewp66leso5fbwa3tl74ljdi7bw89zadxx5ws2mx7dgfpohz6jdshufejadb5jb9afrb80t4zk2krfnvni17yvgo3bgntion6hz43uj5soze52d7fx5rmktecnw03cvwz9k4q3kq8kyr0h',
                flowComponent: 'cb4so5l7dret8p1to2ezp9hwo8p0xhn92y815v1877qvmdz775y6fchflt2p95lfy11pyutommwbsyx64tcdzkb1tqiy03rjtsantrt43wrhbqzihroiv1iold5g45pz7lyqr17zv2vscje2dewskf76usaalsxq',
                flowInterfaceName: 'btl4of0gct4x81ce2xyfsdultw0oorq7pbsycqwy63shbmfrwdmgtfd7yf2sjbk9qcgz8tffoqae2yl4jjpwg49jic4womu5ue6cfjkorg2meabdrq9xri8rijvrxdfq3d2ppzw0r613pau0dkr6s6m1dc7rolqs',
                flowInterfaceNamespace: '6gmik16s47fh4hsuwrfz0yvmixggayf7drktynk5kv88ru80b34by2pfpedjfsuw3jfzg1ge85s3tnrr2wbkytsvhlloguk4slm5tmgcxwqsckobdw69qk21bi88sjzyvivpzip04kgv49vzvskb4rlk2vj3oej4',
                adapterType: 'hwir75r75lb0j6wigpplppz0j9tqbtedhezjezo73wdcijaxbo6em437oi30',
                direction: 'RECEIVER',
                transportProtocol: 'uutpgs0srsnpt4b0leugcltmwwgiulrxv1tjs3m30yt7rpfdb12bwz00taej',
                messageProtocol: '2mvr0ho46ru58o8dvetbmwairs2bb1iwptqrpi41vsyp0dzdhuyqs5x9ttj8',
                adapterEngineName: 'g8k67xgatjcv9dd0883syggwiger9ln2b5p8keqxynpzibnmarpp9sh2x7mrh3qcuc5u6ips771hd9legxi9nkpbptpoagch1ev13sgge187gcjeok2pr7f7d8br3q7qimhtdonb6axyqoqbfodc8jiika9ue3ac',
                url: 'pr8y9pgouo7yyv6g8n3jcd8801napg9j9fqeh25jyp4glgyajqlyq3mi07s3e8oc8a9dp8wnuzxpa400b1di1euunjhfuurbjotc44lfc1kxz0eed4qo8h8jkzud1uph7fl9f3xj3h8a7nhgj6akwse1ss98l6atv07kgfom8htifh0ugpoj94cnyqlbte89lb1gllyok2vaaiousw4rc77c6cryuqp3yqu1fpx01y70i66w9g590f4o7sc0acryim5yh5y8a9cdu8u3bhiyh3oxznw7tx5p595zldtg3leusfwxubhwmdg62u34ofvt',
                username: 'czmoq4egbra4catulhpkyb97zjjmrxrbrblb0du0scf0yo96rsbsgyrml3pr',
                remoteHost: '6oam69vdww6wzzlfei15lhoyi2tc8kkxomro0lg1sqef6y37mef67lyjoeetp63mn65s1uar6maugg6cjznzqq66rmitvsrrzrimbyd4mkdzls35sl24qesnbysc14xgqxpt90209kx3gpek5nv3fy4w0njg8yvw',
                remotePort: 2955400253,
                directory: 'sugsqmaaa4jkud92imk5gajigqbc8oirox7312ji8itzd7gmiq2qeb9iiv9t16cexcfciwggi491te289kyb30mcordl15czdvt6xhm7vy9au7l3y3t7zq52tp30a6kay599xu62ml4y7zznq9hqjjcc6jq675kyws9ryfhtf7szzvofzwfsurxribq9flp09nm32mb0ggeouasbbbkwetauwt7deh4v27927kz2yg5w3yskrlp8onr9tsa91akaxrxjoq7w5rfs9xd733myqhjitdere7kkahszvgeikk4ygc0r08vhp10fj51ppdbelh8tpknuyylniz8vxcjpb2ls2348qziwr5w9f5giv0ixmbzzbrjk7laphtyhbhhzlxtsghtr53mm9kfclfppxfqsari3cg3s78170ddei9c20nzhc44b0ejpxelb9nzsy2eaut353856t1d2o754rw3ci9niy6ktpbu13tmm34y8vuzyej7tx5q8pz9gwpy5dq433bgulri42vzp6yieush52xvawbczx307tfbbdu96ypze7hytmg9jn4nvhywrba2jwys3a8tjrduz5snfecfl0gp1s63007rsxfrvs96j0xhfi7n3506xewksbbneacdda091du9s07e8vlif41nihjli19hkrc5bo6m9rb9c2cqwem7qtle0ywdlg7aeex8c3a0tyv20ruh1ks0imosj2az124xjwkzgnzbx6pf04m06dw7275u5ptjybeaadp699j78icvhzfxh29gr9cfj1bg71o15url3yeye5iqnklzszhs8dpf2lamm56hslq139ytql0mf43ky9hmnao2rzswa5hm5h1jm6i5z2rv01fvjoc776pmvok8ruiofkrsd1q23d0kzrethruiszi0ida8gneaq22goakmixhr4uchnlyjp0abhz9es1rwin972aw6rae7ttzv23i6v92bm78knkddgilc7xd57xladp23b5fms72iz2k6tmxnt',
                fileSchema: '2hh2jbq72ehl53gm5pmsz7erchdaitl20fhoj1kcv423dsyq1adm7bfgdz6favnwp5w7sknkra9n994ei083rvspreweam2yrnciyjch7vmemhogzcoa494mpvy8plcddlct0kkhzu51p9k889dbjc2lnmsiymxc4lt5hp6f4nbsce9v6mk8t20nruwx1bpvjtwvbz6ofz87u771cmoajm6w707mp2kvzjpip3mnkad5yyz5fkl4cpj88fwzewsxq3wspg6tx24v4rlxcofvxmo5ciby6t9o3hbzy2x6he5g195n1ix9t1wwv6ip3hufd61evnn0tvs49pxji68v2xc5r3bfxdrsqi2qzqvq371kaq6eu9hf2kv3idean5dsg3hibmk4ueq0yem3w96vsnv0y9k7ct80w40b0psr38pyfosc5grxdblvh7p2u8a8bx37o6gyluwqcmqj3ln7zasi1u4poruztfldyzrgbifacj34lkapgl5d2p2hqzkdnpotndmi8cgvilvh3tl8fkxbqy9embtrlxg7sw1fivox4blutmjh5p1sgl8y1ck3mzcvgn8n5t6axxp8zvko60pqaojdbelsomat12e3of91ed02vjbe52w5psepxy93e7ex32rm80smfkjw4f5pzed0yxw76kqkx6jycodkhq9voi4jlpc6idooghgxkwk4sqqqr3j1u2zl3oahxs5e448z1go7c22v5mj4c7ofda3w43nv525g9ps7guae2tujk19venzeyqrjey89rg9i00c1725foqbzf9oqhx0s34nynqahyv4on443mol187u45ywcxuvfdpwzs2kl1b6os7r5npfhqa0dfblqfy6svrndtlijek40jnr7w95pvk1taobd9o6njqhlgzoah2hshlh59p10hjp28jdqsj4swkhwsq29khrlis6yz5s6z489obp2es9ac7m8hb4kissw5sajouzfpyuiloj41jsyb25dnnvyashz85onan7wpiam',
                proxyHost: '4x9pqauge18fghfu2mkpkjt8809smkbmiegvldsrefs1kr4sccxsrmpah06m',
                proxyPort: 4274674206,
                destination: 'lcjwzypmxxlwdbzohk56r487g2q5kdh3ekqsnmewrfez0z7e0rvov2o69341g49wwyxvwkmkebp9hdgz3h3csi5s9m4ekzmqaq1phk5iav720irnymn72095qm2j4uneig52rj58jevm9mus2ug0hkm4kg0j0723',
                adapterStatus: 'XXXX',
                softwareComponentName: '42dx5jrf1q9rdkf8jcz7hay2ng8wajuln9xwle4yqutr002y6wuuvp8p6xsxa28l8xj7s4zwvtui5mppaizsp8o0dknk4ysi48ica47yp4s96j2ll2twyo5zoef5fpymnxzc36edb3tzn5hgoi1rygfvljtx7n9y',
                responsibleUserAccountName: 'g4yjutv3c6tyuudedwop',
                lastChangeUserAccount: '19vkycznwvj0liss5it5',
                lastChangedAt: '2020-07-24 05:34:24',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '55gg39jtmgc0cwmzf0dveev73b9tfczuu74vdqmq8eetv614m1',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: '7x2phf61djazp32eby5ftbha50gotg8vvlx2haa4nn6as07vn38tfhpn8q3pr7hb5067v16bw5tyf50yhxvt7wkd6ma5sfa3mf89wycvun19xsw33gp7ynlrs307xbo576eow4gfm7oa1qm8geh627wrqwjtnd77',
                component: 'hd3zm67wb94vbv013ipwg6uxdvfpjfpru89bp3v667ps036okpnxcxkpibdfictqafv0adxagkjioa6jvqrxxdbgjbzcikyl23lyyiygf2deq2dip18bsclfd546p70dbxb4cu2o5g50pnzotc3tjswuolne7906',
                name: 'kpdozoseqqadaj0bejhrl5c4z6zhw3cjayj3aqkgun02vwknu0hoom5djroxp33uk0qn7nqkfdnets57jqm08o0vulwssve6sxwu0q7qow3sei1lyf81lszb7zraz4husr7p1m5yezp3cnkxbgg192b8kmnqihqz',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'a0lqb546xnj98kq8b2buvtuazbvbv71eyid74fx12iyr12wmhl5iw3yjiq9hwedvirsybta8m49e357l429tvmdoc25uizfkqwy9uc22n23aixjcqbf8kyqttn4s6mwru7s636uab6e6ynikkw81646urvuoofyp',
                flowComponent: 'pcmyzg00cyfeiv3tdgvprv2v5142bl76qgv6avmj2naj6av4bwycsdxmtsseql5ie8v40v4ma1cd7smjcwe0kdxkkulyu4p4ywusv0zjpcsafewnlua18cbfdhfkwjebazz0t7qj6nl9d2ogvj5sacqi25ndyq4e',
                flowInterfaceName: 'xdiwxn16xypsgiq7hen57v1qynhl24kiba6xhlaa2lcu94dbw7p3b82ac0esez47vd8zmfgie0vg596ad6t46r8l3emv9fxfpjit26q3d5gepll7zbmk79c5ot8d0jdx1dkx7qmcsyqc62nh22c9exth6koze8fc',
                flowInterfaceNamespace: 'm2udkhtikj0imtsojn74nwe8it9c347rizoo2irkpese2fzioe7uz45k6j0fano23b82wvab82wuivr0uidfbk0yqtblnqy2l2i1f05xvote80h147hjrdqnkepwzj542x87t0qxw8bbvo4crhl0u53zirmfdhoo',
                adapterType: 'gyw8ijwmrhsamgolohiyluoa3m8dv2d5tyoshptdmf40gh16hxapge794r3h',
                direction: 'SENDER',
                transportProtocol: 'i4dk96d2ccjwcq0zddf324f8bkogfdkj9nnmjwnqz5yxd8bkyjozn4x6bpe9',
                messageProtocol: 'exuliuguhrpzfh0ux8x93r30wj4zb0bq1gbmebgvbnem4cbaoffonvj8bvrb',
                adapterEngineName: '1qnboa4jznhwp4xvg5n0cmm9v1evvzqu6env16wamqem98qur0dqwb8mo73ngbxjenys7ohlv5dmt24v733tfdx04gtwmm6t6pil67q53424v52v7eatviicmjkk8ngrpp9bblk332bdllia8jb3y1c5ol9239i8',
                url: '8uh7y759b9y3qcmjgkvsuhwrepv3x75squimgnrigbt3xyk4kdyfcg21am1ip436s843otkyf9camil72f0t9u0vv5tb24au5ofpfe75lmmt6yvlvqpb9cyejxi1jta87hw99zqxexqk43u3rmau6iw1mnrz2sw7mrdthmeij54jn1a1vt0ftx60lcolk0bvzk3zuvzufhx6dr1qzko5wit9nj6zh5d383fwnouaudqxuz31ifdzrku7zs8gpxyl6q3e9agpqmhyv01jpwci3g3a50e1ls07jw2yr0nisxzst7khmq18izkpmumz92rs',
                username: '03ectbixs7fpumz17on7xn4aui24bu1y0q1fywd4w95293ihuma8ym323h3y',
                remoteHost: 'bje0k05cwfgs0a7y41vzl478luw3eydjm0j361j33k89k20yuwol84p2loxcyrx27uftg57letgecq80qur8o5ybmef4pxuw039y6cjq7fumkjjiaksbnx2jt8r1uffuzjr9dmmezf37dc5e0vh8hvy67riop5co',
                remotePort: 9998111027,
                directory: 'q6r44m8kru7u65y9shumsdl913k2n6if3cjridl6sp72f6cmx3ribjb1snapjzoylyu5ogs6uf3b1068o4yzxd794hkjt2lsbzg7vb0cht3bvt7ja0i17kz0cd1m2kwgwxyrb5jbdm6y32i78zdwhe3ld01kmfogiyqfg2ztcltiuap8b140x81i660s0sekg0g7s0dnyk9gz0zgn5krfdt2svrr493vlmqrecek87j7cop94i25oojtq0kipaoorgxtf53a43fhcv1733u0ufmi1v18uhnw9a9zivayejr4dithx32y20tjvr78wwzb28crnmcks0wgnfs0p2hvj6m9dazzm6muq5gt3tqo4y9lzz68yvwvsg93x683kux63sv26kcr2rqszsen66utxw92s13va2ais110k3yfm4w9lqt7192f1omr3ea4yo485yjtm4sq6bqflhbp69dqmh1pann42cer7jdd0f2zw38fynd0rl5jg6eupvtc1girmiwgk1gf75igufa1okrfs69laf8snhz9ukapxztz8yrr6r278qsu9pgzi7549cxpvblu3pe4vc2owmvfovq2t4xyy75a3oukxs8g30396nsx4h2mwj2urbh057rku5lg5zws2s0gy2oi0d1fv1473dj4psla1mtdkeeh11iqmjl5e95fc65vs6yjgxo4tentmoal43ui7oxb14q75mz4e3lza6xrviujkrefbo23hv9evnyrpd72xdpf53hr9xptrdnkm3vdnpbuhhpgle3qgaf606ctw061jjr8m9mizvwgnbmy2y5rfkwp5dewcp3qfc6cctx2ha6j6a96wz4sxsbdizwua4cxvrnl9w1yf5rny5n7nihfzn4jjgxa4nzzk8c70jxey4lzr5boh4vixserhgd0glb8d9xwox8ukixdnuu2yxhexqfsx8ft9ryjubwb3632b8dug63ymq90pp3lkw7cignmrh91xmwg2nim8di0wq9k2ixirlii0zdm',
                fileSchema: '2iglazsums7evw3h5a5z3lj38qsut6dhhhjesfti2y3a92a2kmfxa3uf56p7l62m1dr23kl6628zv2m588wzu20iau3eany53alkbk1mxzojgh6m7nntrtfddduwj5t1iwqn34orqm30qisxg9lklie6b6mcofeq3ne4abjqhtun4yp9uuu7r8ypeuyknm6w5br0z518zho2swjqwb3hzk2bg22npf81jbtefh4bv6uownfmpfb6we13rpjygnoxf28p9k0kp8pi6glbgq1sawfqevudvwta5wb76k9m3q36v6qde01yhy4ydz7yezrh5v87v9e9abdpq333tb777v4hjjng1lgomzezd2yjkt0p8hzlc7md4yhhuqzwlz0tyq4k2nbu7tu56vn1h477d9aks6ocdokf23cd02vhrzjhikeuz6gin2kucxd8wuzafrru3hgpw874zthp29ypvkr1532crfycuoiymaol2o9282fpfmnrkk1cmpkezhg2bixn0ljr403f7aub6yeogrobjk58m9qfp2s4a5j6ml6yn67p7kf75or8jnpsniuvr71c69sqtes79pjri7t6zp2k7mxty7433voa3pdyedgn79k823hmahb95trmbhnmkglw7npitukvm8eeiiwwzorbk3u2v2yrjjnz8b5ivehpv8goth090znrdvuzg46c5ggfb05op5j8415sivprns217mq5smpgrtwuwsrk56wmi85beozweimf8k8t5ggggb2z3iuhxwki6jjzi8h0il6vzxw0p1zze1cjb1mnfnvvblchszlu6z2zlxttn5sylukrp02lq7a7edodplhi5gtperwo072mrmgup09o1lc0glnxl4u18httocvxou7b181fkn2hfe6cr5gsxviqubu4vh756tztzjt2y9h83xb4gzm3v586njqszodzicvw8x9wfdvsztes9ghexcs1augbxo90597u4buk3ac44xiwllv67cw8jx4w2it27qdc',
                proxyHost: 'xh88ihg3935vstxqlowktgbmh0phiwwsefdy4f6umij1sehimdqbniuhyjd5',
                proxyPort: 4753483522,
                destination: '2i6cnma00mh8z44iuz4lczcufsrubp4bbpe2700ppjy4y6fxtvjwnto4rpa7599tmfj8mni0gdlzboavuts0lj5ml2micnclku9hhsqs8xc9wlqd7j0t8x3v8ynka3nh4ojbhw0778j7r5m7yfj6kd7jhi8ftysb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hv7va2izi45xp8q9dbztfuew3nj25v2lc74i6u8w435p1uurmh8lwz7zd2s0txuvrj1l713nu4xk6uobyubvb564wv071y9znf4qe4jg0t80t10jgyec9zepxefu9ddvxcnac0fswhilruc80j8x1ddd7yoyi6nv',
                responsibleUserAccountName: 'l7u8zmllukou2l8r2qk3',
                lastChangeUserAccount: '5o6rrc8y2ecvfljya8si',
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
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: 'k8x72xnhfmj6j7tfezrsescp4m0ll13l80z4auwoiolx8ulmzh',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: 'os827l00keui41vakfkfgzkgtklrijbj8ykf3vj28gubzq4er7ifjuo81td1ci01apvkyg9cg21hlm3j3wao81f54t9kmfuurhq6dt5va3dzzepq1bc3f58he1igg0o5j3px1vw7lk9j9r88ftih5e7m5x6i9iy0',
                component: 'dus1zdf5b1gwu20hgadms2flihkgpk4zmvn8ire31hi7mtiqk9a0ortth1oz4hbedmzd2g797gl6kb5mft5goszb4onatxfgmflft8ult81t5omxs08n2b1x3f1ygu6ea7a29qa66k4nq18ogi6ok8g95o7c6g8a',
                name: 'w1i12obea22dy3iooer0y2ayc1vka6u1t0bus1n1j1tdfwp2e3byp7fdlr0wwwfy3qbol6n7indowe1h42u3a4mom4kvc9mxt15s3tbz7wwxmoevu4fwy8bmv69x1n9cddyf8vytxplj7hv2rkl1x4e7fpyexcw4',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'yjj4l36ibcwn4265vp6a59k6inystzbh0o12j080epsw6tyglatqo47ny984y6lj77i38yzxr4kvy2tsozvhmri86ief9yl1ocy00h475u1vwke82no64khox84wlgxnwr7psimda963lxli1tqda4zgm28b7rkl',
                flowComponent: '3wasi4dh2u858oeimqlt1mm0trxet46a46m49z5p67eec24y4hufxxqdwbzrom3f7lk8tfc6mmf5pjva1vbez5lg8a3c9wtbwsbxy9ervzkhed2p4ej7hbwqo9y63k4a7p8vrd4xlo9d6xm803ubn0dypa3ryatn',
                flowInterfaceName: '9t4nuwkjey0gaqjg1n7wkq2n2xi6nkqancwd21hd3bcxf2j7jo4we72scpznxq4l7dwj2ftqossq10g3r84s8h1uk7kwvn0cd37bfyvvk63zlq9vzt4z3xl9q9ngc2ohrulauszwhjha431a27yc0s1067ubpupu',
                flowInterfaceNamespace: 'uyeerbv6pextpl7v1hdt3a8khyu4fvps6lpziund71z5u1hiojchexsdy0gf1stzzxcjxoztee579e4kvyo9hzrlr4vrjv1k3m6wk8mqz3qhuxn2fajf74jmky4gs1xj2daggpiqlkk1dwd1lwxt2gec4wlmfbcv',
                adapterType: '2pz3dwrxn6g6h16cf2fo7aplz5ewpohzaskg3h9peiko6tz843aq2kvswjko',
                direction: 'SENDER',
                transportProtocol: 'nsz3b1mej02inue277v7kts73td0fqw9jy03a9ixqvdam8negiqwilw06f8o',
                messageProtocol: '850zjuyslnt2g29qhw6lql6sr2y6slgi1izwy9aieqcj21zoyb8g550k6322',
                adapterEngineName: 'sfxozbnx9pqv1sjk9g0x2urk4bysiz98q9i79avz5riy5wn7uxl8aknfli19xrwr19tdbwxchmgd8hcolytg8u4xgexgn218a4de2xmmn73luyqwmwi0okc93musuqxqxehqsyegpdm1od9sqe83re8t01zbaxoc',
                url: 'e5prja33ioc9mb68ukwbky4s3g0hesyde3afws6465x6o8dmpt1t7em46tlvgusy4srvfzgo1120exgq9csn9d8lwoat4xypip1fk5veas3dr6mmmq0q2cojblx1p5nwtcnfa08yrqnqaf1h54pu58593vsh9p4aq3hc3ku242zv3wwgxnc3n4rvgh919qpb8onrxpddvi7rta0501f2e6gelaoy6faru1c2j99xg0rqnwxap9u1etgcm2fx3ibvcsclgz6cz5u0fggdetat46cxijwa57hf3t1592ofdxd9r9jyitvzqqhtb4u88e6a',
                username: 'e05gb7k6wx79yxvxmnnwrqgg310hmobrutn5mtpg61gtsaum2pq4vt8kq83b',
                remoteHost: '8b4ikivycitwxaf92a9q5kzovs1ufi11isy63yow5w4e3l48m31y5ggiy4jtsyok6xc0xll5hkecoy1mcc13jmkxj7py8ujp7c410688s4grepufmo4p0ttkfnasjx2zvm6rsl1tbzgwgoplzuo85r7zg13fqcqg',
                remotePort: 9487420679,
                directory: '1s892tmxs3eml0rtbl97lkyg8y9rgm16w9i72ilcg24via2cp0f8p374oo0mvrt25t3shuopmd0l4pi2wsuy7w2anz9r2hp7jgsafo4shszhqov9h40rpao37ujhg0pfc6ouf50w0cu08rx56s8hu97xeksr799js2y8fg9tq9po9egb8la6uze47h7ul5c964f9v234j7dkegncomcy6afckulwt3d5kav5ba3xss3xsobf5r8fb2pu8279wtvv8d03oi6z7k9x5f2crw5bxshiv47vuv5vr6m60neu8vwzqp92lt50oopu7nuifta2y6w4lzfnpi27hntzzu9z2yw9fpgsdhno76jt6k1c67w3ywzxtyg5v8jrjs0bn5z1xpmqeuwm75hq69140nwqc8op18y3hd51b18ztuqct00v6cnoizcq2ox9ufu4sqng1uwlr772w70ofb29hk8dg0eac4dfbg9ozoy6tveqfrrx4u39hr84vf0vlywazts44xvgnjv5182j7ufcd1i946pd74xn3p35seqeskfn9jifk74ajeiojayr0fsd2o9zzwml3mmchs6un0pqx1kiyi0yb67fbfvylrghcawmy2c9feor8rnov1l912450jjfxuglxajdx3btc4cn5ym4b4ghbt6kmnnxgqbdycr4ff0xmdqvguef6abmszp5ok2sl9xv2p0dggzlwoupnfkskye4k16fcgy0wg8jo9gq3vjadekf5nsx8vd6zpr34hlhhqi1db8j9z4emlvqh9lcy7e7ju1rgh8hduv3ygokeucm4uw8hfy4ibg4aiurqx6l2we4mgdts219nzs4agokqc5xnnqxxa0onjv7ib3obimxafb2y76e449ynv9s86tgzbll1drsvgpgd0sb1b0cz6pub9ob22xx3pxczzau372sma5j7uha7b983olp5jte00anrxmn12wmpoemldf5sh1mg85nv72si36ia79bl7okd6qqsasya5bizne9u8uo',
                fileSchema: '60v66iz84xmeqmx6bdopv0zqmt61g1euq0k2izx3b5q1eb0uc3byshon0zw9ga01mo93gi4brpt2fauylx94xmz71ejsg5eplxfufzzbcrxr3w9c8he4eg8f9ori8nzlq7ifenl0fl8h87dmtzkgm0rnselrdv89rdqib7cy8hc5cgvat4mr7i9zx7bcugur738mlor3jei32gpm2q0z7uycai345pltbhu9ojvqbc37ndbwpkizhvifxyt0oxhngc80u5r2ya9yamgzylto8gl66urr9xeytcqvns2vjgi9ff0afbu7mwqp64ex8rsyee1g3r1ph48d5kx504iursflo5o3tvnc8isyhb4mndan26veg6bvzkdjj6mwtgzth60apa35c67nofkiau1o0ced8ofe9wb3vxxmkcbr774qorf8aqcnur0lxkux8f67cw6w4hh28yzlwan0cuo5ll3cj18twoo50io2vkin4zbtgbf0teh3zwwjgvjg8mgd4ezcnndckdf2k047ahnb2vo2y29ulpt4q38ctjf5mpfes07nnb5p8ka9ntgs3pszr08r2o9scqjxsb07nan83ztdia9s6jagqkd51043ddcvne5af63zb7q87hg0yrwah24ocbqlymo3r4lqpb10g1z7cd18a2gbjzbniga8m9271mp495ijq74kc4udx2amzs5x7wg94rzczssqf5s4lgzebblxauiaad5ioi29o70lw2yap3rlqqla25e8ajlv4xunqd1v3p5np741r5kgmyidj608oln7ny42rnwpnzbjo7ads1byv90u7w4y5xaw4cxsyahejzirvuaciuv10j9nlz6ahadf66xuym6ebs0otomizgn5ppa2d3b3k2a6rbbpkz0pjdajn2hoxsgg71brqmxqmtud0dk4d23l06s8pw70uvu9qsc423umsua5nbtxctmei18h5ykogsijo36lsnk7a9jxrt7nfl7hzkf776n4irbzz1rnpe4g21jh',
                proxyHost: 'j1hleedx3yi5c8ul27j3xjve5jaosvir7stwt9drkjt3q7xkhf9o2c2phusq',
                proxyPort: 9543287114,
                destination: 'lbunt7ozeya8urdg87kfpfp929zstzqnmewgndv0j4w7kyi2xuwldtt2jnfs7ucnuc8n7b51ki3zau5k3d0uw3c4m4fx7mz19vaz9x3lyqjorg0b48by9a3ionr5u0ebwlphbk56lvqpixt9ezf2uxho0ogjp17n',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'e9tg94ol8la5obavhz7lk9y7d5z0p0g8i5n18y57aqa99p2itoaowxxpos61d31hn8itobjgsbtz5ub2qg5p7fihbtktwco6g0g8m7mnrea92ungtzpph8tzxi59xytjw7rxp6q2xkqzq7lf4yfxm6bckt4e52oq',
                responsibleUserAccountName: 'i8nlb4t2n4ns9uvtadk6',
                lastChangeUserAccount: '2cr72er3s9hdt6imidbb',
                lastChangedAt: '2020-07-23 22:40:25',
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
                        value   : '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b'));
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
            .get('/bplus-it-sappi/channel/2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b'));
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
                
                id: '8f49328c-e887-4822-9d0f-8eb88ac0f72c',
                tenantId: '111ce9a8-f670-427e-9a09-65f4d095dbcf',
                tenantCode: 'fnpcwbictipl3idwmv1e37rcqee2ukqnb6ab3jk2nza9998nvq',
                systemId: '7ffb0f8f-ce4c-45d0-82dd-a4871edae898',
                party: 'bp0ifzdjwexttlqpt9xlfkxqjehux9jzhlmr3uii9d1nm2m18gua6c8nclzv6pvf8zek7wztncf2v21n7av5nlustizxujmusu7qvwto542vhcmwasmw3pqti3x45tuu6akumrg84966owbbyop6y6kbeo6ybb22',
                component: 'd6txqss19wvkux0mimig858hjga5tgoyj1c36in27k2685s6u4svuphmlz4hkkadskfjyju7tl1dhyixte3hcr4l2rd963yekhomlydkh6tpp03jwfl1g6ellc9nwwz779deky7e1rb9b75xblobvsp3v75zzfaa',
                name: 'bjo0ary2hr8clt6chpidkxxqxp1qul4c5kujk4ckyforggrl5a137x28nht8q4uzj2cmo1aht9rab4xgzlgtvxp8lczgbtx1ndsnv5hy523abwbiscz6pw3qotzw1qm4jtfokv10egt9t87ix61te0vwgo5y561j',
                flowId: '730bcb74-8cee-4ea0-8e11-20a4b5d8c184',
                flowParty: 'gwz49lrkolv70trzuc9n5odyxay82f6s3cgaprcnm79ll3878s24et3ow5pqvubkig1s8jlq7bh0d9q0nbaqmhxdaf17w90ivjulkglyujy08qtl0hs2ppphyzd18ik6tu4rwj43fe4zzfojzmgdg6kn4xsl53qq',
                flowComponent: 'oyod6nunwdc1gy9h9taj72pyf3rk7zcelko4gdcp24t2yfd2bbmoa5c22bw8ub6yizmhfm8282m9bq3urm0d4d4323hy39bfw1jvirr06i4iozve2w6xlthlp3hb5eoko9iqr778exfdne2qcved6wkm27lyqv4a',
                flowInterfaceName: '32gblgcpde0w0i8dqx77pr2q0qvaggcefl8r187jeswpp2vzbcckqajnhdbiw4frwdyj05v4nxnu1z1atdd53vkal9luoe55juea62d9f49eme5a4mmk1y87mwp6v2uwzul008ohx5mv91lqsvimyutlcks3i12p',
                flowInterfaceNamespace: 'edvg430f0xc0gl8v4vce5lg8qcfho1a6xo2yw535xfqykvxtuyae0aktu7aztj8lnhvky6s1omdh2mjb2zx1fuyl0o579b7n195knuvfx2w8x9ubzx7ecod7n7pt7sey8udzh4oki9xhpw1bgzgzwohxha2a7eam',
                adapterType: 'j7uym29fkp6ykrlf6872mnttak7es1atxo01c6fvm3e650lop80lxkxdchrs',
                direction: 'SENDER',
                transportProtocol: 'z8raq85qzt0vl9prnijksn4mqbolj0sf9ojkhlsibnk1lb0ksbi76f7twai6',
                messageProtocol: 'rvwrnp9ak6hdnpqfkkxsndnhzlf6h0kjk8iq5medpkywcejr6rbdwzjkeo0k',
                adapterEngineName: '147vtbddun6fuk6rg0gn6jvl1jmci72vbhifotw13v0pbrgv3hp7l9i3cp2qivv12lnfj6e1utcvh06ai8aykw5ksm7e1ffx9273gu84gjatzo8doyrb2e5d56wzzbn7wyfj6am7os2xfdqh1wvklksqfka8pwo5',
                url: 'z5921v5vg3d512fbo4a6wlu22ten6yt2veaxsvkficp80o5ha59g1pcuv2xybkxw1436l4w9bmxlmxdl65ln5f5u3ugnn55o2bfuiija94blreuh2pvxqxnh5g1ylj3cxhjv31qw7s5jt54x9sidkp2gc91ysnmzr2sbko8itiragka2fjdxik4l7epzh3sxqw1p1c2esqe6ul87mvpr4zjvbgbsj5k0buifljii2jqvyr3yojvtatyrp0zcezuoytnilj3109zqzvsjdcoq4p71u5rx0i9r8pd2ypqpivq5eewj9jvgklf8ayj99eos',
                username: 'utxibszszym9qevll25llj8gdry32w3sbjaouxn7c4hqpm6lrpdg9j8wufwe',
                remoteHost: 'ohjfbasa0ijclj9fqnfidjgd7n2im13johlzpd91qsnynbfu1isiz69i4kj8y2fsvnz4apknpmbzrmlw3l55g9ng9m2zfub1owz54alfrw7zj1l3s8irqinbh7ck9lnj56c7rvcffemb32t8yxzkqz9s8mhl7iwm',
                remotePort: 9122572696,
                directory: '7azxyy11y3fowtowqb2i73pqb4i47whvq5qn7kxz9etauiomjbne1x0xgww89cji085yuouxli416tdujl3p4sstct4so4mfxdhma7mdvgxkfgcnf5685xuj9ddsidpmysifz8n3xd06u8yvna3rdvm80vtmz13b7wf4rjs2xsf16x2hb49zxp0nliylb7he32n8fvos1nekrnv02ky3rrddc4ug4gr4fd52sk1qhefdjnhurbg5er3txox4u47796vsruaepe40f4sbot1npn7zzwmi6ami31oevcviskllf7wbyzfctq6qti8asyackmo18f4mlbsmp24ca26yw5gk9tise0x29zh5tkwxl6lz78vde35jyfoli92fgrq9gdv06xwst9z0ncpy0etes1oladvfikc094o85q117r8plyzcton7la3h6gi7k27d3bq47igd31awcbspp29mp6izhkzlprgf1pl7r7j3votat0d4wbrohux9cdphyrruj7ieg8vpvj7sf7g0q0rk2rolhqmjxbpu5dv83bozhrjcnsvbz00ell2bh89lqidv1beah6z4s6grviwrmhi55hzub4gyrtlcg8odku7wzg1qrf1905t9kh4z572wo15z32lq78wc8rvk39zidoorby9p7o24urir56ncqhexxas72rxc2ztnosvyr30bm9rvuspxnqtp3ru0qfmovm4zv4e3enqnqr3b5brgyu6dc72bnb7yppmnntpwxdagf7x5juxty1hs3oa612isknwfqlehj6krwhims1vr3o3i7kfijmz5wob4v03hun80n9eqoyc61f1z7p767xquc2yx9naeb9u75ae5r4487p33m1palgnaplnbyr3hg4vtx27idlvxmpvoftflvc91gwxyy2ird4efu7qbui0nygrd2r9mgwoihkttek9etywiquxa2qc2ylvp1ltfvqc05ymacfmw95aoco1qm1izx5z6ks8kh7o6hp0qjrk0yxzkegcj',
                fileSchema: 'cvwczpo4piuxk3hlomil1tzliru706lrntz3cms29yl8imuqzzuyum9f2c9nqyek7n361cl1aomu392k10d580a9aoe63y6kvvalfrmnjo2cxj9v64mn41figygtzub2eiguzrh4gbwadj5vwzuybqkkff5mj0x4ci7ok7e633c5ipeox7j44jc1l68kgxoa72c713pn6d5hn2jhq5w2xk9jzi3amfivjqelmgnjsdf8n2lat037dzkhsh2rourwpqlghj3k7foxhef3aefe0tyr19cgiovk67cudpyf3l6rzjr4gsfvw6234mp4mndobuehf2z1leo9lrslio7rlxla8yzwkm9xfzl12x0zfj3aqhngsdlq9pu1fo04pxf8aubmg3r4606petroebo8qjduwuu3gudzytczb71uefnf8xj4xlxraueg8i2bu1k4d1f580ivm0q4dduqb93hluayzi3c13yu1aeyy30btrgv79ji69gxin5zyjbaztwr36j3rm7eg7pubf1tww6l5yyt5buo4y1mzzgfr6jarc4he9kb3ou8gl4iqbilw7urd3mntyqz5uxwz60c2xyiwz2um414hdzr8ch7inn4pqkqe86o0gjtw32e76fpzc999o6dq1y42c38xv5f7ytffynxa6d00bujkuyf5m5h1dkr5grl2goqo0a27zxglcpikgdxe773xrrmupwlrzuzbm9hfleychgb7v6nledhm49m6cm410e484goww9bwrxxfgszuxk3xk0pm8x5jckkmyc937o8l6ghjgxper6yxzg3z8v16rpls6j0zdo2vtexzjj119b73tzjoca0snb6cx0pvqm2izg392r8uecfehesa39tj0xwfoqot3lwdcamy05iqknt23nc09bp72lhq7fot8wzypknr69uugghpky28ahg3qz5forjynaas7zq5slm87hraogd6e7bvdokrc3du08lv4j4bp8nvj7wg09qjlv7eokkmlfwjwo6f6q9',
                proxyHost: '8vm3go6nknj894flk1a611j37juuf1au9wxpzje44b0ug9agsdhj6yenrvny',
                proxyPort: 7484873981,
                destination: '8m4b8050tc30nbxpvbwxzdnt8pcco1hpzlaimzg0ptxnbp4lk7hr7knvqzpspnjxqcl2unphympmuae1gznkn0g02njmjp5nmmoqshvj0o4cytp0yd7btc415scdbhg3p9b8rjn14atik54mnx883wbxgag5yqov',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'q2e3lxr960ai8ilosdyep951mmkl1wfh13oh5034hhjv310yr3xam3jsnxnpsaaeen55fxqmfjm1pykxxj9d7zqo8brl3n09l3hz69vuyxk9n3pwlgldchxzjoncmnkhmg4dvhu91sbuj9faa3fwfky2ewqvv8in',
                responsibleUserAccountName: 'xqq12daxjlzm5q0hwl16',
                lastChangeUserAccount: 'zkn74ghyc7xnf1qbqbm6',
                lastChangedAt: '2020-07-24 12:54:47',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                tenantCode: '1d4xblgwynul0eyff3zwpq4lq49aav5uune6fnmonk4mqo5f92',
                systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                party: '2douatdy53o3hwtetc36e0nkb1oucw09x9y0rd1oqgdv5xv4pw9b3d8x6cmcq09dbbw5m8ryfa46a4qy0zgy17cjp2robzbllmhzwbblah8zbakasd1tnpgyg0lgywo5b5pgb8jtdod634ox46t71uv10jnrh1zj',
                component: 'kye0bj6z1s7gccgzg0fkc4e1p6dbuabtdhmh0qz3fi3ahip79fo5nvus6sijz2x11vcexyfh2slqq82ykpkgjp8h6egtvyk58ea2al4ityvoe4ydsf9uw4x8p0fa18zj9byujkqcala4r86mh1245i4yd9g82v3q',
                name: '4a8hzzcl86xm2uarzkrjhz1xn63y7p3z5r9uc7o15ecuklwag6w4ndeul0wxliobhvjuijagpkhmcjb1nsc08p8kiqe8hkc1gapur6k3kd4oglulillomyom80nnnaqwnh2j5q6gy739ioccablxfogmsjp2o3dw',
                flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                flowParty: 'jz65ul4hfhgpqx8tfoe3cksc2oj2fy824214edbbu1dynoyhrdymi5rrm48tx49v7iqa9glhcc7ezhqke2ma5v6vdctv66zdn4z297i9xo1je823wcm2u992u9gu77wdg6z8a6yzo2i1e39lh9axr4l4z2okyiws',
                flowComponent: 'xwze9cvtsanp45xz49lsd4eibjbd4p5mh1iky1fejxbyweeqwxusapro9uhe9o0yh6ytjonlb0f898ge4m5bqk77vf8ip7xv9gqebn8mbb5xiem339gswp2fhyj0g9rvfty5nti6tv54ujklh58m4mr9zvgzbsxe',
                flowInterfaceName: 'cdt0hzeaa6a8emctopjonb7a3z6ad45n2kiln5guoa52rqvqwwi0mmb1ndzeo9c23p2mdcbu6hs8dnl3a48pjagp2csse837xp9mmoz2hjhmr7ay4n2tw9aeq5lwoh7l8lwn7se9az1vew5lyqyvv8h2ppjaryj8',
                flowInterfaceNamespace: '4cdsewewf4csumlx0v71ikkaj8c2ey135p1i4vsiv1uq6qclx9fk4ya8ts05rriiy0iqm3nzqcsr0ul99f01pensi42jvuiy3sqe5n7kzlzacjke475x7pdc4a9m4jann2gpy64uvtmcniwppohjb4iplei0jbth',
                adapterType: '5ehgdjdg8359ikghc93cclt0vpz940x2ewjjqnj6jok4tzrmdisuxdy0h5k2',
                direction: 'SENDER',
                transportProtocol: '16fmnzkn04w11ix12zkddxnkt0nj9vye2tjnvr3z1mpmu17t8ev4p2zsinvy',
                messageProtocol: 'lsi38u27eutn1gushisfm1b03u38p2kzttqo4cpplmj5lanpc6h4wk2wjw7c',
                adapterEngineName: 'ltwnzyuf584ur52e1xjtyszxm3oe2hjdr6r9kpzr03rfnoxgpu23qj76owwkkojhmkt19w36vyl2wti6zgzlb5jmyikq357q7xqnogamkvd0ctcrrzhbnajdqgb6kspbqvdjh8ilj3j2muwqmolnwsm5tle2e319',
                url: 'kveqbniwb58fq12y3h0k4p153umw1eajqt7irxhi8l8huh69r832etckw0v36u2exvmtj9v6d2dh68c24dx3bnhd8qf3ux66ua1xw803ocl0uyu9c5lhaqdnln36y3ufyotvf3dder1g9grbx8d2un5587jzzy9o9ju94ibtll4pxcn6c6rp1sz8essa3f6nv45q60u0i8bsp7byow3tl90qa31vnr9bfvwls6o5i7ft1iipyfhjqs63u906c8vl3s1rwlg117o8yq3h46ctmad56jtmtgc1zgh15t071zbzvm6ju0vbchldqv6s9sue',
                username: '9v7yrfsfcykgwxgifvyr5ot6y9e46zbni8h8a28b2s8dv3pjj7bwc1iycnd7',
                remoteHost: 'xmre2gnmoisblzw7j270iichcpucgxzf8ssxxikcjd8kvpv95pq0z9fe4qvuf5r1bdj9pyjkd1wzydjnows59tyntwtg2ndbw8oyyms3kt32ycdg3bw70rrgtfemzyetkvqwtl09n2c3dmh59shsb8dgli1gnlo3',
                remotePort: 1204265561,
                directory: 'owrdvmirrhmb0a6pguf8decqi8zkkps00aumjxf9pk1iw3zw28lvu76ob5iurz576xeyikrb9lp5x8hkeg5rouauecle9r7d264rcvh3dvt9tn0pd1uttjjbzdn45pblz2vz0p72lhvir3ux5s9d59yp285lwklfdagzgycymeu14dulbt952ypwm6ekern27o8g3sgjrt8s5dp8co7emuajq5oquxqcfxo6jq43as2qn3qplnv5v51xmikdm9f5wttqv3p7s5z6d8htm69thcu7edhvrrus1ac7pwu7ydirtlpkss068h2m3bi2r0do65pnxsa7x3lyva1tdkiturk9k9kag2f91k89x96h835nqyayj1xhahzqwtywgjjxd1wjq3nsj2txn6nfiqys7ek20fyyrhk3lz9f28xwttgx13w5f6fnx4w2gwuaarjd4ipkqoo2qy7i35qi8q9dru8h4ibc1llfvus9ftd6upc4fnng3od1vsht3pl1okx6kre6u3zhsbrl73x6c3bsg9fjnqsd8tp7aakv0k6gjhopb9hs95kb6vx7f3yae8tiq8eatmw1qlvn6ebv81hk78cd5xxolj5eaq8noxmlqt655jwed6dwgotgzh6suqp2loat0j9hfjkjjfmkejtetnj3admncmbq60fzz6zfo0dada412dixlz2d79ctqkjbv5qn91dxvagzr5z73flmc0z53ettcrkkw802lbpxe1ypwt1rqgdk8o0sklg2kj0ho55it4ho5d1sot16mqqvnnel0pjm4fwkzef4kmqvw59cx1y3zde2aszqs8212v40z14yd5zx3keb7z9qkcj1i8azup9t16ypav6yj5mef8tfwe5s8dble4cwm4tpf9tqk4vi6h90g5yc19o6ssrx1mvepcdrueuqp9yepb62k8duc5m3e8gszv0scsz7qxiw8lcr44lpq7ja112yvess95vi5i65nki373k34qyt9cw7ugyindji2ef4uhm4xetn',
                fileSchema: 'zhvgd5xuno3olhxu73vdjmpz68a6m9io8jy95qgu41vkro5vl466qs4gyakp0blmfpxsujxoihtpc00nuymjj0oda3dj7wxeukrihwczfqu45mobnmnbee7xbjbzdxoe5eqxrka6ym35kmixi2ne6vm08igtm22e2ljcnmiesui46ay5nbfzps6iml96tlqskvm0fpq7j6q6gl1mlnnd9cmbo3w3b7jwyx4ohhaztx150jilpatskogq2rkvm8r65koacqabl1rj3fnukmp5hi3yc095yhvtnzscp2zekrifdqbr6yjcwv1v5m9n52sa61m8libdgb4qh98zokeqf2n7km3scdg3l36wic0sqtdqyfa01jpzbt4i07drc29vk6jjhxpj9c2q5q76m6n1ffbz2t5iwjrpuwhyxd4ndla1kkrqgdxwhjcz80eiri9of1m3jlasq9qraceqch9wlun5avwvt4340j46wky0932me3p2ivvunupfgq63jidrlxxfw8ysg18uj4w6trz7zyaewno1zqm855r1nl86h1ah4fd0ws1yu65naajfxzlh8uizbn9g831cgqwjuge1c3ac0gd1w0ldb85ajtu9q8hy0hvxm1hrwg4mumuqpwdywky0ay9kn8lv94hrcksalcpqelfa2rlla72x4lun3hll44m77r80idd45gphplox7ha6py5qqzg6pq61vnjyjtc81ty6liw1ipateidiq1sfqx0y4g39vgdfjnbh3fge5kz9jsb991tvouu6rawrkzltnhg9y7dbaq77yg06e196butvroirj66yt6xj5e2564y8e8l9sa3ajeudcz6mghko1u4d9lewg32qtpfm7cj8wfxajju0aobfask83rdy0sm1hisjwurwmsp1ojr1l9f66ft0p750gbija90afr4zehsv4rgdyedwpwzo2bvt99ki9qem9blczev0jzdcds2541i26fxl4dewgnm0o5f7s1e1lbgmn9mklkes92oe',
                proxyHost: '733i6fjtx94m9zlia1q1lbtpmk4lq3ezkrlzcabqjrxnzk5jr88bax9eqiec',
                proxyPort: 5123367731,
                destination: '8ww9099lhcc6ienrphkg5uj019mprugrv285z020tbln8nzt2z3v3s8v8jrh9xbur281anyh366jbzrg0jfneo09rp6rnp133o9xuplrwzz20u3foen324nu7g1k67u8ptoq9yucp7qliqcodxabmu2ll5le7cmp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'har9w8s2xau5qytnh2qjomnh0klt6rin6l0s0d0j9robvypr5l806krug3afhbcxjojpp3nv0hpd0nejm6cxt3ntypy3f2cx5g1w951tjy23dn5yspwq4wksap3l7pl1qbkrrjymq6v465413rkvg9l8rmdznmf7',
                responsibleUserAccountName: 'chqdy63fgbys989ohodb',
                lastChangeUserAccount: 'ff5y38q7vonm77p8av27',
                lastChangedAt: '2020-07-24 05:58:31',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b'));
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
            .delete('/bplus-it-sappi/channel/2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b')
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
                        id: '046a3e39-911c-4b31-948a-1ef2b5fa7d27',
                        tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                        tenantCode: 'aswrol49n1o4shl4hcdhnyox3sfuj8dnvxzspu9n308t6xjhqz',
                        systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                        party: 'o8prqu0qlebhbcr1jsycqjlqawqt8yaq4nuhnjdo7kqif74m8ni9zprfdrvnkr7xtj8xauq8g176d1a058qiweupi61pcht315bu4ca98oq9pp2uudrcuru1cz7ovt4m6dzu6b05dxf0ec9ytuho7tsdxzm82n81',
                        component: 'qr2ijyxjssz5599h1rlmnzz8h6q75otcod1rf2o7lssazrn2eg9lzfl6lyvujra1lect8my5p78d8cs3lq0p5haqrblmnkswmr6owjd3zx29sywrg9j1uim6oh1ydqoypyqm7o2vd6ohixjoafxnjta472ar3w9h',
                        name: 'duszkjebbe6f4juavgascaiuw2quym41p3d7x5j33e9cyh41n98aizmzy5obxg2e2wn7gxyqcb81fswrqwny3007z7qgzlbld5372ifwc2avial1lilgck3pd1m3y8qp8uxmzqi5b8nz0942mfmnwoc5g5kvsc86',
                        flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                        flowParty: '8idf24bwc4ykx1afclcobhwf7l2x0acu5zo8uj11bfkqjtcs9s94hpm3wy06p4g5sjzt8oqyq7p5t9cxjoc7lfgosmij1vkxsk7g5unagn1yj4f61lt45kbv34oayowy00h49n4n9lda4txpvmd009r3hvqtyq3p',
                        flowComponent: '6302z3rxdlh84drz5vjm356byhup9156292douifs1u4n4vh84lwko4ghidt3wkccmiln7wpw8kcmcct1cuu7mr77dgsd5bulbpeikdw0h2ctevr1jbf0ibk9hv0vjwxps4p2vxgwrkmsle6fkcrr3ggaqdvjw0b',
                        flowInterfaceName: 'gocaeevxi5f4tb2tlp73k5ort1v5sp3gzx6fuoff5pvfbuduxho0c8327wtq7cu6z3isin7k4tito51s04y9bvvaqtd6ytzg5cuderhr6di7q7j278xymds1osce7hxjka8d3u5mhcu2alrhbzimbu66ksm7e0q5',
                        flowInterfaceNamespace: 'l3cvdp8nd6v8i75rr4x9hzwyvwlpgotbzbms0y6ygi1xy4vqzdroibxxmunf0t8pxkveprgj1hg1zc5djxpgs4y5dqlbm84muouaolzv45l8uxb0v9a0m01d0n9gshifiy7od4tuv4jue49uu953v9i5lpw4ezlz',
                        adapterType: '2utwzsixuzpgwfgsdmobvldqgz55n131iyhlffw84t4ux57e163zrw5uy4re',
                        direction: 'RECEIVER',
                        transportProtocol: 'gfe1vhqrlpe45r7v9ld0mir80pn5rd0e97b8hopq72i67544qddkvntvd1m8',
                        messageProtocol: 'sykbqz6iuefifooqsh0q0avj1h8gv1jtfnyplbehe47fjhi3c3p704a0nktg',
                        adapterEngineName: 'kthj0buarjqdr5huiqdu81mhvu3ipg5oxbqvqvh3sux83kwo9hq38g7r9lw8rs7yybcuhmkurwokcs55sxbx85evqzeb7jzgliuu9hy1jt7rq1dnb8f1mudfl284k433j4kfc5idu3gxmmb84f32gyf7x3j0zkjq',
                        url: '3lbe3wk1upq5n5qxvfxbe4zfvy45ocprn3ro8yx391spgjjknqos25q8jwi5lycp9wk17kuvknxrpl73zp8fusv2bwucx2wq5e6blcaxtpk7ov1dn9vyazs0q9oxpmh3vzj69r8taygcevch6dh2csjami68f3we1bp4smmuwi53hkn0lxw5vrjkxpld2u59ub7zdk13nvsjlljancjuylml6xxcsfiigfnpe4z4ze5dk9o1hs4596523c7c5jj64o6ju9c0345jqyg93omownncza20hoov8cosvn05cb5605kcbc34f4gvfyfmi0rt',
                        username: 'awzvuqwlduw61xc9td6pu9y10ai74ohv0ar0foszey3b04o01zm7z985jkch',
                        remoteHost: '80pbph9g9bpeefx7ml595pgf6cymw0v7qz23ddavg0wv5ja9xu837p0ebcic6jxz6we6zubt2bx7xc7gfetosfjky8dqzdux6j3zn3ky0ovjmh7dd2ogzsuboxl6d1ldrejm1mnuw9uc0rhmbb17nvmw4iby6ntw',
                        remotePort: 1945470112,
                        directory: 'cgt5l12b26jowyly62goag5e8pldbvjaxbpisdrhz48e9o711g79wa2foznq3uyv9we1vn8rj9tr1wmrwtqhs57xllmli64h9qj8xq3hmvhapfoyuogxraudq823or90syg28avzfs0sicbpqrhk088oddxtfxjj7pj56ss6bsrp89age5pevarjhb9iskmou31r4m32aoqt661mclus2pxq97i3phtqt8d4toh5wexptu8s3ehyqpdgscmxqhi8jpmxu04j0exn7nqufi9cfzh0544d90fgeex7ydth6ud6zzmbx9xj0xh0pn75k55kgbhgxh5bbev6i69mmhu5nkwvd8scpfey1z55wt2ch00tzz4g6dmpk8eqg169k9vtk9wg3aozsw0tuedhf77b1crd1tox1dmkghazfwjswksyouagxmiplziumwy0m0z9afti0v9eh76d1xk4lo2uopt1qddq8j8gfwrsuhrgh6tefpw8r1plb04p1dcmvjviggmlebazp3s0g79ftdm1zhzt3wu36ql5bs593w58d3gkjihyu8awphzxfb4j5s7ffigh1vkytt290or83khhqenwq7bn69hteq4ole81jnkdxk6d39q2sddyopeaxgns21l02a7zqf97wrnwr6316cd3jfjpt1pa5it5dp0fvr1gfyrj8tw2jmmbx4z5juckfodwt5ase9qzzfpi1qmuenq8px00e279onzmbg3aqg6hmd5c2t83gdziq37pk8wnji4btuo3lybk7u14ro5ojjmg41wevbzo7dhe1bfq34jdtmeh1lbq2tz92uv0oteaduwlk60yred7sqp9bns2ykcn71w2bxq3l3xambt7kaw98x6xbgxqtxxcs46gs63j1i32lthgsbtx9dbwgeyb86vsv7slvk2xsf9utntnjl9yn98msypfglpe4dfvgl77i5k4nql3iza52uniu4s78vpv9c4koaopikgmm8mbelq3262llbxztbz7bjbkv476',
                        fileSchema: 'zv8oe6nz7fkzmxgvh9apf0vlxixke7sw7791vhbj3tqhtb9n70whzti1zxeooe3kkqa0ejpnw6g1c45rtdqpom994fsvjhbdf74923onw4ti4w925yrr0up018bxnpv9czya1fstakmag1hnz9mz1welww2hf2xm6b7vaossl8cbzlzn2w1k8v3jzqkc98iycqf2kiwdcczg5a0zihp6pkxr0vtvd594uuvcabdfico7rxhi1u91dqho7k9zxfz4ss1nmye828f204j3nwsobl4qxskjqismcxp8ojsyq2ktl7igaqab98nlqjyg22wifqdu9ltd2kqksagq8992umpj0q74uzjzbq8rnjaczjnijoi7qwv20qvas3uk3tk1fwrjfuum3ths8cyymuovcyn3qkfaz4w4xjjvywkbt1uybr8v12m3yd0v3g7as9j5girioly3cgd7o47ce635fpuj0klq91yz0jzlkkyltkl64zinb262z2wnv5ms5qwvoen28pmcywxv3snfnf1xu03ft05x9i5z9qhrkc7ucx7l9y5pwcjxkj3lt5qyf2m8ip376l7ksktw4oje4kmnmgqpke4u0u4cfgaaqin87yzc9bz1ue3bro5ww22gwdjanthjnkxqn44d5r1qp48anriuanpey7nqgtgyt88ax5potaktlnfjref81f9i1ktpkqx2stm82x51i0eu4owrc6c8fxb77x0n5qoiectwqq5gerc530no3m4ov7qzfv2ilikqauo4w1fzr5aumi9uij5l3j2rn4xry7eyd9sxfw5e6607gfbygtchjvqr694bbisduc6nvjfwpr8z3ssv1gourf5pop1tea3fmrsxkbx0sc3hpibutfpr6dia1l2pe12pa44brw1aheqift1w83rxhi3cmmkg5dp7zswt8arwzb5fs0rmixsbsasfpo8wm3c6wkopnb40hfz8w19qvxcjwosqzognla1j6im1cg2hjspci7q3y73h4al1ce5y',
                        proxyHost: 'w83ua4nr158uydu8eoq5mjxnozes0gxn97kmpxvly1qzh2g4bn21i3tqoyt8',
                        proxyPort: 9025716557,
                        destination: 'husxrpwzo25nt5wvqpkq8pnhs20aq06uqpwczjm3wvo8pcx536yorkz0b32bis46jscph8pd8pcn07siryxk9xpyjyhj6qkhn2k2layay3w6hph6yn64bmiaweqvxh8vv76uw38ffhkk6n84mhb8praw1g31v6as',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '4ane944xxvi0wey2qhtol6lt0zivz8vxsylva3e7c7d3agavcjaa8rhg33zwnpu9qw8jz17oe8sy6tv4dhomeif9b8hqof5cp2400kvvzqrp8d4bnytqhe0cin49wt65xzcjou375e7127b6j2hmrrzkz9tqllz2',
                        responsibleUserAccountName: 'b8vd49xy3ltzsw1hxlv4',
                        lastChangeUserAccount: '3dw6zej0hej1l1nuhzsn',
                        lastChangedAt: '2020-07-24 00:41:26',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', '046a3e39-911c-4b31-948a-1ef2b5fa7d27');
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
                            value   : '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b');
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
                    id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b');
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
                        
                        id: '63569b4c-1839-4e69-951a-c549051219e4',
                        tenantId: 'faa51619-8292-455e-a7cf-e791f8f365e4',
                        tenantCode: 'y6wb65kajak603m5iscj2xd4akq1w0urca1e98y450emtjpehy',
                        systemId: '5534b5dc-034a-44d3-b27c-884f4793dcd3',
                        party: 'p340kvfpls6gbbowuksgwm67wae3cvyrrmh0w6vr360doxnrclcdigxx9yynkp2tmu7ywwdeio1m1wai0604ywham92umy350s5wdrf7o6wpkkxzk9o6kc06k6mpx7t311ecz104uqvjd0bhr5u3yvuewerxbekn',
                        component: 'gv549ee5g9brrlgcs5k8xsysl6750aapdepkk9je5wopj20lslgbfrwtzrfilrzcnl42yqk9xsslb3jyj7a59iy5vu9d0seuatz2665an1zcc4xvaya9pjkptdxqjilujmbw2t5m35dwwzasjjbergd7o5blzrm0',
                        name: 'ttgj0vb1wdlagvzdnkj204o7pvtqupyc7m11ei9f9slstkzx8a5iyvr68v7bsyivh4zvgrodn7tb4yhm7e97tr4sx5aom6uouolbtxu1nsshrm6bzp8fnpuscx1hmry19bwln65bcicjc80j7zjz8phax2ao6be7',
                        flowId: 'da6c2431-92f9-4f3a-9a97-cddc32c9695f',
                        flowParty: 'u4pjbyo2g49c3zk2pjest7ux72iczkl724p8qi26kq0xuaz4o7x1mi4ce7tmdccp80eykxo075o7l6uyki7xhic1uzk2ujd050e6a37emh2opmbz7llud2zougpw1vxlg808uhy2h98kn8i6ncwfdy0ujs0ugzwb',
                        flowComponent: 'q35q399i28z1tj1fhjs89sesrafm0bc5fo8qx1zr3eh9pof076o99l9ftpd41hqlos4w3zhpnji6kef5fl5xkgqkkd9nkiowfn76j0yp90s75cxstnlij854ymkkncbyf7hihxjgkv37qv1t8yavhaorg68du1zf',
                        flowInterfaceName: 'fvkny0pof2789n63ymv0ube3xpepynbyzxgx0jpk0cuti6w0k52nuiutvvl7i42wp86tt3p3fy11vimmde9nty3wparpbe1vx87sgo9wx521ad8yndwrn9u6zki2r1mx82r4lt6nnesd856v613qld5a8i94vvz4',
                        flowInterfaceNamespace: 'c4kp4zrjrzb20h84xgs490r09f6n6xvf6s8ek8u8loa6yq5lchff375gbo8clne6gxefn7y49q9npadr76ozgwq9vi2jbtl8b3fqxrs6xwtcjkwguh6c7lzvuy8k5xqfkqbix4nd1zjendgczitronmj7tnrhlnw',
                        adapterType: 'tl8e1d3v525xgest81sfnvgqie6h4ujuows4o50zvc6knxnvfeh05n90fdbv',
                        direction: 'RECEIVER',
                        transportProtocol: '044ahbsujiinxtgs92510s1sqr5yrwhmlvaopcftpibjrpvivd4uhu0ki43p',
                        messageProtocol: 'wk8aqwf8cv2kquafulsjvgqu6l0bhsxawz9qmdwx3b2ojbz6bqhpun4plcq2',
                        adapterEngineName: 'l9dhnlqoq0duz8ev2rssx4as47ykg1jj4yx0fw5ub6rjt6kcqlbiy1mtarjfautftt65to9xw09du6irk56sqga3i7od2zf90vrm76qgy6ikbdcv210htv3ywtlmkp8slkhstjbrg21h4dv3w805z73qwzuibruc',
                        url: '250o6ctukad8rbo7c36vum64ee07yx0us87bd3oof96k7d4fzqpix0kpvwmwq28cnpzj0wv3stk7f9mhhiqmbue0z6jtsvpczqom80ib5e6gy2wgsbb3whoffv1893jexnbej4s0xr0n93ix5mhsl5rchiczmmjzvsihvqrrqlfnzlrtses1cqsn0ua6ygp43h1x4l4j2asi9qa5pkkhgwxxefqpzeqgrqgcfcag27o7ivucz5i5mfirqzdgpky0po6sldxjamp7l8rw3umpu0a2f82s2kbp8qnfhy8lsxzppdj0fj9wyw8oc5xqdx1v',
                        username: 'ab2apyi1mlwkzicble2sxbea03q3bs3qhe8qdvdc3ayl1ay89mwzp0kb1gwt',
                        remoteHost: 'd8r2qtdohtnuqdt93zs468i2sxh6knk29hp2fzeg0k6srhouh55k0zdk2v1iy1wjafsn5d675n3jsim1vk3n99sopqodhuvtil1u01ccmf0gdjeoxuwq5pqq5fkx2km2svjvuvlcee0653n1v4f6jhdslrzys5oj',
                        remotePort: 1969888763,
                        directory: 'u3o7804d2imy44wmqjl0iv6ov7tjupt66v9oq8baditt96ynzbxvuven1q727r84pf6rawb8qzfc78etbko5mv5pizre2zzlpi4s4dxf6c761exakdye2j5682by2rrwxhu30ocu0mev6cy7c5r2r05tx989pyggnmy754e6dtbldssrx74fw09kw99aez2fa7am1sm0kvkosylac8rxxkc3nmgjxgtj0r1n862qhx6l9drxfckxrgkjjo3m82kxflc9t2jr8s74aa2ofsq6ekxyfl49sebapm5wnf18wrkctof24orc6n7a2zw03norwf34emjwhg78qdjcbvjudb5w0nppuxfwdobono78v5f5apflzoctheezloi9l9ytnea8hu8q7n5yj7f2t7jkrku83b541tktmapbpu2hvcxl8ls5c84gzk7xgbm48bzt9u5f3o38yktwxzn4ruufswvl357niu0x6byrb483ntfnui68p2862x0ytq0xzc7jnpuo8nf959iykhv0o4xbbxh8o1rkl3it00srzdxv3lopm434h0d86azew4jnxwxgb8zy5i2v87jetef9q75ycwxbotcse1o4jg7jbiiwrya1kc1ls96p9g5dbanz0vtb7woqmkqoisc0idycifgqfe9bkfnjmowl9go7914gvgtf9wzeqmvy833jrs6zsmvnmtv8mppvyde1269wkvjkrbq4uojdvrmrlqz2c5sbyi126fqw7uquvrg7yalwfscn394jadv7finc4flvug5jr3vl4i69y8o50ovftuwx9zdvvioh7l4pfbbxjs7vtn98dhfv778pdyo9wps7helpbwq5letkrcfs00od2kztr1aah05xo06vjm5nzikfjmsdn3wtv61cwn6gsi8f7xzxpckmknao46y9za1758re59ytnsbffsqwzqejwfuujgxkupkqqauulx11v6n5q9zemsyqq0ymb3diz625q3ksu23a9whuwxnftyccuitx96ig',
                        fileSchema: '848yyhdtfv9nf34uoqwsqz335niqjx9zn44hnxts6a6tqgugdaztvs6kfta18gixag664hlialn1g5jgr9xgn8dr8glv6l9foty26z36blqrd8hlhewdd5xwspkdqv7yn6qz5fttpvowximmfhas72p18wmvkk0k2lnic9r27lm9g8i4rzlk7zhmskczs8xpamtmxhsj6bnscbjioc3jmj9y9alx1havwk85wg5hno7lklny5np6nys9ru5ma4t214f86j416j6o485fl9qkwvlulwtp9fp16yn9zyladoofiv6vnjf48j76a97q2aqp7ssmpegyj8sjjw38zspedgvorkidfpwp8xtbyb3hryi8340omdzqch8klr2bddx2nw4bctvyc34o7mus78dibwojw6sjzfnpbqo1seel2g14aad9ss6ss0sh7s956cwfoai1q6xx0vt6b48e9ashtdm3yq5azhu11ew3hadeih4uh8e1uua2ye2rbvpanhbaz2dm5y7ehfynx5o4ffdfughdlyxd9ktdgk53kc765z9jcokn4v1mam7c9azzzmcdjf3l8kqwk3l7ux81s7eq1tlwj2j5w2uehamp2t601su9pvck6wpk8p2rhfwcli7k0rxdx4btwvmz94kkg2mllp5cb3a0q8bbdrepv5eptwomcfp9q393pjpttowe7verv4a3336ob8dklzwekdx1qt09s3zgef7vq230xodoqjwwk5enzgl3nkydss2lw5q4klnkwvr0i7p0evo6hhx44ix1i1tq7olquz859qpxeohl4nssg95v63rxgi0ic5afh5w8acak40p3ha4ynvdrc265nounr85ilj5r9z5lf4jw5cdrwlbol2c7aaazho6cltvjzderq9xffqnk43zag5mxaphw36b86ofa1xhwv1bz33fijmv6jnj2wi28qzr9121kup0vy2v25k2m043puwbnewvbwem69jkj1ix5qhuo3w210m6d67ngke8enyjv',
                        proxyHost: 'u1chxklqcroe4293nwea55q5h41fxr2jh1a62gf53ls4eky4hyvvzg7cp4gv',
                        proxyPort: 1498378532,
                        destination: 'avgf0bhy6htcubu13oq1207zjsuo8r4amgunsf8i9nud2qka7w66ynqw39ijqp28j962wmggez1kgeatqinox7zzc08w6xwjnkvnvzhru8rzayg9buz946onvw6g75zhvnmfz8jtqy0b1unmwstrw5f1pz48yq8g',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '3pdin1m8bwvpo20yc6r85qy7j1vuvx0d4pv1l22znz9snjtewsmzxt9ry6o32gc7bcfgwqz4i789z1gcop41y6s1qhnjmi2wxt0lki6j6pmcaqemxzydppbkic4d4bjru3giogcekwt6hk1cljuqzu4elrq466pi',
                        responsibleUserAccountName: 'spznz7riamx7etvabbuj',
                        lastChangeUserAccount: '93mggg4xgu6ayba4x9jp',
                        lastChangedAt: '2020-07-24 07:56:43',
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
                        
                        id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b',
                        tenantId: '3a8e29d6-9844-4a64-a555-c2f31e8dd07a',
                        tenantCode: '7xhc15fvmt5al7pgbbq661yyhu4ivb1tyg41b9ypkwddddcya2',
                        systemId: '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd',
                        party: 'ohmg9rou3qyxq1uvmxebskz7llm5po9wiall6id0cfwpufp6gtllhrz3wxeholklz0umzz8yltkc358emwu3r81yeu22cdf747gnkmav0yv1kbiin6okyforq11f32t5g7mgnpa7t9rijdv7g4dvdk2dis4pcee0',
                        component: 'm84bg6zl7ma2776lvu9k6qw6vmqnhhylhoqnifhas9jrst1js3vc8nwzxzgdvssk43c821gvq48p9zong1ss51sy1uompsfrpqgrc93wf17pxwg0g81v3fjaoyknxjnvwfhp41y96idfrknbb0p4bkpgm7xiotyk',
                        name: '4wvwb78hgqfwv596kxer2w6q0mtad7f5v2k6n07b0wkr7gbgntw72q71x6yghu0nwgio5upa7xzanms05vwkr7ma1i7lbca8nwnqfkxm7ucyrc30p0l32heu0ezirdi57snmegqifru4g9dkn02vjmvvzlct6k03',
                        flowId: '0fbf68b7-c9c5-4334-8024-cc56490e0298',
                        flowParty: 'dyu2u39bczfxggyru9qalg14g5b6u6n5xkuj2l1gyi4yk2cvfx3btghpqicjbgqxqezuhnyfr6raazixcyavg8gu4rwokmbyhahpb8izu0fj70a8r58mz53q0k6vdxkot92se3ngo8js9g3h0b7dfppo57jnht7g',
                        flowComponent: 'a0yy7147pnnaga6dlfb1ac6zq00ud3g92cfslr1kjvqi5jqg2owono2s188adp565qrm2hzeayoo1l56yaovwsrmnhd5hiy9sl4x4da9w9lpunmw7rk7kbqfvtj31t8armwsxea8vnzezxgtvrts70ekvh1k93z8',
                        flowInterfaceName: '8wgcfujpfpyipxyaon3t7891mqbs0d7ah9qujfzxic05e35hoh9wn6j27rm18v4klgb7jqbz55ti0u2sc6aq9t4s6gqn378zrtn9a8bxmcnvc1i0idgswybzd8a7c006mczgc9k4fgabaxgdsi2f2jxytc3d65ul',
                        flowInterfaceNamespace: 'onrys198wisrq1ymgq76yz674gg5jxwiy6jt24hz0lfmkolxzg2qjfcmwkzjyilwgcupjghp48wb4ofto3ximqysn9f4gu2nchd6tsifmymj1l4r4wxflrfob6aqhciv43lf4bl7x6alcdau4hovle80p0dcnnln',
                        adapterType: 'j7j7vm5jx9qzaa6dzrz1p2sbj8o6tb4eedgw8n1fs638uocacjl1uou5hcod',
                        direction: 'RECEIVER',
                        transportProtocol: 'chyjg304eg3dzvgh26g64lhbtgh81u5z262xsx44luelc1cdugodwqmg69gw',
                        messageProtocol: '315n9eftpc974wxzmhhg0a5aj1kmqyf6bsvwqob5opzk1s9afyduix8bamc6',
                        adapterEngineName: 'gu4l58u0biea5vn19vqv71pdwvuw3695geqi91r0gxuuz0weykdtzxr5b3nwm693lfg0tixvwfh4n0lf00tpd15e276fel1enm10y7l1rc5k1cf81nax4efo52dtiri15en1qlgrv6wgufk6j2kt5lw1tzlvifsx',
                        url: 'wv0iu4o13ildtno7fiy75693txttc8hvbi22zqbfceg6innn3dgrhq3i1tgh0vxjbkxgds93f1f38sprao9hv6kgk7pb58q1keryvk0oz65e4t0gkedr7y6i1cf8e54qu4n5dtqr6afpbondjq43xzbso2tdzbnu0a95788rkdtzl6u5tlm5qyjovp4zbznembn6izgnz4nythe49arg6wez39znwryx86chcubh9bcx746tm2vrwtwfukttfdytlqne4upfmp9telq98yahbghojgy59rdh3sbtvmw69flgxgjzrw7t0o0tlzw19xdf',
                        username: 'ts92d4ejvz3017hkf0c71hbgw97g0k61i7qhwgns2l6kwkl5riqze96y9be0',
                        remoteHost: 'o3m5bv4yo8z227nrb3vkdysx2bcg3qk62mnnqtfptk90mmfkz9ktlhj69i6rx0iz76lxt3x5yyrbgiet9kt0xd51chc323ca48ca6peif9javggbliqon9hycblnrw7hy3d3jxrouhlcrgiaabgbmom7yp723ia1',
                        remotePort: 4948876200,
                        directory: 'n503qpdfdxsdpq9z7w4pt24b8lmdgs2ipu7xnparljqo4cnj5wdeept2vauj0hx543xp5qpbdx7urf8z8h4hvjercpy2dge6hve2mgdg7akfjq0rjsu5wr60gryhbunc18lyx8mwycabxbfqm9dk2hiuq101f1c3os8erz3fm5hm54lpj92p8c2mdaw6h530fry8qxue96tqtqhx4057rc5xfuew28zjwijqma39c1ggp72a59dvogclh5aad1gke7w82hphakz2222vp7eg1i4wkhbp73gwh2jjxwakclms8j41xt98ortaew2c66vczdevznrcijckoojsfp4okj3i1h0kh2ydfm9j26i4t4qvns5ro88le2lthqqori4e016a5n3e8wshmgx3jdbsxqzy44ofxgjl4mcvtu8szz142yyjpp42amdsfujz9b3c95iwreymvgn4do4aq2wk5grbhq5tl09xndp21hzw3tcf3jk5ehtbl4o54kx5lh6p9y9g2ixwgechy72zcwtizlbnccdxk4g02dkbdzaasqiue6dbyitgov1ljm6z547dsmyhry3566r33msw7dd4ls86s7ptsus78zp8k9j5emhi1qu6xtvorxg8bw8bntysxbrqbcwgmc4joebiujxa462twa7gmdf5oe7k38hppqgwfu5be6gcwrmtovxfs3j2ichw04mhfgm9uhjx10u6enu34yh27siazyzpzubv9apuv2hjtxushnwd9zcxofm098bzp3ivmixym38gad1aa6iqpsu830mfmgep3i3103s4badb41sktoow68p3v6wbv0hywll1rv6tfazsvw2tc6zu9l13ebpwdzk0jt11w355eoblzze6t9ylj20n95969qew5fdymw00rrhg0ce1mnkhh3p1byn98swiwt66uuro3xvf3inwl4321uijzqhclhgi0vqs76vm5obmsynuk0mroa0u25l840yl2jntm1a7hahlj36vnnrv0yl11cne',
                        fileSchema: 'b1r0ipfvifbubnewynk51ap3448p1gh8yi9hrmbai5l8keealrcwa84up87y5nyaawllmrhhb869kr88ii6pxbb9oim2iikdhxvlj0tjyusy657xph5vwq3jawwtfogi4uxghko3wni4b60srfqijk64nmpj7l0s24urekaslie0xbqpsj2b3h3qjjg30rgtuzgaai94ty90b7y9clzawl06f9jge40e82nqjp4wy6bdn7n9j27fgcm9yg0wxkbtr86a2jzyn20gcwe2c262jcm6per2docdmzyg8ztae3sdw9cu8ffipwc0ldnqw8cntit468rhrngcakocys8xgfglyemqkbp8mpyhd9lcaopev4izmzi2c00p8bfuvk8ba9205y6ekjrqjqvbgk9wnci8e53mnee4e2at36dd1gr30hzyq6czm7qkiqaqalgnas01rlqflpodbbzirfdhfpw19ppcsc99q3rj3kshoa8lks9r5t3q0pmlzhbimu8gx297zv9qarueekt646b1hy22vtjrq79gxob6ki66axqndhlnkgaowijis1ii6ruth4xblr2kfwanwkltfu9lzsvfnzd14f481gfyxi75l9ccjj1mra3805ctvroo0wn96er3hfla2hr0rkuzwafr12y5lnhxj8w5smdadttiokav3jjygok0sur98dcpjxzr7bx7xvlqt51x2tv8xlte47uc9o2pt2cutpk7m0pzandvr3qvthkyomvongsfndf6b5scxszgbxhs000uxglviu1s5ypg42pdghanvgpy1ile1t6k99bdoexvfk7q9v4ne3r4lwupp4hymu5i4w8kqhyzkv6cs5najyuk7egkerm55rvsv7j7bxw6talanjge4ij7ss7mjnnj64g0uuwz7v96epx3hgbqbl6f4q411afrd3tbo6ttqumnhwrrtvleeex6yoey0gx911nyxk0ny7gdlmlqi4tvljunry0bapa13vhb2ptrvurfxu6uk5dh',
                        proxyHost: 'dqsgls11pneakk1eqa9klgloh17wlqg65sjfajjz7pwu53gyyal1xh75r2ij',
                        proxyPort: 4914502567,
                        destination: 'yiovfng3ek0a1i8cztawromo0yqaprl14cam3qshyu0ef8xsnc34tzumw170w8ss8rpq5bg2ho7xj9rnlm1pbcd7ytfccwtb0wjs4owdika2t9axciethuu6bxwnv6qpv15s5v5upc8khenyn33e8gm5q42qos37',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'v3mq9jw79t79envjpwdn5v4cwkp0bwaxyg1aafb2afptpq2w0ox13q7i85wqmn0hov6shh42hde8bzylenetcs5oj163vro2rhve89qldav442271kdoupablipn402dc09hl6gwfrvvtd8pph9il79genft1vdu',
                        responsibleUserAccountName: 'ks10wkzyqtt0zvpymt18',
                        lastChangeUserAccount: 'by8luzwvldv2uqmohucq',
                        lastChangedAt: '2020-07-24 08:16:56',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b');
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
                    id: '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});