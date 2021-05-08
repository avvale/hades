import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { MockAttachmentSeeder } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('attachment', () =>
{
    let app: INestApplication;
    let repository: IAttachmentRepository;
    let seeder: MockAttachmentSeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    MockAttachmentSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IAttachmentRepository>(IAttachmentRepository);
        seeder      = module.get<MockAttachmentSeeder>(MockAttachmentSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                attachableModel: '2h7s7ak4y8yesk9jat03t4sammg810kbkzdnachmiyoip0t7vwoiuxec9teqmuvjmp8v356k4al',
                attachableId: '21f1270a-ccd3-4b29-9c92-e5ed6ef8dcec',
                familyId: 'd7c049f6-c4e9-484f-8574-45b82eed6512',
                sort: 344670,
                alt: 'o1oybqbl5o1xh0foom0nuan49c0430cm2w1qtdjto59o8m7vsvjri0kgx02uttdbqvbetlg106c621kxfe58p52u67t67u90ehc1kvgoj86kzp55lpboxwa980rssitc44rf7yj2xblrk15ypw5jxnc1364sbukqz26w902kuysgfmmwwob0ceuv4xsj0xcoic46avcwz6ez0xccws6opmbesvkmimwo83qeqenwxiq1ruo97ur0mcx56ev9ckl',
                title: 'pxujewj71blyjxv7k5fjjipfa13ubks2502p5oiy1v2ovmgbjyzxp07xwnu5er3a6mh166omi91i8v1e9mrt43dcu82uvgld9xe6eyy8px9k9f3kpep7aofdc55ddh85f04vha5rlh2s6gho4yiicxt9q4cim55f6b1z8rdr33ekauxsongilwicjhza8slbcjyugzcpbynpeqj26sdg5df0ocbi51x4zk7qajci2i2xpij2nyof49detpqh7rv',
                description: 'Consequuntur cumque modi rem repellat culpa aut ut rerum. Quo dolore illo nihil perferendis rerum ipsam officiis quae. Iste eaque asperiores nihil.',
                excerpt: 'Repellat aliquid eligendi reprehenderit omnis. Adipisci voluptas magnam tempora dolores qui voluptatum alias. Nesciunt et odit est. Sequi rerum similique. Dolorem et harum velit facere ab cupiditate in corrupti ea.',
                name: 'rfveqnqtwfoxtkuhomfel4su315ywbtq825n1qyun4fahlgdh6t5g7atmhgkgxnzp3fwwmj9vpkmdstiqhlebmn2b02ww0oda6z88wv28ch871a0791r5o36jwthp467bg9vedvwj26oqo8bme6eksn2kt15n7vqm5qb7yz7xehw9p2nkse39u5a896pnqiqa2rfeibni1co7i2yf7igwqpt34x7w3qrcfcomuvmzdr98tqo4ar8qcz0x7ck9j1',
                pathname: 'gq2zqaycus1usjwsv6mae290eu7x2pfictwilwls0mvnvubnlhjh83xp8d7kukrevfrasqtx7eaaxihvkmelm5svb2i1a3loezvu3rbxjj2popccuwp6pqfx15p2vl7jzsir80z962qpegnobczn374xjq2ruynm1dpsjfzv1969zml739kwmyiam551syjv0rd6usk0d33idf50bmpjy2m5yb1x3n1f8h3xw6ggxb0ntc5p1os869rrbg20vpg6l4ncpp5bev5a1q4vkv975yqqxbcssi4rnvrtyksjc4sl9wsy8pw0vrcouc55qhken4ppo2gixk8i7zb038o0g1q1fj71nxpu5ih5qmdudvf8ww2i63yhfftg1v6x4h2e5xrdkjaqaobn2aiagun68euappnl75q3crpytzlc5hneplxcklnkvxn8l3w167zndplkttu7456xgpin0mj5o4xb4g0ym4vamjxsyeq6r24ce44jibui86kjtpoki2wv5t6dzs28mr4fj1ec3fq3zv1xw6j0j3lz5c3jfzqhp8pgb8ppn9oc4en07ouohmfso5k7g0sle4xdn89q08w1yee5ov6torwarunmnhh7z0wviadhzk31talt85x02p0gi0jxfptuuq6qarv5b3ad72lsv7ws41otkv1etzrt4el3coy512zert1f3mzy6vlzivx2fgfngpyo4dzf4jiku3pu6lu48cuulzu4zkraplokysfeno7ihwpmxgxt2omiafno32z49tjnv01fgtw28pkxnei61rna5kcp0gy504vcajgy0fwlenhhgs44ciffefz7nwokw9ei3hppe22oyao7njgdpgz95c1wkqotso8d6sr65wdui6kh3swwo8cnw5f58wl7tq5ovroraqp0hkkgw03ypgokjr4i2rnfdr36wjcx607q06znhpp0m85iaaj1gzw7hfverfwwfaktsb0mra38o6q1gvraymurmi97hvshdz8gpxxkrb7hdy35',
                filename: 'bm4lltqkgxrdgk79zk7iiwt165omlzwnkocfbdcp3udbbot5vi0wzme85203weopa7244lzcxi4lrvj7vqmcgncuffnvam1jpbkrnui4gq80v8gl5rbz12prekdn5xqk7l40d2wrzzfjb4fid86jcaxo3s5xwffevvo8cssx74rfbs9ckguno75zzo4fjv0y6drt2fveiv2ourj9rq230xj9t7voveabu95oedsj0ymvwl4krdc333f1rxz4k41',
                url: 'ssc5zar7hmjdaez670n4ewxb2bzlwlxv8tuafe8apx0o093toy5cwkb8nn2x8kfdqvg8vv2r4q5iiycmqx2titbl0r6r93bzfqds0gxxspk2hbydhjrscs9qjzdonr2znrjq6ftxqodike5iayqf8w1tp39yxquotbn8f4gkxs08ikc53wnst3d5fsa6ftxkz2eopfpvk6tww9nd96zlp3bv9xh06efrskl0rgbjvo00hp5x7yen662xksfwsq3mw5lotul7yrp3lj59dnk8yqb2spoeg0i574fgbqnkzdoue5l99qzta7nn5fwmi1h3r9vq62s1th5qpqhsbqy1gpeo8a6k8wj3r2tz4dvmekb0g41tlcwo2fspnjuqxo14enui0q0voub3a2ty2m80uj7yskm3w7ybqbmpbf2j46rpox17jp0pe5twcm3q476ob3h93jeahg9oank68hqnv3x3njv2rw7i0kpet7ihevp40uheuexr61xtmiywu1tng4rcor50zwuxo1xk6m635qin1k9afzej2tbjts746lyw5fd2w6km6rq5t2hogckfny9kcif2w413ciggofxuovstup9sut185l0ikol1ea8fmfha6xgpfjlahgxw6vac5o5u0f24xh6glj0gdg0dlcsok7ykdxepnsiy34qut6egf0i23bigf9h5j8kwcie7god8du44a2v5o7srr2dra03mzpxhsgsbutsyblkcj8kerwg6yuhf5bzgunvbzvlo84hbk1w0hykmiqkaod5nuxke7ighni5y0gxsefx082e4955qz2ntcur56oizhqqb9149iczrr2xyjanbtkf2xjwak38lbu1ub7hwsg4lde2uvsuyb3dth6wx1s68u302mud1uaitagss3f4ippx027lq3obfdd6lumz42glcqiluffwfr0idrhrazym4j6lrrivdro3uue4k0w0y5e0is48l16k13lzmxwkq5oyps7yldtp4vownhoj91r5ataz6',
                mime: 's0hsibpzz5axsw2ef6nwlod4j96t3ugudutjyyqnf1mnj8nfzx',
                extension: 'z9o5ev7w9ssesolgglq1c1fx23rpgvblnytakgqwftoasj4pcb',
                size: 1102836516,
                width: 803542,
                height: 930568,
                libraryId: 'be1e273d-3fef-4019-8fdc-032322c8d773',
                libraryFilename: 'f82mijc4hf1qi6duqh9fkxzkn3br0pzrymfzk4xb3lqzwtth3w95rlv42vasbylw1i6cqdspjfjq17mghs8mrkmhpw31rtcakhp9rg09nt2cgxy32ja7e2dhj5w6jiagecx8l7xg4ne0z3uqolk2x9qokmrdxnrgiw2959p2hm1ddtfcvh5zitfuxblyqz0no67zxpsmpn0ksc1449rkt5ouxsdfaxnf0lgg45vf40a6b3u8tnt3bcyk49yma0f',
                data: {"foo":"v1FQX'=WF;","bar":"8un%P-/WGe","bike":33090,"a":"[G4Ma{+3B.","b":17981,"name":"[gAPe.:&tB","prop":"v0\"7uVhMv5"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '20502856-8c40-430a-992b-045435e38670',
                attachableModel: null,
                attachableId: 'e9544de3-0c80-41e1-ae77-f882ca054610',
                familyId: 'bb8b8f68-d38c-4314-bba1-4fe706881542',
                sort: 753277,
                alt: '305g7mautv1samddn2fykclq6x6uiacurkg2li65zo01x703edm8gb97gbhorj407n3lnhx1zs5ydivl0syp15eo45fjricc6l9ai8sio0zdi659x4p3mlgpjfgqsgqaxuzpiygzvy7ye1wrfzhdjj1p1edrekvsr0km3tgyivvsrqirzif5iqjwuqsq7069p28ecnajmrr59525d7a4b047h7oisdpy0vpqcshy2pwsvo3wunp6waq1loxw32g',
                title: 'aa1sbrvuc9qgvhsbo47ckxgo1ycghkhemj48bwu21kt5783f7hn5yq0toqys671o721s7nnl3iercud91bwmy8kf8ija8sqx5rf9vhdikralkknps8q005il4yhhsc81avy5z18iv7wbbhxcpzcvkjpnkyk8wprj5iu6a55a6vhxq1v41ewq1kjyuix1y343y9exortxuy1fii1a8jnvh225bxdifvqie9zx17wwusnw81ztb0ubvhrxatb04x4',
                description: 'Ipsum fuga ab dolor. Suscipit quis occaecati iure ad maiores mollitia. Adipisci alias quam eius explicabo natus. Placeat similique et quo at ad molestiae fuga qui.',
                excerpt: 'Ea placeat ut est doloribus. Vel ea mollitia non. Sapiente ea placeat dolore voluptates aut tenetur et dolor. Aliquam debitis sunt et. Vel enim distinctio aut sit enim porro qui.',
                name: '5o26nvzl18f26o6s9e9bwjkf5ccfwa1zb15ytsr4py8cunu5p4f6z46nx7am5puclhy170muo5o7445eznbo1vtow6xebdis9ju0mfdyxg3ae1qwhuaof0wamon2lt0vg4bzqlqa2gyyamuuz4ocdlfjmidc34o6fxx71jbbv8lclqwbldprevpw68v2eb7mye0qdat3koexitmtx3hrli74i6coq4ampqgb8rfivs50qeeexzptzh7dqp6z9dm',
                pathname: 'g45hz1ms04kl6qij1qzysampaaefx0r50je6x3uhcee8k9unmcnap35kp1l0uw4aa7r2j6bjbzem29rivkszqv3zevbk0eiqkuqfg427ryca7n4x0d4yu8g1rwrc34132owe8yy6v2gvvpa908jxqy1ubgiccuw6tme8zzeiqzc7x54mkbif4hi44ylybtf83upkp6ep1tbobh4orqw0mmjpuha1s1mol9yi5xmx8anpud9lx0ms01xd8uof61wi2pihuudywsphj6xjo3aljs7cq7jxc9fjd89rydnirmzx0vqsqrhj3jhbqyiqft067iipd05nlf33upp93ltpf4s1qqa3mm9x4glh5c5yoiocp3dzlz9h0w09yt6maxoonc2f1fkf2800teteke5zkhpdeweirxkpl00s1kt4bonkwdr2ud9bgnr19ud10vb29bf87lji74yxtr2xibtc7ivk8btsgdy5ecrq8aw57s1w6qt2zwet2sw4of0ip4sfw1hd5fmiz5sll78ewxbo112n4zisv9mk1ra5j128dlhz8dnua6p3kc49zsjjq861vnx1252usgdvg474lcd1j41j49ha2ax8r8njdz5etf0iyl6kej0hsooqoz36q4nk4pg01o75f5po60277bt9vkm1mdtkx8iur7l7msdf3b1lknaorbtgr7o92emvd8o96e1xveohrmc92zzs8m3peqyck7rgg6kmrd1c4mbrjs1s72xd7sp888esipdj47jwpcs94c5xxj2dn1ry2ry9e5fgncq71hb33evupatj75wt7qjecn5bn062m6h6pln3f85eqfsqonrt9pp8z6r3ldx9d2ad0ek3bg95umfn54m59pd77fejgf1jgkxrsfab40utw9j83qkp2ndz5xhs8pb5uhlcuwmb3hvhfsrs9z4dxwbqci1ee8ql49144bws8tyz9bl3qvj51uqd3z953hma5t1fad2ugz0zskum5cgofuxw9t66q5iml3uafhbk',
                filename: '88k6qxzvsbobk9crljaf1g176602md22c82xmcm4i8rpuk0gsy33ijxjd40lp8le1xz7m9maozgo56of6vwqof0benvzy8gr2n1mt2n0hnc18ag03rjetyt2bjfd4m30v1o6tmz7pfmn5r9lwl1berkg6y5ernsdngl23i8lgtb5qynwlolo8s4zms00myug4qz7j0givd3v8l2lcckjztxpjnvjcfp0uvudlv3ghjqjri3t4b891auy6hvvht8',
                url: 'svcqcmaafy9cshyvvnashfs9bs9cc1pa7e9k14r1ny7gh3l9rl4r87swkheom3rexkgmt1az1vjtzm2ukuca5gtcra0r6om9fiour4tdu67hbdj3mgv874su0mivsw32lac07ax7q8ns5cjn5ytjsl126dq3bgwx69qh7vaomu7tmy4qf5boe6hcbhyfl91nenou3443bzb9p7hn6ws7kv4bqg1opgp0mvmkxaovzxbc3eva1vmq0sva8dksxhi0x23za7kylgjouchig26j4zqvw59rmp0yuj47a7rkjm213fnc0vne1eg12p5lgkdhsw1h501ax6zxgkvzu64sokscqkw6qo1tl6f25hbhq83w92fvhlmd09uiqlnz8kpheoxyhh04l0sotjkdvz08rb9t8mgc3mdvjg0onl8jusk78rk9v8hm9h6t97n4con8prk54bcb9m5ykzx24taedlawkahtndz13pcg3duez6dhfptby5dh3dcdgeiwn878uij2voog85tpsokctv9ahqlp1dy6qkwmhwnjkvb6t0dyl95laowjy1c0ith9mu2robr7prmv5rzzuhdz4l09cd8l41m3vqrmc7ds16qvkepxo8swcp3lchtyzy68gb22z1taqe56ntiwn2leu2omup0z9hcwk7usn6au992eetnrqwfyi11n4ekvgxvr252qih4q2z943vt7ei23thlmi42t1e03hny4gdm1jhbr1g9yczaisubu1zeohqn5z6p74lg8iigh112uazu3ga438cbo44hc07ji2fe2kwk385dfdo9mkkbgaavud28lhqmri99xfu7wtafwsckqd3qy1pd7wscez1uv9v4lix67t4pa8iicgan5n73uiuekuzp68t6rcbp6j0r5lmgio7qmkdarj2ervvmkt24fcg0rld5y2j7fa8lr8n7hi1ocy3mwmoo8isadckx8gijj15swdp5zw8mniacfohn9rd6obpvd5jytrn9fcgnqx6t6zbzu',
                mime: '2csiplv5tpw5ul9kgxlkgczy1gmzj2yg1z6dx0eh85gs9x38pa',
                extension: '2w2dh1zgsdn5ij4o7gek0hvqktht1cyji09z99h2dg5kt1rmc3',
                size: 6986630439,
                width: 117247,
                height: 993480,
                libraryId: '21558c20-a96e-474f-b9e8-f4813d53e277',
                libraryFilename: 'efkbedz52jyi1kmq2xk2y9ssaf009xmq1r730b3kna2poi8j85r6la0xdyhwri0vlxbtv4xohc6k2ldk3xpax8isrda7v2ws2kit2g73cn384a52wqc5df10xdjh5eacgzd8qnln8wavq7c7gfce6sbyxqplr40xunuugztsxj08mfhtsdhkeedkfr7gvvec43bqezhekmzux0nd224k7qxvx26m3wwklklpoxhz2n5vb39dvnj51gb3c82lgx1',
                data: {"foo":"J4x)0zNZR8","bar":76817,"bike":89376,"a":"EK[g5j3?Bb","b":64243,"name":")x9{5AE!B)","prop":74593},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4c02d8b0-3b95-4c59-8d36-06e376b9622f',
                attachableModel: 'cp7qs6m2ppw9ga2v5nwqv1jn7btfp7g347irrdfvl8y1677ne5kkirr5yq8f2bppb9gxdco0f9f',
                attachableId: null,
                familyId: '97e00363-9c9c-496a-af5f-efe49cd69543',
                sort: 710324,
                alt: '9xd77x18gre67pusp1j90yuzwo99zq9lstskghevlxybv0w36dc86gmaykth6yrnfhd1qf7kqp5jzuvg1u1ytuoccta2620d87gngm0ok8xjh4l0xesroyzj7fdpnh0vrtx48d1n2qvxmawki02dcmrgm8ur4hvmb0fp22cry3ukc84cyhgupd6gudc7ts6z9c1bcodekie53ilk5wcc9cecdkghdzs8f2aevvuspy9dlrln64k695ovlt4w0eg',
                title: 'n3w80lemjpqr9djgi62wl62pqag1r69gd2i3th0pqcq0drvl2piowztl2jzx4iofhmbr8hr250n8m2tu04cma2bfhm7kgfbvn2fv27e4tcy6u1i48m5825g33jtmgv5r8taar66xz51atoowb1c5z0t5n46227mndljgnj62h9sjc3fxlzpngxnu7cj7anlh5v4q92xqzyyey6snocgvg4ml2r0v6whndi8aah5y5r2dfvkvrhhxbvq7vkl3mcb',
                description: 'Totam consequuntur velit iste pariatur qui sed. Quis ea quia maxime. Id cumque consequuntur quia quis quaerat. Ab rerum corrupti. Officia dolores ab et quisquam sint totam.',
                excerpt: 'Eos magnam ipsam repudiandae quia voluptatem. Dolor eius aut. Excepturi cupiditate nemo in. Facere quis eum sit ad iste expedita. Aperiam quia dolores voluptas delectus dolorem tenetur amet exercitationem et.',
                name: '4ora1mmcq41dw5fjvl21ebxq72v1edn0uyx1weoifpufs5cffiugbh5m5gb0qtofccaob35vmhb4hw9dlkil2z284il3rgjg7aghg5h21ghkenp59lu8s9eovn4cuvwt6mpv7mmrsnqthustc6gfp2sefstt9osrkri6z14nfn8jt9frskc67f135ynzirhiyu09oyq5uoa51c1v4nv051xhadp7qbzvkuslfkw1put24auhuxi5ot883j48b7q',
                pathname: '8bof26dxbr7r0eiovu3ft4uim12b23yex0fypxmyf30j0skvwmbcxzad04jmkh2cz2rsbtt3ng4pv4clzcng64006g3fwhqwlx3uyvleppxzqz8t3qqa9pk4lresareuiy151syrzs8eec7nr6b7bhocpl2vm30ru05rp0pvsi9ikv34xp72j42m7yqtbeo3vkhyi2eo8sghxh707mvxpd5hqcmho6m1zc504uc5ukghewf5d693hok99huik4gkg9u7xgev2vmrwgn5xvggh4jwpx5aevsxt36a3aauqej08wm4ck59z5x0dkq1fak3h492g3e1o8dxq9h5mpbrwesuskklo4nkjmx7hi6770o4n96kf3ywts5cln17bqeiyynph5vuojxch2jtfn32wbti0bh3h8yaxr1radzns8whfdnttcge4ccrppgkxkvh971dk2lp52kx0kdpvkl2mlx3p8e3oboqjrnfminyebkq3vrgfsjch9q4t7csc42ottj4omx19bf00u63swrk0cjneb7do70yyktt73mxor3xdernm92cqhywlhhg6evk7ztxhm7d5alf4r09sr9d0bhevo990dhbk9673mi3n4luejjphvjbt784ivuzvtd0x3f2dnec1mlkar5bkxoe3dr6jugg4pu7zsrf3raakaim11tc72cpovfoi7d6x61qwj3xhbsg1m2amvdvatf1j8vg1sxjzeo7u1e17lucfm0olqszborq1dyeobirizy2md3hi2so1ihkmhbmdtrdjrbywj67sbyk7vcei0fldy7tlv9vnkz1p2yd4km4lhobizr6vmapydmfqej3wzx6ue11fna4tx46f8ygr7gwa5d8c3c9m8ei0rpg3sddicj08a4a9iuu7r4zmarw9yh09s484xuxhz1541o9c272gwwytfnni54tt9yge6e7anmbyxa34f59n2amrtdudsn4qvecnat4b04jc4ts0sye2cihuis5ypgyv5b330b9xb0r',
                filename: 'gnmp28n1mmv43l7krhrx2sbg41s2it93tg2wmp8emeteiegzoxxla0vdrqp899yaq8bya427ykqhx0lw3rb3bpvnpqihx563ib4ced3wzdlnpelk2pnr5r6ren19ox1alrypmdi5d318n6zzguwdoegst3gfwtje0cwzyymjj87s493osfwmxfgwejzehlow17ovsx1jr4uiruffypsco5nff6205mfz1gflwkgz0b0ww1ycffw2dp4hvhir64b',
                url: '5tuu9y2449o0t3m0c0ucoxoregw8p7con5phaxrvacy0oyjhgp0cbjq5boeuy9mn497qxi4uotfw4tokw4dj0ikh7nidl3yckk9sgatuershljijo98sx2imxy208w5sl8ep09jzokowaq4086vsg452kzeu6fk34aoc0akmx1qodcbmw42gedjothovtqbesxubdyy9145g8kob89mphrd2r7kvpb7zp6yfhq6cn50a9nlmi2zheo9g365wkm29qjj2o1mnh5r7c1u9drrc6nj33p5y7kojlhu11sj765318jldimbyk9cndffcpjj6gbolra4yw48bhd9y9hf01z46jkyipg0nguz04obo3xaxlqq8zm5mpq82rcxknppgwcnpv77or74s2hskul360iuiks5cgq4bb94dc395rbtvo89j8vwnr02i9n9y19ifzflbguv09oi8433rk2q769odj9gdg3zoirpt9yfbhbl6286f0watkyfxl5gdlydvb7hmrs1yx58vdg006zs8ea8f278hunnaqppnb9y38cbcllwjefoyglozv7zz3pzjuf1gn867r18ropy4bf2b1s1qmu0u66uaews874ckvf81qnmzoe3kl23fmzmlnyod585rxk7gz9o1o554egondpoxaz7mwbznwogjolglbcn0i8wiolqdgidgd3wgq5n5rw8p40pr5wf1kxnrfb3gd7g2b9amdjrkqva86fcz7p8emf73qqcdu8irggv9auir044ecih1u3vhs9jy48nhroa4rut87u1e3y1iut3s3tepqdbi877aw36grsg62d6pwi5q1gouwzar5mppw9uv8yss86qb5htcx1t4efhrxal2db37qmcz3qprzztds6fqvjceg229g3odtdtsshv6xvugp6yzhfrhuwxgghuv4ekw1dpsekagt13layoxzjcpavsnph4wpmtkb77yzycie3z3holmw442sc24hso5gr2vhhj7p1wkd4ol87cpit75',
                mime: 't3gjf52cdxv9hvotpdccez1n8vql975dgyw8ktehafhahsjbbo',
                extension: 'yg68aieuz46esinywvm3ofzi1m9p549a3orcqrai2e996yyzxd',
                size: 4433465929,
                width: 535710,
                height: 927934,
                libraryId: '95ea41a2-e813-4903-b6aa-30adbc2b4d37',
                libraryFilename: '89tf80ssy2xfb8ioweb2sajwgjnvc9g20rmgmnsihfn8kj4gb3flfv41mhhd820n3lzv52h0s91ntpkx17stwgb8aq51oh6q3dcebbqi6334z0imfed4cp12sfwlai2nc8hcbr44xjwz8i5od3kb5q6nh6r0jqvvf42yz9bg15x8144i1d9m5jd0i2juwi62i6cw0wcssfz38er1h6i21er807drdywhb1js0to78kz1q66fzwvnxor5ecogm8v',
                data: {"foo":30644,"bar":"SbS[4D6RdH","bike":"yjP\\y`kb(z","a":"1ZGMQsR/.9","b":"j6&{k81H%K","name":23660,"prop":93188},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '42c05fdb-7e81-4f58-ba55-4fd46a13d367',
                attachableModel: 'uiyshv4ig2w7xby46thhcyipqh2fpc9xbhngwobzs240fbsuvwxkr7pzsq5rhsdj6kndlu4yxs4',
                attachableId: '0caa420e-56e4-4857-aa1a-f73a6365907c',
                familyId: '27098f4e-4a62-4dd2-9299-b16873f17c28',
                sort: 193435,
                alt: '14z0scsvwdgrob62cr7hccdz3um47mlzwvfgcr4au177y2a75tdgui2zsn0an1ejupq74ah56vfa02wzou5racwp6njck672wuam7s7qhxxmily3cj5qedgv24ckl4irc42wwj8tb4h3wm4blr5cbhv8mcs7qs5lhlmdpjfxwveeh3soa35nk56zy8pji6h2exoq4dh0aptv3nvsr0xc8i36qj4esijsmlr9676tt78vchowj7z9y13y8rkjhlz',
                title: 'pbmsfllcp3132yk9db3sq6nhjbcpeulgc5ctjryr4q7ln1008oykjjf5g69t588x7l8mcof4l25dhyj1wvtxaujmls4q1dmzdfyq09svb02bhmo7wcp7pmtpd1bnmjzrfa2zt2s0jdj3dhwyf824b0f7n9jj0tuodwqfycmj3ehkpo5zka6libl12om2y2be5w9gqpve743h5p1wacm7dq5ff6q5aqestok7ikp3h2fu3tj33ybigsb01xoybtv',
                description: 'Quia ipsum quasi est. Ea reprehenderit tenetur iure consectetur voluptatem nostrum. Accusamus illum voluptatem et eum alias exercitationem et qui. Commodi id sed incidunt quos vel et et nemo.',
                excerpt: 'Accusantium qui est harum alias beatae. In ipsum perferendis. In et vel. Pariatur voluptatem aut porro voluptas repellat velit id quis expedita.',
                name: null,
                pathname: '5pl08jto0cuphxrjxvhzm4d0qd5jn1isbs1c3q5wflbkfu9tpiwhsnrfmdd6n26pp87mh1ox4r9tobdewwf4w1qaem60t7s1qng3xvhxk18r30h7q1q5bhgn8n9r9hl10b5yw11gans7tf8r7b37dc6gg551ym1f55ul1fz1msn0c02emu8v51hxoule4swxinzxl6g0jiydwnbbdced7q3mbyyr6o4qjjq4wk6zhdvavxmia0fd4pmm1ux7q4c35vvecb3yxpuxmml8nlqyb48b8lz4z9qb5al1cr9ges5dqrjfrqrvfymcgtruzxjh8h28qfk5zt083iggwl10rmmsmtqt6grahwoa0lvixnsp97lquhshdaz10njowzhnhz4rp1zbjn27mbo2jdd9o9viie47bx6l66v8sy5s50fy5vs8auzz7wueql9o76nxdoi3kvhxh8sxsj8j5wpst81em0xtphilav5qg7ropl48cwo4kydqre31arr925cf4135bugmm1zv9nnacxrvmrowbd7menx2oqtf88w5qygg1ny6b0iohuy29zjkz55rexlfksfwuoy2im2krsixoixubp7zcnfkdd2csn7pee2nlh0dig796wfe5e7uek6qk44hw12olqjbxux7je9kb5yrykuuoxfkwfw6e1xyl1yivjayliilbs16iql0883pmjfrd2tvqz6ly00z20cgtmnotw8ljkepneblwe00ugpcurazwe0k76ub6tw515zgp6q7j4tr3tlazpr7z85xbysznkxywsbmyf1e9oc6kbqd6bkjykmulizoyzapuld6xp679q9a2vbc1rnpbvsk7nnrpj3uiarnkp0ukag6f7xrqmgyowwpz2n9tf4cjvtf11zdfjzujpnsfgpl0lovlen33wjxhg1z8frtibvgh3we4tfemvuyziawz1brqlzoq078q3gixas13i10yshix702j0dru4zgk0n804hiup86sxgehuqmqpcr6jvrae84',
                filename: 'qnx63b5b4lts2tw0vk3ji8jzyo3plalwrc8e8hnr2y0ojh4xsp0no75sxn9xfo09bmpvmt6boztrqb2kr1bbi117gxbma6ati9uop61h3ufodwyhjaifmqj5jevojw0hk1xzcwvmzdyz49c2wgp0i2dfzqmhodji5prsz44i03yysri1dwzyrkpar8grh3hi9tcndvdf0nv04bqgq6yz4eitcwba19nwrj0auvujjhrn59qe5mdaxflp04ymltc',
                url: 'fyeuda6h17p703kixtfjp13aok3tztrqv6q9dvtdzw5a8gej6itjltupdb8w57fuod3fmsec3x2c4ppqfgwejp2k1e1uhhru71475uwxmqkry9czqyugix5nyi34703m6tsogxi5zqurmmnu9r01yxaaan09oam769zwvtbs5g97zf07z4sbcjq3l3ib2jgd55z1oiq2dnqiqqqwtkqg2n2sp60uy3nyvyoujs6ufe6tdkytdzayqwpg6nv4qxjzleh7afw0qo4foy8guyysk2mwbuic9rrmfv1npmxmk1yjak2v1h7d92vafb4xejdrq6c9jng3pfuqfqq0he0v6soyedz8w1pca5ri6fprbaykwubbemiwonxomlsx0bjsejwdlc66d74pzo2k3l0360g2xiyzbmzozwq3q2anbkqjau35eifhhcc4v1v2b4hbg5jmasmro1okyuul4tvk80m3ymsd0oxd3nosz4tck513jxyq7g42qd3sme2wr7gw7tbgekjl8axiktqahaxy0leru7nyjnm5i7sqmd4h890uw1mkrb7s6encnen8th6pn4jh2qjlgmal9m5yj9f8e6j281j9nwdrc5yh7tqkqt28byh40r80ikl2tx5pz5ubp16n8x7imhk58lf792pixpv5ku70qplvwp2ro67pv5suqnxey4jq56rpq3mm25tjncu75evexrmk0vrohpd3i5kxhohbwo1wrri2atllp9a1zags09irgr2hrvzz0p3r5t09yureylto4xnz7yh88e3qq6w83e63vzyveucfo3t69jyk4ithntri7zxadhblrk6tv3dmfl7g23uu5govxob2pqsxhcr46n3tbgrfehtz9q21iti7urv0fm1vruypq7py1qripv4wutg0n34ajiyh1gaim00ltoloceyr5kzz8ouyte99yi3hprvgbiiu12aftw4dzc9gw00plomkswtr7lu6ch5y2l4j5u54mxknze8ybnz22wvnyqynxdft',
                mime: 'yx2gm38cbqsookz0erfpb6l67hd7r5piwsmes2g526dhyq51b2',
                extension: '4cu2lgyepoyvqffit4u65z6cevff6gyysc6toqf7wszdh1pdjk',
                size: 5241303663,
                width: 346673,
                height: 514977,
                libraryId: 'e9ceb006-f60a-4a39-8877-6fb5ceb1c7c5',
                libraryFilename: 'tqgczr7lhkrjycr1r630hxenq554kf0l38h1guuk4q6a460558td467ub8qjdxb5afq58bvcgkcmfijoy4grcya89j1up4ckcerqhqcnq6wjlld78qavvuq1m0ob5kzuvdvxx3soda1o2axmk9edwh6bakw5j3ovjyinfage6kmmzeh552l78s7dr43shs64sv8kml001fi5i7qw8qs2dumpntsp5tlgl59wwosppk5d6i1qcgv6xe5vs7k5ci3',
                data: {"foo":97085,"bar":29262,"bike":35404,"a":"8'N!#fY]HX","b":"[JphbGf2S+","name":39947,"prop":"qY;#x[@=V0"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '531acf63-e54a-48e4-a6a7-3b9623180317',
                attachableModel: 'a946vc905hesiahzj8jc0gmqqknnm6gjrw1d8arr8ofvws3nifj85wt20n32qged71xgoa7gbyr',
                attachableId: 'b6a035d0-1727-4a32-9efc-363133bd7fcb',
                familyId: '94323e82-52df-4499-afa5-ca4a6c63b8a1',
                sort: 408111,
                alt: 'k2avx0zrgadk87xj25zl2i3hm72upl885ri43taxrqurf0adkqm19w7saeappunysc26o4gtm0bpjjjyv8qbuwdwy5wnlhf25s261i7ieel396vmnmltajlijk0r75fg58p1m3f9bvpqm395smwm1qu6zp37hv84seprwarv58ncw88fzi3veetwetx1dt1xsc30cpxgcfrzi5e1596ywzggq3gnc10rj5sflfit8nlle3765mqa8ntnnrho7e4',
                title: 'ihopifc1ffxl900vcro6v92k0wb9h8bnmvge4im7cjkc7gcixzs1opnlgg4sbcczha2ll4w91gg1994hykttehciggh4395xk6ro8hnhidzonzn4n0urydmt9omhyzuye4bzpxexgwl6vi39xqu2t6k5oqc07vof99igno8o4g3ei2m59pbkzul1gu1hdtgqejjl3i83k49xihbqx5k5044q7jsbkmny61xwfqw41g2gjh6o5friy4tbu5k6bx9',
                description: 'Quia et est tempore libero quos architecto. Voluptas magni ipsam vitae nihil. Distinctio temporibus aut qui maxime debitis repellat consequatur deleniti odit. Et et accusamus omnis sed enim officiis cum sapiente.',
                excerpt: 'Consequatur expedita explicabo ex debitis dignissimos. Ex nisi ut ut iusto quod. Sed quidem earum.',
                name: 'b7ror2dgukundm0xbn82remfwq3yd7cwy1n5ba39g4gj2e0cuz5lsjx7n956pdz7veq3s9ou9ezbribcbvbmuep4xoawhoqa2munlxnrmosd4tdwfi34xz04oljy09rmpgofqbuemeag6hylzf4n3gqgnca2akb59ritovnibr8k74k8x1uw6aqzi9h70xxtp0myw1n0wb9vfhhtmfk8lkxmzmmtrgyg50f9whpvb32hqbulib0zp6c2n0zymai',
                pathname: null,
                filename: 'u65exjen1svf2i3rmhoz53oxc9xpo1klb1r81isxxu11zq4mn33zrf6st1ko6k467tnrcjuvilpf8jwpwbywy0y9anpulzsx6ljt3evgl1jhqrls1zw1e7ej7v8xl4wu8stlp1k9bljr2fpkd9lvqfpywavwikipo1a1jj21y4h6j0504ps8llfg29jvl79wxskbc2fpqitdwbhr3jyzqf6rxrjsx6u7c6g15bjkb9njqtz0usmevmwct1de74i',
                url: '6i7jzhjz5ssn0yc9dk1p6a7mztnlvoqmnq4jcbr5ome4it674odmfr94yay0g1f5xscgkuun6n3izl8svwm24ep69iwe9jk69z23yh5m5btk8t49q3st6r98o2cjuqml7k3f9fpb4thao4f1b1kfgt65zj4agmzd84wy0ha34vcebpoiuelidrpdrlbkn7mh6uikc4zmjkwtfzuc2ley038sp6u0wyof7ne8hvphybcqaiohbvt148i1b8h4bebskary4sva6vlt175c7gbwi40fw16p2dx8o9hns5q2l7v7d01aq0xlolhh4292184ze80plu9c3x31t20xb7ij22el2q6tqqyzm5uvvxgkscyjyf7f5qjcc24jw3m3cx8kqor1kjnc9tlyclqjtrzoupk96genhnperzrzkwjbw6p4bk5jmiuhj275u5b1uab9n73a774dg17oqgeyas1aiu98okvqofjc2ngpipnh7l3c03w5ej32ftuegaoii8h6fcm0pflu9h88v0528gm6uqx3ti90fy61tmnmijc39ir2upw1w78dklp7nxjejdssvkwqfou9ktv1gqzdggj7f73iqx70h8l9aul9f9svn54xh73feh4v1yh09t6x803tzcgqq47ukinfeychcui2xojmtfkfy5y9hys3zyxaaxif3eekbkhg7355yf51vv3xasl5fnvedog810wzziorhuoydfjfpugujbp9zbnje61x893c06si0id038o4e3juqu9ldujvb1dfoh2t4u16bk2fzqtx3b7lu0t0hmfcwogxsoqwugrqijg1cbe7kz7in5singcgwadxz61dvy8x2aq1zk8qol0wsm6beqb5qzanl3bok0csyx9xdcixb0feqg3y12t5hci6y20vb2wsjhzvikrcn4hnzivkabhtpfhenqafwsnzxjfrlgt8azqzulcd0vd7lmxlmjntebtgvnpnnbcsty1wkygizsym4fsnwnfrjuww7jb3nt78uh49',
                mime: 'mvboxkr7d0w7uyl67xzdrzle9rucppbv81rm0ftybwa076pwxz',
                extension: 'jjx8ezvs2jn0hkxm8ipts0p4ucg0sek0pk4vqrsvib5ue3qohl',
                size: 5779086690,
                width: 132265,
                height: 413827,
                libraryId: 'e62b7ba2-d3ad-485f-ada9-4fdca654199f',
                libraryFilename: 's51c3217ux2uzwbsaktt2pppk1are8akzcd7qrcgkjlzprg97t7wn601me4gek8jmaavy5n8r9bbj2udv95yn3kyb2gkskevl9ugx9p74vlbtvb9ko1i8o2u1fjz47umgenuoqkvxqn4avd0nk8beqinxo08hfvq70vcxh2hp307wwdwjcbdzhkego1z2azkyzjyize54dy9qdy23rtwjljwgww2bmad5cbqfdib8ufzkywh21ukfm1z8ivw5du',
                data: {"foo":25625,"bar":"|ukz;(\"bpZ","bike":"kX%BJyid;B","a":23025,"b":"ETl5jAvsS+","name":76416,"prop":29274},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '80d928a4-f118-42ce-8e57-b7c71643ac60',
                attachableModel: 'hkmni4k6suggoymrd6hr4ec98uq76vr9xdfayteuf7zrncvfrtlwt6du532bakx82e7ifk0bekz',
                attachableId: 'eac8bc7c-21c9-4f95-8f05-dcc6c7871fcd',
                familyId: 'f3a40d75-df4d-4c27-b04f-1232a0ec65cb',
                sort: 390038,
                alt: 'p5m1k47u4gha51lvwj5agjdsvjmvz06ztplp27xfbu9pdrlbg309tpbhj3tvlgdz3d6kmuvc0ly2z7qeb570xpbc8yb4r58sqsyvtbdpn0w4dc09d4xj41ayhejxh3mbkdyscq428mtttxid4j00xvlijngy0zjnsv1fn96ni0436a0cdqkremx53klc0eo55gwlxnkzx7qmw7brl7tmf2zlkyghvxs0nqvhf0oh9amsrzwms9rcmj35xlf3gd7',
                title: 'dioo9u5ireuigprleyc538ju5tu9rybcy5kasu026t6pi3rlp2zkmgjqgou8gbusbbffwx9pljwlwk45w1p0a4e716fgko8t0o4hl4qmgxjpyvwmokpk8h9fifbnty80h09oyi4783thud5z1bphbnulxac35vywpyge7jj4osov8hmny4hyxkko11mk4x8m927cv6nas1g2jlc2mbstigfo7w2fqcsv78fd9xkjj7evspybo5joblyj2ojcetc',
                description: 'Dolorem praesentium minus vero nesciunt id aut eos delectus. Nobis aut libero. Non atque quis voluptatibus ut quis repudiandae non numquam. Occaecati quasi molestiae autem est ut minima ab enim.',
                excerpt: 'Et omnis enim asperiores dignissimos molestiae. Quos omnis eligendi. Explicabo minima soluta sit cum adipisci odit accusantium earum distinctio. Commodi et quo et sint quo voluptatem ratione alias rerum. Et delectus ducimus aut temporibus rerum eligendi debitis non. Tempora aperiam velit qui.',
                name: 'jdbw3id3663alchdovzr8axktmx13fbclppwy181lbakm6ap86xggeqc7qdfofh3wsa7onvy8devpp2zwit0zm1dpssewtnh1q4bug29n8mr687al320qvtkkzhsucwgj4o1ruhswv7ktnpcwib9fmmejnm62uiux9z0mmzqhwczo49hx1rl6xynnhw09jd6d60ehtq6mqx22vtfwotek574ums9o26w558nwqwuabniwp0hldnakyo3s82qvjk',
                pathname: 'g8wdeybie09flcrahao7zmcyc00ub7b565fleocac8kegtv7b7l3d42gn0cxt58t96sizchx36mp1caouf404vf309yr7wuu51izek2onvwd10ntzanh2fzma1ac4opm5vrpocolg1hnqiyinuer7rd2xi8c7een6ehl4y64utcwgiog6a6ejm8oz6ej807lmuw3a8kggw5yilv20sz1czbhluxkdlxl64vuo244mubi9c0un3jdmajlnts2xm0obw1omjvruq89e22l20x9ws9zupji9z8ugoljuwt4trdlq0r6jv4njr89vjf6ygcsy5jktym8dmxmif8l618rpwrbogxliasulb2u7vi5bmmx1zoku019xyxjgebvfrkyo0gst0kgu4zi3vr4356rlt3qqg7qkfzvq4e9i9ddwoi5uzewbhwrdz2cyx0awgdppdbgvt530wwfy1ilfuc4pmbk89kdu8xhwvs6eivsvwu6aavgzy5yxuju30jlfsp6mw19qfcyqp4l0rntyaggx11aak8pwp0j93vu7dc1v28ivea85xrlwdp2b7rlo0kpxbx0an3emuuscta1q015gyaae9y2lzfn3slld3gul90d0jwgopbtu2udssus52le5t5qox9w9ow41j0pd3xya7fs412l898d20g2ql0dz9ojxys9wksqe8rdycazs9pt5gsqhvlu5t6fb655h9htinn0b83pjtkv00desp464ladwjfnfbarq5dvis3zi2igf5k3a74uq31qd10mo2l03p7hdv4eyhg459pfqoevznkjl5w9hs8hf0l10zgz9kwelgq94auj6dphho6j0dqi8ry1t4iuwrrpgsm2hrjr8i316t655kafo63m6qwgs22ksblgtyrlyn06t5j6aucpbj1g7w1drblay2cmevpofev7trueq67ku3povp859p76l3mjbpzagx3u2tecb2d5n0sd6nycz5lhypx0iib1k4sjoier7quzfgdyhpkxcg0s',
                filename: null,
                url: 'auutmjrcos6g9us6lzwp8x736wp02zle43kop4h01dhttqbvhu8541u2b5ajn774xwes89d3tiu4813qznum84u1wh1jyr74tazbwdsyynlwa838gmzzb8uocffv2dl8jx78c3gx3jrgtdzeruezn0kfn6da863ysgwvej1e8y04a3i0gfde408nw6odr0feu9svtl9k3p5i05ctr12n0wn0oqeboqdx1fcmo63f332stq8s9335bbj2yoy5wslxxn11cc4to2hrmuq2lgm12u91sddexv98d0c2ydu298uqoamkcpua4outs6qcfmimwxpg3jrk0xq1szthe2nhuoizs28jwl9bbvktpjzipgk40syga5tm2kdjtyqwyxw974vf8uqfytam7cznne46leezbclmm1l11xq0i1t5mr6u3qde561vupcmnpfk7a4o6wvpzyn2yenk9k9p07jlficr9xp1d0kqeprumuatrflyl7qlmq0bqc5ix3lvfeacpn2iw86fkxluabl60zdh5dvbwxd9r74k6w8oi3evj7c4ga0uiy6bx0se9i57wj1yddhfnqhpqutj2ko6n1sfkcdbgpaaw24opb2v2aqu7g9z3hnqiep47rseqkms673di96dpoqccmo71iyimn1anfszf6dxjzzukjh237fqtzu14sk0gnm6v9qpgco9gestucur4gmp18kwomkhngzefymqzqo4f9ibsxzcn1u8p1ilp4o5b074wqij3dcfdgnlp5bg1rpq5qdmohmr3681j42h02tav2z7yxznxn85f68r0cyb8kid84ny50yci9pm4vglizmt466jjm8nn1gvhxmp4xxi5ysiva6cjghxlxgxg8u1tuajwqv2ju97jiy86tv3ov5270vsbknji96lnddsd6msxuqlle2epvue01kcf38lb4rvf86pz4hbmuelwcr1xq31oqdof5ka3podobkh9ruxrdsb6y8loojnrr329g1vvxdtpboaqrca6low',
                mime: 'nd31mnla3ibpmzjnuvwafhbxrqyu3svp0ctojw8mx52uuiluod',
                extension: 'qgpwsw62ail377by8pxnq456a93i6avm4nwg1wypr6bao4vwv6',
                size: 1769538770,
                width: 294578,
                height: 117590,
                libraryId: 'e24bd8e8-9e15-4910-86bb-ecd59c1ddce6',
                libraryFilename: 'tzp5o9oxa9ir1u0jdlvwjwoxp2yzbeyqd7qrzu6ala3pbnp1kou28cjm9qppnxt3q7ukavxerepybqletr0iig6f1hfrmxt06dvk700s63k9yrwtap8t09ql3zszqpov5a33ax3f8qgdssoiawbzmtc34ow69kvknnsogoh0gg8oste8407frtf0uv7xy17graykrn2anxv03kupochptcwsz58o257jicu7uyjlxqa0ki3jqw957xyx0ucuo84',
                data: {"foo":61874,"bar":"%+HGp<u#]t","bike":"STn;6)xqUN","a":"hr`Exo'mUj","b":37816,"name":"5i,)g@s+{\\","prop":70931},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '59f740de-ae5f-4079-86f1-8a669d49f856',
                attachableModel: '9y2drit11wmph5xsbzjfljc9r0t59p56m2rq6anwirl8cdp211d8v96n1fviejj43n35iv7fayk',
                attachableId: '0a53ddb6-5b9a-4eee-8636-82bf695fb151',
                familyId: '0517bd07-e7f2-42c4-a52a-68e4f6ce18b1',
                sort: 138935,
                alt: 'z4538p1jdhvr0ky3v1lm0r3eb0hphk3mt81ykthzsgqfxbcknlgeyxdcqvvvj655268fqt2ta2ycgm4s6ne4hiq3lfsl3d236kc4af3qoagqhig9gtaqulkj1652ci9qjxmfrn8uf2sr5w1rno8r8a92xhxrbc96exa0tpx1pxvbyjvqid8lvpnlrcrukl75v4cov1c7b9me9r9kc49nc4ifdm6grwjbbh98u45t0xepppy504rxkfsjx6sqky5',
                title: 'l3e15qjxf5t4u00quwn5io3pv0qopw1696s0jvjcuesb5gdhag4r1hx9g4phpdwooz7tueyibkmkett3fc1dgl9zce2smwzf1t6zv684moe5f3nzdtggrqxzjfped00mngcp45b28w4u4bahztl4k89k5q1nuenog143sxe7kzjib7yn2un1osidc146cy5y0wu2lrvy40fx586yv88tf5hzj2qfgklaq0bg76dmii3l97wtsqluelb08m4q39u',
                description: 'Dolorum possimus at qui magnam quod. Tempore esse eius quas. Dicta debitis provident nobis quis magni eius beatae. Id omnis et laboriosam est enim pariatur nesciunt minus porro. Omnis numquam quasi. Sed nesciunt voluptatibus quidem rerum corporis facere unde.',
                excerpt: 'Dolor harum ut. Praesentium fugit quasi qui. Ipsam inventore autem ducimus quam et odio vitae officiis. Illo ex repellendus. Nihil sequi doloremque quos quaerat similique voluptatibus. Alias dolorem iure voluptatem.',
                name: '1xhh4u4ncl4qgwf3bnvbwpcksnm1j1cjxsvnzrnz8rnz1gpze8nhvqhqn6nw75iaa1a5rjcr4tmpf2c2uivr9enp5g9cp81akgzvqg4u7y79exwl795rnl5ncnb4fc8fkspgrgybg669yy78j95vg6xayx1ppqpkym45ufnu5gtwc2v4vn7rwfoko425k5im5oc5wn7s8y3tx8j23jz78jv2t1kq381v2nx5di6t29wm5jsbyirhviwwclimy4m',
                pathname: 'qmb14cwdyq2xy1yw67pop3fqph7k9g91do3rhxg1gqgo0uuyyexdpdnmnqvepjftem9r022wuuzjtr7ey3zhtcwwmw19k4wrsumqgutd72ylygi2j6xmh29mwfk0vvkxv3g8a87nn49s2gaq77ntcvdrdhwibtfekhn7ecl8w0d9atgafb9twfce2chifa42jpydo6bf4vhm0ixrk4lrmmyeo4q6hgvsay6w4dgecflmb9n2l4t3pnnc8c2ne5zlisej5ilcc96pr893p4wdges2u3dyo7v80ifiatvecd9djk2ohfobdedtz4x9pzgkvmgqjn7t9300pfhjgponu2e9cw4rikbwwpkua4v3t8s7glhcgc9qx14eemhy2g83fdqur215uxr9ju1cu86w89cs9hoz88dk51y0kelf4vgsqylf4pn28rgko9cqku2t15uk3nrhbz72na2ex8jcj3a3p22gcqfo3ulu1j95opaf62c54xd86vo7yv32e8gf71drzywdwxvpuiqsli8prlutrhlnah6oyby2k8f3z4a1sl866xjj3yxm6szwsic1mzjpd3dgfwcy937ft1stfv2ic0wnwhvvwpibprvp0rhr5nle89sg1w99llkurja4637lwjd2lvdakfcyvlnjnplfmvt6psbyh5g5ut4haarbbd47cgy716nzrnnvkajv8wykv8wvwf6upjqrn2v92grxbaq75giuen6g5aedouwg48tk4mm23qs71qozmtq03mtoe62xxr08cdymgrm460t1ywdf48j9om02jg43nv13n0e7aunujjhhvbgcxu6vxqp0mgg1kpoozyy062c0mouf5p3vjm6z1l1m91zuurp8cmtp883yqcj8ulltm2ohx4oos5hmu7vkbgap2kalyu8v9dn8k4fpk5j116x1aem4vc9ednpyb5nvh82n8v023kyqp8wvxwf8o55nmmbk7ypqkdcjidrp1n8n79ay32lzn1recoww47noevtqik0r',
                filename: '7qwe535wqa8ez9xapzlldl671mhthbrnm7y0gu6jqe9yhpfyab68e5tvfu5mco24tzt5wxpxtgq11mp5qxuwsic5xx1638yz57tzs9ovmrrcokl98jzwzpaf2ztf0e4uy4j5foa6wrl6t60lnnwwubv7bbuv98bphihccuyestn3ge8axbz4rohp5ivccna4hb0mowwafk0ih2tdyq3bmg6cn0gdjnjjoc9el6r6btojojuojbzvk017xnn3c06',
                url: null,
                mime: 'fns8hgvp8iezynvqyhrrsrogcyp1j9eu0em4v5huf6crzcdvxt',
                extension: 'ov39xsbeojhse3zirxr0409b0svryp9w15ilu6l0lbmq3te3uf',
                size: 6193763678,
                width: 577150,
                height: 994418,
                libraryId: '566d22a5-d650-405f-a61f-ae4ea483ea9b',
                libraryFilename: 'vfzx8z4dcmx70vc79mwqb4l6wnh58lth7ckfl4hluewb2wu142hhozely345qkl7y6r9ocg83zuj6hwkqkhn3s65fkfg5hfob0emb3y4k5wvdves8ke7ldamykko8a8nlyks7v2i9vpa1ltux4g3xy22g92d6q2iz6rvyirol8kqjm59au56vfltftopv1d8e2waxr72jb9oc1y0p5vezyekkhdjhx3nfdkz8d098k2615l0843874trki9h07e',
                data: {"foo":76178,"bar":82321,"bike":"&*c;_lHmUG","a":"a\\1g3&-T[P","b":9216,"name":29035,"prop":82432},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '894ddf33-7bce-443b-9650-e196b10e35c4',
                attachableModel: '05gr38x2nbiml83ag73lev1nmkxc5chucorckr5rn5pywv970kkfv1l44bttninvm8ddpborfng',
                attachableId: 'c07680c0-a3e7-4c4d-87fd-bca74241e1f7',
                familyId: 'eea614e2-5b6f-42d6-a86d-1bbd289f703a',
                sort: 572775,
                alt: 'a4tk4yvpqs5vs1sia82kjhybb0zwv5eok43rlm30qmpcgnvlaxmx3nlzwviz1ivjfnkl4u1vu51kqg3z1axt6r5tiawrp5h4fze4sopur25nwczodx14q52gcq1kq0iir7aktl9i6k10f8e9nh03mu58sdw4o9aq2cyk1gsle2sjln9e4pc8coqppapd808h0srjg7gglnnj5shbig11tynu59hpil4sgit6ed59sz80ch5tcq5a404t5wrjjzf',
                title: 's2l6hwngbob5t44mt5qwqsyptqqfuioeteou3gxbba7856xuh687v7o6vbxzenabi7yagrib8rnmupf43ro20ftwio8g1fn16qi93ua72w33rhe9u2qp21140n98k0cb1vdd1fjb482jr1v1ohrlg279gmzdb7kdluledisb4iqb48gkq3wkvxcznxhqx1wl37h8sj44aj5b0zzpzxfnl7b2pcws2sfx0otof1ji4od00i01noiyxq4vys5i2j7',
                description: 'Deleniti qui nostrum qui non nemo nihil. Maxime voluptas aut quis. At alias ipsa numquam laboriosam.',
                excerpt: 'Esse accusamus aliquid optio adipisci sit quisquam at rerum. Eveniet voluptatem ipsam non eum debitis. Nihil autem dolorem voluptate sapiente optio ratione. Autem consequatur quod delectus qui aut quod porro voluptate. Laudantium pariatur harum.',
                name: 'zpfqjfisfluj3x0uodwuj9j2dcqg0trfcc3cfxxtfjykr8uhi137zw4wq9j3bafe2djvxnmovjj7e6kugqcbxo5ri1bwugb3sd4cs80w85f4y8netxyw675nnqttpd87zin4i5v8nfzmr6ozzzihr3seh9jz5791b7b2r32c0oaaioyuv9s4vusek9jhwtdm5epvaujk2a3wyrct2nf8ml8nbllbkuulpryo51njohhxaeb3h5w09ub2k30haj1',
                pathname: '3ket90emcdonbojbzv4ovszh6kxsdiofcgusbniec78ht29ooosjjqnlhf7s0yvvzbzc4mqe4fzjiyzb9tuk30xcfznqzem2abxk3xpb780ubdp6pj1psz7s6quv8w9wkmm8tpq20mhgtxy77xrhecd9xf4200rzqw2txodyqcwbmbg79beak4zfr2ubj9wlg7p3kcrmh89qesxbznjczsh6p2l6ze5xaiwxdounlfey3kzu9cz0pmf1umqj81n5u24jn12g5poxfzq3eo0t69qaq4tya1aowlj93u4bkfhfqn5e2hlvwz2th12doa69nzfphm8r9fvgqpklh0jfsd91ah8re5cnu15gqts5fmq1dpywo6nhid9ro0oo1uyqmbrd0xm1ma2jpwm99drb4d2bo40ahupr2ys10e645z4p8bwwinilc2m84kkx8wxf6q78rd133h26noybfez9elh18eyt5govsm69eqozxmyzoo1dsznnu4pjktrfsqtb6q3nqtdlk2xu2ten17fq9c5g5qgkl66kerxjufgi2zcdije7k3fv74rxwtrln960chj25b75grdl4yqkefcje2mtx9gq1wis4n4dyclqupfmug8h42ah58z5daddjv9bs9nu2l4arsibepjd7llnoh627lq0zp584zas1nf29y651qf2o0lf4xy435k5nvrkyvptuvm8w9ba2xy0ny8pj2d54yp54veiuo50jpgsuuh817wge9cx5f56s6m3cwlap581dhw9vqk9r08vdu4reydbkyia6qsp6u94iduvkb1jzgup0mpsneebvpdspe7mkzu9z336rv875kter438tpx0jcqzx55s7ihu98l19ccs1kw4250o61b16p38yu50chrk0afrdq8dt0cbosr9fhajfcxonnt8sc96s6bax72hmq5bbmpjhd6vhwgnjxcqxp1d25sse6sm0b0c9e73w5p7z69s5pbj3fia5icy292sks8c9enb3xq2331yj4s8',
                filename: 'hvkp4t5tkylwsm94x0z8vcm63t7uj06eohs42rpl0rsp1aw98ziq69b7xdjls2c652o6zf3ljanfq6fog1roerqw69ssd039vfjec3wwcwplutus40uo3m37qbrshwsbbkw6jcghnau41fvvzyp0xyntn82p7d2rct1kg73sl2ymisiy7tapz90u0ornsh41irufkwj9msjzzp2j8j259pq2bsc9zoapdqocbwv6eychnkv8z8jjc52dw3xiu3l',
                url: '6lxczfve79omfxp4xoqtkgpqzgf99v7pdhyoxoakbbpd5d2m930m2bw68se8v7mrh38lze44lcczlijng7ny21rj0zu37yyq1cc0te9exffu3wiwgrg2egepm37l3v5rupgnbhv716qa4b6hye91kxapqjcphbd3xa4jt5kb8jx793y5geascpb68blo662nonm7b9pq9mboa4fazfbbisu7adibjqj07hwdonp9egeayjbguqaseyhbe9zqzsnm9qhh79qku0t178gp0jwqabitmcv71s6xhi7p38paw5no1y1u2eg5b05ihwtthgsm43e8h117vst70avs0sqj9qgogscn4uqjklbxp0j4mq0e37ifklidop21lc7g8e5vy46rtax2vuq25e4ljebb93adc0x7wmtb8d7ozrqkog3mt53cpzqc0692sr2z890r2kifkdqa33c8gsddkfyssrmt5927bf7wl9bpxbt04bkfvpzsfvn0j6aeyenksulfedag8nt03czv1cdtjlrrb2xuamfesfovipym2o6rcii7b11t9cxppktdlujo1kwb85x6x9j3jj6lmfs3btwnfcawdgp90wv96czoltm8il56m9uaauz4h3b5arxcdsp6k2x6bt11w5t5i3ar5lxjxuvq9hnef7u0ja9f8ydxn404ep0gdulsbz8rfcvl49cmtk6d7jtbsx33n0q53cptz1e9ip2quw5fb40cw3ui9fqhd2pd3ukxh54gbo2j3918vcv3mvfjoy04p4wv308cjr4zi17j7t1394189alyb7cj67bkh7fhdabg1e1z5kn9xk0rhw7wv5g4ihzj87kwjwecaf214s1jcpxs0cfyc3jud4d6egsk7ifzf6fmbrrmn9oy5ool519xltycku47rhi17u80ps3q5kwk0rlcdsxv539zaflw8oapuvg1gpavbv6zbv9vsy4zkh0o0xpd0v651zsz26mj0bk8eqts3kz319hs5r5kgouamx8emo2o',
                mime: null,
                extension: 'mb35nkbn5ugo64ii3kxgo8465zp4cyes3gkc1gzo10lam6svti',
                size: 8876751583,
                width: 941936,
                height: 400682,
                libraryId: '0291b16f-e266-4e3d-b895-6ffcc76f6444',
                libraryFilename: '4msokb6um9jva2vfraf21tixrsi9uml8rpikaymccl0o9c9a8ncv146ja4kaqtihbps2ul8n188qlxppsm4jqrlzr5ve1xobfqd3z5td8i1n54cblb980l58p3qpnmpos0dhivqzy14ia9x5unm7tzuy1f3iwh8rrwcttqdrpdohtg9r36dblt7clhi8xge8arv222f4mapw6x1s375qta4e60046ujg7ivzkyyr8s6kjudkgrgz7v1n9gu95vn',
                data: {"foo":"Pb2O]u&-!#","bar":"BQD.bKHQW!","bike":"n9)).:'c_:","a":31693,"b":33058,"name":92139,"prop":")Jpqqe<{pj"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '771cb702-1083-420e-91e5-70e16e53c3b0',
                attachableModel: 'qirmwkgbop7o34tz0a0v07bmwv0qr8knr808conn2kjrb5uw6xt45ic3di59pt6f74khqwcmp8m',
                attachableId: '9b05de75-d435-41d9-8c5f-17d54a9ad270',
                familyId: '4d085543-25c4-487e-9d11-6d58f0109c2c',
                sort: 473877,
                alt: 't4zey8642rm3sh9c7dj9t540v0gp19vpnslgp7x2uez7a0sdrz163wgshmnsv1hsvs3gow20kjo5igx5pu8pq6xezpngubcvu1bfa86fvk9va5eb1chzcokepfouu80y9jmqmk1ctsnt0mzzfe1e8o2fwfmadqx44vjqlcl2k04rs6gwj2wjlwbhju5e6c7409uls64kpwerdq46kbt9pi7kzn2e5c8ijqz7z77gdpikg25c1c3m4ml7fclcqv9',
                title: 'imah13qlb4jzsbguoidiii4nrzkdi73da26xo8oj4i3xobrz2bkpb50ebymvph5a2302m6533sy8mmf0fkm3okl58efr3coc1pfg7clznplg37ge37s4jzqe14ag3mex1cww557sl2ffa3r9joo6pgge42xcc0hw0zebiagrzzm29js544a7tespdo4wgoe5itt7qdgzoxtzl94uh7zai5vrza3b85ut5hnfcer0ufy7oz7f9cy99xuc69l0zrs',
                description: 'Enim ab minus laboriosam dolor labore. Dignissimos dolor adipisci facilis voluptatum earum repudiandae ratione ut. Molestiae sint vero labore. Quod aliquid dolor pariatur neque et et eligendi.',
                excerpt: 'Debitis et quis. Quam dolorem suscipit et. Sed beatae mollitia neque veritatis. Cumque dolorem officia quos blanditiis ut dolor recusandae laudantium.',
                name: 'oy9xfi3b30bi4q86cxerghk391vpi85px1263gokfqvid3ys3m4uym5k28yoisox09v6cu6xy3kaapj0rstioyddhqip5i9vft8i0ygoyriz10wm3da1xic0i6u34dibi9uo6d1fpuv9lt3hariawyki2wd6uas0dz01iik1w1fowilrb66n2m3xg3ou4al29ulw8routa247c92ala96nzt1i5l1vuh2w6hp8btkkcljom8b7o7atb0oj4tk3n',
                pathname: '9ehtr2c86mr8fsp69w7eu44xt70kvn0qu1ql78t2jzmunkyx1apeoedzlmtw0utz2a4kv1nxxx9mkfr2z6z6vqg0033724h5uw9n94irjbbxrpwzdwo16dzwahif8oo67dk665rid7k0hkz8f2xd8hq1cjefvom7qwp11zn2u4s9iylpvitllqr2rrwccetniqhv4a9fh5atwppblxj7p4mlcaw5xwrwsj3szo0im35kqqclaw2wr2ytpiiuhjy1kql84va35tyusaxzv8k49mszm860blw9w9swrng24tlvdggd1w4nkpi1ckx19wvmcd4piyqy6uhmislb5b06uyhwcpkihp2z59cv1ru9xon7v5cerd0c2yrfn2hxrw1wng10756qpikgrvi67ckz0k38fasaiuxox9w8yg6dt18x1n1sj7l7zcd2tog0a72l1jd3iz2rocob0h2c3zjnsockwtsrkjexsvu2xqpok26k75smwpflno61xwwmapa1atswqipm1w2uqj3gqsrpk1dayauqnw9dxiq7lmjc8c8je9qpnmwp6gaj5rvkwtsnhtb67wveugitm3bd3eh72qterezldge5ehgnxkmsraydftmmqqa5ylljn86f9zdr3n4dvpc7dclrqcgg3jax4uceh195zpo9zrom2uozpmbpty7a2ukj3enw8oumae0r3v1wgkdxul3fj18unflad0g2az3le5tv9cve6e8woike4a054vpyyhmu5lf1hlpz2drq9m2x6u760o4bxkn4vr2crra2wozzckjx6jurjt2l0j7iv4ptee8h7hcbi6lm2xtbu7l8vse03d0pfrwwlpwud3js4qjzurrae8xwcvnr7uy67t02x39pf541unv1zgy9h9x5bvkqawwfbnh39svlq0r0su6ecrswg2hx6kyuw44g3t8248dtwzruhqwjpx03bxhsavn7tymvsdt5j7qiuqr0k6o8ltqlbc0jeqa9ubmgpoef9oxea2axwruu',
                filename: 'vy45xjoaxnanay3h0nw5lg3wh88bbcgnyse4hfewwl0y4mpd8ptndzv4cn2vrhtlbgbo2jw99wgseeh8bgsejq3fd1kr9gzx5jywkv5i4bo14ycxq6fkqwfgkh343u00vn24qu43zp0b43yin44chwmvq7r3c9k1i4tm7vq3vbpp87itu45m4vfx47ngvdagn0zyue7uxzxfanmwi7k0ndeu8amvt7c9e4jcl7rhcdhkakgy1a8kfp0y1ctujqj',
                url: '77zmkizyqqrp5ovtpghv27zpyqow3tjufmlfw44s3iusc0cyfdmu5l0rjo9o2raz6fbwubulcx62g5zir2w64e21ouodeyo2pz8h999rb5ebzb4d772quy8iu49l8xs8v5rtduqay7g7j4wioo5zt3e2vebimoffs0ywxxkajn3idh7a86o9z3yg149etvibpe9b0ytvh8ebh7eiljiswigu6kyvcpydsfctd4w74e6934703t86ywrjfq7lma56ch3xq6v8ecbg03t5iimik4ppagg7nvc0nc28s8wsvrro00zmrcp8j71f3m6mnmz6g0d6x1vhdshp9cbixm4u5y2h6jhxf0cz481niasqip8qat31acixy28yoi65h5wn2wlv121sbmme7pao7soasih5zmpzieu4qqdvbx2fo5iwnujkynyy9ud2a2nfk57kx81uadu84azflirczvabmtifkqeypvbayr41nqgcclkzxet459j7vuuob3rrbd7eh262wi6umwe451hth6t497d0oeg25r1185zv2ju26d4duf2w0cjtcuqbetr8te5llplis0rz0lfxb2lparp6vynephhdzklxg7otcmswmlkzxe9o6vj005ke57yae0j6vn6oalb14z5uclnwbv8ypzif3r3lp92asml52oub3aytjbyr5errojjrcqkw55f63qjgrdbq8zdxzk8g887wm5ftt63k0rqed9lq9rxai69aeng08ja03xep943kozhtw3j5fifjl63t1d5k0oefw63u2vpc2cw29ge25cdox9qa7pa1oeowf9tvzqbzwpn1az1qrzoxtxh9kvcij4vfzt9b0nvpv6wjh0n4x6d6ifgmsdlbcb31v5znnyfuffid0bqh0iazlr8fli9o4333f53b3k0qj01azul1s3l50nmjnsx0ho9b86f6lmza58sp28nmbrz0hys7rd2fgi1iiitc2fpbz8bv1u9gwtge09eabjeg3jeag0mpzsibrxtm',
                mime: '6bkcv9zalvkk3k505eg0scdcclwvu8lurcvn2aj2xr6ewpvql8',
                extension: 'je4i901ia1takvxbo5pa77cr0z77vsn55ezzu873vb2qergxjo',
                size: null,
                width: 271361,
                height: 243616,
                libraryId: 'b6c8b565-c12c-4eba-a756-c3d9f032f757',
                libraryFilename: 'pfj0j4foh2v95sjsgilu1qvr18l57mqsvx8jjos4dqu14vj7rvll16s8208py6js8hc79m4fggccj5m07akruvt8nqgdt3k7cqs470f2hy1ibp78c3a21mfhxs40fpos11ccflfvf6xgqwfbft9s12p86tjiewif4mfecnmzyuh0irlislug15vepvf9skqpbo2xratkmkusqgad5t6549gd8xjk8n2tgual3bitxp97l92oda8viidlbj9qsrf',
                data: {"foo":44762,"bar":49740,"bike":"tur_Do80&\\","a":"&TFtc\"4{wP","b":24006,"name":"|+,s;K[iM4","prop":40766},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                attachableModel: '3tb0311htuvuuk4qhhe7c02blccgb0dtns5iils7fhci5jzjhk2v8c8j2tn11a094f213org940',
                attachableId: 'f99e9a62-6ef1-4718-ada2-2f1cc1a1256a',
                familyId: '38a5813e-fc16-4adf-8337-d6c06058ef35',
                sort: 626785,
                alt: '77ok15kk95lu3nm5y8c092o58z6q82vgn5mw5v5vgkn0j0dw4l7jlcm0wmwb9c9b4544vmpmsutzxpybn2iggpb9y87nlj7nm2uove4z8q5oqpi72bsfkv1nl039xugclaj08jo4sybul71t6g992j109zh98pcd2xe82y50v729e15fm4ifulkth6wn5nxpxbzzrmhmimnmujdib9d60p5emjj85j16dmiix8jm4g8vckszee0p2pux1khwoos',
                title: 'g9ve619ba0za6c56qe77jrsx96xt1kelrneiiszbyqylimlwpn3fd25hg4jx013ziojamigwmo8bc6b5u2w3wb2dukexcu768acas2jy5yd0wxvpausc7o4cg32gdpgny8bsvl52cnxnfgdu4hhjumq61373a50yvwjivgbvgrd64yv08422k14x9phf1l86jjqr5h41jgzxpl37u05reu108cxar9olhbwn5eem2a97dphpy859hqhifg009k6',
                description: 'Dicta et suscipit nemo. Sed modi aut blanditiis pariatur. Dolor hic dolor corrupti cumque aut quibusdam et. Nihil voluptas laboriosam occaecati corrupti adipisci accusamus. Corporis a dicta excepturi esse doloremque corrupti.',
                excerpt: 'Esse qui inventore est aliquid molestias unde quia. Ad nisi consequatur omnis et sit quod. Id et sit.',
                name: '9pzio0p28fctp05vwnle5075opvy25bpqsyltfpip06mcoyoe8luazaec2mu7ruggzao3nuprvowa5y6t8w70by6x8shi4lqo53sn30wwdaawpnqyurf79vxctikzwdf402whavye1i8pat32hrj7p3u216iom26h4801sxvj0ga8a5bx32zwe5g3te8ki0c2s02m115tfnklvzwvwzu3ru0zgc7ptcmjavb9tjy845saps5ztzr63s1ige8v0x',
                pathname: '03qri2iaybt3e7u5wqxm6vuhjlc5i9taie2k9r2aa3jronafkhoujwegaqcmiwn7184q2xrh65scec384vs3t0so7nltfg28j3lhj4vvz0duc20h25l2w4g48lh1a45349hfspvq31i6n0lv8kpc1cjazhktv8tnaagku4miapnwa0no6w7ehd2sw0ykopjw174t8unb6jgkk6yjphn6e8adfz28i1lz48lk96jjyn7qw4s8dqta72w0h7iys92s6a0zir54f981c6mp2upnr8fisgsffunorgbdf63ov81ybonlefxwy95exo8yprv7vzakd2tslmlwi7a5denrm8fc3x15invb3gg6y1lknymoc88a7vf4gmgcojy67phj0p35whv6ivpm4eni84q2w2wu1vjj8gd7x4lsls0gdxs2v8raae3y7nelz6ve38j5d1z9id8dng9c0549wegvmxk6yq14qhb30ov60dhytjs9kxbz6podke9484gg8eu3sgckhhfwa7xpivakn7iykjutqsa0q1kh9sm9abtov3x5dteikucern6kw9huam699el2zak3o5ip0jt25ls19e7nip45det9ntgthx458awhbw38brpbssohj4ouy3h7nppqebc2r50ekpf8ui38k3naeve5g9muu6q01n3xhxhccpimcdzenpjcxt1flqkyp6nul05z22q6xrs26zg4gw5hwpxbqmhljqb9zfg22vpj08kuix9pmjf3dqad32qvvfnow4kl5a0ulupgfnwvbil9e030zoa4wj1v3wu36lg7pq98wa0s1mb1c88aitf07ash9og6mjnrd7hrh2imqh2t2b0koutrnrqjfao2tkmp5h6ulcas59creahw1b50kcflko7pwbytlsnelwnzj06zrv3j0cj0ce1nkox7coz1z3my0i1h5ltxdhrze1r4lxxnwb7uiaki3zgng53lqgwvstlerdu9g9qn7765k1uvmr0hnbsdi8vv0xj7pg9o',
                filename: 'ulnxiydo2scx811wq1fd2wjof3k9rsgtjouxkcjcidosa6yp9eqlnesstcnceqixl73uadn03gc7bm6bd1nx2wwvaax4arcwy6351bcnh3s1a8ib7t90xscwv3v7n3df57cuv3n212hublo0pu2xz6qa8vd8bi5pjwmwv5qyf31f15s07ls44xqif4p6unfrzstne6wub0kxq9yl0a9xbu849jseairofhlv5sactytcpmz29hubrqd4rrcdacp',
                url: 'scu3spavzlomswbv6rukfs55p0fiwu2fc4weeb6maoxcedqprcjvq0xznjw6upat9ag8ozh0opkiz637v10nx1fi5mgxw0zsy56fsmpmueb346n5e4f7lh6uwyqgkho1wv0zadv7ygvpm7r903injm66bpf79i2z7fsj4cknryb96a5689kdn5qb6dksqs0jsrldtby7yhmjrrk2fd3qcsce41xs1xrsbeo4s1ss65wt5jnosdhmhhjj461civw6e64e1yrgmytw2fbq7gayhwhe0cl31cvtyuxxq68pua2i3ll2fc6xwwxwbs133ntcj9fv20t4o000syeidwtnwdmpcmb9jkda7jslt493g12kgzt7yk4769fqt62j4fy73wl23ksh3nb36idsnafgfmag0ui9x5mhl33at5jwhjsce58i1brtucykx8r1i3lecce6fwn4k2td4wazsxni3le5ovd6hj9amfiyt55wajtmyce9l41blq360ik2w60q9kkhucpcilj7nb1gtsazus68i6gs2heb32hthhtcbkqvuoiliigvs0qr9bpcc9iow8rg311x8d8eo0231nrqvzx5uj5b6hkp4tmt7uxbo8xydacfl2lkhio9ophdzf44g1d2ihlijov2i06pajnkol8antby48ohsju9x9qa333vniwp6nu3bj0t59z48a2tp8w6v091jtmp74f2kcf5ym26tr6qb05b41htgq2ehuuihuj3jrwb67t383vv9myrgrwp8h92rep30kbcp20ipmlzw5l4ei6lf5csyrf9int7hf7ctad7ip17jva6dj0qt1tqifnveah8h4j5i1gscdkwx3zr7k0hmmb72circepyhqusv9nfdkehzbmt8zb35zatn0z92fwr8jx8ym6xj5zir4rvpuw3amtxy26ibzlwey8re4z366adyxd3ukkpk78zgw1scavq5g5kzm8vrjqb4v3zb942yxaqcidw5s6dhsj9wueytml8jmof7enf',
                mime: '3pgmxiy05v6c8gn66ncfm1u70plgsbc0w2n82xq9kunpkp5xkr',
                extension: '91kuj6dbnwe7h93tex6o4std1lrzfixfxqma7k3au2m47w6v8h',
                size: 3155162991,
                width: 798521,
                height: 553859,
                libraryId: '5b5c2d16-9ace-49b5-b1d0-6730812f274a',
                libraryFilename: 'w77wpaoebynesbkn7fx92ob69ny08jig7380c8nfqwqee0dp98cozh6iod0gn5x1dcpg75x8l963oisczbmxh537hpbtkphqaheqyp5f640fa1stolmfmrzrwfdkjrz0x78on1ygiwr5shvu1ncsqklo0ar4pc8zlrwf04a97mryeab43qg6lvcgsqvmsizcecq7q5zyhixhyd6gcu9wf9gnf7o9gp84aeu7p4veoiih2hrvrz6ozk2tnaycxg2',
                data: {"foo":"3\\fQ![`Sg=","bar":"j\"C;dM\\WKS","bike":16454,"a":10474,"b":"593RH|uX(d","name":79418,"prop":12907},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'df8bf374-16d7-44de-b93f-03b095b336aa',
                attachableId: 'd0de75d2-fd24-417d-a12a-9234e247f5e3',
                familyId: '90fcc6d8-9a4d-48c8-93f2-5c50a7254258',
                sort: 839359,
                alt: '8hkcdjog4ab1wxkp3nxg6n5j1c99xgzy079kx2zvg4wfalibwns6tn5yt762tt3x5hbej8tnx51rb4q9n1kx6eyvsottdhkego45rj2hc3tp5cvpym1uocli0g040jsheaqaast6s8oeo1559vile4oa2kjjag9fsh8ammlq8eix2xiznvei2xbmm7jppgpl7mnr4wveog25x26ej8ce8iefzpvcqwr9inm1rrjn2wc6q4dcp54248fumnoxiva',
                title: '0wd7i4gyhdsk70j8eni7pdi2w7s4oujfvkww6vcub132x807tazmof03cwkiz98r90v2ylux5ct9im711xg6rg8sjy3upuvjdw4i2ya4p13hi95bi7549pf1yi4o1kkwbg9ydb71j5ca6mr6rgrcjgfdq4y18j63z7aws628ggoaz5ewkgiwnsqk2ig1xz0x8seoo492ifflz58din02hb4imtasoytq4lte3kuwbjtgrbof5ml72665eax9hms',
                description: 'Eius ex praesentium natus velit quae rerum et. Quasi qui et aperiam. In porro esse nesciunt animi. Veniam officiis velit voluptatem voluptatem. Et eaque laudantium earum illum non. Consequuntur delectus quasi.',
                excerpt: 'At qui temporibus ea. Pariatur est esse neque repudiandae nam quia voluptas eaque et. Delectus minima sequi fugit consequatur. Recusandae ea quidem omnis facilis ratione autem unde.',
                name: 'jom0agfykqne11eyteb4jcft5xvp30ljjziw5xkpu8y75jtmk2itp0zmre6t9ypk6805pm9x6xry1egge8xdv9yt7l2toovscqpj2kdes16q75pn54zzy7u9wivuhy780ade99x9g31da5i71l3930vnkv9npfx12lpe5eg6xg4g4w58eebqdnymaz9dnp0bxrjni2tsmul6q4igxh1uut1rwoqe4i08dd6k68bwqqhfz74yrnm3djaplu2nrnq',
                pathname: '3reoqvavb4n6okckm2qq3apkgg009q5mbd3t6wix2tfjgk4m0qqy9nwm56d2v48a1nmndgjkcmhyeza3yhhqjsydvwiu4ehp4l28i4fn1xlnffvtz2ech4oambwkafs004pdygmvw6gfjd3dxok8ng52ib34nl1icz933bgfxvij2mu2bz058ix6cyqy4gggxetniyoys6qoo55misqz02dx9fe3a2ritksyu9ld02ezfd9vpdq7cff45ntin9vtyen8tnn4swv59i9bt0azke1icnest9aco6wyih3p7y77kdfywgjmtt5ftq9xyqfz1sqa9m9sp2rlcdwg6he6i1s8tzkylxun0b90phz4ycmy30zkf52wjndz94uaa2nokbtwie7qdkhr7x621a8v3671gu70cr1iq7rrb1225b2uzlhwpan8g6w3ad2huqvo5kl2z2in5qyirnrrbzh8s1eq38j3jsop55q3moz9vqdq7qz0lqnj0s4bkos07dhymbfv9kb0o4242vl6v4qsim247un4w8ewl7ddfbzpu9dr0ptkrpbhvmlmz3j956b8crsbn87mrsem7quw6kh1yt5fl4du0qt9twqt16ul450l9xv317xsv12u11mnzfg22xhwlqso0q4j4mnzibqby23xfd262thh3gskhg2sodw67mayo5jabor74nqf54wzs79nr7ez6oh66jw8rfgdz1lgaxuhwl33fvsp39a96zjtqg8qzy9jv6ad0fw4sgao3utv9ks2fqeapu84xbgkpyg43bxc6jjch3xzzjgvwibcg1av9z6yp967elw98d0a210qo9cict0xhnndhlguhqntpm9uzcq1cmz1ikfd24ozoxzu8ao153cfdfkg9zobdkn3nqyvkiih8u5lunrik2xk8zdizagya0r73taavk9f24tu4oizwc1fl2ocrca6je4pfhs55lyj2g9crxqbsg739900albe3jkbt2q1cj972s8rjwujznwpcgp45jnq',
                filename: 'k4eul56ur8jft510bpt06waep60a55a6u022romqvzzc6zhbl21lyfa4g8fb2d4n8w4f6ro20hyqehjuftle0nx1r8v1akv247kytlsl0f3hvn5iu3wb87e7kigq9s9pa13rprwm98ejq5wph52wd4whs5fc4as7ay0baqyb5bfmczi6izbppm9y4z0mxgs4zdk5dqcn36ins6myrkoyf092uegf8zc11puxx6diqd614ij63sa3qlj4f21rzow',
                url: 'zm3jxvpdigow1ciplnqnrkooenhd9xj8dj6e2uf38m55o713gb3u0g2xdzvwkvi9jys87m0goyl1qnzcp3vd1rbgptp9piw79ui8jlxe97v64zwafc674s28smz56x0a6lj0nepn1qlxi9e306cbsracf41g45tj0jshmb9xnieb4499ib9id3t53f32nguqbsjyysj07fxw3svi2vgvbr1ojqet8vtf1ufiv47vc8ro5qo67ca7kwnxzxn5bzbxtqvkwbm4lb3uhubad8069tae68bb1t8pp4tnt7x4nvlhc56mxlnilo2lncymewx8e66xb15vty2go9qoiizk1yviabx9ph53zfou8wwpc4yp7v150s7igvyb71a0xwmcaix0wgcmbkvz2lho442l8kquy1s19dnnqa9kl9iianwbdifh29l0jlkhf1tnys9ro1dvpldb98a9o4mv6m23k72lt06oaof1avzyiastifhtef21lhohv4lhf0c33vxz4sn1eli7hvll6czoeziugvp1j34ot5e907ixsfd5uzmtodaajovmda70jcmux1s0ybtulyjftytzc4ed6mmr0ywr8rjkl7gfidqidczimgsbsh4p824qjhbopqeu4h3bwd82w7vl95y8xndtnnpql8blvhm7p9o2wb41z7s6qapf77j44l8g1iirj3mtyqb5zw94mc3y96a65udcjr6b36dx4raf3jo96rnus7p8ojbje5yrtwtwalrlk40k8jzg234wpoqyk05c4lgzmyf8gmqz0c6nu86e12lo573nu8chomworuo2l6wh4rj5htc8jydgvcv401nyirzwdu3z753z431bd7zr7lnj206c77jj832oxgh74gizejsqsulv375d33h9w90cdguqcv8wk9rtqrenlq2mujrqktvw81xxf7smsjfwnndk2ybmjo9174pyup0xct94nau7bte52i9nlzyxa60pgjy4dit7b1gl7i5w1bga5jpj7rjp63wp',
                mime: '6ajrr9t1hyzc3y0dx1msk6htbrrhy0emrcw81ds9xcofyt7kjl',
                extension: 'icqxtpmykrf5ke6dl07ig5dy9b28j4vwg4e7vvn8vbp946y4rw',
                size: 5541037607,
                width: 797916,
                height: 547530,
                libraryId: '6d57b369-5aee-4ba4-911e-96cdf40d7792',
                libraryFilename: 'yblkn74z5nqzzwvsw4d99cqqgj4rq1r76nf1omjo7zb1n3q8rornj02cf9tifd1kw2vqx5lhhmk9torsno58fq3g59fbyjivpmk1rovjowcbaj137hsz0vhjo9rq1bbpjdkdy64gb0rqpkqfnutz8ngfmwnz547oildmmfchwy6ougd5j5wi4qlnhhj8y1nnxixy7zwb98yz6ht2voxv35u4hmnl7qhxzxjgdm02izp77qdjshxpd21qmvwi9cy',
                data: {"foo":"Dm)7e{z7hc","bar":"vzF<C13$f-","bike":"Z#=yKohJd<","a":"b:l9)aD@kA","b":49399,"name":66313,"prop":">N8m+d@}Z?"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cb07a715-896f-460b-bc7b-7644d72e74f0',
                attachableModel: '4hlthieei61alpsn9nvgurifha34h3k442cvlg8f1m33km7i6ptu956vrr51oonvnyykw0flq7o',
                familyId: '80763c5b-3986-41dd-a5f5-ca68987d64ca',
                sort: 936770,
                alt: 'g41o69elv95afwicmko8g6gw7v5mbsy5j6yn44w32zcdpznnrkliqhn70uln4xi2qvr51qdg08ylxjate4hf33ko0ijd5qoc3zvd9u91n1gduhjyrud6teqfmj4zfo01qysbaqwde4i8x30m2dyu202yhqs3kreatoy1j09ueai1crux3kfoz9pav9bqp5tp1pecv5t43vgbe9i8b0owp8ywpua80te1wiqgeoo8qi2xihxtcrtk0rrvd5hl2rb',
                title: '2188lnpx66j14dp5ky7d4jt0ss3pvf0ocipepyu8wijrbrjtb3sh5w8ffa0h3jwntqzvzlqv8ldgffq57oviqbsn6h3grddoje4uijje6mtrb0y2qf9j3kqsymm3slwr9qb0s65cfxaw1lylh95bkktcqet60ygwefyays7dwe78ss3c0u9tur1oxp4vov8iyj356p3t4szhks9sqp04zj37r46bcw58h4kxie29tid0mswan6117d9w7atltkm',
                description: 'Odio repellat sed quae quia error mollitia. Officiis rerum aliquid ut quae et possimus blanditiis. Dolorem libero aperiam dicta et suscipit est exercitationem sunt.',
                excerpt: 'Est delectus voluptas. Ipsam quis sed quia et et ratione ea veniam rerum. Doloremque laboriosam dolores repellat fugit ducimus dolor veniam. Et delectus dolorem vero magnam et doloribus tempora.',
                name: 'nwfxryr7kw4ozojqd634igke2wxy821sys8btez2cfnc7u9g502dvoszm0xv2usrxhtnfj502j76v8xlkphxmq0mcrfpp09g6fo9jydlwfsvjg83gaf79c8wh7yrjquv8mblff8kswztje5bev4qh8kili9l5s62phf53h7ergui51lga9m89n1aidq2hr3f5j3e3eumol2qzs8xjyhimg0dxsds5yq1amiha38i0d0wiayahr88rwltghigesq',
                pathname: 'gykrc9vqzogw4z9d865bd16tgandidpzbylpp5pns8fk6z9y09fwui5na1qvhlxvknxfoi9qbxzbgn46wxq5kgjk7e2a2kadkaowxvrmfni9ckvrjrmcr0c8x18lz090v8vvav3f9i27mggye0beodl0fyrbd5csx0lgl1kbyp1vb4tl0pk909phl90yvqmyvd09c8jgal3a96mqlv5e4puxxbhz0csu871vivtgtn2dcmj088yigjljccdu3l45xbzts9r8ddipkxinrrgjwc73vjjro1bz8e5sc601tnlzi17fdsmy2fy1u3hmvp5m0x6kt9td6x5fkg94zdfqcnnrbsfagz8s76ngbi2thv6uf7hz0ztbv64k3lmo0m2keceynslihpjqqaebwmt097p2zzn9src2pp1l9ftow0re4v74jofgb9ahzmkxi3gjc9wnht40brwvoinzylvw0bxcqwrp2152p1r2r4lftgfd453ohgphm8kck16k3sq6uqzsk0am0zcnvlk7baprab32qfo3w5ntiq4gq3h1zns1nhr8u9hzh29gp6h88haimthxb2ssucekuu0c2dmksilgbfhq2wb0qzjzsq0nsbmast0zet51arl6uew1ivdm940tx0h27v3lt0izq76zwnpsx4sx4kb7jelguavi2atv06sn6d7d6ehba3dm36im7tl1fvz9funoptycrh35lhcmbge76vd6vmjku5vsjgrop8jvogpmrr5lshni95866b4j3xjb1annc09ubwjxij73q5g7fgpb1pr9olxptfhatle1cljsewlpkzseyw5nq020qzuw4xq3ccefesr1ylpopp3gsbq5at4x9i8nul4pb0kcrndx2mp1lywtb2uslwotducrp4fc5eh48tp8h2oduwg9y3nmlcsv0biwimt89kzmw82aodgyvpxnqj9xzcsdez70la64r2ekc7nd92tbkoepryk9xri2j0vli43eoy2r9jwpghq8enx6lkd7',
                filename: 'xosyup2s6g2jqdlg4zgl0crc41hpkyeuqwz0whxyfaccsa2v686qtmmcy75yetp5v666g077gxdce4uzvvyfncbt40kt5b9rvvalrh0x2aeil9ikzgi099vllu8orubw1pj572w0tgvmep12ym6l084ueq2mm56nohc547xs76d9pyxh4zsrlkggbk2rf4g9aah8zmwxfrqbb0wb69t96v1jjo3nyznqnbsxjjyrjavk0aziov9glhigd06hggw',
                url: '590cio2idr1pnwrvot3iaqhkeo79ctz9vj0vsccwwu01ohlzc8fcw1ax5jjpbm3vlf8ircmscdtxqpdxq7kqjm8oqjqxisv1xpm5kwp394i3zznhyd0fh9x6wkdlon9ofjeh58s6c6cnwefzsi3fixxpme0n0ljsd5a6fdj6j1lwmw40njsqu3xdke6koko5w736xfl9x8bn9h0qyxgk24a9xpo2ioicdkm3dfwxabyvpxfunelirorp9p72lf1abvyh7tmynhqic5a9v011ss42r50y4ucxomw1id0oo0sz0woql6zurus9eqr6ei2rfuxuubw2i1rt44u7cg952pd1vc5qsrztfeyanh7m0teo56ycmdxo6vvyi1tessdp8fysppe0mthy4b26a0cuj4j3yp58od20kv6kjy4sdjcyr9od11yeduu0z9t4ttt5lvrlassrt9fpmjj6ox08fskvfpwj737amfdfukwmru4kof4en1xse5vqqea1qmkd9mp4n2mjbdktzuq2tj2yisep1reoxa4uyzfijvukf98gvuq0phgnjmkbs3ihwigmc555vfujn4yxajllhktg6jjnk5u9cu80vb40avpavgqfx8dh7tkffhv3famwefz84ubzldrvuq2znx6hk5rxs0nd1qm3azvsl86itsus2aumeet6xz0xmqvko098v0o5th7asvxrctuqgernmcudhdwigh4edbod2pgldtbfd40rs3z0orila22hifm5kt8ab4mgsjw5z3ub1gqelebsjy5pdw73lbd6q1dlrlblzm4o3gps9xociakomucfnbd9lefu7vi3qph6o02mcqcsjcvzeisz2m4cu3fzjiek1n2lk0yydxt76its20cql9f42sjwj161tv7g4ghzn9jsazbi0v1g6pegzuf6df4eaa1y2ebtdqanx4d3yn3odyz0kxiajoll4bdvtkyg092uqrld8859mcqzztb7zglcnr6ehem2je8fjlzuk7l9v2dk',
                mime: 'd83w5def3gz3cj7vd1mg8g166izuo5rxraxzos5i285tekq0fc',
                extension: 'bxysi0lfitana1vw95o8flika0bzp813fp5uf5f5ipfomd948v',
                size: 9454081823,
                width: 129888,
                height: 378515,
                libraryId: '92cf7d0f-60c2-4ac8-a237-70285e4eed68',
                libraryFilename: 'ih36qg2ctxhrai4yw2uva8fnne0mi55r8eqk0rbnoodz479ibijh6be730o9lby9m3obr3nz876iuxouwwd4psqx993yg55o43c0invi625iaj45d53oijj282vs7x3eahkwt0ps73s3bkg5qlr8i49quri22pcv5lgjscz7dc7ak89uutoegyaim2k0qnpp5w2tygwucyqg3qlg8pwb03ousirubk9t6wwcv39667qs2j2ggvzokatcqqua15r',
                data: {"foo":61508,"bar":"i##|o5ZHLu","bike":"N@,Ds7Tq$y","a":"\\CH=^!XK&y","b":32701,"name":"$iV{_&z\\!-","prop":"\"IaDd:h%;."},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b2a01b08-650e-43a3-9f31-536d459e6551',
                attachableModel: 'uphdldpqcprp50ubj39tddijkdz3zgeihagtu00re8nh4auzhr5rsw2r5couoc8dao37b2jez7z',
                attachableId: '2b45befe-868f-43dd-8f42-b8a17d890aa3',
                familyId: '73d27e6f-ab04-49bd-b8ad-a572d6264229',
                sort: 179737,
                alt: '8eupccpmegz8mpngay4b359mf2zmzs8mkquhfnf9psogruthx54ltm74uai90xv9ga73kz7gnsykyoxbb6370ekkbh0fmotnhuh4kwlx6f4ukkxtet9sdn8eiz9msif9ktv636dq3649ueq8rny2ks5ypga6jh4z2i32lrmqvjjyiikeoyfizcyl65rzgquzdmiycxzvap3ec6xq6xuc0biducmpw9al2u4hvkoi407g68zdeu5xulcl2s7gqg4',
                title: 'is28asqwnaxellx7jpumr0x2glxt9iu6fqzvfkcqt8kqu9ge6kdx9asy0o9m6iwzx0vnawaaq5l48lgt5k5niuaz5b2mjioc1fae4j82eyj1c5vdn4cl0eapwq7aw0tluy9b0anlqs0f3kb4mdhkxy07mawvgeh0o7z5f308ibdkp4j4em948wk20ufvim12vnj44kdmadpen47abyuejzbhhcu8gjadhwm8mtevd26i12f6qag90zhknossmx8',
                description: 'Reiciendis suscipit vitae voluptates non ut natus libero esse sunt. Non qui quod dignissimos eaque placeat earum. Et eveniet quo velit vel numquam quis. Vitae voluptas libero ea dolorum molestiae.',
                excerpt: 'Maiores placeat voluptas facere recusandae aperiam itaque. A autem nemo eos eius pariatur facilis velit. Molestiae id fugit vel assumenda perspiciatis qui placeat.',
                pathname: '4hflyfod28c84arcnf4bwz1spcckkphdegk212ppoi1z4hfk5h9b0dwkckfpp29civ83wia50lg1ljmmob0a5qn7a1xrhxagsjifvdzvf41u4uy9830wfixwb22x3fvrphtplkzfct98it4llfh5laa49zstjd3q15wli5kc9jpayi6x0bzap0qwvlfj2mcfoavshqgfdi0ia8x395inkd1a8o8f409osy17xusnm3oyz4g703zv3cjaws429m9n7svw8hpi5fbxa26c71ae7g9ea8z09wmrb4t6skfqg6wrtn7xfw1y6s5mof5f7nkp8he5bwkhov3y3tfu3yqqi4qqemulydz0vmx7dadnz37pbbz5aupgoc26hz729wlkmzpbk9naaoe8l8vgs1nrpk6w14zlk8ls94pvgykfx1dim28vcmjv0nz29ek20gdxaw58hisq3z9n1qqqmnxiyos9ncip57zp0posjkccu64kcjg9qf8mdr2l07ce825l1nuzltkj4lh5cfag0systtacvbrb6v80ye2roa1ucgxmvpffzrxvjx3dw1xkmrs0gf50hhvvkodbnaop772ckfbhr04eturu0ah8b00n4tk07k3r3wx7ny2c8iill11dlajfox9j9432b2h02if9m2xpo3wwxzyvcqlbh6tgdlarf4kdganoqycla5zy2y9gc3duyfme4vw2wfykz6i2wl7xjv83xlv0uizw4y04zb9w7vzrpb4rtq7tbdbiqlibnaf4lklor3l36lttzkd4sj69rhni1uyg0hugphnbmc2i47xfnnuprr0vurb3wexjam56oikbcl7p9ph3kdouw5zwl0xbc59i7o90ex9tzfiz9l4hdiwqd8m4je5dd0f3jhnn852qu20an54c38c556jfvi4pxxfvywzpyz8n15ng0osrs9ti8v6c9q1ib3nqj842768wg6cn6kgazs5uev1odc57duhvsag2no4kpe74abnix49xv7c9og7rzbzx',
                filename: 'soy769x4gsb3hisxi2yijzktajhfcs8ms7z22hvcjp5nq4pki24lhhhy0kf3x6m50autuaf95khm0dnmxjl454kian0nss5nu5uxt5a39wmm8rxeijnqxckoajcjnt0bjf6gykz05j5oy1me2emje2knycaglw36u13gtfnh4t71qha67tfgvmv38xamykoyrj0z3fl9k00kzkzjju4z031ga52sa0bw6awt1rdwi4jbe20bwhurptw8zak831u',
                url: 'zmb9y3a3b70d63sp30788hsee3gl5tefonb2oocbs6rtx48zb3ki85c02bdlm71vdv64wk7gfhbp21jvg03xmfgpysbvzn50gjokqak8rtphplgisnhh9bajq789rypg8zwzv5tsh5yxh3nfzekakw91umaa8cajjyj3hnujvywt7wy9vfp9ad2ds3va35kd8j2e6hglkazk8aw3oekvkl11lt2nmaw426uhdy8k0pvvfkat02owif7dyz5bsfd7y6906dtzz63h108fpws30l2s2d0fr6dvjwa4aw9h7wt1j32w8dwuasguxbgji1ccokbgu1adn8ibzzavvqochpfxg1ino8geuag932k0ghwdjqiiccj8gqxyhyb7l2jabrh8lluvgr4d00am9w4hcfg1nlnt1md63bbluklqu1aizak3x3esyxkwffxdkswb9f32p0hudadozxl68qpk4bik7wc45qgyrb8z8wc06n146r6oaxmbmzbspr42eaorxr5mnhu5ydbst6lw69lgzf7ya1kf1w5yt67vv0rz85kl5ghu68ieokdukcwuwxc1qti5bdzvv4ivuyqa52y9d9afz7748538gjn99v1s1jut5llltoq3jxtjbqkb8clcndpno8pgi022omsjmbqtcpsjhpjj8befcknvd4rfvmkilqb8xwkiqel53whayqswbg47l4dl71znvvzdgsnaf02btg0zkfjzc064pjonkkxanx5mgr8yoq3jvjtarlvpi5vcws5n5m7e41v8c6g411c8awqyyfl4su1voy6abw1dcjkmsqom1o0w0at43tkpmk59v4mm9k3svgko926lw7kcp41t75n93t3lrkzl3rzgm1f1kgo4mtavzrcj36el7y08af8sws1574bvlfl8q8yb9y1s6d3yilfja2ceycztw7b29z4m5vju6nqhlod2iqom43kvm04t9jwtj8f37l50mi7yxjuwqlg7witx7qn14rrksrk1xqd1s2od1k6t',
                mime: 'yx0petkyz4cxa171pt0gqjvy042p3mdal8kyarlr62s7l58kw6',
                extension: 'aji692k2kntnfglvx2z0myxnr0aw5evqs1zu8aumfbxd8b1srk',
                size: 9491416324,
                width: 911100,
                height: 210681,
                libraryId: '2d8008ad-4981-48e7-a66a-6f4316fcbc6a',
                libraryFilename: 'uafp9kvfykhxcsxlwqbgns79c6xhknvt8unzdx1u7dys3x5x13vgyhf3ns2r444berzoxfqfzi6kbknazupstvbzukqgf1eobw2ksemvsdwvzs0idq16ddljx0jb4gaomzdd5luvam69ffqu30no95y33h1wn4w3d66mr3rydpof8dor6iliufk871v2m8v1y9escswdcx6ewxqkdyd30rpaa8gjhneygfo9439pbmzy5s8fas3d17tmzeku0ay',
                data: {"foo":"7]zH&<H'(0","bar":"8FypS|W=QU","bike":"Q>N)#GEN--","a":"-e?b<p<^$H","b":13065,"name":20137,"prop":20883},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '46f50b43-d161-4605-906b-663467f2605c',
                attachableModel: 'mkya3ikep9qwbfl5ebuoe84xxpz5cuikdt10ywdzx68ibdxogqlyz8b9ax5zvs5alqx826zfzzz',
                attachableId: 'e19c2d76-f4e9-41df-b585-1b0a488fc482',
                familyId: '6bcd6766-6a18-4b57-a629-44434c95018b',
                sort: 713379,
                alt: '9oxpwfw8i7d93ddyxh5rlnaof87fo8cnqwnblag7xxfg2m6uz5f6bi33coaruvullbxcibgewl9nifjy3h8p1mh4vndz4siz1th3xoyq2n31jnk53g0imwozyafmh50g9nyq96ptxh95zw865g1uyt1nfazhlnxdz2pfina18okqectnl4iini39p0zngir9pmmanc3nf10scfjoaag7e17qnyr5jtdbpxiy1psk7hiqyg7g2z02cv7ligh52dp',
                title: '0d2xgydiipis2d2n987kfdgikkt5rfvz9xt9vk0bni048x1ivnmvm29hrlvyatxzja5p0vryv4og30jagabajt6u97njcgkq5qvdlthytvqd16nr5chgp82ia15rjklm1bm8i4lewcf1pbondp9qmq71grlvqb5rttymnrasuq25e0meznfavaihkcxlv0pynnyarz8zvowtw9xwdxkdo194ao6qwj6hxn2y3ecc5agmtpaxhwdj1ydh5bm1fn6',
                description: 'Nesciunt excepturi laborum eaque suscipit alias. Beatae dignissimos voluptas odit sunt fuga corporis est. Aut eos est quis. Dolor autem quae asperiores deserunt. Eos cum assumenda voluptas facere atque quos.',
                excerpt: 'Amet dolores numquam non illo totam alias tempore dicta. Laborum saepe quam explicabo. Impedit quos tempora eius voluptate. Ipsa est numquam deleniti quasi perspiciatis autem. Non quis qui ea exercitationem magnam dolorem.',
                name: '8l9topt46albc7dfsp6ew4d0xwykx2o3ikjt9sem7ynu9peyj552qalt3iplp5nt7m7af37c1d27wtzqe1s0boefgcs8h2e4yjsfx8cm910y0co18x1352u7bbzagbaekpnm00m78mzcic2kqe29vffv056q8vol2pau8259xu1401iuslsmaxhvw3al1gzkmap09uohvsd0wanbpfsmpbz5l1t3dv85u1d5tdbu45h2ljz88psst1o91oc2xbc',
                filename: 'cy3cmaed4loql8tf2dhezqqu81rujdn58y0inlpsy4bn9nethyfgp8qjfedzsb37xs4olczuhev1q3e9uiyu2l80rjzp9mxbafxgn1rtsivfhfszrhe88m6iqj8ms2m39vw1pi5rxjmemfyt6e8ej5h1h836m0edeu1tp5tecjvze12deh2nbmayvu0wt14w4pms477q1iol7tdaqu7y1rerwqf0d9g0vn1crfwj4uc3gbqjs0326oymmfmrzt0',
                url: '7f1ja49hk0w4l8dv1ikslaqs6fgfwcqkr6j1xa03qjblsnrqf8q5yli3hu9ml53r8rnqxz2u4lru8qf6zsf7wpbjjnaq9jnp0wyohf1k8ikz1hwykow99zbmm5m6ox1fym2e4nbyqyvjrmgsiebj52nqhxkg2jfb8l35fdzggxklt84twla7xoekugfdvv4pnj9teuhpsgcnugoi3h8zfgubrrf1fjjp1do6oay9p24jc5a7tehmuo7vx0407sd0mfytoq0010zks1q4a6hrho0czid1a944obd9hiz0j8t2r8bv5liefq2y9mxzfzg0lwho95eabvfv6if6nm0dcrn3ssclkrdwwumfw09adxmxzznpsv1xkw8zsq3kqxz3xdg6a32o8v7j0vhtgih6s39xhpneb5kmehyxgyprl7evmkjun1ceq2clwenye22agc66yg867w7gq10rjb13qtvabd6srtkz28l9461qzb3s4uladx8wlrg39otke0fjwn7b1wj70iuxv8k2rfk3i1bdghlh79lly0q5q40ylbmmwb2atj6e0e2mev4lyjddc534pgfnhg9kb8azkvtk9nc4euc4h85z0oh7ghucz557sa1f6f1xuwhxxqv2bead3imefeitr9z8kyfpef69gdr6seorxidvt2ln84f1dojke4eg18v25lvcq81cmiupeandr5oa4uwj2umudj68aqt2dwp2u4eolvsxextvwbxh43gvmsv5xfe2j6dx3u2addqa588lvdfqm83w1hfvjjku2gbndx1l120susnud1y2cu8wi949tz9gjjp5dgf0hqhabzl3xc1psv3tfqtjay4omm316shc0xt3ad5rebybu5xy1s283plnw5v92rxkzkubwskrcjn992yv7uaa91cjx6nkgwaw67mc4lyn1qrun78cbnlfv5i2amxlrqtbt7iv8jezeqfjclyhj91g8589bzhiw4fg4qsxzzhkvuy7m30lza1ooech1aucu10o',
                mime: 'm1qzk5utkdiu49oh4knqlrplladc0e4299cncbg9fvsw3h4h7w',
                extension: 'picfkb3e5hxh4sg0chstq1e2czd9lel69bal4n7bbrnwhyf80v',
                size: 4976436824,
                width: 802370,
                height: 672499,
                libraryId: '4ac4dd0e-0873-40a9-a5b9-4e60abc5c0f9',
                libraryFilename: 'ftoyqtg2zhqls5dlz4sf7h06koo7q5bglj4l1sakmr3vplfr940j6twxyzbf5jawp1k1c9dryt6mqza11hkhztjojm8m4lmx6nzmg6v096ticvm569f9lp0def0k5qkdfyr9wts7ovx9xnrrb030ifq48jp4c1hc4o3pep2v2bjnq4rb13omaa8qx0kbt906tr4a3cf6bf2vaf2bn1iyl0v89h7ad3wahspb1z25qih22cwof7fz9tnwyvkllzl',
                data: {"foo":41751,"bar":61062,"bike":"XComuXw%cn","a":71760,"b":"ez9`]k_dnD","name":27622,"prop":"ocF0g5%]vM"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bde3728c-7612-472d-a435-e99a79b6f8c6',
                attachableModel: 'kntht0lykyluahkc4jvfgoo33sf1s7yjzqxtclfu9qrb6meh5dsndukbcssmm6fcoj2leh35thd',
                attachableId: '7ecbf1bf-a96f-4c60-b024-b86b70abed27',
                familyId: '869dbc5e-14e8-4cc0-a2ab-7d16d6766965',
                sort: 563524,
                alt: 'jonuz3a2a77cyhvax31ce9iama1a1k04sahn5qyhoh6nmzeswadbg1jxhrwhgv2eevozp3j68ekn153lyn1ig9lckitadlbyex5unnlwbog2meye5tzo2x69488hfuraot4ejv2wh2lct56usakieqgbcmmfgymfcsuuqvzp2shi5n6dvedq0t3iu0imvhol4ls5wnvv867xdexyfsp8tf9qpk349bk94q7edpg4wkejtrs02ef8dco3l1943j6',
                title: '95x4nxz0mru7y8ub2y7a1lf0i0fb08isuejw462ds7or6fige7xqbvdkm2us1su6v5a2upma2pkng0bpew484n90j2t77yxk1o59h0hga35vp0h1zyjm99x1q2gien7vkh6wl2px4cpczspjwnw037oo7se1ehpm4873ert15yzc1xrrtuqn8q7m6y37pmt5yy17t6pfbqu2sa9jxenhck2kp9z5odntpvn6utbq946fzex4kb9rkywbhxscspf',
                description: 'Fuga eligendi at explicabo qui velit. Et ipsam molestias enim pariatur commodi. Rerum perspiciatis distinctio.',
                excerpt: 'Corporis aspernatur itaque voluptatem dignissimos sed et. Non nam molestiae laudantium. Fugit repudiandae et laborum perferendis rerum. Hic ea et blanditiis qui id porro sequi est. Voluptatum dolores maxime tenetur dolores ea rerum magni ducimus facilis.',
                name: 'iyc77dcnunt75em7bnrgwozqpjaizzcww8zn8sxbukyc8h5t328zii7ij8mnij40ydl8pvpheu7slbhr9y7m7wz7k6w53hwu1hzisfxea450r35i4zki56o8yxo363fxqg2f90gkav3d0mrs6otuu16217vxlc4m5mi5nklafswmlwult1hbi2arq7bw1xecdqh1oixbj6ooj5bx0m1ktjzyopgz72f3g8ktqngnt1um2firr3j4o3jfw0z098i',
                pathname: 'noi8u4jzcxc1a0y2hi4aagjz6mpjeuh1mhklpo199opwtn42t1520qks3crep09ultbpxlchnnm5ji3s9q60kfsbyvyklsy487ymsy7kgmam9shrmvsq62ytdyi8o86w9fk3wz7u1vhorkv7zzlecd84nbdfxqnvvsna8i79tbom776087hsn0q8jp5bajj5avk1ryxyw0h6ux6t8avjsak83giodsqftfxsyrctf6h5pcszcmp1t2gh7m3ps9lhlmrnkmv0mpb41u770m49pt1q9qy82bjuohcgpbp2ki3dqj2d0h9gfrwt35ton4mzowjta49rt8w5s8qcnisic5f9i9jn598rmd04guurmpekoej7d7rjxptdo3mjai07s7shfy5mrk5oej54mh6bvmwspkm6rzuaednlix41u3pewpgll1l3xhnjqq79jffojpjimdnj0c978f4urj4ylwqlhbx5j3veb7w9xnvfhuzk94dhawbioa95hsrkufo08238ibjc7f62vr764anrzaimb1z11x1ket5y106bhp9n688cf4ghrafp6msbalajy8trn3mubbzjd75alr993646mh81wyxj5okl14pq0r6tae4g1r7hgzem05gmmiz11m2lyov5mhp21k7y5lvzf7q1oe4lumrb1seb26081ejx58hvuqdjhmv6p3tjcxdfrhpe6uewq7clgfs1ik87daihpz9hmjnma4f18jfrysrokx5ydk96kj5hys74j67jsy0ktqpp1reww6oopov5iaz086jjc7kvqcz1qnhsh2dtoows89soaupngli0jao1ggchv72sv0dt727y42amiubult3ix81ze1k4hz2xwx6wwe6t5alpittj9e11q7l541k90bw2issj0f9mgir4svfr3mydh7pc5pz524exavfli9z6s55lbdbdy5clvlxopofgt8gmfz7bjegcc4i1oftsqvpioyfme4cxnih5ci2jwholg7u1w4gqh42srn2j',
                url: 'y950nfbl5d3g9em9mo00j8ipeoqu3370i60ofiit60d9cy3aq1aw4tg3pilq8crdz6bvxwumrqk59ss3y9bis3ow8m0k6hsb59281pqsozmi1hjxd7jyltowhfxut521q3eom7o4lpfgmdzisjivuxm9y8rel7k6235cr2akfp1x142l8n8za439vxprnb0lomwajgv0qb1sufgdyfo4iaxsfkpes3v49xk3jxi498m68bumvb397k0863gk1aa2hprslu6b5v99f6kt0lcpvvh2m73vrkkml5afs3no1ooqmup37sc0cvk5wxe97laxwn90t1127gkqghxhyd9g43st8fd3abi6463wcuw6brg9yb8r18q983qljhz6ke9aizkkpjb3t1ojc6tg5it92s2dvks2z7olal1ytq181ps22jz9h88skffvhigp6d42g4g5ot3qwr8ofest13pr5f0il3m7u2t76n02tlzxangrkcm9b11pelr1s43t5ugn22shv0r4iwg1ldrfkpff8en50pphwokk7y3xmlf8557k9f2o4j36o9lyp6qikkbkrion19lj361f5o1k997swi9l5dbaq6f8dr3shzs9v8guxjkgr1ayvzzs0xkduva5vjhdvv4wwo778yl0a9mo5gaoarqkd3og5hbtf4bhng9mc01wgybs8gyczm1793dt3uvk4iz6t8suiiuzwdqoithxhyayx21buhs8zs38m0syxgcxvf4la5xt3vmw7oa6bwxb7eerwnzwrslqou9b5di2h4xioiw2mkcoq9s6lgc7whm1yvs8g89hw3047yge2k8k7uhy2s739bvlqevwmdbxy4iq678htj0f4vbjdp76rqr5vd44yjiajrhq0ionf951qdam4w48jvkoskaim2lexfld1egnb3yuqsycx3eqpv4c07pc9twa5365v36n0duq6d5f5itvvu1etgxq31ub78xkdfwl7voeiwja0lzh5lgkueqyrmor5clg35bs',
                mime: '9ti62z1zppoqwuyryiq9esoznl9y07xnglz1q6sfu580wux8wy',
                extension: 'dl3j3a5npbmpa31fw64sujmbwtnwvfr7tp1vmexmfokbnph59s',
                size: 3422021219,
                width: 314610,
                height: 427525,
                libraryId: '26a929d9-8790-486f-beda-efc5552668cf',
                libraryFilename: 'imlvarkw6h8uothzjqq22x211jd29fli4ty7b0infqa9jr09e3loccs54pn1orjtnu7kfsxrn0igxsb10m6j5d68z03pflrloui95l3ap023b0ngp3oykjqa1dswtuhm08t3b58mrgi02xrhx8jkzvkut2xoq53mzqgmo602kf6xcoku2dx934imbshsg5tpqbo275c075dgos1u7810fujpqbbeupl3cp5baeweom99e99rba3tfw4dz4ar3hl',
                data: {"foo":"VQiv#<<:*s","bar":99909,"bike":"jbQeLk}W1h","a":49381,"b":78715,"name":"S:Q^/>J4<[","prop":"LSCze(*n<T"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '099ca9a4-700b-45b8-8cdb-6baac9f2a92b',
                attachableModel: 'zpmjrw72azzc7xxq1p7iyslfj66sduvallpfhfvgo4kg8bs15pzql9mtf6yxnzxj5mju97s7nmu',
                attachableId: 'ed680f90-026d-4682-ab4f-3934263969dc',
                familyId: 'cd48799d-cc39-47f2-87a0-1807fa388897',
                sort: 872212,
                alt: 'csdz0tzcmbfd0spcpcreonvcosi91otadm7yy5hyqfi0va5bnkueco84d57rkftn08yy3eiq943hbi1pq0wchi30lgrveduv7jc0sxkcqq2vxvwpaklpq3shh3uxg3cn50oty84xeco7c27mbcxvmd90vv6jg9mlmqamk235allm7k0he8zabykkyinrapbf7ihasz5budz6kkwrzbfkwi4xlfok2pl8pk7sifma264kxgwf1a07oiq5s6y2gw3',
                title: 'ecgh5zw7516o7cyuijkvw4lyectidn1o4ep3rdbv6mju460qmfi1d4kijf6mpnoyu377ms2vzzrf5ou7ujplnmil6dkfrr8n94py96hcwlephg3l7935v13szop8zlpd4mve09tcf9a5sgvg54en35lrzo4psbyhl3stiognso99qwpndarbl167131x11347pki664kdwn0t9ddvc9pu8dnief01g0b49pm6oyqlnh56rvq6cf02i8rswr1036',
                description: 'Qui vero voluptatem cumque. Officia dolor eos reprehenderit repudiandae sunt. Suscipit animi sit reiciendis aliquam placeat qui. Nisi unde velit minus inventore id error alias sed.',
                excerpt: 'Est aut similique architecto. Ea laboriosam id omnis illo officiis. Reiciendis debitis cum est voluptatem ut. Totam aspernatur sint fugiat atque laborum.',
                name: 'z1oukodaey9hy6keb487pb59cgy4osdmm8ivq9oo1ohv6hkg57fcrjp98jtr92ugn35nkh3k085byyept77t5tnf6kxx5736l4pnx4ot6e4iv6nmo91smxdlfx8ibl71zbkjnseg7ppt5lzj2x4oyez2689n36ncuhf9uydw0pnf61fh522d780wqevqbt07xdpp19unypswwdts1atzfah9fd4v0hecjavu0xyxwbjf44kbe9eim6yeqo79xg7',
                pathname: 'mnme155u57yglzrtai4bjweb6ni4nh2fn6c5fm31h9lc03m3da36mh7wzqd8zwgmlxcz6v0nknzttztn0dd9b1ewwfrlk8nibkc6sgg6k54itpxeb7430awk4e9x5077n7e7lpc4eh9rvk0d0js59onkxizzmpn3j092b5q32ue6kr9fiy8o6idyheq0d3m8atmmwdlxdapbd1fzdyst4c0z61dp185pps4lddyvnkowywcrwm46iwof05nensw7q58hb89yew577bz6kwgndgsltr9f617ynp7ozfoifylyjp13xmog085w4i4ktodvohcoxhn9sjjdcpgljnpx69dlrn8tvbg4vlahgiock1uv856re2u56f8r0hozxp7ze1isfnzovydj7ysdzni9f9x2vm5oir3de085ozc8vm2w2oran3jui3lgef8w5dia884lw9dlgwgi8zuxm867qmv1tmrkcunyjv5leons8zw7bp68vy089v7jg79j19oz4bpqi75gh3a1brs3a0nsbbil5tvpssb70m07244y3n2wu0257gcmdr5umtdh3jce64n576gwgf5i5r1v4pdkr3bcve0kpot3lzfdsopnbb9779th83064kn8ouqck6t4z0lj9qq8vytqeegu3jh1rqn3awnn0bflax7ndxexdsrk5uwsygctff92qmlmcl11jb9fa7i7wsgqj0i5c7jsbr8a0hfnnqzhz9xrjp6228dsghs6rdp48z110b4v8po54qanu38jaer9eyb1nmy8ly7fet9vfuur6zkscdmcj0sizd79zdfvejotxifmwutt5yis8e6upv5jkgc1jnlfcpi4gh9xf59loypomtqipm2r60fj0zrbggjref5qxpacao1bx9tyjvqnsh0ct5pf56j5o9oo4ibcr6wtn3d4tsek8bwgxxqs3wk51vnl4eoza52r3wltc32tni88lkw1625vr7jck3lx9ouofsnnm4y8bquwfa8m1fr0ykzemvua',
                filename: '1uieo5s8d0semxm3o3l5sd2qp4vgn8637l0kpwgy2hm3zgieym7t2fe6eglslb2b2nph0fhk738d1rf8ij0mcqxxgpys4lqkb1j60zy5mjc3beucc359h91c60rssxz2ik9s8wbtkqfp4vz2lqdafpaqhsexpr26ydutzyul6la9vhqs1hlx49dzvqb6ejeljf7uiic77qmhmqiqk1frul6ha7wksk17mg8xjkzheho820mu8fmxjygdsjulk8m',
                mime: 'gqquj8g72b880hexis5hrcnvc2tvlssx92wrfbhoi674011hu1',
                extension: 'mpy1plg21sncgm586pnzanqdlxe7qxbvzmdg0le8ewxfm6b4f5',
                size: 3546560916,
                width: 827335,
                height: 122980,
                libraryId: '68b92a8d-87a2-46e6-a2ed-7e7bc989c6e2',
                libraryFilename: 'ken794bbykgpe84otrk5y03tzsrrbnlx0j6ojqqq0ui5g06uy9i89xnpzdgvelfppbtvrczw41czbv8ttfdg2x4pcf4s5euep1nr9vz8kmcsxif148q92xg459iepjnats9f91ro7pjubqyhw531st1axn3xdfuryx336fsoviz4wswrmfzuamqeskzaz4ifmu4wffxzwj9ws04mq0apnza67l7i964vpe39l15rhv3g9tkw21b34xngww61659',
                data: {"foo":"{D}qd_j1L.","bar":"&x56oc3Hts","bike":53362,"a":58156,"b":">&\"[yRf:%`","name":58469,"prop":85123},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '96f6298c-3986-4633-8685-7a245d9e9dd8',
                attachableModel: '7sjakqye0s4wqdqxbyvi5x4r5dz5952oz1nmauvoo4wyddpd566zt8t6gern00s7h638u9tctr5',
                attachableId: '082b7415-fe17-4a82-9171-57f497b99d3b',
                familyId: '4ba2df3e-ba19-4f3b-88db-ca69f99a30c3',
                sort: 127023,
                alt: '8bekx2r521qu4fyppcoznrhy6ycy3vm4jy0h77lqezmchgqewj0f5nmyvlmqqjfku0sy1x1uk0l1160bmhjmedpkbwgkw8llcbn1tf001ubx2ltbgnwkatufyrct8nsqzvbaqgfmt24m7ueus2nsauqbtapy4p3y28tnppmde2yf64wcynfkx2ixkgl6j0w8xdgr8v1z750ueg7n8i7m2v9q1j49634vc2gtk4na45ho7acjzd70kswskckd8pj',
                title: 'eejpu9azma89xqlv7fvindtiu4nb49pmcv8ui72ku0w1mukhord8mi2bkj2s7xia1qx6ir7v6b3ghcte2n3n706a5yi3grkgor05yxnnhmvby22anp63ggarces684hsl9h7xt1n4msm18ay42wz2aasbznctzfec7d0qjbzupb1owsv1q4v3alwjdwf85by2w1j1i1vazlj0unsqtcltf0hvavffufyqenck4njf86tcx68oka0y7809ygdj95',
                description: 'Qui at et. In enim in. Molestias ut et placeat harum quia consequuntur laborum et sed. Eaque dolore eos consequatur et soluta ad est ducimus ut.',
                excerpt: 'Suscipit sed eos dolores asperiores dolorem. Et iusto ut ipsum. Rerum et quaerat rem saepe nihil. Dolore possimus autem sit eligendi iste impedit nihil esse.',
                name: '43jqyhcdcwdut460xf1wwl1w8aupy66vk56qgep35gufn73mknb30nq8oy234wrus12og2pavu9vmlcdhkc4ol0ljzlpetqo7nn3r1smemo8e8u837epcu5jc2om4yc7369v988ty6dk05pqeahakgz53k9o74q6c2wi4o6is1i9ii2huzn28fbneb7zd7niwtq5lk3s8m3g86s9tgs6i8sstucn11v452jnlpdkpihgfhu12a08ypi4omvseuk',
                pathname: 'npzqg6vntcoi11iprl93ktkc14jcnfynhgsw5gabaw0pqpf18qmwvbap9qmx8j2jsmdhkba84bn327b16ttf9mvgoh9okzoh2zua63yxwpcbrk7ulovyngzywc3ql0m58ud1u7en4ddl5wbr2umrgj7n43vs4gacpdnv5dh5lhnlbsjroyv97shwcxaapkeqs23me7zs81o6y9ntg18lstllc4a7e969zxe8bhirrifup9ucr6136pctm1gwfnjuo6qc51sg1mcksco5hibgomsdrci6z6y1t7zil5chvs2kzrod67bd3q1jv6cunai3rjd0aqtektyy3liaowtg5hzoz4qmej9r0w6jdic5ovag8242tcezk33tqj4r9lpm9u7ejtoksk1th7cix5ss5xgwmpihz1e6mzex8nl70eb4i5kjmasvqijqnpn90hz6roh89q20hfkb5cvu7kovfttzg3d44s9s0ndzmmtnc20w1x0uclgkrtmlfdxfjrnsnmidq3v3wsxilv2j9tqavhcynzfjqmh3p9ex1jkkh8n99emv1h4q1ofzhf3ysm52iu2qipep4a7jm9apfperdis7ch2reue6j9erq2p0mqwlqqe0b0mb4hbcbk9aiwyilgpe7dazclzi361z5nmkliwt7wx01hgyt4n67k7meec77ml9d6jmubxb92rwzv8qhqu5n9xfml6yiowg1ga70r7gcpoi6n869091fzo6imyib0uray8r5qxvuu3qptgguohqobvg2twdm3anfplq1wfhg8a0jjn3wwqlor2lyp3u3ls5rz3bhbzl6njuhk8jstpw6erkk9w0uvhki0z7ibrejeyo7xormr5kr5mnx3q51f8sagi0civs0owsnxp8uzv18xgg4b95i7lsbtykifxua6c9x8tz8dqg76b96wd6l569kb77u9ytzaiy19oy8jeetuu6kbrftz09up8qmfpoocz0s0dqoxpzus506ys2uwbkoqw5ieipzi6kyxru',
                filename: '1ckrzkaofc610ekjpfg80axzjy0s1exaz1z6m1ifmwlbl7eitjzeez83u8u4afcmzxl4dnhlpk7evhnnhq7xy7ad9kiu22bzvttj97eia1lip3aqkoulqz5c2toysx1x7h8ukmtkk8pbckgf3m5nv4wp1kre9urlsvebwj23ophrqn8ah1ejump1p2u5s8jmia3nhgwezp8oh8szcuj7rug8huybpy18tqbio0846s0ys7tsyvou7swkwwdvhjk',
                url: '1ss20cqt779wxtddwf2x4y6r139inbeqamvdy9037wwygrxwq93mw0w2o2byprmhx91nvvo8g93s4vi8wv9j4dmrx4azjd7tcrith9qb98nrzfd8z8hdwxsck3ejs1wea87dgjimtiqz380px3wikl7xkmiaprjzz6kyo2shlrpw2c0vne1v3vemgsfuzu4fkq61oedic336sawfl854tzqha46camcuc0607ywivdp9xokog0unpckj8a78hejpyezr0ai6fa77su06cxxatit412uvaozkhii2rnn2glwbbbuype8bdgo3qo8s6mtkp5jp4tmo4s387htyh40sf29por3us4wg7xu90gbt8ab1puxctygv277vulvt4j74u6498cq1eklshrgp6u3dvhuug5y6q830j7jhamyro2l4gpfw55djjuxxnxv5z476k4x86ls34oqxmtx0gwhef27hhc4gpcm7lxocgvudj7y9afdngkcomh9a9gku5b2wj84t3rxyloj9q16rp9p3zd4nf6eong2vxshocl7mwscvcwn2ba4ltln1nxn36lzufijlbp625bfpq398er77bieqluwz9o9jnwnyymlnt195cklw2wv2ez89ya91rofpuldfuk5f1juz93qnnb0df9m4n0vemfi74ujak6j2o7uicgz99g2i3t31t74kgvenfou0elqe96p03mxy3ih85cussarnt1mrgd1m9ju3lrv4wog8fna6blof67o8e6gus6smjoqlhqfcdougi99pkh47mm1zrbtx482lqkjkpc065l7l7okv5wvq5npgfe6jhlecyk3dehmhz06ihettz34cm732cu1bhdkrnv48b1gwvp78qsnnrl8ims0lp2yjr5mo8f5v9gxup6goo5l7djs3x7peeih5wr36cq6of95lepm59qzbjfvkvamfs8f3m3cgq1i3liuh4bozko4ndzyfcpnlh0l3ym5pye64ymn2ze2tinyhn0hh4vbq02gw',
                extension: '2t1drofanfty8ap4yoh7fvdlwc5z4rz1a3h5iho8nam2qeb65y',
                size: 1953163852,
                width: 781666,
                height: 171563,
                libraryId: '96732ba1-7d56-467c-b685-05bfdaaf0b43',
                libraryFilename: 'g62xm9mhqx246jjo5c0s9630da32l1m6nnurg775uypcdu8ggkdd1uf20fonjajynlrf41ek8zh8gl9rgydsqhim3mx6je5p572om5cpvycx5i2reo86mr1lzwawbpwgwrkjsheydj0jimb2gi61fnvn3jxajxcr12w88muoet9yiq26ll6cmrrfzyb965srrjvvk5lmxr0dxjyhh657epd71g5f36uakc7ye1ob5ol9g8mv704bpvgrdq1q0bb',
                data: {"foo":")n2_qLiBDO","bar":90632,"bike":22373,"a":"BUCAc\\JU@<","b":75388,"name":33304,"prop":41553},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '64d90f10-1d45-4b35-9052-c2d58f763156',
                attachableModel: 'y1lt6skqdydx6uw231wobhfxfwly2d7m65i7mlg70i78nvkzqgrfnytq4ba9yo4962ohhuvaz5y',
                attachableId: '859e6df6-9bfd-470c-86c3-62c0128ec5a3',
                familyId: 'ba3b3889-8fa7-43fe-97ad-8a05a32f658e',
                sort: 452904,
                alt: 'xiq0hobp0u45t5k1zakwp0g3uxumazvj7buarq27n2i4mlkb1ov92pjvy9bqx2w2whn97qw9vf2n94bs94chqpcvhbncxqlb6k4wz36b0mcnrbk1g9rl08yjxge4wd5ln36pq36fpdl2l4hiu2pot65fjqq5drx5w74w7ckoqbmnalo7g2yefcsfavwha7ly37xssdg3s04t9j26ptu482af7uzb8ncnbw5jlmlz5fbrt3en7u1ol3am8iikduy',
                title: 'a788jgjw19iptv7qaluam1qaz5q2k8r2gy21ddv5w1octx5a2u8qmdk81lqfriv2d13dmbulj5gexrdtiqmh8t6kr6tnzbcj9az7to7zmkjn543i3wm66ax0xdi8kjioc419inzuh6aay56fjlfiufu6yo6c21jqtuhdisr8hlzy0s2hi9zz8wjn9s51p692fq6vvi96gx24d1qb4eg6uuum6u91cgv1e611s7hwdef840o48lvi3espo8n2u2k',
                description: 'Vel omnis laboriosam labore optio sed mollitia. Minus labore earum rerum eius et sed explicabo. Enim saepe quaerat at natus reprehenderit. Ipsum necessitatibus veritatis sit hic neque eos ea temporibus quaerat.',
                excerpt: 'Sequi enim et. Praesentium fugiat quo dolorum dolores ducimus aut aut saepe distinctio. Iure atque rem non suscipit ex quo animi. Nam doloribus est iusto quisquam est quae aliquid voluptates quam. Voluptas in nihil quia quo autem nobis atque. Mollitia voluptatem soluta reprehenderit provident perferendis sequi corporis enim et.',
                name: 'sb7y7dz1vtnulr48og0kiz8ji32gc21ea0530eye8tw0va2jr3rlbhdyizeh3pbjknngjqmsz493v1doe5priquy5z1jzg7dfra65z92o8mx1bih2bwfhl2r3us8gl3od0dp5zu0v7goh121midgxwpz66jcnlc4ty0tse3t1hcjjsr4v9t4qy8jmk1piwlj5urqsnv3d764l8n4b5jowd3lprcnt2ebwkqbsadn86fggkbbk3hl66lgb4zjvk2',
                pathname: 'rho8sfwy9p7ws51c0p0nbuj81ikpfvch6s27kd9rwciy1u96lnqy23b5ns9c61wl5vokqfbv3nq8szsfcm48ho2jzw8y1lh5k1qcomckapbz5j21tbgxpbrr3pi0g7ocrjymmcl0x3kumiote4acbpa1cz9lhkyvhukfp893aiyiac45hz3f96mdqn6kzhw39huk6nio6j7o0pj4smuw8xl25m11trx8vtu8m3d1c1i170t10qkyaqbskpn8wo068qfsp7yfk0nnn2n2n3rqqntwgdvm2lgghhjsd53yallaoxtz5gqdpfx6cthsmrhpgybesgoz0mrwugkxyjbhhx18vwz40u430g54v4l0s60qfkbydz7r3pzbapguxovs2gb8l0jrl98jl90vx9nmmvbnfvvkzlpxkpyw7czkhth7vb77uiejai1b6c7qknd34vcpyw8i884ft153s6srng5gviy2ihj53zcd55w20zj7fwvkx0jjfkshgtr11ncyawgo3762veuxbybppths3hvi68ou56dr0oyc0bhkpxl87mg5j6ts6uw5kubpgihq6j38vjcws5msskco9e087472eg1wsdi42x2uq1x4z9f3tw4blb4oei9ym5o7i4mafznf50eq8cfijwhuhxx97rek7yske3da5lvmh1kzckik6nb1k4ozru38z624z6yotwdx1t0w9rgtoflj1097jp3hn1tpciuxi1e68sbss22rgypvrafz6dl4oqarglu9egsaw6lrw54zy81bsxxo46fb11re9bf39jncr5yudpjqw51v5ze6u5icx4p173j3m6nbtodsg1i8ad2fs69fd2j347m3uuzrbfip8f9rnpiwzsm23cu6wz54cwtv0f2qzsh6c0aakor29kn465gnfo52h7s9ww8ehzxlzszawg8zh0xgfdx19j5vuthgcchqbhxs8tx9iwyrvg1rpmlx9rkxyf67sjt6hx1awirnbvrhzp51glyeqc4s6f1o6bw3',
                filename: '729f6vvsa1ek947vnq4i8kpchs117sbq98c9j852tqxzlcu1crnn2cwfs3h7qtdg19t1yfsitbnau4bng6w1xk14gsduy1eh3t53vjttp4gj87p0bxkir3c02aav60qku110mop6ypbl48s31smszr292h8qjz5qojeb17d8el21h90fcdb1y9wcqefdrgqv0mc06jzfm9hp8gz9wuev8pwba1xape7kw4no1dksbc17mo8kypf84cqgbkm1tno',
                url: '1nbmzeawmlx2veiqdmc5w0ofwppjtuh3lz1x89qf3eflh84oi8fpfpu9adr33screg0qzcqg6x1y4y58c3xwn0uvyf5z7qxw1btnpialr8pswduwj8pyxyz4hq8rav442f8dv5fqhs2ft25jsuftlb80ir8qdm2jbr5q6gd72livx4196nmywp7t5wfqjn2oxv8ligvy4pt1sdjrksvu19xe0xrf0ndes45i73tf9ekgvld2zlwxv5b5gvf2xs3ead0kiwqfrltl802x4zpsi1szd6wxt94fp73ewcr9zwu3la90r0iemsk9utg1cw0oycrpfeht6zrnz67gf0t7npipo6br0if87rysu0b7tiiwkvhfb9fsf3mz81vrl5mxymxt7b5re6l3oqoq52gbywcx9bq2um93y1v2bdhpar7ayr2p3omyvfsr1ocy7k3savu0ryovcsfnf1pxb7ew167903s258sanl52ijkj65fgpfpdl5knik1r709ys0dzq5xpfqt65mk9s7jdea9gnyusz8qapbxhbwzgcdyjyh1t1om21x42teph67r7iulrtbrjnbn0vuhzz781pqb5jabrnrtwlo1cc3m9dj0xjg56uh3rwfulhbgdl1giq7jso0q19cjafbud997jmch5fkc2c870izw2uctbll187vhyy7s61lrgsvadfnyp4ve7er75i3yesquov3xqluha163x8l1jgpsfgpoc3ruuhmigdclvk8irzk784adtds10tomtgs1p32fjqbhlzwczcofp6ulay0qi6v9bk68m60j8qqtnl364efiwpu7o6k7crip2hpvlzdlqfuw7vv56inguvukckx7628oasurgz7lzrcwbmbwwqxbilx5oo4tbkxcl9px1anpxp63qutchkqit5kvc4pczb4y0tskw8fooup689acg46cqh4zr0upfdcqphjcysbp6f2xmy3r20as38zuacoig6vkpqn7k1v8wjsbr3qbpkw4bezmaaj8a',
                mime: 'ehdduzzwp3huougumovirdg9ruugd2wxgmnu0tc3shrk5u789x',
                extension: 'mig4uxvzk813k61nlit2ornspbfuke6rgrzt4c2a89aitzk3un',
                width: 712794,
                height: 142899,
                libraryId: '96012dc7-c9b8-4f59-a852-bd22506df905',
                libraryFilename: '0f9okijyua2psk5tnh69kkcztcrrar57s6hz6afu4m4bk3sk34h5ewixm72gl0rj2z9p4tw3an0yeoeizd2ueebbttyp5uu83ry71ry4z5jzvwmofogjolnlko4ko9gbq99n1ikznixhgxqasw6yvdpiz7g7sy954tv8uqb1pztqc7c6untycqh3a4mgwpwnpigwzhdgjysod0ol2xn1l8lg2z5cze0pjekwd43ludvw8wqe0hih2nvlyun5m4y',
                data: {"foo":"VA}%1j;)rG","bar":26621,"bike":34777,"a":"Q0&oM.i9l_","b":"c}'-rj_y'Y","name":"0R-\"dUj}@@","prop":"-\\UA_`|Ikt"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4n3n07zjbfb1chq7uurzwbc3ugawu6dfbkiw2',
                attachableModel: 'x470nh1ol89r1oxngw362kssdv7rjf8qir3d2cdvkcm9d2v0jnkevl2mrcsnpe81xck7asnw0t8',
                attachableId: '9187f064-ec03-460d-8e3b-1cc2bef437a4',
                familyId: 'ccb583be-5758-47bb-9238-e9f6b2e6fdc1',
                sort: 149462,
                alt: 'nurlow5fsfxu3dqcdoroc4t6l6kwyzw12sfb1wjkwl2r8c3fyt4wh28tcvmjepil2ix9j13ypekbvbgk0cyv571mk8ajjbmmj90xbflv2o5kniar1sl2jc3zl8p4qzj1eisuwezy6u3vlitc57t6im7io4g0xgodd435afdahlb7ed3nq56zvx59t1wrgnkwvuonkq0jpllz7q12i37y8vwtponl4kcxpihkmgwhqndh2ybtaxm7b5nf25izknp',
                title: '02t64dwjhdbd7ijwcfvkp87w5k10d21mkia99ht73w728g6mi8cp94f0c87tow553yb0qybjmnobnkgzdvnb6kcdg28l0cxb35gk4mw46str58qb9qjr6rylasnph8n63h0qorbvmx888pwuyc0fevecenvfcla7mhlvbxf886ru10ya7arh11c4d5tbs5422gjtyyj32qsdipucmevtb2swf4hsqdxzzxncr91uj7k60l3yk1zjwkuwptcvofx',
                description: 'Mollitia cumque dolore sit. Et maiores dolore placeat corrupti possimus nihil sequi itaque. Nam id et officiis quo similique.',
                excerpt: 'Et at facilis eos accusamus similique fugit molestias at. Voluptate sunt quas sint. Consequatur rerum quis sunt veritatis voluptate repudiandae.',
                name: '4ywf0pq767wekwbv406bgjspokozxyygr2ll1cn08av8ushzwotgzkw2dv08vndcqpelde31h9gq1snmwgytqj2rmxwmfgejyholkagfz647bf7vtfs9p58q956hbypd6a37i4s45kz3ijfhqeyn5nmu2krug0r3f6v62e8m94vuw32gmodz9mh2bqefbahja3e1joqg0yijfpmf5bvzqjtg87w2lks27wzzmn3gm4jxdu06q9s77knwzch1f1j',
                pathname: '4clsttrtsok6ol4i6n3e1ah95bxst7ajkg3cyrbg9k153zix8r8bec1heiaatphio5ryzcdlu46o5ulrik12s3s5xbccb3n9yc7z32kkwggqgzx7m068gtpypjub2hquu5n4tvohvj6hdqte62owjkndjn3lmgu7ghd90ebw5nrwiygbo7xi6lpfef51m15e2wp0llt1mhun9ia28iho5lkulv9t7c71zj28emjqnub54nys2ko17tlk15kuuxy4li7xl0cskh522kl326ouu4wcgi9q9qwjqkn5rtnlwc9gflpjy8ox59blz7ac7qk11iuhmil0o5dmfuy582w597eb7wpdd6l73zn0k2kqi1rt05tzkv6wjszkm5kb0kdzfnm0e7xjwnq1euucgmszg9i6urzx7cp1ad0gokmgr969lof6icwei6rsobu43u8js71x2v4yhnfiwaepywkp23beiqlszx8jmzyzuqsumuestnt75qt3nu8fmnow04mgsrltzu4gl8xde37kip3waa2f79bwvhnq2cxssaactv8r30kvf29o79e9z7drv8yig108og915hcopl3nage7oqr3v0ot1w6tlwft3fq8859dgfchqcf6hichqgtrz1qa8g5ccmrriq215s4c9ri4osissq3l996j8gfrho88n3pm0azuu61pfpgxxa8ye0zftzeey59tl2rllygg1n6zof6j8pr6zi5ckrxzlm2i546cqfuh4ao8xbze962ejige858h5gdozmcneyefeud1iubh8b6ul0ttbnmsq6cj8127bisgy2j2aw38f9qlu4cgwnwdf9l4184hsbcn0xb782r1wqmnbe2uwaz40bbipnmybr1ct1cizwvdb7g1illhxzuyz31edo4sodqciaof545kzq1rudxgipakfpq0irzlhfj8bh6qtu0a3ufgxl86bo57j3j7uui0wl2cnq9iuchc87h2ndibcdfo3w0rk1csadeltto6bv926gbg346c',
                filename: 'wdnmdim8re9ujyf29i49lkvvf5v7swjqtcixcg01a5dgixc716z9egaqg3wy8f6ro43e3frnavr4ik770asa4916usdrdk1wvyraz9w44obvc07qinnumulsikebva0x1r8e2f7r0zv668szfklxxr952ayclb7c96wz9au3hkua7cyz6hiuni2e1rqq1wd3pf2jym8ce9s82gti7vqrmoe9ndisg860xbvwweatl0p0zutyi5evomltt27w98e',
                url: '81om2k8neft95txcsqmnlq0jdkoiw0861x6wxjoo3gj6or1hyszudmhh8fljig4sq3ihfjpv9n0h4efyusk0g4n5w7tm79zxxetdrglkbpvg1hivy8nhm5cfnsqoio0jn0owpjrj8ihig6k5jx8r03g5hmxmlm1rx8wchk5dk0ebi2pf1tp4d7gpatu7ibtz5fop7kvh01byvq2z6nfvgsudtcld36xr2rumjq6auweelo8csprdsn4wvk35yj13gs2iyt9xw9utba616xtu7h71ey0el4oxrdjbmy3c7rlomjxjde0i31oeipvm1p3hoofss92ynlxs6y0hjm0tdfdix26wd2f102j22akf3o54xdh9ytdfz3kw9rrpkdizf2zfrbs6wwnd1b5j2gso3wkdsmofet14c4hpcw3o0iotepxgv3me8lwmmqhfy1gkfwgclog8ohnnzdxzsq5pfdgy01xn67ycju61clml7md8b14wdpexlwk8r4dbpup4nh83m69garpxfakq1lnvrhk2lqzoi4cdl32p2v9n4q8f8bn17e3bvn3ljwse46knr9tto9dngypygsvgdaewfasw4up14hnnzoulnuy45lqv1c7e9kwj151l7307eit5ggfipm8b5delpzietlix0ewfvbn8vmldj6pdfa26t4f4l3z9pjrhf5zsfmpu5ad4hrq737tk85suxty3uhv8ymm2qaifgczh3lbn4um7k7m5fnctsack9q474bggn4yulrs14krs95xk5qcg6l2dtqnmxq52x1iygb1eb5n0t5r9fctupg35fnpbg3uqbt6yrvil95cayso6btejvftigem7r7letbpc5uacy9cpjhof7kbwvspqqvzp5384whio98wsu20kowy1kwmhf1dcopgdwu123htfhwwnd6u8u1hk5248dnt72g156i3uldja90oo4bin63xtyc3i5bmw7yqauygwpchat3bsarah0a7vbj0a958nwix4s1avie13',
                mime: '4hw0bvmf9cov38mq6iedm2hkw6wn16gmzgziadhuonsno0jtkg',
                extension: 'cinius5rgn9p2637kcibn3e1m942a8ohl0je81act8x8rp8jgr',
                size: 6763476692,
                width: 532893,
                height: 212886,
                libraryId: '0ae7467c-c792-4978-843a-3bf82da4449f',
                libraryFilename: '53zfu8ybt6pq46sf6h2088wdvfi3ss71z0kjwwl6srmx73216k7f9js2flnqsc4l6snyzfl0gqc4nlh96zl4e8gi5ivtgvwxy6vrci9lepvx8rf90nlhxu2zrkw8twc7dger9735ju5kcyqt7ii2rtzlr327vczh7iscvtvcxtj56jppzs08mbelbnexbpxf5j9ysqlm397fw6nglsipaf07kyni4d1pndxosflzea24g9r8h3cslk7gmcs9l6r',
                data: {"foo":"KK%6/(*f'}","bar":16607,"bike":"jr&nE\\\"\"D3","a":11095,"b":76113,"name":91317,"prop":"H|l,m68Z}w"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dd2a363e-ecda-43cf-927d-c215a6817b56',
                attachableModel: '5hcw7chnx6iv1txjhnak91cp29guy1fbphbqyyi8diemtusq730uaaeaeesus1zdsk1rz7h3w1m',
                attachableId: 'e8sml16wk8h92j54xa2d5fd9ipcl6wvjeggcd',
                familyId: '2e6048d1-5cd5-4111-af30-48cde5f067ec',
                sort: 124702,
                alt: 'uv1rdfk31zzd6iczqh6abbuqq75gzopd37ikci477dbpib2ow5mmcdlup93la52c90drvaig6e4c6gbf1dug4np23mmtkp19sffac8rarh9r51mxubqxulrfcdmknih2fudq7q26wzc8ftrlocrhhjn6625vz09iy5p2wt5ceo8rjwrw03m4vl2otiyz5rej8e75j3hy847uwdsvs3k5ieoga9rkyakutj0auf4nwrbk3gl1nnu1u14xbbsow8c',
                title: '5gph86e0i5av6ttq3rq2kztoeer6oq6n5hw24s7f1qjf9oejyrggy9nuud1jukx7dblmk1cgfsangp3a9mic2c1ab0gnstv0ej8uhxsxbam6svytzsh3rom7z2sflj4ju7r7ds82uq9honej016i2hfktv6j2r0dupuir2wk93svww5oohhduw2e5jsqz4tmau0evgvpjjxm4jv9qiqs7cvfuc8vu3n6sqzer5ddjqjlvj4st8yije5d23hlfj2',
                description: 'Fugit expedita saepe quis in eaque nam qui necessitatibus. Sit ut et cumque laborum voluptatum est omnis explicabo nesciunt. Ut ut molestiae et fuga dolor expedita. Aliquid natus quod. Sed hic in dolor quisquam.',
                excerpt: 'Sit ducimus unde dolorem sapiente non cupiditate et. Hic non ea quidem et. Excepturi quia officiis laborum sit dolor sunt quia cumque expedita. Alias aut rerum et. Minima nam corporis sapiente aut autem quia. Repudiandae consequatur maxime quae voluptas.',
                name: 'ub9lpj75bobytaeyk6pukwsr1mkptfp0ftgqh3hpl8a2v0yzubltxkt4n5y1oqlpj11qlr48h2w7bi2t9ah0l49mkvosifz1lfizlfqksyxcgasq7m064p579k6tk41v99g1tffi20me5874ys2hsi81tps9kn4i1hfj8bk9bsj8cv9mkwy2tn2ee46ig879rk6sksvrncwxknu8jwxsfi98kqa2c049zjudne9eushxkroasl6eon1rezhxf6f',
                pathname: 'a7c9kgzgbyvcu52nsmtrx562hy3gcdqtu99rp0l01tqc5ql2fgtpjizger852jkzte8c26lw7t8pty18lv0lhltv819gyje0aafj07vx9k4qk2e6tiesuhxkuo1vnhrkmf392ejsxxu8r2u3dbbv8mgu0v1in8vc72skkvyjapzu2x66mqt8ewbh7pforxo1oguqszak63kn3r5fh0ywfa2kwe48cf0y52gxl1a8j60ze1kj9lic9j5bc8j1w9x5l2peh8w9lj7cypzgfcx92tpkmw7i2clxu7usiaevzl98d85oun2xxp63qqxg19pla6mn8lfvf6wx6nb3v5vkj7vsvrw7q8sm5l9zumhyun55z287afrxcciu24mtf7oa70ttjzgoq0pr7nqpqex6uaqiif0v9r7m8k2v4e6cj3hu0sdqhanw996z01l3fl3851f0ob5cs32xoyc84l3zbsu1p50d9stncb8yynljqxfoxrdwjciumqp6grqxqn0auoobcdhkcam6pqtrgh5g5fwu2vm23a8ldi2itjfcohi48oyam2ghqenuwuifx805b9c80rk9v109mn1au0elwkygc364yot45opspd98lybo3c2gdowqmt79yr7krco3z7ckoj0ooqxu3k98bw7wa03m2uj1pwsddbsjzkhu0xiznzo6lzmqrwvmo79uvtv532z6fzgev26urdornwp2sssrrcc6ulw0b3alampnygzlpy5zhjn0elidmdcajy39wk9hxgcbjppbyfkcfog93yozb231kb33d8yfrwhsgpg6upfv3852aa37u7dyek6zui5ybvkois4nqhjr4aquxq9feg09arm6275h8mhgyoe7i2cg1jt5ow2bpku9naf70oku2cvnqf9at5vrcrf07ky9m59qvst6vghpzyaz2w6bczi2mqn9jjknxg20n2b76z7kxs2ccse74kz3l8fjvouq5u6iqrx5k7dhowpaf7uixbabeke59v3myk686g9r',
                filename: 'yyjcaqx05im3axudpqm1dhp5s11dvo9ju3mcjfs56xq9u3vr8idccmqipt0dxxlz05po3ycqkz9szcr71qh3gvh7hmosnwjn3mfgictfdavjpd0tihtz147ansav4midj5lw0m5htjvq7ab94zk0aw3j8ri89padrgjnnn14d5gyy85lvx1qmi85t3z285xmwgocpvwyp5u7e8o2cur2jgxn6g312c4huqe7o7fjqzzahtmay00p2dam1j673o8',
                url: '57zwbagbdqxbnmobuo05rsy8uh4uk8rh9bohk4as8pnfs89myu46gaja1o0fe2890jo0neqvvzzhbx9xz41vh5stdql5udyhmyb8hm78d3smfcef3a3rbcg7igftdghlgfs4v4nej9bxo76v61r996gg713vhxpthyab47x5r9uw5wzef3vm0p59ypezq2ymfuqpicw6kfmv3rf9sw96fg14h8avr3u16e6kq80eexwj8oou2ytzvyqo34zftprdzsmqal4ykasnv06yvxitnugdhslvw6ria5duuj4lfwz5y6ieoa7j12ug7ms678kxt6jw9xn96ye2wiiqxcki19qmcqvqrfj2uf1agpkxqrya58seckty1hsvrotaxb6g7aehu9myqpwlemkh1mnwgp1zg5vdjcnha01u4mnumi063kbf8lb4yf3rtqct50lhpneiimnd2r6fv8cxzhljyrll5eob34kcjfwtmbg9t5hl33vy8bbd2dx79hjh9s4ff2rba00rlu3xwlcf6i9vqs53csec87y7oe2bb1ichiqgtbx3llaq289palhsrz3doyyrac3nznqgtqdic73u1kpt2mybjzvvte3zkvmc8guhdjks5ahrityzrlrr9i8zqr7k286q7iaicmmsn4kah9c8hne1xtyjz713olsm4dqv6arkpzdc4zqzyjyvmf1xi2ygsjdfvnn2y8sler3upizp70nqnnsd45vaiskr9oubdd9jamwvw8bghgkxr32d6hq6esoydsgefg13g2ba0efmcqdu900nfdj3bw6dm9jlk3oay0ew99tffud99aoxi1xlttgmq2klxvkewpembw1n6m6t0kf6ixof38coa3nalu5o43rakme3etuwp48wm9l0btty9gopar6w5mez45wdajdv92agcxx3bhmzh3efvxcz2sqyha9098b4m101wglncws18r7bs0rdetfttqunpn0tygoi20h9pv5x1c2l6nqt1mkkmqbglkmqddg5',
                mime: '5io5j4ixzbksfqgi5n59gl7ve5eob1pa6yp21k0tyihrfnh5gq',
                extension: '3njej3df2b5s170tpbyeubf25wdhnr60ye6jr5f1b5axh4ql35',
                size: 4738714303,
                width: 652873,
                height: 800297,
                libraryId: 'c72e1e00-bb1f-4975-b718-0e1003f80c7a',
                libraryFilename: 'o39e20lsf51diis6zijrcbsg0m6foz3mca3lvc3gdq2umohtovov37kasymcl1dxu2qfu4bcazgyirm0o40gszi8kx3uw5lg02lf9j66cfeip6go9t8c3zormrg13s0xw1uvz9xckij9c6mwmcqww5zes06yuls5vvhii3boy8bmda2krgh8jif15ktidve0h5zhzp7kz7b5kwutnnul6l54spbab3np1ozxmgiggzgw2186wltok6pzy82n96z',
                data: {"foo":"g?qZXauVW7","bar":14550,"bike":47131,"a":64955,"b":"K/ftd\\)q8u","name":"xq(TY1i.jV","prop":74293},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '00a28814-4007-4c63-bbea-fa1f909600fc',
                attachableModel: '4627ir48ut3u2385qonbk5aenkcyjl8rbc7gdgigmgki0gpslda15jubgpg3mcbpxlok6s624sk',
                attachableId: 'be29cf2f-e59d-412a-8b5a-27a0c2418d18',
                familyId: 'am0fuscre77ktypi0wnb615bxxtr661crrw46',
                sort: 562407,
                alt: 's4ud87127kcpopektdsn3kez192f1ixu4hoq1fg93v0041362dj8cd4suegtfd8r10xj82nuf20fy2joi22254un2lmj5oxxjimavr8xvq150nneurkl6145pci9w5m9u32rn90h6qgiv3tga88ae6eqkdghxdufod97j33a19e1y8mc9wpwj5ugh4ngk88cleot5n02q59sae5tznh0jl1jiad22e6pz0njwu1zxvp0migfv6evijfoatwj3cs',
                title: '2tx12plu4mgd6p9w59ixj77t5w1d4zglvegbosy67jm0bkvdl7ox19z0zs019i7ho3t2u9hz1hxiab01sbbus5v5m14kg5vrlqmv1ytsqf7l6o2njkdxanfjxiam94xounqblf927912ff4v3cb0z0tp8af8fz58nacln57au2zvs264xuqiq3c28t0yaaa65t07amctjgu8tf8zj2prksmhju3xbyujdfmxhc4df4ypbsk3rnbyn7gy7wxa5zx',
                description: 'Sit culpa architecto ipsam aspernatur nemo. Blanditiis quos sed in. Magni rerum eos pariatur sit non adipisci dolores ut. Ad nostrum voluptas. Deserunt ut rerum omnis. Repellat et sunt qui incidunt perspiciatis dolore quod.',
                excerpt: 'A quam delectus molestiae tempore distinctio laboriosam reiciendis nam. Sit eaque sint expedita. Harum ratione aut unde et perspiciatis. Autem eligendi nesciunt non voluptatem cum nisi est rerum.',
                name: '4l08wrzac0fknwuqtnolxols0lwooqj5z33ywjayhpu0ybdqkloz34cdwajs2p1ek36mid8x9w1btfv7nf9tl5jesahw9wc064rln3h438q104vyui73rljpf58kmo3tr4p31sh0pafo6qfagwba7ww3qvf46zq1bssciv5l5xp10pal7e1be0i344orlnh5imk3a33kbqffa297v4knf4av2657cjxzqx32e6tlmqp0f7qczciaxjgsawxza7i',
                pathname: 't8veg7959uek6f5ktfnrj2uyyjibvesrc0f7gqyb8vxtxoxe4mkgobwbu50pr7kq0yt3t4ij2zwzv0qoqd6ghd5fv5rp0yij4wzzxlyc8a503lhys8s8i4nfdnjoeehlts8u74m9zw593ouxp36ru34x8riicg3n2q2j6mcvor3iq6tmpi41uv8449hcna5794jxcnmd48grult8iykayreqkz3tk940qd3bp4l8l6e9oiihy1rrttjyidkjpi7d08npdplm8qlrknhzz163w4vqrprv5ziwt9r8vj80uo7kf1qqyp49y7zcfb1esxa7ilsshv0es5gtlnuowvyq4us04icecipto56gqvhdkct96t1kum5j2030dga47uq50yrbb05cv9ceab85zp590euclwsjvftn0afgraqy8di11ixpc9j4422nk41uwa5fnu5vp7t9ubsgwcxpetn9qedhmi7ynx61lii6honyyeijr0lz9ze1ufhwzdn2n9tkw1dcmzn57wnc615yuw0gbkc1ii3mlozks17veso0rc2uxvl5zmljjnnw3ex6tidxpep6xd4mrdfnja98yxnn3izkhgnqne7m67yqvdkkmoasdk2hwx0sllzn73voz931y9jifmr2m4r4ll7b2be5ct6nqr8u7r0ap5yvm7g902lskyc4wihtu374hvht6txjt7mdehuob9m8ai2izazw6epmbb0sydilne2uiiup6gm9ort4prak0b8n4iwxvvuhe6s9eaq22mymio8v5nklb9iq9by7co5tu25xdcbpme83ed6eqygzl8oex9qsz6ym3eo5izo3rccu2u51kfj7s2nkcvguwbp8ceu2ybxc61h6efdjqzjn2uby4fhep2cwy7n02gqafursjme413cu9meydipz82trfngfffaolxpntidfqfspiiqfyj6cdgkd9c6wps3hkgr4l7k3j3u6w3u70qsqswy0xb1hsiz1yybeiycby9c95ufdfkwk2lnn',
                filename: 'uday8vqyek6a2m1jvwkb5nyj0snhiovfpz4yhfa7vooftlghebx5a1ftvlz71oou926ipnd5hh1uqnens7zkt6eoj1hr6e4jewgzlw4hcag26tjmanuc6y6wd3mreq298l9qajourch8ds878gzehqy0c90j4o9kuxt7mg0d02xcl5804rmzgmoc3hu94mnqdruo46ess79rcianugpvvgyklp381ajiaaszd3f18ze2qh1x7w7jbk3zuor7iqi',
                url: 'r6326ngmhlw32cdzz1ot054fl5g38yivzmhhzfb062xjox9r3ii2klrpp6a90o1vhd9zqkvnv5ok3sf9hkphve93mf4mzdmi04oej6lnwogr7r6ojuj7m3s3fr5703htee9ox66zmyocofnvys7lyyani90dns1hllr293i7gc3j3p69ocxigmmpcgu99xgkvjg39dw98jvv7uiu9b66e4rs9g29dzje46bkw6p8he9uqpfjq0c6aiyfyu6s7u2rxvmdf6j5fo9mfjunfsjaawdvyj280l3c5t2l7rn8duftybooy3prc05w5g14wwiwxrkpycoiyk1podu06xjwa489bt1wxlf1g5tzpklu9eg1q0j5l5yqwlkbkakbw27saz9e3dwc2nfuksgzkd4t47nmty40a04ep6f0jorhuy0166pbxu6te2k82jb1ljtygt9hl59tdgabxpv627aq20q3i5gjaepstw2yhzb4q68h2cb66ss4q14rvqrp13t4wleb35flqtxago5dlt8blzq321z5og9br9lccvavrumwa7bbyzvzop3nr388bs9o29y0poxk39lad99l1kl0z4wy8mednpoecnkrdrw0eb7fdv05cfuywyhu5c5pf9972rzypsyx2nbxf6qtiasckujfgd5j4aje9dfc8p42vkelvuopumo5lq0zmcixeoqv06h24s33s87oj8r2msqyv3vnm4y27ye3fut63gfypszleqg398zn3s3dc3esuneklb0tti8thtc8fqnm9m7ppvbbmpt79tzu01vwpv3aeusf5s47cg2d0lvge69k4uvlypmz84zxsgyn5wangxwkaonjimiu037jtahd3peiuparkv6xt8845gw8b8095sco8pdkj8gzmzaswc1qehmoctg5jmgc431ursfadxyq7cq831bgbnnk3k2w8zo4tj43d110o58brywh24howvyw5xz2loqawc6sj74jh2jl3g7meav2knio63wjeehhivui',
                mime: '2vah3l3gskxu1v4wbe75j76x6zd6gxykrc92oes1kl1g4umnw5',
                extension: '4jt4kgo0g4vlwgzl652u5i89zd1vxcb52keemvtkvsyy1uf3z7',
                size: 2752126708,
                width: 600524,
                height: 288015,
                libraryId: 'fb062bce-7f30-42fa-b638-90fb4a70c71e',
                libraryFilename: 'n5foaf3qe37zjk7vsulpyyxn5gjn7mupyn6zqul80niy3em1or36p5x5h3xnrz8x4bixgn7sj63d8jt8fp915haoo1cetip731gls13dr7o383fdzzajcaukol673062smtxbgj0uoj6jzw8oomn6mzibd79qhdy31aoxbfli4pgcj2c47kfrvdwmvi2l4iqt55ku00o15hnx1n4lpbrsz51ihff3m26og220kak9003j7ohdd74rwsi58i9c4o',
                data: {"foo":85334,"bar":23095,"bike":63060,"a":"v<d_?q<qjh","b":78235,"name":33399,"prop":20459},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '068dfc77-f326-486f-a68c-3c0a495cc3b0',
                attachableModel: '68eh7her87nyaiebqs5fvcw7sm7rwm7gvno1h9wvx47ruucj9plgilz93lq7496c6v5lp2q880c',
                attachableId: '38e45116-487d-48b1-8ec6-cbd672796b40',
                familyId: '15449d80-5e63-40ef-bd3d-838b9aae422a',
                sort: 819197,
                alt: '85ctihxle7oxg6wcei0mdv1benbw8i1wlf3iz18dvuid3ynd2ayaaumrkc41htwe9r6kzxcmxffao4cvtgbqa11xmjjkbovtezmi1cxcqg0wfibebp1zpv7fhooshhfn65vi31rgp032gcy5zcenfvrzg9xua28mdd3kb2ohk9csdgx6kx5x9qabqyxll0hlylz29scxxmg8oqb0ft94iy0xyt8v5c6g2ajfi63t50539qsa1w2hks98aicp7ry',
                title: '5a1uqf3bte0bs54z8o7e8sxzeicx0jc9q7g2p2pqpmcbu5vz722c5frddrsb3xldgiid22ovy8g33utrv07tlo58vjmy22ef4eaja4u8gn0j5bfr5eenkj590vj16cqpy3o0gjfqf59kahj657wbsl0vn6606pfnh8gk0othnii2qo8bio7afbw6qt5jqdwmituho3wix3klxffotk7bo2e1deh37tc9sr67li0caguivkruhea7qulm6gkfgyd',
                description: 'Corrupti non non maiores atque harum saepe ullam molestias quo. Dolor ipsam placeat consequatur laudantium quia aliquam architecto nisi. Maxime sequi sunt vero sed voluptas non. Et necessitatibus sunt illum culpa id enim quasi numquam.',
                excerpt: 'Doloribus atque non ad. Error neque id. Tenetur omnis ea accusantium incidunt.',
                name: 'shw3vbmfha16ufw197ssxfp4wj7qo8vuxvpmicr6ti7oqyuq7aqmqf9f0cq0tcobv845ubywgt2gowj3q6we1rq1nf1mkw15k6a9fe1u5virbk9hruuu2jmixkft5muwcp06h8i7j1b35vvjiycumgqrns9n4k5gve6og00e3jpxbvnzwyxq5rxzkrqwqh5jn5sn9o1bz6zbxhiov3by3267xzxzy3gz1dsmn6pzdj8xfra4lqf58wqimlf4mzr',
                pathname: '7q37kpt3dndchdfkb72icgmsrtuimkwmrjequpze4aawugl3ox0ihzm5rdb6re65u8jguq9jd4uz4chzi5gxzwqt8vnkz69o2w8atp3pebk6ejknm9q3v5kr87vfe2njj0urse8mokvqmwet2b53vpz72zfujfa0rmet1h1oc4s2bjpy7p85qgb51eh9gcvxqef9xhfhln9vrn8c2obbflb4yqcnoohyo2irurh4ss7p557mvged2wtghf8gd2vkbnxvhotvjy84zpm0025ml9jf5h1er51iejl5t3tbqjxgpbhfkrhwf7svq4bswh1bbe60bst4ujo0nzqc33rf2m8msk6k4ybi80x2f2qw9ee4rkctp9pe58rteaygwq0n3shi300qt7bbcv1au2k8yx1psrh6mfv0w53xpcbw1vo79haub63k39p9b1ga2ox86d8ypyn5zt23spvgn6c8c7chcbri9wqnu2y8wstoznewkgufajuby4i289v2rwzpo0vz1tjsvw8wqq25128ueoaudbq02x2jup6fplbon3qvdc8q87nvfvo49lefyjqoanwog6p0jghwrwf5ijb687j2ku59b10ox4vyqzs93bu4wwvc5t6gk0yie78uao97dle0en2upmq92ykm0072y5q24ha39xrvnoyhyjz44x4nlq2y74z4qob73odtd63ul2mg8d0jnc6u8be1v3b1jurp2hrpjyydil6j8e6el4bjxf2z92awq2dl45tac34mujlexqsjltvlkb8tvmjsyvwkw3jtpn009ykeyjtufvnf9o2nhjk93mpsoxa4aa3vpvrg710c6sfqs3bjny8pclfgddoutzq95yl5tsolivlqnai1bguck834t7s4fx0djy2vf68gv5t682jaltp35kxo69wn4cqybsj2rbut5d28ar0h72fsv8r9rs7puukd0mhe3adh07tgtrqtr01y3es4x1h6fnb1h81oizqbnm6666c9b1qq6t6ah5p12bha',
                filename: 'lht1etdijj35fl2waxsaicviheuwpmma9re0lha4c40tv4ogkjjrf9wv3num5l6s82xwwxthrwzlpcjlskgs3lv29b1cxk27jbl5iejptyegwxy0s5u59k30gyh4mk9yydjjqgd2j2fqhm42gxhobzrn019ipsj0ohwhzue2exkuz83nc6926ypnl3za5c9ov3f52zfj17mnc2wrqee1nsr8nfb27hyerdn4auplbx8w4x9c9hzh08br1ui31gu',
                url: 'gbahfhu7acp8kfdjbnfol9tcxb1r7rej7m537brdi3c1abye5n3lo0nku0kttkymxdmzc3cyzswoibkn3gkb3gnfn8to2sgvopwe625aij733fhotgzlkjmj1hrds88u8b781hw5a8be788gxeha6hoe67pnlj0vdi688e16cfcmxzic7kia5nlhvfchyp1ilx1ewbla4nqapqdd0naeonyy6o3289xovek7icnxdsuljnf7gg5tk6s8n16fww5y2jcbm5jyunomb7kqih0y7t0d8ntkuqvu014jqducn7mymopvx6khwyhzsaz7x9tp427vvuxs0idufzb6q74c5bxzv5whyt8e5u9phq8fpeqop1hg49u1pgl8z49fu2uj9gzv9ulp8pihwd06ay7mlwxn3ici3bgnt153o1zijrc4fplf7drvyolaqpkmmbkjmi7b64e1njw9wdlj8af85iosple1b96ib5i4h2u6bwqbhnjuxnmmfuqun64ljj4l1y9do7c1an98djyvfpmpn8yugzy4q4qxvruwml8p7l1de2l6v1ibb1f1zwhji6xs8ptgszq0b27e0bb7jo1g54oapuuz62yf78q5t1g873kduuvbm1d4e6qy7nz3nq3joucwc3qimmrjfwp1zvvxjpxscj1uxwpe2t9xng2u8x0qr0cugu9jwm3gfkn92cr25bv3arhofcw2vzqe3k893ginavijdgq3sc7vkl3ykj9foyaxd8mba6hxmpdozdwb1jwdipoa1gywjd9c97vx6ap79h24shvlbkowx4nlln423m3yuqoai99uaeh6eppw6p4tsx755qoi21ljih7xwdkhy7cwpelz20ux2txxmcj9wzxll7pp36vjnteoodxz2dgzebla1e5zgo6suxrrb26777j9irv30q24108urlm2z7wvvj9mzmb42uxtin64lnmexti6web1z1kvij7svb14y57n1adyc0lj1mttstzaj93mmxwozz402wbwa6ue',
                mime: 'dgz2cax43b5hr0kcauafhth57fum3dm6qfumeeae6lq5pexuqn',
                extension: 'rmwglzda126dzyfir9ginicqjaro4nbsdjyfrmo1vdz75jw9p8',
                size: 3738645592,
                width: 687523,
                height: 250058,
                libraryId: '2wdjjrpxwmkkann0okjpt6djpgjjupc41kyml',
                libraryFilename: 'a0jg3123zr76d6h1g3uytx461u9tbv1by30xn0j1vvi0dboodew8izm1i4qongl943432eh301tu57vnjivhfku0i0tkbhb2sy18kim2ukn7sdhc58un2hbmdxi2i8bdn71r6v5cy8jpw8cqitecc82sqnepc61r1lo4bsi8l8qhkewns54vd60iahziaa5txzdrp96kmmyg44vo22jjnkaa7k2wmdo4mgzou5rmly4mil7n4wmrpzrfjarcp4r',
                data: {"foo":39710,"bar":"ahz4C54TG8","bike":67663,"a":21472,"b":73977,"name":"y/g5s6;t!;","prop":"gl\\UAUtklK"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel is too large, has a maximum length of 75`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0530d559-6e65-47fd-8067-5e55049767a1',
                attachableModel: 'g5pmn5fydg3kuqc28y5aryhyizcw3fo58slthnaz8f7ovk2n9vbamjubwmgqhr0k2jm5kevrd7yi',
                attachableId: '94df809f-9abb-4942-ba85-6def4f300238',
                familyId: '628714b4-e541-4aba-b254-dca0bcfc518c',
                sort: 662865,
                alt: 'c7iw19llgi4f7omxbgtwpp8b98o5tmf2mt3z1l6armzffwazmgorxsr1acl20x94ezsvqibe0wj2b0tsclw4pnm2o4qnwgqmm162f32w21o4ty1gnwwjjj6gqn3lleks15lakkg8pxur89u4sdc03ge3eypel4anh3oryhtf0n3swym4p930shqb054ftnnqehgksg35n2eeclir3sfamow0qn52i0cqyt0gn7qfp5reqnufb6fyrg2p3t7cy4z',
                title: 'upkmn03thk51vexkzz2t1ddam743fqv0ywqazngq4qip3au0202ebkn29ejkedhy3j6e71xc1qi99w2top5oyrroe99u5py9dnojbnr3by7fs4albvy62rlrwr0tezl47g238k5mfohtegqbx3x05divrm4ezghw6xb9haqbpsi3l8w0eobifw84wwzkndcxruj6kt0khgqt8arrw6atimvlyjjftujyeapnv9zxisqdp9yu5la9etlu3bmdfwo',
                description: 'Deleniti qui velit corrupti molestiae veniam et. Ea qui distinctio consequatur et. Iure blanditiis iure. Voluptas ut assumenda voluptatem id adipisci sit. Sint eaque iure laudantium modi qui unde voluptatem sint.',
                excerpt: 'Sed quaerat a consequatur laboriosam deserunt saepe quidem. Architecto distinctio eum aut doloremque. Voluptas error impedit.',
                name: 'jr7qwwalt98ndbjb3xuuz9cyhntkt6w4q9huhvjtmkucum1795dcoa7wjnrdu8cv23j6bo5hqo2ubrleloy9biawwyn8nz6badlci5qhk75xtf7wphit6zwaixxlgsz7yn3n6tbupebz0zdquw61yv22svoo5h1ocn6eo1j5sntlbb1orxhs2arzzkwdfqpbpun4wxbubmzshcdi2m7nw0wnw3sipj5k6luyegt9rm57k7wle1qb2zl78rz4ixn',
                pathname: '0syll6jvptkjssuq69ack8pi5zjc52ufnvhsn1xp4px4rj5539e5m7jwmy1bnax7x4k9qqebc7e8at2dvu92hnxx6scklrjojqvojs26gmp1n874mxn831uk084bvfqjjt4e03z9cfs2sywq8mznrtqj5n65l243mz4u9tljaakdeffnzz7lqeyilka8tle7z8xiudu06j6e3zysf6lzznny8awcvb0r1o62gz54dfc5neufi2oslbf6xyarg83u4olj0b8ykj1gh3tu5lc2bhupv8hr9kniqopb1tbqeek1jj6ej6izigxuhpjcbv2u44s1cg07bwyojd65nldmphzcx8tnlmq2ihadtwkqzqtq5w655jccsdiiuek0ikfp3v89r3yuhx6w6djanpgn629r49e8qypndcr7riz8ukjm1bvdfm8vm40kgh5oifn1hsz6ytce38chmf6gll8rkawwjm16jjqnvtwnktyls9tfcc5ph70a5qet5jqiwkwjnefmkv30iz31zxxg8n7qs5noml5es8z4jv99o6y4ryyzls6wgtvxullapgtrn5hyrrvm55jcvdx80aadsl88yks2l9bnlzy2cetxpp4t8e455oih1cxu4zyoag2no49hk8liywj943ghdas5nq19sy7b41zn4og2qy0qhhr5bhhm4pj6obf8cs01n8isxob64y4hgmguzpbzgcv4vx69uotut4925lb8t23fpn2n4l7383xqtsbt7nuxo7hut6cpt8ytax66ugnhw04jrjdcc5jnily1xyt4icgy15aaow988ta6n3j9f4id6o307d2b0i380twq5vstsw8jw150qz7tfuiavzasevqeix4qsi4xf8qqgpbkfz6mk44n20on44hqzda7h43gr9d4yny2htwkk89mbn708uakb7gkt1tgnm6y9zejw21t82fjxz9605b6t43phglmoi5birgfrwluqqt5ckhnv0xgb9g3ctr2hswq6axzrarff88zu443',
                filename: '8wlstgp3rexb3bxp2oa770qv6nuylv9npsunulszm8a4sme3hdua411fh67w2lzuvpv47k025kjvdre5pi4e691ig8aq8dq5271li9oxax6mcp9fb6ar19ik1jrcot6y1719ijl67hdj0lu2twb142ju7zitjsp2mo70chuv9povgd20ji70lcn0g0nlsqabpqm8fx5z1k2wsruhcj4et06fk8xo3km9rxgnmowh7dvohhbklt0jolza3m6smpr',
                url: 'ecwsh9y4s01nqfr9a03xd888uwn5vfgf50v2x7j4oh96dp2rj90rji8x0ee0xaqpuz8gzgl8p8xbmohviaphqin9jt0s0mnr5ffourgotygas48qteom5dems0sok8updwyz3hd9iwkeonuzzenjdato1cdeo7oo602ayjrek9dbyhnbhszskkvf2fbhs763untehusdyg2y6e6ggiszkql03kjsmigjll2ln2e0pozmnvg6k1l3ig1c0t5khh6ivthf5irehgpubj7x96rg2m4f6ukev3czd1xeo4pnc0r23oxihwyjvyl5elz9m2mvgch3m59xfsouxx2fbth51thre6u2hxbvrl199oaqr4rt3sgdfhwbfb8cw6gh9uevsw8ih6g398zmrdpuew9skbie4waq2tnw9nqcucki61vo1xpx0eh4jxmoj1h9kookveggyh1pms1ag84xnotqgpnnubjldiftth2c11kxyzwa5lzki8vqzbls9yuv9szeso7o5v2usb3wo95698l2d38s7oxcih5swavalz24qxoni7v0de40osoqje9r029zkiram1rlpp1dzlul4susbhm1be5k374inhp0vo9j00t1wb44lbfmo6ai8fcafvigzum7zdi7a07x5qzp2me8bln08jba0qd7wgg7g5bu2ayu3ewaj1f8p83hrm8ttewfxcuphmbh6uw26fdshi3p7hzbxt83bbu2wxn2lrx325ga3bwsyn87p3v684u6v6gsja4gxpdj5wt2vl5cx8h3tpd6qfszcogd6edgxtbfdsykcjbnvzk6ailvxodskyu260ad3ksxexawd6qm9qa1g9y2kkstrpwcq4gn4tg8lcqtc2m3frdm3ppeimlj4fmflwyllmj0ypsen9zakqmvlgjy67zcckebvw3bflsn6rscwo1vombuv18xb682dlqyz2zqy1yu6gv1mswqf1uxrorwjbooik9taeksfj9lroy97a7wylqcebs7q53nsjh8',
                mime: 'ryk9kdfpm5asnqc6o5xd5yk72jb5xbs4yzuopkg8cnhzzq5hlh',
                extension: 'zfcbdhlgr7myjbpjlvr3k8jl2iaa2liwqipm1t4c2685yx1mdl',
                size: 9859791776,
                width: 707792,
                height: 391126,
                libraryId: '4b9079fe-f149-467f-ab71-52ecd2c89e84',
                libraryFilename: 'cqn8novgtqsr6dkg6k3oecht61n5jhjesg635uu6i0mw0hxp1k52mz9yx25s4oi1b0g3p9hr0vherdp9un7ylw0fkew6voww7c32qa2m1us459b36cg4xycic878nqg8t2dno1sft6178h5c0xsfz2bdc1dwsd0goz2p7yk4kw0ozeqmzmbbayv6ejqixojewwqy5qmj7elzeb4elialc93ybenfp888j1i7axafbj0b96cbfg7rb0s8uib03b4',
                data: {"foo":71370,"bar":"S$1u-zTOn%","bike":"g}zmIew}9.","a":73689,"b":32536,"name":"3x&`|2I;2\"","prop":84485},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel is too large, has a maximum length of 75');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSort is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b99a4581-a0af-4bd3-bf17-1abcf028f9f7',
                attachableModel: 'fr4efn0cug44emvmp13y0azx1yrw5v22ox22ptmav6k8mek521jm0nzhqak9d0dkavdtur8njew',
                attachableId: 'f5a067f9-e480-4224-84df-25aa23715fe2',
                familyId: '092bb30a-bf88-4633-94b6-bb964a3b8c24',
                sort: 5564294,
                alt: 'zutsojtrpkr2ovn2stciwzctl3hlfoi2b4kfmzmc3lmhby12crfcbv05k7wjxobn4k0gd5pqzpzzwoshg407cfllkmxwhhjt689t242i8u4fm8u6lc3drs1di21mzvhs6nxfbxukn4n7lar42skov8cn4m1s91hsjh1xpj6wskfsfmeyka3srmx9hd1frry17cnvlo2mnakaifj1p8rnainh3ahz97ajsf1rl48e5nbxoikqhlw8w5gr1wdnpu1',
                title: '5mghltkvokck14a2df7p28mm77ataz7lhtze7al34t5v5nspbrlpv8n1hdzwowtlvt7pc9kem82wtdjmez990o69h631pgvkv64whwshh6ndfwbkkxq7boaky86p3w1ntysachcebvbbvar47s4z1p4pqzj3749ds5z52xqui8gnfvuu2l9e8oc7fthk82xzo5fn579w9hxsc7xemv9ke4en8m0qofs250b4jf7jqmzuz4cv4yn0ii5pf79oho3',
                description: 'Quisquam asperiores nam unde non qui reiciendis. Et dicta rerum et aut dolore beatae modi velit. Hic et dolores qui explicabo id ut. Unde quis id beatae inventore. Tempora nemo blanditiis velit consequatur ipsa impedit voluptatibus. Expedita vel est ex saepe ratione dolorem.',
                excerpt: 'Nihil et et. Corporis perferendis saepe facere tempore. Temporibus ipsam aut et. Quas sit ducimus et repudiandae. Fugit aut dolorem dolorum optio. Ab eius ut alias et dolorem.',
                name: 'hul6cap304311enwn7ottvtwuav8wfv75gnuv2lly9yodtuls1adgml39f7230834w83c20hze83efia43kchphq8t2n0vu9bilq0nhbm5pz1gaaqfmzp2fektsr05buhm0aj4m3v54ki7lyg3t2ssdz9vw32z8moy689fbtaa6z58c5si4ygyvb88d1gvhqekaosbtuxud4hcyfpur2u88h3gmwmx5urz960tu4zw222se49o435h3k7v8c69h',
                pathname: 'v6j5gdlv7znjrb60gfrq30948g2uy6cy4uw7l9n0yllerlcfvo41jwrvatint2l0g13p9sd6vw10ie20auc8ki37p1jvz7lb439qj6c0nlfz566mrgztit1cqsufgb0kxyc19cwhyo6f3t1cnbpnetiegpafdwotw9m1p3ib2h7tgxgtzpkjcijnu61s2o4wm95ud07j2yj9v722oxhvxp2yz6xky6pejgb0r568framk2f5tj0lcwokobop91dz645e5sjn8616stmivng41rc3hlpewbw2e08qemoz9g1x3f7uqcuax5ao4g16rcu3rgpsaiwgrm9u5mgxggn4kni4d5qolk21ovt4g1rvy723h4xfm2l77ugz58efz777du5ximmn0pr1escq8h3ew6fdp64bvgjf88cl6ekf7k5qkxg6zxc9p3fj2abbflqitatz8uuqukpx01fxiaghw0smf4dxfkwaqcr9mjdx6q662oyowitnni58wvs40iba096rt7kg0z4egqnxkty2t8ia5cnjm6u1m7nx3e7q0mta3b99dq6hpugxhsdd7h7oawrwo5b999x2yaztmprcn3fdl8s0n4wkp3suzxsr8jrcr7unh5q809mudyf2z26shcc130340tlfqilyu22eo1mac00er2w2mlglwphp3bp8zf0fotq48osb324digb8urokj47ms0c74s4r2u8p8rmaum9wi9ukaqatbqrm1vg0rlqwobvjhd0eavzyqopwa899rmhcr9rmc4su868uogkycd1n9eytqrqnoz9266sxdpfor3wyme8q9ksde9304atma1fym6tccv6iycxzfdjxytedoeh1ywfchgottp8fqdj30n1criwxwcdvvuz3r18s4jjyoisfmku5s58d11s9fdchmi6vu4f244enfj612tosruunoo83ajd5pdciux5aq4m4eerjjy6lk36cjiowuaodkrudoogyp61pm1q5xpkkntw36776fkvxmlxm',
                filename: 'dw4qufl3kszsw1gcy5k4e29pzptdk71qxndf9rvvlgcr3acx09kz4u8lvvfyfbycwydzons7u3xvwj3d4ibfoewfnt9qz7mmos7gp1qw06vunl2py5v9ct7ya76q4qrpwmja3uweei09saky92gi2z100bkarp5y3trwgvoy7g6imhszl5yicvprhumqdwv95manc3hxl8msw5da3oixh7osve67gagt1qfmrtgyktk1s3swawt8fbokbaxouij',
                url: 'mwn717wt5fa5lg2k4pt2stgpc8wx9k16sz4oa7y8y5st8rhn0harbnvyllwvosgq76knj69x39cuj88kejf1798fq8u78c9vedspaqdgjizt7vqxeo5tekx458pz4hcug6a35yk5173txyd0vapqaj45pn4oy259rmo00ct7xm8ceseuretjvbpktbe7kjk98eoi1kl6yhb6jeqgoe06zydiuzpysv5sw07j5sy88dol3vhw066qiviwha38n4y3vr3azr5o8fmobw9v92id82mj2resw9okalk47ui8wklk4ii8q9vnr8yabeyonog38nd8rp53d1v2trjs6vcum5m6r4engtr3vxajkd0w9f44t0h7c9n4ih0ztub5fu2xalqxghywutfsx9urfq1dr3af87ie55xzu0dxedb2k18jdiobv3y4pzhbb2arkczwuqq6shfp8zpi3hy8pn1ifjl3w7l0o11fe633nwl5xsyg23nyavfi1ar6ofzm9qz06dmh0tmtb8cm7cut7dvbqkykglmg9w5w3efeo1gvdzvz6vekehhj7jl9gu1ddjzpvt3f9002y8z6r0ncdhszvzterfezq0ia0fdhtxh2qsw16xsbw3vmv645b5be0rndi0ikx09qvc7ry9q67r4bvld05hmaxg26m7ouz7al76avg90i4cchhjfwy2iqypxnisiada42h8kqyafppkn5fikyuepb9no29l350r7q0m29ht5f9hfh50uno2zuepqc2s6il404j354ejfk1l011gyqp71d3wyh8266tjgftlfdb4v7qbmm28zk6fx3ax70qzgyfkkqwwqh6u1o8gzo2yxvdw3zobih1vtt6kh6cguydza8t3ci9m3zlpbtdq8ie5lwws290anwm9goxb48n6o19vbuusogubahcmxdojjsbx26bckz0m58ll23unmphtu4ag7qegvsvgmzw1lvtta1kgzyv2nvxxt2xbgzlwikrl4zu8s514rem6gro8z8',
                mime: '1tlsceol20yefrazwl6sqlgn2crmzqhbjzy7i1gz2vswdnughp',
                extension: 'i6o4sx7m388hqyr9ipe7zjkq248zhrg3b2e38m9poajh0zo3xh',
                size: 8859074168,
                width: 260163,
                height: 875843,
                libraryId: 'ff341674-379d-4dd3-b604-911a1c62cafe',
                libraryFilename: '9mllmf7li3g25wk35182ygl76mbzevx6yhlcb3m133ze1gom4ojapm22l9s3q1x4yg28voxmps02uvbhtyl5jn4krjg0xx3craz83geqyyxt7go7cl4dv309mlm5c4bncbsv5i19sehsc3v8uts6i46bwh314dzohbr03pfjxnik6rtgz930i86na2eptggngt8lxjdxlacw3l7thon338xtchwjllb9x15qix3p4tn0oq3hf4dj1k7x6ytu5tw',
                data: {"foo":"?4\\7oAv?e6","bar":"Gr-(BF@7_C","bike":"NLMea\\z::E","a":18131,"b":25848,"name":19965,"prop":36269},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSort is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAlt is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e1dc8fb6-a795-40f8-a4a9-816630fbceff',
                attachableModel: 'q115u67fuln1tu977lpqzja4ab5s9lw1awb1ip9ipmthoevfadgnm0plegb9ltrbaf20dx3806i',
                attachableId: 'a05a87aa-e92c-4d2d-8e88-dd7086c0d8fa',
                familyId: '63735533-e861-43dd-9989-7e1db6e92dda',
                sort: 239421,
                alt: '0dltlc9gz9qwc4h5goo336ec73nohhxwuq3ezxo391zqvhef052fozwe5427o2t5foy4iowfm7dg1c8uhxabmb2kkat01pkvfimdm08dvuozga3biyxuvvvbp7xsvmht8fg0xp5bb3c7sdkvp4qh15141i7rxz2flc3hg242iz1azns4n6zgxev2mbtzaktoistzvco811b7izy6a3x7xt8ggr3tfq4d5e0b5hn7iy9wux8akbiw6659oflcb2z0',
                title: 'qgndper3p0bpu3i8g2yld7flslvcffzvdu1avcrcwogpb01wwblm3d44j7l3coko6guhq0dqvk22g91c0w1879de6k1kgisrr947mlwvj3qcdshzd92s7h6dfd9ep1axt8gjqq4ldejgr3t7quxspvk7xn9uguzeq0t96uhjktgydilfyvu2yjd42qalh6senrljatws076xp77ej5gn2hzc6cer7qkofyt0mkwflgydw1e3ftwf8nx4v67fsdh',
                description: 'Perspiciatis in error amet cumque necessitatibus. Dolorem ipsum voluptatem sit iure quaerat repellat aperiam nemo modi. Delectus aut culpa pariatur voluptates. Tenetur dolor mollitia ea doloremque doloremque.',
                excerpt: 'Dolor saepe voluptas nesciunt. Harum et a ad cum eum aut est nam. Nemo molestiae quia maiores et perferendis ut et.',
                name: '64rre8hli4c7mu8xknm8uukm4vyzjxtv8aai4eecpndmngeonhpn2yppkll2jl7wwo517cjhvzg1y0gsbbsuh6xr9gqnazl30qpbi8daw1k2cwx6nc651fadlb10d7ttuq224xtbnhro8u5rj27hbs7c9k2xq9cfz1b7nheroq0ta6giw6t0hvla004r6z5on5coowbe9jjnbwgiitfaf784gsi6ej4v8way66dxb2goilh066jhjuq2sfk31b5',
                pathname: 'qttpdzw4fwupzbdmwpqa7nlw1h8kgt6p7m8l14g2pd5hdnulpovo96c4qvcyrdac1rc33mhc730vpjynebcz6brw45b2lug4vidz5n9dky1tbviilfd7i3pahorapanfm0c8web3bcaeqjvo432sgo6cqspwew4aztyfuz5l6l328ytp0j6j5bbrue9g7pcjme8td0uivm2evm0vqu6il15ebbfb2am2rcphz0kik5zg3nlxdbcjiz5x5q38yiiu40cjfm9svj9skr3wgyc9ociaj95ryrbo5fwfixgyt65amc4q7g0b8wd7flqkvl2f9mymnlydh38ncg8touilvhoqoajs12mgdvue7yk9byhqbn3w3voc9fozfj9sktwalss64dvvohq60rsu7ko3wzkc36x5ijgfnwor1el987443dvffdeva13jygm2jrr1qq1kwzqv049v08a7wkw8nf9owjcv2m58mgtakddwj0yn48mm82fb0fy27nuqrd4i38hihjqq08w48xxqumaaw3yd7nwkbgnijc0y98wvxjebh5skhjorefb6tahea3kywpqy4kpei8ygsojwehekvt9ytmrcenxlm67kyd9izcaix95wu1nsihfrsy244j0phuz6gk6bsqhmv6rpp689417f0qxgbacaug1a4tth6coxs0t40keu0d375w40h1yvihjgni9zfw5h36metj6g46d5xs6x5ak08tju4wosfys84fs0becwx01gzda0i6ant918a3t2dktdu6jxnf7frstyzphw6x3nq7syo8zqp4u719wvluidtlehvonmu6rscwtjwx186i8i7lsznb8puwdk3cdn90dkiqg3msdanyan30hd6ioqidh67grw2iyl5feghk0etp1fddjm69mz8yx9g6olbofvc8xmmec35qabn1c8ym7595vkrk4q4a3axsyol4jovopysy65nmfap9p79b6ihb8nzpjhkfg58f78pdqk9wr2ttvad14hhltz',
                filename: 'ec4859bw3fqd98zyytheujheyplyzbce072jo34qs1d1fm1g56nqq4dlbcp826t6stvcg5fv0j8ck0eojzjei0ietmxal1o0n6znpwlj4vthqc7rbov46i2ej3q8ppliimh42wb096yp8osgq9uiepmceii4h515cebuzvqi695o3chfetaqb90j3p63ift5v7wwfkkuwuq2lkavxuh2f3frlihi5qi0lavi4miqchaz7fq1myhpyk7kvh3f4be',
                url: '3kqqpae8ncqlcopagh1ak5j7qqu0u312gpmuf4ei6iy6i59dn7ax3s7qe7vkh0gttep7jrb1mo3too421mqqedd3v6zukz8xj1cjbfg7s05dcwzxyq7t35hudlpysxr28nzmiu4zr2wedm3aeeb69p13zqqw7aimpr3wmxz73p95nxvaz2wzd6shrinyay7z3n4bxphfpg816lw1k5b2mgie0m3w4pez3k8rf6s5w39b0wq3t4ei8ep575uokvxu01z048uk65hx4ghndwfevw3n66l7909jbq4812rpmis2fdrfrq4gn28jj3bsr0fr71slwewv75f7pr5pix08visbg045j28v4j11oqyqzfpunuk0fulc4mp7yicfrxlos2c20akchiqefdpxsa3fr2dldwbenoldw4e6os9s154sroc7k3v1vawq4faojjqkav8n3p3rts6n78kjjunznu114tld54abpvz548r2gi2rlffqsezlv1hbp3slw8a9d2atmihj7sxdz846yai2s4sg3g3xyjfcw7ruadgqh5pvnrtqyf5zkhry1sensg4mn21yhzinzc4q6n2klbrck04spreuescfjq338j8qzqkm2rhodg0nmos7mm2niybrzp7y3xk284kjpqtabxf076ospec0pysceomsyyhz8adyncg29pxlhde1qwy946sua64awunhql2vcli7vl8s7b15vm1cgulieg8f6393bvmgjwb5iokkqlivi2tr6xjuqjetmjhnplaozlcan07tetmc62gkv9qv5tu3v86a1ksjejahknbadykugelqfpcuqul8jbo5tbr5v26jhmdssozy5zjlqpswvlrzinr4fp2qg9q0s7txkkc1rf9739y49ews117dkgk1rz55e67yntots63i0golp6txw30yhw7yhj1f07jcngz9o0l5b7gxh9le9uvf3afb7lgk0m03qk9w7m7r2a679fp0nhvnrj0f6fh88h9izvyx06c7dgyh',
                mime: 'kypp3pzze21dwyauaem8d7j7c5qvygoxd4mi4dnux7h9088rbl',
                extension: 'l2zbizsvjeav0vkj1a9ynzlkwdp1wwn8woddd31oeviw15gdue',
                size: 8515722589,
                width: 237097,
                height: 829782,
                libraryId: '8e4a0b11-3a32-4090-b284-30289d1ec04b',
                libraryFilename: 'm2kxw7upeug8sjz9ryaszh7e94mp5uo4rtd6csg2huj7uj958hkpl6zuxawh714qke5qobtrn71xru2rr6vmle7m250wqdj14ka75ka4936dmk17wwfs1qe26f42evxswi5fmulaoxhs6fpqt9wsm07ujinwrbthczk3qerus6wz7acdh35kyaywg9wshomhonf5xycc1om8dzuo8tjixcxqopvdff1trz0ng8fd05avdmgq0t07bte757ek8u6',
                data: {"foo":33338,"bar":90113,"bike":76085,"a":"2<nm'_LC[@","b":"\\t:9Fnf_rU","name":65514,"prop":94236},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAlt is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentTitle is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'baeb665e-a49e-472d-8197-4deb99da68a7',
                attachableModel: 'rtileq5bx518ocpo824kax0vba4ii2dng4gdcfif1fy4v33qxq400kolv26dg5r24gkuem0swo9',
                attachableId: 'dafd8663-3c18-478f-9136-02e30141b1ed',
                familyId: '6d902924-abb5-4eda-ad55-59dc04eb902e',
                sort: 393366,
                alt: 'yfvul14133l7jhjg6zjedbp2xpdya9w0zzhb8mtm48iooptwc2o0vhxfsy7u2ae4lrqkecc0kqp1d8mdq6j5gox8w085tueepi5lc0c3d3pacotu8s4kdbbx6ajb76fd1i2xr2g5fjl19vdy7aqd48u86m60030l4j9kk56e5vygl589rql4zllg7gi5dp21ji3kj835lo9m5mduiion083jvid1cli5gtlncnawluhzad0f76pczrpmn7agbuk',
                title: 'yoapcobqsysfv6sdxoxeo5jsx4r24km12j90z4hyuehcktg2lz4mvjshz1bujsnj7xruzak1pj0aqptaaogc7ptiu3bs4hjuwm9rx98k3zxuocs46icp8iqqn4f932q3ok3v6co824s8h8810tgpmqfnmv4taohbkedfdw6xpvusykau1js0jst441kgfucp2cbjbyxt1c1sqnvr9k04gje74kz8ii46humx0qvtibpnvxih5jo2d0b07lt9h1tu',
                description: 'Iusto ut magni facilis. Et asperiores consequatur. Consequatur quia aut in ut aspernatur laudantium.',
                excerpt: 'Consequatur qui laborum aut aut tenetur. Rerum eveniet numquam sed et fugit accusantium eius. Cumque magnam id commodi adipisci ut inventore eos pariatur molestiae. Minima officiis deserunt quo autem quod dignissimos et.',
                name: '9yp18l9piy2w0ujs6kde3pfk8f9t7cpd1hvvmaz2wdakcnh92hnr2ctn2yyr5vjpbqjb88a6bxjs403mlaa37fscv60tirjh6j1f30twgzkeyaha37uk0wss3zlv7tw8qql5ai56idudhtvm5dtu1yrl9czsrnzv4pqqonyg59gwknl5ss727f2ge5j24f72xksugno5s7y44c9ypc7mvrbaothkxiywxhgcez6hguve27cq0vm3in5mbgfawwc',
                pathname: 'ox76snlar0a0le9t3o7o8x6gyezwrzyfgfdpnrytgp4mlovhbs8lfuutmn44iikjuwskjy7haovhvjhovjc3rkheh6jh4u19rbkcw8kp6jdamhrj0r87dz4lh2yyhd73gb4kpukcb86rj79motlj87rjhkc4ebu2mm9ba30japbumdpwofmvf05cugueydcfs1ojbppdp730c62m1i7to9r5r0g29995uf48d5wzyt2uk9ig3naju4os35v0uao1mcs82jfm7s4imsaxrkezxv86tzq1y2ldevpdbv0i90fnscqk7mabuyqirdbhaf0u5mz60dje9ew2yqrupzttkinpg0sdnrx6zdxh1epre35ro12gst5kplg0r5lpobxnwo6wjpsewiksa5s7nzy4wvns9bk6b7qh9qnlo5si450ntymd0j3noa1n9mxfl77f4qehddyo9t3cdh3qac4y4harm3lqlzt3b9xjdy6q8ffajjmagt3n42xcuz14wd4vezix13x78gwvgme49wlgn2izzecm61avboh7205zw6dr67jrvcjq7fkayfu4oy7h00vmokdh6u5qf3fa97b96ic487sf80tt4bjzyhs3t466x1d0exrr04pjvw03ub9tcj7w9etznk2hktvyew6a87mdclnvx19y84r4gofpam27ri3ve5475ly9behccyrm0871425zqk3qvhg1ex71fd7jz9iamcd2bvk8ip6w1nu0bzhp50lu84pk537quzmt3azdcu8sdk82gn7s4d5dctyltavymu1wvzsituloj0iiqwfv539l97ztvp9obdysb4alxhdiri5lq4czwvo81y89awo10j4l0e4a7x6apwtl9ktm3ptm39zlihw2k043pgppzm0jget1frjt9x6i365186b7cb0hwven1rf9efz84tfv4p7fo6jdr0zu7t61cw4duqb3v9wtrmz6hp0umeu68yqkxo4d1peeduq2ng9v8jl75fytw76eodhlib3w',
                filename: 'dyyr6tin3h6fe8ipycbokfhw3224rsiw7yzcfzjloydjb692voz8im7isk7g64ui5ltuvvgngtg7p8tjt8v8xjisjulh2tkbm1edhyn3oaq40cqqvonzdhzzvmrrv4uyqsrpsn3r1ezi9f8em0xatzfsljoj1sa3dt6r2hy97ffirntsa5sl9bsz54k7korv5zlbwgyofusvviv7dum4jthf4quigbiis02w3thrvsagqkou8716c0v17zhpzir',
                url: 'kvl8o2rsahpkf3587kb23cvdxhyyuxiwfgd5tdwknxs1sc55ayjl61guoss854lhebijhow8bcqsak7trk4u0xrcprw0unnkc8pbi0sbh2hcbfept2xzbiu7zdg1czld5ov36usx802oni8ekqpx9e0od4qjf1dqelyzjlbstqff9j7itamp6ydan1780qewraqsfhp3n2y7jtdtrrtlmqmbypzg4ssxyvbqbzmmnut2aum7lsr9l4dl5wze3axtp2k7mvs6x88s1elmk3vikua27lffa2yft78y8k4p1935min00suq6f5sbw0sdeuy1ywuk0gq4hewg0cfpe1qmsb1eri1rcbra0lvo1zpxz1uvzdyewrrxr47kci24wa5pgedbkf0w0j5exztz5o53m5flk4wnfxcmqyyxuywdvr3s5bmaikcervmm1c5nwib6zlxx1bee9juf57tmsvj22y0ctv6zz8sisv01248pj7dnngxxuqrvp7z1nkkh42d4dlql0s6c3o1n6q645psccrlngphx7zr98ed5dxb7hhma63jxoqxno5im8dbjunuvwzmuzgb4x1sc8jnvee9awo2kbai1ngcpt0vx7fingyyy177m4hvff8sfoazksca30eoeg8dhc3wdt16flvju9xcj5c7x2llevn6znae3wl3m4esuncwmj8j7yiuyceruim42q821b8y3uc5vka9h155tf24wzaefolextyjj5i11h1c5ybz9cbulbihy36smu7ic15h5pw7g7xy7eq66p1t1vrjcpqh49t1fnkwnb6xqnaexib3uboqu0zul0sp1lfqryni3rwh35lkftmbqkrlykjmk99gpc3kly0xirbpz4h8ciwrbld47m0m8or72velayohfvk6kjj3l01fvpute07f685zzb37ezpzadorqynighwyvjpchfg92eh75ncxcc49dynqct5myt8r64852ausk9rdm0qas1hs7ukhxag27w8z98j28fg9z8gm',
                mime: 'nf3f0d1cv47tjn876s9nvaqu5d71xp8b4l4np8z3vdywv13g4e',
                extension: 'bop6yydnzeog0jr0czv2xfisroiatxy56b5nux1h8dkr8qa08a',
                size: 9125096125,
                width: 386093,
                height: 798625,
                libraryId: 'faaf2b7e-08d2-4bd1-b0dd-0f947708a244',
                libraryFilename: 'hbygz10yy8xyui0zf2wfrw4q5ndeucwr62m3fylsrln2v1x1fav4yov19ju91bg4khnupno84z0v1lsjpa4uxi2gp8cpuncpu85uizy2r70b2ntnlrfezyd9ipz7prlo3296j3fe3c309ml7910qegpbqdglzafh1nvt32i1s24e6cb6nyragnez3hf1p4lfvs7cxy552gdgyirnwl70nca01o8eka81gh15agknjgi2iprfz0zwhz7nlro0p4d',
                data: {"foo":"w{w\"-R=F?;","bar":"C*<l_%;qBo","bike":"PeD:6b9`v^","a":"@?dJmQ++.s","b":"w&JBY:4+5o","name":"\\[+4?Nq=kz","prop":18338},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentTitle is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a14ed796-f500-4cb2-918c-4ebe0dc5e173',
                attachableModel: 'odbq680hqi2gzvv1371yfphiul6ufr9nntlz4q2chzaxfgyw5ud9kojhv4fgbdsf9dq8ifrv9mn',
                attachableId: '85aaaa46-2354-4e3f-9c88-90da45c883f5',
                familyId: 'fe357495-dbbf-44b1-a869-d3df41e3b8ab',
                sort: 631522,
                alt: '22ehhnrc5e81wlv7dh7gezork8gsnv60vkyzvg7szwjzz2xcro9hhir8yqjwq9p4u637jvdksam3425v6leyh8fviltop1vgbnjlj0j3g1dbarareir4kiozszi84m7yay6j7r9mqzxfxk7ezh9n62x2ted3c71lgktss8kw28jlcos78oy0stf684falql89uvfc66p4cx8876lxae0ee0v45358fmlrh6h6thamghghkohbzffmboqz46yiie',
                title: '8soy5m4exrb7en0fc7q5n9bkvlz2opm0tof1swgf23m30npai93d3wq5wvnoe3ff8d69jfnaoz70pmumx4z5kvkg3c5hpa12daewgyko7d0xh5t7auuo80bbgd52fxop96n1vspt0ddog3goia7ws1mc5c0s47w9p858ttdrntukn0axaqbhodq26e3izlspumea6peqejjvm5kmhe8orlr43q0qzyp0t4715hzl99dikx9y2qibh1ritfm6gk1',
                description: 'Nobis sit recusandae quidem quos quia aut possimus architecto odio. Architecto fugiat voluptas nulla non quibusdam sit officiis et. Quisquam aut ipsum totam. Cumque molestiae autem sapiente. Omnis dolorem et neque nisi distinctio porro ducimus ex.',
                excerpt: 'Dolorum et est voluptatem. Ipsum eos impedit minus. Fuga illum sit et aspernatur rerum laudantium id sed. Asperiores numquam tempore. Id assumenda quia aut facilis sapiente voluptatem magnam cupiditate.',
                name: '0q1mx4ki16mb0s86wy0o8c2l0ukq7tq148c64gtl590nn950abro20sg6fvt3srk73iczd7zuzc93pvhqw2jzfeugnowgtajuy00u58i9yiwwi1y0aaletnrbi4qm0pejqpcfatoiwsn6c8es798kpihewaa1lk20xqw8k04kyk04a084bjshvm3qf2sveatnl2dg05ahjmje6r5wf0j5g6b3koq5dzx5u6km2s0isf7evnvn5ev3023ippzqo2m',
                pathname: 'gdtlh5d3z6ng1taydfh9fn5s4u6nom9syecbk4gqz7wco7v5a2zo0wbv0ewndkdprg9kuam3jn8ede60n9fz60e0pz5o8kysht30zq63lxuiiku55wh4s8jmen80e3x2m7r86guohfv8iui8juvg3k7donk0nb11dggs1mn8d0kanknrzvz2g6798r6vrprlnr0b6eeg8gq0481cxj3qturibs46lsn1qb3s674fj85iupwo1oxulw8w0mfzvwtf2lzs2bmymdoifuulp1jznf0c3qegm1zw43jhjybsnyn710pteic5g0wxlny4wvutu1pi6opwqxygrj58glt25leinpvzqked2f9t972zulexsryrqi8jbr40draurucpzumlhv4whd98h8fnl2m6b0grorgg75ikm1v7oz7ld7qkc397myxkatqzoz0lfb0tyvckibeyh8bbtbbd0soyolt424ujcv3snz1zvly3a7jkv7sh54vw7lhln3iadd1e9770vxzcfifm6v6iofz9qf19caydukpkn77r4vulj5npd69rdxw5i8au32gvu6f3uify8iiirhmaf1081ettx2zqu4l8vw4o5yqn4z2hhx7z7mdwpdvfi61zfddzav8bb25bx2isayuj0juwwywz2rngxf6tbkb2eak5mmikc8einf8sp6z2y1yi72pt0o77kso240hzhs3l7k2iuu6rotlm6qnmkdh0sxaw1yzgkepdoxkvqhxnq3tfm0prgpiv8xi44n06dagq3h4v4zpxqevck3xodggyusagvb5oo33q8070w79tqmk2lnqvlrk2zq9fq5wv2browu5t4ly4sb4gu4uf3au7sqqhnb3y3n84c4mtfdfy7jz996wnc18qn64047tkexi09ilo38g6ttodgub66arb39mdv8rl6locnzp6jpzus2s6txtu7dwwm7yrdr520mhnjaivtnwrj7tyvy35q8bjvu9my1jk716rjk5kq3fhxiuau8p2dcfq',
                filename: 'vrimzozmyfxs8snm2whw5d21yu750mrch0weckcte3zg46fihudh00jqed3yq4gimffnjwca41pd2ybqodif8884eqtm63h59txen4775jtqpyh5spkm2q1l5k37kvrjq03fywvit5ege44df5us8hin62106y75ahj141hpmat1o440l4dkh1ovpc3yo1061144hcgcv892jx56q13vr0u8i9ue51eu2n8tus2bpr8v14qtp6yowc2oqjj0b32',
                url: 'gk2vvqp2t82bt70w81kwkbb5p2m7swz7mibjivscaqeiqcthf6hlwnfux9k6f8owizt0vyesb1r6856dny7h0rs4udp5hzpcjag5hspx3lnn0b2zm931k8zspdelpjcg6nra999fvzccpusharcz6lo9erlilhu7t0kxfc8f43y9uvdt0wtwclv8l6js55qhnxyca79ifxcqxdb4ur669gu81zsv69uleqyqeh4u4stcsn829sgiux3xdual2afnotosxzvx71xl8801zcxid38b9rv4y7ro90xq1crxhmw5jp6pp8fmbb1lx5jwchk7uayzztwi89gi7evuymjrc1xvr0hrtc3as5qcpo3e7fj3xlxcvm3rqotn92s7j2oa5wawt0877h7ln6a4xlkxeihigk924fjy9ydy3esmhwxh7ij2ppsvnfjtvdapi4po1pyaca9iin8g3ybqn8d8vhjgcwt4ppv3fuobxyk376gq62e0q73ss1ov6w5up2kr6aj80arzecq3sscyauzi7j9i89x3ycdat5lh53bho8qb04mbor98cyigxxchsdhvhq75j68hplmcwcs221uj8i7nu8gxjv48iebcm99rk4io268v90dq1furaldjmr05pax7ga12zkqw6irktu3iywrtv10dg5l4kww68snq93rj4q0u9m1xl45vv81ud142so7xtljwjuz6nowwaa3w9gpzy5hhz0cbl0idue9vxojl0cdga11kkvkwrkn9hnvnlyeejl1fmw74jg90vvhd0avly6hg86pk3rxk8e42lc60lp61q2l8me5ldyg7h85c72h9kmey9tmsxglird8uxdv1asgis90cnvekl0hebxiyznkq5dnv6t48040jva5ty6tavqrhxbk0e1ictwqi28vgp4btmtxp876p1hyoh2nxi9cax7kw2kdy6gq4iudbuioojee9ivhal6tac9uni1i4zv4jlu5stens3y2zki1d25j5vblijac96px8atay',
                mime: 'nri11kecmenu1whahmsvi0yz29evskw80widc13ngl6bi2dxdo',
                extension: '5dqp5s5ev1istya6qea8o49vl0hjnhmol1e34op0c2mhgpqcyz',
                size: 3267514900,
                width: 477808,
                height: 194631,
                libraryId: '0b405f3a-0d8f-4184-9d5f-411246edaf7d',
                libraryFilename: 'fkbox70vdghgxnxnmcfqs48jikua30sbt1sxe1ksbve7vc91z6oyo92sr7zh6tudjkx525eaaplostix17vkhwtrs61s04sc34j7ik9x6gj45q8i5h8lwjyz9dhgrlsbwe0m7xaldswblrlnfhul68xne4p5qoqqchnt61apkn9onk9dkk60379b31tgn04b0kq6b6k2bqvfocind7bzkxdolqk6mwky9hxl3tnzornt70qzvfavq6bja1xeyrb',
                data: {"foo":"r{&fk,BQ9h","bar":28488,"bike":76443,"a":"W{-q4].j}n","b":57535,"name":32566,"prop":";=$$@_X=?g"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7ca8d55d-f09f-408c-891d-0b1144bad73d',
                attachableModel: 'a6wsixcbt8ezoekp38go105ddhygg3szjds2tcoo49p5bvdqynsckqmhj864t3rtjkel2m0pc3j',
                attachableId: '81ac70f3-ac4f-4986-ab79-3dd89632d85c',
                familyId: 'c9afeee2-813a-429e-a1c0-713265c837da',
                sort: 685022,
                alt: 'ndi29zfehy2bnfr36o40vvfeiaqisyab06w51ubamrjhs2gqt9vdl4m9mitl5ob1gocw44ukbvml2rn2pil9tvoxh6rqd4d957z6eki5p38h02o9xybz9xzwn0m6wr4g6icimhwi6j1vhj8we94y1d7txybltzva1mswow5hgn8t4cnqc5vrgzjnkonyj2mik8y4pb4bz1vl2rmcocapjnce4krh7aktauwv9vrqngpxb75lunnokv83sskkpoe',
                title: 'vp1nw9hu44hxpsq8sxnggrmup7036ml6mc7iqhkzv9jpalaaeflc3vy786yr15d63vi1qwzxmaasqco8cs4azr3o8lfp97cwohjkqcjslwaha4xi7216mvhny75so1heylim0jixfoxt325n7rc169csa15gytb6mix2cnd4arma9m0oi3t4xewadvcql6n1nnl2p1p4bmn48kckrnn8h1h5fox84cifs4oz4nhatm93v4jw9cog5xic560pyau',
                description: 'Non officia aliquam nostrum blanditiis autem. Facilis odio quod eos porro et molestiae excepturi. Accusantium voluptatem fugit sed quis quo reiciendis repudiandae aliquam. Distinctio sint et optio laborum quaerat pariatur. Eligendi similique et eligendi.',
                excerpt: 'Quasi velit veniam in cumque dolore. Impedit suscipit iste. Quo molestias quibusdam ex eveniet.',
                name: 'pn10hqq2f5kbfyhmbjgviul5wlwchgqflem07n375qrl1j4w0pohkkgst3sn6kjcc4bd90p5iodxtvjr71wsr0pfp8u6ws2djt6mj9jsiuucb1ocxj1tej91wa2qlc3bjpnmvt0f93jk2kf5lvfkoy7u01n9myxphop27bzy0z6z7kxm7jmwvey5a74lvdykadj1z8vhn7lg0jnwanax6elmt39f676axu9yw5fj8mab4rqmi628h3mitwj1zum',
                pathname: 'lhoj7470d37665xj66pfoi45rlgn7rmoasnay9jw39qz2raymrfu0hh16h7cm3else7xwwibv0pzva4103px8sxi3097rt0h3a5vaxne3ozcea3ntweushm6ik0do32gr2y9izwf8t4h1svnqz3k1fhrala1dadifqcgpb3vinc4dt945jrmumvg00vfgz708d7zyggpxbeoh3z1cjv4rsk2o7r18d829zxawc7dj89hwvplr3042sr794tl40xe7pkiiiqacrt7jf5dstkc8kfbhs62z17emyr7sdp1bvvg27f56cjd5bc1id5e42beor0443zglfopvgu6k0at9qcr33e5g7e5uylmics0p9lzsdnmhd4dp9kedjm1vrr5i5q2u7lzdo0fwj5l0jia991j1fn9e2jq5emcehvbz0bnn84eoa9dngs8fqwfpdez8l96jb3qjbq2zecmgmrwkaxpkdkwtmioaxzovs3yga7buc6ga18czsqwicv1zjvxbdi8sue87asq0qg749z9aoz820qg10l469o83fzv1elb327esfk9bsnpcxgt92u9ovgasduz4p9kzwhwztasewagdzu9fk3igoda44gpmp3agj0h9vc2qip7msgy54o4fq4u85tiw6lcxjf1wx4agfnxemjqvy7ypmci8nkjyazuuz57sssctx501fevashdk1q21l35pi649d7ijm7tp2tzqxwhmgys227ge4xnpm5cdwzducnxskcvf4clyrnmtiwhdyl3r1i1j4k2dcmy9hb7bl7w5cnybzvdhbs4jckd5en6gr97s41poy7q348w237897t04o3pr8bl55d3tom51kmn5wxqnaguwcubvqcyfffoj4azthrc3tcz5r42wzq2e8n5s26ec60h2o5dxeug72gn1j247kka80um2asmabbtq53lzbnsssrpui4753rulekidh9v4r3pf9ku0if09t1d3ywgf25xv19senfebko7kfiugngp4q6mowd4f',
                filename: '97womt4e2glzk0a70cimra0p1h0t8mevwti1qtlex2r7m9akuhg1t46r9b59iwhqme4qzur9nyjra0iqiqhdng7e4hsgi1r9exxugcmj4sywudj1wfclgo8pxnt4zk3ecyo3szxizqidw7p49sj2ig8wceu3kzrk4tm475dkxypt23qjjafw09x2ot1yek9p826jjlcvp0vsgisfat43hw36hfonhsgrktdspo4tm15u3lfn3m6ckko73x7aldd',
                url: 'lnk2hbrtvm7bylwaca7a8pu44amkhpoyvd1ni34hlvkh1mbka7nj3bjd0044hicfkng8z2bqoqpap0jl31g0xbvfy88r5ukq9hi5r2mchs3uzb86np34yd278uozr28yer7flmsz8tslmowb96eta8k8bsaixqy92vasz8seia94ma5n4fubr3yn5qumz6ep4wv4djdwv7bagna6msusaudqxg7hfm670jb8ffmn9z12lu411zv87e7khqautcea644ifc4l14xew0mq4pwy6d9rssg0fwhjhhsmi3zckki7ycxiz6wqd32e719icsh4x74thfw5g72ljbbaj1jlh7topcurhjw5zwa859dsiursyef2jeceddeoh34eecryaevqxw0d0t90orpzwnhgcb8wpviv4bro8312t7phjz4ipyphgq7r9yj85jw9kq3m6x42sh4uld7xc802jr596xaeetkefyrsmwqrfkzceeh819gy4wkalhisohc19zsyxrg0eer5j1afg42s31gsdvfx2zrgyqc70957djpo38eerazfborospw87vme4shn0nfd8wguboro632s4bzepxysmqldrs85r2gvo0c0kvj64sqctrlaf9vdz5a0tymegvoaawosmrdd5frwv23tovme7rpwuvb5kr64t5qnh6gza2wdwc769vlyldco5jb4hl3uv5lrxq7buu9l4lj9tu59zkoyw65chy66c3xe2k5oi00e9g5ainiqbgtd4xt6jczjic8ukdh3e23w0ik3tmpmdthkjit0thzrmb9ev0fumw2qq03ks1cq6291zt982gyaftienmh57e3u1nh0peppdxii59v6p3fup6etfz0025a1myvxflbutjaf3mub3rs1d1v8d9mp8qz9natccvaxnrc0jw9xkydgo1sk925u25ucoxpagi78chi3aphyczzak6h9stltlnn5e7eeap8f600pxk6fpm5oe7rzzdnji3dojg3l8ppq58ax4cw6',
                mime: 'qlb5ei1efays3kjsw017pi20chlvwr7s3kkzdy0nico7848cix',
                extension: 'cqu49yi69rrin2gtypgbpnax87a9knoonssz77kcbw5hng7kb3',
                size: 6887919900,
                width: 189103,
                height: 403615,
                libraryId: 'd8a4fcb6-5ac8-4d4c-9425-0827c050c289',
                libraryFilename: 'loptor16qu8yr2idojwo2082ja9vyb35rzbgyngm53wpp2eqoysz8h9jce7nhrza4f8x81v16pemdljp0n19dmaysg13brvl1v5b53ul2sd97xdqj3k7toun0lumrjhl6wovocw1ndjkay36ahl36ej0rn3ef2deuklsyk7un8h1mrvvh37ui63nu8bqori6hiy22atw2aaafk63u029y777ng9g839hq1hooifw6vejwq3ry9abta3ut2a64x6',
                data: {"foo":1594,"bar":"}#V\"FX-IjZ","bike":"kXOj4/(97K","a":71926,"b":4354,"name":75791,"prop":"0bB{4'w)QO"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dece896e-7f0a-40ea-9141-ba4dbbb30275',
                attachableModel: 'rixb03m6rrs5g8zyq096ojw77xyiy9kpujg2oa4vr2a5nlrhw9rnrtuflph1c7vky9tv5tfvh4b',
                attachableId: 'a3e1355b-3628-4b50-bbdd-03a9b2a04d23',
                familyId: 'd3a21bec-7b1b-42de-991f-3e0671eb0b1c',
                sort: 651756,
                alt: 'p29462olv6qemwinetic6avhdsfj3iqz2f74869nft70qww0wcuw07929lcdg80abjjyug44uet55didurbwhdqx2hziw184cwstcy7ww09s2w8yaylldc2fxsizeniiu8av21w5ejjbk0v1fds9pptzecvu74r6826smw0xi61k27muw3ir4gvpq7wnux5ihwxwr5hwvltmbe6jpf1ba3b9h800yb0gxvu2jnrjz2bytxreilq60gqprglb00y',
                title: 'hdsf8gh4hpes4wgbig6asif5nkgknqur87j7b1qo3k0xsaqnao38u61nccncrwv45miubcacpfft43ucstqwpat9jih6qbqigjzomzlfqyjc606n9c0asi4o4ar4mspeab27t1vpkh6jbmzn3val7knrovbvvv1qz13j75x9x3szvughsf2iwyqztca8l8av4pvgpwbc8okf6fm25d6555zn3iu487hp9plwcd3eywmvim0p51wn6q9o6f0hxki',
                description: 'Atque vel vel. Dolor minima non aut. Iusto velit repudiandae at officiis reiciendis numquam. Voluptas corrupti at. Perferendis quia illo magni earum inventore omnis exercitationem.',
                excerpt: 'Asperiores dicta ut et ad enim nostrum cupiditate officiis. Perspiciatis sed nulla dolorum. Quibusdam aut veritatis qui qui modi.',
                name: 'p73v7wstukbxrahnmxnla27qt8onjldal8p99pbj9plc1lo1j0bouh5eglrb5xk29td2bqsy4fi3mbb294vk8qpv76kqz8rmvyhb8149o0uduwfgv7cow3kw7pr5xlpf69u8knwyjbhncdn0c2hx68ptjnd4vjnlfvt8rjagubireuwctfj49mn8jhgyid0s2h9wpdu3h396yfzitn1i6up5zae7ld00tontrhptruc10v8vkp5dc0iatn67534',
                pathname: '6mmfc5d4c4lmljteortoqvdujq4jx7rjd60gll1v24eeleu11s4zqk9zf33p82bavduposx56dvs116s09d7bk7jl57qyd90ccev1kl0u4srwg3gg0ynz6nm4mua56buf8i7wx6tmj8bqurb7jit2azn2nro4v7shf9j2k3lu4iqanupyxwd4yn338jgtym0anmyfheip9z00ksev19chn2u2o6x6tsac6yn07yc8cnik7vbzfadduq4acwtx3sfu32mz4rr4zeqbu3gtfnxapwslqjvmwbq6eawm7btp80yf6af3uwvzrofbvftbahasglavos62twnui6rlhb9tk834y81w9elsxyk40xlgk1t9ijtg1usqsskixle9leq2y1jb90aaxsg09a4cinqqtb9zi1rejiczwqoiw5jztfyiiljro8dtgk349fpuush7jlkws36a9ngpz6xf3h7a90797jut42jd1tvdcydbq0mdoxuc2fd4ur8wwu0lsvce2xfz1fywn3pu28vzel6128l280zmre1t70wkb85h1pfdgy1anoptntvvwngw29led9jf39qnfqcynxg79cvpoyqmqr4atwrz0x33oqb0uv8fk95aw7if75hawforv83w79m6py3gnzcc1i37t24qcvyvdnpithborxhwtig40uvqfgl38834387tcgjgsom1pjphry9o2xhs3r4pobpsv5lbhnz0kqoriakixcotmtqfsgxsfy20of2vfb3mnowcsk1r052ct5ehjh75lpr14xvpq91hmnivmnrgyarr6i6t0vczityj3j5rmt7ydsvxozgjy7538mcce0ds9uxsxp1siccfqns7me01c8z775x1ioh8px2094tflmcmuaut5tdwr9l6ktto2e4xfqni7ze5oh2gj2762h87h1edtdwyctthgfrcvv1px0jwy8anjiore8t3ngprsw54pf11lgpdlm5zo6f74twac0fz7vl9wkb5u3ms45fn4gtfy6g',
                filename: '3w7fxrbhf802oewe69rqjq10iikgqwqachxl1468ujgrayk2oc2lhwfg7q05fcyg3oywhm3hyvcv1kgj5mvfzyrkzl9nazg4qvfxbnkyu4la218lce9wwdd6qoshmgosjkxpnx316m5xj0rbx6c1khmiwrsxf4kyh6nhr6toexn4ah7qikrggpaf9in44xmw3ulmqqy87qwzky3flunst11h1cfzmoson5yzfjbzth6bfbdfbnas43xdohhjclzt',
                url: 'gxft1uj6qr6aechutfxyp0jhu548k6zaijdwcgktp9h7vlfwhlxd83s9m07mrzaea9le9dpxs95wtd35r4qhkb3v6e5g107hg8l6fbbc0251wbfhgxtqr2blgmdzm9yhdd1yrdbkrz9tdxihgqumcjfr63u237mwpga7kj4dw56fjpracdj2qayv1ppnco7mtggmmbpjcmdggjkp1wnlj7yq0bh5ctlrb4gqmp06hjj6s016c7qwwp6sgbtwozhgqt0zb3ieyege2npipfod3eaixjq976xyjx8qjmlzgk2evca20i3pi4ov91konn9faxt1fd2745doms8uowlet7r9b7qn4s0x66x4rm8iqzzs0l6dk55x1t8h9folnmg2z5mgl3eb54m51w5ghiv97pf3agj0pve954xubhu9j3zleql6ygqzvnoei8bdaa4gz5ymkoi4gepgwsumes550jsp1b3vh046by84kuaix8idl43lojp6a72ro6vu0hxpnnv1zodppmir3l1qhsypy8jey2hu2t6z14eurt7ct0f8z9evssov5zw7a28nixhymsuwbkubk6aig457nf6piqoik2prshzf21xp2nxs4x92bfu1b3l01az0g8hq5hle43tgws5a93pmplhlhazxd436ppxqzjb00oc1lf71x905671gu50gyysnk57js8rdt8meojbnijxaoucrtticavz9ueuwj8i7m69eal7s933iweo3ix9quxxl2f73cgvf7bzuchvvvaveu0ztt7jutwwcg5gclxicismzsmhbqu7f0sze9el6d1f9fohyeuv1r0jhjimgvrtg6skf0hb11ncb79u9tgpsp7hnbj549lg64724bm10sodp5j7rpr7uevkh3kcllk4c4xo583fbsco1fja8yclf6osnvqxexvmjtlvnp5zkc6y3ws5dpqx0kpj6o0e9gg4jme4jff6vmuw1h5igo3eiaarit3qztsut20rapj6y1ldq9cr280ag',
                mime: '6yipbof1l6dqxwy0z223igfavkrxscjr9z1pdhiexcxx0oktuc',
                extension: 'mhe6pwf9hxmmxh28zh8v05404vwy6exxi69d4nh1x2co4ua62l',
                size: 4777023039,
                width: 597782,
                height: 680700,
                libraryId: 'd33ab445-cbcf-4e77-93ce-f7019481abe3',
                libraryFilename: '94q8s3l7674bock1zho3ar5qvl94nt1yd0q3n4boz9k3bfhgze1vxxct8szz7densde1s2ms3yuzutxq63r1e31xntgeor1l6bebk5w0o9p7dy87r07ldvrguii4ygpp0d2i1sa057okegi0lixk7qsh2qss8r3kv03au58p4o3btss41nr6mizg3y9il8f1mu6aiaf8z34da9odupjdc06bd8zctkd3ub869f5b13tsu4piwmoz8dnd3a3tyzd',
                data: {"foo":"T&a=lUm!%d","bar":5850,"bike":"0QI{]a.m*:","a":"&qRpA_DN):","b":78235,"name":"|VWg{7Cxf}","prop":"V<T-?L5S-v"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '85936d02-f591-4f76-be90-d3543795e464',
                attachableModel: 'ivdygqdkm4obdui16uka7w2uyi805atnfl29dccnoqh8qlalfpjzs84lwyukisqjn21c3nte9vp',
                attachableId: 'caa7f4b9-230d-4997-9d3e-e8142c04b461',
                familyId: 'ad7821ef-daef-48bd-bb86-364f19e2f497',
                sort: 502305,
                alt: '81tps464gsufi1evwmnhm9coslbx9cij8olb1gaflgvst0275igxg6d2fux4vkfzpr3qjzm8nbdywm1w083jzftsjmze0jm4yoxsasqod0ktoeqkkt1h3tywkylkqbt5yqntolpss0ynufrngmqlygy1sssvlag0wwf0gp60kop39bcc4g66dgeyyl36tdtowbtm1k9z9pnrnzbzuz66ezi4pcbyypx0op57ywum1je1jqc21lctpu3k9hkuu26',
                title: 'g3n6n28cg5uqkry9kz4kdu709y5jdjyc2jrpyyuccf8ymndq5as45nnj56mlk9ebpoi4tw56i4k86km10h2wulr3izqs3nc24w4lpftua3fw6jc2chrratwoef2l6h7r886qwoy9oug1n4mloecq3zt1ge6pxsdni4u05say3303hqj62ful25lm8op0o8axqhn5gz3fhnvqexjc1fbk95zhzcrb77ouitmju6zsl8kdre2gkb4i3u315zhv1ca',
                description: 'Ea voluptas voluptatem et eum et voluptatem. Temporibus accusantium est qui. Nostrum molestiae quidem. Qui illum libero sapiente corporis sunt corrupti ab. Vel sed natus fuga.',
                excerpt: 'Id et facilis porro est ut. Ad nihil sit accusantium. Fuga eius excepturi nesciunt voluptas voluptas qui quia distinctio aut.',
                name: 'gj3evt5a1sv83xszcsa7qvn4s4z1yhtl69plwpjgdhh2nw66bbz9oshnnh7m8qdtuo5jwggg2pkrnzcf04l78pdhk9t8iavbql3hx1j70ipx6d06vlwrlxdii7phv8i9xlon5bhdxbhrcu1jhw32xwo85unw4xbgvnvwb3f9g21y5s7ksaxg41v78m6mxtm3dd95pnyzo55m34uc250dk23c4i39f1ccsgpyy45o668k1k6vpwdmsqvtuteqksh',
                pathname: 'fbqekpd6pufgytjzg9db24sfdnpnk3xvytqp8dyiab0ouzob5o116am06ph1obw4zyi90q6fce3nosag44y8bbs8cqdj67szqaeqrva3n02q7efkv61w6v3jducjoq363jy429jmc88x7xxd6e8ta0vsfjlrxowsp3dg2nhjhwjk7zsclg3j5hb67n9nfl10uao8mizy66lj1gx938h72gep72k9x468fvfhlzf06lywdmn2sr76qvc1ivwl6cl2eoso0hf1y85qzfustxdmjj47lhr0yucmekcznqn0mnsxb4grtaocp6f7mup0o10tj6pdaos3ssam1v9zkzow1ysz4io2bzsdcvbmqfe5y60tz92jdlmzpzkdickqfsajowsz512bdxrslf1g37iop62wz8lt9strrkw76rotkqqem6gr3ohcoi7ce0rvo5eqzqbzj755t5wy802wp5maooyzgppwwa6fomn9chl9r96qepezwy3ad6qbasar2qusqyb1idqhr8fur3xx80x5k13kgtitvg7j7fjmff2zi5xs9ec7wbziop4u0f2n1ad6n5qibeuj83uygz8wkqeblgs5l2h8278is4gxv7nofcxi797fpp5xq2fvdkelihq2nu8m77trzp86z4bid0t6zegiihv6d89cb77nobtdq0da51cdpf9yin498dojslmt916t4gn8ag867wqhdqw4qfydo10b3q0yugi4yhckuyb0s4rclryu3rbv9z4qga4z8kxgm7sn4du6raf9dci4kkuulra1urywiik4frcm8a166d5q69bnjkvhdy02edxymqotgtc0os17xel4lzfpmkkfofqtepm6bt5h5ichxg6jtbuwykifupf1jvsq9e69nrxpr14sx33lrfpa2eeuud5htc40363n7ervxujn1lbexmgecqvgmntvh43bd5ikuqcj8i8073afhytrtm099pre8hrwo3e0nocsd9eoj6ym6p0c4apt0vmxzrb5bztb',
                filename: 'b3ycy110tsafxwgwr2upj527mh11eqetsf5euqjs0l1d91v8ne9vjyqmveae3yfaisde2z198zt0pezjcjc8j9htrfckvr4w0jg1eupb3ex9h4sx21hro1ahvgutgmlwf7yjupdkg11ry06ytfl3zw7uifgahjgfuofarutqq0fkb8172ilnnj47gjnl459rjaaameu684gfdrahzfui7nz5a7g5iksq17uskqkf52rjdru1re0iaf720dgviwi',
                url: 'nomirt3ghu003k630939icta0dsene4vepgv7q3s8cib3rygvrcb2i4igxefyunvwyk9rf5c2m701ovglqytp2j5z0zrlx6gbtj5y311rlccymmut2k0hkdnvz34pr4pr6v1db93n07qve656tk1c75h041qrsjviq9vwuo2hru5mk1d76hgzq72mrux3p4q6xb2syuhpx7z2u5386b2lqww5ur4z24n58k4rv1duzepmlmrzat8vr0ia67bcziaww5mk49zhqih5hcrhk9lxrvzo1s0tlklcyezfwzmvjt6ler3zm38wjy22fgg9jt2exot6ew0toix7emjf49xca7ha2vrw8u6kbwz85kvz3kdrxlncpxg5if4o458qr8ekx63ai6wpektilq7luobmbjuefsq2d21sruhr8kbctd4j4djg3uiby9350ljns6bmo1y9ub6vm4k9re19w6pysqrdpma4tv0fuqu7vjs7e147uebp7x82gbp4wfqkfw7sfw2arwlo08ybpssx9i9pnnzvm6w81y2zs306ugt6d4ypdduwou5calqv6iku9cfnk6yfrsebadyzev1z0bwoyph3xvrjduahxnl17a11mfdivmel8pkbu2e9gqvx6dxzzgb8g4n4zvjmerqiro6ibadtfjuwk2ycz32d2g1vwb90p9aibq5tpdvbuji81incjl0nokes7bv28g3vdno8ami8dnek2jlky6zyqdb7wvjfa7s0uvizd9akntfdj99niin9ircocvn7o52p0ja8or3v99y2r4cj3fhuvnz2h1kt2zz29kzbfh2giw47kzuab3vwmthw7he6xk5hiowro22gt2s1vztn6l9lqm1h1lp2o7re9p06fxtwa760e1jhwq8u81mn4atanuu14a3mwhqyxedcduqdfp4nn3fy9sk0znlvxt1mmbfik5wvok5oifqif93xtwox4bk0n3afj2fs85iz2newxsm2ibenjehlqx7yb7qcbm3quo93nj64',
                mime: 'adkewiraxmhnvp9bysvxshltxkgwab06vct2visgbfdqh7oy9p',
                extension: 'j8z6cad0lr69wmgr3bi4vdoda13sw3eegjdiua02v3w2v2a99e',
                size: 7088286820,
                width: 854866,
                height: 639241,
                libraryId: 'fe7a9f68-83f2-4931-a656-dbef4985841a',
                libraryFilename: 'jd5837sq89087csszy70q47mturp272n1v1iogk2g4s9ovq2g415upglkhaun13z6sq2znkct9r5x48rbkqu05yesjbmvbr8i9nidtv3oaupwq6fco0nj779wgvyjiytffeunp90us6s4ed5no0razj34ytlcxnslkvl16pqgobwnsnf6eq6j03qxltqeit9bsawcgowq6fs0wc1er7pqskaz4lfdg5q702k8osg3hfsog9xd2w2ad8bhae2shp',
                data: {"foo":34434,"bar":"H(seU1WPdy","bike":17249,"a":97996,"b":7129,"name":72315,"prop":52396},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '68d1876b-7a24-4536-a535-bbf66903df4d',
                attachableModel: 'yj98uzhpgcsjssk49u0qxuy35wx6jklro55bczi65dwzcm2xx91vc8cnpba74f4pmrru6lgkril',
                attachableId: '8fcb91ed-863e-45ef-9ab9-f8448eae5a59',
                familyId: 'a4cbc63c-de13-4969-86ee-8c69f4c850d6',
                sort: 733144,
                alt: 'hgm84c0966ns0f3d8y68xo0nvxtgzcml4civ4f6n85bbid44i6rdkkl83xdtzp87zvk2sekgjzywlme0yp47ehay7tgaf9o5gpcji27osd4hy0s8ec4lkgfa5lazbxxl7w0q5n8yr69b246vzt87nk6mx28fmmprsrnvqkapi0583f0fhss8yygactm4hbtcry8rqt4zrvhj0jhwmag41tvkpx4p90c4tewcps0dhk8vtjh0o1d7urgay5fi2gz',
                title: '8omtlah1bzixj5f15vkyba9dc2j996ag8s6c0908jvqbmf6yxsqyhu8xkxy5wpecog16tmpmpfea5ldr11d9f2vzr0q18o4ikyq7pqx83bazri2t6494vxua4nkwr4uchzre96hut0pumbd52oalhmrhynea1djc00flppysdvu4rllsz53r1kgck5exisxdt27364qy4jijp02u8ufhlnir96p0kylz442tpy9xrnfvr52lugvvssqlg5h8q56',
                description: 'Inventore facere recusandae voluptas quidem. Ab sequi voluptatem qui dignissimos aliquid amet est nemo. Id laboriosam sed nemo. Fugiat dolorem consequatur optio voluptas. Nisi iste atque.',
                excerpt: 'Cum quo non consectetur voluptatum in eum odit cumque. Facilis blanditiis quia et voluptas commodi ad a voluptas qui. Eius sunt quasi. Rerum est distinctio harum fugit.',
                name: 'g0pisxkgsrna0psbkxmcq68rsdde77wmnob8f97p95m6z0r3vzzrhplwrokmvnizg61u4ajjvkjwxksgnypxuowoqdnu4tf6rtnyj3anyw7a5rm2gzfnh45vutdko5rln86gwc9cfd142b2k6coot6xdoglan2gvunzpr2t3quo9a709q2mrmwdjmztivxtwecro7seo01dfxom3x0snqex9ih4mh8h46q081nuc2e2p9du08mpf4j4zjalzbmf',
                pathname: '64bj4ffhu026marmk83qe051h42g78r9h86kx8cf9yqxr0h4xi4qv96ibh0c4j77ejgkbet9iezbmy3o8sd23g4pqf4i3qzpmnl5z0j20rm2qee4lhe9075s8bugz3q9hrbt6r880ynp9r3buuhok0oc133e1njzg7o515ue9ui0hg2ydmv7jpy3qr59jmby3hkec81ht0cq3iux10trcnx8xzoqx6wrtuc04tjk3m85tozcpakmv49kj613dlwl7r8odnpuusr5jcy7l1sjgmc7e7w26izf0advzoxuklsn2rs6a5asxrx2lyfjmq7j1ga54w2l6k0jzc78esuzu3aqj9gw46ejrfdai3udotog1bu7jnnjofwn2l7m0g4zflgnk8cvhsj8tbegd08r96xoa83knrzct94rcgg1zslxu41knj3jtmmzc086epnut2359xrfp2dg0hot8628t7qfwcq69icho52srcpugtmdgrjxfmb21ut3hd3z3a9hwlp8ljs8vyk0ja0vawfl8ecrus9tupltdfyrmdaoc6c3fjtg88gq44qxb4judc5rkyecedtpkrtryjdkcjlu74l2oedrwwvtjenw8plxp16emvr8lwkd0fnlramset3lmugy3a37j7b572oqogfcd5mpb9hcknpm9k1976f69susnjh73uzim27aswr3l7phiuii6ckfz5yg1exq8o2v0i0aj5i30q7pvjumlyz16xgmjekoxsmu6j0njgucpxp86jxhpugc9d5s7wus4dh3pvqx6indwbbahcbxhe29deyxlfcfd4szwa6brirc7wk1yweux10bzn0oe35k2ih2swx9z0lvks98n5c4guz33d183wk62n1t0sljyrduxpk4kfsqeg7q7p6ki2uqmgsjjktud2lp93hjqh1gkdhyh0nrhks68lyd8s6j3bo7w8cpyo1oq2277xt8vpxmuxaehmgnyytcsgg823p6et3lo6wjhuhvs136zvbbapeokvqi',
                filename: 'q4n96hhn89h8b4ouhngfmv3fx8fgd9nka46ixr2c992d32h73wqze2yw01x4uyn2tla76g6wucq7m5wk79wuow2meceehb4pdfo1u70g2tdmzgun3h3arsrywm0tntq680zzid3e5y5k4z9c7gz1li304auk9cgrzqlcf9pgy7cg0qfmvc1y05cskv301vytzs9677qzp2h5vge33mpa8kijrg5dh3taejixwio8h397r9tc846kqm49agbpo8f',
                url: 'yvdmkwt0dwr5qv7hga4r92ihefcwjt3jeirr0ezqf2ma6wrj2wdwzdngc912zq7nbslr61ptmlb6xl2gm8i55l74ifo5tn4fp49tzqqdpa4gke6mwcjgdcfevirct2z1a1kjo7aeiaak7wkosh4lsmk743l2ggqecegu7mknmd9u289gj9gfyqnd5y1yuzd2bq0vej7pa1bepe0rozvno8k1f0rb95o0754angfthd78jloq5g1ub6w7nnm9yhgevf5gs5n3nb0wwsczru81ejq8ir9srprjgz5rj9mfgt86bj6dkkzp1z1g6i0eq77n7j35tp2h66y2ftn3ygkbsetozutkdm9tcc72w9prj459g53uukuily9x1rrweezaz9wl2umyx74q0v5rp0ypavk9t78n7t64zite0uzr1wwqi2veu0iubq494c7rwy4evv226wrq8xidospz6257bwqrxiabedixamiyf08funvwz9g6r782t5cjez1lnyjs7t8x2nr5nrwfganbkr5yxj9k8zr4q3pvxkgxmjjo30xikaad7kamx99h4xiipeddqjnfa4yf55jh6qwu65tsd5iuk5638tu33anxh28xedugicvvmklk7kawk4umkkkna4zxyxfqg2ie1up7oux3e901ow5fls07wnmun8wj5srxpc48j6vrlxx0om8pmlyy6ie9b9t3v42ty85t6jeptwyvhsi6mzebuefhx3lw2uw11v6ttdfb40owskbo6x2e3a2ri00eo12hidzc526b70ycun7j0ofo1ijz1hlvwoqoszy84sg059hhwcug073pkb5mg1259rr9x1hixar8ff3ovt28ckloa4lg0a8s58p0s3ltd5qtj2ee2nkf0npd9iruwh2i2254fkj2wh7j0sf42dwjap2ifgqxobnecs6zyixgab9wkpedhrc9h6656h3sqz6e049igqv5etjjc6odwrh6jmk7aayxioy2axnq957f5wjvxnjs1mzot2di',
                mime: 'f1zsog9rqa4bz7g0xzn8pr76cfqsl4dhygahn1waaphkz1xagkz',
                extension: '04tltrobdg4scncx2fmn7ky4um5o8i09okwgqesx1mlrmyrre7',
                size: 6237144771,
                width: 146175,
                height: 841303,
                libraryId: 'aeba0583-08e6-42bc-a5fa-ee44fbb94441',
                libraryFilename: '5huka1pn5xok03405ximdpkof01zpb0lm9a9uwh7egzhugq0emmey772gogrr3i2g1pq79upe4p2u0sfirqbhw2rnsintkkr3dpq2v1z95jxinpwemfeu8ryd9xfrggmb7d24h8aqm8qcxa731wo48hx9vwb5pvf0se6i8fxtm2yd4qg6ogfgizb2jpfchtkzadqiwplg4f39ofyansbe2lsvou49ruj01tfh2uoqqs315lenxec0fhwhv18brz',
                data: {"foo":"Y:u@2i)1OO","bar":22296,"bike":"r&Q9!N_rdC","a":"Rj*Gy\"6xz$","b":55149,"name":97710,"prop":36789},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentExtension is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '883e934f-36d9-426f-a178-517a66c226f1',
                attachableModel: '0s5mz8kfocv81rq5hxv1fdxz4y2eo8mgarajc6gx2cf2bicrrpqrgpyk514dvxrpmgqnjngy72w',
                attachableId: '01165f01-644b-41f3-ae53-9c9f0aadc65f',
                familyId: '728fe435-9cd2-4ebd-b14b-39fac627a590',
                sort: 882082,
                alt: '9qojsnr1ko2qob3dwfkomofsp5f7q7act004urjgyyvbelk8k8th86fiahwypzjdosznik2bojd4brg0jj5tmrrir3p6pz14diat6vjsyphudx85qwjp6swsprlvu8v2rnfi0k2hfs7tsaerrmt06avb1gsytci031injkbbs2nwq7dv0mmetwmylow659m8zpohddbu1b1yhy79tzi4s32ee47o6ee34kis5954k4rff4gi5rw2vhi745qlsjv',
                title: 'd6449209juji7z886jkq1a0gnqr7zxjkrr8hdobkpvnv7kp08qhsogj093jl6np14xaprryltymllhslmo3ye24dk9d9wmgjh6xlwbbrzn01c45y4y3k25yd4p5i041ys1keavuwc2ijzpc62t5dd34xsi8c435ktuxxran0yx9ewnlw7l86xpq6bg14o64d7ff62fpjaoqezsge7hrzve85mm29h73nzjwidvbfyp4yeb4wg3xz8yqbubhrsye',
                description: 'Laboriosam optio qui porro aliquid asperiores. Dignissimos et ipsum excepturi amet earum a in et. Quam fugiat aut architecto natus. Pariatur et enim eos iusto magnam et. Molestias doloremque provident cumque dolor fuga quibusdam.',
                excerpt: 'Quasi odio incidunt iusto magni saepe rerum totam earum hic. Non et veniam maiores id amet aperiam possimus quod. Et quisquam magni nisi eum ut porro autem accusamus.',
                name: 'nsvr7wvrw4x1nyo0gym8vvs5twjv4iah9vndki50cozn0yfgqxexh7ayk26zlecfm2cm5jkz97eyeim2f51ey7gc12gu509rwlvn6z2z1jglhlgk7i10bgvmp7m280gabo5h0odu0xfk7tr22g67igk1qbik6ro5i4w8dtzkmiv2h9kcjh3j9rtitxnmzwjl1rb2hzxy3asyyvtv4a920hea4r2zu1lm1cwrtzc39gv0o8tuw0597wxaufk2l0k',
                pathname: '91mxbrnq63i5wypoulrk5ayhbscz2owmph5f3ig0myy5eqoqmp0xfalnhxc9r7710mde1gehhlri7esaias0fugxh2d7xv3zfllugmuo46ui0ci8009gtd2pvg61xfh8folvg9r4kgoag88ss6fb6x3p7yyryr1cs0ekszr3vkp4i3ekwgagecab4mdpasgfnql8i0pv8bpq1d4w8p4h8uoqqo00rfrj7vb6z8ktj3a8q85o01j99g6xnhuyl3mb6s41yyhs5scjyz61v244x4fydqjk9vfwpk8zwqltwjf398o0bi0buh65v4cx2znjbs4ibu8v4ewbc8wuadocloaa8hfbzro8t3wwkq8dakgas4q7gxw04gap9rxa48pxujiiyboee376gp73e2r80vnw73zlpqib0ufbo2ure4r1r7s345z9czrsna7sjncukiwhysbxxcf4dubhrrbqg7s6gq59fc5u24rdmh261i9lneqn3yzopllz5t4xlrxkit3qu4ccc9rf3asl9ct7jx46dw3wf5wnlkvool50te5jbetvq9tgu9j3dnlem3lclpgccmxefl5k62hrcybwoopjwnd2nu2cmsevg5o3ncj8oulop96alpxh4308xh4u0f5s72ix6rqqb2ttdtycncr1d6kdouuo9kztg5ktnl0rbra029nlnmsdvq531o484p4lgtdze523n19nstk95l4zqwt4d4f2adtyh3jyxyfc7qxfaesxxw1a1t2i25h650litbudn1eqlbkiqe0v1rqds1tj0y3npq77ln7ldlcc8grxm4ygs22pf8thv6y3ukugvznwu65c6xfd5n588wq9igdsnxqr0p7pef0tz4qvuln42xbk4f4vyvuj5rcl0meprujz9yr6uvmuwpkp7ae9gwb7wv1tzzg3nxduj1o5s9otgoytf3gwom79g9szj005e6j6a1k9eufte7kqgbyabplavwtmuada996dzes6217lgm32e4q9o1c14jp4',
                filename: 'vbbs6h94659z80rpleh6979rr1f0sjcz4sqc1y9xt78w7slppkyf925l5wmqsdaw91pbnk0kgnn3ey3hpc5rj57lj78kuyw5tza8l1f84a570rk3msz74684bf5vzkmfpxmzjxo12zzphgwjiypsig75n8bo4wlhma786tdss96r4rzdl09am9x3g0sfujjn3iiukkjppw8t9tqjtp8cag3vd4uoom47tqgu031djgol9qn0jfyvel6pmtagxx4',
                url: 'sdnoz9paeo4jznwfzoahk745ruo2pi5qilo23u49ze7c895rccm17rnznmtdip0qkeowazoc3l8g6oauxjg0g0ixtv4699ju38hftvs84i3b89xcop6wtg419i4qdltb7f4qvbvf3nzocg9r0sz5exf63k2p0cf5t5epniwv38cb2cgrtranawobk1mubsjkfwq8appvrjjqzb9x4i9nwkusrlv6tuylw9ij0oqtmhvb5758nsjeqvqnvvspzk2mroclte7sopu1da8uckkr4wh56w6rlezcv289hh9jkawcdltkykuvz71m2iimg9uiugi9p5p4npnht9k4sloeqwq6jfivaxr7ja5cwtzjv690p9j4um8yvmrvlvwwn4c53vcv3pqpyf2ift7r6u64rc5femoh8289a44ayg41m589s4lddspyxj0l4lbr7todiorcurvbpkyee4xrjovcnju7p098hww87qxqk3tuu8sny1p267684u1ytsocv5yvnau2l4wq2le33sli9j6fw9a3t8bvhb5t5k4xqq9k1w5ghu3ldwhmzoz09kd23iypy6nvybxvme4rtk0qo589beof4k20ayueggk13ubul7odsa2ki6lqw05nylv9yzmf0xuy4ummihvwn6z66984559yuwrtkrczjz4rlldyzsjdwslq2ctces3bjpang0lk9ir9928mur4y60b1dqhqwfdp2a47u48onkhb3h7839dp43lar50d4cowpceb6i2pfirqy3ojjjcgz91j1t9z6l8ljuj4eq6ml5vqfmdqnqbztirg9aqe213x8c1ug9xsmfsde72u1zu6zr0erk1usyx05i724bypbzkblplw5ytsox8odvdv7fi7hgo30oqnz6y60mw4s8qmfn79ea53tzr4831dth5ds1x3p4idkpuq6ddym5ebk4ll48o19vra1mnh4x41imlfj1zty0ievg83tve5kmnjexazzzrlp7hiu3lktjmggxqorjf8aap6',
                mime: 'kkgd69epkc92bdy0zirbzgdfzs9eycmv0b1b3okfqj5mqunady',
                extension: 'jlgt8410p888bijjoztvqueg6pbw94va5odu3miy41ilgbwks3b',
                size: 5347301266,
                width: 800685,
                height: 972051,
                libraryId: '21bf9404-0688-4a0c-8e97-4396f121c915',
                libraryFilename: '7ixgjyqvcq2r4z0qhvdh79pmml5wzrpf6bhhsu55ukjagfyw8yzixmu7awysjl3zi2ohmhiubdn13qot6pyna1sd0fm62srq7b0emecwe0q6d1rzaoyjs0l1djhbzus0cf0dl4ll47fm7k707pfadvbc5lilmng0ivzf8t1p7fvk2tihe3wqegwkaffb5fp89aiw9pnsrv8bjbwmyt1o3rgb86zn788z59d9xp89q2wk6q71b1tusqu6i1o49b5',
                data: {"foo":"=mX\\AE\\x0/","bar":"IOo@S}|:z,","bike":401,"a":"O;Jw_Uz8q.","b":29984,"name":26628,"prop":"p\\)h[(<5`k"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentExtension is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2fcad52c-0a1f-4d10-8fbb-35b6edc55bb0',
                attachableModel: 'uh6avns03ybmezsymlnnks2nntv2ux0hndnvcofhr10auqwepkbj5d6so1fe472q7rxgww6no8n',
                attachableId: 'e05446d8-da66-4f2e-a5c0-792ff4d6cf9f',
                familyId: 'c71d469c-d364-4124-972b-a53f03ee0488',
                sort: 630074,
                alt: 'g95f3nizvu9ivkyagc5nt0iwtfu8u6zvtf3e0kbfizeno33qw5yacd2glat9nrf80umnmpzvpboqx2fqicdbldem5udfyn8dsd526r5annosf7dj4n1cr4hvsnwc6ujsuqnn6k9mq3ucnadhcrj1i739llsv49zuo0z4ljd2hf3ori62r9q0lp8qv4v20y4c2p9k49gqa5oez49ejltxj8z5mqgtk7ruxue9nw3pfkmzyrmjomd0uask0cnc2p0',
                title: 'oom5e4vcj4yghau8737iumiy77akf94ptpxskula9d10ib5m5o4k46ivi6fwijeg4y5jrf8luaw8u837ml34b4j5nurjjst4lap6ledfczfgsvfc0405md2hy3csyp0yyjb403tbfpqnp605c057ytsp0zed4tgouqcjxp3hq1kn3p73ns27kkvesb14g6qy024zetb18g0mqwbykg01ccp1e9o95k0fho6e4w5fj6tr3dr18ig4621kidfzaqz',
                description: 'Dolores sed voluptatum et et. Ea error temporibus consectetur sit ad et iusto molestiae enim. Placeat et nam ut et. Non voluptatem id.',
                excerpt: 'In ratione expedita. Natus quia debitis. Dolorem porro qui atque voluptatem accusantium perferendis delectus rem fugit.',
                name: 'gqkrop9b2qcyftssl888qtmtmf0nd4se5a0uji7fiizw1goyl7dst9uy016ijp8n8sf54xrx6lkfh03o0ddcoycs69cg4nysfvq4o9dso49rk6kfxth8u8o882wa7h3xm7p9at3oc4lk57c52vu2dz828um1fegfmle6xkeltb2awbglevzl9a6mdiji48dh664jcu3ykbk7acp6g9s9ozy294o9eh7tiohpnc90dc8kjj1jhsvve1ythdq6x5y',
                pathname: '5yk5hnk16bs9qs23972zixtc49mqs7wejk4tnnu10awa7xykjiolmzr000jggmy1qzcb0jlca2x168twe7kxenbiatfvu7m7czhxsj0cs9eri6je63vzhaqilthv17jswapyqs3ktzegjmemsm8alwcvmy9pnlw4cp1so3s6cma6q15s6zml2gcd2cl7a0f6u2idxeb7jzky6ggnpj2geujkynk5w4t80ze5lk0yd3amtw2nixqc4o21ndgaugl97f0ci53fhbksmlpj21yha47lwere5p6shggq832na1xk981e0nh08olqii21ffkw8yxranfzs2he3qsq6s2t318jkj2garz61sx6v8x68ecrmz1weqg5oxp1eey1o361taudn4pigwc19umxs17lb292plt7kj8zbz964bq9sj39wng2253z5hy4kqczt8mlrjfqpx2xhj0dttfs487bloxvrogi4flg91ujlgtducsv2k2jzm0bmi6bqoqottt9cl34b5kmu6n6rbyi7rkb08xlmffdvcgh0gdh3268d18s562lyvgd7g7lb9i1wazz0ll1ieha83z3trf65vjslzhqad07n4rzdyyfpcstcp4rmckllszh7dux0s4382csadilq3etv6kykkgfoln0e7golhxr5zet4tk8kc8k8cl5aehamajlu9e2a1xjyves1vvbahbxckjm14fq7gn0tongp18nj4g5fxzsv00bo3drlv9vzphgepkjf39wkz9ccul1iqbemh56o7loxmu5cjrs7bum8ro18iwkwxrwzfj5u0v3rm9ugt8v4axoaqc5xnk13jk46hztj8wbxsywtemmri5clvkbg7d2t4tddnmkj157a7nuoi5t0tftlp9no7475pz2n4ez96ho9x5l3cjfzvrytm0u6xkerclewq6598pd2n1cul0udcenj2260wham4apdwh1ejtj34rqsmbmidw4vmruuzbp5yyb2l3kyezcv0rks8btb9r42aeb',
                filename: '3ww5ouqyir8wbfxl780hb3oqfw9s610hxjlax9sb4tbadncrsn8rg32lmy5ed8ohqko97nqca5c0u1hu9tvw6ko1rrqrrpso2f0v7yh7vyr0b8su4005gycjd1g5prlt6p9evqk2sztcktctak0ay9si1vrxnsl5w8ebdqpn6qe6vr8g7b7drr2mvbtrvj5hj85lklimkay5wm2m8p8jqkn0vlbppy9o9krso24gd3t490vvjnl10fe993pktpx',
                url: '2ppzi389z16m0kqn8utunecg38f1p36gvzsk1zng67jigz1vz8sxyd0euwossnguegil6keeu3jgxvd2rvw9ft2ttgzq4xgt9y6hk67xquclwj6gtiw9a8ynsloh089udnf7w2c2l9co8ycy0ju3lv60csoc12cr1ywmv3fmq1bla1rm9jf5pu8jc1pbizhul73nugva75nez589xrfpxq8542x3dlr0vrn22kvokh80jz1zs4245x0d42bb8yjn0ry2bhu5x75i8yhwke8447xenb160yyao0hk88ya3d3mt15jlgt68mgohuc0qn17cfgw6rht48sx0f5fz0k12xobqccdt38t65hhgwpa7bjlzovugwdnymixuf78f1tojal830wnat8o74x51wxghsqax40m2gxglrx3m00es782bggxqv31mr28n5xgo6x3gpqlhniakd0110buxnnteqfl2dk31mggk9qdo89byqotna5ycbhmzg2owkkhmgtsvs6wpdzhkrsdkgby72bawt4mcxch47evkg8s4l13fekqjbgit64mpnkb72f80pc53vv4y1fqo1ypklm01sqgt0l0vty03tntgyovgr5a8kmkucdlqugp5rnaqc5vu5ceq70h8hfkbmlwjw9kxeg0ikqpr5fnx02n7k8ezrdx23ssaala9kd0gkbjr66at2sd6kcaarv77awkk2oa53whybcx8jh8nvzp001fnp5tt5mial473ggifto0z5vgh54c8jfys2b0db43e99xg9m2eakq0s0sd17w6u1a5w25zmtl8iwt2qgpk8aufud1vubrtf9lb1gdv0golwwy6iq8dit7m32r6hjmny4t0slcuu2bj47y5almbvxiyver8wbqemmlunhgl6bvtwr81y81h8a3lm3ih18avhl0zbdkgc9v3ht25hurxljxgfeoi3hkm2fz8fxd1zp7ts5itp4rdnn6gtg95kyg9oru1gruzn2vgqbmeoa9kunipb72nkhh',
                mime: 'tgtj7q85p1pq7g19oe84tfm1h92402w5pl3a530mdwtry3ytof',
                extension: '3iw24wiykv1bi4pt9k8xvsfiwepnsanssvpwpv1w4qp7ukoyom',
                size: 36480882551,
                width: 691760,
                height: 105433,
                libraryId: 'ae55d576-bab2-421e-b080-0876103451bd',
                libraryFilename: 'rtnk0ix9l9ndoej87eg9lwcsbf9vdh7f6w9mq0ey5iai59dz61crpoaawcckg76foj64ot31jiu78jzvzbjktoop25cn6lhfpplv4tiw6x1h7aqzu5kcymgpdmpoht2cchcwilkx8cado59upnh36ycu45hjrhpc2lo8w0to9y69au4npa4lkwiszxrvss2k206re4t8ww4079p1qykh9nij52oc9rsbqmcijjwrpywnet92z044dsn0k8hlol7',
                data: {"foo":29511,"bar":"\\>.'&Var3:","bike":"md#XcVZ:'[","a":72626,"b":"9461Cz2EFh","name":"ZRbutE\"jKp","prop":"H7n!W6}W$;"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentWidth is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '98616188-e89e-495c-a02d-bae4d0380d22',
                attachableModel: '8wq4lw44ocxpzkxnbtti9ecc7avoh6gmt69rb8aegfbsl76rtjtkdab8eozbmhbtxi8o5wqyf9o',
                attachableId: '43580dd6-1bb1-429b-b07c-d1cbaf59b382',
                familyId: '7ea5d268-79e8-4a0f-98cc-1c1bddfebc08',
                sort: 592843,
                alt: '7p2uqm8rc0yjdh0h90k7f8kwghjt89lvh38nfsbbou69e8il7pf0bjljcs3ibplai0li4x5jaclqpq5ehcgh1m7m5qtukdqrm9ciitwntrm9m7dv77xnaq11o3zy9lkj5w3tkp8a41cdjabiior0a8pjt2nhx4x3rcm09f5krvjqhayj8cdw1xeah5lmv4rrqad4h7zs6oizxnqe0vr1zi5mgtyhseud9ygkzcb1ofbgbitpqycsgkqf1c4n7ss',
                title: 'wga2q8zl2glmt9vrcz1usue86spexdg4v563d482ed9m5kjy3fjj6etdj2sx2a56kxolmt4dh7xl2miur188jhy1o0h6rn0yj1do19epw99wfn0uo4gkf7ztu57iysmphht7r4bkpfdh1fov58as46p9yty28abn79wsjx1cnha19fyvzg3yfjkgr57lg1c3v7ri45uiuwg7y71qlvr3kvirwv7jbpxif8uu2q5zblt39y42baaad72jaybfm3t',
                description: 'Esse fugit ad aliquam beatae iusto et dignissimos expedita. Autem omnis possimus. Reprehenderit est aut eveniet voluptas sed et hic eius quia. Atque voluptas non est distinctio est officia ut. Ea omnis dignissimos ex et minus dolor odit illo deserunt. Natus quia sit magnam rem reiciendis consectetur sed quia.',
                excerpt: 'Doloremque fuga id tenetur explicabo fugit. Et consequatur voluptatem. Tempore corporis rerum laborum placeat velit. Omnis repellendus dolorem. Laborum quisquam distinctio beatae pariatur.',
                name: 'uu2l864xegrwb3xgvft9vjq5a5jaam9q215wgf128vfoldzqk7h7lzmik0qujsxt6w1hbg1s2mrotlvg4amug3ez23mlsrdhq91yb17hoz7jwe0cej4iqq44rv7p8el9658j9bu72pyw4c5954iz5i7jm7a1oyn12s4dy70g3718x0y92l0bhj0nwjsdb3hq0r86xz16jal1oxjmfy1gqru6u3vgpjffuwccq32fubgfzgkb0gt88kaix1l0tij',
                pathname: '0g4rzdn2j51d6tgd0unjd9ifzdv4pmgrs8rbqlo1pp32oggjt6e6q9wukgex2r98kfocki58znn0m86ghu29whoyl5na2unu0mmf7g41y249016ua5j0mnxcfs0sk0w468aqz4gftkabsvy1urt67tubati3gx56t8dx4zcknvjp620os4d3au84kotu8yv87qs01lt9zo19auogp48i2rcyv66pxl316agtlnzefuxvlaykam9ldlediigoernkf7girii7bj18kpnzhfslkwzvaxcagm2b18srmyguyjrirscxji7ao4zf3y9x1ijdan96l29ext1nalcjc6enb3hi5qwewgs8xmvtsagcp8s14r0tsvol8rrl10r8zu6fh5910eleeh8tmi0d8nre15kp6c0ucufwuloc29swgwzf1ugiwo4kwqjjw89aw7cs0pmo3os473o6ltt60mbxzfrv9438lffxzvvhrlj5rfsekuc9wa1cr9xsjr5vly9cnj0vp35j45lw3dqffv8u2u0dv5f0s2x8ck8m2fb64kpnjux63s68pb7qusrxoiui4qlzuxjrhwxjluyxchgriehcupfqery557obb8px74k1p38w9v6k8t6k48bhnfz3c8lk1y61i16cmzs5b82g3ewb9mxt2m5er5oy9306ojd5s8h8g0c7i8ga7wog78hoeom48wdl2vhob154bl7quiyus8skvp4j26afzu4izs2uy8almg175cwz6bmjatf02dgv5v4wtokdkmn09ssgb4445osz5mxlyhm7t5vadxctnuxaitl16ck2tabxmlftmuezld5n4ifpv6jd1916lzh7klhvluuvcfodj4b0evq0zbmzrmpsb8va12nghltix8fe2nw7ksvxv44d5xwa9ke3y98gfczv2kv83oe8qryquk2wswkripwi72urpkyw7l7fkes5guthxt6ly4kxesxo52j0ye18qf1ydlmaywr1km4cbhguwztbpnbkug70',
                filename: 'bhnu9ss36lo3gysoskqcsnl84k1hbjrljhnqbn4t6140h58tyjp2kc8uxdedxzbkrev3fp7p1dviw5gz632w62dla1x4b60mdtb06drukyotxp4eqt1qjuodaqb5ean8b8xp8wxz8seb0i97pm6jjz4nmbig1zx36u599nznaxyeioff0x7xg3siv7214jf2tuqwdmingvomgauvma1s41bp2d3uihii10kiqyonsgd4x2oj3mfnjxlenk48kiw',
                url: 'x84nwaz9vv94nwbawix3blbmhqft1nbznhcvx4r0ewktjkgnea93w9h3werl5cbbqcuix3nudpp9x9yhufwjirxsza8kk4rudzzfcjriv00jx8eshuudzk7rdzc7u2z1ruppn5a9sjpebsp0sjurszbvbepratvtkre6474prnz7ywaohxjex4dpadeuo4kk33wxz0lk4r9wtd7v6mdnw2xkwc5tb7atnzv62xrdq6ktidr08buj52vvnxlledyooo71ij630bnctg01mg0x1qvyepodfpqwbt3ab1y8hq8icfnbbeqjymuy26me84842q2i2fj5okdhq8q99axfrs0latu07p05iaj9gcy5en77lbtlk90imwo00eyxhvojp76cqs365eb24bubr2vk0pgkduz3uz3ttzjlad3gvkypjmzom086nbncmlqqcnhmcqm5lugxcchkygpcswioengqiampk0sygvqro641ogzxo1mkbg9qw1hgcvjtgvwon03n981o473smsf0vg57q3vo1f8g77hhf85z78p4uopwd0to2gd5y88pxmke8mmj2jyj87s9geynvq0rkgpqjq8rvjw6oj6d0d9cyku9kyfdx5bbjws1h3wp3130dz2xmdqz03ydybyrk1d1cxyd0t60m4gk45ct90h6ixm8rmmw3qotxgu377veqgklgzx90bl6m3ssxq0s191vnngj92bxjrmlgiiwy0gxkd0n72fggjp7ng567imz2eryrnytycsm8nc4cxa3y7fm9hofw2b1isv658rh391k4m3g2qgjdfn1btn8szqx7yoblcy55h2x3cszhcgs5p5ub6xbfrnen65enz723plgurzygs0p6co8ds5uei8jpxob0rs8e9e3u74873sq4j0lzzh8qi9n5n66oxmsy83xwh8dctxwr0fuedf08g2upuvvvvwqftusife6yesq5w0szl7d88qj46cc0ybmwt03d7adu8bakfm9hr9eejdap8unxjcu',
                mime: 'ceoem75hpl0pq01mo84227dgwyivl4n2npkjycv4cbhgxyfotr',
                extension: 'gfgl6r9507vh5hdfrexhnxupw3z0e8sf024r0kppp0v9f8vn9o',
                size: 3599250185,
                width: 3883116,
                height: 198591,
                libraryId: '7bbc8ba1-2215-4f8c-8d9f-6eb60a3150a4',
                libraryFilename: 'ij5boqqt57evlttgonznn5a4frsr3cvg3mlduhvyd5c057ev8dlvx4eohs4g23yqgicjg7sde039ap98nh4da6rmqyqo934hlvmgzy7useirkijknar82q3xxydyx1i3u8kb54xj3xsavp6hxllxkser9aeuqbbl8r9mij5vhpqxe4t2qa5dlhmlhqv2wd8a0c3v0tr6yezm05lpqs0tx90gab52beeyxicoljd8x8rynhjqvwnj5dvs7evzole',
                data: {"foo":"s,mqE`}aly","bar":79802,"bike":"W@S7;^JDw,","a":"LX[^ad`!4W","b":4940,"name":"0=zqUA,vzW","prop":85834},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentWidth is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentHeight is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '433bd5e2-81d3-4e12-9b26-95885a285dac',
                attachableModel: '3jamr5mc84xb1yma4hbc671hmn98xxpnhvrfec52emfln5id6jgqf7z6ejd0130em96l0rbw93x',
                attachableId: '9395426a-a35c-4aa0-9188-d6bfda063295',
                familyId: '5b42d274-10ac-40ee-a3e4-3884175c3eac',
                sort: 600747,
                alt: '3stn2eqhvtjwwnnyp421xk567zobzu1zogjkhj4517h4x2y6guoy9erj6umwzu0r8gytd24m1ebhurbp1zwsb3csms2rwu8c1be8g9jv28mphyb8iv8j4qbj7h9a90mou9y1v0lpx8ahkz8od89c74t4qa1y0e71bm6t91n7kad4yfwaf9xmo8sxnyo9atgg4mejjwjv04in78qcqyvoz83169w3u3eev2s3lf8y9sa74x8g1l349ei43ylp3du',
                title: 'qgtp80x884tdud1u6ufn3vg3wkb15rex7y6i7ajagaugc1g7u1y32exc47mg62fixugc6ix0xxctbv0ve48wnmvx6k9vx5qsa8i3v4kaxwmiaql0942vrzj0nanl0pdu8pzimwccjo6247b9ok78vqzq9gdzgsmm21uly22eaviazrt9r1q8jhkoh95w8787hwdphcr4yjd0iufl466xcx7847jrnv97scuh9tiqx8y6omp3xc8ng7fnfn05hhf',
                description: 'Possimus quisquam voluptatem cupiditate nesciunt quia quod qui perferendis natus. Quam ut autem sunt quidem velit laudantium. Eum nemo repellendus cum iusto eos sapiente ducimus deleniti corporis. Quibusdam doloremque reprehenderit qui expedita ipsa ipsum.',
                excerpt: 'Adipisci voluptas aut est. Eveniet eum numquam ullam harum est eum voluptates illum. Eligendi nobis in amet qui autem. Quis hic corporis sapiente ut sed delectus impedit deleniti. Vero repellendus sit aliquid.',
                name: 'l0zrdjhy7sagcaq8l5y9wg2irhxvynbanfypbn9wof7b6dcy4r1g9178m0183q3rjfxkukegsfv4rse4x1yi0qdpo7xy3wsrleldrcnaafgjjljekxu4nnvgfv4ln4gvmwdt57v5mjlzbsxkov85ofj91hvsicuhzocawbil213pbaxb4pcuim5gbqoekaq85jk3ws90932jcym4ot2qcr8e6vgv28kteixf3uy0t19kjlc44gu547tmyqo7ahc',
                pathname: 'fbfr5rlktau1m2n1bm71btf4jn236kpu5dqw42y1ehu2clrck6yka5wssvzptgyf1xer60ro7x60z7zvct8o9lziqikvthd9iabtxvmmn47kdbps3audhfibb02vlvkwnk231lxi42maqorgd2u278xijltwy7h0rkegrkcmdhauruitt0dyulfvdt0nbv0930g5x574pdbo557qjlhe5dvd3byx7k0gvfmcfn1n4u3y7w0n392q6vck0vug2ee4ufgutc65sg8q5k5nzjrrsh64qt5jko56vegqcgcm6p8y82mxyr9l0ug4o8g1cw04f1um20ls5suyzw70sdazk7qyki9s9rh8b2ha2ni0udkjocb2dz3400a10hlm6v1rjsydf0cyw4rvrhywgag9gu2996nsdq9eh2mujp0p1v7gyo8gikmaof8ua34ghhzd1fnxffdkldhisyqelsuaw8xgqegyph7s9owzkm7rao5cy8jl138isyvicjs6immuhm7lrzumj6hmyrsjejxoxumdlyqoqocbosjqu7539xogspjtehyiflufey5key6cv6d6mwqkcs7qroqe5f9fxgojt3o3329hdtsf1yh0jq71muw4lglekfh9b5es0itctofl8kl07j8kpwtyh2ik8tpp6w3g3ruh5hk2ka5cngb41emndcctwlalivb5h7d6wxbbc71cjzu6l1ry79e5goe55lctyxeshwk9hquauqypcrvjs22qgc50dfugoiw903qn6zngwyqf09d4hfqtdysurusvlbbvdm6tgofvld4vjtd2tky8xq3gwkyv26d69swj5i1nux7ra6kdidv322vcy0ppmrplyhck9wj6t747bkztfv6voqv2jrz9olytti9l262u93iqsruk0e68z1to2v56jwyv3vabmc7rq9d42dqkco0omj020498gwu1gajxnglugveosossbsnuetwgv2e2klxhq1mp2dk1f1zv6530f5vejdbr0ku6avcp',
                filename: 'akrli8bwvhddtm9kd0agadfpix1cgirey150y8ww0yq4kzx5x2w007opiogcrpq0mmxnjrhk2r4r34dqckm0gkhdi3ofecdmctkdidpuvy33fjqnixgt0ir4dupfeyxsn4umli7wxroroje9vbiho3m34bgu656v0qozzv7vid4ht95051n7jwmmjhuey9tcmeoxbb6qv4r3gc5x69ks5a6ial1b0hgohcrqj4y5szmxuukji28xd1b8uyvy39g',
                url: 'qp77k5ofykbkpzlq0gt2szax8yxzrxms2h7zithhg01bmwcv3leklzsxa0ybem441p7kweea51sg1gb34m6xduwdd5c0n17moeirgcxrnvd48gq8ycztlsg7xryq6uvqwkn7rgt2j2ihb7g5vh7jg7v2uibjgg0zoifb48jit29ximstlog83rl15ex9hkq7n766ez5h6ntyvtstgq56gb3iygm07sg20nfrzu2o2b3adz9xgmcwiakrykviu5gg5x9sa00fojyjdd9fa1ayvu2coz2hl88dsupiamwy1pmqrxmk4t0wef58ucsjepq4q87x5ak7b5ekxbsrtg12m8v40jk490inpfudycpjadcbsve9suk6qr0drw55jj63lmv250j3u8z6agnjy2jqj54xn5u0gic44vt0alpj7miherfc8030bon7p54rn3559kbazxc816g9gttdm5hfxlm61n5nvcz0q6hyrbzt50u3xsdh6eazufsrquatpv5974zql7rrosv6o4cctcpqoz07ppagnht6gcrlviy4tg09slfjlcr57wwtpodor660bz5ptfcye6p62y2asiid12p3339f48a9mq12m2j59ykot9p4xlzbm9c0jdfnv8r3agqj85pthnrpvqzfm9u8t905h3nukaiak6b2h55zy6ye6cwda0uqtultyzfb0wvvv6t64x7fk99hfaqsqdb5nm0gh5qawjvrpt6qoqidi9ygtn4byjl0oiw2skzup7icnurag8x1nbh1aglb4l4vv5uv0lgcn6dm2m97q2a6qk7vrgz2t9t1xom1cooxyn8xtru6p4jt07ln6ye0e03qdc0lnk2krqq5w4etxa0wwnf6chmw3iojur9vvu4887lgolqvtsdab1mqtq2bnt6tnpg75jstuawpju3064b4ya5eajd2bar1znxxsclxogq7g9qn637pif718dq6v8xqthbn36ftjd57mq13yfuanmxvh3vkbds9bpem7q7l4aey',
                mime: '1vpodw15ik9andwmldaxpq45njuh09em1lgdfnv9o9hoam0mjp',
                extension: 'fweei5kxjz3gren0xfzvds875k4xwidfmvd6qqk1oggy1bcdzw',
                size: 3251128482,
                width: 584001,
                height: 8134833,
                libraryId: '8f016df7-53d3-46af-82c8-b118f4937219',
                libraryFilename: '0pf6hd6vrblbhmclmssrbhrvz7i4pki9mtcn3fgj58fifuq1utsdv4hbgwjnrq83encdw1ajesgqa3usu0lvltvpwjh0z2y57pamro7rcsdmv5bfh757eag2hwuvdeeenaxdrvie6tr6zm3n9aeebe3pi8puw9n4jmiininbbbipzy3zotzclfw6i2ru7wm89w5bxr6fms20npz8pikoa7o58lbxy85prpob6589tcfoeo9dnyrj0j7za9hpk87',
                data: {"foo":"'afT55(HE9","bar":84141,"bike":"mz9bOfEB5^","a":74599,"b":"R`h`;[v,99","name":"oN.</B<z#K","prop":28470},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentHeight is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c0153fff-bdd9-42e5-94b2-ca7310d058de',
                attachableModel: '6hxctf55jrg3h9lhemi3ujko6ybtj7cyzxf88qv18mdxxxq9m6tjt20fl2957g4fxo8zp7tb1xy',
                attachableId: '233a39a8-581e-48ab-b5e5-0a9e85842a2e',
                familyId: 'e064e093-8acb-43b6-9e79-a31f414f5ec0',
                sort: 478699,
                alt: 'rc0isp6h44r9smxigng3vta59nrjk5jpw8zvz73o4syjvm7hiipl0e276dln9gddopnc8a7b13d1jw4a8ufeyprur3glrxkpsgdw922b20ac41opm3doud9tetgcv059dpc46r4yybomypa3w0t8k1ta51jqcbijdx7d3lqz8689aq6c3m09ej3e6qvi5j28q49vb1to48k1l36aree4enp3b4lif6lqmzs7kh4zsyifyij32k1teht6w17h90q',
                title: 'rpnvq5xc386bhw4vkb0xudmjyo2axhkg8qp3zp80qjximiw00imifusc3fuaw3ev45pw61g59tps820qykh8bq3mhv1ya3e0kxna69neatnau2kopeea7hxe2cpx9p2msqm783sx5t8y70ixifcsse67lvyg3nu4vvn6wtswyqk8ieu7i2243tr95u3rwwjkxv507o9m0pqng79jru3xrp44hmnjg0oe1724kffweh4lxp95c4j9tf0nugtj5fz',
                description: 'Dignissimos consequatur quasi sunt beatae aut quibusdam voluptas quos. Consequatur eius laboriosam vitae inventore et cum deleniti in. Consectetur quis ullam odio ea voluptas vitae dicta. Qui velit aut quo aspernatur in rerum fuga ratione. Totam ratione ut.',
                excerpt: 'Et et ex velit eum dicta temporibus hic iusto. Earum et quasi ducimus sed ducimus doloremque. Qui quidem dicta dolorem labore nostrum voluptatem omnis consequatur commodi. Aut aut cum unde molestias. Veniam est voluptas quidem aut quis magnam. Magni mollitia alias perspiciatis excepturi consequatur.',
                name: 'wjotxd4eqzb0wqaugvr1c9tuxdon47g3oksg7geuhud0cfia6ft4gikujj3dw50x8sxbhpmzq8j95knqyzh95jruj6zwg1fyu5qojolvx8lxf4qxqtrgo6yrxxzspwviarwk2t0g90aaqltjmkgtkq1xcp2qbgdlouur8nrr3k7o492zbq1r3i6073kll3cpxyf8gch14zyywcjau9hgfpsmvyfty0ngibzwgp2npgdcnztv19cxpvreaitkhjd',
                pathname: 'vl77x2zycd8ou30or236rbsxatkj7ceaf9jmx516k55fzvn90ftml2hp4b6qjuq7y40nvg2djyv8ivh6l9ncsxkab4mqf5l563hk3j1ppfp3gccbovxdxxfv53ykrvxjv71osbjrgjw2cep3fhvq675wpulaitrsf3l1qzbd5u80u1444p3i45p0u7ka6mh3qmki4xw2hnwraqab2ad65qmtcmygpxw2089rkbakiwq5e4j3hhpe96hip7i0q0pf9e32jr3pi729nu8rk7hvt3630gknlu3i5yhyhdtz8q2bajny01gea0azwdyzhnbe6vk3chmwunronx0tscoceu2hyutczh37toxtm9ifrcgccigcwxuwstad0bdf6bnc4kg4ln851iybjk77ij7hfkcngsik8bespvzrk5kc66w1j2buavrbus7a3wsbfba1vbxtgyx0tmk9ztdm3xck543xghtug5i8wxihqrj93msvpybfkzaqr2jswvgtl83c0omdxwdc52v270of2qzwo8ido7vpl56bqlyssugmcqj5q1cnm7ei6puhoed2y1fpk31j7f2oemk9ko40vwxul5u3p5e86lye29322jzs8ax91oqb253t995yu1vbrg8jlah7hlfjcjnbogu1ap6vmzmtxq9r2wq6r3vxad3swe2bb87m527jkv0wcjl1kworvsjatt9o5rll0j6vm4i5tro4ikyi304fyc7mvcdyb8wdzxygyp2sq008eff0noyju87dnt11uen25pedqzuiszpx8vh6t4rf8nboyjqj2x9qsku0jvczde8xpar7guf5qwlv8vll5uar48zc4swavq4xayvcss7q7qqv7w6oo5ik5cy04o661pb5cjuta1tfrcs3dkoegxb0c9e2efmhinh7iohforl7hu1t5sw6y5r7nq2v7e961nidnc3l3611srvk635pj4a8zbqt2t5km3hfw38j5o7458east8yy105pa5ldrbhh0t3hq2gf9yy',
                filename: 'pgqvf7ro7otrtiuf0ck0zjktrcym388pf06nd30duayb4ofoqt7xuil3ans0764aoawd9ksdrb96lrbhhkk5s6d5rpm8ae03xwhukpw34ccf4ctsft9e5h5j10zame07vr3r1d6hscz9wt3aooxyxdi83xwfvm9gd1fcakewta09ekiv7inzfqbfk5x6vwe8wt160x0horvzu6gcc36y596h2usdp15y5gq52f3molys2syyzw2wu0memt00h9y',
                url: 'u3pmzhqnrqz2qauxq2xr6nwu3e9fsrm3igki3c7lnch2zcgajl0p9j7d6qagmc4kfrgy33fwrnqbay23vr7tfbl1vp1o1dkajsnzqi2t7b0dapvypo3r5jbpml2yiou2ju06ucumfvg4na8tsi69dkjdujvp2skp1xjslke7gaoh8lsksvulgxsoylq939f2czje39dmpfduo7l6tsbz7463xcp1grq1jysiui8z8ahc238qt6364vr1jaummgq8tszfyudbn2o53haxfk9bh9awxc1atbusrayti2x5cfxxrfbjrfuy401fh59q478111mc09lpei3na4rowzio0tz470pfsxszecee6qs421turs7q41gvk8fu4757gvdpiyiphhiilo6fnwju85p51vj9zueftykg1akxdbxp2fi3fvbl3vgvsdie124a1itio4j7olmib175nwn05k244q56epxiw43htugwcg6tv84oz32vhyoak7ng595pz4dpf7hoy9f2d6k04mazzg1av6um0w8tlcfjarzg96ocd4ruwwrx171olirwj4x1yqv9wmxbqwrsawfdrenvrmyg2nuf1msbrfk4od9bu5s5ab4rmq33vmwwga17o1kr3iro4iyzpkc2bf2xxo9qaqcw96bdjt9l3rz7md8rufxvxehldffqtkm0lt88inas1vhj599v966e4g8j8z6gi0jkp9ino8e73en6t51x9e4f5yiz3vbe7sc6c8pldmwbgn28c7k5as69h2w9qwnwtce1w9adpj1ynno248ifhxz8wqb7e3qlaqhl9fjltowy0afcn4jba4le9q14i6nn048eqstsywwbxefr8df74yhwuz8pi3p8jcoais3xdo003hypbhegq4l35ct2i5cfcq834m28jdwkekv0u9496d9qylod8qzom8018ofuf1874tpou855dbhzzabin348ygvk942ipkdrcxb1wrqp4aeey63dz90fsr7beqt4kllwq9fg',
                mime: 'wnbpt4rue4rdw0vf9g2j4s06pbrtliqav0im4rtdgbypz7byfp',
                extension: 'om97kqbajl869gt6z2mbeo2ag02ko4yz3eey961zvyjsyr7ufk',
                size: 9355907524,
                width: 201421,
                height: 743024,
                libraryId: '9517ddf7-08c3-4aac-8c93-0b51cbc7e6f5',
                libraryFilename: '1cdr9xnpgdvaytfkfizkw4t6zp6873qqkpjg0gxfnopuamv1dzy8maba17d65e65zvf78ymcja737ntuj29u480o6s4izrc74eqoiwxpphybqbcrpnap9g1bo4zx4bza2k7ip3lxx2r72961ea8v98wv0fu54oupsmtezayduw8prpe118xph6jboeuuqb5tu6ni6ckzua73dsyix4dnrsy0k7lt5k9n2n7etecrpn2wfovdf4z10a1mzybxl6sm',
                data: {"foo":99433,"bar":"\\eBjmbu.De","bike":"(#E(ClZ5L*","a":4532,"b":"G$p!3Ta:GQ","name":5952,"prop":47206},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '25de722f-c226-4743-b4e8-b1b0660124e6',
                attachableModel: 'ixqrxw8tfumfwq9xa0q3lkyuwe2vblgdlag8jo4m77upo332lskkq76hyflit81cilmwfj33huz',
                attachableId: '84818084-d076-400c-9689-4692717a528a',
                familyId: 'e41f4d70-9fb0-419e-89e5-7cfce7ecbf63',
                sort: 574868,
                alt: '6gcheg9rtlcxlvjtzjo11afw09fubkjp55rqtnxd11j15zkj7pdp6tn3wsh5x9xixuwzof5gnn9bn12njqsvj7qsmlkyelfq4upg8glnj9st8ps5x08mrc8qu9mol18rcx0er6kwpgb563pln66v8565x63cocxjqd609lmrki0gfcfy7zdezlr9elf7wwscy2zuap2hs8smwqlbgr9pttha2udb4iq9r5enemaumpv1vrk8y6ajjw9fmzqrrrx',
                title: 'ojzuoow9588x9gp3tv8svovacc8c4ebzeci1brcdplcotbh4g8d5xdgtjhsjucrox6dhmtglqivoe6zypvr9lwxy2v81tff5t4za3whri0wccji19y8siz9vdywsd3xoe1tgen4l219c7wqf5blenq506c0oh1idjqk30qupw50myu26d55p49q2n5l923k7oanqrvhxxvxgf2sgg22rd45t36g6ar5v935fwc7lipwzdcm2d33sdmyfntjwrvo',
                description: 'Aut ut qui consectetur sequi sit autem. Beatae totam sed. Omnis et magnam nisi et perferendis. Unde non aut commodi sunt vitae omnis ea. Quas at nostrum minima sapiente dolores voluptatibus rerum incidunt. Magnam est rerum rem distinctio dolorem.',
                excerpt: 'Dolor ut labore consequuntur dolor quis eos atque expedita enim. Necessitatibus corporis quidem alias est. Ullam sunt dolores quos voluptas earum voluptatum repudiandae ipsam. Dolores a adipisci.',
                name: 'ujbdz4l9xjqy1qp0roz6up1eb0qvtg4qbg6a9yi6h0mwbbdjtk3r2hen24pbv52kftu2mpuikizhek6wlhmv7r64yg0qc7hv7gdkv8ovs47xq6np9tsu4wnp8mo8peveawvrlzto9t3t2186xozrnf92jk1murcrv5mp7eb2y2aokjr309q6u0rddrnlx1pxd7kh651r9ior0x5rvba4djde2s4v9wsouea4z4zxu4z68uk1d5v9814bwnzoezj',
                pathname: '7qfhisd61src6fr0rhjny12lak3oq571z35xv90xu3a5d1lv0ykj66fef06rjmeuxgi1ukstyvjtpefmirsuc0ujm3p892uqbyea1tjz7rchnpoz4ga8ckjket7p04jhhoir879y4ppd2aonjtt3j9ytqt7wviflheoufabq5ong4ydpumeudpa3ts9sff6rel7t6lsh46vub4os0pbyniercu3m7xamupdzbqrwhndjn24uktgb4u8bcweyzs53l52uvjq2wv7htndhm0jhba2vwn4rxphea141hlp00lj2naytxbwo66jonnfx2nncaz504rubmlscn6q7fg2fg336xqrheuo0adwvwn0x12jex4q5h1ge2rjpt4qb7weov48js3j4jas4bgpbwsc1kysxk2s5jynw2xsf98100lkkkxu3e5grpbpmz7vgebcmh45077lmv5tqitlhjjj9yjerxbxmhx6r5d5bxbxf65sc0fvd79wqqb4qzodcgino3q757ok15446mumulk19wclnhtlt4ss22m0fhoukudr8fyvx1vt387apsxpn37fch40phwapbvdqknx4d994sby2njsjt7thpqwz4xl1kn6w6l6nsv68q5ox8ofvdycoyyhli0l8t2bpatbhgmxzvim7rmqezi1xcycdj6i1ahind2qdfq2b72hd5jlfi9qzqclmbvvwi47yg4f1m4jxplxg146q03csh16nw4j4nmb5d5twcouiizecyu05n33c6z2h5741kw399snxawpcabxq24da7h509di8lmit90ts4euzg3zq8ezj9ws2ck7kltdm1b696wcusuh1l4uh8k8o05uj430l0he7cf52yzig9um1fj6spfa21ighc2gfk9zjv62lg8j6k9tmnuc6m9us2fj5kt8cuchhhy2i7k26nm26qc9nm2on7w94iz01q7rc9ujvodcpbzcwrs8fd8wb9fa0n1f0s3kgr0xbcmyetzv8rq6q2drb0l6yeny2',
                filename: '0og3j6vivlb43npo86ho82g2bdqq655s4cq9qdu2e2kif86to0qiuukckq3kva9tcip3xw5aya7be84plbs77p6p2j4913fvhygqbuwi0bfc6p71mwi7vpjj837f88v7umz4sb49zdinlk103ra5roujqzb0jspz4euyj33ewnbffpc0utg3xu5eprxxi3sscmec2ca6x0ml54ftpzulnzd1g3a7yqancrjo8mqn4ujih5nz7hjphgkijnwqhrq',
                url: 'flyfhrricxg8umks746xgmxbjr01tgsmxuumtuezakxbuzegau8kvqbsnywnsaa1f5z0usm8ee8oopx689mvo4dz0mzpadv21v3z98qhf1adqgxtzxogeoa6um6catxuqn18bmwv9n9j2hd95l3fvzr9b33p9sbx64e047r5uu3whkmzh3css5vltd56btc0symejztdnm5ocsxnushkbj5pou7kgdomj7w3wlhdn0abu0arum8hny9yxsmetjpzc1ur54ns6rmc8ait5byujh2pc8dikaglcfsi8ut28jgns2yld60k32egp5sfyzu3n8jkhjmzyz192qaj3izc2dhfs6n9hivyh4lg6mvbxbz2pmd83tduho8ow0jd087bu0vevek56xs111d77esj90fkoi7e2co1p7pxukxtyvuwgsviv6ji9efpm7nc5jb6ez3aqedbtuk0ighr8wx9kw0axi48rf88ibx9pwovgh9zc1d62m9acem2yalscdcs5vcxzf0rhujjlkfn3n9t7vc14jbcx48khbn2pvrmucru1ihrvj3u68ulw05tq4l04yyfvgt4rc6jxyxt63jg3s9kje1kswc0azvnc8h4kxiuu5m8vz4hg2grsgmk4y6kcoiu4ifcol3bt161f6dcu8jucqckcj1w6kvufos5l5myj6e8kf0s6rtbekf7xlqmcko2dxp290577eiafkkfqn8f8a467k9cpn4wyyiynpexerlh7cx5z3eohezvwy0sz12jxbc9y9rhfb8vlxe33ngkmwmkqu82ct0qd3nax5gh2pvelb0ct7g6wgz5nm9s6sy6w8zw13uuo0ie5tv9vvn9c4ymbedekac3ch2i0wcv5x5usc14nadgxzg4kllg1z76vy0nblv25jmqgkk6ykrf9bjv09p90wwc666vgmrloy4xvwo7cqa9nv889vshb6l7y23z21oh5jmwxpo20jl7l41h3tnu2qy2qmovoj3ye1w536109etq28cdf449',
                mime: '83xcekov3m1oubeon056d3o15180d1g07h2u9j7rx47662o3ix',
                extension: 'djcvodmbu2q0nio0auxzm5rl9xb80ljoirdk7c40tx5kljzk6y',
                size: -9,
                width: 509352,
                height: 479835,
                libraryId: 'e1968c6b-9cc6-4169-b1c8-866a050e77a3',
                libraryFilename: 'g5x6xpi8hqxt34amrcyvkm96m0ncbo2ooufju5qvv66j7mee6dz4u9q8mb2w7fveq6bn61k3cqdf0xtlebqi8vmihs6rd8dotwd6ybpe40frf975bs69dusegxmrblsxgjahea27k94xxyxq8ah4glwsah5lg3uqcdezj0ydtyallrort8xhwfgt5963a46yguziv5pxnf2kjohczkzmj8lznkkyc26htgnzzvufptvdt60ks25xpqpu1ko5f9v',
                data: {"foo":"B%!1m9^{c/","bar":21105,"bike":4858,"a":"ywS\"}H;gz<","b":"FdXT]kX@m>","name":"urKXm@l+E1","prop":51334},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentSize must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/attachment - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET admin/attachments/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachments/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET admin/attachments`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachments')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET admin/attachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '810d1f15-313a-46e8-9ce7-bae11cc63074'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                attachableModel: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6ie',
                attachableId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                familyId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                sort: 733264,
                alt: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                title: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                description: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                excerpt: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                pathname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                filename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                mime: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                extension: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                size: 1552573511,
                width: 322161,
                height: 492233,
                libraryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                libraryFilename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/e79c531f-e42e-4ccb-bf79-a041ce19313c')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT admin/attachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                attachableModel: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f',
                attachableId: '125dda91-89c2-477f-922a-5aa69263a1c5',
                familyId: '6085f6fe-5991-430f-bdf0-96b0633afa03',
                sort: 699044,
                alt: '2zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkv',
                title: 'q7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncp',
                description: 'Temporibus eos exercitationem maiores autem adipisci quod. Modi et ut. Sed quis est quae dolorem deleniti minus. Delectus amet voluptas. Quis atque rerum dignissimos cumque nemo qui. Dolores officia cupiditate quaerat enim.',
                excerpt: 'Quis quaerat omnis expedita voluptas expedita corporis qui. Blanditiis incidunt sint mollitia culpa. Rem a esse delectus omnis. Atque suscipit aut.',
                name: 'bai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrq',
                pathname: 'vlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2d',
                filename: 'wpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybf',
                url: 'lf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog66bxf6rzih1co0zrwmjkki9n0xafrh2tts2ar26nvhfkoolce3bf4nexrel1vcoekekzvv1jjhs9u4hfsdddm8a39ppv7xyaqfei961o369koum4imkc1rwsnb9udmb00415h2uwz7a70e309ux0etr9w04q0qhgr1q7xyavsxfmvtbul7chommvhfzwfi9lvwdsaqvbzknq6maqnsq25wy0mfgd0f2k115ic61q8pv27rolnkrburd6bu4lqfhbti9hdp863ipefk7u4y3r9eq1g5v533zqn2d3nckwn48lxkgpbbhemaoidurn08vcel26a4aarh150mtkezyia1iv9wz3jaxq3p8k3gk777c3pip5oa2t18jfxy91m5yjzzub21i7rudhhrx9h6mdk15q3b1xl8o6isub1nvd2sjanjdxnzy6w5xf0mslm3oo200c2burdu2hzb86dv8bz89y203r4lz15ox4syb1otjzbxr9rl5ys1tbh1sm9qjea15x7pg5p7hciz7rlqb8vxznizh7s4opar59gc6lpgvr297siy3265w1v2vtn6kwoe948o67j371bj5umen4uem0vfq56fqgfuedaosd98bn5sgja46113tk4uunvynd3frv6jzguefgic7mf1litwap9qwrwqkhf6brghmg60gp852jo45q9rtqs91wrs9hices2f07iqddtgfm4d1n1x8rxot6',
                mime: 'mq4z51hblu578t7n0ufrm2480vd51tl3vld5avxhioook57742',
                extension: 'o1sx4qzxwx5cxgh5o7wcw9m2ove6nku7nm5lgfh3eakk1auiq0',
                size: 6065680386,
                width: 462708,
                height: 479069,
                libraryId: 'e87d897b-30c8-4972-85d1-44799cdc37d7',
                libraryFilename: 'p70srcvzkkmlu8ykwen9458cyet0f5mddj2aukgrx8hyqhqd6qlprxssxoowdr7mqpb8uqmrnfh8us571ankn4ia4nw80fzvzrtg8auyirunqjrpm241k2gozmljs9ngt8aw4owofccs4nqyyx5hoj1bx9puuwxqlb2dr41buy2whe59op1lzvhmsuvw2qefw8hvrad1pqrngmyos6r678dbgjooxjv7k37xxwapq77ouufx9rhbvlmw3qs1213',
                data: {"foo":28215,"bar":"_%:vqjlAEG","bike":"IzP{g`2\"qH","a":8664,"b":22019,"name":"BNZaTKZpri","prop":78136},
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                attachableModel: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6ie',
                attachableId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                familyId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                sort: 101942,
                alt: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                title: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                description: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                excerpt: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                pathname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                filename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                mime: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                extension: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                size: 6514669978,
                width: 719475,
                height: 899707,
                libraryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                libraryFilename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/aa772f52-844c-4e24-9f70-ca2c1d98f430')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachment - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {
                            id
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL adminPaginateAttachments`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachments (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachments.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminGetAttachments`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachments (query:$query)
                        {
                            id
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAttachments.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminCreateAttachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {
                            id
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        attachableModel: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6ie',
                        attachableId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        familyId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        sort: 583694,
                        alt: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        title: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        description: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                        excerpt: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        pathname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        filename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        mime: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        extension: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        size: 1418595601,
                        width: 179830,
                        height: 517806,
                        libraryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        libraryFilename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminFindAttachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {
                            id
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
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
                            id: '0cb09a7d-7e6a-4d75-8827-5e2c034510de'
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

    test(`/GraphQL adminFindAttachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {
                            id
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachment.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminFindAttachmentById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {
                            id
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7268602b-a049-49d7-86ff-208899318d59'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {
                            id
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminUpdateAttachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {
                            id
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        attachableModel: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f',
                        attachableId: '125dda91-89c2-477f-922a-5aa69263a1c5',
                        familyId: '6085f6fe-5991-430f-bdf0-96b0633afa03',
                        sort: 948136,
                        alt: '2zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkv',
                        title: 'q7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncp',
                        description: 'Temporibus eos exercitationem maiores autem adipisci quod. Modi et ut. Sed quis est quae dolorem deleniti minus. Delectus amet voluptas. Quis atque rerum dignissimos cumque nemo qui. Dolores officia cupiditate quaerat enim.',
                        excerpt: 'Quis quaerat omnis expedita voluptas expedita corporis qui. Blanditiis incidunt sint mollitia culpa. Rem a esse delectus omnis. Atque suscipit aut.',
                        name: 'bai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrq',
                        pathname: 'vlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2d',
                        filename: 'wpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybf',
                        url: 'lf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog66bxf6rzih1co0zrwmjkki9n0xafrh2tts2ar26nvhfkoolce3bf4nexrel1vcoekekzvv1jjhs9u4hfsdddm8a39ppv7xyaqfei961o369koum4imkc1rwsnb9udmb00415h2uwz7a70e309ux0etr9w04q0qhgr1q7xyavsxfmvtbul7chommvhfzwfi9lvwdsaqvbzknq6maqnsq25wy0mfgd0f2k115ic61q8pv27rolnkrburd6bu4lqfhbti9hdp863ipefk7u4y3r9eq1g5v533zqn2d3nckwn48lxkgpbbhemaoidurn08vcel26a4aarh150mtkezyia1iv9wz3jaxq3p8k3gk777c3pip5oa2t18jfxy91m5yjzzub21i7rudhhrx9h6mdk15q3b1xl8o6isub1nvd2sjanjdxnzy6w5xf0mslm3oo200c2burdu2hzb86dv8bz89y203r4lz15ox4syb1otjzbxr9rl5ys1tbh1sm9qjea15x7pg5p7hciz7rlqb8vxznizh7s4opar59gc6lpgvr297siy3265w1v2vtn6kwoe948o67j371bj5umen4uem0vfq56fqgfuedaosd98bn5sgja46113tk4uunvynd3frv6jzguefgic7mf1litwap9qwrwqkhf6brghmg60gp852jo45q9rtqs91wrs9hices2f07iqddtgfm4d1n1x8rxot6',
                        mime: 'mq4z51hblu578t7n0ufrm2480vd51tl3vld5avxhioook57742',
                        extension: 'o1sx4qzxwx5cxgh5o7wcw9m2ove6nku7nm5lgfh3eakk1auiq0',
                        size: 2592908859,
                        width: 945553,
                        height: 975350,
                        libraryId: 'e87d897b-30c8-4972-85d1-44799cdc37d7',
                        libraryFilename: 'p70srcvzkkmlu8ykwen9458cyet0f5mddj2aukgrx8hyqhqd6qlprxssxoowdr7mqpb8uqmrnfh8us571ankn4ia4nw80fzvzrtg8auyirunqjrpm241k2gozmljs9ngt8aw4owofccs4nqyyx5hoj1bx9puuwxqlb2dr41buy2whe59op1lzvhmsuvw2qefw8hvrad1pqrngmyos6r678dbgjooxjv7k37xxwapq77ouufx9rhbvlmw3qs1213',
                        data: {"foo":28215,"bar":"_%:vqjlAEG","bike":"IzP{g`2\"qH","a":8664,"b":22019,"name":"BNZaTKZpri","prop":78136},
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

    test(`/GraphQL adminUpdateAttachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {
                            id
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        attachableModel: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6ie',
                        attachableId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        familyId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        sort: 402674,
                        alt: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        title: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        description: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                        excerpt: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        pathname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        filename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        mime: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        extension: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        size: 9024372533,
                        width: 770731,
                        height: 922245,
                        libraryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        libraryFilename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachment.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {
                            id
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28ec0d5d-b157-4e8b-85bb-b6c1aa814699'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {
                            id
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});