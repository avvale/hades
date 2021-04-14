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
                name: '5me381kt8i2lwvey218lgjhfqxucxlkjnq1h84ettsxw5dgp4o0aeo8lmm15nl1tx0re05zdpzt42c2g3a9dzpaed4tmnloeb7j42qcwqhr1ipo46hitow7b5qkvfn94q5fwk7d56ka83pda3bndtwhy3s02r3f8vmbz9tcgtw34dkvagu9awjp2vszaffee5oshm6kw1kqvptrtuw3mvvmuq5cb0p7jdntsy80w8vbggex6e5dl9sooo54qsnb',
                code: 'xcjestdbgp4a7lecvf90m9m27upjrwwgto57055pitxwbbu1dg',
                logo: 'k9yhhzjgho8k0r5a1ajmjo2ceciwl4v5cu1aw5vxk3uxtv6yilbkcrf8titqc3xefgane7q9i5vgm5gp3pmkzv9l4qgxteui7ek2bjtkzdxfqv1hp13ojzx54n98u8nxy99jpgz9gv438tos4soyzrl3stl2vzwwi9n2wrt10843iv4e4cspr1t5a4gn46v2nydacpsntfyt2tuij9jwer8o7hywg4rdi17fjd3c4oh2dwqioh8rnelhiteuaui',
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
                
                name: 'sb3qw8pigru9ukmn4fmg7v0ap3qjse4xrtptqkwnntjkg3c04ke78kiro1jpd1wnteqfma51fvbz1ul44bkxkq38zgdmplxxzq33xdgekal1zrwe7asqj5w16potoc0u9bzcv6i44xbsw1pb783q7mkmcebthnd90hl24x5e42ss4yb9f7uyafgfhino5ms4sz0rdmzby25u5pi5j82dqtaofud61qxu2pq1tej1dnixrf9pah0xjeftpaikgps',
                code: 'r6i4g777mxuo81ce5eojt8ptfhrpffb5157a3usbw242icqoeo',
                logo: 'dbiqauv48gf3397m3ckod9gxvmev7u7jldvrn0hz8v0azshpmzs3v1albc8bo5wzqmure1vxq4m83dvp0qmilwsg92cybp6tbih77mg2sqwlve9ccathi2ss3cvl684iesg9vnqycd9imb7o2mqhd2fpaqxhap295bos4kq61y393pcbuj4nia7wzrm0svy7udzepzm0jxqopyuswsi5wkafey5ii5ido73yd6pa5ktvt3rbyz6qwt0bk6iukb5',
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
                id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355',
                name: null,
                code: '0v7kguuvsvxcrouvjglsbi12ysrde84qhcpv8cufsqvluiv6oo',
                logo: 'dv832yndt7b5ty7isflntrjfyroqrglw82d3ni2vsefme9zklw8q50nctevcv2qjdt3u325y6y4fwrogejv8mla0vthhzrd4yn49c91pu2klkvvo463c8kaef52sbfnmwg5udvtle9pyiu2fr2l9cvkrp24lk3itkymcclpnsqojzlunmvv24a5lq488x71wcn1e3djjckcs407z7ixp01nla7byae0mif0rduq9yb21ia4wnbims8bcbpkiihv',
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
                id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355',
                
                code: 'zpjjrb1jlfsz9z0vnjg1qce4iia9euaca9lykogz2m10p3mxcn',
                logo: 'g8d9qgrkmwu2x17pxa8bwqk920p0v5y8lmbctzyoy6672ll33z2xt32a030fbqbl4r7z7leux30flfp96m1x6vc0wnfyib0xiuhidwhrfh8hlylqyx5xj0p7t7e0h9py63gqbdkbww9nwigyspzb82dyhodppxjs3ymq6k24pe0853qh22yeetdo8d0tn8yljke0z4wmtsqosse7ppc03qe9d9p2zf6tqm1rb2e2bfr29za4c2z6nkwin7aya8m',
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
                id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355',
                name: '28ed1d4k3t4fs4zyd5se6txjuls7bupd4506h1izz919cuh5grrv8jieu345upggb4pg7bmhbc2bzmq035nj4immkvgki2zdfh48sjxk2imok9utzksd5yh9870fa1db8s9c4jxcfyuaykbs64ui8g59f1bghcbtmryibf92xe6ud6qybmkjd1on8i0h00zdmofne4lra0ehkmtmadgz655iz7tv15dpb4zftkx8yfr8u4fwnpynck8hevavmli',
                code: null,
                logo: '2ezmsngjr96br0u9v7woqb1ckxiuf57eu5pkfgd6yd2m7b1ichpgpsi02e6r0aijsy7qrk4uezq5oby2jgmonx29n388s0tl3inyib49w24wd1xfa3wxnjmxijf7enyjfxvzrj6u82qiw0otr441qqeq61h0sxlmofcnkfn7ye1bfl2mn6bmb1unnd34we0qzxj0xtvv1dbwttzbiw0yh823m8ahoxbjj94nsth6ckjnnw43f4zfilfajfbgj2d',
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
                id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355',
                name: 'thffzj3jjwsom32elc1616qr9i7zhjovp4mqs6sdamahic8ofaxnaq2vjy7v5qn9mcc07qyy5m9l13t78q5hd6wklxi24593kqv2et5nan2hyse5fuh60er868gorehyt0tzcal6k2og01ealdp1gdhwpt1ff15xy8jnyiqzb2ch2e7gqadmy666hkwp459nyqir8mu4bm96f3ok32e02jb5503qtaftn93h3nqph3gx0zjtj0itvt4t4xkvig9',
                
                logo: 'gplv8kwgpuk62g5b1k761ky9yjkfzqi2sojt1lfuwxq767h8juodwkrovapm7vq9of48yg12ndzn9saueh04ok8vb5a4ys32nbc2i7r3xr4vexm5bj9zxo3jzzsub1t4ugf6o23jonff6zbmb2f9maay9yvggggh3wefwy7rgm25tucg305y99oj2tljc7uzck506jowowdk2w71802fuan8vcfuld6y6sw9i4ru5k4zbz85awavo1eebj8imwk',
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
                id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355',
                name: 'rxupzwddywfci3jvn5mp0yedu9gnujogl79b4zz69jn6fy9668542skpc70rbbh92i84a3gq7lbh3muawcu6hmiz7x6v4ldfepi0hx05bfawgnjmssk1i07yj1guwm8111pj3nimnt3v7mc9xxaki9uko5ijgfewkveqo23yd4eakx6da6lfbl28bxtjszhgqfc6m7i4ga3cyicds1jw6xay5okikdfhx87su96co2d56muh192jq6y2oz1ikb3',
                code: '5s3v8tqytsne3wluvux8k5wa6m0n9gecvm5u3rwwr2zvc1una9',
                logo: 'twzuiaqr7xx27t1ub4mmsv76q51sasn8aekntjvqrnjjs3pd7nnw744toi2g2qgvowsy5p95ogl266it02v0mk26khf06ov5f3wgdkau6g26exmoda5fyhhrtasqd4ugg0dp020j6221q4odz5sb7ga63n6bwbxau2qg78ymsy9ri5ygb2m9qngjpedr7d5jd0gg2nr4m9te0qgpcuw6yu69ua5f4zxwf8ky7ffwfnfaymkre5q1iutfpxubk3d',
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
                id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355',
                name: 'bbo21ncr7vuw27rfgwxrpqsuowcad6czvzwmt22xwai7ykdiw858a4kyq3f91oaku3o5mbk2tcwixkgnunm5dy7xcbtdn4eocvxg9wheow3fqod2t38vm0g862ljqdc7zncuhpaymm7i0ya6qmzo9u83ayhwfmqvdghathz3ddedefak2rsze3v4m6w0azu5k4hx3p6pgdr990x6dmo4mu7hfwbe7bnxo60gywl4x1cryxkcxaq1a0ago3d2okr',
                code: 'd382qo3v2mxa02faoh7odo90gzd9dpgveegv68quq7orydiozh',
                logo: 'uoqiqp97ymnewal693xszxn2k4zepw6kqvg39k8yzrg26pqg8fninw7wlymlg0izzpamjc2uaonlmgu2ppoxk6nj9cycsc3nxtsampbps5a7575sh9p213kwc2gkgp1v8ryh4ws70obwpivego0q4lmz8ovxoii1ftm8q3woaiib4pez5emeqei8ml6mwcbfxizj5161phblovpvaut2xla4ee50ml37hbuxo47fqi7jimsj01vrklselwalwb8',
                
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
                id: 'y48nm3svoxgyrbld5utsc97262atyzkz2jzxz',
                name: '995h08ogmddyxeeqimu3gl0wcf7jfpoh4fb37u95nyqzimjm5ib587upwj013bc20flu6qnj4p0lwswwlt0d7q2pkelg7ltn13rwnstxacy2gezkrg0dq60hqjsv9rym30v9ctplkrvojxqo3qpk5nt5k8euc87zg7o1618blhwqu0thtrd0sc4plrh2yjss5cd4pcmjq6crrhkzyw9thl76i7ui4umxw2idickqtar9q2xgan5sz0nwkah0lur',
                code: 'qhi0qni4dw14b4v9bo9gylw1jl9rvl9zso51vmsuatgkypzs6c',
                logo: 'dcgvy3kdjwff646rkll82so6wpb0izl2fw7c2g3yc6sp8hxmxsp1yx75ikn5co953kj5l12nd9p6p8njjcdemv4hr5wgvf32df2lswxa92r9j3f1xqp4w5qjl8rzlwl65b8zbxxui1ytyn86iqc10xungulpo9d9chvr56to8ru6zd9yd9w99giugwbiecvlaks9ff5vka5nthg6vigbhqf1ka8l7hfsxkwgrs703vcrr6yexxvygv90t8ua1xs',
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
                id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355',
                name: 'wq1t9lisr3fpvr3dip36u83e08nhd1c7tet5pex5q8xxex3y04wafrzx7mwsa7rca9pynoxeo9x792a6h6f71kosbgj89509wfrdps12ovqpgdlxlrdam7ix7pwvyub4vtdzv1lcta42hyi2ep21bjph1rs32twf3ukxz8nrmx66lj4t2hse5pkn2hcbnm25vlrlnzxn5lu6a90fzmrx8yp6idvsgylptw21vw19wwr0ll75tqokujh5tkc4jwad',
                code: 'hwq3bolcclzu6hty13iw1j5k9kb7yxzd2bfrm4czh5hwvzfuq6',
                logo: 'du9cwu3gir4yuom61m8wpx52ojj7y9xwc0lj42nateuad1vq7iw9o5am4scy0gkayyk9s2ol7zuxsh8kuvnvbo2fazc1izo0xq48klca85e5i6xnlx2vu8f9ks43pwkq8ew2kcj400xd6llr08wu1sutx176a9yk0wsmhhq1t9bqxlzbikz233we3l7txz5x49q4izq912kp5ass9kg58i0abmn1vaz0gvmeiksvfii7ru8d61ikn3hc2r6knek',
                isActive: true,
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
                id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355',
                name: 'wfv44evcthp0mcpflac0efgqjbgh0tq8fr45ly70pd1zo076al4dwrstldbuyl75fbrscw23juz802ihjjvs24rzsopz3xhnv0bnazsuw6my39p63jai48a7izjc4h9c7yrbtsbjholwx85nruztywrtvvrb8c2j9n20gs59h6mkpns0fxylkg4cfm7i71y0mliiqjgo94z9xd17l1j9pzv4zjhtmre5u9s1lgp4ray5sv2ssmti8r24yhqj2zr',
                code: '3sanejzw7lls8108xce2ivxgw6qvxy2lukvwvl61wj1ep2eioc8',
                logo: 'lzvk62reexjrqx2i6cbpn5i2o2wi3h13760kj4o81x5o1ejm6sfbbzgxa4apkvxr4nc7htv6x3g3chfqju7crpwtd055bnr6grgc32tydowg9b5txq5v37w2o95lzfcfil2sv6cp5zhsna5ylsw9pbt0f7ycs7r8utp0cmvij7rcom65fd4w25nbqz6omhwizcz9xbf7zb96tz4auwdjcoxfahtid61xe31tr195qsl95m59su2xkr81x9wdxue',
                isActive: true,
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
                id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355',
                name: '093pgg8bbwrlsggwtkd9dymfkek2umair0jgozv7kcgqbpr3xjgwsswxcixcy6twmr5h2mzaboff7cfskthi0cgwsgishqb6tfwhqx5586mhvw7bkofqd60d8sfoli48k9ia4ae2vr54qr3kshx246wg91clhbnvbv87cv6h8jtwu8mk7l1t8fg5cblgp4ai7fs69rovqmvw0q9mjme5lp5z137c5e8csawdynwyhwv3vwpnpcu8eooge8nbdfn',
                code: '1u0hjcsoz98tbtfq3ybjffnbn07hun12nwugohb2iar111p2eq',
                logo: '4vt2f6yn21b7tyamd75yjccle7bfpcbwzbeoj3ixvjquu1h19rulewmlz5oiqseg6699y1pzgoyjic3p62m7s6ogxf0apkdzygkbpla2vinhx2xaj9zqyunmxhkvx3p2u1jqrl5wryi8yxvvbryg457jaf4hznos28pdvlodtl4ddo8xulhllqzhgtiejsckrjlv9ktm95avmnfwuj95suv5m4nnrqjbh0mtbmyoxj741u5yljq69n3ehxuldxn2',
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
                id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355',
                name: 'ru0hpyj9zz4fjssjo9y7u5mnc247d35rdldvu6644ftuv9uph0k7cl8y3mseejysvbmlr3t3hrqb3bbb96i94hpg1pjk0iwf4ijh2s0p9raezwwsh7rttlaqux38k7k7cnv89npxs006y4h10oqzxqt873kys0bfmxbo2cyv0u9jykrvnbuo6jtdc9h10xrzy6x44joeyyve0ekwdyrwl3d7vbzucol0ddf1yazl6110mxae2erbcij9l8l0150',
                code: 'yhi3nq6y8xbmto13n7skcshvwbvdfhfjlxc4kz85hglivruxcm',
                logo: 'qtf7g50xrtbuxje62ipa69hwtszdb1rd0egbd8dgn1rgcpvq77035lfx604bk5f0hxgl465bqxl9cmbrn5y2lto0lv99k1a0dbe8t3zfpqn81hv2vzjzbscnf7aacu8g1pn1d4nawomeh6zk4czv4mdao5pu8kqp396qy2j50cegcx7uou8jq87swtthksreunp03blayb3hs8sukorczmmyd00gndg391oia4qcms01p1brj7jcyn5egh79rwl',
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
                id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355',
                name: 'kqe0nws9p46cfokxe8bti0s5upj36vqe2xrl0g0npmj1k4n51o3zoefrskab13yrzqw0u358z6pa7gv12i9adnvxedjpjdbtps9pbmr5ybcc6wmbg1m85r02lhpxbhc2v7qwnajm9j2nmild41o2mc3ar74vknusf5qxeijf23f12cb48rfw0uxu2dmmho77tthbqy9i518p8ahc48gku1ozwqnc3nnk4zrsy0fyiw4tydvvhyvvb2gc9nxejmd',
                code: 'auvfr7mive1zij51tcq2bhu75cut4zp355lpbxcwykqaw26fw9',
                logo: 'zr8p6qj8si5pmdngvkclx9clgzj33en8tzoyona3wi5x9u0fkh7176upuuvxuxpsa1oibprf9wuxwjal4hu6sej1nggla6gs18zcrrn8x2m24o91csooklo5i11r98ourrk5rpaehepmch58d6bgol589a8axipk9xbxxw6yfxzo7rjek9q763vdi1j9rqj10shc96pg1w1tkkyhliptv06h5x8eqh11lf5d3pmoo7lxi5g2kw02irtmf42j2lr',
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
                        id: 'a51af9cb-f0d6-45a8-8c6f-5fcb5d51d048'
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
                        id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9c035ef6-ff13-4351-8efb-e9e0ddaad355'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/dc27b633-0eb4-42fa-afaf-7f47873c55a8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/9c035ef6-ff13-4351-8efb-e9e0ddaad355')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9c035ef6-ff13-4351-8efb-e9e0ddaad355'));
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
                
                id: 'fc875de9-51ca-4437-82e2-af70bc040a89',
                name: 'djeiieudx4hm14uj84z9o847319j299uvidnjmxq8z7iw7wn62um1yxj87ikr82pdtkf5wht8u84o1agsguwegmk8ctmrafs3ab70ql3nx89ojx7byml2fqdhr3ump7rbavw7tdmhojtf6hjx57jwudf71niwrqwo2xcxfyx9w7ozm5x315rh7ultuurjzcdd6pkbt9fkk8cmmzcj2l3nthaydu3w488uf9oy3tsu68kst991u9v7esl7sg2hse',
                code: 'yqm7mdalrizmgn22xbz6fvr31cwsr5vmnfeg7ml75jy3731i06',
                logo: 'et9c49wgkd4ptanqekf2qrv51tqshp6od81mx2kuatrjro2n7uxyatm4vwiin69pegxt46oo9e5wgp04yatnsl1qlk2mrmezbvn4f0fe4ypeyg944vjduhp5izr94md8dae0t2q3fplkdmapyovk3pykn5bkf3oecpuahhlynqe6j1sjrdcwt97px7xpuk7nuyw3furuebk8wx5fj0cz70pkdm8phs1oq8sw0usmdrs8eu0buxq0nyv23c4ptne',
                isActive: false,
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
                
                id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355',
                name: 'jckqwt535mmhkfkfxb70wk151fzaefnoy2f9ocjmbrb0c11slrrgd70k3fqm1zplinwu9nuzab6cceouqs2nyxq5zscpc2mmqf8fdpfmydv6frj7m97lr8bw4tho07i0gtm4hqp8tej0lzqvjxgjqs010aryxc29hp9xl3uhlpcqi2415qhknz2qnaijpviimrl5nwpper8fsh32thz65c9vrelh40t3mtpkqvxe9jta73jg5wyv3iom9z95fcz',
                code: 'pbnlspgvw1mcwr42oqkw781ii15ak3bp17x8c6mbfhf428jmux',
                logo: 'ysfu8s23rrybnakaajkokw70fzhcklis1kjsp7vz1bk50vb2hfvhtmumrqjwajyni2vsoh7n3hcbtbai1i2pjh3u0csirqjjfmayl1asg9mypfn65h1iomj41g8uvffxq15kfh9a63r1tunoqgh6n5bskzrxo0m06url10cdvmfm77dvadwrmklmqfkeg4x5u5mc4ne1huzdr2k2klazmyyoeofm04681bpnjazv37h7p9o8h2dzf33j398l3ct',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9c035ef6-ff13-4351-8efb-e9e0ddaad355'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/b06b1de0-a4be-4624-a2c0-6f6b6c1bfe2a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/9c035ef6-ff13-4351-8efb-e9e0ddaad355')
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
                        id: 'c463894f-dfdf-402f-a0c2-e3ea5295771a',
                        name: '2d6wrgzrz73ku2g0vsfji0vccicro3cutt9rgi3w0fdwihad9kzinac9arl03xdyen8t1vo93ddgh88gwzuqzdt2vlqyav8yiquc84745e79tef4p2by0xz7i1tjlhvpou2z1f87wsd3a4t4m2sfpriuera8010sezm74m6pkbhkkfw4h9bnzcqj679o56c48m7rrpyf9m521mqbq3fbe1mfy6rgnehb20o8u6wqr7j8b7qquaut6ytw3x5whtr',
                        code: 'qath28klb32u0jx6j0pzkqk6rxfuy4zuf2u4hxzd3xwyv320d3',
                        logo: 'o428v3y5mrnx6kvyw063iz2vu96junh4fd7xromxkdlkmabfifpoof1zu88jlrqrylucf48m5vzqnlbrii0xy9fbennc2yx9dwljd0pl72qewj6d3a86g6rrqef6t3612jr15o6maa5wah5xhbtxnfodoiwdnjbmc07wv5jlnb1f1p35scuagmckhms1141um2e883v8br7snnf9etq1hxpbblvgl098lghyjr4bael26un408nobo77bu7eimc',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', 'c463894f-dfdf-402f-a0c2-e3ea5295771a');
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
                            id: '7852d0aa-c106-464f-89d8-8dbf2fa0317d'
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
                            id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('9c035ef6-ff13-4351-8efb-e9e0ddaad355');
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
                    id: 'e82fd780-06c6-4a65-bd5b-e872b80c662c'
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
                    id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('9c035ef6-ff13-4351-8efb-e9e0ddaad355');
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
                        
                        id: '44940226-dc56-48be-95f4-8c2d9dceef94',
                        name: '3vpd94en6z784eic8t3srsw794xodto6ad613kanne411li6u6hfybheihu5h8tsd68ahqzod8tphah68un541n3p5c5rfwkrmi4j2pghn4p3d8glezso8x4tg3urajr96hyk8gtixzjqpc7nuxemh57cou3fexwabz5tl3fe1dswixtno3ruz5hwhiau34c0ycbq9f46hbuennefc6hg11ffzypp13o3ayfypzffwwz82ekfp8254gs63byiv7',
                        code: 'w7dkjzzjjd8xntkn3vrgn9o37tjriy7e9hjfii0bwov7m4olrw',
                        logo: 'cw2zw3pm4wioqom4r3yx1jb1t9j1vnvgeaadcvwo07d2a6nzhj4zhir44s8r6sqle2nnf77h3o5313mzcraa89z267n2t1x8o527ehztwh0gbugho2xv71zex9c9x223pqlwowzbb4vkzhvp0vfhxhj8o0jrpsxolzy2u2rov92pwskwi2lzo273nphbt4iig0nnebggizn07888wyf5gut6t0gtjb7we9sp76q2jmg4e32blnvkmm7ursfy52b',
                        isActive: true,
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
                        
                        id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355',
                        name: '46psvw1blljjrbcgxn2i4hlvj84n5usfl3qevezkvxfj4glwjhyq3095m8m52jbo2y4hzh1m3tvzb0s38mpds2fo5t499ywmd9byjgi53t88ld8pfngx6f27ustljjndtux5xtqoiuywwof4d4xgckr840a2s79q8phcemc03ta2qqvzebzrb8yyosxzoo7ds07kso38f9t2fd173hi0xk5pgjsp9nlg2evpk8qutlpdchq9aj42k38ttdldjnj',
                        code: '9rh9oo6vg4aqbppivddfkyvoaof2iy33crysth6tgz9jp65sx6',
                        logo: '069tlgltrzxprrizpfq4jghweb6qoanbfba4ex4ha5b4r3mdlb3ed068ca6n558bxsuh2p3f4jigyehvsfya15czvhp58u4tt1s3m7wurjsogvmt1qybfj22ywdqm2e6z39oo6iiahbjwa4hi5jfmhqtw5z2zrkmwdmj95xhhbdwk76c3f9sdzjzql1jqjvd9zfyufr15qtshc4jxxarkuuudxgvfj6t9kvru91h76erfeoxxks84lapb2fh2vn',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('9c035ef6-ff13-4351-8efb-e9e0ddaad355');
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
                    id: '02ea6972-f5be-41f1-91ef-6e5b4b56e130'
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
                    id: '9c035ef6-ff13-4351-8efb-e9e0ddaad355'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('9c035ef6-ff13-4351-8efb-e9e0ddaad355');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});