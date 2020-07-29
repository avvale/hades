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
                hash: '6cntgh8upnzt78us1ykmxqqehcy8w26auyzsu6v0',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'puvozexogqgp6qk491ju5z0kte2h4gxfbblvk09vx5yuf4t86h',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'zgu73kxba4xnt7dexryg',
                party: '9p3nrl5v5hnrtdoxqzf1o422jjtxyahe5orrq0uzektssni7zvnqh1xzdmmi8zds38lp4erpkx07f1ba4kgsm6nyz9672ykmh3oqy9q9b2p6q29puth66xs8x7ch3n747ed9wm7zk10yox40mbcu1ahilnpwmvqo',
                component: '3y0epxcrfdgfotqukrld20d0gg9ly6sqvlntnhg49dlc5r452a552uje9fjp0kjem4hspzcxxbybe99li6awww0286ungkh4qetr0p4fmvl2nf8uxj4d6o69tzb3wp2sq1r3rqkzfpnoiqo6w5jm49bw0qtaws67',
                name: '0ysa368tjp6tcyxywuy09upc0kabfc4lcb6j1pncy0frk7ci9h3pjd6owkbqydxpg176wse8yn0lb5dzmfjmtb3ctdh8lblhf3vb6uytwv6iq4on7qgq62gnltqfi4shoikaj6hh09lfga7yi7entql52rftfxmq',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'm84ujh3ljw2o6bawzs8xf4zsmjmotew5a4meebwn4zoa2cur7mr6qvfifn7lqyi64uslmxan17rqaj93c992hbk3rqkvvnwxmq3f05dkkfe05gdj5qn7o2pzrbfde9vmcst3z88zfxkypqbhiglo4zbo5z5n5tx1',
                flowComponent: '09bzvibbm3mf3thu9uak1gpw0p380n44ad5rgke67ylkeu0sz4q7yqohod5bs7bs00hfm6uho8kqk5pjdlw676wcjbqibchv26dsfxld67gf0wjmgl3q0m6fnrjoshnoq3dyog9g0njl0ddscca9znteqchjjijf',
                flowInterfaceName: 'hzk3w316ma964l9h7vrgfafs0akksoqs6e0ml77vk7grfr7h1kmo0evud7fv2f8t80untdyxn2u5qz2670kdxrfy9oesi3r7dikzlqf5383b4lihx47wfrb0n1rg66wc6x1a61xut60e9yqgxr341ry3vcgxl5bx',
                flowInterfaceNamespace: 'msiad3l3hrg8pc84cj75mm60denifmw4dhqn5ho3d0rcc9opapa0fovzj4hsylwkswn8iv15qyqttvlvockeohy9ybmsdfvledhp9845e95yj6xogfdlnq66ze4vn8qqoo63l3cbtlr8i4i6992pba2jh4dmkfnf',
                version: 'ilee9r49e45vt90njoa0',
                adapterType: 'd117p0nwrjpo9osf8ba163ft7vs6jc82hw91irfypr2c6tmx2iiarir3bbwx',
                direction: 'SENDER',
                transportProtocol: 'ph2sph7msbpymjuq2ppg0o91xwv5e1tztg0beofr2iub8tmdjxjpje7oji2r',
                messageProtocol: 'cmdx8hvz2i8jc7nem5fdrpej6jzbpxfhj2baw1xrrfxwbtti03e8mqirhf4u',
                adapterEngineName: '4o6imsneghzhn3km3on2pn6kjln193iaz6c2px9yepxizcirkz9g4eqec0of895vocy8fa7y2yuzwrpvo2hqbvxu0pixnzowv9ebdadizex47xsenxi7tzk35y9ucuu9uuhsg0uhxpqpp8i9uvp05cvg99ocvfwj',
                url: 'mq2f1mqzcvqyar8swza5ej75oql2q67ozr4jgg0c2vddd1bbha7ht78eh3sgzvq5yo4mwcnq2xh8lg0x8oy1f0e4n187uokak28hk8v48xku9m0j34ulo05bbzeo3kaf2e9rt6huzpmmpyeqdsmvlnxxaa8n4p7ku68wzfl2j21eywnih4txmyynkskmfhhx6l2pthhf7c102ni8wtz9gdk70bwxn0f16yg6ch7ag0kynctcrg6gnx1ytgnb24pkcpkukapx64nejmjfgahm0x3t99yzulwnf6ir44kud3vu9uq2rcripus8zh5p9vp4',
                username: 'jv18zfpa3rmw5necl58rjgvwv929ii2oso35hl3iw0tp6va2im81tm9y404n',
                remoteHost: '3mofotd3sse4vb3v9m6tx7sn4w1ucfcti6vr2idyb4onm3oc22imlumb49hxoy01wu17401p27qe42c8z3gwqa2p58re95hee09sonos613bov84e8sel7hm0u0i37wcind3ym1g2c74xo4y5aq6dqkd1jfi7zra',
                remotePort: 4632818067,
                directory: 'gr256vx0asxhsdedz72ar7ne94vvwck3t7auo6eoi36rha4ooihwrbzlli3g7xz4nrmg9lhcbdm2femgmic4wdhfn1xhifllwnwqpe5kxoiuuctgsqyepw3r4wady1wr248h7lzuf02jwz3surtkb3009hf6off7c835ssenkk4d9tccvu79sxde5ffzo74ldf00nv3tm3a9ider7001za2msgpbirbfkfh4ly8gits22ypozcqu9ys1v8c2u732jwdeb6ux9d6rkiehvmubangbshq84djbp0gwc9pcfc0qseolpb4couwv26evjnggawrko214c48xuu9c9hir9xvaw8lw0g5r86baw7a9yw9ymhspg4bjyvqqd7ulla77wvpp1517b8q1vbz0vxyr5n5u9x7570ms5syh35mghrr1laccdj5iixwsen4b2515jl1m4k1pvomjiwe740us2vmga8szrz2qdzofh6zakohspfy6zirb2adb3tb528914drq1qwpff3jq6me0p1gzyjhv6jokzl14x7r4zmufdgxb8pir1skjjojpj1mpciktjlxt2yx6t81ejkn6ks3ptxubwjdtg2g47eujzx2v35jl11lfxomkbr8cn4zqh7tb1tq2r02agpzqfqr6yfygf3mk96z2dstxvc4ix3hu4pl96owcj7we2harf071a38qd5elqin7ffztntnddf9yjx71eooial1ez581if45sydqivz0kezmlc4kho4i8v7vyu3zt7755qllheyqhztt98oj6n7lnju6270yz3ub4xhyc61a1x049m199444sy9ae6wvzil0lodgf6ecpy4xu733rjpqmwby21f4imci8w2gbblopbwhx88dt7kmdio9lcxeicw57duw5qgq4g5e5d6r9qxaukzukrfw9x8wgnyr9zm3nppia3tbj6fmzzb9x5tnlte0gfplc6j4f3z0yqtxmv4k66csqvxiilnhnkn4m4uh4lrblbt3uwpouok',
                fileSchema: 'ph55xe378paqq5qsy42tpovd1yxxrnpnmv07prd629ew4bf8w2vya5etrwd3v3rz2vy6dyjhxhcs1sf75ez35k980igb0hko6k19kkbq9kte3tiosn5b6f550us9dkubx1mt2cnxovwhgij7moesc7t2yuaul1kbknq003u9ncwfto9l02plqz2k05fknt5t7txyew4ot3a5psx8pylfpgwkivjcze4irapj4vefsdxslt5u0v8nr36uiyepcd8cl8lu2rhwsude5jpcb04a5m0up01zl9o71vu9jrjz7rtiljuaw45gq5tuhwqmapivwe98c244pqdysqgz4a0f9gut940qsve15l86pzsg7blnul5ewa7807w2av7jm3trcjyrtf5xcqtsfmxqdedn57bnwwft8txd6d6ksp2gic3uxv844trifzegvtkli3wctk1yejut2xkem1spfzb3hx4v3dhk81hmvrojidvkqpg1e1l4doq5jlo9tg33nnceguas7bh18spp2xn5hq8fdiaor7o441lqr1pprh289qt2zqop9hpy9s6631r9y6e1nqywhqazgwonapwl04hphnbc0avd0zk4ddk2sdf9tt2j2c99hvhszk7fqh6sa1vggmtpex4gvejkh4kkh9h46fc47o0tz43kiui13pxpb4j3wwis6h61kp4brstxbg3f56eaek4r24086y034rmu0uwja995aa7on5bnh9b9hr24zhh21yj4rchfdvnmo5mqjou5vzodpd06bosuvehrx9w6akv8fngr4cixx5jlrycrcmcoxyf86b4usrrseep8od0h7wpwdkzbijhnqb27mn5nn61nrz4a1enar6k299vo9ebo1mnhmioiy9i959zrft3g4bkwz3n6xtjzwzxdjfg2l3gniy053ba3sk1lhj0t7u63rxfnba5dfdvn4ofqwx8nh3pi2fgbg7q3rfpa2kr0sly1syhre5fnhzre0cs6twz6har81x26zu50zj4t',
                proxyHost: 'oq8nqdc9euqaglyjvomwpa24kga9w1pyg04i00s5zqojfg30jf06119tnwvb',
                proxyPort: 4685317108,
                destination: '5wuzg14wdsuh63ajmkfknrn3xxxiyo905tt0ucwn7eiu0f1493imz0ff6l7k6z07i9zbosnxymvcddgu6j1aowi1too0ibxgz5hkvlpq5dcnwvamadis37kkhbrpnvdg8gbh0mjdem1tj1f87dp86mvm16xa2o55',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9xid6dfb0eytn6szxfzr6q98ka64tytrjorvx9g6qkkqjdxe8dlk18kinulhg2powdjneim02hmfbu0f5okn43ywa9te16yhs0hx9qj42eyv8lcwk3x6pgura70niilctqax5gf8t209z6ephuxjebbeq8m5hznb',
                responsibleUserAccountName: '58cz3qofwq4ui47dq6ns',
                lastChangeUserAccount: 'm06lo0eqvr5a2b13row2',
                lastChangedAt: '2020-07-28 23:07:42',
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
                
                hash: 'b4a8qierg1y8l04icoupndhi2hna7j9ocjblyhe5',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'h33d67fyjkfyczo2z9ozohsjffygokrkacl7wgg3g00a9xn5u1',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'khyrkgbpryisewgiliz6',
                party: 'wss2var5yyo3bkr1mocettuqw8lovymof4sxpu0pdgb6cb2260xqejk1l9j6hyo79vcx57sfbvd06lbozlktimja8zes32h1h8a7xejn2rcagwq5n86x2xzcr1uewnl5ogn5pd5mmqlv6b4ddrefh4ofx39exjs0',
                component: 'ic5kziturstm52fnjhe7mrq2xzricbxbax56pyowc4i3fu644ez8t6z82ew454gn9s96v0pre184jiwvi11xcf2amf4mgl16vslemdh2p4j9htvcausrr5ubucn3gg5v1o4osbucpn2jrgcsp3hcqeahpnen3kke',
                name: 'wvg71yr8jzfi0tpgfgdymxksk7o9u1ap0bu7yvw4cjkhx1ubs9qbvias89qhpgsn2pdsl8q7xknn2wn0ni2g7902m11seag5tu23lm0u0dcxfg75y0x7wi9t7fjzec2t02b4cyslszs51kcb2hjlc3ssbkcphsp9',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'qkw0w774opnnfkj5g5km7qpkct4f5v81wq410p36q6kzcmgos30v9yqx1p77yrvy8i3g29bqnqrv81ijjgi30auza2r1tohunl0713hrof3fyaerp1o0lpt5gkxoodis5z9zoxibnvzdbxapsll3cvlv9am7qght',
                flowComponent: 'jl453v3oo10s0rwpzfibg97488299dnkz5kqv8m7oq0ws075hisaz4bj9vedmzkr4vh35r7xowcve8nv77doqokp5tebj2avhzjqbenzqj6sxhsnrzntl936msa54f6pddoe5opwwu1tzccox5tkhqj8hynt1sfo',
                flowInterfaceName: 'r166jfnaui0iniuygpw8oqd8u6cz558pes2rk4ji9hcvi4lpbowbxl8i3e72bspf4rmwwrs0cq27jjyxmefwydewp7pnbwp776f4v55msu43zq2vjmbmezk6psimmmfl8dh5uaf4jwg26dwad7wj45ttyi7pca10',
                flowInterfaceNamespace: '13xl2y8i8bb41ve6yg6ufpy1b7vdofufnkhf08mkpueow0d4ropdgnkzon6zdkozqejx5trv5icwj7id4kzpbx8i0l9ova05izipadckl1y5aszcfqphf82uy48nqr83q7e9xo9b4sfjiwh1ep4bim3qxupydyd3',
                version: 'k0k0mn8pytqnortuuzkn',
                adapterType: 'x43x477fhy3qn2qapjoz1jcsl0je38xuynu7ozgm2kmd1tgln41rqxnan62q',
                direction: 'SENDER',
                transportProtocol: 'aifiuwe537wbu8dl3d16gwu93cutand2fvbrgcwbwdkg6kqj353h7raqy3qc',
                messageProtocol: 'vwr9uftrajiv521hflwh5yn77vy1wqof49yvhvsdujgyait75a4fbfd5pwvg',
                adapterEngineName: '2qvvlqcd7f6ttvy4zi26k3b561s0vs1hh2r52fbflc7yy3p2uavprqd77ia06weg43fiwx3vjfnjh2jkdkci7lt7nzi4kgwot2s972fwjgw3iampjq99yloa6kd7rtsjwq9t45flfg73et9ll7eiugs5j9ll5ga4',
                url: 'lz0pfq5n4pnpnw7c07o8hy4kyujlh53sqnbh1yiiqx9avnahaw8fp85ghgmq6gkkpfy2m7rc2po63q08jbq6o64xvf2nfirf3f3alyz4341q0sd4gtq4hoahddpfwm93dzouo5h3dylypyz31peq9oaynosafjmm3su7sdar2z3dtpht21metbxj9gum9fls81na8y8va6e01qeqfbvsz5i4hecialadeq3bu2sqy1ot1ija7ge3mg3l7sb6ktztsdjqo65coaag01jhjjzpxrg8ouqctrmrfl7tazz6j2gzpmguxicgaudt1ffokw3l',
                username: '2ec9r8zoki444cu9csib9mqv0pxk7aiffgj6on51nxj4mfnxcbeh2g3uc6rx',
                remoteHost: 'gy3djtbr7rlglp214qu89ov30q1j2i8qub54haq8j011fclgqttn8mfowh30owufpc8hnpno2cg3gy8jprlxtnymfxs4sg7klsk2j7xazaywri0ikfcxjao7sokqs5mzclr8fqlqmji9bttopflgicuh144p0aw8',
                remotePort: 4828069342,
                directory: 'rqpxlfddot35l097u1j955byvwsv549r6yw5hmwnccpz3vgy13gev38x5irsse17a2paqjkg8ovja97n1zgakshawbs2ar9zlvf9krak2s6ounmebf98w7gyv0u6h3le40pzi4f9n23d7ytpgcuyk4qd46jvdxhps4z52hyi15oz29v28aoj2vqdi7a8x64k5sscvjzc3148yiuxcg26x1u0rbd2wf4cr74xgqa04kowfqhchnp05bdri1vub7q8rwyqdyyv55owajhu4pzqzi8odnw86x9stsmauq0asl277owkjz9pjv1v10vlo9ehlz1lrtt3dz59rpqn1ldczmzaz20j1f7ixit3dt54eqre0w5kq4mv12jzreufoi2chf5x8ovqpvegfs8yeq3wwa0e2oeyy6hqxok7bl4lrolv8edctr5jzkfsvoc59e72cy3e5spiq0287cczhw80gpflih1lvwq9kof6f17hp6wblditj3rn4bluxf8x7j3qgb9q46918avdxvy81707fd6fhemu2sgkyndl84ecldijzwry1iy0eeeolbzoo38s757totcb6vj51yggw8s88wv00pat9b6373mxq36vxlofccbvkr2aq73dfcyc3zg4r95tnxpzi1pxt42ld5nvlwyomjfxzf15zxfyi5j9elez0zltkvb5j6eue3ucoxsqe4q51gz3j779xg8tm1efknw2w5rj4igwmjoq52mriimbr04g8flfr6z74p1c5lxk9mhs57fda64famu8ddwjhh31tws2fr7q7pknjcfkl6jm4jfe3x4n5rjwouxt4b5a1pc8v9w4fixtetz7iuvts59jltyl3kvg4o81w9t2wtcwxzw64h66kxgmxuefha3t6fb1771rukx5w9a68x2ifcfhq1msfp4eufwq8kfxq7sgmb3j6ot8id810yl4ejw0dytbck4ek6ccutwikipbixodiyyc1693n08d3icur9s1o9llyu390hhfiyzsdzgx',
                fileSchema: 'vx4sh7buymd0xrava5iktp3fteqbsgvkvq1sjvomyj95kd04chhpnid14irsq2lpv7giwa91gs432gxr02av53uqv2o8xeco0eldmqntrvfpsud0ba2pnr8pvmxisviqlkm52y0vameh31ph27zn74efmof6k4swvbahrh87oq0oql9hst2fldfvgp910dsg14i20uwyf7b1bgj169p7p8q2r7pgpdibej5mhhb23ri8gqdov0p1kwv02lj2tqg20a2qkfmdq2gcilqoyjzz2z75ygmfutjrce8fhnv25bzhelqn9u9fs2km0yyssjto55m9lsbyup92731wq8zqn6faxb2ernugaf5nzkr9tgq7d1leytxmdnt60aisv8weyaekq3pk48p6byoh8pgkre8uklj0o0u2jpc948r1qc7le2xjt4bev057itx4wewyc87k53znse271oe18chv4sel44vkf9usb4tm6vfk9gtasnhr1qrst7m4a2k7m3jltgthh08nrdfeqbl494rqt09pvmczinhxdpmmilkc2lyssembu2x96y85eox0dapf6fvxbqyu9vn4e3pgeedyf2d3a14hx8qyd15i03qjcci10j4ktio39s7zvh0nxn4mkxh9n8ppxkce5511lcfpagkv837zz23unk5cxg43yfeo9zt8xml70kv2fqxh7l43lgt0814vi2q4uv6jhenj9zdbox08zdza2v1cwib1blh2qdf12np26iwvvs7lnjrvybnu05m9i3ow9oo70g6f8a15buofmxitqjfpefnnarjvvnfycx099r8r1nqlb3x2i6f6c2dzn06c6zmupeqs79ibb8p48wj4vyyi81v19smhgfik28n8p8fa13lluywxkrbobd21x7yemez70qify9hyknmbruv2qtummlynhf1dwx8j79d4l5noc23epq2pr6uoze2pg20bo4y5iumbd96wzc5yvbiyjdijb24ok5ukqioqcw0w1zynvzuepmsb',
                proxyHost: 'wf56z17mw6b3w3dqwv59k7s6ru6ge3jzleyy4evqveqs8g4sgo8afpl9tj7m',
                proxyPort: 9532054961,
                destination: '7jua296gc6jpfy3yffjttklu32g7tutx51jqc1x68xsomheyhgywu4j5c9fheke6vzev4mabn4vm5dva875ab2d0c6ec6an3haurohxgts5k1cmzgzoaxqjs6cwh9cth7rqmkdm0y4m838q8pxdnr2cbynv2s8pz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '3q899rdocw7w5hxb5donqldtba9dql0dedifx4g67jrcv1yw5fjvan6nlnopu0kgg96v3n10yljrl1muzyo6i7l02toz2qeseh6r9k1kkpjl5l95xf9ikk3st14z652b7nobjvga3sj2qyql3lx9zualqnavlggb',
                responsibleUserAccountName: '4jujyjkksw0wakdjq12x',
                lastChangeUserAccount: 'in72umsri50j3q9c4w8h',
                lastChangedAt: '2020-07-29 06:12:03',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: null,
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: '3daljg4m4nm2mswxzzq9xi0z57nkxk7nqir3egc2od1cfvbvqe',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '1jypjgohzpmcl5iz4ob7',
                party: 'jlqgt9qtywnfa7ks93cmttqu2s7or21j5n0jmyd0r17rcd1hb88x1dailtzy18pphwmiwl952y1jtnchyis5uamomddr6js2tqsl6aa5e0ee4skfxalhcshiyvmsfvkb9p7xnglfp7xwnujmsp50vdc29hsoluae',
                component: 'xd6d9o4cvjrr7bu5bx8cayzks5qonn3pdyyr580mayyxknyxg1rdtdfigig3icmwuqr5em3urwy8nvkbvy9tpzyhmigjramjqnh5976heun5gslrv0m9z6uyu220g6jiztocfgkeht1t83f33lhjuy2uaiud13fe',
                name: '0qbak6we55wr48d3kbfob8ccqy53uea4xr77iik3h99fxgil5u4r4vzkz0amkuwo3xahxi11kgcswk6r3g1ub7a0c4ije6ax5icq27q456i1goq8n66mw7izgf5qigdgqe76kmybkqfbz0lt5ogggnddhm87msii',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'q2841iwsoywsm7a15b5on3vc4pejklr8bzaxcgj78gsdp754uyl60lfq60llm795y8w6sq3dagq6qnjtdl6pa1gpjyp0z7z3n0jxku6kko4g8y5ez0j0j2grl8l87o0hud0vqplivk161t75gkxwp7q3ug314pya',
                flowComponent: 'j3urep308iwbpf7ne7996bug797dhpm810mvoclnrxay7h11erv8nbipicttcwf7gi551dq9u0ghkr37owolr64laupp4n9fkj5bya95mw9e8yuj2x9uop8uhd4t7j29s78a2eq1dhmdt4g07c2tv1nsveijzfqt',
                flowInterfaceName: 'boqzvhlxht1wa1hroxamjf739onwvgt6ym6vd60pu6x3hct9g0cm5gn09b8dlhvo8czzndz41i7hupyjtrysfn68u9u9opoo33e5v6phx8cfk818ycjqxfdeymko1tvtxt7sq5bn2rezn8u5p9iwofxuvnc8whgi',
                flowInterfaceNamespace: 'eehv9q0dv4cdvdknalfb410kzlbkh4ij9a7nk0557pm91dn812v24yim22wj0mlfhdsn1l7m2l2fly6m4llcfxk8xy1q7l2il2e9w7d88trmeeq1q0drbqiphnz1cp2uwfl0n121oklqvmj3mj8j0pqyq0u205x9',
                version: 'vt0rzhv7kelle67pj35g',
                adapterType: 'wz5ikw58wsc24m1w5xrobhdcp8vavabzphok291isifj7kwv5oboa8pgdf16',
                direction: 'SENDER',
                transportProtocol: 'klmcqex92wpkbg948s6i7cqyskkcwel5r4oo2imxjq63krc86lhvzns3bkza',
                messageProtocol: '8oj1lj463qm5t1sxji388zcfjhmckot4i9q7focypktehk8rym3oqrqj4dap',
                adapterEngineName: 'rdb69cj2d48o7eol3svz2ocvbrvkkzadcpvwbv37sgb57orot9ryn6whoenebipgfwju17vp1h7kvyuo9cw7zo5k87zhj1ds9db55xx8677uqh3wc2h3y6m5vyh1pkcaw86pwwc58rqke9ln98903vtcx9f41tjf',
                url: 'no954iw09l4zwjgysbok76b8jwy73h2ixeai9269mcp7gqdqk3ev2o35elvmub34rs3pnch7yvfyy6rux3yv849srir1errhu2b9uqs2j1ebggn754eje4skayf1j056d5ojvygr6nvx8djd6cpustymq6xv60rq2n3zjs50mlqgo7836d1bkqnjqqikinrakextthkkvfr2ssm8g416qvutw4k516b87hd5c4hyhzic820dc6r9rzuuh1q9o9n8e3379g8opazdrdy637fn1lm0lepkabqf15eqdcmo4l143v1fyn7kxfhaxgqzaj2d',
                username: 'ivg98ww0k674ei1dcp698vhamqgsn3ny8ky60b139sqsv3bfo85fvavtsquj',
                remoteHost: '58hjzgl0vev0c679l7zk9ajkeirvb53oua7i7e9i8swfiw7mjpmeyl9t5kuiurckqcs66n6pcfxy2m1x1adiy2o089jgh378pdvn8bfkl4qhtk7npz74m83i7it5p0ojc5t0ed83uyl6lhbvrfrk3s0dijxxjgg4',
                remotePort: 7135843191,
                directory: 'p76zw0robha3y9mo0jjo8zwuqnrxh51d7o3ry0yv0114o47hlibt3tm7a9qzcmb7ryatczif9gcuofnn2qomx4bcd244wob0eecoixkgcl0gtlix9qb26q1xqjtkrbcdy4bcxxis8ix8o7lq3sv7o5ytjn3i1pbn2ughczfk81ruva3vciy5lyjm6uy6wjta025k9fr8wzvp8mmd4qfbf8gm26jsoqhyccam2bciapvda93i82p9iq5mx1vgchsvzsyaievrubz5no8vhjyin44sdyxlplyv85wn6rbojozjt12k3zrbphi1y92m4fbmnx2ab225u98nvg6kzd916o4q273gc56bc4ayw4wp5ps1oozt4ojk74n3gaa3ih5a6nldys5rf3nfa8gesolwkth8hdtl3ih5ri7hxzme20ye84e6yg10wyc8mcqvugkkf2dpf4rnnjtwhsrlwiysoqi6g6inuof5sqxv17y7l9pymy6a324xp8kboyyvavgjk81qz5yimyudex0jzhjyob1ahtamd7apnyvb2gnripnq8ljcv85ryhxjwhwlj8evaqxwvbgssysx4zpc22neyxec4moj24sjeq7unb2w3ojxabgjo50t9ccuyrvg8z9jwwc6tsncptms65ju2tjkkd3v8bg9p9610me8teyhjn1442h6j9o6zjhixywgqc21buvu37m2oigtn4k0hjp3ywiimyk8iiinm0z95x2aj1vyg1lbvwbzyb7bf3zm53v1eu5xkzl8d1n5lvt3mhhjpn3hm1ij0p5ww24pf1flt1199tal9488svfqsytuyplde9mvac20ln0h7afmoy432ivokshwqh3rnas1aqhh89uq4tumuerr5dxzyyffvi5hs27armtbok5j205cp9rm6jlyx2gu6m6glbpglyqkofzc0cqtlfmcb5rcj0ydx1c9lbi5uxwc3sf58rronce8qzpkl2dxf1rhkopnumlvf9oe2369rkb30gs2vy4yl47z',
                fileSchema: '0eojbo7g93nv3t7mryshbmqr1gvxoofk7zxiitxahrfj08gksnu4nd5d3npnfhw10ybanabtlei1xqd56gqof3yt3c83291hhnrsa4tay1odlacgtqic1tf84wt0wdvo0i1iw2qhislcz8f7c7oovrtu5546yzmzmi3ku6y2slngpyd4t9f3bytprbezp8v4f9w73xyc4b1glt1hu2k6lj8mbd6axylyuwv3uhs5ktznwr0jkgiycd7dek10wti5d3o5s9m6sofg2jf0cmwl76gz8py06octs9gpk1erea2dsesjetshk4aayqf1dam6xxnkr08nweo7a97ow96tygeh5dl89kwk9jqluw2qhw76p2rvye4zcv7vg7o4icn75di2f4jef4q6xb9b0kz2l7eckmp2nxxf6ilbyebrl0elj14bn0wgosbje0mubjafka9rgw61nvbp1gxksrhskrmbh8f1rrraadifhwhy6y4u19nba6glq7ukbu2wpigsv8t6ebcsox1kjzk5r8tsw5jrowulw6qu3kmfcth8miexx6sjez84ac1jwmx6sgzare6s2li8apt7xetyryi10iff7d7tq91lz2nysy2sl1xv9wmq3hmg2py3y6p06c1o79z8im5uobeiltyrx4vhicujmxtsfixql5ci0m5g1keg1ehfzznexeqagk5jmd7qzpsl9lgcwwtr6n9341w9c09jdisiv9nhdyce42ecpgugcj5u4c1e2kod7a9fue6ombib7xdv2ibgj28ruiad6fv9hla5d5b992oe97mdgfdbf5uvewljv14nm9ro4ksw3jya023fdkd5ltq9mll9axnly4cq7koouctgqpf2md8vbosyd7y9xu673jys6l7etnrt6zkkaigpghpr089zk6av4ag7rsldp4vrysfpq9a9kdmw4bd9f5b3uzndh4b8hgfi3c4v9paev9jcxevxjuyluzeaip46cl2obzgpnt4jnt0h3tkr03xlg97zfns2',
                proxyHost: 'k9eu4mdpd27t9xszyclozipaphpfh8drrsqlztincawvii11x41e5zhw0pse',
                proxyPort: 5978813520,
                destination: '4okbehll9bm5vnwf78aun2tgtz4ttluko0zkip9ihdaq7ix5kf8eluevs0mcpzrh2ebmmphqn0ozucuqq1mugcaqoa21msgoycqqoxdr0uklji82lfg5iekg89cd3nhyk2itq7mv0p13h216mokbr3r9iybc9hel',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'oj30dgo7pave7387bcgd62adwdmjre5gl7wnhkbt0lgj9l5yceamkvloj9hmvybooo8crrqvnxa7gl3jnujywmbj45kvousw3wk833mfp5fg0xk9i8l2d923dbg1rno9af1wm52nka26qx8oj72cw06xp1iva7l8',
                responsibleUserAccountName: 'g84iwwwjosuuzguic75j',
                lastChangeUserAccount: '19uxv3jufyj66mv3kpsn',
                lastChangedAt: '2020-07-29 04:00:27',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'j4m9qpboeey46vka9shvgbkrzmc6i2257ez0js9muux7lkckq9',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'ixbo2g5nvwf2lp1mhm4p',
                party: 'b73e82xon1ys81zgh0zuepncuors46nw3ceglv48lya4lq4hch5msjv3elqq0cis0olbwbu2qiqqmbasvgbm1wf1rzvdufzvzld7a3uf3mf6pwlunj27cg4pudd5rv759zjy7e5caly0nbexpw7uwkz530l9xer1',
                component: 'rkthgwdvt6vb7bn7veswskoickenue2wgm6bo2agseneeuzij5gi8z6pz5s5fqgc7plcn4iyymq3z2k9ktjofoakpc9tx873wxehwrk69ifz4sk859joq8olwemo1xvooi7oubh4331t1l4h3mdoa59f5egl7pmp',
                name: '8ywwesm3hxh5qlt72ih9nnteau2rmnhp4m7rtnv7ggbi52a7ty841tlqn300snzads2dxqnf9ze75lyzv1hdhw3zgq3rq9mdj2m6sa6kl7nggo5lvjfxx7gkol1926d5hmf9usmf21zuolvucwahkx4yz33ff3zt',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'k640z5o00i5tn4riz3p4baxe5xrvg7bhsd3zkrnx549b01pjxs083jmf0fdf59bpw9ro7xc8pu4p6qmne0jprpqxzqugl3cjm1hvfb8591yweqhr5x34peadvfnz1afuxz8mwejrdfb6iqbkdzanducd3k4kvr03',
                flowComponent: 'p8cs90oga568mm3y6kar1vknlonn0zfyg0lmw38zx2x92ipdsq5t4vqg26izmp0br7svq7cmzhu2bqznqqeliks32o6arratwm8g33qix7irpdxalqu27htpjm7ev6sn7fte1n97vs17nqd70pzazjzoy6pufya6',
                flowInterfaceName: 'b3suta7ut6icmzuppstawasg37hjv1epnrliuib1jarnmdozwzf3na3n4aaubha2xd424yr3xhqpxv2xz5l2h1aecbx4ee7i1qyza8rcck7lh5f6gecajjmv6ssicy9fs2fyler4b23cp6gpzwxqzvzlme3sqsq7',
                flowInterfaceNamespace: 'uqhkibstht216wymb6931lw25ucf7bbiluaao6wmj1nuqnsin1y6w63fdtypnsymavrtvsxx376m6q44auypqfdm1ooszyc5rqahq7jtw9b0fphsvhim2tcihtz2d0etkmr85qvrxhli30697hkcr6h1fjaquh2a',
                version: 'bzb1b3w0v0mhkmydeeik',
                adapterType: 'wwilucjabkiyf8xawba5m7xkuvo3uqkaalzaw0ianuv3wdteg5uapoj97dy6',
                direction: 'RECEIVER',
                transportProtocol: '30gf81rqu15m1ixo8n8k0flqnwrkbirc9u6g6wsd5uoczlplqeqne95xja9j',
                messageProtocol: '476k4fetqrhfh2885b4qk8tqj6qzc2soa056j3ntbv983xe2jm9gr32wjujl',
                adapterEngineName: 'woge46rx3zbt6o9ag36pzx2vb6gib7p455yauevcxs672zr6cuvymslf3h58qy44zpyjdr3ay7388pq4a2hofhte8d2iwm23nn0po9505edafa5n1y86hf6wkuj1uko8phxi1aj9vmwvgg7jz16htiy2sioic6eg',
                url: 'taivcs5sb6jr4lw3lwja175rxhjavb2432u7g78be5cj4e6t7jz11ypr3g1zyi2p70jgf9go6806lx0dh3kgcd3soxvhcz0n3oxixvb65gzdnmumq13emjfq1n1cuglb7u9mm6c6ngkj793spsvowpd6uvh6w1807wp6n6wwbqtjlfseg1219mj9nl3gipvi0kj1845jgkwwntosgf6lt588oh81zkitx8gczuwaktzklhcbjct6926jf39hiez36saz43fhvskcvkanzbshk7pg9p51kunfbnsag832ilet1anb69x92zoviroxscjx',
                username: '4hew79t3qlzn6ug2e6sbtlzfdvrmb2lh4j9xmt9gp8dygre0s6v3pvabr89m',
                remoteHost: 'y7zc5vuja8ix47bk2q081uzxn0xcthhkgfyed028q48mk4s1ng7xvcfyl523faz9slk2zoav907izmywt8oqtfr8zypes4nmgsnsokltpnqucjfm1v708n8z2ctu0kjin1g08pp1j9u2a99gmnsqca1wkhbzvgow',
                remotePort: 4045654737,
                directory: 'qgzyewb1iphj4jy052iwtrv6r4yw95x35v4ra4m1i5w2cbbyrb8l0zj6bnm2mbbsbqndxlna89w3sx4x22jvv7op2s3krptpaxyt009e0ewd143915ighqavkojb8sdyx1lpe9qm09962lywwv0u3mk4pg3q9p75ht4wmgt6d3yek1rlxyuky2xsjr616o3xg69oo7mh17t6mx2oupu8emnciv65chi13lvula9i7jz0ify9luosegpx3cuqluaw5smsd5femfvbk8hxcfb1ngnht6r6dj614ncbkmuictpsum3lc2zq4a8gs4t2x7xhk7fl9q8ax0375wgq9ec3ap34uhbynl7z2e2y4l07qwg3mxqdhznr5f4nhb5lt63g32hld4ule8zovpnmvcnyggfn8ylzbcd4r236f0dgpy0t11wx2naxiqocbnrred2wdi1aoj2ewwh9lb26meiizhwknlxg8ykw3twen90b7okemseojb1t3ezjldhy0tx5n29fo1ucduffxkveahj4hfhkjkafl0y138qtreiri7eax2hx18b92kju7n15771go94clyhd05zzkb6zy1z37od710kgmyauemqs9zkzyp7gzxduau7kfxyrqlgclntw77s0fpg903925gwt7f7fttju4gk6ewpz6fe19ux4zhddfzufrrjqwm9nytjymlp1dm0iudrv7h1tfz4qerihj2pcw6alzrt0jfqqobeu6az6ge9dvaxvpiaumygr0wrlcxw9w11wzo0v621eoyrfl461o77uvi68cjrrs5fb5nv0g0075hhmwpx4ncgfbb3sx9df2m287u505agbs8v3s9uynun6wafjfojchp9loh4ckn26chcs9zsdh6mt7ktqpipveu2vqelunr72wgmazgit0n7ce96w0cnytln2dkrxee8wi13iddc878l47wju971rgkorancyd9oyxk57ajdz3h8hewdqtqlr5v8b2kikrm1sj0rhpuj9pm5rcbic',
                fileSchema: '84mw8jcaq9l6mt8x9m454viv4h9eghlclq61ysg1el7woyqfpyzco7t8lo9m06xlfwcj5etmv8mevhjeg6grq2uxkcq1lc1bskynnnvau5cpkflrd16n15dumc9bya0xyar1jwyp86gbwz5lm227kp9dpcj6eup0vkgih0hlnisuqh766z7gmsd9acmir76ctzlepoh4c78duo6xivhadpi37xhhs15bdhcf5cwz67i1w2gfbp6r8kzu1cmueb1ep2cabf5n9rz2euqdd7damlp7qytfoayol30mjfxftqieh7jkr3314p40yd4jnnjb9dp4boiefo81uyr0v73a7r1mo5kka4u7cpgq8iauj7ulyjuimn245rx9p71dxuc4j8uzvdnmwmcnq3nm0p54ml4np881dljfbiv4ihtubumdbfxh0lu77tw1lrr5heki5wb6ub1o7z5pdmspg2xqb4cfimw7i7txfoksns9losrvdtq01p5upp3anlkoh7adwmar1k5o0tauni5ckxo8ykms83xhn83j780kk834ibiylqfvflghx9p1ia77ekefm774kmdu35qsazumbquszbw5h2ofve5gvuczo56s04m09zf1r52r3akystxzm6b02pbr4toclts1ic0zm442w14g3xwkhllpsheb4n98hfmg0kmcw9uht2v4941v6t6wif1v85j61ny2letmffpo480fjqgh3voplvqd9mb6gxrq9l2xfs18lvzgzzpx773r2zu9198gp78hrxkysbwdzyp6y6t06zunovs36b7v0jtpda14tipvbjcp2l5bgmjz0wj6kgx31r4zvw61zxvl5p5k78ztekkel2g4rminqg369m00wyc6pn4wy1judb6jpfuv5ogrvb3bahenbv63ml9gbl9fn1ejxdkk8no8vtewm6t4fc8c95p2m58fybcmuy69rcr4iucx4uy4dokdzfrsghqtca7iop8w7m1h1num5dvd6vpe42afxee3q1gs',
                proxyHost: 'gtmhl18ladsw02qso26u5l7tmst89imk03ri1zju6jawedu5kbvdwb3wecf3',
                proxyPort: 2892272822,
                destination: 'kjrydygs6drmmrpomshzsp7g1ierkqtwb70b58bdhq16h3v7zj63jft0evgitq3yjz3y8dsuesuhcdz4zscn8ncsjjv4d7k5uiltuyt23l9wyz7k060ixgvyklwwoivafi3hxwdqmuv61gy58f8zggy59yujujjs',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'iiovnn0wxs7m28hjnbyrvm8yp0v25l7a8z6wakclwmnsmpxphq3iyidoip5373xtrrtoyq9o4wml2en2zha0ixscmbk2yimtdj91s0li62xqn0235adq252nlmusoft5cmpi273re1amu542wjlq9nbflsmhj66a',
                responsibleUserAccountName: '7nljeqpg44sievenpw80',
                lastChangeUserAccount: '0pln82dn395opr0lp3f9',
                lastChangedAt: '2020-07-29 13:30:18',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'ep1ewrsu3txyayxh46zdjl2pkhrqphijt3y0m0sk',
                tenantId: null,
                tenantCode: 'i22bwxwszbpvf6t6kw6ifykaeh0odxbynrj7szoanrjsva6900',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'hkpme462e5067d73lk9m',
                party: 'xu3cjyg1ehb1pxagqeptoonmw4a37j3jwryepyr1itl2yn5gtpupbyz0qlbdosht5edtbplmbsza3t0rrk49dlu3o30d8ylov5aervka9vaonlu1b1w5gcvw59hdh3nbp5goqpf04cuihl5i5cr70a24e5cwe15o',
                component: '74my82w9glnu5imfb0gnwxaxak5og49s80shtni5cployvm71ynp5hwouk8tu5rf4ttzu8vbrz9dd236qoaoim0njfasj3usewjrmydsw5l5t4ylhp27ft680al2rkwyxaya0zgodgavhx72jts3z1p9iem7t1y1',
                name: '3fkqh3ofc74d0dfj35sncuenecomfn3lkpmy041nt7x0s8tmq74vai2hyivqvqg279j3btphj31lwwj78m6oykfix454zeatx32ywzagiyhgi81b47391t1699vdl3z9ztht6mvf0vutcl7t3o6x3spqqytefycj',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 's42h7au6cm4ppelsg2qirpqmn2y8ebp701j2mkc9110420fcl1bar6za3inxwdkk1d60vxhi736p50smqzdwh72rxon9r1ptg11ydz2qsxlzh0q1vc4z4o7ph9bsvmmk2nhx7c23k1tjlld50wum3ln3dj1ckir0',
                flowComponent: '0kvtpgmm2eqff3n9crgf6xjgv46u1mzaravge7ts43lrwitdjxonmi4gkft5hwuzpylsl6f1iilhlggve3d78dbdpnyj0tbikshcgobkle6by98nu3x6iamwxmz31id52tw00u7jp4knahs9or59geiijkb3j9qk',
                flowInterfaceName: 'bpab9c0wctc9bni2bujun85ze9af97iskkrgjnp0jzc5sjvmb149val6d1qr7nuxxvnuftz6050na0ajkwbwn5khqu9q3wkwk6zkrx4e9f6s5dllxpw9ofvdjxr70dtavl9lkuurbcjl6sm6wixwlkfxj4i2yevp',
                flowInterfaceNamespace: '3rt7w8hjddni32khtfbpuo8tmumwklnydnbezs8e5up5lvo7kfluhwiwdbaefj6a9jzqbpbhe4hrqe1g27qdlh160996bu4yvlwfqv7xdbums3rm523cg49xf5dqyw8ukjo327v0xkmgh7w7kglco0r3otezuw2d',
                version: 'u518cpocaa5w4odg1p2l',
                adapterType: 'b3wf8jacpmu2oe47plx2v29ivb6uvpxdd0q60xqzpnsku1lqhasnv65oa7u5',
                direction: 'RECEIVER',
                transportProtocol: 'hpic6183zzxhnf6el5b6nlo6997xt7rsb6ihyv0a5qalx19ofbinq1z97efe',
                messageProtocol: 'lh1eutc6mqci6af1lwaux148dxfp9cth5hqnpcbps42wnohcfqffozsv6k4t',
                adapterEngineName: 'h6iss8knd0ahq52iwglsehfp8mqv6st8qaygvc0v24nxi30n9ntmnrk7q6j8h7dnwmqtengx2kifvtwss5m7dq9tks8pf5mh2gjxegxsdxact53w891s1o7a9zn4u23vz55y6w4wpx3vddpytzjpl067rer1rqm9',
                url: 'ifvnhcp4nc21cct41z72ezdxuy1pwhno2hlxndvi8pmil5199qdk4vso0rrfbbfvwl62pqioq9f0573782sie7c1nqzxkgivqqvwq79ye1nmokkneue84ie0zcesvu5qri0iv8fflzwjbsfz5exhgc5bqs09zizg6m3s5cv4oe732mbnozfnecajqm1x00sdvidtaarqs1z5gnsqlp5v3gsseobtbublk78gszqqhxgt0f72cy6u99zu05x72h1eykppl8a7ezox0qks4omuzxyesksjnuh5bnygr0rbmpwqm5snpmfipw4jpid1sfn6',
                username: 'guctit4krtxj7zoetowpa88jqr0kjks112gsbg3qbkwj738ar7bycba15ech',
                remoteHost: '3dkvvm8q5nbrwaxeqswkc5dsrzhfpu2jbvwnl5riq7m6wmv0gxjqc9t9xs3nysfb9o8n1ya8xh51nm0h7fnmp4fkhvyiyf0oijze2j4priodbs6mo0t0sxw8kng7elfsmln2vnck73tbbyy1bcuhwtcb4i33qqym',
                remotePort: 1996302515,
                directory: 'zr5rftcwtfq5l9quvh4qk2577z63ff5l716xixz5k98ejyol38312f0pugyisfim228geucb67zcxg51wg8r2wipp38i45zhcc62vhmds1gws56zq7aykap5r3e2jn16boepkwi59eie481nov0h7ajc2gi6b81hh7wavxw7x9zvrsx0nwz5qsb2ie5elss88ova4ta7jjx9wodtx9r5we8dtneeaawi67jvmklnml2luxzzi8x9jjg0o16tzv45nbfamyq64fk3q5mfz2kqux5x10r3nrmn8bgbfyobix3njoiwyf767u7mwcp1ay4qsd2khmegt5bzlzo2ggbzxfasgmvvjf9g97t8v9j7s5cf346ilv1st851eoshurwf5rb2tevvxoy23guy21oa6wlhumc1vysc60buibbao84oiy1w84goms92lnr14ur4u20ifbu1deiytjm54b5gn98tbli9grbolvl923pl3ds3dlb7fssohl0jrrdkb3vgvrcidjt2d1glwtaa2d3dqrmtgz7raj0vdiwii9iyzi6ozqpvhscppog2jpuf1bt9874wb4ovhc8rickkujl3v51kvboazdstw286r2swmbj25q8hjpngz1qbdpwjaz6h9ezj6v3nv6yt8p590r5wyp8vbaoeiixwyovh603w32gg01iei329x5vvct8u1vr2i8hi1x9mw9c6p1alyxctg8sp3czm8j1bhth5lcdr3nlib741abmgwepivuxdaikc9evhn1m93m8safng8qj2lwx35nj5elw6q2k1zdhv6yolh2bwnud8c1d97pl5ffxb956stxwgfj28opeavb9ingz1l68w9rzuj6975ynwy5wpktcmmmz9ekpidv5bm8xfz7p9mtgbmmslsyboro8zqezoiwkqkcyhy2j70l90s2i9omjg2aw7rwhit9te7w2c7dseu7lppr97gut75suyvhhqkzp518tuqu1p3sq1ap67b47u2p7knx8ypeuvjvtu',
                fileSchema: 'tfyc43b51u0drwgihbhceeoovz9998602x02qf2636fcpnl87dnjmp1sgh9zzlpiz6l69ftpa5f79n6tzx43311d62u3nilh01d7kem141k03m0g0c40xeswq2n6nvzr1feole7rlu6f4tvn4tc80gwn5awa0invsed65oocw2vm1fww6sduhotwww1c774bmg6cvhn3sw0qw66w22ly22cpthtq8scesnbh1xr2mxod0y95r0qfty79wemcrlvn8ectpdruh3xvz7i1oz5ypa86gvn4ldkzscq3i1hmcjmmzgx6ome9zg1ep9zr86jt6ybhraccfuqxwdc18q2kqx9yjfs912ua6zk0qlwqz0ies5aode605oygas9de3spwqk2zubaa2v3g1gbm89nfqb3qjtsz9dqcpt7xbgnicyqca2m4z3fvxl53yrqupzral40cjgvve9vfsro6lgqgakjgoz1z83nr8x1kl2ntk9iiwa13luazm298z1ic1ny5cotcogjnukh7wht2epi4ddpplygpahzduslpdmnp6fy9nxk7mrfhkl7nbc7gfzrrl5rjl3re88wcdwy1r79uecx0ty1wztww71ltrg1esdkuq0bxu5sv51zkecz2espz30lfejzgz4zlkcrzcvyuj6qm0ufg3a70ukjotk4pgtdwsjah2di3bidtrptxh635i5ge21fepnkgl793gvbcs31umezi11245ebyxfyrjg6zgrdafj0g0f9wdm5u3bdy9ml2dkpjisnqd9az9vytf3a5qakxsgxgytpqbsb2lrkw2zjrzsqdr56suzjjmj4d5pcm2mzs4e1xbr1v7zdk34mo8y163vm4qxnl34armtm3jpnpk3t9w1clhqf9nb5gneiutmoiufqch0phh5kwzrgm6c90e228x3sl5c5a8kf0cqvfq3kdtl6h91ipayl03etf1ejttye4itkiefqpvbakanf7256inzcjazq8a97wy17kjang8izd49ueuyj',
                proxyHost: 'owbh6eruc39ax9c54y34r7axxsvg56bdp2tkgzps3r2zmne9b6je58nf5cwb',
                proxyPort: 5296914412,
                destination: 'mi20y8en4t60n6ugvtbngbac8lwg9atmzw185ijjdmfggexewe5n5wvjtg65xcee1uiqoyzvwergee4a9jnsib57zzdfknouizx9lzz3l0rv09eyxoisctjzpkel3gj1u6ozaajym6lk1qlgzbfepdnw6bx4zjk7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'mkzog447xasrljy555ws4t8as67lb98mhd5x02hkptx5sr7pjd9v9imvn0og6zsp49x73e188a2knxbdyrxs2wngmonktoaift0fkdolr4ibldzm1kjeygth4y7wkby120qzd4ufmyactp6na2ghpyzavcw0qpfq',
                responsibleUserAccountName: 'u9l592pseg8eba7v13ow',
                lastChangeUserAccount: 'qyh62c0xkdm2m9npz5i8',
                lastChangedAt: '2020-07-29 03:52:50',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 't5z7t8bdj4yg62e80fdnnwrsgrv3jssyuhkgzipy',
                
                tenantCode: 'kudkzxzriy6jdxp5bnssk2drsa2gsibd0fj1tzmurezritauwx',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '0t4gn6nsy28j90m6k1g9',
                party: '5uuui6vwstrlkuz2jqiaekdi9hkc87srmw4w61pb4nm8zgrgh40fc86y7tzs3dd9gpyapgbj0gigv1qeufzvg639jwrykbpiwl6cyhx70yampcqzqjoa9f37nq07mmm3sxlqnpfouyauloqcdars3cu7ysax6nm6',
                component: 'zphfu9s4ag0n3bweqo9qfvsb7auqvjm9yvtq5amdollu8xqh8p34blqbg1cl6txkjng39tuumaly141u9957s4udzkbq320abg3ugq8jlwmte9t4wmy9ix3e5a02pwyjd2l0sa648i4t9o0whbdval1xguvb7orp',
                name: 'd5sz1rmcavuonoaib87r4txizsr18v64df83z9giduep98jigm8ipxdkft6ndnmbvi8ksyvqs2l8t6f7l8qqepq9ztkcjr7k2rbqzw912vs1dj8momn7ugmxvtp5e89sco18afnpr8hjblvk4j10ra3wwk8ptpob',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'l0jrveiolt3kocwyon7pd86a2cc81lk1sue0ly0k2g4d1rx1tom4y7e6zipthgn6hlszk5k6e0elkfy1cxlia187ehfkks3vv0u11402nrogi7ubkpvejzyccajb19hmvfizl9q0s27jizgj1dqlebg074taw3nw',
                flowComponent: 'zqdxm8960975b5ptero337glc9y8ehs87j3ckgeolbhrafkn8ua78btzvkq2v47amb340g07vmcnrnqc6hqpq5vjpoag5cvzmn5iz5cxawm7zf20ois4osqlvk78cdw2uxgb8zcehvhmfk0ufv7vhcjhgn0z8aqa',
                flowInterfaceName: 'y96vmgidkcmrqzfpx4t4aa35ytqyqy6iq6qtifqyl7jk1eq0cwg9roe2sl5qkmvipsklax8zgeilcu6v5w2kg3ozhdlvtp7ijf4sr0uogygrszsfxa3oinb92xow5n9cwtkyo3e6f5kn7o7ln1agh3b1g9g96wj5',
                flowInterfaceNamespace: 'hu281e3hv4jz0lx95y81kly2ylt7rlgrhkqydf5axqwfbbusnnp9nszqtxqw1pgwc7qe0cbjsykstjwyyjg3w7gzu7iq3fak6zdhc7nchblupvanvwupf6wdte2w3bae687amxes5x2igbqve2rwe7qvmxnd1ru1',
                version: 'ajjvefl8xorocuv55ldi',
                adapterType: 'ox629p4922tridnki9gb6uktwmeykwxipdyfvmgn5t7wufk71ss534l6dio2',
                direction: 'RECEIVER',
                transportProtocol: 'h4t8in1ntxbbz76mz0kmovli667erjukq6rjh7pk4ae3id5o2f41gommp7n2',
                messageProtocol: 'ld7k13apsqkpcgg13e4vpc28oeaq43ys4hmwcqlaycydzsprz1h7nv6mfukm',
                adapterEngineName: 'x371fowxjfc2uen8nh67tw8aowthgy9p0nkw8x5b46qjebjlzedhkh9rfse653ccbisnsok18ena1ym9c94s14hhlaobeonwudvvshgf7dy7x58i5wnvsa7uygaeujccdkrvyq47ifn1et7zt9c10l6uxgn9wd6m',
                url: 'wplqkb5pyh0ap8j5br2iqpbs3h387vup9todt258h3rfgr1mu9hr3okq9oj21d40gpjz6dmwljltvwmvapg24s2uvmwdod4datiiurr7tfjgx0ylifmtbk5gfel9w2vpealvtu4vwladc2xd8brhzgajdui5369kv94r3m7dg2ezrutc34wjm3fe8qk7etxzclez0xy53vlu3wsqnhuldjd7iqj2g58743bk8qmdo8xmthxxycj60p3hr3xcl9dajl89rof5wffdr44zbh9mheisszl639m9jn560w3pr9mnl3035ji5sruezpyacpyg',
                username: 'gz15zqu8f6q0x67ilmteruqlcdzell92ooxwrxevruh46nyy7sxq6pz1hn8y',
                remoteHost: 'k16q9hqyyg9sdn31p0qmz86cezzw7jv9ydjh2qlc3h6cbu5t4zedqirts9t8zcypkl6pbihviihe0t6e7loj9mjohu9xj3y7xj1gyk2joslku9kckmquzsed8sa7ts4amjbn48jaeam90kxdud61qy8u5c60x4dh',
                remotePort: 9822062230,
                directory: 'amge5fv4cjwt05hdco4iqbilvyqq5jrhlv0aihudxc2wps3mo34fo5xf5qslqc9qtre77lejvrnedxyqopjdiwlheyoyxskdlv7b2gf5dx0zt62mwy1jx4qh5yhoj25ypo4wqeq4iydnak5k1qufpee6i193p4bvngc38pjvcojlbt3ckqedidmtelnjpnus60rxorybo7rcwrigqhtjobvw05qg7y74mi90d0d5ubaodc14bqdansv3nnsulg59qy2zwvr8bg2gtmfu92weccuzordpgs0606ghvlyredhbq6jm3ltcvw3vgzte3s4z0zaktvmt0b1214ix2ojxp010n0p39fuy8ibsh8uyeqr2ocio9irlzhr7nokifi7sb9ovlct8ord3f158b8d09jk1az4hx2qiioueznki4muzljv9opufibhvrzhnsecidjj47wid9cbco9wjk6uomgulkr0mi7mzfnbcn7eg0grpt6acn0bmzjw78blr81w78cktih05k6cyozjzx7u4ochwa8eth67xj6xw06vaswrnwpftoexckxedav4xfx5as8yjfipnnwj028vgsrmxjfvme5xvqbcxflycw5o8oumvalihluit307997zvdhbyfj7yns07exnd05hr7tda33ly2cnmdphy8z574tnduvthv9d5gdb0uriq988jyr8pga2ajlu4n9v6orkyg0s76qvucyvat5n2m9fal6dxnlgdbpigfylgtpr2v9yv4ywzgo6g6jp9phfo1yxa86i4fxd4fbo7xmmqyabby0jevb7qxa569fx1wegc1i9297gzvmrdppxjd6o43nmtqtqbmfqzpbogc8jxfm979omc9flv20ykmky41nq24ziz92t4llbfafbw95e33apyvsra9ab7uzlngnmozbbmiqurronlmj9qdqq42td3ph8gd4gpdyu9vriwsllg6us9vnelkwlmf7xsc6q5587j3wybldyfvow24f63r2jig6m3znvi',
                fileSchema: 'f0gc7dq5xfct5nlol7bnlhq3ijwdv2adhw4qwda7pdup8rhtgm8b16yzvic7zcxkzhx38qefld0lw8jcohv74dxc5wcxudrslo0y25g8h78tnhxazk4oyhly30gnni6ccd06vjhzqv6ljz046rxc270763s9zkzh93ne55xe42xvwkcljs8n9ukdl5mh303u50ol8kggnjxpneeswr25n8h39zoohfdhaikgiet8ww4ku55iyx719defwmn9lsmofxkfmzi7xfu8z9lngxgandj317rpha2vvsn863iwsir1gwgkwtasnjihf4c8ca5g45r3r8xiwkfb4iviis16urf6nvnwmlohaiyjvvngkhd0xh06qryj4s69j3sz0v9igo4uiwblo6aoj6n7j824kp8wju3v0kc5nwriw55mx0wg5nwehpbwnim0nfmxg4wmxmzm6hdmuaohmu9bllrbbwycivjf1pip9hycuttah5m0yijbx72m3oz1aooon0db94rr2ljs2p5ca8iycj5143tt4gkpqivtzmsj5vjtok05onux8ciszxkg6zu4zpolhzt2km6i8za869f1fwkt2wlo8lze4e60u2x4n15113q71c8gwcctw0dipngczrbzu9583k8wwd8dqs293f79vr27v81muzdms0nyl15ty8w34hw517c9k14mqvhtqj7duqvcpgt0lovzb14rv3yh6d0eiw2tb4fae95aqry7b4geg2oatmj0ebtwl77qasc256qwm91275hxwd8hwi9g1heofbh8e6ohjbz2hkt154qcysdf6gqsa44i5xzi6goyyzjdwllgb80fz02dsl31k62m9bjrvb9rf43x7oqgswq18h5grfycau9wrmuwzq6bj5ihr6ph1z4eanoe33ampdq4ok2a8qedwkfk299yhyl38g58b52r0ihymfuppo2gangi9s3k8lwp6dc599vqx1mfj56jzwkpvyprwow7qtbiqavmjc5hz0nnqzn10jse',
                proxyHost: 'xe73q2yjc4snb0dnmuxr564gwrh718g9mj3ega74eadofgl363osjck27zsp',
                proxyPort: 1841234145,
                destination: 's8arr7ewb7ctgmarg6h8htn9ng4732oz57fggohdpdu6fflgrqsypa1ydj1jibcadyuj6wql6nwlas1j2fx5heqkcplsu3kvzs7lpz72xwdz2nzb87rn6tzhcckcjj8lgnvmcdzwwswj50q8abk0wm37ee9uy5wj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'c0fbfw4csusi19giwss7eacbbb03rfw5ajkjmps8zx59iq5b07xy6aked46hektwn7vemlwvxmzw402frzqpw098pw351lbghif0al3ey9jsr405aco58hni59rlatmklecsfb8ewfxz5ipx0wkwqdo0w8n8t472',
                responsibleUserAccountName: '5a4bxc8os1fl3i32wao8',
                lastChangeUserAccount: 'dkarpt8njph3zszxvyrw',
                lastChangedAt: '2020-07-28 20:00:54',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 's9v82cxi7bq6mz96no29qpoujmyoq0kk1hi0uvpk',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: null,
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'arydf0h15nedd1mgywy2',
                party: 'ickaa44wmufx5oa6vk4f5v8gg8q09zj4e07yp4c65iaq8y3lwxwzjy2z43oz9qtxtg5oe9vw0vw1i3q7u18biihcx92kb9t7dqhkcvkuv0l8ybtww9rvb72qu82xnj8a736gutf3e2523woor43gxly71f5d0m67',
                component: 'f4bgcfxs2ps1baa6t4tdhyv2saudvpc6y4spl2ii6fkfzw62yf3aljrkyltxidgsi3cz4l3wf2jw35jyh1ledk0gf28048i6ctnsl3k1jzird8u65m29vlbjwuarpehpvfc6ywyv57y84h2iks4xdgjviyc2p4yp',
                name: 'yrc1ymy155iipbz8zsvxydrwm3qu92b6d9ludd7tcpnejqq492f566mh4oizjuvvdo8tsm0u11l3w7s4gbzx5srzn745mgeom362lp7hrczcyrztlpeyownulc0rc1nze1twuok9xsr3eyohkxqc8b5rbjj3ml29',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'ln2ws8inratylqgbgqwrm8ra2d8mf5tn1zgsjlnu2g2ki8h940qlkra11cuu0eh87u7rr2jx5uou02yabw59s8b19tz8dbez4jciqg0tov7aodcryib6fd7q367iudhn44fef3n7987amtfplfscd46sjvoomwmx',
                flowComponent: 'd5e1lmvxuud410xjgiekleioajctq58zzwohxwd7gyzfudclq77mgp0dffis4twehejqolpju5pjoz7jhyh66h901o5577n6a0nrpexxiax9zsg3hbdpluyohft3p1ci7yigihfz9s33rcsobjehqn7g3tyczey9',
                flowInterfaceName: 'ba2es1rbd6gcaqgrzeo4530w2xnuu2mvub18h2mntnf0tijkufhihz6kaun8xgaxr2lmze0xbnwyrtaeghcbeo1slbzc7ggu2mgomygphtx12ycrr6gwrz1g6c70fjupxb995nacwkup88upfzu9wz5bowl445m5',
                flowInterfaceNamespace: 'geo0aoncp92m12rm8i6k8ynk3lxr8py8eblgcm512vtljgencw1htk6d8r5phfvh7ok2ggq29609j88gwxo2ajfbgjqar0s1v11xwd3igsq0o1oeow0ny6zdzv0su70gu3pake9ry037zhbk4fyoti3ucar1f46u',
                version: 'cg37lllcg9qcl6g7vh96',
                adapterType: '47oxnne6d2kuau6rkte7oz5lm9nyfx6cr4tm8kd8kuqv015mx4sa4recuxd2',
                direction: 'RECEIVER',
                transportProtocol: 'o9zehbxzpjkjvdgoefgong2nt17nxcuvcb2wezwrwe2ya1rjootcu4kagn7g',
                messageProtocol: '3ek32zjrf817pe5xfa9qvqecbthia9d4ebvqm1nw9f9w7sp7pgyt66a3s68y',
                adapterEngineName: '7qpkz96al3i7kolwa8d79yp4l6x9v3p83i6rtq0vfj8u4ugnr6j9e2a7f73v6wstv8cs3m6w8rvp0zuxd3id0dar1d4edjevu4lqocbjl9h77kcrmmxatf7etqq8qmu2dtdtr3ofcynjm3ianof3mkw3drq3xyfh',
                url: 'ru10ee774pdcpepikdukgpth4i7bq4yk4k2958m4utplmrszivl1dxuyne911c0xfaflvazxaa51plpyjc0ofihyjtxv6nvb6j8vvss3dmp9153kdz16ccjvu72aaj0p9koiprpj4bpevtdyekqwhg230yvrc4vpuwcby91ylqglxn4p5l842mqz8ihrtvn29qkyljbkztexujut3hh6au5m6b3honr42g504km4fxls2mnjyofoazuehbcw90ym5j3idmgwgb9vwx63hrspww7q1nd430g0xyilh6lspuwv63w1rg2xwtj4aezgyvge',
                username: 'p4xtwhwm1j3l5pvn6gy1gyl5k7pb64h77i8rolnacv6ipsswsaevpl5dxof5',
                remoteHost: 'lv7h2rrg0un206jdjy56c1j3oe7z7z8illkd5dqu23nm64g9cdp1k9mwkwq85dz17qs2rb0nxyhj610uddfsyusgnsvb9f1v6fwv41bvnocfik5me56d9dyipaf0vbmfs8si5357pwk6af7yi81yn4byjcy9vua7',
                remotePort: 2638678866,
                directory: '5qak98jyp6fg29gkyq53h0ec03limddztoi8pl84mxw236cghv8ssmjkjc84bc1y09lqwdyjx0go3e5y4cs7z5hukskye1ne857e2so1g1rmpg2mwbqrrurlhwmiysysg9mb0t51el2p9ubw4zmvbom8743j081gk8lq7focgpb8wi367iufbrye1inhwyootmckvqnetmaz7isthj3cmdb24hcejhdolo0a6fmhomc9gow5o4t1u12ao17v6rl9r6tl12vatopuh0ku45zvgart15qa5z79ucfeqntdqnv3jjrv7vi0we1kyxdjujdsh7jc17whb7717vjzsxg9lhm6m4tq3y2yko7i72bynge2yvdwmo72w4ahu45ru8xpqb9kctmxme61rsx6kjr47vg12pjdsnf007i25zk2co89j10nixgojd1va827qcngp5ipv22fv76874osre18mtnxda2yr5s3eswz7r05ectsh6encqsaguku767ith185zqcsajlw6btqbkgszvxafx3m6lvth6yb2sujopsvbbi24qk1h2eiy1v0r9uche413oug7pbd2n73jwjtenine9f401j6bz00gf2n4974814ub9qesl2a3krp9ocwoorl7dqxd0zu6zpw7k0tcx16339t4sbkuvzab8phxwrzoeylczasmcjq7ongf666xjmlbh6jeg1kiudhpw24pmowhqaxiivc6limib82z4kfcnl9b0116txltkeu3u8bw7mu6utqv2w04vrlvztk7aj66erwsnhs57e39exp3yyn0j3diiescm9oh3e2i6oi4naoleg0jje8yyai366oijvp1z0n6eadavpe54sd6hvncos3nyrj1yibyfgtgdvfhfjkd4na5xmy48uy5zfpk8efjstgoabd2cvbiu58y3xqsn0rrpy464yz7ygmlafycx6vnfwxmxiz2our6m7ual9r6bv0golq9o2im75hy3hact6mxxdw0mqzfeqlerytj4k',
                fileSchema: 'k227wc993kupetkjq595xgl0ydzpq5h7sw5dvxnoh9bsotfv5i14hgo09u6d8icm1xt7g1d6jpgwm8nv2egs5jveccvsi5i8t80d616l3lp2k9i527dcklzu5derlsk1mnjjxda2bjmglcbo6t1rd4n6mcza7cr8e40nnfwgccv99swzqt9fuk29ilpde17c9k3pt1slujhtbor7cvd531698302upca04s6p8nl3wxm5o89lu8lxlo0q8uj4ga2bz7kz7evdr4sb29xf6tkgdjmpu5gxf12c9oov3ma4og8dckazr7q2zfacjvwl22t16j3ntyomi1kgaaq8pocr8mr7jzwjsi59jj4yj2ma7kqt2jb3hxu4b364kir56qcuxypcjn6rkj8vymq3bfrh7oqp7vgqt01lozdquj50isrcex43kzkcsi1bv3hrgpuhq87fottcdajwb28yizh1wue1rnq78io08btb3nfro8fbodyatouad7gr14cwcl4mpz122rvvuevepp2mgfddnrz300cgkgyfazfm5lctmbod2fxshensl623fams5pa2dqjmv40i4tek154vhj0r8k364fnbizpszykvcdjvj50e3my8f4bqjsopeprokstptya3cy4w1dm8sae5qtafso2lpqontiz6fq9w600f3z6plm61jbhojhty1bn00jrbdy6zmw601uum3txi4syem1ejoy0qqdsanmf78pfe4h7luwayrs2amo5m6ch4lkw3itmbeqjuf4n2pfe93ze33vwjypwa4y1lqjolh9akbrrwo41piarnp1ro89hkkkxpw1ln54e012lharp246pry11fytxy1o3p71b3fg2ghtglv9vr3z0x4l1rtf4kuip4azp1opmrot1bk8xewlmuu0zqzgn2m3f75qfu44pnupraaybwbrkka9jp8kg447w2m6umzy2retsu37jj5yc0j930oy9bda5pz70e1o1frjbf8burs3hzmthn8achsbr',
                proxyHost: 'zsdo77ot5j7tfy6o1mq9rh6mqd0jtf349ka0d03qoiunz2iuh7qnzzkc9zdc',
                proxyPort: 3729701820,
                destination: 'sk0km8w6izzmfvkcan86kxlhl0kdigha397d8xar5qwlc1d5o3ejf0u3uit44mmzns3hfeb3lx6dxz11fh7hcx5ebfyip42033ihaaxps5aexxz26c0vod9ws1g7t8350n0mefxryy3gjhpjxez0gc8zsfz2hjts',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 's2a6wrnf4ruylh52c6krjicj4q5y00qcbvae5wcw26zsxqkv4l4nhfax3l84ewcma1uqosxzzsoncluf1yk3l55oin7l97vpz6esho27w3gyjelrbf7lnk3ksal6a7lcprqj6t5r1d26q0r59kv961zxh9v0i4ty',
                responsibleUserAccountName: 'thbbecl83vvtzve61089',
                lastChangeUserAccount: 'yi9pq507m1owhrphn932',
                lastChangedAt: '2020-07-28 22:02:45',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'hpdehy43ugpz2tqk1i4vu3fldsmebowqwgduvmut',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'oxyhx7e3dk8s65t5f8xo',
                party: 'f7uouvv3qrgvco8fqev6dsnjrzfnnipujk7kdlqg3m2cn247hbidb8x4gshzjbqtqb7payie5ui06m9zv6tml8xeb6rcfxguvivg3fdfsat7cag2ht0ur59r88y7nyj2ocxuzzkfvyfl37igqe532l3rmb4opl1n',
                component: 'vqfmns59xg6zemub7820wdku51ff2l2ntcn6z0cmxbkpvm9cizt2w158wgazl65tjxcfukrrmhcvbx6kjcl3e84j7whjhai24tgg47d7wfvb9r4cbqjndfyvjcxyboos0r2c8mwvuiq0ne5yebk28ic92ymxgbvy',
                name: 'ij0m5k9wg1gy1y9pae6tp6lo1oi16hkmm1mk3zt391hylwy83u8g4gxli3vxuj1rlrh2zt3sukgykqalx11xss3u4fk3kohgn55z0gx10ywr8fz58a7o4bu5no9rmfxhytofvexg41lonzdyqfc5tmdejxp78xm0',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '3u16qz1u458rky7ebrmiesuam5lmuagaswfj86c02o999hwyxa0ev3upyw5j4i2v6625rkjyc20zjbysge6azldexwnb1zfqkb73zc39z5z4bh2hq7bljd45f2s0mn78nuqzfanf7hp7ctark2w5dejikjvbuegn',
                flowComponent: 'zj82du5ck5t148uczpu3dk2rfc1iq11x4fdc2e7eerhuxoqtnurpmv5347i6zb36cvmicavyhczzi64mxg7jguztf1qhpj8nbhki9fuultl0aqi2eawat2ey7vdn8v8kp6czvlk28j087wyqe2vym8pt4g4hj16d',
                flowInterfaceName: 'yunn155ysuke3nrulz3i6c5rys2xca4ui8vxmeb8f46rr1dkog9i56ol2sp3xgeig1b3o6qemx0hpygumjcxl3pn5j66hu5ujxxsaho3gsucve4qw02xg2v08hgc9n8t5twqvp4k9azdydg30uutml5gh6rbfw25',
                flowInterfaceNamespace: 'ztbm964wtvy5ntqssc2p42radgctqtob5mhydraq13sf94ocjow4t5f9398arzrahsup8xlx4jvw2zw3p7dqg8aobos1w3qkb1heeko0witlp1v8pea7oeizvb451r4nk2gw19vesjwzzez13kv4rr7x9j7g926c',
                version: '7hlu5pxbyifsbkefpq7u',
                adapterType: 'ge65ztbg5ytf2akkzjq1lg8o7bz0yo8gjvvkvm8nks2qx1xn5va221jamcpy',
                direction: 'RECEIVER',
                transportProtocol: '992kxv7evyglshnyf250b20uw4fzfj6p4ec0gy0p03elf05yfmgu14xmlsp7',
                messageProtocol: 'vb6iex6aktyjyvpe73zyydatjiweq24hjd7i5x5zati5f14tse236evd77nf',
                adapterEngineName: 'zkyq0fay5mnq11m94v7ifiq9hyncbno43muqcys1nevypjr0afli1p6yio5ewymj7r8nvktfx2akre1bca9p3pgmnka1145byfrd72bfy8k3itwiuix2wn79k8leo9qv100nakseh7yhh3fq0hk9eq8xiv5vbb7v',
                url: 'ba8fae1u0d9y59x09dfaa3hzg2ktqykpg22vhrwgxfwu5p4auoseteg8dpfvw8vgqvbwdgha0h0bawgxhjqo8mlejfpkf5wprhpxr2altf7ypxj32r6j2vun8kbmarswcspy6xsevnago7ejr9roi929neu3omialf26r6syocckhiq3cj55469o3kc77punrj1vglbvablejkrfr07tzkgt7xdcd5tvt9wue6t62p19d8zp78wq7yvie0boqphz211ml9fpi9ajqa292ymjtbjswajsl7vyl9cbn0t7mrwaia7sto3j4e4144mcc6mu',
                username: 'y3jkbktqrmxmk7kap0wpca879gxlcg3mc6hjgdd88zwhaooeeskgin2t67vr',
                remoteHost: 'bxkz890dg0q5xdb22b28ekb9jp1qfpcvz0bbod2gw33e3sgq9jw635gc68z1gmw8nkx71z4ap060o1n6p3jc1tauhcs730rymv576gah8g7xtux8nqnayl6xrtvohpictx79h8ze6hij0jrwk51okqraztc08wo0',
                remotePort: 6133058078,
                directory: 'qy0p3hg1k6myblvuwl4s4qp1yjk8fxy3j6vdchhhvt2o6ctk7dp04dimd4cxh0uy5sz78gz6wf597l1ah9rjzf5ffcp7j7u9o5arejvtvg31ibe9oxtmmiqzvi1wazbfcqvkevp2awjjwptl6klfwfsf6jhuhkkbgv2agp2sd4c0uy2d465dqkbp5jg8efvgqq7gvwaa16ujcrp2kj9q9lpv6dfdd44ncw9mx935tj8mi2m7mol1q0ysg57iggdn1bq0ec1288ri5dpp68jabratddjxt6d6d0era5lbejf7donu9gmsybhbce86nby0q4haifnrolj668y9ezn8sgfxom28sqbralde8zm765gxjopg8svwmsdupq66hkot0yrbs2z0vyt7najhs0k99zflq5l4g6bwnr1mwtnnnj1rts4s2gcuerr2ccy6o2vei39ujt2uac1bg9m8loetcufl5ze802dh6onpyg56gvizroh8jwroqpns3d2s7glk07dgw3p95a70oip3gytu32a74bstod33kki90g9n37p8hfeevxiiywza7sx9uomtpswjvd7msva24i99fqvq85racq5b93e8oidjndd7y7h356yywclf9bxskvysdbvmheg68lndho88su61cliziqc0ec53udq0sb2krlwuet31kp8wunj3uwjh0gqckiqcnc88zijody0g7sdbiymvd3w4luv4ai7jb1nc7qfqnmh0efqpnb43nsf68wvf7arzp9vhjayx7q5lkr9542gzx9d4wlj7lsuevosar25naiapjlhwn5pmqt1srqhdvouchuyme0ijsob063l07g0fef3c7d1b05vfiqsho5ckvywn37hzysqditmgny2zrqymkz1u3go3p403z1h6ttijdmq44dj1l58jgjjubkcif7xpm2lglie9x6glthswufiod8ua4u9d3h1g27cc9250snq8zuc8tq0ieaop4nuhv3jnqcsx5jxqmximtri7kq9f',
                fileSchema: 'm26aahuly4yxun8o2oyq67bvo3vejcu7spbmznejl9tbknw9xkpnetq38ufqo8ikam4799fltcrvdqrnok2bct76ua7cygqcbf1ze4eiqx9bjd012qt9kv4yojqv0pnacmgokk0bw413hrwxpmcx0e5itxx5ral9tdgwqp438a43z86pnbmibq2wmpfj8b6k478dj911vozf95jkel8jfvmuqmi6p1lv8jqube2c5to0r8zjv25qd002dn8y9f8zcsmgkme2y8zeuj6ghf4w8ybk0dx1wn6hdakmye7mk1xlrr3d1mf1jfuto9n5s5y0lv4g87p0cbvqrf0ten34tvlpbsuh9gcsih5h6qeiey79o4f96auk5dnpch8mkqh508xgecp8icjy22hqybp0ck2rnxuwoy77qpt8exol5q2dus83sbulftefe8qhrqi9eloowagomobkpqfrbv4z70gugfmah6df5kyi23yzekck0dusbczcx1vt9x9equblhow28j5pgfnh7nopnt4m2su2gzupuhyrisuo7nz9sb6vvjqobcne5fdi8m96hn7tid8ph41j481xsu91m5217g0bkobjbyvdzotcp2mw8hhxkyz94g06t9gr22bhkuiz16x09gwdjl3p7o2fcl0vuogmffizuqybvhenprjzvwkwva0enqn1mr2nasbworotwz6xypkfoppvw968u8rvvhdyftbuflbs8sckm7z3cdsoyj9s2o6uat7nnydwp4i9v3uysvp4m3pkyk46p5xyx2p5z6cqqubas8v93smwxebtoiifdh0j889o2cifpdl4z91d9m8v0aoskvkozr3od7ryfiqlrk30estrj0a4beb0bcoazxak53lzxnpv3ev6x12zn8e8h8gr1ix3a3hqomxhi9n2k10j3yvnjogcv3ex7d39imxdld00p78llse1kciknc7gdpkz31wbzbjw4a13sts1l5oalmdi8xeavth90nxdxp14dx4ejoelnesd',
                proxyHost: 'umtgkno0s1kvo5ujnyo2op4tbu0kcfhkyjddx6tzmtlmjcyp5mmr1rxojxc6',
                proxyPort: 2790907016,
                destination: 'sxmc3j23vue8b9xwzfv9dur9bxvvoaoqgb9fisl4mcvvjvpo6zdk5lehyc45wdczwcodev8lqexk4ep5jr7ie2bjsf0j8psxosk8yw2rri85qafw5a14ix38xboc8wg12skh1xy0n4c2ayyz87oh0224lajrdgsa',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '60i25jlga9qywso9530jthm0nfgko658hlf7z7q1w1nxtj0k1zi2c055fr2n3xn2eqnetyls6ksiicf6z3um7ipnk50udz0nn4f3u675mx1mnjp3ntmntz149xjmt7xup7f125hosothxsxhe2mr2paeme572gvo',
                responsibleUserAccountName: '7hm9daazukannpvvzqmd',
                lastChangeUserAccount: '7g4eb0sx1hl46gg7yl2e',
                lastChangedAt: '2020-07-29 09:56:14',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'j8e0rrf9mccwu54zqpkniq4povcr0ra4yh77kezg',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'ejscbxcvwlg70kbcfm8k1l15x1j0q7soa1fm1ksgic81nwwi79',
                systemId: null,
                systemName: 'vdhvgrddvhzlrzia5rzc',
                party: 'fzu6dt9p9y2b4id3rd3puaopsxvcyl0i46c4uekj9yjnffc8m63ii22cevvost0i83yktmsmcuatx0oboobvlb7pok2i0lj8jl06iujjzy6xw81q0dscb1ya7t4k1j0wc4y9svgcguni9xoyztr6s7mho486zecd',
                component: '02vysgcpka7q8ys5um877x4l2e1jaq8uznt27ayead7cbtdq5ko2mh8oo0iigwyk3gsquife74uxzj84vbwb28pleiu5nkob0ownpvj4i23skuyz0550fz4bv6yujkw8hgy8eb1vxgudusmsvzo43g64jjq2su8z',
                name: 'ae3hj3zlrnky1usxtcdzdu6ukcosmcz7qmvchcgklpvyhs3f79pdm1ewgzbqx0n5xfkodlqyznxoweitwycyw5gvfyz2fyrce84niwe4lpl4fnfn07ylkqdmau2rr6g7sdf3ycilpi8zlx8hnt4hhzinkq1w0hnp',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'aqgvy5r24qjwb55karwqdtdnfg608727mnyvay6l7fwnqugpohwc6mjsoc2k6n4n16eon6cdg0ulu9e0jdugbtgj830mlchm0ukfiwkcxonri4ym18epl0t2lbfq3j7diaillac2aaicnwzjf4wdk6c7td9abjhe',
                flowComponent: 'pkmq889t904gm8sagsdghql2e6wgivs281p55crb5womb9g2bzy3a9xnp8cxwx2qojoaw1ealfmj1gwvdtrklquu1psp3grxx3zkmr8xx5a3ds0en4t4u7xcl9ekylj5d95dhvyp5yb8dzc56t9iac1ei0pj8gd4',
                flowInterfaceName: 'b74bvm6gzew0c53dvdpr8sa2y0hnonrgqogi0gloa9abb2zt1hw5wnz5mo83tyvdwzig0pki1sowxdkyzbkqi265pwmd3lopqv6jgkcre3ua3dajpht5qre8az3kgjsyw1fv1cze08pjswv0wyo8wn2wx1igerip',
                flowInterfaceNamespace: 'fdm8vjiqb2q2f80eecmmx9uin6jssm474yqc1jccidt7yh2ihinzkq63dwtp8djjyse5vh8he4i5pwqcn6o6mdv8g9ygiwqbub92wp0b38wzl5v3t9iy55de1o0gpyp6s4ct4xmq5gt1klrxmgio3ycaeb6lwajz',
                version: 'yqmg9px0kp3nz2ahru7t',
                adapterType: 'uzrmvydfd8zcr2qss8uoykf77fdh0rowcpa3x8qskbhm7x6lw6ap55m1kmcj',
                direction: 'SENDER',
                transportProtocol: 'tjh2gohij851wxwvad4ivy2crequwi68iw4er16gvk6z4d7hsh6gtec7uut9',
                messageProtocol: '27jsx6v9l98w78lpavio8hm1g90m9h6r17b3roaxxu61yaogi58a8tam3izb',
                adapterEngineName: 'kw17a98le3yygngv0e8ke8fgy6x9glvgemxbpwy38n7ibu2uokltzp4ld02q4prjxipyp6jeyw4tolih5lm2rx71d49p1asmwn01jjmfwoxwuaido8ptso0cfuxbqqtksckr3ylqzk7dw78edvvdbcqw45ntozf0',
                url: 's4vdjd4nlv8j4747hhmtucf75icr7gslb1umiglbyt4i8fk1r9vukjkuj3ly8y5t11f8yquem98f5yjh6wq7iyupetda25du9vmkshpgh1oag3263f1lsk57cxg2ajof0ee5ysrpbqk4o7wumrirozy2dbzw3pfm2wr99z9uiaul20tntf9xvd7t2w3snyyvhvl7y96hd4ewomv11w3mww2jmt0v8gnjjtio5h1dzd55fnspf8ojusafea9ymd49y51206j5xqkkprewfy62gr4nzzfojnnw8oamfymsouk6tebkbfnk4xdnfqxfhu5g',
                username: '6acym9ud8b9uvbp5l6bg7qap77u2pglwjidwwctvrh9liausaq5ngqru1kzc',
                remoteHost: '4u48zab42as27ha8fv1kjlrh70e54im65m3ftlx4l0t08hwbzj3v5wlakay8wtpj7bnfnfjilftj73zcip7unvwub6598une9bn2b31w4w1d1h9m3de55joxxskqbqpk89df8yyswmae6lbttvwyjwhwv1elro97',
                remotePort: 8770081919,
                directory: 'on6qer2q66kecyk78jvx47242la4fz7k5pfbgrwfepotp1qezxrf2tjpszukwoqp0qa8w5lw9z46pearx9j7qrv8osanrmf9zhl3qkh5z1lu5zlf57b5e3u4g0y2s5vwp08tldff58kqtl1dbaaffezk6jj0eybsenvucsxnwbqugol9zrvocmyi2rnd4ncdh8mch0v37yt4hpth6pepm82dewykr0owoqjc30ws8ib5op51ukkrrxai7115kcww9lm3d9g9tsgwbn9k4ia7ndzybtnqt08w192zirju3j9nrshyhjlal7wzl9ahqmfyd5qacrcjz6b02npjuh88xthkyl89b0mh9t5sowwsusw4dp4iuhn9vbj4pnzc8rozt8kv8ls8rw5b75thhx3uasxugz7a7vi2c49akst6az23ajh3f9cpc64bz2q89kg460llul8rzqpl6tdencl81zupbc9m8j1qtciri2jhz1f1sr5cbnf44bs96jao83b0b69kjohkmu5vbksjpq2gq9byt5h2u7om8pg3as3tuyndjjuhiyk7hng2bkyegktbcc1l18svlu356tbud78psylyjb20et8oi6jl5xg0qzt1kmqpt3a9y0mtz3bcxifixauykn5vpbumxzq1dmiuby4ik7r5xn37mpdngt82fec5vej6uzxyzienavv20hy5duyfglnhgh86amt4ofkmc6q9127e9xtonfb1vtpbe5124hjaol6u5209t2vnyshe3l5ug7gtel55lfnjya5jyw58t0k891z2hgn8idwllt0nzs6hwbmx5r0uz4vvszdh1gx8r9x1672tyy7ewov4n3nyoj7tgxaw1owqlzyrz4p7x4rzlohl4ebeg6cubc34auvtmwqhwprfluye9k8rkm5plrtzij4vmls6ol5ca2ewswkedb7qabx62kpbtkd87kwktbavj6uy0z2uup90iorzc9zqt7qx3yly4pkyxfz39uut9ub3irp44532t1we',
                fileSchema: 'u0o0njtfqfvsu0tf0ncny6vfh5gchli3idtvrq6mpy35w9c5w4qck0ebokdap38c2zyjq4n4b5rmp7777zc83nskz0419yy8d8soxlc4qxupriy3j2jbf6vxrnxuyhleu5g883ilgeo5ilvwjd192cb9k6hakb9k1ncpc57nu7pmdbus1zl5l9n2jw84yb4bcrbounmhaqow1g7t50swy9y4bu213krvaocov67qd443jgrppmeq02eykj44ip8w6foinnpjsenc924qggzawvxvyltcwqbu8biepzxubjseymsi5jpfd8g5ankdpg7evsco9aio38lr2un97okxjdq2hiogf02sg2nrczqncntd3zt9zetwvwwei45te5vdljdys2n6lzryvtpi9pre7wasv5t2dj4lecq547v4qid4iqfjdyxm273jcc9ui8ncrkgp6x1icf2pedqqnildcczvhnfidluhmhlekq57zjvp3yd59uyb1p7o62n8v53rxzl2o65zf636lcz4i6juplt670mlbzf6h2ovtugwz5z155byjyzfdbiqzbpbeqyvbwni9aoxuxmg0j09u5a7u8xjnw31tmtzol8rwugn2p2gombmov397l3y4toz4e7kxz210ug5a6yied3pids0v3qt40i8uscjbpzun7rsd3yqw28g9bg55lb9k6wqehp2x5angwwldczbpzrdrv9v1tcgaflj5k5cwpya3hvi43pn7hgw1f6gg0muvn2t6rhsqo8fcnb3gj5r7nloeqkypbjgwp9pxdla9cbnt0o3ovcbs30l7ofbs74nsku9n0cau8f2jbsco3z0ujzsjjou8r1usxxna1ce4cu5h5e6zp50uwxni4b7bbawuly5dp1xxl7p02mvd4twkum0thesp2etlep6t79o3o41piokabf2z980ok206qznx8ce0iw9wfdod2qxkyyi8hqql6v4cn2yddfnmsr0utn71o58re3iole3jzv7calng6nqjz8w',
                proxyHost: '0bahsakbrsk348ddo7c4h2cvhq5pb7yr9dyssqtxe6na5zi9i4t9dcsnr6e0',
                proxyPort: 6811754578,
                destination: 'ctnfrra9hyazwqzldhv4873dsa85099eh97gr12inaahww441qi0qhjlr5zw2tjvmljprgtmhpr0uoxw9nmjmbqoyokyxd40u5b9khi40bfvkx9pwp6r0sn745kg3g9c2hby7s4nfq7sd3tdwq53vpm4bkta2uhk',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '95328z0e5kzyg129w7scot6273jg7b9tvro0j6pu0seg1f8v7ku2uo8tfnyszn8ppbrv03kqf13jr61x7rt9pjw0ea172han5iei0055jfahuksrppdeeu9j8vrhw2oufnt6v3npvli9kx1svxx5h5968dh3rt08',
                responsibleUserAccountName: 'g6z1ab5bue869g9fgqor',
                lastChangeUserAccount: '7szwcc287j9hlt3d0mfw',
                lastChangedAt: '2020-07-28 18:00:10',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'dkvpfi2a063y2dgmcuqpwbuzhhipjsn5bl9r9lqg',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'gxv4fw9umwnwvtumb5ju7epmiqhrjwi5l5u9hkvh9gkmn2lt0f',
                
                systemName: 'hcdaw2eddesfxnxqf819',
                party: 'fdi4msb572n1xpyc78vsyz0zsk8b3bkznr97f38bn1iv27ec9wdyjhtg9ly6nzpg1qwm3hp267wetj8gw117bum0l0prtjagisb0bzsbconxzivwyvxqlwr3jzvqe678blch39u4io1ngze96lwzzt9bs0wkutcl',
                component: 'r5j8m4rga4sjbzgocsa8g7tv8lokjh9iwxsqu36031vudq5pftnmo7jq7dmuev03mqk5h1t5qcvvtejdjc3vqq0awlnsfn81nuvrk7h5zp1qir2v1b3jzxskqtqhkkw1of7c5ewqo9u1fyarp5ahmrnigmk3obsy',
                name: 'msc8djsnbji3o73xgz3l6wqx48se8viexhnl7wiri3pnlc4b3dgn8kteh7kzhk2yvr915xtv4gjzi1ruy08lyrn8p0gqdqv1kdxec9mdlfuv87apcq79g3r4a44t25v5tp3ginpasdpk9oky04uafhkfhk93uk86',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'o0hl29bq1rn89mok718tffdzyz624zcvalg94tvbgw3bwtfadq3lg7rw7av3x6b5baj3avymnpbxjwy5tjr9shonno4okkvvlriwplwyogigup465nj47fo9m2qll13f51axnmlwrwnoqulh8mi7ogz4o9fdty6c',
                flowComponent: 'zrea8w256m4xh45bu18u7lw2wv025qy2f314acgmzh7x023n3gfwkhmvt8kdjqktr4l4ambfoa5zud23xdvy5uq3uebck838z760psp79kc6vt3g0ieh5rxkw60f3siw9xweod3whhcsfagi222v0phl1fmuqw3a',
                flowInterfaceName: 'ikm48gz1yz70c95kfcirgwsppj2rbbtfv83plpahn5pe20luqhjripf2zcd3nqhosprpn1nox1zh69sdt8col7txt9stcj81k55d36dshiikftefsbh7m1mrw6kbmaxagqjrxbn741mm3gtfgbjrpp04t50fnsqz',
                flowInterfaceNamespace: 'ao2nqsgtmtpsa7m7j5fll9lmmwpb08r6hqk1wxhfuwfzm2h0mjboyuf4xewqihr4voivckipv1jdmpr3oe7c3e1ym6cf8qvifhosmvhnnmh2pqt80h3va6sk1crpgj5yc1rk5umh2xv7s1gptssaejvw80fp5qxr',
                version: '93hyf86y1dtjpbldwwwi',
                adapterType: 'tqlbmao3n9dojruahw9lrw1tbw0eufqbm1fnbvajsmwgop30wy6n61e7465l',
                direction: 'RECEIVER',
                transportProtocol: 'x9fkzyhy2rat5zkzm17ccftl7mxo9v4p8030z8pmjryptko3xm2ezlph5vml',
                messageProtocol: 'mgagarj4olusppeev8gztdvr640iiv9loyv9z1vgnznep576ifpig7yirjwk',
                adapterEngineName: '3phlnpcvo187txcat29npel0pxt0af9xa62lx5ofr4f91bk3ad9kbwkuwymiipyrqkovoy6634jks3s1a71w8dlswhia32pxczpk4wze29hvd5j8fz1k2173c7epyq3tq2iacsf2l9xa4nhndolweaf261jo4edj',
                url: 'uzuhmyn9fe5c60mvz7ivffw5z8ouruqi1tf194a5vkadx6qai0o7hpf0mvns5x1crdo062b8dwcatm039htvnl76wz0ocf1s06728nv67w2b2zcjd5ya3a9zj3co5g5o0xrb5qrpytlhrtnjrc5cm6uihglp6ufyavjw7en1ygbpj3haavydyd5mjlo8cvryyjfa5850xur28cny29lh2n23cgxrkxzxdmd56w2kv3j3t1ru5zfr01td9b0egui4kblynmrxknekiphycigodzb7v9fbhid6205c6t14vcz2resksm6262f4us7g4eu6',
                username: 'z8pgx07nwojr8gl1lt5a5v2t9ok9q84wt03327zozdzxwlayjkqym5agyvsc',
                remoteHost: 'p6p1tw3osdhn5o46qm04d9gvzpoo45d76q5yyac8lediqylr425mvfleoiths5otia7zpu7h89k4q25mdc743noydlcw9cxephcbcu920850zc1f0r26rfhxztho0vqecrwvt9mz7gvy24tc7vxzb1ya8f1svuxq',
                remotePort: 2917377502,
                directory: 'vnz99xnsqypqe20mfxpifvb8opwqzjl6r9tb6db97tu2mi34akid31lrqtdrc0l0cxumxo3ib1fihiwgybq8mii131o7udpovfar4fmkx5dnor6n8tqd7lbk0pdnbn5wt3ifocezhqmk4wyunpb2coqsvan5c75utyc9utjkaojyxd126a2obix2des3eqycr2umu3y1qvtu5g1xtjowp0al86c0m2f2v6luhbwvz6sgrn46mmyk8dn32mp1qk5o7ve1ipjifbrjcs8dzn1wai00hp693ye6oirx7cnwliuxkjfdk4bt0d0nv6b69d5ztgxg5w5d4swsincwkoh5je8my2hk7pyx5sqymbl5voc607ommhxzo7m3n6lwtkwg015jwci3odgna2asqbf2hfbj50ghw5geb2u6msf7ns0dnxrtf3je337xljtr8n8jlj0sxj1x86k63f4zpvsy79drfw4p6icxbgp45rn1c6x771k6iponpjojtct4pzatu5pqxa59yvp6o8np9ump00h2dt9dgigugyklut8jy5karln5dd967ay4s7bhz4pe3mam86956aytym091kgj25b84s6va0kqo46kaykv8qzdeo0vtdbwixaa0cgs4ao8a786gsj5vbvq8hczyllj45haok1qogwex29audui9dh5ut3l84uf5ffsmp405je8wgdoyzqp3d7fskwnwo9y6lwflw440rlh1007775vl5pmdm0xs5ge6pyqsockxxcyij8k03xfm8x7vj101vu91bzj6uy813t4iwvim1ea0ast2xto08ukxxik27w6lgzarsayxyz10c0hwh9tmaqncuukib8xe0hva6xz9762uec97ewf4pkkwukwy0po4vmjuav0tl41qrmbn0vv43gzi0okynwx8kemvymw3lzauhvmvknd615vzv06wq473anowf3vriyj2n5l1cs0c7qvrwnst9dskx9j518d7y9u0taqm5bawxctv123eztwcgr6',
                fileSchema: 'x1igyxdi8hr2dk4935txsuttwpa0b1og7tth6o9gbvkem3y8mx2p7w3zrxkn7hr70kqalm3p3ggw0iaymifpuxz2urr01k4xcjk66lu0mx49ce4j9fgg6rrr15rc37y92dyrx6a2lx1xq63vmzigk1vlf7e04mn6s7uzjjxhq5f0o2egra5jo1gy14vfu9uk8zrb457frovughno3muwlk5exd4eudvw23m2nyiem7mettrkd5aae1qjjb51eoknjre36j43078zjmuwinel84c69ur0dzq4qwn7vl18tyt0qqq72766xo944150okpeqg50lku3wgte1cc45smysx8afc31zui6zwp5m0rz994e9rrhwhbm2c11wshuxgdlkoq39z73klyre91jlkx3wop4u5s2a6wy8w3xlvgk15uudl9twbnff2h7b64twcicyfextzbp2s8krwewuiv20gy5edxmwhz952ugz371x7ofrrv1cjsm91eatizkj553k6of5kkfmowu8tbj373u0z3z4mumsoho1ol767y5rz93yhc8t7x6sb07g9jyxdnb69j3cctq6pag5j7zqgd9jbdbnwszik4p3znl07npqszpdgptf31io7xnuaz42hbez58cdgohay98saq763bohkkwsvy4ufk3ryqghfubdl001s6wne7g2gy3v2pw7ugxfge9p5kij5kv2s1394dpk6ygkx1y8p2n8ofa6rqg1krwcexzwwu4jcqqajb71j1m5bplz2nhqivatlqkol38du8glnmb3cqqu00lx8rvr21fpy42gcjr9cd4fd7j36u93vygn6xcxv14hki70oveij5b6iduogai7h13dqnsqvzgpp51ykdf9qe6ns45uxsuae2wy335kn84fesuk4w3c535fhum6f6uxj2bz7lugf56gv9zs9cfvaadie0ncetm3gc5u4viww7lfnxq6gseow5lj51xdntl64vhqq8s7uizznniqfjbf3a9hn5vy28l',
                proxyHost: 'qsu9rt9dgc5s9w7k5c6rcmygbnacgp6agu39qu71q5s6pih1gy4w9o2wcmv5',
                proxyPort: 6612874663,
                destination: 'fi90i1rb88e0q3knf1l8bhugj9c1kx7ecgqfayv7yq1vl80ceiht97ftydminkrnux28gxx2wygkjcy5p6umtgql7il6hoy1xbz7n1apx9cv7gam8j72gkhgxfvv4pwkphn2w18uj43arwvzyhbcevj1avajtvtr',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ye7n7i3biobtp1kr3t9ryi735p4r6frivii05lr3mk9cnzhyyvmxryczmaoz0by271wax9h3fx0um5kqhinikxcnc96xrnxit26xadsy0stdo0izpjjnhknbm839xzowlnu3f3xgaky8hf3u9miqndhc5jzivsxv',
                responsibleUserAccountName: 'qs621bu6o2r30waxl4w1',
                lastChangeUserAccount: '3hbru46q5s6ctq247tmx',
                lastChangedAt: '2020-07-29 16:15:02',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '9f1e1lwrutiiixwygygdtiup48p9hk3e1jilnzn9',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 't28ohsq80vyquzvygmqqnxxydyc5uo8zju67u9m2j60j77d6je',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: null,
                party: 'lb6xnk9pmt2hjn5bj8xz6o1xl0wmyl4qjjrvhaltrq4h0dguo9o368wo1x8g1jxz68t5dh8c1rlezg6y2senicizskz1n4jedgx0bm7gjnp8nqinoqgt5qmjy8uolkeamvw5c6py12l8kwegtf6fa69b04u5me61',
                component: 'j1y3uk7vrkihcbnyqd6uhnfzb8q2a2g8kq71e58ism5rrh5bywt5wechkz2ya0scby1bxaaz81rfjom1zrb1r3e0pn80wkogw0ci4f8zjt7gc6ll32a0l1fgpv9rmhmxd5jml0hwpds67gnm3ie420f3u8s6m0n2',
                name: 'cf7qt2uqncvqxzgo2mwlltqjf6s2i91vyfiowo3la9rw7atukyi9dvwa2ygl4mg8qnk13pzp5h8k8hq9aehd8ei128lgenrbg99d59ej0pm7qp5xg84a9zxxltm2ehatolsrzoijmmty0vm9pf8kvn3swwe2o2aa',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '8wol5ucli4jsa3mgekxyfb8f5xjmoawo6ozai5v9kyx3tr0yytziimp9fiw5vnjfb57mu4n18x5l7w5kjvp8ij3zvjvipyptiqkk182gi2ecrccucr5sg6lhd4kbw04cv1e4zz3sgmwpkochkzfhlk48dxe3olmu',
                flowComponent: 'hrh0f4txh7gno5kwetolyvwq74p8uh74f44zv7u6okcbngf9jiy6prrgcjjtvlqp4ufec8jeba6v5y2mmjfhao82d9m21f52n8hf6nxvwp0fpem4lntk7hp43bzj1yeem5atyiea3yjq33or1vd74aui727p4ex0',
                flowInterfaceName: 'w2x0ax6a9xeas7fmwwb3x4pcdf088el4fjb6rwgm5mevd11x3iaz76s363gbw6zzbfj1tcelntg7jmtokw21na8ob6d325wpu4mhqjrh4bywpt153o46ekjlf5ww0pu0bhr00crzoml9yg7uvcc48lsifglnzvaj',
                flowInterfaceNamespace: 'wevn1zgyb8egijyd66g7dqkh8fam1hzis1tiyojmr9u4u5lhyp1qndtbary84wkq3asxglr3azewyt6k1cv0fwhcc2q2bml2zg8gglcbfxkoi7jhhb40rods6orrpmhkm44hmlbl8jjiq8wt4l26klsj728qkbe2',
                version: '3dlwws2or49heyaropbe',
                adapterType: 'bjmoyacws9gz198nzre5u27gdw8jtilw4628vw9s4q7r4zh9gg2zmg9ee6ph',
                direction: 'SENDER',
                transportProtocol: 'i799jyuplc09yt916kpg81r7gjku9wcy1ybtn5tzzlhxcgjdt860rw0pekow',
                messageProtocol: 'izzvmrbr9x0f49ga21e3uybygxys8ciiwzf4a1l7cd8xarm8i2jpzeanxv6w',
                adapterEngineName: 'czct6yse9f5r81m4cqbtus0265xb53scjvotq8h36kalrx8ma0mwrvpb0izmafwlocw5lun4fuoskq4tj88wk64en9wj86e8sl7lvepk0tbbxf4egd061tsxgnl2aq8qz55jso9ofm2ms882fsq9yrd2vj7sku3w',
                url: 'ebcax3zz39yimcih9ycyltgnvvdhnu3684tc4uyobtbthm78i63djnc58w8e1egptomlyl1mzibmidqf2o8fml9go8wjrwrcjprazzn6v34dtnncj230yivazy9y959jfjg9a2bsvb75at5nglfrx839won66r8khyo4y1k0ygacmtefq6gfna7e4lqixvvy588l2s6q60osr93cjhs08mxzzp1old42k5g5ho7yex2f6t8eijubfts47lbgcw1fu6h60p50qkirdjkudpyvephazqh2ovthhyqc7y6kmfez24dn3ezqlagq3pa67e4z',
                username: 'el75w4b0f1xnkcfjm5winvh0y2defeavfgh5wfs7ditrkecdvwdhqf3ranz0',
                remoteHost: 'a7tz2ez8ia4inob4cdzdrnuzz22wyj5o6qvjldmn56ep3ydphcm8zk6g8dj0zqgrrnet6qolxwdg5a3gm4z3pr2ih15kndw4kvdyy1o7hin7ta1zlu1lmtbpfxnjafpou1th4uph1apwb5mc1q3niuvgo87fkp61',
                remotePort: 7826371169,
                directory: 'tbkke53t8adaidp1i1ni26pehqx6y9u89kv7epmlwu0obqxlfurpyjik60ea71vqcms32y10eh9v89ahcozvmqezgbv22929fjwuvaj5nvbnzzzgm5fmox6xvzw4n0rc3bgbstqcja803pazxx2p1f4qjcdyzr0jwpprethow6w6w35cdhl1m093qcg2s5huwa34sn86luo2k0nvuyfjlmxb95wfk5hyhrbzm6mt5wyf5npmxlbfzem2tg46aycj5lka9m1df3ay84ac5xfwvxc4xxrxj4f436orqau4hxbhxrq9l7619egn0zb41snbdy2zjnevq599rhh67opsvd5p8juftbfe2pcso4lsyl1ehharor5b504sqqv495vpx070b9w505huw8739i4ukedl7d3rka58xyhr7s8sg6amfvtkiy1pdtsff7l99fa5w3q0gyoswllw2p3qlabcchmkts93bhmniujxft9zfkskrzs868dftprhipqj8loqsbtjeky9g30cdl23kzg2kaq4ryvg3ed9cxpn4oixbk9kvc5cekajb1owv3vjkl6xmp3lzvdcqpecvy6tdo73zymhexhln6dx7eyfhpcz21g97u4u0167kvfbtr3nv54pgdo0zkin0wffxp4qr16ww41qmyn5ml7xq531dc9c0fnmgou5kqc6wzkugj0x62qn07sb78by8cduq5jfz8u91zpbz3r1zzkzqt2txunux0dcndq8n13dh5hepbkpdm26t1ijjv42sqew100t02jv3s77tyl6b9mcvkh8uck4shof8mwxfjc1ep4ytqo2tecw0l50z7ad5vhioqkorb5wbbfozpauc34s73heq1szc1l6om5vwb3b3syd80yja2vt9aei9ffa4gt3r1gt37q76cw4fnalx9dzh72jyk0g1b40ditt82fp1v3nk7hphvfnwz9ezj3utyufc5fouprmgwlzyd7iovlev96imk647beh54u22ov4o5r6td3vy08s',
                fileSchema: 'vsxb5632yiqfm5kyieitkwngurd04l1954znot4t032o9q84yvc5plype0soluv55ygzqebr3zaceoiawkvnfu7mfod1qk8mi7ww33akt1llxrh67s8ov8o4u6eb53ja4bz0qj1299j00gc5qx0kkbcbp8wo1sh34os8xyakgs6av1or8yzczz1pps498iwu1njof3052cc2trzkx7gd91b3bizj9w2s1r8zyi8dcp2vxebzcvtq4o9q1pv1ewu01hdtwhotgfp7xptqoznbmn2l1tp776mn8knb5gmqg439qqt63dmgq26vn6axjseet7zsmp14a7uyuf47ufsrtkk4ulu0knt09fbj053l5zehiaiyisczr6yesaj2jgvb60kovn6hz5283jtq00iys1gohedtsqxxer1pxnuuq5mcfxdi5ljyn4gccj2qoguxkgiyasff1jbci6mi4alvqvhihh22jlna7lxbw1exownueig5smgo3qhpxwiu3b5r0ggvplf0sgcrfinygk4vrsepnagkoewkvhgpdez4cket6t9y28tog5wyhvyd5o47yy190tje97g796gsl0yynik411ivwvj770wnp2j87zxxl2l8tgatzbvw3971pel87021zlu5q34wev3dtcup79gyz2xqgdrqeb0rwnei6bcd78o5rug9hxmofin9nvi4hnn3z65m8cc0x8lxhkhef7z9wak9lhkxx5fw3t88uiew8s4bh2uhpueuw66ios3i6ul66wamp6ot2tjzjv5jbiwpy6ihikymnilxglh8g5unbzvw8t0nu4ugwzil3aeggj2hom5g6rveegdipgzxj5m4bf9s2jvbqvp6r4xztryllxxqize86h83645u2p1xwbfustjsxikrybrx5e74ukzu375ihnha2n1m5rov1zzz430ootonpsx57c06gj43pz3v75e4rimy7nd7z7d6lqfe3h9inslkfn52d1dlkpi2fgmmeovgdtx6xd7ttaxt',
                proxyHost: 'wtaiwfznp4km3wlfabytv4ww1afj5awakstaed1mafw3hcveh782w8qt4n51',
                proxyPort: 1215651825,
                destination: 'ep213yg9zpevc5daa0k6qn29o0q8s97xcll5ahyxw6x1l4ofrll9kajclgzog0p2ksllrrwcqr3id893y9rah7wqwa5b6gyvcl101kpmsrpjruakscvt1qyyq8lf2m0agnq59sfjffhqhu13ttdsrnmch39maouz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tyivr78cp31o2jdgmycgnx1oaqn8f2xbztyse2rjxkr22d5cbefgf78jhwntcgswrgpu6axi35qbz6ckawzv0k0pazrgm1f2sl26ncn4yrqh73la04qyh5tkfjsqeatojs97emb118u0dd2vj8m3qyetku38rpoz',
                responsibleUserAccountName: '38yxch23nr8k2jbwh0rd',
                lastChangeUserAccount: 'lpkc2hq4v1pcr555ua5l',
                lastChangedAt: '2020-07-29 12:44:26',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'g3l5j9867695kb976w7l9u7vivu580cmj7um63id',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'iprav2i5filpm70h0q3l4eu8edlp2ilenysx4ql47egeiqj0vw',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                
                party: 't0ufwrbzkrq7aq2nzteiox3ypfqmrzuacw1tq5kit14yigaxnedd5ed59iw1ucgpfjwd7mroncztqzu68fvqlinivm4jmlb2mxe8aejt1nwg1ah0hpdhsoz6ssxxu67ywahhu88spezxfsijixdmonwq2gwt2kaa',
                component: 'qzon19d9ddwbrhqrx34xmzhq88pbhkq1gtgsa1pf6axqm71om9jj26uos7kxgmqv1cyfuh2bqz3ghqvgazyp1dub79ifm8m7svvx3cb6u5cao1hdakyi16z645nshdh3a2l9680gcoqc3mvc1fbq4rrapghno9k5',
                name: 's3aybxqmfzvyfocsekf7joujbemxy3lc3owm2k0hcl07ctqszir9yc8l3bycytq44ot1qvbon8v2mg5sto6b9961muofrmenqm2yhm1gli48gs0cgazb6a4ph36hq3sh65pl4tet2iqz4ctg85n4vrqhr5nncaa7',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'zqkwpgwcwluyepuw8oc92gnpxpueauqnfahu6jke3rzw9h89vifl03cvqm9elu92ogpypbl9q48lojauhs4j5vepv19c3w1lfraydgr31sha73oujeg4qo1r0157q14hqjyitllu8texxbs2lm8ctilzmg7upx0j',
                flowComponent: '0lt2i4hyq14jkp56feg21ifk7rehgc6z2wl0dwvy1ct0y65x4m4ro3u5fqwokmcj8nnhy9n9auf3byv55niyjegit9sb4n5gk1im21j0m9ftxhned9irp2mzv56323kjxni3197xtz74ndblvipb54w6onekcg1x',
                flowInterfaceName: '8ovytiz81baoqb5xbvib1552t1kw65f094twkqa8xpy3s23com1gh705m3h4fpj9y688yp5izgbylbztdlebvixnabsyuwqrwxarlo2jeyuagnqhhlgoe9g7ow1ib6uzezq1tsanow1xtocznpiqnpv23667ctgo',
                flowInterfaceNamespace: '9qnstm9x00maycliz62t7j8m4b80iae1qxprn8iyfi30st8qsii7i2ef6qpi5m59dm5y0rk4omqobvbct8swirpqe9qodsqunx6nm7fs4et7qe2tqgjz7xdk7plnxqmj8mht66gjdrog78qctt09j9tv1h4sk7vx',
                version: 'mg7njdmtjeug2vti3oix',
                adapterType: 'p7g3o6aqj42u28zfvn5rr4v2u6ykmrqao4r5sjfnkco2jkq3xwqwf7ybqvsz',
                direction: 'SENDER',
                transportProtocol: '5u3kbjpclpqjnlm441szf94oi2dqhpvv23ion2wlftptelwpjz1i93ed1ug7',
                messageProtocol: 'ic8jnfcpqlrva6wjpi96n4ls1unyuik4uw7g67txoyl9736loy82xd4qk22f',
                adapterEngineName: 'kiv40i1u2z0gahkphzrzxdzuaea08pooby7484d4otxvt1rmtwjycewf2fl79vu2n54e1cbh1qcxl4ncbxcgjcr9k7yvg15uf2n40sryv47df3qu14y0hwgo7i997btrvo2e5yy6tzstqo30f9bq77w7alb4h17o',
                url: 'wse8m3a1fse51r4ozwyyyzv8397voqn35a17yp6g0ennv8nd1r8wo0qdhwmtm65zx1k0e2k1mvq2i4fv7u3dkswng7jjwnaf8m6brh4hecf8ktpidgy08pyvtskh6lpxwmf2qqpx5n8edrb1wt93jushu8yujvo9fg13069xb03o313a2z3qduygbwdkqhyejn63lcv7qf9eocpoczpin1puab2x10oexzhevjv7zl20h6zm39mz3f0cc0asyw6ndm0nvhmn6smbedda9yzosncazmb6p4d28ukwaxf5cb994pgvkspourl8ew4cvg0h',
                username: 'b24h5fjt9p3fsjargysqmn249hv03m9jbfdy0qciij7j0er5msajmewjeohm',
                remoteHost: '7hvqhn6gsrk06ao5dcwpdmobxbe9gdd3hdv0lhovh3xgk29hhqq3yo6xaivxyp69now84crqpkz8y708n2rqdazqyjfz9uybgoodn30wl6y5hvhxny49uqv6k2sxvq1a4gethl37uuw7ebfgo5og0x6elzeii89z',
                remotePort: 8355325496,
                directory: 'agnz1difc8lllaviiq1jc73imw19jrdn5hzd7x9vr68j1a4q6rkz57xfpxwes2g5e7iz38ovgnq9wrs891huz0z030pp2m5azxhax1y41k7h8clgg278oh8gqzws4ruuq3onyyy4gwfzwbfkbqmv34uip1tfw7k7x2uj59ym40sjtjby9rde39hzz4vzce42v0fjvjlds5r2znwo1f95kijdfud16ifmmy1rix79aq6zhwdukhxeexwz1kph4amx0hugcbo2m7kg7p946y17c5hu84u59byp8sgnn7wo35yk2facr865bszddoro2s06ty5zvt9bt7qi3o4b4rvwra1aicru4tgl6gurtfpalnuymma335xcrdkl97kbsewy568aij4zi6fc5n35v95r2caembu9wdgxgnqjwh08u1l69p6a6y9gcvbc812bz4mq6jzf90sy0xfteo5w2bb9aiytgw0va9zbyl2opnr6fkdrv812mziklllqbzmi3lmfimya7kgjqmlbefvlizkjbmrfivxy957pkp2r70ekacsdqavnjhmnrqstp6liou6n9pblykwlyiukghd7mdxln0dhupxudsnm0ukdj4tmafhw7hcjswsvok64lxbunc3f5jx991p2rj5ncnvzhobe05tguhl0ozk6tdlidx6opyzsakuh2lrxs0nl6n46er5py3tt7kcaunozzybw4pmci3duvr4pg1fgz46uy0oy1rss8oot89ic1igjj5c7gr63mbth5ey9x00ewoeh7ce87f0jvgvwxs8zluzkuya0w7jsn5slodkcl8joevo2avj00h1xpalk5uyo24xrnxos5s9uqf3q4p3qifjsg6265z497cipva3q3yf19zn5tetmm9dvrm2hc1crfap3i0nqj2gegn7bwk3xof4p6fexx8s38l1yyn6wsg42xat2a774mimv2wdk1z9xf0ump4snyk8elvjrofoe7sqxchng1tet3uxzvox3jy2c6jyyqyo3',
                fileSchema: 'ykjasxymv7j742mh1rj2a353qjoytqzt0hlsl5zwmea5ifl27n0d2eanz6uvms5xgz75twq27jogt35k86cn9anp7sislm4vqcpvbhgue53z0vcxtzds80zhf91ny9w61202n7979135t78wsano5sv588qvzvc7m36ruhr43vk6k894c6suepa6agdioe89oj85u8z7guwz61vqyqz11flm8dqgk337ihd96xnhy80up9691biz54c47ffs7scqvs1ykcw8ihcnf8nterf85gz4lju5kelza9i7dmhn8uty7xsfbt2xspx6vy0y2b4inul85q8bep7c2ps2vwysgugy6e10xlswkjp7w8fjcuhhej86knpr6tqi0wl3kr6jy83myzqudy3mu38jltwteugasavjqyiwwzx2uvupnhvc1ncplvi0tmsl0t2duq8d5miqwj3mjtt7gqjbfna8t2og5qevi49j6b9o6731hcjv9ims1pvtsc78w2afr70eokub4z5mc0vsl01p61c7btjzpzu3xvnv4ov78iotyxucg2kfn2ypl9qtgiv6bf5wbfaesfsnr0p8n7owsm6armqr3xk8ycgcffj53f0acnlv0u2ffhehznsqehzs4s9c3fh9eyky9fank2io3zhw1rsz0d3du89avwwv1tdady43v3dwvdmxzhrcz746fgifybvi1m2z6brsdaa9b1bdja4wqijjencq9zhy3xanax8yialsh4l0fzepwimkv3lgh3knorc3l3hvf7bz8d264dzpoh18v2mt4ylbhzuc4o4fb42pqsbb3uvxe46b0nj8e49rnbwakzo7nngf94t6fyo8asf4rvlkkyi9ybox9q7bpikkcxaveotuwk1besq068to7473mlw0c62d250br5jf6at141kj0aow26ffnsfl5uoie9924goz9kpad8elw99x5hrm6fsoka1y0tflgcg6q0tmhe4r843pcd4qpystiufneyztcaxq5v5cqt2l',
                proxyHost: 'rvujrt7lwv7ax6ex7aouxr2mk5khwujkeejcywpaxmrq7h9row0ro5et5c7r',
                proxyPort: 4882861642,
                destination: 'y0u7prndnnfipqkkz0fovokg3g8mb4ynv0pk9eog75s0vs5qzq5psa81jn96vu64tytnjnjm7qer5yz1u3n52fvbvdoxuksryf1wd6rxzpima8de7rvnojh4k0zo0oy92hq8uft4wx6glkt0ycy2n3i8a5mngtvg',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2ypfu5w54ejigs5vr02ekcqj1b8gr2h6tlhvv38txpt91lfmqs82yvaz6fl2cdigs7025wccngm7cpcp92b17rnjdw6mj5bzn43llidwlkw7azdse4muv90s3cyxtwy6rh24tjjg7bpwaazjo04wlfvlm96vob0x',
                responsibleUserAccountName: 'p0nefpyzakph7rnutfi6',
                lastChangeUserAccount: 'ylgays5ujrppqtjh2dad',
                lastChangedAt: '2020-07-28 21:33:50',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'tl21ezdeocsfemvi1rakfeq3h5lkimrd2fzti86k',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'mk288q5vbp8jcsoj6o6v62chnicd9zbe6kflth9dzssd71fn4o',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'q6f6k3q88wvvx8o705n4',
                party: 'x78h7ens14nu5jov978l46gwzrscgzt78suabmxzududxkq7ian9gy8kw93tkkflq7hdu1ish8980ks7uzh3jokndnyu999c82k2zokwl2k78rlz4iip96qpuznmotdxccx5bv7e5lljqtcbgcl1skps2hqoofhg',
                component: null,
                name: '6ub5pt73gcpc5iys8z7f67w11xndn5frwchfbgc3jjwb3zdl9n8ay3prpsi0pmqf2wih619hiizyzulagkpnwtp71ktyphmrwf6rkmpcf5g1t1ouluee1s116u4j0yjq3ngsbzpaaqvy9ene881m06tx7e4yx4hr',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'bggcdgjzitkt36l1olgqex9s707ybg3c2lyhh91mcy5yagn4fbt76cyv4n84xsnj5q5ecbnw154ytvn8arhimyzlqa9lnibc7otc3b878iz9fkel93my9n7iq3tba4sullodsl1zs21y9t7dlpqg37ugwf79ze2s',
                flowComponent: 's746iqe1ky9t2q9927qdlxjhcv5qykmw6g9fhwxecn0fp7ituw7crdwhi8lcstzxrmy6k5wy9iq4tkk4t62pkn6iuhjaedp1avwabvhtakj3ms1rnxshysh6sclmxlrmx5c51h9tm7rp6twefszjc08vgwrb17fx',
                flowInterfaceName: 'j610ksxbkis6ytz4r577imwu07wtoyqya7wwtruf046p1h67n2r68xugkvzth5xma912wqe26ufbt1p82yb4dm3vyscnbv0t9qgqtemyouslfljkf1tb65xmu8pws3xcizlahkaerolpbsq6njmnb8kmr8z2tjb3',
                flowInterfaceNamespace: 'tst937es03ke61fla4nzdrp20sistkcorw8u2vjvomz0stw2uoq2urzfamnqpq70820ca21pglks3b68tlujcywns46lujtt939xjxsi99gtbs77bqntmg6y4gevsyahnf9zacdp8i67nx24kuxc7myyfoopiiuh',
                version: '0h5t9v5fup1t4ls7towx',
                adapterType: 'dwqyl5uehs9t1rwy5xfxhi8hwery792s016y7qcd69k8tus71bx2ycc2nfa2',
                direction: 'SENDER',
                transportProtocol: 'duycxbv0gue3es8ijnbhfqfx6myy557xxze4877c0uqsixptjpjc7ojdskxi',
                messageProtocol: '3skidjmxrlyunax55bnwcdasaw4pt4ii3tg59sz8rwm45nfqmzbpnlt2h32o',
                adapterEngineName: 'qrn538bhhquuf6f3o65pgty608moe616yusgfsmaplgg8umq86twcqh6a5y4c2jyepyt4r42r4jkxyibccuq0307wahe9j3bpm3ctazi13zw0x9wakbddcygxqed07jkqs87c9xlilet5l1wt8z16ypfll6ys485',
                url: '0avvokb5cvlbtw6qkd333n3b36f67qp8sdf9tbg6wh0puexno07rzghig9h3p3nwgnxue94jpe38nmmg91x6chsqkk066zqpusi56bvl2854cvyelgybct26mgw3kd8hpj28wiz0qg1zol2m48hfu60robp6h6iduufr16xty9nd1esuijdviq81pq5guujaioj64lp8eoa0kmd0dfuorp8ked0eaqjpv3wqorbps6zuzkj2zoxluucui9a8m3ihghrim3wyekigjxmwzgpnsj87lu6nmv7r8gxwxvx1ia5cdf8bdlyfj7znh1fs1kpg',
                username: 'cqkeqkoovrtr1v66tfjbb5vthssvrjc1abocqp6477uwic4e12k9o7x011i5',
                remoteHost: 'sr51pda3r45wbgro4c3s4gnsaneca84t27wac9r341zu9g5gmm4g4rwd40fwv8e6cmf97jikibppc9q86wrjtbyksyej7j15x8bm9rgkg3uf0wifx3mnwaqxj4lqfd1vgxdcg65sawdpotbob8ngitrz6eplr6xw',
                remotePort: 8607933824,
                directory: 'zygc8nkh0i5iuo6rxl1m3vjyylkjbxb9ghmde9t9s881g779i4vw91x114aax826qn47301gn01urb3a40f4t8jn305p9rfdvpwnif82ky4nhrmiz05rrz73ruyyppvseku8pyabi2ol0baus8972cu3qnih4sk804wqiv9ivojer8teigaqkuv99zin70p7r1fus5cz140449nk74u1iad7izcan9tyvppt0uid7vcdpkk7vyrbko53opwibvcay107b32ha0waloff9jgi0pliai3ouytg0409a5dn15v24zvqyl4d199gmi0ywlktecegvsgryr122t8yj4ll9n0suh4tlahn1ny8m7wlg9ui8ndyi079t4f5m9msbgi9j5ku2ovgsiq6fa031dhhvoxc4q8m8yw0utrkky1yrt96t4xjenpz1y76prga6mitywmnsrrd40fyntctfkg5fuejbhffdjx7rkrgp74wj16txq1nystqgqaplpq57b436vcij3jtlo829nlvlh0r1kzwexm474jfmd20svh0d19lux8t6tpc9zlp5rz3bk0vqbj9crcb6r7fgwbm5ymnr938ccjfd7174j1hbeqrndr82h7dtliicjfhfvgjui3fxg6p7shjhs0ck2z0o3e2908w7bap6xorl7i0htar5iqihhyuc7z0wsi59aunsuzg19sk1m6yml7bt2xa04jgt5fjqzn2fec1co9y11muxwt8e7a9rbycrfbwr3nvflpwp0tz5340xild7chziqlhqpf55ugkp5m3hcd8tr9ipp0nnqgoqnxjm6h59envnikj4vfbtm8dteeyza1yq42p9sf24lp8p46brbvx4hmkaoeg39g0z79fh0koudrwos3cov5hmtxecivbgg635pacs7guau4iyddlh0ntq2jkmrh4sf40w233lak96owhcd884mohx5sgoxa6vo3nmejkd4st04ku9fsg0i6dsg0xrkfgzrm9bq9zpyiqy13zqmwt',
                fileSchema: '2vaigkl8b0zj80gnpvjnt9q8rlygppi7no4jhyelcl1wm20dl5dbcz7nhhepluktu9nslwpgy5mrxtswc8y7uyrd6edhbowaos144zjn3mhzgb61o8lod6djlsz72mbnubqihltibh2mh05mu9sfqkrs0642day7zo20obc3e7crgonrng3fyio0o9ymzld4pqpak5ao862v1elp2uy227ky1dquu8ljy9gtxih65ogqkjm2dbn3gfoza3k7blkst7vmnldm58e9hr458ijm6kv0uhah6xow14kpevyqusr54p5uigae800t663xxsi9rfrfu0yn7xsv2dz0vj41jv8hox4u7sdkrpoamcixq8r7nqibwf8dqcsbose0rvem3n7gy7ibuh8tpeq9ab5flg503w0igfp2bnfu0nrb8ntfqlw5dcnoobsl0ks22f3us7gq543xm6fhttc2y4aguy9uirlbuwuu91v92fdtxv4pmk8jbncggvl5bpu9ibylns0g7i1ftmxs4yns22s4aptj3hugi15vj83mh4xs9ohpqw6j82yz1xhl8as1swt1rmacoqy9nhmxrngno5jcu55e5wxj8sbt9i5tttnb8dzm31u5tr2sn1wk9pcgnz7rt7932ra02c601h51kq1j6bicdozpukoii9n7s1k2oodx1qcm53woqdeoklxm4lxhgwrcwq4kmnkflzgdbrn5wyni535811u117x86xiv6ljvfc7akvs2erq4v3mlgb572da17jny4ha3ecz61vt3calyj5ni1efzlssd3obw1eauwz2xw9iqjtb70w0uyj9as4kgigo8lpstr99zfpsa61703w5um03j4frsa4an7m70qhymqw26wynfvouuui1x0hn9igzh1j17w3u2q217zuiq52wdv6xcfsx2hpt8lpz6o2j7ma4l5b0mgoy5wfqrw65kqja4po938p1mrike2intp2h5y8oidy2btusjnlo4g3ovy5b70b4dq2dqzao7',
                proxyHost: '1794jv1gq0zrf4c5wcrq9gomfd4ne1ix98lvyc6m5yqw1ywwdksrajfs455k',
                proxyPort: 6527440536,
                destination: 'ps2hm0kox4yy2hupp0vmvcteog7xyfeo1ptx428ylndxl6qo6nyocbyvcnza8zdzypf0ltyr4m7ri3j9xjgs22m4bm19f9unwdshs66u35exw1ke78674alo7fp0go5i7ky13vfc4cu1omhp4dail8b8bl2r738l',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'o1mh5bma0dvypq8ltld728srfvpdtnlhicwzrmvizfoh8yhukgbe7fnbnmmrgbazjyzcrtap4erwd6fl4rg3twnaz48c0ik2539n5kqth2b90es8x4xbe6h58a1gpoqqaw1mqcw2s4ni8kh0t4j301h7kpjnc95q',
                responsibleUserAccountName: 'tz6s3pkvfo2cuyityfxb',
                lastChangeUserAccount: 'xtal8fw0gw04h2uqwwsr',
                lastChangedAt: '2020-07-28 20:57:45',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'ks0v9twulxo9d46nd4unts8q00tbv4hx6co5wvg4',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'zftqhre1ceq5cmv5mzbndr6ba4mi7nckvi956is0ohtshucfdx',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'dtcafyae3526m42712om',
                party: 'eph0tnm8aq91vc4q0py8924r0byido2xya8ieawqmfo6710q58241waywbh2e6sko98okk9r59ie71i9jl758ubu74hf266amx1r28apgwia98975192x6e9zi4p8u0e3fv711d8nj1xjvt1mwhx3eiv2xpp81tm',
                
                name: 'd8kn0dk4unim92rwylem71rvcgfavr8tee1mbeb1x6ou019my5ir3fvopeqk1zzuerm8mp4uromwmfesh6kdbn2lkqpyef374uo2f8nsnkp2dd0im80u73267pkquc82u3wfv46v8c2jc0l4ttboqi9jpgsuftux',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'tnp68nrva7rzmjz4umd802xti584bif8cu96fmhp0kkwdr8cz4tcq0kz9wjo4go7do8vp21nmvv0sslxo10g0ae1vrzoodlbi0ozdiu3tqntp5wmiyhzvzhxd19fw9637t21vsgi7zzkyd5wcpdm65tw7ncg2vd2',
                flowComponent: '2gr59jj271qjg99053gekmyu9w91gyg125h8jp97u2za4swa1e0m0pe747gt5j0t3t9g6w6j8gzeewapw20ky4v5srbzu71zvk4q3475i5sz3m720u2h7qs5605p6o66synaiv1ec78k2nvom0nh66732tb7r326',
                flowInterfaceName: '95b7rbhwyqgynwse96dc0eyugw0k3sar8ki2avkum7t0iatz4thgc68n7na78g272goj8zw5zr7psky9x3opbffq7xqbqqwihyrxgokz4tc3ecyebfilzt8kr3lg2f5802mujuwwshs2y8y2re4fqxc2hyws5tp2',
                flowInterfaceNamespace: '4h1gpr3xt6634h8tbpui53ww22yf6ofjrvmlbtk30gm7fi0q6wbtdszzmhuwaiw3b7298oexh6s0yqiiq9oplfrplcr8dlphai4jtfuukfea5us5wvvzvyha9z9dr8cz38m5nwfhridgbum6pew6q2dydyi1vq9q',
                version: 'cayh7vh4sd2kdh6vrkxr',
                adapterType: 'u45jbefvgl3zuz76lp17xnq44p8wxhvqnkyubpu8hbbgr4dxmgumafmm12o0',
                direction: 'RECEIVER',
                transportProtocol: 'i4bktx9lyh1gna8nn2myb1kybjzcbw96nwr8qcyjz3r1twwe23jpwfrub2lk',
                messageProtocol: 'yk7kc30knn43pyxyrw1np5i83foca4rjxrg731t4uvk5fuvoz65wbxwi7mg3',
                adapterEngineName: 'gcpcfdlerxuuxukw5esv0hd129cl23pqfry26x36mhjvsfu0q8yc4l8c8h3pqkr0h6jpstkx8c8vq22ginsl6lrgnzcr8bizi2khina3cb4x7qcwl1bro5er4nfl1d4tzypqqrpz5idmj9a4sgr9m8wy2jncj58r',
                url: 'g3e4s9r2jnl1s3fyx3wpv4cd1hw2pz588r6pi7b084u9ah3xexxw5ps2q2jy25imt17wy3b0jpohnfe1uwwy43m568ei809i8l0ho4z6pca6u8wx464egxlemxaz1ubv110avv8r1haq9tdxlm5psltyl7p4hbsmdjybsfvh2n0sx3g7hhon10of5r07aaktz7q4x56syea7qovtk3i5lyv3k8aoa6cz676f1hfsnon8360fu95mxuocoisfv6i0mttkfl4ggrc3jx0fad9026imsl1gx1udjdjcj13aoapt17j2ktbfaz5i01g5ghlj',
                username: '3q1dvzq9ez3my58s9mesmyh0rpwh4gkvf0e677ak1jwwj6ddookahhpbhwew',
                remoteHost: 'md57y8rlax22nx658sdzt04qosfllvta2cmo62kho8cuan8j45enkr2mfeco7zpi7u65slnru82qkgckc815htbpoifb82za73o3u2u8citlu357lfr38lfhlf0n1zljl6jrf2x33rku65e98zxu9ge9vepvx5if',
                remotePort: 6888889525,
                directory: 'd7rcc7o2lil8bvpl1fd12c27iv015alqi6g5g4rzc1vzr8jnprtsm8grbmh071gz77qvr9wlo1vnl286d1h6saxtjxg5my97s9ahozka6tb7uog7j2lyguq2xdgpc4hsizb2ltsh04t5925x3a9299yfv1goa2q9fnb3tt0lwfkz6ran74fguhowy39eiq6l9h0fgrd74ikutl5ydzizade7h4n4n9150ulscxts1ollx0vgreiddq32ijhvmnaphxxqobtw3spzet7p1rj8z47k80x7jin2opezfkq23n9u63alo41ngk0w6k3irws5g2ktj63p5j64zs8wdcbw53mcv5hfusl5c19hrj2oa1vkkl60l76m44yc8tx1c7upxojsq9dsfon1g80g8c388t8ltqh785rm85m5un7yptjzxv2qdlvd0lomen4bsslyrj435mwgrhv6nt1w5vscb9x6zm94gol2v4255ltrqt0bq57pndrvk0us5us7lwn73m2uwfnjdmhxcjjs45yli824tivfvmb7icea5bcus5kp10h1wc67cn0ruagyxnsav5djutvnrpib5o685rkyx1vtbq71mf9wsfsxwywfopnnb95f1rri6desr9tb5u2gsco676792nn8sfx49lbvct4jb5383ssva9hr7ge0srv31zdsqrx9kedelryb8fk8cii3pjncsgwx7put2sjse6hd2foxnp7dx5vplvjp7cx2jrd02hjsxiau3k2irxt58lh4cwqbusbpo2nsj913x1pgqsasn24s48c47mn5hyrna87e6d4gc0nf1z93um6ky9umiv60mnrynvezsqfqslucc5jge9ngb9b3zs47g4sv4zf6lxgr9z43n4kdep2qr39dfx56e91dgkqa9d598mam5xp9wz1vcng72h1t6xbip03oa8nw8g1zseiwnlsonkcwj36i63tgn7p9s3ttvxxn9t04wt9au9lf3wh6boiztc19iyig32evvu02prsw',
                fileSchema: '0nabb6bd3gyxvrjmhzg8i3cbg78xcutx8psna3klwo6v6xeaq8aajp9wnqocgd5amu2cxqwdmzand4no1aas1o3w2j80v7wtds8frk05el9e9vlskz30xaoko8ueh68bta1v35v420xwdsbxtz00crz3tq9spqce9xxuv3v2921al7yilr4x7jemmbd8q9psrx6utmowv60km1rl38joqtx58zkqa0h3a2fptfq7cn1w2ivy2jsof5zm5y0j44zgr5n1h3n8sao0wvzdfam8rf3q5eldgsb6z3z5yojwj8u4cso3anr0qppr2qcfpf7llunuammo9jnca3wd4npgznynbyldloec2z0p97fufpgngqbdgfr0eam04joant9u6swrlzjrregekqatvj1k3ava4t4l74jcs7c87ro9buogcgo4i3ivt33741u0tqot7qcq4onf529hkx97x9by79qhxff28ie8y86ufmila82gcd0u4fo0ul10nmujiupajl17am05s2au48lazde4nwppvk6udthl6qp2i23m2er72kpzt1fnvtmcongi4c6hxqab3clctcad2238dwn5ffbd7ow13ale0fxcqdh3x4lw5ei02rvzv31m1ntna3cfhdynq26nvajvu3mcnbumgsellmyik63yyap6cw119pevb7qsc4uts3tdoi8g4lonjqims4iitnhcj6e29t0gi92q1nzg97aiy7m6cyjc4debbcy7fhe6gg43ol74gosj6t8btlzpj30o0y7tqf7pxg4z1m03wtcx3vgnr09s2tp8vs5xwygxawgls000twphrxhactubwcwkai7i4hce9kxv33iooge948swlh2xg36pn7o58b8mqqau20faizeeycfdk9hm9xajrfjxmnblb0ybgdck0y9hzxx3s7cj6b6qmmu8icr17xe8lm28lld86jq2kkis7aovmjcmsl5p3qhzc28iyji468aq1p1ku6soxr3i2l2z22wxq3ngan0h',
                proxyHost: '0wvmhxrhniulcvf2mpb3hmu8q77y5uora2l55jb5y5593tko2ix5i9371ocd',
                proxyPort: 1880304643,
                destination: 'y24f5ic7z1roq4t2h02cksjamqlqn9zrey4rm14p6blqj7mcu5pdlbra2phyzcza4btmk8iep5n6br56993hbeph1hugpv6ng7lwww4hwmke1q5p009p7lzd7nq31u6bnhlt0pp85anq2an1fq9ni9rw9kb2rn7u',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'phi8efbi31mdvz1wb5nelsdat0qwggun861xg0jgl2vznmtfu8778932rlzyotoocfqd63s5uqgxy0jn9xgstmfux61bxqfhzyf9d05sp8usm1a9n1s55fasz9f1fkcyv337ojhhf9xmekf85fuw5793lcencyq8',
                responsibleUserAccountName: '13xxb6zunh7pcdbieyz6',
                lastChangeUserAccount: 'a2gi9drlpw8y1lesdehq',
                lastChangedAt: '2020-07-28 18:24:25',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'bv3lg9ephi269al3m6mj2yws5tnebd6rmkn053qc',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'r5byrp026iir0juzzm2i44wgmtbrv6ehm4l4ziqgmlrvzeambo',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'i16i4b3iiq5me54ascjs',
                party: 'ez2f9oyoa04dl7nuxelmxuzseb2xwgql6732ll4999hn55ii0fp5c7dkrx3eseslnjanecyxm0fqhes3guism6p2pp1tyvhig273gjq5aiw4o07dckrxzdua7gkfqrh4zshktftdo8pkjdxm8cgzvbmrrfkj187d',
                component: 'u9wngvcagnn9d5gineu2cv5twhdgauzjjyqafq92pt63swlikgd3hmoml7768razq11rn2mdw0b5ib943xjpslz7y3uowab2cdufhhrj2hsgt6xeanednh8vvk8sqcwsorebeb6vk8gcsox7zsljcsnmqbplmnrp',
                name: null,
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'wcy7ihx7pylbq4g0mheex447uzii0h4y87qyviof3gwg56rgykqggxrkveayr64b1ill8axt3fp7s87xognpd8sxtzgdy169gb2rik66bs7z4i5r5e2ovgzo9yp2dpgk0jw3uj4p2489rc9lhwzmb0srfdgmfs29',
                flowComponent: 'lvzztqyok94a5acwe1dwix99inmwlp1y7avbduvukwn7tis5fbheyr4la1ramyynkfcala9keuhvrab3kln7n0tjod9r6ukavomnipfjfxgjy7qlr23q0ojaujfe0ln9obkf1f4duyzi7opsgobuox6ltslw9zlj',
                flowInterfaceName: 'mwrr1piylzlc03wt158flutb38peh8ndavyfr92xp5qmr9u006za31t9d5g10s85a1k6e1pt1zu9xmnprgoz123j4drlnxc4hl6whwq9x76l7td0x8gink6ahmc0umov7bmd4gto2x1fchscsw37xwnzy3bcxzgc',
                flowInterfaceNamespace: 'unjlvdgm9jhpqakwqqm8felfzajww28470lcduhwjwpaz9qmzhoyk07feqe1hr70q9wwiukugitj2u447gw0i1cnmicuukfzk980p4rxbyijtftj5cyhgpuctkacs0n3rl65s911ws46ddtk00b8tn08fjov5ib3',
                version: 'tk87td63myahdjn9y6cu',
                adapterType: 'btsvhf19pk734d3v4e0v7f0j8awc4hg46cwpoaeacrg4b3o8i4xeo01rvlun',
                direction: 'RECEIVER',
                transportProtocol: 'uv3evt4luuzilbqu0q8cvcmvayoqx5ceyef5m186k5aee7jsn9kwpb4sv8a6',
                messageProtocol: 'longu5zhvncj9bjuozblre5np4lpschrgr3atswfjhl5q6ork2qzhqvx4ktb',
                adapterEngineName: '5pm6dizwq6dd7q491jd5z90hvdr5t62r0rl7hxxp52g0lountkzjctl50ngqob145x3xdlgtwfb6d9lo1jxc0vbpd2g4dq56nvrz9tdos64xc67xgdzrcrujwi3upmrf33xp1fwoy92utom7t0ri9fu1awxa2ski',
                url: 'psisiqps08n6i7rywad8thyzkjk1y7iv6pts52wuz6x6lejq99aiw0a2b46bdu0tnt3hm3cz3423yzpbbc8g9nvat99x5dhh33pmctdbkr98l3mmrpyrprh6akt6ns6zm0j9pmpeqvmgi7wsa1f7hg9a191zppz0j4qipgpr33toyq62eraogj4elzlst3cnusjf2y75849pv6qaaqpe0s2oagstyq2wxfc7sgkvum1whcfuxuuqgexqg99fpmg436hvqsl3nejo3ev8al2qhj2ga8x8psdnz1oakjp0c6httu0m10nnwbmzr10q35kz',
                username: '2v63mjbhp162zl25khqhh1d0lcf7qc6f0wq6qfvv99po3ds3ej7cv7xrfke4',
                remoteHost: '6ou5pcl2mwp3eg4dtuyj6m27in4vgisd5em2myv95fnuiqbmzyg39870xksleos8yge6p3xzb91mp80fx84dmjczxcd4f5whme33wshlv9ftww6o9kwhqk516y8jj0uidcdoygpyh3bhpz4sc5r87vczmyanxxih',
                remotePort: 4466634798,
                directory: 'v8cyl5qaynzt4pagfp38129watu0hfkv7hsnbxfkx56hh269sixar76kg3ib970pe59r1gdo2ic5hbi42ujaz23nztlk9zwnhubfphh4smsdctt7afqr8qjmi84sojuwhunbdis1sodmnkqyx48nnro7zsfw8anid9yk5m8a9xwk4pkz3esguzuevdfryr026y6w1bedwi0gq2typ13vnen7nnyo8f2dg46x7rqk6x6zn6ucx8dssjpgn1yt4tulfza8uyyz6a2p0d9jrkfq9sj4k1fouvhigx5cvivlauato84cqkwvxhcduorh6hdjowa6bwvaivcxerdz5f45xi84zn5r7cara3e1l15w8z8jqyqnxiu4te579vk2lx08ltgaq57qq71kzwpmxv24chywdxprq8zvuvboh3ggxw3pben2wg61c50ilkow8ch3k4vn4aa8gt7kghp42fpa0jd5it2wvwr5d8ztimcykw49tyd2znkoppjsbkrvne43af55xodln52muq06leo05c3vrdf3q9ybawd6ysysfvu671k8yvv69qhs8gcywae6incabjsf9vb23ev9c2uuan2qrdhv6aotjul2qusvo2ditq8lp50inp7rw33mlqrbxx28ub3y12h33dxumgabkc4istndxbq9ctp2h2p4fq9vj63prkv1ijdy9pq4k0fbxzil2re6d79ev0u0ntlmemi7y0so49hx4z8hkz2o3rwg4egs425sk56hkonmgl5yw531dt1xti46jcglsph9px1hbxjbqtg8wcbp0x7ghclca9im5p14g4ng6njqtdb0nl5dhom767td6cq4cyy218w6tx58q9vet3v5y9rj1pz76re2femnb66v8vpox7g5vwkebf6vdf0478rhb1tt4uuo6z2eptogjz033l87ukig6tb37nmy4ms5a9dla12lfmogrhnozyjx5pjh0rp7awg3pvkio9l3mutsk683zdd41mwooqhao9ri1bm5i26f',
                fileSchema: 'omx84mjp0v3bdmfzd9p93cozf6wj8rvv59ad2fqz4ckvuokcynei00f628vdhu72gssxesxu6uffrdmo2ebelysh62sbb0ucmawh4un3f46f17wilm1xfeok6ayngiiui8zn89u6981bnff2wpclayvo9axmws8m9v6wwc3p8npgpss9hzvoaytx5xo1dsy2kglio96clftl2f8810942b6ciiscs41p6jvl7wg4ef8nu3b39xg2h4c8r5bz6b60oh45fv9s78fd2hogvwhy4qddgg6v865vttoarx2tynupd8nkxa954qitnp7mrghl2634gj0c67xack40j5jsxf2psd94trt7zkradp3v31tkqght1fmesi1rxzxhw8fhqvsx13k3ykthldh8wczi99xx7gwpe9s2gqqtta4zz3s66airf13pmll2mktlaougb2avpzc4o0rkt34xoffnv0uz0h66dyf6e1i8fn3h16q96ljur2us0iblzepiw0fy0w6y30nhr6piftk958f7mgllh4ln1p2qgw41eewfccg56vaqzt0z7sntj0sxg50ujzbbjet8c0rhda1fmmfb4jvach93ejz6341ztqkp4whcn3cdtbd6qpnga67vjlbg4o203ns0frtazaan73rwsp8ex8sx9ctigguuwytckiucruljf2pfymqtkcpnh1fyae7y3xdoin53vtz3swdmurhwkfu0vts4pxnsvondluwosniwm041hcafctf5mcjxscoqzaeedfdzrx35582lsxjsnw4da70ajtu7qq8wskve5l56ep897rif9l3gp48hfqbmqbrw4tas93vjw1mwf9nslcavk945q26o05qzz6xdzeng7tn68w1zc8kgxfnf3tv90xxgiy8luxl38ceme2k4uwuvrjhltg3ydixny4of5e0yrau7v34y2rn3rvddqdautilsqxi3xwiw414rudl56eurgn3nrrswz2j7mzioqug5y0kx1i91xmjgo1xt',
                proxyHost: '4tk6wcit0lekulddaokgkvuzw3hkoxatddbb0xhl9e9h3pw7uj9f5khdis2t',
                proxyPort: 3334420235,
                destination: 'px4wevigsr1tdoihvdm5lmm7rg8jt3lkt9cv3ewp3rx511uxyos0fpeou2b2rhw2zlr4jcwmz3hw0l0a2yapdrl1gf44u9egkh24gayo17aph8l4wo939617zp1x0eyf2ahnxtynotacmfoyjugjx7yygvppwc5u',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'htbv6rek3sbb46q1pabntir8bcgnxlno5q30ijltccuc71rt5exxaod6vglo8f60mrmzyw5sg0am4k8eur7qr05ahdtdo0ctbeyx9qruid9pjmylwjlbmco4og0uq2xmmwflvdlk9x6r70vgnhez6d98ox0hbsi4',
                responsibleUserAccountName: 'izlrqca4swag92w305nv',
                lastChangeUserAccount: '0etyivawll2q72xhfpjx',
                lastChangedAt: '2020-07-29 07:30:29',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'wrbhei2sxo7q2s9dmi8ux719hlcy4bmva6rybiva',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'lrbufianh76at2bahnkk84sr2ed2b90c2xeopdozpw2th7triu',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'm1wcs2lhjiowbi5qv7qs',
                party: 'oxqfitkyqvjuqkd2txkki7zm6mg997ctllb6keq93fp1mpmzx2fj7pbxely3j1m5ug44j3lxxndyv78ptkox1pi3zy44rz8z87h0jzll16iv124hzi51klt6o6ro5haacs0y8zduzhozqkohhesocgg794vpwn4g',
                component: 'dst6vu9d2mzblgxnbuapivea235pqb9hocbmv2it714u0zphdgrfv9d143gyhsticd1xgjkrau5o4qqy8apfabn31x3xlm9oraypu4ky02qr5656o27kjxx25vqnhqtr55c03rqa7dmplid20onnvpwtnf9tgp01',
                
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '4s4px337q6kvgnpq1z2614jpb8aak2z892xp1ae1feqndsojq3nla71sv07n04f00yy4460y6fehep9q6otybrj7xwq5b2klruqn9ejmxadsm6jrwby9gr4jm0mp9ok7hq9w67fvr5kw8lnn67sv1pgyf2jt14am',
                flowComponent: 'healfs7kbjmqxd1jimwi3ybp9gbccgiimc68bn51y0y3zgeu6u20w3brvfc8yy8d7enn2iffyzcxqvouma4itfz3ks0uoyzbl094gaz7lxatpcmniov0hnem5jxzfhil0x25xp9l71a3xz04weet7d7ihyrf33t0',
                flowInterfaceName: 'cxhja7mt0lot3qu96q0qcmr2yh62tngqqi957ax8blvdx00ir3frgtamga4b1lxu7yld6ctt6wqzgv28802fcaafi3pni7d9nwnecrk4hcewpv6w37f5iq3unfznceoq9lqbju8yw7bss58htsda6uwsp02lf2io',
                flowInterfaceNamespace: 'xsxumar30c6vdsm1d1gpanqcs2p1ts0kpv499wred4cl99rdvh1lu1qc93wrp4e0gxzdswh91go2o9np73rs279q2jn8dve8ew33tgythfa8jaeq0j790ygx5dm7ec9am28org78c8o7nat3bsnpik1hh07ft2lb',
                version: 'xvpany1t1hkefcx9mgma',
                adapterType: '6u5eqxrpe66p5vnctedj0posfs1sxthvj32uvn5kplt4n43zm7odxa2axbs3',
                direction: 'SENDER',
                transportProtocol: 'zv7issif4phxuigalny6ttzwy166cicysuo4p81u7fl2rll1nmq9xbsr5sv0',
                messageProtocol: 'y4o2heegk3mdnp5mbx4j7ct43x6mqyqan6p5uhiq73qhvrbg3ijnhoy7ztxk',
                adapterEngineName: 'dbocht73b1pbof24eth4o5rkd2igqmft9v5xun1kr9jrv2ixdv3hbfvj6nn3hizfkdzu133av622200rd7wdxg7ltxgw8pmces6j1vjuenw6ggx3oif6iolwgw2x9k3qjd2qscaknfmnbtiuocnoufcmdykep51z',
                url: '63hpcasyvgqjxe50zwhz5wwa7f6q3knnu8lnw6gt4bes9de4zjf133ujhn0dr2r3rp87eodmxii3pfe3an8w2t9nvsxf7am7j8upnh90hd807iux0knvhcddna6uumpwkwdt10hpkejq6qr7b0cmgw9yr11n5levb28gjyc1vojopaagxh09pal1r7hfo84mgnpfp1oxlrsbhj5oj8nsr1s2liyprufg7bbyltdnib8kxrugl4ceb3hcm051o8cn3atdoquu6p2s284jgx4px7h89k5yvjheppltfsx1rsftdee7fyf34r0mkxl27zs2',
                username: 'ae7t8gno9fm1dm73kw2sc23hk9wkke1ienaldp6rj8rbuy8a771w5v1f725v',
                remoteHost: '50mzqx3at014bx7kjetfjcl66td53kaqhjhorblboak0bg8w96t95619xiboyqvrpeien8pfmbu81c1wiqrl4h04jqs00bou3m1dggv4gqda5r5javo2byzt0480l73xbvxu1irexhmz9payhcuka3f7l1imbed8',
                remotePort: 7416628859,
                directory: 'q2s0rd51r30cuhip1wr0mi5rv7dhf3oi9r3c69ki62evq8o8a3c38ye6qdz11p4hxwbo7yeziwhq0wfhu2k77y7qj3sg87k1try9mw1gtnbi00v8rf36vfkmjb48cajcx4w01p6pfyy4yks65yaonfmj8akvyqqlprfazffodhn9ckq4d14xfc15693hhi0akrvttrv7m4j3fdzd4g10w9w79qbtdjqbmi9wrakr83ja9snh0n1mlewos8s5v7ufv79k5sbu7gwsrkrugcp5uwsuegwalk8mqoyn5enw5u522sbmun6z28isnlo09vsor6nw5yc5n0n21hq9sv2qi04i87oogl7rquceee7ioc6rss7tq0wswgc3i7y92fb0f4796jxtntpg077j3mq8xedp0gw2fs2qrop90h6db3jmt3qajelr5166i65n6poiauh7urxfsiu9czud6iyp02p4vc811v5ppuqtt4em3yvqbphc68o8c3i9kkve5fwmn37tjipx1fhlam4y4600w1wt5ku8s5qph5bz9l7rdg332z1sfi0vzwb13c0a1us6eg4ctjguzwxlf9042gigzs5wqude362kzo5o0hka1zr587rbe62vpcg05epoadaoz66f2uhsrquyulb3xpuioqyozbbfl2gpwulhyhh8gpibnfrb6s35ogs0u0l61lz0oinlezj6izy44n7usqw1sekz6men4i1mxa5ra5x5tje7u67d8ldnkpqc4hne9132u1mj5fzf5p7g0bbgea1vzx51nsbn4x9hzqcl6jtrtfuuqnwi199w72n5p1rdxszypaebq02w26zkxfmwijt87xw1gbmki6l34voxoph3dhzr20sx2d10xe5mr2q3vb3xbax2vgha1c30o83vge394x025ndo9iwngd08jif4hf3cigaay9rh7qxg6f7fcjfdjzrwardsfbat3v7vn0vvhk6mj2n8peyc0z0mflmkpcznl176zhmj93ismdx9ztg6',
                fileSchema: 's0cly8mlq38dnjz21lzln18v86duajw5nrbyowmqwp3zs09gmuym2rro80vu214xafrtibhk0dy2kviamzntthkpgowmmrcwp6ucaegws9swhjla8pxn94u2smg6tamng5hwruolutai0bw52cm69da3wptz6makv1maoxu2sxakxxlmbhmee6lau5gy8308ohqqraab819bp90t37tlee86l7bfbllakk9qe2hzc7g0txtu4pju3c874ziar0o300lm0vb6ux2htlyaxw01ojsz8xs0ugkw74unewcdjqwagnk2hv5fmbnqdzl4mu2o3pusbuc8xvjwptteb7jmhiuqf9nonr521zi9oyvgbw06fmuo8m92j08nuqujakqmdzi7dv2iihz65nkx26vvypxh8pd91jc3znhha6l9bhl7s4hrw31jqmmasuzlyd40o26myb09hdirqx63lqn1ojvp1sy99v7img04b6ashsjjatog9l0ebjdx1nsg9nrhxmw2fmhejh63d35e62d1smuvscqbeiwu49h9ngb57t50lfky0m62ua4nnsrhehebhgjffgn7wn3oqyc3e3nrn7z6704347rpjp6hjehyb13pwjummu8w8qwzwzj2wooayelx3hzpvzksmwt7ic4yourw0p1e9n66k7qzv5vqqzdsqm1w530epew9cdk0at5gf82skhgplwbc5q8cytleplav2y36x62cf8bpr94ljqqce2zewyq05z6lfhdvdgxd01qfdwfup3xs4d3xs6xtpopic84eleq8nrsaquzyy1pd3lo8yjescie05j9z1xf98c6twr5iegelx8ei5ajbhjaepzvvldt4rn532vllirec1k1hheu02lhu1fd6m4mrjbahfss67m3ecvr1796n386swrwa9m6zdfwiekwos2ilboqz65axnrybdjswbko83mco7ew7zpxl0hdaenp97ldlrzhhlhbdm35l5j8udlg9xokl66l764cxwngevo44',
                proxyHost: 'c4ysty00q0i0u8xsv175rf80tzvre8bvii8jrqjasruaeerxt9a6x95wgp8o',
                proxyPort: 1184323357,
                destination: 'v1x858rufku9lwv4qxfjj74ibdqsulixkgs1h891avmcy0vv0umqr6ekuxahy1yg68bph0tmimz8s07nq6fbd6xovk0dop3z8kyju5eu49kvkbhoaui4phwdf60k579brm5531k0zqb6w6i6ji15hahd5hi43mvj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'v06zhrunpc9efq9hofx4k8jdyutpyyjb09xa26o8y5nl0tigaxzw82t4q28wihaa0txpscgb75qc1ijuf1e9rrmeq01y49jopbmolpp07uy7i46f34m538h5nbmpb0nlae7vmur5bft77f3yqgyihyeo86lum6o1',
                responsibleUserAccountName: '7npapq74cd4c2v5rgsxq',
                lastChangeUserAccount: 'bbemtr90ruu74kjtd5on',
                lastChangedAt: '2020-07-29 10:26:55',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'y5yhsnse8jmxk9gl4yxrikpz19n6ar0lptwpf3gf',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'tlmoor0blpectxjjawbm6m7oe9gtgi6yd9c7g38lborg95o7ri',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'jcjnkz1277cjwl7bv9yi',
                party: 'orfsbmxmgqku7z8jkpg4si4gi8am6gwkzwq6z3myerkzn9c6b3qii8ee57w6fae9auhy50wjk58ztrhgqqq6z1r1oyh3hhdoi2ja1sygx7ni9y3nox5ffg8zglik9367jgr09y6lm9w3me6xubj3u62ww5snqzf7',
                component: 'n4rbodnqix9djepz80r5mwf16ohdcj3sx55pj74py16cwxdb20r0t1voryiihy47amxfed4f9h7y8neg4wtyj5hn7t06n8xzocspuw3qtwdf83qhu7f2jeuowmf0mvr1nfqwjxg2syfkt5afm45nj3afk5h9u59b',
                name: 'kpopgdsq86kus72ifrrwm23jjca53q3c3612sz9jbg9p89sl9f3pk1m6xbfs8eylhjbxazauk8f84v0437yhlmg54f6huzmdjtn9fa2n1xzoydm5caxutknfwyxj1s1jzvr66kzjwszjs7ql06dykqrxy6q0jxv6',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: null,
                flowComponent: '5dv39dq6l5lgce6iaw8eymast1e2d2rhjvq7lh6mowr8p9puzoqiovikq8elvaneii362wfwhw3nkc5oiln55r5qyhv8f0eoplwudyzj00tj0f4zh0eg9mkxbqe7e7eajl0lhdzc4b687g12m9v2wjysewhnfp6h',
                flowInterfaceName: 'y6qrdn5xcu0v47dy2fa38dc93e4w353su7fvwmd2vcz0qznk0dbr702e6gk6h01lo7sc4j2mg7y1nu48p6zjvrl8n6gp4bisgvqpbo7m5yig5qd09k0qc34d923gsxmbbnw3di9a1xzn8nkramygy729bsfpwbcu',
                flowInterfaceNamespace: 'z5jcggz6pnesgeml9pc95f6v2mv6xi2ywhw609eys8azyb682mz1e10gtwwf87idvoreccrq6jqyprunv8r2472i86rrgxydakuh0rpn7jc74p385g7uw8vzkutc64dae2jrffsdl0n2vae6avlgi0pp8o167r4y',
                version: '6scesv2xxo8tps3bm2lf',
                adapterType: '53m4ldrrbpfn4wenck0k979ejmpicb326xbp6m4y2g0xetzyvir227fjs29l',
                direction: 'RECEIVER',
                transportProtocol: 'mgpeqst94nrugd4h21omb4thpd7m93r92ccwpxgpjdy759gn7gmtjf105fwe',
                messageProtocol: 'i05d037n8nhxym4tsuby9prsbnt2jqd7tgg722k9amziz797izcp9h3e0jaj',
                adapterEngineName: '4hz0xezjnj141gjvsbmaj5jsae1piqp3d993di9ex12v1ilnqk7thy39cn9qwyso6rc150qyznjutgwscyps8pw5ijv5hxyrvkz17qa8osdov6jkiqlm2fhprqejiwf3cu6775ko5u91vx27nxupji5zxrdp5gda',
                url: 'c5mif2q63dungjj27qoyu1fvfv3y72hjm44vlb0ock6z0tsex9scyd9i2ts0e0sqzxttp0phsw32tdt2m703au3q6ykef2vpzyijpw5btephlxgrffnpa8atox0ud67i9xcrv1nqps1a2vkxs67x53st4jds9alkuzk0kur7ljlw0ets07gw7pblctnyf4w09k093hjo0o26ftu9lhiiqapygbjqp6b9mqyd33ky0k4fwqbcjt6bx3msd2te1og7u4xunwfd99797afnwar8e4ibaspmi3es7g5gom3dfggdap7ynbwe87njf9hnfbpl',
                username: 'pxhqqowksyccw496yit71im647vepwu0vhdf8zl7vqplqv1ncixxmgwvi257',
                remoteHost: 'dmvusc3vztblth40zzwpvajay58biur9hyz5ahcn3qqbmtx90uq0fr2o24t4artc9u5ngbs6cgaxwzfhrs61emy7zwmareky1tkpne156qv85gchidekchmwpyvgxyzxvglhpgex67elesc070fwtmikpx0pfbc7',
                remotePort: 3093448578,
                directory: 'xuzpp4ce5dgrk85wz7gppktkxzdq8bct7fv6fuknvrlmt97czhgi8x9o631qnurg5o3am4aubiwq4tpzqla6m0vqt3b52sxhqqss1hdplkixgrdj676ba5cowaibuf1febsft84xvk6cggal1idssf70citprdm1msyox7wu2mx1x4e4nqhsoos88to2wutunpv23zj7ubxbwtwc34bv4wakxgfmztdjjxsv49f2lskq3ok8uw75p9mh3vbbpkebvraj3b1jlj4vtm0cfd72dnopvz6x5ntjphlwiq06vupiyhm6ou7u819gvui5o2xg3k4ha2uf06pkvf9ef03z5z3znbq4ud8n0wbnqqko7f75k1nb0mwfvhzai9w3lpsc9m9ou2p5531yemng83km9gaox7wb2ljs18s8hlrt9hakqbfjyemb6k15fqm3sojox3829wdh42h08yyh6v7mzwnic552o2i1v9ulayht6sfl4qpbsd4hkie3u0bkogmmjdcd59yt8ikoqf55rzut9fwn7bbby4zmutmxnoenf14xhgqzjd957ufocnaqu9cojb8mtkzayjrsmrusj30sd6ecnwu21oiavmyway83xq4kluprqg4v23dceofkmjdxx1sq4gcs6od17vfr2kzd75rlb2pvkrz7h20a54xptmvfvk89pbvp61ljvf41keia9dyqf4rhxyesk0vz9n5jibs0kgdnldcm9m9oxfha6mcgg4drkjn3fd9pj31tms2xo4j58prn62gm908m1jmql7lu6brcjx22o3pkzyi6a3592op5q0fmj21696veaziulhypf0udukx66oxv1ei6ajhgfmxfh03gfi2j0i07tuhs11urh6s3mn0hbmb0om3cs0vlxzslh8jfdczbgruafwioavv6zhihhfg5j8lrum9loq4i8x9vbyfr2jvrnivjdtyqxu5ltf9z5ad75uvoogkqkfx5rnpk6xckri2ivv7ee70b0llmkxplheyaxi7p',
                fileSchema: '7be3s54dmouccaslw73kqchladuegr73ei47mm6joz1j4q3mqfvgnjd3dkt53mv2veym1q8rupvcetjnuxlwc74422kqypmzdp49ogmxbjw5vkvi0uum4fehmlhx548agvwxmpwnvkdvw49rn9rw4pmxk8t36zzu3urnylke3x3cpacbiquq49c7nctafag7wscp39pzokhg5yzjmambq4xci7fqrcq8711vq4aqy59ex8gadtttvoabsvv7o39h1ogsvyi5ph6au6avyqy0j8jd8msy7w2b6uivkni4iqb30dgtab9m1wcitnjsafantzrryzkidkdgtxnj3j0lzwpkh1fft9albp8ln69luutzr95z5c0wltr58z9da0497tlvk3i629owuwrkefnq7wp50h0vql1j366gurktfq079npcvyuo2g2bvcbwg9q3rilscpda8317a6sh8ppeqdd0r9whm4tpm83sjji034otxiqyeq1ae372q2xr2scte3wjrzl3pt7ig3yucfv41sw5pzvr67gumnix1suwwl9bbq703nd5za6adaqeon31mft3jpqs0ijmdpidqp1498s2a9vxu5uju91oqetk5rrponlqjesrtdhjlikl83c0rbmba64x08uryo8xrb14g3s1n4t0cwsfwovfvsqlkq2hdsic2aw593s5faa1tq20k3607tpzr7znfwi4e88hvadbgbfmbqsn5ua1gorotoyz9vrdotss7tdzzb4ltxw4n1278ukm4qdb6d7fuvohap1q6sw6bd4t6ag824s6tt726y2wx2qrp0wb2mqyiep8mb0x62rp11vowviswdju8g74afcj81q29rlgatnxh6t85ijl596ecdqt7gydzsr2ax6jr3r3nirnqokpnbatl636dijrldn893d9n3569qz7ucfhb2beip74neklt3bkia38fqzkm3nctd6jpuhwlz6kw5g4j310hctvcxrf7fb64ucequeri8l4bzhsuz5l',
                proxyHost: '39r8rjlrgyjy21fwi0i4fgfajabfzm3i36sgmqmjbhgq89dakzkllxe862hl',
                proxyPort: 2844009647,
                destination: '8ybr3vynk4yauo6jblmg6235kp3j35eetrmewfo3moomx89qc4x6bia15h6oefemvda4us5evtctjx9qbdv0331xyi9usk4qlhhryol9s6uvkrumvs9hpul1bny6055t1yyndrv3qry2nm7urroteb47hx5vd13j',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'x24mb02n1k6gr9986fcc0jbgedq0wc2q9wtgn3xxxma6j9li286bs615iglcl76x3zd6zf7f2nyfc8wcgdq05okia8iieucmia4o5pbejgoqb916hfv7ougawnvponjvr3dwci0qhlqml2kc61x2u3ezivcfy3j3',
                responsibleUserAccountName: '5nsehs75ihx28lfd6zqy',
                lastChangeUserAccount: 'w04bxe1oz8ibn7xn7ocm',
                lastChangedAt: '2020-07-28 22:40:00',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '1i9a8v7rt2024skzlae0qxnm2yj6rebfdi459xes',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'uick6qcbkvp4bnbcrteqocctx7ij698ffzdhi15pc2cjm0dk7u',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'ie3n9ciy16bwe0xatrq8',
                party: 'ndkbbqvnck3hyvv3bmw2g2auardq9bw1srh8dujxd0nyv87o7rmdk9wdwjq7uhst69g84wtebx9bofg4r0z2faltduqaqknig502gecaj3wo2lb4q2uaqp2glqeo18h7k0w5vdadys8foynuezenafwttflgnm8b',
                component: '07owzyut7ozltas7nr2llx98ivej6bi5l87cclhz07txx4iz79zdm5202ekq409cya04qjwh85ebiehc7ova4ynjy76fenn2suzilp70ri1qdqwy648q4o149qeaqz86d52u0818l5b5f126dx71who5e4ol7r43',
                name: '7415r13jw1imnpc54qa3fob7uqlrwcmv3kxyzlbwdbhu5gze3xn9ujstjwrdmcpo43gvl57zkbt7uxxg5ix96h3mpplcr2kh4venf17v9aewcpdmd7318go0m2ql1n78iala4imspspuga53u859aw4knatz3y1p',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                
                flowComponent: 'sntgpiqvyh6pg3y4rim69r3e7p2xdrr4ff27opt79azjy55a64bee2nn0t0x3uu43svom6q58w9asdyhnnb4o9rpc5gcwgubruovyxgmk17b6ekbfto47ag8c126idtcgorq37i784wlqk5gn1ffgwv9v988f9j7',
                flowInterfaceName: 'dy4lpivp7gqonuko7yx9habdomx46xanwdzxxrsj5r9bloi5vi0e0puj03m3shtow3zin5kpqxaqny6dt7bn0i3a07ui43cwrag9c34hcko3xj011xkochh60mippgh7a92iqldtwcp5hn6r22uz3yuj170kiz6w',
                flowInterfaceNamespace: 'uo25505pjwy2zym1hfpt4d28ayckqod8tzlclewyeg4sg2nc2f3mpddgfy4k87730skqfdgbuzhz3pn8kwbf3tw61ujl1f0acwa6cdwxnxcj2mumhp2u2kvttjaw27u4b6zxly9vi1lswois2gw42pb0atarlf5c',
                version: 'ny1h2k170wte398u5y9b',
                adapterType: 'tljb5r946enai0m7x6jvu37bigynh8u3zjjphe93xgcvhrcd8pduenm3uco3',
                direction: 'SENDER',
                transportProtocol: 'hcsk0ofo1vmiaykxkdvfrnv98bjo6fwbc8ekf7uo927aoqsr6ewche661y7z',
                messageProtocol: 'wqd02mcjm04idt4gj8ng32i82ht5xl634q1xjrvnh0duzx6u2j3akyj921h3',
                adapterEngineName: 'ui2joip15xr8opg8l9avict3r5qs13i7bmd3kokymdqppv01idngm2rwm3v4vl2g65hvvmrdubv7s9nmn9jftjgec0dcg71ieqnt8dktyfmxpazetwu3hamc7y50g4vo5qj3ll4rd0oa8h78nlo217ztkmv8dgt7',
                url: 'fppki50euleyinlzhdwsrk9jph73lk25dhsrl4jblbonmbcy28so1bdmk9icxw1i5k7b7l634f1t89vrpacv91ufdmb82l4nl2g16m7lxhxbultd61sdq2asfeg9zb11xwoiju82ocv5s8pip1z0iav9jen9inqf8se7t0mx4ag5fi9xypn9tiro6bwrdw1v4tp8o67wi9zhzzsw8thkhnflzv78u9hc35akzwkw5ys9fompubppigd38der596vri0s5c4j6q707yo9j8cik68bhz941rr54j2w5swqcei0mxexxcfpub7jbb1bsrqk',
                username: 'ue2178i4fizo4q8vopr9zkgk57u7euikth8nybwnong97cvcr2nkont7dkkk',
                remoteHost: 'v5kldwjebp6gfotg1fj50bea49a7w2brtapyc3qt21xtmmcjcmhoctzckzsh2zrbdu2zat8zg4q0fpaqjalzzad8qxg08lfu92a3z62m7ag6csh68zpfubg9hrpau5mxcv54at3rf02mxi1adybkljotjmi05ety',
                remotePort: 6190113118,
                directory: '36zb2tnp7rka5rqydwma4nd8en4k5xnpqm6c48o6ybgmcigridsdfwrh2hqe5et9fhl4d6s7n1cphhvmrqca2v0r68040t3v7vowfoq8uni9ks4ppk7sjp36ssttoz7m5gq2291xnrmwlb6ghjhe9uhp86cctp7dw31bi628srfin60pqdsbj0sx2d9rls9qvap5vc6uxqd1oovuyp1nt7ryngop5x5zo9wck1yle8quoncr3ywah0s0i1k7ok0vd6w1ci3asqp05c0q6ukzar0c6t24fltqrd481fi0ww6oqces99wok8gd7fdtpv7api3ypmhtds98lvf6x82wevml2h63bjtc4siw9u94wph6hh42v8vjznc2ei0e1p0ilewsvjudq96x1j4tttw8dqx7eu5curacbx1qmm0ou83ww2hx4u9r0e050738c4g1biru6eohfxsrs5t79601jbdwkenm1b648scwgnkyyds0f8emb5fraqifw1mnvsfw97seknfup16ln9grz4ctn631gx827wd41iiuvs1f1hyi9jo5wn4n182sjs3livntwyztikurww0161lldrddjozhgez6zph3co7muo8l5y92vyidbt8sn32r1slfy4uwff3uo3yenn84wyrrf1nlz7wyu8zg5ykcuaesfsdc6m8joz6zoow7ezzlela30oy636bcrbogjnr3geczgf4fnoq85u030708jf3jjgjnlqc4x8ucvh6htbac8cbpo4bwi7a324splfiekg30gn5pkj13c7q1h4skodqkj7c3bnelpn20h5on46rhzrp25snpywu9qfqpdf0nxu51319obdj6je0z5eqn4wstoi84pphk7gga0h7cz3yg4aw1ic3tar65g6g243jd9erctevbqxj7iexa1yzrvwkxx77w8tyhl6z2kaqnbe8ovx633vorc4jiy1cn8fcefvr28og0s3xvnyi1gnv4frdhbtj2fzz2flvovluwpksltdiva4i4',
                fileSchema: 'l982lkzzkognxxhnwyvjiuuuow4e9rn7ghwtylqtlky9i40dcty0i9dmgb938o55yh2m1pdwmb973irt5mycprwfyv384eoo9hkg5eg8qb2dp91l69nvdqpfja423ap491nmbkmdqpa7xu531a69w7bcc8tmxriy3dkam6j9zdb0devf5dvc416kthl0h0qy86y39jqrqtaqrl2qbl2oek2anc2709k7w6bzflcocm0rv91agcb6kr0rxm59285m91uzdxi7snrz57uphjacverwfhfwqqt77jou71g15fx2b115dpy6fokgocaen5qcbrctz7igv5yxjv26mh03k1nim22czwirb9eslgp4wmwsb2ahc6axp4xz0xd6g80zs5i542rh7sxe96lzzyue03vod1qoyyon6htmyakw4abaysongp7sufztc7zbqop47sofpxz56eb5wsl6b13wqb6y251dso7l08a94704i5nxs2fapunufjhv9vk24yz54dcrurj2s5isrsgvhfexizyys46ffco7hhs6wrxpxq0vm6xngw7mve07q3pw1vbl7u7zbyvgwmak3x7mez13loope1gh86gmmxbznve33j926sah77orptty90otnthzqzy5n61fjo8tj1614wsaprb077557xuvnzryil1oe0tvu81ugjsn701hfcinvfebnt1d2t1zr95bxw1dbah9z0ia4q21j5t7uq6ayfhg2man6eebwm1hb2g6ah58jnnhxik5sxa1wj3nix0rusivx898jlweo2zkhdvfju90bb2hzmguieprcyn2htl8i2du8s27ur6vycb3hs7sm90nfwsazlvsrql3f64drcah1dgxaasabu04i41owzq5v7iaeegk9fse1izbpnzhys7n94y9gkoh5829on1i1syzhbyjs1saa0wez1ejcvoil6loqmojmiu7zh1l6xotq6xbozi4c4ew7bbdfwmgygi3bbof573gjilnkruts5iejpwj',
                proxyHost: 'e3sjx5wpl689m959ms89d62d6suzbz2u5dg3lfox1yfuap9710hrbud5fk2a',
                proxyPort: 7360464701,
                destination: 'il50ipkpdshr625iaj9pu62o0pd6mip53qdgvobc7l2fhnujw6gjejw7ev6f32nuxctdnp8ajqpovchz2ywq481jakpl5midosdmqe8s4gji6tuntkiceljw05zkdpooq7zrx7s52qqnnjkk85iiuealj0711bjq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'auzya7xcg87g3kau19vanxvnd3w06u42oqfjxd6tib1s9u34hmeldvbsq72ga3i9pg1gmj5uy8mvhqnu3x9uclsbakqkzkbzkbw4l7cj5icmeia4720lvkeq69q16cubkiw1sh78ojthiv9ake9t3m5jph0e8stw',
                responsibleUserAccountName: '5w9otzlv7szybxrf8w0q',
                lastChangeUserAccount: 'f42ks3v6hij9nvgs9y00',
                lastChangedAt: '2020-07-29 06:43:23',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '6brwb5c9fvq60ognnfng0hzspqjgs6x0psy8di79',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'n63fb5ymzzpayt6mdoaruhxj6rprsifya5dvkm8ixh79hvwo5g',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '2dt50pjxn252nj3w123j',
                party: '9vots7xgohp1iqy1odifoiggnizr2co566meal2he3oqy8q2w5n6ebgdntm2rnfi0jsdtxk17a566jwyjooyd7r0xquf35xeq0ra415nzedila00a6csxzv8yzxs9sbhu4cnwszr60iuhk7rgabmlinmp53moyx2',
                component: 'uqahr4pbsytzy099jsnzqfejijrini6b2u3sgtq9hb9refmuublkgzabflfjarl0j9meysqpeftbk58hn9mp4zjzlf2e8u0emat1nzttsvbjxl3fm18c2erd279vyql540jrhfxa7411ygimztun4x7tlwwg3a67',
                name: '23dfxoueqmmwbv7ypjbfws5857y9acpjc5s93aav63k8mgo541iophqn5tpyqqfnwfeqdxac1u3e8n10ffc102gf5a3qvjpzlcrecf4u5hsdl35j3zd69zyiewl46fde4sf7q6c3v37w11sanh0ai2tva7hi4yo8',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'ephag71wcd6lq0d7vr8zkd2tsp262oscl2lceuv0goa2nkxluygtz1se9rdl7m3ok5x3hwn8tcjmy275f4m5pjn50zih0hrokg6nsayal6w40rs0ebdszj0qg0zotfa7zqx88funi5yd8th3ztbeqy2fu40uhzr8',
                flowComponent: null,
                flowInterfaceName: 'k2xnzidys57w8dw29hqsmzwehfj4c6v8vthow5vaxmxzvwcocmw2fttnh0tzfpqm13u5lx3i2inyk2yu9fye0xm91sbbmdu5glygybc4552nzevf81u9t4p9vi1y892psr32g425qv63j0zx1hfnt4nti4dmy4h4',
                flowInterfaceNamespace: '8l2x5q9klbou8ez9xlceeysc6o47333iyi4tucvtdr1urbt1isuh1kwht8cvj4xqkrjicyy95rojgkcke6m6p25oir1tickd4u4ai9bfw1yr6269si8h5moaqau4sm2dcm3vafhu04c5occw1qmv8cnih1hys128',
                version: 'w3irzr3uqodxradwmiju',
                adapterType: '8d0bmgnqswv7f8zmey3leuvt85s92iyu91ev3e5ri1rph2ysrskxs2dcpryx',
                direction: 'SENDER',
                transportProtocol: 'aw9wynra7l7nvpjmgaerhorr8pgduwpvacnjgvzbwab8mdrx0x0fvtmykzu7',
                messageProtocol: 'z261yhbsg16yozhcj9ijvm7771lj981ciqf72gbk5qj56nc7qpo3blnvqw4r',
                adapterEngineName: '8sd5bx49egz3to0zmuqlm23twmcri9cpc4ufrtr3jxo6eio70993i1j8xx4hbkhlpo0jm3narsgip0ye0ddt7950rzf5hmhevfd9z0jsqdekct3q1xccapzz5v2rnoa40mklly0nnfs053uepqm0p99ubmyncs3i',
                url: '1zxtuxtairsex0zq7i7lre8gfqfywmt1sw3i4scpz2ul2mevkrzy00b3td7z00d8hszrxxmftu6v1e5r50libxf9hf26omgd8ghuhx8yoeb5lvy0qak5stsr3g4b35ok15u57rsgfeuvmhr3zzrbu5domurd7iydecgtqaz5dunqndgt8ngdcc9r6a3pq7wu5c3f0etsosa2b43hxw5qs2of12b793kqvqxdxfku7hjzygfmie8h7m3o6s40y5jth2988wwtgypx2l6il7zrhaiawuggampdd55tzkoa9vdpfah1r70b63ehc98hmu10',
                username: 'kpjbuxuu6f4ax1piai88esqceahmkpton8lj9skdkigjqll7bfynkkq3x03q',
                remoteHost: '0fcep5t0oezpgdjzr5985yjkcwqeiwk41j92nihzvcuiv6omjjlkwcyapxrymgj5685iefnvi46yudxhiu9o58rdbzi5k1gvqzgmb8fdln57weei67mxp5qnce0azt9m520e7ll2kl6whtlc0pkznbkh4g1gqvkm',
                remotePort: 7331724701,
                directory: '7c5mmihjjxiovoztq1xzzb4ny3dywt15l59yzn5t26r3pou3w56s9o2mm57x7ssplq4cezz1epo5vbfkxj01rczor22a3peuyogsnh9fxdgx34j0lyu9kigpsrbs2hflfpmixf4mu2ozsu8so8ru1rxlqci3qwfvagfhl8mifgfvq8e5lfuep8frynvptejan6gpi6bl61gy2ruzye3eb8tovg80tujxkeekqz2fnm6xu8u7ze6tqovafcbnn1of8dfjuz0a4a3tffn65eucdujb36pmazpcerb8rxngki8gpm74y3vua1615iqvzcx7r8cr0od7ekcar729h5268cxtcxf0p3iigfxmix8alozlbnyv65l7y74hki1eurmhr9cl2caxsl0fqa9bmgbcjijqymc1ydaynfuepa7spym8x181gjo71g6k68w73vpi7j4qriwy9iw0s181wtoc2suixtswq89a6ptipuw7gwg5j33ger2s5j7v77j1h620ka4t1va29dm5wcselw58kr3bs8ssttjlarm7yfh9o44crk49nvv0x1e1y8oqjsf57ezq8xfrorrc0s9xhw66yf0i42hb0lskh09xvf5dofut2o823ed23go5jfzep4rd4vcqfaufwq80dzhwe8ec2mn74nqu07vdl6a2z78kw0qsbywwdergkeoim216vbuun39v0ukbfqi95n8b061ox8gy0rk7xuwbxwrce0do1i3340uvnr1dp47anf6920o6zgj6hhggck2cgoa21ahakcnpabpitlajbsa08icmz13k0et3gxrqsr54ko8yxabw3cejebpemk2ewd72jp0ecgk2l21myg06t1n9iknhqvsja6worutr0s2du4nfq3qok7m5np9en9973sg6hkzt1bbbl2ahi3viec86374qjkb8hlow4zj1sj84eprbbwn80jbleiqrsuii4lnw65x1ta8mm71t2rpwbfjvzqxtnvcx3m4hluy0rb3xu5bgl4f9',
                fileSchema: 'zvinjhfdargyzwaegpym1mwfxidmxddhrd02rz9e4o54ww63rparln48eszn4w8ze1wjsimezhkg46j30fi51mhf4efqpexj01bm72nhggda4frfgnv2pk2rpwll32djytu4bkwcj34gjnizsp4m3j8orr29qir793u1j0nwmo3isezaydzroqm03mn5u6wepsu6s2fs36af1xf0ctt7ffasi9z8r9re0rzyzjfkx4n2x5wqifqtk171s1px63hckyir4psl1oi7avpdjsomqr6wk116iikie36yce6mp21nwgvpuwkaakzwenf1hngigq6nkg0br0ehieb19saxdl5p6ka9h7e0lao24jns5fnhqnurgg6aos401g1zd94azc0tt9udnxfol1mwohfx5fi6hueuq6vxgdcw2uiv1nhqjdqcrg2juhjq1db2q7gep77h7aunzbi4u3t7tpd1s1k0w08kvotpeuhz9hxxrp8gevz8kp1x6pdi2tccaguqyotk7oy94xvnc8wlhr6i96wfqqpv76l379ffcw8canz5kgnjq2fmlrljuilz5fwtve96we1fs8vdamhkcq5issoq921qdjhmcxuze16kh8lgbvqtw7qj5ikh2x1mv5xsnfmhcl8gynxe5nfkkls9q8nqmogvykxs1vesf3p6boxy2cqi2f2961notsyyde22g1qtf3e1w95q6kdcypawjwt4otl1kqgewz8joexmqrwy53uj4kuyds36urnbrpk9d4x8ncdzwt6adsgx8p8smpa42sqtatt0dal9oxin7on04wrewqn8xozzulrpquqr93kjbce1hiouf0xkl5283dzfxh8wtb5pae3ayi55rpy0yurrhdec29o8g2s44zghfsg21wwbfe8sh244w5xe3xmowjgd2h4v9i4bktson7nmes7nq5gpt4msg52kfplhwvbfx5dd9hvz88wi9ty0kvdp8tcc0t4dr2d04hyed1qd6nmjn74ar1r7uv4jee09',
                proxyHost: 'sn0slmwz1fbx6po54v56buyxx05b6ofatt4x6iam21j5yaadg93uaf4h36v1',
                proxyPort: 2531311283,
                destination: 'ca3cu5b5dc6vrqqhde365he2lw6hu0ideohwizwgccogwnox6xoguyj3w813ubm1xoxgnpgc2nl9qwx3papphml39rx4nkzgu7y7gzuu5dkcc29enzsebd8vvie5em9rmfxvb3z8vpu3vq5o49zf55p4bfsrwd4t',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xg5dmj4xfwa1qyqnacg7t4ysfirn1to5hjafzn6ckoh8n78c10ugw4rc1qcwxdb6az5whx7spf0hz0ex48kv7hho3k2c1rve674ezgwivjl5bxnyfp9n7ea7gi2gugg8pav9774ckhmg6firf5zyybhu3y84n42z',
                responsibleUserAccountName: 'esv5r7cd55jo1ax0a7fw',
                lastChangeUserAccount: 'uoay9twxud2rdxue1dxg',
                lastChangedAt: '2020-07-29 02:41:10',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'zn0jxswhrt8czke440reaahmjjw5wu9p7fpkrlso',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'jqwd40muf3pr1ngko5voln96yvsrk06b3qxvsn3l0kx2m3o4pk',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'jrht4svcxr4ozczv4rgh',
                party: 'w73q5apknr8kpes0a7k63airjybkjji253npqc71i1zvf82nz9st3vwbyo9sf6cnzpl9bo0wqsvmzhmwtpz5gzcrru1r0ctyespvvmhi4dq5j7lkcd1vx3g97jvw25ci1r1kpnleuge7f977o7o60lil43j5bruz',
                component: 'uhnms7r5ovyploq61mv5koqq7vusb7rmzaxmp7anc58l54rngfmtoubd6r6oxt8ilm1wzzlflw3xn2batqxcio9wqpaxlt1h026ln9xbvrtuhv3ilbgzxebvoaywhz9tqj1fnenop2jrwklbbsc65vbp2ggvn6kr',
                name: 'zsfh5fod998lvg455ukcae5kbq2s8a0ntmcb6czlra1af4viyaz9zjims014qhdgk3getzdblewmphblolutdgyf22e8636qrbwvqbd9xxreb6bmejmzwg439yvjrdlnxsvzcw3fam9h2teoceadfny1776c72yg',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 't70mgsvo11n0uduz9l7dtpobz1r8ssqdshvy449k0ljq4eymt19h8ilbzsjxn1xy23xtri2iya0lerqjgtalucxexgmglubyi4tb3302w8gjn6m1cwu4d1unr5v9skth4b1kvcwffdg1jtxsas1lrqj9ss0ojvjg',
                
                flowInterfaceName: 'kkm4e6bw1bwjt911197vtvcyoqc5rdf194iyzidyw6ysap33pdcfixxeclr0a9xifwtu7ow37l2bipi13ecwlu1pdz6wjrmsq7jfpm25h4a38lt44cq1npe5yd8y96vsym459k3cq5h0cxq14vbnirzlpner7adg',
                flowInterfaceNamespace: 'tgv2cw3p06v45nmio5d44aqgi60iwqep9wjbaqrlulc26cx1zn4xc47mbn3c6au5106zk2fz7djp44r9913dbeeflwok5lwuekp9sjvdhpejd7hk4fpgaye35hflvuxwumz0mbkism2co2107tf1anlr4yoftsco',
                version: 'd8xy0ewkhi1cs6kw3v76',
                adapterType: '4cdc05gjdd82u7hmttgjej1p5ag59vtfg9r1alfhj4o2aumbuspld6xshgfq',
                direction: 'RECEIVER',
                transportProtocol: '8uge0hub61yx5e4sgghygh2dxfdmsasu337zn4g2e53h5xsg9q7ea497oaco',
                messageProtocol: 'tck9mkdtsh54153d3jq85sgeph2z231vp9toi02ywprtxh39d5swnw0wetyz',
                adapterEngineName: 'sl64kdw9rwtxi0v87509zzsdfoovmjb0mithkrnhugeyodst8z252ik0eo777f5phjdxza648909jxerfbzz25im9ifqj5x5h48uqiew9ldfl16ugr54u4oopnnnfbpsiw1ls9yqkg0yqtbj72nxh2tff9i8qaah',
                url: 'tyntfknvancmtmho5ncl4euqo375bhxbqx7crov9fxoaadyww5aecihn3kxo1kn9tkme2bs10i76dvrpl6dq18kp94xsokn669tseqr9e7hrcfgr6cofdui92wp9adrn4g6er3pfqvgtxqm2vohi1paczpn3ftt689crxbrwg4nif5nt9nhjs3jaapqk1icjc767grh504eu52pxlm8mltul06t8fbkscd703xf4zcy2t1l7d654gcvtei10n6x5q8xm0ljn7zmb4k5ez3oczgwccvdshnjmb60hfaslu6bm3tz2v6ujjg1gf1592xi1',
                username: '1htwxfw9800tts24akchapnp9wb2c2qf7j6tvefhhju61wukubwl5kd00r3d',
                remoteHost: '4uapq0sw4n04t36e10l6rip2i43tjrzkdeb7b6zt8m4crfbwllyo2s1hizf5ajv9w3ib67biwvwba604wet0rlpz58f9y4o8rpceg0qdb1euutmabkxwlk2q0zq6t2yidqxgo8aubkr2jaem0prlwvmj3tj00gph',
                remotePort: 9346761459,
                directory: 'n4aqljt1fj49nqkcpqa46d5ajlom7r62b6k0xxrnybs06ayz025b9iixsu3j2pvzen2v0y0s2i8b1aw6pq3ui7qfsnbmigj3whxzg1yj1lacsk2u5wao6tq984sktiyeljdwmo3c4s3ns98lek1e4tqbe8h05a3y3xq261hocw83tjerrrts3k56gdb3le1x8wnl67lszd0essk9q4vb4y1d37izuljiwx2jewpkt1jtbp2fkisquh82ojboascjzoy6uj5yff2ezz4u7wbvuajoh1mu1r7bj3nq7xroheqbrkln5bfvudwxmgljcor7ozgpmdlm32bi2t1tfhoinc52qt8888ii6di63hf4jcnhltg8np2d5uiq3iuwshbr9s7o9n8uskq3yzps7hgfsh9go61d71vd704kk0rp1rh5ulgb0plqn3pxmv47gtrex47s3jgt4jihcqij6eguk3hwr4w891ykc1khvc1egmwvttovd2kjtkk8u7qxjhoed8o329noj7b0gemf5vu8tc5lb6q4v7p8ex49kifpj4drly1re8k56wum794cx9442ool1njkc3auxehho2wlp6ic3ijmrjo9g0ftcah6rctl1cme1c2p9ie0p5wok11o6amorcy0ve8ajjypzezsu7arp6pun7olnht95a0l9v6w75bdinos5zd4tkokasdx7rluymz6nzjfs9ojoy0rpciwqnxk6khczkyny0tq11qas54jtz4hmeu45xg2gdm1c4y5347g4kafnlyjhfzvm1tnctuzgl5slk6a3g5ewpv5zo2vb8p1afdxhnq7mshbyw3nc9on5a2gsbn7u2l8a25pvusbxawf3tlcynr0b2xhj09mehx916yejg6is3n1j9y3f5l1irftyo5ae8f58t68fcchw8t51qcet1gjkqgy4t6sifvekzb7btkzx7vbsaxvuc075u9qssoqivudk2ajb971spmqc4rbg8oiwrzylfnobteh7gz1iu9n3mc6',
                fileSchema: 'xibaevdbkitbstq95w5sxdtgdbhhysmnuhxsesbgadrsoidyzyzdlemsec8h6pkkpbt6bt5qgt4ridsmy5ew9ghzlfvrrv3rwqq774ccx28j1ta50ap8g4uk1mb8prol6gtjjz03c4pva1m7389icwup4fh6wywk0p9gfjwxxxoo1c7mosnee3p3bz28twih15lcubnns62i3343mlwdbpcg0gize7iovpt8y5yjey2yfw9c8itfdhh2q6kb9l5vtzbv5at8fqt3qb2hhuflzvjy2sjfwad06xub00qjxg83b2j3qess4q4k0l0zvm6xjqo84oh4k9yn8d7g3rlmt0st96wsvh4xmtot5ddev455wkptrx796ijbljanykteq6monskuugnii91quqs8wcwlkdtuzuf99opozmwbtkn740vl37hyn0v3t2rgyj43wbxv4b68j957kiypowig9uok3p5ola6lzfvqq1i7wd8m37k3pdux4qvz0h3rqt0mv7zukcerqjlxyttkuzzmdbtdg35ej8qrw7ck0a1x23lvkrkkmsikhsdv3tyczyktshop66t6hsnmacc5021fm59jlhpqpm504lrk4rv21uqry9hctiq9newnxdcl50f6o4g9tt1igth2rfd7l4ya2y36oiqcfgrfwowt4pwplcxk8thhu0axpj58xdi6r7quuy5wky9go98b3pyw84l9ks2fit07dbzk1w9z9jj3sbr2o49y1aurlkkh84xxfli5gvtl4v8oplq8dn5qxwcmbe0jovijp7h2gocs5mbitwqfg0105szjy6um65i04terdjvq54fq9uox1ggzeafkh6sjvt86c38e9s7hlhi7i7sdqkt89y98bu244un99i1u3w64o13pm4mb79mydn5xq7pgjt5y4kmjwqf84cbniv3x8xqisumxhrbuu9iojvqgs0k9nwzmc26a7wr2dgbvb2hw6827k57duk377rzg6s6i1rmpecvlqwo0ozq0fuxj',
                proxyHost: 'kekawdor7cbmud03uzqorocfz27sg66490adfktnwo4vq8j12ifquhoy6it5',
                proxyPort: 4764607337,
                destination: 's6n7eyk0j8y3dmpu45alj0rcbnm922ghud64cgx0v6q7hvxc3c7sqx4lmrrwx2i2olfegk3ssyzzzavu0pnkggrk62n84j3bc3pcuy1jbmv9yrzrf56fdhxfvoo6xd73dnid9t82h5jcp8b4ygv6opplw50ebs1i',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'm5j7f0w46du3vj3829tb745atgl39h4m5v9pebmvwrjccolhrq1nk7qzgdnq9nseugvdn32lc4dfqqtlmbodumwx3ecbrignk3362l4ngr8dns2f9zfhm6fezka85azk1hei5xs21gxbx3jucsu1q02w1obz8h4j',
                responsibleUserAccountName: '8nm2bygx7kjedolhs78q',
                lastChangeUserAccount: 'nw06fyifw403kxyh8o5j',
                lastChangedAt: '2020-07-29 01:15:51',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'n80gupjd0fp8oc55dozorqp7otpiutpkn53z8hvr',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'aoaao01078ke97l63z403hq5hp1k8fxkooo1bhq55vjz019if2',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'jrotgjsrijoqstf7cjf1',
                party: 'yar9gy8tstlnvwgtoe5zez03656919a8mvzkdsm0mdpsl1c4cyybwopif2f16ueuc7cgcs833h4q7uzha0a381aw9h9q1ogg2uqowo88j2y6dlbrhrhrra8bt0xcukk1r75nc2jp9lrrtaya1yec0mn31doh6j5d',
                component: '3u7zlvdq9eu7ak6fh3d9ianv1os1jmqvjvnthsisg5qr91wgnajr5neug0d9gbmzxq8urbl5dd8q90err5kpgozr3c8nvkzd2r9gcbp0pygj1y3jkc5tmpphc8bl2snxuzj97mlfevkzfk4lq6ddexbk3n04wngf',
                name: 'ok0vlgt3a68fqw1u6l7id0sa13hehhvvmte32ogb4rhzyusla2zy9xrlxt0p2uc5fmof9i2pefl2rm740ta6xxo43sozz3nxy0irin1mh7u6rbfp6n3btabzk59exo851uki79tp0xdenu4yl8ta5pr9cql4mu1o',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '6khhkscgz7tqb3w16zrghp28t1qpw1u6t3qnlomw93dbfpgpkyd8fo3j2j1ln0z935kh658chfkt144sc1w8huawykz59mtsegefsj8cwoi0h5mzwdeitiw1vc5io9849xjc00bwgxol207m0x40n5bzbxsqwhwb',
                flowComponent: '8uxl2zl7ngg8qz1qws4rv7ivnlad7z1n6gwmb4vfwwxep4vktkr24cbr9sggyzqg7x5wwyt3vj2hx4wn89p5e4jnum5mef6xi4g5hk08r9gq42fjtnep9rd293kcqj69e3acvabs1izlmx1229i038ofm46q2wfm',
                flowInterfaceName: null,
                flowInterfaceNamespace: '7l7n47c3h7k65g7m5s1rkmliv4ik2uf6la3jtlsdgt0kz2wo6n0io3acqub0ww8so5q705t1h8pxgo9vag0sfx8a39uqkreobiadepcgo2erj0vzj7897h2phjfcoesdui4ssd1xjd06m86o5rfcu03s1hqv0a1e',
                version: 'rzjuqmwgqowbaq3ng4nc',
                adapterType: 'ryll3ff1i5tibt4gfna561e5df9p6gu913lvqc0atimbk7g6envkparwrpe7',
                direction: 'SENDER',
                transportProtocol: '8555508j21vn8qgd6h1k4ueqwf0o74vqku1rmazm715317i64m99thsue00s',
                messageProtocol: 'i5olhkxlc9f9jxbjkyhau53fh6r8m7v4uf2v5a8j8299ln6ox0brjoi0o68d',
                adapterEngineName: 'kgzkbqzfret79ymoroqt5fpz10mm140qpk90xikxy9beit09mnn9oaql4whn2fmmelv1kszmum3l3y1l1uaim1wh2k8kpnzlqmb2i5zfytrzznmyvr2qn3yav7vz7n6q5daookf740g3wm0goswrljz8amduomou',
                url: 'w0kx4quuzp97q6q9y5wrfwtnb5hydvqqvln2sykjygwd9js3auas3qllb14wwgz57430fry4t8d5upuunuq0ockddj7i7pj990r6l2ppll64ycrl2ik5j8oreohh7ksvbem78q83570rfbt9lu13myjbzy80rt415dv1d8lp86stjjnw4aatf2sqkg2ulvmmgc4d8qexyp8dtcew5pt3rmglabusn5ca9fhe6ujblaz1oqnzc6iz0u7e5hg5cercgrna7fu0attnspve940zdtc85o9wxdwcbcouc5wludlz3hbzqzsn4buqhfpx0viw',
                username: '43ey1k9uexlrudwpc9fztuowotd71zu0gc4ja108wd23mv5isk21y162xr0x',
                remoteHost: '0gc7moovl32munrh63acnevjazo5gikbjnbhqv3a3vd7i3y7ozsfwdyhksyqzs819zet84fm4l82em0i0qebujz3s23zfyj98bufg6gq938v29r4caxu6jvvtqx85dv5s84osrmuy9t82hwtc5z5ey2cc4c3x39p',
                remotePort: 6714795989,
                directory: 'xprgcoujjkxk6zs24qbv7vzt4c9gjg7e7r4r624qxthjauqlzi30n7n97x2ump5i0lact37yubuxdbfoo3yztlrpktcvguhohmqwkv7ptr3clgonccjwvxxcavxatqiwsge8t4gt9t8oapjp5svawtb23xrnfteb5r38d2ahpkz3r7ngd6fs1kqnemb51af426m793ngp08jj93iq8q4k8y09q0oq40qmr572hw65j1a7n7l3ez64d0n0yih3ggjqb75solmsa6e4utfz7sqo4i0q9lnc30gsn3fq3auo78p533ajmza9vnh9ytjh2go8k6xz5zy8z42zr6o4xnv5sr0pz6j2t2k0g3d058bpuh5w204kuxga9148100aymna8mr4rohizxt4qcq9kxom66zvpxntjpe01owul8ya6ctgvbl9g9ba4f56p63kv4ron0xwuj21i4zdthronyt3z0hy5w4vewoc1k5b8rzrrottx0kjgkfrrvxd99rr4lirwnxeggjl89fg07i2xzbwjtklp0g5p4ufbliorgz9v3cwoert2crp9776t5kj5vmhtmfmkfx4hmp8o3nc621b21a4fdsvly6tt1ldfuwunjexdku53kh4nu3wcg7bhhuzoo5k6weualtptlr4u19hutepmdq5lmouni0b5vkw1x3m1zbmqmtx0pzq5w9abcnc00g485s4vt670i63pu4jrieo0h426sy9m574qfhqxfom3dsbxux2qvt8zb56rqfqton4h9ciifjgjeao0e7z6kpvudk9whwpspjehw8awptbakasdw2ieu3s2adbicevzfw6q2egsv5yo6rh1gtoakfg21rh8qw7rmgw0in39drcmt4d9xeh90azhl00ngjqle33ml218zn3k64xqc7iecsfmbz8c7zwpuimlpfin17g7fmbp3yfmzr8zkfckwptvoj7xwo965d6k2sh84n1j12jmjvat76tgab4ogl4bpogrtshztvtvuyjjmnotd4',
                fileSchema: 'byhjugr6l4a41u1dtrlbviioigmmpfmqe5jakweik15t7mixi4mcdcxlu9avi97s8wvzk4a6mpf1uw12f6y4lpm0kvk3qo2vu59mqcc50hf1ofk828qnjij638jtvjn3cth0221jekfhb9maiwo0fdrufbjye56oyzjo1n7b7tna59kjl1aw813q02nv7a3kgt2uplorfjgyy3msdxtt5plmb6vyx2xvr6tubmu3jk1lgbyogb08v7htwp3mui5ya0yhcb6l2rpblotp0nwdi8d2jhqxoh6l27oqo7zn0j2x6vdnr8sgyuqqsuwd268b0ha134acg45gyyckxodteu83o3i7j4gtykl3ppk1d6zl5e2eecb237xai03n2xqzgscib14z9xeip72y17gx4t8pjr7glho4tt4u32tbpscw4c8dkp1cjz5yrm2l68rzf6hdk0n9a89mnc8faciildkb451c6o3sgs58cv5bslk4jq4pwc9f1hsmfiea6aki0ji8iy3cbcxq4rrqpdqy0wlv1r6m582cfj0gsphpdhnjql0fh4f8ib3oixb77lhxpmaqqe2ei6nf9z1nkqidlsgcphonfqae1phkdn1q4vviwrliygm09w9xf62u6wzm87yeq7z3vihlleyfoc8rtco0fd8td1uopfbd72prh8ozgd65zpgnlkf5k5pwy6coa33beii2df7dwj0zalfw29q7dlhm2h77b7a2gcx4koonamfhvhv2jm7xsgkn5yzmtc7ml52icdc1jt3iu9ds8bamxw8nsmqb6q3h8kcurdj7mwh4aufstxmf1yzja2qsccy4ec4hpljsasaqsi52bbf3r58aeo4rx1t14yd2n7qo48m04ct3hvd1lxkbwl7ie0c3d40f4c8lg7n1aekbhrql5xjgx13sgymqmye5crzb9viqw6uhkqklhgdggpsp901fwazj9xh5nbq3iv5vyj2wav5d7dcnd71dn8fvt36ia6u49l6xl9pd20slfcws',
                proxyHost: 'ag4u459o96crxzgq4ao23u8u074c4s91nbw559opb5s6t8pp6fpuuw5w7qgx',
                proxyPort: 4946856295,
                destination: '9f4ag7dj2vwre4q6oyug6f0f90wld9dchdf2wxnfiros1085bzut95zbjwtbkjlfwh5fctvvi9aj1k0ilqgpybq3ysy1fn9sv0ln5ezx4joc7gf17tgbx4svzmb6n7ziez0197rbkzipop3frey1s39mpfrhkmla',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '90wi177bvjg280bthwt0e60t7ug16a3m6c99tu1bztrinbb2r96m7rwmhc29h9rx6gfpgrc79xtq7n0t2yfe8pf5p44ao5bbpm12o8622qwtw34k4qkiqqbbu1xeba1bg4pfy41wo43qysun9hg4y6gccr4uo4py',
                responsibleUserAccountName: '5jfnfz3h9v5lkeq2uk0y',
                lastChangeUserAccount: 'npdez9zgvf99wt47uy6g',
                lastChangedAt: '2020-07-29 06:50:35',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '6sfwqcxb8lerfhjjdnxflp95bzrgpe1vq061s5zl',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: '7ulv8wdzwms476gs8cbvxqwzvuw895p1w7hj7e8fr3p1uj071m',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '36a1fri8qwdb7fs416d4',
                party: 'akgqjefmwgrxtzmissi7gqjwqgkzzlznrqdomktezigwaevfw8mouq5llqg4t8ubt43zdel7iaqyz2cbcci52fscvrs33zlb4k6lst6u38r5e97lilggy5xitby4y91u3lx6wvxh359hbv4dgg5rytzlcx7kc0e2',
                component: 'g7xdov5gp7pza891sy58th878amypos8f703uzbbcezoehsac7c1dohvo9p5o8yelkayzneg11nmu2607y4ykf7fgho8o0o6b4i1l9hu5xonz0yv3br7sbouhjk74vt14hkuyekim6adkl5i743njly107sca8yb',
                name: 'rv8k62i7g85d6s14gm0vsj8un0e5tlrm2z5vwgkk65f353boac549w7gc19tojmyuzjsrf47j24v21isscxwuuqd9c7a6d2nz5ckkz61unhmjgirnsoo99uaphx6lmjrqtj2cgh2098izbu21m8yty2ogj1kls3n',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 's4oyqhu8jzs1wllisfz7j83e0qtgdh423clfk0t0by1emw0z13mzzchgsyhpymq21j9duthuwk98atx25c6wqa0pu97m12rxctr1fcxwjq67upf3exgft7yusdr1uj9xbmef32d0klh9fhuxvnhpp9vus47du5us',
                flowComponent: 'wz7mrlxhj8bab2z3v5nsnusfcjp74y4k8jevanypyto2kbv4o9zczm6r2bjp1g4ta6myuc3qpg927lqgtv5gvgiq157thbgwtvwvo5wccfzuo3z1qw2279ysy9zwagf5l62btefizuh8mxtfos8pdk4cjwwgbajp',
                
                flowInterfaceNamespace: '7maymhd66ud9znrg4u03fpe7mg2q364mvcru7wpnt83x0h23b7u86ysbr9peyekjuglost0xjwpmamn3skmuoo3vx35nfp8qu8whl0q63m5y36sxkedi48lkbh2i0fto4q039umj3yhkkqxni8sguw1meq1hjytn',
                version: 'b0bgy3kvt57slsvb3707',
                adapterType: 'q9djr7me6115g0ruuf1fl21cfp25dnpgnc5v8dfftlaxyvu3imeantveuy6h',
                direction: 'RECEIVER',
                transportProtocol: 'goo3t916nlhytjnkyx4rg8jbpcmyebnw09seumlndtu67hqgxpe09ykfspzr',
                messageProtocol: 'unfgz9c1qvg1r5o5zj8wyzpusgzihxfqpw25phu9acube3fiap8f9gc6wokw',
                adapterEngineName: 'vj26c4rrtu7z1kjbjvpfwnvms6p96cj79axd7ckv0e2l1ggfmtug80xxmr1ocwl45gpfk57m95z8xkg6iixqahckdph767pxr5x53lztgirrn446r9o1ie0jwt9ucp2j3dzok5dx34ze8ihunyiottpla37e2ez4',
                url: '5kd4bcldarbiel6960bzkyapftbdv7ambtbvglvz5rg9zk4t173hz91havtiuiwjbltwc7rbu52at8fhycnzk62c3ffa5b0jfbasdrb9uf22wbqhg21jt5sspax2vn1buefqv7rdai2wx96z8nr9icy4yt060i0rywpl7d6p9mppoq1n9e2r4ntk6upv57ap4n87pqmelpzbtrs0t8azdmb7p4xn7pt20kwlwzes2m3s9h5xltx3uk8b128fe7tuz1sanw0a5ritrg1jw3hgjued2re1itwccwnffj1199632kxe77ymy7umqrbivxa5',
                username: 'mw6b3kl2lkkup2wfgquvp6wd6ky1vjjfg12gykqpi5cn1f0jn8g50x90a31x',
                remoteHost: 'go20jfl4fgysk9p9qqvx7saxj1q1hngwpx9q1i6wum56wvxqti7wpu81ficvyeq3jtzllg9uetwjjcxztdgdp5kl7yx820jnopja2fhq34x4mvpf6tz3nxzx3btu47gwrsedrxscu96qdepsqik836j6g79y2jqo',
                remotePort: 8100303456,
                directory: 'fxag2h33l3944noqr4r9rt7c7idyqgacdjs0t8jwfy2f0clgdhlyfnmlv1ncqqtjp4ouuzfrpre53y9lrd9c64lmomvup88evqk320lhh66m1h4tib39cg3njyul3llxr98h21ca2a4n4siqvxl0x6zl218dwju5k0eewi08q471bjtmh10g7jyt98t2qox894c3lvlhv4k381nnh6e0te85h4pehqpizf1x74ypnqghgeot6y3plx1u5cy77w3w1n9zmbspvajttnz9bm7eh54f9pbo5ap8p22jhc0dwkqme7r5apwkqb8t9ukxjqa7l3zl7z93wvhh0w0zwjeq0uklzp35zassx7v350ymwugmcvrza15a4bmwxcpplz2saeqah9l3estm3f6uo735kp4jstf37csmu7nqjyo0ws837jgp3xfhtnu1s89wofu88ycbbbf4jk4teuxh420qx0apwm2tv2kbnvoynt6vo4pl0dv1knhz7kma3r735rn86f921q20okzoqfjdqy4pgixyakqx8ao67ymje6n2z2uv14z6dt31hm1ezswbk06qfx1y3wjm0zqkubf2nmsbu612w9h5ev9d1nym72g8ru297z5n1zmjjsp5zotf65twsjzczen9a0v01p7nmdish8vd5af6pjgfjglh80yrwut7i4k14xnwetkmbq2li32y8vf5bv2hlf3evxw3q9slq4tsvtlrrh3hckhbamz9pz9b9c24istxh3s51pr2vm7n11r0f4a7kz0zt7v1sytunykh3z7a1n3dshsylndxyxjn50xmu1mellsa7ohgu6u1ck2ktq9ucrjalulmjf5oqve0pzavycbj52n8qspsnbeyt5f8eyhv2dx0kb5037hxuzm9ywwqotzsv6tahs4x4tvcmz22iyswvckim9dn73hh9taqx7s141ooa7qa29e7xfl896419nysuv6fh1wn2g8ynk2yr78elncj3zyompohcgj7e7f0q749ls5xwegj',
                fileSchema: 'gbblykeyje7ajlqxhsvyyo3ljcljuub9rk8k3q5kg976bslx0rj3lqbxlvfludtskdxxvgpg0lrg93zap1ttln91ail8s309z29kvg4r66f83oq8n852k526n7elv7cjvztudnpmk83l188tp9jnvqustfy8ijst40c2lblz6w05pofmeuuorayn9xwx2stqtveqltw1hk3t3eymnf7p0s05m0rc3g1phkisbybehgvnlkhqnqsz4ii32cew3hftyywvqro122ovdjayaxdqgxw9b0fm2axgwejgpgzh33k0p2sb2uejds8xzquda6tpmprou0mflkt75o0wc3kvhc6mirm7rkw9c9sen11tfaypbcuvppvrwul77bqd7tkg4c9ov0rtpf1twq17p00mb2814o2z4d3teedjigy4ynunv7i6ed2ytv4tqpsozcqe95vipijo8ik681q0q0dj31j3gk5hdjz4vjd1dkmepiy90aw0toam6ymkppdqt21wuze0fnesejtbdjj4syhpb8gdsxciubws0h7xqbdjr9z28u0xvvwn5su6a0rzdn5igyqrvf78z0j0izhtg3znpq31fhvkswufgwrbqeq38ug3c2h94ryd242heqyqr9vu5te3a58lnt8o45lk32t8gcs2setvuc43njte08h3dyeetvcs51d9uidkq6etn5rfboyrt1km1i9bqz0knzem49rvasuqhsxstd49p22w5mfxtnkrz52csijx16lpmu2j4c4bruvo0b3yvlvac54vkb0msheet7aahf4zuw7luacjy47l1ggippmirurjdgi9bx1cwkrzgim17yi7y6oel4qubz9vr7f2irfjq6s31or7qi8g4w5h9a0ichaorxg1ej7a7uwflcqpcpcm16v1py69et3jsesutzzxiehfe967h9psksrcd29gwzmh298ffsv831sjas1sbnuxrt7ji9aq5n6emvuyxna8w8bbf9q9n0urf5jw89zpqn5m2pgh',
                proxyHost: '078zr2ak9mgprk03bvab5865gfw7pkd1c2ibf60hqvi1toro64tyhtjjblir',
                proxyPort: 2333266817,
                destination: 'dbrfwl41l6u5k3e05mus1g9a7433diruyrnls7j7kz0vx8bsopg85damd7zmtgivt1nhn7za06znjdkdlft8f30c099efyhbfxxadqkxbpvj4os7mrhlrj0rse2ckzu06w6wjqy1dzi8ol5dehb9cn2efab7hr8z',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2zdkowcfhi5bf362g0tt0y5vks32vdsk5onvn6jv873crfbgytzogr0h4qbf4td62loer3spajtamq5la19mopx892x3lhehl26zmaeuriczh9s34qexnq1ri7wq5f94lphmj2ge0zirygsjbe39zelco3i2whuj',
                responsibleUserAccountName: 'ey9g6xha4xxwpgwnj5ji',
                lastChangeUserAccount: 'dygsu7f8ks7v0o22jph1',
                lastChangedAt: '2020-07-29 05:08:46',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '1fbbkp2m1ecc4lfd1bg0aq0kvt9u70uikshzzyia',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'n9p3llau1crjqze14tcv4kbm2msv3zco666a1n9opi64eavskd',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'ydn4ng33tx0ssqyh90c4',
                party: 'y397i0d4phwhqz1yluufmbzafp6wjlmbve2rs2xb0ih9ikcvugqpufcgdhnajb100zrjcdijctifj6s1ag3s9okekbv00ce5am7a5znr30ggtj0povso8lkuwnc3see5cbwmjyd4zh8p6ge9wi78f1gob3cj896r',
                component: '25jzzdyz6zh7d4c4zusvruz4raq5m9tqt85nmmx2pelnnaxk9fur75whh9lijb9xfvw6u0g9ss5gjqzw2drh8kfn2ddt6hdcyl3fjvidtjv8zya6x4zg60mh9t0sif4p81l25wne841uhsfgnk92yvrex9pojoul',
                name: 'hhmzlikxiofq3gnnmga3xxuc3z6iun4emyrq48zkzt1k9x106gpdna73zyv5xi6u80vcy0136ouz6l2hkkwvut0d5o6eusyyjhrkvgkpqraa0hrvneeds89k55ft3oo16gd645cyiry1c7w2j2dr07fbszofo7n6',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'glbr5zohq28dacd60v6gzqw2qc5csvqec1xa1ei63v55xoi482qk8rr9ub0rhzmluaxdkro9olqvtfweba22aey31ig68j9m3xc6qgwqvwji01eu1o9c0va3ae9rbt5vm823wfola23zkygvrekonzndehm9d344',
                flowComponent: '9tzn17jna4b3sneua3f6fm9mtc6km0h4w75zgfx53bdxr47tbsumgt1tx2wlvjt7uecfr3oz8ougb37zvvzgqo06nee8tbpep9oqvhlo99qelk3ji662hvxi483egp3z1lbm9vufpcupe5tygmda0d8vfppsp5fo',
                flowInterfaceName: '2rytji7fdfws2ol1qkx2ngxk9wndskvghoktniq96tubhsd6uapczfjyj91qcxsgvsw603lmk3ts5y0hnz654ih7nzkbs7aud5u689cty3jix2o4blx3xbzpafg8nhgdqxlij2cyfyp4qdxje0qxjjl5d24yng9p',
                flowInterfaceNamespace: null,
                version: 'a0otli0ml60p07sf47qu',
                adapterType: '37tf1et65derm9v2npakkx8qats0dcfliq1i4cd9ain4vde6aa3p41chvw6w',
                direction: 'RECEIVER',
                transportProtocol: 'djwvmfswtol8mnbwi48b5afnmoohs2tn95ug3224g4v6qlicj8gugsrex54a',
                messageProtocol: 'ljmbqisj7063iy59kybw6rz80ss4lg11gox9mxjpr85adr0axaa8ojfcdxai',
                adapterEngineName: 'nbq7r7rohoeli3gnfwkkqexpd2e28bhiv92w097hbf0qwuxs263q7rhzqyfgqdsqfmvdctv9dr7exisrpgxilgcbum3g10dfx0mow61ewk8n8svylegt5w95vgsyetc6r47nez1arr631apyujglvs2zt7cwemgd',
                url: '8i411hqg1euc0ubr65zhov7saxrq63q72dc153hgoinvxzy9ditiqd3rudwjhprsmvno2dx90idt2fv76euxmug0y7frgvtkabcteooqt5u7jn29eb0s30cujz3gdcewe7io36683ao89dpanwlb4ud4r0r2q8fnpdefztqprn8uc3xsfq7cy4dsv28rpwi9vitrfbnx9mmxedzd44r80rfo05rxrn8ak8f5qf0iqojx7gn1favzct2m0um284s7t1qblr0swdwxy1hamrkj763ihp2dmjqx30hn0mvlj619nzp0e2wrp0cwzfbkcagv',
                username: '8xt8txvgg7agcapf9twjm44zs9r2oozd02yspr67byot1ycnpar9y2u22tjv',
                remoteHost: '4x63xqz15g403djgu0chyu2g6k1947j47aj4eyapwb9h9n2lw1nmmnkowck7w8mpz7xtkd92ymm59xd9rfd6q4y35wbux9mvw22iumtmad41rgegnnxeigrmbb99veemb6nma5uwq85hvajetvfx77p0wy3k5sxh',
                remotePort: 2491144427,
                directory: 'qi81p6ttc4ril4zhd24xvkqpdjoum5z9yngh3bywqn3wct5b36iv8kz1d58lmb7oc7pbnds09sbofc2h791qc7qpnzcbnqvxph6vp10gackzo2ay479se315gaubobx4oz61a92sy4xym7gb33050n86agw9os7tyvk05za5f66f0d8o5ajf3np4m88321uytu8dgp4hznekep3jrdd4uqhfg8q80j1q1rgt5rsipkdey84eg9iu0qqieoxvkgt533ikcl2s5wufnqzq5j0wlxc7v6j37artbx2rtwb0zi9gka0d0wi0vv6t3bm214kjdd0orhc5lzgv4o7n0h6ak9x9vbpou6265quycqfwmn4mto0sn6wezcm1lehjcv6dm2xvq5pwedrco71gq0pnlxtwqk48rtuje6c5qo5hn048zmobvaqb9qlswctskw9on0ur8h3df0tib3jttix969l54rxk9mudqjokd437lvvo8nz9eqzm8mqf80yxwiy4xv7s33pya4gy84su2b3scmx73z6ftgrz79wqvgt89gqa4x421c1yga7pbd458yox08j6f936ht6140h9cadm5a0tk4couzyywxpb67v4kbcrt9xvbp5hbtr4jrin78b9e6nzs3m14uop4p6iynlzg3lg1pgmnzhghllzzlwwn4qnoji49aarj1q8uxftc6hebq9szazo8obnc8v0lktpfgdg94vi1k3hmow1zyloyvwco8mvp9c5w0mbdbfcrstue6id5ogkurklgyfc3zddro2zlj4sk1vwzh9iyfbmnullzhuisiz00v6awn56y45hdwz75hpzftua38guu2kf3vcm2r7p2nu7z5dxtetxq3bbu9iqm21fmbrjutv28aish55vuolqkczdcp0yooqqrkbrpj376qi5i6oqrpyqggntifuidr2yy5lgs5c287ymknqk2s28aruiu65e9g0hg4g1fj04n0kpe4hflafo14btva6sbrgcyc496mj38ixk',
                fileSchema: 'k049vira5rr4h32zqlsnarn17hhym8lxmpz6utujgckhuxvy2tjl0j3qo2oo23bu3j1zbinni3zwtqk9s4hj46sqasep0x2lk3qhjw8fuhfegs6oxr48kry8ftsle2qvltl66uwwxyki3y1i1x0333wuph5yikgwpb4vk7q9x429pf0hpn0x1mgh0d196mpy90ev47z3sk5vtj3yvi00w6avyua8g46eda007aj1k9pv2rvj8tuv6izuvvp92myjh6yqsas5ejh3p4wk1ex1ro3u6iwkntxurzid2nebt8qlbfvdu15r4lj370ej20cpixhkwjr2hh3r42l2fvbxh73phho2kr02rcgjv0tmmj6omkccw4e2q6l78pp5zn374p5ual27wp547fc0wnfvezgzlkl9aludla970gtf3ab7du4nz1vu6al2bimmomy2pphahu4j9fdaq98q1f0u48sf5uadyt7ic4lbrucopv6u6zlp6vmeihv98rznqhix4ah61ly1gspaqnl3okmog6jrnjndcuzxfap16cb60i2biu1l54ppias2okfyubmpycuuzkrdg61lfqtvm7eog2r3sl7se9ry20jme6h3dtuxg6cplpm4pnoi47cbrednffd3k3s9s9td4qrwkj86yrb4iv8earotwd7eauqby0xvbej9zwu7a642fe3okhpbrhte0i0ed0npmy5bw0h0vx6m79okkzzz447p90eu3mjatp7cw1w7rfwhzm26mgyq610lzrojvr7dgpt02co4go6bi80e760y9iym7ct6thod7x2zgtunetmglwf40n0sy9iam1sfxie8nq3ban7e9n6a8klbsijbjkeb0dud9hzi87jvar24nyc4176l1uicg4ikqum1oymt3gvpmqpg156hyz7z8tg2dllvhp1iijhc4lhrnu2759nuk7fy4z677u8uwzg8bbcudrmdimjto7hqesxpvkq5o6g7wx37xe24txnm5zj543d6afay2nue',
                proxyHost: 'b6fc71z0xkzq071s8m7355bce2wibqr6mtxgbdc93uav5sws5ps6i6bo6ua2',
                proxyPort: 4423971618,
                destination: '2bxgdndshkpwrnp5gghqdaitjss5fmu9pfy1s1zn1fuyb8jdcoiyaep4p8zhkps0jal6mu3to87991ge9z856vjy7diocnn4w48c0nelknxm5j7rwlg9u6c6iavorcj8uvp8tbzasym9kdysmv2o86ivdww8ufgk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'cucj4n7g4abotbsusibbprdru9up6juqzelt25dj66pqbzvmkvzbmypuramf3hrtskdwnn7ueb38fgambumkn6fqybbl0oo08cdiemm6gbs7n4f4g6zol9dbuil11figdhg6x2zyqf2h9ve41h43y9timiqnfzym',
                responsibleUserAccountName: 'egu4xbiz3286cx6vfspf',
                lastChangeUserAccount: 'tdmebgn2jtplixtzucqv',
                lastChangedAt: '2020-07-28 16:59:51',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'l9dfj5c542erxbklqispbrludqno2tvsr344wra8',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'ibdcvabfyjnedt7q1qowo74tl48ea8q5mmucprm8oavbyt58ab',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'p9vykk1dzufl2xmh2o2c',
                party: 'nbfhucgctni9zo9xskjmk0cqminewncjin1t8qw0e2u2ztrlcbpkv3sme809fl9f36vkui0qxgcbychanu4hwrgkjqjha4oz4iu1y4x58rgnmnim4e44zgl7z186xbjs3qlzemu8fuj1x824370u2v4edm0au9qe',
                component: 'r8hvdty7jwqd37ab3ofkntqshagkgcn2ql230w0tiukyw7vznu7juby1clc2x46ggls4goo60qifd79tnnktqztlran0xmgtz35zywottm9rpxcdp5081lxjlbv6nseo0cs3gsk88kem9qm8c1pq3flcpoguh61r',
                name: '4mtmj2nvztghwz4mrnhageb8ytx2ewwy0gzyz7owljcm2o86tlv0cmvky9qbs12noy09hfixhqoiu2854mqje2c86pb7gzyil7qtwtc8akvj9yhuktu4afg7zx2r13sjd3ziw9tmw4hcr0qksxymxsqo18dyz6mi',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'kyt4bdbmhz4s7ayirhzwz5qh7jhqk3obhagiema3ma7y4pcjik1h37po2rq6a9lkub6lq22e219gfjffd7r5f8cp2779cxy600nzclvhuv732k35bhr1jgri2j9ev0hf903ey4lq9ef48wipvcak0sraq0o0bnyk',
                flowComponent: 'mjsakmerdyzn97es9aek95zhpyirek860c4h6pe7u4ycuofyr6nlc9la78nkyw7z0lqsn9wp9x3c5s2l9sidu4c2ncg3it36ans59thybpvw93n8bx9nimzqxke8ryagqc0nldwg356v3qappwjljf9y4kef766o',
                flowInterfaceName: '51ht0asttahqajjps3vpsmzks8nu85sbq1qrk5k5mfc97zjoy4w9t7c57cfnra7927ik9746ngrc0swgrl1ej25qhndlra805u0848onqpt58r47d3sene8f2s362by0pmraeosonrmxdd8w2n77yrez9w05jt3a',
                
                version: 'ouu07hqi1ky0ve3ptgkk',
                adapterType: '0nzrs4yw5y4ggns7pchivytxlmt8dmxt0zimlx92fvh6b6kmp063z5h6livw',
                direction: 'RECEIVER',
                transportProtocol: 'yrf844p9yok3zkakk0fv1r998wg1iprj6cbr85tsjbko2vep1uw4mp2v26pm',
                messageProtocol: 'wg2qcvdu59nce38cr7lzf75537ddk0aghgw56jzgwwdgv2paj63kklcmdnla',
                adapterEngineName: 'cxetab5fb6qd9ifdkzh6o796hjrwzcswpdzmoti7xjkrtu275pqslxlk3cfvsik01apkkzruqjz7i647e7x6s50n51wt50ytfi2rjxsojyezm9sq350y15lwry8aiz7d7d88ypmbfkzgpogi50mitqz25h4llsmr',
                url: 'zwv3xqo87wkexvvlhwvqv2o4huxel42mi3202nm0b3cnty18llp7dev6918t780vk9r2nzw17zjql0147jek2as4p3c4gutkfzf0wuzju9k1kf13a541vd83669pvk8khpqb7pyfwx66hd5ghzavzisowzwauq444771j7qyeof2jlagiowe8u4sctnjsg0c77plepcxm0c2xn2zeloncesqpt2m9tk62d2jqcbmvpuxztgj588837fp8fpxvnnho4ek561q30jpqulh6i5up3uf5jszigr6hfeip8vn2fb31b9svnyws9p7p69mzrze',
                username: 'jmkqgayeob7bvyzx22jmros7246fp6pbfnhsbdfmxd48zfj6k50m1t9me6ki',
                remoteHost: '5yyybzgohp0oecv72s3lyoihb1mfwh2wwh1zfvvon9fmo06d54o0foio9jbomv3ac2e5yw0kkzli513151zi8uxiwcvnmwr69vm5yo1ha65hk5dkhaaexmkqb4lrig1s9rfjaol9gepnxuq4clekformdmrnvbyl',
                remotePort: 4321470350,
                directory: 'ovuczujf0a8vijio3f2swq4qglrv562hvp5f2m11vqgmcczwff6zzu8ifgbmwd8qiwc9d5ibvl3f6xszoe9sad1sxdj5thexzl7ism52y5p1qyhi2ox71r3tzx2h1cg5htauz7xp34qu73p8jfdu4fj95zox0xfx4e58du30020923jnkdurxnaku75f04a4os6ptzrj7x2o5bpgk5818ok4ce6e50hdyq7s3jscfwa4rvce10fo2spzxnmig5khbj4uml6bgaonnlnflmwlxefqfwmxarw7bl0xp64jxk5f0zhvfjganxas2coeffh9lzqcvg4c4b4qs7vm6abvq50towv70phu0z2bodmtjp98j3afj2ondh4pwz5ml79beo4k6tam7qsh9frst79qeg2yp6bm2snc57gtee43z72n2oekhnsu3cyrvvsm52auy4lpgt49ffs1di0j54rz64onftkpsdfo3cgu9w2q2kbkpqag9cnuawbns5fruxy5rivifsem33k6w0sk3ibwxiqd3tir7v4w552xk7zlh3c5m11y8vw89u5k1x5tlabikm9r04nrlq3nb40jmr3a40p7eytf9ax2vkg700v0yrhkmjil8fmyup0o7k61zbdnd7mej04i7rynb2junifv3y2r7gh3p5xa5kw6ts2jlwzrwrug27oxgi1gbtebue1jjlvq7n22od3co2jg9fw4721ozgd4ufwd2zjilgpo7c781cfavmkpacsw7id3rr662gksfkryy7chwurn04kf2bn8at7g80iep3094lkq5kfrzwwkiwb0nnhuyxmr35nfute8jyxaj67gfvkcby4lbmx6u7jlb2hqmnn34u2891vf9axn1bp572t4uj57ufiezx10le9rvsajz6vgxxoxm03thhkdl3hbntcyv2jh0wxwkq7jemqkfvkhewcs2v74kwfkqy9jzkn4dk6wyr3yowkjbxpcx3f1g28ck09qrfl9mfwsa8rvd32tq3d571e7',
                fileSchema: 'nallef7hg2jzvat3aaifisal1b9l8vt5g1xg62bwh18obfxa5pxb89z76p8a45pnxugo6censjw0zbrfwofl0ma1w0hi06rspphthdnl1lc2gfrqwchvkepy6frb45nl1islxn8nnkayqd2r1o45wuu9k59wrqay0s4zugfvlpltfqztzrve9xprfyp1ej6rp1j52alz6gktvva7n4e75pfjen028waznfkp40dsynfftm8vq943c6qaa8m3izhyipolk3vlcyu2ek7qizuj4awfwdv9nevwaqzzywqat1d55ycd15i782gre1sx0xx9cdwo68rxoru1ifechgadredetpacrjqjxnbenh0pi2kn2ty9o1iw1rivlfgjoj7eikwhewrn3xiz656y3ssiy2wcq29xbytgxv6t0sowtiusdj1kj00gylexbgapp5kxhcgukj0vih6khri2n1i1ror6yrkiqo9j49u28wikzonfok3mm5g8ihna7fdr9uqxuupd6bdayprzo53xa1yps4aqha87hpzdrve9aapg0fqa7c1qixbbiq8agrs2vtmslehyhamk6xiz03dbc2nemugp764dv8ixgm7dni3wkl2u5doy24izx2h1zmvy24puwmi3jnzxzel0dn777my4ppif9lsibtlcd8jl9jm91hbk3t795z08fiyz8mpsxyl0s9zf4oemfbvlsk2vechpkup138y4qn2xfcoimpjyyjgi60zrk4tf6kpjuhgcgiqtmctjvll9y3t4sg1h0dp4cj7ebflq6v6k4tbb426wunj7a2x5fxmmykh26673i46oyvwy7geb62kbwcboromxi2p9cg83crk7rs8qeek6blz04p9xss18cb8lewo0wfd9rcbca3m95n7nkeyb4scbl1jyte685qynrcs8fmpw3i9cg0qy806kagcmd54sc7girgbbd3fh5xs835ldorujcdigfdzcp57z6m7ci5q3a307pyxerl6eonjjq23jtql1',
                proxyHost: '8shwn0opi2gc4n7zjk755fcrkju9915omfhkib2a80iwxv2d3ej33em6mlrf',
                proxyPort: 8684500511,
                destination: 'jcgipk64eorqesmr4jn6j8z6dn7x0lkza02t6j7z2d4y6h0ht20b4duh5jkjumtbtwovq957sx4mi7thuo9ccd0zpg4j5twtfe7nyzzqoj6s6lgqnzly06qgxwowseusunslp6wi4ln7ep4xbeh5pjzlis18t3qg',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'h0v2vdaec7lcsv4pttybi9d3s7ondrpf5tdes7opucxc24y2acz44om7heubuok6lyrx14ryzcf7cohwm3rg5olsqiyr2ucoxr2848hxqh8yk70s0zbf07t65s3kqkwu96jpr08muw15uqgznunvusw3xm4oixdw',
                responsibleUserAccountName: 'ztjjr1j3so4zdosm4ex4',
                lastChangeUserAccount: 'qhil4y1uitvszefn0dgs',
                lastChangedAt: '2020-07-28 20:56:40',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '17c2xjho66adb6elojumjg9ifbuoh18p8qisy755',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'knbu8ohcjqpu4tasqsje7bc7iw4lcxkr0h0qia6ahckdpf09ii',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'dnz5vy9mszf0a3lk7pav',
                party: 'l5d54c4f6mi56bekwtw5o7rznn9ky2ggp7tvgnl1tp0hhfrnqhvns2wqrmgvvu7nntfv02ngqze0czkt08furz45z7af4roql44uwonkfyjyoqxbfqqmbklkfupk24itompew4llcprrfc1e6jeewecxvn9foo1y',
                component: 'uwaxbue5k57mhpjdusdkbh92jlbqfjrarz6bofe5815lb9taaop10es5qlgp4051xir8n2ab39jl8ielvyzcbxxa7pdq01oyhiwl2oe9lhs70jssp3hri7qcsll3e5la35ptyj1qcw1g97gv4wl6jtgplv2jj0ry',
                name: 'l5cpqrrii0bl40xudvsc51oafboccgectgw4z1j8l2edv6naltqep0eazmrnp6by8tcswqf4bwksvqsg9sjfvfu12exabrn8z2xf4fxcvaohvy0ax9mvoqqbijwxd7s7hdhmir955rc2w1euqbjwhpyrvvjxocy4',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'j5vfv0hnysgdf4xzyj1917yj0nw7jgaey0eyqpgdppjkew8l2c56v2nm2yz8nmp3rbroo7n5g3g3ltd168rx76a26rlauqhvdyi3rosz8avvc6wd9kix781e6kb9epjaqd1gmn8bbloci1cdgygp1vj4u7rhvf9a',
                flowComponent: 'cwn2yjhnk4vj6e9rc3txol3nuayirvrjky0qsms0mjpx04izam4qgfoaknraes2vgof2lsplnminc7lbla18jey1zk9fcdiubg7eptscxw4d8bsww97sidbwmweimeyqcdm3zeffv3am73nk6gnwvaxtxz7hkdup',
                flowInterfaceName: 'nnsma610pfe15kl3urdskdctlxu11p6fhg6q3mbzvs7xapvml3xxafuwdpafqibzb4jq2pqaiw7stc6kyj4e4fg12o0z0znnfscdopbmov92n7mga36gcy8mkws8dnezg1x9bl5nxh6hthgog00kg3to5npuz99x',
                flowInterfaceNamespace: 'p7rrblpg88nlwlonddxj99bjl050m2cxknol9csm9o7zcwq6qdkx32xz2qi7xms9nwrm8hpmx3wcaa9qvtc84suxbjhab3jkmyc07q7xc6wwsybbmbjxdu40uhdgw735b9zmel7ytcmfh7jifha8ssrtbs0ojn2e',
                version: null,
                adapterType: 'n5k3do5u7g7k9eh0mxcdfsc868v2nktaxfpul905t8yio5ej6qumkxnk2oam',
                direction: 'RECEIVER',
                transportProtocol: 'kayqhvjddxa7v4ez3akd93giv7h2g5t1uo55feqy6cwtrku3q92i1qjlnrid',
                messageProtocol: 'tjzmr778nujr4k5l2n2cfhnxr30wrcoiv6up25ymxv4xrpy4y0p9lnf76p2s',
                adapterEngineName: 'nkv1eio4f94deuno367j44ug1t0yv18equ4m7q8pwgnfobt5g6c3vmdted76tyrzqbdgmudb0p0u1c07t29vuqrkcb0a9hnllcklzel3o1wtescumh9xx10cl3hcufgyhpxl2fgvh3fshk0i7tq9xj9duwbzceha',
                url: '9khio1i3oib97fh76oc51yp382a6wsii1owsgdkfp6qhhwad7j8zk67v1rqgpju160zkrre9spqpqq2jz151c299v8s3o1ryusgr4wvbgy6yj4wq6ex8kld95px4lg7n2jpmwxf3jqaeygtl16li3sh8sh26owqst4tbbga9cx22eh9x70oogw5fve07dcrvodpqogrp4sgt78hrby04456xu85dn3f680pnzrtq2n2iws19fdbwwae1f46r8bpx9u1ii8r44fhz2e9e8pjl61txy2n4kjd4lbpth00qq3go98u754ta9am5ozpbj7dk',
                username: 'v6xdm3qkq9l9hmtw64x8qnwaji0bmah2xgrtha6t3aku15cw8c628d75uvb8',
                remoteHost: 'u7fwd75cus3w3pxet1la99xw1wu01gmktarv6mx1o6a4h5alb8340jmlv1xyj4i8z6hhgz9kiflq9ryptupiljfxi1ew5moqiv7wuzyv9twfvrhrteetyh5zptllzxzflg75bw8shrg6vmx7lg73otx39iq46nt1',
                remotePort: 7909351944,
                directory: 'ss5lrdjg797gp8dcfdk0zsh9u8yxacdlt7b6e8xc9i1mkdeydb41fbgygobjadylqxvh2k8e8be1a2q9f0ynbnn1h54mp6rtvyhv2z7oslse2as7zfp52wl35ccejnssvvnkbmo0i7rdn8hn633364b1zda4rzu43di4psnvrr5kmtzzwcajv1pzvbgmkpbnswe834qc9anahzyyu587in0mpccrc128yo9vwy9vwhh7gkfl3yzimrikv8n5hf6fhhty7uu9gbvkjawyjxipszk5ehr0928xj8nlepv78b4ujjuozwkitajl8dabwaiiptkoc9ka7qu1u4d0qzycgze859x9xfrddoqbe80fkaqmxi7l4e89luzwxwbbzg8w54z3mon318jrut21wfhiqbp2tp3elnc0p67d4ymq92f6y1kcpmhezv65i6v0vog8ub2i3c7huksjf1ycd5cjdr36yb4uwn066b32tehb2dfm7c9ejq9w8w5rumd49ueov07xm9a4nnwmpjbwzx0fym7h4iv8693oqoj3uyb8zwrop2fzpropi3gkhawuxu61wgup1imn2k7t3ko7io3wktqtq4clj27x07bw9964tt6778szf9u2nbocrpcyi6xsspg2wzqeua8fh8q2m7q9rir44vns0r9ycs9imvxbwldkm32uta70pt2y5y7uaa0gsjaxa0tv88qijwixzwsaeijje0wt5wl3mba6h2su2f3nwa3ldhvdnz9847sd4kjj7segqdcbs45ewq6pf1lg66u3bmunwsbhim57f4mywuavyyfrvfzonhsunudqm7szzqpn6lxn7dyf8g8ulzpyrdz7xd815kuxjtdkwfupo4nx5qcs5oyg3f3d8xb5r32jztbxjgz3hrqjfu27vub6yb95fxdlnihteirw2ioagmvlidg1px3itt9wnvqxvwrgu5g0vro39u2t3cnhemlu6uthgjf1exxfjrp1n6ltlhubhgpt8u56bo7c7tjbwmq8',
                fileSchema: '3yf07mmnjay7xm6mydpse5v7g4fmsbnm1gqniu85ua7vgqfpewxv7o1nv4saan40xjy3r9rpclpjty1rm06sgnadej3mmrol7ru3x7eb94odt5eewonsqmxiwikfqbsa7649aqdxx7ab3cba12l2x5al2y4wm7wtgn1vgf2vplqdfta05ccn0omxa4trnh293bjkit1rmsu4bqxdgeq1lu9bg75adkzjd7016rxxocaoblnrp5u6unpt9q3imd7a14mh9k4ypn60yecc2xobofnpait00zta9ko4mwp6cj38c9x92bfchqnmb3xdvi73xg2dw9sipxwfyu9i585yp2p75dgt0ode3hpj3raclrj2qznak1e8nrgkh7jer3m4fddx3zuby39rknd63lj1w2q2j84743n5vy7b0jbkxc4o3fyd7f0isr7rajjpgkiibqt8nw0f30hr5pdjqfda08yk6kcq3mi9705eeovt7x34m4clblaurr2x5gc6wge9cj8zfhgapq748n5ogw89rop505viy2vtsdbcpjhuk9kc9g8zpw8i0q1gbry0j5bjz7ikipmnzkh59trip6fdd2f3v8005ycigt9yu11x17cqgrhsh3r0w8txt7ko240kojcda4roedd32y2gh9t54ewscas9ijx8p83bhtsjmqrr0wtnnnv0e1gh4pw812ywbjudvs6538huu4ncmc7fomsuaohc9qyokzu1yjskkhnyqpf1oel01w4kru4mz971jf0xgl16au596ja4tsv20das8nlh8agkk5xq9l6sfrac15ofa9qmyod5eny7z9roal1unz44qsoaubm1b3lt4bvac0z9cqv8wzqm860k1qwjkhwb64b5g8jahmzvjp7l9e8r3lhyynad0rylyfucdkp31vx10cwwuo189lmlaxjsh0mltemddwhn6b9ftvaguro9793b9p37vvrcyl3tymaepw8a27f39dgun083o4p42frkr9s6qe89jigd64bx',
                proxyHost: 'v94ydctfeiw3nngmji4qr00c6hxt8y82x7pm51vtzcv7mqxcpin5j6bq1k6m',
                proxyPort: 6366859552,
                destination: 'vlol7nxxsh2hog1w9evqklwqt4tr9n886fcyhoe4vykim57ddgbkt2xzinet4p8y2nvztjocjjfgsulensz16owppdd7thtftphmcene6gimtye0y5t7vt7sq7pq3tfp3v5vx1om1e0k9dndvcuoxgiekqhkutgd',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'lkgi77ary0e20nezo480bqblas4emlcisrimx03i0tunwcf24o92ju1q6sk8jykk259r7beie15air4k7ewy96cfkkszjgp1lgly1fxq0nv4mmo8gzjjzv7641da3jdzeavauqch7w4xc4wdfmd2jy62cec9rkuf',
                responsibleUserAccountName: 'x0bov3vxtad1anrz3n65',
                lastChangeUserAccount: 'xezfwgi5dd1bqnsewtck',
                lastChangedAt: '2020-07-29 07:20:59',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '6mbz3sb00njmgrlfd3ln3yufhrifkqc1nr5ysfrx',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: '2e8r3ckt99oqddw869hqwwg3r1viydhsmsgwvtslct29uqf3hw',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '9f4tehb632a72ayejuob',
                party: '50oxjcsp3b0shodve60wmoa79llge45m0nxk9k3bg2y5b0mwwhiyo2o02qgdjrkquvyf5niarlpk56peqs7b2vfinkz6j6a9hib84w7taburl4gtd13ba8iqna0vhduen09c79bpyggnph4ln0nfrxeuqsk2y69y',
                component: 'h933e8860vwohe75iowslghp9cue5qzxujir0v47dydddb1gko5hon3ad9tzbx0eadr60yzym5pvoa3x9lissn29ofzylxtj68un6i85hb95zwatep1qj2fowq9w4ublqnmwq8w0uoyc2i5yl9s82m38753fbocn',
                name: 'sf73r4hnx2iw39ux9jpm0l3pm148j1lflfvy4jgso8x3i329n8z9bv428p32cswwf246uo8hpu2e21400fyttons3r50gr1opvlr4ri2a15187y6xm8gqshhq41ki7tpkq1wbp74o87p9pci800jx3zwh5wmlwv5',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'pfcrxlhjsv8g5fllo69czm3mqj8rjd0u06j81jn0o2iwqyu7pwneevzhdujqzc36vlu819n7i7bghdw1x95lfxegqxe30tl6poidqtof4dc77a98exdfxyajb7wg43mhvyjgzuofuy9owzo7rig0i3u3bttbhcba',
                flowComponent: 'slov7t32s9nlqnpy0r8c5dagpd21lea4xnt3sh37gfqoee9fdm78s9hnd3g7cw3m5grnyge439zv2aiop0rov77scbk0ugs9huaaylpxi27ikspx0a6y0n6dsuf9eymd0pymuw9h81dw88flpzf914567xfw84me',
                flowInterfaceName: '4k0ae5qb7xoux2tmdptfo27v69ash71axyw0k9cpq7q1jnbt1p2b1mhw9wwwi60l41r810jxnprlu4ak8n8kzezpkbs9zd5kgwc9cjpx3ykomu8h5nc7iti18h0ut4obt0biiyq12oydzimq0b38tduc0aldrm2f',
                flowInterfaceNamespace: 'o9v7yqhh6179ux3pbewqv9ia5ctlpkaypt6p2evov8ovfr7u6cjf79xc83rb366n1luonkxoowacfhp4r2htet79ddc64i0yt3sf6u5p5yefi6t7wf53m3ivuex5e9qjngf72u0g32o4tapc8e04q2te80t2pb37',
                
                adapterType: 'z7yynkoqgtscg1ocaeb6pmtfhpziect42aj107odgaibsqhbusnheb2qidyt',
                direction: 'RECEIVER',
                transportProtocol: 'oe96uxuuzlji6rl4rrsfspah2gfkd43ipsxhr40kl8rfmusotzmxxl9p4q36',
                messageProtocol: 'dya0ktnn5bw2g2mlnnfytiwb3zhjd1aq7nf6k28xqk1mji3b76l0z1cw6m67',
                adapterEngineName: 'sdzvzdf2d96xcfbztp7tdqpif2jalpqmbutez6oq87dthnqv6nt0pusglmcbou1t28ji4a2ok3yg54ihm66qreeumz5n0qnjziswb8oy72eqvkgtsg0jv2luz56bm78m3c0woyw3v7f2oegy3b0e68mt5gujd7qs',
                url: '02o5rbp1dhnfkyw9bxj1yqja2xitbgobzmomzjxpmxgycox8bznafdt5vtsqze2lq8iz8pyfy3ndrpbdmnr8lv6y3faopncvjuf78bedlqs04cq6rag6nr2bhcr6gdan05ecr09g9cocrbw6mtoa7qvhvc6y93hushx4wg2nie0miowtr4aqsmruypz3hszifv6ipk4lm0vqjawidokr5i3pad451omtt7v7yr7y9zz7w7scap1d2mzt1n3nlvcj3jxeo1z7irah8eh9hpfmoyx1eyjotu6yc4f34vxlaotw14doqzk5rgbvltaxti52',
                username: 'vfyipcjd4nx3vhyhuhjqajlo6tm2rhmpcukp9osh1t1qg6idxvkixrd38y4y',
                remoteHost: 'qaov4vn5px6sjxt4kj6c4fldo8dwlkfgoexa29h15358vuhw6t0qsigbm5fs7g65isxj0g24j7o1xh0ssp58rbfi92ghfhaammhwxwusj04z4zq3c6kwogt26x9zmbr7jrto7kljicdy2kitpxa77ixn9zpbgcmk',
                remotePort: 2741138934,
                directory: 'snkvuv81qgmdhmg1ozg46yzlamkkac49hrpirznrwuec9udz77h3jsa13vgzm5pzxmawa6y9q8qmms88p4kram9xr4lmxc5yrgzhrgn04b3jhiwx32ejo1iyt9xop5v3p8a369ajiz9pmul32l3y9f435pgcgdcuxlvz205y86xlv44vyw1j2o0r0oouwi5q6fmvhfo0xt627re1npkpmqh232novf8p4xs2ih9b8x4vegen9zvfzfjf8ety79nfb3vz3npmebz37ecogy7v5het6g67vraym559lxz16ixovb5flcf7km5x4jf86kf8drxn4uecic7fjn4skf996y9wbi4c2m6jhyn4hrn7u92viczrrfy1apec96mke0713mm0dz56goy9zu4ehc8lsb8oaf42qcylyblaekp8zfwbs1we7x3e5s6km7snmqzhsal89qh00zmoo8yrb0dkjxt78d60j10bvqjh1zbqj4wo8q1ldokpcas429iikn424qrzdlzwcpk8tozw9weajr0ub262wdhit9v0cv80tflg123d04gqd9j8gc2kd9mwzmbutl485lcz0wqprs7oytatdal4gapcwq6zexvk5kcht1e27pogcq615hs5hwygn1qve48nnsrh5piub944lwawjkfycp41yzb89r0r6m8rtt876z8s6nwsdxsyhm0do5r7xacbrhcsu7eez609i7hky8qd8ma7owrt14y6y5y2rh41gepj7wjkgyy74qx7qt93gb1gmjjj6exfxxa32hudjb6a62oujt7lmawm0e7l4any2d2vlquf8ud8wp00gooadhqqy8kbamitqhkzjf9j8pu8y6nvz7axax5xmt5o6dw3pykhxw5lf9n8dc7fw8n8xtqlt1b2s935h8uq4hmosa27gc7lvdzn7761rdvcgeyquegeh6nv2wncxpvbu9hn1mnryrvecu2rs54wczz55g36hjutee9fv13rxx0b369yxsy3r1ccptgcmomh',
                fileSchema: 'h23fone8viqtpqq3id2oyyoon6qmumxi3mrd6qn3cd0vf8nr87762u9ou3arfk6ykr5gw899kq9rzhvmn71lxfnyecnd04d8gjeho2umbe1t5rbnknsarxepo44cy0q26brv9y0npl0y3x98kud0u87m41k1vngwwduwoxys26yo8tau3j2e6gb79wz76rh7n37wu49nb889hcci0s9zuyrhwj3yp176b3s5nalfjvg48tdq56sl0mf49x8arki76de1vtuvos594ltwxslfchjksv9d3x3c92o2m1tcchh5dor7bc2pqgaae3vovvnl093h7b6c0neeu9zbgcgo2mp0ln2pq7dbojk6fnqj4ddre206mwy0j8054u15rdjji3fi0o5egwm9cnuo9bbt3dxgxppaxd1qwvigl1fwmiwgwnr1dgpp58voz12fekx8h19c3s6fhr4fbjxt5aq1g5q6v6hd9i2q949w6mlzw0rurtax4vpsysx6mcwtl8svkmuylwjpslwm1v1ivtbz2kykl1a68i6pfrlikjt8waxofd6yrnuw1juyaglyft3iceg2rn865xmnu8ix7ufrpz7ld2c9ptgsfd8byop1lexdphpbk9ia0v4sarhlql1j7xwjinppoj4cyl0347xjw9yenqlxi0y1s9l52x4o2qtigr57pvvtu81liqvdggfaxhm59ovwrvowzac86u7t5vo0zt4btu2v19fibv67ano20n5x0gee3akblu1qimdi4rgz198utawm9a44cb9ggky9spdf1nf7etsdmpdwcr3742317mr113mna1tmsqh76ad9smajpihz3cn0rqxo5xuth09m4yrzrzj3r41g1a4l1a8d4isayfjlk5m7ledo7jh9q5dq32xttvzhyhdf6joixqgnmpjnna3jh0plc0o1mnj26gqmzrp9dww8r9zglenvkv5y7czzx0w603c8t7xwjl7y6hvrm54r9wlqglifvbsbz653ppnem4zk4gie',
                proxyHost: '4xmk6ohv5l6dap3biibestqaylxpy27xcwhqfckbmb3tcqh9vlkyorvdi4zw',
                proxyPort: 9442092393,
                destination: '3eaou6vukkuo7ddnsevqlqcwslv2sw652h8ge1mis7lkxopx7mmjf7jt0uiqygbpo3ahc9ejbuzj4qz1ivm31xn5rayr7h49zibkz2kdk2zxk2zgotkt5guebc8tmtylhu20msvnolgfwaj2e7nrnchpo4g6nbka',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'f0qsoto9gnb69tbq0nq4upr5qv82e1sbol5drquotbfzfou0cj5fud0j0b7lfeyoba8jfvf41phjclthhqv0jeo27yvntxhixe62du03ttxxzvwkxnrnuc5n555jdkap7b61p6de9ogsou62s5z0atoi603aqaw5',
                responsibleUserAccountName: 'u39n25wu25gvi2gplmle',
                lastChangeUserAccount: 'rolp8km7209ejw0yefxd',
                lastChangedAt: '2020-07-28 21:19:14',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'vufx8zlvmf95nu6qtox2w5fdm5uxyjwmh8uwy8ep',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'rj348s3hdd1bavosgkhe5y83l9sfgyao61renluy608dz2docf',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'clirfarnqf1v7y72r0xc',
                party: 'blckb9ahhn3d26a9z0hnm9mty4btnucyqumpo5kd0azg6mnm0wm2zj5lssqwiqj300vsg3izkc1a1hbc60fi27g2ukgpucwq14m0jyoeqw4q1xvogi1frwlwjt5tn68k5ivjq2l2x2xjzjf91ybq15iodvhz7tqp',
                component: 'uppetbfrkh69h5zo5qxy8ezk0w2n7vrb35p85pu7p4dosmonbz6tmxphjhi6kq3xum73fyxelzlxyt6gh1heeyhvaylwp1jf26h58xb5vs6vci6ywdy3nb8xjgfur7q4q8p79sabdf04mn1h8c8numft77j3fk7h',
                name: 'uil6ea0k6wtjl2de80zk9pqinj5sgydtom4owhsml7t5rmv1yg8dzdbjxf5xvi1o9d7kwviwawtf050dq90q6fdlsmaf2acdnszjkdledx5935gltowo08vk92qaq8tj3s6kh8j2j315v61qt4r3vyise2d2knrt',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '9q59lkpkh7ef3zy8iru4usxwntyv3zmtyxpad70ptkdbrfvka85m1m49lx5xlr33vwpij5qj11r1afr8o4xjrjf65nnml0mww7m2oqlxwophlvmastcu9v2bl432wbi4mpisijbtpcptu92bxkk7wi8h1253lbzx',
                flowComponent: 'pxvfda55xvm82kgct1qlnyjjlsvj9j3b5s0y5ibjmiwt7lej4thv9aotmx3cjhsw15hhxkkrzkn477vtk48deelwvc24mpzx04ieixh01qat86p6w29ea2qanasj3tff09d9vnygsaejxdzglqg7y8gjwy1k523l',
                flowInterfaceName: 'ozu9hvja2bz7ux5e90kzj5cy8muk7ijea78k2d4ffzmb5td3uhthzm7yowmwglhoj504jghcnqq0ufs1fe82p2x6a3vdq3p1muwnich4na6ko1d689apb0gcthmjlkmosqlw5flrex37kgzwjaxfot2iaol2mis2',
                flowInterfaceNamespace: 'erosfdjujlcqc24ainqocphfkw1ejeiwow02qqspsafdp722jfygeqrtakqooqp98mecc554jqocpuss3n3cn7d29jwymd6wliru9v3e364zvbc6kj2tz251b0k31gkm3le9ttacaol8n4vavk2v4dlfl2cwxx46',
                version: '1tts5vaptrvwz9xnz3f3',
                adapterType: 'tj5mjz10e07386pqvqlw9wck18fy7ffvmtd91cpn5qkr6qu11urpff48hwrz',
                direction: null,
                transportProtocol: 'x6ndb7njqqeqjsdob8nmwe16cmw6p7h3mfsvyafqqvuozot653qeskmx1qoz',
                messageProtocol: 'zrxi5xwlop2dk3gqx6m511bidafn76eetf8k7451y2rxn1k0jmfecft6dk5p',
                adapterEngineName: 'a1gvvbu08bndogg2lla5s0suj8csj28q5fs04uih9k9r7hem73tq8mmu1ug1w17yrqil0w6tfqmmd2srqb4tb83foxqepgz550cqsugiavbad9ejjwsm83kiubegrshsdzgxjagszgxv0vvunimnvdxswcqj55rs',
                url: 'pqz3oyfpsbrbekx6x6slu54tp7idle0d3v5k5f1pf8w8s61y6g0altpt946ok7vc2fefhiy3lys6yh1q31nec7etqpkixkzhy0cyv9f8091twp3n03mvj01v1bnze5x6vvaaokn6ol7nvp14h5gg49r59fd54kalo90af63k0v1i95xinssx3zz6tff3wblc6towq2a53jbgyyzlgock0i12xttd4e0kd273zjmnq9o0beas4kk2nkb9qll1qgze8nlj4ydyb7rrjc53u3emw4iyfqziqdft42bs0a05h8wi7xo7y9netf4ucj6thl81',
                username: '6t7rdnbri5iszrbqaws2sd4yelutph2cbjox7wqvhg08dgisj5s4r3q37z86',
                remoteHost: '0saep0qu81mklfo56ir7lmz2762qjnpn71nolqd6j2nisvw7ikz8mzjzohffpra1ygjbsogt1vokvx2wrdaht2ezdsom5ik0xa3c197h7sdq6o7pxfaoaqrgxxftoy45yrfhsxayaf6gjbwg3joei5616aayea5y',
                remotePort: 3550393366,
                directory: 'f31ov7ksvv46r8y31td0yubf4wpk4u6mhiks6pauiqvtiuh9phevc7vvabmustj6dm50kf2z3math7qko71q16berrbuyncver1pmm8dvuq4b3iqy9lgiwllepdy39c2bh5wzfomm6ycpjx4zwvm0xuzucuyypfederkcprgmzkk935km3ergm76elfmmpvhy6k9bocv7zd58asqkwbszhzdnel7z9m5jru5qsomjllbsa74omcj5hvxg7ii65wvuysqkyvay8fmvodu2ch3b7203w4egjul4og41yoq5v78bf3zmjbwh6gw9415qffayt2nl69mcpkv3vrpj9k8okmmb98ya8zz9jld0e08n3wftbryj5cuwyorss5jj7jgq8g6gsqsw1i5t6pfx5w26ifoj288luu7w22ytilsye0sp9rl6m0oprt5ot8qzdqf2tczxhprj1e9nntjfrrg3lsp3jfed57n811dy3jf5mz536fj4amah8463soxyeic1sp09fzum3tqeigs9n105qjgq72wa5zm8idvck4ln5ircazu14xe0fxpiuzewmytwbih9dok4s2oon40ivxi09728zalkk7689wswpdsfny23ocrkrziq2g8vuyv6wut3blgck33ywngajxrlsg6vgjwsetaz0p43930ivexv6ih29xncinil4s168ir7yw43o7xlefhexzflrek2bescjrkhu74g5x26ybcldu8nat7wak7priyauwrw62qxvffhpzwn4pz9x5fb307iwl04gudt5lsd39tkws96x45m5igq9s6m7xmaczqs6t05z8spygh6dq5xk3c118nm0sdjq5oajkvge2sitefow9nzrdvdo12tbad86r2r6zq8jyjl6rg59pyn1fs81wtdfgkhkz2ab3ne3v2mc8vj5ds02ofpqski2hn905abyxjh2lnigo25lea1xiiwh0o8hdt6dhjnrdkvf6y13fi6lyzgwvoxp4sc3x5mvmyypubhmgp',
                fileSchema: '14xwzthauznk8hnon6nzdexf65l05fh0ng7twj8zowiasko86p4zfdl6706htgk6evz5zfjzusb4anr88ksgg2vxax2igsfs9wzeiu0kroe5cgyvag34gbhxq2tu8d4uckquvldnt0onhk0g8mu7t8zd066w3jj2fsxrvi54muw7ogcnbri47dkhdmhzlwkvh50bipgywbl4dkbp1q4d5htn9ebs1hr3cxu55dbr3pibw9w1dvanh1ud1lq3sbx086ouf8bnij11p3teglqba4w56ip49yydicu2ml0lmjiyxrbed2fowmr0ks5fn8zd886i0yshp1cbzke1xs3xnip15a4aqolpxa7yksae13quvago5bqs0skga9m2llmwnkmpswp4q25882l95uioo9t1dzkf59zbmh6gcgokmzuro8ii05uz8ww55n4ru80yx47y5lu5dcxz2kumi72dsuclonz0rz0dvr31jh8dgsorocx6kq3y3y0y1tappyphhhd227uext8cdhgcjj74q81s5jf79ua65im9m1m1tag3z9suvir4hnh6gu7pnequm6879rkbfigqxu8zfli149npx4nn37z268hzf2ew0w4zgbm1se62benpos7audjy0kdzhd88wh0sdwfpuzf8tuc18keoqsbupb9f8rii7mn5n6c0agq2hounzhfsj739smwzkqo1zspkgyfx36752od7a1j14h9f9mev9gg278yy4cnpfzgz69274qctpqc0n0g2esk7oesh5wdpqymwxbv2kjrcyfqgygp1j4y3jqw5zbl832dx5qdlfgch3ezide7cuhth6dw5tgwd9u9e942zsykdc1zilhs38n388fpl61lqxe4io35h5i8u74rjk9sxi63ekge70yn6g1fv7m3gb0a4haacxqc08zheu07wkujy7zxp65jp7p8yy0sdhi7k2lednp2f288gz7b94jw785412oedtazsx7a4wujq6pip0dze7ewupyypgcru',
                proxyHost: 'q2bskw91q8nznsbt8vnsgn177m1lhpyamb4ghiccooctttcmw0ya3vd1lkg4',
                proxyPort: 3916305345,
                destination: '0b9yln6mdxwpvhmor2479ke49mavk70yje9y68428b3x2f7yah78f15rzsyuid2v6jh9ktgonl9ife4u3zq812wbd978dbtrnna6kqueibsh413ybaljstma8jqkatozki4bccghyb92h8zlowqgu2h1vwx9be8h',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'q6k4l8emejxhng1iheqkvm9uhvh8yco59snwhajdqoqkbytfxjoi9vt0le6wd7l56t5d7dkmh61a1148w5a5muohskdzyw2a40ivzpvofzehfrds32wm8npsx2og86rrc6u72y8irojp0333vg1vpcmtnqx7vxx3',
                responsibleUserAccountName: 'o9ve6dzfa0zv9xvfb1dl',
                lastChangeUserAccount: 'f1j1e54pi0r1c0j22d3y',
                lastChangedAt: '2020-07-29 01:19:14',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'ney3lxtf80m57vzhhjvu8b2e7h3f8o1w1pqki030',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: '1fs9igrowmoinfx5knq8aiafpifoq9bl44cjjea7hxbc6fahyl',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'bxcysol2eqb2yuibdvxt',
                party: 'zbrt99vz2sfm4nefoxpyzneh5uglwa0uukd7p9fv2hxxx4hra2n4gssuxmhm8svxs5qwhc6925fnom75jnu4oxpo4t20hvv49z5ccthbpzo4cxkb3r09dzg3ceyqr129mx5ijv1tlmgsv8718oas3foxtx8fx4lq',
                component: '04fqtr1jgsn4e31s1j8ysln1wybb1bu6elw6tnuys6g10q3xzkfvnikzzc2jvo4om0lwmt3r5q09g0avk7jaf5plwo738e4ma6mqxe3fh68oatwmuhim9vv7wxrb0yc897bo0vwse66hhgebr1kj5kyvux96cy1u',
                name: '1p9msla77yuouhlg0y6gjvyothroixmaeoi6632uerfuzqakdt5tf9qeg4z3awussmf1h350mr0omz1qekrat0jd3l5894le3t01wbdr8yjfec125ar37lq20edxd00e7rterrjh34gt94px7nqdeyt10zesycl1',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '1d5t4oz0mlr7u9je0zr71h7quhop436ria5of8jp2us44dho758jje2xd9unoaun61xtxz59ipjugqvrjrbmv351vsz9iumeavmtksv2d9ub207i6vvssw5t3xu2rzyg52436290ztp77b9dytr0fqit2m7gjbcx',
                flowComponent: '7wqy71gma9383n1ofdfsyeoc1uivc1swgcszo3af7vun2v2650p8ef90ma2mkepir0h2d2sx5opee9ef79oopxxk1va8x5ubmdzt4fs04xjyz2uji4nc602uaoxx2818vhayay82nzj7s052ikvx8ndsmjvcpqgc',
                flowInterfaceName: '8dr92rve61c901mywv9rp76ttrx4rcbm9rjswkgyexe0ohhasq29m5giwoj4fkmrt5n5gvc8n00n71ojcnlo49zt765wzspx9offecd7qczt5albvloi4r9ikhrz1l5gdh1ovm3wpq2g6i2x5ej9yc1m6dezrq9i',
                flowInterfaceNamespace: 'qo1q8cwfm1bjap03yz1cbgz9vsf0ib82afys5n1etstlst6x4z2xi0ndgiug6wc40kgfw4zhfa6rj65ep20xpge3uwoficvxn13m4p6lmzzcpat2q92ahfac8zqbj4b4ctkdzfw528zg8i7nylj1uv4sym5iw0mp',
                version: 'iict7pdzdzuvptviri1v',
                adapterType: 'n7dh3phz5ix3qxlc7m61wjd6o5uodpjj0oewss2ihc7rpnxqvdasu8kzui2z',
                
                transportProtocol: 'c5kujqu9tvfyby5ygqkkvcpzexntgab1d36cfsa3qm2qzj8n8xbunl0e3f4t',
                messageProtocol: 'fynw40b3rojms0adx7di4vw67xtwr8do4ftzzr76tlkjpblqm2en03f9etsm',
                adapterEngineName: 'rg9g3e7apl6fbsyzgez217895j4gws6gcl583glk6i1fgpkhntkjvbui7ja5aupm1l1ntxhbqe4p1tugsqdtxd1odq9bzpspi511vibe948evke6ubg0ezkpt1aqleshi7zi0kbzkah3577mynlgzu9lw5m2gukk',
                url: 're0zfe8pu4kjx8g28mkpdrs6z1r0eslqpo8ws183i6cot3895i9kvs9c33k2gzpcd6yscmytliwbh0sj0vductbt88p2x70bgru9m6vy0pxpmwvn2kzdm6u35j85glw2xa57haepeltbtrje1wbd8cz9l3gsf0p9e7ezs9omjqepzwxufthiei4gy7v1mdnq5665klcc98nqim8wzdht1cs3wj3jmqvxzgo3ioapsp4ts8wbkhzaa0ga2bxi378jnlodici7q4ae4f78j74ezigsv2buwe8r4zeb9mr2zjib5f3wxcoh4gqdzg6gv2va',
                username: 'uy6pxfg5eg2cpj8j23m8ukfxd7riwuj0s4k9dxi79995xuj25vt3kl2ukjup',
                remoteHost: 'wwbpq64bulmkw1q71cigxurdgyvh5o1zuo7we8px1uil05k4jhq6ru3u9uvbjb2ghlwx7kugt3blstciqexhpy7opghpv1nqmggzuw3kiicn9vfumsd50bknrzvhzrmo0husrvpzoundzjsfghq3wewxjapqgmu5',
                remotePort: 2129104366,
                directory: 'cuwnti7mr9hdomnvzw6mwqx6qzc8hxcpr92tyvz48ejrl4gcwch4lu3qdvtpeb62m0zw2b5gikguncvnubn5b8ngffoqcmfdf3cc51uge4wuselxigayjutk0e8s2hy5n1hhuqwvdpwm9bb8vqbs8qksiqkfipsu742fcbiw692mherewk6abywjrmwjhvg966tpos0f8bnikmozmet77eotx82y83sjkj4cnx8kwwpo98joxpz4d9cg65bapaivgm2exhmg752mwds5rm9o52mzb8er4mi8hl2t8x7nna3e24aevgnrdipb19x7lpn733rornf87j2i1hxj065mv3ur0pibvthxdymjhgpaupedz468vqhlm5rajo08fkodr6vkl733px5mq76r4wdqqn2o62in8r1fkl8rd2ood3upd6hrwuhfry5mjivf5jgreg758wvg8bcya6hpj1hds0cutwcss0lqr0igqcrexn364dgwgqfalu4alwnszxqvwmf2aq892znon5dlg6ve4j0wxxu29btrpk0osyo57oma5do3gh8q3dwhv6p6aixnhc7soqp3lydzqnmb438i5ew44pckntplz33sqlrwng6dr4dsp7na036lh7mv7wharj6xhic5eo4b35h6e5ao4sbf9oixsr2synupsoejueg6jy8ai9s4kz63u0v60fm39nkd7yx3cen2rvcu9q892zcrcvadaf8uxvhm32s4ejplibegmx3xdoxcrenvo9ityxwtorhyj560ikycpgg6zlym1nnvloq389016jyhkfjv1rag2xzfds6g6qr5f5gu53agfj76gykg7im2jjm1k4685rrp2y3y605ueo0pph5s1qx98l3zzpnumrbwvxhxgb3wxgtlg3d7u5pmqdl09rbdwr83xzxf4z189scjq4xb8q6phdveeqfh572tbitauiq6em8awia5095a20nnvw3w7ah2bah964dk1nfodxww1dgo8on0cnzh0h1mt6vv',
                fileSchema: 'fguas85heris5ad3ua70x6nzlxbdle4ohepukm5knpitem09u1w17ftjis0t7hzuaqurlu5lxq4r9q620ug9kb3gelbhwxgd23l04l4izwrsws94tlkn57ayrv3gekwh91lco63trgkjspvz7uppw3m6e6f8twbvnosnbsd80brwtesxrkzqpum5peemim2iehjdst70ud67zjfy46pzv0h7qpr0vc7jv11bmhtpbw1dyl2k3wxvaq47dswqidq0dh2zjikalt8hnk66fds1kg3h6sph0fwk4d3q501qppoc4d0oehtlixs73xlk8u1qvdtp7664mhqtr5buwnaugtknxgvjnoywqyx0r7paaagmfvciimhlbw22rvbtl0n7zlazf2lv1pbp7fhyil0yag57xrnht8ylzuqnmrkwcvsnht38xlv5rmv188hd71xo5ic3ahh41grpr0hne0u4n0dwf94vy8rekcbj4e2j5r145j290zxkfh2ubbpi2q58rk4grfxj77t6umuyfn0uwurogo3vtozwdg1xpnz01fmobsu8f3nvfh1qd4e1h4eb0exzf0egehngaao4va4o7kpb6e8yalble38uw495jouusmpl6lq5hobk1j7lkelz9abgpxbuqb2zc9r9lwsv8yaqznna93538g7vilhnu4308phywsky2dsxympswawo3yekl6l8p9p2gz3kzvg4uw4tsrv2ifqsxxv6a6liwv362f4vhsp6aaafdpia7muh355ycec9rl880k7sg2ov7bfr5xf0l6bvxn7k9bah46ow0u193zidyh20wva4lptlq9s6fsktber5tblh1hu9ebnn3ovgygalefjc6gudv33hlwmplksjz0ztcpvfibr6mbjp4350cuv2hjn7ddre1l7dhanwf9xgen0ali0aefyu5or7g3buykvo96y279mekzfmy9rnokuf5ug32a3j2ukx377lf7jfzzexqu9a1y7trth828xrp3vxm5qjh7rc',
                proxyHost: '8prgal7dg5khqsrxbmtj8pmltx0ip82auij6133nwwfoxr2i2n7m69abqklp',
                proxyPort: 8941873119,
                destination: 'rt0wnlfeh4tj3oqmktry77yig2avt8jomneo7bpu0unkx9ekgeot0kkfc0250fmpycmtdg0v6z7gws00a5e9ocxebiz35bn5vnaij1oaw4zt1fvt0i0l7w9rax2o973m0ctdjxu6nlaj2d81e0vskfs74ouu02jf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7mqidhuz86ufgnwjrczehvsrwb0g0foucpovxehkgsl8g2ms9916lruinn6cyk1gu52dra7ft5u45fkra82u744teq28fk4n5w14elglejc8rysmimk2v2ryyuivc39cmr5fb5r62iqil665lwuyyv0tikg1e6ro',
                responsibleUserAccountName: '12e7xg04ybghksir0tn6',
                lastChangeUserAccount: '4exqae9wzf8etu4050yb',
                lastChangedAt: '2020-07-28 21:21:54',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '6uymwlh8pz1yl05619xp5sn1xccj751mp1a9kjjc',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: '15wa42htnz4jkptys92pnbnjte71xtzwzav7gwwbchyzytk2d1',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'qm2dpbd11eyzzvp45n42',
                party: 'e0q17dzoaxrjf3lc7nuc7495rnfj7ve8cs7h4kva6pzv1kkutjcx42lgcc5gaef211lmyksc3gpwntakrguc4seb9zqjpixy63rk27fzo9i4rycx8e4avvj6jalcstot06gummk8nnjiv20fxcc8mb7m9tv3prxr',
                component: 'jdifd94l448a2una4jy1wt8g5wayygufes3y7qx4366rc07g3cqkg61vxhgme8yeqw5d1nnfovrj0wr4e6gum0zcp3x30at0ukipieby0gmxdk9zcsddysec5mcasgrwcqjpl49cxirgjsrpu91jw30ie1d14h7x',
                name: 'cn48u6prwnfwxh1i7s8m1h9riluwgukz17evtva8ty5ik6ll7xu8nzthu8d44r5y45j8po86r29596sb2brubllsl8ywkrkz728otvxexa492mi0dgt2c0fyfds84dpnw1pt5y7r27nom8hx7kbnu2jwsde1c9n7',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'wp1dmu78wxqxc3usaeu51irlyw6uk36xtbkpr2q3ugdxrb42daew0o0wesrolx78x5cmhhznwywaeta7nw8zj8olmvkp64e3qzz06r074bq6155p0a3x156nijp31auwd1q7k44czebekog2xznu6gljhgm7yrqc',
                flowComponent: '43rjuibvpzwamxr4up3n1dsll27707wqmnjmfh6i37zmggdjczkz43l7r4rahgivvyptsj9uk2s8v0ul1pdmrl06cywea01f0wsmi4z146q519476ilw1xp4d1kwh9fuezzmnxwpt08je6o97zn7lia0y8c9s74a',
                flowInterfaceName: 'murutmrs5o7fvx5gdzrys2691sg3mem3dpf83ysjysi48sn5nl0atd5i2pwkbyr13pbwiu5753gk2j8ohncfcl48s3pcyqmwn57pq9zvxourgh302iuspaz86m5jawtupkdi454fk0ogf3hrpwp7pctpuggmc1h7',
                flowInterfaceNamespace: 'lvoapsthfu6lwdl53gh1jhj1k0nur7br29hzmeaehy8zxyue9e2tecljaboe3gz095eoqvjxpbhmb3s1drg1km2pyvlx2r8yh25xts3c53bg79g69r6vs5onktihd1c5cmn5j07hlh21mec4jqx01sg2lm81wo00',
                version: 'wsv7h6ecb8qlspl3dpgy',
                adapterType: 'y1onxqz8xxjlzz376h2x9923c3ldrpwt9qkdv6c590r6a329bjlwpbqi3afx',
                direction: 'SENDER',
                transportProtocol: 'fkie78xruxtyybvedyisdoa006qg1gmyrmq4ps7bog0n8pouey7hy9u6i7ro',
                messageProtocol: 'pyygkoihcwe15ii7xwgxs4blvpobgyr7qffrnvmb5rc0whrlzwi18hwg5cgb',
                adapterEngineName: 'jia7ld4r1n2st8i5l9cm2e5nxrkjngpf2g1inx223s80n6qbvapitmzarocsehc6mk3ndmyq2v35b9n0lfxy10nr7kbcsr8bjoc8vzlsmw5kloigvnm5srtuldz9fhzdyor3f1a49myx3t12il7b5rd3r6sdeql0',
                url: 'qnu47sjgowjs9njeml8rdmpg0ycqx0ye2g6ccfgzo4xgs7rph757o49cagbj8lzlanxywowvgwpoidpjrjtjvhucfz7eb2jq25hdrp39t266vmxi7u8x6dsah05a3tbgylsamuoo3yr0j0xbobrna2m9x5b2kzulgha9i6k7ykgmy9fz97l4vfu8ogx2u09xzhqcxwnmwnoxr5wd0mnt5pgnxap54ewqtkogbry0hjbl2ydtdgygk3l2lz50tc78wk5x9l3zktpsdxra1y4c5mgse9najpxn54kvk8vfvt2bu5wpsvobwnat7809xkgy',
                username: 'tc20hhvq6v0wtzodhv5cowlhq9bq8aem2ceha5spakz6ur8obsze3hqzv5qd',
                remoteHost: 'tfnudcscr5ch19tofmgavzut4xnryz5inkwi9ay4dbtl23apg01ntnt3d220pj6zrbmk2691c4z6izkccr17al0wqq56c7cauvxrwrpy4k3zpt9hgzvcg1rez4vhlimjyrg8hr9r8jng5vcj6zxasas4q2czyrcn',
                remotePort: 4624354764,
                directory: 'axogk4mfd4hv9v6fnrbdhs89yd0ashlc8c34cyilhd1jy01dcp0mg7fwjbmgxbxzzk1j9j9qjsbgmphr5w3bpm5wx5svg8zk8gwuqzbtrugr4r7tq5tphnteos9ym75dgef2nxt8pwuvm8xvsxj78ksesmkbia9r2o89zw3dyuxqx9tmvy9bvc4qz1fe5eqtcxk59z9f2902ndy5ysi3ikhhxicpm5eqi9bgk9aeqbi593s2b397vxbz1tu6rphxr3uoexxhy5edc8er8seqhjctjlqd8ox4qmbhfevbmumk5k92xslmtc719cayehshzxyodmu7v09yraymkz74m1nxlnadfl682e7qtaa1p64an5xvouwkaj2gjnuxeio6grwt6lq0woyf32ey1cc1oti85szdh6ykib06fqodo6x1k47cg385047705hvv27k6ts9n0olsi4mw6m4fb7y9km6hhac9np93om5cgph1bohcqot2lbre4t7fnqggbymp5mei8trxd5axhnxxjet2wuv4rur0df1zyl71bqtsomztq5r5dtrfxtoihydxn3jvp1u2mu0lwinfblm6xjhsd3a0rxzyktry9i7icwt2c7kzsexj1g7u49a2wkatn5pz46n95mf3s6w4eh4zb159kfvki9fjpx7vbpkvyza1cy3yh7fhciircug7gxongniljlqi10qgnv5lim1xevnquwiw27yom1qfgbt0lif4zslmoh9uq2evvdpraeicc0f76jly1rsrly8ug5ihuwzvs5v6xyym1fmudjm25gg0lfe7i4himkx62urd2qcro8op56iyfip2o02ayp8jmu38mv8cb8kabmqoebujodf3jrrmc7ljc573vacqe16t24v0djgn7isco330i6co4j14kl4zvutgu86w2kytv1oschrjvxumx2vg93dguuzdzpkn5elje26kocz24w1m4o84gapon911x9ts2cxjziismt9n82xi8vrupmfrb74bzwl',
                fileSchema: 'ie7xh7plfxbj5c8c7kjwdy7ezrxzyqy3337e7uc1btjd9dulgkp00tf6n4u17a7crpqti16hg0cgbekzi1xpvwwb9ld4qmymr8jidmosdbzxlpsrqkmbn0i7h4k0rmkk8ni1tl2w42qt6qg178pl83qasfx5wnpoahw439ukz6i3v2hmcdz8p96yhn6r7apftz2dq91irvx53q74g8xlljctl1hbcdwcvfy1x05tfx4y801e89tatb2tdfxlli4hzzbet94ogvehnxfrksk4h1lpa30wzme94w6zxm3i1biz249nrx6juytn2hrneagbuy57u1ak41uxit28hlpql401eg4hdmhdla63y5uedlpqv32t2wecwd5acd5qbav2bsbwe8flg5i6kngpsj4l9t3uagrz5rnbfhq85yc3ai2hrpgmp6qpu1wrepwp4shi43nl8jqedv0l75b8rmmsxgf6g2e2m8pkdks016v2zsrrbkvml4w0kh9md3ne9cuzayp4akltviizdxzflokov3tfdcz4tp3csk98ccm9bfy4odzm2x3heafanqzjei4e513havl5jk3e8n9hh60pasxkdw0swh609qyowisu1w42hd1igrkf2zogelokfpfk47x1ndz95cc3jgmnpo7038ru74cpuxkr6i300rsqzkp5qlcvelh937833ako2uduhzuocmw8g0fq105y4lu9keuh8slyxey5pjgvrzmao3vtm5impcz8bhqje2xu69ggt9vwnyjuyv015rhdobfrjha0v7qeem1eyf2bvhoy0k4faqwaga5l67h69aqz5y1ybnsjfyqesgg5nirxtfjz8tict91y4gpqnzg3v0mvneitbhmofsl14pydqbia1okhgwwuerbxlri1ku7vhha31rva341yli7f7uypjlkgfftysphwazcmqy7nsa22n14ffr8img0bq9y87p7ra94jipffu9c2ljp1bxlw4wrb7tsb45ae1dt4innxtg7ot8ba',
                proxyHost: 'mo6gehr8mlqcfmyabja1bzfzcdt8lg63zaeizyqag3ci4f6lu79d9awt9uhu',
                proxyPort: 3552764927,
                destination: 't9pjocbpfrloxcu09jyrvpu5iepz5y9dv1482aka8revpjk7quowqh9zd4udiy5ayeza162hyrcxw1uylefbzwcrtlx0wyvrtrcuym4etft4rlp81d3fj4yh94ku7w4tuyriipqqzpyrzn8wbvl6py0vqw102cjn',
                adapterStatus: null,
                softwareComponentName: 'npcznig90ktxsk967djrhv5nlcwd4mq3hsjy05fubz6qdq6fyrvw85qbjnkug65110w40zu6xzh3yknralgiwdaza7it1bs9ylavfdefjr2zwdg21wfr4cplexxr7f79zu7pawc3rdjss8s8zi9kl9xoifs1yhbl',
                responsibleUserAccountName: '7i0hnpjgtab8mc6ppdhh',
                lastChangeUserAccount: 'ospz9ppfa4chneobw5dh',
                lastChangedAt: '2020-07-29 12:38:18',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'ffvf92t3p5xzvseqdbiphbblr99wgqglwjw3gxrp',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: '6bdcyvfycf0sal8wwzcioqjjlihkwp6hqpt32zzrhkjuz3f05i',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '27pfiwajo0mee5rf3gpv',
                party: 'pnfwh6sc6u3bisrt8dtvfzzlrsmhzde9a3p76dgp97cjvwdcebb7dz87a6qd7ig0r8y7x4xl5sf0t400804z4ftlp5un6hf1guo70sykabqipvs4aj6impfnkrabwvcy64z7fsbjt8rgu5pwuyrj19hruo16eb7z',
                component: '77nvsdni2f1ucf6eldmg2sjwqjta87sg6v8jhdjpg8fui2oe2xypykx77no23l54ncmulxg2q0p8l1n1llxlzsut4147d43l6c0036aagmndhd32ocmfsw03lk545eitgfhp8je46h99r6jmlfu04se3iy50ecfb',
                name: '8569r85ljivbunganmm78uhpy8ter9smmb6sqks3btdowdg5pm2v9ma2zcvpz22uk0g8wz1329xzzrlqhb10s8vlky4algenaov966n57gqp6qpyj77etl0b1385b57bsfnbv0dvmmavg7buanzbj5db29c83wue',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '6d4vgg863jl1jiqn8b34u6rnkayq04n9ladk5rsoowe9cqf54w6qy2q5fjz15xd5i2876d1i81abovthf277k5celm3qrzeql8xoqrrsnx6s60zkmr5d65x2ex6fc2lm9laor4xctojb8nhxrmh28jhmbt4d0aak',
                flowComponent: 'olcvt4f765rdp2inc0cd2ph6oas5mudouk3nf8ujdofe3t4sg238fjiy4ij33v55h9bdr9s8pyryq0t0p0rn592bdmfchd2bx537mcrhzmcnf5at1v97lntyk55t8jbyjypwv9oeuwh4oigzi848utmqcse9f6ht',
                flowInterfaceName: 'impochymvlnrc1sr3yazbmk3ja3ne9qmhet13ej0nodvjait2y03vec9jdxtw3si6rmb2odix8p8ttxxk0wyod96b9d10zscyhg0g9m7cssys6uyhi3ak81ycgo2h3lwuzp5rhczzspi75hrukt8fwztnugxcijm',
                flowInterfaceNamespace: '5nkcji6dfps44fc79vgi0jucclrkkdz7u5a8kj3wh60pkkl30qcu5tgyyhxg74de68xzx7j9fsyqs6v0a8kvkzmw2ini77i455ud4wqzl465jdaemvzn23c6ia7gwfvsy01i6nwzj7umgty2owoce8h30ygdbxxl',
                version: 'lf67vaj5w5sf92g32tdp',
                adapterType: 'msfrqadtb7ubdw1ddj4tru8h9jk135x6h5ja965l6ei1dauxqtsn2ds1dwqh',
                direction: 'SENDER',
                transportProtocol: '629thg5b2q5971azuqkfcn743gw7ye7id2etdagusjxvmxjvrq9k4n6umbsc',
                messageProtocol: 'tserxvzp0d0xjbp9qyitu65lvlz5pcx1lv3wg4kx00bzbp5xl636bxpydbf7',
                adapterEngineName: 'tq0qjbotfw92pf0vq6psgjd0wgjb3yggaurg5wqmu6dgs5o2agb5gf6m22denoi7em4klhyj50yj565u3k12v1jdiezy7o16anl8kughkvbqsshv9760zzsb4niufy57w56003tvqeaq5ibs23vsuesqdaws3iej',
                url: '1vnbv6shdbj9pah5599c2oqcioonoon8jrt1vb74mmwoghqg0vrpof12unr5cyddgbijtdx4kc8ed2eob19tmgd38h0ha8kogym1nijs3c9ifxfxnipjyipffb164vuwdmvhnce15cqkl6fn82dj2r6gdmdk5a5ia7v28qtxybrjl99hhyr0ru2e1lmuopkrdnablh4htd54o26fhhwgididt1ma9aazlrbd4e7010zumri9jqzeurecgxwphnnn7k2ez9uel73hom2wfwr8548wug58zljbnzfpgvqmsvuds3jcsxa24vvx9pbc0aup',
                username: 'ur33h16uuo46o5kfdpmc2zujvt3f75zwn8qk08xslchl06pkf9m0im8q0zlc',
                remoteHost: 'ozugdl04kc3ul47bkqbhfxq0x34kdyk7bepnujm767tb1jluk6gpsb1tps2tuy772izr9hrpg0a5izujdtq2hnlulvmzn9cr9qqevrqgegiel4hruc6vgpwz7thvpkrlhxvhfliusbshq6w6mlv3unzirfat2dbk',
                remotePort: 9885889375,
                directory: 'yto214hf0e3oqbnxfk54jdq36o2cmybzal2lws9ak1nhqadwpc8mqwr6iysri7ukg3qurw7yn3kpc7sdl0bm0wnzp94jehr5sfx5ukv8hw9qd94c39z0fe7y2zhlkaggkeqwyp9jq1qs8gc1rfihrc0u0dv78zwyemyele6dt6rs4x13iwbo431u5d2866ou1x51zp28v71ru98v932hg3oiamqw3ja3nommubauyktum6hp7ra2mnsiykzh6o99pxal9rtg5189g9h5c11j8n3ojbeqwnfu6uql2nr48c2qe7zxybfieocsx06dzzd6jguvp7nbjzzovrjdlpd2mccpd5yxj89g09hb4zpw2rqg6mbke82mtmhvkuph27u41dk2abovxapkktt7xjg4grhoofeure7yzazrvfcznivg4o0io4m46oz4sv8himax8fg5150vrlsijrwpogqver9t9xkxhwtwo0c2fpj6g2cvad8jfbhuwecn5kp29atzs8jjkljmeco1e84ws87u3kdohbt65lucrn5qnxuz8b5fmhvjmnclaapoeuoc9198g005ai1kgq0xcyds9co32rrusvr62x10e517bioqg00o52x59gt125qf5t1nt11ljapyqkisfyd7wle86gds5qx70r41i9c82oxzke2hsn1k5nqb7w2h0vmxprrc43zszlrjkftumz75c76fly17l8omdosfi0bh6v51bchfgdkh6dvug1gu20szxy28phzqsvov8ugz6t5998ygp2t4n23jg5sktwq11hfjufsgbo7mafqvb7w7ou28daimkknwbaf13pfmxthvlyu1no7usis943dkuox5c986z0gplx9xawq5vlpasitxxpaz0vsehdo3wg5vmhzbw0cud1es5jdvz4uat5059naa291p647ni146a0a79s0ujppddy6diw4mnmfiia5cfojy8b2fnequhtvmzcx9shmhkl6i1clj9te5vg0qnmt1j6q83ykr',
                fileSchema: 'nk82mk3rnssz5yidpijryexszboip51jmq6ymf2790rzcc919j3noh1xq0mwiucbs6fuw95foid8vpz01w23c1w2mydgxn9v00h90qdiibhlbfhbgw3uqxdg0fgu9a7pc4j30ldqpeq388hgognsrhy5078m0i68earyfrfiyp4lpphgkqc54gfzr119tczvvg3py9a688u8dvakuss4j7c8eanqmmnstgbhzg343pbkqnkm2fe5dvbrpy3vl7w6q99630r7qudbw0znfptavq5da9wu1jjk9kon18r3yumi2tr6f099vo1cjpko0q63r1cvsta39w635tcokwg5131pza6aesfqct1cf8uc3mb94q0e7nmevmbbz4yfxn0y08dbewa0jgkavn1p1y2mxvopfgtwz5wju0cdchvepg5pgh1929e7ypv9ulqyp9fehuaa6xtzxvelzhuch3dsrimchyzcjy0sy9hvifg18g2jgeer15trsukchg6dx22pf56yzls1hy53zrfp5kcn5r96csjwft34eyk7nhkuwg6mo3eimerbqk8uah62vj4r5ly189noy7wtwc0co0m563bvyhx7jwx3m0fn4gg6728zpi4glgotxjzx8nu1zruaill29ozc8cjoets3eqghxq6molrc6vbpm1zjjohnea7vt1osns24u6006u18kvn1puj5mn996szjk42jtd6lavi0nke0qt4okprhe6x97bimmz233d0g62q285nd2m3vvvcj7bgtml5qwqn0r595xtomx0xtblpx1re58d4l1qkmgmotvvy5s0aaewbqw1v9wq4snmtceo0dfs6d4o629fh9vadfzdsdp38yuv8wyz3u4m2e8xtu5n0q1qfwtowr7wuq0gdpdtqiax42yfurq4b65a2zlto64zsdwgjwptr0jpbeaeseajtg0z47izljjrj96axl8g8dojnbxks6hcyyhn64neqymz7fdvn3iq2r2zn38gwl2rg74pndfn41',
                proxyHost: 'ru10rihkjfmrmnmvew7vvmi1b870vlwn6gnj5miiysjggxynvd1ijcweotkd',
                proxyPort: 8317384616,
                destination: 'pj71psbafbiot1n54it3shjssdf825dy15ec9k7zxzursuhapl11hyumxidhggrm5fdvecahbrw8oj1n3vyqy0s4lrugnaxfqyj1r306rcycs3jopnnh1pmtytlv2psvzpagq96e70ft9b4v6qkq7800gyv14eqk',
                
                softwareComponentName: 'pkch8k7bwjnms7e3svsh2sg1m1tj67n280837rcxwob7hhimhhtwi5wxtofm32bu95eotlmfrs23fc0adaxuj33fgpf85olvcmbqxm7ptc0gpuxh30d913c9h1bcxj9xu5f6acvj6vduoyttnnbs96osotcxtaje',
                responsibleUserAccountName: 'llbtfk1zq8eapjvc0xfe',
                lastChangeUserAccount: '2w8dv25m09965n84wdi4',
                lastChangedAt: '2020-07-29 03:58:34',
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
                id: '8pvsyi0hd15yd9jior66xn5tj02wbuxwuvhpj',
                hash: 'u1rmfaytoavf3idcg1cpom404spk7unezenv0tzh',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: '62inl76i6t5jlbc763hts25xu506aahls415f8ek0mdj99ch78',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'kj2c6wf43ngy0dsxaj7c',
                party: '5cxvxi5f3hgfub99a18w00k7mpzkjwnqjzosucpueicdqt0npukeqd5nj3jfan4tf261w9x0i7kgc1710zm8h3dy14jlumdxggavc8hc5s7ftm112ru3o0nl8i53bbts63h9suu9yb1itr97eamq3g4cvjill3px',
                component: '21mhhvky1kz2skhbxwzna4kbjetqx0nimwgkxlmnfnewwbg31cna47bk3dzsylbuljeexggs2hmk5h1wnegwizvaejp8y4mwdk4mgbfxr13h702z8cm5bp6kiennf45bsqsqb81k391z0vg8qmiax2j0jkiics5s',
                name: 's8g1j7fcv7sw2acmpg8kccr4s3qyrk7os575baslj3s7t4hlc169n9ptggd0sr4kocyxg65y99kooeanm8ykobo4rg2s0hb64b2mwb2h5ls6jo3nxgkonhz8cw8yg5ik4695ofssoiz8hw7ns0pl52pn7dka13sd',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'sw529p5tiy10xxud1d7142ovnd1y1xvid7um3q8re3jc1cqdfku1rtpc1665pt2f8969jp0v7fwpk6vo3qpleswjczx7joxe7q3i2uqkljsu2sl03kp813gxtwqk0tinnjyh80kjvwsf2qtomd7ir7ao1shklk1b',
                flowComponent: 'dkkbmskvfvf2mog5ii0k7szviom3edt421z6lzeupru7l0pseofsmpl8oucozwxgcqspfgzwqw7ly2czzzh2pnjgchw20jkk1vjv0695xifexcvzkqb7safsj6hy48q1zmvjb5w0p5u77zko11dzva1oc9pxlxa2',
                flowInterfaceName: 'mt9ccpmyddx4jiqbm7il9ngw05aykix2jfnyssbhb59lrqfo86iomq9sx0rfc3y3scoiwhr7a46horjhacag2fk3k6qrf7sj3bn7tgv6njmp29yg7q937u3pxbop2biab05ptxhszk7tc9k8v2cdotgqocsjs6js',
                flowInterfaceNamespace: 'nvvmadjjx73xxymeww64llijxhb4dddsa9n6vkwxqt20rte6d9n9m8n0xa7qze0mcl2gbbnzhnpt7rlzju2xtpsfgng93181r083cqzg1y1xqwiolzwtgsz59kaldkqs2qg1546gcxzndgr0stdurys2g16hshzh',
                version: '56jl7e2cgy8hd1lw9dys',
                adapterType: 'mgyu2k7a1u1da8ymvvjjk7ld7ozg2j3az79idt0e1y01rhc5bejve38db3lj',
                direction: 'RECEIVER',
                transportProtocol: 'ywp0ao0kxutryuqye7pwq4xhi54sftszm955wped9b4itowa3x089v05nw28',
                messageProtocol: 'j53ym537ykbyqrn4aouxbi0h06fx5j8trl69d5v1hgixph5i7wd4z30gcpm8',
                adapterEngineName: 'm8ys8egeyyal379smmt10tw1sg4cairfdx37294c3ov81arxpl3kjkmf7xmzbgx4v2bcrc3hoy82x24it9kkkxu1xuwd5umr6ho1xgbc2med48w7umloor66n1fhw0ijnyvt79bez12tsdhvozvxdghxndu3j277',
                url: 'xjr9e82d3qb59t3smseeygxmbngw6r3frd0vvx174g4bxxoiowhv8o3jtxra8omymxr1zn2pfwoi3epeg814wa6uo65j1c2g1zd664b99inay8j5af2hyvqpy34k2lxs4gut47s0orw9i5qnp1ohp55ycv5g8a1qql8nv1ocldd7f2fnjce9sh42b5itdsx7ud05srxp9bd7fyo3ox3ry4yhancvsipqwszzmf8hon3u35h82ugab3hg9sbqyi6d3lsijg6wdaxrq2j3ai5elq1td3q8vj4ubdspziar5m1luftwy3672x2vaetra7nf',
                username: 'xfqqsuc9ze8ac0o88cqs6dr4b7xdw0reqz8yf894fc6nfmy2qrcntcg843xf',
                remoteHost: 'j89vcyytgic1lwr22ah8xrq64wru38wpe9unmzc3cglhpiy6ee8x1h5m35t933828z7cfskv48bwx81ugnp39vpnv58k43kkilk6oxg6s6td0r7dp09yznnlvx9fl3uukuyxvr5ms2ghg75xiz220xtlen8ceilr',
                remotePort: 3690370425,
                directory: 'dqvzwez8wrmex6828xw12aya5eo5xyipdu4kuoc3jm0uu82lj4sqwut6l3axvtas1t3g85ur9mo6478ia7c8dhqdkn0c1qei3m9lmi2mvzux4odtq70g4tnj8xpkq7az83ee6rspfqahqqc8r7qs1e0nanj4n13w8ty5r0jrpom9yk7hf73kty6lb0md32700qu9c6xya9c2e9g0p4ktzue34q628plmnffczenxr3wox9khsjwizrllsbvdagipnmxz5ion42tcxsbwlnbix2q5xxrf9t8khglnt7bqfagqbakdwep9tnojebik3ekrj0sxn7hascs6dlm271kan18gai2m9wmkv633azpkjhechrhbj6uv58ov50b8473tg5h0ra4olm8rmyku7ivod23xw5fkbujzohcardali2z4yr7mevge06q6ujhkql236bzwmxihu05y31qc811q1ljxdjg37bjsi3w4542zvc1c3fdxc57zs4xm85ugfnne2nwjjlo3ysyk5kn6rmu5oh77zjyit8zdj5fri1pjaa58p9a4ub6r93iyo37r406qfuf3x81he8zfc93yqbth22oteqg6f94upb362zq7tsji68t7wwggz6b9lnrcjfj0g8dcrng5u6yxwngrik6lhfzl6ibj4315dsq9rpr25cz50oxjwjmjvfe9osjlc1pahiz4o54qy8i46a7qkgf6vb1dljtq3jlggudx67rk3tenhgl7uh0nxy5jzf859utelshhrh3jahfxzl744ouz37kt9lbkvzrbdpj86vw08kthw9jwsut47m0pjpyt75pwj3lyqsiiy9exaqkxm5pwpn80t6xl6fxka98mgkxtjwolkiuq6fz9wc1e4qs9k01hl27ongh0gwrkmr47jf3rxk891n59ohpm8055w7jtka8m9s41h0xh3iziovts8gcgblkklkf5xv5gxwhxdgmsscor43ui4u82bjn7hsvquq7dghwvp5scrgxkqwxokawv',
                fileSchema: 'vsiyibczq8lowb8hfke48l9rng0a4f7zcmgi5kh4lrr44qtuox8p43rvpvdhcoz032m9yb5hkm717bgf8okibjb5e6vfzhdekz1gn7i98gxd7tyv2vsooj4uocxj08bgmzihmzhr4if2bf50vj5yj6klbzo1bjvw2c0ne2byk62dpxte0pyp67p6nkhb39i9dk01k3mf3clcrlqx2czjnit3mohe5k3j3up6v8lkftqicdunj6tmlaeflttki2x6ogok1vcwzti3zt8s5wjfc74y60vp45znmse17axgsgur0ssay05m7125e03kudpk2walkpw0alvdgfmudreabxim2qmqnfnwqzufjfdiwqt3810c921c6oysvucj4a9tjtsuwbmud2z58m6vxlt7ij6rc2s3gbki3aybybgu0dbnh0nisln3zlpewb6i257v1ofihnd068rarcsrc87g8s86zxsficxtszsezqqlrom3lzofmf3rhqgmi6azdohbz6nrr0chxjmjjl8hxohhz09yycathyrffziab0vtmghz8bjelh3xvpchpzrunl1u6d51cy59v361aft7env94ia5y2mwqeyxo33cz7twohhypvnic7z611vkff2l5vsbma1v89mh3lvsxi7aek4jz4qhfbzhavtrt8rtadnn4sv0mro97hdgpus3sz8gqappbydy5bb8mzgcn826odnomtou7cixslpoc960i5odt43rw483hdx26p4fq3gmll21ad95nzh71mdbhf5fmrizlzeikr8ry6lix3v0e5jh8kwfefu26k08zd4s346jegkka0cjmpydnqf8qckgg8he2wpaeiz1e43bir902mi8i387aeuvg8m6d2jm5ztcakfl9zv2hjdjkmv7mrrfjbhv8x7mvhflnd1jbkiwj9fuo9dzs58ptzjbmacydqvao806adndglrw1vfnf36lxve7i8qk4topfc6sk67f5ai2cgxavxnfz2jy1xii1bpj9mg8',
                proxyHost: 'pisoilpaow6vqwu68refuhqzqt1h5bu4r7wxa3bsa2senbdzu8m6hn404vh5',
                proxyPort: 1879128883,
                destination: 'lbvj226f9sq1ytefcxkxczjzl0jrr4rgtzjj8sq4vqh4gan0oiabw5moa3czhjz1whbyqwvoitoog7h8geeo34781gmny4az1qm485zd84nlbl8apblrkezfzvuuoigdoqhupihbaizj1xw9gna4tnhfe9y8ax67',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'm6bp7dfppwn52ettaqvuswqiqj2utk0azo749jhi1e9wlmbzbm1njf5gwb7hl5vy7gxr0cwk9eclrsl0fefo1o64u5orgjg2hi6lvxuifumzfw7wa1i0ptm86yanulesrusex4q8ucc2c7ctkb49iv191l0p9xm5',
                responsibleUserAccountName: 'apy9h2q084swbp9ytdnq',
                lastChangeUserAccount: 's58z5cvpkj0lcz8lapws',
                lastChangedAt: '2020-07-29 15:30:10',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 't3mzippn16wwonuvia5zrskdm0pmsri6dm870gdvy',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: '44t9nauitfi4yeu6b341rn0kkd7lgfwrgwdg4f28gw53qa0mm2',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '6gxoajhyz4ibf2222j3r',
                party: 'k4uskrn7n6sdu26h02czbvrld4o1rthfcirbkdgutj1i6lcq22smo24iapyaygak8kmm68vp4weevlkued3tlmliqdn0t9cq1uv9xfjnvlgmf8mbsf4uctf8f03oyh8pbpxpqloecmypa7cr5q14gm6eqii4d60x',
                component: 'zj8vcjg5shco8g0cacbuqa7v8gc4ibz9rns0v070c9kygab09uojptvgud05phkuafs7lthuo4odfqsme7ssj2p0q8po5ngb3t2xx8wf5m1bz9gt8kpkl7p22dpv7lat7k0n6h5bw53mwpafu4zwru4i6mk9qc1q',
                name: '20al566why6auhans92wfatdpmasb7a6kpufyxucr80511kzka68lkeecuqqcnliarillqz3qc40z7u2h3jkmp9bp0oemqbvje3ir9jbjxf42or2ykp5nd2ws5ozgbptq6q7yq0y2cplci7acmpyizz064m8oahp',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'szf93zyzm35vvv0fw8o23tkjng1lj4gwnbuygs394bpvdzq6hfn38h5k2wqrsf46h7os9d0srvn6q276um5gyq1p3eiq0yj5tx8yaa6yenbkvk366q39mgkjus6tkey2rs2udb1jncj6nsyi3euxmc718rx4q5gw',
                flowComponent: 'rex61hzzifigxfqt6ynmkwej3bzjm7uh3ej766ytnv6uugya805t2j3ok5pqwox86v8vhls549kgpfvryrrdceitzpqwkrq59nlnvflkq8maull4dutp0sxmdunon5enkqlkffdza48v2dvlvowdb44kkur4g9fv',
                flowInterfaceName: 'e73jykbcdszskfmchffn3njebs30blvkynl581ftperghsd4ots9gbafwn7s209rstla0b0voggj35lpcgwp7v1azznqm1piys639cdagk84f8d9ayy6mbj7ztu2qb0fo4gxri9gpxyktkbsuayky75zosbzvcxy',
                flowInterfaceNamespace: 'n1l9h12jxh4rqp7dy6jochop8rmlbasrrqhlu6a67nyicwk6jrmv7pvyhqj0lr83bhus41qinvzq060eocdzet0a1kreosol5xvx8y5wrw896tnw22wpwdsa3qjukmia6rkj65dna49ll52xako2d0y319iju4kw',
                version: 'qcgeyeyceew4zzer70nt',
                adapterType: 'b7dtcjht74q4jmchuvemcg8lmesyd92r3b98s0h14ng6ktpnft0nbca916rz',
                direction: 'RECEIVER',
                transportProtocol: 'h46df08b0538kgsexdhp5yl6dqn9nxhjp6ivtj55s7j9e4lnx7tpsvyxu7zw',
                messageProtocol: 'rb4pg7z26y7sa2nkqrh0hlvzyjq6b1zkt88y4ezh6zjxzunb9xpphkp6vys8',
                adapterEngineName: 'uzzim2g37hpu412gx0ih8ndsvo99tta61xa6bqsqrdmgaecocedv47qynkhlkbnl8py5hxhih2bvrsnoxupahyi4w9rxt6e1kaxfq2uyhnjl1wccws4w1mr6v1s7uf3yv1jcghik5ub7vqdrldrcagt3si8zi9yn',
                url: 'xaon21fbso4nuvowsivh5pnj2uxhikx29pydnqzbr74z7orvzy7tq8xg35bnvvnafvvbi2yh08gky2sgts3lwimst7fevrl3qjokuo6kfuhrexkjgreqr7unuhdw7w10bugk80oyzxlkhp0mn4k19y57j1zsvnh4lh7imiuk2tmjuoh4ed7ae6d9sfcmx7ne5pj952dnhlukzirerg561dx1cmyxbn2kqoecd86q289x9qb0f7ofw358hqn35rne9qx7wzpzhlkeqi8gws2f2e1pxx0qxi5sk61vw3j1qu2x1zfh77axjze602seha2i',
                username: 'bhytdq9fwkaf57zqe5dn388v6ented4uohppm48axf1zdxiq0l2bgjjrmsox',
                remoteHost: '5yzdmojjkipi66fig10gngq969qldz06ymektunx9lqkypg7wp54hai4ad5j1l4wwykq3y85uukyww4b0yjlzdogqsg1zeq87t4bpyvfusqtkvr1hi0qfwb0rvthcg3qavqxsc2y8yanqct8x9wrhqjctms7xe4g',
                remotePort: 8544367251,
                directory: 'u741hcxlj9u0wc0dy90hu9z78jvlanup6vnn8atezr0qqiphb0qguqiqxy8qz6jxsrdasqdv49jo1gr1letrdvu11mk046qbsl7bgs3obcr5lmmr5kxe6qg9bfh61fneywpk51bd6gwjpglr3eajbtuamx5p55j6t0oco4pfweyln8a5i1zjlegyhgkfgh797g6ojnk6qclvubp60kq1j9uy3qpvacsbo3nbcbs5pikyynbt14paw6kytv1owso4wbjl1ynxbv1qj5ehsq2qtm453kcgn5rb5809rb6f3aszuwnoelu1ju4fr2inmvfiephs1aycs0rinu40r528gn2r80uxecjz94jnz9cz920ffz8lqyijrj3qecwag3ejoq657hoursxk3oh5wx1v7x6j3gib46upsfs6g9yh7wktlmbvixe7sylo6ticpr23wqjnm91l3luc40tmco9glpu7t4hdu8ak20urmeqgfz3vwf4b8pxiah5ekgaskft5x8bz34b7w087j8pgmbgvagxgbb7diru67jsm2nrikmg5zklkqqcbgjb6c8m28ohfhsl5txxlokel4q096dkwfkfvwocsqy3xkgtcgfwxioia20tw1oidfslirt37hn6nzaek5rrj6bj1db5x628kzh3kpjc2pn4xipi1nzwld960gb8me98w0ne2xoah4qe3k72yalzfk6wmtgcjmt7eth330ytiqav7b8jbo38anayjzxqpq4sube5t3ptd601th20rmkq5c7kujpz7e0c9jr7lfbstu7etcndos9hebfhgsnjcd8ymnvikynjv8q0qys9rcghwnw7lr16snnzabj8ntzhzcvz6215vil36x7b3lntggvps7c03hv3igqauduyvjpbe2hppv6ieasgy0cv1fhyo54bkx4vald7i4wd9gs4oi0uo9mnw4h0aav01nnb2h3jrczu3d04kp0srz27o6k2wsv2n6dq149g9dk2pvp4fftc3fucdul0q46rh',
                fileSchema: '40i3xh6557ugrkb6sxqqkqgxw2cokyul4umar9odkxc2jpzvmmxsv29d5mvq9st4gbiqdvtp5mkzkba50syud4fsp02pbkttznk1q72jdr6u5eei6nc5wymhx4cv0j34iy2hbposmohozs0okune3l7iijb4sai1yyiahpkssspiqn8emr8zyn2jgnqimojqj2go2katetnu0g3hgtaf46cr642xfb6cooeps7fvkg1wzwo8vgcrpisvrwikyvwo2osjn7xvl5m7lyl7pb8a4nlt4k2o1p8qodra0mhipjknlk304edkjpgbf8j3el8nm6t7dwqvx9rqlzs03orovu9jo4ro323enoh88jsqmfpg6e4tu77w6pg0txyyfdqzz4de7fs09c37zoigkn62septrvu8vadbal7g4dkpvb7ajya413m1z3utc5kypfrpsy4z2qrhz91m2mvgdzwf1u0mripb2enp17o6pkclfy1qtnxyfhncyh42gi80416h1zrn1rolad4ttslynhvqzpm82jqk1iv0mpfsvexini3zp2jjri2rxovifnce1vqm7yar3wknku3ueadfboo13wiu2r0ux3l7asvel4iwws00asiy0h6mblaikutfn0hinky4034jd0yk0b2zw9eqqm7y3j4sb3ygqhbj5qmaic8gegwh5syeghrp7yns5ja180ate961o3t4pcszdxfwyvz3xkzh8p0e0tvpkji93087wh80vql5azslzwt81h3jrn7j9dwxzvedn6ocyd6k40i7f39im7gjfp1k2apo6hc8sgefw8cm3vc1zhwous9hzbrvhngl6ry7mdm3p8mqnp8m5j0patxa5byc4inp1qa3yk22hjbfqcc7rlrps07h4flh9blq7zsxbt7kpg50g0ndy3ern6zeqgmsmwfs2thf0bpgq9l758ekxsjp51gxvl9etelcn4wk6m43qjw78k2hh6sbzth4w4w2majqiftfjrjeu80t5bzkk92sth2h',
                proxyHost: 'q8ghltsosyo6jkhyely90oirpco3sq5foqn3q6yzwr8a94jgdzp82qmz1kvo',
                proxyPort: 2130338983,
                destination: 'ax3ioodn28o0uzp0r9le80r10ee3lsykowhb3irdameoasstofl0v7ctrp42785h17116ep06q6zcze99axtla2rjg4ocwfcfr51z1zgvjp9nbfyrc35qx4m14bjbmjf623qazodvb3tddsxcyrfqx8aqdwfar7z',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yw5ih7k193hbemj69m3ivmvqcxk1s5lrsmsdgzaq08o9wf5tngaiqvf6g4to8e2rv3vnszciwao033btovlzajmcnd5vbhwbvvotwcmcxrq18e3eh27ux013w79b8tmiqpxp3fa0qjilu8miqxu4kqs6nfsn1oao',
                responsibleUserAccountName: '8ib7nbeuwhyr84kwp0td',
                lastChangeUserAccount: 'vhimbkfp02xqodieskol',
                lastChangedAt: '2020-07-29 01:09:49',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'q5lmrh5tai0aufdkx3og5xq53wsbc1g3emlrruid',
                tenantId: 'y28dbbuey9r9ivjbbs7ol7awz86f4yc49mq5l',
                tenantCode: '3n4otkvgm4i6yb8za8k91elc6p3au5rwh0ktbnumjliao35ow9',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'xeo3ebnt8r8lpg894af3',
                party: 'ujbg76uzimtj6dej4njfyinqbuc7v0vjte3b3e75me5v9qf5gk2kxshp521q6c2vqyms01j0mqpdwsvcmcpxdtq3s28vynf10m7xtomtjcqsjz4xcoj93l3b56rqig1b31mng4m9rb99aifx9hkxmgyl4enatkd8',
                component: 'f84zxmwc9z0r193pstrlxsgznqjxry5r9o69cs3civg8lc9hf82v9ycxe657p78dnq2jkx02lkh22eeuabpjjg35dcp7kb79zpbhoz9f9ncbs0sdjlwz3fcsr92vnj2ns3vpn1v50toef0ujyfmmm6ph0777e2an',
                name: 'm6pk9qqjq4coxqmkvp6f884cdduvh3402nscvfti9tswb1jjodxxlf7o8yq7sunjkrsqgyh1hhxwit3pcvhfownww0xekwqvup0x81v7ryvfalqbggofmgha1s4uwvhl2cvjtrqbhdqnu7ge5t6kns10f8i38gua',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '4m1j4tp5t0guk3c2accu8c00lf8f3row7hbs852a1602o1mqj3ftpw4qg58bvrl3bin5vxra4n100uypfj34m46qmy95anmhei9eyn3aasxy70y8ykxp4zhl1rm6vxcvrhits3ehh3sdkw5cqdkopxz665fqfgq0',
                flowComponent: '0f4exssfa5k0os6e1odb71frjfocz8fvlzp334b19d7jdzr878pvmjhct1zz0il99dqq0h50hqmoocqd28p0a07me1r850bjn3gvjpuwebdfxv81r9uq94m913odiy01k7pegc7wyljpslijcyis9yulj2kw6vjl',
                flowInterfaceName: 'sboswzhcww4hcza3u1qsvl9qxxy5l5lx5bt73kbq8qozdmgc7aymdpual40kf0ctgmrteq8ppjydms8ay5dvhhwrkn7s9vv3aeg0wy34tg2wk4d4ntd8n2xdhspo4u8hra84ujnc7rxsngsn62e8qv6e18b3uz3k',
                flowInterfaceNamespace: 'ppt4aruljzr7b9bhac1qdswzxisnf6x5whsygd3ub55g8kn7o8mt83zayvw87cd4n5uvpvapz9q1pk0251fzrh7kqxxiu112lhsawvdrl556d3800bzfv59zpt61ybe9hmvbd7p3y0864119i1dfiovoqa7vuaxi',
                version: 'ho39olak43w2fgmksivu',
                adapterType: 'fgsmvlowr58junya0epckqarv3npobbpmhr9klc13kb10uifvkphg16hre00',
                direction: 'RECEIVER',
                transportProtocol: 'fz2ckdisgh63yljqscbg1e0s0ecoijd3e3xb2s2w1y8jw5e1hcu79ma2hu4h',
                messageProtocol: 'ra235bp1hqj0ahbivg5s3we8xti9lfxtpgostcp65tv6rzqk6di82o8qs9u6',
                adapterEngineName: 'v40z8j73munlg2pdm3m49b34jga4enekcm03gt9yn93xfpq2tmegstrz1n7o2leqlauvlwlboe4jxijq7t9gvarpcyfsm0vus94ajmldezh96r8f8812lpof8giu52j7hegmd0mikaztjbn4hv1gv7yly58ogtfu',
                url: '7liu562vzmu7opvw0ib6qx8m3dqp3qg80ikn5j9c2q3vc1nc29d55v9k80yfp7nci2mxyvwq3qy9kghwvhwqs6zkinsl7nxkom389f9h90h4fwjvl9w0np7rrzeu22v6du3u76kvri43xewe620ce3rmqo76u5otsm1j6ztdn5v4dkqpexmsz9jw71ldwk0c27j0p9mhq2j5tnijhokivwmwegyp8u8l7cdbpaa7q5i76ibp4dmh7txlweagxq1jol5amhpeovll2ko8xdctsyylf243cd5mdlgsbf7n9ftg45b19hcsg3gyp62h3o20',
                username: 'csvyfqaag1lw4s4bm0zsyd34xslmoawmson4syh2n6immcod96bp8csrwpes',
                remoteHost: 'ckp8s8sxfesjfnit7m0509i64yruig9cp7tdhoot7tdiecrhj9sicpix8y7m9a50y5u5hxhmg8308mxu8ejqwriz4iqxqs8jx8fpjvtt5srnjmfyuoppqay34zzmurasglk4pyilmy4ioafvd019jz9t5l91txi4',
                remotePort: 5890318903,
                directory: 'uf3xuvradcazletxrwqy92nv0pqm66ysd5h9jvzo0ma0i6wmlmnr63x1bbqdq31co9lpbm1yh01wul3gducqes9133ip9riq5n6z530mokxanwg1lgiw47gafwhd4tk4fn8b7dmdw5r9hzeck8nje7dinxtqmi680bipg26sxqlmrco6ubbyqiyyikzi6f8vso95nl6iy7erdeblu597olzpfpdvp4uujm02tagxdv31k1fab8p6efty1w94anvqh0htmw5c9mnw29hv65t3gx429gkd1grstudp20sq3i6995g6ny2a02ftpox6ybvxlwt7wkuha2zmeisw2b359lbkhgxbzb4b3lwla1nj7gbvnpngxqk569lwkkvp1xg43jp9r1ttnc9tzor2gysyq26xrzq9eosxz20gtpd2rlwxrdpeacfjxgeaag2as9s0eak99vnl8cfvz3tud36oi4nqk3iqpv2hk9mvkw1a27qzhm235jzhnbfupe5uho4u4oifpqopxp2zwmbe4n2y9pi5zr0umpf6tfvd6nqwna74g7dcf118prombpvdqmh16x9zx2kjvi3xcwgmuvrldsiqaaioawjg68mhrekt782qq68lyvl1lxx6znn29o6v3v29i9mm16kklgyt7w43gdanusrftophz4ldjsrt2878v9auw09z9f651qnzrh2sq0cdkoigqf2ohwo8ujprcp1hpp57x5hjzthsuieekjbjb89n15sdnr6dw48b6353v3ar4mxqyy3xh8ntwabjfvd6b4xhj9d258xkrzmfe8g3bvqwkq2f6v7forbysjdjt0q3d3o58rxsx43i7psm30ybpxgfbsqrsw0kptcgbti3fme5e81rnfmsm8gcdi5qske2w24cp8ujox4l6q8yhsenghmaykkw3ne4v7y1lh0jowzt8cm4kfnxx26pq3dh6q03azybrui6gymdix9i8s8vauytaw72jlq0drzmiaaet2h9ts6dc7lb1v73kohh',
                fileSchema: 'y4h5lxngmyo5ikqos8wght0mkienhe347ovwd8af8exxggo2n2pcl4dlwvbb7evjmromrxml9xj6nvd93gsxzuuob6vj0mky2oy5cj950fppnje05hqn4ua8vq5n7j00tyolyk4mi4ea7r7snw1nho28fu7y95u0sg33k2cm6ggkrfot8xxtg6y9bjr5it1fh2obqv6ynfpno3gwhaob3y9hb5o20e3tvny727spmh85eflresxki6bmsm6hnpdeq2bvq4wmv43u3gqpyalgzoccgg2v6af7v9s13skcjtfj0v0d3846af5l5xea19hqa7ioz48z1x9xdvqf2o3kbg416dt8bemrwumcfk4dlikbyloqwd4w8reoc8sfa2mpue1r9omxzdcvg9645ucpjfyy4pdpr6qwx53tsxhzme9pfcvi4xxveiyjacvtqf2niac9z6kiu4w6ljtk47eb5rdm20a2dlrb1clv6xl6fjq5jepm5aaczxtey3t9nnw8t2xwcycmcojdxafjh6u28js15ptjnqf5jj4pk0cyvuov006di6smsa0hfpqjir5uxp03qfaoklp3bn05uyeqidx63u2tye38ymhrbyqsc1jlfq2mtqqiue1gbkq4xfajauzcjdas2mdtix0est8cb8rzh1vozyo9f93ucnf20fzowmexnnkqrvadg59u41u9rvua5f76m76unxnr7ek8j4m6ubm6orkztf2powywv8odswgsh6vuw5sd5cjxy5vo3mu87d940bmfrktv1b1jo4h55c5t4vkracg98mcn9mqj4hfkpcaidxxekqtcai44jdlqwlhkv75puuowi8muoo3ycxwgrv1hdd9ylhttusge85fibwqud6uyd1zfdf8hizyhp1m022pfi63u6q8w2mqdnfak9hldow6cj0wa1jn9cb5opa50pk6z6r6inl4t0qq9cwj17uvp7n1dzmllvrcsogsi4apmgcox27a9vrrqd3d1qugx0xa1l8aoctaa',
                proxyHost: 'ymufuumjxzobjie2e8lpwwz8i8khp2uiopnh1d4y6kwmr9a7t4yz36gko1v5',
                proxyPort: 9684720858,
                destination: '2wkozadhb1y1ojhtvbt6iwpkgbkyyh6fzmhsu80ofenemmiysq9o5inff2rv2447rgkolabwadpwyub78obrdjqjvoehh6qrxl1i195j00y0fxnobmv88oopux8rwejaiuv2jyr5k2vdc64ghduk537dxnzz9wew',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'aeup0xz6eh72qnzf7405cqu1ci6z89q961k034illaegj4zj8u8474lr9flp1pvhdhouv8tdztz79g7fjdhsa52imc6npzry4stnk6a4d1m1hfkl5zwixwhkmeindk935tlhx328oo9pk4ym2fd96u6e2sj2ojz1',
                responsibleUserAccountName: 'ay1xzyv7idu3gc0vspy1',
                lastChangeUserAccount: 'sc9fdhsj50e2y0clr43o',
                lastChangedAt: '2020-07-29 06:29:57',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '6zx50dapat9nkghfiqpwhdx2m5pdkq9nomotz8cy',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'ji3fj9q1l9dn3kwrbxdv3fhhbsyiazqacisnyek8vzjh6dbvf7',
                systemId: '1qttihwuynzsz5heyqqbqb14y5yz3kc613y4g',
                systemName: '5iqihhfmgzqt25qk9ile',
                party: 'm3t6szaqvoo2800239yw22dfszdn1taaqrjs02oyb746bdzu39fmvulp9ow9aq6uaj221zn4ag5tc7c9adv3f9wbybvls9nu6i42cfwhtyavr3y39s45l4yj6ermeacgioiuzy6pwiorspzjfmmfqjmv5nll36gl',
                component: 'aqv8c3z4ricbwfhdoc7o8mdg0x73lofz1o0tag8gjhkxvj6bvyfl8e8ovh6bglmc9z4h37pni023x4yjsaw01ubdrj8aggezrbvw8z3yn9zaxz872kf878kve98dvymx51z5j7cau4me6phoas8cxd1ccpia1ssy',
                name: '1l141o7ukhzv8wkxpvmqog9kqv23jtoibcs51ikzto9t69k38pjfox5ki9rm295j0zlfrx0z0c3mzgfuhf6xlhqg5bcv962l54k1evbbdz0iktsf45j4wi5nv07m5ezyvfj6sdc8pwo1ml3nk5whppceckz6dfd2',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'uudcq8bj5imzoirpbnhe7tgyszvqrn5umdu6hffwo1g9eav0pzlb5yokdegwnqtk2xic4jz7t8a9ryzoc6aj5eperkrct7zq3ytxiwlqdhivttfy5wglf0c8lljjizbrhdgzd7imqkye0j9cxzbhtwzdp8njjcw8',
                flowComponent: 'js8ekcyc7x5ntjwl3bkojgbi58m0rijixylahjecfqc6p2x13b4q7hmmj589tzgbrnagf6r39e11jx05boi0tpk1o3x1rklomi0fqdyud33rqefenxv4gv3dw31lzp3pus7se4i2mxbkgi45yo7lgfhvd7teap5f',
                flowInterfaceName: 'b15b3p7uyrl70fnvlb1xkavbgtqm7nggajeka5p2233rebsv7rt41u00c5ppb3zv79sgqr45eziosdtvlmkvggrfgmq6xznzrl66ult5u9zihksjww70ku9vx9iqf1u8vfcike19wfzirjygeijj9f5v3zepl3sx',
                flowInterfaceNamespace: 'fxfoocjektwmgy1p6uxov7ds03jr41lki7yqwriqdph5ko7cz1ec8ut2oe98t4exomsnuhixudvqh7l69myr4zgzo5uq4tar783f8r017v4ug9skfvsrtyv3ayhmrsfy59ibeh4axefl6p98z3hqmdnw2zk37pju',
                version: '6wy0d5ay8m0ic8u9gngx',
                adapterType: 'f7oslo00kitefnk596qjebjztl42f4wtxrwbvs2lrmhu6ru82ftcfqxpka0g',
                direction: 'RECEIVER',
                transportProtocol: 'svkb2zthxte6f1x3a6g4ej2mo6uj781aw6iyywff2kg6cogty5ey7j6ixhyj',
                messageProtocol: 'n7deripzgcgnm01wqfvixyeps083pwxq9aq81vwz0t4jc11sppuzcrq8n77p',
                adapterEngineName: 'pbe43br4hzan159e77ad4hrazp3t427ugf8jq8uo2dv63qbeerj0y758qatcbre2wr3z1u4qca9g7bn0dqochh4xl1nafu6iuoovhto9w8ls6db1fkjfvh814sn65y9x2atsmjx34i6bzrv62iqx70g7xivrlmhc',
                url: 'y7a9tntf0w6ltk3rbeeoczfh8cwvxkyas8b5lj0kf41ik1vkbq0zic608l942nqn5jc57e8xkvpfrxjsv88oml1rcoomav7cpon8c054ag68jkil2c3bzfs20p92b03cf14mllandawlemz8sjsxdcp8nf4j0hlnc9sefzylviob5bgkt4p8mge2baaknu8mx2c55bs0befqjxck0clsncffign57hqjx7zssthrwbq5zvew77xcd4bcxjtcbe55hivhjiw7f42hggcr6fyj5z2gyuf1u6opn724hvv5ydhryfx0o66t7qqmia0hdpl7',
                username: 'kgf8jmrs0x30n95r4fythlbvrloi0o93h0xrankyxtm586igyv4k3e06jg15',
                remoteHost: 'qh2gu50dkzwzw2xlhdihd5sutmyrkrkzqm2iruq7m47bn4e5mef1qmo3qohsimqhdwz9w92eo7p9ri0xug65mxo8juzphfjp5pvzvvdyccsjewxvstuj5yidu7k1tpnr6bs4ap532yybmriwvypat62or7vznia4',
                remotePort: 5169164113,
                directory: 'dsn2x1mc2h2cc2zqfg76xz8ceqbv0i1ri6st7m419vwmp4r3rmm6ktmjdpsipmszwfy9ytivehrgr83llz2tusoa6ozfcgh3qe27y8f9tzj7avymil2vefbwrc4l5iv63hghc35fvoh9hxqziea1ywvyqvgsj5egisuy4eek7nbk34da9d73skaz51swsmq5vst8tegueqnty2sup6gx6ywtmkhf2crvc0mxccuw0o45tf9q6qyqdor3shcqcrczq40q60r42uo52vf2kr1rzrx6bu7lhkc7ph0ies3bbmn4zpqowv3dt34izro6x534r916rvrvooq48iu2y3r26jqazpzv9w6r6wsljwoxqnak2p6evr7xp8nqy2yaq8rf1lyc7cefi079fatpgaljk0ocznxlx39zn6ty6ii2jsx2ibmed48wt78tqrpxatowkahc6p9j1rtfgdcy7imvzm92wrxom1vm6jdf9hyn04im4qi9ewga4fhfyv1p2dd930nsly3g7pjsdve92xkzkm1pxz84akecamps1yvsztzbakd4hx99zmbty4pzvuam6ki233uqncjkarh45viblr07to5hpbzw29w8l3mwp9mcgw4hz6s0z8rjcb1vvchzyqwkfgqiwzy5xltnda30ndpwg2a4o7q5f1be635vvvv81ki3wm2gxkn2z8mr9d4b6afnbv8dumjg7s0676xegytydzourktn4s0awu4jl5d7yy4niugh073j4lfkqj14s9us8ret4bjdocvw9mdsxx9duh9uau055w2f2pz35blq0oe53hp2h0ek8zrkuors7cfnhw419ruh9tw502em7id8ssvsxx2jpiud8zvfcv322ej1x9fy5th6m1v64xs3u74qorzujp0cmzqz18r2om5yqrx8zofybd9gqlji8b02cfutompsfln48cm1ovb4dw0zln48oqdhs4qk99zcdwscq9cax7395cpcle2i1c1wc1xh1wosdk5qiz69x60r',
                fileSchema: '7vf9u6kdgketstvjuy89me5qywggr6dzb6b70l1kwc1brrkz4lkxxmxcfrh9ycnmvywa5ohtko4ak2njaps8q394vunlqeftspvbu37uhlhvukq944p6ic3z8szypihcpq3ypqy2ltfo60k5iew3r5hiqoa5leufmzbm4sjirfjtatoezafmxm0eeep3c3rjjhsxa8a9tdjoy9vlzvsaizw6wqc3ottekn5jb6c2xok440j8z9l175e68t24gapua5a52t1qlkzt69aazllvxtn4jti5bhub6ak60pmpmpub8hwww8dhwhulukew4ox47gicztk7x8was2uxx31shy2w05i5gkfnf49t0wg0c4vq15nrxmm88qklumzq3ap6yofkj3c2eazors0q2wi4qqgfbhpvasio2srenaz83ayv5f0c2i93301r34o0ggyagpfg7ifon0akgaiyof598geogtdg8x89vg0bci2wxoum2bej2xvj43u3waol94r7uc50pvpjg0odmadq5nwd42n6vh679bec9zrinzvfpdwc16w0szttff68zg4317m4blg4f5ubp34d7rspsd8gahkqmy3v9on4i93i8zzqb4qt12ow9y1ncc2k1c1qpr4j65novt80wk3aundfb21oia8xkqgonzybdskaqw6u4ewld7by0wpt48r9vk2fevfi68yztbhjyxzayejnb0cjmo9z2k8fhbpzp5606w7j2fbr89cqcgsmh2moxyq7hbgx5d9874bu8lgr4v467ibwgoxvha69re8tucaioty4tkaz95jdwfz3388avwokc9ir00yam0xdclqlrmdvp9ldyk5v5ng25r0x3x1vyouhvypt3v8ss6m2hov23339f4ez8k4y3h35gr4dqcaqojnz8u7smfmsfzui12mtp6665yjjq451x9q4yiaf7pgkrhlvissztkrw82k5l9txrzusypwgh5rfflozodt8ryzqauynm7937ohvis9nwmhqtat5',
                proxyHost: 's7g3q0xgjx6aroe6mo62ihr8l82m2wd8mvp8mngl7o4y2ljrpc826yb7mtkl',
                proxyPort: 8310518327,
                destination: 'naxtblh8yx49pylryvr8d30d8za3xc13249j8jm5gl6484xmcmu09m2tnl6lle2tf3u667kckzqee1mp59ttzw6bjtzwfdl9aoekku9y8d9fqsyvkh7av7sleyaye3cba70b3g3vy04hrvtuji24k83qwr44do5a',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'r1dyf71pwrdjoibixy4ks1nixdmt1t2woixkkgpaiprjzxuqlxhd807q1trjhrsl5xhlhbriyz9twu8zibddsdvfx5nxsdlffbzhs9zfoso5v15luc5oa5o63qmuz1mjrpuqzyok2fbbqy26c7qq0x6p8qzb1rlj',
                responsibleUserAccountName: 'nanm048e44d2ropd6yle',
                lastChangeUserAccount: '7egjds4wpmy6vpn6cv9c',
                lastChangedAt: '2020-07-29 01:24:12',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'i4a4petebu5sk7pxt7zn6d5q88bk4h1qf2lghfgx',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'tgknrvcz6unr547j4e0ho4toux1d19yqbcwk4ov2xunpfz5828',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 't79bz1xp7fp66ftax16x',
                party: 'fazvs8uzcrmi2phj2sn4mvg8l7nsmv5kr4fw8tlgvo16bk93rl4hsf8vo5wwgkzigqqxophzdrweq7o7povkke8enkve4238cbaeuk2fbvtsbabbiteyqxs06bzwheq4e6s5vcmgf79tmi2ugjyg15q9ypv72zks',
                component: '3rjxj5qkto0cjppe6xex5jmhpo3eb4lsu5h3q3g6hsvpcpyjqdnrzz27is72z03nwkph4awzfpjbqprjhtboceglt4khuthzgrtagaudg2jh7rc3ui5phu8qlhwu4nnxuby29nyl4vigtef391yt35lhjqj333td',
                name: '4d76lwpxkgbo5rfsaahr6u2y547cv3aya55fklxl4ids53okjigf0ne5aaw2grvw1iwtxy8rm1jd5kgnu1iygqat05u8qv3bg247mv4k0uyjx5s3khyn91le2q07itd2lyy78dig2ue179kzy9awxmc9jiawsah6',
                flowId: 'zk64n07p311dp0r2zc12mvrjuepfk3v85l16b',
                flowParty: '4hli1wdclv6xahkix54gn3quxm8fik9cxv1bipaoykiuj4ftzc614b8ocy16urrttvvn5awm5lr9ueew6s8thjcf9yxenb0n18u2d0tdmxnflwmaiwny12ymvbz6d24vh6cvwtq3uhqnktkt9j5txs3wuhjjq09g',
                flowComponent: 'mfs0i4o67cfvlf17hsh092tgjnju8zc2skhufisc6w1d7xc1d7n49hj5rdq47dqg20w0yxwwz7k2kspcmtc1891wv1deqhqnrerbnlw4rebvhaa4ceufr0prp6hry9aliqhooi83x4u5djqsaahjhqhvcyjxwo5h',
                flowInterfaceName: '00ynerjvkli6vkedi6dfmbjetmwc1dbolagsxdu3oyn11jukgnvbek4ipvo6dhaij16yjhxvdmawhjxfcsbl2fwjzkle8aprka8vhfkv35dp0ouy4ji3dxmbzmur4cd5qsg0let8nx1uec0d4dw61oxqvjgek5n2',
                flowInterfaceNamespace: 'xbveaolgodjwmgga7wtb8nybbiqgs3z9y6qpye7dpzp4601ci4xjuv6um6q08w1nypgtz1v6l7hsaalneo73rovseoto42r8icyxtsqowt6sn21s5rqmc46eo27fgpeewqphjezdpfkmt85sfymzqs4cmuz1czoj',
                version: 'hqi4vxf6brwh7cbshqwb',
                adapterType: 'vgqlbza3qca28uzu9ufnxzzkluhvlfojeypl98nvatfvj0o2lou4m1kf70g6',
                direction: 'RECEIVER',
                transportProtocol: 'em0zsl81pxasnytns6wi4gcrbwjw8v7ee96q7g1sjzgm4to92dxwxltfaizn',
                messageProtocol: 'i5o5m770bvt80g55w92ercn81sb3ofrp5laupum1gwyv9r78blxqs63sikxk',
                adapterEngineName: 'xijpsqa6ela0yxpuhrb8c427u7mjp345ezkj11zm0ay5l1o4h8hdlemj40njk8gvkri57ltfqlj4crmjce2xnsw7tjzuo7negwno8zg679uc9ott7qp3on257ovklpe0xxfhiwp2kow1beef5aesqwkauiyu1vl6',
                url: 'dirkvlz4b8rev4r1zb6sdqt1hsmmvgiu27n6lz607dxs04tthu0dtby7vedidh2op7vnsu172ew73dd4s65r6mfi24fq17a41e8bkhzr30uwef9baum3mj2tpkkoqw7mwpymm72zxzj4stbp2zl95104xzbovapcfgpnvi3g5nbc69iack6o32nlduq8lubxuy1uh66dnohxf296hved7v771lk9gkyarr0kp9bmqpfb0ekhhj1d4sd5rji6iyhb283q659ij6gzyddmk7tnfldh5h6a1ysn1o5goiej7k1dw13kax2eefqpd7onfx7b',
                username: 't52xa61jv3g922dx0jexi96r9sajyonc1d6xszi5ghgebu7jpjzj1gwsr4xr',
                remoteHost: 'si6w63hwd0hz4e9dxi65ti4qxw2d2p1letnwye35vs5dpggcixg67c3qx30719jqm8qppn3vm3wn5oj6zl0hitfdgui7cdgkvkn3e5sfhulk0p6b0k329pmcr00hru60baj6zpnbkuj802usho18zja0dvt22xbp',
                remotePort: 4585418633,
                directory: 'coceox9oitwogcn4yw79vrewj3z2bnqa9j100tdzthoqyujq6jem0jnrfuaogmt4osj4nmyoggghm4bygl76zy48bkrz0dssd6cy89yvcf0qn3tcfbqatv7kuduvq4nvozt9izundkeqmtk6m0ogqq2a4zctp1dw7dnijed40xg9bosyb2lup7ul2ttrgji12w07cqtw3vric7enh5efam7imuz9h6jvlyb9cqk4eyk8ti7nzpdha14n1ojdacfgt7f07c1acmzm0qyz7nsmmmbw5qqteckg4gtqx7efhg16da3byltdsaivbifgpi2eqg6nu58oyhyasy4u5lb2tb7mdm5enr9r2zf36e7r55i6ib0aj547clp1vjbf0669jffnt89ruhocbmbfp6bxm40wdulfxb262qqr35p9idhimh8ozxmcygjtelkhssom9ad691ss5zyhn8qu50tjxsbhoi0tz9j8jv2l4et7s5ttj5vhoailg8c2xt8nq3tmnyhptni1u20qzlp0ogxvgngde94khnlyr6zzxbw0r9engpmdsr6btvzcjfj483r5ne88u41rew2d9qt5x4afadb9nyecyn5zm6ycctrb6534zxcvapk9u2n2wgmvnlkyyb42ztnra1blhsl1glegtbrhe2jlm78lq1mgfllpj5vt0flau1pptenxfwukourqta1002bhda8x27hl5o86hnsuhqkykgfp3h0k1g2ue91rhsw83ii5upj1fu5puhe5ifv5qdceb92tgg7rslhnb79lykifk66n3u0l0yuimciq5r0b8016ar7o67dvnf9xwx3tpw6mr679k53hc5jny9xu5mq3hztvtioe4mjfmtgmp4irp8wqn4c5s3gwmlwxpq9xzo8ix74luscqxvdsx00mg0fnw447mrw50mb1a71yos43y04z8wiqzoy8kjohf4oqr2crclx3y5c706b5lvus4tewj5ekjclrym0p0vephff0pzifz6mhjtmfj0gv',
                fileSchema: '1bi0nwzvg90c4i9nngio4fmbx9ktf1pn1efawigbimhbl3l9yviit3qps8ecb7js3fbsujw23czdjs3u89618kf7web0i6doqdu0zxe8ify525ezlyfvh8kr9xt7cz8auvmy607u7q45dh7h4ut8qj278xh0xlhrzi528eib9nniv5usvqtk6kmvwj9asmut1inpkt7rbspjxbeilm9a1hszb7ha1o25apprmbdhboqs02gv2v7lqcc9orfyzlynn3p42mqub5zmp9rr9luwu4jsip0l58isg1vyadkmcpghqr7qe6fq34rvcs37txfh7xi5x44yivbspud425ufupqjxv4s6pygkzbd7wyi9sacgubk7auddrlolzb0odmlaf938mzhe97sl375no75fphql88m7ksbfzvsu1h3w529itr9mw5bsxag1tcodi9a04pwgnu73nxjlk6cf2c4o6wdy29otlgqwcafm5zw4izzzillxsim92o7l10e9n4qpdfkwr9n8rjqt865k25e0mg72xbxn6wkqkj2jz5drp5f8x5u8ykpgxw0jtw8w61a26f67bwey21fqay9087x81c13vlzwce4ogxcpjx59lj0v9mfsc9fgt5ner0t6eoji4bez1fkbs13jhs514c2rwhu6w7c1hxx8cylwiimzlhc3v8l038ttz5wd88ellf418uc9105xpzphmk32cq9rfj13adxsf8uo373h220kfaor9ag63hmjy8l7zdbq7d1k3c34diexcpvplr8wk3quih55q2mol9286wgj330wrgua8kiykydtyfur8cxajas1b4wtjthwg80juxb8iti601vutfd6kr01nbl47kshu2zznmg11veot4uss0hwzoec9eiu85b63ws4kvt3wrpvqxsy3n8gszv41s8fmr6ejzgafkzuno56g83dwrlgcec3nvoh7vqrs03b2pnbojmikbp65syzvmj02uur17odp943ypsp83urf6nkdl50xgp',
                proxyHost: 'p9qx8k2faq9llgyyu8sqeap0vwos7smh01wajufzjtsanaagi2wkx3uku1zg',
                proxyPort: 7012778831,
                destination: 'ux847ne4qjso1cjero7s50v1ine2eypc9tn2fpb4udzjcco486zc4g2qbo3qiao4zotuc27g96y9t3ztiteovtu7j3u9hmvooiyf9j2l6a6w85d712isyugbr9pm2ch8q4r80a86srku6a6iqnv40v5m533iewmk',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4ecd1x2jf1zo8bbc8dh1yq8hi0eheauulcjlu9si3oexc7irgiht9bp8x5twxlhoowq42xw3186u8gucf44wghe4wxunib5bxz2ygavl488q0d3u5vhh4hwogqd4jnrkxfgxmwt76o8hugpyqpxglrd7fklznr0h',
                responsibleUserAccountName: '2d2iaix78tlbiol2o5zx',
                lastChangeUserAccount: 'rm1tt08vfj8oins2nzbd',
                lastChangedAt: '2020-07-29 02:39:23',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'fzj9cifpxgbx12gbe7bsoq80tulkercq46dd2cvh',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'lwbvzyqzqf946lyiqjat1alzdanzi457tzyk8ra7e1d3ot9ayvb',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'usj73yvv6u77nvcxoo19',
                party: 'hmb0hp568zmicjyxljetoztflwdg7g9ol5cfyg9sbg3cesi86ioeyk00mqsalp8klplpffazvb71oos6avud7w4dm18849izsta16ngmgqi1avoz6c7ueunn9ovqeoh5wo2ztxpvig6ompuhxsxundwjax42m5f1',
                component: 'zn588a2j4st7haxtu0ocl8fqyun8qbe5cwegk3pqbt5tsi618ilxkeown24j2f5j9euiemu4fs3gvkqyam1golg5zg4hcttffmxght2httye17fnx7infebjdngxfewndsmdkmwhqbkq6j0eeg1nmsdmvxatv8vd',
                name: 'm3z96z6zn1781iwidw7szzayopi19rtzw3ecx0khf7oly3h0y5jzpmfmafbrsxowxpivkd8l8fxz59f2xmotlnmcm3lahqh2sbd50xj2i18vydnexbfdr18d9urifmkgbs0b4c3wwcg68naf66h2kae65nu6z3ab',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'rrx49usnj6e2qdvrxeiv1rogxb9ye7r35q0iheyujg7m99x68lxfgdp5dq8u79nbrwp8nj84dkj15zxggca9441gkxgydts1j1p3smwuvfyz94xw324bb79vfu14ewc8mle2yidrz53sf6u7ng0821zshfn6rmen',
                flowComponent: 'g03ureauqen0eszmyiy3113vnc10ziuv0xm4aya9egnxssfbrjc3mnnzs6idg5jejrypewns26tvu7ftrsn0wl1m2l5bj90xc6ie9jzzpwhvymvqpbkx3ievf5m3e305bbxdua37k1puicwuthvwuado7r3jagcp',
                flowInterfaceName: 'qi3qt1nm1dfalkdbfc1lqygpwm53cq10pmssl0os1yswkgwcfe4geklunp5sehgvn9nuupyru2unmu0ah1x4subqbdfvj3k31fpoeq4zm1knnbzsqdgcm7jqcvplin0mzccowapcmnvjp4zgz38zwf66i78oklx1',
                flowInterfaceNamespace: 'qcmdz785kbxp2qsv06pjy4ivhq81qf66t7fx5f8xkdukifrol5y70viubv1sv6psn4jh1fbj0smmh12v3kqwij6zv2rl2fzpry0q3nix48ajm9c0xlpdbgtbq3psva0g8biiqq42ec4g6u04uu36ain94k5qdqxj',
                version: '64xxh9m68e0evi5vw6q5',
                adapterType: '85qvgzirhnwmn2sjkknhnrjy63hlp7jcqylq553ae0gh1d45afmhkcnslvsm',
                direction: 'RECEIVER',
                transportProtocol: 'rl30tuny17fn386kjc279kpu0eh2hrcpb2jjv0onz97w6inxumy39an8lsy3',
                messageProtocol: 'sqb29oqxivtl3vjxhbt6t1ia5jfpllhsnxeio0lvur9pbsxvps76k7x1wy73',
                adapterEngineName: '9pg68eywqlmrgbrowcb62ykk5wx1tewbowtnr9mufpuvdnu6my8w8b2q1zsyn3c5z9janyn8qanx5138op9blf7p5ucr3m4i03ohdbn7mrly9jlfgu6zxriofyeb4ot638zw7el3xj128oviw08t19n7vrpsogws',
                url: 'x8v0i0t82d39dws8hxuz5bokh4v970xhz3ysc9fdm0rhdszqilg60na5s0gcwbdsecutusyhvikn5az43ujks34mlg4g1gdtydabziomkpc7x27kaph1aora49yzeie0prkfguafbbstrc8d1ahd1tn7ehzejeqll4ingd8sh4fj1w1qal8tsli4m5f28wrq6mbxqngzlgajrgguzd257tn6vqyjgeigr308q1qv32ipxfnewz7lm70zf4bo2lvv0bbz3bv0qxq9d4b7kkc5axsgqik0xtrs489xs5r1n3rgudajhjhh2h3b0f7uclqk',
                username: 'pk7vfb99h3qqy4rj5mn7zkmadclr8sg093za3m1pch0rxnhfat0tset1bmxd',
                remoteHost: 'xo390ln1ap2t8avo8pg9edab3zs9njl64bclbaardssnj238mx6ffnj4i7v7mv2p33w7m6t444mxxd5cl0kk63m0exlfokzfc1invbbw1cwtf4vxltpfaw8vpc5zka5mdcre2emu80oktwrn40es6gd147tjzy39',
                remotePort: 5835240593,
                directory: '8ea66xlxjlqkiqopb2abtnyrov2qhzb34t5mf3lmjd42bqphj41wolvsjakd49vqsgpwow689cl1cahdnmdna78ynftoz4hctj07cfw1bstbhoyl6x6wky5tmgac302q7bxtm2bjt4d8qucb343pjefa66i4m4o6oiiumpzh2r07ajn8zponyge8y45htxc5yuyra6r61nsnwgzustf7ynt4b3g5nd1l02ovzj5g1yh1qc8ozokyz82dznrm2c8wn85s2ihy86khg59qcokrkfb5di4vsk0xm89u09kh4zb4mpb4tkh8wtg2u5si007evh59nq6m9yioe3e3n79991koltu17rsoyl5w8tiqp5rn7mw56czy35c4h80rk5z8vxelys5ztpw8no5kmi7jxidsujaoh3i2re3693vg8bxocds6uozyp1vby5h9pbavhn5tnp88zmfxx8p68mgzdm38xq1vmhrw16j15errpje7m49ro5tjb4utkz4x7t7cgfl068hsxmlotpmwu5in6mze8yg2dprtnzfggmogonhoc68m56v882f0spexeos92hs0quam8vhika72a9e3kkr3z2tgjapqjevtm9x3kuvb9z297af04ndelcngw2hxetrqxydkfdd512uiu0zo6gpbs7nku8ssuju4xqts2gffn88bu66vwn4f7o36wirwluzndgw3tunog1d4y73u5qvi2yltfx2i30lybert67pmw165ohf4rqxu2xw1qlwpm5n5hikpgc3xvg55g8z8oafou52446bve3uwkajc9qdz1yrq6d5w2lnlg01toxe4kvqejcy5pl1pzqlna28j9cikaj45xneknzfjv9vbu4ulng8iufu96h2xsvn0x3wd1jcjxf1hxo0gue71zq9on9agrbar0vrev180tmzeyf1698e7jku8ys5rpq17cju560nhss0wcfg3j2j9e5rjrh2iklfmywtgpecnlenbxwqczxdegxju83751hsrqdi2',
                fileSchema: '873a9tjqqg6wwy3trfbz6rnbt3b65ifivnxk8qckuxym04ewr1fsfl19bc66cs6jke8f2q5tp50kufhlbnf58bye88vb7aj8zadme495r68lqnp5q6wqgxywd9tvx1lmls58s0f9ppjltoj1t0lwwj1gt8zie8wm40hsdhklvy670v5shgcuviee0j7m6iv46cb47c3dibevlnn5cnavjxqkc9vw71q790h5s4aj4nibk991pmym18cn2aur4z071ckuoepkbfrw1wlv4py1fko0wz51qxmtws3t6bg962r9a6a3a0viauri01bq3xuhxkg4sizp4hbkuudwdirouw8oscxf98owrvuxwnfcchfv6oju2apvqydmahprzzd1o71whj8hc1sur792tjsae2emnu3fj0r15sx37mvnr99fkfj86q0g9jgvt1trm739xcj6jo9crjw73o1fghi24h5cvz3g5iqpwu420p45nnanahtxwpwigr4icw6f66jg0vssnyhbyfei4wtwa3v9l16j266dsaslgoicy9d4pzd875r8lmjjb7dij9moakhqqytsklj7mztfq0wfmqx3w3urhru3hey03tz6xmkewxyb96snvgf9k1q3f9zacbeka61um6cfanzj88u2x92z0scve2hoyqke85zo0evkz9op8n5xj3locim3oovbc2op6pte6vum7dtlb34conj4ybjig4m6rxladllptauwljorifawwvxvflspi2ljebd5cufpcz0kc1cnnc0npfdz4r1eaxw8oslj3a639ubdm54y7x16u5iy3l2hxkyyhnub72ejr5mao0ia05kg5zih08zp2glxsz6afdgropwda26ptofod01bjwc4x5yk6fq855ld06pfl5gcu9xwp9charxbm6h87jrpkyjrcv5turhyvsmym4v60smq4xmd0pcsmemxopqpie37ubq4v7mut1cf9wxlq6kvdqhtj5vizfhm3kma8uoj8zx8ym9lzoqu',
                proxyHost: 'k0l2xw667frvf8lypmramq0welwjwyv88ak54wujdfuo07vldlwgu7gho4ce',
                proxyPort: 9387180547,
                destination: '3uky43gm3d84j5jtsnwpo0v39onuvswu371cmz2t78kohv9oc7bv36cus3urrxfzqqodiewm90l4tk2l6ijle8pg6f6pezidlzn0hd9a47m1bl5vm0jlx17o5crmxkoip2h2yqdrusahaojwzn9fhynkm2m50bdt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'uiz3hdjqv75ariwe6somnkgr9wxv6x4r7embvkw66z8cy5sdcto9vvtr8qffxq0r3cc5rga1rrf2v63ytzfdk4cjrxyrvude6qm5hmp6hayqlw26vzrgoojz4f5cmjf0flz3k18boqo6xcarift173v3bjh1nm9i',
                responsibleUserAccountName: 'tffnxoqrnmg21d0ghipk',
                lastChangeUserAccount: 'x5s4ng2cwoqn79smoudt',
                lastChangedAt: '2020-07-29 06:52:07',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 's622k7reapm57t86311juu5j8u205ilq64hgk4wo',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'nbpna3nacjchmvtdgru25tgckoixglcq8zqsczq0pdmrhvcpsc',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'hn7spou7ulw623yj01vdh',
                party: '1vv7xvg4x6n743uxzd2ineyoxpzyb11aeuk1m88l8viikp09ad2kim2ywotwiix1u7l2v11znu8ow7dko8d191oh1uortkcuraerfb2mz4jkjv6irfxi1mq9wyv9mbuf73xjkcnrfnsc3edpe0akxwgud8xnvvza',
                component: 'zxoiwc13t70xf9iz8qhbijspnv2j80zwnnkyge5c8vcds0k6i4zh1a82qxrulf8cu4304v2fuows29v919trugbp9k7e0liu02i71ovxrazohe3iauk5ix65arkrx3ko317vh80r1uel5vohjl5wmro6xxsw7mff',
                name: 'cf85bar7j09oi0xdhwy8dskl4not83qv2wai4bcbuex19fussqhdnmdjl6p0xeaof4niubbf9lw30g1zdsejzypaua9l8xt3nomthx5whqvo4f5bauv7dai94pq97yl368oll3bkvzd815zkolb9qwmuiw1hcpjh',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '1kwivznf56g0dc9doc60b2hhs9kqtyqgfm9r8jwtlseccq0fmo0ybtlwt1c1vmso7aj1iwbo34dm3r7fl1azjd4qfqv3hn0qwuddmn66x7198qzl7lxu2nvu1rdp2zmawa866b84uf25blsxpv166t359g3znaz5',
                flowComponent: 'pjabihh46ztfxtpr24cg3ai3vylvyb2h2kgr61np8xpiuxubo90264beeuo8at80uq9rtem9nl2e3xwtp4zr7yhcz8bg9uvfqqblqjzvd7urgau2z9yr2ag4oje96ptlvwi2chgrtg2ps63blzmygmo6468zej89',
                flowInterfaceName: '5znhx5ab16c74l89gmgdscbj6ai8445ysbzn3reef426fiuvzd3cljj66umu7g2oiaocu7gh4kqexrzphe8e2bcmsueqkvawq12zofijdbvxaam1omp9503sbajrcm2nz0t7f793mbdlr1rd8oekmebujutg1x5h',
                flowInterfaceNamespace: '56mhvyduor199jknw0d3vsi95v42kmyfpwf5ouoi9g42sr1oereht3h3mrw0wts2w1kjm0h461n9jd2e7tepn4pn22ujt7apqw8z23r9432i35q09j12z2q1049az5s7hi9mbj5r7xjelk3rjyfzzyavaal1gilh',
                version: 'j8wffsnlelbegmuc797w',
                adapterType: 'waqukonx0thn7d55vfrtbtm35l6nqg2hnbiz412da7omub2inyg58z2s4yb9',
                direction: 'SENDER',
                transportProtocol: 'z6u5xyoj6qoa477rmypoigjrx8hutag7tfrwsxvmv67styy750wogl02d6mf',
                messageProtocol: 'kzbjvdmbjki0fa32vtadu05tvg2w4z3rwicso56zwkrbu040ec0arodmk0qy',
                adapterEngineName: '9l1pxrxz5od2cg2iirnmzoahbppcgmmctgwv4bpx9uh3m4i89h3b6xzd49hw84x27sl2veo5krg72fw1x82zuet29raj6522ttfkkeneaqilay806xry29vpc6jaczsbm6xzvoc62mj9iityxk2vct4uu3svq3uk',
                url: '2q0jkreaqplkfylgzf370qmolwqdnj8t4bsaex0glcrse3ibld8mqzc7cup8ddkk2a92ra860yar9d5mbuozail0zok6n8fthutzk30m7yox11ftcrc8dlanggmgglss4285h7hq9e5b0ambf60w316t7m124ttij226bgdfz2rsdby2tx6tah69zy023i282fx5s0ydfatn88xr3m9755bgfpb4gdn62oqauq5tdh7l5wmgv2gkyhdn4zctcvpefllxk2pa4gruh0u8ifnyuvd4kpsq6ajmsc5a0i10nnetijgt30s4gcy43ex2olau',
                username: '6rus01s0xt2ifpssopgn25rk7xszfc13kne3u4j24fykh54p7mve26pjbepl',
                remoteHost: '3l0qy7rz1ocf5hefd5ed8kveuji3waxbm38rc5r7f1u1rj0pygyal0pmj0qttmaac0m31su5tik0k6jita1xio3vew65luzdst8u1omwnqfcavkjk3ed68nsvwums9511e6dps83rnyt65uck4vdhrygbxibbi49',
                remotePort: 2135261281,
                directory: 'fq3p9al7s6xvyzwm5oh4u217m83gdabb1oxtxsh81tkncgk6o8z29pxbop8luxqgtz1kgshiiq5602qy1dwfkj43erf0w5o5n3nywo8kxsfo9r4ddiqz93yz30j8w27gvr1huqt22xf9prs5u2et2bhcira9rcau7icxj0199pxdvx4j8sac7j23kp1bk3o5ta4xzc2im5d6yfiq0vrx3m97jhpjc4g2axp9jdvcycigxe6yq4y8spqwk50p2yvtwd2jvyr1xlrop3997oin1btevav5qjxx4nb3ygyzninfyv7htqkmty0sy2hfrqs35cvhohwfmovfolx3ubluo410fxmpjykbv8yza3phk07xzkdgm0q74kedeos2i2i8spn6bsaesidv1n0kzhobh2r7xegdeivkqcx8vb2qs3q0v8dgqwd1x5qlowat7waawa92krw1ubwavm7j1xuvlha2t68whhu4e3aprvglva6oylwl9y97zxua8011pg84itif5i2pxsz6rtlp94qf5a8azmjd2fu32gvcdjspqgt9ewpuhyazd0ffw2uuewc16x5z1iganesat3q462vlestf2q40alhacqk3k5hn81wz2u4nsut7jcak6lhf7hcekge8ypgt6th2ewnpqjaiza8v5rsu9bzpbr7bwayh96mm2l4ulrlyazia6294oxyt4ndvo3173xssscn5urfwhi0b53vi2ss7l4xkec6rglpjzyplvtu42pct3829cssyo00p3q1jf0irdc82dqijp29ion3azl1smebdoe3avonr7kbrtq0jpvmkyi38c7cy2hnn1alktqtuvv9o2ensndoez11xbocnhv4eve31xie770ijtenpawoix4x0s01mckbcejp1w4sl9si5dvepubldbgwycy02rdwk0mzx359p0be1k48o74u0ra4hoazrxcwbd430b7now7cbjfrdceewrcb9ohzhjqxm45matvah5c72veoyu2flmb06r4jh',
                fileSchema: 'hgizqhdyyrsbrmx5scmwxsizv1q0g5l3wa31g8wmqez3rpiantszd7i8jkhxyr3oweu954lfy96egq0tydybiszwks68v3ooqsoc8vb26jz7ze6xb4sfg82cgmcy5csltwovmk5gjcqhtmiz1t0o2kdivt2pzed1dhrpq05c5usf1et6laecharb4zbb2b5j0rbpxg5jk7qvdorlnamjb495fae0i7md3nu9rfqneu1tjc9yip1srzapatxvnzgj3b3eg7i952slh478p8k5nwyomkzj1bzxpg6y80oovb76hazncbz5punudrshnmib85e3p7m5li7df0d16aryzx4m97l2kddok8k09xlbp26z8bb66m6mtzyjc79rex943obeg85ob04m1b4bybmev7c76tp7or545wcf9pwezdg99zavj71rrle38c3n46g0wbg2rxfsgxibwaawz3xmwnptiovoeqtil0y6s7uu02oiy2g0k8xvh3h5dndb2a62q4532j2k1106neqfg7tozkhx53hfgm3rf0kbydfl1l1ic6niscndlnn7u3gqd25hu8grgs6rk3m79dh3vrc0nwpgu1b706j3sd6rtl0hiq9v8aj2dwum5z1iv4bct0e4k4py2dry1lbi8vcyvv75vziv05ja23ry136ca2cv9qeife6g240zgjhohgsjujs53lf20m891y302cyuna7vc7pbco3d0pje6jmktb6000mztgbe2hte3iwobl7bqvwl0owb3c603an2q0mhzqnz5xny2c9vwgbqilos62qimvbvcjcmoghetfjj7m8k603yaf7o2vfi6yihucthpllraul6mkenh2icm8imxczr1hbprmastk5pcx5hvj3q8qey0b9hmdi8tzrd35nxnnuv0eg7l2tjjbxloxqrhtbw0t7ku98a03p4r8uq9srtk6dzd0dlftnr5dp6o9tpuua6nxr8gb636lles8jjrxfw37g9z80stm4xfzwqx54o1ivv',
                proxyHost: 'xltkxgmdeulvd8knz347uybfe9xt27cayaw27bthm2fbh8ajnnyndvq2p03y',
                proxyPort: 3080977128,
                destination: 'vpytrdtahfdg3fpycuaezw3350pcqgo17glwh3d5y71rcm3k95wcg2277m7b9b4riu5hhan8qfzi4o7k1o2ojmad9omf8k7famatfpd7y1q59nheq39z3qrsnwe9d6gbmjg0bhear8h48ths3473oewmvb8skkzz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7bb8g1x3ewd4hkmgedhsbkmhivmvjbljzp0ajeoxgla9f8v1z73tganc5gsu03aist1at9o1nx5a8qtw5upjydl2y3k1i10woay96nda9zg31yla6rmh6xbxr70ukka7wn4lpvi3n1mzh8icrh9hxjkcbv90k96d',
                responsibleUserAccountName: 'gc47hj08dxzgij3t228w',
                lastChangeUserAccount: '1dlukk8sovikvpwyxxjs',
                lastChangedAt: '2020-07-29 08:42:52',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'f4512rjsv48uzjlqktkj3ulrlx0yup14saorqc8e',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: '42mdvbphvc9x0v0d2ffmc4bdaoyt23k0f7hvrtdyxdivkr15uo',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'tkx82zpjajf1gfveo0z1',
                party: 'bvfzrgj908pdavx5lkjsf24okft209hkgvjt9jcokcg72d7f6pnfzbclauo5myyjdxxx2epo8p9wnukb436r1r9lr4dyd12onyjtz94sio9eajyza5coz6qdbhs4cobxxorsh471shu9qilf2tv8arxr4z51jhg9v',
                component: 'udsff6rcqinqc5s6r1c2uaohyg17x7c5bqqsl2ddcli22tyc9y4ldf1guhp5szbwm2sx5nmmnojp8y7oo3eglza2zxkpyt5v727u7pmeddnvcn6ze661h9tb0nfdmxca6nc2zcwabmcqjiwe4k5h200678pjpszd',
                name: 'jgtb0g0bmzjjz9n6fw553iumqi6flxrrq5o5j34stfzw8c4apt9vhm2mk7ayfgy5vt3sgdqhjyqy7c8fglubsel5wyjxrm19zeoqkmirw8sh79dvyprtapsp5z9vut0sns43tlzcyjvqjroxbwy5i8ozzlev2v8l',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'ua5r416ii0g973qn8b3uwhc02sxks1g0ubc1cattls21v7ul1gefxgyhvtvmy3q8xpdjev6hp9pjs047cr4y5kg1mewz2hltl5icc39uym8pmsltzhldtku17sarawjkpl8k4mpqqj6ir10plf1jtitp9n93qdx9',
                flowComponent: 't1tnm6uv4hf0z7yicrw6t5lhls8ehpqthbytvjt3qj8mohfsfpvy8ifkgvu7r6n3a1w3ek7dg1kukktoq8jq0005kcmufj9i8pzeg0n7rh9le5x80fbc72n350ahii0alntb44vak0vva5sgqc0gmu2lhgorjb0m',
                flowInterfaceName: 'sho0znhbg5nvt2a18zjzojfa75pu1rmfrx0ez66kwc9ryw6qvhkuoqv6ki12bkr7jxevcjvulay13j9rajkomccnfnlkeig4fzh3ir5pjdv0an706mejvw9tc1uj3tiviuv91byr298pkf3t3eog2tx9ztcdanc7',
                flowInterfaceNamespace: '6bmj75y5izrfb6mar3wx6t1t14xa2rhyggrl0jlqa75023ouxq793ybgifm8jp98g4uvq7ajad97tbyqcawiwvmdcs45etfv2zpo1e71fh6tcjeag301at3gz148mb4g1stxzbxfap4q4lvycr9fzdzeo22f3k4i',
                version: '161pux9k3sj0x5b93hfj',
                adapterType: '0ov6x6qf3q8kijck27pjwyyy8k7m8omebsf5odrh0w9lu2ot7dab0vunf63p',
                direction: 'RECEIVER',
                transportProtocol: 'q7bs8twclbzsftb741r5g5rqt4yhryacymzam66l9w7ikxbfgnjbowwvmqgg',
                messageProtocol: 'x0hli3w5n45kfexh0bdm2s09c83rdbwwy16udntk81sep8591jwmrf02h9o6',
                adapterEngineName: '9xbi94evugljplu83n5qv5t0fxi0vdj10dr8cf4ilpz6uxn7avzny1vxy56noy628jdb0lx5v849au2rm7h1meq2r3azdzwgz3e608l7ypn4w205tzephyrcplfwedez52ff7rgedxy7orl3he7rc8b2rtbpw04s',
                url: 'njkqhacrppy95hrdgni7cq3fugl6kvdrxcgw9dalrua1eoq2yy3dvk4p403ym46uv11nfskggloulp5w08dv1d2uzg3r7vetqr44c8ws2exew7uj5wfe19chk05s7u8khzjkxx1bi4pzlg3divfen38jl50kakvukd8s5ehx7p39w79byxq5fa38m8udn22iq55z7vskl21vaqyzpaogpw1pcame0kfg704x73gljjl88gj32pna7nmbmovnfyh3bxfqqk5pcn3tj2cv9g1k0ldst29xupl1jwhoeig36fzk2gr4uzearp84uy7xoe55',
                username: '5pxqog2p4xgeszdfztj6l61j8v0vqin6leubl478v9qw37digc61nomtwmxm',
                remoteHost: '60zebnqkpidfn9uvydu4hiaii64xghkpzd4mzu7wbkrj926n70qyaxtnkktmj3obvboniuqzmvn82pdeklfl1f0ntahld2lx857tmtph27hid8pgjihl4hmdh1kx3ail5cyzuckt7x6z5hbfb49ktqudrgx9ku09',
                remotePort: 7699116591,
                directory: 'gl11ojpuqxdw19tecdjuhnan4xowrq4nsew21wajl2fv6cyk6ig5l1fwvxa5mhgz2vjomwk6c5br6j58uux739m230xyy2z77ncc8s19os7peds6bfcudg6cmlzsukry8cox4462lqgjsaajk328w6as0tzkgqy2hn1pswxiwehgk4xdjlalfnuuz7pxye9m9bovmcvnk5jr1vd62dopyjv9igxszq1siladxq9h4qq1dn0vjrvxel8gxti7kvpocjmonarcagp785fmoi6l32j0q2vl2amfek3lpda5w7wkxi94e7b7640sm3xdqn2igxnt9dbis7l53xdgvv34c3j986f6vi4k40nlqw81v81fj2f661nr34s6cxi28ao2yucuefi0us8iymdphs21bg5a0l3blxnhyzzwmh3xop9w6yp8sc93krmta74tg4wc3b4lvb25yb5v1zo8ivb1cpybabzn1q0h92ngiu1ve6j8ejvy3llfdt6rozemc3zgjl85koxx1f4dnu1jgji2surlvf6x8v43f6e646g5tkfvuh178sjdug3skgdeiw5l5ciylr0dn2i8s4czf9oh6ncq88onpk7b0ejk8s4jalobc624udstq4mtsj48j19unvx8rf24djg2gf2879o80olb9aozby3b3i6wg5mtrk391d7sd7d6izji3xn3dz3sooivw4bp8z6135qegha1aj9jec4icjabhrf6uaztxej0plblsdh1fsymkk06b1qpdjelzxd7xvnzak8l31x97q118qxpo9tinyhhqpmg7ebizpgc3gv910zzwrektbi4mcp9hwahs1prrqby5oxlocwsdox5bhxmb8etv519bop9nzbp1l2t1nso7x6nmgtfcawoau30md41oswmorcdmyittrs5h0lcbyru6s06txqvd1uphzj7n8w1rsmobpmd0klonomnexc94mp5na1pd3vqv9nucw9jxob1sj67khqs4msaal87h9tmbos3axo2',
                fileSchema: '0ibqtk8mcenlrs2tcxh4zjvzdcsbqnh3shyowvfgvuw0is6f0fsftsylhx895s380w69ff1w7drzxcnmgbjuejvpvchvonk27f94qrwpsgtwep99ufez9ji25jab4xfnfphkgl8uuml9mee7kxd0etubxwbzxx7blkhp23ul1fob4l93d3fullglttntyq5kdktsgqrhfn3vyvlgazn5vjitwwcyamfk5ltb2zsntmvjwabov1mv180dhh8z5a4qtz2aityf30nlz88a2bm07icpxd3be4u3jhbh4p1e92b2w8b54z9dsulqp5zrcgfp8d8rdogmolx060d8u8refj24ofhf4rgzmep2zs87jvetq07uwryni7kdite5anw6p8v6sedo6slk4d26lsui1zuhehiq1rfaj2j044vlifgalohwy8xnw637slbrlcnj5i7f9l4hm50s8jg4f49yxo7r3kmt9mvh7zix0bjqiqexldn8t5drpm1qvevw5t7ks6krq0hyhp0uxls0t6xpu28o5jga79bhxdlzfz7snu74dqd0ov1119j1f00alv6abddjek9vugwvc8gxv44miwd0axpuv9t06ixdou2lef28j8ae0e0vt93724p03fgh81x8r98vs2hg4xsrjt93cj87wfpz33f1ylynajc6p2tq2e6zgvbyk1wupxeny64h1tz150zi2d6oiyks11bpe02u12iba53vx2j1q8jxrvx91gtuzkorbrpqmjbz1kuoh77mkcfnx8fpf5qx4ijrq1mic08zv39t1jgog7y9o16je2glwundtdgh01wxxuz206djshmrn9zo7klx8p1q71l0lz6z4tldfo0agkxjs01ev2rpiwmuagn69sqcz3q9wu07j2od3q1xvl4cx0ixl36p969lb3ila2jhrm6209cx1x7mi3p2q3fflc9f1s591y9nl1h8zollpqpywskzybmdig40ry3vddknc2nyd3l8ymvdlltmu52a9or92v5w',
                proxyHost: 'n00fgycvodmcrtn1b73s4jzjs9soipvf194genye7crnclf6hwzaa0m9j2kl',
                proxyPort: 6881297976,
                destination: 'vm90nrscr3m8ehmfhkpa2lx1gzhwjbwivj9us1tcwq6n3t2rohb09mk2nqzosan70hsdf9pps1tbiwv2thywxl4kwj17jfgt6exy7azxlkwfumq454fgqsxsfgm1ef0jce7bjx1izq8pcmculuk6hwxezzrtia9b',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1kchggixiphbcfnuxz9n6b1fby5rqwgifmrzl5b6bwimem6rcjkfxjwozphtlxtqegytpi4700r3icxg654hys8iyb241oyqr012x5eetdgbder34uzzb608s7a9vcjysqhvss62os3kpu6gj406m82t3x8prag2',
                responsibleUserAccountName: '74hkq18vwwrnnrcxrfeu',
                lastChangeUserAccount: '6qmr1pi0ju9jyysq6m6t',
                lastChangedAt: '2020-07-29 09:09:01',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'c4emy0zo6rygw7bw8hlr39vmiboeobw0853gr94o',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'ku56rh0li2pa7a7pgwrmughidkkdh097jinhf0wz5kqrxtis3i',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'j3q8th9c8t7pdefagr51',
                party: 'f3gfgbbythek53z2rfrs0z2edzul3e6mancaryk14fopatam5rhjgeds0g2ufukyt9o76wt7if51gabic6pguaf9o62poytyyfr0pgw7rkk7zy2ifk7axt89hq34cp5f1w45jlxq86nrashw1uetldpsw5bq9a1l',
                component: 'tbjwwmq5p3mtfqnqanljfh7r3bmg1xsps56q3fi05m1czybk3lwfcnvjvvwwf2om646rreyhamhgskab9z7uiza3yva00xma1tc70u64xx44ira4k7cbain24fsqaz7tv8w171ye0hj7azq8pf5n02h0d0qgdyja5',
                name: 'rxr9kgvppy5o3zl1gucrejo2d695c3l523wbfm3tqztf4vppry9b26yfesixljwkz789uxyr53syoxm5z0a9c0tcoxstxpg6xhuidbytmya7o6lvgqzwgc3vf3a7mjbaf3idii0irz1h8vwtsteruk5jea3uzs9x',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '8rao9x9m6ny63fk6j1nl8ppkalmt42nkml5hvyr27ip0zzx5v0gihplbdy52ki5p72p4utr2v9ciipdnuwghv6q2ke3gbijqrpxu51k602lhuvd6vc5q4a040554ac2az8rph0n3kbi3pvy5uydwre5qc05bbnfv',
                flowComponent: 'uaa4vzrrhu3vixa7s4k9pb4rqp0z7yy7q1gkudgap70cxov2yshcmnj2esdhwptp7dhwo9jwx8gfd96sp3v91mcdyyb7kx46hcgy3fcmdrsp7b6jim7v2cavo9f28kgf3awj5r9vn8c1f3wpyiae0j4de6fsh0a6',
                flowInterfaceName: '66qkv5uhyh9rn31560e864yrnusjnyvjxyveexctossmf8jy77qx3j9ncq9s3c56e62g9a6rjn49tvfasmyqzquimd1d51kdsgo6puxwcexlg2lqpabbyqygbgqbcbkf7hjxe55koklunmqfh9cwkedfw5o0c23a',
                flowInterfaceNamespace: '6kmlukm2t3sdqcuns4xmihrfla677swxio2ph78g9rjld6sk32twhqcczxzcr9omr680xo4en3154zeg0w0ghzakap0kzmsmjw5itopeyxb46i51yhambo0einpq8uzx1qwbggdzogufqgzrz5tib24a80d5wijw',
                version: 'ksnizpc8cjkazibjtbpj',
                adapterType: '0afjh62bmzv0g34175f9sr270f5p3getsvoiivayonsv9jca8npnjfawm1xk',
                direction: 'SENDER',
                transportProtocol: '2t87xezw48hxr074tszqe7qoj13rfvdc0c8yn5bie3w8fcf6j6g2tkhffyrz',
                messageProtocol: 'k01270rwkslqg62pihwe6g1ncgskmxvv1pypx5fbglgye2zt4mw54f26tee0',
                adapterEngineName: '1l9w54herbjr6kp26ywh2z11tvma681d01fprv4kceloe9o9r8m6rg1ivfa2usrm8imd6kr3op8od4ejgfpywh5r5fwbc2bmhwt5y6wgp55lnd8ppqbn4pkvykj0mth3z5lbzfl2a1f0yem2m6eeo6o72gb0s8sg',
                url: 'drd2ybmnfpg0tatqoibqt7cpwa5w56gh7wgibuyifa9hzpspxllt32vfkuxffbahnico38a9x23wmvxi638ix211v9zdlb0mxmftvklzydwl495wbhcv0hd7buzmfdzxeq793913weho3g6wmp3ijrmh1zoflk2e928y0tdul8tz1bn116s5fla19oyfq86jmtmvteqrawjw3n0a299hdyrfob2dwl9hspxugj2gwgwuhshoci6o4qbono9qtiegmw6oa30b3ifbxgbebtvg1uibeim77pxl9cavleokgay0yij75j5q5j0tijzoic5p',
                username: 'su1nn9coajpppr6njnegurssz5vttlngey89zi7sd4k64ds7vdvhoxxljnc3',
                remoteHost: 'ap4t625cxgh9lx0j6u64lhzs2si18700fv6wh7kb3igtkdszeryok5exv131j6ialbva7zriu421sh8oxeuol5j5nqaxrojk1ic30kehg9c408qqedulg3ryxylr0v1tj1qol3u9drq5qdtky5sfh6cb8mpx35hk',
                remotePort: 3364267723,
                directory: 'xffpjtp77pcyx7jrjqdpu2owv9juqcai7wflo3hdeyt61tdahl3p399t1thxhkw6t208m8dblhd3rtb3en9ayd3xhsi4id00grov3gr4c7y6vx29h39bys4v6loc6xkjyujld3nng0feztgyro5gfgnpjz60s89vrw9ab9n980intovuy821lg2jxhsxx6o4nzy1ojn92r3563qxl7ntxkhovvc8whc211cdcueu8mvsjcxurtw7stwpxigsj65hv779uizxpldikflag8wezkz69i4wfigvgozxq2mf1nlbmj2llovxb0x4xyfdi8lbyy8z4uooq0djlegvyovb10txu78o86tq3yj15egwlfiwk5jrrkof0fstgqqpj0mh8dz6iarznftg9oa20nfsrrt9lxtwwl6g7qkevpgwom26so2rfcr136liwmqqy4fyek6yak0h7dwg7xm7cjg7y5t5e3as7ps64jqm8b7a49ax8ow8w5ql1grkax77wxczg6p125u7lfjb1rqe1gvso0wehmkh4w4mj3mu7go3a7zgx5bht3ra8vwxbh099seeyex9nvvzo1dus8jg7yuwireufo65e5s0z40wyin0djf85vos8gcki7r83o9tifxbck4j6zgop0jr5rta82gf2q6gm23nh7yrksi75oc94avbwpste0vmm2ycttl3vcwjj3r2kzl9hx1trcwtg1hfmnjsvnig0yanaimspzvpcbyhmdz20z92tjfjtssq73olxxhy7d2qtadqq5bplvujvx43t0hv8ulzvlc9pvy9bzcbpxhwfgachp6lki35zn3vfgz33rgu5htcfiuimui64lx7q5j480ff8dj7bncdi124zledem6zr9febw2dacdp25t1bkkw93a7o7e2494hwb0r42s43mu0wzwofp04mwfqc7q3t6x7quly5xj8y9nrkw3ajsq7asx8ffim0s9n0acosf3lkmvxxgs2mbojwogfrwha10p13acqgk8355k6',
                fileSchema: 'b85yq2iu4i3n93i00pczan8okbs7v7fjgn9ancaai7y2fssv7698fcw1uamiwogpjuipehfwcr85avox34jnh6ufqml9qpacupm6btflyftf8u88b10uek2d0m4euxoilsgk3pfmns5hpe964ner4f41ld54hddi3l8ipg91fh21q9udn2kckp6hczag3oi7z1qahyu3wnn9bzxos5b96kl0e83aiyxmcjtgjf0lr1md8iz7b86b89unm10kqb5xqk14oc1mbsaojclus2ooh9qxek43k0rm38nsn286bcdadzllrxyside3lnfvsjrnjkw64c0awdfr7vtmzfycukl1a19v8f6dpuba7kywi0bcng0zqpyz6em5guk3qyn145ff2clq7n8ivzohg0aubcdzm4rl3f13jnfcjx7wixecsax0lrl8orycbdgog3rhu46zzyv1rd0naqp3bnbyo07u8kkcmaephskj914ea66rwrji479xmhczq5je10yf68xksah0i4otzi9a0fxzouxtu5u64mc4uwnac93dltmk369acej8nq7mdoxg3rolg32k4c1ipopplysouq34xir9mb405dqqwpn90z9d6byrf1ykrfr6hc19wvbwy91gl1e9b6bw1zabtjxgpz9xj696i6d7a3v378yn1d7v2e7x7nwivbd2jijk3becx47rtgsje2sz8qiazse1wdfmge2partww7w813w61giwn5dgj06n9iokh2njoenkw3bagbn74drejn30eej5aenbaohpx4ab8ora85t4deg7otal2dbkwd7etd52swd1gz7qhtoofvq5evoxl443531uste443qnshwimylufcu239rtlamigbgqmq37nomwc5079exn4h80azs4uobtd4q19y5getncj7v7abpawnje64ozsmu0iq8l9gd22oj53eoakbzasgr19h38mr8wshqbmtac6eaok43uqruljp54tln4vjdki7jwbw9esoq1sin2',
                proxyHost: '09uwu8gd5f1g4uzlhr5y3aitq6skk0wvwa7jwgrl8legffhebtetib7e379n',
                proxyPort: 3341808112,
                destination: 'ej04fq97bvgoggdn4lqmzn1j8ajwoko5t6gj1sf21ki9iaap1mz4ljyho9h9w5h0xdlxjydty4o1ocdhroqt5pk6o5fqhkwhvcg9d5hhyf2gtx7qztr8614nhqwip4ok25cj9tn9t1ln44twhq56a3dy3br2wrd4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '14yzqtbybinpfqxh8qte8041ccoynbqt06cdgkfhjnxvb3qorklyv57bg99x16wp5qvreinfolwzs1yv9s5wkw02vd0lkjvwztr1w5w1ohg78vkoq4tr9dhykmlxcu8c8ai4jue5pqcuza4tpbjf98lt2wukkrf8',
                responsibleUserAccountName: 'zu17by855wa0siuhbt8b',
                lastChangeUserAccount: 'f0hqc6lqn3g64z6xs762',
                lastChangedAt: '2020-07-29 08:36:26',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'y9h6louqm5z6tc4w147qofxadv28pgi6mfzeke9q',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'n9gfl7ufyonjt7opov1ladds7equej1qc7xhjqnr2k4qmjf2zo',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'vzwz5jb048lq0witcduf',
                party: '2qvz4l2qyozp0744ekm1hxaafxjlmo8cmtv50743qmgws2ktwry5e3j5i6kabgeubfdq93tl3q5ij55yuyg335x7op8f0rzk9kq8du3kuly8un8b1yvd59x4ia2u1278er5u6lgyyi9ngcjit140zf59rurdz8sp',
                component: 'qvfgwpv55z5o2p25hz28d63hak7sjlg3g7za2lh4vmtojofjew2lna9v05kvu2usx4yzisewj2rgcvm2gxqcdhybi43y6al2fl63r3134r4zi6at4loduqy5rl1t84wf2q1xi9ijxikgxcxleukk666aq0x80f7w',
                name: 'q4neaht3zd13h0kpb3d8jh440evseygm87peqrs6ut3pq9vz7p9rxkfge449017kbgivkzhswfletr6jfq89lmcs682dmsiwwukjujg7smsvawtqoyeao381qy305cgukyqh30djppofb7l7fbzssxm646pf03nsg',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'hhfef3kcxfp5fw5xikwat72who22fly0h7wp2k8okbrf2bafuyxiffg0j07da79m8ycor7r1fkputloxrctg8tfv2elvsx8u4fqe79w1kyatxl904nykk5i3s7fcreqynzlfpz0pxart4s8lgebr4chvyy4j4a86',
                flowComponent: '4oxefqvs9ctoy1qsh0jd8pp8uz6nxrx95memqfr02c4lsxcprqwark1fnkugds9tc6f7bdgwpkpyejob85c353ff59hpd7g6qb81x0kc7w1vw7yjfz7bat87pjowfiu2keu1w2b86ynii0av9mlpj4cjvrx5iyfh',
                flowInterfaceName: '66q8ourlybky7mnvkqlhqzq3m99fabn4tx5djvujg1uafoso96s6ja0mvzyivz605f2czckpiuq2i2ig1krlcqbo26rq4gv5lorte7ad8whdlrmp8vc4rsjyuod7s0se276gwbx70y6mp06uexuz5fm8l9a8d971',
                flowInterfaceNamespace: 'y47cd26dvak96iq20unxr1arj6ecqo1g4x6h2528ac3tuahrjqfif4i5n7dioqsyen80evrr56ker10044kd89oddn17b8ifdp6u2ad7u9qsyazffhyk4f6digfu0149i9mgaqu613zisv4wgmxznou1zrtrdxbr',
                version: 'hwue71nh8m5q9ks5gl2n',
                adapterType: 'e9kr3m6gswbjbpgd9lgaku87qn9jlsa21vw82yfh2vabqnfizpopugwylo2h',
                direction: 'RECEIVER',
                transportProtocol: '7xh795eyal7j9jstjk7grisrc1s60fj0tv96vvh7rz2wr64ygvnlusmcy4uk',
                messageProtocol: '9xm40be8pfxtwm6ysmr10wgeg4dcvoii2kjhm6gwzlfwqattl2xgxnrwcenr',
                adapterEngineName: 'mr9v4dajbs7nf0eq16of8xyn57jqxgkzdg1czxe7qvyiej7z158tgkqbo546z5abm0j59q4g7zigrrr1q4vuvibf6uq1u5c0po7ohdx3eixl09k8rudvbpmr21c6ybuzgnyl0fkfsfdze82qiu27okn0i8mpa19i',
                url: 'znq1oiz6mxk55trhjujgmduivnh3900bdado86egs1u5g7mzej8ekb0986xi2q2drnk09xfrmb8dki2hmf624id1ca0wii08xrqc5axjlwaakwcseq824s5z20khwtshcavpcvkj1alxyhx32wxof37q995ueqm7slm86ai0zijy6nlsjdmxj7osqq2bb87064pakx2vqemxmcpm86dh8lg5xuwcl4bponmbbqge9ucyj6kw3za4qfuag4pxwidjp9lqtsw01rgi8h04nsnxnuf253d0ff969kjbid2tpz6dyre8jyowjk7adxz9vcij',
                username: 'xgvra3wwz1gmflp0673f5jv374rx5rkqhlnocmd2ckb5giydf1o1vq6kz8sd',
                remoteHost: '1g7utcfiijtlyjwgjet8emn47jinitj187p189y65oby1vhb9ocqqt96gj6tk1eikd1fq82joxu2a66lk72lnzu5x6mdn1l25gtc0d7clhqhf1jmvcpfdikbaan38hb4qeqpyz380x09c4uazhcz67yo631y41mn',
                remotePort: 5655123965,
                directory: 'ncq5urfysgvc627kktw69ff1wmjpz0dajdihbnhnz3h0qocsrznvbi6bpsu9g2hjfwe5mrix3fqhug5zb5zzifs9uuszjyj51ycf66zcq5iqnjlefwhtqqh76zgcc4yz2dpqziyq06rre85dbe54vkq98yz0n4pbk0d6zurt4l4vbeudppmomr9l7xe71r0p9j62n37z0x9zslj8k6w7fr1ks125a9sg01zavwqhgbqvppfpqqpygl0c8dcgxkyk10ysrfpqxe2xfddc3djglaap34cqlxrghhdumxpu7sziich94j0zi5gkit9mwscnrnm85qri2cerqjbtlw2n2ygsziywnspx5t0wouabx45jbrdjxqa6b217llw4x2j82p00hdzth6rwryrupwsd0yqli4yg7ginwqb1znjctw4rlzlh01edl7pxeibb8bgp54fbdcdszlvjpeae7axylustkq5cr25rnvqa406aez3d2jol86e8ucw29kn81kb81gv17ut30xvam10c1bed5fuelr0qz85ca7y21qavp4m405ad89amx2ha6bxcrvar3e0yjhtoajud6j5b69rc2bh9n59fr82k8pio0ucz1fm24nmxufw2wmkxrk2gm65gm02qekwiixq78nlqi2915sspduplkqp0mhghymct95o3cdye82u0lt4n8nokupthkk7ezbrg33izsgsshud7qmrjkyfiaiiuu6nccilqg3yqngb5tbfd2uhmj0xhghvcjn1nmgmoxgqgd4i4jukq3f8fx6egl89k3ufriy17nth31af0bv52sqsjyat6ovabnrwf6bv8gipmukhvfldw97f8wozx05kx2eb81eum85eatt31r2lu6iowfjcmbi0j6oac79aog11ym9n6q6l5dznhkzg4dhlqz9iotqcxq76jmv5c9p1yq8dnz2s7m8aeezw6f6weqiailuv542l75pqsjrdn69xezvu3yxai0zbxchm25dz1ayx85wai418v',
                fileSchema: 's1wr0omgbvybmlfhuhnqj4c7ox625u3or79pikktgm3aluroy4n1h81f4elt9hqwlr3528utr66ggc62x1ex0hgasrl2lh38szo5i04i40imh65ahf5z21ebor22mboqd71g76bhadwyvx0kplaz1rsp3touie6hr68fp2xopoegqwq9u6l84ieib3yl3026em66n7hiewxqscv4hmd8wsdo97wdml2685jg26jupprb5xc1xqqfj487nnh27xew6ysophkno2xzjv1a3wuiucvebnh9jkxvwqhrx9tncd7disie51n067mbn4mwfnd2czdf1sisl7nahh09ozcu677caerxa2e3i9ecawbn14hg2cr97kc9kpsgmti1m1cjyw10fp9jx0jkcyo34uwx9gs5ezzx0wsieyicluzvisjf6a8jb3c2nrop6itxb43la1qzqbft0nogxma468121ml41n0gy7g3z7e43xpvxmkwdmumcm8rw7qnsy5k1efa6f9npc59wou26ii3uxmzo2orb2wpcyg8ckmiuea3h31qblv4dx33j2i67by2lvfk7kckcic31zdl516gz32cubf6uieyw5ij6ivhxdiywoab0h9ciedq9ot2bkv6r8kvs2pd2du9ejmnnv2bosith4b2vk4uf6wbvxrg06ey0jyv30y5gscgfvzlr3uqutwjkg4c827vnn3kp90k9g7czpm1sticm3ud8aaib2dnurp6ylglfr5l6lbq1zad3pa9pgm86eaaghjbs2pwjdfm44tt7y4imj7wp9ralwt8o29nx2hvh71ikjt8rghye16htiofpkdsvx25pyw6vgjhb4dza3ricfo9d7dozdui9l7p2ruezev83rxpf02zod8d81huaf8oprtlkz47m1adbj0jbvg0dp4fzmsm2dcg2sluez62c0r6kzg7outmbfqlyviz4vh602tyfeykid3n6mf5sn27d9nczl6jawe4evcw65le1v19isql4a32a7ln',
                proxyHost: 'vy9wim5qv7odnp9wv5pz08amnplvt6hdbwuhq1myhc8b45equ85lz8smj58n',
                proxyPort: 2229535102,
                destination: 'tbht0jbjuzd36k264jomzttqqbioaxd10frjrnsu6qdyxvqglutzze8s4pqh4svrz0jmoppj849yarajfxvviodtm9znj1vy3jlwsg161cwc8eppj5sykpd40zdnvestb8dyvwy6aax2t4besqm4oiizgkzrqdac',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'thmgeate0bjhvip1pogwqgbtba0v5pgqsbujbk8p0mr0wbc7kznwvkj4cv0kq52vracbe3abeoa0gw7rx6hg2cyx0pjhx1lk3czru98h2tq0j362zy7cclok4igrdyzvb30nvdkv3bcb6a0xr0qadpk1kpdbt9gz',
                responsibleUserAccountName: 'dgl6rtm48bsfi8zh36wv',
                lastChangeUserAccount: '049kkky913afxzp5gqsu',
                lastChangedAt: '2020-07-29 13:06:16',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '22vypxq9yponovzokwvotkn4859ryc3p9hcpcq0s',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'cdmg61apc88cswuttk8bg5qu8p5wonf12qt4c21oz81hkzh84u',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'qqnn2xl9hazkx965t9t2',
                party: '8igm8vl2f1lxu1j6m7e5z76d0tsu3k9pgptc3m01yhqyx5d98rtxzzfvb0yef4qng3bmd6392wpq4cqg8mvq3ourxqdv8g6vvny38ssavj0k0pz2bavimu01dup9euwp7kfd88qigflnswrv18m2tlyeehsmhek6',
                component: '46aq1s4zbirqz97huc4s0a0dntlq0ek0jclbtv43u35qt3gw3bgtqlrbv63zzq24gfhigqiiltozvjctrk7oe1qf9x1wngnal6l06jrwy7txo8tpph37ylf9uajopfkt914pi7rro3uef00ilh7cy95hughxzsol',
                name: 'g49ae7ai633k0tinfc0y1qnucv5awdio76nwnolua8wbbpq86ome0pshy51oy72z9edv1ddh778aghzl8eq094d1fj35ferby20qh2z3hqyz1bsr4p40xo5m9frr4ys7kih8xij9mhi8cax1v3fmhg9rinux7ary',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '6furse7u8ybq9gb715fs60lc2vc87rqvn93futyu8k896qckrq00038lg0668gdt7gztg9qsklkt17jf9vjxq792d8a4w5rbj50fpf4p1d1mrtzpf18dtsp939in3r5n26gvocb8emy19w2efknap2wj81go120dd',
                flowComponent: 'abzxu9ba6pqzhenmznlsz34ilnft3v9tszy2roa47o3dn243kprust2cm0evdspoxwbnmimc6j3xp8cmn7uz4ju4x6lxgrj6yyx5tx8mcqwon8p3hay4ka1hk997c62ihz5kpo9nge1633tbvtcmxencf6w28zay',
                flowInterfaceName: 'pfb9wyhy5oi4rl9xjadx6wam1p2874tj8vfyk5quklrnx9b4a9tqqkg3hsvs2r5w4e3eu8khgsqy1ynauirzcihfwecgfy5e7bp9nhojp3qz5asfvhbhd0pksqxlap7kkipjl6lqjddceb67uh7xec7yxbmuv6nv',
                flowInterfaceNamespace: 'b027wttszdg9p5fl2wu204e452if7fjesgxp4h0p36kd93uq2eslvx7ey1tnermpz8nfa7u59gt5o7uq8y5q33a7l5o3fhi9i5ibth4ocupex8h0baosawa7mj7pvqhfkw4hogutesbcle9n5tbc54w7xivty36s',
                version: 'th03kh4r42wso70jamzs',
                adapterType: '4fm2g40hlaivk7fua8yrpdupjtmrigje7yb5sl3s4f4s4qt82ptika2m3tv4',
                direction: 'SENDER',
                transportProtocol: 'pt015i5gf4dms80rdodu7cwevozazx01bqvs4un17jbevqc1x53bsv00f1u5',
                messageProtocol: 'k1b8d607jbvkqd52ss8dz527vj9w8ocik5tsaqvd1e031qsbey3v3913swtu',
                adapterEngineName: '2b57fkcfbzvf2v3eidpt4u3gdzqdfa4e39dwmle61ikmhp5j8izvwhn9sgeupoz6bd1q6et77w9vxbkw2r6fqu2arbngksq6d0n4ko611w2iwa0u84ni5mb2jsyq8qi9wmwy7xgha69522qnj1yy1787d0gbrm1i',
                url: 'np1q3ewdxibczqh7n0ygozur841turgzc0eeruzzi4mvemi849fyevec66q8ay9i9ji67tazjbfb2y30b3f0haxh3968v720o2xmlzymynjjac6cxsufgs5rpsl9igud808ytequlb50of86aghiydjf5wbk9mw49ism2946fc9vx6pzq65hri84boog76xju8rsa75qi0wxwku26etfpp587q93ygl4ntnhi2il5ruftywljb5w9ffszk6kvr4htiuvfnp2o14qzat0s0t4kuukge5rx9i2to1rl39533l59xveksflgqfe55gxxc60',
                username: 'fxs2co87u5fdi7ipb6vbkhrhkij1mrlykinjz6l0l13luq9mn945172cxa21',
                remoteHost: 'og80kfo0nyk1w1ay56kimefeyopaok01j917a3qqjrtoamki10dg7x1rhibn2dvltq15pby6uxz7uah2t23v8qlxz383ij6pmgtg57sdse5u8n97cbft7cu67eqepykgxfxtbkhyxyg1g08vsvgd7x1y60s549aa',
                remotePort: 4287963185,
                directory: 'ln4po1ws6wmve7u1o3rjo9grrj57iy6fisidrfivm0j5lrv1qtlbjd47a68qll002lvmnnmlskpnn442cklf54love8nomgt4h2r9uv979j83g1ropykxw7gno3rv0xfmy4t5p8lh1yi2ok4ai1514o8sst1m20q27kpty2kp63bw91n45u7uhkg2dc92xcjqwutmui99zm6pd6ri8ic9lt629k5bbrrwrhmu7b2by9tpbe1zi5fo9exl0xcgcwwig9wuciwprl6odnsfpx5jf1v0t398jt5d1nwaiqa2catr2dk1sm50wwxguhtpf8vqhoo4yf40q6qtsjvu58q39p3khgabewoh3cejivfqc9zc7aolfvi4xv8qpgufql85jzqhu320p53dsr19bbcdss7guw8d8qt5eeg35b0ed3ec0b5qud7rkz2a5su2y8nnrteavd2v6prvx0tnt6zx1g6m2yeqq6gvrofn6im32domst7sxzosn8x4thwp5hx3xf3x0vappkx37xyj2as1fjnj7ijt28ahdt8gzry6fw7mra9sq54nq6urlnygqlsd1rlk48xsbmjsez9okf9qzlkvg6n2x02stql00e8947zrtaswzgrab51rlbql6apgl68cuk3r4cfxpkkwsbwru5ul8mgfy9qk57dkl46723agccqzjs7g3znxv4ictx6nm6ylbcvuha2rifaj6gpyl7dm728hlo5nmbqh6349z14j1ndgdcqeggvzaaf50y3q685uvhxf1iz4z5sfzf6c6ri4ddb97pnb4e4pyg977lyqe00jz3fxpz4xr88vylnxocckoeaiwq6b9mcce3m9pwtelpwn2yh04c1iik8oj4pj1hzftyhlncrfvgoeworwzv6r8eg33zl73q0578hpphlcf4y2yf4u272yv96jow970yqgvimvcuplric0xgiv34pz27hiswed4zesp5btbao548hrpp81f3kpnzbb768qslmsnh7yzov6uyoc05c',
                fileSchema: 'nbx4agx2vow1rnnielti047qo9jd0nihcfoldl0t04r2n4accekc8kqljhlq6j5xf9nw3eb9t65nwhseaf3vv911ahwxf5red9bv74yd0n7eyg1i7lwvo2gphf4oeb0km73sfzbath2i5l7dp41rp4mitv20tkzq5i6bohn3l39ytxx5xg4c7zq0dagkyz5ye30di54iww32tvnyfvbqiuaxffzh8lwgmtdmmqx389367j64dw2afhk3wz34rpevfviwc8k74kn368o8qxqcpnuhcsgokvjjziv61v47yc6mheb3xd2ga5l92ob46f9sqtdqc08xc1qrbh65sfcbzorw48fm4im9dmhcncssejvbd5oyozaprz3yv6lil969bepam26nb3ep6zi2wrqm2v0jz32xblk1f2ni3amjrr329cqjsqvruvo2x9g4mzw6j7qgplsf4wdjbq62jkbbtqjpv998izx2gkrjd11qqvqgul0xyvcnnvn5v99gpv8v7loz3kixgeblk14pil7jkbwykpa3eybgo8ld44ah5vz1tjt1dholvosc51mggx3kvxb2k4bd9i4d5g329ynb6jwy6cly7uzbh9s45xdjvt451ripyblxiy7mkdtya90bqhmiwy338410uddoix791po07jl0ikcnnhn2ueq2124w33w2zhzv2i9gly235bxu978en1pjmi4dsz1qop5b7wp75mvck0yyf4wyrpf7pkqi17a2djh9so36qae3y3354svcxleip5hwnv2dk8lus9ra77meqvlokuwbemzuu4kq62be4lghvzpsfjt8z92quyplx9o55z5ckek2bg8jjpht1oq7ioa8ttvj79zjmaifn9jvr3tu7lxx2uwawvappjykjsl7gobhihlvx3lqk5yar4vztygbabho5b19yfh9nrqyt9k3f0i9dzf9khjm3sjat94hfbb3r9a5f73ett8t363c69d4keu5dobf5pjxmv2o5ttpwap4dhtz6j03',
                proxyHost: 'cnxmbkfn6o817pwuo94cafnd8dxxivf1ljrd1zg4yknmvpwtpirvpzz86lw6',
                proxyPort: 4081428497,
                destination: '9nmynfs861w85p7wlrdoncopqica3aqfyyyykwft5xw7c0nnvnjc5hwdeo6qqgziyfnlthfq0xsf5r0r6y0xdrk0zgjnl28j38lojos600t12cc902lch0qden9vzufizxwsa12ck2nip50ai2ylgxz99hntq0g7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yaqmj888gwpt1sopp5bxivjoifeismdz89cdsmhiazf8x784b3r9selkezevxzdr4x3s6vq9nyt6d2bn4xguf724kuov3oz7604l8z1os33sothhsoiz4x4re26cv6ajoxh1k6i8fedzzlpu4wz1h201h554ic36',
                responsibleUserAccountName: 'lrvqhqoa6bm1uhb20wpr',
                lastChangeUserAccount: 'znyqo15r52u9tarm25kt',
                lastChangedAt: '2020-07-29 09:34:42',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'r25o3nh4kg4llxfx10fnd0ubouxqka7j14vko1vd',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'bjx9ccyl4aafw52ktf6nmgvze9kroo15sd6479b4drc2xdy0do',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '2sppkxv1cb1uzdtwji6g',
                party: 'a6zko4lqp0g5juy7covsl26wfvdlvutg0hbuszsp7yb88zbg1k3xkhxeij051rmgsc91tl8bh9q0rlp1sh1kiqeiyiquhs5i4f7ds9v0xq6u6h19u0ekiwj30jz90puiyypyxkglqmjt0zopaoklc6du0s27ra9p',
                component: 'the952h08bkpgiy8mybvtbz649z9jqck3ko9mtb2nwifkbqoxcywvmmcgqsgno9jgiyf7pwdjwqlijnjtyvvvk3dnqfcrxkplu25olj5sv8p3z1yybhx5p2rtiri4d9wklqx37g062ighwmd83kl3jw5tq4q5sr9',
                name: 'ejpxtqyl4982x4n2x51721donsx7u824fag3anjzvgdvioxj3g4evgiuhlxnxhao2n4o00a38qjiba5t9v2df8jq92wxp5ywu4l6y81pxdkxf8jow7fhyu36e19mxhmn903zjhfylgxdqcmq8gx0fyffnax8l5o3',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'suaf8zjtvbvnm3rtnp5updc19wip3bzqlubmhb1lygmydkqvwrj0vzunfzj06g16m4q76ggp5ag6929ib464f9p4hiaarbc2puy90cwzgpnir3walzpkbc3qsak53ggskf2cxcwxg0dhkfrov8pfghd2linoy5iv',
                flowComponent: 'klo6z70wk12l9oopwdf5178ko7p43bnewoexa52in4x6wzjq5q15a1ms5r1s6spqqybb8bx5tnxa8evro5f2hbeijrxpdtigmek8qlv759wcnjwqn3ghaok2aswo50eu4adqoklpq1nw5mkhn6p0frvn2fvox9kcj',
                flowInterfaceName: '7njcenug7za5bkba6j6asku163f2g95021rxtocd1dftip83r3xn1qa0lphv6xdqqux4yoq38kxybw8hatsozxcwrqh1k0rzzaeyxx9jrtdrs5k00e6h2pb1t8xok68xcoz76twf1h8r7kj71vl20elf1v4weq8m',
                flowInterfaceNamespace: '4s0ytz1sfeenq2bqm2ob3ybbijbf1nvdmwmlnu8k9s536pn20ua0s3l6aq1pmra4aai1g1velxbvt1z8jasqhwj55jng14s48yjyqohvtxarq0kxul813j8o9r6e1tb1v2p5u00qmw50kn5lgemt9y1cupaoc2br',
                version: '4ulwdjf7gm0pj01om0zm',
                adapterType: 'c4izi3ntezuxbeun3tek8q5cqplfe7m2hksicnxr9jh7xi1f2vxd1mmwt9hf',
                direction: 'SENDER',
                transportProtocol: 'l9l599hhatescubsqty99o7nytu8g2eb1qjky1scn66uo6fjfvn6cxq1k5yp',
                messageProtocol: 'i4ukxwqqpeg7wov525yghq6ihaf9l8ofqtpook05hfhhnibtl2tfs1ba7hj5',
                adapterEngineName: '76c8330ahlk30fyxpfodsuoszk7ocnjp7lxv7uxfnegw505uef7oa1ik7iyawypvwltx58k57aammbpb961ktd90st8k4wovds63ao3mwquwu88bbsfkvmxwem8t3c362pmswhb2ria8eaao52k4k08p9w4uhj2i',
                url: 'l87nk451b4zimlputu0hh4tdz8q24nft0vnr3lw5sf8z8q89kamlaszxlzibwuhxdkydmilctkctss41pol5izs2ie0oln5yvgq978z2yi8mo32ngl060ktdwo9cym5j2s4ty5la19vezbbboz6w9avezynnpo1rzoapk3fihq4dwtf5dwo5nxp6slz3ahm2he15v96ysc1solfapzrma26r3jj8kr7ws3kk9comwcjmoymgmb8cisuy3qjoqxlpzs4k0fz5162qrn4hqe1yc28sc6rseopi0p45avu3ftioa2zqq1bphuriiarw4dd1',
                username: 'oea14oga5pzr8pkjsgf7vd29xsqn8qglievx2f2hqb0ckvqvkqla8xxsivrf',
                remoteHost: 'jxs2fr3zf105qyug0lc9n25ptib284mu1djoukz99gbl5gpuuajt6iwrzbcycd9vhyreftqw3jvjyjdj1a4xndrxusoyginz10d3yztupmix3nm13cx4dgu4g0upiu67kd5ropvddxf15o8qpomlar4yvvsm74of',
                remotePort: 1842136252,
                directory: 'guma1y676gac8htzmxwne9rgr15gubenzlu8bby0j2q4zv7bpme6kj6mxahlwu2783ad2tbrlgb5knqr8zzvnj7jhr1ro3qy9viz18d4fus1vmptqt7p1x9uitlmoospba1jtxlwgpn7h300kaqs6lntml5sjxouh03hp06wkenw2nms2wpam5kpyobp3ylakntxbwcal4exq94urwwhv159hompf6ady2xbx75dv5afz5okbvllsxwp6m8q8oon2nikcp6o5hwv5zkvyi83ktx1kbp9leyxv497m66r5mf2a6lsgsxarq3xgqimmvkxvqobo724msuiybxy23i70hg3jcezvzbba5f6n7ay08zr0fklfdcym1sasesuas1e5m3wgsolr4sos4wryvyx8i89tjp0raq57pdpjth6zn7q5hk7l9abl4cnuukfnvcsogjpo1gnylyzs598iyn997wefrme3gr8mlsen93ym3bf6uwk1qekfull3upun6vja9hbh1rn3wlh1l41lxpj499uc4l90bviyrom0t0wk42bf355ub3vsa07quri9e619vec2ns42psogtte0e2fjd0jn7jozooizlwn8z9hziadn9ik60e0nvlyk7t61bkzuaddei8l1aoc0wsfvivhn5kprs6wnjotk9sixz09ntb72p0vmlw1z75y0kddoenfpslur6kxr3qq9bvnl1evyjhtj36sb9z0hs4pan3a97kpfobuxbhbps8hb0dqzjvj3vvg2ycfxmpqj6aj0jss1ef8dato7vee1zy7cgy4sw0cjfvhgdxg9jccrxgksmao27ytcl6fsszukc9o5mxx28mriame0ismmh98byl9gz54ue2lulpgvhn901mkmrg9cegvclx5u4js6nxtj2l4ejqnw0lfj88kzccdv00wp59qb8j9nj0lfkqbtjlgrenkkfdqrvpqzoybfeng41l3p94heez4zs2he288zq3dpnd2w5xkbmbvyl76whyszanp',
                fileSchema: '97w3402j4ldc4i6gbwg8jy6csmapyhj2cwa2ozoc3flr118kknpptoil4ig66m61pdse9z4ag67tpxh67ui9psvubtllum2jd3722is0ankbecpuxdicyvmaexf4k2ciholw8jhq22cfjwvkqsozn26hh0kjwqjsylk8tfuwpxccekavw2kx6w9ig86ghnmfyqmcp70oo1yx5xdqhe7xfcvrhzyp5nev3u96qnqx9yf6snycaw46bg93y7yijv0w3njp1b71htda82w4g0zu80jb3qaqm14mzf22c3jl75gd59wcdunof1nctoc3v3mwqn6gk3ql3bku89ukjs8sqro3v54h0tbl8jrqrrfuhmdu050urwgdaubcn8uwchryywvivuujb0zsvgq9h5hfstp74apis1z1u68o9umiwrj6oda1h829o0olifyrt4piummzp374r2qh809mn2jkl3p53tavg58lk6ascuw8qkpzyp7p1d6970eh5ldn69syd51b32gjp28vcoxlyyyyy2rney7brqbk7qdeat7pki53m3m6din0xrylz5gokgmllhcodo0njv3estptfsxvhswkzhdqhhc4ckjs1dwmyxnr1m4gyrm9slnu6jdqhzeek56ok4zau8mliabx29tdyohvdr3ojuv8ui6gmd965nhqy90dzmeqgwcvc3sm1wo8i64r80wuinnk6q9vivffru3o57d2qknbaxptheqe0ge21fzl6hiytb8w2p1v6day6sgd3j3rlj5wb1x296qngldz9q2nugxn1gtvczni7j935tdrivwh8000u682iungtlqe9ikzfsbbtwq9ug2fdfwlecuzj8fp2qwikdk7njfenfssgcvdv3c18qjraaplgdm9tteamld5mkz7b3ft3st551nq0qatgx1jyqpt1gfpn4c4lbdeaikc9gafjk8gupbtjlvwu8s25fy1fypmcjax9b9mmhu1pzvyr5jehrafvmeetoulfold5nfxtmcg',
                proxyHost: '6y3dqm8sv59yot1v21wtphv4p0o224rhfiz84iadtpftj6pa3oymsypxx790',
                proxyPort: 7920136996,
                destination: 'gri06gyz2bhp06ae23am4qxr6jj7jelccuaw5wt40hz36ih883yft8abmzy18e3rjjyl5s6t54mvn7mzc278iuvzmgd7dtmwe8895akmxbsygc7zwf2034gs0fw9ltgd2tt6g1ax5dpid2bm6oh4yb0tjmv3ayyz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'kaecj0dds85wk9pexba6s93zr89yjktnx1w7ap23t4e5lcxm45nexf6f1b5psov7r0q5ox1p2entad7z7x63iwc0f6gmg6vwjcw4xxgxej8cvk4su0b0bwr7c0ah7yeqa0yfa8lb1lp2uqaqa1iys7yvo2wk4667',
                responsibleUserAccountName: 'lov2yhjlazpqndxhz9n7',
                lastChangeUserAccount: 't1n2po7aoozo1yx1u8dp',
                lastChangedAt: '2020-07-29 00:59:28',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'zpo8s5a5pnil9cdcsxsuxwmiso1h0py4no5oq8rz',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'k8lco3gn5g2oqyesw59r6x6l8eeuw8sbr1dpuuvosq5akq13k5',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'bali7mqoboevrnzu7uvk',
                party: 'xicc4frgt26sn1bea07g2g6sixsr1yeukymho7wzm4qu46jhzavsi9brjx8shfb9l860xq41a1t7mx9ddso6mtw0m6hnumoukahg6wt4y3p8iyy2v85st4ju24lup13nolitpae3lps1uasrnirawtnlnikrlbbq',
                component: '29abdwqoayrx7ld3by6icj18g0z5pkxovhrl7z4usblg759660uzww7lopzrkw03l3tf0jmcxwnw1xb61mbm93uxbp9xxgn9qr4p5uvpiarvjer5xoiw6r7vu7zh6m0jdxkfrqrsjhs13w1jlxu8yccqsfggafd7',
                name: 'adu0rncwsoeu2dlte6ic9ywdido9t0lwq0r40jm8rd4pcl5m0wfquaehm9yvx12a4f9muh4eb12ubotioyzr18gg8tmllrxmlpk6lbd9k5rhtbq278u72pyv00daqnzpx8yzv5q34oofwg621vf5g9guqb52ej95',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'g6jpzoomxjcsvhcqk4uf7oam9hnzs6zjrmvkgt7a258adm43z5u3jv56zen3lw3tkr3um8gaoowejujtmfz5ndj98pxxonyr2zymlbzx9xrw8c5bpr72q71lt82nulj1ouyaubtwqw701u19lwlmawccfv56naqe',
                flowComponent: 'gd8xfh247pw5zr2ky5dbu8hvg3l241qis4zdcmfvqzel03govursfvy5c6his7ufpmvb2nd85ur2du3m570tblyk830o1jhdcelehlfdnxt79cwar1ci88peacyls263121h1jhvjx8fa6gs95pydbygndy0d0x6',
                flowInterfaceName: 'kgc09vhl5dnflzl3ntjidk36276nqrqlnd6nqgo5ylgt94zxz60gh7dz3hgpc3fgqsyvt1ugme4embwu7gza21p3lsfe2uzrj2l2ays0830rvj31bhhn2m3yvd07jfh20hmqu06fm61e2zbz0jtun1cwzyflwyajh',
                flowInterfaceNamespace: '0quaxtnsvnaoa66flvsxmxh1kdgr5lpn6zv6r491kjrjgs70lk8g6dk30swwu5o81inlihnnva8cguc6dyf3aldlckqgcxikoeei1iy8a26ye6wdh37dzapmrpjkgcrcod4iuzr5x3864o7aabwhzzixhnu2iujk',
                version: 'num6xi3sibxtwdfb6mgq',
                adapterType: 'mf1xsg6xh0qu9p0nxiasybhehwp1tqkmi8exl3hye2kwwf905t1mnwyw4xx9',
                direction: 'RECEIVER',
                transportProtocol: '8x9ifds73wl3v6ymina2akhtzy5o4msx6pe80fmm003juo5e566ecnhoxtqc',
                messageProtocol: 'veoluvz90soha4z17aycjb62dlq6ui9qgec97noe9ekwj15n8posz3hpjf8y',
                adapterEngineName: 'jssbvs54a6v7fgg2coun1xelfb7fd3fo6x4hpjvdp0q4re0v810ui6dl29oejd3jye1v70571ec6u3sevl3zf06rdjlt6kt3bvu7c3f3lb5o3gwlydl0yk0sdt0zxztpix4u8u3xvn6606xhs7zc7v74l80f1ub3',
                url: 'xgu09a8a04kn5r6zz7qth8crpn9g1t0l1cxx9ran8350egmnmjawpyremv9ui30cy49wpfn1p5i01nwjqmt2qda8irnikj02lqkdyhfy6mgrbn15udekxunutfxz2e1d6ra29h77uvud7i6it0op6q3qxg8n3irbnoisftijayv70twstmo91j9nuldaxtetvtyeprofood0ah1e0wks0yc17nifp3ng0pkoj90hb44n57749jlb9uf7o7gxrcf0jgtn7irn66eu5fvxi04zg0qx6hb7tgh86559awuw4e8d6wyp2hjpp7dav2o1kyk5',
                username: '8imjcq5bq6x033mb6kvrj5xepywmqeioa19t5nqddr7wmoinwkmy2qqgmu3u',
                remoteHost: 'vd6r6u8mu43qyu72bi4fwpbkam6dq8nvnvhkziqrk9zjiip1jjsdjq4yzx93rgkvlhzprtea3nv2yzngtrert28krerf0qsdjpg62smr02wi8au5y606e0mnx1lxyhhmiv8llnnbnjcsb0d2agsooq21da0lq8cg',
                remotePort: 8001008162,
                directory: '3lfiwtd3nwbgtl08npoitr7tc9knt3n4caqjck9v0cm8msfp7sqghk4bqiedqq3oijcdljxbeb434i9zyiehtc3vimaj0cpm23uutfjoc1e46xdlgggnmp8qi0jlqi18vd094qtm9ow4jdbgmtw8j8rplesphahud11tdk8rq9khlwqys6h4agjek3qrfa2c9efw3cds9cywh8uv0bd5j56pdk1wzb4gfj5gyqqs6se88oq09i4d1h08v3h392w4j036tp82bskdel7pa6viz6kycrsldbt7g4pgdipmmv94ee3wf5xhg97rnec8z2hwcjff7y7pop1xv9j2hjv76hsxdxwe61j1q9ozm92atei6b4fuaf3p4una8coyp8intqakfl9lz24zvpolaf2hdpzojl45ynkmkjlxysgy3afw63073on875llthyjcsgaj90u9xq1m6sj7s6brd0m7tk5mjusz99p6xw95b0uv6y8b1i4uc6aeegbfqfn8sd37572bpf9cx47m6rgvrn7zv3gn30i9is73vu4b77oa5uurqt9g09sv602rc882gfl0hpyurrlm0z9zqmmppbeikxau3en71stpv92dnlfbo4sy5fhf51ud2jh28grrx3ih6aescnnju4pz6n15vldejn5il5qy01s5lo7qt3hr8dls6x16i0rf4lw98g2oer6tjgxgcz1dhehumg78jmir2bdokm73lc0omuivfmd8lorzw4sux3b2ryfosyn20bh0ig1vlarzdnfrnze35xoifkb8giwwzclhyjt9n4ixh9vvbpukn03o6x7p4uvyi6e32kwr8kj4pfaqcag8gwegghres5z9gs893ehwqh9w7efahsmfxilnwqgsfilbwawxenc2vcqe80d78vm14cz6kfa1dfkccvrudcn1q1z1s0c6vctvtu6849kqwrsjr797qtuqudv3kat9wd8gijp8mfryesm8icp2x6bi7kfof0vw65iusq0b3zxbbrlw1bz',
                fileSchema: 'zzpum8mz4zdssyagr0eukd8cke1weahffek8uphilo06ploidbdz3pblx2of44hs05sw8x2wrs21lx4lvllmcj7wxhn4o9g5u6fu5zttbiv6cys58q81fhruzllso0cvpkqkjgpicqtg9qj8ingqyenom72y02d1toywldzmal96zu4dvu1zugvknk9jf1yle95kvzxwnim15m5mu0a7c8y1gh5hz3cfixr96ah402yirkp9vopqu7o2f0unudtu8b7rgiosepz1ufanqq7tmqn1vr8gubbt0yvw792zlipfn91aygmxvy848e9yo82bdfn8yz7qq0q4a0tu84l2f0tp9y9m1dol1iw3jij6pochzhs2zsrzchjsbk27x1wlswx8gnsd1yza3oopzztowlzclt50slgx2ne7b3koj6fpcwe02nxioph79to30vf59zmdigx27mkqfpsdjzqlk2qr4l5pwgdt18lziuc7dn313i3t8080319eeu56tqivnl1qm9fkf94gzj16ojje2ywfw6d4p2xiud3edxk0x5kz8ow0nzcbt3tfiueyuthi7dhf3uxtipas52c42uap6upqls879wulfx9vnvz4axpb9wm3d9vfkvkzonqttjlqj64y3lh5vvg4mcsp5eklawnef6l0e3l4c4yf4btn2sr3cwn7uwar6933l4pk3wyvax73qc7mpyjmj9vx2nlh910wuz8eoh1furdeddy0bqcf0eetnkae5syhj3ddhta520htslq3sdqv25kpp0ib8g88nxi30jhg5xehjheyjpadm65upsa9je1dy1xiaium59j5lijatopvcjc3jp771h39s6i2wn2rymhyy4rjgezc8bg7eyrq9qxyucubqpernw9o6k10pbh40mg9cy5kgkkwzvutqulz4kpp6gzdg9zq8kd6mxlpckp8x5yhjc2nfgi8fd82pe6ighkjh3y8jkwsy3yzfy7ecxknxdkbo7teyadmtfncknkfcy0qlaeq',
                proxyHost: 'fjntkietmw7hjza2yvt5741yzad3oelp0f4m96ic4ntra9rye6cju68pss7j',
                proxyPort: 1998889047,
                destination: '22r2ejocjfay4l44tavzmcd30yp1vv3a5eob37tv6ni8bf98wbicwpttf0a5rtieowdbze69l55g797q16josaiyyad1dfafcrtmjmtisl86wq0s6a3e9gipoeozoc8h2fkvzampczqirl0ysc2hd32t2mihmij8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vap0g572jqchyb53q2gclnmn4hui8por0q8dblkispkglsjbxq4zqnayvii7bakfqwdbw7d9ajzygn57wvzwizfn6jbz6p0u8wjhicsarya9mtxwsu0bq1wnhhqn618bszqng2j95lcq9pyd7yn8jec3o174ejm8',
                responsibleUserAccountName: 'tdagapthd0mw0t1ab6b1',
                lastChangeUserAccount: 'pldwxo124bhgfz3uix0v',
                lastChangedAt: '2020-07-28 22:16:18',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '3apf08s5b4cdpk96v5dmd4sbo50al6f2ix1jh2vj',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'slf35jtui0z59no9tj0k43g2nl7bnqvvd49aixr6e67wrhhsir',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'agt8h4ad6yu86ph4e2sm',
                party: 'kq5mzqm039uq36qdh7jdpfk7whf1vamd19f5v737s7yw6o9nzamkad9wo1icqzywi5h9c2lymd16cs5fpf4cgi7mqtmh40l2vt2r9dn8bdb12ybhmss16ah17vzoeybqgzrahnoi5klsftou9ipyqrk79yb1g622',
                component: '94yw0ma3semiv40nsat17xhdmfa83zpg7kazdarnlyg32ehx5kei6f7g7y7pgaxdqkk7ud4vwzrqruupzcbj0naudren70oq56trwyffoponc7u1cbvya4ilhn0atvjjtbstat5ksam2b93odgiy1ukjvl5x14vh',
                name: 'c5je8mbhgaa921tydemc7u3anyz6qcz981vp8lf1wu49k28pndftfw4zo1vpcd9wktdbncom3pxp9869rnow4zsrha4hqxdeovvp1oqbfioc8iv1al0jo49jcvzayd37wgglzbk0l0m7ljlmlmxtxqbtee231a4b',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'pgi5jgrlcx1vuo2wtdot5xoykwf3g2qfs1xrzwlhbgyddnqry0eb3urz2f7cpuo9w3nutrswhja8vfg17qbdy4cxd40iq2m29hgapxwxol7oevbuiiw7qve8hicwmcwemmp02g0q3ls4j677pk28e5jfea7gp10h',
                flowComponent: 'fhzvgn03qv401x312y6i7htw8xzfoel5xh2ahlczvkdbrqd6p7vj7s8fw9c4x1d03eonl07d7s2z3cze0yii5qy8ludofagnxt6vie4w28brxrd68ltm2aoq0nd5rqyw5qsi6u2ype1zxk3p8g18zx1jjpz7bl3b',
                flowInterfaceName: 'kzyzj0ef3e3erjpqcag0bnp8we9k8ehh3l73uj11um9mf4s8eumwjfy2hlh7sik0l04f8sk3u4ow1c3tlwvjk9i8o2xe60y7xsuiyivvneoubmrep5n5j2jsm0fpgu5ft4ayydpzwadixb7lic0ewsvyneh2qmtg',
                flowInterfaceNamespace: '1n0aum6nsrfqp4iheu1c0m0qnsourimt2sm9rll4tvkd1yeldio7ec9mff6n74qzotvgf0k2pfjqc9z1ji90sfikt4sklot943321y2v9eacqw5gj4axse87cyehypozuc7zqppkv8bu3rukvt3khnht34q9nnk1l',
                version: 'mrlo4846pf9rgldqu6fz',
                adapterType: 'b9khg2u7jkdba8j8fuqphrf2vd3qn0s3rv2pvhznm9g3glt6w9mz9r15o1ex',
                direction: 'SENDER',
                transportProtocol: 'q32wmpghiwcwlakmqgp5tkhlwz3ol6i0ld03o0r4pest1o9ykzxnkszn7l0v',
                messageProtocol: '057aoiv02ohi2i29nh9rknirdn9zx5evaf0tneb6pcr7l8dduxxq188gxz47',
                adapterEngineName: '8tdztxfwijh6ivpgpfxyliqtua2p0ng7uowj3kogg49wzapqmpa8m66b53zv0fqf16oq08l800chrua4ntpjzjmry1hs8baljp3omyxa9w8javyrmmucu7kyd0krc2alvlswtb5vqed7iu6middf1810fta40i1z',
                url: 'rp97dpylqei3mflx5mqg7i5kirjpqlakssl9u3eq656tldoa7e8zsgwh9p0goczmxkd7l6vtf5dkqbvbbi5p4m9nd0yluprp740g73mbbh85taapz5n5zm44x3894qgbm59erpd5y8sebivxlxtfgscqhroghdcnsbxteyqr0aeb22faw1knen6rsi5jllm106z481kyaagj75k9t018kfwid45h3ezzn8g20g2ui8vu7llk3jmann9lop3mw83w0cxklt7o710lths3uqu96ui7785ha2h80xszwncvhard9kc20txy4l6sywrllh4w',
                username: 'rd6kffx6lmqfnnxucihiaque420ouz9p6decfayh0fahcty9bljr5dzvsgju',
                remoteHost: 'mea0yccgw4b0ldq70kjk5y2jaksi053fbjb38uz1d3h9hb6r4aookkvzt81aujpmhx2bdcmd4dcwd5olitpxobdl7ouka2g0depx1phjwquu6x1h6f0g214ig102eh7xvtasxi56y2kp0cwg80td7nmo25l39bde',
                remotePort: 1421433791,
                directory: '4vab2h1ns68j6lmy9apicx808qiz903vm1ai2t2jslu6ejdebw2oyxb264nhnob9lg8dx8worlps11asrr7py1cc2vfe8ljksrwnbcydp106i99seqe9n2xlw960iitys2xr74dcsf4suxk9w2xubt4jexb4fepxoj8pof64wq9jxb0l1j5mycpzr3ezxak5jg6fo000g69ic2ooo504j8bvaep6nky9p58uhgdwvmuwkrcdiuo0x1q4oohsx2nkxxi8f1zmmavopaof86rs0n1bcgg6jpk3nxcgo6ubzt7xs9paq2yj1npmmprtc52p3jqp8hiy1ig3k4k15v6exp8lmrc0we752ka8fguj10tnjqb27bediy2kg61at55j80gevmzaevcb4b0f470joxaz3dfs07y72c0tv2b05vdl9uv5xmhyw9ajo0ijppfs9o3n4luf1xgyczilsti3gu1fxdn0zhjyqkznwu1wrg33vzi4fby01l57wvka80l4cjinl8ejfuledzaf64nbft7k2p7jrqniakyyacpryofuo4jye84nfddm2wpoykrdp2htajvt448g52l8qrvjiv653llnxl7fvtubwvh26yg45jt18rtc0b6d19h8a35pe119s0otvud87iin3f0h9a5uej00ovxh1br5hv09rpay205b0uqgz1olnspnqwpq213zh5o7em0jswery1mk55cxue9xbue34s6fzqmumhrpjhw5e7ag25xospbyz6i41kquh65z7o1mu3qbq03dbh2mr03ofxtz8g6mpw2nlcvckuo7sv5zkd6h7ptihknrh98paio7r10nxpibrydma3mv4o2eew22zsolrwjqlyre46dmfkd1rpyhxtp35g0k9itv4j60d8b0dimnebmaqrikol4phyiu13xkuxuy27hvvj92lx52nown1cveazm8ak6sgmpwif9gebyr8749exmknxaspllez37i4ue85lh5zogg4qk4s6bv1kyjydwz',
                fileSchema: 'zop5ovbjl0cjsomi7ucggqv9nj3okcud7eetn6d8fa2qas41v4hxzd5u1bl6vkkoiehodm9s8uhn3asibcpkspryyw0al751fcklgwx1e8y3c0apt6ssnuxgj7bvg29ihs12dtumdhiat0jk2n81uaag7cpcery8ssusx5me51oxmuduedazu9d9icp268knhkn4riwseunaems9aplbci7cxa4a8h2pbw88s07mdqapxsknfr3l9pfnav9yeu38x3c54brkn41esg0rxbv1ee89nt8lwbm8eyy0kcnhogqda555olty2zrhifkn2kej3u7kjv83bkzk8069q40n6gxvvycvq5a829cvkn1i8uc0i6sbjm46di6pvqhbu6vrf0utilyuc7e05bgrnnha9t1f9q1xiaod3x8y9lrwkvb7r8mbqx1bxk11903ob3of3ckrdbmhawppgf60d4m8d8clt5zt2uoxvicv845x0p22m1at5ugafl51p2h522h14ljl3f7v5dl3ypwvbblbr0ubwbi8bkphhtosragvhwbfquczvzg9dz7yfopzi2p0tosnbw0vb29kg2wsr37gjlm8oo1kj9yfqr7pgx65vx620r7rnelk8zyqavev0h2g1abodr082rwcg6m5f3zgspomxqdu9mmh8pb9y2fev6txvhx7iz3dppss1eceh7odte5j7msvxgsh5o07ftlh1dqxt2citkf0914zojnqnm0fj6xsxrpdty7r5394t4c3sv6sdsbkv56ai9pe8pnav0y95zagcgcwzdbyae49fbfsi8p8tsbtugvk977xe83t2y0p2azwbi0srg0f66afbv52l1oxhurkome8glac1y6co7butk1of524y740shd4xju5r38t83luwk46flr5npf162tv64nrtf022wrayaq04w0faxzimxucvzptxi3tcwjxgd7hlmnulzni2x9g1htx049nn9gq167v1rzyp7hv4zoeq274qn16ek0yc5ek',
                proxyHost: 'q5ndcgmi4ixb11ll2et5xv8sh0u5ma2dt5q3me7257997sqyb9bqsyk3w1c0',
                proxyPort: 1760854394,
                destination: '8yecdawoa0e1uzc7djxo6zsiimb04e7mt88g4ewnl6a0we2db7kai648sa5ld0nbci41u1b4tpnlevlkzncze6gptk0mhbl1zc050edl2lz2hux88suz5oj5jby7rrx7c2dm783nkns689xcuuwwehx3z1qnpad6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zv8exr4meros9d94mvppv22qy8vi7m6wd6t767jufvtlzphkxe9bmcve668wayplju8calmac5brgfvixkwczz9ujv0wsrv4fodl24f5dvm87isud73afwrvw10sbytlexbjlmh3c67pdi0xphhhjshl0e495gv3',
                responsibleUserAccountName: 'fsfxepxfmvvtvi65h5oj',
                lastChangeUserAccount: 'zfh2j1sfp0h31y9l19es',
                lastChangedAt: '2020-07-29 16:38:26',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '7mmp7brel3a5qqf8xynqt0vuh4mp0p4rorw5ffcn',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 't5hhxn14tlac6q37qakvtffxeu7xrazh41az22nl6n13vju7cg',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'y1m02h5j33zcanrd1zfk',
                party: '1h5iw6wmhinbup1cqepijgtp3lwz95o4m1h52fhf1tpd7oa4nh91lcbk9rf5hqx2iggzzx5j541wn1n6jfu2eszh4doc0o5aatyj14h35wz7uho510a6o19rdtm2y4v7pgxlkqm9mwfjb4dlb5a9n6ix4u47voxc',
                component: '9dnd8qyfxhb3nkvvdq9cxvsxou3uegxsr134rv8ivnqiy1tuas21q32hzqzopfaxa8gkasjwavdeo71xtm824h20asnhepug34mhwa9n10i1vczsoibzya88y87ukeqw5k35ge8sfviu06hlq42yaczcwlpj4zm7',
                name: 'mlplnirwel8s5nh3hfuvrblbx59m99wmcay58zn9tykw5glt2tauzf145i6ccgqwwe3ojwm8gd2l5breet5g9p68dmvk9j09f6j0npc943ixp6cmqn9k13yfyvm71yr8tcz4gflyzfloirp3faoo38r0qabkojj2',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '1mu3l5zx8jr617hazq4wr19gq9urpvn0c0fhgk8zgbnas2y3j4yx4ki4zjbufztr4cf990d51oyvmxchttvz2ax8qfkk2ed7fwe6paycpb0kv07uqa2gmf268m7ayu4z2ouy4bl5mezn4434abwfouhi4umsf6v0',
                flowComponent: 'y3yzozmjcobmgk6hjswo9mb9h9s1502xlfgr6j92dqiumv218k3wt6rr8hu02qe0qhg6027tikrq6i8ntqg0imufi0bnb58jsbl709a0ditv1mzu9o3vcpevm443e77oek9bt30quo4nbq3k9v1z9qokc7be4uwm',
                flowInterfaceName: '0d1w9zdgujb10c5wp6bybnuitbmf2h9gwmfetebevh6pucmcy8dz5opngqeuqxh4t1e473htesvccc5l45nnsma8rbgk3dc4owwqnp3ndnty55cexma91nboos6adff7rtln33h92bgfdudvaxdqch30jua4afl8',
                flowInterfaceNamespace: 'kftrxujoxdhkzxhcdopnvd47fmydoujlb7zt1dj2fma4zuxjuvgrlcbqe1lugvmbr6e3l0ip0egblj5oq2ydfvfzcb4tyyqbqsh9xpgxo6hkn282ny99fasd1io1w7o135mmp7azo6ezle1i4fkzeqrdj4k6b64q',
                version: 'usgg2bjc94txiikz50tpt',
                adapterType: '1y8ebxjgf86wnxclw022wtmdw5s34ko48sja9qfrvmfd6330eckfzuasduvi',
                direction: 'SENDER',
                transportProtocol: 'xelqx8rr2muohmtivxobwvshmzeqpinn6q1i812pdpxlf8as3pb6uxfiz7f7',
                messageProtocol: 'oisqcxk5zhfyd1g13nrd6zxhm4gd7vg87pvtb29qh6fk54a3auk9ainfcquc',
                adapterEngineName: '07o4286425gybvbdu1gsccouyulbaf2n1npxniuy8kxbmemhyt48qdv2ibtpifkg7oefhmlwc50r4lspar419d6lhau7mnga8nizve2ek9z4jhu8amucjqhyk4gjxhhjdljlfkxtbhxao5svb20ripknzery9sjl',
                url: 'd9yi4vrcto2enj1wrbywpbvrt991pktrtu9x468xrt7bxs3llizn6huay72b0nizx2vwg68ih0uj4ig25p8gfp1le08eqbif6gyqttbkl0a5w9lqtkm0lsipcteuzcuxnviiuk3srp84qc83famcwe6jsn8s68z2le4g6lbs8s57hvo4fwoyc1l2tr8uavw3dw9s3tpm5txecnhguva1a817jryuh23g8h36q8zdiv1obfh6caxv28oha6o9sxctgw1gnz5w6x9lfha1er9hc5o37y0slyny30sx6kexk49390gus1wynyn6i6y8v9v4',
                username: 'tctg52vr5kt56dd1ykgjnkml6xj8qhw2qyil3gqe420nefnxlmvhcirja1td',
                remoteHost: '26rrpt6xthvz1u9bz04oiorpys1l8ahzpaa894dgh1ji2c1d0aki36prlef6yp3zju4qxl7awqenpe1f8gg4w6a96q0i35x1fddvh91wkiac9nl0u3866d80vc05zf3c3zho6mqfuv9alcmepd13r6crzid1cbmz',
                remotePort: 3635172361,
                directory: 'nvs3qbjipdo5lpfupvxg83mqs83y7cy6jgm6yje0nwksmp21uku6bhhb7y5h7880b9fsdr4ixnuc3txsbt8jdc8v1uo5d9oorgwyn9ps553lbzcxb9l2xcrxuk2ziwwdyq9p76jvfn0077wcbbbkggqj5rlkxq249ykkv2p0jqz5cl565a5fljfbft8w3qt6nng4uvow421o8q7eo39pm4yg5ac0p5yrg9kvxhy6rpwetzv387v401f7xax7xs09b2zh0d8g4407czoui38381dam1z1zhia5d442yq4dtrpi4ra8j9uncjgdr0it74pti2hu9covtr5mhqumtpej7mlf7oewrdubc78aufaw8v9c2tvuzdh1ctiloeevvd5faki06fzhzakhujax2kxv4e6fbw7pt3vnst3kpnwv4v0nzzeehwfmno4sqpfqdhiv2lqv4y4tw0qv4691c8ogy7y5tcxb6j4a3ghcnurfetecqnwro3e2qap9sxaz7bg4rukp2y1xrrdk6r09z3a75hqwtyl4g7bgcbbd2rkx79jvo1ojpw6avhvm8u4coctsqle1arykwi8c2504c0m81jw3exx9msn4daxko4ycabk8ifnsbf77cj2dszbvc911758gkxoa5mm1yircbozi9wjtwtcfm7hqhxave3xcpdfxlpgyoqoxxasycjbz3l8m1fsw60ykz9x5euq6sd9v8mr3luq1to05b9cfgignqlvelz9pzg25mo3famur9mc5qiampj491eo8ir3wag7f7i7vvxv261xohgwg3nf0ik3gf1gdi4s68v6hl3gb137ypgaysxjrfsy6bt4o2x4amifmbnuj4h8vdaiktuftad09jjjr5qava2d6sp9rpicanusf30sny3nfwb1ht2zh3ijyogia234oqy6aucqhby8bkcnp4i9wcx8zajhe1tmkc1twb89xnncyrcwlm1t3s1gpidsmlp0thaam9bhhutj9q9ec9zsroxke320garz',
                fileSchema: 'gqnhvlgs5yn5bdl7p1bvspgkds39zcsuixtavxjgr56l8jtbsyxszpafykyl6c17ermo8frspgbwrsllyfwdnx3xv7mjaixljk6o1k2ad64ghohqwyi48cg8hejbiarmj4fxrz5b1z0ldzgqsmnwra2jfppofxdh5vg2lq768r6uji1xukm0ayoos60zhmduih0yalbgsdp3v1qt94mifia38pqthyw32j9vzxfw023iys4v8uflahs864nu5fizur4561t07bq5b4mncqtxsjhzjjb65q9fg9kwzj65s62q8pipxbxgnv5jvifw2ios2ae7wsnwq936m0qgv2l1bawol6h3ql33nnn3gpqljr4ds9qlkl8voo5nwj6s3x7pd6qf2d2yozhsyauewlu0um82s60ldbmlt2fsq4ucx9pkrtd395nib6oeopj98nq5902l1l127ntx9bqbf0rdu5puqrsactghc71s4goh5kaz5y76lvimfg7ezz45m5to22wkqi9p68r7443q8g6ynp5q4dmriikv4lyobvhllr0t1jxhicjj9yydza5fog20p09dc6lgtxlui2zd1xaelwchmmca3dgyo080cpq20veofy6tf10jaeadcdv23dcxjo9xt4db5rsvuf0lxx113xzzkgimngxaxbcyjjmtlvz0t4ojptb630yybqld7cevyw02nkphpgvf3t46ka7lg36szlu1rt0mz6besvujibtfgembs3r2rcjh228kp5x2lcffme86csi9jhnoz6nh0wfk96f64tz2slelz5n6bcgg6tyon72z5vet7o3bvl48r30580yz58fgdzqb9eiyzr9mx3l196zqo5f3m9c1vfupcbbcj5mxj0oyrcl7e6cfbugc3xf6ipqukwnfdcz1a3vysskl1qiwqx2ckmyvpu8ol8zin4n0mg28eqyf70g0b6tzmcpf7xps09qphzfctqsmufcmnupn4lvc2yzto9a3f196evqo5lhvid3kkgfs',
                proxyHost: 'lhwuylk7iamaaq3y3zn7jxgqdrhajxfigclwqm2h1r4ikafe3z0src25drh1',
                proxyPort: 2697243908,
                destination: 'tcpu7j2h5qbw0n9yjr95zph99pj6yt4ctptdfy0rqao5qsltspyelrzuva1lrfn41jnr4cob64g8gqo4kfqpqzfo9bptd4q0o0s583nj1jatilrpwusvnx9pqsccmg2azs5f9kynf0n9nkwbctxxf5othtfz112a',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wa9fak1mrsw4va298l466hldlm9rv2iaslpnd8m82djbc3wxha5c8ki82qsm5ebvzh95ul9441duduto50q9aza3pwet4s25w3qsm6zyn30708nv11rk01cbt1ekwjjc3thiqrbm0lxlntiga34ejra7sfb6mbx3',
                responsibleUserAccountName: 'ngehetvnf5pyp40yelyj',
                lastChangeUserAccount: 'rvm7kfaxpeo4y4w7zh6e',
                lastChangedAt: '2020-07-29 00:56:02',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'fxl8y5gzaqko5zsdygrdohd4mu7nx222vw9pgkoz',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'p3itptj16gsxwhlodr4ee5c1on6db2g6oe6i1euvyw7xgt6bvu',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'q7s0fsqahlg8yb2zwsx2',
                party: 'vegz32aq7g708yhp10sw7vde9v6577r9n9oxj8bbigv7qb7l9vcujodmv5f29pbilwmbwl8c6is1b7m6lhg9341h2hssgs0pmqejbyjudmgcyj891cn8mmuhltbp4r6tej9ym0zjpt3yd66shvnvhv2e99rwhz3x',
                component: 'lgrylxch2tadshduh3qgeshmpmr27dnmi4g6iu853mpgn9ymixmjoszrazskrov2jguncwlfn3lavdtvr4vra4xnuai0t87y2bk2i056m4aitcjaipnt0247ikdkmdbun3ecn3wlvftgjyjmlzt9ik12fj1yknim',
                name: 's32x97r8geyev5xga9fcy5pkuztq5e1jd2pqhlgs87i601npkhltvihbbt5gg0mltuwlunipkqtfyu5px9s3zicfel1kon030pq1y0m0lb5zrkgmflulp0cr3byctptlnsypywrc0ggcy0g12g9cp78xs5dpijgw',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'ilemynsd62xytserh8u5xp0y3j63t01km3h4c29pgiddm6tgivdvuubnaroixdu0h1b4infj5cdc8jxdktvhzxcc14kyg3no08o5ne82l3v5uhycl70sjjs6tig0rzj9h8jpvtmyqv2360b9tdr5jrdfqwpbkovq',
                flowComponent: 'lye5wgfmmi19n17ds5l59eexaag9dmhhaj4h6ihxgu5hhzeyo4ul13iphhy09z4dig8a98ef95nh5nbsin9a5sdin9hoc0io9w4i3a2vdt4wm3gcmy4ll6bvksdm3i4oh023y5ox2l3fw658xind38gcjxlnnv3t',
                flowInterfaceName: '79z6ov9nv2h88mxfz2qz1oyjagqvab0ue963hqt7ebtmgk61y4w1u9vrzoakaw8w7h83e3z5w3ddu5uu18swdldev3n24c058dhybb2p6nkbth5u9b9q5wlqkgr4j777k887nm5dj3pgniwybuljd6gl23rm9iu6',
                flowInterfaceNamespace: '8cb0z7s69hwr1p64h9pl4hiyiukmdmh1ef7ram9i3ddg43pq5jezcizftts3qnmpm46z3jkdms1ztvxn1imtt4cjmljowe5s4b40fansbs1jivhiuixcpc5dt8ubi9wp5hr91zmfgse1g04qykev5m1olwwqux8u',
                version: 'mncjdatxryhf2zz55w4z',
                adapterType: 'kdpbp13ui55a1yx5drq7vg3ja80c1i6hptkiixl369aq83akzi1651q3wipwa',
                direction: 'RECEIVER',
                transportProtocol: 'tbqeahnusnrxpqzaw1wdjl994kw41sg3n6i7zdi5ca6cqwqlx54hlml3gkmn',
                messageProtocol: 'sdfc9jy54t7xyce840fd8gerpo97kynevwk6b27zd0ytlc638gjukdliok34',
                adapterEngineName: 'jakfe94w535c33xelkgf4psyq0j0m8mkbdw5diiyy2ws35emx8u9y5svwx411w06ogklldfq9mi1oa5tuaxpvrob88jkhvgldb1rxm721z104gd6tnyhhax7pyk0rp7h0k5m0f6jys5cx3l5vehhkwry8tcsbe02',
                url: 'ypvk4e0ffd1smx179c727wmadj43bdechgn2riiawjdf1ajg5mz7l7j8fvmc3ochnd07bzka2od7mn0ma12ne3rr78jv42hnu6jpukpt1orj6eewveippxcb152uamqi1sw6qzkexdyze4dl56qd9lry3gw5esh43yw466dx2cy2cnmigeqqd1mhz390xa5npkh44fajourao8lh5xx3kb51eprv3o9dp5bf98aa8d28n71s2wrkwq7utglxvnbvz9kewikef639u8go7gxxfhynwcs1cx4wrs4udx45rn1poced8ptdnwnj77zdr043',
                username: 'y73pmr1p8ycwcuy0a9390ubq1jcdkdc6x1l3xh28d3zoeg3oydrsih02g6d7',
                remoteHost: 'lpvm8qv432mqv0chiwkcsr3qpopjzbv62dzjoo6a91m4pk8lozjqvg7kjt9mvwcpomkk4ekx04kdn5yx36oyypo028lpqp44zpt5e6kczhxkrxrhc1l6zpr248mhhxo6gdfgozhs928fyzg36ehyutsl1n221nvy',
                remotePort: 4774458110,
                directory: 'ii1xab6d30eublxgg642uxv7pbj3lsdpzhrzd558kjd1e0v1d9sydii776p25st9yysb94avhbo90ehp70fczv5713ougdnpwb4ielzeghvag6ldqkyi74btrdleq22t3syllotkk3s67gmhx2s8mbwpq7t0kv6mcu4l63q3p74md8hqoq31kz43e8ty3b9o60ap9kgh9vf69x4sslio5v9yit0hw4tfsk337qp3scwoufilon8g19n4x4m1s8ld56evgwmcxz0gdqqmvvr14ymfjcb7d72wsd3x0ff61yxmkdjd78numrn0unbdd7aac1gzfx1hw32rebzjic5suifktmzeu96e1av9yf9m1ebkk4bl95fz96fkp8ypsy2ss1rinirsegshwdjvrt6xvxprbu85lurv2pv8nd4lu859cr5nktpw78vqs53zaoflm9sj7w7tqkvd8m4ekp7g707hl1rx0ol4ym087k3o9vkbxvm1gwkmx1izin7d3aspnmayimpxy2jk9qf4y5jfjsf70rklne5o7pm7gvu4am5aoqvr43h9p3ua65bho8y7w27c3w1xlwgyvu1z5u57ghom13y0ra2fwiakjzjguz8ed7cwelorbyaqmb488kc08hxwfapq70168qgslzcbzfw6ls8w5zi4u91xvvhw9vrm042797gtk3k1a04idqb7vv09je5mz1s6jj3x0ffbi3phhdow3j0kx8ivlkuwel6mo20kugxlfv49mbca70tggjzj9ezb7r2zgvkjdrey8qfh7l353gux0keae3pq45w0dz62zm0sbmi01rcezulxsflyjnoe8qul4zho23lnbi3bekgsh5g9wlrjaf11pefkchxt933hrb3epfkvbhzr1am8ys9h7j6e3q4c3i1lltdqgb6iis815z4dvhj861mrwv3o14w8x5szpqqt12qw7awxhbr4t0lkqb3kvn4y1futoff2dbpxjttlreicksx1r7j0n9bhh738kk4qufvu',
                fileSchema: '1d6vzh2bno17fqdamrkjes4kth1s81n5zkpy6xlu570j5liv56xf2cttu6fn6k7vsef1taqwq2ry3fsje2k5969sg5gd55rp4tvnmttp6qz27lrc32vdumag6ezmpqjunb2aqe6pm2wn2wbd4bgwkoarrju3qhr34vslek0o1fse8v3eyzzlck2l5g8j1d136vu6pk03g12aj98tlejrehmrl0thrwij8fez9r2no8jd0icoa5z6xa5ynwq318cfo9rmyfoeu0p3m8tx4kj8a3e3741x6v9s2veszdkzj7n1n98ge6u40eif0rbq3j9i1wr3uhqgia0focdltwjezj83j7uk5vhhbfhvhh2i1uvdf3do6auw3vazpj977syhkcihtdmzco4e27itkg2kqb864o9prcxwtj5mdsncvkyqqloj82dexarv9uia1va6sdefvu0io7bjgeg7o53lsipvr6jb30jm44uworb20pq8k23hh799re2wf2h5awdhn6rs23byc9v97yq4rhs50p421cbni8b99d12d7ethzmnddggvlh3f47t3ph94wjcixl5x82uk7g0m14n4lxpf9akmpos769ndhn61wikz6054g3nxaybnbociadz1nqxcxu04oz0wx54oir0zdvgodof4b43ck5qt1ibszm0anz28lwqo6bohe2jno305gtf739qzbt25749j2yrttukci8qw5su7vp0mziwa78ad4m4h86l0drb2ch9nmigs8symzq5bdgs57gutqrnclbihnanolbwlri73erqk238x9mv6m7q3sbgf434n0pinmdrcba8w1v0gn32yay5eae3z6iqq8stxvmuu0wa15vcq692kpbef0690vro67fi0dnv1a2nder9pf7mgf8c6zphilkonjaxomqo8y3d5hz8kyxgz2v9theu0nxe4gif4muri4wrh6ehla9ftrbmlr6ei0sau5szkcc68e38g9ukaeddvugrvuzv1bgezoxd10av',
                proxyHost: 'hhxx3le4eqc68vfqtdr776her9bkykgbn27aa163i5k7pyoystlyni3mikm2',
                proxyPort: 7947328820,
                destination: '2q3cvfe5ry37176r2hf7enlih2u3715ajyqf2kh76pzrvm6t4yczzus8szgfpxameu8k0pexa9k0tqd88izbhrbw9vrx7llr9s3ilzuva81mkozfyxodkd095vef5hxdl17anqz0yyvcuxrcsjm8p5glkkmj58c3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'z5xdgxtwtwcimb1jqzgw1jui0ng2syybz5qwgopgrcmzc14euc2vmcuyaelcub5oc6kvgyz62wc7ahdz8bd9m7z4xndq7pvvomnuvfgphlv8d2x70j10wjkzzp3eskojmky6gmvvs7btddhn7qvaattnnxv5elsx',
                responsibleUserAccountName: 'xd5uljo9gsb90ytc2enp',
                lastChangeUserAccount: 'zwrds8nlfodxq6mxis71',
                lastChangedAt: '2020-07-29 11:24:41',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'o3hmi522pup1bj1gpssg58fqxwtjhjmtpo40r246',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'oxvxiar9706cpl1n9j9xlzhoqe4ynca4vsf0ribcvjpbfk9iea',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'nxb3sb10nkltln9dpukm',
                party: 'y4w6gaw80rbzh63mw229hspyg6ur4a26gccfhgexqdbayvn2kkibmyujvgu2zg4mm1objalco1ym668koglxar60n6h400xh8y39twymwyut9zxr6jr1smio6p4le68ghtwxfcyjdzlhprrf2d1zyewuwkq1p5ar',
                component: '5jbod9s91p70sl02wjqdr5u2m8rg61sh5xsz3cm5zhdslozdqc8aq0yofsk5r5xgg56a36bci2kpp897qhppvv9ixuhclfia0baexz0g5i1txy2yioyff2t2t6z65env16l0qqqqfpujd12avy4e2js5kltpy344',
                name: 'ib5d69py2v7z2gavoq6zyvrki2ge7n78mttu7mg85yy5tzzy1esj1y37ycem1d4kyzpex0wxvvbaym2iw28oksrrdiiznk35jltgyq5kn39971bf5plfgdx7d6uxnv4cjr2zawzz3qe06rc4nrqk4otegyfuei4k',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'kiqasf6zdbgp6svo2qqx2kosh6544cgr57995iw6gp7aftkjujblxm1asvw0kz0q7yos14lff1sgz0dooofu23g6h4qyx6mpjs7mjg6xvto296g1aoig94d0wiy5xoqh9h1wjxybs3dbnaj01gupxjiufe80m0ep',
                flowComponent: 'f1u9gflypn5e8yet16gwiq8ox2kh0ktxky01ivndzyabyn1kpo6adhwxdmf4luf44sagaes45zu6li64exf0tjt7sbmr5ivmvtcbytmlezxxmrqszw4b2b1kn2ykvvbl2kerxlq9p8ioabzh2cue5edgne0k125c',
                flowInterfaceName: '9sqouqu6dagrks1yi57q9bb996qg4pfshjl0pbot4ddw4raf9xktm1ecdvpzq5ybpkya54rt7azw0bq28axlx1b56qeowifkxcnz961n5sv86xltmrdwenob5jy2z3zlw7oi7at8k09hejiza6cqbr67xvtglwt4',
                flowInterfaceNamespace: '903j6s5268qvnhu575uqvk2r7rzwvnrj25oyzzdhfs6f8ldu9rhcdt8u56ff00jev29cmgix02lp4qb16iukk49wdzuwytfrz0s1xx05hkrj84p3ctlkkzbeh35utviiw3hk46mtb2zywtieggd7yv54sru4bso3',
                version: 'tqps8paiirjr0trmwzzp',
                adapterType: 'g9nso08fuihka95y85p8cjxm36t23m74riu2a2o48bf3i3ilhldxsk8qwzag',
                direction: 'RECEIVER',
                transportProtocol: 'ytwzuej8vvtso32qry6h8ojqnbckgcbmbtdqfcbow2it4ndu7cfya63dj1wqz',
                messageProtocol: '9job4sfduil7zgxq5m2cei3yhear3tzxp187ttdqohu9hp3x16yggusoj1oz',
                adapterEngineName: 'o575re3tw5urbb6x343wor0yvlwytojc87mfe8urpq8btbrtb1t608467mz1mccn3gtpp5gqdgnhmviwsycsz22rzjgo648c6uso4383h01oro141k7gu9tr2dni3p20lc5dusl5kes325n1lob0bqcxdgux1h0t',
                url: 't7pjgg4v5oepm5zbbmkjse60ive6aygvwkc3bm9xyixzxkog1q6twjpip7ml3zwk40r9q35y346zi7xih3pa789urrvm469qnzs2moy95tn3s9svtnqrpo9vgc5i2towx3hbrq4hbieox2338f4n1jj6k15lo7339on6jynhhzzycfe91jsrg4k9hjoo6o3o8x7krnzeol114hd04y7mgetjb4rwiozjc8bfwi7io7ictfuuonn0zx0ho1yio6fzo2c98chub5622dxud6ydkp9owfuucc8a8fhcpm07nmooos08cllr1ztebs95o8o3',
                username: 'rb0xu5rgfv3ts0h0aa6z02onke2yd041df01x7ic978lu6rap5buawtq49w5',
                remoteHost: '6n7ajh9lsxawa9w0gajhcds2cmv1osammiqpkkfwb8od33gvstr2utwh8axhrpa0tfpdu8xtcjnm8g9ftn63v2w4vqbyyclkehpi1z1x74z4212vr9fju02tb1z7evj5jzo24jk9njh5wify1he5g8dcnv0ojolj',
                remotePort: 1832857931,
                directory: 'mmp52teaj6v5pjkqtixezm2nv3mu5pca1d4x24trq652p22k8d9smqdfknrsw8qe569ok4apdw95b7zdqoishm4xafoi02z9pibggo2u4vqple2a0ugilz2q7y3tknfwwqpy0ttubpxg54j85v6fnqv81iz5vfrqojp7sbcohsyvzjo9n1eidxj79xnkg07ckkoe09mlyz0wvisfpwpbtkn15v9j6oahi09865fmisza8ll3najdofj9bd3ffcoak5bsi66npu4ojvbi32h19zfwcxp0we383b431snfexk9uvfrqvdb15kideakysj6tye2tljtpxutmq64ueto94igh7zed8f0c6olmqfg5o6evuhvrdsesejf1n9ivyiy73vbrbjemzid59i4zax2wvymy8b7nwzqqlnhdbxurhzmwhx9ahz1b7cvaurcrjo1f8mx4694a47vsgbj400wyqdhgghirx38pmcu94s0j9tyjhm1lmcuujd6vkw5afoev8ug34yi55towsnng9ntyfiz6uvm2hc4ep0cfvgb9vrgtnnwz93jfp8l6586rysg5v29upqxuuapqsda82qzs92zse1c1vml45fr1c8nwxbdw4p8hiyxfdj4wayip5g01gtbygickh3reqz16etlb9t339ma8czc52c34xow4y5ygg0r75fma4i4xtz29dy707zpxro0mx3itix4uxyw681de98xwv8duqybdg1parvuoa3vphoy88qfxd5wkx3js4xsfwbhamo8xb9dxzw1s3dneya9e3hdc98xkghzpwdsk81dyuqvcnay7e9cjqlvk6jowtfmd5wpandiyjnp49shh6t2x3h742yo0cgvuyckeo4hl7o6ejxlscsi1229z8ft0w1igvte6h7bu11j99m0ejwlflerw69yomjuk9uvii197f8nksdvqlgw4l3mrpeg8ivifspj2l7ud8us6ybol9j7m9rxb6fs4yr9n0abh3d1wipzysv26vd98e8x',
                fileSchema: 'ktgx1ts1yc3smqmjwuw13qhcb1ra7f4dpyfw1z3fkmkllv9l6hyf9m2ilamg9jp391mnh23076xkqx1euj4b5gv31e5yo6khnx2b1ugtxtpzdx2is86u181eu4cyh77qf37e1cp08kxrd1v5k5hb3q5nf5gf1y2nvsrta3ql77mrepo11jnkzs2cqt86o85u7uyd5vl56vd85bop3zdspj17xjv3essvg2naob7oluwyponljw8y56c7rxj4st37p35hx2r1oprzpe2l5rmug75n05ggyt3s6inhlh9u8ncj7y3h5ook7t65smnqk482rnfh3unr0h7usz7n8mwbuxy0y6ablo5sa5myc5e100dghexv8y11fjfa9ah07xm4s6a64pbwfvmcio81ovt2o6by7tslagkisgqnvzgfjsotlqr92ugilfz2nu5mver6wfta041khsrit110resle0n9m3n20v5x3qjv6e9m3xl8sob7t6dar4sgpqideedt4iaq9zuutlf225jervo9hwvx14b45hax104nar047kf674q04yzdnbltf8cw9z6r26prgnzayu0iwb2j41r8sac94cqbgi378ydvhe4a5lltrlp1k4rgb64xoas7vnd6g4885i19buwo8s7br19aksqrtlhe867pysvpqc5ceh6wacopz0ckzwxlgprqmz50tcej5fczldv4tkg7dxbzqwnj6xqov8spq6u7i6m47zfybnk3in7tcztf3wrok2zlybqx454vi8gwa27q8fyblv5ix1vull75c25n3lnk948f2u9kqdrveqh7nlyph1zln3w81lad35halt23kxdzd3ct53x4gf910krc5q25zm1ppvysv2fubr8wwu2qj9mfzxrlawhgl47vsjhw29dt9twvbzxe687mpbvpm6gwr1ao3bs839f82au93rxhyd7p3orgbswm458eiai9j37o29cg2dbqs6zy6f8n1f29b5dv7fk818gjyw7mztymref3',
                proxyHost: 'o4dve0mgcpyoro5brymi9bxfyyqvkn086qm3lxxteb5trgcen88f90pjrngm',
                proxyPort: 3514582086,
                destination: 'gywjv5zt2emdgwq64l3ps8q13hk4ktmvghwepfnwbc1igjhgokr92en382pv81e0iu1reh9bl9l6gwf44q1cxd2yncr9il4yyq9c069ypnzah1kxy4cy61lczwltwbqpai0bkrw009mufv2nvjdahub7kvix4rhy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7gqi4xd0up3min0jnuk3ajr9xbar57d3to7r49gryhg9l7sfjh025o5b1ipo2mv09w5xuyytj8xmod925eop0euxkkz9pg1nrs5w1nyy9s8ts0utf5znhp0kc8dxqzfjt2u8zmvv351b63pwv85hk9djukat2m1e',
                responsibleUserAccountName: '9zg2e25j42a4akztytsh',
                lastChangeUserAccount: 'ufwjbdmvc7u2ftnj2he8',
                lastChangedAt: '2020-07-29 12:22:04',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'p7ju7074908kdnzt6c11zq5vc63wrcd966dkuus6',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'xf1yv1zk1yrdw794guv2ngwgwe9rk6mpj4gseulfa7q7xnbora',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '1ol1dpy74t4p2mf43rc9',
                party: 'xkkylus8b5z6by6dg8h904fg9d6zf46he5jxcvhbswlupnokov25jmfe54ew34e3l064i4a80s12k2dw22m5q64hisod3o6e1u63o9qse5zx33u8pncc4cpw7uywvybrv8ko649el8sywm1i8poo4muyfzim6vzq',
                component: 'sa6o9xrwfz3oqel7kf5vpm87cq0tgrwp932e25smvo32si8zzgchmbi44m4x3mkdwlzzy4rk2h49qplpo6p0h2t9ceito1pekbmq3dltpnhylxtjnbgeoe1umamu30omymxs2a3v1sjknqhdclg1thv7zj5skttw',
                name: 'tktfb4u5mqqy87sf17umga7ptysyb1zqjhc1pkcvin3oykvty4jz4l7b2d7pfosikdhhgn7pou7nndgu9le6f29sliwgxeppya85ka0wvmgyas4utl9igtb6e9j8tsnhmtxdxxnrx5gi1i8fqh5hjaw556uqc20o',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '6syu65504m7yh7f616ed9zvpuu08qea0ipbmgp7dgb1xbl4tlh05p1f8jhsqc3nrns2j153caxn4873niydw3qjch2x1idfqh3iv9piuriivblhkesk0fxv4g8yj8i91lpf0mc8snysog2w2wmw3mb485j6trw0e',
                flowComponent: 'zk9u5qavjde73rj3kzpfukwt1prwhbm6nwmbvpjb3444l5713c97e9vkbgvovp1z0z4af31js7wsic12lctjaoadai3cmvgs2lvx12b0shpyl786kv8l7o38plz9e1530t5h9r8w3w8kvprqitff29dycies9jhu',
                flowInterfaceName: 'pb932auy4sdwb2ig4855apvntm8ur9igg2jhimb4lhusgwh4fbjg9f3rr3q2tll2v9dr06mi57rc4kccyyxsea0j83ocz5u19ls74ltzdku3h2g7whrly44rvx9mo9lqk56jzu7j0jixgtmr51dfrysmyz1blzg6',
                flowInterfaceNamespace: 'wr1pxevwvlc7n4fcwxeothq9s16h0zmdxbwnjvuhqhh1m8a6b90ongmrgqzev0hm5visrsi8ditqqw4nnjze5qfpm2abf5d33cnqh5clzzkmlldhklhbg9m17jgqsporqjwudzwy67ckfh7z0fg7x571s0tg9wrg',
                version: 'v7lenva8j30gtugy0aa7',
                adapterType: '9fs7khzw059227u719lxvzwq8mhcejtrr1lhjnn63ywx26vy9qavlwhbw3o1',
                direction: 'RECEIVER',
                transportProtocol: '7jy9owel6jpfqa5h4y0p0s3s77mx8n2ci54v44jzd1s9xdcc05kxdoj20c0t',
                messageProtocol: 'z0em4ullginwhe92rasahvl66twrajnmzq7w2a4zcy7cvmfiyijds6m5pq13p',
                adapterEngineName: 'hwlzojao85kur06g3jmkegfn9mmjyawpgvk3zfydtx1r4gaxfqjnauffd0n0aufl4uhrdwazu0h4zr1h1elaiflhlhckaw41lrs70oybcsgfak9j6ybzwtaqtotx5eyolpzs8wroye2w9gb7rk0uf0vf8il9uhqr',
                url: 'q2yybr4azw1rox963aa4f967c864ene0yo6c2wbm0gt8fc6oxt4jvnltxfp3l2i73qfrw31w49wc2pqor22d7mdhrm2xeghdgrxnsvbkiu2wok8nmkkbiooflkvq7u8i5v6si247q1vqessrnrhrmgycc7zbn4fffnhl3aqwf6lbdyrv802z2jezd5na3o01kguhbbwxw0m0vxrtzrq23bc2johxsoekuzynttdkpea9d6juxkqf2b6odl9jfchhi4ld0jd6s0s65ws6t19t7ucsz6kqdr6y9ot81htbiob75oio7yztxd1bf461jm3f',
                username: 'k9u3fdr6yv9oaat5ssuoty2o81z0qpryrr0m7bbqtgw1vbr42miewbletnhb',
                remoteHost: 'wxscm62gns9abh60w90vr2s1fwtmad0wjxelom95buc30b8t4bg9dlx9qyyyw5fm4uw4ldqx5v1s6vcwz24v08eehflm05pqazyxd3y3i7xgzrgdr4oe2dvso2rcll6hvqjyfnw4wm1c4kxdugaiiy9ls2142t1a',
                remotePort: 6773827447,
                directory: 'tdxojejl2gy9q5y0wwohpsjop5zbjepqtanepvdw70abyry4rf8t1b6k54whlo0f3yn39ddij6r1d95ern07i4wpwip01q5422786hxxrjvalnrh4bj6qcigufgwnlj4u2xvpu0leuu76h9xewzxvdmx225phxei0poud5pyudub9fntiu8x6rc62u1ic1xxeuwjgfvb87efvojfcrxb9je1ogf245x0hli29wsqy2j6eulgxocmz5c9k4p52lxdt5s50npmz7s5tgcjo1pk4lggon2bevlt0q177xbupo05f7zjzlffha5y3sa6yasdzhuxo6iozi5lu23ui5i2s89nyv9qceys4vhrtluotfrvlivt869alonrcjrmn47pjv6d76asbxq8i9bololwy3ton1wrrbnguiwwk6juqkhh9sg99az29a79ewfxochgykmpjibbk46p90kvckzwfnfvnjz0ifacmxeppofxnc3y3z76mu6kf3a7u4mm42o44tyzy4y4elqzxicijllrt5uo3hjce2vaz21nbyrpo9fpvvpsbjkkbtteafuaa3q8ek7h66iwnazdhmpkx1u5w8f4qyb1i0z2x3k5ntb40ae6cbs448z12u6zubrlffsw9ekmalkxf5y2kf3asp8qmjls4p7qy7qs1qysxhyuf2kjz95unorm1iev7xhrh5t9wtqx5bh9pm1hpcha4k5ibksmo7boysfjwi3z654a709gfse2blnm6zgdnputpjojfqx4p96yscxo6qnl2ff9gbxvpxui8rxnp5t4tsqteu6gq32gpncgg3b5jkbkaznvnc1bfub076ajkwm6j2u2gxusps5sddx7iuyakitggth3bavqdn716gqi7egyyh0bcv66291dp3j7ejvu8f6rxiozfawpnyot6ajrbehj17nr3stiq298sugq37o4isfby39qsbdm8qzxyd5vr5fycsbdfzvsqk6ig5is1qg1tgsljqj3p7anv1fowiu90wfk',
                fileSchema: '2ihztr4pbm26y699jaiqqh5abskhybd8ro96imyhlqptyf1owf0kxn5pqaipdk6gzznwlol234tnpc5ryb5iiqp9cem5o217egsaud915m4lij81zb4xrz9j2xfmolz98g2k1e7atjsy3vt9ns85q0bn3hm0nkcfp7gubjle97n3hjov4is9sol8rsiirsp7ba2a4txcycjddikzeznr3ro1b2ojcvv3p4ku1vlryfpq8k62wexti5wk7pbj0qliddt3uhvxugpoch1tbqgfukhwpc2z5aew4ptxqxv81v6tl03nyruqtu1lbjes1qqhk0tnfozj3y1e4ufg7uf2dyj0qkh7pdvok9rj9e6c3xbok03ud2cicm8gplzevpjegz2hvmqzrgv7r2s7ls7a4nji3aam5ylgddhz5mwjp25mbzg28xwf92zxt66h8161ugzrjfd4uzzwf2sdu18fy9m0nqwosk7t7bcm6b8zamz52hbjrv4appe5hx2gtz2d2y3tad533c4lrv5ltpu8nq1etzyj5845ue25406xd2dswhalfukcolclxk2h18ti82elkh4mnlk0bmys7wawt1j2no8xlx00svmohoiekat33ydmxkjs0tl6r9xm65c77wuib4aa5nr68fldqq0p6a5ts70xpcjudu1rzsjjowy3w75j0cgqib55d5pcko5jb2cpe3oexfpl7x93hohswropcd2shcaafpqimwnmpi6k6tqpi68ofame063kmh44mohuofv1li1bqw05vqsoc9esezuts2f4e6qn6hohuu9sczs6m536zmis4dkhvf8me5yfvybs5iac7hlj0cnsbv7owc5t8lv68t4sqkuwd3yt00uoerk8lap2fr02ynt335hhiu5btk6x45g4u8yirshnk6yv51m232yx98n2jqt3gk01ka4muw3psv1pmaz4kbvffy2uur6p1o2v9za80w1wrqio573b3kort7kktnz0nk4oderabh4xm3e1gcq6',
                proxyHost: 'gwpxficwnu6pmwqtje0lyumzgszapbwx1r39a0rn0lshquw0650u5jhp36bh',
                proxyPort: 5803330333,
                destination: 'bluvnkbuvudifhwqa835gs4debceebvk8p3hzktuf9ghl3apfdt46dfrah7qy97g9qa8vgnev2k5ve1kherzp686l84tfhy70zd1zc6ygnj3w28twnv79ev1vt0x06rurmo67zx0wos6o83zg5uwjzl0lw0uqifj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'z3cto7uu6bedox81a230sx4i7f6mpmgzd46u8o14d6j599pi861ccpasluoel0e7fjvnfamacaf61db6rnpmtzl2l6gzrpm0ui5e8w9qydrfphg5xirydu5lgf9mc8f6gxt1cnnm2utafsqd6qvi3y98aeespyyg',
                responsibleUserAccountName: 'r1ojzwngo3haxn7f1q5z',
                lastChangeUserAccount: 'mnnwm13a7awcje4idkhy',
                lastChangedAt: '2020-07-29 09:52:08',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'hq8swa0e1rjp4mwv2tn8ivpyjhjd0qmu99x3zlnl',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'ba30kssdkyvurs4ozey0sjfxojgu2ummqw2x2p0s4uaft4s7kp',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '4rpxhudvyaul1ayuxg6w',
                party: 'v4uombfcekb4cr1vwx4g5ub6ou4nh9e3w3c7qus7ucdpvisfn3gm7j73m0pdt2f8fg2qfnph5a3ml2f5x0hmb8dxfbmzk1bv3a66zoc4q5jgc0ugs2wx1mi3mqpefbouc4o9554eils1v5wk5nmtru9tx0dnw83w',
                component: '39pry3xjifppq2wphfffqzghv2ybq6flojad55au7j7divn473h5zxpha5ltep2ov0nv290p9k4co9ohjrnyuqb44zzydkmk1qs4ihg34h1pahs25b9utiqv8yh4msxhfkqw716ctuo81aci6y853u3pnm9ze1cg',
                name: 'lx6bjqlfftlic5snerifbqrnw8lpx0uzha24c0hvzpnucxce20tkpbtrrtofs0fmijgxx1y6pou49t8f055hei95mh48xc3i8d4rhdv6xnn5whd5b7u3s01gu6x4js08q6mwbx4sjy78u37ozdl61p8p779tgriw',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '0ts6y3oh8u0wisifoirbo8y1f2hdtdklpifbbyh5ra5ot7v9k0xjn8m7g9yvwx4jw2l3ekt58f9otcgon7ffaqda8xwjnkvh6dy21dmh7pmbcc6g8d50avg9eg995i3npozhfb4gar8lopchl3xek1pw57bm8v8i',
                flowComponent: 'vkpsblc3d5v4vxl58crnxddrl106jv687uglr6fhyxxmlh8s04pt2cuvojb0q1dxonjrgew2odry7wueejevtnrde9rr5lm5ssxnbowzdvh600bhl4hvg5ejy8e438ycc5wirwy1g4zvpv0jxhn8bwbip4k9c059',
                flowInterfaceName: '0pl8vtmc0butv0eh5muwrjskvicy855d6i2a8wnt7d070c44edt4b3gf8qvilgsoproyyhnqy2hbj0cdrqp7mi0znz7i1xgjx3d4edpqwh3gxurta7j3rlxpljpk5c5tqt8gnhdfg4cxbvbkkgbm7gqbzgsjzw2e',
                flowInterfaceNamespace: 'g4sw3aisncy26nfdrhz3vmjam8a899a4yyysc50bwnqiax48u9zi1m2thsj3n90c5x7ouywxaqbx0ulthgihllr5jb8shkszh8476wod9dqvrxnwd13qroaszi3y6npeivf1kknlu5o6r8wq29yhjmrqe95kjgtt',
                version: '0zfz8muk43ywosbzer9d',
                adapterType: '9gv1giyxudzpmi7crio6aww4tqk534m4e0v10sf1teu9o4a46s6sfydfqvpm',
                direction: 'RECEIVER',
                transportProtocol: 'aw9s5vxma4gk1x9c4x4noeio436b93uo7f8g04ty31vt5nn6bhllkz9xwv6g',
                messageProtocol: 'lkqlpul89kji5tyh9gcqr6ee52md6275dq4uomifth9xfxk27opyxiewa97n',
                adapterEngineName: 'a22nwn7x01bmjuad65is19z4jd7lf826zemabemzm71jhs8jkig9asthds2cetrok2oodbw9kr64ompf4z3cksiaxjbx2mnosweil9pe5g6lcimseu1930uy68yfz98ib6flhggb1hp2s68zcan8hn0hsvny35c89',
                url: 'hnskwtmpwujd9yrfne0dejs4ubv60hin7cfy3mudvs8qczsox4hvxcm17unnfpacjlrw59gq6p2qvnvgz5k5bnc6x0arben298zgzhnkdgdz6josbloga3qhgmyr0b0fcqjhdxv8sqk61dann58bhhwxtvmxdigf2hdzfhncc3niqqg3hhwr3zx2rrmz8sr07b2hsnzirfmzanhh7x30oz0vv7x8qukpm7i44tvx3dbnusclbziv0d8obq04xvedhjp2k2zqn0j2wyzxc2pbme3l64phrzirf5kpfxr2vkk9f39r5f2w067ymno2giyi',
                username: 'tugy7qxa53flujp00y4feuydsknlxlycbjtmhhnbi06pexddc80qbti47d0s',
                remoteHost: 'jrvfmaeczg8r36ct3l21uds2senxdhtyzsuvisoo902ucrie8a4yffgkolypn18t168v9cixkupild8yuxpg197wsyq8rvp9efmfr9e352wj92fr4dovp9wtqiyti2fw5pa7x32buachc3mbc9pgxun60vr7rrlg',
                remotePort: 7719193796,
                directory: 'ej6j8qbjm3huuir5z443vjsj23vbmmzfrhot5lrxtvmpg7vbmilprde6fwlqers5qaeov85wn27r9wfi18aokezk3547juorad06cwk82f462vi2s8effzljk5jnjdzpb2v9fxxf4neorglq11s59nd0fg4hb5udtck9614upwum7s0hhzc0rsajirsylrhj9lf6ke5ux8g17km6znf88ww5isgu1no4j1x09osbekv149j6xrfxby3kwazf0iyrcl49582k7j2jn8b8lrwd6i8danfbpuhktb1914yha0zc1lvywkxzp2p81pqjk2amsuw1mnwa2os54v8cnzwjllvwwyr0krhwylh9xo5h6xpi2wmhezn4s8854d2glgf5lfodsdif9d3zks1kr0c4nlmgtmw4zeqi15a6vpfieycnp2psv1ktp95j8id2bzv7ywx1wt0phox77w2eln5wpo10piz1imlupxrxk8c3vbn9rrlvc2ecdtxsc11g9uacclhd812zgvw3kwd2xx0ftci30woq943cz4rlpc8yfqwmts2tb4ihu8k3brtgl3e91dzaqg19ykecj8irfe9se9q32psjojecdrvaxx19s1e7ac0n7w9oa6146yosp139ko7dfj68vltvcgy2uy3wxjc7rwpl3trduyz9wn39e5cxvhdaccbnklxpmvmuyqg6971ym1puveo0urlbgno96n6x7im1ortmj0gz5teflrhw2ucztv3r5vkqn5j0jdlqassxdka073hpsd5i638h05xw6dli9w3vol6zuy8ftlnr8dzwnex8odysbga2156bp3wmvndhgqia2gqmlgj63zyj2dvxzdutcobs8al0o182prjyfiudy7mznmk7hqzxh72ap59yl2tw77o8rvsa1v11270a1yic8d2ubyahqzg4n6m1fhtqqa7ydfnq48ofmycgr1wuaqq0d7qndpys72bwt6c3jis0vwo1fk35oljxpdge2ti65zfh65ecv243',
                fileSchema: '8v0f2fjmutc27sreb6zvgg4p53n0fpujqmc27ed1hh6adalt396y6kc2ko1t7xbspvolub4sg2tufip4i3gbtvw34ytzwfeg52rrmzvz7n5u5y8u8pnqxu13wsyyzw9gx5lvhrcfqo2hjcxe3rbvidoyeptst0o73uap8gy7whei5i71781nk92w4q4o03rqhvjh3dftwxp46v0lzcesjp86lebaqvbxty0cf9gzujt7xlg15fdkkl2993iciva7kl8y76mtq0h2xrxahlurrr0dgva1c9ztezn06ziqsjlbtqmx11gq7fy2v19u996psdnlmw5pzl7wng4to56ylhb1q8bgioy2qcviz9z7rwoqvg2ljxuncmg8n6fkyr11c1jij3sa8mq5narztqgn2wk21n56jhea7dmg0iiw9mtp7ilx8st9uaghrwgz2v3xnax2ulwz9vmqxsj5qufgja0u7jzgbveg8er5qmwsfjrb5uoc59y2a7othud5vteog56tw32wu9ybfd1ypuynxwnvj3yelg228k3vodwgkpw6h18ck5xjujiw7y9b8a2wokaues8u6potszmmsv2e8ai9x42sxt00qb4ez4l3nnyabrqemxq9esyd63ikiuhcxlqoitbxkfxgrgfndfk9o5x56qycd6w83keb6kvopaz9s8j0g34b2avarlf8esmvjs1i3uiy74h4vzfvuyelku2f1coc15e970dib4y8qobcslw5mgu5cqddirzq195qut29do9xd9zp33a6cnvdh4j0wyz4ft1j2612u97u28ahenr1ayg3pp8kzdhawepd01357klye1n1k81lqaz3hy7zz7koi184qnkkqzoek2pku3ojja8tucz7a21dv9hsxyfhjyvsnw22f1kdmo7l6fvfb2i8xw2xecwpwhxvqoha4cgho6dpmt126zbg6qjcj4rwsiewrz833yds4pc2hvptenpeqlnx28q95nignowfyxbdn9zyehnzybn1iijs',
                proxyHost: '0gbr6s4pjgy86cqa71iajkw3evp0owuso3z9l5xcf0gltq7rh07zyqox7mub',
                proxyPort: 6255390037,
                destination: '71lzid5wkew7lrnc6d59c404y6yc1tzoacuh19c6ga6jxhbtt5bz0f5a65qranzyol9o4h0dn9hp1u073llbeagc8kpszbjhqp6sn8a7wo22otbg1cijbyobxz2356dzfz20459p5i71jgf5drxgvnhc2menk8xv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '199jll07982dr10hv9rkm0r2dci4x5pnngccawz09p5fbbmf1406p5pwuzv30b1nch1qbwx0i1lkcxzzs49hnvstf7ug9c0rpa91ywi1w501e5ctht6i6q3pygcmk21n621sr453ozdj8l79zg1hy31v9bunxym4',
                responsibleUserAccountName: '4rzws5qk9owpk6cx8mmy',
                lastChangeUserAccount: 'c4fw4u9pewn6k4v0z8ma',
                lastChangedAt: '2020-07-28 19:18:34',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'mrxc9yg7k0i6x7duz3dhowjekz6z5ivbesw4ctlt',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'dgtys4pcej3uukm2g3g9wvgmqt3imfhscjohah000xh0vnp7tq',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'cc1b8t188zos6krasje0',
                party: '37kash1hnqgid1mnynhzw62jq5hutcn0dbvgcxtigeazj4085rpo0l0ustx43rqonlz9zv7mnjwj2bgjwvdnuyfi960emosta0tqw7y9ui4agymy10fwkib7eoewt3awinivij43cnxraqivxbaczzg20eywf6m6',
                component: 'hc8t9f2mwgex7nwr89x516l0ntte05rnljzq3qpcewj314qa7bdrq8rkujd41dais7dz5on9n92jgw9szgiee52i0e2ivrnk5sv9vuo5yuqngej4sr5h7fh10521ywnbc1bz9tzj2nsudndsirgxhwym333urxg3',
                name: 'erdc1i05fzwm8l4woq2mj7njic4zg2c0z3c3m8oei3ha6sy9bjzxweem06vsa40dzlv1afh9367m508i35f69ewoomdfs9qwf46pz4svttfbcy1c2393z8cr8lvs0mv3trwth2tlm8ppi4v7wttvoms8rv0mwst5',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 't8ha3sg9y86mlrd7ot84hiqqtkh7k3oct002ou77rzjfmuoyb2c3zlc08bkcdmuk9r0pw157a6a9cutg7sdg44nwtmytntl7hgg7au8nqrwmsl9v4sr6aigms8a8bgkuy6hu523g53i7p305melp9pevz5x9msyp',
                flowComponent: 'cef1zb0dnddqy467j635r283g4rlhbxn5uur3oao5hvb775kpdvohjfu66x6nuyyiwiggwl9lukm6c5ja3p36p4gdhr9uqj9suiv6tq9awd5qxjo69196y9bt9u65w6ohucwbt0fh5waa9tq5p21962mpjhgtzxv',
                flowInterfaceName: 'uu7lkk1npjz6m3oanux7pr36w7pyrw0t2v87ccu1vjt5rz8skhxw1kg63vgp64rqnjw18r9xk43tt465jqzy27dcf87xhjj1n6kkhz46ihfu8yfr8n1jyplr45g38h5ikxbouorimkd9kjbhkr3osfmizovvnkga',
                flowInterfaceNamespace: 'q0lvyzfmm9gqovhywtighhpm0a1kxvfquzjo38gmt6580099rhxom8pgkclu1h5w9wip86c9x1uppcf6d060il1jrkt0ithh06yhdvcfux24vjuw06hma2a9i46rv7814at71a4xpe52kyacoabnfyng6toodcvz',
                version: 'aba54zdwq8hlflhcte40',
                adapterType: 'zf2b8tz713mregknyhcvpmzsujh1j426ylj4y1ws3bp3b24mea85uubfuu7q',
                direction: 'RECEIVER',
                transportProtocol: 'icj0ad8lgwg5kgmk02ylskcp9y1ob8r4nfw6lmq3sbiax7pn2nvs9v58a7sv',
                messageProtocol: 'vcu9iv5229j6vcydawgb7wwx245xj5jwnaro3r5fvadp8lh7q8pjz017ccqe',
                adapterEngineName: 'lmdl55434qp8av7qmrfpdkwq5pieokxx9s866k51ti50kax6iw6cjpd3les28szxfqaggxcy1jpyja6n5q49of1iam3fjrjjyuub1ymzc3003wamhrgn1wb2cxp6c1n2tra11m5x3b3s2snqqoj134o2s60maooi',
                url: '5zim9fcj6g472dnzqhq1u85b8l208073arf8t4gcafk92q6f159vbsbyvaecqsfeid92qcvygqox4k72q85x64vmreoknftnjqn905z3vs0n4fkcdf9alth63kimvj9osyoorqy0f7bmjkh0yrllpnkk2c7ib83yrxkhdxstdf8ah1novs8x7cgm0xiwqhuugjvbu9fmykavxtkmz04ylvu276zvbxcloxkx984mm9xzb3yhh3873ckwedrc37rs9xoebpiintu40swbpoz6p13wpsg2mu4j73azj99mmiqnkz7z8ybiz7o23g6t29x7k',
                username: 'xptp9gs72bfgf2engbvmfpswpgzhm2hk60o5g4tfqo25za7zwkvw4g9wh1tf',
                remoteHost: '9hupeya26o12c6e3l46zhebxejdr1y66mwa01svbpfb9h73sp5bf6ath1gdquprtotzc4v34rneoq8brri2hgmjwkzf4t3hhpngeg4omn23j1f4g0cqkcwzvkz5ze3svxow5m0csxe4ukluy7vx837dzwj2sps6p',
                remotePort: 6417974528,
                directory: 'kr9436iusw9myw9qphd1k28uyebd3rvi2xpzr5y77a4alqwv532nub802g8jjwayg316lf992h2cahjdgdotq4j7g73z0xvr4n9v0facbtwll4zbw3hzmpng63kl33wjgbuwpe3zgcul5hny33xroqau5oxe92xye2rtnvp22wreezec9dp68cevgrhk9bu6q88rdniqlfo64smpd9mpdg8joecva8i1cgp74zhzbzwjlztt2kk9dt9f93gsky4lo2ty3zqxa659o4be4i27rizu5lh75736yjflsy1rnrj1fixi5m89idxj6dw6hxm29ygv43o396esfve8yx2da5hx5irxghra7ksjyuk6j1u423n8ejjgs6j6ex6i2d338saw1i0aw7sqpp4bejngg55ib6t55qq49gykkhfqkcoilahn4idskzu4ns7dceovxa2yjegpvew2d2g873oi5m5laocf8r0bzi056s07lepqi867xeycqyhrft7fqs4rncpcpf4251y06txwnv4j79eg2d2rpx01m2kqq3c3rj09fiefwjp9xjysxmq9p0ppoip9qxkzirbekt6i1u53e91eqga11eugmdgt84yptafpx0h87r4bxwq9qcw9t67y7pn6w08affps9pu9glewi74pfftki59zj1igueyzz332nuxz11ygel2maowue3bdcunu1d32t5s4vcfi3rtc845oyh8jqpkqlf05wbcczo9oojsr0m6luuxtp5ockvm9zn4tagrd1mmpppjeawdvdigtwhs777sqy7z78vhs6r0odxvaymyi8qyl5iaal1mfevasud06rgkpjc4flhxke2ylbadk3atj7zkopo6tsw22r1x85t7rxnwep662tn5lfqhxug32hc0n2v6p8a5f3wuoit5osmztt1q239xj92b09v8qdvldx3sx4093520mfd1x2bp1nelf5ken751n2jittu0i6rtn2z2jbzo9hnihl5fo9mel47fxjfwut2ea',
                fileSchema: 'ct4pfscq4jho5kyvosqhq69x1fr5bx2jreibp9mgiilde0gsdvmydxoz5ye50mxpcjx0cynovfx0ihkmg22qez7iqe85ns29xqw7w73mhghee3iebrv5gaynj0svf4gke6z7lluetuslcuq5b968thvrig0nskbrdxbv1f1lw9pg4nv8fdopzj4p4125st6s182xqk7afesxnjqi6rjjz4so7k0esncwv4ee5j99qhp5kyjm0dic1l574c9tc240025urlg4w2hnjb06bqmszh27q2hn81hsn9ji1vlb6h7opmclxnzporrr6sr58ikwkkoxlm623237te9hi0yif6zpr5ixjujve4ot83fmzb3qq3guce2z9vxrxwbv72d1ps64a4hajleyevxdl9pyu95mjdxafrg0c3bn902ynwouhh1y82twkowrzl8490cdzo8hi7k00xlrk0ixzcggys0yhqscqvn041f8wsvh3nly6584du6xnr9n73ur768hly4po8pts4ggcoib2q3tvaxaasnxfte1q24272gb4g3q7z7pzr1joaqmj4r8zz3t44tga7t3aml9cwu9sdsego7oci3kh8xo2tg60larnu2xnva165ixlcee864myzl26foysaymhzifhtvcv1mhy4sshb028iux8jcqm6cve4tq6eh5nfyajxa5q1w9vf1970w4os4w9njv8sfjce0hbbxwrf6i3pcgtr92gc54qgbarqfcuh2hegp4e9jyqckfy4p5oqvhbxopitjwu48opnkhadhvxuf4f8m955rqcixo1plzhmmmxycpbn9pv2w3o0k0mcz1g7o8dr3vr119eow4vhn0i88ky2oqrhxgjuyvmt5rpcopctoipm7whucr8dx6xg5imzxupzyhdbxuv6xd79oq424uuyb5mo1op4f1m0d0ca2sgqmhx7mcm75hsre16ugy8ljtgsihtsbmm3t5gs0cmsc9jlpc6f7kqzx28lzxmr34c2kx42qzii9y',
                proxyHost: '74w5bnltv2x84fkmbsk4ibjeotnjv40uqpkhpzapmpy6w8eb1t7p7famnqd2',
                proxyPort: 8660326927,
                destination: '1fr60qy5d3jw2rxzt6vkd4dh506bosqjmk7jwvnywt58pn380zu8a23nv9y142p3p319zmwbwcvp9i3p3edj0g0np0etz2q7kzd3w7t7iifa8ojjgl5fstcs2y3c1tyk31pneaukida9ybn9w2opuvq709e8pjd8',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tazgyzanipokcn45bbzf2ed0m2fvbruc5gspiw7aqr0hxqr26vlyvk4fjmozwhbbeq0em0kl86a3cqcksjml3jz1rfuj2629hfu2aqwetzfzezi1201r3m5u80m4efhqv3o9qsai674v6lhehc3alx1ko0ygggzg',
                responsibleUserAccountName: 'gzi6i0lqr1yl8svlbup4',
                lastChangeUserAccount: 'le9itst2nsyeb87h7dpo',
                lastChangedAt: '2020-07-29 10:45:44',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '26kzwdotpt3udzh8pwfgbnobfsqrwzdwuhg5btdt',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: '40903s4ts34zmag7zr35hpgrn6pdh5bp0wl980ch3nebs7sgdt',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'iu5yl7u0tvvus91rirfi',
                party: '2fwtdkb79cutyr77vyv7fy7lkddmo0j8j49ahc0kmqk7lz8tskg8ves2ax0n7s87u4xgdnie1wol4hoy0h4a0slyrqork3eaixssohg6c8rn7uxhwnl6sm6cjo2o597kcql1wlb26cdxhpixm5fdl6h808vsd98k',
                component: '78l7caal7a54jfjb09a5xkos6tr24rwzzys5yrl3zspjazeeioigkkcy5c0hnv8lyoexfaqtforvbnu3wl9hz2nmyjvm2j386pdg5i97vviw1zn1zem97f6ue7ulhrr9g3d4ijtnxpec8cbc2cl5wofq38b2z98j',
                name: 'qstw0y2y7cnkjr5wamqhbz4sjs5ayn3dwbez0pf9ylz32a8xib45p6m3mobl8zdwvsyvsxylem9j04zs1xk9okphfl51a27z4etjqmeb5xhmd6clvqiooj67qq7kgfrryb323a11if3bgdcbsnya9yl7ta65rb69',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'o3otug759c99l34lz8d4ji9w75n2ovas0zn623chmuhhsl6i0pm5bnf6umvxh9johbonrfjpo0436bw09q7lzswmj690t6gzxcrv8g6yknnyi1x0cpdsem83gkgrcpwgev4hc53qirqmlt690m4l72tjmfky6v2n',
                flowComponent: 'ss2756u6v67zeq5xyh5ytren7fdq0r7ewvuq3c9s31tvsrza6s1snjnhk4x491ir1adlcpdk5a8q1zplog6pw5u0dtrxhm5p4nz8umqqqr8bi8wqj7logv3ntw6s1yrzrtigncqg1zwv8n4ruk15uplb770qde4p',
                flowInterfaceName: 'pkucb248ia9nc5k7sk89psuialfbrqrmqz5p79ytqjkx0jno3pd1s263m9hftbhq71ip5nilirvwpsk74voa4v18r6mobmetrrz90fbq91pa00cszd4peoqy895og83o0fm28ltxgbox816dglofb5wiyfstlrbw',
                flowInterfaceNamespace: 'xhl5mafvoldqh4aeluulv46yfjbwklvulod5wsbjwtq4455hdydfx33gb914sdcfcov07h8bg226c4upa6m0f9gg6kixu7pus2j43thmhjdq9qheqyf5g35ehzfzpo3mo0yurpjcjxdcw4hkeirtjwsy9f5q582i',
                version: '8a9ukyu4v5i75gf9p6i7',
                adapterType: '83kithmos4oqoapt7hf6bsdeig8z6bp9bs1t4t5qskopt3c3652y4cxylgws',
                direction: 'RECEIVER',
                transportProtocol: 'au2iuwymk70f7quuce1td75u8gpi1pu2huutgvf1nuyhl9qzaj3f408dvkiz',
                messageProtocol: 'h4x86y3qfft0775gocr6k1f6pttrpepjn9mgwtjoqfa3e45ni9nt98yyce0g',
                adapterEngineName: 'izyg0vt9y6j9ialbmsws1cs6vdl2dk8bywr18mnjft0flqry0lobjr9n695jkn4cy7y5l4xby1v0uc416w5bdodsx6xdxghpu1ok8v0j32mwsgdbdqd13lylnt90r4uleptvnpv5s8udomsylja7d771b2bvbxtt',
                url: 'uwzdawm6jiysnvvyn9dfspaf6pb0b4xxt3vgep78wjxrb0sfe83ug6ieeufei2y3i6i2ehz5jo8kgmqemq5z4l0yghymfqbcv2aab1bjf57jeup4lyg6kqy0y0pttqvtw2y32w5ttm8rkug0ty7u35ja6igwfsdmvqfc2at8hgrwhaam4hhvjtt2u6oc7newrmmwtr39m4o5zo3p1f8mrzkzkn05ulr52zkfpt5uv5mo40pseprsptkofty20tpkvk2sjapeyes7ddc9jmkobxmxnzfnej8iwhz82afdtc87p33n3nmh4vojhw2v5zr3',
                username: 'vvkzaap56fciiruzb7ay672jz6uh7wr4nun8w76dlm3mozouqt5tgmqxhr76h',
                remoteHost: 'h8m3oubl3xzsjv8mp9y6rg2rfa5mqjwyced1xv5dqy45jj4g8emxh074tg4seolq8gu6t15v7gixrlainuyrf7hyjyyc93roohg4kp7o68kbnhnfdt88ngo9vfc39h1lgoovptk8dwqc1cknn0i6g53sq6mf5m1j',
                remotePort: 3336210337,
                directory: 'egmx4wgi8p1ymjb0b2uol7vfctdrvjcfp395f5182kibp3ekssl4jjjcgvh1edwhee1g8vy4jn6qhujgbjdfo3bul8vc7qzkku2bx8lhtdj5k1lhvy8j6uj6vxtf73gqhn9awnd554f9nceu8w3y9l8bb5rh5snyiyk7lo81q1ijyk6j5ex1nfj928oq8levs2ri4o2e1s2j8xrfs04znrypp93l6ymwkkkdpo5v3a9pqql295e5lwixlqsn2vak400cngz0uchxmh6bpyt45vp1q71z4bjyyl1f25p8gnvbv5njsyt7poi37bqb70us8u0w6ts8rihwaerwlynhes4q4qhe0dx4dlc00hpzd7bbbfd8eok5qy8zqekdef9ltp6g7wbbcgpw3qva30nphs39tqyc3j1zpyovm0glkkb9bdqcaq3tr6i5mfvyp3mzxyoe2xhgxqth70gnym011ggtgltauxto61xwzbm5fwsonw717t0l29v0tvomi09dbzoflwrff76f33sehynefy8i4gyhzgqo1ht9npz38cuhmovm7kex21d9odjo9bkr7bwmracjhpa2cb8u2m0xm4ma0x6mry69xfntgfbyqw86ymmxihor1miqfihqwv93ll2xwg246hctth24xl5q3bso8w8j91x1pfyo3wxk2ihawc9xkzl8jybgfco4u87vwep1tdxxkoa6a0hqks9wktl38nsc041c5y1q6dqdo35wdruod9zmioa9fudikjs1uvp90tg99veq72s0bbje4shpcg0vo5f2y0nyp6t96setvitwqgsvf634amd7thoez9rhweai0j2uavgha517sdneuu4udjij27sqwquz0dwebf08vxe6xcpp9rdvn6zn8oknv12msblrohi0cvbfan599spfh3b9w5in4u46ihsc0gn1lt1a60ce8yjyxf52inhc3c7k0icpt31k3um0tg7yjrrqn49ek547xwzfiue9lnp67fjlivu1itchror7',
                fileSchema: 'lp38citari9ls2qw1fqmcdewn6sk96gnuh7itghcuhf09uo97hd271r9o5ykcsa9xlig68fspbjdosewuyoiyl11hra58a816v6znyna166ck98w5g8k3nco8d6n68y1yhkqxut90a2a6h6t8wgp2ma5cguxg1tk22cbh01ncznhg04i4mmm8opsvwc6j9xzzg9bffm5fjk6dec28dchnhmam5xtogus5jfe5yjwcvvitpp3l6wxnmyotel31obj50uayfbsy2drayitkc99ywqcbl57p9ct4366kdsyaf4ei0yck2tku1ssyh4i08tvtgj57ybezjpu7p1xqyvf4b0ixdmonefljd2b9uabulk00syk7sn78ol7ymb2x3eomnv5t3q0txushx1kmlvqreo7wr34a87un6dr6i1ky8owjnel2u066vd27q4z3o6vpbo9p9t0yylk40htg7322qhxwmtqy860cuwpn8d11pp4jty1tawwvd14urc7tyic2oothtyvusok28pqi1lewkm81e5di0m26z3q0i814auytuuckube1ty7jas0exlxpv4bqjnedb8hdoj7tol54vldibar8gl01fkc21ofsdjn1kw17ozaonnj2l8ug1xr25z25y5fq67iyhzjz3jv3i3vyebtd59bpab50z5zerxil74p9kdjb3m5lz1nedjh7p524pxn5rfdz9gds0giu7ca533sq9wtwxdgfzhfaih0ngj57c8emb3sunrd3ivhpk51pwyj5kw2hvssaggd4hgqzy7vorgntxizyghxpl4daz5avf77kr7ufqorf45fr37fusurdmwohu0e8bw39q7xn4a7re33py6udlb7nl80z0uy1w1u2eep2fic5v1o0hqse3dut1ryvfzhppbgefkszyzohnwb2jz63b4cr04ean6f52fwqsn6adax10gn5jnmn1u4kobu54b0a3pjpz3sf0cgio34836ahbpov7765zdb7zwjwgqh4luqzzxv',
                proxyHost: 'ze4fzho8a7idcl0pxrja57ze7z57509oo33lliwraaxw42lgl6edahycqngt',
                proxyPort: 5864351967,
                destination: '19g12ndxlicnimc2yn10dkxn7oa4j2k00k5b2t1isy4o7lxn7rs9z6bejo7dqt0x44n91ywbao63v4wjmsqel6aoxiajfs8zya597ixr2d1s5lbgyq8nyj89jfvn4y6h3z6tusndmyeo1d005uj3xl03jv97285g',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pw7ontiq0e90slx4pi9cu5xpuo70w7xmndiw6bpzj3ukac9hxonwzrawych77d4adfj8vnkfvgmgera6k2vwu9nnwlwwxroxa0rdzsltyjiccd84leqaify0lo8pwdawwaabhxedsbevst1wp91e7hw3jpyjz5oa',
                responsibleUserAccountName: 'hyz41dk1ikeloogcvfxa',
                lastChangeUserAccount: 'eeaibnk7bx4ouf7dvqii',
                lastChangedAt: '2020-07-28 22:41:52',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '4y18fslzjwomuxjh9rikjlt4xaw2bwq4leic33m8',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'd7vm5rq94g4lh7ndul7fcr8r1ra358nqy4dohaos31yjysngiq',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '8nwvehvm6l7k4ncnfjfe',
                party: 'f7s0lrfnerkd9weaydq8sl6awy35a9eyi98r7r80ay0k1nklptk7z5m0d3ashx5bktynlwf916bggus957x9ye7beunaza8z3dm3hmen0hndivjdsvhn2p9ea0al118onsp9pc3yj6aj54f7242df3c6tre883wv',
                component: 'ptagt2d9s1p6sh5p28e7qbu39htfskp51v5ssvzcyylmvr91io1pyh416njnv0uu27riulmqtnls784slmq592pbgvjn3hfm5gtttotua9t8qhj4lgq02z0vj5g3iut9426aeo2xq9qrknsen7z38o98c3jp8kdi',
                name: 'f81e9pqftfkanifbg7o7a1dy7n8e3x5q3jia5jzz0l61cpebp8tl5v79aoo7ag3hiq6k8d7pvhwz5xq654ovvyds5vkpqbztrl8y71bvei4pbhk0u4rwgq54c8xkyv7upi46yaiybvp730ngbj9uz3x5kyjkzmnk',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'y61w9sbueahgl6v2nxrqxnovtj2p70m0saa7s70zo1sag0pabzwsrlxy8qen4hhainptrurjuzenheybn9pag33njpo9exp8bd3e1p60eqvyaykrfwilxc19sf397s95a76i6pzxi1wxb9a7lxlut2lwsin64179',
                flowComponent: 'foxhzc5tcxjqzzmk42dqfgkki953bsdrr4iiekvrar2ymgduu39ezfjb5h60473b3mjo5h2gxmburmigc0fq2ow6j968zuwngn7euhfbptrdzewncdrv1jhr42jxscve6r2l64bclvm1m2dbfwe1oxjpzw98nywf',
                flowInterfaceName: 'sb5zkl7pkgfp39k1pfrt3o6fnjsfnthbivicehcw93pqn0w6ul78580ss7iylg4ztx2leaphwxrujacrc2c8nu5bazjcw72dk2c5n2q1kge026jrphr0ah8bmiq6r718dvp7i19kbwv94bg3wyqml8rzc233ip5y',
                flowInterfaceNamespace: '6t1g965ts0s109veoztglm4rpgv8hvw7wj7bqemlkkr4ld0lupnws2hni90rr9zo4p7a7q8fbckekcdlubbojadxv6r5qjw2zysqo58k8pxnvs92s4ylll3y8pa7h36vdjjsbgfvw91ci69i4umgsw9d90px1apx',
                version: 'oiuixdtiqkbkbnug1epx',
                adapterType: 'er13ddc5yfjyu8663rttlrom0iuhokm8knrr266zjpayqb81tio8f4fd5o2m',
                direction: 'SENDER',
                transportProtocol: 'xgb2vp0ctmdjvzmwhnbc603u1l96oq2b6u79oam6r9onhmpnherrnjhkbo4h',
                messageProtocol: '1e0pjh7kdbys373lph96rmziol8m70jdzvrucgmx6wrx91yfuk7ss9ilzat2',
                adapterEngineName: 'dfxzry0r70rv6ewi6623ij75juit46rchm1x7fzqc4jwkv519wis8ry2ip38hymb7hmaf402njztnlv1drczw8yrjpe5n6eykfu6q2slzk3c740bkfq7qsurbtwngiwslddqkud14g2gx4z3tjn4e81vr7plj86o',
                url: '8yn0o86t3w2uov4xz9pt67ks76h2zkxswyzcbnroay3foqtyndbjiocpmsollvr80lc0lyt5brdazv3tihnhtzy99zi7flc07kqnl5rn6d13xskl9i0im5myg01oepgscrp2rvgvybqcq2qppqeavjob25o7jn154d1916123dkogt95w2gezf9i7xrshg7qdy8y9dot99jpybk6qpkbr2jl25k65adtlmtig1bk5fzqx8t72pv4iv6zsq3q4sov9q9i6fqdpuqt6lfpaqnb00nb4jizva7ts3lf0tffggy7z9yrmlom67pkxb6lpe87',
                username: 'fn5vpp26bnapy9gfimp2e5rqiko8sqzsuiabv4fgv4djsd1ub4ylvplsaifi',
                remoteHost: 'vobrs7skv19v95zh7ghnhu1y6nmit9kwle5pksu8m6mezpw7emvk7w4ktce9bgehqyhdzs7u08i1dpby0b5azpviliwtwsilrl2aaywy6hi4fx3triqrqzfl6sndln3s5uxapjfdznaide1zd8njm6zlm58stxlpz',
                remotePort: 4651445071,
                directory: 'nvo0eco9ksx01pl3ue69cwlfg8pjgaff8cwr59jzaea12yfwb4lhos487rzbs3dsy0uq30n14z1hi90n3tgvbcgqsu8wjc3xr0nlgyv5s0407lpzr23fasle3v8ejqm0veaqi9ux9raxfro1dddle4vh2z5z4zx0jf6qb2vn5zhaewg0lscqr8rb3neo8w8vbxj500ebcx4toqd5bpxzpx5zscd2nsdv3zkxutm5kufd487z7t7nx3yhjthrgz6p4u5waucuf3xhg0aw8fq5s916ervpsenm7inhrk5th2nof4v83uod3esmvd06mcj3hc4pmvmyh6r4oh89dxczahn0db06fe0jtobpn48yya0cl23xz1x6xorzvqtc5k3ix3akan0bd898e8mtv7ue5spk2sc4m4u12vmwpyvjbklmk33b8i2vofu0ke057ks7q6tcpul056xgi9ptnlkms0vrnf8bcaw67okknrwpz6sj8ng589wzrtmetrcxzshpi1d1qw6g1hqz8xvhmyd94x39cfknugbew5lmsmr6im1qtax2vx0n0z3eb7pxh9z8sa8dduw80k2l8hfh63h3dwcelx2tgeesihf9ieqhykra8efr5arxam7sszuvz58w6bq4o2jx4ddx7r0jsj2jfcixno81z73jtk2zhcgactt8ze5iaug05giybkmdq5scmgui16y890rclfg1a5au9dbw39u5jshmi4a6qed7h4bm085wqo16o5tu561via6mc5tuaxkz2tlo6t3alrxx5h4coojtrk6jckjtmclitsk19ct8n7bj2gfhrrl8qg6jr3il1d047fywb0vb3t2yilt9cnwe257kuta8as2hl4s70a7tfwygq7v6cmntpcu8p21jhup9s06f1noae44z6jj50fgpxxxut5hsq5h9z9cir6d93l8e9xtf1vavtlrmvl7k08z5wityc0frrkho3ckohamumggkc86c3z5ztyd0elhk6wq1qbkps8t6xahi',
                fileSchema: 'w3qml956uyqtr58ifo4xmscvia2w5f3nsiz1ezyyd05hf1wbxzq90b9dv3vbe44g4nnlaon0m38zqw4uyoqvo2mtlgugi945y9zhcjwgkwr567kgkd8kjb9fi5kzfgwytd8n23t46ws1k0dxu8gdbvd10yewxka7c6g53rhfj48be0y9l7phf5czxnla73js3c3ngvuxkqkdlny66xocblelskn4j7m0x9suh7d0cecaix9wdzvev6ae5dyaktyywuamiyfarygpn2x5cesfn3teahyb9dmac3qeztezqil1n3rrjeprmpkk363y036zib2y18qiunvochtonv8inulaba181rkcutdlwl5h89a6jnkft0txqufrvb91n2xzw70f9t52lnqjrwjkyvk0qsjppy55jiuzim9ifyu76le2ldk516zl0xnz96bew2ccynwg1n8d2q3x3xa5hlk5pvpuow9ymn2uzs8wuj54r8mcws9gp72g415t5wr0n1zt0m0uzxe7skr3c2jt61mn0txn7bk92d360wg1dtdtz9uhbfyrq3k0sp6113tg51ugb75c4qyzf0edpvv5d43ndwsmys88j71ttn7yra8wh7knh8y8h4uxeh2fxu4wk0oh6x9zv078ciymt2ju2ue3p3vz3htsuvytq79yifsx5mwuyykk684gmaqlrmweeo11c6v9lgul59pj7k96z6dvjp8tin85p2r9gl922dys7k0amyr7t36kp7kr7eutrm8cqjqzald29nrkmt4w0mf6wx0513fe8oxh9eaj2c7rm3fxhvurmiblir54cxun1r7kfrix621xnogf15fftvmrmg8xylt9mrgapsmt10cza5dotooa2c0yzlrsnf4a8qps5h08vmy3bgxygkkvdefv5ji9njc737p9uzq395jhjqp999aipn0r8xvfd17fsflfdh2mlx24am6fkl90nlpz5oqlf1cvdoxjt8qtzizv2q42drsosy6sugroxibmw44v',
                proxyHost: 'pbi0t7yj4wr0vkfdnpgdy5jwqxshhosn7z0gu0ojniwtgq5b2h64dvp6c3ln',
                proxyPort: 1380515803,
                destination: '1615wu5dbmz925h4oqhwe9jkhtmf1ixb2wau05uxjweb2duhu1pyrsl3ov7kyf75bbkcxagshuti65mrtynmqftuhajmvemplpblzfv5037rsvbuoeg6me6uoncx9lf7x4d9lbgec5bk3yqmslgw0lkkpn0telht',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wpz53twk5jh7hwsx5apr61qcnz0zp6u83og165s26iaq9kazupm5alkp5qowmwh7y47fv1laet746aika4f4jr64897uyluzq7u82089ff5bp4fqkx9410m73lwn18rhqoqnxd1dheor3fxmxn5jd4yvayybi2jq',
                responsibleUserAccountName: 'jndb9o9trl2ebzl9zju0',
                lastChangeUserAccount: '7560yfljz630k1z6j5sg',
                lastChangedAt: '2020-07-29 04:24:19',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '235rtd7ss5kvnn9bk5hzrxbpce0tlgxbb2v3zjsg',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'w4c7izpwvhesddogazjo3mqfqam5dzxau0cx621jcyl1rukiy9',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'ns9l0ebkdydr4i9xb54m',
                party: 'n1bo1szs3uckkmd05ope1bnba7af0zi7z7puiibkrlz7pzcfue46dgsp70iq7l4b0klodg6zzvhaipc1yu6q5z1podiaa301kyl1vcj108txuvcnhlwnsh0cz0vw10hx6xtp9hv2f0gvmj5ypbihbrslwlcqxx9o',
                component: 'dwj5shx2w6vufswyhq22d6vp23tx750nsplz33nuqxn6iafddgxrmjesdan0jq9c3avq4sukbc3apanbunfez3ru0ml4ftr6wov151u5tvjwn44wlhmr7tad07zc00a74m6s7ktjlznyhfumfouij9c8z7ri0rar',
                name: 'vxpxei162h33d23dxsdki5pvlbd3thkcczb8fq783zndmt1zsolwkzukft4sgjzdsav092d1atcbhy6yehij5jb46uvhhcs9tcbo0ebsibisiq3331scz6zsxom2d0mqwrijj1etltqbzg1i2o96rpkkyee7yfqv',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '6wavt58m8u886l56ydng0mwcm27fr0sppbhs3ohsqvzd3dx7o1iqur5naofgvyyc582ik50y0inyqe1e8dqfqraobay2p0fidu28xc1wz4hblfjg88aq4rpnhp4uygeo1tmu28ohckjzz99dmvcugouhqu5rhtid',
                flowComponent: 'wpq48lupz1j2hsn7jm57kpt76ahvumut1wy7dpxt1cw1nrk0zn7y8cg5u18bv6tteh1shzj4wd0fvbyukxzq108xybjkq62b520i7krgn7fzvgg7k3wu2z8x39fm7jtesiob2fah69mff2xbrcopf4bg32pwrwij',
                flowInterfaceName: 'y1xnhwg45t4kk2w8g9f3nlu97vrcm8qk9tqt0kyr7nb8izfk7rx92gfz6cq8loa4yeycf7x8hw1vsszgrnwlbbb40x7j6v2ehggd85sjf5b1bcagq1cfj0aavk1l2xflcs9qaivdbbk0ckfvjo5odh9bc0dkknk0',
                flowInterfaceNamespace: 'zjy8pimm1xa7ngbwhmx1nbkv4mktrhmzbxv4ds8lv41jqtg2z0zf8k38qb1ppbg04hf5knukl1p4vdwlq8zcjfdaodnrj8ob2p227f05qboor286z411jbr6l184cep05e0b757y6kdxc5bq9dypar71aak5rfjw',
                version: '3k1xhp8rlxfrbclwtfsd',
                adapterType: '8tvk56k89h4fczxx2xkptmcwcaelssyj6a53na1i5kqo92twuigr07e67emw',
                direction: 'SENDER',
                transportProtocol: '5qz8vex764o1jfrx5ekg31qvoudffd93yu9bjthwawk5t40tnrn46thjssgw',
                messageProtocol: '90n35evjscxi8qmnj0wt9xdpw379tun25j75sqjt8nzprl5s850es4m485na',
                adapterEngineName: '1okkvyk7myjj0vuy6x2pm6m5hzsw0egpofvv786vqngv7hs1q6k5oe9wsun98k4ndq1w7x3mhk90x4p1hthmg0a1okemj567n0tnfxsmdegpstvw9lhetxghjy1k7862pgaxlo5gwx28q93lrew9470a3gmuft69',
                url: 'lc1a1lbawwa56rn8iaa0k7bk8wk5uvnjzzntt4qpgc51ryhl3jrhmtzs7zrd244c5q0d6d0txfazbyqrxh3l5jeiprzezqa10xhtmch6z7f8kkcrai8192c2uxwg1xpkmo7jybe817uynr3zmgq2qbe0h6k76mvw49wcud76acjfbhxxv8xc4ozlo19nuh3geekbygfopc477s5pmcnuwt78m5uitf3biggwh1oiz1lzmsmw6llzeuyzf53x59zponr27xw4mhv4kpdhzi2re1t6kc27n23igtig3st0ib8k4s8d2wifnew8wucm1742',
                username: 'ou9lbesbsxrhn504lhe1zffp65o48ijciycsckzko6i7f4vd2ebpe1oc6iz0',
                remoteHost: '1p9n7i01muqivu8pl5ui32tfssl2yqszqkook7j7ouh0onnb6o5ud1zbw5h40ww7hg5sqcl330gwuftrm9hu0qo24dwh5n7inobey4qve2cnszinedtk324lb55gx8mwovg0wmrqth7nahovz6fv1izvfk6jf3m3',
                remotePort: 40839564401,
                directory: 'vb2o2330afhxz4yozoa63tijng50ndj2b2lgwby7tgmm6wy6t04vq5hm70468mvl4832jdzv3hr0a1ejsgskzrih2jkv54c5y3mrbh36eo2pde0mmp6ae2vc78uh0eala8nzqkkzz545bh1ynik31aas9ikli82m4iteggm8vmgp25pd04j9i56uiu4vyyuf6ls8zjewxh8j78pmaey80h3v90h2f89dsikft94go6l7ds3eekjlmxwdacfo70uwav2kf5lt0q8si40tjykrtrh0hg66dsy137s48vm8ctt4mjwccr9929a33ykustxg1viz03lx21jj4m1hf01fby0e8amiwjsb8sainp65l39wacqu167ar3nxpv74r2nfaimm7iuoj0h6felsmqnmxvulz7qls1ytmgql4tcn1qoxmwr9d5821keoq5l50ici9cjn5wz9k73qoe1mzuta4kb3phmyms0kudt5x38s3qa7hhixks6gxpyqoelg6uw3w0bnj2yxf56rblklf2kd6x4buet4gueo2w9bx0duptar1w02wjvmgae3fu8k1p5f7cdmnktlcc5kl8udoiy8x3lqo93zgdqyt4r8ymck4tkuagn3w6dmufslzk9zal93hv6e08h0a2qrc2z8f98vwitesj95apwdb3mopvm7bz4rg42mvbz5lcpkkcb7grbsmksf7x6t9hdlot4hn761miz6794o63r7bznsd8j1l3990rq3hwm2yau4axu8kfbhm8w59l7m0xoedk4qic38j6jgadx3bhuxr9ut2kzeq6g90hhn4y6xh4udmmihdicu3tcy8bgvyufu08oiu5qlvzb432n6fot1mgd4qbg3sloa7akjo69u63ll6yzdpk4jaosw820v7gg1bibl8729ppsxsacnl1jdm2nexxrunzyaorw9qswpadpnnnf2fwhyna2zorxcjffa2tavojad0xqj6zi1z4lwku6afhe7igs89qhs0c0n3ke743pqknuz',
                fileSchema: 'jmr2on4iqy38jr50zsoybuymk6xq77rmsejf8z42rabzailljpbtwsnc8wt4udsdk0j6dc0tntdbcnknjw5d1yh0d50efju31yfgt5qsi76r3hc6vb07k9s9rc34hgdoohbn0gzjkizwv15s05y1kv7jz78dsxcb49srlydxaci2t67ny7ljwxx60n546rw4zk34rfevopjrz6fv1ddszm24jq7xcgg7giwmvvfwtfit3d58myyx4sftx1tjypl34f5yigl3pb7circo4517kvb1ldo60vdsw49kqrytx8hb5urysuigmarauj0x1yf7knvads8j7swiogppzx8ebys4tletayfsnk72qy7zulr6f7h6d0cd2i1j6iqye0ryhp2p3jdyrwitgajkhgj0revxapmmwiop9x60qti80pf5t071yse1rw1fc10wi6jyq1lsdgz5l4jb30fbv5c4i4unc8ftq62ree1xw8526hubdbm0ckwc6771x82lgqfzl9iyzwyj12a1ns4fuk7a5kqspyyjas1tr4hckhr37w6yfyueu4jf64p2m9gyxiec7bpw9eraf1txww14mbj8u8vz24pks8i4rmkipm18rtj1jyvbvl6n7umo5on11mtgv4sru0phapnifko5mqwuvasawp7nvm37r82whhippmq9dfgcfz5kf1jpxo31ukh0fbjulmb7l7pt3h2ih2do2l9zyv8kbachtw6gz9pa1oerocy75ncapuurnmnphev93634jrlggil5n1afrd7hecw1heaf6skoevy58npmfciavp68u8xgxbwlnvc0zgvu5v6t6s30shlypzyfzbpsjr7jq3v9idq6yhcr2gcema5o9cu433yzffyqyog1lu2e33akxch4wx8htn4nfq3x1vcmc47qmmkukswrr3fc7nfru8i1l053g3ejmhtj51ee6lr8la4nbptri10wjo3ol4iyuhjlpyokofpq2ddxangp13vwgs4oayn8jv1lybzr',
                proxyHost: 'm1kzaf8y6by9ybyg6padkgwkngjbc592m04dki9ud04gwo5fmtuwfz9c92es',
                proxyPort: 5569144471,
                destination: 'yc0s27pmzwxbwoclqa6n52qlthq7jacd4l3ebdogp6jmabyn45mnk9v2keqymfz8d1lv1gs65hs2mtm1kmppkj8l1sqsil9exa0hb5a0h01g195cv0ya3nx5ohtrwk1qz18n62ndc5gx78bynfmuk65st7jvfvue',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '48rgrjwvu3jonjtlhtphw5l6gdr2vur4m931fnqbfthxuvij3d3m1wk4n3q7a1eyw5orwburcr712d20reghbz0e5f9gcbsguubmcykg14fv1t61lmc7ffmvg4bp1103taeca0xyuy840uhu7r8bvnjqkjhu21t0',
                responsibleUserAccountName: 'lf58or94ej76eqv0q2y9',
                lastChangeUserAccount: 'azyr9gatuce4h7qddk5h',
                lastChangedAt: '2020-07-28 20:12:40',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'lzq5os6dwft9r3wbkuw7dy2par8v9ggfp3ctral2',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'ihuviu6epzko0a4851wacvf5kdv8fjv0pr3bzivk1jta5wde0o',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'zfwi56yjqb97akhudola',
                party: 'vr4u7zshgd4424dx45kold8g3p1leyb5p98tcxaboqd1gqwfqgu03ej3eo9zlkd90eunqi79q3qx0hmcf436dl0cml9opntpzqatibxrmnjmcbdgfhgptyr1t7kmk0qy5qg0ddq7r4mmkcmzrr5ost0942hhfecx',
                component: 'cy9qfgc31icux8n6jvz1r7g7afh20cnzl0xig50mt9bxgq9ioi3fybcksnwi1bbmc2agkgpq4pveaao46wpcoun43kt0oq5lf3390tivtrlb4nn1lkfqoy6w6c0v63ty6ng0jwo9oygpmje8mke7sk80crr3pu12',
                name: '0kw85qv2ewl8s1f4iucc9zy0ou3ocq599rpq60q331f1s15w0bbm8jm3xh373mamzlwnjqnfdl1yopc6ln66vq0szeyu437nriemuypz6lgzg1tijk3zihxmxj5w76qzie7kabzjxg8ue7xk0fx49bxwou8hjobe',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'd9d3u0gb94r4p91j5o2kry6i309oewce08q9jz3bl6wb76amvzw3k29kuc827qef1784bs4a7dracikxqp13785sd5g09kbnm5giiak66yrpr7h4em32gi63v7knimhgv8fwd4juqw8q4emd92a2j9lmwxw6ynu2',
                flowComponent: 'p7wa7i9j7i8b5yd29shony0e9pemz7oh5semxvwfz5kcs2cgwlnowqmzrcwynmoaj6vkoz1u6itg9vmr942j32bx2qr1o9chh76d8qrrv508gaagxl4xq0l9955l64veji0plvxli1l85lxuxhhpc3tlmd64x0rd',
                flowInterfaceName: '99f7u2zex6i9icho1jzybyqtqwu4r79t5t63ncn95pt74xlq0y1v25bs1tvy61nyndry53t02q62bspetco57tu0w52hr2rlqw95t6a8saqqnrp6s4nhw8cx1bgga2yo9vsgnm4prc5u1f29i9zxc97auzv6c0du',
                flowInterfaceNamespace: 'ox5qdlfkl96afa8ayhud95bxy8l8v0ll86bowop9xg5utt3buu172xr8bsw46xowhjtln4sceu0hb0wr50lx7hn2zt5f6oj7g6h13v58mhpoqebmihurh2y4yz3prvousxfm2es6gjqtqh426ub6efcxnwq77nv4',
                version: 'zkd1wxtmdj72plhiimgr',
                adapterType: 'jlzbwbjiwf0jkez4wemm6mv5atje4tg962r69gpdqxokum2lc5lodkxhhusg',
                direction: 'SENDER',
                transportProtocol: 't2ezugv8if15r6quf2ghi5kgk90ns4qbhx3rr27t6kdh20hwji7bd7c546x5',
                messageProtocol: 'kurme7ckltioyxwzgg3j2lzilztufu3p05c94gqxa6vti2x0nx483xf5vwva',
                adapterEngineName: '7zcrgzgimhmmcalm91daajncebt6k8zxp2j5y8ujjgsum880mde461k6nk4jm7qihi0en7x10qip4wvp41h1bt2on6mcehyvnxeya8prgqrvp7af0jjzze3aoq6u01gzu5a55okpnc4sv97bep35fmhgii94lb5h',
                url: 'vvajxpwoyo2keaiy1bsbzaic4znd84of9r23cz9y7k8eywy381wwbn77fgjmr0h8fhsqe93g4dajkllnttv6w9os5vmk4dx1o49b3rf2yuiespl373jst9nj0aavvgo1z2qgeaciu09zqh42he2orv00vmf30g0wfkqj6o24038dien34roteg4fjjyuuar3274k4n7gm0gxuqam7q74v5ijcsu325nzuufgqjcl4zum8poqhx0idb6la39oobav6p3cgbenpk6d3fj6e6bqw9au6r7z7jcr1l1ea2t34927rh58zl0llt2b6m281l2s',
                username: 'g09ojz5vx17mbrmumcxvkhyb9f9yidhyycuaay3zmnioc6ffdorvnya1lxz9',
                remoteHost: 'euirv6w0fke8avekqjy0n6m7t6swj9y9frvi5t84m61hqjzptjejgixid2r4g60lkmnycdu96pzu27sd1y67d0s6td00j1xv49xm4a4eqhfc4nvi8dtel47pni42qjep483ch458xkdzdtnz94uu08k8dq54550f',
                remotePort: 2441237571,
                directory: '5g9jdc46f76pz69las3ncvvm5ypoli0nt47lroy2fqs13va2ciswrve12s1blvin70d9v7y49ao5n4goli5c2bjvgmtc72l3eqzh1cvq94ttp4s1eoexshis2e9gotg5uygdww71hchiqlgj4tiivstxnuhxfaeew8dcn8kgpzt8bldx0aq2ivn8egw6dnddcbq4420u5fzd07r2g04vs5zxyel2l1he80c40adut036mzsqlkivoj4ke0zbie88keol8voz6qnvie8666s90vqhymk6ar5nmclghcjhu4t31t8go9yumr0zw1ycy4id4o7268q1vomfx6yb450116qcpz4jo9hignuo55z6w8rldk75ztnd4vyau8d10epxuuwg02blnkbjcr5vi0v41ew3zn66qxpm1feihnro2g6xjdc3pzkzxeqchr8cjqjmce633sl7mmzwfnf1odmhjvvevi2foac8jtfb741jpqxv0y15hmmq5mbepxnktoawaz7mc3o2r092vraqoahaeq4ibrev6xke26g6h6ndgcwuoq2po4zsxwx1b1a4eukf7s8wgt3loyz5nkn7dmnfvfwgupskvgp5t9xf7iycjb1ge9ms3n6kd6kfytao5vtm3qnfw8m68t1gf3wygzyiw9ri6qqu12pwc4eh5avg7fuvut7j0lwhiq7apqq3086kj1nc5kx3ebabimfexc4mga9tszhzt2p602vbdgnz9fun6b6g6fmyd5k97vvsptz9jm2dslj6tdsdxctkeptl5wjh33iz6vcrexqa884unp0fej121r8pog2ba1u5wqixglaaggtvbm7k9ykxty2cek71ydi5tmpbucf6ecp2v0a8rvbscam22t46z43dog2v2s09wcintraauyqnmysuqcs5yg3oc0tmsnvso9uq5krynhe8f9si9z47b2zm9pvg2nfohr13hwadb6ikoqsfki96fg500x4z06vuq7juxxdp3g4g5zuj5fiqasy7ahrpk',
                fileSchema: 'ikwo8kfbjzb97jdiqu0q5b6wd08xycgdayvhvby7p1uf64kpuifwlemkx2w2hb4w8vv1cs4kiyhq8j6v8lg5ku32cvgs3vhkn8if3n33aao8db9vt55xqdp3rvat1wj7td0597jv7170v3kfxafoy4ldg1wuu70qbtdzh5l5r8569ptbapx9aociqj85ffjpxt3kcp6a3zy437kc4rpcw06xuexiwyiltcr3bs6gf6ut91kj3qolj0po9usg8iggthi3gjrebw84idyloryc5ki0hj94f2xsaivttw7dlp9diw77g32oiztpkn7zcovwi6dxlkhm30065bfzd1v6vdcnq3dh5h38swey0i4jqt9rajzn4czncuwmo8kkkondx7pwtp9qdnsc7u80zg3lm46tq1z3wfeq0ytc8chi5mycpb7c2agr9qy5xhs85a7a1i5vjdir2swp5t9b6wvbetlqwqx139qlocv37b8u653e26jx2i0mbgh5jsi1pd95zwm7pbfa0s4siizvkle9ku63zbxx9ia9o00drul4cxdhpfok4gabcej3sbp7ri0o9k3hlylbiltrc7cddke0gsvn2dhxs2ccc5abl33oy7ce4xy8d53bnxwjnosy1bybuhoyqxnbz2ihjnvqq9kof4xiote125a9i9eqvchj993pvr758nwrpuo3e2wpog8pvw0qawd5l8g2y71cc562hq877cnyuawc1lh9465zc47qkcz814ii15z28c6agte2lb4auu755i7iak2ljv5d7aqw4bzling0s181dv07bia7xlgjf90oibujpg0s762s62kh59fxfegvneiaf16i51opky6qeedrk54b24vadnoyio8magqxnmb4catqwscbh0mg9l29uhl0l3ti59nu7cwhjf0irr71td4qbzz57cx1tjos7wa31swt5mokk1tmw7qy1epio6tloegynir20tj2tpv63fn2iicvnpi1cs9eoankhp3v0kryzhpkj41s',
                proxyHost: 'p30zwgw8z799s0oig5qde8gdniev4ap9w8jkmvsb3p8j1lhuamzm09znmnac',
                proxyPort: 4156047860,
                destination: '8xquypov2tdr8m4i4793y06yjezh20qmlv9pnw6c8j18al9qom3t6gmdk2i6ssg1av8lqld68bxoffpry74ae40xc7w2lgo2t7vvktoxsfh9e7ip4bfluvc6hlt70057s7lier5rvow71ksralhsl75uiqqk73q8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2dxlr7ccad4iv1zvkr6ot5727zs30sbhczq33i017jl7b2w68kfa84mzs90mko86ahncvcrrrqyrgy239z5x0i4p6mb4kr4ph0y2eee7fx88ovubpltkhtsmre5fw584s0e29jucey3jlur9vntnp032timdefmm',
                responsibleUserAccountName: 's4hc5k3hq2fgw70zoi7b',
                lastChangeUserAccount: 'jshzs0x5b2cm9mbbao55',
                lastChangedAt: '2020-07-29 02:02:12',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'kbzmgkwkjaqb0q818ioklfbk0m7whmu8ke86rdoj',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'z5i71d3oq547y3cmwr9162g1fvz21iu0d4x5rvmtxxnj4qjojm',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '429y8zo47sm5xhuz49hi',
                party: 'jbs9o614qjhl5iqi2lijla3yq6ouwjrmz6aafde2233orb8vah1m531eobrlkvmjkpgypa057xkrxux9om48ybrg1nhvgl13go1qr0hwvdql6xbsnwhbbo9niimlzs550dg0v65u7qrianjff6xc2v0uzsetowxi',
                component: '7u904muig178hs039zjasuzpc8x40mtz1819p8qx9wvh0m2cirge2qh304js7k6yuesb6xfxzj4j8ieomshi8mu8fhbq5fxow8zium7d1tyftbvqud222jpkia9ixu3ebmpi2eixavdplou6xnoaol8m9y1jdxa4',
                name: 'ja06e5cea70r1pf9bbemonqbmd3oyhvray8lqxk5qkenpr124dojf5fiev0erwjb1ox7vwxqz64sxsgsivhnbuz7jwtj0860hme4j5apjgzqn6vcix1uwuwutjo7f27lgq3o0507kgpml34f90a7hbfa2k4vnt2e',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '8on0co2ttcwtlom5y5mpvc2r1gx4oqcdgkuz5djkhtgpwu3uoc0dy8vym8215ldz5hl4xjevo3ys7w3psy66xqpzzu25g10nof1htqm9uoickspc3xa2fcstmr07pt58trxtamjccwwjh81w25k4wlrew2i1uk97',
                flowComponent: 'udevc1mss6xpvoarz2pffjte8havip3d3gy9h7m1rkez2jupvzikezh44fy0r3sqvfv9rlnwseje92k8k1hv8346evt6zdng9hmmkz60auh6o864vs6x1hckvopb7foyb97y05hs6pzhbf3uiozffo7em2uut8ix',
                flowInterfaceName: 'zgn1gsoryq87l4nmis6ipk5q20s9kzr0cua7tr50o5pgecest9yg6dbgz445dbsu50elywsb7tkq46orpuzk4p35o3sf5q120wy8p64y8tppos7dmhrbipigvsa3iigdj4ew9lnc60wn57uih8ghx4ar5v3pagpk',
                flowInterfaceNamespace: '7y3gmye50vo8zo5s6vmt0srhywo7t83wgnd3bx5zo9744mfrgu5svvbt4ppdh2qo9i6f5j45t5aqd4haprrxp5rxb9fmnldn9we4cuymaqg9q7jkrnq4pgnmmr0ax9avrerv53t8b0pnd5eo5rjenwe1tpdy4nrz',
                version: 'if829hddbnnjdbsgljaa',
                adapterType: '51vz2m3g3ggpt1u7841ngfrzkjx0iveow3ab241tb6ryiigkp3mneqprtz1m',
                direction: 'SENDER',
                transportProtocol: '51rg6hdmbe87bsofwpb1kttukc3xtfe6bqfg7xebfsh20754uznp2wdcr65f',
                messageProtocol: '5a60h1vw4orjj70dxyi80d8vcwgxle9phxcomjdr2jtkdyrzb4ab7z5y8ag7',
                adapterEngineName: '4quoi9o1dc80hu420o7dc2jhvtv6bc2bcw2mlenpiogtyzasrf6uvzy5aj496jf3nfaj34971z8bifazaxs1apwb5b4x3xx05m67pr1xlq8725eqgmaw0oulf0qhp0s724hm0d6lv14c6hjuykvp70qizzi0f2nf',
                url: '5dl2fsvxb1e5tv0vt83pg4j8tx2tvdg12bnibr22dagbqapc43as38kg6iklmqqja7uz0eb4wvl5mjakopg5xvejcv13hlj3l1gwggxej95r9zexzpoj6eacs3ufq5ufia7m17lfxv4cnn7xx757u5tx693idh5h30lco86lbt56vax5qvawngvu1hobn89exdl3mems00e92gn66epjiproxdagqgj17r6jti4pxwpym1evvg7xk1mqmkc6p1nawvmlmodrmqnhrnz1210i3ny82g8qej04emal767xdqqw1g05epcrsgpt1tfqwehq',
                username: 'behiknlcov2lbwupvqc8jfnz10rkc5nhu7cf27outmcutcfc4zgrz4fr9e37',
                remoteHost: 'guai6c5eqksfsbu111abv9bkuvsebvlxk9fbqa0ckwnf207whty719sn5oor0vrg43imodda6n31nhr7i6zzm7aep9r3qzy6jvmh3nn2dfsjm7pk7gv0oxfv1a81ex0wi0e77d4w44ogt1p5g8uro6fuwvpz0yo5',
                remotePort: 8623218510,
                directory: 'dpbp8ke723qsn47ao3faki1de6yf78pmrpbhxffyxbap8wam3gzdei3rkwcx4sa234722g14soj53q5l2ecw197y7a6llcie5ne2n6xe7u9b6cuigb7gzntq4jsew0ybkup0b1bzr988mner1m6a0zkibjqlmd04zmzfkjvq5umtgxiuf1seh6o6kmc9yk4x249n1gkut7c424uzxftak0nb6p45m84k3gt63vanisa8lqxbkg68x2tqmudz22gl7nrtbvvs1p75a8rzi0zj9p3cs39m9ja9aack31myovb7ekxkat9ol9oyqexfnk5u7k11k4ztslvp5ltcur6outleanl5fkgu7ac2tst4sw9kq3o6o4ztoz06v8h5spylzm4yzhundpjoy7fs9x2v7n3yoxd9ia68penwsmr5fl496x2lmurxh9c8rea6wuvqfgtzckuc7a0myem96dam10oakw8brltjfi4onun8whxi334qixr643izj7pjkwe0z9uagijmta7ai2jye5bg8tmn3b6xfnuyvqn1h1yokaxmls4ceec6shtqnltpmjklk7t3t7b3pec7ak70l85pff1wz7k2l7kxeydy8j5rltnsyy8ppulao06svudas67olhpw0q7qk9ktuanudkc5iq7j0ben921lj4d7w9gxoyq8usjcie4kyzezpdwzxu1m1zpn7b9dchd6lvf3jivyjc8bkoqdgd4kdvn85n53r8cphv9de3827pn6pbqwa1uk03mziyec9ij55zplwu68ce4waoy882hpywzmmj70fj2m83bibcwzhq02n1wzcf1yphmowe0j8bwrzv0nulm2ahz671wd3stneg9vk4a8zw39i7nr7axgw6p6uudusph4xzgvl5tdvyncnrwsgnt4bszfli64apru77sgqn85n69mg38nle6xvbmgdwjg69b9l684kcb2ya5ts5rcl0yb5r1stpaf31ed8ph7jox65d89ojkv2ah24e1c22184epe',
                fileSchema: 'pr6u88usurh2r3j6rum40zafsg9vck42wrobfo2qpw64yv5epje1gnmcl1ztf91m3ucn52140uyghpaf1md23deaessxesnfn6idwagvai8gu489tvxhnxxzlpg6m14y3hlczi0z07txg4p9nnz2tx3hbin5ybwwuniqku26u9ezgeqk6p0naasahkaf9orgc5v1wib38u7txonrsh8y1a3vf0trwwwtdm8gjzua8cctvv7vfy1tku52p1fuh89zvtcx281bxd0rhlc7iau0gc1mcip64973c9bzhz2dwlotg4ev9kdn4jau0ikd2lsyhodde1shrzqyjhxnvpuqcmy53evbwxjh7qqstniain8f2eq204ka5wxmb0zk33ckm7ryer0u5ykc3f53j0ftpiwq9tlml2u2t8c8a3xmji6qh2dw3k33c253g3y4abjohiqz02a0oo7z0ra3ytznt3u9xpk2em41gazp33duq18wh5pivnurzx4egqa0b6tg75vk93qk6zii1qo9wpxq7cep8721r0swep25f8chivd8yektqu7sooz0x46akdkymn7oakpt2mtwx9v2o1vl27a5vy9u1lqibwk87nmy7u61sz7mnoviu82ddkelm03570kredtg12o48cj4im52dn1s0tkgivqmdfbyh44s2a937az6e1gg8ku2ozkxfjusskbttz1isyx8j5ifw3s5gon5qff2ywfvk7z917xbtw0567ryadxfndybktj8kwlkmwhrvfejht8g9oio0sx69fc7oz9hwbglrodeit0iyc9478u3ayok34a3k70bi57ews9v797ukoj6x0vnyb1xivatv0tigit3mvzxjemvx9s1vbgo6atcj1z3cjwf9vas5cf0j9mnqzb86uaclg84qqal2ueqtk7yiiub8hgzxe8a3qp7pcfmoom6lv1nyc251askcn4prvng8ko0xjpn97illw7xexntzys7wm2kg6cfr6bojrdoujekat0471p88',
                proxyHost: 'rhbnlbhc0290vf5m5663b9qovr7xy4p5093ydz78x9ejaroqk8ekar5hnmed',
                proxyPort: 5461187960,
                destination: 'od5wjvpiwkl5bc88hj4h6s0th69hpkx3awnww896ht5f525ebnn5k2c2ob566f6jchjzykgnqeud7aro2o8zou1464bctsusfj7as2u9ma2cvnoxverq7n3df0gvte0t1dweg30dvd5y829we9ngnqpa4id18dtw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'bmbbw214i55d6uiopiedkn35zj0byigl4xin9qqeolh1su6xw7yyvt7j467t3kk00dthxbw2dh0uktjpdsf0dm2y1wlen2lgbt93x74xm73iftjh69tcg8vay08w05zcoiemdv8z49l7gevlmvamhc52lv8rphtk',
                responsibleUserAccountName: 'vmbb4evjvsdxp0iapbur',
                lastChangeUserAccount: 'cr2izo8y8b7hf407fooz',
                lastChangedAt: '2020-07-28 18:16:59',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 's0smudxbiuz61ktet6dsfl872uks86d51dveqtcv',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'vybsps65lgjv2xslhi94ptune5ojwqhawnsmf45yud0pwcozzx',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'aycd1cqnu7244e3yxdl3',
                party: 'civ65mvzie477bp1sn2ac6nyvsr6kcht92m583c2zc0yqxvh46i70chp08wpniutr31g5ziinqtll2kwg6rvubsqbd3kt4hnz053e5s0b68cz84rz1jzzw9kg3q7uevdv7rewus0wkjplq91dqv5vfiivzkvwzsa',
                component: 'qsqrhkhhchmg4s6guiwvbcg7ziza61j6wuhzhac9as388uua2y9vc42ju4gi3043ttxjheifc279ipbqxtb67vh63365mqnbshh6yx4883r58o1fd30jmqbycdat31hw6bd9bvzrhqkyhy12b2zhhobb6ckhnxo7',
                name: 'gxhf96uy5vzempwuhg1er8v03kuvuiknubeygarcajludhgwxgc585mpjpxtdklktrvbpm5l72x3llryhkcrbzlcptnllnooyh49qnlj0eyvnlrewjs2jyrbzp4vgw6zqaxf62gzga4iq46k2cfp15rmkfgrpwb4',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '26kwpyv2dv440hiun3brs25q0ij5aom575xpcxkcj1apl5nd1ablo4n0chi5dcnsckyfga3vttrgqissl9zu95301ywezs99w20d8pwbv8fsnlchveqke8z735vwnhpclhl5nrf6anlro6tzln0vc24fkr27zoqv',
                flowComponent: 'vvh6b2yp04ahnwvlavpqxarphbhb2vgqhwguliuhvr20wq9mjya8gb28bzxohhekaf953vfizkpelgpcn7lnxaktdnm1umuygkaaiy03qb8094ffj65tm4n9if6a1gg7kf0puw2nm13m3er12notmknbu0ejhlgs',
                flowInterfaceName: '2mby45ugnmhb1ttcqg4qxlvo3t1aloh6l72ap1bd5906z4hst9tr3l7dunwgf2jv6a70szvhxjdvyysagtiybz5xrh9r5rm5lj2pwituajdd5pkksypy5r7g4jcobompaybi135rdiqqg92ld5nheo05nd91zo01',
                flowInterfaceNamespace: '4so9go6oix1xvo0yiayahyrll65c5c8e8c6bug5jn4s10esnapjf2w586dfxfttw45gntsu2oozo59nz3ixgzktblsy9m4nsu5kfjkthblo6ugwaw3sultvr8paoabynst8cfcs91vaqlybyzquenz8yqeyi4cuz',
                version: 'n9v2jqfsixosy561h4ws',
                adapterType: 'q5zoftbq60ijb45gtlam1gkteuoxen0vtv8e2sqrjjnkxv0fa8nack7f9bba',
                direction: 'RECEIVER',
                transportProtocol: 'tswy8mgduol0d0qm9d5kuh53vgd9173yj92jixg5j5fyff23rsc9yxl1d9xf',
                messageProtocol: 'd6g2l8244mtn2vxujhqt4xy9ci564die7tqkl0qp4qi0q6ves2ecvam1k6xg',
                adapterEngineName: 'k2rdj6dciptstm34xkz2u4p32c8kzbxrmmr0pof28mi23x7s07coco7zws2szrm131r9hnosykwfd0dj7n14u0w22lf19n3ct6yxf2uqc1bh4u5qmhd29gv492mu0x7bdnuuoi7et178sxgu6uje0gejrbw6k4za',
                url: 'yfbguu5h3y3ai22wb1ue169n9tasv6898oaps4fy42b2gkz8qk2ga6vyah41s9i03c9dqxjndri6t7pne5dt6w4516xraiq39kw0vce8ezowvavfvov0f7t2dl4iusu0wiwwohbqgn4u7v285p6f0msnx6oln6zori2neyv29na6793ekevyudm1kfb8t4xtjo5yuhsxhyns2djsksp5wtqc9csn9cg7iagzs7m73wl19n576mjw0qpywmxwol1lymevrpoicvq7gom6f7qemw5sxxjckh4o6hrk2talx3fgytk25r66wn8im7a89ee0',
                username: 'ehzbfqceibhve16tmblsgzsagovdayxlx80qty2frbk6jwny60fa1tlaqkag',
                remoteHost: '1n0n4kuq3kczr0phk2jow8ed87zc7lc6jry5fm0k71all7l7yfwne6abehq1ynk85zv631i1scczilbtrd8qfqpcufyrhjrwg1pog4orntl4yl49gi02tj9nac4lj91g131ee0fy1z534w66cin6ta4bb2kgq562',
                remotePort: 7527381959,
                directory: 'pugd5voxn87zdsveukedy8nogbopmt7s7y0yeivvekn8cm8v3psofq6deirbrcv8ogmijy1z546441rd3s2ntvpoctvioceh9kcnm5ln03c65tlv9swaje92n90nrkbrp05msegdxwh7rybbf3c3t1mw0wypead5ffm9pas0my2vhndxqbbez0tmwcsbrozo168w7g9owgy3sm05vjyrbq28jnxu811f8kdj6en63iouwylwcwirfcnofd3uguemjw53lhbicbioav0j9khy4gt4j0ampt1ytvm09gtofy8gzqfaiw6r7281tofsp2t95flvnuxkn2rotpcombu97zikvc47ch1pcsmqhy1nbrp95mtwp807c7lmht7ze42a6wi0bfsjoomvmz66z2frxb0lt15pzsnzzj902nwet3ky5py7ed4kzlo1p3ihynr0ltezn56qlsqzd9a4607p8qmrjuh4qvw69zwd0kqa9nwxy95x09l851og6m1qs8dix5elwn81tr2bdg3aggv1z4z7ps6oahml2jnu339rnmo76vtan54tljglrrf3uxei4mplhsyhmhm03531rqjvdzr2rmstpq1c6977c19zimjha4qi81aoj8vty011cnqo2jn8sfw5j7xw2i2aujcx9m6ecvfy9pez7fhtqqr7lypbus9xlt0ijbuyioazacicks68p8iimfwuldesc5yzjp1zyhfgpnexzmqv2vuczj5h5t50xkhox6uopuyds6b6n51t4ak6a75ldg7vo2pg28ullyewijcaq8ni93h3haj6kbr5dtwmjq6yx90kost1beuop3nuutp39j1fn4nv4ev0pnjp5px0n0ae9thflyvgc45rf5y1z2n6m75ntvylwefhbjuyv29kp3ep4gotslwmxee1c71d8g0azq2myjlbqa64jrnb4zi5xw7hrhbeg57j234bl0365oc4ahqnnc3ccivfozc0ad1bg06jl5m4oytjlqxe5jqnskhgk17p',
                fileSchema: 'djqvs1yr5llnpfy0xbt2lkrf4fkt1ml8t5da9jzqk9j6wjb1kwhxgqoakvleb2rmb3xhppopql3vb3y4pfyuf598mkz9ysdgfqsrfms5lcnej174h2v2ns3f9i8v090m6oarin1evdhtvdugxccdk6tvizjta1cgd7vbj10pnrxmm0jxs45g5qesyta5m6ta9heydlt8ih3erewnj5nwxe14pd3bka4xrscxhq654r4lq9d3wqwfxnqn554v3qa0kqcee4fgpex4tsglvx6ak13ymvycweingcvuw33niu20eem5n6wb0rx80t958md5b4jkyd3xv0kfx7312gzrouc2kbrwdk2ufev9ok3maa4bkwksegipo7lzfc0bw0xxasco5r66cho9q4rfj9t9h2fi3yc3sv2fyw6e50l607v5macl7ligde37y0or18kmbh80sm0i90ouwgzrm5jt7ck0c1phg46ihs9jgx2demcs5wzny2lzz1xnmb2c6cab9scqfhya3l04m9kf6s4tz5gfsmsn1w080hbd8yrrf2lebtfpbh0hpztjxsxyanfs395vwtihz0e1v2jk5tadqct42yiyao71tirvh7r9fwux9l4psl4xwhsk2wonel320m9c4hhg3hksbgkj2blyigux24cx6ts2en3gm4cb8e2rgbfgl7dgc42g428h2wbb9dvmusxyjx5kp0iquxkvvgx3dc8ifxxhp22v1keukv2kdgbnb22ytwkp89pcg190l18l0ns9s0mtwc8o6jawdtvxe97uakh2ak1dy1jzh7cr9564hwkbv79tmje11v0y5wqlpn0ngxvlie0gxnz5gbbj54jhpgtbh7dtx87t2yo4slcjwoo2sucukvvp3zknoi1web12co8ek9hzo67btomy0gzwdsxg5nk713wjdxs8q9yjk1k9hk63rnyyjiker4dwjfflhi9xop0b2c2uf835hd0j6l4ayublgtd5taaesu0ytbuifnqcm22aq0t5',
                proxyHost: '48evqtowudpbdmpcyaue3gca3q1fp9miimipe8mylc48ok28jiwjrfu810f48',
                proxyPort: 1375576880,
                destination: 'r33wq5fx2j2b3hjw6w4mkcpuyqbqclu82qn82eram9kj1sqhwlwv82k2aaeau8sjv3tuowkmz1yd8bufswhq2esjndchke33jpdi0br5q00rfsvhz6pmp4qsnh0dzhqgjfk6v6hptgvwcqxz93ab60weqa15joi3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'z78hb7f7acohp2mdbqmc4qkw93wlpsbruxkrc7md6tg9790mrp2cugwz95if5yhjmiw5v9jixtfa4rchwczyf6og9k0p7l9pjcec0rcvx55xd8vwzbk9h52lp8eabxb4xkfqge6cmy2c26vqvat3nl8ihjalnqld',
                responsibleUserAccountName: 'pbb8smgdjxyc3ax4gi19',
                lastChangeUserAccount: 'tpj2kbxqcbvuwu9cbc7h',
                lastChangedAt: '2020-07-29 08:54:41',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'z1ul5ry5somxv46yo9c4f6o2ec8251dm5x5ksf02',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'ngp45ewf4hu8fhd5cxm3vtqsxo30lno2g4se6atydd66kllkjy',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '05xapxzsamwpe55yxvbo',
                party: 'uizmuz94is422jcyq14loio94wwid1sxrr3avd9zl59oylp6cd7lkc7ex188b7941ma2auzr3ki0wxbv6pfr1k0rs2x1xr19zapp82mkr2o1lokxnqigjyg4p4cygwssvgkb7oux0hnsrh1fhduq7xkbxmk0tpz2',
                component: '2yria07ir34wicxdjtw54kebwh2i3m52wh9clilsbbudqt3jk0rwlbx669mgoo3s5yoh1x2w5dv38h8jvqwqz6mr92r1ujtlju8eka9qbw32sunvrp8j0crf0ao2ygasqf8k02gt0x5vwfs8uq5cl3zg15738mbi',
                name: 'yp8hfc7n96w3jnrmbjlwlq7r637ffumwr578nusglh8j31vgfsxr2v4jdhx1tgefrf90ea7s00i4w9bw02s3omqr8qjz0b9rxh9oots26pwkudkjr7e33pttlxvzhgrpo828ln3e9g9hnfl167smnqxqqksipq4h',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'c5cxxibky6p5upur0cae6c3vs4g14c2a3wdjqkmsu298nx7iu16d73m30hgnlg92770vegjbsl127pszb6a43zuz0u1b6hbtsyo3uysarna92azge3ok1s9n8nghgpyn2eib0hwsr8e4bczxuchajgv2ry08b6v9',
                flowComponent: 'ogz0iqyidfp09c0w4jjqedjgm67jlcj7xcku5uz0kpvzk57t9gm3j91yex2t62hcd9oiudq0qf6ptt8q6ttavjb30l1myomr5jw2llqnvexv4ens6i4mxoi73drqs1gf0jovb8rzxdav2freuz27uxuj8xrmcz09',
                flowInterfaceName: '1sd1ql732i5128xf50go598xurk9afwbjz0ml2seqxvaglg15qrveqk58cdh4zcetpg9mj23xam5utmta1jhcx8c39lgyf844bleco4kx60wmem3a653orb1570oe3982jgxlmv0ed1gkdzolonc18ni9kq19t7w',
                flowInterfaceNamespace: '21j53fa6j90wumd5my7odfnxhughlo1ravhtm03y8a5u32c14qxl6lxm11kbd7aqj5lmplxczxfox2eeulingxovlc4tflyatqwacfylfxbjaeptqctfxokr61x7o78ak1lmvel8gig33lx11uhsqz2x3zvg2yf6',
                version: 'nzz16zai25815y95kt5s',
                adapterType: 'vwmnk802cnmpmn88krepi3r7n1lzbsbfussvne4v8yffjmsprjqcerar444x',
                direction: 'SENDER',
                transportProtocol: 'xio0jbiq0f0nfx7p6e76uxmw8b3b1cn5tw4xf36v1gjopttrov74mec1r51q',
                messageProtocol: '38tl7lozshwi3hwok0qlypkdyaw6w1iw065f2qk2nmq3t5q231a0ijxwwnra',
                adapterEngineName: 'r59rerqe3b6u15nsedsrhuznv8p5ae6bda02pzc8dsoi0knfmj80jarhmzw9uw2nredamck2rg7j2o3g1af2osv6o9uf6mmdh7qvq9i2emrd2zve2dyvu9nxlpx2uqvuyp7fufnsyheanuqmazdgbi6g1qrm2whr',
                url: 'knnmezd4m32aabobaics2xzu380mkqu50gakiilnc05o8x1ipun00sv72g4qi2oxnmheyebgtnn27pi3kcrw1ml5x2efh67theob998p5cppvm2oo3z62ne8urjbzfpmhm7tbghnq59t0ylh2ww591126nthxh3nfb1m1aidwepnpb6s6nl96u8osf1xdfripf4p8m52d4f2et5ch983luck8m0vkxctcp2kavs5d7nqkbh23l3ig8b57sx1910q6zit0aq9vc3hj1vf9jmvu4xnmaaw5d70i0kj1eo1tm9aon8y2f276rvid9uj63c0',
                username: 'bcellkdefmgevkbuidxlu79nzbyznwsmu8oz79ga99ioo9pi5kb9xfuchsyp',
                remoteHost: 'um4u4c2u68ir0v8nzqxgv1jfetlnbkp4im9nboufhap52s2udkl1sf5nbnzinpz2kl5oqdnwybd4x1o6ztse6at938c62bkf6rutpsroejwqi3l7rnhlc7bg9dwhyz1rqxdccm4bt7f59rmchplqvuiu62hdt10h',
                remotePort: 5433854004,
                directory: 'yfwwza7oreyx1ppcy9n780k35utwqf8aqrlusdf1167y4dcz3x1xev8it8yrmjjom8s8wa208guqsnhf0yphe379ha8shekt8ql53k0qiymw0ctod4csvbmplic340d07rywvpe729jznym2pzp76g63txtxtfhsbw2ugu5fkcks4bcc8aryn7pmj3frj6pd5qps1y88jcbctoyhdfzm3of8iq0dt71nx5cnzf3eedxd9dwhrsfv8qp0zxbbmmggt25selgczs1qzjp137zdc05rji7wlktdn6jat0h1zt00n586j4o25jnkey8f0qrlucyozqgmvxin7novac0nm1jrvvoygyplma4ic7uu7cznhmzzrqn1x6qujyd47vi0pl9mkey0y5kvgbadtc84thxtzfkn3w1gnqssfar78c28z8w344g99nt5wuspyrqzgdmmv40npnm2uexbe5ghlisv4zdq8bfe9lxjtu96lbezm8dl5ghwkdbi4f4xnibqbg07hnyoclvegam3wam5qzuv8mbp3ga8mavtngw2gbqq0vxv4bhakshvwu17q491ezge9j4cflgoutqhz7d68kibfsxi38h75022zi0a7zccrqtadda77x98gd14prmii7ghefbml0mm3nlpwaclmhspt00zq6wfzpepzahrlvyzgy4gbjt3r33go5to8rzt94uukg8lj7cwhnx2env8va5qkp1fy8dpu94jg93q2quga9fgxlssudgr8hat3handxkz1juycgz80admqlrob0jdm5wu2u4p7ohs10r3ak64xu0xo6mjkk3w2gxv5iwcemjsgbi6t9wwyls83xkjakqkqx9k31f1t08h75w6p82sobrl0qnhn9x6jqhld1hc8mx8yce4vhc6vspmz6zmg4dqsfwdc512md17uyam9loy7wylhu971kgrzdvkrdzghorcib7cm1e5ea1bsnhs8uiblp3062wte4ebdjdk8gxmiln0jjaztlxwjn18gjne',
                fileSchema: '497tjl5a7vtwqgadd82chs4pjn1juqjr8fe71o93hcatkla92xrpobqcuttacrfv8wombkbofjmxk5lo8dz8e80sync7ax4f00fmc0w7h3j05c415a7ksspo8c77vb680n7t2tbn6ykuedakbtefbgj4j2f0is4yeujo1sf1aeqt7w1g1oax2r0n4j6p8ngkes03zb2vspyy011n47x9ox2w30gmk5qxcleb31a6640neav7dtfxa4sl34f9w640jura6igj2ubnbd5cbps69n76gdizod1v92uvaab37ccjvp78g1uts5k6mgxlkehgnxu8hel3ydnrchhizj88rkdkuqz2bzi48ztceqqmj0sfppb3lfssfkwza0wu9jukopw6o0g1fcsoquwxoy5lu0pylvvpzjl47p37ja6jk4bmn39om83hc93z6rx9bzz5aoybf1glpjrtgpkumkam5lz2jlm8h90v1xbohmdat3ye4cvkf9ktis6f2308zp5y33c5t9a568vyuc19x2mknkwosuqre5rluo81fgrgyxoienk39zv0q07mijev4lw6m4j9reho9dp25xs1201ed5y5o78j1e7vqb41bqj7r3y7segp3la5wtczr2qg8gpvna7ulhi05s8oz8wm06katlbkazp4pk1ahxwkicl4r090x09yx2ejsqjmbsbhzvcd7mq0cgt1rwdlfzw0gg42x0s0ao9j99j5zl05awpdzf4bms7ddo5rtnhvbalzl31iod5gwh38v90r67ybinh39fbyxy5n53co9z8q97d6g4ih4zd3tor544i9ozicvfc6q16oft8hss0phv8dg8erw6faxv56eun03oj8umct1urdgbnxb0bbph3974enxtfs1iqte1ecm66anh8t9uuaw3m14283fran752r7mlgeudr4q9nq9c35eqx28hcrxl162frqr7g98ng124to1ts081pv5gj2u21wlkhr8ai6h7xwtsl4wrep7n58lefaplc',
                proxyHost: 'jdu705y3c3rbwfejdqn3j8nddoqr4l3gs9e8jsydg2sw2z0zpmiha37rrsm2',
                proxyPort: 47315697130,
                destination: 'yqpgcpah0xvg3rzu97p4erzpiav4o91fehwi6ehain339wpvka9ub9k9j722sm03kt230reqe53v2tg1ptpoi7dzq22cdnnobx0he845gnrqhnbg7jrfe8ge86xjlemnzscl0xo2wa1ffmgkygvgs6nnbb308kkh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ex0pwb34e0ggabo8kiv2qglg2baes8l3qxeffsgef8mg4pr1pgo4npq3c9fxszxedpkqvndz40w47ub554qgd83qao3qmkyu9htk7564e5z1s1m4g3iarbvag0fckteav3etf6lochtnbc5lx0bc6gvxfzy78i56',
                responsibleUserAccountName: 'nc4jcxluehcxw2765dgb',
                lastChangeUserAccount: 'gtiztfcfqpu90ji7r1u4',
                lastChangedAt: '2020-07-29 15:00:45',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '21gip0q54rav9l8v4bm0lj5q4a3km7lpw6frtf78',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: '9ib5ncl6drmi7de4matdm0nvllpfpsl1zrvina7hlvprt6u8lb',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '6d9kslsar8uklstotg4x',
                party: 'lcbm7cre4rkcgzz659uvu8tlv239upnsyb16vmztwfcmm6gw1nzv7spi0uk55iitgidb47d4jagqmm3u6l1omlnrzu0q8d6peyw3fvi03ysuqknqjgszi0lj5rmzf074e2hbk2hciqhwi5f3tad3a95uaytnfmju',
                component: 'nuf0z73yuazqkfndo1eayi1zd0jv7fqav91pth0j2iyrc4kmxxh3xv9jg01kfjmmko1y8shof8dkwy45rbxd0fb0dhhb0prwlemf3l8q5kyc1wo9mrbwq3vjtt5irrk5ecu7ygq268y4tfnmrw4g0lsxj9hu8k3m',
                name: 's4vsv3buhqz19ifxuvol6l1ya74twkwgv0hlb2vihfnbw4v3b3w83ui0d24kralqzbjwqpvxmanyethhsmwxdxeczgiouwraji03ue7v888js0u4x7xlpr6g8gftuq01t51f7zzj5xoxdh9jzs174dpxcjfeusro',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'zcq5udftgi75484mfjca51h7chm8ocpwnecxnukw36ber0ewbrwzbkww0y5zy07nkj4fwlbujfm0vyfph0wqlgd9nsalamndfjpomrfvwpjlj49r9nv298fd6bdlss8yuv5909da46t7dhuexg1m3me0q3qztg3m',
                flowComponent: 'mikun5x1wyueyyhw0voyw6wtt2jiopokhj0g2pfk75ld6pnhuwqj917d29dj1dlal263q4spazj2sp4bq8tfb4brgl6d6ztbo151ds7wqmabhzslhwgenzy1y9e5exhg5y6di6nxdkolblzz44yepn7l4xzh2wnq',
                flowInterfaceName: 'kkkwr5xwqy6zexsybr3udid49divghf5qqvoc5kva5ty92vomyq5m3pvvlle27vb8tcl4xmg1zt7qoeu46vyj4wvzs8f9vsgk40eixzgnbtbeu6er0pgzx4nqa8ml7fjt29smdq2m5d0qmdm3km0say6nxwopj08',
                flowInterfaceNamespace: 'a6axp39aj7v3644zh30xfw929d4sloo8inv9jl8tig81e8pjd774jdmzaurjt5p3bvnbg0jr6v3q1yg6cs17e37aamb5qsd80rmc9wmq8g76zrembc2u0fl41mkcogwqh2kv3vssudtj0poleo9ul3d2d5rjn4u5',
                version: 'uyfc7atj7mokc9jltt0c',
                adapterType: 'ridc8xxv0g8swljydm3pwhbym2wrcqm1w055z99udnmt47rl2ep9dy3ffrm7',
                direction: 'SENDER',
                transportProtocol: 'evglmwpfuzjn084rlbft5f7745y12p03uygzzxeem8sphzz0gthbsrp40awi',
                messageProtocol: 'i5gj4wbabq91djo5ozy0tel058gozgxh35bsc6qja03xtbmt7k9wnh3mg85t',
                adapterEngineName: 'eymnp50a2st3720ys304lxqdwsmsnst6laxj4dnvlznjhaz06cyi7h583vl5y6982tvt7044o9q31wui3iqpqoh99u59e34v1d6vx3hhlpnasc5qnqlblgwbuifn7zp37py1trtmeuqqx8ivfiztmq3w0yxzokl9',
                url: 'fmslj21hlmphi25z1byq0k1etfumqk97s9o9n1of0ovcv4pnc825gqtltt4gj32ej6ah53rkdvto50z770zcjyem0u2hnyajkzues5ttazv1ezdjrzopmwd09nwjo7n10a6iy4qwmtfd0mzoa8e2d2l0xyrxk8gceozv844up1qcuah6v0bntkgdkot1b9hn0ge0uf6mz1za1tzdn86tk91pdky7we9suewoaddwrh2er1isba1al8ot10q4mo8ndhex5ajmhv095hctdcrtd0qwl7moej9yxhkvgn908m5tsdjdxhwv5fcwjl9adbwi',
                username: 'lo4lzayzrmlhpm97uafku240zjjot6fwo1is19bb7bn9a0udmt6ctzhm9g4r',
                remoteHost: 'n6iymma33gu5i4mekusrglrbtkq8ega04sxevlhq8j5uxpwhq7zyifvp4ovos3plzy79xrjvi6l3wtucm2ygoggxuyppa2qwsetji7pge3lb18l2u7mv0waau54nqtu6ri8kpculeu5ffsu1y0wtrrmtx8sgxs5w',
                remotePort: 3148691081,
                directory: 'k01xwyb5ocz87bayce9jgjgip9hxmzdqzc07omfjr85hcuwmpbkcef0bm34op95vxk1gxvra1w3mxgtwzf63qv24lmfy4hee8bgtsseuwrwulmcsn3uqzcc3slt8ho7uqth6yony23d2eugojuofzx4z0fpgi3bwg07rsa406cop3ii4kfpcxsri61fiey21b84iinqc5eqt4s3n1rdpmd7cz4rxrzjc2sacyuiyh2barqe3hbq51ye2k8bgjv14dfj08fkgupwfyrv0q4d480ywpw1nfe6aijq1gv86a31u7wrf8tbcr2e3rmm61y0l4duc2n1jex1pe1izgm19n3dhycyp7ey6j24ewolgvedrqt9oiq5vewerc0detccyqz8nxgpm7mojqqslvvh50o90d3o6yr611fht9wsxinq75csbhphe8sdj4lj8d7kulnqf1pdegv74s5ry0uydt9zmlmtbhpjwujs0j36avph49e7qy9jeoeo9z3msno3jnc6rznkga1ikhm18wkten47vmmi52zwslkk37k3nrygongjncyfd1v5gi8xgfjuqki5ritrnwru7qspgc7ibp8x8859vxi7sde0rnfnf6vet9z8j57dwotg2l7n0hb2ua8cdh8wi3mug2t4jgt4yzpnh0p9fj0vjoj641bt0hrr0j1y170x60tmzp145t3us5esjexpwhxqk48vltwxhqsofzvvow48su14x75rtetys0a4w82kzs5ibx1x7z3s76cskmolciy4eooump9f8doxr1l348endc3qlc3y1nunnfqrs7vdwg6hyqu9h1zq8hxo3bjkaay2ksf1z5brg4q3kgz0hfenkp3ba3dolatztdsj0ot6eoac8tseehseabhoqvsmr9lrvt1nsxkccfeh016l3jiajy03j8hc8agjwjk934fswv1der5z73lsr7c5bswatzdw7rrspehcbhcr39jm58atf4050nzr7mqjkxnuwsnt3oj4607kw58ff',
                fileSchema: 'bqvgn454ibdct1mty4l2hk08eq2iourwiwtf5wejvsudnaugwjkvwric2iovf6jtndnzbljkh3pajt1jg1wzedhmah9rhwhuejphf59ywh581hzdo89mklyrqc1kkn2hwkxz1v73vgif1upme3g4weyrec8mzkl9ksrzct4p2uw3l8n37m78jbwki38q88u1aedztfwjg1xsmwjuh3nzzfejifqow8n4uo9f8an314souquxc5z7egor9o6y6ikcyululk0gfp5k10b1vzls50pplw5zr136hch4t7uswi007b8hv3ua7qmwiym9ytahs82dr23d1xxju33p33jw6ghjv69zr81otb87tcs49l4anta7cr326wdv1b8cte5gi57n1svdqtnl7sq9hqvleggsi5ghdpolap6ccbxf7rnms7dblx6r0hpfbymp5up6ammxbkrz4qpb6nsd1fg1pu229dupc9eech44v29ge9b2s6in907mqjc266e1akw1rcudnvou64ucaimud332eednhq3rmdfgr595i54maa5say72gswdvivgojw95u274ise05e7qgdft038k0jat05a308vunh16tlthkksll6gb93i820bds66hsj2x7122xfeleb02xj8fu58potmwow042y42hxv2lauy3m7t76iicj6dw2j3stv67lyklxsh8dzc6sv7gt2t5gpigyzfurolpc15fn8zr664abg90kccx2n791wrm0afquh8pre6mb3npn5jy6x00p0kmdzzsg0l4rxi9dbvhgsbi9sd66eyna8f66miqr2nykn8gkakeumiax2gq3w5wjaa63dirmgadcqjtdlrtbtaplo5nynjf7onn8jlla2ft0htsi7zm84sbyoy4ffia7rft195b8lzmtjs5dlz0fp0xj9z7ulqr9wsr8lmj3kkhbealy56440xs2ujxz73slc0a4jlcatp8otuxbxph38lo9d2cgd8g43mbjvaa80gpvbs3ft',
                proxyHost: 'lz618ymbyimike6u1yftuj4e8aghj4ooxd4tpo0ue4zxuga8zpv3mcz7lc8d',
                proxyPort: 3758197324,
                destination: 'vicnmjtdi61aq80uayp2a1dxu03rdi8pwaeqhlgdyd1obmeerqbzhrjrnapt1r9gyokxd67avh0jusytkvi91al5653ox3mhmlhr5806w9heqwsbervous7f926vh5k6pot6f5thuy3aop39vpf9f8eqaou400g76',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '92fbk654ks66h8msg6eiludadh9iqqca16gwvu2gbo3k5xgf9mz2juki1ouj5pc4yj2wfgy5q75vbqagn24ccbirncyebp5468ch8o0jzvjv155oau5vv8k5851y1oli24b5j8s7azcn3rp8bzxqgbo0gxs03gds',
                responsibleUserAccountName: '63fzr1fhyrt0llwzy7zd',
                lastChangeUserAccount: 'karlemuuygkclq2gsm1l',
                lastChangedAt: '2020-07-28 20:21:20',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: '26wsyw9jlgjl4xgft1aoqvgajm65gyldnjo6loi5',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: '8atdnjqaapq073gy4hbo6cky6t14c4rmj3hbvdbs0yu3z7pvwc',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '4adgl6q6987bwskpwg8g',
                party: 'rmuus1zmxql7giu97ed502atcu3d472c29n4bgy6t83vivhat1fg86vc2g0w6g68f1vfv5p2ky7j6c2l35fsp0kta3s86mzgkoyoch77lxiyp8e106ti986e1s0uqafjareut6p9thvhpozgiothx0nzu78409rn',
                component: 'm5lpwgjuzuwcq800ykd6t3ul1mixs2pk7qzqgeup4xxr8vec9rzlk7swf41babg8jh8l6q73ir56snq8bn3alaocy42ze7b3cg9obqsdc14jiuhgtkub1hzy7engr1jyup6jkrmfr0rn8ulssruaxxt6uvxa5dpw',
                name: 's30cc1g0jyagplhbbobkgsuk90k6vmkich27578ckgswribtxxtmp26exi7zvk9ki641ww10uzzmtfw9c1nqfylby2bxx5k4im7jtjnojb9oz12cvxfawry8856dh862qvktz7y5x58wnf4j2aegfz0628orj1kz',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'hkcbberd2p37c2eyyapdw7wx84ulp4vmd7pfkb56vy5nw38wqwpt1mausx2ymqxvhidm8v2k3m6zn9r2vzsmwesg12tuqdwok7fmfzj3gdo4z2arohgo1t8is9zt4qvtz35qjtk13lirpwrlqineloxra4sid2dy',
                flowComponent: 'm56xg4wddh5a3ugbioce5ahk2qwyo0kfotxq4eto756sb7t0ohg4je8g1a3nw8asvmxplgb82z7298abfuwh9v0uj36bej5n5k6sjclpcb4x4rdnvtcc16thnxrtzer7ggsh8c141589b28xb9mzkdo81wkh8b1r',
                flowInterfaceName: '0fmtls9rqnarh9n0d1w7f9bhbyay5xcbvgr1rcg03apkf96mcnh30l2pkwpvx7fo3uicgo4bielqo95vzbuh4jt0191ju5qyq6u2igq1ck5k7xxi4qnfqi8vknr2hny8h8bk1bog5c71u9aot8e9k4gh6kx830d0',
                flowInterfaceNamespace: 'i6bxgt07yzu8ztpn3a8cdiojtufm0sf1l8c1hzlro9s18aul41ajqg2atn8f4k1eycwp4ukveydvwemv461vei9xhb3wef93ocubk30mjochcbwmjs3csn1jl1ntjbg6wdn1eobt75dsgu2chfiwb7k9005nbgys',
                version: 'qg8giym3xj10x38gjp89',
                adapterType: 'tu9mco4i3w763hpy34zkpjo56y8vy74vuuo3ze1peyeu65p3l48s6f07co46',
                direction: 'RECEIVER',
                transportProtocol: '9kufvu3zgp1jnp9vrdlfjzpq8iieyykdbiy137ypptkzv9rrdst9vmv4z3ws',
                messageProtocol: 'tiuz5tdmkex623t6zeqwxxvj6a1nbjpxov8x0dkfjlyyqa42sh3z8intsa75',
                adapterEngineName: 'axfrb441dfcmvc2fwxgm53jzyes2rh3vaygnybjdoqnkus96bangp9jyxhb6wt1zpokxkb9rge3cdp1l2u0b17qjkl37ka6b0rf2qlv3lcb72wi9l0lngsxs5ixr25xlmld57kic4rowbqno61679z93i1n7jtsd',
                url: 'gyu7v9luwm39pgz795jwngs2v66zvab4590jqmu65403crjvqs7zmxy9634lpv1rcnu4q6czc78ob46wxiat8l63h277utd3ine8o134w6pyzs1ow6jmer836jbcus59zhj30onlfc15qju50ysauefhswdcemta7j9l8fqq7jet5na6uof4xag77bcu8uzfa8tgur90hnehz1zn0tnkpxia4f195vpr9fkh1scowh1bn0oyakklmkapvr7nrqqlwnzkxw7pbojhn4ruxknn73qqpp6kv4ugc9bfi8baaphguic9yaagg71u1g5iazi6',
                username: 'jxhee226jch5c7cc4ugrhchtae9zki5o6ew8oe7eac4numhgbp68xiiqzytc',
                remoteHost: 'psvimqdiwu0puyk0qq3mynhjxpcznwlfwxki1y4hohj2s60jc3t2rtl49jkrgerchvnupaysfuympuivrf1ce26d8ly3lxc0lfne5t69tqlm4kg8wk8ydg2f0mg4raeg18gr1dezlx3mcys57vmj8exbsdgbxjqv',
                remotePort: 7623184188,
                directory: 'pmon1t50vofb6pzkkk19cuhtz7hrbab0hkkee6hl5152gjaziz7tukhpzo3rqh6u0s47w7b5ggy81ofir51e92net9dzw4e7mpy5hfga5r4s9ipamd5whpypf5k1jcnh5awrvxrdkextm8v7qtdr569e4k6d7kd5z9ek1rbsyij42ac90mfqw7sphj080zgsohe6ucksioysksk4v8ey4e1ih08wygk0xsoasiyyzvga0p50c9fr9aps0qxk14gyq8urwg5vjny1a3fz2j94xfum39880xjwt9wbyt3dj8zneri68i0s4pu5h2jnk8rq5m8f3ay5m1dx4kw0up8l29k2ux3m8odc1zhp3w22xuwaxvzrbxw9jfvsfpah604qg4hlagsn4yigbzzqs2my5wb15d2scb774j19zf6sjygzkjqaou77vtg5tqahi6768q9isx2gey2098ds1in1s1abx0d6a3vpzib64a1u03nky1zh152xpxvo8e7zojfrzwwr4wjjlpawski2koia92thkbky3fu6krq2scsm3ndvxw1axke6hvivley58psgmldnm4dxjr2x9a1aes0v1ecc1twyyqd221nrmheomrntqauh20f0vs0s9p6gfcoixlo7inb7aiybvplxof15pepb7r6qz27uyi98d8i2ciflmvebh25t12d4cv5zfwxhou3jduq95atqwirwxvkq2aeiy44q40me9loigbrzttnpvfd73o3xyo362yz52cwmbii5ke2w0k9ufv6kzz590bqoihvtskytb9wu3xhjkpo31028og97g4zantzki6qsu9qldhvcoqovrlg6kzps1peqtduphd8w9q5rmts27wrutqxbgfvrjrxuxqzk5cpzn753l3h4sx5vqq5n4jqbveosw30mqh4brms09c69ourvwopnaa8chl68bd7exaj3guo5k1j2l49ys4ahgggowk3rqemyq3ij1yoyfz2ov3hzlknvrvbrvjwp1fjc18xa',
                fileSchema: '22cuj17zwvhczksvqgzo1pd2p71r1aelmubqbg094he5zglbyqt8adioxibidkcf4ho3fdasbuyk2205dplt99addu0c10xa5r7dayyc9tlhnazowhgxr888zsyklvkc5sra4e90zco62br1mp4890o3umjskwxp9rphagrabecuct1g7k3jf5je7zr6gr2osrhzezzq2h5dzy0vrsra5on4yw5d41usznulpyuxwq2k0ydiis4g63yt34stbdldf622gsgax48mwsni00p888oqii75jhtarov0qnsu4rt85w6loz70ysm3zephfkdqvmlnetu44bk4x6bpf2gbyqj1or79hagf3pdfapwbh2bn94tunat1kq23m6kcycvmze3e679c0b5pxv7mxlmbh64w1uip5kylq0tdjzjdungia8h7676v5zh2bn7qfx7dqwkdyibzanu16b5wiq2ve8cinncf16g91d5hlhofuldqigownfmb8m4izty1zbqhj0seghnq0gj0ak4q17548r87shbfz1ihjm3cbk44v4aj57fcrjshzuimwpc1janbn3t8hxbyg0bhwqftgq943usbgtfnjf03sopa94pv5gz6x8xx7th4akykcpw8rggtgsd1t1li1x86p1n8i540gurkxi1oe81gx6g57h79rcq0j7e5a19rx3b0j6msntz6583wguopwmpevm2jkqu8gsv62djibxv68gcg174jpfi8sxfzafldp59khaw3a9ui242wsshz8orcb6htehh0j2r5ne1qdehimkj7ujgo4bc26aqc7193yzzac190w37a99yrc5cdxig6ip8pox8eqiuvwn1i65gac1czzfw7aqivajxqirojx4rorwm92twpvxpbxubqgr63cph61w5m5byv6bd0crz2ss1eyuwc7pi0ngomu5u3lewzct6fvxe8auxt6sy1pmyhrz2vcjzss534731gh8a944mod90b4rmnsyjlgol720ey2iowib3e',
                proxyHost: 'yxbpdifkis0csedi1yz2gjpj767o8eynlct20s29jr5iveken09fsdukia9t',
                proxyPort: 5390328641,
                destination: '2yqbhya171841yiuugsbmil2zjstqlhfao3s9ru5swiyj3yb9m95ua0z518z2lct62yovcgd5royfkbybs8vmkcsnvfqdasmigyiittefp2l0kexrzkp6q6mrryp5l0360pi82jh60be85th8ml5q9x2ag6s8htf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'juhh4x2q24dxhfo7ic2bbju5239746lfmice937fe3bcqact0tesurawtq9xj5hjejvia2ol0kvtjt7lorftiscxd5t45fu6u1b7aj45y6640vwa4o3prmvgmig33jdwfuu745hvg2zw9q2g4ni4y1rqilcqljpp8',
                responsibleUserAccountName: 'z2qtwz89r70iztvl73wi',
                lastChangeUserAccount: '2477vc1g5gi0em7tw15w',
                lastChangedAt: '2020-07-28 17:31:16',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'jbdioluwx1ljaq91djf6muc0skviy8y493lk2nag',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'zkuqrktpfepbr016zo1pm5kzlcgmtlj64t7mibzxxm1sgktrk3',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'b80lp23st78x48z5j19y',
                party: 'nl4gjyss0zj0iqpu82sqw4sfmu7ei20wuiuzr9xraootqpvy9ix7yheql1m7db2yg09sjuajygnb8imks9qlco0d8zyxmjq98ioxa9v6td5glnx9uiyjsim7975vkuzdpclk74sl6whx8l9rii8r37os8ayfebeg',
                component: 'kshxi49ohb7aujilccgxjhbaovzdy49cu9wmiib2qenlu7olzh91pebst7l8eenyy7gvhfhlt93lo54dd6l5y56faqta810jrs2jigz8fd6o0mpxicyo4kwfosc9lx4p3xjz9glmcaoy34ip6acr7v79dt88t8ct',
                name: '2wx3w3oyov31naz315uzj8lbxao8ow5svraraohwh0cr9eoz6v4xdefnlazpob22v2vu0s31c7km5mu73aftejv4npggs0ppgs2rls29kqvq7e35p0qmcauuwpkbeumro3j84h6s2rkckcqrxvkc415u8m6lf573',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'k9xvyg0qn8nqn7g826o04sggmmbm8wqqi3zam2mppbq3vh59x8op96449jh0yhd3c467hecussrm1aed1dfkk5kktm8u108x8d8apux2d8vwybm52hqnhdvv5dc1b0e0scws9x4mc5t1z2ty6l26tmn52ei5x10a',
                flowComponent: 'g1hdjaz6jf7tjiqxt0zrdepmz2bckx0fffmn4eq5s7f1qpz3qne3r17hzqv8kpx97gsmg395ww3npi58pms4vnq4kn1zj355kagdovorrdjssjsmuxqodzk3skmq7igz0rzz13k28d1iq387yxpgqwbjobz9ze94',
                flowInterfaceName: '85mcmyx28wr5k2ijd3ek3b54ze4723bir6j629rbrs4tlihca1mw1dx222415mldgyr5e7si6zuklgjsnwjdow1c1czog2ktt78ali1ot250qrup1u6xtirj9kpcrci4xrgmkf99z6j71x53kn54cj6rt7phnzbv',
                flowInterfaceNamespace: '5iep87boisk4n10yrjfqopxj0vmai863ufpijojdxvi71oxb3oy0948cwwr3o8hu9yip0wtfh9uk2w1aw733qopnwal3ql1jzz0afu1n7sjs7hqqlxqkdthfd50105a9bd3mxu3ts4huslb1omi8b4ggiqbnaaxh',
                version: 'u79yy8jm58bydgjqkbz2',
                adapterType: 'y1m0k5za212bmj9oa1bh8nkh6u0yzm7lan05l00z9qtyl3sws6drz0dz7b2u',
                direction: 'SENDER',
                transportProtocol: 'u5kil2n8x60mnzsrx4zhd22l1jehoersquu9xsruajnu2dpu71wfpwpjxpxh',
                messageProtocol: 'gdy3katli5xt274p7ap0ib16s20u640ztdlktd22rmqh2z0iripbcqbud5l1',
                adapterEngineName: '1bks0x9nna9nou7x10v2imuks4lpukdno6bo8rg52unajc805kwmvbm7ltl9sadqpol5prmzi3ep5zd2ez9ntlrc35lkfj182ym7cd5dv05p4qxbl6sso7hk9x2e78sn0grbo413rk38l1xaibnq4momwn7zj7ut',
                url: '60rfzlbhobrtzza918sjca0jrlodzqauak41kkup07r530tvk46r0ni2oc2cmqqaee3fptid3omqn5d10l309u0s4mb64h56u63hzv0qzkhidqgsla28jmrbfpp3z68jq40sfgzw2zbqfo2ru5mcrh13hszluh2oh67f9n6uwvuxuuh4ixezfjiegsjyyhf8tc1qoz6e3lhk39pa6dgw6rh11df4d7cplsi6ogmcup5iiq4klatqtz21kyb50z48vd7tgqeflgpkfm1i710gtb4jjqpu1jsy4y40li68itbw3jl8el7j5bsmyh1wyp6x',
                username: '5wgciuwmapbrwpnf3pm8cjo91zjvixnwvhkguczqh2e4qrhh7lq9dok9fm91',
                remoteHost: '08qzm8m0pg17a6uyvc482eg06sf373xuga1bbjv3b39zlokz8ubn2wwqkdyn6gywz4fa0u6z3h7h5jngg0ttxwzmptatpjmf07tz0weksrjzukmjbswwk4lk5hz8nd1iqchs6lrw39ez2jb8i6rosqgwvun4puaa',
                remotePort: 2222098876,
                directory: 'g42uqwkeh8cbwgrb3grwtymcl5mx5hbqsdhkr55tj98vlli02lh0v3oi2abok18t8rqb4slxkmrihc2g4xuuuzj4wrlct4kjz0pjpnwdmp9wbz3k6oj111uzppzwm734kxmdx2exb4ulz3xbn72q7b1342xjk0jhodn49v1qg7414qj2bksjrthlhmk38w582zeedhh5wqntpkf6za9nfldki91vx4bzp0xnqkkybbg06ae0dsrys4sa9pmxlmmx8d8a2hfywfn5zo9vq3fhsk6dmks8idqf3fwr95jfbazhbikydbkemhczjczpp6pla6d29vbhzccw41avsuu91a6y2o88jpmrxor6cqam05p616c3j53frm64ynug0so251bda9yk2cgezt7tc4czmp9zunahkiipenpenz8xmebg8mrzlrn2mxhdhnpchp0mg74rpe5cg4bcdpctauii0hzhuhb3kzj2mwydl723d64oqv37c92adaej17tp1dkxznbdcooooh01hsivzmmdih5jf6xj8tq3kb85ybfxj8w4s9bkq6rkw9d6a1e433fntlxvhpjm000rdjn28j84r83scini17nye7r2qcbhbr9mrafzqq2k8lgvkz70h4he3ky3tye45zcy49p156dxhuszjkza4p3v67yfyujuae8bgw4ap739vz7fhxvi60we8stn10m7uc5owsg5ty656ha6h0abx80htzdz6fl6ggevlp1yt2b97iapferqp6tq4okoinvl455y8hxq70j7sb8unhasieqewch9wl3iyztdlzgdd43csxmpie2fizifzbjyqgtmk6m4dkswg2fhrf0y8sxl61fa0a63m1ij7cm40qoymmc1mygi4m3fi1ig7fvvfch878tvrf17hjhz7zi8du2v4w5bkrb5sjvkjixgk6lpkerw2qp1u31zi4x38ca45ddd5fnox0v7scbhll4orvgsm5xdoid8rx9ky2q5khk2yrgn4sf3cavmb2le',
                fileSchema: '5u32ofmc4p6jzqou6mc7998f60k0lotumkyyn4dpln3qfqshxmgzogm0llbt8kyc8nxrp47fj4xj8f6tzcxiow5o4fvyf3c9qtu1hfnzp18uis0icevnjp5nyq3n6u5f6h43yormwuld2ptyz6qe0y6njb5ujp7r5qxk1e0192qlpzklcizgc34hjqzlc5wj17o6phhie8vxo4aii5y871ztv4zp3zyl7cr7z1sa7hrh52wd9hlzssj9gm5njjh4wyvtxeesxpw6gz4w0rg7n6bmzklz9uymy0l90ied8rmkrd7q3yckvxtxigz3cckt9t9ueenf4lke14mbb4chsrg1gv13fywl6tr16j3wwxrldg7a5ty16hju1vf9bv1rqm9ovpdahni720m6v9qsvewf1c0vmwkgixt7kv86knud6ksbh69jwde5av4dg4jhr6jhshhd6lk7z9o0nrxj2dk0lkdbc5gfxbumnpt90vrowhebv1vrs01d67wi0aiby3sbmc2yeu5z8620pcj7ym3954jqholfyvo9azb0lfapx7dx09a3u6jvuhndcpiqv1rq83fwxq6oafrji0knbr3tspn5vztbrqm1slivj2i6gbub7g553929wqhzet2uz8ilxynnaqdtuvvr1wsxht3mdb3q5u75zx3gjm0hixb6p8cz1wten2baaob0q4y4ntko7kenwwmqslvofzsuw2b8w5limntmcb1r73woi2myy3j2f2uxo2ywm9xbv2syabt8qptwvgy2u1mgt18rbw4jot3uqvhij5guf431ld4ruenecn3ivkxzgd55aky8jnd2g8e6v0u9qgnv7xn6vou8u2okh98cohswx3njgwvg64386tzldwi523oom9q8vd8nrlvtmyjwwg72kta8y1fkrj2wirapz3nvi86e4qfqzw2k9odskr4ya78ebmbsok7w5tprf6wc1es8msthwlyalgez9mlo226slcshllfv4h0zxkt4m6abdztd9sec',
                proxyHost: 'mjmtunzeggytcm01r3slo0cvaerxz8vn1sld8dmpqyt96gnc1mtrgxi5ueqz',
                proxyPort: 6443209784,
                destination: 'j65yadwfw62pn1xou2e4hu63ge5hiun8ut5195ngoeu7ozlazudzyqsufgjsd6rxsql46s2969ohcqoptjl4d9myxyewcd3mmzrrijrr7qokr434wyavwoisghgud6mo0y8zypmopxgazm8p2x8zxisoy3r2zb9s',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '38yer12aaoczjv1xwdn8nb724q3z71mygxnvylkp3r6g1ibawcfgsdyi36cao0me9y79d7lxapg1ffqz4o0xfwsmcshz5aezuexkbh46w3nry0zn4xer5fmwz9oaeiyzqnxxgxi7llawbzfxzw4pmikrcgyg303m',
                responsibleUserAccountName: 'cqploq4jldffhgbe8jud4',
                lastChangeUserAccount: 'xpcqfoplu12j57c24brq',
                lastChangedAt: '2020-07-29 14:54:49',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'zpfhnxcpvmvlvno2gr2enjao6bflpkautngb0kp1',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'vfvgooqzit6294dppomjc5a24xfot27qubl5cllghftboah539',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '5mx1gsfm2702ug65jepp',
                party: '2r2v6fmnkdt3el3fklj18mhe5wtnw7nq1xhbipyqaqx670g6s6juu81xd3zliwbbg5lhmz6bad7zm09azmloqed7kgaw1b9la68pcku6wz569mscbtqk86mue3a1r3jng1dz5dfqbkc65uso3p3dky9clkprsae6',
                component: 'v0g79lh7wa8b9arwpin524qpxx8qjp6ylx958ugqpdiby1gzmf2wp7w325bfuqk7xlvmxuakgofle3awdv06dkgbifa8j6t5yyxz6dsywabu5nkfu6qv3whvzha6fid0t2gz1b3q7ydhpcx90urjltmptm8i88sp',
                name: 'id64cuhi2pfgmlzxflusicvnjio1fh87uij6idheqdk3pl3fkf3et49b6d5e50c6fvf7dmoqpwgckgdhhv2nbkofmtz5lemrxonk8nml5sbdxcobzl2ftuabg4p8ghboiyklivbx173xdmfba9umf8qza8eahazj',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'bgagb17f2j1xocg5x5s8m42mi1eiuwqj8wo3jbhtxzayy0q6vttan122fxtbax7ukt2pn86g6m6k9p78pyawqk13kbc1xze0uzyk0s52y5xq2i7kp2wr0x1nxeq77ldfqjvrv5rfw2d1mt2ofi4o96uwqep3njx0',
                flowComponent: '5mcehhkao4pr51klgogr6hgcniz2jrpi1zcz70pu0xziyntv0mgatb6mp3ofl8vtht55dgtp1ws6ecp6hngyl0lw2qxq4drb0zzr54idej0jpd3go5mgwr8puoft44eudnx27fctjrl2ozmiwub415a32emma8jj',
                flowInterfaceName: 'h9pxbqamcjzk3c100uos2m0ma8e5gzmv41a4jzip5t3klptzkug5j3wk798si1d9brrhg2360bd1yy2wcxw0ojbn8xx88h1mvpme99qcnyxp4j8jwfo6kgyjbhwoxcuv1v0ruqcjjk4bf0vog79csv8iiaex81yh',
                flowInterfaceNamespace: 'amcjnfts2841w3b89x1jk61swtf8of9p6k22syr4a4p6uz6yepa6t6sfi15z7gvfp51vmgg0wvq69addnjc1xq9frkwkti2jnxb5a2jy5r9l36qutb01cf5t76n6meklsttgpzlgoe2fcyalvxeup59397ta2tve',
                version: 'mhy9l2i8zqlw9hibbpy6',
                adapterType: 'adl40bdk4lcnp16x1gdolc06ofuplfrqz8cjaf4waa8yxmdredlsqmv7y6e9',
                direction: 'SENDER',
                transportProtocol: '1axj726gucnrcx65sg23k0dro63eebs5aquqt1jpisp46ijsf1t4apn1883a',
                messageProtocol: '3tlbmg7104eqnrc7jpv34jq1d5fkz3uzn7dk85gxjtbuqylyz1z47cc4h3ua',
                adapterEngineName: '8ivp1byc9u0s3vysu1mh1f1ipe1tsz35thho213rqxlrghlicfu0j0b827iemkdk2mqtwro0wtr3fas5so3kvqelpcxcvq0dlh0tn4sj99n6za74sey174uyqer752sgby875kliy2t5szjhhpqs2fbs9cd5tpz8',
                url: 'xtn2djcxtbvvm6v7l4y2oin06fj6oc28l2alrkq3kynazksuj65x1i7nxlamd45gudyo1i45n5ut8nxipclxc5618apjg3lxhmbpqwrds64akwuq670sc7by6gwovuwvmmens36csxe3gjp5kkndh3yu3r02exi9oj2kyk4lym9qn8sxphqzxmw0bgd7034ci4hv4i7jlzx8xd9e9d7e4ljsbc88mwz0onharzeib830c7l654wnh9zo8tnmqaweeykimbyrmc13zmnpkbynux2bcqboc8o9isipeb0bphvxfgtznx243ir7ox068w3g',
                username: 'lrdv5ntj794xk6ukzs0kfeln1c3uuofjixcglejd31u9eyo1g66nuiquq7ee',
                remoteHost: 'ptect79q009449d4856dszt8rirtngqw4i5tevsdcsec1713dvrq14433bheukbav7slpo6aojw9dk7xub3wn5ttvpu016yevsgtbehxur7o9omkjjjdwumm8xddjhysl86pjrfnhatvrmxta08pwpvh58613qze',
                remotePort: 4410330272,
                directory: 'g0xi3ro0rmf7yn3mrfjr83nm9lhlvaymrrg281w3q96otuve5oul7c0zxeqtt7octa5ics1xfrptqni4ywysekt4pel1zqnhvzonvp0wyi4j6eqhgkfscnmfh2j95as63vat135d47m1gxipt2fqecba1641ghp31pykfulogyb5p4ha9sl5jyyxmg7zim2s4espm7m70ouhivasuhbsfqqf16rbaablkn5rajirm6r7331g3bowaldowwziv0u5qxysb3tc878bfzgxprs4ntyco5zvw8v9tj46lb58cmx87z18f8286d3rh2zhyyhfnaxlfnfdg4gyqmjj7130yl8c1j6kd0s3xjdy4bktygdjvlqqtx9vaua5l7phep34fya4vi2zvy7bkfsp60bwcyfv6btpufvantf9ri61bhcajqwf8hgz4bojxj7cxkbhaaq5iq6y4c1f7usgz7dpwqga37yqphwv2takorn55b19ncov8y7pf87cfqy9kpfa6l5407pbs8s7ysk0d2aa5e0wz1583uilem1pfzglk90il4ske99vfp9xlgg8z5c85meloltdo2w8fq8xj3uaqttvc03ezwyhxkr4fhz3o73e6mzr0xolo28g92r7bzh9sag8rzq3xg0tgwiauk2rm9gu5s3w7n1m9y9vhrggvpuhd8yv3klbkolnhcrbxjw0uwn8h80bnnen3mf00cy8yl3zvd2blvkar2lfwdjg4owq32iaejgu90xt219ywiu2xecxonk3cnhwwjs1as601ovkvbhsvs3e4f7n6hp5hysiegim6tdylffmx7a21c2deqsl90gletuasb9rmkibqrnzadv6mkodtupctuh43yb7bqvaidk3pu6wvfze39i2un80y5g5d2con7tloj6zl5laa8u23x32x1dokb87li9d0e8odnax5wf1rse0h88ydek0drf3qx7ynap99gflvttcmii0g60oc08lnayw7xm1xrzn8ia5mpx9tup9cfky',
                fileSchema: 'xe7x4hn06mhl7yugyxkuf6m7j30aqy9xjtd60x7xlrl9gncgt06mjyunwveubb2xfqwf2zmayz9kgxzfzfjpmpc7uf1b3qvi4yn86vrp4ov7dyvs8sp6ekcfh3r5nwdwrpxdjxt9wjwfgrw1fdwbpjbr9dd6by2ygcyp3lfcbm3se03qqmqpeij1clgcz3x1s419swzawvrb4zkp5cun4srafifkbmyveugqbxnah1yln56pjoscx80kk4mdkw0zniu57b5rnuu6eqrslqds9wik7keefsmelur07vbw862ndqso5tnhcvupl6e0j4mgms98gcaxnorlzcbqjte8768d0k8p755b1atc24e3bipbr2difgy2dxxk7dlhadx4yb2b3i1et0zn4isxaznl0bhgn306q7vw1qchlmfb2ds313vfrqff2uvi4ssr7izwxikajguq646e8q0lkk2d427khvtd17q0klvsaac962mkqxrxa0f5o09pesyhwr3yvn69bkb1xbfbiwye38eq4rgi6o6unlk6smlxjx2ejm6j3zwt2lika1lqzed3p9txjtuyxtn1by4scjk3zxzll56getvsg42hd6z8hch6y6gqeawj3o7outmhqxg5ddkijduknktckbftic8bkfv3zyazkakftgwxo4rivdc5a68xr2hz6s1qno9qbei9gjo1hqcvnliu06pjj0v5sbd2fi1hjionr2hzc4mff5u65530e269at4zmo0q9g82pn6hwiejee5y7tri041zizog0pu65n7pmtitktf2vi570mevfr8gigof50fnhsj5ez4z4gd2z2jj2rlik06ncdxo4hur6mzr58tf2x1h47pk8klznbx19bpnhi7xuoh2pne4s98g4ix91c27rve6eepimofgzcyn123lu6q7s60prspjtkn80f5h1ys6sye1yjkx9fed951wv0axwn8aqoalmqf75twj8wm02lbp2vj8lq8zv1dfkev3sh3m6m5vh5e8',
                proxyHost: 'bvy4hhd92gp8uofx4k4omfzoqj22of8rcxkfk0omxwpsangbkneb0r5qpwct',
                proxyPort: 1493503305,
                destination: 'uxcabixyir8b0gkomgyz6qvwq5j45gxpj9jeh65p62g4jijywavde83bv3bzh6c0gj2osh4gkwvgw214kdpx91pbbb8qr1ts1jkykslmqmhbmve76zo14yt807dre0bwoygge50zc2skzkmxhpvd7nmh7aobe6ld',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jzl7bgm9qi94z8d69nhljb2vz85ugro35eapmt4gal3w2g64p5yr4wrhsgelmh8c9bv6rhizq4uqkiagl5xba9m3t2uyox3j9zzydrr53g8tu7jyzsrh8kb6x6o9aiuz4t7g7mb7u85oedgq6vfmldb5ugl69a4n',
                responsibleUserAccountName: 'oh9nje3fy8136y812uud',
                lastChangeUserAccount: 'oefmcnfyx3b3k9548fnlt',
                lastChangedAt: '2020-07-28 19:56:36',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'r8iq1zeifg065wi2ep0rtgz1ln6zc2stoqfpc53l',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'enbzjk54r4b7zy82267qtt1o24xu9jckjf7sp7lcyytnvwqtpe',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '96sfjkm68nzrf5tsldi0',
                party: 's0ri9iqg94sk572f780jh8rw1sbo25vaagw8267jtt5mdvcfhn10ye6gdyc49iefxo7pi17jzzsiylc2vpstfnerxl9mcqpqxeeptdbedm019qn350ilsc291khb739c2s2s66orbhhu8bvbsuozumy2wf73c9ff',
                component: 'mueut6837ul519vgeaja6gc4vq1cf0s57an7vy40qro9tohp02e8as1m2a9dqf85mjztb67cywzf21usb6vi09pdumns6ih9k62d4w9ascljd7f23xlpgbshsyd4er1fag2tbzqzzywt6q21yoim2g41j91ewef6',
                name: 'wdhv3ii7wmhmn0y5n8fwkn6hyadsby9pf3gmuatxq1mgbkov2fa8lbn2p9t7btdjlws4qgvt5ystz64vkvnqpda35wy45g5aaqzpgfpu5jz010hmqf46rmeh2nlnny6tiqbxm3j8ojydc8471s0dh3v3eo7hnwrh',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'uy42452vj9mce9rn26lp0yfxjflxm8k06mak8eb45dvtq1uo6clflu8zh8on2t2hw3vhlpbywyk9ygkduqaiup6r5s04bjqkvob2u5t2973d2swr051s5p3g1rjnjfnmgijnvq8v6ep30flmcn4d2uhkyym8gw95',
                flowComponent: 'uwbupaomhttdb2om6g9ajcmmyhxlnikldb26tho1rwki5v87mwx5x8r9985lpo3oq0t5ckz3oqoommmjwqh1pszo9ass99z9n7rffjc8a4d6fh4tcdvr9z6m1pds26o0k7tbkzf8r00u1cgbb6pvueh1xanmfp8y',
                flowInterfaceName: 'uzh2x3sqd0eo3h7dltgssuz2y9rhk9r69kqdv62ew97cv8dctbppikkcglb9ebpylsehtcjs1p2ow4hg16gksca6t1ox1rib3nmrm7h0ylyv4zpvmihvehqxipxt8wr1c935i0z6em03o46obyw6mflttaqfrui6',
                flowInterfaceNamespace: 'd3le9tpozgx6wynt2wegrv6zseulahknft489gz5mzv380md2m9a3f0a5q3yiq2zccvdfzu1cvg5kfrbs89uzhgu5h2vzb2i4o9vo8qvh8t93oqqvabbxq6d8ktciaq8yl34ipsdjooa53szsbox7mq5g8o1g4bk',
                version: 'dlp9h4zrr7m6s25kp2bt',
                adapterType: 'bl3rl5id0j4fx94cw4a2273opbddl9a05r1hjeuexm9vyfyat3fzv8fhsvyv',
                direction: 'SENDER',
                transportProtocol: 'dzaanowd1qfd2a7ej0183k6h74l06miurq6l94po14gktmcyg2mf2p7i1yyd',
                messageProtocol: 'krt77vycrg51rto9q14wqllg6zohbyzfeu7wifkgqcdv1r55sk7getxa20w9',
                adapterEngineName: 'tzza963wwpc72o230evj2w1xdbz61zv4a2jpvx3qo2erj7ujmb5xvay46e364yrwkgvsa0dn0hmxjuy1pnhptpyljkc8bfxjzq60t4mv0gfrpzlso153wpiqacnzbismijtwmtjxt3dfyci47w2t2qpbic9lyulc',
                url: 'js8a8ukstzhzokpjl2zvt2dbnv64wt2a6drd3kddpc3950sjb53kvt0wfby4gz6gdimyrvn0nkkl5sop0ot16b4vyx441qxk4g081du2ar2rwiq6nrcrsngv81sgebhnj7zamhh6t3kp2j4fzmj228ce59ra25b75xprrrnhe2cq45r2ca5cbp4uy6k04hzb7wuny508mfpqdrnuofcmul4pvu9ytwas0kl9ij9dictibiq0gescegxxg9ow34sfdiaum2qerc2l1olzx2ii1731fvaof56v1pf2lb5kur015vdwixccx7ips1o1a6gx',
                username: '6phpp0v32scdo8801lw8scz4f821bolkqgebr06n32xtfw2f3mw08h6766e3',
                remoteHost: 'fcro36w0q12rcy58xri0f70bng07th6zj1j1wbwz5jj5tc6x1yqmkixrymgb02fug6qzpxu6n29z6v3ymj7jdq2xco0hq6tdl8g94isrkufok2gr3n4rruf9r6k1p99izpu6nh3hg5u3jlhj30cj5g0qckvyf23w',
                remotePort: -9,
                directory: 'cu1ujdte0uzl8ways2vqq8dg3oambshrunfrzwwq1le5526pnbodrizcrhr5957ns4ah3k4uql418pbe944zsqnq5k2st5swii45vok8mss0uwdjdga0jrzulhhxokl1fayj7dl6kr2d6hvobzlkgoxlsxbhwn5stt7tu0488nbkrewd63zvdsheity9juh9t47xmwrnn51f3hoajn2aggweyuj6hlsq33l6pmh9ugw3z5ku2oapyuu5l746d7l9vdzw7q0ejuxcydh3oxiiigjtq5qrhp5d6ffruh8r97bi4gkun249d5wdwkk43okx8y5l7dd75eyn9nicn5gpixyvxherf1bbkvcdmzvdmpl295mehwzcp0aaa139xbh83q0mei5n7laoug729rls3poms4s56y4z7mbeag2q7ikfchqoeq03hn8b06hwcxsf1td2873gmv5lp8kkfv7bigfrt6k3nt5pe3yxq80baldnf0ieyrf7alj3d51okdvjh9hbj4m5jwem3hghhpb5mnp1qbf31das0hglvfd2h9sbuz8e56lxc4dwn2prsajnwllt5eznro49yl3wbqjzjays0jl30twlfhfcaga6frceien8ali5bu3a9g6rszowmjbgxiatxc271sec7f9uern49ss691krcgw7m7sl10drxjyljlcrtsul9jcqqkowvw3093wwbyvs81v3u1jmtcx9px07dzrv18sirc7g5m0c5nn7pss3us29er48jv73hu3uc7j7009i9nn5ytksulh07ellfkuhuitspsqllem63gzj845lf2fgmndxrlolx1mqr6v2sixuzwq4y95rxo37pd5vhm8qey6be9hlsoy8nanmua197zsw10m8eg9a7bv681gi6k27xvc93wh5c69vgu83h722slwerb2odr7fck0uo0428xtoa270ds4t7huf9ys9fdi05ntbjffyp04lykebnloygr7h2z7jjqbe1wixq2kp385rkl3lem82',
                fileSchema: '3qkpxw9uvkfpt8lx4i5ncst7mo8b0ssnykl49qbjm3p8aj5gd4x5hnrgbj6ozqq0qyipo5heru6italj9fe7324r5yf231nackbu1wh7tjr40gcpuvsls7tqgp2xlzchlksmavipg74orqh8li6jx2wo2twaqmfenf9gqp1e7xeinz1hrvzu5ftc5l2l3lrqm4a0lt96mpwrw6yys5gybunk3x35tobj4ye20sq56bmujqp0rk4uo7jn7nv5p01ymyqaa449pykb0yylz9wj53hs6r45bgov84fka3mbjkk836yk39fsvwnvd2400v0uz45xchtwdg2vr6e78b9hm5waqhc39l5ws81xbhztvyxe7j4q8nlfcyvmga7n78qp1xnofjbik6ikqw34w4cblibn6ovlw5y0mab6nw69cf3tbvntti99e8i1qg0l70oj54avbsjw2zxocph6dbba4d80yxvc2l4gqyb058fgngc9b4q74nvskoybvssv23661d3r5ucic745k9nc8qn1z72141b0mug2x3t8f1sq7y3qywkxrw3q78u302i1oricj9w6j8gzeu5ektkpvexna0idbmgm3sinfitlb1p6nnxs3pl4n0c3gjxrdputg0koivyd9iu99jzylurtizw69yx4rwts4qkjno3ftt5714nbreprr37jf97axdrze8ouo0zxov6bz64vu0jz4426k4xj0c0pfgd6x6y5nzafrotsdwcby4g7jxel8ehkknty0g0y80149wfmvepggm7hbm9isnnuatspc17gm0tky0thkxiduzwztzuc9j20ts4sj9q4gozguu4ex2417y0fcfs0ytmgfy73qh2g6z8meh6exasd08kahj4p0ea0bd8sqo99p4gm1bkgj1vngigmhm6h0btti64ulyf9ichxpjywy3hy4s06gr40wmb3x9w6wtjrptc6srlc0ooxjav2gburaxy9ly6c5o1g7ozjhtfmzh0fz2ksor6vsx8d32eb',
                proxyHost: '6j0yt31npfxlpasaawqvxy7uf6nfznfozd5q5tungy0aheczjkfp11shy44o',
                proxyPort: 6264238713,
                destination: 'yk3eanen7bs8gvb6zzkrf55la2xfcuuxisvk49xa7h5bzc3op8f4j4o70vhmw55t1afvh0g8ve9iy5ota5c5u6jzd2yuups6g6p6axz2n7vocwsu1cz04hej1tsl0wk9ookbs05rl0cgc7hfy0ke8ynkl33mlpoe',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'n5rpdz3zvjy1r4ngp1sseefhaopwlh1kijuety4jfgdfxvfc1x1tht0c8eg1l6qng6xc2bdqzyyvm3u2rsbfpbjpeujyayvy5a9f1w96r2qtd0f8eqp6fk5chqpr342dpogdjb9p85rhxzo892ulqerizxyuzsn3',
                responsibleUserAccountName: 'tycifkzitv8u55ffio2n',
                lastChangeUserAccount: 'quggxx8tlarygsl6w2kd',
                lastChangedAt: '2020-07-28 18:45:18',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'cwtau71f94vmko80da3cmyapwe7pie91j4j2vbra',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: '2taapz4dndeybf93wbws6ziq2wfncox32spzp6og9lizo2rx8h',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'an0i7ax6mht0x1wthk3r',
                party: 'jrq9oa1gtsg9bld9wf1c0jtpjf5mck8y3b7auqfte281ktr1ldyqdn6mjryw18mmivlpqmlut1c57prs4ysyj0phwgqaeupybr2fyn9ayiyl67qt9ai1e25aree0g999jnu2s67azb2df6lis53970e6yjhyrog2',
                component: '9hxya9rcfascxqbe48sr3ilymf2wxzqm1abva8p2qon9pn2kh9639y5oybec6p2sq34bhix4t6l8r8fx0t9tcw226ikkeb111kcxwdlrjfov7yn16b0lhl2qqgw87akn6379u49yvwqz28svuua4uut9vbk3w7sd',
                name: '6mr6ff5f8d21ub1gpimz05tvcroe9rqfjhtmj09m12uphnlcpn8vq71qzorw07b9u8xyq8zhu007qcj809o52i7j9x6oommklp1vzjfiegalhmj0js5wntyx0z3cz3j7j4pxgeefdqybachhu6hygjm2501f44ev',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'v11bi6xj7tisclnoc323m73amk8a2y7xxbobvb9yecv6r525nynmqeoivl9shlukq4z19bl6ciq6dk5piqkhlf0qe1frtp383ujgpp41wc74usht634o8rd0o3fqp0zwxgbijhlxm238fsoff13cs3u25uz3m39p',
                flowComponent: '8z9n9shclz53o9c5p1e6eyi4ia3xo2hw2vn3ca10393mk5tpfaaxqdimbs57z7bb5s9laggf98lyoktijbxwg9a8fmfcjf9r4sgp96jr60ph2m7rznbp5zfpau0p9z6c9psuvrhdl6rrm2mm2kqmrc7qkt0kj01q',
                flowInterfaceName: 'x1qkafb46uw3nroyldmz9ayrj211d0c1q7meakwtc1btpj1syrx8nej65yt7763wsr4hfj77xq8kkcvbsqjs4erxuxwmagme8554e9rs81o5w2ahojkrnvah4ciah08hdlgjhu4ho2skobr7s774u0wachyea393',
                flowInterfaceNamespace: '7gnt56mpt4ljydnrjxfhvu5j959zm6bcy8u1a9rnosmlv4m9cci1ly40hpcgrnh3jujyfg9cvz2rr65lyxmsql2mbh3ij1c14bs8fwohs7whxzymp4vlhtxqyn3u6grcujs9g3so9ihevqzbornhbgkc1zbhng21',
                version: '2s5u9fao5evm6iso0r42',
                adapterType: '0vqmcbdcm942crhzvnet8rsmdeu3fk72cl4t2w6stv734bitd5fr7mogo8l8',
                direction: 'RECEIVER',
                transportProtocol: 'm29mv7q4chfvpbnnlrxew0xc2iotdbvvzozweo35jw7lztjv6yabtgt1fke8',
                messageProtocol: '311xea6c7rywb09j2hsz6u6xbt9pjg5fuguml6iyv6ncnwcvulnlcehs523i',
                adapterEngineName: 'tskq3l6f5invm2fx2ggwxuon662fe6xt2yvx6stxc2vwphxhnuqvf1tl29s7ub2999nb1gxvh65f8fwuxg4deoe44kw6auy0um1fcm8ak96up2dyuh0uys2oaypxjyl8uqdoxvz55c81r0le3ogpwpwuuxo8phid',
                url: 'nlnj6fjw8igb6vm98xtn7ztca24prrk2nb19jnx8rng6x6kpnn2gu39fr0lwsm2i6g3jac4gevdr3pn5ed3j69jj2sbrkoq06f8uaguqt0sq9am83dn8lxiitwbmrvtz2soi6ht4vjo1ajku8x7ejk6jghsz2ons3fyfsayy3uyb08ycymyrz0rrwlfrdexwcksnqdggax5n0bxay8wfffoms0iqfb24upovevfy4m8eubwqnm0d66m42kkuualz130gn6j7od5ir9eks8a6yk2a4jp4y6xu6p2a3vpgeh1h63l9haitxq6ypapp3z4x',
                username: 'ohnms0zp15rah5op35hl579laas33nxb8mm8450bwrnuu3c7wiotmbmg809z',
                remoteHost: 'xf5gejdcpgkehn0037fzon71hagkywn5rb02jd6lhcn9j008n3pnt5kfvkole2dciihf8thz6vl1lr7gtd778mdrxd5nav9jsazg0vyi1h2bfcugo8v5gyqgpd0yoxrcr0vv9xvmzfwbve0rkc82s799y7wi9alf',
                remotePort: 7637987122,
                directory: 'kaaypn1wxa1eghcyn9c8c2tde0wapjep1kb127x9eakrivlmah2p0j0lnd06d72r2a5t4r8g93ymssjggyj68a1wqnx60japqrkbkpkn0coz62aoyrqxe9nmwvn49zr3o9waiigydksc44qnqlxd2dpqu3hngv9jlt7czqn55gfq1pj420impwtawburbrovmc35zcmgzqcoebdd1lpd6ocqdw2swe140jsqncidkpehc5qd18kxrhlwogq4md51x4wsgyqwvnne7m1182l1r65pp2e0fe7dsswvmmn4ya0a135ls79nierk0jtfxilzzimhsjwpr45i0ubaslq2s13nv671fzb4rllch4meu38dgk6b3qy33zuhmli645vw5avqsgfznwu01kidhbwn1vyiy4pp3orxitquyu5k62iflfv4704tp36o7jgfr49umj9gua5g8gibd5wirecloyrfifkuug0lwsarv9yu6tuj4ic9ma1c3rsrd18m4jeqi67l6fffw6026j4haw7gq1cwrqj9wwfuu3aqxdq1eswosmeku2s50leco2caoi4ihfpulbr35fiq7pq3vbxfjna38ud5earsho5dmpfyx86pkezkjb745x2qyl4nhfaoz937us89zadlkhxb9leu8otrs3ipl41q8l1gydspyh4dei7laqt1jiiwhc18djkgz8i40axfxbrx1p61fel20no4x0pyxut84nds8vimxdhksm3ssca9djpsc7opilu5wanco6720sx6ranmnslsfz2jr2n3jw6usj7ehh0f2hgnwfomo81nfw8i713wdc5ocp3rreg79o0qq2kui78igm3ivlc5wzj8y8zqlt0rbmve9gk34tbcrrfd9ehtdn27g8yvpss49z2vjz0btd60dvezwp17bymxf3vuaewqjqylp7crjalyevn22b0p6x2rq2g6t22lhxaucqwp4m34887xyjo64z4g51xqosuti0nkre0d8onv2l4kr7yun5g7',
                fileSchema: 'rkh6n8vi5setq8r0rribkavslzfc7zcox0w5v3cnij2ewfad8g5x0bjq9qqvrvmn9iuaumynqllq9egju0ikn1yccgxcaj7mqqrxgk6woe173cqtr57rwvuf0xd1fppailg6p1uutkdl843bstj6mdnylua7oz1jcfyd6aj88lkwq9fb2sxyhpcvoiw4syayr20o6qwxgj0kwvuwfa102f003mpbzjsjckvslgmktkf5lay7v7os1l9utwhewfheh1ttpgexoocer9be6p8k1e0t2n5c2hmvbyfg1kglnkt1dzcwi0vu5y2sr2pz6sct1y4bcvypudjpc6twnu3s0rj97371hjmcoqxlinw4xcpbipn3n9e4n32oaomyk5yqipi895c3bwehvw9mxa30jkh8lo3mqmsfinbpl04toncnsz3mry98nnxvn9re5q6x7us2i2emz37zk1r76esdz2wo2c3mqj81adb883611d3orqtha09thsyv7fnoceloouc91w9hw04cnwzjchq9814irufj8drb0mfud3yd3edkkmj5ojy656f7f2wskdowyyjcsu2c5u0tidtldgon8hvj1ioyawcyag28wrrw9dalobugtrlgqwhyj5i8l8m2cjty9fwuvd59ekth0hfc1ln4kamr660rnwg1rb0ka1ts1i0b2qtrpq9wf44kq142rff4i3fozcurwukcke8uwjddldlo90cuv9rwsiqgqdhzah6or592qznt5g9xbnmjdm37bn5t7tszux8kldz7tkutnuad4l9w7fqr7vlsrpi8uhu9e6er4imr4gg20z7dsorqgo5uvjr4uio8hfukzycvlctshb6o0kay0guhysvzboe5cfflu4xifhddcamk5uo1hk5zxl3rypefsbmiv7wvs4a2n8nkcotm4l2s872cquutzbxf4lq32r3ym3iwotvqekm552m1oud907mhotusmmmzsiza3b1w1slmfvr3u86yaodlsxbiyta2cn7c',
                proxyHost: 'o6jfukaw7nsctcoxr8mk7xbpwe3grsuxgi2cq0vphjr3ckbjf3dp3wazvog3',
                proxyPort: -9,
                destination: 'ci2agq8sqavqyvf8webnv72q2tp33y2npqkuhxdphyuhgyr6l8norvvrcwp2ua7dy83pcnqol8euvpxb2xavr2b2yxrcvuy15w9czq0vqft2sl8phc9en7r9lqmmaw07wwg1hufvxicpzzu5168nnnqzjp9zycxv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'p0mmn8dhuwslljvi6tebz1j8iwafmstwejd60e67kxf3mays8bsmj3ab90bttnunnys6j6s132p00fsetw6ludtak1hu4sgt30hbytl3q5p55frxxqc939fc298qsa9uzeh0ieoea9mtlltv78o6q6vnwwib0r1h',
                responsibleUserAccountName: 'xd8b245gxxask2cltnki',
                lastChangeUserAccount: 'zxfiwgj9t85uam3bprxc',
                lastChangedAt: '2020-07-29 05:47:56',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'wwwvjpkk9ku7qb8ozaelu7jq4xwzeepfs0bqahxo',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'h6hysh3gas1ugw5lz02j6hve5bv65u3o7hzi0ubeirgmu7kz2k',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: '99nhlopkor7ai414p5wa',
                party: 'fzus2z3lu1ortlp8an5syxp703e9mecqjnopbhx2n0hungjl87xdpprxk9wipximi4pbbtstg3jwa6jxkj2utmhkoyyx2mtcnpvkcikxx31uzh1rlw7tawapv6yvgewfjub36j2vwqau6y70cd5jugbz1lu0smbt',
                component: '4ncu5evnli743kym8ip5fk519n50uybpfrmv72n8460ovdjualw51hap9xi5wuiebt59gjouskxmy1bmhg9s66gbsfzk2s85ctrltygij3d0y3rafs5fas55vk6kzpniuxwc2fnx2uz7791xismg88q7siqi2law',
                name: '6c9wyelts3cdypghl2phx871qlxm3tp21217tw9kzya3saqsl5lnk18j9v479cp7xf4rhhvgfzbgz9hwwwmdy941r8379kn7xafkdvuwt2ygm3n7wl566hqliif7j2t6nxr2jlmmrslzriihtduxm81fxngzbks5',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: '5y71wgbf8xnmtx4b69obayu0o50yiekwr0irgf8laj7lniarzv6x9b16h3xacp1wjfhjtw6gofbwd21fgtro3e96ygwju9q36wkine7c9plvu3mdwtq3dtnhavqydbprtvgo7o440uavskqp7aqhtd2046i5w8uq',
                flowComponent: 'z3svvnzek9k3l3sh9s452giebkwyo7mup0eklz33gwutqznpgz1sohkoa2m9d8bxef1zww33ob17ym99nk4e4mumti53ynykbsdbdt67hnu9n6olhoe9azkndj8otae7ridg5se3lnosmq4xee01gcyrgxav5p6t',
                flowInterfaceName: '2g8v6b9jr278yxqbal7pqoa9tm58gkwudx7inp83p4oa43c2kh2nnfqck03t6q18senbud9obo65yq3dx2lkqb00ewvu30g7izjbgrk03pr9zqqr7n8gl34y6ucu29vaklvk39q6k44sux82gisd92d3igvmjwn1',
                flowInterfaceNamespace: '3ifooemnalvmofbpw39bj78hwhptfgmux6fxziz9wr3vtiaeqb7uxnlogyle5pbjuxmm3vlw584lef3s75rcxmxn1ru2p04tzjp0nxs1nv95yoje5r6plawtth4zvbk3q5b55v927po3gud4h0nbm8y4r9qowvcw',
                version: 'fou2obwz6dpin7gtn1aa',
                adapterType: 'usum78k07jkeyyiw6n0u30jrtz52cdgpcdrun5hz0rhemxsqp1gjslf44d0l',
                direction: 'XXXX',
                transportProtocol: '689ujgvkswcyk55vzu3c2igpebhumibp7t70ar6urs7i8vzcsbyips4fmq4g',
                messageProtocol: 'geq8vwf5oho517p3e0hjp8qk8vd8ydt9meo9z6wvner92r7tlfzsf4qz0e92',
                adapterEngineName: '29n0cthu0i4djtes0l25yerfa0bkpq52gvl2p4cg6j8u7loh99at21xk57np3fzvztlg7060o375m5gv0crcslr3r02bxezc2k22j4kaw8l81gxvmyf880bphjhpukxrta9x3k452obbqhsm8s6d6e3pz4v9sslm',
                url: 'mo993ixyo8n7463f7k3lstyfm92zdb30g6r4sxhy7zf9qt6os4d9gr8z0dmxhe85vze119aenwzv7pbhl852tmwykyip9lhk5pjq8ib96fmdm8v4sfjzc2b3t5m0ftdm6k1k8mpmobgsq0h17aj5dtzzcbyqiu6sn6wdqep8qixg5ohow2o5axkb8fxri6qjgpuy1fzkrr8mjo9x0pbm48v60ami66a0c8d6647hyrvfy8jzjf2thtuaqgw8zzzmqfhop1a2ywf2bgapfu75v5f6rvxeo4lyic77pfn463hs92mxmu8xcwpdbgoxlwdw',
                username: 'iw4fxyy85k6l4jhsh89kkab5re8zhannrwh99hutjvmuc1n61f7qmvty7o8c',
                remoteHost: 's2mmmvocr21bfxmtap9reomfpzbsi5tzeglrzpb5sm7v773rk0f7jw3bnn2ar1hynpyxne1qzhmtiue0wegzpu9257e60or76wmgdciew039yqbrlneutm0ujhzh4lyjh2q90dz1k9ciwpmeec29ph0bfq674z71',
                remotePort: 7311270845,
                directory: 'jkl8n5lnizksguprxymnxgqq805ei5zioz88hugxzcxy72spx0llazm0ydyv52dp4iy9s3j2wsesc4gjsvijyxqfkjqgyzzct1rlta3ccs4nglw86853dkdw3id2z9lqbpkibkl0vpbq78c3ytuyzui31bzs7fq7pelw7x7ss5u5dhdct5eyk0lt1d06cf9vqrmrw604mmuutjklcc9g21e9hwamklj8x9bfmplfu3jllrrh171uhn38669z9vr48nib8p0sb7qkspbtojcst897e6n42keh3ph0se2r5oxruczyb8i2jacvm6m8ju4lmhd10slyrrodk9d4dthtai0lfm1bfyw6l0vdrgeea330697xn9yr4tt6w66nfk85vjjcwc2jij43bdleuhuzvnl5kqoktbn7ak4iayrt6y6pgdwynamurnkqqroqkjh5w079q0bcgv4za98nl56yx53bs5mw1f7rhrqr4txn1i5hk7lzpxb9o6mresp5gl6rbrnju4fwsw3wwnf1ka7sfbg2q1xsr1k99r9vipumsn7os9sdsiirfadu9w1zcwd8wflp4aps3ioze46jgeatr9tidh599rzlg2wxx19ikhiewqdjvs2o7pmwypfmyswo2hdnllzwrwsmke4dwgixwjzs1cf1awze03ezdvn8e6cwgcs1vxmkoaue92s6ahfvcghfxmgpby7gkpfcxpsnrzzu3mp0hnge8xfy441b261luqr8fn6ck7x8oprx8igfdo6y0gjf8wtggcbwhzp4r39dhb422w36orhh4drwlqvyh0re4n13dt05yut3ms47c0klt19bvdhsup1o76oaz8uulg05va9xv7pmflwj88vzez025j4jmv520jm0mb3tc23v1m3klcssymr10sgpvwot9i81b9ree6kox90fji6vv50d20wtjeo3dvio6udviow7uvernhdgxzbxuphqqg6gs1pxn8cqnbpqkd42y20vgqsgq51myr8ws3akbrk2',
                fileSchema: 'cx0q40gfj39ddxur8aii2i6l55kpdddpefkh3maxenym9gli64hw6zl57w806gejnw1pqz0l7sbmp4twg6qwc0w2jph95bhalx8ezs9e89bfsn90j7b6tf3vpuey3jandajx76aigvac5w3iuqishu7ijppm5ixgyrx1pmalxlhx5gw4itbxgf8znh1nsgj0ltpi6t95pdqocdbyv87hxktjabzdpihditlujwe52yeq78apf2lke1q06s4vjdgp9qgowug7ucyad6l4ebk5q6ui0bvp311gb5tz22e2pyv3s9j36lwq4fiezvlyx0mm7p7wlny8qjbd2frcgycojowws1a5jflfijg4rhdjs8wfapf5uee799rhxs57tuqmfwsac9vnjw1qrg3gdh2luifyt6f95rbt0nbxrr0vrf4m4q8j5fo20btubxd2n62pbzoqf20fhigeop8blcvws6biigdomijk8lb7j0tmqt522vmgokx3gxvpz72mcv59gdh3lrxsmflvxm8bl5m4me7mccg9qzi7sg2gn5fch0iojjlw5texuudub66yfm1obcani3cdm74q21zgroafj8nd995jtuh04c1sniwppaf8bv0qz0biffh8ym07wwc8zh7fgp707vfgh74fycvfp9oxbwls3a8sn1xuzpjwozq9f0uky04zlvvj801on0nlexdj3v3b5p4yxc9zbxvma6cc8luc9a6i5g0o9xym8rhlewfz54sslxe6yzfntry2cbe1ucvmjdk6euvw14nzdgl4kue0o15a0jxf5vry8jjlney7exyhvm8ul9f17vnx8kmputdox3gymunvazl0fvo9gaztwe3rsecm1irpdlq1ls8g1ro91t8uycpda7l6y5vr35nvmwliae2nlm9gjqbue0d0fy88hxfbn5pp6vl37othrmfjlfmg0v89y5d6hwk2pn06qyd4yny9tc7ludc9g0ivfr9cki9zsaogd2qadddi3iazv7h58b0nckcj',
                proxyHost: 'n7jicztr1mp4jwxb2eyavbxdcbh2dwu61o5r9ef9dn2xtdsy0vx35qytl3cr',
                proxyPort: 7143469318,
                destination: '6spsssku7f36efduyppkreayae6ie9onkwaej6hcwvjiugai9knadpr78klj5beayse45h6pz7mjhzombf83doq5rba0s5grwevmh7ffg6nbic0wfwh4y4kr61cgnox49cpk7wvwiqyqu3jbspo5ieby5oe2wvyi',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'r3b6wmf2nrf5ggtsucyg22hmxqfy59e5djv97oz7zietahihvpuux3n9zfgdzm77m70j46mz6zxxz7xv2klo09fgenslkh151t6iq8xqpcn7gdeizfkp4wfmrrnzmx1hxxfj3w72wrrvrmenowhw59wgfiv9ynvh',
                responsibleUserAccountName: 'bx0tpepto8ik5871lwkb',
                lastChangeUserAccount: '0fvo2mc3bromodfrbq7g',
                lastChangedAt: '2020-07-28 23:29:46',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'glpon9tdrdkhr1arr4ydc6c7xvcr6522okitoo6l',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'epoz4rihm8e8vlktuo0mt7lg9uh21ctymj2w23a8nfcmmo3uhf',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'zzol25qh2mjv2b7d457d',
                party: 'wndy8o3a2rsrlzq33q93l33px8hi4jbjggb3bymi6tigza5ftsmc59t39w38ibzcc7v2r6571rlh37gkphra96irqmdipesyicshwmy4eqk7rqv7bf99r5bdrh1c7irgv1d88w6vwg5dtldptlwd0u61u21rnpxw',
                component: '0djj1ovg1e2u1kw2jae8xrq4kji52wjaj10mx78sfasaxmswlkq0lvhau8wrr40l0smjzt0jsriwn1p9h9gr6iicec9bfgvs5c3v09bhtp4foeo2zfexltokjhv4x3lmenvi5np2t7q3z7mvzqjf3x3a1e2s7vqk',
                name: 'f5dkktqrhvpkyxx24q2x2u0egfuz4rylx864zoqtwgv55ud7pa8oie4odmvqcpfxr5vx7bkwnala6ioobw7pg2bbmwmsgssjmdf9k76jxis3up9s15j1uu6cxjsgqqe99ycki91zr0bu2v2p9sypu38oae44vw0m',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'ft3935l3eawfcsdi0easx7nv5q3mzih4p1t2tec99ei1gacenl3zig055alcjvvxij4y9jg8tbhe4amiao8zrpkh8shyxbap867qcgo6uhilhqc9avjhwpf0sc7vzulqxzvdujckmbpsmal05n8oknmeoyhbg4nz',
                flowComponent: 'v362n1x77aqermdeuerbsv7bctz0u8kdvctxstlxv4ppj7e7ktyvvl3knnivlump87zbpa47bt0msuudpfwwdb0otvo4d51pq1cxgdmwziz4aea4ltdnw8eo5x2zwv0teojbosmivjsunxu9j4at0nbsqrv7fq68',
                flowInterfaceName: 'y4qxsndv43q1qb8ne8l1pbjx4xxnvxidijbwkola4jy415t34yvno5kxvtrz57gq5z5hwx53oubm1583vfbzpjsf3i8ewyek7tszg02pbzv5bjbm1cxabva7k9a0ws3mra3yksl17gjyvsi1193zge35l4v1wh09',
                flowInterfaceNamespace: 'ro84tvnm75lzihhwxkenz5ksvx7kuaono817urnwg9uycflie7qzsdeu343ymg3iil74ivvyl6l2r4ouz904bq1fnvkku83rx1qzsi1g66cd3gqgqpb0c6k58qb65zdb9lh24d4luvxkqum81plik94npeods6r7',
                version: '8qe1nx6mt910j0exfkk4',
                adapterType: 'xmos700scnwsvaugsm9ffmeszqobbr2uyk6mhmqypnr9yfasp50okeiaedbn',
                direction: 'SENDER',
                transportProtocol: 'h5ebso3rbwdhmt3vd9ci2ariwzcdsxkippanij1kjplsef691duxjnufvkfq',
                messageProtocol: 'h6b9ktttwy7wmialkzbngqhie8uc8wnetbcq3udtc2stynj8fuh9kcaumage',
                adapterEngineName: 'gay5hlqvw77blbaozctmkj8a74c24v4dehs8g0gyxsvlgu2ca0isfcwvoe76kcoho0d8c8rb78ehum4xgoos0ko1h79mg2mroigrkyk5vkrxyw1v2bmidy6jurd7xhgre1w17rh0fxxv6s0kk3nfuy9v4ykuifso',
                url: '8l02yjbdmz1m35qhux0bxqt1uezoayxvo2ee34b89i8h0lul41kds1ksll865qv4h5x1xoxnrmh1fyu5pkbth1ra7ku0gdbizms46l10t28zri86rtl1b73jmll2umql9sm3nmza3ppwokuy89o6eweu05syvqg61uiqytnk8n5w95izccu18ywzikf67svf43rf1wkrajt3ulcdksqcuvffg5k7q13loqcrk3aaa4okqoic7w6alg58xxwwrr3ajhm0kk9tt7uly6azve51axlog9zbfkq5zamayz2tc76wcrk6977yk3l2vqcqgykl',
                username: 'xlm1xab8txv3bl9zw9oad03r286jtlyn6wz58eu2x2s8g03kjrqd3ar2buyr',
                remoteHost: 'dscj7un2u88h4d2jayxesbcboloqxvd0iqccv7kibpjvfgehzgge6j9hpjsqeeqk9g3drjjtsjdbhcwsnadkxxi0mvs2btz6wr61xh130x3tlvkbp1l7rr4xdd27t92ogl1cslbcwy9oy3wlzkokhps8viu9im8e',
                remotePort: 1285986195,
                directory: 'chmfytdpeyf1lmjcomswzzw7zhc2qgomt71s2bld716nk7ymh7vad7gd510a9dfef5foyti1489rj95uokvnrji0gs85csjblbax4nudl9kbbyg62uog10mha92l2svboqeqnla63sazjxgbgmjxuh4irtb7728l7uquukjr7q907zzep5py79vvv4kk8qhdwiyfk5jd2bsdcklafb274adi5rv6fdpuivzcgxpkvo2khz55km5593uzr6e96w0d3ukuv7in65cg2og8mlp40l5179kb3jox07jzpa3g0g3v32bp1013rvilmlk7jjvwyv411ifck9o1w5cy31tn85t65yryvqcm3sybqcfkdy9p2u02tx9zqq22p6ozui64fhguyru64b76s45427ks8xnjhz6c0cldqrk5n3h0weobn1apnazh1m3mq7espjg1vkwxsfm0vldekpi0qn25fjfgm3el2dx5dcxyqfk1udoiyhh8ttryn7t6mgwmlt62rsif35f79t3ffqps1z3d5mp6v7x3rs415s17746vx39luhu8m2znhkeu11ko91gg7901kiv9pu5na25ausatkv58kmmhun70xn5u9jx1e705o5tgbfoqd4lxyropm76pm1vaj3qqr8278o5y0kf2jaowuyx5je5q9ptyy9dgt914crjou2xaa9bi2naudfjfvjz90zobtmrsqf044eosomyr40h8mzj6gbeshqxik4y7y5dugtc3gcixrain0ojdmd7aydurailltnyrzbqmthw6nvzys26tnmd3c3vjnwccus3y9gx4d45n34vknh9038ak5vuw2ky9tsj1lo1vwhy6vhh5vc5kdn2pv5m4ahnfbuzi1nvnzirp57ynrvin1ny67j7uepy2uc1bggfo27clonxfwsip4ce0vvcvs8jcobb00a7pjwwziubpfkhy6jgzl9ei74oa9f30e3r0114ihfkidy65f8qwnrcne65e035lruigsy1q6na14ydg',
                fileSchema: '486x0dyqpk7c0u2g9bj7n0gdiwa4r7yuac8i4l9b90hu7qkmbvp7dfuvtk5r6wb7c05cv3thnrxhqcs59ifeqflenmaj3cvco7qtyizn93ac53effwsi7cv0zwopg7a06uvp3r0hslz1qxojcfh9oijfe4pzxcrpw46xqpnuyjm5ngralyk0fx0xchdhrp4vo8vzo0xl8qsam8alno7v3zceellk4a9s8udpfkx9kd4vtqthsgqhiqlizwoya2crnnftwae8htjj39k0kgyij4ngyimfkbrx47dvej97tvahqs0n2bhqcaybjb2i7iwjv2xdzpfyapfl5st7u2n0lot6g7twf4sv4mf2i9ftctuc9d3s0s27k67frs31d0x0v2udlmlapqxw73y49v5sds0u3vi1owdh7505liiivbxeocclmrwjttx1o3c156dt9mlcs1p6bh5hog2oli4aw89r866fmv6v405oj3inivnmi0yi63tlgrqrz7iwgcew1rx3eg76g3hgs4g4uede03ovz2g6fgo1wlq8tvd8xwsre1n19idi7im0j5pqj5bdhhmm3rwibsz9twkkklqkugwgxyznjaljh170wxnlygwxqc2ap004qfnble2devevjtikqhvypkgzd6sxq17hdr2dbguje2mrzf63zm6gi5x2vnyqm0jqtpnpv0r3r9kmy6o8mevu9xxod3ueefzbkyoqggssal8xxqzd3wqdrjignbo87xgubaby7jdyxuaftrck1i9bkcmedev8w636crji9v44mcvutewlwgt6kbpj69us6c933b9um626ygxc5hw9tnq2haw13gpxyw1r6c6xc7i7ukrp3lhgyeh2h0g6yt4zks6fzequghvlu2pijcqm1p9vsuben6ygxbfxeinay7y8nlsgvt993ucuytoq76jekwz4508tizr75lo752evh9ijnxj396uey4b3icfme77v3l8ihxcvr4no4i6ex4y77i6b6ona27ek72uo',
                proxyHost: 'mrwng5lvndpaj82ygl0ix1skiri6gqe61pj9m733sk1935y3rcbd54omq5hq',
                proxyPort: 5081679994,
                destination: 'ef9v91bbz7ifl4t2depjyckow0kqfnmxs65u4medlt9xm6xw9on1vjanp6gjdwstuvwk4sumtrzne52yceu2nddtx82sl2bsrd3cam2onuite4034zu3ja0nixlv0mc45ew1qa406xo89enmfz0f02ygiu56odex',
                adapterStatus: 'XXXX',
                softwareComponentName: 'dxl73bb1qevmgtz59dbqg8qzn82rfqyl4tdyz85qzh9e82z29tlo3ac1qdoh6gza6kaptmy98ohcf39r8mjbemzgr8pq6qpksh99gkcogosbsyh9wakxxf9vzkllif8b0mc13vx4h5zmkd9zah975g9nbjm5uair',
                responsibleUserAccountName: '56izn102yexd3zh7hf9k',
                lastChangeUserAccount: '3374jokgbd693g8vh6e1',
                lastChangedAt: '2020-07-29 12:09:36',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'ir1gl41862fdgrxuyu0eixk6lyc6whyaaw6spot4',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: '456eeg92lywderzjoag6wt079tfo0ewxhqhxlzeuatds7cug8q',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'lkmyug22n4e4syozd8mt',
                party: 'da5m6m1pigug5re7rnw3p4l2y21ksviqjeqlelull67kwhzdjwo6lkxkgcx4ogv486txu6eiz63qksxeb7ahjlwo2ix60jvq0hmvq9zubs7w9t7pqddtc0sv1avrclcam95etvk6gpj6wl4t3hkd44fo716fn6a0',
                component: 'u71n17w6cnuvj098eozq4jf11epcepsyx9h07johsi2vptialckr68ctou5ym1cr80c23wx5jzgvuhbk6oqmp65t3ainatplkg47iykzd17j0efdovrolvr2srm15k9b95460r5n175d2cbixz37dib4e39a5n45',
                name: 's8z5vimxdqmpc27odvoxxczae9zd134xpa6a0ohrytj2cveyu1j0bn0han6ic3p6mdczf542rerg0urtrnicmxivwlwib5w5s1svkubl7xvkehokwyj1godow5hrjq3rq42z5goc54aw3cflv8qm8ueosm6qjca4',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'lp9yp6ro4iv6cap3gpgn77mf1afof76ln1cdfix6g29rmeg05x1qhwiv6ii5clqcxrypkcuax4hkymxjgxra6fqnlkl0e82di31xsbti48atr0r8ke085tfrpb2h5n5as7qw7g443vc9csbq5qwxng20qoy1kb1w',
                flowComponent: 'y4lv2mlb328ilm16m2udqkzazqy3yjg076iq8xi8nuf7t3n4ba33waf23jbgsnqdsq88d9xab31biwjjaq5n2at2v87yd83rrirennxibqckk9h6nqzbkxy19sqwe3orvp3t219nqp3bqa38ktkkj1eei67svy8k',
                flowInterfaceName: '50odm9xbq6xj0thg4l90zr0ys35rdv2f1y9vkbqrphwm1aeu2schin87c7bl6fl91xkgb9h42wcf2wji8luigxoftj78rk7pkb6axp8zq9k7nuhue3sr6hrym5p5xoz95x7io3bibkr7mn94w0umlxbysrczmq1t',
                flowInterfaceNamespace: 'ixokbs41z9vnasg6o488kp9j6hujpmg7puyzs2m3ckyo0sn5qa7b1c686vkcosqq5u7q7iklrdllpvec1hmuidi1u0yq7ygl504zaqwnls9xk5vpjjk0nodwsaw2as7vmyz2inskzk1etemrc9ys23z2xgfe4bba',
                version: 'dc99bvx772r12rt2j0lx',
                adapterType: '8wxuiai18od7fonv2324002odo1xlbmzx3smmsa67ahnwr19uo8kqhn6d5if',
                direction: 'RECEIVER',
                transportProtocol: 'ubwxp5v71hcxt50u93m20tf8eobdrinsdnh5usrcx4qgd4qjfj53zxqeb3tn',
                messageProtocol: 'tyax0y6dzvcw7qpvzg7jhvzf9mxo2bd7a3ottr2q7ntz9z1ogi6ismy2q4kd',
                adapterEngineName: '9b4qkxgr0p7qzduuv0f4rxlped8jwssl10n27c8pomt0p5iwyiti6m3kavg3kwj0yl8d0a63aozifp3v15436zhkpahcjh9r7v5uzroofq3muxodirc0olasogndyewnncrequ0se0yktx960uo21q7l6nuxbsa1',
                url: 'njdjw1b9g6lff8mrm6vvk4xuq40tuk18r97q10ncem2x0bg0265525p6cmxq7si0gli5hwnhj2pxgn99peugkbaw6jkdr1h09l94wvyrzf0gaaq1kch8zfov8qotw9arkojsrto2h2p9htc1cwdb1oeq4284jygj41p2eja7ww1pw15rwcb02ig8aq691jfpzvvigsfmub04497g3fe8rzlsmkieetjk9dun4n2gsj1ypniwsghv6o96bj5oa58sam1npfmrshavetwkkzw3nu4zon0imdetn2fqpskbhbfhvfiv5glwy1w4bs5ar69g',
                username: 'cd9duqbe1yp5xgi8otqjq8cosjt81275dn4efeh23r7n2dlvw83jgfyahc82',
                remoteHost: 'o3qa5wb2vc6pz516xqqo7ln3xh1n5zgigb2nx7nt7qt4v4xv64iupdmosa17jo9xmz4qggh1fqicoo0cu98dwdrnkeeckskgi9x96g69nc7h0q4qaaiec86g0ag4c1nfr91g4g71vgfkz51prhbhoqz8dttx1wcl',
                remotePort: 3513640743,
                directory: 'n6sbq88obnwdfladrjag30edf92k4y3ttqgj02aal8mfwmujnxlel5oogvrqt8nqknjzezu4veinlppd1srwrz88uio2cr16lcqpqjxiabk8zh02sbnxubtwy8wllb0r395kz6izyispjerf7bm99ugmpgbcpwfivoslu24if3myetk98qh9eavcjjqloftus36azefx4g8ns4rpsp7pmza3e3om1jrtqyc41x8j6b4gd9glj4n2xyw9krnj0lnz432baiekec8ijbfb06h7uxwt0n6wdugwtnzniomduuevmvo8g2aibns9knl5mqbhwlvydabc594jba1ja87f7vgghq8p3fncxdhsiqv0w6todnko7m05ybb072p9dzswpgmlb1rmamh8x8yipegbm9uygw3i1ha7r5640m6tz4rr57buutjbkyamqx7sxbl3v1h5xulg1m12h1oz8patxc2o6vkf1qpcyl7fmpk5mssaaqoj0hzzm9kelp7bg7cyufbzayhi8ts8wgiqsba8nzztm4w0yiynr67ftq0yhp2u756a4p7fe00dq5xv77q7imu678m9509rrf2x4bh9a8ii3kvgoniv0a7thk87uonddwscmox381x666641vwkslzzz9zb63kb2mp0hht0yti4rluykyiwfgkpla6d3pa3mk9ybyzf9f4ke9z05xwyegwngv54wxddhbnt2w1x3hyukfbw6xdqut14bjd5w3vz784nscqw0re8c1gpmf16fzpb3yqhjtqxbnkt1cxy5ecwpn3uk01da4b1w2tpc67h46fgh9bz2yb2h52bdc7avr3waeej24a416374gx86oh03yz64qmjkqa1zz56b8kizszipiy3yyc39b8fv897vb3kx6zal2i49veoqz4uais9bm5xjktzav1q6ktr9dob0n1yom31ztrkjnuosxq9xkzuwbiveh6y585rtljdmt1otl598fuxtqp3sk7yxcmhtnx00kc0vpl5dggic5jf',
                fileSchema: '9xh8ehxhjxfi9b9h5i9dh6gphj9ticr0ce6rfgrcjpum7b1b20o2ccvi654yv8b1ionph5op4q72bf3lraq7h2yhynt501pbq09tri8938fsixjj38ddrtbtmqtcg6v0rqzgtnieddhtz0dl3iow2i8awck3zqmhqoiblal9h5iml2s36gj5oj4pu0zs0vshc6pin3hgb5kaq1mvteon6p5jr5ggiyxwumfhdt44utam08bedmi0iaecm3czcb8xgr3cjrniriwoapkmwx36jp2zpl8h0dupnzvy2qjxxe2tx3lw36u9sk02fl3qit8qjshp0arg68lngjkk59mgheziqpyip2deat4jsnehbli2f3boo5q3h2wo7vg3087jlmkty26mtr5nik76jnsq0fqwwbl3dxb2t1xossx7c4fvpf1msb354qh1ahubvu71cofogfzvht0fnqwyt9xafm32ncsfj5updxga0o1hv6p2vjbo5ovpe1al24nb799gl04kvy6m0sjsgym2uccuflgeocrj056btl43qbb6kmdp71e1pofo6tvlx06w8k2hrfrig7ahavdj80cupmg4feyrl2ovby5g81cniloxlswgmqxr10br7uqmlcl5u8yh6zbehyocuuaanyimlrhc2qaa0l91bjf91j7ytx45q8tqddglpmlza8xounwp1o97pjl69nrx3np5ziyfwd27kcgswkberp2jb3bklae4o7n4tdljnm1fux32qns07bun2orznhzvihhxciix8t8eix0z4k715x0jzd490d7nb3mtf3eaxhsiq8sjg5oo1jeubzs15pjhmocirhy7lbz9zirsx20jqww1mr3730h2qqjuzc0129ybv1xpyf9l2gq760seox00kptfw94zqiq8sej947utn5qxjv26gk9mnhgwtwztcgxc08uf2wzvwo3k8opbkpzcmuv3hxbamnkl3jpx40lmttomhc9keu8p8dfg954p1uqnzz4snurb79xm',
                proxyHost: 'eh3dod0z72jb8lw3rtu7mfolsqz11cgocatl3gxc0hlbt90edr6c2iysw6k5',
                proxyPort: 7701471268,
                destination: 'f2rlodiayhs3yyqx7rngjst37foxmpp0bcm94c4en4eyl8ribhvct1ekkuw99r0hxy0owqe03vc1y354g4qq14n0qlvrgk7e91kab8r86g6x6f2kzi7jra8y1p9yj73po6go6o7pdms8win086gj9dxit3wexxgw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'lgpvbwinapsz66o7fa3qrpj58xejgq258ifk7bwyuyle3661k2cl2qd876ol5kicii8tkknne5srl07p5wwbz10wbw63fzn6m2qd182ggoqtiytgskyyn5rbsqdfnhgm40sr35fc3sbao85lcwg0ecocjey4o8is',
                responsibleUserAccountName: 'vzywy9qpwalz0lue0zau',
                lastChangeUserAccount: 'ybd293j1wxgso6vajy6c',
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
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'oo7zsxtl2rl9u0b2r3qas5n9xjpbcmyjm0944u2z',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'a4ftkbawlzwvv1kq1bmk5y4y2c5b7x5jac1t3itju4zu6aa3or',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'z7kdyx3hhwwzfiqsmj2b',
                party: '1no30l4fit39ockjrdry4ho9dy4dofxgvfswi3bqccc1ur943ptl3q4u0savb7qo4op2d6n645wrs9bbvedadh48x7u89btysj17bjgc7ny2e08cfi2bqrhn4rvssywnsqvanu2ir0easmbm3ghhbwy29gylqnxe',
                component: 'wfrw5j37deqt9sqmnbqiabh5gmiydku9thzltkh7yv576si9e64hw6vjwqfoe64omtimhvong75kuzi5yr7jetvhrcnatxdckf30jmwicg242vy49i2psqcvzixy6agonzo6mxho2tycv03awuhzs4ahgv6tqocz',
                name: 'z1vwulcqse95pue12ybrikpchd87xcwtsw2odvu9mmek9n6tv9xy4xjj1hnhnbqynx8fkzzvvyfbwjrwrgv4ezidha0n3r14nxz7somz9h4oivq2ms9iqyc8e84w7b0obap495rzc6rjufp9eqyzo2n08gyh1r35',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'x0uygtbyahhckopo0jbuuhh371wmb8atxh9v63g1kzwcakumeirt42j825ccxj56qzdl5be9d4c2i0e3i938h0vxu03ao3jrcbf3xs52xrbkfaduea2345jhf7wbdpoxysyuk9ax4t25gu005s6gstix66et0bwi',
                flowComponent: 'pry9hkg9hh60y6qogn6xw78if2e2b2atekixbu1xgg92adkfvxmqp91zbxxuq84aca5kv65xn3cbfy7xm9dry1tx4elsaas2uvrnabs3aab885bh4ytags2tp67i1e6pn6q0wpehvm0r4qbz094f8oxe3hwrcga0',
                flowInterfaceName: '207wc1mxpss34sxku83cht79oynapx0ll22ivd4h9hse87gux1lhsphk43krwrp58llnqs2zuy936dm3571sq9pz1v382fal9xknvzodpieqd8x2c29hi5inqvyt6zhobo61izeoswmrz17vkr5qdlh5z1gu2j06',
                flowInterfaceNamespace: 'bqlono4b1073wy6zpmw5401s58n52tdjtwd4ubr2chr09l1piuhwaosprgfa6znpthrc4y9y0xd3cacot9fzlwkgz7bbv0uk26y3wb1cwjn381llx14spz42te5brsbnc5rrfnjkjq9xafhbw6c4hfdjaieg8hsr',
                version: 'jqsquro3s8u0f65f8q47',
                adapterType: 'w0cdchfsosfuf7frwm85k8e9berm48gnxlccgtusbcdfykjcaefc055bq49v',
                direction: 'SENDER',
                transportProtocol: 'jfq2x72ihmk0pa0t9zqwozeabfwjkq23ih9svw48dau0y4wzp8zeonlohrp2',
                messageProtocol: 'm5m80x3vei6ujf98hhnwbvkcjedub0k06qs43hilu8ajncskvo2yd7su95yw',
                adapterEngineName: '4ilnlwp7fjqbqkoh2e4q34s1t8ytym59ttprjv176js34u8jj6bw9bk4xu8hb7e67ndpf3jbkerndh15k0zzarlwgpr6pukebum6auz1txksaf70to3y0bl88rivmjzkplr38qi6nu5glh9jz6a5bx9p88gkwg8u',
                url: 'xj5xadpup29kpgd7j9z2ee1yb3qbbms0lgn79mbdsojylf70nrx5j0smwnz20m5n6wkzgytp47cnkjwqy1ppqnn8bsju3orujhhk97xwshh483x5b2ch23jka00dbgb8i01ax5vrewzzm7ap57rvesdesq398oskirjozetspnpw8h64dx4eod4y7c65ietj6os5ecr0kxzv2xdix99gjs2pb4d4hhgp5w8t1458hzyhf5sq37rjmbrfshyafd0zk52egrm3iry6uc9rruyw7183w9kopaev1jbp8qr8nbc43a5zhpuvjqy83ayuekbn',
                username: 'wqb9ssfinu1zeh6e1x45ai5za0fsk938u3q2n2ww8cc569ows0h4p7nm4bcs',
                remoteHost: '4r69obkeiewkel8hrrjnbdgu996f57zqqxs2op8f3gekyva231upo547fot4i27ayyk2egk7mgdzjnruh3p2saxwxvseovrqxlqjol4da4xc2g4f94hulo6iezhvy3o1l24ofxhk9hr9q4wcyuwhm5vamvahhv95',
                remotePort: 3334346387,
                directory: '2109rumbimc2glhxtlu1jucw21jlwsxvl347uu8fi0hmgxb7i0zxmzir2qgfr88yhylt6oelr1ihpbxsbkqch40fz14a1sca0pk9cn5lmxr72gdm14ch5fjd7wtarofvtg1vs9tetmr4ae3j526fd40kg1jfmdc2kg0t5u79s1f3eccg6banvl9xo505t4u60jnaq048ybtyq0mjz1thjvg8sjux9zxrgb65iqwkeivgakg69eqtuhfoaigj7l1wz56107v89kmiwc0mkj035yngtma3g6db15jswubogj3rpwhih92teenoys8sp867tvs2xpe3gqwx55dt1r9dd6rbsqquagdz0xj6op9zshskysnx70gn557cj4sp635dbf69gg2wfhjsmtx3w7pkz0vj67q789mbyea4gwr43cd8wps09ctfpw6xqp7s575txwnq225v8cqg020h9afahn4c7otfs7tkjrweet612ys4k09qp42qv7de2fqarlkij4m7b1ommngmavqnph2iilqo0h76769qv35km7ciis5n0gite9jiirrs3xn40uc6dp51lcrat8ms5g5l4tygl08gi0qm5p6b4r63qmvjwbzczilj6oaf42kxlnux6lsev38wd6ol3ueqsg3acjempokivr6bwv1nc5lw02e2nvb55w7jdtyeskimcg86u4j7hfbyjr1mtqjyr8z4uv69sbe8zwh4ekkrtxn0etug2auyhp3qbqn92jmbs2kljrj3bowvu5emcwzpdzszw5xkuuxjrwtadt9ijtd4kmsxr88rv4s30btik3pf01l56s1bp1oi66duizi4pl2ml8zy0px74b8cz8ixylk3dmlrrdgfpgo1z8zg6r14fvttswy9d32l2m1z74agzwbhs9mnclrj8cnvn2suhre1ha7pd6jmfr4bwd7ervnegocfcicqbzm92vt3fpj4cam7jh5nwmurjhr30qrgeipb7142082548l5nj5sxjgsz0ui7m6c',
                fileSchema: 'z7wk0widrkciwbiy7m6aknsyuo2wvdlu7tq4ziaom2qhm92qc5p9qzjpe0mdusf9u9a5wv9qnwvz38p9gam95bq79tm3buq0c655njvvzgm8etxf15a1oyla96vm13qyujx35lgha1uvhgxsiqyjbzgld9m1y5jnp2pej6pc8ijgptea22v1p6u0na0gt956apts2m69gi5yjnirawnlvuocmz7xf238l5mufn2zljh3qu8ttvmu82sedj1ca8o7gs4qar9y4k9x55mug601pchmvvaxos19qmngrvhqc77kbp598xt09qy5j08k320mmmntoera550sxptcdc6wl56f8p5wiquujp3jbhc89rgicypvkiprdp4yl5i6j8idzvweyuhxf7bo33w581g1hflug42m7nb6k5fm2n87vvy74w0v05zstiufxkn4u6jlew5n12hcyxk990qw3fm46tdc6cgdy6yag1z14rll4oki4f9945v6tiajx0zg75xu50xhcvq2pppxqzeytd8uiwgbrjzoqgukyi3m3x742snksj3lhtehe4wq778gz0ik060jn0ulub2fryeq78r8khfp73wklvy1arc6rssgsqd7888tcrzj5agzgjg2zchpfppryc6g8hdbdzz5jx3gkl5efbvxzp4xr7wohu7z30oigvjo1tgdjh4yplok1w1e0u1lfh80690k6g5f3o5qaxzdw0xpa6ymmib9pqnavvce7c6urfx9qwkxuyavpb901wlri92i9b2z53eafsysg2ie9z98un18nn88nz1a194eszrbx5h1a7o9xz1u6iborl1smmel8seqqinxupiemjqxxzz2u3ewbvdl654g7664c60jc7ekinyfcerwjb3d16qi2pghfs9o9u58sir2k9y7bvfedxf9wd6oo6uy0bon60kmladx8xgninkr05iq8g68pmoonlnq1t7fuxqromwmn2g70qh908ggsa15di51qslwfifrh8ez4pn5nbxt',
                proxyHost: 'iwl1mmwmfbmkblncr9ywt6q3hp965zm60z918q3v2thglew7wh9u1qnbansl',
                proxyPort: 5839667787,
                destination: 'gty1s4u7gibayqdhuqembgp59ejrpq01ia5zdzyse0889pdqa7ddjzgy0d97ruzmh2z5vn6rxox1ciaiggjq4c6cvf6pwfeow4x327sbjvcjqbbli220ov4lue44f3lcrxuay4ur6s7l32aap411x4tvkynzkdii',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'b3iq1es8e31lxtepqwnei363h4vfiai34whh1mjl6wtwbb67wjwjgwf7ukcqetpf8lyd86fgxr1cfhz5zvlxf36sz98mb78uyv53j5inqkgy8g8tnyps0gaswqtymwehkwicdn2l29srcekft45yexiljuktevtq',
                responsibleUserAccountName: '9rqoleu4m2wp8y8arvu4',
                lastChangeUserAccount: '463zanr6vmay0c3llshf',
                lastChangedAt: '2020-07-28 19:39:34',
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
                        value   : '6422895f-91c2-4399-911d-939f1de6d2ef'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6422895f-91c2-4399-911d-939f1de6d2ef'));
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
            .get('/bplus-it-sappi/channel/6422895f-91c2-4399-911d-939f1de6d2ef')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6422895f-91c2-4399-911d-939f1de6d2ef'));
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
                
                id: 'ce23045b-5c50-44b1-8987-3e9882337b43',
                hash: 'lhbymvpofw6y5mmgqywfv15m8ueah7a1opwxjtke',
                tenantId: '88d71850-0cf4-487d-9dbd-cb210c405c91',
                tenantCode: 'qrel9pckgswys2j8x5sz6t2rkakc0due23iuazwx2bvvs0qdca',
                systemId: '95f3c0c9-1eb0-4ab2-b3e2-c7258229738a',
                systemName: '24yzr4qfogpqxw09fht1',
                party: 'jutjdkq8yr4l5elnlzbo39j68sk3hhf45dnxe2aa83qyla7z25myqs338fztdq8g68g8xj5lpddhymkne9xgpyl89z0dr3ly1b6aswa92fwuh1w7biojheh8d5x0sylgj2r6m2rn08kuqxa0qzj62fqgrad6bwu7',
                component: 'unv5q8yw2vpqxuif90suvw5o5p6ezmq3sxy9qslbh66oib95smijrgczwhuonp7btur6nximwohjxwdqmweiinwswogf91z38rl0sr0bdxr6ajufqv7x66ur6a9ynqavvwo18kistvzl29rkrzleqw7odfw1bj9s',
                name: 'ty9r7osd9hb7hse8aieqvizp7gxqiwtg4ymjucbdt121yr6oj7na6zlsfk1l7y7fj5ajkhp5km9uw6506bhee2hgofu3jyh3n595g5p3rwucir3zlk2pnwcbvnccizk9mfdeurg8e9xv47zw79gm80xc3r3maxie',
                flowId: 'd2619d70-7e73-453d-b9e0-6051b2e07142',
                flowParty: 'hceqn5i7ncwa0nwv6m36dyxsl4yxczqp4h0eamsdehlarkv7ofgu3bl7ot0k5o6i28moyqbb1hcv5z00jz30dal1ysion789qhnk0775mo25udaagxowbuzux66kfeyl3f3lu3ki78gwut4m3cx24kbge4emu4jw',
                flowComponent: '59r0ycf5fzy7vmd5dhwce96eufflf3m4hfmncti246o2y8um9oms3of6cvlg7sv81x6b0tp3o5faeysog18a2amjbb3ppxnbv66qucvqfvot4pfptoaop89xvwp2gt4whdk4zqd2cphkjw9k1ry7wq3udk3oqwv2',
                flowInterfaceName: 'mryb65bbk1yfpqm5ahwc7yjapms6zj6odfb5cuoi6ofhyro6b0ptoxv2bi6ryekzeuh5uhbmvx2wvhsktlbd7n2z95wje0hl29t4shj1c7427xxihwjhw0vazgtcy8m0lfpjh24m7ixchwwmhccle2m69d464ah4',
                flowInterfaceNamespace: 'sme7nzjg93m3rmvphcep0yvmgufzipk8uluwi44en5vl1wuedacos979iz1ses7irk9b2d3qw2kac9eydgfxw5hdi27u35q5j2bpvde9l0jplll67yv7k96gql9559roi77eqftoz5rpiexeyxxc6ofkyeydqys2',
                version: 'yhufnjobwgmr4kfyy0jo',
                adapterType: 'rmvjyu578pwd61zlo1ubk0ezpx0eydvyyhmxoeef4unrw446bhwmtgtryf7o',
                direction: 'SENDER',
                transportProtocol: 'h54r3lpbvawlgbxvaf39pqz4elxx7dq9p2t5jriyw54b17854rl6ezkfnya1',
                messageProtocol: '6k6kvayj1mx5zzhjxifqfn8tl859kqm5zig772uot88jfhuc41wbq7cnn4zv',
                adapterEngineName: 'pa81yjjyhc3q0qu104342xcdbqh2fbk5cs6mcq2otg37gscq2rrf24gyqzlt2jxchrmgichhoy7pgd9wpihry8yg0sj2gvp1m7p358pi4wo0hegib8t85z9v17aes7xbd9rqj0gr5zj2rg34tqxq7mz5sqrwhgup',
                url: 'v2vholp06pxq9cp1i7aeq71drfa1jiaq9ah5nat6bdfvot8ks10n9goq4m3kcyav9iblvthygg9yjr94m1pkavm50qai8uh0mj0sqa5e9zpfxznakkuk9niaylwklg4fqlbo3e5cxxn1jurkikjjldn0v7mir4z6brzq113ndkptjsutvo9ypjhuxj3jjpjysaom32sh6j1lbp8mfv3n0dbbukmi8kf90seckccnad1r80wjxaqeh1q2b1b0a7kzmb1xutc3g1hur5fi7f3ufvewmn4mn5032inhnosh2dh9ca3ccglhypxmlskbi16s',
                username: 'qksb5uqfgibme6kv23ms4xvw1aygtzm3kiu12nxz9tqik24ld90rausa7s2z',
                remoteHost: 'khq7cwcirciasxk07mkcitcbsgzjl5x3758jg1jasfpfoofp41bvriieu5e8qyrpp7d3dsza5tfve6mellfooth9wvn72us6g401rb2hhbh4zlgm13gxicymuwdgba4jof2iwb4fq9z9eyp4ev777e12ar01t67p',
                remotePort: 8147210245,
                directory: 'cqmy269ec71bvhhuhvyq6dp9nchps7jr2uyvqxehq7py0gzx3zo00gdt5vgxc17bor9s4bpl7a060255abha4mas4unmn8kh1uyqiggjz9zarvwhipzxmzlmw9tacsjbm9r07rpmu8kfqcq3ug41ttuj2i6ai2gzx6cl0vsytki78vsv1kvd4lz9tk82qacfpk9n3lrm7z8k56pdbt4irlcvnbhy3pnpt2sos9739y04otva1q21wkkqqc5dscex9y9iok7g0k1r3wu6glb2jm54khx7m052f7x0fybxy8274m3y6kl99nb0kv66h8jbqv0hi8rmfcrhn5m3hnn45g4w2lcjfgiutijfyoo3ub362krtvdsuuq1m2ykl8wbeidtwfujfii31o8drv4xgtbeukjpe261onfux6f3p0iilgkglrjx2gdeepshhg49bsv5k8q2ee8y8lq1ypwmoziatjo7xmnhjiowvn5p6vpco2ddj12nv7c7uitjj4tm05pyol425f3qjmj8uswnvblql6r6qr86hoh7svvhw878coxa62lsiyvmayiik2m391udcbbwj97be3rcn7zq8rlmsmknszfbij4bbahndofsjbkf7iv8kduo1hn3yve125azcdewzbzqx7ca3u9i8ltl5jh4o7qem7pr1v4h50mtqp2giwqp7cp3kvq8lz7q9w6uqbtz3rdlhnlurwuh2b3iru3pkrac02erjngctxgb4ld30bb8jllhyitrwvd2bi1fb8qrze62ktal72c53bi4vvf4fhew7du9umb17dhcgmowx3a3pw9x6xtpagprsq8bb1uuppyhecv0mqkgvf2z37kmttj2w85w259hbmspd8u9r56umfoi49wy22q315kec35dcdqk11qocaks4r4uzvv9aczlco5sy2w0ls2vaq22euudo4brioztch65ocrt5mnn22g02mjelf3islzschou5aw0zkep4v7k8fz3wfb2exo0hqiff64tdsiud',
                fileSchema: 'kivqrywn6yiv42wwrixj274kmsvllyslav72gi0hp0wh67pyvd6lo6foa9a8zbny4d8gq0082a5077n67feabu7ipu6fbopao1gfmbxbrw0ufzue5zkzoc8mjwjz9f0rsoc7lpdghqfswhv5jo47ee9appa1wm8dnkabu1op8wo7v1v23o4c17scb5aaathf27n6xyon3o9jdwwf4x9up651zm4wr0j4hmnfxqrl2ei4s2karq59fkf9wuxudyszlw8227jiu322c3ys7fi92xcnekw6zm8465k9xeru41w5c8j9lraw9egp9v28g664uqlrb0319c1l9yz36cwnaw0kg9txu8b21rizoguggm6z5vnn4gcg9oh8g3p2uzsxj2jzucyw67fjiz8kalzfak0evnjjv2fuoait5k5edzsem2d54dygh7lzzjmwrjc7kiz56lbrcsjci99ewgrjtj2vp752condfr4f8dvon1f44qmn7ocnjv5l5nelj9oi4g79jfkg6gqiioazx1he7jsz5z1x3ctde5x5mfeo3whnf9n1bjahuw1l7lscdjggprb4cykimzrhyni4jq7f5t43txskov8pbrsf54qsic8y1qr365gmclqx3qfief4x3sjjdbuv184fbqjwc6nn0jknacft2ae24b6kpi98lhycdz0fqy0s3f2n0uehqjoqnqlzxts9yqya0x1nr72gl4fck9pyfflthcyv3b5jz7nhycgfqiv7ejg5al2jxxphak01a6q5sekal6bkgj9q220yrls9619z3q37f6u6gs8k5srmd7wbna0k6j1r9tm2u0tdfahf9cr0nnviu0e6tv2cdwbdrk5zoezd54ti2xhas8myqrgdy0nivxr5rgh070evtrcf2fpa0i7aabam3b3kql0jzto7yx9922dy38arg8jn6nbcyesy71v0jksi1vzn7u7el733bbs38vikswbxravcss4iw58nh5ik64w4inpenlg9l5kpwxj7nw3x',
                proxyHost: 'p6qbdj36eh6cru8n70mq7i729effvr3znuachl9soldklnll9bzdo9932u4a',
                proxyPort: 5647122887,
                destination: 'ovrp4emlrls6xhm066uzj4qml6u09laicbc6xa1dvsqwhh2o167hq12uofflo4ivabjxrmwepn4dv94g6f7dcptmh202drl1c18vezurenh1b61ojzvyw5dqq4glc2qkyad58efogkqkvk2488nsthyeyesj32mn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'p3fbow40eazsi8zpfgwvu5enyjpo4hxp0px1htshlglke8juqge6d6lgs30l08ovsizoaoteiyu5e393rv7bxxai642bxpc32powk9i34zlgamop8di7gzxx2ayysg31ullswui98emnobh6rud3ya3z7heo9xwk',
                responsibleUserAccountName: 'gelmsdcw8ze5d8x12m3g',
                lastChangeUserAccount: 'ldnsomge7fjktjfmafot',
                lastChangedAt: '2020-07-29 10:19:44',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                hash: 'h8g5m6lsmcwfk7kl5fogzhxrngq8xq9elm47ojac',
                tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                tenantCode: 'gahzvu82fnasah2vqfc02kn58vqnfetz6v11jzz5n9sby5lbap',
                systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                systemName: 'r1bl1z0s52rjfyfsdu4o',
                party: '6sxv2hwe9677jdpqs8kzetnyuilfrcev1mpgsd2vv0z8fim6684cg2o2x7z5bs26oc8ciw41evvbnx3lb1xjukz7w1nzk2vjh3go6bmbmxqqmzo6b68ntnr8gkyzez8lqjvqhztr32ti50xvk37twkkvv6jze74d',
                component: 'eh0uygcyietsborgb6pwzm64vr3qv62b8i6kno7vjj70y6wiht5pleuzojgkjhy61z35s9ozki40g5p06aq76dbiah5fk9qk3kokk61cazyy19j6pwey2nhcig24g712jzi292icp6aff9oel0v6xvp938dbb2xd',
                name: '0shziwo4y861p3mx8tfc3bcfbdh90qde8tfio1up964mhhd6t73957hsqheydhen6akgxpdnjovodf39v52tkwm3f5ei5ypmf5m9a6ww96q528kdg12ynne0y0mw0mbuiow05lg6rtspia607aziguanlv5whzr7',
                flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                flowParty: 'pcfwuc1hkje4yddzh2qqwwn14jp9d5bsvkpy6w3xp5sdibn8i26faqlhycmbqu7inhe9rxyr0zfbzfq2bees7ebfedmy6nalu9ugvscygiq2vig2piwmruayqd29bvd2e64sk2hhhfeqlb092f5v1g3rbaru9kcp',
                flowComponent: 'dh1oj9vmut13v2j12jiojwxcd3gao4h5luf7x3bejropy8okboy9odub6fe0dn7fhfanjz9mg8xpv1abof0jvg9z5w2og1fe6vwwusulm49tlzn4sitsi7pei8aml3mhu90mumqfx3gitsqx0pcau5x0mh74ri35',
                flowInterfaceName: 'osplli7onpmxfq8dlnlsvbo0dp03golf8fxp9djaud4uuw3c00qzj853aakxrbo01u0zwkkonbhsq46qlv7gmo4vm5vmm339n74cdduuvqoauba2a5vnwnrfki2v2g29lnxd19410mpco15a9v1wvrkxrugb4mcl',
                flowInterfaceNamespace: 'hg9tjwna3jz6qn4p4wskhpm8rp9wy7i1ywe708kxy5nzn2ajceah4vzyqtr94li4qg6g22tgypg8rdqwa1idetf9uyu2pl8j5yzppd9mj4odktyct4ucugj4llqyjkye7psviukfuk1tiz0dcavoc7wdos0j9w28',
                version: '3xb67mdabsyww22cdzbw',
                adapterType: 'vjetu3nzce4kxvz4xtj8lvvya4yn080dfsblrla1ktiayi43kxl1gytkp9x3',
                direction: 'RECEIVER',
                transportProtocol: 'g181xfosgxw3c3ehf13rpiy5nko7pf5jkpxq2zpl7ak7molpj0lzejw83b78',
                messageProtocol: 'jndg4uksuh82k23x813dyci0od5s4rbfb6vvzzogvhpnyhzf49lqfssbthya',
                adapterEngineName: 'dwdkw62xqnj7f96gdv1i3tyjtbdfc575dvw1capgtzqwl9977k2pnc9bjf0963t9blnasndf8ecxcy00dkpbmxtd4ok802wr1thq6vq0it7ll087a42s20tb8yithhkeq0pj9108txfaci5mfxv6fi7nr4umsh6b',
                url: '6xpl3z3dx9x7rcmdafri36czj4dxnx2icsl4mi6tnjyuwwx4u6co2pobi538zvru7w26mnocsuvm6un0kd83ktwwsvr0pqnrw7bmk6zlvi1s0zf4z9w072f47izjk1rfq9nkpebe06mflahzlrg9erwe8hemovfk76njbkd7f2r01yu3gy7omlfwsj3s5hzidxd83i2c58cozb2l4fcdwvas0frdpzrjlpu0zft8cyoo0va0piy70bj7pr72l5fq56b2msdsxmbyinjausj6p31n9i9r27hzc5ylilzzkkt7mnl5bi25qwaxjggcgk30',
                username: 'jq2mtv9tllckktwkvuyma8x2gvri09gsgljqj9gq7gpasalgnt743m4bl5lb',
                remoteHost: '91wseb5x1gv9btl4rgh88yfo1o5ag4a8xuec17krzowwq9x3ntwhxwaizgfzb5o96a5gl3ki8om1k2gxlnzly3m97ol6hjfl3q16oos140fm88i7yq6wkoogzequ5c24dzr87uojg7l4e9b71wiloru90fy0hhlr',
                remotePort: 6984167034,
                directory: 'jihqgo4srxh4dfi0d1usegig5mhhgv7y14mfxmwyq7z22nm8y3ydy4zcwlgbfwu5nt3mzb7dm22l9fkiv3dhvqc1jo0eynm58kfd7ef7d9i7j14p6b9bv6jel39wosmhacty68u3g3bnewa56xfslldr1c08rmnp5ba667zlakikmq0weofenienlms2bkyesbqi8rihgpfa7x2cgc34ydqk1mhffrl7ucak2aepl77n4sko083k2moba3ak4inp6wu3dev8cuy09z9ipmmn6an8006iomo3s2jrtgncb4jsxv2ohgj5p0rvu9jho854ntasyp9x0n67y3sun1eroq5sewn5b79u2eoxtgmrc6k8cas0c3bl5wlnyxuk1481w3qufr7kh59120zxa897ojvbb92a6af4u738b4jjkw6zwnila1w8ebuz29s3ngatj54jsgvelz1l7c4ovuj5bxan3x37ob0sp1bmk9o7tblkga07rk1q0ebtzfmf5gqwsp1uclpyzw21agwtju833dtfmrjcn66s08rmb9wrmoaqhey649bumld0o5wss8qr1b90o1w61cz9m1khahdnxh5qe2oep2rl64s5a2qs6lnkpwjk26cn7j0xo5w6wavgsqjmv88c0l87yke49omqe7fmxq3ed6ipu0tvkz7znrnn5jtstx7v9b34rdp3hxuzdkjnnsg6ig69kfnm2zngljtd5cb3yqwjohkmc9oy8kpnwuh14o00wzvc90eoiwcfbxeficvnsrg0je0fybq3s8i89ef2wkapnm390epvhi9h4gcp56i3ilpolgslez2jfuzyiv7aa75uah4x1r6w5b8q8so38mel9otppd14bagch3c8mocipt2rbf2iakur4s5ap3ajb64pzrxla0wkcafj03mc9rh6wwtkajr2ml8pvzoxrmyupxu37l52uy5zgs2p9xaeut6m1mpo4jr0ihnc9qi04ckjmrf4s8xa03gqc24q5gvktqaq8yotrq9c',
                fileSchema: '7fzx4dtk2djfyee4hweuwyvyhwlvrc83g5c2khgr4xnrq36s80ofp87img7dag92ie8dkr1c93909dgxraq8pm7tk8vgqgblrsjwqmpzsrp4f9djedazp89g5kbwi0tm4483ptjsgd1ne1xbv1jni6xpp2blmrnt8qbh1gsxeuru8n04jyveucyb9wgkflkgtacc40n4xnpez5jh5xtyy0zx3m6pgbbss8fn5pkzanrfv1r5fmk4okwq2mk0u6ooq5w3mr91tg363r422zxwbjzyv4h2fe1ru9sx0vwaibepbu9l8mmmftopl18szl9pp1kt3btwgs21r19gna9gmpl63w9w5kpvgfk7yx1bekivv1om1xbpphhn0liiowcm4936vnqjxkwf30orywx59p356xmiv1lkxzq6g8wxlq1xz0zu30zd1obtgeqb23vn9tvipw1hx44sq1mm5c5q8xgaf4bm2qr37dqlz50zs4b5e0rv2xzrxy3ebckjlmscvvukyeh36uoclqelu1bo3qd37r1a2g1eop6ybhae09gouogne4x20jklmsau577uy4fyt5193atx9n108diyjiv79j0iqzcvh0gc2qn5hx19lgl51ck6wbspsryqx35nfsj59ke171h1e5obmd1vpjm77ck0mz8ndyta6y4oue8temempag6btplboerncg39uo91xf8sf6hsj8spr2eigddofgp01v9ws56hn1z9p08ecm0bdeics3aljazrci7kxnrhtdsapbrf7bt3809z2bx3km3rhbpdr2t0d6sv6doav1vb6lwsxg8i9nta26rk9c2uu0zc4yrail6n2v81u6kgd3ik0x5qsx2lvqd1rqlh18kyfwdwn9gryy8aqndwbqoib4ayvmwphpm8du2dadoj0iedfzs66dfonylykrijaksof1tdfhpmnta5e46wf10ldrlwml0pkep11y8esbl81rrjo2b63bsl0di1uwwvkn34ib7zrkvyw6g20a4',
                proxyHost: 'yls04ornf5xe7x4ipb7yu66pkufxmkml8yrpcdc7s85aksp54dkfq5m6wwm5',
                proxyPort: 5927120973,
                destination: 'v8swxemu5gy3li496fgfy5rbecnytb272ovrqqww5c8q85ym5kxauy8uydlt2bq887i16mgmp26sgyes0i3hsoai7ba2hgai37dlalkdc7tmm4slauzuzje5cuev1sc3386v57n6l1swwfra08awxvkedwchjwku',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'slrj02489gken026mdlijolon6wjnxvet1q9u6qi3vk2nkmv6cq294fdhzv1pjft89u71qwkkh69ocalbov9lwpacial8dqit9bd5qc4lxc5zl9zfi8awgoxtmh2v8q43iyyft0x6z4md8znkssflsxck6v2r4zx',
                responsibleUserAccountName: 'qwgp0pgqkxmoo1q9wp6p',
                lastChangeUserAccount: 'x1dry7xfycpi7v49zn2k',
                lastChangedAt: '2020-07-29 07:33:35',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6422895f-91c2-4399-911d-939f1de6d2ef'));
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
            .delete('/bplus-it-sappi/channel/6422895f-91c2-4399-911d-939f1de6d2ef')
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
                        id: '3653f509-361a-47fc-8078-54ccb33db943',
                        hash: 't5ke1hzv759cpvi9p81xvwdd7tnig8l1k1qt3pfg',
                        tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                        tenantCode: '5boxpnebs0zk4xh8uham6trecyiqb8at92xbjwf5m2ybu693ro',
                        systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                        systemName: 'b6cbj1umsex4rztm967u',
                        party: 'w2jphksoxgqhw3hplfp57zxqgkkw6hmlmv694wp2l4hu8mbnzageqtfo4ch1na8uhx726zvwjz90zocp5zema8teqhu1xorpyl4zw00rcm05sr0e3hzaqrctx89ebxisomafwb2gyat1kfje0lyxpfr6msd0gran',
                        component: 'um72q1lnhb8ztqklcq3suyxfmeci0if32dz5fqqpurjo515nmj9r4xadcjxogokonkfvv6qw7j9lyugl3a44rznut3gkfdsrkc2ur0pyosmqcxych7uhc7ajxmu704dubmrth6pw1a115k7bfegzcj61jqf5pd2m',
                        name: '8165qn89xuirs1pfhfted8mai1gz9mnli6s0o11qks0a82cbk82epzrm2l4p7nc2bj35g02cukq3u8mhqdq0xijk6s210itxvgf372t0ybp97ozo43bf2lg8txc3ptq3pwnpo2d6kro2c8q3ty78iq0srjrfbsxp',
                        flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                        flowParty: 's8l3eqdw0zso1qgytvnqmx5tsrd7r70ab3ny0kvn1jdkwide1d0cx8r3fd1fmtcx2lroserzzrvy281eo33eyv913cv8n8fgckwmpi7rn8ixzrbhu4e99bwg5ls3bciy3ugbccxtcrini7l8z1c2jx55amzxh4rf',
                        flowComponent: 'frjk5wo4ggyeo4s7ksa5ibhfaii6yfav6omlcnvpr2x0yq75b29k3oo3mgplk26qmikteinqxy5zplg4j96izf658k5plggbial8iqfhvo2msgdghy87q7zmv8t3lqcur135245rp2hlfjgsd0tzkbdb79o5wdoa',
                        flowInterfaceName: 'dn5ut70ve1w2i3x8rjngrt7deuj7b1kkoacq8012zx5jf1cbwyyfagzws3xptm4vyotz6hu4l98jzx6n485ar3k6jxbxqs7hr830ppsy1pvoz3y8ywlldw82ul0sh7okby8wi690w1gvyt6g03mr4bhvezgtcvym',
                        flowInterfaceNamespace: 'r418pma7atkjldaoxgtf6zcfy7q396o2bcxxznx9061ko836hypy6tmpk64czd8th162i8rqi70majgw60sqw35nqlmwv8gnk8s0dl1jmivqqc7lm22hedivkc1gf9o98zs0424xp2rc5gnyh0p0ky37bns63c6u',
                        version: 'klwq4z8jl78b9g0uyudo',
                        adapterType: 'ozgf6wshkjtsx3voxl9iqfdbhizmd91wprgezin9eylnn64xnqcg2fwe4ahk',
                        direction: 'RECEIVER',
                        transportProtocol: 'nzg0xassbfgkx89w4rnyt5uf937uz5haqrllbjqpv2sn4hopephz2auc8j9u',
                        messageProtocol: '7iym7fi58hbzx3fvvjlnrswblbkuz331hz3mcboatt84o9tkhcdpdzud6839',
                        adapterEngineName: 'risc51m722g3b0do3ej5sk8i3ct8xivmbaqnyw3qopezx4nz2wzvug2w6j5kfkjcqk3p14fli9ruylbjwz9nk2idl0xkoefv98kwfi84y8c8gyzo0ni6yc73t3ktg208jww6a5z5r9amhm7y92biq0kgkcpf2874',
                        url: 'jrapr4g14en464f5s4zdf8lws45xd7wwr9m3whrqkvcnutbrlcwyzakllznz4wxsilztvut17evaou3bts5vk3yr15g8saf24x0c06y1q8qivyi8oge9z4nxoovcncs02vj9ljtg68ale4hnwrdxpr8650gy9t1xvlwblfez9dzfe3jsjlhbxfmj0fqp7ldqnunay6nibwnbur1lvr3w6gt1gi2kfifg2yfdhytajdz2g8v0hgtecrbwrly5ya6rrj1peksi3ap7dm3tbtuu1ogqdyfwpivc82okrutws25v572v45imqnvudrhwj730',
                        username: 'ch6ycle99y9z4pe3yqc4v64p35e0olnx7a00tlser6nelv76kcuyjen6e7c7',
                        remoteHost: 'dm8lzspwpk4fe8krs30ftflkgw11p888cc1vhac3bzp3xq2cxal635cmmtru28p5o951wn2c95fe7ty8lqpqldrijn3l9b7co5mlc4t2u8yh7aq5gxot0dz15wlaahj2177zuga2ekawawajm3ppv7hwtllgn7ne',
                        remotePort: 7764396973,
                        directory: 'y300mijq9mtjv61qowsd9zfzjfis2hrlhvnkyvyvtycu8dtqujqv57jhjj6j76ha33yj6rdk5hgy1bjqe9ikfyffj4vmukxv8pb59dvcdm2l8el5jtinr6ihj634ndmurbcx8d6pns1wonw1lafoji82dwwop7938710shyiwec6hgdi9q6l6cefnoxj6l0lzw1annlj2q4h8q4rg9jrc5023zhrs1u4ke45ey4r8td7i283gh89mqscbjjhfaf85wvua8ifz47utel5t4wqrw65eskx3glwhgzhhdo1p7d535ncae5cyaz95pxvie8wj53qt0v6aupbckgmeoj9a62tm3jrhefa9mcd6lmh7pp5mc1ejanv20588tyh8u6upl5n60s7zg9b34cafxu4yzxl16o4cwyse3r3u3wzl8t277owikkrkdjl8yoymtq4vsy112gv0af9hycq65122y08hlvfqpfbpuh5hf8864axxvy8j1zv6q9vxkqn9fyzg5o1z397rtwkme56357tphjlgwabnketa0rugwv39nkg9111ra0xp3dmme43qhjf63jdc43ov3o8oivkv7gdum5jxhv1e0jhc7mug1qls2dvx3k8r5bx1fvnbn2y6979ssnpoln8ps442cozjyq174k7j5xqb79cg470fjm9syo3uhimfw2lm41lve3hnq3ni225sp279oj649tmvovl0avq4sdsgkg1h0wk2o1psx1dm80fign3lk4a9bo39dg4b92mdu7pv1oqjyb42yui01cxudwlyd9739cyb5tn00gwve15zgqo08zfzrzqih71u2wglb2ajfcu3fkctzcw8eaycis6bn2kpud4fsx8ne2jfi34bbacd4qt9mp1m5lq438q3lgyxqdp7glyoolcs6kazidw9rv64539usyd9pz7l8wtqs6hk8eejjzun63qmle99siggabcsapz1jepjbo00wjeqo0c3zric13y6quds4txidry1j1g6qg1k0j0',
                        fileSchema: 'w3sovtnka9rb4h7mpnyh87at3kmtv5k8hm4mddyy6ikwije0ju7g3y9717s34vziz4zggmxrlmfehvos49txh6n23m5s5d6gu2bpkofpuzr3ednawhb8s8jw443nu60gyjodjzu4iy8e4t0jchiql1asky3vuvu00cuqsxpmpajnncxu5ze2bl9d4b612glntaxb59jg7of1mfvairxjq6yt5t8svngdssg9g3p43p7jd1t6l91rwpv8tolm60uyzi0sutdqqvi5a8vb0edb8jzetocd9c7fwp61xp8mwsyupjlf951qd365gdggm3x2ostbftr0bjmrzsbhvzb0mmun36usmvmuk99x38lrfrf4wx37gf5u7kisbdspk34e9hh62uwbw5k618x7bx44p9hscrl5obugtuj5u5wtzwqfy5cvotdagjkmm24t03dps1wid2aeux0bp24mxs8im95t0euneqhvfbh9waaua0bgmey4ztiynoi6lqweje0djkrqqd7q0n1tmsso1mg6tp1u6qkkjhehixqqg3yi1157fzmr5dh9lm3zzq2nrhv8haiv1e74aps8whzbvfa8ck0n659z1r9hy1r1s2scuuiayx4fw8rm7jd8g1bvoy4wstmqhvz6f4xis0ok7w49c4iv2fiy44jzcx0nfnfbeq7qx5xpoj1rhqpc2usy338zfvezr18m7117dqo2ccthpgmkievssmgozz0lepp6yu9seaheq78cfco3nb5yiu4ekimvc8hweecsb322krsil8294v9r0k8lcni45b0au2loy5w0jw2h5ensxghpna6rm6s1taa2g3433071cxnkunom130sidj1s10kqukw6x4416r0pfnxgnvjlhi9d38ypu4l9ccvqq2l4op7ngf2vjs4lho8z4l8jidhjz4e4gljk1b1larjh113hwe961cvkf5x1cy2g54tnqnioqnro5unk628b64vmk1ew2u57gfnxo73xy648ey2z2o33a9n',
                        proxyHost: 'lz7azki41tgflzdioqja4zgsq2hm6lqgdqd4xlyzuymj29bpx4s23riqa5w3',
                        proxyPort: 4443684935,
                        destination: 'b041gk0l727sjz4djcrd7i19itjbkh1dcdvcs5vg7bsy9ndezsr4efw89b7m5ru83eie7zpyea9f6m4hcu0spquv6cf0qqu2ei947uxuykjh074cqlfchiprm3ilgzs0mwtgb8m3kcubnrvp6i80kt2gms56y6mc',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'k7u6mogzqfhpk9nr21qwlf29hwguxsav1e6e4su8fuz5fyng22wdiouuhitxcfhph6h778hqwyzfij2gufcgku6tlfubsihl95mptvix1ph1plv3blxzxjto7ehkqdvood06213gdow9ztxo3f94pdorcedjah2d',
                        responsibleUserAccountName: 'mjx9d65m0imqbcdm4u8a',
                        lastChangeUserAccount: 'ib8lurgchgem6vovz37e',
                        lastChangedAt: '2020-07-29 15:30:07',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', '3653f509-361a-47fc-8078-54ccb33db943');
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
                            value   : '6422895f-91c2-4399-911d-939f1de6d2ef'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('6422895f-91c2-4399-911d-939f1de6d2ef');
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
                    id: '6422895f-91c2-4399-911d-939f1de6d2ef'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('6422895f-91c2-4399-911d-939f1de6d2ef');
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
                        
                        id: 'cfd51c1e-e230-4762-833f-fa9b698f366c',
                        hash: 'jr8py3ab4ixv9nm2z74phjzdqxdx8d9hdku28qsl',
                        tenantId: '99f7dabc-2fef-48f5-a861-a26794b10ca3',
                        tenantCode: '3qhw1qqqjg7qn8d1dpxmw9bclklrhiuoe9py2mnii67g5k437c',
                        systemId: 'bc114e07-f6b2-4909-b48a-fe4709b51d33',
                        systemName: '22y9bw7uocwey7tyi1n0',
                        party: 'ld7q5dbv0xftg2evnyml6g56trtdinkcboon36n0a2ek7wu2kp9pnk6ep2g2paoso658myj885hp09jtz6ce8fuinx11jmpcjomamdvgia8a6ht00mmoqtzs7hzxi12vhz6hg39k3wbt4zl69l7f4qza1lr9g9st',
                        component: 'klzacusc6wdqpu9pjrxq9alr3eyrzmbxwutf06h5psjo63w8wygnctdnumz6mh2n4alnvuyiasg0b2yp239yf993arf3wa47cnlnxgc3lxsbj5uiazn8k1ihp5q3jlz55dgar4jn56lmqkwn2cugm7jkguotkh1r',
                        name: 'u53by2ichxkzs4amnp3cyzbnluejt5tvqvtxx2ts15dr94jto3oth56bnie6k3b7hz2y83iq08sb3zury6kk04h2fy88ng2bgnwowl5joowhsz77r8pcb9hwopx4sqqh6vg98z1w2s7ldof8jzar53r7xugg13zw',
                        flowId: '19e9d4f9-0b41-4dfe-b5a1-d36df1b836b6',
                        flowParty: 'lfheu9m60mcznxqtdkhn5rkmsuzrehsv9we1f5fas87etn4g1w16tnpu1wn3mj83cg6a8z50pjdjcevdf8x2i7at5am5kvwx2ozs1n7szcwsnjkzj8i6hu2wmkndcrodaxlelav8no9foa0jm90ixbf9kq4yl07v',
                        flowComponent: 'r6w3wrwt55rfoh78whi1ie4acieqjws7cc6txcv0dnf88rsr5z1dzy5cslih9ne872coud5zsd43x4u3aogpn3yc6eqg880htp7clwhc9l8oawyv2s10r2a8un06vblp6wxqlyqh3a28zso1a3j20uw7tt3l30ab',
                        flowInterfaceName: 'cqfdtscv8x705hp3aa06lszwdj13wehfslp592rrws6ylhtyqto1fjgc9tjny1xxiectnhc26ufbp335finkkgbao3uoc408o8kq4s8isdfh8o0gion15m5jon6nqgnchoolu8rvq88xobndey68s9eq1hwrpi8m',
                        flowInterfaceNamespace: 'baxv469ogqdw3mr8mh8vq9xnihfvb01qiwi2pjgpup4et4fkhd2pmdz57set3io4l5pkhgge9432bsuekik8ocw7nl1jqft6qk1c61d7dcb3s3d4mcrugbqxsg8bmqzm8wrmy5yu0ipy2ikhffmru2zc7707xsxb',
                        version: 'd1m0knxvz89vj69nqzsz',
                        adapterType: 'vckw1kbro0m8wkum4ydyl6nh3eehzck088axo916hc77t1fy9wcidimp9dbz',
                        direction: 'SENDER',
                        transportProtocol: 'dgqs37sw10dlk5bth4r95br0tg42ne12iu7j3yfnhblxfjpatkwf69iz11fh',
                        messageProtocol: 'f7gg52vs4flc9xjs921iv5kh2utrugcjqvines4x4cp9tf340yhodym7vvjy',
                        adapterEngineName: 'tr2y7sjv2fu1y6fueobjrfawhl1obqtcbm5av78e0anf3c7e6lqnqy0ks8ot6clmpy380l68cmt17vhmnpmxl9nkoeg0t08i9qnoehmvps877z11z16y0kcqilcmbqflw3f155wyftpn1lnnixtexu1imvnqxb7t',
                        url: 's4uvo23xsxoiargof0pdwjcgewf4u4leaupf183wxftqgs25fyo5rzlqr0wxq8g24wyof2xucwgr65diccmp3iku8si68olxi5b4wpesydiodw8cwh3a7fwr1rn6nc9e58f7uni7n2ju0gshkihxf9dz1b49i8n2lzpp1b200nqt7ap1599n6d6qyqqxw27auyxv9cm9go4hk6wksm27mcirw1yhy6b58pz4ps5k1n3t0y80dqrro5fp2zvp2l98smedtbv1o55dwr8gvu5h6hjwlec99jqam3nmdcys31unxot1jwqscby35z8bcqk1',
                        username: 'e707srfcca3nrapsxlomhc3kfqwf95h9jnnjy4xvgc5d5lcol58qwpja4xua',
                        remoteHost: 'fdkd2qd7uimr30zxj22ie4yxr73r7s2yx5vd1ygcsql60vvs7o2whj19s7lsbhlrhvn8f2j5o9xtqbn5zanylyu3qtjfu19tnj2a7as9785l6pppivrlhqpym1cklomq7d41odvgwo9rli8c9xpoar87x75qt7je',
                        remotePort: 4924006447,
                        directory: 'sk9bek5kbpl2i6iu5jhtupxb9jl5tu3i8jjw982mf0t0horxns5cdrlud7t5t9rzl1d10t9zqpmmed4lp3hs9k92pdgpo91oqjh519e068n9yrdxuutjzsg007ljfv7ihlz13oiyjtfxwbvm8oyn34vjv36ef7a4qbcxb72y0ipxxumgy3bs6x1mwuh8p8krpar0jz0nnlsontpgzkjtp3ehnxhhpqj00gt1u8svjc6rrwos1v3udvwegv8vivkd77ghqrb3rdn74gtwsi2psayay5wyv8srtcaxqlbqst4fflmh20u2g767xv285stdj5wdtxbzlupuofiazrvs8nrf4ik7wv7p3hwuwno5zwqgdx9ns9bouuj8hywumqfbjkts5zpx7au19jsuojj4g4st3hq3zvhp8g5m7u66xsts4ohswonm4q8jl9pxjz55akgz80b59e31uqlr91adp013pfzigtn2iiyiiexyxe8jq9b9k1pvzff1f2zrtsve2bo1s6skb5fvqh7txxhz4brv1h8xjrqq7yfbgymarc2nx94r18qvd83vejuv2zogqfkqsu969etccrka567q9p9ph1t41des3nognvihmnktxe4l5bdywxg1ftbzwbji9cop65qohoud8ru47r7v1mh5uzjn9v4mjpyz5hyr7z10jtizihva4lxnvf7tvjtzgvqnw3qunzncegoohadg001sbigpxhgvs86t6lg2myifiyg70h1nf0jf9xjoicst0w1ptbfkoimas8orw6xz0arufxs1cpbgojpq1fej159gpa2wbz3jmek8mpx8u2ajfxfff6mqef8bp15hhcukn1pzpzhuypzxqppxo9uxq2a1uvzsehrbinvd0vxf2vpivj0bpt7f1i7mz4m3jt2fjbfy3fug71qewaqlhew49zv1294kw6bje1ollhsa0xvwwn9bnch2bzdfebuprtvfx8effhjc5npwbh2981mk55ixqk1s4end2kuqduqm25gp',
                        fileSchema: 'imnfjm7vxgx0hwyqsx99lwqoxm61ntm3hjet62you8lrtat72nct8s6e9s4alu73d10uytn4wy151b0zjs6jlg3jkwnsomot4ppfvhnrg75e1mxhm5xhcurr1tl2jojo65dbtben2v1lnpxg6jx5j636ur5tthq33ewox7wbggudf5dc5936hfo9gkntj1t51jyg29bbikgb6egffiuq5hshh4ghtdqpq832p29finh4bydvu97izsgsav7qrz7w1t863pgoa0j7yn4qhc6mtwap42gu40dr3frg83d7njhjw6wc95jvjnast6lm6bo93pfc5aue33vrlisi55ss0x04930uebz358mvzknpym1hk99qv8h2wdzlnpg3jnduwb1l44bgvqz4ipssie2gy61bgbf4hgykc0wvg1xog7sod93iq19tbhxz9xfzoinicvdjy4pi7enwb6jqzyn8zziemc8ilsz1k83h5xnxkrdc7rwsdnaotjegdagp4yp2hnagzot8mniyv6sletbow3k74uovw384r1lmksr1zbcy6meatd4y7j9drub73ev8sxqglcfgdg34mws1mi1ezca85woahgk1ka8kd3inug503jmodxnef3646ga4mmlbingw4p3fzyc8y8c8rrwzp0mgmuya9z9yfleqi3c3jvwaacrago46dc7u8bgzoxe6fi9vl3d6az42y7u9t6kbtz6pmzncg6g8lkl4qtxr9y9jmuq1ed882wd258ewmrfdkt3w30c92q4ubjr45pehcg05iwdcnjqowoilbihx4vrdrm8xocyzx4vtg0yr08zi1xjsevf0tpgkr13d3f2r94q5mlpwchtl99cvp1fn9l3vam0cy39sy7oo46o1w7djat74u2wqisx6zh4dt9e5in4uvykws4bqaqgvkddm16uliba69q14jr0yxxnx2sgxk1h8bsipc7k4z85gg5b95pc6xzjq7s633u3c9uw4i4f8d4o84dwdtzaio2t3w1fh',
                        proxyHost: 'zhdyzuuq8fiy3jlt6ud6spyut3k9w3da3uykk5uu5blwggitj73kc45m1wr5',
                        proxyPort: 3224511654,
                        destination: 'aa29irgwmmurs5ukss8bwfexj22nxww9g85ed15iukn7u70ta1jlrxqv65xco0kbwc879q7a40bnok932c7x7g78gvcqcnv68g5rcioio90qfzt4oaj8qfvduateruar0vm40bd5nn9n5n12gh1gq9w7n6856ol9',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'y5n37xcpu9iolzlah61aqtfn1a59atgzdedi5w333ca2nz3jdj07kkzdoywav37l5gbls4cx2b47rgmby0p1jh4emqero82pszi60pdqrt1e83f29sgcwfihq8w0kbddxntftx1cy5bp3sf8ift55jyzc3uy6dh0',
                        responsibleUserAccountName: 'hjv18nxhazqs1dazsgg4',
                        lastChangeUserAccount: 'ep45i59exeydos73jhkl',
                        lastChangedAt: '2020-07-29 01:26:22',
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
                        
                        id: '6422895f-91c2-4399-911d-939f1de6d2ef',
                        hash: 'e1a65xg99dd08rt2jqheevyp621k216y4nb2zq20',
                        tenantId: 'f0af7963-f115-449b-b2ac-563c70e15043',
                        tenantCode: 'kwb0lybka1rqou564w6yjyrb4rsjcat2wpf90weaoxqdb1jqdu',
                        systemId: 'f87481ef-348e-4618-81c7-6695caa9a574',
                        systemName: 'pyl4iqfv2kekm41eda6s',
                        party: '8s3rz73jpmjrop6lyjemwg884lczp07vt4e8rrgrcpww151dt9mr7z0vs8b8wu2otda7l1451h7n52k5k6pb49961043t2a5ryrfzo2qx80uksm5nzi98cgzk4auq3xe99gvu4mvoe3kus1fapzqucwa2vossapq',
                        component: 'hm90a5q06s8ija2thuy6jdrk5g10y1cz94rinalp0qw972550ncx21g0s1tf71038861ve5bzvtyh4p6nd58uj2rnp4dxa26vuz4c6x7jxk42e3mkas31a7gzgjwzmrm2q9actrxse3nv1vi3zg1114c5kjc7x88',
                        name: '30prr7sqj6p1rv81pcl1ntpzcbzrrmf26vb75j0wnaeakaq35qnj5107c0dakututcl2oe23hh6g8gjc2pjstqvhu3j3ed36llonxg57f49hec1afiznmmhhajfctscvhqvw60xtobbnfsqzeqx95c6r40ub66nq',
                        flowId: 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98',
                        flowParty: 'po0gs5gpqyg1ytpf4dnv45gnc41vbrdj3jf0vpqln83umjqp7phv8lsrxsm6wg3o6sjomrdf5wfzcukuvzkbtc18ey6d3s5o8hwqxxty8184yjk983uw8pglcb51bxxfqyoa0bhyhbnq0brkgggg8gk2sae5pwk8',
                        flowComponent: 'ybeqcll3y5ntlayk4xajf96jm15qz4z7nt4cpmqer8q4j6n2f8pwfhz3kvifbd385crknytf2y3w8esi7lce1andrf9te6ylptkbfpzfauakq99aoivzuimyfk30t54f25p08gwcktucg5op6kgcmruc5acmxo7r',
                        flowInterfaceName: 'ya7avs2ib7yucothcormnbmv9jwiarryus2o6wtbupps4xvssenh1ocg9fd0i0wb4hbqd88193zt31ixwxp2ntcthczxkewne4yxgki5qawttklsaxdonacs4qmlrzw7spsgq1464xyyr10z0uieosqqq6ebpxdl',
                        flowInterfaceNamespace: 'vzuy7zd37vhc30jqjkr0ut51sgn1fdyo84gmw24112rgu7mgrdj1yan5m3zzghn9k9vcwrsq9fmihsyt9770o5eif90plm7fj6p1u8pack5f8mnneb274gh9ehfjymcwcd1hojtpr9kz374tz29c0wq99w17j8du',
                        version: 'rf719t4amug45wace7cp',
                        adapterType: '5a82d965ea9va71z8g00l28w8m4d8sfsny8e3y24g0bmswr85jba9a7uyxs7',
                        direction: 'SENDER',
                        transportProtocol: '20crdx2idlxk5c2sj5fqdlj600o4ur7qfv0rgl7n9doys3nbm3vc4dmenjg7',
                        messageProtocol: 'am6lm03xnlbwlxanmebbr6plq8cqzytlhv13nvsyx772brpno1e1sfalf2b2',
                        adapterEngineName: 'oea2fg25qdvlysevxkyxm1xr7g6dt91ze64w1b49sp5ao0lngdneei9fhzbm343uuk18nazq1fyp4xctyslwmpaf26niapnvabkjq83fzb51aijy300x0hn5vfp9hiqhc7cvu5mme7vngerzvlvq0am0u9n84k3n',
                        url: 'ls5i3igkpq14ymf7s9ja699d718my7x7hym19pu7kfjjqzylo6wbpn9dggqxgixbahhnwz1furrl2eucyiamh2v5mwlx5e6ltxwkq2kiilnj70r68em29cnuebsny9c3zg82lfkm46rdx0y3lxojhshlreatxxfdxey62r0l3luq8lc6wvl0snthley9jxs29u093r2mhmm52irgwibqmn52ae3z1258mr53c3zweu973rkr7ybyrjq1cp8sgiucmmspyfln1wj371iz3mxuycodye0gigyfgdnphgcl2gu1g1a42h6u3occjky6hve7',
                        username: 'j726fv1de0cawca61cdbz15d6gx0i1if5yeyunt10drizg2sl5lpzfn2w48s',
                        remoteHost: 'i14thih90hg3mubrezfauku7g0wsx8m56svsf9tte5umvp3hk3rx0nl2ogiln2er07yihimex0aczu87hdclii7bfu5isdle32gt4cpy8xcyr9o091lcyn8oxqv745jr36ebblgzfokselcifwrq3equgfdzbqp7',
                        remotePort: 7916344000,
                        directory: 'c4nrtcs8k6auo4ai1e5elcae25ka5sc3q650x9hj64yqhyby4n8pyihfnhmdxsxkp5j5oy2uaptl12e75iqozk2k5rnf69jcv5rqi4khfn90h99ritnjhhpm1ol5wmc9p1x3aettn0sd2q7kvh0325muh8qxf7nuf5rhd9eoe4dnaxox4ic1kp1isk4cb9as1al69ojkzozd0v3o4hljjd2734kbjeotm4tbsyr3yovbpw4qs6srob1lzwxrg7mnqv06iqjirk517rc6213k03kn82hevt5smdsiosu91bbetay7gk86jbq76yb9zj6fa3t5zqo5kf870iluidkazrswo01khdzmlfclgud6jna32m2w9mvz9iyz3bdcc0x7jmeqhb9ylwsu4o4v7vw9399svmhvsafpeu03uunui5nvg87zu88wb5mnshman05p1a0vlg1gzhw7kwsd3bejy0wibhwco7xs1fjhm7gbpa2fjxyjrryweyjjus1qx86qnz14ve47j3ho02ogzo8dpwhpqjlcn4jw0s66vkeefcunzr4e5chtnsk36wv6b4nd4vcdoceipmom69uor41r80w883cd0b7caoxmw4pz85pp3bvbh168xg4c4jmx3evwa3q6jz8417ekg4z42y098pzbreujbnoay505w08uqqkfjfky2kkcpo61021nqpup0pucpcye0yb4qvmcxn11zk1vi931wp22ba5tocqf7tifo0zm2mq6ouhwqdd9ehv69r76s5b1n62vgb9pnd13op8rei7yci0dohifshz1ame1dukwfvi10d4dxc8m474vodk81to1jxqgp8pcvxg9ybwzdn2209qe0bf9a5n9auw1d3oejol4tsy5m1wzbuh0vohiztkhvp6xmmslz8kilvftmumykm52qjs2jmgxv8pm1p75680zzg0upnax7qrjw7s9ylidv5m7sjuyuhonl35gbv0vl0e83o9vflgcn3ejtx7h7v3qye6yrheqd1pa',
                        fileSchema: 'zapcb5naui7i1huv0vr1b6fb84fznj7d8ztmv8wgnoxtv2ot9aussr02tr9a4axn1b2tay5d359z2xr3pdzr7mbur930fpvvzh5mpytkorjiq2ocz2dsdf4g0ivhsn0w1wp3vcy8mrwd452n4q7f1nudh5dujjmjc1x0un3b3nnakay143b39lqvbznkhbplhjh5uq5xnyubn0cokit979fchq64jtzoiw5sxujteiuiywu844p17v35jkvvaajwvgo5nnsgg67e26c72s0e586akjxnlqvi280zhsss6gkzlpht17wi8ox4ivok9rr5moa4mjz4d0947ys4hyzfgl41or3qi96aai0r2877s3gv794r1jrgujulmmgjl7bgtuo8ughzkdi8uneaor0afzp21yv5zpu70y66bphn9odi0ezxvjodm54gbhurmj3os46n1gdzmxqqxdo59b1xv4q9bo338sp140qau5nsmkup651f6eusf0wuip7nj92644bw3fkg3q201dan61etsihobdc12u9i6v0kbw1yu7s6jrfuuvjuxxp6ob65ciu1s379p1ae3o72rx89xydzwvms8xnaj8pawjruj9914f9jrso53ylzu88pceab4g2n6uazfbwksyve1025oi0w2gdwkfynxgyvwgbj09ei4r7mp2y4yk3tfkhu3gg2ik5ngojjhj09dwbhizgyhdhhf3adjap7t5ho67r1i54a0m6y6onwafoj6zkzggwonyx72gdt8dvcvc331jgtl9lhwblzshmg6sysc9aw06vrg42b4lm1hxung9lsjd4o2v6gccnfagtzlqa7frt1gswarwbtu50hrbj76ogziasbwplv1dnxtfrfap9aebix5ewj9czbc4fdpopt721jx5k95fl21oxgrqxtf7i60bohld01f0x19rv2gogu0tmwui86fneon82m1ybi4wm6rv9imb6gznx0kyuo9fn9v60chkh6t2fwwfkon1nmqs47xl4z',
                        proxyHost: '7pvwusfy0d7jpa7h3kifveg25dbobx7bd8mix6bf7y1tcvvpielhubgeseyk',
                        proxyPort: 1730215950,
                        destination: 'eog3jxzvisjnrwnowij229nvz2vnfwz4m2xnj1htec5mg0xxig7m2jvabvl1on9khrzneuz8ql2fwfsbyh4p0lucg37u5adl5fh2nusqu4z06svl5e78pvsdsogr7hb2zyf0mdjekox551e9fbdyrr6a0kvwxn1w',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'vd1xi6gsqpl1lsmsg5fg90hdg3zpdcam5zlr010reztw2btzl7fjjkvnqioqfccqh9po4ojhg2twpukiraq2rw3qb9hs5lo674dhxhqwd8dthf13va0tk1pjcekse20dq8xvb1ia8pzxjcw4ez5b8nepo6fiio0m',
                        responsibleUserAccountName: 'rn9t2rldvy2616ybnycr',
                        lastChangeUserAccount: '6p7mfjfpz9n52ocpv9eh',
                        lastChangedAt: '2020-07-29 12:59:41',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('6422895f-91c2-4399-911d-939f1de6d2ef');
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
                    id: '6422895f-91c2-4399-911d-939f1de6d2ef'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('6422895f-91c2-4399-911d-939f1de6d2ef');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});