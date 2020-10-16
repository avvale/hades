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
                name: 'lmke77ksovs6rlhueqokwt7iz3015lzd4kjpu4qjtncd8xp0pgcgyk02nsou5f9p37fxm1c019s66ze87riaeayi7idph4ctlmcgtw7wwq1i8xwogc1jd0h2odcjai2xuq64vdzi5c36p3nuaig0qlaie3r7s4ndk1v2pwtrpgfavc350flyj86jkgpr36it495m2lkxg5v90j5bogdmltiheak9sugmz5y8jvsp46lpd468ianfvobsc9zt6nk',
                code: 'glb08c440rikp8wk8wt316vr94ycrh8h43r9ny03cmjbvj6u8a',
                logo: 'lrdqbvjm9n2pf384z3l7950ajkwo9qmpl0drbiq3hes7nvwxwyomszzd6vjmhdd6j9r02h1yxyz2f37oqaeaz1b57t5j7bu6qmpl0jggzwb20vb688nb6pesvxmcw9f6jpzkc16fu2qldne4i2qffygsxbqokxf1y2nepq5t3h9aj2siu7rls50056urz3h8b0v8ieg6rhe20rs3fcbw108a63wmqqwn3ffjm88hgg1cqp3irlsxscy5qt8zwb8',
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
                
                name: '33a2i4ak5anczn9idicg7npqa02otsek1rwhxqn06c0rh2tvd86s5vr32pytponnxldspzqtapq4jm1frv4x6b6h1o7umj675nyxypkkwzkqhxxhgns74qeqpvdv9c0824d8ua0y8z5ritwawwrbxznhw05l6di8f1439kabltqurxo1q991liyssosdvco7lz5zc3zqagd9e4igm4oxc1xq0oiazqm697g81cqs8u9f17qltvf149xu861qs46',
                code: '2hhdhuzgctl7t1zbliggat30767h56zigo9nqcp5ilznr5a4xu',
                logo: 'gftqbar3seo1k42p5kau5nbblql13e21lpxezc10ncbwuadcs4b1y0karb6a1uq51r98hmehddbm684xnvl5bbeqjyqnk5wc9mqdt28evu8kaftd5mpzbrsjzhvkkciv2wrzcpmzycvbefxqgln2q7miqafyfi5yb1hr656ynkxdkkssdyp35g1a4n7s141dhwytuph43cwa3ls702bo3aoynb49s8rxzfzk0jd4lmc70yam1853zggw0zu0o7b',
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
                id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8',
                name: null,
                code: 'egf4hchpij4unnnvevba9v3yvibjagbxcpvf9x97qcy306w42v',
                logo: '001zrbksxea4kap7a072j0035p92ipoecz7osckqhq1054xsxdex73cefbr2s5xfnmlnehmmnaodgnjud4e1cmkkryru9wcxo46ni3f942oektvgw6vsunyweur5f8mz02wnc5fvweb8njfyhs6nzs62rbk5389p0x9ifa2qfmacjxopm97edmvckru7df8m2carvff9pdyjtea9emuq1telgij295qo1ftwiqnu3gbjvwj5kx58ozm7n335btl',
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
                id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8',
                
                code: 'ms5dngtc9xts382gzq2ak7voz660j5qk93dyw5qm04kuuqphho',
                logo: 'yeyqsldt56c0iygdcsor09ty8l6rk6c4acf3dekhs6gkvgwyp3m1kbwjlkf4t7lzli3v7bkyai3ebhsr9veq06rbl3b3obln1hpedg4p7m0pzsdz21j22m3s7807it6xflul3ps726he1snbpyla8ivrdgghzss0vhz81wzfjjaqi8cs8zvzh3rd842birep0budvatng5w7ac238mi9thyoly36ux2zpqbsivanwz0ogpdj7gge6pz9m13mtjc',
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
                id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8',
                name: 'usm1xp98mb9tn8hiuypenbywp6w4r50at3k7piob2ie2z02a63tvt57799m0x8jzxoirim5pgyeleistf1m1eje1koh9qwnw1lp3tulsfud8jut0mmcsk3knfy8jrt8f43kwekkkvzdwoimombktqeyiapy91d7cttgtgacoc7jgkm4v3jgu4v9d0ys770pw0290a8tnlofdjm2mm5vspn6lcqa6z0bv1otae69nfy1htdhtkp67loc2aflmcr0',
                code: null,
                logo: 'tggw5pumpxhg4kbcnoqsj2udkv9edr2x2bg313zitj43tgb2fgkabvltymtv4oa1un0339v6winv23gj3y7fhgjjounzxmi4gl5grtuc2d5tu7rhymp93uqqbwjddrpsy3l0mfa27h529hzdjl2qse6o1n1lquff7lqeonfsvffcb4s80abswtk7kgs67g324x3347nq54wvqbfvw2tkauu8zsfl1sojvazqe9t90k051lp5dbsqj300mz28ut9',
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
                id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8',
                name: 't27aymam2n6n8k4809zo3zclchf2gpxvtqj2hhenfag4cu7ya2fce5wgt5ewsntuj12h5lgkll7oia6qki9pmmh2qf0weyhsxm35zqykdmyb8fn8q92mq4ka7svgysuz7w9gxuw91488ofvxdo3yanx0ojgc842es1px061cmdh89ek5ulsg5cg12vffpkye5pi8h3sam08r70uh7m4jofr50g6axpjcze7g8gyzsvnhfcpgyew604qcwjev6gu',
                
                logo: 'xixunnnbcqrfz47gpalsdeqvlxz3gcfi1m89g35ukyhvenwvmnw6wt8r9cv9jkifbboe9me0aumqvcfaiouxmhg4u7vd1xd0bqt90f27igvy5kq94lza358z7nyfl53kdpguc2h6f3wfngacwb6xml3eratc5flory1zdhsx7tv1f6btr77x7fe5c1y0pwc2eydtexfqlh41ub6p5f9icsriwmbz60n9ygdb92791yzigu7wurnwj8l32wcvqmc',
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
                id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8',
                name: 'iwj09427z8v1e51hzy6546sffhuq2hrlqsz22813vl4n1tmrnpfi6vqgm6jpeur800sgqulwmcr7fsn00yf8m109k6hvpifr1uo1bnqfzufesn7n7up4htku43uuseb7cvxli2uyz8bafwborme64951kd3qkeo6k4c98eo1rxtyhm8y6tmz1zopzze1b60dbqihhkakx7rvhq55uahjaw87v5tu5hq6i001kr73kzr67ufpwyzaqxy1971dyrw',
                code: 'y0f80d6olp4uj5jak71jwdo2twps7w300uyixct24y9rp1ofcw',
                logo: '9u3r4sjrctexe134rjeiegvpuk9s0ezbvt5o7vke6h62ofao1oxdpaias33bfkp5u46j3otirappbbjj2s1y0gq9md6z7838jf7mq5ksbjrhsw268qmrqh78jplont9clyz26myivzn1n2g7hdym1rnvqqyu0wdqrb448wlie7tufsmtgdv93av7acircgarto8yif4bhwn3h2e8p9divvlkx71ik1rlany38lxyvo1c9v0olngnrc7vlqi7zgc',
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
                id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8',
                name: 'b6c2agv3xwlbudqdws2ig2s17pyz98lm3ni4ak1yeapiyz38xg7e9qoqitkv687a5jo69dqcutvb7puu1p4vfjie2lgj255arcf5lcenyr5pglvjd5th1fnk4jhbw1aor9gfaxyriwcjohwdypadcfyw0rpk1se10ydxvscutn166bnffjnai7n5outi3i5cl94xc7reqy555rjgo1693e8uu8jzdmcygcpr3vbaulzgir9o93ym3sk4xk61hvd',
                code: 'q5ntxl3p4h6tw6iyicfvl7vt1h9xe77x4dmlym0r5f97iu60jm',
                logo: '6g6ceub8g335gq0imdpsibgd7ep55izc9mh69dg0nnd1tqtjv7jch0a7u895s2mssiwbakuuues2zo1hb0qryilvrdl6dhxwk9ztgc5pjubwdxsu1n2h50sec55esp979dniw1nvwrtndikncf5x12oo3xfwbwrrglzyv7gxuaore7tmw1q0ay7ogol7r52gawltyd6xtppuz3oqquc2nde647ilyfgoxlk4b6ib58a0o568j835mgdymctz4ba',
                
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
                id: 'wsflvkbdtihuc0kzaqeu2pg0na8ovjv3lzd1y',
                name: '34ey42lbj1du09urlku812tcyaaamoq0zf7zufgrf3wmz1d292ym9n887dqrwmfn2y027ww9vf7lcznclve85y1zush3djqp2yicwl0a5cgabqmjiogmmjlgk1by0pu11h1mu23xfjvldu74v6xlj9xq4903116ftze02a9642pqwe8mit02tlwn1ttqdden7fchb3fqzd9kqzelyjbax2ntgx0pa1er02y9kkj48femojv8ds9njmx1y512562',
                code: 'fdhg2tc190yt75gbmbyqxh5hbivwuaa2josum4essc82ucngn3',
                logo: 'dd0w3f678gq64cifzo7mceisof8pvidza7g18u784vvf71zcbeykgzzjd4xvkm0gbp22vokug4zvzmmtr9x11gju4y021xkhezl875ky4rkidubrxyl9h10dr0krggdzxfh4eoqmjxemih78rzxiypele7m4trkc7mjwcmrrhornyy9xn5n6cxg0r664z3yln8c9yrxmvtxs24l3f3sbmuhkel3vsh7ov38xklt8wsa5lv2ikjsr3junz3ec1h2',
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
                id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8',
                name: 'wsjthu4adam9aaixtp6refjqsqh9mcj32oomeepfuoq0mt752cd2vbc5jmyopx6venmm398lktkt9uoiejrm251qy3iyxaj9f2favwkqgf361ulg23fzta9b9spjxfw4uriw9cbmpjytu7divwx3ande7rss2fk3j24i8ynebgxgygpie4jo8astezle7mptay8ad3dkkhza1yvicawmqrg7aicewvx4d3wrf2jfvk9thab5q5xq5qj5v5xuz0sl',
                code: 'vzoac2ylwsmf5ezfr7akvpd7blvovj9mhhc8f2qq7s5fec8phm',
                logo: 'jyq6uv9tc9g2amnpoui1nl1apc7lz32jmqqf57ituqip7omncs88gkj08acs93pwp5a4ixzvq0lyrw6hele9fg8r2fz5yqvm1wz9osjqarzhj2p7sl0dq0ulkao307h7avuf4gjtix5uiro8wnh60jsh9s0y10xgssnpm3xyj4unqxqjiy0mijw6p7wxwx4uk1pz5m3hmygkgtfmq7hfd86d5t5rkmujiqchk6oovcbxcev6oarunl7yy8wtwqf',
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
                id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8',
                name: 'ib304t6dyahdsb5k57u9p7rhdfuiclz3awm51b7meiwnmy6b80t3clyg259e5m66kdu3c7zli97klt8xk4fyo029i03rwdf7j7cg9bqnatzdjeq2xd3qfawgx06bapbmwnj66qvbkgfbmj56y50pjzqr22ezn8fgpommp55upw8eifo6nsrp5gvcz0ahrt1ju2ss2jeclu2p1stcpft75c2sqcwwt8sf0xfascl3n55jmjv6h92rlnshdxmnud3',
                code: 'n4nfa4tojhwdzd82ron90ptbxldenphv52ik5ertm6fv6rqa2we',
                logo: '49tjkszx3z16435q9dlr7m3unorgfx3ci8v48lujne6xof57q5p5hvspaw3f2ycdijj6l540r4c42b82bna1wxurcbzg43ffsqpcjk9gn4wruexgsyj21j5rsx8fafn8tdq7dhkbh0yxdjqkoje2o51pvnwf9lyyyg06lt88660szfudtiwvf9uv6kqyzs20me5zqqoixttt89bakjvz9jmwenwyou0d8l1bftiixvl5c1p55wl8w8edttx4pj8',
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
                id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8',
                name: 'yr8zd1zh6oi5shd2n2m3evbmsjttvfs7wa0xqslms2g7zy6eyny3h4ysv8mg831zwdecb5400cpwk293p9nv9g9wvm3lipqkepst7ou3ed359gx27lz3q871t3bswym3f3m84yvvlb39ru7j0163utiom0a2jmrs55xs52zysyri75bty7x4bdnz2i0vxaw7lpn3vkarliqcuwh7g16in53n72cnryti2gyakzix8p11b9yjno6ykkjxipxqtol',
                code: 'glzwe69npr1tose8wwd2oj2txyp6w4jwh204brit30cvmoobgj',
                logo: '3vzh31h39r333hato67qqvkq0vz3a1db3bjvd5v7ei0u36fyu7t27qyldqa508y9i792navg6gp1csh0arbk0xys69q170ihkon3gebecd772wn5gemsswsg0pry0qkl57n2nfrcxy4mq3k6xyiequyzwx4o3k3hpb79p1bttras7yhh7zojvn800bu11w11nt8m48uc86q2zzqpkul93t9q8dov866tk41c3wdt3e57ui3kji3qz502tv6hldzz',
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
                id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8',
                name: '18v16k6upfftmmkk93bq7tqhtsa86t6g8v9vb4e6apjq0c01b9dz1ngzeyt1omt6r3xg84dx8f39f67po2fssh7yk8w8og7bvpw6t4kcvql59n78xcngzaqvaro6g7deglxndj6yheqqnwhs2vsszmf89f4csn9cn2bjsdykm0bvwsvckjpgudm7f4yvyhtiv1tjjwcbzlbiwxq13xvs14n0zwb86pa0vmq2u36p46ok170mni4tkg5yiutrrit',
                code: 'tc6j2s3nyrmm8it686da2odceuez505xh80ct55wc4t1kyx9uj',
                logo: 'lzs8ad0qusmr0eovnean79501nx2pqh6gk2p8vwnsy5ijn1vw0449b409hmfc67m209gdb47ox74l45yf9lwjotlhuwkrpfm2mnwcux6ztdl8kyup4vqx517eevtwzwre2nq0hfdldprdwg6nmsryxlnau0x6lw80o62ie1yr5hse0kcajnv98jemol00ffxmobziajhqftctcawgpii8d8hcg8atu5dxzv5qea9ifwcxv2450bpzzt9jvujxc4',
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
                id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8',
                name: 'bv5rhmd53d7xqagc96uu9uojhoof8mf2m7lm6f0qrsq32y2c1l9ej4z7zfnyzzvva2omcx8asg68wrqc1wkrynmw96shskqzb91poo5ti0yd0hbps9whi1mjozvtuzxmx1spvncc3hj4upkgjq7aahhkth9deyvbsmx52lufzo1a4nj55a8z0zuqx7kqytuazcehx851g1nexjqnr8ntm2ur56cy97h7ggpw7yuamzqa6ujkqn68a64kyygnum3',
                code: '2fpvh7qbo9etx6qufrrzyvgszfdad6tmofsqgyq25uwmplzg32',
                logo: 'g1ybjmbx9xoi5tuxi1adljiuguk3rogdfp3sbzrbqdxjfwrknghumky3ppxfra6ik3jtuas8hdvm49s8s8w71rkjlhixa5ayoychl67mf4prawcwsijfxbidp0c287f4t3khfj4escuftnoni517ceiige3evva5l4simmriahwfhrf0n1njs6lopy0c4wcm0d2ydkcijjhei2awi1had96j3vzy5v2grypj1zrm58fcmq8w186fuxstd2kyb2e',
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
                        id: '1a42836c-61d4-4b94-b2f0-d5e9443ca0a0'
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
                        id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bf7b0cb5-9279-4dfe-a957-989935830dc8'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/585cec7a-bbe0-46d4-aafa-de19a0db5425')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/bf7b0cb5-9279-4dfe-a957-989935830dc8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bf7b0cb5-9279-4dfe-a957-989935830dc8'));
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
                
                id: '6d3012c5-c15d-4ea5-a359-a581ae7614fe',
                name: '3fv96njw5jcfo5uga2uenn6fx64t92ssf1x4c34ifbxny2y7pkorx6u5skfkvgimh992t9vhpxb5ix005fzozy1d0tgitvtdws8guv24sygv1omkwkkrrsunrks8tr40aqrihtp3jij8wbajxmetj4ylpfcrfme3kdjn5y8qowq0r8vwokmsd9vfbni05uw4k8niy58rb8rdj6f9claxvhs4pq72w7ky8l043hbyu3eihbsmyktlx2i07izc800',
                code: 'bbo0mevy94ztltueem3cg80og1a5k4dimg9r4bkdzchs6xjw8w',
                logo: 'qwxccfgmppv124rrixeuu5l4eeyjansu9o2k19g8afs8u1a0kfw8q6uzxeavpwc5yioc3bm9mpul18ik1sdlfcs35d3w0bxyk6ivptqnfk7jkpfgq6r9d72ugmq69u2ebsz6tc68ae7b69028hv7qr4wkjr1slm7u381q30du7tkkz0karsv0aucrk3thuprhb9nots44jyygsyqvppmllgsipgvuxjmtlhss602fv3uyt07irha2gmen9swfic',
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
                
                id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8',
                name: 'ff5uq7q7qrnvj49te74ixki7ua6zkcn8c5acy5ja1qg069r47xm3t9tc2ulhpkpwod3ykofqjo3fky1dxv8ykf4f8jzokfkkpsu6zq31mpsid5tlpbsrnpc1z3st00nxutmy4pldi9dq057ifwmiulph87aafzcivzdao88d3q3cfsw50cj9jw0fcg6pbr48f0q3n3kbejwl6hfpqro3y7drv6b7h1dt3i8jr03fs04ceskwo4277472sx29ipv',
                code: 'acdp9zsx5a9dz9svvo748mvhrvtaevhhelesx2n7aujt84b724',
                logo: '327hxvo1ixvp5qjsiz34fmgxmn32wizka223iwx2mxxfd1ggn2ewu7fztgzun8onu89o5ukmf2e980ekiv2w8mrr4ostfqn03l9w5zj2fjosb1mzddi3leir0mvwpituxpgc03flk8q6wr5xirgtnlicnbaocljaritofn2azoi7j9v2zb6xc1mjmukysit2njvudgv5wcguykkxmpkxtej3dhvh5nalpazv2n6bj4wlk8ox6ihcdf3ykg3rk2o',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bf7b0cb5-9279-4dfe-a957-989935830dc8'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/c9972415-75d9-467a-88a9-e9abeab4b173')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/bf7b0cb5-9279-4dfe-a957-989935830dc8')
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
                        id: '217fa20e-8f28-4f2d-89e0-f5e26b26c89e',
                        name: 'w9690ei4io24iegdy6pclr2j7k77th4ywmc79qsu3lmdwcnb1y8rpwcblm7imklt41ndes6zu715z8unw2cx6nymgyqa2rchdiff72h7okkob2fdeg5doov164c27pibfmdvp61pqsrmci8yr3twtlg1hrykq31xfvojx31i7eqb2pewa5d8vo9lhva22qmd0l213ahbzmn719onodiyrqx631zo5orm1tgyr2tpunqo9629k0s04z2sbjjn1bd',
                        code: 'x1em6jrtd9yxm4pur852n95ahpgkqx10tr9787j6ytz4q52slf',
                        logo: '1viz2v4pcvi4s9smd4fporjlpy59mgcnih4rmvcdrobom8qutk5u3sitt4gba2azxys66ysz5oei6nckndzhbwy169gezgmxxrutgkkm5i3uxy319ozytxsrnpatqqmy7hc3vmsau5wi3sjplo4ub6ts9f591s97c0h1ln333fx3bzraj6jwllkzhcwyhb3wkyek71wxk45af7l3y6kcttmiezjkbwk8cu5mnul3w2m9aqthxutr669tosks8oh',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', '217fa20e-8f28-4f2d-89e0-f5e26b26c89e');
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
                            id: '81abf2a1-74a2-4629-b12f-e1dc900718f9'
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
                            id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('bf7b0cb5-9279-4dfe-a957-989935830dc8');
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
                    id: 'af23d0d0-d24f-4f35-a69a-6119d46572c3'
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
                    id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('bf7b0cb5-9279-4dfe-a957-989935830dc8');
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
                        
                        id: '7e4b7245-6a62-41d4-92c2-99b825d49d67',
                        name: 'ecn095vevopcu3wvgzerkonj59n00p5fe2wq9u16m1ztgmom4z8kzdvnd1k3xa3gnyeregafq0j7p2q2fpfe3238fmvlurbalm8kuppohiy3a1k2x2k6aalh45k47t2521a8qe6lhaz37vcggsjbwwswhmwot5hntdnfr3quwgo8pdlyq304lmomicyyk3dvc1hcgpd23tovjih17d4qzpsztl4a6ql0dktiq2deayzkeckqrxum5fmpil5gmt1',
                        code: 'fftdsf6w0dohuke9vfwuvsktzt7rmobp32hxgormu76dincgmq',
                        logo: 'fy9lm7g9g63m02dg8a84zlr7ora63pljomdjzplpzb0zpc3wgaoda7pctmk4plmdvi9za5s26gqv0nriejht6vo1qa19rcmewfhpn3iqxbnkfz9kvamtkeuv37uvf2et06a4iyc2lc85g0jsf1kdn134iwh2j2gc5vgep4pvax9id0c66mp3s61q2w3y1s37t23lyeruil8yqlqutqezqie5a7d6h2wh4b1t2lijy1tqa3e76zs228ac3b5ir3m',
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
                        
                        id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8',
                        name: 'eamqlsnlk3dn8bwhehv2px9rh06chr7xcgmgnovmytf3fbt3l756u07wcns674b38r4wr1wi0gfumuwrxp3mp4hribn44eykjg4d2gqc5ks3hc9253mfab24zttnr1upm8s4gdleb8y3xclx79bmgszfeu47c2p6k49o5ibvs89aa60hxczfdd7yx5yrz8bsx6u3p6qd3cnziwz03c3339x61xa7iwxx5hu2xfa7k98l6q5zcgsx7hpuivt9e1t',
                        code: '1bo4fyqd549ow2ymaw26u6xua9ch431loxg5x3t5243pa5nyll',
                        logo: 'evqj3abjemt93f094hjqevf327odvqpi51obnhtlcmax9o45bvwt7eykk9qw4736pqaw8olo25g98129l2eel6mfmw2jc66zcu9pl2506p3a5o4o838h7zqq3056cdoats298yfm81ue3rcavcmtfpy4du46k1dx7vv8ueiz1jgl7bzhba2zuhth1aoo6tsdo4d65dc2nybdfhen92guuau1e0y7mgvgw85siunl7nb1afxycoru7rdrpbpz5b7',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('bf7b0cb5-9279-4dfe-a957-989935830dc8');
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
                    id: 'ed54d768-c794-47f9-8423-adc8d9b57840'
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
                    id: 'bf7b0cb5-9279-4dfe-a957-989935830dc8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('bf7b0cb5-9279-4dfe-a957-989935830dc8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});