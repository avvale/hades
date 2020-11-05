import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccessTokenRepository } from '@hades/o-auth/access-token/domain/access-token.repository';
import { MockAccessTokenRepository } from '@hades/o-auth/access-token/infrastructure/mock/mock-access-token.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('access-token', () =>
{
    let app: INestApplication;
    let repository: MockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IAccessTokenRepository)
            .useClass(MockAccessTokenRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAccessTokenRepository>module.get<IAccessTokenRepository>(IAccessTokenRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/access-token - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: null,
                clientId: 'dfd1e813-e633-4535-8f92-3d66aad026a7',
                accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                token: 'Soluta sit magnam omnis repellat qui quis velit dicta. Ut magnam voluptatem recusandae esse explicabo maxime quis voluptatem. Quis ut dolores aut a blanditiis quis. Non quia dolorem voluptas autem totam sequi facere.',
                name: 'd6w1vk5hq1348dx0n87wifszn1xtl98aficqffy2nvd3l5kmlmh02pyfiqp10q97wmifvtssn7p3nwqbqz8e2s5fl44hymzg6qsztvjxufucpn5f4zc3oomxy2pkt3j7nw5kez77j029b2rm407094qj3duz8q3rrmosmbu5zbzh8lpsn3vpjqlv0cfhjb611itzabw5sqs4a0cpvvwmg878g7ldy5nlzircflummckaztvvtvygclzk2tfld2v',
                isRevoked: false,
                expiresAt: '2020-11-04 21:44:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                clientId: 'dfd1e813-e633-4535-8f92-3d66aad026a7',
                accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                token: 'Sit iure illo maxime. Corporis minima voluptas cupiditate et tempora fuga. Deleniti cum aut autem fugiat.',
                name: '6afenisyy8a52ra8itakscpyjhodqw8879c9787ncrzzgdb1j5thtcdd2t2u7wpmz2d8c8yi4j8jt1n5kawwdh06joxt409je3fqkdwik9lsgwmyfffvmlatsa6zbxwtzk49x7a0lm929llh38vfr8644l3f8kq6p9t84vjuo99dhm103ucs31bv5kqpjlurgisey2nm6x3hgrma89tljmumc1hhx655kqexh48bp1edeh98jokm4n75uf2utox',
                isRevoked: true,
                expiresAt: '2020-11-05 12:00:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62',
                clientId: null,
                accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                token: 'Quam dolores est et reprehenderit molestiae eum sapiente suscipit consequatur. Autem totam unde exercitationem. Doloribus nostrum similique eum aut consequuntur modi. Neque dolore voluptatum sed qui magni tempore.',
                name: 'c706w4ls0m9aagw6t6kqf6v4dz6hjs7f8p3la5br4el3hl9slv1nfkl5kd5ojy6vmtoel1dwvs8b6g1d77ettp4ujpohrqz7t6umaj71a6828aei9t1zzwi7c9zgmx5gd6109r3q54sqzutw727yr4qzlapsk6uowncb91qrplg57rfjms4y1vur8sizeknloacdmi2c2ftqpuezsrm2q505fvxd7hbgvd95gekgu1tr6m1rvhv2ibry4xq3tpc',
                isRevoked: false,
                expiresAt: '2020-11-05 05:50:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62',
                
                accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                token: 'Harum doloremque sapiente earum magni aspernatur quaerat quia occaecati. Facilis distinctio dolores blanditiis velit sit id molestiae est. Quibusdam non corporis sed voluptates deserunt. Voluptates est nemo unde consequuntur perspiciatis quidem facilis velit. Voluptatibus enim voluptatibus non. Cupiditate aspernatur quia rerum ut iste et.',
                name: 'ljys4i0sjzb3jvv842b93xsz7uwdoz666s4u6p3vr7ccck7060ze399r94ao5wqj4yloutyeqy8j0honjgdgx4uu5p35ezh8vdwttyjah908pzz4gx370tb8wgk69mwmhckrt1ruxvmf066v21k6k9h4h4rjrk41hn4xc99nxyflb76b9a2tuq8rjswbypoul2hlugg19gt2awb2gqwwnsv2supzbj7ary9bczzjn8krgavocjsxfk8wryngoe1',
                isRevoked: true,
                expiresAt: '2020-11-05 07:09:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenToken property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62',
                clientId: 'dfd1e813-e633-4535-8f92-3d66aad026a7',
                accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                token: null,
                name: 'aqv6orhsohp5vrogv6yb6hmyycizbonkhdm7zlyz85vg9w6a1zgf3on5xs5259sm9vsf2oq5awm06tft4v1qzaydw6jibp5c852ii12mdeehd44lf4xmy1f0fh61x09rl7icnvmho5p23zdmelpwzrs0d396nib49ahlo1ivi96skswraz73a1t6c54t467anxzjzk09j0igyo5zql4us3x7bm7ljvqrtgimzbqtyvvc1p2oz04hqy345uwds6l',
                isRevoked: true,
                expiresAt: '2020-11-05 10:29:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenToken property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62',
                clientId: 'dfd1e813-e633-4535-8f92-3d66aad026a7',
                accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                
                name: 'gfi6waxaou60vuqojrgjbtbgb7ngesc1glgm94cnojql3wc2wxrdlarvwwj5774hlvs5r9tjqt28egncrrut9qmibz7je7p5617t9qro8yn9cezxq2ykgueyw2m9k2i9hiaf0gzub2m5lpwt0cljjt5ycrlw0k898qpvja30y3nnrsimwcn6qh3ee5kkipmoloxhzu1av27wwakuirt0y5neyv3acag5hl1befleil09g4rmjzj11qlsiop3hkj',
                isRevoked: false,
                expiresAt: '2020-11-04 18:38:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62',
                clientId: 'dfd1e813-e633-4535-8f92-3d66aad026a7',
                accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                token: 'Mollitia earum ea. Asperiores reiciendis qui voluptate. Suscipit placeat totam et voluptatem rem aperiam provident unde. Suscipit nam aut quisquam consectetur labore numquam delectus eligendi modi. Voluptas dignissimos repellat ipsum ad deserunt modi. Non vel et.',
                name: 'o424zpfzh4kiiv2sw2sgw0muyl55t9qhynulpxwkqenvcvzd5iq59f2w8amzd7qpvzdm7fiuuw6kxk8fe0adekdi2l30ixxg80afefaevsy6cbzsnm2ekeu9u0zrdsxpyj33nh2s3bk63ex4fl8nmgp9mpc0dmueyxdci85jwz6jfv67q9qpxj0udvknvx9ag0hjvcxydkz37q2qpmi7lr5f4vrpj0eupa0ksu0ut9nulemkz0cmykolycwvhyn',
                isRevoked: null,
                expiresAt: '2020-11-05 01:55:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62',
                clientId: 'dfd1e813-e633-4535-8f92-3d66aad026a7',
                accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                token: 'Vitae natus in ipsa sunt quasi. Praesentium et officia. Maiores sit et velit iste nam fugit. Excepturi iusto aliquam qui id aliquid non repudiandae a. Ut qui est illum sed.',
                name: 'vginx6dg7cbpaszkgvl25r2xgz395mv0534ns7py8i70o8d0758ueh19nqy4dngst9rezy8zljj1mqmhgwpy1obhs88mau1q7fu4kee8fg08wq6e6e8u8ht7j655b1haxx6kattvxlc49278ys7s1fdigh6vvmjzmuae3h9vwers7du31svxwx2yzxgzqj1rsj47rrkplyj3gfnxqp4ic2vpnd1t1n2jsc1bqlk22nbv926fiow3g7xx4kxm5af',
                
                expiresAt: '2020-11-05 15:08:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'n47u3q19quodhl7njjctvqqzni818m0ytly2a',
                clientId: 'dfd1e813-e633-4535-8f92-3d66aad026a7',
                accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                token: 'Veniam tempore aut asperiores autem accusamus qui quam. Voluptatem quia qui ea animi laudantium omnis. Reiciendis voluptatem et aut. Expedita ut molestiae esse officia expedita nihil nemo. Quo eligendi cumque iure quaerat rerum a sit facilis. Impedit ullam voluptatibus numquam ducimus laboriosam architecto.',
                name: 'epgrytl8hybufm7hcawn6rrclicrf578uj67efary007myodlr0p2wgrmixbhpq8lmoxfryvbdbkc5zp06wxgj3v1bb8s8qzi5auvmr13f78tcof1ddqi7qu31yc36fdjw41lnmwzzx71vg5um32rln9xm4d1qmmquvlwo3quttzhb4mr82ggxgewdl852w86dum9pb7sc55m0ahuyaq4u6c0867nmt2ber1cl135w32e44w1abzxru08rb6hw5',
                isRevoked: false,
                expiresAt: '2020-11-05 04:14:32',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62',
                clientId: 'arvtes5psbzhxonvak3lkpzkrd9tmjv7uimp3',
                accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                token: 'Voluptas dolor sunt optio iste perferendis fugit. Ut dolore minus iste. Sed alias ea aut voluptatem et voluptatem ut nesciunt. Facilis saepe sed architecto veritatis at. Consequatur accusantium occaecati et ea in. Eos et dolor blanditiis voluptates a harum nemo sed maxime.',
                name: 'n3h6a975lpj5up1om5lwc9gjcf4i3jmi01wme5rmplx412p7j3pz0mgls5w0krbqlvimpaz0l9jtc9ib94ybty5d96z08jcwy5w23y50jrho0zo1yggnxpzweearldut7i85adrtnj0od5iew1m96rlgdwxzmrzab1k55ybfg1s8lbhf8x58u9hjzqmlzdqj2vw63wyjmnhb1kgo0mlw3k5f504a3ef9b860g8k9gvogc4rvvaa8xaopl1hqa7q',
                isRevoked: true,
                expiresAt: '2020-11-05 05:29:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenAccountId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62',
                clientId: 'dfd1e813-e633-4535-8f92-3d66aad026a7',
                accountId: 'vmlbhpaxha1jq0xc32jchgkt396nj20afe46z',
                token: 'Eos sed voluptas ipsa. Minima maxime repellat quisquam harum nulla sint alias. Nihil quia quo et at enim similique neque. Corrupti excepturi iusto sint et commodi quos dolorum dolorem.',
                name: '46u38nzjkpw38rcymi37mgnfmxvlr6q3kxsb99hub5pvxaqqv2jqrff1hajm6at4s3p204llezzh9dipjtqg5l1bw86tck7i3wvkxcuz7sc7ke65pvp11v8xakbcxiuan4ck7l4tmm1bwwp358f1v96eiyvxp6cr6kwbzs0732bpecf835s1k8pgt8pmgmdttn1ei6j6muglwyiq043yrh3muuae7w26lb0or4kuz1kzlz2ir58nwdrrx2vdfkb',
                isRevoked: true,
                expiresAt: '2020-11-05 12:16:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenAccountId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62',
                clientId: 'dfd1e813-e633-4535-8f92-3d66aad026a7',
                accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                token: 'Quis quos debitis necessitatibus ut molestiae. Perspiciatis quia et voluptas nostrum eligendi sunt. Excepturi cupiditate est voluptatibus.',
                name: 'rfbx5l1tanj2gyh9f5400lnwh5rp1kk00ouy6mjxy40khyfqfcl2kgje6wyrd9a11k5zanxyar3tqpxk0vgowe6oxdywlmbkrg1570nvyqxak5pgu5wjayfduheyjwep5dtnbsbmwjzophsrn2olnecqo4fwhcxh1iwpl6qxxurdgyiymibxpqf2t8khnr921vibvdzb4j495qo0cz4kdgiq6o3iw0qodfot7gbayqdku1658kymc2t36t7849r0',
                isRevoked: false,
                expiresAt: '2020-11-04 19:24:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenName is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62',
                clientId: 'dfd1e813-e633-4535-8f92-3d66aad026a7',
                accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                token: 'A sint velit id amet corporis perferendis est. Harum architecto quos a vel et enim. Nihil ut eligendi eligendi quam excepturi. Mollitia minima distinctio. Aperiam recusandae explicabo sit dolores ea maxime.',
                name: '2qc6edzuj5snsk58141ke7fb15kzqa09cbkk1nlhmnmtlhab05eczypqam5x5e4i8hmex8ruutzemxin42qx969vk82wbg9aaf9hryb5pmjcbetu17zxhu1ei47t69gy3bpoeajwrn3afcddle71dmdbcmr5ca7zz2l5n3zpp917ybpqcichl1b3v539bh1vep80i8hex8vhime9fir5jy9ffsps9786epy3q0519vfflxxz8kkt2qvccmf2to8',
                isRevoked: 'true',
                expiresAt: '2020-11-04 17:30:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenExpiresAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62',
                clientId: 'dfd1e813-e633-4535-8f92-3d66aad026a7',
                accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                token: 'Non aperiam accusamus maiores perferendis deserunt alias et ut. Quis sit iure ut ipsa ex voluptates. Vero et et blanditiis molestiae non cumque eveniet itaque accusantium. Quaerat reiciendis molestias.',
                name: 'f3o3z1twic58mpcdpp217yzqucpc7e4o5wef6t44slxobz89bl80odawcdwm61mpkj8h3423dmh23m9guyuxxhtw22rmnolhawuunq9drlhwerz5krq4s40vnks1sliadgq0c3cy3h2479rj5munr3tegrid7mwmnt5zc3cij2yypegaiy2s78s1w8rgtdip90tgipsqaqzzicygb9svwumv1pvai8oijtmpdah3fw9069549i9ns37swpsibao',
                isRevoked: true,
                expiresAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenExpiresAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62',
                clientId: 'dfd1e813-e633-4535-8f92-3d66aad026a7',
                accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                token: 'Et id maiores delectus. Iure possimus reprehenderit. Mollitia aut provident. Cum et voluptate vitae maiores ad ut et quisquam. Neque quaerat sit sunt aut rerum delectus quisquam.',
                name: 'qxvt56jhoa4durusoeb3zxd1p5lvuk1jy2wbqutsugzbd8b43paafo8yxh95dhsd4t2irs5tas4ab7r44kz0zf1ikzmj0uo1efpspynlqu1pnwt66nft3c1hlw4cu7gm9h36aikw88eaxxdpwzclwtw8f3305fkebn122ixyfzam6hhs44bhudhmmojxi78n7wkawde500vta03mfz58tu1bjekz4gi7bmkw9k58lf03ngdxddrz5j8zsy5t2n2',
                isRevoked: true,
                expiresAt: '2020-11-04 21:01:21',
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/access-tokens/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens/paginate')
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

    test(`/REST:GET o-auth/access-token - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '09203f5f-7a87-4e92-8d34-6a4260ec9c80'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5c4d78f3-7bcd-4d56-8446-668d018d3e62'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/252decaa-272f-4ef2-9ed2-27aa0a2dcfc3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/5c4d78f3-7bcd-4d56-8446-668d018d3e62')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5c4d78f3-7bcd-4d56-8446-668d018d3e62'));
    });

    test(`/REST:GET o-auth/access-tokens`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/access-token - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '6829305d-bc24-4f73-b8d1-228d84dd306a',
                clientId: '3fc20810-4712-4d6b-980d-00d916387a42',
                accountId: '8ef4803e-afd3-414c-9592-3ebb6bb99e30',
                token: 'Quis sint tenetur qui tenetur. Id eaque fuga dolorem laborum. Autem ex aspernatur aut quibusdam dolores sit sunt. Velit unde officia nobis rem pariatur. Fugit omnis molestiae sint eos delectus expedita hic aut dolores.',
                name: '5qrtoa1o4xzmjaahm7l8bgoi3bg8e9pfq2h137owv1gvrpqowsd66nbn9xpumlxcd616xeljztd2xfyjio3o4fvlolzkj7sajvafmnx620zme8rpo0t1mz1h0m2dvzk8lkt1i0gfu339rmh3olyd0doecwl3trkdou20miojipyo2q00iiax7bjcqvmps9dqy9h459iyxxwfcfvjpv3jr1uruujazzfj2bi0nrh2npus38zhrz41jwrlg6br7y1',
                isRevoked: true,
                expiresAt: '2020-11-04 17:56:59',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62',
                clientId: 'dfd1e813-e633-4535-8f92-3d66aad026a7',
                accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                token: 'Qui occaecati quis cumque voluptatem. Veniam quam animi. Accusantium non ipsa omnis nobis accusamus quas placeat. Quo quae dignissimos impedit et et quam molestias repudiandae cumque. Illo adipisci voluptatem atque asperiores aliquid blanditiis voluptas iste.',
                name: 'chrse3ygf3026vfaf57mijcsr657199lzfof6pun5a9a4nq3wda7qan3d29ybe6021jft18vjxx6nt8khxpbpt2l5iwwhakym3pnbesc8t64gineixqt7jsy9v6hxeqjw2t4l81vzx147chz9w5ww9xjlm3aquw9r3cwce4xbhzqcnocbi4ihl71us6x0zltshbpxwj35l6eqyum1mgy9zzx1yup6i57hw07ht9ys7ssqtqf5ce72ln10lv25dy',
                isRevoked: false,
                expiresAt: '2020-11-05 12:49:43',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5c4d78f3-7bcd-4d56-8446-668d018d3e62'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/8bc3ea74-442d-406a-89d0-3586e3efb681')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/5c4d78f3-7bcd-4d56-8446-668d018d3e62')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateAccessToken - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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

    test(`/GraphQL oAuthCreateAccessToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '190a0043-f065-4271-be24-c308a320e619',
                        clientId: 'dfd1e813-e633-4535-8f92-3d66aad026a7',
                        accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                        token: 'Dolorum voluptas repudiandae vel culpa. Rerum odit velit nesciunt at consequatur. Omnis sed earum porro aspernatur omnis earum quo inventore quis. Quod est doloribus.',
                        name: 'vvfhk4esl8rljx22bnus7ua0g6mosia2m1plcpb33t3ki1p764qvfnxldbewyhonbulgvjbady28d9filnoi20idvzvxdj3umtlvhxnm9p3ndprlt0ktvje54293cissnu8105hnf0250sdt00ewz34h8rt0qav41bd4qoyyqb3wmhd0x8dfhj5gvgldbu19i0468qf13wfce45x5pyp8kyf4daihsnwxek7ska5l88hfug2r43xrpmoasf79bd',
                        isRevoked: true,
                        expiresAt: '2020-11-04 21:18:02',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '190a0043-f065-4271-be24-c308a320e619');
            });
    });

    test(`/GraphQL oAuthPaginateAccessTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateAccessTokens (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateAccessTokens.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindAccessToken - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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
                            id: '8034780b-a3db-4459-bc53-ccf61d6f7453'
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

    test(`/GraphQL oAuthFindAccessToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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
                            id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('5c4d78f3-7bcd-4d56-8446-668d018d3e62');
            });
    });

    test(`/GraphQL oAuthFindAccessTokenById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fdd1516a-296f-4830-bfb3-f00c6f20cd38'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindAccessTokenById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('5c4d78f3-7bcd-4d56-8446-668d018d3e62');
            });
    });

    test(`/GraphQL oAuthGetAccessTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetAccessTokens (query:$query)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetAccessTokens.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateAccessToken - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateAccessTokenInput!)
                    {
                        oAuthUpdateAccessToken (payload:$payload)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '01267960-56a3-4f86-867f-493dac1164ac',
                        clientId: '10b2f39c-59d2-4de2-a3ac-680772c4c869',
                        accountId: '0f04c374-edf1-45c9-bb7a-bfc3aed2404d',
                        token: 'Assumenda natus quis placeat. Occaecati quae dolorum sed et ex animi. Quam ea accusantium voluptatibus fugit quas. Quia velit incidunt veritatis dolores. Vel voluptate accusantium amet est asperiores eligendi. Atque esse eaque officiis explicabo dolore culpa.',
                        name: '9h5d1jkcq894drawpnxwyhggyn20kv5jhyr0pif8ad68v20cc0xogm0dmwu3knr9qboazuxqnv57qlzpmz8yrrx8bhya4x96fbujqqffx431iste9exoxsfbmbldday3h7jux6u7mwqri6inbhw4dq1kglgkmfz5a5r4yoc0wk0t1ijpwkhsxa156p633dswdbd5d60orob7see2syqvyfkndk9os7w5u57okx3szixrfcy8d8vwq2wx1qr8eks',
                        isRevoked: true,
                        expiresAt: '2020-11-05 04:38:55',
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

    test(`/GraphQL oAuthUpdateAccessToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateAccessTokenInput!)
                    {
                        oAuthUpdateAccessToken (payload:$payload)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62',
                        clientId: 'dfd1e813-e633-4535-8f92-3d66aad026a7',
                        accountId: '809341b4-82b2-4fd4-97cd-8e7f2b58efa4',
                        token: 'Voluptatem rem ipsam est et doloremque. Voluptatibus id mollitia aut ea non ducimus eum. Sed aperiam et itaque architecto.',
                        name: '16b7l0tzescow3vx4tahljh76nl8ip7npanms8bonu94mhd3nm4zyz4o8ytijy0sk3yjg2td107u0fyxgudde3dtw26afwa4cpwiozmnejkwb77lq18nvrillgnp2f1d248s5alyakl0igi5sb1xr3m9m9eavzkxel7ulmcivkyw1jhsuk1vkmb2kpssz7d9ng0sgl4ap1vre25htxr6xw8jaat7yaoapj2lncsc2xv11l0eka6ybjnwwkl6r3g',
                        isRevoked: false,
                        expiresAt: '2020-11-05 07:41:33',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('5c4d78f3-7bcd-4d56-8446-668d018d3e62');
            });
    });

    test(`/GraphQL oAuthDeleteAccessTokenById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7fd90d84-7549-44fe-8477-3735cb404fb4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteAccessTokenById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5c4d78f3-7bcd-4d56-8446-668d018d3e62'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('5c4d78f3-7bcd-4d56-8446-668d018d3e62');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});