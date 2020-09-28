import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IUserRepository } from '@hades/iam/user/domain/user.repository';
import { MockUserRepository } from '@hades/iam/user/infrastructure/mock/mock-user.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('user', () => 
{
    let app: INestApplication;
    let repository: MockUserRepository;
    
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
            .overrideProvider(IUserRepository)
            .useClass(MockUserRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockUserRepository>module.get<IUserRepository>(IUserRepository);

        await app.init();
    });

    test(`/REST:POST iam/user - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: null,
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: '7gyyfbp97s8rlrp55l1ike5jpbxlzdgro3l4dhq5ie3e3fdkxhqr7svvvuchld1l8cjmy24jrpevf4g8uk8ad1d3y44v2e5q9eww1o90mqdussu145oh1yz18nx2c8hvewqt0jpvsagwxjtuvjx09b19gn97n2k4t7zailf60kr290y9qm3rzpj53xtr683zh3gdot8uy2xwuvomr6rxm03jag5uba9agb03gs76tgxvwx5p3ywde7cobk57c6c',
                surname: 'dvz3zmzu6ifgefxmm7eg5s18nxskix6ehtw2hc7v4c9nu7cid7vj4cn0ou06c1yzkj4lrc7c6pn9g80yyn3msobv2mtj7j5d7b09414k7x5t32hz2wwlwlg2jfh7mt2mlds336qkuzmbczxa03be6epw7pp8iorjv6246z5t6uvok2ojtapo7o1jd4khi0nnlkojiwze77osl119em3uoli3nbukn734a393272ro9cwcyiriskbumrlw8slaoa',
                avatar: 'cdsphj8yhmn4ghnmhm9egiep8i163lasxmycnddlo14c2v7v1ceix9c8viau0fqf3yrqls2hz3l96gg0yrvkz1j2qrih8kvd79p801ousgh5ehanwmgfhi9wr8z1wfy1ftw4yfo4iy8lkvea8fu9222vqrds48omub7k79zvfcz7l5qx4fh95xrqgko6e3cf49snd3zuugajcos2690vdtnzv8g27fkzdx54jn5z1nld25bvm0jtht5gq9w93wd',
                mobile: '6hutp2avgizw29qw5ohumitnpnq1xh59w0m999rhvdb6vl59lvpckhxo4n8p',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: '73k3a6a4wphywwy53pd61vf8vkcbwvambmmyik7lzx3pzom8snc082ufqv1f9pv8xyydyl5s36yh9wlkxu1r2rfsjguf8445r007cg1syscypnz0ew51vtkx',
                password: '5nml45czwa69hqp4hqkx0stunu6f8m2qruuk2fe4a72wdnhp95s9i2h6xufqh9m9jcoli61is7l7bg2doejrho94zo155hcap47x70ab3edx7utqs76db1r2zlwzdxqnsuh2ka82zp025fdrgj7wso255b4740t16bx38gezt2siahht1m7khw23fs9m9ujoyvzninijyh6bn35gza4vb70w36strmi16qesdguwo11cui75l58in417w7am5dz',
                rememberToken: 'm2v3bqau9cjijc9pixt4pzzj1uj0xefed7gssprn45seq44gr3tflp4n0wwtqshs7mltz2pfarudqune88kr7z0gffvs9ysl9its4desbd0ybllytjhebfjlsd7c1wat2zu33vmlopka76yv69g98mj4u99xuekzyjqw8updsevzqk6gkxac9483j2duoxavbps10qdde30l2b0x5vqgpdpfuw3xv35eresln34vulxz8wfmvnx9xorj5kcmpqw',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: 'se463xuhhihm4pa0l9n34hk15c5cjdmf13nba5317h4zcy7c7qcmcwf84n2g95qo44rcwewils50irlmuwwqffmlesfbwpjc1wyhkjettii2cplwhq7kmlzcxm1qh0lzrf70p2f0jtn90d99okvifiatq19lo2mbyi7hxaaykm7uvq6wv8m59rzsdq1dgvof4r34vqo0su3bztzs66abvlx2bkanx74834f98nnicbgddtevburwasl8rcnqewm',
                surname: 'xvzqa7nqt8j5ytsetwrep2yx5xydev3ro0cpdo0psin9emkdnahu2u62gb3e861t5b3rpz8dk1fwxjkcev36p3k4ub80v8yfhcnnhgpguem4vnzg8gemhdmfkyluoc007u72ld48io66spx9dxctk4u47vssmg32g5aazxnmvkdqw3qebqve9k0k40qecs7j5bgm0qti6ql4741u7b0omsjhogy92wgbbivgbq6beilr5zq9rwzkvp22db1jvvh',
                avatar: '6htqxs7afrpcucqt0leebitp0p43ve9cc5oac9d6u3agtjcbvfeasx99e9mt958gfspzk4ecn25k9x1tcpx3ceacbupy996yxw1w4wa375vwapgtrg2x6wmzbghm6kmd01besoqc835ybw5nsf407u6r2hp1o8xfphew846qsw8mdwnsa0k8ohkx201lopd4ax12snuh7n6ayb36izgave0w95ai43m6mgvlb5h0e5b1mib8vqoliv73tnc921l',
                mobile: '0kzbnhnw6bkft8lu7magl0p22ub6pf284on6c92w5h7c0c7hvuq9jq8vlo5o',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: 'oaau7fbtf2tmjv1ouqszggftipgauq51011j2qkb3sl8jfr5aqb64vbqqv1e9g0smrk22p7g81udk93hymu5syqyn9buwi0phxgljco8cur2mzruhd5327hz',
                password: 'snh0av157pgmcls8std88hi2ppzbado3rcery38qputd223ncmx34qierpdvrj81f0ifsrgv2ixs78grckg4meieekzo3c9agjebbieesgcqm7qqyz368548iyyhlpbxdekz6ow0u8rj1omdfok99qm1spp8evxmlx9vg9nxv3w4lmdppepxaesnuxa952qt5iljaquvdka1p0s3hpa35maux4pifp52imen9345r2497kwqgnthphzy5kuuf0s',
                rememberToken: 'i7r96set7xktgzyxxld5sv7esa941rp1ah0e8bj2xhn3migfyfzbrpywycgzhxx7xzlkvfvgip9xjmn6ywgjjhmvkqj87zqcb6ep7dzzxzbzs5jgpkv0qkz15av7y9i3si36b2tly2jhdmq22my92z427kwkzd8fa1yz15oqyc0s1hm4a5rn4unx080pbo1datd0bnjenqgj6jtidb8e2i7nraiaj7hap1hrdqvijxku60pa7xqbo8nyp04pzpu',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: null,
                name: '4k78wmgr205yxlq4b291e5ok1v3yg15vd0jcmio5lhctbexs965wxfmml06vmuug1whsc4ani2q2gklsssfk2wrglqbf2up9kvktnps31b4lni4k56utkkz3mnbez5n5ocb5gjp6oq4rxf6eiie7r9rzuwnfhbw8243m23clve1d8lzi2ecrx30be7dp5sxspqibz6rti0er6j4gq0q3t3tjneifujqbrnez7ay11gvdv2fwm0pn1dhppj9nv2x',
                surname: '5k3a7n5zr1hsqte853bjp4wm0o9b2p6qw5wgqqbgkzk1c3gxanbfo6e8rr5eatd9747lyjjmt365tbgzjarlv7yvaueg3dsq2y6n8xxgh557vtnm53cofhbyj1evsfrklxmlzif95v66f3besrhj3bgsgl2bnf66qyumdyw9t1o5fc25eoowcqgx1l2in26ra0calmanfxkdpyaz29q42lj0foom6mnotosc3cqt00kk2o4udx9jijnuvjzgok5',
                avatar: '15daks2t4d9hhh374q2vqptdzhhc3tmumc2pksymwu5ne3fuhi9lws00x1y9jhtqxnqv5ol0xtreowisjrbbpdgogdy3mm508uclb3r3sc1t8hgtmdjq9c871xedkke5no2ta1chi54yoiau08taon53sjebbo9jzlf9u4q82dvvbmiym9wf3n1ip4kizl83ts2uee0u424sdxl1zh45rt92chdzgn43z5vgvl94ig84lb3dysdkic81fcyz52b',
                mobile: 'omhqf5xi3tc8nm194slnf7sm3hn0dq5adzd66l8kioiqc09g72odd9e8vmmx',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: 'ga3pbrddy9gxxa5k3i3rdxk79rih6pxw0gftjx4egfxz22cifrfwbw6nac3dhdpizlmncko4aq5xc1tf827zmzqtkfjhv62accv2pl3nq0uiok7x5s7cneje',
                password: 'xxw91zxtpwgi1flwwehsuul3m5tqrt05bbi9ju0wypc11hwv9sbushyfp76rmypkk1h93u0bjmor16mn3dxni3avbqb5fu3f7ienipks1tzyix3jg8klghrjivl9m0kh1xhkjtytwmn8toaaq2hthnsf83ulr1p5mpiwm6rhu8bh3rf2v845wcmknzqppaqybkw5vnyiqf2eevime1ln8wyzt6943ttvgzim9edzfcmal8fnm7lvzfkbturkwzq',
                rememberToken: 'd0bt17s2cy61djarwsfu5vrw57kmaomk8zef8ehmcs8b9p1nefncshxur6ikdm5timc35rugajxva6mcxbp92717uk9zn2jgkzzxp2v6swq48f5uzlzb3kp1js2r2dul4odvzuq5v2j6yyzof1omuj6ws66edejrk3w2xnqcbe46whlxhgufju6ta3ybbrybuf5qhemipp6sj85v5rvshlymccy2tpdx00t22k0h80a51ejtx2i6i4wm1cocs6n',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                
                name: 'kxe3v2aqpqfenyjhzq7vutq7kp0j34vgo3fhxnfl5hzje5dqitg6ec1629snawpp1iqeh3da9t36a6ap2vy7ugtcti4g2er8h26j7wojwge63s1717v6h321v3nrwjx9vhmqdyy0oomkzr0linouy874xuvo0sp5m1cvxpfsjtkjqy83aocprsab4janhe7osfrphusld03p0y5h3cnebl6ntyvke5gkgh9pmbf2mkirgd6lok5yshy7i4u0p1y',
                surname: '5l24pnippwuw15k2jyic88f4uj5sfb8t2ldj2gqnxg9hiyzpti5cjg47djhjebaywtc1rcc83ylqtdfz02awrsgwyse254df8zf9xcrdmikvu950nm0g259r3463sgmz8njrewthhz24u8s3yyhgvz1t7demhchoxkbfezn86101vz8m5zwond9wgibs0ym7zoutsa9vd38txogogy1oocup3oaqoojr7qs3dhsbteo3dae18oxmkkeluudynw8',
                avatar: 'jemum4c1h9vdwfp07h03tonu3b061eloxuouxq9n4t9v1giu1xcqg74t9w6qp98c50v1hkaen45i9m3d9lj02rnln6lugid3ph2e7fbq3ij9abrada75xsfb1z742cc9k9xm1ohuk12x2bgew7r7wifzstrxzensbyvtcj52kkvcmq1j20c295wp4lrgrqu36qv4zmgzl345y97tckqvdgogzcq0t2il6vehjithp1qsi16zfer566owycfe4rp',
                mobile: 'oo53e4hn5gtr4fkuo25bypzdwuyingdlvfpquze9dvc826efqerzn4j1q1na',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: '78qey6yxx9kb98r147oomoipjr1qut3bcpf06b0ly4pnmw9ks69iv5zzhtxr7mqipqs2itxp0m7gvhwdun1tmzfza1f396cv1adcocnygaxgbcu8jre06o6k',
                password: 'ua7dpi3c65a7i8nzy5b4letbg54339nl14m1bzzuor2hupvao63sr21zcjummda1njwd3yqhu2mlu26xwdqwsmoipfsqpxjmkn3qtmkb71miukbrz0n0yqrl2li1pvsz415ytfkt8m9sa8pnfj8ubxg2hmkuz6t86lvt3zztmoxno9k15ffu9r3ry84lm1ria48bxon721jbx1dgd51hdpxgm0peu27jg226evr0l4jewfl9u75rua2kiblay9g',
                rememberToken: 'ocjvoblrxic23gxah6eco3sz9vs3eszxx3v8jje0gccjxbxrgjlrzwgaxm9pcn72d78aw34v4ych8tk7axrm5aj97wpohez01d1yyy72vnqyf4fpud4j485mjuqxnhgb7qirge4dnwucvfmx1iwyrc7ry89ozxzqduhpmax82wmx545l9aibkutk33y7he3zfrlhe7gjits5tbk8luqchwgxvxt41cbr2iwnu33wjhs9vikch3uexfeyj8k2ijw',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: null,
                surname: 'ia91u8ynxlyutoda1g29kctsdv8yt2dz5ddjbhrpxoaxjil9uiup8a6yft5jdtegje6rsbpqzg3al0i950jyqanjwh6q8b14f0ymis5jlq3et5pi85ykmpjppi9to713mgsgg7c9w8gx03mb69dv1o9tpcp8zdssc43t9lh0ol6pwng15xzzao28ml2w532krzv94aig43b7uo7ivlqbm933jfvuqhlw91k691rn3vy450ca07yxlybgfyukcjx',
                avatar: 'nyfvseabkpgrvddyy5q2cc30amk5gekneyow3iaxbe2kmzwysq614gglksvdly86h29s1xv44o78lhkax21bqmq91c1f2mr5otay5klefq4r9qb7d284hjznv0dnvpu54j1758oavyedxl7zaa7ylctrha8avbk642yxhe8kx38tmume73lwyqf2zv49ny41x6zaa8kvgwburojg594ndx56snz8ya9nsggbdaglasb50fa32rlq6doaxyq1v2s',
                mobile: 'oqs048f802xcci9y0qw7mr3ezrv17njqyan6u12h9xbufnmjzqluwjtok2x2',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: 'e4f1c0s0uwz8lm31qfgzxxzrlupbg01lmmuzl4d963hqxxfnfnxb5i5jjlgh3qhew1g2ocxlid9k0pl1sr1tsw9b5cwxdzczmqlctl7lgrteqg2pjrjbed4c',
                password: '9hm8c1qs51zlkyhsviqn155uy6fd6sbpdqd9gmc7f89h1la5odui0vhnz9thdysxbnxbszy0e0lt01cassigov43ueisccef7675abc8krhp6o8obv3b20hrc9763qbkc3tfkj08op3sw0qhbz85tucs8r0tuefdz499sfld50xh6lzh4mt92grcat98qlsrpc0bjm6rhvkjq77pzvuu1xjacarnegwj2pshgqd2ag3dwhbla0m6xzm1g446una',
                rememberToken: 'bzfrvy7nfouql0htejel3cwp46lv86m5k0lfnmeiq9tey496c0cmtbq92vaz4vgwa6ha0l4vg8gt2078a4tyngmh4gaojsjboiyxw8pm1mumura8p9gpj2eaultikky099f2pwl8h91asi6lo9eaovfpbyb6m5xlkyl0rpgegry33xus7ryu583xfiyxx9400l1hjbilrr8p5wzwxyrh89ogpdhlpcgf7c1tatj33j3222b1tc0ri49dcvf5o0d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                
                surname: '8lob7fgip48shytfn7wmxh1h8idgmo7nmjibdpgg9wwltj17fvfyj4f38rsv2s381rtqcwwgt705fcm0838stqwesjml8xvpktxnyv2ei4vbymi1e0avtd37hmavqw3mzxmny2sjht6t9tc3sqbqkarma70jt898aa6o9ldlrn23t4w494q0k6drpnlk0txpq5lqv7wikrz2pqi9uujva3bnwbc9rnawi8iiv4qj4jiaxdprcvi9iew1ajhjlft',
                avatar: 'oylhy5qc23pjoj5vq2nt8qpguidwou5ox2cvemvvm57ejgsyxkrf0f9szf749b0bc891cqjnjmzeotcmhn4cs152rd86rmw69032ax8b33j5nih2oedslak3u5ydd8yxvz24k02mwa69ltl5a8hfl4d9t1ocuktma1wjn9qezvg2zody7b1o77gov77a4ud90ee3o8uz5ct02j5r309d54ebmivmz2dacna7p3mrhv1yeu4fav98xcbkleqyumo',
                mobile: '6zt7j66muuhy23aml56ko7r1cijxylaecmkcoxuulc9fhoctxkz08x98ml5r',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: 'an0mgn63u794lz8n832mx7xq1nc1mqhon1w09rapj4yrx6gqo6f0rmaie49ozpgy087kse4m4d7we8t8volqch3etg8ue456dpsh0106ndonq3j19a1f0jmv',
                password: 'zy0udxltqq7lty3uom5iaaumianjeluncnk2lv31gjjo46hmca15k5b0iyihrisfo139735x7n4cp70wd3a7nmfy8l6sxf25jwxkpcnxfdzg9n99yfb7vz4hplxsivi63516mhy02grvjey734licoi0b7yujfa58cfvx3hf0zhpzkcgh0qkqf5uwivofth54gp2xife881kw2b9pbz1ais0r7t73c0do69482h3x7lvf14v64acvnb0v35qwmt',
                rememberToken: 'imbwu9fn41tf6obusy80qxe7nb21rgvz5b3sycgbu1e3twyhcx3frtbp9ofuxmftqre6bq8xzi1fqk3wzpemmh8th9n568fw9uf3u95rl2nlmcd4c35jskxnhmt6o0249x99a4jnjnres3tr3rme7dyvwvc84kef5ppijpr3wlak4rwntufi650jpxhktbtgmtknjz13oralenitsrb4929magymj375rdkgilxacn57dy7bjpw0yvr7wiw9kfr',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: 'it6zd3fz4flotngcrgoq7d5kq5e2il5rqcvid8397wziegxa8qj6tywhd3ihl930m2se1ufjqypc2sx0p6oi9w2a4d0w5dy5dd5ugp4fh4iijdmu6m44x1o4e3k6cwszr7z1hvnjmup3coqluixj1umdyzual4a9soolc8zdprihpdjxl1f1u1crav9l3j59zxrr15kb8v7j3s2yqgsjqgcmv94be0nio8l57bx68dv6cbcp1c9p1lnzmj584x5',
                surname: 'r1wq66q9ny4t0nvuyzfcy8j6nadhcx1gbu79r3pn32e1lz7pnhg86ima10qem94wh9suhppfv3zgo8bkamgxro04tzq6bermyn8irrnfh117uwbs3tvf46q6gxe6puzyi04n173nlujhaot41dc2dxi8bmsvvq9kddsk4olrpe6ebm3fdyp1j1udjfhinizielkee37d6zx9puimlne5l0cyhecvpctkfglq5vri37tvl2azr79xa2qymddyi2r',
                avatar: '9sd04kn2k1c4yofsn3bnlpdi8l4qzr7o2e6bnljxs2u4iybbvft370xxmwk1pv2iu2z3a69fhd8xv8npm86whtbx5flwqntssbeus1f3awqr5eigirdea71j5r9wbgnpntvs779hyq7tnw020ndixbidv9c0hlcbeciv28ceuzeqcbd4qkc5x0xnuk1lc3yjq7datewsxhbetimiacaw0obo7stx594igtpqdzo2ejld1lxtywg261kwlhahuqc',
                mobile: '8mfal6ml9975p9j3nqbjbbl9j3zijne8xn7wmiokshqasrexpmunrfua763e',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: null,
                password: 'c5g81o2pfkm149tjbwg07sh71bwfii18zpkxceq6ybgiqr4ingw8iemm1l37dk1ytiwd8rk4fstcyczi6r02lj26kecenfnupswez0n94b6x1i6t9onxta9xeha84q2dackrcfjfcyzcxamu57wyte6vqzof1jxwlgxcbsxo0rxdn9unjjifviyklx947657rns03luov6pgsog5w44nvwhp81swj791q8rjgsp76c2cjfwmeyxysnfqt20jto5',
                rememberToken: 'xa682xsk0fdtv8r5lytdqoxmi8556xchfo903c69loz14s5fpyizza8e81k4l75hrs64c5yqpkuce0sp4di4zcmhloorryez5sbt5wcw1gebzyxsd8q3287vlwqfs7qxq6l7yylilhrvzns1mukrzmzzgf9k3yd4d7hbhfxhbtze3wpyrk8k0qu9bvc03cdmhlil0zdogpr46mo5pfmsaaj2omhwgb3twbmckls4gmpn59mgjk9qchietvgxx19',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: 'f7mraoe30m30mospwdkp0zyjo2ltgbcpjbr9tnh3tncnd6s04n8p3cixmdbeoapli29jcfwktnmcy0lkiadqwusbq5qmkudi6kdqo7wd93tkot5ykpi2vw7x472n2wbjov8sg32qs3kpdufq7c28pqng0y3gxn0iqsn4k1tmfml5ki2rzzpkqkgq6mx8bts2wayyz7wdigswcy1mf5f30hqb6p2mlzrqq65qmddybzr75eyuqef4hs9jtu7kkuy',
                surname: '7zxw0kklv3qj7kn9rvg65cu0i5vqnut3yjgjctqthk6gy12i155utkepns40fycps900uymqbnbnogs2b54l9nvtovqo8mzm720pq6jv2q9bbxyinp3up8jjdt7iar5qxujcieyf4d7bi2ykiqcwaybwgb0yq6tiqy3e9upnl6pfd6n8jodg8k11kpwy1vcx0rjf0609dkr0mtcrczuxw6yyklcvzp9ov88z569l1quzw6rlhiy78qqozqywv8j',
                avatar: 'tje21a4t04lcqtz21qvgq4c0c1p4ybi3h50ajfrz280b96n94mma2uwxq9vibfenjuyiygwavofdnhu3vij0m846tib0wlhhq8iezzx5b6lhinc4mn4bktactvpmusqpjmkbg1fgg9cv1nfi96zid0lvcx9rwi7rtrhcoxv0gsronngtcz8oguhhcwx86ru0gcegk5u01b3ptgpm7jzeohnbuxpy7ro67b2220vuwp7kivekmq6mmu1kufrbsdv',
                mobile: 'fgfcjhls9ixqoc7cbyw8qsw1gxd8wxm9q51ab3n66xnpqz2tyei5qvjewdhh',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                
                password: '4e74turnhd6ct1u9yqka9ws1v3kqenku4del45bmmurei3fgmahoy8pmfdtm228mlk7xxvzr4bkg6nv4v3766db4vkxcm1x7kywwncono1iihsktvhe8i4z46faeldrp9f9sz2urim0qt8yge9vicxf38y7wepoca0whn7yd8tzuz3f8sw8a5b8pbf1k82qec3o4d9iwxkc0j8uy25545ggvz431bqz71ghtc31beihnj6ehnhmzxgqm8kj0ou7',
                rememberToken: 'e6px5tn0r90183c86n8aps2dbcse1e48xuvpehu0pyh2y7ylyb0on7u09yfxecqwcu8uge5o62rj5ed2pbq8jrfjzdxrm3284wnypzys7j47sug4b535rdgwjhny4k0wva80t9k6nbho3x5g1vrjoap61vgnu5oq561umf683v0yq2juhkcd61opbx9skdydcn5vpxdeg9cjnhbkm5nu83ay2qzrmzb5drfehb8vu4w0mcqhtc0twi6pxqhh4g3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: 'ypd5zplyhpic2o9l87fhu4blnsmvaynm8gm9djhjpnq3xe01u370u8jnmetkngo3v6t7a6t2thwz63cwu3vl1hq47c9bkvtx70l9hov4e6x0956l46r6ysyrnvwhbqd1yg51vmfztmjfwgasci20tmo2yemlohsdkvk2msf9afhdyr8y42dxdxpslpkjl8rs5jn068zx2w68mjzf8u2ewycfuvdo0r7xd0pichnphhef1j8zdrw3c0andc5rn4s',
                surname: 'cadngoqb825gua4c14c1pmc2zembyok4z2eppnwqnwt9hxdia56oy6x2w0f14g8uskuis8pn5at0nnp4vy8tvmw5uxxdj3unx4fw3fow8igy9gd4qx58630xaqvt53vgokcdvwlkqhe7vxpdjh7j9u00vq5kh2oqbc5f4zl8nszmnmcc9ion8v11ovaew1ubbaah2wy23rute1o23gnytupfyu9wuj6ozubb8z0l4ls5h55kbq1hjncycnlykyz',
                avatar: 'rwepjn8fvugx5ldcajlrb156fegpoesfv7lbpeh33lq5hiee2ih9xbt1w1klg63faqo7p5d0z89np3ew23dts9g2rd6552b2yj15u0fasc54xh9ksmq6hzty7eh3yvpvk5eplmvrbascht5ef6i00l7ldtbdc7ml37wiqo5ldtb96fx9tsgr7sg97wkuklhxhakchx7sagl3lrei5bclcmc1x98jvmkazdwcfk17i316he9xbn6mf4sgfz05mgu',
                mobile: 'xyryc32x9s6c64w6nnjfudg7xf8f1o0upymv0hn9intcjdg0xhfxztx19trw',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: 'k2709yolgqpr7jqedydnf4xmvl0nmbu7hfi76df42o7xl1r6i7kowjn13njjmxrg5j3e3ewsnh8zrouwbm4up8ghcx6lgx76pir87hgdkt1b8iha48dl40y1',
                password: null,
                rememberToken: '9adnhee8q3dnm4p6qm2cdeg0p4gbcyn9wfvpua7dboj7mrwdmxy3dsx3rrhsw734hetlyusws2qrnzl43n9x0zrhq758gsimeydxu9w4m3id46jca1xspxi957xdhnj66w1mx3hh8wqmra61iytj4tirxdknnc3rljldq331nd397189wh86f1dxpwrc1qstmexc9986t9eprjdxkh52mqmzynq2dkz1l15xgv6b3c2ps9wyy3zqzoessr8djs1',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: 'kn2m33z5b0lex0yizc999685f452gxdr83m4y1mxw0h15uoxt6ch9b783shy7y0mxkd8mxcdhwuzaihnhin3yc3ef3lzg0vriapmggmfc0gym5xghvsayhvjjzdp1xcckmuwggbl7lhxwo9gekfrii5m6i1wek0kszudq8nk2w1aak57r571xz5vharo63f1v1ben0np5hlsg93eynbgc845dx21z4crfdwojqish521rxaiev69x1sh530g090',
                surname: 'ztbitdxqciw98usyn9t93e5onm2kkd2xq9kwtw8p1anhbdihd7fnojkm78t0o8uxmpmxw4c737e7n42j2efq1htizf2wg2sgfb1oyxbnczjl2mhpjv9j4huenl1h4gejlkz6bga4os3qzqc7ozc1rlrsrtilojm801s2r0pnweifbz13rh1vssapdeat8x86700odrx5lk9wi1jtfnnpdjkvmytrq73nci3ukfmivc314xsvdln0xpkk44xlzk8',
                avatar: '8lp58g4xh1otn9m6h6k523rxp7kzk9ae6tj8yb4f6sqvnfrwd6568rx4i8mjb7gegyhlz1xgvqq23plje3s77fhu4tsposcq22jew1fjt9dacqfj7azq9pkwsjopkxo2adxmjf2hap31h449xxnjj9ilmechuss7vl38k12cvfgpv66csfiarrl95z0chc7a91g9fnv3dfx1nadbh4f5hn7u31m3dh2y5bovpaak5dcbqacchsmd1fwsftwy8iy',
                mobile: 'ujkwt33cb1xocqvgy3hcjtjm5576jd5yz8dr7g6hulad9hhonhvljpbv58bz',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: 'hc9vke5x6tmtno54sscw60wmn2qf214xy48zqm0c4xwv7qgexentfy5pwmrkkv8u1fuvb6idejadlvz5dhr3z001k8b0swbxng3h2n2ox8pz08qbh0tdsn6u',
                
                rememberToken: '97jm4ydcbbj2othv7852tkqf48xctzqgs1h2xgezvybm3p338diu6zzi0mynkps57hrr3rdqyv8303vnd9iy74qni5jecwdbchlq7gjikuv27iiw15bxczawg83s4q6wz2p0vfd2kh4cpkr2mg6zbgbifhqkqi6gfwte5kvruydikp04s8cbzq0by0czyx68e4znavlc76c4ub85lv2q76rorpa5c6d4ifzlypr23qe0t54l7gt1wgxfqe3wbqm',
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
            .send({
                id: 'd8952ctba9tls42f9sjf4h9dmcgd2mnnfgqcc',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: 'ej68zenlv0ouuha0h0kiyy13jw8rm9r4ompp9675quoarr9em9ot27as9r9ik6dia0j59o561920oxcjd01iigtnnligr9miafn99srxg1oe7eykurewjhvb7138224p4tll3k2589wfqgk2wswjirv633turlvis4wvusdvl6a0n8m2lhc7icj4yui5pyi7crfosnnk6lt0xr20adqz40u0crf1tkm1rad8of9ghwvrq444e6q493zmnt9ti8c',
                surname: 'eap7bn05tn8laq1wvtew2wolcy0dwlafpook73bn21s880meqhrgj2lzx8mlvko8vgq062ge5u410sndsj5zeeeuk55tskylmpev84j8zf51vxxhtmn9wwy7gh18gszy6xe5fve35hpknmd3rguxq7ouyplv2e1934iwvs5ex93phdmhewcixcaruxoyntr75i1h4q61514gktwvo3qpkrctwz8yzilpfennjiau2gqwkyrs6cdrcuzr0rlhevd',
                avatar: 'ruoy8qtd1ogmef4r7gjkk20rc8zpcqxel1d6m1c51o6vhgvmrwpfzgbfxk86dnss73cjjvaa80yptdy6t2hywrd2ukz1vlb9ibm0k1adwlybn35ysdq6tmemtnr99w7n51mau5yquecxafgnz1ufmy7l7qrlcuobjo515skiqx8rpfgucji7guqvvxtkbo1rqe1sprj6d3f16b0vi6s01avyomy1iynzeqzzf194waw5wsw6rcahmbwiq6m2eb9',
                mobile: 'ix6bhicvy024uox5gc1as12mzsd2ezjd1lmj9j88dxs9t72eipw0vjyei1gj',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: '1vhpwdpm3r8m6l8phkrovhjsmcahiq2tw0l1hi5m6jh534jdgzss3tyhetwvven6xsjeboyobv2rdtf5zswmkhc4bltvrf6c58urpvls6sqtrjy9g59cl5jm',
                password: 'i4v19q62wmylekl1ph18xlb1gf2j69m16yb6m52qsqflgmi94i5w1kxluj47q7p1gulcy3ckkuiq26o69xzpajs5u3cywtjqx40mdap78lzwdj8fdenklum0vagtfx590gd3zrh2mqczw6sosg2w57hk1cne55io9ya50rw3zeiok3kvv6k71thivag2dx2ccv0y3mmy7n42scwgzyyppmctjsf3tvxvb8ynfrt8luhd4yuwybuandzdw2n3wxj',
                rememberToken: 'auf865wmp1h64cku60nyqhnw7xuw8cwfvtwfkzvvk8mf5h81502q9wkcbne3uecfryom8gac065mf8sovxnemn9vnj82gqtles5j6kcdldp8yza55wmd42xqbkgkp7mu1yx6g96bjfnsurzk6d9n2q2bw26kt4syu2sp8k79xkiqyvwngkes0eo650xpbly0qu5mzefs0znudayqqck9qunjh1edhdchwr0k7fw62q06pnofzy8ng6mgen2faxc',
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
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: 'o68n30ngndvd1d0jibrd77xukplztniejbn7j',
                name: '94ln8yko4bpstoi5uzxy93xg743jhbetgz2k9tva8trt5zx4782t78va7yhthnvd1jayzn0ca083ktqhds8z3237a3l2kbe0t1nw2u5e8eoudwuppdfq5xtihwm6o6rkomkud882bhn50cxj4dfhg3gwnfhwnahkhxb8qcr27rmibnpfr2o6cbc329e5eit7b8qw0dm4eut8s9wj82oorquzlq2ixjppe1z78chu6ab151837q1yn38psa6ov6n',
                surname: 'klchr45gdud1q5hzhlcmpbdv5cn36kma15u1glv4r9ucr1l8e2bup8eus1kuy95mi6bk3ygjemptpekw4b95arfao84d5zcr1cru7usbmrsj1pwc351b8w25u1sb6uozkyc1i42nnxy3w5yy1x9muajmxvmvxcbk7lfgzz58zpjpqz30ognpqihzp1y2g6yuaexnx87tb9ag24wanctrmwq80xtdw8fmp2hp8apj6ykq025orn3emx1avcmbebr',
                avatar: 'nacnexz13cqsnuwc9swbtan2jrkngob1adjqorif1cxkaq22hl3q3e7wmu88w0myu4yctcvzwwm5ndgytoey9vazajdajopewzcri63g8kkbtchh8aal02aemch16mz7mcvvsk6lbonz6w90v7e7gkd224ec9onwsxha5og0fmdtd85iwtejbvnjxkheqib1dy5tg9r7oqrrsw1bgjtyquovmnkn3hb7akew6ld3pt44cfpiwb8cmefxq54lesv',
                mobile: 'emanzw2a0p3obiwdws7ot2nz5humgud8adryd8c4ypri6ues2jtsm9v2vgbs',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: 'pjqgesydjlxxade0nb3fhwpr9c6tpdh2f21vjb3v4vgaizj3fec8orl7sbpmcipfeawwddmyp5lproc07fggfq3f6uy5ek49xyttx6lo4mbhhosrjq3uj7ra',
                password: 'geepoo21lssk87ftxcd78bgtupxkbmy1dmmkshhecs9hj9cvrwls67n812gkc9erz7zqubsj033rjyt36yj2ihd1y4nm5s2fqb6lfmndcr1gree9lui2k15cl94nfoejosp6zx5ujzyjbh12tb6lnpmmxt2c3p323bmtttuiapf8oiqkxbsx9a5zn6l6fumb1kes79ow7je2u9n9tq37sb921qcqi8te5ndh0lkk08ho33frd042foarace8m7b',
                rememberToken: 'rjy1v4crrqvmt1sl0wa9vrl6tkebw5m0n58ayrzdsb6f9fwx8isvcy5jdbaohcjtjmarz87jyl06hthto5h2epvhr6fa1pstt56gx1do7phjmxv26pjrbtrmqq5m4ufn7t1h6rchug8zkkbush9zbr5x6ad70t51mdpih94knl7lxfzef97wasosjr4bsvzpmjceu8i5rl0fzg30d1e6deiyckjaicd3qspz4ir374w7vd4mdu7gg4wy6lxhrka',
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
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: 'zr8wfo1nnzhbra5269u1tfc2wb443c990syus9md935t6ci7wlkh71m78qye9ntqn9tne0n891pio9mvqgpp0wehzktyehjinnpurk7iw5bmmne0qtha5v3jj1sdq7d3kskuwsv8dc99t7ao34iphp6g8u6jlsbjgwj58bgpx4nv79ubj0uftvphg5i06wiw83o765h0ydl86jxdk56q954fz4w6m899fk08z75c5ln06mt2y47361bem1bx1wi',
                surname: '9w03nwkp9883m16csi61r3kp13wjg35lj4w9pfb19hmpw215qk6bve9ucqsoz0qspeukr85fq2a6prk47oman2zphza8buqnvsnjtsqqh0p7aayax650fep3ct7p6fvtafla0rtl55g02ifht6fgxxd5vyzb6nyk2t6qlxejwu826ywycsm6vomb4dtblnem5502920lfip6shalchi1orgc4fwatwes43yipv5jxjtwqre7fwk5jilc7tbj2kv',
                avatar: '7hooxgh7n52t0mhklhj8lakoltgyo8xbtckpuax7kx9fmd8o1p4fw4h0aq6gyxx9g6n78wzhy13l4wou08m0i9wwai85vhjevb88i0ft18289g96fhkfi18d15jo1du2mstcv4qf62aqc5xuxv3hlvkf2bhcu4ebdbjtmr4ab8p1wykpefafb773l3uo2s9m8amdic907cwa1870xau5e3o95pq6vddo6v7g1j2hd8h5q638oudh5uwdx0d5g2f',
                mobile: 'yx2wck4f82ac67g0h825xe2072l1blwqj0zoaytgu0xky7sux22l4wqrjx0d',
                langId: 't55g6ojrzmfqp1l2k7svc1z1cw2q8hpacnhp7',
                username: 'ovr8wrp1600vj118vmsp74zgqexequuvgzgbhf3lqq3ldb8fctn7hxsr61xec45wixrarstudz971e1mo7mbt2ayaii76t4m7i4pnhw5gong5cyn9hil8cy9',
                password: '0dhfav9cyv4nfgbo4c7cwq2kvc5uvbkow552dj8lhgiynnod7ip89qp11hy4hyngkinm5wtgiyv1minlyfp2u2l9eov5u7js1uyf0uecxrfg6ug3l4nwe62vqgwkgeoa5se3119e4d1fg2tfqqqupvgoprsc0eltrpg293m1rs0kmnb74cgedwm88uqwnl0yeb3d9fwc9ve36iutbqnw2h5hwiug5schmjftrzux2ufy4fba7dbunw24i6p52no',
                rememberToken: '6xpr7j6o1ime2778a7aawxdcz37vbjf96zvu6e1uo781kasuoob8la1m0wortlr1nxkakac5y8ujcchsv9r5kuhdiaayv8a4kixtjvz5cbn36sqaky4ai63hsm4p1gtbbpzuvio89jy5wzjzjez0nyj69ogo5nx8wsoe8jqa2nf0o3b5vp7w7n095ob5zb20gflczepszgngcgd6o9l4hg3n3o74hmkhrdngiefnoy6rc9peut99htiuggsy63i',
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
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: '620tdt02y7gbqvpy4wvwevla04njo4595n92w9mb3tqgsj2l51ctbkzpmiflavscbn2n95nirbf2olpwy9ubrvrjepfs3ysyo8p32w5rd2pw5cfh0xde97o95o7m3mwqlgetgkgzjsohlivb5fmnxf01cz6h659hrtsflbj8iaexzvoptf7dafg28syrt7l9ui5wx76v2bylw8stum29zpcvu8cz0mi9dq6iil2hq9npzyzwpkqql0fqxb95ka36',
                surname: 'lbmzg5dmv5xyn36mvyk24yddxwp1f47hopjz49xsrog0vijjhuva5bh28lzz860jvmj8mjh24uc9tjaikhibru3bwe098c4fpa7f0nmxkx3o2tjurq9i2eyt885aivd2krde48l2tcyreitkfkacldpmr3ukaxr0g8os2l8mzg4qspez74no9gfrbj8g7muqzhhc7ppzo6m30byztwqv8rs929zbtv3r97at8oixssf95c18d68lzg2u6q0x50j',
                avatar: '1hqyaw19hty7nkyqbvgok5eu3v9bu83bm5yz69ru4ipz5nr7urj73osezv4jq6l6pqwzpjiixkjn1ldil3yygbkvzgw1znbn6g7td9ccvzl05ycy6i8ryeu40afedq694gx18i8qz5rfgztltngwixk2km8fh2w96ima7no2dqxfq38o4nviwghxyhfwvvwyu3c91x7f45316swhwfgxyoxxucg8vnbbd8a5nmdjz4wbpmv31c61hqktijxl5o8',
                mobile: '7h1p5h206aw2a475nzco9lhxabcrhm3j95dc4l6gvbdkl6vdzs91obdawhvu',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: 'mnb82aym39hud492mgh8ai9ln73dwe3cyewtb4b18sc1sy6ki6ufzw6rx99d64rrfcvedtw9rgp3lkfhmfrlzha7ziqz8b1p6xd1s45f9o8c6up0jjdcje55',
                password: '7rt3ek98cf58cyz98d3ft2l5ntd3ddq8uhcqxcp27ryeig0a92rsg0p1vkc5tf4q67jyvw6se85cdnzskkc7mdcyjozs878qcvinss7alczcsslki1jkf0nz6e0mo3e01u6psbiz9b4nfg929jm26gkg6q1ih6xkon6zgimdswyje0fzylyb6hquag3gua7p6v4kygxbf2c0vyd1z96f6sekh0iov4fnfly0bag71iupzts6gngu4wfj4g0rypo',
                rememberToken: '8cupougn2yfoodcrvms3ntfs8yqae2kkhemtnhj8z3efwxl26xotxkjf0e0ep3e0ovdyuu1xkbgszfhzv1g94oc8wkjneatx61zmsxygsgry7dmcoykx3979w4yo5vsdai9v9brmo3quhq9ah3be2ialpzy22z9nz397mb40oehk1g5zza52hyudjn94o7nu3urz6n2j0b72dqld66085mbc4v78o7mn35dc8lp0hgtumr8vyp8epje4tyy6sb8',
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
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: 'owhl24xurt5hcbo8cp26d2bttx1hak9czkp2if9laugp2q04rcz05f79au4eqci8p30je4t3fe0a1158ahb0de8jxerpdy12q244h0et4wj522xfxeuyeur1xa3ank0g1p35spia4vj0ygwi2yzqpxhwsf3eoa8442mz71i9x29182dbinailjs7ps3jl0fkvolb6xr9y6rrq2fd6zclsv3qe38oisopvpk7uhwk1a23ibjxappesax9w0sku5s',
                surname: 'ol6dgr5nhehg5hn73loh9wlhcfxzrm2np4vgz9d38mjfwzcuujwnowor7x1gkplllbfearwrm1ucs7gzwc48gg25ez9mqzaiwn3e1qcb5yr0fzy3lwt8m0lboe154e6thky9576z4di2c0hwvt9iz6ofjfuy26u3m354x706l9dyrzpn6v5scka0nr9bp2g27e01jzpi975pgr839f80mk5hd7xm4mxlcga6htbcwr4t83iq67ywuhvp75u5r1ev',
                avatar: 'iyexb3l9lh45mqkewlvkozkyw06tohhwnyfdkfuqxg8fabonwjr0gkt0s6g9tnd2p572yliqfw4my64d78v9hm5trz4y2yxeiq12odgiumvodtxe3j9g2zsmzrbwtk5ifi9yss01u14ueqy62plb74p0a9a3ed90wj8rj8rr1m1592awsgl7l3yzyv0d1pioow2tl4zkgvr872i6opi7gbz7ivabo9wa9ets0qeym04klay0wye2zb5d0bldjgg',
                mobile: 'kaguxewn34leyrlvzbbe26f058h3bd5ho12xr0b5sejo1r6dnfb6lunt2mz3',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: 'u8bb2u9dar0zw5j5o41yi8mc1besc6tg9hyy79n5vn30i2oiwq64ucay0i3tomsmisxlolfz6ac4yts2t8kh6q6jwjcq0oaao83h9f58bp7hvrylmkcl3aye',
                password: '772gbu3fnvzy408togc7z6cdlho56sttddjxp1h2t6ot249hn1v6vkjkeke8l1rtrzq20bxgyap23ps5qbfzthkqkoms79llf3hsk9610tmvlrzlxywkje4nnblt0j48bzpkhsus7c7gm4pqsawnl6jo8oe3651o3ld3t95u8aekv9a07ar5ozcxlwx2idn2pwawcjdgjf77x3qbr8all1ijiu29xykbmgz7w7n8gvrotfs6esbuhauqydrhhny',
                rememberToken: '0hk7f4ajt70kk0m2t0eqffsgmc8ifdg75sasg70cd3tgecdm9hbv3k7ievvrl3jlcfygowbxm9otb80hf3ymvl5t2uifkppl2cygj8exx5elivzte88ziyo54l0l1oeximkb3j0y3js3j561qmlkgd5tpj6jg1gmc4f6f7pzidv1r8vab2h5x580fx4ul7i8h8890ayvdipexyrxq3rwsqscq1onn6qm6lxptlkb9n80j5fe0kk3qh1qxbhtmq9',
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
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: 'pell2y5oquw4moh6gwp1gy88rjr1l03041jcnnm3jap7c6y4evaamr33nj5j0h4hsh9uwydk2nwcbdgt08esfyd5svzjld47nbr3lou3ocw4cknvmlrj0ns1cu4muk2i3gt6cdwuza7xzq87kkn48t5rds6emc0qemmdq7p5ngbh7wrz4remmz9b6akzfco43dmcs22zh6okeocqxwm6bb4tmmhp363uf3boo645p3qi6ejfv519mqnau1dd6hp',
                surname: '4xdycm6klzqo3ntq3d582omhxcb505kj4ka41o0vh3d9e31yfxk21tmg18v00d7doo09ccf7irfh97lb9yk2290xcill5u1tqslsjj0raure1slcd3phovj2tva52z2n88z07wn8f7qb0jsdt6y667rg3uffcyymo4r6xzp2jrc8omw7kel2n625jliglvbri12jn0tw7mit1tvevcdc9na2ycv7tp6zwp8ajx2ko7vixwx2wfz2pytn2iw8bj8',
                avatar: 'lnr4a2pvnuwk81zm1r624qitqub0dhywg5n6h3g3ppgmh0lpnawuej83cd17pjyrndn71mvdgjlh68ui5zzvwapsvmk001aqzlgy4q081e4j5scisew4c3bov3w8conekt1nzuum97dae7qt07eg9iuhvnza206m1kk22gotnenck1auxpu5j7vdn1d2jr1skgk5ae4ano4jyglazf3oawcl6c7s42dfj6flks0yteauc6sishbew0nzeq4qxhpb',
                mobile: '14qwp1m5338xjpsuq30iz5k4oq1qj4eng6x86ti6vnf1g8118wnkbqrun91d',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: 'f7dajlr6judrj7u9gp4qvev9hf2ad73y788t4qbdl1ga4aayo1r04qktigxw28enmf71wkiu3b68884b78lblo9phsa9r9w22k432ubvpqwlpp42yio4588t',
                password: '6edei7t722qnenj8v8dnlgmnbo2gq8a3rdjgfp35nkdxaaff53eyyfd1y52xglchmutlfrfvf4e64b4bgx057cuzp77jlz0khujwa3hetwt842gc0hlv7yov1i846qf7iso36n1j7up84exqcieuwcwcqxzefhkl4lx85u0j2ragp9drhdejyxun4wyyabtt9bbmff5i7d756f414c91tv3ur2ni1kl7yjk4m2ubvxbn7911ooob97ivot16hi1',
                rememberToken: 'e3e28o5o36tq42xy22pip4pgk4if0yob0tm7jqmnioqb3cyop09fv45azy2fs99mza1t7cw7l5wlvr1m7xg62u1yy3pri4nvfy8wyjhtvp21hwkrktz6bqkppmajfrsob1lzscxe5gk9hs0bdkgma7h7vhlfeb383my10ur8p1l0ebw3dm7fui4tuz3wfeyew36etn60udmqsvzyzid6n17c2ao1pyt0l5hypnumoesr6i01y6l13vs2n42bpv3',
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
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: 'czy9x6jg5f0iqz3f1frop81dhzdv58rts1r1anturt6trb9gtggjbvpi5vvgeue4zafdhvvx42g8xko1u3f6p6asvjwbfbvwsymvfmviob3vlqs49zx430wcauxg5diczcuc40e9157s40lzy8os8tf3rhmz79blimtb25cngjf62rrs1anqdva9a8lihcpurgnyiyv538cemmulhucgyppcqf31zrwriukay6mbf69n5b56x2yljv76hlak390',
                surname: 'hkqpts3grd7mko32k7v2uad1smptjwr4mcttplw72jkjl9h0aacuf67oyw9b57rqedd2w50o15txpbzd3ais8xlo5hp2j0fcvbvzb4u3ygacnh08y7rsc55xan725gkw9x1dz50cglq4uyb39wi0bfo0hih4itkxqaxledw5epb7imce83ujtbjz3kyhg6fekx2zp5w808ivyue3u0yb08kcpubrpupprp5mo0cgznbw3f64m8ht7nvll3qrq4x',
                avatar: 'kdm3gsthax5va8cveoa41m9xkt5xf6qpnrrcpi4cnzj42mnv439jf5f0iq18n7rnncr5egc91ahx4tdpn2iayu6blle09wvu23sfvi8u8tfebixx8e825jox3fezl5z3rbz4uw7c2lsqf3x5b8rf3ink72i8ia101xk26zx2lacucphwdlr9plqe9z4xuwslpijei4r46n54ikospetee1zcrynu3kbyxhll9l1nw4id45rnptn6pk42u6yo5se',
                mobile: 'hx46y9qdoa5kke740t1y3icbbatvmbrgss5zo94zmxol5icbh47uian4dbmve',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: 'ygktlck7udv11s0va3tgmscaw9pcm1irv8q3bsvw6p1g1gycnj4lymm456jg10v8mun7grleu93usoid8lemynviyre3ek6546xroffkub3odlnqoidn1g94',
                password: '118xl3hz12colji586q1oir68w8xzlv5xb12fcoeea5mrogv2fvk9ymdwpy5cxq3tddiaq0j3amjen1ajqn1qq0vzu2vwu2ty2kg9ori5hjivln0gczm9f1e8mz5vf1b63beufhlqu202i2u12b35bj38j99wevzqdsmvsz76xwm1ihd5b2xzlu9p3yem7lfqmjuojf3y98lsj6q9moro8u83y2mkbrr20w78t5pbypt1ct70ly4qposxjg46ps',
                rememberToken: 'mi01bq3y30rrwutc5lbxrxe5d5lz9hgr8ygo9znkg1rr927h6ka56hq7f5dyu316zlhclpccxx17u5wr8rm9es6m6tf3uw6kaashlxrxz7lcj9x6oe0wtoib32hhz4mov09scrlwggps1qxtpdplcpl0b4exya3cn0f9chqeptsvi01ky35oyd89rd52mwjf08dtipr8fkrscl8zvreyve0acj9hdwhpb6udj8u21e7h0rz88fp7cyu023eqbx9',
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
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: '7oriuzng66s4m7d3wpoyqfeagfbr7liz28z8ubbqoeycyeh0eqkfxksqwcwkhx1x6pn4kanmyc5deciikqtr1es9modahbc2uyjt7nd0ncpvbz0nfo0hbinl5frqwf237t2ysjg8iuewm1yq5v5myvnhcnlr25b7l30k0o96bw7lhaplmg24bmd3vtt3e8i7c6xdlf632vp23ay08eeb2i0plbmyc6dq4t5rum0oalx7xaiima5ny83ibunyobz',
                surname: 'muvaqqj299zo9f5bdbbden9udxknmi3oqvcdjye823vzzyu1qi0uhab623232pvdnc0kry843dcmea4sudy0wtofj317ifuf0bm34wovfw9pcffbc2umbingcszq2hj40zi2kx2ukk5d3z3xzszee5tdep9wunh0py192noz3wwkmd9r6uip6935zeuxirzeeztqcak6g7hzw3d198r5bemuhhfcbki5x2hysp9lulghny446sy8yw88exvtifz',
                avatar: 'wm6l3a4c4s9ach6t5g1e8kjbzw3pjy0lkww962dp3nk6thtcqc5qeq4qd7q03svwn0e3wq9qq2syaefgg9kf7nfmadt2c0awiq0l4tttdsq7e64o0w66zn79pflkp2zaariysdawy3jdx23faoxk7z8p94ywg8f0zbvnww7d6g6ovr0b9o6i5x5vm54e4hbxoswag5tor151kwzksz01od83lili001ndswgyejw7t0dbx6fyzdfru5lsvdvzyb',
                mobile: 'iunn86951ajpoij90ak9kg5gl7stdhi1gniugdzjpkev2dgxejcsrgngden1',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: 'bercc5ocz57l49roim2pihmpprhig2ugobfcadtwf2cg3xrxiuq0le3mddzuss1gzpnv6c87bl95gxd8zr8u1ox9iv8rolqijyfk89rje3294l25c2lov5bhq',
                password: 'eewmco8swb2prcqau004rki1j7yfc0z5asyd2c3octt8swprtkbpzf1x7ad0dba3hktukb456ziudgko22neno8gf7cq7imz8xhty01usjjl5y6abn7gwm31m8r1cf1kkwrbl5frj6pqkzkrylnzvcmz8zsp2iu2ve8eto9qt43nck3w30mc8a0thmnujwxhjh8yqxn1r0jj9oimd8l4emlgah40xv4qkqzjoktu536e7w6up4ngptblgnauh2a',
                rememberToken: 'jlmozedxi7imog0mj77lm6l9n59kk0n8ebftmme9vfp4itgvs6gh4j104sc1shfjg8qsizuvvk4wjh95flx6toegfde8tgqewgb0mxqz71eg3ic4ppddmyljpjb5zu3l9s0kvkkfpxi9zxpd67l6gz02wisong99jpzzmg2sb058bgsiezyvztn79zdptyffkry2j0korcwi6gnuk3m2pft57carkbhtfy3bxxs8mpnn9dt00jpq4p13kz4c4y5',
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
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: 'z3iqvje32b7jfkiuyva960gwt43gd8klldyqknghzra8bn9sgyt9szbpfa82cdx5r1uzuigv9kzgnadpxbtx49wv113v9deey2ow09xce8dj1ezyyks3f6f0sqopj030is109jpbgce2fl34u0yj7s8f6bny62untb80wxjwnowz18ey85dtil6s6vd84q4yi73hcocz5bk3jpvla4g6r15llujek8y3mhkfauyfwi3sc0wwp483s5h8zphf5w5',
                surname: 'h6zvj2076i52dv8q7eooy5ivgq9rp3mry94bd299mshhfncwwchm37tkwvwwrclwrtrllgc6dmo86z1gof88mo18qinwqxeyep8809rok1i1w01q1kg6m3aj6rdrbvotz62npwz59id0uupsern1esrtx2av35m6sai0uj6zm9qqf7il8rf19w7w8igq9jjpcv3vxz663l43baxs1wy1175wzb4j4o82ih2vtky81doq8aw446tax3xvf2u700k',
                avatar: 'lba4l2cse6njb34zei0z1kyepvsd2zbks648psup290uhps5gthwk7zjlmski2hz3dy1qc2ol30ul26vlefx75mugpz7idzu5ses9keaunf9m39u87s6rlgostfm6ime609nqh8xmmcmzta8zaa7meqt08ymlh3p3v7bqke2jgv21hh5rtizqnazuxivhbu23uaa25gt78uys25q0jp5bkdks6sm6eepp0m6xi7ni7g648ldczs8ytjih3gso2m',
                mobile: 'bse7kjz00133puqsfqoiqjafonye16w8w0x74kul33ivpxd1tfugezphhxqm',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: '90dx3v174ci7amq9u9gyhtre7udgs4xgq8uksedx4fyaxboxuwmezj8shjrn7msd29enfnc7kjayfqu5j2tsbpu3urk9jn8beacspkvpxlpdx8z3zgvkjv3l',
                password: '5bayiiit9dj0itafmeiux2ryh4ecahw5qrrrcbic2jp1zcwvvhndhofwng2d4rubef308k1g19cr7n59qrnxlxfzobfvklr04osq67wjd6c1staxq57nxzxb4zethnf022d8856sr2eykle78sqxv0r5v03annhqtysuplgv3g2n19iybgtfp8enxswkc2tdjr9r5oj2zf7ms6n6mhwh3gcm1lran3vn9zmspbukozy53sed56z4u7cwvooa79or',
                rememberToken: '743qwbr3upoahn7egnfpoit5szj3i0owippii5ddxw3avor3v9hrhejunoktb8nx8jtlg3qmnbwb5o5xq9w9s735tbny77ynsr55bphwn2indzbdorsfb28zr8hgu4q3ixd51bkw7r3l81284f375ah2jzywfn3c0j1eak1in5yuwmaslmnyf5k2rcedc7r5fcdr5knyqg9wke5z23ev9y6vmmrxojqsdrs3o8bkggrzovo5bp2j1weg5c8vs93',
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
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: 'uj28vjai80big7uyuq27bb2wvzj0j6pj1ru3p7d0ga4scoom3mzzp9dp5fsi8oq3m56w48t0uv68vzybpyo27jmfv0c9mnp2ysudofbdyfjm8wedrt3c3ztrdijnx015xclxkhxr26rrq3e362eizs5tbuu539bt2ipt0tlqs7aif9k5ykvjejqf2cy8vyolzy2a404gsa4d9vzprse3swqabd2uobpiins7l67vlo998nw9durw0zklxfxdq4d',
                surname: 'lm4zektlsafyrrrxgp8w5k9afyfd3cx2g05699h0i25aqw1lmtn386ggopmyiqv32iwo4uy6tjycal9zndqo64gukhcpd2z03sdnv1fc7s36m3mo481ffnsqapc515bewmktxwmojsou1kfl88l7azeb9cvpyoacigdda69og52tk4np2qbkqd1otooqm8oo9uo1622bt986cpxr9morh8iuticn3p6k6euhafol58t8benvcbg1bpt2y5j00i6',
                avatar: 'y0jr9g6almps06hse2f80mbg4uehrdzt05jbp2twgyheju7dyl6qnvcvvcwka719dvc011k5cujm9lv1xhorbp0xkw8l0ssdhirf5oqvwr5vr1vep7in0h74c0fap9rw5ccxldiyxo6bsbjgehbi53xg3j34z96wst7yewfx86a1uzt3r8a69cul6yzchlhuhran4zs2vnshy8wkt3dmplrywnq3aolozvu169zh6kpcfwjy83gpwzmdlnolkt4',
                mobile: 'a3q7zuufsfwqq5m6iqp7dnknyv761o9x19jn2r0q30fxpfh2acsueztz07az',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: 'mf7kq4bxfa7jv1g3ztzaolcc19sv3njneo0lekxruhmjqsmjhdjvtnoqpy149isofjqxxqq1r76r6z85onwmccqwq2fpv1tqasfd065iw1bdh6ghmcuerpbm',
                password: 'vooorutjf43mmk9gio9pgeko8j06h80wpyl68s5orl0g7vz3akwzszpazp7x7sxea8da1fl9dczuuoy14wxusnxbp9wf5ugmgkgvk6eot62c7ejb38huqi3fo5ibgws4mskxaym1br5uthejql0goq2vmo484u44po66n7i8um8upclo06cwykaegwumzwjag3laf8wggtmc89ikuwadhiai23reeaogvuco9w4a6bhr1gztt38khrntjylkx8t',
                rememberToken: 'je7thw35l9z41decjw7rp48gqrh66hy7g94rrkmzsosffo9bjhntjtr0tz2d1nrzakrhgq69bivdabimj846j2ep3op8ejogm5cmmo82n2beuka6o895ve87e3lrbcskkq33u8vvyvnhhlmqte5ci5c1h8fojnu9tl2ruzglh8q4woq2bfj1j7rfp51mxx7qtwi9ekdz2uh5s50znhzh3iqz0vm040z87r8rif63uodbjd6283yhc6q5wssjdtww',
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
            .send({
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: '8jqxx14d1zpx0cbn332ozj6obiwk3ntwakx3hv8o1i9qrgnz0ljspupkms5kniio9fn3q4dhr7f7u3e21x4qjfj89p755mbag5yqr291u9tg4jlb4xrf2iopmo33imife00s8secw6gho96h4mdp5xn6hwstenggc9jqc9ujpk58pzabt8dxxvarlis7ndztsv0r75mf441066bn4guymtlbjsfkk56cfmeegv4tx7djsjnqu8ycxvxs7vj8h1p',
                surname: 'd9jlud9ez26dxh5v16os29nf2fgp6vwswx71nyjhk7edto5hh63ml1wl7suu46qo3ezpu1wdvn67s7x4vjpkorhdaebnbcklq6ieu8glvojb5ozogfnfuvrnjghkq33jh5h12r8p46xw4ylfy79xa9a8kxiohae951u2hon3sijmftru77se1f1cl6cv3dnufv69oqic0jgpqeqe8zbv0okgxbmfud7577vfq921l2qwia47caj4uz1w212lx92',
                avatar: 'rwex112pyjnvwbnwfacrzd587ezqta5u37d17ucopeymopisiqnrdh6n6qdxsbkgb5n0drvtcfn8k1xb0eum0v7xq7fkdy9bjquuvvpr2jdv4nf1vmrvf1o9jvo41xdtggec60w4zmh1l3w4b2ra4nj39xdejkpy6sinqh1ky58c6c6euk77ypo4d0od4sti3ad3q39d7n4kaml1gyu232wve7ywcw06uz41svn7dct78bujecxccw5mfhse5cv',
                mobile: 'wtk6c5c8qr2u83cuejdgigo6zmzq30xr23knu6q2b8rualks9c5dgt20n0j8',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: 'l7m5l72ovv3o6ietztonfxqjcntq3thajgh7vkyq11lyg62enc881sfibp5hsbn5m2rwblj2oix8iu1wkh40j6o80met9wai3rj8gys85umu58o1xtfx6kg4',
                password: 'ujs8i252dfb5dixn5llqhl3zluxfwnmkdh90a11z3zcyyalw6v30oiypbmct1fv210jvpsyp7wlkn9v74a4r8s8f9u92hxzd7cnto3af1q35jdc037vw39b3vesilwx3xp8r0pi2irfpbarqphtsbyd75xw6obpw4yml53in19lajxd7flqzaj2dw49q1naprph3xyl2rk3azpw00d3fqx1zg55cnzvkbgge4efoa66905npijzcqn3ijjo954p',
                rememberToken: '696m4kw0gxfd7m7nep5mrgxye11gtmz6smuenrpqfcaqjhlei0i0ge1zemaugzlqz64rs0tsg92cr3ud860f6jjcm5e4cit2tl8h3wysgg1q8qkygjl574grhdtojzlq7y274n8n2rb1rvuhu44j6nl8toqim3ortexe08ejw1pbh87ffw3pf7zas8uxk0lwbkf52w5q77fh9dsxvvozi6mapyw8sfootvg1bjtobsimvfl4idpt0j05n1kgfv3',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET iam/users/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/users/paginate')
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

    test(`/REST:GET iam/user - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '15f77953-3c3c-479d-876d-618301180d03'
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
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/d221b0dd-eb89-4f91-854d-a7f997247efe')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/e8a0bf76-15a6-4b08-b470-aec36c59e4d2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2'));
    });

    test(`/REST:GET iam/users`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/users')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/user - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                id: '4bbf5acb-1203-448c-a9b1-cb7f9b79a7c6',
                accountId: 'e12f6397-e39a-4d38-b4ec-9c00d9f40962',
                name: 'm8atdlu944k6dft215s29bnu0td7ut8675mx1n5it9nu18ctwaxebkq8j4na6ymwa0qi49zb34mrshf26uzolsf45akzsfe4ljp5637dbc560ior0vxzhrt0zbshmpngs9om5hy3dw2utupdl6u274fuxo1jdrwsbw7bngjd8sttxiusqjevgpm510wrh3lh8jusm4hnqwqvhzyuoneeol985tk82ximk8xsjyuk5j33r4vyiqpsa8n9cb8q740',
                surname: 'zegy1vog1or62dzaqujt1ywegbri557esith28r89v5ebn16u7f0vfcj9vr7q5bu6b4qsuauo06jsmdscgbgy26rea7nctxn7t51s4w1zruuvr391mjpsp5du2ptoho35tn9sewa3y9pdjm9ploeezq24h8t86satz0adjpdxx9noify1dgx63qe4ifv22l1lfnc58t2b9x5cxq5qguv8h8enzs2dv05wil8lka8qg1unmy11jp49fy7v7muoqo',
                avatar: 'mtqwt3t6tdngt3qn1ihd4pmuv27g66u8q5acrcfw5g7om7h20su72tfn1e84vazqy7cz3xuvbg00eeag9b7npkncm2693bcaq5bayygl3s6hyh3iuwcn4wcpcoc4us0xaz9qyhe2vcitzq34kozeaitxyqjel4plnmp6iycdl60477a8c9m8rltoqssfwdvrvbfv3ok7r0duyj1hpfzsdpagwvk5iwvrmmgxo4m6tgt7uiz660ni99kn6bqylex',
                mobile: 'e4ngzzqj94m5x5xooc2952p43tws6wc1wxfg4kq3eh0d980osywyidr8qbqq',
                langId: 'd8cef6ab-1f8a-4caa-adb1-4394d5e4bfe7',
                username: 'dpjrggc49x9emxi48uiupf12r5qk287glrojpi5vh9ryejufa56b0ic5ozc9a564ximk5ptumnreg0rieughbdaasaj1kh4x8mxmrbih22m2bxbrtokgvp1v',
                password: '04h259ndnzecwnx2n35mnkl7a2zf1v5i0fng6t1rhq85kc96umc8twfux6u1q1zeqr95jzj1vw6w34zt39a1wixcw3bg2ww5cgd9c30prrinnpzllzi5b7usrmxf0a94g8i0qw73i0l7wm8mr5twpq7xru6k96mcd2ap0zx61s8alwyatbn7naymahpvblruukimhyodnh23ot49gdiddoijgd2w8ygvtiiopfntucrqhhx0ci8umnbj2t3a3kv',
                rememberToken: 'x1rms8c6bfjh0ibg1ca9iikkiciusnif9tizi8an267ph1xi2uvi0jgddfnqpeuw626zf2gt6rffqtfsqspj3a8pkzbd5vfn3xyum11lntohv3yntst0y7dbovy83hz4k0q964vx2w5s2nswzptcwypo3nw3vipefd1jga17corhw8tjs5o9hs435d2jsuhbkbmya9ps77h0wv5pc2n6d2z7x9ex5x6pfdpm994utu1l554ttvdrtt08s7i911v',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT iam/user`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                name: '4olb0mcg9b61gx0zyxfqcoaays3973qp00rv5ldm01hhgy6ohvv2xwihk7hr07hzk3hnvip23dm3o0e8jmfnm2zkqkqd4ad4h76ij1dz9klolsvxdvsoh2a9rcxseiejuwnmcmzdftk3ziv52hc05h2sgpscdsz5pbb9431v20zq2yo09py4azkil83u84d8basz0lidsg6crnr0rlkutyi5u8jmz4pv1tui7dlosd5b9m2oe8pf4fteav7oky3',
                surname: 'vumnribqbesp96hos3jrj89q12rnr98ok77fbalbrzq1lfq7q1o4nxks931usfagx26vk5793o5wa8sfokn0luhlybd3dgbrynay81xwsb2xflzzn355jlssxtx5vwyepny4z3a9a1qec8wgyow99zo57a49ri67il6c91vwekuo6gs2gtsb75s1o9qurpz78iqzmc1uu1qop09ngn65djek2gjgo8sljho3prco3tzgeqoltudtb07p6kkjz7h',
                avatar: 'gjzql99c9ce5hu83rjlmn4cm5rl7syzl53tsqjr10xh52x4109ksj8wh15shrce07btelkp5htiupqs0wtagdd9mn014o9bhvqj0hi3kv6pmsvyhrfrvlojitu5jlqfda7t0cvzp2l8lcme9txb1srld5vfjjxjucc9w891trti3n6diizap3jq6cujuk0faecr8uyqn7a6dxab4mrm3icntw5adiabiumoolm2rpbhpdi6xzlq0lnskubd9x3d',
                mobile: '0hvtgs3sjonh6s8o19m7d25dh67cypndg8tkpay1avjerbc2n88k63fjq3w7',
                langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                username: 'q2ccdqc3jhva7hvz0n10yu05659os7neme98jbxze86otwmzxdyjgrhio133kiov04cm9hjxnaaawb28hiy87fikz5oxdinho2ikb9d449jmxf51fqhxgxrv',
                password: '54bwjwh1a6031bgwrflzw229yzblfgne3pcwip3yn83xvt2yq0ww42sr9hkf6zx4ougpx29z30iyk5psg7blkh0s1wjvl1z3x7i93296l51i0bwgpehhydww69kpfipwbw40chqsaxonlxsi9xzxdd374wyg2olee9fuf952twnw2xb049txxr7422xrt4iv7mrrqz1ug21y6y536dcg34zkce3zgatg4qcye3haitybbmsqzc1mk82kfhchk8x',
                rememberToken: 'rch29o8q4g7d3ly9p78hcn24y7en0in6frmmpbat37uahk3u8v7p9as0vkpt95xw9muqmo6gf7g3du7k19wtco5pjqmwnodlgobasep8ksyu73h1k6ke9vbbg4uptbvabnth99tfkn6gosj4331u7s7x8yh5c60o86e67r42fxhpih0z4ftjtbk3i3z6h8b006elgt7v6t9bu87bsw3bf8v6mk1anxyeynjhd86s2dic2r3d3jfxwoz9wj4cydq',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/user/a5cb13ef-a474-4f28-b7a6-391df782dffd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/user/e8a0bf76-15a6-4b08-b470-aec36c59e4d2')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateUser - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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

    test(`/GraphQL iamCreateUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'be20face-5ba5-4b26-acd4-68bc44a128f0',
                        accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                        name: '6ygukq1vz2r9ff6l5pwdf5nkikpxzgnh20akx0xemmgqq7c9ifxy8eeslbb7orznuc8tefu11eo2giy2m2dd789ot03ghsgcl0s76ocwwpevpaxc8wnplwv5lfo2n5h5rrdoika58v6lq2862qm4f3scf1506smicnx490d9x1a8ym961u1slvgtxy2uy7w3czqyu0axx78ajh36b4wnkapm0t1zqytxgdvlncqzzkt9qu0qg4sf9ycgftjnpcx',
                        surname: 'qm0fv12bed72ujremp63tfkkurruo62rg6fp1zueh3xiytrn0la53gxe2hlca7zxd186484gd8gzrgtz2wpsle3se8yjb3xs8wc4wc8l6acw2lxxv5tsqx58vmgsj1byf1o5w2uofeo398ruhjxf2c0whj5duajvvk52s69zzm0hk52ytaw5c07h7a115rlrtsfg9u4tndz3g7at4ztf19sttgijan4ylnsqfoq4jqai3tl87nddbe3lck8vwji',
                        avatar: 'cz2jnut07zbvjd9wlcol6yujpz54q5zzl91nxk305oi2w99a9ri7tpyt124z3rh0f6w46t3nisgc49g8081wrh5ssxwh2zdqk152f2cx2591f2ejrz31cghu9im3azcwgtt9m1grmjyrcvyjcpxpxio1xzj3y8ix5a6ch26r0cr62g3vp345jlhu6kc89zjpogan3mcms0lh190sh3hoky2u10g86sa5ibcat00j9z4epsxfw9hlwu5mti2114y',
                        mobile: 'haldlv3t41lbr1www2dj0zjyfltynr82jmsorry5rdjfexziefmnywqklzk9',
                        langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                        username: 'aqx5x99knisp3ar7sy2l4lp2nrd921e5pdqstvp8xdsv36rukthwiykz6lmq4dchifwacv0efy3k78r6147g11xhaxpbfa4nq5pxijpw0ab7vlwzuikq2ai2',
                        password: 'odgb5wo2dzoy5litbyj0gkfbaben6di15p06vf5u3rr0indq4kr07s78t2l2pfl98oynr1hgjktyxkp98u7zwwk16ma7nw9z7howgx3bj79bduildki9fxiljqzzuoxty9c69cj0rl8ybh5fq1vxxgykl1qp9bqt63njhwy4hgous84a1kg24h5f3n0bqv8mh2yveoc0khy1so4oq91bobfetxpzmlqbpb9c8nirjygdlot7eixu8k2i0rqkbkf',
                        rememberToken: 'v9oir7o3eapdzucl29u2b7go2h4hfdvdvmri56799zvo41878u5kn2bxdl3lcajdcx38gxcxoeh7mtmz052cb2lmnqxg1l9w34hiizaszpy3wuqee2lnem1mf6fyei6veo8havbev43skh4ix7cmctbs50oocthcbtljaj5lu3okup6qv0yhsnhbcngetye8bczl4m8wprxo3ql363jvkptrlmd9hoj083b36qtilyp0ext6qoaqrlb3yg5y7fy',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', 'be20face-5ba5-4b26-acd4-68bc44a128f0');
            });
    });

    test(`/GraphQL iamPaginateUsers`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            id: '7125f749-72a1-4e4c-8ca0-a156475296dd'
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
                            id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('e8a0bf76-15a6-4b08-b470-aec36c59e4d2');
            });
    });

    test(`/GraphQL iamFindUserById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '4d664dba-8733-4d32-a5c4-4cbff8ddd6eb'
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
                    id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('e8a0bf76-15a6-4b08-b470-aec36c59e4d2');
            });
    });

    test(`/GraphQL iamGetUsers`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        
                        id: '597c7ae3-a835-468e-813d-f818e62403db',
                        accountId: '64194242-0a01-4ee5-86d1-7397ff0b6156',
                        name: 'w6whpw7dme9s487b5kig95k7ytaxnc1m8dbvgq0qpr014bes0vu3um10x32pzmzkqce8iwzxr6y6wom9w31v0iiesxhihvrur59legdi7j8gkaoqmwfydyqdj1px7utuy3ipfxi8n2iv4gq5t4fw1zco3hjho7742m8xcjgzzpuvwt9l582u56iaj1715hcb11r0f7n52wwwjsx3x10jiivcs0gj2bq2rmv9wj1km6crjwjebymk251kd2qyzpu',
                        surname: '3mic9sabu6yfjhcjylic8lgnxe7ufh0vfh6dmogm7fsia0goi6x21ef989w4q4o69u3iouvc8nyaswsvr0jlxputnkqomcefyq0qfb4yuttmd4hx3d9m8j5mc65cdx95nf1dpwjqzjtjiom30uipunumy9ezjb8gipd81pmz8ycg1fpseua9juqan81e3hvsg713rggxf48lgrnz53vreup0wsumkdgw8681m6s6egwqds5l891klgddb1jceqx',
                        avatar: 'ka9kr6ptglqy7ozja5sio0ecrihyxlqrpnqajjlqpfk47pbf8lk1piwttkxe3acvr136fuhsp8h6mtm3iuwwx1i5e8886h3bbg0qbo4nndryk20i85nn37ypf3us1p69t6g7r0kkcox5sgrbg12u133vb0v6b05xmp42d8fkuikt1a59rf5vzouf9o9w4qoqjwqwh66lgwoh9nfhi583etem2cc69oypc754l084vg4va0sxorjf7wfqg0tlidl',
                        mobile: 'wndt5z6xlfprlgpf3hz4kuv3i4kvyzmvor1082mgd42gj06t8mp6vj21bbic',
                        langId: '8a1244aa-79a4-404c-9eb0-e59546cf8708',
                        username: 'p8of18aqgq58fzvbqezqgnj2qmbnq211ujpcr3mmnqwb2crxut0dppj6ailubwjf2z33w8jhf3co04whs59vy4j48wuf2sorsyyx8numr4nesamynnv1n9uv',
                        password: 'eb4cjnlcuv53ixxdy20memhf2zmmt2lraqzqoy4umyz5ycu46lvy356c9q2wcp59sw8ny3s0oqf74rf1mr9ih9az7eir8telv0tv3qbsjbwe03paohd3y6044egfhfhqb24y07o53pdpxe7rpv87p7lmqibavrn45ygx4c7z2e4sreeu9r0ly7zwl6b63u08e1gbvf0gyo5dhgg3bg2x2m3r9ksu951j335cac5wsbzn63mu3rfeflojood5nnd',
                        rememberToken: 'hbfj0dtkjwoterg0dqp3wa2c5j699tw92nirfszew9is91xoslc7i6x4jkxn4pc1nuqx73xf70r0yossp6d6hoapej2dkfpnbumvkl5ji9gaw3loh5zh1cb1m33p2seyidyyb0axrp5sem17g6qasqg5emtzg8rh3l31u3rll978ayfbdzrkg0isr00el2owtmas52yx671u05heoppodofow92tdp9nl48w78z4ire71ck2aejhciq12ju7jvm',
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
                        
                        id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2',
                        accountId: '22471b50-059c-4924-bf1f-17479e3aebb0',
                        name: '9w89i2015p3bfcbnmzq44z396w9mzwf4z5oc9krzg49nuvllsksbyt6pk9fs5xtkjlt6gs3guotq9zmnm06evoi20q0rs739u62jjshkv6ss65hxxfjgx9sxlubbpftelzdc9zfxu30prmqdccw8te9x7q6np54ju61qwx6jhgs5wvq4imslxwxizecyl9nz3601cyd1wq1w4idwu1sazryon5u99khzul6fefyiqepc3oi8i4sr9a358q64670',
                        surname: 'v6itr6ifkglz7sojf5638wurih5o7hukq2x6s6i3kc6pnkzd9ek5c8dlajuhf1wj3ev3csm4bzyqbdoy80rxxn6an6j7q91bxjhqz1g2djwabbv1ooscjc7zj34jan3n3p9uibfhzqtd41igxnqh9bt6e2zrz9u8humhqxdead8g588x402fmtycihyoksrwjg6wrl2geeoygckwr4hscyh02872a9eqqyj2rj1i182c2tft33p28d6176y6lic',
                        avatar: 'p0y79gu1b7pwad22idyzs8ah8fgqm8fd2hsun9q37627umz7w61qvj2eik9d13yse95t01wkd39m8afqb4zwocrxuuugi45osptfkx81veruqt7y5sau9mi5jei2ahnlg0qznvbfwemd0sr0i0q87fbkiwd2zpn1dsc3vxeqeeh3nlmvud25089opkaifgyv55wjszq8o3jllni0fylsz33x291g6vhc0p51no0osrdhonjmgki6dy2sk371cqc',
                        mobile: 'tjh75175ef8irfvtw57raf12oa7px6ybxum400nonytqnq6v5ssaiq61pysy',
                        langId: 'bf7dba2a-e61a-49be-8f61-1629492d0de6',
                        username: '2wup8ndgmnlaiqljbr1kox83xgigjxrojind15swjlw2hlh9qet944y9tn9vgrx2acng6bu0slotfuj16g43gxno0rvm9k97scxs07bjcjq5z2cir1xx9mqu',
                        password: 'lclpw4tg7oz9dybrirhcd0vsmqzwchlfhyfq7j9uiu4aqq2ixsoy33i3cikcx59gb4ae289s3fr0jtb80znfm53tn1mwi2u6g2ycc7f9h0ccae9tfkdc4qq8qo3qjdd5xupqjavndj9mn00xzd7ep0wwr2rjlfb9xw6r6z1uvv2b5o0je2kpjxfuvdqztkn0fcu9lqmm9wan0za79nbqkxv55taak2ja3nkhpizs1zbpnhv6sownr658iqo3jaq',
                        rememberToken: '1rt5if2amfsxtfl0pp6n99532qeopumzfu8jvt88takx0o3e7jkjndhh79m7aax7zstui9u36wjj5yai1ytdr1v979s8yc2uk0oxuk0t18wur563s02xbxnce9qur5ru0ln6ydzkb7hzud1hzm4krabxc19dq29jnaebfxpq3tz9je8gxivxoblurh58m4ppw6qrsiot6tzdilfhjxhojdsanj1ntc1tfmtslgt5fanaij7h8zf9deaxn4fczmy',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('e8a0bf76-15a6-4b08-b470-aec36c59e4d2');
            });
    });

    test(`/GraphQL iamDeleteUserById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '33106622-6c3e-45eb-a963-fc2ae37b2183'
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
                    id: 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('e8a0bf76-15a6-4b08-b470-aec36c59e4d2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});