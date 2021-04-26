import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IUserRepository } from '@hades/iam/user/domain/user.repository';
import { MockUserRepository } from '@hades/iam/user/infrastructure/mock/mock-user.repository';
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

describe('user', () =>
{
    let app: INestApplication;
    let repository: MockUserRepository;
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
            .overrideProvider(IUserRepository)
            .useClass(MockUserRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockUserRepository>module.get<IUserRepository>(IUserRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST iam/user - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: 'isx3l15wc84p6x2ecs4agkm898pug6t7e89p1dxifbcuflsenevpu4wb8v8ihd88xkzb4soljc5yc9p31a5px1yvb5wwyc7ogj5qqabryni8z2hjzxsfh347lfb8sqsccqjqqww8085mus38bosupz0kyw3acwqudmj2rayvo294eh92n9fgkw07frzrl7wau7muavwlyfqe5my9n2u4er25mr9tfj4zckk4uoeyhb0mbfph72vr96ygtkm2sz7',
                surname: '2359mouy5lkznur5ftj50n6s53g3097nin139b4tx0kff2l6454kn0ubd9ksxe897z161z17kwa971p5ya2pc9252uy5ec6fh1eftjwq30k2hr1ajb9jujgl5nzueomguqy9ah45ymewjbj7e30ialxjwpm6pf10ec6kn08n4zu49q2tbaw88ay0u1upl4v1tvjeabk8ssk78lq7f9abgkf2pncli6t0rrpa49hy0owg4kxyfz3qlz1se6yycxv',
                avatar: 'qplah7t1ws9zspmqo2q90812hry8u9f7woqie8a5xvxi4q2283pwkcd5kxs2hsetvej4nfw8yzxtcf82s6xu9qjdk6ntktx65vqfd6r4oa3l62vr6eephk2ja6ac55lch9huzu3zz24rmbxktpu0eat9yiyqvhayspeo3lktgem9m9b64kwo3kk4vvzxvyjdj93ob8hb7u1p6or3jj93irirqr8nr9cppgx5hb9rpvovismu8uo23uqyraxv3j3',
                mobile: '68tx5ass69g9fz8cj209wk1xorlrmtmcb38s3i2ee85zpcv6e2it2vly13ti',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'xvr0enmzb9ow4n4s3n1yfuyxv57okrcums2jm95j90gdngp9t6vm9lqrafec3u7umuxvqypjo3idtrfdskn2lrn1y50pneaddpeklwakdbefneb4ipy2b0la',
                password: 'jdwvzisnftezgzvweze828p57fp9gsvn3g5b0rnwyme516isz2wpa4abs50ksyliiu7ltf3x7a79uel6tefgfchd9havuwui0p5c1vyym7c8ox1ss28kvootzggvvrphnllb4ryp655v5zvkvwl97bqca3pc33b02um65uiqubvpv7nxiot6frpi90b44htycz46rw31hf2rwweq4a9t98cslzu4guvs0od6svbnymzxyucjc4pak8a12ttrind',
                rememberToken: 'bmrz017bahhnxu5op59xgna2butbzln3vwd34781wy3x78i3v16dwbkuoz87r6klhxgvfptcxbf0ar57aivdhd6e85h44anyrks6yoru58v09umi81s9owidu9bwu861x2g96ku7994jljz47y7jn65uy7zx81dhtl5ztxu2amrniwksccj9l5zrjf8b5ym3mjkecmef7tu2wezzcf10l3m5xknr1eojw0bivb9rrcok8u9iv73g98tt4qs74bc',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: null,
                name: 'dtmvus6lneupzl16puprdi9ptepszimpkjco8bkubnf5nmwi3guao4djom2bo0u0x4zemn6gpomn40sh1fob4zizu79t2j03m8smhvdg9s28jotmc5lxu9t8bx71tay13m1jxbu85w72gtxg2502n3m3sieljrom5c2qrdixfkl5i8kvoy63yu7uwn3xx0te1b902elms26d6tc2wrlk0253wgxbidekc587rukeeyrkunw1q5noc4new67pztf',
                surname: 'fkewx4tgijrc16tlalg06465qbseiiw6cc5lskcmb3v31sypouigalzs2rmcffbursxtxedcdgizfpb0ltk2sjjw2cc1p69emukh5tkl25fh70sjnkf3cn3ovve12b0j2zpuweugt1u5yps4h5dbv500r04ylowpsgaiwur7n433l1ash0ovirpnvtb84ob000r1dbcm4wu3bvm72escif15q1zashg94j69xynvi15kbrp4gywdcbzsrgezyi7',
                avatar: '31m3n7o8rhhfd5xblaho6nyr4nrj6hwpmye10paevn1bjflyl6o9bhivrb4hfb4adgmxneqalrqu7t2i5q9c4we3aac37rawnde7x0lzqkrkwmmagzljdbc5jrb58myttoai5uj3c8epdfp75wgu86fym5v7yvoramjc8lbj9h72guv69lxxw6pr1qrym6qbcdh532zzdfh24m4ddx769t9s2cahx3mwbhc4ay8v1bnes9snxdnj07yoeh4r7hy',
                mobile: '9ge5qzuw7xgdk0ozlmcbvg95dn0f5oc1msp8ongv9lj864jvjmuk6ls3xska',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'ibu10pwp3dbhlew7ukx4fp92dk8ntmgeelltsnmtrpn76l51bhyrh0u4zyadda9k3y6qhcepxgbdrxo8it12coqod73rhtas0eo14e52oocd46fi3nh1agn4',
                password: '9pe3a475dwork89ht93lnygyl673vfkchgurfr1svzv58p6pmwpnu83nr8x84wzu9thzyrkrtpyww9cd1fb5oblp85vcnjjn3l39u1wiogjj84yp4ushrkja7peprm7oafeew5as2bt00i8mzh54997e6mztp3onllq2zh1az52gnwl7zu4rv6d9gen66xi19mr8d5esswz1xo6kjmzox415i5394phkzahhw5xk52doicbbs2nyanyz3p08jgc',
                rememberToken: 'jzuiomsmxi8fb1dq02z9cc5m436u71zg3vk4ub59b7wzsyasms2yot3vc48j6w6d2yktdkmonikz8s656kl57wxqyqq21i7p69zl5044sbkxnxhkhijhz4tp74srwmzugqxal2wiu0t37t7tcqsokzzvrjlggk29rcw3wz3m5j8028ial87y4jbodlb6mcf45czothhw3x307i4boa28aww3tog018mk3eevvlgraghra2801pw4ivri0n7p51r',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: null,
                surname: 'qg2wijcjrnxceuryqbf3ov7c2xueo41n9dva0ij1u2xog18kct7vuvhu52uaq15bffnp8t8mswts7kz3fgytevvfrboqo0hxrptdw1w7gu4i0cvd0j81yazwt8vswsel12nbdjrewvq7q6xblryphkvmurj24yh4ov8i7o4nan4jxvf792fts118inaeiypk7sskixj5o4blv6i92lwggpu7zrly4lc4pjkx82dnqwup614yp5ugqrtpu9ey3eb',
                avatar: 'q6yh8a2uh6w701xudb0wb4z8bh3p8gxqs0i4al5up0a0qd3b5tbwvhwb0z3evnwlk6t7lw62qfmf1iy6lcogghxarkfl5r8ykz13bdi6dwd6myuon0d1kciv4md9poj6nxp98xnaa9ydyc5a2gabvlljxvmrdabvuc89cxh59939yc9xdlc8yh9apyr845hanc7urpvt959orm374abfqr2qq3jpg5k411fvbj867wczqjxd1nfodg8mwa4p6mf',
                mobile: 'x6xdujwt5s8r8stx4wj1vfk2csnl1wva4tjxvkwalmerjd121owii0102f7y',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'qeoqwf0aixyq4xb7cirysi8qoxi28p5l81t8yp1l7hwjw4nluudh78cuaorpe5adveyybojydpfnja7y51mijva3y1qd5qyfcd1m6q17hnqhrmqakoduzh51',
                password: '6xvxvmmhgam0kdrfybxh6rsx74p24x7p8btwtkhawa14z5tu1jj2x60x9vtfqltq8y85b8877ztt5ccb66ok4fkv6hdh8k53hzozpciknb5oxhvwrzl0lbck9acqc0m6qcwqed06svps0ydcf8t6qzdnaw6u9xhcrqajfxh7832x07ku81mxzcuxyxk6ecmyc2y3cfbkveta6dtututyziepjq6pydueyub1vl4y283q9tkf3r292g9kxbrvmfm',
                rememberToken: 'b3ma72afbr1ecr5ywd55rxiqh81u8yp6ytxf2ojbpy3ho37plvz8kutebix39yhz03q5v09rk6r4kkhxwmy0i8ajjegcu5pt1u4r2ox5wytznytprtqawh8irxkq7ervoom6y0ww3rqhimux1cz0jx7hjbezfmrkh9tqgvoxynjky2w3f19mz9sqqfzf8eezx9bw6504s1dgbvibk25dbw7xp0xi81u0lvzpzslttukwzc28zyot4x0r6ma2mm7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: '4xaifosepwjynqbpt3770ztcwm8knlsbb44242j7sbb7nofoeo6pt0u37pld5gyf2yc4ergn35f3iyoxt1sq3wxinefrsmtz0lx3o4isnwjrd5t9ynky4miosngj6wlbwrd4hav3tpptm7rgyqhgifdfwy79frw9le332s6uu44vvimqf2tk92sft2t6irjzzn4ttlghkasmedsf939zwprhcve15xhfelntqwllhk66imsms27wa8pdsxxuimw',
                surname: '48qq82xo2y53pigvv4zir9znwdcdyiykrsf7a62q1su4xrt72u41716rejzrw6ostm7r92dbr48vkyrzqnjeqiw7ftssuk8lf1bt926px6pxriy4r2tri0svzazu0p6132yz6okzc7nt0gn4nbt6rgqtjuezl7mb90ryvm9afp8mm4245aqcaiuwj41xbc53tddbnocmfy6ku88j7isvhho1b5tev8bg9z4q01njnbfilxkpbaichuze0fryyeu',
                avatar: '2ppbeqqr17dk0i13hbdn2xckuemm8eehzgxwiii7rdwc806q0i6112lhdhf9ojtzvp9xtpjhnd1sdwiyo5jm5ftftev6l9z98ge6670zqjf2dpniogem1r0xa4rw0jqxqlc8tw9sx5krhvg3rwhyt1g8507o580z3z7cwhg79ow1idkkvw9rqj8aqutshtbs9gbbnwnn5j68qwfhx4xrvpg1w1wj02arhsd85095ef2iwlgboxqyzyxqp8e9gif',
                mobile: 'l980asy6ffpc3bldm1q8pdt3jcymwm9c2uz6qeev2n0u7r36d4kidzp3re8l',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: null,
                password: 'hfhfzh538arp7yluxyyov5c79zexn2vx2tz9xslb98jpks9dqo2zre5hpkqrdpyt41y4j721s5pz6gcb4ykhxyd5z2f0jpurul0nw3aiqqeyv8c42s5c8f8g69zxtl7zb9qx2mjkr068t7lbafs8hlu61owjuscnyy3tz4pm3b5r90h8mv7iu9rw3jot337db09vyw6jzfqgkca3c4rgxet90ge8f7c3r6hvveqnkr8b9imr190rfiga9mio774',
                rememberToken: 'lz5kl289maulpnw0ika3u6p9f3eryc55e5i04tknn3gmulzgiv0w9rax7bq1bxiz9bol4veuy4nzt9648exfp9bh6xbnn9gws2zjnvn7v8rszl9w6uf4euikho4iikjkiklgluleekrrafrf633zqdacps6fwgehs590lb5mil738e6h188oz5y3i8npkh3xoklnm4an3stfk1bcsvmpz1doo2r0wwzu7c6a8qsf1vta86kjn8v702evnvo2i5m',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: 'se67yekeselcx5hhf1wsw4inmjn7japrd314jbgt96llwt41f87z8wpwb5j4c1nzu6bowh9seml45f2cpoooed4j4vnsx1ml6twayzhx8dorh0nruokhjwm4oxd03jf59kzs8ii6me64z6v9szq3l56g0bo3yhqforyj1afh7uifu4a2rozvhzkvtrhkkntyn0aggratecd1vr0yrphrxa6j4l3ffzuak2une09j3biynzzls4f8h8suollikbh',
                surname: 'qye8h6ftk58v9431jrtwb8gygqtokije1elj0udpqe5frxnb6ojjkb4bxmihrkefvjbh2eyxtywntp56o8h7l0umuw1chxm507422cqq9wmeygys26dkgddgurlvjxqc0poi4yq1orv08xgdimenlfz880vwp5w8wxm6j44tj3h5nfasdm2r0qytv8gi41qz9amdr8qufcezzq5q8pcak0nngvkh3u9nt57b2gic1awgbwk3zh2939gxhby3jzc',
                avatar: 'jzikp3078bij9sy3bkl7yjdamavgbzreknb9fg15td03dzbhdftydsr5mm70iop9mayygharf3upd3cyvo9izi3kw35jpeyx7i8ndafjfqjqtmtd2g608z7b6j6vzs9xh3sxyejh5pnzyn3d22b0byx71g86uis56lnt6y9nviano4bstq66qz5wfof6dc8aehxp6hn7kpi9izfl0z1mrsmls8khwa4sladzw3cyufwlyomy54ek6a0fnphucic',
                mobile: 'zdgqylueaukfkml4hhelpbbpawfdkuurxe9l6ifvm4jg3imddprx2jwrlnvp',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: '8zr07dldgwc6z8piwey3bu6yo7nl5qq7pgfn8dpou4pi9mgozqywqc7t4uzv0tw3k7nboe89r95peywb4ber9aocfpkkccbhdrbesob89vn065b2cq7qjg41',
                password: null,
                rememberToken: 'zwqaak28o0zqz7wmkmnrsxfvajlnd3urm8e43krogffjuru3iea3vsroeqaj7s87u7wtztwbrj04f1kuj7o206vhx2t85jkxqcuwvzncpa4hu3kdvnr5sbk2u0wlueaqnaxd7snx2kj4bmu7n0w02jss6d7qxducjrj0b9a306eyt2pmt4s31ukt2piulp8zwpyxkp8fjcjso1hy1srfdl2rm83z3nqnlubtzqvaxsfwnpd25ijq1sjik01cjmb',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: 'lpkd0nnplqu0qjqeou42wmi1bj6ii8awacictzp51xaxunjg4x70afrsbmq04jzgvxwiz66v3744etcnjn4dcyx2jfsvkvxx8uftye6ii59d54mk1upkh47larvkcu6q57lg6lrl0orufe0jkdrxragppwogsrph3bpjg1fdk2tmmsj1hxr8yk2ob4yu2k2pyj7bmymmykc8qpsyt2kz0i9ibmquvgiyaxcu1770fwyb75frm14eew34neqo1wu',
                surname: 'vuh31xyypwlcg0wn0btuai0s9iuw2oop97548jmnme8hnpnlu7lz7408kihqq7gwt68rtm4tntobxjcciay3l8dzdm3qlrlbps78ainr9b7hotpzvwfobc9oc1x5geuwmcftdybb02b95d1h4q0h7qqrrw23c2e7199o5zarol421jvg8elwy6mipladbx93wps13q8ax012soogybf6y0d2yv3zskvx2po4wvjoj9sm4i64pkgdgdy0qqd25t8',
                avatar: 'hwefguvoyp3hlyrzydx0kxtcyebum04kn47qcl5f14ufjcpaxlzc57wl3083jtel0bwwra4kfyhpew0chlu14sr6jc9849oc7ees0io31gjgyovsyhkbxa3hyfdtq4vuoxnbet411s1mucx5na46m7ucx5eczavkhagdhlkexnom3oh06b86tykc3b2sy67c14tgdnups2on1j2din6vi122icu2rtq9ghy6b97riud5oa3kwrpf4yyj5xx75ub',
                mobile: '1z4shesn7ic9d5h700syuf1q62sft3355rn2oexlr4k3hfnohhhykci39p4y',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: '3swa7q86ji5xmnpdwjpk5zdof27qr7ejpe4v1qpu8jcb54956phpra7k0h8wjatk75jnpa4wjor3vtzac2sbxcs30j9othnsfpvvaz87kg3i1qflz33cyjwv',
                password: 'agu2e43ivt9te4ocxctkwzbkr9ulpodc0khgfigipou8k4hs015zsopqb88wsm0c8lbuckd0rvrxpqu28zv8y9hpig0wa8b0mgssot7fhnd4wqx3251wv2thc8bo6j5wdqxoc94ekhw39c75pke0tb3igo2ni41grjuep4bizm3dtdhj612naa1dza4mv5g5abh7rgfrvkpc0ko1qo750f5doisw693dwxw110a99dsk2g67qkc3m8g49pl5d62',
                rememberToken: '5miwpwzkzrkl9wgdlwy0wtxtsjzaht3f8e8fx0sr7ezyqz5me8jgpn9mrjl31aur6yc5j9dhtjdjmju3kkbfutbw2och9jgrvg3qfmnsd5f6cz6avbuw29rgyp3lrmuyi7vv94agjbhzr0g7yadxbm2owto4rr1dm3bmyc14vf2ll19bb8fre9sdl1p9n0hya1thtujh931xan5bzwtqr3avpb1oanl7hd25d5cff97n7ui8xki6ihco8pklrz4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                name: 'xomr4r9c17cppnj1mxk9gifpwggqo4hsnbrcxyjlk3whfqo2bzqac4h2bkjlirujw8t5oexa60a791xevparlwdw3h7j5i84wu2s0xnkqse6m01t1ce4eph0nmbev8g1h1tn1xhr5gfzbksss4esphyp63mgo1dqgoqxiypmrkbnzez5wgyzlpm0ejraa10f74219pwi0ec1ilbkdifjbtgyo54xpsm7krpkkpt4kuaumoj5llc4df5pnz3nqs8',
                surname: 'rruvw4ukyrdcujfvi1loh490xyb9jrw4gp9n2vstfnzwqf9kkbvl0dyfnql5dxa8j84zrrpef0epus5pqpqzqyo437ecahy0a68gvitv6ix49qgefa0w57p3dvz0647ndv5iib5ue9u1nghokghyakwgsqgdzhscdsx45nsqda8qsc8tyu49zsb21tiz88qgtyjc862d0zzzmjabqjn3dx1qnit9x1si9edoggjfl5db3z3lpnb71wflrsuxgml',
                avatar: 'z0bvwkgsidgyyws8mzvtx1noloq80xew0ics8qpadl1aclt907wy3l8tklxbk76xni39uh74xyd4i3mh584axwbr10josfmfuxy4lipsqq0rwxqps20xlrv8o77ni1xcn156ld6xeb92xisf7rxk41rkmopsy4a2d2rd3p36zyq7jtm9yrq78d9wgut3t48j748gslwsliaul74jp15mi9peis13cvyl7u1mnlw8jyyuwl05we7d06ootfc2xba',
                mobile: 'r7l0rhm60meti0uyhj2yedtm001pmu979yjsqzsjq832r6h5kah4m50o90u3',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'j0czqt6idahj3f7fgxw07mmf75yniptfmcp10elb4wi5qtvnpadt0ootmuztb4lrm2pizvkttpsysy5q2jfdnzykiycj4w1epromovqff0z9quq6t0mj86xn',
                password: 'v577djcz5og23vlrv24yd1a811wvwin7zr5s7eovu592gl685ce1yp2r3wn79w1o8v5jcaociqcj2q7q953n6llgxlxav02ys7b04a3zc4nxln2yg957nqbpwuqi75zq31xifotu4vxyqhyajysh1lmj7xzr6ibxkogcpx0fhtld4v7a91sn5ztqrom06g86i3cpan2z7tt89jsjp79dmy82roctqv1tbn61vtkzo6uuka131059e621ewvh1gn',
                rememberToken: 'bzkjxro4j8ffyyxp7mf1ko35ntydrnnaransdvowlzednm5eg5ra89rdzl7h89uxt7o1l54g0p5xbd6d0jzhj3xdmwgnvjeg51fpbekc7wcelwm36lx0uooidzgskzbhb70vrylvsrt4vvu8r2fwri3mbx6x0tdtwe4b9dpxp9k4ztnmm3m3knae385ghx60en84xh3j4l0iev3eka42hpshnemdkiozw1lr7gnmmd91421dmpsf373je2bgq8v',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                surname: '80b28up8ok6mmfh559916lh1f61d27tz05sd09el3isqqof5zaslohiisdin5i87do0899f2s5w6ji645tr40kgk7h9sqbidclompue0iqibksvl4q5ojr454n9gc29bpbgtfexz7ejwgbuygx12frrbb0800i4a94qmnxh34qxavw43wef5pztc4fc6d99pwfkupr62dfb81o62hpp47ajmsbln39rzi129vxonxo629z8ug7sdupmesgi2f37',
                avatar: 'zfxmtmf0gexpjl5gxmbnx6szgjmxfwmq5luvv92cezwgn2tg1e815t1asg23galhl9guytcv604iz798jmjg07c9jwmarf717oi002nkg4cenmhrlkl32zdbgf6cn0aofdks3xsj5mmiahivzk9rcge624fdo64b49r5toaa7qxh5lcvmvf1noo2kk3g0z9iaghr9nl4jkxxn4q5n6nydnzo287y1wc03rxujvnd66px949tfolftshiivq1jez',
                mobile: 'wubvgaix0u7lglpxg2uqj5215skb06f0yqftyxcu3y59t5pjlz6zcx6upbj5',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'xdvqdd3qbgodyvt5qsfy1ax1h3lb2w1jf27oemtp80lj0o54ct3mf7x8fdx4dqtndthem0hzuottkmaj4jg7uweivfxc6i3rxdhh8kc3f2l7for9oyz9zcun',
                password: '228i6x2vtd1vz9ic712nlf1askewf86s5ctn17qimapwrptnguxcucax7jsoicqwfyoo7o4zp6yhei2my282any8adettbc5ije5u91xm0c78oyo1886mwwbnezdergevkqxa2tx9lfux4gd8sibwu6r7bnxormfupia2s01ok77y7kqdfya2p85qvhcie13jhe2hwp9cdjyq7fixf1jgwaetjz2f6y78qdmfzeplc1eag6symdanxcyo1u6t76',
                rememberToken: '5yxcjn08eeoh54o5wqde9047itzk6zvt8kdip8z4xmralpl9wei1lihtqnetdh4d45nj8r115lxueuo69vwlz64bids7anprcwu2jhumqwq14lyevhpntl32f944b3mdx9i6v7zk1663p7eqdla6yqhznjac9boh8tcidd8tniw3ak0s2ndix1ox9gisqpp4p4l0sk1rksha574c4eowbyt9t4xa9xgsvv0ecan5sn54b94rnda875eeezwjwo9',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: '1qp1mrcd5sil7o90mhxe83sc4cpsaj3fgxtkpykzi5twyzip0wukmp69tb3c9lbxkgflg0dkdbwkzjgggu00w35evtb5vaf3irfxq17u3mxhnou5fd6wsqjp9b36wynpd7sx6xd0ni7rh2hxgeq83qgk1su796zljq4u8auk26xpmhwjt7vq1rynq4hhx99xw5s581kxguygzs83l2ip0p1utr9pfpi6dh8ianmo0c6v6ladggepp7yc9r78ied',
                surname: '3rfm9qovqp7ai75wm07xbo5aspd1x23f2jn3hby4ceasp0knztzikk227swi4a8q9zyud5yl1rgu9ng34xoc7gjgr8sms3xbn1kz512tnb16izfu4i78aj1jxfmztqz9dvobf7vlhpktmyc1aq7i8e2aa82s95lhfgoqssrzvhtclegk0b3797zvi5f53d406pvzg5qzetsl0kdroajjlpm5dss0jxucd0mhkiqlv6qursknhqyw50i1ra2vvyg',
                avatar: 'pvs3goywghe5wud59ui5qhtgrpsovgrkbaco4eugvkf3v6e7epdj3vazh1c1oje64obygkpylpylg0an8gajbvp5im7lo2h0l1y2fhm0km64kjf461tmv3dtv61oplkedb0z3eju4rqqzjskdge3hhwv7ry90b3h9i9idnlkqgmcam0ovbh20kxkld714o49dqvtg76pimzdk9f24zpzy443uw79ykdxtmkln8eozz0kj9g5ho3cl31e3h8chht',
                mobile: 'a7bfwqtdu0gn0yhoa7oywxs8mbo1sjc872rtu5eeiyj5rhrclf80bhseffhc',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                password: 'rdhqs0lvstqkp8ahvg25pnt1x1h6h2hhklul1pccfrthtab7k2p3w1i633vddo77r6da3iwjbc0bznm9o4dazzd29azyfapr3a2ojm1kzob01r9phhxup1xcbi780qdf46hmbnzji6amiv5p45vvwp5v335x338bz0na5yvpdnr5wdollxzkhnnhdoivacu4rjwibjxw4h586vflxpmdnti1qxd3rh0ctcv7oz51u77e5sxau2q1wrurjmmmhkl',
                rememberToken: 'r8czvpaydo2daopsgqf9a67a6g32nmsyfiv6obmfmdyjwjoosxia7ydcm09ki46cah6ls7bmz5vss6gmr1ixobxciuti6bt3xpq1rv7oho7cfmingxx9hascs91olps4c0t75sugl07dxcyekldnv9o0n6hspwf3du14k7ye6i6y5d1z5xwwitqrm2gjubqk5gemt8ywku9tb8tfswi7ex0uhoz8tekknahkvb84ueodn6kcce9w2mg9u95oic1',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: 's4x2lxwd9srh1yesck9tttuv9kdc5w85vu7lx885ox9i2jv23w7fcyqm1m39bfq5n7jv4d1md815i9sk2dpcnyxzwi8436jjarpt63h81w1ml7jo9cewcv6c3ejcy6799vnj9nvd0tyrf79jdtycw4nqwlkacas33wrw7kuerqaorp3wltkgrsaez7p4bcx4p08cm3h6v5cmafmdhqf9wo3gvs1ft83mj8181jqvn9ou4l7mdemi2ukvnxf70ro',
                surname: 'cl4xb6ufx5qxbp8gsxe9fkzdgegg0tz718e4u45e0qst0c7z3tmnd9ib757wbjdcggdimqawgm01kh6ios45rea5hllxqyxzy2fdwlxpd1tfg1q9r730idh4xn22gfluf0xi06lvi2ybaktlmbqb20h8mjfklo6xch635rpjf2w6q9onkrjeydq3nksaghle80y5sau9ktg8ncsvybvkzc1gndel82l2zr3op1pm89pcf7iphoyzwqs70e699dk',
                avatar: 're3p1ntvzpftzs5j652jw5283j19ab48976gyzob1jcp1vws0yfbes8ube2zuh3ph1f3yixp1cfr9bj1choystuh8g3rbrvzmkr8pqo25628vmu7ath1s66cczvg9wosn3q9j871nlo7r74f2mol37i04oh4ffscpqdu1eo2jb9j7toh72868ktkhy4n3m23hqynt6v13rccyx4t3dcad69ax7paujegqu2k2qdct8qdhlvntzakogmhp7wiu8s',
                mobile: 'xtlgb1kov2rw4todb00usmdvg39znfocsmr377ijoczcejkyrprxqhjbqx1y',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'le3oied7vkexdcyy3zniht0dh14e68dqyqpi9z7ztemiq3juraw02263xcrqjjuminia7z60ie0963ncwzep96w2jr69c766qu0upwccy1t9fayx35e2lp42',
                rememberToken: 'ux5yqemqa3zy61zhskfjw37kilz6ptodd1oi3wg9higa14l9rkejeympsux4khfbyi664ae7whv15i9notyg8an6g6sz7rfl5y77jfu2ryvfkslvosaeiskiwv1jxexl6o755vsumt8ezoqt9510360fmh82g6hwlb0qdvmyhdccoou65qz74spj33ysad9jc0xe6eb9f0p1s0btfixqqqmjt58ja88bh1ca0ka2o6791p12r25mkqu80ew9w3i',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'nbdmcz4vxea0z5kwkuwgwr5vyn9o5tk1u7rph',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: 'padytyu444qolpgwld8s7sbesy2lhfozfpsstutacp9zf52rnshf76qdr0wyly7bqj901h7a0oe7hkkocbpde5qnfnwm38zx59n4bq2r77aus31fib0z6wcbdllgfmq1vdmp35ulvskma58nc2oyln7ottpotoprx36ekniwy8czip6nnjwmq5zretrw7i6lujyv9j6y3obw8dlswlv6v1njem1dzek97pijw1mvhv2i2ahgq8pdzqj6kx8kosi',
                surname: 'gzzandr11q52k7wpn0d5cbxlh446czhom2oaakwbeqsn3nzclxkri07go0zdh39zb11pfm1cc0crvu6qekkuwrmuwy8ybkz2v8gfjj5ic5lhg1mmfl1sujwbx5xr8y0gxq5p0h5cxl8he9ljm3xe2bpxhxqhnbldhwvi5zgl02qj315cr10htlbdkxvuhddu5jwsvhpl8a042ohwz0jcq38yqanyo777u6a933d0m7cvtywhgkm2u5kg2yg056z',
                avatar: 'l3rmoyqf2xk57rygko7q0v0vlnnqbxb3hc0v3x9m06g1gpubzlv1k76vsjed9pd50m87os0vwbwisy6wglo5ty9x033f4tydnludqvflpe0j1pnd754i8p0u94luwb8j33k7r2dba1qgkko67br8i9ks37ina4xcu0ccy56zw50yawmktks5crazy5fc1m3t5o8d46mxgemejqzilklu7y4t5xbm61b5b7i6ux5eu2yhipd1gu8j3mmpurlxr00',
                mobile: 'njtdzx8mi2122b7v3hiua9u0hz1zw6pxn039u6etpkiusxbjhw98mrv83j5n',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'jpylb1sgrw1sexkqq4jsldd7u88o9xo3v3vgtivlz885e0sd8aj6xohobuqzc4ojg16aoeu9ppszy42u2njl43n96u4188vxhnm9ukggahkf9ngtpvrlakbh',
                password: 'cvxgv2apohxrchv35im6wf0ffn7mvn2jm86e1q1yz8v0xla1eih1q8eycx99otb99axgeowfgfekmk3duht58navwgdlaeg8rsef3nzoj0mpmrlv9wfw28waf9qmq49bxxuugc86ykybv4hdov7amzrm5xmz8i6vf8higgmxxdxtviau118wafy5ktpdfv07h69gz732fktpyowshy8y2lnn8w2vajziv3mqhjvndk6kaiu3k6v9832yxmnzhmj',
                rememberToken: 'l1hko7cm9rnpbdn0ou32vri0d23v9k6xtvxm6hqub72ab25mrfzq8x51w3frx28g4mbz8eqei3if9iumxj0zyc92wcihzmvtoui5vo2y1adu63wyat93nyj3m76f0zbatrpy8gpmn0varxaf11gothsu084dog1sfma2zgdz9sotwau89y69pvanoln66i8ojot20xwbkhmdwiomk3jkdqsjwgqno6emncr97uq1ozydnu717ebl3cafm1qxgr2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'jyvhi0r4tpbfgoszh8w0m3r010bf1p7lzmlf6',
                name: '8b85t6s586e4u0pfe33h8rywbz9yvz4wfxxzm8zotule0ief9qsplw4n6u10x3kysvltzmb0gmvqotjfgxtclswfo8aoib4yiha65v2f7ads5cj59a2857mthalawlqs8cg9n2kd8ddt9kmgc3jlunvh6h48xh08q0079gz8mu70xbbz7nsx30bhdh7htw7ekyiai2honsr9tdrnq422hbhbevhxxzvmfkuogn7qj6w9nuzvk3rhdat19ks4j44',
                surname: 'ehjarthh2xw1w2ks16nd3u085pkcwbhgqng5eszzh6jkouf5pct0esks8gcb3s3jdbhbgnlw604vkvvnmjira130hb8tznbgwtw9ntl93nnwb7j3tgsr0f3bzf8en75ondhwzsriteji4hel5fztzqumvz1cv9iu35khko6tkjz590kadpu4x0mxle9osww06fve5gf6yfxfxpyw7fsyy3ns1yzij0z6lvp4c1mlp5194e39tb3dk8ht6xh1cjw',
                avatar: 'd9i3bze75cfzm8ce9bnits2jdp2vd9fb3w4y9ip5nmkjzp38b5vrqnsefmjagjkrilm3otjlhuogzy978xnoaxi1ikkleyd118pdkt2q5xoesfycan5gkb1nooxph0hzfigdj95gt5l56sbd08lma7kbcdp89mw9iqqi07hrwcgfy52bd3v7tb77pjw30mr2dqn9kfhtdfkgfce1md339s0t4xyhlb7q7us3dbuvguvmljytf3niojte7zxna3l',
                mobile: 'iys7ekyslhybku8opoaqdrjzl4x1pdfhxjhniet81oc8tnubeo20ej7r8m6i',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'l8prt100hdcp9ulexu8cb1l3350vy4bkogduy6fdimu0fh25n7skni1w8fn8axs5gkq6yl1nlhq6evlx2riztf6azojgksnzvpk9erb3bz0o15b6h77thlop',
                password: 'mvrs2upmpxbahgnmla78nusabvf58tdbkxjb5j1a3o712yspibewdxg9hljzy1ycz965yhqbkb5xsso0u22xltpdhsa3r6yd03drsz395a53hx31zraip0nf33vapi4t9q11a5zi4wpfbyfc73iqzgbyl28ublqpi5pvpzx0brwksllnain692fzllh74b8si1ihqx8je12zmz40ptq4kxyf1c9sj2rzkwge6k1a1a1o4w6t9pju8qshcblew8u',
                rememberToken: '5db5tpvbj3p89qh339j3ctwjor2uk7qitukri510tdxi8ccirdho3hp98z5wpmr0tmym81yyhwx45jkfoe6dzc3q7nkt51g8nyfj7gdpsyvzf96b8gvcgz82l7abp21xecj57qrurca90wtzhha630zf6qnwy1x725gz3guvfg6rd6ah46y99ahgtsbvaml1w6bgw65rikkxxg8gz1iuh9g5uz6wn1h4fbpfdmsfkvx8tsajy8ft7x1i9s93wdl',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserLangId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: '4p18efid3p7h71xm96l8ijikpe047nuhhdgyvnex0l2txkmd6pw0d5kzsf16jc2evp6ppnaf9pknfagheno7z9fz64ktldc2l7g1bm931yphynfcv8zvz545hj0x554drex0mls6a41ayn4re06uoex3m527qlaw3tqlvif4y3i5vhqrxpigz38c0qyf6bzj4uxuaacxg17omu1njb40t4ttvb8k06f18w53fwsxxadmc98i2uf0czw5jk3gjh8',
                surname: '9mnamej0h3le9fsec11kh6mv5zn0yppbho42lmhghre2t87zlwaokweiiguovki8l25tbks8picocgcxq3r53izv11e1em0xktriv992y3u36sh9vunx9v835yw3olfbiqz3qdvabdr89205xkhov6m7afhq0zwo92las5t32a403uqq4ozf4egrv6gp1ms4joec85tlebmm570bffc8dmmghaljdzbpct0uf0xasyb0g5attdfbaebmj9zpgo6',
                avatar: 'a9m4grp53rc4oa0vaev4zq752zu869zbw1aaijjxsd91qvk4f1d7avjesw9dm5thx2paxtjcmlewdo6gd6qhfqc8a6m7a1auf5qpdtc3tcqmmswjlu3c3jrq0jptet8w0j9vyjlppcp7ianemhr40hrgge44apvdg5lnrmrd9xeon9he9zlz8f6dhfuonuhl3k8wxwkdoqyoqbk550klgkkslj4enh6gapkwu5tt29l0bpegbuhok8q8h1w03rc',
                mobile: '4koywow1k06cz96vvequ1at4ajhwzv4t966u4wskz2vu8zetr6cx8lhc1hgs',
                langId: 'jh7ptylklvm404vn836j1vxpxnkl5930pxbwa',
                username: 'vt3b7sqxugk77zj4egtss5b83rmjaddaegkdwu51tjv3zuwillqhuz7yjkfz7lxcas5z3hmwuyfyt78jsmlp534p4s203q8mdaivsm56g9lkppesundzyrt4',
                password: 'buumoap77eir617i7hrzeovu38s3s5us2bisb8w3rpc4mkehebfu2pdq6d034fisr1pgn3cyibphizajz1v974pso8reebaeno25hdiuahkhbdpz6nsik362zpmt9vzrbfa34n0q1jhopn8mpaut6hd08ouy1h5quynkducae28hmhc8eesb466r8tdpfstvhz0fhzz8jwbshrqqjp17m3egyvoltlhaimz6xi33k1w3a0kigghqhap4dbty661',
                rememberToken: 'j87ifamcnnsk6733jt8kf2w63nedseg3viwz6gvvbhxlhcz6njz44jlu6ur0878utowsod30pag42gogfi0jmk8q96q3y1b7uoygiu7jnjkfuqnhvx7vlcl15bc89t5qf7n3h44vkcdbo7rw77rbcvbcms30q3t8ik36rpacp27rbwzn0rab91jvigs8nb29lzw9pvikude2sesb8ql5hnyovxpx2sialr2puuvhlv5wd5z951v9cjg5isrwqoi',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserLangId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: '426j8nyij5chrz2mzhyakp49xeea1e5nnuhpdd17g54oskl5w0m32qobu809efyiu85azt1xor2d6fq5q32borvh4pxax4ai3sqnrn9iu5wbj480x3zdc0u32wzqlabsa3qdawfawl5b1rwah4achpfmr54yopm1vi719dys731rdt5vylckxu6qep5bhivjfgez3hrvtu0v7aj4pkmwtnggsm05r2kednobncnkq0dzuwep3u69l3ws8wqpvkx7',
                surname: '7gw0ofuw94gw9i2nbbu11hhr5wvwpnxl8u84prarak0zsb53d9mf2tl1alfg5aaap7a7h9ao6o4zycx1pvqnp376ak5v4wfc6zxrrfhe210chk8iw1nlx621vhrf4vrktq3qbeak0hjvntvobq9e6f6suq6c54nuvq8m7uknmgkevs66db8tfem3iak8j3ma7yo38p3oadfyszbikcioa16gutciwnmfrmgo3z6lumgce8pjvy5xt9ofn6gybpo',
                avatar: 'j7xbnz3w8xc5ho0mviup1lp3mywibou9carc0ywl9owhag1udj0cgaxziqrazzsobllnj2kz86e21cnu8kpysdu4wdl9g7wiqf58fikizxodqg1aoi7odpr9u75od9zrylpp5ajytkdih0wf3j0b2ctbh60r8a8fyx5bsbd5ii31xcfbwbspnvwiearezjs2k5lrcl2vjj0jdltja9gy5u1c2eiqo3qx3vhyqabuzf9vt2kvzalf2lhnn7a206k',
                mobile: 'bns86441k8o0hbrxdwxes0p469cjnr216u8tuspn2eh3dcaiggqmez1r7owi',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'm5x3tkzjo9gqdw290bjftb3m9092ymgie56ti6xkvst8botgsrohtza6qfpy4yci6nmibzcdivrox1picgzn4u2si737mbo9ghvdedvn3srdk8a4evcrrrm4',
                password: 'ad6zeu3gq15sx6vnhjx4oz8cxgsn2ghvn9lblxcuqq9u3zauyfoprqdiqp6qqe404jq1y9sx6idyh5877is51emlqm04g7l3ybvqxd7wn8ulj3pht85ecxfkomi1lrcw75ofphdmt1k9dohkn5hzy1cljlidnktt2fea43095h9suewfti0m08qqkrtprr6p2kdf014b2flvpsgl02rv4aepobl3vi8iyrurhy16uzqof7hm3ufw8ozyqrxfzvz',
                rememberToken: 'x2kptbl415n0cttq34m454kln3nko3f43c16zngx1awugqred1uw6ry89l33ob2jzopaz02f014rly0d0fl5zf9ozkhrg5bfmislxpnkr3n7mz9eq98pb4rbi5g69bnx53kpdegnk2f7zzrefx6pq2ka9xvkhd8vg5mkqdzjyad38k7l7uunvnxj1pqdpgnauinv7o8ruyovye4e1j9h35ewdyb2g5s8y22s8i6rixqz3xvjfamgoakee4s25eh',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserSurname is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: 'coml9uc6csk0exwu8x5z6niksg4nfd4rml82hozxukwbu1l70trulz5qvutix0kj6yablm8xsdvrb80f3ifldn8ulpwjjpzu2yc4oygsmqs378b598qbvhr5to77ml96cpif3kdxzjvm2nshvkhznotyvq6j5zebc0hu5oz8zk5iuwop8c9m1r9v5jcwddmmazumvp2ftiq5wgbpodxcsra4qbt8o7w99gcqoaqo76gpx60r24tnt3y99v1pcvi',
                surname: 'cv3sfr607pituvbsqjzdiuz64q9p5x1cz99u0q2j91q0pdluacz4ub8aum87kkqaxmbeie39615n8j3f0j2gun08rdcxlo0mr6bg8m6uzlncdg3qkgxatvu389rdcfl4jhowd8zpczoqsvdyey7l3vjc3c9myck7rz4a3xo4mhk1r1qlwsm19mnuqp5wfbpcxjnmnqynqfmavsmfzis38ytos0j4ri8gns1k3tnvhj4w1lb60uuzqtzrgubeb02g',
                avatar: '3rmw265bkypwwnvu5gssal5jifd9enbsoxnwwabcibjz1dl3baakdcd8kxccbo1n0mtqyds1nzmvodb1boipqq5nqx1nq8j5ksxt8ea30r543seqs9risj0z7wsr1ksiotp9yhhxx20rg97255lsxjhwqzszxlzt8s9gtru9q890erobh87oocf88exzx2epywjqn80b63mzmmmty4mcaxp153loh62u09by9kc2mg2yybcdrtp3b2pwieeh0tx',
                mobile: 'fblv43wqoshdbnr4mwm196nvg1yiw5woujha2o08htmscjxwg785hqxfge5z',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'ewhqsjrvbogou0l24og7gnm8xcxj22pnuyzw0zsx8e4nzu9oj8xlrme5u9cm8c1kgp65tkz2npgn84q2k0vqi9dlwo7mrunac8zuq881zpenxwi591un175c',
                password: 'ictol8eobni8u6fsvxdskrw21f7uq51mtxv4x6g65o7t6x8cu73at2pahuzt55karatczc312nldw5swy2jtj1twtmvlv6ht8kkec8pphnz2huo9xq7hlbi8jvw82t8539kjsp9qhfhev68jowwufdk4sm5zxae40gcuor1iunmpzbpenvo87aa7wvjrds8fxz31blfs6mdcekw2jy8n3c6rs2iv2wf8j2ylu767m8afd89h4knggi6b4k8r9ao',
                rememberToken: 'djky799rbaeb1igmg77l1wt7ek7q0r1hiicmycepu7t2aplpqj7v264yfr809k9qcjtmrboigectsf4rm5mprdbrtfbx0n1bxyffuw5gg10f3kofgmrysxgxhynzrlmzc0tsfnl0r4mxcvsi98keg4uf8k11ei7x67z5ac6u0761hzugxju1f3epiemkl2rw9tq3234ygehou43ldilq8k2qlifv6jdl1ewzjiehsw1eo140xdlqp0po6516mqb',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserSurname is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAvatar is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: 'zjbqbkvwj80e1zxah0nz5cq0rpmwvmfor7lj2kub5uvmni0bp59gvps9cbslkdzwr6efokckos9l06hu4u1mj1h7fweoxj3zasqh5n84zrmwvuj9llth02x2vq8826bdlh65zzpo2codyllzjxb7q7n3ez8osmz5f68peecfnjv6w2x7wkjjv1waguey5bipd7t6wisaaqp2mp5z339p6yquvovgdrr1v3yvubpm6oucm7g8vlorwhsqsgpthoi',
                surname: 'flj3itdmwbasxor0cvjeandgtf7sco8up343g6g8n18gij6ku2jbcxcnbevpnl58lcqrn1t79dg0s4hua0bhr29gsht7kzlg6px0r8jfa6t7dikm3mpbc95te22svc48dae3pigcd2hxl0pugahn5lgowao2zrfjz1kerws79b1trwodhoinklcos8wyd9u6rprrdbetxwn6wfabjl4fzw7fq2xf7o8zxlllvtedazcan9gbzc2t89emve196po',
                avatar: 'ucpmvj55s23zq9etlphbynovdedge4j8crm2xe1qd26io1bgjdz10saviel564a47ekpkfsgbu9vlz9x338icqlnatxs9g16q0om0hb21v64wp1go6rya5g21y2wspy92y9hdesgx6iwmjhrr1hbdg840daof4yfqekmq658js8xfxrk1s8sb5bf1pjl87omjjh1m3lboqw6442w2g1z81zrgiutveh69r62vbckd9f8bcv3bwjbmcyodvb2i928',
                mobile: 'evqbfopz486l6nazpwcogegkbv2uxdbmrmvsoh3692tjfp181k4ho4o92rtc',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'l7lkqx8ydbb3l3rhevjfgf85dmrdnjfdyea2r9bgdtyeun3s5u2ruyoj0bqymbnyr14s0thzxipuoe4niiaeorq0pxe7y0z40w9axbayynpl8z8olx2vkuza',
                password: '4eiqx5wh7r70n75csmdds1v71odf3i98uyv5oax6px42hybshi1xki7ly26afkn6kne661pkvrefsua663phuz99lw149vv655x78uln33yb4gfkanclhqv83wq1eq1ck1ky2bx7f9ulc00t50hntafjyfa1rto9130hb3go59vytako0yzig0ur40luja18nk4ssnltuvcy8yr5637l0tbt6jpb3rak8r9dd0vqmtxwd3j82imfhyjkfg1g46l',
                rememberToken: '763kpg1idjj2f7zsw902v520ngw60t0iqpp3g7imlj5yapgto3l85a6ix266mdt6vhhkieukmyly9e3dkljh51794mysbhn26rpyj4dbbjb8m3urmjn4crupvnbp1ho0z30hwsjdoaql0gtajxkzmffr15vb90oo5nwaw5ktye896slh9lksbx402862wdjo1b4n75nr1rzx3528t5xmx22avewabyitxzkv0bttz7ufolb1yuonvax38m5p559',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAvatar is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserMobile is too large, has a maximum length of 60`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: '5psiesalbcprpfh8y4uqs1z2dvd6em0yxbs4bhl3uxz5lk76j1i41pzxujxsbe57po5lqkdx23670dui18mgzw3vkstrfqkr5pywhr2mek0ugzprfxc7v3347dmvbhct0irwyu38xyz2mfw8ligsr7vf4u4dao798wxfab34qzooms51mr6dlbqr5w92zqsnjim37xmzg4m8pxr93f24m6zzyahiwfn6mo20qa5vy8yuqrvyqhbeu4flh449zpr',
                surname: '00d7pdt66mutfxv9uqt15ybdp3s5gsw4y47oosz846as9wmpsgwtbpuwh1hnd027i60xe87my1epsus8h7ptu5ztbjj33ik9aq4g5bzayhu58jyz34bv26t0c7luhsbeyztmrm7w4xmg2fbftj8ipov3nj0e2a5uoiqz6drsrvwyb5gas8n2viym4olt8xacgehr4oenukwtruwwzgefh5bbr0i8igqr6r9st6a1i7lsxsci3t6i72buhixd214',
                avatar: 'bnooi3wj474knz18mdyotm7x2odl63vfa78taafgeqyayonhgtvepusnguqwweg04gc0kn6s2dojr7c3nekeiu3uyyox79vitlsj50y85ach6at24r33tct68wjf5uzr69o3k8tjv0dcnaom7q1ytsmi3crw0b9qckztj2rcfucpcrtun2hos61qiv4h90lg2f4iuv5uqjho4qiolobjz8ig4pszfjrtyhb94vmcm55ot8ozct6e7l51vko8hiw',
                mobile: 'u25u5yi1zyabm7w3swrve6ap3ieenbr29ria69b564y3xi1bm0j40mnvs3w5p',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'il6khtosdr1xnk54kqx31d37pcpde06awes06i5iun3va6482l352b9j19g37vhxlbemiag9rtbp1zvj6mu3wgz7lyplqbhe35a834n9a8aavndf1va3fovr',
                password: 'mmzihhv861e22es1dt326mdhnqixycg3ua5a6osgp7ytvpu8idgn8c3yeu5loaj549t6y87j50vk2rf1mys63d0syr6cq55ihuisf40njqskvruo5q45bd6h5l2s0sahbpqoc2x95utn32uyrbcpymg0jrctdbifyh8fomgj8jpb1qfblgbm7sbc3ulkoszdlxkcg4hufjoui9ecq0qy3l7s7rz75ze4r024npws96a70qe2ofx54y8sbgja440',
                rememberToken: '7ivj9r70d7lqetsgxj2juagd4rrml1i5utbwjxj3vvw9ct0e2s88bp4r9ag9k6wq7rs6rm58i1ygb51dy8fop657ljho4u8527puhi4twxrud4kdeaewtca4mdyfmymtam1rzohzysqsbmamz0ep2a237eb36ljznlixe6axy1syvj19boocrwa3lnhjsw49abtjd2psc3p08zn3vu6zkai2lv5ya6usnu49jok888adkx2oguag49d65twa690',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserMobile is too large, has a maximum length of 60');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername is too large, has a maximum length of 120`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: 'yawetbxh6n9uix9pub5647tjkdu91409e26mu74l319xhhgsysir5vneco01pout4ebh4u5qb27er1aokxt8q306bzj8ciis8cznqhekwhrqoseyzsawfd2qvuibzxnirkp5pvzy4g8ki8qfbkycctd7brkg6korafu0p95abuwdp2i5dfcco4dmv9xx4uh62tnh71do3916xnt9al5qedukbprixeth2c4vyvwt55ggojie4diwc6im4koqm11',
                surname: '06x1ppxcwqb15i2cexh2b8iwewje2lzv4r72vwos6ba1nmf30ogsrfpm6n34n9r37q4e1qcv0cv0xltm6s4nhepawzy7e2gmdgdd9yzjke8gj7xna3118truaqnl0gcmykrmhje6e9hpj53wearkde0wy274nz0z2y1y4t4so70yl7bib86xrbys8r1z4y1hucyxrqcifjpl1n2pc86fbym82szdm539cuodmgrlyk550ii0ah6kp4w85ipkr3p',
                avatar: 'rryg31u7sx0cprraq2qrgb2yhld8t8o4zzhvwgpw7uwxgpfxlracpsju3w7mysvh4mngwz3xd8sbvz3saz81ora3w9wbyasd6xe12zan337fysm6dx899j9e917kcv4s7q32cuhaz9ur40o0b0qv1ebs9ner5ari29dxwaxvqlsr1o856uadf3wg2g5bjwjk974im21lb63egu8crtb51xv7wj59q1m3oe7dnfhr8nrz02zlucmd5xnh3h491mp',
                mobile: 'rrkjsufpsqf0xza1ytgihbb4j3t29q8vjjlz5gzqjyuhc7j780pw4n0emxjy',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'zjq583jx3o5gjcn6cjxk6cu9ht9xds0pmechka32nycozblb7mg778io383wz8t2grzyu1j88k6u9idm5279olyml9z1mllwf4ohmie2h7rbmbj9wu5v12bgn',
                password: '7ydeggi3z9xga6np11ho0vw7dba71f6lad54p4yh4u5ak82umb266xu33mqvpe2r4lx7893livvx0azdh3cm9y6pr0930s9e8femf390r84f04a88vwbh57pl5rlax0akxgdltt1jv9idyxg11dw3b5t74iuel1w1ilxbq2f5b66k5ipkidgcmoouj5mvl58d7exon34qolw2vji17f1gr4gdr6aj7m3z1dwkreal0r63jwfj216e0sen0pwxzs',
                rememberToken: '6khyuv7syowmrc4pbxr040pi455nzeu6d5vr72e7xy84idy4sr1ueprvqogb7w2q545h1zttisk0qwui4pabfju4m13xhzm1uuv1xlhgjvwogd773n5wfn8h22xyrevqjv39uwl56unzekf8gp2ix9n9reuled0o3e17uz4egknx4doo7lf91j5f0n82cxfrki1re845fdfg9bg1n5gix9u89v9zabylufq3asbbrqloqfa9qei5orsy7frm448',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername is too large, has a maximum length of 120');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: 'xfpco7ygim8c52w8quczqj5yufaryoog3g07icn5k3wkqaz8zdcuy6z5rkcv2exeakkje2qd95f8em7kg49p0qhlq87s9tkotsfj485fa5cceuhl1e7072uimxqe3zx9y0cub9dw322h54s38li4xq2zh7glonxrozxq6nh9cx5qe7cjplm7acpkj87z958n1jyd898nxtxdt2p6q41ts4yvdgz37iv9nwdwxei5146d2k5qfh2ep326si5s3t3',
                surname: '3uu3zcyywqd5c8uny8o733ckiv24k0rpr9eqpawfi6cga9lzxhw2xup0voiwup6830b6gey3c51iw9a4hov3vxehyx9x1tpi12lahzi87zo6rknor66kqqmwi11q8rwq6tf9r0ufdpah9fq0k2812xfcypeymyjy85frku1sa5c93trowxxyn9r3m9pjws6sb78t7bddllas0pyaz2c62hjjytf89hfra05xm8clrzslsxy1xmtw2pedwvxlu4g',
                avatar: 'wtp1dbf6g8a548x8pu4557yd3gbc9zfqouxswl4s0is9tj8hs8j3qye2xnqfc5iofuv9p5ruv5oc7qoyg26g600vn7ig0ibsx2ecebyctmt8h33q5aumddjmonkbre9ggp7g24lwqnmvbajgugw74692oyxxpfglgb4g6kb39x3bl6huikafrxk7yvut9zguvusujxt5sdekhelubs7muwz03xnun7d5e7aqnyv9y7x6zsiqwyvw50auq6ix0vt',
                mobile: 'e66obgz7i52ech6tujzekwn93tkjdcuki28ewhdhcmvgodhcvmtcz5ahb8p2',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'mdcmfk3004vxdo8fokmsf19dgkqu1gothm6ljvbf9r6qbzon8kr6ofy5wzwg1so3mltbursca3ejqe1z0wy6gtlngvshqzifyii2bcmm84na116oqn0tbbqf',
                password: 'dz4gp67z9d957d9ll6zei9uj6l09zbacslhemskvnytn9xvijklldh6gprh4fss4bopx52fm8md9d3mbr6khiw5wcwdhgpz1jp6ou042xjydrgdk4mvbmgrddg1twvx3vef6vu4b0wde6636qpqi2ul66lvunyvlxuuy122xumc9jxddtd8sebsswalfnufk1hceqs29hvvgmiy82etjqj5c7nyf0un4xo4sxumukufppmunas9d6b2msysli8lw',
                rememberToken: 'h5x78imn4bxxkdxj6kltdtmexa1j1jhe6theqs708extem2sw2b58xg9rzcm8crmmg7kaw8mbvfitpxhfq5smtkin8a2tr6pcbktmnivianqe5bfe847v0tjwi08k0spc3nqrx1burg24ur39eq75e8w6lslql17o6rw2aga4x3fd51840gqwer4i2fmgx1d4o6tzp5928yquzpe66nbnyoelyhn03pvzxjdsqrfpa88u659g1vofadxfioya29',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserRememberToken is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: '87ehygq65fllbkvv9wao4tjltki5jsxj3grbapia4nj125s7cju9uehm26kpe1g6uhlbow8ir2s441s02zlbzcv8zjv5popcxf2e443ox0ha687e4qo6q2uupl2kz1kgh7bphlmhmeviht95nlv1w5otc75w6hbp1qdumugpairei924a59lsd1dy3o2ipri2jwhlf8432y6sc3n03cc3giwkn26xpeagu8q1tdt8s1b34a6ku2mxucyq789mfb',
                surname: '8vnjpjcxpzpr8szjs2c1giq23767ctwnljgnuhmorv18rxxr1135iq08tnf24hvslxhf4vojt69bxxw0lwkr5pl78w23nfen2qfvniy3sumi94x0n8zsy2fj2ipeh2gojf61e5e9tm6igwyb8ce6uxr9m8v70odydxua8jsz89slit4yfs6nrljlxit9mte925o9dzm1fesjk7j8ahhg49mhx6nxxjh0nxlrpnehvtgp9mhad5ufhdpmp77fmi9',
                avatar: 'u3g46koen9pvw5r3wr6yik9zrlyspyzdulsdnxnoomznivbixltkt75urw45n5cwu8yo593xmzz36lj8tak6hilwuw0zazjytn3ogwg9eqcioibjk9vg9t876q67zwrmf0ur5krlqm0cbb2a4s4dl9iiheubc5490ms8cwh1epdacuqshciz42xti5r98fgb91oky49oq6hqgh6vd8e2698xs4l28ayceip762njpfr0u7zbm6d8kgjcih69wt0',
                mobile: 'hg3bk8olfqg4k59jw79142672y8ehwv5etp65skbj6zcbtgvi0hzvn348g1e',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'esa38jqoelebxx03ofsoyl34lwgmz5dstd2g3sn8ttej7lukuahaz63ketvuwywdwr7blt340eupry22rsjm8y0ykmjf0q81izzq8kdnmr0jkdj61aaikl0e',
                password: 'pdhie1rjvoyn5q2cwb2au9vyqeiyb88iej23bcmd5j4y9s0k564ka6oqy3stjyr37xg9qrrj3op4lc7sxw88ipcq48vbn1vjj6jmnmtc4afmsq07uv34mkeh8urgrpvfh1atxv0n3d9nslrjjlll07k46468fxc69b09efngg78zhdmritkelko4nm3od8asujoxqvbesg2gepig6zrruptahtw4vq9miao8avnrt38jwy4696p74e0g0o8g2b8',
                rememberToken: '89bhs6p0r9zaw5rrgclve50ifa7knttc3ba30dlz867nt9byxwaarhhceajfh7ow73mw095goek535vh6j5lzcjifib734trimc0ewsqxqwhk6sdljm3e9i7j2g7ix558a47wfqnca0sj8puxrpvypovkdi9p0sul3syemuz54a4giopesz6v7cw52ktit208d3sdsqw0ej4lgeqiarqwkbicuaoq5jupx3dc4y7ej6c8ojh9efd8elu9ku6vrzd',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserRememberToken is too large, has a maximum length of 255');
            });
    });


    test(`/REST:POST iam/user`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: '7ji9jx4ebw99h74u96oz2k98drctihhp2jz0nah5rvzsibctqf5ue8z1w8376gdjbgznlx9k6ylvi2e6cgrecshhldh4o82ils0ur2yjjq2c022kt2v6an20ux615ihzq9h3pkaql7btcj45zfx5jb1pqnre3hqpz0fco0wixcl479vu3bukwibu3hkzeedrm5n024c3ae1knx9vkg1wygzskeqvfqmv1m4qruzdfdq8zg9cc27eu4ssd7iu4na',
                surname: 'yndykj0m6xfxopoj5ci81sagmpj5xzbgfp8nqabq96zp7jbfh4kw1seld0fxvjpv26dkqp891vvpzaenaek7su9ukgdcdk6i0yaubv69i8pu2f8dcic4wfq4wj9um6mn4nh7twunpwv4362v8k78hxqoahilr7hlunt124jlfakthbz2vk7yf9qlrx163r49gau1q5l1a4e68lfbtrzijj93nwtewlwdj960brzrzxar65i2gwk5fym8hwkn2l7',
                avatar: '9zhydvk2vcya34baebskschzqvgtgyqvhmv0sk9nwkfsepnlcll34m53t0to1ldubdfi2sts0rwk4z7tx5f4l618jmskjgjvkbq6umz638hk6kq8auyn1vwbt4kfx2v7r23w9vdfc2mw5qu760330yuwcvxtm9b1yxnd76wi63h0uqrivvwjsrvive39cn1k5ejr379pht8pfb3ab0idb1nxxikqb5dkuemg4l529cydngjq3d09s3tcdpbw47y',
                mobile: 't0puwjvcx5n194k6imnixyufaw96fo3o5yohnp8ndl36oz2jdda4h5dbdvs8',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: '9b9jca7ev3wypweg32g5a0zjerkv5e2jw7jnjaojcp4saw7jw0lszxnhr3nakn5esgz3e6oq6711mt4izlbjhqmy3isdn1vpfdyaliy64r9f6djirqxi9yri',
                password: 'vv05f75k608e37mliyouce17345s61x2bq0fv4g4lsibfuantxm4135e51u6jmucutoimnrtubjnjo7ewjvngdzm8s08qzr4ha1engys95em7wez75bq1cwu0vk057jgoocq01o0q1fhcij3b85ibqi6gp2al93cpcwtgm2azqzaiza0n84i8h3z138ibimtp9f87zppee25c9r1wfudhzw0oq48mhqokjgokexjopiwf6ckb3ynslwa4uz7746',
                rememberToken: 'tdj39ss41vem7pjf91sw5whgoi5kqfm3k21oo7g4qchn4bx73ozkiavu318824zephi88s953tiim55r42kkxvvwsvmsnu1jj9xfva2us74etp68lria15geihg03w44hwpxjw91oe0buaujaxw95ehq0ebtrit1sxigqaazmc98bde99uiww9uyc7jke5rydi3m0196zzdvxf4cw7qs09xrz6zzywseqwa1y8htr1ltd54ioil37hwnm5y3m66',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET iam/users/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/users/paginate')
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

    test(`/REST:GET iam/user - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'c08a80b3-2a67-4325-b5ee-008eee4efaec'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/user`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5959611e-8d4a-4e3d-bbfb-02feaea53dd6'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user/b7a01380-d27d-4499-90c3-fb987f65d915')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user/5959611e-8d4a-4e3d-bbfb-02feaea53dd6')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5959611e-8d4a-4e3d-bbfb-02feaea53dd6'));
    });

    test(`/REST:GET iam/users`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/users')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/user - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dd76c7cb-a4c9-4646-82dd-61f4b831e373',
                accountId: '3a7a9b89-0038-4d5b-971b-924ec11e5516',
                name: 'c1ex6slhh60mgyybemc91rzhmdcj5liclkg9d06ymy795vjkdb1x25qu9aemfrkb1brwytj2qzu2rlfo4t2rpap4stqzlnxu1bk7xy2hjwcy1lj52saz44t7b2vjyrha4qxwz6txicdqykhcu6wm743jgy1n4loo3pdud18zhi1rc66c90bbxl54mwl6m3nij0qghrz8u3nperemz74s1xk7afonnciolorxxm6mauu4q5jopn6yyyfwydh6pfe',
                surname: '36j5luxj31qvp3tqvwoyvwwr4mi88bmrwisfq9to5qrrmfwi6oeuimq4a4g5pmsc37q1zar7fkchtelhh571jhbvcwwqogssynam3tlt8goui7hfcg7todoefdh46mtwjzna2p3ms29xeg069qn9fu4z8xv8lfy5kjs3h44ijlo8xtd25zu9ja4uf9xviw000q3el7xj1a6nvmuq2ewq895s9hpdawwzw2qnuspf1gk2lbv517j524vrwuu46s6',
                avatar: 'x9clkp4c4yccpabovqanot3xymeh834809g876x9lrtgbn6smcbgpebqxbqclwuketz5lwu2dih7ao7u5dn71uuaf6gq8bafy691nx697tzcooclfecdm9cndltkmu3i58o1vrjzo20mcajvcd3w6bnx7h7iu3e46mqox4csgph8jcpfv0hwj83wdlni756txw35v43bnxbaaju9ug7swc4eu9oxotkg4mrpvzirlry31dierz3xw1qh15e54i3',
                mobile: '6sp1ljf9uw9l1biu1zocpdwinj5ds0jrnuub5tks9om9ry2g7qnr2x0ncqdu',
                langId: '45ecb6b9-5bec-4ec4-93ad-33e3a5624de2',
                username: '1uaz0ozw4r669n9qbjrz2csawig9nsro9axjkvqs39gh02huitwbwgt6dst3x94hcb3fnrphdf5m48jqzi88swdfqhqzaow8gz4supucke8uj73lwnnm44fo',
                password: 'rxds3tm0tivq4x3sdfutodqnk8t6j84ds9vmp4exslawz6lliv0ch4b4or3ow89x9o3y4ammjykpinscw5ej2hj5g9t7o9ye6ckujfhtk36v1vntdvh4acc7x8z1xc51c7v3368ggh3vl7g6ns12suhaeao0xo8u1wosi42pfv2lvtnjw9ox63dkdza2mmim26fowf2de08szy6h23shr921m3pdobf8rcrhmiksve8ruau3m3bv6htbyin5bcv',
                rememberToken: 'c4sunmvwjmshvs84nt4mhee7mk5y1bv4yzr477wm28hd6qq675uz7o2vrzvpoj2vqsnv206opxsvf1y3iybqijoyz7btzmo6h4aumsefheyzmti6cxsw8u5v8o1yukq5ynvrz1bs39kubl7m08of35zztmwayr4c9nmd6xoladsryqyso3amviteu3obsbac15zimnzwdxy5763vd1ed5swjaiv7pcxzd8p8w0nsetc2gilmuhvwwflrdpdv4c7',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT iam/user`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                name: '8d0pu7sx1ao16sg660h9uaarwukf70zzvqpu0z0p6dbygxllh4auyzzgoenj45l3nwvzclcb8xzk4yfxhuyz581xo2yzwrxb55xg10mf4j78hglmkvytlay24zkqiqz1d72mbzwnqkiars2poswavhclmd52chexmu2ecfs4lcc2ylsfzh5dm5xvohdy3n253srvz3og67qjx6311erqugv2vz917tgdzzizpi91x972d14xeoh7feo0x0jp60x',
                surname: '3v0m5li7bqzmtnp1qwkyi43z1nu2nepynpocazt473nzym3ht0j8rus3a414la3u9fn2smn7ic3y76ic4lsezkra6td1r6tga8i5rkcffham5yb0d926i5eg870yquh568ts9s8trwtaqurofg96bum125wamaljl6okmsgulu3paplke5grr9jtyid5496n834lq5nusi5nhi2un1lu1h93nyg0japyj7p9a769vwir8b97thvzarab0ebv5s5',
                avatar: 'g74khi58rvzq0d2oqqfwnxyw82kt010cf18nua4kdvxp9rgwro5opc9naqsd86enjnn0nyc29oyrca5qrp3kmmc44r1x74cfjmrozqn3oa0hoqbfezg2op2nrhvxrwpe8bfqwl5fgy4jb9d2yaz0qj7hmnd6jz0pq1bdov8jfiyblcu7mh8j519lcplex0g0i7xjts6wiwevknkwlvqocz5z9cbh6htkl65ivr5ugz7i4bkhve8avi8nc8gla9f',
                mobile: '9efz3uqmatrinjf2dbgvia7fett68ihuxopqc14i6tauy9hfc40pktew9qi1',
                langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                username: 'x1wvshlm8qo4d9x4km5ydshwfopf2coqy6zpyxr5yk8sax3a9p7lfi58g2u5pa7egd5igajfk3bpk9ehc2ty9ah2gnxvnit7qdxu73rpbfpiztjnvigyzw11',
                password: '6tokymxcaz7wnuu6ici4618ylhyzsj095y923f8zvrkxyj1htvdxe0nvlbhlwj00wk5eezolgidbazbn6bib5rsg81hpqyzoo57p7c0r0qruerwudmt454obqcjw62afngscv05h5htw1ogkucst8fm852fqs5i2s103nnwm96out9sq3arbbz782v0zocp76dbccfvgcpjn6e4e21a094ckl1jlp09sbx2itqqrg28gt9mq6i1lwb89hvc644u',
                rememberToken: 'tzm1jiq87k9lvctjf4dk71xryz1w6i8tbvtiqvpk14ts9iw41lghbj0o1pd1we84o3ycuse3fw4ys2kdn7gsz3utfqztvgp7dbbfemv84gbakp1snfo6e432iohzbmo4gqt00eug4o9mu6k9z5z5c3gcr9rxtf48vvw72il48u4ljurit45407w554u2yn5rueme0qisxbp4h9zdcqvpenzipqlolpg4ralj2voc01dc4d5pxdyhwo1a1seodd5',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5959611e-8d4a-4e3d-bbfb-02feaea53dd6'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/2a8558c8-edef-4071-9dec-19852a471b56')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/5959611e-8d4a-4e3d-bbfb-02feaea53dd6')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL iamCreateUser - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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

    test(`/GraphQL iamCreateUser`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'e8315ca2-b910-4d97-b2ed-91e4eb190847',
                        accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                        name: 'epqczugtnhdjj153n8ty93lx6yx3fx8ltxxu6orq97qq4528v8ttdcra504isrlkk3tp78stpwp5dxic6hm0k9uyv9gkhdpb2nzv3spm8mq4wizpzgsnx2huotbu9iiei79lgwx63u10vu4g5fldi8ti4knrgnbnwgitjm5j5sa5gg7zxoff0znjq36594js52lh3655t3cs3hxw6e2w9q3rnzgdn5s2i81zfwjmoefc6wpjt3m5hlbdpr75tta',
                        surname: 'sj6sfbp5wvyfhe9xonnnbf3b51o0q5qfs5f29ig4f7ppm6yrvx5fmn1fjn1meavbr284j6lqjpvet98ccanhsonx7ghwwn05psc7nvdrp0b6xotrh9hxordj4tvgb1k6yri71nk3igc0v29arkf7vl05srj6mdguyq5t63hm7pg875sxq4jrkhdpan8pm089hnwwc9pvdh9z773yfisya59i12uo34p6t2paeji1nvbw7al8sp4r5vp2iyt01wu',
                        avatar: 'y3zz1pknuomlkdamtz1y0ohu0s95eu6hq8xjql3qa7952gsli83dhcrd0m9yjsv6cffkvxl4dquzsbymci8gd5admycyvas0intylihksxryfgkfjpt58l5o4cwo6lu58qu1rv2vyay4vm8ie5kkppy2j0nmpo74vf7ivro7e2jgok72249bt7qia3nhfqudsspa74k0w465gej8ddwumy268rgsmm3pwk9ukcqi1q6hhqbm9udrchag26zkdpp',
                        mobile: '9myyphdz2auipa3xmy3dlo1eypek1eqs8edlgg28u1pfoy6xccu3sulrktzy',
                        langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                        username: '6q6zoc2oph56pmx1xiwzmn5p1pr93a9sk9po52w2k1e108muapsrbwunukhxw1qxegwxed1hes2469r97wldb29x3245b9u14c310rp1vn7dvlj8qzmu4xkt',
                        password: 'bjsek9alkbn31k1ipywv54h4cb8skniqabv7b3rs9vrzda3oo8msrgorwzve1x4ub9zthbzqbt1imbseyronspqdlqnffwpbp64l28gcxan9mw9dk7jvuhte3picartvivwvk5ydi1bhufy6pwu0biwukq31la4xh443oiuza9f56edrj2u54rgiwzfa3vlfghy21ej51taez5fcvpj57flhca1f3kp981svlw67pr60c0ttybt07o7z2qhmtqy',
                        rememberToken: 'au7zk66wgcs1zomh4tfsjpve7rpsut71wvdb9q8sfr0uvytecgpfr8r8w3574qdx2e3k9k1kg8bgcfnqe83ex3ac73icer9d0fijq34160a1bg38n17r30iqhhbjvyfhkhf75nl5mr73brsmajhd86g05zub2n2zikf0qkzh0621zu5wi44g52d5w5mm97jlkmmai7pb5my5ja58pr3v8ucrueacr03x36fhlz61i1pgqt97sxcvhnvdjbeed4c',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', 'e8315ca2-b910-4d97-b2ed-91e4eb190847');
            });
    });

    test(`/GraphQL iamPaginateUsers`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateUsers (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateUsers.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindUser - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                            id: '948f7c6a-b108-4696-8919-c9ecf32e530f'
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

    test(`/GraphQL iamFindUser`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                            id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('5959611e-8d4a-4e3d-bbfb-02feaea53dd6');
            });
    });

    test(`/GraphQL iamFindUserById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3fae2e88-b256-4c6b-a51f-1bdbb96a899a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindUserById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('5959611e-8d4a-4e3d-bbfb-02feaea53dd6');
            });
    });

    test(`/GraphQL iamGetUsers`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetUsers (query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                for (const [index, value] of res.body.data.iamGetUsers.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateUser - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'c77ac7de-437b-4441-9b97-54c04aa2597c',
                        accountId: 'bfca3f05-5751-4c91-a271-8162d937eb95',
                        name: 'wfsflwc8o3c5hfq3088v3jolwkh4zzyauodfh00ptq48l39ky8z3oiq6mcwjmf06alp4wyyvq1f3y5xypo418m9tphseiuykj3qxziomti172xrztf0i5oubep05u4uylz1llmnqwybvqam82zgenrdvkp33nwysh12hit8pvolakj3kmy7edpjuqtisoulagilnwi5u18nj5kfx6mzfst842vpjvnhsq3skud6t5ufjbnh0bbxh1k2l7oeea7k',
                        surname: 'zkn753187a83s5vhjonj9g3j7xs7cm559boom262saakkx0hldbew2n4y4zpfnrkx9r2eisokr5fpc4ggpm5u1vkc5or8hb22pe3den7r4ih09xven1kedpzz0tk01wj5gocouhqjmc4vv9dz4lcwxnakv9ap3dkg4j7z74avfq9mrmwcb91akernqe1gmby9zzuz2akxdl8qb3ysll7ibry3gslvzzqlviwimjgcdo9zsoz812wgb5ywq8kxsb',
                        avatar: 'sto6rernnyn4pnl71mx025v47jzyjh2xa9c8rjkn2dbuez2v5us6g5liuneapyokobvvpgokq1aancy7r3a6yu6m0rsw9cxzjxjy9kub8vd40rsfymlrjemed71nm3nob6jkvwm4iyrfzx0fzqk83enkre50k20vo47lwohp0o7fte2c9zid2lv5teqmpn4jj0ucpvvnebm6fp1y1l5vfwwda14wryotf3py2vos3lgc76gfji7pc2lkbm4av9n',
                        mobile: 'xyg66axdvo8nsl4j6c2h3jy08xtazq2fbx8y4q0mhc0ysmz432duecg9i5ut',
                        langId: '90207ddd-b85d-4979-8e73-69ee6f8b5a39',
                        username: 'ekod0xpoxes8lalbv302oy3y4hlv2skqf3gtsbgc7q2ushh2hh1damaw2u0dkrb3q2dkt0dgoxgepcuosbvlhzsw3gmieqw8qdlprw9wfcr60bl4bj40pqm6',
                        password: '6feql15rxzdolcbrlu8ws0ubf7qsu81zg1pwxoiiof6z1hzu600p0srs07ex90qo0hf4ahyt81203wdsfjo8aun8uikpf89p95bigss1wyiltca79p05i6dd5sts5eeyxaxew86nhgpp6kf40rqxtpc2ucwewobt7nv28ppfu5vftzics6rp32ayqanliyuj008akv63f11r8hmwhau5oagqo3frs44fl1ilo4p3g4nb337he4xf8yzrnt0ambm',
                        rememberToken: 'em6x6lshdpv80d9qjciszdfm911nwmb9rir7tkgmauguhuxq17b8kq77jn57b2pku7lqm7pbpgmpdexe7o0pa647cxb5f56ky40i28ln4trj5jlae30lv60rh65ltc1r8l3see9pqseu4rr8egmdgf8avtqc82ge3q5f0o7ts7f6itx1m7pwu03pweajekyxxazrbvkb5f2tnqv3ltvtmyr9r20v4ziwwxcnp9tm5i9xi4l8vfv9z73lxbgsbn4',
                        data: { "foo" : "bar" },
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

    test(`/GraphQL iamUpdateUser`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6',
                        accountId: 'db9df128-7215-48c2-bbf2-0a2fba168559',
                        name: 'u0ioxu4w20mlp9esys157loal3f5wwrezr0i8gcjtf73ubrgx7fm6gw1apesz78di88zg5bgqcrrvkf2jqd7miqvehfloqna06e05z6tgqwkve8roivj0v8a3k5hxcpwtkxcnxpxz232kymz10capdsg5gkguv9bxzejhjikfrsh3jhzqbi8h2k2txps1uc5hq9o7qjgdatac9miihsmd3wrbsxhk9gnrka5ge7tr7ndhkzuon7r8ylgnxin0wn',
                        surname: 'pmd1tussuq0mxe5dpizjfsufvmzfbk2ewhl1xxrd5l3m442mas4xe1ph4kt2ddfjdlckbhyio8dunznsd831hmfzs7d7canp16vyyzrsuduk4z3ewamrrzde9kwb9753vko3cf0796v9i5o1b0tmpd5az2y0iigzj4m4iv2lpf64waxobi44vowhlkof9c2ge1xphddpepuuy7vcoxk4iwfus7ox0ye8j56lwz0q64fu8liibz88trctk6ph04e',
                        avatar: '19etgp1kdttld1ewc3s8ia8q1r6se79bcjgnacw8uwshn3d69dtriwlnd5ew8g62naw0c1fnm313vgj0zx5okldipye7xwu66y2uvz3hf19qeb6dkezr2pu0p7elorq1o19aow0dwzr4one4nsr95kpc7i5m79j8iqqzoym5aagjqt8gvmz104e30d6c3w3xvrpo003wtat1khsyys786l370m2jm9zb7yrr6dtu3ko1abb8r5se7uat7y8g1h3',
                        mobile: 'jxg2qx6fdrat35xrxzpvrx5uj672kv5ov4an2ag89ph5u1s4826rf1ujf5t0',
                        langId: '12908cc2-624e-471c-bbf8-f973f67969be',
                        username: 'my5bgbs9khqwggd7e4rnbvuxmf4onmendusizxf0hinkyb0230dcjvk4wzejyfft1ghbwmtl647etxqxkqw632idpql8jhuecc3erqrgx3xlu05xt7ekzvof',
                        password: '9a3zn5r35c354kdsmtsqdytyteuqejfczma83h5zmw8wjzpsyvgotyk2l3sxwfiegy5hory8rr31e20ale119xza7q5wrzswa5biur8c5cur71aknmv1pwvq276uxz5byy4vb9agifj4gsaobmnx5x6h4n8s3vbfg1r1v6syt7e3d1w7t9y6flu0xg318k5wssujjl62q80x57ll7lxkwmddl2ltefyxpyh15lnwzbxv4bugu0hn8td3bru6lub',
                        rememberToken: 'ykmj82j9q5mf4f4t3nhke9cheubmhid5wxe2sbvclaquatwxbmg6dgwdyr4gzn9dy1z2xclebypp2ys2b2ydnzoy8hjuqq55al91zfy6lsjgclcl5g0q6lfxez1mjszc9gtjht6dqvzbzrwhqr9zt5uoguye9dq9eunopicerlcguzzwucim5od3i9l6yoozmgjrcvniv9kxn45dn14sfyuie9ymvez456qrnzje647m0iew85x53vyqjism1bz',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('5959611e-8d4a-4e3d-bbfb-02feaea53dd6');
            });
    });

    test(`/GraphQL iamDeleteUserById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6b1a5658-c48a-4da2-82ee-0708bd7b7f4e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteUserById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5959611e-8d4a-4e3d-bbfb-02feaea53dd6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('5959611e-8d4a-4e3d-bbfb-02feaea53dd6');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});