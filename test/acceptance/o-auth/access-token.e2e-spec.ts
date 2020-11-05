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
                clientId: 'ba18f5df-607e-4331-8470-77fe107f3a25',
                accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                token: 'Fuga laborum dignissimos. Maiores nemo quam quibusdam neque nisi nihil ullam expedita. Facere aut aliquam repudiandae voluptates repellat nobis cumque. Et aut dolorem ea minus quasi a est dicta rem. Repellendus ut enim voluptatum sit provident.',
                name: 'zwhfga5dhsxlhz5pg5hgt4f0ljbhlvlv6mcsehwuljfqw95z65qt6zn1hyhqkyw7ohiu21hptswn6tzmysbgeywiy39355ufx07tlt1ddipja5mjrayep4tgv5f17fvguy325mbdqby7wg1dn14cs59qh8c76izvmfsfhnn3yvgmb1ckbmdj6ui841wk5ykpq7q7nr4avddhavpng31igy7kxjzuk5tc9gzflt2l1w206u0r5uhlszdycjq7ofs',
                isRevoked: true,
                expiresAt: '2020-11-05 02:17:02',
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
                
                clientId: 'ba18f5df-607e-4331-8470-77fe107f3a25',
                accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                token: 'Ratione ut dolore provident. Non adipisci soluta provident. Enim velit magni nemo quia. Et et quo mollitia id quae. Iusto magnam dolorem voluptates et.',
                name: 'pflrrd5uavlto4gnsbcwsktreu628imbu9t9dfkc3ew93bo09pfptsbey9soykfnjktxbkscupo9gvsvxlv2tdc452no7mfft300yej66bmaro6yc50jhy76ebcbqa7dnb5wk8uuwm5mu410b8c977c1lry84yjzvz358oehks4t9sroop39sety19mj5mhsirr5q7pg1u2pkusi08daymgypvlk11xuj9kolaglvnksnzg6e9abz2q936bzg84',
                isRevoked: false,
                expiresAt: '2020-11-05 10:36:45',
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
                id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01',
                clientId: null,
                accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                token: 'Veniam suscipit sit nihil tenetur vero ipsum magni. Laborum at fugiat et et modi. Unde et ad. Ea quia nostrum impedit non. Blanditiis id tenetur quod excepturi accusantium consequatur sit et.',
                name: 'iivlkh8sd1qg6agsv5eh7yi93aqete6iwp8fd8ljvgiz5elp3d2u2ucbkyx9yc8ch01gy4mxiyzc2xuixrc0ajsvcnioclr34p0n4zmkmb9r43rh2ilsviq4yi67see3uzn1rm52b7ovibd1kh5rwhc0i19dq1bmffshf4e6yh12dxz657zqd9lzviupcqxl9nm38oh422z6clriq89wag45lnk5z7zw6s8jozqge02zhz9rjg89g00brwvwzvb',
                isRevoked: true,
                expiresAt: '2020-11-05 11:08:56',
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
                id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01',
                
                accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                token: 'Quo ducimus accusantium dolorem aspernatur nemo et mollitia. Minus sunt asperiores debitis delectus sit labore velit inventore. Ipsam neque sequi eius id labore autem est.',
                name: 'dclzf7wak7f33ny12v0sged6gzuafxhji7ug0jy9ubau2hbfjshyfg261um27d07xr34hylgt5m25uwifbemicqp4yhwm62b7ap685umks2df0yswsew7auvbv7p04iywxlk11ne1xt501871bjehka870p3qx77cj66kzi8r9ccxmekxofuomyascu6exc1saf4245vchxc952njl5nzl2m0per0sslix2h6boe0kr5s69j5wf8xwu3bkn6s7u',
                isRevoked: false,
                expiresAt: '2020-11-04 17:53:12',
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
                id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01',
                clientId: 'ba18f5df-607e-4331-8470-77fe107f3a25',
                accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                token: null,
                name: 'lz3wrpt47pnuewbf897j7ce544nzs820qxm1r2bfosonuhkgn4qxz9c1u8rlqn3f5a5cf9flwbfnrtz9gs9gbikr3nfij1ygz1fdlma2wvfl341igpxu346zdo5lav6wzqcy8m4s2fqafq10hk6bxip15w98yrrztbfv8y2cdm00mwbhf4pvwkuv0u98jv99aup0o7bfapp7w5opjnn1kytcw5r8d9fsl5qiv70zk13i7cnvjqy7qyxuflxm9t3',
                isRevoked: false,
                expiresAt: '2020-11-05 03:13:26',
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
                id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01',
                clientId: 'ba18f5df-607e-4331-8470-77fe107f3a25',
                accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                
                name: 'e7fs1ydeziz0mo0a6knn0aqz40d9n2x8n17ezrohswpp516ud3ryy1cxa8g9akqpo6aa2x2u8ywfhrl60xjy9d6wroi2n0ubg1zh5mrdz20ltw3xx5ofvbuzzvvnbvyyd9ueyahk7fexv5rfvsoid0ov7htbfqqfhcah40ny4dojov4iii4m0t3cr3rzpzxcht9knd266cuom22f4yai1lskelopxn87b9f2f5ru64c1jf2s7kjiiedssz7l4lg',
                isRevoked: true,
                expiresAt: '2020-11-05 00:00:14',
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
                id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01',
                clientId: 'ba18f5df-607e-4331-8470-77fe107f3a25',
                accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                token: 'Blanditiis dignissimos commodi sed ratione eligendi deleniti quia quis aut. Reprehenderit nihil est placeat labore sapiente ad ducimus. Debitis enim aut et voluptas tenetur. Nihil sunt voluptates veritatis repudiandae cupiditate corporis. Nihil accusantium libero delectus vel numquam non.',
                name: 'siyqlxb2wd6uk90j7i1q05dmnyz5rcmbqasilq3ptpxytmza1ab1hwv4d6it5nadf3np32pdul5ko7r2ht57xdh59beverufi4n3iullsa64wwgcuvzwgwk5an22uio8zammphjttr9yegv41trnnsiazq1azf0im5545zfwrhz2v2netpa625z4y0e9izq0zy0xcts8yizu0506dau1sbqu28zlrzu6ug6ti0fox3za67fttl2reyzzv81zffl',
                isRevoked: null,
                expiresAt: '2020-11-05 08:24:20',
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
                id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01',
                clientId: 'ba18f5df-607e-4331-8470-77fe107f3a25',
                accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                token: 'Voluptatem et praesentium beatae consequuntur suscipit illo rerum. Quibusdam facere reiciendis quidem minus et reiciendis natus. Temporibus sint fugiat et nam ea dolor libero quasi. Nisi aut beatae provident facere. Et nam blanditiis eius et perspiciatis voluptas totam minus.',
                name: '5rhtf6r4jey7oeud1u5c7stea6b2y25s73t4e65yhfz8b1ulobawmthhnucgf6t4c8q5x5tejp9ws6vmk7209eafhq2slyp3zvas9l2tv730lowqh48ej4gktd0o9hqhhtxklxm6g35aigmlgfo3ltwokpw98l8lhj9k32dxv815dlirq4wxmlth8bn2rmffpz1wzr2i5vx4xlnmdhx02glrz8dp9glz6oqthkejd3lnaec90f0uefvhkbfo6sk',
                
                expiresAt: '2020-11-05 10:02:02',
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
                id: '02lv9v6knqoystso3x19kngs7pwpjqqm55oky',
                clientId: 'ba18f5df-607e-4331-8470-77fe107f3a25',
                accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                token: 'Libero ut aut deleniti. Quis ducimus aut quos exercitationem eum repellendus blanditiis accusamus. Saepe ut officiis fugiat nesciunt est ut sed rerum nostrum. Veniam laborum ut.',
                name: 'w1xsbsv9mq00hbssf0gr43f92s53nz27osj0o499agzte5qbn7yuh93l6dzwyzd9f22htn8phe6bxdagwt105zm3lnv8iz62pnej2sa2uxusly61ybuu3vu1hi3qi7r3qtv8uw2tj1zgr4p4pqjst8ky16svkrwbc28z0y0mv6kwhw74d3ezfr20gh97qhsyfaawpzl0cz3zj7ujz2wd9r5h44byadckmx7om39ac3jk6gfljnjrekcw1js4bin',
                isRevoked: false,
                expiresAt: '2020-11-05 10:35:38',
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
                id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01',
                clientId: 'axjpxtmusz81dtv44h8s37gxr56cwhw5r4fdn',
                accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                token: 'Reiciendis reprehenderit fugit ut ea ut sit hic voluptas. Porro consequatur animi officia rerum iste. In vel consequatur facilis quod. Nulla earum est et omnis dolore aut illum. Qui delectus inventore inventore.',
                name: '57zamwby425b8bv0jn97gyeln7syyxkn8orw1clzgq2mjzrqy8l1iu5jyeac0e75d74vftb8xalacfkw0xwet8h6m2uak1oigz6c24nslb4q2bwjm4hn6n6eblpxnq3s5licvvyhqjra6sknasxld2x11mtaw02wz4yoljuyrkkti0vdfdrrgr98q0eny9g6p75tctbbhvi94ntuyn9rpjpvu0yjqdewr6zexplun9065x6r6bpbfgb6aun9vxu',
                isRevoked: true,
                expiresAt: '2020-11-04 20:46:11',
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
                id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01',
                clientId: 'ba18f5df-607e-4331-8470-77fe107f3a25',
                accountId: 'pzevsgik0gx3u5atkrukt5nx3idgzqvm9gq8o',
                token: 'Dolores sunt et nesciunt. Maxime et sequi et dolores sit facilis reprehenderit. Laborum sequi eos ut ullam aspernatur.',
                name: 'tgyme3560qzyhrfmb09x42gvkh7iq73oyddo6mc9czv12kbil5fxbbqadcx450v71m48iie9eej5s95gs885voosxk96ef5xsx3f8cwfxt3k1hfbum6jq9q4d4duqpfzj39x0amyn9z5j09cy568l4e4wmqfy023sfrd84yha7w209r747kqstot2srvatyuribct0stnh5nnrfape1cvjjbhn6x1r1n5mnl0fgw971ysdaxi43w5cd216w83lt',
                isRevoked: false,
                expiresAt: '2020-11-05 06:39:42',
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
                id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01',
                clientId: 'ba18f5df-607e-4331-8470-77fe107f3a25',
                accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                token: 'Consequatur est totam aut minus recusandae et accusantium. Iste sit minus et quae sunt at veritatis unde id. Quidem modi minima maxime voluptatem officia occaecati. Quisquam consectetur labore qui ex impedit id rerum eos.',
                name: '3ujwpz2664xre66u09cbdxtay4kor411ckd7ndm6q702okqfsk5cua2zofody9a572b0c1gedoqgysgwp5jbv1t03ibyfuwav5mqjhtccjbaxllssq9wiwb3atf4dvo0bex71poxin60tz30mnpaqjw8ptxcrfj1fxfauklkazcv2uj17xwzaizp93jx9xytuwq9a81y74edz47clu0redslfky0bmixyty53layp6teo5d877aayb0i11gxomay',
                isRevoked: true,
                expiresAt: '2020-11-05 06:59:51',
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
                id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01',
                clientId: 'ba18f5df-607e-4331-8470-77fe107f3a25',
                accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                token: 'Odit aut est qui eos neque cupiditate earum et. Laborum explicabo aspernatur sed temporibus atque tempora ipsum consequatur ipsa. Sint nulla quae enim. Rerum voluptatem aut et officia et architecto minus modi cupiditate.',
                name: 'fakof2rf9k78os2j3of20x4wpoxipn3rndtxv2uy9qlm6xauu27kcdqjm6na5952ooiv4js6e1v8ofiwf8flxayhz1b21o1dk9w3gl4bl4s0k7uvv9owu6dxznbgd13fkjmzpi2e42msm4jctrv68uzm9imrtwg7cslp2u7naiu6knpzoulzktw69ackoozdz2lfwwb8xmb7bq9l101w1rk4s91jc7w764v615hzv6u8vw2pruz4zpq75l6ch6h',
                isRevoked: 'true',
                expiresAt: '2020-11-05 00:30:10',
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
                id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01',
                clientId: 'ba18f5df-607e-4331-8470-77fe107f3a25',
                accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                token: 'Fuga non ab. Deleniti facilis consequatur quibusdam possimus soluta consequuntur. Enim quo iure iste maxime debitis. Earum velit libero.',
                name: 'ahysgc9lc3ygmiihudhed4rizo39xv5tz9jk2q9gzewzjpx7ilt07zynjzbs4u4ckz94res9xgz9wyjrocilbnbrztwod3o549263743qzjo6bs5gb5zmjfk46vbjy86qdiiyj0n8db6402agnbunspmxh7iizsl66jfsspktatoqw3ik75gr4y8i82u6hxbotr051n456tmbcdbyxqlydkx44khrv58y16fub5dct95nol81mioe41o789ha5c',
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
                id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01',
                clientId: 'ba18f5df-607e-4331-8470-77fe107f3a25',
                accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                token: 'Voluptatem voluptate laudantium eos vel non aspernatur. In mollitia dolores neque consequatur saepe. Ut facilis nihil molestias doloremque eaque. Minus eligendi nisi et vel eum quia ex incidunt. Minus maxime eos et esse.',
                name: '6y4gti4hp43ynlmf12epqs263t6b6gn086ycs4u61s97cap7eglc0chtoh0570j4bnx7momygl05npgja7x9cu260t1g2mj5rt6kna6cc4bm9ikwcx2l7geepq5eyazffp851jy4wda78uhzz9wasnk0p4qiwyzf72lmeh2ve2axysf0j8tft63ezwnsbec1iak750uk8g0d90vwj4zns0t8bccmeyvsa7jjqpw6wuv21sqepf3pwtfq2twyxh5',
                isRevoked: false,
                expiresAt: '2020-11-04 17:34:16',
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
                        id: '4d0b4b41-7f24-4cc8-b2d7-5cabf901c1a9'
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
                        id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f61d3691-f90e-4aed-b4b8-071eb55eff01'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/e3f29fcd-db02-421b-82e2-df4d8e71159d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/f61d3691-f90e-4aed-b4b8-071eb55eff01')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f61d3691-f90e-4aed-b4b8-071eb55eff01'));
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
                
                id: '31ab7ebb-14d8-4c8e-90ba-fd11083ee810',
                clientId: 'a3e0ad51-12c0-45e5-806a-e037c5b3753d',
                accountId: '69d00aee-abb8-46f6-8c57-b80f4fd994eb',
                token: 'Incidunt quisquam sint repudiandae earum ipsum dolore non dolores dolorum. Et natus nemo rerum quos et est et vero. Itaque mollitia voluptatem eum. Quae qui aut voluptatem. Earum delectus odit eveniet deleniti id autem voluptates.',
                name: 'gjhz0gx3gveghi7qji3n6ygvqdqokau4w2un0evgpaar9w2wzy5n6ny15vopb0ax92yrepseodueo6yjer9hvaaevtk61eigtjt24h1bmk3buot2hq35dn10dyz1vvj6pa8sq3kfddymafuxrs9mb9yz9lr3y1dcrptymtoocubafzwkd3im2w7lskd3st9jnkia3gjl0yleremrv4l4oo4ffhv1zop5h49j9ytf49anlgiprxb6fxufgp154ia',
                isRevoked: false,
                expiresAt: '2020-11-05 08:50:16',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01',
                clientId: 'ba18f5df-607e-4331-8470-77fe107f3a25',
                accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                token: 'Dolore voluptatem qui qui aut vel. Placeat ipsum corrupti necessitatibus quae nostrum voluptatibus consequatur nemo. Ut hic nesciunt. Laborum quae necessitatibus illo in mollitia sit voluptas autem consectetur. Rerum quo ratione nostrum sint quae voluptates id.',
                name: 'urujt1qiu61cyx1zvqy9riqxgnikfmtyh914ng438ys5px6grt8wa9aum7w04aqbedy1pgq2nuf6t8sfdgryqfenhadd71opqcdk1g784wx0r3k1l097g87i9kb52i7igwhbc1pjn3hjr50wk7x1z8o1suttoupyciylis057umz3fqhkb410x6lukxsdxase7vtz7gck3ob8nwsg04zacyrycwblehihj9s83uzzsy8x2dffob428y2ctol2ka',
                isRevoked: false,
                expiresAt: '2020-11-05 08:13:34',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f61d3691-f90e-4aed-b4b8-071eb55eff01'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/cdce8ec8-8740-497e-8de8-71a156f12cea')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/f61d3691-f90e-4aed-b4b8-071eb55eff01')
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
                        id: '8d665102-30c1-44d4-91ee-6a3d59751fb4',
                        clientId: 'ba18f5df-607e-4331-8470-77fe107f3a25',
                        accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                        token: 'Perferendis itaque exercitationem quae illo ut. Rem et doloremque consequatur porro cupiditate molestiae vero voluptatibus. Ut architecto est dolorum distinctio consectetur.',
                        name: 'p25yg8viwytbh1gw33xsmerw0l0n925btgvwj0j8cd1hf6wtywa4ian88vurdnw3trb8dueadviar8r3i8tocq2il1v0oektm3598st089rrvffp1zd6raqqhr9fnycmlq2iyf4la5s1cxldvnjgw3i7ozgyzk3e2u5z5esivgjvqxillhmoc2wnjs39jzd9rhid70g1629cnc51ghv3cynw4ucd96crpp4gb1ilpty9295lr8zv39kzmw5c2ne',
                        isRevoked: false,
                        expiresAt: '2020-11-04 22:02:34',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '8d665102-30c1-44d4-91ee-6a3d59751fb4');
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
                            id: '9c4b7d90-312a-4131-ae59-0aa9478865ea'
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
                            id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('f61d3691-f90e-4aed-b4b8-071eb55eff01');
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
                    id: '9995005b-94cf-4b7f-8d27-567ce97609ca'
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
                    id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('f61d3691-f90e-4aed-b4b8-071eb55eff01');
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
                        
                        id: 'b0fbafbd-5274-4e8e-b8ad-991c455c29c2',
                        clientId: 'a5779ee2-077e-4551-841f-2fcde081158c',
                        accountId: 'cfc5f1fa-b520-42d4-84db-ec5009a0c80a',
                        token: 'A doloribus vel. Quia nulla nesciunt expedita nisi ab ducimus architecto. Nam quo sed veritatis et qui repellendus officia at explicabo. Accusantium consequatur neque tempora aperiam alias quis et sed. Ea voluptatem qui necessitatibus nesciunt omnis repellendus atque aut. Accusantium amet ullam dignissimos ut nemo saepe.',
                        name: '3lboyp1mh8wrknffhe7j63h4xjo2dfqm9ma0ntshwrgdxksq05wlfxs6hsqa643wqafxzw4wrjo93mukot22mosvq93tqc3jc7n7291jcuhua6jcgb5iqeu2mq80pma2cgs5o5xukq83hoj0adym9bp6osshlvc00yedhy87y61b38p9veaw6zrxj0l3z1x70wxm8ikm9mor2nsqrtsd8kesrwttvomwb2g626qma9cy0xzfzs77cr2ndjxd895',
                        isRevoked: false,
                        expiresAt: '2020-11-05 04:15:57',
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
                        
                        id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01',
                        clientId: 'ba18f5df-607e-4331-8470-77fe107f3a25',
                        accountId: '9f7ba520-2cdf-4e0e-82aa-11edd419d23c',
                        token: 'Assumenda quia quia earum aut. Est facere reprehenderit nisi nemo quisquam. Cupiditate nesciunt magni dolorum tempore ut ex qui voluptate ad. Et praesentium ipsam assumenda deserunt voluptatum ut vel. Ut possimus aut quidem suscipit.',
                        name: '40n9qky7jn4ecdnyevwyj205f9imeis4v1217ov8xhrpuq07qmd40tdx2toc0zn69hbwfnc85roe6jhh94mytpeqkptn090c6x88cj6cvpk60w71zgcgl0c079q58ddxosgq2e4z7a8fknytsjv50q35zekunwrvs5vkm24paf23h7nn0blk1wfmoe7ounrw2efd7x0a9mab9hqs3q475u9woty4a7f4dx9l8200sxyt1en4ol70wq6hamhda27',
                        isRevoked: false,
                        expiresAt: '2020-11-05 10:11:38',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('f61d3691-f90e-4aed-b4b8-071eb55eff01');
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
                    id: '11152575-10ed-4a50-ae2a-4f59bf6dd69c'
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
                    id: 'f61d3691-f90e-4aed-b4b8-071eb55eff01'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('f61d3691-f90e-4aed-b4b8-071eb55eff01');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});