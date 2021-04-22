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
                name: 'ffu6mk4xbgrdddgnxyejgx2wmsuyytp4yyqbdytqegzwjcz48aeqhtz8oell1311xkbvs9cbrp03quhx9skzci4f9ugh9k30u51dvhmuht4h8o8mvcbfjo11xdr7ewxt97w4ww6vjvcqnvv9hjk5iemsd0dppdb1hstzk3h3guc3znqjefsf6ps3h17a7fugcln1m29llbqtfgmjnk716pxr8xbfl5oc6k7vax54gzi6fqfr5o61coqx0w6y2pz',
                code: '9w8a3g2uikumfg33j7h59tcvbqdbwae5sjterpk3ak2oce5l8o',
                logo: 'ue6egchi2l3bdbl1ps0p1letp0mio6veiag5eh80fmyzsiybcpcmbcdvo7vgxcnfkab5d2rfu82lr6qtyln5yht4vdigznsrmpciepwq6q30ai42jzjsc0lxkmed4whs3nv7aovokrj50dn480caee4wraoh1wo4nm6avzpg679pofc8mimhunjnkmkl823zzu92mwoc7bx2wrajkgtctuqi4ojuz8a029xfx1k5ja5lq7zsgt10h4k4p5de67g',
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
                
                name: 'q30wln5p9jwyiuq78ua0hulx6rap3b4ut78ubilsfh53x1bi9pl199nhdkp4q3wtl6c5jfb3doe42ituy0jgwku2gukg5c8n8btxvbbn5decg82lj217qcqgcr1l7upzmclo24qqvp4710ju57fnxy6kvxwsfuogfoa0mya5iupi3h11ju60y1alh9rz83gxk9opbchjjl3sxjff5vradj1vten250l64rr9wzzd23mutn0804nhm85a5ws4hl2',
                code: '1ygteqywbwfyllscrefazl0kbvwrdwzz4f6pmbjx58bkhwuryf',
                logo: 'q0vcqso49o9r9mb8ndx9o43vkcgy48tlztsmpv94cdq9i2w6tfcl06etwqo40zdpeijrv6fsut81acbd7zgpfp430ad8h72an9n19x3y1vjduldxjfnuffgq4yx6vgbg7pprnwzc7f1sm1p4uwcd1yfjyxcwgdy6cpi5w5xtphg03wsl8nxrlzxi33lbtd2k60749o6agbm8r2sc41fl5sv5k2sibjw43zw313dlgjmd7d0pqvov2wz6na28j2m',
                isActive: true,
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
                id: '6738cde7-3cba-464b-b766-c13b54cf7beb',
                name: null,
                code: '21rggj4dsltv2rfavh0xvhs84ad918r887fce7g7ruf1xpoip3',
                logo: 'zng19u4czcwhvjomsjujjjftmm4r91fzv8qadjvjuxx96h8okwi3m8ax8ar38zh3vuuy8y86s2plxf038ldt15hfijfkw8bguh26s03nmuukjlnoi9y1ngwa4zoy95272vep8tfx6jvrtscph4p61av19cb0n0tdbx5qgrgbar4haa12n053ij8uusm4e72hqmtqjwhufado6y1wlvl7cilp8arbhqo8v5vngjqmwdeaaatwucs2d7xy1e0uzlh',
                isActive: false,
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
                id: '6738cde7-3cba-464b-b766-c13b54cf7beb',
                
                code: '1c9cn4zs2cbc6x8zt5i5iw2vfrfrjx3hnals4b51bhq0ju5gb1',
                logo: '9cxy6zjalyeovvazxqn7ft8xifqcshgmtsjn6qz32fil5iuhdczh52covwy6dpi3gg278s1gma5aucpqlk5sc6pkwm7ew172hjvejyrrzy10rjew5zk0c7qebgo4ibmmiu9xqd6663lqfdn6zqkri7t2htnzzyy4b3mk5jxmb9z9bw7qwjo6op257agoh6fdbbzaz1jlxryvtlcw5dpoyhktqlsjmsr9gr9ou462uimvjiml9475yoe5tbe5ir5',
                isActive: false,
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
                id: '6738cde7-3cba-464b-b766-c13b54cf7beb',
                name: 'xe88jmoeiuhmfxeuhukdwtq2ytf3dzihplme43ofrnvnlv7qh7e43fjvgq231t3svb04wqiazlqfqtrp9wk8uhqmydqlw7asfjbzbexg9mo3n4sybvy4jmt0r881nodmimbb9800manwgqchpdw6b0jg8cs3vavjc4ws7ziz5czas1bdo49czvsx71rbxif6o4c11fghlpt59hbbtkh4uq72tyjddjmwydrccr4olqwikv19aujgv8suehpcn69',
                code: null,
                logo: '8hbselm1gm7n7x7n4i3ax2ypbti82gb76qgx8ij3tbvmf8y1g0tbyprtm9u2hz5ddp1sbznweyg52cuf5fto5lghx0muk2w0x65f4fb0ywccmt76t1oilykfep4u4uf9v3v311cj7ha7lqc8esakqb9ilobkuchkmp6gw0g0y2y69wpqly3nk2ef58grim4ldy0pekedkatlsn08xdpiu7usf0yu26poqne02m3hkyzoyxh2q1mh57qv4nwhcea',
                isActive: false,
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
                id: '6738cde7-3cba-464b-b766-c13b54cf7beb',
                name: 'hq1m39vqo00353pi8v002n2cbg8gij4wmpw0peclyb1ykz8o574m7c6y0yii83pkckppytx39pu03qte54iidzn884uw984s4zwqk8usqblrbjhza9wsvmssl8bqjqbbkf7mn6vr9fedkm8gpveqd11r6cdl8ir6hmgpx6vp1a9aplu4osyvnsxm8cvebycq2nymt155gg9c4xmwh34foien0zunvq02anp8b8an4kbtw48ys5tcgeqcrtkqhw1',
                
                logo: 'ifs25el632i5dg9zffuq4wg0pf1b1fwb7dbtfngkonnc23shfa0yd5b1j3c41hgrm7slgh9jj0muvk2buoq9x5mdqejflcmea0qu3jqvpyamow5q8197yk7grlovpb31u8hwv10sqfcmjr522o965zbqdogv5x79rfyjzwnnfll5z3koccl1duoqdtkm39wm316cae1xp7jg2jn35iv2r8dnno4fjm31skog5vg9a9p3lj9xeoy8v6h79cwi8k5',
                isActive: false,
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
                id: '6738cde7-3cba-464b-b766-c13b54cf7beb',
                name: 'cbg5bmthu63jv45nfx7ptto9wz3hx8scxvhuj3bhk8baatvtmrcal1fw05d5ag2mn5s1ovt1ocwys87ksqonh0qvri2rh2yux5qrxzvbjenqrzgydn1lkxteapw90vnhj248uyrii3bav4x5ekhkx57s92d0ry1o449y9iqvvup1bonbt61g85gcqo5l7da2vb6klivzody1dwelvyxbvl3rcyturshziyv62e3ejxtpqopg8r4kivy6cto9ar6',
                code: 'v1kskg3egobh6z98eyomhhyoxvvuiuroti6sjwrxyjeqequlcc',
                logo: 'vi2qe1gvqxwv4twnxne00h2ew8ruakm1jxdbwd7jagfonef1qia7j3utvaybol4wkval2ewc50u6d3j4wnoath1qff1jgjknedzerz2kvzqymycx885dkywn1osmojsf3tepjhi9kjgu4bcs9tthupct7jlfpteqm117oomfoydxvu43s4easiqbaxhg6z1fmr9axftvk1187b3p1dt0w8w6ikc5l13et7j0kavd33q0qhbst3jxrmfnv076ej1',
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
                id: '6738cde7-3cba-464b-b766-c13b54cf7beb',
                name: 'fpzdbe7s6p56zalyoev4m3jgrn5surqsnwd42fc8ovc0py5h6ybg451twrpkvkgpfll0akns931b9a5dr3lg1hj8gq693f5twom15pyn2gc1nv107w6ifpxmxm0vjz7dj5vxhzpwc4hv3a5npnekv4jxdymddc20lq6q932qw95f11ooweubnvl8gu7zur9d5ppsqs1nkbox7oiuporyslfwfe6rxvsehut9v08ldizi3k6xwvtriyh4sn3kimk',
                code: 'pccm9u4df3hm1qmkqd2xr7k536p559u6l9guz83sspm05srjsf',
                logo: 'mz6hni3bcaovhf52bx7qirhwp76mv36foubebyyxwv9bwn8zbode2i6nycu3bfxbhtazf9vsh8m7zjd2vhl97arhgk3jau41jx4y3bqsgsu66j94h4zz3n7afw3gthygy8mm11ju1h4ja7qpj2ocunjkgiiminecd2x5b7krglavrahongl1uxm14oyyvsqgpnzbk38cnjikoo8nkjo9kybmyn5vqxwkiz1xrd1drezauf9dfjiwprp5wcoawas',
                
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
                id: 'l83e3mcjomt5qgil841jmz9m7jq12qxccdvqw',
                name: 'o26qhnmj0p34giet4af3yff3ivd0n9ar00ak8vp9r5ogmld20hvh9usuvy26x7yukkdip3u6mqrbji17m0ewz840o69rkytno418irmvvztvubd4x73j849eylv9ljv9rl5ci414qehz58bsb2fm4nq2jjdiwejs9nz67iopnylhrmhk3mjy1dop6igck6u812g17ny75zn19p33a9i4sthrttxr0wqz6w3gwhdgo9xe1gb7n1rlrhml2iexvbg',
                code: 'jy0bifjt7j3l3pl02bu4ziae5705iywcc78chpgxhaoiz2ax7i',
                logo: 'r15d1jljuqkpf4acp1k4quidw95ierm7d878fw24rqdsdni6ivxm3rf6gj162lwu7kpcpbjo93axkrd3rbcbxb6z3blo3jtv55i2x04rahl6vt0a3x57tb6ye0uquvdmg901rnf2m623q0xcmn87jn0rqb489xkfzx2v8o6dg8b42xx2iim34r1b2z8x9va673ncg603q8wlmrwdtzukc31llm6zv6jhxajnzhmv3cmmsrzcoddduswiig1tio5',
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
                id: '6738cde7-3cba-464b-b766-c13b54cf7beb',
                name: '6v208csh3b3j4jmr7r5xxrrs90wnq4bk5s9j09mq9a68fs7n03olw7jhee0ajiyqftzt2wb292hwtmrq40jj95ag3mlyrb7x8shsszjk2t68o8k8btbcpr6ybbfyo3drijfk0px9vidnvpvm2jn0x4oljfjfo9pdvaz7x2cnxurdnqb1wmp4o2lc75znwg7nj4rsleoxgoi6prdzt85xkedt3c781ir88zucy2yw15sgig9sl4mcrvrtodoeq60l',
                code: 'ee3a0wdx1y19kewicl57buunszcp6smn86hbzvzoauurvgrbnj',
                logo: 'uv1jw7eg1qasw08lii1zop3rm26r4yl4i85hctm0h8bhfutjl7cs44zf90eg3472v3qoxgndyb6b3304tqh2xrfkbz1f9hk3f27nssf37xj5cbh78od1uh4yq2f9agx1g4yxispx8bxa6te5n6d17b5plji449pkoe4m2sitbc5o3tqqjlcxpht8dyopaz3szylpqr6g5qho988mj84fwb0im7y1jvyleo1l0w69xu6b7iz4x9hvr2fubwszfzl',
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
                id: '6738cde7-3cba-464b-b766-c13b54cf7beb',
                name: 'y31d6hkwfqqx2dgygnuy9qnkmdk0nxey2rssibmfp0vgopamc333iu5fghuwa5gwea4stmfwn6mah5gp4k64m1m6uvcgnk2jtp7ccgd1vsep41t2sdgb7yw3t1c5xafrvv9gnciyd6odtr7pa01ro7pf89200o3vag94ahoksi5wfqrn155xi2jj99lsdb1933hfl2nukihoc42rdz0439gfwc4re1ox3m7w17tmzjcf1q4vuval39k4zic2jx9',
                code: '6qb1di65fmf0zj78b1qg09bajsa2ptyhbtad6umxdc35jbtjcw7',
                logo: 'd6rv3kz55e6j1yblimzskc46pnsdngb4kypz09zfxiltxt1ig4qs1dtmd1vzb8kx8t5peoz8x1q7wpowcfuc4fw2nys7lbrwm77yoysrqn0i6mqb9edix91a4w9q8u486pj2ir1w4rputegu71518ivjiejuyyx1mrtvx6gig7lpun0y0nj6ylwj2cup67li6b2uaxn357twdiar8yr8khbdo96d78jullo92pjarvp8mkrw95a6fortysf2gur',
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
                id: '6738cde7-3cba-464b-b766-c13b54cf7beb',
                name: 'pqx18fojhkv93icrnmvms2qf6pxmmphu05gp6fhwrdgdxf2lap8u9c4ds0l1kk789fquz21ftiyrqph3xth763g8m3xpj30ypv7v4ythir276s9fpdzqg0x3vxsfuzyeoodx7dr0xzi1yog8gh3ohh0xbijye1hq1sg50njc4x4o98zxjzoofltx5wu0t2md0d36t6kel7es6f297z1pugz6r6w31dlibib2745r9qll2sahok5l9pqu54p84v0',
                code: 'depe2bwrg1ciqmrl7joao3y260b3lte2zyqaf9wqmedx6hu2y5',
                logo: 'i9w6d8llrythpuxiygupxbh75xuirhzfxitpx02ggs5am4pipi1q2znnpjbq0gp4fp74h45hs8ibwz3q7m1s6oygkrydltviihdpc8snndt6vmp4f9v58d1zbxaccc8r8w7kiidmoqmhc4aoajbmnkrerjxbbapqefcdnbr7etx6b7k898baf4x2kthdflhc4fdvw712bc5qmqiey9s5fzwj6o7mxcyb069hkt7q4czphttq1mndbu20bw7fk98b',
                isActive: true,
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
                id: '6738cde7-3cba-464b-b766-c13b54cf7beb',
                name: 'bctkjzq9vcz8tnm1392l1j8awspbp34j3itc89rpthpnbrrp20dmm2kh6hwawzypyk104qpck06hljeu7miw2wawxf6ffgyvrb324vl6508ot9532lrlipipdt767d5dvn6xifwro6mcz30kv5s1np4kwgbebeecu8uq9pd57048u8zahvbsx685434zi85ptpdv1kruk133v5upg7bxfepe2r9nnvwa0j3r4td89gtv7ob44stc92m6llovcif',
                code: 'qd3brcb0s6jl9fjdxv3lstxz0lmy8c2j6jf668b1nxigpb16js',
                logo: 'xx2fln7bvys6m1vx04922q36jwuleo9ga8ig50kdkg2kobm3wzxuaxs599d80t77qvjaouojq7d8zrpodvtc34n66ojt507p5vtrg1c0mkvn6fcrjzo3i307vu9xtmg99n41tsmjrpj43u93xu28nni3uchxpflx5w55xoikwogm9fw1rqs5aym1g57ro6iy25b6w3asaq1t494hzboluyes6zo30n5xs1975taqn1fpkrdvh3c0ceyxmt5b73o',
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
                id: '6738cde7-3cba-464b-b766-c13b54cf7beb',
                name: 'tdbnelpiv4rbj96w71vznkcl7owhtz1hvq8kj9219bkoy6i4j3aavn4goxtagn615ygr7xugytg5a30237kjz1kflpn6wpk3l5g56tvrne0rwutc3s63winpnqnq4i2e7vrswf31dxrz6bo963frvlpgp9z5zjn3s7g03isvosx8nut61luurkdjrcvwpj7tj3snnhk45ksi83cw7bzku2hlt5ivmhhrf0lqqum9tfly4jrm66ewwixp1rql3fi',
                code: 'ombcnn50plgbhi13bk689yifn71pvdxss5i1wodoojko0tc6ct',
                logo: 'ks6b12de185jf8aba9zt2vrau14ggjqv6cgs6i66je8javt1zxx6wxu4wmt4zzv08m8z64t1wldpq026667wg88kkl0tj2509r5vtjh2yubapl8jkit0z5pr813wbwmg3qoovf2667vrnd9cbcfovkwknl6kd9oa6xhozqueid1wgd7dw3sfwr3tb44u2e9yzh8vtjwzrfk3owjpmuv9hmsx5zw5rqg1s0y91c50zv9tu7ad02e5pegegw6t29z',
                isActive: false,
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
                        id: '7193e4e5-1f75-4c23-8743-6990ac97efb9'
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
                        id: '6738cde7-3cba-464b-b766-c13b54cf7beb'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6738cde7-3cba-464b-b766-c13b54cf7beb'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/5ab44f95-3e10-4dbc-acc8-3d470d43b7ed')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/6738cde7-3cba-464b-b766-c13b54cf7beb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6738cde7-3cba-464b-b766-c13b54cf7beb'));
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
                
                id: '8fc2894e-4a14-4f90-833b-d33303c57fab',
                name: 'ur5x7u7pxewu3bls4u4f9pb4hic41steytk8fr3i5qyhv2aw7lpjcuhw5t1ovubrh2bd93scc8z1k5q75tm7u9lp3snti0pymdalmn5v86hsv8fseefh8gkcn8ychkyw00wrihjj8ysad8sujocf8y3xus7xwk5ipg8idfar0bg8pv248cndzvsibzjzxyz5mss1odjytp44y90ellkr1g8wjxbpud59vwjvpp100jya69g4hpk1yannu0vs10m',
                code: '5om8swm4n3mw9xhwtba20nkxmoqe1zkzvyczbuk7yw7pe1qnlp',
                logo: 'po1lw6wetgw1iytle96225gibggkhvb2oeqd201ciws7xa2g4nvxj2b6hho7jyuz3n7zz397f2ixyfnu4jg6qq0z4w7qpgk5rtgn71p4e5el5z0zou0buq6xkf9xxmgk77okk0xj5ipynih8pn1ylq55yo7utwtsuo7lz2lqaqx9q6i7hbcnwk35ceexlgk1pvquzge1gltch9ecev7n078116hb6akehd6mvc2ymv7uxm6py7szeaish278sn2',
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
                
                id: '6738cde7-3cba-464b-b766-c13b54cf7beb',
                name: 'dlxdhsi7stm7n6cb58tfyeddfraryhj5srs1yrecg4vrd8cpqkt38n9hyb4bixiliug7wztlv724h3j261xl2qwtqo9pzuvv7mtye3tn9xf338exf2h1i16d2wxn3cpuhzamzcwlkrmy9ol7j9q9do9ntfuxi36832u7i9hk5fmfngk09mioyhrwfvr3n7aub6rbjeq9y7jar8xf5sugjkw7w20ysxeyxdi38ynzsqzpo425h1nkgqtdvsuepx7',
                code: 'kismosk6slu858tby2mouqe7o0v6ah465iklzr4ckscjh1jzac',
                logo: 'xbmr9j5zq2voom0i0r0g53bs9pkz9mmwf3cv3n7y704hu8ibfi8t93tpmd0ppsfstk5mga6vq1u92u5owcr8sa1aowmvsrs69edet8qwujrqngkxd0xaxcsxz1ewmeypzz282s2osx7jud5jqnoh4h13jksjze5hcquwcb61pjrq5me9flkaq5ny976t6ekquth6smyousbsnyorfcqtfnrpxdqpwf4rjl0dz3qz0cyii1ifyg2pdko0e87rnru',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6738cde7-3cba-464b-b766-c13b54cf7beb'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/a354c2c4-cf2b-4f1d-b318-bc6737f4f2c9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/6738cde7-3cba-464b-b766-c13b54cf7beb')
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
                        id: 'f9ef6624-db46-41fc-af32-398d16cc9df1',
                        name: 'gx59hwmlffkg6234b12t8u7ob64f0wlulfpsrln1nmzg66fswngf090ymzvbwkoew9j7m7n78so4z6tutwnmd90451mbtf5na0437p7zjp6bdu6medg2hrodvkaga6j900tl2xwssk0d0chfnvqgj8hgc2i95kw682vxpxpfhkodd6xwfdtml47pwihlopcyk1c7i967w14ji59xe3yoxaq06r8gm9mzxftdleuktn2027qt9d8azvj9lincfri',
                        code: 'yse6fw8w9vanntvwqagq8fsq9e8xw3ukdvd9v345j9sl7p4u8n',
                        logo: 'kxzcyaz151agjqd789hjsg11xgvy4w8r4fkp207gdqhe0n2s10w0hy2o1v6qgk5b2exrp069q2b4l4lwx5rote8wz718zjl6x7ei9rorinqn3bmi1csrmduc9hx23nzxgjysw685rc43to4yq97bngygau5hwjxap4ikqyfwb14lrx891p8alc0vrym3fmqtcjmh9523q1oyhxs0ij2ohvkboz2c1tzm47kqs6ttdou429orekspkf544gn3n6v',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', 'f9ef6624-db46-41fc-af32-398d16cc9df1');
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
                            id: '08b78fa5-f27d-4c3a-a651-355df20c3a4f'
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
                            id: '6738cde7-3cba-464b-b766-c13b54cf7beb'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('6738cde7-3cba-464b-b766-c13b54cf7beb');
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
                    id: '9c8ac770-b288-4bcf-a4fd-71be9c397b09'
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
                    id: '6738cde7-3cba-464b-b766-c13b54cf7beb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('6738cde7-3cba-464b-b766-c13b54cf7beb');
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
                        
                        id: '5375baa7-57c7-4c13-a42f-d6342fcb5a23',
                        name: 'avfl5z8k4vmuww4j0pg1bs79ab309132k4wuxps1y6hxdorh8k8jbtboy0u9pbgtnjmpiplvkaai3izo26h0fsejs17et19acs267zqetu54ml3oa608d0s3gbwz1ln665j5mdeos5beql1d042czrgddj07pn0xeh6vkb1020zzqvrsfk4egx57xsc780j6lhm051g7mfafyp6fv125u2gixfe3ed20iz63esuqmab4x5vz9d6r4h7au8wqk7v',
                        code: '66xqii0zzoj1245s690h4w6d0tjugk4j0fdhgfe31msrlwz7is',
                        logo: 'g9u1bra1rvqmkieadhdp7u3sw1p4wd2cx1qgzng614aw7d6qi06a163vxe0k6x8uu2l4rhoh3j4rcwofn6ak0jmkrv80tpgjcg0288ppu4todkc6oh5ef23a4pchn6z5e24ts7dh54mfq0f4cmpehiq82j58pjqrcvhrt3z371dwot825kjktx7wfmiqhsbc0x0nn61uz223q7izvyugdv67svy1ycbpg797orzm628co3dbdbkrzro8itxm2x4',
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
                        
                        id: '6738cde7-3cba-464b-b766-c13b54cf7beb',
                        name: 'qerdwb2hdz9cemnuvautb4gqbvypvfw6idl8s99jkenunoebwno6waicel53z36ovy04eiyzk6oqiupsnow0fkqi9yll0lr4hyff6nuo8gjbsfl2nfrb4k3vg7b1yw3wesa5dajncftio8wzom0df941ekiyk5scdftoribycf9sob398bh6pe29qdps604e4b7w7obr9lkeg8f3o2ct5h9wlmu8txmv0bp5tyn69knrpygm5p6ivhla0fsadoj',
                        code: 'tebqo4r9njs8cfq0if3as2pugazdo684iyhizzjvfvsef5afmk',
                        logo: 'brndynbbqecz354uynik31e6uwxtm4k4g2jyz0gwgw99xl65wofvz74yusk110mdvlcr9zrlulzlxlhemuf71if5if35ut34r1wfyx6g05rkv961tj7jmiyknfk9p21u6elr6nlmlxn4emyjiyqdl6w3j6jfb8r8c0yvgaolgohjti99mjvsyr6anqevphfi3m4hs305zb3snvc0ob4vsluhn8fx43xg3wphcs7asw7jafwgear000fnoqv4jw9',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('6738cde7-3cba-464b-b766-c13b54cf7beb');
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
                    id: '8051c176-7517-426d-a2b9-5d953e83e895'
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
                    id: '6738cde7-3cba-464b-b766-c13b54cf7beb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('6738cde7-3cba-464b-b766-c13b54cf7beb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});