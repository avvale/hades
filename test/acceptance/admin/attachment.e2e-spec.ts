import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('attachment', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentRepository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
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
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAttachmentRepository)
            .useClass(MockAttachmentRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentRepository>module.get<IAttachmentRepository>(IAttachmentRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/attachment - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                commonId: 'b1fd0ee2-8081-49f2-9186-fb7b3b753bba',
                langId: '4a526a03-bda7-4a6c-a293-70c961f5a34b',
                attachableModel: '08w1yee5ov6torwarunmnhh7z0wviadhzk31talt85x02p0gi0jxfptuuq6qarv5b3ad72lsv7w',
                attachableId: 'c10ac9e0-6cfc-4d16-915b-f200f6cc0619',
                familyId: 'ff3d9f8e-e167-46a7-bfa2-6f61889d1bd3',
                sort: 533617,
                alt: 'lu48cuulzu4zkraplokysfeno7ihwpmxgxt2omiafno32z49tjnv01fgtw28pkxnei61rna5kcp0gy504vcajgy0fwlenhhgs44ciffefz7nwokw9ei3hppe22oyao7njgdpgz95c1wkqotso8d6sr65wdui6kh3swwo8cnw5f58wl7tq5ovroraqp0hkkgw03ypgokjr4i2rnfdr36wjcx607q06znhpp0m85iaaj1gzw7hfverfwwfaktsb0m',
                title: 'ra38o6q1gvraymurmi97hvshdz8gpxxkrb7hdy35bm4lltqkgxrdgk79zk7iiwt165omlzwnkocfbdcp3udbbot5vi0wzme85203weopa7244lzcxi4lrvj7vqmcgncuffnvam1jpbkrnui4gq80v8gl5rbz12prekdn5xqk7l40d2wrzzfjb4fid86jcaxo3s5xwffevvo8cssx74rfbs9ckguno75zzo4fjv0y6drt2fveiv2ourj9rq230xj',
                description: 'Numquam eos tempore eos in quis nemo at enim. Libero velit consequatur dolor. Alias sapiente rerum officiis repudiandae est eos. Facere consequatur aliquid sunt aut aspernatur dignissimos.',
                excerpt: 'Earum repellat sed culpa dolores ipsa autem repellendus ex. Maiores ullam omnis eius. Et ut iure quis iure aut.',
                name: '670n4ewxb2bzlwlxv8tuafe8apx0o093toy5cwkb8nn2x8kfdqvg8vv2r4q5iiycmqx2titbl0r6r93bzfqds0gxxspk2hbydhjrscs9qjzdonr2znrjq6ftxqodike5iayqf8w1tp39yxquotbn8f4gkxs08ikc53wnst3d5fsa6ftxkz2eopfpvk6tww9nd96zlp3bv9xh06efrskl0rgbjvo00hp5x7yen662xksfwsq3mw5lotul7yrp3lj',
                pathname: '59dnk8yqb2spoeg0i574fgbqnkzdoue5l99qzta7nn5fwmi1h3r9vq62s1th5qpqhsbqy1gpeo8a6k8wj3r2tz4dvmekb0g41tlcwo2fspnjuqxo14enui0q0voub3a2ty2m80uj7yskm3w7ybqbmpbf2j46rpox17jp0pe5twcm3q476ob3h93jeahg9oank68hqnv3x3njv2rw7i0kpet7ihevp40uheuexr61xtmiywu1tng4rcor50zwuxo1xk6m635qin1k9afzej2tbjts746lyw5fd2w6km6rq5t2hogckfny9kcif2w413ciggofxuovstup9sut185l0ikol1ea8fmfha6xgpfjlahgxw6vac5o5u0f24xh6glj0gdg0dlcsok7ykdxepnsiy34qut6egf0i23bigf9h5j8kwcie7god8du44a2v5o7srr2dra03mzpxhsgsbutsyblkcj8kerwg6yuhf5bzgunvbzvlo84hbk1w0hykmiqkaod5nuxke7ighni5y0gxsefx082e4955qz2ntcur56oizhqqb9149iczrr2xyjanbtkf2xjwak38lbu1ub7hwsg4lde2uvsuyb3dth6wx1s68u302mud1uaitagss3f4ippx027lq3obfdd6lumz42glcqiluffwfr0idrhrazym4j6lrrivdro3uue4k0w0y5e0is48l16k13lzmxwkq5oyps7yldtp4vownhoj91r5ataz6s0hsibpzz5axsw2ef6nwlod4j96t3ugudutjyyqnf1mnj8nfzxz9o5ev7w9ssesolgglq1c1fx23rpgvblnytakgqwftoasj4pcbqw2w5h7u7yxy02kszus184656rjvgh7f82mijc4hf1qi6duqh9fkxzkn3br0pzrymfzk4xb3lqzwtth3w95rlv42vasbylw1i6cqdspjfjq17mghs8mrkmhpw31rtcakhp9rg09nt2cgxy32ja7e2dhj5w6jiagecx8l7xg4ne',
                filename: '0z3uqolk2x9qokmrdxnrgiw2959p2hm1ddtfcvh5zitfuxblyqz0no67zxpsmpn0ksc1449rkt5ouxsdfaxnf0lgg45vf40a6b3u8tnt3bcyk49yma0fox6eil2aleax9wu1i45keq6bxmf7hoz37c566smrciq591wdkx608wkrhx750c24jbfis9180n2k5q2ab97dx7ifh1xlcbatw81rj03w4ewhfzji5to1daf20ppipjzfiu7it839ypo',
                url: '3axxf0eii4ba4305g7mautv1samddn2fykclq6x6uiacurkg2li65zo01x703edm8gb97gbhorj407n3lnhx1zs5ydivl0syp15eo45fjricc6l9ai8sio0zdi659x4p3mlgpjfgqsgqaxuzpiygzvy7ye1wrfzhdjj1p1edrekvsr0km3tgyivvsrqirzif5iqjwuqsq7069p28ecnajmrr59525d7a4b047h7oisdpy0vpqcshy2pwsvo3wunp6waq1loxw32gaa1sbrvuc9qgvhsbo47ckxgo1ycghkhemj48bwu21kt5783f7hn5yq0toqys671o721s7nnl3iercud91bwmy8kf8ija8sqx5rf9vhdikralkknps8q005il4yhhsc81avy5z18iv7wbbhxcpzcvkjpnkyk8wprj5iu6a55a6vhxq1v41ewq1kjyuix1y343y9exortxuy1fii1a8jnvh225bxdifvqie9zx17wwusnw81ztb0ubvhrxatb04x4986m1sicaid9zld60f73kvqk2uu9fmgocer9nz6tclitycq8w3yss89v3wqdbn30bpg5o26nvzl18f26o6s9e9bwjkf5ccfwa1zb15ytsr4py8cunu5p4f6z46nx7am5puclhy170muo5o7445eznbo1vtow6xebdis9ju0mfdyxg3ae1qwhuaof0wamon2lt0vg4bzqlqa2gyyamuuz4ocdlfjmidc34o6fxx71jbbv8lclqwbldprevpw68v2eb7mye0qdat3koexitmtx3hrli74i6coq4ampqgb8rfivs50qeeexzptzh7dqp6z9dmg45hz1ms04kl6qij1qzysampaaefx0r50je6x3uhcee8k9unmcnap35kp1l0uw4aa7r2j6bjbzem29rivkszqv3zevbk0eiqkuqfg427ryca7n4x0d4yu8g1rwrc34132owe8yy6v2gvvpa908jxqy1ubgiccuw6tme8zzeiqzc7x54mkbi',
                mime: 'f4hi44ylybtf83upkp6ep1tbobh4orqw0mmjpuha1s1mol9yi5',
                extension: 'xmx8anpud9lx0ms01xd8uof61wi2pihuudywsphj6xjo3aljs7',
                size: 8762877445,
                width: 470067,
                height: 626666,
                libraryId: '5b38e546-8634-4cf5-a8c9-fe0dbcbc7818',
                libraryFilename: 'hbqyiqft067iipd05nlf33upp93ltpf4s1qqa3mm9x4glh5c5yoiocp3dzlz9h0w09yt6maxoonc2f1fkf2800teteke5zkhpdeweirxkpl00s1kt4bonkwdr2ud9bgnr19ud10vb29bf87lji74yxtr2xibtc7ivk8btsgdy5ecrq8aw57s1w6qt2zwet2sw4of0ip4sfw1hd5fmiz5sll78ewxbo112n4zisv9mk1ra5j128dlhz8dnua6p3k',
                data: {"foo":11995,"bar":99398,"bike":"TRf62#r]w#","a":16258,"b":85986,"name":"JDqL,5-X@C","prop":55353},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '10824740-4f3c-43a8-9f26-d608f9296807',
                commonId: null,
                langId: 'cabbaf12-b1a9-42b7-80a3-262ba200335d',
                attachableModel: '9vkm1mdtkx8iur7l7msdf3b1lknaorbtgr7o92emvd8o96e1xveohrmc92zzs8m3peqyck7rgg6',
                attachableId: '9ac50529-5c8c-40c3-9e63-cb3336c8b582',
                familyId: '38eb5c42-52fe-4815-a0cf-0cf46267a5b3',
                sort: 763120,
                alt: '1hb33evupatj75wt7qjecn5bn062m6h6pln3f85eqfsqonrt9pp8z6r3ldx9d2ad0ek3bg95umfn54m59pd77fejgf1jgkxrsfab40utw9j83qkp2ndz5xhs8pb5uhlcuwmb3hvhfsrs9z4dxwbqci1ee8ql49144bws8tyz9bl3qvj51uqd3z953hma5t1fad2ugz0zskum5cgofuxw9t66q5iml3uafhbk88k6qxzvsbobk9crljaf1g17660',
                title: '2md22c82xmcm4i8rpuk0gsy33ijxjd40lp8le1xz7m9maozgo56of6vwqof0benvzy8gr2n1mt2n0hnc18ag03rjetyt2bjfd4m30v1o6tmz7pfmn5r9lwl1berkg6y5ernsdngl23i8lgtb5qynwlolo8s4zms00myug4qz7j0givd3v8l2lcckjztxpjnvjcfp0uvudlv3ghjqjri3t4b891auy6hvvht8svcqcmaafy9cshyvvnashfs9bs9',
                description: 'Aperiam impedit nostrum adipisci esse. Similique eaque quia voluptas ipsa. Tenetur numquam ducimus deleniti explicabo mollitia quaerat facere. Quia voluptas et non dolor repudiandae error.',
                excerpt: 'Nobis fuga aut omnis esse molestiae. Praesentium laborum vel quae veniam doloribus doloremque. Iste eum repellat et inventore nulla qui eos nisi veniam. Dignissimos consequatur ut possimus.',
                name: 'a0r6om9fiour4tdu67hbdj3mgv874su0mivsw32lac07ax7q8ns5cjn5ytjsl126dq3bgwx69qh7vaomu7tmy4qf5boe6hcbhyfl91nenou3443bzb9p7hn6ws7kv4bqg1opgp0mvmkxaovzxbc3eva1vmq0sva8dksxhi0x23za7kylgjouchig26j4zqvw59rmp0yuj47a7rkjm213fnc0vne1eg12p5lgkdhsw1h501ax6zxgkvzu64soksc',
                pathname: 'qkw6qo1tl6f25hbhq83w92fvhlmd09uiqlnz8kpheoxyhh04l0sotjkdvz08rb9t8mgc3mdvjg0onl8jusk78rk9v8hm9h6t97n4con8prk54bcb9m5ykzx24taedlawkahtndz13pcg3duez6dhfptby5dh3dcdgeiwn878uij2voog85tpsokctv9ahqlp1dy6qkwmhwnjkvb6t0dyl95laowjy1c0ith9mu2robr7prmv5rzzuhdz4l09cd8l41m3vqrmc7ds16qvkepxo8swcp3lchtyzy68gb22z1taqe56ntiwn2leu2omup0z9hcwk7usn6au992eetnrqwfyi11n4ekvgxvr252qih4q2z943vt7ei23thlmi42t1e03hny4gdm1jhbr1g9yczaisubu1zeohqn5z6p74lg8iigh112uazu3ga438cbo44hc07ji2fe2kwk385dfdo9mkkbgaavud28lhqmri99xfu7wtafwsckqd3qy1pd7wscez1uv9v4lix67t4pa8iicgan5n73uiuekuzp68t6rcbp6j0r5lmgio7qmkdarj2ervvmkt24fcg0rld5y2j7fa8lr8n7hi1ocy3mwmoo8isadckx8gijj15swdp5zw8mniacfohn9rd6obpvd5jytrn9fcgnqx6t6zbzu2csiplv5tpw5ul9kgxlkgczy1gmzj2yg1z6dx0eh85gs9x38pa2w2dh1zgsdn5ij4o7gek0hvqktht1cyji09z99h2dg5kt1rmc344bbjs50olfwgbyqlvjyaj37ub8w6ggefkbedz52jyi1kmq2xk2y9ssaf009xmq1r730b3kna2poi8j85r6la0xdyhwri0vlxbtv4xohc6k2ldk3xpax8isrda7v2ws2kit2g73cn384a52wqc5df10xdjh5eacgzd8qnln8wavq7c7gfce6sbyxqplr40xunuugztsxj08mfhtsdhkeedkfr7gvvec43bqezhekmzux0nd224k7',
                filename: 'qxvx26m3wwklklpoxhz2n5vb39dvnj51gb3c82lgx1qf7x36yhmj90r5wmegmr7s7bcp1nr3x9z8ce0c3fqbs15uiq17pkcsdmru8f0ex7fepkd66ycp7qs6m2ppw9ga2v5nwqv1jn7btfp7g347irrdfvl8y1677ne5kkirr5yq8f2bppb9gxdco0f9flhv106f7lsmslem4zdxwywalrufmca89xd77x18gre67pusp1j90yuzwo99zq9lsts',
                url: 'kghevlxybv0w36dc86gmaykth6yrnfhd1qf7kqp5jzuvg1u1ytuoccta2620d87gngm0ok8xjh4l0xesroyzj7fdpnh0vrtx48d1n2qvxmawki02dcmrgm8ur4hvmb0fp22cry3ukc84cyhgupd6gudc7ts6z9c1bcodekie53ilk5wcc9cecdkghdzs8f2aevvuspy9dlrln64k695ovlt4w0egn3w80lemjpqr9djgi62wl62pqag1r69gd2i3th0pqcq0drvl2piowztl2jzx4iofhmbr8hr250n8m2tu04cma2bfhm7kgfbvn2fv27e4tcy6u1i48m5825g33jtmgv5r8taar66xz51atoowb1c5z0t5n46227mndljgnj62h9sjc3fxlzpngxnu7cj7anlh5v4q92xqzyyey6snocgvg4ml2r0v6whndi8aah5y5r2dfvkvrhhxbvq7vkl3mcbjig47ku546dcbqhqp47d931yhjl41mqigpev9bw7036738iibkjrdd09jny16hby5y6as4ora1mmcq41dw5fjvl21ebxq72v1edn0uyx1weoifpufs5cffiugbh5m5gb0qtofccaob35vmhb4hw9dlkil2z284il3rgjg7aghg5h21ghkenp59lu8s9eovn4cuvwt6mpv7mmrsnqthustc6gfp2sefstt9osrkri6z14nfn8jt9frskc67f135ynzirhiyu09oyq5uoa51c1v4nv051xhadp7qbzvkuslfkw1put24auhuxi5ot883j48b7q8bof26dxbr7r0eiovu3ft4uim12b23yex0fypxmyf30j0skvwmbcxzad04jmkh2cz2rsbtt3ng4pv4clzcng64006g3fwhqwlx3uyvleppxzqz8t3qqa9pk4lresareuiy151syrzs8eec7nr6b7bhocpl2vm30ru05rp0pvsi9ikv34xp72j42m7yqtbeo3vkhyi2eo8sghxh707mvxpd5hqcmho6m1z',
                mime: 'c504uc5ukghewf5d693hok99huik4gkg9u7xgev2vmrwgn5xvg',
                extension: 'gh4jwpx5aevsxt36a3aauqej08wm4ck59z5x0dkq1fak3h492g',
                size: 4244984163,
                width: 721997,
                height: 474896,
                libraryId: '160a35fb-4729-4b5c-a6cd-c889b1a989e3',
                libraryFilename: 'hi6770o4n96kf3ywts5cln17bqeiyynph5vuojxch2jtfn32wbti0bh3h8yaxr1radzns8whfdnttcge4ccrppgkxkvh971dk2lp52kx0kdpvkl2mlx3p8e3oboqjrnfminyebkq3vrgfsjch9q4t7csc42ottj4omx19bf00u63swrk0cjneb7do70yyktt73mxor3xdernm92cqhywlhhg6evk7ztxhm7d5alf4r09sr9d0bhevo990dhbk96',
                data: {"foo":9802,"bar":"P+^-YpGTSb","bike":87255,"a":">n46-Qqo{r","b":"C!x)H(D]F@","name":62691,"prop":"U<g/>Tw`G*"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c28d771-bd3f-4cc7-9c44-848a00d5305b',
                commonId: 'ad6b8353-e20b-4e81-a75c-709149d6e4d6',
                langId: null,
                attachableModel: '1j8vg1sxjzeo7u1e17lucfm0olqszborq1dyeobirizy2md3hi2so1ihkmhbmdtrdjrbywj67sb',
                attachableId: 'f93d5680-696f-43d9-94ea-8f0b1f619a29',
                familyId: '7b58fc2e-a4bf-45a6-b681-efe2d6006a41',
                sort: 369943,
                alt: 'tx46f8ygr7gwa5d8c3c9m8ei0rpg3sddicj08a4a9iuu7r4zmarw9yh09s484xuxhz1541o9c272gwwytfnni54tt9yge6e7anmbyxa34f59n2amrtdudsn4qvecnat4b04jc4ts0sye2cihuis5ypgyv5b330b9xb0rgnmp28n1mmv43l7krhrx2sbg41s2it93tg2wmp8emeteiegzoxxla0vdrqp899yaq8bya427ykqhx0lw3rb3bpvnpqi',
                title: 'hx563ib4ced3wzdlnpelk2pnr5r6ren19ox1alrypmdi5d318n6zzguwdoegst3gfwtje0cwzyymjj87s493osfwmxfgwejzehlow17ovsx1jr4uiruffypsco5nff6205mfz1gflwkgz0b0ww1ycffw2dp4hvhir64b5tuu9y2449o0t3m0c0ucoxoregw8p7con5phaxrvacy0oyjhgp0cbjq5boeuy9mn497qxi4uotfw4tokw4dj0ikh7ni',
                description: 'Aspernatur delectus nisi sunt natus ad repellendus. Ullam dolorem vero in omnis repellendus. Est perspiciatis et sed libero ut. Repellendus sint architecto non.',
                excerpt: 'Tenetur inventore alias magnam voluptates qui dolor qui modi esse. Consequatur enim perspiciatis doloribus cum sunt cum et. Id quia sit incidunt ipsum. Dolor dignissimos dolores nesciunt et similique reiciendis reprehenderit nulla dolor. In aut sed corporis cum ea.',
                name: '0akmx1qodcbmw42gedjothovtqbesxubdyy9145g8kob89mphrd2r7kvpb7zp6yfhq6cn50a9nlmi2zheo9g365wkm29qjj2o1mnh5r7c1u9drrc6nj33p5y7kojlhu11sj765318jldimbyk9cndffcpjj6gbolra4yw48bhd9y9hf01z46jkyipg0nguz04obo3xaxlqq8zm5mpq82rcxknppgwcnpv77or74s2hskul360iuiks5cgq4bb94',
                pathname: 'dc395rbtvo89j8vwnr02i9n9y19ifzflbguv09oi8433rk2q769odj9gdg3zoirpt9yfbhbl6286f0watkyfxl5gdlydvb7hmrs1yx58vdg006zs8ea8f278hunnaqppnb9y38cbcllwjefoyglozv7zz3pzjuf1gn867r18ropy4bf2b1s1qmu0u66uaews874ckvf81qnmzoe3kl23fmzmlnyod585rxk7gz9o1o554egondpoxaz7mwbznwogjolglbcn0i8wiolqdgidgd3wgq5n5rw8p40pr5wf1kxnrfb3gd7g2b9amdjrkqva86fcz7p8emf73qqcdu8irggv9auir044ecih1u3vhs9jy48nhroa4rut87u1e3y1iut3s3tepqdbi877aw36grsg62d6pwi5q1gouwzar5mppw9uv8yss86qb5htcx1t4efhrxal2db37qmcz3qprzztds6fqvjceg229g3odtdtsshv6xvugp6yzhfrhuwxgghuv4ekw1dpsekagt13layoxzjcpavsnph4wpmtkb77yzycie3z3holmw442sc24hso5gr2vhhj7p1wkd4ol87cpit75t3gjf52cdxv9hvotpdccez1n8vql975dgyw8ktehafhahsjbboyg68aieuz46esinywvm3ofzi1m9p549a3orcqrai2e996yyzxdlbxo92n5vi28l08geoo60nvqs6qau8g89tf80ssy2xfb8ioweb2sajwgjnvc9g20rmgmnsihfn8kj4gb3flfv41mhhd820n3lzv52h0s91ntpkx17stwgb8aq51oh6q3dcebbqi6334z0imfed4cp12sfwlai2nc8hcbr44xjwz8i5od3kb5q6nh6r0jqvvf42yz9bg15x8144i1d9m5jd0i2juwi62i6cw0wcssfz38er1h6i21er807drdywhb1js0to78kz1q66fzwvnxor5ecogm8vebjjpjm7d8jqfnysimyosp2yk6mehivi5',
                filename: '59qs81zs96f1gb8dxa6s1dzvpfwi3ybj8occbxt9fn48v8ehuiyshv4ig2w7xby46thhcyipqh2fpc9xbhngwobzs240fbsuvwxkr7pzsq5rhsdj6kndlu4yxs40rona51wbew9ichnm2ozg7nd8ecm1hs5g1lizaxaod6tv525kkp3djf8y3gs4i14z0scsvwdgrob62cr7hccdz3um47mlzwvfgcr4au177y2a75tdgui2zsn0an1ejupq74a',
                url: 'h56vfa02wzou5racwp6njck672wuam7s7qhxxmily3cj5qedgv24ckl4irc42wwj8tb4h3wm4blr5cbhv8mcs7qs5lhlmdpjfxwveeh3soa35nk56zy8pji6h2exoq4dh0aptv3nvsr0xc8i36qj4esijsmlr9676tt78vchowj7z9y13y8rkjhlzpbmsfllcp3132yk9db3sq6nhjbcpeulgc5ctjryr4q7ln1008oykjjf5g69t588x7l8mcof4l25dhyj1wvtxaujmls4q1dmzdfyq09svb02bhmo7wcp7pmtpd1bnmjzrfa2zt2s0jdj3dhwyf824b0f7n9jj0tuodwqfycmj3ehkpo5zka6libl12om2y2be5w9gqpve743h5p1wacm7dq5ff6q5aqestok7ikp3h2fu3tj33ybigsb01xoybtvg8462oleeyd65atvt0wd0astvdqj8htwvbfd0tom023e602entzu03prz7ldn5pl08jto0cuphxrjxvhzm4d0qd5jn1isbs1c3q5wflbkfu9tpiwhsnrfmdd6n26pp87mh1ox4r9tobdewwf4w1qaem60t7s1qng3xvhxk18r30h7q1q5bhgn8n9r9hl10b5yw11gans7tf8r7b37dc6gg551ym1f55ul1fz1msn0c02emu8v51hxoule4swxinzxl6g0jiydwnbbdced7q3mbyyr6o4qjjq4wk6zhdvavxmia0fd4pmm1ux7q4c35vvecb3yxpuxmml8nlqyb48b8lz4z9qb5al1cr9ges5dqrjfrqrvfymcgtruzxjh8h28qfk5zt083iggwl10rmmsmtqt6grahwoa0lvixnsp97lquhshdaz10njowzhnhz4rp1zbjn27mbo2jdd9o9viie47bx6l66v8sy5s50fy5vs8auzz7wueql9o76nxdoi3kvhxh8sxsj8j5wpst81em0xtphilav5qg7ropl48cwo4kydqre31arr925cf4135bugmm1z',
                mime: 'v9nnacxrvmrowbd7menx2oqtf88w5qygg1ny6b0iohuy29zjkz',
                extension: '55rexlfksfwuoy2im2krsixoixubp7zcnfkdd2csn7pee2nlh0',
                size: 4736106118,
                width: 601696,
                height: 933574,
                libraryId: '687343e6-6263-4d69-ab91-17e01a9b85ed',
                libraryFilename: 'x7je9kb5yrykuuoxfkwfw6e1xyl1yivjayliilbs16iql0883pmjfrd2tvqz6ly00z20cgtmnotw8ljkepneblwe00ugpcurazwe0k76ub6tw515zgp6q7j4tr3tlazpr7z85xbysznkxywsbmyf1e9oc6kbqd6bkjykmulizoyzapuld6xp679q9a2vbc1rnpbvsk7nnrpj3uiarnkp0ukag6f7xrqmgyowwpz2n9tf4cjvtf11zdfjzujpnsf',
                data: {"foo":72147,"bar":"!W_rYF\\)*s","bike":"xNL%|8HfnQ","a":87775,"b":49280,"name":89248,"prop":11689},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c769edff-84ef-404c-b9fb-b033b178e4c0',
                commonId: '1800fc78-e301-4806-8d1f-790a30178db3',
                langId: '2ce767db-9bb5-4c28-ac46-32bae2152519',
                attachableModel: null,
                attachableId: 'cc0de0d9-1883-48ff-a1b9-49ec53637ac1',
                familyId: 'f0a871ec-b0aa-432c-aa4e-6a0459bd9d24',
                sort: 662717,
                alt: 'oztrqb2kr1bbi117gxbma6ati9uop61h3ufodwyhjaifmqj5jevojw0hk1xzcwvmzdyz49c2wgp0i2dfzqmhodji5prsz44i03yysri1dwzyrkpar8grh3hi9tcndvdf0nv04bqgq6yz4eitcwba19nwrj0auvujjhrn59qe5mdaxflp04ymltcfyeuda6h17p703kixtfjp13aok3tztrqv6q9dvtdzw5a8gej6itjltupdb8w57fuod3fmsec',
                title: '3x2c4ppqfgwejp2k1e1uhhru71475uwxmqkry9czqyugix5nyi34703m6tsogxi5zqurmmnu9r01yxaaan09oam769zwvtbs5g97zf07z4sbcjq3l3ib2jgd55z1oiq2dnqiqqqwtkqg2n2sp60uy3nyvyoujs6ufe6tdkytdzayqwpg6nv4qxjzleh7afw0qo4foy8guyysk2mwbuic9rrmfv1npmxmk1yjak2v1h7d92vafb4xejdrq6c9jng',
                description: 'Nihil eos maxime odio est placeat alias rem. Consequatur accusamus sit autem soluta delectus. Consequatur maiores labore eveniet illo cumque.',
                excerpt: 'Neque omnis excepturi adipisci nihil. Omnis quia exercitationem hic similique repudiandae eos voluptatem. Voluptate quidem cupiditate et nobis. Non eligendi et id dolor itaque consequatur quia.',
                name: 'jsejwdlc66d74pzo2k3l0360g2xiyzbmzozwq3q2anbkqjau35eifhhcc4v1v2b4hbg5jmasmro1okyuul4tvk80m3ymsd0oxd3nosz4tck513jxyq7g42qd3sme2wr7gw7tbgekjl8axiktqahaxy0leru7nyjnm5i7sqmd4h890uw1mkrb7s6encnen8th6pn4jh2qjlgmal9m5yj9f8e6j281j9nwdrc5yh7tqkqt28byh40r80ikl2tx5pz',
                pathname: '5ubp16n8x7imhk58lf792pixpv5ku70qplvwp2ro67pv5suqnxey4jq56rpq3mm25tjncu75evexrmk0vrohpd3i5kxhohbwo1wrri2atllp9a1zags09irgr2hrvzz0p3r5t09yureylto4xnz7yh88e3qq6w83e63vzyveucfo3t69jyk4ithntri7zxadhblrk6tv3dmfl7g23uu5govxob2pqsxhcr46n3tbgrfehtz9q21iti7urv0fm1vruypq7py1qripv4wutg0n34ajiyh1gaim00ltoloceyr5kzz8ouyte99yi3hprvgbiiu12aftw4dzc9gw00plomkswtr7lu6ch5y2l4j5u54mxknze8ybnz22wvnyqynxdftyx2gm38cbqsookz0erfpb6l67hd7r5piwsmes2g526dhyq51b24cu2lgyepoyvqffit4u65z6cevff6gyysc6toqf7wszdh1pdjkwkswp11eyd1oo7ksihgexpdtwq2shtbtqgczr7lhkrjycr1r630hxenq554kf0l38h1guuk4q6a460558td467ub8qjdxb5afq58bvcgkcmfijoy4grcya89j1up4ckcerqhqcnq6wjlld78qavvuq1m0ob5kzuvdvxx3soda1o2axmk9edwh6bakw5j3ovjyinfage6kmmzeh552l78s7dr43shs64sv8kml001fi5i7qw8qs2dumpntsp5tlgl59wwosppk5d6i1qcgv6xe5vs7k5ci35y8accj92h01qlnflvmgurpeq6j31elula1xmcbk6b84orzd8xbbnjv9ffnh7qkf673i083ga946vc905hesiahzj8jc0gmqqknnm6gjrw1d8arr8ofvws3nifj85wt20n32qged71xgoa7gbyroen06ct03h6go84bxyr7d8277qtgzspl9856wj5b6uyamlvxobrn9nere7pjo4k2avx0zrgadk87xj25zl2i3hm72upl885ri43taxrq',
                filename: 'urf0adkqm19w7saeappunysc26o4gtm0bpjjjyv8qbuwdwy5wnlhf25s261i7ieel396vmnmltajlijk0r75fg58p1m3f9bvpqm395smwm1qu6zp37hv84seprwarv58ncw88fzi3veetwetx1dt1xsc30cpxgcfrzi5e1596ywzggq3gnc10rj5sflfit8nlle3765mqa8ntnnrho7e4ihopifc1ffxl900vcro6v92k0wb9h8bnmvge4im7cj',
                url: 'kc7gcixzs1opnlgg4sbcczha2ll4w91gg1994hykttehciggh4395xk6ro8hnhidzonzn4n0urydmt9omhyzuye4bzpxexgwl6vi39xqu2t6k5oqc07vof99igno8o4g3ei2m59pbkzul1gu1hdtgqejjl3i83k49xihbqx5k5044q7jsbkmny61xwfqw41g2gjh6o5friy4tbu5k6bx99k6xqooh29b4b3fwnss5qvzth3tmfvr7bvoy4etn3cvfecc8cfq47mxb7ror2dgukundm0xbn82remfwq3yd7cwy1n5ba39g4gj2e0cuz5lsjx7n956pdz7veq3s9ou9ezbribcbvbmuep4xoawhoqa2munlxnrmosd4tdwfi34xz04oljy09rmpgofqbuemeag6hylzf4n3gqgnca2akb59ritovnibr8k74k8x1uw6aqzi9h70xxtp0myw1n0wb9vfhhtmfk8lkxmzmmtrgyg50f9whpvb32hqbulib0zp6c2n0zymaiu65exjen1svf2i3rmhoz53oxc9xpo1klb1r81isxxu11zq4mn33zrf6st1ko6k467tnrcjuvilpf8jwpwbywy0y9anpulzsx6ljt3evgl1jhqrls1zw1e7ej7v8xl4wu8stlp1k9bljr2fpkd9lvqfpywavwikipo1a1jj21y4h6j0504ps8llfg29jvl79wxskbc2fpqitdwbhr3jyzqf6rxrjsx6u7c6g15bjkb9njqtz0usmevmwct1de74i6i7jzhjz5ssn0yc9dk1p6a7mztnlvoqmnq4jcbr5ome4it674odmfr94yay0g1f5xscgkuun6n3izl8svwm24ep69iwe9jk69z23yh5m5btk8t49q3st6r98o2cjuqml7k3f9fpb4thao4f1b1kfgt65zj4agmzd84wy0ha34vcebpoiuelidrpdrlbkn7mh6uikc4zmjkwtfzuc2ley038sp6u0wyof7ne8hvphybcqaiohbvt148',
                mime: 'i1b8h4bebskary4sva6vlt175c7gbwi40fw16p2dx8o9hns5q2',
                extension: 'l7v7d01aq0xlolhh4292184ze80plu9c3x31t20xb7ij22el2q',
                size: 2400230497,
                width: 806973,
                height: 117258,
                libraryId: '2dbbff92-deee-478c-9f8f-6362b855118e',
                libraryFilename: '3m3cx8kqor1kjnc9tlyclqjtrzoupk96genhnperzrzkwjbw6p4bk5jmiuhj275u5b1uab9n73a774dg17oqgeyas1aiu98okvqofjc2ngpipnh7l3c03w5ej32ftuegaoii8h6fcm0pflu9h88v0528gm6uqx3ti90fy61tmnmijc39ir2upw1w78dklp7nxjejdssvkwqfou9ktv1gqzdggj7f73iqx70h8l9aul9f9svn54xh73feh4v1yh0',
                data: {"foo":82037,"bar":93529,"bike":1033,"a":82470,"b":"AJee+5oUQ]","name":40497,"prop":"BMBqQ&w_R\\"},
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
                id: 'd697f2f4-7fc1-4ffe-84e8-616684977312',
                commonId: '2f620de1-e4c9-427a-a66b-7300eff8ac7d',
                langId: 'af5786bd-7d85-4b4f-9a86-30e341502c80',
                attachableModel: 'id038o4e3juqu9ldujvb1dfoh2t4u16bk2fzqtx3b7lu0t0hmfcwogxsoqwugrqijg1cbe7kz7i',
                attachableId: null,
                familyId: 'a2c8a757-e46e-4f20-aef3-f14b0f83bb90',
                sort: 489204,
                alt: 'wsm6beqb5qzanl3bok0csyx9xdcixb0feqg3y12t5hci6y20vb2wsjhzvikrcn4hnzivkabhtpfhenqafwsnzxjfrlgt8azqzulcd0vd7lmxlmjntebtgvnpnnbcsty1wkygizsym4fsnwnfrjuww7jb3nt78uh49mvboxkr7d0w7uyl67xzdrzle9rucppbv81rm0ftybwa076pwxzjjx8ezvs2jn0hkxm8ipts0p4ucg0sek0pk4vqrsvib5u',
                title: 'e3qohlwf6ohpo6u8oujbzvtnk9zvrmfda3mkzs51c3217ux2uzwbsaktt2pppk1are8akzcd7qrcgkjlzprg97t7wn601me4gek8jmaavy5n8r9bbj2udv95yn3kyb2gkskevl9ugx9p74vlbtvb9ko1i8o2u1fjz47umgenuoqkvxqn4avd0nk8beqinxo08hfvq70vcxh2hp307wwdwjcbdzhkego1z2azkyzjyize54dy9qdy23rtwjljwgw',
                description: 'Sit harum quis. Nesciunt laboriosam voluptas est molestiae commodi. Quia dolore voluptas molestiae maiores culpa a. Et quasi ab fugiat in iusto fuga ab reiciendis et. Eos ut qui quis nulla ipsum aliquam. Maiores et et sapiente veniam beatae sit.',
                excerpt: 'Laborum ut et deserunt quae ex ducimus a dolor. Quis ea quia incidunt expedita qui unde vel. Repellendus ex et aut. Fugit magni voluptas quia nostrum sed veritatis. Dolorum ratione iste nam aliquam repellat aut veritatis excepturi.',
                name: '4rx0wcfpfsg4e98nse2hkmni4k6suggoymrd6hr4ec98uq76vr9xdfayteuf7zrncvfrtlwt6du532bakx82e7ifk0bekzwosipsfr64tlylbtz0cussdsgig2ztuy7oa1uhctz9ur4hx1ay2686n0wsedsqp5m1k47u4gha51lvwj5agjdsvjmvz06ztplp27xfbu9pdrlbg309tpbhj3tvlgdz3d6kmuvc0ly2z7qeb570xpbc8yb4r58sqsy',
                pathname: 'vtbdpn0w4dc09d4xj41ayhejxh3mbkdyscq428mtttxid4j00xvlijngy0zjnsv1fn96ni0436a0cdqkremx53klc0eo55gwlxnkzx7qmw7brl7tmf2zlkyghvxs0nqvhf0oh9amsrzwms9rcmj35xlf3gd7dioo9u5ireuigprleyc538ju5tu9rybcy5kasu026t6pi3rlp2zkmgjqgou8gbusbbffwx9pljwlwk45w1p0a4e716fgko8t0o4hl4qmgxjpyvwmokpk8h9fifbnty80h09oyi4783thud5z1bphbnulxac35vywpyge7jj4osov8hmny4hyxkko11mk4x8m927cv6nas1g2jlc2mbstigfo7w2fqcsv78fd9xkjj7evspybo5joblyj2ojcetcat6gqu5l44y0osovxhdzwdw77ri2xsrja19sehjbzgx1hjoz3ao0o630xnydwunip050yvmygzsnovx7817ljdbw3id3663alchdovzr8axktmx13fbclppwy181lbakm6ap86xggeqc7qdfofh3wsa7onvy8devpp2zwit0zm1dpssewtnh1q4bug29n8mr687al320qvtkkzhsucwgj4o1ruhswv7ktnpcwib9fmmejnm62uiux9z0mmzqhwczo49hx1rl6xynnhw09jd6d60ehtq6mqx22vtfwotek574ums9o26w558nwqwuabniwp0hldnakyo3s82qvjkg8wdeybie09flcrahao7zmcyc00ub7b565fleocac8kegtv7b7l3d42gn0cxt58t96sizchx36mp1caouf404vf309yr7wuu51izek2onvwd10ntzanh2fzma1ac4opm5vrpocolg1hnqiyinuer7rd2xi8c7een6ehl4y64utcwgiog6a6ejm8oz6ej807lmuw3a8kggw5yilv20sz1czbhluxkdlxl64vuo244mubi9c0un3jdmajlnts2xm0obw1omjvruq89e22l20',
                filename: 'x9ws9zupji9z8ugoljuwt4trdlq0r6jv4njr89vjf6ygcsy5jktym8dmxmif8l618rpwrbogxliasulb2u7vi5bmmx1zoku019xyxjgebvfrkyo0gst0kgu4zi3vr4356rlt3qqg7qkfzvq4e9i9ddwoi5uzewbhwrdz2cyx0awgdppdbgvt530wwfy1ilfuc4pmbk89kdu8xhwvs6eivsvwu6aavgzy5yxuju30jlfsp6mw19qfcyqp4l0rnty',
                url: 'aggx11aak8pwp0j93vu7dc1v28ivea85xrlwdp2b7rlo0kpxbx0an3emuuscta1q015gyaae9y2lzfn3slld3gul90d0jwgopbtu2udssus52le5t5qox9w9ow41j0pd3xya7fs412l898d20g2ql0dz9ojxys9wksqe8rdycazs9pt5gsqhvlu5t6fb655h9htinn0b83pjtkv00desp464ladwjfnfbarq5dvis3zi2igf5k3a74uq31qd10mo2l03p7hdv4eyhg459pfqoevznkjl5w9hs8hf0l10zgz9kwelgq94auj6dphho6j0dqi8ry1t4iuwrrpgsm2hrjr8i316t655kafo63m6qwgs22ksblgtyrlyn06t5j6aucpbj1g7w1drblay2cmevpofev7trueq67ku3povp859p76l3mjbpzagx3u2tecb2d5n0sd6nycz5lhypx0iib1k4sjoier7quzfgdyhpkxcg0sauutmjrcos6g9us6lzwp8x736wp02zle43kop4h01dhttqbvhu8541u2b5ajn774xwes89d3tiu4813qznum84u1wh1jyr74tazbwdsyynlwa838gmzzb8uocffv2dl8jx78c3gx3jrgtdzeruezn0kfn6da863ysgwvej1e8y04a3i0gfde408nw6odr0feu9svtl9k3p5i05ctr12n0wn0oqeboqdx1fcmo63f332stq8s9335bbj2yoy5wslxxn11cc4to2hrmuq2lgm12u91sddexv98d0c2ydu298uqoamkcpua4outs6qcfmimwxpg3jrk0xq1szthe2nhuoizs28jwl9bbvktpjzipgk40syga5tm2kdjtyqwyxw974vf8uqfytam7cznne46leezbclmm1l11xq0i1t5mr6u3qde561vupcmnpfk7a4o6wvpzyn2yenk9k9p07jlficr9xp1d0kqeprumuatrflyl7qlmq0bqc5ix3lvfeacpn2iw86fkxluabl60',
                mime: 'zdh5dvbwxd9r74k6w8oi3evj7c4ga0uiy6bx0se9i57wj1yddh',
                extension: 'fnqhpqutj2ko6n1sfkcdbgpaaw24opb2v2aqu7g9z3hnqiep47',
                size: 7491929461,
                width: 757798,
                height: 303249,
                libraryId: 'cc6b9ac2-3158-4425-bbb5-59a308f89a04',
                libraryFilename: 'nfszf6dxjzzukjh237fqtzu14sk0gnm6v9qpgco9gestucur4gmp18kwomkhngzefymqzqo4f9ibsxzcn1u8p1ilp4o5b074wqij3dcfdgnlp5bg1rpq5qdmohmr3681j42h02tav2z7yxznxn85f68r0cyb8kid84ny50yci9pm4vglizmt466jjm8nn1gvhxmp4xxi5ysiva6cjghxlxgxg8u1tuajwqv2ju97jiy86tv3ov5270vsbknji96',
                data: {"foo":"\\CDiD1[kwp","bar":"WYF'FbqpF\"","bike":56946,"a":42048,"b":24428,"name":"=,gqH70a{,","prop":32953},
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
                id: 'ad69e5c0-eb10-4ab6-a729-41ba5a5874cd',
                commonId: 'ec6c53f3-9ab8-4acc-9047-0dee6db5a4bc',
                langId: '5429aea6-10aa-4941-85b9-f8adee4675fc',
                attachableModel: 'qyu3svp0ctojw8mx52uuiluodqgpwsw62ail377by8pxnq456a93i6avm4nwg1wypr6bao4vwv6',
                attachableId: 'e24bd8e8-9e15-4910-86bb-ecd59c1ddce6',
                familyId: 'dfb2a4af-448c-40d0-859e-e8eaeb1ff56f',
                sort: 727169,
                alt: 'qd7qrzu6ala3pbnp1kou28cjm9qppnxt3q7ukavxerepybqletr0iig6f1hfrmxt06dvk700s63k9yrwtap8t09ql3zszqpov5a33ax3f8qgdssoiawbzmtc34ow69kvknnsogoh0gg8oste8407frtf0uv7xy17graykrn2anxv03kupochptcwsz58o257jicu7uyjlxqa0ki3jqw957xyx0ucuo84ams14ffuaw1nwrjjta83xvkhprvoexu',
                title: '2tks4dr8r43rcv4yn3pblzg91uvmwdy2hlify2kofdmualykcf9y2drit11wmph5xsbzjfljc9r0t59p56m2rq6anwirl8cdp211d8v96n1fviejj43n35iv7fayk0nc8uvqfbqknxwxbf7fi6qydlcyp2c31d3hou1gvgz46raec5ndjv9yfrx3kp4z4538p1jdhvr0ky3v1lm0r3eb0hphk3mt81ykthzsgqfxbcknlgeyxdcqvvvj655268f',
                description: 'Inventore fugiat quis veritatis hic nisi qui dolorum magni. Dolor rerum esse sed atque occaecati est aspernatur est. Repellendus animi vitae iure vitae odit. Natus aliquid dolores exercitationem. Aut qui libero minima blanditiis est.',
                excerpt: 'Totam voluptatem praesentium consequatur corporis qui nulla. Culpa sed ipsa consectetur ratione inventore aliquid. Quaerat minus iste molestiae quidem et assumenda. Dolore pariatur odio inventore et facere qui et.',
                name: null,
                pathname: '1rno8r8a92xhxrbc96exa0tpx1pxvbyjvqid8lvpnlrcrukl75v4cov1c7b9me9r9kc49nc4ifdm6grwjbbh98u45t0xepppy504rxkfsjx6sqky5l3e15qjxf5t4u00quwn5io3pv0qopw1696s0jvjcuesb5gdhag4r1hx9g4phpdwooz7tueyibkmkett3fc1dgl9zce2smwzf1t6zv684moe5f3nzdtggrqxzjfped00mngcp45b28w4u4bahztl4k89k5q1nuenog143sxe7kzjib7yn2un1osidc146cy5y0wu2lrvy40fx586yv88tf5hzj2qfgklaq0bg76dmii3l97wtsqluelb08m4q39ushmru58q8oe7io3vjod472wlrwco9u5qp0r72oj5zmnarjs4smc4g42qub2dgfsf2v11csjp51h9kz705db1xhh4u4ncl4qgwf3bnvbwpcksnm1j1cjxsvnzrnz8rnz1gpze8nhvqhqn6nw75iaa1a5rjcr4tmpf2c2uivr9enp5g9cp81akgzvqg4u7y79exwl795rnl5ncnb4fc8fkspgrgybg669yy78j95vg6xayx1ppqpkym45ufnu5gtwc2v4vn7rwfoko425k5im5oc5wn7s8y3tx8j23jz78jv2t1kq381v2nx5di6t29wm5jsbyirhviwwclimy4mqmb14cwdyq2xy1yw67pop3fqph7k9g91do3rhxg1gqgo0uuyyexdpdnmnqvepjftem9r022wuuzjtr7ey3zhtcwwmw19k4wrsumqgutd72ylygi2j6xmh29mwfk0vvkxv3g8a87nn49s2gaq77ntcvdrdhwibtfekhn7ecl8w0d9atgafb9twfce2chifa42jpydo6bf4vhm0ixrk4lrmmyeo4q6hgvsay6w4dgecflmb9n2l4t3pnnc8c2ne5zlisej5ilcc96pr893p4wdges2u3dyo7v80ifiatvecd9djk2ohfobdedtz4x9pz',
                filename: 'gkvmgqjn7t9300pfhjgponu2e9cw4rikbwwpkua4v3t8s7glhcgc9qx14eemhy2g83fdqur215uxr9ju1cu86w89cs9hoz88dk51y0kelf4vgsqylf4pn28rgko9cqku2t15uk3nrhbz72na2ex8jcj3a3p22gcqfo3ulu1j95opaf62c54xd86vo7yv32e8gf71drzywdwxvpuiqsli8prlutrhlnah6oyby2k8f3z4a1sl866xjj3yxm6szws',
                url: 'ic1mzjpd3dgfwcy937ft1stfv2ic0wnwhvvwpibprvp0rhr5nle89sg1w99llkurja4637lwjd2lvdakfcyvlnjnplfmvt6psbyh5g5ut4haarbbd47cgy716nzrnnvkajv8wykv8wvwf6upjqrn2v92grxbaq75giuen6g5aedouwg48tk4mm23qs71qozmtq03mtoe62xxr08cdymgrm460t1ywdf48j9om02jg43nv13n0e7aunujjhhvbgcxu6vxqp0mgg1kpoozyy062c0mouf5p3vjm6z1l1m91zuurp8cmtp883yqcj8ulltm2ohx4oos5hmu7vkbgap2kalyu8v9dn8k4fpk5j116x1aem4vc9ednpyb5nvh82n8v023kyqp8wvxwf8o55nmmbk7ypqkdcjidrp1n8n79ay32lzn1recoww47noevtqik0r7qwe535wqa8ez9xapzlldl671mhthbrnm7y0gu6jqe9yhpfyab68e5tvfu5mco24tzt5wxpxtgq11mp5qxuwsic5xx1638yz57tzs9ovmrrcokl98jzwzpaf2ztf0e4uy4j5foa6wrl6t60lnnwwubv7bbuv98bphihccuyestn3ge8axbz4rohp5ivccna4hb0mowwafk0ih2tdyq3bmg6cn0gdjnjjoc9el6r6btojojuojbzvk017xnn3c06fns8hgvp8iezynvqyhrrsrogcyp1j9eu0em4v5huf6crzcdvxtov39xsbeojhse3zirxr0409b0svryp9w15ilu6l0lbmq3te3ufdeev55odvec10cy6e3zmw9xmbk7wnlpvfzx8z4dcmx70vc79mwqb4l6wnh58lth7ckfl4hluewb2wu142hhozely345qkl7y6r9ocg83zuj6hwkqkhn3s65fkfg5hfob0emb3y4k5wvdves8ke7ldamykko8a8nlyks7v2i9vpa1ltux4g3xy22g92d6q2iz6rvyirol8kqjm59au56vfltfto',
                mime: 'pv1d8e2waxr72jb9oc1y0p5vezyekkhdjhx3nfdkz8d098k261',
                extension: '5l0843874trki9h07e1r9tq23paotftkeupn6r724jmi03ba0t',
                size: 3466086057,
                width: 410264,
                height: 383193,
                libraryId: '894ddf33-7bce-443b-9650-e196b10e35c4',
                libraryFilename: '05gr38x2nbiml83ag73lev1nmkxc5chucorckr5rn5pywv970kkfv1l44bttninvm8ddpborfngr0gdi0t2o8xgrauigzvpsnga5a4v3yhxxme39w4dody4udfjet4pqt6jkyf07oa4tk4yvpqs5vs1sia82kjhybb0zwv5eok43rlm30qmpcgnvlaxmx3nlzwviz1ivjfnkl4u1vu51kqg3z1axt6r5tiawrp5h4fze4sopur25nwczodx14q5',
                data: {"foo":46761,"bar":72352,"bike":56604,"a":"\"OOg4<TmW:","b":"1W%\"G7F8^M","name":8338,"prop":"o/6kEt,a:="},
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
                id: 'b15f907c-961c-489a-861b-535abbb4b530',
                commonId: '370cc873-779a-4a82-8758-700dfad247b8',
                langId: '92c78d26-624c-4f30-972d-5b24202d2ec8',
                attachableModel: 'jzfs2l6hwngbob5t44mt5qwqsyptqqfuioeteou3gxbba7856xuh687v7o6vbxzenabi7yagrib',
                attachableId: '3caadb61-1ca1-407c-a8a3-706a02b841d4',
                familyId: '31e11c76-4d1b-4b10-810a-4390550e5506',
                sort: 564802,
                alt: 'jb482jr1v1ohrlg279gmzdb7kdluledisb4iqb48gkq3wkvxcznxhqx1wl37h8sj44aj5b0zzpzxfnl7b2pcws2sfx0otof1ji4od00i01noiyxq4vys5i2j77ihgatibf6quvdcu017cktevcp76pundwbbjdvkpdteyp5ud0qyt3qpe4gumzpfqjfisfluj3x0uodwuj9j2dcqg0trfcc3cfxxtfjykr8uhi137zw4wq9j3bafe2djvxnmovj',
                title: 'j7e6kugqcbxo5ri1bwugb3sd4cs80w85f4y8netxyw675nnqttpd87zin4i5v8nfzmr6ozzzihr3seh9jz5791b7b2r32c0oaaioyuv9s4vusek9jhwtdm5epvaujk2a3wyrct2nf8ml8nbllbkuulpryo51njohhxaeb3h5w09ub2k30haj13ket90emcdonbojbzv4ovszh6kxsdiofcgusbniec78ht29ooosjjqnlhf7s0yvvzbzc4mqe4f',
                description: 'Excepturi rerum maiores ipsam enim dolorem at. Dicta aut earum laboriosam odio repellat nam. Doloribus reprehenderit quidem inventore quis ipsam sint qui. Recusandae cumque quia. Et sit voluptas ipsam. Porro consectetur impedit sed aperiam eligendi.',
                excerpt: 'Velit temporibus dolor quod pariatur necessitatibus magnam ut voluptatem ut. Harum et dolore aut porro est beatae. Laborum atque praesentium. Earum ut sed adipisci et voluptas deleniti in laboriosam. Magnam molestiae iusto dolores quasi. Consequatur est repellat.',
                name: 'qw2txodyqcwbmbg79beak4zfr2ubj9wlg7p3kcrmh89qesxbznjczsh6p2l6ze5xaiwxdounlfey3kzu9cz0pmf1umqj81n5u24jn12g5poxfzq3eo0t69qaq4tya1aowlj93u4bkfhfqn5e2hlvwz2th12doa69nzfphm8r9fvgqpklh0jfsd91ah8re5cnu15gqts5fmq1dpywo6nhid9ro0oo1uyqmbrd0xm1ma2jpwm99drb4d2bo40ahup',
                pathname: null,
                filename: 'r2ys10e645z4p8bwwinilc2m84kkx8wxf6q78rd133h26noybfez9elh18eyt5govsm69eqozxmyzoo1dsznnu4pjktrfsqtb6q3nqtdlk2xu2ten17fq9c5g5qgkl66kerxjufgi2zcdije7k3fv74rxwtrln960chj25b75grdl4yqkefcje2mtx9gq1wis4n4dyclqupfmug8h42ah58z5daddjv9bs9nu2l4arsibepjd7llnoh627lq0zp',
                url: '584zas1nf29y651qf2o0lf4xy435k5nvrkyvptuvm8w9ba2xy0ny8pj2d54yp54veiuo50jpgsuuh817wge9cx5f56s6m3cwlap581dhw9vqk9r08vdu4reydbkyia6qsp6u94iduvkb1jzgup0mpsneebvpdspe7mkzu9z336rv875kter438tpx0jcqzx55s7ihu98l19ccs1kw4250o61b16p38yu50chrk0afrdq8dt0cbosr9fhajfcxonnt8sc96s6bax72hmq5bbmpjhd6vhwgnjxcqxp1d25sse6sm0b0c9e73w5p7z69s5pbj3fia5icy292sks8c9enb3xq2331yj4s8hvkp4t5tkylwsm94x0z8vcm63t7uj06eohs42rpl0rsp1aw98ziq69b7xdjls2c652o6zf3ljanfq6fog1roerqw69ssd039vfjec3wwcwplutus40uo3m37qbrshwsbbkw6jcghnau41fvvzyp0xyntn82p7d2rct1kg73sl2ymisiy7tapz90u0ornsh41irufkwj9msjzzp2j8j259pq2bsc9zoapdqocbwv6eychnkv8z8jjc52dw3xiu3l6lxczfve79omfxp4xoqtkgpqzgf99v7pdhyoxoakbbpd5d2m930m2bw68se8v7mrh38lze44lcczlijng7ny21rj0zu37yyq1cc0te9exffu3wiwgrg2egepm37l3v5rupgnbhv716qa4b6hye91kxapqjcphbd3xa4jt5kb8jx793y5geascpb68blo662nonm7b9pq9mboa4fazfbbisu7adibjqj07hwdonp9egeayjbguqaseyhbe9zqzsnm9qhh79qku0t178gp0jwqabitmcv71s6xhi7p38paw5no1y1u2eg5b05ihwtthgsm43e8h117vst70avs0sqj9qgogscn4uqjklbxp0j4mq0e37ifklidop21lc7g8e5vy46rtax2vuq25e4ljebb93adc0x7wmt',
                mime: 'b8d7ozrqkog3mt53cpzqc0692sr2z890r2kifkdqa33c8gsddk',
                extension: 'fyssrmt5927bf7wl9bpxbt04bkfvpzsfvn0j6aeyenksulfeda',
                size: 9667403006,
                width: 754716,
                height: 542729,
                libraryId: '73ad015f-d056-4c89-8c40-ed4a66c7bd8b',
                libraryFilename: 'ym2o6rcii7b11t9cxppktdlujo1kwb85x6x9j3jj6lmfs3btwnfcawdgp90wv96czoltm8il56m9uaauz4h3b5arxcdsp6k2x6bt11w5t5i3ar5lxjxuvq9hnef7u0ja9f8ydxn404ep0gdulsbz8rfcvl49cmtk6d7jtbsx33n0q53cptz1e9ip2quw5fb40cw3ui9fqhd2pd3ukxh54gbo2j3918vcv3mvfjoy04p4wv308cjr4zi17j7t139',
                data: {"foo":2787,"bar":25664,"bike":60062,"a":"?5AR24=VM5","b":48597,"name":29389,"prop":47011},
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
                id: '060f28a4-f90c-47e3-ae27-187f8339e8e6',
                commonId: '547101c0-85be-4c05-bf51-8d625367c938',
                langId: '7f62695c-caa4-4af2-aa92-04f9df58d13c',
                attachableModel: 'hi17u80ps3q5kwk0rlcdsxv539zaflw8oapuvg1gpavbv6zbv9vsy4zkh0o0xpd0v651zsz26mj',
                attachableId: '04936bdc-18f1-4047-82c2-97ad49e369a1',
                familyId: 'aa512a95-a2d7-4b32-8819-e7a3122fb15f',
                sort: 931966,
                alt: 'es3gkc1gzo10lam6svti06l3q3fxw6ffw7tfimcfzysrheyfb9a4msokb6um9jva2vfraf21tixrsi9uml8rpikaymccl0o9c9a8ncv146ja4kaqtihbps2ul8n188qlxppsm4jqrlzr5ve1xobfqd3z5td8i1n54cblb980l58p3qpnmpos0dhivqzy14ia9x5unm7tzuy1f3iwh8rrwcttqdrpdohtg9r36dblt7clhi8xge8arv222f4mapw',
                title: '6x1s375qta4e60046ujg7ivzkyyr8s6kjudkgrgz7v1n9gu95vnjip6hnw2400qcid5pgfil0lt933592po96b2b2xm3guvvqazusgh2sqh0541j850wu3xbg1w2evc8s6q2qirmwkgbop7o34tz0a0v07bmwv0qr8knr808conn2kjrb5uw6xt45ic3di59pt6f74khqwcmp8mkq2bvwgcua8c2vlrrcx4htbankot5h29u0icb975crbjhwbt',
                description: 'Molestiae dolorem enim. Reiciendis ipsa explicabo alias est aut nesciunt. Vel dolores voluptatibus reprehenderit hic ut dolor fugit quasi.',
                excerpt: 'Sunt repellendus corrupti aliquam ex adipisci consequatur. Ad consequatur nesciunt quia sit et alias. Impedit ab enim accusamus impedit et. Mollitia laudantium quo quia recusandae vitae at esse repellat. Nostrum accusantium et consequatur. Maiores doloremque consectetur sunt voluptates qui repellendus voluptatum dolorum.',
                name: 'nsv1hsvs3gow20kjo5igx5pu8pq6xezpngubcvu1bfa86fvk9va5eb1chzcokepfouu80y9jmqmk1ctsnt0mzzfe1e8o2fwfmadqx44vjqlcl2k04rs6gwj2wjlwbhju5e6c7409uls64kpwerdq46kbt9pi7kzn2e5c8ijqz7z77gdpikg25c1c3m4ml7fclcqv9imah13qlb4jzsbguoidiii4nrzkdi73da26xo8oj4i3xobrz2bkpb50eby',
                pathname: 'mvph5a2302m6533sy8mmf0fkm3okl58efr3coc1pfg7clznplg37ge37s4jzqe14ag3mex1cww557sl2ffa3r9joo6pgge42xcc0hw0zebiagrzzm29js544a7tespdo4wgoe5itt7qdgzoxtzl94uh7zai5vrza3b85ut5hnfcer0ufy7oz7f9cy99xuc69l0zrsde91qcs8ufs7nhxw5j8xxu8oqc6u5fnod4vwd4ftcwcj2l52up6lhg9sxgoy9xfi3b30bi4q86cxerghk391vpi85px1263gokfqvid3ys3m4uym5k28yoisox09v6cu6xy3kaapj0rstioyddhqip5i9vft8i0ygoyriz10wm3da1xic0i6u34dibi9uo6d1fpuv9lt3hariawyki2wd6uas0dz01iik1w1fowilrb66n2m3xg3ou4al29ulw8routa247c92ala96nzt1i5l1vuh2w6hp8btkkcljom8b7o7atb0oj4tk3n9ehtr2c86mr8fsp69w7eu44xt70kvn0qu1ql78t2jzmunkyx1apeoedzlmtw0utz2a4kv1nxxx9mkfr2z6z6vqg0033724h5uw9n94irjbbxrpwzdwo16dzwahif8oo67dk665rid7k0hkz8f2xd8hq1cjefvom7qwp11zn2u4s9iylpvitllqr2rrwccetniqhv4a9fh5atwppblxj7p4mlcaw5xwrwsj3szo0im35kqqclaw2wr2ytpiiuhjy1kql84va35tyusaxzv8k49mszm860blw9w9swrng24tlvdggd1w4nkpi1ckx19wvmcd4piyqy6uhmislb5b06uyhwcpkihp2z59cv1ru9xon7v5cerd0c2yrfn2hxrw1wng10756qpikgrvi67ckz0k38fasaiuxox9w8yg6dt18x1n1sj7l7zcd2tog0a72l1jd3iz2rocob0h2c3zjnsockwtsrkjexsvu2xqpok26k75smwpflno61xwwmapa1at',
                filename: null,
                url: 'swqipm1w2uqj3gqsrpk1dayauqnw9dxiq7lmjc8c8je9qpnmwp6gaj5rvkwtsnhtb67wveugitm3bd3eh72qterezldge5ehgnxkmsraydftmmqqa5ylljn86f9zdr3n4dvpc7dclrqcgg3jax4uceh195zpo9zrom2uozpmbpty7a2ukj3enw8oumae0r3v1wgkdxul3fj18unflad0g2az3le5tv9cve6e8woike4a054vpyyhmu5lf1hlpz2drq9m2x6u760o4bxkn4vr2crra2wozzckjx6jurjt2l0j7iv4ptee8h7hcbi6lm2xtbu7l8vse03d0pfrwwlpwud3js4qjzurrae8xwcvnr7uy67t02x39pf541unv1zgy9h9x5bvkqawwfbnh39svlq0r0su6ecrswg2hx6kyuw44g3t8248dtwzruhqwjpx03bxhsavn7tymvsdt5j7qiuqr0k6o8ltqlbc0jeqa9ubmgpoef9oxea2axwruuvy45xjoaxnanay3h0nw5lg3wh88bbcgnyse4hfewwl0y4mpd8ptndzv4cn2vrhtlbgbo2jw99wgseeh8bgsejq3fd1kr9gzx5jywkv5i4bo14ycxq6fkqwfgkh343u00vn24qu43zp0b43yin44chwmvq7r3c9k1i4tm7vq3vbpp87itu45m4vfx47ngvdagn0zyue7uxzxfanmwi7k0ndeu8amvt7c9e4jcl7rhcdhkakgy1a8kfp0y1ctujqj77zmkizyqqrp5ovtpghv27zpyqow3tjufmlfw44s3iusc0cyfdmu5l0rjo9o2raz6fbwubulcx62g5zir2w64e21ouodeyo2pz8h999rb5ebzb4d772quy8iu49l8xs8v5rtduqay7g7j4wioo5zt3e2vebimoffs0ywxxkajn3idh7a86o9z3yg149etvibpe9b0ytvh8ebh7eiljiswigu6kyvcpydsfctd4w74e6934703t86ywrjfq7lma56ch3',
                mime: 'xq6v8ecbg03t5iimik4ppagg7nvc0nc28s8wsvrro00zmrcp8j',
                extension: '71f3m6mnmz6g0d6x1vhdshp9cbixm4u5y2h6jhxf0cz481nias',
                size: 2869924161,
                width: 267506,
                height: 890668,
                libraryId: 'b8b3b4d1-0458-4ff1-bfb8-2272ea1e9e01',
                libraryFilename: '1sbmme7pao7soasih5zmpzieu4qqdvbx2fo5iwnujkynyy9ud2a2nfk57kx81uadu84azflirczvabmtifkqeypvbayr41nqgcclkzxet459j7vuuob3rrbd7eh262wi6umwe451hth6t497d0oeg25r1185zv2ju26d4duf2w0cjtcuqbetr8te5llplis0rz0lfxb2lparp6vynephhdzklxg7otcmswmlkzxe9o6vj005ke57yae0j6vn6oa',
                data: {"foo":">$-{/p@W^u","bar":88110,"bike":95653,"a":"|PH)f)Ya9&","b":78985,"name":"W/(`o>(;ym","prop":"=yi-Ehg_SR"},
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
                id: 'c5b8e226-21b8-47c6-9b3f-6ff937333e92',
                commonId: '6cd2190c-b664-49b4-8f48-2446a7038401',
                langId: 'e6b4119a-f7ce-4182-a868-921d05290a66',
                attachableModel: 'w63u2vpc2cw29ge25cdox9qa7pa1oeowf9tvzqbzwpn1az1qrzoxtxh9kvcij4vfzt9b0nvpv6w',
                attachableId: '870a2f26-2877-4ac6-9555-10d2faaf6d76',
                familyId: '8504b708-4f9c-4369-84a1-1116214190b8',
                sort: 943186,
                alt: '01azul1s3l50nmjnsx0ho9b86f6lmza58sp28nmbrz0hys7rd2fgi1iiitc2fpbz8bv1u9gwtge09eabjeg3jeag0mpzsibrxtm6bkcv9zalvkk3k505eg0scdcclwvu8lurcvn2aj2xr6ewpvql8je4i901ia1takvxbo5pa77cr0z77vsn55ezzu873vb2qergxjoperjpbddr36swqnxgdes8vkz186yhdhpfj0j4foh2v95sjsgilu1qvr1',
                title: '8l57mqsvx8jjos4dqu14vj7rvll16s8208py6js8hc79m4fggccj5m07akruvt8nqgdt3k7cqs470f2hy1ibp78c3a21mfhxs40fpos11ccflfvf6xgqwfbft9s12p86tjiewif4mfecnmzyuh0irlislug15vepvf9skqpbo2xratkmkusqgad5t6549gd8xjk8n2tgual3bitxp97l92oda8viidlbj9qsrfdg1huwwvodu951mm2kewp07yx',
                description: 'Labore quidem voluptatibus aut consequuntur aut. Blanditiis fuga omnis deleniti quia. Voluptate sunt qui quia. Aut aperiam aperiam. Eum quo rerum voluptas pariatur culpa.',
                excerpt: 'Dolores dolores esse velit nisi aut architecto voluptas. Ut ea totam voluptatem sit iure fugiat. Aut dolorem occaecati quas laborum quibusdam sed nihil.',
                name: 'hci5jzjhk2v8c8j2tn11a094f213org940xkmxknd5ewz2h2jnum64y3sr3m34dfm8kmci48xys4eouyi87gufr0e0cjvy8c77ok15kk95lu3nm5y8c092o58z6q82vgn5mw5v5vgkn0j0dw4l7jlcm0wmwb9c9b4544vmpmsutzxpybn2iggpb9y87nlj7nm2uove4z8q5oqpi72bsfkv1nl039xugclaj08jo4sybul71t6g992j109zh98pc',
                pathname: 'd2xe82y50v729e15fm4ifulkth6wn5nxpxbzzrmhmimnmujdib9d60p5emjj85j16dmiix8jm4g8vckszee0p2pux1khwoosg9ve619ba0za6c56qe77jrsx96xt1kelrneiiszbyqylimlwpn3fd25hg4jx013ziojamigwmo8bc6b5u2w3wb2dukexcu768acas2jy5yd0wxvpausc7o4cg32gdpgny8bsvl52cnxnfgdu4hhjumq61373a50yvwjivgbvgrd64yv08422k14x9phf1l86jjqr5h41jgzxpl37u05reu108cxar9olhbwn5eem2a97dphpy859hqhifg009k6o73fcba773guqsyshpzswlfrcih6vjay3ie1h2qel2qcij4j9ctrf0q1qn09pzio0p28fctp05vwnle5075opvy25bpqsyltfpip06mcoyoe8luazaec2mu7ruggzao3nuprvowa5y6t8w70by6x8shi4lqo53sn30wwdaawpnqyurf79vxctikzwdf402whavye1i8pat32hrj7p3u216iom26h4801sxvj0ga8a5bx32zwe5g3te8ki0c2s02m115tfnklvzwvwzu3ru0zgc7ptcmjavb9tjy845saps5ztzr63s1ige8v0x03qri2iaybt3e7u5wqxm6vuhjlc5i9taie2k9r2aa3jronafkhoujwegaqcmiwn7184q2xrh65scec384vs3t0so7nltfg28j3lhj4vvz0duc20h25l2w4g48lh1a45349hfspvq31i6n0lv8kpc1cjazhktv8tnaagku4miapnwa0no6w7ehd2sw0ykopjw174t8unb6jgkk6yjphn6e8adfz28i1lz48lk96jjyn7qw4s8dqta72w0h7iys92s6a0zir54f981c6mp2upnr8fisgsffunorgbdf63ov81ybonlefxwy95exo8yprv7vzakd2tslmlwi7a5denrm8fc3x15invb3gg6y1l',
                filename: 'knymoc88a7vf4gmgcojy67phj0p35whv6ivpm4eni84q2w2wu1vjj8gd7x4lsls0gdxs2v8raae3y7nelz6ve38j5d1z9id8dng9c0549wegvmxk6yq14qhb30ov60dhytjs9kxbz6podke9484gg8eu3sgckhhfwa7xpivakn7iykjutqsa0q1kh9sm9abtov3x5dteikucern6kw9huam699el2zak3o5ip0jt25ls19e7nip45det9ntgthx',
                url: null,
                mime: '458awhbw38brpbssohj4ouy3h7nppqebc2r50ekpf8ui38k3na',
                extension: 'eve5g9muu6q01n3xhxhccpimcdzenpjcxt1flqkyp6nul05z22',
                size: 1388858097,
                width: 758722,
                height: 447463,
                libraryId: 'b3ecc12f-727e-427e-bf5b-a798b44f7701',
                libraryFilename: 'vpj08kuix9pmjf3dqad32qvvfnow4kl5a0ulupgfnwvbil9e030zoa4wj1v3wu36lg7pq98wa0s1mb1c88aitf07ash9og6mjnrd7hrh2imqh2t2b0koutrnrqjfao2tkmp5h6ulcas59creahw1b50kcflko7pwbytlsnelwnzj06zrv3j0cj0ce1nkox7coz1z3my0i1h5ltxdhrze1r4lxxnwb7uiaki3zgng53lqgwvstlerdu9g9qn7765',
                data: {"foo":"%nrZf\"M]?k","bar":52119,"bike":87513,"a":"!xT4cL8`oW","b":"wP{C_(iAx7","name":3348,"prop":"e%HD&uR`J*"},
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
                id: '94cc7c8a-de95-4858-9ac4-2fb46b9a6ccd',
                commonId: '5a56b8f9-31d4-45a0-9753-5a3550af1eed',
                langId: '44e24c5e-f312-4055-a71c-043853d40ec5',
                attachableModel: 'wv3v7n3df57cuv3n212hublo0pu2xz6qa8vd8bi5pjwmwv5qyf31f15s07ls44xqif4p6unfrzs',
                attachableId: 'da62ed50-9eb4-4f90-84e4-d3148c648ca6',
                familyId: '79d2c45c-fd5b-4af1-87d4-cb62cc5545bc',
                sort: 816607,
                alt: 'cu3spavzlomswbv6rukfs55p0fiwu2fc4weeb6maoxcedqprcjvq0xznjw6upat9ag8ozh0opkiz637v10nx1fi5mgxw0zsy56fsmpmueb346n5e4f7lh6uwyqgkho1wv0zadv7ygvpm7r903injm66bpf79i2z7fsj4cknryb96a5689kdn5qb6dksqs0jsrldtby7yhmjrrk2fd3qcsce41xs1xrsbeo4s1ss65wt5jnosdhmhhjj461civw6',
                title: 'e64e1yrgmytw2fbq7gayhwhe0cl31cvtyuxxq68pua2i3ll2fc6xwwxwbs133ntcj9fv20t4o000syeidwtnwdmpcmb9jkda7jslt493g12kgzt7yk4769fqt62j4fy73wl23ksh3nb36idsnafgfmag0ui9x5mhl33at5jwhjsce58i1brtucykx8r1i3lecce6fwn4k2td4wazsxni3le5ovd6hj9amfiyt55wajtmyce9l41blq360ik2w60',
                description: 'Similique iste deleniti nulla nisi. Suscipit excepturi officia ut numquam rerum voluptas ipsa. Illum quibusdam minima reiciendis nulla quibusdam. Et excepturi consectetur totam. Et et ea nemo explicabo quasi deleniti qui voluptatum.',
                excerpt: 'Suscipit voluptatem culpa quisquam accusamus voluptas nobis occaecati qui. Excepturi ducimus accusamus quibusdam perferendis est voluptas. Voluptas optio nisi ea enim. Cum ut labore facere ducimus aut eaque.',
                name: '1x8d8eo0231nrqvzx5uj5b6hkp4tmt7uxbo8xydacfl2lkhio9ophdzf44g1d2ihlijov2i06pajnkol8antby48ohsju9x9qa333vniwp6nu3bj0t59z48a2tp8w6v091jtmp74f2kcf5ym26tr6qb05b41htgq2ehuuihuj3jrwb67t383vv9myrgrwp8h92rep30kbcp20ipmlzw5l4ei6lf5csyrf9int7hf7ctad7ip17jva6dj0qt1tqi',
                pathname: 'fnveah8h4j5i1gscdkwx3zr7k0hmmb72circepyhqusv9nfdkehzbmt8zb35zatn0z92fwr8jx8ym6xj5zir4rvpuw3amtxy26ibzlwey8re4z366adyxd3ukkpk78zgw1scavq5g5kzm8vrjqb4v3zb942yxaqcidw5s6dhsj9wueytml8jmof7enf3pgmxiy05v6c8gn66ncfm1u70plgsbc0w2n82xq9kunpkp5xkr91kuj6dbnwe7h93tex6o4std1lrzfixfxqma7k3au2m47w6v8hcobs5u3elnrwlqcp3u1fh72i35y5hanw77wpaoebynesbkn7fx92ob69ny08jig7380c8nfqwqee0dp98cozh6iod0gn5x1dcpg75x8l963oisczbmxh537hpbtkphqaheqyp5f640fa1stolmfmrzrwfdkjrz0x78on1ygiwr5shvu1ncsqklo0ar4pc8zlrwf04a97mryeab43qg6lvcgsqvmsizcecq7q5zyhixhyd6gcu9wf9gnf7o9gp84aeu7p4veoiih2hrvrz6ozk2tnaycxg2j7nqi0mojrbqs0daqhnlgje523k897jfzwl2q3s84uyjqz8ga2eug9uxhl7y07p1ldp67emmt1uwhbu6yt6a3gvx45om679x5ahycw7k1zrrdviko9ujriv8y5dtb1nh5ca6cj8hkcdjog4ab1wxkp3nxg6n5j1c99xgzy079kx2zvg4wfalibwns6tn5yt762tt3x5hbej8tnx51rb4q9n1kx6eyvsottdhkego45rj2hc3tp5cvpym1uocli0g040jsheaqaast6s8oeo1559vile4oa2kjjag9fsh8ammlq8eix2xiznvei2xbmm7jppgpl7mnr4wveog25x26ej8ce8iefzpvcqwr9inm1rrjn2wc6q4dcp54248fumnoxiva0wd7i4gyhdsk70j8eni7pdi2w7s4oujfvkww6vcub132x807tazmof03cwkiz9',
                filename: '8r90v2ylux5ct9im711xg6rg8sjy3upuvjdw4i2ya4p13hi95bi7549pf1yi4o1kkwbg9ydb71j5ca6mr6rgrcjgfdq4y18j63z7aws628ggoaz5ewkgiwnsqk2ig1xz0x8seoo492ifflz58din02hb4imtasoytq4lte3kuwbjtgrbof5ml72665eax9hmsvp7cgk71ys82tm1bepf5l9av750fv1gxt734y2h7u5scxunf5wn4r1haya54to',
                url: 'xcmrn5djjom0agfykqne11eyteb4jcft5xvp30ljjziw5xkpu8y75jtmk2itp0zmre6t9ypk6805pm9x6xry1egge8xdv9yt7l2toovscqpj2kdes16q75pn54zzy7u9wivuhy780ade99x9g31da5i71l3930vnkv9npfx12lpe5eg6xg4g4w58eebqdnymaz9dnp0bxrjni2tsmul6q4igxh1uut1rwoqe4i08dd6k68bwqqhfz74yrnm3djaplu2nrnq3reoqvavb4n6okckm2qq3apkgg009q5mbd3t6wix2tfjgk4m0qqy9nwm56d2v48a1nmndgjkcmhyeza3yhhqjsydvwiu4ehp4l28i4fn1xlnffvtz2ech4oambwkafs004pdygmvw6gfjd3dxok8ng52ib34nl1icz933bgfxvij2mu2bz058ix6cyqy4gggxetniyoys6qoo55misqz02dx9fe3a2ritksyu9ld02ezfd9vpdq7cff45ntin9vtyen8tnn4swv59i9bt0azke1icnest9aco6wyih3p7y77kdfywgjmtt5ftq9xyqfz1sqa9m9sp2rlcdwg6he6i1s8tzkylxun0b90phz4ycmy30zkf52wjndz94uaa2nokbtwie7qdkhr7x621a8v3671gu70cr1iq7rrb1225b2uzlhwpan8g6w3ad2huqvo5kl2z2in5qyirnrrbzh8s1eq38j3jsop55q3moz9vqdq7qz0lqnj0s4bkos07dhymbfv9kb0o4242vl6v4qsim247un4w8ewl7ddfbzpu9dr0ptkrpbhvmlmz3j956b8crsbn87mrsem7quw6kh1yt5fl4du0qt9twqt16ul450l9xv317xsv12u11mnzfg22xhwlqso0q4j4mnzibqby23xfd262thh3gskhg2sodw67mayo5jabor74nqf54wzs79nr7ez6oh66jw8rfgdz1lgaxuhwl33fvsp39a96zjtqg8qzy9jv6ad0',
                mime: null,
                extension: 'fw4sgao3utv9ks2fqeapu84xbgkpyg43bxc6jjch3xzzjgvwib',
                size: 4931353210,
                width: 317653,
                height: 693552,
                libraryId: '5704e4f2-fb42-4369-a435-04000bb4585d',
                libraryFilename: '0xhnndhlguhqntpm9uzcq1cmz1ikfd24ozoxzu8ao153cfdfkg9zobdkn3nqyvkiih8u5lunrik2xk8zdizagya0r73taavk9f24tu4oizwc1fl2ocrca6je4pfhs55lyj2g9crxqbsg739900albe3jkbt2q1cj972s8rjwujznwpcgp45jnqk4eul56ur8jft510bpt06waep60a55a6u022romqvzzc6zhbl21lyfa4g8fb2d4n8w4f6ro20',
                data: {"foo":96797,"bar":"FMToJmWF#\\","bike":"$h7r$=Vr&+","a":57463,"b":"mYjX!I+Mq^","name":52741,"prop":"+u?85G3WOK"},
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
                id: 'b4c4b401-cbce-4a43-a8b2-eb721e52e7c2',
                commonId: '6524c34f-054b-4f42-96a5-f828f4bb94f1',
                langId: 'f09e7c2f-6926-4b5a-928a-c3afc9af6041',
                attachableModel: 'uegf8zc11puxx6diqd614ij63sa3qlj4f21rzowzm3jxvpdigow1ciplnqnrkooenhd9xj8dj6e',
                attachableId: '1d613922-a301-4751-9070-e6fee9e848fc',
                familyId: '33a07af9-0baf-45b1-a50c-47bdb4b8e34d',
                sort: 882020,
                alt: 'i8jlxe97v64zwafc674s28smz56x0a6lj0nepn1qlxi9e306cbsracf41g45tj0jshmb9xnieb4499ib9id3t53f32nguqbsjyysj07fxw3svi2vgvbr1ojqet8vtf1ufiv47vc8ro5qo67ca7kwnxzxn5bzbxtqvkwbm4lb3uhubad8069tae68bb1t8pp4tnt7x4nvlhc56mxlnilo2lncymewx8e66xb15vty2go9qoiizk1yviabx9ph53z',
                title: 'fou8wwpc4yp7v150s7igvyb71a0xwmcaix0wgcmbkvz2lho442l8kquy1s19dnnqa9kl9iianwbdifh29l0jlkhf1tnys9ro1dvpldb98a9o4mv6m23k72lt06oaof1avzyiastifhtef21lhohv4lhf0c33vxz4sn1eli7hvll6czoeziugvp1j34ot5e907ixsfd5uzmtodaajovmda70jcmux1s0ybtulyjftytzc4ed6mmr0ywr8rjkl7gf',
                description: 'Id excepturi vel ut repellat. Quidem laudantium quibusdam voluptas quibusdam voluptatum consequuntur. Ut veritatis consequuntur qui non voluptatum voluptatem nobis. Id in vero consequuntur et aut enim repudiandae. Et et et eius aut.',
                excerpt: 'Neque a modi molestiae est. Vel expedita est optio minus animi. Voluptatem animi rerum dolores. Eius impedit ad eligendi veritatis eveniet enim fugit. Voluptatibus quia quibusdam.',
                name: '6qapf77j44l8g1iirj3mtyqb5zw94mc3y96a65udcjr6b36dx4raf3jo96rnus7p8ojbje5yrtwtwalrlk40k8jzg234wpoqyk05c4lgzmyf8gmqz0c6nu86e12lo573nu8chomworuo2l6wh4rj5htc8jydgvcv401nyirzwdu3z753z431bd7zr7lnj206c77jj832oxgh74gizejsqsulv375d33h9w90cdguqcv8wk9rtqrenlq2mujrqkt',
                pathname: 'vw81xxf7smsjfwnndk2ybmjo9174pyup0xct94nau7bte52i9nlzyxa60pgjy4dit7b1gl7i5w1bga5jpj7rjp63wp6ajrr9t1hyzc3y0dx1msk6htbrrhy0emrcw81ds9xcofyt7kjlicqxtpmykrf5ke6dl07ig5dy9b28j4vwg4e7vvn8vbp946y4rwdtchq7ekboxwqmac32xleruy91ufgk6yblkn74z5nqzzwvsw4d99cqqgj4rq1r76nf1omjo7zb1n3q8rornj02cf9tifd1kw2vqx5lhhmk9torsno58fq3g59fbyjivpmk1rovjowcbaj137hsz0vhjo9rq1bbpjdkdy64gb0rqpkqfnutz8ngfmwnz547oildmmfchwy6ougd5j5wi4qlnhhj8y1nnxixy7zwb98yz6ht2voxv35u4hmnl7qhxzxjgdm02izp77qdjshxpd21qmvwi9cymdt38qzy8rplxyead671q4zm1aygurgpaop9t93odcscdhenzbh9t4qczmbrq0goh4djkfze1ohshpfeaauh4wfay04hlthieei61alpsn9nvgurifha34h3k442cvlg8f1m33km7i6ptu956vrr51oonvnyykw0flq7oi1he8tco7lif2vtvbzcrmdilkgtfasng41o69elv95afwicmko8g6gw7v5mbsy5j6yn44w32zcdpznnrkliqhn70uln4xi2qvr51qdg08ylxjate4hf33ko0ijd5qoc3zvd9u91n1gduhjyrud6teqfmj4zfo01qysbaqwde4i8x30m2dyu202yhqs3kreatoy1j09ueai1crux3kfoz9pav9bqp5tp1pecv5t43vgbe9i8b0owp8ywpua80te1wiqgeoo8qi2xihxtcrtk0rrvd5hl2rb2188lnpx66j14dp5ky7d4jt0ss3pvf0ocipepyu8wijrbrjtb3sh5w8ffa0h3jwntqzvzlqv8ldgffq57oviqbsn6h3grddoj',
                filename: 'e4uijje6mtrb0y2qf9j3kqsymm3slwr9qb0s65cfxaw1lylh95bkktcqet60ygwefyays7dwe78ss3c0u9tur1oxp4vov8iyj356p3t4szhks9sqp04zj37r46bcw58h4kxie29tid0mswan6117d9w7atltkm2ifz717klnvncy12rgs6o13fcqak90qyrzbaj48v5eavp1c4z4g6apfytu98z8nwfxryr7kw4ozojqd634igke2wxy821sys8',
                url: 'btez2cfnc7u9g502dvoszm0xv2usrxhtnfj502j76v8xlkphxmq0mcrfpp09g6fo9jydlwfsvjg83gaf79c8wh7yrjquv8mblff8kswztje5bev4qh8kili9l5s62phf53h7ergui51lga9m89n1aidq2hr3f5j3e3eumol2qzs8xjyhimg0dxsds5yq1amiha38i0d0wiayahr88rwltghigesqgykrc9vqzogw4z9d865bd16tgandidpzbylpp5pns8fk6z9y09fwui5na1qvhlxvknxfoi9qbxzbgn46wxq5kgjk7e2a2kadkaowxvrmfni9ckvrjrmcr0c8x18lz090v8vvav3f9i27mggye0beodl0fyrbd5csx0lgl1kbyp1vb4tl0pk909phl90yvqmyvd09c8jgal3a96mqlv5e4puxxbhz0csu871vivtgtn2dcmj088yigjljccdu3l45xbzts9r8ddipkxinrrgjwc73vjjro1bz8e5sc601tnlzi17fdsmy2fy1u3hmvp5m0x6kt9td6x5fkg94zdfqcnnrbsfagz8s76ngbi2thv6uf7hz0ztbv64k3lmo0m2keceynslihpjqqaebwmt097p2zzn9src2pp1l9ftow0re4v74jofgb9ahzmkxi3gjc9wnht40brwvoinzylvw0bxcqwrp2152p1r2r4lftgfd453ohgphm8kck16k3sq6uqzsk0am0zcnvlk7baprab32qfo3w5ntiq4gq3h1zns1nhr8u9hzh29gp6h88haimthxb2ssucekuu0c2dmksilgbfhq2wb0qzjzsq0nsbmast0zet51arl6uew1ivdm940tx0h27v3lt0izq76zwnpsx4sx4kb7jelguavi2atv06sn6d7d6ehba3dm36im7tl1fvz9funoptycrh35lhcmbge76vd6vmjku5vsjgrop8jvogpmrr5lshni95866b4j3xjb1annc09ubwjxij73q5g7fgpb1pr9',
                mime: 'olxptfhatle1cljsewlpkzseyw5nq020qzuw4xq3ccefesr1yl',
                extension: 'popp3gsbq5at4x9i8nul4pb0kcrndx2mp1lywtb2uslwotducr',
                size: null,
                width: 636550,
                height: 679965,
                libraryId: 'b1652671-3db3-470a-9de7-4f1a995cd058',
                libraryFilename: 'wimt89kzmw82aodgyvpxnqj9xzcsdez70la64r2ekc7nd92tbkoepryk9xri2j0vli43eoy2r9jwpghq8enx6lkd7xosyup2s6g2jqdlg4zgl0crc41hpkyeuqwz0whxyfaccsa2v686qtmmcy75yetp5v666g077gxdce4uzvvyfncbt40kt5b9rvvalrh0x2aeil9ikzgi099vllu8orubw1pj572w0tgvmep12ym6l084ueq2mm56nohc547',
                data: {"foo":"j41C8b{vM+","bar":"khYWKL?T'g","bike":11271,"a":25955,"b":28185,"name":23481,"prop":"ZuvIhd>>!u"},
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
                commonId: '524d42d0-88a1-4aff-aba5-ce88fc84d904',
                langId: 'f8ae4797-8760-4277-be24-058b185c0bae',
                attachableModel: 'rvot3iaqhkeo79ctz9vj0vsccwwu01ohlzc8fcw1ax5jjpbm3vlf8ircmscdtxqpdxq7kqjm8oq',
                attachableId: '8be8ce0e-b928-4eb1-8181-ffa7f60774e2',
                familyId: 'e959aa4b-6867-423c-a535-ae66fc8178fe',
                sort: 851104,
                alt: 'pme0n0ljsd5a6fdj6j1lwmw40njsqu3xdke6koko5w736xfl9x8bn9h0qyxgk24a9xpo2ioicdkm3dfwxabyvpxfunelirorp9p72lf1abvyh7tmynhqic5a9v011ss42r50y4ucxomw1id0oo0sz0woql6zurus9eqr6ei2rfuxuubw2i1rt44u7cg952pd1vc5qsrztfeyanh7m0teo56ycmdxo6vvyi1tessdp8fysppe0mthy4b26a0cuj4',
                title: 'j3yp58od20kv6kjy4sdjcyr9od11yeduu0z9t4ttt5lvrlassrt9fpmjj6ox08fskvfpwj737amfdfukwmru4kof4en1xse5vqqea1qmkd9mp4n2mjbdktzuq2tj2yisep1reoxa4uyzfijvukf98gvuq0phgnjmkbs3ihwigmc555vfujn4yxajllhktg6jjnk5u9cu80vb40avpavgqfx8dh7tkffhv3famwefz84ubzldrvuq2znx6hk5rxs',
                description: 'Iure illo quisquam et aut quis aut necessitatibus. Mollitia et sit cupiditate eum aut fugiat quibusdam veritatis. Quo et ea qui illum.',
                excerpt: 'Asperiores consequatur sint harum minus officiis in eligendi perferendis ut. Aut consequatur nobis neque. Dolores adipisci minima dolor rerum earum facere ut vel.',
                name: 'uqgernmcudhdwigh4edbod2pgldtbfd40rs3z0orila22hifm5kt8ab4mgsjw5z3ub1gqelebsjy5pdw73lbd6q1dlrlblzm4o3gps9xociakomucfnbd9lefu7vi3qph6o02mcqcsjcvzeisz2m4cu3fzjiek1n2lk0yydxt76its20cql9f42sjwj161tv7g4ghzn9jsazbi0v1g6pegzuf6df4eaa1y2ebtdqanx4d3yn3odyz0kxiajoll4',
                pathname: 'bdvtkyg092uqrld8859mcqzztb7zglcnr6ehem2je8fjlzuk7l9v2dkd83w5def3gz3cj7vd1mg8g166izuo5rxraxzos5i285tekq0fcbxysi0lfitana1vw95o8flika0bzp813fp5uf5f5ipfomd948vl4tzgu2ze0r5nrim68gg06jcwbvwtfjih36qg2ctxhrai4yw2uva8fnne0mi55r8eqk0rbnoodz479ibijh6be730o9lby9m3obr3nz876iuxouwwd4psqx993yg55o43c0invi625iaj45d53oijj282vs7x3eahkwt0ps73s3bkg5qlr8i49quri22pcv5lgjscz7dc7ak89uutoegyaim2k0qnpp5w2tygwucyqg3qlg8pwb03ousirubk9t6wwcv39667qs2j2ggvzokatcqqua15rfmos00zu7mfgwihc4dv8jv1yymdfbn0lg2y8bz1skyo2ym04y0fpdp9r1a5p5o03q0jdb1v7n7ky73c6et9ckxfcd3uphdldpqcprp50ubj39tddijkdz3zgeihagtu00re8nh4auzhr5rsw2r5couoc8dao37b2jez7z6p9cqvywjdjy8tvizb4qjn4guim0nm8g7v4hvfxno19lpvyknunbh6ud5fb66l8eupccpmegz8mpngay4b359mf2zmzs8mkquhfnf9psogruthx54ltm74uai90xv9ga73kz7gnsykyoxbb6370ekkbh0fmotnhuh4kwlx6f4ukkxtet9sdn8eiz9msif9ktv636dq3649ueq8rny2ks5ypga6jh4z2i32lrmqvjjyiikeoyfizcyl65rzgquzdmiycxzvap3ec6xq6xuc0biducmpw9al2u4hvkoi407g68zdeu5xulcl2s7gqg4is28asqwnaxellx7jpumr0x2glxt9iu6fqzvfkcqt8kqu9ge6kdx9asy0o9m6iwzx0vnawaaq5l48lgt5k5niuaz5b2mjioc1fae4',
                filename: 'j82eyj1c5vdn4cl0eapwq7aw0tluy9b0anlqs0f3kb4mdhkxy07mawvgeh0o7z5f308ibdkp4j4em948wk20ufvim12vnj44kdmadpen47abyuejzbhhcu8gjadhwm8mtevd26i12f6qag90zhknossmx8axzc3wx9kof3kxgqf1rxlfwu7t7ah2uoemx0izrrrx1xqydb57un7pxq4trjqq4hflyfod28c84arcnf4bwz1spcckkphdegk212p',
                url: 'poi1z4hfk5h9b0dwkckfpp29civ83wia50lg1ljmmob0a5qn7a1xrhxagsjifvdzvf41u4uy9830wfixwb22x3fvrphtplkzfct98it4llfh5laa49zstjd3q15wli5kc9jpayi6x0bzap0qwvlfj2mcfoavshqgfdi0ia8x395inkd1a8o8f409osy17xusnm3oyz4g703zv3cjaws429m9n7svw8hpi5fbxa26c71ae7g9ea8z09wmrb4t6skfqg6wrtn7xfw1y6s5mof5f7nkp8he5bwkhov3y3tfu3yqqi4qqemulydz0vmx7dadnz37pbbz5aupgoc26hz729wlkmzpbk9naaoe8l8vgs1nrpk6w14zlk8ls94pvgykfx1dim28vcmjv0nz29ek20gdxaw58hisq3z9n1qqqmnxiyos9ncip57zp0posjkccu64kcjg9qf8mdr2l07ce825l1nuzltkj4lh5cfag0systtacvbrb6v80ye2roa1ucgxmvpffzrxvjx3dw1xkmrs0gf50hhvvkodbnaop772ckfbhr04eturu0ah8b00n4tk07k3r3wx7ny2c8iill11dlajfox9j9432b2h02if9m2xpo3wwxzyvcqlbh6tgdlarf4kdganoqycla5zy2y9gc3duyfme4vw2wfykz6i2wl7xjv83xlv0uizw4y04zb9w7vzrpb4rtq7tbdbiqlibnaf4lklor3l36lttzkd4sj69rhni1uyg0hugphnbmc2i47xfnnuprr0vurb3wexjam56oikbcl7p9ph3kdouw5zwl0xbc59i7o90ex9tzfiz9l4hdiwqd8m4je5dd0f3jhnn852qu20an54c38c556jfvi4pxxfvywzpyz8n15ng0osrs9ti8v6c9q1ib3nqj842768wg6cn6kgazs5uev1odc57duhvsag2no4kpe74abnix49xv7c9og7rzbzxsoy769x4gsb3hisxi2yijzktajhfcs8ms7z22hv',
                mime: 'cjp5nq4pki24lhhhy0kf3x6m50autuaf95khm0dnmxjl454kia',
                extension: 'n0nss5nu5uxt5a39wmm8rxeijnqxckoajcjnt0bjf6gykz05j5',
                size: 8327436288,
                width: 292888,
                height: 336006,
                libraryId: 'af096169-8608-4af5-879e-12d017d6a72d',
                libraryFilename: '71qha67tfgvmv38xamykoyrj0z3fl9k00kzkzjju4z031ga52sa0bw6awt1rdwi4jbe20bwhurptw8zak831uzmb9y3a3b70d63sp30788hsee3gl5tefonb2oocbs6rtx48zb3ki85c02bdlm71vdv64wk7gfhbp21jvg03xmfgpysbvzn50gjokqak8rtphplgisnhh9bajq789rypg8zwzv5tsh5yxh3nfzekakw91umaa8cajjyj3hnujvy',
                data: {"foo":"m5uz:qIa8<","bar":6597,"bike":80185,"a":86624,"b":10686,"name":55807,"prop":23715},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '81637799-4f93-44e1-a69d-99009d1a94e1',
                langId: '02d76f39-0bde-4684-901a-e8636ff24c65',
                attachableModel: '7y6906dtzz63h108fpws30l2s2d0fr6dvjwa4aw9h7wt1j32w8dwuasguxbgji1ccokbgu1adn8',
                attachableId: '84ff4edb-a57b-46e7-88aa-376d47411907',
                familyId: '7e68b885-5837-4bef-bf53-91845c7399de',
                sort: 302548,
                alt: 'gr4d00am9w4hcfg1nlnt1md63bbluklqu1aizak3x3esyxkwffxdkswb9f32p0hudadozxl68qpk4bik7wc45qgyrb8z8wc06n146r6oaxmbmzbspr42eaorxr5mnhu5ydbst6lw69lgzf7ya1kf1w5yt67vv0rz85kl5ghu68ieokdukcwuwxc1qti5bdzvv4ivuyqa52y9d9afz7748538gjn99v1s1jut5llltoq3jxtjbqkb8clcndpno8p',
                title: 'gi022omsjmbqtcpsjhpjj8befcknvd4rfvmkilqb8xwkiqel53whayqswbg47l4dl71znvvzdgsnaf02btg0zkfjzc064pjonkkxanx5mgr8yoq3jvjtarlvpi5vcws5n5m7e41v8c6g411c8awqyyfl4su1voy6abw1dcjkmsqom1o0w0at43tkpmk59v4mm9k3svgko926lw7kcp41t75n93t3lrkzl3rzgm1f1kgo4mtavzrcj36el7y08af',
                description: 'Ut autem doloremque neque velit magni enim rerum est. Qui et quisquam tempora tenetur voluptas. Hic quae autem ipsum commodi.',
                excerpt: 'Non est iusto unde nostrum veritatis nisi ea a ex. Illum ut non nemo architecto ad maiores magni laborum nesciunt. Unde quo dolor expedita maxime atque est nobis consequatur inventore.',
                name: 'iqom43kvm04t9jwtj8f37l50mi7yxjuwqlg7witx7qn14rrksrk1xqd1s2od1k6tyx0petkyz4cxa171pt0gqjvy042p3mdal8kyarlr62s7l58kw6aji692k2kntnfglvx2z0myxnr0aw5evqs1zu8aumfbxd8b1srk5ti01jmt9mj4jwhnfeofy962fyrprenuafp9kvfykhxcsxlwqbgns79c6xhknvt8unzdx1u7dys3x5x13vgyhf3ns2r',
                pathname: '444berzoxfqfzi6kbknazupstvbzukqgf1eobw2ksemvsdwvzs0idq16ddljx0jb4gaomzdd5luvam69ffqu30no95y33h1wn4w3d66mr3rydpof8dor6iliufk871v2m8v1y9escswdcx6ewxqkdyd30rpaa8gjhneygfo9439pbmzy5s8fas3d17tmzeku0ayu8nyf1af225r9eyujzkbikvibh30edh44v5qbpauan1f8407c79ezc0p96u2f3e1bt1fqdf7aehx4e1brmkya3ikep9qwbfl5ebuoe84xxpz5cuikdt10ywdzx68ibdxogqlyz8b9ax5zvs5alqx826zfzzzx4ks5ugey9wl4uyzdkb2o1najjzrbi6fqrvdheefn3jobgee6l9ba8arlc12jo9oxpwfw8i7d93ddyxh5rlnaof87fo8cnqwnblag7xxfg2m6uz5f6bi33coaruvullbxcibgewl9nifjy3h8p1mh4vndz4siz1th3xoyq2n31jnk53g0imwozyafmh50g9nyq96ptxh95zw865g1uyt1nfazhlnxdz2pfina18okqectnl4iini39p0zngir9pmmanc3nf10scfjoaag7e17qnyr5jtdbpxiy1psk7hiqyg7g2z02cv7ligh52dp0d2xgydiipis2d2n987kfdgikkt5rfvz9xt9vk0bni048x1ivnmvm29hrlvyatxzja5p0vryv4og30jagabajt6u97njcgkq5qvdlthytvqd16nr5chgp82ia15rjklm1bm8i4lewcf1pbondp9qmq71grlvqb5rttymnrasuq25e0meznfavaihkcxlv0pynnyarz8zvowtw9xwdxkdo194ao6qwj6hxn2y3ecc5agmtpaxhwdj1ydh5bm1fn6qg5im1c0p2gb33maq7z5oadss1zlk4orurhhlv64771g0o36lwf3cph87el1o7h2jdj7dgea9t8l9topt46albc7dfsp6ew4d0xwy',
                filename: 'kx2o3ikjt9sem7ynu9peyj552qalt3iplp5nt7m7af37c1d27wtzqe1s0boefgcs8h2e4yjsfx8cm910y0co18x1352u7bbzagbaekpnm00m78mzcic2kqe29vffv056q8vol2pau8259xu1401iuslsmaxhvw3al1gzkmap09uohvsd0wanbpfsmpbz5l1t3dv85u1d5tdbu45h2ljz88psst1o91oc2xbccy3cmaed4loql8tf2dhezqqu81r',
                url: 'ujdn58y0inlpsy4bn9nethyfgp8qjfedzsb37xs4olczuhev1q3e9uiyu2l80rjzp9mxbafxgn1rtsivfhfszrhe88m6iqj8ms2m39vw1pi5rxjmemfyt6e8ej5h1h836m0edeu1tp5tecjvze12deh2nbmayvu0wt14w4pms477q1iol7tdaqu7y1rerwqf0d9g0vn1crfwj4uc3gbqjs0326oymmfmrzt07f1ja49hk0w4l8dv1ikslaqs6fgfwcqkr6j1xa03qjblsnrqf8q5yli3hu9ml53r8rnqxz2u4lru8qf6zsf7wpbjjnaq9jnp0wyohf1k8ikz1hwykow99zbmm5m6ox1fym2e4nbyqyvjrmgsiebj52nqhxkg2jfb8l35fdzggxklt84twla7xoekugfdvv4pnj9teuhpsgcnugoi3h8zfgubrrf1fjjp1do6oay9p24jc5a7tehmuo7vx0407sd0mfytoq0010zks1q4a6hrho0czid1a944obd9hiz0j8t2r8bv5liefq2y9mxzfzg0lwho95eabvfv6if6nm0dcrn3ssclkrdwwumfw09adxmxzznpsv1xkw8zsq3kqxz3xdg6a32o8v7j0vhtgih6s39xhpneb5kmehyxgyprl7evmkjun1ceq2clwenye22agc66yg867w7gq10rjb13qtvabd6srtkz28l9461qzb3s4uladx8wlrg39otke0fjwn7b1wj70iuxv8k2rfk3i1bdghlh79lly0q5q40ylbmmwb2atj6e0e2mev4lyjddc534pgfnhg9kb8azkvtk9nc4euc4h85z0oh7ghucz557sa1f6f1xuwhxxqv2bead3imefeitr9z8kyfpef69gdr6seorxidvt2ln84f1dojke4eg18v25lvcq81cmiupeandr5oa4uwj2umudj68aqt2dwp2u4eolvsxextvwbxh43gvmsv5xfe2j6dx3u2addqa588lvdfqm83w1hfvjjku2gbn',
                mime: 'dx1l120susnud1y2cu8wi949tz9gjjp5dgf0hqhabzl3xc1psv',
                extension: '3tfqtjay4omm316shc0xt3ad5rebybu5xy1s283plnw5v92rxk',
                size: 9718338604,
                width: 131809,
                height: 319849,
                libraryId: 'f9d4ec8c-58a4-440f-93d4-44058e3a97e4',
                libraryFilename: 'w67mc4lyn1qrun78cbnlfv5i2amxlrqtbt7iv8jezeqfjclyhj91g8589bzhiw4fg4qsxzzhkvuy7m30lza1ooech1aucu10om1qzk5utkdiu49oh4knqlrplladc0e4299cncbg9fvsw3h4h7wpicfkb3e5hxh4sg0chstq1e2czd9lel69bal4n7bbrnwhyf80vbnsbut0v2jh80mldcqm9wf1norbr0ykftoyqtg2zhqls5dlz4sf7h06koo',
                data: {"foo":73952,"bar":33078,"bike":60913,"a":",Y%k<V[g+q","b":"YIh:+\"T1mu","name":"y{?I.T:sb$","prop":"$A9Cgzn2Yf"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f400787f-d8b8-4a3a-999e-3afa72e042d8',
                commonId: '5e923474-9b05-4660-92b9-56fc4edc3adf',
                attachableModel: '9xnrrb030ifq48jp4c1hc4o3pep2v2bjnq4rb13omaa8qx0kbt906tr4a3cf6bf2vaf2bn1iyl0',
                attachableId: 'e3473461-e47c-4b50-b12b-87115ea736f4',
                familyId: 'caefe999-f976-419c-95dd-e9e0bd4b9bf4',
                sort: 604253,
                alt: 'onsoqudg9vupe5r71nxhqtw8h6jrge36h4t4a8bwmlogkqfxisekntht0lykyluahkc4jvfgoo33sf1s7yjzqxtclfu9qrb6meh5dsndukbcssmm6fcoj2leh35thdhxsqz3qzokfzse1q169qieph0mpxu4hifktqrcx4bxjrs1w4opgu3euehdfkfdjonuz3a2a77cyhvax31ce9iama1a1k04sahn5qyhoh6nmzeswadbg1jxhrwhgv2eevo',
                title: 'zp3j68ekn153lyn1ig9lckitadlbyex5unnlwbog2meye5tzo2x69488hfuraot4ejv2wh2lct56usakieqgbcmmfgymfcsuuqvzp2shi5n6dvedq0t3iu0imvhol4ls5wnvv867xdexyfsp8tf9qpk349bk94q7edpg4wkejtrs02ef8dco3l1943j695x4nxz0mru7y8ub2y7a1lf0i0fb08isuejw462ds7or6fige7xqbvdkm2us1su6v5a',
                description: 'Impedit dolorum exercitationem inventore quo similique facilis ducimus voluptatem. Nihil reprehenderit ut fugit et. Expedita ad aut unde.',
                excerpt: 'Non sed sapiente molestiae sunt ab cum voluptatem ad. Consequatur voluptatum totam exercitationem dicta sequi. Cumque alias voluptatum quae maiores sapiente provident rerum voluptatem.',
                name: '9x1q2gien7vkh6wl2px4cpczspjwnw037oo7se1ehpm4873ert15yzc1xrrtuqn8q7m6y37pmt5yy17t6pfbqu2sa9jxenhck2kp9z5odntpvn6utbq946fzex4kb9rkywbhxscspf5fmou35ednbi9ud3njniia3x0f7x5jnfgf4wsm0xsycvg5lp5lzhhqyhen4gniyc77dcnunt75em7bnrgwozqpjaizzcww8zn8sxbukyc8h5t328zii7i',
                pathname: 'j8mnij40ydl8pvpheu7slbhr9y7m7wz7k6w53hwu1hzisfxea450r35i4zki56o8yxo363fxqg2f90gkav3d0mrs6otuu16217vxlc4m5mi5nklafswmlwult1hbi2arq7bw1xecdqh1oixbj6ooj5bx0m1ktjzyopgz72f3g8ktqngnt1um2firr3j4o3jfw0z098inoi8u4jzcxc1a0y2hi4aagjz6mpjeuh1mhklpo199opwtn42t1520qks3crep09ultbpxlchnnm5ji3s9q60kfsbyvyklsy487ymsy7kgmam9shrmvsq62ytdyi8o86w9fk3wz7u1vhorkv7zzlecd84nbdfxqnvvsna8i79tbom776087hsn0q8jp5bajj5avk1ryxyw0h6ux6t8avjsak83giodsqftfxsyrctf6h5pcszcmp1t2gh7m3ps9lhlmrnkmv0mpb41u770m49pt1q9qy82bjuohcgpbp2ki3dqj2d0h9gfrwt35ton4mzowjta49rt8w5s8qcnisic5f9i9jn598rmd04guurmpekoej7d7rjxptdo3mjai07s7shfy5mrk5oej54mh6bvmwspkm6rzuaednlix41u3pewpgll1l3xhnjqq79jffojpjimdnj0c978f4urj4ylwqlhbx5j3veb7w9xnvfhuzk94dhawbioa95hsrkufo08238ibjc7f62vr764anrzaimb1z11x1ket5y106bhp9n688cf4ghrafp6msbalajy8trn3mubbzjd75alr993646mh81wyxj5okl14pq0r6tae4g1r7hgzem05gmmiz11m2lyov5mhp21k7y5lvzf7q1oe4lumrb1seb26081ejx58hvuqdjhmv6p3tjcxdfrhpe6uewq7clgfs1ik87daihpz9hmjnma4f18jfrysrokx5ydk96kj5hys74j67jsy0ktqpp1reww6oopov5iaz086jjc7kvqcz1qnhsh2dtoows89soaupng',
                filename: 'li0jao1ggchv72sv0dt727y42amiubult3ix81ze1k4hz2xwx6wwe6t5alpittj9e11q7l541k90bw2issj0f9mgir4svfr3mydh7pc5pz524exavfli9z6s55lbdbdy5clvlxopofgt8gmfz7bjegcc4i1oftsqvpioyfme4cxnih5ci2jwholg7u1w4gqh42srn2jy950nfbl5d3g9em9mo00j8ipeoqu3370i60ofiit60d9cy3aq1aw4tg3',
                url: 'pilq8crdz6bvxwumrqk59ss3y9bis3ow8m0k6hsb59281pqsozmi1hjxd7jyltowhfxut521q3eom7o4lpfgmdzisjivuxm9y8rel7k6235cr2akfp1x142l8n8za439vxprnb0lomwajgv0qb1sufgdyfo4iaxsfkpes3v49xk3jxi498m68bumvb397k0863gk1aa2hprslu6b5v99f6kt0lcpvvh2m73vrkkml5afs3no1ooqmup37sc0cvk5wxe97laxwn90t1127gkqghxhyd9g43st8fd3abi6463wcuw6brg9yb8r18q983qljhz6ke9aizkkpjb3t1ojc6tg5it92s2dvks2z7olal1ytq181ps22jz9h88skffvhigp6d42g4g5ot3qwr8ofest13pr5f0il3m7u2t76n02tlzxangrkcm9b11pelr1s43t5ugn22shv0r4iwg1ldrfkpff8en50pphwokk7y3xmlf8557k9f2o4j36o9lyp6qikkbkrion19lj361f5o1k997swi9l5dbaq6f8dr3shzs9v8guxjkgr1ayvzzs0xkduva5vjhdvv4wwo778yl0a9mo5gaoarqkd3og5hbtf4bhng9mc01wgybs8gyczm1793dt3uvk4iz6t8suiiuzwdqoithxhyayx21buhs8zs38m0syxgcxvf4la5xt3vmw7oa6bwxb7eerwnzwrslqou9b5di2h4xioiw2mkcoq9s6lgc7whm1yvs8g89hw3047yge2k8k7uhy2s739bvlqevwmdbxy4iq678htj0f4vbjdp76rqr5vd44yjiajrhq0ionf951qdam4w48jvkoskaim2lexfld1egnb3yuqsycx3eqpv4c07pc9twa5365v36n0duq6d5f5itvvu1etgxq31ub78xkdfwl7voeiwja0lzh5lgkueqyrmor5clg35bs9ti62z1zppoqwuyryiq9esoznl9y07xnglz1q6sfu580wux8wydl3j3a',
                mime: '5npbmpa31fw64sujmbwtnwvfr7tp1vmexmfokbnph59s5emm5m',
                extension: 'tkifm0jfyxxumxysbdb4eeisyimlvarkw6h8uothzjqq22x211',
                size: 2198918009,
                width: 450729,
                height: 631451,
                libraryId: '85146981-cf34-408a-bb44-8c04619a55c2',
                libraryFilename: '4pn1orjtnu7kfsxrn0igxsb10m6j5d68z03pflrloui95l3ap023b0ngp3oykjqa1dswtuhm08t3b58mrgi02xrhx8jkzvkut2xoq53mzqgmo602kf6xcoku2dx934imbshsg5tpqbo275c075dgos1u7810fujpqbbeupl3cp5baeweom99e99rba3tfw4dz4ar3hljkisx0aa93w8zrspiqhszl6r4hbsoj9in5bg7amkgjdyq33tak0lksnk',
                data: {"foo":"=M%#c?bO$i","bar":"cIa\\[jWx-[","bike":"1d|bZRiu5&","a":98146,"b":"@4xwd$c5Qy","name":"YIR01jDor<","prop":"WcHOHsJ_,V"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '735c02bf-b949-4d72-bfaf-f8298d43c3a9',
                commonId: 'ded680f9-0026-4d68-aab4-f3934263969d',
                langId: 'ccd48799-dcc3-497f-a07a-01807fa38889',
                attachableId: '75c6f0cf-5947-450c-b5b5-c6bad5ac840a',
                familyId: 'c4593ff2-7fb6-480d-825a-9d65a31523c8',
                sort: 144625,
                alt: 'ftn08yy3eiq943hbi1pq0wchi30lgrveduv7jc0sxkcqq2vxvwpaklpq3shh3uxg3cn50oty84xeco7c27mbcxvmd90vv6jg9mlmqamk235allm7k0he8zabykkyinrapbf7ihasz5budz6kkwrzbfkwi4xlfok2pl8pk7sifma264kxgwf1a07oiq5s6y2gw3ecgh5zw7516o7cyuijkvw4lyectidn1o4ep3rdbv6mju460qmfi1d4kijf6mp',
                title: 'noyu377ms2vzzrf5ou7ujplnmil6dkfrr8n94py96hcwlephg3l7935v13szop8zlpd4mve09tcf9a5sgvg54en35lrzo4psbyhl3stiognso99qwpndarbl167131x11347pki664kdwn0t9ddvc9pu8dnief01g0b49pm6oyqlnh56rvq6cf02i8rswr1036c8eu5phlsuew3mcl0z9qlrcj7q2lk04b6osk2geclr1vfzvol5weg3xthmz1o',
                description: 'Cum consequatur nostrum velit rerum quaerat rem. Amet culpa velit enim fugit tempora velit porro voluptas sequi. Ex ducimus tenetur quia eligendi. Autem harum harum et occaecati officiis maxime magnam eligendi. Doloremque nobis voluptatum rerum dolor voluptatum iste ducimus. Numquam nihil laboriosam facere.',
                excerpt: 'Magnam modi sed qui possimus quaerat vitae nulla. Rerum aut voluptatem expedita similique atque. Error sit incidunt. Nemo a delectus in. Consequatur quia quia qui voluptatem fugiat nam quam.',
                name: '6kxx5736l4pnx4ot6e4iv6nmo91smxdlfx8ibl71zbkjnseg7ppt5lzj2x4oyez2689n36ncuhf9uydw0pnf61fh522d780wqevqbt07xdpp19unypswwdts1atzfah9fd4v0hecjavu0xyxwbjf44kbe9eim6yeqo79xg7mnme155u57yglzrtai4bjweb6ni4nh2fn6c5fm31h9lc03m3da36mh7wzqd8zwgmlxcz6v0nknzttztn0dd9b1ew',
                pathname: 'wfrlk8nibkc6sgg6k54itpxeb7430awk4e9x5077n7e7lpc4eh9rvk0d0js59onkxizzmpn3j092b5q32ue6kr9fiy8o6idyheq0d3m8atmmwdlxdapbd1fzdyst4c0z61dp185pps4lddyvnkowywcrwm46iwof05nensw7q58hb89yew577bz6kwgndgsltr9f617ynp7ozfoifylyjp13xmog085w4i4ktodvohcoxhn9sjjdcpgljnpx69dlrn8tvbg4vlahgiock1uv856re2u56f8r0hozxp7ze1isfnzovydj7ysdzni9f9x2vm5oir3de085ozc8vm2w2oran3jui3lgef8w5dia884lw9dlgwgi8zuxm867qmv1tmrkcunyjv5leons8zw7bp68vy089v7jg79j19oz4bpqi75gh3a1brs3a0nsbbil5tvpssb70m07244y3n2wu0257gcmdr5umtdh3jce64n576gwgf5i5r1v4pdkr3bcve0kpot3lzfdsopnbb9779th83064kn8ouqck6t4z0lj9qq8vytqeegu3jh1rqn3awnn0bflax7ndxexdsrk5uwsygctff92qmlmcl11jb9fa7i7wsgqj0i5c7jsbr8a0hfnnqzhz9xrjp6228dsghs6rdp48z110b4v8po54qanu38jaer9eyb1nmy8ly7fet9vfuur6zkscdmcj0sizd79zdfvejotxifmwutt5yis8e6upv5jkgc1jnlfcpi4gh9xf59loypomtqipm2r60fj0zrbggjref5qxpacao1bx9tyjvqnsh0ct5pf56j5o9oo4ibcr6wtn3d4tsek8bwgxxqs3wk51vnl4eoza52r3wltc32tni88lkw1625vr7jck3lx9ouofsnnm4y8bquwfa8m1fr0ykzemvua1uieo5s8d0semxm3o3l5sd2qp4vgn8637l0kpwgy2hm3zgieym7t2fe6eglslb2b2nph0fhk738d1rf8ij0mcqxx',
                filename: 'gpys4lqkb1j60zy5mjc3beucc359h91c60rssxz2ik9s8wbtkqfp4vz2lqdafpaqhsexpr26ydutzyul6la9vhqs1hlx49dzvqb6ejeljf7uiic77qmhmqiqk1frul6ha7wksk17mg8xjkzheho820mu8fmxjygdsjulk8mgqquj8g72b880hexis5hrcnvc2tvlssx92wrfbhoi674011hu1mpy1plg21sncgm586pnzanqdlxe7qxbvzmdg0l',
                url: 'e8ewxfm6b4f5fjqm6njtihn5dwe55xugvgqsmilrfx6ken794bbykgpe84otrk5y03tzsrrbnlx0j6ojqqq0ui5g06uy9i89xnpzdgvelfppbtvrczw41czbv8ttfdg2x4pcf4s5euep1nr9vz8kmcsxif148q92xg459iepjnats9f91ro7pjubqyhw531st1axn3xdfuryx336fsoviz4wswrmfzuamqeskzaz4ifmu4wffxzwj9ws04mq0apnza67l7i964vpe39l15rhv3g9tkw21b34xngww61659rydzuqos6g5v2x88up7fwv2jckib20myiq91o4l3uleze5kit7ljde88jdkbho4adtkwkuui7sjakqye0s4wqdqxbyvi5x4r5dz5952oz1nmauvoo4wyddpd566zt8t6gern00s7h638u9tctr50j4oga4dzw4goj5b3f3bhx9kfplkt8p9qn5uz7wpo4kx7pijupsndlykkm81r88bekx2r521qu4fyppcoznrhy6ycy3vm4jy0h77lqezmchgqewj0f5nmyvlmqqjfku0sy1x1uk0l1160bmhjmedpkbwgkw8llcbn1tf001ubx2ltbgnwkatufyrct8nsqzvbaqgfmt24m7ueus2nsauqbtapy4p3y28tnppmde2yf64wcynfkx2ixkgl6j0w8xdgr8v1z750ueg7n8i7m2v9q1j49634vc2gtk4na45ho7acjzd70kswskckd8pjeejpu9azma89xqlv7fvindtiu4nb49pmcv8ui72ku0w1mukhord8mi2bkj2s7xia1qx6ir7v6b3ghcte2n3n706a5yi3grkgor05yxnnhmvby22anp63ggarces684hsl9h7xt1n4msm18ay42wz2aasbznctzfec7d0qjbzupb1owsv1q4v3alwjdwf85by2w1j1i1vazlj0unsqtcltf0hvavffufyqenck4njf86tcx68oka0y7809ygdj95f3euf3e',
                mime: '9ezi8xqm64m8jz18v02o9lg9bhc454z66sfc6emi9hwpu8rd6o',
                extension: 'jpff43jqyhcdcwdut460xf1wwl1w8aupy66vk56qgep35gufn7',
                size: 1767242193,
                width: 634329,
                height: 905769,
                libraryId: '1a9a510a-b3bf-4012-acdc-01b71b4ed4d9',
                libraryFilename: 'lcdhkc4ol0ljzlpetqo7nn3r1smemo8e8u837epcu5jc2om4yc7369v988ty6dk05pqeahakgz53k9o74q6c2wi4o6is1i9ii2huzn28fbneb7zd7niwtq5lk3s8m3g86s9tgs6i8sstucn11v452jnlpdkpihgfhu12a08ypi4omvseuknpzqg6vntcoi11iprl93ktkc14jcnfynhgsw5gabaw0pqpf18qmwvbap9qmx8j2jsmdhkba84bn32',
                data: {"foo":32642,"bar":16795,"bike":"mH:[rK`N8_","a":"}`N&}n;3)y","b":"taA>gT4oW`","name":"y]J}yu@)eW","prop":61509},
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
                id: '23d60d36-a266-492e-9c0d-ac783a21ec27',
                commonId: '45b5ad25-7297-4a95-88ca-fe43c7e5e44b',
                langId: '96bc11a6-3fc3-40a2-b4ac-7039cd995143',
                attachableModel: 'e969zxe8bhirrifup9ucr6136pctm1gwfnjuo6qc51sg1mcksco5hibgomsdrci6z6y1t7zil5c',
                familyId: '7ec19fca-5235-451b-88d2-5da481c8504b',
                sort: 444050,
                alt: 'tektyy3liaowtg5hzoz4qmej9r0w6jdic5ovag8242tcezk33tqj4r9lpm9u7ejtoksk1th7cix5ss5xgwmpihz1e6mzex8nl70eb4i5kjmasvqijqnpn90hz6roh89q20hfkb5cvu7kovfttzg3d44s9s0ndzmmtnc20w1x0uclgkrtmlfdxfjrnsnmidq3v3wsxilv2j9tqavhcynzfjqmh3p9ex1jkkh8n99emv1h4q1ofzhf3ysm52iu2qi',
                title: 'pep4a7jm9apfperdis7ch2reue6j9erq2p0mqwlqqe0b0mb4hbcbk9aiwyilgpe7dazclzi361z5nmkliwt7wx01hgyt4n67k7meec77ml9d6jmubxb92rwzv8qhqu5n9xfml6yiowg1ga70r7gcpoi6n869091fzo6imyib0uray8r5qxvuu3qptgguohqobvg2twdm3anfplq1wfhg8a0jjn3wwqlor2lyp3u3ls5rz3bhbzl6njuhk8jstpw',
                description: 'Est iste natus quaerat et alias. Aut quos in sint perferendis aut sed occaecati quia. Voluptate perspiciatis reprehenderit delectus est sed non soluta omnis.',
                excerpt: 'Nesciunt natus possimus ratione dolorum expedita sint explicabo placeat. Quae dignissimos incidunt temporibus. Qui cupiditate sit aliquid cupiditate. Aut alias tempore ut temporibus facilis molestiae optio dolore. Aut debitis illo incidunt recusandae laudantium praesentium quia voluptas.',
                name: '95i7lsbtykifxua6c9x8tz8dqg76b96wd6l569kb77u9ytzaiy19oy8jeetuu6kbrftz09up8qmfpoocz0s0dqoxpzus506ys2uwbkoqw5ieipzi6kyxru1ckrzkaofc610ekjpfg80axzjy0s1exaz1z6m1ifmwlbl7eitjzeez83u8u4afcmzxl4dnhlpk7evhnnhq7xy7ad9kiu22bzvttj97eia1lip3aqkoulqz5c2toysx1x7h8ukmtkk',
                pathname: '8pbckgf3m5nv4wp1kre9urlsvebwj23ophrqn8ah1ejump1p2u5s8jmia3nhgwezp8oh8szcuj7rug8huybpy18tqbio0846s0ys7tsyvou7swkwwdvhjk1ss20cqt779wxtddwf2x4y6r139inbeqamvdy9037wwygrxwq93mw0w2o2byprmhx91nvvo8g93s4vi8wv9j4dmrx4azjd7tcrith9qb98nrzfd8z8hdwxsck3ejs1wea87dgjimtiqz380px3wikl7xkmiaprjzz6kyo2shlrpw2c0vne1v3vemgsfuzu4fkq61oedic336sawfl854tzqha46camcuc0607ywivdp9xokog0unpckj8a78hejpyezr0ai6fa77su06cxxatit412uvaozkhii2rnn2glwbbbuype8bdgo3qo8s6mtkp5jp4tmo4s387htyh40sf29por3us4wg7xu90gbt8ab1puxctygv277vulvt4j74u6498cq1eklshrgp6u3dvhuug5y6q830j7jhamyro2l4gpfw55djjuxxnxv5z476k4x86ls34oqxmtx0gwhef27hhc4gpcm7lxocgvudj7y9afdngkcomh9a9gku5b2wj84t3rxyloj9q16rp9p3zd4nf6eong2vxshocl7mwscvcwn2ba4ltln1nxn36lzufijlbp625bfpq398er77bieqluwz9o9jnwnyymlnt195cklw2wv2ez89ya91rofpuldfuk5f1juz93qnnb0df9m4n0vemfi74ujak6j2o7uicgz99g2i3t31t74kgvenfou0elqe96p03mxy3ih85cussarnt1mrgd1m9ju3lrv4wog8fna6blof67o8e6gus6smjoqlhqfcdougi99pkh47mm1zrbtx482lqkjkpc065l7l7okv5wvq5npgfe6jhlecyk3dehmhz06ihettz34cm732cu1bhdkrnv48b1gwvp78qsnnrl8ims0lp2yjr5mo8f5v9g',
                filename: 'xup6goo5l7djs3x7peeih5wr36cq6of95lepm59qzbjfvkvamfs8f3m3cgq1i3liuh4bozko4ndzyfcpnlh0l3ym5pye64ymn2ze2tinyhn0hh4vbq02gw2t1drofanfty8ap4yoh7fvdlwc5z4rz1a3h5iho8nam2qeb65ykdg84pn4gudfdgrzejb1dpztnny1qa8g62xm9mhqx246jjo5c0s9630da32l1m6nnurg775uypcdu8ggkdd1uf2',
                url: '0fonjajynlrf41ek8zh8gl9rgydsqhim3mx6je5p572om5cpvycx5i2reo86mr1lzwawbpwgwrkjsheydj0jimb2gi61fnvn3jxajxcr12w88muoet9yiq26ll6cmrrfzyb965srrjvvk5lmxr0dxjyhh657epd71g5f36uakc7ye1ob5ol9g8mv704bpvgrdq1q0bbr3u6ovgscdhhw98sckdcpnfkcahr9b2eeaul2z313ubdq8bk2d4r6vcizgf72bdy1lt6skqdydx6uw231wobhfxfwly2d7m65i7mlg70i78nvkzqgrfnytq4ba9yo4962ohhuvaz5yickwdtzelpzvg0rres7e6s025jvsco8qn7q7ikljyng6zw4fnujo1dm75zecjxxiq0hobp0u45t5k1zakwp0g3uxumazvj7buarq27n2i4mlkb1ov92pjvy9bqx2w2whn97qw9vf2n94bs94chqpcvhbncxqlb6k4wz36b0mcnrbk1g9rl08yjxge4wd5ln36pq36fpdl2l4hiu2pot65fjqq5drx5w74w7ckoqbmnalo7g2yefcsfavwha7ly37xssdg3s04t9j26ptu482af7uzb8ncnbw5jlmlz5fbrt3en7u1ol3am8iikduya788jgjw19iptv7qaluam1qaz5q2k8r2gy21ddv5w1octx5a2u8qmdk81lqfriv2d13dmbulj5gexrdtiqmh8t6kr6tnzbcj9az7to7zmkjn543i3wm66ax0xdi8kjioc419inzuh6aay56fjlfiufu6yo6c21jqtuhdisr8hlzy0s2hi9zz8wjn9s51p692fq6vvi96gx24d1qb4eg6uuum6u91cgv1e611s7hwdef840o48lvi3espo8n2u2kekdrc8pjloq8xy7243hbw9ukez6v2by5ucs9y15bnxgupmhgzzwnodhgicculynzrfpq1cwfpbef4usohwl5oej05a9msb7y7dz1vtnulr48og0kiz8',
                mime: 'ji32gc21ea0530eye8tw0va2jr3rlbhdyizeh3pbjknngjqmsz',
                extension: '493v1doe5priquy5z1jzg7dfra65z92o8mx1bih2bwfhl2r3us',
                size: 2596003050,
                width: 929728,
                height: 992396,
                libraryId: '3791a606-b2fd-40e3-ba70-009867eebf23',
                libraryFilename: 'jcnlc4ty0tse3t1hcjjsr4v9t4qy8jmk1piwlj5urqsnv3d764l8n4b5jowd3lprcnt2ebwkqbsadn86fggkbbk3hl66lgb4zjvk2rho8sfwy9p7ws51c0p0nbuj81ikpfvch6s27kd9rwciy1u96lnqy23b5ns9c61wl5vokqfbv3nq8szsfcm48ho2jzw8y1lh5k1qcomckapbz5j21tbgxpbrr3pi0g7ocrjymmcl0x3kumiote4acbpa1cz',
                data: {"foo":60582,"bar":57224,"bike":"qMoVHa69(<","a":"zP;A+/O{)I","b":18265,"name":"Df\\1U}Mt*9","prop":84311},
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
                id: '92a8b283-a0b8-41c9-9e3f-912a00dce3dc',
                commonId: 'd3a16050-8030-4d00-b8f4-b4c8ba3ea023',
                langId: 'b7cb3f69-0aaa-41a1-a1cb-bade76d91977',
                attachableModel: 'hhjsd53yallaoxtz5gqdpfx6cthsmrhpgybesgoz0mrwugkxyjbhhx18vwz40u430g54v4l0s60',
                attachableId: 'b794f6f3-c1bf-454b-bdeb-dc1753908c94',
                familyId: '38940ee4-aa9d-45a7-ad9f-9be9bfe35f87',
                sort: 683857,
                alt: 'th7vb77uiejai1b6c7qknd34vcpyw8i884ft153s6srng5gviy2ihj53zcd55w20zj7fwvkx0jjfkshgtr11ncyawgo3762veuxbybppths3hvi68ou56dr0oyc0bhkpxl87mg5j6ts6uw5kubpgihq6j38vjcws5msskco9e087472eg1wsdi42x2uq1x4z9f3tw4blb4oei9ym5o7i4mafznf50eq8cfijwhuhxx97rek7yske3da5lvmh1kz',
                title: 'ckik6nb1k4ozru38z624z6yotwdx1t0w9rgtoflj1097jp3hn1tpciuxi1e68sbss22rgypvrafz6dl4oqarglu9egsaw6lrw54zy81bsxxo46fb11re9bf39jncr5yudpjqw51v5ze6u5icx4p173j3m6nbtodsg1i8ad2fs69fd2j347m3uuzrbfip8f9rnpiwzsm23cu6wz54cwtv0f2qzsh6c0aakor29kn465gnfo52h7s9ww8ehzxlzsz',
                description: 'Totam incidunt repellat corrupti alias et totam nihil autem earum. Enim omnis neque. Fugiat eum corrupti qui ut ex corrupti minus quia. Non autem ut eum earum ad.',
                excerpt: 'A est aut rem doloremque voluptas quisquam et id sint. Omnis in itaque a iusto. Eius repellendus provident vel. Voluptatum molestiae aperiam nostrum. Quas est nam ipsam debitis omnis voluptatum doloribus nihil qui.',
                pathname: '1glyeqc4s6f1o6bw3729f6vvsa1ek947vnq4i8kpchs117sbq98c9j852tqxzlcu1crnn2cwfs3h7qtdg19t1yfsitbnau4bng6w1xk14gsduy1eh3t53vjttp4gj87p0bxkir3c02aav60qku110mop6ypbl48s31smszr292h8qjz5qojeb17d8el21h90fcdb1y9wcqefdrgqv0mc06jzfm9hp8gz9wuev8pwba1xape7kw4no1dksbc17mo8kypf84cqgbkm1tno1nbmzeawmlx2veiqdmc5w0ofwppjtuh3lz1x89qf3eflh84oi8fpfpu9adr33screg0qzcqg6x1y4y58c3xwn0uvyf5z7qxw1btnpialr8pswduwj8pyxyz4hq8rav442f8dv5fqhs2ft25jsuftlb80ir8qdm2jbr5q6gd72livx4196nmywp7t5wfqjn2oxv8ligvy4pt1sdjrksvu19xe0xrf0ndes45i73tf9ekgvld2zlwxv5b5gvf2xs3ead0kiwqfrltl802x4zpsi1szd6wxt94fp73ewcr9zwu3la90r0iemsk9utg1cw0oycrpfeht6zrnz67gf0t7npipo6br0if87rysu0b7tiiwkvhfb9fsf3mz81vrl5mxymxt7b5re6l3oqoq52gbywcx9bq2um93y1v2bdhpar7ayr2p3omyvfsr1ocy7k3savu0ryovcsfnf1pxb7ew167903s258sanl52ijkj65fgpfpdl5knik1r709ys0dzq5xpfqt65mk9s7jdea9gnyusz8qapbxhbwzgcdyjyh1t1om21x42teph67r7iulrtbrjnbn0vuhzz781pqb5jabrnrtwlo1cc3m9dj0xjg56uh3rwfulhbgdl1giq7jso0q19cjafbud997jmch5fkc2c870izw2uctbll187vhyy7s61lrgsvadfnyp4ve7er75i3yesquov3xqluha163x8l1jgpsfgpoc3ruuhmigdclv',
                filename: 'k8irzk784adtds10tomtgs1p32fjqbhlzwczcofp6ulay0qi6v9bk68m60j8qqtnl364efiwpu7o6k7crip2hpvlzdlqfuw7vv56inguvukckx7628oasurgz7lzrcwbmbwwqxbilx5oo4tbkxcl9px1anpxp63qutchkqit5kvc4pczb4y0tskw8fooup689acg46cqh4zr0upfdcqphjcysbp6f2xmy3r20as38zuacoig6vkpqn7k1v8wjsb',
                url: 'r3qbpkw4bezmaaj8aehdduzzwp3huougumovirdg9ruugd2wxgmnu0tc3shrk5u789xmig4uxvzk813k61nlit2ornspbfuke6rgrzt4c2a89aitzk3unme036ushtmqkycl5ic6pv66c2duzm1b0f9okijyua2psk5tnh69kkcztcrrar57s6hz6afu4m4bk3sk34h5ewixm72gl0rj2z9p4tw3an0yeoeizd2ueebbttyp5uu83ry71ry4z5jzvwmofogjolnlko4ko9gbq99n1ikznixhgxqasw6yvdpiz7g7sy954tv8uqb1pztqc7c6untycqh3a4mgwpwnpigwzhdgjysod0ol2xn1l8lg2z5cze0pjekwd43ludvw8wqe0hih2nvlyun5m4ytkcz16sa3veb90cti62uh5s9toupz24vsoy2lz5j40qkszccy4mkcoozfsw4n3n07zjbfb1chq7uurzwbc3ugawu6dfbkiw2x470nh1ol89r1oxngw362kssdv7rjf8qir3d2cdvkcm9d2v0jnkevl2mrcsnpe81xck7asnw0t8l3jgy1f9wr07f2urx7q2rt5pxy97gn9rspbk8pwcgcigppt57jwlzep6xezvr2nurlow5fsfxu3dqcdoroc4t6l6kwyzw12sfb1wjkwl2r8c3fyt4wh28tcvmjepil2ix9j13ypekbvbgk0cyv571mk8ajjbmmj90xbflv2o5kniar1sl2jc3zl8p4qzj1eisuwezy6u3vlitc57t6im7io4g0xgodd435afdahlb7ed3nq56zvx59t1wrgnkwvuonkq0jpllz7q12i37y8vwtponl4kcxpihkmgwhqndh2ybtaxm7b5nf25izknp02t64dwjhdbd7ijwcfvkp87w5k10d21mkia99ht73w728g6mi8cp94f0c87tow553yb0qybjmnobnkgzdvnb6kcdg28l0cxb35gk4mw46str58qb9qjr6rylasnph8n63h0qo',
                mime: 'rbvmx888pwuyc0fevecenvfcla7mhlvbxf886ru10ya7arh11c',
                extension: '4d5tbs5422gjtyyj32qsdipucmevtb2swf4hsqdxzzxncr91uj',
                size: 1373562319,
                width: 982889,
                height: 215024,
                libraryId: '392091f8-0f8e-49de-bd5d-a6f029b30cef',
                libraryFilename: '8rhrf5xfnq8vuk4swunvvk4iu6ekiiidxa32ew4ywf0pq767wekwbv406bgjspokozxyygr2ll1cn08av8ushzwotgzkw2dv08vndcqpelde31h9gq1snmwgytqj2rmxwmfgejyholkagfz647bf7vtfs9p58q956hbypd6a37i4s45kz3ijfhqeyn5nmu2krug0r3f6v62e8m94vuw32gmodz9mh2bqefbahja3e1joqg0yijfpmf5bvzqjtg8',
                data: {"foo":90749,"bar":58431,"bike":"j'5u}{[])L","a":"+RwDo!2e8k","b":19454,"name":"^t}AN$H#T-","prop":60214},
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
                id: 'cddcdca8-2a91-483a-9604-7425fcc34897',
                commonId: '15fc5749-021f-48e3-8346-5076844db78b',
                langId: '2cff569d-12a2-4d9c-8901-c1c2f45541a4',
                attachableModel: 'yc7z32kkwggqgzx7m068gtpypjub2hquu5n4tvohvj6hdqte62owjkndjn3lmgu7ghd90ebw5nr',
                attachableId: 'e8f75a3f-829b-4667-a0a0-261eb099d0a7',
                familyId: 'da484138-7b29-49d9-94d3-530f813698ba',
                sort: 228902,
                alt: 'ub54nys2ko17tlk15kuuxy4li7xl0cskh522kl326ouu4wcgi9q9qwjqkn5rtnlwc9gflpjy8ox59blz7ac7qk11iuhmil0o5dmfuy582w597eb7wpdd6l73zn0k2kqi1rt05tzkv6wjszkm5kb0kdzfnm0e7xjwnq1euucgmszg9i6urzx7cp1ad0gokmgr969lof6icwei6rsobu43u8js71x2v4yhnfiwaepywkp23beiqlszx8jmzyzuqsu',
                title: 'muestnt75qt3nu8fmnow04mgsrltzu4gl8xde37kip3waa2f79bwvhnq2cxssaactv8r30kvf29o79e9z7drv8yig108og915hcopl3nage7oqr3v0ot1w6tlwft3fq8859dgfchqcf6hichqgtrz1qa8g5ccmrriq215s4c9ri4osissq3l996j8gfrho88n3pm0azuu61pfpgxxa8ye0zftzeey59tl2rllygg1n6zof6j8pr6zi5ckrxzlm2',
                description: 'Consequuntur adipisci laboriosam id. Quo corrupti fugit ullam est tempora. Enim aut ea quaerat quia quasi in ut occaecati laudantium. Et eos tempora atque ratione blanditiis. Soluta repellat quidem nisi et.',
                excerpt: 'Reprehenderit et qui nulla consequatur aperiam excepturi vero sit corrupti. Quia sit at deserunt. Illum eum nemo. Et aut maxime dolorem ut perspiciatis et eaque.',
                name: '27bisgy2j2aw38f9qlu4cgwnwdf9l4184hsbcn0xb782r1wqmnbe2uwaz40bbipnmybr1ct1cizwvdb7g1illhxzuyz31edo4sodqciaof545kzq1rudxgipakfpq0irzlhfj8bh6qtu0a3ufgxl86bo57j3j7uui0wl2cnq9iuchc87h2ndibcdfo3w0rk1csadeltto6bv926gbg346cwdnmdim8re9ujyf29i49lkvvf5v7swjqtcixcg01a',
                filename: '5dgixc716z9egaqg3wy8f6ro43e3frnavr4ik770asa4916usdrdk1wvyraz9w44obvc07qinnumulsikebva0x1r8e2f7r0zv668szfklxxr952ayclb7c96wz9au3hkua7cyz6hiuni2e1rqq1wd3pf2jym8ce9s82gti7vqrmoe9ndisg860xbvwweatl0p0zutyi5evomltt27w98e81om2k8neft95txcsqmnlq0jdkoiw0861x6wxjoo3',
                url: 'gj6or1hyszudmhh8fljig4sq3ihfjpv9n0h4efyusk0g4n5w7tm79zxxetdrglkbpvg1hivy8nhm5cfnsqoio0jn0owpjrj8ihig6k5jx8r03g5hmxmlm1rx8wchk5dk0ebi2pf1tp4d7gpatu7ibtz5fop7kvh01byvq2z6nfvgsudtcld36xr2rumjq6auweelo8csprdsn4wvk35yj13gs2iyt9xw9utba616xtu7h71ey0el4oxrdjbmy3c7rlomjxjde0i31oeipvm1p3hoofss92ynlxs6y0hjm0tdfdix26wd2f102j22akf3o54xdh9ytdfz3kw9rrpkdizf2zfrbs6wwnd1b5j2gso3wkdsmofet14c4hpcw3o0iotepxgv3me8lwmmqhfy1gkfwgclog8ohnnzdxzsq5pfdgy01xn67ycju61clml7md8b14wdpexlwk8r4dbpup4nh83m69garpxfakq1lnvrhk2lqzoi4cdl32p2v9n4q8f8bn17e3bvn3ljwse46knr9tto9dngypygsvgdaewfasw4up14hnnzoulnuy45lqv1c7e9kwj151l7307eit5ggfipm8b5delpzietlix0ewfvbn8vmldj6pdfa26t4f4l3z9pjrhf5zsfmpu5ad4hrq737tk85suxty3uhv8ymm2qaifgczh3lbn4um7k7m5fnctsack9q474bggn4yulrs14krs95xk5qcg6l2dtqnmxq52x1iygb1eb5n0t5r9fctupg35fnpbg3uqbt6yrvil95cayso6btejvftigem7r7letbpc5uacy9cpjhof7kbwvspqqvzp5384whio98wsu20kowy1kwmhf1dcopgdwu123htfhwwnd6u8u1hk5248dnt72g156i3uldja90oo4bin63xtyc3i5bmw7yqauygwpchat3bsarah0a7vbj0a958nwix4s1avie134hw0bvmf9cov38mq6iedm2hkw6wn16gmzgziadhuo',
                mime: 'nsno0jtkgcinius5rgn9p2637kcibn3e1m942a8ohl0je81act',
                extension: '8x8rp8jgr2nxhbefsrgl5kgjia7n6pzj5un99alz53zfu8ybt6',
                size: 3047222040,
                width: 859090,
                height: 523960,
                libraryId: 'bb22c627-1033-4e5e-b81c-c30f098ee92c',
                libraryFilename: 'rmx73216k7f9js2flnqsc4l6snyzfl0gqc4nlh96zl4e8gi5ivtgvwxy6vrci9lepvx8rf90nlhxu2zrkw8twc7dger9735ju5kcyqt7ii2rtzlr327vczh7iscvtvcxtj56jppzs08mbelbnexbpxf5j9ysqlm397fw6nglsipaf07kyni4d1pndxosflzea24g9r8h3cslk7gmcs9l6rigg18523q2zb5rsv2uem00d6c33r3wmfzt4t89mzx',
                data: {"foo":"q/^4F4wxlq","bar":"2i{r.Lnl.)","bike":67936,"a":55226,"b":48031,"name":"BD0OBt4AO^","prop":"0Ps$lvTN^;"},
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
                id: '8405b147-df06-45b7-9bff-835869ddcb31',
                commonId: '0d446466-cdc0-4f6c-90cf-371e0a63ca90',
                langId: '2e937408-22e4-4162-a548-b592ee867756',
                attachableModel: '5wd1bjv3csvc224ny71ajruvcy0fhwsuv1rdfk31zzd6iczqh6abbuqq75gzopd37ikci477dbp',
                attachableId: '840be29a-569d-4b41-9421-5405ce487362',
                familyId: '5375606d-71ab-411a-ad9b-04c66453c4c7',
                sort: 613751,
                alt: '9r51mxubqxulrfcdmknih2fudq7q26wzc8ftrlocrhhjn6625vz09iy5p2wt5ceo8rjwrw03m4vl2otiyz5rej8e75j3hy847uwdsvs3k5ieoga9rkyakutj0auf4nwrbk3gl1nnu1u14xbbsow8c5gph86e0i5av6ttq3rq2kztoeer6oq6n5hw24s7f1qjf9oejyrggy9nuud1jukx7dblmk1cgfsangp3a9mic2c1ab0gnstv0ej8uhxsxba',
                title: 'm6svytzsh3rom7z2sflj4ju7r7ds82uq9honej016i2hfktv6j2r0dupuir2wk93svww5oohhduw2e5jsqz4tmau0evgvpjjxm4jv9qiqs7cvfuc8vu3n6sqzer5ddjqjlvj4st8yije5d23hlfj2nu4nwae1nlvx0ympmhor35ky8fmm6n1ckq94yksqvm0gj6yjixdyicmxxi7vmbsk7pn500n2ianay3d79wtq1rub9lpj75bobytaeyk6pu',
                description: 'Omnis est quae laborum culpa optio dolorem et nihil perferendis. Illum qui est quos dicta corrupti. Id modi quis illo officiis accusantium aut asperiores. Voluptatem mollitia dolorem recusandae sunt illum magni distinctio ratione. Doloremque nobis id deserunt quisquam perspiciatis ab aperiam minus officia.',
                excerpt: 'Dolore atque illo. Quia sit cupiditate vitae consequatur ad ullam et consequatur mollitia. Enim fuga natus officiis. Dolor et odio aut doloremque animi et molestias. Qui iusto qui error temporibus delectus sint suscipit qui minima. Quisquam non dolorum perferendis ipsum consequuntur optio ratione eius.',
                name: '9k6tk41v99g1tffi20me5874ys2hsi81tps9kn4i1hfj8bk9bsj8cv9mkwy2tn2ee46ig879rk6sksvrncwxknu8jwxsfi98kqa2c049zjudne9eushxkroasl6eon1rezhxf6fa7c9kgzgbyvcu52nsmtrx562hy3gcdqtu99rp0l01tqc5ql2fgtpjizger852jkzte8c26lw7t8pty18lv0lhltv819gyje0aafj07vx9k4qk2e6tiesuhxk',
                pathname: 'uo1vnhrkmf392ejsxxu8r2u3dbbv8mgu0v1in8vc72skkvyjapzu2x66mqt8ewbh7pforxo1oguqszak63kn3r5fh0ywfa2kwe48cf0y52gxl1a8j60ze1kj9lic9j5bc8j1w9x5l2peh8w9lj7cypzgfcx92tpkmw7i2clxu7usiaevzl98d85oun2xxp63qqxg19pla6mn8lfvf6wx6nb3v5vkj7vsvrw7q8sm5l9zumhyun55z287afrxcciu24mtf7oa70ttjzgoq0pr7nqpqex6uaqiif0v9r7m8k2v4e6cj3hu0sdqhanw996z01l3fl3851f0ob5cs32xoyc84l3zbsu1p50d9stncb8yynljqxfoxrdwjciumqp6grqxqn0auoobcdhkcam6pqtrgh5g5fwu2vm23a8ldi2itjfcohi48oyam2ghqenuwuifx805b9c80rk9v109mn1au0elwkygc364yot45opspd98lybo3c2gdowqmt79yr7krco3z7ckoj0ooqxu3k98bw7wa03m2uj1pwsddbsjzkhu0xiznzo6lzmqrwvmo79uvtv532z6fzgev26urdornwp2sssrrcc6ulw0b3alampnygzlpy5zhjn0elidmdcajy39wk9hxgcbjppbyfkcfog93yozb231kb33d8yfrwhsgpg6upfv3852aa37u7dyek6zui5ybvkois4nqhjr4aquxq9feg09arm6275h8mhgyoe7i2cg1jt5ow2bpku9naf70oku2cvnqf9at5vrcrf07ky9m59qvst6vghpzyaz2w6bczi2mqn9jjknxg20n2b76z7kxs2ccse74kz3l8fjvouq5u6iqrx5k7dhowpaf7uixbabeke59v3myk686g9ryyjcaqx05im3axudpqm1dhp5s11dvo9ju3mcjfs56xq9u3vr8idccmqipt0dxxlz05po3ycqkz9szcr71qh3gvh7hmosnwjn3mfgictfdavjpd0tihtz147a',
                url: 'nsav4midj5lw0m5htjvq7ab94zk0aw3j8ri89padrgjnnn14d5gyy85lvx1qmi85t3z285xmwgocpvwyp5u7e8o2cur2jgxn6g312c4huqe7o7fjqzzahtmay00p2dam1j673o857zwbagbdqxbnmobuo05rsy8uh4uk8rh9bohk4as8pnfs89myu46gaja1o0fe2890jo0neqvvzzhbx9xz41vh5stdql5udyhmyb8hm78d3smfcef3a3rbcg7igftdghlgfs4v4nej9bxo76v61r996gg713vhxpthyab47x5r9uw5wzef3vm0p59ypezq2ymfuqpicw6kfmv3rf9sw96fg14h8avr3u16e6kq80eexwj8oou2ytzvyqo34zftprdzsmqal4ykasnv06yvxitnugdhslvw6ria5duuj4lfwz5y6ieoa7j12ug7ms678kxt6jw9xn96ye2wiiqxcki19qmcqvqrfj2uf1agpkxqrya58seckty1hsvrotaxb6g7aehu9myqpwlemkh1mnwgp1zg5vdjcnha01u4mnumi063kbf8lb4yf3rtqct50lhpneiimnd2r6fv8cxzhljyrll5eob34kcjfwtmbg9t5hl33vy8bbd2dx79hjh9s4ff2rba00rlu3xwlcf6i9vqs53csec87y7oe2bb1ichiqgtbx3llaq289palhsrz3doyyrac3nznqgtqdic73u1kpt2mybjzvvte3zkvmc8guhdjks5ahrityzrlrr9i8zqr7k286q7iaicmmsn4kah9c8hne1xtyjz713olsm4dqv6arkpzdc4zqzyjyvmf1xi2ygsjdfvnn2y8sler3upizp70nqnnsd45vaiskr9oubdd9jamwvw8bghgkxr32d6hq6esoydsgefg13g2ba0efmcqdu900nfdj3bw6dm9jlk3oay0ew99tffud99aoxi1xlttgmq2klxvkewpembw1n6m6t0kf6ixof38coa3nalu5o43rakme3e',
                mime: 'tuwp48wm9l0btty9gopar6w5mez45wdajdv92agcxx3bhmzh3e',
                extension: 'fvxcz2sqyha9098b4m101wglncws18r7bs0rdetfttqunpn0ty',
                size: 3614001114,
                width: 840514,
                height: 322026,
                libraryId: '7a81074b-e2e0-4519-aabc-09999b5799ab',
                libraryFilename: 'ddg55io5j4ixzbksfqgi5n59gl7ve5eob1pa6yp21k0tyihrfnh5gq3njej3df2b5s170tpbyeubf25wdhnr60ye6jr5f1b5axh4ql35sg4w2v00qq4zlfdph2j1w4108zi1sgoo39e20lsf51diis6zijrcbsg0m6foz3mca3lvc3gdq2umohtovov37kasymcl1dxu2qfu4bcazgyirm0o40gszi8kx3uw5lg02lf9j66cfeip6go9t8c3zor',
                data: {"foo":"hK$*k#wu#p","bar":"}8wAWQT8A3","bike":"t\\Bftt0|Ej","a":18496,"b":"oXj.qrNQQ*","name":67859,"prop":"6>[D:'VgLN"},
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
                id: '3886029d-85e6-4072-b7fb-39f3529eddaa',
                commonId: 'd92922cb-5451-4ab0-bff9-7877f7e1033e',
                langId: '9db92bff-31a4-42f9-85d9-9be99302775a',
                attachableModel: 'zg5qwqm3v9wuxv2kl6s5skgq10o6ij39b00grd8hpwnyo2zl0lf11yt4627ir48ut3u2385qonb',
                attachableId: '9246a95f-893c-4553-b678-7979807bc964',
                familyId: '028d57b7-1955-4be9-b92c-201c9be29cf2',
                sort: 302564,
                alt: 'ywblu35n9qcn6ho0r693jt3iam0fuscre77ktypi0wnb615bxxtr661crrw46s4ud87127kcpopektdsn3kez192f1ixu4hoq1fg93v0041362dj8cd4suegtfd8r10xj82nuf20fy2joi22254un2lmj5oxxjimavr8xvq150nneurkl6145pci9w5m9u32rn90h6qgiv3tga88ae6eqkdghxdufod97j33a19e1y8mc9wpwj5ugh4ngk88cle',
                title: 'ot5n02q59sae5tznh0jl1jiad22e6pz0njwu1zxvp0migfv6evijfoatwj3cs2tx12plu4mgd6p9w59ixj77t5w1d4zglvegbosy67jm0bkvdl7ox19z0zs019i7ho3t2u9hz1hxiab01sbbus5v5m14kg5vrlqmv1ytsqf7l6o2njkdxanfjxiam94xounqblf927912ff4v3cb0z0tp8af8fz58nacln57au2zvs264xuqiq3c28t0yaaa65t',
                description: 'Corporis fuga suscipit fugiat. Praesentium nulla et dolorem nihil dolore reiciendis. Et porro assumenda similique quibusdam fuga quos.',
                excerpt: 'Aut itaque enim a pariatur omnis iure quam et. Deleniti ea sed commodi quam quia hic optio nemo aut. Dicta omnis nam quia delectus facilis eius. Tenetur numquam et et veniam neque. Et possimus vel sit culpa architecto ipsam aspernatur nemo qui.',
                name: 'ghjkr4nvu677hc39ab4l9nsozm3l8j8qbuyfyxonczn6b1xnhm53j2jsdo5j5ocnv4l08wrzac0fknwuqtnolxols0lwooqj5z33ywjayhpu0ybdqkloz34cdwajs2p1ek36mid8x9w1btfv7nf9tl5jesahw9wc064rln3h438q104vyui73rljpf58kmo3tr4p31sh0pafo6qfagwba7ww3qvf46zq1bssciv5l5xp10pal7e1be0i344orln',
                pathname: 'h5imk3a33kbqffa297v4knf4av2657cjxzqx32e6tlmqp0f7qczciaxjgsawxza7it8veg7959uek6f5ktfnrj2uyyjibvesrc0f7gqyb8vxtxoxe4mkgobwbu50pr7kq0yt3t4ij2zwzv0qoqd6ghd5fv5rp0yij4wzzxlyc8a503lhys8s8i4nfdnjoeehlts8u74m9zw593ouxp36ru34x8riicg3n2q2j6mcvor3iq6tmpi41uv8449hcna5794jxcnmd48grult8iykayreqkz3tk940qd3bp4l8l6e9oiihy1rrttjyidkjpi7d08npdplm8qlrknhzz163w4vqrprv5ziwt9r8vj80uo7kf1qqyp49y7zcfb1esxa7ilsshv0es5gtlnuowvyq4us04icecipto56gqvhdkct96t1kum5j2030dga47uq50yrbb05cv9ceab85zp590euclwsjvftn0afgraqy8di11ixpc9j4422nk41uwa5fnu5vp7t9ubsgwcxpetn9qedhmi7ynx61lii6honyyeijr0lz9ze1ufhwzdn2n9tkw1dcmzn57wnc615yuw0gbkc1ii3mlozks17veso0rc2uxvl5zmljjnnw3ex6tidxpep6xd4mrdfnja98yxnn3izkhgnqne7m67yqvdkkmoasdk2hwx0sllzn73voz931y9jifmr2m4r4ll7b2be5ct6nqr8u7r0ap5yvm7g902lskyc4wihtu374hvht6txjt7mdehuob9m8ai2izazw6epmbb0sydilne2uiiup6gm9ort4prak0b8n4iwxvvuhe6s9eaq22mymio8v5nklb9iq9by7co5tu25xdcbpme83ed6eqygzl8oex9qsz6ym3eo5izo3rccu2u51kfj7s2nkcvguwbp8ceu2ybxc61h6efdjqzjn2uby4fhep2cwy7n02gqafursjme413cu9meydipz82trfngfffaolxpntidfqfspiiqfyj6cdgk',
                filename: 'd9c6wps3hkgr4l7k3j3u6w3u70qsqswy0xb1hsiz1yybeiycby9c95ufdfkwk2lnnuday8vqyek6a2m1jvwkb5nyj0snhiovfpz4yhfa7vooftlghebx5a1ftvlz71oou926ipnd5hh1uqnens7zkt6eoj1hr6e4jewgzlw4hcag26tjmanuc6y6wd3mreq298l9qajourch8ds878gzehqy0c90j4o9kuxt7mg0d02xcl5804rmzgmoc3hu94m',
                mime: 'nqdruo46ess79rcianugpvvgyklp381ajiaaszd3f18ze2qh1x',
                extension: '7w7jbk3zuor7iqir6326ngmhlw32cdzz1ot054fl5g38yivzmh',
                size: 8822400641,
                width: 556568,
                height: 796288,
                libraryId: '7f65021e-8ae4-4c18-8199-cbb2440a0e75',
                libraryFilename: '9zqkvnv5ok3sf9hkphve93mf4mzdmi04oej6lnwogr7r6ojuj7m3s3fr5703htee9ox66zmyocofnvys7lyyani90dns1hllr293i7gc3j3p69ocxigmmpcgu99xgkvjg39dw98jvv7uiu9b66e4rs9g29dzje46bkw6p8he9uqpfjq0c6aiyfyu6s7u2rxvmdf6j5fo9mfjunfsjaawdvyj280l3c5t2l7rn8duftybooy3prc05w5g14wwiwx',
                data: {"foo":"Vc{@_OxV$b","bar":"Cp\"0xSu;,8","bike":31004,"a":"%svXI$K.n|","b":"TYp:GL#d\"S","name":60311,"prop":95380},
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
                id: 'be995948-5e13-4c4f-8615-e50a6d8c7f96',
                commonId: '2c13a9df-1040-426b-a608-ac7df0022b4f',
                langId: 'd2c61930-8509-48df-bd47-924c6745fbe3',
                attachableModel: '27aq20q3i5gjaepstw2yhzb4q68h2cb66ss4q14rvqrp13t4wleb35flqtxago5dlt8blzq321z',
                attachableId: '2a745c49-55d4-4dcd-ae43-55ffdfab1ac1',
                familyId: '334c4a14-f0bb-4f81-8945-4490990f2ef3',
                sort: 663168,
                alt: 'mednpoecnkrdrw0eb7fdv05cfuywyhu5c5pf9972rzypsyx2nbxf6qtiasckujfgd5j4aje9dfc8p42vkelvuopumo5lq0zmcixeoqv06h24s33s87oj8r2msqyv3vnm4y27ye3fut63gfypszleqg398zn3s3dc3esuneklb0tti8thtc8fqnm9m7ppvbbmpt79tzu01vwpv3aeusf5s47cg2d0lvge69k4uvlypmz84zxsgyn5wangxwkaonj',
                title: 'imiu037jtahd3peiuparkv6xt8845gw8b8095sco8pdkj8gzmzaswc1qehmoctg5jmgc431ursfadxyq7cq831bgbnnk3k2w8zo4tj43d110o58brywh24howvyw5xz2loqawc6sj74jh2jl3g7meav2knio63wjeehhivui2vah3l3gskxu1v4wbe75j76x6zd6gxykrc92oes1kl1g4umnw54jt4kgo0g4vlwgzl652u5i89zd1vxcb52keem',
                description: 'In accusamus omnis aut tenetur aperiam fugiat odio explicabo. Velit tenetur minus consequatur autem sequi quisquam voluptas debitis rem. Tempora alias consequuntur earum cum delectus iure labore perspiciatis dolorum. Doloribus porro ut. Odio eaque et corrupti beatae sint rerum dolorem. Libero quis iusto sunt maxime ea.',
                excerpt: 'Asperiores perspiciatis in sed. Aut at officia nihil hic ut itaque distinctio voluptatem ducimus. Rerum non laborum nulla nihil hic facilis.',
                name: '6zqul80niy3em1or36p5x5h3xnrz8x4bixgn7sj63d8jt8fp915haoo1cetip731gls13dr7o383fdzzajcaukol673062smtxbgj0uoj6jzw8oomn6mzibd79qhdy31aoxbfli4pgcj2c47kfrvdwmvi2l4iqt55ku00o15hnx1n4lpbrsz51ihff3m26og220kak9003j7ohdd74rwsi58i9c4o6u680mnwaqobvavsr9sgc570eiuzshgx85',
                pathname: 'fjfyndjs8r0oalbrs6q168eh7her87nyaiebqs5fvcw7sm7rwm7gvno1h9wvx47ruucj9plgilz93lq7496c6v5lp2q880c8ix9c22faihtip3sxrespudg5gkdo914dbaluk0bxf80xzqu8ui8kqknnxa65n85ctihxle7oxg6wcei0mdv1benbw8i1wlf3iz18dvuid3ynd2ayaaumrkc41htwe9r6kzxcmxffao4cvtgbqa11xmjjkbovtezmi1cxcqg0wfibebp1zpv7fhooshhfn65vi31rgp032gcy5zcenfvrzg9xua28mdd3kb2ohk9csdgx6kx5x9qabqyxll0hlylz29scxxmg8oqb0ft94iy0xyt8v5c6g2ajfi63t50539qsa1w2hks98aicp7ry5a1uqf3bte0bs54z8o7e8sxzeicx0jc9q7g2p2pqpmcbu5vz722c5frddrsb3xldgiid22ovy8g33utrv07tlo58vjmy22ef4eaja4u8gn0j5bfr5eenkj590vj16cqpy3o0gjfqf59kahj657wbsl0vn6606pfnh8gk0othnii2qo8bio7afbw6qt5jqdwmituho3wix3klxffotk7bo2e1deh37tc9sr67li0caguivkruhea7qulm6gkfgydezh7xzhmwaipvsbqtg692ciq5ku7ujsvv3tkl92778zhx93k5qayrc08shw3vbmfha16ufw197ssxfp4wj7qo8vuxvpmicr6ti7oqyuq7aqmqf9f0cq0tcobv845ubywgt2gowj3q6we1rq1nf1mkw15k6a9fe1u5virbk9hruuu2jmixkft5muwcp06h8i7j1b35vvjiycumgqrns9n4k5gve6og00e3jpxbvnzwyxq5rxzkrqwqh5jn5sn9o1bz6zbxhiov3by3267xzxzy3gz1dsmn6pzdj8xfra4lqf58wqimlf4mzr7q37kpt3dndchdfkb72icgmsrtuimkwmrjequpze4aawug',
                filename: 'l3ox0ihzm5rdb6re65u8jguq9jd4uz4chzi5gxzwqt8vnkz69o2w8atp3pebk6ejknm9q3v5kr87vfe2njj0urse8mokvqmwet2b53vpz72zfujfa0rmet1h1oc4s2bjpy7p85qgb51eh9gcvxqef9xhfhln9vrn8c2obbflb4yqcnoohyo2irurh4ss7p557mvged2wtghf8gd2vkbnxvhotvjy84zpm0025ml9jf5h1er51iejl5t3tbqjxgp',
                url: 'bhfkrhwf7svq4bswh1bbe60bst4ujo0nzqc33rf2m8msk6k4ybi80x2f2qw9ee4rkctp9pe58rteaygwq0n3shi300qt7bbcv1au2k8yx1psrh6mfv0w53xpcbw1vo79haub63k39p9b1ga2ox86d8ypyn5zt23spvgn6c8c7chcbri9wqnu2y8wstoznewkgufajuby4i289v2rwzpo0vz1tjsvw8wqq25128ueoaudbq02x2jup6fplbon3qvdc8q87nvfvo49lefyjqoanwog6p0jghwrwf5ijb687j2ku59b10ox4vyqzs93bu4wwvc5t6gk0yie78uao97dle0en2upmq92ykm0072y5q24ha39xrvnoyhyjz44x4nlq2y74z4qob73odtd63ul2mg8d0jnc6u8be1v3b1jurp2hrpjyydil6j8e6el4bjxf2z92awq2dl45tac34mujlexqsjltvlkb8tvmjsyvwkw3jtpn009ykeyjtufvnf9o2nhjk93mpsoxa4aa3vpvrg710c6sfqs3bjny8pclfgddoutzq95yl5tsolivlqnai1bguck834t7s4fx0djy2vf68gv5t682jaltp35kxo69wn4cqybsj2rbut5d28ar0h72fsv8r9rs7puukd0mhe3adh07tgtrqtr01y3es4x1h6fnb1h81oizqbnm6666c9b1qq6t6ah5p12bhalht1etdijj35fl2waxsaicviheuwpmma9re0lha4c40tv4ogkjjrf9wv3num5l6s82xwwxthrwzlpcjlskgs3lv29b1cxk27jbl5iejptyegwxy0s5u59k30gyh4mk9yydjjqgd2j2fqhm42gxhobzrn019ipsj0ohwhzue2exkuz83nc6926ypnl3za5c9ov3f52zfj17mnc2wrqee1nsr8nfb27hyerdn4auplbx8w4x9c9hzh08br1ui31gugbahfhu7acp8kfdjbnfol9tcxb1r7rej7m537brdi3c1ab',
                extension: 'ye5n3lo0nku0kttkymxdmzc3cyzswoibkn3gkb3gnfn8to2sgv',
                size: 4836805628,
                width: 344902,
                height: 377698,
                libraryId: 'bbe62124-8831-4167-ac7f-998a807c5c33',
                libraryFilename: 'u8b781hw5a8be788gxeha6hoe67pnlj0vdi688e16cfcmxzic7kia5nlhvfchyp1ilx1ewbla4nqapqdd0naeonyy6o3289xovek7icnxdsuljnf7gg5tk6s8n16fww5y2jcbm5jyunomb7kqih0y7t0d8ntkuqvu014jqducn7mymopvx6khwyhzsaz7x9tp427vvuxs0idufzb6q74c5bxzv5whyt8e5u9phq8fpeqop1hg49u1pgl8z49fu2',
                data: {"foo":"T:L}r9pXc6","bar":"QOtC\"1;{4[","bike":"vv](QAQ*?L","a":"l%/)`%}QTg","b":11278,"name":69661,"prop":"I4Egqy`Y<e"},
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
                id: 'b9aa598a-8353-4260-a8e4-e598347328ac',
                commonId: 'b9605438-4282-471d-b5eb-47a8deaaa7db',
                langId: 'da219881-90f4-45a3-904a-4358fe6baba3',
                attachableModel: 'yugzy4q4qxvruwml8p7l1de2l6v1ibb1f1zwhji6xs8ptgszq0b27e0bb7jo1g54oapuuz62yf7',
                attachableId: '3b2d0733-186d-4dd5-a051-62bf3af1ab18',
                familyId: 'bd5e51b8-aac8-46eb-8fdd-f8bec580deeb',
                sort: 726253,
                alt: 'e2t9xng2u8x0qr0cugu9jwm3gfkn92cr25bv3arhofcw2vzqe3k893ginavijdgq3sc7vkl3ykj9foyaxd8mba6hxmpdozdwb1jwdipoa1gywjd9c97vx6ap79h24shvlbkowx4nlln423m3yuqoai99uaeh6eppw6p4tsx755qoi21ljih7xwdkhy7cwpelz20ux2txxmcj9wzxll7pp36vjnteoodxz2dgzebla1e5zgo6suxrrb26777j9ir',
                title: 'v30q24108urlm2z7wvvj9mzmb42uxtin64lnmexti6web1z1kvij7svb14y57n1adyc0lj1mttstzaj93mmxwozz402wbwa6uedgz2cax43b5hr0kcauafhth57fum3dm6qfumeeae6lq5pexuqnrmwglzda126dzyfir9ginicqjaro4nbsdjyfrmo1vdz75jw9p82wdjjrpxwmkkann0okjpt6djpgjjupc41kymla0jg3123zr76d6h1g3uy',
                description: 'Sed dolor ipsa voluptas quaerat fugiat quia debitis illo sit. Aut aut recusandae nam accusantium unde illo accusamus accusamus non. Eum nemo nobis. Iure ea saepe tempora excepturi repellat harum ab. Dolores placeat libero est laudantium qui voluptatem. Aut consequuntur vitae.',
                excerpt: 'Dolores odit voluptatem doloremque qui quo. Adipisci rerum et provident. Eos et odio in at aut molestias.',
                name: '0tkbhb2sy18kim2ukn7sdhc58un2hbmdxi2i8bdn71r6v5cy8jpw8cqitecc82sqnepc61r1lo4bsi8l8qhkewns54vd60iahziaa5txzdrp96kmmyg44vo22jjnkaa7k2wmdo4mgzou5rmly4mil7n4wmrpzrfjarcp4r4eopry7d87ke92o57gqry5r7v8aw0airtmkckwstg1c62ubckexfchxur1ehbwcc09mgfhn2g5pmn5fydg3kuqc28',
                pathname: 'y5aryhyizcw3fo58slthnaz8f7ovk2n9vbamjubwmgqhr0k2jm5kevrd7yil9uzk0lykoqqlb5hojdfvxz9z70046je5jg29q9wca2npo85batso1qsytd2ktc7iw19llgi4f7omxbgtwpp8b98o5tmf2mt3z1l6armzffwazmgorxsr1acl20x94ezsvqibe0wj2b0tsclw4pnm2o4qnwgqmm162f32w21o4ty1gnwwjjj6gqn3lleks15lakkg8pxur89u4sdc03ge3eypel4anh3oryhtf0n3swym4p930shqb054ftnnqehgksg35n2eeclir3sfamow0qn52i0cqyt0gn7qfp5reqnufb6fyrg2p3t7cy4zupkmn03thk51vexkzz2t1ddam743fqv0ywqazngq4qip3au0202ebkn29ejkedhy3j6e71xc1qi99w2top5oyrroe99u5py9dnojbnr3by7fs4albvy62rlrwr0tezl47g238k5mfohtegqbx3x05divrm4ezghw6xb9haqbpsi3l8w0eobifw84wwzkndcxruj6kt0khgqt8arrw6atimvlyjjftujyeapnv9zxisqdp9yu5la9etlu3bmdfwonkhl7hxahbetntn4egemu9rbl7bsi1dg75jbi2q79ytclwma2ndv13ukpjr7qwwalt98ndbjb3xuuz9cyhntkt6w4q9huhvjtmkucum1795dcoa7wjnrdu8cv23j6bo5hqo2ubrleloy9biawwyn8nz6badlci5qhk75xtf7wphit6zwaixxlgsz7yn3n6tbupebz0zdquw61yv22svoo5h1ocn6eo1j5sntlbb1orxhs2arzzkwdfqpbpun4wxbubmzshcdi2m7nw0wnw3sipj5k6luyegt9rm57k7wle1qb2zl78rz4ixn0syll6jvptkjssuq69ack8pi5zjc52ufnvhsn1xp4px4rj5539e5m7jwmy1bnax7x4k9qqebc7e8at2dv',
                filename: 'u92hnxx6scklrjojqvojs26gmp1n874mxn831uk084bvfqjjt4e03z9cfs2sywq8mznrtqj5n65l243mz4u9tljaakdeffnzz7lqeyilka8tle7z8xiudu06j6e3zysf6lzznny8awcvb0r1o62gz54dfc5neufi2oslbf6xyarg83u4olj0b8ykj1gh3tu5lc2bhupv8hr9kniqopb1tbqeek1jj6ej6izigxuhpjcbv2u44s1cg07bwyojd65',
                url: 'nldmphzcx8tnlmq2ihadtwkqzqtq5w655jccsdiiuek0ikfp3v89r3yuhx6w6djanpgn629r49e8qypndcr7riz8ukjm1bvdfm8vm40kgh5oifn1hsz6ytce38chmf6gll8rkawwjm16jjqnvtwnktyls9tfcc5ph70a5qet5jqiwkwjnefmkv30iz31zxxg8n7qs5noml5es8z4jv99o6y4ryyzls6wgtvxullapgtrn5hyrrvm55jcvdx80aadsl88yks2l9bnlzy2cetxpp4t8e455oih1cxu4zyoag2no49hk8liywj943ghdas5nq19sy7b41zn4og2qy0qhhr5bhhm4pj6obf8cs01n8isxob64y4hgmguzpbzgcv4vx69uotut4925lb8t23fpn2n4l7383xqtsbt7nuxo7hut6cpt8ytax66ugnhw04jrjdcc5jnily1xyt4icgy15aaow988ta6n3j9f4id6o307d2b0i380twq5vstsw8jw150qz7tfuiavzasevqeix4qsi4xf8qqgpbkfz6mk44n20on44hqzda7h43gr9d4yny2htwkk89mbn708uakb7gkt1tgnm6y9zejw21t82fjxz9605b6t43phglmoi5birgfrwluqqt5ckhnv0xgb9g3ctr2hswq6axzrarff88zu4438wlstgp3rexb3bxp2oa770qv6nuylv9npsunulszm8a4sme3hdua411fh67w2lzuvpv47k025kjvdre5pi4e691ig8aq8dq5271li9oxax6mcp9fb6ar19ik1jrcot6y1719ijl67hdj0lu2twb142ju7zitjsp2mo70chuv9povgd20ji70lcn0g0nlsqabpqm8fx5z1k2wsruhcj4et06fk8xo3km9rxgnmowh7dvohhbklt0jolza3m6smprecwsh9y4s01nqfr9a03xd888uwn5vfgf50v2x7j4oh96dp2rj90rji8x0ee0xaqpuz8gzgl8p8xbmohvi',
                mime: 'aphqin9jt0s0mnr5ffourgotygas48qteom5dems0sok8updwy',
                extension: 'z3hd9iwkeonuzzenjdato1cdeo7oo602ayjrek9dbyhnbhszsk',
                width: 508345,
                height: 529578,
                libraryId: '8d61747c-321d-4ad6-bdc5-f71f262778cf',
                libraryFilename: 'kql03kjsmigjll2ln2e0pozmnvg6k1l3ig1c0t5khh6ivthf5irehgpubj7x96rg2m4f6ukev3czd1xeo4pnc0r23oxihwyjvyl5elz9m2mvgch3m59xfsouxx2fbth51thre6u2hxbvrl199oaqr4rt3sgdfhwbfb8cw6gh9uevsw8ih6g398zmrdpuew9skbie4waq2tnw9nqcucki61vo1xpx0eh4jxmoj1h9kookveggyh1pms1ag84xnot',
                data: {"foo":"Kc\\]p=RXCQ","bar":83020,"bike":"M'B$&Uxz{s","a":15450,"b":"|VP7qf}=Wi","name":95660,"prop":"r9j|Eka3a/"},
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
                id: 'v2usb3wo95698l2d38s7oxcih5swavalz24qx',
                commonId: 'aa83d056-20ac-4bb8-a4c0-14f98c490c9b',
                langId: 'b06f9d92-cdc5-4790-9629-1318a7b0da48',
                attachableModel: '00t1wb44lbfmo6ai8fcafvigzum7zdi7a07x5qzp2me8bln08jba0qd7wgg7g5bu2ayu3ewaj1f',
                attachableId: '3b317c93-dd6e-47e5-9b7a-573de1275c78',
                familyId: '1b37f5ed-3155-4d0e-aa19-cf1127415ecf',
                sort: 388401,
                alt: 'n87p3v684u6v6gsja4gxpdj5wt2vl5cx8h3tpd6qfszcogd6edgxtbfdsykcjbnvzk6ailvxodskyu260ad3ksxexawd6qm9qa1g9y2kkstrpwcq4gn4tg8lcqtc2m3frdm3ppeimlj4fmflwyllmj0ypsen9zakqmvlgjy67zcckebvw3bflsn6rscwo1vombuv18xb682dlqyz2zqy1yu6gv1mswqf1uxrorwjbooik9taeksfj9lroy97a7w',
                title: 'ylqcebs7q53nsjh8ryk9kdfpm5asnqc6o5xd5yk72jb5xbs4yzuopkg8cnhzzq5hlhzfcbdhlgr7myjbpjlvr3k8jl2iaa2liwqipm1t4c2685yx1mdl9ql0hkywy3alfgznph4c5xru5sklxiacqn8novgtqsr6dkg6k3oecht61n5jhjesg635uu6i0mw0hxp1k52mz9yx25s4oi1b0g3p9hr0vherdp9un7ylw0fkew6voww7c32qa2m1us4',
                description: 'Sit explicabo dolor laboriosam laudantium. Itaque a ex. Ex tempora numquam labore et id totam.',
                excerpt: 'Architecto consequatur facilis cum ipsa omnis molestiae qui dolor. Non labore atque. Aliquid sit earum omnis.',
                name: 'fz2bdc1dwsd0goz2p7yk4kw0ozeqmzmbbayv6ejqixojewwqy5qmj7elzeb4elialc93ybenfp888j1i7axafbj0b96cbfg7rb0s8uib03b4dptj16w4ykht1nrzytfqxz956qabq7x2oz6fa605upllnabk2n1oxpt8py4f3oqtz15ixmygfr4efn0cug44emvmp13y0azx1yrw5v22ox22ptmav6k8mek521jm0nzhqak9d0dkavdtur8njew',
                pathname: 'ycn1fhylw9j266a99uz5con47g2byx50l4qq71mqxkid874boeqple9n8pit6azutsojtrpkr2ovn2stciwzctl3hlfoi2b4kfmzmc3lmhby12crfcbv05k7wjxobn4k0gd5pqzpzzwoshg407cfllkmxwhhjt689t242i8u4fm8u6lc3drs1di21mzvhs6nxfbxukn4n7lar42skov8cn4m1s91hsjh1xpj6wskfsfmeyka3srmx9hd1frry17cnvlo2mnakaifj1p8rnainh3ahz97ajsf1rl48e5nbxoikqhlw8w5gr1wdnpu15mghltkvokck14a2df7p28mm77ataz7lhtze7al34t5v5nspbrlpv8n1hdzwowtlvt7pc9kem82wtdjmez990o69h631pgvkv64whwshh6ndfwbkkxq7boaky86p3w1ntysachcebvbbvar47s4z1p4pqzj3749ds5z52xqui8gnfvuu2l9e8oc7fthk82xzo5fn579w9hxsc7xemv9ke4en8m0qofs250b4jf7jqmzuz4cv4yn0ii5pf79oho3zlpznjxgzum3nnv8277kys4t3q9cjaq22o8bged1pzjndlcw55t0fmhba0wro6sbzxbibgmwc43tmph17c0vthul6cap304311enwn7ottvtwuav8wfv75gnuv2lly9yodtuls1adgml39f7230834w83c20hze83efia43kchphq8t2n0vu9bilq0nhbm5pz1gaaqfmzp2fektsr05buhm0aj4m3v54ki7lyg3t2ssdz9vw32z8moy689fbtaa6z58c5si4ygyvb88d1gvhqekaosbtuxud4hcyfpur2u88h3gmwmx5urz960tu4zw222se49o435h3k7v8c69hv6j5gdlv7znjrb60gfrq30948g2uy6cy4uw7l9n0yllerlcfvo41jwrvatint2l0g13p9sd6vw10ie20auc8ki37p1jvz7lb439qj6c0nlfz566m',
                filename: 'rgztit1cqsufgb0kxyc19cwhyo6f3t1cnbpnetiegpafdwotw9m1p3ib2h7tgxgtzpkjcijnu61s2o4wm95ud07j2yj9v722oxhvxp2yz6xky6pejgb0r568framk2f5tj0lcwokobop91dz645e5sjn8616stmivng41rc3hlpewbw2e08qemoz9g1x3f7uqcuax5ao4g16rcu3rgpsaiwgrm9u5mgxggn4kni4d5qolk21ovt4g1rvy723h4x',
                url: 'fm2l77ugz58efz777du5ximmn0pr1escq8h3ew6fdp64bvgjf88cl6ekf7k5qkxg6zxc9p3fj2abbflqitatz8uuqukpx01fxiaghw0smf4dxfkwaqcr9mjdx6q662oyowitnni58wvs40iba096rt7kg0z4egqnxkty2t8ia5cnjm6u1m7nx3e7q0mta3b99dq6hpugxhsdd7h7oawrwo5b999x2yaztmprcn3fdl8s0n4wkp3suzxsr8jrcr7unh5q809mudyf2z26shcc130340tlfqilyu22eo1mac00er2w2mlglwphp3bp8zf0fotq48osb324digb8urokj47ms0c74s4r2u8p8rmaum9wi9ukaqatbqrm1vg0rlqwobvjhd0eavzyqopwa899rmhcr9rmc4su868uogkycd1n9eytqrqnoz9266sxdpfor3wyme8q9ksde9304atma1fym6tccv6iycxzfdjxytedoeh1ywfchgottp8fqdj30n1criwxwcdvvuz3r18s4jjyoisfmku5s58d11s9fdchmi6vu4f244enfj612tosruunoo83ajd5pdciux5aq4m4eerjjy6lk36cjiowuaodkrudoogyp61pm1q5xpkkntw36776fkvxmlxmdw4qufl3kszsw1gcy5k4e29pzptdk71qxndf9rvvlgcr3acx09kz4u8lvvfyfbycwydzons7u3xvwj3d4ibfoewfnt9qz7mmos7gp1qw06vunl2py5v9ct7ya76q4qrpwmja3uweei09saky92gi2z100bkarp5y3trwgvoy7g6imhszl5yicvprhumqdwv95manc3hxl8msw5da3oixh7osve67gagt1qfmrtgyktk1s3swawt8fbokbaxouijmwn717wt5fa5lg2k4pt2stgpc8wx9k16sz4oa7y8y5st8rhn0harbnvyllwvosgq76knj69x39cuj88kejf1798fq8u78c9vedspaqdgjizt7vqx',
                mime: 'eo5tekx458pz4hcug6a35yk5173txyd0vapqaj45pn4oy259rm',
                extension: 'o00ct7xm8ceseuretjvbpktbe7kjk98eoi1kl6yhb6jeqgoe06',
                size: 2099423760,
                width: 612987,
                height: 309756,
                libraryId: 'ff68dfbf-cd2c-4e03-82cf-335a91d7e022',
                libraryFilename: 'qiviwha38n4y3vr3azr5o8fmobw9v92id82mj2resw9okalk47ui8wklk4ii8q9vnr8yabeyonog38nd8rp53d1v2trjs6vcum5m6r4engtr3vxajkd0w9f44t0h7c9n4ih0ztub5fu2xalqxghywutfsx9urfq1dr3af87ie55xzu0dxedb2k18jdiobv3y4pzhbb2arkczwuqq6shfp8zpi3hy8pn1ifjl3w7l0o11fe633nwl5xsyg23nyav',
                data: {"foo":52435,"bar":28430,"bike":"2_G|\\:e}!0","a":61372,"b":2398,"name":"[n?5AZ4Bon","prop":37472},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd5b9f979-974e-42e1-a66b-07e6fdf2e696',
                commonId: 'hhj7jl9gu1ddjzpvt3f9002y8z6r0ncdhszvz',
                langId: 'd6c66fb0-8406-467d-a70b-ce02ec5e1dae',
                attachableModel: '645b5be0rndi0ikx09qvc7ry9q67r4bvld05hmaxg26m7ouz7al76avg90i4cchhjfwy2iqypxn',
                attachableId: '8c845411-739b-4f46-bb8a-2789fd6b54ab',
                familyId: '049120c3-b0a1-447d-a747-6720dab1fd6b',
                sort: 115808,
                alt: 'qc2s6il404j354ejfk1l011gyqp71d3wyh8266tjgftlfdb4v7qbmm28zk6fx3ax70qzgyfkkqwwqh6u1o8gzo2yxvdw3zobih1vtt6kh6cguydza8t3ci9m3zlpbtdq8ie5lwws290anwm9goxb48n6o19vbuusogubahcmxdojjsbx26bckz0m58ll23unmphtu4ag7qegvsvgmzw1lvtta1kgzyv2nvxxt2xbgzlwikrl4zu8s514rem6gro',
                title: '8z81tlsceol20yefrazwl6sqlgn2crmzqhbjzy7i1gz2vswdnughpi6o4sx7m388hqyr9ipe7zjkq248zhrg3b2e38m9poajh0zo3xhyy8a2dga8glvvv78f0al43n3rd6soyw9mllmf7li3g25wk35182ygl76mbzevx6yhlcb3m133ze1gom4ojapm22l9s3q1x4yg28voxmps02uvbhtyl5jn4krjg0xx3craz83geqyyxt7go7cl4dv309m',
                description: 'Eos nisi quia voluptas facilis aliquid voluptatem. Accusamus sequi non aperiam ad temporibus qui corrupti aut. Sunt debitis ut vero qui. Dolor sint dolores consectetur voluptas eveniet corrupti aspernatur quae. Quis aut eligendi dolores.',
                excerpt: 'Perferendis aspernatur cumque esse perspiciatis earum expedita molestias in. Voluptas dolorem praesentium repellat. Odit consequatur excepturi tempora quia. Veniam inventore ea nihil aut praesentium praesentium rerum.',
                name: 'gt8lxjdxlacw3l7thon338xtchwjllb9x15qix3p4tn0oq3hf4dj1k7x6ytu5twlb7m8ucwbq8tev42cec8odshghqpny99ee6e9e75dv2usjxofofld1yjv9mli4ef80zprxyyq115u67fuln1tu977lpqzja4ab5s9lw1awb1ip9ipmthoevfadgnm0plegb9ltrbaf20dx3806io0cnjgmnvl5su6u9xkiuvh2jfs1tizoe8g8cc77xje37u',
                pathname: 'u2kjkgx4tqdvl5uun0dltlc9gz9qwc4h5goo336ec73nohhxwuq3ezxo391zqvhef052fozwe5427o2t5foy4iowfm7dg1c8uhxabmb2kkat01pkvfimdm08dvuozga3biyxuvvvbp7xsvmht8fg0xp5bb3c7sdkvp4qh15141i7rxz2flc3hg242iz1azns4n6zgxev2mbtzaktoistzvco811b7izy6a3x7xt8ggr3tfq4d5e0b5hn7iy9wux8akbiw6659oflcb2z0qgndper3p0bpu3i8g2yld7flslvcffzvdu1avcrcwogpb01wwblm3d44j7l3coko6guhq0dqvk22g91c0w1879de6k1kgisrr947mlwvj3qcdshzd92s7h6dfd9ep1axt8gjqq4ldejgr3t7quxspvk7xn9uguzeq0t96uhjktgydilfyvu2yjd42qalh6senrljatws076xp77ej5gn2hzc6cer7qkofyt0mkwflgydw1e3ftwf8nx4v67fsdhggjkk6pwxt656d9z1b8cyzkuwfy6le11066wr5rmmy9ot3lnqbx4z80cm64rre8hli4c7mu8xknm8uukm4vyzjxtv8aai4eecpndmngeonhpn2yppkll2jl7wwo517cjhvzg1y0gsbbsuh6xr9gqnazl30qpbi8daw1k2cwx6nc651fadlb10d7ttuq224xtbnhro8u5rj27hbs7c9k2xq9cfz1b7nheroq0ta6giw6t0hvla004r6z5on5coowbe9jjnbwgiitfaf784gsi6ej4v8way66dxb2goilh066jhjuq2sfk31b5qttpdzw4fwupzbdmwpqa7nlw1h8kgt6p7m8l14g2pd5hdnulpovo96c4qvcyrdac1rc33mhc730vpjynebcz6brw45b2lug4vidz5n9dky1tbviilfd7i3pahorapanfm0c8web3bcaeqjvo432sgo6cqspwew4aztyfuz5l6l328ytp0j6j5bbr',
                filename: 'ue9g7pcjme8td0uivm2evm0vqu6il15ebbfb2am2rcphz0kik5zg3nlxdbcjiz5x5q38yiiu40cjfm9svj9skr3wgyc9ociaj95ryrbo5fwfixgyt65amc4q7g0b8wd7flqkvl2f9mymnlydh38ncg8touilvhoqoajs12mgdvue7yk9byhqbn3w3voc9fozfj9sktwalss64dvvohq60rsu7ko3wzkc36x5ijgfnwor1el987443dvffdeva13',
                url: 'jygm2jrr1qq1kwzqv049v08a7wkw8nf9owjcv2m58mgtakddwj0yn48mm82fb0fy27nuqrd4i38hihjqq08w48xxqumaaw3yd7nwkbgnijc0y98wvxjebh5skhjorefb6tahea3kywpqy4kpei8ygsojwehekvt9ytmrcenxlm67kyd9izcaix95wu1nsihfrsy244j0phuz6gk6bsqhmv6rpp689417f0qxgbacaug1a4tth6coxs0t40keu0d375w40h1yvihjgni9zfw5h36metj6g46d5xs6x5ak08tju4wosfys84fs0becwx01gzda0i6ant918a3t2dktdu6jxnf7frstyzphw6x3nq7syo8zqp4u719wvluidtlehvonmu6rscwtjwx186i8i7lsznb8puwdk3cdn90dkiqg3msdanyan30hd6ioqidh67grw2iyl5feghk0etp1fddjm69mz8yx9g6olbofvc8xmmec35qabn1c8ym7595vkrk4q4a3axsyol4jovopysy65nmfap9p79b6ihb8nzpjhkfg58f78pdqk9wr2ttvad14hhltzec4859bw3fqd98zyytheujheyplyzbce072jo34qs1d1fm1g56nqq4dlbcp826t6stvcg5fv0j8ck0eojzjei0ietmxal1o0n6znpwlj4vthqc7rbov46i2ej3q8ppliimh42wb096yp8osgq9uiepmceii4h515cebuzvqi695o3chfetaqb90j3p63ift5v7wwfkkuwuq2lkavxuh2f3frlihi5qi0lavi4miqchaz7fq1myhpyk7kvh3f4be3kqqpae8ncqlcopagh1ak5j7qqu0u312gpmuf4ei6iy6i59dn7ax3s7qe7vkh0gttep7jrb1mo3too421mqqedd3v6zukz8xj1cjbfg7s05dcwzxyq7t35hudlpysxr28nzmiu4zr2wedm3aeeb69p13zqqw7aimpr3wmxz73p95nxvaz2wzd6sh',
                mime: 'rinyay7z3n4bxphfpg816lw1k5b2mgie0m3w4pez3k8rf6s5w3',
                extension: '9b0wq3t4ei8ep575uokvxu01z048uk65hx4ghndwfevw3n66l7',
                size: 8393645328,
                width: 255969,
                height: 984333,
                libraryId: '40485b23-00cb-498c-976c-6cb27a138815',
                libraryFilename: 'sr0fr71slwewv75f7pr5pix08visbg045j28v4j11oqyqzfpunuk0fulc4mp7yicfrxlos2c20akchiqefdpxsa3fr2dldwbenoldw4e6os9s154sroc7k3v1vawq4faojjqkav8n3p3rts6n78kjjunznu114tld54abpvz548r2gi2rlffqsezlv1hbp3slw8a9d2atmihj7sxdz846yai2s4sg3g3xyjfcw7ruadgqh5pvnrtqyf5zkhry1s',
                data: {"foo":65046,"bar":"L+\\]&$yN}O","bike":"{A,d0\\(VX>","a":"@U#,kbhFpG","b":"BJSf(*7S6f","name":"dV\\'fM_CK#","prop":"\\_j4Y[(^Qz"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5cfb3f1e-9032-488b-bc45-e7032acb650b',
                commonId: 'fc56aacf-f7f3-445f-a570-4be97560bef4',
                langId: '46sua64awunhql2vcli7vl8s7b15vm1cgulie',
                attachableModel: 'g8f6393bvmgjwb5iokkqlivi2tr6xjuqjetmjhnplaozlcan07tetmc62gkv9qv5tu3v86a1ksj',
                attachableId: '68479a54-5f9d-4769-b6b5-dbd9385a2d5c',
                familyId: '2d128796-ccaf-4f2f-89bb-cee9cf8ac16b',
                sort: 312352,
                alt: '2qg9q0s7txkkc1rf9739y49ews117dkgk1rz55e67yntots63i0golp6txw30yhw7yhj1f07jcngz9o0l5b7gxh9le9uvf3afb7lgk0m03qk9w7m7r2a679fp0nhvnrj0f6fh88h9izvyx06c7dgyhkypp3pzze21dwyauaem8d7j7c5qvygoxd4mi4dnux7h9088rbll2zbizsvjeav0vkj1a9ynzlkwdp1wwn8woddd31oeviw15gdueiwan0',
                title: 'o328o651l1z6k9816jlt4xt09pm2kxw7upeug8sjz9ryaszh7e94mp5uo4rtd6csg2huj7uj958hkpl6zuxawh714qke5qobtrn71xru2rr6vmle7m250wqdj14ka75ka4936dmk17wwfs1qe26f42evxswi5fmulaoxhs6fpqt9wsm07ujinwrbthczk3qerus6wz7acdh35kyaywg9wshomhonf5xycc1om8dzuo8tjixcxqopvdff1trz0ng',
                description: 'Vel aut voluptatem minima officiis consequatur. Ducimus placeat alias consequatur sit numquam enim eum. Velit eos adipisci ea error labore.',
                excerpt: 'Qui suscipit ratione ut. Omnis at sit nostrum. Illum quasi cum rem quis fuga laboriosam animi rerum. Ad ut ea fugiat facere tempore debitis similique consequatur expedita. Earum qui tempore et quod. Nihil ex ut harum exercitationem sunt.',
                name: 'wg6u03khauwqkktnejogrtileq5bx518ocpo824kax0vba4ii2dng4gdcfif1fy4v33qxq400kolv26dg5r24gkuem0swo9tnzuidf67s2jhiyu27e06w81393p2xudvk24l5bmpobxtnmvcbdmvs0bwqm05wyfvul14133l7jhjg6zjedbp2xpdya9w0zzhb8mtm48iooptwc2o0vhxfsy7u2ae4lrqkecc0kqp1d8mdq6j5gox8w085tueepi',
                pathname: '5lc0c3d3pacotu8s4kdbbx6ajb76fd1i2xr2g5fjl19vdy7aqd48u86m60030l4j9kk56e5vygl589rql4zllg7gi5dp21ji3kj835lo9m5mduiion083jvid1cli5gtlncnawluhzad0f76pczrpmn7agbukyoapcobqsysfv6sdxoxeo5jsx4r24km12j90z4hyuehcktg2lz4mvjshz1bujsnj7xruzak1pj0aqptaaogc7ptiu3bs4hjuwm9rx98k3zxuocs46icp8iqqn4f932q3ok3v6co824s8h8810tgpmqfnmv4taohbkedfdw6xpvusykau1js0jst441kgfucp2cbjbyxt1c1sqnvr9k04gje74kz8ii46humx0qvtibpnvxih5jo2d0b07lt9h1tu66fy4n2fztkt74kc3g9d0qm0tyqvw7jw407vp9ld7j2vuxq9vludqfs9yp18l9piy2w0ujs6kde3pfk8f9t7cpd1hvvmaz2wdakcnh92hnr2ctn2yyr5vjpbqjb88a6bxjs403mlaa37fscv60tirjh6j1f30twgzkeyaha37uk0wss3zlv7tw8qql5ai56idudhtvm5dtu1yrl9czsrnzv4pqqonyg59gwknl5ss727f2ge5j24f72xksugno5s7y44c9ypc7mvrbaothkxiywxhgcez6hguve27cq0vm3in5mbgfawwcox76snlar0a0le9t3o7o8x6gyezwrzyfgfdpnrytgp4mlovhbs8lfuutmn44iikjuwskjy7haovhvjhovjc3rkheh6jh4u19rbkcw8kp6jdamhrj0r87dz4lh2yyhd73gb4kpukcb86rj79motlj87rjhkc4ebu2mm9ba30japbumdpwofmvf05cugueydcfs1ojbppdp730c62m1i7to9r5r0g29995uf48d5wzyt2uk9ig3naju4os35v0uao1mcs82jfm7s4imsaxrkezxv86tzq1y2ldevpdbv0i90fns',
                filename: 'cqk7mabuyqirdbhaf0u5mz60dje9ew2yqrupzttkinpg0sdnrx6zdxh1epre35ro12gst5kplg0r5lpobxnwo6wjpsewiksa5s7nzy4wvns9bk6b7qh9qnlo5si450ntymd0j3noa1n9mxfl77f4qehddyo9t3cdh3qac4y4harm3lqlzt3b9xjdy6q8ffajjmagt3n42xcuz14wd4vezix13x78gwvgme49wlgn2izzecm61avboh7205zw6dr',
                url: '67jrvcjq7fkayfu4oy7h00vmokdh6u5qf3fa97b96ic487sf80tt4bjzyhs3t466x1d0exrr04pjvw03ub9tcj7w9etznk2hktvyew6a87mdclnvx19y84r4gofpam27ri3ve5475ly9behccyrm0871425zqk3qvhg1ex71fd7jz9iamcd2bvk8ip6w1nu0bzhp50lu84pk537quzmt3azdcu8sdk82gn7s4d5dctyltavymu1wvzsituloj0iiqwfv539l97ztvp9obdysb4alxhdiri5lq4czwvo81y89awo10j4l0e4a7x6apwtl9ktm3ptm39zlihw2k043pgppzm0jget1frjt9x6i365186b7cb0hwven1rf9efz84tfv4p7fo6jdr0zu7t61cw4duqb3v9wtrmz6hp0umeu68yqkxo4d1peeduq2ng9v8jl75fytw76eodhlib3wdyyr6tin3h6fe8ipycbokfhw3224rsiw7yzcfzjloydjb692voz8im7isk7g64ui5ltuvvgngtg7p8tjt8v8xjisjulh2tkbm1edhyn3oaq40cqqvonzdhzzvmrrv4uyqsrpsn3r1ezi9f8em0xatzfsljoj1sa3dt6r2hy97ffirntsa5sl9bsz54k7korv5zlbwgyofusvviv7dum4jthf4quigbiis02w3thrvsagqkou8716c0v17zhpzirkvl8o2rsahpkf3587kb23cvdxhyyuxiwfgd5tdwknxs1sc55ayjl61guoss854lhebijhow8bcqsak7trk4u0xrcprw0unnkc8pbi0sbh2hcbfept2xzbiu7zdg1czld5ov36usx802oni8ekqpx9e0od4qjf1dqelyzjlbstqff9j7itamp6ydan1780qewraqsfhp3n2y7jtdtrrtlmqmbypzg4ssxyvbqbzmmnut2aum7lsr9l4dl5wze3axtp2k7mvs6x88s1elmk3vikua27lffa2yft78y8k4p1935m',
                mime: 'in00suq6f5sbw0sdeuy1ywuk0gq4hewg0cfpe1qmsb1eri1rcb',
                extension: 'ra0lvo1zpxz1uvzdyewrrxr47kci24wa5pgedbkf0w0j5exztz',
                size: 1314010295,
                width: 304873,
                height: 677587,
                libraryId: '2a219269-92ea-47e5-9bff-edfe6ec1c25a',
                libraryFilename: 'aikcervmm1c5nwib6zlxx1bee9juf57tmsvj22y0ctv6zz8sisv01248pj7dnngxxuqrvp7z1nkkh42d4dlql0s6c3o1n6q645psccrlngphx7zr98ed5dxb7hhma63jxoqxno5im8dbjunuvwzmuzgb4x1sc8jnvee9awo2kbai1ngcpt0vx7fingyyy177m4hvff8sfoazksca30eoeg8dhc3wdt16flvju9xcj5c7x2llevn6znae3wl3m4e',
                data: {"foo":"o^AtZR7S4z","bar":"ozBEfpQ[,'","bike":"7&%?7y)p@.","a":"U<8N%..mI&","b":90959,"name":";EI`YGxmyT","prop":".O$%M%A.{>"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f454d958-7f12-4cad-b850-272be373ef36',
                commonId: 'b22b0c0d-c85b-4b72-8d06-a9ea52eba46e',
                langId: '851d4bbd-0fd9-40cb-897b-cfa81ce71299',
                attachableModel: 'ftmbqkrlykjmk99gpc3kly0xirbpz4h8ciwrbld47m0m8or72velayohfvk6kjj3l01fvpute07',
                attachableId: 'f685zzb37ezpzadorqynighwyvjpchfg92eh7',
                familyId: '2a5e5524-5fab-45d2-9fc3-c213214dc94c',
                sort: 833302,
                alt: 'dm0qas1hs7ukhxag27w8z98j28fg9z8gmnf3f0d1cv47tjn876s9nvaqu5d71xp8b4l4np8z3vdywv13g4ebop6yydnzeog0jr0czv2xfisroiatxy56b5nux1h8dkr8qa08ayooz5pgx1ju4ot2g1uu0xl9gg1im5aahbygz10yy8xyui0zf2wfrw4q5ndeucwr62m3fylsrln2v1x1fav4yov19ju91bg4khnupno84z0v1lsjpa4uxi2gp8c',
                title: 'puncpu85uizy2r70b2ntnlrfezyd9ipz7prlo3296j3fe3c309ml7910qegpbqdglzafh1nvt32i1s24e6cb6nyragnez3hf1p4lfvs7cxy552gdgyirnwl70nca01o8eka81gh15agknjgi2iprfz0zwhz7nlro0p4dqxzx05jaebapd3ato1avcuiiqd98p9oxnrcbqgti345vwx2gcl9747uwnm47bhvbsyf6n39wvgkfxc20sq423isaxpw',
                description: 'Et quia ut quia rem adipisci nobis quis quia. Amet et voluptatem quos minus molestias et qui. Rerum accusamus doloremque aspernatur adipisci doloremque hic nihil quisquam deleniti.',
                excerpt: 'Laborum amet pariatur molestiae possimus aliquam facilis distinctio dolorem. Repellat aut est architecto ea deleniti voluptatibus. Recusandae dignissimos qui tenetur voluptates. Quo autem ut in. Perspiciatis rem aut magni molestiae laudantium enim iure.',
                name: 'sf9dq8ifrv9mnjcnnnmae56caw8y3rijm1tn9brji7zczx8bh9lctqqx9q2njelv7uy93x8qinp22ehhnrc5e81wlv7dh7gezork8gsnv60vkyzvg7szwjzz2xcro9hhir8yqjwq9p4u637jvdksam3425v6leyh8fviltop1vgbnjlj0j3g1dbarareir4kiozszi84m7yay6j7r9mqzxfxk7ezh9n62x2ted3c71lgktss8kw28jlcos78oy0',
                pathname: 'stf684falql89uvfc66p4cx8876lxae0ee0v45358fmlrh6h6thamghghkohbzffmboqz46yiie8soy5m4exrb7en0fc7q5n9bkvlz2opm0tof1swgf23m30npai93d3wq5wvnoe3ff8d69jfnaoz70pmumx4z5kvkg3c5hpa12daewgyko7d0xh5t7auuo80bbgd52fxop96n1vspt0ddog3goia7ws1mc5c0s47w9p858ttdrntukn0axaqbhodq26e3izlspumea6peqejjvm5kmhe8orlr43q0qzyp0t4715hzl99dikx9y2qibh1ritfm6gk1pwo6xmh7tr2ft2uuu7s6vh5p36g7pxsyvs625cnpgci8mnq986vpqumt6w3ygq71z7ouqr43ny59i0q1mx4ki16mb0s86wy0o8c2l0ukq7tq148c64gtl590nn950abro20sg6fvt3srk73iczd7zuzc93pvhqw2jzfeugnowgtajuy00u58i9yiwwi1y0aaletnrbi4qm0pejqpcfatoiwsn6c8es798kpihewaa1lk20xqw8k04kyk04a084bjshvm3qf2sveatnl2dg05ahjmje6r5wf0j5g6b3koq5dzx5u6km2s0isf7evnvn5ev3023ippzqo2mgdtlh5d3z6ng1taydfh9fn5s4u6nom9syecbk4gqz7wco7v5a2zo0wbv0ewndkdprg9kuam3jn8ede60n9fz60e0pz5o8kysht30zq63lxuiiku55wh4s8jmen80e3x2m7r86guohfv8iui8juvg3k7donk0nb11dggs1mn8d0kanknrzvz2g6798r6vrprlnr0b6eeg8gq0481cxj3qturibs46lsn1qb3s674fj85iupwo1oxulw8w0mfzvwtf2lzs2bmymdoifuulp1jznf0c3qegm1zw43jhjybsnyn710pteic5g0wxlny4wvutu1pi6opwqxygrj58glt25leinpvzqked2f9t972zu',
                filename: 'lexsryrqi8jbr40draurucpzumlhv4whd98h8fnl2m6b0grorgg75ikm1v7oz7ld7qkc397myxkatqzoz0lfb0tyvckibeyh8bbtbbd0soyolt424ujcv3snz1zvly3a7jkv7sh54vw7lhln3iadd1e9770vxzcfifm6v6iofz9qf19caydukpkn77r4vulj5npd69rdxw5i8au32gvu6f3uify8iiirhmaf1081ettx2zqu4l8vw4o5yqn4z2h',
                url: 'hx7z7mdwpdvfi61zfddzav8bb25bx2isayuj0juwwywz2rngxf6tbkb2eak5mmikc8einf8sp6z2y1yi72pt0o77kso240hzhs3l7k2iuu6rotlm6qnmkdh0sxaw1yzgkepdoxkvqhxnq3tfm0prgpiv8xi44n06dagq3h4v4zpxqevck3xodggyusagvb5oo33q8070w79tqmk2lnqvlrk2zq9fq5wv2browu5t4ly4sb4gu4uf3au7sqqhnb3y3n84c4mtfdfy7jz996wnc18qn64047tkexi09ilo38g6ttodgub66arb39mdv8rl6locnzp6jpzus2s6txtu7dwwm7yrdr520mhnjaivtnwrj7tyvy35q8bjvu9my1jk716rjk5kq3fhxiuau8p2dcfqvrimzozmyfxs8snm2whw5d21yu750mrch0weckcte3zg46fihudh00jqed3yq4gimffnjwca41pd2ybqodif8884eqtm63h59txen4775jtqpyh5spkm2q1l5k37kvrjq03fywvit5ege44df5us8hin62106y75ahj141hpmat1o440l4dkh1ovpc3yo1061144hcgcv892jx56q13vr0u8i9ue51eu2n8tus2bpr8v14qtp6yowc2oqjj0b32gk2vvqp2t82bt70w81kwkbb5p2m7swz7mibjivscaqeiqcthf6hlwnfux9k6f8owizt0vyesb1r6856dny7h0rs4udp5hzpcjag5hspx3lnn0b2zm931k8zspdelpjcg6nra999fvzccpusharcz6lo9erlilhu7t0kxfc8f43y9uvdt0wtwclv8l6js55qhnxyca79ifxcqxdb4ur669gu81zsv69uleqyqeh4u4stcsn829sgiux3xdual2afnotosxzvx71xl8801zcxid38b9rv4y7ro90xq1crxhmw5jp6pp8fmbb1lx5jwchk7uayzztwi89gi7evuymjrc1xvr0hrtc3as5qcpo3e7',
                mime: 'fj3xlxcvm3rqotn92s7j2oa5wawt0877h7ln6a4xlkxeihigk9',
                extension: '24fjy9ydy3esmhwxh7ij2ppsvnfjtvdapi4po1pyaca9iin8g3',
                size: 7451799257,
                width: 573352,
                height: 207049,
                libraryId: 'f5ba353e-7875-4ed2-bbd1-6da5ef81327b',
                libraryFilename: '62e0q73ss1ov6w5up2kr6aj80arzecq3sscyauzi7j9i89x3ycdat5lh53bho8qb04mbor98cyigxxchsdhvhq75j68hplmcwcs221uj8i7nu8gxjv48iebcm99rk4io268v90dq1furaldjmr05pax7ga12zkqw6irktu3iywrtv10dg5l4kww68snq93rj4q0u9m1xl45vv81ud142so7xtljwjuz6nowwaa3w9gpzy5hhz0cbl0idue9vxoj',
                data: {"foo":"!ACJ<%%UVq","bar":"tgU]8M\\s]W","bike":"FERW%H[u4+","a":"J8#rqOC\":s","b":"z1OK81cU+h","name":"T7G-(YB1!Y","prop":"2&e'X7\\E0W"},
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
                id: '6f737325-3174-4996-b4c9-ce798c63de5d',
                commonId: '04c78c40-5ae6-4990-b65e-8ffa9b26ad3d',
                langId: '130208d4-2df3-4d4d-bc7e-5906085deb81',
                attachableModel: '8vgp4btmtxp876p1hyoh2nxi9cax7kw2kdy6gq4iudbuioojee9ivhal6tac9uni1i4zv4jlu5s',
                attachableId: 'd6ac1f1f-9805-4028-ae59-884542be34c4',
                familyId: 'ynri11kecmenu1whahmsvi0yz29evskw80wid',
                sort: 854320,
                alt: 'c13ngl6bi2dxdo5dqp5s5ev1istya6qea8o49vl0hjnhmol1e34op0c2mhgpqcyz1qa1cz8n0ujz3jattbza435aextnxgtfkbox70vdghgxnxnmcfqs48jikua30sbt1sxe1ksbve7vc91z6oyo92sr7zh6tudjkx525eaaplostix17vkhwtrs61s04sc34j7ik9x6gj45q8i5h8lwjyz9dhgrlsbwe0m7xaldswblrlnfhul68xne4p5qoqq',
                title: 'chnt61apkn9onk9dkk60379b31tgn04b0kq6b6k2bqvfocind7bzkxdolqk6mwky9hxl3tnzornt70qzvfavq6bja1xeyrbnvy2qs4ci9rea0rqlz4v7n5szt4k7bxab11colbbrgsniudbuz1my1jsjk2u1p439bqouh7ua6wsixcbt8ezoekp38go105ddhygg3szjds2tcoo49p5bvdqynsckqmhj864t3rtjkel2m0pc3jj3osf2z7nraym',
                description: 'Quidem impedit deleniti animi numquam officiis. Quas animi et et qui vero occaecati consequatur temporibus. Est distinctio hic repudiandae molestiae et consequuntur perspiciatis quasi. Tempore dolorem est molestiae. Sunt et ipsa praesentium.',
                excerpt: 'Sit voluptate ipsam placeat. Non deleniti eum soluta facilis quis occaecati. Aliquam voluptatibus quam.',
                name: 'ehy2bnfr36o40vvfeiaqisyab06w51ubamrjhs2gqt9vdl4m9mitl5ob1gocw44ukbvml2rn2pil9tvoxh6rqd4d957z6eki5p38h02o9xybz9xzwn0m6wr4g6icimhwi6j1vhj8we94y1d7txybltzva1mswow5hgn8t4cnqc5vrgzjnkonyj2mik8y4pb4bz1vl2rmcocapjnce4krh7aktauwv9vrqngpxb75lunnokv83sskkpoevp1nw9h',
                pathname: 'u44hxpsq8sxnggrmup7036ml6mc7iqhkzv9jpalaaeflc3vy786yr15d63vi1qwzxmaasqco8cs4azr3o8lfp97cwohjkqcjslwaha4xi7216mvhny75so1heylim0jixfoxt325n7rc169csa15gytb6mix2cnd4arma9m0oi3t4xewadvcql6n1nnl2p1p4bmn48kckrnn8h1h5fox84cifs4oz4nhatm93v4jw9cog5xic560pyaupeil9agdqnfq5psfit0547auzw9mnixpm9u7okxo0h2eakp82pckapiscwpn10hqq2f5kbfyhmbjgviul5wlwchgqflem07n375qrl1j4w0pohkkgst3sn6kjcc4bd90p5iodxtvjr71wsr0pfp8u6ws2djt6mj9jsiuucb1ocxj1tej91wa2qlc3bjpnmvt0f93jk2kf5lvfkoy7u01n9myxphop27bzy0z6z7kxm7jmwvey5a74lvdykadj1z8vhn7lg0jnwanax6elmt39f676axu9yw5fj8mab4rqmi628h3mitwj1zumlhoj7470d37665xj66pfoi45rlgn7rmoasnay9jw39qz2raymrfu0hh16h7cm3else7xwwibv0pzva4103px8sxi3097rt0h3a5vaxne3ozcea3ntweushm6ik0do32gr2y9izwf8t4h1svnqz3k1fhrala1dadifqcgpb3vinc4dt945jrmumvg00vfgz708d7zyggpxbeoh3z1cjv4rsk2o7r18d829zxawc7dj89hwvplr3042sr794tl40xe7pkiiiqacrt7jf5dstkc8kfbhs62z17emyr7sdp1bvvg27f56cjd5bc1id5e42beor0443zglfopvgu6k0at9qcr33e5g7e5uylmics0p9lzsdnmhd4dp9kedjm1vrr5i5q2u7lzdo0fwj5l0jia991j1fn9e2jq5emcehvbz0bnn84eoa9dngs8fqwfpdez8l96jb3qjbq2zec',
                filename: 'mgmrwkaxpkdkwtmioaxzovs3yga7buc6ga18czsqwicv1zjvxbdi8sue87asq0qg749z9aoz820qg10l469o83fzv1elb327esfk9bsnpcxgt92u9ovgasduz4p9kzwhwztasewagdzu9fk3igoda44gpmp3agj0h9vc2qip7msgy54o4fq4u85tiw6lcxjf1wx4agfnxemjqvy7ypmci8nkjyazuuz57sssctx501fevashdk1q21l35pi649d',
                url: '7ijm7tp2tzqxwhmgys227ge4xnpm5cdwzducnxskcvf4clyrnmtiwhdyl3r1i1j4k2dcmy9hb7bl7w5cnybzvdhbs4jckd5en6gr97s41poy7q348w237897t04o3pr8bl55d3tom51kmn5wxqnaguwcubvqcyfffoj4azthrc3tcz5r42wzq2e8n5s26ec60h2o5dxeug72gn1j247kka80um2asmabbtq53lzbnsssrpui4753rulekidh9v4r3pf9ku0if09t1d3ywgf25xv19senfebko7kfiugngp4q6mowd4f97womt4e2glzk0a70cimra0p1h0t8mevwti1qtlex2r7m9akuhg1t46r9b59iwhqme4qzur9nyjra0iqiqhdng7e4hsgi1r9exxugcmj4sywudj1wfclgo8pxnt4zk3ecyo3szxizqidw7p49sj2ig8wceu3kzrk4tm475dkxypt23qjjafw09x2ot1yek9p826jjlcvp0vsgisfat43hw36hfonhsgrktdspo4tm15u3lfn3m6ckko73x7alddlnk2hbrtvm7bylwaca7a8pu44amkhpoyvd1ni34hlvkh1mbka7nj3bjd0044hicfkng8z2bqoqpap0jl31g0xbvfy88r5ukq9hi5r2mchs3uzb86np34yd278uozr28yer7flmsz8tslmowb96eta8k8bsaixqy92vasz8seia94ma5n4fubr3yn5qumz6ep4wv4djdwv7bagna6msusaudqxg7hfm670jb8ffmn9z12lu411zv87e7khqautcea644ifc4l14xew0mq4pwy6d9rssg0fwhjhhsmi3zckki7ycxiz6wqd32e719icsh4x74thfw5g72ljbbaj1jlh7topcurhjw5zwa859dsiursyef2jeceddeoh34eecryaevqxw0d0t90orpzwnhgcb8wpviv4bro8312t7phjz4ipyphgq7r9yj85jw9kq3m6x42sh4uld7xc8',
                mime: '02jr596xaeetkefyrsmwqrfkzceeh819gy4wkalhisohc19zsy',
                extension: 'xrg0eer5j1afg42s31gsdvfx2zrgyqc70957djpo38eerazfbo',
                size: 5239921951,
                width: 317347,
                height: 859564,
                libraryId: 'cacbe33e-a62c-47a0-a653-e7d5aca211c1',
                libraryFilename: 'bzepxysmqldrs85r2gvo0c0kvj64sqctrlaf9vdz5a0tymegvoaawosmrdd5frwv23tovme7rpwuvb5kr64t5qnh6gza2wdwc769vlyldco5jb4hl3uv5lrxq7buu9l4lj9tu59zkoyw65chy66c3xe2k5oi00e9g5ainiqbgtd4xt6jczjic8ukdh3e23w0ik3tmpmdthkjit0thzrmb9ev0fumw2qq03ks1cq6291zt982gyaftienmh57e3u',
                data: {"foo":65138,"bar":584,"bike":"GcaDxQP08r","a":71054,"b":43254,"name":"a0ElH|\"#(0","prop":2892},
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
                id: '9fde695d-d846-419d-91cc-050d3549b3bf',
                commonId: '4a4d55d4-fac5-408e-8e9f-67a0c9402d02',
                langId: 'd5aeb478-3357-4814-b7f5-ff49274cd9d9',
                attachableModel: 'nn5e7eeap8f600pxk6fpm5oe7rzzdnji3dojg3l8ppq58ax4cw6qlb5ei1efays3kjsw017pi20',
                attachableId: '579dec3c-199f-45f0-a85b-332358e5bd24',
                familyId: 'f834cc8a-17cf-4b75-ba4e-33449aaaaccf',
                sort: 942410,
                alt: '77kcbw5hng7kb3tioazspebnsiv9r4a5b1j4gr0b1r5jlloptor16qu8yr2idojwo2082ja9vyb35rzbgyngm53wpp2eqoysz8h9jce7nhrza4f8x81v16pemdljp0n19dmaysg13brvl1v5b53ul2sd97xdqj3k7toun0lumrjhl6wovocw1ndjkay36ahl36ej0rn3ef2deuklsyk7un8h1mrvvh37ui63nu8bqori6hiy22atw2aaafk63u0',
                title: '29y777ng9g839hq1hooifw6vejwq3ry9abta3ut2a64x640iz0k0el5fsmxslis75298ghpf14rp5pdz72x3ihtvswilewgy0n0vn4294po9uqpq716hbrixb03m6rrs5g8zyq096ojw77xyiy9kpujg2oa4vr2a5nlrhw9rnrtuflph1c7vky9tv5tfvh4bn7w47bbq8f6jqc1qqtu08nkq4n1bt58t6o53qxrgp3q5twck3z8v1eh2vp1q3rp',
                description: 'Sed sit inventore tempore id. Sit minus in fuga eveniet occaecati est qui illum sint. Consectetur corporis accusamus atque consequatur.',
                excerpt: 'Sed sunt quas est asperiores veritatis. Adipisci sed tempora quia quaerat expedita. Vel velit voluptatem id necessitatibus repudiandae. Eveniet ex fugiat. Accusantium velit enim inventore voluptatem officia ut autem blanditiis ut. Corporis nemo sed.',
                name: 'jyug44uet55didurbwhdqx2hziw184cwstcy7ww09s2w8yaylldc2fxsizeniiu8av21w5ejjbk0v1fds9pptzecvu74r6826smw0xi61k27muw3ir4gvpq7wnux5ihwxwr5hwvltmbe6jpf1ba3b9h800yb0gxvu2jnrjz2bytxreilq60gqprglb00yhdsf8gh4hpes4wgbig6asif5nkgknqur87j7b1qo3k0xsaqnao38u61nccncrwv45m',
                pathname: 'iubcacpfft43ucstqwpat9jih6qbqigjzomzlfqyjc606n9c0asi4o4ar4mspeab27t1vpkh6jbmzn3val7knrovbvvv1qz13j75x9x3szvughsf2iwyqztca8l8av4pvgpwbc8okf6fm25d6555zn3iu487hp9plwcd3eywmvim0p51wn6q9o6f0hxkii3htd4s9jvjf7wuvz71uhuo0b14x2sa5tz3ws9baiv5j4umgs02tg8p73v7wstukbxrahnmxnla27qt8onjldal8p99pbj9plc1lo1j0bouh5eglrb5xk29td2bqsy4fi3mbb294vk8qpv76kqz8rmvyhb8149o0uduwfgv7cow3kw7pr5xlpf69u8knwyjbhncdn0c2hx68ptjnd4vjnlfvt8rjagubireuwctfj49mn8jhgyid0s2h9wpdu3h396yfzitn1i6up5zae7ld00tontrhptruc10v8vkp5dc0iatn675346mmfc5d4c4lmljteortoqvdujq4jx7rjd60gll1v24eeleu11s4zqk9zf33p82bavduposx56dvs116s09d7bk7jl57qyd90ccev1kl0u4srwg3gg0ynz6nm4mua56buf8i7wx6tmj8bqurb7jit2azn2nro4v7shf9j2k3lu4iqanupyxwd4yn338jgtym0anmyfheip9z00ksev19chn2u2o6x6tsac6yn07yc8cnik7vbzfadduq4acwtx3sfu32mz4rr4zeqbu3gtfnxapwslqjvmwbq6eawm7btp80yf6af3uwvzrofbvftbahasglavos62twnui6rlhb9tk834y81w9elsxyk40xlgk1t9ijtg1usqsskixle9leq2y1jb90aaxsg09a4cinqqtb9zi1rejiczwqoiw5jztfyiiljro8dtgk349fpuush7jlkws36a9ngpz6xf3h7a90797jut42jd1tvdcydbq0mdoxuc2fd4ur8wwu0lsvce2xfz1fywn3pu2',
                filename: '8vzel6128l280zmre1t70wkb85h1pfdgy1anoptntvvwngw29led9jf39qnfqcynxg79cvpoyqmqr4atwrz0x33oqb0uv8fk95aw7if75hawforv83w79m6py3gnzcc1i37t24qcvyvdnpithborxhwtig40uvqfgl38834387tcgjgsom1pjphry9o2xhs3r4pobpsv5lbhnz0kqoriakixcotmtqfsgxsfy20of2vfb3mnowcsk1r052ct5eh',
                url: 'jh75lpr14xvpq91hmnivmnrgyarr6i6t0vczityj3j5rmt7ydsvxozgjy7538mcce0ds9uxsxp1siccfqns7me01c8z775x1ioh8px2094tflmcmuaut5tdwr9l6ktto2e4xfqni7ze5oh2gj2762h87h1edtdwyctthgfrcvv1px0jwy8anjiore8t3ngprsw54pf11lgpdlm5zo6f74twac0fz7vl9wkb5u3ms45fn4gtfy6g3w7fxrbhf802oewe69rqjq10iikgqwqachxl1468ujgrayk2oc2lhwfg7q05fcyg3oywhm3hyvcv1kgj5mvfzyrkzl9nazg4qvfxbnkyu4la218lce9wwdd6qoshmgosjkxpnx316m5xj0rbx6c1khmiwrsxf4kyh6nhr6toexn4ah7qikrggpaf9in44xmw3ulmqqy87qwzky3flunst11h1cfzmoson5yzfjbzth6bfbdfbnas43xdohhjclztgxft1uj6qr6aechutfxyp0jhu548k6zaijdwcgktp9h7vlfwhlxd83s9m07mrzaea9le9dpxs95wtd35r4qhkb3v6e5g107hg8l6fbbc0251wbfhgxtqr2blgmdzm9yhdd1yrdbkrz9tdxihgqumcjfr63u237mwpga7kj4dw56fjpracdj2qayv1ppnco7mtggmmbpjcmdggjkp1wnlj7yq0bh5ctlrb4gqmp06hjj6s016c7qwwp6sgbtwozhgqt0zb3ieyege2npipfod3eaixjq976xyjx8qjmlzgk2evca20i3pi4ov91konn9faxt1fd2745doms8uowlet7r9b7qn4s0x66x4rm8iqzzs0l6dk55x1t8h9folnmg2z5mgl3eb54m51w5ghiv97pf3agj0pve954xubhu9j3zleql6ygqzvnoei8bdaa4gz5ymkoi4gepgwsumes550jsp1b3vh046by84kuaix8idl43lojp6a72ro6vu0hxpnnv1zodppmir3',
                mime: 'l1qhsypy8jey2hu2t6z14eurt7ct0f8z9evssov5zw7a28nixh',
                extension: 'ymsuwbkubk6aig457nf6piqoik2prshzf21xp2nxs4x92bfu1b',
                size: 9882561939,
                width: 457581,
                height: 942420,
                libraryId: '3l01az0g8hq5hle43tgws5a93pmplhlhazxd4',
                libraryFilename: '36ppxqzjb00oc1lf71x905671gu50gyysnk57js8rdt8meojbnijxaoucrtticavz9ueuwj8i7m69eal7s933iweo3ix9quxxl2f73cgvf7bzuchvvvaveu0ztt7jutwwcg5gclxicismzsmhbqu7f0sze9el6d1f9fohyeuv1r0jhjimgvrtg6skf0hb11ncb79u9tgpsp7hnbj549lg64724bm10sodp5j7rpr7uevkh3kcllk4c4xo583fbs',
                data: {"foo":68138,"bar":44269,"bike":"<7y@WH3_k]","a":"fvEwqZSnYq","b":"c/{TA1y(ti","name":36435,"prop":"fx!UaT1`\"E"},
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
                id: '47718962-8662-4dad-a072-87a16844c8d1',
                commonId: 'bfdcdd10-c4b8-42f0-96b4-5c130473f8b4',
                langId: 'a70926be-ef0f-4111-8774-d9cec58c4f0b',
                attachableModel: 'dhiexcxx0oktucmhe6pwf9hxmmxh28zh8v05404vwy6exxi69d4nh1x2co4ua62lu77mp99bspry',
                attachableId: 'e7713cef-7019-4481-abe3-41b3c1932315',
                familyId: 'a590f7b1-4c2b-4d94-9ad0-f60b1a15af49',
                sort: 416225,
                alt: '3bfhgze1vxxct8szz7densde1s2ms3yuzutxq63r1e31xntgeor1l6bebk5w0o9p7dy87r07ldvrguii4ygpp0d2i1sa057okegi0lixk7qsh2qss8r3kv03au58p4o3btss41nr6mizg3y9il8f1mu6aiaf8z34da9odupjdc06bd8zctkd3ub869f5b13tsu4piwmoz8dnd3a3tyzdkk2pbtkt01qb2u6ifznp5t39y2vjucodh39bsjzklrz',
                title: '8dxqznkak5bg7j4wicm7fv26ydm3zhfqxm0t7ba8gmcx9eaivdygqdkm4obdui16uka7w2uyi805atnfl29dccnoqh8qlalfpjzs84lwyukisqjn21c3nte9vprnnhz9qm570tkkg2u6wwj2b6r09pae2ntgi54wytnwyiqtgqif7eay3lx6ybmh81tps464gsufi1evwmnhm9coslbx9cij8olb1gaflgvst0275igxg6d2fux4vkfzpr3qjzm',
                description: 'Voluptas consequatur a ut quidem eaque et accusantium. Odit ut repellat et. Repellendus perspiciatis harum voluptatibus ea sit omnis dolorum sed.',
                excerpt: 'Itaque dolor exercitationem autem id cum consequatur voluptatem. Illum libero qui quod iste error illum. Quos aspernatur qui. Et culpa a animi qui maxime quia qui nesciunt tenetur. Facilis dolorem eligendi officia quo quibusdam quibusdam alias. Nam at quam assumenda est laudantium fuga est deserunt a.',
                name: 'gy1sssvlag0wwf0gp60kop39bcc4g66dgeyyl36tdtowbtm1k9z9pnrnzbzuz66ezi4pcbyypx0op57ywum1je1jqc21lctpu3k9hkuu26g3n6n28cg5uqkry9kz4kdu709y5jdjyc2jrpyyuccf8ymndq5as45nnj56mlk9ebpoi4tw56i4k86km10h2wulr3izqs3nc24w4lpftua3fw6jc2chrratwoef2l6h7r886qwoy9oug1n4mloecq3',
                pathname: 'zt1ge6pxsdni4u05say3303hqj62ful25lm8op0o8axqhn5gz3fhnvqexjc1fbk95zhzcrb77ouitmju6zsl8kdre2gkb4i3u315zhv1caljeu0wds98s0ot2axmpetoyakh16d7km7eqnnpr959fb0ym7i5ubqbn0gj3evt5a1sv83xszcsa7qvn4s4z1yhtl69plwpjgdhh2nw66bbz9oshnnh7m8qdtuo5jwggg2pkrnzcf04l78pdhk9t8iavbql3hx1j70ipx6d06vlwrlxdii7phv8i9xlon5bhdxbhrcu1jhw32xwo85unw4xbgvnvwb3f9g21y5s7ksaxg41v78m6mxtm3dd95pnyzo55m34uc250dk23c4i39f1ccsgpyy45o668k1k6vpwdmsqvtuteqkshfbqekpd6pufgytjzg9db24sfdnpnk3xvytqp8dyiab0ouzob5o116am06ph1obw4zyi90q6fce3nosag44y8bbs8cqdj67szqaeqrva3n02q7efkv61w6v3jducjoq363jy429jmc88x7xxd6e8ta0vsfjlrxowsp3dg2nhjhwjk7zsclg3j5hb67n9nfl10uao8mizy66lj1gx938h72gep72k9x468fvfhlzf06lywdmn2sr76qvc1ivwl6cl2eoso0hf1y85qzfustxdmjj47lhr0yucmekcznqn0mnsxb4grtaocp6f7mup0o10tj6pdaos3ssam1v9zkzow1ysz4io2bzsdcvbmqfe5y60tz92jdlmzpzkdickqfsajowsz512bdxrslf1g37iop62wz8lt9strrkw76rotkqqem6gr3ohcoi7ce0rvo5eqzqbzj755t5wy802wp5maooyzgppwwa6fomn9chl9r96qepezwy3ad6qbasar2qusqyb1idqhr8fur3xx80x5k13kgtitvg7j7fjmff2zi5xs9ec7wbziop4u0f2n1ad6n5qibeuj83uygz8wkqeblgs5l2h8278',
                filename: 'is4gxv7nofcxi797fpp5xq2fvdkelihq2nu8m77trzp86z4bid0t6zegiihv6d89cb77nobtdq0da51cdpf9yin498dojslmt916t4gn8ag867wqhdqw4qfydo10b3q0yugi4yhckuyb0s4rclryu3rbv9z4qga4z8kxgm7sn4du6raf9dci4kkuulra1urywiik4frcm8a166d5q69bnjkvhdy02edxymqotgtc0os17xel4lzfpmkkfofqtep',
                url: 'm6bt5h5ichxg6jtbuwykifupf1jvsq9e69nrxpr14sx33lrfpa2eeuud5htc40363n7ervxujn1lbexmgecqvgmntvh43bd5ikuqcj8i8073afhytrtm099pre8hrwo3e0nocsd9eoj6ym6p0c4apt0vmxzrb5bztbb3ycy110tsafxwgwr2upj527mh11eqetsf5euqjs0l1d91v8ne9vjyqmveae3yfaisde2z198zt0pezjcjc8j9htrfckvr4w0jg1eupb3ex9h4sx21hro1ahvgutgmlwf7yjupdkg11ry06ytfl3zw7uifgahjgfuofarutqq0fkb8172ilnnj47gjnl459rjaaameu684gfdrahzfui7nz5a7g5iksq17uskqkf52rjdru1re0iaf720dgviwinomirt3ghu003k630939icta0dsene4vepgv7q3s8cib3rygvrcb2i4igxefyunvwyk9rf5c2m701ovglqytp2j5z0zrlx6gbtj5y311rlccymmut2k0hkdnvz34pr4pr6v1db93n07qve656tk1c75h041qrsjviq9vwuo2hru5mk1d76hgzq72mrux3p4q6xb2syuhpx7z2u5386b2lqww5ur4z24n58k4rv1duzepmlmrzat8vr0ia67bcziaww5mk49zhqih5hcrhk9lxrvzo1s0tlklcyezfwzmvjt6ler3zm38wjy22fgg9jt2exot6ew0toix7emjf49xca7ha2vrw8u6kbwz85kvz3kdrxlncpxg5if4o458qr8ekx63ai6wpektilq7luobmbjuefsq2d21sruhr8kbctd4j4djg3uiby9350ljns6bmo1y9ub6vm4k9re19w6pysqrdpma4tv0fuqu7vjs7e147uebp7x82gbp4wfqkfw7sfw2arwlo08ybpssx9i9pnnzvm6w81y2zs306ugt6d4ypdduwou5calqv6iku9cfnk6yfrsebadyzev1z0bwoyph3xvrjdu',
                mime: 'ahxnl17a11mfdivmel8pkbu2e9gqvx6dxzzgb8g4n4zvjmerqi',
                extension: 'ro6ibadtfjuwk2ycz32d2g1vwb90p9aibq5tpdvbuji81incjl',
                size: 6596667463,
                width: 699941,
                height: 335020,
                libraryId: '0aa86c35-e137-41d5-aa34-9836a681899f',
                libraryFilename: '6zyqdb7wvjfa7s0uvizd9akntfdj99niin9ircocvn7o52p0ja8or3v99y2r4cj3fhuvnz2h1kt2zz29kzbfh2giw47kzuab3vwmthw7he6xk5hiowro22gt2s1vztn6l9lqm1h1lp2o7re9p06fxtwa760e1jhwq8u81mn4atanuu14a3mwhqyxedcduqdfp4nn3fy9sk0znlvxt1mmbfik5wvok5oifqif93xtwox4bk0n3afj2fs85iz2new',
                data: {"foo":"kZ(Q?G\\TGM","bar":"fx3y>5e@>Z","bike":74155,"a":"_9)^R1+<CV","b":90038,"name":"h<vZO\\qc9>","prop":"jsxiNYlvUJ"},
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
                id: 'e4402d5d-1d8c-4756-ab73-af4b83f25460',
                commonId: '9c24e97c-1582-4d5b-9401-ce1667868d40',
                langId: '0e1e1d14-446f-4e7a-9f68-83f29312656d',
                attachableModel: 'qvyakjcib2njd5837sq89087csszy70q47mturp272n1v1iogk2g4s9ovq2g415upglkhaun13z',
                attachableId: '2cb1fa95-c4c2-4e23-858b-d02f6c859e5c',
                familyId: '384a85de-1a4d-4beb-b65a-0a8334e7ef88',
                sort: 5312859,
                alt: 'ytffeunp90us6s4ed5no0razj34ytlcxnslkvl16pqgobwnsnf6eq6j03qxltqeit9bsawcgowq6fs0wc1er7pqskaz4lfdg5q702k8osg3hfsog9xd2w2ad8bhae2shp4czf2vqk6kiqy161z52gq0ifit2jgeqgn69b7e4d6cpqzfem16tyavyj98uzhpgcsjssk49u0qxuy35wx6jklro55bczi65dwzcm2xx91vc8cnpba74f4pmrru6lgk',
                title: 'riljzsql3vuje8wcwytmqkzi99jxmxbocko9rpre6stv47kelaexxjsdkzarjd2ufhgm84c0966ns0f3d8y68xo0nvxtgzcml4civ4f6n85bbid44i6rdkkl83xdtzp87zvk2sekgjzywlme0yp47ehay7tgaf9o5gpcji27osd4hy0s8ec4lkgfa5lazbxxl7w0q5n8yr69b246vzt87nk6mx28fmmprsrnvqkapi0583f0fhss8yygactm4hb',
                description: 'Omnis sapiente ut possimus qui. Consequuntur doloribus omnis rerum rem non perferendis sed corrupti. Laborum nostrum laudantium fugit aperiam aut accusamus similique optio earum. Porro ad aut laboriosam. Fugiat voluptate sint ex. Quibusdam accusantium consequatur dolores iste incidunt rerum qui.',
                excerpt: 'Consequatur soluta ab iure sed nulla. Blanditiis minima rerum qui et cupiditate architecto rem maiores. Soluta quidem illum mollitia. Corrupti ipsa quia voluptatibus et. Ut nesciunt quam illo qui accusamus in a nemo ullam.',
                name: '9dc2j996ag8s6c0908jvqbmf6yxsqyhu8xkxy5wpecog16tmpmpfea5ldr11d9f2vzr0q18o4ikyq7pqx83bazri2t6494vxua4nkwr4uchzre96hut0pumbd52oalhmrhynea1djc00flppysdvu4rllsz53r1kgck5exisxdt27364qy4jijp02u8ufhlnir96p0kylz442tpy9xrnfvr52lugvvssqlg5h8q56p92rxbmr155tfc6nb6lc4b',
                pathname: 'btttpb2ckhhtou76het3pzngbmrd9ybq27329vlnm4g0pisxkgsrna0psbkxmcq68rsdde77wmnob8f97p95m6z0r3vzzrhplwrokmvnizg61u4ajjvkjwxksgnypxuowoqdnu4tf6rtnyj3anyw7a5rm2gzfnh45vutdko5rln86gwc9cfd142b2k6coot6xdoglan2gvunzpr2t3quo9a709q2mrmwdjmztivxtwecro7seo01dfxom3x0snqex9ih4mh8h46q081nuc2e2p9du08mpf4j4zjalzbmf64bj4ffhu026marmk83qe051h42g78r9h86kx8cf9yqxr0h4xi4qv96ibh0c4j77ejgkbet9iezbmy3o8sd23g4pqf4i3qzpmnl5z0j20rm2qee4lhe9075s8bugz3q9hrbt6r880ynp9r3buuhok0oc133e1njzg7o515ue9ui0hg2ydmv7jpy3qr59jmby3hkec81ht0cq3iux10trcnx8xzoqx6wrtuc04tjk3m85tozcpakmv49kj613dlwl7r8odnpuusr5jcy7l1sjgmc7e7w26izf0advzoxuklsn2rs6a5asxrx2lyfjmq7j1ga54w2l6k0jzc78esuzu3aqj9gw46ejrfdai3udotog1bu7jnnjofwn2l7m0g4zflgnk8cvhsj8tbegd08r96xoa83knrzct94rcgg1zslxu41knj3jtmmzc086epnut2359xrfp2dg0hot8628t7qfwcq69icho52srcpugtmdgrjxfmb21ut3hd3z3a9hwlp8ljs8vyk0ja0vawfl8ecrus9tupltdfyrmdaoc6c3fjtg88gq44qxb4judc5rkyecedtpkrtryjdkcjlu74l2oedrwwvtjenw8plxp16emvr8lwkd0fnlramset3lmugy3a37j7b572oqogfcd5mpb9hcknpm9k1976f69susnjh73uzim27aswr3l7phiuii6ckfz5yg1exq8o2v0i0',
                filename: 'aj5i30q7pvjumlyz16xgmjekoxsmu6j0njgucpxp86jxhpugc9d5s7wus4dh3pvqx6indwbbahcbxhe29deyxlfcfd4szwa6brirc7wk1yweux10bzn0oe35k2ih2swx9z0lvks98n5c4guz33d183wk62n1t0sljyrduxpk4kfsqeg7q7p6ki2uqmgsjjktud2lp93hjqh1gkdhyh0nrhks68lyd8s6j3bo7w8cpyo1oq2277xt8vpxmuxaehm',
                url: 'gnyytcsgg823p6et3lo6wjhuhvs136zvbbapeokvqiq4n96hhn89h8b4ouhngfmv3fx8fgd9nka46ixr2c992d32h73wqze2yw01x4uyn2tla76g6wucq7m5wk79wuow2meceehb4pdfo1u70g2tdmzgun3h3arsrywm0tntq680zzid3e5y5k4z9c7gz1li304auk9cgrzqlcf9pgy7cg0qfmvc1y05cskv301vytzs9677qzp2h5vge33mpa8kijrg5dh3taejixwio8h397r9tc846kqm49agbpo8fyvdmkwt0dwr5qv7hga4r92ihefcwjt3jeirr0ezqf2ma6wrj2wdwzdngc912zq7nbslr61ptmlb6xl2gm8i55l74ifo5tn4fp49tzqqdpa4gke6mwcjgdcfevirct2z1a1kjo7aeiaak7wkosh4lsmk743l2ggqecegu7mknmd9u289gj9gfyqnd5y1yuzd2bq0vej7pa1bepe0rozvno8k1f0rb95o0754angfthd78jloq5g1ub6w7nnm9yhgevf5gs5n3nb0wwsczru81ejq8ir9srprjgz5rj9mfgt86bj6dkkzp1z1g6i0eq77n7j35tp2h66y2ftn3ygkbsetozutkdm9tcc72w9prj459g53uukuily9x1rrweezaz9wl2umyx74q0v5rp0ypavk9t78n7t64zite0uzr1wwqi2veu0iubq494c7rwy4evv226wrq8xidospz6257bwqrxiabedixamiyf08funvwz9g6r782t5cjez1lnyjs7t8x2nr5nrwfganbkr5yxj9k8zr4q3pvxkgxmjjo30xikaad7kamx99h4xiipeddqjnfa4yf55jh6qwu65tsd5iuk5638tu33anxh28xedugicvvmklk7kawk4umkkkna4zxyxfqg2ie1up7oux3e901ow5fls07wnmun8wj5srxpc48j6vrlxx0om8pmlyy6ie9b9t3v42ty85t6jeptwy',
                mime: 'vhsi6mzebuefhx3lw2uw11v6ttdfb40owskbo6x2e3a2ri00eo',
                extension: '12hidzc526b70ycun7j0ofo1ijz1hlvwoqoszy84sg059hhwcu',
                size: 2388305591,
                width: 525637,
                height: 364156,
                libraryId: '7031b952-a701-424c-84e0-78e4c3661aec',
                libraryFilename: '28ckloa4lg0a8s58p0s3ltd5qtj2ee2nkf0npd9iruwh2i2254fkj2wh7j0sf42dwjap2ifgqxobnecs6zyixgab9wkpedhrc9h6656h3sqz6e049igqv5etjjc6odwrh6jmk7aayxioy2axnq957f5wjvxnjs1mzot2dif1zsog9rqa4bz7g0xzn8pr76cfqsl4dhygahn1waaphkz1xagkz04tltrobdg4scncx2fmn7ky4um5o8i09okwgqe',
                data: {"foo":"w$ZXh\\yhfF","bar":68306,"bike":"d_!>U4$PtF","a":69874,"b":"2>{^uw<:|`","name":"W==:(.OnT<","prop":71225},
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
                id: 'a2eb9011-02e8-4a5b-9a60-0fb509a444de',
                commonId: '7367f7d7-b069-4a6f-b317-a7cc18170bb3',
                langId: '4db61b1d-0c78-4cb4-be1c-ac8ad99c15bb',
                attachableModel: '2v1z95jxinpwemfeu8ryd9xfrggmb7d24h8aqm8qcxa731wo48hx9vwb5pvf0se6i8fxtm2yd4q',
                attachableId: '72a7778f-518b-4657-99f4-5b8eb971614a',
                familyId: '6f4ac561-9cea-4d14-8d80-0d671dabbc10',
                sort: 887477,
                alt: '5lenxec0fhwhv18brzwm9wc6s36ii48yv2i90hovqdsjs3fy08yy1cjgzcdij8wm79z7eul6dye3hjc2hnees56ez20s5mz8kfocv81rq5hxv1fdxz4y2eo8mgarajc6gx2cf2bicrrpqrgpyk514dvxrpmgqnjngy72w132dbz02f99q2z84wd8lslz0nnvsfczg5kyva6cmsv5wqtp49p8kyore5gmbk19qojsnr1ko2qob3dwfkomofsp5f7q',
                title: '7act004urjgyyvbelk8k8th86fiahwypzjdosznik2bojd4brg0jj5tmrrir3p6pz14diat6vjsyphudx85qwjp6swsprlvu8v2rnfi0k2hfs7tsaerrmt06avb1gsytci031injkbbs2nwq7dv0mmetwmylow659m8zpohddbu1b1yhy79tzi4s32ee47o6ee34kis5954k4rff4gi5rw2vhi745qlsjvd6449209juji7z886jkq1a0gnqr7z',
                description: 'Similique facere possimus et atque consequatur nobis. Natus quo officiis distinctio officiis. Natus quo consequatur labore. Quos quibusdam nobis ducimus sed aut ut explicabo. Mollitia amet expedita optio aperiam consequuntur recusandae. Cumque omnis omnis hic animi.',
                excerpt: 'Fuga qui id deleniti et animi et eligendi explicabo tenetur. Quasi dolores iure qui ut autem. Repudiandae dolorum praesentium perspiciatis quos. Itaque animi eveniet enim. Assumenda aut facilis aut ipsa. Quia sequi hic fugit ut.',
                name: '3k25yd4p5i041ys1keavuwc2ijzpc62t5dd34xsi8c435ktuxxran0yx9ewnlw7l86xpq6bg14o64d7ff62fpjaoqezsge7hrzve85mm29h73nzjwidvbfyp4yeb4wg3xz8yqbubhrsyepgcp5pcztf86i6xyen9ft32kmunbvf9mji1jpsms4x2f8f4wxgxyvxxazl61rqtmp4ctjpsvnsvr7wvrw4x1nyo0gym8vvs5twjv4iah9vndki50co',
                pathname: 'zn0yfgqxexh7ayk26zlecfm2cm5jkz97eyeim2f51ey7gc12gu509rwlvn6z2z1jglhlgk7i10bgvmp7m280gabo5h0odu0xfk7tr22g67igk1qbik6ro5i4w8dtzkmiv2h9kcjh3j9rtitxnmzwjl1rb2hzxy3asyyvtv4a920hea4r2zu1lm1cwrtzc39gv0o8tuw0597wxaufk2l0k91mxbrnq63i5wypoulrk5ayhbscz2owmph5f3ig0myy5eqoqmp0xfalnhxc9r7710mde1gehhlri7esaias0fugxh2d7xv3zfllugmuo46ui0ci8009gtd2pvg61xfh8folvg9r4kgoag88ss6fb6x3p7yyryr1cs0ekszr3vkp4i3ekwgagecab4mdpasgfnql8i0pv8bpq1d4w8p4h8uoqqo00rfrj7vb6z8ktj3a8q85o01j99g6xnhuyl3mb6s41yyhs5scjyz61v244x4fydqjk9vfwpk8zwqltwjf398o0bi0buh65v4cx2znjbs4ibu8v4ewbc8wuadocloaa8hfbzro8t3wwkq8dakgas4q7gxw04gap9rxa48pxujiiyboee376gp73e2r80vnw73zlpqib0ufbo2ure4r1r7s345z9czrsna7sjncukiwhysbxxcf4dubhrrbqg7s6gq59fc5u24rdmh261i9lneqn3yzopllz5t4xlrxkit3qu4ccc9rf3asl9ct7jx46dw3wf5wnlkvool50te5jbetvq9tgu9j3dnlem3lclpgccmxefl5k62hrcybwoopjwnd2nu2cmsevg5o3ncj8oulop96alpxh4308xh4u0f5s72ix6rqqb2ttdtycncr1d6kdouuo9kztg5ktnl0rbra029nlnmsdvq531o484p4lgtdze523n19nstk95l4zqwt4d4f2adtyh3jyxyfc7qxfaesxxw1a1t2i25h650litbudn1eqlbkiqe0v1rqds1tj0y3npq77ln7ldlc',
                filename: 'c8grxm4ygs22pf8thv6y3ukugvznwu65c6xfd5n588wq9igdsnxqr0p7pef0tz4qvuln42xbk4f4vyvuj5rcl0meprujz9yr6uvmuwpkp7ae9gwb7wv1tzzg3nxduj1o5s9otgoytf3gwom79g9szj005e6j6a1k9eufte7kqgbyabplavwtmuada996dzes6217lgm32e4q9o1c14jp4vbbs6h94659z80rpleh6979rr1f0sjcz4sqc1y9xt7',
                url: '8w7slppkyf925l5wmqsdaw91pbnk0kgnn3ey3hpc5rj57lj78kuyw5tza8l1f84a570rk3msz74684bf5vzkmfpxmzjxo12zzphgwjiypsig75n8bo4wlhma786tdss96r4rzdl09am9x3g0sfujjn3iiukkjppw8t9tqjtp8cag3vd4uoom47tqgu031djgol9qn0jfyvel6pmtagxx4sdnoz9paeo4jznwfzoahk745ruo2pi5qilo23u49ze7c895rccm17rnznmtdip0qkeowazoc3l8g6oauxjg0g0ixtv4699ju38hftvs84i3b89xcop6wtg419i4qdltb7f4qvbvf3nzocg9r0sz5exf63k2p0cf5t5epniwv38cb2cgrtranawobk1mubsjkfwq8appvrjjqzb9x4i9nwkusrlv6tuylw9ij0oqtmhvb5758nsjeqvqnvvspzk2mroclte7sopu1da8uckkr4wh56w6rlezcv289hh9jkawcdltkykuvz71m2iimg9uiugi9p5p4npnht9k4sloeqwq6jfivaxr7ja5cwtzjv690p9j4um8yvmrvlvwwn4c53vcv3pqpyf2ift7r6u64rc5femoh8289a44ayg41m589s4lddspyxj0l4lbr7todiorcurvbpkyee4xrjovcnju7p098hww87qxqk3tuu8sny1p267684u1ytsocv5yvnau2l4wq2le33sli9j6fw9a3t8bvhb5t5k4xqq9k1w5ghu3ldwhmzoz09kd23iypy6nvybxvme4rtk0qo589beof4k20ayueggk13ubul7odsa2ki6lqw05nylv9yzmf0xuy4ummihvwn6z66984559yuwrtkrczjz4rlldyzsjdwslq2ctces3bjpang0lk9ir9928mur4y60b1dqhqwfdp2a47u48onkhb3h7839dp43lar50d4cowpceb6i2pfirqy3ojjjcgz91j1t9z6l8ljuj4eq6ml5vqfmdqnqb',
                mime: 'ztirg9aqe213x8c1ug9xsmfsde72u1zu6zr0erk1usyx05i724',
                extension: 'bypbzkblplw5ytsox8odvdv7fi7hgo30oqnz6y60mw4s8qmfn7',
                size: 1632509431,
                width: 170368,
                height: 130122,
                libraryId: '46421cfc-2310-46c7-a5c0-e1b2859bdb26',
                libraryFilename: 'dym5ebk4ll48o19vra1mnh4x41imlfj1zty0ievg83tve5kmnjexazzzrlp7hiu3lktjmggxqorjf8aap6kkgd69epkc92bdy0zirbzgdfzs9eycmv0b1b3okfqj5mqunadyjlgt8410p888bijjoztvqueg6pbw94va5odu3miy41ilgbwks3b62pzla1a2eikn0ttvlgb8lfy253rl2c7ixgjyqvcq2r4z0qhvdh79pmml5wzrpf6bhhsu55u',
                data: {"foo":"R=LIzt6z{Q","bar":"[p5;uzkRX+","bike":"O'_O[MPo>E","a":"%*d`l2cz^:","b":77892,"name":315,"prop":62594},
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
                id: '21ccb350-6a65-4e60-b350-cf4af8c09068',
                commonId: '75fdc056-0691-4991-b693-9303b646d552',
                langId: '989aa708-df63-4d0b-b6e9-0d8761eb67e9',
                attachableModel: 'affb5fp89aiw9pnsrv8bjbwmyt1o3rgb86zn788z59d9xp89q2wk6q71b1tusqu6i1o49b5jatl',
                attachableId: 'a56af22a-68d5-48ff-8f17-0c847ea9f4d2',
                familyId: '6444bda1-ca14-43ac-afca-d52c0a1fd104',
                sort: 190249,
                alt: 'xqp8cqfxtrdcpq1uh6avns03ybmezsymlnnks2nntv2ux0hndnvcofhr10auqwepkbj5d6so1fe472q7rxgww6no8nv0c9bftiuoefy5x6bt0hk5zyaufrxlytf3t9eltu8ea35auh4qmb7y18xw1aiig95f3nizvu9ivkyagc5nt0iwtfu8u6zvtf3e0kbfizeno33qw5yacd2glat9nrf80umnmpzvpboqx2fqicdbldem5udfyn8dsd526r5',
                title: 'annosf7dj4n1cr4hvsnwc6ujsuqnn6k9mq3ucnadhcrj1i739llsv49zuo0z4ljd2hf3ori62r9q0lp8qv4v20y4c2p9k49gqa5oez49ejltxj8z5mqgtk7ruxue9nw3pfkmzyrmjomd0uask0cnc2p0oom5e4vcj4yghau8737iumiy77akf94ptpxskula9d10ib5m5o4k46ivi6fwijeg4y5jrf8luaw8u837ml34b4j5nurjjst4lap6ledf',
                description: 'Iusto praesentium repellendus rerum nihil aliquid voluptatem consequuntur consequatur nesciunt. Autem et et sapiente dicta aliquid autem. Impedit voluptatem hic a provident ipsam consequuntur aut aut vel. Quam quisquam minus facilis impedit.',
                excerpt: 'Qui suscipit perferendis. Velit rerum dolorem quibusdam. Perferendis asperiores ea consequatur magni qui blanditiis soluta.',
                name: 'uqcjxp3hq1kn3p73ns27kkvesb14g6qy024zetb18g0mqwbykg01ccp1e9o95k0fho6e4w5fj6tr3dr18ig4621kidfzaqzb9h4hn8zcks6692ff99r8n8n2xbq54k5n2kbvy6peh500yg4gqkrop9b2qcyftssl888qtmtmf0nd4se5a0uji7fiizw1goyl7dst9uy016ijp8n8sf54xrx6lkfh03o0ddcoycs69cg4nysfvq4o9dso49rk6kf',
                pathname: 'xth8u8o882wa7h3xm7p9at3oc4lk57c52vu2dz828um1fegfmle6xkeltb2awbglevzl9a6mdiji48dh664jcu3ykbk7acp6g9s9ozy294o9eh7tiohpnc90dc8kjj1jhsvve1ythdq6x5y5yk5hnk16bs9qs23972zixtc49mqs7wejk4tnnu10awa7xykjiolmzr000jggmy1qzcb0jlca2x168twe7kxenbiatfvu7m7czhxsj0cs9eri6je63vzhaqilthv17jswapyqs3ktzegjmemsm8alwcvmy9pnlw4cp1so3s6cma6q15s6zml2gcd2cl7a0f6u2idxeb7jzky6ggnpj2geujkynk5w4t80ze5lk0yd3amtw2nixqc4o21ndgaugl97f0ci53fhbksmlpj21yha47lwere5p6shggq832na1xk981e0nh08olqii21ffkw8yxranfzs2he3qsq6s2t318jkj2garz61sx6v8x68ecrmz1weqg5oxp1eey1o361taudn4pigwc19umxs17lb292plt7kj8zbz964bq9sj39wng2253z5hy4kqczt8mlrjfqpx2xhj0dttfs487bloxvrogi4flg91ujlgtducsv2k2jzm0bmi6bqoqottt9cl34b5kmu6n6rbyi7rkb08xlmffdvcgh0gdh3268d18s562lyvgd7g7lb9i1wazz0ll1ieha83z3trf65vjslzhqad07n4rzdyyfpcstcp4rmckllszh7dux0s4382csadilq3etv6kykkgfoln0e7golhxr5zet4tk8kc8k8cl5aehamajlu9e2a1xjyves1vvbahbxckjm14fq7gn0tongp18nj4g5fxzsv00bo3drlv9vzphgepkjf39wkz9ccul1iqbemh56o7loxmu5cjrs7bum8ro18iwkwxrwzfj5u0v3rm9ugt8v4axoaqc5xnk13jk46hztj8wbxsywtemmri5clvkbg7d2t4tddnmkj157a',
                filename: '7nuoi5t0tftlp9no7475pz2n4ez96ho9x5l3cjfzvrytm0u6xkerclewq6598pd2n1cul0udcenj2260wham4apdwh1ejtj34rqsmbmidw4vmruuzbp5yyb2l3kyezcv0rks8btb9r42aeb3ww5ouqyir8wbfxl780hb3oqfw9s610hxjlax9sb4tbadncrsn8rg32lmy5ed8ohqko97nqca5c0u1hu9tvw6ko1rrqrrpso2f0v7yh7vyr0b8su',
                url: '4005gycjd1g5prlt6p9evqk2sztcktctak0ay9si1vrxnsl5w8ebdqpn6qe6vr8g7b7drr2mvbtrvj5hj85lklimkay5wm2m8p8jqkn0vlbppy9o9krso24gd3t490vvjnl10fe993pktpx2ppzi389z16m0kqn8utunecg38f1p36gvzsk1zng67jigz1vz8sxyd0euwossnguegil6keeu3jgxvd2rvw9ft2ttgzq4xgt9y6hk67xquclwj6gtiw9a8ynsloh089udnf7w2c2l9co8ycy0ju3lv60csoc12cr1ywmv3fmq1bla1rm9jf5pu8jc1pbizhul73nugva75nez589xrfpxq8542x3dlr0vrn22kvokh80jz1zs4245x0d42bb8yjn0ry2bhu5x75i8yhwke8447xenb160yyao0hk88ya3d3mt15jlgt68mgohuc0qn17cfgw6rht48sx0f5fz0k12xobqccdt38t65hhgwpa7bjlzovugwdnymixuf78f1tojal830wnat8o74x51wxghsqax40m2gxglrx3m00es782bggxqv31mr28n5xgo6x3gpqlhniakd0110buxnnteqfl2dk31mggk9qdo89byqotna5ycbhmzg2owkkhmgtsvs6wpdzhkrsdkgby72bawt4mcxch47evkg8s4l13fekqjbgit64mpnkb72f80pc53vv4y1fqo1ypklm01sqgt0l0vty03tntgyovgr5a8kmkucdlqugp5rnaqc5vu5ceq70h8hfkbmlwjw9kxeg0ikqpr5fnx02n7k8ezrdx23ssaala9kd0gkbjr66at2sd6kcaarv77awkk2oa53whybcx8jh8nvzp001fnp5tt5mial473ggifto0z5vgh54c8jfys2b0db43e99xg9m2eakq0s0sd17w6u1a5w25zmtl8iwt2qgpk8aufud1vubrtf9lb1gdv0golwwy6iq8dit7m32r6hjmny4t0slcuu2bj47y5',
                mime: 'almbvxiyver8wbqemmlunhgl6bvtwr81y81h8a3lm3ih18avhl',
                extension: '0zbdkgc9v3ht25hurxljxgfeoi3hkm2fz8fxd1zp7ts5itp4rd',
                size: 7742056030,
                width: 312556,
                height: 297353,
                libraryId: 'aa37d742-9f74-4bcd-87cd-fa1d7b4a6b44',
                libraryFilename: 'kunipb72nkhhtgtj7q85p1pq7g19oe84tfm1h92402w5pl3a530mdwtry3ytof3iw24wiykv1bi4pt9k8xvsfiwepnsanssvpwpv1w4qp7ukoyomoxbbtbgdpop552vh1j10ife427ac3qtrtnk0ix9l9ndoej87eg9lwcsbf9vdh7f6w9mq0ey5iai59dz61crpoaawcckg76foj64ot31jiu78jzvzbjktoop25cn6lhfpplv4tiw6x1h7aqz',
                data: {"foo":"0VAyZLaDZb","bar":"Mm&@BMBuPX","bike":"x7B:B`/9ob","a":"O*1zBp+0MT","b":"McA(W`6v\"n","name":"9z29;n,^c<","prop":60022},
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
                id: '9e8cfecd-cc09-4102-861c-3ee1034b0bf9',
                commonId: '74a8820b-54cc-44ba-9888-ecbfea6d41f0',
                langId: '216ca093-79b9-4324-ba52-119bd348db09',
                attachableModel: 'pkm92mdqu9786dy6eeromipwwe0sgurf8t0k8zl1amid3f3ijwjlvkbse05tpmwat07j1v558wq',
                attachableId: '19e22a5e-bf9e-4a5d-9846-5534da7279d2',
                familyId: '4c534677-5c93-42cd-8d85-4536af5975de',
                sort: 585620,
                alt: 'i8o5wqyf9o97bk1vud4qq36kpq0gsu4spoydlq7j6gwodu5figmwkn1yciss2r2putyvqs0i7p2uqm8rc0yjdh0h90k7f8kwghjt89lvh38nfsbbou69e8il7pf0bjljcs3ibplai0li4x5jaclqpq5ehcgh1m7m5qtukdqrm9ciitwntrm9m7dv77xnaq11o3zy9lkj5w3tkp8a41cdjabiior0a8pjt2nhx4x3rcm09f5krvjqhayj8cdw1xe',
                title: 'ah5lmv4rrqad4h7zs6oizxnqe0vr1zi5mgtyhseud9ygkzcb1ofbgbitpqycsgkqf1c4n7sswga2q8zl2glmt9vrcz1usue86spexdg4v563d482ed9m5kjy3fjj6etdj2sx2a56kxolmt4dh7xl2miur188jhy1o0h6rn0yj1do19epw99wfn0uo4gkf7ztu57iysmphht7r4bkpfdh1fov58as46p9yty28abn79wsjx1cnha19fyvzg3yfjk',
                description: 'Voluptatem non qui praesentium illo ex odit aut numquam. Sint magni ratione vero sint vero repudiandae totam eius. Non ab qui id necessitatibus voluptas aspernatur iste aut molestias. Eveniet officiis velit non quia optio molestiae quas dignissimos.',
                excerpt: 'Voluptas architecto est qui maiores voluptatem officia vel sunt. A magni et nemo quis. Quis vel eius architecto perspiciatis.',
                name: 'aybfm3twve4992fmgn0drrweo0wrjny76qhb7lnlljwerfcvqs32lrkb69hz646md1mly340mdbgoavmqe3js5alpn2uuu2l864xegrwb3xgvft9vjq5a5jaam9q215wgf128vfoldzqk7h7lzmik0qujsxt6w1hbg1s2mrotlvg4amug3ez23mlsrdhq91yb17hoz7jwe0cej4iqq44rv7p8el9658j9bu72pyw4c5954iz5i7jm7a1oyn12s4d',
                pathname: 'y70g3718x0y92l0bhj0nwjsdb3hq0r86xz16jal1oxjmfy1gqru6u3vgpjffuwccq32fubgfzgkb0gt88kaix1l0tij0g4rzdn2j51d6tgd0unjd9ifzdv4pmgrs8rbqlo1pp32oggjt6e6q9wukgex2r98kfocki58znn0m86ghu29whoyl5na2unu0mmf7g41y249016ua5j0mnxcfs0sk0w468aqz4gftkabsvy1urt67tubati3gx56t8dx4zcknvjp620os4d3au84kotu8yv87qs01lt9zo19auogp48i2rcyv66pxl316agtlnzefuxvlaykam9ldlediigoernkf7girii7bj18kpnzhfslkwzvaxcagm2b18srmyguyjrirscxji7ao4zf3y9x1ijdan96l29ext1nalcjc6enb3hi5qwewgs8xmvtsagcp8s14r0tsvol8rrl10r8zu6fh5910eleeh8tmi0d8nre15kp6c0ucufwuloc29swgwzf1ugiwo4kwqjjw89aw7cs0pmo3os473o6ltt60mbxzfrv9438lffxzvvhrlj5rfsekuc9wa1cr9xsjr5vly9cnj0vp35j45lw3dqffv8u2u0dv5f0s2x8ck8m2fb64kpnjux63s68pb7qusrxoiui4qlzuxjrhwxjluyxchgriehcupfqery557obb8px74k1p38w9v6k8t6k48bhnfz3c8lk1y61i16cmzs5b82g3ewb9mxt2m5er5oy9306ojd5s8h8g0c7i8ga7wog78hoeom48wdl2vhob154bl7quiyus8skvp4j26afzu4izs2uy8almg175cwz6bmjatf02dgv5v4wtokdkmn09ssgb4445osz5mxlyhm7t5vadxctnuxaitl16ck2tabxmlftmuezld5n4ifpv6jd1916lzh7klhvluuvcfodj4b0evq0zbmzrmpsb8va12nghltix8fe2nw7ksvxv44d5xwa9ke3y98gfczv2kv83',
                filename: 'oe8qryquk2wswkripwi72urpkyw7l7fkes5guthxt6ly4kxesxo52j0ye18qf1ydlmaywr1km4cbhguwztbpnbkug70bhnu9ss36lo3gysoskqcsnl84k1hbjrljhnqbn4t6140h58tyjp2kc8uxdedxzbkrev3fp7p1dviw5gz632w62dla1x4b60mdtb06drukyotxp4eqt1qjuodaqb5ean8b8xp8wxz8seb0i97pm6jjz4nmbig1zx36u59',
                url: '9nznaxyeioff0x7xg3siv7214jf2tuqwdmingvomgauvma1s41bp2d3uihii10kiqyonsgd4x2oj3mfnjxlenk48kiwx84nwaz9vv94nwbawix3blbmhqft1nbznhcvx4r0ewktjkgnea93w9h3werl5cbbqcuix3nudpp9x9yhufwjirxsza8kk4rudzzfcjriv00jx8eshuudzk7rdzc7u2z1ruppn5a9sjpebsp0sjurszbvbepratvtkre6474prnz7ywaohxjex4dpadeuo4kk33wxz0lk4r9wtd7v6mdnw2xkwc5tb7atnzv62xrdq6ktidr08buj52vvnxlledyooo71ij630bnctg01mg0x1qvyepodfpqwbt3ab1y8hq8icfnbbeqjymuy26me84842q2i2fj5okdhq8q99axfrs0latu07p05iaj9gcy5en77lbtlk90imwo00eyxhvojp76cqs365eb24bubr2vk0pgkduz3uz3ttzjlad3gvkypjmzom086nbncmlqqcnhmcqm5lugxcchkygpcswioengqiampk0sygvqro641ogzxo1mkbg9qw1hgcvjtgvwon03n981o473smsf0vg57q3vo1f8g77hhf85z78p4uopwd0to2gd5y88pxmke8mmj2jyj87s9geynvq0rkgpqjq8rvjw6oj6d0d9cyku9kyfdx5bbjws1h3wp3130dz2xmdqz03ydybyrk1d1cxyd0t60m4gk45ct90h6ixm8rmmw3qotxgu377veqgklgzx90bl6m3ssxq0s191vnngj92bxjrmlgiiwy0gxkd0n72fggjp7ng567imz2eryrnytycsm8nc4cxa3y7fm9hofw2b1isv658rh391k4m3g2qgjdfn1btn8szqx7yoblcy55h2x3cszhcgs5p5ub6xbfrnen65enz723plgurzygs0p6co8ds5uei8jpxob0rs8e9e3u74873sq4j0lzzh8qi9n5n66oxmsy83xw',
                mime: 'h8dctxwr0fuedf08g2upuvvvvwqftusife6yesq5w0szl7d88q',
                extension: 'j46cc0ybmwt03d7adu8bakfm9hr9eejdap8unxjcuceoem75hp',
                size: 4476356189,
                width: 158173,
                height: 995249,
                libraryId: '90bb00ab-3111-4367-af8d-92a1ab98f5e1',
                libraryFilename: 'cbhgxyfotrgfgl6r9507vh5hdfrexhnxupw3z0e8sf024r0kppp0v9f8vn9ogoqriqo2553dzjsrtlyevpe0m83c0naij5boqqt57evlttgonznn5a4frsr3cvg3mlduhvyd5c057ev8dlvx4eohs4g23yqgicjg7sde039ap98nh4da6rmqyqo934hlvmgzy7useirkijknar82q3xxydyx1i3u8kb54xj3xsavp6hxllxkser9aeuqbbl8r9m',
                data: {"foo":"R0rNdfwF-l","bar":73418,"bike":14848,"a":60673,"b":61961,"name":"Mfs'tB7;\"A","prop":88344},
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
                id: '0dc2f6f9-029b-4bc0-9e40-74521466fe85',
                commonId: 'a9863f3c-fa78-4bde-a826-dc36dfa96de1',
                langId: 'dd6afbcf-4cf9-4583-8a76-e1879aabba03',
                attachableModel: 'l71j6ayvkc4wyl0ua77ptdv4i4t8w354q6fkbijdn6icuns3jamr5mc84xb1yma4hbc671hmn98',
                attachableId: 'eeba7ec6-6521-4696-9a28-5287b63f3686',
                familyId: '00106a42-90c4-4e41-a939-5426aa35caa0',
                sort: 477518,
                alt: 'l4iivfpzun0f76lcco95t5ha41ns0wwo7xa8jka3hcs7wns3stn2eqhvtjwwnnyp421xk567zobzu1zogjkhj4517h4x2y6guoy9erj6umwzu0r8gytd24m1ebhurbp1zwsb3csms2rwu8c1be8g9jv28mphyb8iv8j4qbj7h9a90mou9y1v0lpx8ahkz8od89c74t4qa1y0e71bm6t91n7kad4yfwaf9xmo8sxnyo9atgg4mejjwjv04in78qc',
                title: 'qyvoz83169w3u3eev2s3lf8y9sa74x8g1l349ei43ylp3duqgtp80x884tdud1u6ufn3vg3wkb15rex7y6i7ajagaugc1g7u1y32exc47mg62fixugc6ix0xxctbv0ve48wnmvx6k9vx5qsa8i3v4kaxwmiaql0942vrzj0nanl0pdu8pzimwccjo6247b9ok78vqzq9gdzgsmm21uly22eaviazrt9r1q8jhkoh95w8787hwdphcr4yjd0iufl',
                description: 'Amet non suscipit itaque. Magnam quia non ut. Facilis debitis magnam velit repellendus nisi voluptas voluptatum voluptatem.',
                excerpt: 'Quod molestiae incidunt tenetur sit est quidem. Sunt sint ea tempora expedita totam sed iusto. Quam nam aut eos quos dolores et iusto. Possimus quisquam voluptatem cupiditate nesciunt quia quod qui perferendis natus. Quam ut autem sunt quidem velit laudantium. Eum nemo repellendus cum iusto eos sapiente ducimus deleniti corporis.',
                name: 'js1eqn16l86uvrswt7amrtwtgooe6gstayaywjyph5us6cl0zrdjhy7sagcaq8l5y9wg2irhxvynbanfypbn9wof7b6dcy4r1g9178m0183q3rjfxkukegsfv4rse4x1yi0qdpo7xy3wsrleldrcnaafgjjljekxu4nnvgfv4ln4gvmwdt57v5mjlzbsxkov85ofj91hvsicuhzocawbil213pbaxb4pcuim5gbqoekaq85jk3ws90932jcym4o',
                pathname: 't2qcr8e6vgv28kteixf3uy0t19kjlc44gu547tmyqo7ahcfbfr5rlktau1m2n1bm71btf4jn236kpu5dqw42y1ehu2clrck6yka5wssvzptgyf1xer60ro7x60z7zvct8o9lziqikvthd9iabtxvmmn47kdbps3audhfibb02vlvkwnk231lxi42maqorgd2u278xijltwy7h0rkegrkcmdhauruitt0dyulfvdt0nbv0930g5x574pdbo557qjlhe5dvd3byx7k0gvfmcfn1n4u3y7w0n392q6vck0vug2ee4ufgutc65sg8q5k5nzjrrsh64qt5jko56vegqcgcm6p8y82mxyr9l0ug4o8g1cw04f1um20ls5suyzw70sdazk7qyki9s9rh8b2ha2ni0udkjocb2dz3400a10hlm6v1rjsydf0cyw4rvrhywgag9gu2996nsdq9eh2mujp0p1v7gyo8gikmaof8ua34ghhzd1fnxffdkldhisyqelsuaw8xgqegyph7s9owzkm7rao5cy8jl138isyvicjs6immuhm7lrzumj6hmyrsjejxoxumdlyqoqocbosjqu7539xogspjtehyiflufey5key6cv6d6mwqkcs7qroqe5f9fxgojt3o3329hdtsf1yh0jq71muw4lglekfh9b5es0itctofl8kl07j8kpwtyh2ik8tpp6w3g3ruh5hk2ka5cngb41emndcctwlalivb5h7d6wxbbc71cjzu6l1ry79e5goe55lctyxeshwk9hquauqypcrvjs22qgc50dfugoiw903qn6zngwyqf09d4hfqtdysurusvlbbvdm6tgofvld4vjtd2tky8xq3gwkyv26d69swj5i1nux7ra6kdidv322vcy0ppmrplyhck9wj6t747bkztfv6voqv2jrz9olytti9l262u93iqsruk0e68z1to2v56jwyv3vabmc7rq9d42dqkco0omj020498gwu1gajxnglugveosossbsn',
                filename: 'uetwgv2e2klxhq1mp2dk1f1zv6530f5vejdbr0ku6avcpakrli8bwvhddtm9kd0agadfpix1cgirey150y8ww0yq4kzx5x2w007opiogcrpq0mmxnjrhk2r4r34dqckm0gkhdi3ofecdmctkdidpuvy33fjqnixgt0ir4dupfeyxsn4umli7wxroroje9vbiho3m34bgu656v0qozzv7vid4ht95051n7jwmmjhuey9tcmeoxbb6qv4r3gc5x69',
                url: 'ks5a6ial1b0hgohcrqj4y5szmxuukji28xd1b8uyvy39gqp77k5ofykbkpzlq0gt2szax8yxzrxms2h7zithhg01bmwcv3leklzsxa0ybem441p7kweea51sg1gb34m6xduwdd5c0n17moeirgcxrnvd48gq8ycztlsg7xryq6uvqwkn7rgt2j2ihb7g5vh7jg7v2uibjgg0zoifb48jit29ximstlog83rl15ex9hkq7n766ez5h6ntyvtstgq56gb3iygm07sg20nfrzu2o2b3adz9xgmcwiakrykviu5gg5x9sa00fojyjdd9fa1ayvu2coz2hl88dsupiamwy1pmqrxmk4t0wef58ucsjepq4q87x5ak7b5ekxbsrtg12m8v40jk490inpfudycpjadcbsve9suk6qr0drw55jj63lmv250j3u8z6agnjy2jqj54xn5u0gic44vt0alpj7miherfc8030bon7p54rn3559kbazxc816g9gttdm5hfxlm61n5nvcz0q6hyrbzt50u3xsdh6eazufsrquatpv5974zql7rrosv6o4cctcpqoz07ppagnht6gcrlviy4tg09slfjlcr57wwtpodor660bz5ptfcye6p62y2asiid12p3339f48a9mq12m2j59ykot9p4xlzbm9c0jdfnv8r3agqj85pthnrpvqzfm9u8t905h3nukaiak6b2h55zy6ye6cwda0uqtultyzfb0wvvv6t64x7fk99hfaqsqdb5nm0gh5qawjvrpt6qoqidi9ygtn4byjl0oiw2skzup7icnurag8x1nbh1aglb4l4vv5uv0lgcn6dm2m97q2a6qk7vrgz2t9t1xom1cooxyn8xtru6p4jt07ln6ye0e03qdc0lnk2krqq5w4etxa0wwnf6chmw3iojur9vvu4887lgolqvtsdab1mqtq2bnt6tnpg75jstuawpju3064b4ya5eajd2bar1znxxsclxogq7g9qn637pif718dq6v8x',
                mime: 'qthbn36ftjd57mq13yfuanmxvh3vkbds9bpem7q7l4aey1vpod',
                extension: 'w15ik9andwmldaxpq45njuh09em1lgdfnv9o9hoam0mjpfweei',
                size: 5192576880,
                width: 486285,
                height: 815140,
                libraryId: '28e8f17c-6a0e-46fe-ac33-291ee866ae52',
                libraryFilename: 'qqk1oggy1bcdzwiy12etxhd7v7dozj6tjq33jzam7h62m0pf6hd6vrblbhmclmssrbhrvz7i4pki9mtcn3fgj58fifuq1utsdv4hbgwjnrq83encdw1ajesgqa3usu0lvltvpwjh0z2y57pamro7rcsdmv5bfh757eag2hwuvdeeenaxdrvie6tr6zm3n9aeebe3pi8puw9n4jmiininbbbipzy3zotzclfw6i2ru7wm89w5bxr6fms20npz8pi',
                data: {"foo":"_<4a06X=xy","bar":14888,"bike":"hb`?0.7:mA","a":68515,"b":68363,"name":38705,"prop":"{gS\"R4{<8N"},
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
                id: 'b93381bb-8331-4664-bdbd-f4b7b653a7bd',
                commonId: '8aca49e2-44bd-4724-a54f-0714c0153fff',
                langId: 'bdd92e51-4b2c-4a73-90d0-58de27e5d622',
                attachableModel: 'jrg3h9lhemi3ujko6ybtj7cyzxf88qv18mdxxxq9m6tjt20fl2957g4fxo8zp7tb1xy487m7lmi',
                attachableId: '581e8ab7-5e50-4a9e-8584-2a2ee064e093',
                familyId: '8acb3b6d-e79a-431f-814f-5ec0c508cb27',
                sort: 452900,
                alt: '44r9smxigng3vta59nrjk5jpw8zvz73o4syjvm7hiipl0e276dln9gddopnc8a7b13d1jw4a8ufeyprur3glrxkpsgdw922b20ac41opm3doud9tetgcv059dpc46r4yybomypa3w0t8k1ta51jqcbijdx7d3lqz8689aq6c3m09ej3e6qvi5j28q49vb1to48k1l36aree4enp3b4lif6lqmzs7kh4zsyifyij32k1teht6w17h90qrpnvq5xc',
                title: '386bhw4vkb0xudmjyo2axhkg8qp3zp80qjximiw00imifusc3fuaw3ev45pw61g59tps820qykh8bq3mhv1ya3e0kxna69neatnau2kopeea7hxe2cpx9p2msqm783sx5t8y70ixifcsse67lvyg3nu4vvn6wtswyqk8ieu7i2243tr95u3rwwjkxv507o9m0pqng79jru3xrp44hmnjg0oe1724kffweh4lxp95c4j9tf0nugtj5fzkvgt2323',
                description: 'Quos temporibus consequatur eius laboriosam. Inventore et cum. In porro consectetur quis ullam odio. Voluptas vitae dicta accusamus qui velit. Quo aspernatur in. Fuga ratione sed totam ratione ut possimus consequatur et et.',
                excerpt: 'Eum dicta temporibus hic iusto animi. Et quasi ducimus sed ducimus doloremque ut qui quidem dicta. Labore nostrum voluptatem omnis consequatur commodi magnam aut aut. Unde molestias provident veniam est voluptas quidem aut.',
                name: 'd9h4l0jidwjotxd4eqzb0wqaugvr1c9tuxdon47g3oksg7geuhud0cfia6ft4gikujj3dw50x8sxbhpmzq8j95knqyzh95jruj6zwg1fyu5qojolvx8lxf4qxqtrgo6yrxxzspwviarwk2t0g90aaqltjmkgtkq1xcp2qbgdlouur8nrr3k7o492zbq1r3i6073kll3cpxyf8gch14zyywcjau9hgfpsmvyfty0ngibzwgp2npgdcnztv19cxpv',
                pathname: 'reaitkhjdvl77x2zycd8ou30or236rbsxatkj7ceaf9jmx516k55fzvn90ftml2hp4b6qjuq7y40nvg2djyv8ivh6l9ncsxkab4mqf5l563hk3j1ppfp3gccbovxdxxfv53ykrvxjv71osbjrgjw2cep3fhvq675wpulaitrsf3l1qzbd5u80u1444p3i45p0u7ka6mh3qmki4xw2hnwraqab2ad65qmtcmygpxw2089rkbakiwq5e4j3hhpe96hip7i0q0pf9e32jr3pi729nu8rk7hvt3630gknlu3i5yhyhdtz8q2bajny01gea0azwdyzhnbe6vk3chmwunronx0tscoceu2hyutczh37toxtm9ifrcgccigcwxuwstad0bdf6bnc4kg4ln851iybjk77ij7hfkcngsik8bespvzrk5kc66w1j2buavrbus7a3wsbfba1vbxtgyx0tmk9ztdm3xck543xghtug5i8wxihqrj93msvpybfkzaqr2jswvgtl83c0omdxwdc52v270of2qzwo8ido7vpl56bqlyssugmcqj5q1cnm7ei6puhoed2y1fpk31j7f2oemk9ko40vwxul5u3p5e86lye29322jzs8ax91oqb253t995yu1vbrg8jlah7hlfjcjnbogu1ap6vmzmtxq9r2wq6r3vxad3swe2bb87m527jkv0wcjl1kworvsjatt9o5rll0j6vm4i5tro4ikyi304fyc7mvcdyb8wdzxygyp2sq008eff0noyju87dnt11uen25pedqzuiszpx8vh6t4rf8nboyjqj2x9qsku0jvczde8xpar7guf5qwlv8vll5uar48zc4swavq4xayvcss7q7qqv7w6oo5ik5cy04o661pb5cjuta1tfrcs3dkoegxb0c9e2efmhinh7iohforl7hu1t5sw6y5r7nq2v7e961nidnc3l3611srvk635pj4a8zbqt2t5km3hfw38j5o7458east8yy105pa5ldrbhh0t',
                filename: '3hq2gf9yypgqvf7ro7otrtiuf0ck0zjktrcym388pf06nd30duayb4ofoqt7xuil3ans0764aoawd9ksdrb96lrbhhkk5s6d5rpm8ae03xwhukpw34ccf4ctsft9e5h5j10zame07vr3r1d6hscz9wt3aooxyxdi83xwfvm9gd1fcakewta09ekiv7inzfqbfk5x6vwe8wt160x0horvzu6gcc36y596h2usdp15y5gq52f3molys2syyzw2wu0m',
                url: 'emt00h9yu3pmzhqnrqz2qauxq2xr6nwu3e9fsrm3igki3c7lnch2zcgajl0p9j7d6qagmc4kfrgy33fwrnqbay23vr7tfbl1vp1o1dkajsnzqi2t7b0dapvypo3r5jbpml2yiou2ju06ucumfvg4na8tsi69dkjdujvp2skp1xjslke7gaoh8lsksvulgxsoylq939f2czje39dmpfduo7l6tsbz7463xcp1grq1jysiui8z8ahc238qt6364vr1jaummgq8tszfyudbn2o53haxfk9bh9awxc1atbusrayti2x5cfxxrfbjrfuy401fh59q478111mc09lpei3na4rowzio0tz470pfsxszecee6qs421turs7q41gvk8fu4757gvdpiyiphhiilo6fnwju85p51vj9zueftykg1akxdbxp2fi3fvbl3vgvsdie124a1itio4j7olmib175nwn05k244q56epxiw43htugwcg6tv84oz32vhyoak7ng595pz4dpf7hoy9f2d6k04mazzg1av6um0w8tlcfjarzg96ocd4ruwwrx171olirwj4x1yqv9wmxbqwrsawfdrenvrmyg2nuf1msbrfk4od9bu5s5ab4rmq33vmwwga17o1kr3iro4iyzpkc2bf2xxo9qaqcw96bdjt9l3rz7md8rufxvxehldffqtkm0lt88inas1vhj599v966e4g8j8z6gi0jkp9ino8e73en6t51x9e4f5yiz3vbe7sc6c8pldmwbgn28c7k5as69h2w9qwnwtce1w9adpj1ynno248ifhxz8wqb7e3qlaqhl9fjltowy0afcn4jba4le9q14i6nn048eqstsywwbxefr8df74yhwuz8pi3p8jcoais3xdo003hypbhegq4l35ct2i5cfcq834m28jdwkekv0u9496d9qylod8qzom8018ofuf1874tpou855dbhzzabin348ygvk942ipkdrcxb1wrqp4aeey63dz90fsr7beqt4',
                mime: 'kllwq9fgwnbpt4rue4rdw0vf9g2j4s06pbrtliqav0im4rtdgb',
                extension: 'ypz7byfpom97kqbajl869gt6z2mbeo2ag02ko4yz3eey961zvy',
                size: 4462933328,
                width: 393504,
                height: 967110,
                libraryId: '8cfc3d69-9517-4ddf-b08c-3aac0c930b51',
                libraryFilename: 'rpshwezb1cdr9xnpgdvaytfkfizkw4t6zp6873qqkpjg0gxfnopuamv1dzy8maba17d65e65zvf78ymcja737ntuj29u480o6s4izrc74eqoiwxpphybqbcrpnap9g1bo4zx4bza2k7ip3lxx2r72961ea8v98wv0fu54oupsmtezayduw8prpe118xph6jboeuuqb5tu6ni6ckzua73dsyix4dnrsy0k7lt5k9n2n7etecrpn2wfovdf4z10a1',
                data: {"foo":"}y>wY1jZD}","bar":"\\eBjmbu.De","bike":"(#E(ClZ5L*","a":4532,"b":"G$p!3Ta:GQ","name":5952,"prop":47206},
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
                id: '25de722f-c226-4743-b4e8-b1b0660124e6',
                commonId: '8ebcee3c-6d96-4eb4-b40b-198fde61e597',
                langId: '694738a2-a33d-4ba1-919c-99b327f698c3',
                attachableModel: '1cilmwfj33huzkai3j0iat1gd01r4eklbem6h4gmd5iovb3y9vf0lzq13kw1mvchrzrwfxrpze8',
                attachableId: '2757674c-d95e-49e8-9f8a-0046e047d488',
                familyId: 'b22cbcae-5008-402f-983b-5b2ca1ec72e4',
                sort: 290017,
                alt: 'xixuwzof5gnn9bn12njqsvj7qsmlkyelfq4upg8glnj9st8ps5x08mrc8qu9mol18rcx0er6kwpgb563pln66v8565x63cocxjqd609lmrki0gfcfy7zdezlr9elf7wwscy2zuap2hs8smwqlbgr9pttha2udb4iq9r5enemaumpv1vrk8y6ajjw9fmzqrrrxojzuoow9588x9gp3tv8svovacc8c4ebzeci1brcdplcotbh4g8d5xdgtjhsjuc',
                title: 'rox6dhmtglqivoe6zypvr9lwxy2v81tff5t4za3whri0wccji19y8siz9vdywsd3xoe1tgen4l219c7wqf5blenq506c0oh1idjqk30qupw50myu26d55p49q2n5l923k7oanqrvhxxvxgf2sgg22rd45t36g6ar5v935fwc7lipwzdcm2d33sdmyfntjwrvozj3jg650s02g7fri9cf0ojjzd33jesiuaay4zn8f9rngntew6w84sdvhnbbvam',
                description: 'Facere ullam sunt dolores quos voluptas earum. Repudiandae ipsam dicta dolores a adipisci. Perspiciatis quia autem maiores eos est minima earum perspiciatis.',
                excerpt: 'Quae est nihil aut omnis libero maiores adipisci vero cumque. Qui enim aut. Necessitatibus fugiat blanditiis consequuntur placeat nemo rem sit. Aliquam sapiente occaecati sit quos. Laborum eveniet voluptatem.',
                name: 'bdjtk3r2hen24pbv52kftu2mpuikizhek6wlhmv7r64yg0qc7hv7gdkv8ovs47xq6np9tsu4wnp8mo8peveawvrlzto9t3t2186xozrnf92jk1murcrv5mp7eb2y2aokjr309q6u0rddrnlx1pxd7kh651r9ior0x5rvba4djde2s4v9wsouea4z4zxu4z68uk1d5v9814bwnzoezj7qfhisd61src6fr0rhjny12lak3oq571z35xv90xu3a5d',
                pathname: '1lv0ykj66fef06rjmeuxgi1ukstyvjtpefmirsuc0ujm3p892uqbyea1tjz7rchnpoz4ga8ckjket7p04jhhoir879y4ppd2aonjtt3j9ytqt7wviflheoufabq5ong4ydpumeudpa3ts9sff6rel7t6lsh46vub4os0pbyniercu3m7xamupdzbqrwhndjn24uktgb4u8bcweyzs53l52uvjq2wv7htndhm0jhba2vwn4rxphea141hlp00lj2naytxbwo66jonnfx2nncaz504rubmlscn6q7fg2fg336xqrheuo0adwvwn0x12jex4q5h1ge2rjpt4qb7weov48js3j4jas4bgpbwsc1kysxk2s5jynw2xsf98100lkkkxu3e5grpbpmz7vgebcmh45077lmv5tqitlhjjj9yjerxbxmhx6r5d5bxbxf65sc0fvd79wqqb4qzodcgino3q757ok15446mumulk19wclnhtlt4ss22m0fhoukudr8fyvx1vt387apsxpn37fch40phwapbvdqknx4d994sby2njsjt7thpqwz4xl1kn6w6l6nsv68q5ox8ofvdycoyyhli0l8t2bpatbhgmxzvim7rmqezi1xcycdj6i1ahind2qdfq2b72hd5jlfi9qzqclmbvvwi47yg4f1m4jxplxg146q03csh16nw4j4nmb5d5twcouiizecyu05n33c6z2h5741kw399snxawpcabxq24da7h509di8lmit90ts4euzg3zq8ezj9ws2ck7kltdm1b696wcusuh1l4uh8k8o05uj430l0he7cf52yzig9um1fj6spfa21ighc2gfk9zjv62lg8j6k9tmnuc6m9us2fj5kt8cuchhhy2i7k26nm26qc9nm2on7w94iz01q7rc9ujvodcpbzcwrs8fd8wb9fa0n1f0s3kgr0xbcmyetzv8rq6q2drb0l6yeny20og3j6vivlb43npo86ho82g2bdqq655s4cq9qdu2e2kif',
                filename: '86to0qiuukckq3kva9tcip3xw5aya7be84plbs77p6p2j4913fvhygqbuwi0bfc6p71mwi7vpjj837f88v7umz4sb49zdinlk103ra5roujqzb0jspz4euyj33ewnbffpc0utg3xu5eprxxi3sscmec2ca6x0ml54ftpzulnzd1g3a7yqancrjo8mqn4ujih5nz7hjphgkijnwqhrqflyfhrricxg8umks746xgmxbjr01tgsmxuumtuezakxbu',
                url: 'zegau8kvqbsnywnsaa1f5z0usm8ee8oopx689mvo4dz0mzpadv21v3z98qhf1adqgxtzxogeoa6um6catxuqn18bmwv9n9j2hd95l3fvzr9b33p9sbx64e047r5uu3whkmzh3css5vltd56btc0symejztdnm5ocsxnushkbj5pou7kgdomj7w3wlhdn0abu0arum8hny9yxsmetjpzc1ur54ns6rmc8ait5byujh2pc8dikaglcfsi8ut28jgns2yld60k32egp5sfyzu3n8jkhjmzyz192qaj3izc2dhfs6n9hivyh4lg6mvbxbz2pmd83tduho8ow0jd087bu0vevek56xs111d77esj90fkoi7e2co1p7pxukxtyvuwgsviv6ji9efpm7nc5jb6ez3aqedbtuk0ighr8wx9kw0axi48rf88ibx9pwovgh9zc1d62m9acem2yalscdcs5vcxzf0rhujjlkfn3n9t7vc14jbcx48khbn2pvrmucru1ihrvj3u68ulw05tq4l04yyfvgt4rc6jxyxt63jg3s9kje1kswc0azvnc8h4kxiuu5m8vz4hg2grsgmk4y6kcoiu4ifcol3bt161f6dcu8jucqckcj1w6kvufos5l5myj6e8kf0s6rtbekf7xlqmcko2dxp290577eiafkkfqn8f8a467k9cpn4wyyiynpexerlh7cx5z3eohezvwy0sz12jxbc9y9rhfb8vlxe33ngkmwmkqu82ct0qd3nax5gh2pvelb0ct7g6wgz5nm9s6sy6w8zw13uuo0ie5tv9vvn9c4ymbedekac3ch2i0wcv5x5usc14nadgxzg4kllg1z76vy0nblv25jmqgkk6ykrf9bjv09p90wwc666vgmrloy4xvwo7cqa9nv889vshb6l7y23z21oh5jmwxpo20jl7l41h3tnu2qy2qmovoj3ye1w536109etq28cdf44983xcekov3m1oubeon056d3o15180d1g07h2u9j7rx47662',
                mime: 'o3ixdjcvodmbu2q0nio0auxzm5rl9xb80ljoirdk7c40tx5klj',
                extension: 'zk6yv2meirdqlrte4dk83tjkfem1c0whhn8g5x6xpi8hqxt34a',
                size: 4644319161,
                width: 167753,
                height: 348914,
                libraryId: '9c5fe9a4-290a-455a-8bbd-78d2bee22839',
                libraryFilename: 'ee6dz4u9q8mb2w7fveq6bn61k3cqdf0xtlebqi8vmihs6rd8dotwd6ybpe40frf975bs69dusegxmrblsxgjahea27k94xxyxq8ah4glwsah5lg3uqcdezj0ydtyallrort8xhwfgt5963a46yguziv5pxnf2kjohczkzmj8lznkkyc26htgnzzvufptvdt60ks25xpqpu1ko5f9vtc106t9nyp537g1wyxj0zfaryateqljnslctbmwvgltct3',
                data: {"foo":18230,"bar":51334,"bike":78557,"a":71209,"b":"/k3mPfr+pT","name":34106,"prop":43449},
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
                id: '657a3da9-94bb-4bd6-8a42-ea691d1736d4',
                commonId: '17131f98-a986-45f0-b0d8-3ea5c2ec550c',
                langId: '84083cf8-2cce-4289-8a5e-76cab033d19c',
                attachableModel: 's13a8ejjew7h0pg0unirriichkvfv6imh9lyb36iksw6rm99ufuq848aedddjxqjmie8ja0g3gf',
                attachableId: 'badbfae6-46ee-4d78-9ae4-9537c05d7f04',
                familyId: '82e34e0e-b543-4b1c-9dfb-45f503f92e17',
                sort: 536810,
                alt: 'bjlxu67hhu2tji1ubuiovsef0g96bfb7pykz6csey1rezeq98i921voff375cmacv3lk6be3m31vzrcb62bprbmg43lv7jmqn4yaf6zz5328te8zltyswtomt18prc6zxa5ap3gazrwyppmgocxt10pfeir9e4mpo734jb76c7rd2b613tlm3diifwzlxe13ht8cnujxp72r1jebpnrivsvlqqoxk41pf6vyndsq8h9qnbrlxo4dzb53gr09whe',
                title: '64rqymxcm51qmsfuf5u6y7i21ruw5shz5lfeqna4iaqev9kddrj3zqkwkh1xf2wl0ru18wdeizbqu1skceicqw6o5syvi0hgqqrk1v2qfv8ezql84qg43ruzzd850cj3chazngym27azgjuxniutmzth082a0dtvk2kppa1iqh0w9nc4m9pdkj01fi9an960aulxwrafp02xyfvmno8fo42zzj6v8wo11addwznvofnlckfngu8nrcdiyo0tlpz',
                description: 'Nulla non suscipit ipsa iure aut veniam non quidem modi. Veniam velit hic distinctio neque aliquid corporis et similique est. Rem itaque velit amet animi adipisci hic deserunt quo quia. Non laboriosam dicta dolor et aut ut numquam sunt minus. Quaerat praesentium dolor ut modi labore excepturi non. Minus et impedit excepturi sapiente consectetur.',
                excerpt: 'Asperiores deserunt nemo tempora fuga. Accusamus quaerat maiores ratione velit autem adipisci dolorem esse et. Non blanditiis ut corrupti doloribus sit. Architecto enim ipsam id quos. Qui animi ipsum ducimus magnam minima vel aut expedita.',
                name: 'gynqizf17gensulgdwqy6vo5qefdzxjel56dee1m3wx32wifsq5lzh1rn718toy7h3oftipk0s7xvfhug6x7jm21s67twg7meaaal1nmm2elygvrhuzoqt1uc93zvll82trfqonwzwyl9aimuocfllo0mevjcjowx0jhb4vgawaaoq4ngwpwboaflwr6ildb4kflkm38xzgkx5v6jfby4h9gbqe8ozfwi84srfyiei6gwc0aum132vluy6az0f8',
                pathname: '79v2z07i9w1wcq4olww17zuas8li0nprrem0np51l734u5q07bdmx8nn8pn3yes7cupd9gzme6y6f4ojxtbcemqfk1u09rnm5v7k2my9c5jkx2lafputrmjscqc0u2fnkienq6xxwdck7n7ofglkwsizwsypot5pju6yk1h7q4j85o4c11cmbtzsji81gnxtvi4x6v0ui4sd5itj6ppuu6hqvm5d3wwf6j3h8tjgud586zzu98aicv8f8liq0v9qii9gyf2gydvkg9vs4yy1hndf6ybmkun0chva6ywebhb7g9a17rfj0di8xftodoh4rggmkxr8abalgfqhta85pajgyuuvtbwhpsm8xkt78jmwyklbsv5a69cw75rp4p0c9pkd7i8o4lmgm9w6u5n7lfimg3xfvsl5w7j3ro2ya7p3esv01v7dcdfn02gal21nn561vthrft486w4yvbv1th3fgg6zayf4qqsru7om7m3hu34tz8yxrqslvamcl3man9zrxjgmwxgjktqii3cdegggy8emnl9fml9mxf0r2y9kwhwdj233yemcjre7skw18v68o384tbthas5ml63xlwwgp4xwkd4q6u7778ra06dh4txxd6x07td5dnxrzi69y8ry4vaudhfffjraf96in7a9w6fehq6mx6545j9sjr791rze02mymvdqdklcr8jckurxopwklgm3yswhxeumrj7zmw6b7aoek9vlgvjnlbuonvf83qxf3y4x9wb6ioksn8balzf1l7ytdjqz5g6ehhq4hrdoasp2y4rz8m0swwestk16g5aana5aqb6x9ddvubjdck628jfllv39lemzkap5vv1i46w9svycc3tmhuvcnw2ytyyxc5e49sh2x9yfxm46q8j7ny1t09hep9s1c0c7c26hqody56fcc40b2b2dtnyh0fi3hchp43uue71zvfoejqo30jb3j703wfd0vmkaeuuw8hogsxzwfznqtah8joctv4rz9wpmk9rzzkt5',
                filename: 'dvgug193l8ck9apebgeiq8q2oeo28xsukjp3tyhthy84ea9ejtogyjf496ajbzg0xvz4658zfwfp5vi2q7bt9mhljjje4zpow204ju25asmtuv475eccmct2oluwdyjsagaidnztl7kov3qrjl67tglm3h7lae4vj9vt77vqbkun1hafup75nknx3048onfoix49ik1qdwippgo535qicklvl6w609x229hhg0zcmtm2c3svfiyal97s56pp3vy',
                url: 'cpez3a04evzykseto5rflbo25qzue3lhz7ryytkv2ubfevqx3lc8tofxhpcmbpljnt034vzqmctx1h2f7jlfvaovk25fjdqnm6jh5ikw8ar7skiig2ya3mhip4a34w4cbendl76zr5g3zga9exegodvdfdk6ukcvph3mk6d0ut3s2t75zb6mirebic7q7iv362o23ua41m1qtquklztuydhi9vnrknd8sddcwfou2fh9covj8tjm4ok9d68o9upnuqoy2etaab00rhdnfjgjya7ltkx0qu9omqch29x6xp2pj3y8ds9psg9i6zsk7djw7sxxzemlff84605rien0pxpky1q09jxoci8x36nnnsxgtfn7ty0mbv8g4k7ikzyq9rdt2cy3ovo7wyhx7p1lowhjorr2pagdgr75rqcumgth5nz6e91os26sq2k0ool7a1lfxpwnuyzg01uldawcpblbb6lfebszuii4rkr647mnl0jlx59grpuxwzsndu94w37gkq5i9a9ovkq3u5sg1dveod91gc0aiw1vlmcs3bjj9s9papbyju3fao66izk7ar5y2yo4v626omf3g7qj72fx4j80mzc9dr857664zndshvdheig5qz1r1ens21h5htglojap5ugych5noucvzz47qmipj2hr5w73e7gbulljyb4pzrympugmmv38wex50etm3ynjiah1y6nhr75rpy2bm4fsebfpeq000lnilykplpgwo0xs4y4dv1728zck20z0x4hbtxawyybppcckrjwwqqzvi03gflamvq4ltn97rixdrigoc2iqagxyof5dydh7l8q0vwefv3dl54w27f2uleiy64w76a4yuw929cfrts28xmqayns6revuz2wm2dspqms8mzdi4ld6q76kuyctxb73t1qytra4v8qgrv92cpfyry328hxcdm271nysumjs4ntsth8nr2wq1mqd9eewqfegqygiph3zti5veqhz7wg1z0fiivg08tjw8ykm',
                mime: 'woz177c3hdcl9343y47dh2pdu0zeah2ytf0kidyx90b1uagipv2',
                extension: 'q7zem4flvbaexb5sbliydpt7vrw704zjd5qdbecqqk1ms1vjf1',
                size: 4400964161,
                width: 419331,
                height: 339843,
                libraryId: '280411b8-8522-4d51-9a41-bdbbc16feb46',
                libraryFilename: 'xuwxif5hcqefk4ere1a5xhix1vihkg4fulttdirqfzzppgfxl099xa6emr2xm32ald90zzudzbgugk2123f6oei694s0bge2o6hxink2m9u8l04xfoxupzqljlc9vbnbh54d3ush72e0pntlff1k5qgz79lts3jpdqr8p16iecvzfiq9be31b4wufkycepbj2hfm7x9dvbyou0q26n7frh30flxgucq513jshvoo6q4nj2u98krmtyfhiz7r68a',
                data: {"foo":"{rGR0ItJWk","bar":61838,"bike":"qy_ysWrLGz","a":99001,"b":"j6^7%?yk+1","name":36464,"prop":"b]a0ygMnxt"},
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
                id: 'cadd179e-2352-4545-a38e-d4eb60ed6022',
                commonId: '61f38fed-3d29-46d9-a9cf-6efc840eb763',
                langId: 'fa5ab84f-12d6-4cc9-a46d-915f8cc5717c',
                attachableModel: 'sj9cj6ql3nlkh7x7uo7e1ic71wmjnc7p6y6nqjgmexlnxmtcb99vmmtg4tesq90z2lp3x4kxmjz',
                attachableId: 'd26d18ea-18e8-4b0e-bb90-c8deff4c095e',
                familyId: '7c184b53-f41a-4455-a24d-06a2a4326d14',
                sort: 373248,
                alt: 'og7fm4g6rywiuvg4828rnxat0reczr9ef1nymyqwqifykjjrxznin6hqndx22djagnt85yyfwyam7b5nfz1qhl6p4urp8ntp20uun1dikicrw5maeoj4wp4304148ztpwmlv2yhziqu1acigbhgfl68ewjtt44kftpg59jszkg2n0pokwtladzgi95apbsk8qb8axsuzv9lntswhn0ptxhadnmti3tw309tin8d7lbqlf78m27g2propeahju3d',
                title: 'hws6n3aw8neayql6egs6w1dqp2tjj8n3bhghnd0zx2qcgafgvuv2tz7tcfsk2xvi9jfcde3y9r2pxuugq2z4tr0xra191bzmdie89pkn3ijw9rl4fk68jgupakq4ec6mui2ksbov8cwj1i70tjwlo3rhr3ob8aadbvcloqurvrq8bb3qvwi1vzt97b5bo1lnwb5f80ii2gmv03d7abhnzxl8d04jsnqwpojn56x3ll1knk3m230e7jhvtp9t865',
                description: 'Dolor provident explicabo aut ea aliquid recusandae doloribus eos ex. Consectetur sapiente ad illum debitis sit. Magni in quibusdam a voluptatem id quod ea itaque. Recusandae odit voluptates voluptas repellendus. Cum quas aut aut maxime enim aut. Quo quas esse est exercitationem.',
                excerpt: 'Consectetur reprehenderit velit eveniet sit. Cum exercitationem accusamus enim velit doloribus in. Vel sint eveniet quis repellat ut sint est ullam. Facilis perferendis qui. Sed et maiores vero alias facere qui laboriosam. Assumenda cupiditate et quibusdam ut accusamus autem saepe velit.',
                name: 'eb8c9brp6ie2qs7gr71qj54hva81h0p4ny4wclzp9cnb5o38os2up3mc4rjavt4431uvfz2p5kjicc92gri411cc19cj5mswn8yrbx1p23vqp9mtrl8usfegkzuwz26cshgm6eetyxqu0250f5kugmcgdvef9uh3ak1rtqfbupf6frwe10l7z6l5ct8duklomml5oxxjbypacf2xgkdtwxqeo8ik7u0go7e0fspjejeqkk3wcvdhodb17ydvg3h',
                pathname: 'akx77j44k8vkvadgx7gqw31go2tb14aldb5oz0pccmekxe6vs0ri5eg86m1kgjz8pnawtdibglldfxwoyjj7khljg5bijdxij5vq0tpekq295iosc21ftnodjidxqhq1k3jeaevaixnhomqxp9z0gm6ahs7u07gww4tgk0nmjscpa2p999p0udhfph42oh6a7rkfkrzc7svt4ht289ee6911fv7zz5mstkkz39glw8rie3pvfhfpql4ie0phvmpksr2o6zdzasppc8thhfz8zj2vy7zz26a0a0n7xyq213jcj7hxfsdo72phrie0bnbr10vowss60z67dpxvk5n9ce175uk0a3m6yyzud70l4p0j8gj7nxa8799by06wbug28unhgcfygb1emb9z3j3oh6v4ek5eay4e74webgi1icp5l60vio32xlm5mehztt4r02pkf3tt9maohxwmozzsp8fwyuob2qoeozszqa31odanfbqb5grepfomtl1jmix2ogqrgdehhts7pf2ephfsfa1b1a5vro3cazt0ew9lvmq0kserph2sbt5qj77f15up64o4i7et34kooblhnlnpm7rt89qbpjw5xxbvb79ovxmgf2xk0hcdh50notrejmeyfhmh6bktncoiazikq3gy294n32yey1q3l650ef3vca86iywb5ignndbdftc56u23evstw6hj6kn16uvf4xn21hbor6sfvy8cdxwjky2cxj55qyno7nsh5psimdqexqfn7p6oiicme248300xq36yeg03mdcxx1f1ut6k15jesxno3ybl1dlkhnzfgj4j4f6j7dpkjj5aekvobu2uvh3z4qik49ke2a6jwsfbfiijulpjydu5qo1q2exo4o762z9n2dr4b3pm5cj06c1e66us1h8pg3csi9xcuignmm2dn296dozqf646bizhvzotdrdlkpc667pj5wo72vlr405abgrw9kon0ajhntl839d1buc3072nhh03mfsdn2sti72d',
                filename: 'z2osi232bmk01vd7mkxmm4s78kkkq0tp22tg92z6m52lxovexzjfxw9q2izi9u2umpnt8plt7ys784w3jg2pkcs8bi12p9i113ks2cm63ywwaccqglt455i8yq7krgy9uy4a1vr51w0xxdwco13bgo6eyye6in5hqbusokis4wecfnndw73rgjpw6svvjemdfzmmxg5nmn85wfj6gjx29fsogvt43ip7841u3vkpjjb35gckcclxwllf4amjyi6',
                url: 'gxj3k2gyaj6l0448xehgjs8jiwuua5pktvzo3o87yv5rdfqs3btfedgl3nt111ka1lvpn2xp720rvcd8y3j1fc7m4ghinyop8b6jgdlcnqc9su6qfaqsj3uanum9dk2st84v91zy5yodw1qdmrvopx8s0g0ywm0lna49nmo7acygl5tycgft6e7b8rj20cdwguc3el610mn1h5vsn378147smu9nhebhncw62fcqmkh03m9nfog3222jq8lni6vcjyhtf1hbpwjgrxzatu84ua5cx24jqha6ei7x6rr868izajknd83y4fro9m2lgo8u215u2fr7vpskpu601atrwc90erz0jypok5h74z6dt1red3xgfzxc82vxu6v5n8ko9pxabhsshhmvoqkasmkbwky08krazflne5qxgegfa3t1bl63bzzg03q333th2eoiqfk4wbwpc98qfu6z36ncacqblhtv9grv051klxvcebzq95ig9on8ktt06ohxndp85smkr1s9pwoyd1ijx6pq7rk7k7ei2v7ukm3n0ryq73ahbcvdai9s626ofc4w4ah08cpmg2uop5fp92wxcdj3cxc0z0u5trnr3ylh8c4ldk4t9gwrjhemnbcwn0oes9xwkb4ghnvz7yjx9o1hx57ten0pa994ewtqx8on8wgd0p363u2dy46kzyu4owdp0bf1s1mmc90in7e56ym8s0dsdbyr4akwybe0wm6rbv0i1zcysm3u45vmqay53gufzop5acxilrqvtiihvcza84rt2yn2bniq908xdt3wopesa5cz2wnq7ynkou4wo13itlilac02jy97vfoulztgegjmcbzmscdtnjyb6xyb3youvfzyr14aihwfhtav6jvcwm23f6885h57vz5m8wbhsn6r0ni3qimrng0hxlwep54dz3q40efo0wsw75hxgukt9f9aoe81nxsej084efg2ll5ok5mte2xy8xuifl7tivhde4ly40nr0602bd3t20zyf2hn',
                mime: 'b3a2bc8lvloq0yifdes1chuk0dg8hfvevvwxyf6gcvvht9g4y2',
                extension: 'btgtrod0729iedayor3qo1aq6c9i6a4ts6uws1cxuxtz99ivob2',
                size: 2994783727,
                width: 810173,
                height: 125532,
                libraryId: '45a2c6e4-1e23-4253-9f60-c38328e0bb45',
                libraryFilename: 'dq04frr8p9dbqu12ikw8vv1o65cgyuhbne6vefj138frl2tq5qsyumcnb626dexn836khozizjxs6088y5ouxub8svrbg7e1n0vjfdmuglxnzqrtbeyyy0arlosiyav9na82lb75dppdjdbrm6f9cgoutgjk3qynd9rgbck8ze8o58zu0c9giujwt05b18lsrq2remx1j4fi34hmfq3xx6rfqhqeknrglttt15npvhg4ofl10xx6wky84ugmvei',
                data: {"foo":"8'<hjj%PQS","bar":44384,"bike":"c@P7+}j?r\\","a":44000,"b":10396,"name":67691,"prop":85495},
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
                id: 'f56fd429-7221-469f-8f68-d5d0c9900fe9',
                commonId: '44479eba-cf4d-4655-8aa0-046067504da2',
                langId: 'ade024c9-177d-4e9f-8b75-a3bfd4633bef',
                attachableModel: 'tysrpwa0tfj455wrhd3l462ww3xpm3i9q5fyozrk6ls8p07nmfpc3mphtaikfsmvxrbjcd62oy8',
                attachableId: '5ea0655a-e2a5-4890-8579-cbd3a873c593',
                familyId: 'fc58abc0-8c74-4d07-9c07-ae8ee75a2f59',
                sort: 980885,
                alt: 'siprc46yyjhnoorkttdftb5ojvfuqu23t78e9bt5hyivevpb3a56ypih1xu39zdz5g91oxd2wsi179u2xyudj55fbzo0ganojlu003epg3o2fa513gnnx4o7reomlqiujbklks4tj17fr4chihq959pmm5kxdwqomcmo6eu5lpvvi4zktgm309mttk8znik9v8ngqu1xs078l4hfeynkynp6c2kd75wnvs5yj2w326pi4sl0xg47lmss5f83ho1',
                title: 'ajh6qoe9bt667v4refgcrcp37f99zf82qd4yik0tsf18y9vag4b5op608a6uz0nyayugd8arwhak2ed6ryw3469ojxxdsrnhrdhvndq21seeaxtbbgwjdtmt0fac1i0lb8ffv9najpczq2mzcbokwfod64065m3cq7jboitogffjlzxsee45ug2slhj6jyxysd9nljfy47x6hiydqb6evyhuykty6m0ur1x0p84eq0jtqyixq61n0w5fbtfkk8u',
                description: 'Corrupti quia at architecto qui ut impedit alias deleniti ducimus. Itaque quod odio molestias odio. Quidem omnis deserunt provident debitis asperiores rerum nisi aspernatur vitae. Eaque occaecati quis est quos.',
                excerpt: 'Quisquam et et quia similique sunt quaerat. Consequatur quis a. Cumque nam optio sint voluptatibus qui inventore. Ad maxime quidem molestiae in omnis. Voluptate illum sint et sunt molestiae quidem omnis.',
                name: 'lqca5z4wustzbipwgb926c9izosq2tsdrrgicqx80q4v8f63wjelgwifgnt9z41v9aj3nv5kvac5sj33vqq4o2skiw1991hj2nxky6j60inhzmhc6ars7g91jwup74fq3371gbsyrbe5jbhesvh82ch3n6qapczfa7k8cl7re304cjzwpjdry4sa5j0ycapyr3vnigkfj437zas16mqksnby5yhqmnsvg1vhlep52325af3zuc1hl494eawsxvl',
                pathname: 'ao2c8v69q018f4xbg5sgkdrc9yxvlhs0sezrf8llgxjfz6pno5ytq2b7bbdyyzwtynh9vgmf42nrpp2ty8g1zbjmwk9rfp78sa7nljj4ak9ocsvxsdprgyemvmohk71j06fcre44qmra1m9zrejy2kn1pcnmog76fkg4yqe6yajux1wg17vbec8kohfh8z9qyawy3y9ymb22n0xac2a8quez68qg5h5rsmuqjtyjkm4rv7nnpsbitnodjdc2gasj55fqnf4ix653vwkpluj5n1k02908vi8v5qstf0nw1a7ap0m1mqv846krjdmxxcba1z3jmrvm7gfxewtidcq6wfojv4lmwp75rnwafehjxcsqey24fwlytpci1hgxbxfr890vthuv7gkh4zr1euk71to1kfq2kj98pgng1ru0yzic8dfup4uh6zh8fobhc8hns1nv535nhj6w2hd8tnukzcyt8byj3hewsnrw3701n74doo2834ru5n50d3h4ad32aexby9s7q18zoiyjatblt6hoe82lafozjkag79yled5jivp1cyx1am0cn7vke2ujuhoxta2pjmsny4tyjvpycgf75tu5bl2nhe97wg9odtem8zgf1tr668i41717dpoi0q68ibxdhl93rf7o91502d41y9nu9fxo2wyif1ot1vvrvlosh95oswghayfj3sg5gk08ucp9r5t90tyvx6ck585gpil78trelmkxjyi5co3qonrpi2lok1ygl851ed5ma0ckgu0j6ts04gram6t70qdbe3iendw8j6uf5ue5c6yhxyvby8n4s0mrqiyesaq986uu7btfqdhp0nebv96b35pe9i1jul3s36cm3yyopzlat53nwmm2j3scqxh6uxmbkrz5wucj5ipdiq3b22x2roobfyn9rklmlitg93ay7s5o294au00w1dvqfzd82f0z8iu8miqlen8vppvnfa9f415thki4grd3l59kpgcqe7hg47qcsdr8bb7q6b4adr91',
                filename: '8r7gmsat4sgvo7tufkp9qecfvkuvgknvwhulk7jdpbzghbkfgo974m3b424okfdiab3ob0flqji5tjfmp3ib19mtc53g24txbez9ljyiagz44edtxto7ugi5dgm0g5txef99yi2sn43pv05ablbthgsl2i8b883ph7kkqvz3gkarbc3wj83h61yvjok2omz73l9gjpw7xm2igc11ri9rrpkrnbf3ue8wdv7b269ep3ygzepihi3uto9i4aelltz',
                url: 'm33nws4wt8c9y96vr8xolh584vks2p02qwtrp6prfykrotunxaghl0nz3f72behco9asdeg0sizeucu39ku6gm0cgo7e1v4jpl3nd6gw55ldkrlbtwlc6qj4vxdvkc8i8pqrdrt6j01va1eoza9m48czezrcqdmd7puwkkisqtsdtrray8qt6ekz6iu8jvujabcb40yryjk7pd7gx8r943pt2xm02m0h6060kk8tc0ivvdxtuwtx912xsbv96zk7gwlidbjs8ju42z31dkiwc8muzmfzcohl3crgsojneul4z6cgqesbjwz891dnvj86ms35jv3hvzhktusz4ac50xv793gpr2n5l5k7141euw0msp37toxlkc8w53uvznd2mg5ys7rvkijwtyi41xs5c80ua1695w7uj41r6r24t47zn1griwc3uydydjk3n8q6hsct39uol3mu82k4q9cbx4xjhv7o3jkjocpsifkat3cklp8skvjrrcbf4px2z64s5pwxfyx00ypmeugp8leaevil8thawhiilx1m7hn2a3ux6jtv0z9bccf8ko7dthwwf8jean4obrzuqiikd6uifvk2x9zqayuxxyiadzxsxvvpmtyf73smv0riy5qklo5agy8d5tutkszzosbp3411zlz9c970exd4yd9r21oacqyoi5hr9ph8mmek7hjc3re4so6zv26pvjbymfoihv8ryqt4fz5ec4adjo7153ea30l1eynqcgga6eirm1en09nmy10l5us68i47aonbpznq7csyea6eypuoh2yek58cwaa1704coppr7syi5jzekpmh89anmfywkpyni0cfnrbtkc116kbw9eua1xq21wgrhu0lt6xmitjcgst23oodxib5mnomy94gmdb9oqiwidmr3dhhl6sdfwyujwfgkg8ipjjlgy4ye22qjg8ucfchfr9sqvaf2fvr8d5lxa85k7n61zu5k3w6vtzvevw2mq6l9hvs7b71ogogttfjsc0gdklj',
                mime: 'pidmqj493jdzb0hv7fvnid4hndnmfd400sv4kzoy3iokzzh576',
                extension: '5n7pnu8sbsm2ecwhn9plvmjq4wb22ksc5fikf2vz7z9h4o66za',
                size: 52224026564,
                width: 911149,
                height: 184364,
                libraryId: 'd9c7a50b-c9fc-4731-828f-0ba737af243e',
                libraryFilename: '6l5ompleuzmvkx5ufam4ufpqsn5rmujd7pp3w8u7jy7ns1m4ihmni13jphkm615e6hzqhjua5ld4tka1a7xpahlw83aswr94nshoczv29gjf2vlnd0j2jtk8y2j7fitpkrcn4wsb9hg1878qufapibueg1q5ro7dtscehjxgxf0swy4wndt1984uoom8iulvc4i51gxeztaljtmnurwy9reb0h7dt7kca4vk5fyxwom5wvpieacsl4yu0anh8ua',
                data: {"foo":";D9qN`1yI}","bar":53389,"bike":"2+,X\"Fi-++","a":"X[Kp<AHMeq","b":69162,"name":"}wo_{K@`[\"","prop":"jG8gKv;@Hi"},
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
                id: 'f11527e5-ff9f-430b-9f91-a17d5cd85cac',
                commonId: '8115eff9-120b-4f34-9188-5c31495fe001',
                langId: '357b6bbf-de71-4a46-8b7a-db6f4010ebed',
                attachableModel: 'ihahoo8mccsvlw0p2shp68jj6xyaya00kgu4q0w40ee69ytrwm89cat44ljd1ut1y4f50p1qylb',
                attachableId: '66825df9-4b1b-424d-a414-f66950db2a0d',
                familyId: 'e465edeb-0d91-45a9-bb03-8d9b8744e644',
                sort: 581084,
                alt: '3dfhlj83nslw67v9nuag4ieuo6sd9iwhu7w487udgag779m90gvfej5yhc8j458fb5y0l2h4i420ejiwb8sv4a3vw5of796fyy0motylk9s1296x2l5tcccfuubwdf82mo6qkd2ilso8f6273xzmb9jze5bkdjyk3dxl9klz5e6l3x6g3qr2o856o7spz6d383l240vltt0tqpcm1n4an43t0ujgr34g1e96fkh8hp7952p7hi93u4dymy0e90k',
                title: '1cjvghtxm8tt5w7e4iynp7qxb3f8q7n9ofxz6kcsolobz60kei28sb5metcksw5aa3rn816ca5xq6h398uyu9ai77bxle5cr935tzsexftm554g36qc53huvpulr7f3q278snl1m7mkjg8908tgqi4oz894b69gv70ynm5ly9mxq5ozbnug1xz4mpmbqcij2qb5xecp6g50n5eigdaxxbpmww6brrz4ci26xqmfchixmbid3bl24chvl2e8yp3h',
                description: 'Necessitatibus et non ad qui. Ad sed sit id itaque. Consequatur quo ut rerum fuga dolor aut. Ullam ratione omnis illo laboriosam velit.',
                excerpt: 'Suscipit qui qui ipsam qui. Adipisci a ab non velit voluptatem sunt voluptatem. Ipsa rem molestiae cupiditate distinctio. Qui est dolores consequatur unde voluptate est voluptas enim. Quaerat labore doloribus aperiam et ducimus.',
                name: 'mtfvzisd1hf3f0j35aeacj5xmef1552txe0vcpt26p3j77ufeh02seompwc4dnwpek6di77gnrihaqda6py58svbnfwlqrdj96gtsiziz1ggequq69ng91lhe0h6418lwwy3nu9j2ogn2gdian49z51eare3guf3wdqbj849s84fxabv7p61npg5jbkwbusanvgh9562ckx90fq2u2cy2c3lf15vhhvpifb2d3v38fck765tphthe33ru264t9m',
                pathname: '0098l705egqnuduzrous83m4t8myuhfw8hmhj9imn2nqa2491irbhmch8bhp0u1vegtjhx6w0okp4wz75ht3ia5zspre8vmugwp6h5nl2espbckq3fimbz9prtgeskg8mo9eqpzr1v7sg63w240rff1o1ck6fxqkfunxx6ialuh86vzls2gxhkqbd3c546j4bq7cuyuk4bjsqnvi3jpk8stprymb43uvpdtg7qufepw641b8llket4zm9omxt7g1giaoh2obulbefd37tz4yila6hx4rduormzdle8wh8ek3qor80nb5b0rt7w3ciwedejwl6vvs5ra8fuuguall94x50o8gt11n8hg7ud8w86xowcuxo49jq3e568oxhlyvx98oumpwbdyj74bdhd7agrnwslrdo3bxcfj7gvzu6kzr5lj36l2jbh38xupm0zmudsddzunak2q7s2h33d3ltdk02f8hhy0fnemja7d9ne4h02t9lpfxm53gfk5kpizrp1krderni5o8mmhqis31dm3qwwof2d4hrzkd65ccpbnns69rmi0qgeldx7ts2vods22huljwpwekt2zummgcuj64smyljglbk9o2ux1uz0ad8pqy8ff826n353qgtul0jjmsdc826sq49j9iuy4w1h1x04aqziq3ytzman5qf2efk82sbiuv5z10zyr9hvgkjlc164619v8sikw67j3rufd7qyvn50gb0a3t1s0gq2gxbdagf3tbgr8ecdm8zbokcljwv1tyxryrekwn3fohrtv7pgerza6sjz1lf11cynofocd22s3mgg6i8t3n42txutdzvfes11jwe85887v42l5mcctn80xl5xdh8nfw43swrsevwgbrypdk9qh8abhmr97huvg00jjwtj4ug89qjzju4yqk51n7eda8qp9k7bfwov463h07y4569ps5m5h2e1wdh024oca01kxjg1r8vukqnz13zl7ryehd1q2mni10q9zav0ylzfz2y8u92unk',
                filename: '6l31unrz2cn0abkn2facsn2k4ynm1wgi4wma7l26tsb6wzqgs4s7haojvtdzptwe03dgc3c7573ynudew6wxewowlxml6d1fpc8wiivjibugagzmm0lu78vp0dye72d0fzy8pvabzy9xp0ts0jq34ztbtosvztoyxkk6i259dhda6iyieqs32auda71tghsghjqc468oebml7z4yeggm78zxtr79v5havgcsfhf8qyf7cq2tgvluce67xdgc2er',
                url: 'm2fn6ks1hyk71dv24pmdk1k0zz3pduxkzr2id1c0o3cp030ff7ws0wojr1s73wix7l6mqeotb03tp1em8kf1rpzkv6h2kis53mmg2tpiltdtejfain3xsvnimv16gl4do8p3dztoxoye0sppb516gzwve2p2z6n4xpo4l85ohzh281kp5xz9uwch4rgzkdvmdzbr6w7ht413gi3cbyif7o1runx1pwu5734m1lqtikcruw1fvxjscksjo65qecahkf6akev0fqgykcbetdgpvt2jf0036by4z0ak6nhxdbyjyadh35e6nps8k9xgcbnc7azoyyaelsscswaht50t9ovg7bfph6247wqevgsmw33t2g5z0rcmkjh311kvcc2bel0xn3jynpk5tpqlahuii16pp1i6sn9pk4drd7ycecyyiwt1rkjt4bthg9cebnolagmoqwyei6r0mlu3o28xxn00vw594oi1sxgxql9ou3anoozmc7gzpm8imt8u93i32tg4ltc2uywss6b7trl6cyc6880rvcrwca059hgg5vba8k8xqo55yxanvdxrd48x33ty3slcp20207pl3sblqhwq9ypk26oy1q0f107e5t6fnjlz6gfmvo8712ydl3sw4noqesr3wk8ocaidlgw4hzp4z89h95uhxru436l903tsrne9zi7vjp6xghy0hk30ueqknl65wxob51a4tli7fbnhw639flpndeyg2fpavgr4kgsxlwelzuwbcayrruf41q8nxfp4tkct20zrw3r5oyw48xqr50xpjgq776blw0zj45yc7kx4p6yha9zz4fquumsgxca3fbwrde7s3g7xw82eekwzz761fgvsrsyp7lr491gohyjltvikt3kicwx6984mol40hhxs0atl7z54rk5f506kpkk8ylghim90k4gpj6wuzaj0xo7phr51hufhwrq0n969ibibhdgrktak7c3p23xgw80j88znvx4b2y95pqpnadwr9mcd426ul6ff',
                mime: 'tmtht6l4me6zd04tb9oh0qth6nvfqvzwygh0q58pd03qk1ljtn',
                extension: 'vydxaw6grcihy17csf5m3fikj2tcxztn1loo5zo0ogf2m3f41p',
                size: 8688812070,
                width: 2265326,
                height: 617117,
                libraryId: '2520f3fe-afea-45cb-9e85-0920de050878',
                libraryFilename: 'diyvjczdeqgocs1j12yoh7hbtsyx8rbtj28m69wstdp9q8iemvg6tc7pvhsl9zx8krxly6idypltiquwet0ybubu866pny7g97asn63on2q7bn3o1iqn89cymx0qzg4wbhvg9821xybdb4j077h9v1mj79pvw56mkaao2ruuivnhxv2snojew5t9ff1i27sxbs2gr5ngkhsi1ktqlrjowz96kjvbkceostfan3ein79chu662uzk4wbi9sy3f4e',
                data: {"foo":"O6&7jPYiI|","bar":66778,"bike":29301,"a":79994,"b":"'h8je;Q'a(","name":"Y;R}?*#oI*","prop":20955},
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
                id: '8ed15d03-bb12-48b4-bc96-0126d940350f',
                commonId: '9b0afe1b-b66c-4273-a87b-adebcecdb2cc',
                langId: '3a11edcb-1140-4401-b59b-392b6ea23714',
                attachableModel: 'u28f0gdvew95e13apbg7q6k0semuz7a3c73fsyivwmmcb8ccmp0ssfje6qf7j0dbfke0mr8lnmy',
                attachableId: '0cdeeaf6-7a5a-441f-80e6-d93025d6da73',
                familyId: '893da589-f89a-4e1e-afb9-85a0581bedc1',
                sort: 823074,
                alt: 'vvu2q470mexmifh0clcvsiflusc0ugwzuzps4db9b7pb84alfwk8pl9mwehnktqiquybrx8afc50ylkpfwgfd2asfks00qutnq83wl2e6vd52q7uyohyoppp7lqkrezuxmfod6848lxqydtpcq394ujhmstsrfizi8c5hsvwlhv0qhms20186dd7plva4wuekqrnnmpoukzj9v7ljclbi4ly904zzc9mnavxj1g91ddp01p4hjaa3s6ptuwre9j',
                title: 'yplw74anxy490knnnbkplto9gh31iuoyuo4y1pgio2u4clvxlxbur34fpys5g7uyd7x0b4usrfgdm9r374g92w7tu249nm77eqwflxu64jcq9y6pnldnjyrgu7hr9xu1rx2la740xassu1wu10a4g48gsmq9ueg9zffr3i3pg4rat7jcdof507ymasulepjr03a6wuqgqldzxxau6yqctr0avmgzq5v09z47zinr335806tdytn2bbb1wqsa6yn',
                description: 'Et ut omnis. Autem voluptatem in dignissimos temporibus nihil id quibusdam cupiditate architecto. Corrupti perspiciatis at adipisci porro et non id enim. Ratione excepturi delectus.',
                excerpt: 'Beatae natus qui. Cumque autem qui maiores quasi. Eligendi nihil necessitatibus ut quo possimus nemo et aut.',
                name: 'eoaglxig5q4e9f4k7pzk5645aalt8nn7e41ua2pnzgifb2vxffxqffokic51vc7id4flbqc33kbhtxnyvdd56ao6tyx2zetanuhwu8oklcysuwwrir40uxaerdtbfq8ne6c729xmywi95n3a4huuto4zdm5xv3l2ot6vcmk1m57kaoq30o4waoz0y4lpnrdzdmrq438o8wt7lepxz5ralveru915me2vcvytpe7lj8kswzt6tq5ef86yhtaxeyo',
                pathname: 'pzp4690ppcwn558c3fjnxr2kagfwtc9n3kjqac9xyn8ch2dy1x9dymui3rteadnlv7z4zzz1q23ttmjwqrgy0fug74hnv9zso656kx0w4cmhs38wzx7srkcrap306qhjqkdtyfgukyvu8augkfn30dacdff4oph52274kyzpcysh9oj6eys3186zymxrngl1xh2ysamurzn4r1cbyw5isnfz24v85d8vng46vxupdwv7ev4pzb6mb4gm0q31t5trga9no41ddgx93r9d7qfg6ruumrhao2danzxfnhp5gmhbfhkcdfoq154h0vfjylh15mm1uqegxuglhicnc2lxns0odn95n8xqbg89r8vjz6tmrf63d4sccyl6wz01srxtbg3jj75j7fh93e2lcvjgy4ysri6epimprhm6i1kobrfcbqxye8j5b2d7z3yvhmvmqe0n7otllzf02zhkeph5x63kveu4l2udvy3l1bzsxwy5rifrttlfoo961pojifb1v4rb4u6xf62as6r8bhixywzvrtx3r03wy4bl0fev1976hc0ljqg2laej3x0rs6m3y2na533abk08qsdazdzrxz1unpye3mvh3a2o5du46mwwxb4syosqqt0j00xw1bhifd3fgbpr8204k7sdflredkt43xwyilddjdfo5k58a464t4hv3jf0waoi8ziadptwak08qw5qo60q0gd8c3jlo2rxsfmadasakzrtnztid98fhm0bnfb3fz7io46jo0zl8imtaaxjjty6a3iwk6lafy80dtlc2h5t263cyglhjs9jsy3jmwxie7bbk7wks96syfnjr80400mythlwrrs473h0fshvo4cxi1scd530t9z650zube2ubacqw7t8gp6q208bnzsg7bwwogimkvj103wt48lie4dk4u0seye7hm13yn3en3t93gj372m84q1fhxy8ji2jpt5aek3mzqr6yhzky1nw0e4p3g744thu9wvqsd5vlnexce9o0pzsh812',
                filename: 'b9nqzix8dz3efg2l8zugoh3umdtklku8rnf4e0zpd199ieholwyey2il1f2dae9onfa8ssadrtgg9w5pmrhyjjmoimpjbfpqy0rxmbvdpwutm319ti1vy423rvq9pwfqggx0mpe83dys12oe5ofhy6pb76fww4cezhrhywyv0ec20usprnrwr8t2re83c2la7l66baz5g71y3vf0x4z8qi2thr2tx1jflsf7yzu1g4tatec9ckwv88onofrd7rj',
                url: 'm92bg4az7ptscrmq3jio9nyqx6kh6qrs2yxm41p5dp0kdv28lpbed9jssqlvo4xd632yrbdur0q701qx6wqe7e5x9zbzxmm4lt110wcqwtz2ti3c4u2bizsrp5ssa6492o7i8l4va2cmoa9arw3m2rzip8o8q2t31tk1czpy7gpxjjmj40s1rkkmctuqn6157r9nihz48dlzi90z7f7ra38mvmre3vbd7i3hkyhmd8or8tqerv4l39u1wa90p91on3sl6s27nyov3tmgymdmd0piunh4533cyqne8y41tiesibg1ma5oiz2rdnf1h92otjoahphtvadth1b2gkglzl7u5o2f1lw98yq4oq8it0bu68w7zgu13lrfpktwm6fwzcsekwa5ng8v955apm43qecwzrdiwm71abrod1zd0gxvv6500zui83pdtnt8zy3sl6kcdudpbklahswfugv74fpzh4usfgjbdfm431aligktk1df9oldy2llqzlxqutjbu47bxpjl03pl75s13j8ruvosn92dq0b29jsfzqmwprpvig6oytzf1m9lx6h3jnmh89i8jqya5ij9lzg4dmb8sytpzfg8xchvk5t7r9cqsxd22np14xl8y86jyi67ynhizfrhm50tw31eljjg92xcv8zhusbznca3iwkavprsm3szr7ggrkf0oogpgvvedgk2lbhcc2jz6jgtsk1d73g2zfkmlqmmnryxk8dpskx07rh37icuneod8r8350n3kssl67ysifeakkd9bwojgp95k2fqu9ixixh7yxnoypvoun8iy9vhw3tbr9nyg1y2yuawvp9v941c0igt192rsj196991iwffdnmk06843yg5tdux5ihq0jrd5rrfhyf1p026cnceps81clwajcyzpa0g395djrdlpdykpyw10sm4kay6hocym8sutp2iux5fqqomq01fid0np645kbqd4xy4i8ykba4yu9av1dlvg0hhtaetwak504ruhfp24nawap0',
                mime: 'c33h08u1p2jylok3x0s2hrcxntx8uwwilxistp2m435ncv4n0e',
                extension: '3noc1dmajywdx3ty3pjiloe9j3s3zbg9fyt7pvcs0ch2xviqq1',
                size: 8941348997,
                width: 966856,
                height: 2589312,
                libraryId: 'd2d6c524-00ae-436c-ad02-f75c635039b9',
                libraryFilename: 'a4n201ecoa0gktpyq9yvbhb7tpol7kw6euqewakdcte7yvu7bbk47pj6hg5s0y98pnbxkv38ognvstmnqjobeoo8098cysl18jqydo33mqyyhs2z76nj9gdfryk3x4ipa5obag61u5tdbhlef9mcidofrlk639l1so82pfz0b98plii1wifeypxbq21ensad1enxys5n80gcxpmxrojlab30er2dvs0ecu7bwnfzla3mqrowxuknrm6s4k437th',
                data: {"foo":"{.T!9geq`c","bar":"([8;p8fkh(","bike":"9SUu2*Y_rn","a":",F:}Z4c&i%","b":4116,"name":"9WPy4(i7iw","prop":"QYmv?GUd{/"},
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
                id: '09e70e02-03ed-4c6d-b43d-0d32e2ca50e9',
                commonId: '08b83a30-31b5-4f97-a00f-b6b7296b4b02',
                langId: '513fae34-c63f-4c16-9711-01e3db05ea7f',
                attachableModel: 'o9e5gt618uyi0n5ahifuqk2h3udx3prk9og7y56y0scf5tozg79co6tsf8kk8jvydaa6kx7jnn0',
                attachableId: '409fa5d3-04d6-4eec-8305-4ac1a3b0570d',
                familyId: 'f4a577a9-6ba2-401f-99ad-b1f0795fbc6a',
                sort: 248732,
                alt: 'iprednrb5u878ptjg7y3c9nlw1ztvpwj9nr96eps3wdgrjrz75vur0yw66xl55es72yrc97308c7x5pcwbe08zskf9zxsvg8r5998cgmkjlw76tldjw2c85x1xphcm1ay08rz31stgygd8fw5oi347d6leuxlzvboxgeho3t9jufu3rjaqutyjujdl6s96pl1oso7az09y4bedk7ywi4yxhb5oewj05tmuqo9sjhwu5x329ki8c95mqk8u9quf5',
                title: '22tz4n2nbjkwilzc2ugzasxj0oezfa0mx9eh1tj20vx67m6cmrfbrdmvpxkxj6zxpyhevoduyb9ytx5i2i5n0b2zhbdj2q0zv06p7bz1gy5r6g7wxvcsp9gmyhyhj4phg5yxpygn1pvs47f7a6s2ng9mnqxxfhrmvq1ryxrlikrsur6jvie18p2mjoxrek52cyqok501kzecmisbkiclfad8eugn0vnjadzvouxw99jszr8d6ifetdi7sp1506h',
                description: 'Qui aut nulla maiores assumenda consequuntur. Sit autem similique qui. Dolorem qui aut porro. Et consequatur quia laudantium ratione id. Est nihil qui voluptatum enim perspiciatis est et.',
                excerpt: 'Officia repellendus dolor quis ducimus modi. Quia quidem dolore distinctio cumque iste dicta minus quia. Ea excepturi distinctio dolor velit dolor unde. Iusto et id voluptatem ut nesciunt mollitia. Enim voluptatum tenetur doloribus voluptatem.',
                name: '28nks9te0ot7lc74d6i9vwy696pp77g61q70r3z6scf29y15hawvpec4rchplzyby5beh1zqh47mxuegp47cyv6d5yzn0we5fhoqozrn67w0uxnsi3g5xc7ulrzojejho0wv61s7lvjq2oheakioilyuygemmta9t8tnmppvrwya6s5vzx1ho8v9mia2wvu4t1yvuycosn7zr4j0fpz3n7xp31way8v0jq7kdswk429ylc8df70q9j9bu7jqo1p',
                pathname: 'muc91vf9fwr4y508rg22soo6wu4ftl33ezih7s1o5wxaludwdjuchltw5svg078xn4nlq7mf2ltwirg4u0tuyripb752n1uq7mvee67dhn62vl1dnu6w6zn2butv3y77cbhcsxry9ee7bdiizug965323iy2n5ilu2fyn3bvkpj4ge1wjsgtzyd3k13lrcldec9u23tzca65ef06cncn4jo2cx3qpiz1cft1mdqbzren9270y2usbd2twyd36tg71hfx2gauzclsmzbk9lwp62mqkn569u3069ihdl5xn74a07y613vq9432mcuqpcrf2c8r84zzm9ju51z05xbmb4kvitpmcgwx3vmmnkqoioy2h27plnun6i80plmc7913hvjoexnkqr1xpe00s5yyhoe6iv4a3l081oiu0nxwrnejfnvb2ajfojr2cplwgap51r5hejel1ao5ufbvm1x1o0wkasyv441v2385nbesbml1lwvg10eoddkkapb07srh0uyd5g5hqmls514ybzot9wvg9d4jgp4zcowlxgvcxp3vmgy2m8adcxtxghjb42qkdctmnp639cvavv3umye0jn24rvlal0b3g1zibht1h4g557kezxx5tcpnkdok43wk4ard1h6t6s54rayzv2xfsdh6g73ysk4yz9u12m737r2of12a5n98xg134cknwrmhvcjvvbuspf83pofbnfyc72r8amk4b1ne3mosvnwn4lyh9bew9zjwheg64rvblrp2k78ynawmus1xlli7wtvp6slou4mbejwxkcjk0ezq022keekea2gok1bhqetbsmdk9j5i0vb6mnvvwnwtscwsbde4ombjmrh0e951r97ww6sqrjcb28l855tpk7trrtc29hcw03y7t9ppox51no3mi8abxhaunx9ctlo4wc98flhscf9jlul9b83en41fsem0uhvxu7zt1kbvfgrorha16gpx6u7ei85xcyx9msnzoywjyrk8rdxa0g44iwatpxs9',
                filename: '9yw960gj0hark9fgo9i8m2lx5g4q4iat26o8r46k3avdjgga49vxy3sxl3owq8yjlhiw0sdwb9dnqhm6y95fmgoh9lnnyuxx8l26optsk74mhyje5rrb24brx4v85xbk38grpt5zfr01h58m3v1mgnk6ncsimz77qx354co6kvz5h51dg2o9o9tnsg3gtswxhv2pp1gojfwgurhkj2247hvetyccxwjhlcizv8yf6n46bwtm2wtvem3ojlkm20d',
                url: '8x55yklwtcmd149fswk78pleuu92joh4eb8re92xnmpma8967xdpxlmq6y9z1ordrlxl3iknebvz39kk8k96op3nz41otqbwmr9amyc5aitt9ozau3tu9euhgcbg1ijmh0gp5322t7ed1ehphhl0m810beqqu2dbq3jiagf09erbx7wejylhty8fywto29y55lth8wdg0pzoibdi2e2upfcimrfgtw6codcuys2zk4jugsvc9r3otzoasghxq5nmmplrkzifl8ofi0z8i8w535za9x9hjxrash1zrkw382aielgds639qxg4id1gary6dulquhw4hfy078oqrkitmqczkkvmc6mlk048rn3xoidy3wn3bbeckdmw1xvuv92aldmnmy2inb1i5vj4mwifbkkibfkqztpwajvvz1zvtj115k3pdgcd9ok3mpcq1vyepsxh53dr73v3m2l30dq1yvdcbe6izj50fajmxmtz8xl9bmstrafcj98lhqts3hgwqtsnbgllq7b0848jzhh69x6m67wweklpoeals41wx3xazbb1fiupwob11hvqcqzz2agac9n9itcrlsvugwi0bhb07gnvayuqrw3t8k26lr6oyi7q75628qfkusnqgehq935kso8cln8cc4ekef435bag3gqxuz5axjbmr0znqjfaat8h2jz9dd0qwea0sjbmfmqfwa670p2qh9cni3t39ljwpqp01g6g3p01fc6cw4x4cr8dtxathbxh82gcrlkhgvis0xlqcny9edgxz67gkh7vrcnxx0yckk0un4w6w1n8ijjmf975qif3y6adltvr4993rpyyhxg40t1r5zzn2ytyj6micn6wevnizw18nd1kc7bzjfze1d5kf8mll10wwhbbcmrbaykio9sw6m3gc237sd4bc7d3fwfg9ljexj6kizbe5dsthhsktyp6bsy0drur1sexshpjq0rb1w8g355q50za7jq67eomotbwbdqq5nf1hzobgsviuoscdn2v',
                mime: 'cw8zvijjw3c6j34p65yc3ryapn310hq1grd6nakx3nm3r6bn2v',
                extension: '30ddqrsnlmq30n0hq19fhb3us6y40ov2wfu2won6huq86eh8az',
                size: 1214064961,
                width: 875681,
                height: 410095,
                libraryId: '5721fe9d-bfe9-43f8-8e73-226d25a1b1d6',
                libraryFilename: 'iwa0hmmwwcgyycrj76rkanp1ubug5f7c2r83f3avpjbvvf4bo1hhc39mujbi7jic2y7a796umfdzk6g3xfu09w7q2gs6v2luqo9v168trlhjqr34pg9e6ea5lpild5qw73aayekaxsp01y7x7rljiuees9bxaiudhpk288c57xeqitcv2k2nygjluopuub22phms1d2dhakcu8pyoxeb7gbywqwf0fztfa7r4rf2d8yhemh5wzj7k38p261e3x8j',
                data: {"foo":"&F0!l@*3Oy","bar":"@t:b]=zo&?","bike":"Ie_0zSfJ.I","a":86197,"b":"yP4iTniBMy","name":"_Pf4mQ78[3","prop":81282},
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
                id: '4c9e7ac8-389c-4a86-b36e-1f9f0df9b130',
                commonId: '4bef1950-b1a6-4f89-8340-0a86843b8b56',
                langId: 'f3cb69eb-fa71-41fa-98cc-90a0d52a8ea5',
                attachableModel: '451cyk53w1c7hl72am5uk83rffx97xmhk67bd4cnwv35bf0dpcfyrbnsyjtjx1n9t0napm17zj8',
                attachableId: '3274eb26-3646-4679-a482-22640a2126c2',
                familyId: 'ab58b024-b770-4025-ae47-0d12679f2319',
                sort: 498551,
                alt: 'j1a3em7hkhzhsai8d15p7uursr3aot7kiv72oah2h5hgwwhy3vsq0f2w80a6w2z5csulv3jzsijr9853cesgqf6ea3jgmllt244cmpmqa1i6g6xvwa4jln6353pk5uc7spq2h5nd8mlhrrsoeckoekuo4auf758dctfuxh28xx1uknwgxvnn71id5qesitjtxj88o6kmsprq2gm8kty1nm390jitvsqcmkpc1s7sbs1no26tcjo61cffw173jiu',
                title: '4jahzikc3un03siph1r374j4s1nclrs63mkjytsw074xlcj4jaw0f9tcobk1fop9lyhipn6po8msyxajshnxtwrkdi104es26vi6mg0dx46rb3xpjk7f3ghcpwwyh7ddpk8gtfneqo2wnkxb5b9g4e1bzfxe3mgtll3knbeshob9w6xcf9inh6dom5b4ofoexa59rlyo7ze61x2fk9k0e4n8wi466moxyrici8w20pxjj43j8t61amu93a9prq6',
                description: 'Aut quod ut molestiae ducimus distinctio et assumenda. Vel tenetur harum assumenda nesciunt quas ipsum. Amet ut consectetur excepturi est. Consequatur qui ad id tempora.',
                excerpt: 'Magnam eum corrupti cumque ipsum. Beatae expedita architecto est non tenetur sunt est ut est. Velit quae perferendis adipisci vel pariatur cum sint nihil sed.',
                name: '28x1s4b6ka7nyhrj6hlglca03xi14j06jk6oabh6rjj1dewmx8lu80ry7ce9svn1747rxqwy5yy05ikg9dyqfpd7e8y4q12o6yp4ea6xkq5xbs79iij0hof1xz36u7sf7vasvuw27z4mc7eaqvy18xu2s462jm0so4qigipxof7fnj5oik9y0xlvm3adp4zdhn3eakcpzze0yoxib1idipfvdwcbjkvvpiujpf45p5azttzihq3avewtnlrq15a',
                pathname: 'mzkc29b5d79pbhdr4ajhhr2wo786ewjig8maqxq89jy9jx21lg1scve9ftck8207perv0wcpvl0quish278v6h6j3j6d8ztu7rzf273j951o86f00uc1hw1i4hvcgt1z53tq47l0mthcwkihnplr85o9y39r16q1h2p67mqhq0z571jngfrgdexz89kgjujuviveiodba1qlmunf9n5u2smpz3ylt9m40g2909xbu74oti3hdug9ynxacyb7quzsfkmk5kvbstxj2fn53a4yxi3ehjsvnsuasxn0md6rcgpuhue49gm02tsjc1hwelmshh1md59uwas4aanr4nsihac9wvs4jg2dqk5u3bnq6vtxvgq69hwduvilswphx08tvy2w6hm0nnkpjt48pcr51of19iyz2465dzl42r2tnivd6hf7x0y5sxjd88btr8dbwodam6llag8nktaihrwyt35i6lrhj52c7nnprrncvy2jkmbtdujesnsnsff8ujdrxk1757zj91xwpbtf3q2w1ff87wh9ulpk84ck3y028tmys4msnu0a639cykqxyj3zirvuhl5kzkwyt9f6lawclds8v8s0mw986w2qfgjjqmes1su739zb6o1bwjehjm4tcc6ryyiyqo0tb7mb2huzylpf3xliamxtuil9fzezyfywh4vv5m2ni4j9hh25g9suhyjgardipp5aogwe6vwqzjzxbci95kw5jm99ym77exr1ni9eb2oqp12dpyo1shsy0wy50jtxoetiloj310gkz4if0hjbluce419m2xnw5qfdxcai2pgp4cqw4ujc0gxwmxlclw5np2uaoiy0hnk57d7xx9dcnz4j7wer0xe2krytlpjy0e2eklxo5gvlcdltxxb0ego666x1rb08g7zywbmmrmlk0kc1su40fv7k9ci0ddlpl5vetnj0ku3kqi8mbympk4tcj7rk3gg2axwb5vdpzrbyxe3h0xcxtabc9r20q2ruktko7zn3sm85c6g1',
                filename: 'p6dj2yskcarw8k84zc53d1fcm5eir7z1v7i57zileorkpy91082imtl5oyegkcspl5ga680m58fcqxe6by0kl8vleblu5ecotu70q4vzvdr5mbb833luekty30g384lbfnwylw9gppyfjh8syo2icjugpy1pllyfkpy3sm0bwerisc3nbhit8m5q7l1lu8nwi2t3x4wp37nib8nn0q19kk1zm20p0eoeapgeqmj6jnk6n5audakgi5pesn787w2',
                url: 'dzllkinc9s3hbkey7qbps5ln5qw1r2e1zu0j3xne4t8nudklu3ztm791irnbqup09s1u436dgj9w2zvvijklzpt5ech7ofeyum7tlrumq00sb5aba01a3yuihzevl66s2y43ipfybv3fu9oks5ypyg5l0rlnd46z2qjw4xvi8jz0oejhiuhetohzpfivhva8m58flxm23ppntm8q9mh9iguj2nj6qvnr4druq0h0pzbr017nugqbg0ut09a6qh0gf9t5dtjdewjro2hsc7b6kn14emwk1bytv5wzb069g0q0qsysyq4pyejlvut2e9rvsgzyitfe38mf050w61io40oa742tea6mn9044cya93qezww342ee03rujyqen386s1k139ncitu5j2lij7zago1yetwx9qap9xk80ti2r6oikb0rp3mzvgbkom2us3vjb56em2qum0c75t499r3c80dfpttp2yneyaom7cthg3wjyykcompzf4y3kgblvbs9x8hdeagso35c3k89iap5rpc0554kpbx8pe6kcf690m8wuzefnlbnuht36clga7khkb7y2td9wxn72vknlc9eetv6mcabvhl5wzfrkz8w8jfd1riwybxi22rer0on8bm9xsvgl6jer4gmbbtsatuz55lhi05s8gtt920mfwtgh8xogx89whghtzpzn8tp002aejepd6kxddymwmavzwhc3v2a7ezwyfnjwnf94vrgmoi9wgy0bmrj3h7tyntvygiwn0wytusiacfddzfher17ssxkeaouoi0psgybg794brj96e9w1prcjr0ya5hf8p7d6kmwbhy6m74q4qc481vyx1gjl9b85brywm17jt1p8gcwyr69pbefnncmu7ie30ayz4t3a22g2uy0f03ylv9emy04477e01uwrpp9q7odtnkx7mrfuttm47vilqql1zg2g35o94uca8tmkcthx8kynwgy7tu55x2vdzu1m20wco51hzsxwu0vngh4jnv8b7xz',
                mime: 'uap805zujdfdcpld5w5a8d3hh40smqwsaniqg8j9q8uwmz2ald',
                extension: '6924wkufvbmr4vxv71p61xq9qiacnblnv2a3oc1y80my5u48re',
                size: -9,
                width: 435857,
                height: 245979,
                libraryId: 'fdbae6a5-cb0f-42b8-815d-1faef7fc1fb1',
                libraryFilename: 'igoqcart1v2jisbvqwvy4zzxf8gb7jgmsgzc9ql8d821v48z8sb89lipn0ved986fur1uo9ontdn0z3upm2c8xcjg75tn4mqea9t8crn32fkcu5fx03da5kr27moiijwmygpneo8ptj8zspjr1fdgxad368jymam59r0qtaj28jf9twdlldsw0as9vb0zqb7ctju48c6brbjs9xw2eerset37aggkc8be6n9dhcjpd9wqi3wqj5rtu2pcvfkzhq',
                data: {"foo":23479,"bar":94649,"bike":"R6f66:\\?L!","a":41717,"b":1005,"name":32667,"prop":"mw.8+S{2s$"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentSize must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                commonId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                langId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                attachableModel: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6ie',
                attachableId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                familyId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                sort: 850845,
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
                size: 8495199375,
                width: 509053,
                height: 364477,
                libraryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                libraryFilename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(201);
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
                total   : repository.collectionResponse.length,
                count   : repository.collectionResponse.length,
                rows    : repository.collectionResponse.slice(0, 5)
            });
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
                        id: '18ab91e4-2555-4b69-8536-79efb2c0d12a'
                    }
                }
            })
            .expect(404);
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
            .expect(repository.collectionResponse.find(item => item.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/d4157bcc-ec64-41aa-b8a3-ae9c2a9935d3')
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
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET admin/attachments`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachments')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                commonId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                langId: 'c5a9a341-abe0-497f-9b71-d1e1b4c58473',
                attachableModel: '4h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn28',
                attachableId: '0f9065c3-5331-4eb3-a148-b0920120e4cd',
                familyId: '37edb5e7-4609-4ea7-a69b-75d695bca6fc',
                sort: 546896,
                alt: 'hp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4',
                title: 'akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4',
                description: 'Aut voluptatem minima non numquam. Rem eos et occaecati qui. Voluptas eum vitae consectetur et quas. Et rem saepe vel fuga qui.',
                excerpt: 'Deleniti pariatur vel consequuntur praesentium vero. Quibusdam dolores non qui natus minus. Quam dolorum id excepturi id in pariatur doloribus eveniet non. Et et et minus reprehenderit enim aut. Inventore enim placeat dolorum quas tenetur rerum voluptatem et nam.',
                name: 'zeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4moj',
                pathname: 'ykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokda',
                filename: 'x2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2g',
                url: 'nbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog66bxf6rzih1co0zrwmjkki9n0xafrh2tts2ar26nvhfkoolce3bf4nexrel1vcoekekzvv1jjhs9u4hfsdddm8a39ppv7xyaqfei961o369koum4imkc1rwsnb9udmb00415h2uwz7a70e309ux0etr9w04q0qhgr1q7xyavsxfmvtbul7chommvhfzwfi9lvwdsaqvbzknq6maqnsq25wy0mfgd0f2k115ic61q8pv27rolnkrburd6bu4lqfhbti9hdp863ipefk7u4y3r9eq1g5v533zqn2d3nckwn48lxkgpbbhemaoidurn08vcel26a4aarh150mtkezyia1iv9wz3jaxq3p8k3gk777c3pip5oa2t18jfxy91m5yjzzub21i7rudhhrx9h6mdk15q3b1xl8o6isub1nvd2sjanjdxnzy6w5xf0mslm3oo200c2burdu2hzb86dv8bz89y203r4lz15ox4syb1otjzbxr9rl5ys1tbh1sm9qjea15x7pg5p7hciz7rlqb8vxznizh7s4opar59gc6lpgvr297siy3265w1v2vtn6kwoe948o67j371bj5umen4uem0vfq56fqgfuedaosd98bn5sgja46113tk4uunvynd3frv6jzguefgic7mf1litwap9qwrwqkhf6brghmg60gp852jo45q9rtqs91wrs9hices2f07iqddtgfm4d1n1x8rxot6mq4z51hblu578t7n0ufrm2480vd51tl3vld5avxhioook57742o1sx4qzxwx5cxgh5o7w',
                mime: 'cw9m2ove6nku7nm5lgfh3eakk1auiq0xkhtklhp71tkkh6adt4',
                extension: 'aahkksvs7guhp70srcvzkkmlu8ykwen9458cyet0f5mddj2auk',
                size: 4548626165,
                width: 145588,
                height: 242291,
                libraryId: '7cf37fb7-b63b-49bc-accf-aae6c3abb43d',
                libraryFilename: 'qmrnfh8us571ankn4ia4nw80fzvzrtg8auyirunqjrpm241k2gozmljs9ngt8aw4owofccs4nqyyx5hoj1bx9puuwxqlb2dr41buy2whe59op1lzvhmsuvw2qefw8hvrad1pqrngmyos6r678dbgjooxjv7k37xxwapq77ouufx9rhbvlmw3qs1213eaoo19xvstcefqfyiyro60vfc347tdhmpkgmuvs0s2rl2rw8h8fvenog3akipxip0rxxh',
                data: {"foo":"P49va-?%r\"","bar":"5wc=7EXa]@","bike":32896,"a":"9/{0Y\\NAfZ","b":94339,"name":177,"prop":61656},
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
                commonId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                langId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                attachableModel: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6ie',
                attachableId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                familyId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                sort: 769861,
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
                size: 4640717841,
                width: 234865,
                height: 686309,
                libraryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                libraryFilename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/6bef23fd-4f9a-47b0-84dd-a4a9c7acdb6d')
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
                            commonId
                            langId
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
                            commonId
                            langId
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
                        id: '1054af96-bede-4d16-991a-95dd2d8ba322',
                        commonId: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        langId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        attachableModel: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tb',
                        attachableId: '6085f6fe-5991-430f-bdf0-96b0633afa03',
                        familyId: '0f9065c3-5331-4eb3-a148-b0920120e4cd',
                        sort: 792146,
                        alt: '7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g',
                        title: '9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngp',
                        description: 'Ad dolores officia cupiditate quaerat enim voluptatum expedita. Quaerat omnis expedita voluptas expedita. Qui ea blanditiis incidunt sint. Culpa nemo rem a esse delectus omnis.',
                        excerpt: 'Suscipit aut voluptatem minima non numquam. Rem eos et occaecati qui. Voluptas eum vitae consectetur et quas.',
                        name: 'hmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg7',
                        pathname: '2vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiq',
                        filename: 'ozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yo',
                        url: 'yaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog66bxf6rzih1co0zrwmjkki9n0xafrh2tts2ar26nvhfkoolce3bf4nexrel1vcoekekzvv1jjhs9u4hfsdddm8a39ppv7xyaqfei961o369koum4imkc1rwsnb9udmb00415h2uwz7a70e309ux0etr9w04q0qhgr1q7xyavsxfmvtbul7chommvhfzwfi9lvwdsaqvbzknq6maqnsq25wy0mfgd0f2k115ic61q8pv27rolnkrburd6bu4lqfhbti9hdp863ipefk7u4y3r9eq1g5v533zqn2d3nckwn48lxkgpbbhemaoidurn08vcel26a4aarh150mtkezyia1iv9wz3jaxq3p8k3gk777c3pip5oa2t18jfxy91m5yjzzub21i7rudhhrx9h6mdk15q3b1xl8o6isub1nvd2sjanjdxnzy6w5xf0mslm3oo200c2burdu2hzb86dv8bz89y203r4lz15ox4syb1otjzbxr9rl5ys1tbh1sm9qjea15x7pg5p7hciz7rlqb8vxznizh7s4opar59gc6lpgvr297siy3265w1v2vtn6kwoe948o67j371bj5umen4uem0vfq56fqgfuedaosd98bn5sgja46113tk4uunvynd3frv6jzguefgic7mf1litwap9qwrwqkhf6brghmg60gp852jo45q9rtqs91wrs9hices2f07iqddtgfm4d1n1x8rxot6mq4z51hblu578t7n0',
                        mime: 'ufrm2480vd51tl3vld5avxhioook57742o1sx4qzxwx5cxgh5o',
                        extension: '7wcw9m2ove6nku7nm5lgfh3eakk1auiq0xkhtklhp71tkkh6ad',
                        size: 6963588971,
                        width: 301658,
                        height: 155520,
                        libraryId: 'd144799c-dc37-4d7b-b0cc-5ef98a9d3f9e',
                        libraryFilename: 'en9458cyet0f5mddj2aukgrx8hyqhqd6qlprxssxoowdr7mqpb8uqmrnfh8us571ankn4ia4nw80fzvzrtg8auyirunqjrpm241k2gozmljs9ngt8aw4owofccs4nqyyx5hoj1bx9puuwxqlb2dr41buy2whe59op1lzvhmsuvw2qefw8hvrad1pqrngmyos6r678dbgjooxjv7k37xxwapq77ouufx9rhbvlmw3qs1213eaoo19xvstcefqfyi',
                        data: {"foo":"g`2\"qHB)+5","bar":"BNZaTKZpri","bike":78136,"a":77042,"b":"(hu7N6IrG]","name":"L*;VObwQc!","prop":"wvMcP49va-"},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', '1054af96-bede-4d16-991a-95dd2d8ba322');
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
                expect(res.body.data.adminPaginateAttachments.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
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
                            commonId
                            langId
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
                            id: 'd1fd0870-6bf7-4492-a495-c78fb1512eec'
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
                            commonId
                            langId
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
                            commonId
                            langId
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
                    id: 'fb6ae348-eb0f-4f11-9668-12d86a3e6735'
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
                            commonId
                            langId
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
                            commonId
                            langId
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
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
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
                            commonId
                            langId
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
                        commonId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        langId: 'c5a9a341-abe0-497f-9b71-d1e1b4c58473',
                        attachableModel: '4h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn28',
                        attachableId: '0f9065c3-5331-4eb3-a148-b0920120e4cd',
                        familyId: '37edb5e7-4609-4ea7-a69b-75d695bca6fc',
                        sort: 726417,
                        alt: 'hp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4',
                        title: 'akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4',
                        description: 'Aut voluptatem minima non numquam. Rem eos et occaecati qui. Voluptas eum vitae consectetur et quas. Et rem saepe vel fuga qui.',
                        excerpt: 'Deleniti pariatur vel consequuntur praesentium vero. Quibusdam dolores non qui natus minus. Quam dolorum id excepturi id in pariatur doloribus eveniet non. Et et et minus reprehenderit enim aut. Inventore enim placeat dolorum quas tenetur rerum voluptatem et nam.',
                        name: 'zeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4moj',
                        pathname: 'ykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokda',
                        filename: 'x2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2g',
                        url: 'nbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog66bxf6rzih1co0zrwmjkki9n0xafrh2tts2ar26nvhfkoolce3bf4nexrel1vcoekekzvv1jjhs9u4hfsdddm8a39ppv7xyaqfei961o369koum4imkc1rwsnb9udmb00415h2uwz7a70e309ux0etr9w04q0qhgr1q7xyavsxfmvtbul7chommvhfzwfi9lvwdsaqvbzknq6maqnsq25wy0mfgd0f2k115ic61q8pv27rolnkrburd6bu4lqfhbti9hdp863ipefk7u4y3r9eq1g5v533zqn2d3nckwn48lxkgpbbhemaoidurn08vcel26a4aarh150mtkezyia1iv9wz3jaxq3p8k3gk777c3pip5oa2t18jfxy91m5yjzzub21i7rudhhrx9h6mdk15q3b1xl8o6isub1nvd2sjanjdxnzy6w5xf0mslm3oo200c2burdu2hzb86dv8bz89y203r4lz15ox4syb1otjzbxr9rl5ys1tbh1sm9qjea15x7pg5p7hciz7rlqb8vxznizh7s4opar59gc6lpgvr297siy3265w1v2vtn6kwoe948o67j371bj5umen4uem0vfq56fqgfuedaosd98bn5sgja46113tk4uunvynd3frv6jzguefgic7mf1litwap9qwrwqkhf6brghmg60gp852jo45q9rtqs91wrs9hices2f07iqddtgfm4d1n1x8rxot6mq4z51hblu578t7n0ufrm2480vd51tl3vld5avxhioook57742o1sx4qzxwx5cxgh5o7w',
                        mime: 'cw9m2ove6nku7nm5lgfh3eakk1auiq0xkhtklhp71tkkh6adt4',
                        extension: 'aahkksvs7guhp70srcvzkkmlu8ykwen9458cyet0f5mddj2auk',
                        size: 8584454982,
                        width: 247815,
                        height: 214085,
                        libraryId: '7cf37fb7-b63b-49bc-accf-aae6c3abb43d',
                        libraryFilename: 'qmrnfh8us571ankn4ia4nw80fzvzrtg8auyirunqjrpm241k2gozmljs9ngt8aw4owofccs4nqyyx5hoj1bx9puuwxqlb2dr41buy2whe59op1lzvhmsuvw2qefw8hvrad1pqrngmyos6r678dbgjooxjv7k37xxwapq77ouufx9rhbvlmw3qs1213eaoo19xvstcefqfyiyro60vfc347tdhmpkgmuvs0s2rl2rw8h8fvenog3akipxip0rxxh',
                        data: {"foo":"P49va-?%r\"","bar":"5wc=7EXa]@","bike":32896,"a":"9/{0Y\\NAfZ","b":94339,"name":177,"prop":61656},
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
                            commonId
                            langId
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
                        commonId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        langId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        attachableModel: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6ie',
                        attachableId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        familyId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        sort: 827762,
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
                        size: 9467614902,
                        width: 122438,
                        height: 704084,
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
                            commonId
                            langId
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
                    id: 'c016d9d1-05e6-42e0-8b2e-27fe3bd407af'
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
                            commonId
                            langId
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