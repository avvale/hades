import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITenantRepository } from '@hades/iam/tenant/domain/tenant.repository';
import { MockTenantRepository } from '@hades/iam/tenant/infrastructure/mock/mock-tenant.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('tenant', () =>
{
    let app: INestApplication;
    let repository: MockTenantRepository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
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
            .overrideProvider(ITenantRepository)
            .useClass(MockTenantRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST iam/tenant - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                name: 'kwothxewtu8sw1d0d15355poyef1be1sn6juppz9doqeddp4d7lqjitxwjlg1uxk3ktlnbya7em9igrsppefz2dbotys4iq0vbbsw6v6uq7wn40lqy6pvz4ws3n5fd9lnehm0l62228re2aieobnjnl8sxnmob0vacdsk10nwla4sf39mjvydul8bqbwnnuwr9gt28c7s74oboxbwqcf54kv3qhl8rwgwaux69wmynfn46gb69ig5wl11vbc090',
                code: '0z53h1ktz5aas8lytwlbs70pkluen6y2l7ormaadc9mb52szoc',
                logo: '4aox8d18l1swfjnod2sd7vkmeqfw8xxxa755x04h8bv4eidi0zd47xfavzh6tvbcicwyg9mxb5s53qee4l1up7lzfu8kw8x839mb8icpplhtl2igp5tqa2hz2ozez68enfixmebrv9efm43wphrd610aksv80vwbv0pqbouw7uleqyb1hkld4emm0u01vr5jutqtm23v0bh76syhftavlztns05wag4zlzbzamzp424n19bf2sh391g5h3zi2l1',
                isActive: false,
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '182b9cb9-caeb-48a9-9d96-f38269b144f9',
                name: null,
                code: 'oghvstjar5107e9io3qufqa1jc8r76jt8xfw9q1w18kkofquir',
                logo: 'owt0j6ybgxs7xa4df8ycsk4088odnujb7n2e5lakbb9e9n4h75ovt30t4jm0rh89cmwjap4pi59qncvduneftci0vh1ngnqavqtay2d4mnst9pbhku9cspif3r4m6ix8xxz8pmwv317tvis4mvwuwvnlqf1ujdkj3eulm4w2ujml7mdkig7iqqu6s0breh86phnz3d609px8mmzvmvlfwmc7irzraqlnv5mh2lpcy0m56kvo5hln3fqjjy4myl4',
                isActive: false,
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '182b9cb9-caeb-48a9-9d96-f38269b144f9',
                name: 'opgi36rhbqaoyhkgffxp9pg6hhfc5n62rdd645lijmxh0874jugf7me9pggkgocp9pa9m0w1eu04cedr5tgf2oof4b2w1x2ixtc6io4fzmdogk1q6qo6vpohr2yev6cu4xqceh2pnln7gy04tgn9fg6ktjislyoa0ixmcc0fs831smh3ynmtp786rt2bzpfxbclr4yp6eojpjhc1x2tq5kp6hgfycmlk57rz0nfulusr6b3npgxhteki0inphro',
                code: null,
                logo: 'wu2hb2y78d1tofonma1zkbl01aw6tefypukroexrhr1bzjumoni3zzteucfr957vk2mxqcgkdb0xmbl7u41xp0lzirzrlo7n1r2l66ghywddlrrsbumb754fs06l1t720xtq1dff9ckgqejfrqye52r9tb2608m14c1w5tg3g6q0osrxvl0zl6siwk8efc4kloa1rlw6h4shdpjkoigyefw8qwilyz6yljn5e7uq02t4uct52v5vu4rqronh2b9',
                isActive: true,
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '182b9cb9-caeb-48a9-9d96-f38269b144f9',
                name: 'g3tgvgofslxkr6v6vqdihr3dgu2fc5kajn7gftguwub0c85tbatanbjpp8zid8bcg6gx97lwpxw7gmmy16j63tbjj0qjmqiexxd08iceezw3ix7npvy897e2xrlkgz0hey2mllob8embou8a1pvhr4uto3p9xloaw477tri3tehnqvlx4dalgjh0ocak2jlc1cj5uxxd0i9ffmyfecyw7njjw8v6ynbfq0vm13tf37zltryohpexibkve36oyuv',
                code: 'zyrlf67288mh2rdofh6c5pi8anwe8rdmvrk2ytbbl64st7mj9p',
                logo: 'kduqo6pc549ycgdx6kr3tt5hgs19j9wry4gkc3pubitkbkjp0ief281sjzsfxv88j6v04103b8nxlbgyjokk32w4q4umb3iie51lojekiw9ggqw0t93u44qaeu8okltnpz8v9qq9d9ugpglfgxqfnoagalg42nkugxlbfmu11fpymoan019vz82w2zjm4tajwjurk5vl237b4jtr0qw0qk9qhi8udupza1jc0vxbgn2sin3z2n6efex224qz3ep',
                isActive: null,
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                name: 'k9iajpjckh6qb1ro7ecfccemusv8fq0n8mof6vm6c623rngid1dhce028bqcjog9q2uei7ii491klh8wmq9egf0v0zkr0h9abqyuy82iyz6bvsl8ew0u7wxo170eb12mhnplbdpze06qi9tbnqrevzr39f5rczoqfbyoicid4h0iw9zeddsjjt1j7a7so1nryz4rknliilmmu4np89omn31ujnqp57e6xhnfbe96v51qpav1pikwrc1y029gpdu',
                code: 'dndg82mllkfzz9zit9j8vfvtsyt2fzkr00ifhagf5kl9gw3hht',
                logo: 'pn9q1zibw3f2ozn6cea9nl4pew9dm9ta6d5uxtg8dcpvitg2ojyptyq4f9iy6kibog5olhoyugk0uvzv4r6l10qnnikirr9bn8uhkir8wvnr079edk7bbl6emwouqyhgmwf2lrxe4q4236y896gvm43g2sc73klt98oj4pqwy4w85xxohg05lzg9t0po4yaxaesnqg1e0ru7q36vc5no0gai9x8gj7nulzf7gffcfeg3r91fbdwoqrjbn5keira',
                isActive: false,
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '182b9cb9-caeb-48a9-9d96-f38269b144f9',
                code: 'vgq5lixk7o386zotrwds1ell15hph18py5ectuxpqisk7vmzxc',
                logo: 'z3yqznedto2l88bk6ckn3qxgqmgxnpgluabsi6d1adb32ird8w628wyb8g0jxh1j6ahg26i4e381zrm96tl7jsnw0o4dw5nqdktto5j7yniyk9lxvqh9jg6sjvxd4or429u8gieknivj5s30uh67qdnky570p749kmx8nf8m8h89e90cet7y854ysm4czswudmiy0dilbu2ewmwfldypf1o6li8shff2byjlskfjlo243dxsjjwqcz7is2svch0',
                isActive: false,
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '182b9cb9-caeb-48a9-9d96-f38269b144f9',
                name: 'tpvw3klyyyh39uwlsbqavx02efh66o2n6cvr1du0frrout8muj9122jzhwwdcywienydouldt9oxmeznxnqv4gq5emdwatnexatcpp7lk6i2oytk6iyv1m2r7yavf9ss1fl1mvn46dkcpazcba9iv7fe1abwd4lykglobx4558ep35u4b3curdxzranecxvlhnos13ag4boz5pg4h2m77ybyt5lnnzsffyqhg1dmwbcfugd4933fgbyxntwr74f',
                logo: '9uwedj59o7fkmaxki4psi64pzzhw1j5cclpfimdly9gpm81f78h01kfta7hq5ct4bjh0w5leju1q5g0bjqsjrqk4d2bhhmytxzw1qr2ncn6fik7avvhdz0zv6sulwlh2qzovep9naak2cksmmjadwroqhac8iztmidsovmf86nv6wd5ru73t730tsugvumm13gmqr512no6iijzravrb2o9mudghosn1fm2liq7zir665cs2426ggnw8ie3vk09',
                isActive: true,
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '182b9cb9-caeb-48a9-9d96-f38269b144f9',
                name: 'v0nfqaim5zds4lgtspqhattg8m82kwjz1hsqq34vmo890746dvc1jclkflype4lbh5xq8f2johv7ogga715ibpguzqoh943n6r34gejau4y0wpuexw0pcwi0xf82okfuizmx826g5re5032ssuktzkn5d575ielyt1zn3l29zsx2lqcfo3h5x4w0o447vsazqg1anh9qf2jsc4flqv2ltqof00072oqsn9lz3w115d8tj74tdo3qkzd2fbv7qkj',
                code: 'tw3jap8ahscql09ybaa0ovcyqubdc03nzm742uy9qa9ksds9ak',
                logo: 'ur0rv5yb5pmr3fh3yrovha4pckvmeih1alvkj7zluts1k1t6vpf5e2pkzcez4q8q90smc0l450rutkx6wzo7nydxm7po82ebt86141td3thxj6gxlv1oxsm8tgxnq7n5bhu6pndbk6dmt7mtmoc333w91i7ti3z5hwcu4ofj7j890pvq49a22axtcj4h30za79banbdnzqp3gs7ncii8eh1dzwr8k287b8ctpgxqlk5f60prc6hcoqxwhgrdq9x',
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ozu6jjejujej3b86js83savbqoato8u1w2fhq',
                name: 'v95ygdyltrqy0iu0yqqflqgobensiaoc69kwqc11leofxt1od4y1ahi12zhdz8n6tvjpxncikkk92y8po2rkl33hrdg0855ugelsmrd6qb795csnau9dp7ofb4delyw76ts06yp99f6lrd49atuhck56p7drebvw1802vpdzu4u2pdmqmk6q7lzg52x6dszk43p33a1dprvs6yhsz8ftscr4hpczxdkxkutgmoierzm8fkzw18f7y7icccedi0r',
                code: '2uko5zhj0el6z900uutfrcyrazg1qan2nau47rxzro7h7gfopu',
                logo: 'o6fwqj0ck35hqzbz6pnpm4dsm2q7p9cr6jevjfdolq539ezfjoweshizbg53xn25y5awh4xdla44h2t4fqe25bozrsmzw06nos1m4wyaq2va38iwj3bh53z1zf73spoy394i43ki83maacqkjy3axubzidenf295mwuatq4p4hmoww6w956hbl5ua39aqbm51fgf74kp1wnnkn4xaw60jz1qrgrbrda2whxxp2t26opti6pk4yf2b3s0lfj05y8',
                isActive: true,
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '182b9cb9-caeb-48a9-9d96-f38269b144f9',
                name: 'd7pvwo9ta8r8ytq0j7k46vi58c9sjio6t8x1dl6komlokpl168a0wi4xhrvm4tzpxzyd4se58nkejnigm7cuuehi2dzvbhp591h9k5ahyvvtkwhcxy9yzpq370wde2l4a9minj3xxz9s2idmgwm7f22127g9ket6bxjebstmirjsbhny80x1jp4h1s5cchq7y7nknihwio9tb42hmzij4mbtml0pcmm5dy1k8zcngkncu0dyejegxxo7ae3be4sx',
                code: '7muqh632ojaf1nw26ns15a66546i16vdi25m35luueiy478qoj',
                logo: 'v6gw175h3u7wnprc1zuvvvpwjcdtcjtbhg6s8pegcwap1dast96vtxhd6lg1h35agirr0mhue225dk2odwlwrhqcg490i1v92k0y4m1vx8nmk6txkojy6ndsxo80f59hpg5fe8nr2p1tmeouec6rxfgsvv0d35l09w351wyt3jmkqdqb5i3bi9wk5oj9yr3609bltxx1sh4j5obz01005otdis747ulosbsaztnsusmhadvu1jya212t2xdizqm',
                isActive: false,
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '182b9cb9-caeb-48a9-9d96-f38269b144f9',
                name: 'k0wtlirxmpbqt9zr5wdpf1qeoci8afhp5eu3i31uzv2833unflb4r87vrl2aobkwi5zj4s6cs2fhmlqv032porqxntayf0yc2excs0e45zxdfiepzw962myr6qvq0yidz7quj4flrmnypprm3gjic9sluwsucph92dqsb74fhdkg7zxusm404apud4h5uqmdtkztnt4thmua5a2we217f4a7a5kdtc5o0ilwp7ba72pdadg4shxua5uta1sz5eq',
                code: 'khuv3ip1632zlocycv5e1igbnremm3bv3wjznhmokgcu4y20nik',
                logo: 'xl1cp0osms07wot97mi425l63ocgj9hdleueed2wl6juc60hqbxqmk178mwzdqswgnjqw386uwegboeh3faqtutjt7lp25jxt9pg2exl2pkvpf9brremhym8cfjayym0vgmvgnyijtumj5al24tepk8ptxicntjjqvxref4r96qynill75rvxe5wbqwi5s3q1fry2uc292x4gemdgydxt2lc9qmnjyz3jr2so213cfhk6vrbsvsw27iw1a4tflz',
                isActive: false,
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantLogo is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '182b9cb9-caeb-48a9-9d96-f38269b144f9',
                name: 'p48a4aumghecuemrur4co1w0j28qpwpyz7i5ujb4o13ucy7qormlvzv2uh32n0pg1ahk4wmto0d4eodilctmg174886xyknqz4fuvzuz3h86btkeao49xhcsc2zkh1uwsvm08t2yjhtma1lp445w9mjc9e5qwdjd9pj9dfa2tcb35oq0iztauu9x79c8bwwo10woqi2bg1285zd7lt3dy2e6kizf6oaq5orglk4mdlc4vw1pe6w0y5u10cqffi3',
                code: 'bosq2l2pk8pwj0ewt54lp61yy8i9d094zhcp8e5fkfuhvqt6zc',
                logo: '66d2bdgtzswv7nehhtrf5aayauyg92k7om7byyre1e6t1r4e7pr67m4khlppsiwkxs3jvolsq5duqne2443u7v7k3qsazqk2cozyu9sivvgo8a8kw27t8yht4jq2ubg0e7vpk2aw5bkpky41uexlkzeb7wkuqphdkzkfsdurg71rtsv4gjkfhezw423wr117w80z438t9k84l2eczaezpk8xcql0m4ki6txqx0cqb0nw9ovvqqeqyiijjro45wxs',
                isActive: false,
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantLogo is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '182b9cb9-caeb-48a9-9d96-f38269b144f9',
                name: '9wpbn336h6oiq33ionvqhrgncwj28lcaraa2w6777qwwazbdes16cvb8mds59mmeld6rkhijtwojffe0nxirqzlzco5jjdhzcxaa080mxm6d8dy0hu7q93jf3zd89sr9ari2c2h1a1oaer9bkjyxcvyt6s4vkclao1u8822hbthvburf3b1ikekc9am4d6ithcachfd9awwb3q63oh750xexqs8475nbsb4r8x3o68cim5cmbbxgrvkqrbrptjz',
                code: 'oss9xchpxfd459sf5phnw6yvw78t0yqjt1myay4v3ca112m195',
                logo: 'e2grs62ynskig9ynp7pti4gdwoa33x3dui24qbp8j638pej6dji0202t31a5wwg2kdmh668uplirudxgdoniepwvwsp2w17e1y5jbl5fyrhsgwx735dmbh8qocyv2rjosobkealld5w9wu58zibddq15g7hwm7fftj9b9tp48chqi7to9gz4w5dqgi1f9axhznzdhpcqusannear273opnzd0r9x1qqzfal6aegijpkwt02it7gb6w0tpa65tru',
                isActive: 'true',
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive has to be a boolean value');
            });
    });

    test(`/REST:POST iam/tenant`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '182b9cb9-caeb-48a9-9d96-f38269b144f9',
                name: 'ozisopnvk53oj3nrbslh3ahccy3zf10lwcmecmvdkmzdqpfgzocxmk0w4evxfcqvj52go3tfd0y8sxtlocqrprh1tads7ekbwyqyasytg6is8kfvpx80nb080l2538lbj2ubpxausema5r5xvggv0nzoejwvvnc3ond2dvoj5q3nef9ub04zkmt9gdlsnb596x7uet0px7qgp39hown99qj512q0t4bdffalx6g1t21gg6u0qc4hw08l3897vu9',
                code: 'gg7jet6b27avtb1n9fkggaj1lva2ihhyhqswwfjioxg4u0zih0',
                logo: 'nd3wu7q0bixd8ld61585hggcqb9ncle32abx2wfrekrg0trjd1kkyh367nga5mh0w3lrmx6b3oe9umbimnglv8sz13thh1bxa6mkoh9e0ojimfa8lel2wk121hpk0r625hdyoagkeoiazt32inv9pmk2nclpxjmduo3zq8lyvl39yte9n6i61u08niqzgpcnxphnzuxwvz8ihmhulkqexwd38l8reow7g5r8i11dbpffr81iuzhtmyigm42cjhx',
                isActive: true,
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/tenants/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenants/paginate')
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

    test(`/REST:GET iam/tenant - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'a0cb5a89-5c43-44be-a4e5-c140e5d19788'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/tenant`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '182b9cb9-caeb-48a9-9d96-f38269b144f9'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '182b9cb9-caeb-48a9-9d96-f38269b144f9'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/f537b568-662a-4231-956e-50b71c5b065d')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/182b9cb9-caeb-48a9-9d96-f38269b144f9')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '182b9cb9-caeb-48a9-9d96-f38269b144f9'));
    });

    test(`/REST:GET iam/tenants`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenants')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/tenant - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '653a2864-cba9-418f-8e7d-36049ebc8ba0',
                name: 'pbyzidqiba31xak81nepgo1igyz3ajkv21nq0zeh0yu2qjsrqfleo52h23b0c9u7k24u0j8gubo6vyecirzbuqsqjfx2wc5v9zrvw3w0wqntp08lqif8ecj3j6lg9e3tpjscn1n4x1q6wtl2dt5wa6oelvxxhwo2wr97p9ysat66mjm3h6pjgtfpxp39l62ku105lc4a7lldr7z2sq9bqbl4yy1a8aoeblvzcy6enwhnvuf37rtwpkk314gbl79',
                code: '6eqgb77a9yypkoksh1atxf9q44qrazxh99kcl6dm4t45ee5bxf',
                logo: 'mi34yop9zn2zfo4nkxjywtrul4qs8mm25g7zuaesv303ef860z5kkr051d06e3rw1eg4br2fhi2xic1z3kuugdypyfq7aguib7xigxqqzk7qrbgnxydfjk6085ud36yvfjczt0nh54ad8wgn8w8wo7x5138226g7bf3zt7jyk3ayxox26gy1ir3096o8nk7xnbfe8ivr8dx50nzisi8yfoizxcll4df6w3ihfg9rxlpxeoowwuxbaafl3enk55a',
                isActive: false,
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/tenant`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '182b9cb9-caeb-48a9-9d96-f38269b144f9',
                name: '2cehhakaq7v12xkhjvbf1hx53gc8000w8oa36lmo2uhdqd0jpzgbzp5oed0vdilwghi1jmbfog7cmhak7wvce0s0qy6jj1nnrlfqru6oigojqhlcejgqsh9ci03qr0f37rmoz609uaikuzklsttujvre5v2nqlxrz5p0s4q9kujerj2gc77ohb1c9v5wzmeo0x2u0cxrylf6t8jo84m5yem7gvbk3s8ycvg2ltn41p0p7z04fnkppl328v183ct',
                code: 'qjfbi1ov52gylah764t5qn85nh9svukffqh69r8ayu54qry9ah',
                logo: 'sukgq1e5rtrsmwf196dw6qp9ur5aducl2m5s0p4iiy2d1oubg528nv7dw1kwz833ufq71gjkf9g6kkl5wl5xvyszcidoip30gy84mayqu7lmzr0mbzfwiz5mw9dt13cmtb8yt7cmxymfkryzj0gdzq8rlesyuzce8fbk1ykcyx1fsczbc5ae5ia4qsx9sy8nidyrrx7kuh7na0tviv50ry48t4l7889mgo9xzxh1a5iitvtwfdk8df3nprhhun1',
                isActive: true,
                data: { &quot;foo&quot; : &quot;bar&quot; },
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '182b9cb9-caeb-48a9-9d96-f38269b144f9'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/8de15923-200f-413d-bd92-6b049fe51351')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/182b9cb9-caeb-48a9-9d96-f38269b144f9')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL iamCreateTenant - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
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

    test(`/GraphQL iamCreateTenant`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'c3ba20dd-2c91-4cc7-8d19-49ae90de5d26',
                        name: 'oaozb6ujxoa5sjq7wlyg45pj6at03dkr37ily4xs3jqp5dqp1yya4ydrwsowaobcpqzjc5v6wwlq3h4on96sqxsg94z738bu4grw2v6hu04fwrqfxiyirpftocdjxq1j6fk89mnez1pq7oj04msy293t5kzwm7dhweviavkj0cnx60zpokr0mun6y00ajxcynljz085ns8fdg4hqsf8972ybi0ygbkxpk8q751uu1nfny4nsbp093ctli1fyybu',
                        code: 'jt8ixiiwv4cywdyqgb5yasmspgboqudfnusj6qbwhe7vwdn4i8',
                        logo: 'hfy9nsb0ya3idsestnaxvcvf3xm0fw2zi42oil8tko28n75trtwnjsdmu2kdja07i6hee4acqgaagzc2ppsksn8ql02tj496t5z8ridq40o4iphl7d2vewb4tdbp6jopwk6kqzrp96d57eg7rhc3pz2kqro3re6oqvnc2v3s1e5s0ale9ye2lq6behxe97xbq6wy3yhczmjtjo5fby94jukqg8crg2h4pf1ea0h9vc76nm3ak9ptgltxeqhrsu9',
                        isActive: true,
                        data: { &quot;foo&quot; : &quot;bar&quot; },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', 'c3ba20dd-2c91-4cc7-8d19-49ae90de5d26');
            });
    });

    test(`/GraphQL iamPaginateTenants`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateTenants (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateTenants.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindTenant - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {
                            id
                            name
                            code
                            logo
                            isActive
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
                            id: 'ac5c52c6-afaf-4f1e-af6d-2010e1d16b80'
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

    test(`/GraphQL iamFindTenant`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {
                            id
                            name
                            code
                            logo
                            isActive
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
                            id: '182b9cb9-caeb-48a9-9d96-f38269b144f9'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('182b9cb9-caeb-48a9-9d96-f38269b144f9');
            });
    });

    test(`/GraphQL iamFindTenantById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '787eab97-2884-485c-adb5-fc9fd16478c7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindTenantById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '182b9cb9-caeb-48a9-9d96-f38269b144f9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('182b9cb9-caeb-48a9-9d96-f38269b144f9');
            });
    });

    test(`/GraphQL iamGetTenants`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetTenants (query:$query)
                        {
                            id
                            name
                            code
                            logo
                            isActive
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
                for (const [index, value] of res.body.data.iamGetTenants.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateTenant - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '2bb8910a-1e54-42e9-a051-6591c96bc02a',
                        name: 'c1hc2loqkzg0ucsv3yxif4f9gsjnxov0ypi7cyut0ydt7qfwvo3e2vl078i8pn0ilnzod3mako02xil45kgk3x25kyikl2pipu3ny25dgltrc39188b0ropia6w52kgycaa3zkodisia4hfkgqp6mm0awizsxwpk0ohs5a2umbsedfoqgyp6bv6rsa7han3qbg0yge5zla4e9ke7htdk3z7hbwwcgxavxxsws9jpgdsnipexei3joij2oqe07tf',
                        code: '2i7tqmhq8xvxp6gm5rc8f7qbo6r5kzipurtce1uk3wgx20hsme',
                        logo: 'jwyvgs4quhbjzz86cy4ply8qy5llruwnoyv8145hzcchw88pxmga13jwww9qv4wjdewuw4mb009603l9gdy4ke5qi1pbbvhtghddaikq7omalm9hzcg0c9e7b4sxlxgxem6aynmxbinamcdb2yngi4w2bzicqr4ok6oe0w2fnpn206yk7lwm7c1slyfyt8mpcswduo7a60w5ymhws482zty1w3i03v5cbo84z5m4nmkzsiiegbhqdc1ch1lzf7z',
                        isActive: true,
                        data: { &quot;foo&quot; : &quot;bar&quot; },
                        accountIds: [],
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

    test(`/GraphQL iamUpdateTenant`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '182b9cb9-caeb-48a9-9d96-f38269b144f9',
                        name: 'efd4hc34y7vi42rslh94ealiw08we3ayned0ebgi3o1tw2iflp2gv3dclivd1axiebp6f7bgybe9rjm8uycwbqf34f695l9r5065q4u8e7vzha3b0zy7m8xq4nhuw9oasft7o7mvyo8rzzp8y8g9ylz8d1253p681r9ievrjadr1xnhb80g1o3018tnrqq7bkx3mw35znsza63rj2z9qe26026bmwewk1qapzw4ifp6vv8xqi33mtd0jm47wfmn',
                        code: 'trszyw0y0ofgdgb5ho5bnm0aiujc0atg5infdqdj1sob8vwqmx',
                        logo: '86d8tc8v920735um62rifqnacsdrgodkno9ekes8ulofy8bxavvsjgohnai58jvadeu47qoalpbtpuez4bhei2fue7rzq7h5m7fkn3aifvwg9a84tj4m34de0ihlbtezeos7zznztv9t1r8kkj6x8n1tznsespaplzoqodcp50jj8x0yuv4amxllumyx5j9nvl0i45mhxb28xjwq1p034cdk2qmq3sz48cj0k1y85x8y03ns74jzygicj5k9pod',
                        isActive: false,
                        data: { &quot;foo&quot; : &quot;bar&quot; },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('182b9cb9-caeb-48a9-9d96-f38269b144f9');
            });
    });

    test(`/GraphQL iamDeleteTenantById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '50d35103-f22f-4086-a8b4-dbb5a3a62a23'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteTenantById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '182b9cb9-caeb-48a9-9d96-f38269b144f9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('182b9cb9-caeb-48a9-9d96-f38269b144f9');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});