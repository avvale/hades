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
                clientId: 'a478116f-b154-490d-abb4-87c3bb540d4e',
                accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                token: 'Quis voluptatibus vitae maxime itaque eum voluptatem unde dignissimos excepturi. Aspernatur nesciunt minima. Harum pariatur consequatur. Nihil tempore odio dolores voluptas soluta similique fugiat.',
                name: 'ocl5zp387b132z3svq33t3bc36nv2mjfw94li6qdjxbbzlk7axvluvhul6w1neqeqtacc0n8xb461gcvfcy8hvi5p125e1ahzmhpud63lb5htxw4knf3s7x7r2ff1ub03mtx78cid0ff6lqdjiu3pqv9vbyuqqgwjmp70trjtmlch33va1evdrt030d2vlo8yv3le785631fdhz7v6ypt4uw15w2uh71upeg9mjhlvvv6e1ycehwvka8j6nh1nd',
                isRevoked: false,
                expiresAt: '2021-04-17 21:08:21',
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
                
                clientId: 'a478116f-b154-490d-abb4-87c3bb540d4e',
                accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                token: 'Nostrum architecto quia quas eos omnis tempore voluptatum. Eveniet tempora ad rem laborum aut culpa. Quis et temporibus nesciunt eos quo quisquam. Aut repudiandae voluptatem corporis et.',
                name: 'h2a7nf42i2p5jzhkl16mmpop2mrynbzlh4s2ge8l3tka7gsogq3okggw8u0v84t7eh2eanh0hg3htiwd67m5syezq3f12ilofsjzsxkljkh28krjm1hgwk0tn2zia8a9wwf49nfuz0rwqi07rp7hr3xa0i5d3pi054dm4zqjarpaw7c05420e9smfljdx9lk10myhp6q3bt1xo0trcr0ilml23ogsn9zb3hjdo98wdifgik42td35t2unulnyrx',
                isRevoked: true,
                expiresAt: '2021-04-18 18:17:11',
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
                id: '0c4a3205-6ea6-44ef-a370-91df3428ae67',
                clientId: null,
                accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                token: 'Dolorem ea aut asperiores qui veniam recusandae numquam dolorum asperiores. Et dignissimos dolore in est dignissimos qui aut qui. Reiciendis harum hic rerum ut quia harum.',
                name: '79v0l3jmqwao2lpm94tp3rbpm02vmlpet2vrpi3p62h72lw5ux8w0zy3v87ifq88oql9xz5butgku1wsa7m6qarq0jaqs5lbvw54jd34knz6rjdmbjvcmlgw835olpufsmw5e62lymmefopfvfizif8dgdbu74su118n0f4kfyoxn9mmf4sa5fnk6ohe1on01lb0afghu6l47ok6vc9fjg3eiakqeq3olh3sa2mx4vimks7t2i8u5tdnp02fdl2',
                isRevoked: true,
                expiresAt: '2021-04-18 04:47:47',
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
                id: '0c4a3205-6ea6-44ef-a370-91df3428ae67',
                
                accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                token: 'Eveniet id id accusantium voluptas. Hic odit porro accusamus consectetur laborum provident recusandae sint. Dignissimos aut et vel fugit suscipit asperiores alias placeat quo. Reprehenderit aliquam magni provident enim ab repellat sit fugiat sint.',
                name: '13wzzbfyrvkkhpk65bcfu6lu69zv82qxjbx2ukp90lx3yzqmo1alo8moutgjcp4udz83zj0o9owgh87cecn9her7onzw7mmxmxks0d8ax1b7rjsrs15oldyqntx0ioava84nzdylo47pxckgr68ludzo9i7b3q9pp2wtz48xigz9djj2u4c7htfz35zz8odv2fagxc2bz5c8qs9n8ifjozm8r8e56ddzmmvgdy08xf7jojugobo1l7pjrvejokl',
                isRevoked: false,
                expiresAt: '2021-04-18 08:46:10',
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
                id: '0c4a3205-6ea6-44ef-a370-91df3428ae67',
                clientId: 'a478116f-b154-490d-abb4-87c3bb540d4e',
                accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                token: null,
                name: 'grkp10zrubxojndoxlm88guy6udh8u8o6rqte8q5r35zf4250p319vt6fym3mklv2xn8o392107s1zhyb3vve2or144pt6qjq3zhaxdv0pl8nw0ww86k0sgvbt8cpggn9ifs5v1sbf8z8urlysbvbftrqicpd5ejelxt1e5fpr82kazr5o237rkuf2uad93lg97e4xs9r3ixtogh57nvqymk9oqj6zl7rc8cwifi8q9usdleseac23rxicivqaj',
                isRevoked: false,
                expiresAt: '2021-04-18 15:17:13',
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
                id: '0c4a3205-6ea6-44ef-a370-91df3428ae67',
                clientId: 'a478116f-b154-490d-abb4-87c3bb540d4e',
                accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                
                name: 'qwy3xu64799jpbuxxzkdsma51cq543b56iizoes3ookf56vre53xdbvf3mcxz9g87rqidynoiw8f7kfp3lurmec1evla6g5tgd388dhjs4ap47u9dcjjv7349rfnnr5og1y9hdn1q9awh43l3prphc5lu644ycalphk10wjh9b8c07nbhbxa3jq0q1wwugax2wzpal788tllp72ncm3uwccs6fib6neyqin9uj99z3ibhckinlqfoftc9zd4gts',
                isRevoked: false,
                expiresAt: '2021-04-18 03:50:50',
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
                id: '0c4a3205-6ea6-44ef-a370-91df3428ae67',
                clientId: 'a478116f-b154-490d-abb4-87c3bb540d4e',
                accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                token: 'Sint et nihil non fugiat qui quae nemo. Quas consequatur magnam velit inventore expedita enim. Unde sint soluta magni corporis voluptatem. Amet sapiente vel.',
                name: '6d17lsapzknmvbyva9lhvsw7ib24ocizrr5t4mhprdwc3yvzvp4pomanh31fp8gijb36lgo3fm13a110wu0ol2t1p1xxeds76wymi1u2bjsjp6hza2ob6fwgkmu6tf5pogki1zpp0r8q31hpjkv58s7pje15i2rvk4djlhcgxomr0s2z3ujr1nuh1drguogr5r2yne8vkz9p817mfxcf2vqw8ww2ldyb1udthnzy1odrp1qooeuse021rz2myfm',
                isRevoked: null,
                expiresAt: '2021-04-18 13:51:07',
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
                id: '0c4a3205-6ea6-44ef-a370-91df3428ae67',
                clientId: 'a478116f-b154-490d-abb4-87c3bb540d4e',
                accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                token: 'Fugiat dolore ea quidem dolores aut quia temporibus consequuntur. Ipsa labore vitae quibusdam ut inventore porro dolorem. Deserunt omnis maxime rerum quod. Id quo in. Veritatis sit libero unde reiciendis delectus et amet quia aut.',
                name: 'on7t0m8eq0h4ahov0ry8inkss13c4x0zrlphaxdgb50s21a3cbzmpx7pjiaz82wf3enoe5wo9oyex04q0zaqbi8c8gqzfmwrma6rvbrejg6sb7u195c0ptm86nbu841u8kyzuubteuwl4x4sw6p8qwia2v49eat2tfh335ebxa0e4szktvbi5k1axbp42ee9dxi74nk8c06pf7s064d4oakuip4x3cyz6o9m93j48w3s3ao0wvi232v1mj1wtrf',
                
                expiresAt: '2021-04-17 21:28:01',
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
                id: 'yubs7adr6dvk4apqdsgxuczqorg6c2v70br72',
                clientId: 'a478116f-b154-490d-abb4-87c3bb540d4e',
                accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                token: 'Quidem dolorem cupiditate sunt nam. Molestiae harum consequuntur illum quam animi officia nam. Sed rerum qui incidunt aliquam eum recusandae sunt est quam. Et temporibus magnam tempore deleniti perferendis eaque minima quo quia. Odit qui voluptatum.',
                name: 'ju5idzgf73z9n8l8dgg88jf19byhjobjir9si2rw9g2gbpte2yc5l9aqjz3bqlainryfeecw8p3jmxylioo81n1sa4u32ilraa185xuvpnpj2aag6q429e84f70iwtv3od67oliezzkaurz7jowybupmb0fpsohysudq9ie01yfuiovbc3zz96b32bmv85cd88wrb8wxi2462wlyfcob26eeypid2w5mt4xo5kh98lls75y2807mec4361g3op3',
                isRevoked: true,
                expiresAt: '2021-04-18 05:54:57',
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
                id: '0c4a3205-6ea6-44ef-a370-91df3428ae67',
                clientId: '0fh1dpxbvez0ib2wey5ltb50cv5vohyq9omjh',
                accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                token: 'Praesentium est consequatur quos quae. Ex dolore quisquam placeat corporis nihil dolores adipisci quae. Sint tempora nostrum. Architecto reiciendis harum sint illum suscipit eligendi ducimus. Quas ea libero consequatur. Quasi sit numquam architecto voluptas.',
                name: 'yuu565jkmoxx1fgxtjrybcxcg3ov0odazs5x6qvhl4r5dsi5fhcb03gjtbvucp8f0s864zburenuv4u7yar079iyrgtlbk920z6aypnpdytlmdrx0i9g0rwt3lkb6avm24ze72a0lrhy9gd75cih8vkpmgm1lg0t3gw8fqso1if0sofw8jhhv8agzzrj6203rvol8mbkmknbxqytb44wrzxze22wgx4tx15rt8tomnfeez3owza67vq5o25puop',
                isRevoked: false,
                expiresAt: '2021-04-18 11:55:23',
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
                id: '0c4a3205-6ea6-44ef-a370-91df3428ae67',
                clientId: 'a478116f-b154-490d-abb4-87c3bb540d4e',
                accountId: 'zp17t78ifl9lkv5y675n4rd83fa7ab5snjstj',
                token: 'Voluptatem aliquam voluptatem quasi et sint officiis corrupti voluptas. Esse et natus delectus. Officia voluptatem quo alias non beatae nesciunt.',
                name: 'ntfq4f7cg8u1jfbelmhthli6l205iir4ojyys0v1najktzlp1tu560tyou90o3qmug7qg5plpjyhqc9rj157bea23gdrv6e9fj0x7paifogbss654ovsooy9avmfnctpo4crjqnl4pqv2ytj4zd9o9ks7khbjcwzmb3yigr0n52oh1o3chcqfcuh7c9adknefjwqehthq32dh7p61zashibxibtn0ks41b6qv541s9iu7ndt9vo8rncyetg6u8d',
                isRevoked: false,
                expiresAt: '2021-04-18 05:51:12',
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
                id: '0c4a3205-6ea6-44ef-a370-91df3428ae67',
                clientId: 'a478116f-b154-490d-abb4-87c3bb540d4e',
                accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                token: 'Qui porro quos. Explicabo magnam sit explicabo atque consequatur nemo accusamus. Quisquam maiores omnis.',
                name: '8vyqf96a4fb8sa0sdwooxr31d67dmpezm6avdl24qlzfjabe0imuoaesss6ibutzwzpivw62psl6yzt0hjshyt35ycs87d9t3xdonwfkj10bf6i7i1z205mlcmfhpon5ucukl06jvvxcrbucv6ec86ot5czx1h1f65aceympt75cnl9ldehx5tw7c3gxc4zl910nvhfyec01er7wimthml8u5exoldfp55qyyej01f4paky976y6d951c558me34',
                isRevoked: false,
                expiresAt: '2021-04-18 01:00:30',
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
                id: '0c4a3205-6ea6-44ef-a370-91df3428ae67',
                clientId: 'a478116f-b154-490d-abb4-87c3bb540d4e',
                accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                token: 'Eos illo nihil ut numquam illo tempore in. Et non dolor occaecati ut vel odio laudantium est et. Eos impedit nesciunt odit numquam quisquam qui vitae est. Vero dolor non tempora corrupti quaerat consequatur et. Repudiandae quo accusamus veniam modi qui et explicabo natus id. Est deleniti provident et cumque dolorem.',
                name: 'u9q1kt61573yiih85gr464hy7daq9zf19rx90ho5ejrqr5h6ujyg7oovdahbufsttxwtboumzfgktit194n0xc00hhhsux8vjb0fmfj8tsqutlq9ld4bl3bfjaciiagvq175w8lbpvcgsh8ysbt16t4h87i3eq9r7yibdnpinj4351dru8zemuihpbe1jsghjuf9dgn95ouu7d9ood9b2utktur09lljwqj7ek09xbzq847iqi3n0j2km5d4xr8',
                isRevoked: 'true',
                expiresAt: '2021-04-18 09:26:09',
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
                id: '0c4a3205-6ea6-44ef-a370-91df3428ae67',
                clientId: 'a478116f-b154-490d-abb4-87c3bb540d4e',
                accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                token: 'Unde eos fugit harum voluptatem non suscipit. Sit molestiae ut est molestiae velit ex. Qui pariatur omnis. In dolorem possimus ut. Vel aspernatur cupiditate ea maxime quia ducimus a.',
                name: 'i48hhrdluwqlfw4omgmzdigv5t1vjwzxhs04naj3kjbf4p20r0txw65ml77wo4rkw2k31r3pyqktxj0kdq4ghikjcolvrnvemk3pb39qsom8w0iexnh1mnoith005c6x7y7uq38uawsqmkcvxajqxf2gim1mj9xl8jkg2avb6e9hr3j123d53lwdct9nh23ys8ezsd2hhy2ke23fxough9vun4r3jpd7h1quu97nzuyxxwl4req3h1pjquvb2h2',
                isRevoked: false,
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
                id: '0c4a3205-6ea6-44ef-a370-91df3428ae67',
                clientId: 'a478116f-b154-490d-abb4-87c3bb540d4e',
                accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                token: 'Laudantium illum quam aut. A harum asperiores dicta delectus rem consequatur debitis. Accusamus corporis sit dolore similique. Et voluptatem tenetur est cumque iure. Doloribus est fuga molestias pariatur voluptas eveniet. Voluptas ut labore autem id quo quibusdam doloribus.',
                name: 'qmsa4kmdrpu5op7ijzsa90fy7ikj5uwjd27r20gc8bfirp7bytxnl1syyzgq10stpetqmf4ppe0yojwatdw4umeod4odnfldlqkxxbz5f1xffpuplw02hnb1dps5ap7m7tn6jk51niv0zb9wbggcpcoasg6yl8suk2s5tzv0aj8j90vmjstrhbn1xds7a1dhbsdbehxj8jbrrux6haqrdk2nk7gyv4ocxfwu70e3xg3glyeh52o17bln8bbbrkw',
                isRevoked: true,
                expiresAt: '2021-04-18 10:11:40',
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
                        id: '0788bf7b-9e9c-4eea-8c2f-17b2f578d685'
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
                        id: '0c4a3205-6ea6-44ef-a370-91df3428ae67'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '0c4a3205-6ea6-44ef-a370-91df3428ae67'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/27b6247a-09e1-4644-bdb3-45337d76f99b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/0c4a3205-6ea6-44ef-a370-91df3428ae67')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0c4a3205-6ea6-44ef-a370-91df3428ae67'));
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
                
                id: '957da58e-31a7-4ee9-bf13-bc5480004869',
                clientId: '230bee59-2269-44d4-ac7b-c0ddf64db656',
                accountId: 'ada1a648-76d1-40e3-a618-0b4dbcb07794',
                token: 'Ratione et unde voluptate magni necessitatibus corporis ut quia. Ut qui quaerat voluptatibus reprehenderit ut velit suscipit. Omnis sapiente provident delectus pariatur architecto veritatis quidem omnis. Aut quae omnis qui animi. Exercitationem consequatur doloremque dicta quam omnis qui fugiat vero adipisci. Nobis qui nobis.',
                name: '812zve1yjvpwjl797iw8zm52i372fxydsbks0jqealhy6evae1skmbsoqhnk2f2meukwt6a8ad4dowfgk595q65u4np66xo5ij2l95sxff1xj9vpl6dd9rgzj5f8jds0dqjh4jg2wh4bu2u0pm3qgoj85n9tr6ek8pm65oi3sxhhhcpdrwq703enpq6uu540etpoi52b3lqpah2842c5r75srdcr5g1hkafi4xbu8yp3ktbe1px7u3l58vop0g5',
                isRevoked: false,
                expiresAt: '2021-04-17 23:14:44',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '0c4a3205-6ea6-44ef-a370-91df3428ae67',
                clientId: 'a478116f-b154-490d-abb4-87c3bb540d4e',
                accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                token: 'Error recusandae animi. Perspiciatis architecto rerum et voluptas aperiam nemo dignissimos. Laudantium rerum ipsum illo doloribus officiis laudantium velit labore. Quasi illum iste voluptas dolor. Enim cum officia modi sit sed ea.',
                name: 'epcu2gjkhqj2n418lry1f1kc4cf3l3bdu5xw5opu190h9weixmu1y263o4wg9zjv3j7plylca5euf4v54eh0uc2fu365bwo1dpidywslpy4ky7yj5tj8nu00se4x93tq1p7slbnwjrhieqx7u8o2xy3u4sho5vdvgtp3hb15v1bln0b7byqksjuzafcs731a2diudj27wrsjdy8ga8ns8vh4pzcad6bjnjk3tkkze1l2r1mqe2a6do8857zlm7y',
                isRevoked: false,
                expiresAt: '2021-04-17 20:43:30',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0c4a3205-6ea6-44ef-a370-91df3428ae67'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/e067b65d-3c2f-49cc-bf21-00e9b312c578')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/0c4a3205-6ea6-44ef-a370-91df3428ae67')
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
                        id: '04543564-3e8a-44b9-8b25-73a908a69ee8',
                        clientId: 'a478116f-b154-490d-abb4-87c3bb540d4e',
                        accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                        token: 'Aliquid ex aut et illum omnis vitae. Dicta est dolore officiis sed. Voluptate enim corrupti voluptas. Culpa perspiciatis architecto omnis.',
                        name: 'fswmf05mqo5yxo2j3kxm5ou41dw57i8gel8o18wv3ue6rwpr6noffxjiqcg50jnj6fz15xt59umrd2d2m11uo9jec66f4nvvo1sxn7e5ygllrkgysw4crj2lfzh57tvl24ed88458hljv9op65ewbuzynec015ic6aaffix1oevdm43b820j7xjxpn8dtd1tyu5z87ymcjv7dfuh7xxffr20yju7wz8sj252vykwq7o4pzlzsyruzustjmpwxf3',
                        isRevoked: true,
                        expiresAt: '2021-04-18 14:12:53',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '04543564-3e8a-44b9-8b25-73a908a69ee8');
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
                            id: '089d0e77-7fd6-4d1c-9c42-764774be0695'
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
                            id: '0c4a3205-6ea6-44ef-a370-91df3428ae67'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('0c4a3205-6ea6-44ef-a370-91df3428ae67');
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
                    id: 'c0efc0e4-c0b2-485c-865f-a3b789363828'
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
                    id: '0c4a3205-6ea6-44ef-a370-91df3428ae67'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('0c4a3205-6ea6-44ef-a370-91df3428ae67');
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
                        
                        id: 'c092bc16-97de-4e50-862b-86ff5154adec',
                        clientId: '82337b27-1930-40c8-9b01-2a37e3930b67',
                        accountId: 'b6f5738c-23a7-4c25-bea4-38f515e77f1b',
                        token: 'Sunt voluptatem accusantium sit vel soluta dolorem consectetur qui voluptatem. Aut voluptas et blanditiis rerum et expedita ducimus. Porro qui omnis nam omnis qui.',
                        name: 'jkcod9f2y6e2nznj19skvlxubkplh1lsyevy13inz21xjf2padg92s936v8d0rv7vdy3oxg5w14h38jlocngo6f4agha4v3nioxvv1hrjb2bw04rz4oae6q6h2lqyhng22eq9ivihew27sig74zrd5dgke4yffk3xd9u39x4kilar31xd8krw9umdhaegn4gd64emdic8wedrk86dtqcp2t0bcctj0q23n9is45ur7itedrcbpuiui4m4mo2cfd',
                        isRevoked: false,
                        expiresAt: '2021-04-17 22:46:35',
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
                        
                        id: '0c4a3205-6ea6-44ef-a370-91df3428ae67',
                        clientId: 'a478116f-b154-490d-abb4-87c3bb540d4e',
                        accountId: '86c7d203-3f5c-4b0d-b822-c0e78ef4c14a',
                        token: 'Veniam voluptatem temporibus. Deserunt totam quisquam. Debitis aut nulla odio qui et perspiciatis possimus qui. Soluta dolorem consequatur magni cum. Dolor at est.',
                        name: 'ue32uliidz35chllxh0umjs9zmwxpsnsma62nt3i67upajis4jeomvgf4buo6ikr9gac1mcgh52p9su29dome58psodoyt7rgfrpar6jcrwk33h4uu95mo9aze3dhfk91xb2qmviorijc2u3ruv8bo9u88l3vkvgt9zvnrzrm5anfjm5z4z15zksslr1ed2rr9qr3ndubda8ubndvzje37cp9cmfbuqgcxkuortc2p7mtinfcaqf617uusnqp8l',
                        isRevoked: false,
                        expiresAt: '2021-04-17 20:08:51',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('0c4a3205-6ea6-44ef-a370-91df3428ae67');
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
                    id: '4f321854-76eb-40ed-9ddb-c4f5f1a23d9b'
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
                    id: '0c4a3205-6ea6-44ef-a370-91df3428ae67'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('0c4a3205-6ea6-44ef-a370-91df3428ae67');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});