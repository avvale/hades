import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITenantRepository } from '@hades/iam/tenant/domain/tenant.repository';
import { MockTenantRepository } from '@hades/iam/tenant/infrastructure/mock/mock-tenant.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('tenant', () =>
{
    let app: INestApplication;
    let repository: MockTenantRepository;

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
                    })
                ]
            })
            .overrideProvider(ITenantRepository)
            .useClass(MockTenantRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);

        await app.init();
    });

    test(`/REST:POST iam/tenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '1uf0d82liaq0tjaejxs8m5j92lyo4h476x7xr6ka4cyo4l2lv4nylk03che8kepq3zvilms33mxagwwff2ntdyvzd99qbfnf4kocajzancwkeynvd1x03ic6l2b15sa2omh0wdrjri2q3sp0l407wv7fe65ok2wtdb1j8pobcdcgd8b5px190j4oftc5gvl628ravc067n7vphgw172tdmfag5405x0q95m0me3ck4pzy3tsxokem7rnb08x2j3',
                code: 'pjzd2jsp3g4dviphczuxp8kbpv5a7ctbfz1aj5gr4aowxlze81',
                logo: 'ex9925dyir1rr2lmd8rem3n5b84hgjwlpjc4j72blq5kc6rp8redwrxovpkjx2beqfqik527z583f5xtto0ufr3u4k8poouhbz2cmj41p1gmlz8uc48l1zub9oaywzz2i9s357qtxa47xcjzqu052vfkioujjnlv1o6i8feg7x0y3xvpjx6xzc0wz98lb70g5qjmeolj6i9zlr02n0kj4crnuttj7nd35zvs0gheoybhj5lzc4l0azbkqvya56b',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                name: 'hz4cbcji8uhdiop31vzxe4gyj8hcdc2jjb0errna7sgzuzij4yimkri2jb0xi7yi0n7kkg6664q7w99gryhvvljr5323tzihfo70synae1fw5uetzmk2l1k73okn4kogif535sm8jr4wzpn93i234x08x5k0tjt16g15054oqbu57qd3wnpk8fc8o4kk2j8906zlw8i6ooe7qrpfgwujqnfdwr67opy06j4y5tezcfcx01c1jjgf5a99k84dlm8',
                code: 'gzcomqx3350svm2ify5b0bdm2uoimv65g7mchya2elwwe8g17q',
                logo: 'opewnie7qp396v3o53ffuu7ou724f7b997t0fo9ep2bmjz7istfmoglqev19kxmlmurojompasoutk2y9zu3kceskrmp9esy5qbqm8fc5sp3215qr526137eldcut68vqilpergfla2l78hmg3pa8m7kgghi24tzts8edw0ykvil5w6cyzsp4oubxsf1nm67mqwi653o38362sk2jui4m5a0g3i9lbvrs14z3j55elz1yzdb45lnta0qlcpw0cx',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0',
                name: null,
                code: 'gsp4h9bg8zxdhhux8of6w5ajb5wx44fiid3r2bvrr5hxcly5s5',
                logo: 'cwpazssrcxr91vxb4tmkb0vqlpkzbga2mjbwpf7kxo7h2hj3gesxala1ollsldz6kx9ie03q57is9ksktpju0cqgi088443n6ciax4cardtuebq94ign6o5eu19pk9s2ssj5pphvuo8ti90rghu84pemwmbdrunw0lp85pktrtwow7n39hsqrinan18r6d33fkl9te6m4xfvmr2o5rix9wzbb34uiw570lkiwnxfdvytv4ct5kij4log1z4wkxq',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0',
                
                code: 'xm3nqx71tmutyxtge6hgrbwch0qwwnqx0fife7746raladi9h4',
                logo: 'j7owgqppgpj4l0zrznn8lgdoj70pfntovnduz585yynh80xygegagg6oucymany5ff3rsdpd1slw9ldox81v5uvgpfagx8ng31pp3bhuuhtsqhj4s93pkn4ghjd3wc6nsd6cepo3qjimflyxy37tn365j6srfz456m605dittlqs6iqayag8vac1joclyizhiwuzmtftvb9ouk6xv8cx04bsqixmbxwe72eaneevb5zjhh0if9usoyly416exkp',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0',
                name: 'g08a88f5dp8cmw8ew288p5umud6jmcx7g4mmrejqu48am0ed9r6tdsz1cmzszfzfns0o84jtl9zotks4tj49uw9aqb8fd7ivrxmbj6qjkamndlrabea6x30tcgb3l33g3stfgtry5vwh2y9znzi98zbecsj5uysv7ul7e5gzh5718lo9uqw83my85m9e0s045x7vfp3wwcq2iebhssl0osv2rlnftap5e9wpio2icpwi6qt3a8p6g74wayebf90',
                code: null,
                logo: 'mtkg897ta0x0iz0svgomh25tb6amllc2pvixu4yj2h8dpukm87jqrxwfyey92np6p8nelqv5sh7cy6o8bjax9k45dspd1yfmyeoso4f8hddsu227wzbc3ck3thqypd4a5z3i8mnn6n2yv2nn0loqtd1g4znop5gw9xwxdbf4u0na35sy0hsyimqhs9jk0fn74p9vq3vni9hp2kkxy1fejq90fvjx54d0xq7im2psmxljwo49l75mmjjijywugem',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0',
                name: '35ctru2xohdpr1oywbtr8cbukpczu2r41ibmwup5an873cbdkb2sazerpxvnt3kw2rluabyakffbwxysr1qraee37yg5dtmub7r0hmascgznwnzqt9e2ehujqpf06x45wha4f7hdj2iavwv9g8zv57fpaqp1yg19uojo2snwx3dinwfaha0vl1z2fqwy7mz0nzlzy2c41n89nb1l0j9duopgdraobf9vcxqdwaoery43sae7xnnr29zry6d3e0y',
                
                logo: 'cyl3rk4n1az8xo20vgwmhi2cgckkeevbftu277noxmze5d8h8xyuf3tcr8uwhnoa5ojia2jcyb9yiadam4jkzjuvm46ahr6rzi0e48qwcskf4qws68fv0111mhq5pthonyiipstjk8zptms2x596qo66gjss127x8xemf8djclotnl5pm77aeh2ushpu2lqxhg951qgq2ts87lp7yzwwb80hyxrowedwhl1yu5iw0k6t6mfibbvpl8v2itnre5o',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0',
                name: 'et3m2pi62xv3xf8ac555pxyw0s49fvdf1ncjr0r9przhi128d4wpo32irri544jnty40du23or5si32t2iuk63127id3a7zoa7g1ld4jqnry08tvo65sj1khx6qopy289smk18t7ldjq1c448lxz5rmkb2blr41ilaqv657l8jbhw9vqoedp2fdkh51w8z396cwr7id2tqnsu30chm3e2mg1wny9tamr8nyd423rnp6ooa037rvak0tcwec4zuq',
                code: 'u4w9fwoph41l3h7zemzpj3hf2m5unf20gfxy8fes2rbmd7hoql',
                logo: '99qg3kmhy4wboc9iszbihv5o4hdm2w1nn2rwr3gfv4056uvuizkfhx5aukt0v6plic2g674ou0ug3im03ck437f2uva546pdiw3t4hkbldfvwjnv5dgt0jlnhspgfs7dac85bkront7ffngs3udnrcny6hwm750d641ktzc6kz7a17ilxpcmzkz1xsqitox2caz8ulpl6u6f7vqxqqwe7i7ne1q0hsyv4dtq3gxy8bykrokidfxsobu8q5yeu7s',
                isActive: null,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0',
                name: 'tl9esuq1dyoivcpp5fhr1li1r56lf41az4qm1xxaqpsomqzsjn3j0cuqafsjnj2643wnghs6iatr9g6sfu32dta975e63av6ouiom5hev0x4u8b0em2c613h56fyq8sua941supq5tp4faxw3mlnw7x4jpf3blunpzn9mnerzznv1azd4iu9bld81ddy04b4z5e7llafwjf3usv68jv95v951epefj5dkgycb07id84xb4exo8z5ryj9u34qhtl',
                code: 'v3gpzwjff07z5yqucq83xqafyet8xbmy8sa34kdsthv5solw3l',
                logo: 'b345ccfwd8zcr3j6a58g99odg2athtotjrgncmjz15ygyhipqki00cf6itm9so5nzf82u71eu3n7i8gi6cqd5b29dwjrexwmv4vpdksy5xxlfdhwo7i49ry7pbnmpil62ut90o4ygh2yrbmm91b0k644w77r21udqce1mvdnvj1g1icgi05z116i4nso152nrnlxkfetu3ot2vvl2bxb953j50osyk5hhdowivguals2eskgbjnhdsaokv3udy5',
                
                data: { "foo" : "bar" },
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
            .send({
                id: 'amxocbmfb4jkd7f8i4yka3ncsvq7uc5wjc0ja',
                name: 'n0a1k29i54wsv7otv2q5cwrr5dei0gmwnjn97xzilgb1cfxlcx6pkgw7o5suudukwhs8ptq1ld9s7ewlibiz3nw7emzwbwljffwlh71z41m5wgj0t80n61uh9gd183dmy2t0v682fdmuqvcd24rup312w9phs2uupuwovc4zlzesgrqh2u5b8l11zkvyqmtvi2bwmp8bkph59k44wyjflujirr3i2as2ukj17uwfmbb044o4np6spwcgqrevbaa',
                code: 'qatryg12tikrs7sp1dcy5ihbuz59dtko9gpr6yos9hrlzyjn8p',
                logo: 'd9ujw7mjneh9w1mjhz5maux9vsp7bcpkv6tgx279sv140yn1msje1adi4d7moj7ql7p01lpn9rmpbtaiw3dchjgpvhmmu2rsa1zgz09vkug9tc28o4ejy7gur5mcrh1z7cnrn67nepda7vtfhyzp3kuhnplqb2xk256xipjqjzp6kd2tld1263qlnw95i5qvcghjmlj2h94fplmxz9m1i5d2csrbskvygozx15x1i123vvjs0nph0vq6zqn3nwz',
                isActive: true,
                data: { "foo" : "bar" },
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
            .send({
                id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0',
                name: 'agbjvieapqtyn14zylr102v0i13q2akjrjorqwfdoy2b9wrqd7tyu5rznqifh6rtkjkf2hfefhzby6v41t3hl94fz5gfum5fxd6mn5zyovydjsqxp78ltmha6px6af4z5ezczz5bxw481qoish0h7zcsojiam9b3yz9zwpv9a469hsjfmx08j2ep4ekpvh3rq4xc9zw9ca7vdth2g605okenslai7oxg97xpln9jy7du7qidnovkz1y7626nn4o7',
                code: 'ou2tuch3mmbuaq2yurrw9sbstp7m4tghctoznq3f2amvcjygyl',
                logo: '66r8g5nqkd89qj2txiual1del26mkp3wcabumprir1zyvrvz52n5cs987li3dvm6bpli1xfnqkrorxgbfsy6tyxm4lyfcz99815x6xo4gap3s1jxg9xcuxoqigig7e780hdn6g4uch07pmj97ygvclpg8bbcph0jes04mi9msvgk5uu4v2t2i8wg4udg022f3b3bsm6lboohc1jxyhxkxeciefmomeo9yfe3excj2hf9ffydo4ldsqlw8f6rksg',
                isActive: false,
                data: { "foo" : "bar" },
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
            .send({
                id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0',
                name: '1mkd1w1voyqek8y8gdhy3xffu14nvwv7tcz24fndkhno0egmctmi3otedthdvemctqgndot82r4szd7ep2vn4xv0b3npzngrexqch38sr7ce84qt1521y09y89wf7pp2lwbweltl0qe87pw0xk4v5h4co7g4bfzd53scuibdszw77v3vkhgv2mrujjz1a2tzywu0gx47ugsiwpli77rbnibeiesi7gnli7xu1qlptstupveebbsmr2uq24oy8n0',
                code: 'q75dkenl06beoukbyqs4nakm6u4c5526pr338f8c7lm6m7rlemm',
                logo: '5z12a2nbo01ex7klhhoe5sb449md9erl6c2j7ibbyxhhvdv3qt2ae14o7drimyzlgzcmp89v9fagjgnqflojkkz7ehh1dlqvmlnbz0l0g8k1eebqsxhoyzs8t0xned39yurm4ughamr1x38a0szva2a1gbylgliya01trkmnwse0dilmg8btmtkp5t0t5acy56hhalfxt7bxirecfnqto0cf37ul8n74vrve0ahfw6a1moh7j1vrqb8p1o06ap1',
                isActive: false,
                data: { "foo" : "bar" },
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
            .send({
                id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0',
                name: '8b3i3mlwn4mdg9oxrsv2y5w999ptp53223qbq8uh0jjk92nqbnfcaae815wl8jrjpncjbn1zqifkmxfag444mp6w6br3b59hprvqj8qtzz7cfs5789bvkgtq3z5txsjzgd5w3y58pvhne3fkbssizqr4ur7i5isur64x79ricaaok4dogjypoopcfypczdveaok2ifyw3kl6rn452g2n3o778kxz5gy1y9ktz8tdi1wmabovrq69h9g5ijpu7bg',
                code: 'xue8nf1kcrha4qhla5zehr1yqnpiyemmvb95al4gkfrxugpt5u',
                logo: 'zqxfyepudf47dm7tvh4bh85x7obrqxckrhp4g711nuzitmcfoegq67tr45iehrfv9wkvjiejav9vnj01phq9k7tpbi3sh232wj4atk49s9i2kpaufqz346yc7zh0ft84hgqvr6ogfkb75967hg2h03e6mavg3289g7bw4t4gwgj3jtvc3aezxywg8sgrool7kzppl1st541vjx60v6rueaczktsg6unxsozl7acgh09x8eidbxnw8gcr2ei57h69',
                isActive: false,
                data: { "foo" : "bar" },
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
            .send({
                id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0',
                name: 'jp7ssu1h6xhj7f5kstodqje0pdgdpieb35voiuo71ox31ki48e5ys2m451sqpcva5euksmwrkvrg2pz88aez1f738i90hrnyr6uf0yosoqicxgvjhwx6sxgtel3mrfp8c2wbks2s2eglx4k3rsttorkw8jd0y6xeqffio4yokunpmgsau3iuttm4j2n8fkxw0u9smu1i88m7nuoivt6qpjo14v00bp9cybfe9bnll8g0afsi2blnll56xj4n6tv',
                code: '1o9s77p5yqdxlbbxzjeeincts35o2jzqmpxejkoutqizs35re5',
                logo: 'jdiyrcer1i0lgm7zx8id2p9letvn5wj7kfzg0dv4nii03h1qd8aplmhw774w599l9j28ef1qtwbajr7hij8nw41beayl2ycuib3uwptjkf2hnsshdqxm5x3cs5akc1ti0de71xllcbf56r3zt03tchive7t6f4d7sr0uavwnxpbni688a9c91kwnd9ursdjlqoj0xu3dy15sewek5mtccvp6payhvamv5biatubk8n9iefvkcz3ymf7cxuuxuxm',
                isActive: 'true',
                data: { "foo" : "bar" },
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
            .send({
                id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0',
                name: 'kl615n62bgjyqm3hheepv8tly0zdlgvdg011xwt09p5070pgi82jkxdmyeiz5ywqzgrbfgnh0r2defp9jlzr3mkwumh2vozldnwkffu4dzfzb4g7ejnjdnzosk4zi6sp70bw2k5uk9qx23ropl5sduksidb4jtgtxbc52r6r58xzmlaek8ag0vfbsq08r1mkanjxsqf0yiutd9howuys67360tlntbdhx7uqhgvwmhybm64o9orb182mt005oec',
                code: '5o4n4g91mxjegkapaciz22dijms40b7zcne40y6b509ao3vkz8',
                logo: 'lk9hhd8a9b4h0999uv1o1bld6wutamotnadvix2psoip6oe5uab6ksxkilvcn4yj2x2juktg0ovzixcfu5xn0bmh1c9kni64bhfqkmwrnucppgy51oll8wpvtw5ncogpi0iscwktiq2jj8jxgnk5ekj05fsimo26v4sc9z8h4f02g5ee7qc1phpxi1uq4dud5adq2tq7czxt7gdm3s18asxgj0ylr30tjdozeda52218vo8nfsj1k7hkft23b1s',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/tenants/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenants/paginate')
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

    test(`/REST:GET iam/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '25f853bf-2a85-4731-b3ae-4e4d54893d71'
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
            .send({
                query: 
                {
                    where: 
                    {
                        id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5b123e98-2322-4026-a59d-fdc36bf7a8f0'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/b5396cf7-d152-46fb-b50a-587b514ebc06')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/5b123e98-2322-4026-a59d-fdc36bf7a8f0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5b123e98-2322-4026-a59d-fdc36bf7a8f0'));
    });

    test(`/REST:GET iam/tenants`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenants')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: '37ac9838-177f-4511-b748-4de9b1e6ab45',
                name: '01sz880d8i1ibbvp7yujsbarhs4gvbv44ir7s4wez04srzebf6je2zvlws4lazr2x0b29jgro8ainabhig8igtk79b2tx6uz62bx3mdv1osl84wf9dma8brzwq5yapswa94kp08jslcve75lqk2rycws6onpa0u1cku915gf2pc7uef7fz13bc0kb6xc4dvw7owfqaozuzepuofgwxr0v2pe9k3a60wusou25t6seez3aznly719xhnimbkqto6',
                code: '3congopix19zfutiq6rqsmh0kly8nesdnwwyaiiomceselsjoi',
                logo: 'k2m3t1zixhueawkh5cf93ixhj0pzisqs0742rmko5bcpvt417p1rwu8piz1fgxvj21iyzrjm6a5z5imau2cy2hsnokzn3y0srhrq4khhvc8pr3anzhpnuoaei1m0l0vs72cdithssp0pl7c2al4nlzkhnsy8nkc7lwzkb5psjiuybwgqkmf29qvujvy89id28pnmb5c24kgzg2sm9fqa779zl82w8idwr9q1vr3bjimrb0s5s00a7vnpp8r7tb6',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0',
                name: 'eer58djfz4bld7b3cyrll6qk43im3rukpkj4asb4dtz33x2shotdba728eojqdw0a7z3bs9dyp3lf4hxbsl89vzm4gcneocpn0a605mzpg2cvtj5my3fmoyjevfbrk2haaibqto3f3vcfj4r53dgtr0no1954stcpf5ng7fnabs2fice818hxx4r2ntrylmnl54nbo5o140xhcaovnsbtll0wj9pihqrb2usqd8pr9v38rpdiukkrqpdm95gox0',
                code: 'msj51za0ttp7z3bilcmwlbf9qqkutkmdhauat99y3hj0s59zfk',
                logo: '4mglwfo0v5kd59rldu4tvurscb4j6h5050pug7qqcct7k0u356i1bmtecju1dvpefr1r8q20hfoln308injcd1pwq9odc6v66i9fnbaz35posmwd3nwwi8a3rjcymlxrhxasbcw5r6wttf7iqtv33oylri6a97dmfttyn5n85hyjmgi45uacliohit92e140kq1couvul4voqgo3wug1gvp0mfrboitti0wxv6vsebvg3liazqlywp3fy7yiry6',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5b123e98-2322-4026-a59d-fdc36bf7a8f0'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/30d83856-ee06-498b-b881-3e61d51bcce3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/5b123e98-2322-4026-a59d-fdc36bf7a8f0')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateTenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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

    test(`/GraphQL iamCreateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28422039-a06b-44fb-80a7-8ef824fea12e',
                        name: '6ym3j6d32a9lxjj3n3rmuyp7954kn2hwhhpkwvzaemjb0ajhlrvjclx7cqx1hz6kd9pgffe88ij5xqylvzdrh04bfvp3q6xsjvszj6oatyv5psh6dxro9ze029wzjctf984dz88s7rlybgh8fs4g3lnpo0gqhbagwb49s0r4lqubkssfy8pq6crdwdrak67suf50izh6qpludptbegpwl7fqbrzoa56u0fmizhlu7zjm6jj9mlg6tioqq1nddhg',
                        code: 'zl0gk2gfvc3nccw1ck9926610r4at5rlqlkpvjn4h3fcxtyvjo',
                        logo: 'gk45mp40s2238iwkokb11w5354fp0em2k6m3lb75pbpwsxdc8rrdtl4vhzbpfnkhpaaq4zsd3f253gf3bxz5hcv83vhvlbvf6mncefn02rc6p9f307upnp4nz39p30tx3f4mq1jwdsod16q0igaogsi44nbj3iopiifhg1b9og44mx8u2e7p8eiqdt8evfcr85d4qn7zh2vj7cwkbuyg3wyx6v2ydh7b12d09tanavnwa9ibcrh59sdjn5ohz9o',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', '28422039-a06b-44fb-80a7-8ef824fea12e');
            });
    });

    test(`/GraphQL iamPaginateTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            id: '610a9505-b6fc-4348-af2b-6f140050b60c'
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
                            id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('5b123e98-2322-4026-a59d-fdc36bf7a8f0');
            });
    });

    test(`/GraphQL iamFindTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '2b732808-1511-4058-8b88-9d5148bef9e1'
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
                    id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('5b123e98-2322-4026-a59d-fdc36bf7a8f0');
            });
    });

    test(`/GraphQL iamGetTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        
                        id: '199a460e-bc5f-47f8-bb21-1c9bb231b72f',
                        name: 'j6sueamm5tp800xaxaaetkfk9sua05lbvscsjoh873jikm5o8otxdqrdz3qs32lsgasecgctx3zs4kvpp6y99hijpzo3pevot85mhp8hcstqmnztez4xzxbu5i3gwy27daxc21b8l9lexod31acfk6ya70x7gfubn9n5uxmiqlyntalai5kp9vxpho76amodut2ye4bd52y8m48i9a332cb0qhen77qmu1nntwkuzdhtexexxguiskjoce69n4a',
                        code: 'tg6b6oov4sj60b4j3yj7uessvdjpzxza1u4kwt9ml5ht5k5aff',
                        logo: 'a6w2vvgwlbgnqjol0yosm7wj776iw6aqcjqh9s0qi53jhpghuttwadd6lzte246feul8axwgmui53nrdbg12ne9lo8orzif7ohce5uzjayeeysu0yvdskwmotpbctyp8o9gk60c7imi6nx7e3e4hsp4fln6g46zhwe7iymwd1bnpoxm7lr77smvxuybsnycw478debg9jiqxbdu4onec07d7g86f6tjmnwrk8h4qv65sbl0si564pzc654uh6cs',
                        isActive: false,
                        data: { "foo" : "bar" },
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
                        
                        id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0',
                        name: '8y21uf6l0zsg5dh1yl0e3yrhd4onhceia09yr2g3lqf3oge6gxjlv7i8l7ota26prz1vr3qh2cie37c2thoqlg7atvu3zie90wemlqxyz4wbmtcgaz30s8l873vr0dv81e507r0ofglcqxgu5xeiqxm2rj2g5e13rjlpwvluk105rr0pvpvtxh9udv5gk5f501xzg4ks7aplfosi5ixrf37n0e1heudm884hy370qf6m77e2txmquo61a918ury',
                        code: 'dxsyek1e1wdngad8o0cv9tc09eo43udikpjm9erbp79a76r7c3',
                        logo: 'k1ustvejiv6s3rak76ro5b52pfhtyk0fv8n8b74dq5czj77cdjeuat3p87tjxtkhi7rorzpj7d3bppvd1s342k13grseluk1nyov8djxndccgi7lwm3pph5rxaazr2msw4v99ors1i93zg27r27c1jfcwkbmhqrjdluq2aaxsvrev6bheyuue9je4fiusmmuniiljlr4i6240k7m8mmvuakz8zzhjtr7xakt72icesbyk3006wdkwmru52vyrbl',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('5b123e98-2322-4026-a59d-fdc36bf7a8f0');
            });
    });

    test(`/GraphQL iamDeleteTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: 'c059a6c1-ba27-4625-aaa5-1b29429be1e2'
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
                    id: '5b123e98-2322-4026-a59d-fdc36bf7a8f0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('5b123e98-2322-4026-a59d-fdc36bf7a8f0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});