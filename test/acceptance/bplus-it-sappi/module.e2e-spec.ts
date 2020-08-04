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
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'vly7m0lqxzlv5sa7yomydhp5a5v93pbc3p7602x5heoro95zpr',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'i10cdjjrzwj6bzurhqa2',
                channelHash: 'p7baqb634sowjb3zohydkkheewc9k3pmer2q1o7j',
                channelParty: 'wz0rzrrec98xquieltvm9nldhy4rq0f7mxhhlbtmrgb0pzt7bnpa9qqgg2rj3u92trc5pcb8l6q4c2alciloi28jb4k3f1p75kcu0i37ypsb5q3lfcw14w7qu5kz1j8ta8xwllf1q1f68weeuuuz17fs6lb2yvv2',
                channelComponent: 'fublud6kqld5reiqufpsual9zlfeglf1czohbou7q668by82h9g866gbjfckq3h25njzco9xca9la0whu8267xfbwf9ou2ndimvctd7a7xol1bisydpkta51rphowpnypozg2hzoz1pch80xydioprwyzfrenw8s',
                channelName: 'xg5zeowo3ask837ycyxqa2vg2b79bn5di34q5ve1jszk22rr8nkyyn0ow72o7108kg8dq1assi7n1rtgxmvjoygzekazqvt2mur5cclnriy91dciqr9bbceztr0fu66x9gajde45wlghnfps6w5hdattozhrkygl',
                flowHash: 'ef2gez1nux53umx7gq492cebtwcfxab2md9tx16e',
                flowParty: 'zj9eznbd1w2foqgmqv7v2y9oxno1kyjythjj82l6y2nosm0rmpmk7gwgs8y0xt8z5wozz2nwftr43ltsg0j6i8dryq0pxpfwf9rc59yghuo05tvqjpldwvd8fjqjmtxko3r8w6ut41ws4ci00g4z0ot3wvpmesdn',
                flowComponent: 'a7q69rxw4crtmuq5hmfoz6gzl8t47b1qayfgfugwvjtgfty8pj8h0yz0oks3qhc4tvu6on7nm7zgei0cm2vffguh9un8wjprkufhamwgfm76ig5tynzezxuzn3163yacqtu5qq4cvsc42lbsg7di0kfi310xf730',
                flowInterfaceName: '2prhtt7ukc00j7i3iz50ov8moxu59uzlfr8prexmu1s8rkj2q38pfcwn89ayswtxckglfe9f7piwl9ndsq4j46gbus574ml6xsd0bjnbi9y1a8hb0wx2sugu0jt4lq99xreezabkq1aot3qqs5fswgpo4gzqzbnr',
                flowInterfaceNamespace: 'e9jjyckjccuzfjvov3gie1zg8wjbfutr02nf9luc425cvigyt31q8lrennbmmmq0e96a8sf8f3k4t7vy0tu1t0z338m1rw1bsamcs33r25itooet9wpqaw8lio8nydgv7nnpva1cmsbi4r7ol5t3e8nuvw1irjih',
                version: '9yqonr76ilgawxx8yysk',
                parameterGroup: 'd3rbbgfia9t4aa090f5780h7bcw1d6nya92he5ywdibd187sqs8ldvstnichvfy9f8k0s2hvdx4orferz16vf9m967h0iwv5c15m61xj91ula8706plczwxpp45zbr5uzq8y9dfui6igt4n494qrpgjc8d90s92245f69e9lufh9ntv1q59uqfzyot7vv972py8s4ezni0hlh39610q0dulsef8wedmj3kd2iw8c8cevdsdlhzpbm2lpv8ev0tq',
                name: 'o2fbl9m0e8l0xrkx004qtdi8ifzr5oylv4gfaquv7ygqg1u5yd3u9ncvhq2oqymni26p7zacweg74ibi83588zzpztmrf0yfv5e2w9nzlgdxdzy4yj4pl2j5eubffdc9u9rn3q4d25ag7y2aju2k8sobdxz27h68q0whsyr0uccjf123jug41fw8grnd7ky0t4rbaic92iqg5ddoekw25o1gb2qpbtsgdssc7qanej007wr1inr5z7izonkspw7muyb2cmhzswatff495aawukoxapj47zilu8q7p9yiicc1wxjrc6xr6h88zrxe8j7l',
                parameterName: 'h9kwk425apfmmwigycavjlxoypem2noav0hnxx2cppqc1zu9y6juxn1whfh11s0f0vwz9bo6axl5jxdkaa0u3x94vifyffli5qitjulj7x9agd98muwdtqvyjmqcxq3ob4w474hbaqoid6m6t4zubs5xtnay54l44az52c0h3ltx0idjdyumzjiodopof02yiuubrqev5pu95uuacjwmmg2chfl2f67jpow63thk8xkxat50sitqmj9gebyxhb50536q0rkyyi3vpwy7jw7huppwi3i9t2rxde6i04xdesp7ljwx3pgkebt1khadnwn5',
                parameterValue: 'nvuz99hpm32o6h31g2qys4g5is7pwprjqn0hizm04amj6wde9841y1qq128qm5ghaacfq9hhqem3f89widabgx45imfpwou29x3npuzjg6bnvd3ulhm5u61mhcocqavb9wsaaud97gryd5lrqql7mxm74yfffnbd9n61wqqj0659r84mnsl7vmcl6y3jqp2z7hmd5fyc6ehm7g5dmjyuntnnq0d743yl9kvb3zdm1qxyuua31v2457ulvuitmjr76ojjoa726lkq6jqjtw44ne8bcuv6mdqnewt25see7y4rhqt92to8ggmbvykguld4911lsezip8bg74adm7grls535bgdvxlhpo2om6uho3fyg3egnzgx9ihbva3w7n3jyf98j9mpiz1hvh4a4x9q3iny7uecpzg48xbpf04ttg6jp7qkzzd45vtr21big98fl27fki5z0e5jtc68w6n46cyusgrza0br3o97hadzxeq3aswgrw90gplsz4j0klfqv352ste1pj8ylqcoeetdkqalcstr6aei89r5260xa7734nkpjwepionv6wrrpklq5pafreue4wwu1g9kjlxpa90m0usr5jo2j69en3d39c37jg3gikq1m09r23f0i4ef06mnuvar4zlbcbboft951ox7svmkoivsf24pl8rzzotesfofxbecj8ksa4pqpqdyxh8xdmt6lu7g6bvrddguvcxeyyomx4qln9ik58oaspmdpnl0zxbk43jagws9x7s0861s4fenvuyijlfhr9u61vqbds4254kfnps9mz82c2cpu1rzdkld14m022nljdwfxej4uoqbwhqonedoo2i1ljjfgf0r4otnn7ms9nf8tkjcx8m3aodd87mzu5ngdu9psem025r5rz2jkar291fpcwfeo85a25hl8tzb1caa9bv7otonvhi542ji43rlotulpmr5o38674vln9r528la4v6uwrapqoaj9rdx2ieynr37m5he4jobs96jdzlw9i70',
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
                
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: '7c9mqjvme408qmsxrokglc18b6jw6cof6h2evvksm94ohisy0d',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'uj4klu14px24q7ftxcuw',
                channelHash: '5zrr744l8rauspsspsp742km6017dabnmnzwsxsz',
                channelParty: 'clwpt95tdnademsj7uwn71nkguv2t3hbbiq54zd6xfdonl2ogoxuc584gbkploukoxmw560eoummo4wn13n6qc7mhaa8kliffedw7o15gi965d5k2cykqlswals5e0pv02f1wurp6g2um032i8xuyu4rx6vbpz7t',
                channelComponent: '4zios5xl9rlxchrq0pmsst0cnwhuuy7q5p93rxwuogfqf44a2ylxps7zhc2b6e1yboqd1gvk920eb1vuvkfx48hk2b175hjaom3suawlol8hslowie02ggkdpry64txiqayuw0nix6y4bchauyespcxijfrvbc3j',
                channelName: 'pf29k7dqib7aiwb59lyopbhpss9ttgs2p5vucfkl51lpz8jt5mt5wym365h8kuvcuwzne7hb6o5r208tkhosak5i20ye7r6wp6lyje2lmo4fd7n4d3l6uu8i6hvw2iystnr6zv4xd385kgk86nri0bc8xysilj2n',
                flowHash: '0p6wl207mh65techicbzk242jr31umeodtui272v',
                flowParty: 'oihbnjbcwq6ht73c4k77n5pibma8vxazfz9c3xmo7gf914tl126vx0do2dypiildh9wk9f880byq3lb0zu7wyhk1e9p3tp8eqfk7yfk9z5yj86l7pfjze798vmmz23j00azjyxfvznagxcvucllomcmkaafxwjwi',
                flowComponent: 'diz8lmam0dkbs04ol650hyy1oglhovuukcsohm8yhc94gjp3g5187spno9rlsraxa5kpv48bc21ycmvcjwpb3dr7j0krt67aci4jr3t7fi4bskswymlx9u7ywewdxspk271alhjwyol040gkv7bz9w9ks1wzij4y',
                flowInterfaceName: 'nufm54uw55pwvzf9af3btoq1k4cwvm9oo5fqf1bzomi6yanuielxv8n5jec58351li2gho33tvszs0dw525yxmtfvp51gevootr7zfw7dxi3apqwcs13hyscwk79cim0ujrg3odrsn02lc7istqjz821nh6u22eo',
                flowInterfaceNamespace: 'j3rh14fdexjljxd1vkjjf177y6bgo3v42qqktk5gsk2q03k1emfoj32qlp1kgsdfanrdtp1tcjivssdolhmj0lpea8v28dcxq5776gdx7hb9c6sygvw01kr01zky1npbwf6ifxwztyw0h9p0tju78du22z42bdnw',
                version: 'udnvnpb9bvx8wttcousq',
                parameterGroup: 'y1swdeted50eas4xz6p33gtrst3lj7fnb0cjhaq2zdjwivoicpytg2a49u54b528mujs06y8hc5laumc9rvc0h9v2su2s8wasng119cgkfz650n6sqwe8w1a2nlu1yp15jd9wh6mubnpekxszxlux1670nm2uyjrxy0nd2tr95pf4gfulruh9e2pbf687g2y01u6y4rq51mj5ultjnbobwy006mlyecwsz3959xr48ibx4tmvsz4hx5m7f83bt0',
                name: '0ate189rp8aii73yui496vhaje1ptqlrkgwo84eqrct2q9v5v0sia8l0e8v78rhbagnux2gztg1qvpyg2g7dqnrw7n6ot4pra510fe8285exffui83w3gabk1lg6r2pgq4cng7fwuqk5uin4s0cppz0dcdqoe1wv8ft1m00pm4rn7cg7hmuohdu9qvuzvfswdo4ok9siyoxut0qbr0je3utpw1hstxcmk71jz36cs76gx3q01e13gfxumqhe04h5b3936x01kuuxy78um76k0r52ts8h5fu6fpctk5n1ccshccqu3new0nfj943jz4ta',
                parameterName: 'f1a6hhf7902il7dto2mumc1p2ff1cp25h9v7f1rm42tjyfkzy3nuz0pjlurzm3oartbzjib4og0aj2fk04gvj49cvqtpkpv3el8375th6slfiw4phn5obda11c3s3qwt6hy8ln0nyip8xbynaturhyovlm6v7kbyo4qoo0xuu4c4zo0lgpn6jwkx2inf5u6h47w3j2znw0k2yiqt05sa0p1d177b2sj2mxteilgx4z3003jxhtpimj5tjf1xim7cjfh42otacwovhfkv9ud70ywitebh87kvi2q0nm0xstzl9xh2tgl6emcdqe60mw2j',
                parameterValue: 'it0151zq3ev9qeuf9thpyauys123u51f5zlssihnjs7q6bdym11ot8h1jyyzenv0rjh9shp8cyx2ekj95ql0o5hearbulsdovuq9shvg3fz12tutf5mjbvkkcbzzq54zlcnugucbtht2p1y9i14sv9w6vt0qgsctqbjjsnx5xutz5l0p8nhnijee653izx44o9eyt9dw3dwfkn5l0k3f9zkrty25gujp4obtpx3gn27erm0kv4bhlgtnfwlf3xswd5nla4f997c1fk0tnq08tcvr27egqubvnnd0uu8w9n7ob28lseokzzssy58y5qhja29ram9zx35qi0e257xcqh9n107g8ufyexrsden478t2ovf1qb1lrtfvsf1yteppkozmw281t3u0enjrym74eszuworps58x6q4uror8n3bb2p5yizgp4mrzibn1awjro08bnojoldtgw6e6yu4otdnogdvuywo4uuziwql6stwhd8rul9zav34c2fmbuka3uwowttqo1emf4s0onwyzhjz7pfqu6inrocosl444mfuapbae3thaoyg5ccosrv7u221mw988r89358bnjrfy68f3lyaplwfund1xlk58ng5es7uxlr1yzd52qtflh0vgkey6wnx55h7y2z6l51u2yrui79s2gowqz6vvcxa7mg5bz13q6ciqh7b47z6txkerf2e83gqqkp3aq2up0x2qwtxq6wudk6n46ct5ev6v0iv8b0bgxbyzal7dq76it22v0seva2stgu2i0j43m7k7p8ndrk152k5w32k0i618ntzwoc3tahcdbaldqoypr798ndu7v7dle9y3csravnd5d41zpz9zujjvpxpyt7zgbz7r3mxqzkhfsasa66zfxuf1ypq6jc9yhig8vh871f2qw5yqry2fq4w1y3vz32rgayyqka6sk2zqjxj9d73tpe4jxjmv4cx2twg3ql6ruuy7fy49wf6aj19uqqo9xq7wxn4q2be7te1cpce4mrzpliur',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: null,
                tenantCode: 'uxhb40jvvwgkgvm7eh4abgsdfhh8t77v468dfovzj3xysj7c54',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'uxl32fpcv3xz5qb56jvn',
                channelHash: '2rservy1xqq58lk4a1nvf4r085cs3hkkznhfkbap',
                channelParty: 'bs5kk1tb2ij6usfz6373vifg3ypf9q6udkc91t752ktjcewoypkstl9socukxdm86z1ky9wrdd4wkoda4fu700ybmo87mlazio9b71m0o8sx978dvhipeqoj9dvov5sczpy43i8ulfbhzm53pwcf360mxqjf6pmw',
                channelComponent: 'oxvqobgn2nfpiapok51unbc78h0coo6niqqyy936k819sl9cqqqiuklvcu79q33h5hamjf0irwqj0mp6hm5b7g4ntbu4lk474zclmmrimorpeinqzsndci8z604yjfpl0rapbssyk9zjz9f6p3fy70j1fziewohn',
                channelName: '8tk01zq1p2kk2spsq2s5aw3cch9x8k0pnul7h33bh00aav76x7na70pvc2ilcw5z1hgo9tesirag0mcqfez6twfgjije5g8193b669qwp5k6x01h7a7jq6mekm4mlr6kh3ygar437h27fq7v6ydn7fe5ztegj0tq',
                flowHash: 'f0vkeltvugxqkek2mr4q50zv7mszq4qicmnax9bx',
                flowParty: 'cx2eeg4gytjwfvvqf0zccj148f6zxrjo2lf9ivgzvuel9vsqsku9k9t51xlz4oixka02wlht6m3v6dg7qvykztr4yiyzx2ghxrbgkyw7tw9gxxa4b8zacia08lsoz0ui66enl4gvo4dxz6gdsbb2qf7hqo4c0e6a',
                flowComponent: 'a44c9v1o4nmc93m1kj78fmipeyevsvknqa7py65ewpykwmhvcpjn3pop8l8ml8zwgfn8435ye68k6ipr6chc7ohqhes7g41c3ggg0lezbjj4lfp5aiio9oth56pkbil6q1q5tyg68cwg80y80qvjzxmpcasuld6a',
                flowInterfaceName: 'ftoi310lonb0egaswxltej9vftvnbu8seuur55pr7p67tjuj0eora26w6lqxz31a9vtpn3z6ysdtemd3d1x2qg42zc2f06jd39o0x1jaxcmm878j662sipku3cnfby5peb56funf45n9gcs41d7ai03br72tu1i0',
                flowInterfaceNamespace: 'qlut1wraod4s3c2ntx71fft0ag3x2snsmqy3jx4cf44m7fbk1l1nwp2oj3lj79au2x3n674lj2fy42blr4o6tru238l2yhvdkywfpg3pwlx167r0dms1vx38ag76e7heun37b4yxcrpae985qwly77ex6w40rygt',
                version: 'lgljqrscvebkd6dle1lg',
                parameterGroup: '65q18kiz1wg7s2qeciis1akd7p5nn9z7o8vtug0ha9kc8n1ehsocfvzjeyntof62evb44rp6npcgd4zvmx4quz3g2tmbtk9zvfl6yf1k2pvwd53jzgpslc439mq4y1xy0omcf5lnmo490hzftscrjn0o9axjmytvyml5xub51fc4kl0a0aninwyv7rkz16cpp1d9i37ca06j8qz5r5s0y868dh6h9jkp8h91gyyqqgb69i7fgxnut7ifk1d0d21',
                name: '85wyvbp7eep43ollvzkd96beoko8c7wh0q2kzjldceions0qaqg8y39sgcsya9itk8sdadtx77uwjnl569ae5eqa4hz18yzysjpxp1zvb9f5o0b172txry9ivkxkgjg9y6y36ehpd49gkhfc7j8j81vg7mqct87zs5p8xiawyt4kwcj54jk5ag45yfxrm3gr0uuwcd3lkh6wwo3ugzpjfzv9o9tznyh0utudbv5wrbanc7dnszi2op7qfo9yklivbm3aeahkf5qn7gn41u9hrh0q8uvn7plr1pzmjpcptuz1zr7oheap8dm9bb8k9fjj',
                parameterName: '4awje6jdoj0p96qkrv9wz8eekuvy1z4sjqtdmpd2nht8a0xc6uxgo338uw9y09v9f6x7gr6a1uf3dd2el7r184q7ak20yfe66zrk67u9xictq95dpiucas6cglxolz51f6pir39sp1bvli1pmoawxcx7b9gew5cw989r7jqsv4qii6gr7qtwzu96py5ca749nfsbnnjqybn8riyx6j222bqowi9jst5l23ruixdp47jotoqm80i84g08sqdq65zbq81jurissl0m60hhpa6iwq2a2btz2x4ncdbz3boyraer3clj03ue5rb0v1blhx4l',
                parameterValue: 'kq4z2x2tgfmhb1wh932haw8187j0s5c9o2x1syf9ffddqy083l8e5qr7icz1u5worq5w8eb9nlikaxxphzbt0yu2ncbp2vqoji9dzzew6r7vitsh9o5hpi1lcy5zxp3okapef0x913n4depzd5t8rhedm71f9i1fiaxrqcb0gm0pwjsq2p6rd5mllzyjjgkeaz1evxv56ttlai07ngfm2feofcys02f3hqjdmpqbdtttzvme7cy2m1o4s8bdqekt0kprdtrbrcw40zs27h0rolo386p9n40aabhcxvoedeic1x1g7eygjbdxohvb3yimvc17o5ap4tazv3337ywzi9bokfb27mkwnjtosnvfmp3efn66gog5k7aank2ftaiys6w2hc30jatb4k4lpomocdj6cxfy52hawh41hsntmvw1hrzrunbzmeuqaliz8j4u1gqfm4fztgpeoq384g84z1n59gaf4frmjv6mg5x65opjihoqfru3fe6wcx43j67ui8lqvku589zuo8z77pe73jduqsu1if7h2oncuzcr0qyjk8hwyadixh4gdx8v95smc670opbs7hl2a96ulnfx5fi4xfdrtfo2br9ftp202ie25d7umjz4h40z2yf7hrorpvzaqjn8gt8jo77u49pejonfan8vgjexhxrwzgvldm7nqe6r73jjfcb09lq4z1wrzws49pxpkiengmc8f7o83lk8sxo6es18ud40n92nvr0644vcgkuj8o5obmg6xamefj3qb66mc0t85qs2vkftaf6kd9adjrnhmf7rgqxplplkj6zecio2cp2pau6thuehwf8dkqew88sd19d1peztgoz2dl1z9uznmj7yrngfbjzztd5jf8h18qhz06on6y2gyktiqvkpbfbncq2wceu4synmufxypywas8at4oiaci87g1qxi0tqy65i2mm5bmkilpwfvi1s3mfhbfcx80jwg1zh05ep9w0voo47jrh561gg5u5zqki1qcasu4jzg41x',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                
                tenantCode: 'nzktq8lfaxkoiqfjptnl0gm9hlw1cpfg7lr5v56l2xk3vxzh3k',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'matns9g3s83hjt9kr2p7',
                channelHash: 'wevwwvin5kh0r55t1u0j3lxbr969sngokdtxrpyl',
                channelParty: 'f19fimfyrqbsqwv2lnc4pzv6yod1gb95m93fefrlz3gjda58t2hd1v2ow7bunoi3slbqiktnt03y40sjn62ah6rrmjfi70bikaq6h1hmwej3zxxge4ggj66p64k9uk13865jiuuc2pap3eink5f6iulc65xbhnf4',
                channelComponent: 'rzo73erq4bpg3w01rxnh6gvvnhllukedwqy4mmpopjh0qnscjdw7dzgca400zi66jzrpzlaafxemu1yint189udpqyswrp2gpghpjk5n3u3ovkp1dn05yqxd1df2krxx7kyl8yegu12ywrcc30tspgirb6h4opwi',
                channelName: 'd6fmvhyfozi48zg77t9j1kkten2o408dy2fyc70n8u6i1xfgpuoibk9u7wn6i3xaod0cuie0h15ex1u7es8saplagm57mhsr0mjy4cob1zj87cv02xjwqz7k1e7c1btvrvdeyk4q3pmkeovlk223fahi2899onbs',
                flowHash: 'w7j2k3kd92wpo04xba7poq9mb1oigfthxwtxygq5',
                flowParty: 'uslhuw07lk1gacu86zk16kpbr4uxlg05zcshrgag9cze2jzxhfjyii2t2ed84jae2ra07gpozu9wouvpi5rt2k099158ewarriwjgbvue4bqvl55mrzoc3z9evgt3jynt36d4zzg6s4hr73pkfplctv79fcz1fbe',
                flowComponent: 'h74tc4u4oe0dwg89fologm7e7om2b1xx6os87ergb2327ijdu88ydz7qke1l6blkcgyjfw21khgklarvkjmp2b6jbc60pbfheputx3avfhcsovolg73bvvbwwtx147zjo2g15loo55fwnaute1fkpjtdygo9c8zc',
                flowInterfaceName: '9eluldncyvd7cxkcg5tpdgyllltyljt1iyt4ouakmx4z6ogirirtm1bxcvx15xb5kobgcdswwr8w8m9saet0rodp40rvnarzolofc5piplcfzhpkk55si1h1dnpptdkcq0gmxzx40if86a0by8kzwxz3xwlbbv05',
                flowInterfaceNamespace: 'ard14sre645e1p1id5q7ls79c3lmxnn7gw9mmsw3xp4d5d50rhlfjlqnx3aoh2m5n1wusa978qsfzilrken8ccz2kazb753nymssvv5tbgn40tgerx1joy2htg6eutope2ogiho3ufr6tv5m0kboqab5dxzafu5a',
                version: 'rbyqumanpu93mloxmk16',
                parameterGroup: 'ucjte515z495oa0kituwqa8v8t70xn8kr1ou6lkcllvcxeoqpe2epqir0wa8lhym8sf08xd7i01p7qyu8uh7i44m0i0hbb80jlhghutc6ne0stlxyk6n2ol1382240wtniv0hrauc8ramvi405hva712tw8efpteixdkv4cjcjpymdvcy3yj3roebcvjd1uy2totoj1ep8gl0p5faovv91q3jncihfxq5usapiu4649cka7xbiupk3mb4z7tehi',
                name: 'd7ieu3s1yn16ael58gnplgot6oimdam1bz206nvlj18dbzi9c4qb93hx8hn97ey2tq05n8rxjm57iz9rqihl00am3faus876btw6k2bkb91llgekhikn4o4r16zpgdsrrgawfless1ayf9imsuqjbpeinymockaxtahairovl7qphmfcwbgnfw6ujlqzti9z8km4nwffpw8ch7yl28kgycdl3wl7h07tsjqec21f2lgjzrq56i4ycqw95x7jqw1p6kpk3u1a2l5jev5jxt874t5aux8yxyw52mw143dg5wj24lbhqcyjowi849sjq0s8',
                parameterName: 'e9phzkqneou9pxk032ven08cqfbjdiwjbc0xhesljcd0lkvy4cajbdtsa1wvfgc1svppqe64mg9eogh3aditt21xhkm0rekqwbccawj3y72rjqilmufg4p75f32hpw6all1sz9s4jsmq4e6lisprjp6e2zqxqpvd2vyem04ha6qlyh2sfbsq5vr6fq9ii0tm3mbvdwrio6z995nafuoqt3ergyvlm24krf5czgj1e4g7enif3uxeypqb515ell38dj37v2z7nk6ybnc5hwkl9knihbtnnlwqu5dx9sn32nkbn4hehdpxuk4ieh37b064',
                parameterValue: '41ic62kwhvqpv45z9oc7y8p19zd2ulfgn9wris1j8rgwclj3frncud3pjq065on7cgebmo4vq1y4rmeysnye6ekpkovt0uhef6070roescd4pc3bf1bu8uft21cppuujbwh9a2x7hbew235ldg62mmnhsx2r9mksff3nofuzih0njsveqzzkc6pqprw9p8nrkf264rgfn8q1ir6pqw3zriwkgjbgid7xchoday9twq7vhbegbtnlszxj7xbgolapst6j2ak1cer1thxlp8xraez6ofzqjjczjk0xgctcbkxnnamlbxtdmju1ubhw3g8zbp0pypd7rdw5yxokrbgfo9jhomdgb41ecufwjtowq4cy9cgj5k2mgnyge0bk7mshgw8tkblrr5qi7039ddizqnjsyy3uj5cs89qzrjng5zprtug4yqichotpwn356nnukbeud4m41tk1yh4gxq2zc4vobdcvl5f89272pe6ub4wclf5lhxopu4evzig2y6qfo2giysw6i31yjfpkuuxsmyn0sehe3xxzh1lrfqaydjwjhvcgd3r6ria9xa462x0pxcaolnc0qi4ogo8lllfyi5u9go27em3w61h6uxa5ii7ucewtyyux46wxtr443sdk70jfo09pwgplhvh8gria28c5dqy7y1no1xzhou8eym1rt9hpkhfmrmupxe03jgrew0uyzw4d85ttw5t2poqyid81b0wf7rnox38wditfrhlslnn63gcr75gzwks6aymlg7xzgegcepqjs2i2ilqqa5gn95hfcb4ekr2xgg2te6cx535mtuo9hcab6c5tvz0t98krub4iba03kodc2ixce7dbv7c2pszq4a8el5j1cgbdz3uj3jk05ll8z2z2hrh5qp74bfwtjaipfogf6yydim23qdsdhpou2ggb1di8fvf9w9kfu8p9gt5c0wms8ozc0sgilvozi8f7ax9yubb4qwswuq8n0pcbz3t9ldqsvvei5nzo6w6m51vynzdayys7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: null,
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: '2cmt7x4m1hak4fw3n86p',
                channelHash: 'amu98e56c219vxkq6p0gvc5oopcykvtjhtb22zen',
                channelParty: 'yhflsxveggkihto286vvmpz3j7jiwul33tzko8cw1et1mihm8sdcx8uiqfb1yd2mpwg39cenzym4n7uwesew4jk5972jgtld8jyv2z5nrx4cpjeg6x18zoau0jwjm8jr3qt7kwmncsi8p47rfjbaq96ce27q1o45',
                channelComponent: 'jn8nx48w2i22uk5d7b5ofvbvlv2k74wmvcswerhwlhcnwouwwyvfpns07rb1g7sn9z2kd9ejj72krwz3w6knp821x0fnsbqeklmrd76v8temalssgyibvgog69fgly0rboomk290g1zy2user3x3vzm6dpgd3v5v',
                channelName: 't56y6tvo4uomm7i38b25a762bj61q0aupw52mnb4ipicmej67epynjvljq5m4ca34iy6ow13clkv9uojl5ymx01boe4337zf65wddu7pjodotnmo7qn1k8rfmul3gg93i9xmdjbf2efvnu3w034czqm02hy54z2k',
                flowHash: '3qvgtclpchw2xuftu4l9apd04h882jagbp83411u',
                flowParty: '40tbl5j3v7dvolkw1wc9s4zrjgfvdeyxx82rp6r5kpsu24ztgl4dqr9djucm114cciydmpevv1kfnrbw1wozulngurlwz9clex0ni9hkkj2f7p5y7lue784fedgckgo3x69sjooad7wnekegxji2zut51wftuufn',
                flowComponent: 'ieoso29fbolc5w5oessrgqgvb9zpv01hi5fqpocg8esg99admxx5lze6joip33xh2oalvdjaybyti320wb3f26px8zo5xw5gy2y26t3s028hduj3rcw0s1ihmq28b1jn7dtid63xue5o26eyvvvg0bgy0m6e6xwv',
                flowInterfaceName: 's2wpn00fbw9pvdwcjd62eb3to1ear4c1drs0lkvywid0j38gt1bpvju5qj0apnyjk2678058jia5gkvuunfbxkaze1pfoi68qr7ri63rl35wzm96dm8vm5ibkwng2fsuk5h2k7tf2jac3irewycpq2hot5qevgpo',
                flowInterfaceNamespace: 'eroiosqpxcdybe8t4v76dhsylpt8b16v3cp4fq0e60hmu4m7dv5r59h1j6yg2v83wqrpxdmnwzghduc5b99mb2bulll7z2r5p88lykabzudllyju2kbqpgc79piclt8pc2014xl7ly380m0xn87i7iiog5qlp9mn',
                version: '9uuee377b8lgawfi89vi',
                parameterGroup: 'k0k7i02siw3sd81eidlmas88sesp5nrjay1kvfcdodym9kzbm37eym9l78ea0vsnwb4shtj2w9mutkxxktkmranidal3ag71povsypvnpcupyhme6s8sfgto4pchafweu8bhcvnxzqyops2x3wdp5oqcydhpr438f59hgy1bltufsbl8u2xbf5qj1r7qo4nl2tnvragof5kcllr4odyjqnwfhqyo0ewfkqns3f1hzjj4xnvwq5q3v5mntkxatdx',
                name: 'egyzl55nmud6uuyusrk75esak4vopa1k85ut14k28az2scpe9068aiwihofnpuo8iitj0v7lv99u72m671m4jqtbluo85xa0fbezvplsjawdbqvikmfi6ttc71mopgx221l2holi0dp59jf6xarh18fbq4zamsoo10dh94gngafjxn9kvki8gso23p46xfjh2bbg0vlzeynmf76pn4ctpsejk4w3781ogxflewkqetiadbjzqsf6i7tt7gzc3wj2vgh4b8poid4cfuh4bec6yscvv9v2zznj12tpbgpaev4dp5m3daovcd7zf1n7u4m8',
                parameterName: '9m137h53g7fpzotl4q1o639uat9ry0r8phul1um6u5orbryki29yxiwxt2vr2kea6ccmxbkrs6ihtx1vt5dmlo22n4tb7oj4nv93qldvsjk7zbxyp0rzxv6otjdnwxfau73nepygnmsvnmkdm16yzice2m0xbk3pg0h4f6ldm4yki9mpevpelzcpjb9f3fm9ros7hn9rpoahegenbwa3c27nrsx9bx85un750w6zlvfy3ajckdlrhiur66r8igg0wi9hbag9ge1tup3ng15vgouc4sae93n47hjti8v1vqvo9k0j0ge4ifcrqu4b76c9',
                parameterValue: 'r91tqz2kgd4mkaey9rxonqzgz5zpkbv7hm8eq51tp2dh87mqwr6ko1ni9ax0vwwpzp5qzkkq82p3y0fh23te7vzhyiu5534qd3q2bpxskl73beiv1zemtikggewitnezagb6ezupg67wnujs0zeouwqbfy7krbn5vvv0od74r3ta29bp0m2gcmxco2edrisua4ig3hry5mk8ue3ebqushpsmy2jd05f2lzy9wc0c1pbub3brj7n35uswlww7i398m17zhapvtgmdmi61k66ftltk7zv8d79ak4z66hsy8n4j3xtmzf59t640bz4z52czojp3ep4zr99ltakwbv0ulkb7u1cwcmfpxaj2o1yhsmw6l5t61cd131rn663jwzmfjfgcs0c6ff7e3jx01ot89bduhwnjwmene88uyuvpg5ycb48xrcpbvoogvlzr75v4m8dba2kzdb8joqndra3qa6qqxqe0wosm8s5lntwh5aidictzf508g059yon8296l4m72tpmaqq67z9w4xou5v2jfpai85of2g64hlzqwe2k55hqtfftdtzxn84wrqwqr79qz0hxusfqhdi8epazxmofc90dxxeiwd9kgqvwrh11atv01klhcwxv8wzlpk4bqy5s4nw9vjyhk8r3i7y2t4o9a6wb1pukaujtifbo817ohtjm0mp4zaggm3s8ehe26nr13f1uniggc5quabbhhx9u4c8sqhnbq7td9u7aet5jqocy9g0c5ahydnof9q3q7pshegn1645z4v8r3otp4xhm6xglhpq6dfoz260g39ggf1b6o09ivintbg76c38wa88zj5psh40z8pnlaip50cmn8a0dp16xnuyn5ckatzh3qubn3nlldw6pxoix8ngx80qufnpgsmya3syh1on76wdkybckfx0btnh7hrql5hg9z5edhqulyavhcjuzkql0di0vutknxwfmdxjnxqnrt5cvlggxwgnmgi12aqkxki8xlv7ivs5es4txbc4fpq4b4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: '805iiqkls7o4wajngcn4',
                channelHash: 's9firoxs95rjsycj8nddi44kwtcr8mrvg6qx88oz',
                channelParty: '4i7o6atxto1m6ejqw0yjpz10ht2mhmhbq3iry448f6v297r837e0ks19lg6ibntoe488errq7218wle97if0tn3ip3d7espo3lquh0m0cdd0t2t9xes4464xt3hr3y4geldgcte793frpyy3j3odwn0j8jet1gz1',
                channelComponent: 'ps3559zxiapprs0v9bo1mw4swvmh4lru0qh2obvzinvcvlmivvci1kr8ylqxoutxn8h1v3onso2wc7mncciedy3uadyo6ewr6xnwi8ter1ht7x4q6m84gcgc53s0i9i1fgbqfsncio2xmr5x66m122d9g0aubf7t',
                channelName: '7wky4wlbypzdp054t214qm3ktirizbnskdpp1p3c5t6in4k75y1qrjclmwklcdp7ogi0i8ukbz85f8nl4ex4eefl13wx5m5rkkhy80to31w2vqpipkmk67lahtzelgh2u4392sjouneowlu4zkpkb963q15whwzo',
                flowHash: '6xoiew3afyrf6opb4mgjeptp40d66tumvlyw7us6',
                flowParty: 'q6o7z9lrihrkga2tw02ywxcxwrmkpnm8fd2svqcq5vmx7eoj95n3xrbnxlqd2gfrt8iaxbwmly4rdzg88m04881dfm5rupsfc3mfnkygp41g8abb8ox1cknuz3khwjwn6ukkbe3ovlqct6zsefk7z9umiydgti6p',
                flowComponent: 'hmm10o4lqah265vmbalpa3jyihuvouhujvd1doexh68den4gco02sl3p40b2c3tge88ec9qw783ih3k6cke25yei7ooia3782o6ttku1e83dmh16rjja6rkfnkdmnbhyb0ebelg7pbgk12ofvlz1vso9qofp773y',
                flowInterfaceName: 'oag7clzdk4ayuhf1cvi2zgrfamjhub3jyhpcemmpl537qm7tte59f5jpqd731g5szle5nwc2j58osqgfpu2ggez8v5ftfrni5o91z75os06413jn199d4sup2rnq45na39y3ih73y63ktj1l5o2aucpb7zlveqft',
                flowInterfaceNamespace: 'vfi9dkgci2k4xam204edau99urm3gxhqfx4p2im2tu542ij4io3344i83q938w9qnoddyeyp3g20iod4smljptrdy02q6l18ee0r2nnfnx30ol4yr2bapte5eaqg4dmoy0plm0bd3qtr3uqrzvmmws3i8249wy4z',
                version: 'g29b68nwqigmx3p1hkxy',
                parameterGroup: 'keuru4whsy7cyvfy8he5eyj400f8cgzygflt3ww1h6arwkdn1ujph81s59qm0w7nwdgoe9rok7th2hqnmdonb6unfbczsao3aff5nu1usfg8sqhw470ffx9v40g233jz4s0mvx8674lut9sgg8n5gbjidy3m2f8jsnls4n02emx3pyquvxsqxb1gab9mi7v9tlyr535e3jh3yqx74flaiwhbtaa4xztlu75e488tfvichml8wl9berdnxkj98iv',
                name: 'f5s8a6grsjpxxxtyavi923mw6dqncp5rgmtekr1ff84wpeohnka7462hge1r5vn7jrrjejdkhxmbo93p5vecu9diyncijj3ld3s0dqvann6gxlcfhb8320the0l4fftgv7h8rfd9f88r6cn7cf563m2bq5m6vyfxvpu7uvq61a7qppjmrzz0di9498432v0n7k3c19eejh85674hfezctkunasl67w066rfaxlynx2wzn8i2t75do1gjddj8yq06wt5za6rpux9oghnpd3cy34je40jm6zr7vhnqm8qmr8ebjm53knh3n67zwarvctcz',
                parameterName: '8393fwovw9kgrrplfk9zqsubwc1d39hfgcc8pfs1ooleqt6fcxjabxje8y8yeipczggof0a3h03r6dp84m51vju80gj95z0mzz0masjmb6cqexfr42fcjv0tsk6d4e9wyfa87k2d978x37kd9cz2l38e5jgag2vhwwgne096nig64eclebune7t8e1edj9xd7h9a3g8w50bxmwfpqbhcyea5fbekggkwzcnvbyhc83jgz6wnl3j4hzn83pzknyk0x0a8s7onop9a15ja9fvdjgxeuzsp9q8e73xagheok9plg9c1zc3jlc121lihq1nr',
                parameterValue: 'm30bhge2a0rhmn33pkgclrxkrc3kh1ywplxed06afdhy9sfnaowy3itswhot6zwomjlre7vqiyfp2xnainduis7gt1nge95ttm95d5wx0bg49ekh9j3yxgovb15a3dfukusgabg0vk6zmol29d6f6q0tqljccffqazse06c4yddbnaupzbda7dd4uvrw3tbdvco8re9mm9dqssiglss9erucykyn4yja3hl2lr9ceogwrhq1bl95vmk5nqvb0jlgwbze7shis8vklr7pusue62w71fpjmyhufr4n7bxhbhr7tpn2a20noav70r71cxwftuhfjpkoyyz04v9cb44hustepey89umzgkik43qww0hiq38ki29yy9fitkq3vjpihwwgsyzb7h8sz5n5zn43w7crlxdqkerables1aurs8fkxfivkbi8egvpy9zi8cvhl1phwmx7y3tlxlka9izz7c2tx9xt1f65ms93esgof72rka5jdufv11hm4lw7bbfywclb7pwkms1xxi49311cv6z1dpetjwm3akcz1ngghtfiuizyyeie580gqqeurae3wnmg86h1jq7nysiqz8qotyzwolybrpo0b1noqlg6slxxrzaqrsf1fw5l8t8y7cgl0ylawdxx6fqta33gbbmuii74xs8nxi5v8qbdicl94m63n1rt5vpjq6l9n642ojdjsxedmdb8ovqnihbauhhmf0dskq8wt6c8g3zbownb82dj722zg8ofz7ck6sjlt641tjxp5ibpa1g4l1cubigfdm9kgkruec0xwze77bzpt0jqnamhwuh5q3uaeuc9asrfn21bn3xys2uap2hjhobchagpq7oqvh6b26fdylspi79vpgj34rv6kaw17bwjgoul4svnbm9sham4pubhsv4ob8blhhdl6mmqdsegk22jbh5d88463sthqwz6t4rn1fodln9022bm4ilyt4klkmz1av15m0a5ti5sdo5gmimez90wcch3amqxdhi2qdwzvwgk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'r7ocslgvgk0vdzwhfyxplxn535x1k60975df9nyiwlt1kgj1z1',
                systemId: null,
                systemName: 'hwtnv36musu3irk8t0tr',
                channelHash: 'w395t6echellurghbd28h88hv8nrmh4darc2gzff',
                channelParty: 'wbkgilmgh1khwkmadpuy32u804ebzimghzo6ts596rx5kd9l03ggbt2jfgqywps5na2h79nys5erxaj7u90haejvjwso4x7n8399lk756lk8wd78ssg4piai16r7lyh5cj37kseuxwwwlhnnt8cfs0ovc9w4smko',
                channelComponent: '8ah9tlky74ge6xnamp3xp3uum1l792nll8j3e5slsw5wom8phja0kf9yqaiw9cfd7zz1ep47az057362dwnhcccmg4bx9divv9uor764cqathd3wpcoa81d0hesr3us7rfcjk89flqnxeqw7alkpbtei6ie3zy17',
                channelName: 'xamzfobrl1ju2o81gu1g6mwpl6oe2p9arf4lvzxh04fk6oyi3nwllcmtk1a964yf9qspwqk1ynvc1olbk50uz1lyv8zm5yxazqspykk5t1gm2pdrdowdta2qmzeby0bqbcy7bs8id3fbjuu22jvg0u5xn3x5kjbj',
                flowHash: 'himk85j2ivrr1mcjdf05wq30c9x7svrhskhlmmpw',
                flowParty: 'gkrq0lo1ocbmduu7c77ib0pb4nke77kslgzb2pc12l1qpvvc6yu35oo5weoq7r622ol9y33lmsfhglk0n3c1oi6nl54ro1d6ukd9g5stzszkhh3vf6kp42tck9caspegn09b21z2fwnzj59ocho9d7uwguu9783x',
                flowComponent: 'os6po2lhk5rfcruuunp869uwxcwm7dmkfe6mavyck9ernejk464h5qan6qqfmux80n4yx9yhyva8ow2n7z2mst04w4ymvf1hehwf3bn3ymgpw8a6prm1xk0yqb5b7w7c4wcqdhzktxs6rn10uzwdrff0nwpmvcmo',
                flowInterfaceName: 'pqskh5hnx96nni5ht0em9p8s195s0bxagpljvckwl3i0xrh3kefhj4jas7evppk8odua2c8j0vz5ynjp8qippai9wgffv5kf9zo7j7hz5uzlxv9a3l525edaxnrs4ofhevany2860c95qk4mrytw5uw1qfgssysr',
                flowInterfaceNamespace: 'lj6cjom6uilewcl8nl2hgtzabhb2v0hqplv182qhld2zqwjuto7oyo1actyhxuqqsswwr9i0zrtm13z6tlt5e2l9noli4jdi5yr9zle0ao1upgws4jodzu0pl8caife5bloo4dy0ghk8n7rq24lkpnk0157rm3zw',
                version: '4cix7uois8mw1yosyd3q',
                parameterGroup: 'ratwnohdl1ttwwxrzqp4g82bn545nvi7umz717l2drd1rj5n8mgf08akwbu7bpkle6za6iwiz9wjbehqna9w7w3hsgjgb37t7eqw4kohqbzuybdu3yol6ugircj27ir8kf9iuq9ydxjaeeg7888k0bpazawngwb6hv92muneu2rzytd99fjbla5czud9lgxy2780zvogzbn5n9xr2de25osvx2nhg1yjti5yrr09w7o7993p7529rn9wtvu5y54',
                name: 'ucygynqvpox0fvrpu6ky29xj0j6vt1t6pzh8cvolzug8ageekcm16axzfy0ebyaqn0kaobtmclj9crlp1s50my0rbnlrh3mdnb5mmxjnm8lebhyew3zvyd6iusosc4fkq7rgtrdfm8exi2iclddqde8ez6hsh6c0rssz254sfp9b9iehhwofcti5m926fz8066e88jzmu85dbdqcg9rztrnnuvs02ivsij1o4wuj31pirvm5xono0vbyytgirp3dqef37jovz0s5zuwqlzw4rxvsfb6wr8e00wte1z19t1k3zjmqkduoagbhkq6j5imm',
                parameterName: '5hslwvbgt6qb099e7ktmzibzrtovuwnkpsb4cbet8dfojmbjjlky9gutdxn759h5xo300319qqdnshovhsvt4u6pi6rchg48ut06fy5pgw1tc6fhcwqcf0osy5q3d945ftu3p059m5bodzwkrwbgvvmd1cq3vrl1lrjic0w7k35cbsy88aap7nev1pxp4w6ptqo2kte2snhq16rw4ag0yz2268v17169gvrnbhg9807afax853wenahgfvqxym8wqkjesdlfcg10mo2i3m6mz3o56bsx32xx0vwcyj845bricu5orvsft4zzpwl25k61',
                parameterValue: 'auo6aakzndzkmvr6omztaswsb168jv4qduojpoyruhuao80ylly2lsvns857xl9gp7cwe7qcfe5fdwt9k4dsq31wv42soaizmvoma5a98efo1bhkurr3w4zuas4uu7ltlmcmf3djrkcymgwq15776cwtrgd4v8txvxfbulfqk2geezqd4u8fdpzj4t6alod7r10hu1d3ejioryzz7oj2bfkml3fsv39lr0noo4mp7kkrc94bwewsvks3a9o0n1vwdo6yd97wzlztthjkqmmvs869zhdzctukq72eaijqz9mufunvn58j513gxx9pcf7na7u94kx70wdzothuz9t8es8jtyt22y1lsh40mx432ai690rcgz2p8x1no9cdckxgcs9wy1jzssr36plfrdolc2z7yaw6eluqpizkno2uus8oaeu1pmvrsjupc4bzgmb013n50411ukpfq2qe0mhz8bm1q24jvuywshkn0y2uufgqhat7cvhuyk59d95utebxm6sbma8i9lb189w54eldedmy7gdgd9ifrlrut088oemg0m0275onube3q2lvocqw29q2fhstv7odia52x4191bht7sj7emliby7trb84mwrlnecnc68txhr91n4gzt50r6izc0ap8on725w11w2w8hcjibg66t0ksx2bsh9uelo876c7fx3hb5w81j5ezhw99kgr5177qhugbt0h28jrpyyzi0p11ewnmm882nwjdv386hfb4hsofs0q9h6fynignoni0oeflb0y0lf83r2rz1cwvjtwwj0dmc9gev1bxbc34ignwk0e9lbat4x3m2vbxcwakktxllkekfjyklddwcxjv9nqqx0q67zv9rrqehx9qewb9eploywnn78h8klo39vgoiapoe2ngy6epd1vgr6za0uop9wdh8uo3bbadxkr1oen08fag1hm4remf64oearmxh3jl5pmgtz0cgzjkabhojv4feog8k7o1oc31da0y4jjnb8d0j0aplrxdine',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'nanbvpw8wc6hys3lemtuq4uolk1s09e2nhnsnxe7dei37uil32',
                
                systemName: 'f2j9nbmflrr1bdlxqn14',
                channelHash: 'vfvb8azz3h4262qubf6k94dj5tsnu9l5zny8w2fd',
                channelParty: '3kegqdkk50lipj1m812u5y204lk7rhcrh1u7ibz8oey725ypp6101glouorqw8947z4m6o9lqcqeoacxqnj7v16q1zn22ab1uvfjhnxv98nao1zioqii2pvp42qqvepukbz1yg5tpnu4k3djb680716jupwthsmk',
                channelComponent: '2m1kt3gibax6lhf1bjx16k9sv5dvms9kcet6img351wnwu4rply0iovt537xi41zgoh8dw9botkpja8tumxclz2oltfi4i3e6ccixdfjw1mb77hi6q0pppnpcrjqgyx3d22t0aa6fsx36zd3ua2kg19dcjt1wvr6',
                channelName: 'j6yp69ulbx8pxhyu01dflaz5h0n4gywf1rs0w6djt1j949lbkisiisxtkvxrabizrk6l5h6871vgwhg0xwb0wst8iojzy6irs4a59sqybndxvwqgdptndikwz7tow5putg28eqb57bkvm1lbrl3eie4ixh3owhpn',
                flowHash: '43gwxzxzd7r5tazi25jnxtzy5dc48mb06abxlfms',
                flowParty: '2qb9gr6o1qglfj8qwnybav8sksi6lkb5cee86ai4joaw2drsb2eusuhha1xpy14x8wczsox1lcsfaxijguzgk6ugsvt8b9lhv4z9qg1uj6p1ofqeauamnzsvg1qomglsmpjz7zjze9xo6zqx66528vctwvwx4h1m',
                flowComponent: '8u4fe8qhz7ohjou1srfsejoxtu28hco79tqd2qqfeggzlyuiwyudksjcr967v333n0o91xfs5ixtnvb71kfjyd9mhd4rwuhgwnkrk9b8r0cpellrfxigh65ioiaci55q1ku99k3weiakuktgc1d0ee06fq0yrka4',
                flowInterfaceName: '2xcfipz435bxacipvy8vw7ku0hbigoisim4ei7ipi0o2mpwzp7qb2urv8x728a02hk3bpzuv27ryyzz4gr24tewsfvpjnsschjramsnuffjs2e12ew3u9xtfjmvvm5i47gc7skdg9tb8iwn0jjmnk9vdzp2p17jo',
                flowInterfaceNamespace: 'klgf4ww1j6fwbdbvq528in4edhxjkbl5fw89udgbxts7ng627z8yms5joha5hzuwtl46cx532i2swf3948avfmnkz2qy0usxf39obx9kr0cs8r71nfcsl62yknkll9d925eal2spztw6oberc1tc2o4v15f7x6p8',
                version: 'n50iphahj7ghu5qnmfwh',
                parameterGroup: '1dg1ha2f34gjoo7thuqm2leyzbgg2iiccdt6mvzy61194oax7li2s6lz7fwxeb97etw07qogrlqg35i6t68rvf0jxd2fa7n7c41hnyua8oxog2kmujs2zchkxrgz1xyinfhcbsupy2zlrhh8ovr2i23v6qel4de5k1nb28w6fl3adle5nntraomtkdzqfl2723ycb2ue1igtvfwakgiy0zc1pbvqt2iqldld9xnofej27cevfjuuch2viy2l1s6',
                name: 'f7yjpnsil80k3aialic0b8p3cv6mvybbes6t5wlb6pmv41b40j35ho6kkzirs4vsrz8cwhi897t0fovv926u8ph3rfniua7k5yqs87vyt5vs269lw2grvkf36w9udsp1tss1jukdqi5yw1871msh3zye7uyl89h89g5vma35nu0nmoix22pswutvpz8ihfyar32osevj8aatx6kwnvdxchk22soc3hhs28qcqy1zho8t2a1j8bd57ogs4sii2p6fmmdwkm8pczyvbc3dbazdyrupzgz72jtsl1yytj3xo62nvxeumkyw07yadvboy295',
                parameterName: 'uo2w7bn78fthr5p4wwsd0ynr5v4fpsmzv2e4anq6fceet2193v826qkxb9sdfmmzunaflxjsz43h5rbgcik6mjrrcszxgcu8qk3mtvbpztodmr3r5059jae4mvg3he2ta24p9zuuwfjkifjxdxktiswv4e7uf2iutocfluapsmtvd2dapwkoqtgi3dpdoqhw8azju6yz55inbuzjt6ykw2gfbbr23ciy0fpbsnt5g502kq0zj5s8h5124w6jnl9rmo1bwmpuxp2b1ppkdof2lovwpkeiuzktisygboxwcl0bsmlq1q1pgvr6j1gbjnuu',
                parameterValue: '481m1lfgjuzscck7njdxnapqaux54pek4pb9gk36vs1sfh3e7g7ggssakazifip4btab7ho2ksfjbdaw5sropfo9dgosyz27wuho9zyk9ky11zqlgl6ol8691yh699bjoaxma45yqi0w27agatmg4bcpwmqhkty70mnvblfjfqg94d82ni6dkbtvvdd4m47ldosdcjsy805obw1lzucsfqg787dyu3rmwwutxrquahd42qw3aj5tsgz6n719uxu0s36ea0ob01v09lcy8068xdg5vea32rxkz74noroyayt7td3uriv664opkv3852p8qgyg6iqmt5wz0h730b5exiw8xx4m2hh38k8pvqk5ljx4mcwipj0duram3up6xu58a6akf8zljtd8om2mqkbj0584tmsm6wksww2amodxvealkgu9wlz4g76ldhd1k3805nditpsd187v787t26b6j2qb9eie2vvfsbsbs5ndf9jpdklpc534ldes4xfr77fgpxatwto02p5d1874q93kt5l5raz8ost42oys4ph6n0wnaf0xpq8obkjpalqk3ys42tku2vbetdanfgsbltowxzs2ra25d4mc0tszd9pw4vfjwcc2xd6j8z284bxjyxeiz0d4xfbnektepu74g5h8dt0fysbabba9p9nvg6acsodtwikxn4gj6kkxeqjk0v656uzdn97ma2vabw5yrok1rh9iix5mkaa4xr6s8ex71lbi4wkbxwp8v18xeeeb4ehemiiauj1kfcwni6bop320eegksf5hev7lh2gj5axhottl1oo35sikuwzfgx25wbldm7izvwngvih90mivulky6ie7h0myn6kli5c9eywe4puq3uoo8a116zgxou27b3usgjzw7cv7t791y68yrhhk2ivjih7zozo4dcmfwpxw20xc9vut20ufsu6qvz0wcj3j6tekofjpqmw3ecmhk1utnpnn03ouqg93id5k21h3ugf23flz1jng9tnshfp3vjx1',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'zt550ajc6nzut68k92mzzivetftjz2tq88af4twlcyef5szfq9',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: null,
                channelHash: '200ncoxjc5sn6ftmk929p4v7v510pyytbn8bwkke',
                channelParty: 'xg4k1rfo43plocaj9klxynydcc11owkv4f3tccjpe2dk991zlmn4zgevdr84n6rke0cx33a36ze464go1090o5yc9g1a9h13carhsnliy6g20mooqp3tdo3obfevp0rwpiric4ignax6j3ia6w4v2cvvywzfu5ap',
                channelComponent: 'joba43e3sruq1d938i4kzchibldfhhrnxgyz7l9mbgn098vniekv51isve70f7i8g42dobdgl7ofzzp3pal9973klfpxhmy4kjok9ezn36y1xev7a32jf04wiih8ghqy6lxgg6rw01dfqpb7xcj1c1qpjs3rz3xq',
                channelName: 'st7238s0wvru4342wbceu7hd6ggmntdi1j9gg9ygwbwec9nwfv366wr5nxs1h2czm1lfjbg3tgok5hhioj2xkin5qx3cg27hg88u5bv18nv0eqta59qn3gs3itmgy9bmw6s5bw4m2ph3y7ch27888vflnwk8bv8c',
                flowHash: 'j2fapz1iz1xv0oj7idbtbifl8holswr0574m6g2v',
                flowParty: 'z5ljvtcgogt7m6awxo9ssfy4z0nv07pf56dsph1mz9pgf2be9rhxyoybrpdbm6ywigoyt8mf3tbhwl1pv69b08gpxihd739qzbt3pphh2f5aneoag8h0rsygfn5gpd3g16k6alpahizmep7w2df2fjz13ieeg9tb',
                flowComponent: 'uamxevead714gk3yjt3bne5yjrc2iypnk94zrl1yt4m2kiprooj1c65y3l7uafk9y6vnkagv77fg4ob5shtotnxzaxx4t9u21li16gbsx0msmervcge0q6uphp33bhr4jb6mwjqhmazlstrefro9ejwjrvisiylf',
                flowInterfaceName: 'lr1vbi3qdlkogwp00gkwf52tr6r4qdfgpqbbaei0ke31nkxrpwes9ucg0qulsf3nwi1zd82x8mq8oz7h11puqh4uqg3czg4f438al5d8efkcb6ynolc0m46qza0g8mufe8wxlkyf2iyrcc8uvrm7k370nwlmi0c1',
                flowInterfaceNamespace: '3umdpln7fl6oktrti2q5rsfm8fytcdl4x8l67i8hjknf0rybpcd70m7kk7nz11ilhm6j7953r6ubgeu64hmbci6jdjo7arc1nnfi5ai2jbzqajtzdhgzer5j35fa9vmfa8lkffiglq4lg8n5xljjaj6vresreb9w',
                version: '5e3ui39aqv92avfsecc6',
                parameterGroup: '7x2w3m2w5wtqw2uwos26oavlgd4lprtrwzil7i9zsordkzppdbbw15su94gt6v9a5hdh8wk669axt41g8wgimvs2l99orxu1e1im6r8w8celotwof9q9l6civjs16bthd1u6pzymnkq3h6zcyhsraat12u4yoy9d70tcy48arrl574u14fttqsuvzknultf7s34n28rap3buenj3umslk00ka47joknrcmfq1upvr6dipq9nu6a0ow7hs754trl',
                name: '18nwk2pnikwpu58043ilyizbw0nlh4jbydey6n12jyjc3kfm31nz152h3u4ns7y45j1twobqcutn04ihd6aa4jk2lqii0on33wqwzh1ie8b4rhsfxnyzrgz3gp1cm7u5xsdur6vg8oqgqg74z40oevfn1hush629pq1f643cqv8bseffvcp6rppbr7x5bsg7k297j87qzv28tgo2woo6b526b14b7ddop5h9bmtalwjhxk8zc6irqygais5t8lsn7vlcisczonuzbrer3j6sblpeg0r1qcwd7sh5vkm9ag8mdzl4ommxhs4mnut524xl',
                parameterName: 'yurztw5ox0addv7joqvdfd7gzo8z215s8spq35mzp1mdp4a54pg2zoua9wz6zg42o2etb53vrsp9tmwtwuf7mchutqwr2ihmk316dizm9plhiy3x9qal1o5oj0edjm50cguvg0lgcdrzsi0mnwa6j013flqs1t9ft5eq4288tmffsjkfmhu78czka8ntocydozkntbgmu0x0dln76gxyugq0s4osaeraswzz9uagkvnabylob5uws0uv7ejyjgotgvxtjsbvbten0gycepizpel0mdxhta5no6xuekm5ei8vw0qo2cfnllz1hhdik2xy',
                parameterValue: 'wit8wr5b68dnitpbm0qoialarqdgqsmvpki94ylejvi9ctgs457vylq6zytlqlxj7qnort1g3emf5uqckl975bks2h567l43a4b88oea5al31thppk1oxu26k5pcxof5m1egjoaimzs4t68845s4sfcy5cxv1rm0m1olmy3nz7a3mannyl7kihps1e68cosx7f0yp9noptsujx4m5yw7ju6dqhuldfdp3jrmgrmgycpi0p715o44sr3mwa35pt3z85h2tskl05bve1bmqbupeddey2er6nw9kru7498en8hc4ovvzs23ja56pgsdsoxjil98eyf8p7p3y5vtwgohz2cgwk5o440fdfws3aua0qftw5adljmiut85lb10k88zuejejvydxi9i2gav21nh498wn5xu34zmscgcrvj9fydn6w77hash6dtzac51qvjynaiczv12vtlyhzo2dbj68mwf6hnxjj1xxgqxdyvchc357towvze63y44rvvrt7yd92ube6hsvdtamm8y178glpeygntrih8a9ak1dieh7cny90k6wmjpe414g8ri3btzp06cbi5l131x1v2rlgtt68nm2zs61cb103oapt4k3yhqkzivhegcy6y70o62jhbqu5scp7i61htyrtwtnez65fu86ayhc6hecd7gt1uiy81r34gggjrprimsbl2c23hd3d2quidljlgowa74hp5m3ymcnn80hd0yvzvqvrzreb4inojcjzmwmg6umttac3rykzfnzr233v8tx4tq7znzs6z9ff16qnhi2qb1wvomqtndljpw4mmq0os796du1ushy4l22a2skxlbqg6cc7qh1keesyn8cug0yqn95zybra5yi20mpc8yiprnu5y40gjwg9qjh2u0w3nq4zjgd3npcp5r3ca23rqzbjj1oquki3273o8hci6r66g12wmd9p0pw6g13h6703n68tj2qsv9f5ib88j7ruemp05k8ay1qsf4hf95tohh2is9wc9budx6',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 's48ud3yqb4es6rx4doahka35qredpixi9kcf7qxz9ddgms0w7n',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                
                channelHash: 't4e972zndjj42xumv5hi931ydk4y5bn5nv9e4jw8',
                channelParty: 'zc4z8v88f0mld7e3772odld4ajpnalh2tb6otsm91ezcmuazqj83d3b012dyp3nbcq0grzl5o8un47157nkz3bdcfpn5ly3yjlh93kznypg0io1bhn22grtauv4cggfp0vq8kgfrfrgb9abt0d0u4j2s3frtml7l',
                channelComponent: 'qbn1q3f46up4eoxejrahcrzfi7nv761dmbdsx830j9yqg76ytk73kx9rhym9gg5y1we1i1wqsb5b6zmpjr3qm86aqb4pd7eyuopwz031t1vd045sve8w8og4tc7uhimdimyq3j9b017od4x49x4p3bb5kgelb06g',
                channelName: 'izl8qb9ho06eedahtk7nvcb916e5qg2mdhhc6ma1zoova9009u6ercts9vv95e36ktgs6sciubs9udbg0t8hxbrwam1hpw4or2clpha0z6fs8kpyjr3nwixlrh5sp1sgul4tejcofcail3m3b2x4pb8bq1ejzj8o',
                flowHash: 'nggtq1qvbty9ebe5sukee1gpit0stfy2qhshab49',
                flowParty: '1hk9ucmq6gxejapcphggmqugtolvuxqhys9g9qli52ex7xepkd8kgnfuxqohmknymgewqefvu64yvjlmkwrcpff795mw9kwveu3ruqys296h9c1tu7zjbhkipxdy636977r98ljeaotr2ix08k8d8d8exo2p5ear',
                flowComponent: '1xr88gmlsqgrbiu1scwy5hlk1b1r9ufeirdszu1mmzs2x6odm5p5xylj4tjro80x9oz0w42wo06aaii2pyvokne4sn3i5ha2eyajs989lavup587omgbk6htjlpz6max3ep7ck4xist187ojrauyv7j8f5243tu1',
                flowInterfaceName: 'ipzone8k5esnmpfvqzlfzbwchmrpwzhujx99f4r001u7760pfx4hgg4z6s80m2dskkelfuiqmifc74rlpn9vogn1nbi1ycxbx9o360ioms8r0ltxu87srox285vjg3obo5qefz5tmh3oo2vi1zs8pxo8amrnzk4n',
                flowInterfaceNamespace: 'jc56a7jcshe5m1nfwx5itvpdn5usgxbd2wnq0ufu9j6tdnh2mncip5sng5wrh0dylegwhi6zkmx1tf5029xxdqny0g1n1gq7u3djxy43xmir9kng0pw3xlfmqcgj187alpc4f1kbt1hqaqoa6aziuo2z1ps303ed',
                version: 'dy3bxk0uu98nrukx8u5a',
                parameterGroup: '933ickkyw98vefrhjb2tk66xb1ll87ktopyob8i7i692p29dtx8xhmo72rb995nuwxj11doqgkyu0d3avkwksd2b4l5ogr1zzjz54xk8l4mmijhppymvfwy5hesrho6w15cvwzu87s2rrvitqh2tctn4ezp547ari4rvfuhy9c3mbjvo2r5fd7agxfuerfooj2jzpmwerjo9hhmfm6dovr5354f1y69qkzabybhqp7vexhz9qqupcsbusdog0a1',
                name: '2ktezdn2gsq9x4r54bahsb881t2hvr3hycxupacnkrwgjhmycyb5tbc7s2vnbvl352qsmhyor3jorgcluyjqkwlbys89wxjrabax5e6qegansa8u5zqfnc0j3nrmhsqcomvb5fbo3i4wmqzxmbzr072fopdg4pin55gv9aoho5uinnmr5mywt3c7l9ho4dlduyuiq0apku10jga32lz2xx06141hm8ec6xt2g73e66igcwgzg8jxod5mk7kyj1if4gx7gw3uv196l4jvc1ygfk2g0g1jrqp3p6xmhclh427e70pn3k5onjurstisn8lg',
                parameterName: 'lafmobzbwo898xbgb5u0ud0q6yx180tz8irsmni446yrbm7n62od4j0mrj2iejv2xm64442i5n7895horylnrt7fe45z2lf7em1slifervx2xpyyjqazgsx6v4npadsum8l2nrxuxobzyl54wd0kvprp29rcf6rdckuyr3urnnyupwdatxkk9zkts8k5r45g0ll2n2vvx0ga4vr0fz0rrxasr649mh2hoklsqcwyt4ryf0fqgypvbe1ibpi2jn4zmqdy0curw2go2dcfathrxr6xdjibnjpivi564pevil863cncr15sfeo45x8vftuk',
                parameterValue: 'vublttgpa74gftxti26h364vggq3r6w648jnawzzock1gmob7qzpjsvjpcq8uruziumx2l2a6kdoqvshz4aiikug12p69fsdo14vqg2p81s21lkqdmj9j5iu8d0mshvfkzx5b7pyrzxwno5vllj9xj3shvwjfhq1wtp7xuzbk4xr8d2ddyymjspi1s37ar6cr4uftx6hzbt71m9hysqjt99xof8lkju2i6y2g2nm7nqvfw8ugr2iwnpj8swaz3uolbrois4oiisrzp4a030b75m0zbts65jq9pt7mauywsre0rolpdxy5iygxeeq4pym7rc9avk3plp2arpinzjehvw7csya2ilc3gn4fn7qeqjhawo83289ca5ak0t9yu3wl0g000cr1cb4huall77eott2jwxiolsnc98ru6us35ig2ofqj44qhj7jvmh8ytar0jb93b1z4j2q2bi0v7e9w5jzpd7hfe6yw3q7n1v1yt13618ihtd6bj7z8qfp53q55sid0ljg5bfxqpcb40q8o59j4babtg1tdltntfi8afysljeypulbdmxpxmwaw6ij507zw8i8ik5t1tyxj8fj9ne2gfedh1dd37j3um57db8zwioalyw3vcugma1dez66xrn3kym95j87vao81z9quxywmdzpna6aadgtwa0zmtp8xuuwe0zc5o1twe5jd9ihbkm2zab9wsco2vgc39end1zzylr1ibpps8d2t2s8edl6zxvq41l8pcrdi4o6pkxpmr6xr8bsvn5q8gujvjtwcjgaas4oazn63m2apwxuanb6244sb9lp291ah2qwj7oq2eqr2sijzg09niwtgmha8b2p34rpgq70vmtejgfx83cn49ypietsey4l1fxdox1lbjxx3142ynr4rfzgpl464gw9inexfqed3aejxhit0e14z7mkm5psvj5aa1j4ckeas650d49n91rzgx5610nlguz4nq7l2ui6drkv7nm7bf5p2rjnv1s3exsxhekb4n1b',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'scjedqknfx5i6tpt6miaz3ld369xrb9mo4b1cl85qtwkvvnfyx',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'qb2rahqjji75l75e16gg',
                channelHash: null,
                channelParty: 'strsqkj073ah6ap3g8o1clb6psf9vc9hx02b2oi8q1pasgasveacg2unubo96b9qk8t86an7grats0k5dpmizpeky1agnnx93fd2wak4k21j8v5pjxzby78iityhiuksgziuwj9icfj3lwgm8rvj0ykulxfrgv6y',
                channelComponent: '3dgzlhchcentbmct51d3aoqp6xgec23hi5gq6a0e98bctmu02km95nt0laao56vt798f4j3l9hy0tggr39q199tk1ntoi7pck2kwy1u0cnxfzkfxibu8r835ycfyr84e0sleqcm7taa02nrx2ng6k993zmlwxdps',
                channelName: '744oc46vvhd6k6evgrd5rjmb143wf7sfac7429v48eogr5vam02r2cjqh3aljvljhuopowm3ftoprx61d9ezlkyr34pa1v8a7ccsbx51t8gbvch6xmslixa0nifsw2zws21t0mxvhcls1bi5yw1g1nsf41p0wbe2',
                flowHash: 'h0zjzf2xov6kcy1afvzhkzawksvh6tlgl3tbc75t',
                flowParty: 'j13w76kaj9l47bdy1t2ovrj910us0urjefmrpomtysesmgx50w1iphcqgi5dgwveutrrg1ilj3ioeyp5664nclbl4o4qm1fw10z7hkidj8lq2jrr9ytsfk28dyol9ygblo2qkhmurrpxs2mcfmuh87msyd3pmljp',
                flowComponent: 'l7frsspue6csf7dig3q98smxnias9jt2n8sbti9j2u39z6lcb3m7fzi35dpg06lx7tp40gizjv2npsy8obpmxosbb00b1hrfy9vk7gkepu7tbzsf80ijkaudjuzdrar2l58dukq6rgqagetwrndro24uqpis0562',
                flowInterfaceName: '9d039v3uejcwhn82sw5hwlqlg2oki3fjc13on989ipfdipz38sesqwplpcvdudnkh032xfw7kenx41yadnsz3x9bdu79f9upcos2vqbpyytkubqa92fuesznhb15g7wc4uq3pkhy12pcs3n9idj75avi3ilyn6m4',
                flowInterfaceNamespace: 'p1m4705s1z4jtuio4h1yalqsvwob2ry6n4ivq47lm9650dl4avmsr8fs336k0jqeyey73xwrwm6708ok9kqa46nepfh42xwtx82zj4jwob6hajlxrkhmx3d0wqalc1a9jkzvk7kaii7wvyklui68h5os2awrkpt2',
                version: '64cz2mvnl9apg9v7j4nv',
                parameterGroup: 'b83pybta7yvflqnyqvkgzrbsodhytq2rc4ehr9cvdz91x6prqbr5m6ensyk4b991iq6kwnn8fkzcb2epyzs4o9msovwpfjmm1mqrvwa5rnhl4m3bfge3cy0uiesffq51n1b72wrfc7v9skfm517mexmw4jkf6ndp6xykcyubekqkry96spk1ppnfbumr8ivwe7kkn0pgukyk3pby1nkfzachunftxjp9y9hjgb6e6nj9raa73izrhigdrlhllvh',
                name: 'sr3u53jx97qktfd1frgmlyt0bmzbpnn7die7xprn8gec176p3hxvrxklpbbdj2y062vs9hq8zlljysarq5dr9ullbpsk7lxhzj15n14ilsx3d39ffrw2aue0tic26i17lradb5wfn6m8unvvymeln5quumnzxyagh4u8j1l0163srs1pxir35wxqddgkwsiixn0e246hytu3z9nx95n7iobl2x8t7c2o8xp0xomaneznzopik2yqo120zey3uiceoc6zku036rt8f9q8tza73wm7iiy974m7zxn3pjsl8biv72jdol98rmv1mr07q5k5',
                parameterName: '9oabdlwj7zd04zdrcs1g71rzs642x2evdp3y7c5eeoc3lybgirqcqp6aiwq864mhprv27ci6muwcc0bpo6hoidvhjsq73x9j19fr86pl25sjvxhjbducrbgx0zdec4py8z3uvcsa58ntbcluvwkys4zyuoa7zfma8623tyqr3ce6vm2wkc76akez0sh6cukb30jt60krmbx5kg288z5nj2yn2gqzohej14ws0io1208z7fc5ywznz0qivboscghrdk0lz4n5o9v640bur6obc0c7d8i72r0upcxp53j4qgz0rrjqjjxdlddb8tcacn3q',
                parameterValue: '9jrl03jx1p3irbw3vnz1fb17okdaqhkzkyd97sro68c8gapyz9i8nhv3ruugmm7f7ybekh0rpit4t33yqqdwje9zeqha9v5g8s5ehrfsdi1r1kivqmsgmvnwg0n48zl2q333hp8qrx2pzkuv3p55lt9wulad3tc1p9tpaie1dvgyd2q0hi16rlj0znbu1hmheibbdpvit817tmzhiy63nbdhdae93tt79bq2h2q8j6cb7co8vze0tw2ov4bpyp0d007r5zthldizhufzx9nkfvu2h54x38hf6g1itgotdpiylv7650eobbhf9t3u3ap66dh28fv8io16fd50or0nqhrgkoln7cl7ht24zqagx1744l0ufh0r982ae8zauvnc7e6881vpu79p8d5qgkwa9jfoycgvg9fjg1146zyt9olx12ubyu9wyvg1f6xioqahebsoarbxz1mo3azk47lxz6qyjsw03mj0l5ll2panayvj7z72dynkhl7dxj7h3uied7gebqyuyvcf4fbuq6bynch187xxgsd8uoyfv1cxge4f2cs44u1h6ji0o0r4ssvp95vldnhjkuua155kc2ytv4lj8ov2ii103a1wcl2nxma4gdl65k937858iyfwrt4blcj4un7lsczlxyoirpajwv925lryspoonohx0fnj4a4u55rijjm1fr04r5vk885pfxd54ls8x8dusf3xr780gbv3z3541wxnn2dccthm8hkk5hi4g9d1ou4dfha3btca8e0olzuikfx81b0dm9hkkluyy7rn2v1u6b7we6q79xs7abrid680ltldzplgtjhp2tn8ld2o2l8fgy3snw90tcs3b7xl5ucqp1cvoo1npi7wquom0hd5jfa3boacz0jbhttfi9jfdea2177ph6yqzk666jpr8r726pq108q8drh9kv9hvkz7xh4md8ujjv0bp2266yxkolkgd9qmnghdhsdlaljsfatkvik0bc66ou9tv3vr5iwz2dcoukfifi4i',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'ggb5kgy6cfp5mpyrzawetu4ok4guvmpxamnv1may0t3gami5sc',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'ah7gapec03festpplabg',
                
                channelParty: 'h1ekjdgsi9acgxgysk5rmg6c27jq8ex398ux85gakzsge8s2ue1s9f5vgzer2ovp038kvf1hxkvgfnn4m1nqdmcqcl681me8nfbyffl40f761apc73ld17on5o5bik3uyz55wc2u032z5j5wl3uq7r6249ls4uon',
                channelComponent: '4wntfwg36yygjd4jnceqm9fme3msobwg2n5359dhk7m5gcih3rt185hnru66qmjhxef441hwsf1gdl7c6drir6pm45jymuc2k5xc73pumduo2gsulksi13qmhu6egsh12ud12j6vfde06pzwp0d1fr0eh1fzj085',
                channelName: 'znz4yvmuuuppdqnfzv69jemfcz7l6yl8727epmp02zj3fcff978qsqpu0nil19dm5cgiiwry66ytes3kztygc9xxnflthdgb0zegg7d5yc97udxfenjqbpuy8l2zai27obyxjtgcrzmbydsz8s29bp4ica9x6w1k',
                flowHash: 'afjj8ktw0m5pv1y9lek9tthpo9bhata4cn3majfu',
                flowParty: 'panw9xq8pliogqut3ni7sayjwombcygwmev6wt6dveqi4cf780lz3nyi03qqwizwrhe88ivrh138a0ifkdovx9za35akwntopfrfz0kqhr7lqrdpihe9lvxpmtcdt2oub1u8gh4tsjpplhmoq22bvh6er1mmrx61',
                flowComponent: 'krk6jczszb4txec5mbq26i2gznaoayvqu863lwa6tht85ghytqiiposlcj8hbafdgqhs9xswvapuj2wfxn6knbwthhahpqfmsierimkci59am9xa9t5t5scd2orlnb70xdsq4z42acjt6ztub75psbvr6vtychyj',
                flowInterfaceName: 'ev9oq4t20enwxg6bql266rmnbdkg4jkmic6ks26xzeex010gwggazzp91qk8e88qi24rhr98w1xc6xlmypcyfivc46tuql65gqsiyiyvray2kf4023mwzktbxpi41ioxxxbpw78vs0oxhsw8r9soeltq3i68v862',
                flowInterfaceNamespace: 'ot47dh7zjwxu0rdw1o9hu04rhr8j8dxn8qidmtvtkisevksf8n6lkc4m9nycm14juawet90m5lz2cpsod3zttupipxqinshlaoqphdnzuia1gjn1llcnl64b7h6do449bq33qua7tw8lc1kbi9ztdo3b2bwesle8',
                version: 'stzbredpc51yczb887mq',
                parameterGroup: '7igf11k7nk73ii0wszbpurotwim6judq4qxbykwmaauzga4zkynuo29z4cj6d2tix4l67anttg03rrggf09spqs2glvfe3oej0qn5qoswmlyynxezrx4dh9jru34ydlfrm3iglckcgnbx34qp5jnfbp0bx7uvw1bzd2z5p9i9mwqglavdp02n0j6io5gbvasklgt669buav3vcwey0i5gyhpr33k9kltayymq7xev38pmce2mt10x3z709j6c7v',
                name: '2xsaiu0maa474a8l5jn00hpa405m9haxzjats0oo1ejrcnhbrujkc07pasd1r4080jsoss3p3xab1t39f56zl1uv51dybngkoh1mtuxf9l2rg62lxfm9ctpsmnih294v35yklcte63estzpud35imfa6p5kyof8n2bmw44mq2snce1emcv48x1ca5bebfn1k3kvzzif5gvllcec20j4cye59sqy1yahbtumkmma2i9st48n2fsuuwkkboxtbnaionb3cvaca2zny3ou6snx7iysgqfdcz5z8v7qfzm8oapphbrat7ya6qkus9wzkqoe3',
                parameterName: 'po095i2rghjfwsck9u9beb3zhaezkg25tgpahxoikyhqmr3kst3ye1kdkpsv82liz5dn3fkm2sbc2rolo1lhbrtfqgh4gbkuksjlxrkch77ol7x2eugx93wyq2c5cw79s14xkwsqxu4ukeu40kzd015h5j1bdl994d49nomiuomhz3d14whfiq2emlanzafx3m98wyreszsz9sjx9i0khnzyix0tmw1yl80eoqs6ukgp6sgvmmuc6u2qhsp77y8zip801bpm0j4d6ufbs5i93ewudipevs3i7i27soeorz9u2zcuo8smt5majv8glmn7',
                parameterValue: '8fx70gkopne04cb9t7fs9teyhrz6625v9xmj7u4ryqyx7vlin5is6f4dm12i2rd6l2mc9ej4j7eu4ajgygzouj32cqpmmje7m84o45582op86zwn2cwruh7ncn014ogwd3tfxu39jgwjapm9rj0ii5d1vfuhz3hw6tg060em8alfapwu30ivu3f2z0cputlusk5flrt90jc47uf3qb4u9phphguhlxwh9h5fkhc3gv22np3pxxdme3myfvgt522quoof63xgpuq5e9x0m5f8fxhvcdz0d9s92ymbuxz9isforsybdbqzbz2glxhi7x73quwmv6gicj7y23slmfeou2g50vwe4kr85wcr4cezsglhgnfgsneyblyqqific6kav0b693jk1dxv5s5687uuo63qfahgzvs6ejjeo8m5yo3ssei1e26t6wyavgn5wbeg0zi2v6i8qyrh5wgi1kf69upg2kmoxmao0fpcec6wsid4sgs9zprykrax9w9x6rjxlwmduwhxq2zn0a9bdudf0qirgdljxqmva0lqb615q58kcri1imnqscz2b6ttxjsyj2u2ktctxma28feodgfx8dqclx7c5rta1p6sg5r93u0jq7e3bqh12ea3bedqar1hqn80gx3wunf3e1as6kdh350getzytpekpzs9lddt1572rdot1aqafljxnuwr5j2dat2w3zalt8wosjx6j9gjl7aetaxnspujxe8dv8jar6018vq61rkgbdrvotkvq0meytpf48khh4aww9td8mkmbvxb811ltqirdp77306mdkjsc2l9djsmoiq0bceemn0n6ephrkcs4khwdegqvojc3trr8j4gv5e83t9gw0zroygypbqiqds9ztkcs4tuifodzl7vdi5rf8m39063grwagjhsp61uomft9wy4d8pslse81lpi304mdkpnxt8qtfwg1wki6uqsy3kwmlywd9h8jj0aapavlb7gh1w4c9etknes29yhf07os3cr8kv2iv04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'jjcxhsso42ej6q69q4psmrstl858w3ywg46amgfsp1tkfr9ql1',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: '6tv2gppyg0crtdjxy33o',
                channelHash: 'erxk1j4zqcpgw2bmevhrjkv8viyp3slyjtuws2oj',
                channelParty: '5v1auck8vcdneejontu699w2ef5ocv4yip9o2e4fxejuh6nky7iprd78lulhcox4lc1ri9hrtizo7sh4jqvwa8vsj9361i3ysfaolfrx2t4vhtach9qox2nt2m46czwrellxyqvkiwgktrpx5zv45y138lcveo06',
                channelComponent: null,
                channelName: 'e89y51knopl8lil95manp62ncw9chsl39r8uo5t16ie4a8kivneeorz4f5wc0unkoiaccl0x9ht398b8wbs8qkfyyn36svtcggnb0lwwy93ujjsiq6rjpejrpbunziw4ofeenrmf8ak1whl52ledgrwgg53t13ap',
                flowHash: 'bkmjczhofpr369zai3n125u40vretvdsu77tz0kq',
                flowParty: 'tpzo5x24xe0onu54xco0if2ogjaa2eyuy4cimz78xa9c4864jh0u1whmz4niymhobt2m7wzvslcj8ntqhueyeheiudx3rup5zmea0ja6rvxmkc0awpfd5tcy3m62lgjj32kunn94b2p5d4d4oaxvzobfv5buliij',
                flowComponent: '1qeoejsjk7i834n8svhpkk6anm746jmoyjl1518gw5npgfqynjsekvh8tih3vlf4e8toyv6m4b0246kszlj081wojfuseb2y5n9ca6nz3aio9u7sk64g53zzqmhafn23a8y960vrz2j80lg4tx17pk37w60rtzfr',
                flowInterfaceName: 'n2x76m108676vy4dob26ezwumaoqi1oybwyg782wxc6c8p98gqbjq91h4zrimo4olu5xe2p7ngcruwhsmn6fe0glw5e65sbgri7k32w7ubv2w8dh4fup0a5ivp8h50q9op0j4to2de01hlo38o6s17uefejysv1e',
                flowInterfaceNamespace: '35n3r25dnaqnut6k89wlcz6eldxpc70hpowok7b7tlm3sh9jsvzwy3qzdbewr7d66gdgmuhyy6z39vu1yplyye6h9nltfvotjqeozvirdbd4lhfsceg3cz85p844r3ncvj31q5ym8bjbn8gqyq07pt5ngx8zgaau',
                version: 'gxz7bt7tc0ede33kqdin',
                parameterGroup: 'lr20wzmq9ufarg090nksrhz63j7rfq8ncw48xc2w0bkr8bo6wbk5ifh9w1zktzo2nf5qd10ma3vpm56q80mg8f7zayhrbu2z3zl67xxgv0wge8fead1yvjp2n218yxjobpqj2q0j2xrqmk423j7wkw4tt4zreqp3zqmm11v14zyb66pb6fm4ba7g4ekc1cje8on4swuat5zcyak1t78gl1586e2beqrsw8sgfklj9r3tepwywk15nap2ooazrlt',
                name: '9160g5wuoguhj93bu1ad1ekqktcq4vccmrd916ka4sbtt3yl5qzdntkvmqsxwjenhyb6mtiwjj1zzvd3873wd7180eatxvu4euwf0m15g4jxco5qm8rd0od3jexnnwg4rihb0uiq00hnbhmshxb0du5j2i5bdvr46elbh1fb79m7ab9qaxq3m8rvu2lhpbahdmk612emwtd0tdh68q0ubbslv30fk8xl8smtab5sd1yryfj3y3f9i0i7w2u60yjvoifd3z97tvpjvp18jgjupownjykecnrjl6kkkj3lwl87k2cyvr0svshq3up3z0qs',
                parameterName: 'ahmtbs5vtxqhncs3ucxkkmhyvcjdxfxngglfeyezye4tp63znbcw5lnxmohbi0owwe3wxxgycdvrquqhsql4lo3jn82917vfc4fxye2t9brs6mvwtmjjaf569xchc8frla4vvadp0m2coy1w9wcc34moxal3pg287vbowhe8j3679occulcniqk5a760fgktlyhx71p2qa80pmxo97u7yxrkvca6q1yf9u8e6ylzodegosep1w02gqrnpzhoh8ztvxwlzdkbgrs0ai8cvowik0xci45goehbpe9vdodu9spt7c2j2kf94j6csyj7rhi9',
                parameterValue: 'xnsxp27di83smyabjzzsau1zfx84jr7h2e60q5waum89ylz3dbgljyu69pey6expz0c3fdggw25gzcq4agkaz7mcnkpava85ks9qua3sdy1fh3bthid305urn24kmvs0sftrja48woqz3yo6xs9w6cjehyr0pd5yrk8c0iqjdn7er2w4moxzpfcbtdjyjqps3pn19zb05upg2jaqnsr488bs7lyxsvxndt5chxmkmwyv4kxlw5h3dsqp6b0a9mccn7dt6jv6995cihumddq869u0ns5moyk0znawtoqspiyh9iwyjbqm19ixzba8kovgwvr0gppwneg2pd0sc18xnypcrdsnqv7jvxax6p5ieum9x03uh80hcthz2wf3oo168gc16edol4uzpag4478pxyj518ct5t13emuhw7ncdvqv3zvkezn6zibzoc6jknwawsiej7sj6l60et30w6mnvocxk1pb5ka0n55yi7gblp9nh7ps4gf8849qvaepk8eosf6f46wjrwdfbbnrdsycvtqycer8tjb61rgal3fuyn9w5y67ia8ngk9mhimz2lbdk3rltmeh5gozr7713k7ohuadp452ui28y9xbw10u7yidm1herg31cu53386r877ucm5740lhym32qnyt7667rh0d5w246nsfk93t2fq41hx6ihtllf0xtv38xeqi81z7yp4b6hf32qflbv4uqvb0xkw9p6eittbszhxpcssmr7zu1ilsz8ppzd8h7p31gn9mrr32yhspjk91hm5otvsirhuqh4jwcy20ny4jz18cgso4cs7ysbf1xys8fksy3vvp7ys9mz0dr9rz024mbmy1ushc2pqn61sruugermb1ma3zhgrmvohusropjs7swiquzohxj9m82djew4op50wnbzaic20xrhitfk8b4ln1v8qtjot7ploobzr8on3nglmlxe3fpc3b8v2v07nb8pjlz812awvmqactawr2c5jsm5qpc323k97lsd9sxnqk8dng',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'ux6fos7vz6vcio75a2zdoxzpylvev8961bivb7xvqkyvyvmfjf',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: '8hpeapymdd88xfkj68sb',
                channelHash: '98m7yk5vewn3aaeyzbp82lo8noo31pbf3npqafkm',
                channelParty: 'bz9udz0qeohsrgc6i9a4bvkp7p0g4tycptiuruzilzdbs42k5b6x6mwnvqbxwuu7l884jwxszmnfd6gizfr1g9d7i221m6c0nzb15rca4vds97xo93f0okgq74v2gqx8crtygp4kc93o4h4hz9ufz0imnf4zape4',
                
                channelName: 'pu8thu4cmh2i73a669iy8narnxhg4hs8606gl5pdkbwkst2n8iktzmbop54nuuvjtbs5twvaw4l1sooaiwtel5oos15dp16pm1stlrlkhizyfdlsdr011ctldhfvvfi4x0czh26ga18n4xoumzj93gpkqnp6c5aa',
                flowHash: 'vwzthc0d7hp4c1g63za8a219my6gxojfa1u4hw6p',
                flowParty: 'o7bwmrhc2fnauyb896o0o9cmshzbm4p8pa2jiz0e2you96czjqlh0gnmtb9s5m2b33bcgcwlnzf5a50ble4ltj0hp4kpzl5rudsinvoy26ht1eqkpcxrh9ufzltex3kxzc0nuaecjoledkvuw8pd98intw9g5hob',
                flowComponent: 'b23yh5mm5gfte5f8mu5lwbv72oauw6uk21pz9wfxtdv4buan4hk65gyl3humac3tawd9rvctcp9x1n7015xbeveb7ovcljjtokm0hg8dss9e9mqp453bw36vtpz49tox46gdpoii8hdzf6dmi8okktm0m7rvlwe1',
                flowInterfaceName: 'pqzo2pl72xaxr412syr46u12eoyqjs5mhfiu05ftghg20yi89bgqyvcoln19nr7b0zadpux0crbnyspolshpbjg2usomp7i3yqhx6v77l11aog02bubu7we99d108glxlkiev891oiutcivnawlgb4e56y5qk01d',
                flowInterfaceNamespace: 'e7fa1a4kg94qui9i2p5q7ictt0qy6asznry5j1cik8crcugwf2v57a1g4iqkiyeky6azln71hwb4vfgxr2579rludnnzqpgds3llhippni008q23waiaz78qpwbpbcjwphcesyixxhi6vswuvt6489aaductnq42',
                version: 'lt9o7qtmvdo2l4gzstgi',
                parameterGroup: 'zjfobzwn8xd8kxn03qxpisxowamsh85y8ofsq8lqrx03gfndl8i5wefylpl9xbp2v14x2855igir42wnlsnrkrciu35f97ocjj5o66wrhg7yz5q2pmnlfmg84xasjxw46581ysbdnvtna77l1bgju1v7hyhz0c60yioequwgoloq2uiy3e4rvcdff34ny4m6ie2wibar0w7peyesll5j5pim39g8tm88gon680934i3xe9u7hz8vgx1b6996n4z',
                name: '0ta1l86zz19zuy8pfmva68ukilemaamvi1fd367jgfvyv2pogz4wou3r451qccj37s8x996pk5z8oemcmlnijoehsur5uy8676hppabyj4xepxkymy3c76l9zv3h78dy7pwaqfnfwymwosztsnl533hv04nkmdtlhi4ch271w0ydvqi2pfdsa1fxhuofz6gc8z7uw5ipagqh57lcc77054z2fp3v3jqxeihkc6ylldhlo3zyzkmwzc0ylxrvzt4evr5aln7rhn59gxx8r4nrm0zrkdk68q3vj4508rwtmxlelu53rypnqcsem4zc86zi',
                parameterName: '8vybvq17cjie8gf4hbwq8hep0s9dtizbh3azpr8wfi6k3x0avus31bdydeblqmd2htvw1wycf0cmj9nss3gb9u8ac1417ct3wtlznx32kbdrh1x2fgzqqhy8qwfhn9a3t79a84o1r68fi5l9q0ui1f7pp52f4p6fw978jp2vruomw9biewuor3bc4vu2yooxum2glllo2t17awkh000yyrxb4bjne7hz21lcsakwb5mjqsy4bzjxroe64mtf4bokkgs5xquhaioreziio19hwqyw7a0h3cipuueloyvzpltdbzewwhfoyp6zss252r8i',
                parameterValue: 'arv5gd4fjomez4j2bs5rsflv46vgynja1e3xn7ww4jcqah7p0espq2at5eb1bu2td2c4pa6i4xmyzsyocex2ne2mrcyfshuqmi0xhn20zvg5eeje0vxfm77e7si6b5evudrckicatp9yzjzu9fpfc8p14xfu2y4wbc29s9xowwtj0pmppyxtqokvsm3qjn10pi43dgsyokhep143rbd8ul6vanz7gotvgmfxwmab24d5k1d4di7c12231ues3gn9fdcxcdwdcipbn659wquzui6b3offmpobkxnwe0vuupi13i7mtt3rk856xfwukhy75qu2y3zg91j6p1cpkg2gw6hm5ihsqzfl5v10gfjf40sw3958411ymlbjat14rt3ukgk22l4jk09zrkkv8obz132sfrr3cxugcy8hv6fcrmjf836lkm9x31lkxuyse9w8i983uilfma2qlnnbebrdgcb4jxkxiz15x9pgk160uxf5jk5mkkq20jl6l7rg98mgvy81jgrz8i14n33dhhzuvpvtv6emm9yksbmig9j66haiy3e78i9zq1vel4cix5gnkbwicjg23bwva5xuusy9w3s3jf4u2flmkdvk9p989v7kxhv7iieyjixfvs2mw0ueke1a2vrlvfsf1f2vmdk88jpnkiys4t894dokog0ls5hblzmnm45m48clgtdcbf7kgjborgnjq7gyja953i2j7t5f14hu1m6jko2nagxomvipt4bmwq5ax4stq52sygt74s29jxmayd9l3a8xh1xy7ynbthkejd7jea9ukx73hebrjd5oi3h3aa4v6wntituw3ocfqtkiq57pwb1snola12vfmjoxdo8ijx8jou7rebbnwy99nzas6svyatdgo00uhutia2ayas421oyuh0adtetos1womd0n9y0pgdse6pbwihu4yc4wcidl3jkkzg2cte4wvqzrs3wrgoa2stzyz7i9a6aeww3r50ysu8kjavhjso2pwwougd74dg4dw5za',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'es31bx9p4mk585ret9kj7am60ih93xvfvsvof3qluwm42ncn1n',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: '1oj22ozd2vvc4gcr6v65',
                channelHash: '6woh958whdzgsni8eyyv381eoaiiqg9fl6v2vhve',
                channelParty: 'p2yz23zl2vnhue2azmtkc94oswp75xkhie0qkjshnzbz55gmgelcd7444visv38rc26bon3xi82o5fvbsawtwcrw0weuvfh1d5snwavet9kcbjx6knq3r6i122bnuyts2cclrbkrjv04vtwkc2pbfqbb96nrw9gq',
                channelComponent: 'nxfpr0ya0xjdao5ynht4siawba4fw9u300h5jb6xkguy7hnbe5esbdtln0ahwnamn7ewe860d97aj4g0hwjt31xhcne37f0yx8ttguviihou7z5kg1ml2kfucm88jhyflybwcyxsb8hmmr0no2zmuspoyx9ni6uk',
                channelName: null,
                flowHash: 'v59k21gowov2zyd9oxiox2feb68igz256booy4wk',
                flowParty: '2b2g79gr2o592hqwqtmbfilu4v2g776oey8bbccb4emg2tzwgncn9j6eobrw1znrkvtp22qrzjh27xaskoxfb1ywvx539z5dmjvdq300fie8g5k0grm0da0akm3xvgfe5ycxiz1ebwl2bvekoi15rna46wr36r1y',
                flowComponent: 'slly648exwed93dczh7qkuoc51692otnrjfi2zcs68yz96hadjosayz4yq2e86c6mpo8c8l6xibsrb4x8jnc8u0kmwqg4v511is0a82kp64skbv6b7kx7pnct1wd5qyaasgpf36btbhfa7g7la84ohzjs9oujg8b',
                flowInterfaceName: 'b58wzvn5id1wiapng5tax4tj7keodt1bik6lyl2vtenarqm5kqpvi8wi7w8ukrbzvx5g1lvve1pc4s59n2yj3ap7a7js56ic3gbj3h585n3i3vaftb8smzkzds3l8zk5jxppmglho1bj7aefbq3h38dr5nrc0kxz',
                flowInterfaceNamespace: '5t10nq2qfmwelr7jayh82cy2j7fq841lt37o2qeja2bb7dzzslqw8bcbli9g2wcp3tg76sm9a3tfi693qgwanfkdfv2vzq6wz53b1a6zj64eavzdfrcurqpxbz5piqm57ehkxg7lsg6z4mubfpvvm3ujkfqo2d0v',
                version: 'vy75xupi56531b3bxjqd',
                parameterGroup: '530zzlys2xecesptl0fa0xtpp1j9w3zvbso8gm7bdtn25ykrqgogxp5hxy0s16mkhud6epbtr68ufbnyaw8zusxf6963couramnndk6j50h3jw6a833w2bud6rsqzmu85oc6v0dk6gdeadjv6o0i0vk4749c0khdybkjhyy6s1wnjtot49kbz8jxdwcye3jpp4ebdi76j0dvkekyek44xjyvwgdxt670i4uyhwbebzr2que6qfwb024u3ju4eqe',
                name: 'z4555iq5uh77e3h97lbk0ntc673yops2mlir67d2h1jcorknt7rioofep8jm4cfduvbfdoepaf8uvxupa261dvyh4g8qhgqybctowztjp45kub2tb2nyjw7m7n4siso2seeneamgq8tll8juoq0cuq8wn9fs9q2izma5j99s7vce9d9khqcfyl80izzn7zcl6hlb6l6xop80odgs9kupzwg65tqazg2cf8cjttqzlrelee74pzebgbzx2b1bzct2abtr4ciotxj6hw6qk2czhl5hey03mjul2w3je5llikt5qt8cxmr5l6eowig1uyum',
                parameterName: 'z0hjedhgmkw6jdp4aapuv11cqv9kwxk0drtqzne9n0367gdwg8bjpwqpa6725sqwev63nwhm860ws1gv33ybqq6qgr5xu5jexfxpbwg0yei49ezj874vrhlwns60gj4dvujmg78g9f41adqppgy118q0v6gkr6jc6kks11o3tgeo839tuovh5agp1rmtiw78bijkzimuodmfuj5xvb5eeqnoiing6bq2a3ildlsbjihtar1vbyy0hbw8bquwqh6twbocognj4hyruet4qcfdk762hnm1a3tnd1cd1uezh3mxcg55xfy8syafupms7x8m',
                parameterValue: 'g54tgsxntxkkz575l4ugju585ojtqjmqi8sl9anistmtu0j4hsp056kt1e4bnnzze277z74bf8ytr2cgdcmuj61xbg6fljdllpqegrip5ezfgx6co8xgvqat0aqc0l67bulk37sntoxhtmubwao0nuzkjm79muw6v3n2lsi8d4r0kfbm0ajdg8bfo6dvzxy7wxe572fr13ujx36u63g2pfm9bbmetvflf7roy2tmkd5kx8nmldbtwv5mgh0csoyf19dsqhyjjzjz9fa60c5x24uli5hf4vh1zpxmaua9bjpbam93b9iqlf146npy8gusunwmtaqgqi5hhc3o8jhuwai2r67gl3387wywr8294w63wcn3cykfoyavlu37g5lpn8mghindg4wq8x2qqs9z1jxi7tlo1imkvu4h823f8scf0p6tmix83f0fqbz0jc0rl7lf6vhrhzlfqii1wlt5uclla8k5kofjacsbn09ydq3k8qqmgp5e7d5mzycz1gppbchd2v5p2p6kywk6qs8gl013mkn9gipmkx6hf5ftr156cmv3kku8z5aikrof2jya463l7orm29d1fxaann2s8h4uwm3x4giisrv86gj95wl4ngma7rg3mcvnm6w4hd2bsshsu1cculbxxq6mbirzjmpq94uo52lew8lmgp6jja5m3ms9zxechy68ywnqxxhkmy0khpaubu395nvxy2kzux13n1whwhuzehrrcg3x06ek8t1avna5yjyy3rvjy021hl55bof62f723ps1brg2amfzm8aua89zncdtn82sllvgs6f4nexqfvku9zwlff704ar3hm4g7e9iuret8dogqpalsrnnhfgz3wwiljcm1b0gv83idppv4ahabx2kzqy5ajakejgc7kl93nomu662jo16cob9lazthbj6lrjp6xj48cdubkwnllfshqjtyokwj9e7gyiogjqo0j74lx6yxmetslulb9bjze66okgvl8mzzkt64pdi1qb1m3kqb1dq',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: '4yg3tofqakrqmljhg5k3m6m68qr3b1xn463dbvao8re0f1au0m',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'ah2e3d431hbgzzgpvbza',
                channelHash: 'lp968vaqwzsir12gpyn55phdsnqg13dw15pcajsw',
                channelParty: 'h73hdchs5zglcdyo44zpgzla4tcj2gl0qfcr8mkcng5f88rnon1in35qwg4a7de1db8080cpniceskr2lml8y5fe2marauvdw4ifk8keppi2p34o5gy0e1zzot5fc70tzk3912oxfzpgmyz8snb3znptirdkpr92',
                channelComponent: 'pr3cd8cpk5rx3g5oh2othjnpgcm3oga77pgeyszs81bong1v1gf7nc9bpgy2x2geebgkk1ny2qz9zp15kn7eyaimqfcnifavsljpihck9u2xxb1zujcvzwadt39mn7kqkm174clgnxuqbt4s6jqrn1kgzk5bov2b',
                
                flowHash: 'bkpbgc2ugdw9h9zoxt3b5wzvyyirnw5xsbg79ld0',
                flowParty: '2enj3kn9otbm69y99fij8q84gnrsxeylclepaumz5uy0rzxztfutosvwmpdp4o4efrktt1d2a4sqx80zpsg0fx39y7iisz8zlvq54nagcuv09g4vdlhyexjudjbgonrq9eckl9qhni17p4s51y5bv0bqxp35orah',
                flowComponent: 'gwpbx1kbn5c79kyawvsbdbvsr3wdbb4tb6rg2mq65akuy2w0yd7601of3lf1a5o0n9yoiquao9rawp25edqjd12oos46vt6tsgfhj6z5olqnzi8fuu76oed4n2uhvu1jmrktdxrbm8ij085nb7nd0jtddwmd9td8',
                flowInterfaceName: 'hmixi8vyaxkkxjr0idirs8mhvvwv69zp7hmv5eiixp41gr5b91o92olpbqm4am9llz4ahmgxjxpp2sy4hy76gboxh6jheq5pnkzh5icolspzjmmm4pnfgzi9zyf8y789cganjmn9g0vh614582063imqhm97fka5',
                flowInterfaceNamespace: 'icasuc1xp5hnyvxfeohgysocnpnjl4mbdhyhol4esnfwrxvzmc9ulgqke2jwzg0spvjmyhgs1tqil3ocwebbr8onhlr6f48mr7c5z4adkab22t3899cukwpcy4akz02f19yebbwud1nd835fekei5pxaj9c8czzw',
                version: '5uwkkgqi0nomar03knrj',
                parameterGroup: 'y5qk5crlfot38qwu4589vryv0qmm04zr1jj2nkc5htv5s3x60gq9xb625vgxkp58kw91tl6zysplcqhy2dznemxpjq7mk3f0g0xp781uisr1dprngxgj6xnn4rvs9o8oi7lz5euy6sy5tp884zowk747luu2lvyp2tub1x033sx713y5ujpmr8v292h3apbbasp2jliiugdfs77h2ru21fz48uitgyoivw6n3hsleydrvsqwdtamhzuqlnqzxy0',
                name: 'rgfafjo06izfq1x3or7khyws79r0b0daj9ybrg5up1f8isyj7adpiuqgzlcl85mk2knldvq95k6ex6b5npvb6advfju5is2ap0flrofetcgpa3sv7708mlx76i2slac4nsbfxnl9sexhl0yyywf1wizr9bipg3elq5xy98r16mkbgiuh29jpqxsimtdvnrfaa29bjdhu8xb3tjd8tzsvxb5qxh697s8mgfsrra9iiiozp6pcqw3xp7da8jomg3iqahu4v7qtiws1z0nqtgr70hczb0kwc7vn1vh3lncm97kfe7z07d8urchnkxb3k278',
                parameterName: 'kqu5pcw70xal0lnj6cq4i7j23o0nditkafdukmh60zudjn5q5ewe4v2pzyhlk6f7zb5ozzg7wpsn465ehkupnyqxqy8df8ejj7zrhgrb2e8iwps8wbxf6eu48crkuh0qbzctaq87ncyt3o8jqd7sr8wgw03z1zrp4het26c2q183f7cozv1xrhiieill4mccj7sibm6kdmw719jnwn4oayvkj25ca1z71bc8ak7cshjqi5ijjgt832ampw1ooxrnuov6mymfhgoezy51bpjsf0yni20xpxg2qp30s4xtykruu33bat2rvzs1nq6e4sfl',
                parameterValue: 'y9850dhotlp9xhxdopnaqkn3ypngwsc2an7i5vizic33kbroqmn9k0xy2f3vryk79rftig9j2tctm73vrx7opmo5bxia05g3o3vllbyco1j8yq3zpctwb480lyyz0yh0mi7ryxmge0eolwsp8gxax63lorw122nzru55vc81ijtskv0oc8mm9imtx5w0uy1c798g5nwcxcuqlzsr6ghc4mvhx6oizblwz4yuc1r89o740pm45l8zypcwapf44wlan732n6hysck2gp48v8ssgv6l0cs6qxy3m86zfuin0inuyi62fa3w7b30pvngi6otqrx68e49y49zdr8obnd8nq8sf0lownf66g8sswd46b4ymw6smlr1fvp0o0ebkwhzca41bry7314xnc32dbc76ajshcqeg3hub41wwtuj37knm7wcytu6ul14iz8ckcdazh32dv9kx3ghqo7j4xh1ohwazxu4a674t09d792pm8rogpc2sm6rbb8qs8pptlz6v8sh7j45ux4dpzz0truf8hstndtb9cfnfytrjl2w4x1j6ydo1trr90cmofagyjb8eey53k404f9p3zx5abq0hllgccbb8te7xrlrvxxf5l2s70skt3wj2fxz5fv6wn6afo767k6ep656p6ho3kqevkpo2vh5tnbunp4n0xwiilzq33yw8iswt7l77bn9c5ztm71j3p72r33iozwfwkvl15em2i1p51jr23asodo5kmmajho9e6l12qvx0l46rf8rbcswydv9uq6alhf53yt602dihxcmzaju1imtlhe1spfux84091wrpz1tca80a065o6aqahhg76oym8z7yluaxw2m2wq927ln2t9e54nr0w4mclgjaqzqksgj91zliayrxu0hai0vkntq18qa9ba2kj00fta8ypaiuqtvv8stqwe12q2g0inr4gwmfidymyq1a48dwn8pvq85qry04d7aslswbjusfvnkxqkjm8hddagq9v60luc1tt9y511guubz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'jslt8yzoft08j1a2qq19ato3jczbno9cux4c51286cbr3c763h',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'ht4qqo28ls7jkffzw6n4',
                channelHash: '5qqm56a6e5brwq7vgs9y446e3j4d0c4srbv50cto',
                channelParty: 'fj8febg3xdpvk4avrxp7p8jv0ehw18ofo56nou1wj15j0h71zvzrj416day3jx8p3ttft7wwx2gq1p61mhilxho66iikqn6x326rolfwerf3qe2o83g8f714lhokw5om5m4dryn4h4yhdn7hdxghbo3jm5bm4nt2',
                channelComponent: 'pfc6ngzpj0dp05bhxkbei4xfru10lsiegj4kdipjffaq9s1zyyet14xojs90io9fnzeaezk5xxnfkgv7mbzdlolrzf38isreszxh2vg3ntdi2coigkjlybujawhwfcroq3n9kr4gapvy28tsxwvg11mrw2cuqu5q',
                channelName: 'ewojwjiueapcgm8e2thd5iay6jl7k5j6ftt6osopivmyb95mwc23pe3eczfdappczf7hin3tqb6c5soavvxxban7jx17znsmifoq31ufp10j5g0sy9dsud0m105cq5ge9cto7piowwn6maexlzspth2zlzc5c9hz',
                flowHash: null,
                flowParty: 'qh7fokzqand49yhleh2z0ydp0g45odrzlegviebzm8xwu45hp094dyy9urb4ba2iuov7o2tfmtwdfl6u32fs3rnbnc9vnyikx7j6qzefq2e6k89n3ed6y9zf9oxcwn9nszwfr4x9uuiqdylrgunh17xbksxia5j9',
                flowComponent: 'w9l2l54qlk2vsabfbasy6j6g3d490wkfk0rsvgge78veyoob5gk5bsnpaf4ttyr8veowppei2e3yl12khz2n7ycor8frb3ezwmzaxxv2cbmsp7hly2v88humhun4hlg1hasmn4alpkullbmlztydb0rr030az4zr',
                flowInterfaceName: 'arl9tnd9aey6h4pkh7y2bmpz7sqmtgwyse2bkm8hdptb1ifjvcgf602vqyyxo8aln6czmvroey0q5p8zb1al7o45izt7xj6ai4u9lkz36o6j0wd5djjugh3tvirji8pxe560rukmn4n0d99gjmu1ho82i9kqd1om',
                flowInterfaceNamespace: 'mx1s4xdkvuws4t7pi88kwbaq7d2hu49x708rm8iphrg2ye4rt384lscmqwa3tcvdqbnfbxla0xbnal009inxok35m1z6h36y0qwls0gg6hf82a2ti7gvm3w4m1w430fr9if0m82bii8md2aqn1s3i4lvcjpo707u',
                version: 'tg2kuc2g0bok3g28p91e',
                parameterGroup: 'uoi1feevsu88gx1pbsvjponqhv7jlqwjwvppz9x5p254wve15n04hxe88fy92wsurriaw52j7vbeb458voig2b8mnk90sgidm5dd30ylrm6v3s1vu8v3gvub2u7te3d0zzxn79lk40ayfvo79wlljpue40ddksufl9qjv8wdrjzqijk9zjnr8cq7ngqr09pvcw3xp5cms2t9yvyj38opoe9a7itg6tonm9mzc2g3a104c1y2blmx4r6ryle843r',
                name: 'ju5unhiogws1t7qtgi6zco0aya1igfcn2bgws3g5v7igyt8uwcgba841yi2plw36bcfypinatyrv0s2t6zpemdvph5hllaor32dc8qona9q9o3t4s7cpsgk3a4152kjw7nk7ob27b2z032gzi8wke77wcsseiaelu98kb7dgimzzkwmhbpzejrghowzo930xnw6bff0ibp804rwcg0vkhaeusbzblkkj1ba7lwp2gfyonbsljtdhlstkupwf2asoapbahl5j6xouzglkrfxgba83xg243kpln78he1cshzeentfwp1tiynmslioyh6bi',
                parameterName: 'ob0sugbiv97lhmz35a367wbuoqfeqvdk1cebfi003vs1ecrbdapbqivgmgdane837r5bns2nyhj5pwrobrmpf5crym369py94vaqmb86z7pnh0h5x4w73y5pa7p7abajliwwlcpl7h70jjohqw5u8fgjb6cz06esjidh4kittqdkd05iskfxx2hbg09tzwl1293k0a87f9qqcd8koobt31ps8o2k54jstxcse8wq5079nk1twdzotmb2mkexlnws4r30o5mvtm6znnuj6m8kapikrrakr4r3l5mspplce32x477w310ym3e8wu1j6a3f',
                parameterValue: 'b971axtzkad07x0ww57b0pc8m3vy0fdj1b5g718utod596r4teciszifaqbeyl1l3cs9m5fhsumt3wtop90m2hhrzics5ui9sgpo3unvza1lqdg6coqlkbkx5z70dye3tan1dsos05d1lwzmqshgr0ozmi99xls6r9l47h3g18prml9uof6oq2q90yc9qjs425qf30sfrkyxcpc2qyl88sexbv8jo4sh96ytaiguo9gzk38unueh5sqtootlyjblkl6cz9mjo543t07f33gyaif2804ig2fome3n1cmrunsn1gfwshyk0ssy1mlgakp4lvbs3aqvfpqm9wvzav8vj4rj6r2zsmqnww2986vmll0o1a10e2u6tamk94a8vvgzgvkqjqssosddhkkhyh2sqqgfj6hxpufnd3mrxk2pi656jy6h3gw06wlmm0osisuckxyzydza0qjkdk7u22sfz37pwpnu1bqzcvnr6x4nrllvghh5v5kz8a0u1is6o4mf2751y0b1xjwvxwl31thghmgxz1mqzxkwxesozevq7ra9p92y69c7mndawvsj2pxijpna1hxqqur1t6wair6qd0m32bagsik1pnt2p1wefpqe1vzohxwes151r4r6bl8xipl8886d9mqsvmc5fybffuvc72fllb77zjvpql2mxma3kih17v5t4i5kz36j9wwzwuooy9pwh5zdw9einj41ckloo5k3hkefdpor8f24q7ejjcy5t5ll61hnlk6cwgvvaj94pccd724w6ibeo50l7ftzjzhd8bcfod2t6n74jdqxtynciwld7v0aps1qilp204kbakgq5kdekeddz0vo62y85cs8fsvtqosmxrj1gfqpc9037jqr3wb1hn7k5n1edlj5mnth9xv0v2it9nk5clhpoasfx2keo82dmx75s2zdh5rdd83vpxf8mawml07r7dlpne67imiqvffto95xen5v997hgugq4baujixvzxwycfg83mg9ioa7euthvlvg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: '2tnj0g9zqicgbz991ce69y2o7smt3woadoodflvc88p3ufjplv',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: '6jidly9dibxiwniwjus0',
                channelHash: 'pv2g8io1eo98olf6irqkmjjnkzkklaa62epzs4sr',
                channelParty: 'hyi9ehmnm28y194zzuc3adqpoeuglp5t44nihw1363lckp3k1r8lyss1kacbpvg2v4uzrbxi56y6kmwn1s16wtjzbwdffyr16mlq5z0kp3r3ajdns3ir3y17jwld2wn596b4tom7qwut1kv0xjgh9w7soxgzjq0m',
                channelComponent: '1gm0d5tdxrcapz1ffchnn0exx0rqauvihury90c7dfz6h3mdkh5saczm6430o32uucrjuyg8rwyot59cld0ys3dvnl6oybfaarngitvz4vcq5919m30qyk9mnr2tos87f34esqitt46yf4m4vh6valzwl5xofthb',
                channelName: 'txaycgylj9hm82w96zpy4y5llbp515f1ziv5ilett3l8iuav1l4rpf93hdi04h0m8lvw1w75u5f7zcbic2xemkhwtpxx8y39wfusx6vdafjv45b1wm61nfnkbhns8qxbxyfd2c2h6xwpofbr0dbi55ysevyphr4m',
                
                flowParty: 'f6xse4hb589kzwnb5lulyabv1am5io7mlzdsiawxvb1e68ijnxjj86kfswp8s2holw5e0393b6wt2qegk0rdvu2k4bp8yt4j91nbyptd0x30ho4lgmi99efyist8a3g3mecn8no65q60oi6jhgaoxqufs8v7r59i',
                flowComponent: 'xoba2e4qa9ekorb4whh3lpbchcowi5gl2v993cwf66cab8oglk0cskzy2n88m3ng6xegj8ca5jxve4h54bo9z1tvlm4vf8e0lgwa1j7acvrrqyvwarfxevvrj2gs0auanzjqacgxbmvgd9jboxpkxogl2nb4r9qf',
                flowInterfaceName: 'nqair7lbs3zea64vd0l00t1u9zl4l89bqdmkadxvawwgbkoi3lacu2x3d45wxg4pu315i5064k46m2ux4s5y8wpizwljpm0qhds7hphc19cxvoq36h986vsxvslj51cc6wrdkw4ysdz0mpyqcgjnrn9wdkclqnwi',
                flowInterfaceNamespace: 'p9it0nyqh033p30ybw3a511kq1grxy30ks5kt9n66twdmo7gimunmdaaqqryvjedonstbw5ytk3bojfqvyhzbg8zr9haode16f7s8tlqohtmj7hhps9zcoq29p8vmvilrpbbngqc9uaylzyl0hmluy2w0b1u155j',
                version: 'f7sbuyf6l20bkwcgj66o',
                parameterGroup: '2ulap9vrte9q2m72xix8kweuqp4sh77nci1db7iihmrqulfn55cegpt6urb5pgy3juqpam9y04tv48v8mif5ql5gi49z6059uydt5my8rl01o89xjqj37i0vnqelyjaadl7pgtpugfsgbslyyze1bzxzk3gwjvvueg1dx5fo3fhx4tjnrg2orewcywp21v105fb1zfa0g5b9tfv45j7c4mt4s25yywrshrphxd9bbs9rtmcpiowyawiyfbmtdo2',
                name: 'ofpl4054m0wxmfm0yxq3fzc3hdwgxo1vtv2sngaa2gsa3yyr8ajjxnw5e545t6behtmrqzsadtnfi7nhukcr2bgmyacmu8c02vka6bwafl40nv8rr1e5u8srvm4qsea51gnrh2pgndkgy8r4d1jdr5klltiqbi1zy0cd3rafkez87ff70jnifyu08g574tkbfikykbkyku30jqgejfgwgle2u1zridwadrsfsqrkmtgrk5twq4isd9bcf4ryydoggvr5ug5qjobm3wob361jdxvjv4qyw2v92hglhku8oo5yta9bbowmceu984afdt1h',
                parameterName: 'wuydthg76ot07636bpepasfsul8eeiyfwch8bw32r04p7eaoopefx4zuo3kt9yaz50nx7b72lwn8hq9wmuiohorsh6ksv1qhfb1m8uq8nnbbvivn3blsckws3dny809nm0tw7vx36qqgmjvqixeu8bviajcw0gt3ehi1mrenjvbgsdu3rsw7rih0c5u47386fp5f5pg5v5xll0atjjl3abjb7v21nlhvfia7rld0r80ccgltpl7pbhlzi2nr8vo96qy1zvs6err3c77pmvniq8d0jh9k3boe7vsxqfec0c056jlf17c0ay11sds9zshr',
                parameterValue: '6tqcxu1yijghvohrvn7g6p9dkd0d5n3ety2gtqxj32v15hurmkjsgu9xfv5e74gvdzf39otsxwld9drbtqiq5yltlvf0huk5v7tdxqdmqdv7e4n8k5o18mtjk5tkycccm5rnp8erdihmo3amuhg4ky3rqhmouk163z2iky86lq2kkcyqrq5dfj70axbcszi92xqmm781ng5k5sczyhv5zxbcavskcfi85uah820jc111qd5hk4x1r53lnn9tunrvu3e9wo0ep87w7qfd8unv9azozcchiv9vs3lhf8ir68fm71pz50toyky2b1lkitijood6tfdjqix393srdfwlqcqj56qlwc3hcjo696r8ncrgyxtahpjt33w3y1id1emcbiollzkl14v0udnhqceia2rkrqv8wkgieupc4lykv2c02curpr7mwavwo6n2rastd56pazb7ebde6d5nxxtdtyq1rk03fmpo9c1pcxypgll9ibli5x10rqp371jo0evhyduy7uwo010afuxl2a91jofxl7nvj6kiofnxt13posvlxgy1sh74dnopkegahhqkgjz3axmilg7yrxiuhr4fub214omkah3jee4v4rzh6rkua0xkankptj4xnhid4jj11uvmm5x0pumq3uszwqqr6xr157dnyv9wnysz74zzc7b3uvmio885zhn76i1rtombf8ccsncgzui9b34zkv2dzy30tssl5bz3j8246j7x872igy4lnvgqs4pa6r15rd5xq77skbvdbbk62d3t24yfe6rhnrg4yfgls7x7p1fbi0qk3l8dn9ut07b8v69dyjx6g0gc9ub2t6ogcf7v2jqe6tj2gs7g79honmzeiedi05nyz6n5rykbwy2a29f5i852l2zxr8o7zbzxjbi0lo9qfzdugi6p31q46vp7t2xobizj6psjuqkd7no5vb68g20esclplf28ryjwg976qhd2bqd7b02q8zcoj6i0zz4hnp9jj07j9m4kfh09h05xah3i',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: '05as52fpaex6bvxcgu1fg2crxtcwg2om7t3c4pnhm3l9topxcb',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: '5yqcbf13x21e76frfru2',
                channelHash: 'grtyxa0kkdrvuys7tfzt6x2utzlm5d8t68pustqt',
                channelParty: 'gs8h17q05qev913nddu4k8w0q8jaude6c61zm3xdzatfg1cuwj6fgjjw9my0x62ryn1v8qxar03thjtbijbwp0sm9795ck4jfxdqj3q4vz04ftt7htvs8os6tgy7uqai4qxu5g7ej31qln0ntmea4pxuelvvj7vb',
                channelComponent: 'gd7aqn41ivbfwi88ft0z29wvwgjizxnmopfcn9n845xjzd5linxq4vegqetg6gxjg3hvd41gom0fciaeqfpr9bpp6skkf2q2fh1p64dawpd5x6g3hmz6oofk4xtugrn1t7evmicrt9gs3cabavdeyqg2n1x3mzbz',
                channelName: 'g9jel6prvhkk5tkej3rpbwn1xn2b9i5kmodkglngp8o3b02lxvig1ndtqchc6dpjifk68o9m3l2qy9s3vne8q1ctrsfcwjaobw6vu3ut4jlzg73sbyhp30z5vo3jaybk6lcq2ikdvuj9t90taqdq1fgvc6rmwc45',
                flowHash: 'pyzx7utxpq70uu959yy4w4lh8mcewn9z8efbooh9',
                flowParty: 'wi0g51s8vms9ogxdry886voszshmpza51328acrahpxfwwgwc8zugidnqx6yycc2nyun492avjvmj9ziwyzcg5hvuxyir4nrmleisxc0p6f40alv8hoaktwe69c8ma7pnp52d9f1uudkzwzg6wvhcrwmroxxvz7y',
                flowComponent: null,
                flowInterfaceName: 'tl7kj7i3xy1f818wdvusjkldpm8niye61psrop0hj7wkwox4casxsh5otya0owmamsbrche34mel2lucdz0t2pgemwwn4iwjhe5cvdz3dfck920702azx5dhla8kmb96le8huvasi3wwhvs3vk0eq98ce52edauq',
                flowInterfaceNamespace: 'nv5iickm7temzz9up56l6gpvgcbsiq31oqt5lu1gxy5aeuu3ykla0ea46o2xrgtrz3w6pli9pbnou7f5e2nnk4qi3qobcsio3esvhze6b209qmrooq5jr0ntuvy0pgq3gpf6ld751twxrecqzrf9c2s3rhkjhjn2',
                version: 'd8k7hyxtly7ysoxgz5jv',
                parameterGroup: 'f3sj0c04lqhjfyg6yuhbc1b9rm5h0wyio4b66fuoosxe98250ov7e2ivnzz5quawot0owont7titgh9t8wwei0j9c7qne0ugziizi32r5o6eurw8k1dch6w2wlfqsyuxflb0z4sose1a0gucdia9gz4hffdwc9r3kv273o2i2w4ju3nnnl50noa9olpo30ccbgl1mm2iw0bj62jzosa815o548sto9plr1bj68llahly1uoz6vygic3edh88tf7',
                name: 'f4s7zjzugoiaj4mwqcuy2ukmecjjaazabx1el626c89bqfvew6ypmxhzoim318hj0cdyc5xospij1hxxtkug8vpe8fpcdbmc30mwavyq9j1y7hbqv40mvjldpq9kvatrq26e95y8g8m4j951c1lk91nno7gi9nmu1i8a63t0ah1ramltyhzkjw2gh5rgqhqx5hd6zg2k1ncbgco3ic3v5hjg63pz9yk7g227zcgszs218ryjdmdjnick7y1efr5k22n96eeuq3bdomjmd09js7op8qeivhe808vcuo6lzl252rqzciln2lr2e78fk7xd',
                parameterName: '59b0e9jusgiwnjeakys7tdrrgs3trurg3dm83hqr1k3y3cfpp71d9vezbxot1yu723lz7wn7k4zcvrla2o80gmf3uzl8rx2w6ap067cnsigh3wqmwoe2c2z59dalz1f2ypy1i4fp59p7g76ezhahun1ff7quuzxrh9xuyt36rdrc50rb73emwdfi0fkzxbb9mynj0kplu7i1pxh1mb2tr6jwr3wryvf5unwjsyeq5trzdo5uy1939xgltygwlcmqw9u4pdft71zlms1l0hpgd1waemor4uehmww8eoyvenprsbtwquzb1mi4o53vcefu',
                parameterValue: 'n3p5utvkyqq9i7yx80tu97fh8xp2fanzarmpfza2kb6txdpa756m5dxz0ez0c04r56ob48a5vaxtbyh0j50drkmdi3kvxlx1fkx2w2cyhbb95x4eeh9jeka5c32xi3d14mlm2v3fbklqbq7g11bq8ivp41t6p73hviarwv0s71axalsctb78ijend5hf56qdiskyhhccrsud4shsyhsw9le4wjoojzyztl12lxg6ayss2ugiicrp7j9uw9fceiyvw21vgb0e60zoiythoeswyfh466l2bnyo4rd0a28ev5r1lwo7gzvja0n36lljrst52o6q5uexfkgb4cr53eapxnbraqjehkhjxps1d7g7h76pk9o0vtazs57vy14kykb95tv7vfvbb0akt8snqejqv1mkrif09oj5u7lj7p54to3z00xqckm5ditfm6a5kcmxyiy5pzb12f26n2lm6vcxe7qg27fbx5sodsw23y94lnvxq5m71q5c5fthpc9t5jwfitu8dqiomojrz9pov4xynr7kgmvvt6vggufvjgbc8ylsddklzf87fmjhi870xgi2mm8l7agejam3rvp65dklhya2qeiuphj9z9expgjfx0wtycuvq515mtzqcwyudxcdgp8g6482mhmempxeruy1qighs4l4q69ckhaksixercj5uh5e219azn62p5vzucfbp0o3eqo5aqol8jypzr5g27pzwp6hofswepgv4pugb40ceyql1p55luj8js2dvdyb85kbj842jvkj26rjybaepivj9y7dl8ig6v3uk81t0cet2dk83kvnsmyfasfz0y83oor0qezq5suin9af60153hby3daygk71z6g45xh5d1ibj8rkd3pmy8hmacx72j6l66yk9bvxy8mqpl5vq1kclylkwd40riuu49j2pby1v8hhfgzwq6xy0l8cwfzfz7lhm1ln1emp4y6brq8rlp508kb8yuywpq4ywlcly2lhcc06ut98osdcllnrs7m2h01b',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'zwv2nrjct0lcge0lmobhtn5csjssuj7zvgaso50058h1whnsqs',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'rcefv9zhd44az7v1utoh',
                channelHash: 'tlz57qif6gdgekhyo8bjfpjbx64ohp0gamdpwqoy',
                channelParty: '4hrd0py4w79krs3y31tn8a8t7s7oo1e89dc701iwcfkp4j9ygoma7cybux6v290jswffditkbryj4mv9sten6lc44bischact6x3cc6xr3u60yn9pm9qgefpvwwzsxn2dl3btyqpgiklb5c659l91sg3gru241iu',
                channelComponent: 'j2lhy0lill3ckcshcrkma6bu5cuhghyfqk9ku9z52fi7xo6h3fakikdq5y3j3c3le2sflfh01kuqgimu1rbmney7v5micr0bl9607agjsgmqzmotgh4pw8w60koqs80yxhwssfuaee6np0zlxgsa297s8yhveiyc',
                channelName: '31lmoh90od7ukblt21vqloco8cppo4ncbhq5nf7ni1aesfb7wp172968tw452e4k5722es2bnaj60q2enlr6lqktn3t9t6nk7hp50bdb05rr4izqtz3m8xgrxrjus6dmx2c3912scl6iozv8ot4k65uhvgg25z5t',
                flowHash: '95rlen7ts92g7vy4jzj70z3vjpu7fsm0gq3dtwig',
                flowParty: 'wbllielkpmirb6ixrtuwid65gqc3qfasvmtdix5bgkq0akau61qplhe0q9plncks3i67fl2a04zw9ftcgc4yz2v1j1axorib6lbntm0u5fks07u8l8qi6uerwzvstbtoiqwz5pelncbr1n64jezkos6x99u2x1jc',
                
                flowInterfaceName: 'mmkml2hfyxidp9ttegkchirzk2tivmnhufg9zjwjnhn8ri7vs5i3ay0q5b4arqbplt2d9rs62b1wphqk8ozkh92iouoevq0reewrgjtnu2bknguqpdv1ayf89mkir8ou7619ap0jpmexhnddj2zdc743by9inu8m',
                flowInterfaceNamespace: 'wvzhrecvij8o4pb7u713cbyjfsq1yxo5mwnuxb8mat7pw72e57lvecgq6otcu95hmqev45uawarjwbe7538qszu5qz4vpydmqjjrr5kkbv98wjf1fiqo5qlqp70xqdv645gax6yl45j4dtcu2roofg457uzvuf6f',
                version: '0cg4154pcf8kxb0zkyxi',
                parameterGroup: '87ycpy1am6yt3cmosfl9pndo4jt19ze61mh4ylubog09japfa6kssqtm6r85f5tgrncj8llnjk916efcwwek9qzhwccqdsmdcllmrh8sauldj6jy689hiop3thsx6yh9lupcooijftqmgfe6biywfaiqumtsewvwidbmgb72xfxjhccq94mrz3uv54myhz3lgum1at0u7en6bnrdnbr5es1k96fkfbjbfc0mfzlx6js4e8dnsxjjqblr0se1q9e',
                name: '9gv34d0hq11thrsp9ojnz58cyprhex4i82e77860h00u79aasy2no9kwy0km1d5dhw5epcq0r4fwyxd3l5dlatcuhsfbsk3ij861w22gbmst6l6ny7f0id7zj7i83pdp5hwx429venln5iltnlnjpiawt4tnt0vonvrsulhhq4l22ptj9n3wqlhv8yf623gb0bb8mxkbblymdp1vzexo7hqiyruja57caonsfkk368hz78fwssr0ttk35mhned5mu4licq9dai72cta9i9tq51x16n9fkxss6axiscpog54i7io3gm8stb13wg5rw5v5',
                parameterName: '7bjwp18ji5ppdeynysmqvjmfoqtctk3g40nycxze6tovo6888g36746k6281b6xr1h48365dn7yovq907umm3g14xksaj2gm3ydo3i03kbm6mwmj3hpuaiczgiag1uu118bqnqj0yzmpd67ttzf3vnnjzq4fvgsv5zxel17w2eh6637adgbd7qgiupkd8bpmsv16vpca6vyfpbo4ca41ugikmzdwe4hj2pum8lr95raw56rvwa2zueset9g3f9dy0hxfhtr5j2p17smzddgfs9bmbbiglgkp8laeveahhankxy2z3dgs038fs7qtk5j4',
                parameterValue: 'bvq0k86vc3dppumwesvyx973v90vq5k831ta4xj90ou2zbpsj0vank41g7vpvdnutiz9pu7bao5ql7eknb5hecqi4mb9ydica9frmb7uzut8p9ezoosn0cl5dsl7lm9ms9amc7hwnkpxjta310qd1htlbjh0g2cgjmcw4zl46u5ghzfmx8m4wgbepu2u43v6i5d035dk7pnhbn2ljov1zk9cc78q75vgbwvoqjj0oi7yqq7myvk6783qgv9ve8p69szno9lumbzrhki7m85jho0u5ino132pe449cbtfx800oljrl7v15gw7eaaf7shhtk2ip3b0xnjr7illbr7otf92al1bgo8f0nwmcaax754zmiaq2wvusamvbe0kswheyubmejto3o82k1rlimi9587p85qo9ojsld3p51negxyem41vn4c8axhogj28s0ab2dybvcc7qgcaa02r4nd8vl77yuey6ptd02976hyeq39gyvsach26z4ylov3j6j4cdwht3qp5qcbkr7zbs9cqonsa1gau5d6qqwnfi53truql846lzqhxxs0ivjn0xp7jueigzjdxep3fiye1md3ag38o4z6ctdzwnjui34wqfzn6vr2vbh8m0hljda1k0qjhizz17d100wektv7ifmi9d3ow7oghepuop7g15shuyi5xsclme926hh7up1e0eqm28ktsbasrgzb7eu6ag466xzku8lxa5d9noyh438z1dh2woysrsx1pmzwuzmpn6638zdjvrq2859mibg2i1n3jbu4xz4vr4doo4koyl7a9zdl7gnbyn5fcohy1qehqcz87r44vyg2yy8b8t9px3rn2zlzzlk4crmrr1r68vjonpsvxczjs5w82hosuf9airilrbot8r90lnjrdh15ngezg1wldtdgyuigh63xfjf6ao4q8d72l9mlvx8twuy0xxu2agivqn9g8pjlm1iwpyr1rqwr0w1xsz4d3f6pdkgwxjsr9tzqqosg9ed2zh79kdu2u',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'nkg44r03nutfavwvn5dtjdngjopiy16aiykwcx8exasrf112cv',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'p6gt3oyyr3av6ym9uj2d',
                channelHash: 'a2aqvm7qtfpyqpez91birnwtes7kdrpciv2vek4o',
                channelParty: '8grgnrplg1uvuawlgxy49ktokftwftcae9573z8p628una8tqo3op8m2j31ydgnltb0a7vw2zrgzmc1h4vjkdciefjadlphpg8xt4sa3uvird4ub623m5zfxqq3km5gyaqiv102l613m8ffubroq4ln1pt2urq0y',
                channelComponent: '42m9w7rivqpbyh3f45b589f92b73eyesp370t1utyk4gssdvdn4vbycijieaucze76077ux5lssebyem46llqw692p63qr5ux4a9y678efvql3t7g2r8u4ngg31kapwl21owtc7z4r8c31x5ev6o6i1lco1md5b1',
                channelName: '3fgae2punwncu3murvzbzu5b7578jvjt4l3wq96421chvfrjw1et7kr19plizaqyrnn0sxpp2obzhhz95e4he7l3p89q8ojew7vekiwjnmqkzcx0gkfvoaaxv6p5kt1lpnh3yzir6mizep2lzrxiqrb26bhu6z4z',
                flowHash: 'y727054fgz5ibqaaozp8mvk96caxprrsjf473l5k',
                flowParty: '6t327y1j0cynaghwglvk9ulxbz5kqwfu5vysm67jt35742t15y8jl6kn1nlfspqxr5vkb8apsy358dtjtwvogr0wdjw0ukeugq5gw6lt1apbu2h3jfbf29o63pijohc3iz3i6altuuf6i97jq2xxsvvlnbum8s1j',
                flowComponent: 'rqlu0obufr4gzwaecryjovwpwgy2igztckg204jh6e4pq3dfso4l91ylo6v4wtjp68qezerdn9l0jqv3yk3bpkwem5t08z4p3jwlj0f87vfj23rva0aezu3zlhg95mq2bv859zw7ctrg2yowvdckr1osjva4dodq',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'yyxoqwll473mn89v9395dm2a7mg1oxg05j6uywxjewd80nzpwgwd213ttsgmms9ypbce5xntk3u4wrngxm6vumcl6jmwvqex6knzuobf817h6cffjxc60ohc5ww79zulevassyysxcz1mk74env667i3jkn3ljy1',
                version: 'o6vtpeo4q2yn4mz94gew',
                parameterGroup: 'f4dokjv7kcfcsuiv5s7inws7w5cb2cru1lymhto2kjko4nqzrswzucnb3o7c7bj71kk4ji2u3et4b7ye5d3u8vob6n1kc2rgpe79oeqkl6099xyfi1zup9b8x0wbtaikhftdh909rl2mmav4l8cjgjiatwta97z13m3chcy8hz6ax5irg4v7oeq61v8i8n6yo2gwht812rb4icydxmne58x82nq297g4s3q1phd7qsyk3tjv6i9gahwrbpwklcb',
                name: 'w31khxezb8kkzyenkfzj46atbn61o2o7zdyw7tg76r1cihsgq341utm6per7515yxa0s7ronlz4v9f6u8uqodtfjjeqk4oomqnimnfcvkvkmnzq40optn72turpigpefz96psxo0svmhawkzdvxd2mqy0aftzqkyqvwu6kai30tko0f61r9irb5xl3g9ua3h9vixi3sb4ay4byykvnkl6d4y1avh8fbwscnzw1ezjgszz63qkqpmfa5kvzhnmg0a1pewvwfwnxz2cvfl9in5z8q441jtm30nrkglh6eh49osqpa2modzg38zourwa6sx',
                parameterName: 'm0292np76fkhaay5j97e90wo0qll6bmqjrt1u5gfdf3yd3unr9qkwe8tv3x36bafigq35ck1uj97a05c5bln8tzogj1yra2b2zk80mzzncz3nichynp60extkck7hrjcszb7fii3aewtbxgldhxjrj2awbr6zsfqn098ruixl2tgqd2sg74mkmiezfdjnq8wyy14d9j8a1aasqvvmdzb6nlkmdcsxlxak4paavhn5crp57s5kcibdelndk0oemaenycz52ut216ler2j5lefi0vfgn33l2m5263x3uwxsns6vgmd4t2anx7dr259hmvz',
                parameterValue: 'dd8mz0kv5b4jccehfydq89kz69ru6lsmm8hvbmniyr1cm47pzps33bcewviinvozg4xeyylm72i9gek4lvbuybit2a6kmji77riqjfh0swct1gadct3ehk8hmykjkpmzartffa00njy2ntlz82dvzps1hljjdhk3q8k172xqeqwoj7tqf2cgkmn5cj84mjpxi56egtl59mx7s138epd1rgpq7k6z1olhu01qmcygrume1ldxuiswindiyhkrkokknjro0djbk28n32u0wxfcscoexwjx95isecnkeqk4brrpcdkdi0s49idgg20jpsawkwj05xvc8o1wbugeogbmkxpwqh1uj5gs42zwz57h0eaxv9f4femvk3x8g3gg4jztorayxkducfdzd8a1ojrocpqk726aufof69v1lwkbl6vfdg0wq7wipj4ywja7xlry0lh1qlahpn4y2k2hen1p2ul54bitswfwylzaalrjkx5ergpyex4t6m5ghzn17oof280a8gcmydpdswz209i3lhpbv66npe5yh3rn9sa8s3zto94z4yfqug0zdgdww51toh3pft73zfnsgdexlvk4pfz9vy9w9cs749kudhpa1otagm5lhh2yd8znavi99dj3y9sw7jc5t3fs09858gduv812by02aoyx2ggi38ev6cl8e9d08ltkcibhtu9q69caxkffo2py86urb87in7r66zri9cf2yk81lbk413ovawburtozgpb0450trj9ibcvj5zp4ggrzgvcls4slttkgq1to54s2aw9qflsc7rablqrqryrzfz6otu7shaok5rpuhdju6mycxsjdc35ajo4dwd0vlavy7do8yfy7bvnxdb5a8ydmmguhi40514gp1a8puf1h0eyh2cpyxe2bj5zazz1epvbshv4nb6vqxviec2nt7ha0h9fb09d61gec5z5k4m4jopxggdifwnc9qd3slsles5c4xi82to25umopshtxctlzg4m94vnhul5vzney',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'slgyondkc16hlnkm6j816qrgehj39f05uxh3qjpfsfzxold9xl',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: '4kkndaiwge1i3pieaswe',
                channelHash: '8jjphquk23vulb61jktjwa3v2wsi41s0d9y3quwm',
                channelParty: 'mo0mgd335g23q9uxlopsfuko95yyfdbkyxu3bxgjkuvftjfhh1wv2esoyod60n7k6n5sm3x8umyfiq45dm5ftyajaj27bonyvqx83g2j33nqsxm8vnqcvyjdxwnt7hy0ms0z1n4kxd830tlc8vuzngvogjyq37ro',
                channelComponent: 'ntwg1euo8g593x8i7rgsdlyr55m052vs5cjb3t7krb7qrif32ektc5zxbikbe14rxpw2swv25umbyd8zccysto44cljl2j74cgovqksodlkq30xg1i4sz89bejt61gl0qe8lbwyb7ytaankzl8ytq7vqwvnvvz9c',
                channelName: 'nknurfzdky5r06gue48gdo4yuyia3b4mpoh2k11yeji1xn0zazmkpdo2arv08xng7n0lw37kqzsc9dvvansxqu03nkdadw6w3cxx90zi22zpxrawjjg63rd29pukhqyibr5j5d4dym98ajz7yi8ib49ttxxxmkix',
                flowHash: '4nenjwb3dctm8ot5kdm4nmmd4goj16edwcycb406',
                flowParty: '8yom1nh3xohpuyl4c07n6eskgdasonino3i8l62d1g71s4ojb52qk54njv89szxnqncalnovq55en4ie8m85sfdqqtznz9hm5ruhncemk5dgtlhoaxgsjuduyupw4hozfplstauy0ib2331fwdac965do0s1fq30',
                flowComponent: '6oixgwpd9kg0znri81rdaxl3my1fl7130k5l82m0wo2copjhlu6z4l8sekx043anle9y14hjlek7yg31915fxake3x5owesi6x9jk20ejrkjt1xjnzw62omgkn8rgpnwl48hrzpgmy2xxh1y9kt1lx55ir29ntyc',
                
                flowInterfaceNamespace: '7qmxwp5zo6gknfwiofm0ew5fy2glbkhh0fhcu6wrqtj6xlwm5tjnxtuh1wp26ku3wtqdtlfzsnw4urppivc64zpwjusq3jlwabwf7t6zjnt5rf70a2q999023md1ocj76ul7m8ndi37m8joucf174guhgl88bu8f',
                version: '64wg1kejsqo4ktv5t3r2',
                parameterGroup: '5ptmfzs6h7acxwpu106t6jpwvldzvbbkjxjbqbj9zseh8ugh6mu44loj9iqcaw18dcfisfh5hcvuzo2rgp56j7sfxckwuikwinhjc7yiugfurl0ilti7axcudlnfge6v86eh72ja5ws2k9alwccneajxqb3o3ibcm7ct0ty47994irbvaxnu7png4q5quza49qk2nw7f1o9mr1wg8o4o5vcqlu1n7tuz65n9frdbhp5bab565lbrsyip3z6z090',
                name: 'ttapviq4sgbr89rmy6ste9wx9a0lrngc2mnhtkd734rhjruu77f7zps1yweqsrvf1gj74dtnfro70493j81fzq5o28umsu5p44g40u09aa93291uao022fw9a2vj8myfjt36zi6z1bhszql5nfv1s0ofapgsgt9ipnb62wxo07ol4w61jqwug00xicx19nzlh55ua8hllxkfgbgv86o2xq08kj1jie0b5u1hc0poksbjott53lrmfp5fynygngpbjaoi10uij481a6h4t4l37813zfrgfanoj64ax4y60qw6olnb337ai23635h2errl',
                parameterName: 'bvm0zmheuk2ae79fgnie55dfre89rr3bgthnkf4e4q9jcq0uy8ayx5vz8klnt93i0gc0ujtwo2ar77i7wtn6eh2l0svd6khx1ed7zoiqbw41chf8mj2j2cf9ty2mv556e4omhco4bwql5k3f6u8ak1b3t4joj1nsth9rtldp6olwq279v6arbspl6akbn87f64mnjw75ruyuoirf5bbq888ruvk4xam3vem57jlxhvh3b6hgchhh9e66n9j39tghzad65qxuhk1u1u4c9jmo9vevr7xlq6mykrvpzydc48po3wurzmjiz97bxuki48i1',
                parameterValue: 'psfmsupf3qp74fdhzud20irqt8kux0sbhlwbrklf2mo04mahxi5vxmfa5ko1qi7h9j1ra1eii6g7xvml03c7g2wjgdxwtfziy4rjjyyet0zgo6tam9fnlhakyelsc3y1ijm87brio9vbg41h3yh4dkeowyuu3icdp817ky9gvunshjcoi4brcacpz6r38vs1w809htzo5bg3ija1ue6vjmw5htk3nah5iepfzr6wenzkzied8tnst7h750m63s7smuqesa7ux10hyrqrjv5wzgnfeb1h2y5en6smfj9kcsj7y38lz8m295bxjknc2zvay211z33hc8iacazud6rh1mdoh5cmm60zxp64b8ohntckngj4i814xjejkin3w66cc58qilcm4zsetkkf5ulgeck00oj2lj7zi0f5n9m3i4ggsgapua0f7pdbnr6u7394i3nrnyokpxc1zk6vzkv0ty2zd8sa0ctt0se6o6h1eu963jq39asre9dtgm8mvobxujz6p2ik6chiv9yh6f6703nizzfaotgtaww0g7fnqs5158hp1k20u9kk2elixxytej7pxbrnwaznguu1zpwfvt6seave79x7960k11fqs6mkq39nrhn59nmas79fnw8rcyjk8e8ig0dokm5vdyebes2ds7lb28dlyf5a1julzkhbf77fem6r7c1sjmgwbu9dph2exqen1m2v6qsp5t7c4a4d7voxvojevr42wisqc7ywayia1q2fsg1g4dpcdeuwzloxhcvxv0f00fie7ui6uupm0tfawdjf65qbq50ipea481hjn525wfvi94bcuc85gzs92vncc5gvjcpalq02rvv06hmi4gqr2jyl1adhb6ooybuj8s33lohybkhucr5v1fcbwm1tisqqbs537jncbzglm4ze0shysqdzxa2qko62n51o0tmccscus1pynjdxczipi8vhny3q38p9mvqgr1hi1mjf7hgsrquuyixs5yj1lqvy600ft188i6on5ytz',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'yrx9u740tuge0h9lo6ax1xhpsy2h6m9ngafl8mgpyty23q6f1w',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'zvd3wxjqlh16nuwp3sxy',
                channelHash: '6y9caotkmk3gu633uf15z8haq99iffncrhd0wx83',
                channelParty: 'kbsxv767vsg07z0yv4k9a0s1640qg741f3b4ikidw8fbg0atbcpjldceazbyyvb7swvtczw2wvqlqckemc7ztyx0czh3lbd3k5trae92cfsxmen9bfutm0y6bs802m8jvt29kr796ncl2t442isuxppqm3bcklpn',
                channelComponent: 'pxm49yyhuhbgrrbq6bi4lter0m6vxjrub78zb2r5v25az14z8afmp1r6dnw2g1qmmco8rseikvze22nut9bdkij69k2e6ztuoya2r6uh76i6ewjzs3hokr6zzxvh0c0ldd0dcji8pclbk56rufx501k3w2bgwi36',
                channelName: '4ya831ryu90lkfxh0zf0xdabht0fca2fep6kqnpyxrdapyxp4x4t26xsgltg70j8j8705ob14u61ms3m96uxwpiq4nys2usovrw9sqrme03ol1o42opcu4npod50hsyhlu7u82qkvznuh6x4rbq1yssdsla8lx89',
                flowHash: 'vnat2x20x4iap50nz2wm66cuphgkgmufvimvqwom',
                flowParty: 'bwral987l4deujwlicpyl9mrp5dhgh4d37qdag5w7y3i0quo3ly8ljwgegpjyj3wpat5zk5cy0bin7xzsqp5vvpjfp2p32w6e19ku50kpljwvbi4mv3is3ypqbfumgs1dab1w167ftuuujytpjqh4tb26du85l2d',
                flowComponent: 'rjtuqq99f81zanaom6epacnj53bsszve4dpcaefo0ai18mjvpnhb16ty52fahi9yphm32q7phtn2u12jajsy077hb26n8ej5l50xkcvhy10sp5urmvxnqs6ab912hjig86m5xer9nupj4whjf43aljnonizkfiue',
                flowInterfaceName: '74xxdbevfxm7p2eoumabpw0mzchgwzn4k6vzoy3nc4qhdxfj8utd6pactau9ivfvtoys57fv1r5fxsb83yswmars8675ew47k3p467vc0acyz9jr2vspgren89deig9fv0apbtvptyuskqeppezmgnlf8vh9adth',
                flowInterfaceNamespace: null,
                version: 'zeiwoo50lqj772u5z8lb',
                parameterGroup: 'ymezn7wwjirmgwu9kmf4evimgkqrur38g8fffyk2vrg5uvcrq679r5whyhuhpknyl2rj0ouvcr8n7umszi4vb61kvyum4ud4kgwutwlk3q4a4mpssv7rn4jj48wsy62rch2ae7fnhqbi3c42pqu88o8ykcfu2kdt2kh1vdyprpti0esf64fh70qetxulldeehqi21lu0r8e6rew4zr7s23d5bmgilf9ix33xlj54lmpuq84kgyej08ydigulf02',
                name: 'ay417dhan73xf1n3b2x4r45vt7lr1tzh7wifq7h415k7a216662n4kbel2mdh5rgx8srflw24jrlarm9vdwaxqsl7l5yka9i8wynfyrby6apakk1l2q8k01r2cmjjweqh0cl5az678c8ipodrn20l30q1ssjplxg20ty8jnxnp0ifb2esevluynlqmh2jeq2ttwtpjzjw8swygdxwinnyegsa3lktjsmv07ivss016mk5arn028ga53ls2sgbpy9gfb2nub7cftgeqb8vsmurks6461c3dssi7pxojc802f550iwn5n910n3jq05bzox',
                parameterName: 'zunb1iogptf9w64jo69huep4uofd8mq3rgkx9dbv6ohqf7zpo4ahyxnpplj0ststzcr1pwic7cds2r4yx9vfax9y7duz5vikzbdr1fru7s8defvvi97b3yhma2n6l4dq6jhi81rq0xkykluhrle70bqu0q5qg44iwqohtf6svjrlumvt54col66td54upnetue30i2vt4qmdtgbty54xavzjs9z64xf2s8f5tweunni26lgkh6mo9s17g4b84qawkf0evk5zeneu94locc41fj0kv8tohsq886ihf73wvbmbgeuegxt6hzhtalv7wcwp',
                parameterValue: 'qjh3wyl76xcq95p0fe6v9jjrbwyatetejxs6pq4mkjk3cdwrsdztdyo5pyy2ud25ay1ravrmtsthvylbspxa4zqki78fo5e92h9z4xt3i3fnj7m1kco2yd47yb1wgqn60a25i1ckj12zs2xd4cw8c24b0kyjyslc9rcxc25i7ype73d8nt7cz1n3v1haugz5p72mck90tskwriatobulv32llb1s2473wsoocv28u1nscj16qhqzlvhmbj2fgw27ifvz5h8lj5evynj5rbmkzi80aqxo92lxbjm6yfgw0pslc693rtzlqxtueomuc12x5g85tixahh1opqmqav2moukmmfavd99rk34m5ze61rs4b8t95ytyf9h5vsiuuo6oefdb4is5mtvisykkg5t6gdcjwtrhdo8e2pwqgml4xmng8w7lsarj9f11k6fh6iw108ppgigt1jvanhidlmbws9icmd6wnaegij02xzarvblaofzs2dps2a3nnobrrewq6jxu3pvuww0mm4b5zik0k3xlecef61dwdaog8zaye3p0f630lp8mtwn8pnaczx04q18e79xf97jd91y2io4ammghjspz8i3332gh8q77w060s9gg75thwj51epnwkjc67gibdvzh8z556ipmr5bibk3sl135lmfxq5r2ey0n2miubb0i1xqg9uj3htb8ee1frtgynh1ebjn4b67r0tdh5etw577lky8efl5gug7dqypelz07typu4oc5mmi98vo4zjfqichokcbmkws3hcpwqrbr9iqjeq0vt7f37inipuyw8dubreo7ubxpnhizqrfsb0e59i6tnzd91xi7xhoabm1yldpz9iz3ujbvav2zb23oyzjhx2k1uquso1usw8ec2wjwov1inl0cv3cqm692wol2cygogfzib6gc49nslwyc3ycp8a97a464n5pbqu3qi5fzseds5s4c9q6wob8lffyu4bs91xs53upt69gbes9nz3vz11y9vidvwi32dz6g',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'wov72irktkeezc775d71w8qf6rtblxqjy7l9x8zu06s6mm4fpk',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'coe5ox3uitktardlr6hs',
                channelHash: '2ywgshxvgyzrfckxxaafpq95ewqm0qwliabbhz5v',
                channelParty: 'otw7onf7lnw8lf2ty78d8reaxcfpy747tvpsq0k3iui1a3pm71jhprct12fdor7yze31v8aty36oazzfuycsfwd5tbx0m0mkcbaozp1b4vpdos99p0ahrjx0l0avtomrdyqv3cg2nveo5u8al8hheaio04r96nye',
                channelComponent: '7jcle5s29jxytrinhb4rc46pqsr25flgmdmvce0viq2j8y2egn6pi5wurl3f47dhrnwueec1wkr9n396obgucqg4jep81wk2nz8ama5cdv7478jd4lls2jbgovtjyw2360yq6swbq0h8undh6121rc5ijoafklib',
                channelName: 'uwd4w768p47srw66rfmq4l4vcys72s3ow20mimnvhmi7qqscnqvn5z28pik0crubxkpe1uh0nx0zcpg9r3tszvh4o7ikzlh3n4ixq7h2yhypkdn6j6tzvjgkw4hlzqcn9h4pscbpc8fs2szur3iwk5bglhj2bljz',
                flowHash: 'a5q2kasfvrwdcvc0sgw7xsnm485udzckk3w2u5e8',
                flowParty: 'yubgmmxpd99j9jqq1slwd9yzwiwm8b55e4uowjfd80jrrgb3pk26i6p6c9vtjgurqxss9pz80ndqiavtpy9yuzo84ag2aaecb57sbnl1axehsq9ict0zb423vivmkbppwh2m1br79v1ak3uwalkea5uoy9xfmnv1',
                flowComponent: 'rekq7880n2i6u6l85yjlkjl8p3aqxbhda08c4007gy1ol48ksqk7k67mg02l9ppsn7n4h7rbjncuto68ny7looslcx9rgqg0f9dcxn8pbr8cfr4to0vdbyv15qp6y3ape5x0ns5mnxywbkwm6adpq8hxj6uyin6p',
                flowInterfaceName: 'd810litqk25efi34b4ww0v368bgvyrv7i9pu90mcl05qkukhkuoqmeaks7rahxqoayj976skwgi3er3tmvy6zepkr25gsua0cogh5l682ulbqvdgbov307ah5160vnr0d0iorfjdyz3dq23hqf5ijcegfbxwlzr1',
                
                version: 'j11c4n2p0sxbpzw8n8m0',
                parameterGroup: 'uchi37vbo09biukqhkdq2ttc151p93pns6o9ts60qhy2ubawv620q0etipwkoeqjt4qh922i27702mq67op3hdqvmtiusdp1f2sem8bajngpi32u9syqjz5em7ut0djog66hgn6jpc6otpjzju4uo50jq18fkgsq7vbtqppnn72yv6nqdjsl6zm2l8rr3ayz296x4al6cyvd37fqvpv7qs2xradbfl47nfsqg7qtw6dws3icw90pxpc7amni39r',
                name: 'bwvkdrsndpuq3gym5rfmqliw6oawo2ed6jil4neysrsfdomc5j3jjma4e3qkyhicdoju295qwio5mb3iz3r3qrcdz8bdovwt4vblmrzvg57ymzpnwn0h297ownbus1eg1c26i5cizqsm6trbn76p31w5l4mrzwawnczgtkh8jvvk6rorl2s0n6vzzf3s5k2rr33fhx17ecptj90c4csq0o2x534pr5c807s3hmuf80np1lpnb6r08no82prixmn0q9swtewx72g3c0k3rp038voh91be2usliqh8n07a36yeqgtt4lyli04qqx0en64r',
                parameterName: '7jmkdpzm8y1bn053wb22ceeklpo6v2he78g0yqdj81copqc3r1pv76eyeejf0j64m2pp535qkrv3jd0mt92je4e98npyhyb5leu9xdg97r1ljhk1b8zijn5ujvadtcgt9094h4vb5kb7t8asvpa159f0py2u6fb64b4npc7h1aebdvsw7ztihq6tybs7vlbn2iykacv32n4f9jyg84tkwqey0us27hz2mc7nnmen9wvg8slm7gi653roolomqar3jpcn8j8rlc06n9v6g7y38jvvftgc3423kns5ypinh0aznpym8lf6wzggmj3c6t70',
                parameterValue: 'tu47g50qjd4keca38m1cdh1d7rt611rughagp81nsgei2bc13e5asic61ni6t40of18j4dg6c9drhjhqfk28xpsgk7egsjgswdma3brcn249y68zel8chvxwftk49k3q6wkgq6b942ofnhi5d4rxgznck6eid5s68wocji6xdmgc4qo78mm9cjgenx223r94ocoxqqqm1h97fs1vzvnph844jhq68wqnyty2w2k384vi1jk7t4qu5k2hlj8wfscdivnvgyx8rottblagyvc5u9n512vrssgl40brx5ijfikhtxxyfg3ktzuou21ta4inoyoxmseau8kcbroyk8u5n1i74rtpc7d8iccfl7jls9406iazmh1zc58eletsjyrsg6rwh4x99chb91c8by7njy2s88jc6pl3aps08ry4io14czh3qjvwsuf098sgpmug98kgxkrkeb4xk3m2rxeaiybx1bp3i6wwtrgpjrrjyunbuqy619k7pu75qx7xwk23ulleyo2jclin2c1dkpph9abzqlhx9494rrehwqzd6wl1idbuciole2u8d4lm4btw6582dfiljy59u7vfkbg2sx8xu0dctmkt0frv9fd5dpi8skqrqfrhjmm80v5spa9s7p38f01r75m7l5n6iaoj2fgvut9eqkjjtxguz7odf2p1gf3xtmblhjlu5c60lv5g1a24f7pzazqw32bmdvx6mrpjmyu073dsx7nzxo7qrzfdr8f8o31fht1d6kzebcbmeop0kk1a6nz8j9e2yfmzsch4aqded0pmraczr230256486ullht8fc7wx61asjoyduazxjfstq7xuopsyk8n1dg7q2z8ylkwnv8uz9mwz4a00hzday80p5nu5hv112mlnucpzsvgzno15uwag25k4tcse9qxhujinwp1zsmx1kmedcnb1tn92euaq2tcj5jy74s77hnocnvtgcystrvt585fn7f7ggeodvhea9in4yiay95axmwjho9rsfchlitl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'byceyclqjjjnu3mrrpdkhqu1qlpprqushdmeplrghrmtbflel1',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'lgdyeh74eu00fr2o3kyq',
                channelHash: 'ibjpz3xxt9s7svh8mqfctzuwm2xox8hk0bk61u99',
                channelParty: 'ndvnpe2xn4fvt2mz1t03xl9r0yfs0rlo7dau69gtkoaz9rdlyj5wbdtlp4i9tr1q079uhzh13ruyi9zr67dewg8crri7vg10ao31p63smxhse0dxqo9bmy7t8ygvz7tvhj08kfev8n2jmk1lv6aqkl3lvop8b6vv',
                channelComponent: 'tlyk4x8esofnh3ztz7roydzewprtsven6h7qm3yrm0xqaeltrldxbl4k8yduoj6llrfamknn8wfquo9w9odu4vz46jsbkto9ungpdcfzpki01xzfs34rarpm6eeeu8qmfsn9huq4g3s0bscnxj3guthgxlsov51b',
                channelName: 'tqmia3u98dsu0ifqvqhnbgsvmb4jhpeqbgtrateue8g6bjztw0oi5uhq0fqkackf9x219cdsimtzm8uk0ahlczci0421o0kjndytd42nujnvetdy64l944p789yow8czcem8fwsjnnmln0rktpf1egmkvem987ua',
                flowHash: 'e6poo761thmjaemejd6uerce7nwvj0toqfb4tgng',
                flowParty: 'gkdmtpo2mji8a2jm44bfaxhgylcmzud6c5sqgfqod3gjlnm0xitjp58tlz3czcavpyzdc5u0npp06xkzhg6ah8mlliicy9iczhbkrtqbd8sqllq4l3vdyu4v5cac9e2kc5ky1expl3tb63yexvhremklukc7oe1e',
                flowComponent: 'wz8rigmj3813rv3zu4vds2g74n4ce436veekdm49t6ecmx89p91b159vui9k35wvop9ul16fbis4krgxyipxsi4dhzpdut4amvaekdk9xbcyfyg6f45o9qf8l9r0aeej3g10lpsovkbytvcljz7xy6wy11t6wfbb',
                flowInterfaceName: 'y9ed8n4fo0vj1q3ysbkzyu9hgl34yxkh3iksyp9jxrqevfsuyl2xz5hy9qw1nm8l1xi499d8idekg7sdf674p0cd7mrdxq2gikkzmjy9h9ga0wzofn14knpo3q4dc0z6jmjnxduzzc2i87yccgizd8g622r8uyab',
                flowInterfaceNamespace: 'yh4niauu6u691s27ziv7452e6k99qnwv7vuf9kzv28ows8xrgbazc5h50xcknaq3uymuolfcc1izaouh9etlpgpn5szvl36z37dqx3q90gek46oj5zh9p3wvykuzv9r1gl04mma8b1lw3m0l0ntc8lglrd9s322h',
                version: null,
                parameterGroup: '4o46zi18h8izqijf9oqqt8lskrlpsytzhy2l0ritr3v6mmmz8gyjfr43vyilgkqe95dbdwdgi7jpckl37a5mvebsof3gu39k4rwk0eo1w3so1n59g0tgc09zwrm3rerj67wzckutp60iunw0p4cdxf34h114l4yvmi4wunk06u8i3jy6fhjtzuu4qudgv2hmokqdfiup0d7vfgl1ndtub9us377qspgmmtrs21brlz1pb3rzcavtuqdb2gydv8s',
                name: '435rkahuvbdot7tr052sfab5m45hxynjm7c4vc5k5tgiqv4r7seczll8xlhvrmgkhzcqy18pth36zrtjr9w00dgdgs41s5he8zebvhnytagzfofgjaojwqwagzufkmi977rerudabv9r6evemzn94qjlp8m59bng749zln8pzqwygk2a9py4s1hcn3zq0oqksjzrrptnpen7zx1ve3ocilzshvkyxrtavqdltqhb5rzjhad5hbofkzpb43nvzvlxjrag7iavy7hl7apc989pznt1euz0yz757xewuznwubvjymq9o6ypf85aw3to6tra',
                parameterName: 'zcmj96tdix31y8p8b710puaacp751m2ebzfp5h1a4bhg5x3wv78uq3cb8xwbelsbnbz63yvle213kx83m6vnr9pnmwanoxgjh47983kgnd18llm5rjhczquu8ieagd7elqcft6zjoqq7lf00291s9l8gzbbe8te5srrur0wtkd5oirylakrs5qix3dmaap9wtucp771t50awe2mt16nl4oz2bj0zoya4dzwmmqts54wu7atyhy2j4ni3cqjjxwyp1eodvmmoc4v99759uy2e7riwn6137dsl5wyzeqxt9xgal0fx11w8wxepcczd5tjj',
                parameterValue: 'hx3p8j9c15t218gb16rrty7opcthlwhaqgr5imxrbv3qbhqkwml9ohe0dng7ze8e58wcsua3hk7opba18xxvc0blgbyb30pha79l0fdl48czuoxxw3reogy9kgtrs3u9scvk4shsh3fmhcgxfvusnofm1d8w9bf837tx1a6isnvuneiyesav08ckzf54pliz9cca2xdxo485117x7swh3xkg0j2a0c5g0ild0xq7svqc2dg2n25xp4y8snu9evbfqupdj5sr3fof86r6ignwfhwl43kc4r8uk47c0q2da6cdds791ifpfboncmd2imju3dar6t1uyvxv8c0g2nczqirli0tnxnnjafyrdcqecl8f3827xvfh2af35o9774x2vd2aly8ti9zxd6dp45j5jps7w8d53i1kbxomndm7z8fjpjri65dtr5zug1i02h66wpqi9wxks8lmwvek7tl7u9lue5djwqk5yo84dflqo88mrsjmjxkwvloprgf6gvsu3pzggosjjhsh02vhefja166xwaaysdqtk2hs5zu3ywmt8t641lb07lt05zi5khf3sp0ex0vnt9kwuevn34h460op4nlh9fnep6993rwbd25jrm3b0tyr01kn3r3ofqjgr8iyv8kjrejlg2gdl7twktbnj43dhh82qdlfk3s6s9uc2fpmxr8ttbps5qgqjsyk3oh0xzsuzgayonw1w75mu7mx5p5k740ah5t5tweaudlpxg6m3u21ed7cfvzgg3wwbtuvs1q02b46c04v4kckwex29e3p3i9m0oof8zdknjic78mocw3ds8q3qvjzk0pp53wyc3w5i8tm5adotdrme3fgw5zxx5eoghp0s0vegytq3pfuzfc6ya946i3s53oa6rsob7lxyzeq981fiq88vngp4tmscht5pganqnn70xm86f5rc2a0yuhmaqdr69goxrlkbqflbbc9o2wsyovv7bk0plp7xwyfjblmr21auu4mhoik4wikpbt5b8ej9vi7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'bfq1tnkm27xedeaerzfh7zgj1a384l33npqs3fmlhdsb3tubm1',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'eap4ons29e4c4mt0jbtu',
                channelHash: '3ouj9e4yhhi9eyqtteesz910d4iqfzasd56e4h3f',
                channelParty: '602qk5fhr2ensd7ezo1co9u8xrxg2c3frsjbk3146ilhxhd4763flri9j18njw6cnhds21zhgp4a85b0ursq3u8176axstnys701orhlv8alm26ye9vh3w37095rbnhpr9sssc3eqyes4rxtb3tlbiq92udduq8v',
                channelComponent: 'p7iletphkttdv8plbdrnzvnba9d7gu9t83l7n7n3gc180sdqhz1iq3b3sl7h446msppwvfe3t12o31lqdb2atygahlbvelhg6lc1no2ewhqaeu03vn2la074ht795t8i6lm05a9vsjjy0ctmkz5nlexw3l5ski9y',
                channelName: 'gizunvol1wdimba85s59jinpk3gwcbky10cohczdcz5awsbhciah8ug63nlleugv5txn5y8avy2iwyjpiskdqqs35jix496y67rxnc0p5d4cf234s9a0263h9gqca5sko1zkuhdrngi50rqw5e07i9lgae4uzhji',
                flowHash: '7kf7x7vudkklgo47t9c35bqs3ex18si0w562y1hh',
                flowParty: 't4muxh4z7i94u0jrvcowi54o2le12sovo76tl0cyg7yrcj7h23ype8iqcz1rnxy5wjmdcxdhyf7a5myaj8kbovbwk2yf9rwpfwq3d7s1eysltttb7hvq4idt6o6j0167mueif1t4dgsrfz36tebj7p5jri05v9jv',
                flowComponent: 'nwxyr6euxzsvpvq1hyktqepr0s8sbrkzff02ap99zre5rkfrzvcnh4lzr6vizsju9akq5f2ij443rpim4uean4lpohi00doqalz0xldun9rj5mmw46ogxj27el3evg9h24pgdty0nnn66jsfyoodfrl2qtv1vek4',
                flowInterfaceName: '459jxybo5dnewni6hevpzrymy7kqq7i38xy132sg3m82pm4lpyzjhtzxcarq5yu47wjnrq4rnsm086jl06czy58hcxqoav7wxpdtwaqcu375031nmg7f9qtb2qunn8xpk0zofdaiw43860jekvpzfs3w3j490v9u',
                flowInterfaceNamespace: '9f1sx9gc3sz0yaeo1cqm9szw4pquox89ca4lcrkzyfq9g3n18jstgde0eiyn5i5rr5odicqe7pb5s28y7hoahiou7lryyjgyhdyyd3pp34c90fscfoq9msrl7mobux2pabbqd65wiyb5lvfreftuay6fwx849bw6',
                
                parameterGroup: 'vcesmwgxzxwc1o3bz7dvi9p60zgxlrnubvnovbt4w3u97y8clt9gm9hhrt3scsgkzfu6aeeaanzh8zg985zz4wsd0rvyt6dr20gd3kv99knntnsrdc9vkkvla4bccy9qrg32pdse87cccw1fpj4sbt5pkcdghtivx838s39akbop28vnruriy265b04hyi5mhpurr16bf1vz8isvvuxi0ij16hhu3uukr7r6js9j0qo9tqbu01zlmxwm53ipwf5',
                name: 'u8blr2zaiec3m302ulqm8s4hz0cjcn8p02vjayrqrmj88ywpcgo5b9uxjt9qdj04g0v46qqn0dxiix7437xl2mn9v4sqr5us4hwdtc6inhv3nbm76065cf7kcf40xrdzzszul486brcagaxqha33ymw27ftc4daqr95wpaf9m6v19i07lqw2bp2vshsptyly5pgwbv4jiv5iz2oadx8srmeg0tnwqn71us7p4v04r9yla5nyeh47eqm46lgg2uk6584py2b9rnu12dy7m9vj4rg1uhnzmycs10t33jkr18vlrmd3ogfv5g3igw2x9p56',
                parameterName: 'nfpd4m49hrfnzifmr6h194qmn595saxjtgfekbdtedetvsimsju5ahq6hwwc25l3fgamb6d22j4l00pg7xk202wrzqgdwj1tw8dyhgpjz5fj89we1jl0rcp5hyhctuoz7deor1504jfrv0ah7mb1iikf3phi89ejeenqec0ocgdpgdup7sf971256bdrnwdp2mmbg6eoln8i696mk3i4l5zzhuv9dbkvdrifws1huqvvap4ivsumvpx7o5hbxzhrwwmhjm7nqgciyv4vb8saz4ysrpmsvnz2sxtj9st1gayfp28jctxinz388iz7txhq',
                parameterValue: 'tx22vbpmarxxavzbf71v1pn15j5iyfupzltper524lrul7vf0gapbg56xo28o6l327hmvdktp9slx2fisen04gp8t6gz7bm6psbcct9zo4r3im39j1nbx2wr6dq198xarlbd9c6a72umokvwnf4hwk7n468rptd6l9q40ihiynhnpar6gldv97kahakzcwjl90kvxr21bg9s3zxx7bxa1ti82r4ubdmhdjrp116b8qpvpfhtw9tn0uk97uzsx0mqmp3wqdvxnezdxh969bpm3errha14rolk6r7bb5u3uu8lm04aolufocqcwus9pbxtg00p7l2iualj143wm6oswv1z8ejzuh4t3madd254ul4vb1cyg9ra0blfju8q7blgxil7dgfi3sujr6xz8uboiupom8yprbghoay73db2kqqeqqc0ibsn81vam18l592rtm1diavsrwm4vzrwnh74s2q9x39g3hk6l2gatd1p90dvkp4m1pf517tr9ui9xskkg0sqn54dcwhhpxnx163ii3ql9sylz70vwjsltc3e3ryfcsvwr5t1izecb640jk5q8ukd7vr32kdz6fbmk1pposh1p1fmi4aemo99qwxjerhhd68mw91t714mgjf9rt8wrh5b26q2r5lzfbh05ztssldxtcd4t6fwevgwr43tm1vvttlpttt5kipykyscd7e75nmuwn0t0eiefz24c2iqk496peaa01azhfhsl4g4ew6a34bkqcerimhph30qe7bgkm1f03uxodpo9tc4ixbol0nha7uoyvld790b9mapcgkzxjz0mbqkx2qto3iop9sigdpfmf9aa7b8lxf7b4te1v1ludgsux86ikshygwdvvvwrur60jbcx24tk77ikqvqf06a8s9o07nejxcvcyisg0jtfjhiq3xzu2h646578mfe8u9yfoc0swtp56o5fkygpxl2761d451fvxasy2rgrpvfaizh6d2kq1imbe8uagocsantxzpzwor4cjs5z3iw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'sj422rtdns1zfl2lpo54leznt8mabvwhxtbwa',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'wv2au6ief23tntxycn91cb1s40qluwwaq54kwdl26706hwnr45',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: '23f6q95qsemc81rlony2',
                channelHash: 'hpn1u0vimmo5nnu04w6rj8t6kxvrv3cq3g1t8520',
                channelParty: '5zqf7h0ci2j13ogrjiad3ed4zx7e2158rgvjlxauzaem7037qm5vcaplb66kjhzqktx1k0pjlac1gl20882dkqxoln3pomuowtk2fnyftzp9v8666uqrpfpp3vrn2dtoy7elh7x6v2n00cruwvf3tp02sfwytr96',
                channelComponent: 'k2f5yufumob7a5k46k5bluvoroktd4np7atbi44xjmuums2m9vxweztrm34rbgeo5frcxsxnhajbx0cinhuua5wdzgxudd054pkgmzzsskc6bgl966ocio7cwqxt1jly8l1u7x7dj1b8cj0n8a8zbi6dwytnbsqo',
                channelName: 'ufv3y2npjlm3go962u2lwfmh7iwt3o8jc4k823k44vdyuo5slc9r71nwd2u2gczootx7rvjc9wvqd9yoqa2wu28u9ok01qh3om7nomgzhit9q6gi36dxjyxkcl1u657beo2dcb74r9ofrvghqt9qf7iobhjdnuzm',
                flowHash: '2w8xcmfacwx5epo12jgsxib1yz4lys8mtpej4pdq',
                flowParty: 'xrdueyj3p1seshl0htoc7hij20ox9dtbvhz0rup9w7z1xetkct7dspb67zv7cvxmucgjga5vjkaj0rfbr4gterfbt7tu8lnvwy9fg06kq6ndg0tz18jzq10oedj6b7v2ai98vbavucdiu6rmfgsufy1b9cjhad8d',
                flowComponent: 'g0bqez1ybm8hxho8k3aff7wbe1cmp0dxpvvxpowypscawwsq654lesiwq1yu6yuneog2zd4g908p7syjjub180s4g8g876n2lqqcf3283gyyh58b44v5nyifguujaig4998lerh56z3yhuntwyel9qooq86t287s',
                flowInterfaceName: '6arjt2n3hj77jc2odoqmudejjme7k23bisu9sw6h93ds4rnfiga55bo046q12jxxv3105309nf4hwwairpcy86jzg9h5gkku5nyq6m4vv128pcd2bmb590xkzhaggzpd8g9yvop0gutngmzud1gojlznekwt8hk8',
                flowInterfaceNamespace: 'wnwhbup4ge756fucc8fxomneimb3pfu0tahim8izbaagcemcp5h6zm2tpwx93nit023rw5463lvizf5lyln7qr16w53gzfvv67em0239mnqivuio9qj4uizjakie0vgyadw67ju7yk7mcjsvfhda2a932y9p8pgj',
                version: 'rg7jueh1ypeilwpy9m1a',
                parameterGroup: '0p169lhxk6lvfh9f18vircv317nf1lb7oiiju5tg1mbr8hzkdxvhupwinskshyr6hxbrfdqfwx0km0q96vzhc1rrxvsgph9avbj0gomlawqotyjsgttbapd2xt283s52kb768txrralzmg94hd83tlgnjpy3vubwkxlbvq72mptxtt3kkaiuzilqx5xnkqxb03yo5ecgy8b722banhlolussuk2lh08h24jd86oeabfu2zdshq413225ekjjk89',
                name: 'ueuabfzwh7uhe40b4f2yk6pzcdcq5hm1efuh1wta9ohyy8w3t37ecfpbs27m57o0ztmcmltyy4ekuvujf090uah5no49d9yckvr12kkrumjfntlhx1hb105zz1sysxz3rwd8ecj1hnwdsbe6u806k0igy9e3y3vl0wenmqwdb2kdmyen13iponvd9n5rb8gqpb8cjhodaflp6dakb26isse7b6ukuxbyoxt8tbtu1nysico5xklbxg7lxc1wjg5xaueti67t4z7et4rhx7n1hn9y8bld4htrmcb9giyb596igss5of99txti5oklolg5',
                parameterName: '15ctdz1rbbdvsluxfqe8x2p69opyh5td32rklm5qpbcmrdf27czb2i7n11pad5tf6lpkgwdga9gn2hggsaaa9ym9t6yup6158sxlcd8dx08oh9igd30elykb63d1r2kep6ojkhb10akbpqeuv5ujipeboynfiny09d8zsbzdrr5wx3h2xoz1q4oi6re6qmlkqlr5rhn5or7d7z9lhsls6musfrwg6mkx984vtl1fet3a4is5oogrpx3cwhgcaq9sczbtzj4g89w3eedpajb0ihlwi2m1zo0qmyvnymhculsx666ktf9utqj00013xhmx',
                parameterValue: 'bf07yl4mxe6kzgnrrr6kix87xgw7oe1hn2yaxj53j6ep4lmgbfj4yl0vmg1q5aipbgebmk87a5vqoqvpb3addpzyr7ch1py9vkyzj5fwve2m1hdg91n8vlrrbb4bl2s9ryeg2foluho2tl3hsfhlwdivn8nq8cexq5rsuwzpf1l9j0j6fgt5uavohj0ok1gyh18hjm399u46y5o1gc8m3yd43af5e8e74rvcb40g3qdgtrcrjtltv5al22dsev2idcy8ljnmwmiluj77uusjjmi25gn8kt1425rg5r8eoyx5n2k51nr82egx2vypsye1sqw464bez3zk5za1qvwapsocszwygfs4av8prk48m39yajgkwellrzx0tarvkbiolu5fygca5c3fu5mu1a4vre9o7i0ft5w0mhtefp3dzp0yt0g9g9lbz1b3n72w47lw6h2lu4onsjanc0aabgd2d91iz0oa870da21pkc3kzj631tu2vq0sv2qnu569czpwsm8qt3gwucfqm4a0xfldtri31q3uen3rw11ew75psnrqdpn5fksl0jvu51g79fhcxlyyq4jp2f7jx83zynoserxfh1x8fgkmtfm4f3ku565le00uqem5q8240iaj32wq0zwpm604lmet6897c9jadq7ymnq02fixzf1d0vijr7xrructi1o2kmxwg4j99gkort500tueppwp4maagsq5vlak8tk23s857bkpf2v9rfqoqsg7vb152kf40pnps2dzgp99exp8s6mp7u7rc3ix8lb61cg7b2zrfff7z77xglgloflqqrl2pypjgm521455jakv2cgwjh9nfp7gfm1c5kcvvk59jjy3oax1ku5chp7r0qap119ynvwbu4hnr7102dpgy0k4wcxd398ci7t1fw2unuk2oi3eqwibe4smeogf5wtxxjtcss95hobnubk7dz3ssjrnvb1d6dzy3bst7h4lrzyai5i1ac5zkqqd64vn500untnwm17b47h4q3j3',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'ax1om0yhz9jbm6v4mni4at0xsz99qse2ej918',
                tenantCode: '1zrus0g37rg4p446bl1huy85n2ewitc0x032ju03gcv8d9b5lj',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: '7aubsknpgtb6ctlitk79',
                channelHash: 'laejpbrqv1mutvw99p50n3d84z92hn2iuxu2ki0h',
                channelParty: 'dm8ck1ssi2kydjykzloxpxyercmuwv443q198jy1to84iglhitjek9hrxvc6nex94s2t5huvs6mxnq5y0ab26yknvb1h0lhplgv50qz78i2u2yn4qjcp9qvjrb1tnxxsutehojhanu2tll2opwjz8vu96q0kl591',
                channelComponent: 'ry730gaj7f14t86k5wc5d0d99gjv032jh4l9lg36a3oltxphzqequ7h3bkm4rjcj2ewn9jnsj9xpfuyz0x2vle78g4uaavee4m8dcwojz85q3j4llgnuii9ico7p7nah15ngyzuni9yjid920po55ky028fr0k9x',
                channelName: 'ucyg9mpdmmw16nh9fufv81r9k9qhic6wy5o30n6tjrqnmibb4g0obut2zgojs1k8ocfrgc7ozapu2jza6rr92qi61ty5mswe2b5ey73lluw1l5dgugq5ykcw0ica3daz9hc2n8icl72gpnfh1fd470eos5qcohnx',
                flowHash: '7ayrkthy2uxgrxy34x5d41qt26yegyndjr7wpmxl',
                flowParty: 'dp4ps7h0zt9gi2z4dednb6rq0isejj3joivv1n1qclh72piibhg2i9ztkik6gg4fu3cqi7jezm2ahnsoha98vfp2l4d4m6bl9sbs85fk4l4du262n62iddhr24ett5sn8wn2gkqe7gnz3yswxt4skdth8we56i7d',
                flowComponent: 'cqss48wss4xyznuqkwm7cbyyzk6lz776zfc9fikbhuflv0xdqfdb4d0anpwhcu6d0crlgvuascw4k2l8lxmu7p7ctgo3t1xzpcku36536hxhhkgfnmcc1p4i1aj9s74ib4mpx7xrbwzpsgmr3knz53nihala0hq5',
                flowInterfaceName: 'jd2jk4hblb5hiqa5skw9sal7uc0i3oqgjgqtmkb4s3b64z68z9o0rkta9m2hljqqwxpaaq02o39yijnt8liiwbg5tapak3n29xwcw9ps8w1a3hrjb95swgbe1k6i82cwmgqwfx8tct9hxo73tovw9d0ffgifrioz',
                flowInterfaceNamespace: '8fumhxydjgcue86pc6u6hwv7qbwqtgmx4kyy62ob9gaz4c2gu9qs00xy9qi162vplm5t2uz0wunep6eju1vocb9r9ov1jwjexlivhjgdxjnfydbtn9rrmwa63dbngv0redv0814jqp2t2lk055s2bblpa91ozygm',
                version: 'rauua8vml9w2y1l12gv6',
                parameterGroup: 'qesjtlv0m36o9jqkyjsdw1rn0934855mkevoavvpkfgnlgkv4m500r1qyk56tlsi2v595gb6qzis6zoplehioe08h0p9723nh0rswncrotdwjcxo8s75ud5eg80js2bd692jk9a8i8sloci793muan1x1ilb3n9nkwnlfu12fnc06jjytdgvxp4oodk6c3yh1kly4qfpc1woqnnccc9bao6aa9rhqh3i717io1pzr1km38nwi2pmqzmtkat08tt',
                name: '0j0e10l18t20l9n5z4jxas1jzmx80p3obamh6erjukganbjy0034j1ni9wz5olfhb2gdolagslsdixlbgajah2bbotpqnn8wv7gzz7xvegixotwp8eaksrci6l6u0hq8s33i583jwp29kdrbti6t6j3i56cogxzacx161qwbjycydtrppe5mtfqufbaywo416ui3h7d4spv1babnbsozcxs34ll4q6tmih8e3pm8a9prb4mmoan6q70vequhqghqmtkxe87efk6bkpb7av8q35tcgxvkpgh7v5c7irz4j4do1b4a0wmluwuoc9d1r4td',
                parameterName: 'h4ul17wdprhj4e1f059h3jjjy4bf3h8gke15cw4mb49bz8q60w6rnwdovy87x4auqh004za8ey97s1zo1fkwn3bb2hrsobqegq9uy5ygxh1tma9mrjueag8edekvwexkcuc5gs128kgnaabjhm5x67kp11ql5go97rf2gnetx0yaudz9zp24b23rmtlv5xixopws57d0y5u9ewwfvwd7camitun5phtyt0z5chal963rzd4yk1xjkf6son5vmil78ywnj7optl6h4sw058ckrpslfw0e3kad57oxif7uk94wvneqbz5zerjrqexc61uq',
                parameterValue: 'fspdnxkm89uhl51jsft9tthddj05ag05duxvbyc73a0urimcpycx45x2xvhk8pgfmlmjw73ihxrm4bdg9i9jemvc50oodakxj5zm02gurohpdk66c1c51utl30sm5bx6mrskhvtg82gkwo6jdw9q97a8vs90zd01tsib22ganjf7fi87kaejuglw6cowe2nvsky2sfu53jq96pgnzca0hfezzsudfwwwvgsozq4rnpdt1s2xffk41yyrb140unqbs4arh74fwnuugsfml1kpfi1lynp48p4npmwt5t668htn1ff5m4be4lhtvoshb9ztb13oh2fp2d8i3m2z0sqmdxmyzgq3b3p816avbgj37mex2y1t2hjcr21l7g8f8z9w1rbf50jtwz7astas0a5apb51xxfxmu3x2abuplqwva4uee7lrw7cu9cxplugrz4gbdxblgxyzlxtiie0n5phgffje6bjsmvlnpz5q65dl0ywzfbkn5nivkustyxun6v3eak9s495it8b8ygz24ux35nwbtlq9wdzmip5t7gk54fstwan9jaw7c5noqnhube9gs1qsgtq09h73pqhqfl6a08rwf6z8y1pwg89wp44zmfcalo39xsv47vhuxcdhk0em37hbfoc7f441ijro92kqprhoellk0w6i8w5ywtcdq7jga4ubk0ppypfw0zr4g87tu7i74pkdbq3gtmkcem9fgc9pa8vc4nnnzbk4s4m4zya0kly3roufxv34r141wfaubvb2viaw9jtqpjpsvocj6zkrk3mh4ceka4ofyekj55gfycvwi4gkxpqk007dvcstpa5gwjtlmkfc60h8azrgjbnkg55zilemthajwpo071bhpzl2p1rkjpntd1jg49hgnyro0nyhfgd8r0u6btogvohvy61lb7wjzr6eezp927gxq457fotslohxcshwvudcte3tj98teels52wsvjdpjnag2ld6fc13n18mn7ac8au4k2ieml73pri69vo7azf',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: '57ducao1hrky6kw9qzh0r6h30q1a0pb2eqsyosj16x22hu5irr',
                systemId: 'umrzsuaewukyo58eht6vexzdvyehpans8lwzi',
                systemName: 'cd1p735qedvjo80f3vk0',
                channelHash: 'hkif5a92cm2bn5yy2w7jg3rv71aper8s3qhb1i22',
                channelParty: 'lffjs8b8j7tayc14hdfc9brm7dgipq5kdblq0q1p10mrgax2cos5sfgjfsk0aae0uiigykj0p6mjbjqv3lbcorhom1hqxf71xddcoupwa4y4woxqd8tqy9o6nos2qy49gfaq0dnbeta94kp3fh76x5fexgnbo90w',
                channelComponent: '9xbgoqkik4gfo95rmxrls6vir7yrv6a652fmhd1y20kgsqq61wh8zfu04y0fjes3d7ohz27oj8rnhitu14l2xccg94oeh2lmr5dudyzg92i279e3p06heohxh4maf3tq637w8ast3ktocn0mg2todfjmio0ar4l0',
                channelName: '6zbm6ttou5ocpxmm2m2vnbcoh898fs85qaqr0t6tlvfu8tb2be1efso4nkacdjl6e93zn9ypxjh8hosxm1m2nv09hgt198pn8kw2ht0etpe00byts389eeggldvlc9x0bzrvx3euevd87tiom08a66438a4c4167',
                flowHash: 'wmhoiu9ty011hwicbg48jd4vljs9xvo78n3ig4yw',
                flowParty: 'mkx1eqi97fwp6md8m4cs78h8x6fqka8vfgjjt7y2rg461n6h1rgmz2c3h0t7pt6ts10shtrz42c3jneqs57xutbm4ob79n4odzahczzukz54l6hgnc1n3v05gii05h9w0x8o0q2atz9cvbf3yatt8cfdgz1s4qwo',
                flowComponent: 'dhtst93i711piurbv0ktuobxr9mqszgqzv79ls7ujmlo784m3921qs4lmayregyzabqgq31x5pfmgwh86lwhi448lw75nfj9bwqnwh83ic8jzfuttxqav9a5iin0iaf9c6uasmdg6deg7g5205leeba3ew8he8iz',
                flowInterfaceName: 'rgizpp4vdrfbgunvkxbq6cys9l4w642pwiaz32wxtikucbekyfriz8alr1gzlu7j6rqe9uudkfiwb765haendxw9yf6qn2ytv06sp8r2kptq6ymy0orh3eud4myw7i0lw176w0jc557synhrvwu9e09jgp23ntx9',
                flowInterfaceNamespace: 'csu78a1xvvynxlr6xmzk6s3kdrp22jbo99gsgxcl8yj5dgue5c0628oqnpwksfj8bd2pfc2evrw7jb7ihjvz2uigoriveakws1shx4pd164gcg1q71l57ylxeiphaovfqu89nub6g3qmf5406uanl8lm5hvbs5sg',
                version: 'fzt60c8ehfjwirkgt6iu',
                parameterGroup: 'luio3lx63z110n7co2fcmn1yon7wqhr6eh2pfvs4p1di5com3dw01ybn8wdosgcfldakmsiit93v303fopqxsu5dtgsju5x4cibath9bylwxt8vvj6beulausyt3ow1jcfjqyc0sndmqzauq504dk77ses2885nbiskn8ukl32fj3lc9tjfgw4la3s4o6kkwoitvwa12i4fq3jwvc2podvbtknibqp6b473k5cldxfvcr2ifpqvzuai2tzj8but',
                name: 'qol9bf848oxcnau6yi2uvo225o897u1s8essyosjelz4pfug628t2v0ssilb1csgpodwmdryt3l1gtt51ws5oc5aytvpb0ckn2cib0s223n7nuf7otew8hbhdp80qv4gpjo05cf8q4vwyosj9wklcmmlymzrn45c5iigvgjol67ylg9oyvt44ypxe2cks1bspv6t5cu6z559507d39bvijpqfvaz8tjzi9v7qiij8iu9pjtqxn9tmz2eflkaq69ktk4xlmm0bw6ioyypszl0nmt2yafwpzkwfm4h8ugz62h3i8gxrya4off8361shbhn',
                parameterName: 'jtofd6jnk2uhnjij4pj64y00bihckpkvez1csaac9pplsp534k3tqr557rcswfekhg0mydf1mha8h1qvpra3qxylp7pml7k71sd9ar79vr1zg4d12a5ew8cab765umy983jhjcy6av06dcwifrzoinhub8n3acxt2vxb3502je7x4w4ux1td3iwwua5xaezo4x2qt1qczlh0zsu8nd38xh3tmem7hholfhbawjgavwafciu56n1oxd0rposu4zygrbrz789wu7w4btlax23mbribztj5h20jgght9rbl8lwokc1p4muvt1is0rfuo72r',
                parameterValue: '3lvqm9sjj9pb1jrizp94eevmku50q6k52njjyp9k9q2jhjwem42l4gapsk0p2ug1ho7eupp8ckhzr3kvop4d133rwuqpkiweu0j7555ndf7n4968911futa93gmdll2fnhc3228jk7tqsoc51yxoqxzrbz3k79kxucwnnkurq5s6oj8tlkk4jdvuq1ls51qd208ailslj0aw1je9r6jmnvr5e0pywubl56jozbufunmpqguece5fe9tzcplfszd0g6fcl99jbg9jdh51lfedrcypik4vnc0catqfk4fofq3xji7jvfb95zjxaj6oyvpamarvpn1fakfjyyt8akdcu58z60om2t837tovelcxcuqao4dcwub11iq257ey4e6cq5jhi0n9xn90nmfpucamkxd52o9f9c7d702u3sc2kikozgbal1vscsphciysxk2uni0u6s73qvwzemx1e9b2qcrqsc986cce6dozc4kzsrktsry72e4qxhijux5qjwjs3xz5uqgpqq8bffag9ni8wdsqllixgp38wp7y3uf3wqyldvy24yg8v1pra3hyc9bd7evjz5qilu6i3sqf4ja5rc6qnims0kmogp6tmu0b2n6psdgki987sky1rquknw0ck7qrlidng9tg7gbyqtbtfm4gww31rdw11doowvw33futzjovawejew6vnayv6ozqn9jri39uxucpp12qoiupd6rnebdvemorvrtiont95d1xjg488tbvzot8bjt3gzjokqwvfropkk4l07scdpklm3zn85e2o5gio9fpxm2n56tv5r0mp6wfuy5r3hkj96vwioexg2btmledasok98z9rhy8ezn98rs5z6rgwgusrism5qq8hpy72zgxwrjsvic32boebh6a8h3mvrmymtknnzvz89hzldwd3syx4vq95d9kkzonomk17nrqhj3btt71bw2i2ucpy2i3t4s9s0mtw1ruy37navxz6vdt2z9tr93zfz4blp6tos7x2y1k9te1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'pxdjtg7vpkhuw221urduwvjl4udk7do3oh7z7kmu3jrh4sgmjp',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'ix9r2i9kn21qvrdegi52',
                channelHash: 'uow2vxa9z1tng9p68ta988yb21e3uqyovni5f6q1c',
                channelParty: 'p5dsnq2mhdqfiiko6caxivymp3cqzusegktsj7fl2v6qm5qys10t1lv4v05bnx0hfo7rmsybe2r3sl12a1u0uabcwf5fri9wb779o2rupge3w44026j70zmwij4de905b0jl9gul6zpgzg2ymnb47rsaj1w5sbtl',
                channelComponent: 'q6trtvb8jd10awl5mobdsh661hsjkjsxxy1m7pivbdwt2it5hilfi92297f7q2ounx8efrkzkqfh7kr0no5cvz9s2eue2i9zrv9z6hptuz53h1a7p3t7jcw7cke6om4k9tqeae01uq8gv9obvdq0depuvgj8az2b',
                channelName: 'j21hkx30wpml3gtk9jafhbo60xsf1u8zurkphswtaagyiq51zk9a65is4jvqjastgjiuzwkcemjbk21wso3gkafczjk6tnyfxti9a8bguu102s8y4mtrrymv2girej5ww67ef24ttb2dq1kcyt1zyda0dx1wwp9k',
                flowHash: '0bzgxrxe0uype3thdgl09kkn4hgio3ynxecg6bpy',
                flowParty: '1hmt9nqe8w7pwld1sll05qg65o2qni5014eu7vlkmvl43v3vsubm569p8yj2q1t8j7ikvbcp8w2g0ggc0z73frl3ktr808otr3vdj5ya5643scchz2874ueucf4ecg061hwxzjugf0i18dql91nfl68lun57gbix',
                flowComponent: 'l3zd5xdf24zuzxphzcy54265rszyooro04p54qc4fxaab2workzcddnvc6a2bbguhzqyw1miy9vlq0u8r5blhgof828nssrv332pv3iylm4rgrv0lcauxt8lt4c8twmff3fcv6k598tgilpf5jql5ncfywuvah10',
                flowInterfaceName: 'ccywo608ydplfiscgykbq1n9u5przqlk4igwk5mzim991qf3nwp034m5theomxd296jo8ydky1ew7g7hizf0301hc8gwgcb7n68eoxeq0yrr527qadv9jqc55fuow8uhftrfin8hv5zrc3x4vwn1n6viwht8ttlo',
                flowInterfaceNamespace: 'c1xxsozw7ctt2heg68xywqnqo88ag7rgll9hwuoa2xk0d96paxooq810lwb6by11v408o3nxiaxh6mphevkccjfa0hgel0mo73ozv4b89lsm2nnq4z0j5wn1nzbajlaga2xzi5lkffchddwfdb6gtq75tqv6u1ed',
                version: '0w8mky5prg36h8g4w0ur',
                parameterGroup: 'a4bedpoevmfwmxsxzue714yv5z82k4lh3ij4eihqv41y1l99hrmcncfbmtqtf8pnt5483eqne3d6037lqv6k184m6aisvapkfo6aa5h5d7t4h630ib4r66pqw2gtw3s1dw8dusfoysdvvdg95o4dzhzs4qanrxlrj8b7w44hxnvc7bslrm4bmw37b4vdr3hkmu8iufzv0psrlyi3pdw0pj7i3oljk458qodod9kovv2gm3rgl0xtqu03uuklozi',
                name: '79zb2d4up59x5ym7ct55qiqt63ue4l02jkjdvnz96p21m9xzlg7jwzgf5q2tf2k4ly8xa6tlmxpf0gw749cvb7b0t2y2ni9va2t973zqw049p7hxgasygm0uqhgpa8lykkrosb5rupg98s83w0l7xzxj8bjct31icycebqtbr539jwsxaz4hxe4mwd7j0p7p21wciu0pg4dlrrfucwembmitt8l2dokgg45zk7v00rcinvzlvn2psxd98nf9nbwmq094tl3h8iksdcpr96020rq8v15ci6m4q6do8gvtt7oyzg5lhn30kuvmxxnbo7fk',
                parameterName: '585z7bfrk4adis40tf356cdvaxkd1twzwo4gzrz3w435j6qrpvbub7wnyu3bahdik1mh6154pwrt12kjdtqfdrhtorf7knrdyvz3wt316pi9anczr9idrl0oj1e13mz1wculb3q6swzw6vk39wkdryv8ez2xx7y6c70z6xom8u6qsvjhfvrrkku6bjahq5pkf35tdy5bd25krr8z6khngcbq3lbzb35jcj6hi7hlp3oseg9ths489v2x446yumheaqj85qyqlwblp0hvtjake546ntoq49mei0kozv3umjbtzfg9f900d2b2gp20afnw',
                parameterValue: 'wctv7bgr6mq9t1qgsltpeib1rx2qm09k9dmik3z6anjtihgdj5eu39kkfvofydx7i22hzuw8ec2x09wc6tpnx5lajt907uw2x0tw2tvoy20rnem6fqp31sisi5bxahtb28ne9251a74mgn6w1wcq80m6jdnmrqvir1yotixnomsmp42d4z9fd8zxr9zao4jecdggn1klhqxbg8il7dhww7iauzsp92o4gkfrmxh63zimavvikh91wfl44cmqcgoormdiiz53lah0wtwoboq9my7gfjzdu92wgkikfr8z2vu1ei2safch0rcmzvr8qyio3mq95d2qlbbmuoq2ga5a8hm3dmk876lposk454wmj6q1eu16gdl8e3umeo4jqr53trijkm9oeohubarsi0kzkbgxnyi1gdv3jrhgbaom9wwma670m0zeo67lz7ka4babderk1foqyzq2ste805dbzszkdgc70mm8a85mgm9a2ro8igzlcgm0jzxjlv7yrfrvqc27s4ne0lbnh3ju8xd39i66jn1g7umi7da98doeje42i32704iyodqlbtp77nyv4csllu9hcshc3prjxu39a7cq7rtpnc6f6j80izu0sxfgw2fp65jc0se4kup5tdiurd0hw6h64egvqblvt1zki48roc9gfeo68gdsjncqgyh9stpfh571rbvofkd3eiz0twwad39nrxtm6kz2tj4k14xqtzncwagcjj5b3conhi0wonj3b32h0lpeds5kquk50u1a81co1cv0our3lkevc9wynlbt19k4ldiyq85mnlt2t7pfoh3eoq0i8s0oqzqzk97nohjcctnb0o0oijb1ry0186fn4yec3b1ztaal5f5lcp4a539p8psp0qe88003y7wi7wj6ydnrzxau34p39qa2fvfoa64zwoc7dtnbypmbt4tsfp8rlm44rfo11x8h6dwzoe5j21movqf4h79qdwmmfnb3n6q379ybxbge4czsqubw7e0wglcai6u4974r',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: '8to8ifvghpdnc7okvomc12w3vrnnqpiu5qda9whkfdp46sx6nq',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'tieego2kcr0vr3a89zm6',
                channelHash: 'y7zrlse6ypjhtgxm4b3djdg7vbmxr5fwxse0pnmw',
                channelParty: 'rutfnmu408g2n50limqtvwg9jewa6u9495afqn8dp2bw4qwy4jo496ijp5hu6wdgh6c074hhzjuzwlr0w4ln71dl0i44kznyx6fejn5paaa2p1l7u4dgxuw5hsdkwg8kiyohoxcof6v8ky08cq7euym784elh227',
                channelComponent: 'bgx486r87u84pchxsdeeaqp3tylrrxbjdsf26yu18wkbsz6s73q0ol88a2lhmaoqm011hrb82j2wjs2garerdd4fyqhwaz0vjk3cqnj43iy95jnfomix4pg1yygse3fvpcxvsv4ip9y6k4c4agpig30jfkzgpm1i',
                channelName: 'y1igtumu3nkswqzwtuca22rx2a1qsbqdkw7re3j1wph6bfz8utbjnoq0zd28q8mtyccyu00e2z13dhh45mmny15vo19xx9g21ls10tpdkq5ojp0aqzs8gcfe1ucf9moy0x1ukq1n8fr22xtw0z1q3xmrkl7f7917',
                flowHash: 'edtwu7ajql5eh3poxo0flc50oftj2gbk2gdpr56xp',
                flowParty: '0h9vmrelxce89fmf1zwd0y1p2ijl7xg9sqaziry61i7ca7u3xrt2fjoujk84okfqd4fqwynuevtfew8hqowdnozv2cnq50vo63axy06kvt4iga750q01s6052foiun2uovj5pg2nokgkpopyin8qe3ftci5mzgse',
                flowComponent: 'k6794m4qr54co1a2je7smcq5hon79ujpxkxo62ftxc26t9ubmzhwgj0rl6d4mtwfaskjhpjcwlfrfv85k2b57zbmapgngdsmk8m2zhl35xb9u402pbur2s19ukuse3pya99jdvz93hmxor8094sdqulpkr43czas',
                flowInterfaceName: 'yxl2jruj7fz0psm735xisygmz8fki5sp8s049qzdfvl1gdpo4lhpv9qgm9s5vcs02q861vssgzhdrnchm5i8ngrvzcj7acapzc3vzt104be5tkh4qdc9cplixxxda2p0uk7faux1su2tl1m3lwnagptkm0fllp5k',
                flowInterfaceNamespace: 'h45vltswpt2k09ydto399iride5li2ps537aqdky8ahoum24s47wjq3y2zsk9p4zi0iy63wio3bvzaz40ulsa3imy5wtl68lh7qyir5dmot95s2r9ckr60gbikzmtzbl8h30yxbr35w6ef6p2871hdx9wg4tj4sy',
                version: 'slsrb1cyvyskwwbaxrro',
                parameterGroup: 'iw17yba7xsp1uofld2d2fs17l6u2he1gcxss6twfsae40ji0aj0rgdoapr0ntc49cz7brfh0kwbvdzl5plam2q5miwxhetee7w7gb778w2be3xvogblq9t7qrplqtmy56gxhchp0wp3k8ny7voh5ee721rkv75z16vcmh0kxisjlk6h6kt500ygclx3k6oh97pwetib34befamc45o67411gajlko8adhibvn53r8uy1y1i90ceph8nqzgn1qom',
                name: '7vmppmay9vcsngxggww8vcfshs60p0slf6356ahyq9dbio5z1ithqtt1kfrgqigk191wax5al0kmw7ddmtovnfhfay5ca9kks20ypqh2otaxlacgm5xmhy0mtf1keorveluj5g51bkk40zsuf6b9arpydhr3hfaajoeuue5vdbt57ibkz6tff6zrapg951wqoaik1abwqrp37u7akw0bq1bhmvlf9smb14kwkelrb0gdj7olg2s0h7zv2iql3u7ck6uxulb5v8y9j6m7836exehiedzyfphpw76zsz3cddo77573wg3gs2xgxa3zi7d4',
                parameterName: 'n9r4ntaxrkmobovirkn1cdzw5aacog7pf26s585l5sh6btqkbysma5cbcmfh8nrdpqkh2bddd2kn6qjn1kx52nxcsxk2u9ub19fmk6pjo8smxegvnf1o020zi5jrazhhoo3ql020p8qqi5fz30fscd4k5lmxkqbsnlze5n4nu7lauroh9bscn14779s39iueu1g25pg1yut7b3wi207k2zyrq1xyfvqbqkhifjfsxxoahstea04k2ro5embebmrurablhh3y58eqzjl2t323yc3s2ozyrwf1t3epammu2nf6lxz4cjroildz0sj1ivl5',
                parameterValue: '41v370vascehc6cuzvo3ehmed2yyaq4wmixouj0mudg7mdsrw09uoh3s2uykgledx1718njzro4udyt09qu76zmmhw10gov9hicqqyvv1pa4o7ufmgrv598mfqjq8gkik3hxmw12m8dwgdxcclm62o026je5obw86b40lx5wg2uvvfcd4hm569opeen3mxfs1bjqo4t0ki8q4ufi1gw97fj0wcuio09bhqadfjbqiy3ybecuizurrcobd6u7bnp5yp4gckpdm03o24p3wbqa0x4vkbsa9ne6cr2as3m4fddynav5jb4rqcj44nrunnelybhurz7sis67nkbczhhlsuhsbr0h802akc8dctiiwvjkv4m2wx2ibw9t7okuc7crds86nmfd2tk8vq9x8vpbl7ouyuf532cf7erim932i0xzbksk6ng8za3ck0r9eb1h5mw285r080u8vvawx1fmzzasljlncqruap92snblchrbdd87bl8s6llk3gelruvdnpjfz5wmhhzzljrrasqcgerky57cnky4q7x0ovcda5uazevz5nc5kcqzcrqhfvj9t3eab9t1mei6wu49462kl5ks7z3tovgebxcs3sjiat8m46ng3kw7al4sbtowa5x4kth2scu43zz2mx3z9j9zdxslyn7tqoe0pp0da1pdbk839err251e6xcehjrdn78szwkgrxwgkfjt7x0cb7p2jj6y60zrtvgvfrrq6cl2o2s9rgdmmr9qwkk71qalfnuifso2wj340zph3v45gfdhk242ikzar7kcoqhvacjk10gyvtcsix12zmibrf7li855xqqg9nuhr9xb54j91trmbjxt5dij9fr87b1kihzn48sznbc7lmjlhsvoqkzblaop6s1gnig95yuge0zzkw5imd70x5cilrft8cnlecwybl7qxndtplpphpq6ik580quck7dibmzx6jv15yt1u6dpb88m95ey4vmtzugcafb8h1rutpeg3fdhbb6l9vs367xh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'gfhgqzct70vjqa8zbszk5c0tar4m01szywu61qjk6dw2lol7gp5',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'q0apyy9gln84533vngy9',
                channelHash: 'j0c2hcucimjueudtj8cpenlz4ymnbmwabebc4s1j',
                channelParty: 'isg9u3xlh34k7iljim6j55tza86ownmd1bwad9yy0ruxzh3y97yve1onq7s0vu0wlgk0a5pr7ovle46eiwtu4eosavspv8ja1d84mae5ula7w5qjdinv3it30ojjwq9sam0davcccrs898uh4fn6i5hco605weq6',
                channelComponent: 'k6tf8riga3r001lcbnkyb1pafacj6nxulszzlp63t7z6ahcsm40h1w2fudzkq23ocanwbz8ucji2adgxuvdol086k4hcgas23ymb8l65kb3vopi3jit41my6ke8pfaf2gnr0pmztcgok5yn7u4o9em99j7gm1olf',
                channelName: '30yj4iw2n3wkzd6i7w1c9gonzeg41nrzu6iliocs36zxmsm9gpsyn3cqq516mlg1crwegxxzzg7pfc9ptuhds4ycqp2grhpikdlxgv7vskfg051t9sw71cerkgyfnzwln77n68i2f7f713ymekqu0qlsmin7bsg9',
                flowHash: '0910vqn0kzwds4uedy3ae07cnx12ziml72kyuhf6',
                flowParty: 'up89s7xgc9p2vhi2vro5aatojla9cwxochwegzpxv75uwp09zv1heyksmsk148liqaw0bxidzzvlueatdowcg83axgtbdasloplu0knx5bp9jx95l7krq63jldr8sg3w20covmiqc498epxn5inuad4e18sj41i8',
                flowComponent: 'pqinl4pfx2l24wdqpxfmbaemfbe6euwh7s4e8uwwp94djv5ov2b0y19xf0akgk3af8ibkdq0n14i6b2rsq0hhyljxjzo4u4y22ww3j4o6ex0w6e3b7r00llubhxv709sns56gi330vjasz0jh3y80j9y940i89ma',
                flowInterfaceName: '1mcrwmr1q8altpkekg1ezf1dzryv6fg4df56z9lcj1fp2p7zo0adxvft2bv9rkta2mkho84bx65papy3r8ak9hkbp4tub42prjzjhek348q0xr48np3sd3slc893irf4yrtmv3jhvz2uitcd7wggr46b942n11fx',
                flowInterfaceNamespace: '34yzkusd8cmbwhtocsw3u04hz3htb05eau9uz984mkj1ycizlvx7q2orq6utrifdrx7gfd687rdsseglvb7w1eqn5qmxepk3c15gdtaefia6elwolpf0plftxwqsnes13pke8ff02sxjwchne8bb7w6sq6pbdifj',
                version: 'qse6m2o2mcdyzjuc0seq',
                parameterGroup: 'el052wtkqnsid8jq8u1m97dd725x947td83oooqsj5pu5n197eibamlgbzxaduzwoujzgcja0qvk6j9n90135cgdilw4gopzcfi3x0rnohsyx15p5rwe3ldn74bwp55fno0n18b3m7ndg5kztneyzl02k8w8al4yj4t95j4hof3ho2w13upp9slx1dvwou1pfdtw7dqesvp3vhw0y3rdp2qa4pnry5uf1vh32r0hr8j7rfdaubwk16tafbphry0',
                name: 'mod3fedohpuwxy2cwj676ftt8h9r4hqi06k31vj4njfsbuvgoebtvx50ovqrhm4cu8r266puobog1keez05axuqvf2o8sgzemls25jboj22hz9uik8clpr84xonfpbtxkjs7lgd74a72uevpp2kghrtoxeiyefusydr1j99qumnn825h9m0dsmk1cgjpj1m1s0h19k7q5rsxrzrpgwxjlmiubqxzn2k4rays4qf8mco7edla5woe2sj66mjkk1i0iurkp2sc8ywbmvwrgazas6e0j87aqe50th7lbo6n6dc04ekxbki9s815uwfv5c75',
                parameterName: 'je3z6jmvmunp8bm7o32fj4w2spalez6fajeyloaozxm6zzdcqk54trfm7wgqkeesm0znzsy93j49o45wru7nv2gq7a1f1ph4keehwrtduvpwlcpfqy2xkiilgusemuyrmzn7e8j8qz2g8p2c2cwrsjg0ku99aj8gfzipa6jt8z5biof6puicjxwdhzz5kyzd1a7jmqi94nwy4ykt11qrhar9kmokz177c8t577ij1lwuyne22njimnp9vhr9qo3y72zdinqkvdcsoemqybugotr6hoa5r05gdvr2j7blgv1ebfge3z26ruav0ckenn8x',
                parameterValue: 'su385z80pkervajv86y6f20mg9bmvwm25kzwaassazc0kmqmvfys1l02cke4xrtgp291uvj4fqac8mewd2zakon8twbkhydkr0zz4ij71qkcksfjvfj4ei611kvgajje4mootnnjsn16bxmxjcvhrrwzqhs37og1umfiiknoj7lau6mdl6k5d7km3ydtzmsvmfgdv8pus3kvlouhgr3oyjwasgdjkm27xlr99nq8e9iod25heflwk9bzgro22wap60ig3y7zfvvbwcaj8atlhvp4cs9u0zq3gs76eklw8xnst54lzb94fycdtc2hb4r1y7m0dxnwpxbc6n21247t1aaiul9ern0prjzplb9hwava4qymbx9y1cc6ujktxzle3wymmsvqi219pgrmmzbbyz2n192p9zmj0vxzsdqlk2chofgbe6l6fyyhs8jo0aa2fcuqpxwuxm632z96a8kx2r85mn9dxp1otz6vu0p3n53wd96varietl8z11ycrtgozur4yx8dzi2o3wch8zfl2is0m2skrn94ufzyemlv84i5q6ey1df3pbecc5llflhkqt2v7g86nl8iblav5vqjt26nbd3z0ib3vrhft5ebi7acp5yrf9ufjue9qa40wj4nlmf5p6dsmjbbcy0j8pw0fz0m2c9k3xq55kzd6mpa8jr54zbtt8gbzuwf1y0dmnmq69qsambmw38dkm81xvkbia61lo71likux9e3t5e07yay068mvv6rpbbacxmb4waa55yefi5wgcl76cmm6rxikqzflqu07pqa014tuy3xs72eda8e2avv1u5vfyqvbk0g5n5hy8csl470brs010vbltuwwx6x78tdmmjp25ock3o63uje91e9kjryb4z3dqhbm9u5w8l4bqc20nkvizadflh9qd82fu8uk7ca2r87aqocw5egnmnh0qialzfiv5798c9vzydggil99214aqca2lsw5xg66nv5m2uxvoc591j1leqw8vi841doef6zr3uy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'gsgb7nts2a8y67o71lmk5lzjwpcsfzw0wj229pf8i14hpvzwfr',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'a632a6j1j0a63m7xgwtsa',
                channelHash: '7pel8oobim5o0z8asd6744glkv1vwlyfr6vqdkwo',
                channelParty: 'oadmywy7kkolsesrcm5ibiohrbxotajyc23tvy0l0x1r532996px2nb7t2oibsk8f1f2j74rtglaha6w5ho3yf2xr8nrr58w46vczgquw1izuhzj6zsb52c6qpp3trbvj3uvfsh5pmtafyvi9ws9p3bqdmqx1llg',
                channelComponent: '9otv4fu6yxak195zem7m4t4693zm3wx4lr7vtxz0br1n0zkzlcf9k15ad6ptxvykqzw71c4n98wqaxy63jwxpmg17yzlsgdtbpd82jzr55uan7bq9qrsu5qwt0kyv0r3wvj113rcyi0hrb0058z8hfu08wi3tl8p',
                channelName: '2w7n81ndcdva14f1a7bd4w4b6d9dqwb6hqj97xpoh0khft5s70qom8o8q2hfvdsadla950al2l5ml9b417tasb9582tcaixe7e8pqp0m2utbgs82ks4ywd4jp0ikctnq5j0x3tbyvwb8ymz1ayec1e5s6pjbrxjt',
                flowHash: '09wepj92tzsg2vr4twx9g87bjd4fiy9rryvh5okq',
                flowParty: 'byi49shdnjipaoaoi9hbbdtumtapflbn1ufs1ma8f5gx2537gi47ncjd4ol1dx0vh2tqoy1loh4ykgb3mc2fnr4c81i75qzkxh9r3i3v0phuk4niltuv5gymj9uy2mrtuwc9utgpw6znuxjg9j11taxh8k8p9ylg',
                flowComponent: '4ezoalrq30q0v02fkw2ecvf5mhznkjqzs4dw3kznlv7xxurx4t0nc2byze92oha6u379x6fv62ppzwm7e4fbknf3b42lltvz0yklh6zu31zoeq5okt3z4y1r6z54z0upibxku3yp4toze6cirwvsg862ubo2pr98',
                flowInterfaceName: 'pjqo2fa6f1l0emdrhsfp1e7ldbkcgp1g7o32oe451844dy2lug2qybtcyrrnugn7b8ai1joxgud079xdzm8xl5btbs8crbt0akepld0nant3vsxsuynqg0qmdtpiukv0cpe80nst1t6agq7458jvbeh52fzr9zw9',
                flowInterfaceNamespace: '01nxvh5zavc0ljadua2a9obftadqbvnt5a2az7up5pewry29nmdia9aeik5s3c2eio6ni5oan40zc09fiu9b74r9qnn2mr08c9hp0dur32q4vbpc6te1qev6kb9p0hbowitlte8ujoir7767ww78n6yl4ke0qxwl',
                version: 'czkot6yj4wvlwrrp9tqi',
                parameterGroup: 'jivrvxnu9uu8855xl2tirmvypnc44hj3qyp54cedq6km7t3i9qw32b1pz4bo1ok4r5uotncxe9f63ul0j6rc0r29f529e3pf2de0fein6ru9uhi9og3sreo09ubx9yvmmswb28wzvzduyh8uff7x37zc18j67ugfio3yejfst6y3v9qxn9i3vj30oqhshkjhzryykus87ckqowckf2y3s8cv739axlw3ke6e9nxd7bsr3tegcnw3h4hteiywurh',
                name: '2srcqontj2ohn25bxneyo27ize2d7q7qlken5bzw390rb3cqevgmxmfzw1zibjkvdrrtlhysts2mlowkchtiqf15j129n1o8ijxxcpztyvtnyqh24r2atu57fo44mnoe03oskb3lkrtcxee8l2ptekdcwl1w83t6j614rs03hucbgkwkmvustgep6qp6udgrhlb17hpjo6g5j71as7oww0x9rdyjud2f2bms3l2ztnjpa9fv35q0ckcj354ar0936yr46k8s44pu8lzlh9xv2yklvwixg4rrn7oazxysnxey11mikupoezb8sv34wimb',
                parameterName: 'yb34smbh1mt3kb5wgj9clw371py4qr0fui1dhg9veaohlk138qk4ud4vave7jfl9bjtd0c2s8rp8snk7e21u222pjf0e1g8d1h9dizg06ey15uvfyjor4jiy7dweycnzhipwe5tnh09bhu7472bab8liz23e8e06jw9tfasz9o5glwfh29qthma0awemd4jwjizlorbad0evajf9yvucntwoeh0sn6fzg0ltw7zy6gtguud32ceirf1z5bmo7rowzyc4pbnr1jiwbni95avqfq38je35ep1dzmy62n0f6m0rv1su4kfnh7fm9kfflhnt',
                parameterValue: 'hoab5swp2wuvm34pvjgtvsba9oohlmhvjso8tjt7rqz3r8arjpkgxvpovjxqoc2lrvnmnilwpx0hpnmskjns1dx6iick8su0spj00sdw7syugtc1958rpjcq1ui6cxwnb8dfie0gc7ytu796sepx2lhib45ykvx4dcmzt5bel8szbz05rkiq2hjbrumpvp47i3xhvmutzqer21lews77d15xb0ovhw9o4xbx0rfhj7so2kq6125egf7sef5nwwzrvkxt7nacqdpv8ed6m3s93sbk41ifsc735hbh39fthlaitt5r91gwhbr4stzdywacps459jwlwym9i2xtsa4atmaemlm1lqcdx4t50zzokl9ojsixdnvx814t20yd9p5u7w7qo9gvkg24pzofglvtfubhfznj1t912yc4addjse53wngpffrmgx3375kjaf1yvdzhwib6qt4ejx8ub17fmz0yx6am6h2tuylhn4s4iq94ojisavsp9qmem1v5qx3hyu8g3jqfs40f92psdx08qgno175dbs2n7tzmwogcdgiij40bsyaefk9h1fi0uurg6p12ht4uoiuk05p8fdwc5vs2bl24hwdz6wf0n8twrolyhhoapsedq4c4tm1rlo28cpxzehlaixvdhsxye2orv59mhy5n0fkjycxaqeifwv3y97v3axv51tu6cjzaj8cgnh4vybum1ngorfqntw2kl3cm1yqb039crz9qz6cuj6so3axj5s3ur19ea0jd8q0gi0k3k0fz06jgzmburv03f712e7l4agd7gnr0o5skdli1e0vz7rtp1r4ii560lh5507xi56cfnbwu66frehk1sf40kb89qpsp2k7vucyyo6kihn1gpp5wfizmdfur853d5dut25olv1qhj3u2ataxvkpk2si4s0ivfcxijtl2lixk0978c40t1q3mleush3712fxsoc807dk8gbuedplu50g36k12x4lww7livm4mk3gbrmawx1hjtt8v2wbbr8ll',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'cqwbo9n83szxvop78sqqw80tny7yeiuoaogi2theexvbsmwrdp',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 't2wu2cak685q4vt4uuep',
                channelHash: '37mzh8ix2njdiz8w12bb99h7g5y3j34ka8icnc6c',
                channelParty: 'gz8krh9nhyya6tchidcnivxbrmd7o79a7ei75uhalqkmmqs9p28acjcf03jdj50ypjmc033wz9dwt4nei8hwzn4y11mh63o59c02jb6kk2sjzpan5kxeguijos6org3mes4a72t29pfzrwnal96cgg0b4caywljh3',
                channelComponent: '71h3marnjtpqfarbkmatzrg6226cs9ujiy6a62x1w1roe7qpihx0mujbkvlitspp07gtjtmhtrg41m2h5v04ae391exj0a0razqgluvnp2t76j933a579smukza0qjcuf5bixuxrikp53qcb6rcwdc9x8els1ei0',
                channelName: 'w45mgn87hw8q6nva2gt8s1fppjz9jg47rnqm4es0ty31ft4mlikz69zy6cvt49a2flpflg14czujf517o6ftojwacl0sgmv9cnct2z1ua394a0dyahtcfw0c2w9zxtf3d0x8jg0zb3ri12e3w6d6dqk5pj5uxm10',
                flowHash: 'xpysla8f6f3ox1f8gjq504qm35n9vpl5lbqx5zqb',
                flowParty: '23jma4xz22ad2p2w8hdk7y3fz0kslfq0n3q3qodb454uajjtawmi470n79ykt22cghob6jt7pgmrs1lefocy3v1res449dlgzzs43h4sl5yyn6r5ouvbn6bndqo23x8kba9zcvt8vkstzhy47q4u2wlrd4xgbvu4',
                flowComponent: '8j952hfyqyomvs7dsfq7le6z5x84uhk6qyd8z4cc6xyjzd20938r0pso1woeh3pvt2g4yswcp15bxl2unbvm4wmm7bqtvhuc92zxqy9iszuvi7tws93xxnneywn77xsmkdb37sg30di2sfapfgcl73u8iov029s8',
                flowInterfaceName: 'af5r3n666z50pq0o5mlmuuq3sq6nwskzz80r8hz7y6gdrqto5x5iu97ppuetdvtfcrxdyz6wwedk15fhk6mydnpksmym5hkx5vifwptq5pb4i3rhk218asg0icoojdlbkgsba04arz2miz3azdro89cygrbg9cp4',
                flowInterfaceNamespace: 'wy6xbaoyufgnv56vmkjq8i60obv8g0j0sludn8pchzemd660x49cmjkducxrg74jirensko9lbcz26wpewp4231nryt4ezwadlqsx68qr6amtox2afdhpdc2fs258hv06h9yej8rlpg968rzsb0qnoec0qg5ci2l',
                version: 'a1igmyihygyo72vt9pg4',
                parameterGroup: 'jou2mvmvtuhyi3jrbowizszhm14ogw2l6bcaxa3d512ven4jepfnbohxwthrf642bdfuu7bj7bl9oyckc4e8v02ms7iuu7j43y8rh1vu5wkpcw7igzey582bmhewj17wbgw25qesyv62q9mw30ud6364siicss3y7ewilfzral2emfcydovnkipfj67d9mhvse78me1ara5x0hsmuzzjjttssokob21d2tib6825bx1f8tznfcys8ygmtrcn5no',
                name: 'n3amb5zie0i9xr8pnp6f3cgsyrwjaq4ag72utwboihgl0zaz8d3lceslkomjv618xoa8o10oekysrvaaycaguuz25fc61g3p7p950qc7z7b7bcwzurlk9wh4li2dsrv8u89lfgd23ey2fspb1cfnc8ki8kblv3auszi6xskc3y9yc8ghj66plhpq2018mqk785id8ay6pj3u949oc9bm6g1rkhtb1q5q31t6b4drn42lud06bfi8limuj4cntotbpqptkpl2ol322scwu65s8hvez15octrrflbfybuzxvw5ihs5zlygvianyaa0bs8u',
                parameterName: 'edex31r8r6ajcumemzqvcstf4linac0xuniggdjazu8f0kq33heagl10z2fu4r1u0x5ffbya3pqv0dh0g1doazdtlz1atau94w1q0s4hx1f216chevf1417tml46v3qavohu91iyguc2x6v947ifcivo4pb960y7dd0qh4jogkae4a0lg434b4zcbme3l36hdojlp7fu5qyc9w5u226bo8y0ob97k2thockfiqerlktvmxprr9vw8glvleskc8kpo51jgqkeojk2nr8ra69x05ab7pxgyixqf2muefi1c7h9r4h2gzqtn1ufysxqldrj',
                parameterValue: 'rb29wxd5ctkovbxvf1zl53v8owgh7y5lj93nzacxf83sqwqnmi6aa4u8wgby1oxkrdj5nhgcyrxafeao85daid2e135en8kslybpj3oj6s3p9ftrldii2co61yf727iasykw6fu3bv2l7xhvk5b8wv1va10nx3wz7nhtu6rve50501z15edjyayas9fhu7nunx6gh97kxi8w8f0hxo3wpdcl180boz56s2ew6x3squqvop1sm7kgv5h1j89dgglgvfslvtn5xgexhjqpy0rhkf3zpkj11zx8hnbv5nqml1ra9b99am0h0yi46hb1jw0vo86x1dh00094b96kdhdjemzbye3gudfzh8e56pgyqb55ydhuw44hk0ckblgc0vwufdx3yu4yb2hbuy2vb8xhdxd06kpraozjge6od81x4rp2y5s6d6r2tcvogt4jtv0tb1yywjw85url3p0szql5uo8fj49f5cjwyn6lxtfun9s3mgx1kgsp6g154zc33rzw76dbr2uabtr94ajyb5c71ght9ceprvgv1pa3pnbyn08g6x402zcgporjgbrmeppeddnzre0zwu49lj7npczz4k8l40icy3wt9ki4rw2j3x849jmrcbcy115cui7e0nulr1j15xpgjcy9kqn4y01by5b0jootsykdumps3vi5jvxtup7fuki9jopravr7g1jtvjqtxv295leg97yomjm0dkf1ptax6zyij242cw5yvqzp70l7gqrn67tkeyti1p8wiectom104mxo8g0qemqi3kfavt10irlcy24w4f5g5r5hff9kuaekfex67pggbnnl5fks854puaqr1unlaply4juno2qqn7uh8eqdydtad3xv6fa6a9lhmr3fk2puvgjetg3g7wl4f0enu4wrnmyzv7ufycsj55rl067yzi0pbwtu0u4uk7a45qdcsb3k998bjam3zf6wplughlrl6rx6lloegcqeidj1qjh1revuvj4howxlt3712bvqf8edav0g',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: '4i3cdjmv7rgiiw31hwkjdd7nv746r22efnp69u0bdkppvyluxb',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'w62p6g4ujzyhu5quof1x',
                channelHash: 'payl7zoq3x3ekzebp9vcrpkwqbx0oez3agh3p3x7',
                channelParty: 'pmtmvk651glzrklhp2ne5rpejcyq5dqna24el6kbrczp2amlnvmnm76iz240xrmnmj6rnwfm2ikd77eysbw0ldgo7btz4jd5umnzbev2uybpregvqqgz918vrw7sisq4s85vd76r2qbg4kk62ax7jypof0h5874y',
                channelComponent: '7tk2k41lzw50tzsag0baqbm4lz0dt4tk4hu0e8ra3w9sgte9mrtz3dgp29vha0vtfrfxryxwoyzzimxse50ez1ok4ipt5ebtq1c764vgq882vbhv6iavfh6swbnr3h4vh68s1tq6lngn1ip4x717zovmmaxpobw2b',
                channelName: 'fd531td851ubl9vlcbn39ezqcf36jdcp8yjgf50fl6r7pvzh0qj5dmx79pd6ieuedq0rvjrpbd1c1ignb1jcmiv3neadxolaxp1yxzzp021l3urwo5v0qenmksr67ymj8zlxgosnhe2bfpfdawv2jix8gx28ygcp',
                flowHash: 'mfx80uxw3ttjdlb07ndi0ixsxbfruqqibv9qxjui',
                flowParty: 'hk1phu6wus6adx2xok8dsex72rqwhtf89uqe7hihwyxyehim9akrbgqha5u53qo322x9m33pcpki4159q5qww0sv775m8b50n6vxa9fv5j8gs2mqd9ztx8bn5q2u37xxrzbfz775gh8mdtsd2akyu29puq3oq318',
                flowComponent: 'j3tuv1hd2qq9gvmn3lfj77q7sz987nakjgpa64ir425fag0mlktj9lm4himmkqitfou0zwy2pizo2mj7zi8i1tpf75lujkmsnvka8a65vufrnjcryz2zzan444zkiwd5o1drx0ztbb4k7q2r4i1pf8kebcyhewqg',
                flowInterfaceName: 'cwtiegdwakk4ag8ofgjf58t5qma811ktg3zf9aplo86b2likb2ta3qlxy0jleqepuwsh8rydz79szcwd0ru0qup9g80w0331r704tlim87zuf9tgxuwekoljzymyli1d20q2pw4hi1gmjb8brnlg15pe2a4ezx08',
                flowInterfaceNamespace: 'ne0f6y59fmnjz4b494y1wb36bmo8qrk73s51z0nro6fwlelwhbdt9dii713r9j7kdp4cifnhnn017pimgi0vfdguuj2dzolrmy4xi47nhn0fhvzbdyganjde9ak2shh0waevysti90vxzii0t0m7k1q21rl1679q',
                version: 'exxdj6cfpx1sbgubj37k',
                parameterGroup: 'u62vnyb5uwolz60xbm96bshiy4dnim3moxclh5v9cd838z1ixhshoqipc1ndff64l6yaixztkzmb2abqsa2q66cbk9ri17w6j6gla3szh9mwzpzg6wn32uilelgcihu9w8g9745lq88721in1434xzhhkel1c6xlb4p4lhldaauoah2q8jqzmbu9zmbr7md8yvv0sl5f5nzxpcg28gqphx450wwd28bhcsfoylabm4142ozkr38uk5il1da34zk',
                name: 'i52n4lyn1u4c71q7lbkwek1b92535k7pi7qbtdmgo83tlqu06e8arg27d4kgqhyy62c3h8krrs0fhhgzqx4euks8g76vjh7arhlgt3bnbk7sd87tmp55oebm2ukfdohnycc8nr8lr49c9v1lzwpu202xmu34g0cc4kfu0y2lfc4yuyo7z0hotcfponijlo1qzn8hty4pjzj33rdw62hbnfqx09wclf9u08c0sr3ehaxxmotku6q6v6zdx7av4i6sxx7ge0idxnf6bab1f3lo24vxfo6szxvytini9977nq47sngnf7eusil2hjwksesn',
                parameterName: 'phnovlicfh5xj1m0a9u1rynuw0msnnjo95xhm9ph3z98dhgo2pmcyx5wd7lfpj8e2fsiwken8xz4i53tqp0f7mrfsioop6qi7euzf305ttu3vuaxgxwtsf2ba2d7oz3pi21b4axbziqemc30uazgutrxugzfpy26vwgmeew1zw7yxqdjze9lj6fj8b5u7idsvf2xiif5ism8vt4nx8jzqktl6xfk19erg9z3zz8lceglrfeg4pt61pgkof3p46hm5vkcqgrdx5eytgwpqafh7mfzd6ghmabx2blhudjzvv8vilb51y96g4omsn8y9ck9',
                parameterValue: 'zotnk9e5itbyd6skfxl6cb40czt9iwar2l478jy3zhg5nince50op2fsmygv9ktil9i1mt63471p9wb4dnvtp87oa6d2l80rhcto8y4pks2naeahwnxo3q9e8tp5fesgp6u6n7ofvhrtdedjjtha3qv6bjoh28ue52lx186vh9x9l0vsks08at5c3u3bus1pvu07emdlxa62gg07jkudjt345o3iirbjkl5qxfixhafdin81oxsmwqywcmd3tjdar55akv008p5vms4zub8s3a70oq5yopidcocnkmvf83ofkx6r66e27yy6izo6vv2ekbgjztsj21jv812hgnk54knhlpte8brk8i7s4ojsrmsr13ie3v2kytwxeai0d3casxhdni8rtvsb5nea2ps4x4unyu57g8rngpbopjr3v07gnepj3aswrc1wuyx7fa3jcv19n27lp0hnidhrqqhq8ymtfl5w8owf92q4etsxyg144b0e0250mlmj9qbjl0l1aifjd4vnyzmryy07rdwrfaivjigz8c8wai3260cw9q69a1hlvj3ks0nezry92tux45ggw58m3ozvmljva4ru2kr28hp7ko0rsia4adciqvudqmo1zdkffe3606ua7fgdifw9p2kfktwqmhqp78byx5urt8jdsmcymne2l1878dvv53ykzyn9khl1ko301yz2awizqxw8p33g9r466q42vi0zdcgzfteskmhyfepptdyju1dkb4w9vaxwzaqs0z0ylua5io4e80wt22hua9twrycxzwdkf6ne65sik1ij1mlyxmdny2hukhexu9jofst65yyotq61g0olezgighxmxh9ew3sp93y9eta1evy5yeq5o1pqyj9vpd50bj2o32nwn56veagvt2dg5vcrx5mgsrhk9qtmdprvqbftbgz6x1dfan49m4vexismtfvsfdb9kyo8xnap32gihyt7ozpu14d763sfbhxn1i3v7srpe6iv2kilr89qaurb7blc26uy',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'fay230nh0k052gw26gmack4qlr7hcvjjyh00we6puxqkop6irt',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: '4xgs9s62m95iq2sqwb5c',
                channelHash: 'k66qukoiogf6gh915i0mm7d1h41x1u4k218mto1g',
                channelParty: 'gy0jsyqnzv8zivc7c3zk11a4ytgkno9so3iprbesk7faw2d9ndn45mmfnnh0lviwnva3pb5p90frw0840e6rmde0xm7dv0u7c208i3rzx0fhrv5ptnuk0xvw0v5nsxv0n2tv8gpdppnub95a5r67mqwwhjfcpltp',
                channelComponent: 'f2nhc1he6ccr490p3dge90xdcvtsjksg8vx6dqx596rer9xgxaa94u4sit4ezgjt7cscfc7rvd3dmko65epbz30554iec3pepgzyb79louwja9ws92qcgh0dvq31pqk17rh4mlinaplggapzr08p6d6u1rsasxi4',
                channelName: 'q3r9clsg4hsc9l6fle788see01h5dpnbbobckgacavig1oi5a6yhrop27dcnbc2z9zhp0epo41ul66h7e56rzxkbrd4veoahjytnte3sllkqrvq0hdbecve6yj9j2cgvwbzab3dzfh6rw0cshltb2nwk3yljtgvmc',
                flowHash: '00rnnqxgczobio1n1f3wz318bu04kt7fn0crpvhe',
                flowParty: '84jea58uqfc7t64tozihw2j2c3gjw4mjb3ktjvcnybibzin251unz16kaj3qlti69cgfp9vlm9915juhyf8760iwrj290llqyrshxxd4u72a71dpuenvkx1i1b4z7ionadxz8hmkcwx4wn5o0t5h7qcjztqiy2g5',
                flowComponent: 'hx73x0aaiiax0i7jf5bbqers41e5rocuuzn0jgz8ryksbusncouis7208c40bv5lbdgq97tdtozieitlbk1mmfamxi96ikwq454rfmosggk8hxb74kxuzqsmxb30t9odpx8bpi2u5gtzbmcoqgdx1pzquh70l8fp',
                flowInterfaceName: 'vcsibxylcwxyng9br7napb35c7uglg3i1zhyh98xpewvt5cpzr177m3gewsf82x3l5faui6nwms4ugxbjrrn402cbipc97qxwwl4yzadwzat0um8g7wom7u4ik3e6qrkj0prc4m9h5axgknyva8no2esvb3iluks',
                flowInterfaceNamespace: 'wkgvg69ux2h3c0yu6mnjlrqgpaokj8j5vdo4z4mlevunzphbodatocm7dmsrb7cock7a1hkqbehu8tve7la7ui4ptg6gk59ccb5o3bzf5dmxtxex5w5hfm0nwx558xyc2mmo7z6cenb7a0v2dte845k0m844ohhy',
                version: 'xe1iax61mjdehv3g5egb',
                parameterGroup: '2sz0a32egs7v0x33nj2pnnk88yaincc3utcm4ryosplnqilooa0aryzu1dd1zypf082u2m5djpzu1l34t5pdf6flowrkh3q4d77o9yikmxzyabcdlnecdihm5xwluq2qw3hfl2b1a30st9vhib74ztpovslzu5hmzurvnt8n8b5tttn09o5d6ntz78bpt5i8e31vtv4dop5oewrvykvzw25aha0m9n86saziwxa5gtdwa63bcz2tj1r585dhh13',
                name: 'jgk9g3028m8b8lknb321t630jniprnn22ci6084gjt1w4yyhaqwa62az64lcmaqryasx5mhhfa9p3yqsm9whnmlbsi5pkqghm83da8krz9fccxtbzraadqno292wphkgwrxc0dhj0yxbcj8lp6nmfwczieuyxei0anrbxbcob29tuggs6z67mta7ex2jxjd0u2ciktafb0egvn98tfmdgb8edbvsau2zzevli3e6grtubzgh0fkrn07zbol9n8rr4hzavb8tsjir5tryuf90tmn5pt6r9d6nolpxf27gm2mqokxu66dxspn0o84s0gwv',
                parameterName: 'oaytwx1kp962da2hrx3jjpv789xir21m9ykjcydumknnibq2hplagng6gaoqjvdql3eec5n0hsnw9x14lk3u473pualiksk395nhx6erbj1xwlmhgqr84d8i3ckdo3o3xc4vm1rgz4q6cr9fi61u0371ne6nlu5iq8q1xughw6ml3a0g3wfrvfcb7ldlev2n42p5wmpod5bi2xmhfyduqqqxi6epua0wf40uz85qitofad710j1gtljcf4bcd8vkk4ac6ksy5m3iynma9w809ci4mie7lux2xy18v9601gsa9com7gyrlzxrewb66l7i',
                parameterValue: 'jfm12a7uqb4edr2towootmj6ev7i72fkgxoxhgrrgvf623z1x0zgkfrvcsnp8pagukbs7ettgl7ngswia9tkzrmpslsv6ld6kobmuubfsrbdv1nmzixkakguknsmf1g7jrwolro8mnbh1ievzr63bxmd37ooig8nyphrohg98mzsu6q4s4ojj9se4otfr3hz203iqkw06exde633uxx05o8e4ct6uto0ory28o86er9lcdhi57zgn98yhfgrq65zlihzwb4lvl9gevhrrytfqtwpvsq80z169tyi4eikqg3tsid4lcas4pmcru0mgwiriw89th3sduq9qca7sdfiagyd6lb4fng1zpndf9eheupx9a8tshlnxbghn6oqsdul5f7tl950x4r28nyp4wqhhncp0sf32prj2dczw6bpz3raypuzeyf9gacd08z70zwtfkdfty83xc46z84axk9jaut2m6dsqujh45ffgj0590vlzsow54vr54jixe2atmncirkrb50vxv2vqqhvnuoqn5ynonqz50uy9g6ortaggavrxv24qtce7bohhx05xkq01hdzyv8qg1g20fqa884ojdii2pe44bgw6mubevro9m8ylxpqn8w5bzgtdzxcppea6qjk9vim59s361och3rh3oafd7ycuj5g70arzy208zn2oktx42xnxwko33mcuuo8qkythe41o4r33kidnwq3slwkfi5l4bra3ppvcutz92pfgqagrelwbhskxun7r2rh6gmmwst28gz28s7h5dza0d0dm2kw2dbam1swqrqmqzhzsm4k9h7z6dv13bbfbipy344kh4cgyymc0o380w6cn8adzyj94x3q6qs5yk3t1ph11nk8dx246a6zl8guqqulosdqo4zhem3uxabxoy3uhusf8beui4daepmh2woxegznbs9scha5orpyoj8nxe31fnjuvsfiq6s90ehv4v6b80avwj6tfleeztsgqft3xmjtg0v1blis72jc1k9pb17i',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'toxaa672dk8ctve1np9gk5rswnsnhgdykydfsimk1i93wna58u',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'p15n35dvh59ziospapie',
                channelHash: 'k8ovi8uas6db2u6kyd2v84kcvju0l6qpndivw4go',
                channelParty: 'sw2djpaaclnai0c9yu76xrbeazn6nvkd0qeb8fmoaj2rk6qkwjbye6pm4rxa3wz6dc2kjiafnly8fjvs6te7hwe51l3xgpeu63vxgvg4lz0fwhcq3q3kbdd5q6on9xksuafonkyslldt8iqpqaix39sds4ggb1p7',
                channelComponent: 'an3mhpg6s8dzytgvqctnfs915k00w4wxqj1i32nlidyl2lo7yqeowtuw5mgebfvoxnmkdn7luu8gzet2ud8zedsasy53o32slb0jnt6yymfzuzkknnbshd39lx384zw7hcqs5z3hi09qraod08nja745fvqnef2r',
                channelName: '1lpe9h4nann5k2d9vf7fn2akp3zoe84jbthvbzwlsvib9d79uyxva59n7zs6d4e52f65dr0bxd48qlpxkyjq1ajdc5mlu6kgool93lifuhvd04isj9ban5yix4vbezp3tx8xezbgti50hseawpoom6uvh3otw65r',
                flowHash: 'hneh1vofdw4i7fgjm6pq8b55u6i0xgmv7bbhk31u',
                flowParty: 'iv7lr2dlgw9jrhhvro0d166hypoamwrxxw1gp3bgmy3wy36mveb5bvercz1t72k21qh090h05e64zvvuls33a49ncj06r96q6gs4hnja4xibo2a0kuiyzd3bb2wj73039jpnh2ft5yv4p52zzdkmzjtk53oara0hc',
                flowComponent: 'q5iyc9v88w7fb4bvl8kuge8bvzdue3eai3lilgxuyfsi0qfzuf2w78ncrbkso9wp4251yub8494vex6yrwpomz1jl3ieudf308y4cesstauvg5i8airn7w0j4ypcd70rljedu7c4lvtdg3p1wfegemuf2izq2d9q',
                flowInterfaceName: 'oazyhg3trwhnkksmvr7rxjkohd0jbfy43vprn88skbtq5vu8ucg2eh4rimx5v6hn69jp666qaed5uy27wyl62etn6en3f0hsj0y779nyavkusl4bnw4vf5qr0eab9zz91tv2redatwmgo881l7uh8p9nheyo820e',
                flowInterfaceNamespace: 'erg9ub9xkaia1ow673aicskyud02wockg0dgvaovjyult4mbqwclsr7wy0g4orjg7s2w4kv7lcrtfny0whtflyhnmza7du6b61a3xkvowozfi9865laph6bscej4j1kk3dj2hm9az1ka569ap9h424rqg42wwiw0',
                version: '24h79r6qzekxmm1643py',
                parameterGroup: 'ue7eafp45u49qb2fj43102s0oabl9n99thltnnanhva6lqyhoqo0hn8kp6sdjoqp28wnanp01vg096tohfk53yyr5eqxrulqul6gk6ks3zk7byedfjpgod05dt9zbs6zwl56r2m312ftiwalfufyr8flgwzprczffbgiuyhabm1uux2h79tc21hae1pxdnc1ho959p05yms86y5afrgjdxkphcvmthkg6re937xhyax1vo6n5stf6me6bx1odb7',
                name: 'mqrw7dw0a7fe0wn9xbrr7bzd7rp6ne6clapa4n35rjt26jeg502eh5kl03tavuaod9tr55wb6k63xjvpfu36r4zeongl4vwx36t8n7j50xjsdg2lp7j1zk4avajrg1jowgq69ervwtnt83b9vqulloy767w5gnrtzrk6kqztvgjgcck3n8do1923tdn6iim40u89bxrvssndyrnub412kswqttu8hsplg402futu0y4b0y0xkfxuba3gum19iuofqpvj3ed3jq4dazdxn497vnxg3ojhfryh2xze76lk66lmbu1zsxp7wp9xo1plmk2s',
                parameterName: 'bphymu5xxi0uqep2v2xwaq6cpmiagdf93sfbi3jhaevaxhzfcb7dzdvqr2yptq226uygsmjjhddb9wfvmdjabyo56arqg88z2wxb61chh4wo4qc91avbt5er0n179r4p2qrxu7rr3dyrj27xecilkoen7zst5ukj825tqpuvf28yi1va6qgx5o6aaz0mpkuwl32ese578fjubefn0s4ibpdfzljl3vgt661zw4eyyhgtgn81u8op78y0nrbyqrhvv2utzbgyrj7zhenjllxv17ghi1476w5yksmk6bxeortce99vhqg1hbob33n70qj3',
                parameterValue: 'pa9doq1nelp6hnch2zp6ub9wtf9f5i23ig22uorck2rg1h9mhkhia3kh9haklu2fath99wjs4tshefvhhcbi1l3a9ufzafj3m8t60vyysan41znivnjvh151xpqvdxmb7l1xjqkj5pzqdo8guzjmj3ldadtotqbv42r7xdik3rplyjag0kwms9bcj40hop1snf0rycae3gnhui1te36xv159mpcud0eni5fx4n8c5r7yxmglpg99uuie73m3d2jys071gqudad1n0cx9z12f0cinj4nbjq54ni5gxpecehgj202wa3sxsyywh9zbo45u7kds7nv7u3iy5ko7ooeh1x3e396scl4qvj3sop8xxc4do0p8fuaea2sqhk8356xyssxb138dpzuqd212ro64jfou16u9tbm6d0r6dyxgkrpn8ltytuylov8oegkmk6vvfk0dpzb710mcb4ca7jy3mkjr1gaztu4o9vqxumv23ivgu1a80es4fxi6ddcjdnnvh5rdu1m14ymjsv2fbfyzyu0c10ei74ksjpgf6f8nq0c0d445m4ps4429c82dcdup7wfztvrxoayowq2ureu9aqfl0nm0kne07o0q30biwpxswf8h0tqt239t7hjcsh3q4fn84e9mlqqvaleuaxdggrk8w3r6pgtws52c4e906rw828yint8vukg0qzahepcnrg49zrp6da46utn6l5n4xbkgvdns1bo21rq11ekqckjlbca5b1vqlhvxgp5ojn1gb2bypf9blcaa6ayd77s6drm4ccqfzv5l6bm0yco45o4rtfpse883zsmkzo28ouaf3ok2p6qo60nknb81ymn8ocl3cpirjk56xo7l1fjhsxpvvolep4be8im7lof0wjgqkomyph01g77uydr5rg4frok59539ngdbfqzbj57u92kej2jv42utdx5ij2619vqqnks5zjyfqovg80sfvmlvvuzn5tp1howcfj5yjczkwqw254sk1467da30mgxqwuec',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: '65dk9iajgbqc1njzcxto563yf38sprmcv5q59omunsndxidj79',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'ovjyzm2nit603u2s6r7u',
                channelHash: 'igp3jm2kh135sxn71we43w48cezwyzrg5uhnwclg',
                channelParty: 'owfxh72cumbv4ewf5hglism9m6tevaw69sdcht2cyar5le5tytdoquuj6gbryqiowx7ay1ln3y3usa2o2kv9dkbm9ldqnxzro9njxu6fcwuh2cxpanzjmfm7qm3bckrtl709j1lui8zpbbc4gqahzg7yqxyysa10',
                channelComponent: 'uxo9sl6xf85wrtuf6lpdc33mgwl301ehmw27rdm5hg0ikpd5c2pgbcwt9bb6hz1z0aesod2ibw0yn8qa4id24z4v3opj033g17vgd2atdgvpj9vw323hi3rqjc98861u6l5j8jq8is8ynhpqeruo1ypv1dl87who',
                channelName: 'i8mj8avjf8unliox9nb1gn26z38o8ip3n4omzpwvl2ri5tvipvxhtctmwua7fafqodzf8djjpio4mm62pzi2awj5p7bluz7t15l6yd3cjamrjljjct9bamsbccqdv9w7pzrhh7k390bals3uaydgxxw7ppi6t79w',
                flowHash: 'xp95q4kp26i02vhz4ud08d91yzginyien7ztvygg',
                flowParty: 'bzvpnpqstgqgp4n8x24w7cbg5ub174xuga3v8rdpjnlkv6cbb2wbdbhost9775cyng0188oxqiyy5cwn9hxccrs0fzbgivefhdp22nxiyazwv0v4kg7h2zzfqnn0hsdti60ob9xnwvxaq3qtlhv25xoxkjwq62ix',
                flowComponent: '6whc72hbuu53wide23h35yw8aozwtq6sjbrrze4ad6xxdu19s60deb19wfceeldsdw5ibtshlwhvfo1ecg9ev3jfnkz6baog11w0i1uxj8qhztoiq3a1xo2ddi2k4t0k0lddsstclow9ah2kqcqxccxdaauyvnmhg',
                flowInterfaceName: '7gyqu58sfdpb0jrn1wg17jfv8fl0lhzxlj18pn1k594gxjzu1u61x3kwfgvwqcz31c7cz7mpei6urn095y2nk8r3nt5nex1ocyl8944oa3qydyxhrxud5t74kc4whnikrksg8vm7wnp3jjvnemgi9tr0azc256x4',
                flowInterfaceNamespace: '902h096xmyko6k9zgu7oqamm6gwvwyesctxkmvrxyl6q5kj4rbjk27dydulr3zzy6w2cn5xcfqdorlaa1y6l0uifguuatatp22wbaos4rgicbe3r9xajyul35hab6vmd4knoobbs7ec8nla392nefghg8dcvleup',
                version: 'hp99ihblszdulcnncas7',
                parameterGroup: 'btx5oz9clrqx8og5hzh42inip8l2o9z8ccjo6v5mwjvgutwfzp1hhd8islmkkshh7oqo1vumyh4c8m92hfeq9ni2poq6vo7e364xcqbtkl3w5hkhd30zhqixq1bcg9ofv5vyurvn18xlcyfr9fpdqkqxjh926qocpw7yukdmt8tu1c3otqfj7bbdzql9cuggfitoc2qwkm8ztal4zgpn2uottaqtdbn955zoqv66dkpc5hso7giz3iw9b027mor',
                name: '6fqwpyailrdwnjvfdinksa5dtspbrj1gu1i0ycrv22n3olnbwvhf4olh9xkh0og7g846bvj0rsa0um2y5d5l53gp7fqw3ox3q8y7ps3b0lgu1uccbp135dx9fbmooymfp0m123pz9bp2udx3ov7lffndg8hss7oangurqyuhoht4lsdoijt81n2lwsonpxp4jnr0549ps5earpkof73bulrj9c5xyg2jd2x9sxzhf9c3ew8ggsd0jbrsq4jdiok2roer4ioevwby6v4tcxzkh8otim9ailedz8h4nvzhj5b6g478sjp8iuo019lohhuw',
                parameterName: 'wgicyvu27uuipxb2mmibxerxiiw28h14x1him1ggzf1z4krxmd30bs8em2b17gamvsr2eciibikd0m1brkr4dki31p7kfnnximerhvtfazivboy3k178gl4v95zqxihgzispcapnr0itwdy89h9ul26ggmykgumbi3q9htmkm5tzrqlznuad8ffgqcexmr32tn1riof7w7xqyec3mnzgsvtbcd70htq9orm69zl6zk0354vhkwa2zk1zn02gsq2ei279mkr4fk59rkxnhy9hvzcxh71kbg7ad8w6u0amroxm92mbrkon0xw8g6efc4hm',
                parameterValue: 'efwf8e85qffbgf5bznsxsd019gsjhxiwf9z54gzhisgoma7f1vtxc3dorrk8586nxf9znu03bnaux9xlo4y983lkdhgxspuelx6wa4wst3kccz9bkuw1s2cjzt8coai3713oobn6044tm4606xrcw1gxbcykedwuc39xfrflhlij2268ckx3p5uzhyr07yot5q268a1t194ycuhmmm6b0ppirdeebxys7oric61cf0mpeirljbl0o13lwy2tyw5yzpes77q6held305ub038934u0fzz006g0fdfmowvzr318f2n7vlzj70nfrzvzqiwjmjiks79jrtf7hgcgz7abfxdicx1y8b6rgedsyfhs70g1g08q5x2ljckya9fdbaq7qdrwcc661miy1jbkucz1y21gr2wc95tkydkwi8f766e48d58zu9hkyu62lj9ua5kkri8rmmwobnynetw9vhkgxr4eo99usn0mpva0idb8pet26uaglivh9020au4gupwtq2onckloxnfdxwsap8dl0y0o14xewwabm7ukwpchglajmanhizpwoyq3jz9s0rkajco1f1q6ph9q49xycsxijpsllel4bg2bxxbvcz07ptooc7fce51aj6gor8giqmyzbl21zh1z6sq7he4o738p465q37vkggcxfgujz1f749sg3gd5cs9mk15wax2k3bz0kuwyzfvhpk499zhelh3ic5g87j1lts15ofccuq33x7i7n685fxjpmhe4jn3bk9qp8z846oasiw330i24kc8lqw4c3sbbyz20atbv2nwy20zcgz31fft18oc5ikfej3j4dkmgpi7u9clkdunwucr3u6dzm1lp17xo5zplydwplnaiha5opa5hvmqwstr5gk45hmzj4maj7gzxyxbjchdecw6n44j2b6wip2kqd3948wzpo64qoxe5hpuocr5giqo1ixhj77l3qrxpj65ijkq8uv99qg0cogo91mxu8a7haz1j7f4jsxol5a6o5hpsh2',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'qoclhvzqxdshtrlhgho3s1y9igxistkirtx0x17hm94fu5ip98',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'yekfn89gfxkbw1ubdwu5',
                channelHash: 'aw97cmltyc42bjntgaco6ky9f68qzvb7pr2boguz',
                channelParty: 'd6kr459ee8rwh0pul0k9ek20eqk00oio44upklahjz3ammoec3poahx3857oyr62sa03b4wsuadn33f91yqrhq9uu8kl2w0dsdkkptt9m9nwfoighfqyt4dhrj0slpqsbpov2aqa9y9es8ut9i4vw4371arxadkf',
                channelComponent: 'q053w1m5o5sym8bb1sjdl6ch8228olq4vqy8f0nf1mryledk4aztwnxza4hhnv9ictoopd6zh1ba4exm15uu4ichwqan8l6iwfgxlazig5gms1nd288ezslmjztisaw4d3wur0g0vgh06lxxuilm6010suumfryh',
                channelName: '32cfu39hgdeocpt6p1p5yj67bnhkzd1g62ljseqlyogca4dtl0db3u3kwx25vfjhx1891awgfaal5vxw4ogwitt74yio9nsbuwbuekxhmzvr738f943sott1elm4dprclw67fpwwtny9bi5sb37vawxgx7hbodrp',
                flowHash: 'tsr0emu2gv93d8qh2vlejtza55f6cuhspemzwunt',
                flowParty: 'l9bg8wocch2dw9evcaqxis46s4bhif6xkc57mh2w84jy6y578kjoesjz7bttzzfbs4okrndl2j5ltsqy0zcjg5vm25hlv0lbd9p5ic58q23oqvtfhw98t08tmqbls628xvdruvsrnbekzb3saz737mcwcm9ke7p3',
                flowComponent: 'ofrxkgzj1qv3xhcgpt97hmt5h319te3fp4vrvza65b8grs1e3tv15c05dp6azysrrbzxii7izhwn66a3v708ncuj7lp976h4oktnq37dmmaz7yrv778e4ywrkhxc193i7zf4e4g56bfnxq7vwmmxqgv6oor67g8x',
                flowInterfaceName: 'k8qjifz0rljkv4m16rp0hqy4u898mjnkdidexfo5rlsbfg8dohgjaz5zku58xx6rfp17v28pek4vcwnhwkyycef2wurqyf0m91qglhn5exkr1scqapiia3h4d8g30m52l72c50plvmjg9pn8nuw9p3710mdwhhigl',
                flowInterfaceNamespace: 'okzdofer75qsgkgz2p9emhj4l09msdbj643w3qywgwaccjgaoyijr0jccykq3fezqxiulm4ghrmfsrebvwnd9ovrsz1nq6ko20jw5e2vtshiu31rz9w3ogroggrug1gbibm2z3n24yclf69vjzsu0f6hezql1r5h',
                version: 'gke3xv13kb0ka82jex9g',
                parameterGroup: 'zp1u7ru9p7b7jwun9wvy0ep0xjkjk1sza876f4vmz0pleh82vg09fv4wu1oud9jcr2bfpm3bxggot037f1vy3jpwyqj7pw2z8iizvnxgldvrq5h9r1cv553zgex4b5lwpx0adu1a6x2lbym61or124n6xsb8m4lzkzyui00snnnn4ia2277sj8v45ozzpcbc042euob2bbvovhsb1zk203ry8z4bie2z4esv4fwjbhpchl6ykgj9kvaxkfceir9',
                name: 'qtscwsvkefbablczcfkcam02skgx7hicvlzg50buecds8h6vt675p142b6ee74u1bdaqqm34oqrfwhjrx7wkr7kubv5ptll8nlytgvpmpts9niu7dg337wsp7u479hvbzaqzr0w5sji75wyjhplhyb9hso6kml1i0et1kd24axgtvu6hz4fv3mtssachmzydd63wmard2y6a945cvopp6ackqb07o62cvqnljeqn7frw8eyz0w8960fhqpy37cz7rpv16x8pi0w10xxguwyfue0u06xaduqieyaiarah8o1xo8br0z4qqaj4qiutvkqv',
                parameterName: 'q9gwuind6u0p0e58tqr81abhim86aid206hl9os986m65bu5a4akas41erl1t268679zmr6ktounkhgk5txvr6cn2qiwbwbm06qhsvh3da7fgtavjefxc2ztq56n2wnyaqol22u69payo8xh89h9jefj11bq8nodbvs2rha5wm1wm4p8b3myc5dwm6z3b4iohr8i6mggh628ewvtucn5gmyxyd5iuc5jf62u8z1222ucbdevmab0r5g7884iwypklmk7tknpj0rgqlcaiihcknkp72vn7eypr2t4abdjb5u7vq3yk3j6ai9cbc87z3kc',
                parameterValue: 'g57g7jib0plbdamug3ntu0zgge7spna2cnm3n9y3ekvp3uqzbjg8v5qdue6z1wwiap6xe2xotwtocouk7jdduu1cg31cdbmq7k43u05kd8k5wmlc351cw0qiuvemm0s54ptvayupoudepb0a8bi9dp6ciqygmie41bcxaf8ls9xncyc9udskv59cyi56mm0ri24szq314rumoo5yvjstk0nrdqkqifasxrcvqcpkbvwoedkcmdbet0tdq7dzb06x6fezxbpgwdrd71zyvsxe80by1rvwxqtgt6ak7ahwc9tuo860ft1l946lk7u6y8kophzoczin108tfc0oyqhwjpnbv8t7usy82st8kqd1i3jq3prdm4sa3natve3o7vhyfcc4vu0neanqawaxg0u6d7qp6fd0yoku4w9hq5q4x4fp9ig71j7qz58qc5vxn7oef4oaz1wpbg2g8xgmxjms14v81hpt2wyn7opwo8yknz7o01zb9avo4x9m59z3b2w4t58tq96gu29d3l7n5xux1w9drx40gbherwwtaapz3gzly57x1odmhw5safisng2uvqe7d3atfftzh5238srw9adt9t4xchmtjb05jedd4k39e8xmwastmbpm9dv81o4gceox6l64gzbvm922qj2cdriizjvh2minj3lwzij2qemwkkx4rzl57eq1i6z37bp6iz6te6ggch8w2g8von1yokf3gpgvb89itu6ledtp6i8zpqj9mz0ibgiov72z5q4nwcvr2jlbl1910w1jtvqkf5cfeq918dbmx48od74wrjfp4yopjoapcw83x402azzjl76j4higj67bxxvhx3rd3w0btjpc7shbq8xh9127jlgqr1m7um1qs52q50kp981oli4kfhmk2yiws3ulcf1hwkurypxd60s7mp3aiu418uted08rb67r83awu5eayprhyinxa0les5glvk0kdv20tdgutbw3jb73s9z4fmpwsd414954awpxzhmwna5kg3gp',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'zlo6h1oqicmjc2selm3c2h265hq6h3e4616x4m424mz0to22q2',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'l27rxh45c7blr16mw0xb',
                channelHash: '96dndl984o7i1y5hagnnql49gav6iazlcp6jcehn',
                channelParty: 'iu9gux4rm9btsrrcxggdxoy9gd6l4585mgvh5wqqp8ox459zhh645gnedd1ifyg5y3nljeqqa1934tk0diuf30249y82zcyj86gg2bzy2b0jhhtway71l1igmeto5dzh80o9s64k5zdwukaaxf8o3n68nnxpc6cg',
                channelComponent: 'efklu857ag7w2dwdzrq97n3qvtpf9307lqa8456icu59c5133coyomofvymvndraifoguwg4hxo0py78x7jno1ppxkl3rdsggaz17v7n1bhzkh9hpn8x1pak6g6mpxxhxyngdh4evpyfrw6asr15rd4eie31w0st',
                channelName: '1to98ubvpwbuwvt8qdsrnkhnwih6a11atfge68zwp72b9vhvbkidvwci6imj78w8utr6kht3gilfq5tcex5pb3qsyx5n2yrkl1xwjcc4ot1g3w487p7cm0prkr6gdwka15samd5k7fh2qjnunpsy6cuij4x4ecqy',
                flowHash: 'rkkfl39qg85cmobux8cjany2v581b81wnchni1al',
                flowParty: 'qv0pizxd3wn0lak2bmlkdnawzor30hq0z7vz3cn5fn8d7dudlwbb14qkr28r2ikrcvbvtusrj93pancmc4xv6gpbxxy9oxtr4kiiipnpgqkr15g4uqi5f2orxv17z2wwen1u0r26r1o5rwt96c0u8757uaturzsg',
                flowComponent: '82tyu07vfhjyuclm04jfldhx3lwd7tinosgqu9yzzo10o6glnoya7z5n3o57edm6zjk7cvzidakokej9yax4apop4lyxbo5o45cmfh82pxjdzot9wv6gufsai8hpe7sh2mkq7o2pyyk8l7c6ozn0te0la3ljqr44',
                flowInterfaceName: 'taifw907e3iu8p8ebshursplsra9s2a8p8u2wpwyrppsq7tmctghlosn6wzst0t7t3bx3fy053aqs7fypk3a9nrsm65y32es04rwbv0vkusbyh26a5v9tnt4dsowu9r7ib2b59kr6o3786yir0cwqdc9fmb7a3nd',
                flowInterfaceNamespace: 'rlw2lotdk6st6kgdwgsmvbe04t2jmtjhymqpr49ntcs5qok0u4fm4b2qb9aoz6u83tcj4x9msz4opzfun424j3r8zu6k1hcdbg3x32s2om78s7emzqw2jmx6uyaadt8k2n1v3nnxt96zotbduqcmgemai58vhje9b',
                version: '5di5p1xyx08fmc6lgcoj',
                parameterGroup: 'o4qqhbanfkn6ppb6xn8o8cp83m1nwphzdlb3itbspar4625znebhsczv9mksikf0jpnkzyj5huevn5y8k7wtim0nohf61c928n9s99ho7virlsotdwygs9ct5kdzfj6e09qu46a97atme4z4y08vfk44wbgv85jn1l626t9c8gsyoa5hvbxvrlzouc4n2a7bkqac3vlohbeo44lzdcj2o4lp0prghhqemir2masenydefg9s7d9pzfalp218wtj',
                name: 'vmra52clw89ve7vyi7mhga90nbmpwkl6zoe4845tuhxcdk438jq0l8ugnn7lqw6zjjywwoub9ezmuwsrqndos71mfzfo02e7ykrc1uxj6idy9vd2zc480u04akgj0iier6s0iaomnge9litb34hvgckjkhofn2vzg0hxnrum0g6sqn0fokungpsu545nzr1ylyk3iy1vw67wqi4sfboysmeb5aoxk4aw8fk94i7bpwdstk9ztr2o8zlhv2znygsgb525jfn0xr53dsnxo73l3mw2n3dl4hn2xrnwbxdqaqfeh91n4n27z0w6hcb48wdk',
                parameterName: '23pxn6driwxjkry1sn9yteftzie87cqzkgmw3a3tmldzr75yh26ua6se81tdalvndolbu8ac12w7elb9sjce8e5hom1nn6nltvcq2fj511ojrimooj06joxb15zyphq2ud54te7lav14oo7fn1b7fdbfi6oq2mlwnth9pkf4urpcjpmgm8ik2a87gycc6c2kpdh8kela7k2tehu6c55t8xroas71qul3s3cm9sygidbyex0x4qy69n32xn1cakvxzrzz630nct6ldbqvs8lgljuwqx7ze35hjborvf6iear660do630vup7qgcumlwfv',
                parameterValue: 'gi07lhjeg5xhcqxpevormq4woe2plcq1fjy27icyqomfuh5iqptfa5x1vo9zxwks116pp0k0tckxifz0k77y7y019neg1yuldodfi1laug1kx5bmkmc8bhzvgqy96slxsok6e9ort8xi0jbnxfwt7powpto9lywkesitem2b4c6w2xhwsbxnuco1acog5k5gv13dsu6ke741anc7eemtqrk5dzvmcuteqwmz1aypq0qwn2zbfu3c9f64vst1r4z7gjlnt3jjd07zu6ixpyjdsx56wvobw0y2b8bdzyfm9r1xothbvtvxa05byntht1q99xzjz1eyxsegh392sgopte889529eoyvbjsdzbd6axklukdegt7jbjis0odzhp9wef0b5iy5k5b2femart9ryw1001lghgow2ffdi4an5flzxmcv5hequ4xqliu5ndh62akm6klixxf89caol4re0mgr7i32bqqqqrv1gytrb1118hy2kdfumgatz5xwkc5zs0q7ifd1zemucpzbkvkebz6sk78z4xc15l4icqthfbyzp1ouump2w00re2o15v2ok6a68zzfb1b1ypf8f3cvivuulag504v5gcenfsbgct4qnyae9ej3olkzp59of3ohj9ulbzsk7yqzmhpmya2ktwquepc8o29wek3l604czsmykmj3e1wf0lm0qnq7uapqhr4rhdgpbus54hzx64z9nn0b2om8adao79petqgcvemhnu4k219j18i1hgtfb1xicgvr63y1gn8t4n8847lvvy07obvhecqmnbhjt1993wy7otvf9adxh6i921rkbq8rtd5pq72hb3qwtqgcvqj8g5vfnla9w71h04pe1jrzc0glmtpmobc7duzj6547j7el5fe7cbc3ncrgdqljf2bejaot89fd1qhdkf3kwlslpdoufjnxquhsuzkn4qbapjl3e8bbo1ibga3dw91b39toetrd3km8o4ac4wb4t5puf0plbp3cq0mv30413hpuuqym',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: '7zd2m4kan1rvoomqfbny9c50rgnq4h1zqf5tcqsc7yyjqgcrdj',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: '8ur7oq8czaug5td4fyto',
                channelHash: 'eo9s04vuqjzc9mnit6ieqdik2nob7yg9u2x9z69y',
                channelParty: 'k47y53w4gbph082f9wigz2cg6p50svacnj2obrfbn8jufm53bgpq8aneaqhnqxnsyf17ixi7l0m8fv2a0u511hnxbqwvo3tsngvn5ymwo47fce7msu57f10840vg4hkmook66pzh4kzs0ivpsxxnr8lkga244eiy',
                channelComponent: 'rawb6pjzkf8i8ruw5u32cjqegdifkdgkpei1lgb32oh6wzrahf5pa1o1xfgr4rm85gpju0bny4wov8bxdbij5xwc2d9eys1zr4g75pgvp514zz4kvyt6rd9jhpb15seed0ext0cxjkqd579k9srr87yi6gtz5g2n',
                channelName: 'tri1d75ze4nho7iaaggdfh10pqx4njdieobxt8nwjg50327somv2ktwaugpgsljzr9qc508epsyblfrurj5h24k77aveyz6niporhnmkclyuoz9txt7qm7aqxpmsvklf7f55fxqltmmb2ab8cuj7vtyg6ugfwthc',
                flowHash: 'wslqdaskn85yxgzea4tg72b8cwdybt07tj99lyxg',
                flowParty: 'zlg1hm9t3hm1ujub59pe97b4xu0sk2kvbnm8t08z04wj6r4karbi5heqhzfh5ql5papxje7mojsqzm8tjnn7xc6rlrasbksn5qexzt5r4wek0b3oo7zfgkmqyg3yd4uq6dgv2fvzhmncm20ui21toupinszk9cr8',
                flowComponent: 'yvuuf5wd516aoy0h32mfa2s97hr754hujputzc6vc5i5ngq2x8ysw066pd7uhtqkb7qstcim0evnf9dhxs5ga2xo0wkrxjc1p9hwd9fyzs5xhbyy686nis8z4x7i8v5qkieq5fubtjthqqo69680eazlny0fjr5g',
                flowInterfaceName: 'q1y6mh0gabhcjlipsk8qex97ddn6e5eb4cc1dmtm768zndc1zf89jduy92p1v3trsm8syga4b8voq2zhdia1st8gcmmecpqfh7s1tj30pjavi56uvy9eypqbd0r7k1fpx1fex8m0gjtsndy96s0snxrqiazc9e8e',
                flowInterfaceNamespace: 'oa83oithyhatt6ye38pryl0699uhk3eg6siv7j0tkcksera1bgatnyghdsmsnl5y7r44oz3kwz2hbknqtxq3fn7fir9zlgb7tcdy066v6q3kvzll7vqjvfwd9nsev4tr7pcfjyfqhnufalfhfge04lw2g7zb4dd2',
                version: '1lyn3m10h8daex07uqgp6',
                parameterGroup: 'lekipan49qqzsb5r8xffao9bvnqu8danrwb4e1u551yli41l8b688tq03y1haoeoojb3ujlbpasyqq7rwvkcqg3eziaugso6hndjwwouyl9qtdiuuwc7jxcarwkh9wqp57utu9q86rgeb72nw0u7u6pnmjlx7efp1a9o2g2f2374qs3w9zhk5numswyoe3xo7haeyhqwqzlljvizjryrmscqdhtr8l0i54558ky0qjgtjb3hq6dxookn2ftu158',
                name: 'iudrw9xpl1wrdlbbt95zjvrg5qkxui1pp85gvmw25ysg1b8kkod18j78sxq49u7jbl0557zsi7okwsjdgzrwrmabgy06j7dra96n3zqcs0ldctgz54pxle8zido0gug7itxpjzfpldkn632w70gsjsklfec57brxx4irvz5x4116sw6o2hc9uw4vacyi9hlmeacj2i67190nfytth7xlf41govb1u0lhsox5miu8i0xp7115hp26kznf6f8cr2a34kibw3v4a71sha5g7cokz742n0pkk8lr0vc95zvims8czwij81yd5kf4ii25ntmw',
                parameterName: 'xohkjeohx89hhyopr9e1pqovt2kd995djvl9wq3qis77e03b3hoz216x7h1xal43an44aux5bgu4iceb1c8qkcyaj9l9n3njwzza3xe3f6i1x6ijn9gj63tqnpvt1f1itqfic19h8w0nk8vvuz855d54aspu6wm551du3x5s9jscw7qlp17a0o9ckqkzbmkra1u68l6369xilqxcm7zs7nnliddf95oc36c2gbh36y5fxl1ev4wii6ve0szv937jzizr44co1uwkmz0y4ww3mtdkgq8qavy4c6lhpt8k5nyemvpsyhm2elml4l6ga9vt',
                parameterValue: '18oj6vnq6gif9y0k6bnxfc6hon07bysy8f4axwtadhgcmtoo9wvv1z7mhbegehkrurkczw3wbg8mgf7jip1qnp6ghn5vd3q3srsz70yoo83jw28znx7ld518owh917fafvc4y5jtvoiylfbfhqlg204lrr0octqyu3thsommrzb4jg50pgvt3nhnep3knt2mqcb46eil571eb8xwcph424xhg77vnp7l668dgrpa6u8rw3ero7snrm5vzk9yhfg1s1ctm1c73mluqvtnoohc0y2dmyiwkfp3s8l2pnv8uvjjwpn4ynoljvyp0scrq74hwnoqib8b8hcypblgbm0ns0c4ap9sjuuk6acv7a5iulbu0i63usl5uoo08to1rxfcsqdwk4vemyw6pamcgqj78cozjf0fv2vcc47v6sb7ojnfn1kou5fwy9hzy85ix1tkcy3zvvbsje50zk6lpqh553p1m97mhq3zzc1bu1cqxapdva3qxcsk3mpw19c8ul5ds1ykuwvs5h0e4jrrvy0ny4dgzfjn9zeue5zh8nvyxpntrrwrf164775v7ez7srsmpj1hg91vu9tkg0j6mo9xu1dmfdv8uy77kcmhv5umifsqb2j3qwzi1dquwu34khayc6vbi0pfnco0yltqk0b9lorkywfeh8dr8bw7aghfpa2e82bu8lzopizmtumrcxio8vm53g6wn42v3ymzsofr6ju4itk59qwq1zmw2jhpgu4zxehttx7uc8vzzer1g53ix8gv71mg9avbd0jvk3p9b9eotp51bwbpqven6cgd3wh7d5ncqp4crnt8ycpks6191tkwkxtszw2bn0dy5c01tmlooisejhd8awzwe19dvqoepflc8i8cirh0gbno3mpf85s4jtzhv9vqz5s7on3r9n9l37xzulwtvo6mlvn66guns3do09o800fyex0rtn4go3a0h87csay94mtope1f4f03f6wawqn0v86t26s0bw49zcm2vj4la6rb6b46tg73',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'deit9xkbsu9zfhdoqu6c5ostn7856p9thzxngqduyuyv9xyxng',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'kxzmjy3e34nhcbevk6em',
                channelHash: 'sm4q4t431skce3zbq1h9wky095lb96c804kipo7p',
                channelParty: 'j91bo3qrs8l0x6qd44zuontksv50wi0yr1hll6fqe82a7xpchdf0z9nl05yhnik1s7tcatdj7x08i6nqfpd5gpa2icad07kgu3biz7vq71xfn9oh3fwxod0ny7jv8i0igh6kj245mk7v5ilzizf9johw52txigjw',
                channelComponent: 'low7a7czxc38y5ez27iyqd4d9mr6eyd95a5gm3sn4jnexte3px0sivbird9s6um9k3rk56k84mwsnm5cnbe7hc4ix3kqvcnzsocmuwfhfyx1aw21kny1dmnw2q9xcpazecqkdqgb30jfc3bh89sbiaxjiosd3qzj',
                channelName: 'm32wz0f2s60hmepxaq127r4g93zyivt1s85kbjndedbmzlgtmwycw1aouy06parva8hqe5g1td86dajd3ynhljt7jl5wgq8s7xa9eg6nl0ouuz9ndvmmhcy6k1mydhvc1yx3c9z8u5r450ti1sgnyjq1o16w711v',
                flowHash: '49nnizopg8hjrproq107km8s56el2k7bxkof7yq1',
                flowParty: 'yf0rxzxlksn4aoemh8kjnphkkal4d3zel0is6au4qibki1yfuzp7hmszllsfn79ke8lrn55tnjcgjj9w3i5o3e5gnvo5jhaudf3ps2n2rg5rkd1hrsuiggnh55hg2a7rigczd4a52ao755v2z95yx5jelfaeq8rv',
                flowComponent: '12ro2epadk68xhl1g4vgf4aifzdo0vhpf40lhly3zore15mb3tyixz1qge02z9w6m0zorns44crc0c4e2jrn10rt05rstsnkrtq7h4165syhy1qjjqau6welxkvtcdcp3jqrayhv1cxxd7gtr29l03elvzopdgdn',
                flowInterfaceName: '2tto8z2dlnsctny4uyjnt1ccewtwt8ioe51ilfqx4alw1gmsoxpputxjmhyb8bktteyfjn0pmfj8rik2mkhgjozx43q5m4mbbg2lx2f3wgowz9yhs9zohj2qepq5imber0qilrjbkafecdvsl5tjlfbufon89u4e',
                flowInterfaceNamespace: '6wrpr393eb8ftv2bxh7a3s1gif32fxeomq9hhg0fugad3xmrpsvfovhoul7gdyjokiiu02vacvsutaknrwnwybei9aikdiw5nr5qgmw2qzkex5kbr4befhzi40w8y62bnfvcbznur4e3ot30rtwwyu0cvcvovz9b',
                version: 'ekf5p18beithk4jv5fn7',
                parameterGroup: 'xyyhhqjx1ziy00s8r4bhrj1yd3srfswy8bbkqswqsfdkgdpsmjjodzv2o6ba1jflori6kncgqzqtzuk59bxbihm5lyuaoay33k87ght5qa8rcy2dzo87ujcgi77gkzmo95rsk4q8550hw2ln1y5m9cbwy59bryt4kmutnqoe13ffy85buv89ute46pzpmvnjtjqojkevwo5kj7cj05q6mk2tmvjfhl9k0ip0vzw53n9troma2quh0dwfxhrr9ce3',
                name: 'gkxvwgpimpybbgvr7nv43zkhrusbwwh1o2wtwrlhcy5745m8ea1pgaqzkblrvnaw4reh6ljyrqe5l3cget12iw97j2im3rgihac7klxvgr5xtyz6lpqoycm7wewz4u9ma6a1znbduoceadvoifzkdemonlp07486s5bhqjn3ybcpygn17e3rxrzgfi6jml86pf8qekrv9b4w5830xr6mvi9ebmik1k5evpn0if2frtxfdtvkgt3dh4quq85l8ibxjiw1xqec69ih9ki8223lkj72n11dec9hbhjberbhzxlwvvznh99ordm4m6bp5dek',
                parameterName: '4k51i1i716ohlqznehyrl48k51746528p77ytc0reydpp8rtllcmapb5bbb8qz0z390e6lz059hrpvz541jrwvxh9xq74tmn527jenigw609xtrvoiigicxah9xe3i54wvnssbl3u9597dvnnm0z3nhz01w28nqvwgwcnaikspu9lvbl5zocbgrf2aodp5qfxm97j75pn6wj1ir7wqmtddy2pepprjjuuydncyguxuxr49nfld4p32824mkibhrmsfgz4vxi0guvpunctb72xwhqinqcr5jyjj90bekuetl6rsmreylq4gpzy8oc3lmh',
                parameterValue: 'rhr7mokzigkgr910dqq5qlxvslgldsd5ezmqg8wypne46ntgr2y64imgj2holkhce4570kr390dp9qb5ybivti0vt3epl9qxorjtij31llc55ia5plotz21vqjgm8l9zzcc866tltynvw3wfidl192ok9q6x4p1pocrraq0o40oone54c0perla6t7ucqn8t9lzbv69ogfmyfauddke80y4jfm1bjry6vspt47kxr2sqhhibtwd55vfve67egr6g9q62pq9bz7s8r17e2w3lgeopkfnypmz7x468sgmin4xzc2yhfsyxe8q254gkobi944w4b1r6oyrqbx9mfj3fy7hrw1aalmj2ie6dvr6ermlcn2bc4qm7gacuwyhgvihnlt8iq3douoccv5l3wku1iytsir51c9hplrt084b5abomx4sgdjvsuetmjmqq1x8510d12f6vcjyva2na4a9pcg1oso4588u1x2df7nrcpgkjgmtgas91uchq76ds4ksoqms3ancnt6dm1pjbhp4ezia89mexzsqpotnyb1wohue5heglldch6v789uvm1qjlk418uhw37yewm8y49vo2x3h3ofxl7k30vae9rla83thttxwa2pt3pff1evsy64marijof0hcchzsdqvupsmndr7yiiguhzxh2lgps01ryj1yv7gcutn2rmyb7dh017u5wui5yyc5zvdegll6sdxdm5k2s6aunthajme9bi2ntpf1a1xgq7dfvtpf76jhds6z9zpplyf71l652uesw76eqzftmqs3ajg773kq2h7r3da9cp9cy3789nrjwkq8l153bfk0555kp17fido14kr4omp4iyzilmqv2dij6ppfgu354kf0vql4ptoa66po30o1oy9p5ncc8dcwx0sv66s8vf52d1xd8taw3izvh9ktw4ymou8gy5lhv154sj3olfp3gq036p7mnvq77iko3p4paqur1341ng9a3btd2hivo3q5exw1s911f8vj0b19r7ao',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'jr0y04ue44vp6dl87y22wtg5l0u6dn25gxf07cf8teoltdbbjz',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'tfm2xaa0kupei9n64507',
                channelHash: 'ten6tg3gmibz5cy3x5l5wkj9djpkutw46zdhgb5c',
                channelParty: 'hy85813uk6arkb7m6tcarb3qfx6b7lch3cm4w00airndgoviyhmd9gd6lzbkqgftf2clzxgpf6vbyykcxsveigycaschwiv8d6c6higb7qf30fsjlq6ykgck2pbsis5su9j75kz5e4eole94qe7xerjtpueqoops',
                channelComponent: 'ltwoaemablo8shxpjdwtxdk691560334dd6yk7h4tnrzemvpl921h08bs1uto43yw589udk7wvh2kq6xf22y1xak1zimlwejc7o0elc9176fpnz93xtxw6e96b21ik403n91hw4vqond7yeal0x941wkz3qyud7r',
                channelName: '40xkan0ygid0vupvjz03j8qeelij9dgm8tor5g98remyn42rns15z1mosf5o137xganjjmak0zg1kvs6t2o4et79gvuezgd8yi19xff1p4jrpml71r39rnmmli3j3zt5po2xdhmu5knmlb4caoqlizrkg6d2sqmw',
                flowHash: '87z31vema6rfi6unjb2ogrnu9otat9my9dchzzjw',
                flowParty: '9jgxg8gacjt2pw5c29i6etgoknirztapc9zrfmetb5dwxlgnyyjxw5j6l8vve0qmkjzohb8odity0xlqunzs4cedzgdwri8cgyh7qlf8q9ruqf7wmyxtfd65hpyn39uordqrsajpcqqlp8fw8ncdhvhlgnb1nz9i',
                flowComponent: 'r9vzyz0gawrj6ztieovb5uegt8pfbj3aoo3fnf5sp6ff6xxxvkkqfugks0k4ytqrzwnu9k97uvxp56c00v5fj67wafrnjmqzo2exaxhg0i5errv43ydzjwniahma787ulfpn1nnxts12cd56xsiy2dc4zzxwfs2e',
                flowInterfaceName: 'suzm8nys2cbmwsuaph8tx36ttqoybt2amncy0id0b6fluyg44py7hyk34m49vtuz5csggpex2a7l3fylmp4wlt72vcrckua0bxbvcogb5yvscp1i2m0llj7dwnqhvs13f3be7a1sbtqcojoz6ctpw8282z1wf4qe',
                flowInterfaceNamespace: 'oqh8tkpne1jnlvrpc5ugghk46oj46c5e4fxorau3ipx0u9d1njgr0mlddwrlohrkox66874qw3y66ucp5yv57g5qr1odlwhakswn1ggcwbu1vo3g4j1ryuosdnrqofivc93t1jnqid8uplmrtjsi4xhyj7qdgd7h',
                version: 'c44nkv4vz9vq6jhme72v',
                parameterGroup: 'bqufgxdlx41simw4bb8l0oym277je3mfzv5c56xx99l1w8cq742h013k8mzekm0pvuj7q13hpvu99rty5xvncxuoopml8cbeus9vm6ooj8kye7r088yxwbf4i3tyqqzld4wjpikqwn9gj230kja46g0belf376jx1rrju09cjj872nd5acws0v48plqnlhd0vas4i8hil62mw32wa47qlr3h0vbm1gsahp6h41q92dkoi9zralle49m3jqduw62',
                name: 'jzwjij4kn89vfjcrevrq5bkcnc6rfwi6r01q06gp0hg7i1wpilc4yx05ccstfq9rsj2u9gm5kv26jcoann7pigkw30apgzfanqll1eebstz3j3uq8aulzpj0w45b9zxh4bfn69i3km9gus6ra14esa2zv2b4mb411ujhj9ve037ww3f5vmer07ncwr6y2uuhep0ytraa01sh7dmm39kfvd1ga58780hcc57785e62npw5jcu48935edqklsae6k6tyviit2hh05nq0roq36ol8p9t4ilvkvz020wu7a3wtxfyk6s4tprpugkteys7rnd5',
                parameterName: '2ehrmmts9s438figxz5zkjlxuzchpqy0bt92lfkld0eeix6b9aq45ddgftdtgfz8nri5thkh70ub8tkpc84prz2qdrm9jn53oxfnpi8aarpud1m5nowcg9tcu11f0nuoed11k2ajwrkucmmrila5n9365vr0xy1egrr7ejl4f1gup34prtgawyz1yhttjyhinacem06kf8nrvy80gj1wr9b2m10bmeagvlxq6czzdukc7d7wjy1nwn77aa04qbg9fuq9a3tyg6k7g5fkrflhndxgdihfmurqrqmih4jci8gtb6fb4fc6e1gpsqvaadtw',
                parameterValue: '0qmftrzbar1rjb0csytud9e5rrpir4mf56oicbk4slk2ssxy0r9fhiju6tbcyha7zu72p4mcabxhimxoc14wxjy6uikjz61u3whro0svhwnw6qua9xcbepbjtt98sib99e8lm1b2perr20mlq2n3iv5fkc1yq03d770lxg62ui6oor3jcfds9fad5j4wtaqrjj7r5upqwkzuk99u9l9gg0bskc7x8vyxlm5c6wgti5yam4rbi7u6rwpm8an8nigm9k0r4all9q1wnk0uu6xmeyw7obg0j8ca191t499uy4gyaxkhu4zgztaxwz49dummjm0covl3iesfe9mifpl4t6fdqpqsrzjvzbpunrs64ph5epucpyt0shc6phtpai5sfxx6if0xsluuim4bu0ot2m2mone853x4s074dzuv5qoi2aj8zao4you4q4ti5tcep4fdje688e5p3yjt97si1ml1bsb4vqx0etrcihb4gthxvq74axgv383h7ace1zyz2rcr5mi5d56zv6thjuxdg1m75yzie9tbxm4ct2hc59wg04luem9py1mkcrclln9xmj5xxfuhn45lue1wqir5n1iksdgklgjew8f0gpit7d3ls2f8raqpiy0l0y0gxq1l3eibbgg9692zokpsrf8smjuij3i7n7g6wl79rmgnjvsnwdrq59c5i8agqwo3fwzhjvti1rqcyhrh5jsdhgncibfeovi0w5p17citraetfiahzgceg5ab36py6245rwxxga4rj4b1szshc6d9gpqy8yvu7mi9lzbpu01v26zwjmfts52mktwymm8n4pvh795hthd8wgt2n5lp5s860cxo30hc2vt08hyjhrkr2u7rys24r7a25ce85jcykkwlhrobzwe43nk01dspokmzoasb9vl92dmk3fkrdjsk59rowitr2rl2898it1lku3mlpqzr4bj3ia6dwz8p4bntpd1uxmoc6v21qx89qlui8unbugkch7qlrzfidjvxzsu6vxsh',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'qoo5j4nbcyc1yvucg65r5bdm8c8d3mvv8ux3sz7cxiky5iiiwi',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'ly2gmuzlxh82x1lum5vb',
                channelHash: 'uo055ypi0q2zfkamlblf3mdkhtsvbgtx3ou1b72i',
                channelParty: 'sph0b1iekk2wqwgvyt2x2pdo3fojowylto0o11serg1rrgph0ke3oi51w33g2qczkh9zctdl7eks28nk5mznf1fe7qtcmurpivkthwm2d2mcm7oqi8gaigyyo02ywsn79vrn1ipy42u91bn8pc781497d2zh80jx',
                channelComponent: 'xqw89awkij56205brtuuu76jl4k5frbstffei59kinul768lxbv2ynxx2rt6vt1y8vpv5owpz4n0y7pdxlqi19qluhpj9roydjc32c54gr3j17gip0uvb7zoy2xsnj8phitbwr67pzez8nzcwkqli3xgs92eidbu',
                channelName: '7qjey7ovaj0stm196hi7q2xt6w700amprncz6evoqu2dzbawcv02anclihuaj22gynia7mxl5wr9s396nu3yvyi0zm26lttvvsh7h40moc5e3qu7m1bq4esb8i5vl7vyperloju0ifc32btdtw0p9x04qqgpjs3c',
                flowHash: 'bwiazltdvp2vzd7m0105k8zwu2yho4ly6nubzcux',
                flowParty: 'gspe9oc71ovselnlp9x3hzee2c2cf1pblcobdt9v9v81t5cgs2vh6csykw51rcrrr36imlwpwwrfu4urv4kudyff17geuxmu84isdexirlwyld5eyunzneus9ovve6s8zbrtdfjdkwkqvu4wp4k8sgwcdq1azjmt',
                flowComponent: 'hacu9zirm2qxenk6j6rdtlcuu5oj4z3ya81laro4zok4pimen1oo0ib1x40r7sph6st4g9tqsufftu8brsx2feoai23414yrnk7ustad58girokw86gqqup6dj5itmj84ubqx2ha6szqdvrgnh9h0o7haaeu34jq',
                flowInterfaceName: '0hzkagheorvklgbjmeqzx9dmbh0og3jsvey2wt98uq9ddktftmxa9hkgd49jws4ls62fyt7rxltjafy1h8a48dq7vuwne1th8v5opn2gnvo2flwqdule3g32vcyde2mxx0a7k61nrkdf92bsqyyn3w4w04c1yims',
                flowInterfaceNamespace: 'lzr7jb9qqyzdmakbvqt4v3gaxbaltibhugs39ge337lmoe34wkzy4zehrci4rm437iydm634vyl9nyigeebt81n6pv1rxqo99lhkbseahlzg79ws7qarwzz1r83tq4iim0entryv20m8dmjq4sby91yfb4eeelij',
                version: 'p0bmlu7mhmk1me3nt2pi',
                parameterGroup: '1nvjt62fal9xhat9f353riqxesmxgyc49c72108iidlage6e0jij4rgtsyxrsmkhklgugsu4djzwfs4vgvxmg0bk1kz0gqej2mp2u6iiqf96wgvraxdtxmioa5enutguorxvy3jlblh7rff92rq5i1x3irqdve3ds5t3mg1mmahr88lthlfkgaboaj7f2hxct5nxv9x8uq0futsscanzln17fk57akv7t3gzf29jew0tjm7bv66otcun6apeu18',
                name: 'rar927grvbi4lnuhbqpj9yit21ebfl5u53ifzcx2g0umg1kpuuh31ince65qxyyl0kfl2pk23dbf6qw2fbkzgihyla9kus35ewjaaifd5adt3i1zgzllrcfj2jcwsxzv9yq2xs61fgju5e5hjqs4ignmi6hcn4zy2z42uatvcpl8ijrvndjkh73rrk28hiswwdnq3mupmj1t1vehsw4ke1etgt6qo8ssttmug8a8n3q02ahix7c6hr3hdzgvfbi09ds6pom0bkrvjea6j6cmbjpfloodvenf999336ppras377kuk0mx0kj6cks0p953',
                parameterName: '1rrdq62f04fm8a8qdgo0dyos7d16hafzsax8gigotaj090nocf7a32pon77c14uh8r1zkldd27x2ilwf2nob0iihxrlipaldpn37ljd0v0bx6axclupy1hxsr2f8ex27ju90d08lx9srusejjvoxualb6xol81vtvipldazyp3cr2y320qssrqmux61znzmsjiin8oltgxxtbhx103gnxxsqknwy1rwglm34bvmf7575ha3206uxzqu52z6uhdzsqligqckuoyrrswc4qilr5smmn4gkl86z21cdyjk01bln61xth6dlu2wpsj03vxzww',
                parameterValue: 'ac9ej7eqp0bmio8bzih0pbjeuozkn7io4ikz9lwgiyb8ulcf2r6i2sthm2xkn7kccpopxq0uw4dnnuj1kt1rr4horbtlvi5wrwf87su8bjxdt1l9o0uuik5biepeg6a4cxevykojt4jjnc0kxp6e9kwbv3ya4qu41oq960qv2m7llravye38mmus68glumymlxug2l7clx8ksob44j1hugsvxhdhn1uidhyxalovdajot775o0eqcxlvqsm5i7r7vxp0or3uv5v5kenktqjpwcrddr3e6mv31jqtw7pl0ghde5nhbtqfj3biffs8cymran4qwhdig1bgv3wihu8v6kkg0r6io6e52frfc3he6dur0xo9xui55gn4fddn2rp1e82njs3d8hyhjb8e766ur2dvgbra74f5a4hwyqcqhyqn8t5ldyhbmrbm7xixiww6gekrq3rh65rpx58l2gyswhezieou7wsyvnpe3go4a9nbn38pzzjf0jejemhotz6jijtvtyd6s768vbgnwsqjuqt89rnudk88rg9jf56c8vv837xr48ckepitjgl2guxwnv1e0tncuo6oewr80w9cvwbhb57efbimzghkneck9t6krmpysxfpb1x57o7jxsegoh2qi4era53bbcqdjrcvcd0ss42s8kuh4h5nr05o9g2338bn2tx68n12kvqby0xjg3sel8xabur95r90lpiqqktqbsxnia8kyph8ddcnfkxovxuqjvwca5i46p8kv7y8q3kf6j0sc1zerjg2vkrf6o39xp0q16sjinvszllbzk5apwbuq0z8bazvxxu0qagtl6r47e47us3chqrckx7nsy73krwssttmnjfnrvx8gh5kwq9nfjd2c2l1dou8skdrlo8zakc6co41cpkd1kas72sjrfyqyrvivifa0a9wc8c4widpoblbb30kcuiiz0kpt5u37wp4vm3wrs3heskiz3crh0700fxdeqbihw4ce46biq2z8y18ig4i7rmy8vvw',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'vg2bo5xn4226kd06u18ct1pawpn7x4nn6mp8n1wohprfqrrvz9',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'm38cf6b2zuh673tj5knb',
                channelHash: 'i9jv14mxwdmx09hnu4q36oh9qjfstlkf3jjex0ki',
                channelParty: '99rimu581cakidmulm3o8ssj7psr610lz47t2yhhntuix3e7sit1v3epm7hrta1g5p5mc1mzzdskyh2irwg43unoaeqp1e0876gf6t7kq6n3y22utmmhbe8464i0r96km4g113ivyayqb7madti6z9al209xy624',
                channelComponent: 'vwi1bg7jiuh5bzs06k9p6srechk3je12rjy43dfyxnzsjk0h9elj3nlgslubs36df8qyrvlx3pd7jr881lwxnmi91hxjuoebonyqr5tjuft3yhb0kn6wfwnsl1z61b3lgpjpga2i7zvycg24ykxgzr6s00htypka',
                channelName: 'ntu9as9rjjocs2xtxawnrqx82a9fr3xyzxusr8e2ay20axs66owj46pmfs9o71mqhzldn24orgazzva91l15yi9ot76rz011rk3i2px3boi153xdnlfpz4t9tsaseeybtzf3augylmkb74vsflunskgnt5c6lgbh',
                flowHash: 'zdtpob7qufwt1xhojj0fk7xs3eigcdxr3oasagnj',
                flowParty: '020k9cq1lz0jnfs2l0o7yz89w9c2puchkjhn0nehfjj1n4qs6xz6tmn75634eg0phtsk13r7am2kkwlqbotfi7ggw6a8gx7hz2voza90dlustnt52n30t4ix4npblnox5gdjvi1x1nyt1s1xs3fr51ayld16oqob',
                flowComponent: 'zu6anisqgjzd7kwits2tg6wvnygsv8nm7soln0wo9e21fkpvsg0v1lovr7yg48xpzn7l7t5haty0nzpg7tt5mdveyjuhfwysom672uvg86fwr4i5zecteqv7siy2kp41lkxwze7zyt49fl5kzi4eyz89gq9jyiic',
                flowInterfaceName: 'c980ztyfri2ytm3rub1kaj6gdmsuugjwwm1o1rl0eh8fov2dyztl0wf79biduq8s44k0afbnudb45dp6yxz7crc93kvmpph2clbaa2tk5bg9x9iybv0t0kd0nogr1jkcgutb1ktpxwp6qxsjxzh7tltc5sl86so9',
                flowInterfaceNamespace: 'dzr66nw8av57gtmpl3yltq7qnld9gesew7sr4iqm2lcd6n82zfjzy5rtbvl5kgc5t3uq0sgibynljw2nvyex70qow9gv6jwt58aga2msm3vwwgajb1avxwqb6drsvp6j8qozrs30m7nvzge9hsrqtiiuqb26v9k6',
                version: 'w8gzca4p2448rko4l81w',
                parameterGroup: 'dp83f8iqxw1c71zfv10zpxj8741pl7o7e3xu0dho00pcsl5erfa9pz881ua7e237rihj17ewaa190u412bw3mx6p92jdfvwvnxlwebwt8ihj8bbmb0k2brhff4uk0zn0frkvrtudayr0y7dy8s2m9zzb2k0kln4i01l61ly1xuzfu2q7r95b0u6du956q9bygo0ssz9m0fzi054r3vgc0e40tlozsggkmxgx3kycyujmwyrg9d5gonfiwh6nas2',
                name: 'cm7em2zbnostofzedzp3crkj47iu154u8v5dnxrsmohu6ukk3793oemt2utff0y3sl4439b3hes6wp46yh5bas7dnnv2aj5kivxgdi9zrgco6797wbl36gnmfaic8pfdf5j7xqyvttkhtshvoqupmg9slk2xvt9z9xm77k19hrh2dx8vzvjzda6ip6d1c8a06v7c62gd7o77vrm05cu9ltpantv5fr39t9ru15he1bpodr1274eeejofe22cu8lco73ca3p4e34fomixtvairin1t0pv2syv1wg6i3g7ags272om13x0j5d8q5uy0l9k',
                parameterName: 'eirkgg5a67mvm4ra5a9uhemcqgy0fwjpuatgq8jidciccmhxho78cs26rfp9o1bx3krewixocecaigvq12ek3y7iavnd3bvvftv800atm7falniu9y1khv4g967eunlxao41tnkolb8rnv4q9gy3f1us466q2si0qsp3o8nc11gtvrvyswbicn0xvihrxgzxw6ds9755c6b854ccft7y9ol6ovugxq5ewmb8tluhwsr7w34mrvgcm3ng7hjsiidkff5pacncgz6meml41akidiyyn6m5c3jc1l4s3om5q4dkipmlr82caw3qrv5q4dt0',
                parameterValue: 'y7lu80x8rmg929yz27he90e7p8v6pvv9r83c091z1t4shhod8e6pl55kxixriytxrcem5t7cx0xmoza317kbawmh7jpl6scn8lhj56vwfj8k1iufahp7ghubl35tp9awjwjm7do45vem3rqxm5a6ojm7viwhnuw4154hpcm4ruvwmouj11ngyijz6urimrp1lfb4wf2msp5itu375sfcmtjpex8sx3ax3c6ao2tdb0w9viv8dhi7qqhcnfcp1qq6apqq9tfffhu5pfzua1zf9bn7ctwo7lvoslnnpc5a9t1cp17yu6ibifldmps3s4gb29sia2bsxu9sbchxp46dwa6otl1c7adiain0ytuwltxx5kmenzguo4zy9jqkdsnfds9e24igactkyxdml2xjrofk74kd9th8ep0vc1w3wnkrkizjdrzc8mjkkbcepnhiljjtqpwoly2b9omz6obkd2ctmr4527khqg5idhopaptw0aan4zmwihny91kljkq0gqhzmxn6alzijficnsng0rse1nbbc0ys9og776en10sicx1hnvblbokwjdjqk3m4y4x7d6uj19edwjghq0lcgmou6t6sxr3xoanjk0htimdboi5i24v1uta3fcsehtllchi2rvtiubti7261epafuki6dzn7cdq52q1i9t8oxjxtw9lp1p2on05elbx5kc42n9maos1882kh03n1pytm2eiexgnuc53e3dgtynwgomg7ssnq39qgrww16m8awmtjqghiw0kfpotbtd7suo2m8q3lqgth37c7s4odn6v31kyprjhzyyu2jzhra7djtlkuhir8u8stwlfffca35nmo61mf9qcf2s8jvpohrqi14w6xe05pqw9iboqew5l3ncj15ip11a6fw5l04hes3a86mwty86hk3mcbtmea59rneqsb02dllbr6w49db4rhapkavhzgwkp45whh4mdcsepd38v2ds9ivoc7swdzrl9exjpdrdj6j63hcusbaptwlcrv6',
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
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'yzhnvcn9zhldoumfynnhovxjaueulhde3rfpyjlvz171yj2szo',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: '0b7irbg56xvucfk6hjy0',
                channelHash: 'abphv1wg7cbnrvclrrmfvxef8p5fscrbtd3b2m8u',
                channelParty: 'qssukrrbl664o204o52tzark4dxmdwjwrmnn9w7pnqnzro3wzlq7mr8ymf8k41n7cqi9sc3s4ezmplk8o7ha12bph3tbi5hfeyrmiyynst13siuxmkohmar46tvehjr9r27r8xofs9x15kpaqbsy7feg9axy9xlp',
                channelComponent: 'pkd3g6tqqn1rv933c2ld5ud4tjku1l6p7n5xnswz2dwaeeb8rngahcufpek63nfib46y8bxsuupdtxiyl2e8fwyrziwk75w7dfc449e6k7zeyyvm9jnnqems3gzelmgh33fm14tq4cmyacxb105e81gu40fhrv4n',
                channelName: '7hxrg0gg2ewo1r4jmc7p6y63a38szvak57j4tno8tavitz5fusrqp98lbwi3fq33u2eaxfx5g7ug7cihqmlggkiozyevt82tybbtdgiccdfmgecirc9g1lg631fgrg65q672x5qkerima19tr17n3az2mjf9nwce',
                flowHash: 'pbhvjdf6e5vnrm6t94t9p8cwabbxqv0qa0r7u5yu',
                flowParty: 'gzsuse8kojrfj78sr5wwrog2wpalkpxlpp2oyk73ahztv2qtmkqsranrhoudqeqaypbl3ghn6h8f90ckyndi0lmaiabxrz0wbe4os44i4lr7a0v7r017k1p7ekagp1v1nk5cpci5dcu7kgwyydvaayp7a1cz5sll',
                flowComponent: 'n67anbsviu67y246u09kvztqqjn96v7wiizgve5fsesz3zeyh2bilwkgedz0f35nhl5ld74viesna86pstekp75gkr28kqy94m46lqyrwohxykykuolzsauop7to60369v29j3mw76vozcosqwu1uv3dawu4ztez',
                flowInterfaceName: 'ex2by1vty3995qxmhm3sathhdna3e99zkbp00b5n3neob3gjaxe57zja1slitogbcupam5z258t0yd5t7k0dogrxzlowpf0a5sj9sk3iirt2znvgy2qgvlltxsi00oqvvaismol39alvwqoti8s90yvgpkk5mqyr',
                flowInterfaceNamespace: 'e6a60bcycv15yjpyeh75eiladg046eacch9up7brf9esb6ih42hmyhsv9qlbq9ubhg1jfr458fviehyt6dvj5xg8gurgwbqrf7b4of1q0niuk3its9zwtfh0bxnaao9wjon8fv4yyeosnk55xkgg18q1w4sszzt3',
                version: '1zm0p1feygyg2q3s71ym',
                parameterGroup: '1tixnab32od0j7jq7jnbx4yfbktc68yteq7qtobbskdphskhbckmx0i1nijf5vweyfkvgrbfe214j9o8wfkgmt8e2ttep1uw7ey28ol82gwizx7ahkudqads8eojvs95qe6ppswy94npthrjzgo8yjn1hwocy70xvdfa0pl8ickdc7ipwwa5rbj5u0iyi31oj3upnblle3j87vbe7mzqby81cet4ohsgv8gdky8jhg0rg4c5jrqxsg5y84gzojh',
                name: 'uh9idgvxn6zbo70uuy09yw7q1wm88bdcpiy8c6nmc0o3aozng4jq2408p6g0ksjvd8y8t2gtd1im75n6v3cm6bc1mzvk3qmytchavg7huv4kv500wh4889tjh32xwml7bb2wtjmxqxtpjl6qgpn5yh63tv4wpq7vv6dceb8kghl21njjlszi2eok3qcaqc7sq5w2lxucf64pb3jif0qgenpetmkmke2lm60z2r5gol5egjthnskqgd8segqvmpdqnf9q7590shgnml5aalw2dglgfsc3awbshk9qrs13mvbon2hrmzjwv3t6vcrg4pkd',
                parameterName: 'wqxqhtcxcikr35whmd1wy1a71tz7hpv3fa89b3wxbkv1v69ugcuwtz1bikjk0qfhkqj6c5juezyscqrvf0butw3xzzod5k0890oy1d9lgi4dn9tb7n4v5rm2cvqvdca6sm41vszi5oxyjl5lni8su3u6hhn223kf7niso6ae3692bvyro7wehuf5irw4xdslqu97b86nszccfzxw4f1cj54gxa0e05p8b0py8tfzoe82yi8tawh462hy827oa49posovb5ypgcbq1r4u57avawl2c676m9a5nzim12u6uxg8erwbjo9tjk86f7mtdj4l',
                parameterValue: 'y4jkxp28iddum1rgzll9mjesfmm1jeyt5eejsiuv4e45i3jia67n3hxsol1t9f1cfunhhec4r3zwj61q1q80dsth2ut59o6goeee15doihj23spk3sl2sg3ad4zjgv1k1tnc2lifqbcxkt6ckesrj6t0qiypy6pj2wi5k6xoq0w4vxc1urr70wtq1topypt18za1b8pheo0lgrzt2ufcsohikv7jopcso1qcx3v47z1ucjsabccm6o5flg4gnk7377la7vtjmnophd6oj4or599dnhmv1ebvxwyfmp2pi44r2vw9of2truy53nwmzxqw16iwouz3wmadmk42uwbf6de4gm5l8ynlqgn89dtd77jwgzdc8r91rjs9ndiwddca545degxvt4sjz794hxv1cv18m1f02hm5mmlfqnes5dmuad1ski8kt7lrvnrxj5iwrkiyoq8tu2656knylo9rhguyfg9b6gd94fxsqx84jiwzof52lmdjyg1hkr4nuxfjp2d5v77ckkn69150bfkvl3vbeq6n15ncidar3ipc882kuuz63aqo6l6o7y006e5n2xqq1isysuhoj2r30uv5fxeq3hpk7zhw399vaxasd9we1ddm1bbzpv7064lexow4udjyrak5qxtrah8nqrwxpxjy0tjk5jb860vx74ef1dzvbjzrr6wplewe9ox6jyh84anyeuu2ydww0xycuk8jg7adak1mcd34q3s6mp766so7y23znkvaq96ls99glihvg9p6kybau73b1ia7cnjh3x1r1ijrz2uph2l4gmubbw5fzx50elq6k1115msac4lebzjyya5fdkmfdcqfxleyfviaoiu5uis0ay1u814tm3smbvc1j4g64sgrxx14eld1qg37uacvbfzveh7l0f6dmkw1t2gl0bzr5wfof5qyrevw12z6lk29cr60c0c0nycsyzgun7mi5xr1mxhuqvrpvjzwfhbl1lzhy4mwlao8r1o13knirh1g59kbgxa7y8cs',
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
                        value   : '2d5ab521-d8ba-47c4-83b0-56632c16207f'
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
                        value   : '9fc6c034-941e-4237-8561-9c0d549b37e5'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9fc6c034-941e-4237-8561-9c0d549b37e5'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/f10bec7b-4f2a-49b8-b671-a20f520e4bda')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/9fc6c034-941e-4237-8561-9c0d549b37e5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9fc6c034-941e-4237-8561-9c0d549b37e5'));
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
                
                id: 'f4724feb-3ec8-4232-9ac5-5d0f7935f72d',
                tenantId: '92480c73-0317-45c6-b92c-8c68eaad32cb',
                tenantCode: 'g7d59sdbw0jbz1zkfh6mtsembpkynoxrzes4mb37rqhx23n6md',
                systemId: '26958ea3-62d3-410a-a3a2-1528f3c35c26',
                systemName: 'iwbcbz04r2njh39f4d4k',
                channelHash: 'v7s6hlzl5s7jdg8f3txg6vkfrp9hqz1m44b3xlse',
                channelParty: 'fv6tt8lj3cyg70jxcukpsz4f48vncu4ks4jd0mwujzemve3cctuhavpapnzlcuwd1rsnuxkfzqq7ezjgcjwxbeqr97jmvftp03chtcrru6k6kkrav1i1jxxps1yyv1jue8kersoi415pcrfj7wp2bblzwvofy29u',
                channelComponent: 'uh9ux4rt6dzzvzydgleva2akwz76nt6dp3h6e78ks5aeai42d0xy4xt5ffcnfq3fybrz3m0yv75255fi9pmjd8ctpnnbzlnagtbvm0kbss7ozsel2ke940k871h4eo8dpztbyiygcxoa2bwk77rab1id3bvux3cm',
                channelName: 'vewjmsvb8gh4c8dfrsxnzqfavlktszw7p85pfhpjh8d554uyb3gv8bloc7lfa7oyztxesdv1z813obkettzgabaz6392nkx5l1z3hgkghnmrnm7efz80ouekdiqxz5yhcoj1lj1by22fy6ewa7oxhhz2q0gzenu9',
                flowHash: 'tr8arlcj1h2ntph71e85dgkx8drw13pah2tlypao',
                flowParty: '36xqb3zq3cefzq0w17oj19xk34il23h1t5aajfqhn1ln7mwatpshv64xh3up5qt576idtpvsm30t5v5n59b96yoqra5kmjg5af0ba4m34u7aq2g68tlhfvlpw8ar2mkyla81oct1cs5fennh6kross9z81acoyzg',
                flowComponent: '4rsraa4ldega9l2qzic1soqf1qexagjalkbacvvg47y6yepqa0suwy5r2yy104n7yx2wt6my4e38i1eeoqceh5ewtituyvw58a4ps6fjvvem3hwnerr0jo4j3ic2blgeeresnl89my661a3qh7jva7slqn0re7i9',
                flowInterfaceName: 'lfn7ht94iilt9t6cevm9hrda7kg9dge20htpyi9qqj62lnty6uq9scdr4dekew6c4y5cm813tqfp1hoiwwcip49u5tp5f1rgxxoaznq07puj48te7vmp9veg139l8lvezyvwgcuxj09t05m9eneep9h8k752tkr1',
                flowInterfaceNamespace: '6ce5x49pd291kj938u7kkipsxk8o2fuigix2u25e6zbeai2gvq8yx342qvq87bkni4uf744d8k7e15jeehsgxck5aa63qjtgiorea58buy8fryo0butp0heimonkyebwbur917fln4ufxg6f8bby449haddgcjvv',
                version: '69s01h97hfmaqy1ydil4',
                parameterGroup: 'cxrhnfzak68yz1a4uza3nh4n1mueron3v3ouk1s584js4ytw85eorbjwhc36wr069z5t2qrod96pcankvet7auzxkpdfhxk6p8vber6kf28qesxxftbjkoepaqznq4db5mifw5wpdvl4zcsti0u1gmmu2yi5o2ci65ureaqqreambb82odti4csj3xgpzaw7mq2nsej43c7ok9og90viwm0thuisdqov90sktr4736qhx5slujbq7pwtf9d0ev4',
                name: '1ypeyj6f9tfs11t59ku56x95a1mkifd4526poxugtkiey7w5vip8czj6xqpy3n0k0orgm3aye3g7v8tqw141qp4ja6ko9p07pe9aq438dcmv642574xgfw9o9xzs6h72g1t2nleaa23nqnn6j2xqfpxxxf74tt1rgs9os1yhmjfe1lxa098okro6hok1og60mq3wsme9lks5mb3f8yqclh4yl5i8oqnlj47piqfempzrtmom76nlljys2sigixsyhyq4uu2dswunym1ztlixm67pesg1i2e6uthb11u0j4y4smgftpll92vt984fjqn2',
                parameterName: '0z4jy0o2dakpun4oekeoowtmcoglj9mhfgcy7o4zdqi5m33l5s6vgpm49kfkmsxn390a56z3o8nzufrzvj1ba6dn96p2bgi7yhtdqxz2z2ejsaqu119mvnlcvgelygekg4r01tjn68pjhbpx3hy5dupmr03x1uq342t94h4syopajby1q34phzt2pp0xo59dmwvd8ic2i1uxf5tlqocs1cu8ai3fml3n4rqjo85hrc8hgbyt1jo6efq00x7jfobzx279zo8aqvgivs74vy5519lk7fus2fdcng30jcb61143nv3s3fxr1cmpfnq3fd9w',
                parameterValue: 'v8obr0phbdprih875uy6i19yn07bhzi54ryd2tgogxi9zjhmoquw2okqmcw7yytc58o5kmpbu4r7algntwifpxh4p3ctegrz4kjjh3v36myqp6qzj685mha04z0cmb7w8d7fgim5fqi886568py1a1o0x3f3khpt70wkj9w5pi5z467vt1fm3wgnblah7tbzu8er20bnqtyjahld2qumys9hr2x5z3m8k0y9azg5n1yrrxkhxeuf3pkz8kp50enfd9c3efj0w7a2m0sbvtq8b4bujwkr3vsu4njudhst01exc510x7tyfa8zl79xoz843wtobu6rih77v87cpecc5e4kxia6a1eubc94pcbr8pbxrlprs9v4tizp2ctd96ux6ehg3kahfwy3ov1gwaq6osjpbvtu4v5wwikbvm6162fhityxaya81yevtn9x5u94f998nnfm9vboth1mu1z71cbz8yidyc63ybp1huf5ivwttu3pt4cqy6c2z4qhfxjjdkua10ajw902d8gpar0fog8g11zq77essm0drw9756722e12u1is7pcx76wx2aps1eieo0f7zmzq9ncw5ww4kum888imgnbakk0w1uy4wfklzb46j2kxrwacgb701tlpssjxgbtlfes3120lctxke0ee0uhvjeu8zqqdxocuf51u1p2yixs95do7halcnj4oiywlvjs2gzmhqbeqm8pbsg5tv1usckxfbtzz0p9056b4v19o6undx4mz89kfvg2l31447sma839foy52umdvyo1d5190bffpmxlg4c9v8qh1bjgf510uloovm0knghsuc3r59kqkno5hqpequszigk763wn5hn684w5onny83gn9zlwfo57txhkrth7p24rh2gk7xkj0vt5axc1hog8u2h03t0rjkaecy5g4mjdv6kbftaxgqvz3uhdc56wnho2bsoa16via2wqjka34dngxcwf8gkn05swmsrsc93nywkk6ly1yegrfqps6jahzm9jb',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                tenantCode: 'kkzevrvob20dvzycalx7jw63p9cxju2i9mwvx3df6ujo9577d5',
                systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                systemName: 'x3usq3r4t2h3dnnsfagm',
                channelHash: 'f43gxn2qoqkffqxxho8dy8w5lzrsr6qcqx50l4z5',
                channelParty: '75hsjb7q2rvc64rihs9sm224nr1epo86fi1tv8p7vfs23ihzj5rxz7dxgk2abjtoblri5fsoyjxh0teyf21bt5ds9xv8dzfykged6py1bchty3mh4jpf4oq7dsta4m76mivds3nleeqg6ajjdimepm4l60lk4wvr',
                channelComponent: 'u0zpitbhhgbgunr661r1bsn2r4omdnc2slvmr942r2qtvspmde1tc175t4oclifll3vipm81cwizdkbwsvcja2va42cdca0c6jwh7abzbdhly881700xxiqxf77qtamrbrbfhw5i5j4mf51ciakqjnf6ff5fypoa',
                channelName: 'h0pjhgzphsah2bh68ikil9x10vjrc2ues45w7z97j3tjp69c6hvpitt321um4g2asmma9cf1ptdj6xvyzt7xbk4l9cg7vfhggeryhyyxp5rw1skbq969dwftslteznigs2shbi7iw7xmh7uswack4ol5ufwndqz8',
                flowHash: 'hrgtyg08w62ve1bonaxagk38smh8oh3uxa25mv10',
                flowParty: '4knimssy0uxczgpei6luejrlgu08i1igxy4zdd4rkcbrfdikefwuiackv6kdberf6lk8fz4hnu9j448ted1jtpecmpf18r0t88zvprtpwfqyjlbfbj9xfe449d8zt0944kdvexiq1sd0g0vhvqnh7hc73qdtfqb0',
                flowComponent: 'jrix1eikbeg7b1a1w91j3w3tex79j4crp5qlvz97nm09mihbfcg7jt1jvr35ms64077gbof6zxsfc5mon0j350h3v4nh9pokxoiqa6qvm6pr96lr86g5nrgh33q2an7ibdz1k2t7z2b0kq3714c61ym98o3qol4s',
                flowInterfaceName: 'i9nzgkjsx09cenf9e38sncsjdvhrbtfsh92cl98wsmpbjl5iwuy10uof9v5bm2thsu58p9990rk2m3v9p65eymgtz7jj59wskmbrv5ihic87schakq980gquqs12yq4jceupxbza0dzaebyy91dl76uvbkrv6dqh',
                flowInterfaceNamespace: '13cvb38xiighg858b0hvz7ixu7ifurwbjfv67gh2fwqcttvrrb0rbh8svtzfrhfwkj7q9ml08geyg18l0kubyehyvwam5j75ezwsmz5623iad27oujc4qqgh1zmv9bxyl9nlag7md21t23or82ihn6jn3naffd1m',
                version: 'nuq5i8ote8dqiyoe8gjq',
                parameterGroup: 'oykov0st9wuufbpim6ayb9uiiqkv6s0vpmo8tj8iusaxrwgyevz8le270yuvd6n4pqrhqoqkp97z135v501v7u5iia22w0fhhmqk6218zmj83gm8ltsghe5zd365cguggh16xfwkkgsukgi5pk9ee5pvxn0zj6exvvdo1bi5fzz0nyjfocd1mcc8of4ks7vzyfavvi1l1kafa9kv5xicf0o6uzoooa9aificbna3717uo40gp97sltbkcwabw9a',
                name: '5s9o7c2ajoxb0ml5camul69tzsnn1zsk8eqd84197kpiu9do5phozxxx1r8bn2pvyryulneklx705uepotl386jy5pdmt416towtp90xk3nbm6dfiepr2oihdsrcsbw3vzq34pv5kzz1y1ms0b9x57b2h4l2xsb92zdx7f8avcxanpvs9n8h5m0me6wxaw9xj5eq3quezxsuzj1wx5rzn9zbcs8hqi2qb39bcww4nukrh0vwzc8dyu4hxiorttc89fmw1vu5ktwvylnxquir4s8o451q7lc8ty6a54dz7ojpfzuw0il2jpou1wa91vu9',
                parameterName: 'dtxyxs8wkwie8bwf7qj1hhw7lex812q83dine31eg7syh95anzt6b6a80rfuv9wbao6zz0xj86zuvkeljt73clrf6hn75gkrpw5kxqdsjil0xhbrlo6xvx34gch21jjh5yfiewtyrunnuxizj1fdf7a7pbbe3u75gcmhmtsr4swa6b42wunmpsha59vmryw7w6k3vpa5vauaddroiy3f80h69jkrmnhpdmp0vp91qn8tfvb155m0q6312a70z01ukbdbdvoko6rttm7c8xf8rdeorirusdhbtab4tqpb4prfdiqma0a7b1o8fnu0b2px',
                parameterValue: 'u8oph1dkv2l242sxnulifh5jls33chffqu13cayao7qxci8qgrrbq03jpdq4jihh7u3rsy21kri1ga1d2xvhwdei7pg3qqjlh971boz9elifuvqcsozheoykubu83fingxk59z6mgper4qjkwdbtuzkn6e5zqfsptf2cw9b9acjgqnn4xn8whhkabc8pcxmkkcvhu64axmhewt72ha26gka075l417pv0uqvyxat9ltii81r56x4rfwikfcifsmfpg7pprjbi09lzl6utspqdmb6r8dnd65fwddiv3mhaqjosxinl6kb86y55cnu9xfeaqe31sqykyxb8xc3nyifmh3sp91j2rrb1sfn8d3ym86b3lfarfay9jjahvf7astymb9q2xbbb4m0qzufcr6sz1cdpedw6oco9iy7djznxax84b06zk1k57bhrxl6ictxabg9q2pxiw3m8atsqyvhdt6dc95jg3j8whd5cfy3nl5ei3xwxrv7ket9u8kp5n10evvzgiurn713vt1mqzil9yo5tqjo28mrh3mspgqouzo2im8apl5qkpxe3vryzf0xrrpcx50cnou75xglwcsszwrtbtrkb2nf3vne3buxafubrk7us171xcczwu2191f7ze8yxoyynhsb7u3rbpsf29zb6200jo3yexoh4clf531ogbahkzbupzw5qkl8qgzoqqgf6qvu2zeszrng424121xnbvr4fuzdq850i0opwjx8wf0qyreorbgenbjle5c3op6qq5y38h09d4aaxh26i064s2o4mghdtdxg5tm6y0z2p1kaqn492jt6aukmpx79o5m0w4obm7k3tht4hvse4j2f8cg3zhnfqsccwponwzth0r32zyidgr3czmie5aqgjp8kr9psx3sheywzkg3goh65lzjuo9djuxseos5juiw2bzo41d5l8r67g7p4ythniu9oy732kpc9v53cph9iib5bfuruo5xphxmj8tl3u1x22n0rdo3dfwya75l88qjp',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9fc6c034-941e-4237-8561-9c0d549b37e5'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/fa92c19e-363e-48c3-9a44-2b2c7822e06e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/9fc6c034-941e-4237-8561-9c0d549b37e5')
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
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                        id: '186b1097-915a-44cc-9aa7-889140f07b13',
                        tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                        tenantCode: 's8xkxf1ffh5banhdjx3c9o1lcya3b2i01yvclrgap82f714337',
                        systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                        systemName: 'obta52nr0jksxm3u72up',
                        channelHash: 'jhyo9idj9ewp8go8xl9ctma4fbzl8zuthoriv2po',
                        channelParty: '3fzeq3xnywmj2fn17jkuqzi0ou9jbggeo85vtx6im4bwhx0dwhqg6dus50y3r8h29abt86u2cj8f6qcs4mlvezzbhbrabanf632yupyoq8goqhsthk9t457j3t1w1vgbrxr3k4awpvcdmlqid90jz1paxvgn544j',
                        channelComponent: 'yuw6dwbwlgs2orbuv9au3am94uy11r3upij2rigb43tw2fzmo98edib4xxz1o0rnh9npzspxwnti8cihlewglrsa9fs0ybxj7yglu35lkktqkukp0hnwsbpakrwmqbsztkcrxc2iexzwk1kykhupo9oon80id1j5',
                        channelName: 'jai487n723uxsmfkxrnk2m20s3pnqc0j4wf59qvh3d4tu16o19di1dkqhmu0588nea4scn05vy5731cg2qhhpcbnqhj3kmw6mmreqygwbwgpf3iv5gmapjphb5jc9oslhy13achj0t6bg0d6nxoisnr0u8eaatqs',
                        flowHash: 'cep765f3xemjsriybh1cge9soupy2515bnjjx8nd',
                        flowParty: 'eysoe2gkt0lcdhl2zl39nt77w4h9c4y2pcdw6i94av7kf2xlqaqj2l8dd4ht0k7hincarnfk9hgdcsvmanmai5ao4690qdy61iokqsub04jel8avz4f7tp74l2o6ngc7t4zhbg3gfagt9ozgo9oesipj1t6pwftr',
                        flowComponent: 'ln63fp8aba2oihxdlvumwnk58738irtvlwy8gl1ldjn7vaxgx832qhwzz5r9qljbrzwye1povgfa3jx3fsfi3iiv0yqedcqfrrlhzt3tqqhz5kfnlv3syzcjvmrsn17uis4saegpn9hmlmgyk15os8k7q4s7qhke',
                        flowInterfaceName: 'y5emheb60fh7acc3v8psc685866mqluas0o4uknwtshorga80gyx0c3ogp95m4weka51gvtq8e803d1xa8ja4gnt3plvelck3fazivpt4tmz2ugrs979yld2derekqu4xtu5gfrxtlxgy3mi4ffr0ymcin8q56k6',
                        flowInterfaceNamespace: '9g6aa3am7mpdih1yrhr3qfxolfzjr3bks9y1tpqtdycr09lmfprhmjztk5i455xa7jnmhfnlh2uhbb4aaynj7v1489g55t06zbsnopvrgylao1dhwhgvn9207dphlj53fw0mz9vqo5tki2fkha6g8eznvurat5bv',
                        version: '1jxu7cz18m1a1u3yka50',
                        parameterGroup: 'jyjv6pzz9m8balje28t87sd038xedzkwh4x2iqhkcudokr0n2mxl5sh77uqslqtvfbbdf7awxbftl563jnmxtd1yzg4yzsr7ytrcngdu40dmmthvx5a3blhlmuv41o3rcwrx133jtzo650u5vk24brxwmyo2dsku4bt61dotbf8dxend8170q0kc8p6xxau6j651wjv4il4jxhlg54x4d8oc06fvr9w6rb574psj6yrqdzkaimls4pi0xib6bpc',
                        name: '65fr2arvsf7bq42y6872lf45kuq49zq4soglwuw2bwk6ubf14tdh2wwyvjrk3eap30eazwoyo2ygx141d6al028evzdns6qzsmo5goo4d60oe1b0dbvye6zo9jrh71fi9dma57hyrufoxihro7qe8ziyfxg4m6lm731vavc4v70kifxb3639dve6uc76an86fb6l5ywfcgip7uyjcqp8mnhk2xz6n14jsng5o1kti8u5svxh0rwzu9mptgcpf7o1fr12wlmiet4ifizerlrc3a1xlug5alyxcjawxbmz3fd3t3o9om8swhr18ey0wajm',
                        parameterName: 'c6blkvmj0hqk67x1sjtk8gncnlh5q99vkkeqssmbo7qmgqgc34kxhxqgk2nx0qu1wpqmm17ia6npo7s0g7aj91a9j6yemwcz0hlk5a0olim6ejr6xvra8xebbwky6z97wbzhg1jt2epmoog45wm5n6thva9n7kyj2z87h2519v7opij80opv2mtdyzawmkpgpq59u9rp9ikah0cgba2nmklw3xv1j5jukpp6j7ae8akrwhc1mxmegdavqutxebe8nr13wxc3g9nzw0t1al5thykebofb6j7bv8jrdtfxdyy4pn1384kcy6fwc5r9rk4d',
                        parameterValue: 'batasx8d26resg0zc0ob8a8dge4ar58q3typmcag7v7bhnwtwt6gi44u5e0q8pbbv5n5y1sd6vyvomags3dar7n4z2skzrsdytc74uivmy7ve6splm4fjmiwifob3s6goyuzjfc5cktdgx2c26casiegr0e2z8j6blvdfqzgcysap7n04n3q1ge03320nkm42p7heoaye4f9ozmyvld4lfnfh9alcpk1fa2b8p7h0gv0e6ksfqlucqzsbfv5lu7bpjv3qslog4u3icfjaiz9mn8zvxknq0e1eo810x6jgvdj2g2sbkppyy81pri9kld32gef29ohxvgc7ynow8sc2pgp3ryod8s4l6g7gi89anh3salar5qr53bylv2utxlr40q6oop31gda4c17bmmrxo5e2s4xg1rqgd96w668nqaa3xx3idjkjr4flr41pzm30xumnhho35x4xhdr76rtp5mwmujxsnh6w482q6pr96j6gepfmgmvb4ln7yotw4zelkig9pihy8mc8zlriyxxab72o9wcbxqppijvs033zadyn1yowlx72h9899tcg6wfbgkgcwm7zx7c6la5neaqk7pyz3bgzmvz3kw3najwpnls71ypqbgxs6d1q7ibjquq25irf8rbs9twu1aw816enm4bi8hgvnb0p7jxp4bh4p6jhzfr5qxt7b9tmhekb541koe7q5gddqg1hycxujfk8yjab7h596nthzqeyhrt27xv2sv8q3d1lru58cfhjj8tb0ssut22h7ihor62nyf8liom4l8i3hgch2fh66yt710ahgwm40vsyf2sv8td9hfl0fo6jylul871cw0x5v59jorlq4ma18ygrw81rzk88pna5eb8rvuvvw9degf7zvsdwuxd8mov09w8sca8s2t71a5zngiol80pwb0zg3falpc080ilqovk95bathlm0ek4jtoqincu2a79uihafqr0xe14uaou5vlfi1wkhb7rxr8p2glm8xmdeew4rcd9qqnn',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '186b1097-915a-44cc-9aa7-889140f07b13');
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
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            value   : 'bbff4af2-22fb-4a81-bb4f-61dda45563af'
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
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            value   : '9fc6c034-941e-4237-8561-9c0d549b37e5'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('9fc6c034-941e-4237-8561-9c0d549b37e5');
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
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                    id: 'b23892e9-c158-493c-b483-760e6acf0dc5'
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
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                    id: '9fc6c034-941e-4237-8561-9c0d549b37e5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('9fc6c034-941e-4237-8561-9c0d549b37e5');
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
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                        
                        id: '4bf6f999-7896-4961-a3ac-2b55cdd7bb37',
                        tenantId: '3589b380-6573-4ec5-b4c5-d8eac1ad4dff',
                        tenantCode: 'wpynd3fllra7vc4vfihya6yxm3e5bsijwon6w210hsbx0hyljc',
                        systemId: '11c6d32d-003e-45f0-8b87-bd8fa43067aa',
                        systemName: 'xl6h8fbthecltmbbd2u7',
                        channelHash: 'fudc5xe436vl8fd9s0saxwpr8ndwwrh6btaavkfz',
                        channelParty: '6qmsbuc55mfbkgnfsstc6weypets2qzjnisookanaob3j379oygpepvso2fn9snzdkbfugy2bxf9zdf90r8zjsb9fekimqbvtekcgm82yn7k7vdl8k85m4lu19c6pt2m7ufzmq4eefvoirobijx05sbxs2iybnaa',
                        channelComponent: 'a15nlzfxf87ap7nhvhqf63a7w9n75bwkokbymp5hj8fg95jkkm1bttu3r3y8ehlo523ypyta48al5alvm5xwf799akyowz2oswpm0dfu55ots087jegoch2egj35lmlc3khpglecji9m09al7tg6sifgp2dk7072',
                        channelName: 'f3d4opra2is2h7cyocfg2erg27tnribyqmv1bofj303cq1spxg7apu75ojcwt5p8v7nsrgbae6dlyufug4rlka1rtac4dq62aaw2vbt39pt5rwtkfrepzjxopqqd65l01cfjo7xls3b25ovyryn3ebj5o894s2ra',
                        flowHash: '4g7ih19asj3rj8kvc14tjxm04pkvbhv5dteuepob',
                        flowParty: 'u3v9nhdzu0po97rqbqzq1ebd1x4otkdvpq3rkk9letzkkebwx9zjuu8ty71ee47499itzuqag01l9u4pqrwtq6ru1mo4byajbmio0m9u4o0ewqpjg9lvmdsm87bzvcpn0dvshqdpc3zy1eejou134dque7m9b5x3',
                        flowComponent: 'zgk5vjm71n0nxnl4f8oostcpfxakd4ekj68y304rw9k83yoktlvwtlka8z8vfhiub7vtchkjure0w0gjkz10pglk68y9r3ltmu58my9w19o3rnpk1ft64e55k13kunkfuq5pjw78t90hsbh5yn0q6yclku7dif2h',
                        flowInterfaceName: 'g952kw3pud4bg3an8poxs5tjn23s0tnisyuin64tthhms7xf9m2mif07whg7wzkbuyhtp6277cylwjapcvjk97u7w6t6w0jgsmpd22im42yhtooito0qxhgs3465b7gwv9wnyxkc6e2rey2t1b3mjii3kd4wlkze',
                        flowInterfaceNamespace: 'xy0934omxlp9z4xrxw0jys5av6369bb3z9cz8r75z9644ucces1mtvonxgtcld7k84a1j575xmsc75m81sb44hz2yp0c0ebdcvmskaxhdf4642tlnpnbb3dnxfi7bvbxvemypou6c2y6byu1j47xic1lu6djmxxc',
                        version: 'as1pj0jcbml1810iid82',
                        parameterGroup: 'y5pxb9ayuvannz87w982ou1cci58zm7z1tuenwsyw2qbsul6geun3bajxraork3qhppwc1ee98k7egeabjxldnqphhfzwij4xiko9x25zpk1ytfv0zf9g9zw3v3bmaz54rxytyd7gwj0k171t7d55au1fy9105rzbzk4vtdtgb0udjadbcscapiti6dzfjxzxtt1aach2drhvhpumcajongwwt579htzgc218aicuk1kbkis93hq1pjh4c9vel2',
                        name: 'qj23wzlo9q2dq7jp59447tz3qc6icdcnevl6gjqdehhbrnsbu36xpbusqljyhs6dr4z3k48iw949qaqmc358zd6hg0pc7d2qq43gf64a27fe36angpwm5nrfube3vmxyv4fo8933tgcwg364wtmhbvctl68qt0h4y94zmqdx10wlf2lew1vcy85t2nuih3amnmbzb5fk1pfp18tm4427bdm2wbqtbvh4k4qhrpln1j1dbsmpha1t7p6r5sqi2lz7886revrzor26k18eebu67r58caixa77qmkvzf4516isar2zj7uxi0pc3t1oph630',
                        parameterName: 'a4s42nwiey4o7aykdhd5sp6h4pjsmuboelroa6w9wjlpwtnd341xupdne3mpetk7rj6xlaq7ekeuxsm7xkqm35640t33krhpsj1sdxcxzs7l3i2ytt4u3zlyn1sdw1ll803yb47oik28ny5y4q8h7rdd0mnj0vcxpcmbso0jbm4qrh9l43367wjx30tn8mfyionplc9757bq09gb2tv6rrzr5czyp2hht9qjgj4b81nchjctlev1n5rqcdi4n88ad0gv143bdkxbwzep13rhff0onppyx8oldyfn0rjgjlppgnq4f3w63i7g99g92z2d',
                        parameterValue: 'v9npdp66ycqzsweivlk3x7910wt9klfp6ytoascvk1naxw7g93mx8koimsc2qxisbnvjiyq9fmd9lr9ewas8uh806zaegn65yildyolgbev34gehzzj4px69x2qa1aty0jjbeh1rgbleiyft25uwc1dmiw2m21kyw6scb4zm83eyl7ylxexccbedfgsb9ordj3e36e48dcckde3ishv54bat75tf8mqw5adlgmdz0inuzy0lprqardcg4aeb1jsn0ccnx1vo5arhlg7uwe6l305be6g1liz2oc2i26iu2i1m3d26oqiljkr5k3sdgw6oj45m72s40tnlzw0sg9tbm6onwcynv01h3c083dy5k8j4y8ws588zc8k5yj2nfb0cjv540rez42d0w9k8ze6apa4weuc7elqycbmkbrpsopvf386uaiihraftl9623q696qof2i0x4z1kra493u7wzdmb8o0k77o28lnqn1qf6f5unvtdn79tkgcirjk77efh35gcznobw6zfa4rz53oywj7nkqyfcw6a73e0jrso1lmhunu81dz4elmolhtny10gkf0jux9zpwq14qjpkjytfmu5gwviamwuccocg1pzs3mkrv5k3iqatu9ep5k7r6ezqhbov9fxdhkh9twelymsaqcclomst8ubf31dk6zxcq2g2pm2imen2rj89nqi9cg957jclljwedrnkf2o8bp5kmw6pi8o0s3837p5bcxcjmquwxpelbabkn4kqga71bj0f4mhs5of53usto65yy2myurp1xhi7aufzwwb1f8jmjtbzflhq6fve4sp3msvj6bnqufi2n4e7tyjri2afymd1om7mawprz7wteb96ooh9eij3oe7sorabman1a2097bke0x19wdlgolx2gu7c3c5ol3e22bzyfru004hkd7zwxf0a74twpeoclfefwmb1p0himkjudasm4src1gv2mlp6b5hb7mw4wwof5o0lw1x0pfbl1js6c6biavwy6drqyiw',
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
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                        
                        id: '9fc6c034-941e-4237-8561-9c0d549b37e5',
                        tenantId: 'a32de94a-766c-4f44-a089-18678c3d49ee',
                        tenantCode: 'thbisaa92uvtv1v3g7p2d1h9qo1xyp8hxqk7i2u97osltonehf',
                        systemId: '1a7aaf01-5e7e-43bf-bdee-acb54d74296e',
                        systemName: 'z6mlun5iykubcp6xqlpo',
                        channelHash: 'dhzznjpm0zp1vhz6xt86n3r4qczs5b0hcguynls3',
                        channelParty: 'idvw19mtwa8jjydy8h57ym7sopqodpx36ht6becsceb79y6efzk5ruaklr0sywi02yc9c9ly3nh49kiuwle4p0cj4v122g6dq4ynnh2liw82s7s424usmux8ri36lk83200tisue7roelq0om9dgojbl9z4opo8u',
                        channelComponent: 'li6xpj3pomn4o6bcz6xkp2dr78v1ed3y49q0ogli1b03dbh6njy2lyk7a0fashfkgm8ljz05rx0966jxd8gv67rvyyxnjhymjic491fpciqbnuf8oqy26msgageaz3jmqn5znwlen8uru3plvcmmupzectf3h855',
                        channelName: '2u4llzzenn40pfz2gk2rl1gord3zvxze1zxhqv1iasvyenwoczi08knlpq2lybukc9v80rm787s069bbo23v4xrzy154t6w8h4mesul57vefpf8kvuszpwnwc9fx53exiya5li0asy1cwskkot9udumrhwpq4llu',
                        flowHash: 'ovhpg9pnbjwkrruxuxrsjxc2wj6pzyjeetg0r3cw',
                        flowParty: '1covs9ce5sqv4itynmssu403293emqup907lcklxj71ywhkndx0hmskn6ebrxgwy3ls82zqlczox7f6fcr85kde6940e9tpen78arveakr1e2uaepw9smpkznsvk49muaew1ysfrixatbei5uagu3tp1p8bh8asy',
                        flowComponent: 'kkwlroj7dytrkeomtzw1jdcg7e6g2qxq362zo6mdg15gphf4yius6rxjcl9da795x2uukp0zgl32cbvlk8bmpsz4utus5mmdngx57udkhb77espvo8d905p0ci2k3lj5gvxa150t0u59w01uqn1hok7282maw713',
                        flowInterfaceName: 't7krdlek4jaooptpkr8f5i41sva8n2pxx9c8hm3izbosufogu5gzrbxpuelcb4se7l9toa0mnjaqv61wzd1c1401su50u0fqiyytbmz6g5ndgdilm33gdndf8opoqk3a7ugd728kgyzxe9abxm8gsmjqhogbbne2',
                        flowInterfaceNamespace: 'baj4lzmkzhnkcwttq8bwyb9pks8690m171espn512768b8mbew22ulqs3002fviyd4uuvba2ezlw6zhqdwo5raom5hv2bbcwyeywvfg263ab5ho9cvyyvsxp970izgkz92xn0rv464ozjca42ynr5gd67iatbxi1',
                        version: 'i3njjku13xmcgljb3htw',
                        parameterGroup: '37ptv8jvj4p0u0bqrlpg8nx1qzknz5hh0w3ibpk8dgcveqfe985pxrzsvk98agv9k13fgfzy5qyrdkzlc78l4rlmdhls1d797akz3dv1av5lwqngr6scavku8sqcvmeif7d7my0mb3y8l8xxoerqnah6v1lt8o003m8gum7ngaa9ul3gvvty8wogmuwu210br1v9b5k21pflekotz5c01t9nijvirym98u393ld33890g24bpidl8rzdzhg5w7w',
                        name: 'isgeuex2w8j2kdk5u3pk2a2apnu3h88hrxth4yrb47tfth4qsvfyyv0q3qxn85rfmr909j4tvbyuab40u8oqznzo33er1ifwco4zt24npb2x0golvl48c086yxvl5yfqke36c3vvf695r1tlw32zs51zegf7rn9dqi99o2ozj3ehh64b0b4tnb7fbudkhafkddfk8qmivbsqp7nunpba5cit9omnejrdk32m6ys0by2uilob73gkbj94nklrmt6njabsr4y5l7i297rgh12tx47b1juyzbbbzeq1raajw0btst4tu7862ihf14s3j3qx',
                        parameterName: 'e6kh567nav51cnwwjp78ug3yin0k1zwavzhu4oq2gbvek6m2kttsurx68auhck9qchym70au0z1ixbbgkq0f0g48i3evix9n1qsi4m9b532mo9h6gotoz96erqxgppbv3vl8c35k8eenbnnx7sa7arqlwe12nvoy66mxuck8fztxa9gbaip6ks1as63deiiv4ow9c5ljsxgf1vjvegnduz9uvj2gt86mbs6joon2vffib0j1wet3vhxeg9uju8w8oa6b1h5wc77gsd9ins93koro90fesyvhqh6nxcfyd2bg44i5kfbj32kucbbsmi98',
                        parameterValue: 'n9j7717erzpwu5qwpz4ns0o2oehv859r8ghhm8vikmhv4rmrqczty8x9ajcp5ri47m3kz3zc591vi8s9418s41igeaozor1djc0qfs9jb3ky6aoe6ibj44re4kleqab9a6pv1l0la6b4080z48c35rlsm7hjgshnjqsbk3aw1d5ebi6zugwrwki1hzm2h2r6virz73tmqql4aiqb1b3mlj5tf8dfzecpitsze33nk39yi7e4j61iwl7723y25jidvbhdpi3hm0o8ekl9px2phqqnojz61xkhjvcvtw3deep4hgrgm4m1z5owwmydv7aaf1btmwgrvpnh4mjroyqkmopmt33nsqsljnaj2krynp20ogfxfhxsy55tr0uqcx2mnzbu28fdz73lrh7ke6v4pquu1miserjqwf56racp8io38x24ev2745z796qsckkp2d6t4a99mwqdo80y3mkcvcpj93joooakifj9x34slwxuoj6k50azff51lz3uzv43c9zgqpqo5sy39xxf6htwo9lxc11q3n3gofb7d5hz6630qgcw2g2pt523lj1jhs6d9jq9rvfak2cf6p8k4bc4o7s69n7oadhmdw92gy5ui0b4g6sqhfoyeq5pcyxf1iebixchy5vkvpm94wpnl91349b3w185onuny9h5k1nezzbfgmxmgh42gp82xl0ajoh1x9zno9ez6a16xv60bp93065h8xybdux9pfp7dgn0qhklflmmh7k7pqoyh8mdqeod8e6n95u8y7u5jp0m7hwo1atwf8bhp344rx0fd9mwbqoelxqxtspv33uyouf45m2qixn4aowh2ldh361yuddw6pdmd0he9v3ui7tcdz1bvmzlkb1h31idnd1yypct0glgub1x8uw2t5mpt8tozn6sp9kfyaebpqgaqj3pozsimt8btnd3h280yg3hlzxn9ypfhp803chamfgxj3fqgtv72420jxe258gayli2gr7tf9jgumhhqkfyq3kbc2vyohhp',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('9fc6c034-941e-4237-8561-9c0d549b37e5');
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
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                    id: '4f015333-ec12-4f30-b41e-7f7c06852192'
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
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                    id: '9fc6c034-941e-4237-8561-9c0d549b37e5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('9fc6c034-941e-4237-8561-9c0d549b37e5');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});