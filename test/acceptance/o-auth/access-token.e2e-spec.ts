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
                clientId: 'eb053da7-baaa-40d7-809b-24e6056b9972',
                accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                token: 'Ab deserunt omnis. Voluptatem officiis sunt autem officia recusandae omnis quibusdam sit quam. Distinctio adipisci minima rerum corrupti animi ut qui. Sed aut aut assumenda. Laboriosam illum iste.',
                name: 'n5pqew9f6sc90q7ewfmy33s6zp6wy12tv7s22tljzo5td9d20e7283wwzjd3f63kqlgcfau1r75pgwe4q5yd4o478xxzgm93dctp5l95u32mixwh32ahtp2lpgdfe6wxa3m4hrm6lvwhvubknoug9mpamr3qnwhh0ywhj22p72b4nj7q0n5i0rton1pvfjpb920vo56jo73xf784oepkxzm4uhu7d4f2ndj9ar6bswicahrw04p5hdad0ce4h9o',
                isRevoked: false,
                expiresAt: '2021-04-18 12:23:59',
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
                
                clientId: 'eb053da7-baaa-40d7-809b-24e6056b9972',
                accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                token: 'Voluptatibus aut in in. Nemo sapiente enim. Facere molestiae voluptates culpa et aut. Earum laboriosam dolor voluptates voluptatem velit placeat quae repellendus.',
                name: 'gv8e1bem0u3p5bmz6juux3kw8357wrdd7zjld10fzvdqgvitytyc579xvenchrto7yyab19b3oa5kusoz6r6r2b1sb91vrqmtaqsd5bsvfaa55qwj1e4kq38gx1ho8lpp4vqucuzhu6bx913i72i3tb01xkppe1pmd54h2ivirygbjnl2oivwry2i9xdrrls99pfkaol646q4i5xh4fncf4zpho7d7fb2s6cyjwz276pzlrf6odpkgjmlf9stdy',
                isRevoked: true,
                expiresAt: '2021-04-18 06:09:09',
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
                id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9',
                clientId: null,
                accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                token: 'Nisi possimus exercitationem omnis dignissimos voluptatum. Assumenda hic praesentium. Facere iure minus ut voluptatem iste dolores temporibus quidem. Quod nulla laborum sint architecto totam est nostrum quia.',
                name: 'zj3lcg6eylkzk9ujn3it43x31ymeeooeods7lgldn65ru7kjowk76da9vgymmxwfyl3j6ibi7awaeougn3tqlpg0clg262rhc29iqzy3c5v2ip21zpncgamugx00g9q5lp5fl2hm9qu2g47zoc7nq3ggyicemsm50sha19rkjaeu7ylfn7kuvioryii676jkfywhzoxx2h1lnoynkdvedc18lpwi233hn2y5f1j3ilcpbmh1nxc119rdh5jktuc',
                isRevoked: false,
                expiresAt: '2021-04-18 12:04:15',
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
                id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9',
                
                accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                token: 'Explicabo quaerat ex maiores excepturi eos voluptatem placeat. Ea hic optio facere. Accusamus sed sed officiis dolore deleniti. Excepturi doloremque amet minima nisi a delectus quia officiis. Sit quae iusto ad sunt aut porro qui.',
                name: 'qa00y5a2q5q1vfypjbqfe01dirz7xmhq2q88lltw2aoys6krrbhhqhwgezawg957unc6to5d3vo3upehpo62xegefkju0i7uk3mjwcibjtgro13daqp06te6xov1ekjdv8obxoxoiaqlnw1rh1bdkrmf5uu46wg8pk16641fguqy1uyprmprne9nwm18ynf6pp0vxl1x8bnzbh0w1qax24tmuctvl75r7gupue8ap1tdaitgiaznoe1t069zsmm',
                isRevoked: false,
                expiresAt: '2021-04-17 20:49:55',
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
                id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9',
                clientId: 'eb053da7-baaa-40d7-809b-24e6056b9972',
                accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                token: null,
                name: '3lzmmlk7c90jv595er22ud6bnwl753f32s21p2trxsps02liz7evhykp5j50zypqaozm0ob82x24rwuj7e8qv23zdzhpn8b892r8lk2wqivo37qyq5nfjkbj8k58vzpf61r0jfdsx2wd735bxnsc5na2fwjxqw57scxkce4w1882q800nx3pombbu49qqh6j11sxhxo8xulz2hue0rzs2br0sm6y7fkp6evniskc8itxfpd0kez777eaw46xr9w',
                isRevoked: true,
                expiresAt: '2021-04-18 12:09:21',
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
                id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9',
                clientId: 'eb053da7-baaa-40d7-809b-24e6056b9972',
                accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                
                name: 'jadk232adq0n8prk6uxk5yvhwg2l7ew46dynzsv8psjje7xh03ps9ez2izdhvx2awb62vrfi04c7j3wkl90562l6vmx3a5f9uazq8btgsqodj2rqn4qu3xd1zuvyipxlfsnl1ie1jfuqbyz94sznbbb3uj83tym8k28mhxygckrgzjgj7r668mn0q9hpow48vb9n2fboh7l97ykqayrko222isgcfvyntjm7s9rizjqvjj8pyynu2g6eauzyi7z',
                isRevoked: true,
                expiresAt: '2021-04-18 12:35:47',
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
                id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9',
                clientId: 'eb053da7-baaa-40d7-809b-24e6056b9972',
                accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                token: 'Magnam recusandae voluptas magnam. Quo veniam rerum maxime neque consectetur delectus. Nihil est consequatur nisi tempore voluptas voluptates cumque quos aut.',
                name: 'ic09tnjn09m3n0v3uhicms3smys2mmso0giz6fm6qk1t8tsqrj9stmqzinhb16d2yvr83yj5jx1yv4aeh6d3j3r98ydgggnot2d60g9r75ydukeuec5ulrx3f5dyo917omihwujo930xogw6hblz92c9fs8v8aitq18bxdhxuwz7arlm6iuovqwt9ji05sgj951ttcbnlwbvmn2szc679pbxg31t36j4dadgo8v0qr4bbjgd6gi34d7cmlb2x64',
                isRevoked: null,
                expiresAt: '2021-04-17 19:06:38',
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
                id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9',
                clientId: 'eb053da7-baaa-40d7-809b-24e6056b9972',
                accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                token: 'Aut eos quam quae sit molestiae ut qui. Asperiores amet dolor voluptas fugiat nesciunt ut magni cumque doloribus. Tempora fuga cum distinctio dolore sunt explicabo eveniet aut. Dignissimos dolor quas rerum soluta eaque est omnis et quibusdam.',
                name: '7qts0zayun3jg8gotkwlzoi0kk9lkjf9i39npap3072jz0t31h6evai1yuep7nte0hus0hth1quts8r7v24q6zyv9y5lsvc0ys994ourby4pwqjayq56xoufyuearunzgiogx30iiz1tcp4kbggwxuulf80v0g2wcn1c6ivjqu65u032nv369adtua4t282wv803h5k5ystpzrnv4b1mzkw3motgt6unai5vveqbrzvotapcm9x62xa5r7fsynr',
                
                expiresAt: '2021-04-18 09:12:49',
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
                id: 'lpcj2xnm6q62m01kzj565wctp4wap8jcdesnf',
                clientId: 'eb053da7-baaa-40d7-809b-24e6056b9972',
                accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                token: 'Amet consequatur sunt et et laboriosam accusantium ducimus perspiciatis velit. Numquam minus voluptate et. Animi minima animi aut magnam aperiam. Explicabo minima voluptas.',
                name: '1c3g8s8dxznp13j198dnubtpehiaxjd7obdfhrt2zqrz3m7nasqpqen19u6p0jz8o78fq5gi5ybsj7vktvhxx1hdlgd4kc87stu8kmn3rqaxwompimgu4ayeok4j5i84jlwsdwlc7xu4eq9aozgopsjconcio1o1cy4m5ljbudpfxoqcc8jw8n2zab28ejc4j19v5x2exkplqigj05ka5o64deyvcyrz7oou7b468zcy0rxextq9wzm3aljf47r',
                isRevoked: true,
                expiresAt: '2021-04-18 10:07:51',
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
                id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9',
                clientId: '2yvhpvrkf9zqbiob1jxmym26ureo7n8clp008',
                accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                token: 'Repellat recusandae vitae quae repudiandae alias et. Voluptas qui sit id. Ab et deleniti animi vel impedit placeat eos. Harum ullam doloremque laborum autem commodi error.',
                name: 'nnhvre2x0oelyzmwbnkizpjlsxx4ozycnyj7k8mwq47y7pcmbqhpg8a35sdawsy4c3dkqt8szs8z21hqcdwiesv6nwjahrpavpwopq9xj02pcnp1ysfptefbv0yp7f9b7xl6ajkg72g9c72zi37205r5kimcdv6gqx2djzocscg11qo9kwy40o47la60sqfet7k5yeurd3nhagci6h1lr2za9awaxrmf4e8pbo5whylsyqd7lqxmjkipbtf3u10',
                isRevoked: false,
                expiresAt: '2021-04-18 11:59:26',
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
                id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9',
                clientId: 'eb053da7-baaa-40d7-809b-24e6056b9972',
                accountId: '5jaqr3qteicwgrui01qe9ald6e5iawipwrdpz',
                token: 'Et et explicabo assumenda exercitationem voluptas consectetur rerum. Ad quae quia similique excepturi nobis aut laudantium. Ipsa ipsum iusto mollitia ut quisquam numquam earum provident. Nihil ut a non officiis quis qui atque. Porro omnis id aliquam et dicta rem dolorem eos enim. Et dolor sint inventore laborum aperiam.',
                name: '43l00vtahyje1snjftfl5suhyspbivz8ubsee3b5kn21fa0cwsjob4x4ccki3y1benvy39216dq4megb0qbmy47gbb9t5lbvd24smf992nmkzj01xqryamhafpciaxm12dgse0keskrd4fchowhkeqiyuivfphe64cy02il6k67ngzik6vwgjrbaquvl1e17qbec3p55dod7ijb5fcuchxojnu9xd1jjktb1dxgmgluf2h3jlse8t1yxihx5pcl',
                isRevoked: false,
                expiresAt: '2021-04-17 21:21:42',
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
                id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9',
                clientId: 'eb053da7-baaa-40d7-809b-24e6056b9972',
                accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                token: 'Fuga cupiditate hic ea asperiores quia reprehenderit natus. Rerum quo doloremque neque maiores. At aut ut asperiores repellat sed est eos omnis. Voluptatum debitis iste illo sunt ipsam doloribus exercitationem. Enim quo cupiditate quia corrupti.',
                name: 'a87weecg1tcnro3em4f415mkd4wajslpi0rlmkvboa50moiv4jd4ee92xz0dxkqpbfrqish66igrj3xa7z8cgvsletvcxvh2b7jshcvzhilkkfzri7142uo5jzglh0qctqmoodg2vcio03nq8p4e586uwo7c43s20d9hkwv7d2f0pul9ebfesthj8de7n94ptwlz1f96y631dtrhsv7yaquecpahf1961lwfmqdniwxkn29zouqonija3rvcgawl',
                isRevoked: false,
                expiresAt: '2021-04-18 04:47:41',
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
                id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9',
                clientId: 'eb053da7-baaa-40d7-809b-24e6056b9972',
                accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                token: 'Nobis delectus qui labore vel in pariatur sint aspernatur. Voluptatem optio explicabo id. Eveniet qui eum voluptas. Illum et quos et nam laudantium reprehenderit in. Quia et ad. Sit consequatur alias accusamus cumque.',
                name: '81nxw76451otl2bhcdkdhkpp5ew5jx7b4g8r21irdrl976d8u209ybpyn6a5szzbxnz3wxydy52cpqufpkvyzjx63exzvm5s76e5lxvvpbn4b8vkfvicx3mow6ex92vxjdjznj9x2x8cw7go3nsh59ej2gyczj21ub14roc3uzlywgtbpsu4wxpbb6xo6q2jd4ucqmxfx6rwry26fqp09e4de632194c2lotamoatwz4u70hsu0l2hhl4dp19gn',
                isRevoked: 'true',
                expiresAt: '2021-04-17 20:08:49',
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
                id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9',
                clientId: 'eb053da7-baaa-40d7-809b-24e6056b9972',
                accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                token: 'Quos assumenda corporis ipsa distinctio sunt soluta est quisquam. Qui atque est alias sint repellat laborum nesciunt sequi magnam. Nesciunt qui vero quae porro eaque dolor cupiditate architecto. Quo suscipit atque distinctio voluptatem enim quas aspernatur vero ipsam. In labore dolore facilis doloribus. Voluptatum perspiciatis suscipit.',
                name: '0402g3pdptoxcm6oyc887smzoceltmu4bxmvm7mkjeicsaldor48zhxm0o22zrwpw301ovopv5jfs301ihz6925osmnk3fqnjgrrle40jrf3n0ydsr4il05q5036nl4nwyvosnc1ltelm6zwjcoj6zwhgdw6mzx7uocxwjbuxf9zjhojls54qwdrxrkcx0oi1klk1yiumrs7nwlplsggqjh15ycldh0azx50by7n5ikp3b39bc8k7d887rau38k',
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
                id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9',
                clientId: 'eb053da7-baaa-40d7-809b-24e6056b9972',
                accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                token: 'Est magni cum deserunt cupiditate eum. Rem ipsa non nulla corrupti non facere. Pariatur deleniti est libero ut sequi eius quod quo odit. Illo occaecati eum culpa debitis quia quia corporis inventore voluptatum. Rerum temporibus quibusdam animi repudiandae vel.',
                name: '6kg331ce01iu1divxfq3y65iobk5ve5go75isfkxa093qdzzr12obczv9agr0f5jze6b4qoahmziopu2rrsbghy8l96t5wpb17vxahxg4xttoljvsu3ui4i7nbpbadu3oljoq9f1u0ou27dh8hf6wuuuzg8jsd6oe14hbnmfxmtun7xi87ic5h62tptazcnaedhlm4k1lz3apn28mc9z4vgn580b0fo93pb4og79ps3kgqx8ro7efc1s8wvvyho',
                isRevoked: false,
                expiresAt: '2021-04-17 14:10:50',
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
                        id: '3e26376f-a0d5-4083-9fdd-e5c050dbd6d7'
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
                        id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5a3187a0-86c1-437f-b7e9-5f44fc3697e9'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/3ce04df2-35e5-4478-9e29-1a95ce2e4f10')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/5a3187a0-86c1-437f-b7e9-5f44fc3697e9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5a3187a0-86c1-437f-b7e9-5f44fc3697e9'));
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
                
                id: 'f35673ff-4835-44a1-92a0-7164df50bdf8',
                clientId: '3a6d1c0e-cd4f-4d16-a693-23b18766b374',
                accountId: '0594c46d-8785-496c-8f0d-bbc06bfdb2be',
                token: 'Sunt quaerat maiores sit aliquid. Ut eum itaque qui provident ea beatae temporibus. Dolorem cumque laudantium qui iste.',
                name: 'bpxw2dt5x1gcufhc7qmpimwsro068orgmyzggy9f7yx15nyfum61pnd4r6fqit8zvy9lnjmnkim99qpeltxyszk2xf6xvoulwpxx0q094qcikiy7s8xwyf1d5y3hh1gick72dhvwn6i7od94b69y0bvdb131y3s9vx5clb8bf1cpbtecmuqhz5ic55htgi3ztasq57z5putac7vxuplmh6foy2l7sap2q5n1xt58vy0dd0lhugya9gcpujijm0z',
                isRevoked: true,
                expiresAt: '2021-04-18 09:12:28',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9',
                clientId: 'eb053da7-baaa-40d7-809b-24e6056b9972',
                accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                token: 'Omnis est cupiditate modi sint praesentium. Iure repellat molestiae voluptas amet similique quasi. Libero id perspiciatis qui autem sed. Corporis et consequuntur et laborum accusantium est voluptatum eveniet nemo.',
                name: 'aa7f6c5fxxsh7tlupq6bi5llxovhxa74inf3inn2r24x1zyryxd0kwofygqkvu306cgbc63nh8p773fjh209obcdf0n44cb16b0f0mmte1987nuqie5gyy39ocd5amet1vm6kxdjh2dgpw45vnfdsnzd7tu37116lt31lz6gfcn4eq9r8nybptt2vpzfan9k7p5g0c6w3zb7pby7gph6sr193fkdfltuvyfy5johx5dqkdzp100k73o718udm5q',
                isRevoked: true,
                expiresAt: '2021-04-18 11:02:49',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5a3187a0-86c1-437f-b7e9-5f44fc3697e9'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/146942da-4578-4879-8fed-b7e76d2e5820')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/5a3187a0-86c1-437f-b7e9-5f44fc3697e9')
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
                        id: 'f3b6b76e-8279-41c0-bcf6-a1475afcc3fc',
                        clientId: 'eb053da7-baaa-40d7-809b-24e6056b9972',
                        accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                        token: 'Dicta architecto ut eaque odit natus similique cupiditate. Qui expedita itaque qui assumenda dolores. Omnis sit et adipisci id amet voluptatum debitis sed dolorem. Dolorum asperiores autem qui quia perferendis voluptas aliquam aut natus. Pariatur qui consequuntur porro ab rem vel qui accusamus. Iure harum et eligendi quam aut officia ut sunt sed.',
                        name: 'njim1xdax4byc3unoe6vyt1fzdw9hz5tskaijy9as86qfbpautlxj3zdeu10rf4zljsr71c4e4g55tw6ly6wrz3axbim3jmnz1d3n9nvgbaq29klybt3l5i20f3c0zgh6tayihxaz3178sfg15rgd80ko16w761yubdz3cqklzbboihw1je0pdocns4xztpn5dx94pm1t52zi37manr1ly9rasvw7fk3o64rulpj06j7et0mgdvjjq68re2eq2w',
                        isRevoked: true,
                        expiresAt: '2021-04-18 09:10:57',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', 'f3b6b76e-8279-41c0-bcf6-a1475afcc3fc');
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
                            id: '152b8310-8855-4bbe-8ef5-af7733744524'
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
                            id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('5a3187a0-86c1-437f-b7e9-5f44fc3697e9');
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
                    id: 'da5c243b-add6-4005-a3b3-7c4ffd1b68cc'
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
                    id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('5a3187a0-86c1-437f-b7e9-5f44fc3697e9');
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
                        
                        id: 'ecbfcab9-1218-42af-a766-62f23a7dc243',
                        clientId: 'c6baf0d5-be2e-4d8b-9f78-61bae31ca555',
                        accountId: '2c1a31da-07e3-4d19-be16-cad02d7e71f1',
                        token: 'Maiores tenetur nihil odit eligendi ut non. Doloremque provident facilis natus quia perferendis dolor. Sed ad eum nemo explicabo exercitationem. Nihil cumque est molestiae velit quia et illum quaerat nihil. In recusandae laudantium. Quo in eum delectus.',
                        name: 's3a486muoxi6jy9ztr1h3pcr1zwkjzyk0kkvpfqmbmnu4fdfpgcwn5hstx904qgcgxadf3avb0ez4np3pxth30yfvevodat3rrsbmkn5jk9zebtmsrwn4t2leex52d7enrxbo7zrybts904bvyh7376envbefq2t9gejkdkls8c1mn2vq6ehwbgmu53i5vc2w8fb01i7y2wk26k8kcl5v3ef1pxhjklzf9qlphemhrb8gvo8j1utemm7fsjfzsn',
                        isRevoked: true,
                        expiresAt: '2021-04-18 02:20:17',
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
                        
                        id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9',
                        clientId: 'eb053da7-baaa-40d7-809b-24e6056b9972',
                        accountId: '30c6f9c3-18d0-4f93-b54b-633b7a203a6e',
                        token: 'Quo sunt iusto nihil. Cum culpa molestias et odio in quo officia qui. Ipsa nulla quas quas quis aperiam voluptatibus laborum et.',
                        name: 'mvwagjsdlv0p2mxlqew4z7pktbzgl86voq2ftmqgx3jijkigymgsohobpgw40u3k2jmxmyy2m541skwgd0zvio9cmk2b8o4rfvl7aszo2ofcdnqyhi6bgn8dujz19ngm8wrdxvg6szah3aeg47go5dr0utcm08p0nz33h37dxg665nueuj3zpj5nvcpa4c5s8wsh0jmd8z2zuj57bz8mtnffxj4o5z6xzsejz8g7sqkeojkojwj5hw14tp74z24',
                        isRevoked: true,
                        expiresAt: '2021-04-18 02:06:02',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('5a3187a0-86c1-437f-b7e9-5f44fc3697e9');
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
                    id: '345fb5d2-4f1f-4cc6-8e5f-6961d83980ce'
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
                    id: '5a3187a0-86c1-437f-b7e9-5f44fc3697e9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('5a3187a0-86c1-437f-b7e9-5f44fc3697e9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});