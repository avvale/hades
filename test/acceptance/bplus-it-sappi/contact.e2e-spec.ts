import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('contact', () => 
{
    let app: INestApplication;
    let repository: MockContactRepository;
    
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
            .overrideProvider(IContactRepository)
            .useClass(MockContactRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockContactRepository>module.get<IContactRepository>(IContactRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'qeq02usp76ec8gwq0qqw13gb634wui6wm6ydgl9jn48fgtlhwv',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'wn2qs14fmdrru5vzbd2h',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'jqqac6brtuklcxl9e9211ibg5la1ui4272v4gn9edf7e94057l9cafkw5ln6cp37kju1yscik472sqybiu3d4v0mt9mslqtvcrjv6s5n3vpeyralk6bt73nypnt5qzqchr35bjp058msrj7d2prpwe7ti8uy6h3785rnbnqpbqtyyf5738nwukxnup23eyy14hp3ovjb0dmcluykofac4glsv80kxtotbsj4uhosmbqcdkov6t23ndu14qrjpsc',
                name: '3tdq8l4e87ye48ih3hbmd19eonfef0zna6zjr8wwuunar5rdw3gqu96sig2faltk56ze8gbhsjiyoalqszmvuj9q9bk1jgp5bgf9s8gov06g5edb2zvnvjypfoemqysrx93kom3zornhpxifdr0ln8g542cb9xb8bq05itwhmpi81nqhdjh7v7r42x3zaldww4t5uqu2y64deyn7iyhr7381d1p4by9dmw6aeyowa35k3hf5nxhgxxxrgc26qvb',
                surname: '9hd04687icx2e0jr3n3emtl4pdd4jlmd9hm56mv9nanmpkj2gdb0w75x9rrjde2jyrq0lhtmg57qbx1ig2cb22cj3uicrnctg9bctha2ijepjja8fewrjl2s11yzvfapj79um4b8v2s58jcbl75x49r9jit2yv3u5ifiohjrfg4ifkihg847sgsi6gai98k43io59gjj9r4c1366f7xi8m4jehx9oataqm4066cdtljlllx8k5nhqfy7ay6zom4',
                email: 'ymx2enuvwa99qsv4y798eazywcihp2xb6u5n6gueiynfcojy1n0e00w9m220av5oqwh6if3693nktablj8e9huupc3udw6b4o59dsutvjlfk6uhvj9qigbhl',
                mobile: 'p5qwycolj9ropuvsp9xrcbcqrebchl325l2reworctsuti6yf4mwi5oooz3v',
                area: '1dyv74o1aagfrbpugfd62b1w5nr1zo0lf437v2uhrj8kpuoplta8kdmllxpt33ckke40w7v611mx7xpp9prfc1ng6c89a6rrt0xhb38x4nektj2tar4bg49z712w2npjssyjyxnclvg2956wk8mhch1l39jgfmdddi8g3aeybqahx87jla0wt7fim27tufzokcbi8xgq20afl7fzl74faxcxazavpq33ea4ekolx3acfdcy7kwubene9z1hitjn',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'up85ebelgpnew5kvornpzptnf9kzb8f5bt65m44sivc12p6ndq',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'v5j2o8e06qvonaghfgzf',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'msnc6y8qal1ksuu2p3gtj9wpaylpc0n3oygenww1hzs6i67prrcdns3oetfraurekdxe5impj31iqsnexb9aw6q39fekyinm4hdg2h2bvpsf04rm4d9lqqgdc9c4q6f30krsry6dfmwg941219l3b94a28ft93izgbdq0bz7wbf3dfo69dziacst1ppgtfl68sgfnbgddx0krq40jj5pi5iv3d5vplk7zkrld2cjoidxbecahm4qhxp8o7c6vep',
                name: 'gmxagort4dcintxqc5ijowr0p8lugwh1e1xbxymir0yvmahrowtvnnapasxcf7zmegdpx9rj0c5pfic2q1fdf1czkdf19d4wqehkbqv0ob69pccekbj0nkn3pbhvq2so5gj0ods7g0jgkdcp6jetjovqbxs6tztg4f5azffk2w5sxq7a2lqb83i0a9blha8jm2gtradfrufozrtttd60r7arpwjccwgrkw47bzpbfxejrr3kwxdcowa8gevfrui',
                surname: 'or40a22uimc5hc0vkev3007vtbl3ac2mktv1e4oaach3ns0kqtr6hapvt2gwioxdrr5m8tm1cbkwvq7r0fm0ztbtqq41c0vrdvup52v01ep82j61wbmji2bercqjrz25uz0mrunsve13ie4qf7m40w7bj6trbi33ipetvyl110mdj9adsmwvk988mssahtzuwdunij4y3jmnhkrtrj03qaljayllxbthzbls28rnm250mmr6hgad3kksjs6r9rb',
                email: 'lh3kfg4rc0ko8z9igxcqg015tco6l294ch88jbknbitecvwd3gnp1qs3ayr90zwhgdx192zm9ph6caqcr6w9gziadl9kcc1lsfmh2cxlys04qryq4csfn58u',
                mobile: 'o0zigthksuk0bgxlvu4klw9142r81c1pfnuuxj6rcff55a0grmhqpby37cs6',
                area: 'jfxszgm8eocola8z6j55at4z6zq9qfr34ddp7amdjjw2e0ix7hedbra6hzspqcroeg6fgqam6go8zfd4aqjmspcsruupu69rjwtvzm3dzwbi1c8mzfm3pzm0r0yvcikqabdfb6jpib1nnu46s4asskc95ojjalucrg9e63dhvdlsyyp5pulvka1e40uwih20ecqic49b5feqmex1f4yoh9h5ru4effmta5qixnawehwdb16m3b2vcpuo5x8upa7',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: null,
                tenantCode: '6okiz2i9xheprt7bs4ejvaebubas6eso50d7nv4rybh0oa6hm0',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: '9bo1o3nt5y4rbfm6hhem',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'ig34mdt28di4wi2vtnwdpunw9x35n5147ourbrgzv0kimh7m0wwkhswyt8rkj3tj3vy08qb85bm2kkzleexyhu6ngnf5413gd2xv4uge0hn6ywpz8uuwakkbm0hley0qmlhx7qgswwmp5n1npkn9ybh0idkjpba4pay5ouf36lchii1119f4ws4evrvt48b2n404utkcvbe5rcxj9h8a8f4ajzbxwm44ah7oz8v3ocunwqvgxyu65onmo5rwz9b',
                name: '7l222u1b411zxax65wox2ukrtgvcggwcz0ghqx6d9r1ul2r2a2ch4can9scqfzr7hnh2w0xvog0ed1lsuipe0g9z8xjp2tof9xyzoedmnokfo9is4sh1pasd9xjum6sm0l08dbyhrbwj2fptjjrljia19e55k1zdqg6yzroxhtv6ur9wyz68fsfnh43wjfsxzvsdp4x29g1obvhggbefcqv7ctpl6x9zpb0r6krmtznjtkirtrdg6qfj0cjwlli',
                surname: '13255qi4m1knc09iby9g5yfzng9wi0d1f3kojmx7jfqc00xwmpdwh9hm6cm6jazn0s1gal8fvcbq7ehtfl297htehendpnex3xvn86xs8tbpzxkyorbgmmumg27eupjm7yfe9db4v6aa07vnanjiymvhn6848kuyey8p1zqccg8you3trtcgcrimq4lqb6n6nzlorbplopmra2ojxgy4hp135xs82gt3ctw7rzjqgmgpnyamx2s46fmwnua6ram',
                email: 'q2rvqe7u44kbl7it27pof5znprvpab34cdd2qti26n03a3mdcyxntemtvejrgrfshh1ly2oopwioe92lmlch3hvasv8aciwmnclllehfgmylymeyiqsk7fjm',
                mobile: 'g6ygoz35cfx011j0ax5y6p9mhpcu46b5z6lh2jhs84lr2w7iyemtrd0cwosg',
                area: 'xavdmn68ey2ws8z8q2gsf43mq28zk58itaw41lcj0eeok45pl3hpy252qsl6dc5pnzyvb282k9j3a7ofuagcw1wb2guc1gmxpdfkdzteexw77dia8gjivcfvsm1g9885twnwhu9wdq5bwzxx54642lstaisr3xciuwcs71azemixx2os02slq2ptto1isoj49f4slqkwxe8wenxm4d43w5625avw5szvi0w2z9n8ns8pfdk3uy5v4uylh9cgf3u',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                
                tenantCode: '099b73pxvom7hxxf5e7ogz4zwfpndym2yxw5woebgaaxsbqkf6',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'ec9uw9ybhalt48hbxqai',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'vf8aagfmqkk3dx6ozvmanurm99pi01reakanvol2ju2tzh7uqu019fuc5scnmo1aqme2lj3vc81wf0xdb8hthixh4vpiq85xyu5lijzhoa2x9hg60pmornpnrfesmu559bbdt4bgqhrzxykdr93y3g0iquhpyuijhmihpx5ohajnz0saqbbciglgg4wg7lbs0dzbhze9pnfebkqnrw1le1c4nm21rqf7g952arpdk9bxd0g2q0zbw0umyvpmfp2',
                name: '79p9t8sw7w7vizje70ryon9h89aubzfwvmikxuxofym3yfh175r6635cbukfhihjbtl2gbj2t0eoklge2j0ad54c8ez8c0lsjfbt7rbyranu4azcbrekus8paif4c8ryxfhijnxvl4712md1ffzog4pbtq3fxzsus2ahhyygif20h4hd48dywijenq8pszuyqosun4bej4txvbf331jjpivqw0i5lksjduqd19avwsxbcqhd7wszpdk53azlmrd',
                surname: 'teizqgsa11jg64sr9xw5xikrnyjth49p4zlhetfxzcj184ee5pvrf5axdonytm84hqdm5h67sxszdrhyrd73c22v44jwdkxh0giw5utjtks27sz886s9hih1zifc01ft37p82fezk7oeyqnva8xymo0im7co8yzv76rbj18ykhd48rmby81jmngpvnvwss6qlse7zbdvd16bvgvpbunecbd3hs1b8efsfqiali94qsdv4gonruadmzk4tobnhkm',
                email: 'wumj9em0pp0ufd52fbqykx2e06bj7c7k8eh4zv8es6xgvidz7p0droh6k9yanq6oj30iouoy0xoim17p889c0qefu0twxa4xcuzm13huzfvkq99cnj6x41es',
                mobile: 'o1o83bsb4z4cmhbiqqu2ckx5pjy8wzjgpic5lpnagzwaw2uus74pbxl6ynaq',
                area: 'uq0zavg7jtoph8ffxgsfqiwg3lfteapy0ln6ueqj8xwiyf1qbv6jzzi5vj66dv4e7y8yhslmvksyz0wmtib961vyqzrlh4lzke12sxikjdh27k2qfkn3v9v5osq42ser680ctte93v7w1wdxa9ftewwsy9qsyfedofvvt8hin292hvlcxbw5r1bhyr5g5e96uta6y0nsc2bi3qwumxefxrc30h3xo56hxmqfbc6popboxgsl999uj3j9m76a4y4',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: null,
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'pjzvqafip774z083l4d7',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: '3p5yi5cq5bnvv2ae8w2pjsya1ygkznxqm2y9ssy8q9pmrfocqjaft372tuv5hl2ak9gcsrq8oeykv34rgwt4bk7gkjcwvjr2anwz9wkf33rwwv60zdojvenm3dam5watmdr94vsiw2s0y13vuw93tdy17318r5uqq32qj05i90wc552pa0a7izy9f7t5kfry19f94g2qst6t2jwc7a5q5mf6wrea7hkw4wnvwnyaj6782wdotupbqy86jk9fhct',
                name: '1y01w9zsmwtgulkn39vdyvua52h9dw7j486omiy693gdn9igyza9fka09uwgl3t91b0rga6kjo69lthycnawxoh8fn8y28gl61yyonql0491kck2pjylm94mjbkovrg422ygpc6365qc0yla03lgl4pzcf2o58q6bgo1beadk0494zimmxcffhe21077ay14t6n1avawv1nigdesoj11aeyvsztfz40uos3xqhhls3mnkszsxfsihjkzkuaon9v',
                surname: 'wmdox1a1m9qy6runi8fkjmbu7mizga9je172b3iogefc92wqlex7d119i68fvdxsw1kkobjzr4mzg8rdbvz9ekg49j4gjaryrejmsk8x8w2e5rqsvpyzbnzs17l6njixdd0bkwmzjfuud74ko35oj15qjflq904jx1f05t0m67kwb8rwxvmvztjfgdrdudb9xa212p77z43z8zaoztnmfk8pywoyvzzlkgyuo90j28jqqfg0a60xk247b3r7j3b',
                email: 'kth6s3ulxa7y3pwy2h1af43picy86suxwnydr5m8mmoteviqf39sgigfr05ag0vo3bp31of4a9afswx9qcfx1kcv18c1lfb1yvsr8jaeifea49fadp57rojn',
                mobile: '4287mgosc759jwo06zc8nf0ug3tdbi6ias19rx9d4lpmlzefps250ye4jtw7',
                area: 'l2i1l8160qgio7aqbu7tgi7jev6xj6aa5ta7za79rhbxl36y6j9f242zzg22ug8gmvw3ozs4h2n8g1g1jk1isfwjdc3hz3qkr8r1e65hoi6txxv7iq5xgfbcm2cjxvhvpd5g03nojwucc783qfhdetdhvl3grk90xul49uw31aaagsqacgckii01x1ohon7ntd8xcx4jgqtcvaiiiypn84dn8ln70dcjvoix3x291ypugry0onju5447ceszer2',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'pqt2xindkbgeteul9hwb',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'g6qsqmwk5nlxupsc17i003i51w1a26mwj0ehl5cnvgub7c3fkp2epxap3l1ojfvqkdvntrf7ef6yvrhlow98mhqs2yqug3ci5u64lltjewbmrmda0a9xdts1codv9g78z8ymftzi9jm0um41im7csyepudpnp1oapmhurxktpot11dfr6zhqm45tkxdvmxegmouxegqz722n82logk4jika9ee3b9wr4u2tmtyeag57ivzjjsfzaj5kifd8wl2w',
                name: '5r30kvlrro3xetb5hhejf9cizb9tow9yvo8whvb313fynyoy24mfidkuo373f71i01aoni6tzbseu68ifj1r3ly80bgdwnz7drk5hbm0bqih1cv9qtbf6r37pcrk3w642f9n7iyt5uv7t5zd1xgjgt3c9q03lup5uno8gyemzum7lo0n894v7h0h9847ocibncntqfh125ad4i6qxcj3r1xuwhanuk687js6u2u8l0frhjd5eazfwot7u6970mw',
                surname: '0x5blwiq7koponmyl1usuqn32iln2og7lwhfbxalp16pisfr002s3nu64ns8ahn624ps1tuy39j12skel832axrkhyq5w0pyimiqghy1rn0yogurrn4akekggt01nz3r3vk0vygqp2mjvmxwried91h4ayf3be2xorbrkjh6v59n4uvfpz1spv9fyp2otpxslzb706hxn1y6ticzl7rmhr5qaescj1w84nmuu6emt1c3qrnspdezmi27p2770d8',
                email: '8d4c2e33nkk5j48v77l3s5lhkosihmki5s5jzu5aovo0e86z95emiq19d9qbrbrsn1p1k5oushh3g6d79wr36z4vw87ecrzzgjcfjuzdifry3irzrby6e1pn',
                mobile: 'fx7ih75me57zvgg8gtsjn69ygqxzbbwu3mieqyyab15fidkk7jcixc3sepua',
                area: 't8sqshpkyugnrvl7zkpyrn1920q96jjgri1rjgbw7pfwu6jy30ljystxqxjg8ea6a3acwzy3yebb5qgspbn0yj7xzaq9g7bbyie57d0ms1x38qlpvcnj1djombqmd66krw6ql2jk8kuj5tqm4g6w8kel3090ovhsujzk4rlvsbko832zmun03dy26n1x6lxzj4t8wkhcbac3ft9je28ygnyugfl0ikf3scpfka3mvudoecqzf2liy9svp85ycd4',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '6qa4dfscqid3ubo6yjmvey5t9be4rahzmzv5iakx9sqv0o5d38',
                systemId: null,
                systemName: 'j87idof601sffxcfslso',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'qza95bd5bno1ilfr3yo94corabe8f01qt4sn4ohxbb9iyocso79vzqmq80wa3drhmx8izbrdb98ir48pn26h919zkbl36mqyrr05u8j05jy9lcm71nqymg4g7qdncwe1vqib2a6yeoclf1apcj3tfkep655d0k2igjfzn9o6hr7vxazgtijjg6l1n1npm6e7sorh4vupwrjtga9u1o5tfrgi5aik94xtie1jbbzc60vyx1bsaix0p9p7c58ynr9',
                name: 'vfvyp8eood8v7fpk171cw16k6yjmk4xmiwwn7r3tkgjnj5vk9vrxx9genbqu6e7d7y3zvh8ur6hyaklyaanjycyb2adxyeebhsnh1ofu3d7mza1e64igi847tx99lerejjoyfvx1cwvgfrsfmq9clahzriy1qwcrea2urvkyix4wnca6ga2n2fguasdpi7zb99t1dk2c1r57x6na9wgcjxgy339bko014h0eyciezycqb23yajd7qee7shpucp2',
                surname: 'umgy7qmbolxpgvn8j5emr5fl1b4s9eq4coawp3u5ec7z68w5pcp2tfs1agqx93melrhisuryqsduzlkbnfg0b453ry4ewojyz3uv9me6dqw0j0xqx15f9e508h4w7u0j2c041uuq8hrrem3pl1yjwtcqavqgcn527vk51iwzz8iqlk6phmsjkrq38807e0kznny8d3mencg1q7z7kq23dyyd0rycrj4h0tiriyfulmquv0ntdnb5hzs41qntamu',
                email: 'qyckj4tep30qjihdmc2x32qhgnk5dfkzllcw7skffe6gh4yjwadq0dv9q5i910qwf4vudpnrlsvbdeyyq764w6fbsc9wzi2lwtahpvab9fq7awv5pm45p6rd',
                mobile: 'ogyah1brbdfmvqfvel8un7dvuei91m7actj9ato9n6tuivezg8cjl6rn5nak',
                area: '2g5pef61tr6fzqze4dfshrbef2mw98nt295xt9kp868h7qzqpigvcqze20ycpc8yeeycb6szbyome7ns72666whralmnf52p2fl98o5rqyyvml5x4pvnj6rp2sw1e0281juuuauw2rne9cqmi6j5j6aiy2lsghxfwfbtl9bwnv50i9nf2379vrt0g5sv4m7584w3bzzwvxmquzhasjobuukp8css70033jj8hb4yigrtnl959qfqecbpuzdj7rc',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'y3v2ytm0kcavrn7kvogq62sq1mth3s5z3kfn23q6ykb2mtkoqn',
                
                systemName: '0qi9gbq7fjeattrc1me1',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: '9a2ye98vnmcjn2lhj46gzkykluykzp02q01ec0ht1qborfkwxg2ttshsxowizs1uayfmvgihzkkoa0yx6ftgrkjrl6rqrxsp8q5ryabbsvrz08dk8vdgu51gszrfvbqwhlq6q9asmo9xaflhpxrs7ya4o7frn9zocpg3pbpv4nkgurbv3kcpia9nna6v7et5zyjrzi2sjux0mk2fm541aocxzbo3gmi5lsrzzl5mkoqstzfa1c6gav48uuf7uaf',
                name: 'qkfc5powcbqlvevgi9fgxvuy2htwqfxqvzgwnb86q01oo85y53z8i3uen4ti1zyf0gilcgjjiqhvj9qwjx06niuuwhun6gou3pr2g74oxd1dx3jp60xiziix2dq7v6hj4b9n5eexyrsffzt2tlqta7sq7i33yavlvobgh2t45tzv7y5162gzc7li1k4v6swuzhnpfkab29csrwq0ii0uv7p5rg2g4p8kt3a7irb9ft9qf270g8eq8arlr05i95e',
                surname: 'ex5bswgrhh634tt5lgz1nzdxqtiu3m341brocouqa1jl1jjru63r0amtnf3husppfbx99y3q5tanm5abz7h0rt4w2nuc30u06uvwybmb0sif20ywqe9lovxxatdov9733eddqb2tri5y5wcy4d5ockkmfknw1tmsg4wvydn694v5uhb2fybf3qvndjfxm9qvxm6hqub69ycko1walo5ffyp0fanguyzs2prfh1r59appjvmrce265cp0zxgzzw6',
                email: 'hzlohv910cbisubf9aovr2ahac3gftwkbzq8mmq45cek0h2gucu46q4gf86pd7dvba9xyaysy85wgakvn8f0x70mvm7lfygfkcwc3cwwtqkhz8e932zaxl0l',
                mobile: '1bari4fgyzvsz4dkbbrp36z0o0x6sejngfv1378yty6z0j1wf1lug1rd2e4q',
                area: 's5cql7mmc0knj9fj4fyr0dz4q3f6zqmc308gxjty1y37uwsi45qj9flr5hqk0ilvmiqfnk1s66n2sl2q6r9ibbv19ne2nfex4eguxaoxw3b288c6ifypgs51zyt3m7bpib8j7ews9ipciw42681tiqt3nfmmcjo02ulbcxvzzqd71oj045w61t3teq5rikoanmyia5ejzpx0wb85t4qj3oykwsna1mkjjf3jnb21981susq8y8w50xzq1ujb53s',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '3y7k5xbgcj7jeve6atoquz80jzepck8jliyvs1vfcwd37i2qjl',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: null,
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: '7fzvgpg92ij1em182up6rdmw2kz6vz4o5btkyc6q1hy9bor4ay19rwefit6hdwjifu4cfy41oyg08e3a2msxwdaqin01l8hp9yhhfjk5v6vsqr9aop1ci76itstacffk3j8zqc5tbjvi7t7smktv8p00vp5vrvu8cm6qu7u5k6w0x7753tzd4xii8h4l26v9ke5jn9hfa3mtsurcq1iy2u0im9te3bsvk9y75n1daiw6r5yo7q0vgh98igqve7s',
                name: '6lyxyseq3t6r3yeb6a0w5kkqcryfbi8saw5b9ysqevh1ae6vowvm0da7cj880sv4r4uktmf591qa4dewnx7kb8rn1vii4a4a1zzdvtqlxpoxjjpxg4m5lyjqamizdxb93x8wf7qlone9gd0oyv6pzeoa4x78ryvnfwrv0svqc3ub8vyvkwiq9bootj7amoyenmo4mmvtogg8qar2iszop7w5zdjmsa8rdp3e2igldxw8mevs00fe8r4g1zixyik',
                surname: 'oep4u029j2tngxgftzjxc2a7hx69016j5z0vwe63wx0pqb13unvr65pzohsycz677vquc6sw3e4dwohvj7a51ab1bwrsmu4iqyleicsz94bg7d6aai9k6j6denwga82xizydtmh6ysqxdmmbv6ab82b3onqbov1r3474b0mebtpok2iwgur7waxxboyt2gjdusqor0id70e3qyew67ctwikni3e8vcczok8igukqwiwavy7blmutihve0m27bbr',
                email: '7ztxvfi942su5uwxhrkd92civq0a5ln82rt1ozaja4af4v0c89sb1mcj0mvay0qph5shrw7nj1qiay04qqtm04xwjt7vwbq9aomer1g2b35rucmx7pmu1ye6',
                mobile: 'f1h7r4yxmybs94n9jsqe7aoew25dpye2qvoik5ysjlmamwc0u41h7ojeu733',
                area: 'b02w5bi5rywj7w0odkz17anbq5bwq76u3w1gxsjuo1e0v2mn0ee5p196lssy2iq9tmzh1di4r9itytmfax1x25are51d7ipdkdeey636vozkimt3q341sk2nwlt5w07bpewqid2t7thcy6q58rnsxkvay5tq7zxkrijgv62gr4i516qkdw9atv5a7ty3327gydg0akvqacdzf1x7vdubo3h91x7yoj7lg97ue1kpzp0khije9153bdyknqmygbl',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'riajal61e5pymd2au8d9mmqwv0xvs7gv33wz04xf34e2kdhgae',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'daz4z12j30u03cyvndxmrh8ch1vmnvr4vscuub259hej4y24mqllgnpo5q9pc0f89nffqmnxgdaltjwrgt31ejddzzfg4xsfimzyaeni0089o9ieyzu76ev8q6853t7asgfnqdem80cwb0fs0w636h8asmkjrui7nuhwe668zxukf4zazcchbantlz5qz4mm7q814mx17rloo2mem6dt8yxlbog7yx218lru4y2bdapwqo6gkxg2sf1mdbajblc',
                name: 'o6n8f2t0sr8qo309oey7siqjc8ahs7jcn91kbztri9xwr3hp7y5iamvlsaic0awshrixh3y9udw47obet1aieni5puwpg39dy8sz18j437xc5qfvceyh7urtwwg2b20d4rxsd4x4lrvgt0sk43jpnvzqi2mi3jzr9pjztzibg8sgxebkhhtz0l4on8ka6xufbxviq72adwjv5dhgk1c2zj2dzhspzoxw0bd8wln1nuqxcsulhgut8qs3o91hrir',
                surname: 'p1rt32nborzl201ygffboi7mtdwzig9gy2kf120eeoesrgt6yb6pp5eqh9x140g7kkkfxupyq582ogr7mip54864zucff9vm2ys4vkapccrdm7x00v25r9lrfyzpn3f78jzh4h7lv0e5ap47s6u80m4nt1tf7yknw0adz4ho3gh87bufgy308cibvuacuf1sr6soskmqevsw1hit7d08ingjbj9bz9a8ryu775g038rm1cwt55r7ui994b8b5e1',
                email: 'xqi49hmnj4brgjnutgnlxvjgo9er2vyfbuu5l7a8aolku4dh465fn6ugxtk5p9uq6g0k1mijxi3l77sj8mxelasiryoatcmqfedtk3xfekob7m7yowqrbeno',
                mobile: 'zy3kgl33b61uuqlk7l6qt9jtn5fpklkyiy3o5afmyyg5pg01b4x0z5ooj12c',
                area: '27606xhcsrg1hx46kt7f61h69fqpw7om2muxj9u4erq48lid9nfpx4labwfxcoxvsuxbawd5t51ydj5t0pjhmx8ytfgxgict6kdhkj6zb9x9ktyv7fj1dqvi0p7supdn3rkdxgz3usutjm28rw9s2jy459azw6zr5dyx3ih9kkhza7ovvt1n5yf6ug9x6es4irhizwftu6ihoov52uw8jzjn3a7b2yynzxkp10i2wb4y7c2yj7lh32oiff9f80e',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '9g64ry9yz7is7wsi73yivhziwt1r5nigxsvdof2s4krld8rq2l',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'pol8k7mo9dyuk18905wa',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'j7wfxmrrw6j7d3carx0di71zzxf9lgb9b57mpckb9a1qyk3y7l3s2ty822ik4ulusdsr7tplxnj8b8eoeoiit955aa5gy7ukt1i9gietm3xjh6vgekesjlq97xn1238pz64b9mqduwqhop5gnzu0laroh9x9rsaij0zjzcxg8u79y1ygxvy3wfe9iql7f0at7gjf576edqppsxtygvob3mtr10193qren6j4thnigvs1ogdl59wouwxl3tuhmoz',
                name: null,
                surname: 'naygqrjyhekavor5nxbf1htvrqfc6rcbhwizu88cq8kdj2bodlsp8qiw88ivu759g3kkxkaozimehxebw60r3e9s8b6lk0vxujs2howzoh00lhprh3vabq8dnsr3w4xasfoa0nzhrgj5wlw8v3uhv49bt0b3ixd66je2ible5v9psts8zn5wdcy3om0e5rsp1bwq0pa0upymr10f69i05njglyx9qgexosz9rhimjlrbkfqo03czh0kgdrjk9ib',
                email: 'gq3uncrwmmv2934e2u5pan2ycrhe4tuuwcfd8xowyojdbq7zby2f06r32noeadetztc5zmidci987ibhbf6ielxb76ij48z22k6t3is4edv5q6qcb1rcwzyz',
                mobile: '1o1wcukx1e7ddk51a7yfz0klbkknjdgukg5nqefat223g1lj61vxqjb6ivxe',
                area: '0vu8xc23mpmkx2ei41qgolzzoxrlk6t9kob0c2l5py0youf4ogidfdrcke1j84edh4mrjpo89qd5fkorb20hz5bkh02su5qmlfy7x20a0curzrhgsbglagduncsrjj6tszebuomjakyenecya2wc0pv8h12ta6t7rasfgc2kexvyed3qs0080f40k708eu8hj16h53z7m1xv8bgj1yxe7xjf4edrjejcg4nykohi46wksg67hldcbdabpocxqx8',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '9vxue74s3whjni3cmigkshg30ix7qvhjs5koc0tx3zh6i2s60m',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'nlbbqbtabja6u4jac79e',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'ej6edpqt36hnqix8xct39fa0q760nd8leq9eym53plbwp2tca8hysw6icdlulfuku90vn4okpr6gerl8ujur60n9bacsmlhg1ib0aln3xn19btpeu9j4n1fcyglciwobbn6l1zeg4a8ge7vtoysv3mquq4bpbi0r9j8lmhbyjqc30f3539lryclxf8w42k2ffenjuwmq1cvgkd00b2vnowlvxlanij7d2uqjroeadoxtqpvzgjuel77l6eiwb2f',
                
                surname: 'gtgmsjv1wnnymtr7qvf562vkaddldv7m89wm1qwtv9aph34id5ulc4s1lu12zlkz038o7jxjlfkw9nxshnecbjwcm0he7oxfcmqzrnjhci95k8nf9tgz6pzxgktpqim8yxpnm65u2xknigtceqeqolonaybnters88ymta9w343nh9v7rvrldj99l3nfa666jm4jitywfen6lwm8ngc46zu8qhevcince7rtp1s31kqvu10bhf07ymh3etq3rvu',
                email: 'z5dcgccn7gd5nfd1lclfmiznzqh8f8eu8it2d117hx630bk8vn4jufq2bk6q01g0haeahyfq56s363pkur8mcja98272rz3dpwa70o3gc7nhuv4vsmxz5ilw',
                mobile: 'zyv04snypmk9ufcy6qzptc07aurn8x32mpgctnirslafbida5tfxwy88rdr2',
                area: 'q8ogcxk8qhk4g1woeikvxv4ewkprg212d4p35y2ul0ggotyveeqgmmblnlqbsw3jk1xhvtmmgkoqicp0dm5l3d4t3odfr5pq2t8x4rpp918kdm4z56orwccmwku6fye3ye6zglxk7n305zi7yvaoim8hfwuzuqmqagmcjsf25pwh3zqi0fqj0zxg3dkkfl0twhttrqmp32o5th5ojahfo9p7r2pj8act1xdvivckhjz829516r6uzu4wxe3sav0',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'rkry9nn48uqscfgpllkftsdwqb3un97vso50tvfoe3sbwkt9j7',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'tjk3g9txl8tu3rmfcdzg',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: '7v15myqe7qrhkfhi6npuu4cn2ngt4ej57kgggd1ywdafnduxpnd5ato3285fgkqdqauopyxuzngeva6n8p59uhg0yl6i0u68cg3pdnhhdpeuz3xk1d4dqf31opq37sq11ejhwiqgoerpb0vesvqylsd752i5d68jehc5emuzrniwk5y15e8g62mdu41eedyterfrcu8kkj4krl5885tonz27eg40eqcf3pl537zixihkbnc45qm44sg8369ixd1',
                name: 'm0jt7mh1lsnf06ltewtazwucogghvk7wzhvv38hgvsve8ht6zwvnnj624ejel11q0px7qolwc9v55ar5skmsa6xn879dg3wd4z6g3dhgpm94c6skigfj84eo7j9h4juj9dghagsxjcy281g2jtjeaznbf2b1o3o3x9m624wwgqo8lxz4zl2bntl2zepnv7g4pf5mhzxzyp85dlayubdexf59ab1vmuta622613jgr9ejy0y4wcv09afr4k1r5zu',
                surname: 'snwiw3229hl6t9fw3l0g8yfbt1uujofh0x5dqa6poq7sk8o3c3jcwgw00h29p17zbxasi0orz7sr2t3ihsdevnw1v6nz8fdgu298n4w8f5d1exv95zbx71xhkc2cwqbbx11p17nxt7fvpxs22sed5pnnqcmcotb88gdynbqap8wq5dg2cuhq9aronw03ym0tbr6xl9y0qs96mco5t6ntthaqmolgn7ns126ing1zgad6c9dd3sz4ieqcg7w7ay9',
                email: null,
                mobile: 'dc8zgzj6y1tp62843i2ni7c3vfnl3f6oi53pzanq4vux55rgo5uwx1t7tr13',
                area: 'ryrw37emkkbeoi0acfz05vdlwuqym1xbbsxbdpfh9fuvlhzzwv7895cx95y1ltyn4tyzlgbcoxu4a598nz2nab4lp5605c78qr028ispd7q94dv7ut60s398vt43ibn6qpcy74szjtkvt48wofssiqkkmg8sgdkb1omn7xwuhkue48ykg04v3w48656ut54ukb272qucdjohikp7en1lv3xsm5ihxp7qo75ljk9h0zwbwt6qc4scrh30n60nm9i',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '22ofrfwyl1hk7n9yv6xi8ph7hd7jl3kcwbi8up057d6j9q13ty',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: '592kgz0scil7g91an2x0',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'o4r4is0ct5n0z2cgb8r1flgemlwlg2y68ra9e1v5jtbod35odfdr5day2nzuzpo9gex34473wb6gz5ij4xye9psfhk4ttyqmpk3ng8ooeug465cf9cbgggis2szpmfsgm6gastmp0636bmj1n6u571y2zqy2hplbu3ulf6uxfqpgi70yvch19qr6c8q9np79whtfxticfaeenqz4y7b2o6w1z53hgrlrdzg1tg8ys2rv7km86ji5k3gvue94jz6',
                name: 'obt14k66yizbtbdm5gveuqv3gtrrjsfit3zxtkr0efc7g887e0si5ur2vrz06uomidn202h36xj7etvnnmdyporqvgl7dr1b6ru9q9ba401gpk9asz078eiltlp2mjwjskhgd6dngo3cea8mufse5jw4o2m2ggh8cwv8z647cv58hbugkpyxdhnwm1l8qtenczc9bj4rlzogrsdchq0lgo1xte2mbpkqdk2omyhgh64qxou70n27inwhiu0x0tk',
                surname: '960l9o3xth3ys00xpoe7cb36oh98qsjt10fq29g8ilail5rf2k5dsvxof0ub0l6dnpiyszd4pskefmun4iycpyjajj0rpzbftr36327byozbvb7unvpv1sdrlzwg7m3vkor6ab84vu3e827mk9sdtaythak7mf2dzom7lwrem70bcod2o5mmsblj1rtqnewinv71a2z6z0s6va627jnxl97f2gtbips7tsj4ot7e95hw1868e2rfw12fkm01vf0',
                
                mobile: '66ijl6vbo1wt05bw61cl7s3w1f770tto20awffpusi7qxgzwiyhlxm4rwnu5',
                area: '3ogudolkdv7i9wej15q9of5ihvky1nrt9p4uitloxnm02tedxi1mkegbzbn1trv2hwugosb5oil54mluti2vx0e1ygm8lyzrxpz2bs9dtzi6fyliiq75ql1wde3yybevob5kbgo9dwv8l9leh0c6hh444o848bquozf06f8rdklxgms3hrym07m3vaov1z7jw2xj0b96nel60syrkabw5vkr1pl0z4xexp6yeihm0kqi01w1d9kb3wwwzyc5uh6',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'spcsq0xqe0e50m36ycrkt6riaf1nsq67ieeezqwa4ddmt4r1uv',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'jbp9s1s80u7f1siz238d',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: '4wx4iytvitexjctt51pi88jcohy995cthewqcemjoyk5e716esmdqwf5riysdvx5kkrz3myzrfy7dw1btha1peeak2cgv3uj14gvinqw4c96n9j5e94ro5ynwuseel6lyoe6sutztdawqplghm26mhn4as4cxf64jut80hwya72jzqhtmipzxx794vw2mkfybs9ne6cwkxq9obtc6yec6d5fx01de1q9xlpvub4dlz1yqdyb8uddrtzg5kmgfx2',
                name: '4andudlz6z6n25keon8a78xk7o5ho2swm80b3l901i0fsfqk5np1se4g10bw3f1k1f2v1b05if3abxvmcnldevy8b148f1os7k1ecxb9dkihws26la7et33g7obta6wgnsn7afrvmb9n37s9r80se9slqe88d1xk4htp66y86adq4e83br313myeml5byj9bctww5r3zacp837bnmofqhl2x7ianfofctn2fnyh91h7sk39yqxzabg1wimqwa35',
                surname: 'm9bj0muv9grwiar4pekx7tdo5eo80lkcueg2czykittp9we9clu70y6ihxvuapwr89msfnvg7uj7yh68x4zlshup535vqsakajj0o8c31ss2jlqtgb6xv5hkjjl6yx822t3xwfpt8y23uouomo9pbibi9002dghg68l0dsue5kwdav874ejejo6bd5cl7ytj4xe053616kb4dj8nm05u2c73bp48hqugm8v3on7bja3eada1abqzbenz8lmafee',
                email: 'ychxfcdnflrtpkmf6kvhezhzgt72u7tygaccekqbh9ox7tfpawkl72q4zrnbt2u712c94ym5cho6dfopuepbmrnrsbp38egkr624ltxbsbdy9ceiwvb85wl7',
                mobile: 'd3fvdq2jlg3ew5kuiz00j629mmaxkxj286xt7x26ee5abtkjiwlf9olnlm1g',
                area: 'b7vc4s5g38unt8qw89jplr2c5d2oggwuztcibdm6obmnbavpjkrt1abq1znpuih5x4hv14c69d36q8opzrk85i47wu6ovifitm8plvvj8qo5n28qqjkk53xkhx0wecm9io5autuydgbxhmghytgc2ssh55qw3o8yac2ma30vwxjdun8jwbcmk3n66y9uyyz6lb193rvolgjmljctd793ga1h7vz8ic1afpj5wmn5s4w7ucl8pdx0gkd3aqvg80m',
                hasConsentEmail: null,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'xw7kuhlzyrqotmi8hgyny0u2krclky5xc6wjvommyplwbwby0d',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: '9zxazuxss4tq8oyfc2ti',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'jhchw0wwgnmhruo10s3vod4ttwbo18xo7a4y854l2kt6nig5dsmhdtipiauwl7ys80u944pby2u25l3jtmcuo2fu8ldygoyyym57kkpsafu8vr5eu5vxjoekf45tywz8hz6cmvhoxhzirqz50grizwn52hcqy06nyp8zi5c4sxoiiwiu460vv0i51jimq2yr6ba1mlage3iwpystls0wk03k4pix62xaggky9b7y6sasbqzi5ar8ph4iy9jrfqa',
                name: 'llseub8ki2lfwstmysonca24tby879mwfr7kwf4cm96yu9s963pgrtz5mynmuhzvc1ay2kd4phjksupk9l5wbjed27493dd85bo0fu7h8nc7bh1i1sdqg5x0p3ymuexg0pf3r7diwtk90vl2pzu6vez4ub4y4eigzh5x06taovg6us5gkc6s6zj1o1e3rbbxr8bolkp4cillgud4gy345ljkwii67g06pwci0z0uv9bcqrjd5fl9ok1deadhlyi',
                surname: 'tnww2c740aks4fichrjvav5f8l2bz15fmgl924qn6tadzlkcectc1droob7e8dogbeyh7bfwn4p2p3gb8lz8shcoihvr8mriw51bpwxwwwphczr07e0s4enj92iq1158pyf5l5cmm74zqdkkdupzw3bc370nuyl4bvx4gw2cm54l9uuy54tisc32yndh2zxy4j990tncpougqoh1ft1x1vm7z35iod38wxikpfv87baan6fn6xadb79olx6hf0i',
                email: '8bbeffnkxbgz4wt60y6rx8ysv9858gf1jw06o14gi6toq03zbdbrag3pz9vrhhrwa3v431l6obl3b3oc9o3l2v71y57vmc7hoimmz9aeg47naiam2xrp0cgw',
                mobile: '40ew8iu1itrto1bncyyu3z12u7x76lrs0l1rkwe6hfc8tcrf68s2ibvuk1bc',
                area: 'i5sl27180hkm61mlnc9fp75986w8sk6mv82fdp9f82bcjthey2ppij8pa7gl5amg6a2prxbj5dfv0cnvb7lupd9nc357rcds1lgvi38b3g1e61rjlh429m26vu1heo6y1wj2kjx4co1qlj86ym5yw4p8vkmb6gnu5hcw83pk2dfynqkdfmsso9w9aj5ql1q6vl0utrtnoh6sapuiae585j7e4mnxou4t9d1tpkvyynalb5cd6867u60ebgy6nwn',
                
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'g6yhgycwfwqjcdsuljczr2sfz2ojbw9ljbo7oy51ndk55bgc7g',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: '1u2uiyxselrmkbe07si6',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'vzyeqq5jodpcybng7nyndv7g6f3xweo6b9cfxxb7958dhr07icbgg3c8ftcfxoe6epxlf4wwazm20bbj2tuvxpojabsvsqbcoazbekumtvrr5byg8j1tfp6i4n3e97mjc13ypv7jikn9qofa1zo8isyybv0fz284yg8tqlcuwwwycxlzg3kt6vncmipo5a2o5x8wlnt8adb2j93l13ab65892wc717hm9qj75lk80891qc7p4icebd9b44qmtm3',
                name: '0uu4rgcoxbx9kim6bjdzgoj1k7j32xc0z2otutp7lut92h8kya0bylg62j9bz9nu51kiu4cvz5gi5jhlvzj6h07xhybp39475mng9vbderk4ser80spciafzfddc93ycl2wh4ys8szvg7ba6kvio46n7bvnq9bn2vs7xngdgv5yqxyazrc5g5u16ty6c02i0h3485n8uejrfhnidqccpiune9lswq8iqqgf7oqrm65nsubeegsj7zqt75sfvx37',
                surname: 'qr9dvg5rms18r84ngv747aosczwqwg4ghw199cmt6mw850z2urh0ialw0axnn3wethbzqq3dxy87q6ueihyvralqblrcdfl2mwqibgrkifuz59g773pmdzpawxuntp9v5o2w0awebv6kiob34o4avk9qpfj9okd3j8n1mds9wmwapuf9owqavcnd3qc5ezdjlir65pqosgxnh4p7g483qynvqmjulo7lpbclivoa4hrmeoqa3icimv5qf7uhzvm',
                email: '768aq56qbt42h4lz9jeb8bn93jm83fxmujud6fk9blrkw32zpz7mjcfwfgati85tp2pe5pcmlt5o0uob6bkp1xgn0532cz7pix4mdg0bigbf4rqbo1ah40h5',
                mobile: 'dyue1k3km712xegel3hppu74uffhniu9748c1zps3fg63b8xr481oqzv1v55',
                area: 'lyvmnupcacsosdk08pv1exltqbgvaquay6c109x48x3ln5gjpc2ecfi9d8rcz89bt50fd6jbd5j70qa9otxboqklkewige3cmun89yq0jg1ts6rfz1nsy3m77zr5yonh8neh9dczq6ykp8cm2kq1vx5k8mh4z0pvy67vzcqncmd13hd2kiu6p1fu0c9g0yk8yq1a5vp7fj9ekqfdyexof06dtbd4fp38opiscu2umo8k00hnxarlgejl6dzibri',
                hasConsentEmail: true,
                hasConsentMobile: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'zqm093om9sefhuh0ru4xp5lkbbne8f4oq3nge9vff7ck99cklr',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: '9afmffpl5dlubkw8xx6r',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'pe8kfj1ujm36km71vtgpg2v65vhvvkg8qqbjxjqrhb6cb917w3p3f6069wfx93v99ug6ofo0wimsnv9z7kwu5n8gwnz156a48xbnnvcmefcpdowwlpnycvgh8afmy84fg9334yx0w9vit7eati8fln7hfhxi6rtx0ngto2d7r4lrzqivl9w37nrv0ec3fki4gnddrsx1by7n6ovz3rwqfixcqfk1qoz9gbrvrfw9fd1192gznv4yg4crinim7ao',
                name: '8d65i3xwhoenq7zaovtwex1k6odd7qcbmftnlvl4yudpxq800l5yeilx4rd1to6cu22tmmhs9ukaz5inm6usbsc123kjdgz9t7octty72g6x1me2awklwzc20e6ngj2gf85fxuxvdw9dq607id9tq5j31etj9xngip7krd253twmmuh1jclpooe7iixc5xz7fqaqavxpmc13x696ou7u0nxt578lyyfz24zegfnpeftg0a1tgdmha3tfu3w7cb3',
                surname: 'efc5z0nuwxo3kn9i6sdljfbmm0rh5le0i45toix3z0j1tapnvjfa5navatqxxtecls05voig7hnzo7cuvhjaje0o7woi79aqqqb65zkkzt8m6fry3i2h3ueqxivszu3n6dpafqc3jjksarnq3xq9z0w7ucgigsl3h2ftcjn332ajrmkdcrsen9xvjkslzhuxtdgvq78fzyv953bfl74v138usa6kn527mxlxujeo87ggxicq1odb00y6hqr4yhr',
                email: 'wsk0yx6gqmt0ibu0z0kudfr4a7o7u7icm46vtx7hfap9n3x77tszphf9ivr3q9x9xbcbv7q04cw1hftrweoc466txyidbrlxg2g71dqfs3kqxqy14xuk247i',
                mobile: 'brgr4wwnagd6ox89azmn72jb6o8fqqyjvrvgewftf306f5olsp2tw1ys94ld',
                area: '9rst0so8ui7ir9jdqheo2uu7utzp9wlpqrk32bzlxwybymsbslxpc9ndz2ysdfoo8k7tcb6ys6s3gl1gsxr3pz2bdk54e39n6yq07acasocvgxoofn4j2n4m5y8deqbet78auh6evcuzkn2glw3rtld3klv4sf7sqb8a02w6r7cgko7b7nl7be4oy00pzesci46hmtvy1wzq0r8k6jdrecmje04k07ymovgb71cfivujzue7vli00c85f21daiv',
                hasConsentEmail: false,
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '18wjdup8bob0fepns7iw3c6c77kp1rl9h81mu6k7f4kraf9ec1',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: '9ogruv7iagjfkgz6ho30',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'shaz9escgn6w2jnff1y7mh5e1t0m5dfnf9c0qfww1iy8cq8hodc2ye8y20c7wmempcggpmyv6hw3bhhy3t90vlh4xoknl6i35uog078c96ulzrf8n1c5mfkdcx3w7wjq8f5y1s21youk1ev9j3p7tj4hlc59nqe0rlhvg8zigblw4pjgwe34ol1ot24s2l7lew7s5bj90mm6mg85w4taleylim9oue9cf52vuuzl3xih3k6uv21xmaevug05dj7',
                name: '72o2c9gafe9b2h1smnlspu5844ixskgmpzk5n87dz33487m49rnuve5txqo48mpaugjgauzjil43f9awiizk2gtkk4qwg18qm7v1047avpjg3t6k4xo352dwx9jlcuoltejj7jll10kb0w5zf82coazsritsdevg0s1g3tqhvs5xhs9w39ypv36rl4oswo0jr0nkokuh0uyvbzsfrs6yi5nczi7xnun01y2fx3ory16teowhd2cl7wcb9sa46r0',
                surname: 'yozufzhiimukg6p20hgkb0cw9jidbrx14zvbntqodkms89eosue7mkdxi4fucecnrxa0b1235xae5sbikeff10o63bcdajf6dzs6m66pra293y3h0lk0c21xqfkbqytiv7ye4nw8a9ku0v5a95twm2btscwtnzgee0fn182a3j5mvqqosyhdli32mulvw2uektbtzy12xpmlqp00cqggtugl52wpp6dl9gvtuw1lhnhybk77voj2hrb2z0wnu55',
                email: '3wgoaj5k8qa00on2uv08nnx3b3gukw47ys2f6pp4xr28s0kmx0m0jmw77x94q19aweskj1q6f5dhp605eeggnintlpzv78e0kk93fcgk2aqf9mmvkaaklz4o',
                mobile: '2ama2sk1wqtxwdmngcelam3f14wa1ykekxe4x35g7ip40fhr5d3brvghr2pp',
                area: 'z7gfbjs24n9i28ernebysf6uqguvqn3ly9x28p6w768nyu4c00ehixg07wohhmrsctfpr7q0c29y6np0lojmwcqhzyhf3jokdosdrs6a0rlpyas3cotq5o3p8bia5nuoxdsx653n2jxg4knpvrvz4ve0gnyu7tk1jb8jwizhzk6b7kta8hy9g34qht4ju1pe1e0hj1mjemxyskkt2nbjumdrdk3ppchz6exkmvtv72lhdwe89entqqn7a63at6v',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '5sahc5edy7s7wk0k5xsag7iavivu09t7svyajx6wkb9uan57cr',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 't18y1tf2hlkw0wzixj7p',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: '4xuo88xpghyufhra19qh8kemcfhevg4deqj9mvb3tfo3cs2619u95esqhmlnuy7l4foloht4wohjhzhqoxncooa5p4qhpuz6ixxcxugiv4znsvaqc08g0rdljx1rfpzdu1p6npbmb2zicudrwjdl8a8tc2463la2grr0bwza6blits8fh0an8wbewf7cbu0bywdq2nuyy4x6q4g43bfbpy1ortwf399t0yrmjdezjbav3zxyhwlf14dzt6zg6q5',
                name: '1nwyf0drr490rczbq6ng88fqq8693gwg87e23ur0yc3a1g7s42b99a7gu2pyftcbdwkvhg0x6nfn9yrb1f86z2os8st5y999q5up94yjope0ypxc3qzg2zv1qvpb655e72u2xc8qx9k94sxar3b8mq415t6smyfg5uh5irqjfed4d3k7289gypq1dsi23tudp3167dxzf3kakhfqa31ves3nryobd3dreajg3i5rdy4fsmlc5hufwd78isdbmu2',
                surname: '7m3k8f9wzfzrjgbwziusec5l0jyow7nhzowir257udz6h0931z5rnh7dyn5j66kmfaz19s04st8kt80dwjqjitqgkotmibltsp20uwwquh1cg8rbj9hdofogr3nehmanp8ioeds6oi8gquqepmp5ffehq1o9rln3ndbkdhq870dpwi1k418nlqd28vzm5diozxc11ord4ulw8n39yrut5s69rju4b6fq16yqw0fwu4omt8dmxif89uddch4q63o',
                email: 't5vvm57wdaf5c4gf03leovppfsnu8o73x6nc5pyddb28zifyi0vf7he19ibwckq1rm33pwvyrv072ivr307ju1zzlc1f3fs7shffwtmozo3wufguxyolok60',
                mobile: 'tyqvhw9zyej2ky87deydh0lykd7b03qgn5btqnkqig2hnytt37ncnrgf6ysf',
                area: 'lo1y4n7l8qufydtb40u955uq3by2cd9e9hfx6vkmyd7vag01wqgrdekurynnz3bc6hce3oevepts5o9v8qk4o68vduelmr6y8pjxclhf017y0u2gtifhao57ymk3bqfje8rxnertchbjxmrzali6n5zakwguj9rl1tt8zlkx2zc4g60akltl97rw46jgwxy4w742noiw86arwa709n5xyfa3xdin2ppw95jlyiy0209eukh394kpxrrnx5b94s2',
                hasConsentEmail: true,
                hasConsentMobile: false,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'uhjpitms377set0t331riomtki7wcywhz3bb7',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'mab7y3wk78kuzkrfxak5go2omh6wwq4dw1cge0crdluv7bkw9p',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'rcqbzd3ql1u8w2ndczh2',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: '09adzxzehgkrcjjt024iuwa9x5etkrvdykip1jzvci38ru39bov3bij3rxfnfhgcbzbptcvrdimkjo56gwr1ftcz3f5ozdesvjv3xnc7gzbjxnpducb5i4l71nqngno5gc14frc6jhloipqkeyjd719c0cee73ya7ck22bi49ro7sxqxpg5jn92qq8k06d5f0lbf0r8z0g8n4c59461bsyh0ijhlwc5knssgzvpp5yjb54dyeor7f364zu8nms1',
                name: 'ye013rm0h54g776bwuv3gos0djzazdnlupy2g2zzbgn2m45mltiq3bevxb7ccidfcoa944udkx70exku6614ie65yphozmv98bpfuwzsr638cvayyk9aye1w67twr85u7reahahab92nlk0dcvqtz03qsf2122d0kqst8t19m167y4343d2x65q14zrvhjdajfwylnwcrxvx30tjg8az3o6jcru8dlfyu224ixagpw39la3a4jyq5sn5b6bkpt5',
                surname: 'yhdt67ao4r2uyexm2ilwm1ffvasbax71detk8id4iybh8q95r16tpgyss541isdsqtzqne17ljgcaqgdlkru2saf5tymbmdpjh6i6m1mk15odkarcr63nnexwvn4y0gz699uvx3mkdtmyxkp5w6fvghlh83xpix4j3bng3lq4wli5lzutp77fyuirtm9swdf87y2uyxq986mxqr0420vf3dz3w4qf2el0i9hg15r2lz7xqdgrp3oeb740t8ww88',
                email: 'hxrpi1xs9ogtz5h1qhg6dysdek6t7xdcqtqq7ts7yae8jo0adho5sl7kmo29t6klrbdkj0110os4nrjq8rgktp6i3hin1x57374e4lbeoeotihbj02wlh8uq',
                mobile: '9hzm3i475xloeve80z5lpxgnpp6hy1dqcy7l27sj14kh0a7660q79cf7rucs',
                area: 'u0o2hyuvurgn8vkk07lllxcyeirm0o62l1v6syg1h5sdo2hvgbmj6fn55wqjuabrl2lvc2yepyawxb6pe8b6g7wiao9tjgunbfxoll56j4v7ys8dsvkeq24aqs3eu56dtn6xw9efinvwjph9bhgoc49ovsr6xka7zcypbhz3p4m6y1o1jqxfcwyhcvwfthn08y2oalkrvmzsrqkpyyda6lp4ei9l2edvm316qxjna84zrco307y414gssck42m4',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '7caud6ve2nfku8ho0zjuw6d7kzot454qherhs',
                tenantCode: '7ussgknbsoqlkibd3nqtg4kjsoabddzkutrob9ibh281m3h99r',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: '05pm1gk56oeom7781hdk',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'a814e0941e01c1bq7o0on2p83p09qjt19ajua9fo804r9ip9gaym4wo346b3u23gkhvw7qg6xa2vglcfkj3mx4h9gluk0712vibcvxo4svjh049irbvot4wxew0iybp4uiaczt2i4yrxa29fbvjrfrbvzn25w9t7gf6j0rhnmdo5x4hv1gomjx76q3gzv4dxffsjsxgge1onhgpsiv7mgx8zu5q192amb12zwlf9htroi1r63tfy7jbv3066tri',
                name: 'rc09pr96srwbmyq4hzxwbbczte2t1ji0d8v8f6oqg7oe6wzyxwm7uyfdebhnmdm5bxzdv9rb6l8wpqoaj9sqqn07pucm1sakd6c3u6potp21kl7gpahaiyph6r62smnxic8z281cn68bma8ap516ano934rpntlg5a1sj4g2tqrgr2u40fuvxe5iz58dtwqqcsxwcm6qtbnzcek6qrtuarb7bo8gqfqazon9qem6h0xaz5y8p5yt907cgntjs5r',
                surname: '7g55lcaoqdq4pltt914ejryku8px8pgfuemzz1l82993ou2263z8bqkm9uj5i0lwmnc9topfdrdx99iq6uvfxuwwvvjn43ynq4nkgicg3zfwluuczjws65xtmx5r2pv22205x1pt4pur5ysp12234cod1uukhgsniuh25n474z1rnyc6clmb7nf50a6rr59jqoastoxv8ghield8p529au6api0q1ecox2r1947e3guesrbztnlmng486hp0haw',
                email: '5iw1yntyg8j9r1k5ezj4ynqwmjv83u8igi8p7r0tzroe7efwzfh2fc1rpz5enmmlupsflaxoa53x2lcmr37l5j1av0879o5x3z1kflyzmgayk6vlupwiojvy',
                mobile: 'm8kjx2tvwk7m8990s3hppkuka6fo5wo2kbjzqeqlc2mo9cfvadzz0bu34u3d',
                area: 'nr6srtj1zvnogpqppyr0pknkl0lny760zyfv4vtgcr3is5ddvjjvj0u4g9xlgym8gpuudmrvu7931gnk78ev7yovdo9vxrwz00mpx52xf5k9o3iuonose76t7py8qcz38wigtewg85di780lxi5v3dm49xzrbp36vwg9r326o2pwmuzvbh63czudyh8udk6uccy3tmuji6aupe4vkfk2242xbcaowybfndneoa18wt9ujvyqzu2oz2vkx1qbfcz',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '91oofaqit0zy8aiubjj7wa8gqkgm4f3d8g5s5q8ltl3pqekuzd',
                systemId: 'fnrgn1mc7b49ej6yt0naikk57jo0l4cjiz8gj',
                systemName: '282p22tsz1qvwq4jsd8y',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'yyysic9upywgwrhthd4e9m5nul9h1ctrvexlirnmwr53p0xoj0igpmmonnjan3v1fyow4be25pwn7i33q1p6lvaoiqf3hhlltcofjompzo6t3nr4jidj5duvmnfdb8pzc6f6uoq9dtuoe3nrc4043vpwc65jivx672elev9fna8ar7jrnz8xy7jnd3xzz8wbb47rdp4f6x0yuamr2nnm4rwbxaaqaq2gpllponwc97grnl28g10sie7mu6zm5bf',
                name: 'z1heumj2nwh8stfo0fbbvwxmimkr0hq8q0rrt22n62yaz9rujykfvkva81xkwiyums2gj7d16w3q7qfruedyq3z94qxmtyutviscvsy9qh3o5355ikz828tkstxxjv5l7h5uqw6ucxwnwwufhytgdbinzbcxodw8m1rz22skeopqsh26pg2v6dkf54u6pspjxg2qtwxeffzhc7z6tv4xqolvvuvku6gimjj51gjpb0ps4rj3pz4tgcpyez5qgst',
                surname: 'ql7stky98w58oxwikmsywfjx96snsdb2eb0a3lk96ttkg49hqqu44kya1bda7dultg065b82d143x30p3hjnp4ji0fsupn7kh83i92bvx8ysnvdrx8jlnxbh7nfj1jf7vw2qujzhvy3eg9dnpjd3y35bzs7mius12ivksj7xw0ppdy34p6hq8k57avo9qrr8uitdjqned0nwhmvbo6tqpm9xgtamzooxxnywg8d9z7j89qibdiavaw2riy3lhqq',
                email: 've620noh3kaw5z0nap416aqaclb43uzooc3bvzfsqvnb6dr07i53vtmftc87bqoqrzb7bjkeii11n17c4uz9jezjrzodkya0f42srv4urbkfi20rcgrjsyuv',
                mobile: 'q0lcfo5u4dxuuy12cusnt5anzyfrddtdajd2xjyav9zux76voc45o65yfugq',
                area: 'j7234qa2mqyaqk9wtpkljbimaed155p35r4lv5rrelf31u3ie5dbi23hbo2xxgg5j6u8d1cf9ty9kpqhgw6lav5kglh7nlu1pb3ds2nykbt1bilw4cqd46svcahykehghk5u9q11v6ekcdke2nd1otshd5a80kka13t7e9ndgnt2dbicgfir8188fsvlr0m8v97kh1chznfqrokrlqsgccf5v2jbj3wupohi82krznbe66rep3rtq2cpmt9b6hd',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'xne9609ii3enu2kwv25mzz6e3gypcd10mnwnlwcnhe8fz30vox',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'cjr81ix2idtdx8sh48ap',
                roleId: 'ob2z1swzcp7bbathflh2q1zkteqg47d2eaflq',
                roleName: '20eqcpnyrpo3egp9b7jumh7ok1gxqu9p248drddwwvgwv5v3zxy6bx7xr0f9eitn3tr1pak1st0nnse0mbp7vqqh12iwj4ndtn7xawcmul7zeylmbyrwlqhzxeukqtbcpdhrx7joobrap3e5qs6fywc4o5ujhakcbr72q7slr55ur88ypyelsru9l10fmuaz75xldbmkl9274sf9rh0lfj3eshbum1dnre4pi0wx4hjntacf45tfqui8ajkdmkq',
                name: '6kum6aoj7naeetuh66sakpwmd43gpuywgca6awjxor0l8osv5jwk45pfddv7i8ts0ges2qsabcbdwoodt8cb2ddneeqdyu7pnbpv17tejw0bgkdg1jnyte3wg6ztyl9ineygqqc6huazsiw7v2sye39t4x4t8epj5r1qcsiedtnamz9kivna0nzli66sw47jend7zrqple8nxfl2zwoyk9rzsbkwegl0sf1wubrawmikvt6i2eax8jt0ymsx8vz',
                surname: 'am99cfpbk3cpsvy7mkgkfogjzpr4zzf0fm9vv9bmvo42496t89swcku9prpc8cw0miar03hsp2vzxjn5n7m10myjnjoa8jcvg4lca786cyaauqk55q1gojokytaqo6jtq9dtck8u5fqoqkauzk6oulok2s76mxikxa9fjq6bpd9z9xwodva1gwkoq08n4b3pxqjixcie3n3amot6knt0kapx88wvwpcd1uvspil3px8wx5yqhkz63smunos022r',
                email: '0poacf4xd89vki15h05h7r3xnryowe9do6s574kxjwcb1cy6ihidfl4dg9dsha0x9m4sckkxft8klnrqlz4wvmarwghi0tj5g83oseyyyt19z3itsvyn0908',
                mobile: 'x9ewb3w9spx18asnm8x7z6u4kgeh9kr2rxscg2un5gd0pqrb1sj90b8lqb0l',
                area: 'c7xc0vz2dzomaz35vqad7119rz266euqx40rzopy2yygokv0f7llua149qlcc638pgj7g5pn17xyi1i2dqq7kwbx9v3lb6svjwmpe1rzwv2nfveobrk9fvocqyma36jv1vix06ey2lskgvkgv9aqm8bby90bzr8836gn9k3sf7qx62oit2n328m18wxgjjq611vxugorhnfwf272cyzey6bfp2tdfrzhl52q18mcib02zch32cebzb23csbvhrx',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '3w8uqxh8tzy7aoxtv7o83ua0t722fi9sn615zlz7hehi054pchf',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'vvj1vjw1qoy17n2rddce',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: '350dx7zuuwr45onbm4fpdavg9bst8ozc3g01s2hv1wn3vnu6ru26r61p87ox8zkjwgp5mikm4xmnj3ey30ctdwo73yq8qkzbcqtozx53phrvlsc2dlxatolfcurf6aze6baus0d3v661vqv7nwq7f7dvit0jrum2q7ipe0hmry4he8poqfi3xno4svg4ohab84ncb19gd72v8gusdiv4sjfrisn62u3jqwglj2y1luva9rqpfiogcnarlmh82su',
                name: 'map49lra8oc29smz866e6buxfsj40434drk90uimqhotxl8t72z04ek9hjysbb2f9rvl16eq26rspnml1d4uysmh1qnr6keflda6e80y2la1h3hjrls5kb6xpq9cpkf1czpuj4q7j42ylsi0n8f18wb0cfgu5hzbfry7em5ewacuevniw4nqpq9pivbzcef9faauk149imeo28lkdi23hw8xyvv1xupv7csdhsvrrhh01ffid8hcmvxo3wzq70c',
                surname: 'bhgmxg7voqfyx5d4pnvckrsz12utl7pxrkvlqq67bn2z1khns2zqhj4it8ibm8zurp019155mi33nt8iv3ise9pzb27goxpiq4poykgp7e8eurj4a8c0pju5akwg4ad2b1hqm4meq86aotw47ym308h2drouch3qqje22u41r33qroahkgf557c46a8xytnaah90xxlx4u119sdw6qrh4e5gjoo239fncic17zcuuf4u49r7rqlx5k3yunqqb8d',
                email: 'boyr9q2ch4z2gjbn6q4vpkq06jiq1dgqcz24xnisesq52zpgxh2fotj0fd0loka3oeprgirkl0shqc95ja1k11emio7sy84r03ugez0ehsvdbw3nk2rfvbat',
                mobile: '8koua132m7qndpw1ndye55df5you9gjj3gg0mubxco5ju689kgc85y10v1xm',
                area: 'rt1aqf05wevrnsa6qngwujbb5awcgvncgoarmkr0yv4shj3fgfu4kfxvmembefy9zy0wijom8isaq5nfd61zzr5q0826jojavz6qs6d3p4k31mgafpt3knpzmudc5uzegmrysr2e2u2gi3ef79z9nhqanidaz1cui86rm45on4jkyxn8v92r1mrho8hjbvrxq7yd0joc86vir2xjrgl96lgpl5joszr03e98u3be8u2lc8wta05l6tlrkssp92m',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'hhp10k2e99aji8u0fakx4vyjqdq2xow85i3afslsseolya43fr',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: '1vict4t07d8zasevw9k5q',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'wes4kritnggxb3xqp9llq11h5kvdhoyhkbxm37s06msu69f89azgk75kjch22jcu8xak597vxswwrlatggera0vj5urw80xi31x09k8xdwrq2fm7kg7rfdzv6zrokmi0d5oprvp2hmr6isytzfrc9f3ik9vidka8du8292paysy0pzlp9rap41xp3hy2cbeipr39wamoixdz5pxhiyw6l7it3d6fblu0txwtd3rujy3bh4d8qml053gmoso7mqj',
                name: 'avaxxva52omeqq9prfpd3zzf1t2f86wzrb5e4kxygn9nxtb0wqkdd8dn75g0r58k2dkx1qzhrm1i8wx599x9sfru7a7qfj92p0jvzodulcn9o7n68j4c0i2jubcmxs1tkp0ybzohxtnaq39celgyoillgbittgv3haek7mpruytb3mi7frx8fmfpy82q1te5eaezw58s33m42y0pammax1n5kpqtrydm6kiq0bpphbij8pkemkc7vfutf8cwm01',
                surname: '0ynw003z1jlsjc0pii9y4rm2nnmaoazczsm447bbc6r1pd26weiafy61p6gc0ydjgnt6u64kysw060l7rga15b0r7h8ektx4msrqxicui4at7x5wrdfu4d5gumlcpde0uij75otppzmfihoxtpw7wygdcdywxmnjpgvm49glywdzk2lpp5qryj5b6kexn6qsqwhhcs59eekr0w47edx2wfh5ygxt61np2rk33ky4vzt6ax3zwhz8jmiaf7a5yqv',
                email: 'rqt96c51tuqm2z9oq6bnvfqj22wg0att8mg49vx8c4mhjn8nni3eh1om3ksuziaqfh9lc6ve5rt2es61xhctbmujxe2hnoe0y5br580qi7iuhvnoi20pwibc',
                mobile: '8226mww2bipb9cygoqzg6fjccfjrv9wwzquec9b4uliavg5ypl3kwv5c441f',
                area: 'bd6pjpvsfqk725qwevhfyrwghhsdmnjz9xaeiirqdgz62wugrn47dh4mltlcyl4wx8tse2h8yg8ex5hittp3vrlf4ich8bosmaiii06uesz0m1fshzwjleib1448fv15v3bv4wa0thmjoa82i7vnke19entmd5ywz2h8cfre29k89m73mtfvuake9oiua9fkgoplzlnxb429kxitmbdal2glltu1nj86k2886faia9iwldn98644teor0oe8udj',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'rwdjhsipt9a16avxiy2umswcnezqjsldxcqk2djxpwixh0mlmi',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'n4wc7eokdm6xg8gw9ge1',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'edrt0w8nq0avaz11t5nyxr68m9vrztda2gicbwmcjqj68sxlqatt64g4ja4rqfifj8qzdqpm2n89a8e0uvju2nhym5il7q8hhf11q97vkpe7mwoeskdx4h4wphf8uveak645bb3pf8vgvxhsgtibjp5bv8shc3iasi8ie55qz9evf8womxwqbbgl9ynrsr6385u3k552sm0fgw8leyybn898ifda4ia0bu1evwyi5uanp56mhj70iieqiwu5qp9r',
                name: '7q8w1qgik2300njl3uijeoc96pphw24th8774div3979pgolthmovjdrk8kn6paq8w0ce0peeudctl1zt4fwsxh5knwipztxwtrspk1mvoumcuobfcdul6721x2a2z4hr3fsrzopu6ywpvxeeixhrfd6is20kftakjq8k1mbe7s8pnpepv9tlbajkvy7hlntw9kuklt8sr783bghhzo17vvqbw6ztx9v6v6tj6jredr6wq23zy07mgx5hwogna3',
                surname: 'f97sbm3wxpad3gk8x31p6z7svmohecv21tg1eu1u339wf7n6fzc8jd92jmbbz62rseh5lgcktgwyurt5fdgsk1xjtk60ec6yaai1gi0huu2y6btcuafpjp9jllwievcu7xcoaixe416ismbmbsv9pbxn8ki2v8t5r7yhthvaetzlid8jk6ay14n5dapqzjoynejqamxsatm5nxzllek1iyliej2zxq9oj3dp8eeqws6wqacui44b8oz3unl496f',
                email: 'o10uwdejlohi9i1hxfh7a1g65mnwfjj72sx4d580eo1tka2cv9zp8g8m5i95v0z8zgiln7v6kmtsp6w3ba7e8v8kthczdknbe2hssu4ft4seyb2zer2cqo0s',
                mobile: '4x9qf5q8l7y1qq5k241jamobufcjii7mi8qo5b8o4bcgx1p1lgcotqox85vz',
                area: 'tmk7dei76nlhq0zytg9dk4hm8jv6bop74xicyno5bj6c787vyscg1ykqw5hin2sm8hgbtjlgog7uk688j3xqzfd0wul8qo8bdgkvoiavhzikaxcfbpi91g7yl1nz1nhunha5hmc8wag03on5i9i0c1s2xivbj20gob3hizbkg70lx01c2pqxl9yhq3a8if7v911qhbgs03hclahff8fmfiaqycgjsf2bw8ne9i6nrlzdnqxsfnsczvrkl8alguz',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '524ew84nggsn8nkfc6o304ipstobp51nwu974efzsgdjx5q6rw',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: '7tgxqdiwh5v8hvpz2lxh',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'nhw42wad19cl2rw5abi5jhg9wfyyqame2lgrd5ztmhuwc44s4mm3p4tqqbxl9i743mc4mczjnrtt2me42ffuz23ygnpb3y59fuwusse5ytti5yh6d79k9klp3lmogknaeoavzz7em3j9ybty332x8j0twmdgo36f8xlfwby90ibt8nih255d683iekchgh42n96fnfqts18avupn6kn415lusoq3d09e45elovn4fla1fy6o3ctc4d0u2qkj6mw',
                name: '8irnt0cmomebsy7fyuinkpzo3m73h1rbdrzf0k7nzfam4cmgavv9d5oybo9rjbz9bm9mqzy8p0yd4kwz7smvk7a1sbbw5grdf81muer6p6tw3nwa52cp4bg982utffu5pcmh61exhlyfknckkbrqxa9fsbklcxyc8wg9htdr59irrti8yesm1845dauay02mmk9uxhnaz1i2u3v67jmzck501n2d4x7en23h16k6r3zwhipauocyfaqr6c2ox9yq',
                surname: 'pnsix0af0sz7e438ty2htqmwq6wnm2hbs05ff2esn58dmeye1oyvlnb5t3kzkjxgloi7z7wzjve07xktcflal066jhm0e82xe6njh64zbktv9q71deluen76zbl4vhz589boq905mbo7q81otgnlazqfrc8u2zax1jhsyxvqxa9ruda28oxa5lxnujzzew9dhda2ruy51y7cogyjgevu4a5cllk6xyrzgv74cc0zejhw3sq95ui4mso35ol3nlt',
                email: 'yrjwgaqpts5snkpsgguxq9b2ucqbv9vurbm56n0yktcolu0oxetws00y17zyjh8a9wjzlgg4i3ohmt5c4bciedovr8jh3t273m8q897b67e1g4xib4ietb6u',
                mobile: 'u8ah849u1xyjc5mnjvezh4i1j9nb8425z8c4r0tohzzn4uuuieb6nzaq4s3c',
                area: 'p4vh6vvf1ily8sa3p7i40uqjlr0hzd6k52hnycsbrqr8ro5ve9ukedsai043axl2itzm94lgqk6bj9pxiqfzdqnq2xqmg9vqcqc924sn27h306nl8xkhjaqsnf7kv6in9act83d36e3r20xmg4djttkqf7e0cdloq0ypdg5ujvju8907b4uuoohj7dv0no309ia0h8rlm3but1dy853z3hdzzj2bxybuhbltrihp8e4gehln8obpyux18i3ebew',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '78dq9b5cxma0zrdfmpcej85kfcjwoc0tob5yo5lpqauq05qcl1',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'ru9hdxllip1ikkmcooxj',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: '3r2han8wxpovyjbzfzmz8brf5kxp2z22kzdk45am01rm0kq4k1qxa9jahz1pqxk6cswbebj7aztephs47xaibxaf777qnm9m0cxnbnwknkdlpbbf3dp1qcswtn6foccyk2n9ang8tf5q4v3r47nm4z81q31500p2nxvy68o82n9grvq1ucq0viy7edf8v0r2bydnvq8xhgaajcvmiecbuhg4zsa8ajo4fbbgu5h2ec4saafzfjtsrp4nev6i34i',
                name: 'gwdum5h3kuoid1cxip581x3l3msxp3v0004kedvle53itjwyreciusng302y1wf7022ixhs8eza87mmugavhplw8c6n5fq6n50lrs3l0mzk9lqkmnaz3sccfm30o2e4pha6i71swru0eekkih8zpxjvl8pcwr4gws01oxdd77xxpmsusr0qr2hlv2ujhr915laug2efpt62eax143kxaq3npod5pkahb762rdwdbn1hqzlc42kq5bvaoepdefyb',
                surname: 'r0b76i5jo2k47mjrlv9t0od4itpqnjw2ky9vmmetrygzhrj35h8uyzqv7e70hunbf8ho1zwcl17md767tiyfxu1zimecdvdry1rdwnalqfe1qsiwjzg8f5lfq084p0ggvv63iojepvvwptbyjm39p9qta9qv408xbklckqxrjkbzp942jb9h45a530a0l1p1mmt6ameqa2gvgrqj8nzbmkdbfmg9hvu0yru4jt4kfkt7prtp8tu838cx2nz5c1sw',
                email: 'x78nwrqawr3lewa04k9vg9ilj0j0s67zkw4gmhv2nlcx0p4zpin03i3r4lda98n7y8m1ij4b6m1w0m7o6a456oiie2nbcdr6upppjxgz2p8ganroo8zqy12l',
                mobile: 'ci87nvnq4ncebuzgf2r5il5wqni25b4v9e100s2xon26ksgr8hnvjua01ve2',
                area: 'l6ariozmndsiph7wssvi56kxuzstr6aghx70opjf4fbzq35hhrbzf43ci5epgakv3ts6uj6mhcbm2qh3r95dz7ch35qgrr788ok12yvnodu4ag9f9ocpdj72evzx6n92kkpjcog8lzkeiln1i9g38wq4ovj4hu57wo04nbhbahc9u5vi6ct89tpvisz5brlzie07vic3ejfudq9a3kw6v4abv4nmjbbbrp5sw41fluk7o6jv9rlbomfdn8249be',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '3aqn8krt2szqsxrt1ihpx3xr26mfl7jgg3spmhei8cua72crdp',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'k6hnijoux4xv12egt242',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'oy9hlcunvw37d5ooavn333ir5npyfh5koh4kq77hhdc8lbqjtm6a5ci4xrk8jpa8ya9sewxmi3ru1zsto5xozv275co2wi9saik8a6glwbas1rfe66h2z2x9nn98vbvu66mjy1nmiextlkbm0elvojwvinnxf320bz1jr85ljmz9mlzrlxnsokotcx6hrk5ux6j3h626iyys4qjpwzz3tg5x1bbhovuxoray8pjkocimel3j0th6dm1lt4m9fjr',
                name: 'tl9mk2ahfjdycyhnitjkuiapfih6hzpfzg0l5tfn2c2t9xw42dhozwfnvkowiar8nbst73dhqez41zu2kpjs31c6bkww4bibgk5pdl3mj27wbgd872r6fia2rh2l5hkb9h3l40kfeotrttx0x6007gmnt1kei1h3nn808pg67tw14b24mv7ghic5r2is0o8ea2lk228t7bzz91pjo5u2651wua9rjja2t1devk0lq1qwdtvv6jqnlgdtbdq5ow1',
                surname: '83xh21kod5q40djjrkxil0c34139udm87dlkpkg6a9ildolkm2zpd7jfz86wc222k673cmkb4g3ainehtz0rp3bpjz8sdsephg7glaqvm1cy1o8x5oo7uo5vtciporfw4y8rlsa6u2emeq1brwhq2k91gbn9f4ep1d95opmgkyvwuimf580pbkj5flbcql2gyrge7xwnqzlz6exq78esmsvf4itdkkjwcqhuzx1ifug0nx8aedrufepvdaquwwu',
                email: 'gutif6it580j8xaa5lcrrs2v5y1lgaqheahevxhawrw7j0y4ypni4qyazwh6uobjnnu55xvtsjitjip3chw68cs172o5zz9hadpivlisf48tefzfs8ktz7umx',
                mobile: 'o1laq2gj9yw01wqt5ny739hx8vs3vjdi80gdmb2x9gs95pp2bagjwsbkaqz7',
                area: '79i1382pqlzjgi2i6fky8yo1v0zfwuwp0wffbffg750vujnx8t0gp0v5bu6ocbv6mb0yx0tah9rx09j3dojnkgkcdlxz79d4ioo55tnydmxni7xijcfj0yt7ecnox3igb83cz7kjbskhkxpyk1qzse3te6i568ix4vzcgpnpf3ken5bna1fhnwuntq0nr6hxmewqocl2w2qew5uhtsdnptxahkkc7iak788fdkfme7tsunb925h1xqynqurrkwd',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '9zv6jk8dv4z6l9ts1xjtb0r6jp9ypf602r0db0ravpyklpgp0z',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'qqvxqpdosfqcffh1rmvy',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'lodj8h0dmeq2okqq0nwahdhri1jvdx92c4h6u1dlwbele313c8uqq67udw7gztuxmrmmcx927tq66vfetbap004p0wtp5szsgby47w9fan6rukdhqvigsvwdwmdzo46lau2dj5i45mkbmrv5o87yhd03x3dwwd0t377y542b7bv892amg0qv3bg39c48nyxqfkodle851d80nxgxrrjlnb8htl6jew48lywfo06lb7lp87c8k6dhyofpm36kl3i',
                name: 'gdlo1fbacgoi19zn5zozmb6olutoofmje5u3p3n6y4ify2on73cxwveuoo0vvkqucs1repjjgt9auelvtxhlqnhhk7svzmof8010gk3yk0h4tjywtn32ix54x3xqn7yvh0gty0f1z38gp3wv6fo3chuugd72c3iynddatt1pnbwxrz0h9ntqhss4ltlg535tox9lfinhk9p3mmbb3donc9yn1td1amexm1huzi11yf86bq3v984tl11w0l17gk5',
                surname: 'xzq5wo9nw5av4nsk8vhalgsutqwlkwnfmttoknwdli1mil6a9dydtut3ajxcv4jkdbvpo48qdgwz1rs81w8hnaxtwgo3v8esgmpyfge516j5m5tea7veo314jkjhfsw9m8f0ibeyar9djuaz5srabv7n5u8ouzs8pec0oazl1katgtxgq5biskeqrwwe5dpxkfsy40sfz2yiyvlobzx4wwvmzu6lgqck5zaib2e2awuon6b26m9zblnpk07f1wa',
                email: 'tmcmycerujm3t050xks5fy1fy9rkr70n2450hrbyesw4wcxj8rfkt9hf1zolkcairuwyp0ho8eq6wozlnei45unm3inh4csotol6cfnfjir9abvstp1slmx9',
                mobile: 'p5369oswl836qvxh8t64zwamevkipnnb6wq5a6ec7vqyrwphor01jrhnb13ij',
                area: 'qivxj4smqi9d9md94xqu1yaji8t9d0atb8z16hepg6lct37hdhopzrfi0j8lgzm6mlljr8xkhpuyast93dt7v02jow9kkqc9jakzq163ko4zupstyjgp6z9hh3r2cn46piarlxpmcmiz695c9lhu4k4z3u2x6rsjv7huvk6ears7rw58xonnude3h6e14wa20g90yka3nqrfdc0mkp51a8859dlannfdr15sh8xhf882eohlh949pmbc3eiuq49',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'dqgo7arcwp1pn6yoef39lfjhwxznr9xpizopata9lxgzygy3sp',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'va00p9ggm3dkhy2ifc16',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'ezwszbghjfacaxwn1hvanf5ofvv0s6v9j5gaoqb6ihgt0yoeurmmukm05eyed01n29wqdulmaa4d02rcrpdsd2ueoqfuzxhr8zf7tq1xmxgvmyu9tfd7v4ibsw9y7cv2duq4op8wy9iqzs1cr2a8cyvhtg7wwjcdczc43giegk242ixdgkkaiiwt28reuelwxngxotn9vy57newlo24zqhj4lbeu5rw32bxhgl67agmd58kbj8og82nmh0fp2es',
                name: 'f3w56fz403jkh1djuigg67274vj20zrlxmg9wn9pyf6ol56ubuwgpt1pazl72l2orb8m1xtbfqudms1x08282cldgiuanra2rgl6vnm5yfejwuuq11wzpy3e14yi8z57i7hf7eua2nnvdly900gjk7p9gn6wmov50jjbhk5u4bkwbmwzxcq5wnfekolqmk46bj8bjczn0xu5aeco8gef0ff0m10pt8zjkd2h6f2xt57fw8005lgabpnoos7fx0b',
                surname: 'd381zfxja8t85o3j9cq0zpb6o5ro23trmhlcxfn73vxt9nhhhm5xvz3w51sj54miegs49isn94gicqzl2hjggmcgcr5altj3261vysq329gso7xqt31l4ya1hx22yebjnf01yo58s66uaahwnilxqzfnfsflunr8eljd3lbdm4phoulu47odu3lstatwzrm89fy6z1x0iglw3qsny2h9kv67gsh8mcxdjpcmg8ra8kzknldpel2tde3dgp5uawy',
                email: 'ttww3pifhl94m52x6gg9bcawtk242ko6que6lou93ki13366df8130z44c8mr2qs0ykne5f7t5ke2tr9ky1nba6373npag7yqkij0sr6tt2d33rh8ujyxmkq',
                mobile: 'ze8g7oafwdfsyuq38hrvl5fayx9ddwq1xbxbahlv0o2jmh0mzccvychzr8dx',
                area: 'vgnlfpp7apaeppun28raat887p494t6exhqta23b393l8jwloienmsvcjpnhf5qqhwaztp03rdymtkeorz97g42titd2kpnpnt3lp1a87p79570jvynifa0rq4exf8wo1y8ymehn3m7gg70vb3ixlcm0g35b728q5xwim3z5qenf08jefuuvmjmfueepaz4e6io90a0svjg88zuq9mb2k8gw7wuxjwfa23jpa5uzp6otmdvfp8vjv9l5makq884f',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '5ow8sjiq179mqkpjftkurkrbi45k89lw05aru39hsmzl6ca5nz',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'c4vhq452pvves6phd4gk',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'hvrz7tn8190b1xrdns1y6l25uqramyqifujeeeaq8xk104mgfvccep0ff0owdhbh7ra1xk6xxiycq10n55mrps8sbg4yb51slqc072npgssu5ri7x2okmtiilfr8qll98hp4qesu45bezec12t33v8x8z0x70dta9wsoakadr0sr3z0pbd49oy81bg80c2fllba20xa71kgcadi23g19b4ugt2ge7cv3slqcusl75r0reuze88xnkadvlu2cdy2',
                name: 'bu1b2pjdguose2bgnq8p8xd024gfrrvi50v2kc70wm0dhdmpam61blaclx38dn3enblu1jcw3n3s329rdhjz4ksonxhyzjmxgsq2oqmj1sfx69milpzz5t1guchl9lv44g1rpr4ve9ckak8pcofcrdxwnzipe7yeg2869kgvi969uid0ho01fimmuzugv709ta38tzcufb3nrypjwb569gtzcw92apq4l34g6eb3qdziz3d3a0c2ywuht2abwli',
                surname: 'c8ez80ixofmffk72aacc1en8j70pf4906pyovjehryx5e4bsim9j78uqaum3f4ys00x9zg88432rraqnagv9cmt9yhsjx4yukoazarhmdnnxjz4a711egvj3jyk2kpy2ftmsgzarjxbeaiy528tq94cq5o1nu9qk8ijsusziffgyne2x45oz61biw9xjy0a4a6p6kdpg635u0scrd6g0mof8nhlsepyq5zaewc809zg9kzfb0v3szrxe1psrltt',
                email: 'ee6lsaq4z2r4lsi920nz958dw15mf0g9a5gy13vaxt30sijf4uvvp90zaqkst6dpyfk5f9kkhoakg464tym5symkkni8phj95v87452nud1qc8w6ual5d842',
                mobile: 'umbk5jqccn5zcjrvr8fuyuvy8td3cjh09hxlblhxdj43k3h2tf2m6aycy7dy',
                area: 'jzar0nvz8iatvi7jw96mrpumv60z0irn8pl9qj42m6ao2rn3fn6kgrsuxe7lxsx0kvfdb5u4nlwqypc5az1f40q9dcu4fdmyaczjex8l4mkv6w1p646sob2y45f5nr01laud576g1j3tuz9q9st350slja0eu8vkjk104mym6l4gni8ws9d5nwdjkqfy9hwsda14t9zhaklc57y89sxy2qvq89hfjyzplwj0ydbr7wynsl5wr4086azon9xiaxt',
                hasConsentEmail: 'true',
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '5h6wqkpm7gv8ocxddmqgwuubb244adsytprksxgp96wff9d8eq',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: '454iymw2g4hu44qie0fu',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: '0rz3vljsnnuyt9o14hej5yz7bb3c3zowua0vddzbufsnjsl1458hpo88w3jev5pqfjocr7z6sm71u8u8iphgsptr8d5txd9rijdy8diorf1qn080l8l9oxrzkmj6sfnllyofav5bac31cs3iod0nxgnhu4micrvnh7ihl9ct2cjij1dqow6fplitfdnud3d1dagb7jac21lpluybv7adhjxushwt4awwjrctk905zpwnhdm473a070i4fe1v1ha',
                name: 'n15fqbe80aoa3g28b4ketsdvm71f2po1okn1omm039eyxmc4nqr9fjhr2llalbizzvw5idolazjhags7hgm07rw43nvtopcwd06vchl6jahemobkvcb5oqmongp4cuuhyv33wt9xs0dvqa1xqp6wfh8wot3mwlb2ker2shok1jguiyzxgfxvvy4rh8culkephzu96ft6zm5om5mtuajc4jvokocrzbk3ltz90frpce0kgclr98a6bvf3gou7i7y',
                surname: 'knuqhyqn4t16yqr9m80wwmncpbojsb2fuvr7razma0ls2dowvje34ndkxkip5wjbdzp2gyz9k07nka7ptw2yx8f6sxqs99x437pjrfxouygbvoryybp1fqg3thb8gwmk7qipl69fyu5d26ik5ng4bxxhh2vp47dqr4dzduwvggx2moftzibmmlws3trvlm1nbifs50lan4e4k0xk5h4jfu1i4qbr7cons2yg5yt788n9kzu5b9bzo0xmxi70vdf',
                email: 'baiq6ihzh8xti629nuj9ekr5y534jo58llou64zj99vhcuu0wdcgf5fvwd9m9lvm89ht41wtraavtca0tmdfetalps4x6lmr3fyca46u4k6dzwoly70rzg1e',
                mobile: 'aeftsqvgj2zw7v386wntfi9vu6mmfcjl5v3yx3nha1vmya37htk520jinl4a',
                area: 'n4zl0ltrf6idcypifw9ftsty1tmtnnd09fr8ocfe93qci6fr2cxh414x7l79m381tgd8ukcbv8a1c4fhwplsnjtjw5nn15bc3tt9m185tw0c12gz6du94jf2z2np2mslrmek7j63v46j00lq7id3cehm8ct7kyemtz2djbqkb1fx2f39bmu86p4ongiav6mpubj59n790iiv5ciovl8m5rym226kx2q4k45n5ayqot8cwdsx7md5jcds4yldbjv',
                hasConsentEmail: true,
                hasConsentMobile: 'true',
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'arphb2fkzcf1u9y23ofqr90x6oi9lkuupthvjmrdzytlnnkkzf',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'nkwk2m3tvzsvpage9lby',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'r67nuv3zhkjgf9yph6hgxm6laepub7zjwlm6zms33583p2h995mcbcidcbkdoicbky6tlpkotdmncf9qw5e6ys4y308ddayla2bb3bhkgi3mvwhm1s8qpt3gjpqin95h9cj9nx8je4225kgten2layioq34u6fuctdi96yowhgjoar7v8jd27csd9ek0tl5iyzrgl6i41fxmcn9rced4jfmfpzvmczyphwrao9wlwn6lhqn0934zpqpttcqec91',
                name: 'dl2q3wvek5pf2meoziirqzc0ypmdqp75qwnwzng5ru98a1yxaeyv2temzath6vbq5u7qu36at21k5iyxyxlk42lpz6iykgwlrphbfhg77ho7lj6rfyqwr7sicnqckyx7xz8cqifmiugo97w0dozsjg1fvz4tz82w3l5eawjaojvmrjimlc13z4cewttvmhoirpygv8fnpp5q1eo5tuqilhxjflpu1tj9lhwxn2u69vxx72kuiy8dn0vernpjkd8',
                surname: 'div268ycrw0nglls8p33splczkj01ndotlotsi03z4dgp4eralgun8akb5qa7hiwnn9bkledxsssnhglhfejz3tjswlajblit7b89vglzhe6cta1nwaeft6yn0g4ikwmfhlk0y6mu7gqacg7w5ifjfoeb4s8lequ9nuiqscac8cyzs0qwk2pod3dxcyfdoru2hbvus3qgtltc9crgd9svl2fnul54c2ralqbsjei0axm1zozg0lz4zd35ce1ssh',
                email: '9jz0mwptd0psydly7rxr3blrixncwhj50s1zaih1yxra4fw1iltxi1rye497hyj3gc2aoudrupl0a9t7kihkpmb3vkf1c205z1ldhip1qh0cuw2istnsgj23',
                mobile: '1ue8muhoeei6g0dcz3yq5l9c0m1fmly8jy2x4crhl866dyvjw5jndn7a8x8w',
                area: 'cjv2kpidl5o2pelydoni7xlaei28zswgsvpclndp5dms7l0jds4um9rwz9vrvhl724smjztq9nxdtn6jpd80ta4gns6bh98v9pkwh1dba9t004hposv95m3xu8jluc9fl6rd5ejzzttxirq2kzgl3afztgqwdho32nixf3ey49axssd33v1f899a1lzq0hkl0ec7wyblzqjtxlcv4es8rdoytkv0vy53jo8a0yy81jy8pw228k44w2nclmtnvql',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: 'egd7tp17jmequ39elbo4817k7ujcljqnrgtzxaxmznoxoxxho5',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'wkjc45kksatcai79vr57',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'fyxiivdw56e37dvpgxcnqi6u2idbd8kuonp2bfd517lawrwwl07k8l897qubq1xxtxn3ztdu9kn6sirjjevyhvedbwydhrwlc0d5qjnb77ndtdwwxmfg3bbfpecyg3hv9zgt9zwvlykeo249fc5nbexlbayncft886h41daftof9lgcxbkyjdeka2pwke8kyia8nty1ctvw6ldj7c7hypyosbfjyg8pxf0amnb6sjae4f5vf0b41sazsvrs6k4m',
                name: 'crjjsosyqrmq4v3g0dpyoiey44b6pfl92ovpym3gz89qkyge3wcsdq8vclzjwtoavruk43np09nbinbcbppd1vlsk6juhvwsve6sskhl0odt6ub6pfc0apd96lcmrj4vkdytts135sf5ygweysa8ws2yse4r4z9jpu232t40i6yxuwj6m0ipevh5rw3lhngk29x57idp9xu14vjntecfd2n88wu5qqer0l9rto8bsq8i34hszuetu7hwtbdkbr9',
                surname: 'toharyg7no17jcxlnfqq6iav95rbi4vgm0ks97bskphqwxhk55rd5v1iqq8ddubl5zpa4h8ffc9akgewjj7j0znfh8t3h9izto0eti4sj5d4km5sdymshy9jw0jhi49fq7ptjwnhxda35ps1x0jcamcub2fe0709fvhuzympmhalecnqwf66bl8giiy2q4syzb0jqb67g5o43bh9uxgf0tj6k3p3i3cb164n0zrx3z9ipewhozxjp3s1iob20qu',
                email: 'owiz9kpocx95sbcjlyjocsqxj5mxxp9gmxu2yzm8pa45vuriweao3a9ch6igqd3wlfiub89mz95rd2ije8wtqpxrl1vimnexobqeev4asgrk298bc3ndsnjl',
                mobile: 'qhgezyhmpqeu28bi03atijdvt6k400wk2ll55zxgd4ju8177k6mzi3hv2whl',
                area: 'o5a10my6ze952drfq4g5lqcz6nj3nzz1h5e5vljh979cdychzq5wuwb5prqt3rl6vm1bn4b22ge99om3api3x3v6vjx9uzwh56b14yvlxxm5eb02ymp6j5nrjd11aj1j555lhheai3766pqk5sdimy9ou7n6l8vbmnkq4fiox7ychpfhg1dm93j6970vibqve46nx1j0tqxzzy60j6u8tpy49j8o3mu3bj99b9l2g4qe6cqg8ix38j85ifmeaz4',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts/paginate')
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

    test(`/REST:GET bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
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

    test(`/REST:GET bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5'));
    });

    test(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/44bfcaac-d3a4-4b86-80f6-567fbe6b5be5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5'));
    });

    test(`/REST:GET bplus-it-sappi/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '6a276df8-aaaf-4487-9dd6-a741b2c81b8c',
                tenantId: '57f8dadc-5f3e-4eff-8383-38d7cde7d6ee',
                tenantCode: 'umvobo47dsoq39wahcp5sdeukh0sw0yky0d36sytgcy16tq7rc',
                systemId: '18e772b4-d90d-4ac6-808f-d3dd67349331',
                systemName: 'o28omej4u7fpsd1cgsi1',
                roleId: '5ce98600-d753-43e6-b89d-8122f1ff5f29',
                roleName: 'dwnpo45c0g59gn851svuaqd8qmgioc8bljij3w8ccgi9f9ssh4eqdu7g0stj8acugjiasb3qal3vpycldsj48b15fx4aym58f5id3otr0ywloon5a994skmn51csd7ozbyo62q0gwsx29m3f6xkb8luhf24cx510sh126s8pra14kt7tmzqnjzlbhfhujbijy76jvzd6vzqehkab0hjtvcsrql17goyzh2kopps1zaoenx0c7c78fh5iwirwlj6',
                name: 'snk030zmduku7lfzgb8dr740nnuyzg5oskwe00t13nuk1njuv02fhvqosyd6db77xxanhi2qca6f0s3rymbihy2v2k9iathabg8vo0oasumz5p5x1zbtg1ii0ghmubgyz9jil9ryvuzosg2nviiget7jhhln0l11ppl1vdlzacier3ree69jzrdx3j8m4gc18q40pexd7zujbi3lnjkjnilmagyczo5a2m4xs12u477d314t6gpcw0bz4zvzc34',
                surname: 'he5zsvjt6l87uxcou2albd4wf7h7kekzzk0ci30nb6hbg95o2xncr86v9m3ppij36g1udgisb21iwxnxu38c2v6xm8nyrhafl0wm0cqw25h847sl1t5xzunawqbo672c093vpz2ckn2vtm6bxdfem0x57ua125zco445uryax0h8tfzjowq1gh83p04xbjukx5tehj2lnwkc4trbpzuigdj5v76j1nti9l954iuswwn12wasday3bgdqzn1k8nn',
                email: 'zssll3v0ujx9f2y7dvx3kawd9idmkxtd07jao1anwqjresd8s88zuiamstm292vnj72zsfeu50icc4ruob8alkq2b09crquqpqjy26zgz6hzd6nsdkb9wgje',
                mobile: 'tw70n4r6cj421tpddqk8bw9426weonot06ud7awyjtn8lcmr6gjn8xx8obfu',
                area: '9j40o5ndo9vtjin8hjp3wa0ma4uamlb6izhtpcccemwie3llt981y1o4kg16ln8xy6e911shml7vt5xtbn3f1r4ffi930wwetyy24dv7m714ybd1ngktu5l8i6ot05maic7106pphrwmg9ntwnio3m0muxc3u1g542jcbmqkrizke8yv8wbwehgg2eotflq9kefd4u4cr8n1p0f35se45qfhgsyne35l59b1kyp5ylr5pe4hberbsaw3m13ondg',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                tenantCode: '9iy302zm6zu6589m3z41iwv9by5dmc59uirr72pprmmzdk46q3',
                systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                systemName: 'uxxdvqjgn4ojnwi6y7k7',
                roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                roleName: 'e1vde21foyvjcx4h4j13cmekn3vy2w6j7jp8xp8hknim5k1kg8tt8yv8zmn05a7tltfncvh8dtz7umnrjerqak0zukd9vbidxcifbwp5mkrxaui1xmxbqvmhwtmvm5s7bhja8ukzzm7w10v0tlmxlr2ry8pgkikhdij8vjtzuuqqki8b74106181r8urvmnrzgj2i2w68ftiw2cx39dp553cgcb3en0nwstswv3b0iywa33otbna3rb4hz41fov',
                name: 'ol35jnonhqqgcf6bit39f0t18kolnox58y5ywdmj1nbahzr10wdut8qkeqkfqdtxme25ygdsua7cs8y329pdpg2lg66b99sudgr57xgvytp450m3fj8z7q1le0mcglt9ho9wv8a8rm7tz5sw3eyt9dmh181yh2ofqsgdzelhm895tnl8mofnlu2wsi38koxa9t8ttp6rvzrhh81jpvv6ilti3iyc4zmmrob3nhll3e60xvwmh2yy0hmo6st7noy',
                surname: '0q8sclvqc53gz4zplo8bnpnckctsyq4g77f7ruuw59bf1oi9oilz9nbpqf3tkkua7c66orlzzs5h3alovqw0hms2ivqympzufayza2ownc9esjnikdriqydzz6gxsxc566ulmgqn7nbf31repsfh09nhulb6irqsgvkyz6d884xhoy380awhfmlu5iodmc3x2ycme0t4gpkg1adn70hlivqicyvwdz9lwk938x9j1h4xlyg6v5a3p147x7kysvs',
                email: 'ok43kxnwkrzpqfbe3mn0xo6kv5vmr1134tg1v64x913lvcvgmpx29ef9bp2fjq3v7m2ibfoppt05c9xoml29x6a5dhrfs1yvzbtfdu56f1smz9m6t6rj98v9',
                mobile: 'zrjemjcrodk1tqd1uzygphv6hsbxaabxbeh4issa2rdq8cgmk4hu2rrnvjzd',
                area: 'agunzn42521xrdx3v3dj7n0r3tqwy9gvy2868d5aa6wwiuwcibeqztbi1uunbayt07fgozlfxnqiv9ngz06tx3x14kaqrq41e9dncksmb1w7m8orni12yvpvfas8aagl3lmh4o7ncbg5l5ad61wcow5dqc1i1unlh9vxtxlyt0d1fodgwd1zaybkc4g9dacegzv9emjg2ybo8okdswzem2rnv24hnzr0bk614bsqeshp3jlces1zc8n6dqpfqic',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5'));
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/44bfcaac-d3a4-4b86-80f6-567fbe6b5be5')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'fac6ab56-f3ae-4816-a7f2-e6d594db4f16',
                        tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                        tenantCode: 'e19p5vlvri6tgz2sctgxev5mj1pbfsdukuh3kmgbr1j2x3mpi6',
                        systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                        systemName: 'wp80ja5107i9ew9vp7md',
                        roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                        roleName: 'mvn5eoizf1xsvs63sgc3d7tsvsqcf2i5z2tnekh59bb5dvfy5xzjr7hiyexbfxyeznr2a9l6o6ard3uwbjfb6takdogax47u09y842rbfxwg3rngsnrklvrqlez1vgsq0706gb3ncxjm6vhjit2nf43r3wo5lbj6cxz89lv7pftuiql1ysjf4lbstl0hu1c07gi0vvlqxm274z068i04eza8g6ntrt0yxc79325b26ce3rehs5j5qmetvxe50n7',
                        name: '08i1nvtwhqgu8zde8kwdm02nah7banrlalongyklf1f6th9di8x34mhcdn1tz2xrx7g764g6see8c7sh91n1gn30ginm98hvoyg2nrslblghvewqjpr316igtx1b5m3z8cwt93w1jsvun53zrh668a93azrqtquc76udwi97zhf2u287sr71gkm35wjfoxuuejezooh0sig98d81cqckm3bmrjgup7tk0ci9ffshjvgpfkl8grr1ofv12mbfe6d',
                        surname: 'j5kokzf09mk1k4kr9i2v9tsetpbo5zyl9pvtvmcv6ar9jv48a7k6quvuit8nx3kve3yojkvko85ie10alrczsdmmrzd3ubvainhtrgu7kztqm2ttj8aazuy1xdv7skva7lsmvjn6ygu32mx0gppbra18k7yc6ok2xt4bpjruv2u3n4r6lt0hmeuf4foqfb58th3y6iwzvc4q28qoxa6z5zs0v38rk9qht99gqbi6rm2pg3k0pu3hg2ag4qxubj7',
                        email: '7uxat7e7t9jjy51eyxzojnnle7qup9jffgyzqggty2f09wd4nkfq2jn2m8mluq9ngf4asrvt9bbqe3cm2mpa950kjesji3pi6xuufdokuvglo5yd1pkhnbc9',
                        mobile: 'tpiulbx5gn902b9bs7yw2qy3kuaisg0vmmeoiyjyez4h1ndqf2f5onye0rro',
                        area: 'k71gktfygnm393fgaw9dy08boykub9se8xvqbohrc0gnjtgmyccsn314yd8dg7n3ekox83f35zhd0j9tsu4zu4xfi71oe3ektcsgsidksxvdgiyjetl9ns7vujz5f2sp577mxsuxd9soz79pqxx8wa3ufbze5pymiayy0hs5bzh0p5ks53ieehzf90dwvraevuua9gfkt2f2z67qq5xo9dfh5nm0wdub15x8zdhftii2tu1zkyhk1ayvirqq74l',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', 'fac6ab56-f3ae-4816-a7f2-e6d594db4f16');
            });
    });

    test(`/GraphQL bplusItSappiPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateContacts (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                            value   : '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('44bfcaac-d3a4-4b86-80f6-567fbe6b5be5');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('44bfcaac-d3a4-4b86-80f6-567fbe6b5be5');
            });
    });

    test(`/GraphQL bplusItSappiGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetContacts (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '8524dd21-464d-4e97-b851-2c68b4eb3909',
                        tenantId: '0b5fce33-f801-4fa4-b898-ab67733513b4',
                        tenantCode: 'a2hl7fu6w4pzor6g6ges4p1ntggeuwsznlvli4vx8tutadaodz',
                        systemId: 'd1c5de73-7d54-450b-a143-8218c1d4fcdc',
                        systemName: '1hhye1ra5m9k0q976fch',
                        roleId: 'da93ec95-39ee-4651-b76a-e9c31e45d995',
                        roleName: 'rzvjlbteg7c21jrfwtk3ubi386z7bt994efhr2pagsu1hrs1f4eekuxbhngphulzp0jok0uvzaxc84ovfelbpejr4093vj0keqg99sv8mzz0qwbd8lo2mrdi112q7iahmk7i0llvnzsb01yc3j9bu9mvnu7xu8l1nuef373gqdeftkos8x9nq5jyn8vkcvx7vv5b3ansaxbxl2jvqot2q8tjzvqjra6r0evyj00ll8nyguk0czbzjii7562h07u',
                        name: 'z6mlpxirtntzonhpkveupyxs37g41imtnlewz40x0rxzc93boor046o5n3n0r696gpa4dq4jufvyuien5en5g7fob92d7vnx24fk9ywb76wct2w0dy3fac6pxqhgh4egmxbz710z27qpbqshjtawar8b21d1ey909blbka45iho0xisupv3yibp5upk72q90yylh86e6ooddkusfavuc5fqqq50bfojhqjm4gh8xpv99jlnx69p8irtl5zpxq5c',
                        surname: 'cisxyn79qjzlsp95zhsqpsh8h2okhhuxvxq6ba32xocks6xbq1ei32nmb72tx2zkybzbevo278o7nwbq8w4s6muv4fpn1di5s5noca00k5c274j49wijm55ywgmluck1n9am226a487p3bnyuvlxzmigb587ob5jum33up5i5bncoi6mb31bjm4mqos55fjiil9ewo35fonfg6v3lbe2uj80h5dzftkt69eazzs4fggb7bcuoj478lo0y1577fq',
                        email: 'zstfbnub93snexb1h0q02l04npxjagmd9hzidt6zgiqiqiyy3ikeeau93m30vq95eos6f4cjpm7w4qw3szbvg9cke2rrp9qk705cg9udknmlk9bto5ea1o23',
                        mobile: 's3htf0y7701jz3mcd9rrxn7mgdtth2r2voxjrq7l92czur3gkyykenspeukr',
                        area: 'q1l1wunqz7bgmo99iamrek2jk99xrqqftij8wn9pni3rsd11gyoi4yyna660n5je5m3j9pf2woviq9gdw3glehuko1d66nmftelvx0m9za1hdbjtaxbhzys8g75cy3neh4vap3qdtenlxhwyvokdihmn9z8o7u92ko5xgu22funsdwdg2j5q46qdtez3ea156kgi8cwvnh9jop0vunl3ls6pdaw3vp6tyk8urice9h4xhpd28wt6pf97x7on3i8',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: false,
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

    test(`/GraphQL bplusItSappiUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5',
                        tenantId: '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448',
                        tenantCode: '4zt3266b4sfrsw7aaaf1d7g7flvirml6yqqkyjsn040wnwjd31',
                        systemId: '3a2e6498-b3e5-4590-8ee4-b694a6cfb284',
                        systemName: 'jq9avyv9k7cyp0xrnhkq',
                        roleId: '9632430d-9630-4357-ac9b-af4802e29e63',
                        roleName: 'lq5tjw8w1xk5pna9gl73905r9ug0yp8sh5ttnchpc11hg191zmomvv9re6551mzhrjr4ern65ng5xd39zz30zsspdg4xxhfbm1o42hlk1v64qfaz61ibr0y8xblv4c6g8e4c84a1zpvd570m0ipvkxupu1iy9whc0u8ru0x776djatdt5pijvjxskkb97t75aqpx62xx63ikw9zwd8g81qz0eil7pjsui83q6s100v2ttg5c81eoo2gkl4lsbj5',
                        name: 'mba2mvo28ysxisrbnr9zt31dt0p7wmynnyv972galiyd1hlb2x0yai62jqunacnyht8jf4iqa811h9wjyddsn9ynkxqluz8zzrwb9tv03cw7lwlycdfs3mfkpjzedsnh4smlakbfdq46wxvwmzzmkfr5caoq87pd8eoonv5aam8bknmtsym01dzsowdj94vsi06ycxc5yx27rs3muyhhjahxtmw818bj5mdx3v7eoiwlr8tfhi5fmzlzco0br3p',
                        surname: 'kv7uwsgqh88y4chxdf7yc6luswfdtm6a074zq1lvm19k4s7ggxnh0rjc392kl3888eybwwamlcyvkxx4467tontat2iwk1au3n3r2545brczbwtfncfdfpa9srvkpex4vxvyz5vk6a1rnct97mps29pnfv5hpoayys4gu1tyju1x4e96wxcn4yv0de78d6t9r0tqik7ynid2bb8mdub2ata6kglu7d05ucryel3zqom4sznwyv6m9utg4ppq7l7',
                        email: 'm5syzpaaxpoyx8jkjesfe6qmzlcdw36vwgzue77r3mmgb9yo8ep7zt6ocmi7luzf40cp5uca1tb0n0kqmae7f85c5eruwnlhg6iys60xb8xl8x24x3lpg5ro',
                        mobile: 'sw2lwsypumd7lchlnchebo679zemr59kpsmue73ru1cav6axqdlax75lhy19',
                        area: 'so60rjfq229tgj3zx69nimdmukks2u7s850bo6hxprozhfj6rmbk7atxe372bh5487skefl3g8svat4l356re74b33on4g7h7lnhkvf5itvjje4gfaodepz8cd9fb3oc9n9m3sx7h2rd94odr468lo8w7qmk13auiil5dxgf1q3ghpylccdhnfspds15bhy08sqd363cym7tdu3dlj2x3bvgnedu85s8154srdf3nhc4idnvabwyqt9iuxmwyck',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('44bfcaac-d3a4-4b86-80f6-567fbe6b5be5');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('44bfcaac-d3a4-4b86-80f6-567fbe6b5be5');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});