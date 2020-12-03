import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IPartnerRepository } from '@hades/origen/partner/domain/partner.repository';
import { MockPartnerRepository } from '@hades/origen/partner/infrastructure/mock/mock-partner.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OrigenModule } from './../../../src/apps/origen/origen.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('partner', () =>
{
    let app: INestApplication;
    let repository: MockPartnerRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OrigenModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IPartnerRepository)
            .useClass(MockPartnerRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockPartnerRepository>module.get<IPartnerRepository>(IPartnerRepository);

        await app.init();
    });

    test(`/REST:POST origen/partner - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'a6vo6xbfa1d4vqeiyb1j34p9nlntonpyl7woknjws7dti3jjd6ja20db7jwwe0z4deiq0bdhk8tx4uv9vwxrplu3etsy9okpuoz8hq5cl05asorbio5owfopb98wpzua2dlb64auoav781nzflumrf65gzigr6iadiffi7te4fx37pny9yzj82xzj0gccba8rwpwnakyjmfeefzb5asv8ep45bhrw7xi6lc6acfiglxadlbmoufiyinnivdgemz',
                socialNetworks: { "foo" : "bar" },
                description: 'Maiores molestiae aut. At sed modi animi magnam. Quia quo expedita aut aperiam expedita ut.',
                excerpt: 'Id sapiente dolores et. Neque reprehenderit sit consectetur ut totam praesentium voluptas. Consequuntur quis praesentium. Rerum quia nostrum tempora saepe voluptatem.',
                email: 'jsdrey3e5ppl0x7dop3l5qphyd5iqj23ubqg27ruxi6nwnthyb7174cgf0dj1fvroezvpoy24ef5eug3b1vjw8yubhk9njdbb9pf2wk54z2b7brsa0reknly',
                phone: 'm7o9jxaf4zboi7eg5m08x0q4bc1o0hnudeik8c286njrvp8fr1isva7zmfmk57rlnwzmg68z57e67i96jbby47q94k5rnlw6gxacxo1asws5u9ch7yhrxet2',
                fax: '5dvhhbe8petwxc210mb5qtfnfuj3922q75rnxbk749fpaue14np5f012jy3ghuf86q9sau12mvwndmmspcilqw2b5e5k4tz3g204gxw5pvh4bui1e9dprzb1',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: '4np3e4gfxn',
                locality: 'vypspxbtiykp4rnqdpxjl9tylyy431injdb75j8w71osf6dktr6rq7hew6mv9zs3rve6cyo2cr4j5zm7jjpi3qkj8ic7j75mwfhqwvxexza1p0gjfm27zfgrg68gw',
                address: 'j0qqthpp038unap1go4xmxxs0ln52wobbr0o7pp42eck0z3y4xyf95ts9ehcmgnlzvvtq0mz80dtmwopycmnlz0xj4oi07ktywr1w5u10cgzdbmu433zz4uz4wx0kmac5i2dh633ov3nd9zvqa2p5of7x6aqtfh1mppz2uhgcvvmk6dcbiv84ecqzs6fj5d92kzqad8jmqzt2n1mw0dg3z2n4idz03olecjknxgtp8p7g5lssvkedirol8n7m1v',
                latitude: 66.74,
                longitude: 46.62,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerId must be defined, can not be null');
            });
    });

    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                
                name: '0c7qzthwuso2wdauaqw62et9ca77ta9hu5wffvb1d4lbampc9kxiu18lwmno9teqe4c8hsob6n0o8rlo580a59ttm7r0a7oz89uh07qswkyd2nhoinuzz3x28mgy7l0d0rup3dxt7mmq0bedyxsyghxqal1hk2mof5l89zmrmqnip4pnietfr09fmawy8s1ijeohgcehsnhd9fiyxzavk9g46nfltulwn2jrovy2js1tgikka2yxwbuui9rp4vc',
                socialNetworks: { "foo" : "bar" },
                description: 'Accusantium inventore numquam consequuntur. Consequuntur at quod quae dolores similique. Ut dolorem voluptatem sit. Aliquam et nostrum minus.',
                excerpt: 'Quo fugit totam repellat in et libero. Et illum nemo. Voluptatem amet maiores odio. Non asperiores aliquam accusantium sed doloribus aliquid ex explicabo.',
                email: 'lf27ptfktd8jpmgdi4anyxbej2avsqs6a4d5nb18gdgn06hyxr3y8pyctkq43e6bm0tdajzwos28aqs8ez1w9n7cslrwzls53leyrv6703yz9bk94la44cmq',
                phone: '0mbabha6jo533l474q9dc6ha2sr7u728xl7hgxwa0979wj9jadtlqhrr5efhck9rwsz6sb7zgnb90uo9cd1d587v2ik0xfca2xkfmao7anbkq46clqk1qtjq',
                fax: 'qpdtle1qs51ghlcyl0tqj9yz0b95e7p1iviwb9urymja3m576iknek0xs2horg6zq86p5mzic0pcx7taeixr4b3uo7ary9c9h4ardy0gnn5ajv0bu5jskwza',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: '30zsiyzhba',
                locality: '5b9zy31jh77s3jwzhoiy1tc51ax8nqywstoilbrelzejcl4xgokmwtcn5sj6mpa2p2lzjh29648ubb2p175slre3v4npdnv85oregp7uqmkwnogw8vv2g8xbtcxly',
                address: '5bcb7cqby1eyn6dye9syzvqvbhg66rmzzd1zlnpc2cfablosslubwe47oo5epb4fw8fezvf0w1dnqwob9zskheiyo7kybqkggqs3p2f7aqj2y3ut0ffsy6tw2nhvgyh28vw5uhlu7hkbr51wkgchll330y8752k3aar5vaxcab9gqhothjneehl1fel6az83qu2n5o9y27ze4f3y8l4tv5567c4t9g38srxgc568jfvcziik4hx8jwi4o100814',
                latitude: 812.78,
                longitude: 572.19,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: null,
                socialNetworks: { "foo" : "bar" },
                description: 'Modi facere mollitia expedita officiis qui aut. Rerum consequatur exercitationem. Eum excepturi ea ab rerum cupiditate quam. Et consequuntur nulla maiores expedita. Qui optio doloremque accusantium dolores exercitationem nobis eum et illum. Esse quibusdam sunt id non cum asperiores nihil.',
                excerpt: 'Eos consequatur similique nam quia illum velit autem et et. Qui atque dolorem qui molestias reprehenderit nihil. Odio voluptatibus fugit. Corporis eum ea labore neque unde et suscipit dicta.',
                email: 'dzpf91g1mpvqpqb97n6kvpbq9dzljkth0e1cuaihk5wlwc7cfdlw8kfhjnymhwwl45l3enpop4rl9dqjfbruy4rkhu1z0ytagp2ejfw0l8lmqpt7mhnf896u',
                phone: '03krjd2vhnrcaidfn4wv9018kpkey1iggq63syemquij12b0lxvi71pfv2zr6fizcdrscww1snm3byhdrnuam956ilnrukvl1nm1jrvujn1ewv4ptnetn1wq',
                fax: '9o94oe9kuwhenf4mpk9bvhpam9723xlrwt6ri6rp6yxu6v5vay9fl0a28wtdi2zq6tr0vonrjz465i4osusoxc2uxh1a920gegk1eatj3lne36y3vv0pfv77',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: '0iowppd2t4',
                locality: '3h5mqbscczrup5a4cgwq4nukc3zmfln0qgd2nbi8rr3l1kddk1lwj1nd8ry8b3cv57ok7pa0j6t4f3owaq28695300tbnbhpjbn4e7whbpove2x9umnd6tds5x0zp',
                address: 'q85a8ouo8a040nqj8px0qmrgydylyswe9ukt6m19nm3at7l3u7zzf2zhfpbsal9bv7vx57u8gchz5za6cquxcgxuqdq7j2no30m3vs997od4bp8dcygvqweoxpjqm03vil7tc60fqxzc3cbxgqs1c9h2bpf7c6cw71l726b0unqdhq60lewdg9nu94hz3xnrt8kjtznh1g7b5wq550gyvbmj0sqrxyxhuua14n7ys29gqf3v6nwa4tbkmubnw2v',
                latitude: 162.27,
                longitude: 595.36,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerName must be defined, can not be null');
            });
    });

    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                
                socialNetworks: { "foo" : "bar" },
                description: 'Quaerat ipsum facilis mollitia reiciendis. Voluptas occaecati dolorem ex in est. Sunt recusandae ratione velit est voluptates illo. Et explicabo velit corporis culpa qui modi voluptatum. Provident dolor dicta et.',
                excerpt: 'Suscipit eius quam repudiandae voluptatem. Ullam reiciendis quasi magni rerum culpa voluptatem ipsa. Deserunt earum aut ab qui est et.',
                email: 'tivr3lb4znk6waqzbi1vjbtoeymccuwqhpo5pybd6l0x9b4abc1jger178lllmnsifd66voitp9klnfbj249igobwxj9r2zi19t9icxf290n9ltj2637d7k6',
                phone: 'h0lkpf8saam2pnv60nnz5dpcgefav7ygvzdsvakafjvlda8p4z7zw6j1crwxasoxiqxlac1oc5zwnwqrx4ppvw975sapw2e1npabgogttalyu0pzgwjpp60j',
                fax: 'vrvftnorlipk4b9pa6cf1b81q800kbt4nosboqyw6ivvelfwa6q70ecr0y61p0twq2rkwmww495r8janiov27f0hnayliynd9v9mfb89kmmv9qjbt5f0kl9w',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: 'd0d90v4g4z',
                locality: '9kv3urrypflowahcv9kx608ixc2i8d6e8qdzm2ppyadkquxmxgnregu3vwzf1x5pr7by4uqc6w1f4rjcgmk5eul28bm8wy2sd0ebc9wjcg5rbc4i9v20nac1jja1i',
                address: 'x4pov6gqm29unimklcnd6cp4bwun5eaemsa3jx5aypsz6dul2mhnxpg3kgqb04a4roacbfzy4qwdtyhx6t0ic8amzutd2u51ak18bky9iw44xc2tzwgiipqectrqsk29k6ufhvrxs9obxu941qv2wrmoonnqx0wrpx0cpbaajajgn27f9j64eiyd8p6ym15twvuy61hrm3f1d6qf3272d4nyv6g480gbxraufjdgpnk6legz9xbzbkaqcwj10kw',
                latitude: 527.30,
                longitude: 645.85,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerCountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: 'x5a0tibs7x4rbbmcol6h9ecj62k1qzaika7holmbw2wgpoet7qhec6kg7wn66twd2mg5j4mdao2rbfb275it6xr1z1l0w9s7jie1ermrqftlxhplao5rdv2g5awd5f4zghjas4eoghddy9x5t62nep00tmhcvkt8hucqroedmfkc2qy546yym11xb42wjloa1g2659il145wdisa7wxz2z1b8ghhmq2zfq1oebaz8cttg1swe59kd9uorhvqcor',
                socialNetworks: { "foo" : "bar" },
                description: 'Alias molestiae dicta quia nisi enim temporibus quo soluta. Aliquam soluta a qui illo repellendus. Distinctio non et consequuntur quibusdam omnis eius quidem.',
                excerpt: 'Non sint magnam sequi vero nulla. Occaecati cupiditate odit. Tempora quaerat quae quo qui consequatur quasi ut cupiditate eos. Aut est deserunt dolore et dolores repudiandae et. Enim molestiae quae sapiente maiores repellendus debitis ipsum quaerat.',
                email: 'hm583tg64s3lbhp1bwrt0lw1zcb1sf6z59e8vnx0av5jh37e2nyhtt3nm7seta2925ss1gus5f29mcl23m3c5jdfj71xtfp20wqwr8kbnlenkjfk1vf1m578',
                phone: 'vi6w0brig3v7vojdeb8uxnleydq1yovo7dkbl2mwuct6s9z62audcue1w7o4ihl7hih99or7o3tk1gb67f5atuclx8dzhc630ahx1ay6ke9gh8sofwmsvykx',
                fax: 'sioio5ipgx5kzsavwfiq4bwx2l2w9iw2cnoqteuzy84lzd8wfomh9jhqzcrmqxiybmp8ox2ioppnrxisax1wv9jg8h44r9uw4lm1x81tnqlu1h9nhm0h2ppr',
                countryCommonId: null,
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: 'suerbab7zs',
                locality: 'bgi09sqgioiukg59403gsqz09oihgbt8xly6tgc2pqqudonqly9ii8fewim311zp3lqsrqo23iqa6snkw5lpane9zrj72do7u9eiqnd138w1hik686eu7tsnl8bnj',
                address: '2coupsnbflgv1cwa1r9sf2dpqpmmfrfwy5kfwjanp17j64k8yquv1xvf3hnz5ng5kx1qb6y1qwjjxw01zmnltb7osmsawr8vn6roz7xesya1valnzgkg9xt81wgmr3z2z9zcva2tmy3c7r2jqyu70nwlgj1fsdw11dh8l7uthokyx3aihmb0r1ymdj3bv18ro04g2t9j1dcmuf2eny83585yp8bxbkjw0gmojmrolo43lgabnwil1zawwpkaop0',
                latitude: 707.11,
                longitude: 863.55,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerCountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerCountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: '9xmrfj5dkiaehog9hboave1rti9wpub4v4d1sf1994ad39f6bds43bxfeuxe4fkt2imm83bwe2ioy3fe8cofdxj6ealmq0v0l7gt0umhhtyyku5bnbgjen40luu5hwlb2okj4qjkuripxdk94nqvhjqunwcaof2l7p7mh17v07kpf33wrkrz42ng9wcybop8w812aornw6phopimbbr7scvbcayojsj8jhtmb02hz8thnyej1d3ffq6c59lsbh9',
                socialNetworks: { "foo" : "bar" },
                description: 'Necessitatibus corrupti ullam unde repellat magni id est optio autem. Eaque repellendus facere similique enim iusto numquam nostrum. Earum eaque ut iure. Eaque a nostrum provident. Temporibus recusandae vitae id reiciendis molestiae. Eos perferendis et perspiciatis nobis doloremque accusamus est et sunt.',
                excerpt: 'Exercitationem illum odit. A voluptatem qui doloribus quia. Deserunt illo sed dolore ut. Quis placeat quia et et fugiat.',
                email: 'o8yx1tujveovipx99e3nw9akisbyyzjocv7w5tyzziotr9xkattj8jyovqalym8co9vgk4bwnxxrsxjymvvvlqld6rekimttb11c4kikgh6wxdsomj2sogzy',
                phone: 'kiyu59tj3d3eyezb16zbkwnzr2f941zzy13z30thnlzk8mmpzsahww33lkk1nurdfpb2uxsgigpwtoyht0wcf05y6untb2j5sqqzqhzega837fmi0h8les7r',
                fax: 'a6ea0idlmm1yu0ks63o0r9lvw06dbdxgfz7kwzdkaib0fmczr40nosiu4oabvix7h5mxsvt6sd7cig64s944ikpczc5zki48vrp4ug1pwijd04n9ppwuaj45',
                
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: 'rg2zt6h6v3',
                locality: '50wcujcejwnotrl5cyowl96xgcs99og220w5a3zm5cp8tgzvg5p6oyss0r6juht2xdjet9tpb97wzy2rg7q5kru49klscudn6gu38sy2iqpxp7f75jd9lroc9vlwc',
                address: 'lcd7xvqhiiagr1gbbc9tl2r26yoh94qh1cuaierpokqax7e4mq7vcvp3l9ebesezbuxal4bn2gh8dxxjufgelg5wljc5m6pwpyh9sim1xu4vnb12u4rtqayqv7x19yydo8dynl9uedi84j5ssqjfp8gzpz1ggitad4hky5qytmxvh3w5kdm7ugv8kz8ln2wrqjm3bh0j24947ewufjr2sx7971y6dlpxr7x95mnfl97ledncb25y3atiy9unrt2',
                latitude: 812.81,
                longitude: 968.02,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerCountryCommonId must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '3qerbkmgrmztw3y536tbja7pp76ilm8u9r8ic',
                name: 'dpeq0elzi0fca0iinv0qn64lxip9jflg1e0hnaxbhbbxre1v2prl4ltw18aryoypdazrfitn4931dyu558mkke3744fs1ndo8odniw50fopdxgij1xnd6q366aqouojt3kyxhy8lpm0m0fhxfmloh5gvdg3oldo8bcenng19c1l5jjrna9w8gzajvlr6pfmb9lbwh66qul7d56432yoablpoad25bi58tyqsoer6ulikt78t2jnvix4hk8yxiwe',
                socialNetworks: { "foo" : "bar" },
                description: 'Quisquam ut sunt placeat est possimus voluptate ut velit beatae. Vel est occaecati est eos. Harum voluptatem enim itaque omnis dolores iure delectus culpa.',
                excerpt: 'Non facilis odio nesciunt minus nulla. Et voluptatibus natus et illum eligendi et. Cupiditate atque dolores alias fugiat ea non quibusdam eligendi. Delectus qui libero ut voluptas in iusto facere. Numquam voluptatem quisquam est.',
                email: 'dnp9borte9lr6q27h7tx6pccjx8dthfds422oq2mzizqtepe3cjsmmlbnmm9p3q37jjjj6vf3keic3fembafurko6rrskha6bwhlea0fx2p7cfz7fcoec7jv',
                phone: 'isvv7w15tum0rch21zs1d3lpvqikj2gn7fgh1pudcgsy27ktshkl2atgz47l5b5rfzx75l1e16gsqwz1w6n9jr3q6gs76ta1a870d3zuc2k5wmi2rstiwzkk',
                fax: 'd1ioymdiqzm50n3g4g71atgk8vyuamft1l12uevzrttsf9hrvsl83bqon8rl2mtk4yjkbmo2c9cv2ph8i4wbkl71mp6w7aylrkrtwpa9vteqfa3jmvfi7g3u',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: 'wtvcf0esfu',
                locality: '6b1rk1dagio6bu6mintn9uuen64ywws9v35aswzfulm5br1cn4oxvcntkm652qkapv1rcqm0s2rzdw6a2axvuo5j0qrsw5ae0ilzpkmqc3d0qv39clokwxd7pui04',
                address: 'vuxrykrnfmtslksb2ksza0iyr2qd295obhwfmbc9xogcv19j7wzmhbgw5w0m4mhek19mfcc5zgdwxw6ak0f3ec2g6l857yoanlcnemdqaeqep6a4lcz8ryuktqb1q9msbt02yiby4dez61o76vwli935na2x2jd52pm0jrqbxcu2cqodzgllhi2xti889xsvkrg48b6kb2zn7ptr2sjqajg95iv41o2hlctg4xpcgd3ll6ep3e9ukpk52cxsm8t',
                latitude: 941.62,
                longitude: 357.61,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerCountryCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: 'fide1jx9is1aoc865ei2aqog1ac9c7pchk9jc89gw6969v7acx5hqwuwfeao2b7jhh5cuh2fs53ccvsn91q5hb4921h5stateh39tjr7poh7tvos1shuam9hle5t0inm4wozyw0ar8bdw2juv737l9kbbskx8x0hucaq8mq1udgroexwhs4w7r9725pq0qup1sy80n6fl1sc8c6vdnmdhwal3rht5gm64f4ovjgjym8p98733ushhw4xmuruv5q',
                socialNetworks: { "foo" : "bar" },
                description: 'Numquam iusto quis sed et nisi et. Vel qui aut. Perferendis magni sunt sed repudiandae eum. Dolor et quasi alias qui at. Dignissimos rerum porro ut ut ut debitis et corporis aut. Corrupti ea et qui ipsum qui autem suscipit quo.',
                excerpt: 'Tenetur id ipsum reprehenderit quia reprehenderit et. Provident et ab vero. Esse ea voluptatum suscipit nihil voluptatem a non.',
                email: 'r65gtyl2g5u4ku3kg7pv80s1pu8lp7i8k73kvzlbwc1b8jwaxgzss180ezz9rugxwzvhmi94m76urbpa8z680axfzgn9dg54cpux5otazpstyvesd514yp4n',
                phone: '7fb9kwnhakteuevjw52sfxk33144gctvwex3h07fk3sq52vqp3wzvb584bkym3tcy4b4n5thjgp82o7q10zz6b1jk229dc1jcqcu8bpyuhbu0w3s7jjj5yrv',
                fax: 'ddb8p9fpuyl8aclxvpwwqm1fbvdpnxy93hd3b9z3xymzx8qki05uj43h2air5x4w5n4c268gls37mypddcg6pzffm7ronu7f1f9kp1bkkvlxqktblfe8gfgo',
                countryCommonId: 'v1adlk82ft3c9so5mp07wbfu9scqv729jjn1h',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: 'ed06y28sps',
                locality: 'pix78kr689113i0x25v30y8pyyge38hqksham3z63mbx60jnooplyf5m49utk8d7rwh59lq35xqlg93idjx8x0gioynwtz6f3vqip5m2cpnzjxgqww1klykj86sfs',
                address: 'qgzdi3gok9fdxwcq4x7dhn8vhf7vqwu6e4paadtam7zbac5tlgioliqo8jriy6gjyvrygjzmcbrsgs1jh1923in17q09y69rrlgg26gb4on6lbuy29vkz4iz5yupoh3g6stefytd04acafmexaamwfyibhcijob2bkcuvdxtrtjj3blgbqlby2jrobc02sokfb5rqm2oy2ff0gzkdsdyrtdqvwx2pcif81kb3875y98j9onr3pyvw0xfqfupmfe',
                latitude: 848.48,
                longitude: 951.20,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerCountryCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: 'pvwjhr8nkr2ob282unv0iyh42cjbzzknobztiznnldnf7497ssccwmcd6xzmf70skcx2an0ocne3mr21qkm76l667pg9j7qj4dmj6dcawq6bnc7ybxopbcd58ojnf19htgalfrxfo3d7cglaxjmih0sndzako4nnw4w9obbtg9sr61crqu5pfwuq15i7pp5e3eta625h7ljriehg0hfrbyqn6s7ijh3u7rpwchohqc67033pui18anhc96e727q',
                socialNetworks: { "foo" : "bar" },
                description: 'Voluptatibus odio aut unde voluptatem ullam cupiditate nobis harum. Distinctio nam vel quisquam et quos. Cum esse est deleniti vitae voluptatem est. Laudantium ut et unde.',
                excerpt: 'Aut quo sint error voluptates. Officia qui aperiam est quo sequi aut veniam eaque sint. Est et non unde non rerum.',
                email: 'd9zh9fu68d7xoia3peq0fnzhxk80t0bb43luc0vup5h9r50dld1exgsap4uxi98ppdf1eizgiuhm9r0ccnuwxmfth7id9uqd0hr05fxu811ciuu5g11jqzs4',
                phone: 'hgke2tahmnq53d8rexmg60dp2k9vcec1p4iqs5jf1rx3ruujt24h046wczkm693ekt6tgxf1cxrum6kgdl32cszt41t8z7o5o1w3x56t7c9hgibzydsmvgn2',
                fax: 'rn7l0ucoutmdqnwhc49nmft07x42lsmdim7zfvrr2ri74lq38vzhjahalglh7p5fyh7zwcowufxjgkx8nqlti1n1ixxtdqgjruewkxd3ya62t17qujz9xjnp',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: 'za8v37qu7belygkzlulqnojjmwjr3ubicr63r',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: 'siu0mbx5cs',
                locality: 'pkauieevkv10wheaencyui1gqmdjakoolia7sghcf34urpit67tptotg41vfsa7benfbch8d99jqyheykkxpcvuqzwetwdae7nixdgku5dhijrhizcfuecbg7q3w0',
                address: 'irqsejnzvvjbr44njan8pl693xs923puheaw97eiio1c8naky4801von50al00er1d3t2wx5myhk3izygfpu2s624otemqkz96h5m7tdi1ycbzbkr46zpmnyrnq0ubaeh58u0ortc0oa0m1ncuzf53xjidd0w4oqyiaenurhocacusmcqgpc6uiozrnux6tab6daleolxmuw0nkr0gs00mcovhjc4ieuzz1hrkiz0se0lropxmuv96hyssvke24',
                latitude: 832.27,
                longitude: 636.71,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAdministrativeAreaLevel2Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: 'ed7xnf3silamqp0pscmb7kbpwv6r0lx2yrtd2zesom4621nbnqdsckg9fqi88g3i5se39i8z1kpwxmgftrv716e9oc3bald81wg1iazoolb8tmmtrvjsqflk9nfoqlnpbyvv1lpms2zqmymhj7reep0f2c3446e8tc3swwwqfdqn4sg78y1brfnch4exsfwgny5sxu15jzj1nmrw6hrgbbsl1wnl5cx64pmn4ya41er277fhpvszfq7850ym58b',
                socialNetworks: { "foo" : "bar" },
                description: 'Qui earum architecto ut impedit odit veniam sint. Laboriosam nulla atque saepe est. Enim fugit accusantium accusantium nemo rerum. Neque minus quam eveniet dolor sint dolorem eos accusamus. Omnis minus magnam fuga dolorem nostrum in magnam harum.',
                excerpt: 'Totam maxime quia omnis perspiciatis quas maxime magni. Quaerat eius qui repudiandae sed eveniet. Ut ea qui in consequuntur nulla facere et deleniti dolorem. Laudantium dicta voluptas maiores. Natus et placeat voluptas quod explicabo.',
                email: 'b9hsijq00zypafgle91fgqr202pu718y2jvkkwpp052d1bvqbea2r144jycew58jbxwnpv1gxij7df6hrg3noxcwgqtf3fwi9wpulk2fiaow22fnru77kyfv',
                phone: '36wt2x7y8dzruf1z3gf8ot3lc6284h98hc2vx2hpncaarw94u8e1hvui6p0ludqcqp4xc9dvc6xqphr77k5qynnyhynuqa6mbvmg9c7tcbw1fo0rivjph7w0',
                fax: '4dj7j7n6kyb5juf8o4mxx0j9nhcnfhvo3gunw3xgtre031744m82bqnsynogfs4g04wsfny3w120e39uxe3zw11ou0iiki9thgfv0jlzrd0efgq85ynn4xlt',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: 'y2l0de4yx01jzs3oc14dnkwgk2kmbmvqqrho8',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: '9ebcrr69yh',
                locality: '0iisfjc9j7dc0b2wn9ysws30p0vf385u7o2n1736cgo9m7vdl9x3qwd9pxlahjyhilf7p3mzjotu1b9yz1489zaooasgly72verc4821yl08iq1e2iu9xeq227iqk',
                address: '0b8oaczt8zah4x03y1g8b7cqcnrgjwyt911awpjsrmtc4sbhpzl88zhjt70azs0kpcg42tls35vhqznbqfqfkidjlytdp07pxogbcay7a0rafppqod0aojnkdhz5pbel5ewpe0vo2nwuiu6zwi6apef2v64f1ck8eki9h1spykcbdgdt44agw0xklmmjb34eybosryxglittjbj4tcnksv6ilrrbuyf8wb0ts5hk5vgat5136lz3qb34l9bjt2q',
                latitude: 977.27,
                longitude: 160.82,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAdministrativeAreaLevel3Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: 'y83ylp987r8d7l0urmnf76aa9ubu2sfltf0jxifeu92g8w83hrihbfzglh1px2cncji62frnc0jmgz5y9bspiy65y11llhtlntnw0e0q5fjhow8ord0u738k3kn9rf3p65kp5ndvvlniemr5ugamo4e91y5ilr2hhzytgx42l4jx61rr8peabvgkmeibgoxhhuu2uo0fgat7kk7ka9tz1lmakf9q5hn3ls4jgrr9ntcyla7xzkyhnrkkshhs31f',
                socialNetworks: { "foo" : "bar" },
                description: 'Dolorem temporibus nam ad autem sint dolor quo soluta. Praesentium est molestias placeat. Explicabo voluptatibus ipsum.',
                excerpt: 'Laborum est enim maiores vel et est porro et beatae. Nesciunt deleniti dolores voluptatem. Odit quibusdam nesciunt aspernatur dolores atque excepturi.',
                email: 'vomb909sjujm8yured10p8wftlvw6jwp75wpqkqno6cv0u5kjb3bebbsu20ti1tb7o0l4feyqwgahr0ydq9a4s1jnfzyap2w3i9leuvg9dw9z2aiio1s5xjp',
                phone: 'pnz4kqcm4q7mckv688owdcysq3vtj0z4r49ewcnp2k76ggk539e6twzhs80h9mr8ooxhicjvghe0egxtx7df0q86d9bkwszx4p38j6qd46xebl6hz2osvmtx',
                fax: 'h4z15ivwhsp8armw6iotbo1utoi11te4sax0trtb9j1i4eodyku77nc7mi5d285u5rtqy1kwskdierwctyb48223vgzht2cbt13n1nfelpwa4qm29bed6ss4',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: 'olzb73r329n1soystk0ydlzpzkatj2owwuknv',
                zip: 'e0eh7k6sxh',
                locality: 'dxibafdw06z4zilvsi4ne1msn7m0m8g01kxcsv4k8caspcm7k8eqii1k1v762ogj1edbdto9gpn7c5fo7hcvzstqsu31g2z8esct9fbcxf5wjss9dfd70j17wf861',
                address: '8iydiihkoc2eb44ng4mcz9jge89n4maem4qxrax0wephgp2e3c6prv9czvmpho0ekoxn69i4wj98sgwphcvsazl9wh18roh77noq34k1mmhps2nlpq2c0vs43hmyi5b4839vfmoopmg3q8025a37pwx7r8kl06jinwgvacqmy70kh2p1ccbjjro7r64re7xd34zjxga34wa0xr6ypvs61np68l4irclk30y009wj4ekoauqyw8h3x2g4icur6na',
                latitude: 119.77,
                longitude: 344.46,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAdministrativeAreaLevel3Id is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: 'ket3frghi58gev00mbrc91ab9cjpf93afg40b2zqzo3la0zh2avaa9vthshk0v3k52hlhd53pqtiyuu8v757rd0omkao6hcipz8ga6nlsbf3n9q0t9oame5aqjq1fss4b7sqgufebcqaxac2aivn15jy7e75ud5jo9dviooqof2ga4e3zzt0ibb5i0n6w7lq7yyp8sc9m7z4cx4o2q1jv86jlpq33qpjbzkqxfy5y2d5ktj04wu6sqpb70nslwvi',
                socialNetworks: { "foo" : "bar" },
                description: 'Reiciendis quia nobis. Dolorum dignissimos omnis quisquam vitae doloremque molestiae exercitationem. Est quia et asperiores dolor rerum perferendis explicabo esse ut.',
                excerpt: 'Aperiam ut laudantium quasi quia vitae qui dolorum. Aspernatur exercitationem deserunt dicta eveniet quis magnam est sed. Dolorem et aut voluptatem. Aliquam eum qui dolores. Nihil quo recusandae quo rerum.',
                email: 'wpt72bk1rgm1nade65ev2ulutzvovv4hkskpv98fzs3ogndr7h07pnsuou2ztmd6rerx2rvwtbpthoypud80xumx0obzl76x5lmkqysquca342xpy35ageed',
                phone: 'xa14ttdv27ldf19t2unn7kuh6ot59zr58p0gm4srnvi4d1w3luqzputmq7twi9a0q6i8ruxzd7sh92evm2upp24ulg9ewis9uv9jlc91zx1jenq8aaf4aebu',
                fax: '6olhsny6liiykiyvbwub7kshx7u1gfknlc3khsf8pxkffpzdtus2ib15k2z4w1hd938php3ead9y2zt5gj3yn0oa1jman8mhf5joqnvtuii0pl7wryyraem2',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: 'uff7papf45',
                locality: 'neugxayf31u7zrttio4vug0wnowddskqqzk8a4nkmvibc7zitw53xduvbevapvt9kie0gtljepyh3652yypjh9m1hwv29c4knz6obsstwl4kcnxjg6zscj120tnnh',
                address: 'djjc542gb7iuur0hsl0s0g1c22tw23webzswek7hdqgr4k27d8yv2h7fss144nf1d9mjwzlkrkmrn39sf4gio8zqwestsd2p4jpp26icjwbbl4t7cyjjxudsd2zewkgzjz1jnk55eyo555zd9vglowwpkgswgr1ywz2swrdv8mjk5kylnyj780i4b42qbp9sj04ig0qajix2g33ldvq3ws53p1nhezsfnzgrel89yi5gyroxpd2ayz0rgt067ns',
                latitude: 480.76,
                longitude: 779.99,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: '7rmuegnck59mvv5t9ofaumpiujtftux05wwzalhvvcupaq30gpdzqro1l10l6zfyuqjq6y4l9cib20rstj823dy32q8dmn6ogpa29ea7dh2ctrh9edxwyz26dtqqirclyymtra77nz7vh75kzxvryaohd9x43kzln16x676ec0g5xcwrsaq9651kclurzh29s3genh55bgrjdfa0tcb7e8zyz6orhpvy42fyktslgasjnxbugv6tgjles8nptvv',
                socialNetworks: { "foo" : "bar" },
                description: 'Qui ut fugiat nisi ex reiciendis esse fugiat. Commodi hic ducimus doloremque alias nobis ut commodi sunt aut. Minus magni earum labore iste aut quis. Rerum qui eos velit incidunt et voluptatem sint.',
                excerpt: 'Quo atque et omnis. Et fugit architecto. Debitis impedit totam distinctio. Ducimus beatae voluptatem saepe perspiciatis sequi ad voluptatum optio. Esse vero architecto quis officia saepe amet sunt sed consequatur.',
                email: 'hybrd7okeliqsfz8fzefctzvjk8op42atqnok1gwx9w8yvllokuft0t7fqnxi14yxdz219jko5sh02ilsopduthomc92engzwkfxobzziox6presguvung9oc',
                phone: 'z7x2p5oto6n0e0bdf3lo7skhkv7tpplm1j7wjk0fuio5orxxxa8xzati79i1byvtqzyt3h2fb1l42pd3ybm5h29n19znisrtx6v67s004v2vo3zfn9mnfu6d',
                fax: 'a4bfn5kao9beikm4ni2o1z0hosstoqngism87jd60a1684hh4i8014rieym1r01mqo6qfdhpynr6hgxm30meg0sx5yr7q5zeyvzvawzuhn3447atw4stzvh9',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: 'qega53miaj',
                locality: '5516dnyhts7vae7tka7z8546pygktf86zinpqrw32hmodpx3pcm5ke46kenizvyfsuktfufarjn203rzrcstd4qq03u1menitv2qvhupsl8njv5tmotx928mwtck6',
                address: 'pghi2folnogsw2bsolz806dw8porplyw2fxxtbrmwrr3qgk4m8wfong10y3hdellrowd1a70pi9jwg9jpv4jmk7w1229rvnmx2on0ucyq0tl28xz8mo8rblao06izyfhour2je6jhkevv9caekcx244lpidtw1q73zqsejuskbzglvr57e9emfiono8j4iuvob2j3a7u2h01z8l31ahsd4t8cwufvmvo3j5us0100u76hekbqztbt4v5xv2bcpl',
                latitude: 249.53,
                longitude: 427.75,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerPhone is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: 'n1oy0zoxtyf4gj1lav2xmdceo48imlwnt2m1fn24u14owoogfel2y0d71aovvtbn5o81qzaxhpfhr187ush60zwn0nnz93d645ijeh38esrhe69ngp5lm4pvqsdub8xw17zb9hcfmu5g9lyjfr5mfw7swbd4xfbcap6ugnskb18g86fd6wgwq520domgflfy4g1waqk42x70epe30n82vifyobmisxkvjrevup9xdppdz1cv2gifrfivbyz0hye',
                socialNetworks: { "foo" : "bar" },
                description: 'Ad eum hic et vel id eligendi assumenda fugiat. Tempora fugiat et inventore molestiae. Animi quas non et non qui vel. Voluptas odit perspiciatis autem voluptates ullam quo quae consectetur. Quis omnis dolores earum temporibus commodi. Expedita quis qui cupiditate qui et fugiat.',
                excerpt: 'Maiores libero perferendis sequi quod assumenda adipisci. Est nihil occaecati dolor error. Blanditiis repellat iste ea maxime est ut esse illo tenetur. Illum corporis expedita magni quae voluptatum tempora totam dolorem assumenda.',
                email: 'x7rgvv4z81xuprwuszxawyyvt5hf05b9nl8tzy5mezyhojug81orov5qj8x8k3332z4spao7ul3p2gvq2phxtbxjzn484slpnooiu858y11fcf7rv8l54xqp',
                phone: 'htb9o5bpexwz737wmcjys9v5w6y123agy37096nyh04h3zyoelwigonkm9bcrasu07nz17wy0rrtw766mlnqop5hfbbc9juoyngqkqx4o4fm8tz3ksm43qlry',
                fax: '22rl92evqjgcrksaitfjgzcg4alerw3sa2larmqhlcxcahjjqgu1f2i1cw0e82ix25nsag9gnftb868ypoul0pkkts1u9fgwr8t1e1awfmiqxhtld4jbcddk',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: '9csgi6v66w',
                locality: '46xfy5ginofe29fjgb67cayezlf54gw9hrwwpz7cv08hd2fcvu8b18tuf7x7rvz82d0sl7uvktcm5tnqhajourluamkd0f2yakrzur5s3x7o646uvs30vj1a7ddx5',
                address: '1ab6hsizg5zn393nwn6hsnqlk5dvg3m3qi7ebco32pk79wtabr2n3jlvsggb5isma0s7d4mr7aowx8xhd2xivi3767rzv994xh1r4uk6o7y5h6vto9n3q5gvm4q2orosgk8gobecw3jyo3nik179bb2bxil3urjlzywo5ash0eiks230pgejcbhxupxgp4hdg5ebhmi03v8c7uhurjb7pl5rojiy7bs3nauj6duikty7gwy34kuuy8ipewo2294',
                latitude: 206.37,
                longitude: 539.05,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerPhone is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerFax is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: 'ef12x2ds9y24f3q9jt2vpihnhljqrltdoyf34o417cqgxatj1263vtr9o10uuvpin9ewn6kacbwuj0if4x8hci1tijwhoce954g2umlucln4ctjy0yq9rrmk7et82qsm04zztaumudnumfq6t6q8chfw29ik1fwjic4hkp1kux2spbg4hpuqulgz6r1ubbmcbpsssvlf4xd5hvwujlexxy4tigc8grla095csm9o7cn5fdnn45rxzgo6pxc985n',
                socialNetworks: { "foo" : "bar" },
                description: 'Commodi velit sapiente voluptatem aut dolorem occaecati iure iure quaerat. Vero velit nam a dolor beatae nam facere. Et est repudiandae necessitatibus. Praesentium amet et nihil dolorem perspiciatis illum ut et commodi. Quaerat blanditiis explicabo molestiae cum possimus fugiat. Voluptatibus et suscipit vitae aut quisquam.',
                excerpt: 'Dolore eligendi aperiam doloremque sint nihil ipsa. Magni sit dolor deleniti vel asperiores. Consectetur quos soluta a corporis amet. Aliquam consequatur sed aut eveniet a harum aut delectus.',
                email: 'acu775jq97lxejn59pbz0xewrvjv5igrx6ycexg73a1pchkzaynt5h3jms3pge08duk31olq7d0ognuibau48d6gpztptecsx640qyf4p90x7336kvg3gp4q',
                phone: 'n7i1y43ne28pnbsej7un8ivgvau0cu6vaf1wf2rom1v1fnarht4atuwq4wy8ux6ksj6j87p7h35hezcw3z1zmcaoek2v85o79izqw55le7up1y2gz46s20q7',
                fax: 'ki8pa2xai6ddaoyxe805lahxwf89uuqk95pcdihstl62895awyfvuchbls89ppm1q3icdfwm59ksxum64m98ei1t55vfhszczpf7zsl7zbwu1e3puixs9tqz2',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: 'z8tclz466c',
                locality: '44nw2tjd4kdn5mbm3y9vl0f8sowjogn74tbe440s9zpha7sb5po8kbvxv6hnxi74xa7dkk1vovr4xw7e0tqscr51bg3nhauqs1akhfdegxspi5drwwom3mfmwvgrt',
                address: 'cx1qbkehifz7t82aijbpk16efgbifsloc4hpaqmyav8ct0wmtv6yrehn333h3fxfjwl16kiknfpc4g0xpz5h44gxvj2lvqn3uet9c67sf4vxvpp3l2h8pbxzxm8n0laz2yat2cpa37auo2uuhoginhhr9ous9o63gwwo3bpw8qgi25bpzkuacihmqva9zjbbwy72gxlolgsh5c2agitq0li5saqlng6ydqr1268feioccjyeebdlu91h9nkjwcs',
                latitude: 829.82,
                longitude: 13.52,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerFax is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerZip is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: 'gdzopsyp2sjb1ipxzdecuvpyawnet3d47e2ovw9vclr02qdguy95vvklhmhbnqo2dq0yb9lkebyaxpw6imvks03bclxizri355hv5ci4njsnegflmk8saa5skzrgdvstwqi5vryyovp0dwstv99ejpudmlxy8hev9fg9vvbydt2v5jlhrz0h7hko7ovauzcc4imuc3sv2che09jx7z77zv668ambjrkdabh9f3fybvgu3eeu2jcgnrevh2n16ss',
                socialNetworks: { "foo" : "bar" },
                description: 'Adipisci dignissimos harum in consequatur aut architecto perspiciatis. Voluptates repellat temporibus. Saepe omnis rerum.',
                excerpt: 'Voluptas error est ut est aut voluptatem ab quis. Sint accusantium nam voluptatem. Non non corporis cumque dolorem eveniet sit dolorum. Eaque cumque dolorem repellendus nesciunt voluptate rerum eligendi rerum perspiciatis.',
                email: 'e1rqhy2ejr3ip6lmlt9b6isyt7hz2mq6puah4zg7ztu0bdoze0xbxl3id2n8uvuc8axq0owvjkaktqqonfs9z0zmkp7f2ylia2bao25nrhe380d6zoqr4rxm',
                phone: 'cx4pmtwm7lwvonhgl8vy4go7eydp0vzhgxu7l994hcqc9dgrg7qifqge0ztm003p8yevxryg1khytdwv4gxct6xn9ddjlrsa9gnksmext9ohwxp80mzn2sd5',
                fax: '1gkxrsubrrpkm11y7kz8b0me99k6dajn0f7bx4kbucueghp60jl9xkyxi90t4aaahsafvorcnvn20bmqjprzlxoclw3ipgszp26134ov2ayq8ef6tddpwblu',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: 'h9iebkvle8z',
                locality: 'ezpiyoji04m580x3v941onfb326ca6vtyv599qirtagzpofvjdhqd4awbpdt1piq67ed11xqj6vj0mle6j6jw7mkhg33qzb8d1p0lc14rzeb3uq0slmgxdd73lgr3',
                address: '8dtgs1m85kzp9zshp4t3gt5j7wy0rm9o89l03s8u8ov789apdu3fh7u1evr2smkdqgz8ak3sdbc47zev39n6937cuw2gv5mk3xry27wl8956v8dxgjz9x6pvtiatipslxcam24x8whlndnzsfh7joaenmjmf1yn66lwzyf74dwhj1jtljme6hyek9sq7uppcn6tfy70agpilpzbgyoqx5kam0wmsd3cx7on5g6nnfslimikwfcpqxa6zmb7rhbv',
                latitude: 455.31,
                longitude: 648.69,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerZip is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerLocality is too large, has a maximum length of 125`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: 'lhiipf3x2od8oguedl16mr7ydqjifiwnwqv1svi8w2lj410kfuu46lea7pwjvflnicj4ycaqe16menlknmw12nebp5kjbzsqdgkwzeayzsmerfasqliaissadwdx4r9g7jmkcb1ce7yuv2p0y1937q1cyg2dpp72proclatoxddizjugmugfn19erqpu7673xb58mlexs0zdda0kjym9pc21c1zbzgmx5d0pz1rlgmtvlg4n4jctakclo783lbr',
                socialNetworks: { "foo" : "bar" },
                description: 'Esse voluptatibus quis quo nesciunt. Id sint est quae et quia id. Animi commodi deleniti velit quam omnis. Dicta libero incidunt reprehenderit.',
                excerpt: 'Provident voluptas cum recusandae sed rerum quae doloremque. Quas et modi magnam. Perspiciatis velit voluptate veritatis et nulla ipsum fuga et.',
                email: 'r94zskr86420ayht5lvw8ou393idk5uh5nd0rzgct4f5tqqejkjjw379fwjm8gxmxp1ugjpcapqy65zdnim75uuxg55c6sxrrbmdnxygqaigc0l5nu3g854a',
                phone: '9u7m4vwfvalo5yxa9hyvq17qu9tcn1b3nh2142n0r42g97b30gnuit0g68lkolkmyeu4z12kqq90h67zdnpzqvaddvir63wyst3tu20lpnpl6z3zj7lnsn22',
                fax: 'hjejc2xiq4qpizzc0pc26qlxiu0ynves9rz5by2xm6al8lf4fwlvbz0ugd910nzbubanelctmpokjfka7ogb163lpl8l9wi8qovd24ygfd5dyqt7edlkp1x8',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: '777o2fci2y',
                locality: '3xg0vmkhyd1r7eg2ofhyb4ha2lzyv7nybc7log0j0k6kp7vjlluct1fnsj064vf8smc4yssa3qrm449ys2tu0uukqjkorn6tkal7iyhsoo9x93yt6u2zc37fmvti0f',
                address: 'y78wr5td0a4tih979dxkm5z257lhd8vwdsnzbtto6sn1cn885292n7iga1jmq86w01td2499hhq3zwmrtbn1xnt2wpy0yc1bw4ngw4u6w7ehz9pwvexhad1uhzzt43tlwlwdeudidrjvvr76ggje8wkcnpmhvntetrfxgmp4zcdrubso4rbhciz2qgcybdivxtsy60sxvcvp0zg9nur5bsrozuv854b7zt8yjvd90rgtnm7v4i6tu3zel0ci5sy',
                latitude: 707.69,
                longitude: 175.18,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerLocality is too large, has a maximum length of 125');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAddress is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: 'e9392a88i86r8adljnpl0ckhqelmx50xtfcpcrjsgpxl5ljay338ay5yn1egtfcuxkqzsnftwjca54dgrpupjelwk3ky4upcj2oypj5pga5yqzmn3vs67rsnqdqo78tjerm8s383109nl9xsc18y9cmvw1olp4tcsioer9stn890q2n6tsotylu4jvv6wsmxwull2vsv4s8b7wzyihcfnrlxa97iiu5snmshtns73vwwbot3lxnfu5icfuhdah9',
                socialNetworks: { "foo" : "bar" },
                description: 'Hic unde aut eum. Voluptatem provident maxime et. Blanditiis nihil autem. Sit ut sunt velit suscipit sint. Quia voluptatum incidunt.',
                excerpt: 'Tenetur dolor distinctio tempora excepturi at ipsa consectetur id. Est vel rerum necessitatibus. Eos fugit qui tempore repudiandae atque ut aut. Vero adipisci distinctio accusamus. Eligendi non voluptates tenetur maxime autem est non dolor ut.',
                email: '4e8lhho2hpj7dlv1sybwnb6ko3wro9evk8mu0s1m3m7m1154hh4hlxczwryt8tzi6ac237d2ewuch1q2szsqcqw35zue8fu9884ae7ca5znrf40a22brubvn',
                phone: 'n0635hs4pl7tqdeo6vporwevx05yne28qduvsuc3wml81bzplk7n90xz3c6et4kyk4vi8uubgfy6k2005bktgoezv4yqzx7gyvhvsnvi4xah0ycaa5vcqp6l',
                fax: 'cxp4car3yum2qxe7yy6f4l6lknztq4xo5y94ob38yfj475iptx97vceds4r0vx4xpvzemtxp89y0nl4u69fx3s5rq2egbhqw88hgodb7jrzgicz15tuqrib8',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: 'n2o80ph2cb',
                locality: 'z81sjwnm8log4higmgokdcc2wujjhsd8u7i9bvl4zgm0bk61woy572iber27vhx8tch2b8ex79f79lihwl43tgkycems7bheir582c7hkccsd3xsl627df30wp50v',
                address: 'vryweaibijwdnp81bhp2s4g80vcu70l6j1eccunq6nfedw189tt4cj5v3rpphsyecwhgmrzre5c2jmql0ilp3irehz38qu6vqxhtxtpkek9t9tsh2r67ih7dvi5ie9h7ikhl7v04y8n1hflsseq4331xrnefqz8yowk4qc0hz633qck3tt4lp7wm6u7d07e4omjuspvo81476sy158y5n5jdhwnh883dxv94vfhexwfmnnw76xy67fb0pg5d3eli',
                latitude: 126.80,
                longitude: 369.98,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAddress is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerLatitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: 'ck7yjuzod19mna39kcykb6zkxf11oho5go36yt628ywmizfx1r1mxuhwn3g9fkvun8rhdgvi1f1xayi6996c4j885cwz3pimlzgjv3qt5kq7x4xovzmvkuszkv4g7o0qivoyqndrgjzp2lng8w9wtef1mokg1tmlhfhl0pusln1sibe4ped43fdccveh476tabqjf1nnlm35rkmvr30zoyc5ta3f1yct9eb6jngzkaif67mg1gkkwar0ndix2nw',
                socialNetworks: { "foo" : "bar" },
                description: 'Distinctio qui et quo officiis ipsum. Deleniti dignissimos aut atque cumque consequuntur animi aut laudantium error. Odit dolorem ut dolores. Vel eos quia architecto temporibus veniam. Voluptas nihil placeat. Adipisci perferendis et minus eos fuga qui quia.',
                excerpt: 'Delectus omnis nostrum excepturi non qui enim consequatur. Nemo ea sit. Officia voluptate dicta iure quasi expedita eveniet.',
                email: 'ozk3acu6tjjg7vcyw34iklcqy6w13rea5jc4ewp6bsfw6ytvr7flpvaw2aur4g59vmppi9vgddfhebhf6mo9732cgxjk6jxo5t16cdo9ouoy5dv2j3z7c1km',
                phone: 'qbaxpswvbl87b95de4exzv4wk14qwhvbs6whhd8bvqjoi8uym6qj3uytbh9y65ianzysoh41gpm4lc0o41mdxf1rrbj64sg2xbj5o6teod8adfwbh48rjau5',
                fax: '01xofu42hdvb7r3mnlrjvzys60amdpfnd9ho5nk338vx7xg2x6nth4s93lx42x68d99624996m47c6oazm4m86vytkzlpsd0wuju6gaol2wujjx2pfi50usq',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: 'ltzcxnyyo2',
                locality: 'k54tw1pyr6k3fxsg8t5ea76ov59lpmubip73sef8266tfdl858rg63y7qxnmkvca8y7coea1hjv0qinef8xlye36ezm2flahzx1vygsu0emyipfb81am6nenqqx34',
                address: '0twde3nfrxt8rkwiofwly7lratf8ooua0jlj3u3rzupyq4m5xcrj7a64bxaji3zveddlyf2npn6irwpguinb7h0ctoz7htaeaj71uei4lz3cus9vka2oih1tts5jm8q7b2152sr24bpsipnjigseujzqwlc5s4jy1qdz1esk98g44rtk65jsgohv3zrxqqe4t64vrd7dlxwuy6qyi8g0bwrmvaad19o73eftd36cp8shfj4cxto49qbukrjx8ws',
                latitude: 902.15,
                longitude: 602.21,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerLatitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerLongitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: 'hirq08z61gmeocz70f4iy9ko1mxwepw9of3bq5ts6jmkk11m4tkjvmz2hx43b9nh3ril8v9g8stihcly6z5d7h16g9ydrj9us4jcddlqhglpg8s15lhlrni2ztvbpusybmjp404dfdilgawlgtg88ywz67x8vgsrnycfkf1juf6khpcj5vozqmev56p2fgf8utra3kkmoecb5jkrc3nu6xle4bfqqlrjn7grfvv3jm4zbmnuqswoav8fpmsakno',
                socialNetworks: { "foo" : "bar" },
                description: 'Rerum ea earum. Aut voluptatibus unde. Non est qui nam perferendis ut dolores sed enim ea. Occaecati est totam pariatur a officia sint officiis molestias.',
                excerpt: 'Vel beatae hic iusto voluptas. Non sequi voluptas ullam aut perspiciatis explicabo neque. Praesentium ab eius nihil debitis aut.',
                email: 'zciylpz6nw885orz7lq8dl7kgq4wr5teqoqkpaxle6qc5e21usamninlws0aro2bv8c6chdt0lhetqqhk9i849097nijkgqp3v8stvbedpmmlncaibntfxt5',
                phone: 'r37tqnelrh8y4mf9dbntm1d7vz8wu1ckvrlj977crkbrwu2g81x4l7s43awdvt7yrkax13jk8h5pt9xre492e4cw3lrbrqg2xevjocht7ljdv4pdda0fz0t8',
                fax: 'ff1fg3wt4exo9wl5xbcesjdsdhl76yu1epe1cvlhu28dkrsq3vdojs9jxe1s4o03in68tu7zn0zoimut8yxstkslefak9l2mghtoewtku69ddqwkh1kkcr9p',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: 'js25gxje58',
                locality: 'ldtbmrcgtog3dio8xtmlq6avawhu54yfdiuwnm4vax26mwer6j9dsfxr87bnt8okdmt2t89mbxq71ho78lgeju254hskonr58e9ibpnnwiktb40inqgonapqy4a3s',
                address: 'vtfwbwa5za19gzqnpgt3k6gdv53zq2wbmq9joq7vnkw4pb6r27y3zmb1uvcnxp46uybz8947w7v43sgnrrf1lzpygiddtmzq79co4i2ib2myq7ob34cq42g1tltpb8tabaj2ivc52sxbfsxohp5buh3elsbhl8f9wi4y0odm4q70d63q0f74ceo7q8by090z8hfjkythvqib328bhcpqda6hdkac8ihkkm3w2b15id8uo3awiwgrahfpwultx7q',
                latitude: 545.82,
                longitude: 522.46,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerLongitude is too large, has a maximum length of 17');
            });
    });
    

    

    

    

    

    

    

    test(`/REST:POST origen/partner`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: 'k3tfsfrun8z5nwe1lne72u9pgy288t4j0nqha59gweek10dz7111bzqcj4q71aorci0rydyl0gnub9s8bpwjxlhm3smifi33lw6yrbh19gjj2qq9enqvr9xg0ey96q5q8a2xqarmbja02x62b1rb5fuvb71ed350i2kmm0wyx256lr5ebth1c4nldwly2v8i4k0raq3bwso6w7xodn5bk95e7lb3htbfsc1ktn5ob28h706ij06bdwwymgvc7ia',
                socialNetworks: { "foo" : "bar" },
                description: 'In et consequatur. Rerum rerum veniam et. Qui quos molestiae. Non nemo ducimus ipsum sit tenetur non veniam.',
                excerpt: 'Laborum minima molestiae repellat animi sapiente. Numquam dolores provident et. Ut ratione earum sapiente. Officiis voluptatibus quaerat id nobis enim. Ea voluptatem laborum omnis perspiciatis et officiis iusto. Illum fugit voluptatem.',
                email: 'd39pprbddbcf8ht1ay76xlstpek37xbxq9vvo2g50bnkl7clf5j92w2q7sh3ptoa6mkwg99jrl1u8vqiab3eivxtjixpqntsyb6s2vze4g871ukonh7rbiuk',
                phone: 'xnx3ydnyprcpdqkp0q6lrome7nxftfh1p06oecn8i67jam471k91njl9bb6vs2dgi9tciyj18drxxzmoo8ffqxsjlwqqf7n67iwnsuq1c611qciz8kjpn2ga',
                fax: '628fogsd73c98j4sdxb5evq6t4awf6cqc7q81gx0ly97npqqu6ikvkgkmsqv0sso54p0wten4zs2pi153umvwudcts949tvw66chf4pvhfdj2hb48c1qdsr7',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: '7b635kdh63',
                locality: 'nnapz6n2uzpetbgjfmds81gh6beahabxufg77uoibk5iod5dce6itd8y76tsk51iyp7yiw7ni6uipuzblqwdwsyzcb92gxrsagnzr84xfe8z8cm00tevt30wmtvtx',
                address: '1a0ttg9yqdrvkmgc2choihiba1jw3br76bvtqc3py568qx74j0j6bog621mzcks25r5bggfvefxeyiqwkl0vnbow6rmm4lavdqg41qraq9pesl7ai5joeakezoil58oqr5aeznfnor50zjqsio2dv4c8g0se5muwg967cgz43ad8gy0hogu6fk19pdxsoazu8ias0emzx6cqw53ej2uk5zc8zgsvoqv7lol9g5vede170sf8f93e1l5as7u0rno',
                latitude: 570.40,
                longitude: 321.89,
            })
            .expect(201);
    });

    test(`/REST:GET origen/partners/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partners/paginate')
            .set('Accept', 'application/json')
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

    test(`/REST:GET origen/partner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'c6ccd88b-93a6-4a14-9eff-dd30da1b41fc'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET origen/partner`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '13d98494-a3ac-4768-9948-a85b14a9326f'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '13d98494-a3ac-4768-9948-a85b14a9326f'));
    });

    test(`/REST:GET origen/partner/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner/ebe7592d-7ef3-4333-b3a9-29c02e8b2b7a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET origen/partner/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner/13d98494-a3ac-4768-9948-a85b14a9326f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '13d98494-a3ac-4768-9948-a85b14a9326f'));
    });

    test(`/REST:GET origen/partners`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partners')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT origen/partner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                
                id: '572d529e-17a2-4f62-a314-5b1dddd65732',
                name: 'tqrkutkv7veykqzyjf8msk7evem908gh9v4vnuv75ilcuhzhmz7ot5tzaxwlcuxozrky9plbc6gy479pmgd5v9vsez73dfpju9pwjeo4s4vk9i1gq1it4wqy132a6eg31e0s0szz9axq1j12n4p1ptbymu0v1n90sc0mobygy7dqfj28qarexgheme0beonp2mdy5n9vy00h9izm38ztumd5hosj1kahyl698u5nvoymhh3a1ltwscxncv3i22k',
                socialNetworks: { "foo" : "bar" },
                description: 'Rerum quia autem eos et rerum dolorem mollitia. Corrupti commodi nihil officiis quo. Illum quidem sequi.',
                excerpt: 'Culpa commodi consequuntur voluptates quos laudantium quo ducimus. Vel molestiae sapiente blanditiis tenetur ratione. Dolor et dolorum accusantium. In repellat doloribus voluptate dolorum. Explicabo error repudiandae minus et aut debitis atque.',
                email: 'q1xgy091cmtmmzjiz54e91zj3ik9jp5og9u9a54uii4zv3v538e5z6z8pyceergv9jw9a9449nmb6o574g1wktzqx0b7lj9evosnwi2ew4v95e5v54p6s3e7',
                phone: 'xikkoh34i1vcx0z4gw86ul0emd3e4dzbbth38r5o3thw26yct2iufkj1pnerkjqsrvi30tjligy9dmsoc542sqr0dw7743suc695rudjwfmz9z7uobcz9utg',
                fax: 'y72zrnszrvaq0ljccchned5yi987fxygiqs8d1xorljbz6ufl2kvx8gpc87zlfxa0h3gjbgtaq77x2s759zjdgz6a39ah6othpznctaa1n9opt21argvjizw',
                countryCommonId: 'd092a5c6-cb7a-42c6-a6f8-5b7304c915c2',
                administrativeAreaLevel1Id: '3a7054f8-77ec-4a96-86b5-e2d24da7dfb6',
                administrativeAreaLevel2Id: 'ed9fd627-3e2e-4488-b06d-f587c9b23ce5',
                administrativeAreaLevel3Id: '9bb78714-a2e1-41c8-8134-7d45a1a27556',
                zip: 'p7beys0eer',
                locality: 'a1cibogv9yl0lssibsosofg9e6bx4itq3jntojo3dnn4ng5pz910ey3em1ckpmat343g1hp4e6bd09hjj9mffz1m4hrfspoujh4l9hcw46pzzbl6qp6tg8tfletj6',
                address: 'tzwyfnkfwzk6y5p033fvxingqtmkakai3hvgxegoobgrjdjdqfokftjbppp6r3rz58eqxyybl64vhyntyi98hxhwl37c5spmllghvn452pj6cr5e46px6radmd9d7cxcjnwevftkh6d23ye3jt1gpffa4zeciwzd1hb6mxd7hg7uacx82or68qfmdry2ltvlyi64f8vb5iwr9mj6jzukojwdmtaiofqqwvytr4fmeszhq473v37n582bf97coaj',
                latitude: 17.21,
                longitude: 44.94,
            })
            .expect(404);
    });

    test(`/REST:PUT origen/partner`, () => 
    {
        return request(app.getHttpServer())
            .put('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                
                id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                name: 'mk0kuhsgz5uydvgoiij4z31mkdlgjvlox9gowy9oz1zaiz9xzvrai9a560rtcqq2l8rsx7nmmin9t498hn860mifrbfr0fiv7b35ty41f6h4wo9sxw1i2viy6xe4l78awu6slmu08vwblq65acxs0qrog5mnyf4b6u9vaavei0b5cxax2wipdzg9x74b1wtgj6px61o8jau3fetp32u3neezxuwgv2rm3j6smasg1utbuz9w19li6kj3oj01qht',
                socialNetworks: { "foo" : "bar" },
                description: 'Perspiciatis perspiciatis deserunt. Totam alias ab aut. At et doloremque a nulla eum. Et sit dolorem iusto.',
                excerpt: 'Est temporibus dolore expedita officiis dicta labore enim sed eligendi. Accusamus dolore nostrum sint. Enim odit nobis animi aut consequatur odio dolorem modi at. Quibusdam maxime quidem ullam et dolorem consequatur ab in qui. Voluptatem ducimus placeat nesciunt voluptatibus similique perspiciatis libero expedita. Libero laudantium voluptatum et omnis ea totam.',
                email: 'zzg4ntr1fcy9o6u8pj2dkxs2m6s8k2ffuk8jcebdljiquelilucluhaanyobha2b4ri71zbhc4ipu9kg28z4qr3im7yxnslifernuxqpd3nvr6dw50r6mxcm',
                phone: 'bdp5o8joqbevij42cmjotrxt8e9ihrdpc2umfwhk6wsr8cafnolt7g1hq9s0k844t96pzmbqqbq28bp8k8uv4hs53kwd0gxdds1loh4za2mpet45o8rjrdj7',
                fax: 'syw1a2hmrsly5ols80qsy8j68c3szvtow52epgc0smpqub5wfi3gdrunbigggzyybzvo9mhl2z5c8oeqg5wc2u2a2gj30udq2swdfokyjfbahlwu5g59j4ms',
                countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                zip: '8bdurheliz',
                locality: 'ds504jo2tr3x4vheq4i2vl06isj94d6tq1iv63jszgr5udfpodu0wvk8owp642qsbnfyiu33ue0toer9iv807xv65qy0jgphl2lbjz944fqu62wtv04lw0mrv6ne8',
                address: 'ufm9oipkese6flati377pc6yhbwa9rvdtp0mrk2oj319eigk3cnv7z9ubncs8x7r4nu6obzbd0um7g1syduhuux8fbzkfr1385d7a6a9x7mkv2at30pkeo0mle8iac0zz5phy0bxbs7uk4oztt69p13u73d1jvkgtnmpzcucbyegg0kqx0trs1xplxeg1qy6whxyn9vhcof7rfh79s42oxo57448ac5wpawsx61x6dyoowh3t6dg0v90m72zecd',
                latitude: 605.89,
                longitude: 122.60,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '13d98494-a3ac-4768-9948-a85b14a9326f'));
    });

    test(`/REST:DELETE origen/partner/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/origen/partner/9f075a1e-0534-4f0e-bd28-effad75c0e0b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE origen/partner/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/origen/partner/13d98494-a3ac-4768-9948-a85b14a9326f')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL origenCreatePartner - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenCreatePartnerInput!)
                    {
                        origenCreatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
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

    test(`/GraphQL origenCreatePartner`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenCreatePartnerInput!)
                    {
                        origenCreatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'c5c3e723-0960-41cd-a585-bc0643751b5b',
                        name: 'ryfq0e5coax8gup2qoq53ssjty9g2w1ghp4df5r4v8v8ckde2o8mash08zzimqgmlnpctranwp4aok8hbz6mutbww2d5rrtkr9njpbr98zindfdg1dgsium0qsr6sdpbgevzz1vg7pfjj171rp1lyqaumzsgi8eyem1acu2blfqu6x38bkv1kfc6h0t0o22senxvq678fq324crqv1nh9nzpv1aj09k80d8i33aa64llt1w6v7163de0of1t3ff',
                        socialNetworks: { "foo" : "bar" },
                        description: 'In reiciendis sit. Sed fugit id fuga beatae numquam fugiat et. Est impedit commodi voluptates nihil et. Cum est laborum. Omnis laudantium laborum odit aut eos incidunt commodi eligendi a.',
                        excerpt: 'Eaque tempora sapiente ab. Odit asperiores ex aut voluptas eligendi. Laborum necessitatibus ad dolor amet.',
                        email: 'ol1qoak6osz17v0j05ccqwadgmhhweycku9xnutzs35y5r32lbup7ukr6tgdsvz556kuvezhjeh4cfk5gqmft6qzkru0l5rjtec3j3ep8ia7io2vg22jtjc1',
                        phone: 'xggci25l7oh78k9ynrld2yxxr919h9t7felgyidlkun8g3y7af36s7v724qm7gf7ls2fx6ywk9kmrmyv7ll7n56xjz2e14st48r81idvh9vjrxhrku6z531a',
                        fax: '17mowa8rjphxcbpo82ajxj0h861wkb643eihi72hkhqmbb4k2ixwcuvmk10561vpdzs9wl5lya3huz1hh9v1g8t4kncugldqqn2p6i71t3was8qn6vg77ll1',
                        countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                        administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                        administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                        administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                        zip: '6vlyou1pjd',
                        locality: 't2s4cymdascfcgjv90z3egmx3w9bmh0uahp9q5ib6om9ccvvsh5pjn51x7ogychj6rrnfiqam3ikken5y4vkc4r0ndswlkubwojp29nh6hp82gxlfvj6lnjm8m67m',
                        address: '4xj2ford5b53wjrywu2hfjynmwafp32j1j5j1r9r8xqkr1l7yjqkipst82wy6l8bu6zmrkfddh1fo8rcgiiclqugfwkjdrjm90pzm2i32olaiyl0kio5sgzh982wjucpa8b76r6k7gg6zynerpuz8bsma2ykbjozltq99tg4vg7jbtfgmjvhq9zqgkmxpfbdy2zkn5rggqth03v0kdptqz1zdk670y0mxge5pxatmk1fju0ujvv1mj2lsy02v6c',
                        latitude: 212.72,
                        longitude: 256.10,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenCreatePartner).toHaveProperty('id', 'c5c3e723-0960-41cd-a585-bc0643751b5b');
            });
    });

    test(`/GraphQL origenPaginatePartners`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        origenPaginatePartners (query:$query constraint:$constraint)
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
                expect(res.body.data.origenPaginatePartners.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.origenPaginatePartners.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.origenPaginatePartners.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL origenFindPartner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        origenFindPartner (query:$query)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
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
                            id: 'c6a9a115-1185-49ce-a7f2-87cbd97aa116'
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

    test(`/GraphQL origenFindPartner`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        origenFindPartner (query:$query)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
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
                            id: '13d98494-a3ac-4768-9948-a85b14a9326f'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenFindPartner.id).toStrictEqual('13d98494-a3ac-4768-9948-a85b14a9326f');
            });
    });

    test(`/GraphQL origenFindPartnerById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        origenFindPartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2fc36cd3-b8dc-47cf-bd6c-546530614d7a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL origenFindPartnerById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        origenFindPartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '13d98494-a3ac-4768-9948-a85b14a9326f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenFindPartnerById.id).toStrictEqual('13d98494-a3ac-4768-9948-a85b14a9326f');
            });
    });

    test(`/GraphQL origenGetPartners`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        origenGetPartners (query:$query)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.origenGetPartners.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL origenUpdatePartner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenUpdatePartnerInput!)
                    {
                        origenUpdatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'fe425efe-2c00-4fb0-bbfa-17778a545088',
                        name: '2geu2bl6of723n4zvp9tngug68zgs7qw5t2r5zv98gs1y9vr0ofgpl0jkjxhvcvz3vth8b9ckbknldd66mk02ggamwn20tkfga7cpt96eid5egqj2rbtv6fip98di8kjkc9k772od70gbm59y26m6lt33fegikmetwtbib75dboxg8u0gh0hkcwixnfj8sn6tsvttmwnm7h8ob3t4gwd7splkvyi3122z9ff9pgmt2oct64tu5gmuyasxyqg6vt',
                        socialNetworks: { "foo" : "bar" },
                        description: 'Eos cum nesciunt earum animi. Voluptates nemo eum libero repellendus veniam veniam et provident rem. Aperiam vel eum exercitationem illum aliquam quo sint nostrum esse. Nihil voluptate iusto.',
                        excerpt: 'Nam aliquid quaerat ut voluptatem quae explicabo dolores. Est consequatur odit ut non molestias vel non itaque. Quis voluptatibus possimus error temporibus rerum nesciunt optio ut.',
                        email: 'mu1bn51hru53ktzzfhm4es5dmikwaqnm9fhz6bocck1ffw07g79o547i66jxwh4gkdtr7qhz6axzcqizi98rp4qeg2shspqcp454tj6i8lql8xwxz2jydkzf',
                        phone: '0ai8i3o24ddq99rt4t8o3ker7gx8l0i7jid8cx5lpxcquxtwcfw2wk7at3ontwvnwsrhhs8rcnghulr32ttoiqpx274woljgln6p32bqir10qvoa56irdjjt',
                        fax: '6oyb91x8savj3muzyj1zxoxq7jdj6ryra0c09s0qf8sy8dizc370lksxa57iei83452ccggg4nb60xxa20c1ctmar8e0x9yk1jyu7cq2dvqi99xwcmsbyr0u',
                        countryCommonId: 'bb7df99b-69b8-404a-a10c-74cec0b9efcd',
                        administrativeAreaLevel1Id: 'e1d9879f-4469-4c18-a57b-c2795b4945d1',
                        administrativeAreaLevel2Id: '82ac7525-a288-4f66-a7fe-eb632776a0ba',
                        administrativeAreaLevel3Id: '35443700-f038-44d9-bebe-99fbd931686f',
                        zip: 'rtdk9s0l07',
                        locality: 'wnus3ewjui4r2yugnd1jjcdr8hplm2cxfl3j4hoqja1hgw4xdosyimgjlxvma2f2817y0b74u9xf8hjxotsk4jtnbbwxbchj9kp9ihvs8zidhifu0m9to6aunz7tb',
                        address: 'pt4owltk5u1yydyvwwyvjvdlbhhtdp0o81o1d25ttgsz3mw1lelmp7krjb9ja423l59opqv0tngo53kgazy8x382if4njl7ha253zqyen1mjwob2g7ltcang6zu9pq3aoasje9r44m67m2vtp86liysv7kjdsh154s4lfliksy3y5b5pktgyqt1na4lardofp620sjjjz3b3c5b6sdf4a9ljcljc4wgl4z9tqy30o5zlfn63q4q77ebvpb0qux2',
                        latitude: 677.78,
                        longitude: 823.34,
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

    test(`/GraphQL origenUpdatePartner`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenUpdatePartnerInput!)
                    {
                        origenUpdatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '13d98494-a3ac-4768-9948-a85b14a9326f',
                        name: 'i40zby46lssn3rb3qk74zldfttc8l282l0jjz7w0ox9cplko1bvbgccsp254mdpfcpo0veokbanyv3yuoiq8ccdx8uxt06vqiv8btix212qabd3bsswpskovg0puf5b0awze6zp53sx2ao60rdplbrvfzh9kqv29n7zr5ctd06fksvv87qvhnewtrsnjy7aj04mog6647uqj09hjxklx9sdhtk82u8t5yx8s12w1ipc3g6bm53qvsn9x6vbw59h',
                        socialNetworks: { "foo" : "bar" },
                        description: 'A magni est omnis reprehenderit ut necessitatibus. Nam assumenda consequuntur. Debitis est natus pariatur.',
                        excerpt: 'Harum aspernatur facilis mollitia ipsam. Ut molestiae at excepturi odit. Nam libero assumenda sunt repellat aut non.',
                        email: '3m2z6rh91c9wx0e435ejmx0lowkz7ltxo06pjrcs223jm1zz0t5mzd26mhlv803d6cifw0bbizqco3c4s2mx6bl13tsm1h3nb7nlxbqiei6lahat8sc44puf',
                        phone: 'd8384kjaup6hxxuxom068qo826u6q63zv39a8vyiwt57bfzle09piyij7mqcd9p7kcz8qq6f4hu7wbxu9gtla5ub83qi2d2umw51onu5crjoclw2k0lk7utr',
                        fax: 'rw7482vvnn3hxqq163e1m6rf3ouzygvm1jj4pd3szos9k4oui7ooflgknle4tshte721rq5109u915xktr9jqznwbfkjzm2157d54zcbr4lv9nsfb841bu4w',
                        countryCommonId: '60573d4e-e9ca-4201-aa82-c719146247d0',
                        administrativeAreaLevel1Id: '34090f53-cf56-447d-a68f-065334ee636c',
                        administrativeAreaLevel2Id: '2ca38f43-0476-45b5-8dbe-3a3906d73f8a',
                        administrativeAreaLevel3Id: '15ce3005-36c8-445f-8019-89c53744ccfd',
                        zip: '4iwbkxrcno',
                        locality: '6odroystayf9ue4r93h2oedgfvku2mh7cpo03ozhpaa1cok2hcuauqeddd19h7gc732vremy0qybgnnxprywiivqssq1eqijpya97uyeme63m48366wsq4htxjds3',
                        address: '65y1k66tn0nvk4u0t4pyb2mnnzyuutu0jmoifm7n5tb93m4uzjbxiox97rtztn3r8p9zj3klp651rzgz7m9x1jz33crbvgc9lasqezmmgzfwgrjff6yiypiegup7puqkbpdfgbho9ww2tzn5per7w1wk3v0223ne1n0z36zu6yuav7uxmhlzyk6bpyfuhy1273u0q922oodmz2e8ummnz4lkrwpplgrceqdkdv9td03x4krfq2im0mxnk4vab20',
                        latitude: 321.28,
                        longitude: 766.47,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenUpdatePartner.id).toStrictEqual('13d98494-a3ac-4768-9948-a85b14a9326f');
            });
    });

    test(`/GraphQL origenDeletePartnerById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        origenDeletePartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b10c379b-4945-4107-bb6d-29f89a973558'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL origenDeletePartnerById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        origenDeletePartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '13d98494-a3ac-4768-9948-a85b14a9326f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenDeletePartnerById.id).toStrictEqual('13d98494-a3ac-4768-9948-a85b14a9326f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});